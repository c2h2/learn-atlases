A model that refuses a harmful request when asked plainly, but complies when the same request is wrapped in a story, translated, split into pieces or followed by a string of optimised tokens, is not safe; it is safe on the inputs its developers happened to test. **Jailbreaks** are inputs designed to make a model produce outputs its developers trained it to refuse. They are the language-model case of an older phenomenon, **adversarial examples**: inputs, often barely different from benign ones, that change a model's output in a way its designers did not intend.

This chapter treats robustness as a measurement and defence problem. It begins with adversarial examples in classifiers, where the mathematics is clean: the fast gradient sign method on a linear model, and a *proved* robustness certificate that turns out to be exactly tight. It then describes jailbreaks of language models by category and mechanism, at the level of published abstracts — the chapter contains no working attack prompts or strings, and none are needed to understand the defences. It covers the main defences — refusal training, adversarial training, input and output classifiers, representation-level methods such as circuit breakers, and constitutional classifiers — and why defence is structurally harder than attack. It ends with how to measure attack success rates honestly, with confidence intervals and adaptive attackers. Prompt injection, where the attacker is not the user but a third party whose content the model reads, is covered in [[agents/agent-security]] and only linked here.

## Adversarial examples {#sec-adversarial}

Szegedy et al. (ICLR 2014, "Intriguing properties of neural networks") found that image classifiers with excellent test accuracy could be made to misclassify an image by adding a perturbation too small for a person to notice, and that perturbations found for one network often fooled others. Goodfellow, Shlens and Szegedy (ICLR 2015) gave an explanation and a fast attack.

::: definition Adversarial example and robustness {#def-adversarial}
Let $f$ map inputs $\mathbf x\in\R^d$ to labels, and let $\norm{\cdot}$ be a norm on inputs. An **adversarial example** for $f$ at $\mathbf x$ with budget $\eps$ is an $\mathbf x' = \mathbf x + \boldsymbol\delta$ with $\norm{\boldsymbol\delta}\le\eps$ and $f(\mathbf x')\ne f(\mathbf x)$. The model is **robust at $\mathbf x$ with radius $\eps$** if no such $\mathbf x'$ exists. **Robust accuracy** at $\eps$ is the fraction of test points that are correctly classified *and* robust with radius $\eps$.
:::

The **fast gradient sign method** (FGSM) takes one step of size $\eps$ in the direction that increases the loss fastest under an $\ell_\infty$ budget:
$$
\mathbf x' = \mathbf x + \eps\,\sgn\big(\nabla_{\mathbf x}\mathcal L(\mathbf x, y)\big).
$$ {#eq-fgsm}
Goodfellow et al.'s **linearity hypothesis** explains why such a small step suffices. In a linear score $s(\mathbf x) = \mathbf w\cdot\mathbf x + b$, the step changes the score by $\eps\norm{\mathbf w}_1$, which grows with the dimension even when each coordinate moves by only $\eps$.

::: proposition FGSM is the worst case for a linear score {#prop-fgsm}
For $s(\mathbf x) = \mathbf w\cdot\mathbf x + b$,
$$
\max_{\norm{\boldsymbol\delta}_\infty\le\eps}\mathbf w\cdot\boldsymbol\delta = \eps\norm{\mathbf w}_1,
$$
attained at $\boldsymbol\delta = \eps\,\sgn(\mathbf w)$. If the $d$ weights have typical magnitude $m$, the change is about $\eps m d$: linear in $d$, while the perturbation's size per coordinate stays $\eps$.
:::

::: proof
For any $\boldsymbol\delta$ with $\abs{\delta_i}\le\eps$, $\mathbf w\cdot\boldsymbol\delta = \sum_i w_i\delta_i\le\sum_i\abs{w_i}\abs{\delta_i}\le\eps\sum_i\abs{w_i}$. Equality holds when $\delta_i = \eps\sgn(w_i)$ for every $i$ (any value with $\abs{\delta_i}\le\eps$ if $w_i = 0$). For logistic loss $\mathcal L = \log(1 + e^{-ys(\mathbf x)})$ the gradient is $\nabla_{\mathbf x}\mathcal L = -y\,\sigma(-ys)\,\mathbf w$, whose sign is $-y\,\sgn(\mathbf w)$, so FGSM [[#eq-fgsm]] moves exactly in the worst-case direction for the true label.
:::

The same computation gives a guarantee in the other direction.

::: theorem Certified radius of a linear classifier {#thm-certified}
Let $f(\mathbf x) = \sgn(\mathbf w\cdot\mathbf x + b)$ with $\mathbf w\ne\mathbf 0$, and let $p, q\in[1, \infty]$ satisfy $1/p + 1/q = 1$. If
$$
\norm{\boldsymbol\delta}_p < \frac{\abs{\mathbf w\cdot\mathbf x + b}}{\norm{\mathbf w}_q},
$$ {#eq-radius}
then $f(\mathbf x + \boldsymbol\delta) = f(\mathbf x)$. The bound is tight: there is a $\boldsymbol\delta$ with $\norm{\boldsymbol\delta}_p$ equal to the right-hand side that puts $\mathbf x + \boldsymbol\delta$ on the decision boundary. In particular the $\ell_\infty$ radius is $\abs{s(\mathbf x)}/\norm{\mathbf w}_1$ and the $\ell_2$ radius is $\abs{s(\mathbf x)}/\norm{\mathbf w}_2$.
:::

::: proof
By Hölder's inequality, $\abs{\mathbf w\cdot\boldsymbol\delta}\le\norm{\mathbf w}_q\norm{\boldsymbol\delta}_p < \abs{s(\mathbf x)}$. Hence $s(\mathbf x + \boldsymbol\delta) = s(\mathbf x) + \mathbf w\cdot\boldsymbol\delta$ cannot change sign or reach zero. For tightness, Hölder's inequality is attained: there is a vector $\mathbf u$ with $\norm{\mathbf u}_p = 1$ and $\mathbf w\cdot\mathbf u = \norm{\mathbf w}_q$ (for $p = \infty$ take $\mathbf u = \sgn(\mathbf w)$; for $p = 2$, $\mathbf u = \mathbf w/\norm{\mathbf w}_2$). Then $\boldsymbol\delta = -\sgn(s(\mathbf x))\,\frac{\abs{s(\mathbf x)}}{\norm{\mathbf w}_q}\mathbf u$ has the stated norm and $s(\mathbf x + \boldsymbol\delta) = 0$.
:::

For a linear model, then, the attack of [[#prop-fgsm]] and the certificate of [[#thm-certified]] meet exactly: robust accuracy can be computed, not just estimated. For deep networks they do not meet. Attacks give **upper bounds** on robust accuracy (a point that survives the attacks tried may still have an adversarial example nobody found), and certificates give **lower bounds**, through methods such as interval bound propagation or **randomised smoothing** (Cohen, Rosenfeld and Kolter, 2019), which certifies an $\ell_2$ radius for a classifier that votes over Gaussian-noised copies of its input. The gap between the two bounds is where most of the difficulty lies.

::: example A margin of $2$ in $100$ dimensions {#ex-margin}
A linear classifier on $d = 100$ features has weights of magnitude about $0.14$ each, so $\norm{\mathbf w}_1 = 14$ and $\norm{\mathbf w}_2 = 1.4$, and a test point has score $s = 2$. (a) What are its certified $\ell_\infty$ and $\ell_2$ radii? (b) An FGSM perturbation with $\eps = 0.15$ changes each feature by $0.15$, less than a sixth of the noise standard deviation. Does it flip the prediction?
::: solution
(a) By [[#thm-certified]], $r_\infty = 2/14 = 0.143$ and $r_2 = 2/1.4 = 1.43$. (b) The score changes by up to $\eps\norm{\mathbf w}_1 = 0.15\cdot14 = 2.1 > 2$, so yes. The perturbation has $\ell_2$ norm $0.15\sqrt{100} = 1.5$, just above $r_2$, consistent with the $\ell_2$ certificate: a perturbation that is tiny in every coordinate is not small in $\ell_2$ once there are many coordinates. The listing in [[#sec-code]] trains such a classifier: accuracy $0.81$ falls to $0.525$ at $\eps = 0.1$ and $0.095$ at $\eps = 0.3$, and the certified accuracy equals the accuracy under FGSM at every $\eps$.
:::
:::

The standard defence for classifiers is **adversarial training** (Madry et al., ICLR 2018): train on the worst-case perturbations found by an inner attack, solving
$$
\min_\theta\ \E_{(\mathbf x, y)}\Big[\max_{\norm{\boldsymbol\delta}\le\eps}\mathcal L\big(f_\theta(\mathbf x + \boldsymbol\delta), y\big)\Big].
$$ {#eq-minmax}
It is the most reliable empirical defence for image classifiers, at a cost in clean accuracy and compute, and its robustness holds for the threat model it was trained on — an $\ell_\infty$ ball of a given radius — and not reliably beyond it. Both lessons carry over to language models: robustness is defined relative to a threat model, and defending against one family of attacks says little about others.

## Jailbreaks {#sec-jailbreaks}

For language models the input space is discrete and the "label" is a whole behaviour, so robustness must be redefined.

::: definition Jailbreak and attack success rate {#def-jailbreak}
Fix a set $\mathcal B$ of **disallowed behaviours** (requests the developer's policy says the model should refuse) and a **judge** $J(b, \mathbf y)\in\{0, 1\}$ that decides whether response $\mathbf y$ actually exhibits behaviour $b$. A **jailbreak** for $b$ is an input $\mathbf x$, constructed by an attacker under some **threat model** (what they can change: the user turn only, the system prompt, the weights; how many queries; whether they see log-probabilities), such that $J(b, \mathbf y) = 1$ for the model's response $\mathbf y$. The **attack success rate** (ASR) of an attack on a model is the fraction of behaviours in a benchmark for which the attack produces a judged success, possibly within a budget of $k$ attempts per behaviour ("ASR at $k$").
:::

Two features distinguish this from classifier robustness. There is no small-perturbation constraint: any input the attacker can type is allowed, so robustness cannot be certified by a norm ball. And success is decided by a judge — usually a model — whose own errors enter the measurement ([[#sec-measuring]]).

### Why safety training fails

Wei, Haghtalab and Steinhardt (NeurIPS 2023, "Jailbroken: how does LLM safety training fail?") proposed two failure modes that organise most known attacks.

::: definition Competing objectives and mismatched generalisation {#def-failure-modes}
**Competing objectives**: a model is trained for several goals — follow instructions, be helpful, continue text plausibly, and refuse harmful requests — and an attack constructs a situation in which the other goals push against refusal, so that refusing would violate behaviours the model was also trained to show. **Mismatched generalisation**: a model's capabilities generalise to inputs that its safety training did not cover — formats, encodings, languages or contexts in which it can still understand and carry out a request, but in which refusal was never trained.
:::

Wei et al. showed that combinations of attacks built on both principles succeeded against the safety-trained models of the time on most of their curated harmful prompts, and argued that "safety-capability parity" — safety mechanisms as sophisticated as the model they protect — is needed, since a more capable model understands more of the inputs that safety training missed. Yong, Menghini and Bach (2023), for example, found that translating requests into low-resource languages raised attack success against a then-current model substantially, an instance of mismatched generalisation.

### Categories of attack

Published attacks fall into a handful of families. They are described here by mechanism only.

- **Human-crafted prompts.** Role-play and persona framings, hypothetical or fictional wrappers, and instructions that discourage refusal; most exploit competing objectives. Early community collections were studied systematically by Shen et al. (2024).
- **Obfuscation.** Encodings, ciphers, unusual formats or languages the model can decode but in which refusal was not trained — mismatched generalisation.
- **Many-shot jailbreaking** (Anil et al., 2024). A long context filled with fabricated dialogues in which an assistant complies, exploiting in-context learning; the authors found attack success grew as a power law in the number of examples, and that it became possible only with long context windows.
- **Optimisation-based attacks.** Greedy coordinate gradient (GCG; Zou et al., 2023) searches, using gradients through the token embeddings of open-weight models, for a suffix of tokens that raises the probability of the target model beginning an affirmative response; suffixes found on open models transferred, to a degree, to closed models. Such suffixes look like gibberish, which makes them detectable by perplexity filters (Jain et al., 2023; Alon and Kamfonas, 2023), and later methods searched for fluent alternatives.
- **Model-driven attacks.** An attacker model iteratively refines a prompt from the target's responses, as in PAIR (Chao et al., 2023) and its tree-search extension TAP (Mehrotra et al., 2023), typically within tens of queries; red-teaming models ([[safety-alignment/red-teaming]]) generalise the idea.
- **Random search and sampling.** Best-of-$N$ jailbreaking (Hughes et al., 2024) repeatedly applies random surface augmentations to a request and resamples, exploiting the model's stochasticity; success grew predictably with $N$.
- **Fine-tuning attacks.** With access to weights or a fine-tuning service, safety behaviour can be removed by brief further training: Qi et al. (2023) found that a few harmful examples sufficed to undo much of a model's safety training through a commercial fine-tuning interface, and that even benign fine-tuning degraded it somewhat. For open-weight models this is the dominant threat model ([[llm-society/open-closed-models]]).

### The attacker's advantage

Defence is harder than attack for structural reasons that can be quantified.

::: proposition Attempts and attack families compound {#prop-compound}
(a) If each attempt of an attack independently succeeds with probability $p$, then the probability of at least one success in $k$ attempts is $1 - (1 - p)^k$. (b) If an attacker has access to $m$ attack families that succeed independently with probabilities $p_1, \dots, p_m$, the probability that at least one succeeds is $1 - \prod_i(1 - p_i)\ge\max_i p_i$: the defender's failure probability is governed by its *weakest* family, and is larger still.
:::

::: proof
(a) All $k$ attempts fail with probability $(1 - p)^k$ by independence; take the complement. (b) Likewise all families fail with probability $\prod_i(1 - p_i)$; and $\prod_i(1 - p_i)\le 1 - p_j$ for every $j$ since each factor is at most $1$.
:::

::: widget plot
f: 1 - (1 - p)^x; 1 - b/(b + x)
x: 1, 200
y: 0, 1
sliders: p=0.02:0.001:0.2:0.001; b=49:1:100:1
labels: same success probability $p$ on every behaviour; heterogeneous behaviours, Beta$(1, b)$
caption: Attack success rate at $k$ attempts against the number of attempts. Upper curve: every behaviour has the same per-attempt success probability $p$ ([[#prop-compound]]); at $p = 0.02$, $50$ attempts succeed $64\%$ of the time and $100$ attempts $87\%$. Lower curve: per-behaviour probabilities vary as a Beta$(1, b)$ distribution, whose mean $1/(1 + b)$ equals $0.02$ at the default $b = 49$ ([[#prop-heterogeneous]]); at $50$ attempts it reaches only $51\%$; some behaviours are nearly unbreakable, so the curve rises much more slowly. Real attack-scaling curves lie in between.
:::

Independence is an idealisation: attempts against the same behaviour are correlated, because some behaviours are much harder to elicit than others. Modelling the heterogeneity explains why attack success grows more slowly, and more like a power law, than (a) predicts.

::: proposition Heterogeneous behaviours {#prop-heterogeneous}
Suppose a behaviour's per-attempt success probability $P$ varies across behaviours with a Beta$(a, b)$ distribution, and attempts on a behaviour are independent given $P$. Then
$$
1 - \mathrm{ASR}@k = \E\big[(1 - P)^k\big] = \frac{\mathrm B(a, b + k)}{\mathrm B(a, b)} \sim \frac{\Gamma(a + b)}{\Gamma(b)}\,k^{-a}\quad(k\to\infty).
$$
For $a = 1$ this is exactly $b/(b + k)$. The fraction of behaviours not yet broken decays as a power of $k$, not exponentially.
:::

::: proof
$\E[(1 - P)^k] = \frac{1}{\mathrm B(a, b)}\int_0^1 p^{a - 1}(1 - p)^{b - 1 + k}\,dp = \frac{\mathrm B(a, b + k)}{\mathrm B(a, b)}$. Write $\mathrm B(a, b + k) = \Gamma(a)\Gamma(b + k)/\Gamma(a + b + k)$; since $\Gamma(b + k)/\Gamma(a + b + k)\sim k^{-a}$, the ratio is asymptotic to $\frac{\Gamma(a)\Gamma(a + b)}{\Gamma(a)\Gamma(b)}k^{-a}$. For $a = 1$, $\mathrm B(1, c) = 1/c$, giving $b/(b + k)$.
:::

::: example Fifty attempts {#ex-attempts}
An attack succeeds on a single attempt for $2\%$ of (behaviour, attempt) pairs on average. Estimate ASR at $50$ attempts (a) if every behaviour has $p = 0.02$, (b) if per-behaviour probabilities follow Beta$(1, 49)$, which has mean $0.02$.
::: solution
(a) $1 - 0.98^{50} = 1 - 0.364 = 0.636$. (b) $1 - 49/(49 + 50) = 1 - 0.495 = 0.505$. Both are far above the single-attempt $2\%$: a defence evaluated at one attempt per behaviour says little about an attacker who can retry. Reporting ASR as a function of attack budget — queries, compute, human time — is more informative than a single number.
:::
:::

A further asymmetry is **adaptivity**: the attacker moves second. A defence evaluated against attacks that existed when it was designed has been tested against an attacker who did not know about it. For image classifiers, Athalye, Carlini and Wagner (2018) circumvented seven of nine defences accepted at a major conference by adapting attacks to each, and Tramèr et al. (2020) did the same for thirteen more; the lesson became a norm that defences must be evaluated against **adaptive attacks** designed with full knowledge of the defence. Language-model defences have repeated the history: Andriushchenko, Croce and Flammarion (2024) reported near-complete success against several safety-trained models with simple attacks adapted to each model, and Nasr, Carlini and colleagues (2025, "The attacker moves second") reported bypassing a range of published jailbreak and prompt-injection defences with adaptive attacks, though most had reported near-zero attack success against fixed attacks.

::: warning A low ASR on a fixed benchmark is not robustness
A defence that blocks every attack in a published benchmark may simply have learned those attacks. The meaningful statements are of the form "attack success at most $x$ against attackers with this knowledge, this budget and this access", measured with attacks designed after the defence. A defence also has to be measured for what it costs: blocking everything gives an ASR of zero.
:::

## Defences {#sec-defences}

Defences act at four points: the model's weights, its internal representations, the inputs and outputs around it, and the system in which it is deployed.

**Refusal training.** Safety data in supervised fine-tuning and preference learning ([[post-training/rlhf]], [[post-training/ai-feedback]]) teaches models to refuse disallowed requests. It is the first line, and the one jailbreaks target: Wei et al.'s failure modes are failures of refusal training to generalise. Variants train models to reason explicitly about a written safety specification before answering (Guan et al., 2024, "deliberative alignment"), which was reported to improve robustness to known jailbreaks while reducing over-refusal.

**Adversarial training.** Generate attacks against the current model, and train it to refuse them — [[#eq-minmax]] with an attack generator in place of the inner maximisation. Mazeika et al. (2024) introduced HarmBench, a standardised evaluation, together with an adversarial-training method (R2D2) that trained against a continuously updated pool of optimisation-based attacks and reduced their success substantially. Because the input space is unbounded, robustness to the attack families seen in training transfers only partly to new ones. **Latent adversarial training** (Casper et al., 2024; Sheshadri et al., 2024) perturbs internal activations rather than inputs, aiming at robustness to attacks not anticipated in input space.

**Representation-level defences.** Circuit breakers (Zou et al., 2024, "Improving alignment and robustness with circuit breakers") use **representation rerouting**: during a short fine-tuning, internal representations that arise while generating harmful content are pushed towards unrelated directions, while representations on benign data are kept unchanged. The intent is to interrupt the harmful *process* whatever input triggered it, rather than to recognise harmful inputs. The authors reported large reductions in attack success across many attack families, including ones not used in training, with little loss of capability. Later independent evaluations reported that some adaptive attacks — including attacks that perturb input embeddings directly, a stronger threat model available only with white-box access — succeeded more often than the original evaluation suggested, an instance of the adaptivity point above.

**Input and output classifiers.** A separate classifier screens prompts, responses or both: examples include Llama Guard (Inan et al., 2023), a fine-tuned language model that labels conversations against a taxonomy of harms, and perplexity filters for gibberish suffixes. Output classifiers have one advantage over input filters: they judge what the model actually produced, so they are less affected by obfuscated inputs — although an attacker can also ask for obfuscated outputs. Constitutional classifiers (Sharma et al., Anthropic, 2025) train input and streaming output classifiers on large amounts of synthetic data generated from a natural-language **constitution** that lists permitted and restricted content in a domain (the published work focused on chemical, biological, radiological and nuclear weapons information). The streaming output classifier can halt a response mid-generation. Anthropic reported that in a bug-bounty programme on a prototype, $183$ participants spent over $3{,}000$ hours without finding a universal jailbreak (one that extracted answers to all ten target questions); that in automated evaluations jailbreak success fell from $86\%$ without classifiers to $4.4\%$ with them; and that an improved version increased refusals on production traffic by $0.38$ percentage points at a compute overhead of $23.7\%$. In a subsequent public challenge some participants did pass all levels. These are the developer's own results, and the defence is domain-specific by design.

**System-level measures.** Rate limits and query budgets (which bound $k$ in [[#prop-compound]]), account-level monitoring and enforcement, staged access for capabilities with higher misuse potential, and incident response ([[safety-alignment/monitoring-control]], [[safety-alignment/safety-frameworks]]). Removing hazardous knowledge from the model — **machine unlearning**, evaluated for example on the WMDP benchmark (Li et al., 2024) — aims to make jailbreaks pointless rather than harder, though whether unlearned knowledge can be recovered by fine-tuning is an active question.

::: example Layered defences and their correlation {#ex-layers}
Three layers — refusal training, an input classifier and an output classifier — face two kinds of attack in equal numbers. Ordinary attacks are missed independently with probabilities $0.1$, $0.2$ and $0.15$. Obfuscated attacks are missed by each layer with probability $0.5$, independently. (a) What is each layer's overall miss rate? (b) What fraction of all attacks gets through all three layers? (c) What would you predict by wrongly treating the layers as independent with their overall miss rates?
::: solution
(a) $0.5\cdot0.5 + 0.5\cdot0.1 = 0.3$, $0.5\cdot0.5 + 0.5\cdot0.2 = 0.35$ and $0.5\cdot0.5 + 0.5\cdot0.15 = 0.325$. (b) Ordinary attacks pass all three with probability $0.1\cdot0.2\cdot0.15 = 0.003$ and obfuscated ones with $0.5^3 = 0.125$, so overall $0.5\cdot0.003 + 0.5\cdot0.125 = 0.064$. (c) $0.3\cdot0.35\cdot0.325 = 0.034$, too optimistic by almost a factor of two. Within each kind of attack the layers are independent here, yet the mixture makes their failures positively correlated: the attacks one layer misses are disproportionately the ones the others miss. Layered defences help most when their failures are uncorrelated, which is why layers that inspect different things (weights, inputs, outputs, account behaviour) are worth more than several similar ones ([[agents/agent-security#prop-depth]]).
:::
:::

## Measuring robustness {#sec-measuring}

Robustness claims are statistical claims about attack success rates, and they inherit every problem of evaluation ([[evaluation/evaluation-principles]]) plus some of their own.

**What counts as success.** Early papers often counted any response that did not begin with a refusal phrase as a jailbreak. Souly et al. (2024, StrongREJECT) showed that this overstates success: many "jailbroken" responses are vague, wrong or useless, and some attacks degrade the model's capability so much that its compliance is harmless. They proposed grading responses for both willingness and quality. HarmBench (Mazeika et al., 2024) standardised behaviours, attacks and a fine-tuned judge so that results could be compared. Judges must be validated against human labels on the *attacked* distribution, since attacks may fool judges too.

**Over-refusal.** A defence must be scored on benign requests that superficially resemble harmful ones — XSTest (Röttger et al., 2024) and OR-Bench are examples — and on ordinary traffic. A refusal rate on benign prompts is reported with the ASR, as a pair.

**Uncertainty.** Benchmarks contain a few hundred behaviours, and small ASRs need exact intervals.

::: proposition The rule of three {#prop-rule-three}
If an attack succeeds on $0$ of $n$ independent trials, the exact one-sided $95\%$ upper confidence bound for its success probability is $1 - 0.05^{1/n}$, which is approximately $3/n$ for large $n$.
:::

::: proof
The upper bound is the largest $p$ that is not rejected at level $0.05$ by the observation of zero successes, that is, the $p$ with $\Prob(0\text{ successes}) = (1 - p)^n = 0.05$, giving $p = 1 - 0.05^{1/n}$. Since $0.05^{1/n} = e^{\ln(0.05)/n}$ and $\ln 0.05 = -2.996$, we get $1 - e^{-2.996/n}\approx2.996/n\approx3/n$ for large $n$.
:::

::: example Zero successes {#ex-zero}
A defended model shows $0$ successes in $100$ attack attempts. (a) Give a two-sided $95\%$ Clopper–Pearson interval and the one-sided rule-of-three bound. (b) How many attempts are needed to claim ASR below $0.5\%$ with $95\%$ confidence if none succeed? (c) With $3$ successes in $100$, what is the interval?
::: solution
(a) Two-sided: $[0, 1 - 0.025^{1/100}] = [0, 0.0362]$. One-sided: $1 - 0.05^{1/100} = 0.0295$, close to $3/100$. (b) $1 - 0.05^{1/n}\le0.005$ needs $n\ge\ln0.05/\ln0.995 = 597.6$, so $598$ attempts (the rule of three gives $600$). (c) Clopper–Pearson gives $[0.0062, 0.0852]$ ([[#sec-code]]). "Zero out of a hundred" is consistent with a true rate of $3\%$, which across millions of queries is a great many successes.
:::
:::

::: widget confidence
dist: bernoulli
n: 100
level: 0.95
intervals: 50
caption: Fifty simulated attack evaluations of $n$ attempts each, with a $95\%$ confidence interval from each. About $95\%$ of intervals cover the true attack success rate. With $100$ attempts, intervals are around $\pm10$ points wide for rates near one half; for rates near zero the normal-approximation intervals shown here become unreliable, which is why exact (Clopper–Pearson) or Wilson intervals and the rule of three ([[#prop-rule-three]]) are used for small ASRs.
:::

**Clustering.** Attempts against the same behaviour are correlated, so with several attempts per behaviour, standard errors should be clustered by behaviour ([[agents/agent-security#prop-variance]]). Comparisons between defences on the same behaviours should be paired.

::: algorithm Reporting a robustness evaluation {#alg-report}
1. State the **threat model**: access (black-box API, log-probabilities, weights, fine-tuning), budget (queries, compute, human hours), knowledge of the defence.
2. Fix **behaviours** from a documented source, the **judge** and its validation against human labels, and the success criterion (willingness and usefulness).
3. Run **fixed** attacks from the literature and **adaptive** attacks designed against this defence, by people who did not build it.
4. Report ASR with exact intervals per attack and as a function of budget, with standard errors clustered by behaviour; report the **worst** attack, not the average.
5. Report **costs**: over-refusal on benign and borderline prompts, capability benchmarks, latency and compute.
6. Release enough detail for replication without releasing working attacks against deployed systems ([[safety-alignment/red-teaming]] discusses disclosure).
:::

## The code {#sec-code}

The listing trains a logistic-regression classifier on synthetic data with $d = 100$ features, attacks it with FGSM, computes certified accuracy from [[#thm-certified]], and computes exact Clopper–Pearson intervals for attack success rates.

```python
import random, math

# --- 1. A linear classifier on synthetic data -------------------------------
rng = random.Random(3)
d, n = 100, 600
mu = [0.15 if i < 50 else 0.0 for i in range(d)]   # class means +mu / -mu: weak signal in many features
def sample(label):
    return [label * m + rng.gauss(0, 1) for m in mu], label
data = [sample(rng.choice((-1, 1))) for _ in range(n)]
train, test = data[:400], data[400:]

w, b, lr = [0.0] * d, 0.0, 0.05
for epoch in range(200):                          # logistic regression, full-batch gradient descent
    gw, gb = [0.0] * d, 0.0
    for x, y in train:
        m = y * (sum(wi * xi for wi, xi in zip(w, x)) + b)
        g = -y / (1 + math.exp(m))                # d/d(score) of log(1 + exp(-y*score))
        for i in range(d):
            gw[i] += g * x[i]
        gb += g
    w = [wi - lr * gi / len(train) for wi, gi in zip(w, gw)]
    b -= lr * gb / len(train)

score = lambda x: sum(wi * xi for wi, xi in zip(w, x)) + b
l1 = sum(abs(wi) for wi in w)
l2 = math.sqrt(sum(wi * wi for wi in w))
sign = lambda v: (v > 0) - (v < 0)
print(f"||w||_1 = {l1:.2f}   ||w||_2 = {l2:.3f}   ratio {l1 / l2:.1f}")

# --- 2. FGSM is the exact worst case for a linear model --------------------
for eps in (0.0, 0.05, 0.1, 0.2, 0.3):
    fgsm_ok = cert_ok = 0
    for x, y in test:
        x_adv = [xi - eps * y * sign(wi) for xi, wi in zip(x, w)]   # step against the true label
        fgsm_ok += sign(score(x_adv)) == y
        cert_ok += y * score(x) > eps * l1                          # certified: margin / ||w||_1 > eps
    print(f"eps={eps:.2f}: accuracy under FGSM {fgsm_ok / len(test):.3f}   certified {cert_ok / len(test):.3f}")

# --- 3. Attack success rates with exact (Clopper-Pearson) intervals ---------
def binom_cdf(k, n, p):
    return sum(math.comb(n, i) * p**i * (1 - p)**(n - i) for i in range(k + 1))
def clopper_pearson(k, n, alpha=0.05):
    def solve(f, lo=0.0, hi=1.0):                  # bisection for the root of a decreasing f
        for _ in range(60):
            mid = (lo + hi) / 2
            lo, hi = (mid, hi) if f(mid) > 0 else (lo, mid)
        return (lo + hi) / 2
    lower = 0.0 if k == 0 else solve(lambda p: alpha / 2 - (1 - binom_cdf(k - 1, n, p)))
    upper = 1.0 if k == n else solve(lambda p: binom_cdf(k, n, p) - alpha / 2)
    return lower, upper
for k, n_att in ((0, 100), (3, 100), (12, 300), (0, 1000)):
    lo, hi = clopper_pearson(k, n_att)
    print(f"{k:3d}/{n_att:<5d} ASR {k / n_att:.3f}  95% CI [{lo:.4f}, {hi:.4f}]")
print("rule of three, n=1000:", 3 / 1000, " exact one-sided:", round(1 - 0.05 ** (1 / 1000), 5))
```

Output:

```
||w||_1 = 14.05   ||w||_2 = 1.766   ratio 8.0
eps=0.00: accuracy under FGSM 0.810   certified 0.810
eps=0.05: accuracy under FGSM 0.695   certified 0.695
eps=0.10: accuracy under FGSM 0.525   certified 0.525
eps=0.20: accuracy under FGSM 0.245   certified 0.245
eps=0.30: accuracy under FGSM 0.095   certified 0.095
  0/100   ASR 0.000  95% CI [0.0000, 0.0362]
  3/100   ASR 0.030  95% CI [0.0062, 0.0852]
 12/300   ASR 0.040  95% CI [0.0208, 0.0688]
  0/1000  ASR 0.000  95% CI [0.0000, 0.0037]
rule of three, n=1000: 0.003  exact one-sided: 0.00299
```

The two accuracy columns agree exactly, as [[#prop-fgsm]] and [[#thm-certified]] together require for a linear model: the attack is optimal and the certificate is tight. The ratio $\norm{\mathbf w}_1/\norm{\mathbf w}_2 = 8$ is why the $\ell_\infty$ radius is so much smaller than the $\ell_2$ radius.

::: quiz
A paper reports that its jailbreak defence lowers ASR from $62\%$ to $1\%$ on a public benchmark of $200$ behaviours, using the attacks in the benchmark. What is the most important missing evidence?
- [ ] The defence's ASR on a second public benchmark with the same attacks.
- [x] Results against adaptive attacks designed with knowledge of the defence, together with the defence's over-refusal rate on benign prompts.
- [ ] A larger model.
- [ ] The judge's agreement with itself on repeated runs.
::: solution
Fixed attacks measure robustness to attackers who did not know the defence; history shows such results often collapse against adaptive attacks ([[#sec-jailbreaks]]). Without an over-refusal rate, a defence that refuses everything would look perfect ([[#alg-report]]).
:::
:::

::: history
Biggio et al. (2013) and Szegedy et al. (2014) discovered adversarial examples; Goodfellow et al. (2015) proposed FGSM and the linearity hypothesis; Madry et al. (2018) established adversarial training as robust optimisation; Athalye et al. (2018) and Tramèr et al. (2020) made adaptive evaluation the norm; Cohen et al. (2019) introduced randomised smoothing. For language models, Wallace et al. (2019) found universal adversarial triggers for text classifiers and generators. Community jailbreaks of chat assistants spread from late 2022; Wei et al. (2023) explained them by competing objectives and mismatched generalisation; Zou et al. (2023) found transferable optimised suffixes; Chao et al. (2023) automated attacks with an attacker model; Qi et al. (2023) showed that fine-tuning removes safety; Anil et al. (2024) described many-shot jailbreaking and Hughes et al. (2024) best-of-$N$ jailbreaking. On defence, Inan et al. (2023) released Llama Guard; Mazeika et al. (2024) HarmBench; Souly et al. (2024) StrongREJECT; Zou et al. (2024) circuit breakers; Sharma et al. (2025) constitutional classifiers. As of 2026 no defence has been shown robust to adaptive attackers across domains, and developers rely on layered defences combined with monitoring.
:::

::: summary
- An adversarial example changes a model's output by a perturbation within a threat model. For a linear score, FGSM's worst-case change is $\eps\norm{\mathbf w}_1$, growing with dimension.
- A linear classifier is certifiably robust in $\ell_p$ within radius $\abs{s(\mathbf x)}/\norm{\mathbf w}_q$, and the bound is tight; for deep networks attacks and certificates give upper and lower bounds that do not meet.
- Jailbreaks elicit disallowed behaviour; safety training fails through competing objectives and mismatched generalisation (Wei et al., 2023). Attack families: crafted prompts, obfuscation, many-shot, optimisation, attacker models, random search, fine-tuning.
- Attacks compound across attempts and families, heterogeneity makes success grow like a power law in the budget, and adaptive attackers move second: report ASR against adaptive attacks and as a function of budget.
- Defences: refusal training, adversarial and latent adversarial training, circuit breakers, input and output (including constitutional) classifiers, unlearning, and system-level limits; each has documented limits, and layers help most when their failures are uncorrelated.
- Measure success with validated judges that score usefulness, report over-refusal, and use exact intervals: zero successes in $n$ trials still allows a rate near $3/n$.
:::

## Exercises

::: exercise FGSM on a linear score {level=1 check="2.5"}
A linear score has $\norm{\mathbf w}_1 = 25$. By how much can an $\ell_\infty$ perturbation with $\eps = 0.1$ change the score at most?
::: solution
$\eps\norm{\mathbf w}_1 = 0.1\cdot25 = 2.5$ ([[#prop-fgsm]]).
:::
:::

::: exercise A certified radius {level=1 check="0.4"}
A linear classifier has $\mathbf w = (3, -4)$, $b = 0$, and the point $\mathbf x = (0.5, -0.125)$. What is its certified $\ell_2$ radius?
::: solution
$s(\mathbf x) = 3\cdot0.5 + (-4)(-0.125) = 1.5 + 0.5 = 2$ and $\norm{\mathbf w}_2 = 5$, so $r_2 = 2/5 = 0.4$ ([[#thm-certified]]). The $\ell_\infty$ radius is $2/\norm{\mathbf w}_1 = 2/7 = 0.286$.
:::
:::

::: exercise Rule of three {level=1 check="0.0006"}
A defence shows no successes in $5{,}000$ attack attempts. Using the rule of three, what is the approximate $95\%$ upper bound on its ASR?
::: solution
$3/5000 = 0.0006$ ([[#prop-rule-three]]); the exact value $1 - 0.05^{1/5000} = 0.000599$.
:::
:::

::: exercise Attempts needed {level=2 check="114"}
An attack has per-attempt success probability $0.02$ on every behaviour, independently. How many attempts per behaviour are needed for ASR at $k$ to reach $90\%$? Give the smallest integer.
::: solution
$1 - 0.98^k\ge0.9$ needs $k\ge\ln0.1/\ln0.98 = 2.3026/0.020203 = 113.97$, so $k = 114$ ([[#prop-compound]]).
:::
:::

::: exercise Heterogeneity {level=2 check="0.8"}
Per-behaviour success probabilities follow Beta$(1, 24)$. What is ASR at $k = 96$ attempts?
::: solution
By [[#prop-heterogeneous]] with $a = 1$, $1 - \mathrm{ASR} = 24/(24 + 96) = 0.2$, so ASR $= 0.8$. With a homogeneous $p = 1/25 = 0.04$, it would be $1 - 0.96^{96} = 0.980$.
:::
:::

::: exercise Attempts for a claim {level=2 check="2995"}
How many attack attempts with zero successes are needed to claim, with $95\%$ one-sided confidence, that ASR is below $0.1\%$? Use the exact bound.
::: solution
$(1 - 0.001)^n\le0.05$ gives $n\ge\ln0.05/\ln0.999 = -2.99573/-0.0010005 = 2994.2$, so $2{,}995$ attempts ([[#prop-rule-three]]).
:::
:::

::: exercise Classify failure modes {level=2}
For each defence, say which of Wei et al.'s failure modes ([[#def-failure-modes]]) it mainly addresses, and why: (a) adding safety training data in many languages and encodings; (b) training the model to reason about a written safety specification before answering; (c) an output classifier that inspects the decoded response; (d) circuit breakers.
::: solution
(a) Mismatched generalisation: it extends refusal training to inputs where capabilities already generalise. (b) Mainly competing objectives: explicit reasoning about the specification lets the model notice when helpfulness or instruction-following conflicts with policy, and resolve the conflict in policy's favour; it can also help mismatched generalisation if the model recognises the underlying request. (c) Both partly: it judges the output whatever input produced it, which sidesteps obfuscated inputs, but it has its own generalisation gaps (obfuscated outputs). (d) Both in intent: it targets internal representations of harmful generation regardless of the input route, so it does not depend on the attack exploiting a particular objective or format — though, as with any learned defence, its generalisation must be measured with adaptive attacks.
:::
:::

::: exercise Certification needs margin {level=3}
Prove that for a linear classifier the fraction of test points certified at $\ell_\infty$ radius $\eps$ equals the robust accuracy at $\eps$, and explain why the same equality fails for a ReLU network. What do attacks and certificates each tell you there?
::: solution
A point is counted in robust accuracy at $\eps$ when it is correctly classified and no $\boldsymbol\delta$ with $\norm{\boldsymbol\delta}_\infty\le\eps$ changes the prediction. By [[#thm-certified]] with $p = \infty$, every $\boldsymbol\delta$ with $\norm{\boldsymbol\delta}_\infty < y\,s(\mathbf x)/\norm{\mathbf w}_1$ leaves the prediction unchanged, and by tightness some $\boldsymbol\delta$ at exactly that norm reaches the boundary; so a correctly classified point is robust at $\eps$ iff $y\,s(\mathbf x) > \eps\norm{\mathbf w}_1$ (up to the boundary case), which is the certification criterion. For a ReLU network the worst-case perturbation solves a non-convex problem (exactly, a mixed-integer programme that is NP-hard in general), so gradient attacks may miss adversarial examples and tractable certificates relax the problem and may fail to certify robust points. Attacks then give an *upper* bound on robust accuracy, certificates a *lower* bound, and the truth lies between ([[#sec-adversarial]]).
:::
:::

::: exercise Correlated layers {level=3}
Three defence layers each miss a fraction $m$ of attacks. A fraction $\phi$ of attacks are "universal" and are missed by all layers; the rest are missed independently with probability $r$ per layer. Express each layer's miss rate $m$ and the pass-through rate in terms of $\phi$ and $r$, and evaluate for $\phi = 0.01$, $r = 0.1$.
::: solution
Each layer misses all universal attacks and a fraction $r$ of the others: $m = \phi + (1 - \phi)r$. An attack passes all three if it is universal, or if it is ordinary and missed three times: pass-through $= \phi + (1 - \phi)r^3$. With $\phi = 0.01$, $r = 0.1$: $m = 0.01 + 0.99\cdot0.1 = 0.109$ and pass-through $= 0.01 + 0.99\cdot0.001 = 0.01099$. Treating the layers as independent with miss rate $0.109$ would predict $0.109^3 = 0.0013$, more than eight times too optimistic. The pass-through rate can never fall below $\phi$, however many layers are added: universal attacks set the floor, which is why the constitutional-classifier evaluations emphasised searching for *universal* jailbreaks ([[#sec-defences]]).
:::
:::

::: exercise Implement Wilson intervals {level=3}
Add a function to the listing that computes the Wilson score interval, compare it with Clopper–Pearson for $3/100$ and $0/100$, and explain which you would report for a safety claim.
::: solution
The Wilson interval is $\big(\hat p + \frac{z^2}{2n}\pm z\sqrt{\frac{\hat p(1 - \hat p)}{n} + \frac{z^2}{4n^2}}\big)/(1 + z^2/n)$ (as in the listing of [[safety-alignment/reward-hacking#sec-code]]). For $3/100$ it gives $[0.0103, 0.0845]$ and for $0/100$ $[0, 0.0370]$; Clopper–Pearson gives $[0.0062, 0.0852]$ and $[0, 0.0362]$. Wilson intervals have coverage close to nominal on average and are slightly narrower; Clopper–Pearson guarantees at least nominal coverage for every true $p$ and is conservative. For a safety claim — an upper bound someone will rely on — the guaranteed-coverage interval (or the exact one-sided bound) is the defensible choice, and the difference matters little at these sample sizes compared with the threat-model questions of [[#alg-report]].
:::
:::
