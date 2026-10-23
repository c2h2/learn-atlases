General chemistry gave you the vocabulary of kinetics — the rate, the rate law, the three integrated laws, the half-life — and a first glimpse of how a rate is measured ([[general-chemistry-2/rates-intro]]). This chapter does what a physical chemistry course is supposed to do with that vocabulary: it takes it apart. A rate law is never *seen*, only inferred, and the inference runs through a chain of operations — a physical signal becomes a concentration, a concentration–time record becomes an order, an order and a concentration become a rate constant — and every link in that chain has its own assumptions and its own characteristic failures. We will follow reactions in time with real instruments, convert signals into concentrations with care, derive the integrated rate laws as proper theorems rather than quoted tables, use half-lives as a measuring stick for order, solve the reversible first-order problem so that the equilibrium constant emerges from two rate constants, and finish by examining, honestly, why the straight-line plots of the textbook are weaker evidence than they look.

## Following a reaction in time

Every kinetic experiment is a translation: something you can measure — colour, pressure, rotation, conductance — stands in for a concentration you cannot see.

::: definition Kinetic trace and working curve {#def-kinetic-trace}
A **kinetic trace** is a record of some physical property $Q(t)$ of the reacting mixture as a function of time, measured under conditions (constant volume, constant temperature, no mixing artefacts) under which $Q$ changes only because composition changes. A **working curve** (calibration) is an independently measured relation between $Q$ and concentration — ideally a linear one, $Q = \alpha + \beta\,[\mathrm{X}]$, built from standard mixtures of known composition. A method of following a reaction is *direct* if it measures a reactant or product itself (a chemical analysis of withdrawn samples, an electrode selective for one ion) and *indirect* if it measures a property that correlates with composition (absorbance, pressure, rotation).
:::

The universal requirements are these. The probe must be fast compared with the reaction (a balance reading is useless for a millisecond process), it must not perturb what it measures (a thermometer that boils the sample, a sampling pipette that stops the reaction late), and the property must be additive over the species present so that the mixture's signal can be resolved into contributions.

The workhorse of solution kinetics is the **spectrophotometer**. If exactly one species absorbs at the chosen wavelength, the recorded **absorbance** is proportional to its concentration:

::: proposition The Beer–Lambert law {#prop-beer-lambert}
A beam of monochromatic light of incident intensity $I_0$ crossing a homogeneous solution of path length $l$ with absorber concentration $c$ emerges with intensity $I$ such that the **absorbance**
$$
A = \log_{10}\frac{I_0}{I} = \varepsilon\, l\, c,
$$
where $\varepsilon$ is the **molar absorption coefficient** of the absorber at that wavelength, tabulated in $\mathrm{dm^{3}\,mol^{-1}\,cm^{-1}}$ for $l$ in $\mathrm{cm}$. The law holds for dilute solutions (typically $A \lesssim 1$) where absorbing molecules act independently, and absorbances are **additive**: a mixture gives $A = \sum_i \varepsilon_i l c_i$, which is how two spectra can be resolved into two concentrations.
:::

::: example Absorbance to concentration to rate {#ex-beer-lambert}
A colourless reactant yields a yellow product that alone absorbs at $\mathrm{430\,nm}$. Standards of the product give $\varepsilon l = 2.00\times10^{3}\ \mathrm{dm^{3}\,mol^{-1}}$ for the $1.00\ \mathrm{cm}$ cell used. In a run, $A = 0.800$ at $t = 0$ (a blank reading of a little product already formed) and $A = 0.560$ at $t = 100.0\ \mathrm{s}$. What are the product concentrations and the average rate of formation over this interval?
::: solution
Beer–Lambert with $l$ folded into the calibrated product $\varepsilon l$:
$$
[\mathrm{P}]_0 = \frac{0.800}{2.00\times10^{3}} = 4.00\times10^{-4}\ \mathrm{mol\,dm^{-3}},
\qquad
[\mathrm{P}] = \frac{0.560}{2.00\times10^{3}} = 2.80\times10^{-4}\ \mathrm{mol\,dm^{-3}}.
$$
The absorbance *fell*, so the absorbing species is being consumed despite the "product" framing of the calibration — a good habit is to check that the sign of $\mathrm{d}A/\mathrm{d}t$ matches the chemistry. Taking the species as a reactant, the average rate of consumption over $100.0\ \mathrm{s}$ is
$$
\bar{v} = \frac{(4.00 - 2.80)\times10^{-4}}{100.0} = 1.20\times10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}.
$$
Three significant figures are justified because $A$ is quoted to three; the *initial* rate would be larger than this average, since the rate falls as concentration falls.
:::
:::

::: warning Beer–Lambert is a law of dilute, ideal solutions {#warn-beer}
At high absorbance ($A \gtrsim 1$, i.e. less than a tenth of the light surviving) the linearity fails: stray light of unabsorbed wavelengths reaches the detector, and molecules close enough to interact no longer absorb independently. A "kinetics" run that drifts from linear response turns a straight first-order trace into a curved one and hands you a wrong $k$. Check linearity with standards spanning the concentration range, dilute if $A > 1$, and remember the other traps: an absorbing *product*, bubbles or turbidity scattering light, and a reaction so fast that the trace is mostly the instrument's response function.
:::

Four more classical transducers deserve names. **Conductimetry** follows any reaction that changes the number or kind of ions: in the saponification of an ester, mobile $\mathrm{OH^-}$ is replaced by sluggish $\mathrm{CH_3COO^-}$ and the conductance falls roughly linearly with extent at moderate concentrations. **Manometry** follows gas-phase reactions with a change in the number of gas molecules at constant volume and temperature: total pressure is proportional to total amount, so a pressure transducer records the progress (we use it in example [[#ex-manometry]]). **Polarimetry** follows chiral species by their rotation of plane-polarised light, $\alpha = [\alpha]\,l\,c$: the inversion of sucrose is the textbook case, and it has the charm that one measures differences $\alpha_t - \alpha_\infty$ without ever knowing absolute concentrations. **Quenching and chemical sampling** — Bodenstein's own method — withdraws a known aliquot at a known time, kills the reaction (by dilution, cooling, or a fast chemical trap), and analyses it; slow reactions and reactions with no convenient physical signal are still studied this way.

When the reaction is fast, the mixing time is the experiment. In **flow methods** two reactant solutions meet in a mixing chamber and the mixture flows past a detector: the position along the tube *is* the reaction time. The **stopped-flow** variant mixes a few $\mathrm{cm^3}$ in about a millisecond and then watches a stationary observation cell — dead times of $1\text{–}5\ \mathrm{ms}$, enough for a vast amount of solution chemistry. Below that reach lie the **relaxation methods**: a small perturbation (a temperature or pressure jump, an electric-field jump) displaces an equilibrium mixture a few per cent from equilibrium, and the return — a *relaxation* — is followed spectrophotometrically. Because the perturbation is small and the mixture already contains everything, relaxation methods reach microseconds and beyond, and they are the natural way to study fast equilibria; we will see in [[#prop-reversible]] exactly what a relaxation measures.

::: history
The discipline of measuring fast reactions is largely a story of three devices. Max **Bodenstein**, from the 1880s on, built the quench-analysis and pressure methods with which he mapped the hydrogen–iodine and ester systems and, in 1913, introduced the steady-state idea. The **stopped-flow** method was created by Britton Chance in 1951 for enzyme kinetics and made routine by Gutfreund and by Sturtevant, opening the millisecond world of biochemistry. In 1953 Manfred **Eigen** introduced the temperature-jump relaxation method — discharge-heating a few $\mathrm{cm^3}$ of solution by a capacitor bank in microseconds — and with it measured proton-transfer rates near the diffusion limit; he shared the 1967 Nobel Prize in Chemistry with Norrish and Porter, whose flash photolysis covered the same frontier from the photochemical side.
:::

::: example Manometry: $\mathrm{N_2O_5}$ by total pressure {#ex-manometry}
Gas-phase $\mathrm{N_2O_5}$ decomposes as $2\,\mathrm{N_2O_5(g)} \rightarrow 4\,\mathrm{NO_2(g)} + \mathrm{O_2(g)}$. At $\mathrm{25\,^\circ C}$ a vessel is charged with pure $\mathrm{N_2O_5}$ to $p_0 = 40.0\ \mathrm{kPa}$; after $t = 2.00\times10^{4}\ \mathrm{s}$ the total pressure is $p = 69.6\ \mathrm{kPa}$, and after complete decomposition (and cooling back) it is $p_\infty = 100.0\ \mathrm{kPa}$. Assuming first-order kinetics, find $k$.
::: solution
Work per mole of $\mathrm{N_2O_5}$: $\mathrm{N_2O_5} \rightarrow 2\,\mathrm{NO_2} + \tfrac{1}{2}\,\mathrm{O_2}$, so reacting $x$ (in pressure units) of $\mathrm{N_2O_5}$ adds $\tfrac{3}{2}x$ to the total pressure:
$$
p = p_0 + \tfrac{3}{2}x
\qquad\Longrightarrow\qquad
p_{\mathrm{N_2O_5}} = p_0 - x = p_0 - \tfrac{2}{3}\left(p - p_0\right) = \tfrac{1}{3}\left(5p_0 - 2p\right).
$$
Complete decomposition gives $p_\infty = \tfrac{5}{2}p_0$, i.e. $5p_0 = 2p_\infty$, so the partial pressure of the reactant at any time is $p_{\mathrm{N_2O_5}} = \tfrac{2}{3}(p_\infty - p)$: the *remaining* reactant is read off the *pressure still to come*. First order in $p_{\mathrm{N_2O_5}}$ (proportional to concentration at constant $T$) gives
$$
k = \frac{1}{t}\ln\frac{p_0}{p_{\mathrm{N_2O_5}}}
= \frac{1}{t}\ln\frac{3p_\infty}{5\left(p_\infty - p\right)}
= \frac{1}{2.00\times10^{4}}\ln\frac{3 \times 100.0}{5 \times 30.4}
= \frac{0.680}{2.00\times10^{4}} = 3.4\times10^{-5}\ \mathrm{s^{-1}},
$$
matching the tabulated gas-phase value. In real work at this temperature the $\mathrm{NO_2}$ partly dimerises to $\mathrm{N_2O_4}$ and the pressure model must be corrected for that equilibrium — a nice illustration of the general rule that the *chemistry* of the measurement, not the arithmetic, is where the error lives.
:::
:::

## The method of initial rates, carefully

::: proposition The method of initial rates {#prop-initial-rates}
Suppose the rate law has the power form $v = k[\mathrm{A}]^{m}[\mathrm{B}]^{n}\cdots$ near the start of the reaction. Measure initial rates $v_0$ — the slope of the kinetic trace extrapolated to $t = 0$ — for a series of runs differing only in initial concentrations. For two runs differing only in $[\mathrm{A}]$,
$$
\frac{v_0'}{v_0} = \left(\frac{[\mathrm{A}]'}{[\mathrm{A}]}\right)^{m}
\qquad\Longleftrightarrow\qquad
m = \frac{\ln\!\left(v_0'/v_0\right)}{\ln\!\left([\mathrm{A}]'/[\mathrm{A}]\right)},
$$
with the other concentrations held fixed; runs differing in two concentrations at once determine the *sum* of the corresponding orders. Substituting back gives $k$ from any run, and the units of $k$ follow the overall order $o$ as $\mathrm{mol^{1-o}\,dm^{3(o-1)}\,s^{-1}}$.
:::

Why *initial* rates? Because at $t = 0$ the concentrations are exactly the ones you mixed; no product has accumulated to drive the reverse reaction or to inhibit or catalyse; no intermediate has built up; and side reactions with their own orders have had no time to contribute. The price is that you measure the law at one composition only, and a rate law can change with composition — so initial-rate orders are *local* orders, excellent as a first statement but not the whole story. The extrapolation itself deserves care: fit the early points of the trace to a low-order polynomial and take the slope at $t = 0$, rather than eyeballing a tangent.

::: example Initial rates with both concentrations changing {#ex-initial-no-o2}
For $2\,\mathrm{NO(g)} + \mathrm{O_2(g)} \rightarrow 2\,\mathrm{NO_2(g)}$ at $\mathrm{25\,^\circ C}$, initial-rate measurements give:

| run | $[\mathrm{NO}]/\mathrm{mol\,dm^{-3}}$ | $[\mathrm{O_2}]/\mathrm{mol\,dm^{-3}}$ | $v_0\ /\mathrm{mol\,dm^{-3}\,s^{-1}}$ |
|---|---|---|---|
| 1 | 0.010 | 0.010 | $7.0\times10^{-3}$ |
| 2 | 0.020 | 0.010 | $2.8\times10^{-2}$ |
| 3 | 0.010 | 0.020 | $1.4\times10^{-2}$ |
| 4 | 0.030 | 0.030 | $0.189$ |

Determine the orders, the overall order, and $k$.
::: solution
Runs 1→2 change only $[\mathrm{NO}]$: $m = \ln(2.8\times10^{-2}/7.0\times10^{-3})/\ln(0.020/0.010) = \ln 4/\ln 2 = 2$. Runs 1→3 change only $[\mathrm{O_2}]$: $n = \ln 2/\ln 2 = 1$. Run 1→4 changes *both* by a factor 3, so it must give the sum: $v_{0,4}/v_{0,1} = 0.189/0.0070 = 27 = 3^{m+n}$, hence $m + n = 3$ — consistent with $2 + 1$, and this is the sense in which an initial-rate table measures the overall order directly. Then from run 1,
$$
k = \frac{v_0}{[\mathrm{NO}]^2[\mathrm{O_2}]} = \frac{7.0\times10^{-3}}{(0.010)^{2}(0.010)} = 7.0\times10^{3}\ \mathrm{dm^{6}\,mol^{-2}\,s^{-1}},
$$
and runs 2–4 reproduce it: $2.8\times10^{-2}/\big((0.020)^2 \times 0.010\big) = 7.0\times10^{3}$, and $0.189/\big((0.030)^2 \times 0.030\big) = 7.0\times10^{3}$. That closure of the circle — every run giving the same $k$ — is the actual test that the power-law form and the orders are right; four runs agreeing is weak evidence, a dozen agreeing is strong.
:::
:::

## The isolation method and pseudo-order

::: algorithm The isolation method {#alg-isolation}
To reduce a multi-reactant rate law to a one-reactant problem: **(1)** Choose the reactant whose order you want, say $\mathrm{A}$. **(2)** Make every other reactant *large excess* — typically ten- to hundred-fold — so that its concentration changes by a few per cent at most while $[\mathrm{A}]$ runs its course, and is effectively constant. **(3)** The rate law collapses to $v = k_{\text{obs}}[\mathrm{A}]^{m}$ with $k_{\text{obs}} = k[\mathrm{B}]_0^{n}\cdots$, a **pseudo-$m$th-order** law; find $m$ and $k_{\text{obs}}$ by any single-reactant method. **(4)** Repeat at a second excess level: since $k_{\text{obs}} \propto [\mathrm{B}]_0^{n}$,
$$
n = \frac{\ln\!\big(k_{\text{obs}}'/k_{\text{obs}}\big)}{\ln\!\big([\mathrm{B}]_0'/[\mathrm{B}]_0\big)},
$$
and one back-substitution recovers the true $k$. **(5)** Repeat for each reactant.
:::

Pseudo-order is not a property of the reaction, it is a property of *your experiment*: the same reaction is second order in a stoichiometric mixture and pseudo-first-order in excess. That is not a defect — it is the point — but it means $k_{\text{obs}}$ values from different excess levels must never be compared without the correction of step (4).

::: example Sucrose inversion: polarimetry and a hidden catalyst {#ex-sucrose}
The acid-catalysed inversion $\mathrm{C_{12}H_{22}O_{11} + H_2O \rightarrow C_6H_{12}O_6\ (glucose) + C_6H_{12}O_6\ (fructose)}$ is followed polarimetrically at $\mathrm{25\,^\circ C}$ in $\mathrm{1.0\ mol\,dm^{-3}}$ hydrochloric acid. Representative data of the kind this experiment gives: $\alpha_0 = +26.0^{\circ}$, $\alpha_{\infty} = -8.0^{\circ}$, and $\alpha = +3.32^{\circ}$ after $100.0\ \mathrm{min}$. Find $k_{\text{obs}}$ and the half-life, and explain why doubling the acid concentration doubles $k_{\text{obs}}$ while the sucrose order stays first.
::: solution
Water is the solvent ($\approx 55\ \mathrm{mol\,dm^{-3}}$) and $\mathrm{H^+}$ is a catalyst, so both are constant and the law is pseudo-first-order in sucrose. Rotation is proportional to concentration with *opposite* signs for the dextrorotatory reactant and laevorotatory product mixture, so $\alpha_t - \alpha_\infty \propto [\text{sucrose}]_t$ and
$$
k_{\text{obs}} = \frac{1}{t}\ln\frac{\alpha_0 - \alpha_\infty}{\alpha_t - \alpha_\infty}
= \frac{1}{100.0}\ln\frac{26.0 - (-8.0)}{3.32 - (-8.0)}
= \frac{1}{100.0}\ln\frac{34.0}{11.32} = 1.10\times10^{-2}\ \mathrm{min^{-1}},
$$
and $t_{1/2} = \ln 2 / k_{\text{obs}} = 63.0\ \mathrm{min}$. Note that the whole calculation used only *differences* of rotation — no absolute calibration, no path length, no concentration. The acid dependence shows the pseudo-first-order mask hiding a real term: the true law is $v = k_{\mathrm{H}}[\text{sucrose}][\mathrm{H^+}]$, with $k_{\text{obs}} = k_{\mathrm{H}}[\mathrm{H^+}]$, so $k_{\text{obs}}$ doubles with the acid while the order *in sucrose* — the one the polarimeter actually sees — is untouched.
:::
:::

## Integrated rate laws, derived

Gen-chem quoted the integrated laws; here we prove them. Throughout, $\mathrm{A} \rightarrow$ products at constant volume with $-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k[\mathrm{A}]^{o}$, no reverse reaction, and either a single reactant or pseudo-order conditions.

::: proposition The integrated rate laws {#prop-integrated}
For initial concentration $[\mathrm{A}]_0$ at $t = 0$:

| order $o$ | $[\mathrm{A}](t)$ | straight-line plot | slope | half-life |
|---|---|---|---|---|
| 0 | $[\mathrm{A}]_0 - kt$ | $[\mathrm{A}]$ vs $t$ | $-k$ | $[\mathrm{A}]_0/2k$ |
| 1 | $[\mathrm{A}]_0\,e^{-kt}$ | $\ln[\mathrm{A}]$ vs $t$ | $-k$ | $(\ln 2)/k$ |
| 2 | $[\mathrm{A}]_0/\left(1 + kt[\mathrm{A}]_0\right)$ | $1/[\mathrm{A}]$ vs $t$ | $+k$ | $1/\left(k[\mathrm{A}]_0\right)$ |

The units of $k$ are $\mathrm{mol\,dm^{-3}\,s^{-1}}$ (zero), $\mathrm{s^{-1}}$ (first), $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ (second); only the first-order half-life is independent of $[\mathrm{A}]_0$.
:::

::: proof The zero-order law {#proof-zero}
$-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k$ says the slope is constant, so one integration gives
$$
[\mathrm{A}] = [\mathrm{A}]_0 - kt,
$$
a straight line running to zero at the *finite* time $t = [\mathrm{A}]_0/k$ — after which the rate equation simply no longer applies, because a concentration cannot go negative. Setting $[\mathrm{A}] = [\mathrm{A}]_0/2$ gives $t_{1/2} = [\mathrm{A}]_0/2k$: double the starting concentration and the half-life doubles; the reaction spends proportionally longer on each successive half. Zero order in a reactant is a signature of *saturation*: a catalyst surface or an enzyme fully occupied, or a photochemical step whose rate is set by the photon flux rather than by $[\mathrm{A}]$ at all. The rate then knows nothing about how much reactant remains, which is exactly what a constant slope means.
:::

::: proof The second-order law and the unequal-concentration case {#proof-second}
For $-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k[\mathrm{A}]^2$, separate variables — all $\mathrm{A}$ on one side, all $t$ on the other — and integrate from $[\mathrm{A}]_0$ at $t = 0$ to $[\mathrm{A}]$ at $t$:
$$
\int_{[\mathrm{A}]_0}^{[\mathrm{A}]} -\frac{\mathrm{d}[\mathrm{A}]}{[\mathrm{A}]^2} = \int_0^t k\,\mathrm{d}t
\qquad\Longrightarrow\qquad
\frac{1}{[\mathrm{A}]} - \frac{1}{[\mathrm{A}]_0} = kt,
$$
since $\int \mathrm{d}x/x^{2} = -1/x$. Then $[\mathrm{A}] = [\mathrm{A}]_0/(1 + kt[\mathrm{A}]_0)$, and setting $[\mathrm{A}] = [\mathrm{A}]_0/2$ gives $t_{1/2} = 1/\left(k[\mathrm{A}]_0\right)$: each successive half-life *doubles*, because halving the concentration quarters the rate. The reciprocal plot $1/[\mathrm{A}]$ vs $t$ with intercept $1/[\mathrm{A}]_0$ and slope $+k$ is the second-order signature.

For the genuinely two-reactant case $\mathrm{A} + \mathrm{B} \rightarrow$ products with $v = k[\mathrm{A}][\mathrm{B}]$ and *unequal* initial concentrations $[\mathrm{A}]_0 = a$, $[\mathrm{B}]_0 = b$, write $x$ for the amount reacted: $[\mathrm{A}] = a - x$, $[\mathrm{B}] = b - x$, and
$$
\frac{\mathrm{d}x}{\mathrm{d}t} = k(a-x)(b-x)
\qquad\Longrightarrow\qquad
\int_0^x \frac{\mathrm{d}x}{(a-x)(b-x)} = kt.
$$
Partial fractions, $\dfrac{1}{(a-x)(b-x)} = \dfrac{1}{a-b}\left(\dfrac{1}{b-x} - \dfrac{1}{a-x}\right)$, integrate to
$$
kt = \frac{1}{a-b}\ln\frac{b\,(a-x)}{a\,(b-x)} = \frac{1}{[\mathrm{B}]_0 - [\mathrm{A}]_0}\ln\frac{[\mathrm{B}]_0[\mathrm{A}]}{[\mathrm{A}]_0[\mathrm{B}]}.
$$
(Differentiate the right-hand side to check: the chain rule returns $1\big/\left[(a-x)(b-x)\right]$ exactly, and the expression vanishes at $x = 0$.) A plot of $\ln\!\big([\mathrm{A}]/[\mathrm{B}]\big)$ against $t$ is straight with slope $(a - b)k$ — the second-order analogue of the straight line. Letting $b \rightarrow a$ (an exercise in l'Hôpital's rule) collapses the formula to $1/[\mathrm{A}] - 1/[\mathrm{A}]_0 = kt$, as it must.
:::

::: example Saponification: second order, equal and unequal {#ex-saponification}
Ethyl ethanoate hydrolyses in alkaline solution, $\mathrm{CH_3COOC_2H_5 + OH^- \rightarrow CH_3COO^- + C_2H_5OH}$, with $k = 0.11\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ at $\mathrm{25\,^\circ C}$ (a standard tabulated value). (a) Equal volumes of $0.020\ \mathrm{mol\,dm^{-3}}$ ester and $0.020\ \mathrm{mol\,dm^{-3}}$ hydroxide are mixed: how long to $75\,\%$ reaction? (b) If instead, after mixing, hydroxide is $0.200\ \mathrm{mol\,dm^{-3}}$ against $0.020\ \mathrm{mol\,dm^{-3}}$ ester, what $k_{\text{obs}}$ and half-life does the ester see?
::: solution
(a) Mixing equal volumes halves both concentrations, so after mixing $[\mathrm{A}]_0 = [\mathrm{B}]_0 = 0.010\ \mathrm{mol\,dm^{-3}}$, and equal starting amounts of a $1:1$ reaction keep $[\mathrm{A}] = [\mathrm{B}]$ throughout: the single-reactant second-order law applies. $75\,\%$ reaction leaves $[\mathrm{A}] = 0.0025\ \mathrm{mol\,dm^{-3}}$, so
$$
t = \frac{1}{k}\left(\frac{1}{[\mathrm{A}]} - \frac{1}{[\mathrm{A}]_0}\right)
= \frac{1}{0.11}\left(\frac{1}{0.0025} - \frac{1}{0.010}\right)
= \frac{400 - 100}{0.11} = 2.7\times10^{3}\ \mathrm{s} \approx 45\ \mathrm{min}.
$$
(b) Hydroxide at twenty times the ester falls from $0.200$ to $0.1975\ \mathrm{mol\,dm^{-3}}$ (a $1.25\,\%$ change) as the ester reacts completely, so $[\mathrm{OH^-}]$ is constant and the ester obeys pseudo-first-order kinetics with
$$
k_{\text{obs}} = k[\mathrm{OH^-}]_0 = 0.11 \times 0.200 = 2.2\times10^{-2}\ \mathrm{s^{-1}},
\qquad
t_{1/2} = \frac{\ln 2}{k_{\text{obs}}} = 32\ \mathrm{s}.
$$
Conductimetry follows either run without sampling: the falling conductance tracks $\mathrm{OH^-}$ directly in (a) and is a flat background in (b), where you watch the ester through a product-independent world.
:::
:::

::: widget odesolver
f: -0.5*y^2
y0: 1
t: 0, 10
exact: 1/(1 + 0.5*t)
h: 0.1
caption: Second-order decay $y' = -k y^2$ with $k = 0.5$ and $y(0) = 1$, integrated numerically by Euler's method, Heun's method and RK4 against the exact solution $y = 1/(1+0.5t)$. The geometric fact behind the picture: the slope at height $y$ is proportional to $y^2$, so the curve starts steep and then crawls — the tail of a second-order reaction is long, and $1/y$ grows perfectly linearly. Watch the global error column shrink as the method order rises: kinetics data are usually fitted by exactly these integrators run backwards, adjusting $k$ until the computed curve matches the trace.
:::

## Half-lives and the fractional-life method

The half-life is not merely a way to quote a first-order rate — the *way half-lives change* is an order detector.

::: proposition The fractional-life method {#prop-fractional-life}
For $v = k[\mathrm{A}]^{o}$, the time $t_{1/f}$ at which $[\mathrm{A}]$ falls to a fraction $f$ of its starting value is, for $o \ne 1$,
$$
t_{1/f} = \frac{f^{\,1-o} - 1}{(o-1)\,k\,[\mathrm{A}]_0^{\,o-1}}
\qquad\Longrightarrow\qquad
t_{1/2} \propto [\mathrm{A}]_0^{\,1-o},
$$
and for $o = 1$, $t_{1/f} = \ln(1/f)/k$, independent of $[\mathrm{A}]_0$. Two consequences. **(1)** Across experiments at different $[\mathrm{A}]_0$, a half-life that is constant, halves, or doubles when $[\mathrm{A}]_0$ is doubled marks first, second, or zero order respectively. **(2)** Within one experiment, the ratios of fractional lifetimes are order fingerprints:
$$
\frac{t_{1/4}}{t_{1/2}} =
\begin{cases}
1.5 & o = 0\\
2 & o = 1\\
3 & o = 2
\end{cases}
$$
because $t_{1/4}$ is the time to reach $[\mathrm{A}]_0/4$, not "twice $t_{1/2}$" — that shortcut belongs to first order alone.
:::

::: example Order from two fractional lifetimes {#ex-fractional-life}
A reaction starting at $[\mathrm{A}]_0 = 0.050\ \mathrm{mol\,dm^{-3}}$ is $50\,\%$ complete in $40\ \mathrm{s}$ and $75\,\%$ complete in $120\ \mathrm{s}$. Find the order and $k$.
::: solution
$t_{1/4}/t_{1/2} = 120/40 = 3.0$: the second-order fingerprint. Check against the alternatives — first order would need $80\ \mathrm{s}$, zero order $60\ \mathrm{s}$. Second order also predicts successive half-lives of $40$, $80$, $160\ \mathrm{s}$, so $87.5\,\%$ completion should arrive at $280\ \mathrm{s}$ — a further measurement one can make to confirm. From $t_{1/2} = 1/(k[\mathrm{A}]_0)$,
$$
k = \frac{1}{t_{1/2}\,[\mathrm{A}]_0} = \frac{1}{40 \times 0.050} = 0.50\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
The fractional-life method is immune to the linearisation traps of the last section and to errors in the absolute calibration of the signal, because it uses only *times* at which the trace crosses fixed fractions — provided the signal really is proportional to $[\mathrm{A}]$ and $[\mathrm{A}]_0$ is known.
:::
:::

## Reversible reactions: relaxation to equilibrium

Up to now the reverse reaction was negligible. Near equilibrium it is everything, and the simplest case can be solved exactly.

::: proposition First-order approach to equilibrium {#prop-reversible}
For $\mathrm{A \underset{k_\mathrm{r}}{\overset{k_\mathrm{f}}{\rightleftharpoons}} C}$ with both steps first order, $[\mathrm{C}]_0 = 0$ and total $[\mathrm{A}] + [\mathrm{C}] = [\mathrm{A}]_0$:
$$
[\mathrm{A}](t) = [\mathrm{A}]_\mathrm{eq} + \left([\mathrm{A}]_0 - [\mathrm{A}]_\mathrm{eq}\right)e^{-t/\tau},
\qquad
\tau = \frac{1}{k_\mathrm{f} + k_\mathrm{r}},
\qquad
[\mathrm{A}]_\mathrm{eq} = \frac{k_\mathrm{r}}{k_\mathrm{f} + k_\mathrm{r}}[\mathrm{A}]_0,
$$
so the system relaxes to equilibrium with a *single* exponential whose relaxation time $\tau$ is the reciprocal of the **sum** of the rate constants, and the equilibrium constant is their **ratio**,
$$
K_\mathrm{c} = \frac{[\mathrm{C}]_\mathrm{eq}}{[\mathrm{A}]_\mathrm{eq}} = \frac{k_\mathrm{f}}{k_\mathrm{r}}.
$$
:::

::: proof Relaxation time and $K = k_\mathrm{f}/k_\mathrm{r}$ {#proof-reversible}
The net rate is $\mathrm{d}[\mathrm{A}]/\mathrm{d}t = -k_\mathrm{f}[\mathrm{A}] + k_\mathrm{r}[\mathrm{C}]$. With $[\mathrm{C}] = [\mathrm{A}]_0 - [\mathrm{A}]$,
$$
\frac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t} = -\left(k_\mathrm{f} + k_\mathrm{r}\right)[\mathrm{A}] + k_\mathrm{r}[\mathrm{A}]_0.
$$
At equilibrium the derivative vanishes, so $[\mathrm{A}]_\mathrm{eq} = k_\mathrm{r}[\mathrm{A}]_0/(k_\mathrm{f} + k_\mathrm{r})$. Now measure $[\mathrm{A}]$ from its equilibrium value: set $y = [\mathrm{A}] - [\mathrm{A}]_\mathrm{eq}$; since $\mathrm{d}y/\mathrm{d}t = \mathrm{d}[\mathrm{A}]/\mathrm{d}t$,
$$
\frac{\mathrm{d}y}{\mathrm{d}t} = -\left(k_\mathrm{f} + k_\mathrm{r}\right)y,
$$
because the constant terms cancel exactly against $k_\mathrm{r}[\mathrm{A}]_0$. This is the first-order equation again, so $y = y_0\,e^{-(k_\mathrm{f}+k_\mathrm{r})t}$: the *displacement from equilibrium* decays exponentially with $\tau = 1/(k_\mathrm{f}+k_\mathrm{r})$, even though the concentrations themselves do not vanish. Finally, at equilibrium forward and reverse *rates* are equal, $k_\mathrm{f}[\mathrm{A}]_\mathrm{eq} = k_\mathrm{r}[\mathrm{C}]_\mathrm{eq}$, which rearranges to $K_\mathrm{c} = [\mathrm{C}]_\mathrm{eq}/[\mathrm{A}]_\mathrm{eq} = k_\mathrm{f}/k_\mathrm{r}$. The equilibrium constant is not a third measurement — it is the ratio of two rate constants, and a relaxation experiment that gives $\tau$ together with $K_\mathrm{c}$ from analysis yields *both* $k_\mathrm{f}$ and $k_\mathrm{r}$ separately.
:::

::: example A relaxation experiment in numbers {#ex-reversible}
For $\mathrm{A \rightleftharpoons C}$, a temperature-jump experiment at $\mathrm{25\,^\circ C}$ gives $\tau = 133\ \mathrm{s}$ and an equilibrium mixture containing one third as much $\mathrm{A}$ as it started with. Find $k_\mathrm{f}$, $k_\mathrm{r}$ and $K_\mathrm{c}$, and the time for $[\mathrm{A}]$ to fall from $[\mathrm{A}]_0$ to $0.40\,[\mathrm{A}]_0$.
::: solution
$[\mathrm{A}]_\mathrm{eq} = [\mathrm{A}]_0/3$ identifies $k_\mathrm{r}/(k_\mathrm{f}+k_\mathrm{r}) = 1/3$, i.e. $k_\mathrm{f} = 2k_\mathrm{r}$; with $\tau^{-1} = k_\mathrm{f} + k_\mathrm{r} = 1/133 = 7.5\times10^{-3}\ \mathrm{s^{-1}}$,
$$
k_\mathrm{r} = 2.5\times10^{-3}\ \mathrm{s^{-1}},
\qquad
k_\mathrm{f} = 5.0\times10^{-3}\ \mathrm{s^{-1}},
\qquad
K_\mathrm{c} = \frac{k_\mathrm{f}}{k_\mathrm{r}} = 2.0 .
$$
For the time, solve $[\mathrm{A}]/[\mathrm{A}]_0 = \tfrac{1}{3} + \tfrac{2}{3}e^{-t/\tau} = 0.40$, so $e^{-t/\tau} = 0.10$ and
$$
t = \tau\ln 10 = 133 \times 2.303 = 3.1\times10^{2}\ \mathrm{s}.
$$
Note the asymmetry the reversible law imposes: $[\mathrm{A}]$ falls quickly at first and then *levels off at* $[\mathrm{A}]_\mathrm{eq}$ — no integrated law of the irreversible kind, no matter how you plot the data, will be straight. The relaxation never "finishes"; after $5\tau$ it is within $1\,\%$ of equilibrium, which is as finished as relaxation ever gets.
:::
:::

::: widget plot
f: (kr + kf*exp(-(kf + kr)*x/1000))/(kf + kr); (kf - kf*exp(-(kf + kr)*x/1000))/(kf + kr)
x: 0, 1500
y: 0, 1.05
sliders: kf=5:1:10:0.5; kr=2.5:0.5:8:0.5
labels: \text{A}: [\mathrm{A}]/[\mathrm{A}]_0; \text{C}: [\mathrm{C}]/[\mathrm{A}]_0
caption: Approach to equilibrium for $\mathrm{A \rightleftharpoons C}$ from pure $\mathrm{A}$: $t$ in seconds, $k_\mathrm{f}$ and $k_\mathrm{r}$ in $\mathrm{s^{-1}}$ (both $\times 10^{-3}$) set by the sliders. The plateau of the $\mathrm{A}$ curve is $k_\mathrm{r}/(k_\mathrm{f}+k_\mathrm{r})$ and the speed of arrival is governed by $k_\mathrm{f}+k_\mathrm{r}$ — two independent facts, which is why one relaxation trace plus the equilibrium composition determines both constants. Slide $k_\mathrm{r}$ up: the plateau rises *and* the approach quickens; equilibrium is not the absence of change but its fastest possible balance.
:::

::: widget newton
f: 1/3 + 2*exp(-0.0075*x)/3 - 0.4
x0: 300
x: 0, 1500
caption: Newton's method finding the time at which $[\mathrm{A}] = 0.40\,[\mathrm{A}]_0$ for the example above ($k_\mathrm{f}+k_\mathrm{r} = 7.5\times10^{-3}\ \mathrm{s^{-1}}$): the root is $t = 307\ \mathrm{s}$. Here the equation can be inverted by hand, but real relaxation traces are sums of several exponentials (every independent relaxation mode of the mechanism has its own $\tau$), and then equations like this one have no closed-form solution at all — root-finding by Newton or bisection is not a luxury but the standard way the constants are extracted from data.
:::

## The pitfalls of linearising data

The textbook recipe — try $[\mathrm{A}]$, $\ln[\mathrm{A}]$, $1/[\mathrm{A}]$ against $t$ and keep the straightest — is taught because it is simple, and mistrusted here because it is weak.

::: warning Straight lines are weak evidence {#warn-linearise}
Three reasons, in increasing order of subtlety. **(1)** Over a range of two or three half-lives, and with a few per cent of noise, first- and second-order curves are nearly indistinguishable in *any* of the three plots; "straightest by eye" resolves nothing. **(2)** Every transformation re-weights the errors: taking $\ln[\mathrm{A}]$ magnifies the relative error of small concentrations, so a fit to the log plot is dominated by the last few noisy points and its "best $k$" is not the best $k$ for the data; least squares on transformed data estimates the wrong error model. Comparing correlation coefficients between the three plots is meaningless, because each is a correlation of a *different* variable with $t$. **(3)** A straight line can be produced by the wrong mechanism entirely — a distribution of rate constants, or a slow side reaction, will bend a trace in exactly the direction that mimics a change of order. The defensible modern practice: fit the *untransformed* trace directly by nonlinear least squares with a proper error model, and confirm the order by methods that do not linearise — the fractional-life method ([[#prop-fractional-life]]), the differential method (plot $\ln v$ against $\ln[\mathrm{A}]$; the slope is the order, since $\ln v = \ln k + o\ln[\mathrm{A}]$), or the half-life scaling across runs.
:::

::: quiz
Two students analyse the same decay trace over $0\text{–}90\,\%$ reaction with $2\,\%$ noise: one plots $\ln[\mathrm{A}]$ vs $t$, the other $1/[\mathrm{A}]$ vs $t$, and *each* finds a visually straight line with $R^2 > 0.99$. What follows?
- [x] Very little: over limited ranges and with noise, different integrated laws are nearly indistinguishable, and each transform hides its own error distortion — the data must be tested by direct fitting or fractional lifetimes.
- [ ] The reaction is simultaneously first and second order.
- [ ] The student with the higher $R^2$ has proved the order, because $R^2$ compares mechanisms on equal terms.
- [ ] Straightness in $\ln[\mathrm{A}]$ proves first order; the other plot is a coincidence.
::: solution
Both plots look straight because the traces of the two laws differ only slightly once noise is added, and because $R^2$ of a transformed variable measures the fit of *that* transformed variable — the two $R^2$ values are not comparable (option 3 fails for exactly this reason). Order is not a property a plot can prove in one pass; it is a hypothesis tested by several independent diagnostics that agree.
:::
:::

## Where this leads

Everything in this chapter is evidence *for* something: a rate law is the main experimental handle on a mechanism, and [[kinetics/reaction-mechanisms]] takes up the question of which mechanisms can produce which laws, with the steady-state approximation doing the heavy lifting. Why power-law orders are usually small integers, why termolecular steps are rare, and how $k$ depends on temperature are collision-theory questions ([[kinetics/collision-theory]]) and, in their modern form, transition-state questions ([[kinetics/transition-state-theory]]). Zero order as saturation and first order as unimolecular decay reappear throughout [[kinetics/homogeneous-catalysis]] and [[kinetics/photochemistry]]. And the vocabulary of signals, calibrations and traces used here is the same one [[general-chemistry-2/rates-intro]] introduced — worth rereading once this chapter has made it precise.

::: summary
- A kinetic trace is a physical signal; converting it to concentration needs a working curve, and Beer–Lambert ($A = \varepsilon l c$) is linear only for dilute, absorbing-species-independent solutions.
- Manometry, conductimetry, polarimetry and quench sampling each convert a different observable into progress; stopped-flow reaches milliseconds, relaxation methods microseconds, and a relaxation measures $1/\tau = k_\mathrm{f} + k_\mathrm{r}$ directly.
- The method of initial rates measures local orders at the mixed composition; runs changing one reagent give single orders, runs changing several give their sum.
- The isolation method converts a multi-reactant law into a pseudo-order law; $k_{\text{obs}} = k[\mathrm{B}]_0^{n}\cdots$, and varying the excess reveals the hidden order $n$.
- The integrated laws are theorems of $-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k[\mathrm{A}]^{o}$: zero order runs out at finite time, second order has $1/[\mathrm{A}]$ linear in $t$ and doubling half-lives, and the unequal-concentration second-order law is a partial-fraction integral.
- Fractional lifetimes are order detectors: $t_{1/2} \propto [\mathrm{A}]_0^{1-o}$ across runs, and $t_{1/4}/t_{1/2} = 1.5, 2, 3$ for $o = 0, 1, 2$ within one run.
- A reversible first-order system relaxes as a single exponential with $\tau = 1/(k_\mathrm{f}+k_\mathrm{r})$ and $K_\mathrm{c} = k_\mathrm{f}/k_\mathrm{r}$: equilibrium is the ratio of two rate constants.
- Straight-line tests on transformed data are weak evidence — transforms re-weight errors and mimic each other; trust direct nonlinear fits, fractional lifetimes and the differential method.
:::

## Exercises

::: exercise Concentration from absorbance {level=1 check="0.0003"}
A product absorbs at $450\ \mathrm{nm}$ with $\varepsilon = 1.50\times10^{3}\ \mathrm{dm^{3}\,mol^{-1}\,cm^{-1}}$. A reaction mixture in a $1.00\ \mathrm{cm}$ cell reads $A = 0.450$ at this wavelength, and no other species absorbs. What is the product concentration? (Enter it in $\mathrm{mol\,dm^{-3}}$.)
::: solution
$[\mathrm{P}] = A/(\varepsilon l) = 0.450/\left(1.50\times10^{3} \times 1.00\right) = 3.00\times10^{-4}\ \mathrm{mol\,dm^{-3}}$. Three significant figures, matching the absorbance.
:::
:::

::: exercise From pseudo-order to true order {level=1 check="0.05"}
A reaction $\mathrm{A} + \mathrm{B} \rightarrow$ products is run with $[\mathrm{B}]$ buffered at a constant $0.50\ \mathrm{mol\,dm^{-3}}$, and the trace of $\mathrm{A}$ is first order with $k_{\text{obs}} = 2.50\times10^{-2}\ \mathrm{s^{-1}}$. Given that the reaction is first order in $\mathrm{B}$, what is the second-order rate constant? (Enter $k$ in $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.)
::: solution
$k_{\text{obs}} = k[\mathrm{B}]$, so $k = 2.50\times10^{-2}/0.50 = 5.0\times10^{-2}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. The pseudo-first-order constant is the true constant with the hidden concentration folded in; dividing it back out is step (4) of the isolation method.
:::
:::

::: exercise Relaxation time {level=1 check="200"}
A fast equilibrium $\mathrm{A \rightleftharpoons C}$ has $k_\mathrm{f} = 4.0\times10^{-3}\ \mathrm{s^{-1}}$ and $k_\mathrm{r} = 1.0\times10^{-3}\ \mathrm{s^{-1}}$. A small perturbation displaces the mixture slightly from equilibrium. What is the relaxation time? (Enter it in seconds.)
::: solution
$\tau = 1/(k_\mathrm{f} + k_\mathrm{r}) = 1/(5.0\times10^{-3}) = 200\ \mathrm{s}$. Note the sum: both directions contribute to the restoring rate, and the relaxation is faster than either step alone would suggest.
:::
:::

::: exercise Manometric rate constant {level=2 check="0.00006"}
For the first-order gas-phase decomposition $2\,\mathrm{N_2O_5} \rightarrow 4\,\mathrm{NO_2} + \mathrm{O_2}$, a vessel charged to $p_0 = 50.0\ \mathrm{kPa}$ reads $p = 83.8\ \mathrm{kPa}$ after $t = 1.00\times10^{4}\ \mathrm{s}$, and $p_\infty = 125.0\ \mathrm{kPa}$ after complete decomposition. Find $k$. (Enter it in $\mathrm{s^{-1}}$.)
::: solution
As in example [[#ex-manometry]], $p_{\mathrm{N_2O_5}} = \tfrac{2}{3}(p_\infty - p)$ and $p_0 = \tfrac{2}{5}p_\infty$, so
$$
k = \frac{1}{t}\ln\frac{3p_\infty}{5(p_\infty - p)} = \frac{1}{1.00\times10^{4}}\ln\frac{375}{5 \times 41.2} = \frac{\ln 1.820}{10^{4}} = 6.0\times10^{-5}\ \mathrm{s^{-1}}.
$$
The check $p_0 = 0.4 \times 125.0 = 50.0\ \mathrm{kPa}$ confirms the pressure model before any kinetics.
:::
:::

::: exercise Order from two half-lives {level=2 check="0.167"}
The same reaction gives $t_{1/2} = 60\ \mathrm{s}$ when run at $[\mathrm{A}]_0 = 0.10\ \mathrm{mol\,dm^{-3}}$ and $t_{1/2} = 30\ \mathrm{s}$ when run at $[\mathrm{A}]_0 = 0.20\ \mathrm{mol\,dm^{-3}}$. Find the order and the rate constant. (Enter $k$ in $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.)
::: solution
Doubling $[\mathrm{A}]_0$ *halves* the half-life, so $t_{1/2} \propto [\mathrm{A}]_0^{1-o}$ with $2^{1-o} = \tfrac{1}{2}$: the order is $o = 2$. Then $k = 1/(t_{1/2}[\mathrm{A}]_0) = 1/(60 \times 0.10) = 0.167\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, and the second run confirms it: $1/(30 \times 0.20) = 0.167$. Constant $k$ across runs at different concentrations is the consistency check that the order was right.
:::
:::

::: exercise Both constants from one relaxation {level=2 check="0.016"}
A relaxation experiment on $\mathrm{A \rightleftharpoons C}$ gives $\tau = 50\ \mathrm{s}$, and chemical analysis of the equilibrium mixture gives $K_\mathrm{c} = [\mathrm{C}]_\mathrm{eq}/[\mathrm{A}]_\mathrm{eq} = 4.0$. Find $k_\mathrm{f}$. (Enter it in $\mathrm{s^{-1}}$.)
::: solution
Two equations, two unknowns: $k_\mathrm{f} + k_\mathrm{r} = 1/\tau = 0.020\ \mathrm{s^{-1}}$ and $k_\mathrm{f}/k_\mathrm{r} = 4.0$. Hence $k_\mathrm{r} = 0.020/5 = 4.0\times10^{-3}\ \mathrm{s^{-1}}$ and $k_\mathrm{f} = 0.016\ \mathrm{s^{-1}}$. This is the standard two-measurement route to both constants — one dynamic ($\tau$), one static ($K_\mathrm{c}$).
:::
:::

::: exercise The general fractional-life formula {level=3}
Integrate $-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k[\mathrm{A}]^{o}$ for general order $o \ne 1$ and derive
$$
t_{1/f} = \frac{f^{\,1-o} - 1}{(o-1)\,k\,[\mathrm{A}]_0^{\,o-1}},
\qquad\text{hence}\qquad
t_{1/2} \propto [\mathrm{A}]_0^{\,1-o}.
$$
Recover the three half-lives of proposition [[#prop-integrated]] and show the formula's $o \rightarrow 1$ limit gives $t_{1/2} = (\ln 2)/k$.
::: solution
Separate variables and integrate: $-\int_{[\mathrm{A}]_0}^{[\mathrm{A}]} [\mathrm{A}]^{-o}\,\mathrm{d}[\mathrm{A}] = kt$, so $\left([\mathrm{A}]^{1-o} - [\mathrm{A}]_0^{\,1-o}\right)/(o-1) = kt$. Setting $[\mathrm{A}] = f[\mathrm{A}]_0$ and factoring $[\mathrm{A}]_0^{\,1-o}$ gives the stated formula. With $f = \tfrac{1}{2}$: $o = 0$ gives $t_{1/2} = (1 - \tfrac{1}{2})[\mathrm{A}]_0/k = [\mathrm{A}]_0/2k$; $o = 2$ gives $t_{1/2} = (2 - 1)/(k[\mathrm{A}]_0)$; and $o = \tfrac{1}{2}$ gives $t_{1/2} = (\sqrt{2} - 1)\sqrt{[\mathrm{A}]_0}/k$ — half-order half-lives shrink as the reaction proceeds. For the limit, write $o = 1 + \delta$ and expand $f^{-\delta} = e^{-\delta\ln f} \approx 1 - \delta\ln f$: then $t_{1/f} \approx (1 - \delta\ln f - 1)/(\delta k) = \ln(1/f)/k$, and $f = \tfrac{1}{2}$ gives $(\ln 2)/k$. The first-order law is not a separate case but the removable singularity of the general one.
:::
:::

::: exercise The unequal-concentration law by partial fractions {level=3}
Derive $kt = \dfrac{1}{a-b}\ln\dfrac{b\,(a-x)}{a\,(b-x)}$ for $\mathrm{A} + \mathrm{B} \rightarrow$ products with $v = k[\mathrm{A}][\mathrm{B}]$, $[\mathrm{A}]_0 = a$, $[\mathrm{B}]_0 = b$, by carrying out the partial-fraction integration in proof [[#proof-second]] in full, and prove the limit $b \rightarrow a$ recovers $1/[\mathrm{A}] - 1/[\mathrm{A}]_0 = kt$.
::: solution
From $\mathrm{d}x/\mathrm{d}t = k(a-x)(b-x)$, separate and decompose:
$$
\frac{1}{(a-x)(b-x)} = \frac{1}{a-b}\left[\frac{1}{b-x} - \frac{1}{a-x}\right],
$$
verified by putting the bracket over the common denominator. Integrating each term from $0$ to $x$ gives $\int_0^x \mathrm{d}x/(b-x) = \ln\frac{b}{b-x}$ and likewise for $a$, so
$$
kt = \frac{1}{a-b}\left[\ln\frac{b}{b-x} - \ln\frac{a}{a-x}\right] = \frac{1}{a-b}\ln\frac{b\,(a-x)}{a\,(b-x)}.
$$
For the limit, set $b = a + \varepsilon$ and $x = a\,y$ (fractional reaction of A); the logarithm becomes $\ln\!\big[(a+\varepsilon)(1-y)/(a + \varepsilon - ay)\big]$. Expanding to first order in $\varepsilon$ (equivalently, applying l'Hôpital's rule as $\varepsilon \rightarrow 0$) gives $\ln(\cdots) \approx -\varepsilon\, y/\big(a(1-y)\big)$, and dividing by $a - b = -\varepsilon$ leaves $kt = y/\big(a(1-y)\big)$. Since $[\mathrm{A}] = a(1-y)$, this is $kt = \dfrac{a - [\mathrm{A}]}{a\,[\mathrm{A}]} = \frac{1}{[\mathrm{A}]} - \frac{1}{a}$ — the equal-concentration second-order law. The unequal case is genuinely curved in $[\mathrm{A}]$ vs $t$ even though the *law* is second order: another reminder that the shape of a trace is a property of the experiment, not only of the mechanism.
:::
:::
