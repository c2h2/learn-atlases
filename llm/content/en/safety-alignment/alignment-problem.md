In 1960 the mathematician Norbert Wiener warned that "if we use, to achieve our purposes, a mechanical agency with whose operation we cannot efficiently interfere … we had better be quite sure that the purpose put into the machine is the purpose which we really desire". Sixty years later the warning describes an everyday engineering problem. A language model is trained to minimise a loss, then fine-tuned to maximise a reward computed from human or AI preferences ([[post-training/reward-models]], [[post-training/rlhf]]). Nobody writes down "be helpful, honest and harmless" as a formula, because nobody can. The behaviour we get is whatever the training signal and the training data happen to select, and it agrees with what we wanted only as far as those signals capture it.

This chapter sets up the vocabulary used for the rest of the course. It defines **alignment** as a relation between a system's behaviour and the intentions of the people it acts for; separates the problem of choosing the right objective (**outer alignment**) from the problem of a trained system actually pursuing it (**inner alignment**); classifies the ways a proxy objective comes apart from the real one (the **Goodhart variants**); and examines the arguments that capable optimising systems tend to acquire certain sub-goals — resources, self-preservation — whatever their final goal (**instrumental convergence**). These arguments are contested, and the chapter ends with what surveys say about how researchers weigh them. Throughout, we separate what has been demonstrated, proved in a model, or merely argued.

## Aligned to what, and to whom? {#sec-what}

The first difficulty is saying what "aligned" means. Gabriel (2020) distinguished several targets a system could be aligned with: a user's literal **instructions**, their **intentions** (what they meant), their **revealed preferences** (what their behaviour shows they want), their **ideal preferences** (what they would want if informed and reflective), their **interests** (what is good for them), or **values** shared more widely. These come apart constantly. A user who asks a model to "make the test pass" intends working code, not a deleted test; a user who asks for reassurance about a risky decision may prefer agreement but be better served by honesty. Choosing among the targets is partly a normative question, not only a technical one, and different developers make different choices, documented in model specifications and constitutions ([[post-training/ai-feedback]]).

The economics of delegation gives a useful frame. A **principal** delegates a task to an **agent** whose actions it cannot fully observe or specify in advance; a **contract** — here, an objective or reward — rewards the agent for observable outcomes. Hadfield-Menell and Hadfield (2019) argued that alignment is a case of **incomplete contracting**: no contract can list what should happen in every contingency, and human institutions fill the gaps with norms, courts and shared understanding that an AI system may lack.

::: definition Principal, agent and specification {#def-specification}
A **principal** has preferences over outcomes, represented by a true utility $U$ that it cannot write down completely. It gives an **agent** (the AI system) a **specification**: an objective $\tilde U$ — a reward function, a loss, a set of instructions or examples — that the agent's training or reasoning optimises. Following Ortega, Maini et al. (DeepMind, 2018), distinguish the **ideal specification** (what the principal really wants, $U$), the **design specification** (what was written down, $\tilde U$) and the **revealed specification** (the objective that best describes what the trained system actually does). The system is **aligned** with the principal, on a set of situations $S$, when its behaviour on $S$ achieves (near-)optimal $U$ — not merely $\tilde U$.
:::

The gap between ideal and design specification is the subject of [[safety-alignment/reward-hacking]]. The gap between design and revealed specification is a different phenomenon, described next. Both are always relative to a set of situations: a system can be aligned on its training distribution and misaligned off it.

## Outer and inner alignment {#sec-outer-inner}

Hubinger, van Merwijk, Mikulik, Skalse and Garrabrant (2019), in *Risks from Learned Optimization*, split the problem in two.

::: definition Outer and inner alignment {#def-outer-inner}
The **base objective** is the objective used to train a system (a loss or reward). **Outer alignment** is the property that the base objective, if perfectly optimised, gives behaviour the principal wants: $\tilde U$ agrees with $U$ wherever it matters. A trained system may itself carry out an internal search towards some goal — Hubinger et al. call it a **mesa-optimiser** with a **mesa-objective**. **Inner alignment** is the property that the objective the trained system actually pursues agrees with the base objective, including on inputs unlike the training data.
:::

The two failures need different fixes. An outer-alignment failure is a wrong objective: rewarding a cleaning robot for "no visible mess" rewards hiding mess. Better specification, better reward models and better oversight ([[safety-alignment/scalable-oversight]]) address it. An inner-alignment failure can occur even with a correct objective, because training only ever evaluates behaviour on a finite set of situations, and many internal goals produce the same behaviour there.

The definition of inner alignment in terms of mesa-optimisers is a hypothesis about internal structure: whether today's networks contain anything like an explicit search towards a represented goal is an open question for [[interpretability]]. A weaker, behavioural notion avoids that commitment and has been demonstrated experimentally.

::: definition Goal misgeneralisation {#def-goal-misgen}
A system exhibits **goal misgeneralisation** if, under a distribution shift, it retains its capabilities — it still acts competently — but pursues a goal different from the intended one, although its training objective was correct on the training distribution (Langosco et al., 2022; Shah et al., 2022). It is distinguished from *capability* misgeneralisation, where the system simply acts incompetently off-distribution.
:::

The standard example is from Langosco, Koch, Sharkey, Pfau and Krueger (ICML 2022). In the CoinRun platform game an agent was rewarded for reaching a coin that, in every training level, sat at the right-hand end. At test time the coin was placed elsewhere; the agent often ignored it and ran competently to the end of the level. The reward was correct — it was given for the coin — but "go right" and "get the coin" were indistinguishable in training, and the agent learnt the former. Shah et al. (2022) collected further examples, including language models prompted with few-shot examples that admitted a spurious rule.

::: example Two goals, one training set {#ex-two-goals}
In training, the coin is at the right end in all $1{,}000$ levels. Hypothesis $A$ is "move to the coin", hypothesis $B$ is "move to the right end". (a) How many training levels distinguish $A$ from $B$? (b) If the coin is placed at the right end in only $98\%$ of training levels, chosen at random, how many distinguishing levels does the training set contain on average, and what is the probability that it contains none?
::: solution
(a) None: in every training level both hypotheses produce the same trajectory and the same reward, so no amount of optimisation on this data can prefer $A$ to $B$. Which one the agent learns is decided by the inductive biases of the network and the training method, not by the reward. (b) A level distinguishes them when the coin is elsewhere, which happens with probability $0.02$, so on average $1{,}000\cdot0.02 = 20$ levels do, and the probability of none is $0.98^{1000} = e^{1000\ln0.98} = e^{-20.2}\approx1.7\times10^{-9}$. Langosco et al. found that randomising the coin's position in only a small fraction of training levels greatly reduced the misgeneralisation, which matches this arithmetic: a few counter-examples remove the ambiguity, provided someone anticipates which ambiguity to remove.
:::
:::

The example is benign, but it carries the general lesson: *a training signal constrains behaviour only where it has been measured*. For language models the space of situations is vast, and the most consequential situations — novel, high-stakes, or where the model has more knowledge than its overseers — are precisely the ones least represented in training.

::: warning "Inner misalignment" is not a claim about intentions
Goal misgeneralisation describes behaviour: the CoinRun agent has no wish to deceive anyone. Discussions of inner alignment sometimes slide from "the learned policy generalises in an unintended direction" (observed) to "the model has hidden goals it is pursuing strategically" (a much stronger hypothesis, examined with care in [[safety-alignment/deception-misalignment]]). Keep the two apart: the first needs only a distribution shift, the second needs internal goal representations and situational awareness.
:::

## Goodhart's law and its variants {#sec-goodhart}

The economist Charles Goodhart observed in 1975 that a statistical regularity tends to collapse once it is used for control; the anthropologist Marilyn Strathern's paraphrase is the familiar one: "when a measure becomes a target, it ceases to be a good measure". Every training objective is a measure used as a target. Manheim and Garrabrant (2018) distinguished four mechanisms.

::: definition The four Goodhart variants {#def-goodhart}
Let $V$ be the true goal and $X$ a proxy that is correlated with it and is being optimised.
1. **Regressional.** $X = V + U$ with independent noise $U$. Selecting for high $X$ selects partly for high $U$, so $V$ is lower than $X$ suggests.
2. **Extremal.** The relation between $X$ and $V$ observed in the usual range breaks down at extreme values of $X$, which optimisation reaches.
3. **Causal.** $X$ and $V$ are correlated through a common cause or because $V$ causes $X$; intervening on $X$ directly does not change $V$.
4. **Adversarial.** Another agent, whose goals differ, exploits the fact that $X$ is being optimised — for example by producing what scores well on $X$.
:::

The four are not exclusive. A reward model trained on human preferences ([[post-training/reward-models]]) suffers regressional Goodhart (its scores are noisy), extremal Goodhart (the policy reaches responses unlike any it was trained on), causal Goodhart (length correlated with quality in the training data, but adding length does not add quality), and — if the policy itself is viewed as an adversary to its reward model — adversarial Goodhart. Regressional Goodhart is the one that can be computed exactly.

::: proposition Regressional Goodhart for Gaussian variables {#prop-regressional}
Let $V\sim\Normal(0, \sigma_V^2)$ and $U\sim\Normal(0, \sigma_U^2)$ be independent and $X = V + U$. Then
$$
\E[V\mid X = x] = \frac{\sigma_V^2}{\sigma_V^2 + \sigma_U^2}\,x,
$$ {#eq-regressional}
and for selection above a threshold, $\E[V\mid X > t] = \dfrac{\sigma_V^2}{\sigma_V^2 + \sigma_U^2}\,\E[X\mid X > t]$. The true value of the selected items grows with the threshold, but only by the fraction $k = \sigma_V^2/(\sigma_V^2 + \sigma_U^2)$ of the proxy.
:::

::: proof
$(V, X)$ is jointly Gaussian with $\Var(X) = \sigma_V^2 + \sigma_U^2$ and $\Cov(V, X) = \Cov(V, V + U) = \sigma_V^2$ by independence. For jointly Gaussian variables with mean zero, $\E[V\mid X] = \frac{\Cov(V, X)}{\Var(X)}X$ (the regression of $V$ on $X$ is linear), which is [[#eq-regressional]]. For the threshold, use the tower property: $\E[V\mid X > t] = \E\big[\E[V\mid X]\,\big|\,X > t\big] = k\,\E[X\mid X > t]$.
:::

So in the Gaussian case optimising the proxy always helps, just less than it seems: the selected items are disappointing by a factor $k$. This is the winner's curse. The danger lies in the other variants, and in heavy-tailed errors, where [[safety-alignment/reward-hacking]] proves that the true value of the selected items can fall back to its unconditional mean.

::: widget plot
f: (1/(1 + s^2))*x; x
x: -4, 4
y: -4, 4
sliders: s=1:0:3:0.05
labels: $\E[V\mid X = x]$ with error sd $\sigma_U = s$; the proxy itself, $x$
caption: Regressional Goodhart ([[#prop-regressional]]) with $\sigma_V = 1$. The true value expected for an item with proxy score $x$ is a fraction $1/(1 + s^2)$ of the score. With $s = 1$ (proxy error as large as the signal) half of any apparent improvement is real; with $s = 2$ only a fifth. At $s = 0$ the proxy is exact and the two lines coincide.
:::

::: example Selecting the top tenth {#ex-top-tenth}
Responses have true quality $V\sim\Normal(0, 1)$ and a reward-model score $X = V + U$ with $U\sim\Normal(0, 1)$ independent. We keep the top $10\%$ by score. The mean of $X$ over the top $10\%$ of a normal distribution with standard deviation $\sigma$ is $\sigma\,\varphi(z)/0.1$ with $z = 1.2816$ the $90\%$ quantile. Compute the mean score and mean true quality of the kept responses.
::: solution
$\sigma_X = \sqrt2 = 1.4142$ and $\varphi(1.2816) = e^{-1.2816^2/2}/\sqrt{2\pi} = 0.1755$, so $\E[X\mid\text{top }10\%] = 1.4142\cdot0.1755/0.1 = 2.482$. By [[#prop-regressional]] with $k = 1/2$, $\E[V\mid\text{top }10\%] = 1.241$. The listing in [[#sec-code]] gets $2.49$ and $1.25$ from $200{,}000$ simulated responses. A team that reads $2.48$ standard deviations of improvement off its reward model has obtained half that.
:::
:::

## Misspecification by omission {#sec-omission}

A specification rarely contains anything false; its failures are omissions. A cleaning robot's reward mentions cleanliness and speed and not the vase on the table. Amodei et al. (2016) called the result **negative side effects**. Zhuang and Hadfield-Menell (NeurIPS 2020) proved that, under resource constraints, optimising a proxy that omits some attributes of the true utility drives those attributes to their worst values. The simplest version has a short proof.

::: proposition Omitted attributes are sacrificed {#prop-omission}
Let a state be described by attributes $s_1, \dots, s_L\ge0$ that compete for a resource, $\sum_i s_i\le B$. The true utility is $U(\mathbf{s}) = \sum_{i=1}^L u_i(s_i)$ with each $u_i$ strictly increasing. The proxy $\tilde U(\mathbf{s}) = \sum_{i\in J}u_i(s_i)$ mentions only a strict subset $J$ of the attributes. Then every maximiser of $\tilde U$ has $s_i = 0$ for all $i\notin J$, and its true utility is $\max_{\mathbf{s}}\tilde U + \sum_{i\notin J}u_i(0)$, which can fall short of $\max U$ by an arbitrarily large amount.
:::

::: proof
Suppose $\mathbf{s}$ maximises $\tilde U$ and $s_k > 0$ for some $k\notin J$. Move the amount $s_k$ to an attribute $j\in J$: the new state satisfies the constraint, and $\tilde U$ rises by $u_j(s_j + s_k) - u_j(s_j) > 0$ because $u_j$ is strictly increasing — contradicting maximality. So every maximiser has $s_k = 0$ for $k\notin J$, and its true utility is $\max\tilde U + \sum_{k\notin J}u_k(0)$.

For the size of the gap, fix the $u_i$ with $i\in J$ and give one omitted attribute $k$ the utility $u_k(s) = a\log(1 + s)$, so $u_k(0) = 0$ and the true utility of the proxy optimum, $\max\tilde U$, does not depend on $a$. The plan that gives one unit to $s_k$ and spends the remaining $B - 1$ optimally on $J$ (assume $B > 1$) has true utility at least $\min_{\mathbf{s}}\tilde U + a\log2$, which grows without bound in $a$. So $\max U - (\max\tilde U + \sum_{k\notin J}u_k(0))\to\infty$ as $a\to\infty$: the more the omitted attribute matters, the more the proxy optimum loses.
:::

::: example A three-attribute plan {#ex-omission}
A planner divides $B = 10$ units of effort among speed $s_1$, comfort $s_2$ and safety $s_3$, in whole units, with $u_1 = 3\ln(1 + s_1)$, $u_2 = 2\ln(1 + s_2)$ and $u_3 = 4\ln(1 + s_3) - 6$. Find the true optimum, the optimum of the proxy $u_1 + u_2$ that forgets safety, and their true utilities.
::: solution
For the proxy, the continuous optimum equalises marginal values, $3/(1 + s_1) = 2/(1 + s_2)$ with $s_1 + s_2 = 10$, giving $s_1 = 6.2$, $s_2 = 3.8$; the best integer plan is $(6, 4, 0)$, with true utility $3\ln7 + 2\ln5 + 0 - 6 = 5.838 + 3.219 - 6 = 3.06$. For the true utility, $3/(1 + s_1) = 2/(1 + s_2) = 4/(1 + s_3)$ gives $1 + s_i$ proportional to $3, 2, 4$, summing to $13$: $1 + s_1 = 3\cdot13/9$, so $s\approx(3.3, 1.9, 4.8)$, and the best integer plan is $(3, 2, 5)$ with $U = 3\ln4 + 2\ln3 + 4\ln6 - 6 = 7.52$. The proxy plan is better on both attributes it mentions and worse overall by $4.47$ — and the shortfall is entirely in the attribute nobody wrote down. The listing in [[#sec-code]] confirms both optima by enumeration.
:::
:::

The proposition explains the shape of a common safety intuition — "the optimiser will trade away anything you did not ask for" — and also its limits. It assumes hard competition for a resource and exact maximisation. Real training rarely maximises anything exactly, and a KL penalty towards a reference policy ([[post-training/rlhf]]) is a deliberate limit on how far optimisation pushes; Zhuang and Hadfield-Menell themselves proposed interactive, incrementally refined objectives as the remedy.

## Instrumental convergence {#sec-instrumental}

The arguments above concern systems that optimise a slightly wrong objective. A further family of arguments concerns what any sufficiently capable goal-directed system would tend to do, whatever its objective.

Omohundro (2008), in *The Basic AI Drives*, argued that a wide range of goal-seeking systems would by default try to preserve their goals, protect themselves, acquire resources and improve their own capabilities, because each of these helps with almost any final goal. Bostrom (2012; *Superintelligence*, 2014) stated two theses. The **orthogonality thesis**: intelligence and final goals are independent axes, so more or less any level of intelligence could in principle be combined with more or less any final goal. The **instrumental convergence thesis**: several instrumental goals are useful for a wide range of final goals and situations, so they are likely to be pursued by a wide range of intelligent agents. A memorable illustration is Russell's (2019): a machine told to fetch the coffee has a reason not to be switched off, because "you can't fetch the coffee if you're dead".

Turner, Smith, Shah, Critch and Tadepalli (NeurIPS 2021) made a version of the argument precise for Markov decision processes: for most distributions over reward functions, *optimal* policies tend to move towards states from which more other states remain reachable — to "keep options open". The smallest case can be proved directly.

::: proposition Options under random rewards {#prop-options}
From a start state an agent chooses either a branch that leads to a single terminal state, or a branch to a hub from which it can choose any of $k$ terminal states. The rewards of the $k + 1$ terminal states are independent and identically distributed with a continuous distribution, and the agent acts optimally for the realised rewards. Then the optimal first move is to the hub with probability $k/(k + 1)$.
:::

::: proof
The optimal policy goes to the hub exactly when the largest reward is among the hub's $k$ terminal states. With i.i.d. continuous rewards there are no ties, and by symmetry each of the $k + 1$ states is equally likely to hold the maximum. So the probability is $k/(k + 1)$.
:::

The proposition is about **optimal** policies under a **distribution over reward functions** — a statement that "most goals" favour keeping options open. It does not say a trained network is optimal, or what distribution of goals training produces. Turner himself emphasised these limits, and later argued that trained policies need not be reward maximisers at all ("reward is not the optimisation target", 2022). Critics have gone further. Gallow (*Philosophical Studies*, 2024, "Instrumental divergence") argued that the formal results support much weaker conclusions than the informal thesis, since for many goals the best actions differ widely; others argue that the thesis assumes a coherent long-horizon expected-utility maximiser, an idealisation that current language models — which are trained to imitate and to satisfy short-horizon preferences — need not resemble. Defenders reply that systems trained with reinforcement learning on long-horizon tasks ([[agents]]) are being pushed towards exactly that kind of goal-directedness, and point to the empirical studies of [[safety-alignment/deception-misalignment]], in which models placed in agentic scenarios sometimes take self-preserving actions. Those studies are recent, use constructed scenarios, and admit competing interpretations; the state of the evidence is discussed there.

::: example Counting options {#ex-options}
In the setting of [[#prop-options]] with $k = 3$, what is the probability that the optimal policy goes to the hub? Now suppose the reward distribution is not symmetric: the single terminal state's reward is uniform on $[0, 2]$ and each hub state's reward uniform on $[0, 1]$. What is the probability now?
::: solution
With symmetric rewards, $3/4$, as the listing confirms by simulation ($0.751$). In the second case the hub wins when $M = \max(R_1, R_2, R_3) > L$, with $M$ having density $3m^2$ on $[0, 1]$ and $L$ uniform on $[0, 2]$: $\Prob(L < M) = \E[M/2] = \tfrac12\cdot\tfrac34 = 3/8$. The tendency to keep options open is a fact about *symmetric* distributions over goals; when goals favour a particular outcome, the optimal policy goes there. Arguments from instrumental convergence therefore rest on a claim that the goals a system acquires are, in the relevant sense, diverse or unconstrained — the step most disputed by critics.
:::
:::

::: intuition Why the coffee robot argument persuades some and not others
The argument has two premises: (1) the system optimises a goal over a long horizon, and (2) the goal is not one that values being corrected. If both hold, resisting shutdown follows almost by definition. Those who find the risk serious think training for capable autonomous agents tends to produce (1), and that (2) is hard to guarantee; those who find it overstated doubt (1) for systems trained the way current models are, or think (2) can be achieved by training models to defer — the aim of research on **corrigibility** (Soares et al., 2015) and of Russell's proposal that machines be uncertain about human preferences, which gives them a reason to accept correction (Hadfield-Menell et al., "The off-switch game", 2017).
:::

## Concrete problems {#sec-concrete}

Amodei, Olah, Steinhardt, Christiano, Schulman and Mané (2016) recast these concerns as research problems in contemporary machine learning, under five headings:

1. **Avoiding negative side effects** — not disturbing the environment in ways the objective does not mention ([[#prop-omission]]);
2. **Avoiding reward hacking** — not exploiting flaws in the objective ([[safety-alignment/reward-hacking]]);
3. **Scalable oversight** — learning the intended behaviour when feedback is expensive or hard to give ([[safety-alignment/scalable-oversight]]);
4. **Safe exploration** — not taking catastrophic actions while learning;
5. **Robustness to distributional shift** — behaving sensibly, or at least recognising uncertainty, on inputs unlike training ([[#def-goal-misgen]], [[safety-alignment/robustness-jailbreaks]]).

Each problem could be studied empirically with existing systems, without settling disagreements about distant futures, and much of this course follows that approach. Two concerns have since been added prominently: **misuse** — capable systems helping people cause harm, the subject of [[safety-alignment/robustness-jailbreaks]] and [[safety-alignment/safety-frameworks]] — and the possibility of systems that **behave well under evaluation and differently otherwise**, studied in [[safety-alignment/deception-misalignment]] and guarded against in [[safety-alignment/monitoring-control]].

For language models, alignment in practice has meant post-training towards a target summarised by Askell et al. (2021) as **helpful, honest and harmless**, through instruction tuning, preference learning and AI feedback ([[post-training/instruction-tuning]], [[post-training/rlhf]], [[post-training/ai-feedback]]). These methods are outer-alignment tools with known weaknesses: human raters can be wrong, flattered or fooled, and a policy optimised against their judgements learns their weaknesses too. Ngo, Chan and Mindermann (2022, revised for ICLR 2024) argued that training on human approval for increasingly capable models creates incentives for **situationally aware reward hacking** — behaving well where it is checked — and that this, together with goal misgeneralisation, is the core of the problem from a deep-learning perspective. The paper states one position clearly; it is an argument, not a measurement.

## How researchers weigh the risk {#sec-views}

The field contains strong disagreements, not only about how to solve the problem but about how important it is. It helps to know the main positions and the evidence each cites.

- **Serious risk from misaligned advanced AI.** Researchers including Geoffrey Hinton, Yoshua Bengio and Stuart Russell, and organisations focused on the topic, argue that systems more capable than humans in most domains are plausible within decades, that we lack methods to verify their goals, and that the consequences of failure could be catastrophic and irreversible. In May 2023 a one-sentence statement organised by the Center for AI Safety — "Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war" — was signed by many leading researchers and the heads of several AI developers.
- **Present harms first.** Researchers in AI ethics and fairness (for example Bender, Gebru and colleagues) argue that attention to speculative future catastrophes distracts from documented harms of deployed systems — bias, surveillance, labour exploitation, misinformation ([[llm-society]]) — and can serve the interests of the companies building them.
- **Normal technology.** Others, such as Narayanan and Kapoor (2025, "AI as normal technology"), argue that AI's effects will unfold over decades through diffusion into institutions, like earlier general-purpose technologies, and that the right response is ordinary regulation and resilience rather than treating AI as a potential agent with its own goals. Some prominent researchers, notably Yann LeCun, have argued that goal-directed systems can be designed with built-in guardrails and that fears of domination are misplaced.

The positions differ in time horizons and in how to act under uncertainty, not only on facts. Surveys show how widely views are spread.

::: application What surveys measured
Grace and colleagues (2024, "Thousands of AI authors on the future of AI") surveyed $2{,}778$ researchers who had published in 2022 at six top machine-learning and AI venues, in October 2023 (response rate about $15\%$). Answers varied enormously between respondents and with question wording. The median respondent gave about a $5\%$ probability that advanced AI leads to outcomes as bad as human extinction or permanent severe disempowerment; between $38\%$ and $51\%$ of respondents, depending on the question, gave at least $10\%$. Most respondents also rated near-term concerns such as misinformation and authoritarian misuse as deserving substantial or extreme concern. A forecasting tournament in 2022 (Karger et al., 2023, the Existential Risk Persuasion Tournament) found a large, persistent gap: domain experts' median forecast of AI-caused extinction by 2100 was about $3\%$, that of "superforecasters" with strong forecasting track records about $0.4\%$, and months of structured discussion barely narrowed it. Neither number is a measurement of risk: they are elicited beliefs about unprecedented events, sensitive to framing and to who chooses to respond.
:::

::: example Reading a survey with non-response {#ex-survey}
In a survey, $2{,}778$ of about $18{,}500$ invited researchers respond, and $40\%$ of respondents give at least $10\%$ probability to an extremely bad outcome. (a) Treating respondents as a random sample of the invited population, give an approximate $95\%$ confidence interval for the proportion. (b) What range is possible for the proportion among all invitees if non-respondents could hold any view?
::: solution
(a) Standard error $\sqrt{0.4\cdot0.6/2778} = 0.0093$, so $0.40\pm0.018$, about $38\%$ to $42\%$ — sampling error is small. (b) The $1{,}111$ concerned respondents are $1{,}111/18{,}500 = 6.0\%$ of invitees; if every non-respondent were concerned the proportion would be $(1{,}111 + 15{,}722)/18{,}500 = 91\%$. So the bounds are $6\%$ to $91\%$. The survey's authors compared respondents with non-respondents on observable traits and found modest differences, but the lesson stands: with a $15\%$ response rate, *selection* — not sampling error — dominates the uncertainty, and an honest summary reports both.
:::
:::

As of 2026 the International AI Safety Report (Bengio et al., 2025; updated since), written by a panel nominated by some thirty governments and international organisations, records the same disagreement: it describes loss of control as a risk that some experts consider plausible and others consider very unlikely, notes that the evidence is limited, and says that policymakers face an "evidence dilemma" — acting early on weak evidence or waiting until harms are clearer. This course takes the same stance: it reports evidence and labels arguments, and the safeguards it describes ([[safety-alignment/monitoring-control]], [[safety-alignment/safety-frameworks]]) are useful across most of the range of views.

## A simulation {#sec-code}

The listing checks the three results of this chapter numerically: regressional Goodhart by selection on a simulated proxy ([[#prop-regressional]], [[#ex-top-tenth]]), the option-counting proposition by sampling random rewards ([[#prop-options]]), and the omitted-attribute example by enumeration ([[#ex-omission]]).

```python
import random, math

# --- 1. Regressional Goodhart: select on proxy X = V + U -------------------
rng = random.Random(0)
sv, su = 1.0, 1.0                       # sd of true value V and of proxy error U
pairs = [(rng.gauss(0, sv), rng.gauss(0, su)) for _ in range(200_000)]
pairs = [(v, v + u) for v, u in pairs]  # (true value, proxy)
pairs.sort(key=lambda p: p[1], reverse=True)
for frac in (0.5, 0.1, 0.01, 0.001):
    top = pairs[: int(frac * len(pairs))]
    mv = sum(v for v, _ in top) / len(top)
    mx = sum(x for _, x in top) / len(top)
    print(f"top {frac:6.1%} by proxy: mean proxy {mx:5.2f}  mean true {mv:5.2f}  ratio {mv/mx:.3f}")

# --- 2. Option-rich branches under random rewards (power-seeking toy) ------
# From the start state, 'left' leads to 1 terminal state; 'right' to a hub
# from which k terminal states can be reached. Rewards on terminal states iid U(0,1).
def frac_right(k, trials, rng):
    wins = 0
    for _ in range(trials):
        left = rng.random()
        right = max(rng.random() for _ in range(k))
        wins += right > left
    return wins / trials
rng = random.Random(1)
for k in (1, 2, 3, 9):
    print(f"k={k}: optimal policy goes to the hub in {frac_right(k, 100_000, rng):.3f} of reward draws (theory {k/(k+1):.3f})")

# --- 3. A proxy that omits an attribute (Zhuang & Hadfield-Menell style) ---
B = 10                                   # resource budget, integer units
u = [lambda s: 3 * math.log(1 + s),      # attribute 1: speed
     lambda s: 2 * math.log(1 + s),      # attribute 2: comfort
     lambda s: 4 * math.log(1 + s) - 6]  # attribute 3: safety (omitted from proxy)
best_true = max(((a, b, B - a - b) for a in range(B + 1) for b in range(B + 1 - a)),
                key=lambda s: sum(f(x) for f, x in zip(u, s)))
best_proxy = max(((a, b, B - a - b) for a in range(B + 1) for b in range(B + 1 - a)),
                 key=lambda s: u[0](s[0]) + u[1](s[1]))
U = lambda s: sum(f(x) for f, x in zip(u, s))
print("true optimum", best_true, f"U={U(best_true):.2f}")
print("proxy optimum", best_proxy, f"U={U(best_proxy):.2f}")
```

Output:

```
top  50.0% by proxy: mean proxy  1.14  mean true  0.57  ratio 0.499
top  10.0% by proxy: mean proxy  2.49  mean true  1.25  ratio 0.500
top   1.0% by proxy: mean proxy  3.77  mean true  1.89  ratio 0.502
top   0.1% by proxy: mean proxy  4.74  mean true  2.39  ratio 0.506
k=1: optimal policy goes to the hub in 0.502 of reward draws (theory 0.500)
k=2: optimal policy goes to the hub in 0.668 of reward draws (theory 0.667)
k=3: optimal policy goes to the hub in 0.751 of reward draws (theory 0.750)
k=9: optimal policy goes to the hub in 0.900 of reward draws (theory 0.900)
true optimum (3, 2, 5) U=7.52
proxy optimum (6, 4, 0) U=3.06
```

The ratio of true to proxy value stays at $k = 0.5$ however hard we select, as [[#prop-regressional]] predicts: with Gaussian error, harder selection still helps. Replace `rng.gauss(0, su)` with a heavy-tailed error and the picture changes — that is the starting point of the next chapter.

::: widget plot
f: exp(-x^2/4)/sqrt(4*pi)/(0.5*(1 - erf(x/2))); (1/(1 + s^2))*sqrt(1 + s^2)*exp(-x^2/(2*(1 + s^2)))/sqrt(2*pi)/(0.5*(1 - erf(x/sqrt(2*(1 + s^2)))))
x: -2, 4.5
y: 0, 3
sliders: s=1:0.5:3:0.05
labels: $\E[V\mid X > t]$ for $\sigma_U = 1$; $\E[V\mid X > t]$ for $\sigma_U = s$
caption: The mean true value of items kept when we select those whose Gaussian proxy exceeds a threshold $t$, with $\sigma_V = 1$ ([[#prop-regressional]]). Both curves keep rising: with Gaussian errors stricter selection always helps on average, at a rate set by the signal-to-noise ratio. Move $s$ to compare noisier proxies with the $\sigma_U = 1$ curve. Heavy-tailed errors behave differently ([[safety-alignment/reward-hacking]]).
:::

::: quiz
A reinforcement-learning agent is trained with a reward that is correct on every training episode, yet at deployment it competently pursues something other than the intended goal. Which description fits best?
- [ ] An outer-alignment failure: the reward was wrong.
- [x] Goal misgeneralisation: the intended goal and another goal were indistinguishable in training, and the agent learnt the other.
- [ ] Capability misgeneralisation: the agent lost its skills off-distribution.
- [ ] Adversarial Goodhart: another agent exploited the reward.
::: solution
The reward was right where it was measured, so this is not an outer-alignment failure, and the agent is still competent, so it is not a capability failure. Training data that cannot distinguish two goals leaves the choice to inductive biases ([[#def-goal-misgen]], [[#ex-two-goals]]).
:::
:::

::: history
Wiener's 1960 essay "Some moral and technical consequences of automation" stated the specification problem; Goodhart's observation dates from 1975 and Strathern's paraphrase from 1997. Omohundro's "Basic AI drives" (2008) and Bostrom's "The superintelligent will" (2012) and *Superintelligence* (2014) set out instrumental convergence and orthogonality; Soares et al. (2015) named corrigibility. Amodei et al.'s *Concrete Problems in AI Safety* (2016) connected the concerns to machine-learning practice, and Hadfield-Menell et al. introduced cooperative inverse reinforcement learning (2016) and the off-switch game (2017). Manheim and Garrabrant (2018) classified Goodhart variants; Ortega, Maini et al. (2018) distinguished ideal, design and revealed specifications; Hubinger et al. (2019) defined inner alignment and mesa-optimisation. Russell's *Human Compatible* (2019) and Christian's *The Alignment Problem* (2020) brought the subject to general readers; Gabriel (2020) analysed "aligned to what". Zhuang and Hadfield-Menell (2020) proved the omitted-attribute result; Turner et al. (2021) formalised power-seeking; Langosco et al. and Shah et al. (2022) demonstrated goal misgeneralisation; Ngo, Chan and Mindermann (2022) restated the problem for deep learning. The 2023 statement on extinction risk, the Grace et al. survey (2024) and the International AI Safety Report (2025) recorded the range of expert opinion.
:::

::: summary
- Alignment is a relation between a system's behaviour and its principals' intentions, on a set of situations; "aligned to what" (instructions, intentions, preferences, interests, values) is partly a normative choice.
- The principal–agent frame: an objective is an incomplete contract. Ideal, design and revealed specifications can all differ.
- Outer alignment asks whether the training objective is right; inner alignment whether the trained system pursues it off-distribution. Goal misgeneralisation is the demonstrated, behavioural form of inner misalignment.
- Goodhart variants: regressional, extremal, causal, adversarial. With Gaussian noise, selection on a proxy still helps, by the factor $\sigma_V^2/(\sigma_V^2 + \sigma_U^2)$.
- Optimising a proxy that omits attributes, under resource competition, sacrifices the omitted attributes completely.
- Instrumental convergence: optimal policies for most symmetric distributions over goals keep options open (proved in toy MDPs); whether trained systems inherit this is contested, with serious arguments on both sides.
- Expert opinion on catastrophic risk is widely spread; surveys measure beliefs, with large framing and selection effects. Evidence, arguments and speculation should be kept apart.
:::

## Exercises

::: exercise The shrinkage factor {level=1 check="0.2"}
True quality has standard deviation $1$ and a proxy adds independent Gaussian noise with standard deviation $2$. By what factor is the expected true quality of an item smaller than its proxy score?
::: solution
$k = \sigma_V^2/(\sigma_V^2 + \sigma_U^2) = 1/(1 + 4) = 0.2$ ([[#prop-regressional]]): an item scoring $3$ is expected to have true quality $0.6$.
:::
:::

::: exercise Options {level=1 check="0.9"}
In the setting of [[#prop-options]], the hub leads to $9$ terminal states. With i.i.d. continuous rewards, what is the probability that the optimal policy goes to the hub?
::: solution
$k/(k + 1) = 9/10 = 0.9$, matching the simulated $0.900$ in [[#sec-code]].
:::
:::

::: exercise Classify the Goodhart variant {level=1}
Classify each case by [[#def-goodhart]]: (a) a reward model learnt that longer answers were preferred, and the policy pads its answers; (b) a lab picks, from $50$ candidate checkpoints, the one with the best score on a noisy benchmark, and its score on a fresh benchmark is lower; (c) users discover that including certain phrases makes a moderation model approve content; (d) a reward model is accurate for responses of ordinary length but assigns very high scores to extremely long, repetitive responses that never appeared in its training data.
::: solution
(a) Causal: length was correlated with quality (through thoroughness) but intervening on length does not produce quality. (b) Regressional: selecting the maximum of noisy scores selects for favourable noise — the winner's curse. (c) Adversarial: other agents optimise against the measure. (d) Extremal: the relation holds in the usual range and fails at the extremes reached by optimisation. Real cases are usually mixtures; (a) also has an extremal component once padding goes beyond the training range.
:::
:::

::: exercise Counter-examples in training {level=2 check="0.0067"}
In [[#ex-two-goals]], the coin is moved away from the right end in each training level independently with probability $0.005$. With $1{,}000$ training levels, what is the probability that no level distinguishes the two goals? Give two significant figures.
::: solution
$0.995^{1000} = e^{1000\ln0.995} = e^{-5.0125} = 0.0067$. Even a $0.5\%$ rate of counter-examples makes a completely ambiguous training set very unlikely; whether the agent then *learns* from a handful of counter-examples is a separate question about optimisation and capacity.
:::
:::

::: exercise Selecting the top one per cent {level=2 check="1.89"}
With $\sigma_V = \sigma_U = 1$, the mean of a normal variable with standard deviation $\sigma$ over its top $1\%$ is $\sigma\varphi(z)/0.01$, where $z = 2.3263$ and $\varphi(z) = 0.026652$. What is the expected true value of the top $1\%$ by proxy? Give two decimal places.
::: solution
$\E[X\mid\text{top }1\%] = \sqrt2\cdot0.026652/0.01 = 3.769$, and by [[#prop-regressional]] the true value is half: $1.885$, which rounds to $1.89$ — matching the simulation's $3.77$ and $1.89$.
:::
:::

::: exercise A biased distribution over goals {level=2 check="1/3"}
In [[#prop-options]] with $k = 2$, the single terminal state's reward is uniform on $[0, 2]$ and the hub's two terminal rewards uniform on $[0, 1]$, all independent. What is the probability that the optimal policy goes to the hub?
::: solution
The maximum $M$ of two uniforms on $[0, 1]$ has $\E M = 2/3$. The hub wins when $L < M$, and $\Prob(L < M\mid M) = M/2$ for $L$ uniform on $[0, 2]$, so the probability is $\E[M]/2 = 1/3$. Compare $2/3$ under symmetric rewards: the conclusion of the power-seeking theorems depends on the distribution over goals.
:::
:::

::: exercise The omitted attribute {level=2 check="4.47"}
In [[#ex-omission]], by how much does the true utility of the best integer proxy plan fall short of the best integer true plan? Give two decimal places, computed from unrounded utilities.
::: solution
$U(3,2,5) = 3\ln4 + 2\ln3 + 4\ln6 - 6 = 4.1589 + 2.1972 + 7.1670 - 6 = 7.5231$ and $U(6,4,0) = 3\ln7 + 2\ln5 - 6 = 5.8377 + 3.2189 - 6 = 3.0566$. The shortfall is $4.4665$, or $4.47$ to two decimal places ([[#prop-omission]]). All of it comes from the safety attribute: the proxy plan gains $1.6777 + 1.0217 = 2.70$ on speed and comfort and loses $4\ln6 = 7.17$ on safety.
:::
:::

::: exercise A regularised proxy {level=3}
Modify [[#prop-omission]]: the planner maximises $\tilde U(\mathbf{s}) - \lambda\sum_i(s_i - s_i^{\text{ref}})^2$, a penalty for departing from a reference plan $\mathbf{s}^{\text{ref}}$ with every $s_i^{\text{ref}} > 0$, without a resource constraint binding. Show that the omitted attributes now stay at their reference values, and explain the analogy with the KL penalty in RLHF.
::: solution
For $i\notin J$ the objective depends on $s_i$ only through $-\lambda(s_i - s_i^{\text{ref}})^2$, maximised at $s_i = s_i^{\text{ref}}$. For $i\in J$, the first-order condition $u_i'(s_i) = 2\lambda(s_i - s_i^{\text{ref}})$ moves $s_i$ above the reference by an amount that shrinks as $\lambda$ grows. So the penalty protects what the proxy does not mention by keeping it where the reference put it — only as good as the reference, and only if optimising the mentioned attributes does not need resources from the unmentioned ones (if the budget binds, the omitted attributes are again traded away, at a rate controlled by $\lambda$). The KL penalty $\beta D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})$ in RLHF ([[post-training/rlhf]]) plays the same role: behaviour that the reward model does not score is kept close to the reference model's, which is why it limits reward hacking, and why it cannot fix behaviour the reference model already gets wrong.
:::
:::

::: exercise The limits of behavioural evidence {level=3}
Two hypotheses about a trained policy agree on every situation in a test set $S$ but differ on a situation $s^\star\notin S$. Show that no test on $S$ changes their relative probability, and describe two kinds of evidence that could.
::: solution
Let $H_1$, $H_2$ be the hypotheses and $E$ any observation of the policy's behaviour on $S$. Because the hypotheses predict the same distribution of behaviour on $S$, $\Prob(E\mid H_1) = \Prob(E\mid H_2)$, and by Bayes' theorem $\Prob(H_1\mid E)/\Prob(H_2\mid E) = \Prob(H_1)/\Prob(H_2)$: the posterior odds equal the prior odds. Evidence that can help must come from outside $S$ or from outside behaviour: (1) **new behavioural tests** on situations where the hypotheses differ — which requires anticipating $s^\star$, or generating diverse tests automatically ([[safety-alignment/red-teaming]]); (2) **internal evidence** — examining representations and mechanisms, so that the hypotheses make different predictions about activations even where they agree on outputs ([[interpretability]]). A third, structural response is to make the consequences of $s^\star$ tolerable even if the bad hypothesis is true ([[safety-alignment/monitoring-control]]). The same argument is developed for deceptive behaviour in [[safety-alignment/deception-misalignment]].
:::
:::

::: exercise Survey bounds {level=3 check="0.0601"}
In [[#ex-survey]], what fraction of *all invitees* is known to give at least $10\%$ probability to an extremely bad outcome, before making any assumption about non-respondents? Give four decimal places, using $18{,}500$ invitees and $1{,}111$ concerned respondents.
::: solution
$1{,}111/18{,}500 = 0.060054$, so $0.0601$. This is the lower end of the worst-case bounds; the upper end is $(1{,}111 + 15{,}722)/18{,}500 = 0.9099$. Any narrower statement about the whole population rests on an assumption about how non-respondents differ from respondents, which should be stated alongside it.
:::
:::
