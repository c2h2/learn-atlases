A language model is trained to predict its training text as well as possible. For most text it learns patterns — grammar, facts, styles — that generalise. But for some sequences the best prediction is the sequence itself, and the model stores it nearly verbatim: a licence header seen ten thousand times, a famous poem, and occasionally a person's name, email address and phone number that appeared on one web page. When such a sequence can be recovered from the model by prompting it, the model has become a channel through which its training data can leak.

This chapter examines that channel and the defences against it. It defines what it means for a model to memorise a sequence, summarises what published extraction studies found (Carlini et al., 2021; 2023; Nasr et al., 2023) and which factors — duplication, model size, context length — drive memorisation, and introduces membership inference as a way of measuring leakage. It then turns to **differential privacy**, the one framework that gives a mathematical guarantee: we define it, prove that the Laplace mechanism satisfies it, interpret the guarantee as a limit on any attacker, describe DP-SGD (Abadi et al., 2016) for training neural networks, and compute the privacy–utility trade-off. Privacy questions that are not about memorisation — inference of personal attributes, the handling of users' conversations, data-protection law — close the chapter.

Attacks are described here at the level of their published findings and the factors they reveal; the aim is to understand the risk and its mitigations, not to reproduce attacks on deployed systems.

## Memorisation {#sec-memorisation}

A model that generalises well must still "memorise" in a loose sense — it stores the capital of France. The privacy question concerns information that is specific to individual training examples. Several definitions make this precise, each suited to a different question.

::: definition Extractable and $k$-eidetic memorisation {#def-extractable}
Let $x = (p, s)$ be a string from the training data, split into a prefix $p$ and a suffix $s$. The string is **extractable with $k$ tokens of context** if $p$ has $k$ tokens and greedy decoding of the model from $p$ produces $s$ exactly (Carlini et al., 2023). More generally, a string is **extractable** if some prompt, which an attacker can find without already knowing the string, makes the model output it. A string is **$k$-eidetic memorised** if it is extractable and appears in at most $k$ training documents (Carlini et al., 2021).
:::

The prefix-based definition is easy to measure — take training sequences, feed prefixes, compare — but it is a lower bound on memorisation, since other prompts or sampling could reveal more. The eidetic qualification matters for privacy: a string that appears in thousands of documents (a licence text) is public in any meaningful sense, whereas a string that appears in one document — an address on a single page — is the worrying case.

A complementary notion asks how much a model's behaviour on an example depends on that example being in the training set.

::: definition Counterfactual memorisation {#def-counterfactual}
For a training example $x$ and a training algorithm $\mathcal{A}$, the **counterfactual memorisation** of $x$ is

$$
\operatorname{mem}(x) = \E_{S\ni x}\bigl[\operatorname{perf}(\mathcal{A}(S), x)\bigr] - \E_{S\not\ni x}\bigl[\operatorname{perf}(\mathcal{A}(S), x)\bigr],
$$

the expected performance on $x$ (for example, per-token accuracy) of models trained on random subsets $S$ that contain $x$ minus that of models trained on subsets that do not (Zhang et al., 2023, adapting Feldman, 2020).
:::

Counterfactual memorisation is near zero for common text that the model would predict well anyway, and large for rare, idiosyncratic text — exactly the text that is most privacy-sensitive. Feldman (2020) argued that some memorisation is *necessary* for good accuracy when data have a long tail of rare sub-populations: to predict well on a kind of example seen once, a learner must in effect remember that example. This tension between learning the long tail and protecting individuals reappears in the cost of differential privacy ([[#sec-tradeoff]]).

## What extraction studies found {#sec-extraction}

**GPT-2 (Carlini et al., 2021).** The authors generated a large number of samples from GPT-2, ranked them by signals indicating that the model was unusually confident (for example, the ratio of the model's perplexity to the compressed length of the text under zlib, or to the perplexity under a smaller model), and checked the top candidates against the training data with the help of OpenAI. Of $1{,}800$ candidates, $604$ were verbatim training sequences. They included news, licences, code, and lists of identifiers, and also personal information: names, phone numbers, email addresses and physical addresses of individuals, some of which appeared in only one document of the training set. Larger models memorised more of the sequences tested.

**Scaling laws of memorisation (Carlini et al., 2023).** Measuring extractability with prefixes on models trained on public data (GPT-Neo, GPT-J and others trained on the Pile), the authors found three roughly log-linear relationships: the fraction of training sequences extractable increases with **model size**, with the **number of times a sequence is duplicated** in the training data, and with the **length of the prefix** given. They estimated that at least about $1\%$ of the training data of the 6-billion-parameter GPT-J was extractable with $50$-token prefixes. These are lower bounds; they are empirical regularities over the models studied, not laws.

**Duplication (Kandpal, Wallace and Raffel, 2022; Lee et al., 2022).** The rate at which a sequence is regenerated grows super-linearly with its number of duplicates: Kandpal et al. reported that a sequence present ten times was generated about a thousand times more often than one present once. Lee et al. found that deduplicating training data reduced the rate at which models emitted memorised text by about a factor of ten, and also made training more efficient. Deduplication is now standard in data pipelines ([[pretraining/training-data]]).

**Production chat models (Nasr et al., 2023).** The authors extracted training data from open models at scale and showed that a deployed, aligned chat model could also be induced — by a prompt that caused it to drift out of its conversational behaviour — to emit memorised pretraining data at a much higher rate than normal. They estimated recovering over ten thousand unique memorised examples for about US\$200 of queries. The vulnerability was disclosed to the developer before publication and mitigated. The study's general lesson is that alignment changes what a model usually outputs but need not remove what it has memorised.

::: example Duplication and the expected number of copies {#ex-duplication}
Suppose, as a stylised version of the duplication finding, that the probability that a sequence is extractable grows as $q(c) = q_1 c^{\alpha}$ with its duplicate count $c$, capped at $1$, with $q_1 = 10^{-4}$ and $\alpha = 3$. A corpus contains $10^6$ distinct personal records: $90\%$ appear once, $9\%$ appear $5$ times and $1\%$ appear $20$ times. How many records are expected to be extractable before and after deduplicating every record to a single copy?
::: solution
Before: $9\times10^5\cdot10^{-4} = 90$ singletons; $9\times10^4\cdot10^{-4}\cdot125 = 1125$ records duplicated $5$ times; $10^4\cdot\min(1, 10^{-4}\cdot8000) = 10^4\cdot0.8 = 8000$ records duplicated $20$ times. Total $9215$. After deduplication every record behaves like a singleton: $10^6\cdot10^{-4} = 100$. Deduplication removes about $99\%$ of the expected leakage, but the $100$ singletons remain — removing duplicates does nothing for information that appears only once. (The numbers are invented to illustrate the shape of the effect; the measured exponent and constant depend on the model and the definition.)
:::
:::

::: warning "The model only saw it once, so it cannot reproduce it"
Single occurrence lowers the probability of extraction but does not make it zero. Carlini et al. (2021) found memorised personal information that appeared in a single training document, and memorisation of rare sequences grows with model size. Conversely, the fact that a model outputs a plausible phone number does not mean the number is in its training data — models also invent plausible strings. Claims in either direction need checking against the data.
:::

### Membership inference {#sec-mia}

Extraction recovers content; a weaker attack asks only whether a given record was in the training set.

::: definition Membership inference {#def-mia}
A **membership-inference attack** (Shokri et al., 2017) is a test that, given a model $f$ and a candidate record $x$, outputs "member" or "non-member". Its quality is measured like a classifier's: the true-positive rate (members correctly identified) and false-positive rate (non-members wrongly called members), and especially the **true-positive rate at a low false-positive rate** such as $0.1\%$ (Carlini et al., 2022), since an attack that is right on average but cannot confidently identify anyone is of little use.
:::

The simplest attack thresholds the model's loss on $x$: training examples tend to have lower loss (Yeom et al., 2018). Stronger attacks compare the loss with that of reference models trained without $x$ (the likelihood-ratio attack of Carlini et al., 2022), or look at the least likely tokens of the text (Min-K% probability; Shi et al., 2024). For large pretrained language models, Duan et al. (2024) found that many attacks performed only slightly better than chance on pretraining data, and that earlier, more optimistic results were partly due to differences in distribution (for example, date) between the "member" and "non-member" test sets. Membership inference is more effective against fine-tuned models, which see small datasets for several epochs. Its main use in practice is as a *measurement*: an audit of how much a training procedure leaks, which differential privacy bounds directly ([[#prop-test]]).

## Differential privacy {#sec-dp}

Heuristic defences — removing names and emails, deduplicating, filtering outputs — reduce leakage but come with no guarantee: a name written in an unusual format slips through a scrubber. Differential privacy (Dwork, McSherry, Nissim and Smith, 2006) takes a different approach. It does not try to identify sensitive data; it requires that the output of an algorithm hardly depends on any single individual's data, whatever that data is.

::: definition Differential privacy {#def-dp}
Two datasets $D, D'$ are **neighbouring** if they differ in the data of one individual (one record added or removed; the "unit" of privacy — an example, a sequence, a user — must be specified). A randomised algorithm $M$ is **$(\varepsilon, \delta)$-differentially private** if for all neighbouring $D, D'$ and every set $S$ of possible outputs,

$$
\Prob[M(D)\in S] \le e^{\varepsilon}\,\Prob[M(D')\in S] + \delta.
$$ {#eq-dp}

With $\delta = 0$ it is **$\varepsilon$-differentially private** (pure DP).
:::

The parameter $\varepsilon$ bounds how much one individual can change the distribution of outputs: with $\varepsilon = 0.1$, every outcome's probability changes by a factor of at most $e^{0.1}\approx1.105$. The parameter $\delta$ allows a small probability of a larger change and should be much smaller than $1/n$ for a dataset of $n$ individuals. The guarantee holds for every individual and every possible attacker, regardless of what else the attacker knows.

::: definition Sensitivity {#def-sensitivity}
The **$\ell_1$-sensitivity** of a function $f$ from datasets to $\R^d$ is $\Delta f = \max_{D, D'\text{ neighbouring}}\norm{f(D) - f(D')}_1$. A count of records satisfying a property has sensitivity $1$; the mean of $n$ values in $[0, 1]$ (with $n$ fixed, one value replaced) has sensitivity $1/n$.
:::

::: theorem The Laplace mechanism {#thm-laplace}
Let $f$ have $\ell_1$-sensitivity $\Delta f$. The mechanism $M(D) = f(D) + (Z_1, \dots, Z_d)$, where the $Z_i$ are independent with the Laplace density $\frac{1}{2b}e^{-\lvert z\rvert/b}$ and scale $b = \Delta f/\varepsilon$, is $\varepsilon$-differentially private.
:::

::: proof
Let $D, D'$ be neighbouring and write $\mu = f(D)$, $\mu' = f(D')$. The density of $M(D)$ at a point $\mathbf{y}\in\R^d$ is $p_D(\mathbf y) = \prod_i \frac{1}{2b}\exp(-\lvert y_i - \mu_i\rvert/b)$. The ratio of densities is

$$
\frac{p_D(\mathbf y)}{p_{D'}(\mathbf y)} = \prod_{i=1}^d \exp\Bigl(\frac{\lvert y_i - \mu'_i\rvert - \lvert y_i - \mu_i\rvert}{b}\Bigr) \le \prod_{i=1}^d\exp\Bigl(\frac{\lvert \mu_i - \mu'_i\rvert}{b}\Bigr) = \exp\Bigl(\frac{\norm{\mu - \mu'}_1}{b}\Bigr) \le \exp\Bigl(\frac{\Delta f}{b}\Bigr) = e^{\varepsilon},
$$

using the triangle inequality $\lvert y_i - \mu'_i\rvert \le \lvert y_i - \mu_i\rvert + \lvert\mu_i - \mu'_i\rvert$ and then the definition of sensitivity. Integrating $p_D \le e^\varepsilon p_{D'}$ over any set $S$ gives $\Prob[M(D)\in S] \le e^\varepsilon\Prob[M(D')\in S]$.
:::

::: widget plot
f: e/2*exp(-e*abs(x)); e/2*exp(-e*abs(x - 1))
x: -6, 7
y: 0, 1.05
sliders: e=1:0.1:2:0.05
labels: output density without Alice (count 0 + noise); with Alice (count 1 + noise)
caption: The Laplace mechanism on a count of sensitivity $1$, with privacy parameter $\varepsilon$ (slider $e$). The two densities are the outputs on neighbouring datasets. Their ratio never exceeds $e^{\varepsilon}$ at any point, so no observation of the output can shift an attacker's odds that Alice is in the data by more than that factor. Small $\varepsilon$: the curves almost coincide (strong privacy, noisy answers). Large $\varepsilon$: they separate (accurate answers, weak privacy).
:::

Three properties make differential privacy usable as an engineering tool. We state them; proofs are in Dwork and Roth (2014, ch. 2–3).

::: proposition Post-processing, composition and groups {#prop-composition}
(a) **Post-processing.** If $M$ is $(\varepsilon, \delta)$-DP and $g$ is any function (not using the data), then $g\circ M$ is $(\varepsilon, \delta)$-DP.
(b) **Basic composition.** If $M_1, \dots, M_k$ are $(\varepsilon_i, \delta_i)$-DP, releasing all their outputs is $(\sum_i\varepsilon_i, \sum_i\delta_i)$-DP.
(c) **Group privacy.** An $\varepsilon$-DP mechanism is $k\varepsilon$-DP for datasets differing in the data of $k$ individuals.
:::

::: proof
(b) for pure DP and two mechanisms with discrete outputs (the general case is analogous): $\Prob[(M_1(D), M_2(D)) = (a, b)] = \Prob[M_1(D) = a]\Prob[M_2(D) = b] \le e^{\varepsilon_1}\Prob[M_1(D') = a]\,e^{\varepsilon_2}\Prob[M_2(D') = b]$, using independence of the mechanisms' randomness; summing over $(a, b)\in S$ gives the bound. (c): go from $D$ to $D''$ through $k$ neighbouring steps $D = D_0, D_1, \dots, D_k = D''$ and multiply the $k$ factors $e^{\varepsilon}$. (a): for any set $S$, $\Prob[g(M(D))\in S] = \Prob[M(D)\in g^{-1}(S)]$, and [[#eq-dp]] applies to the set $g^{-1}(S)$.
:::

Post-processing means a model trained with DP can be used, fine-tuned on public data or sampled from any number of times without further privacy cost. Composition means every query or training step spends from a **privacy budget**. Tighter accounting than basic composition — the advanced composition theorem, Rényi DP (Mironov, 2017), and the moments accountant of Abadi et al. (2016) — shows that $k$ mechanisms cost roughly $\sqrt{k}$ rather than $k$ times as much for small $\delta$, which is what makes thousands of training steps affordable.

### What $\varepsilon$ means to an attacker {#sec-meaning-eps}

::: proposition DP limits every membership test {#prop-test}
If $M$ is $(\varepsilon, \delta)$-DP, then any test that decides from the output of $M$ whether an individual's record is in the data — any membership-inference attack — has true-positive rate and false-positive rate satisfying

$$
\text{TPR} \le e^{\varepsilon}\,\text{FPR} + \delta.
$$
:::

::: proof
Let $D$ contain the record and $D'$ be the neighbouring dataset without it, and let $S$ be the set of outputs on which the test says "member". Then $\text{TPR} = \Prob[M(D)\in S]$ and $\text{FPR} = \Prob[M(D')\in S]$, and [[#eq-dp]] gives the claim.
:::

At $\varepsilon = 1$ and $\delta = 0$ an attacker that wrongly accuses $1\%$ of non-members can correctly identify at most $2.7\%$ of members; at $\varepsilon = 8$, a value often reported for DP training, the bound is $e^8\approx2981$ times the FPR, which constrains an attacker only at very low false-positive rates. This is why $\varepsilon$ values above about $10$ are generally considered to give weak worst-case guarantees, although empirical attacks on such models typically achieve far less than the bound (Nasr et al., 2021, measured how close real attacks come).

::: example A noisy count and an attacker {#ex-count}
A hospital publishes the number of patients with a rare condition using the Laplace mechanism with $\varepsilon = 0.5$. (a) What is the scale of the noise, and its expected absolute value? (b) What is the probability that the published value is off by more than $5$? (c) An attacker who knows everything except whether Alice is in the data calls her a member when the published count exceeds the count without her by more than $0.5$. Find the TPR and FPR.
::: solution
(a) Sensitivity $1$, so $b = 1/0.5 = 2$. For Laplace noise $\E\lvert Z\rvert = b = 2$.
(b) $\Prob(\lvert Z\rvert > t) = e^{-t/b} = e^{-2.5} = 0.082$.
(c) Without Alice the output is $c + Z$, and $\text{FPR} = \Prob(Z > 0.5) = \tfrac12 e^{-0.5/2} = 0.389$. With Alice it is $c + 1 + Z$, and $\text{TPR} = \Prob(Z > -0.5) = 1 - \tfrac12e^{-0.25} = 0.611$. The ratio is $1.57 \le e^{0.5} = 1.65$, as [[#prop-test]] requires. The attacker is barely better than a coin.
:::
:::

### The listing

The listing implements the Laplace mechanism with the standard library, measures its error at several privacy levels, and runs the attacker of [[#ex-count]] at $\varepsilon = 1$ with several cut-offs.

```python
import math, random
rng = random.Random(2006)

def laplace(scale):
    """One draw from Laplace(0, scale) by inverting the CDF."""
    u = rng.random() - 0.5                      # uniform on [-0.5, 0.5)
    return -scale * math.copysign(1.0, u) * math.log(1 - 2 * abs(u))

def laplace_count(true_count, eps, sensitivity=1.0):
    return true_count + laplace(sensitivity / eps)

# 1. Utility: error of a noisy count for several privacy levels
for eps in (0.1, 0.5, 1.0, 2.0):
    errs = [abs(laplace_count(1000, eps) - 1000) for _ in range(100000)]
    print(f"eps={eps:<4} mean |error| {sum(errs)/len(errs):6.2f}  (theory {1/eps:5.2f})"
          f"  P(|error|>5) {sum(e > 5 for e in errs)/len(errs):.3f}  (theory {math.exp(-5*eps):.3f})")

# 2. Privacy: an attacker sees one release and must say whether Alice (who adds 1
#    to the count) is in the data. Best test: guess 'in' if the output exceeds a cut.
eps = 1.0
D, D2 = 1000, 999                                # with and without Alice
for cut in (999.5, 1001.0, 1003.0):
    tpr = sum(laplace_count(D, eps) > cut for _ in range(100000)) / 100000
    fpr = sum(laplace_count(D2, eps) > cut for _ in range(100000)) / 100000
    print(f"cut {cut}: TPR {tpr:.3f}  FPR {fpr:.3f}  TPR/FPR {tpr/fpr:.2f}  (bound e^eps = {math.e**eps:.2f})")
```

```text
eps=0.1  mean |error|  10.07  (theory 10.00)  P(|error|>5) 0.607  (theory 0.607)
eps=0.5  mean |error|   2.00  (theory  2.00)  P(|error|>5) 0.082  (theory 0.082)
eps=1.0  mean |error|   1.00  (theory  1.00)  P(|error|>5) 0.007  (theory 0.007)
eps=2.0  mean |error|   0.50  (theory  0.50)  P(|error|>5) 0.000  (theory 0.000)
cut 999.5: TPR 0.695  FPR 0.304  TPR/FPR 2.29  (bound e^eps = 2.72)
cut 1001.0: TPR 0.184  FPR 0.068  TPR/FPR 2.72  (bound e^eps = 2.72)
cut 1003.0: TPR 0.025  FPR 0.009  TPR/FPR 2.72  (bound e^eps = 2.72)
```

The error falls as $1/\varepsilon$, matching theory. The attacker's TPR/FPR ratio reaches the bound $e^{\varepsilon}$ once the cut-off is above both means, where the Laplace densities' ratio is exactly $e^\varepsilon$ — the Laplace mechanism's guarantee is tight — but the price of that ratio is a tiny TPR: the attacker identifies Alice only $2.5\%$ of the time when she is present.

## Training with differential privacy {#sec-dpsgd}

To train a neural network privately, Abadi et al. (2016) made each step of stochastic gradient descent ([[neural-networks/optimisers]]) a private mechanism: bound each example's influence by clipping its gradient, then hide any single example's contribution with Gaussian noise.

::: algorithm DP-SGD (Abadi et al., 2016) {#alg-dpsgd}
Inputs: data $\{x_1, \dots, x_N\}$, loss $\mathcal{L}(\theta; x)$, sampling rate $q$, learning rate $\eta$, clipping norm $C$, noise multiplier $\sigma$, number of steps $T$.

For $t = 1, \dots, T$:
1. Sample a batch $B_t$ by including each example independently with probability $q$ (expected size $L = qN$).
2. For each $x_i\in B_t$ compute the per-example gradient $\mathbf g_i = \nabla_\theta\mathcal{L}(\theta; x_i)$.
3. Clip: $\bar{\mathbf g}_i = \mathbf g_i / \max\bigl(1, \norm{\mathbf g_i}_2/C\bigr)$, so $\norm{\bar{\mathbf g}_i}_2\le C$.
4. Add noise: $\tilde{\mathbf g} = \frac{1}{L}\bigl(\sum_{i\in B_t}\bar{\mathbf g}_i + \Normal(\mathbf 0, \sigma^2C^2 I)\bigr)$.
5. Update $\theta \leftarrow \theta - \eta\,\tilde{\mathbf g}$.

Output $\theta$, and compute the overall $(\varepsilon, \delta)$ with a privacy accountant from $q$, $\sigma$, $T$ and $\delta$.
:::

Clipping gives the sum of gradients $\ell_2$-sensitivity $C$ with respect to adding or removing one example; Gaussian noise of standard deviation $\sigma C$ then makes each step a **Gaussian mechanism**, which is $(\varepsilon, \delta)$-DP for suitable $\sigma$ (for one release with $\varepsilon < 1$, $\sigma \ge \sqrt{2\ln(1.25/\delta)}/\varepsilon$ suffices; Dwork and Roth, 2014, Thm A.1). Random subsampling **amplifies** privacy — an example not in the batch is not used at all — and the moments accountant tracks the cumulative cost over $T$ steps far more tightly than basic composition. Only the noisy gradients touch the data; by post-processing, the final model and everything computed from it inherit the guarantee.

::: example Noise against signal in one step {#ex-dpsgd}
A DP-SGD step uses expected batch size $L = 1024$, clipping norm $C = 1$ and noise multiplier $\sigma = 1$. If all clipped gradients point roughly the same way with norm $1$, compare the norm of the averaged signal with the noise per coordinate and in total for a model with $d = 10^6$ parameters.
::: solution
The averaged signal has norm about $1$. The noise vector, divided by $L$, has standard deviation $\sigma C/L = 1/1024\approx 0.001$ per coordinate and total norm about $\sqrt d\,\sigma C/L = 1000/1024\approx0.98$. So the noise has nearly the same norm as the signal, spread over a million directions. Training still works because the noise averages out across steps while the consistent signal accumulates, but larger batches (larger $L$) and fewer parameters (or parameter-efficient fine-tuning, which updates few of them) improve the ratio — one reason DP fine-tuning of large pretrained models works better than DP training from scratch.
:::
:::

On image benchmarks, Abadi et al. reported MNIST accuracies of about $90\%$, $95\%$ and $97\%$ at $\varepsilon = 0.5$, $2$ and $8$ ($\delta = 10^{-5}$), against about $98\%$–$99\%$ without privacy. For language models, Li et al. (2022) and Yu et al. (2022) showed that fine-tuning large *pretrained* models with DP on a private dataset loses relatively little utility at moderate $\varepsilon$ when hyperparameters are tuned (large batches in particular). Pretraining with DP is much costlier because of the scale and the need for huge batches; Google described VaultGemma (2025), a 1-billion-parameter model pretrained with sequence-level differential privacy, whose reported performance was comparable to non-private models of several years earlier. DP has also been used for federated learning of keyboard language models on phones, where the privacy unit is a user.

### The privacy–utility trade-off {#sec-tradeoff}

The trade-off can be computed exactly for simple queries.

::: example A private mean {#ex-mean}
Each of $n$ users holds a value in $[0, 1]$ (for example, whether they used a feature). We release the mean with the Laplace mechanism at $\varepsilon = 1$. What is the standard deviation of the noise for $n = 100$, $n = 10^4$ and $n = 10^6$? How does it compare with the sampling error of a mean of $n$ values with standard deviation $0.5$?
::: solution
The sensitivity is $1/n$, so $b = 1/(n\varepsilon)$ and the noise standard deviation is $\sqrt2\,b = \sqrt2/n$: $0.0141$, $1.41\times10^{-4}$ and $1.41\times10^{-6}$. The sampling standard error is $0.5/\sqrt n$: $0.05$, $0.005$ and $0.0005$. Noise falls as $1/n$ and sampling error as $1/\sqrt n$, so for large populations the privacy noise is negligible. For a small subgroup — $100$ people — the noise is a quarter of the sampling error; for a subgroup of $10$ it is larger than it.
:::
:::

The example captures the general shape. DP protects individuals by making the output insensitive to each of them, which is cheap for patterns shared by many people and expensive for information carried by few. Rare dialects, minority groups and long-tail facts are learned less well under DP; Bagdasaryan, Poursaeed and Shmatikov (2019) found that DP-SGD reduced accuracy most for under-represented classes and sub-groups. Feldman's argument ([[#def-counterfactual]]) explains why: memorising the long tail is what DP forbids. This is a genuine trade-off between privacy and fairness, and neither can simply be maximised.

::: warning A differential-privacy claim is only as meaningful as its unit and its $\varepsilon$
"Trained with differential privacy" can mean example-level, sequence-level or user-level protection. A guarantee for $512$-token sequences says little about a person whose data spans thousands of sequences: by group privacy ([[#prop-composition]]) their effective $\varepsilon$ grows with the number of sequences. Report the unit, $\varepsilon$, $\delta$, the accountant, and whether hyperparameter tuning on the private data was counted (Ponomareva et al., 2023, give reporting guidance).
:::

::: quiz
A company fine-tunes a model on customer emails with DP-SGD at $\varepsilon = 2$, $\delta = 10^{-8}$, with the privacy unit one email. Which statement is correct?
- [ ] No information about any customer can be inferred from the model.
- [x] For any single email, membership tests on the model satisfy $\text{TPR}\le e^{2}\,\text{FPR} + 10^{-8}$; a customer who sent $50$ emails has a much weaker guarantee.
- [ ] Sampling from the model many times weakens the guarantee, because each sample spends budget.
- [ ] The guarantee requires that the emails be scrubbed of names first.
::: solution
DP bounds the influence of one privacy unit — here an email — on the output distribution; by [[#prop-test]] membership tests obey the stated bound. Group privacy means a customer with $50$ emails is only protected at $\varepsilon$ up to $100$. Patterns shared by many customers can still be learned and inferred, which is the point of the model. Sampling is post-processing and costs nothing; DP needs no scrubbing, although scrubbing can still be useful in addition.
:::
:::

## Privacy beyond memorisation {#sec-beyond}

**Inference.** A model need not have memorised anything about a person to violate their privacy. Staab et al. (2024) found that large language models could infer personal attributes — location, age, occupation, income — from seemingly innocuous text such as forum comments, with accuracy approaching that of human investigators at a fraction of the cost and time. This is a capability rather than a leak of training data; DP training does nothing against it.

**Contextual integrity.** Nissenbaum's framework (2004) holds that privacy concerns whether information flows match the norms of the context in which it was shared. A post shared publicly with a small community may be technically public, but collecting it into a training set, or surfacing it in answer to a stranger's question, can violate the norms under which it was shared. This view helps explain why many people object to training on "public" data, while others argue that publicly posted information carries no reasonable expectation of privacy; legal regimes differ in how far they adopt either view.

**Users' conversations and retrieval.** Deployed assistants receive personal information from users. Questions about retention, use for training, human review and access by third parties are governed by providers' policies and by law rather than by model mathematics; as of 2026 major providers offer settings to exclude conversations from training, with terms that differ between consumer and business products and change over time. Retrieval-augmented systems ([[prompting-rag/retrieval-augmented-generation]]) can expose documents to users who should not see them if access controls are not enforced at retrieval time; prompt injection can be used to exfiltrate data from a context ([[safety-alignment/robustness-jailbreaks]]).

**Law.** Data-protection law applies to training data that contains personal data. Under the EU's General Data Protection Regulation (GDPR), processing requires a legal basis (for model training, providers have generally relied on "legitimate interests", whose application to web-scale training has been examined by European data-protection authorities), and individuals have rights of access, rectification and erasure. In March 2023 Italy's data-protection authority, the Garante, temporarily restricted ChatGPT in Italy, citing among other things the legal basis for training and the absence of age verification; the service was restored about a month later after changes. The European Data Protection Board published an opinion on AI models and personal data in December 2024. How rights such as erasure apply to a trained model — which does not store records in retrievable form, yet may reproduce some — is unresolved (as of 2026).

**Unlearning.** Machine unlearning aims to remove the influence of particular data from a trained model without retraining from scratch. Exact unlearning is possible by design (training separate models on shards of the data, so that only one shard need be retrained; Bourtoule et al., 2021), but for large language models most methods are approximate — fine-tuning to suppress a piece of knowledge — and evaluations have found that suppressed information can often be recovered by rephrased prompts or light fine-tuning. Verifying unlearning is itself an open research problem.

::: history
Privacy failures of "anonymised" data motivated the field: Sweeney (1997–2000) re-identified medical records from ZIP code, birth date and sex, and Narayanan and Shmatikov (2008) de-anonymised the Netflix Prize dataset. Dwork, McSherry, Nissim and Smith (2006) introduced differential privacy and the Laplace mechanism; Dwork and Roth's monograph (2014) is the standard reference. Shokri et al. (2017) introduced membership inference against machine-learning models, and Abadi et al. (2016) made deep learning differentially private with DP-SGD and the moments accountant. The US Census Bureau used differential privacy for the 2020 census redistricting data. For language models, Carlini et al. (2019) measured unintended memorisation of inserted "canaries", Carlini et al. (2021) extracted training data from GPT-2, Carlini et al. (2023) quantified how memorisation scales, and Nasr et al. (2023) extended extraction to production models. Brown et al. (2022) asked what it would mean for a language model to preserve privacy, arguing that both data sanitisation and DP fall short of the contextual notion people care about.
:::

::: summary
- Models memorise some training sequences verbatim; extractability grows with model size, duplication and prompt length (empirical regularities), and personal data that appears once can still be memorised.
- Deduplication greatly reduces memorised output; alignment changes typical behaviour but need not remove memorised content.
- Membership inference measures leakage; its quality is judged by the true-positive rate at low false-positive rates, and on large pretraining corpora many attacks are near chance.
- An $(\varepsilon, \delta)$-DP algorithm's output distribution changes by at most a factor $e^\varepsilon$ (plus $\delta$) when one individual's data changes; the Laplace mechanism with scale $\Delta f/\varepsilon$ achieves it, and every membership test then has $\text{TPR}\le e^\varepsilon\text{FPR} + \delta$.
- DP is closed under post-processing and composes, so training spends a budget; DP-SGD clips per-example gradients and adds Gaussian noise, with an accountant tracking the total.
- Utility costs fall with population size and concentrate on rare data and small groups — a real tension between privacy, long-tail learning and fairness.
- Inference of attributes, contextual norms, conversation handling, data-protection law and unlearning raise privacy questions that DP training does not address.
:::

## Exercises

::: exercise Laplace scale {level=1 check="4"}
A count query (sensitivity $1$) is released with $\varepsilon = 0.25$. What is the scale $b$ of the Laplace noise?
::: solution
$b = \Delta f/\varepsilon = 1/0.25 = 4$.
:::
:::

::: exercise Tail of the noise {level=1 check="0.135"}
With $b = 4$, what is the probability that the noise exceeds $8$ in absolute value? Give three decimal places.
::: solution
$\Prob(\lvert Z\rvert > t) = e^{-t/b} = e^{-2} = 0.135$.
:::
:::

::: exercise Composition {level=1 check="1.5"}
An analyst runs three queries with Laplace mechanisms at $\varepsilon = 0.5$, $0.25$ and $0.75$. What total $\varepsilon$ does basic composition give?
::: solution
$0.5 + 0.25 + 0.75 = 1.5$.
:::
:::

::: exercise An attack bound {level=2 check="0.074"}
A model is trained with pure $\varepsilon = 2$ DP. An attacker's test has false-positive rate $1\%$. What is the largest possible true-positive rate? Give three decimal places.
::: solution
$\text{TPR}\le e^2\cdot0.01 = 7.389\cdot0.01 = 0.0739$, i.e. $0.074$.
:::
:::

::: exercise Group privacy for a heavy user {level=2 check="40"}
A model is trained with sequence-level $\varepsilon = 0.8$ (and $\delta$ negligible). A person's writing makes up $50$ training sequences. By group privacy, what $\varepsilon$ bounds the protection of that person's data as a whole?
::: solution
$k\varepsilon = 50\cdot0.8 = 40$ — a bound so loose as to give essentially no guarantee. User-level DP, which treats all of a person's data as one unit, is needed for a meaningful guarantee in this case.
:::
:::

::: exercise A private histogram {level=2}
A histogram of $n$ users' ages in $10$ bins is released, each user contributing to exactly one bin. (a) What is the $\ell_1$-sensitivity of the vector of $10$ counts under adding or removing one user? (b) What Laplace scale per bin gives $\varepsilon = 1$? (c) Why is this better than treating the $10$ counts as $10$ separate queries and composing?
::: solution
(a) Adding or removing a user changes one count by $1$: sensitivity $1$. (b) $b = 1/\varepsilon = 1$ per bin, by [[#thm-laplace]] with $d = 10$. (c) Composing $10$ separate count queries at $\varepsilon = 1$ each would give $\varepsilon = 10$, or require scale $10$ per bin for a total of $1$. Because the bins are disjoint, one user affects only one count, and the joint sensitivity is still $1$ — a tenfold saving (sometimes called parallel composition).
:::
:::

::: exercise Error of a private mean {level=2 check="0.0014"}
The mean of $n = 1000$ values in $[0, 1]$ is released with the Laplace mechanism at $\varepsilon = 1$. What is the standard deviation of the noise? Give two significant figures.
::: solution
Sensitivity $1/n = 10^{-3}$, $b = 10^{-3}$, standard deviation $\sqrt2\,b = 1.41\times10^{-3}\approx0.0014$.
:::
:::

::: exercise Gaussian noise for one release {level=2 check="9.69"}
Using the sufficient condition $\sigma\ge\sqrt{2\ln(1.25/\delta)}/\varepsilon$ for a single Gaussian release of a query with $\ell_2$-sensitivity $1$, what is the smallest noise standard deviation it allows for $(\varepsilon, \delta) = (0.5, 10^{-5})$? Give two decimal places.
::: solution
$\ln(1.25/10^{-5}) = \ln(1.25\times10^5) = 11.736$, so $\sqrt{2\cdot11.736} = 4.845$ and $\sigma = 4.845/0.5 = 9.69$. Halving $\varepsilon$ doubles the noise; making $\delta$ ten times smaller increases it only by about $10\%$.
:::
:::

::: exercise Why duplicates matter more than size suggests {level=3}
Using the stylised model of [[#ex-duplication]], $q(c) = \min(1, q_1c^{\alpha})$, show that for $\alpha > 1$ a record duplicated $c$ times contributes more expected leakage than $c$ separate singleton records. For $q_1 = 10^{-4}$ and $\alpha = 3$, at what duplicate count does extraction become certain in this model? Discuss what deduplication cannot achieve.
::: solution
One record with $c$ copies has extraction probability $q_1c^\alpha$; $c$ distinct singletons have expected total $cq_1$. The ratio is $c^{\alpha - 1} > 1$ for $c > 1$ and $\alpha > 1$: duplication concentrates leakage super-linearly. Certainty is reached when $q_1c^3 = 1$, i.e. $c = 10^{4/3} = 21.5$, so at $22$ copies. Deduplication brings every record down to the singleton rate but cannot go below it; it also works only on exact or near-exact duplicates, while the same personal information may appear in differently worded documents. Protection of singleton information requires something like DP, or not collecting the data.
:::
:::

::: exercise The Laplace mechanism is tight {level=3}
For the Laplace mechanism on a count with $\varepsilon = 1$, show that every set of outputs $S\subseteq[c + 1, \infty)$ (where $c$ is the count without Alice) has $\Prob[M(D)\in S] = e\,\Prob[M(D')\in S]$ exactly, so the bound of [[#thm-laplace]] cannot be improved. Then explain the last two rows of the listing's output.
::: solution
For $y \ge c + 1$ the densities are $\tfrac12e^{-(y - c - 1)}$ with Alice and $\tfrac12 e^{-(y - c)}$ without; their ratio is $e^{1}$ at every such $y$. Integrating over $S$ gives the equality. In the listing the cut-offs $1001$ and $1003$ lie above both means ($999$ and $1000$), so the rejection region is of this form and TPR/FPR $= e = 2.72$. At cut $999.5$ the region includes points between the means where the ratio is smaller, and TPR/FPR $= 2.29$.
:::
:::
