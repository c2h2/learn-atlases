Take a culture of genetically identical *Escherichia coli* cells, grown in the same flask, and put a fluorescent reporter under the control of a constitutive promoter. Under the microscope the cells are not equally bright: some glow two or three times more than others, and the differences are not measurement error. The deterministic models of the previous chapters predict a single concentration for every cell. They describe averages. But the molecules that control a cell are few — one or two copies of a gene, a handful of mRNAs, tens of copies of a transcription factor ([[systems-biology/modelling-principles#ex-one-molecule]]) — and when numbers are small, the random timing of individual reactions makes each cell's history different. This randomness is **noise** in gene expression.

Noise matters for three reasons. It limits how precisely a cell can control its own composition and read its environment. It can push cells across thresholds and so make genetically identical cells adopt different fates ([[systems-biology/switches-oscillators]]). And it can be useful: a population whose members differ is better prepared for an unpredictable future. This chapter describes how to model chemical reactions as random events — the **chemical master equation** — and how to simulate them exactly with the **Gillespie algorithm**; derives the noise of the simplest models of gene expression, showing why proteins are made in **bursts**; explains how experiments separate **intrinsic** from **extrinsic** noise; and surveys what noise does for cells. The probability we need — the Poisson, geometric and gamma distributions, means, variances and the exponential waiting time — is in [[biostatistics/probability-distributions]] and, more formally, in [continuous random variables](/learn/maths/lesson.php?c=probability&l=continuous-random-variables) in Maths Atlas.

## Reactions as random events

In a deterministic model, a first-order degradation reaction removes a fraction $\gamma\,dt$ of the molecules in each short interval $dt$. If there are $10^6$ molecules this is a fine description. If there are five, it is not: either a molecule is degraded in the next second or it is not, and when that happens is a matter of chance. The natural description is probabilistic.

::: definition Propensity and the chemical master equation {#def-cme}
In a well-mixed volume containing $n$ molecules of each species (a vector $\mathbf{n}$), each reaction $j$ has a **propensity** $a_j(\mathbf{n})$, defined so that $a_j(\mathbf{n})\,dt$ is the probability that one reaction event of type $j$ occurs in the next infinitesimal interval $dt$. When it occurs, the molecule numbers change by the **stoichiometric vector** $\boldsymbol{\nu}_j$. The probability $P(\mathbf{n}, t)$ of finding the system in state $\mathbf{n}$ at time $t$ obeys the **chemical master equation**

$$
\frac{dP(\mathbf{n}, t)}{dt} = \sum_j \Bigl[a_j(\mathbf{n} - \boldsymbol{\nu}_j)P(\mathbf{n} - \boldsymbol{\nu}_j, t) - a_j(\mathbf{n})P(\mathbf{n}, t)\Bigr].
$$ {#eq-cme}

The first term is the probability flowing into state $\mathbf{n}$ from states one reaction away; the second is the flow out.
:::

Propensities are the stochastic counterpart of mass-action rates, written in molecule numbers rather than concentrations. For synthesis at constant rate, $\emptyset \to X$, the propensity is a constant $k$ (molecules per unit time). For first-order degradation, $X \to \emptyset$, it is $\gamma n$: each of the $n$ molecules independently has probability $\gamma\,dt$ of being degraded. For a bimolecular reaction $A + B \to C$ in volume $V$ it is $(k/(N_AV))\,n_An_B$, where $k$ is the usual rate constant in M⁻¹ s⁻¹. The master equation is linear in $P$ but has one equation for each possible state, so it can be solved exactly only for simple systems.

### The birth–death process

The simplest model of gene expression is a single species made at constant rate $k$ and degraded with rate constant $\gamma$ per molecule:

$$
\emptyset \xrightarrow{\;k\;} X \xrightarrow{\;\gamma\;} \emptyset .
$$

This describes mRNA from a constitutive promoter quite well. Its master equation is

$$
\frac{dP_n}{dt} = kP_{n-1} + \gamma(n + 1)P_{n+1} - (k + \gamma n)P_n .
$$ {#eq-birth-death}

::: proposition The birth–death process is Poisson {#prop-poisson}
The stationary distribution of [[#eq-birth-death]] is the **Poisson distribution** with mean $\mu = k/\gamma$,

$$
P_n = \frac{\mu^n e^{-\mu}}{n!}, \qquad \langle n\rangle = \sigma^2 = \frac{k}{\gamma}.
$$ {#eq-poisson}

Consequently the **Fano factor** $\sigma^2/\langle n\rangle$ equals 1, and the **coefficient of variation** satisfies $\eta^2 = \sigma^2/\langle n\rangle^2 = 1/\langle n\rangle$. The mean obeys the deterministic equation $d\langle n\rangle/dt = k - \gamma\langle n\rangle$ exactly. **Assumptions:** well-mixed volume, constant $k$ (no promoter switching, no cell growth or division), independent first-order degradation.
:::

::: proof
At stationarity the probability flux from $n - 1$ to $n$ must balance the flux from $n$ to $n - 1$ for every $n$ (in a one-dimensional chain with steps of $\pm1$, any net flux would have to flow off to infinity): $kP_{n-1} = \gamma nP_n$. Hence $P_n = (\mu/n)P_{n-1}$ with $\mu = k/\gamma$, so $P_n = P_0\mu^n/n!$, and normalisation $\sum P_n = 1$ gives $P_0 = e^{-\mu}$. The Poisson mean and variance are both $\mu$. For the mean, multiply [[#eq-birth-death]] by $n$ and sum over $n$: after shifting indices, $d\langle n\rangle/dt = k - \gamma\langle n\rangle$. This works because the propensities are linear in $n$; for nonlinear propensities, $\langle a(n)\rangle \ne a(\langle n\rangle)$ and the mean no longer follows the deterministic equation exactly.
:::

The result $\eta = 1/\sqrt{\langle n\rangle}$ is the basic law of small numbers: a species present at an average of 100 molecules fluctuates by about 10 %, one at 10,000 by about 1 %. Noise from the random timing of reactions — **intrinsic** noise — is significant only for species at low copy number.

::: example How many cells have no mRNA? {#ex-zero}
A constitutive gene produces an mRNA with mean 2 copies per cell ([[systems-biology/gene-expression-dynamics#ex-two-stage]]). Assuming a Poisson distribution, what fraction of cells contain no copy at a given moment, and what are the standard deviation and coefficient of variation? Compare a gene with mean 9 copies.
::: solution
$P_0 = e^{-2} = 0.135$: about 13.5 % of cells have no transcript at all at any moment. The standard deviation is $\sqrt2 = 1.41$ and the coefficient of variation $1/\sqrt2 = 0.71$. For a mean of 9, $P_0 = e^{-9} = 1.2\times10^{-4}$, $\sigma = 3$ and $\eta = 0.33$. Single-molecule fluorescence in situ hybridisation (smFISH), which counts individual mRNA molecules in fixed cells, has found that many genes in bacteria, yeast and mammalian cells are expressed at a few mRNAs per cell, and that the distributions of many are broader than Poisson — a sign of bursting, below.
:::
:::

::: widget distribution
dist: poisson
params: lambda=2
a: 0
b: 0
caption: The Poisson distribution of mRNA copy number per cell for a constitutive gene, with mean $\mu = k/\gamma$ set by the slider; the shaded bar is the probability of finding no mRNA. At $\mu = 2$ about 14 % of cells have none. Increase $\mu$ and watch the distribution become relatively narrower: its standard deviation grows only as $\sqrt\mu$, so the coefficient of variation falls as $1/\sqrt\mu$.
:::

## Exact stochastic simulation

For anything but the simplest models the master equation cannot be solved, but it can be sampled: we can generate individual random trajectories whose statistics are exactly those the master equation describes. The method rests on two facts about a system whose propensities are $a_1, \dots, a_M$ in the current state. With total propensity $a_0 = \sum_j a_j$, the waiting time until the next reaction (of any kind) is exponentially distributed with rate $a_0$, because each reaction channel independently "fires" as a Poisson process; and the probability that the next reaction is of type $j$ is $a_j/a_0$.

::: algorithm Gillespie's stochastic simulation algorithm {#alg-gillespie}
Given the reactions with propensity functions $a_j(\mathbf{n})$ and stoichiometric vectors $\boldsymbol{\nu}_j$, an initial state $\mathbf{n}$ and $t = 0$:

1. Compute all propensities $a_j(\mathbf{n})$ and their sum $a_0$. If $a_0 = 0$, stop.
2. Draw two independent uniform random numbers $r_1, r_2 \in (0, 1)$.
3. Set the waiting time $\tau = \dfrac{1}{a_0}\ln\dfrac{1}{r_1}$ (an exponential random variable with mean $1/a_0$).
4. Choose the reaction $j$ as the smallest index with $\sum_{i\le j} a_i > r_2a_0$.
5. Update $t \leftarrow t + \tau$ and $\mathbf{n} \leftarrow \mathbf{n} + \boldsymbol{\nu}_j$.
6. Record the state if required, and return to step 1 until $t$ reaches the end time.
:::

The algorithm is exact — not an approximation like Euler's method — because it simulates every reaction event at its correct random time. Its cost is proportional to the number of events, which becomes prohibitive when some species are abundant and reactions frequent; approximate methods (τ-leaping, the chemical Langevin equation, hybrid methods treating abundant species deterministically) are used then. Here is the algorithm for the birth–death process.

```python
import math, random

def gillespie(k, gamma, n0, t_end, rng):
    """Birth-death process: 0 -> X at rate k, X -> 0 at rate gamma*n.
    Returns time-weighted mean and variance of n over [0, t_end]."""
    t, n = 0.0, n0
    s0 = s1 = s2 = 0.0                    # integrals of 1, n, n^2 dt
    while t < t_end:
        a1, a2 = k, gamma * n             # propensities (per unit time)
        a0 = a1 + a2
        tau = -math.log(1.0 - rng.random()) / a0     # exponential waiting time
        tau = min(tau, t_end - t)
        s0 += tau; s1 += n * tau; s2 += n * n * tau  # n is constant until the event
        t += tau
        if t >= t_end:
            break
        if rng.random() * a0 < a1:        # choose which reaction fires
            n += 1
        else:
            n -= 1
    mean = s1 / s0
    return mean, s2 / s0 - mean**2

rng = random.Random(42)
mean, var = gillespie(k=10.0, gamma=1.0, n0=0, t_end=10000.0, rng=rng)
print(f"mean = {mean:.2f}, variance = {var:.2f}, Fano = {var/mean:.2f}")
# mean = 9.96, variance = 10.18, Fano = 1.02
```

The simulated mean and variance agree with the Poisson prediction ($\mu = \sigma^2 = 10$) to within the sampling error of a finite run. Note that the averages are weighted by the time spent in each state, since the state is constant between events. (Using `1.0 - rng.random()` avoids taking the logarithm of zero.)

::: example One step of the algorithm {#ex-gillespie-step}
In a birth–death process with $k = 10$ min⁻¹ and $\gamma = 0.5$ min⁻¹, the cell currently has 30 molecules. (a) What is the mean waiting time to the next event? (b) What is the probability that the next event is a synthesis? (c) What is the steady-state mean, and is the current state above or below it?
::: solution
(a) The propensities are $a_1 = 10$ and $a_2 = 0.5\times30 = 15$ min⁻¹, so $a_0 = 25$ min⁻¹ and the mean waiting time is $1/25$ min $= 2.4$ s. (b) $a_1/a_0 = 10/25 = 0.4$. (c) $\mu = k/\gamma = 20$. The state is above the mean, so degradations are more likely than syntheses (probability 0.6), which on average pulls the number back down — the stochastic version of a stable steady state.
:::
:::

## Bursts: the noise of protein production

Proteins are made from mRNA, and each mRNA is translated several times before it is degraded. If the mRNA is short-lived compared with the protein, the proteins from one transcript appear together in a **burst**, and the protein level jumps up in steps whose size is random.

::: proposition Noise in the two-stage model {#prop-two-stage-noise}
For the two-stage model of [[systems-biology/gene-expression-dynamics]] — mRNA made at rate $k_m$ and removed at rate $\gamma_m$ per molecule, protein made at rate $k_p$ per mRNA and removed at rate $\gamma_p$ per molecule, all reactions first order or zero order — the stationary protein distribution has mean $\langle p\rangle = k_mk_p/(\gamma_m\gamma_p)$ and Fano factor

$$
\frac{\sigma_p^2}{\langle p\rangle} = 1 + \frac{k_p}{\gamma_m + \gamma_p} \approx 1 + b, \qquad b = \frac{k_p}{\gamma_m},
$$ {#eq-fano}

the approximation holding when mRNA is much less stable than protein ($\gamma_m \gg \gamma_p$). Hence $\eta_p^2 \approx (1 + b)/\langle p\rangle$. In the same limit the protein distribution is well approximated by a **gamma distribution** with shape parameter $a = k_m/\gamma_p$ (the number of bursts per protein lifetime) and scale $b$ (the mean burst size). **Assumptions:** constant transcription rate, linear kinetics, cell growth and division averaged into $\gamma_p$.
:::

::: proof
For linear networks, the means and (co)variances obey closed linear equations obtained from the master equation by taking moments. The means satisfy the deterministic equations, giving $\langle m\rangle = k_m/\gamma_m$ and $\langle p\rangle = k_p\langle m\rangle/\gamma_p$. For the second moments, define $\Sigma_{mm}$, $\Sigma_{mp}$ and $\Sigma_{pp}$ as the variances and covariance. At stationarity they satisfy
$$
\begin{aligned}
0 &= -2\gamma_m\Sigma_{mm} + k_m + \gamma_m\langle m\rangle, \\
0 &= k_p\Sigma_{mm} - (\gamma_m + \gamma_p)\Sigma_{mp}, \\
0 &= 2k_p\Sigma_{mp} - 2\gamma_p\Sigma_{pp} + k_p\langle m\rangle + \gamma_p\langle p\rangle,
\end{aligned}
$$
in which each term with a mean comes from the intrinsic randomness of a reaction (synthesis and degradation each contribute their average rate). The first gives $\Sigma_{mm} = \langle m\rangle$ (mRNA is Poisson); the second $\Sigma_{mp} = k_p\langle m\rangle/(\gamma_m + \gamma_p)$; and the third, using $k_p\langle m\rangle = \gamma_p\langle p\rangle$, gives $\Sigma_{pp} = \langle p\rangle + k_p\Sigma_{mp}/\gamma_p = \langle p\rangle\bigl(1 + k_p/(\gamma_m + \gamma_p)\bigr)$, which is [[#eq-fano]]. The gamma approximation, due to Nir Friedman, Long Cai and Sunney Xie (2006), follows from treating bursts as instantaneous and geometrically distributed in size.
:::

The key consequence is that **two genes with the same mean protein level can have very different noise**, depending on how that level is achieved. High transcription with low translation (small bursts, $b \approx 0$) gives nearly Poisson protein noise; low transcription with high translation (large bursts) gives noise many times larger. Ertugrul Ozbudak, Alexander van Oudenaarden and colleagues tested this in *Bacillus subtilis* in 2002 by mutating the ribosome-binding site and the promoter of a reporter gene independently: noise increased strongly with translational efficiency but only weakly with transcription rate, as [[#eq-fano]] predicts. In 2006 Long Cai, Ji Yu, Sunney Xie and colleagues watched individual bursts of protein production in single *E. coli* cells and found geometrically distributed burst sizes, again as the theory assumes.

::: example Noise of a bursty protein {#ex-burst}
For the gene of [[systems-biology/gene-expression-dynamics#ex-two-stage]] ($k_m = 0.5$ min⁻¹, mRNA half-life 3 min, $k_p = 10$ min⁻¹ per mRNA, stable protein in cells dividing every 60 min), compute the protein Fano factor and coefficient of variation. If the same mean were achieved with ten times more transcription and ten times less translation, what would they be?
::: solution
$\gamma_m = 0.231$ and $\gamma_p = 0.0116$ min⁻¹. The Fano factor is $1 + 10/(0.231 + 0.0116) = 1 + 41.2 = 42.2$, and $\langle p\rangle = 1{,}870$, so $\eta_p^2 = 42.2/1870 = 0.0226$ and $\eta_p = 0.15$. A Poisson distribution with the same mean would have $\eta = 1/\sqrt{1870} = 0.023$: bursting raises the noise about sixfold. With $k_m = 5$ and $k_p = 1$, the mean is unchanged but the Fano factor is $1 + 1/0.243 = 5.1$, giving $\eta_p^2 = 5.1/1870 = 0.0027$ and $\eta_p = 0.052$, three times quieter. The quieter strategy costs more: each protein requires ten times as many transcription events and mRNAs.
:::
:::

::: widget distribution
dist: gamma
params: alpha=4, theta=5
caption: The gamma distribution as an approximation to the protein copy number per cell in the bursty regime. The shape $\alpha$ is the number of bursts per protein lifetime ($k_m/\gamma_p$) and the scale $\theta$ the mean burst size $b$, so the mean is $\alpha\theta$ (here 20) and the variance $\alpha\theta^2$, a Fano factor equal to $\theta$. Keeping the mean fixed, compare few large bursts (small $\alpha$, large $\theta$: a skewed distribution with many cells near zero) with many small ones (large $\alpha$: a narrow, nearly symmetric distribution).
:::

### Promoter switching and transcriptional bursts

Transcription, too, is often bursty. Promoters switch between inactive and active states — as chromatin is remodelled, as transcription factors bind and unbind, or as DNA supercoiling builds up — and many mRNAs are made during each active period. The simplest model, the **telegraph model**, has the promoter switch on at rate $k_\mathrm{on}$ and off at rate $k_\mathrm{off}$, transcribing at rate $k_m$ only while on. When the off periods are long and the on periods short, mRNA is made in bursts with a mean of $k_m/k_\mathrm{off}$ transcripts, and the mRNA distribution is broader than Poisson. Ido Golding, Johan Paulsson, Scott Zawilski and Edward Cox observed such bursts directly in live *E. coli* in 2005 by tagging mRNA with a fluorescent RNA-binding protein, and Arjun Raj, Sanjay Tyagi and colleagues found pronounced transcriptional bursting in mammalian cells with smFISH (2006). In eukaryotes, bursting is the norm for most genes, and regulators often change expression by changing burst frequency rather than burst size.

## Intrinsic and extrinsic noise

Not all variability between cells comes from the random timing of reactions in the gene itself. Cells differ in size, in the stage of the cell cycle, in the numbers of RNA polymerases and ribosomes, in the concentrations of their transcription factors — differences that affect every gene in a cell in the same direction. These are **extrinsic** to the gene in question.

::: definition Intrinsic and extrinsic noise {#def-int-ext}
**Intrinsic noise** is the variability in a gene's expression that arises from the stochastic events of its own expression (promoter switching, transcription, translation, degradation), and would make two identical copies of the gene in the same cell differ. **Extrinsic noise** is the variability that arises from differences between cells in the shared factors that affect both copies equally. If a cell contains two identical, independently expressed reporters with expression levels $c$ and $y$ (of equal mean), the two components are estimated (Peter Swain, Michael Elowitz and Eric Siggia, 2002) as

$$
\eta_\mathrm{int}^2 = \frac{\langle(c - y)^2\rangle}{2\langle c\rangle\langle y\rangle}, \qquad \eta_\mathrm{ext}^2 = \frac{\langle cy\rangle - \langle c\rangle\langle y\rangle}{\langle c\rangle\langle y\rangle},
$$ {#eq-int-ext}

where averages are over cells, and the total noise is $\eta_\mathrm{tot}^2 = \eta_\mathrm{int}^2 + \eta_\mathrm{ext}^2$.
:::

The logic is that extrinsic factors move both reporters together and so appear as a **covariance** between them, while intrinsic noise makes them differ and so appears in the **difference**. Plotted against each other, cells scatter along the diagonal (extrinsic) and across it (intrinsic).

::: example Decomposing noise {#ex-decompose}
In a two-reporter experiment, the cyan and yellow reporters each have mean 100 (arbitrary fluorescence units). Over many cells, $\langle(c - y)^2\rangle = 200$ and the covariance $\langle cy\rangle - \langle c\rangle\langle y\rangle = 300$. Find the intrinsic, extrinsic and total noise.
::: solution
$\eta_\mathrm{int}^2 = 200/(2\times100\times100) = 0.01$, so $\eta_\mathrm{int} = 0.10$. $\eta_\mathrm{ext}^2 = 300/10^4 = 0.03$, so $\eta_\mathrm{ext} = 0.17$. The total is $\eta_\mathrm{tot}^2 = 0.04$, $\eta_\mathrm{tot} = 0.20$: a 20 % cell-to-cell variation, three-quarters of whose variance is extrinsic. Reducing the noise of this gene would require reducing variability in the shared cellular environment, not changing the gene's own promoter or ribosome-binding site.
:::
:::

Michael Elowitz, Arnold Levine, Eric Siggia and Peter Swain did exactly this experiment in *E. coli* in 2002, with cyan and yellow fluorescent protein genes under identical promoters placed at equivalent positions on the chromosome. Both kinds of noise were substantial; intrinsic noise fell as expression increased, as [[#prop-poisson]] would suggest, while extrinsic noise was largest at intermediate expression. Genome-wide surveys in budding yeast (Bar-Even and colleagues, and Newman and colleagues, both 2006) and in *E. coli* (Yuichi Taniguchi, Paul Choi, Sunney Xie and colleagues, 2010, who quantified about a thousand proteins — and, for many, their mRNAs — with single-molecule sensitivity in single cells) found that noise falls as $1/\langle p\rangle$ for weakly expressed proteins but levels off at a **noise floor**, $\eta^2$ of roughly 0.1 in *E. coli*, for abundant ones — the extrinsic contribution, which no amount of expression can average away.

::: warning "The average describes a typical cell"
A population average can describe no cell at all. If a gene is bistable, half the cells may be fully on and half fully off, and the average — "half on" — describes nobody. Even without bistability, a skewed bursty distribution has a mean well above its most common value. Measurements on pooled cells (a western blot, bulk RNA sequencing) cannot distinguish a uniform population at an intermediate level from a mixture of high and low cells, which is why single-cell measurements — flow cytometry, time-lapse microscopy, smFISH and single-cell sequencing — transformed the field.
:::

::: quiz
Two genes have the same mean protein level. Gene A has a strong promoter and a weak ribosome-binding site; gene B a weak promoter and a strong ribosome-binding site. Their mRNA and protein lifetimes are equal. Which has the noisier protein level, and why?
- [ ] Gene A, because its promoter is more active
- [x] Gene B, because its proteins are made in larger bursts from fewer mRNAs
- [ ] They are equally noisy because they have the same mean
- [ ] Gene A, because more mRNA molecules mean more random events
::: solution
By [[#eq-fano]], the Fano factor is about $1 + b$ where $b$ is the burst size (proteins per mRNA). Gene B makes many proteins from each of its few mRNAs, so its protein level jumps in large, rare steps; gene A makes the same number of proteins from many mRNAs, each contributing a few, which averages out. More random events with smaller effects mean less relative noise.
:::
:::

## Consequences of noise

### Noise as a problem: precision and its cost

Noise limits how precisely a cell can set the level of a protein, and precision is costly: [[#ex-burst]] showed that reducing protein noise threefold at constant mean costs ten times as many mRNAs. Cells reduce noise where it matters. Essential genes and genes encoding subunits of complexes tend to have lower noise than genes involved in stress responses (Hunter Fraser and colleagues in 2004, and the yeast surveys of 2006), and **negative autoregulation** suppresses fluctuations, as Attila Becskei and Luis Serrano showed with a synthetic circuit in *E. coli* in 2000: the feedback that speeds responses ([[systems-biology/gene-expression-dynamics#prop-nar-speed]]) also pulls a fluctuating level back towards its set point. There are, however, fundamental limits. Ioannis Lestas, Glenn Vinnicombe and Johan Paulsson showed in 2010 that the noise of a molecule cannot be reduced below a bound set by the number of signalling events that report on it, however clever the feedback: suppressing noise requires making and destroying molecules.

### Noise as a resource: bet hedging and fate decisions

In an unpredictable environment, a population in which all cells behave identically risks being wiped out by a single catastrophe. Diversity among genetically identical cells, generated by noise, is a strategy of **bet hedging**. The best-studied case is **bacterial persistence**: in any culture of *E. coli* a small fraction of cells is dormant or slow-growing, and these persister cells survive antibiotic treatments that kill their growing siblings, then resume growth when the antibiotic is gone. Nathalie Balaban, Stanislas Leibler and colleagues showed in 2004 by tracking single cells in microfluidic devices that persisters exist before the antibiotic is applied, switching stochastically into and out of the slow-growing state. Persistence is a phenotypic, not genetic, form of tolerance, and it is a concern in the treatment of chronic infections (see [[microbiology/antimicrobials]]).

Noise also drives cell-fate decisions. In *Bacillus subtilis*, a small and variable fraction of cells in a stationary-phase population enters the state of **competence**, in which it can take up DNA from the environment; Gürol Süel, Michael Elowitz and colleagues (2006) and Hédia Maamar, Arjun Raj and David Dubnau (2007) showed that the decision is triggered by fluctuations in the expression of the master regulator ComK, amplified by positive autoregulation into a transient excursion into competence. In developing animals, noisy expression combined with bistable switches can produce random but well-proportioned mixtures of cell types — for example the stochastic choice of colour-detecting photoreceptor subtypes in the *Drosophila* eye, controlled by the stochastic expression of the transcription factor Spineless.

::: intuition Noise plus a switch equals a lottery
A bistable switch ([[systems-biology/switches-oscillators]]) on its own makes a deterministic decision: its fate depends on where it starts. Add noise and it becomes a lottery: a cell near the threshold may be kicked either way, and the probability of each outcome depends on how close to the threshold the cell sits and on how large the fluctuations are. By tuning those two quantities — for instance, by changing the strength of positive feedback or the burst size of the regulator — evolution can set the *odds* of a decision, producing a fixed proportion of each cell type without any cell knowing what the others are doing.
:::

::: application Noise and treatment
Cell-to-cell variability is now recognised as a cause of incomplete responses to treatment. Persister bacteria survive antibiotic courses; in cancer cell lines, a fraction of cells enters a transient, drug-tolerant state through fluctuations in gene expression rather than mutation (Sydney Shaffer, Arjun Raj and colleagues described rare cells with high expression of resistance markers in melanoma cell lines in 2017). In HIV, stochastic fluctuations in the viral Tat positive-feedback loop help determine whether an infected cell enters a latent state, which is one reason the viral reservoir is hard to eliminate (Leor Weinberger, David Schaffer and colleagues, 2005). These are research findings about mechanisms; their clinical implications are the subject of Medicine Atlas.
:::

::: history
The randomness of chemical reactions at small numbers was discussed by Max Delbrück in 1940, who analysed autocatalytic reactions with few molecules. Donald McQuarrie reviewed the stochastic theory of chemical kinetics in 1967, and Daniel Gillespie published his exact simulation algorithm in 1976–1977, initially for chemistry. In biology, Harley McAdams and Adam Arkin argued in 1997 that stochastic gene expression could explain the variable outcome of the decision between lysis and lysogeny in phage λ — and Arkin, John Ross and McAdams simulated that decision stochastically in 1998. The experimental field was established between 2000 and 2006 with fluorescent reporters in single cells: Becskei and Serrano (2000) on noise reduction by negative feedback, Ozbudak and colleagues (2002) on translational bursting, Elowitz and colleagues (2002) on intrinsic and extrinsic noise, Golding and colleagues (2005) on transcriptional bursts, and the real-time observation of single protein molecules being made by the Xie group (2006).
:::

::: summary
- At low copy numbers, reactions are random events; the chemical master equation ([[#def-cme]]) describes the probability of each molecular state, with propensities replacing mass-action rates.
- The birth–death process has a Poisson stationary distribution: Fano factor 1 and $\eta^2 = 1/\langle n\rangle$.
- The Gillespie algorithm samples exact trajectories: exponential waiting time with rate $a_0 = \sum a_j$, then reaction $j$ with probability $a_j/a_0$.
- Translation of short-lived mRNAs makes proteins in bursts; the protein Fano factor is $1 + k_p/(\gamma_m + \gamma_p) \approx 1 + b$, and the distribution is approximately gamma. Promoter switching adds transcriptional bursts.
- Two-reporter experiments separate intrinsic noise (the difference between identical reporters) from extrinsic noise (their covariance); abundant proteins reach an extrinsic noise floor.
- Noise is reduced by negative feedback at a cost, exploited for bet hedging (persisters) and fate decisions (competence), and averages can describe no actual cell.
:::

## Exercises

::: exercise Poisson noise {level=1 check="0.05"}
A protein has Poisson-distributed copy number with mean 400. What is its coefficient of variation?
::: solution
$\eta = 1/\sqrt{400} = 0.05$.
:::
:::

::: exercise A waiting time {level=1 check="0.2"}
In a Gillespie simulation, the total propensity in the current state is 5 s⁻¹. What is the mean waiting time to the next event, in seconds?
::: solution
$1/a_0 = 1/5 = 0.2$ s.
:::
:::

::: exercise Fano factor of a bursty protein {level=1 check="21"}
Each mRNA of a gene is translated on average 20 times before it is degraded, and mRNA is much less stable than protein. What is the protein Fano factor?
::: solution
$1 + b = 1 + 20 = 21$.
:::
:::

::: exercise Probability of none {level=2}
An mRNA is Poisson-distributed. In what fraction of cells is it absent if the mean is 0.5? If smFISH shows it absent in 40 % of cells while the mean is 1.5, what does that suggest?
::: solution
$P_0 = e^{-0.5} = 0.61$. For a mean of 1.5, a Poisson distribution would give $P_0 = e^{-1.5} = 0.22$. Observing 40 % of cells with no mRNA means more cells at zero, and therefore more at high numbers, than Poisson allows: the distribution is overdispersed (Fano factor > 1), as expected if the gene is transcribed in bursts by a promoter that is off much of the time.
:::
:::

::: exercise Intrinsic and extrinsic noise {level=2}
In a two-reporter experiment with mean levels 500 for both reporters, $\eta_\mathrm{tot} = 0.3$ and $\eta_\mathrm{int} = 0.1$. Find $\eta_\mathrm{ext}$, the covariance of the two reporters, and $\langle(c - y)^2\rangle$.
::: solution
$\eta_\mathrm{ext}^2 = 0.09 - 0.01 = 0.08$, so $\eta_\mathrm{ext} = 0.28$. The covariance is $\eta_\mathrm{ext}^2\langle c\rangle\langle y\rangle = 0.08\times250{,}000 = 20{,}000$, and $\langle(c - y)^2\rangle = 2\eta_\mathrm{int}^2\langle c\rangle\langle y\rangle = 2\times0.01\times250{,}000 = 5{,}000$.
:::
:::

::: exercise A Gillespie step by hand {level=2}
A system has two reactions, $\emptyset \to X$ with propensity 4 s⁻¹ and $X \to \emptyset$ with propensity $2n$ s⁻¹, and currently $n = 3$. The random numbers drawn are $r_1 = 0.5$ and $r_2 = 0.3$. Using [[#alg-gillespie]], find the time to the next event and which reaction fires. What is the new state?
::: solution
$a_1 = 4$, $a_2 = 6$, $a_0 = 10$ s⁻¹. $\tau = \ln(1/0.5)/10 = 0.0693$ s. $r_2a_0 = 3$; the first cumulative sum $a_1 = 4$ already exceeds 3, so reaction 1 (synthesis) fires and $n$ becomes 4.
:::
:::

::: exercise Noise from cell division {level=2}
At division, each of $n$ protein molecules is assigned independently with probability 1/2 to one daughter. What are the mean and variance of the number inherited by a daughter? Explain why partitioning at division is a source of noise even if synthesis were perfectly regular.
::: solution
The number inherited is binomial with parameters $n$ and $1/2$: mean $n/2$, variance $n/4$. Even if the mother cell had exactly $n$ molecules, the daughters would differ, with coefficient of variation $\sqrt{n/4}/(n/2) = 1/\sqrt n$ — the same order as Poisson noise. Partitioning errors therefore contribute to cell-to-cell variability, and can mimic the effects of noisy expression (a point emphasised by Dennis Huh and Johan Paulsson in 2011). Active partitioning mechanisms, as for plasmids and chromosomes, reduce this noise.
:::
:::

::: exercise Mean versus deterministic prediction {level=3}
For a dimerisation reaction $2X \to X_2$ with propensity $c\,n(n - 1)/2$, explain why the average of a stochastic simulation does not follow the deterministic mass-action equation exactly, and in which direction the difference goes.
::: solution
The mean rate of the reaction is $\langle c\,n(n-1)/2\rangle = (c/2)(\langle n^2\rangle - \langle n\rangle) = (c/2)(\langle n\rangle^2 + \sigma^2 - \langle n\rangle)$, which depends on the variance as well as the mean. The deterministic equation uses $(c/2)\langle n\rangle^2$ (for large numbers). If the distribution is close to Poisson, $\sigma^2 \approx \langle n\rangle$ and the correction nearly cancels, but in general the mean equation does not close: it couples to the variance, which couples to higher moments. When fluctuations are super-Poissonian ($\sigma^2 > \langle n\rangle$), the mean reaction rate is higher than the deterministic prediction at the same mean, and conversely. For linear propensities this problem does not arise, which is why [[#prop-poisson]] and [[#prop-two-stage-noise]] are exact.
:::
:::

::: exercise Interpreting a noise survey {level=3}
A genome-wide study plots $\eta^2$ against mean protein abundance $\langle p\rangle$ for 1,000 proteins on log–log axes. At low abundance the points fall on a line of slope $-1$ lying a factor of 10 above the line $\eta^2 = 1/\langle p\rangle$; at high abundance $\eta^2$ levels off at 0.1. (a) What does the slope $-1$ indicate? (b) What does the factor of 10 indicate? (c) What does the plateau indicate, and at what abundance does the transition occur?
::: solution
(a) $\eta^2 \propto 1/\langle p\rangle$ is the scaling of intrinsic noise from a birth–death or bursty process: a Fano factor that is roughly constant across genes. (b) $\eta^2 = 10/\langle p\rangle$ means a Fano factor of about 10, as expected for bursty translation with typical burst size $b \approx 9$ (or for transcriptional bursting). (c) The plateau is extrinsic noise, shared by all genes and independent of their abundance. The transition occurs where $10/\langle p\rangle = 0.1$, at $\langle p\rangle = 100$ molecules per cell; above this, the gene's own randomness is negligible compared with differences between cells. This is the pattern reported for *E. coli* by Taniguchi and colleagues in 2010.
:::
:::
