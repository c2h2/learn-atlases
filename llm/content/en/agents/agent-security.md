Two questions decide whether an agent can be deployed. *Does it work?* — how often it completes the tasks it will be given, at what cost, and how consistently. And *is it safe to let it act?* — what happens when it makes a mistake, and what happens when someone tries to make it misbehave. The questions are linked. An agent's usefulness comes from its access to tools, data and the world; the same access is what an error or an adversary can exploit. And both questions are answered by measurement under realistic conditions, not by demonstrations.

The first half of this chapter is about evaluating agents. It describes how agent benchmarks are built — environments with initial states, tasks, functional success checks and budgets — and then the statistics that most published agent results lack: confidence intervals for success rates, the extra variance from repeated runs of a stochastic agent, which a naive interval ignores, and reliability metrics such as pass$^k$, the chance that an agent succeeds on *every* one of $k$ attempts. The second half is about security, at the level of threat models and defences. It builds on the conceptual treatment of prompt injection in [[prompting-rag/prompt-design#def-injection]] and does not repeat it: here the focus is on agents, where indirect prompt injection (Greshake et al., 2023) meets tools that act. We describe the threat model, a widely used design heuristic about the combination of private data, untrusted content and external communication, the defences that bound damage by construction — least privilege, sandboxing, human confirmation, separation of privileges, monitoring and audit — and evaluation suites such as AgentDojo (Debenedetti et al., 2024) that measure attacks and defences together. The chapter contains no attack payloads; none are needed to understand the defences.

## Evaluating agents {#sec-evaluation}

Evaluating a model's answer to a question needs a question and a grader. Evaluating an agent needs a world for it to act in.

::: definition Agent benchmark {#def-benchmark}
An **agent benchmark** is a set of tasks $\{\tau_1, \dots, \tau_T\}$, each consisting of an **environment** with a specified initial state (websites, a repository, a virtual machine, simulated users and services), an **instruction**, a **success check** — a function of the final environment state and the agent's output, ideally **functional** (did the right thing happen?) rather than a comparison with a reference sequence of actions — and a **budget** (steps, tokens, time). A **run** executes the agent once on a task from the initial state and records success, cost and the full trace. Because agents and environments are stochastic, each task may be run $R$ times.
:::

Every benchmark in this course fits the definition: SWE-bench ([[agents/code-agents#def-swebench]]) checks the final repository with tests; WebArena and OSWorld ([[agents/computer-use#def-webarena]]) check the final state of websites and virtual machines with scripts. τ-bench (Yao et al., 2024) added a simulated *user*, played by a language model, with whom the agent must converse while using tools under a domain's policy rules (for example an airline's rules on changing bookings), and checked the final database state. The general principles of benchmark design ([[evaluation/evaluation-principles]], [[evaluation/benchmarks]]) apply, with emphases peculiar to agents:

- **Functional checks** credit any route to success and catch "successes" that only look right, but they must be written carefully: a check that inspects only the final answer can be satisfied by guessing, one that inspects only the database can miss side effects elsewhere.
- **State reset.** Every run must start from the same initial state; a run that leaves the environment changed contaminates the next. Live websites are not resettable, which is why WebArena hosts its own.
- **Flakiness.** Environments fail — a service times out, a page loads slowly — and these failures are not the agent's. They must be measured and reported, not silently folded into success rates.
- **Cost and latency** are part of the result. Kapoor et al. (2024) showed that some sophisticated agent designs did not beat simple baselines once cost was controlled, and argued for reporting accuracy and cost together, as a Pareto frontier, rather than accuracy alone.
- **Contamination and shortcuts.** Public tasks may be in training data ([[evaluation/contamination]]); environments may contain unintended shortcuts (an answer visible in a page's source, a test that can be edited). Agents find them.

### How precise is a success rate?

Agent benchmarks are small — a few hundred tasks is typical, because each task needs a built environment — and agents are stochastic. Both facts make reported success rates far less precise than they look.

::: proposition Variance of a success rate with repeated runs {#prop-variance}
Let task $i$ have success probability $q_i$ for the agent, where the tasks are a random sample from a population with mean $\mu = \E[q]$ and variance $\tau^2 = \Var(q)$. Run each of $T$ tasks $R$ times independently and let $\bar{x}$ be the overall fraction of successful runs. Then $\E\bar{x} = \mu$ and
$$
\Var(\bar{x}) = \frac{1}{T}\left(\tau^2 + \frac{\E[q(1 - q)]}{R}\right),\qquad \mu(1 - \mu) = \tau^2 + \E[q(1 - q)].
$$ {#eq-var}
The naive variance $\mu(1 - \mu)/(TR)$, which treats all $TR$ runs as independent, is too small by the factor $1 + (R - 1)\rho$, where $\rho = \tau^2/(\mu(1 - \mu))$ is the intra-task correlation. Repeating runs reduces only the second term; only more tasks reduce the first.
:::

::: proof
Let $\bar{x}_i$ be task $i$'s fraction of successes. Given $q_i$, $\bar{x}_i$ has mean $q_i$ and variance $q_i(1 - q_i)/R$. By the law of total variance, $\Var(\bar{x}_i) = \Var(q_i) + \E[q_i(1 - q_i)]/R = \tau^2 + \E[q(1 - q)]/R$. The tasks are independent, so $\Var(\bar{x}) = \Var(\bar{x}_i)/T$, which is [[#eq-var]]. Next, $\E[q(1 - q)] = \mu - \E[q^2] = \mu - (\tau^2 + \mu^2) = \mu(1 - \mu) - \tau^2$, the identity. Dividing [[#eq-var]] by $\mu(1 - \mu)/(TR)$ gives $R\rho + (1 - \rho) = 1 + (R - 1)\rho$.
:::

The practical consequence: estimate the standard error from the per-task success fractions $\bar{x}_i$ (a **clustered** standard error, $s/\sqrt{T}$ with $s$ the standard deviation of the $\bar{x}_i$), not from the pooled runs. When comparing two agents on the same tasks, use the paired differences per task, which removes the variance of task difficulty from the comparison ([[evaluation/evaluation-statistics]]).

::: example A confidence interval for SWE-bench Verified {#ex-ci}
An agent resolves $310$ of the $500$ instances of SWE-bench Verified in a single run. Give a $95\%$ confidence interval for its resolution rate. A second agent resolves $325$. Is the second agent better?
::: solution
$\hat{p} = 0.62$, standard error $\sqrt{0.62\cdot0.38/500} = 0.0217$, so the interval is $0.62\pm1.96\cdot0.0217 = 0.62\pm0.043$, from $57.7\%$ to $66.3\%$. The second agent's $65\%$ lies inside it, and the two intervals overlap heavily. Whether the difference is significant depends on the *paired* outcomes: if the agents disagree on, say, $70$ instances — the second solving $42$ that the first fails and the first $27$ that the second fails — a McNemar test gives $z = (42 - 27)/\sqrt{69} = 1.81$, not significant at the $5\%$ level. And this is one run of each: with run-to-run variation ([[#prop-variance]]), a three-point gap between two systems on $500$ tasks is within the noise unless confirmed by repeated runs.
:::
:::

::: widget confidence
dist: bernoulli
n: 100
level: 0.95
intervals: 50
caption: Fifty simulated benchmarks of $n$ tasks each, for an agent with a fixed true success rate, with a $95\%$ confidence interval from each. About $95\%$ of the intervals cover the true value; with $100$ tasks each interval is roughly $\pm10$ percentage points wide. Increase $n$ to see the width shrink like $1/\sqrt{n}$. Real agent results add run-to-run variance on top of this task-sampling variance ([[#prop-variance]]).
:::

::: widget plot
f: 1.96*sqrt(p*(1 - p)/x); 1.96*sqrt(p*(1 - p)*(1 + (r - 1)*c)/(x*r))
x: 50, 2000
y: 0, 0.15
sliders: p=0.6:0.05:0.95:0.01; r=5:1:10:1; c=0.4:0:1:0.05
labels: one run per task; $r$ runs per task, intra-task correlation $\rho$
points: 500,0.0425
caption: Half-width of a $95\%$ confidence interval for a success rate $p$ against the number of tasks $T$. The upper curve uses one run per task; the lower uses $r$ runs per task with intra-task correlation $\rho$ ([[#prop-variance]]). With $\rho = 1$ (each task always succeeds or always fails) repeated runs do not help at all; with $\rho = 0$ they are as good as more tasks. The marked point is [[#ex-ci]]: $\pm4.3$ points at $500$ tasks.
:::

### Reliability: pass$^k$

For code generation, pass@$k$ ([[agents/code-agents#def-passk]]) rewards an agent for succeeding at least once in $k$ tries, which is right when a verifier can pick the success. A deployed agent usually gets one try, and a user who runs it daily cares whether it succeeds *every time*. τ-bench introduced the complementary metric.

::: definition pass$^k$ {#def-passhatk}
For a task with per-run success probability $q$, **pass$^k$** is the probability that $k$ independent runs all succeed, $q^k$; a benchmark's pass$^k$ is the average over tasks. From $n\ge k$ runs with $c$ successes it is estimated without bias by $\binom{c}{k}/\binom{n}{k}$.
:::

The estimator is unbiased by the argument of [[agents/code-agents#prop-passk]] with successes and failures exchanged: $\binom{c}{k}/\binom{n}{k}$ is the probability that a random $k$-subset of the runs contains only successes. pass@$k$ rises with $k$ and pass$^k$ falls; their gap measures *inconsistency*. Two agents with the same pass@$1$ can differ greatly in pass$^k$: one that solves $60\%$ of tasks always and the rest never has pass$^k = 0.6$ for every $k$, while one that solves every task $60\%$ of the time has pass$^8 = 0.6^8 = 0.017$.

::: example pass$^k$ for a customer-service agent {#ex-passhatk}
A customer-service agent is run $8$ times on each of $3$ tasks and succeeds $8$, $6$ and $4$ times. Estimate pass$^1$, pass$^2$ and pass$^4$ for the benchmark.
::: solution
Per task, $\binom{c}{k}/\binom{8}{k}$. For $k = 1$: $1$, $0.75$, $0.5$, mean $0.75$. For $k = 2$: $1$, $\binom62/\binom82 = 15/28 = 0.536$, $\binom42/\binom82 = 6/28 = 0.214$, mean $0.583$. For $k = 4$: $1$, $\binom64/\binom84 = 15/70 = 0.214$, $\binom44/\binom84 = 1/70 = 0.014$, mean $0.410$. The average success rate of $75\%$ hides that only one task is handled reliably; a user who brings the third task four times will be satisfied every time with probability about $1.4\%$.
:::
:::

### A benchmark simulation

The listing simulates a benchmark of $T = 200$ tasks with difficulties drawn from a fixed, seeded distribution, runs a simulated agent $R = 5$ times on each, and compares the naive and clustered confidence intervals and the two metrics. Its second half is the policy gate discussed in [[#sec-defences]].

```python
import random, math
from math import comb

# --- 1. An agent benchmark: T tasks, R independent runs per task -----------
rng = random.Random(7)
T, R = 200, 5
difficulty = [rng.betavariate(1.2, 0.8) for _ in range(T)]       # per-task success prob
runs = [[rng.random() < q for _ in range(R)] for q in difficulty]

per_task = [sum(r) / R for r in runs]
mean = sum(per_task) / T
naive_se = math.sqrt(mean * (1 - mean) / (T * R))                 # treats T*R runs as independent
task_se = math.sqrt(sum((x - mean) ** 2 for x in per_task) / (T - 1) / T)   # clustered by task
print(f"success {mean:.3f}  naive 95% CI ±{1.96 * naive_se:.3f}  clustered ±{1.96 * task_se:.3f}")

def pass_hat_k(n, c, k):
    """Unbiased estimate of pass^k: all k of k runs succeed (from n runs, c successes)."""
    return comb(c, k) / comb(n, k)
def pass_at_k(n, c, k):
    return 1 - comb(n - c, k) / comb(n, k)
for k in (1, 2, 5):
    ph = sum(pass_hat_k(R, sum(r), k) for r in runs) / T
    pa = sum(pass_at_k(R, sum(r), k) for r in runs) / T
    print(f"k={k}: pass@k {pa:.3f}   pass^k {ph:.3f}")

# --- 2. A policy gate on tool calls (defensive design, no attack content) --
TOOLS = {   # name: (reads_private, reads_untrusted, external_effect, irreversible)
    "read_inbox":   (True,  True,  False, False),   # emails are private AND untrusted
    "fetch_url":    (False, True,  False, False),
    "read_file":    (True,  False, False, False),
    "send_email":   (False, False, True,  True),
    "create_draft": (False, False, False, False),
}

class Session:
    def __init__(self, allowed):
        self.allowed, self.private, self.untrusted, self.log = set(allowed), False, False, []
    def request(self, tool, confirmed=False):
        priv, untr, ext, irrev = TOOLS[tool]
        if tool not in self.allowed:
            verdict = "DENY (not granted for this task)"
        elif ext and self.private and self.untrusted and not confirmed:
            verdict = "HOLD (private data + untrusted content + external channel: ask the user)"
        elif irrev and not confirmed:
            verdict = "HOLD (irreversible: ask the user)"
        else:
            verdict = "ALLOW"
            self.private |= priv; self.untrusted |= untr
        self.log.append((tool, verdict, self.private, self.untrusted))
        return verdict

s = Session(allowed={"read_inbox", "fetch_url", "create_draft", "send_email"})
for tool in ["read_inbox", "fetch_url", "read_file", "create_draft", "send_email"]:
    print(f"{tool:12s} -> {s.request(tool)}")
print("audit log entries:", len(s.log), "| last:", s.log[-1])
```

```text
success 0.589  naive 95% CI ±0.030  clustered ±0.045
k=1: pass@k 0.589   pass^k 0.589
k=2: pass@k 0.760   pass^k 0.418
k=5: pass@k 0.925   pass^k 0.235
read_inbox   -> ALLOW
fetch_url    -> ALLOW
read_file    -> DENY (not granted for this task)
create_draft -> ALLOW
send_email   -> HOLD (private data + untrusted content + external channel: ask the user)
audit log entries: 5 | last: ('send_email', 'HOLD (private data + untrusted content + external channel: ask the user)', True, True)
```

The naive interval, which pretends that $1{,}000$ runs are $1{,}000$ independent observations, is a third narrower than the clustered one; [[#prop-variance]] explains the gap, since task difficulty varies a great deal in this simulation. A $59\%$ agent has a $92\%$ chance of solving a task in at least one of five tries and a $24\%$ chance of solving it in all five: the same agent looks excellent or poor depending on which question is asked.

## The threat model {#sec-threats}

Security analysis starts by saying what is being protected, from whom, and through which entry points.

::: definition Agent threat model {#def-threat}
- **Assets**: the user's private data (messages, files, records), credentials and sessions, money and other resources the agent can spend, the integrity of the systems it can change, and the integrity of the agent's own outputs and memory.
- **Adversaries**: anyone who can place text, images or other content where the agent will read it — the author of a web page, the sender of an email, a contributor to a repository, the publisher of a tool or a tool description, another agent — as well as, for misuse, the user themself.
- **Entry points**: every input the model reads that is not authored by the system's developer or the user: retrieved documents, tool results, web pages and screenshots, email and messages, file contents, tool descriptions from third-party servers ([[agents/function-calling#sec-protocols]]), persistent memories ([[agents/memory-context#sec-retrieval]]) and messages from other agents.
- **Impacts**: **exfiltration** (private data sent to the adversary), **unauthorised actions** (purchases, messages, deletions, configuration changes), **integrity attacks** (subtly wrong outputs, poisoned code), **persistence** (instructions stored in memory or files that affect later sessions) and **denial of service** (loops that burn budget).
:::

The mechanism that connects adversaries to impacts is **indirect prompt injection**: content at an entry point that the model treats as instructions ([[prompting-rag/prompt-design#def-injection]]). Greshake et al. (2023) demonstrated it against applications that combined language models with retrieval and tools, and showed that the impacts above were achievable in principle by anyone who could get content in front of the model. For agents the stakes are higher than for chat, because the model's outputs are actions. The essential difficulty is unchanged: a language model receives instructions and data through the same channel, and following instructions found in text is precisely what it was trained to do. As of 2026, model-level defences have reduced the success rate of known injection techniques substantially but not to zero, and adaptive attackers, who adjust their content to the defence, continue to find ways through. The rest of the chapter therefore assumes that **an agent that reads untrusted content can sometimes be steered by it**, and asks how to design systems in which that does limited harm.

::: definition The lethal trifecta (design heuristic) {#def-trifecta}
Willison (2025) named the **lethal trifecta**: an agent that combines (1) **access to private data**, (2) **exposure to untrusted content**, and (3) **the ability to communicate externally** — any channel by which data can leave, including sending messages, making web requests, or even rendering a link or image whose address encodes data — can be induced by injected instructions in (2) to send data from (1) out through (3). The heuristic is to never give one agent context all three at once: remove at least one leg, or put a person's confirmation between the legs. A similar rule published by Meta researchers in 2025 asks that an agent session satisfy at most two of: processing untrustworthy inputs, accessing sensitive systems or private data, and changing state or communicating externally.
:::

The heuristic is useful because it is checkable at design time, from the tool list alone, without predicting what any attack will look like. Its logic can be stated as an information-flow property.

::: proposition Breaking the trifecta prevents exfiltration through the agent {#prop-trifecta}
Model an agent session as a context that accumulates **labels**: *private* once private data has entered it, *untrusted* once untrusted content has entered it. Suppose every action with an external effect is executed only if the context does not carry both labels, unless a person confirms the specific action. Then no action executed by that session without confirmation can be both influenced by untrusted content and carry private data out — the agent's own actions cannot complete an exfiltration on an adversary's behalf.
:::

::: proof
Labels are only ever added, so at the moment of an external action the context's labels include everything that has entered it. If the action executes without confirmation, the context lacks at least one label. If it lacks *private*, no private data has entered it, so none can be in the action's arguments. If it lacks *untrusted*, no untrusted content has entered it, so the action was not influenced by adversarial content (only by the user, the developer and trusted sources). In either case the action is not an exfiltration steered by an adversary.
:::

The proposition is only as strong as its labels. It fails if untrusted content is mislabelled as trusted (a document the user uploaded may contain text written by someone else), if a channel with external effect is not recognised as one (an image URL that the user's interface fetches, a link preview, a file written to a shared folder), or if the person confirming the action cannot see what it carries. It also does not address integrity attacks — an injected instruction to write subtly wrong code needs no exfiltration channel — nor misuse by the user. That is why the trifecta is a design heuristic and not a proof of security. But it turns an unbounded question ("can any text make the agent do something bad?") into a bounded one ("which sessions have all three capabilities, and what stands between them?"), and the listing's `Session` gate is a direct implementation: once the session has read the inbox (private and untrusted), sending email is held for the user.

::: example Classifying agent configurations {#ex-trifecta}
For each configuration, say which legs of the trifecta are present and propose the cheapest change that removes the risk: (a) an email assistant that reads the inbox and can send email; (b) a coding agent with network access working on a public repository that contains no secrets; (c) a research agent that browses the web and writes a report to the user's private notes, with no other tools; (d) a support bot that reads customer records and answers questions in a public chat.
::: solution
(a) All three: inbox content is private *and* untrusted (anyone can send email), and sending is external. Cheapest fix: replace "send" with "create draft", so the person sends; or require confirmation showing recipient and content. (b) Untrusted content (issues, dependencies) and external communication, but no private data — unless credentials are present in the environment, which would supply the missing leg; keep secrets out ([[agents/code-agents#def-sandbox]]). The integrity risk (injected bad code) remains and needs review. (c) Untrusted content and private data (if it can *read* the notes; if it can only append, less so); no external channel, provided the notes are not shared and the report's rendering does not fetch remote resources. (d) Private data and an external channel; the untrusted leg is the customer's message itself, which is untrusted input. Restrict the bot's data access to the authenticated customer's own records, so that private data of others never enters the context.
:::
:::

## Defences {#sec-defences}

No single defence is complete; the practical approach is **defence in depth**, layers whose failures are as independent as possible.

::: proposition Defence in depth {#prop-depth}
If an attack must defeat $m$ layers, which it does independently with probabilities $f_1, \dots, f_m$, it succeeds with probability $\prod_i f_i$. If with probability $\gamma$ a single common cause defeats all layers at once, the success probability is $\gamma + (1 - \gamma)\prod_i f_i\ge\gamma$.
:::

::: proof
Independence gives the product. With a common cause, condition on whether it occurs: probability $\gamma$ of success through it, and otherwise success requires defeating every layer independently.
:::

The proposition says what kinds of layers to choose: ones that fail for *different* reasons. Three layers that each rely on the model recognising an injection share a common cause — a persuasive injection defeats them together. A model-based detector, a permission system enforced in code and a person's confirmation fail for different reasons.

::: example Layers that share a failure {#ex-depth}
An injection must get past a detection classifier ($f_1 = 0.2$), the model's own trained resistance ($f_2 = 0.3$) and a confirmation step for sending messages ($f_3 = 0.1$, the chance a person approves a malicious message without noticing). What is the success probability if the layers are independent? If, with probability $0.05$, an attack is crafted so that the classifier and the model are both fooled together, and the confirmation screen does not show the message's full content so that approval is automatic in that case?
::: solution
Independent: $0.2\cdot0.3\cdot0.1 = 0.006$. With the common cause: $0.05 + 0.95\cdot0.006 = 0.0557$, nearly ten times higher, dominated by the case in which all layers fail together. The fix is to remove the common cause — show the person exactly what will be sent — not to add another model-based layer.
:::
:::

The main defences, roughly from strongest to weakest guarantee:

- **Least privilege.** Grant each agent and each session only the tools, data and permissions the task needs: read-only where reading suffices, scoped tokens that expire, allow-lists of recipients and destinations. A permission not granted cannot be abused, whatever the model is persuaded to want. The listing's `DENY` is this layer.
- **Sandboxing.** Run actions with effects in isolated environments with default-deny network access and no ambient credentials ([[agents/code-agents#sec-sandbox]]).
- **Human confirmation for irreversible and external actions.** Payments, messages, deletions, publication and permission changes pause for explicit approval, with the confirmation showing exactly what will happen — the full recipient and content, not a summary written by the possibly compromised model. Confirmation fatigue is real: if people are asked to approve everything they approve everything, so confirm only what matters.
- **Separation of privileges.** Keep untrusted content away from the context that decides actions. In Willison's *dual-LLM pattern* (2023), a privileged model plans and calls tools but never sees untrusted text; a quarantined model processes untrusted text and returns results that the privileged side handles only as opaque variables. CaMeL (Debenedetti et al., 2025) developed the idea into a system that extracts the control flow of a task from the trusted user request, runs it as a program, and tracks the provenance of every value with capabilities, so that policies can forbid, for instance, sending data derived from an untrusted email to an address that also came from it. Such designs trade some utility for guarantees that do not depend on the model resisting injection.
- **Model-level robustness.** Training models to give instructions from the system and user priority over text in tool results — an *instruction hierarchy* (Wallace et al., 2024) — and marking untrusted text clearly in the context (delimiting or encoding it, sometimes called spotlighting; Hines et al., 2024) reduce injection success rates. They are probabilistic defences: valuable layers, not boundaries.
- **Detection.** Classifiers that flag likely injections in inputs, or anomalous actions in outputs, catch many unsophisticated attacks, and are themselves models that can be evaded.
- **Monitoring and audit.** Log every input source, tool call, argument, permission decision and confirmation, with provenance, in a record the agent cannot modify. Logs enable detection of anomalies (an unusual recipient, a burst of reads), investigation after an incident, and evaluation ([[safety-alignment/monitoring-control]]). Rate limits and a reliable way to stop a running agent belong to the same layer.

::: warning "Ignore instructions in the content" is not a security boundary
Telling the model in its system prompt to ignore instructions that appear in documents, and wrapping untrusted text in tags, are good practice and measurably reduce injection success. They remain requests to a model, evaluated by the same mechanism the attacker targets, and an attacker can iterate until the request loses. Treat prompt-level defences as one layer whose failure must be survivable: the permission system, the sandbox and the confirmation step are what bound the damage when they fail.
:::

## Evaluating security {#sec-security-eval}

Defences must be measured, and measuring them requires benchmarks that include both the tasks an agent should complete and the attacks it should resist — because a defence that blocks every attack by refusing to do anything is useless.

::: definition Security evaluation of agents {#def-security-eval}
A **security evaluation** pairs user tasks with **injection test cases**: adversarial content planted at an entry point of the environment (an email, a web page, a file, a tool output) together with an attacker goal whose completion can be checked functionally (an action taken, data sent). It reports at least **utility** (task success without attacks), **utility under attack** (task success when injections are present) and the **attack success rate** (the fraction of test cases in which the attacker's goal is achieved), each with confidence intervals, for each defence configuration.
:::

**AgentDojo** (Debenedetti et al., 2024) is a widely used example. It provides environments modelled on common agent deployments — a workspace with email, calendar and cloud files, a messaging workspace, travel booking and online banking — with $97$ user tasks and $629$ security test cases, and is designed as an extensible framework: new attacks and new defences can be plugged in and evaluated on the same tasks. Its authors reported that agents at the time completed well under all of the benign tasks, that attacks succeeded in a substantial minority of cases against the best agents, and that defences such as tool filtering and injection detectors reduced attack success at some cost in utility — the trade-off that the definition's three metrics are designed to expose. **InjecAgent** (Zhan et al., 2024) measured injection vulnerability across $1{,}054$ test cases involving many user and attacker tools. Misuse — a user directly asking an agent to carry out harmful multi-step tasks — is measured by different suites, such as AgentHarm (Andriushchenko et al., 2024), and belongs with jailbreak robustness ([[safety-alignment/robustness-jailbreaks]]).

Static suites have a known limitation: they contain fixed attacks, and defences can be tuned to them. Evaluations against **adaptive** attackers, who adjust their content to the specific defence, typically find higher attack success rates, and are the more honest measure of a model-level defence. Design-level defences such as least privilege and separation of privileges are, by contrast, evaluated by checking what the system *can* do under any input, which no amount of attacker adaptation changes.

::: quiz
A team reports that its new injection detector reduces attack success on a public benchmark from $30\%$ to $2\%$. Which further result would you most want before relying on it?
- [ ] The detector's accuracy on the benchmark's training split.
- [ ] A demonstration on three hand-picked examples.
- [x] Utility on benign tasks with the detector enabled, and attack success against attacks adapted to the detector, with confidence intervals.
- [ ] The number of parameters of the detector.
::: solution
A detector can reach a low attack success rate by blocking too much, which only the utility measurement reveals, and by fitting the benchmark's fixed attacks, which only adaptive attacks reveal. Confidence intervals say whether $2\%$ is distinguishable from, say, $6\%$ on the number of test cases used ([[#sec-evaluation]]).
:::
:::

::: history
The evaluation of interactive agents in simulated environments goes back to reinforcement-learning benchmarks such as the Arcade Learning Environment (Bellemare et al., 2013); for language agents, ALFWorld and WebShop (2020–2022), WebArena (2023), SWE-bench (2023), OSWorld (2024) and τ-bench (Yao et al., 2024) established functional evaluation, and Kapoor et al. (2024) argued for cost-controlled comparisons. On security, Perez and Ribeiro (2022) studied prompt attacks, Willison named prompt injection in September 2022 and proposed the dual-LLM pattern in 2023, and Greshake et al. (2023) described indirect prompt injection against tool-using applications. Wallace et al. (2024) trained an instruction hierarchy; Hines et al. (2024) proposed spotlighting; Zhan et al. (InjecAgent, 2024) and Debenedetti et al. (AgentDojo, 2024) built injection benchmarks for agents; Andriushchenko et al. (2024) measured misuse with AgentHarm; Debenedetti et al. (2025) proposed CaMeL; Willison named the lethal trifecta in June 2025, and a related "rule of two" followed later that year. Through 2025 model providers added injection classifiers, confirmation prompts and restricted tool modes to agent products, and as of 2026 prompt injection remains an open problem defended against by system design.
:::

::: summary
- An agent benchmark gives environments with fixed initial states, instructions, functional success checks and budgets; report success, cost, latency and flakiness together.
- Success rates on a few hundred tasks have wide confidence intervals ($\pm4$ points at $500$ tasks and $60\%$); repeated runs add correlated variance, so use standard errors clustered by task and paired comparisons.
- pass@$k$ (at least one of $k$ runs succeeds) and pass$^k$ (all $k$ succeed) answer different questions; their gap measures inconsistency.
- The threat model: assets, adversaries who can place content where the agent reads it, entry points (every untrusted input, including tool descriptions, memories and other agents), and impacts (exfiltration, unauthorised actions, integrity, persistence).
- Assume an agent that reads untrusted content can sometimes be steered by it. The lethal trifecta heuristic (private data, untrusted content, external communication) identifies sessions where that leads to exfiltration; remove a leg or interpose a confirmation.
- Defence in depth works when layers fail for different reasons: least privilege, sandboxing, confirmation that shows exactly what will happen, separation of privileges (dual-LLM, CaMeL), model robustness, detection, monitoring and audit logs.
- Evaluate security by utility, utility under attack and attack success rate, as in AgentDojo, and against adaptive attackers; design-level guarantees do not depend on the attack.
:::

## Exercises

::: exercise A confidence interval {level=1 check="0.043"}
An agent succeeds on $310$ of $500$ tasks. What is the half-width of the normal-approximation $95\%$ confidence interval? Give three decimal places.
::: solution
$1.96\sqrt{0.62\cdot0.38/500} = 1.96\cdot0.021707 = 0.0425$, so $0.043$ to three decimal places.
:::
:::

::: exercise pass$^k$ from runs {level=1 check="0.4"}
An agent succeeds in $4$ of $5$ runs on a task. Estimate pass$^3$ for that task without bias.
::: solution
$\binom43/\binom53 = 4/10 = 0.4$ ([[#def-passhatk]]). The plug-in $(4/5)^3 = 0.512$ is biased upwards, by the convexity argument of [[agents/code-agents#prop-passk]].
:::
:::

::: exercise Defence in depth {level=1 check="0.006"}
Three independent layers are each defeated with probabilities $0.2$, $0.3$ and $0.1$. What is the probability that an attack defeats all three?
::: solution
$0.2\cdot0.3\cdot0.1 = 0.006$ ([[#prop-depth]]).
:::
:::

::: exercise Tasks needed for a precise estimate {level=2 check="2401"}
How many tasks are needed for the $95\%$ confidence interval of a success rate near $0.5$ to have half-width at most $0.02$, with one run per task? Round up.
::: solution
$1.96\sqrt{0.25/n}\le0.02$ gives $n\ge(1.96/0.02)^2\cdot0.25 = 98^2\cdot0.25 = 9{,}604\cdot0.25 = 2{,}401$ tasks — several times more than most agent benchmarks contain. A half-width of $0.04$ needs a quarter as many, about $600$.
:::
:::

::: exercise The design effect {level=2 check="2.6"}
Tasks have success probabilities with mean $\mu = 0.6$ and variance $\tau^2 = 0.096$. Each task is run $R = 5$ times. By what factor does the naive variance underestimate the true variance of the success rate?
::: solution
$\rho = \tau^2/(\mu(1 - \mu)) = 0.096/0.24 = 0.4$, and the factor is $1 + (R - 1)\rho = 1 + 4\cdot0.4 = 2.6$ ([[#prop-variance]]). The naive standard error is too small by $\sqrt{2.6} = 1.61$.
:::
:::

::: exercise Consistency {level=2}
Agent A solves $60\%$ of tasks in every run and the remaining $40\%$ in none. Agent B solves every task independently with probability $0.6$. Compute pass@$1$, pass@$4$ and pass$^4$ for each, and say which you would deploy as a nightly unattended job, and which as a tool whose outputs a person checks.
::: solution
A: pass@$1 = 0.6$, pass@$4 = 0.6$, pass$^4 = 0.6$. B: pass@$1 = 0.6$, pass@$4 = 1 - 0.4^4 = 0.974$, pass$^4 = 0.6^4 = 0.130$. For an unattended job that must work every night, A is far better: on the tasks it handles it is reliable, and the others can be routed elsewhere once identified. For a checked tool with retries, B is better: four attempts succeed $97\%$ of the time, and a person or a verifier picks the success. The same average success rate can mean very different products.
:::
:::

::: exercise Auditing a tool list {level=2}
An assistant has these tools: `search_web`, `read_calendar`, `read_email`, `send_email`, `create_calendar_event`, `upload_file_to_share_link`. Identify all trifecta risks, and redesign the tool set and confirmations so that the assistant can still (a) summarise today's email, (b) schedule meetings requested by email, and (c) research topics on the web.
::: solution
Private data: `read_calendar`, `read_email`. Untrusted content: `search_web`, `read_email`. External channels: `send_email`, `upload_file_to_share_link` (creates a link anyone can fetch), and `create_calendar_event` if it sends invitations to external attendees; `search_web` itself is a channel if queries can encode data. Every combination with email reading and any channel completes the trifecta. Redesign: (a) summarising needs only `read_email`, with no external tools in that session. (b) Scheduling: `create_calendar_event` without invitations by default; inviting external attendees requires confirmation showing attendees and text. (c) Research runs in a separate session with `search_web` only and no access to email or calendar; its report is passed to the user, not to the email session. Remove `upload_file_to_share_link` unless a task needs it, and then require confirmation. `send_email` is replaced by `create_draft`, with the person sending.
:::
:::

::: exercise What the log must contain {level=3}
Design the audit log record for a tool-using agent so that, after an incident in which data appears to have been sent to an unknown address, an investigator can determine (i) which input introduced the instruction, (ii) which data was sent, (iii) whether a person approved it, and (iv) whether the policy gate behaved as specified. Explain why the agent itself must not be able to write to or delete from the log.
::: solution
Per event: a monotonic sequence number and timestamp; session and task identifiers; the event type (input received, model invocation, tool call requested, policy decision, confirmation requested and answered, tool result); for inputs, the source (user, system, tool name and the URL, message or file identifier) and a content hash with a pointer to the stored content; for model invocations, the hashes of the context segments included, so that the investigator can see which inputs the model had seen at each step; for tool calls, the full arguments, the session's labels at that moment (as in the listing) and the policy rule that allowed, held or denied it; for confirmations, exactly what was displayed to the person, who answered and when; for results, size and hash. (i) follows by finding the first model invocation whose context contained the suspicious input and after which the agent's actions changed; (ii) from the arguments of the external call; (iii) from the confirmation records; (iv) by replaying the gate's rules on the logged labels. The log must be append-only and outside the agent's permissions, because an agent that can be steered by injected content could be steered to erase or falsify the record of that steering; it should be written by the runtime, not by the model, and stored where the sandbox cannot reach.
:::
:::

::: exercise Choosing between two agents {level=3}
Agent A has utility $0.71$ and attack success rate $0.18$ on AgentDojo-style tests; agent B, with a defence added, has utility $0.64$ and attack success rate $0.04$. Each figure comes from about $600$ test cases. Are the differences statistically meaningful? Describe what additional evidence you would collect and how you would decide which to deploy for an email assistant.
::: solution
Standard errors: utility $\sqrt{0.71\cdot0.29/600} = 0.0185$ and $\sqrt{0.64\cdot0.36/600} = 0.0196$, so the difference of $0.07$ has a standard error of about $0.027$ if independent, $z\approx2.6$; paired analysis on the same tasks would sharpen this. Attack success: $\sqrt{0.18\cdot0.82/600} = 0.0157$ and $\sqrt{0.04\cdot0.96/600} = 0.0080$, difference $0.14$ with standard error $0.0176$, $z\approx8$: clearly meaningful. Additional evidence: repeated runs to estimate run-to-run variance ([[#prop-variance]]); attacks adapted to B's defence, since the $4\%$ may reflect fixed attacks; which tasks B loses (if they are the important ones, the utility cost is larger than it looks); and the *severity* of successful attacks, not only their rate. For an email assistant, which completes the trifecta by nature, the deciding factor should be the design: with sending replaced by drafting and confirmation for external actions, the residual impact of a successful injection is small for either agent, and the choice can then favour utility; without those measures, neither attack rate is acceptable.
:::
:::
