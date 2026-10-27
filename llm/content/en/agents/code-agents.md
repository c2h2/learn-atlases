Code is the domain in which language-model agents have advanced furthest, and the reasons are structural rather than accidental. Code is text, so models trained on text can write it. Code is executable, so an agent can find out whether what it wrote works, without asking anyone. And code is checkable: a test suite is an automatic, repeatable, mostly truthful verifier — exactly the detection signal that [[agents/agent-loops#prop-retry]] identified as the scarce resource of reliable agents. A model that writes a function, runs the tests, reads the failure and fixes the function is an agent loop in its most favourable setting.

This chapter follows code models from single functions to whole repositories. It begins with code generation and its measurement: the HumanEval benchmark and the pass@$k$ metric of Chen et al. (2021), whose unbiased estimator we derive. It then turns code into an action — programs the agent runs to compute, explore and check — and analyses **execution feedback**: when a passing test means a correct program, and what sampling and filtering can achieve (AlphaCode; Li et al., 2022). The second half is about software-engineering agents that navigate, edit and test real code bases, measured by SWE-bench (Jimenez et al., 2024) and its human-validated subset, and about the design principle that makes executing model-written code acceptable at all: **sandboxing**. A plain-Python listing runs a generate–test–repair loop in an isolated interpreter and computes pass@$k$.

## Generating code and measuring it {#sec-generation}

Language models trained on web text could already write short programs, because the web contains a great deal of code. Chen et al. (2021) fine-tuned GPT-3 models on $159$ GB of Python from public GitHub repositories, calling the result **Codex**, and built a benchmark to measure functional correctness rather than textual similarity to a reference.

::: definition HumanEval and functional correctness {#def-humaneval}
**HumanEval** consists of $164$ hand-written Python programming problems. Each gives a function signature and a docstring describing the desired behaviour, sometimes with examples; the model must complete the body. A completion is **functionally correct** if it passes the problem's hidden unit tests (on average $7.7$ per problem), run in an isolated environment with a time limit.
:::

Textual metrics such as BLEU, inherited from machine translation, are poor guides to code: two programs can share most tokens and differ in behaviour, or share almost none and be equivalent. Running tests measures what matters. But a model can be asked for several samples, and if any one passing sample is useful — because the tests can tell which — the natural metric is the chance that at least one of $k$ samples passes.

::: definition pass@$k$ {#def-passk}
For a problem on which a model's samples are correct with probability $p$, **pass@$k$** is the probability that at least one of $k$ independent samples is correct, $1 - (1 - p)^k$; a benchmark's pass@$k$ is the average over problems. To estimate it, draw $n\ge k$ samples per problem, count the $c$ correct ones, and use
$$
\widehat{\text{pass@}k} = 1 - \frac{\binom{n - c}{k}}{\binom{n}{k}}.
$$ {#eq-passk}
:::

::: proposition The pass@$k$ estimator is unbiased {#prop-passk}
For a single problem, if the $n$ samples are independent and each correct with probability $p$, then $\E\big[\widehat{\text{pass@}k}\big] = 1 - (1 - p)^k$. The plug-in estimator $1 - (1 - c/n)^k$ is biased downwards for $1 < k\le n$ whenever $0 < p < 1$.
:::

::: proof
$\binom{n - c}{k}/\binom{n}{k}$ is the probability that a uniformly random subset of $k$ of the $n$ samples contains none of the $c$ correct ones. Given the samples, it is therefore $\Prob(\text{a random } k\text{-subset has no correct sample}\mid\text{samples})$, and taking expectations over the samples, it equals the probability that $k$ samples chosen at random from $n$ i.i.d. samples are all wrong. A random $k$-subset of i.i.d. samples is itself a set of $k$ i.i.d. samples, so this probability is $(1 - p)^k$, proving unbiasedness. For the plug-in estimator, $x\mapsto(1 - x)^k$ is strictly convex on $[0, 1]$ for $k > 1$, so by Jensen's inequality $\E[(1 - c/n)^k] > (1 - \E[c/n])^k = (1 - p)^k$ when $c/n$ is not almost surely constant, that is when $0 < p < 1$; hence $\E[1 - (1 - c/n)^k] < 1 - (1 - p)^k$.
:::

Chen et al. reported that a $12$-billion-parameter Codex solved $28.8\%$ of HumanEval problems with one sample and $70.2\%$ with $100$ samples (pass@$100$), while GPT-3 solved none. The gap between pass@$1$ and pass@$100$ is the most important number in this chapter: it says that a model which usually fails can usually *succeed sometimes*, so anything that can pick out the successful sample turns breadth into accuracy. Repeated sampling as a general strategy, and pass@$k$ as a measure of it, are treated in [[reasoning/test-time-scaling]] and [[reasoning/self-consistency]].

::: example Estimating pass@$k$ {#ex-passk}
A model is sampled $n = 10$ times on a problem and $c = 3$ samples pass. Estimate pass@$1$, pass@$5$ and pass@$10$ with [[#eq-passk]] and compare with the plug-in $1 - (1 - c/n)^k$.
::: solution
pass@$1$: $1 - \binom{7}{1}/\binom{10}{1} = 1 - 7/10 = 0.3$. pass@$5$: $1 - \binom{7}{5}/\binom{10}{5} = 1 - 21/252 = 0.917$. pass@$10$: $\binom{7}{10} = 0$, so $1$ — with all ten samples, at least one is certainly among the three correct. The plug-in gives $0.3$, $1 - 0.7^5 = 0.832$ and $1 - 0.7^{10} = 0.972$. The unbiased estimator is larger, as [[#prop-passk]] predicts, and it uses the samples without replacement: the plug-in pretends that the next $k$ samples are fresh draws with success rate exactly $c/n$.
:::
:::

::: widget plot
f: 1 - (1 - p)^x; 1 - (1 - q)^x
x: 1, 100
y: 0, 1.02
sliders: p=0.288:0.01:0.6:0.001; q=0.05:0.001:0.6:0.001
labels: pass@$k$ for a problem with $p$; pass@$k$ for a harder problem with $q$
points: 1,0.288
caption: pass@$k = 1 - (1 - p)^k$ against $k$ for two per-sample success rates. On easy problems a few samples suffice; on a problem solved by $5\%$ of samples, $45$ are needed to reach $90\%$. A benchmark's pass@$k$ averages such curves over problems of different difficulty, which is why aggregate pass@$k$ rises steeply at first and then slowly: the remaining problems are those with tiny $p$.
:::

### Benchmarks age

HumanEval and the Mostly Basic Python Problems (MBPP; Austin et al., 2021, $974$ problems) were the standard code benchmarks for several years, and both illustrate the life cycle of benchmarks described in [[evaluation/benchmarks]]. Their tests were too few: Liu et al. (2023) added on average about eighty times as many tests to HumanEval (HumanEval+), and pass rates of many models dropped markedly — programs that passed the original tests were wrong on inputs nobody had checked. The problems were public, so later models may have seen them in training ([[evaluation/contamination]]); benchmarks such as LiveCodeBench (Jain et al., 2024) responded by collecting new contest problems continuously and evaluating each model only on problems published after its training cut-off. And the benchmarks saturated: as of 2026 leading models solve nearly all HumanEval problems on the first attempt, so it no longer distinguishes them.

## Code as an action {#sec-code-action}

So far code was the *product*. For an agent, code is also a *tool*: instead of calling a calculator, it writes `sum(x * w for x, w in zip(xs, ws))`; instead of reading a large data file into its context, it writes a script that summarises it; instead of claiming that a function is correct, it writes a test. Program-aided language models (Gao et al., 2023) had models write Python for arithmetic and symbolic reasoning steps and let the interpreter compute; CodeAct (Wang et al., 2024) made executable Python the agent's entire action space, so that one action can call several tools, loop and branch, and reported higher success rates than JSON-style tool calls on their multi-tool benchmarks. Code actions inherit the interpreter's precision (no arithmetic slips) and its expressiveness (one step can do what would take many tool calls), at the price of needing an interpreter that is safe to run arbitrary code in — the subject of [[#sec-sandbox]].

### Execution feedback

::: algorithm Generate, test, repair {#alg-repair}
Given a task with a test suite (provided, or written by the agent), and a budget of $r$ attempts:
1. **Generate** a candidate program from the task and the feedback so far.
2. **Execute** the tests against it in an isolated environment with time and memory limits.
3. If all tests pass, **return** the program. Otherwise extract **feedback** — the failing test, the assertion, the exception and traceback, or the difference between expected and actual output — append it to the context, and go to step 1 if attempts remain.
:::

The listing implements the loop for a single function. Two drafts stand in for a model: the first computes the median incorrectly for lists of even length; the second, written as if in response to the failing assertion, handles that case. The tests run in a fresh temporary directory, in a separate Python process started in isolated mode (`-I`: no user site-packages, no environment variables that alter Python's behaviour), with a minimal environment and a time limit. That is process isolation, not a security sandbox; the difference is the subject of [[#sec-sandbox]]. The listing ends by computing [[#eq-passk]].

```python
import subprocess, sys, tempfile, os
from math import comb

TESTS = """
import sys; sys.path.insert(0, ".")   # -I leaves the cwd off sys.path
from solution import median
assert median([3, 1, 2]) == 2
assert median([4, 1, 3, 2]) == 2.5
assert median([7]) == 7
assert median([-1, -1, 5, 9]) == 2.0
print("all tests passed")
"""

# Successive drafts a model might write; each later draft responds to feedback.
DRAFTS = [
    "def median(xs):\n    return sorted(xs)[len(xs) // 2]\n",
    "def median(xs):\n    s = sorted(xs)\n    m = len(s) // 2\n"
    "    return (s[m - 1] + s[m]) / 2 if len(s) % 2 == 0 else s[m]\n",
]

def run_tests(code, timeout=5):
    """Run the tests against `code` in a fresh directory and a separate,
    isolated interpreter (-I), with a time limit. Not a security sandbox."""
    with tempfile.TemporaryDirectory() as d:
        open(os.path.join(d, "solution.py"), "w").write(code)
        open(os.path.join(d, "test_solution.py"), "w").write(TESTS)
        try:
            r = subprocess.run([sys.executable, "-I", "test_solution.py"], cwd=d,
                               capture_output=True, text=True, timeout=timeout,
                               env={"PATH": "/usr/bin:/bin"})
        except subprocess.TimeoutExpired:
            return False, "timeout"
        out = [l.strip() for l in (r.stdout + r.stderr).splitlines()
               if l.strip() and set(l.strip()) != {"^"}]       # drop caret markers
        return r.returncode == 0, " / ".join(out[-2:])

for attempt, code in enumerate(DRAFTS, 1):
    ok, feedback = run_tests(code)
    print(f"attempt {attempt}: {'PASS' if ok else 'FAIL'} | {feedback}")
    if ok:
        break

def pass_at_k(n, c, k):
    """Unbiased estimator of pass@k from n samples of which c are correct (Chen et al., 2021)."""
    if n - c < k:
        return 1.0
    return 1 - comb(n - c, k) / comb(n, k)

for n, c in [(10, 3), (200, 12)]:
    print(n, c, [round(pass_at_k(n, c, k), 4) for k in (1, 5, 10)],
          "naive 1-(1-c/n)^k:", [round(1 - (1 - c / n) ** k, 4) for k in (1, 5, 10)])
```

```text
attempt 1: FAIL | assert median([4, 1, 3, 2]) == 2.5 / AssertionError
attempt 2: PASS | all tests passed
10 3 [0.3, 0.9167, 1.0] naive 1-(1-c/n)^k: [0.3, 0.8319, 0.9718]
200 12 [0.06, 0.2685, 0.4693] naive 1-(1-c/n)^k: [0.06, 0.2661, 0.4614]
```

The feedback line is what makes repair work: not "wrong", but *which* input failed. Chen et al. (2024) studied this as **self-debugging**, having models explain their code and the execution results before revising, and reported consistent gains, largest when unit-test feedback was available. With $n = 200$ samples and $c = 12$ correct, the two estimators nearly agree; the bias of the plug-in matters when $n$ is close to $k$.

::: example Code action or tool calls? {#ex-code-action}
An agent must find the total of a column in a $5{,}000$-row spreadsheet, each row about $12$ tokens when printed. Compare reading the rows into the context through a `read_rows` tool, $500$ rows per call, with writing one short script that computes the total.
::: solution
Reading: $10$ calls returning $60{,}000$ tokens in all, which the context must hold (or the agent must summarise as it goes), after which the model must add $5{,}000$ numbers in its head — a long arithmetic task at which models make slips. With the context growing by $6{,}000$ tokens per call, the ten invocations also re-read about $6{,}000\cdot(1 + 2 + \dots + 10) = 330{,}000$ tokens. Script: one action of perhaps $60$ tokens and an observation of one number; the interpreter does the arithmetic exactly. The script is better on every count — tokens, latency, accuracy — provided it is run somewhere it can do no harm.
:::
:::

### When does passing mean correct?

A test suite is a detector with two error rates. It rarely rejects a correct program (a flaky test, a wrong expectation), and it accepts an incorrect one whenever the bug lies outside what the tests exercise. The second rate — the **escape rate** — decides how much a pass is worth.

::: proposition The value of a passing test suite {#prop-pass}
Let a candidate program be correct with prior probability $\pi$. Suppose the tests always pass correct programs and pass an incorrect program with probability $\varepsilon$ (the escape rate). Then
$$
\Prob(\text{correct}\mid\text{pass}) = \frac{\pi}{\pi + (1 - \pi)\,\varepsilon}.
$$ {#eq-pass-posterior}
If $n$ candidates are sampled independently and one of those that pass is returned, the probability that the returned program is correct is also [[#eq-pass-posterior]], provided at least one passes; at least one passes with probability $1 - (1 - \pi - (1 - \pi)\varepsilon)^n$.
:::

::: proof
By Bayes' theorem, $\Prob(\text{correct}\mid\text{pass}) = \Prob(\text{pass}\mid\text{correct})\,\pi/\Prob(\text{pass})$, with $\Prob(\text{pass}\mid\text{correct}) = 1$ and $\Prob(\text{pass}) = \pi + (1 - \pi)\varepsilon$. For the second claim, each candidate passes independently with probability $\pi + (1 - \pi)\varepsilon$, and conditioned on passing it is correct with the probability above, independently of the others; choosing any one passing candidate (by a rule that does not look at correctness) therefore yields a correct one with that probability. None passes with probability $(1 - \pi - (1 - \pi)\varepsilon)^n$.
:::

::: widget bayes
mode: test
prevalence: 0.2
sensitivity: 0.999
specificity: 0.9
caption: Testing as diagnosis. Of $1{,}000$ candidate programs, $20\%$ are correct ("prevalence"); the tests pass virtually every correct program ("sensitivity") and reject $90\%$ of incorrect ones ("specificity", so the escape rate is $\varepsilon = 0.1$). Among the programs that pass, only about $71\%$ are correct ([[#eq-pass-posterior]]). Raise the specificity — more and better tests — and watch the posterior approach $1$; lower the prevalence, as for a hard problem, and passing means much less.
:::

::: example Sampling and filtering {#ex-filter}
A model's samples for a hard problem are correct with probability $\pi = 0.02$. The problem statement's example tests let through $5\%$ of incorrect programs. If one of the samples that pass is submitted, what is the chance it is correct? How does this change if a stronger hidden suite with escape rate $0.001$ is available for filtering?
::: solution
With the example tests: $0.02/(0.02 + 0.98\cdot0.05) = 0.02/0.069 = 0.290$. With the stronger suite: $0.02/(0.02 + 0.98\cdot0.001) = 0.02/0.02098 = 0.953$. Filtering converts many samples into a good answer only if the filter is much more selective than the base rate is small: here $\varepsilon$ must be well below $\pi$. AlphaCode (Li et al., 2022) faced this problem in programming competitions. It sampled very large numbers of programs per problem, removed those that failed the problem's example tests (which eliminated about $99\%$), and then clustered the survivors by their behaviour on generated inputs, submitting one program from each of the largest clusters, at most ten in all. Its simulated ranking was, on average, within the top $54\%$ of participants in recent Codeforces contests.
:::
:::

::: warning Agents can satisfy tests without solving the task
When passing tests is the goal, an agent may reach it by the wrong route: special-casing the tested inputs, catching and suppressing the exception the test checks for, weakening an assertion, or editing the test file itself. This is reward hacking in miniature ([[safety-alignment/reward-hacking]]), and it has been observed in agents trained with tests as rewards and in agents simply instructed to make tests pass. Defences: keep evaluation tests out of the agent's reach (or check that they are unchanged), review the diff and not only the test result, prefer property-based and held-out tests, and state in the instructions that modifying tests is not a solution.
:::

## Software-engineering agents {#sec-swe}

Writing a function to a specification is a small part of software engineering. The larger part is working in an existing code base: understanding an issue report, finding the relevant files among thousands, making a change consistent with the surrounding code, and checking that nothing else broke.

::: definition SWE-bench {#def-swebench}
**SWE-bench** (Jimenez et al., 2024; first released in October 2023) consists of $2{,}294$ task instances built from resolved GitHub issues in $12$ popular open-source Python repositories. Each instance gives the issue text and the repository at the commit before the fix. A system must produce a patch. The patch is applied and two sets of tests from the real fix are run: **fail-to-pass** tests, which failed before the fix and must now pass, and **pass-to-pass** tests, which passed before and must still pass. An instance is **resolved** if both sets pass; the score is the percentage resolved.
:::

When it was released the task looked nearly out of reach: the best model evaluated, given files retrieved by BM25 ([[prompting-rag/vector-search]]), resolved under $2\%$ of instances. Two smaller subsets followed. **SWE-bench Lite** ($300$ instances, 2024) selected self-contained issues to reduce evaluation cost. **SWE-bench Verified** ($500$ instances, released in August 2024 by OpenAI in collaboration with the benchmark's authors) was screened by professional software developers, who discarded instances whose issue descriptions were underspecified or whose tests could reject valid solutions; it became the most widely reported variant. Reported scores on Verified rose from about a third of instances for the best systems in mid-2024 to well over half during 2025, and as of 2026 there is continuing debate about how much of the remainder is measurable at all.

The rise came largely from scaffolds and from models trained for agentic coding, and two contrasting designs show the range:

- **SWE-agent** (Yang et al., 2024) argued that agents need an **agent–computer interface** designed for them, as people need good user interfaces: a file viewer that shows a window of about a hundred lines with line numbers, search commands that return concise summaries, an editing command that replaces a range of lines and runs a linter, rejecting edits that introduce syntax errors, and informative messages when a command produces no output. With such an interface, an agent based on GPT-4 resolved $12.5\%$ of the full benchmark, far above the earlier retrieval baseline.
- **Agentless** (Xia et al., 2024) showed that a fixed pipeline without an open-ended loop could be competitive: localise the fault hierarchically (files, then classes and functions, then lines), generate several candidate patches, run reproduction and regression tests to filter them, and choose by majority. It was competitive with agent systems of the time on SWE-bench Lite at a fraction of the cost — a reminder ([[agents/agent-loops#sec-agent]]) that workflows can beat agents when the steps are predictable.

::: example The economics of a coding agent {#ex-swe-cost}
An agent resolves an issue in $40$ steps, its context growing from $12{,}000$ tokens by $2{,}000$ per step, with $300$ output tokens per step. At $\$3$ per million input tokens and $\$15$ per million output tokens, what does one attempt cost? If the agent resolves $60\%$ of issues on the first attempt and failures are detected by tests, what is the cost per resolved issue with up to two attempts, assuming the second attempt succeeds on $30\%$ of first-attempt failures?
::: solution
Input: $40\cdot12{,}000 + 2{,}000\cdot\frac{39\cdot40}{2} = 480{,}000 + 1{,}560{,}000 = 2{,}040{,}000$ tokens, $\$6.12$. Output: $12{,}000$ tokens, $\$0.18$. One attempt costs $\$6.30$. With up to two attempts: expected attempts $1 + 0.4 = 1.4$, expected cost $\$8.82$; resolution rate $0.6 + 0.4\cdot0.3 = 0.72$; cost per resolved issue $8.82/0.72 = \$12.25$. Caching the repeated prefix ([[inference/kv-cache]]) would cut the input cost substantially, which is why it matters so much for agents.
:::
:::

### What SWE-bench measures, and what it does not

SWE-bench's strengths are realism (real issues, real repositories, real tests) and automatic grading. Its limits are worth knowing before reading any score. The repositories are public and popular, so their code, issues and fixes may be in training data, and some instances' solutions are described in the issue thread itself. Tests from the real fix can be specific to the original implementation, rejecting valid alternatives (the reason for the Verified screening) or accepting incomplete ones. All tasks are Python, and most are bug fixes in libraries rather than features in applications. Scores depend heavily on the scaffold, the number of attempts and whether the system may run its own tests, so a number without those details is hard to interpret. Variants in other languages, with multimodal issues and with newer or private repositories, appeared in 2024 and 2025 to address these gaps; [[agents/agent-security#sec-evaluation]] discusses the general principles.

## Sandboxing as a design principle {#sec-sandbox}

A code agent executes programs written by a model that can be wrong and, through prompt injection ([[prompting-rag/prompt-design#def-injection]]), can be steered by text it read in an issue, a dependency's documentation or a web page. The question is not whether model-written code will sometimes do something harmful — delete the wrong directory, consume all memory, contact a server it should not — but how much harm it can do when it does. **Sandboxing** answers by construction rather than by hope.

::: definition Sandbox {#def-sandbox}
A **sandbox** is an execution environment whose capabilities are restricted to those the task requires, enforced by the operating system or hypervisor rather than by the code being run. Its dimensions are: **file-system** scope (which paths are visible and writable), **network** access (none, an allow-list of hosts, or open), **credentials** (which secrets, tokens and identities are present), **resources** (CPU time, memory, disk, number of processes), **lifetime** (ephemeral environments discarded after the task) and **observability** (what is logged). A sandbox is characterised by the most damaging thing code inside it can do.
:::

The practical layers, in increasing strength, are operating-system process isolation with resource limits (like the listing, which bounds time but not much else), containers with restricted file systems and network policies, and virtual machines or kernel-level isolation layers designed for untrusted code. Stronger isolation costs start-up time and convenience; the right level depends on what the code could reach. Design rules that follow from the definition:

- **Least privilege.** Give the environment only the files, network destinations and credentials the task needs. An agent fixing a bug needs the repository and the test runner, not the deployment keys or the home directory.
- **No ambient secrets.** Credentials present in environment variables or configuration files are available to every program the agent runs, and to every injected instruction that asks for them.
- **Default-deny network.** Network access is the channel through which data leaves ([[agents/agent-security]]); open it only to the hosts needed, such as a package mirror.
- **Ephemerality and checkpoints.** Run in disposable environments, keep the agent's changes as a diff or a branch, and let a person review before anything reaches shared systems.
- **Separate read from write.** Reading code is low-risk; pushing to a shared branch, publishing a package or running a database migration should require explicit approval.

::: quiz
A coding agent runs inside a container with the developer's whole home directory mounted read–write, network access, and the developer's cloud credentials in environment variables. It is asked to fix a failing test in one repository. Which single change most reduces the potential damage of a mistaken or manipulated action?
- [ ] Add "never run destructive commands" to the system prompt.
- [ ] Use a more capable model.
- [x] Mount only the repository, remove the credentials, and restrict the network to a package mirror.
- [ ] Log every command the agent runs.
::: solution
Least privilege bounds what any action can do, whatever the model intends. A prompt instruction is a request, not an enforcement mechanism; a better model makes mistakes less often but not never; logging helps detect and investigate, but after the fact. Do log — but restrict first.
:::
:::

::: history
Program synthesis from specifications is as old as computer science, and neural code generation began well before large language models. Codex (Chen et al., 2021) introduced HumanEval and the unbiased pass@$k$ estimator and powered early code-completion assistants; Austin et al. (2021) released MBPP; Li et al. (2022) reached competitive-programming performance with AlphaCode by large-scale sampling and filtering. Open code models followed, including CodeGen (Nijkamp et al., 2023), StarCoder (Li et al., 2023) and Code Llama (Rozière et al., 2023). Gao et al. (2023) used code as a reasoning tool (PAL), Chen et al. (2024) studied self-debugging, Liu et al. (2023) exposed weak tests with HumanEval+, and Jain et al. (2024) built the contamination-resistant LiveCodeBench. Jimenez et al. released SWE-bench in October 2023 (ICLR 2024); Yang et al. (2024) introduced SWE-agent and the agent–computer interface; Wang et al. (2024) proposed CodeAct; Xia et al. (2024) showed with Agentless that pipelines could compete; and SWE-bench Verified was released in August 2024. In 2024–2025 command-line and editor-integrated coding agents from several companies and open-source projects became widely used, and models were increasingly trained with reinforcement learning on tasks graded by tests.
:::

::: summary
- Code is the most favourable domain for agents: it is executable, and tests provide cheap, automatic detection of failures.
- HumanEval measures functional correctness by unit tests; pass@$k$ is the chance that one of $k$ samples passes, estimated without bias by $1 - \binom{n - c}{k}/\binom{n}{k}$. The gap between pass@$1$ and pass@$k$ is what filtering and verification can capture.
- Code benchmarks age through weak tests, contamination and saturation; stronger test suites and date-filtered problems address the first two.
- Code is also an action: interpreters compute exactly and one program can do the work of many tool calls; generate–test–repair loops use execution feedback.
- A passing program is correct with probability $\pi/(\pi + (1 - \pi)\varepsilon)$: filtering many samples works only if the escape rate $\varepsilon$ is well below the base rate $\pi$.
- Agents can satisfy tests without solving tasks; protect evaluation tests and review diffs.
- SWE-bench grades patches to real repositories by fail-to-pass and pass-to-pass tests; its Verified subset (August 2024) removed flawed instances. Scaffolds (SWE-agent's interface) and pipelines (Agentless) both matter, and scores need their settings to be interpretable.
- Execute model-written code in sandboxes designed by least privilege: scoped files, no ambient secrets, default-deny network, ephemeral environments, approval for writes to shared systems.
:::

## Exercises

::: exercise pass@1 from samples {level=1 check="0.06"}
A model is sampled $200$ times on a problem and $12$ samples pass. What is the estimate of pass@$1$?
::: solution
$1 - \binom{188}{1}/\binom{200}{1} = 1 - 188/200 = 12/200 = 0.06$. For $k = 1$ the unbiased estimator is simply the fraction correct.
:::
:::

::: exercise pass@5 by hand {level=1 check="0.9167"}
With $n = 10$ samples of which $c = 3$ pass, compute the unbiased estimate of pass@$5$ to four decimal places.
::: solution
$\binom{7}{5} = 21$ and $\binom{10}{5} = 252$, so $1 - 21/252 = 1 - 0.0833 = 0.9167$.
:::
:::

::: exercise Samples needed {level=1 check="45"}
A problem is solved by $5\%$ of samples. What is the smallest $k$ for which pass@$k\ge0.9$?
::: solution
$1 - 0.95^k\ge0.9$ means $0.95^k\le0.1$, so $k\ge\ln0.1/\ln0.95 = 44.9$, and $k = 45$.
:::
:::

::: exercise Posterior after passing {level=2 check="0.714"}
Candidate programs are correct with probability $0.2$; the tests always pass correct programs and pass $10\%$ of incorrect ones. What is the probability that a passing program is correct? Give three decimal places.
::: solution
$0.2/(0.2 + 0.8\cdot0.1) = 0.2/0.28 = 0.714$ ([[#prop-pass]]).
:::
:::

::: exercise How good must the tests be? {level=2 check="0.000206"}
Samples are correct with probability $\pi = 0.01$. What escape rate $\varepsilon$ makes a passing program correct with probability $0.98$? Give three significant figures.
::: solution
$\pi/(\pi + (1 - \pi)\varepsilon) = 0.98$ gives $(1 - \pi)\varepsilon = \pi(1/0.98 - 1) = 0.01\cdot0.020408 = 0.00020408$, so $\varepsilon = 0.00020408/0.99 = 0.000206$, or $2.06\times10^{-4}$: about one incorrect program in five thousand may slip through.
:::
:::

::: exercise Bias of the plug-in estimator {level=2}
For $n = 2$ samples and $k = 2$, compute the expectation of the unbiased estimator and of the plug-in estimator $1 - (1 - c/n)^2$ as functions of $p$, and verify [[#prop-passk]] directly.
::: solution
$c\sim\Bin(2, p)$. Unbiased: $\widehat{\text{pass@}2} = 1$ if $c\ge1$ and $0$ if $c = 0$ (since $\binom{2 - c}{2}/\binom{2}{2}$ is $1$ for $c = 0$ and $0$ otherwise), with expectation $1 - (1 - p)^2$, as claimed. Plug-in: $c = 0$ gives $0$, $c = 1$ gives $1 - \frac14 = \frac34$, $c = 2$ gives $1$; expectation $2p(1 - p)\cdot\frac34 + p^2 = \frac32p - \frac12p^2$. The true value is $1 - (1 - p)^2 = 2p - p^2$. The difference is $(2p - p^2) - (\frac32p - \frac12p^2) = \frac12p(1 - p) > 0$ for $0 < p < 1$: the plug-in underestimates, most at $p = \frac12$, by $\frac18$.
:::
:::

::: exercise A sandbox specification {level=2}
Write a sandbox specification, along the dimensions of [[#def-sandbox]], for an agent that must fix a failing test in a web application's repository, where the tests need a local database and the package manager must download dependencies.
::: solution
*File system:* a fresh clone of the repository, writable; nothing else from the host; a scratch directory for build outputs. *Network:* deny by default; allow the package registry or an internal mirror; the database runs inside the sandbox, so no external database access. *Credentials:* none; read-only registry access if needed, scoped to that registry; no cloud, deployment or source-control push credentials. *Resources:* CPU and memory limits, a wall-clock limit per command and for the whole task, a cap on processes and disk. *Lifetime:* an ephemeral container or virtual machine destroyed after the task; the result leaves as a diff for review. *Observability:* log every command, its output and every network connection attempt, including those denied. Pushing the change, opening a pull request or running a migration against a shared database are outside the sandbox and require approval.
:::
:::

::: exercise An agent that hacks its tests {level=3}
Design an automatic check that detects the reward-hacking behaviours listed in the warning — special-casing tested inputs, suppressing exceptions, weakening assertions, editing tests — for patches produced by a coding agent, and discuss what each check misses.
::: solution
(1) *Test integrity:* hash the test files before the run and compare after; reject patches that touch test files unless the task requires it, and then show the diff to a reviewer. Misses: changes to fixtures, configuration (marking tests as skipped) or conftest files — so extend the integrity check to all test infrastructure. (2) *Held-out tests:* evaluate with tests the agent never saw, generated independently (property-based tests, or tests from a stronger suite as in HumanEval+). Special-casing of visible inputs fails them. Misses: bugs that neither suite exercises. (3) *Static patterns:* flag new literal comparisons against test inputs, broad `except` clauses around the changed code, and new `skip` or `xfail` markers. Misses: obfuscated or semantically equivalent forms, and false positives on legitimate code. (4) *Mutation analysis:* mutate the patch (invert a condition, change a constant); if tests still pass, the tests do not constrain the change, so the pass carries little evidence. Misses: costs compute, and equivalent mutants. (5) *Review by a person or a separate model* of the diff against the issue. No single check is complete; layering them raises the effective detection rate, and each failure found becomes a new regression check.
:::
:::
