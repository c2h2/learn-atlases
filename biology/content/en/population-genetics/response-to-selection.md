In 1896 Cyril Hopkins at the Illinois Agricultural Experiment Station took 163 ears of an open-pollinated maize variety, measured the oil and protein content of their kernels, and began selecting: in each generation the ears with the highest oil were planted to found the next generation of a "high oil" line, and those with the lowest oil a "low oil" line, with parallel lines for protein. The experiment has continued for well over a century. After 100 generations the high-oil line had about 22 % oil, against roughly 5 % in the original population, and the low-oil line had fallen to around 1 % (John Dudley and Robert Lambert, 2004) — changes of many times the original standard deviation, with the high line still responding. Selection on a quantitative trait can move a population far beyond the range of variation it started with.

How fast, and for how long? The breeder's equation $R = h^2S$, met in [[evolution/natural-selection]], predicts the response in one generation from the heritability of [[population-genetics/quantitative-traits]]. This chapter develops it into the working theory of selection on quantitative traits: the selection differential expressed through the intensity of selection, the response per year, the covariance between fitness and phenotype that defines selection in nature, selection gradients and the multivariate Lande equation with its correlated responses, realised heritability, and the limits to long-term response set by drift and mutation. It ends with a puzzle from wild populations: heritable traits under persistent selection that do not evolve.

## The breeder's equation

::: proposition The breeder's equation {#prop-breeder}
Let a trait have phenotypic variance $V_P$ and narrow-sense heritability $h^2$. If the parents chosen to breed have mean phenotype $S$ above the population mean (the **selection differential**), and the regression of offspring on mid-parent phenotype is linear, then the expected change in the mean of the next generation, the **response** $R$, is

$$
R = h^2S.
$$ {#eq-breeder}
:::

::: proof
By [[population-genetics/quantitative-traits]], the regression of offspring phenotype on mid-parent phenotype has slope $h^2$: $\E[P_O \mid \bar P] = \mu + h^2(\bar P - \mu)$. If the selected parents mate at random among themselves, the mean of their mid-parent values deviates from $\mu$ by $S$; averaging the linear regression over the selected pairs gives an offspring mean of $\mu + h^2S$. Linearity is the key assumption: it holds exactly if breeding values and phenotypes are jointly normally distributed, which is a good approximation for highly polygenic traits (the "infinitesimal model"), and it fails for traits affected by a few loci of large effect or with strong non-additive effects, when the regression may be curved.
:::

The assumptions deserve listing, because each fails somewhere: the environment is the same in the two generations (or changes only the mean, which is controlled in experiments by an unselected control line); selection acts only through the phenotypes measured; there are no maternal effects; generations do not overlap; and $h^2$ refers to the population in which selection occurs. The equation predicts *one* generation of response; over many generations $h^2$ itself changes.

### Intensity of selection

The selection differential depends on how strongly the parents are selected and on how variable the trait is. In **truncation selection** — the common practice in breeding — every individual above a threshold is kept and every one below is discarded.

::: proposition Selection intensity under truncation {#prop-intensity}
If the trait is normally distributed with standard deviation $\sigma_P$ and the proportion $p$ with the highest values is selected, the selection differential is $S = i\sigma_P$, where the **intensity of selection** is

$$
i = \frac{\varphi(x)}{p},
$$ {#eq-intensity}

$x$ is the truncation point in standard-deviation units ($p = 1 - \Phi(x)$), and $\varphi$ and $\Phi$ are the standard normal density and distribution function. The response is then

$$
R = i\,h^2\sigma_P = i\,h\,\sigma_A.
$$ {#eq-response-i}
:::

::: proof
For a standard normal variable $Z$, the mean of the selected individuals is $\E[Z \mid Z > x] = \frac{1}{p}\int_x^\infty z\varphi(z)\,dz$. Since $\varphi'(z) = -z\varphi(z)$, the integral is $[-\varphi(z)]_x^\infty = \varphi(x)$. So the standardised selection differential is $\varphi(x)/p$, and in the trait's units $S = i\sigma_P$. Substituting into [[#eq-breeder]] gives $R = ih^2\sigma_P$; since $h^2\sigma_P = (\sigma_A^2/\sigma_P^2)\sigma_P = h\sigma_A$, the second form follows.
:::

Some values: selecting the top half gives $i = 0.80$; the top 20 %, $i = 1.40$; 10 %, $1.75$; 5 %, $2.06$; 1 %, $2.67$. The intensity increases only slowly as selection becomes more extreme, while the number of breeding individuals — and hence the effective population size — falls, a trade-off we return to.

::: widget plot
f: exp(-x^2/2)/sqrt(2*pi)/(0.5*(1 - erf(x/sqrt(2)))); 0.5*(1 - erf(x/sqrt(2)))
x: -2, 3
y: 0, 3.5
labels: i\ \text{(intensity)}; p\ \text{(proportion selected)}
vlines: 0.842
caption: Truncation selection on a normally distributed trait. The horizontal axis is the truncation point $x$ in standard deviations; the falling curve is the proportion selected $p = 1 - \Phi(x)$ and the rising curve the intensity $i = \varphi(x)/p$ from [[#eq-intensity]]. The marked line at $x = 0.842$ corresponds to keeping the top 20 %, with $i = 1.40$. Notice that for large $x$ the intensity grows almost linearly, $i \approx x + 1/x$, while $p$ collapses: halving the proportion selected from 2 % to 1 % raises $i$ only from 2.42 to 2.67.
:::

The response per generation is not the whole story for a breeder, who cares about change per year. If $L$ is the **generation interval** (the mean age of parents when their offspring are born), the annual response is

$$
\frac{R}{L} = \frac{i\,h^2\sigma_P}{L}.
$$ {#eq-annual}

When the two sexes are selected with different intensities, $i$ is replaced by the average $(i_m + i_f)/2$, and $L$ by the average generation interval of the two sexes — each sex contributes half the genes of the next generation.

::: example Selecting broiler chickens {#ex-broiler}
In a broiler line, body weight at six weeks has standard deviation 100 g and heritability 0.4. (a) If the heaviest 20 % of both sexes are kept as parents, what is the expected response per generation? (b) If only males are selected (top 20 %) and females are used at random, what is it? (c) If the generation interval is 1 year, and could be reduced to 0.75 years by breeding earlier at the cost of selecting the top 30 % instead of 20 % of males (females still random), which scheme gives more gain per year?
::: solution
(a) $R = 1.40\times0.4\times100 = 56$ g per generation.

(b) $i = (1.40 + 0)/2 = 0.70$, so $R = 0.70\times0.4\times100 = 28$ g.

(c) Scheme (b): $28$ g per year. Earlier breeding: for $p = 0.3$, the truncation point is $x = 0.524$ with $\varphi(x) = 0.348$, so $i_m = 0.348/0.3 = 1.16$ and $i = 0.58$. Then $R = 0.58\times0.4\times100 = 23.2$ g per generation, or $23.2/0.75 = 31$ g per year. Shortening the generation interval wins despite the weaker selection. This kind of calculation drives the design of every modern breeding programme, and explains why genomic prediction, which allows selection of very young animals, has accelerated genetic gain ([[population-genetics/quantitative-traits]]).
:::
:::

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: 0.842
b: 4
caption: Truncation selection seen on the phenotype distribution: the shaded upper 20 % of a standard normal trait are kept as parents. Their mean is $i = 1.40$ standard deviations above the population mean — the selection differential in standard units. Move the threshold $a$ to change the proportion selected and read off the shaded area; the mean of the shaded part is $\varphi(a)/(\text{shaded area})$.
:::

## Selection as a covariance

In nature nobody truncates. Individuals differ continuously in survival and reproduction, and selection is described by the relation between fitness and phenotype. Let $w$ be **relative fitness** (absolute fitness divided by its mean, so $\bar w = 1$). The mean phenotype after selection, weighting each individual by its fitness, is $\E[wz]$, so the selection differential is

$$
S = \E[wz] - \E[z] = \Cov(w, z),
$$ {#eq-robertson-price}

since $\E[w] = 1$. This simple identity (Alan Robertson, 1966; George Price, 1970) says that the selection differential *is* the covariance between relative fitness and the trait. Price generalised it to an exact equation for the change in the mean of any trait across a generation, $\Delta\bar z = \Cov(w, z) + \E[w\,\Delta z]$, where the second term collects changes in the trait between parents and offspring (transmission). With fitness defined over a whole generation, the first term is selection and the second is everything else.

The response follows from applying the same identity to breeding values: $R = \Cov(w, A)$, the covariance of fitness with the additive genetic value of the trait (the **secondary theorem of selection**, Robertson 1966). If fitness depends on the trait only through the phenotype and breeding values regress linearly on phenotype, $\Cov(w, A) = h^2\Cov(w, z) = h^2S$, recovering the breeder's equation. But if an unmeasured environmental factor affects both the trait and fitness — well-fed individuals are both larger and more fertile — then $S$ can be large while $\Cov(w, A)$ is zero, and the breeder's equation over-predicts the response. This is one of the main explanations of the stasis puzzle discussed below.

### Selection gradients

The selection differential mixes the strength of selection with the variance of the trait. The **selection gradient** removes the variance:

$$
\beta = \frac{S}{V_P} = \frac{\Cov(w, z)}{\Var(z)},
$$ {#eq-gradient}

the slope of the regression of relative fitness on the trait. With it, $R = h^2S = V_A\beta$.

With several correlated traits, the differential on one trait includes indirect selection through its correlations with the others. Russell Lande and Stevan Arnold (1983) showed how to separate them: regress relative fitness on all the measured traits at once,

$$
w = \alpha + \sum_j\beta_jz_j + \tfrac12\sum_{j,k}\gamma_{jk}z_jz_k + \varepsilon,
$$ {#eq-lande-arnold}

where the linear coefficients $\boldsymbol\beta$ measure **directional selection** acting directly on each trait, and the quadratic coefficients $\gamma$ measure curvature: $\gamma_{jj} < 0$ indicates stabilising selection, $\gamma_{jj} > 0$ disruptive selection, and $\gamma_{jk}$ for $j \neq k$ correlational selection favouring particular combinations. In vector form, the vector of selection differentials is $\mathbf S = \mathbf P\boldsymbol\beta$, where $\mathbf P$ is the phenotypic variance–covariance matrix. Joel Kingsolver and colleagues (2001) compiled thousands of estimates from wild populations: directional gradients standardised to $\beta\sigma_P$ were typically about 0.15–0.2 in magnitude, with a long tail of stronger values, and stabilising selection was less common and weaker than often assumed.

## Multivariate response and correlated traits

Traits are genetically correlated when the same alleles affect both (**pleiotropy**) or when alleles affecting them are in linkage disequilibrium ([[population-genetics/linkage-disequilibrium]]). Selection on one trait then changes the others.

::: proposition The Lande equation {#prop-lande}
For a vector of traits with phenotypic covariance matrix $\mathbf P$ and additive genetic covariance matrix $\mathbf G$, under the same assumptions as the breeder's equation, the response of the vector of means to one generation of selection is

$$
\Delta\bar{\mathbf z} = \mathbf G\mathbf P^{-1}\mathbf S = \mathbf G\boldsymbol\beta.
$$ {#eq-lande}

(Russell Lande, 1979.) With one trait this reduces to $R = V_A\beta = h^2S$.
:::

::: proof
Under multivariate normality, the regression of the vector of offspring breeding values (and hence offspring phenotypes, since environmental deviations average zero) on the vector of parental phenotypes is linear, with coefficient matrix $\mathbf G\mathbf P^{-1}$ for mid-parents: the covariance of mid-parent phenotypes with offspring is $\tfrac12\mathbf G$, and the variance of mid-parent phenotypes is $\tfrac12\mathbf P$, so the multivariate regression matrix is $\tfrac12\mathbf G(\tfrac12\mathbf P)^{-1} = \mathbf G\mathbf P^{-1}$. Applying it to the mean deviation of the selected parents, $\mathbf S$, gives [[#eq-lande]]; and $\mathbf P^{-1}\mathbf S = \boldsymbol\beta$ by the definition of the multivariate gradient.
:::

For two traits $x$ and $y$, with selection on $x$ alone (by truncation, intensity $i$), the **correlated response** of $y$ is

$$
\mathrm{CR}_y = i\,h_xh_y\,r_A\,\sigma_{P_y},
$$ {#eq-correlated}

where $r_A$ is the additive genetic correlation between the traits and $h_x$, $h_y$ are the square roots of their heritabilities (Falconer's form). It can be favourable or not: selection for rapid growth in broilers has been accompanied by correlated changes in leg and cardiovascular health and in reproduction, and selection for milk yield in dairy cattle by declines in fertility, both through unfavourable genetic correlations.

::: example Selection on one trait moves another {#ex-lande}
Two standardised traits have phenotypic variances 1 and phenotypic covariance 0.5; their additive genetic variances are 0.5 and 0.4 and genetic covariance 0.3. Selection produces differentials $\mathbf S = (0.6, 0)$: the selected individuals are above average for trait 1 but exactly average for trait 2. Predict the response of both traits.
::: solution
$\mathbf P = \begin{pmatrix}1 & 0.5\\ 0.5 & 1\end{pmatrix}$, $\mathbf P^{-1} = \frac{1}{0.75}\begin{pmatrix}1 & -0.5\\ -0.5 & 1\end{pmatrix}$, so

$$
\boldsymbol\beta = \mathbf P^{-1}\mathbf S = \begin{pmatrix}0.8\\ -0.4\end{pmatrix},\qquad \Delta\bar{\mathbf z} = \mathbf G\boldsymbol\beta = \begin{pmatrix}0.5 & 0.3\\ 0.3 & 0.4\end{pmatrix}\begin{pmatrix}0.8\\ -0.4\end{pmatrix} = \begin{pmatrix}0.28\\ 0.08\end{pmatrix}.
$$

Although the selected individuals had no differential on trait 2, it responds by $+0.08$, and trait 1 responds by 0.28 instead of the univariate prediction $h^2S = 0.5\times0.6 = 0.30$. The gradient reveals what happened: selection favoured trait 1 directly ($\beta_1 = 0.8$) and *disfavoured* trait 2 directly ($\beta_2 = -0.4$); the zero differential on trait 2 arose because direct selection against it cancelled the indirect selection through its phenotypic correlation with trait 1. Genetic and phenotypic correlations differ, so the genetic response does not cancel. Measuring selection on one trait at a time can mislead.
:::
:::

```python
from statistics import NormalDist

def intensity(p):
    """Selection intensity for truncation selection of the top fraction p of a normal trait."""
    x = NormalDist().inv_cdf(1 - p)        # truncation point in SD units
    return NormalDist().pdf(x) / p

for p in (0.5, 0.2, 0.1, 0.05, 0.01):
    print(p, round(intensity(p), 3))      # 0.798, 1.4, 1.755, 2.063, 2.665

# Lande equation for two traits (example above): dz = G P^-1 S
P = [[1.0, 0.5], [0.5, 1.0]]
G = [[0.5, 0.3], [0.3, 0.4]]
S = [0.6, 0.0]
det = P[0][0] * P[1][1] - P[0][1] * P[1][0]
Pinv = [[P[1][1] / det, -P[0][1] / det], [-P[1][0] / det, P[0][0] / det]]
beta = [sum(Pinv[r][c] * S[c] for c in range(2)) for r in range(2)]
dz = [sum(G[r][c] * beta[c] for c in range(2)) for r in range(2)]
print([round(b, 3) for b in beta], [round(d, 3) for d in dz])   # [0.8, -0.4] [0.28, 0.08]
```

::: example A correlated response {#ex-correlated}
A breeder selects pigs for growth rate, keeping the top 20 % ($i = 1.40$). Growth has $h^2 = 0.4$; backfat thickness has $h^2 = 0.25$ and phenotypic standard deviation 10 mm, and the genetic correlation between growth and backfat is $-0.5$. What is the expected correlated response in backfat per generation?
::: solution
By [[#eq-correlated]], $\mathrm{CR} = 1.40\times\sqrt{0.4}\times\sqrt{0.25}\times(-0.5)\times10 = 1.40\times0.632\times0.5\times(-0.5)\times10 = -2.2$ mm per generation. Here the correlated response is favourable (leaner pigs). The same equation shows when **indirect selection** on a correlated trait can beat direct selection: selecting on $y$ to improve $x$ gives response $i\,h_xh_yr_A\sigma_{P_x}$, compared with $i\,h_x^2\sigma_{P_x}$ for direct selection, so it is better if $h_yr_A > h_x$ — for example when $x$ is hard to measure or expressed only in one sex.
:::
:::

## Response in experiments: realised heritability

In a selection experiment, the cumulative response is plotted against the cumulative selection differential, generation by generation. If the breeder's equation holds with constant heritability, the points lie on a straight line through the origin with slope $h^2$: the **realised heritability**. A parallel unselected control line, or divergent selection in both directions, removes environmental trends.

::: example Realised heritability {#ex-realised}
In a mouse line selected for high litter weight, the cumulative selection differentials over five generations were 2.0, 4.1, 6.0, 8.2 and 10.1 g, and the cumulative responses (relative to an unselected control) were 0.7, 1.2, 2.0, 2.6 and 3.1 g. Estimate the realised heritability.
::: solution
The slope of cumulative response on cumulative differential, fitted through the origin, is $\sum S_tR_t/\sum S_t^2 = 70.95/226.06 = 0.31$; an ordinary regression with intercept gives 0.31 as well. The realised heritability is about 0.3. Comparison with an estimate from relatives in the base population tests the model; realised values are often lower in later generations as heritability declines, and the response to selection in the two directions is often **asymmetric**, for reasons that include inbreeding depression, genes of large effect, and natural selection opposing the artificial selection in one direction.
:::
:::

## The long-term response

How long can selection continue to change a trait? In the infinitesimal model, the genetic variance is only slightly reduced by selection in each generation (the **Bulmer effect**: selection creates negative LD among the loci affecting the trait, reducing $V_A$ by a modest amount that recombination partly restores; Michael Bulmer, 1971), and response could continue indefinitely. With a finite number of loci and a finite population, two processes limit it: favoured alleles become fixed, and drift fixes or loses alleles at random.

::: proposition Robertson's limit {#prop-robertson}
For alleles of small additive effect, the total response to selection that can be obtained from the variation initially present in a population of effective size $N_e$ is approximately

$$
R_\infty \approx 2N_e\,R_1,
$$ {#eq-robertson}

where $R_1$ is the response in the first generation (Alan Robertson, 1960). The response decays roughly as $R_t \approx R_1(1 - 1/2N_e)^t$, with a half-life of about $1.4N_e$ generations.
:::

::: proof Heuristic argument
For a locus whose favoured allele has a small selective advantage, the response contributed in each generation is proportional to its additive variance, $2pq\alpha^2$, which drift reduces by the factor $1 - 1/2N_e$ per generation ([[population-genetics/genetic-drift]]), while weak selection changes $p$ only slightly. The total response is then the geometric sum $R_1\sum_t(1 - 1/2N_e)^t = 2N_eR_1$. For alleles of larger effect ($N_es$ large) selection, not drift, determines their fate, and the limit is reached when they are fixed; the ratio of the limit to the initial response then lies between $2N_e$ and the much smaller value set by fixation of favoured alleles.
:::

::: widget plot
f: R1*2*Ne*(1 - (1 - 1/(2*Ne))^x); R1*x
x: 0, 100
y: 0, 30
sliders: R1=0.5:0.1:2:0.1; Ne=20:5:200:5
labels: \text{cumulative response (Robertson)}; \text{constant response}
caption: Cumulative response to selection under Robertson's model (curve), in which the response per generation decays as drift erodes the additive variance, against a constant response of $R_1$ per generation (straight line). The curve approaches the limit $2N_eR_1$ (by default 20 units for $N_e = 20$, $R_1 = 0.5$). Increase $N_e$ and the curve stays close to the straight line for longer and reaches a higher plateau: larger breeding populations sustain longer responses. Real long-term experiments often exceed the predicted limit, because new mutations add variance.
:::

The practical lesson is that very intense selection, which uses few parents, gains quickly but plateaus early; moderate selection with a larger $N_e$ gains more in the long run. Robertson showed that the optimum, for maximising the eventual limit, is to select about half the population when only standing variation is used.

**New mutations** keep long-term response going. The input of new additive variance by mutation per generation, $V_M$, is typically about $10^{-3}$ times the environmental variance $V_E$ for a wide range of traits and organisms (the **mutational heritability**, reviewed by Michael Lynch, 1988). In a population of effective size $N_e$, the equilibrium additive variance maintained by mutation and drift alone is about $2N_eV_M$, so a population with $N_e$ of a few hundred can sustain heritabilities of tens of per cent indefinitely. This is consistent with continuing responses over 100 generations in the Illinois maize lines and in long-term selection on *Drosophila* bristle number and mouse body weight.

## Selection and evolution in nature

The breeder's equation was born in agriculture, but it is the standard model for predicting evolution in the wild. Its predictions have been tested in long-term field studies with pedigrees, and they often fail in a characteristic way.

**The paradox of stasis.** Many traits in wild populations are heritable and under consistent directional selection — larger body size is often associated with higher survival and fecundity — yet their means do not change over decades, or even change in the opposite direction. Juha Merilä, Ben Sheldon and Loeske Kruuk (2001) reviewed such cases, including body size in collared flycatchers and red deer. Explanations include the following.

- **Environmental covariance between trait and fitness.** As in the discussion of $\Cov(w, A)$ above, good conditions can make individuals both bigger and fitter without any genetic link between size and fitness. Selection gradients estimated on breeding values (using animal models and pedigrees) rather than phenotypes are often much weaker.
- **Changing environments.** The response may be masked by environmental changes in the opposite direction — for example, deteriorating food supply reducing body size phenotypically while genetic values increase.
- **Selection on correlated traits.** Unmeasured traits genetically correlated with the focal trait can be under opposing selection (the logic of [[#ex-lande]]).
- **Fluctuating selection.** Selection measured over a few years may reverse in others, as on beak size in Darwin's finches ([[evolution/natural-selection]]).

**Rates of evolution.** Phenotypic change is measured in **haldanes**, standard deviations per generation (Philip Gingerich, 1993). Changes observed over a few generations in contemporary populations can be fractions of a haldane; rates measured over thousands or millions of years in the fossil record are many orders of magnitude slower, not because evolution has slowed, but because long-term change averages over fluctuations in direction ([[evolution/macroevolution]]).

::: warning "Selection on a trait means the trait will evolve"
Selection is a phenotypic process within a generation; evolution is a genetic change across generations. A trait under strong selection does not evolve if it has no additive genetic variance, if its covariance with fitness is environmental rather than genetic, or if selection on genetically correlated traits pulls the other way. Conversely, a trait under no direct selection can evolve as a correlated response. The breeder's and Lande equations make these distinctions explicit: only $\mathbf G\boldsymbol\beta$ — genetic variation times direct selection, summed over all correlated traits — is evolution.
:::

::: quiz
A population of birds shows a positive selection differential on wing length every year for 20 years, the heritability of wing length is 0.4, yet mean wing length does not change. Which explanation is *least* consistent with these data?
- [ ] Birds in good condition have both longer wings and higher survival, for non-genetic reasons.
- [ ] Wing length is genetically correlated with another trait that is under opposing selection.
- [ ] The environment has changed over the 20 years so that phenotypic wing length declined while breeding values increased.
- [x] The breeder's equation predicts no response when the selection differential is positive.
::: solution
The breeder's equation predicts a positive response, $R = 0.4S$, every year, which is why the observation is a paradox. The first three options are all documented explanations: environmental covariance between trait and fitness, correlated selection, and environmental change masking genetic change. Distinguishing them requires estimating selection on breeding values and tracking predicted breeding values over time.
:::
:::

::: application Breeding for multiple traits
Breeders rarely want to change one trait alone. They combine traits into a **selection index**, a weighted sum of phenotypes (or, now, of genomic predictions) chosen to maximise the response in an economic aggregate; the theory, developed by H. Fairfield Smith (1936) for plants and Lanoy Hazel (1943) for animals, is a direct application of [[#eq-lande]]. Including fertility, health and longevity in dairy-cattle indexes since the 2000s has halted and partly reversed the decline in fertility caused by selection for milk yield alone. The same multivariate thinking is used in conservation to anticipate whether populations can adapt fast enough to a changing climate, which depends on $\mathbf G$ and on the direction of selection relative to the genetic correlations among traits.
:::

::: history
Plant and animal breeders selected for millennia without theory. Galton's regression (1886) and Karl Pearson's correlation (1896) provided the statistics; Fisher's 1918 paper the genetic interpretation. Jay Lush's *Animal Breeding Plans* (1937) formulated the breeder's equation in essentially its modern form, and the intensity of selection and response per year were set out in the 1940s–1950s by Lush, Gordon Dickerson and others. Alan Robertson's work at Edinburgh gave the limits of selection (1960) and the secondary theorem (1966); George Price's covariance equation (1970) and Russell Lande's multivariate theory (1979), with Lande and Arnold's regression method (1983), carried the breeder's framework into evolutionary biology. The Illinois long-term selection experiment, begun in 1896, remains the longest-running selection experiment on a quantitative trait.
:::

::: summary
- The breeder's equation $R = h^2S$ follows from the linear regression of offspring on mid-parent with slope $h^2$; it requires linearity (well approximated for polygenic traits) and a constant environment ([[#prop-breeder]]).
- Under truncation selection $S = i\sigma_P$ with $i = \varphi(x)/p$: 0.80 for the top half, 1.40 for 20 %, 2.06 for 5 %; $R = ih^2\sigma_P = ih\sigma_A$; annual response $R/L$ ([[#prop-intensity]]).
- The selection differential is the covariance of relative fitness with the trait (Robertson–Price); the response is the covariance of fitness with breeding value, which is smaller when trait and fitness covary for environmental reasons.
- The selection gradient $\beta = S/V_P$ measures direct selection; Lande–Arnold regression separates directional ($\beta$) and quadratic ($\gamma$) selection on correlated traits.
- Multivariate response: $\Delta\bar{\mathbf z} = \mathbf G\boldsymbol\beta$ (Lande, [[#prop-lande]]); correlated response $\mathrm{CR}_y = ih_xh_yr_A\sigma_{P_y}$.
- Realised heritability is the slope of cumulative response on cumulative differential.
- Response from standing variation is limited to about $2N_eR_1$ (Robertson, [[#prop-robertson]]); new mutation ($V_M \approx 10^{-3}V_E$) sustains long-term response.
- In the wild, heritable traits under selection often fail to evolve as predicted (stasis), because of environmental covariance, correlated selection, fluctuating selection and changing environments.
:::

## Exercises

::: exercise A single generation {level=1 check="3"}
A trait has $h^2 = 0.3$. Selected parents average 10 units above the population mean. What response is expected?
::: solution
$R = 0.3\times10 = 3$ units.
:::
:::

::: exercise Intensity and response {level=1 check="14"}
The top 20 % of a population ($i = 1.40$) are selected for a trait with phenotypic standard deviation 20 units and heritability 0.5. What is the expected response?
::: solution
$R = 1.40\times0.5\times20 = 14$ units.
:::
:::

::: exercise A selection gradient {level=1 check="0.25"}
A selection differential of 2 mm is measured on a trait with phenotypic variance 8 mm². What is the selection gradient?
::: solution
$\beta = S/V_P = 2/8 = 0.25$ per mm (in units of relative fitness).
:::
:::

::: exercise Selecting one sex {level=2 check="0.38"}
In a sheep flock, the top 10 % of rams ($i = 1.755$) and the top 50 % of ewes ($i = 0.798$) are kept for breeding. What is the effective intensity of selection? If $h^2 = 0.25$ and $\sigma_P = 1.2$ kg for fleece weight, what is the expected response per generation (two decimal places)?
::: solution
$i = (1.755 + 0.798)/2 = 1.2765$, so $R = 1.2765\times0.25\times1.2 = 0.38$ kg per generation. Most of the gain comes from the rams: far fewer males than females are needed for breeding, so males can be selected much more intensely.
:::
:::

::: exercise Correlated response versus direct selection {level=2}
Trait $x$ (hard to measure) has $h_x^2 = 0.1$; trait $y$ (easy to measure) has $h_y^2 = 0.5$, and the genetic correlation between them is $r_A = 0.7$. With equal intensities of selection, is it better to select on $y$ to improve $x$? By what factor?
::: solution
Ratio of indirect to direct response: $\dfrac{ih_xh_yr_A\sigma_{P_x}}{ih_x^2\sigma_{P_x}} = \dfrac{h_yr_A}{h_x} = \dfrac{0.707\times0.7}{0.316} = 1.57$. Indirect selection on $y$ gives about 57 % more response in $x$ than direct selection on $x$.
:::
:::

::: exercise Robertson's limit {level=2 check="25"}
A selected line has $N_e = 25$ and a first-generation response of 0.5 units. What total response would be expected from standing variation alone, by Robertson's limit?
::: solution
$R_\infty \approx 2N_eR_1 = 50\times0.5 = 25$ units, approached with a half-life of about $1.4\times25 = 35$ generations.
:::
:::

::: exercise Interpreting a selection experiment {level=2}
Two replicate lines of *Drosophila* are selected for increased wing length for 30 generations with 20 pairs of parents each. Both respond steadily for about 15 generations and then plateau, at different levels. When the plateaued lines are crossed and selection resumed, the response starts again. Explain each observation.
::: solution
The early steady response uses standing additive variance. With $N_e$ of order 40 or less, drift erodes variance quickly ($1/2N_e \approx 1.25$ % per generation, and faster given variance in family size), and favoured alleles of moderate effect become fixed; the plateau is reached when little additive variance remains. The replicates plateau at different levels because drift fixed different sets of alleles in each — some favoured alleles were lost by chance. Crossing the lines brings together alleles fixed in one line but lost in the other, restoring additive variance, so response resumes. (Opposing natural selection, for example reduced fertility of long-winged flies, can also produce a plateau with variance remaining; relaxing selection would then show a regression of the mean.)
:::
:::

::: exercise Truncation intensity {level=3}
(a) Using [[#eq-intensity]], show that for large $x$ the intensity of truncation selection is approximately $x + 1/x$. (Hint: $1 - \Phi(x) \approx \varphi(x)(1/x - 1/x^3)$ for large $x$.) (b) Compare the approximation with the exact value 2.665 for the top 1 % ($x = 2.326$). (c) Explain why reducing the proportion selected from 1 % to 0.1 % raises the response by only about 25 % while reducing the number of parents tenfold.
::: solution
(a) $i = \varphi(x)/[1 - \Phi(x)] \approx 1/(1/x - 1/x^3) = x/(1 - 1/x^2) \approx x(1 + 1/x^2) = x + 1/x$.

(b) $2.326 + 1/2.326 = 2.756$, about 3 % above 2.665; the approximation improves for larger $x$.

(c) For $p = 0.001$, $x = 3.090$ and $i \approx 3.367$ (exact), against 2.665 for $p = 0.01$: a gain of 26 %. Meanwhile $N_e$ falls tenfold, increasing drift and inbreeding tenfold and, by Robertson's limit, reducing the long-term limit from standing variation tenfold. Extreme selection is a poor long-term strategy.
:::
:::

::: exercise Selection on correlated traits in the wild {level=3}
In a population of lizards, relative fitness (survival over a year) is regressed on standardised body size $z_1$ and standardised sprint speed $z_2$, which have a phenotypic correlation of 0.6. The selection differentials are $S_1 = 0.30$ and $S_2 = 0.18$. (a) Calculate the selection gradients. (b) Which trait is under direct selection? (c) If $\mathbf G = \begin{pmatrix}0.4 & 0.1\\ 0.1 & 0.3\end{pmatrix}$, predict the response of each trait.
::: solution
(a) $\mathbf P = \begin{pmatrix}1 & 0.6\\ 0.6 & 1\end{pmatrix}$, $\mathbf P^{-1} = \frac{1}{0.64}\begin{pmatrix}1 & -0.6\\ -0.6 & 1\end{pmatrix}$. $\beta_1 = (0.30 - 0.6\times0.18)/0.64 = 0.192/0.64 = 0.30$; $\beta_2 = (0.18 - 0.6\times0.30)/0.64 = 0/0.64 = 0$.

(b) Only body size is under direct selection; the positive differential on sprint speed is entirely indirect, through its correlation with size.

(c) $\Delta\bar{\mathbf z} = \mathbf G\boldsymbol\beta = (0.4\times0.30,\ 0.1\times0.30) = (0.12, 0.03)$ standard deviations. Sprint speed is predicted to evolve slightly, but only through its genetic correlation with size (0.1/√(0.4 × 0.3) ≈ 0.29), which is weaker than the phenotypic correlation — so the response is much less than its selection differential would suggest.
:::
:::
