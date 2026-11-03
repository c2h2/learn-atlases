When *Escherichia coli* meets lactose, the enzymes to use it appear within minutes; when the lactose runs out, they do not vanish at once but fade away over several generations. When a heat shock strikes, chaperones accumulate within a few minutes. Each of these responses has a level — how much protein is made — and a speed — how long it takes to get there. In this chapter we derive both from the simplest possible model of gene expression and then ask how regulation by transcription factors shapes them. The answers are quantitative and sometimes surprising: the speed of a response is set not by how fast the protein is made but by how fast it is removed, and a gene that represses itself responds several times faster than one that does not.

We build on the kinetic tools of [[systems-biology/modelling-principles]]: production–removal equations, steady states and time-scale separation. The molecular events — transcription by RNA polymerase, translation by ribosomes, and the binding of activators and repressors to promoters — were described in [[molecular-biology/transcription]] and [[molecular-biology/bacterial-gene-regulation]]. Throughout we follow the usual convention: genes in italics (*lacZ*), proteins upright (LacZ); a transcription factor and its concentration share a symbol, X.

## Production, degradation and dilution

Consider a protein Y whose gene is transcribed and translated at a constant rate. Its concentration changes for three reasons: it is made, it is actively degraded by proteases, and it is **diluted** as the cell grows. Dilution is easy to forget, but in bacteria it is usually the dominant removal process.

::: proposition Dilution by growth {#prop-dilution}
If a cell grows exponentially with doubling time $T_\mathrm{div}$, and a protein is neither made nor degraded, its concentration falls as

$$
\frac{dy}{dt} = -\alpha_\mathrm{dil}\,y, \qquad \alpha_\mathrm{dil} = \frac{\ln 2}{T_\mathrm{div}}.
$$ {#eq-dilution}

With active degradation at rate constant $\alpha_\mathrm{deg}$ as well, the total removal rate constant is $\alpha = \alpha_\mathrm{deg} + \alpha_\mathrm{dil}$. **Assumptions:** balanced exponential growth (volume $V \propto e^{\alpha_\mathrm{dil}t}$), averaging over the cell cycle.
:::

::: proof
The number of molecules $N$ is constant while the volume grows as $V(t) = V_0e^{\alpha_\mathrm{dil}t}$, with $\alpha_\mathrm{dil}$ chosen so that $V$ doubles in $T_\mathrm{div}$: $e^{\alpha_\mathrm{dil}T_\mathrm{div}} = 2$, giving $\alpha_\mathrm{dil} = \ln2/T_\mathrm{div}$. The concentration $y = N/V$ satisfies $dy/dt = -N V'/V^2 = -\alpha_\mathrm{dil}y$. If molecules are also degraded, $dN/dt = -\alpha_\mathrm{deg}N$, and differentiating $N/V$ gives $dy/dt = -(\alpha_\mathrm{deg} + \alpha_\mathrm{dil})y$.
:::

Most proteins in growing bacteria are stable — their degradation half-lives are much longer than a cell cycle — so $\alpha \approx \alpha_\mathrm{dil}$. In non-growing cells, such as neurons or the cells of an adult tissue, dilution vanishes and degradation is everything. A large proteome-wide study of mouse fibroblasts (Schwanhäusser and colleagues, 2011) found median half-lives of about 9 h for mRNAs and 46 h for proteins; in *E. coli* most mRNAs have half-lives of only a few minutes.

### Steady state and response time

With constant production rate $\beta$ (protein made per unit volume per unit time), the protein obeys the production–removal equation of [[systems-biology/modelling-principles#prop-prod-deg]]:

$$
\frac{dy}{dt} = \beta - \alpha y .
$$ {#eq-simple}

::: proposition Level and speed of simple regulation {#prop-simple}
For [[#eq-simple]] the steady-state concentration is $y_\mathrm{st} = \beta/\alpha$. When production switches on at $t=0$ from $y = 0$,

$$
y(t) = y_\mathrm{st}\left(1 - e^{-\alpha t}\right),
$$ {#eq-rise}

and when it switches off from $y_\mathrm{st}$, $y(t) = y_\mathrm{st}e^{-\alpha t}$. In both cases the **response time**, the time to go halfway, is

$$
T_{1/2} = \frac{\ln 2}{\alpha}.
$$ {#eq-response-time}

For a stable protein in growing cells, $\alpha = \alpha_\mathrm{dil}$ and $T_{1/2} = T_\mathrm{div}$: **the response takes one cell generation.**
:::

::: proof
This is [[systems-biology/modelling-principles#prop-prod-deg]] with $x_0 = 0$ (switch-on) or with $\beta = 0$ and $x_0 = y_\mathrm{st}$ (switch-off). Setting $1 - e^{-\alpha t} = 1/2$ or $e^{-\alpha t} = 1/2$ gives $t = \ln2/\alpha$. With $\alpha = \ln2/T_\mathrm{div}$, $T_{1/2} = T_\mathrm{div}$.
:::

This is a fundamental constraint. A cell dividing every hour cannot change the concentration of a stable protein by simple transcriptional regulation in much less than an hour, however strongly it activates the gene: stronger production raises the final level but leaves the approach time unchanged. Faster responses need active degradation (at the cost of making and destroying protein continually) or the circuit designs we meet below.

::: example Response time with degradation {#ex-response}
*E. coli* cells divide every 60 min. (a) What is the response time of a stable protein? (b) A second protein carries a degradation tag that gives it a degradation half-life of 20 min. What is its response time, and how much faster must it be synthesised to reach the same steady-state level?
::: solution
(a) $T_{1/2} = T_\mathrm{div} = 60$ min.

(b) $\alpha = \ln2/60 + \ln2/20 = \ln2\,(1/60 + 3/60) = \ln2/15$ per min, so $T_{1/2} = 15$ min — four times faster. The steady state is $\beta/\alpha$, and $\alpha$ is four times larger, so to reach the same level the protein must be made four times as fast. Three-quarters of the molecules made are destroyed rather than diluted: speed costs synthesis.
:::
:::

### mRNA and protein: a two-stage model

Proteins are made from mRNA, which is itself made and degraded. Writing $m$ for mRNA and $p$ for protein (both as molecules per cell, or concentrations),

$$
\frac{dm}{dt} = k_m - \gamma_m m, \qquad \frac{dp}{dt} = k_p m - \gamma_p p,
$$ {#eq-two-stage}

where $k_m$ is the transcription rate, $\gamma_m$ the mRNA removal rate constant, $k_p$ the translation rate per mRNA and $\gamma_p$ the protein removal rate constant. The steady state is

$$
m^* = \frac{k_m}{\gamma_m}, \qquad p^* = \frac{k_p m^*}{\gamma_p} = \frac{k_m k_p}{\gamma_m\gamma_p}.
$$ {#eq-two-stage-ss}

The ratio $b = k_p/\gamma_m$ is the mean number of proteins made from one mRNA during its lifetime, called the **burst size**; it will be central to [[systems-biology/noise]].

In bacteria mRNA turns over in minutes and protein in tens of minutes or more, so $\gamma_m \gg \gamma_p$. Then mRNA is the fast variable: it reaches $m^* = k_m/\gamma_m$ quickly and the protein follows a simple production–removal equation with $\beta = k_pk_m/\gamma_m$. This is why [[#eq-simple]] is usually adequate for protein dynamics, and why the protein response time is set by $\gamma_p$, not $\gamma_m$.

::: widget phaseplane
f: km - gm*x
g: kp*x - gp*y
x: 0, 6
y: 0, 60
sliders: km=1:0.2:3:0.1; gm=0.5:0.2:2:0.05; kp=2:0.5:5:0.1; gp=0.1:0.05:0.5:0.01
points: 0, 0; 6, 0; 0, 55; 5, 50
caption: The two-stage model of gene expression in the phase plane, with mRNA $m$ (molecules per cell) on the horizontal axis and protein $p$ on the vertical; time units are arbitrary. The vertical nullcline is $m = k_m/\gamma_m$ and the sloping one is $p = (k_p/\gamma_p)m$; they cross at the single stable steady state. With mRNA turning over faster than protein ($\gamma_m > \gamma_p$), trajectories first move horizontally to the mRNA nullcline and then creep along it to the steady state: mRNA is the fast variable. Make $\gamma_m$ smaller than $\gamma_p$ and the order reverses.
:::

::: example Steady-state copy numbers {#ex-two-stage}
In a bacterial cell dividing every 60 min, a gene is transcribed at $k_m = 0.5$ mRNA per minute; its mRNA has a half-life of 3 min and each mRNA is translated at $k_p = 10$ proteins per minute. The protein is stable. (These are illustrative values within the typical bacterial range.) Find the steady-state mRNA and protein copy numbers and the burst size.
::: solution
$\gamma_m = \ln2/3 = 0.231$ min⁻¹ and $\gamma_p = \ln2/60 = 0.0116$ min⁻¹ (dilution only). Then $m^* = 0.5/0.231 = 2.2$ mRNA molecules per cell — a gene can be "on" with only two transcripts present at a time. The burst size is $b = 10/0.231 = 43$ proteins per mRNA, and $p^* = k_p m^*/\gamma_p = 10\times2.16/0.0116 \approx 1{,}900$ proteins per cell. A thousand-fold amplification from mRNA to protein, and a protein whose average conceals the fact that it is made in sporadic bursts from a handful of transcripts.
:::
:::

## Input functions: how transcription factors set production

Production is not constant: transcription factors bind promoters and change the rate at which RNA polymerase initiates. The function relating the concentration of an active transcription factor X to the promoter's activity is the **input function** of the gene. Its shape is often described by a Hill function.

::: definition Hill functions {#def-hill}
For an **activator** X, the Hill input function is

$$
f(X) = \beta\,\frac{X^n}{K^n + X^n},
$$ {#eq-hill-act}

and for a **repressor**

$$
f(X) = \beta\,\frac{1}{1 + (X/K)^n},
$$ {#eq-hill-rep}

where $\beta$ is the maximal production rate, $K$ the **activation (or repression) coefficient** — the concentration of X giving half-maximal effect — and $n$ the **Hill coefficient**, which sets the steepness. Real promoters also have a **basal** (leaky) rate $\beta_0$ that is added to these.
:::

Why this form? One derivation is from cooperative binding.

::: proposition Hill function from cooperative binding {#prop-hill}
Suppose a promoter is active only when $n$ molecules of X are bound, that the $n$ molecules bind all together or not at all (perfect cooperativity), $nX + D \rightleftharpoons D_n$, with equilibrium constant $K^n = [X]^n[D]/[D_n]$. Then the fraction of promoters in the bound state is

$$
\theta = \frac{X^n}{K^n + X^n}.
$$

The response rises from 10 % to 90 % of its maximum over a ratio of concentrations $X_{90}/X_{10} = 81^{1/n}$. **Assumptions:** binding at equilibrium (fast compared with changes in X), free X approximately equal to total X, and all-or-none binding; for real, partially cooperative binding the measured $n$ is lower than the number of sites.
:::

::: proof
With $D_T = [D] + [D_n]$, $\theta = [D_n]/D_T = [D_n]/([D_n] + K^n[D_n]/X^n) = X^n/(X^n + K^n)$. For the 10–90 % range, $\theta = 0.1$ gives $X^n/K^n = 1/9$ and $\theta = 0.9$ gives $X^n/K^n = 9$; dividing, $(X_{90}/X_{10})^n = 81$.
:::

For simple binding ($n = 1$) a full 81-fold change in X is needed to go from 10 % to 90 % activity; with $n = 2$ only 9-fold, with $n = 4$ only 3-fold. Steep input functions make genes respond in a switch-like way, and many transcription factors bind as dimers or tetramers or to multiple sites, which yields effective Hill coefficients of 1–4. Sharpness can also come from other mechanisms — multisite phosphorylation, sequestration by an inhibitor, or saturated covalent-modification cycles ([[systems-biology/signalling-robustness]]) — so the Hill function is best regarded as a flexible description of a sigmoidal curve, not as evidence for a specific mechanism.

::: widget plot
f: b*x^n/(K^n + x^n); b/(1 + (x/K)^n)
x: 0, 4
y: 0, 1.1
sliders: n=2:1:8:0.5; K=1:0.2:3:0.1; b=1:0.5:1:0.05
labels: \text{activator}; \text{repressor}
hlines: 0.5
vlines: 1
caption: Hill input functions for an activator and a repressor with maximal rate $\beta$ (slider $b$), half-point $K$ and Hill coefficient $n$, against the transcription-factor concentration $X$ in units of its typical value. The two curves always cross at half-maximum at $X = K$. Increase $n$: the transition sharpens until it approaches a step — the "logic" approximation in which the gene is fully on above $K$ and fully off below it.
:::

::: warning "The Hill coefficient counts the binding sites"
A fitted Hill coefficient is a measure of steepness, not a count of molecules. For equilibrium binding, the Hill coefficient cannot exceed the number of binding sites, and it equals that number only for infinitely strong cooperativity. Haemoglobin, with four oxygen-binding sites, has a Hill coefficient of about 2.8–3, as A. V. Hill found in fitting his equation to oxygen-binding curves in 1910. Conversely, a Hill coefficient greater than 1 can arise with no cooperative binding at all, through mechanisms such as titration of an inhibitor.
:::

::: example Estimating a Hill coefficient {#ex-hill-fit}
The activity of a promoter, measured with a fluorescent reporter, rises from 10 % to 90 % of its maximum as the concentration of an inducer increases from 2 μM to 6 μM. Estimate the Hill coefficient and the half-maximal concentration $K$.
::: solution
By [[#prop-hill]], $X_{90}/X_{10} = 81^{1/n}$, so $3 = 81^{1/n}$ and $n = \ln81/\ln3 = 4$. Since $X_{10}^n/K^n = 1/9$, $K = X_{10}\cdot9^{1/4} = 2\times1.732 = 3.46\ \mu$M, the geometric mean of 2 and 6 (as it must be, since $X_{10}X_{90} = K^2$). A response this steep is unlikely to come from a single binding step and suggests cooperativity or an indirect mechanism.
:::
:::

### Multi-input functions

Many promoters integrate two or more transcription factors. The *lac* promoter of *E. coli* is the classic case: it is transcribed strongly only when the activator CRP is bound (with its ligand cAMP, signalling low glucose) **and** the repressor LacI is released (by allolactose, signalling lactose). Its input function is approximately an **AND gate** of the two signals, softened by a leaky basal level. Other promoters behave more like **OR gates** — either of two activators suffices — or more complex functions. Quantitative measurements of the *lac* promoter's two-dimensional input function (Setty and colleagues, 2003) showed it to be intermediate between pure AND and OR logic, and simple mutations in the promoter can shift it towards either. In models we usually write multi-input functions as products or sums of Hill functions, e.g. $f(X, Y) = \beta\,\frac{X^n}{K_X^n + X^n}\frac{1}{1 + (Y/K_Y)^m}$ for "X AND NOT Y".

## Autoregulation

A transcription factor often regulates its own gene. In the transcription network of *E. coli*, roughly 40 % of the transcription factors in the compilations analysed by Alon and colleagues repress their own transcription — far more than would be expected if self-edges arose at random, which makes **negative autoregulation** the first and simplest example of a **network motif** ([[systems-biology/network-motifs]]). Positive autoregulation is also common. We analyse each.

### Negative autoregulation speeds responses

::: definition Negative autoregulation {#def-nar}
A gene is **negatively autoregulated** when its product represses its own transcription. With a Hill repressor input function,

$$
\frac{dX}{dt} = \frac{\beta}{1 + (X/K)^n} - \alpha X .
$$ {#eq-nar}
:::

To see what this does, compare it with a simply regulated gene that reaches the *same* steady state. The clearest picture comes from the **logic approximation**: let $n$ be large, so that production is $\beta$ while $X < K$ and zero once $X > K$. Starting from $X = 0$, the protein accumulates at the full rate $\beta$ — almost linearly, since $\alpha X$ is small at first — until it reaches $K$, where production shuts off and the level stays at $X_\mathrm{st} \approx K$.

::: proposition Response time of negative autoregulation {#prop-nar-speed}
In the logic approximation, with strong repression ($\beta/\alpha \gg K$), the negatively autoregulated gene reaches its steady state $X_\mathrm{st} \approx K$ with response time

$$
T_{1/2}^\mathrm{NAR} \approx \frac{K}{2\beta},
$$ {#eq-nar-speed}

compared with $T_{1/2} = \ln 2/\alpha$ for simple regulation. The speed-up factor is

$$
\frac{T_{1/2}}{T_{1/2}^\mathrm{NAR}} \approx 2\ln2\,\frac{\beta/\alpha}{K},
$$

proportional to the ratio of the unrepressed steady state $\beta/\alpha$ to the repression threshold $K$. Its steady state is also less sensitive to the production rate: for $X \gg K$,

$$
X_\mathrm{st} \approx K\left(\frac{\beta}{\alpha K}\right)^{1/(n+1)},
$$ {#eq-nar-robust}

so a change of $\beta$ by a factor $c$ changes $X_\mathrm{st}$ by only $c^{1/(n+1)}$.
:::

::: proof
While $X \ll \beta/\alpha$ the removal term is negligible and $X \approx \beta t$; production stops at $X = K$, so half the steady state is reached when $\beta t = K/2$, giving [[#eq-nar-speed]]. Dividing $\ln2/\alpha$ by $K/(2\beta)$ gives the speed-up. For the steady state, set [[#eq-nar]] to zero; if $X \gg K$, $1 + (X/K)^n \approx (X/K)^n$, so $\beta K^n/X^n = \alpha X$, that is $X^{n+1} = \beta K^n/\alpha$, which is [[#eq-nar-robust]].
:::

The design principle is that negative autoregulation lets a cell use a **strong promoter** to rush towards a target level and then **brake** as it arrives. Simple regulation can only reach a level quickly by also degrading the protein quickly. Ralph Rosenfeld, Michael Elowitz and Uri Alon tested this prediction in *E. coli* in 2002 with a synthetic circuit based on the repressor TetR fused to green fluorescent protein: the negatively autoregulated version reached half its steady state about five times faster than a simply regulated version with the same steady state. A second advantage, pointed out by Michael Savageau in 1974 and tested by Attila Becskei and Luis Serrano in 2000, is robustness: [[#eq-nar-robust]] shows that fluctuations in production rate, from cell-to-cell variation in polymerases or plasmid copy number, are damped in the steady state.

The following program integrates both circuits, in units where $\alpha = 1$ and both reach $X_\mathrm{st} = 1$.

```python
import math

def rise_time(beta, K, n, alpha=1.0, dt=1e-4):
    """Time for x to reach half its steady state, starting from x = 0.
    dx/dt = beta / (1 + (x/K)^n) - alpha*x ; K = None means no repression."""
    f = (lambda x: beta - alpha*x) if K is None else \
        (lambda x: beta / (1 + (x/K)**n) - alpha*x)
    # steady state by bisection on f(x) = 0
    lo, hi = 0.0, beta/alpha
    for _ in range(100):
        mid = (lo + hi)/2
        lo, hi = (mid, hi) if f(mid) > 0 else (lo, mid)
    xs = (lo + hi)/2
    x, t = 0.0, 0.0
    while x < xs/2:            # Euler integration
        x += f(x)*dt
        t += dt
    return xs, t

# time in units of 1/alpha (alpha = 1); both circuits reach x_st = 1
print("simple:  x_st = %.3f, T1/2 = %.3f" % rise_time(1.0, None, 1))
K = 9 ** (-1/4)                     # chosen so that 10/(1+(1/K)^4) = 1
print("NAR n=4: x_st = %.3f, T1/2 = %.3f" % rise_time(10.0, K, 4))
# simple:  x_st = 1.000, T1/2 = 0.693
# NAR n=4: x_st = 1.000, T1/2 = 0.058
```

With a promoter ten times stronger than needed, the autoregulated gene responds about twelve times faster. The logic approximation [[#eq-nar-speed]] gives $K/(2\beta) = 0.577/20 = 0.029$ — the right order of magnitude, but an underestimate because with $n = 4$ repression already begins well below $K$.

::: widget slopefield
f: b/(1 + (y/K)^4) - y
x: 0, 4
y: 0, 1.6
sliders: b=10:1:20:0.5; K=0.58:0.3:1.5:0.01
points: 0, 0; 0, 1.5
caption: Negative autoregulation, $dX/dt = \beta/(1 + (X/K)^4) - \alpha X$, with time in units of $1/\alpha$ (one cell generation divided by $\ln 2$ for a stable protein) and $X$ in units of the target level. With the default $\beta = 10$, $K = 0.58$ the curve from $X = 0$ shoots up almost vertically and levels off at about 1 within a fraction of a time unit. Compare simple regulation by setting $K$ to its maximum and $\beta$ to about 1 (the curve then takes $\ln 2 \approx 0.7$ time units to get halfway), or raise $\beta$ and notice how little the steady state moves.
:::

::: quiz
A negatively autoregulated gene and a simply regulated gene have the same steady-state level and the same protein stability. When both are switched off (production stops), which returns to zero faster?
- [ ] The negatively autoregulated gene
- [ ] The simply regulated gene
- [x] Neither: both decay at the removal rate $\alpha$
::: solution
Once production is switched off entirely, both proteins simply decay as $e^{-\alpha t}$, so they fall at the same rate. Negative autoregulation speeds the *rise* — the strong promoter accelerates accumulation and then brakes — but cannot speed the decline, which is set by degradation and dilution. (If "switching off" only lowers production partially, autoregulation can help a little, because falling X relieves repression; but the dominant effect is on the rise.)
:::
:::

### Positive autoregulation slows responses and can make switches

A gene that activates its own transcription has the opposite effect:

$$
\frac{dX}{dt} = \beta_0 + \beta\,\frac{X^n}{K^n + X^n} - \alpha X .
$$ {#eq-par}

When induced, it starts slowly — production is low while X is low — and then accelerates as X activates its own gene, giving an S-shaped rise with a delay. This makes positive autoregulation useful where a cell should not respond to brief signals, and it widens the distribution of responses across a population, because cells cross the threshold at different times.

If the feedback is steep enough ($n > 1$) and strong enough, something qualitatively new happens: [[#eq-par]] can have **three** steady states, two stable ones (low and high) separated by an unstable threshold. The gene then behaves as a **memory**: it stays off or on depending on its history. To see this, plot production and removal against X. The steady states are where the sigmoidal production curve $\beta_0 + \beta X^n/(K^n + X^n)$ crosses the removal line $\alpha X$. A shallow line crosses once at high X; a steep line once at low X; in between it can cross three times.

::: widget plot
f: b0 + b*x^n/(1 + x^n); a*x
x: 0, 3
y: 0, 2.5
sliders: a=0.5:0.2:1.2:0.01; b=1:0.5:2:0.05; b0=0.05:0:0.3:0.01; n=3:1:6:0.5
labels: \text{production } \beta_0 + \beta\frac{X^n}{K^n+X^n}; \text{removal } \alpha X
caption: Graphical analysis of positive autoregulation with $K = 1$: production (sigmoid) and removal (straight line through the origin) against $X$. Steady states are the crossing points; where production exceeds removal $X$ increases. With the default settings the line crosses three times — two stable states, low and high, either side of an unstable threshold. Change the removal rate $a$: steepen it and the high state vanishes, flatten it and the low state vanishes. With $n = 1$ there is only ever one crossing: bistability needs cooperativity.
:::

::: example Counting steady states {#ex-par}
Take [[#eq-par]] with $\beta_0 = 0.05$, $\beta = 1$, $K = 1$ and $n = 3$ (dimensionless illustrative values). (a) Show that with $\alpha = 0.5$ there are three steady states and classify them. (b) What happens with $\alpha = 0.8$?
::: solution
(a) Let $g(X) = 0.05 + X^3/(1 + X^3) - 0.5X$, the net rate of change. Evaluating at a few points: $g(0) = 0.05 > 0$; $g(0.2) = 0.05 + 0.0079 - 0.1 = -0.042$; $g(1) = 0.05 + 0.5 - 0.5 = +0.05$; $g(2) = 0.05 + 0.889 - 1.0 = -0.061$. The sign changes $+,-,+,-$ show three roots: one between 0 and 0.2 where $g$ crosses downwards (stable), one between 0.2 and 1 where it crosses upwards (unstable) and one between 1 and 2 crossing downwards (stable). Numerically they are at $X \approx 0.10$, $0.83$ and $1.81$. A cell below the threshold 0.83 settles in the low state, one above it in the high state.

(b) With $\alpha = 0.8$ the removal line is steeper and passes above the whole upper part of the sigmoid: $g(1) = 0.05 + 0.5 - 0.8 = -0.25$, and $g$ stays negative for every $X$ beyond the single root at $X \approx 0.06$. Only the low state survives. Scanning $\alpha$ numerically shows that, for these parameters, three steady states exist only for $0.26 \lesssim \alpha \lesssim 0.57$: bistability occupies a window of parameter space, whose edges are the bifurcations studied in [[systems-biology/switches-oscillators]].
:::
:::

::: application Engineering expression levels
Synthetic biologists exploit these results directly. Degradation tags (short peptide sequences such as the ssrA tag recognised by the ClpXP protease in *E. coli*) shorten protein half-lives and so speed up circuits ([[#ex-response]]), at a cost in expression. Negative autoregulation is used to make expression levels insensitive to plasmid copy number and to cell-to-cell variability ([[#prop-nar-speed]]), and positive autoregulation to build memory devices that record a transient signal. In metabolic engineering, choosing promoter and ribosome-binding-site strengths to balance the expression of pathway enzymes is the first step of any design ([[biotechnology/metabolic-engineering]]).
:::

::: history
Archibald Vivian Hill introduced his equation in 1910 to describe the sigmoidal binding of oxygen to haemoglobin, decades before the protein's four subunits were known. The quantitative analysis of gene circuits began with François Jacob and Jacques Monod's operon model of 1961 and with mathematical treatments of feedback by Brian Goodwin (1963) and others. Michael Savageau's *Biochemical Systems Analysis* (1976) and his 1974 comparison of autogenous and classical regulation in *Nature* argued that autoregulation had specific functional advantages. Direct measurements of gene-expression dynamics in living cells became possible with green fluorescent protein, cloned by Douglas Prasher in 1992 and first expressed in *E. coli* and *Caenorhabditis elegans* by Martin Chalfie and colleagues in 1994; fluorescent reporters made it possible to watch promoter activity in real time and to test predictions such as the speed-up from negative autoregulation (Rosenfeld, Elowitz and Alon, 2002).
:::

::: summary
- Proteins are removed by degradation and by dilution through growth, $\alpha = \alpha_\mathrm{deg} + \ln2/T_\mathrm{div}$; in growing bacteria most proteins are stable and dilution dominates.
- Simple regulation gives steady state $\beta/\alpha$ and response time $\ln2/\alpha$, which is one cell cycle for a stable protein; production sets the level, removal sets the speed.
- In the two-stage model mRNA is usually fast; the protein steady state is $k_mk_p/(\gamma_m\gamma_p)$ and the burst size is $k_p/\gamma_m$.
- Promoter input functions are described by Hill functions; the Hill coefficient $n$ measures steepness, with a 10–90 % range of $81^{1/n}$, and is not a count of binding sites.
- Negative autoregulation speeds up the rise to steady state by a factor $\approx 2\ln2\,(\beta/\alpha)/K$ and makes the steady state robust to production rate, varying as $\beta^{1/(n+1)}$.
- Positive autoregulation slows responses and, if cooperative and strong enough, creates bistability — a cellular memory.
:::

## Exercises

::: exercise Dilution rate {level=1 check="0.0231"}
Bacteria divide every 30 min. What is the dilution rate constant $\alpha_\mathrm{dil}$ in min⁻¹ (three significant figures)?
::: solution
$\alpha_\mathrm{dil} = \ln2/30 = 0.0231$ min⁻¹.
:::
:::

::: exercise Steady state from rates {level=1 check="500"}
A stable protein is made at 10 molecules per minute in cells that divide every 34.66 min (so that $\alpha_\mathrm{dil} = 0.02$ min⁻¹). What is its steady-state number per cell (averaged over the cell cycle)?
::: solution
$y_\mathrm{st} = \beta/\alpha = 10/0.02 = 500$ molecules.
:::
:::

::: exercise Hill coefficient from a range {level=1 check="2"}
A repressor reduces a promoter's activity from 90 % to 10 % of its maximum as its concentration rises from 10 nM to 90 nM. What is the Hill coefficient?
::: solution
The ratio is 9, so $81^{1/n} = 9$ and $n = 2$.
:::
:::

::: exercise Halfway with degradation {level=2 check="24"}
A protein in cells dividing every 120 min has a degradation half-life of 30 min. What is its response time in minutes?
::: solution
$\alpha = \ln2/120 + \ln2/30 = \ln2\,(1 + 4)/120 = \ln2/24$, so $T_{1/2} = 24$ min.
:::
:::

::: exercise Two-stage response {level=2}
In the two-stage model [[#eq-two-stage]], suppose $\gamma_m = 0.2$ min⁻¹ and $\gamma_p = 0.02$ min⁻¹, and transcription is switched on at $t = 0$ with $m(0) = p(0) = 0$. Show that $p(t) = p^*\left[1 - \dfrac{\gamma_m e^{-\gamma_p t} - \gamma_p e^{-\gamma_m t}}{\gamma_m - \gamma_p}\right]$ and explain why it is well approximated by the one-stage formula [[#eq-rise]] with $\alpha = \gamma_p$ except at early times.
::: hint
Solve for $m(t)$ first, then substitute into the protein equation and verify the formula by differentiation.
:::
::: solution
First $m(t) = m^*(1 - e^{-\gamma_m t})$. Substituting into $dp/dt = k_pm - \gamma_pp$ and using the integrating factor $e^{\gamma_p t}$ gives a solution of the stated form; checking: at $t = 0$ the bracket is $1 - (\gamma_m - \gamma_p)/(\gamma_m - \gamma_p) = 0$, and differentiating, $dp/dt = p^*\gamma_m\gamma_p(e^{-\gamma_p t} - e^{-\gamma_m t})/(\gamma_m - \gamma_p)$, which equals $k_pm - \gamma_pp$ after substitution (with $p^* = k_pm^*/\gamma_p$). When $\gamma_m = 10\gamma_p$, the term $\gamma_p e^{-\gamma_m t}$ dies away within a few times $1/\gamma_m = 5$ min, leaving $p \approx p^*(1 - \tfrac{10}{9}e^{-\gamma_p t})$ — essentially the one-stage curve, slightly delayed (by about $1/\gamma_m$). The mRNA stage adds a short lag at the start, which is why the protein curve starts with zero slope.
:::
:::

::: exercise Robustness of the steady state {level=2}
A negatively autoregulated gene with $n = 2$ and strong repression is carried on a plasmid whose copy number varies from cell to cell by a factor of 2. By what factor does the steady-state protein level vary? Compare with an unregulated gene on the same plasmid.
::: solution
Production $\beta$ is proportional to copy number. By [[#eq-nar-robust]], $X_\mathrm{st}\propto\beta^{1/(n+1)} = \beta^{1/3}$, so a twofold change in $\beta$ gives $2^{1/3} = 1.26$, a 26 % variation. An unregulated gene has $X_\mathrm{st} = \beta/\alpha$, which varies twofold. Negative autoregulation buffers expression against gene dosage.
:::
:::

::: exercise Interpreting a reporter time course {level=2}
Two strains carry the same fluorescent reporter downstream of different promoters. When induced, strain A reaches half its final fluorescence after 25 min and strain B after 110 min; the cells divide every 110 min and the reporter is stable. Both reach similar final levels. Suggest explanations for strain A's faster response, and an experiment to distinguish them.
::: solution
For a stable reporter with simple regulation, $T_{1/2} = T_\mathrm{div} = 110$ min, as strain B shows. Strain A is faster. Possibilities: (i) the reporter in A is actively degraded (but then, to reach the same level, it must also be produced faster) — test by blocking synthesis with an antibiotic and measuring the decay rate, which would be faster than dilution; (ii) the promoter in A is negatively autoregulated or repressed by a factor induced alongside it — then the decay after removal of the inducer would be at the dilution rate, but the rise would be fast; test by measuring the rise and the decay separately, or by deleting the putative repressor and seeing whether the response slows and the level rises; (iii) a feed-forward pulse ([[systems-biology/network-motifs]]). The key diagnostic is that fast rise with normal decay indicates a circuit effect, while fast rise and fast decay indicate degradation.
:::
:::

::: exercise A bistable window {level=3}
For positive autoregulation in dimensionless form, $dX/dt = \beta_0 + X^n/(1 + X^n) - \alpha X$ with $\beta_0 = 0$ and $n = 2$, show that $X = 0$ is always a steady state, and that the other steady states satisfy $X/(1+X^2) = \alpha$. For which values of $\alpha$ are there two further steady states? Classify all of them in that case.
::: hint
The function $h(X) = X/(1 + X^2)$ has a single maximum. Where?
:::
::: solution
With $\beta_0 = 0$, $X = 0$ makes both terms vanish. For $X \ne 0$, dividing $X^2/(1+X^2) = \alpha X$ by $X$ gives $X/(1+X^2) = \alpha$. The function $h(X) = X/(1+X^2)$ has $h' = (1 - X^2)/(1 + X^2)^2$, so it rises from 0 to a maximum $h(1) = 1/2$ and then falls back to 0. Hence for $0 < \alpha < 1/2$ there are two positive solutions $X_1 < 1 < X_2$; at $\alpha = 1/2$ they merge at $X = 1$ (a saddle-node bifurcation); for $\alpha > 1/2$ only $X = 0$ remains. Classification: near 0, $dX/dt \approx X^2 - \alpha X < 0$ for small $X > 0$, so 0 is stable. Between 0 and $X_1$ production is below removal (decreasing), between $X_1$ and $X_2$ above (increasing), and above $X_2$ below again. So $X_1$ is unstable — the threshold — and $X_2$ is stable — the "on" state. With $\beta_0 = 0$ and $n = 2$ the gene is bistable for all removal rates below $1/2$: once on it stays on, once off it stays off.
:::
:::

::: exercise The cost of speed {level=3}
A cell must raise a protein from zero to 1,000 copies within 15 min, and it divides every 60 min. (a) With simple regulation, what degradation rate is needed for the response time to be 15 min, and how many molecules per minute must be synthesised at steady state? (b) With negative autoregulation in the logic approximation, what maximal production rate $\beta$ gives the same response time with a stable protein, and what is the steady-state synthesis rate? Comment.
::: solution
(a) We need $\alpha = \ln2/15 = 0.0462$ min⁻¹, which includes dilution $\ln2/60 = 0.0116$, so the degradation rate constant is $0.0347$ min⁻¹ (a degradation half-life of 20 min). The steady state $\beta/\alpha = 1000$ requires $\beta = 46$ molecules per minute, continuously.

(b) In the logic approximation, $T_{1/2} = K/(2\beta)$ with $K \approx X_\mathrm{st} = 1000$, so $\beta = 1000/(2\times15) = 33$ molecules per minute during the rise. At steady state the protein is only diluted, so synthesis need only balance dilution: $0.0116\times1000 = 12$ molecules per minute. Negative autoregulation achieves the same speed with a quarter of the steady-state synthesis cost, because the promoter works hard only while the protein is accumulating. (In practice the promoter must be capable of $\beta$, and partial repression slightly slows the approach near the target.)
:::
:::
