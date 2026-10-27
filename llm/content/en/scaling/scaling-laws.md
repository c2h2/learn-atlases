Train a family of language models that differ only in size, on the same data with the same recipe, and plot their final test loss against the number of parameters on logarithmic axes. The points fall close to a straight line. Do the same with the number of training tokens, or with the compute spent, and you get straight lines again. Over five, six, sometimes seven orders of magnitude, the loss of a language model is a smooth and predictable function of how much you put into it. This regularity — a **scaling law** — is one of the most consequential empirical observations in machine learning. It turned model building into something closer to engineering: before spending tens of millions of dollars on a run, one can train a series of small models, fit a curve, and predict what the large one will achieve.

This chapter is about what those curves are, how they are measured and fitted, and how far they can be trusted. It defines the power-law form and the irreducible loss, fits power laws by least squares in log space with a short program, states the results of Kaplan et al. (2020) together with the conditions under which they were obtained, and then turns to the limits: why extrapolation is risky, why a fitted exponent depends on what else is in the model, and why smooth loss curves do not imply smooth curves for the abilities people care about. The next chapter, [[scaling/compute-optimal-training]], uses these laws to decide how to divide a compute budget between parameters and data. The pretraining pipeline whose output we measure is the subject of [[pretraining]]; the evaluation of a run in progress is in [[pretraining/in-training-evaluation]].

## What is measured {#sec-measure}

Three quantities describe the scale of a training run.

- $N$, the **number of parameters**. Kaplan et al. (2020) counted only **non-embedding** parameters, excluding the token and position embedding matrices; Hoffmann et al. (2022) counted all of them. The choice matters at small sizes, where embeddings are a large share of the model ([[scaling/compute-optimal-training#sec-why-differ]]).
- $D$, the **number of training tokens** processed. If the data are repeated, $D$ counts every pass; whether repeated tokens are worth as much as fresh ones is a separate question ([[scaling/compute-optimal-training#sec-data-constrained]]).
- $C$, the **training compute** in floating-point operations (FLOPs). For a dense Transformer $C\approx6ND$: two FLOPs per parameter per token in the forward pass and four in the backward pass. The derivation, with the attention correction, is in [[scaling/flops-memory]]. Older papers quote compute in **petaflop/s-days**: $1$ PF-day $= 10^{15}\cdot86{,}400 = 8.64\times10^{19}$ FLOPs.

The response is the **loss**: the average cross-entropy, in nats per token, of the model's next-token predictions on held-out text from the training distribution ([[text-and-language/perplexity]]). Loss has two properties that make it the natural thing to model. It is a continuous, low-noise average over millions of tokens, so small improvements are measurable; and it is the quantity the training run actually optimises, so it responds to scale directly rather than through a threshold.

A scaling study fixes everything except the variable under study: architecture family, tokeniser, data distribution, optimiser and learning-rate recipe. Each experiment is a training run, so a study of a few dozen sizes is itself a substantial compute budget. Two kinds of measurement are common. In a **size sweep**, models of different $N$ are trained on so much data that data is not the bottleneck, and their converged loss gives $L(N)$. In a **data sweep**, a model large enough not to be the bottleneck is trained on subsets of different size, with early stopping, giving $L(D)$. Plotting the best loss reached for each compute budget across many runs gives the **compute frontier** $L(C)$.

## Power laws {#sec-power-laws}

::: definition Power law and scaling exponent {#def-power-law}
A positive quantity $L$ follows a **power law** in $x > 0$ with **exponent** $\alpha > 0$ if

$$
L(x) = \left(\frac{x_c}{x}\right)^{\alpha} = A\,x^{-\alpha},\qquad A = x_c^{\alpha},
$$ {#eq-power}

for constants $x_c, A > 0$. Taking logarithms, $\log L = \log A - \alpha\log x$: a power law is a **straight line of slope $-\alpha$ on log–log axes**.
:::

The defining property of a power law is **scale invariance**: multiplying $x$ by a fixed factor $k$ multiplies $L$ by the fixed factor $k^{-\alpha}$, wherever you start. Each doubling of the model buys the same *relative* improvement. Exponential laws behave differently — each fixed *increment* of $x$ buys a fixed factor — and would look like straight lines on semi-log axes instead. Distinguishing the two requires data over a wide range, which is why scaling plots span many orders of magnitude.

::: example Reading an exponent {#ex-exponent}
Kaplan et al. (2020) reported $L(N)\approx(N_c/N)^{0.076}$ with $N_c\approx8.8\times10^{13}$ non-embedding parameters. Predict the loss of a model with $N = 10^9$, and the gain from doubling it.
::: solution
$L(10^9) = (8.8\times10^{13}/10^9)^{0.076} = 88{,}000^{0.076} = e^{0.076\cdot11.385} = e^{0.865} = 2.38$ nats per token. Doubling $N$ multiplies the loss by $2^{-0.076} = 0.949$: a $5.1\%$ reduction, to about $2.25$. The same $5.1\%$ is bought by every doubling, whether from $10^6$ to $2\times10^6$ parameters or from $10^{11}$ to $2\times10^{11}$ — but the later doublings cost a thousand times more.
:::
:::

A pure power law decreases to zero as $x\to\infty$, which cannot be right for cross-entropy: natural text has positive entropy, so no model can drive the loss below it. Real curves bend away from the straight line at large scale, and the standard way to express this is an additive constant.

::: definition Irreducible loss {#def-irreducible}
A **power law with an irreducible term** is

$$
L(x) = E + A\,x^{-\alpha},
$$ {#eq-irreducible}

with $E\ge0$. The constant $E$ is the **irreducible loss** — the limit as $x\to\infty$ — and $L - E$ is the **reducible loss**. Under the idealised interpretation of Henighan et al. (2020), $E$ estimates the entropy of the data distribution and $L - E$ the KL divergence between the data and the model.
:::

The interpretation in the last sentence is suggestive rather than exact. A fitted $E$ also absorbs everything the model family *cannot* learn at any size — limitations of the tokeniser, the context length and the architecture — and its value depends on what range was fitted. With several resources one adds one decreasing term per resource, as in the Chinchilla form $L(N, D) = E + A/N^\alpha + B/D^\beta$ that the next chapter is built on.

The irreducible term has a consequence that is easy to miss: on log–log axes, [[#eq-irreducible]] is not a straight line, and its local slope is not $-\alpha$.

::: proposition Apparent exponent {#prop-local-exponent}
For $L(x) = E + Ax^{-\alpha}$, the local log–log slope is

$$
\frac{\dd\log L}{\dd\log x} = -\alpha\,\frac{L - E}{L},
$$ {#eq-local}

whose magnitude falls from $\alpha$ (when $L\gg E$) towards $0$ (as $L\to E$). The slope of $\log(L - E)$ against $\log x$ is exactly $-\alpha$ everywhere.
:::

::: proof
Write $u = \log x$, so $x^{-\alpha} = e^{-\alpha u}$ and $L = E + Ae^{-\alpha u}$. Then $\dd L/\dd u = -\alpha Ae^{-\alpha u} = -\alpha(L - E)$, and $\dd\log L/\dd u = (\dd L/\dd u)/L = -\alpha(L - E)/L$. For the second claim, $\log(L - E) = \log A - \alpha u$ is linear in $u$ with slope $-\alpha$.
:::

So a straight-line fit to $\log L$ against $\log N$ measures a mixture of $\alpha$ and the ratio of reducible to total loss over the fitted range. Two studies with the same underlying $\alpha$ can report very different slopes if their losses sit at different distances from $E$ — one reason published exponents vary so much.

::: widget plot
f: log10(c + 400*10^(-a*x)); log10(400*10^(-a*x)); log10(c)
x: 5, 13
y: -0.6, 1.2
sliders: a=0.34:0.05:0.6:0.01; c=1.7:0.2:3:0.1
labels: $\log_{10}(E + A N^{-\alpha})$; pure power law $\log_{10}(A N^{-\alpha})$; $\log_{10} E$
caption: Loss against parameters on log–log axes ($x = \log_{10}N$, $y = \log_{10}L$, $A = 400$). The pure power law is a straight line of slope $-\alpha$. Adding the irreducible loss $E$ (slider $c$) bends the curve towards the horizontal line $\log_{10}E$: at small $N$ it follows the power law, at large $N$ it flattens. Over the range $N = 10^6$ to $10^8$ the curve looks nearly straight — but with a slope about half of $\alpha$, as [[#prop-local-exponent]] predicts.
:::

## Fitting a power law {#sec-fitting}

Given measurements $(x_i, L_i)$, $i = 1,\dots,n$, the simplest fit of [[#eq-power]] is ordinary least squares on the logarithms.

::: proposition Least squares in log space {#prop-logfit}
Let $u_i = \log x_i$ and $v_i = \log L_i$, with means $\bar u, \bar v$. The values of $a = \log A$ and $\alpha$ minimising $\sum_i\big(v_i - a + \alpha u_i\big)^2$ are

$$
\hat\alpha = -\frac{\sum_i(u_i - \bar u)(v_i - \bar v)}{\sum_i(u_i - \bar u)^2},\qquad \hat a = \bar v + \hat\alpha\bar u.
$$ {#eq-logfit}

If the measurement errors are multiplicative, $L_i = A x_i^{-\alpha}e^{\varepsilon_i}$ with independent $\varepsilon_i\sim\Normal(0,\sigma^2)$, this is the maximum-likelihood estimate.
:::

::: proof
The objective is the residual sum of squares of the linear model $v = a + bu$ with $b = -\alpha$. Setting its partial derivatives to zero gives $\sum_i(v_i - a - bu_i) = 0$, so $a = \bar v - b\bar u$, and $\sum_i u_i(v_i - a - bu_i) = 0$; substituting the first into the second gives $b = \sum_i(u_i - \bar u)(v_i - \bar v)/\sum_i(u_i - \bar u)^2$, the familiar slope of simple linear regression ([[ml-fundamentals/linear-regression]]). The objective is a convex quadratic, so this stationary point is the minimum. Under the multiplicative model, $v_i = a + bu_i + \varepsilon_i$ with Gaussian $\varepsilon_i$, and the log-likelihood is $-\frac{1}{2\sigma^2}\sum_i(v_i - a - bu_i)^2$ plus a constant, maximised by the same $a, b$.
:::

Fitting in log space is a modelling choice, not a convenience: it weights every point by its *relative* error, so a $1\%$ deviation counts the same at loss $5$ as at loss $2$. Fitting $L$ itself by least squares would let the largest losses (the smallest models) dominate. Multiplicative noise is also a fair description of seed-to-seed variation in training loss.

With an irreducible term the problem is no longer linear. A robust approach is to **profile** over $E$: for each candidate $E$ below the smallest observed loss, $\log(L_i - E)$ is linear in $\log x_i$, so [[#eq-logfit]] gives the best $A$ and $\alpha$ for that $E$; keep the $E$ whose fitted curve has the smallest error in $\log L$. Hoffmann et al. (2022) instead minimised a Huber loss (with $\delta = 10^{-3}$) between $\log L_i$ and the logarithm of the model, using L-BFGS from a grid of starting points; the Huber loss limits the influence of outlying runs. The program below generates synthetic losses from $L = 1.7 + 400N^{-0.34}$ with $1\%$ multiplicative noise, fits both forms on the nine smallest sizes ($10^6$ to $10^8$ parameters), and extrapolates.

```python
import math, random

random.seed(0)
E_true, A_true, alpha_true = 1.7, 400.0, 0.34       # L(N) = E + A / N^alpha
Ns = [10 ** (6 + 0.25 * k) for k in range(13)]      # 1e6 ... 1e9 parameters
data = [(N, (E_true + A_true * N ** -alpha_true) * math.exp(random.gauss(0, 0.01)))
        for N in Ns]                                # 1% multiplicative noise

def linfit(xs, ys):
    """Least-squares line y = a + b x; returns a, b, residual sum of squares."""
    n = len(xs); mx = sum(xs) / n; my = sum(ys) / n
    sxx = sum((x - mx) ** 2 for x in xs)
    b = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sxx
    a = my - b * mx
    return a, b, sum((y - a - b * x) ** 2 for x, y in zip(xs, ys))

def fit_pure(pts):                                  # log L = log A - alpha log N
    a, b, rss = linfit([math.log(N) for N, _ in pts], [math.log(L) for _, L in pts])
    return math.exp(a), -b, rss

def fit_with_E(pts):                                # profile over E: log(L - E) is linear
    best = None
    Lmin = min(L for _, L in pts)
    for i in range(1, 2000):
        E = Lmin * i / 2000
        a, b, _ = linfit([math.log(N) for N, _ in pts], [math.log(L - E) for _, L in pts])
        rss = sum((math.log(L) - math.log(E + math.exp(a) * N ** b)) ** 2 for N, L in pts)
        if best is None or rss < best[0]:
            best = (rss, E, math.exp(a), -b)
    return best[1:]

small = data[:9]                                    # fit on 1e6 ... 1e8 only
A1, al1, _ = fit_pure(small)
E2, A2, al2 = fit_with_E(small)
print(f"pure power law   : L = {A1:.3f} N^-{al1:.4f}")
print(f"with irreducible : L = {E2:.3f} + {A2:.1f} N^-{al2:.4f}")
print(" N        observed  pure-fit  E-fit")
for N, L in data:
    tag = "" if (N, L) in small else "  <- extrapolated"
    print(f"{N:8.1e}  {L:.4f}    {A1 * N ** -al1:.4f}    {E2 + A2 * N ** -al2:.4f}{tag}")
for N in (1e11, 1e13):
    print(f"{N:8.1e}  true {E_true + A_true * N ** -alpha_true:.4f}  "
          f"pure {A1 * N ** -al1:.4f}  E-fit {E2 + A2 * N ** -al2:.4f}")
```

```text
pure power law   : L = 53.730 N^-0.1702
with irreducible : L = 1.667 + 396.4 N^-0.3387
 N        observed  pure-fit  E-fit
 1.0e+06  5.3986    5.1196    5.3467
 1.8e+06  4.6344    4.6419    4.6949
 3.2e+06  4.1382    4.2088    4.1585
 5.6e+06  3.7418    3.8161    3.7172
 1.0e+07  3.3334    3.4600    3.3540
 1.8e+07  3.0689    3.1371    3.0552
 3.2e+07  2.8324    2.8444    2.8093
 5.6e+07  2.6052    2.5790    2.6069
 1.0e+08  2.4302    2.3384    2.4404
 1.8e+08  2.3312    2.1202    2.3034  <- extrapolated
 3.2e+08  2.2374    1.9223    2.1907  <- extrapolated
 5.6e+08  2.1100    1.7430    2.0980  <- extrapolated
 1.0e+09  2.0416    1.5803    2.0216  <- extrapolated
 1.0e+11  true 1.7728  pure 0.7218  E-fit 1.7416
 1.0e+13  true 1.7152  pure 0.3297  E-fit 1.6828
```

Within the fitted range the pure power law is not bad — its errors are a few per cent — but its exponent, $0.170$, is half the true $0.34$, exactly as [[#prop-local-exponent]] predicts: at $N = 10^7$, $(L - E)/L = 1.65/3.35 = 0.49$, and $0.34\cdot0.49 = 0.17$. Extrapolated one decade it is already $23\%$ too optimistic, and at $10^{13}$ it predicts a loss of $0.33$, far below the entropy floor. The fit with $E$ recovers $\alpha$ well ($0.339$) and extrapolates within $2\%$ even at $10^{13}$, though its $E$ is slightly low, so it errs on the optimistic side. Both conclusions depend on the data really following [[#eq-irreducible]] — which in a synthetic experiment we know, and in a real one we do not.

::: example Identifying the floor from three runs {#ex-three-points}
Three models with $N = 10^7, 10^8, 10^9$ reach losses $L_1 = 3.367$, $L_2 = 2.462$, $L_3 = 2.048$. Assuming $L = E + AN^{-\alpha}$, find $E$ and $\alpha$.
::: solution
For sizes in geometric progression with ratio $r = 10$, the reducible losses $L_k - E$ are in geometric progression with ratio $r^{-\alpha}$, so $(L_2 - E)^2 = (L_1 - E)(L_3 - E)$. Expanding, $L_2^2 - 2L_2E = L_1L_3 - (L_1 + L_3)E$, so

$$
E = \frac{L_1L_3 - L_2^2}{L_1 + L_3 - 2L_2} = \frac{6.8975 - 6.0614}{0.4910} = 1.70.
$$

Then $10^{-\alpha} = (L_2 - E)/(L_1 - E) = 0.762/1.667 = 0.457$, so $\alpha = 0.34$. (These are the noiseless values of the program's law.) With noisy data this three-point formula is very sensitive — the denominator is a second difference — which is why real fits use many sizes and a robust loss.
:::
:::

## The Kaplan scaling laws {#sec-kaplan}

The paper that made scaling laws central to language modelling is *Scaling Laws for Neural Language Models* by Kaplan, McCandlish, Henighan, Brown, Chess, Child, Gray, Radford, Wu and Amodei (OpenAI, 2020). They trained decoder-only Transformers from $768$ to $1.5$ billion non-embedding parameters on up to $23$ billion tokens of WebText2, with a context of $1024$ tokens, and measured test loss in nats per token.

::: proposition Kaplan et al. (2020), empirical {#prop-kaplan}
For Transformer language models trained on WebText2, Kaplan et al. found, when the other resources are not a bottleneck:

$$
\begin{aligned}
L(N) &= (N_c/N)^{\alpha_N}, & \alpha_N &\approx 0.076, & N_c &\approx 8.8\times10^{13}\ \text{non-embedding parameters},\\
L(D) &= (D_c/D)^{\alpha_D}, & \alpha_D &\approx 0.095, & D_c &\approx 5.4\times10^{13}\ \text{tokens},\\
L(C_{\min}) &= (C_c/C_{\min})^{\alpha_C}, & \alpha_C &\approx 0.050, & C_c &\approx 3.1\times10^{8}\ \text{PF-days},
\end{aligned}
$$

and, for $N$ and $D$ jointly (training with early stopping),

$$
L(N, D) = \left[\left(\frac{N_c}{N}\right)^{\alpha_N/\alpha_D} + \frac{D_c}{D}\right]^{\alpha_D}.
$$ {#eq-kaplan-nd}

Here $C_{\min}$ is the compute used when training at the batch size that minimises compute. They also found that, within a wide range, loss depends only weakly on the shape of the network (depth against width, number of heads) at fixed $N$.
:::

This is an empirical summary, not a theorem, and its numbers come with conditions. The constants $N_c, D_c, C_c$ depend on the tokeniser and the data and have no meaning by themselves; only the exponents are meant to transfer, and even they change with the data distribution and with what is counted. The laws have no irreducible term — the authors noted that they must eventually break down, and estimated where $L(C)$ and $L(D)$ would come into conflict, at roughly $10^{4}$ PF-days and a loss of about $1.7$ nats per token. Most consequentially, their recommendation for compute-efficient training — model size growing as $N\propto C^{0.73}$ while data grows only as $D\propto C^{0.27}$ — was derived from runs whose learning-rate schedule was not adjusted to the number of tokens trained. That recommendation was overturned two years later, as the next chapter explains.

::: example Data or parameters? {#ex-kaplan-nd}
Using [[#eq-kaplan-nd]], compare the loss of a model with $N = 10^9$ non-embedding parameters trained on $D = 10^{10}$ tokens with its loss on effectively unlimited data.
::: solution
$(N_c/N)^{\alpha_N/\alpha_D} = 88{,}000^{0.8} = 9{,}028$ and $D_c/D = 5{,}400$, so $L = (14{,}428)^{0.095} = 2.48$. With $D\to\infty$ the second term vanishes and $L = 9{,}028^{0.095} = 88{,}000^{0.076} = 2.38$. Ten billion tokens costs this model $0.11$ nats per token relative to infinite data — a large gap, as the next chapter's Chinchilla analysis predicts for a $10^9$-parameter model given only ten tokens per parameter.
:::
:::

Kaplan et al. reported other regularities that remain useful. The **critical batch size** — above which larger batches stop reducing the number of steps proportionally (McCandlish et al., 2018) — grows as the loss falls, roughly as a power of the loss, independently of model size. Larger models are more **sample-efficient**: they reach a given loss with fewer tokens. And **transfer** to other text distributions is a roughly constant offset in loss: a model's loss on books or Wikipedia, when trained on WebText2, tracks its training-distribution loss with a fixed penalty, so improvements carry over.

::: warning A straight line on log–log axes is not proof of a power law
Almost any smooth, slowly varying monotone curve looks straight over one or two decades on log–log axes, and the eye is very forgiving of small curvature. A fit that is excellent over $10^6$ to $10^8$ parameters says little about $10^{11}$. Before trusting an extrapolation, ask: over how many decades was the law fitted, is there visible curvature in the residuals, how does the answer change if the largest or smallest points are dropped, and would a law with an irreducible term fit as well and extrapolate differently? Besiroglu et al. (2024) showed that refitting even the carefully collected Chinchilla data gives noticeably different parameters ([[scaling/compute-optimal-training]]).
:::

## Why power laws? {#sec-why}

Nobody has a derivation of the exponents of real language models from first principles. There are, however, models that explain why power laws, rather than exponentials or logarithms, should be expected.

One explanation is through the **geometry of the data**. Sharma and Kaplan (2020) argued that if a network approximates a function on a data manifold of intrinsic dimension $d$, and $N$ parameters let it divide the manifold into regions of size proportional to $N^{-1/d}$, then piecewise approximation errors scale as a power of the region size, giving a loss that falls like $N^{-c/d}$ for a small constant $c$; they found exponents near $4/d$ in small experiments. Higher intrinsic dimension means a smaller exponent, consistent with language — high-dimensional, heterogeneous — having small exponents.

A second is through the **distribution of what there is to learn**. Suppose the data contain many independent "skills" or facts, the $k$-th occurring with frequency proportional to $k^{-(1+a)}$ — a Zipf-like law, as word frequencies follow ([[text-and-language/text-as-data]]). A model with capacity for the $n$ most frequent ones leaves a loss proportional to the total frequency of the rest, $\sum_{k > n}k^{-(1+a)}\approx n^{-a}/a$: a power law in capacity. Hutter (2021) and Michaud et al. (2023, the "quantization model") developed versions of this argument, and Bahri et al. (2021) distinguished regimes in which a resource limits the loss through variance (too little data to pin down parameters) or through resolution (too little capacity), each giving power laws with related exponents.

These models are illustrations, not predictions: they show that power laws arise naturally from heavy-tailed structure, but the exponents of real models are measured, not derived. They also suggest that the exponent is a property of the data as much as of the model, and that changing the data — filtering, deduplicating, selecting examples — can change it. Sorscher et al. (2022) showed in vision experiments that careful pruning of easy examples can, in principle, give better-than-power-law scaling with data size.

## Downstream performance {#sec-downstream}

Loss is what scales smoothly; it is not what users care about. Accuracy on a benchmark, the pass rate on programming problems, or whether a model can do multi-digit arithmetic are the quantities of interest, and their relation to scale is less regular.

::: definition Emergent ability {#def-emergent}
Wei et al. (2022) called an ability **emergent** if it is absent (near-chance performance) in smaller models and present in larger ones, so that it cannot be predicted by extrapolating the performance of smaller models. On plots of accuracy against log-compute such abilities appear as a flat line followed by a sharp rise.
:::

How much of this sharpness is a property of the models, and how much of the metric? Schaeffer, Miranda and Koyejo (2023) argued that many reported emergences come from **discontinuous or non-linear metrics**. Suppose the model's probability of getting each token of an answer right improves smoothly with scale, but the benchmark scores an answer as correct only if all $k$ tokens are right. Then the score is roughly $p^k$, which stays near zero until $p$ is close to $1$ and then rises steeply — a smooth input made to look abrupt.

::: proposition Exact match sharpens smooth progress {#prop-exact-match}
If each of the $k$ tokens of an answer is correct independently with probability $p$, the exact-match accuracy is $p^k$, and its sensitivity to $p$ on a logarithmic scale is

$$
\frac{\dd\log p^k}{\dd\log p} = k.
$$

A relative improvement of $1\%$ in the per-token probability gives a relative improvement of about $k\%$ in exact-match accuracy.
:::

::: proof
$\log p^k = k\log p$, whose derivative with respect to $\log p$ is $k$. The independence assumption is an idealisation; the qualitative conclusion — longer exact-match targets amplify per-token gains — holds whenever errors are not perfectly correlated.
:::

::: widget plot
f: 1 - 0.6*10^(-0.15*(x - 18)); (1 - 0.6*10^(-0.15*(x - 18)))^k
x: 18, 27
y: 0, 1
sliders: k=10:1:30:1
labels: per-token accuracy $p$; exact match $p^k$
caption: An idealised illustration (not fitted to any model) of [[#prop-exact-match]]. The horizontal axis is $\log_{10}$ of training compute; the per-token accuracy $p$ rises smoothly, but exact match on a $k$-token answer stays near zero for several decades of compute and then rises steeply. Increase $k$ and the apparent "emergence" moves later and becomes sharper, although nothing about the underlying model has changed.
:::

The metric explanation does not settle the matter. Some abilities do seem to change qualitatively, and a smooth curve in a continuous metric is not much help if what you want to predict is whether a threshold of usefulness will be crossed. But it gives two practical rules. First, to forecast an ability, measure a continuous proxy for it — the log-probability of the correct answer, or the per-token accuracy — on small models, and extrapolate that. Several groups have found that benchmark accuracy is a predictable, often sigmoidal, function of the pretraining loss (Gadre et al., 2024; the Llama 3 report, 2024, which predicted its flagship model's accuracy on a reasoning benchmark from smaller models' loss on the correct answers). Second, do not assume that more scale always helps: the Inverse Scaling Prize (McKenzie et al., 2023) collected tasks on which larger models do *worse*, for example by more readily repeating a misleading pattern in the prompt, although several of these reversed again at still larger scales.

::: quiz
A team fits $\log L$ against $\log N$ for models from $10^7$ to $10^9$ parameters and finds slope $-0.10$. Which statements are justified?
- [ ] The true exponent of the reducible loss is $0.10$.
- [x] If the loss has an irreducible part, the exponent of the reducible loss is larger than $0.10$.
- [ ] The fit guarantees the loss of a $10^{11}$-parameter model to within the fitting error.
- [x] Accuracy on a benchmark scored by exact match may not improve smoothly over the same range.
::: solution
By [[#prop-local-exponent]], a log–log slope of $-0.10$ on the total loss means $\alpha(L - E)/L = 0.10$, so $\alpha\ge0.10$, with equality only if $E = 0$. Extrapolating two decades beyond the data is not guaranteed by anything in the fit. Exact-match metrics can turn smooth per-token gains into abrupt changes ([[#prop-exact-match]]).
:::
:::

## Scaling laws in practice {#sec-practice}

Scaling laws are used in three ways.

**Forecasting** the loss of a large run from small ones, so that problems with a recipe are caught before the expensive run begins. The GPT-4 technical report (OpenAI, 2023) stated that the final loss had been predicted from runs using up to $10{,}000$ times less compute, and the Llama 3 report (2024) used a two-stage forecast: compute to loss on benchmark answers, then that loss to accuracy.

**Comparing recipes.** A change to architecture, data or optimiser that helps at one size may not help at another. Plotting the loss of both recipes against compute over a range of sizes, and comparing the fitted curves, distinguishes a constant improvement (curves shifted down by the same factor), an improvement that grows with scale (a steeper curve), and one that vanishes at scale (curves converging). A useful summary is the **compute multiplier**: the factor by which the baseline would need more compute to match the new recipe's loss. Data quality work in particular is usually evaluated this way ([[pretraining/data-mixtures]]).

**Allocating resources** between parameters and data, and choosing hyperparameters such as the batch size and learning rate as functions of scale. The allocation question is the subject of the next chapter; the hyperparameter question connects to parametrisations that let optimal learning rates transfer from small to large widths ([[pretraining/training-stability]]).

In all three uses the same discipline applies. Each point must be a well-tuned run: an under-tuned small model makes the curve look steeper than it is. The learning-rate schedule must fit the run length — a cosine schedule set for a longer run and stopped early gives a worse loss than one tuned to the actual length, a fact Hoffmann et al. (2022) identified as a cause of earlier mis-estimates. The quantity on the horizontal axis must be counted consistently (with or without embeddings, with or without the attention term in compute). And the fitted range should extend as close to the target as the budget allows, because the error of an extrapolation grows with its distance.

::: example How much more compute? {#ex-compute-factor}
On the Kaplan compute frontier $L\propto C^{-0.050}$, what factor of compute is needed to reduce the loss by $10\%$? With a law $L = E + A C^{-0.15}$ and the current loss at $L = 2E$, what factor halves the reducible loss?
::: solution
For the pure law, $(C_2/C_1)^{-0.05} = 0.9$ gives $C_2/C_1 = 0.9^{-20} = 8.2$. For the second, halving $L - E$ requires $(C_2/C_1)^{-0.15} = 1/2$, so $C_2/C_1 = 2^{1/0.15} = 2^{6.67} = 102$; the total loss then falls from $2E$ to $1.5E$, a $25\%$ reduction. Improvements in loss are expensive, and become more so as the irreducible floor is approached.
:::
:::

::: application Planning with scaling laws
Suppose a group has compute for one run of $10^{24}$ FLOPs and wants to choose between two tokenisers. Training both at full scale is unaffordable. Instead it trains five model sizes with each tokeniser, from $10^{19}$ to $10^{21}$ FLOPs, fits a compute frontier for each — remembering that loss per token is not comparable between tokenisers, so it measures **bits per byte** of text instead — and extrapolates both to $10^{24}$. If the curves cross within the extrapolated range, the decision is uncertain and more points at larger scale are needed; if one curve is below the other over the whole range with the same slope, the decision is easy. The cost of the study is about $1\%$ of the final run, and it is spent before the large run, when it can still change the plan.
:::

::: history
Power-law learning curves have a long history in statistics and psychology; for neural networks, Cortes et al. (1994) used them to predict how well a classifier would do with more data. Hestness et al. (2017, Baidu) measured power laws in data size across translation, language modelling, image classification and speech recognition, and noted that architecture changes shift curves more than they change exponents. Kaplan et al. (2020, OpenAI) established power laws in parameters, data and compute for Transformer language models over many orders of magnitude, and Henighan et al. (2020) extended them to images, video and mathematics with an explicit irreducible term. Hoffmann et al. (2022, DeepMind) revised the compute-optimal allocation with the Chinchilla study. Wei et al. (2022) catalogued emergent abilities and Schaeffer et al. (2023) questioned how many were artefacts of metrics; Hernandez et al. (2021) studied scaling of transfer from pretraining to fine-tuning, and Caballero et al. (2022) proposed "broken" power laws with smooth transitions between regimes. Theoretical accounts came from Sharma and Kaplan (2020), Bahri et al. (2021), Hutter (2021) and Michaud et al. (2023).
:::

::: summary
- A **power law** $L = (x_c/x)^\alpha$ is a straight line of slope $-\alpha$ on log–log axes; each doubling of $x$ improves $L$ by the same factor $2^{-\alpha}$.
- Real losses approach an **irreducible** floor: $L = E + Ax^{-\alpha}$. The apparent log–log slope is $\alpha(L - E)/L$, smaller than $\alpha$ and shrinking with scale.
- Fit by **least squares in log space** (maximum likelihood for multiplicative noise); with an irreducible term, profile over $E$ or minimise a robust loss on $\log L$, as Hoffmann et al. did.
- **Kaplan et al. (2020)** found $\alpha_N\approx0.076$, $\alpha_D\approx0.095$, $\alpha_C\approx0.050$ on WebText2 for non-embedding parameters, with no irreducible term and with learning-rate schedules not matched to run length; the exponents depend on data and on what is counted.
- **Extrapolation** is the purpose of a scaling law and its main risk: check the fitted range, the residuals and alternative forms.
- **Downstream** metrics need not scale smoothly: exact-match scoring amplifies per-token gains ($p^k$), producing apparent emergence; forecast continuous proxies and map them to accuracy.
:::

## Exercises

::: exercise Evaluating the Kaplan law {level=1 check="1.994"}
Use $L(N) = (8.8\times10^{13}/N)^{0.076}$ to predict the loss, in nats per token, of a model with $10^{10}$ non-embedding parameters. Give three decimal places.
::: solution
$8.8\times10^{13}/10^{10} = 8800$, $\ln 8800 = 9.0825$, so $L = e^{0.076\cdot9.0825} = e^{0.6903} = 1.994$ nats per token.
:::
:::

::: exercise Gain from doubling {level=1 check="5.13"}
For $L\propto N^{-0.076}$, by what percentage does the loss fall when $N$ doubles? Give two decimal places.
::: solution
$1 - 2^{-0.076} = 1 - e^{-0.076\cdot0.6931} = 1 - e^{-0.05268} = 1 - 0.94869 = 0.0513$, a fall of $5.13\%$.
:::
:::

::: exercise Petaflop/s-days {level=1 check="3634"}
GPT-3 (175 billion parameters, 300 billion tokens) is often quoted as having used $3.14\times10^{23}$ FLOPs. How many PF-days is that, to the nearest whole number? Check the FLOP figure against $6ND$.
::: solution
$3.14\times10^{23}/8.64\times10^{19} = 3634$ PF-days. And $6\cdot1.75\times10^{11}\cdot3\times10^{11} = 3.15\times10^{23}$, consistent.
:::
:::

::: exercise An exponent from two points {level=2 check="0.0792"}
Two models with $N_1 = 10^8$ and $N_2 = 10^9$ reach losses $3.00$ and $2.50$. Assuming a pure power law, find $\alpha$ to three significant figures. If the irreducible loss were $E = 1.5$, what would the exponent of the reducible loss be?
::: solution
$\alpha = \log(3.00/2.50)/\log10 = \log_{10}1.2 = 0.0792$.

With $E = 1.5$: the reducible losses are $1.5$ and $1.0$, so $\alpha = \log_{10}1.5 = 0.176$, more than twice as large.
:::
:::

::: exercise The apparent exponent {level=2 check="0.168"}
For $L = 1.7 + 400N^{-0.34}$, compute the local log–log slope magnitude at $N = 10^7$ to three decimal places, and explain what a pure power-law fit near this size would report.
::: solution
$L(10^7) = 1.7 + 400\cdot10^{-2.38} = 1.7 + 1.667 = 3.367$. By [[#prop-local-exponent]], the slope magnitude is $0.34\cdot1.667/3.367 = 0.168$. A pure power-law fit over sizes around $10^7$ would report an exponent of about $0.17$ — as the program in [[#sec-fitting]] did — half the exponent of the reducible loss.
:::
:::

::: exercise Floor from three runs {level=2 check="2"}
Models with $N = 10^8, 10^9, 10^{10}$ reach losses $3.0$, $2.5$ and $2.25$. Assuming $L = E + AN^{-\alpha}$, find $E$ and $\alpha$.
::: solution
By the formula of [[#ex-three-points]], $E = (3.0\cdot2.25 - 2.5^2)/(3.0 + 2.25 - 5.0) = (6.75 - 6.25)/0.25 = 2.0$. The reducible losses are $1.0, 0.5, 0.25$, halving per decade, so $10^{-\alpha} = 1/2$ and $\alpha = \log_{10}2 = 0.301$.
:::
:::

::: exercise Exact match {level=2 check="0.349"}
A model answers a $10$-token question correctly token by token with probability $p = 0.9$ per token, independently. What is its exact-match accuracy, to three decimal places? What per-token accuracy would be needed for an exact-match accuracy of $0.9$?
::: solution
$0.9^{10} = 0.349$. For $p^{10} = 0.9$, $p = 0.9^{1/10} = 0.9895$. Raising per-token accuracy from $0.9$ to $0.99$ — a modest change in the loss — raises exact match from $35\%$ to $90\%$.
:::
:::

::: exercise Relative errors {level=2}
Show that for small relative deviations, minimising $\sum_i(\log L_i - \log\hat L_i)^2$ is approximately the same as minimising $\sum_i\big((L_i - \hat L_i)/L_i\big)^2$, and explain why fitting $\sum_i(L_i - \hat L_i)^2$ would give the smallest models too much weight.
::: solution
Write $\hat L_i = L_i(1 + r_i)$. Then $\log L_i - \log\hat L_i = -\log(1 + r_i) = -r_i + O(r_i^2)$, and $(L_i - \hat L_i)/L_i = -r_i$; so the two objectives agree to second order in the relative errors. An absolute-error objective weights point $i$ by $L_i^2$ relative to the log objective: a small model at loss $5$ counts $(5/2)^2 = 6.25$ times as much as a large one at loss $2$ for the same relative error, so the fit bends to match the small models — the ones least relevant to extrapolation.
:::
:::

::: exercise Implementing a robust fit {level=3}
Modify the program of [[#sec-fitting]] to fit $L = E + AN^{-\alpha}$ by minimising the Huber loss $h_\delta(r) = \tfrac12r^2$ for $\lvert r\rvert\le\delta$ and $\delta(\lvert r\rvert - \tfrac12\delta)$ otherwise, with $r_i = \log L_i - \log\hat L_i$ and $\delta = 10^{-3}$, using the same profile over $E$ and, for each $E$, a small grid over $\alpha$ with $A$ chosen in closed form. Corrupt one observation by $+10\%$ and compare the least-squares and Huber estimates of $\alpha$.
::: solution
For fixed $E$ and $\alpha$, $\log(\hat L_i - E) = \log A - \alpha\log N_i$; a good approximation to the best $A$ is the least-squares value $\log A = \overline{\log(L_i - E) + \alpha\log N_i}$, after which the Huber objective is evaluated on $r_i = \log L_i - \log(E + AN_i^{-\alpha})$. A sketch:

```python
def huber(r, d=1e-3):
    return 0.5 * r * r if abs(r) <= d else d * (abs(r) - 0.5 * d)

def fit_huber(pts):
    best = None
    Lmin = min(L for _, L in pts)
    for i in range(1, 400):
        E = Lmin * i / 400
        for j in range(1, 100):
            al = 0.6 * j / 100
            logA = sum(math.log(L - E) + al * math.log(N) for N, L in pts) / len(pts)
            obj = sum(huber(math.log(L) - math.log(E + math.exp(logA) * N ** -al))
                      for N, L in pts)
            if best is None or obj < best[0]:
                best = (obj, E, math.exp(logA), al)
    return best[1:]
```

Multiplying one point (say the fifth) by $1.1$ moves the least-squares estimate noticeably, because a squared residual of $\log1.1 = 0.095$ dominates residuals of order $0.01$; the Huber fit grows only linearly in that residual and stays close to the uncorrupted estimate. With $\delta = 10^{-3}$, almost every residual is in the linear regime, so the Huber fit behaves much like least absolute deviations — robust to outliers, as Hoffmann et al. intended for occasional anomalous runs.
:::
:::

::: exercise Zipf and power laws {level=3}
Suppose a corpus contains facts whose frequencies are $f_k = k^{-(1+a)}/Z$ for $k = 1, 2, \dots$, with $a > 0$, and a model with capacity $n$ learns exactly the $n$ most frequent facts and incurs a loss proportional to the total frequency of the facts it has not learned. Show that the loss is asymptotically proportional to $n^{-a}$. If the capacity needed per fact is constant, what exponent $\alpha_N$ does this predict? What changes if facts are learned only after being seen a fixed number of times, and data rather than capacity is the limit?
::: solution
The unlearned mass is $\sum_{k>n}k^{-(1+a)}/Z$. Comparing with the integral, $\int_n^\infty t^{-(1+a)}\,dt = n^{-a}/a$, and the sum lies between $\int_{n+1}^\infty$ and $\int_n^\infty$, so it is $n^{-a}/(aZ)\,(1 + O(1/n))$: proportional to $n^{-a}$. With $n\propto N$, $\alpha_N = a$. If facts must be seen $m$ times and the $k$-th fact appears $Df_k$ times in $D$ tokens, the facts learned are those with $Df_k\ge m$, i.e. $k\le(D/(mZ))^{1/(1+a)}$; the unlearned mass is then proportional to $\big(D^{1/(1+a)}\big)^{-a} = D^{-a/(1+a)}$, giving $\alpha_D = a/(1+a)$, a smaller exponent than for capacity. This is the shape of the argument of Hutter (2021) and Michaud et al. (2023); real exponents are measured, and the model is only an illustration of how heavy-tailed data produce power laws.
:::
:::
