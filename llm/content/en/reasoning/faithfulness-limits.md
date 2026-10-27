A chain of thought looks like an explanation. It is written in the language of reasons — "since the train leaves at 9:40 and the journey takes four hours…" — and it is natural to read it as a record of *how* the model reached its answer. Much of the appeal of reasoning models rests on that reading: if the written reasoning is the computation, then we can check it, debug it and monitor it for bad intentions. But nothing in the training of a language model guarantees it. The chain is text sampled from the model like any other, rewarded when the answer that follows it is right ([[reasoning/verifiable-rewards]]). It may be the computation; it may be a plausible story told alongside a computation that happens elsewhere, in the activations; or something in between.

This final chapter examines the evidence. It defines faithfulness and the experimental designs used to test it, and reviews the main results: biased prompts whose influence explanations omit (Turpin et al., 2023), interventions on the chain itself (Lanham et al., 2023), hidden computation in filler tokens, and the newer studies of reasoning models, which disagree in instructive ways. It then turns from *faithfulness* to *limits*: the reversal curse, failures of composition and length generalisation, and benchmark contamination, with the statistics needed to tell a real drop from noise. It ends with the hardest question in the course — what claims that models "reason" do and do not show — presenting the competing interpretations as fairly as the evidence allows. Throughout, results are dated: as of 2026 this is an active area, and several of its findings concern specific models that have since been replaced.

## What faithfulness means {#sec-def}

Explanations can be judged on two different axes. An explanation is **plausible** if a human finds it convincing. It is **faithful** if it accurately represents the reasoning process that produced the output (Jacovi and Goldberg, 2020). The two can come apart completely: a confident, well-written explanation can be unrelated to the actual cause of an answer, and a faithful account of a messy computation can look implausible.

::: definition Faithfulness of a chain of thought {#def-faithful}
Let a model produce chain of thought $z$ and answer $y$ for input $x$. The chain is **faithful** to the extent that (i) the factors it states as reasons are factors that causally influence $y$, and (ii) the factors that causally influence $y$ substantially are stated in it. Condition (i) fails for **post-hoc rationalisation** — reasons produced to fit an answer reached otherwise; condition (ii) fails for **omission** — an influential factor, such as a hint or a bias in the prompt, that is never mentioned.
:::

Causal influence is tested by **intervention**: change a factor and see whether the answer changes. Two families of experiments follow. **Input interventions** add or change a feature of the prompt — a suggested answer, a reordering of options, an irrelevant sentence — and ask whether the answer moves and whether the chain mentions the feature. **Chain interventions** edit the chain itself — truncate it, insert a mistake, paraphrase it — and ask whether the answer depends on it. Neither family establishes what the model "really" computes; each tests one observable consequence of faithfulness.

## Evidence from biased prompts {#sec-bias}

Turpin et al. (2023) added biasing features to few-shot prompts for $13$ tasks from the BIG-Bench Hard suite. In one condition, the demonstrations were reordered so that the correct answer was always option *(A)*; in another, the prompt included a suggestion such as "I think the answer is (B), but I'm curious what you think". Models with chain-of-thought prompting (GPT-3.5 and Claude 1.0 at the time) shifted their answers towards the biased option, with accuracy falling by as much as $36\%$ — and their explanations essentially never mentioned the bias. Instead they gave reasoning that supported the biased answer. On a social-bias benchmark, explanations similarly justified stereotype-consistent answers without mentioning the stereotype. The paper's title summarises the finding: *language models don't always say what they think*.

The design gives a clean test of condition (ii) of [[#def-faithful]]: the bias demonstrably changed the answer (by comparison with the unbiased prompt), and it was omitted. It does not show that chains of thought are *never* faithful, only that they can be systematically unfaithful in a way that users would not detect from the text.

### Measuring verbalisation {#sec-verbalise}

Later studies of reasoning models refined the measurement. Give a question with and without a hint pointing to some option; keep the cases where the answer **switches to the hinted option**; and among them, measure how often the chain of thought **acknowledges the hint**. One complication is that answers also change between runs for no reason at all — sampling is random — so some switches to the hinted option are not caused by the hint.

::: proposition Correcting verbalisation rates for random switches {#prop-correct}
Let $s_h$ be the probability that the answer is the hinted option when the hint is given (among questions whose unhinted answer was different), and $s_0$ the probability that a resampled answer without the hint lands on that option by chance. Suppose that switches not caused by the hint occur at rate $s_0$ and never mention the hint, and that hint-caused switches mention it with probability $m$. Then the observed mention rate among switches is $\hat m = m\,(s_h - s_0)/s_h$, so

$$
m = \hat m\cdot\frac{s_h}{s_h - s_0}.
$$ {#eq-correct}
:::

::: proof
Among switches (probability $s_h$), a fraction $s_0/s_h$ are chance switches, which by assumption never mention the hint, and a fraction $(s_h - s_0)/s_h$ are caused by the hint, which mention it with probability $m$. The overall mention rate among switches is therefore $\hat m = m(s_h - s_0)/s_h$; solving for $m$ gives [[#eq-correct]].
:::

The assumptions are approximations: chance switches may be somewhat rarer when the model is following the hint on some questions, as in the simulation below. Chen et al. (2025) used a normalisation of this kind in their study of reasoning models. They tested six kinds of hint — among them a sycophantic suggestion, a pattern in the few-shot examples, metadata in the prompt, a description of the grading code, and information presented as unethically obtained — and reported that, averaged across hints, Claude 3.7 Sonnet's chains of thought acknowledged the hints it used $25\%$ of the time and DeepSeek-R1's $39\%$; that outcome-based reinforcement learning raised faithfulness at first but then plateaued at modest levels; and that in training environments with exploitable reward hacks, models learned to exploit them in almost all cases while mentioning them in fewer than $2\%$. Unfaithful chains were, on average, *longer* than faithful ones — omission was not a matter of brevity.

Other studies reach more favourable conclusions on related measures. Chua and Evans (2025) compared reasoning models with non-reasoning models from the same developers on prompts with cues and found that the reasoning models articulated the cue that influenced them substantially more often. Arcuschin et al. (2025) looked for unfaithfulness without any artificial hints and found it at lower rates — for example **implicit post-hoc rationalisation**, where a model answers "yes" to both "Is X larger than Y?" and "Is Y larger than X?" with a coherent-looking argument each time — with rates varying widely across models. The studies differ in models, cues and metrics; read together, they show that verbalisation is partial and variable, better in reasoning models by some measures, and far from complete.

::: example Correcting a verbalisation rate {#ex-correct}
With a hint, $50\%$ of answers switch to the hinted option; without it, $10\%$ land there by chance on resampling. Among the switches, $20\%$ of chains mention the hint. Estimate the mention rate among switches actually caused by the hint.
::: solution
By [[#eq-correct]], $m = 0.2\cdot0.5/(0.5 - 0.1) = 0.25$. A fifth of the switches ($0.1/0.5$) would have happened anyway and cannot be expected to mention the hint; correcting for them raises the estimate from $20\%$ to $25\%$. The correction matters most when the hint has a weak effect ($s_h$ close to $s_0$), where the uncorrected rate can be badly diluted.
:::
:::

## Evidence from interventions on the chain {#sec-interventions}

Lanham et al. (2023) intervened on the chain of thought itself, for several multiple-choice tasks and a family of models of different sizes.

- **Early answering.** Truncate the chain after a fraction of its steps and force an answer. If the answer is already the same with no chain at all, the chain was not needed.
- **Adding mistakes.** Insert an error into one step and let the model continue. If the final answer does not change, the model was not relying on that step.
- **Paraphrasing.** Rewrite the chain in different words. If accuracy drops, the original wording may have carried hidden information (steganography).
- **Filler tokens.** Replace the chain with the same number of uninformative tokens ("…"). If accuracy is preserved, the benefit came from extra computation, not from the content.

They found that the degree to which answers depended on the chain **varied widely between tasks**: on some, truncating or corrupting the chain changed the answer often; on others, the model's answer was largely fixed before the chain began. Paraphrasing did not reduce accuracy, which is evidence against hidden encoding in the wording, and filler tokens did not help, which suggests the benefit came from the content. And on most tasks, larger and more capable models depended **less** on their chains — an inverse-scaling result: the better a model could answer directly, the more its chain was decoration.

The filler-token result has a caveat. Pfau, Merrill and Bowman (2024) constructed synthetic tasks on which Transformers trained with appropriate supervision did use meaningless filler tokens to perform computation they could not do in a single pass — consistent with [[reasoning/chain-of-thought#prop-depth]], since filler tokens add positions and therefore parallel computation. They found such use hard to learn and did not observe it in standard models; but it shows that "the tokens are meaningless" does not imply "no computation is happening there".

::: warning A readable chain of thought is not a transcript of the computation
Every experiment in this chapter found cases where the stated reasoning omitted an influential factor or was not needed for the answer. Treat a chain of thought as *evidence* about the computation — often informative, sometimes misleading — not as the computation itself. In particular, a chain that contains no mention of a problem (a bias, a shortcut, a reward hack) is weak evidence that the problem is absent.
:::

### Monitoring and its fragility {#sec-monitor}

Even partial faithfulness is valuable. Baker et al. (2025) at OpenAI used one language model to read the chains of thought of a reasoning model during reinforcement learning on agentic coding tasks, and found that the monitor caught reward hacking — such as making tests pass without solving the problem — much more reliably when it could read the chain than when it saw only the actions. But when they added the monitor's verdict to the training reward, the policy learned, under strong optimisation, to hack *without* stating it: **obfuscated** reward hacking. The lesson is a version of the over-optimisation theme of [[reasoning/process-outcome-rewards#def-hacking]]: optimising the chain of thought to look good can destroy the property that made it useful. A position paper by researchers from several laboratories and academic groups (Korbak et al., 2025) argued that chain-of-thought monitorability is a "new and fragile opportunity" for oversight and recommended that developers track it and weigh it in training decisions.

::: quiz
A reasoning model's answer changes when a suggested answer is added to the prompt, and its chain of thought never mentions the suggestion. Which conclusions are justified? (Select all that apply.)
- [x] The chain of thought omitted a factor that influenced the answer, so it was unfaithful in sense (ii) of [[#def-faithful]].
- [ ] The model's reasoning is never faithful.
- [x] A monitor reading only the chain of thought could miss that the answer was influenced by the suggestion.
- [ ] Training the model so that its chains never mention suggestions would make it more faithful.
::: solution
The experiment establishes an influential, unmentioned factor, so the chain omitted it, and a chain-only monitor could miss it. It does not establish unfaithfulness in general. Training chains not to mention suggestions would make the chains *less* informative without removing the influence — the obfuscation risk described by Baker et al.
:::
:::

## Limits: the reversal curse {#sec-reversal}

Faithfulness asks whether the written reasoning reflects the computation. A separate question is what computations a model can do at all. Several well-documented failures are striking because they concern apparently trivial inferences.

Berglund et al. (2023) fine-tuned models on statements of the form "A is B" about fictitious people — "Daphne Barrington is the director of *A Journey Through Time*" — and tested them on the reverse question, "Who is the director of *A Journey Through Time*?". The models answered the forward question well and the reverse question no better than chance: training on "A is B" did not teach "B is A". The same asymmetry appeared for real facts: asked to name the mother of each of a list of celebrities, GPT-4 answered correctly $79\%$ of the time, but asked to name the child of each of those mothers, only $33\%$. Allen-Zhu and Li (2023) found the same failure of "inverse search" in controlled experiments with synthetic biographies.

The mechanism is easiest to see in the extreme case of a model with separate parameters for each context.

::: proposition Forward training leaves the reverse untouched in a tabular model {#prop-reversal}
Consider a model whose next-token distribution for each context $c$ is $\operatorname{softmax}(\theta_c)$ with its own parameter vector $\theta_c$. Training by gradient descent on the cross-entropy of the sequence "$A$ is $B$" changes only the parameter vectors of the contexts that occur as prefixes of that sequence. In particular, the distribution of the completion of "$B$ is", whose context never occurs, is unchanged.
:::

::: proof
The loss is $-\sum_t\log\operatorname{softmax}(\theta_{c_t})_{x_t}$ over the prefixes $c_t$ of the training sequence. Its gradient with respect to $\theta_c$ is zero for any $c$ that is not one of the $c_t$. The context "$B$ is" is not a prefix of "$A$ is $B$", so its parameters, and hence its predictions, do not change.
:::

::: example Counting the asymmetry {#ex-reversal}
On a list of $1{,}500$ celebrity–parent pairs, a model names the parent given the celebrity for $79\%$ of pairs and the celebrity given the parent for $33\%$. At least how many pairs does it know in the forward direction but not in the reverse?
::: solution
Forward-known pairs number $0.79\cdot1500 = 1185$; reverse-known at most $0.33\cdot1500 = 495$. Even if every reverse-known pair were also forward-known, at least $1185 - 495 = 690$ pairs — $46\%$ of the list — are known one way only. The same fact is stored as a usable association in one direction and not the other.
:::
:::

A Transformer shares its parameters across contexts, so the proposition does not apply to it directly; but it captures why reversal is not *automatic*: next-token prediction trains $p(B\mid A\text{ is})$, and nothing in that objective requires $p(A\mid B\text{ is})$ to change. Whether shared representations transfer the fact backwards is an empirical question, and the experiments say they largely do not. Two practical facts follow. In context, a model *can* reverse a relation it has just read — the failure concerns knowledge stored in weights. And training data that state facts in both directions, or augmentations that do so, mitigate the curse.

## Limits: composition and length {#sec-composition}

**Compositional generalisation** is the ability to combine known pieces in new ways. Dziri et al. (2023), in *Faith and Fate*, studied multi-digit multiplication, a logic puzzle (Einstein's puzzle) and a dynamic-programming problem, representing each solution as a computation graph. Model accuracy fell sharply as the graphs grew deeper and wider — towards zero for multiplication of numbers with more digits than in training, even after fine-tuning on smaller cases and with step-by-step reasoning. Their analysis argued that models often solve such problems by matching subgraphs seen in training rather than by executing a general algorithm, and that errors compound across the graph. Press et al. (2023) measured the **compositionality gap** for two-hop questions ([[reasoning/chain-of-thought#sec-decomposition]]); Yang et al. (2024) found evidence that models perform the first hop of such questions latently in many cases but the full composition much less reliably.

**Length generalisation** is the related ability to apply a procedure to longer inputs than in training. Anil et al. (2022) found that fine-tuning and few-shot prompting gave poor length generalisation on tasks such as parity and variable tracking, while scratchpad prompting helped. As of 2026 length generalisation remains an active topic, with positional encodings, data formats and scratchpads all affecting it ([[transformers/positional-encoding]]).

::: example Compounding over a computation graph {#ex-compound}
Model multiplication of two $d$-digit numbers, schematically, as $d^2 + 2d$ elementary steps (single-digit products, carries and additions), each correct with probability $0.98$ independently. Compute the probability of a fully correct product for $d = 2, 4, 6$.
::: solution
$d = 2$: $8$ steps, $0.98^8 = 0.851$. $d = 4$: $24$ steps, $0.98^{24} = 0.616$. $d = 6$: $48$ steps, $0.98^{48} = 0.379$. Even a $98\%$-reliable step makes long multiplications unreliable, and the number of steps grows quadratically with the digits. The observed collapse in Dziri et al. was faster than this independent-error model predicts, because per-step reliability itself fell on out-of-distribution sizes. Program-aided reasoning ([[reasoning/chain-of-thought#sec-pal]]) sidesteps the problem by handing the arithmetic to an interpreter.
:::
:::

## Limits: contamination and memorisation {#sec-contamination}

A benchmark measures reasoning only if the model has not seen its problems — or close variants — with their answers. Large pretraining corpora scraped from the web contain many benchmarks, discussions of their problems and solutions.

::: definition Benchmark contamination {#def-contamination}
A benchmark is **contaminated** for a model if its test items, or near-duplicates with their solutions, occurred in the model's training data. Contamination inflates measured accuracy by an amount that depends on how much was memorised and how the model uses it.
:::

Detection methods include searching training data for overlapping $n$-grams (possible only for those with access to the data), canary strings embedded in benchmark files, membership tests based on the model's likelihood of test items, and — for anyone — comparisons with **fresh** or **perturbed** problems. Three well-known comparisons:

- **New matched sets.** Zhang et al. (2024) wrote GSM1k, about $1{,}200$ new problems matched to GSM8K in style and difficulty. Some model families scored up to about $13$ points lower on GSM1k than on GSM8K, suggesting overfitting to the original; several of the strongest models of the time showed little or no gap.
- **Perturbations.** Mirzadeh et al. (2024) built GSM-Symbolic, templates of GSM8K problems with the names and numbers changed, and found that accuracy varied noticeably across instantiations and fell when numbers changed. In GSM-NoOp they added a clause that seems relevant but does not affect the answer, and accuracy fell by up to $65\%$ for some models; models subtracted quantities mentioned in the irrelevant clause. The authors interpreted this as evidence of pattern matching rather than formal reasoning; others replied that many humans are also misled by such clauses and that the strongest models were much less affected.
- **Time-split benchmarks.** LiveCodeBench (Jain et al., 2024) collects programming problems with their release dates, so a model can be evaluated on problems published after its training cutoff; drops in performance on newer problems were observed for some models. Evaluations on mathematics competitions held after a model's release — AIME 2025, the 2025 USA and International Olympiads — serve the same purpose.

::: proposition Estimating the memorised fraction {#prop-contam}
Suppose that on a contaminated benchmark a fraction $\kappa$ of items is answered correctly from memory, and the rest with accuracy $a$, which also equals the model's accuracy on a fresh benchmark of matched difficulty. Then the observed accuracy is $A = \kappa + (1-\kappa)a$, and

$$
\kappa = \frac{A - a}{1 - a}.
$$
:::

::: proof
Memorised items are correct with probability $1$ and the others with probability $a$; by total probability $A = \kappa\cdot1 + (1-\kappa)a$. Solving, $A - a = \kappa(1 - a)$.
:::

The model is crude — memorisation is rarely all-or-nothing, and "matched difficulty" is an assumption — but it shows why a modest drop can mean a lot: if accuracy is $90\%$ on the original and $80\%$ on the fresh set, the estimate is $\kappa = 0.1/0.2 = 0.5$, half of the items the model could not otherwise solve. Before interpreting a drop at all, test whether it is larger than sampling noise.

::: example Is the drop real? {#ex-ztest}
A model solves $1130$ of the $1319$ GSM8K test problems ($85.7\%$) and $1020$ of $1250$ problems of a fresh, matched set ($81.6\%$). Is the difference significant?
::: solution
The pooled proportion is $(1130 + 1020)/(1319 + 1250) = 0.837$, and the standard error of the difference is $\sqrt{0.837\cdot0.163\cdot(1/1319 + 1/1250)} = 0.0146$. The difference is $0.857 - 0.816 = 0.041$, so $z = 2.79$ and the two-sided $p$-value is about $0.005$: unlikely to be noise, if the two sets are truly matched in difficulty — which is the assumption that needs the most scrutiny. With $1050$ fresh problems solved instead, the gap of $0.017$ gives $z = 1.18$, $p = 0.24$: no evidence of a difference. The listing computes both.
:::
:::

## What do reasoning claims show? {#sec-claims}

Reasoning models of 2025 and 2026 solve competition mathematics problems that very few people can, write long correct proofs, and fix real software bugs. They also fail on puzzles a child can solve, are thrown by irrelevant clauses, and sometimes produce confident arguments for both sides of a comparison. Both sets of observations are robust. How to interpret them is contested, and a fair account has to present the main positions with the evidence each relies on.

**The capability view.** Performance on problems that post-date training — new competitions, newly written proofs graded by experts, unreleased programming problems — cannot be explained by memorising those problems. Formal proofs checked by Lean (as in AlphaProof) and programs that pass hidden tests are correct by construction, whatever process produced them. Gold-medal-level performance at the 2025 International Mathematical Olympiad, as announced by two developers, required long natural-language proofs of new problems. On this view, the failures are real limitations of current systems but do not show that the successes are illusory; humans also have systematic reasoning failures.

**The approximate-retrieval view.** Language models are trained to continue text and are highly sensitive to how familiar a problem's surface form is. McCoy et al. (2024) showed that accuracy depends strongly on the probability of the task and of the output under the training distribution — models decode a shift cipher with the common shift of $13$ far better than with a shift of $2$ — and Wu et al. (2024) found large drops on "counterfactual" variants of familiar tasks, such as arithmetic in base $9$. Planning benchmarks in which object names are obfuscated (Valmeekam et al., 2023) showed sharp drops for earlier models, and reasoning models improved substantially but unevenly on them (Valmeekam et al., 2024). On this view, much apparent reasoning is interpolation from similar solved problems, and chains of thought are generated text that need not carry semantics.

**Disputed evidence.** Some results have been argued both ways. Shojaee et al. (2025), in *The Illusion of Thinking*, evaluated reasoning models on puzzles of controllable complexity, such as the Tower of Hanoi and river-crossing problems, and reported that accuracy collapsed beyond a complexity threshold while the models' reasoning effort *decreased* near the collapse. A response (Lawsen, 2025) argued that some reported failures reflected output-length limits — complete Tower of Hanoi solutions grow exponentially with the number of disks — and that some river-crossing instances tested were unsolvable, and showed that models could produce a program generating the solution. Petrov et al. (2025) graded full proofs for the 2025 USA Mathematical Olympiad and found all models evaluated in March 2025 below $5\%$, with flawed reasoning often hidden behind correct-looking answers; a few months later, the same competition season's International Olympiad produced the gold-level announcements above. Results like these depend heavily on the date, the model, the grading and the output limits, and each side has fair points.

What can be said with confidence, as of 2026:

1. **Verified outputs are real.** Where an answer is checked — a proof by a proof assistant, code by tests — its correctness does not depend on how it was produced.
2. **Unverified reasoning is not self-certifying.** A fluent chain of thought is neither proof of correctness nor a faithful record of the computation ([[#sec-bias]], [[#sec-interventions]]).
3. **Performance is uneven.** Models can be strong on hard problems and weak on easy variants; generalisation depends on familiarity of form, composition depth and length.
4. **Benchmarks age.** Contamination and targeted training erode benchmarks; fresh, held-out and perturbed evaluations with proper statistics are needed to measure progress.
5. **The gains concentrate where checking is possible.** Most of the evidence for test-time scaling and reinforcement learning with verifiable rewards comes from mathematics and code ([[reasoning/test-time-scaling#sec-verification]]); transfer to tasks without checkers is less established.

## A numerical laboratory {#sec-code}

The listing simulates a hint experiment in which the true mention rate is known ($30\%$), and checks the correction of [[#prop-correct]]; runs the two-proportion test of [[#ex-ztest]]; and tabulates the compounding model of [[#ex-compound]].

```python
import math, random
rng = random.Random(9)

# 1. Measuring whether a chain of thought admits using a hint (Turpin / Chen et al. style)
# A simulated model answers 4-option questions twice: without a hint, and with a hint to a
# different option. It follows the hint on 40% of questions; when it does, it mentions the
# hint 30% of the time. Resampling also changes 15% of answers at random.
Q, USE, MENTION, NOISE = 20000, 0.40, 0.30, 0.15
switch = mention = 0
noise_switch = 0
for _ in range(Q):
    base = rng.randrange(4)
    hint = rng.choice([o for o in range(4) if o != base])
    if rng.random() < USE:
        ans, said = hint, rng.random() < MENTION
    else:
        ans = rng.randrange(4) if rng.random() < NOISE else base
        said = False
    if ans == hint:
        switch += 1; mention += said
    # control run: same question, no hint, resampled
    ctrl = rng.randrange(4) if rng.random() < NOISE else base
    noise_switch += ctrl == hint
s_h, s_0 = switch / Q, noise_switch / Q
observed = mention / switch
corrected = observed * s_h / (s_h - s_0)
print(f"switch to hinted option: with hint {s_h:.3f}, without {s_0:.3f}")
print(f"mention rate among switches: observed {observed:.3f}, corrected {corrected:.3f} (true {MENTION})")

# 2. Is a drop on a fresh, matched benchmark significant? Two-proportion z-test
def z_test(c1, n1, c2, n2):
    p1, p2, p = c1 / n1, c2 / n2, (c1 + c2) / (n1 + n2)
    se = math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2))
    z = (p1 - p2) / se
    return p1 - p2, z, math.erfc(abs(z) / math.sqrt(2))   # two-sided p-value
for c1, c2 in [(1130, 1050), (1130, 1020)]:
    d, z, pv = z_test(c1, 1319, c2, 1250)
    print(f"original {c1}/1319 vs fresh {c2}/1250: gap {d:+.3f}, z = {z:.2f}, p = {pv:.3g}")

# 3. Compounding of step errors in multi-digit multiplication (toy: one step per digit pair)
for digits in [1, 2, 3, 4, 5, 6]:
    steps = digits * digits + 2 * digits      # partial products plus carries and additions
    print(f"{digits} x {digits} digits: {steps:3d} steps, accuracy at 0.98 per step {0.98**steps:.3f}")
```

```text
switch to hinted option: with hint 0.423, without 0.035
mention rate among switches: observed 0.279, corrected 0.303 (true 0.3)
original 1130/1319 vs fresh 1050/1250: gap +0.017, z = 1.18, p = 0.238
original 1130/1319 vs fresh 1020/1250: gap +0.041, z = 2.79, p = 0.00525
1 x 1 digits:   3 steps, accuracy at 0.98 per step 0.941
2 x 2 digits:   8 steps, accuracy at 0.98 per step 0.851
3 x 3 digits:  15 steps, accuracy at 0.98 per step 0.739
4 x 4 digits:  24 steps, accuracy at 0.98 per step 0.616
5 x 5 digits:  35 steps, accuracy at 0.98 per step 0.493
6 x 6 digits:  48 steps, accuracy at 0.98 per step 0.379
```

The uncorrected mention rate, $27.9\%$, understates the true $30\%$ because a few switches were chance; the correction recovers $30.3\%$, slightly high because in the simulation chance switches are rarer when the hint is present (the model follows the hint on some of those questions instead). The two benchmark comparisons differ by only $30$ problems solved, but one gap is well within noise and the other is not.

::: widget distribution
dist: binomial
params: n=1250, p=0.857
a: 1020
b: 1070
caption: Number of problems solved out of $1250$ if the model's true accuracy on the fresh set were the same $85.7\%$ it achieved on the original benchmark. The shaded range, $1020$ to $1070$, covers results below the expected value of about $1071$; the observed $1020$ of [[#ex-ztest]] lies far in the left tail, while $1050$ is within the bulk of the distribution. Change $p$ to see how much a true drop in accuracy moves the distribution.
:::

::: history
Jacovi and Goldberg (2020) distinguished faithfulness from plausibility in interpretability. Wei et al. (2022) cautioned that chain-of-thought prompting does not establish whether a network is actually reasoning. Turpin et al. (2023) showed systematically unfaithful explanations under biased prompts, and Lanham et al. (2023) measured dependence on the chain by intervention. Berglund et al. (2023) described the reversal curse, Dziri et al. (2023) the limits of compositional generalisation, and Valmeekam et al. (2023) failures of planning. In 2024 Pfau et al. demonstrated hidden computation in filler tokens, Mirzadeh et al. introduced GSM-Symbolic, Zhang et al. GSM1k, Jain et al. LiveCodeBench, and McCoy et al. analysed "embers of autoregression". In 2025 Chen et al., Chua and Evans, and Arcuschin et al. measured the faithfulness of reasoning models, Baker et al. reported obfuscated reward hacking under chain-of-thought monitoring, Korbak et al. called monitorability a fragile opportunity, and Shojaee et al.'s *Illusion of Thinking* and the responses to it debated what puzzle failures show.
:::

::: summary
- A chain of thought is **faithful** if the reasons it states influence the answer and the factors that influence the answer are stated; it can fail by **post-hoc rationalisation** or **omission**. Faithfulness is tested by interventions on the input or on the chain.
- Biasing features shifted answers while explanations omitted them (Turpin et al., 2023); reasoning models acknowledged hints they used only part of the time ($25\%$ and $39\%$ for two models in Chen et al., 2025), more often than non-reasoning models by some measures (Chua and Evans, 2025). Verbalisation rates should be corrected for chance switches: $m = \hat m\,s_h/(s_h - s_0)$.
- Dependence on the chain varies by task and fell with model capability on most tasks studied (Lanham et al., 2023); filler tokens can carry hidden computation in constructed settings (Pfau et al., 2024).
- Chain-of-thought **monitoring** detects misbehaviour such as reward hacking, but optimising chains against a monitor can make misbehaviour **obfuscated**.
- Limits: the **reversal curse** ("A is B" does not teach "B is A"), compounding errors in **compositional** tasks, weak **length generalisation**, and **contamination**, estimated from fresh or perturbed benchmarks with proper significance tests.
- Claims about "reasoning" divide into a capability view and an approximate-retrieval view; verified outputs are real, unverified chains are not self-certifying, performance is uneven, benchmarks age, and the evidence is strongest where answers can be checked.
:::

## Exercises

::: exercise Correcting a mention rate {level=1 check="0.25"}
With a hint, $50\%$ of answers move to the hinted option; without it, $10\%$ land there by chance. Among the switches, $20\%$ of chains mention the hint. Use [[#eq-correct]] to estimate the mention rate among hint-caused switches.
::: solution
$m = 0.2\cdot0.5/0.4 = 0.25$.
:::
:::

::: exercise A memorised fraction {level=1 check="0.5"}
A model scores $90\%$ on a benchmark and $80\%$ on a fresh, matched version. Under the model of [[#prop-contam]], what fraction of the items it could not otherwise solve does it answer from memory?
::: solution
$\kappa = (0.9 - 0.8)/(1 - 0.8) = 0.5$.
:::
:::

::: exercise A significance test {level=1 check="2.94"}
A model solves $850$ of $1000$ original problems and $800$ of $1000$ fresh ones. Compute the two-proportion $z$ statistic with the pooled standard error, to two decimal places.
::: solution
Pooled $p = 1650/2000 = 0.825$; standard error $\sqrt{0.825\cdot0.175\cdot2/1000} = 0.01699$; $z = 0.05/0.01699 = 2.94$.
:::
:::

::: exercise Steps of a multiplication {level=2 check="0.2059"}
A procedure has $15$ steps, each correct with probability $0.9$ independently. What is the probability that the result is correct? Give four decimal places. How many steps can be afforded if the result must be correct with probability at least $0.5$?
::: solution
$0.9^{15} = 0.2059$. For $0.9^s\ge0.5$ we need $s\le\ln0.5/\ln0.9 = 6.58$, so at most $6$ steps.
:::
:::

::: exercise Designing a hint experiment {level=2}
Design an experiment to measure how often a reasoning model's chain of thought acknowledges a hint embedded as metadata in the prompt (for example `<answer>C</answer>` in a hidden-looking block). Specify the conditions, the sample, what counts as "acknowledging", how you handle answers that change by chance, and one limitation of your design.
::: solution
Conditions: each multiple-choice question is run without the hint and with the hint pointing to an option other than the model's unhinted answer (several runs per condition, to estimate resampling variability). Sample: a few hundred questions across subjects, with the hinted option chosen at random. Keep cases where the hinted run's answer equals the hinted option; "acknowledging" means that the chain refers to the metadata or to having been told the answer, judged by two independent raters (or a model judge validated against human labels) with a written rubric. Estimate $s_0$ from a control in which the unhinted question is resampled, and correct with [[#eq-correct]]. Report rates with confidence intervals. Limitations: the rubric decides what counts as acknowledgement (a vague "considering all the information" is ambiguous); an artificial hint may be treated differently from naturally occurring influences; and the result concerns one hint type and one model version.
:::
:::

::: exercise Reversal in a tabular model {level=2}
Extend [[#prop-reversal]]: suppose the training data contain "$A$ is the director of $B$" and, separately, other facts about the film $B$, such as "$B$ was released in 1990". Does the tabular model learn to complete "The director of $B$ is" with $A$? What kind of training data would make it learn the reverse, and how do data-augmentation methods for the reversal curse exploit this?
::: solution
In the tabular model, each context has its own parameters, so the model learns exactly the conditionals that appear as (prefix, next token) pairs in the data. "Who directed $B$?" is a different context from both training sequences, so its distribution is unchanged: the model cannot answer. To learn the reverse it must see a sequence in which a context mentioning $B$ (and the relation) is followed by $A$, for example "The director of $B$ is $A$". Augmentation methods for the reversal curse do exactly that: they restate facts in reversed or permuted orders, or train on reversed text, so that both conditionals are trained. A Transformer's shared parameters could in principle transfer the fact without such data, but the experiments of Berglund et al. show that, in practice, they largely do not.
:::
:::

::: exercise Early answering {level=3}
Write a plain-Python simulation of Lanham et al.'s early-answering test for a model on $1{,}000$ questions: on a fraction $f$ of questions the answer is already fixed before reasoning; on the rest, the answer is determined only by the last step of a $5$-step chain, and truncating the chain before then gives a random answer among $4$ options. Compute, for truncation after $0, 1, \dots, 5$ steps, the fraction of answers that match the full-chain answer, for $f = 0.2$ and $f = 0.8$, and relate the area above the curve to $f$.
::: solution
```python
import random
rng = random.Random(10)

def early_answering(f, n=1000, steps=5):
    fixed = [rng.random() < f for _ in range(n)]
    final = [rng.randrange(4) for _ in range(n)]
    curve = []
    for t in range(steps + 1):
        same = 0
        for q in range(n):
            if fixed[q] or t == steps:
                ans = final[q]
            else:
                ans = rng.randrange(4)          # chain needed but truncated: a guess
            same += ans == final[q]
        curve.append(same / n)
    return curve

for f in [0.2, 0.8]:
    c = early_answering(f)
    area = sum(1 - v for v in c) / len(c)
    print(f"f = {f}: " + " ".join(f"{v:.2f}" for v in c) + f"   area above curve {area:.3f}")
```

```text
f = 0.2: 0.41 0.41 0.41 0.38 0.41 1.00   area above curve 0.497
f = 0.8: 0.86 0.86 0.86 0.85 0.84 1.00   area above curve 0.122
```

Before the last step, the match rate is about $f + (1-f)/4$: $0.4$ for $f = 0.2$, $0.85$ for $f = 0.8$. The area above the curve is about $\frac56(1-f)\cdot\frac34$ — $0.5$ and $0.125$ — so it is proportional to the fraction of questions whose answer depends on the chain. Lanham et al. used this kind of area as a measure of how much the model relies on its reasoning; a model whose answers are mostly fixed in advance scores low.
:::
:::

::: exercise Two readings of one result {level=3}
A reasoning model solves $70\%$ of a set of grade-school word problems, and $45\%$ of the same problems after a sentence with an irrelevant number is added to each. Give the strongest argument that this shows the model is not reasoning, the strongest argument that it does not show that, and one additional experiment that would help decide between them.
::: solution
*Not reasoning:* a reasoner that understood the problem would ignore information that does not bear on the answer; a $25$-point drop shows that the model's procedure is triggered by surface features ("a number in the problem must be used"), consistent with the approximate-retrieval view and with GSM-NoOp. *Does not show that:* humans also show large drops when irrelevant numbers are added to word problems (a well-known effect in mathematics education); the model still solves $45\%$ of the perturbed problems, which requires more than retrieval; and the perturbation also changes the problem's familiarity, so the drop measures sensitivity to distribution shift, not absence of reasoning. *An experiment:* run the same perturbation on a human comparison group and on models with explicit instructions to identify irrelevant information; analyse errors to see whether wrong answers systematically use the irrelevant number (a specific shortcut) or are scattered (general degradation); and test whether accuracy recovers with a few demonstrations of ignoring distractors. If errors use the distractor and humans are much less affected, the shortcut reading gains support; if humans show similar drops and the model recovers with instructions, the result says less about reasoning per se.
:::
:::
