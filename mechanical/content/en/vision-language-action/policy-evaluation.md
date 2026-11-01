"Our policy succeeds 85% of the time." The sentence is the end product of most robot-learning work, and on its own it says very little. Eighty-five per cent of how many trials — 20 or 2,000? Starting from which positions, chosen by whom? Compared with what, measured on the same day, by an evaluator who knew which policy was running? A difference of 10 percentage points between two policies, each tried 20 times, is well within what chance alone produces; a policy that is excellent on the objects it was trained with may fail on the first new mug a customer puts in front of it. Learned policies cannot be verified line by line like a program, so their evaluation *is* their specification: what you measure, and how carefully, is all you know about what you will ship.

This chapter treats evaluation as an experiment. We define the metrics, model success as a binomial outcome and build confidence intervals that behave properly for small numbers of trials (the Wilson interval), and compare two policies with tests that exploit matched initial conditions. We then cover the protocol — blind, interleaved, pre-registered trials — and the axes along which generalisation should be tested. The last part is about simulation: the benchmarks used to compare methods (LIBERO, SIMPLER, CALVIN and others), what they can and cannot tell you, and the sim-to-real gap. The statistics are those of [Confidence intervals](/learn/maths/lesson.php?c=statistics&l=confidence-intervals) and [Hypothesis testing](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing) in Maths Atlas; the same issues for language models are discussed in [Statistics of evaluation](/learn/llm/lesson.php?c=evaluation&l=evaluation-statistics).

## What to measure {#sec-metrics}

::: definition Trial and success rate {#def-trial}
An **evaluation trial** is one episode of a policy from a specified **initial condition** (object positions and identities, robot start pose, scene, instruction) until success, failure or a time limit, judged by a **success criterion** fixed in advance. The **success rate** of a policy on a distribution of initial conditions is the probability $p$ that a trial from that distribution succeeds; it is estimated from $n$ independent trials with $k$ successes by $\hat p = k/n$.
:::

A binary success flag hides a lot, so evaluations usually also record:

- **progress or partial credit** for multi-stage tasks (grasped, lifted, placed, released), which shows *where* a policy fails;
- **time to completion** among successes, and the throughput a cell would achieve (picks per hour);
- **interventions**: how often a human must help, as interventions per hour or mean time between interventions in long runs;
- **safety events**: collisions, force-limit or speed-limit trips, dropped objects, protective stops ([[vision-language-action/vla-deployment]]);
- **failure categories**: perception (wrong object), grasp, collision, timeout, freeze.

The success criterion must be precise enough that two evaluators agree: "the cup is upright on the plate with its base fully inside the rim, and the gripper has released it" rather than "the cup is on the plate". Write it down before the first trial.

## Uncertainty of a success rate {#sec-intervals}

If trials are independent with a common success probability $p$, the number of successes $K$ in $n$ trials is binomial, $K\sim\Bin(n, p)$, with mean $np$ and variance $np(1-p)$; the standard error of $\hat p$ is $\sqrt{p(1-p)/n}$. The textbook ("Wald") 95% interval $\hat p\pm1.96\sqrt{\hat p(1-\hat p)/n}$ is unreliable at the sample sizes of robot evaluation: with 17 successes in 20 it gives $[0.69, 1.01]$ — past 100% — and with 0 or $n$ successes it has zero width. The Wilson score interval does not have these defects.

::: proposition Wilson score interval {#prop-wilson}
Let $\hat p = k/n$ and let $z$ be the standard normal quantile for the chosen confidence level ($z = 1.96$ for 95%). The set of values $p$ for which $\lvert\hat p - p\rvert\le z\sqrt{p(1-p)/n}$ is the interval with centre and half-width
$$
\tilde p = \frac{\hat p + \dfrac{z^2}{2n}}{1 + \dfrac{z^2}{n}},\qquad w = \frac{z}{1 + \dfrac{z^2}{n}}\sqrt{\frac{\hat p(1-\hat p)}{n} + \frac{z^2}{4n^2}} .
$$ {#eq-wilson}
It always lies within $[0, 1]$, and it has approximately the nominal coverage for large $n$ — and close to it even for small $n$.
:::

::: proof
The interval collects the values of $p$ not rejected by the normal-approximation ("score") test, which uses the standard error at the hypothesised $p$ rather than at $\hat p$. Square the condition: $(\hat p - p)^2\le z^2p(1-p)/n$. With $c = z^2/n$ this is
$$
(1 + c)\,p^2 - (2\hat p + c)\,p + \hat p^2\le0,
$$
a quadratic in $p$ with positive leading coefficient, so the solution set is the interval between its roots
$$
p_\pm = \frac{2\hat p + c\pm\sqrt{(2\hat p + c)^2 - 4(1+c)\hat p^2}}{2(1+c)} .
$$
The discriminant simplifies: $(2\hat p + c)^2 - 4(1+c)\hat p^2 = 4\hat p c + c^2 - 4c\hat p^2 = 4c\,\hat p(1-\hat p) + c^2$. Hence the centre is $(\hat p + c/2)/(1+c)$ and the half-width is $\sqrt{4c\hat p(1-\hat p) + c^2}/\bigl(2(1+c)\bigr) = \frac{\sqrt c}{1+c}\sqrt{\hat p(1-\hat p) + c/4}$; substituting $c = z^2/n$ gives [[#eq-wilson]]. At $p = 0$ and $p = 1$ the right side of the original condition is zero while the left is $\hat p^2\ge0$ or $(1-\hat p)^2\ge0$, so the roots lie in $[0,1]$ — they reach 0 only if $\hat p = 0$ and 1 only if $\hat p = 1$. Coverage: by the central limit theorem $(\hat p - p)/\sqrt{p(1-p)/n}$ is approximately standard normal, so the condition holds with probability about 95% for $z = 1.96$.
:::

::: example Wilson intervals for small evaluations {#ex-wilson}
Find 95% Wilson intervals for (a) 17 successes in 20 trials, (b) 0 in 20, and (c) 85 in 100. Compare (a) with the Wald interval.
::: solution
(a) $\hat p = 0.85$, $c = 1.96^2/20 = 0.1921$. Centre $(0.85 + 0.0960)/1.1921 = 0.794$. Half-width $\frac{1.96}{1.1921}\sqrt{0.85\times0.15/20 + 1.96^2/1600} = 1.644\sqrt{0.006375 + 0.002401} = 1.644\times0.09368 = 0.154$. Interval $[0.640, 0.948]$. Wald: $0.85\pm1.96\times0.0798 = [0.694, 1.006]$ — shifted upwards and impossible at the top.
(b) $\hat p = 0$: centre $0.0960/1.1921 = 0.0806$, half-width $1.644\sqrt{0.002401} = 0.0806$; interval $[0, 0.161]$. Even with no successes in 20 trials, a true success rate of 16% cannot be excluded. (The "rule of three" gives a quick approximation to an exact one-sided 95% upper bound for zero events: $3/n = 0.15$.)
(c) $c = 0.03842$; centre $(0.85 + 0.0192)/1.0384 = 0.837$; half-width $\frac{1.96}{1.0384}\sqrt{0.001275 + 0.000096} = 1.8875\times0.03703 = 0.0699$; interval $[0.767, 0.907]$.
Sanity check: five times the trials shrink the width from 0.31 to 0.14, by about $\sqrt5 = 2.2$, as the $1/\sqrt n$ law predicts. With 20 trials, an evaluation can distinguish "about 80%" from "about 50%", but not 80% from 90%.
:::
:::

::: widget plot
f: 1.96/(1 + 1.96^2/x)*sqrt(p*(1 - p)/x + 1.96^2/(4*x^2))
x: 5, 400
y: 0, 0.4
sliders: p=0.05:0.05:0.95
labels: \text{Wilson 95\% half-width}
caption: Half-width of the 95% Wilson interval against the number of trials $n$, for an observed success rate $p$ set by the slider. At $n = 20$ the half-width is about 0.15–0.2 for success rates between 50% and 85%; reaching $\pm5$ percentage points needs several hundred trials. Notice that the curve barely depends on $p$ in the middle of the range — evaluation cost is set mainly by the precision you need.
:::

::: widget distribution
dist: binomial
params: n=20, p=0.8
a: 14
b: 19
caption: The number of successes in 20 trials of a policy whose true success rate is 80%. Results anywhere from 14 to 19 are common (shaded probability), so two runs of the same policy on the same tasks can differ by 25 percentage points. Change $n$ and $p$ to see how much an evaluation of your size can resolve.
:::

### Independence and what $p$ refers to

The binomial model assumes independent trials with a common $p$. Neither holds exactly. Trials from *different* initial conditions have different success probabilities (an object near the edge of the workspace is harder), and $\hat p$ then estimates the average over the chosen set of conditions — which is only meaningful if that set represents the conditions of use. Trials can be correlated through time: the robot warms up, the lighting changes during the afternoon, the evaluator learns to reset objects more favourably. Interleaving the policies being compared, and fixing the list of initial conditions, keeps these effects from biasing comparisons.

## Comparing two policies {#sec-compare}

Most evaluations are comparisons: new checkpoint against old, fine-tuned against base, with or without wrist camera. For two independent groups of trials, the standard exact test is **Fisher's exact test** on the $2\times2$ table of successes and failures. Robot evaluations can do better, because the same initial conditions can be used for both policies.

::: definition Matched-pair evaluation {#def-paired}
In a **matched-pair** (paired) evaluation each of $m$ initial conditions is run once with policy A and once with policy B, in random order. Each condition then falls into one of four cells: both succeed ($n_{11}$), only A succeeds ($n_{10}$), only B succeeds ($n_{01}$), both fail ($n_{00}$). The pairs with different outcomes, $n_{10}$ and $n_{01}$, are the **discordant** pairs.
:::

::: proposition McNemar's exact test {#prop-mcnemar}
If A and B have the same success probability on every initial condition (the null hypothesis), then, conditional on the number of discordant pairs $n_d = n_{10} + n_{01}$, the count $n_{10}$ is binomial $\Bin(n_d, \tfrac12)$. The two-sided $p$-value of an observed split is $2\Prob\bigl(X\le\min(n_{10}, n_{01})\bigr)$ for $X\sim\Bin(n_d, \tfrac12)$ (capped at 1).
:::

::: proof
Fix one initial condition with success probability $q$ for both policies, and suppose the two trials are independent. The probability that only A succeeds is $q(1-q)$, and that only B succeeds is $(1-q)q$ — the same. So, given that a pair is discordant, it is of type "only A" with probability $\tfrac12$, whatever $q$ is. Pairs from different conditions are independent, so given $n_d$ discordant pairs, $n_{10}$ counts successes in $n_d$ independent trials of probability $\tfrac12$. The two-sided $p$-value doubles the tail probability of a split at least as uneven as the one observed (the distribution is symmetric).
:::

The concordant pairs carry no information about the *difference* between the policies, and the test ignores them. Easy conditions (both succeed) and impossible ones (both fail) no longer add noise, which is why paired designs need fewer trials.

::: example Paired and unpaired analyses of the same trials {#ex-paired}
Thirty initial conditions are each run with policies A and B. Both succeed in 14, only A in 10, only B in 2, both fail in 4. (a) Give each policy's success rate with a Wilson interval. (b) Test the difference with Fisher's exact test, ignoring the pairing. (c) Test it with McNemar's exact test.
::: solution
(a) A: $14 + 10 = 24$ of 30, $\hat p = 0.80$, Wilson $[0.63, 0.91]$. B: $14 + 2 = 16$ of 30, $0.53$, Wilson $[0.36, 0.70]$. The intervals overlap slightly.
(b) The $2\times2$ table is 24/6 against 16/14; Fisher's exact two-sided $p = 0.054$ — not significant at the 5% level.
(c) Discordant pairs $n_d = 12$, split 10 to 2. $\Prob(X\le2) = (1 + 12 + 66)/2^{12} = 79/4096 = 0.0193$ for $X\sim\Bin(12, \tfrac12)$; two-sided $p = 0.039$ — significant at 5%.
The same 60 trials give a clearer answer when analysed as pairs, because the 18 concordant conditions (14 easy, 4 impossible) are removed from the comparison. Sanity check: a 10-to-2 split of the conditions on which the policies differ is a strong pattern, and A's success rate is 27 percentage points higher; both analyses point the same way, and only the paired one is sensitive enough to confirm it.
:::
:::

::: warning Overlapping intervals are not a test
Two 95% confidence intervals can overlap even when the difference between the policies is statistically significant ([[#ex-paired]]), and non-overlap is a much stricter criterion than a 5% test. Compare policies with a test (or an interval) for the *difference*, paired when the design is paired.
:::

### How many trials?

For two independent groups, the number of trials per policy needed to detect a difference between success rates $p_1$ and $p_2$ with a two-sided test at significance level $\alpha$ and power $1-\beta$ is approximately
$$
n\approx\frac{\Bigl(z_{1-\alpha/2}\sqrt{2\bar p(1-\bar p)} + z_{1-\beta}\sqrt{p_1(1-p_1) + p_2(1-p_2)}\Bigr)^2}{(p_1 - p_2)^2},\qquad \bar p = \frac{p_1 + p_2}{2},
$$ {#eq-samplesize}
the standard normal-approximation formula for comparing two proportions. Paired designs need fewer trials, by an amount that depends on how strongly the outcomes of the two policies are correlated across conditions.

::: example Planning an A/B test {#ex-samplesize}
A new checkpoint is expected to raise success from 60% to 80%. How many trials per policy are needed for 80% power at the 5% level with unpaired trials? If each trial takes 2 minutes including reset, how long does the evaluation take?
::: solution
$\bar p = 0.70$; $z_{0.975} = 1.960$, $z_{0.80} = 0.842$. Numerator: $1.960\sqrt{2\times0.7\times0.3} + 0.842\sqrt{0.24 + 0.16} = 1.960\times0.6481 + 0.842\times0.6325 = 1.2703 + 0.5323 = 1.8026$; squared $3.249$. Denominator $0.04$. $n\approx81$ trials per policy.
Time: $2\times81\times2\,\mathrm{min} = 324\,\mathrm{min} = 5.4\,\mathrm h$ of robot and operator time.
Sanity check: the frequently seen "20 trials each" would detect a 20-point improvement only about a quarter to a third of the time; such evaluations miss most real improvements of this size and, when they do find a "significant" difference, tend to overstate it. A paired design over a fixed set of conditions is the cheapest way to do better.
:::
:::

## Protocol {#sec-protocol}

Statistics cannot rescue a biased experiment. The following practices, borrowed from clinical trials and now common in careful robot-learning papers, remove the main sources of bias.

::: algorithm A real-world evaluation protocol {#alg-protocol}
1. **Fix the question and the criteria** before running anything: the policies, the tasks, the success criterion, partial-credit stages, the time limit and the number of trials.
2. **Fix the initial conditions**: a list of object positions, identities and orientations (sampled from the intended distribution, or a grid), placed with a template, markers or an overlay of a reference image on the live camera view.
3. **Pair and randomise**: run each condition with every policy; randomise the order of policies within each condition, so that no policy benefits from time-of-day, battery or wear effects.
4. **Blind the evaluator**: the person resetting the scene and judging success should not know which policy is running (a script chooses and loads it).
5. **Record everything**: video of every trial, the policy and checkpoint identifier, timestamps, the judged outcome and the failure category.
6. **Select checkpoints on separate conditions**: choose hyperparameters and checkpoints on a validation set of conditions; report final results on held-out ones.
7. **Report fully**: number of trials, intervals for each rate and for the difference, the test used, the list of conditions, and failure analysis — including the failures.
:::

::: example The winner's curse of checkpoint selection {#ex-selection}
Five checkpoints of the same training run all have a true success rate of 60%. Each is evaluated with 20 trials and the best is reported. What success rate is reported on average?
::: solution
Each observed rate is $\Bin(20, 0.6)/20$, with standard deviation $\sqrt{0.24/20} = 0.110$. The maximum of five such draws is biased upwards; by simulation its expected value is $0.725$, i.e. 72.5%, about 12 percentage points above the truth. The expected maximum of five independent standard normals is about $1.16$, giving the estimate $0.60 + 1.16\times0.110 = 0.73$, consistent with the simulation.
The fix is step 6 of the protocol: choose the checkpoint on one set of trials and report its rate on a fresh set. Sanity check: with 100 trials per checkpoint the standard deviation would be $0.049$ and the bias about 6 points — smaller, but still not zero.
:::
:::

## Generalisation {#sec-generalisation}

A success rate is defined relative to a distribution of initial conditions ([[#def-trial]]). A policy is useful only if that distribution matches what it will meet in use, so evaluations probe along named **generalisation axes**, each changing one thing relative to training:

| axis | example variation |
|---|---|
| position | objects placed outside the demonstrated region, rotated |
| object instance | a different mug of the same category; a new SKU |
| distractors | extra objects, clutter, similar-looking objects |
| visual scene | lighting, table surface, background, camera pose shifted by a few centimetres |
| language | paraphrased instructions, new combinations of known objects and verbs, new concepts |
| task | a task not in the fine-tuning data |
| embodiment | a different gripper, arm or control rate |
| physical | heavier, slippery or deformable objects |

Reporting success separately along each axis shows *what* a policy has learned; a single pooled number does not. VLA papers often distinguish **visual**, **physical** and **semantic** generalisation — the last being the main promise of web pretraining ([[vision-language-action/vla-architectures]]).

::: quiz
A policy succeeds in 95% of trials with the five objects used in training, and in 45% with five new objects of the same categories. A colleague reports "70% success". What is wrong with this report?
- [ ] Nothing; 70% is the correct average.
- [x] The pooled number describes neither condition; the two rates should be reported separately, because they answer different questions (in-distribution performance and object generalisation).
- [ ] The new-object trials should be discarded because they were not in the training data.
::: solution
The average depends on the arbitrary 50/50 mix of old and new objects in the evaluation. A customer using only new objects would see about 45%. Report per-axis results with their intervals.
:::
:::

## Simulation benchmarks {#sec-sim}

Real-world evaluation is slow, expensive and hard to reproduce across labs. Simulated benchmarks give fast, repeatable comparisons:

- **Meta-World** (2019): 50 manipulation tasks with a simulated Sawyer arm in MuJoCo, used mainly for multi-task and meta-reinforcement learning.
- **RLBench** (2020): about 100 tasks with a simulated Franka arm, with demonstrations generated by motion planning.
- **robomimic** (2021): tasks and human demonstrations of varying quality, designed for studying offline imitation learning.
- **CALVIN** (2022): long-horizon, language-conditioned tasks in a tabletop scene with a Franka arm; policies are scored on how many instructions of a chain they complete in a row.
- **LIBERO** (2023): 130 language-conditioned tasks in suites that isolate spatial layout, object, goal and long-horizon variation, with human demonstrations; widely used to evaluate VLA fine-tuning. By 2025 the best reported success rates on its main suites exceeded 95%, so it no longer separates strong methods well.
- **SIMPLER** (2024): simulated replicas of the real setups behind two widely used real datasets (Google's mobile manipulator and the WidowX/Bridge setup), built to evaluate policies trained on *real* data, with matched camera views and visual appearance; its authors measured how well simulated results ranked policies compared with real evaluations.
- **ManiSkill** (versions 2 and 3, 2023–24) and others offer GPU-parallel simulation with many tasks and robots.

::: remark What benchmarks are for
A benchmark measures progress on *its* tasks. High scores on LIBERO say that a method learns well from a few dozen demonstrations in that simulator; they do not say that it will grasp your parts. Use benchmarks to debug training code and to compare methods under controlled conditions; use your own evaluation to decide what to ship.
:::

### The sim-to-real gap

Policies that work in simulation often fail on hardware, and rankings of policies in simulation need not match rankings on the robot. The gap has several sources:

- **visual**: rendering differs from camera images in texture, lighting, reflections, noise and motion blur;
- **physical**: contact, friction and the behaviour of deformable or articulated objects are approximations, often tuned for stability rather than fidelity;
- **sensing and timing**: real cameras have latency and jitter, real joint encoders noise, real controllers tracking error and delay;
- **embodiment details**: cables, compliance, gearbox backlash, gripper pad wear.

Remedies include **domain randomisation** (training over randomised textures, lighting, masses and frictions so that reality looks like one more sample), careful **system identification**, photorealistic rendering or reconstruction of real scenes, and — for evaluation — validating that the simulator ranks policies as real trials do, on a few policies, before trusting it for the rest, as SIMPLER's authors did.

::: history
Robot learning long lacked shared yardsticks: each paper reported success on its own robot and tasks, a situation the community discussed repeatedly. Simulated benchmarks for manipulation followed those for reinforcement learning in games: Meta-World (2019), RLBench (2020), robomimic (2021), CALVIN (2022) and LIBERO (2023). For real-robot evaluation, shared hardware challenges (the Amazon Picking Challenge, 2015–17) and later shared platforms and protocols (such as the DROID setup in 2024) made cross-lab comparison possible, and SIMPLER (2024) tried to make simulation evaluation predictive of real-world results. The statistical tools are older: Wilson's interval dates from 1927 and McNemar's test from 1947.
:::

::: summary
- Define trials, initial conditions and success criteria in advance; record progress, time, interventions, safety events and failure categories as well as success.
- Success counts are binomial; use Wilson intervals, which stay in $[0,1]$ and behave well for small $n$. Twenty trials resolve about $\pm15$–$20$ percentage points.
- Compare policies on matched initial conditions; McNemar's test uses only discordant pairs and is more sensitive than unpaired tests. Overlapping intervals are not a test.
- Plan the number of trials with [[#eq-samplesize]]; detecting 60% versus 80% needs about 80 unpaired trials per policy.
- Randomise order, blind the evaluator, record video, select checkpoints on separate conditions (winner's curse), and report per generalisation axis.
- Simulation benchmarks (LIBERO, SIMPLER, CALVIN, …) are for controlled comparison and debugging; the sim-to-real gap makes your own hardware evaluation decisive.
:::

## Exercises

::: exercise A success rate {#exr-rate level=1 check="0.65"}
A policy succeeds in 26 of 40 trials. What is the estimated success rate? (Enter a fraction.)
::: solution
$26/40 = 0.65$.
:::
:::

::: exercise Wilson centre {#exr-centre level=1 check="0.5"}
What is the centre of the Wilson interval for 10 successes in 20 trials? (Enter the value.)
::: solution
$\hat p = 0.5$, and $(0.5 + c/2)/(1+c) = 0.5$ for any $c$: the interval is symmetric about one half.
:::
:::

::: exercise Rule of three {#exr-three level=1 check="0.03"}
A grasp policy has no failures in 100 trials. Using the rule of three, give an approximate 95% upper bound on its failure rate. (Enter a fraction.)
::: solution
$3/100 = 0.03$: a failure rate of up to about 3% is consistent with zero failures in 100 trials.
:::
:::

::: exercise Wilson interval for 45 of 50 {#exr-wilson level=2 check="0.786"}
Find the lower end of the 95% Wilson interval for 45 successes in 50 trials. (Enter it to three decimal places.)
::: solution
$\hat p = 0.9$, $c = 3.8416/50 = 0.07683$. Centre $(0.9 + 0.03842)/1.07683 = 0.8715$. Half-width $\frac{1.96}{1.07683}\sqrt{0.09/50 + 3.8416/10\,000} = 1.8202\sqrt{0.0018 + 0.000384} = 1.8202\times0.04673 = 0.0851$. Lower end $0.8715 - 0.0851 = 0.786$; upper $0.957$.
:::
:::

::: exercise McNemar by hand {#exr-mcnemar level=2 check="0.012"}
In a paired evaluation, 11 conditions are discordant: 10 favour the new policy, 1 the old. Find the two-sided exact McNemar $p$-value. (Enter it to two significant figures.)
::: solution
For $X\sim\Bin(11, \tfrac12)$, $\Prob(X\le1) = (1 + 11)/2^{11} = 12/2048 = 0.00586$; the two-sided $p$-value is $0.0117\approx0.012$. The new policy is better at the 5% level, on the strength of only 11 informative conditions.
:::
:::

::: exercise Trials for a smaller improvement {#exr-n level=2 check="199"}
Using [[#eq-samplesize]] with 5% significance and 80% power, how many unpaired trials per policy are needed to detect an improvement from 80% to 90%? (Enter the number, rounded up.)
::: solution
$\bar p = 0.85$. Numerator $1.960\sqrt{2\times0.85\times0.15} + 0.842\sqrt{0.16 + 0.09} = 1.960\times0.5050 + 0.842\times0.5 = 0.9898 + 0.4210 = 1.4108$; squared $1.9903$; divided by $0.01$: $199.0$, so 199 trials per policy — more than twice as many as for the 60-to-80 comparison of [[#ex-samplesize]], because the difference is half as large (the count scales as $1/\Delta^2$) while the variances near 85% are a little smaller.
:::
:::

::: exercise A biased protocol {#exr-bias level=3}
A team evaluates a new policy in the morning (20 trials) and the old one in the afternoon (20 trials); the same engineer, who developed the new policy, resets the objects and judges success. List the sources of bias and redesign the evaluation.
::: solution
Biases: time-of-day effects (lighting through windows, robot temperature, operator fatigue) confounded with the policy; unblinded evaluator who may, unconsciously, reset objects more favourably or judge borderline outcomes generously for the new policy; no fixed initial conditions, so the two sets may differ in difficulty; 20 trials each gives little power. Redesign: a fixed list of, say, 40–60 initial conditions placed with a template; each condition run with both policies in random order, interleaved through the day; a script chooses the policy and hides its identity; a second person (or video review) judges success against a written criterion; analysis by McNemar's test with Wilson intervals; video archived.
:::
:::

::: exercise An evaluation plan for a product {#exr-plan level=3}
Your company will ship a VLA-driven bin-picking cell for 300 SKUs. Design the evaluation that decides whether to ship: metrics, initial conditions, generalisation axes, number of trials, simulation's role, and the acceptance criterion.
::: solution
Metrics: pick success per attempt, picks per hour, mean time between interventions over long runs, damage and drop rates, safety-limit trips. Initial conditions: bins filled by a documented random procedure, stratified by SKU group (small, shiny, deformable, heavy). Axes: SKUs seen in training versus held-out SKUs; lighting; bin fill level; distractors; packaging changes. Trials: enough for the acceptance criterion — e.g. to show a pick success above 95% with a Wilson lower bound above 0.93 needs several hundred picks per stratum (at $\hat p = 0.97$, $n = 300$ gives a Wilson lower bound of 0.944); long-run tests of several shifts for intervention rates. Simulation: regression tests of every new checkpoint before hardware trials and stress tests of rare conditions, after verifying that simulation ranks a few policies as the real cell does. Acceptance: pre-registered thresholds per stratum on lower confidence bounds, no unresolved safety event, and a comparison with the existing (scripted) solution on matched bins.
:::
:::
