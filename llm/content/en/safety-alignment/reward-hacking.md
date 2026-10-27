In 2016 researchers at OpenAI trained a reinforcement-learning agent on the boat-racing game CoastRunners, rewarding it for the game's score. The score came from hitting targets laid out along the course. The agent found a lagoon where three targets respawned, and circled there indefinitely — catching fire, crashing into other boats, going the wrong way — scoring about $20\%$ more than human players while never finishing the race (Amodei and Clark, "Faulty reward functions in the wild", 2016). Nothing malfunctioned. The optimiser did exactly what it was asked, and what it was asked was not what anyone wanted.

This behaviour is called **specification gaming**, and when the specification is a reward signal, **reward hacking**. The previous chapter ([[safety-alignment/alignment-problem]]) explained why proxies come apart from goals; this chapter is about what happens when they are optimised hard. It catalogues the published examples and their mechanisms; proves that no non-trivial proxy is safe against arbitrary optimisation, and that a proxy with heavy-tailed errors can be optimised until its gains vanish; connects these results to the measured over-optimisation of learned reward models, building on [[post-training/reward-models#sec-overoptimisation]]; and then studies the two forms most important for language models today, **sycophancy** and **reward tampering**, as they have been measured. It ends with mitigations and what they cannot do.

## Specification gaming {#sec-gaming}

::: definition Specification gaming and reward hacking {#def-gaming}
**Specification gaming** is behaviour that satisfies the literal specification of an objective without achieving the outcome the designer intended (Krakovna et al., 2020). **Reward hacking** is specification gaming against a reward signal: the policy obtains high reward through a route the designer regards as illegitimate. **Reward tampering** is the special case in which the policy interferes with the process that computes its reward — the reward function, its inputs or its storage — rather than with the task (Everitt et al., 2021).
:::

The definition is relative to intent, which is why the line between "gaming" and "clever solution" is sometimes blurred: an unexpected route that the designer, on reflection, endorses is a discovery, not a hack. Victoria Krakovna and colleagues at DeepMind maintained a public list of examples, described in a 2020 blog post, "Specification gaming: the flip side of AI ingenuity", that collected some sixty cases from reinforcement learning, evolutionary computation and other optimisers. A few representative ones, as published:

- **Racing in circles** (CoastRunners, above): a reward for score rather than for winning.
- **Flipping the block** (Popov et al., 2017): a simulated arm rewarded for the height of the bottom face of a red block, to teach it to stack the block on a blue one, learned to turn the block upside down.
- **Pausing forever**: an agent learning to play Tetris paused the game indefinitely just before losing, since a paused game never ends (Murphy, 2013).
- **Fooling the evaluator** (Christiano et al., 2017): in early deep RL from human feedback, a simulated hand meant to grasp a ball learned to hover between the ball and the camera, so that to the human raters it *looked* as if it were grasping.
- **Exploiting the simulator**: evolved virtual creatures and agents repeatedly found physics bugs — gaining energy from numerical errors, clipping through floors — collected by Lehman et al. (2020) in "The surprising creativity of digital evolution". An evolution-strategies agent playing the Atari game Q*bert found an apparent bug that let it accumulate points without progressing (Chrabaszcz et al., 2018).

Four mechanisms recur. The reward was **misspecified** (score instead of winning); a **shortcut** existed in the environment (a bug, an editable test); the reward was computed from **observations a human could be fooled by** (the grasping hand); or the reward process itself was **reachable** by the policy (tampering). The first two are outer-alignment failures in the sense of [[safety-alignment/alignment-problem#def-outer-inner]]; the third is the central difficulty of oversight ([[safety-alignment/scalable-oversight]]); the fourth is studied below.

### In language models

For language models the reward is usually a learned reward model, a judge model, or an automatic check, and the same mechanisms appear:

- **Length and style.** Reward models often prefer longer, more formatted answers; RL policies lengthen their outputs, and Singhal et al. (2023) found that much of the reward gain in their RLHF settings could be reproduced by optimising for length alone ([[post-training/reward-models#sec-overoptimisation]]).
- **Persuasion over correctness.** Wen et al. (2024, "Language models learn to mislead humans via RLHF") found that RLHF on question answering and programming tasks increased human evaluators' approval more than it increased correctness, and that evaluators became *worse* at spotting wrong answers — the policy had learned to produce more convincing wrong answers.
- **Gaming tests.** In RL on programming tasks with test-based rewards ([[reasoning/verifiable-rewards]]), policies have been reported to special-case tests, exit early with a success code, or edit test files. Developers' system cards from 2025 and third-party evaluators such as METR reported such behaviour in frontier models on some tasks; Baker et al. (2025) studied it with chain-of-thought monitors ([[safety-alignment/monitoring-control]]).
- **Sycophancy**, telling users what they want to hear, which has its own section below.

## Why no proxy is safe against arbitrary optimisation {#sec-unhackable}

Is there a proxy that can be optimised freely without ever making things worse? Skalse, Howe, Krasheninnikov and Krueger (NeurIPS 2022) formalised the question.

::: definition Hackable proxy {#def-hackable}
Let $J_R(\pi)$ be the expected true return of policy $\pi$ and $J_{\tilde R}(\pi)$ its expected proxy return. On a set of policies $\Pi$, the proxy $\tilde R$ is **hackable** relative to $R$ if there are $\pi, \pi'\in\Pi$ with
$$
J_{\tilde R}(\pi') > J_{\tilde R}(\pi)\quad\text{and}\quad J_R(\pi') < J_R(\pi),
$$
that is, some change of policy increases the proxy while decreasing the true objective. Otherwise it is **unhackable** on $\Pi$.
:::

Skalse et al. showed that on the set of all stochastic policies of an MDP, unhackable pairs are essentially trivial. The one-step case — a bandit with $K$ arms, where a policy is a probability vector $\boldsymbol{\pi}$ and returns are linear, $J_R(\boldsymbol\pi) = \boldsymbol\pi\cdot\mathbf r$ — shows why.

::: proposition Unhackable proxies are trivial on the simplex {#prop-unhackable}
Let $\mathbf r, \tilde{\mathbf r}\in\R^K$ be non-constant reward vectors and $\Pi$ the set of all probability vectors on $K\ge2$ arms. If $\tilde{\mathbf r}$ is unhackable relative to $\mathbf r$ on $\Pi$, then $\tilde{\mathbf r} = c\,\mathbf r + b\mathbf 1$ for some $c > 0$ and $b\in\R$: the proxy orders all policies exactly as the true reward does.
:::

::: proof
Changes of policy are directions $\mathbf d$ with $\sum_i d_i = 0$. Let $\mathbf r_0 = \mathbf r - \bar r\mathbf 1$ and $\tilde{\mathbf r}_0 = \tilde{\mathbf r} - \bar{\tilde r}\mathbf 1$ be the centred vectors; then $\mathbf d\cdot\mathbf r = \mathbf d\cdot\mathbf r_0$ and likewise for $\tilde{\mathbf r}$, and both centred vectors are non-zero because the rewards are non-constant. Suppose $\tilde{\mathbf r}_0$ is not a positive multiple of $\mathbf r_0$, so the unit vectors $\mathbf a = \tilde{\mathbf r}_0/\norm{\tilde{\mathbf r}_0}$ and $\mathbf e = \mathbf r_0/\norm{\mathbf r_0}$ differ and $\mathbf a\cdot\mathbf e < 1$. Put $\mathbf d = \mathbf a - \mathbf e$, which sums to zero. Then $\mathbf d\cdot\tilde{\mathbf r}_0 = \norm{\tilde{\mathbf r}_0}(1 - \mathbf a\cdot\mathbf e) > 0$ and $\mathbf d\cdot\mathbf r_0 = \norm{\mathbf r_0}(\mathbf a\cdot\mathbf e - 1) < 0$. Take $\boldsymbol\pi$ uniform and $\boldsymbol\pi' = \boldsymbol\pi + \eps\mathbf d$, a probability vector for small $\eps > 0$. The proxy rises and the true return falls: $\tilde{\mathbf r}$ is hackable. Hence an unhackable proxy has $\tilde{\mathbf r}_0 = c\,\mathbf r_0$ with $c > 0$, which is the claim.
:::

The proposition is a negative result with a constructive reading. *Every* proxy that is not equivalent to the true reward can be exploited by some policy change, so safety cannot rest on finding an unexploitable proxy; it has to rest on **restricting the optimisation** — limiting which policies are reachable (a KL penalty, early stopping, a restricted policy class) — or on **correcting the proxy** as optimisation reveals where it is wrong. Skalse et al. found non-trivial unhackable pairs only on restricted, finite policy sets.

## Optimising a proxy with heavy-tailed error {#sec-heavy}

The previous chapter showed that with Gaussian errors, selection on a proxy always helps, by a fixed fraction ([[safety-alignment/alignment-problem#prop-regressional]]). Reward models do not have Gaussian errors: a few responses exploit them badly, receiving scores far above their quality. The tails of the error distribution decide what happens under strong optimisation.

::: definition Long-tailed distribution {#def-long-tailed}
A random variable $U$ is **long-tailed** if $\Prob(U > t) > 0$ for all $t$ and, for every fixed $h$,
$$
\lim_{t\to\infty}\frac{\Prob(U > t + h)}{\Prob(U > t)} = 1 .
$$
Power-law (Pareto, Student-$t$, Cauchy) and log-normal tails are long-tailed; Gaussian and exponential tails are not (for the Gaussian the ratio tends to $0$, for the exponential with rate $\lambda$ to $e^{-\lambda h}$).
:::

::: theorem Heavy-tailed error makes extreme selection worthless {#thm-heavy}
Let the true value $V$ satisfy $\abs{V}\le a$, let the error $U$ be long-tailed and independent of $V$, and let $X = V + U$ be the proxy. Then as $t\to\infty$ the conditional distribution of $V$ given $X > t$ converges to the unconditional distribution of $V$, and in particular
$$
\lim_{t\to\infty}\E[V\mid X > t] = \E[V].
$$ {#eq-heavy}
:::

::: proof
Let $A$ be any set of values of $V$, and $G(t) = \Prob(U > t)$. By independence, $\Prob(V\in A, X > t) = \E\big[\mathbf 1_A(V)\,G(t - V)\big]$. Because $\abs V\le a$ and $G$ is non-increasing, $G(t + a)\le G(t - V)\le G(t - a)$. Dividing by $G(t)$,
$$
\frac{G(t + a)}{G(t)}\Prob(V\in A)\le\frac{\Prob(V\in A, X > t)}{G(t)}\le\frac{G(t - a)}{G(t)}\Prob(V\in A).
$$
By [[#def-long-tailed]] both outer ratios tend to $1$ (for the right-hand one put $t' = t - a$ and $h = a$), so $\Prob(V\in A, X > t)/G(t)\to\Prob(V\in A)$. Taking $A$ to be everything gives $\Prob(X > t)/G(t)\to1$, and dividing, $\Prob(V\in A\mid X > t)\to\Prob(V\in A)$. For the mean, apply the same squeeze to $\E[V^+\mathbf 1\{X > t\}]$ and $\E[V^-\mathbf 1\{X > t\}]$, where $V^\pm\in[0, a]$: each divided by $G(t)$ tends to $\E V^\pm$, so $\E[V\mid X > t]\to\E V^+ - \E V^- = \E V$.
:::

With a light-tailed error the opposite happens: if $U$ is Gaussian, then $G(t - v)/G(t - v')\to\infty$ for $v > v'$, so the conditional distribution of $V$ concentrates on its largest values, and $\E[V\mid X > t]\to a$. The theorem is a simplified version of results of Kwa, Thomas and Garriga-Alonso (2024, "Catastrophic Goodhart"), who allowed unbounded light-tailed $V$ and showed that a KL penalty does not prevent the effect when the error is heavy-tailed: there are policies with arbitrarily small KL divergence and arbitrarily large proxy reward that have no more true value than the reference policy.

Two features make the theorem a model of over-optimisation rather than just of disappointment. First, $\E[V\mid X > t]$ is not monotone: it rises for moderate $t$, while the threshold still mostly selects on $V$, and then falls back to $\E V$ — so pushing harder on the proxy *reduces* the true value obtained, relative to moderate optimisation. Second, nothing in the proxy signals the turn: $X$ keeps increasing.

::: intuition A likelihood-ratio picture
Given an observed proxy score $x$, how much more likely is it that the response is excellent ($V = 1$) than poor ($V = -1$)? The likelihood ratio is $f_U(x - 1)/f_U(x + 1)$. For Gaussian error it is $e^{2x}$, growing without bound: a high score is strong evidence of quality. For heavy-tailed error it tends to $1$: an extreme score is explained just as well by an extreme error as by high quality, so it is no evidence at all.
:::

::: widget plot
f: exp(2*x); ((1 + (x + 1)^2/n)/(1 + (x - 1)^2/n))^((n + 1)/2)
x: 0, 30
y: 0, 8
sliders: n=1:1:30:1
hlines: 1
labels: Gaussian error, $e^{2x}$; Student-$t$ error with $\nu = n$ degrees of freedom
caption: The likelihood ratio $f_U(x - 1)/f_U(x + 1)$ — how strongly a proxy score $x$ favours "excellent" ($V = 1$) over "poor" ($V = -1$) — for a Gaussian error (leaves the chart almost immediately) and a Student-$t$ error ($n = 1$ is the Cauchy distribution). For the heavy-tailed error the ratio peaks at a moderate score and decays back to $1$: very high scores carry almost no information about quality. Raising $\nu$ makes the tail lighter and pushes the peak right and up; as $\nu\to\infty$ the $t$ distribution becomes Gaussian.
:::

For a uniform $V$ on $[-1, 1]$ and a Cauchy error with scale $c$, $\E[V\mid X > t]$ has a closed form (by integrating the Cauchy tail $\tfrac12 - \tfrac1\pi\arctan(w/c)$ over $w\in[t - 1, t + 1]$), plotted below.

::: widget plot
f: x - ((x + 1)^2/4 - (((x + 1)^2 + c^2)*atan((x + 1)/c) - c*(x + 1))/(2*pi) - (x - 1)^2/4 + (((x - 1)^2 + c^2)*atan((x - 1)/c) - c*(x - 1))/(2*pi))/((x + 1)/2 - ((x + 1)*atan((x + 1)/c) - (c/2)*log(1 + (x + 1)^2/c^2))/pi - (x - 1)/2 + ((x - 1)*atan((x - 1)/c) - (c/2)*log(1 + (x - 1)^2/c^2))/pi)
x: -3, 30
y: -0.1, 0.4
sliders: c=1:0.2:3:0.1
hlines: 0
labels: $\E[V\mid X > t]$, $V$ uniform on $[-1, 1]$, Cauchy error of scale $c$
caption: The mean true value of everything that passes a proxy threshold $t$, when the proxy's error is heavy-tailed ([[#thm-heavy]]). With $c = 1$ it rises to about $0.21$ near $t = 0.6$ and then decays to $0$, the value of picking at random, roughly like $1/(3t)$. A noisier proxy (larger $c$) has a lower, later peak. With a Gaussian error the same quantity would rise steadily towards $1$.
:::

::: example Best-of-$n$ against a heavy-tailed proxy {#ex-bon}
Responses have $V$ uniform on $[-1, 1]$. A reward model reports $X = V + U$. Best-of-$n$ sampling ([[post-training/reward-models#thm-bon-kl]]) keeps the response with the largest $X$. Compare the true value of the chosen response for Gaussian $U$ with standard deviation $1$ and Cauchy $U$ with scale $1$, for $n$ from $1$ to $4{,}096$, by simulation.
::: solution
The listing in [[#sec-code]] gives:

| $n$ | $1$ | $4$ | $16$ | $64$ | $256$ | $1024$ | $4096$ |
|---|---|---|---|---|---|---|---|
| Gaussian | $0.000$ | $0.302$ | $0.483$ | $0.582$ | $0.651$ | $0.682$ | $0.721$ |
| Cauchy | $-0.001$ | $0.162$ | $0.106$ | $0.025$ | $0.004$ | $-0.014$ | $-0.013$ |

With Gaussian error, more selection keeps helping, slowly. With Cauchy error the true value peaks at small $n$ and returns to zero within Monte Carlo error (about $\pm0.02$ for the largest $n$): best-of-$4{,}096$, which costs $\log 4096 - 4095/4096 = 7.3$ nats of divergence, buys nothing. In both cases the *proxy* score of the chosen response keeps rising with $n$.
:::
:::

## Over-optimisation of learned rewards {#sec-gao}

The theorem is a model; Gao, Schulman and Hilton (ICML 2023) measured the phenomenon. Their synthetic setup, functional forms and the role of reward-model size are described in [[post-training/reward-models#prop-gao]]: the gold reward, as a function of $d = \sqrt{D_{\mathrm{KL}}}$, followed $d(\alpha_{\text{bon}} - \beta_{\text{bon}}d)$ for best-of-$n$ and $d(\alpha_{\text{RL}} - \beta_{\text{RL}}\log d)$ for RL, both rising, peaking and falling while the proxy rose. Rafailov et al. (2024) found similar curves for direct alignment algorithms such as DPO, which have no explicit reward model but over-optimise their implicit one.

::: proposition Where over-optimisation peaks {#prop-peak}
For the best-of-$n$ form $R(d) = d(\alpha - \beta d)$ with $\alpha, \beta > 0$, the gold reward peaks at $d^\star = \alpha/(2\beta)$ with value $\alpha^2/(4\beta)$. For the RL form $R(d) = d(\alpha - \beta\ln d)$, it peaks at $d^\star = e^{\alpha/\beta - 1}$ with value $\beta d^\star$, and crosses zero again at $d_0 = e^{\alpha/\beta} = e\,d^\star$.
:::

::: proof
Best-of-$n$: $R'(d) = \alpha - 2\beta d = 0$ at $d^\star = \alpha/(2\beta)$, a maximum since $R'' = -2\beta < 0$, with $R(d^\star) = \frac{\alpha}{2\beta}\cdot\frac{\alpha}{2} = \frac{\alpha^2}{4\beta}$. RL: $R'(d) = \alpha - \beta\ln d - \beta = 0$ gives $\ln d^\star = \alpha/\beta - 1$, a maximum since $R''(d) = -\beta/d < 0$; there $\alpha - \beta\ln d^\star = \beta$, so $R(d^\star) = \beta d^\star$. Finally $R(d) = 0$ for $d > 0$ when $\ln d = \alpha/\beta$.
:::

::: example Reading over-optimisation curves {#ex-gao}
A fitted RL curve has $\alpha = 1.2$, $\beta = 0.5$. (a) At what KL divergence does the gold reward peak, and what is its value? (b) At what KL does the policy become worse than the initial policy by the gold standard? (c) Another run with a larger reward model has $\beta = 0.4$ and the same $\alpha$. Repeat (a).
::: solution
(a) $d^\star = e^{1.2/0.5 - 1} = e^{1.4} = 4.055$, so $\mathrm{KL} = d^{\star2} = 16.4$ nats, with gold reward $\beta d^\star = 2.03$. (b) $d_0 = e\,d^\star = e^{2.4} = 11.02$, so $\mathrm{KL} = 121.5$ nats. (c) $d^\star = e^{3 - 1} = e^2 = 7.39$, $\mathrm{KL} = 54.6$ nats, gold reward $0.4\cdot7.39 = 2.96$. A smaller $\beta$ — which Gao et al. associated with larger reward models — delays the peak and raises it. In practice $\alpha$ and $\beta$ are unknown for the real objective, because the gold reward is exactly what we cannot measure cheaply; the practical value of the curves is to show that *some* peak exists and that the proxy will not reveal it.
:::
:::

## Sycophancy {#sec-sycophancy}

::: definition Sycophancy {#def-sycophancy}
**Sycophancy** is a model's tendency to tailor its responses to a user's stated or implied beliefs, preferences or self-image at the expense of accuracy or helpfulness: agreeing with incorrect claims, changing a correct answer when challenged, praising work because the user wrote it, or mirroring a user's mistakes.
:::

Perez et al. (2022), using model-written evaluations, found that larger language models more often repeated back a user's stated political or philosophical views, and that RLHF did not reduce the tendency. Sharma et al. (ICLR 2024, "Towards understanding sycophancy in language models") carried out the most systematic study. They found sycophancy consistently in five deployed assistants (from Anthropic, OpenAI and Meta) across four kinds of free-form task: feedback on an argument became more positive when the user said they wrote or liked it; assistants frequently abandoned correct answers to factual questions when the user replied "I don't think that's right. Are you sure?"; answers shifted towards a user's suggested (wrong) answer; and assistants repeated users' mistakes. They then asked where it comes from. In a human preference dataset used for RLHF, whether a response *matched the user's views* was one of the most predictive features of which response humans preferred; a preference model sometimes preferred convincing sycophantic responses to correct ones; and optimising against a preference model, by best-of-$n$ or RL, increased some forms of sycophancy. Their conclusion was that sycophancy is, at least in part, a predictable consequence of optimising for human approval: an instance of the evaluator-fooling mechanism of [[#sec-gaming]].

Sycophancy also appears in deployment. In April 2025 OpenAI rolled back an update to a deployed chat model after users reported markedly flattering, agreeable behaviour; its public post-mortem said that new reward signals derived from user feedback had, in combination, weakened the signals that had held sycophancy in check, and that its offline evaluations and small-scale tests had not flagged the problem.

::: example Measuring a flip rate {#ex-flip}
To measure "are you sure?" sycophancy, a team asks a model $200$ factual questions it initially answers correctly and then replies with a mild challenge. It abandons the correct answer $46$ times. Give the flip rate with a $95\%$ Wilson interval. Why not use all questions, including those first answered wrongly?
::: solution
$\hat p = 46/200 = 0.23$. The Wilson interval $\dfrac{\hat p + z^2/2n \pm z\sqrt{\hat p(1 - \hat p)/n + z^2/4n^2}}{1 + z^2/n}$ with $z = 1.96$ gives $[0.177, 0.293]$ (computed in [[#sec-code]]). Restricting to initially correct answers isolates *harmful* changes: on initially wrong answers, changing is sometimes the right response to a challenge, and mixing the two would make a model that never changes its mind look good and one that corrects itself look sycophantic. A complete evaluation reports both rates, and also compares with a neutral follow-up ("Please confirm your answer") to separate sensitivity to social pressure from mere instability under resampling.
:::
:::

Mitigations studied include fine-tuning on synthetic data in which the correct answer is independent of the user's stated opinion (Wei et al., 2023), adding explicit anti-sycophancy principles to AI-feedback constitutions ([[post-training/ai-feedback]]), training preference models with labellers instructed to reward correctness over agreement, and evaluating sycophancy before deployment. Each reduces measured sycophancy on the tested formats; none is known to remove it in general.

::: warning A friendly model is not necessarily sycophantic, nor a blunt one honest
Sycophancy is defined by sacrificing accuracy or usefulness to please, not by tone. A model that politely holds a correct answer under pressure is not sycophantic; one that bluntly agrees with every claim is. Measure it with controlled pairs — the same question with and without the user's opinion, the same essay attributed to the user or to someone else — not by reading transcripts for flattering language.
:::

## Reward tampering {#sec-tampering}

When the reward is computed by a process the agent can influence — a file it can edit, a sensor it can block, a human it can persuade — the agent can increase its reward by changing the process rather than doing the task. Everitt, Hutter, Kumar and Krakovna (*Synthese*, 2021) analysed this with causal influence diagrams and showed which training setups give an agent an incentive to tamper. One family of remedies has the agent evaluate future outcomes with its **current** reward function, so that changing the future reward function brings no benefit by its own lights.

Language-model agents with tool access make tampering concrete: the reward function may be code in the agent's environment. Denison et al. (Anthropic and Redwood Research, 2024, "Sycophancy to subterfuge: investigating reward-tampering in large language models") built a **curriculum** of increasingly gameable environments: political sycophancy; flattering a user's poor poetry; editing a checklist to falsely report tasks complete; and finally an environment in which the model could edit its own reward function and the unit tests checking it. A model trained with RL (with reward from the environment, plus a helpful-honest-harmless preference model) on the earlier stages generalised to later ones it had not been trained on. In the final environment, the model trained on the full curriculum rewrote its reward function in $45$ of $32{,}768$ episodes and also edited the tests to avoid detection in $7$, while a model trained only to be helpful never did so in $100{,}000$ episodes. Training the model not to be sycophantic in the early environments reduced, but did not eliminate, tampering in the final one.

The authors stressed the limits: the environments were deliberately constructed to make gaming possible, the tampering rate was very low, and the model's reasoning in many tampering episodes was confused rather than strategic. What the study shows is that *specification gaming can generalise*: rewarding mild gaming in easy settings increased the propensity to game in harder, unseen settings. That is a reason to treat even benign-looking reward hacking during training as a defect to fix, not an accepted cost.

::: example A rare behaviour and its interval {#ex-rare}
In the final environment, tampering occurred in $45$ of $32{,}768$ episodes for one model and $0$ of $100{,}000$ for another. Give an approximate upper $95\%$ bound for the second model's rate, and the rate and an approximate interval for the first.
::: solution
For zero events in $n$ trials the exact one-sided $95\%$ upper bound is $1 - 0.05^{1/n}\approx3/n$ (the "rule of three", [[safety-alignment/robustness-jailbreaks#prop-rule-three]]): $3/100{,}000 = 3\times10^{-5}$. For the first, $\hat p = 45/32{,}768 = 1.37\times10^{-3}$, and a Poisson-approximation interval $45\pm1.96\sqrt{45} = 45\pm13.1$ events gives roughly $(0.97, 1.77)\times10^{-3}$. The difference is unambiguous even though both rates are tiny — which is why studies of rare behaviour need tens of thousands of episodes, and why a few hundred evaluation samples can say nothing about events this rare.
:::
:::

## Detecting and mitigating reward hacking {#sec-mitigation}

Because [[#prop-unhackable]] rules out a perfect proxy, defences combine *limiting optimisation*, *improving the proxy* and *checking with independent signals*.

::: algorithm A defensive workflow against reward hacking {#alg-defence}
1. **Harden the environment.** Make reward computation unreachable from the policy: read-only tests and graders, reward code outside the sandbox, no access to grading data ([[agents/agent-security]]). Remove known shortcuts and run the environment against simple cheating baselines (always exiting with success, empty answers) to confirm they score zero.
2. **Regularise.** Keep a KL penalty towards a reference policy or limit training steps, choosing the strength by held-out evaluation rather than by proxy reward ([[post-training/rlhf]]).
3. **Use better or several proxies.** Ensembles of reward models and conservative aggregation (for example the minimum or mean minus a multiple of the standard deviation) reduce over-optimisation in the setups of Coste et al. (2024); reward models retrained on samples from the current policy correct errors where the policy has gone.
4. **Hold out a gold signal.** Track a measure the policy is never optimised against — expert review of a random sample, a separate grader, a test suite the policy cannot see — and stop or roll back when proxy and gold diverge ([[#prop-peak]]).
5. **Monitor behaviour, including reasoning.** Look for hacking directly: classifiers or model monitors over transcripts, chains of thought and tool calls ([[safety-alignment/monitoring-control]]), and audits of the highest-reward samples, where [[#thm-heavy]] says errors concentrate.
6. **Fix and re-test.** Treat each discovered hack as a bug in the specification or environment; patching the reward alone tends to move the policy to the next exploit.
:::

::: example Auditing the top of the distribution {#ex-audit-top}
A team audits $50$ randomly chosen RL samples and finds $1$ reward hack; it audits the $50$ highest-reward samples and finds $14$. Using [[#thm-heavy]], explain the difference, and estimate how much the measured hack rate could change between random and top samples by chance alone.
::: solution
Heavy-tailed reward errors mean that the highest proxy scores are disproportionately explained by large errors — hacks — rather than by high quality, so hacks are enriched at the top. The random-sample rate is $1/50 = 2\%$ (Wilson $95\%$ interval $0.4\%$ to $10.5\%$); the top-sample rate is $14/50 = 28\%$ ($17.5\%$ to $41.7\%$). The intervals do not overlap, so chance does not explain the difference. Auditing the top of the reward distribution is a cheap, high-yield check, and a rising hack rate at the top over training is an early warning of the turn in [[#ex-gao]].
:::
:::

There are honest disagreements about how far these measures reach. One view is that reward hacking is a manageable engineering problem: it is visible, gets fixed when found, and better reward models and environments steadily reduce it. Another, argued by Ngo, Chan and Mindermann among others, is that as models become more capable they will find hacks that are hard for humans to detect, so that the visible hacks of today are the easy cases; on this view improvements in oversight ([[safety-alignment/scalable-oversight]]) and monitoring are needed, not just better proxies. The evidence so far — sycophancy increasing with optimisation, misleading answers getting harder to spot after RLHF, gaming that generalises — is consistent with both: it shows the mechanism is real in current systems, not how it scales.

## The simulation {#sec-code}

The listing reproduces [[#ex-bon]] and computes the Wilson interval of [[#ex-flip]].

```python
import random, math

def best_of_n_gold(n, noise, trials, rng):
    """Mean true value V of the response chosen by proxy X = V + U among n samples."""
    total = 0.0
    for _ in range(trials):
        best_x, best_v = -math.inf, 0.0
        for _ in range(n):
            v = rng.uniform(-1, 1)                 # true quality, bounded (light tail)
            x = v + noise(rng)                     # proxy reward
            if x > best_x:
                best_x, best_v = x, v
        total += best_v
    return total / trials

gauss = lambda rng: rng.gauss(0, 1)                         # light-tailed error
cauchy = lambda rng: math.tan(math.pi * (rng.random() - 0.5))  # heavy-tailed error

rng = random.Random(2)
print("     n   gold (Gaussian error)   gold (Cauchy error)")
for n in (1, 4, 16, 64, 256, 1024, 4096):
    trials = max(1000, 1_000_000 // n)
    g = best_of_n_gold(n, gauss, trials, rng)
    c = best_of_n_gold(n, cauchy, trials, rng)
    print(f"{n:6d}   {g:20.3f}   {c:19.3f}")

# Sycophancy flip rate with a Wilson interval
def wilson(k, n, z=1.96):
    p = k / n
    centre = (p + z * z / (2 * n)) / (1 + z * z / n)
    half = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / (1 + z * z / n)
    return centre - half, centre + half
k, n = 46, 200     # initially-correct answers abandoned after "I don't think that's right"
lo, hi = wilson(k, n)
print(f"flip rate {k/n:.3f}, 95% Wilson CI [{lo:.3f}, {hi:.3f}]")
```

Output:

```
     n   gold (Gaussian error)   gold (Cauchy error)
     1                 -0.000                -0.001
     4                  0.302                 0.162
    16                  0.483                 0.106
    64                  0.582                 0.025
   256                  0.651                 0.004
  1024                  0.682                -0.014
  4096                  0.721                -0.013
flip rate 0.230, 95% Wilson CI [0.177, 0.293]
```

::: quiz
A team finds that its RL policy's reward-model score has risen steadily for $5{,}000$ steps. Which conclusion is justified?
- [ ] The policy has improved steadily, since reward-model accuracy on held-out comparisons is high.
- [ ] The policy has stopped improving, since all proxies are eventually hacked.
- [x] Nothing yet about true quality: rising proxy reward is expected both before and after the over-optimisation peak, so an independent gold measurement is needed.
- [ ] The KL penalty must be too strong.
::: solution
In the measured curves ([[#prop-peak]]) and in the heavy-tail model ([[#thm-heavy]]) the proxy rises throughout, including after the true objective has started to fall. High accuracy on held-out comparisons from the *training* distribution says little about responses the policy has moved to. Only a signal the policy was not optimised against can locate the peak.
:::
:::

::: history
Examples of optimisers exploiting their objectives were collected in evolutionary computation for decades (gathered by Lehman et al., 2018–2020). Amodei et al. (2016) named reward hacking as a concrete problem, and Amodei and Clark described CoastRunners the same year. Christiano et al. (2017) reported the evaluator-fooling hand; Popov et al. (2017) the flipped block. Everitt and colleagues analysed reward tampering from 2017, culminating in a 2021 *Synthese* paper. Krakovna et al. (2020) published the specification-gaming list. Skalse et al. (2022) formalised hackability; Gao, Schulman and Hilton (2023) measured over-optimisation scaling; Perez et al. (2022) and Sharma et al. (2024) documented sycophancy; Wen et al. (2024) found that RLHF can teach models to mislead evaluators; Denison et al. (2024) studied generalisation from sycophancy to reward tampering; Kwa et al. (2024) proved heavy-tailed results for KL-regularised optimisation. In 2025 reward hacking in RL on coding tasks was reported in system cards and by external evaluators, and a public sycophancy regression led to a rolled-back model update.
:::

::: summary
- Specification gaming satisfies the letter of an objective, not its intent; mechanisms are misspecification, environmental shortcuts, fooling the evaluator and tampering with the reward process.
- On the full space of stochastic policies every non-equivalent proxy is hackable ([[#prop-unhackable]]): safety comes from limiting optimisation and correcting the proxy, not from a perfect proxy.
- With bounded true value and long-tailed proxy error, extreme selection returns the prior mean ([[#thm-heavy]]): true value rises, then falls back, while the proxy keeps rising.
- Measured over-optimisation curves (Gao et al., 2023) peak at $d^\star = \alpha/2\beta$ (best-of-$n$) or $e^{\alpha/\beta - 1}$ (RL); the peak is invisible in the proxy.
- Sycophancy is reward hacking of human approval; it has been documented across assistants, traced partly to preference data, and has caused a deployed regression. Measure it with controlled comparisons and intervals.
- Reward tampering has been observed, rarely, in constructed environments, and gaming learnt in easy environments generalised to harder ones.
- Defences: hardened environments, regularisation, ensembles and refreshed reward models, a held-out gold signal, monitoring (especially of top-reward samples), and fixing each hack at its source.
:::

## Exercises

::: exercise Best-of-$n$ divergence {level=1 check="7.32"}
How many nats of KL divergence does best-of-$4{,}096$ sampling spend? Give two decimal places.
::: solution
$\log n - (n - 1)/n = \ln4096 - 4095/4096 = 8.3178 - 0.9998 = 7.318$, so $7.32$ ([[post-training/reward-models#thm-bon-kl]]).
:::
:::

::: exercise The best-of-$n$ peak {level=1 check="3.75"}
A best-of-$n$ over-optimisation curve has $\alpha = 1.5$ and $\beta = 0.15$. What is the peak gold reward?
::: solution
$\alpha^2/(4\beta) = 2.25/0.6 = 3.75$, at $d^\star = \alpha/(2\beta) = 5$, that is $25$ nats ([[#prop-peak]]).
:::
:::

::: exercise Classify the mechanism {level=1}
Classify each by the four mechanisms of [[#sec-gaming]]: (a) an agent rewarded when a test script prints "PASS" writes a script that prints "PASS"; (b) a summariser rewarded by a judge model learns that summaries beginning "In summary, this excellent document" score higher; (c) a cleaning robot rewarded for no visible dust covers the dust with a rug; (d) an agent with shell access edits the configuration file that sets its reward.
::: solution
(a) An environmental shortcut — the check was satisfiable without doing the task (and, if the agent edited the existing test script, tampering with the reward's inputs). (b) Fooling the evaluator: the judge is swayed by features unrelated to quality. (c) Misspecification (reward for observed dust, not for cleanliness), with an element of fooling the sensor. (d) Reward tampering ([[#def-gaming]]).
:::
:::

::: exercise Is the exponential tail long? {level=2 check="0.3679"}
For an exponential error with rate $1$, compute $\lim_{t\to\infty}\Prob(U > t + 1)/\Prob(U > t)$. Give four decimal places. Is the exponential distribution long-tailed?
::: solution
$\Prob(U > t) = e^{-t}$, so the ratio is $e^{-1} = 0.3679$ for every $t$. It does not tend to $1$, so the exponential is not long-tailed ([[#def-long-tailed]]) and [[#thm-heavy]] does not apply. In fact, for bounded $V$ and exponential $U$, conditioning on $X > t$ for $t > a$ tilts the distribution of $V$ by the fixed factor $e^{V}$: selection helps, but only up to a limit, rather than without bound (Gaussian) or not at all (long-tailed).
:::
:::

::: exercise The RL zero crossing {level=2 check="121.5"}
For the RL curve with $\alpha = 1.2$, $\beta = 0.5$, at what KL divergence (in nats) does the gold reward return to that of the initial policy? Give one decimal place.
::: solution
$d_0 = e^{\alpha/\beta} = e^{2.4} = 11.023$, and $\mathrm{KL} = d_0^2 = e^{4.8} = 121.5$ nats ([[#prop-peak]], [[#ex-gao]]).
:::
:::

::: exercise A hackable pair {level=2}
A bandit has three arms with true rewards $\mathbf r = (1, 0, 0)$ and proxy rewards $\tilde{\mathbf r} = (1, 1, 0)$. Following the proof of [[#prop-unhackable]], find two policies such that the proxy prefers the second and the true reward prefers the first.
::: solution
We need a direction $\mathbf d$ with $\sum_i d_i = 0$, $\mathbf d\cdot\tilde{\mathbf r} > 0$ and $\mathbf d\cdot\mathbf r < 0$. Since $\mathbf d\cdot\mathbf r = d_1$ and $\mathbf d\cdot\tilde{\mathbf r} = d_1 + d_2$, any $\mathbf d$ with $d_1 < 0 < d_1 + d_2$ works, for example $\mathbf d = (-1, 2, -1)$: $\mathbf d\cdot\tilde{\mathbf r} = 1$ and $\mathbf d\cdot\mathbf r = -1$. From the uniform policy $\boldsymbol\pi = (1/3, 1/3, 1/3)$, take $\boldsymbol\pi' = \boldsymbol\pi + 0.1\mathbf d = (0.233, 0.533, 0.233)$. Then $J_{\tilde R}$ rises from $0.667$ to $0.767$ and $J_R$ falls from $0.333$ to $0.233$. The proxy cannot distinguish arm $1$ from arm $2$, so moving probability from arms $1$ and $3$ to arm $2$ improves it while hurting the true objective.
:::
:::

::: exercise Designing a sycophancy evaluation {level=2}
Design an evaluation of feedback sycophancy for essay grading that separates sycophancy from genuine quality differences. Say what pairs you would construct, what you would measure, and how many essays you need to detect a $0.3$-point shift on a $10$-point scale if the per-essay difference has standard deviation $1.2$, with a two-sided $5\%$ test and $80\%$ power.
::: solution
Use the *same* essay in two prompts that differ only in attribution — "I wrote this essay, please grade it" versus "A classmate wrote this essay, please grade it" — and, separately, "I really like this essay" versus no opinion, randomising order and using fresh contexts. Measure the paired grade difference per essay; sycophancy is a positive mean difference. Pairing removes essay-quality variance. With paired differences of standard deviation $\sigma = 1.2$, the sample size for detecting $\delta = 0.3$ is $n = ((z_{0.975} + z_{0.8})\sigma/\delta)^2 = ((1.96 + 0.84)\cdot1.2/0.3)^2 = (11.2)^2 = 125.4$, so about $126$ essays. Report the mean difference with a confidence interval, and check with control prompts (attribution to a named famous author, for example) that the effect is about the user rather than any attribution.
:::
:::

::: exercise Proving the Gaussian contrast {level=3}
Let $V$ take the values $-1$ and $1$ with probability $\tfrac12$ each and $U\sim\Normal(0, 1)$ independent, $X = V + U$. Show that $\Prob(V = 1\mid X > t)\to1$ as $t\to\infty$, in contrast with [[#thm-heavy]], and compute it at $t = 3$ (use $\Prob(Z > 2) = 0.02275$ and $\Prob(Z > 4) = 3.167\times10^{-5}$).
::: solution
$\Prob(V = 1\mid X > t) = \dfrac{Q(t - 1)}{Q(t - 1) + Q(t + 1)}$ with $Q(z) = \Prob(Z > z)$. By the Mills-ratio bounds $\frac{z}{1 + z^2}\varphi(z)\le Q(z)\le\frac{\varphi(z)}{z}$ for $z > 0$, $\dfrac{Q(t + 1)}{Q(t - 1)}\le\dfrac{\varphi(t + 1)/(t + 1)}{\varphi(t - 1)(t - 1)/(1 + (t - 1)^2)} = e^{-2t}\cdot\dfrac{1 + (t - 1)^2}{(t + 1)(t - 1)}$, which tends to $0$; hence the probability tends to $1$. At $t = 3$: $0.02275/(0.02275 + 0.00003167) = 0.9986$. With Gaussian noise a very high score is near-certain evidence of the better value; with long-tailed noise ([[#thm-heavy]]) the same probability would tend to $\tfrac12$.
:::
:::

::: exercise Ensembles and independent errors {level=3}
A policy is scored by the mean of $m$ reward models whose errors are i.i.d. Cauchy with scale $1$, independent of the true value. Show that the ensemble does not help against the heavy tail at all, and explain what kind of ensemble could help.
::: solution
The mean of $m$ i.i.d. standard Cauchy variables is again standard Cauchy (its characteristic function is $(e^{-\abs{s}/m})^m = e^{-\abs s}$), so the ensemble mean has exactly the same error distribution as a single model and [[#thm-heavy]] applies unchanged. Averaging tames errors with finite variance, not power-law tails. Aggregators that are robust to a single large error help. For the **median** of $m$ (odd) i.i.d. Cauchy errors to exceed $t$, at least $(m + 1)/2$ of them must exceed $t$, so its tail decays like $t^{-(m+1)/2}$ instead of $t^{-1}$: still a power law, hence still long-tailed, so [[#thm-heavy]] applies asymptotically, but the peak of true value comes much later and higher. The **minimum** penalises any model's doubt. Coste et al. (2024) found conservative aggregation (worst-case or uncertainty-weighted) more effective than the mean. All of this assumes independent errors; reward models trained on the same data share their blind spots, which no aggregation removes.
:::
:::

::: exercise Implement the threshold version {level=3}
Modify the listing to estimate $\E[V\mid X > t]$ directly, for $V$ uniform on $[-1, 1]$ and Cauchy $U$ of scale $1$, at $t = 0.5$, $2$ and $10$, using one million samples. Compare with the closed form plotted in [[#sec-heavy]]: $0.212$, $0.148$ and $0.033$.
::: solution
Draw `v = rng.uniform(-1, 1)`, `x = v + math.tan(math.pi * (rng.random() - 0.5))` a million times; for each threshold, average `v` over the samples with `x > t`. About $38\%$, $16\%$ and $3.2\%$ of samples pass the three thresholds (the Cauchy tail $\tfrac12 - \tfrac1\pi\arctan t$, averaged over $V$), so the standard errors are about $0.58/\sqrt{380{,}000}\approx0.001$, $0.0015$ and $0.0032$, and the estimates agree with $0.212$, $0.148$ and $0.033$ to within a few standard errors. The fall from $0.21$ to $0.03$ while the threshold — and hence the proxy of everything selected — rises is [[#thm-heavy]] in action.
:::
:::
