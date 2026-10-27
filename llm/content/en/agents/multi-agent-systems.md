Once one model can act as an agent, nothing prevents several from working together: one agent plans and delegates while others search in parallel; a "programmer" writes code that a "reviewer" criticises; three instances answer a question independently, read each other's answers and argue towards agreement. Such **multi-agent systems** are attractive for reasons both practical and conceptual. Each agent has its own context window, so a team can hold far more material than one agent; independent agents can work in parallel; and separate roles with separate instructions are easier to specify, test and replace than one enormous prompt. They are also easy to build badly — systems in which agents talk at length, duplicate one another's work, lose information at every hand-over and agree confidently on wrong answers.

This chapter takes the useful view that a multi-agent system is a design choice with costs that can be counted and benefits that must be demonstrated. It starts from the classical theory of multi-agent systems (Wooldridge, 2009), then describes the three patterns that dominate practice — orchestrator–worker, role decomposition and debate — with the analysis that explains when each helps: the Condorcet jury theorem for independent agents, the effect of correlated errors that breaks it, and the communication cost of different topologies. It reviews the evidence, including debate between model instances (Du et al., 2023), debate as an alignment proposal (Irving et al., 2018), and studies of why multi-agent systems fail, and closes with when to use more than one agent and when not to. A plain-Python simulation computes majority-vote accuracy with and without shared errors, and the token cost of communication.

## Agents among agents {#sec-mas}

Multi-agent systems were a field of artificial intelligence long before language models, concerned with how autonomous software agents coordinate, negotiate and compete (Wooldridge, 2009). Its central distinction carries over directly: **cooperative** systems, whose agents share one goal set by one designer, and **self-interested** systems, whose agents represent different parties — buyers and sellers, competing firms — and must be analysed with game theory. Almost every language-model multi-agent system built so far is cooperative: one developer, one goal, several model instances. Agents acting for different people, negotiating with each other's agents, are an emerging and harder case, and the place where the classical theory of mechanisms and protocols will matter most.

::: definition Multi-agent system {#def-mas}
A (language-model) **multi-agent system** consists of agents $1, \dots, n$, each an agent loop ([[agents/agent-loops#def-loop]]) with its own system prompt (its **role**), tool set, context and possibly model; a **communication topology**, a directed graph whose edge $i\to j$ means that messages from agent $i$ enter agent $j$'s context; and a **protocol** specifying when agents run, what messages contain and how the system's final output is produced. Agents that share nothing but messages have **separate contexts**; the information reaching agent $j$ is exactly what its incoming edges carry.
:::

The last sentence is the crux of the whole subject. Separate contexts are both the main benefit — each agent's context stays short and focused — and the main hazard: every message is a compression of what its sender knew, and whatever the sender omitted, the receiver cannot know. A single agent has one context and never miscommunicates with itself.

The classical literature also supplies protocols that reappear in modern systems. The **contract net protocol** (Smith, 1980) allocates tasks by announcement and bidding: a manager announces a task, contractors bid according to their capabilities, and the manager awards the contract — an early orchestrator–worker scheme, with workers that decide whether they are suited to a task. **Blackboard architectures** let agents communicate through a shared workspace rather than direct messages, much as agents today share files or a task board.

## Three patterns {#sec-patterns}

### Orchestrator and workers

::: definition Orchestrator–worker {#def-orchestrator}
In the **orchestrator–worker** pattern, a lead agent (the orchestrator) receives the task, decomposes it ([[agents/planning]]) into subtasks, and starts worker agents, each with a brief describing its subtask, the expected output and any constraints. Workers run independently, often in parallel, each in its own context with its own tools, and return a condensed result. The orchestrator integrates the results and may start further workers, until it produces the final output. The topology is a star: workers communicate only with the orchestrator.
:::

The pattern fits tasks that are broad rather than deep: researching a question from many sources, reviewing many files, trying several approaches to a problem. Each worker can read tens of thousands of tokens and return a few hundred, so the orchestrator's context holds conclusions rather than raw material — a form of the context management of [[agents/memory-context]], in which the "summariser" is a whole agent. Anthropic's description of its multi-agent research system (2025) is an instructive vendor report: it states that, on the company's internal research evaluation, an orchestrator with parallel worker agents outperformed a single agent by a wide margin, while consuming many times more tokens than ordinary chat — about fifteen times, by their account — and that most of the variance in performance on a browsing benchmark was explained by the number of tokens used. Both halves of that report matter. More agents bought more total context and more parallel search, which is a real benefit for breadth-first tasks; and much of the gain was bought with compute, so a comparison with a single agent given the same token budget is the fair one ([[#sec-evidence]]).

::: example Latency of an orchestrated search {#ex-latency-team}
A research task needs $75$ tool-using steps of reading, which split into $5$ independent parts of $15$ steps each. Each step takes $6$ s. The orchestrator needs $2$ steps to plan and brief and $3$ steps to integrate the reports. Compare the wall-clock time of one agent doing everything with the orchestrated team, and find the speed-up.
::: solution
One agent: $75\cdot6 = 450$ s. Team: planning $2\cdot6 = 12$ s, then the five workers in parallel, $15\cdot6 = 90$ s, then integration $3\cdot6 = 18$ s, in all $120$ s. The speed-up is $450/120 = 3.75$, less than the $5$ workers because the orchestrator's steps are sequential — the same structure as Amdahl's law. If the parts are unequal, the slowest worker sets the pace ([[agents/function-calling#prop-rounds]]).
:::
:::

Writing the brief is the orchestrator's hardest job. A worker told "research the market for heat pumps" will return something; a worker told which countries, which years, what format, which sources to avoid and what the other workers are covering returns something usable. Underspecified briefs produce duplicated effort, gaps between workers and results in incompatible forms.

### Role decomposition

A second pattern assigns agents fixed **roles** modelled on human teams, connected in a pipeline or a small graph. ChatDev (Qian et al., 2024) and MetaGPT (Hong et al., 2024) organised software development as a virtual company — product manager, architect, programmer, tester — passing structured artefacts (requirements, designs, code, test reports) between roles; MetaGPT emphasised standardised operating procedures, so that each hand-over had a defined format. Simpler two-role designs are common: a **generator–critic** pair in which one agent drafts and another reviews against criteria, repeating until the critic approves or a budget runs out (the evaluator–optimiser workflow of [[agents/agent-loops#sec-agent]]).

Roles help in two ways that are easy to confuse. Separate prompts specialise behaviour — a reviewer instructed to find faults looks for faults more consistently than a generator asked to "check your work". And separate contexts give the critic a fresh view, uncontaminated by the reasoning that produced the draft. Neither requires a different *model*; both can be had with one model under different prompts.

### Debate and voting

The third pattern uses several agents on the *same* question and combines their answers. The simplest combination is a vote.

::: proposition Majority voting with independent agents (Condorcet) {#prop-condorcet}
Let $n$ be odd and let each of $n$ agents answer a binary question correctly with probability $p$, independently. The majority is correct with probability
$$
M_n(p) = \sum_{k = (n+1)/2}^{n}\binom{n}{k}p^k(1 - p)^{n - k}.
$$ {#eq-majority}
If $p > \frac12$, then $M_n(p)\ge1 - \exp\!\big(-2n(p - \tfrac12)^2\big)$, so $M_n(p)\to1$ as $n\to\infty$; if $p < \frac12$, $M_n(p)\to0$.
:::

::: proof
The number of correct agents $K$ is $\Bin(n, p)$, and the majority is correct when $K\ge(n + 1)/2$, which gives [[#eq-majority]]. The majority is wrong only if $K\le n/2$, that is if $K/n - p\le-(p - \frac12)$. By Hoeffding's inequality for the mean of $n$ independent variables in $[0, 1]$, $\Prob(K/n - p\le-t)\le e^{-2nt^2}$ for $t > 0$; with $t = p - \frac12$ this gives the bound. For $p < \frac12$, apply the same argument to wrong answers, which then form the expected majority.
:::

This is the **Condorcet jury theorem** (Condorcet, 1785), and it is the mathematical case for ensembles — and the reason that self-consistency ([[reasoning/self-consistency]]) works. Its hypotheses are also exactly where multi-agent systems fail it. Agents built on the same model, given the same prompt, err on the same inputs for the same reasons; their errors are correlated, and correlation caps the benefit of numbers.

::: proposition Voting with a common-mode error {#prop-correlated}
Suppose that with probability $\rho$ all $n$ agents give the same answer, which is correct with probability $p$ (a shared failure or success, for instance because the question triggers the same misconception in all of them), and otherwise they answer independently as in [[#prop-condorcet]]. Then the majority is correct with probability
$$
\rho\,p + (1 - \rho)\,M_n(p)\ \xrightarrow[n\to\infty]{}\ 1 - \rho\,(1 - p)\qquad (p > \tfrac12).
$$ {#eq-correlated}
:::

::: proof
Condition on whether the shared mode occurs. With probability $\rho$ all answers coincide, and the majority is correct with probability $p$; with probability $1 - \rho$ the agents are independent and the majority is correct with probability $M_n(p)$. The total probability theorem gives the expression, and $M_n(p)\to1$ gives the limit $\rho p + 1 - \rho = 1 - \rho(1 - p)$.
:::

::: widget distribution
dist: binomial
params: n=5, p=0.7
a: 3
b: 5
caption: The number of correct answers among $n$ independent agents, each right with probability $p$. The shaded region, at least three of five, is the probability that the majority is right: $M_5(0.7) = 0.837$ ([[#prop-condorcet]]). Increase $n$ (keeping $a$ at a majority) to watch the probability approach $1$; set $p$ below $\frac12$ and the majority becomes reliably wrong. The model assumes independence, which agents sharing a model and a prompt violate ([[#prop-correlated]]).
:::

::: example Measuring the common mode {#ex-rho}
One instance of a model is correct on $81\%$ of a benchmark; a majority of five instances is correct on $83\%$. Under the model of [[#prop-correlated]], estimate $\rho$, and predict the accuracy of a majority of twenty-five instances.
::: solution
Independent voters would give $M_5(0.81) = 0.949$. Solving $0.83 = 0.81\rho + 0.949(1 - \rho)$ gives $\rho = (0.949 - 0.83)/(0.949 - 0.81) = 0.857$. With twenty-five instances, $M_{25}(0.81)\approx1$, so the prediction is $0.81\cdot0.857 + 1\cdot0.143 = 0.837$ — barely better than five. The model is crude (real correlation is not all-or-nothing), but the conclusion is robust: when the gain from five voters is small, the gain from more is smaller still.
:::
:::

**Debate** goes beyond voting by letting the agents see and respond to each other. Du et al. (2023) had several instances of a model answer a question, then showed each the others' answers and asked it to update its own, over several rounds; the final answer was taken by majority. They reported improved accuracy over single answers on arithmetic and grade-school mathematics problems and better factual accuracy in biographies, compared with single-model baselines including self-reflection. The idea that agents can correct one another is appealing, but the comparison that matters is with equal compute: $n$ agents over $R$ rounds generate $nR$ answers, and simply sampling $nR$ independent answers and voting is a strong baseline. Studies that controlled for this (for example Smit et al., 2024) found that multi-agent debate did not reliably beat self-consistency and other ensembling strategies at comparable budgets, and that its results were sensitive to hyperparameters such as the number of rounds and how strongly agents were told to agree. Exchanging answers can also *increase* correlation: a confident wrong answer can persuade the others, converting independent errors into a shared one.

Debate also has a different meaning in alignment research. Irving, Christiano and Amodei (2018) proposed **AI safety via debate**: two capable agents argue opposite sides of a question before a human judge, who decides which was more truthful and helpful; trained to win, each agent is incentivised to expose the other's errors and deceptions, so that a judge who could not answer the question alone can still judge the debate. They argued, by analogy with interactive proofs in complexity theory, that debate with optimal play could let a limited judge decide questions far beyond its own ability. That is a proposal about training and oversight ([[safety-alignment/scalable-oversight]]), with a zero-sum, adversarial structure, and it should not be confused with the cooperative answer-sharing of Du et al.; empirical tests of it with language models are discussed in the safety course.

::: example Is a debate worth it? {#ex-debate}
Three agents each answer a question correctly with probability $0.7$. (a) What is the accuracy of a majority vote if they are independent? (b) What if, with probability $0.4$, they share a common-mode response? (c) A two-round debate costs as much as $6$ independent samples; what accuracy would a majority of $7$ independent samples give (using one extra to break ties)?
::: solution
(a) $M_3(0.7) = 0.7^3 + 3\cdot0.7^2\cdot0.3 = 0.343 + 0.441 = 0.784$. (b) $0.4\cdot0.7 + 0.6\cdot0.784 = 0.28 + 0.4704 = 0.750$. (c) $M_7(0.7) = \sum_{k=4}^{7}\binom7k0.7^k0.3^{7-k} = 0.2269 + 0.3177 + 0.2471 + 0.0824 = 0.874$. A debate among three agents must reach about $87\%$ to beat a cheaper vote over independent samples — and if the samples share common-mode errors, both fall short of these numbers by the same mechanism.
:::
:::

### A simulation of voting and communication

The listing checks [[#eq-majority]] and its Hoeffding bound, simulates voting with a common-mode probability $\rho = 0.5$, and counts the tokens read per round of communication in two topologies.

```python
import random
from math import comb, exp

def majority_exact(n, p):
    """P(a strict majority of n independent voters is correct), n odd."""
    return sum(comb(n, k) * p**k * (1 - p)**(n - k) for k in range(n // 2 + 1, n + 1))

def majority_sim(rng, n, p, rho, trials=100_000):
    """With probability rho all agents share one draw (a common-mode error source);
    otherwise they answer independently. Each draw is correct w.p. p."""
    wins = 0
    for _ in range(trials):
        if rng.random() < rho:
            wins += rng.random() < p
        else:
            wins += sum(rng.random() < p for _ in range(n)) > n // 2
    return wins / trials

rng = random.Random(42)
p = 0.7
for n in (1, 3, 5, 9, 15):
    hoeff = 1 - exp(-2 * n * (p - 0.5) ** 2)
    print(f"n={n:2d} exact {majority_exact(n, p):.4f}  Hoeffding bound {hoeff:.4f}  "
          f"sim rho=0 {majority_sim(rng, n, p, 0.0):.4f}  rho=0.5 {majority_sim(rng, n, p, 0.5):.4f}")

# Tokens read per round of communication, messages of L tokens, n agents.
L = 500
print("n  broadcast  orchestrator")
for n in (2, 4, 8, 16):
    broadcast = n * (n - 1) * L          # everyone reads everyone else's message
    star = 2 * (n - 1) * L               # orchestrator reads n-1 reports; each worker reads 1 brief
    print(f"{n:2d} {broadcast:9d} {star:12d}")
```

```text
n= 1 exact 0.7000  Hoeffding bound 0.0769  sim rho=0 0.6984  rho=0.5 0.7012
n= 3 exact 0.7840  Hoeffding bound 0.2134  sim rho=0 0.7847  rho=0.5 0.7430
n= 5 exact 0.8369  Hoeffding bound 0.3297  sim rho=0 0.8360  rho=0.5 0.7682
n= 9 exact 0.9012  Hoeffding bound 0.5132  sim rho=0 0.9032  rho=0.5 0.8026
n=15 exact 0.9500  Hoeffding bound 0.6988  sim rho=0 0.9506  rho=0.5 0.8239
n  broadcast  orchestrator
 2      1000         1000
 4      6000         3000
 8     28000         7000
16    120000        15000
```

Independent agents follow the exact curve; the Hoeffding bound is valid but loose for small $n$. With a common mode half the time, fifteen agents reach only $0.82$, already close to the limit $1 - 0.5\cdot0.3 = 0.85$ of [[#eq-correlated]]: beyond a handful of agents, extra agents buy almost nothing. The token counts show the other cost of numbers.

## Communication cost {#sec-communication}

::: proposition Tokens per round in two topologies {#prop-topology}
In one round of communication among $n$ agents, let every message be $L$ tokens. If every agent broadcasts to every other (a complete graph), the agents read $n(n - 1)L$ tokens in total. In a star with one orchestrator and $n - 1$ workers, in which the orchestrator sends each worker a brief and each worker returns a report, the agents read $2(n - 1)L$ tokens. If every message is kept in its readers' contexts for the remaining rounds, then over $R$ rounds the total input read by the agents grows as $R^2$ in both topologies.
:::

::: proof
In the complete graph each of the $n$ messages is read by $n - 1$ agents. In the star, the $n - 1$ briefs are read by one worker each and the $n - 1$ reports by the orchestrator, $2(n - 1)$ readings. If messages accumulate, the context of each reader in round $r$ contains the messages of rounds $1, \dots, r$, so the tokens read in round $r$ are proportional to $r$, and the total over $R$ rounds to $\sum_{r=1}^{R}r = R(R + 1)/2$.
:::

::: widget plot
f: x*(x - 1)*L/1000; 2*(x - 1)*L/1000
x: 2, 20
y: 0, 200
sliders: L=500:100:2000:50
labels: complete graph, $n(n-1)L$; orchestrator star, $2(n-1)L$
points: 8,28; 8,7; 16,120; 16,15
caption: Thousands of tokens read in one round of communication against the number of agents $n$, with messages of $L$ tokens ([[#prop-topology]]). Broadcasting grows quadratically, the star linearly; at $16$ agents with $500$-token messages they differ by a factor of eight. The marked points are the listing's. Quadratic communication is one reason debates use few agents and few rounds, and large systems use hierarchies.
:::

Tokens are only the visible cost. Every message is a lossy summary, so information degrades with each hop; agents waiting for each other add latency; and the more agents interact, the more ways there are for them to disagree about the state of the task. Cemri et al. (2025) analysed execution traces of several open-source multi-agent frameworks on coding and reasoning tasks and catalogued their failures into three broad groups: problems of **specification and system design** (agents disobeying their role or the task, steps repeated, loss of conversation history, unawareness of termination conditions), **inter-agent misalignment** (withholding information, ignoring other agents' input, reasoning–action mismatches, derailment from the task) and **task verification** (premature termination, missing or incorrect checking of the result). Many of these are failures of communication that a single agent cannot have.

::: example The cost of a research team {#ex-team}
An orchestrator spawns $5$ workers. Each worker reads $60{,}000$ tokens of sources over $15$ steps (its context growing from $3{,}000$ by $4{,}000$ per step) and returns a $1{,}000$-token report. The orchestrator's context is $8{,}000$ tokens plus the reports. Estimate the total input tokens, and compare with one agent that does all the reading itself in one context with observation clearing that keeps $800$ tokens of notes per source step.
::: solution
Each worker: $15\cdot3{,}000 + 4{,}000\cdot\frac{14\cdot15}{2} = 45{,}000 + 420{,}000 = 465{,}000$ tokens; five workers $2{,}325{,}000$. Orchestrator: say $3$ invocations of about $8{,}000 + 5{,}000 = 13{,}000$ tokens, $39{,}000$. Total about $2.36$ million. The single agent takes $75$ steps; with clearing its context grows by $800$ per step from $8{,}000$, so it reads $75\cdot8{,}000 + 800\cdot\frac{74\cdot75}{2} = 600{,}000 + 2{,}220{,}000 = 2.82$ million tokens, and its context ends near $67{,}000$ tokens. The totals are similar; the differences are elsewhere. The team finishes in about the time of one worker ($15$ sequential steps instead of $75$) and keeps every context short; the single agent sees all the material at once and can connect findings across sources that no worker saw together.
:::
:::

## When more agents help, and when they hurt {#sec-evidence}

The evidence as of 2026 is uneven: many papers report gains for particular multi-agent designs, fewer compare them with single agents under equal budgets, and the field has not converged. Three regularities are reasonably well supported.

- **Breadth-first, parallelisable tasks benefit.** When a task divides into independent parts that each require a lot of reading — searching many sources, reviewing many files — parallel workers with separate contexts reduce latency and keep each context focused. Reported gains in such settings, including the vendor report above, are large, though often at a much higher token cost.
- **Ensembles help to the extent errors are independent.** Voting and debate among instances of one model behave like self-consistency, whose benefit is limited by correlated errors ([[#prop-correlated]]); diversity — different models, different prompts, different information — is what makes additional agents valuable.
- **Tightly coupled tasks suffer.** When every part depends on decisions made in others — writing one coherent piece of code, carrying out a long sequential procedure — splitting the work across agents with separate contexts multiplies hand-over losses and conflicting decisions. Practitioners building coding agents have argued, for this reason, that a single agent with a well-managed context, perhaps using sub-agents only for isolated, read-only investigations, is more reliable than a team of peers editing the same code.

The practical rule follows: start with one agent; add workers for parallel, separable, read-heavy subtasks; add a critic in a separate context when an independent review is valuable; use voting only with diverse members; and compare every multi-agent design with a single agent given the same total budget.

::: warning Agreement is not evidence
When several agents agree, it is tempting to treat their agreement as confirmation. If they share a model, a prompt and the same sources, their agreement is closer to one opinion stated several times; and if they have read each other's answers, it may be one agent's opinion adopted by the rest. Independence must be designed in — different models or prompts, separate information, answers produced before seeing others — and the final answer should still be checked against the world when that is possible.
:::

::: application Protocols between agents
Agents built by different parties need a common language to delegate to each other, as tools did ([[agents/function-calling#sec-protocols]]). In April 2025 Google announced the **Agent2Agent** (A2A) protocol, later contributed to the Linux Foundation, in which agents publish a description of their capabilities, accept tasks, exchange messages and artefacts, and report status for long-running work. Like tool protocols it standardises the interface, not the behaviour, and it raises the questions of the classical, self-interested multi-agent literature: whom an agent acts for, what it may disclose to another party's agent, and how commitments between agents are verified.
:::

::: quiz
A team builds a system in which five instances of the same model, with the same prompt, answer a medical-coding question and then take a majority vote. Accuracy rises from $81\%$ for one instance to $83\%$. What explains the small gain, and what change would most likely help?
- [ ] Five is too few; with fifty instances accuracy would approach $100\%$.
- [x] The instances' errors are highly correlated; diversify the members (different models or prompts, or retrieval of different evidence) or add an independent check.
- [ ] Majority voting is the wrong rule; the system should use the longest answer.
- [ ] The instances should debate for more rounds until they all agree.
::: solution
With independent members at $p = 0.81$, five voters would reach about $0.95$ ([[#prop-condorcet]]); $0.83$ indicates strong common-mode errors, which more copies cannot fix ([[#prop-correlated]]). Diversity attacks correlation directly. More rounds of debate tend to increase agreement, not independence.
:::
:::

::: history
Multi-agent systems became a field of artificial intelligence in the 1980s with distributed problem solving: Smith's contract net protocol (1980), blackboard systems such as Hearsay-II, and later the belief–desire–intention architectures and agent communication languages (KQML, FIPA-ACL) of the 1990s, collected in Wooldridge's textbook (2002; 2nd ed. 2009). Condorcet's jury theorem dates from 1785. Irving, Christiano and Amodei proposed AI safety via debate in 2018. With language models, Park et al. (2023) simulated a community of generative agents; Li et al. (CAMEL, 2023) studied role-playing pairs of agents; Du et al. (2023) and Liang et al. (2023) proposed multi-agent debate for reasoning and factuality; Qian et al. (ChatDev) and Hong et al. (MetaGPT) organised software development as teams of roles (2023, published 2024); and frameworks for building conversational multi-agent applications, such as AutoGen (Wu et al., 2023), became widely used. Smit et al. (2024) compared debate strategies with ensembling at equal budgets, Anthropic described its orchestrator–worker research system in 2025, Cemri et al. (2025) catalogued multi-agent failure modes, and Google announced the Agent2Agent protocol in April 2025.
:::

::: summary
- A multi-agent system is several agent loops with separate contexts connected by a communication topology and a protocol; every message is a lossy summary of what its sender knew.
- Orchestrator–worker (a star) suits broad, separable tasks: parallel workers with focused contexts return condensed results; the brief is the critical interface.
- Role decomposition specialises behaviour and gives critics fresh contexts; it does not require different models.
- Majority voting among $n$ independent agents with accuracy $p > \frac12$ converges to certainty (Condorcet), with error at most $e^{-2n(p - 1/2)^2}$; a common-mode probability $\rho$ caps accuracy at $1 - \rho(1 - p)$.
- Debate among instances (Du et al., 2023) improved some tasks but does not reliably beat ensembling at equal compute; debate as an alignment proposal (Irving et al., 2018) is an adversarial oversight scheme, a different idea.
- Communication costs $n(n - 1)L$ tokens per round when everyone broadcasts and $2(n - 1)L$ in a star; hand-overs also lose information and create inter-agent failures.
- Use one agent by default; add workers for parallel read-heavy subtasks, critics for independent review, diverse members for voting; compare with a single agent at equal budget.
:::

## Exercises

::: exercise Three voters {level=1 check="0.784"}
Three independent agents are each correct with probability $0.7$. What is the probability that the majority is correct?
::: solution
$0.7^3 + 3\cdot0.7^2\cdot0.3 = 0.343 + 0.441 = 0.784$.
:::
:::

::: exercise Broadcast cost {level=1 check="28000"}
Eight agents each broadcast a $500$-token message to all others in one round. How many tokens are read in total?
::: solution
$8\cdot7\cdot500 = 28{,}000$ tokens ([[#prop-topology]]).
:::
:::

::: exercise The limit with correlation {level=1 check="0.88"}
Agents are each correct with probability $0.8$, and with probability $0.6$ they share a common-mode answer. What accuracy does majority voting approach as the number of agents grows?
::: solution
$1 - \rho(1 - p) = 1 - 0.6\cdot0.2 = 0.88$ ([[#prop-correlated]]).
:::
:::

::: exercise Five voters {level=2 check="0.8369"}
Compute $M_5(0.7)$ exactly, to four decimal places, and compare it with the Hoeffding lower bound.
::: solution
$\binom53 0.7^3 0.3^2 + \binom54 0.7^4 0.3 + 0.7^5 = 10\cdot0.343\cdot0.09 + 5\cdot0.2401\cdot0.3 + 0.16807 = 0.3087 + 0.36015 + 0.16807 = 0.83692$, so $0.8369$. The bound is $1 - e^{-2\cdot5\cdot0.04} = 1 - e^{-0.4} = 0.330$: valid, but far from tight at small $n$.
:::
:::

::: exercise How many voters? {level=2 check="58"}
Using the Hoeffding bound of [[#prop-condorcet]], how many independent agents with $p = 0.7$ guarantee that the majority is wrong with probability at most $0.01$? (Round up to an integer; the exact requirement is much smaller.)
::: solution
We need $e^{-2n\cdot0.04}\le0.01$, so $n\ge\ln100/0.08 = 4.605/0.08 = 57.6$, hence $n = 58$ (an odd $n = 59$ avoids ties). The exact computation needs far fewer: $M_{21}(0.7) = 0.974$ and $M_{31}(0.7) = 0.990$, so about $31$ agents suffice — and only if they are independent.
:::
:::

::: exercise Debate rounds and context {level=2}
In a debate among $n$ agents over $R$ rounds, each agent in round $r\ge2$ reads the other $n - 1$ agents' answers from all previous rounds, $L$ tokens each, plus a fixed prompt of $c$ tokens. Derive the total input tokens, and evaluate it for $n = 3$, $R = 3$, $L = 400$, $c = 1{,}000$.
::: solution
In round $r$, each agent reads $c + (r - 1)(n - 1)L$ tokens (round $1$ reads only $c$). Total $\sum_{r=1}^{R}n\,(c + (r - 1)(n - 1)L) = nRc + n(n - 1)L\frac{R(R - 1)}{2}$. For the numbers: $3\cdot3\cdot1{,}000 + 3\cdot2\cdot400\cdot3 = 9{,}000 + 7{,}200 = 16{,}200$ tokens. If agents also see their own previous answers, add $nL\frac{R(R - 1)}{2} = 3{,}600$. The cost is quadratic in both $n$ and $R$, while nine independent samples for a vote would read $9{,}000$.
:::
:::

::: exercise Condorcet with unequal agents {level=3}
Three agents have accuracies $0.9$, $0.6$ and $0.6$, independently. Compute the accuracy of the majority vote, and compare it with simply following the best agent. Under what condition on the accuracies does a three-member majority beat its best member?
::: solution
The majority is correct if at least two are correct: $P = p_1p_2 + p_1p_3 + p_2p_3 - 2p_1p_2p_3 = 0.54 + 0.54 + 0.36 - 2\cdot0.324 = 1.44 - 0.648 = 0.792$, worse than the best agent's $0.9$. In general, the majority and agent $1$ agree except in two configurations: agent $1$ wrong while both others are right (the majority is right) and agent $1$ right while both others are wrong (the majority is wrong). So the majority beats agent $1$ exactly when $(1 - p_1)\,p_2p_3 > p_1(1 - p_2)(1 - p_3)$. With $0.9, 0.6, 0.6$: $0.9\cdot0.16 = 0.144$ against $0.1\cdot0.36 = 0.036$, so the majority loses. Weighted voting, with weights $\log\frac{p_i}{1 - p_i}$, is optimal for independent agents with known accuracies (a classical result of Nitzan and Paroush, 1982); here the weights are $2.20$, $0.41$, $0.41$, and the best agent's vote always prevails, giving $0.9$.
:::
:::

::: exercise Designing a review team {level=3}
Design a multi-agent system that reviews a pull request of $40$ changed files for bugs, security issues and style. Specify the agents, their contexts and tools, the topology, the briefs, and how results are merged; then explain how you would test whether it beats a single agent.
::: solution
*Orchestrator*: reads the diff summary and the project's conventions, groups files into about five coherent units (by module), and writes a brief per unit: files, the purpose of the change, what to look for, and the output format (a list of findings with file, line, severity, evidence and a suggested fix). *Workers*: one per unit, with read-only tools (view file, search the repository, run tests and linters in a sandbox), each in its own context; they return findings only. *Specialist*: one security reviewer that sees the whole diff but only security-relevant context, since security issues often span modules. *Merger*: the orchestrator de-duplicates findings, resolves conflicts by asking a worker for evidence, and ranks by severity; optionally a separate critic in a fresh context checks each high-severity finding against the code to remove false positives. The topology is a star plus a critic. *Testing*: build a set of past pull requests with known bugs (seeded or historical), run the team and a single agent with the same total token budget, and compare recall and precision of findings, with confidence intervals over the set and repeated runs ([[agents/agent-security#sec-evaluation]]); also measure latency and cost, and read the traces of disagreements between the two to see whether the team's separate contexts missed cross-module bugs.
:::
:::
