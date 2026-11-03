Under ideal conditions *Escherichia coli* divides every 20 minutes. Starting from a single cell, 48 hours of such growth would produce $2^{144} \approx 2\times10^{43}$ cells, weighing about 3,700 times as much as the Earth. Obviously this never happens: nutrients run out, waste accumulates, and growth stops long before. But the arithmetic makes the point that dominates microbial life: populations of microbes grow exponentially whenever they can, they can grow very fast, and almost everything about their ecology, their evolution and their control follows from that fact and from the things that limit it.

This chapter is about growth — of single cells, of populations in a flask, and of populations held in a steady state in continuous culture. We describe how a bacterial cell grows and divides, set up the mathematics of exponential growth and the batch growth curve, derive the steady states of the chemostat from the Monod model, and survey the physical and chemical conditions — temperature, pH, water and oxygen — under which microbes can grow. Counting methods were introduced in [[microbiology/microbial-world]]; the mathematics of exponential and logistic growth is developed further in [[ecology]] and in the [Maths Atlas](/learn/maths/).

## How a bacterium grows and divides

Most bacteria and archaea reproduce by **binary fission**: a cell grows, replicates its chromosome, segregates the two copies and divides in the middle into two similar daughter cells. Some divide asymmetrically: *Caulobacter crescentus* divides into a stalked cell and a swimming cell with different fates, and *Hyphomicrobium* and many other bacteria reproduce by **budding**. *Streptomyces* grows as branching filaments and reproduces by spores.

Division in *E. coli* and *Bacillus subtilis* is organised by a ring of the tubulin-like protein FtsZ, which assembles at mid-cell and recruits the **divisome**, a complex of a dozen or more proteins that synthesise the new peptidoglycan of the septum ([[microbiology/microbial-cells#def-peptidoglycan]]). Two systems place the ring in the middle: the **Min system**, whose proteins oscillate from pole to pole so that the inhibitor MinC is on average least concentrated at mid-cell, and **nucleoid occlusion**, which prevents division over unsegregated DNA.

### The bacterial cell cycle

In a eukaryote, DNA replication and mitosis follow one another once per cycle ([[cell-biology/cell-cycle]]). Bacteria have a puzzle to solve: in *E. coli*, replicating the whole chromosome takes about 40 minutes (the **C period**) and a further 20 minutes pass between the end of replication and division (the **D period**), yet the cell can divide every 20 minutes. Stephen Cooper and Charles Helmstetter (1968) showed, with *E. coli* B/r, how this is possible: the cell starts new rounds of replication before the old ones have finished. In fast-growing cells the chromosome carries several pairs of replication forks at once (**multifork replication**), and a newborn cell inherits chromosomes that are already being replicated for its daughters and granddaughters.

::: proposition The Cooper–Helmstetter model {#prop-cooper}
Suppose each round of replication starts at the origin, takes a fixed time $C$, and is followed after a fixed time $D$ by division, and the culture grows exponentially with doubling time $\tau$. Then initiation for a given division occurs $C + D$ before it, and in the population as a whole the average number of origins per cell is $2^{(C+D)/\tau}$, and the ratio of copies of the origin to copies of the terminus is

$$
\frac{n_\mathrm{ori}}{n_\mathrm{ter}} = 2^{C/\tau}.
$$ {#eq-ori-ter}
:::

::: proof
Consider all the chromosomes in a growing culture. Forks move from the origin to the terminus in time $C$, so every copy of the terminus present at time $t$ arose from a copy of the origin that existed at time $t - C$ — one terminus copy for each origin copy then. Origins, like everything else in a culture in balanced exponential growth, increase as $2^{t/\tau}$. Therefore $n_\mathrm{ter}(t) = n_\mathrm{ori}(t - C) = n_\mathrm{ori}(t)\,2^{-C/\tau}$, which is [[#eq-ori-ter]]. The same argument applied to division, which follows initiation by $C + D$, shows that the number of origins is $2^{(C+D)/\tau}$ times the number of cells formed by division — that is, per cell. The same reasoning gives the copy number of any locus a fraction $x$ of the way from origin to terminus as proportional to $2^{-xC/\tau}$.
:::

The last remark is the basis of **marker frequency analysis** (Noboru Sueoka and Hiroshi Yoshikawa, 1965): in a growing culture, genes near the origin are more abundant than genes near the terminus, and sequencing DNA from a culture — or even from a natural community in metagenomics — and plotting read depth against position reveals how fast the cells were replicating.

::: example Origins in a fast-growing cell {#ex-origins}
Take $C = 40$ min and $D = 20$ min. (a) For $\tau = 20$ min, how many generations before division does the initiation occur, what is the average number of origins per cell, and what is the ori/ter ratio? (b) Repeat for $\tau = 60$ min. (c) What would happen if $\tau$ were shorter than $C$ but the cell could have only one pair of forks per chromosome?
::: solution
(a) Initiation precedes division by $C + D = 60$ min, three generations: a cell initiates the rounds of replication that will be completed in its great-granddaughters (initiated in the "grandmother" of the cell that will finally divide). Origins per cell: $2^{60/20} = 8$. Ori/ter: $2^{40/20} = 4$.

(b) $2^{60/60} = 2$ origins per cell on average; ori/ter $= 2^{40/60} = 1.59$. Initiation occurs one generation before division, at the birth of the cell.

(c) It could not grow faster than one doubling per $C$ = 40 min (in fact per $C$ plus a small gap). Multifork replication is what lets *E. coli* double faster than it can copy its chromosome.
:::
:::

The rate of growth also sets the size and composition of the cell. Moselio Schaechter, Ole Maaløe and Niels Ole Kjeldgaard (1958) showed, with *Salmonella* Typhimurium grown on different media, that the average mass per cell increases exponentially with the growth rate, and later work showed that the ribosome content increases roughly linearly with it: a cell that grows fast is big and packed with ribosomes. These "bacterial growth laws" are among the few quantitative regularities in biology that hold across many conditions, and they reflect the fact that protein synthesis by ribosomes is the main bottleneck of growth. William Donachie (1968) inferred from the Cooper–Helmstetter model that replication is initiated at a roughly constant cell mass per origin, and recent single-cell studies suggest that many bacteria divide after adding a roughly constant volume to their size at birth (the "adder" principle), whatever that size was — a simple rule that keeps cell sizes stable.

## Exponential growth

When each cell divides into two and every cell has the same chance of dividing in any short interval, the rate at which the population grows is proportional to its size.

::: definition Specific growth rate and doubling time {#def-growth-rate}
For a population of $N$ cells (or biomass $X$), the **specific growth rate** is

$$
\mu = \frac{1}{N}\frac{dN}{dt},
$$

with units of inverse time (h⁻¹). The **doubling time** (mean generation time) $t_d$ is the time in which the population doubles. The **number of generations** between counts $N_0$ and $N$ is $n = \log_2(N/N_0) = \log_{10}(N/N_0)/\log_{10}2 \approx 3.32\log_{10}(N/N_0)$.
:::

::: proposition Exponential growth {#prop-exp}
If $\mu$ is constant, then

$$
N(t) = N_0e^{\mu t}, \qquad t_d = \frac{\ln 2}{\mu}, \qquad \mu = \frac{\ln N_2 - \ln N_1}{t_2 - t_1}.
$$ {#eq-exp}

A plot of $\ln N$ (or $\log_{10} N$) against $t$ is a straight line of slope $\mu$ (or $\mu/\ln 10$).
:::

::: proof
The equation $dN/dt = \mu N$ separates: $dN/N = \mu\,dt$, so $\ln N = \mu t + \text{const}$ and $N = N_0e^{\mu t}$. Doubling, $N = 2N_0$, takes $t_d$ with $e^{\mu t_d} = 2$, so $t_d = \ln 2/\mu$. Taking logarithms of the solution at two times gives the last formula.
:::

Note that the doubling time of a culture is an average; individual cells divide at different ages, and the age distribution of an exponential culture is not uniform — there are twice as many newborn cells as cells about to divide, because each division produces two newborns.

::: example A doubling time from optical density {#ex-od}
An *E. coli* culture in glucose minimal medium at 37 °C has an optical density at 600 nm (OD₆₀₀) of 0.050 at 10:00 and 0.40 at 11:30. Assuming OD is proportional to biomass in this range, calculate $\mu$ and the doubling time. How long will the culture take to go from OD 0.40 to 0.80, if growth continues unchanged?
::: solution
The OD increased eightfold, three doublings in 90 minutes, so $t_d = 30$ min. Equivalently $\mu = \ln 8/1.5\ \text{h} = 2.079/1.5 = 1.39$ h⁻¹, and $t_d = 0.693/1.39 = 0.50$ h. Going from 0.40 to 0.80 is one more doubling: 30 minutes — if nothing becomes limiting. In practice cultures in minimal glucose begin to leave exponential growth near OD 1 or before, depending on the glucose concentration.
:::
:::

**Measuring growth.** Optical density measures light scattered by cells and is proportional to biomass only when the suspension is dilute (typically OD₆₀₀ below about 0.3–0.5 in a standard 1 cm cuvette, but this depends on the instrument), so denser cultures must be diluted before reading; it does not distinguish living from dead cells, and the relation between OD and cell number changes with cell size, which itself changes with growth rate. Biomass can also be measured as dry weight or protein, and cell numbers by direct or viable counts ([[microbiology/microbial-world]]). Single cells can be followed directly by time-lapse microscopy, often in microfluidic devices such as the "mother machine", in which cells grow in narrow channels for hundreds of generations (Ping Wang and colleagues, 2010).

## The batch growth curve

In a closed vessel with a fixed amount of medium — a **batch culture** — growth follows a characteristic course, first described quantitatively by Jacques Monod (1949):

1. **Lag phase.** After transfer into fresh medium, cells adjust: they repair damage, synthesise the enzymes and ribosomes needed for the new medium and may not divide for some time. The lag is short or absent if exponentially growing cells are transferred into the same medium, and long if old (stationary) or damaged cells are used or the medium is different.
2. **Exponential (log) phase.** Cells grow at a constant maximal rate for the conditions, in **balanced growth**: every component of the cell increases by the same factor in the same time.
3. **Stationary phase.** Growth stops when an essential nutrient is exhausted or waste products (acids, for example) accumulate. Cells in stationary phase are not simply idle: in *E. coli*, the sigma factor σ^S^ (RpoS) switches on genes for stress resistance; cells become smaller and rounder, and ribosomes are partly inactivated. Some cells die, releasing nutrients that others use.
4. **Death phase.** Viable counts decline, often roughly exponentially at first. Prolonged incubation reveals a long-term stationary phase in which the population is dynamic: mutants arise that grow on the debris of dead cells and take over the culture — the **growth advantage in stationary phase** (GASP) phenotype (Maria Zambrano, Roberto Kolter and colleagues, 1993).

When two sugars are present, a culture may exhaust the preferred one first, pause, and then grow again on the second: **diauxie**, which Monod discovered with glucose and lactose, and which led to the study of the *lac* operon ([[molecular-biology/bacterial-gene-regulation]]).

### The Monod model

Monod found that the specific growth rate depends on the concentration of the limiting substrate in a hyperbolic way, like the rate of an enzyme reaction.

::: proposition The Monod relation and the yield {#prop-monod}
If growth is limited by the concentration $S$ of a single substrate, the specific growth rate is, as an **empirical** relation,

$$
\mu(S) = \mu_\mathrm{max}\frac{S}{K_s + S},
$$ {#eq-monod}

where $\mu_\mathrm{max}$ is the maximum growth rate and $K_s$ the **half-saturation constant** (the value of $S$ at which $\mu = \mu_\mathrm{max}/2$). Biomass $X$ is made from substrate with a **yield** $Y = -\Delta X/\Delta S$ (grams of cells per gram of substrate), assumed constant. In a batch culture

$$
\frac{dX}{dt} = \mu(S)X, \qquad \frac{dS}{dt} = -\frac{1}{Y}\mu(S)X,
$$ {#eq-batch}

so $X + YS$ is constant, and the final biomass when the substrate is exhausted is $X_\mathrm{final} = X_0 + YS_0$.
:::

The Monod relation looks like the Michaelis–Menten equation ([[biochemistry/enzymes]]) and is often explained by saturation of a transporter, but it is a description, not a derivation: growth depends on hundreds of reactions, and the hyperbola simply fits many data sets well. $K_s$ values for sugars are often in the micromolar range, which is why exponential growth in a flask continues at full speed until the substrate is almost gone and then stops abruptly.

::: example Yield and final density {#ex-yield}
*E. coli* grows on glucose in minimal medium with a yield of about 0.5 g dry weight per g glucose under aerobic conditions. (a) What final biomass is reached with 2 g L⁻¹ glucose, starting from 0.01 g L⁻¹? (b) If one cell has a dry mass of about 0.3 pg, how many cells is that per mL? (c) Starting from 0.01 g L⁻¹ and growing at $\mu = 1.2$ h⁻¹ without slowing until the end, how long does the culture take to reach 0.4 g L⁻¹?
::: solution
(a) $X_\mathrm{final} = 0.01 + 0.5\times2 = 1.01$ g L⁻¹.

(b) $1.01$ g L⁻¹ $= 1.01\times10^{-3}$ g mL⁻¹; divided by $0.3\times10^{-12}$ g per cell gives $3.4\times10^{9}$ cells per mL.

(c) $t = \ln(0.4/0.01)/1.2 = \ln 40/1.2 = 3.69/1.2 = 3.1$ h. The yield sets *how much* biomass the substrate supports; the growth rate sets *how fast* it is reached.
:::
:::

::: widget plot
f: m*x/(k + x); m/2
x: 0, 50
y: 0, 1.6
sliders: m=1.2:0.2:2:0.05; k=2:0.5:20:0.5
labels: \mu(S)\ \text{(h}^{-1}\text{)}; \mu_\mathrm{max}/2
caption: The Monod relation $\mu = \mu_\mathrm{max} S/(K_s + S)$, with substrate concentration $S$ in µmol L⁻¹ on the horizontal axis. The horizontal line marks $\mu_\mathrm{max}/2$, which the curve crosses at $S = K_s$. With a small $K_s$ the culture grows at nearly full speed until the substrate is almost exhausted; increase $K_s$ and watch growth begin to slow at much higher concentrations — a disadvantage in a dilute environment.
:::

The batch equations can be reduced to a single equation by substituting $S = (X_\mathrm{final} - X)/Y$:

$$
\frac{dX}{dt} = \mu_\mathrm{max} X\,\frac{X_\mathrm{final} - X}{YK_s + X_\mathrm{final} - X}.
$$

When $YK_s$ is small compared with $X_\mathrm{final}$ the curve is exponential almost to the end and stops sharply; when it is large it bends over gradually, resembling the logistic curve of population ecology.

::: widget slopefield
f: m*y*(F - y)/(k + F - y)
x: 0, 8
y: 0, 1.2
points: 0, 0.01; 0, 0.05
sliders: m=1.2:0.2:2:0.1; F=1:0.2:1.2:0.05; k=0.05:0.001:1:0.01
caption: The batch growth curve from the Monod model: biomass $X$ (g L⁻¹, vertical) against time (h), with $\mu_\mathrm{max} = m$, final biomass $X_\mathrm{final} = F$ and $k = YK_s$. Two cultures start at 0.01 and 0.05 g L⁻¹; click to start more. With $k$ small, growth runs at full speed almost to $F$ and stops abruptly; raise $k$ towards 1 and the approach to stationary phase becomes gradual. A larger inoculum reaches stationary phase sooner but at the same density. (Lag and death are not part of this model.)
:::

::: warning Exponential growth is a phase, not a property
Doubling times quoted for a species — 20 minutes for *E. coli*, about 24 hours for *Mycobacterium tuberculosis* — are maxima under the best laboratory conditions. In nature, where nutrients are scarce, most microbes grow slowly or not at all most of the time: estimates of doubling times in soils and the deep subsurface range from days to years, or longer, and *E. coli* in the mammalian gut is thought to double only once or twice a day. Exponential growth in a flask lasts a few hours. Equally, a doubling time measured by optical density may differ from one measured by viable counts, if cells change in size or some fail to divide.
:::

## Continuous culture: the chemostat

In a batch culture the environment changes continuously. To study cells growing at a fixed rate in a constant environment, Monod (1950) and, independently, Aaron Novick and Leo Szilard (1950), invented continuous culture. Novick and Szilard named their device the **chemostat**.

::: definition Chemostat {#def-chemostat}
A **chemostat** is a culture vessel of fixed volume $V$ into which fresh medium, containing the limiting substrate at concentration $S_R$, is pumped at a flow rate $F$, while culture is removed at the same rate. The **dilution rate** is $D = F/V$ (h⁻¹). The culture is stirred so that its contents are uniform.
:::

::: proposition Steady states of the chemostat {#prop-chemostat}
With Monod growth [[#eq-monod]] and constant yield $Y$, the chemostat obeys

$$
\frac{dX}{dt} = (\mu(S) - D)X, \qquad \frac{dS}{dt} = D(S_R - S) - \frac{\mu(S)X}{Y}.
$$ {#eq-chemostat}

If $D < D_c = \mu_\mathrm{max} S_R/(K_s + S_R)$, there is a stable steady state with

$$
\mu = D, \qquad S^* = \frac{K_sD}{\mu_\mathrm{max} - D}, \qquad X^* = Y(S_R - S^*).
$$ {#eq-chemostat-ss}

If $D > D_c$, the cells cannot grow as fast as they are diluted and the culture **washes out** ($X \to 0$, $S \to S_R$).
:::

::: proof
At a steady state with $X^* > 0$, $dX/dt = 0$ requires $\mu(S^*) = D$. Solving $\mu_\mathrm{max} S/(K_s + S) = D$ for $S$ gives $S^* = K_sD/(\mu_\mathrm{max} - D)$, which is a positive concentration below $S_R$ exactly when $D < D_c$. Then $dS/dt = 0$ gives $D(S_R - S^*) = DX^*/Y$, so $X^* = Y(S_R - S^*)$. If $D \ge D_c$, then $\mu(S) \le \mu(S_R) \le D$ for every attainable $S \le S_R$ and $X$ cannot increase, so the only steady state is washout. Stability of the non-trivial steady state follows from linearising [[#eq-chemostat]]: the total $Z = X + YS$ obeys $dZ/dt = D(YS_R - Z)$, so it relaxes to $YS_R$ at rate $D$, and on the line $Z = YS_R$ the equation for $X$ has a single stable equilibrium at $X^*$, because $\mu - D$ decreases as $X$ increases (and $S$ falls) through it.
:::

The remarkable conclusion is that the experimenter sets the growth rate by choosing $D$: the cells consume substrate until its concentration is just low enough that they grow exactly as fast as they are washed out. The steady-state substrate concentration depends only on $D$ and the organism's $K_s$ and $\mu_\mathrm{max}$, not on $S_R$, which determines only the density of cells.

::: example Running a chemostat {#ex-chemostat}
A bacterium has $\mu_\mathrm{max} = 1.0$ h⁻¹, $K_s = 10$ mg L⁻¹ for glucose and $Y = 0.5$. It is grown in a chemostat with $S_R = 2$ g L⁻¹ (2000 mg L⁻¹). (a) At $D = 0.5$ h⁻¹, find $S^*$, $X^*$, the doubling time and the productivity $DX^*$. (b) What is the critical dilution rate? (c) What happens to $S^*$ and $X^*$ if $S_R$ is doubled?
::: solution
(a) $S^* = 10\times0.5/(1.0 - 0.5) = 10$ mg L⁻¹. $X^* = 0.5\times(2000 - 10) = 995$ mg L⁻¹, about 1.0 g L⁻¹. The cells grow at $\mu = 0.5$ h⁻¹, so $t_d = 0.693/0.5 = 1.39$ h. Productivity: $0.5\times0.995 = 0.50$ g L⁻¹ h⁻¹.

(b) $D_c = 1.0\times2000/(10 + 2000) = 0.995$ h⁻¹. Running close to $D_c$ is risky: a small increase in flow washes the culture out.

(c) $S^*$ is unchanged (it depends only on $D$, $K_s$, $\mu_\mathrm{max}$); $X^*$ roughly doubles to $0.5\times(4000 - 10) = 2.0$ g L⁻¹.
:::
:::

::: intuition Competition in a chemostat
Two species limited by the same substrate in a chemostat cannot both persist: at steady state each needs $\mu(S) = D$, which happens at the substrate concentration $S^*$ characteristic of that species. The species with the lower $S^*$ — the one that can grow at rate $D$ on less food — draws the substrate down below the level the other needs, and the other washes out. This is the microbial version of the competitive exclusion principle and of resource-ratio theory in ecology ([[ecology]]), and it has been confirmed in chemostat experiments with bacteria and algae. Coexistence requires something more: two limiting resources, cross-feeding, predators, or a fluctuating environment.
:::

Chemostats are used to study physiology at a fixed growth rate, to grow cells for industrial production, and for **experimental evolution**: in a chemostat, mutants with a lower $S^*$ take over in a few hundred generations, and their genomes reveal how adaptation to nutrient limitation works. Serial batch transfer is the other common regime: in Richard Lenski's long-term evolution experiment, twelve populations of *E. coli* have been transferred daily into fresh glucose-limited medium since 1988, passing 75,000 generations by the early 2020s, and one population evolved the ability to grow on citrate in air, a trait that defines *E. coli* as a species (Zachary Blount, Christina Borland and Lenski, 2008); see [[evolution/natural-selection]].

::: quiz
In a glucose-limited chemostat at steady state, the experimenter increases the dilution rate from 0.2 to 0.4 h⁻¹ (still below the critical rate). After the culture settles, what has happened?
- [ ] The growth rate is unchanged, and cell density halves.
- [x] The growth rate has doubled, the residual glucose concentration has risen, and the cell density has fallen slightly.
- [ ] The residual glucose concentration has fallen, because cells grow faster.
- [ ] The growth rate has doubled and the cell density has doubled.
::: solution
At steady state $\mu = D$, so the cells now grow at 0.4 h⁻¹. To grow faster they need a higher substrate concentration, $S^* = K_sD/(\mu_\mathrm{max} - D)$, which rises with $D$. Since $X^* = Y(S_R - S^*)$, the density falls by $Y$ times the increase in $S^*$ — usually a small amount, because $S^*$ is far below $S_R$ except near washout.
:::
:::

## Environmental limits to growth

Every microbe grows only within a range of each physical and chemical condition, with a minimum, an optimum and a maximum — the **cardinal values**. Microbes as a whole span ranges far wider than any animal or plant can tolerate.

### Temperature

| class | growth range (approximate) | examples |
|---|---|---|
| psychrophiles | below 0 to about 20 °C, optimum ≤ 15 °C | sea-ice algae and bacteria, *Psychromonas* |
| psychrotolerant | 0 to about 35 °C | *Listeria monocytogenes*, *Pseudomonas* spoilage bacteria |
| mesophiles | about 10 to 45 °C, optimum 20–40 °C | *E. coli*, most bacteria of soils and animals |
| thermophiles | about 45 to 80 °C | *Thermus aquaticus*, *Geobacillus stearothermophilus* |
| hyperthermophiles | optimum above 80 °C | *Pyrococcus furiosus*, *Pyrolobus fumarii*, *Methanopyrus kandleri* |

The highest temperature at which growth has been recorded is 122 °C, by *Methanopyrus kandleri* strain 116 under high pressure ([[diversity-of-life/bacteria-archaea]]); the lowest at which cell division has been observed is around −15 °C in brines. The growth curve against temperature is typically asymmetric: growth rate rises gradually to the optimum, roughly in the manner of chemical reaction rates, and falls steeply above it as proteins denature and membranes become too fluid. Below the minimum, membranes become too rigid and enzymes too slow.

Thermophiles stabilise their proteins with more ionic interactions, tighter hydrophobic cores and fewer heat-labile residues; their membranes have longer, more saturated fatty acids or, in archaea, tetraether lipids ([[microbiology/microbial-cells]]). Hyperthermophiles have **reverse gyrase**, which introduces positive supercoils into DNA. Psychrophiles have flexible enzymes with high activity at low temperature, unsaturated membranes, and antifreeze and cold-shock proteins.

::: proposition The square-root model {#prop-ratkowsky}
Below the optimum, the growth rates of many bacteria are described **empirically** by the square-root relation of David Ratkowsky and colleagues (1982),

$$
\sqrt{\mu} = b\,(T - T_\mathrm{min}),
$$ {#eq-ratkowsky}

where $T_\mathrm{min}$ is a notional minimum temperature (the intercept of the fitted line, not necessarily the lowest temperature at which growth is observed) and $b$ is a fitted constant. It describes data better than the Arrhenius equation over the whole sub-optimal range, but it has no derivation from first principles.
:::

::: example Why refrigeration works {#ex-ratkowsky}
For a psychrotolerant spoilage bacterium, a fit gives $T_\mathrm{min} = 2$ °C and $b = 0.03$ h^−1/2^ °C⁻¹. Predict the doubling times at 37 °C, at 10 °C and at 4 °C, and compare the number of doublings in a week at 4 °C with that at 10 °C.
::: solution
At 37 °C: $\sqrt\mu = 0.03\times35 = 1.05$, so $\mu = 1.10$ h⁻¹ and $t_d = 0.693/1.10 = 0.63$ h (if 37 °C is still below the organism's optimum; in practice it may not be). At 10 °C: $\sqrt\mu = 0.24$, $\mu = 0.058$ h⁻¹, $t_d = 12$ h. At 4 °C: $\sqrt\mu = 0.06$, $\mu = 0.0036$ h⁻¹, $t_d = 193$ h, about 8 days. In a week (168 h) the population doubles 14 times at 10 °C (a 16,000-fold increase) but less than once at 4 °C. A few degrees near the minimum make an enormous difference, which is why a refrigerator should be kept at or below about 4–5 °C.
:::
:::

### pH

Most bacteria are **neutrophiles**, growing best at pH 5.5–8. **Acidophiles** grow best below pH 5.5, and some, such as the archaeon *Picrophilus*, near pH 0; **alkaliphiles** grow at pH 9–11 in soda lakes and other alkaline environments. Whatever the external pH, cells keep their cytoplasm much closer to neutrality: an acidophile at pH 2 may maintain an internal pH of about 6.5, and an alkaliphile at pH 10.5 an internal pH near 8.5. They do so by pumping protons, by controlling the permeability of their membranes, and by adjusting the balance of the proton-motive force between the pH gradient and the membrane potential ([[biochemistry/oxidative-phosphorylation#prop-pmf]]). Alkaliphiles have the special problem of making ATP when the pH gradient runs the wrong way, and many of them use sodium gradients instead of proton gradients for transport and motility.

Many microbes alter the pH of their surroundings: fermenters acidify their medium, which is why lactic acid bacteria preserve food, and why growth media are buffered.

### Water availability

Water availability is measured by the **water activity** $a_w$, the ratio of the vapour pressure of water over a solution to that over pure water (pure water has $a_w = 1$, sea water about 0.98). Solutes and drying lower $a_w$. Most bacteria need $a_w$ above about 0.9; many fungi and yeasts grow down to about 0.8, and the most tolerant (**xerophiles**, such as the mould *Xeromyces bisporus*) to about 0.61. **Halophiles** require salt: moderate halophiles grow best at 1–3 mol L⁻¹ NaCl, and extreme halophiles, mostly haloarchaea, in near-saturated brine (about 5 mol L⁻¹).

There are two strategies for living in salt. Most bacteria and many archaea accumulate organic **compatible solutes** — glycine betaine, ectoine, proline, trehalose — which balance the external osmotic pressure without interfering with enzymes. Haloarchaea and a few bacteria such as *Salinibacter ruber* instead accumulate K⁺ to molar concentrations ("salt-in"); their proteins have evolved to work in high salt, with many acidic residues on their surfaces, and they denature in fresh water. Lowering water activity by drying, salting or adding sugar is one of the oldest methods of preserving food.

### Oxygen

Oxygen is a powerful electron acceptor but also a source of toxic **reactive oxygen species** — superoxide (O₂⁻), hydrogen peroxide (H₂O₂) and the hydroxyl radical (·OH) — formed when reduced flavoproteins and other enzymes react with O₂ ([[biochemistry/oxidative-phosphorylation]]). Organisms that live with oxygen protect themselves with **superoxide dismutase** (2 O₂⁻ + 2 H⁺ → H₂O₂ + O₂), **catalase** (2 H₂O₂ → 2 H₂O + O₂) and peroxidases.

::: definition Oxygen classes {#def-oxygen}
- **Obligate aerobes** require O₂ for respiration (*Pseudomonas*, *Micrococcus*, *M. tuberculosis*).
- **Microaerophiles** require O₂ but at reduced concentrations, being damaged by atmospheric levels (*Campylobacter*, *Helicobacter*, many magnetotactic bacteria).
- **Facultative anaerobes** grow with or without O₂, respiring when it is available and fermenting or respiring other acceptors when it is not (*E. coli*, *Saccharomyces cerevisiae*); they grow faster with O₂.
- **Aerotolerant anaerobes** never use O₂ but tolerate it (most lactic acid bacteria).
- **Obligate (strict) anaerobes** are killed or inhibited by O₂; many lack catalase and superoxide dismutase (*Clostridium*, *Bacteroides*, methanogens).
:::

These classes are revealed in tubes of a medium containing a reducing agent and a redox indicator, in which oxygen diffuses only into the top: obligate aerobes grow in a band at the surface, microaerophiles a little below, obligate anaerobes only at the bottom, facultative anaerobes throughout but densest at the top, and aerotolerant anaerobes evenly throughout. Strict anaerobes must be cultured in sealed jars or anaerobic chambers in which oxygen has been removed.

**Pressure** matters in the deep sea, where it rises by about 10 MPa (100 atm) per kilometre of depth: **piezophiles** (barophiles) grow best at high pressures, some only above 50 MPa.

::: application Predictive microbiology in food safety
The equations of this chapter are used every day in the food industry. Models that combine growth rate as a function of temperature (like [[#eq-ratkowsky]]), pH and water activity, fitted to laboratory data for organisms such as *Listeria monocytogenes*, *Salmonella* and *Clostridium botulinum*, predict how many doublings a population would undergo during storage and distribution, and so set shelf lives and storage temperatures. The approach is called **predictive microbiology**, and its models are combined with "hurdles" — several mild barriers (slight acidity, reduced water activity, cold, preservatives) that together prevent growth where none alone would. The kinetics of killing by heat and disinfectants are the subject of [[microbiology/antimicrobials]].
:::

::: history
Monod's thesis on bacterial growth (1942) and his review "The growth of bacterial cultures" (1949) defined the growth curve, diauxie and the hyperbolic dependence of growth rate on substrate concentration. The chemostat was described in 1950 by Monod and by Novick and Szilard, who used it to measure mutation rates in steadily growing bacteria. Schaechter, Maaløe and Kjeldgaard (1958) related cell size and composition to growth rate, and Cooper and Helmstetter (1968) explained the bacterial cell cycle by overlapping rounds of replication. Thomas Brock's isolation of *Thermus aquaticus* from Yellowstone (1969) opened the study of life at high temperatures, and Karl Stetter's isolations of hyperthermophilic archaea from the 1980s raised the known limit above 100 °C. Single-cell methods since the 2000s have revisited these classical laws cell by cell.
:::

::: summary
- Bacteria divide by binary fission organised by FtsZ, positioned by the Min system and nucleoid occlusion. In *E. coli* replication takes $C \approx 40$ min and the gap to division $D \approx 20$ min; multifork replication allows faster division, with $2^{(C+D)/\tau}$ origins per cell and ori/ter ratio $2^{C/\tau}$.
- Exponential growth: $N = N_0e^{\mu t}$, $t_d = \ln2/\mu$, generations $n = 3.32\log_{10}(N/N_0)$. Cell size and ribosome content increase with growth rate.
- Batch culture shows lag, exponential, stationary and death phases; diauxie on two sugars. Monod: $\mu = \mu_\mathrm{max} S/(K_s + S)$ (empirical) with yield $Y$; final biomass $X_0 + YS_0$.
- In a chemostat the dilution rate sets the growth rate: $\mu = D$, $S^* = K_sD/(\mu_\mathrm{max} - D)$, $X^* = Y(S_R - S^*)$, with washout above $D_c$. The species with the lowest $S^*$ wins competition for a single resource.
- Microbes grow from below 0 °C to 122 °C, from pH near 0 to above 11, and down to water activity 0.61; growth below the optimum often follows $\sqrt\mu = b(T - T_\mathrm{min})$ (empirical).
- Oxygen classes — obligate aerobes, microaerophiles, facultative anaerobes, aerotolerant and obligate anaerobes — reflect the use of O₂ and defences against reactive oxygen species (superoxide dismutase, catalase).
:::

## Exercises

::: exercise Generations {level=1 check="23.3"}
A culture grows from $10^2$ to $10^9$ cells per mL. How many generations has it gone through (one decimal place)?
::: solution
$n = 3.32\times\log_{10}(10^9/10^2) = 3.32\times7$; more precisely $7/\log_{10}2 = 7/0.30103 = 23.3$ generations.
:::
:::

::: exercise Doubling time from counts {level=1 check="45"}
Viable counts in exponential phase are $2.0\times10^5$ CFU mL⁻¹ at 1 h and $3.2\times10^6$ CFU mL⁻¹ at 4 h. What is the doubling time in minutes?
::: solution
The increase is 16-fold, four doublings, in 3 h = 180 min, so $t_d = 45$ min. ($\mu = \ln 16/3 = 0.924$ h⁻¹.)
:::
:::

::: exercise Oxygen classes {level=1}
Classify each organism: (a) grows only at the bottom of a tube of reduced medium and has no catalase; (b) grows throughout the tube, best at the top; (c) grows in a narrow band a few millimetres below the surface; (d) grows evenly throughout and makes lactic acid whether or not O₂ is present.
::: solution
(a) Obligate anaerobe. (b) Facultative anaerobe (faster growth where it can respire O₂). (c) Microaerophile. (d) Aerotolerant anaerobe: it ferments regardless and is not harmed by O₂.
:::
:::

::: exercise Ori/ter ratio from sequencing {level=2 check="24"}
DNA from an exponentially growing culture is sequenced, and read depth near the origin is 3.0 times that near the terminus. If the C period is 38 min, estimate the doubling time in minutes.
::: hint
Use [[#eq-ori-ter]] and solve for $\tau$.
:::
::: solution
$2^{C/\tau} = 3$, so $C/\tau = \log_2 3 = 1.585$ and $\tau = 38/1.585 = 24.0$ min. Because $\tau < C$, these cells must be using multifork replication.
:::
:::

::: exercise Yield {level=2 check="0.45"}
In a batch culture with 5 mmol L⁻¹ glucose (molar mass 180 g mol⁻¹), the biomass increases from 0.02 to 0.425 g dry weight L⁻¹ when the glucose is exhausted. What is the yield in g dry weight per g glucose (two significant figures)?
::: solution
Glucose: $5\times10^{-3}\times180 = 0.90$ g L⁻¹. $Y = (0.425 - 0.02)/0.90 = 0.405/0.90 = 0.45$ g g⁻¹.
:::
:::

::: exercise Chemostat steady state {level=2 check="0.5"}
A bacterium with $\mu_\mathrm{max} = 0.8$ h⁻¹ and $K_s = 5$ mg L⁻¹ is grown in a chemostat at $D = 0.4$ h⁻¹ with $S_R = 1$ g L⁻¹ and $Y = 0.5$. What is the steady-state biomass in g L⁻¹ (one significant figure), and what is $S^*$?
::: solution
$S^* = 5\times0.4/(0.8 - 0.4) = 5$ mg L⁻¹. $X^* = 0.5\times(1000 - 5) = 497.5$ mg L⁻¹ $\approx 0.5$ g L⁻¹.
:::
:::

::: exercise Washout {level=2}
For the organism of the previous exercise, (a) what is the critical dilution rate? (b) The pump is accidentally set to $D = 1.0$ h⁻¹. Starting from the steady state, roughly how fast does the cell density fall? (c) Why does $\mu$ not rise to match?
::: solution
(a) $D_c = 0.8\times1000/(5 + 1000) = 0.796$ h⁻¹. (b) Once the substrate concentration rises towards $S_R$, cells grow at nearly $\mu_\mathrm{max} = 0.8$ h⁻¹ but are diluted at 1.0 h⁻¹, so the density falls as $e^{-(1.0 - 0.8)t} = e^{-0.2t}$ — a halving roughly every 3.5 h; at first, before the substrate rises, it falls faster, at nearly $e^{-0.6t}$. (c) The growth rate cannot exceed $\mu_\mathrm{max}$, however much substrate is available.
:::
:::

::: exercise A diauxic curve {level=2}
*E. coli* is grown on a mixture of 0.5 g L⁻¹ glucose and 0.5 g L⁻¹ lactose. The OD rises exponentially with a doubling time of 40 min, stops for 30 min, then rises exponentially again with a doubling time of 55 min, reaching about twice the OD at the pause. (a) Explain each phase. (b) Why does the second phase reach about twice the first plateau? (c) Predict the curve for a *lacI*^−^ mutant, which makes the *lac* enzymes constitutively.
::: solution
(a) First phase: growth on glucose while catabolite repression and inducer exclusion keep the *lac* operon off. Pause: glucose is exhausted, cAMP rises, and the cells induce and synthesise the *lac* enzymes (a second lag). Second phase: growth on lactose, slower because lactose supports a lower growth rate. (b) Each sugar supports about the same yield per gram, so the lactose phase adds about as much biomass as the glucose phase did, doubling the density. (c) The *lac* enzymes are already present, so the pause should be shorter or absent, but glucose is still preferred, partly through inducer exclusion and the regulation of other pathways, so a change in slope may remain. ([[molecular-biology/bacterial-gene-regulation]].)
:::
:::

::: exercise Competition for one substrate {level=3}
Species A has $\mu_\mathrm{max} = 1.0$ h⁻¹, $K_s = 20$ µmol L⁻¹; species B has $\mu_\mathrm{max} = 0.5$ h⁻¹, $K_s = 2$ µmol L⁻¹. (a) Which wins in a chemostat at $D = 0.1$ h⁻¹, and which at $D = 0.4$ h⁻¹? (b) At what dilution rate are they equal? (c) Which would you expect to dominate in a nutrient-poor lake, and which in a sewage outlet? Relate to the ideas of "oligotrophs" and "copiotrophs".
::: solution
(a) $S^*_A = 20D/(1 - D)$ and $S^*_B = 2D/(0.5 - D)$. At $D = 0.1$: $S^*_A = 2.22$, $S^*_B = 0.5$ µmol L⁻¹, so B wins. At $D = 0.4$: $S^*_A = 13.3$, $S^*_B = 8.0$, so B still wins. (b) Setting $20D/(1 - D) = 2D/(0.5 - D)$: $20(0.5 - D) = 2(1 - D)$, so $10 - 20D = 2 - 2D$, $D = 8/18 = 0.444$ h⁻¹; above this A wins, until it too approaches washout near $D = 0.98$ h⁻¹ at high $S_R$. (c) B, with its high affinity, is an **oligotroph**, favoured where substrate is scarce and growth slow; A, fast but needing more substrate, is a **copiotroph**, favoured where nutrients are abundant or come in pulses (as in a sewage outlet, or in a batch culture, where the fastest grower takes the most).
:::
:::

::: exercise Interpreting a temperature series {level=3}
The growth rate of a bacterium is measured at several temperatures: 0.016 h⁻¹ at 5 °C, 0.144 h⁻¹ at 10 °C, 0.40 h⁻¹ at 15 °C, 0.78 h⁻¹ at 20 °C, 1.30 h⁻¹ at 25 °C, 1.10 h⁻¹ at 30 °C and 0.10 h⁻¹ at 33 °C. (a) Use the first four points to estimate $b$ and $T_\mathrm{min}$ of the square-root model. (b) Where is the optimum, and what class of organism is this? (c) Why does the growth rate fall so steeply above the optimum?
::: solution
(a) $\sqrt\mu$: 0.126, 0.379, 0.632, 0.883 at 5, 10, 15, 20 °C. The increments are almost constant, about 0.253 per 5 °C, so $b \approx 0.0505$ h^−1/2^ °C⁻¹, and the line reaches zero at $T_\mathrm{min} \approx 5 - 0.126/0.0505 = 2.5$ °C. (b) The optimum is near 25 °C, with a maximum near 33–35 °C: a psychrotolerant mesophile, capable of growth (slowly) in a refrigerator — a spoilage or food-safety concern. (c) Above the optimum, proteins and other macromolecules begin to denature and membranes lose integrity; denaturation is a cooperative process whose rate rises very steeply with temperature, so the decline is much sharper than the rise.
:::
:::
