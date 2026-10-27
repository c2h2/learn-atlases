One tool call answers one question. Most tasks worth delegating need many: find the file, read it, notice that the figures are elsewhere, read that, compute, check, answer. Nobody — not the user and not the developer — can write the sequence of calls down in advance, because each step depends on what the previous one revealed. The solution is to put the model in a **loop**: show it the task and everything that has happened so far, let it choose the next action, execute that action, append the observation, and repeat until it decides it is done. A model run this way is an **agent**, and the loop, together with its tools, prompts and limits, is called its **scaffold** or **harness**.

This chapter makes the loop precise. It defines an agent in the classical sense, then the language-model agent loop as a controller with an explicit state, policy and stopping rule, and the ReAct pattern of interleaving reasoning with actions (Yao et al., 2023) that most agents still follow. It then turns to the property that dominates the engineering of agents: errors compound over steps. Two small results — the probability of finishing a task of $k$ steps, and how retries and verification change it — explain both why agents fail and why checking work is the most effective way to make them succeed. The chapter closes with Reflexion (Shinn et al., 2023) and other ways an agent can learn from its own failed attempts, and with the practical design of loops: budgets, termination and traces. A plain-Python agent with a scripted model and a reliability simulation accompany the argument.

## What an agent is {#sec-agent}

The word comes from classical artificial intelligence, where it has a precise and deliberately broad meaning ([Intelligent agents](/learn/cs/lesson.php?c=artificial-intelligence&l=intelligent-agents) in the CS Atlas; Russell and Norvig, 2020, ch. 2).

::: definition Agent {#def-agent}
An **agent** interacts with an **environment** over discrete time. At each step $t$ it receives an **observation** (percept) $o_t$ and chooses an **action** $a_t$ from an action set $\mathcal{A}$; the environment changes and produces the next observation. The agent's behaviour is described by a **policy** $\pi$ mapping the **history** $h_t = (o_1, a_1, \dots, a_{t-1}, o_t)$ to an action (or a distribution over actions). Its quality is measured by a **performance measure** on the resulting sequence of environment states, chosen by its designer.
:::

The definition covers a thermostat and a chess program as well as a language model, which is the point: it separates *what an agent does* (map histories to actions) from *how* (a lookup table, a search procedure, a learned network). Reinforcement learning ([[post-training/rl-for-language-models]]) uses the same picture, with a reward signal as performance measure. What is new about language-model agents is the policy: a pretrained, instruction-tuned model that reads the history as text and writes the next action as text, with no task-specific training at all.

::: definition Language-model agent loop {#def-loop}
A **language-model agent** consists of a model $p_\theta$, a set of tools $\mathcal{T}$ ([[agents/function-calling#def-tool]]) defining the action set $\mathcal{A} = \{\text{tool calls}\}\cup\{\textsf{finish}(y)\}$, a **context** $c_t$ (the text the model sees at step $t$) and an **update rule**. Starting from $c_1 = (\text{system prompt}, \text{tool definitions}, \text{task})$, step $t$ is:

1. **Think and act.** Sample $(z_t, a_t)\sim p_\theta(\cdot\mid c_t)$, an optional free-text reasoning trace $z_t$ followed by an action $a_t\in\mathcal{A}$.
2. **Stop?** If $a_t = \textsf{finish}(y)$, or a **stopping condition** holds, end and return $y$ (or a failure).
3. **Execute.** Run $a_t$ in the environment and obtain the observation $o_t$ — a tool result, an error, a screenshot.
4. **Update.** $c_{t+1} = U(c_t, z_t, a_t, o_t)$; in the simplest case $U$ appends all three, $c_{t+1} = c_t\oplus z_t\oplus a_t\oplus o_t$.
:::

Three components of the definition are design choices, not givens. The **action set** decides what the agent can do and so what can go wrong (a read-only agent cannot delete anything). The **update rule** $U$ decides what the agent remembers: appending everything is simple but the context grows without bound, which [[agents/memory-context]] addresses with summarisation and retrieval. The **stopping conditions** decide when the loop ends if the model never says it is done.

::: definition Stopping conditions {#def-stopping}
A loop ends at the first step at which one of these holds:
- **completion**: the model emits $\textsf{finish}(y)$ (optionally only accepted if a check of $y$ passes);
- **step budget**: $t = T_{\max}$;
- **resource budget**: tokens, money or wall-clock time spent exceed a limit;
- **stagnation**: the same action with the same arguments has been taken $m$ times, or $m$ consecutive steps have produced errors;
- **escalation**: the next action needs a permission or confirmation that only a person can give ([[agents/agent-security]]).

Only the first returns a result; the others return a failure, a partial result or a request for help, and should say which.
:::

### Workflows and agents

Not every multi-step system needs the model to decide its own steps. When the steps are known — extract fields, then validate, then summarise — a fixed pipeline in which code calls the model at each stage is cheaper, faster and easier to test. A widely cited practitioner guide (Schluntz and Zhang, 2024) draws the line this way: in a **workflow**, models and tools are orchestrated through predefined code paths (prompt chaining, routing an input to one of several handlers, running calls in parallel and aggregating them, or having one call evaluate and refine another's output); in an **agent**, the model dynamically directs its own process and tool use. The guide's advice, which matches common experience, is to use the simplest pattern that works and to add autonomy only where the path genuinely cannot be fixed in advance. The rest of this chapter is about the case where it cannot.

## ReAct: reasoning and acting {#sec-react}

Before 2022 two lines of work used language models for multi-step problems separately. Chain-of-thought prompting ([[reasoning/chain-of-thought]]) let a model reason in text before answering, but the reasoning had no access to the world, so facts it lacked it invented. Action-generating systems, such as WebGPT's browsing commands (Nakano et al., 2021) or models that emitted actions in text games, acted in the world but did not reason explicitly about what they saw. Yao et al. (2023) combined the two.

::: definition ReAct {#def-react}
A **ReAct** agent is an agent loop ([[#def-loop]]) prompted (or fine-tuned) to produce, at each step, a free-text **thought** followed by an **action**, and to receive the **observation** before the next thought. A trajectory has the form
$$
\text{Thought}_1,\ \text{Action}_1,\ \text{Observation}_1,\ \text{Thought}_2,\ \text{Action}_2,\ \text{Observation}_2,\ \dots,\ \text{Action}_T = \textsf{finish}(y).
$$
Thoughts do not affect the environment; they decompose the goal, track progress, interpret observations and decide what to do next.
:::

In the original paper the actions on question-answering tasks were three Wikipedia operations — `search[entity]`, `lookup[string]` and `finish[answer]` — and the prompt contained a few human-written example trajectories. A shortened trajectory in that style:

```text
Question: Which of the two rivers is longer, the one through Kraków or the one through Prague?
Thought 1: Kraków is on the Vistula; Prague is on the Vltava. I need both lengths.
Action 1:  search[Vistula]
Obs 1:     The Vistula is the longest river in Poland, at 1,047 km ...
Thought 2: Now the Vltava.
Action 2:  search[Vltava]
Obs 2:     The Vltava is the longest river within the Czech Republic, 430 km ...
Thought 3: 1,047 km > 430 km, so the Vistula is longer.
Action 3:  finish[the Vistula]
```

Yao et al. evaluated ReAct on multi-hop question answering (HotpotQA) and fact verification (FEVER) with the Wikipedia interface, and on two interactive environments: ALFWorld, a text-based household simulator, and WebShop, a simulated online shop. They reported that on the interactive tasks ReAct, prompted with one or two examples, outperformed imitation- and reinforcement-learning baselines trained on many more demonstrations, by absolute success-rate margins of $34$ and $10$ percentage points respectively, and outperformed an "act-only" ablation without thoughts. On the knowledge tasks the picture was more nuanced: ReAct's answers were better grounded and less often hallucinated than chain-of-thought's, but it did not beat chain-of-thought with self-consistency on HotpotQA accuracy by itself; the best results came from switching between the two methods. Errors were also characteristic: an uninformative search result could derail the trajectory, and the model sometimes repeated the same thought and action in a loop.

Why do thoughts help? An action has to be chosen from the *current* context, and the context after several observations is long and cluttered. A thought written into the context is a summary the model makes for its future self — "I have the first length, now I need the second" — which makes the next step a much easier prediction. In the terms of [[#def-loop]], the thought is part of the state that the update rule carries forward, a cheap form of working memory. Models trained to reason at length before answering ([[reasoning]]) make the same move internally, and as of 2026 many agent scaffolds no longer ask for explicit "Thought:" lines because the model's own reasoning serves that role; the observe–think–act structure is unchanged.

### A minimal agent loop in plain Python

The listing implements [[#def-loop]] with three tools over a two-file "file system", a step budget, errors returned as observations and a deterministic stand-in for the model. The stand-in policy only looks at the last observation, which a real model would not; the point is the loop around it, which is the same whatever model is plugged in. The second half of the listing simulates the reliability calculations of the next section.

```python
import json, random

# --- environment: a tiny file system the agent can inspect -----------------
FILES = {"notes.txt": "budget: see q3.csv", "q3.csv": "jul,410\naug,385\nsep,442"}
def ls():           return sorted(FILES)
def read(path):     return FILES[path]
def add(numbers):   return sum(numbers)
TOOLS = {"ls": ls, "read": read, "add": add}

# --- a deterministic stand-in for the model --------------------------------
def mock_model(history):
    """Look at the last observation and choose the next step (thought, action)."""
    last = history[-1]
    if last["role"] == "user":
        return "I should see which files exist.", ("ls", {})
    obs = last["content"]
    if isinstance(obs, list):                       # result of ls
        return "notes.txt may say where the data is.", ("read", {"path": "notes.txt"})
    if isinstance(obs, str) and "see" in obs:
        f = obs.split("see ")[1]
        return f"The figures are in {f}.", ("read", {"path": f})
    if isinstance(obs, str) and "," in obs:
        nums = [int(line.split(",")[1]) for line in obs.splitlines()]
        return "Sum the three months.", ("add", {"numbers": nums})
    if isinstance(obs, (int, float)):
        return "I have the total.", ("final", {"answer": f"Q3 total: {obs}"})
    return "I am stuck.", ("final", {"answer": "unknown"})

def run_agent(task, model, max_steps=8):
    history = [{"role": "user", "content": task}]
    for step in range(1, max_steps + 1):
        thought, (name, args) = model(history)
        print(f"{step} thought: {thought}\n  action: {name} {json.dumps(args)}")
        if name == "final":                          # stopping condition 1
            return args["answer"], step
        try:
            obs = TOOLS[name](**args)
        except Exception as e:                       # errors become observations
            obs = f"error: {e}"
        print(f"  observation: {obs!r}")
        history += [{"role": "assistant", "content": [thought, name, args]},
                    {"role": "tool", "content": obs}]
    return None, max_steps                           # stopping condition 2: budget

print(run_agent("What was total spending in Q3?", mock_model))

# --- reliability over k steps: analytic vs simulated -----------------------
def episode(rng, p, k, r=1, d=1.0):
    """k steps; each attempt succeeds w.p. p; a failure is detected w.p. d
    and then retried, up to r attempts per step. Undetected failure = episode lost."""
    for _ in range(k):
        for attempt in range(r):
            if rng.random() < p: break               # step succeeded
            if attempt == r - 1 or rng.random() >= d:
                return False                         # out of retries, or not noticed
    return True

rng = random.Random(1)
N = 20000
for p, k, r, d in [(0.95, 20, 1, 1.0), (0.95, 20, 2, 1.0), (0.95, 20, 2, 0.8), (0.99, 50, 1, 1.0)]:
    sim = sum(episode(rng, p, k, r, d) for _ in range(N)) / N
    q = 1 - p
    step = p * (1 - (q * d) ** r) / (1 - q * d)      # Proposition: per-step success
    print(f"p={p} k={k} r={r} d={d}: analytic {step ** k:.4f}  simulated {sim:.4f}")
```

```text
1 thought: I should see which files exist.
  action: ls {}
  observation: ['notes.txt', 'q3.csv']
2 thought: notes.txt may say where the data is.
  action: read {"path": "notes.txt"}
  observation: 'budget: see q3.csv'
3 thought: The figures are in q3.csv.
  action: read {"path": "q3.csv"}
  observation: 'jul,410\naug,385\nsep,442'
4 thought: Sum the three months.
  action: add {"numbers": [410, 385, 442]}
  observation: 1237
5 thought: I have the total.
  action: final {"answer": "Q3 total: 1237"}
('Q3 total: 1237', 5)
p=0.95 k=20 r=1 d=1.0: analytic 0.3585  simulated 0.3566
p=0.95 k=20 r=2 d=1.0: analytic 0.9512  simulated 0.9478
p=0.95 k=20 r=2 d=0.8: analytic 0.7855  simulated 0.7859
p=0.99 k=50 r=1 d=1.0: analytic 0.6050  simulated 0.6040
```

The agent discovers the location of the data from the first file it reads — information no fixed pipeline would have had — and finishes in five steps, the fifth being the $\textsf{finish}$ action. The simulated success rates agree with the formulas derived next to within the sampling error of $20{,}000$ episodes (a standard error of about $0.003$).

## Errors compound {#sec-compound}

Every step of an agent is a model prediction and can be wrong: the wrong tool, a mistyped argument, a misread observation, a plausible but false conclusion. Over a long task these chances multiply.

::: proposition Success over $k$ steps {#prop-compound}
Suppose a task requires $k$ steps, each of which must succeed, and step $i$ succeeds with probability $p$ independently of the others. Then the task succeeds with probability $p^k$, and the number of steps $k_{1/2}$ at which the success probability falls to one half is
$$
k_{1/2} = \frac{\ln 2}{-\ln p}\approx\frac{0.693}{1 - p}\qquad(p\to1).
$$ {#eq-half-life}
:::

::: proof
Independence gives $\Prob(\text{all succeed}) = \prod_{i=1}^{k}p = p^k$. Solving $p^k = \frac12$ gives $k = \ln 2/(-\ln p)$, and $-\ln p = -\ln(1 - (1 - p)) = (1 - p) + \frac12(1 - p)^2 + \dots\approx 1 - p$ for $p$ near $1$.
:::

::: example The half-life of an agent {#ex-half-life}
A step is right $95\%$ of the time. What is the probability of completing $20$ steps? How many steps can the agent take before its success rate halves, and how reliable must a step be for $100$-step tasks to succeed $90\%$ of the time?
::: solution
$0.95^{20} = 0.358$, the figure quoted in the course overview. The half-life is $\ln2/(-\ln0.95) = 0.693/0.0513 = 13.5$ steps (the approximation gives $0.693/0.05 = 13.9$). For $p^{100} = 0.9$ we need $p = 0.9^{1/100} = e^{\ln 0.9/100} = e^{-0.00105} = 0.99895$: an error rate of about one in a thousand per step. Long tasks need per-step reliability far beyond what a single model call typically delivers.
:::
:::

The independence assumption cuts both ways, and is worth examining. Errors are often *positively* correlated — a model that misunderstood the task gets many steps wrong — which concentrates failures in some episodes and makes $p^k$ pessimistic for the others. On the other hand, not every error is fatal: an agent that reads the wrong file can notice and read the right one. The second observation is the key to reliable agents.

### Recovery: retries and verification

Suppose that after each step something checks the result — a test, a schema, the tool's own error, the model re-reading its output — and, if a failure is detected, the step is attempted again.

::: proposition Per-step success with verification and retries {#prop-retry}
Each attempt at a step succeeds with probability $p$, independently. After a failed attempt the failure is detected with probability $d$ (successes are never flagged), and a detected failure is retried, up to $r$ attempts in all; an undetected failure, or a failure on the last attempt, makes the step fail. Then the step succeeds with probability
$$
S(p, d, r) = p\sum_{j=0}^{r-1}\big((1 - p)\,d\big)^{j} = p\,\frac{1 - ((1 - p)d)^r}{1 - (1 - p)d},
$$ {#eq-step-success}
and a task of $k$ such steps succeeds with probability $S(p, d, r)^k$. With perfect detection ($d = 1$), $S = 1 - (1 - p)^r$.
:::

::: proof
The step succeeds at attempt $j + 1$ (for $j = 0, \dots, r - 1$) exactly when the first $j$ attempts fail and are each detected, which has probability $((1 - p)d)^j$, and attempt $j + 1$ succeeds, probability $p$. These events are disjoint, so $S$ is their sum, a finite geometric series with ratio $(1 - p)d < 1$. For $d = 1$, $S = p\,(1 - (1 - p)^r)/p = 1 - (1 - p)^r$. Steps are independent, so the task succeeds with probability $S^k$.
:::

::: example What one retry buys {#ex-retry}
With $p = 0.95$ and $k = 20$, compute the task success rate with one retry ($r = 2$) and perfect detection, and with one retry and a checker that catches $80\%$ of failures.
::: solution
Perfect detection: $S = 1 - 0.05^2 = 0.9975$ and $S^{20} = 0.951$, up from $0.358$. With $d = 0.8$: $S = 0.95\,(1 + 0.05\cdot0.8) = 0.95\cdot1.04 = 0.988$, and $0.988^{20} = 0.786$. The simulation in the listing gives $0.948$ and $0.786$. One retry with perfect detection nearly removes the compounding; an imperfect checker leaves a residual failure rate per step of $(1 - p)(1 - d) = 1\%$, which still compounds. Detection, not retrying, is the scarce resource.
:::
:::

::: widget plot
f: p^x; (1 - (1-p)^r)^x; (p*(1 - ((1-p)*d)^r)/(1 - (1-p)*d))^x
x: 1, 100
y: 0, 1.02
sliders: p=0.95:0.8:0.999:0.001; r=2:1:5:1; d=0.8:0:1:0.05
labels: no recovery $p^k$; $r$ attempts, perfect check; $r$ attempts, check catches a fraction $d$
points: 20,0.3585; 20,0.9512; 20,0.7855
caption: Task success against the number of steps $k$. Without recovery success decays as $p^k$ ([[#prop-compound]]). With $r$ attempts per step and a perfect check it decays as $(1 - (1 - p)^r)^k$, far more slowly; with a check that catches only a fraction $d$ of failures, the undetected errors $(1 - p)(1 - d)$ set the decay ([[#prop-retry]]). The marked points are [[#ex-retry]] at $k = 20$. Set $d = 1$ to see the second and third curves coincide.
:::

As $r\to\infty$, [[#eq-step-success]] tends to $p/(1 - (1 - p)d)$, which is less than $1$ whenever $d < 1$: unlimited retries cannot compensate for failures nobody notices. This simple fact organises much of agent design. Coding agents run tests because tests detect failures ([[agents/code-agents]]); tools return precise error messages because those are detections; schemas and validators catch malformed calls; and the most reliable agents are those working in environments that tell them, cheaply and truthfully, when they are wrong. Where no such signal exists, the model must check its own work, and the evidence on how well models detect their own errors is mixed (below).

### The loop as an absorbing Markov chain

A different idealisation describes open-ended tasks, where the number of steps is not fixed in advance. At every step the agent either finishes successfully, fails irrecoverably (deletes the data it needed, gets stuck in a state it cannot leave), or continues.

::: proposition Success and length of an open-ended loop {#prop-absorbing}
Suppose that at each step, independently of the past, the agent finishes successfully with probability $f$, fails irrecoverably with probability $g$, and continues with probability $1 - f - g$, where $f + g > 0$. Without a step budget the task succeeds with probability $f/(f + g)$ and the number of steps $N$ is geometric with mean $1/(f + g)$. With a budget of $T$ steps, the success probability is $\dfrac{f}{f + g}\big(1 - (1 - f - g)^T\big)$.
:::

::: proof
The loop ends at step $n$ with success with probability $(1 - f - g)^{n-1}f$. Summing over $n = 1, \dots, T$ gives $f\,\frac{1 - (1 - f - g)^T}{f + g}$, and letting $T\to\infty$ gives $f/(f + g)$. The loop ends at step $n$ at all with probability $(1 - f - g)^{n-1}(f + g)$, a geometric distribution with mean $1/(f + g)$.
:::

::: widget markov
matrix: 0.9,0.07,0.03; 0,1,0; 0,0,1
states: Working; Done; Failed
start: 0
steps: 30
caption: An agent loop as an absorbing Markov chain with $f = 0.07$ and $g = 0.03$ per step. Starting in "Working", the chain is eventually absorbed in "Done" with probability $0.07/0.10 = 0.7$ and in "Failed" with probability $0.3$, after $1/0.1 = 10$ steps on average ([[#prop-absorbing]]). Raise the number of steps to watch the distribution settle; a budget of $T = 10$ steps would give a success rate of only $0.7\,(1 - 0.9^{10}) = 0.46$ instead of $0.7$.
:::

The formula explains a common observation about budgets. Raising $T$ helps only while $(1 - f - g)^T$ is non-negligible; beyond a few multiples of the mean length $1/(f + g)$, more steps buy almost nothing, while each costs tokens and time. And the ratio $f/(f + g)$ shows the two levers: make progress towards success more likely per step, or make irrecoverable failure less likely — for instance by forbidding destructive actions, keeping backups, or asking before anything irreversible.

::: warning "Done" is a claim, not a check
An agent that emits $\textsf{finish}$ believes, or at least predicts, that the task is complete. Models stop early with confident summaries of work they did not do, declare tests passing that were never run, or answer before reading the observation that contradicts them. Treat completion as a hypothesis: where possible, verify the result in code (run the tests, re-read the file, check the record exists) before accepting it, and report to the user what was verified and what was not.
:::

## Learning from failed attempts {#sec-reflexion}

Retrying the same step with the same context tends to produce the same mistake. An agent that fails a whole task can do better on its next attempt if it knows *why* it failed. Shinn et al. (2023) turned this into a method.

::: definition Reflexion {#def-reflexion}
**Reflexion** runs an agent for repeated **trials** of the same task. After each trial an evaluator produces a signal — a binary success, a scalar score, test results, or a model's judgement — and, if the trial failed, the model writes a short natural-language **self-reflection** analysing what went wrong and what to do differently. Reflections are stored in an episodic memory buffer (the last few are kept) and included in the context of the next trial. Model weights are not changed: the "learning" is entirely in the text carried between trials.
:::

The authors called this *verbal reinforcement learning*: the reflection plays the role that a gradient step plays in ordinary reinforcement learning, turning a sparse reward into a specific, actionable correction. They reported improvements on decision making in ALFWorld (where, with repeated trials, the agent completed $130$ of $134$ tasks), on HotpotQA, and on code generation, where on HumanEval ([[agents/code-agents]]) Reflexion with GPT-4 reached $91\%$ pass@1 against $80\%$ reported for GPT-4 alone at the time. The code results illustrate where the method works best: the evaluator was a set of unit tests the model itself wrote and ran, a cheap and fairly reliable detection signal.

Two qualifications are needed for a fair picture. First, Reflexion uses *multiple trials of the same task with feedback after each*, so its numbers are not comparable to single-attempt results; it is a form of test-time search ([[reasoning/test-time-scaling]]). Second, its gains depend on the quality of the feedback. Huang et al. (2024) found that when models are asked to critique and revise their own answers to reasoning problems *without* external feedback, accuracy often does not improve and can decline, because the model changes correct answers as readily as wrong ones. Self-correction works when something outside the model — a test, a tool, the environment — tells it that it is wrong; [[#prop-retry]] says the same thing in a formula, where everything hinges on $d$.

::: example When does a second trial pay? {#ex-trials}
A coding agent solves a task on the first trial with probability $0.6$. A test suite detects every failure. On a retry with a written reflection the success probability is $0.5$; without reflection (a fresh, independent attempt) it is $0.35$, since the easy tasks were already solved. What is the probability of success within two trials in each case, and what is the expected number of trials?
::: solution
With reflection: $0.6 + 0.4\cdot0.5 = 0.80$; without: $0.6 + 0.4\cdot0.35 = 0.74$. Expected trials in both cases: $1 + 0.4 = 1.4$, since a second trial is run exactly when the first fails. The reflection's value is the six-point gain at the same cost in trials (plus the tokens of the reflection itself). Note that the retry success rates are conditional on a first failure: the failures are the harder tasks, so retry rates are lower than first-try rates, another breach of independence.
:::
:::

Other designs pursue the same goal. Self-refine (Madaan et al., 2023) has the model critique and revise a single output iteratively; tree-search methods such as LATS (Zhou et al., 2024) explore several branches of an agent's trajectory and use value estimates and reflections to choose among them; and the planning methods of the next chapter decide in advance how to break a task into checkable parts.

## Designing the loop {#sec-design}

A working scaffold makes many small decisions that the definition leaves open. The following are the ones that most affect reliability and cost.

- **The system prompt** states the goal, the conventions (how to call tools, how to finish, when to ask the user), the constraints and the available budget. It is read on every step, so it is worth more care than any other prompt.
- **The tool set** should be small, well described and *orthogonal*: tools whose purposes overlap invite confusion ([[agents/function-calling#sec-selection]]). Tools designed for agents often return less than an interface designed for people would — a summary of a search rather than the raw page — because every observation costs context.
- **Observations** should be truncated, paged or summarised to a bounded size, and errors should say what to do ("file not found; use `ls` to see existing files") rather than only what went wrong.
- **Budgets** (steps, tokens, time, money) bound the cost of a runaway loop. [[#prop-absorbing]] suggests setting the step budget at a few times the typical length of a successful run.
- **Loop detection.** Stop or intervene when the agent repeats the same action with the same arguments, a characteristic failure since the original ReAct paper.
- **Checkpoints with people.** For long or consequential tasks, the loop can pause for approval at defined points; for irreversible actions it must ([[agents/agent-security]]).
- **Traces.** Log every context, thought, action and observation. Agents fail in ways that are hard to predict and easy to understand once read; the trace is the debugging tool, the evaluation data ([[agents/agent-security#sec-evaluation]]) and the audit record.

::: example The cost of a long loop {#ex-loop-cost}
An agent's context starts at $6{,}000$ tokens and grows by $1{,}500$ tokens per step (thought, action and observation). Each step's input is the whole context. How many input tokens does a $30$-step run consume? At a price of $\$3$ per million input tokens, what does it cost, and how would caching of the unchanged prefix change the picture?
::: solution
Step $t$ reads $6{,}000 + 1{,}500(t - 1)$ tokens. Summing over $t = 1, \dots, 30$: $30\cdot6{,}000 + 1{,}500\cdot\frac{29\cdot30}{2} = 180{,}000 + 652{,}500 = 832{,}500$ tokens, about $\$2.50$. The total grows quadratically with the number of steps — doubling the run to $60$ steps gives $360{,}000 + 1{,}500\cdot1{,}770 = 3{,}015{,}000$ tokens, more than three and a half times as many. Because each step's context is the previous one plus new tokens, prefix caching ([[inference/kv-cache]]) avoids recomputing most of it; providers typically charge cached input at a fraction of the normal price, which changes the constant but not the growth of the context itself, whose limit [[agents/memory-context]] takes up.
:::
:::

::: quiz
An agent fails $40\%$ of a set of tasks. Its traces show that most failures happen after a tool returns an error the agent misreads, after which it continues confidently along a wrong path. Which change is most likely to help?
- [ ] Raise the step budget from $30$ to $100$.
- [ ] Ask the model to think step by step.
- [x] Make tool errors explicit and actionable, and add a check after error-prone steps, so that failures are detected and retried.
- [ ] Run the same agent five times and take the longest answer.
::: solution
The traces show undetected failures: in the terms of [[#prop-retry]], $d$ is small. Improving detection — clear errors, checks after risky steps — attacks exactly that. A larger budget helps only agents that would eventually succeed ([[#prop-absorbing]]); these continue down a wrong path. Asking for reasoning does not supply the missing signal, and the longest answer is not the most likely to be right.
:::
:::

::: history
The agent abstraction — percepts, actions, a policy and a performance measure — was codified for artificial intelligence in Russell and Norvig's textbook (first edition 1995; fourth edition 2020) and in Wooldridge's work on multi-agent systems. Language models were first used as policies in text environments, for instance by Huang et al. (2022), who prompted models to produce step-by-step plans for household tasks, and in WebGPT's browsing (Nakano et al., 2021). Yao et al. posted ReAct in October 2022 (published at ICLR 2023), combining reasoning traces with actions and observations. In spring 2023 open-source projects such as AutoGPT and BabyAGI ran models in open-ended loops with self-generated task lists, attracting wide attention and showing in practice how quickly errors compound. Shinn et al. (2023) introduced Reflexion; Madaan et al. (2023) self-refine; Wang et al. (2023) Voyager, an agent in Minecraft that wrote and reused code as skills; and Huang et al. (2024) cautioned that self-correction without external feedback is unreliable. Practitioner guidance distinguishing workflows from agents (Schluntz and Zhang, 2024) and models trained specifically for long agentic tasks with reinforcement learning made the loop of this chapter the standard architecture by 2025.
:::

::: summary
- An agent maps a history of observations to actions; a language-model agent uses the model as its policy, tools as its actions, and a loop that appends each thought, action and observation to the context.
- The loop is defined by its action set, its update rule and its stopping conditions: completion, step and resource budgets, stagnation and escalation to a person.
- Use fixed workflows when the steps are known; use an agent when they must be discovered.
- ReAct interleaves free-text thoughts with actions and observations; thoughts act as working memory, and observations ground the reasoning in facts.
- Errors compound: $k$ independent steps of reliability $p$ succeed with probability $p^k$, halving every $\ln2/(-\ln p)\approx0.69/(1 - p)$ steps.
- Verification with $r$ attempts per step raises per-step success to $p\,(1 - ((1 - p)d)^r)/(1 - (1 - p)d)$; undetected failures, not retries, limit reliability.
- Reflexion carries natural-language reflections between trials and works best with a reliable external signal; self-correction without feedback is unreliable.
- Bound loops with budgets, detect repetition, make errors actionable, keep people in the loop for consequential actions, and log full traces.
:::

## Exercises

::: exercise Twenty steps {level=1 check="0.358"}
An agent's steps each succeed independently with probability $0.95$. What is the probability that a $20$-step task succeeds? Give three decimal places.
::: solution
$0.95^{20} = 0.3585$, so $0.358$ to three decimal places ([[#prop-compound]]).
:::
:::

::: exercise Half-life {level=1 check="68.97"}
How many steps does it take for the success probability of an agent with per-step reliability $p = 0.99$ to fall to one half? Give two decimal places.
::: solution
$k_{1/2} = \ln2/(-\ln0.99) = 0.693147/0.0100503 = 68.97$ steps; the approximation $0.693/0.01 = 69.3$ is close.
:::
:::

::: exercise One retry with a perfect check {level=1 check="0.9975"}
What is the per-step success probability with $p = 0.95$, perfect detection and $r = 2$ attempts?
::: solution
$1 - (1 - 0.95)^2 = 1 - 0.0025 = 0.9975$ ([[#prop-retry]] with $d = 1$).
:::
:::

::: exercise Required reliability {level=2 check="0.99895"}
What per-step reliability $p$ (without recovery) makes a $100$-step task succeed with probability $0.9$? Give five decimal places.
::: solution
$p = 0.9^{1/100} = \exp(\ln0.9/100) = \exp(-0.0010536) = 0.99895$.
:::
:::

::: exercise Imperfect checks {level=2 check="0.842"}
A step succeeds with probability $0.9$. A checker detects $85\%$ of failures, and detected failures are retried, up to $3$ attempts in all. What is the per-step success probability, and what is the success probability of a $10$-step task? Give the latter to three decimal places.
::: solution
$(1 - p)d = 0.1\cdot0.85 = 0.085$, so by [[#eq-step-success]] $S = 0.9\,(1 + 0.085 + 0.085^2) = 0.9\cdot1.092225 = 0.98300$. Then $S^{10} = 0.98300^{10} = 0.842$. Without the checker the task would succeed with probability $0.9^{10} = 0.349$.
:::
:::

::: exercise Budget for an open-ended task {level=2 check="0.4559"}
In the setting of [[#prop-absorbing]] with $f = 0.07$ and $g = 0.03$, what is the success probability with a budget of $T = 10$ steps? Give four decimal places. What budget captures $95\%$ of the success probability achievable without a budget?
::: solution
$\frac{0.07}{0.10}(1 - 0.9^{10}) = 0.7\,(1 - 0.348678) = 0.7\cdot0.651322 = 0.45593$, so $0.4559$. For $95\%$ we need $0.9^T\le0.05$, $T\ge\ln0.05/\ln0.9 = 28.4$, so $T = 29$ steps — about three times the mean run length of $10$.
:::
:::

::: exercise Quadratic cost {level=2}
Show that if an agent's context starts at $c_0$ tokens and grows by $\delta$ tokens per step, the total number of input tokens over $T$ steps is $Tc_0 + \delta\,T(T - 1)/2$. For $c_0 = 6{,}000$ and $\delta = 1{,}500$, find the number of steps at which the growth term first exceeds the fixed term.
::: solution
Step $t$ reads $c_0 + \delta(t - 1)$ tokens, and $\sum_{t=1}^{T}(t - 1) = T(T - 1)/2$. The growth term exceeds the fixed term when $\delta(T - 1)/2 > c_0$, that is $T - 1 > 2c_0/\delta = 8$, so from $T = 10$ steps on (at $T = 9$ they are equal: $9\cdot6{,}000 = 54{,}000 = 1{,}500\cdot36$). Beyond that, the cost of an agent is dominated by re-reading its own history.
:::
:::

::: exercise Infinite retries {level=3}
Show that as $r\to\infty$ the per-step success probability of [[#prop-retry]] tends to $p/(1 - (1 - p)d)$, and that the expected number of attempts per step is $(1 - ((1 - p)d)^r)/(1 - (1 - p)d)$. Interpret the limit when $d = 0.5$ and $p = 0.8$. What does this say about spending compute on retries versus on better detection?
::: solution
The geometric sum in [[#eq-step-success]] converges because $(1 - p)d < 1$. An attempt $j + 1$ is made exactly when the first $j$ attempts failed and were detected, probability $((1 - p)d)^j$, so the expected number of attempts is $\sum_{j=0}^{r-1}((1 - p)d)^j = (1 - ((1 - p)d)^r)/(1 - (1 - p)d)$. With $p = 0.8$ and $d = 0.5$, the limit is $0.8/(1 - 0.1) = 0.889$: no number of retries pushes the step above $89\%$, while each retry beyond the second adds little ($r = 2$ already gives $0.8\cdot1.1 = 0.88$). Raising detection to $d = 0.9$ gives a limit of $0.8/0.82 = 0.976$. Beyond one or two retries, compute is better spent on detection — tests, validators, independent checks — than on more attempts.
:::
:::

::: exercise A loop detector {level=3}
Extend `run_agent` in the listing with two stopping conditions of [[#def-stopping]]: stop with a failure message if the same (tool, arguments) pair is chosen three times, or if three consecutive observations are errors. Test it with a model that always calls `read` on a missing file.
::: solution
```python
import json
FILES = {"notes.txt": "budget: see q3.csv"}
TOOLS = {"read": lambda path: FILES[path]}

def run_agent(task, model, max_steps=8, max_repeat=3, max_errors=3):
    history, seen, errors = [{"role": "user", "content": task}], {}, 0
    for step in range(1, max_steps + 1):
        thought, (name, args) = model(history)
        if name == "final":
            return args["answer"], step
        key = (name, json.dumps(args, sort_keys=True))
        seen[key] = seen.get(key, 0) + 1
        if seen[key] >= max_repeat:
            return f"stopped: repeated {name} {key[1]} {seen[key]} times", step
        try:
            obs, errors = TOOLS[name](**args), 0
        except Exception as e:
            obs, errors = f"error: {e!r}", errors + 1
            if errors >= max_errors:
                return f"stopped: {errors} consecutive errors", step
        history += [{"role": "assistant", "content": [thought, name, args]},
                    {"role": "tool", "content": obs}]
    return "stopped: step budget", max_steps

stubborn = lambda h: ("Read the data.", ("read", {"path": "q3.csv"}))
print(run_agent("Total for Q3?", stubborn))
```

```text
('stopped: repeated read {"path": "q3.csv"} 3 times', 3)
```

Both conditions would fire at step $3$ here; the repetition check comes first in the code. Arguments are serialised with sorted keys so that `{"a":1,"b":2}` and `{"b":2,"a":1}` count as the same call. A real detector should also catch near-repetitions (the same search with trivially different wording), which needs a similarity measure rather than equality.
:::
:::
