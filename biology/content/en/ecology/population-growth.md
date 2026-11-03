In 1798 Thomas Malthus argued that a human population, left unchecked, increases geometrically — doubling, then doubling again — while the food to feed it cannot keep pace, so that growth must sooner or later be checked by famine, disease or "moral restraint". Charles Darwin read the *Essay on the Principle of Population* in 1838 and recognised in it the struggle for existence that drives natural selection. Malthus's argument has two halves, and they are the two halves of this chapter: every population has the capacity to grow exponentially, and no population can do so for long.

A **population** is a group of individuals of one species living in the same area at the same time and potentially interbreeding. Population ecology asks how and why its size changes. We begin by bookkeeping — births, deaths and migration — and with the **life table**, which records how survival and reproduction depend on age and combines them into a rate of increase. We then derive the exponential and logistic models of growth, ask what **density dependence** is and how it is detected, and see how time lags in regulation produce oscillations, cycles and even chaos. The life-history traits whose evolution was discussed in [[ecology/life-histories]] are the raw material: here we take them as given and ask what population dynamics they produce. Throughout, the mathematics is that of first-order difference and differential equations; see [first-order equations](/learn/maths/lesson.php?c=ode&l=first-order) in Maths Atlas if these are unfamiliar.

## The bookkeeping of populations

A population of size $N_t$ at time $t$ changes by four processes: births $B$, deaths $D$, immigration $I$ and emigration $E$. Over one time step,

$$
N_{t+1} = N_t + B - D + I - E .
$$ {#eq-bide}

In a **closed** population (no migration) only births and deaths matter. Dividing by $N_t$, the change per individual is the per-capita birth rate minus the per-capita death rate. Everything that follows is about how these per-capita rates depend on age, on time and on the density of the population itself.

## Life tables

Individuals of different ages do not have the same chances of dying or reproducing. A seedling oak is far more likely to die this year than a forty-year-old tree, and only the tree can produce acorns. To predict a population's growth we need these rates age by age.

::: definition Life table {#def-life-table}
A **life table** lists, for each age class $x$ (in units such as years), the following:

- $n_x$, the number of individuals of the cohort alive at the start of age class $x$;
- $l_x = n_x/n_0$, the **survivorship**: the proportion of newborns surviving to age $x$ (so $l_0 = 1$);
- $d_x = n_x - n_{x+1}$, the number dying during age class $x$, and $q_x = d_x/n_x$, the **age-specific mortality rate**;
- $m_x$ (often $b_x$), the **age-specific fecundity**: the mean number of offspring (for sexual species usually counted as daughters per female) produced by an individual of age $x$.

A **cohort** (or dynamic) life table follows one cohort from birth to the death of its last member; a **static** (or time-specific) life table estimates $l_x$ from the age structure of a population at one time, or from the ages at death of a sample, assuming that birth and death rates have been constant.
:::

Cohort life tables are straightforward for annual plants and insects that can be marked and followed; for long-lived animals static tables are often the only option. A classic static table was compiled by Edward Deevey in 1947 from the ages at death of Dall sheep (*Ovis dalli*) in Alaska, estimated by Adolph Murie from horn growth rings on skulls he collected in the 1930s.

Plotting $\log l_x$ against age gives a **survivorship curve**, and three idealised shapes, introduced by Raymond Pearl in 1928, are used to describe them. In a **type I** curve, mortality is low until old age and then rises steeply — humans in countries with good health care, many large mammals in captivity. In a **type II** curve the mortality rate is constant, so $\log l_x$ falls in a straight line — many adult songbirds, roughly. In a **type III** curve mortality is very high early and low thereafter — oysters, most fishes and trees, which produce vast numbers of offspring of which few survive. Real survivorship curves are usually mixtures, often type III in early life and type I late, but the three shapes are a useful vocabulary.

### From the life table to the rate of increase

::: proposition Net reproductive rate and generation time {#prop-r0}
From the survivorship $l_x$ and fecundity $m_x$ columns of a life table, the **net reproductive rate** — the mean number of offspring produced by a newborn individual over its whole life — is

$$
R_0 = \sum_x l_x m_x ,
$$ {#eq-r0}

and the **cohort generation time** — the mean age of mothers at the birth of their offspring — is

$$
T_c = \frac{\sum_x x\, l_x m_x}{R_0}.
$$ {#eq-gen-time}

The population grows if $R_0 > 1$ and shrinks if $R_0 < 1$. Its per-generation multiplication is $R_0$, so the intrinsic rate of increase per unit time is approximately

$$
r \approx \frac{\ln R_0}{T_c}.
$$ {#eq-r-approx}
:::

::: proof
A newborn survives to age $x$ with probability $l_x$ and, if it does, produces $m_x$ offspring at that age; summing the expected contributions over all ages gives [[#eq-r0]]. The weights $l_x m_x/R_0$ form the distribution of the mother's age at the birth of a randomly chosen offspring, so [[#eq-gen-time]] is its mean. If each generation multiplies the population by $R_0$ and a generation takes $T_c$, then $N$ grows as $R_0^{t/T_c} = e^{(t/T_c)\ln R_0}$, which gives [[#eq-r-approx]]. This is approximate because generations overlap: offspring of young mothers start reproducing before older mothers have finished.
:::

The exact rate of increase of a population with a fixed life table, once its age structure has settled down, is the root of a single equation derived by Leonhard Euler in 1760 and rediscovered by Alfred Lotka in the early twentieth century.

::: proposition The Euler–Lotka equation {#prop-euler-lotka}
A population with constant age-specific survivorship $l_x$ and fecundity $m_x$ eventually grows exponentially at rate $r$ (or by the factor $\lambda = e^r$ per time unit) with a fixed **stable age distribution**, where $r$ is the unique real root of

$$
\sum_x e^{-rx}\, l_x m_x = 1 .
$$ {#eq-euler-lotka}
:::

::: proof
Let $B_t$ be the number of births at time $t$. Births now come from individuals born $x$ time units ago that have survived and reproduce at age $x$: $B_t = \sum_x B_{t-x}\, l_x m_x$. Try $B_t = B_0 e^{rt}$: dividing by $B_0 e^{rt}$ gives $1 = \sum_x e^{-rx}l_x m_x$. The left side is a strictly decreasing function of $r$ that runs from $+\infty$ to $0$ (given at least one positive $l_x m_x$ at age $x > 0$), so there is exactly one real root. That the population actually approaches this exponential growth from any starting age structure is a theorem of renewal theory (or, for the Leslie matrix below, of the Perron–Frobenius theorem); we accept it here.
:::

Notice from [[#eq-euler-lotka]] that $r > 0$ exactly when $\sum l_x m_x = R_0 > 1$, since at $r = 0$ the left side equals $R_0$. Notice too that offspring produced at a young age count for more: they are discounted by $e^{-rx}$. This is why, in a growing population, selection favours early reproduction so strongly — a point made in [[ecology/life-histories]].

::: example A life table {#ex-life-table}
A cohort of 1000 voles is followed from birth. The numbers alive at the start of each year of age, and the mean number of daughters produced per female at each age, are:

| age $x$ (years) | $n_x$ | $l_x$ | $m_x$ | $l_x m_x$ | $x\,l_x m_x$ |
|---|---|---|---|---|---|
| 0 | 1000 | 1.00 | 0 | 0 | 0 |
| 1 | 400 | 0.40 | 2 | 0.80 | 0.80 |
| 2 | 200 | 0.20 | 3 | 0.60 | 1.20 |
| 3 | 80 | 0.08 | 3 | 0.24 | 0.72 |
| 4 | 20 | 0.02 | 2 | 0.04 | 0.16 |
| 5 | 0 | 0 | — | — | — |

Calculate $R_0$, $T_c$, the approximate $r$ and the exact $r$.
::: solution
Summing the columns, $R_0 = 0.80 + 0.60 + 0.24 + 0.04 = 1.68$: each newborn female leaves on average 1.68 daughters, so the population grows. The generation time is $T_c = (0.80 + 1.20 + 0.72 + 0.16)/1.68 = 2.88/1.68 = 1.71$ years. The approximation [[#eq-r-approx]] gives $r \approx \ln 1.68/1.71 = 0.519/1.71 = 0.303$ per year.

For the exact value we solve $\sum e^{-rx}l_x m_x = 0.80e^{-r} + 0.60e^{-2r} + 0.24e^{-3r} + 0.04e^{-4r} = 1$ numerically (code below): $r = 0.320$ per year, so $\lambda = e^{0.320} = 1.377$ — the population multiplies by about 1.38 each year once its age structure is stable. The approximation underestimates $r$ by about 5 % because it ignores the overlap of generations.

The mortality rates are $q_0 = 600/1000 = 0.60$, $q_1 = 0.50$, $q_2 = 0.60$, $q_3 = 0.75$: high in the first year, lower in the second, then rising with age.
:::
:::

```python
import math

x  = [0, 1, 2, 3, 4]               # age class (years)
lx = [1.0, 0.4, 0.2, 0.08, 0.02]   # survivorship from birth
mx = [0, 2, 3, 3, 2]               # daughters per female of age x

def euler_lotka(r):
    """Left side of the Euler-Lotka equation minus 1."""
    return sum(math.exp(-r * a) * l * m for a, l, m in zip(x, lx, mx)) - 1

lo, hi = -1.0, 2.0                 # bracket for r (per year)
for _ in range(60):                # bisection: halve the bracket 60 times
    mid = (lo + hi) / 2
    if euler_lotka(mid) > 0:
        lo = mid                   # sum too large: r must be bigger
    else:
        hi = mid
r = (lo + hi) / 2
print(f"r = {r:.4f} per year, lambda = {math.exp(r):.4f}")
# r = 0.3202 per year, lambda = 1.3774
```

### Projecting a population: the Leslie matrix

The life table can be turned into a machine for projecting a population forward in time. Let $n_t$ be the vector of numbers in each age class at time $t$. Each year, individuals of age $i$ produce $F_i$ newborns and survive to the next age class with probability $P_i$. In matrix form, introduced by Patrick Leslie in 1945,

$$
\begin{pmatrix} n_0 \\ n_1 \\ n_2 \end{pmatrix}_{t+1} =
\begin{pmatrix} F_0 & F_1 & F_2 \\ P_0 & 0 & 0 \\ 0 & P_1 & 0 \end{pmatrix}
\begin{pmatrix} n_0 \\ n_1 \\ n_2 \end{pmatrix}_{t} ,
\qquad n_{t+1} = A\,n_t .
$$ {#eq-leslie}

Whatever the starting vector, after enough steps the population grows by the factor $\lambda$ per step, where $\lambda$ is the dominant eigenvalue of $A$, and the proportions in the age classes approach the corresponding eigenvector — the stable age distribution. (The linear algebra is in [eigenvalues](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues) in Maths Atlas.)

::: example Projecting with a Leslie matrix {#ex-leslie}
A small mammal has three age classes. Newborns ($n_0$) do not breed and survive to age 1 with probability $P_0 = 0.5$; one-year-olds produce $F_1 = 2$ newborns each and survive to age 2 with $P_1 = 0.4$; two-year-olds produce $F_2 = 1.5$ newborns and then die. Starting with 100 newborns, project the population for three years, and find $\lambda$ and the stable age distribution.
::: solution
Here $F_0 = 0$. Starting from $n_0 = (100, 0, 0)$:

- year 1: $(2\cdot0 + 1.5\cdot0,\; 0.5\cdot100,\; 0.4\cdot0) = (0, 50, 0)$, total 50;
- year 2: $(2\cdot50,\; 0,\; 0.4\cdot50) = (100, 0, 20)$, total 120;
- year 3: $(1.5\cdot20,\; 0.5\cdot100,\; 0) = (30, 50, 0)$, total 80.

The totals fluctuate because the starting population is far from the stable age distribution. For the long-run growth, the characteristic equation $\det(A - \lambda I) = 0$ is $\lambda^3 = F_1P_0\lambda + F_2P_0P_1 = 1.0\lambda + 0.3$, whose positive root is $\lambda = 1.125$ (by trial or bisection: $1.125^3 = 1.424$, while $1.125 + 0.3 = 1.425$). The population eventually grows by 12.5 % a year, $r = \ln\lambda = 0.118$. The stable age distribution is proportional to $(1, P_0/\lambda, P_0P_1/\lambda^2) = (1, 0.444, 0.158)$, that is 62 % newborns, 28 % one-year-olds and 10 % two-year-olds. Projecting further confirms it: by year 12 the vector is $(190.8, 80.4, 30.8)$, in proportions 0.63, 0.27, 0.10.
:::
:::

Matrix models are the workhorse of applied population ecology. Classes can be stages (seed, rosette, flowering plant) rather than ages, and the **sensitivity** of $\lambda$ to each matrix entry tells a manager which vital rate matters most. A celebrated application to loggerhead sea turtles by Deborah Crouse, Larry Crowder and Hal Caswell (1987) showed that protecting eggs on nesting beaches could not save declining populations unless the survival of large juveniles and adults at sea was raised — which led to the requirement for turtle excluder devices on shrimp trawlers in the United States.

## Exponential growth

If every individual has the same constant per-capita rates, the population grows exponentially. Two versions are used, for populations that breed in discrete seasons and for those whose births and deaths happen continuously.

::: proposition Geometric and exponential growth {#prop-exponential}
(a) **Discrete generations.** If each individual in generation $t$ is replaced by $\lambda$ individuals in generation $t+1$, then $N_{t+1} = \lambda N_t$ and

$$
N_t = N_0\,\lambda^t .
$$

(b) **Continuous growth.** If the per-capita birth rate $b$ and death rate $d$ are constant, with $r = b - d$ the **intrinsic rate of increase**, then

$$
\frac{dN}{dt} = rN, \qquad N(t) = N_0 e^{rt}.
$$ {#eq-exp}

The two agree at integer times when $\lambda = e^r$. The population grows if $r > 0$ ($\lambda > 1$), with **doubling time** $t_d = \ln 2/r$, and declines if $r < 0$. Assumptions: no migration, constant per-capita rates (no density dependence, no environmental variation), and a stable age distribution (or no age structure).
:::

::: proof
(a) Iterate $N_{t+1} = \lambda N_t$. (b) In a short interval $\Delta t$ there are $bN\,\Delta t$ births and $dN\,\Delta t$ deaths, so $\Delta N = (b - d)N\,\Delta t$; letting $\Delta t \to 0$ gives the differential equation, whose solution by separation of variables is $\ln N = rt + \text{const}$, i.e. $N = N_0e^{rt}$. Setting $N_0e^{rt_d} = 2N_0$ gives $t_d = \ln 2/r$.
:::

Exponential growth is the null model of population ecology, the analogue of Newton's first law or of Hardy–Weinberg proportions: it says what happens when nothing limits growth. It is realised, briefly, by populations colonising empty habitat: bacteria in fresh medium (see [[microbiology/microbial-growth]]), an invading species in a new continent, the reindeer introduced to St Matthew Island in the Bering Sea in 1944, which grew from 29 animals to about 6000 by 1963 before crashing to a few dozen.

::: example Doubling times {#ex-doubling}
(a) A population of aphids increases at $r = 0.25$ per day. What is its doubling time, and by how much does it multiply in 30 days? (b) The world's human population was about 8.2 billion in 2024 and growing at a little under 1 % per year (United Nations, *World Population Prospects 2024*). At a constant 1 % per year, what would its doubling time be?
::: solution
(a) $t_d = \ln 2/0.25 = 0.693/0.25 = 2.77$ days. In 30 days the population multiplies by $e^{0.25\times30} = e^{7.5} \approx 1800$.

(b) $t_d = 0.693/0.01 = 69$ years. (The "rule of 70": doubling time in years is about 70 divided by the percentage growth rate.) In fact human population growth has been slowing since the 1960s, when it peaked at over 2 % a year, and the UN's 2024 projections have the population peaking at around 10.3 billion in the 2080s; constant growth is a convenient calculation, not a forecast.
:::
:::

## Limits to growth: the logistic model

No population grows exponentially for long. As it becomes crowded, resources per individual fall, and births decline or deaths rise. The simplest way to include this is to let the per-capita growth rate fall linearly with density, reaching zero at a ceiling $K$.

::: proposition The logistic equation {#prop-logistic}
If the per-capita rate of increase declines linearly with population size from $r$ at $N = 0$ to zero at $N = K$, then

$$
\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right),
$$ {#eq-logistic}

where $K$ is the **carrying capacity**. For $0 < N_0$ the solution is

$$
N(t) = \frac{K}{1 + \left(\dfrac{K - N_0}{N_0}\right)e^{-rt}},
$$ {#eq-logistic-sol}

an S-shaped (sigmoid) curve rising to $K$ if $N_0 < K$ (and falling to $K$ if $N_0 > K$). The equilibrium $N^* = K$ is stable and $N^* = 0$ unstable. The population grows fastest, at rate $rK/4$, when $N = K/2$. Assumptions: a closed population without age structure, constant $r$ and $K$, and an instantaneous, linear effect of density on per-capita growth.
:::

::: proof
The equation is separable. Writing $\dfrac{dN}{N(1 - N/K)} = r\,dt$ and using partial fractions, $\dfrac{1}{N(1-N/K)} = \dfrac1N + \dfrac{1}{K - N}$, so $\ln\dfrac{N}{K - N} = rt + c$. Hence $\dfrac{N}{K - N} = \dfrac{N_0}{K - N_0}e^{rt}$; solving for $N$ gives [[#eq-logistic-sol]]. As $t\to\infty$, $e^{-rt}\to0$ and $N\to K$. The growth rate $f(N) = rN - rN^2/K$ is a downward parabola with $f'(N) = r - 2rN/K = 0$ at $N = K/2$, where $f = rK/4$. Near $N = K$, $f'(K) = -r < 0$, so small departures shrink (stable); near $0$, $f'(0) = r > 0$, so they grow (unstable).
:::

The logistic equation was proposed by Pierre-François Verhulst in 1838 and rediscovered by Raymond Pearl and Lowell Reed in 1920, who fitted it to the census population of the United States. Its best laboratory fits came from microorganisms: Georgii Gause's cultures of yeast and of *Paramecium* in the early 1930s grew along beautifully sigmoid curves.

::: widget slopefield
f: r*y*(1 - y/K)
x: 0, 25
y: -10, 160
sliders: r=0.5:0.1:1.5:0.05; K=100:40:140:5
points: 0, 5; 0, 40; 0, 150
caption: The logistic equation as a direction field, with time $t$ (here in days) on the horizontal axis and population size $N$ on the vertical. Each solution curve starting below $K$ is S-shaped, steepest where it crosses $N = K/2$; a curve starting above $K$ declines to it. Click to start a new solution, and change $r$ (how fast the approach is) and $K$ (where it ends). The line $N = 0$ is an unstable equilibrium: any positive population leaves it.
:::

::: example Logistic growth of a yeast culture {#ex-logistic}
A culture starts with $N_0 = 10$ cells per unit volume and has $r = 0.5$ per hour and $K = 1000$. How long does it take to reach half the carrying capacity, and what is the maximum rate of growth?
::: solution
Setting $N(t) = K/2$ in [[#eq-logistic-sol]] requires $\left(\frac{K - N_0}{N_0}\right)e^{-rt} = 1$, so

$$
t = \frac1r\ln\frac{K - N_0}{N_0} = \frac{1}{0.5}\ln 99 = 2\times4.595 = 9.19\ \text{hours}.
$$

The growth rate there is the maximum, $rK/4 = 0.5\times1000/4 = 125$ cells per unit volume per hour.
:::
:::

::: warning "The carrying capacity is a fixed property of the environment"
$K$ is a parameter of a model, not a constant of nature. The number of individuals an environment supports depends on the resources available, which vary from year to year, on the population's own effect on those resources, and on predators, parasites and competitors. Real populations fluctuate around, overshoot or never reach any fixed $K$. Equally, the logistic's assumption that per-capita growth falls *linearly* with density is a convenience; data often show nonlinear and lagged responses.
:::

## Density dependence and population regulation

The logistic model embodies a more general idea: the per-capita rates of birth and death depend on the density of the population itself.

::: definition Density dependence and regulation {#def-density-dependence}
A per-capita demographic rate is **density-dependent** if it changes with population density: per-capita birth rate falling, or per-capita death rate rising, as density increases (**negative** density dependence), or the reverse (**positive** density dependence, an **Allee effect**). A factor whose effect does not change with density, such as a severe frost that kills the same fraction of a population whatever its size, is **density-independent**. A population is **regulated** if negative density dependence tends to return it towards an equilibrium or a bounded range after it departs from it.
:::

Only density-dependent processes can regulate a population; density-independent ones can cause it to fluctuate, sometimes violently, but cannot hold it within bounds. This was the core of a long debate in the mid-twentieth century. Alexander Nicholson, working with blowflies in Australia, argued that density dependence (through competition for food, for example) was what kept populations within bounds. Herbert Andrewartha and Charles Birch, after studying the thrips *Thrips imaginis* on roses in Adelaide, whose annual numbers were well predicted by weather alone, argued that density-independent factors determined abundance. The modern resolution is that both matter: weather drives much of the year-to-year variation in many populations, while density dependence, often acting weakly or only at high density, keeps them from wandering off to extinction or infinity.

### Detecting density dependence

The direct test is to plot a population's per-capita growth rate against its density. For the logistic, the per-capita rate is a straight line,

$$
\frac{1}{N}\frac{dN}{dt} = r - \frac{r}{K}N ,
$$ {#eq-percapita}

with intercept $r$ and horizontal-axis intercept $K$. With census data, the per-capita growth rate over an interval is estimated as $\ln(N_{t+1}/N_t)$.

::: example Estimating r and K from census data {#ex-regression}
A population of water fleas in a series of laboratory tanks set up at different densities gave the following per-capita growth rates (per day):

| $N$ (hundreds per tank) | 0.5 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 | 3.5 | 4.0 | 4.5 |
|---|---|---|---|---|---|---|---|---|---|
| per-capita growth rate | 0.46 | 0.41 | 0.33 | 0.29 | 0.26 | 0.19 | 0.16 | 0.11 | 0.04 |

Fit a straight line and estimate $r$ and $K$.
::: solution
Least-squares regression of the growth rate $y$ on $N$ (in hundreds) gives $y = 0.502 - 0.1007N$, with $R^2 = 0.99$. By [[#eq-percapita]], the intercept is $r \approx 0.50$ per day, and the line reaches zero at $N = 0.502/0.1007 = 4.98$ hundred, so $K \approx 500$ individuals per tank. The negative slope is the signature of negative density dependence. The regression itself is treated in [[biostatistics/regression]]; with field census data there is a statistical trap, since errors in measuring $N_t$ appear in both axes and can produce a spurious negative slope, so tests of density dependence in time series need special methods.
:::
:::

::: widget regression
points: 0.5,0.46; 1,0.41; 1.5,0.33; 2,0.29; 2.5,0.26; 3,0.19; 3.5,0.16; 4,0.11; 4.5,0.04
degree: 1
caption: Per-capita growth rate (per day) against density $N$ (hundreds per tank) for the water fleas of [[#ex-regression]], with the least-squares line. The intercept estimates $r$ and the point where the line crosses zero estimates $K$. Drag a point — for example, raise the growth rate at high density — and watch how the estimate of $K$ moves.
:::

### Allee effects

At very low density, per-capita growth can *increase* with density: individuals may fail to find mates, to pollinate one another, to overwhelm a host's defences, or to defend themselves against predators in a group. This positive density dependence is called an **Allee effect**, after Warder Clyde Allee, who described it in the 1930s. A simple model is

$$
\frac{dN}{dt} = rN\left(\frac{N}{A} - 1\right)\left(1 - \frac{N}{K}\right), \qquad 0 < A < K ,
$$ {#eq-allee}

in which a population below the **Allee threshold** $A$ declines to extinction while one above it grows towards $K$. Allee effects matter in conservation, because a population reduced below its threshold may continue to decline even after the original threat is removed, and in the control of invasive species, because eradicating most of a small invading population may be enough.

::: widget plot
f: r*x*(1 - x/K); r*x*(x/A - 1)*(1 - x/K)
x: 0, 120
sliders: r=0.5:0.1:1:0.05; K=100:60:120:5; A=20:5:50:1
hlines: 0
labels: \text{logistic}; \text{with Allee effect}
caption: Population growth rate $dN/dt$ (individuals per unit time) against population size $N$. Where a curve lies above the axis the population grows; below, it shrinks. For the logistic, growth is fastest at $N = K/2$; with an Allee effect, growth is negative below the threshold $A$, so small populations decline to extinction. Raise $A$ towards $K$ and notice how the region of positive growth shrinks.
:::

## Time lags, cycles and chaos

The logistic model assumes that density affects growth instantly. In reality there are delays: the eggs laid when food was plentiful hatch into larvae that find it scarce; plants respond to last year's nutrient uptake. Delays in regulation make populations overshoot their equilibrium and oscillate.

### Discrete generations

Many organisms — annual plants, temperate insects — breed once a year in a discrete season, and the effect of density acts between one generation and the next. A widely used model is that of William Ricker (1954), developed for fish stocks:

$$
N_{t+1} = N_t\exp\!\left[r\left(1 - \frac{N_t}{K}\right)\right].
$$ {#eq-ricker}

Its equilibrium is $N^* = K$, but its stability depends on $r$. Linearising near $K$, a small deviation $\varepsilon_t = N_t - K$ is multiplied each generation by $1 - r$. If $0 < r < 1$ the population approaches $K$ smoothly; if $1 < r < 2$ it overshoots and approaches $K$ in damped oscillations; if $r > 2$ the deviations grow and the population settles into a stable 2-point cycle, then a 4-point cycle as $r$ increases further, and so on through a cascade of period doublings to **chaos** for $r$ above about 2.69. In the chaotic regime the population fluctuates aperiodically, and two trajectories starting at almost the same size diverge rapidly, making long-term prediction impossible even though the model is completely deterministic.

::: widget cobweb
g: x*exp(r*(1 - x))
x0: 0.2
steps: 60
sliders: r=1.5:0.5:3:0.01
bifurcation: r
x: 0, 3
caption: The Ricker model with population measured in units of $K$ (so $N^* = 1$), drawn as a cobweb: the curve is $N_{t+1}$ against $N_t$ and the staircase follows the population from generation to generation. With $r = 1.5$ the population spirals in to $K$. Increase $r$ past 2 to see a 2-cycle, past about 2.53 a 4-cycle, and above about 2.7 chaos. The bifurcation diagram shows the long-run population sizes for every value of $r$.
:::

Robert May drew ecologists' attention to this behaviour in a paper in *Science* in 1974 and a review in *Nature* in 1976, "Simple mathematical models with very complicated dynamics", which also helped launch the wider study of chaos. The realisation that erratic fluctuations need not be caused by erratic environments changed how population data are interpreted. How common chaos is in real populations is still debated: most field populations seem to have dynamics in the stable or damped region, but chaotic dynamics have been demonstrated in laboratory populations of flour beetles (*Tribolium*) in experiments by Robert Costantino, Jim Cushing and colleagues in the 1990s, and in a long-running marine plankton community kept in a mesocosm.

### Continuous time with a delay

In continuous time, George Evelyn Hutchinson proposed in 1948 that the density affecting growth now is the density some time $\tau$ ago:

$$
\frac{dN}{dt} = rN(t)\left(1 - \frac{N(t - \tau)}{K}\right).
$$ {#eq-delay}

Analysis of this delay-differential equation shows that $K$ is approached without oscillation when $r\tau < 1/e \approx 0.37$, with damped oscillations when $1/e < r\tau < \pi/2$, and that for $r\tau > \pi/2 \approx 1.57$ the population settles into stable cycles (a limit cycle) whose period is about four times the delay. The product $r\tau$ — the response speed times the delay — is what matters: a population that responds quickly to conditions that are long out of date oscillates. Nicholson's laboratory populations of the sheep blowfly *Lucilia cuprina*, in which adults were given limited food, showed sustained cycles with a period of about 35–40 days, which May and others later interpreted with this model.

::: quiz
In the Ricker model [[#eq-ricker]], which change makes the population *more* likely to oscillate or behave chaotically?
- [x] Increasing the intrinsic rate of increase $r$
- [ ] Increasing the carrying capacity $K$
- [ ] Reducing the strength of density dependence to zero
- [ ] Starting from a smaller population
::: solution
Stability depends on $r$ alone, through the factor $1 - r$ by which small deviations are multiplied each generation. Large $r$ means strong overcompensation: a population slightly above $K$ crashes far below it, and vice versa. $K$ merely sets the scale, and the starting size only affects the transient. Without density dependence there is no equilibrium at all — the population grows exponentially.
:::
:::

::: intuition Overcompensation
Think of density dependence as a thermostat. A good thermostat responds in proportion to how far the temperature is from the set point and acts immediately. If it overreacts — turning the heating full on when the room is a degree too cool — the room overshoots, and the system oscillates. A delay has the same effect: by the time the heating responds, the room is already too warm. Populations with high reproductive rates ($r$ large) are overreacting thermostats; populations whose regulation acts on last season's density are delayed ones. Both oscillate.
:::

::: application Harvesting and maximum sustainable yield
If a population grows logistically, its growth rate is greatest, $rK/4$, at $N = K/2$ ([[#prop-logistic]]). In principle a fishery or a forest could be harvested at this rate indefinitely, by holding the population at half its carrying capacity: the **maximum sustainable yield** (MSY). For $r = 0.5$ per year and $K = 1000$ t, the MSY is 125 t per year. The concept was central to twentieth-century fisheries management, and its failures are instructive. If the harvest is a fixed quota slightly above MSY, the population declines to extinction; if the stock is overestimated, or $r$ or $K$ fall because of environmental change, a quota set at the estimated MSY overfishes; and real stocks have age structure, time lags and Allee effects that the logistic model ignores. The collapse of the Peruvian anchoveta fishery in 1972, during an El Niño year, and of the Northern cod off Newfoundland, closed to commercial fishing in 1992, are the standard warnings. Modern management uses more cautious targets and explicit accounting for uncertainty; the conservation of harvested and small populations is treated in [[conservation-biology/small-populations]].
:::

::: history
Malthus's *Essay* (1798) and Verhulst's logistic equation (1838) were the earliest mathematical statements about population growth. Raymond Pearl popularised the logistic from 1920, and Pearl also introduced the three types of survivorship curve (1928). The Euler–Lotka equation goes back to Euler (1760) and was put on a firm footing by Alfred Lotka in papers from 1907 to the 1920s; Patrick Leslie introduced the matrix form in 1945. In the 1930s Georgii Gause tested logistic growth in microbial cultures and Warder Clyde Allee described positive density dependence. The 1950s debate between Nicholson and Andrewartha and Birch about the role of density dependence set the agenda for decades of field research, and Robert May's work on chaos (1974–1976) transformed the interpretation of population fluctuations.
:::

## Where this leads

Single-species models are the building blocks of the next two chapters. [[ecology/competition]] couples two logistic equations, each population's growth reduced by the other's density, and [[ecology/predation-parasitism]] couples prey growth to predator consumption, producing cycles of a different kind from those here. Harvesting, small populations and extinction risk are developed in [[conservation-biology/small-populations]], and the dynamics of disease spread in [[ecology/predation-parasitism]].

::: summary
- Populations change by births, deaths, immigration and emigration ([[#eq-bide]]).
- A **life table** ([[#def-life-table]]) gives survivorship $l_x$ and fecundity $m_x$ by age; $R_0 = \sum l_x m_x$, the generation time $T_c = \sum x l_x m_x/R_0$, and $r \approx \ln R_0/T_c$ ([[#prop-r0]]). The exact $r$ solves the **Euler–Lotka equation** $\sum e^{-rx}l_xm_x = 1$ ([[#prop-euler-lotka]]). Survivorship curves are described as types I, II and III.
- The **Leslie matrix** projects age-structured populations; its dominant eigenvalue is $\lambda$ and its eigenvector the stable age distribution.
- With constant per-capita rates, populations grow **exponentially**: $N = N_0e^{rt}$, doubling time $\ln2/r$ ([[#prop-exponential]]).
- The **logistic** model $dN/dt = rN(1 - N/K)$ gives S-shaped growth to a stable carrying capacity, fastest at $K/2$ ([[#prop-logistic]]); it is a model with strong assumptions, not a law.
- **Density dependence** ([[#def-density-dependence]]) is needed for regulation; it is detected as a decline of per-capita growth with density. **Allee effects** make small populations decline.
- Delayed or overcompensating density dependence produces damped oscillations, cycles and **chaos** (the Ricker model for $r > 2$; Hutchinson's delay model for $r\tau > \pi/2$).
:::

## Exercises

::: exercise Net reproductive rate {level=1 check="1.1"}
A cohort life table has $l_1 = 0.5$, $l_2 = 0.3$, $l_3 = 0.1$, with fecundities $m_1 = 1$, $m_2 = 2$, $m_3 = 0$ (and $m_0 = 0$). Calculate $R_0$.
::: solution
$R_0 = 0.5\times1 + 0.3\times2 + 0.1\times0 = 0.5 + 0.6 = 1.1$, so the population grows slowly, by about 10 % per generation.
:::
:::

::: exercise Doubling time {level=1 check="ln(2)/0.04"}
A population grows exponentially at $r = 0.04$ per year. What is its doubling time in years?
::: solution
$t_d = \ln 2/0.04 = 17.3$ years.
:::
:::

::: exercise Maximum sustainable yield {level=1 check="250"}
A logistically growing fish stock has $r = 0.4$ per year and $K = 2500$ t. What is its maximum sustainable yield, in tonnes per year?
::: solution
$rK/4 = 0.4\times2500/4 = 250$ t per year, obtained by holding the stock at $K/2 = 1250$ t.
:::
:::

::: exercise From λ to r {level=1 check="ln(1.5)"}
An annual plant population multiplies by $\lambda = 1.5$ each year. What is the equivalent continuous rate $r$ (per year)?
::: solution
$r = \ln\lambda = \ln1.5 = 0.405$ per year.
:::
:::

::: exercise Logistic timing {level=2 check="ln(9)/0.2"}
A population growing logistically with $r = 0.2$ per year and $K = 500$ starts at $N_0 = 50$. After how many years does it reach 250?
::: solution
From [[#eq-logistic-sol]], $N = K/2$ when $e^{-rt} = N_0/(K - N_0) = 50/450 = 1/9$, so $t = \ln 9/0.2 = 2.197/0.2 = 11.0$ years.
:::
:::

::: exercise Interpreting survivorship curves {level=2}
Sketch on a logarithmic vertical axis the survivorship curves you would expect for (a) a population of oak trees, (b) a cohort of adult songbirds after fledging, (c) a population of a large mammal in a zoo. For (a), explain why the shape implies that most of the population's reproduction comes from a tiny fraction of the individuals born, and what this means for the variance in lifetime reproductive success.
::: solution
(a) Type III: $\log l_x$ falls steeply in the first years (most acorns and seedlings die), then flattens. (b) Approximately type II: a straight line, constant annual mortality. (c) Type I: flat until old age, then a steep fall. In (a), only the very few individuals that survive the early phase ever reproduce, and they then reproduce for decades: almost all individuals born have zero lifetime reproductive success and a handful have enormous success. The variance in lifetime reproductive success is therefore huge, which also makes the effective population size much smaller than the census size — a theme of [[population-genetics/genetic-drift]].
:::
:::

::: exercise A Leslie matrix {level=2}
A plant has two stages: juveniles (age 0) and adults. Juveniles survive to become adults with probability 0.25 and do not reproduce. Adults produce 3 juveniles each per year and survive with probability 0.5. Write the projection matrix, find $\lambda$, and say whether the population grows. Which change raises $\lambda$ more: increasing juvenile survival to 0.35 or adult fecundity to 4?
::: hint
Adults stay adults, so the matrix is $\begin{pmatrix} 0 & F \\ P_J & P_A\end{pmatrix}$. Its eigenvalues solve $\lambda^2 - P_A\lambda - FP_J = 0$.
:::
::: solution
$A = \begin{pmatrix} 0 & 3 \\ 0.25 & 0.5 \end{pmatrix}$. The characteristic equation is $\lambda^2 - 0.5\lambda - 0.75 = 0$, so $\lambda = \tfrac12\left(0.5 + \sqrt{0.25 + 3}\right) = \tfrac12(0.5 + 1.803) = 1.151$. The population grows by about 15 % per year.

With $P_J = 0.35$: $\lambda^2 - 0.5\lambda - 1.05 = 0$, $\lambda = \tfrac12(0.5 + \sqrt{4.45}) = \tfrac12(0.5 + 2.110) = 1.305$. With $F = 4$: $\lambda^2 - 0.5\lambda - 1.0 = 0$, $\lambda = \tfrac12(0.5 + \sqrt{4.25}) = \tfrac12(0.5 + 2.062) = 1.281$. Raising juvenile survival to 0.35 gives the larger increase — a 40 % increase in juvenile survival against a 33 % increase in fecundity, which enter the equation only as their product $FP_J$.
:::
:::

::: exercise Is there density dependence? {level=2}
Over ten years a population of a small mammal had the following densities (per hectare): 12, 30, 18, 25, 21, 24, 22, 23, 22, 23. Calculate $\ln(N_{t+1}/N_t)$ for the first three intervals and describe the pattern of the whole series. What dynamics do you think it shows, and what does it suggest about $r$ in a Ricker model?
::: solution
$\ln(30/12) = 0.92$, $\ln(18/30) = -0.51$, $\ln(25/18) = 0.33$. Per-capita growth is high when the population is small and negative when it is large; the population overshoots (12 → 30), then undershoots (30 → 18), with ever smaller swings, converging on about 22–23 per hectare. These are damped oscillations around an equilibrium, which in the Ricker model occur for $1 < r < 2$ — strong but not chaotic overcompensation. Ten points are a short series, and errors in estimating density could exaggerate the apparent density dependence.
:::
:::

::: exercise Allee threshold {level=3}
For the Allee model [[#eq-allee]] with $A = 20$ and $K = 100$: (a) list the equilibria and state which are stable; (b) a population of 150 is reduced by harvesting to 15; what happens next? (c) A conservation manager can either remove a threat that reduces $K$, or translocate individuals into the population. Which is more urgent when $N < A$, and why?
::: solution
(a) $dN/dt = 0$ at $N = 0$, $N = A = 20$ and $N = K = 100$. For $0 < N < 20$, $(N/A - 1) < 0$ and $(1 - N/K) > 0$, so $dN/dt < 0$; for $20 < N < 100$ both brackets are positive and $dN/dt > 0$; above 100, $dN/dt < 0$. So 0 and 100 are stable and 20 is unstable.

(b) From 150 the population would have declined to 100, but at 15 it is below the threshold: it declines to extinction even if harvesting stops.

(c) Below $A$, raising $K$ does not change the sign of the growth rate (the population still declines), whereas translocating enough individuals to lift $N$ above $A$ makes it grow. Augmentation is urgent; removing the threat is needed too, to secure the long-term carrying capacity.
:::
:::

::: exercise Delay and oscillation {level=3}
A population follows Hutchinson's delayed logistic [[#eq-delay]] with $r = 0.3$ per week. (a) For what range of delays $\tau$ (in weeks) does it approach $K$ without oscillating, with damped oscillations, and with sustained cycles? (b) If cycles occur with $\tau = 8$ weeks, about how long is the period? (c) Explain biologically why the product $r\tau$, rather than $r$ or $\tau$ alone, controls stability.
::: solution
(a) Monotone approach for $r\tau < 1/e$: $\tau < 0.368/0.3 = 1.23$ weeks. Damped oscillations for $1.23 < \tau < (\pi/2)/0.3 = 5.24$ weeks. Sustained cycles for $\tau > 5.24$ weeks.

(b) The period is about $4\tau = 32$ weeks (this is the approximation near the threshold; it lengthens somewhat for larger $r\tau$).

(c) $r$ measures how far the population changes per unit time; $\tau$ is how out of date its information about density is. During the delay, the population changes by a factor of roughly $e^{r\tau}$ before regulation responds. A slowly growing population with a long delay and a fast-growing one with a short delay are equally destabilised: what matters is how much the population can change before density catches up with it.
:::
:::
