Suppose you have been given a fixed budget of compute — say $10^{24}$ floating-point operations, a few weeks on a few thousand accelerators. You can spend it on a large model trained on relatively few tokens, or a smaller model trained on many. Since training costs about $6ND$ FLOPs for $N$ parameters and $D$ tokens ([[scaling/flops-memory]]), every choice of $N$ fixes $D = C/(6N)$, and the question is which point on that curve gives the lowest loss. For two years after Kaplan et al. (2020) the answer was "mostly make the model bigger", and models such as GPT-3 ($175$ billion parameters, $300$ billion tokens) and Gopher ($280$ billion, $300$ billion tokens) were built accordingly. In 2022 Hoffmann and colleagues at DeepMind showed that those models were substantially **undertrained**: at the same compute, a model a quarter the size trained on four times the data would have been better. Their $70$-billion-parameter model **Chinchilla**, trained on $1.4$ trillion tokens, outperformed Gopher on almost every evaluation they ran.

This chapter derives the compute-optimal allocation from a parametric scaling law by Lagrange multipliers, explains the three methods Hoffmann et al. used and why they disagreed with Kaplan et al., and then relaxes the assumptions in two directions that matter in practice: when the model will be used for a great deal of inference, the optimal model is smaller and trained for longer; and when there is not enough data, repeating it helps, but with diminishing returns. The power laws and fitting methods used here come from [[scaling/scaling-laws]].

## The allocation problem {#sec-problem}

::: definition Compute-optimal allocation {#def-compute-optimal}
Let $L(N, D)$ be the loss of a model with $N$ parameters trained on $D$ tokens with a well-tuned recipe, and let training cost $C(N, D) = 6ND$ FLOPs. For a budget $C$, the **compute-optimal** model size and data size are

$$
\big(N^\ast(C), D^\ast(C)\big) = \operatorname*{arg\,min}_{N, D\,:\,6ND = C} L(N, D).
$$

The curve $C\mapsto L\big(N^\ast(C), D^\ast(C)\big)$ is the **compute-efficient frontier**.
:::

The definition hides an assumption that is worth stating, because it was the source of the main disagreement in the literature: $L(N, D)$ must be the loss of a run *designed* for $D$ tokens. A model trained for $4D$ tokens and evaluated after $D$ is not the same as a model trained for $D$; if the learning rate is still high at step $D$ because the schedule was set for a longer run, its loss is worse. Kaplan et al. used one schedule length for all their runs and read off intermediate losses; Hoffmann et al. trained a separate run, with a cosine schedule matched to its length, for each $D$.

## Three approaches {#sec-approaches}

Hoffmann et al. (2022) trained over $400$ models, from $70$ million to over $16$ billion parameters, on $5$ to $500$ billion tokens of the MassiveText corpus, and estimated $N^\ast(C)$ in three different ways.

::: algorithm Approach 1: envelope of training curves {#alg-envelope}
1. For each of a range of model sizes, train several runs with cosine schedules of different lengths (spanning a factor of $16$ in tokens).
2. Plot every run's training loss against the compute spent so far, $6N\cdot(\text{tokens seen})$, on one graph.
3. For each compute value $C$, take the run and the point with the lowest loss — the lower **envelope** of all curves — and record its $N$ and $D$.
4. Fit power laws $N^\ast\propto C^{a}$, $D^\ast\propto C^{b}$ to the recorded points.
:::

::: algorithm Approach 2: IsoFLOP profiles {#alg-isoflop}
1. Choose a set of compute budgets ($9$ budgets from $6\times10^{18}$ to $3\times10^{21}$ FLOPs in the paper).
2. For each budget $C$, train models of several sizes $N$, each for $D = C/(6N)$ tokens with a matched schedule.
3. Plot final loss against $\log N$ for each budget — an **IsoFLOP profile** — and fit a parabola; its minimum estimates $N^\ast(C)$.
4. Fit power laws to the minima across budgets.
:::

::: algorithm Approach 3: parametric fit {#alg-parametric}
1. Collect final losses $L_i$ of all runs in Approaches 1 and 2, with their $(N_i, D_i)$.
2. Fit $\hat L(N, D) = E + A/N^\alpha + B/D^\beta$ by minimising $\sum_i h_\delta\big(\log\hat L(N_i, D_i) - \log L_i\big)$, with Huber loss $h_\delta$, $\delta = 10^{-3}$, by L-BFGS from a grid of initialisations.
3. Minimise the fitted $\hat L$ subject to $6ND = C$ analytically ([[#thm-chinchilla]]).
:::

The three approaches gave exponents $a = 0.50, 0.49$ and $0.46$ for $N^\ast\propto C^a$, and $b = 0.50, 0.51$ and $0.54$ for $D^\ast\propto C^b$. All three say that **parameters and data should grow in roughly equal proportion** with compute — each doubling of compute should be split as a factor of about $\sqrt2$ in each — in contrast to Kaplan et al.'s $N^\ast\propto C^{0.73}$. Approach 1's table of compute-optimal configurations gives close to **$20$ tokens per parameter** at every scale: $400$ million parameters on $8.0$ billion tokens, $10$ billion on $205$ billion, $67$ billion on $1.5$ trillion. That ratio is the "Chinchilla rule" now widely quoted.

The IsoFLOP figure below shows what Approach 2 looks for, using the parametric fits discussed later in this chapter.

::: widget plot
f: 1.69 + 406.4*10^(-0.34*x) + 410.7*(10^c/(6*10^x))^(-0.28); 1.82 + 482.01*10^(-0.3478*x) + 2085.43*(10^c/(6*10^x))^(-0.3658)
x: 8, 12.5
y: 1.8, 3
sliders: c=23:20:26:0.25
labels: fit of Hoffmann et al. (2022); refit of Besiroglu et al. (2024)
caption: IsoFLOP profiles: predicted loss against $\log_{10}N$ at a fixed compute budget of $10^c$ FLOPs (each $N$ trained for $D = 10^c/(6N)$ tokens). Too small a model is starved of capacity, too large a model of data, so each profile has a minimum. Moving the slider up by one decade moves the minimum right by about half a decade. The two curves come from two fits to the same data; at $c\approx23.8$ (Chinchilla's budget) their minima differ by a factor of about two in $N$ — the subject of [[#sec-refit]].
:::

## Deriving the optimum {#sec-derivation}

The parametric form makes the allocation an exercise in constrained optimisation, and its solution shows exactly where the twenty-tokens rule comes from.

::: theorem Compute-optimal allocation for a separable power law {#thm-chinchilla}
Let $L(N, D) = E + AN^{-\alpha} + BD^{-\beta}$ with $A, B, \alpha, \beta > 0$, and let $C = 6ND$. Then the unique minimiser of $L$ subject to $6ND = C$ is

$$
N^\ast(C) = G\left(\frac{C}{6}\right)^{a},\qquad D^\ast(C) = G^{-1}\left(\frac{C}{6}\right)^{b},\qquad
a = \frac{\beta}{\alpha + \beta},\quad b = \frac{\alpha}{\alpha + \beta},\quad G = \left(\frac{\alpha A}{\beta B}\right)^{1/(\alpha+\beta)}.
$$ {#eq-chinchilla-opt}

At the optimum the two reducible terms satisfy

$$
\frac{AN^{\ast-\alpha}}{BD^{\ast-\beta}} = \frac{\beta}{\alpha},
$$ {#eq-balance}

and the ratio of tokens to parameters is

$$
\frac{D^\ast}{N^\ast} = G^{-2}\left(\frac{C}{6}\right)^{(\alpha - \beta)/(\alpha + \beta)}.
$$ {#eq-ratio}
:::

::: proof
Form the Lagrangian $\mathcal{J}(N, D, \lambda) = E + AN^{-\alpha} + BD^{-\beta} + \lambda(6ND - C)$. Its stationary points satisfy

$$
\frac{\partial\mathcal{J}}{\partial N} = -\alpha AN^{-\alpha-1} + 6\lambda D = 0,\qquad
\frac{\partial\mathcal{J}}{\partial D} = -\beta BD^{-\beta-1} + 6\lambda N = 0.
$$

Multiplying the first equation by $N$ and the second by $D$ gives $\alpha AN^{-\alpha} = 6\lambda ND = \beta BD^{-\beta}$, which is [[#eq-balance]]. Substitute $D = C/(6N)$: $\alpha AN^{-\alpha} = \beta B(C/6)^{-\beta}N^{\beta}$, so

$$
N^{\alpha+\beta} = \frac{\alpha A}{\beta B}\left(\frac{C}{6}\right)^{\beta},\qquad N^\ast = \left(\frac{\alpha A}{\beta B}\right)^{1/(\alpha+\beta)}\left(\frac{C}{6}\right)^{\beta/(\alpha+\beta)},
$$

and $D^\ast = (C/6)/N^\ast = G^{-1}(C/6)^{1 - a}$ with $1 - a = \alpha/(\alpha + \beta) = b$. Dividing $D^\ast$ by $N^\ast$ gives [[#eq-ratio]], since $b - a = (\alpha - \beta)/(\alpha + \beta)$.

It remains to show that this stationary point is the global minimum. On the constraint, write $u = \log N$; then $D = (C/6)e^{-u}$ and $L = E + Ae^{-\alpha u} + B(C/6)^{-\beta}e^{\beta u}$, a sum of two strictly convex functions of $u$ (each an exponential with positive coefficient). It is therefore strictly convex in $u$, tends to $+\infty$ as $u\to\pm\infty$, and has exactly one stationary point, which is its global minimum.
:::

Three consequences follow. First, the exponents depend only on the *ratio* of $\alpha$ and $\beta$: a model of $N^\ast\propto C^{0.5}$ — Hoffmann's Approaches 1 and 2 — corresponds to $\alpha = \beta$, parameters and data being equally "hard to substitute". Second, by [[#eq-ratio]], **the tokens-per-parameter ratio is constant across compute budgets exactly when $\alpha = \beta$**, and then it equals $G^{-2} = (B/A)^{1/\alpha}$; if $\alpha > \beta$ the ratio grows with compute, if $\alpha < \beta$ it shrinks. A fixed rule of "about $20$ tokens per parameter" is therefore an empirical statement that $\alpha\approx\beta$ over the range studied, together with a particular ratio of $A$ to $B$. Third, by [[#eq-balance]], at the optimum the parameter-limited and data-limited parts of the reducible loss are in the fixed ratio $\beta/\alpha$: neither resource is allowed to become the bottleneck.

::: example The Chinchilla budget {#ex-chinchilla}
Hoffmann et al. estimated Gopher's training compute as $C = 5.76\times10^{23}$ FLOPs. With their published parametric fit $E = 1.69$, $A = 406.4$, $B = 410.7$, $\alpha = 0.34$, $\beta = 0.28$, compute $N^\ast$, $D^\ast$ and the predicted losses of Gopher ($N = 280$ billion) and Chinchilla ($N = 70$ billion) at that budget.
::: solution
$a = 0.28/0.62 = 0.452$ and $b = 0.548$. $G = (0.34\cdot406.4/(0.28\cdot410.7))^{1/0.62} = (138.18/115.00)^{1.613} = 1.2016^{1.613} = 1.345$. With $C/6 = 9.6\times10^{22}$: $N^\ast = 1.345\cdot(9.6\times10^{22})^{0.452} = 3.2\times10^{10}$ and $D^\ast = 3.0\times10^{12}$, about $93$ tokens per parameter.

Gopher: $D = 5.76\times10^{23}/(6\cdot2.8\times10^{11}) = 3.4\times10^{11}$ tokens, $L = 1.69 + 406.4/(2.8\times10^{11})^{0.34} + 410.7/(3.4\times10^{11})^{0.28} = 1.984$. Chinchilla: $D = 1.37\times10^{12}$ tokens, $L = 1.938$. The fit prefers the smaller model by $0.046$ nats per token — and would prefer a still smaller one, at $32$ billion parameters, giving $1.931$. Note how flat the profile is near its minimum: halving $N$ from Chinchilla's $70$ billion changes the loss by less than $0.01$.
:::
:::

The example exposes a tension. The published parametric fit puts the optimum at about $93$ tokens per parameter for Chinchilla's budget, and its exponents ($\alpha > \beta$) make the ratio grow with compute — whereas Approaches 1 and 2, and the Chinchilla model itself, sit near $20$. Hoffmann et al. noted that Approach 3 predicted somewhat smaller optimal models than the other two. The program below makes the comparison, together with a second fit discussed next.

```python
import math

FITS = {"Hoffmann 2022": (1.69, 406.4, 410.7, 0.34, 0.28),
        "Besiroglu 2024": (1.82, 482.01, 2085.43, 0.3478, 0.3658)}

def loss(f, N, D):
    E, A, B, al, be = f
    return E + A / N ** al + B / D ** be

def chinchilla(f, C):
    """Lagrange solution of min L(N, D) subject to 6 N D = C."""
    E, A, B, al, be = f
    G = (al * A / (be * B)) ** (1 / (al + be))
    N = G * (C / 6) ** (be / (al + be))
    return N, C / (6 * N)

def grid_check(f, C):
    """Brute-force scan of N on a log grid as a check on the closed form."""
    Ns = [10 ** (7 + 7 * i / 7000) for i in range(7001)]
    return min(Ns, key=lambda N: loss(f, N, C / (6 * N)))

for name, f in FITS.items():
    print(name)
    for C in (1e21, 5.76e23, 1e25):
        N, D = chinchilla(f, C)
        print(f"  C={C:.2e}  N*={N:.3e} (grid {grid_check(f, C):.3e})"
              f"  D*={D:.3e}  D*/N*={D / N:5.1f}  L={loss(f, N, D):.4f}")

# Inference-aware optimum (Sardana & Frankle 2024): reach the loss that the
# Chinchilla-optimal model of 1e23 FLOPs reaches, minimising 6*N*D + 2*N*D_inf.
f = FITS["Besiroglu 2024"]; E, A, B, al, be = f
N0, D0 = chinchilla(f, 1e23); target = loss(f, N0, D0)
print(f"target loss {target:.4f} (Chinchilla-optimal at 1e23: N={N0:.2e}, D={D0:.2e})")
print(" D_inf     N         D_train    D/N    train FLOPs  infer FLOPs  total vs Chinchilla")
for D_inf in (0, 1e12, 1e13, 1e14):
    best = None
    for i in range(1, 4001):
        N = N0 * 10 ** (-2 + 2 * i / 4000)             # search N0/100 ... N0
        gap = target - E - A / N ** al                  # what the data term must reach
        if gap <= 0:
            continue
        D = (B / gap) ** (1 / be)
        cost = 6 * N * D + 2 * N * D_inf
        if best is None or cost < best[0]:
            best = (cost, N, D)
    cost, N, D = best
    base = 6 * N0 * D0 + 2 * N0 * D_inf
    print(f"{D_inf:8.0e}  {N:.3e}  {D:.3e}  {D / N:6.0f}  {6 * N * D:.3e}    "
          f"{2 * N * D_inf:.3e}    {cost / base:.3f}")
```

```text
Hoffmann 2022
  C=1.00e+21  N*=1.824e+09 (grid 1.824e+09)  D*=9.136e+10  D*/N*= 50.1  L=2.3289
  C=5.76e+23  N*=3.219e+10 (grid 3.221e+10)  D*=2.982e+12  D*/N*= 92.6  L=1.9307
  C=1.00e+25  N*=1.168e+11 (grid 1.169e+11)  D*=1.427e+13  D*/N*=122.1  L=1.8453
Besiroglu 2024
  C=1.00e+21  N*=2.778e+09 (grid 2.780e+09)  D*=5.999e+10  D*/N*= 21.6  L=2.3083
  C=5.76e+23  N*=7.225e+10 (grid 7.228e+10)  D*=1.329e+12  D*/N*= 18.4  L=1.9772
  C=1.00e+25  N*=3.121e+11 (grid 3.119e+11)  D*=5.341e+12  D*/N*= 17.1  L=1.9145
target loss 2.0349 (Chinchilla-optimal at 1e23: N=2.94e+10, D=5.66e+11)
 D_inf     N         D_train    D/N    train FLOPs  infer FLOPs  total vs Chinchilla
   0e+00  2.945e+10  5.660e+11      19  1.000e+23    0.000e+00    1.000
   1e+12  1.966e+10  9.078e+11      46  1.071e+23    3.931e+22    0.921
   1e+13  1.136e+10  2.427e+12     214  1.655e+23    2.273e+23    0.570
   1e+14  7.465e+09  9.483e+12    1270  4.248e+23    1.493e+24    0.320
```

The closed form of [[#thm-chinchilla]] agrees with the brute-force scan to the grid's resolution. The second half of the output is explained in [[#sec-inference]].

## Refitting Chinchilla {#sec-refit}

Besiroglu, Erdil, Barnett and You (2024) reconstructed the data behind Approach 3 by extracting the points from a figure in the Chinchilla paper and refitted the same functional form with the same Huber objective. They reported that the published parameters fitted the reconstructed data poorly, that the reported confidence intervals were implausibly narrow for the number of runs, and that their refit, $E = 1.82$, $A = 482.01$, $B = 2085.43$, $\alpha = 0.3478$, $\beta = 0.3658$, fitted the data better. With the refit, $\alpha\approx\beta$, the exponents become $a = 0.513$ and $b = 0.487$, and the optimum moves to about $20$ tokens per parameter, drifting slowly downwards with compute ($21.6$ at $10^{21}$, $18.4$ at Chinchilla's budget, $17.1$ at $10^{25}$, from the output above). All three approaches then agree.

Two lessons follow beyond the specific numbers. Fitted scaling-law parameters can be fragile: with five parameters, a few hundred noisy runs and a robust loss with a tiny $\delta$, optimisers can stop at different points of a long, flat valley in which $A$, $B$, $\alpha$ and $\beta$ trade off against each other while the fit to the data barely changes. Derived quantities that depend on the ratio $\alpha/\beta$ or on $(B/A)^{1/\alpha}$, such as the tokens-per-parameter ratio, inherit that fragility. And the **twenty tokens per parameter** figure is best understood as an empirical result of Approaches 1 and 2 on MassiveText with the Chinchilla recipe, consistent with a refitted parametric law — not as a constant that transfers to other data, tokenisers or architectures. Later studies have found compute-optimal ratios in the range of roughly $10$ to $100$ depending on such details; the Llama 3 report (2024), for example, fitted its own IsoFLOP profiles and found an optimum of about $402$ billion parameters on $16.55$ trillion tokens for a budget of $3.8\times10^{25}$ FLOPs, about $41$ tokens per parameter.

::: warning "Chinchilla-optimal" is not "best model"
Compute-optimal means lowest *training* loss for a given *training* budget, nothing more. It ignores the cost of serving the model, which grows with $N$; it assumes unlimited fresh data; and it says nothing about downstream quality per unit of inference cost. Most widely used open-weight models since 2023 are trained far beyond $20$ tokens per parameter on purpose. Calling such a model "over-trained" is a statement about where it lies relative to the training-compute optimum, not a criticism.
:::

## Why Kaplan and Chinchilla differed {#sec-why-differ}

Kaplan et al. (2020) found $N^\ast\propto C^{0.73}$; Hoffmann et al. (2022) found $N^\ast\propto C^{0.5}$. At a budget of $10^{24}$ FLOPs the two prescriptions differ by more than an order of magnitude in model size, so the discrepancy needed explaining. Hoffmann et al. pointed to the learning-rate schedule: Kaplan et al. used a single schedule length, so short runs were evaluated before their learning rate had decayed, which penalised small $D$ and made large models (which need fewer tokens to reach a given loss) look better. Two later studies quantified the causes.

**Pearce and Song (2024)** traced most of the difference to **what is counted** and **at what scale**. Kaplan et al. counted non-embedding parameters $N_{\setminus E}$ and non-embedding compute, and their models were small (at most $1.5$ billion parameters), where the embedding matrices are a large share of the total. If the true law is Chinchilla's in total parameters $N_T = N_{\setminus E} + \lvert\mathcal{V}\rvert d$, then rewriting it in terms of $N_{\setminus E}$ and fitting a power law over small models produces a local exponent much larger than $0.5$ — close to Kaplan's — because at small sizes a change in $N_{\setminus E}$ is a smaller relative change in $N_T$. As models grow, the embeddings become negligible and the local exponent falls towards Chinchilla's.

::: example How large are the embeddings? {#ex-embeddings}
With a vocabulary of $50{,}257$ tokens, compare the share of embedding parameters in a small model ($6$ layers of width $512$) and a large one ($80$ layers of width $8192$), counting $12d^2$ parameters per block and one $\lvert\mathcal{V}\rvert\times d$ embedding matrix. In the small model, if the non-embedding count doubles with the embedding matrix unchanged, by what factor does the total grow?
::: solution
Small: non-embedding $12\cdot6\cdot512^2 = 18.9$ million, embedding $50{,}257\cdot512 = 25.7$ million, total $44.6$ million; the embeddings are $58\%$. Large: non-embedding $12\cdot80\cdot8192^2 = 64.4$ billion, embedding $0.41$ billion, $0.6\%$. Doubling the small model's non-embedding count gives $(37.7 + 25.7)/44.6 = 1.42$ times the total — a $2\times$ change on one axis is a $1.42\times$ change on the other ($2^{0.51}$). A law that is a clean power in total parameters therefore has a much steeper apparent exponent in non-embedding parameters over the small sizes where Kaplan et al. worked, and the distortion disappears as models grow.
:::
:::

**Porian, Wortsman, Jitsev, Schmidt and Carmon (2024)** reproduced both laws on two datasets and identified three factors: the FLOPs of the output (unembedding) layer, which Kaplan's compute count omitted and which matter at small scale; the **warm-up** length, which was too long for small models in the Kaplan setup; and **scale-dependent optimiser tuning**: with learning rate, batch size and Adam's $\beta_2$ tuned per model size (a larger $\beta_2$ being important at small batch sizes), the Kaplan-style runs moved to the Chinchilla exponent. With those corrected, they found close agreement with Hoffmann et al.; they also reported that a carefully decayed learning rate was less essential to the result than earlier explanations suggested.

The broader lesson is the one stated in [[scaling/scaling-laws#sec-practice]]: a scaling law is only as good as the tuning of each point on it and the consistency of what is measured. Small models are cheap, so it is tempting to train many of them with one recipe, but a recipe tuned for one size is systematically wrong for others, and that error becomes a bias in the exponent.

::: widget plot
f: log10(2.89e9) + 0.5*(x - 21); log10(2.89e9) + 0.73*(x - 21)
x: 18, 26
y: 7, 13
labels: $N^\ast\propto C^{0.50}$ (Hoffmann et al.); $N^\ast\propto C^{0.73}$ (Kaplan et al.)
caption: Compute-optimal model size against compute, both axes $\log_{10}$, the two lines drawn through the same point at $10^{21}$ FLOPs ($N^\ast = 2.9\times10^9$, the $20$-tokens-per-parameter value $\sqrt{C/120}$). Because only the exponents are compared here, the absolute height is illustrative. Over five decades of compute the two prescriptions diverge by more than a decade in $N$ — GPT-3 and Gopher lie close to the upper line's prescription, Chinchilla on the lower.
:::

## Over-training for inference {#sec-inference}

A model is trained once and then used, perhaps for trillions of tokens. Each generated or processed token costs about $2N$ FLOPs in the forward pass ([[scaling/flops-memory]]). If the expected number of inference tokens over the model's life is $D_{\text{inf}}$, the total compute is $6ND + 2ND_{\text{inf}}$, and the right question is no longer "which $(N, D)$ minimises loss for a training budget" but "which $(N, D)$ reaches a target quality at the lowest total cost". Sardana and Frankle (2024) posed it in exactly this form.

::: proposition Inference-aware optimum {#prop-inference}
For $L(N, D) = E + AN^{-\alpha} + BD^{-\beta}$, minimise $6ND + 2ND_{\text{inf}}$ subject to $L(N, D) = \ell$. At the optimum,

$$
\frac{AN^{-\alpha}}{BD^{-\beta}} = \frac{\beta}{\alpha}\left(1 + \frac{D_{\text{inf}}}{3D}\right).
$$ {#eq-inference-balance}

For $D_{\text{inf}} = 0$ this is the Chinchilla balance [[#eq-balance]]; for $D_{\text{inf}} > 0$ the parameter term must be larger relative to the data term, so the optimal model is smaller and trained on more tokens than the Chinchilla-optimal model of the same loss.
:::

::: proof
With multiplier $\mu$, stationarity of $6ND + 2ND_{\text{inf}} - \mu\big(E + AN^{-\alpha} + BD^{-\beta} - \ell\big)$ gives

$$
6D + 2D_{\text{inf}} = -\mu\alpha AN^{-\alpha-1},\qquad 6N = -\mu\beta BD^{-\beta-1}.
$$

Multiply the first by $N$ and the second by $D$ and divide: $\dfrac{(6D + 2D_{\text{inf}})N}{6ND} = \dfrac{\alpha AN^{-\alpha}}{\beta BD^{-\beta}}$, which rearranges to [[#eq-inference-balance]]. Along the constraint, increasing the ratio $AN^{-\alpha}/(BD^{-\beta})$ at fixed sum means increasing $AN^{-\alpha}$ (smaller $N$) and decreasing $BD^{-\beta}$ (larger $D$).
:::

The program's second half solves the problem numerically with the refitted law, for a target equal to the loss of the Chinchilla-optimal model at $10^{23}$ FLOPs ($29$ billion parameters, $566$ billion tokens). With $10^{13}$ tokens of expected inference the best model has $11$ billion parameters trained on $2.4$ trillion tokens, $214$ per parameter; training costs $65\%$ more, but the total falls to $57\%$ of the Chinchilla-optimal model's total. With $10^{14}$ inference tokens the optimum is a $7.5$-billion-parameter model at about $1{,}300$ tokens per parameter, at a third of the total cost.

This is the economic logic behind the trend, from 2023 onwards, of training small models on very large numbers of tokens: LLaMA's $7$-billion-parameter model on $1$ trillion tokens (2023), and Llama 3's $8$-billion-parameter model on about $15$ trillion, nearly $1{,}900$ tokens per parameter (2024); the Llama 3 report noted that the $8$B and $70$B models' performance was still improving log-linearly when training stopped. Sardana and Frankle trained models far past the Chinchilla ratio to check that the parametric law continued to describe the loss there, and found it broadly did, though with a warning: at extreme ratios the fitted law becomes less reliable, so the predicted savings are extrapolations. Two further costs push in the same direction. Smaller models are cheaper to serve per token beyond the FLOP count, because decoding is limited by memory bandwidth and the bytes of weights and KV cache that must be read per token ([[scaling/accelerators]]); and they fit on fewer devices.

::: example A deployment budget {#ex-overtrain}
A team expects its model to process $D_{\text{inf}} = 3\times10^{12}$ tokens over its lifetime. It is choosing between a model of $N = 3\times10^{10}$ parameters trained on $6\times10^{11}$ tokens and one of $N = 1.5\times10^{10}$ trained on $1.6\times10^{12}$ tokens, which reach about the same loss. Compare training, inference and total FLOPs.
::: solution
Large: training $6\cdot3\times10^{10}\cdot6\times10^{11} = 1.08\times10^{23}$; inference $2\cdot3\times10^{10}\cdot3\times10^{12} = 1.8\times10^{23}$; total $2.88\times10^{23}$. Small: training $6\cdot1.5\times10^{10}\cdot1.6\times10^{12} = 1.44\times10^{23}$; inference $9\times10^{22}$; total $2.34\times10^{23}$. The smaller model costs $33\%$ more to train but $19\%$ less in total — and its lower memory footprint makes serving easier.
:::
:::

## Data-constrained scaling {#sec-data-constrained}

The Chinchilla analysis assumes every token is fresh. As compute grows, so does $D^\ast$ — roughly as $\sqrt C$ — and for the largest budgets the supply of high-quality text becomes a constraint ([[pretraining/training-data]]). The natural response is to repeat data for several **epochs**. How much is a repeated token worth?

Muennighoff, Rush, Barak, Le Scao, Piktus, Tazi, Pyysalo, Wolf and Raffel (2023) trained models of up to $9$ billion parameters for up to $1{,}500$ epochs on subsets of a corpus, and modelled repetition by an **effective data** size that replaces $D$ in a Chinchilla-style law.

::: definition Effective data under repetition {#def-effective-data}
With $U_D$ unique tokens repeated so that each is seen $1 + R_D$ times ($R_D$ repetitions beyond the first epoch), the **effective data** is

$$
D' = U_D + U_DR_D^\ast\left(1 - e^{-R_D/R_D^\ast}\right),
$$ {#eq-effective-data}

where $R_D^\ast$ is a fitted constant ($R_D^\ast\approx15.4$ in Muennighoff et al.). An analogous expression with a constant $R_N^\ast\approx5.3$ describes how the value of extra parameters decays when they exceed what the unique data can support.
:::

::: proposition Properties of effective data {#prop-effective-data}
Let $D = U_D(1 + R_D)$ be the total number of tokens processed. Then $D'\le D$, with $D'/D\to1$ as $R_D\to0$ (fresh tokens are worth one each), $\partial D'/\partial R_D = U_De^{-R_D/R_D^\ast}$ (each further epoch is worth less than the last by the factor $e^{-1/R_D^\ast}$, about $6\%$), and $D'\to U_D(1 + R_D^\ast)$ as $R_D\to\infty$: no amount of repetition is worth more than about $16$ epochs of fresh data.
:::

::: proof
Using $1 - e^{-x}\le x$ for $x\ge0$, $U_DR_D^\ast(1 - e^{-R_D/R_D^\ast})\le U_DR_D$, so $D'\le U_D + U_DR_D = D$, with ratio tending to $1$ as $R_D\to0$ because $1 - e^{-x}\sim x$. Differentiating [[#eq-effective-data]] with respect to $R_D$ gives $U_DR_D^\ast\cdot e^{-R_D/R_D^\ast}/R_D^\ast = U_De^{-R_D/R_D^\ast}$, which falls by $e^{-1/R_D^\ast}$ per unit increase of $R_D$. As $R_D\to\infty$, $e^{-R_D/R_D^\ast}\to0$ and $D'\to U_D(1 + R_D^\ast)$; with $R_D^\ast = 15.4$ this is $16.4\,U_D$.
:::

::: example Four epochs or forty? {#ex-epochs}
A corpus has $U_D = 5\times10^{11}$ unique tokens. What is the effective data after $4$ epochs and after $40$, and what fraction of the tokens processed is "worth" a fresh token in each case?
::: solution
Four epochs: $R_D = 3$, $D' = U_D(1 + 15.4(1 - e^{-3/15.4})) = U_D(1 + 15.4\cdot0.177) = 3.73\,U_D = 1.86\times10^{12}$, against $2\times10^{12}$ processed: $93\%$. Forty epochs: $R_D = 39$, $D' = U_D(1 + 15.4(1 - e^{-2.53})) = 15.2\,U_D = 7.6\times10^{12}$, against $2\times10^{13}$ processed: $38\%$. Muennighoff et al. reported that up to about four epochs the loss was nearly indistinguishable from training on fresh data, and that beyond about sixteen the value of more compute spent on repetition decayed rapidly towards zero.
:::
:::

Muennighoff et al. drew practical conclusions. When data are limited, the compute-optimal response is to train for more epochs *and* to allocate somewhat less to parameters than Chinchilla would, because extra parameters cannot be supported by data that are not there. Filling the gap with code (which they found could make up a substantial fraction of training data without hurting natural-language performance) and with filtered data were both useful. Later work has studied synthetic data and paraphrases as other ways of stretching a fixed corpus ([[pretraining/data-mixtures]]).

::: quiz
A scaling law with $\alpha = 0.30$ and $\beta = 0.36$ is fitted. Which statements follow from [[#thm-chinchilla]]?
- [x] $N^\ast$ grows faster than $\sqrt{C}$.
- [ ] The compute-optimal tokens-per-parameter ratio grows with compute.
- [x] At the optimum, the parameter-limited term $AN^{-\alpha}$ is $1.2$ times the data-limited term $BD^{-\beta}$.
- [ ] The optimal ratio is $20$ tokens per parameter.
::: solution
$a = \beta/(\alpha + \beta) = 0.36/0.66 = 0.545 > 0.5$, so $N^\ast$ grows faster than $\sqrt C$. The ratio scales as $C^{(\alpha - \beta)/(\alpha + \beta)} = C^{-0.09}$, so it *shrinks*. By [[#eq-balance]], the terms are in ratio $\beta/\alpha = 1.2$. The value of the ratio depends on $A$ and $B$, which are not given.
:::
:::

::: history
Kaplan et al. (2020) at OpenAI derived compute-efficient allocations favouring model size ($N^\ast\propto C^{0.73}$), which shaped GPT-3 (Brown et al., 2020), Jurassic-1, Gopher (Rae et al., 2021) and Megatron-Turing NLG (Smith et al., 2022). Hoffmann et al. (2022) at DeepMind — the paper *Training Compute-Optimal Large Language Models*, presented at NeurIPS 2022 — showed with three methods that parameters and tokens should scale equally, and trained Chinchilla ($70$B parameters, $1.4$T tokens) to demonstrate it. LLaMA (Touvron et al., 2023) popularised training small models well beyond the Chinchilla ratio for cheaper inference, a choice formalised by Sardana and Frankle (2024) and, for small models, argued by de Vries (2023). Muennighoff et al. (2023) received an outstanding paper award at NeurIPS 2023 for their study of repetition. Besiroglu et al. (2024) refitted Approach 3; Pearce and Song (2024) and Porian et al. (2024) reconciled the Kaplan and Chinchilla exponents.
:::

::: summary
- For a budget $C = 6ND$, the **compute-optimal** $(N^\ast, D^\ast)$ minimises loss on the constraint; each point must be a separately tuned run with a schedule matched to its length.
- Hoffmann et al. (2022) used **envelopes of training curves**, **IsoFLOP profiles** and a **parametric fit** $L = E + A/N^\alpha + B/D^\beta$; all found $N^\ast$ and $D^\ast$ growing roughly as $\sqrt C$, and Approaches 1–2 gave about **20 tokens per parameter**.
- **Lagrange multipliers** give $N^\ast = G(C/6)^{\beta/(\alpha+\beta)}$, $D^\ast = G^{-1}(C/6)^{\alpha/(\alpha+\beta)}$ and the balance $AN^{-\alpha}/(BD^{-\beta}) = \beta/\alpha$; the ratio $D^\ast/N^\ast$ is constant only if $\alpha = \beta$.
- The **published** fit ($\alpha = 0.34$, $\beta = 0.28$) implies about $93$ tokens per parameter at Chinchilla's budget; the **refit** of Besiroglu et al. (2024) gives about $20$, agreeing with Approaches 1–2.
- Kaplan's larger exponent came mainly from counting **non-embedding** parameters at small scale and from **untuned** schedules, warm-up and optimiser settings (Pearce & Song 2024; Porian et al. 2024).
- Counting **inference** ($2N$ FLOPs per token) makes smaller models trained longer optimal: $AN^{-\alpha}/(BD^{-\beta}) = (\beta/\alpha)(1 + D_{\text{inf}}/3D)$.
- **Repeated data** is worth almost as much as fresh data for about four epochs and saturates at about $16$ epochs' worth (Muennighoff et al., 2023).
:::

## Exercises

::: exercise The twenty-tokens rule {level=1 check="2.89e9"}
If a compute-optimal model uses $20$ tokens per parameter and $C = 6ND$, express $N^\ast$ in terms of $C$ and evaluate it for $C = 10^{21}$ FLOPs. Give three significant figures.
::: solution
$D = 20N$ gives $C = 120N^2$, so $N^\ast = \sqrt{C/120}$. For $C = 10^{21}$: $\sqrt{8.33\times10^{18}} = 2.89\times10^9$ parameters, trained on $5.77\times10^{10}$ tokens.
:::
:::

::: exercise Scaling up the budget {level=1 check="3.16"}
Under $N^\ast\propto C^{0.5}$, by what factor should the model grow when compute grows by a factor of $10$? Under $N^\ast\propto C^{0.73}$?
::: solution
$10^{0.5} = 3.16$ under Chinchilla's exponent; $10^{0.73} = 5.37$ under Kaplan's. In the second case data grow only by $10^{0.27} = 1.86$.
:::
:::

::: exercise Exponents from a fit {level=1 check="0.513"}
For the refitted law with $\alpha = 0.3478$ and $\beta = 0.3658$, compute the exponent $a$ in $N^\ast\propto C^a$ to three decimal places.
::: solution
$a = \beta/(\alpha + \beta) = 0.3658/0.7136 = 0.513$, and $b = 0.487$.
:::
:::

::: exercise Gopher against Chinchilla {level=2 check="0.046"}
Using the published fit $L = 1.69 + 406.4N^{-0.34} + 410.7D^{-0.28}$ and $C = 5.76\times10^{23}$, compute the predicted loss difference between a $280$-billion-parameter and a $70$-billion-parameter model at that budget, to three decimal places.
::: solution
Gopher: $D = 3.43\times10^{11}$; $406.4/(2.8\times10^{11})^{0.34} = 406.4/7{,}799 = 0.0521$ and $410.7/(3.43\times10^{11})^{0.28} = 410.7/1{,}698 = 0.2419$; $L = 1.9840$. Chinchilla: $D = 1.371\times10^{12}$; $406.4/(7\times10^{10})^{0.34} = 406.4/4{,}868 = 0.0835$ and $410.7/(1.371\times10^{12})^{0.28} = 410.7/2{,}503 = 0.1641$; $L = 1.9376$. Difference $0.046$ nats per token.
:::
:::

::: exercise Balance at the optimum {level=2 check="0.824"}
For the published fit ($\alpha = 0.34$, $\beta = 0.28$), what is the ratio of the parameter-limited term to the data-limited term at the compute-optimal point? Give three decimal places. Verify it with the numbers of [[#ex-chinchilla]] for $N^\ast = 3.22\times10^{10}$, $D^\ast = 2.98\times10^{12}$.
::: solution
By [[#eq-balance]], $\beta/\alpha = 0.28/0.34 = 0.824$. Check: $406.4/(3.22\times10^{10})^{0.34} = 406.4/3{,}738 = 0.1087$ and $410.7/(2.98\times10^{12})^{0.28} = 410.7/3{,}111 = 0.1320$; ratio $0.823$, equal up to rounding.
:::
:::

::: exercise Effective epochs {level=2 check="6.63"}
With $R_D^\ast = 15.4$, what is the effective data, in units of $U_D$, after $8$ epochs? Give two decimal places.
::: solution
$R_D = 7$: $D'/U_D = 1 + 15.4(1 - e^{-7/15.4}) = 1 + 15.4(1 - 0.6347) = 1 + 5.63 = 6.63$, so the $8$ epochs are worth $83\%$ of $8$ fresh epochs.
:::
:::

::: exercise When does inference dominate? {level=2 check="3"}
For a model of $N$ parameters trained on $D$ tokens, after how many inference tokens, in units of $D$, does the inference compute equal the training compute? For a $70$-billion-parameter model trained on $1.4$ trillion tokens, how many tokens is that?
::: solution
$2ND_{\text{inf}} = 6ND$ gives $D_{\text{inf}} = 3D$. For Chinchilla, $4.2$ trillion tokens. A popular deployed model can process that many in weeks, which is why inference costs dominate the economics of widely used models.
:::
:::

::: exercise Flatness of the optimum {level=2}
Show that, on the constraint $6ND = C$, the loss as a function of $u = \ln N$ has second derivative $\alpha(\alpha + \beta)AN^{\ast-\alpha}$ at the optimum. Use the published fit at $C = 5.76\times10^{23}$ (where $AN^{\ast-\alpha} = 0.1087$) to estimate the loss penalty of using a model a factor of $2$ away from $N^\ast$.
::: solution
On the constraint $L(u) = E + Ae^{-\alpha u} + B(C/6)^{-\beta}e^{\beta u}$, so $L''(u) = \alpha^2Ae^{-\alpha u} + \beta^2B(C/6)^{-\beta}e^{\beta u} = \alpha^2AN^{-\alpha} + \beta^2BD^{-\beta}$. At the optimum $\beta BD^{-\beta} = \alpha AN^{-\alpha}$, so $\beta^2BD^{-\beta} = \alpha\beta AN^{-\alpha}$, and $L'' = \alpha(\alpha + \beta)AN^{\ast-\alpha}$. Numerically $0.34\cdot0.62\cdot0.1087 = 0.0229$. A factor of $2$ is $\Delta u = \ln2 = 0.693$, so the penalty is about $\tfrac12\cdot0.0229\cdot0.480 = 0.0055$ nats per token — consistent with the flat profile noted in [[#ex-chinchilla]]. The optimum is shallow: being off by a factor of two in model size costs little.
:::
:::

::: exercise The inference-aware optimum in closed form {level=3}
Assume $\alpha = \beta$ and a fixed target loss $\ell$. Using [[#eq-inference-balance]], show that in the limit $D_{\text{inf}}\gg D$ the optimal model satisfies $AN^{-\alpha}\approx\ell - E$ (the parameter term takes almost all of the reducible loss), and explain why the required $D$ then grows without bound as $N$ approaches its minimum possible size. What does this imply about very small models for very large deployments?
::: solution
With $\alpha = \beta$, [[#eq-inference-balance]] says $AN^{-\alpha}/(BD^{-\alpha}) = 1 + D_{\text{inf}}/(3D)$. When $D_{\text{inf}}\gg D$ the right-hand side is large, so $BD^{-\alpha}$ is a small fraction of the reducible loss $\ell - E = AN^{-\alpha} + BD^{-\alpha}$, and $AN^{-\alpha}\approx\ell - E$. The smallest model that can reach $\ell$ at all has $AN_{\min}^{-\alpha} = \ell - E$ exactly, which requires $BD^{-\alpha} = 0$, i.e. $D = \infty$. Near $N_{\min}$, $D = (B/(\ell - E - AN^{-\alpha}))^{1/\alpha}$ diverges. So for enormous deployments the optimum approaches the smallest model that can reach the quality target, trained on very many tokens; in practice the limit is set by the data available ([[#sec-data-constrained]]) and by the reliability of the law at extreme ratios.
:::
:::

::: exercise Reproducing an IsoFLOP minimum {level=3}
Write a short program that, for $C = 10^{22}$ FLOPs, evaluates the refitted law of Besiroglu et al. at $15$ model sizes spaced evenly in $\log N$ between $10^9$ and $10^{11}$, adds $0.5\%$ multiplicative Gaussian noise (seeded), fits a parabola in $\log_{10}N$ by least squares, and reports the estimated $N^\ast$. Compare with the exact optimum from [[#thm-chinchilla]] and discuss how the noise level and the range of sizes affect Approach 2.
::: solution
A plain-Python version fits $y = c_0 + c_1u + c_2u^2$ by solving the $3\times3$ normal equations, then reports $u^\ast = -c_1/(2c_2)$:

```python
import math, random
random.seed(1)
E, A, B, al, be = 1.82, 482.01, 2085.43, 0.3478, 0.3658
C = 1e22
us = [9 + 2 * i / 14 for i in range(15)]                    # log10 N
ys = [(E + A / 10 ** (al * u) + B / (C / (6 * 10 ** u)) ** be)
      * math.exp(random.gauss(0, 0.005)) for u in us]
S = [[sum(u ** (i + j) for u in us) for j in range(3)] for i in range(3)]
t = [sum(y * u ** i for u, y in zip(us, ys)) for i in range(3)]
for i in range(3):                                          # Gauss-Jordan elimination
    p = S[i][i]
    S[i] = [v / p for v in S[i]]; t[i] /= p
    for k in range(3):
        if k != i:
            m = S[k][i]
            S[k] = [a - m * b for a, b in zip(S[k], S[i])]; t[k] -= m * t[i]
c0, c1, c2 = t
G = (al * A / (be * B)) ** (1 / (al + be))
print(f"parabola N* = {10 ** (-c1 / (2 * c2)):.3e},"
      f"  exact N* = {G * (C / 6) ** (be / (al + be)):.3e}")
```

The exact optimum is $G(C/6)^{0.513} = 9.0\times10^9$; with seed $1$ the parabola gives $9.6\times10^9$, and seeds $2$ to $4$ give $9.6$, $9.1$ and $9.1\times10^9$ — errors of up to about $6\%$ from only $0.5\%$ noise in the losses. Because the profile is flat near its minimum (previous exercise), small noise in the losses moves the vertex a lot; a wider range of sizes constrains the curvature better but makes the parabola a worse approximation to the true, asymmetric profile. Hoffmann et al. mitigated both by using many sizes per budget and fitting power laws across nine budgets, so that errors in individual minima average out.
:::
:::
