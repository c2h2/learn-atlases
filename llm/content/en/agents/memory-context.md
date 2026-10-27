Everything an agent knows about its task at a given moment is in its context: the instructions, the tool definitions, the conversation, every thought, call and observation so far. The context is the agent's working memory, and like every working memory it is small. A window of $128{,}000$ tokens sounds generous until an agent reads a few source files, runs a test suite that prints three thousand lines, and searches the web twice. Long tasks overflow any window; and well before they overflow, a cluttered context makes the model slower, more expensive and less accurate. Deciding what goes into the context, what is compressed, what is stored elsewhere and what is fetched back — the practice that came to be called **context engineering** in 2025 — is as important to an agent's success as the model itself.

This chapter treats memory as a resource to be budgeted. It begins with the arithmetic of context budgets: where the tokens go, how fast an agent consumes them, and how long a run can last. It then derives the economics of **compaction** — summarising the history when it grows too long — including the threshold that minimises cost under a simple model, and checks the result with a plain-Python budget simulator. Retrieval memory comes next, in which past information is stored outside the context and brought back by search, with the scoring rule of the Generative Agents of Park et al. (2023) as a worked example. MemGPT (Packer et al., 2023) shows how a model can manage such a hierarchy itself through tool calls, and the chapter closes with the simplest and often most effective memory of all: files the agent writes for its future self.

## The context as a budget {#sec-budget}

::: definition Context budget {#def-budget}
At step $t$ an agent's context $c_t$ ([[agents/agent-loops#def-loop]]) occupies
$$
\lvert c_t\rvert = \underbrace{F}_{\text{system prompt, tool definitions}} + \underbrace{M_t}_{\text{memory loaded}} + \underbrace{H_t}_{\text{history}} + \underbrace{o_t}_{\text{latest observation}}
$$
tokens, and the window $W$ must also hold the model's output, so a **reserve** $R$ (the maximum output length, including any reasoning tokens) must remain free: $\lvert c_t\rvert + R\le W$. The **history budget** is $W - R - F - M_t$, the room left for the task's own record.
:::

The fixed part $F$ is paid on every step, and so is everything carried in the history. Several facts about long contexts make the budget tighter than the window suggests. Attention over a long context costs compute and memory that grow with its length ([[inference/kv-cache]], [[inference/long-context]]). Accuracy degrades too: models retrieve facts in the middle of long contexts less reliably than at the start or end (Liu et al., 2024), and benchmarks of long-context use with more demanding tasks than single-fact retrieval find that the effective length — where performance stays close to that at short lengths — is often well below the advertised window (Hsieh et al., 2024). Context is a resource that degrades with use, not a free buffer to be filled.

::: example Where the tokens go {#ex-budget}
An agent has a $128{,}000$-token window. Its system prompt is $2{,}500$ tokens, its $22$ tool definitions $6{,}500$, the task $1{,}000$, and it reserves $8{,}000$ tokens for output. Each step adds a thought and a call of about $300$ tokens and an observation averaging $1{,}972$ tokens. How many steps fit before the window is full?
::: solution
The fixed load is $F = 2{,}500 + 6{,}500 = 9{,}000$; with the task and the reserve, $9{,}000 + 1{,}000 + 8{,}000 = 18{,}000$ tokens are committed, leaving $110{,}000$ for the history. A step costs $2{,}272$ tokens on average, so about $110{,}000/2{,}272 = 48$ steps fit. A coding agent can use fifty steps on a modest change; the observations, not the reasoning, are what consume the window, so they are the first thing to manage.
:::
:::

### Growth, overflow and cost

Without management the history grows linearly, so the context hits the window after a predictable number of steps, and the total cost of the run grows quadratically ([[agents/agent-loops#ex-loop-cost]]). Three families of techniques keep it bounded:

- **Truncation** drops the oldest turns (a sliding window). It is simple and loses the beginning of the task, which often holds the most important information: the instructions and early discoveries.
- **Observation clearing** keeps the record of *what was done* but replaces old tool outputs with a short stub ("[output of `read config.yaml`, 3,140 tokens, removed]"). Agents rarely need the full text of a file they read thirty steps ago; if they do, they can read it again. This is the cheapest and often the most effective technique.
- **Compaction** (summarisation) replaces the history with a model-written summary of the task so far — goals, decisions, findings, open problems, relevant file names — and continues from it.

::: example What observation clearing buys {#ex-clearing}
In the agent of [[#ex-budget]], observations are replaced by $20$-token stubs once they are more than five steps old. Ignoring the five recent observations, how many steps fit in the $110{,}000$-token history budget now? What does the agent lose?
::: solution
Each old step now costs its $300$-token thought and call plus a $20$-token stub, $320$ tokens, and the five recent observations take about $5\cdot1{,}972\approx9{,}900$ tokens. So $(110{,}000 - 9{,}900)/320\approx313$ steps fit, more than six times as many as before. The agent keeps the record of what it did and why, and loses the details of what it saw; since the observations came from tools, it can usually recover them by calling the tool again — which is why clearing is safer than summarising, and why it works best when tools are cheap and deterministic.
:::
:::

::: definition Compaction {#def-compaction}
A **compaction policy** with threshold $C$ and summary size $s$ monitors $\lvert c_t\rvert$. When it exceeds $C$ (with $C + R\le W$), a summariser call reads the context and writes a summary of at most $s$ tokens; the history is replaced by the summary, so the context drops to $B = F + M + s$ tokens, and the loop continues. The summary may itself be summarised at the next compaction (**recursive summarisation**).
:::

::: proposition The cost of compaction {#prop-compaction}
Suppose each step adds $\delta$ tokens, compaction resets the context to $B$ and is triggered when it reaches $C > B$, and the cost of a run is measured in input tokens: every step reads the whole context, and each compaction reads a context of size $C$. Then over $T$ steps, with $T$ much larger than the cycle length $L = (C - B)/\delta$, the context averages $(B + C)/2$ tokens and the total input cost is approximately
$$
\text{cost}(C) \approx T\,\frac{B + C}{2} + \frac{T}{L}\,C = T\left(\frac{B + C}{2} + \frac{\delta\,C}{C - B}\right).
$$ {#eq-compaction-cost}
This is minimised at
$$
C^{*} = B + \sqrt{2\,\delta B}.
$$ {#eq-optimal-threshold}
:::

::: proof
Between compactions the context grows from $B$ to $C$ in steps of $\delta$, a cycle of $L$ steps over which the context averages $(B + C)/2$ (exactly, up to the discreteness of steps). There are about $T/L$ cycles, each ending with a compaction that reads $C$ tokens. Substituting $L = (C - B)/\delta$ gives [[#eq-compaction-cost]]. Write $u = C - B > 0$. Since $\frac{\delta C}{C - B} = \delta + \frac{\delta B}{u}$, the cost per step is $\frac{2B + u}{2} + \delta + \frac{\delta B}{u}$. Its derivative in $u$ is $\frac12 - \frac{\delta B}{u^2}$, zero at $u = \sqrt{2\delta B}$, and the second derivative $2\delta B/u^3 > 0$ confirms a minimum. Hence $C^{*} = B + \sqrt{2\delta B}$.
:::

The result is a square-root law of the kind familiar from inventory theory (the economic order quantity): compacting too often wastes summariser calls, compacting too rarely means carrying a long context on every step. Its practical message is that the cost-optimal threshold is far below the window — with $B = 14{,}000$ and $\delta = 2{,}272$, $C^{*}\approx B + 7{,}976 \approx 22{,}000$ tokens. But the model counts only tokens. Every compaction also *loses information* and risks introducing errors, since a summary is a model output like any other; that cost pushes the threshold up. Real systems compact much later than $C^{*}$ — commonly at a large fraction of the window — and use observation clearing, which loses little, to slow the growth $\delta$ in between.

::: widget plot
f: 14 + g*x; 14 + mod(g*x, c - 14)
x: 0, 80
y: 0, 130
sliders: g=2.3:0.5:6:0.1; c=96:20:120:1
labels: no management (thousands of tokens); compaction at threshold $C$
hlines: 120
caption: Context size in thousands of tokens against the step number, for an agent whose history grows by $g$ thousand tokens per step from a base of $B = 14$ thousand. Without management it crosses the $120$-thousand budget (window minus output reserve, the horizontal line) after about $46$ steps. With compaction at threshold $C$ the context follows a sawtooth between $B$ and $C$, averaging $(B + C)/2$ ([[#prop-compaction]]). Lower $C$ to shrink the average at the price of more frequent summaries.
:::

### A context-budget simulator

The listing simulates the agent of [[#ex-budget]] for $150$ steps, with observation sizes drawn from a fixed, seeded distribution so that every strategy sees the same steps. It compares no management, observation clearing (keep the last five observations in full, stub the rest), compaction at two thresholds, and both together.

```python
import random

W        = 128_000   # context window (tokens)
FIXED    = 9_000     # system prompt + tool definitions
RESERVE  = 8_000     # kept free for the model's output
TASK     = 1_000     # the user's request

def step_tokens(rng):
    """Tokens one step adds: thought + call (~300) and an observation (varies)."""
    return 300 + rng.choice([200, 400, 800, 1500, 3000, 6000])

def run(strategy, steps=150, seed=0, threshold=0.8, summary=4_000, keep_obs=5):
    rng = random.Random(seed)                    # same steps for every strategy
    history = []                                 # list of (call_tokens, obs_tokens)
    summ, total_read, compactions = 0, 0, 0
    for t in range(1, steps + 1):
        call = 300; obs = step_tokens(rng) - call
        history.append([call, obs])
        if strategy in ("clear", "both"):                  # replace old observations by a stub
            for h in history[:-keep_obs]:
                h[1] = min(h[1], 20)
        used = FIXED + TASK + summ + sum(c + o for c, o in history)
        if strategy in ("compact", "both") and used > threshold * (W - RESERVE):
            summ, history, compactions = summary, [], compactions + 1
            used = FIXED + TASK + summ
        if used > W - RESERVE:
            return f"{strategy:8s} overflow at step {t:3d}, read {total_read/1e6:5.2f}M tokens"
        total_read += used                       # every step re-reads the context
    return (f"{strategy:8s} {steps} steps,          read {total_read/1e6:5.2f}M tokens,"
            f" final context {used:6d}, compactions {compactions}")

rng = random.Random(0)
mean = sum(step_tokens(rng) for _ in range(100000)) / 100000
print(f"mean tokens per step {mean:.0f}; budget for history "
      f"{W - RESERVE - FIXED - TASK} tokens -> about {(W - RESERVE - FIXED - TASK)/mean:.0f} steps")
for s, th in [("none", 0.8), ("clear", 0.8), ("compact", 0.8), ("compact", 0.4), ("both", 0.3)]:
    print(f"threshold {th}:", run(s, threshold=th))
```

```text
mean tokens per step 2272; budget for history 110000 tokens -> about 48 steps
threshold 0.8: none     overflow at step  50, read  2.94M tokens
threshold 0.8: clear    150 steps,          read  6.60M tokens, final context  66300, compactions 0
threshold 0.8: compact  150 steps,          read  8.01M tokens, final context  23900, compactions 4
threshold 0.4: compact  150 steps,          read  4.37M tokens, final context  24400, compactions 9
threshold 0.3: both     150 steps,          read  3.81M tokens, final context  28700, compactions 5
```

Unmanaged, the run dies at step $50$, as the budget arithmetic predicted. Observation clearing alone lets it run all $150$ steps, with the context growing only by the $320$ tokens per step of calls and stubs. Compaction at $80\%$ of the budget also completes the run but reads more tokens in total than clearing, because it spends most of each cycle with a nearly full context — the effect of [[#eq-compaction-cost]] (the simulation does not count the summariser calls, which would add about $4\times96{,}000$ tokens). Lowering the threshold halves the cost; combining clearing with compaction is cheapest of all and needs fewer summaries. The numbers ignore the quality side entirely: nine summaries mean nine chances to lose a crucial detail.

::: warning A summary is a lossy, fallible model output
Compaction replaces facts with a model's account of them. Details the summariser judged unimportant — an exact error message, a file path, a constraint the user mentioned once — are gone, and the agent cannot know what it has forgotten. Summaries can also be wrong: a test reported as passing that failed, a decision attributed to the user that the agent made. Write summaries to a fixed template (goal, constraints, decisions with reasons, current state, open problems, references to where full details are stored), keep the raw history available outside the context so that it can be searched, and never let a summary be the only record of instructions the user gave.
:::

## Kinds of memory {#sec-kinds}

Psychology distinguishes working memory from long-term memory, and long-term memory into episodic (events), semantic (facts) and procedural (skills). Sumers et al. (2024) adapted these categories to language agents in their CoALA framework, and they are a useful vocabulary.

::: definition Memory in a language agent {#def-memory}
- **Working memory** is the context itself: what the model attends to at this step.
- **Episodic memory** stores records of past experience — previous steps of this task, earlier sessions, past trajectories and their outcomes (the reflections of [[agents/agent-loops#def-reflexion]] are episodic memory).
- **Semantic memory** stores facts about the world or the user: documentation, a knowledge base, user preferences.
- **Procedural memory** stores how to act: the model's weights, the system prompt, and reusable skills such as code snippets or instructions for recurring tasks.

Long-term memories live outside the context and enter it only when **retrieved**; writing them is a separate decision.
:::

The design questions are therefore what to write, where, and how to read it back. Writing everything produces a memory too large to search well; writing selectively requires a judgement, usually made by the model, about what will matter later. Reading back requires a query, and a retrieval method good enough that the right memory is found when it is needed and wrong ones are not.

## Retrieval memory {#sec-retrieval}

The commonest long-term memory is a store of text items — past messages, observations, notes, document chunks — indexed for search and queried at each step or when the agent asks. Everything in [[prompting-rag/retrieval-augmented-generation]] applies: items are embedded ([[prompting-rag/text-embeddings]]), the most similar to a query are retrieved, and the agent's context receives the top $k$. Agent memory adds two complications that a static document collection does not have. Memories accumulate and age, so *recency* matters as well as similarity; and not all memories are equally worth recalling, so *importance* matters too.

::: definition Memory retrieval score (Generative Agents) {#def-ga-score}
In the Generative Agents of Park et al. (2023), each memory $m$ in a time-stamped **memory stream** has three scores for a query $q$ at time $t$: **recency** $\operatorname{rec}(m) = \lambda^{\,t - t_m}$, where $t_m$ is when $m$ was last accessed (they used $\lambda = 0.995$ per hour of simulated time); **importance** $\operatorname{imp}(m)$, a rating from $1$ to $10$ assigned by the model when the memory was written; and **relevance** $\operatorname{rel}(m, q)$, the cosine similarity of their embeddings. Each score is min–max normalised to $[0, 1]$ across the candidate memories, and the retrieval score is the weighted sum
$$
\operatorname{score}(m) = \alpha_{\text{rec}}\,\widehat{\operatorname{rec}}(m) + \alpha_{\text{imp}}\,\widehat{\operatorname{imp}}(m) + \alpha_{\text{rel}}\,\widehat{\operatorname{rel}}(m, q),
$$ {#eq-ga-score}
with all weights equal to $1$ in their implementation. The highest-scoring memories that fit the budget are placed in the context.
:::

::: example Which memory is recalled? {#ex-ga}
Three memories are candidates for the query "plan for the party". Memory 1 was accessed $1$ hour ago, has importance $3$ and relevance $0.62$; memory 2: $30$ hours, importance $8$, relevance $0.55$; memory 3: $200$ hours, importance $6$, relevance $0.81$. Compute [[#eq-ga-score]] with $\lambda = 0.995$ and unit weights.
::: solution
Recencies: $0.995^{1} = 0.995$, $0.995^{30} = 0.860$, $0.995^{200} = 0.367$; normalised to $[0, 1]$: $1$, $0.786$, $0$. Importances $3, 8, 6$ normalise to $0$, $1$, $0.6$. Relevances $0.62, 0.55, 0.81$ normalise to $0.269$, $0$, $1$. Scores: memory 1, $1 + 0 + 0.269 = 1.269$; memory 2, $0.786 + 1 + 0 = 1.786$; memory 3, $0 + 0.6 + 1 = 1.600$. Memory 2 is recalled first, although it is the *least* similar to the query. Min–max normalisation stretches small differences among the candidates to the full range, so the weights are less interpretable than they look: with only three candidates every component contributes a $0$ and a $1$.
:::
:::

::: widget plot
f: lam^x; 0.5
x: 0, 500
y: 0, 1.02
sliders: lam=0.995:0.95:0.999:0.001
labels: recency $\lambda^{h}$ after $h$ hours; one half
points: 138.3,0.5
caption: Raw recency $\lambda^{h}$ of a memory last accessed $h$ hours ago. With $\lambda = 0.995$, as in Generative Agents, recency halves after $138$ hours, nearly six days; at $\lambda = 0.95$ it halves in under fourteen hours. The decay rate decides how quickly an agent's attention moves from old events to new ones, and it interacts with min–max normalisation ([[#def-ga-score]]), which rescales whatever range of recencies the candidates happen to span.
:::

Park et al. also introduced **reflection** in the memory sense: periodically the agent asks itself what high-level conclusions follow from its recent memories and stores those conclusions as new, more abstract memories, which are then retrievable like any other. Summaries of this kind turn a long episodic record into semantic memory. Their agents — twenty-five simulated characters in a small town — remembered, formed relationships and coordinated events such as a party over two simulated days, and ablations reported that removing observation, planning or reflection each made the characters' behaviour less believable to human raters.

The failure modes of retrieval memory are those of retrieval in general, made worse by accumulation: a memory that should be retrieved is not (the query does not resemble it), an outdated memory is retrieved instead of its correction, and memories written from untrusted content persist and resurface in later sessions. The last is a security issue — a planted instruction that survives in memory affects every future task that retrieves it ([[agents/agent-security]]) — and it argues for recording the provenance of every memory and for letting users inspect and delete what an agent remembers about them.

## Letting the model manage its memory: MemGPT {#sec-memgpt}

In the designs above, code outside the model decides when to retrieve and when to compact. Packer et al. (2023) proposed giving these decisions to the model, by analogy with an operating system that pages data between fast and slow memory.

::: definition MemGPT {#def-memgpt}
**MemGPT** divides memory into a **main context**, which is the model's context window, and an **external context** that the model cannot see directly. The main context contains the system instructions, a **working context** of editable facts (for instance about the user and the agent's persona), and a first-in-first-out queue of recent messages. The external context contains **recall storage** (the complete history of messages, searchable) and **archival storage** (an open-ended store of text, searchable by embedding). The model moves information between the two through function calls — appending to or editing the working context, inserting into archival storage, and searching recall or archival storage with paginated results. When the queue nears the window limit the system inserts a "memory pressure" warning so that the model can save what matters; when it is full, older messages are evicted to recall storage and replaced by a recursive summary.
:::

The model must also be able to perform several memory operations in a row before answering — search, read a page of results, search again — so MemGPT lets a function call request that control return to the model immediately rather than waiting for the next user message. The authors evaluated it on long multi-session conversations, where questions referred to facts from earlier sessions that had long since left the window, and on document analysis tasks requiring lookups across many documents, and reported that it outperformed fixed-context baselines on both. The lesson generalises beyond the particular system: memory operations can be tools like any other, and a model can learn to decide when to remember and when to look things up. The cost is that memory management competes with the task for the model's attention and for steps, and errors in it — failing to save a fact, saving a wrong one — are as possible as errors in any other tool use.

::: example The cost of a memory search {#ex-memgpt}
A memory-managing agent answers a question about an earlier session. It issues a recall search ($80$ tokens), receives a page of $5$ results of about $200$ tokens each, issues a second, refined search ($80$ tokens), receives another $1{,}000$ tokens, and answers. Its main context is $9{,}000$ tokens before the first search. How many input tokens do the three model invocations read, and how does this compare with a design that always retrieves the top five memories into the context before the model is called?
::: solution
Invocation 1 reads $9{,}000$; invocation 2 reads $9{,}000 + 80 + 1{,}000 = 10{,}080$; invocation 3 reads $10{,}080 + 80 + 1{,}000 = 11{,}160$. Total $30{,}240$ input tokens and three sequential calls. Automatic retrieval into the context reads $9{,}000 + 1{,}000 = 10{,}000$ tokens in one call — a third of the cost and latency — but retrieves on every turn whether needed or not, with a query (the user's message) that may be worse than one the model would formulate. Model-directed memory pays for flexibility in calls; automatic retrieval pays in noise.
:::
:::

## Scratch files and structured state {#sec-files}

Some of the most effective agent memories are not clever at all. An agent with a file system can write notes for its future self: a to-do list of the plan ([[agents/planning]]) with items checked off, a progress log, a file of decisions and their reasons, a record of commands that worked. These files survive compaction, a restart or a hand-over to another agent; they are small; the agent reads them back with ordinary tools exactly when it needs them; and people can read and correct them. Many coding agents also read a project-level instructions file at the start of every session — conventions, commands for building and testing, pitfalls — which is procedural memory written by people and edited by the agent.

The principle behind scratch files is the one behind every technique in this chapter: keep in context what the current step needs, keep everything else somewhere it can be found, and make the boundary explicit. **Structured state** is the strongest form. If a task has a natural state — the set of files changed, the list of tests failing, the fields of a form filled in so far — keeping it in a data structure that the runtime updates and renders into the context at every step is more reliable than hoping the model will reconstruct it from a long history.

::: application Context engineering in practice
A checklist that recurs in practitioner accounts of long-running agents, as of 2026: keep the system prompt and tool definitions stable (which also maximises prefix caching); return concise tool results and let the agent ask for more (pagination, a `head` and a `grep` rather than a file dump); clear stale observations; compact to a template, not free prose; keep a plan or to-do file and re-read it after compaction; delegate large exploratory reads to a sub-agent ([[agents/multi-agent-systems]]) that returns only its conclusion; and log the full history outside the context so that it can be searched or audited. None of these requires a longer window, and all of them help even when one is available.
:::

::: quiz
An agent has been working for three hours. After its third compaction it starts redoing work it completed in the first hour and contradicts a constraint the user gave at the start. What is the most robust fix?
- [ ] Use a model with a larger context window and turn compaction off.
- [ ] Compact more often so that summaries are shorter.
- [x] Keep the user's instructions and a progress file outside the compactable history — pinned in the context or re-read after each compaction — and compact to a template that records completed work.
- [ ] Raise the temperature so that the agent explores new work instead of repeating old work.
::: solution
The symptoms are classic summary loss: the instructions and the record of completed work were compressed away. Pinning what must never be lost, and writing progress to a file that is re-read, makes the important state independent of the summariser. A larger window postpones the problem and makes every step more expensive; more frequent compaction loses more; temperature is irrelevant.
:::
:::

::: history
Memory for neural networks has a long history of its own: recurrent networks carry a state, LSTMs (Hochreiter and Schmidhuber, 1997) protect it with gates, and memory networks (Weston et al., 2015) and neural Turing machines (Graves et al., 2014) gave networks an external store read by attention. Retrieval-augmented language models (Lewis et al., 2020; Borgeaud et al., 2022) made external text memory standard. For agents, Park et al. (2023) introduced the memory stream with recency, importance and relevance scores and reflection; Packer et al. (2023) proposed MemGPT's operating-system analogy with model-managed paging; Shinn et al. (2023) carried verbal reflections between trials; and Wang et al. (2023) stored reusable code skills in Voyager. Sumers et al. (2024) organised these designs with the CoALA framework. Liu et al. (2024) documented the lost-in-the-middle effect, and Hsieh et al. (2024) found effective context lengths below advertised windows. In 2024–2025 hosted assistants added persistent user memories, coding agents adopted project instruction files and automatic compaction, and practitioners began to call the whole discipline context engineering.
:::

::: summary
- The context is a budget: window $=$ fixed instructions and tools $+$ loaded memory $+$ history $+$ latest observation $+$ output reserve. Observations usually dominate the history.
- Unmanaged history grows linearly, overflows after a predictable number of steps and makes total cost quadratic; long contexts also degrade accuracy well before they are full.
- Truncation, observation clearing and compaction bound the context; clearing loses least, compaction most.
- With compaction from $B$ at threshold $C$, cost per step is about $(B + C)/2 + \delta C/(C - B)$, minimised at $C^{*} = B + \sqrt{2\delta B}$; information loss pushes real thresholds higher.
- Long-term memory is episodic, semantic or procedural, stored outside the context and retrieved; agent memories need recency and importance as well as relevance, as in the Generative Agents score.
- MemGPT lets the model page information between its context and external stores through function calls, trading calls for flexibility.
- Scratch files, pinned instructions and structured state are the simplest robust memories: they survive compaction and can be read by people.
- Memory persists untrusted content too; record provenance and let users inspect and delete memories.
:::

## Exercises

::: exercise Steps before overflow {level=1 check="40"}
An agent has a $64{,}000$-token window, reserves $4{,}000$ tokens for output, and carries $12{,}000$ tokens of system prompt, tools and task. Each step adds $1{,}200$ tokens. How many complete steps fit?
::: solution
History budget $64{,}000 - 4{,}000 - 12{,}000 = 48{,}000$ tokens; $48{,}000/1{,}200 = 40$ steps.
:::
:::

::: exercise Average context under compaction {level=1 check="55000"}
Compaction resets the context to $B = 14{,}000$ tokens and is triggered at $C = 96{,}000$. What is the average context size per step over a long run?
::: solution
$(B + C)/2 = (14{,}000 + 96{,}000)/2 = 55{,}000$ tokens ([[#prop-compaction]]).
:::
:::

::: exercise Recency decay {level=1 check="138.3"}
With the recency factor $\lambda = 0.995$ per hour of [[#def-ga-score]], after how many hours does a memory's raw recency fall to one half? Give one decimal place.
::: solution
$0.995^h = 0.5$ gives $h = \ln0.5/\ln0.995 = 0.693147/0.0050125 = 138.3$ hours, nearly six days.
:::
:::

::: exercise The optimal threshold {level=2 check="22000"}
With $B = 14{,}000$ and $\delta = 2{,}272$ tokens per step, compute $C^{*}$ from [[#eq-optimal-threshold]], rounded to the nearest thousand tokens, and the cycle length $L$ in steps.
::: solution
$\sqrt{2\cdot2{,}272\cdot14{,}000} = \sqrt{63{,}616{,}000} = 7{,}976$, so $C^{*} = 21{,}976\approx22{,}000$ tokens, and $L = 7{,}976/2{,}272 = 3.5$ steps — a compaction every three or four steps, which shows how far the pure token model is from practice: information loss makes such frequent summarisation unacceptable.
:::
:::

::: exercise Comparing costs {level=2 check="57.7"}
Using [[#eq-compaction-cost]] with $B = 14{,}000$ and $\delta = 2{,}272$, compute the cost per step, in thousands of tokens to one decimal place, for $C = 96{,}000$. Compare it with the cost per step at $C^{*}$.
::: solution
At $C = 96{,}000$: $(14{,}000 + 96{,}000)/2 + 2{,}272\cdot96{,}000/82{,}000 = 55{,}000 + 2{,}660 = 57{,}660$ tokens, so $57.7$ thousand. At $C^{*} = 21{,}976$: $(14{,}000 + 21{,}976)/2 + 2{,}272\cdot21{,}976/7{,}976 = 17{,}988 + 6{,}260 = 24{,}248$, about $24.2$ thousand — less than half. The late threshold is paid for in tokens; what it buys is fewer lossy summaries.
:::
:::

::: exercise What to put in a summary {level=2}
Design a compaction template for a coding agent: list the sections, say what goes in each, and explain for each section what failure it prevents.
::: solution
(1) *Task and constraints*, copied verbatim from the user, never paraphrased — prevents drift from the original request. (2) *Decisions made, with reasons* — prevents re-litigating settled choices and contradicting earlier ones. (3) *Current state*: files changed, tests passing and failing, the branch — prevents redoing or undoing work. (4) *Open problems and next steps* — preserves the plan across the boundary. (5) *Facts discovered* (an API's quirk, the location of configuration) with references to where full details are (file paths, log offsets) — keeps the summary short while allowing the agent to recover details. (6) *What was verified and how* — prevents the summary from turning claims into facts. Sections are fixed so that omissions are visible, and the summary should be checked against the structured state where one exists.
:::
:::

::: exercise Deriving the optimum {level=3}
Repeat the derivation of [[#prop-compaction]] when each compaction costs a fixed $\kappa$ tokens (the summariser reads only the history since the last compaction, plus overhead) rather than $C$. Show that the optimal threshold is $C^{*} = B + \sqrt{2\delta\kappa}$, and interpret.
::: solution
Per step, the reading cost averages $(B + C)/2$, and compactions happen every $L = (C - B)/\delta$ steps at cost $\kappa$ each, so the cost per step is $\frac{B + C}{2} + \frac{\delta\kappa}{C - B}$. With $u = C - B$: $\frac{2B + u}{2} + \frac{\delta\kappa}{u}$, whose derivative $\frac12 - \frac{\delta\kappa}{u^2}$ vanishes at $u = \sqrt{2\delta\kappa}$. The square-root law is that of the economic order quantity: holding cost per step grows linearly with $u$, ordering (compaction) cost per step falls as $1/u$. Cheaper summaries ($\kappa$ small) justify compacting more often; faster growth ($\delta$ large) justifies longer cycles in tokens but means compaction comes round more often in steps.
:::
:::

::: exercise Normalisation and irrelevant candidates {level=3}
Show that with min–max normalisation the ranking produced by [[#eq-ga-score]] can change when a memory that is old, unimportant and no more relevant than the others is added to the candidate set, although nothing about the original memories has changed. Use memory 1 with (recency, importance, relevance) $= (0.9, 6, 0.6)$, memory 2 with $(0.5, 5, 0.8)$, and an added memory 3 with $(0, 1, 0.6)$. Propose a scoring rule without this defect.
::: solution
With two candidates: recencies normalise to $1, 0$; importances to $1, 0$; relevances to $0, 1$. Scores: memory 1, $2$; memory 2, $1$. Memory 1 ranks first. With memory 3 added: recencies $0.9, 0.5, 0$ normalise to $1, 0.556, 0$; importances $6, 5, 1$ to $1, 0.8, 0$; relevances $0.6, 0.8, 0.6$ to $0, 1, 0$. Scores: memory 1, $2$; memory 2, $0.556 + 0.8 + 1 = 2.356$; memory 3, $0$. Memory 2 now ranks first. The added memory scores zero and is never recalled, but by stretching the recency and importance scales it shrank memory 1's advantage on those components while leaving memory 2's relevance advantage at its full value of $1$. A rule without the defect uses fixed scales: raw recency $\lambda^{t - t_m}\in(0, 1]$, importance divided by $10$, cosine similarity mapped from $[-1, 1]$ to $[0, 1]$, then a weighted sum. Each score then depends only on the memory and the query, so adding candidates cannot reorder the others.
:::
:::
