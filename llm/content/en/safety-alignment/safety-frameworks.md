The earlier chapters of this course describe techniques: reward modelling and its failures, robustness and its measurement, oversight, evaluations of deceptive behaviour, monitoring and control. A developer deciding whether to train or release a model needs something else as well: a policy that says **which risks it is managing, how it will know when they become serious, what it will do then, and who decides**. Since 2023 the leading developers of frontier models have published such policies — Anthropic's Responsible Scaling Policy, OpenAI's Preparedness Framework, Google DeepMind's Frontier Safety Framework and others — and governments have built institutions to test models and to report on the science of their risks.

This chapter compares those published frameworks structurally, by four elements they share: **capability thresholds**, **evaluations**, **mitigations** and **governance**. It does not rank them, and since they are revised often, every description is dated; readers should consult the current versions. It covers third-party evaluation and the International AI Safety Report, and sets out the main criticisms from several directions. The quantitative content is the arithmetic of evaluation intervals, safety buffers and evaluation sample sizes — the numbers that decide whether a threshold policy can work as written. Laws and regulators — the EU AI Act, national frameworks, standards — are treated in [[llm-society/governance-regulation]] and only linked here.

## What a frontier safety framework is {#sec-what}

::: definition Frontier safety framework {#def-framework}
A **frontier safety framework** (also called a responsible scaling policy or preparedness framework) is a document published by an AI developer that specifies (1) the **risk domains** it covers; (2) **capability thresholds** in those domains at which existing safeguards would no longer keep risk acceptable; (3) the **evaluations** used to determine whether a model approaches or crosses a threshold, and when they are run; (4) the **mitigations** — deployment safeguards and security of model weights — required at each threshold, and what happens if they cannot be put in place; and (5) the **governance** — who makes the determinations, how decisions are reviewed and documented, and how the framework itself is changed.
:::

The central idea is the **if–then commitment** (Karnofsky, 2024, "If-then commitments for AI risk reduction"): *if* a model has a specified dangerous capability, *then* specified protective measures must be in place before it is developed further or deployed. If–then commitments respond to the disagreement about risk described in [[safety-alignment/alignment-problem#sec-views]]: people who disagree about *whether* models will reach a dangerous capability can agree on what to do *if* they do, and on how to check. A framework is only as good as its thresholds (are they the right ones?), its evaluations (would they detect crossing a threshold in time?), its mitigations (do they work?) and its governance (would the commitments be kept under commercial pressure?).

## The published frameworks {#sec-published}

The following summaries describe the documents as published at the dates given; all have been revised since their first versions, and may have been revised again after this lesson was written (as of 2026).

**Anthropic, Responsible Scaling Policy** (first version September 2023; substantially revised in October 2024, with later updates). It defines **AI Safety Levels** (ASLs), modelled on biosafety levels, each a set of required safeguards. The 2024 version specified **capability thresholds** — for chemical, biological, radiological and nuclear (CBRN) weapons uplift and for autonomous AI research and development — whose crossing requires the **ASL-3** (or higher) deployment and security standards. It distinguishes preliminary assessments from comprehensive ones, requires a **capability report** and **safeguards report**, and assigns a Responsible Scaling Officer. In May 2025 Anthropic stated that it had activated ASL-3 protections for Claude Opus 4 as a precaution, because it could not rule out that the model had crossed the CBRN threshold.

**OpenAI, Preparedness Framework** (beta December 2023; version 2 April 2025). The 2023 version tracked four categories — cybersecurity, CBRN, persuasion and model autonomy — each scored low, medium, high or critical, and allowed deployment only of models whose *post-mitigation* risk was medium or below, and further development only of models at high or below. Version 2 narrowed the **tracked categories** to biological and chemical capability, cybersecurity and AI self-improvement, defined **High** and **Critical** capability thresholds, added **research categories** (such as long-range autonomy, sandbagging, autonomous replication and undermining safeguards) under study but not yet tied to commitments, removed persuasion as a tracked category, and described Capabilities Reports and Safeguards Reports reviewed by an internal Safety Advisory Group.

**Google DeepMind, Frontier Safety Framework** (May 2024; version 2 February 2025; version 3 September 2025). It defines **Critical Capability Levels** (CCLs) in domains including CBRN, cybersecurity, machine-learning research and development, and — in later versions — harmful manipulation, with **early-warning evaluations** designed to signal approach to a CCL. Version 1 committed to evaluating at every sixfold increase in effective compute and every three months of fine-tuning progress. Later versions paired CCLs with recommended **security levels** for model weights and discussed **deceptive alignment** and risks from models undermining human control, including instrumental reasoning that could lead to resisting shutdown.

**Other developers.** At the AI Seoul Summit in May 2024, sixteen companies signed the Frontier AI Safety Commitments, promising to publish safety frameworks setting out thresholds and mitigations; by the Paris AI Action Summit in February 2025 many had done so, including Meta (Frontier AI Framework), Microsoft (Frontier Governance Framework) and Amazon, with others such as xAI publishing later in 2025. The frameworks vary in scope, specificity and the domains they cover. METR, an evaluation organisation, published analyses of their **common elements** (2024, updated 2025).

::: example Comparing frameworks structurally {#ex-compare}
Using the descriptions above, fill in a comparison by the four elements of [[#def-framework]] for the three frameworks, and identify one structural difference in each element.
::: solution
| element | Anthropic RSP (2024–25) | OpenAI Preparedness (v2, 2025) | Google DeepMind FSF (v2–3, 2025) |
|---|---|---|---|
| thresholds | capability thresholds (CBRN, autonomous AI R&D) mapped to ASL standards | High and Critical thresholds in three tracked categories, plus research categories | Critical Capability Levels in several domains, including harmful manipulation (v3) |
| evaluations | preliminary and comprehensive assessments; capability report | capability evaluations and Capabilities Reports | early-warning evaluations at compute and fine-tuning intervals |
| mitigations | ASL deployment and security standards; safeguards report | safeguards sufficient to minimise risk; Safeguards Reports | deployment mitigations and recommended security levels per CCL |
| governance | Responsible Scaling Officer; board and oversight reporting | Safety Advisory Group review; leadership decision | internal safety council review; external consultation in some cases |

Differences: in **thresholds**, OpenAI separates tracked categories carrying commitments from research categories that do not, while Anthropic ties thresholds directly to safeguard levels; in **evaluations**, DeepMind's first version specified evaluation frequency by compute growth explicitly; in **mitigations**, DeepMind and Anthropic both pair thresholds with weight-security levels, a less prominent element in some other frameworks; in **governance**, the named decision-makers and the role of boards differ. Such tables date quickly, and the exact wording of each current document is what binds.
:::
:::

## Capability thresholds and safety buffers {#sec-thresholds}

A threshold is useful only if the developer learns that a model is approaching it *before* the model has crossed it. Two things stand in the way. Capabilities **grow between evaluations**, because evaluations happen at intervals during training; and evaluations **underestimate** capabilities, because better prompting, tools, fine-tuning or scaffolding developed after the evaluation can elicit more ([[safety-alignment/deception-misalignment#ex-elicit]]). Frameworks therefore define **warning** levels below the threshold, a margin often called a safety buffer.

::: proposition Choosing a warning threshold {#prop-buffer}
Let $C$ be a model's true capability on some scale, measured by an evaluation as $\hat C$ with $C - \hat C\le g$ (the **elicitation gap**), and suppose that between consecutive evaluations capability rises by at most $\delta$. If stronger safeguards are triggered when $\hat C\ge W$, then the true capability of any model trained or deployed without them stays below a threshold $T$ provided
$$
W\le T - g - \delta.
$$ {#eq-buffer}
If capability rises by $k$ points per doubling of effective compute and evaluations are run at every factor-$m$ increase, then $\delta = k\log_2 m$.
:::

::: proof
Consider the last evaluation before safeguards are triggered: $\hat C < W$, so $C < W + g$. Until the next evaluation capability increases by at most $\delta$, so $C < W + g + \delta\le T$ by [[#eq-buffer]]. Between evaluations the safeguards are not yet required, and capability throughout that period is below $T$. If capability is $k\log_2(\text{compute})$ plus a constant, a factor-$m$ increase in compute adds $k\log_2 m$.
:::

::: example Setting a buffer {#ex-buffer}
A capability score rises by about $4$ points per doubling of effective compute. The threshold is $T = 70$, the elicitation gap is estimated at $5$ points, and evaluations are run at every fourfold increase in effective compute. Where must the warning threshold be? What if evaluations were run at every sixfold increase?
::: solution
$\delta = 4\log_24 = 8$, so $W\le70 - 5 - 8 = 57$ by [[#prop-buffer]] (and [[#sec-code]]). At sixfold intervals, $\delta = 4\log_26 = 10.3$ and $W\le54.7$. A framework can trade evaluation frequency against the size of the buffer, but it cannot avoid making both explicit. Anthropic's first RSP, for instance, described evaluating at every fourfold increase in effective compute with a larger safety margin built into its warning evaluations, and Google DeepMind's first framework specified sixfold intervals. The hard number in practice is $g$: elicitation keeps improving after release, which is why several frameworks require evaluators to make serious elicitation efforts, including fine-tuning, and why evaluating released models again is common.
:::
:::

::: widget plot
f: k*x; 70; 70 - g; 70 - g - k*log(m)/log(2)
x: 0, 20
y: 0, 100
sliders: k=4:1:8:0.5; g=5:0:15:0.5; m=4:2:10:0.5
labels: capability against doublings of effective compute; threshold $T$; $T - g$; warning level $W = T - g - k\log_2 m$
caption: A capability trend of $k$ points per doubling of effective compute, the threshold $T = 70$, and the warning level of [[#prop-buffer]] for elicitation gap $g$ and evaluations at every factor-$m$ increase in compute. At the defaults ($k = 4$, $g = 5$, $m = 4$) the warning level is $57$, reached about $3.2$ doublings before the threshold. Faster capability growth or a larger elicitation gap pushes the warning level down; more frequent evaluation (smaller $m$) pushes it up. Real capability trends are noisy and can jump, which these straight lines do not show.
:::

## Evaluations {#sec-evaluations}

Frameworks rely on **dangerous-capability evaluations** — question sets, task suites, agentic challenges, expert red teaming and **uplift studies** in which people with and without model access attempt a task in a domain ([[evaluation/capability-evaluations]]). Their design raises the issues of the rest of this course: elicitation ([[safety-alignment/deception-misalignment#sec-detection]]), contamination, the validity of proxies for real-world harm, and the precision of measured rates.

::: proposition Sample size for a threshold test {#prop-sample}
To test $H_0\colon p\le p_0$ against the alternative $p = p_1 > p_0$ for a success rate $p$ with a one-sided level-$\alpha$ test and power $1 - \beta$, the normal approximation requires about
$$
n = \left(\frac{z_{1-\alpha}\sqrt{p_0(1 - p_0)} + z_{1-\beta}\sqrt{p_1(1 - p_1)}}{p_1 - p_0}\right)^2
$$ {#eq-sample}
independent tasks, where $z_q$ is the standard normal $q$-quantile.
:::

::: proof
The test rejects when $\hat p > p_0 + z_{1-\alpha}\sqrt{p_0(1 - p_0)/n}$, which has level $\alpha$ under $p = p_0$ by the normal approximation. Under $p = p_1$, $\hat p\approx\Normal(p_1, p_1(1 - p_1)/n)$, and the rejection probability is at least $1 - \beta$ when the critical value lies at least $z_{1-\beta}\sqrt{p_1(1 - p_1)/n}$ below $p_1$: $p_0 + z_{1-\alpha}\sqrt{p_0(1 - p_0)/n}\le p_1 - z_{1-\beta}\sqrt{p_1(1 - p_1)/n}$. Multiplying by $\sqrt n$ and solving for $n$ gives [[#eq-sample]].
:::

::: example Is the evaluation big enough? {#ex-sample}
A framework treats a success rate above $20\%$ on an agentic task suite as a warning sign. How many independent tasks are needed to detect a true rate of $30\%$ with $80\%$ power at the $5\%$ level? And a true rate of $25\%$?
::: solution
With $z_{0.95} = 1.645$ and $z_{0.8} = 0.842$: for $p_1 = 0.3$, $n = \big((1.645\cdot0.4 + 0.842\cdot0.458)/0.1\big)^2 = 10.44^2 = 109$; for $p_1 = 0.25$, $n = 419$ ([[#sec-code]]). Agentic suites often contain tens of tasks, each expensive to build, and several runs per task do not substitute for more tasks when difficulties differ ([[agents/agent-security#prop-variance]]). A suite of $30$ tasks cannot reliably distinguish $20\%$ from $30\%$; its result should be reported with an interval, and the framework's decision rule should say how such uncertainty is resolved — for example, by treating an inconclusive result as crossing the threshold.
:::
:::

Evaluations are increasingly complemented by **threat modelling**: decomposing a harm into the steps an actor would need, and asking at which steps a model gives meaningful **uplift** over existing resources such as search engines and textbooks.

::: example A threat-model chain {#ex-chain}
A risk analysis estimates, for a hypothetical harm scenario over one year, the probability that a relevant actor attempts it ($0.5$), that the model gives meaningful uplift beyond existing resources ($0.2$), that safeguards fail to stop it ($0.1$) and that the attempt succeeds given uplift ($0.05$). (a) What is the estimated probability of the harm? (b) Which factor can the developer change, and by how much does halving it change the result? (c) What is the weakness of such a calculation?
::: solution
(a) $0.5\cdot0.2\cdot0.1\cdot0.05 = 5\times10^{-4}$ ([[#sec-code]]). (b) The developer controls uplift (through capabilities, unlearning and refusal) and safeguards; halving either halves the result, since the chain is a product. (c) Every factor is uncertain, often by an order of magnitude or more, and the factors are not independent — an actor capable enough to attempt the harm may also be better at circumventing safeguards. Such chains are useful for structuring argument and finding where evidence is weakest, less so as point estimates; risk analyses typically report ranges and the sources of each factor.
:::
:::

## Mitigations and governance {#sec-mitigations}

Frameworks group mitigations into two kinds.

- **Deployment safeguards** reduce misuse and harmful behaviour by a deployed model: classifiers on inputs and outputs, refusal training, monitoring of usage and accounts, rate limits, staged access for higher-risk capabilities, and incident response ([[safety-alignment/robustness-jailbreaks]], [[safety-alignment/monitoring-control]]). A safeguards case argues, with red-teaming evidence, that the safeguards keep risk acceptable against defined threat actors.
- **Security** protects the model weights and related assets against theft: access controls, insider-risk programmes, hardened infrastructure and, at higher levels, protection against well-resourced state attackers. A RAND study (Nevo et al., 2024, "Securing AI model weights") defined security levels from opportunistic attackers to top state actors and estimated what each would require. Security matters because a stolen model has none of its developer's deployment safeguards.

For risks from the model itself rather than its users, later framework versions added **alignment and control** measures — monitoring of internal deployments, evaluations of deceptive behaviour, and in some cases commitments to develop control-style safety cases as capabilities rise ([[safety-alignment/deception-misalignment]], [[safety-alignment/monitoring-control]]).

**Governance** answers who decides. Frameworks name internal roles and bodies (a responsible scaling officer, an advisory group, a safety council), require written reports that record the evidence for determinations, describe escalation to leadership and boards, and set procedures for amending the framework. Some include commitments to share information with governments, to seek external review, or to pause if required safeguards cannot be implemented.

## Third-party evaluation and international science {#sec-third-party}

Developers' own evaluations raise an obvious concern: the organisation deciding whether a model is safe to release is the one that wants to release it. Three kinds of external check have developed.

- **Government institutes.** The UK AI Safety Institute was founded in November 2023 (renamed the AI Security Institute in February 2025), and the US AI Safety Institute at NIST in 2023–24 (reorganised as the Center for AI Standards and Innovation in June 2025); other countries founded similar bodies and formed an international network. The UK and US institutes jointly carried out pre-deployment testing of at least two frontier models in late 2024 and published summaries, and they develop evaluation tools and research.
- **Independent evaluators.** Non-profit and commercial organisations such as METR and Apollo Research evaluate models before release under agreements with developers, and their findings are summarised in developers' system cards. Their access — time, model versions, fine-tuning rights, information about safeguards — limits what they can conclude, and they have often stated those limits.
- **Researchers.** Academic and independent researchers evaluate released models; proposals for legal and contractual **safe harbours** aim to protect good-faith research that would otherwise breach terms of service (Longpre et al., 2024).

The **International AI Safety Report**, commissioned at the Bletchley Park summit of November 2023 and chaired by Yoshua Bengio, is the main attempt at a shared scientific assessment. An interim report appeared in May 2024 and the first full report in January 2025, written by $96$ experts with an advisory panel nominated by $30$ countries, the European Union, the OECD and the United Nations; shorter **key updates** followed later in 2025. It organises risks of general-purpose AI into **malicious use** (for example cyber attacks, manipulation, and biological and chemical threats), **malfunctions** (reliability failures, bias, and loss of control) and **systemic risks** (labour-market effects, concentration, environmental and privacy effects). It describes the evidence for each, marks where experts disagree — notably on loss of control and on how fast capabilities will advance — and frames the central policy difficulty as an **evidence dilemma**: waiting for strong evidence may mean acting too late, while acting early on weak evidence may mean acting on risks that do not materialise. It does not make policy recommendations.

Legislation increasingly refers to these structures. The EU's General-Purpose AI Code of Practice (July 2025) includes a Safety and Security chapter for models with systemic risk that resembles a frontier safety framework, and California's SB 53 (signed September 2025) requires large frontier developers to publish frameworks of this kind; both are described, with the rest of the legal landscape, in [[llm-society/governance-regulation]].

## Debates {#sec-debates}

The frameworks are criticised from several directions, often by people who agree they are better than nothing.

- **Voluntary and revisable.** Critics note that developers write, interpret and amend their own frameworks, sometimes loosening commitments in later versions, and that nothing outside the company enforces them; some argue that frameworks should be replaced or backed by regulation with independent audits. Developers reply that frameworks must change as understanding improves, and that publishing changes makes them accountable.
- **Vague thresholds.** Thresholds are often defined qualitatively ("significant uplift to … actors"), leaving room for judgement at the moment of decision; analyses by external groups have rated frameworks on how specific and measurable their thresholds are. Others respond that capabilities of concern are not yet well measured, so false precision would be worse.
- **Competitive pressure.** Commitments to pause or delay are only credible if a developer would keep them when competitors do not; some frameworks explicitly allow adjusting commitments if others proceed without similar safeguards, which critics read as weakening them and defenders as realism.
- **Too cautious, or the wrong risks.** From another side, critics argue that catastrophic-risk framing favours a few large developers, raises barriers to open-weight releases and to competition, and diverts attention from present harms ([[llm-society/open-closed-models]]); proponents of open models argue that openness improves security research and distributes power.
- **Measurement limits.** Researchers on all sides note that dangerous-capability evaluations are young, that elicitation gaps are hard to bound, and that uplift studies are expensive and small — so that decisions rest on evidence that would not satisfy the standards of the rest of this course.

A neutral summary as of 2026: frameworks have made developers' risk reasoning more visible and created a vocabulary (thresholds, safeguards, safety cases) shared with governments; whether they constrain decisions under pressure is not yet established by experience.

## The code {#sec-code}

```python
import math
from statistics import NormalDist
Z = NormalDist().inv_cdf

# --- 1. Where to put a warning threshold ---------------------------------------
# Capability score rises by k points per doubling of effective compute (an empirical trend, assumed).
k = 4.0                 # points per doubling
T = 70.0                # capability threshold that requires stronger safeguards
gap = 5.0               # elicitation gap: post-release methods may add up to this many points
interval = 4.0          # evaluate at every 4x increase in effective compute = 2 doublings
delta = k * math.log2(interval)
W = T - gap - delta
print(f"growth between evaluations {delta:.1f} points -> warning threshold W = {W:.1f}")

# --- 2. How many tasks does an evaluation need? -------------------------------
def n_needed(p0, p1, alpha=0.05, power=0.8):
    """One-sided test of H0: rate <= p0 against rate = p1 (normal approximation)."""
    za, zb = Z(1 - alpha), Z(power)
    num = za * math.sqrt(p0 * (1 - p0)) + zb * math.sqrt(p1 * (1 - p1))
    return math.ceil((num / (p1 - p0)) ** 2)
for p0, p1 in ((0.20, 0.30), (0.20, 0.25), (0.05, 0.10)):
    print(f"detect {p1:.0%} vs {p0:.0%}: {n_needed(p0, p1)} tasks")

# --- 3. A threat-model chain ----------------------------------------------------
steps = {"actor attempts in a year": 0.5, "model gives meaningful uplift": 0.2,
         "safeguards fail to stop it": 0.1, "attempt succeeds given uplift": 0.05}
p = 1.0
for name, q in steps.items():
    p *= q
    print(f"{name:32s} {q:5.2f}   cumulative {p:.5f}")
```

Output:

```
growth between evaluations 8.0 points -> warning threshold W = 57.0
detect 30% vs 20%: 109 tasks
detect 25% vs 20%: 419 tasks
detect 10% vs 5%: 150 tasks
actor attempts in a year          0.50   cumulative 0.50000
model gives meaningful uplift     0.20   cumulative 0.10000
safeguards fail to stop it        0.10   cumulative 0.01000
attempt succeeds given uplift     0.05   cumulative 0.00050
```

::: widget plot
f: ((1.645*sqrt(a*(1 - a)) + 0.8416*sqrt(x*(1 - x)))/(x - a))^2
x: 0.05, 0.6
y: 0, 1000
sliders: a=0.2:0.01:0.5:0.01
labels: tasks needed to detect true rate $p_1$ against threshold $p_0 = a$
vlines: 0.3
caption: The number of independent tasks needed by [[#prop-sample]] to detect a true success rate $p_1$ (horizontal axis) above a threshold rate $p_0 = a$, with a one-sided $5\%$ test and $80\%$ power. At $a = 0.2$, detecting $30\%$ needs $109$ tasks (vertical line) and $25\%$ needs $419$; the requirement explodes as $p_1$ approaches the threshold. The curve is meaningful only for $p_1 > a$.
:::

::: warning A framework is not a safety guarantee
A published framework says what a developer intends to measure and do. Its protective value depends on evaluations detecting capabilities in time ([[#prop-buffer]]), on sample sizes adequate to the decision ([[#prop-sample]]), on mitigations that work against the relevant threat actors, and on governance that keeps commitments under pressure. Reading a framework critically means asking, for each threshold: how would we know, how soon, how confidently, and who would decide?
:::

::: quiz
A framework requires stronger safeguards when a model scores above $50\%$ on a dangerous-capability suite of $20$ tasks. A new model scores $45\%$ ($9$ of $20$). Which statement is most accurate?
- [ ] The model is below the threshold, so stronger safeguards are not needed.
- [x] The result is inconclusive: a $95\%$ interval for the true rate runs from about $23\%$ to $68\%$, and elicitation may add more, so the decision depends on how the framework treats uncertainty and buffers.
- [ ] The model must be above the threshold, since evaluations always underestimate.
- [ ] Twenty tasks are enough because the tasks are hard.
::: solution
With $9/20$, the Clopper–Pearson interval is about $[0.23, 0.68]$, which contains $50\%$. Add an elicitation gap and growth before the next evaluation ([[#prop-buffer]]) and the score says little on its own; a framework should define warning levels and how inconclusive results are handled ([[#ex-sample]]).
:::
:::

::: history
Anthropic published the first Responsible Scaling Policy in September 2023, building on proposals by METR (then ARC Evals) for responsible scaling; OpenAI released its Preparedness Framework in beta in December 2023, and Google DeepMind its Frontier Safety Framework in May 2024. The UK hosted the first AI Safety Summit at Bletchley Park in November 2023, where the UK AI Safety Institute was launched and the International AI Safety Report commissioned; the US AI Safety Institute followed. At the Seoul summit in May 2024, sixteen companies signed the Frontier AI Safety Commitments. Karnofsky (2024) articulated if–then commitments, Nevo et al. (2024) security levels for model weights, and Clymer et al. (2024) safety cases. In 2025 the International AI Safety Report was published (January), several more companies released frameworks before the Paris summit (February), OpenAI and Google DeepMind revised theirs, Anthropic activated ASL-3 protections (May), the EU's General-Purpose AI Code of Practice was published (July) and California enacted SB 53 (September).
:::

::: summary
- A frontier safety framework states risk domains, capability thresholds, evaluations, mitigations and governance; its core is the if–then commitment.
- Published examples (Anthropic RSP, OpenAI Preparedness Framework, Google DeepMind FSF, and others since the Seoul commitments) share this structure but differ in categories, thresholds, evaluation schedules and decision-makers; all are revised often, so date every claim.
- A warning threshold must sit below the real threshold by the elicitation gap plus growth between evaluations: $W\le T - g - k\log_2 m$ ([[#prop-buffer]]).
- Evaluations need enough tasks to decide: detecting $30\%$ against $20\%$ takes about $110$ tasks at $80\%$ power ([[#prop-sample]]); small suites give inconclusive results that frameworks must plan for.
- Mitigations are deployment safeguards and weight security, joined in later versions by alignment and control measures; governance names who decides and how frameworks change.
- External checks come from government institutes, independent evaluators and researchers; the International AI Safety Report (Bengio et al., 2025) summarises the science and its disagreements without recommending policy.
- Criticism comes from those who want binding regulation and precise thresholds and from those who think catastrophic-risk framing is misplaced or anticompetitive; whether frameworks bind under pressure is not yet known.
:::

## Exercises

::: exercise Growth between evaluations {level=1 check="12"}
Capability rises by $4$ points per doubling of effective compute and evaluations are run at every eightfold increase. How many points can capability rise between evaluations?
::: solution
$\delta = 4\log_28 = 4\cdot3 = 12$ ([[#prop-buffer]]).
:::
:::

::: exercise A warning threshold {level=1 check="53"}
With threshold $T = 75$, elicitation gap $g = 10$ and $\delta = 12$, what is the highest permissible warning threshold?
::: solution
$W = T - g - \delta = 75 - 10 - 12 = 53$.
:::
:::

::: exercise A threat-model chain {level=1 check="0.00025"}
In [[#ex-chain]], better safeguards halve the probability that they fail. What is the new estimated probability of harm?
::: solution
$0.5\cdot0.2\cdot0.05\cdot0.05 = 2.5\times10^{-4}$.
:::
:::

::: exercise Sample size {level=2 check="150"}
Using [[#prop-sample]] with a one-sided $5\%$ test and $80\%$ power, how many tasks are needed to detect a true rate of $10\%$ against a threshold of $5\%$?
::: solution
$\big((1.645\sqrt{0.05\cdot0.95} + 0.8416\sqrt{0.1\cdot0.9})/0.05\big)^2 = \big((0.3585 + 0.2525)/0.05\big)^2 = 12.22^2 = 149.3$, so $150$ tasks ([[#sec-code]]).
:::
:::

::: exercise Evaluation frequency {level=2 check="2.83"}
A framework wants growth between evaluations of at most $6$ points, with capability rising $4$ points per doubling. What is the largest factor $m$ of effective-compute increase allowed between evaluations? Give two decimal places.
::: solution
$4\log_2m\le6$ gives $\log_2m\le1.5$, so $m\le2^{1.5} = 2.83$.
:::
:::

::: exercise An inconclusive result {level=2}
A model scores $9/20$ on a suite whose threshold is $50\%$. Write a decision rule for the framework that handles this result, and justify it with the arithmetic of [[#prop-buffer]] and [[#prop-sample]].
::: solution
A defensible rule: "If the upper end of the one-sided $95\%$ confidence bound for the elicited success rate, plus the estimated elicitation gap, exceeds the warning level, then either (a) run a larger evaluation with enough tasks to decide, or (b) apply the safeguards required at the threshold." Here the one-sided upper bound for $9/20$ is about $0.65$, already above $0.5$ before any gap, so the result does not show the model is below the threshold. By [[#prop-sample]], distinguishing, say, $40\%$ from $50\%$ needs about $150$ tasks; the framework should either build such a suite or treat small-suite results conservatively. The rule makes the burden of proof explicit: uncertainty counts against deployment without safeguards.
:::
:::

::: exercise Reading a framework {level=2}
Choose one current published framework and answer, from its text only: for one threshold, (a) how the threshold is defined, (b) which evaluations would detect it and when they are run, (c) what mitigations it triggers, (d) who decides, and (e) what happens if the mitigations cannot be implemented. Identify the question the text answers least precisely.
::: solution
Answers depend on the framework and version chosen; a good answer quotes the document, dates it, and distinguishes commitments ("will") from descriptions of current practice or intentions ("may", "aim to"). Typically (a) and (c) are stated, (b) is described in general terms with details in separate reports, (d) names an internal body, and (e) — what happens if safeguards are not ready, especially if competitors proceed — is the least precise, which is the point critics emphasise ([[#sec-debates]]).
:::
:::

::: exercise Buffers with noisy evaluations {level=3}
Suppose the measured score is $\hat C = C - G + \varepsilon$, where the elicitation gap $G\in[0, g]$ and the measurement error $\varepsilon\sim\Normal(0, \sigma^2)$. Modify [[#prop-buffer]] so that, at the last evaluation before the trigger, the probability that true capability will exceed $T$ before the next evaluation is at most $\alpha$.
::: solution
At an evaluation with $\hat C < W$, the true capability satisfies $C = \hat C + G - \varepsilon < W + g - \varepsilon$. Capability before the next evaluation is at most $C + \delta < W + g + \delta - \varepsilon$. This exceeds $T$ only if $\varepsilon < W + g + \delta - T$; requiring $\Prob(\varepsilon < W + g + \delta - T)\le\alpha$ gives $W + g + \delta - T\le-z_{1-\alpha}\sigma$, that is $W\le T - g - \delta - z_{1-\alpha}\sigma$. Measurement noise adds a term proportional to the evaluation's standard error; with $\sigma$ the standard error of a success rate on $n$ tasks, $\sqrt{p(1 - p)/n}$, a $20$-task suite near $50\%$ has $\sigma = 0.11$, and the buffer must grow by $1.645\cdot0.11 = 0.18$ — eighteen percentage points — for $\alpha = 5\%$. Small evaluations force large buffers.
:::
:::

::: exercise Designing an if–then commitment {level=3}
Write an if–then commitment for a hypothetical risk of "an agent autonomously acquiring computing resources beyond those it was given", specifying threshold, evaluations, buffer, mitigations, governance, and what would count as evidence that the commitment is working. Keep it at the level of a policy, not a method for doing the task.
::: solution
*Threshold:* the model, with the best available scaffolding, completes at least half of a held-out suite of realistic sandboxed tasks in which acquiring additional resources without authorisation is possible and would help. *Evaluations:* run at every fourfold increase in effective compute and before each deployment, with fine-tuning-based elicitation; at least $150$ tasks so that $40\%$ and $50\%$ can be distinguished ([[#prop-sample]]); results reported with intervals. *Buffer:* a warning level set by [[#prop-buffer]], for example $25\%$ given estimated growth and elicitation gap. *Mitigations at the warning level:* least-privilege agent deployments with hard limits on credentials and spending, monitoring of resource-related actions with an audit budget sized as in [[safety-alignment/monitoring-control#sec-audit]], control evaluations of these measures, and enhanced weight security. *If the mitigations cannot be implemented:* no deployment in agentic settings with resource access, and no further scaling until they can. *Governance:* determinations documented in a report reviewed by a named internal body and shared with an external evaluator; changes to the commitment published with reasons. *Evidence it works:* red-team control evaluations showing high safety at acceptable usefulness, monitoring catching synthetic attempts, and no unexplained resource acquisition in deployment logs; and evidence it does not, such as an elicited score far above the pre-release evaluation.
:::
:::
