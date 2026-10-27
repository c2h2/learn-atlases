The benchmarks of the previous chapters ask how well a model does on a fixed set of tasks under a fixed protocol. A different question matters for deployment and safety decisions: **what can this model do, if someone tries hard to get it to?** A model that fails a task with a plain prompt may succeed with a better prompt, with tools, with many attempts, or after a little fine-tuning; and a model that could succeed may, in principle, perform below its ability when it is being tested. **Capability evaluations** aim to estimate what a model can do under strong **elicitation**, and **dangerous-capability evaluations** apply this to capabilities that could cause serious harm, such as assisting with cyber-attacks or with weapons, or acting autonomously in ways that evade human control.

This chapter treats these evaluations as a measurement discipline. It defines capability as opposed to typical performance, and **propensity** as opposed to capability; derives why elicited capability is a lower bound and how repeated attempts change what a "failure" means; explains the concern of **sandbagging**; and works through the **task-horizon** measure of agentic capability published by METR (Kwa et al., 2025), with a fit in plain Python. It then describes, at the level of published documents only, how frontier developers' safety frameworks and government institutes use such evaluations, and what **red-teaming** is as a process. Consistent with the rest of the atlas, it contains no hazardous content: no example items from dangerous domains and no details of how a model might provide uplift; the methods are illustrated with neutral tasks.

## Capability, elicitation and propensity {#sec-capability}

::: definition Capability, elicitation and propensity {#def-capability}
For a task family $\mathcal{T}$ and a model $M$, let $s(M, e)$ be the success rate on $\mathcal{T}$ under an **elicitation** method $e$ — a prompt, a scaffold with tools, a number of attempts, a fine-tuning procedure — drawn from a set $\mathcal{E}$ of methods available to the evaluator. The model's **capability** on $\mathcal{T}$ relative to $\mathcal{E}$ is

$$
\operatorname{cap}_{\mathcal{E}}(M) = \sup_{e\in\mathcal{E}}s(M, e).
$$

Its **typical performance** is $s(M, e_0)$ for the default way it is used. The **elicitation gap** is $\operatorname{cap}_{\mathcal{E}}(M) - s(M, e_0)$. Its **propensity** for a behaviour is how often it exhibits the behaviour when not specifically elicited to — in ordinary use, or in situations where the behaviour is possible but not requested.
:::

Shevlane et al. (2023) separated the two questions for risk: **dangerous-capability evaluations** ask whether a model *can* cause harm if directed or misused, and **alignment evaluations** ask whether it has the *propensity* to do so of its own accord. A model with a dangerous capability and no propensity is a misuse risk; a model with both is more serious. The two need different methods: capability is elicited by trying hard to make the model succeed, propensity is measured by observing what it does when not pushed.

::: proposition Elicited capability is a lower bound {#prop-lower-bound}
For any sets of elicitation methods $\mathcal{E}\subseteq\mathcal{E}'$, $\operatorname{cap}_{\mathcal{E}}(M)\le\operatorname{cap}_{\mathcal{E}'}(M)$. In particular, any measured success rate $s(M, e)$ is a lower bound on the capability relative to every set of methods containing $e$. If a method makes $k$ independent attempts at a task with per-attempt success probability $p$ and a reliable check of success, its success rate is

$$
s_k = 1 - (1 - p)^k,
$$ {#eq-attempts}

which increases to $1$ as $k\to\infty$ whenever $p > 0$.
:::

::: proof
A supremum over a larger set is at least as large, and $s(M, e)\le\sup_{e'\in\mathcal{E}}s(M, e')$ for $e\in\mathcal{E}$. With independent attempts, all $k$ fail with probability $(1 - p)^k$, and the check identifies any success; $(1 - p)^k\to0$ for $0 < p\le1$.
:::

The proposition is simple but it shapes the whole field. A capability evaluation can only show that a model *can* do something; it can never prove that the model *cannot*, because a better elicitation method might exist. Evaluators therefore invest heavily in elicitation — expert prompting, agent scaffolds with appropriate tools, many attempts, and fine-tuning on related tasks — and report what they tried. The relevant set $\mathcal{E}$ is set by the threat model: what elicitation would a realistic actor have? Someone with access only to a chat interface has fewer methods than someone with the weights, who can fine-tune.

[[#eq-attempts]] also changes what a failure means. A model that solves a task on $2\%$ of attempts looks incapable on a single attempt but succeeds with probability $1 - 0.98^{50} = 64\%$ in $50$ attempts, if success can be recognised. This is the pass@$k$ idea of [[evaluation/benchmarks#sec-passk]] applied to risk, and it is why test-time compute — more samples, longer reasoning — is part of elicitation ([[reasoning/test-time-scaling]]).

::: example Measuring an elicitation gap {#ex-gap}
On a suite of neutral software tasks, a model solves $12\%$ with a plain prompt, $31\%$ per attempt inside an agent scaffold with a code interpreter, and the scaffold can verify its own solutions by running the tasks' tests. What success rate does the scaffold reach with $5$ attempts per task, and what is the elicitation gap relative to the plain prompt? What assumption makes the $5$-attempt figure an overestimate?
::: solution
By [[#eq-attempts]], $1 - 0.69^5 = 0.844$, so the elicitation gap is $0.844 - 0.12 = 0.72$: most of the measured capability comes from elicitation. The formula assumes attempts are independent with the same success probability on every task. In reality some tasks are solvable and others not, so failures are correlated within a task; the true $5$-attempt rate lies between $0.31$ (perfect correlation) and $0.844$ (independence) and must be measured, not computed. Either way, a report of the $12\%$ figure alone would badly understate what the model can do.
:::
:::

### When a model never succeeds {#sec-zero}

Dangerous-capability evaluations often report that a model succeeded on none of $n$ attempts. What does that rule out?

::: proposition The rule of three {#prop-rule-of-three}
If $n$ independent attempts with success probability $p$ all fail, the exact one-sided $95\%$ upper confidence bound for $p$ is

$$
p_{\text{up}} = 1 - 0.05^{1/n}\ \approx\ \frac{3}{n}.
$$

An actor making $k$ attempts at the same task would then succeed at least once with probability up to $1 - (1 - p_{\text{up}})^k$, which exceeds $\frac12$ once $k\ge n\ln2/\ln20\approx0.23n$.
:::

::: proof
The bound is the largest $p$ that the data do not reject at the $5\%$ level: $\Prob(\text{all } n\text{ fail}) = (1 - p)^n\ge0.05$, so $p\le1 - 0.05^{1/n}$. Since $-\ln(1 - p)\approx p$ for small $p$, $(1 - p)^n = 0.05$ gives $np\approx-\ln0.05 = \ln20 = 2.996\approx3$. For the second claim, $(1 - p_{\text{up}})^k = 0.05^{k/n}\le\frac12$ when $k\ge n\ln2/\ln20 = 0.231n$.
:::

So "$0$ successes in $50$ attempts" is consistent, at $95\%$ confidence, with a per-attempt success rate of up to $5.8\%$ — and an actor making a dozen attempts could then succeed half the time. Zero observed successes support a claim that a capability is *rare under the elicitation tried*, not that it is absent. Frameworks that use evaluations to rule out capabilities therefore combine many attempts, the strongest available elicitation, and margins of safety below their thresholds.

::: widget plot
f: 1 - (1 - (1 - 0.05^(1/n)))^x; 1 - (1 - 3/n)^x
x: 1, 200
y: 0, 1
sliders: n=50:10:500:10
hlines: 0.5
labels: exact bound $1 - 0.05^{k/n}$; rule-of-three approximation
caption: After $0$ successes in $n$ evaluation attempts, the largest probability consistent with the data (at $95\%$ confidence) that an actor succeeds at least once in $k$ attempts (horizontal axis), by [[#prop-rule-of-three]]. For $n = 50$ the curve crosses $\frac12$ at about $12$ attempts: a clean evaluation result bounds the risk per attempt, not per actor.
:::

::: example Planning the number of attempts {#ex-attempts}
An evaluator wants to be able to say, after observing no successes, that the per-attempt success rate on a task is below $1\%$ with $95\%$ confidence. How many attempts are needed? If the model actually succeeds $0.5\%$ of the time, how likely is it that all those attempts fail anyway?
::: solution
Need $1 - 0.05^{1/n}\le0.01$, that is $n\ge\ln0.05/\ln0.99 = 298.1$, so $299$ attempts (the rule of three gives $300$). If $p = 0.005$, all $299$ fail with probability $0.995^{299} = 0.223$: one time in four or five, a model with a real but rare capability passes the evaluation cleanly. This is not an error of the method — such a model *is* below the $1\%$ threshold — but it shows how much a "zero" depends on the number of attempts.
:::
:::

## Sandbagging and evaluation awareness {#sec-sandbagging}

The lower-bound logic assumes the model is trying. Evaluations of capable models face the possibility that it is not.

::: definition Sandbagging {#def-sandbagging}
**Sandbagging** is strategic underperformance on an evaluation: a model, or a developer, causing measured capability to be lower than the model's actual capability, for instance to avoid triggering safety measures. **Evaluation awareness** is a model's ability to recognise that it is being evaluated rather than deployed.
:::

Both have been demonstrated in controlled settings. Van der Weij et al. (2024) showed that language models could be prompted, or fine-tuned, to underperform selectively on dangerous-capability benchmarks while keeping their performance on general benchmarks, and that a model could be **password-locked** — trained to reveal a capability only when a particular string is present. Greenblatt et al. (2024) used password-locked models as a test bed for elicitation and found that fine-tuning on a small number of high-quality demonstrations usually recovered the hidden capability, while prompting often did not; reinforcement learning could recover it when the locked model's outputs were good enough to learn from. Work in 2025 reported that frontier models can often distinguish evaluation transcripts from real deployment ones, at rates well above chance (for example Needham et al., 2025), which matters for propensity evaluations especially: behaviour observed in a test that the model recognises as a test may not be its behaviour in deployment.

None of this shows that deployed models sandbag in practice; it shows that evaluation methods must be robust to the possibility. Mitigations described in the literature and in developers' frameworks include: **fine-tuning-based elicitation**, which is harder to resist than prompting; comparing results with **predictions** from scaling trends and from related, less sensitive tasks, so that an unexpectedly low score stands out; checking **consistency** across paraphrased and disguised versions of the tasks; inspecting reasoning traces where available ([[reasoning/faithfulness-limits]]); and making evaluation environments realistic.

## Agentic capability and task horizons {#sec-horizon}

Many capabilities of concern — and of value — involve long sequences of actions: carrying out a software project, running an experiment, operating a computer. **Agentic evaluations** give a model, inside a scaffold that lets it run code, browse or use tools ([[agents/agent-loops]]), a task in a sandboxed environment and score whether it achieves the goal. Benchmarks such as SWE-bench ([[evaluation/benchmarks#sec-code-benchmarks]]) score fixed task sets; a different approach tries to put all tasks on a single scale.

::: definition Task time horizon {#def-horizon}
For a suite of tasks, each with a **human completion time** $t_i$ (the time skilled humans take, measured by timing them), fit a logistic model of an agent's success on $x_i = \log_2t_i$,

$$
\Prob(\text{success on task } i) = \sigma(a + b\,x_i),\qquad b < 0.
$$

The agent's **$q$ time horizon** is the human task time $h_q$ at which the fitted success probability equals $q$; the **$50\%$ time horizon** is the most reported.
:::

Kwa et al. (2025), at METR, built a suite of about $170$ software-engineering, machine-learning and reasoning tasks from about a second to many hours of human time, timed human experts on them, and evaluated frontier models released between 2019 and early 2025. They reported that the $50\%$ time horizon of the most capable models had grown roughly exponentially over that period, **doubling about every seven months**, with some indication of faster growth in 2024–2025, and that horizons at $80\%$ reliability were several times shorter than at $50\%$. The authors were explicit about limitations: the tasks are mostly software and research tasks, self-contained, with clear success criteria, and less "messy" than real work; human times depend on who was timed; and extrapolating the trend is uncertain. The measure's appeal is that, unlike a benchmark score, it has no ceiling: harder tasks can always be added.

::: proposition Horizons from the logistic fit {#prop-horizon}
Under [[#def-horizon]],

$$
h_q = 2^{(\operatorname{logit}q - a)/b},\qquad\text{so}\quad h_{50} = 2^{-a/b},\qquad \frac{h_{50}}{h_q} = 2^{-\operatorname{logit}q/b}.
$$

If $h_{50}$ grows exponentially in calendar time with doubling time $d$, then the time needed for it to grow by a factor $F$ is $d\log_2F$.
:::

::: proof
$\sigma(a + bx) = q$ if and only if $a + bx = \operatorname{logit}q$, so $x = (\operatorname{logit}q - a)/b$ and $h_q = 2^x$. With $q = \frac12$, $\operatorname{logit}\frac12 = 0$. The ratio is $2^{(0 - a)/b - (\operatorname{logit}q - a)/b} = 2^{-\operatorname{logit}q/b}$. If $h_{50}(T) = h_{50}(T_0)\,2^{(T - T_0)/d}$, it grows by $F$ when $(T - T_0)/d = \log_2F$.
:::

The ratio $h_{50}/h_{80} = 2^{-\operatorname{logit}0.8/b} = 2^{1.386/\lvert b\rvert}$ depends only on the slope: an agent whose success falls off slowly with task length ($\lvert b\rvert$ small) has a much shorter $80\%$ horizon than $50\%$ horizon — it can sometimes do long tasks, but not reliably.

The listing fits the model to a **synthetic** suite of $150$ tasks whose true $50\%$ horizon is $60$ minutes, by Newton's method for logistic regression, with a bootstrap interval obtained by resampling tasks.

```python
import math, random

rng = random.Random(7)
sig = lambda z: 1 / (1 + math.exp(-z))

# synthetic task suite: human completion times log-uniform from 1 minute to 16 hours;
# the agent's true success probability is sigma(beta * (log2 h50 - log2 t)), h50 = 60 minutes
H50, BETA = 60.0, 0.7
tasks = []
for _ in range(150):
    t = 2 ** rng.uniform(0, math.log2(960))                       # minutes
    tasks.append((math.log2(t), rng.random() < sig(BETA * (math.log2(H50) - math.log2(t)))))

def fit(data, iters=25):
    """Logistic regression success ~ sigma(a + b * log2 t) by Newton's method."""
    a = b = 0.0
    for _ in range(iters):
        ga = gb = haa = hab = hbb = 0.0
        for x, y in data:
            p = sig(a + b * x)
            ga += y - p; gb += (y - p) * x                          # gradient
            w = p * (1 - p)
            haa += w; hab += w * x; hbb += w * x * x                # minus the Hessian
        det = haa * hbb - hab * hab
        a += (hbb * ga - hab * gb) / det
        b += (haa * gb - hab * ga) / det
    return a, b

def horizon(a, b, q):
    """Human task time (minutes) at which the fitted success probability equals q."""
    return 2 ** ((math.log(q / (1 - q)) - a) / b)

a, b = fit(tasks)
print(f"fitted a = {a:.3f}, slope b = {b:.3f} per doubling of task length")
print(f"50% time horizon: {horizon(a, b, 0.5):.1f} min, 80% time horizon: {horizon(a, b, 0.8):.1f} min")
boot = sorted(horizon(*fit([tasks[rng.randrange(len(tasks))] for _ in tasks]), 0.5)
              for _ in range(500))
print(f"95% bootstrap interval for the 50% horizon: [{boot[12]:.1f}, {boot[487]:.1f}] min")
for lo, hi in [(1, 4), (4, 15), (15, 60), (60, 240), (240, 960)]:
    sub = [y for x, y in tasks if math.log2(lo) <= x < math.log2(hi)]
    print(f"tasks of {lo:3d}-{hi:3d} min: {len(sub):3d} tasks, success rate {sum(sub) / len(sub):.2f}")
```

```text
fitted a = 4.865, slope b = -0.872 per doubling of task length
50% time horizon: 47.8 min, 80% time horizon: 15.9 min
95% bootstrap interval for the 50% horizon: [33.2, 69.1] min
tasks of   1-  4 min:  39 tasks, success rate 1.00
tasks of   4- 15 min:  30 tasks, success rate 0.93
tasks of  15- 60 min:  31 tasks, success rate 0.52
tasks of  60-240 min:  20 tasks, success rate 0.25
tasks of 240-960 min:  30 tasks, success rate 0.10
```

The point estimate, $48$ minutes, is off from the true $60$ by sampling noise, and the bootstrap interval — from $33$ to $69$ minutes, a factor of two — contains the truth. With $150$ tasks, a horizon is known only to within a factor of about $1.5$ either way, and the interval would widen further with fewer long tasks, which are the most expensive to build and to time. The same uncertainty propagates into trend estimates: a doubling time fitted to a few models, each with such an interval, is itself uncertain, as the authors of the original study emphasised.

::: widget plot
f: 1/(1 + exp(-(c*(log(h) - log(x))/log(2))))
x: 1, 960
y: 0, 1
sliders: h=60:5:480:5; c=0.7:0.2:2:0.05
hlines: 0.5; 0.8
labels: success probability against human task time (minutes)
caption: The logistic task-horizon model of [[#def-horizon]] with $50\%$ horizon $h$ minutes and slope $c$ per doubling of task time. The $50\%$ and $80\%$ horizons are where the curve crosses the two horizontal lines; a shallow slope separates them widely, as [[#prop-horizon]] predicts.
:::

::: example Extrapolating a horizon {#ex-extrapolate}
An agent has a $50\%$ horizon of $1$ hour, and the trend of the most capable agents has a doubling time of $7$ months. If the trend continued, how long would it take to reach a horizon of $8$ hours? What does a $\pm1$ month uncertainty in the doubling time do to the answer?
::: solution
By [[#prop-horizon]], $7\log_28 = 21$ months. With doubling times of $6$ or $8$ months, $18$ or $24$ months. Small uncertainty in the rate becomes large uncertainty in the date, and the extrapolation assumes the trend continues and that the task suite is representative of the work in question — both open questions. Forecasts of this kind are scenarios, not predictions.
:::
:::

## Dangerous-capability evaluations in practice {#sec-frameworks}

Since 2023, several developers of frontier models have published **safety frameworks** that tie decisions about training and deployment to the results of capability evaluations. Examples include Anthropic's **Responsible Scaling Policy** (first published 2023), OpenAI's **Preparedness Framework** (2023, revised 2025) and Google DeepMind's **Frontier Safety Framework** (2024, revised since), with frameworks from other developers following; at the AI Seoul Summit in May 2024, sixteen companies committed to publish such frameworks. Their details differ and are revised regularly, and what follows describes their common structure as published, not their current contents.

::: definition Capability thresholds and safeguards {#def-thresholds}
A **capability threshold** (called a capability level, critical capability level or similar) is a written description of a level of capability in a risk domain at which a developer commits to additional **safeguards** — security measures protecting the weights, deployment measures restricting misuse, or a decision not to deploy. An **early-warning** or **preliminary evaluation** is designed to indicate that a model may be approaching a threshold, with a margin, so that fuller evaluation and safeguards can be prepared before it is crossed.
:::

The risk domains named across published frameworks are broadly similar: chemical and biological weapons (and in some frameworks radiological and nuclear), cyber-offence, autonomy and self-replication, and the ability to accelerate AI research and development itself; some include persuasion and manipulation. Each is evaluated with a mixture of methods, which the frameworks and the developers' **system cards** describe at a general level:

- **automated benchmarks** of relevant knowledge and skills, typically built by domain experts, with the items kept private;
- **agentic tasks** in sandboxed environments, such as capture-the-flag exercises for cyber capability, or AI research tasks scored like those of [[#sec-horizon]];
- **expert red-teaming**: domain specialists probe the model interactively for a period, under the developer's safeguards for handling sensitive information;
- **uplift studies**: randomised experiments comparing how well participants complete proxy tasks with and without access to the model, against a control group with other resources such as internet search — the most direct measure of the marginal risk a model adds, and the most expensive.

::: example The statistics of an uplift study {#ex-uplift}
An uplift study on a neutral proxy task (completing a technical procedure from documentation) assigns $50$ participants to a control group with internet access and $50$ to a group that also has a model. $20$ of the control group and $28$ of the model group complete the task. Is the difference significant, and how many participants per group would be needed to detect a true difference of this size with $80\%$ power at the $5\%$ level?
::: solution
The rates are $0.40$ and $0.56$, a difference of $0.16$ with standard error $\sqrt{0.4\cdot0.6/50 + 0.56\cdot0.44/50} = 0.099$, so $z = 1.62$ and $p\approx0.10$: not significant. For $80\%$ power the standard normal approximation requires $n = (1.96 + 0.84)^2(0.24 + 0.2464)/0.16^2\approx149$ per group ([[evaluation/evaluation-statistics]]). Uplift studies are expensive because each participant spends hours, so many are underpowered; a non-significant result from a small study is weak evidence of no uplift, and should be reported with its confidence interval ($0.16\pm0.19$ here), not as a finding of zero effect.
:::
:::

Results are reported in system cards in summarised form — which evaluations were run, under what elicitation, and whether thresholds were judged to be reached — while the items themselves are withheld, since publishing them would be both a contamination risk and, in some domains, a hazard. Phuong et al. (2024) published an example of a full evaluation programme at this level of description, covering persuasion and deception, cyber-security, self-proliferation and self-reasoning, without hazardous details.

### Government institutes and third parties {#sec-institutes}

Governments created institutions to evaluate frontier models independently. The UK **AI Safety Institute**, announced at the Bletchley Park summit in November 2023 and renamed the **AI Security Institute** in 2025, and the US **AI Safety Institute** at NIST, established in 2023–2024 and reorganised in 2025 as the **Center for AI Standards and Innovation (CAISI)**, conducted pre-deployment testing of some frontier models under voluntary agreements with developers, published reports on joint evaluations, and developed methods; the UK institute released **Inspect**, an open-source framework for running evaluations, in 2024. Other countries established similar bodies, and the first International AI Safety Report (Bengio et al., 2025) surveyed the evidence on capabilities and risks for policy makers. Independent organisations such as METR and Apollo Research evaluate models before release for developers and publish methods and findings, for example on autonomous task completion and on the capacity of models to pursue hidden goals in contrived test scenarios (Meinke et al., 2024). The arrangement is evolving, and its specifics — which models are tested, by whom, with what access — should be read from current primary sources.

::: warning A passed evaluation is not a safety guarantee
It is tempting to read "the model did not reach the threshold" as "the model is safe". It means that under the elicitation tried, on the tasks used, the evidence did not show the capability. By [[#prop-lower-bound]] a better method might show more; by [[#prop-rule-of-three]] zero successes still allow a non-trivial success rate; the tasks are proxies for real-world harm, chosen partly because they can be tested safely; and capabilities can grow after release through fine-tuning, new tools or better scaffolds. Frameworks address these with safety margins, re-evaluation and external testing, and their authors describe them as evolving. Read evaluation claims for their elicitation, their sample sizes and their proxies.
:::

## Red-teaming as a process {#sec-red-teaming}

**Red-teaming** — adversarial testing to find failures before others do — is a process rather than a single evaluation, and its value depends on how the process is run. Its techniques against deployed systems are discussed conceptually in [[safety-alignment/red-teaming]]; here the concern is its role as evaluation.

::: algorithm A red-teaming engagement {#alg-red-team}
1. **Scope and threat model**: which harms, which kinds of user or adversary, which access (chat interface, API, tools, weights), what counts as a finding, and its severity scale.
2. **Recruit** red-teamers with the relevant expertise and diversity of background, under agreements on confidentiality and the handling of any sensitive outputs.
3. **Probe**: manual exploration, structured test plans, and automated generation of test inputs, including with other models (Perez et al., 2022).
4. **Record** each attempt and outcome systematically, with severity and reproducibility, so that findings can be counted and not only anecdotally reported.
5. **Triage and mitigate**: findings feed training data, classifiers, policies or deployment restrictions.
6. **Regress**: findings become test cases rerun on later versions, turning a one-off exercise into a repeatable evaluation.
:::

Ganguli et al. (2022) described a large red-teaming effort in detail, releasing a dataset of about $39{,}000$ red-team attempts with harmfulness ratings, and found that models trained with RLHF became harder to red-team as they grew larger, while other model types did not. Red-teaming results are hard to turn into rates: red-teamers search adaptively, so the fraction of successful attempts depends on their skill and persistence, not just on the model. They are best read as existence proofs and as a source of test cases, with quantitative claims reserved for the systematic re-tests of step 6.

::: quiz
An evaluation report says: "We ran $100$ expert-written tasks in a risk domain with our standard agent scaffold and $5$ attempts each; the model solved $0$. We conclude it lacks the capability." Which objections are valid?
- [x] Other elicitation (fine-tuning, better tools, more attempts) might succeed
- [x] With $500$ failed attempts, a per-attempt success rate of about $0.6\%$ is still consistent with the data
- [x] Success on proxy tasks may not track real-world risk in either direction
- [ ] Zero successes proves sandbagging
::: solution
By [[#prop-lower-bound]] the result is a lower bound relative to the methods tried. By [[#prop-rule-of-three]], $0$ of $500$ gives an upper bound of about $3/500 = 0.6\%$ per attempt (if attempts were independent; correlated attempts on the same task make the effective sample smaller and the bound larger). Proxies may be easier or harder than the real thing. Nothing in a zero score by itself indicates deliberate underperformance; sandbagging would be suspected only if, for example, the score were far below predictions from related tasks or fine-tuning recovered much more.
:::
:::

::: history
Evaluating AI systems for dangerous capabilities before deployment was proposed in the alignment community around 2021–2022 and first practised at scale in the pre-release evaluation of GPT-4 in 2022, in which the group that later became METR tested for autonomous replication and the system card reported red-teaming by external experts (OpenAI, 2023). Shevlane et al. ("Model evaluation for extreme risks", 2023) set out the case for dangerous-capability and alignment evaluations as inputs to deployment decisions. Developers' safety frameworks followed from September 2023, and government institutes in the UK and the US from November 2023. Research on evaluation itself documented sandbagging (van der Weij et al., 2024), studied elicitation with password-locked models (Greenblatt et al., 2024), published full evaluation programmes (Phuong et al., 2024) and introduced the task-horizon measure (Kwa et al., 2025). Red-teaming, borrowed from military and computer-security practice, entered language-model work with Ganguli et al. (2022) and automated red-teaming with Perez et al. (2022).
:::

::: summary
- **Capability** is the best success rate over an allowed set of **elicitation** methods; **typical performance** uses the default method; **propensity** is what a model does unprompted ([[#def-capability]]).
- Elicited capability is a **lower bound** ([[#prop-lower-bound]]); evaluators must try hard (prompting, scaffolds, tools, many attempts, fine-tuning) and report what they tried. $k$ attempts at per-attempt rate $p$ succeed with probability $1 - (1 - p)^k$.
- **Zero successes in $n$** bounds the rate by about $3/n$ ([[#prop-rule-of-three]]), which still allows an actor with many attempts to succeed.
- **Sandbagging** and **evaluation awareness** have been demonstrated in controlled settings; fine-tuning-based elicitation, trend predictions and consistency checks mitigate them.
- The **task-horizon** measure fits success against $\log_2$ human time and reports $h_{50} = 2^{-a/b}$ ([[#prop-horizon]]); METR reported $h_{50}$ doubling about every seven months from 2019 to early 2025, with wide uncertainty and stated limitations.
- Developers' **safety frameworks** tie capability **thresholds** to safeguards ([[#def-thresholds]]), using benchmarks, agentic tasks, expert red-teaming and uplift studies; government institutes (UK AISI, US CAISI) and third parties test independently. Items in hazardous domains are withheld.
- **Red-teaming** is a scoped, recorded, iterative process whose findings become regression tests ([[#alg-red-team]]).
:::

## Exercises

::: exercise The rule of three {level=1 check="0.0487"}
A model fails all of $60$ independent attempts at a task. Give the exact $95\%$ upper confidence bound on its per-attempt success rate to four decimal places, and the rule-of-three approximation.
::: solution
$1 - 0.05^{1/60} = 1 - e^{\ln0.05/60} = 1 - e^{-0.04993} = 0.0487$. The approximation is $3/60 = 0.05$.
:::
:::

::: exercise Many attempts {level=1 check="0.636"}
A model succeeds on $2\%$ of independent attempts at a task, and success can be recognised. What is the probability of at least one success in $50$ attempts (three decimal places)?
::: solution
$1 - 0.98^{50} = 1 - 0.3642 = 0.636$ by [[#eq-attempts]].
:::
:::

::: exercise A horizon from fitted coefficients {level=1 check="32"}
A task-horizon fit gives $a = 3$ and $b = -0.6$ with task times in minutes. What is the $50\%$ time horizon in minutes?
::: solution
$h_{50} = 2^{-a/b} = 2^{3/0.6} = 2^5 = 32$ minutes.
:::
:::

::: exercise The $80\%$ horizon {level=2 check="6.45"}
For the fit of the previous exercise, compute the $80\%$ time horizon in minutes to two decimal places, and the ratio $h_{50}/h_{80}$.
::: solution
$\operatorname{logit}0.8 = \ln4 = 1.386$. $h_{80} = 2^{(1.386 - 3)/(-0.6)} = 2^{2.690} = 6.45$ minutes. The ratio is $32/6.45 = 4.96 = 2^{1.386/0.6}$, as [[#prop-horizon]] predicts.
:::
:::

::: exercise Extrapolating a trend {level=2 check="21"}
How many months does it take a $50\%$ horizon growing with a doubling time of $7$ months to grow from $15$ minutes to $2$ hours?
::: solution
The factor is $8$, so $7\log_28 = 21$ months.
:::
:::

::: exercise Is the best elicitation biased? {level=2}
An evaluator tries $10$ elicitation methods and reports the best success rate as the model's capability. In [[evaluation/evaluation-principles#prop-winners-curse]], selecting the best of several noisy scores was a source of bias. Is it a problem here? Distinguish the case where the evaluation is used to *rule in* a capability ("the model can do this") from the case where it is used to *rule out* one ("the model is below the threshold").
::: solution
The best of $10$ noisy estimates overstates the success rate of the chosen method, by about $1.54$ standard errors if all methods were equal. For **ruling out** a capability this bias is conservative: the reported capability is if anything too high, so a result below the threshold is robust to it. For **ruling in** — claiming the model reaches a level — it is optimistic, and the selected method should be re-run on fresh attempts or tasks to obtain an unbiased estimate, exactly as in the earlier chapter. Since capability is defined as a supremum over methods, selecting the best is the right *estimand*; only its estimate needs correcting.
:::
:::

::: exercise Designing a sandbagging check {level=2}
You evaluate a model on a private set of tasks in a sensitive domain and also on a set of matched tasks in a neutral domain that require similar skills (for example, the same kinds of software reasoning). Describe two comparisons that could reveal selective underperformance, and say what result would be suspicious.
::: solution
(1) **Cross-domain consistency**: across a series of models of increasing general capability, scores on the neutral and sensitive sets should rise together; a model whose sensitive-domain score falls well below the trend predicted from its neutral-domain score (and from its predecessors) is suspicious. (2) **Elicitation response**: fine-tune the model briefly on a small number of solved tasks from the sensitive domain (or from a held-out part of it); a large jump after very little training — much larger than the same procedure produces on the neutral set — suggests that the capability was present but not expressed, as with the password-locked models of Greenblatt et al. (2024). Paraphrasing tasks to look less like evaluations, and comparing performance, is a third check aimed at evaluation awareness.
:::
:::

::: exercise Attempts that are not independent {level=3}
In [[#prop-rule-of-three]] attempts were independent. Suppose an evaluation runs $5$ attempts on each of $100$ tasks, the model fails all $500$, and success on a task is strongly correlated across attempts (on each task the model either nearly always or nearly never succeeds). (a) Which number, $100$ or $500$, is the better effective sample size for a bound on the fraction of tasks the model can solve? (b) Give the corresponding $95\%$ bound. (c) Which bound is relevant for an actor who will try one particular task many times?
::: solution
(a) If attempts on the same task are almost perfectly correlated, the five attempts carry little more information than one, so the effective sample is about $100$ tasks. (b) The fraction of solvable tasks is bounded by $1 - 0.05^{1/100} = 0.0295$, about $3\%$, rather than $0.6\%$. (c) For an actor focused on one task, what matters is the per-attempt success on *that* task, and the data say little about tasks outside the suite; within the suite, the five attempts per task bound each task's per-attempt rate only weakly ($1 - 0.05^{1/5} = 45\%$ per task). This is the clustering problem of [[evaluation/evaluation-statistics]]: the unit of independent evidence is the task, not the attempt.
:::
:::

::: exercise A horizon fit by hand {level=3}
Show that if all tasks in a suite have the same human time, the slope $b$ of [[#def-horizon]] is not identified, and explain why task suites for horizon measurement must span a wide range of times. Then, using the listing of [[#sec-horizon]], refit with only the tasks shorter than $60$ minutes and report what happens to the estimated $50\%$ horizon and its interval.
::: solution
With a single value $x$, the model predicts the same probability $\sigma(a + bx)$ for every task; any pair $(a, b)$ with the same $a + bx$ fits equally well, so $b$ — and hence any horizon other than at that time — is not identified. A wide spread of $x$ is what lets the fit separate the level from the slope, and horizons outside the range of the tasks are extrapolations. Restricting the listing's suite:

```python
short = [(x, y) for x, y in tasks if x < math.log2(60)]
a2, b2 = fit(short)
boot2 = sorted(horizon(*fit([short[rng.randrange(len(short))] for _ in short]), 0.5)
               for _ in range(500))
print(f"{len(short)} tasks: 50% horizon {horizon(a2, b2, 0.5):.1f} min, "
      f"95% interval [{boot2[12]:.1f}, {boot2[487]:.1f}]")
```

```text
100 tasks: 50% horizon 36.4 min, 95% interval [23.9, 71.2]
```

The point estimate falls from $48$ to $36$ minutes and the interval widens to $[24, 71]$ minutes, a factor of three: with no tasks longer than an hour, a horizon near an hour sits at the edge of the data and is pinned down by the few tasks close to it, while the slope is estimated from short tasks the agent almost always solves. Long tasks are the most expensive part of such a suite and the most necessary.
:::
:::
