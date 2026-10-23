Collision theory gave kinetics its exponential: the rate constant is a collision frequency times a Boltzmann fraction, and everything else — orientation, structure, the whole molecular personality of the reactants — was swept into an unexplained steric factor $P$ that ranged from $10^{-11}$ for $\mathrm{H_2 + C_2H_4}$ to values *above* unity for reactions like $\mathrm{K + CH_3I}$ ([[kinetics/collision-theory]]). A theory whose free parameter spans twelve orders of magnitude is a bookkeeping device, not an explanation. The replacement, formulated in 1935 almost simultaneously by Henry Eyring and by Michael Evans and Michael Polanyi, asks a different question. Instead of counting collisions and begging forgiveness for structure, it assumes that reactants are in *equilibrium* with a special configuration — the **activated complex** — and borrows the entire apparatus of chemical equilibrium ([[general-chemistry-2/chemical-equilibrium]]) and Gibbs energies ([[general-chemistry-2/entropy-free-energy]]) to predict the rate constant from thermodynamic quantities that can be *measured*: an activation enthalpy and an activation entropy. The result, the **Eyring equation**, is the working language of modern physical organic, inorganic and enzymatic kinetics; the quantities it defines, $\Delta^\ddagger H$ and $\Delta^\ddagger S$, are quoted in thousands of papers a year, and the isotope effects it explains are the chemist's surest evidence for which bonds break in the rate-determining step.

## Potential energy surfaces and the reaction coordinate

::: definition Potential energy surface and reaction coordinate {#def-pes}
Within the Born–Oppenheimer approximation the electrons adjust instantaneously to the positions of the nuclei, so the energy of an $N$-atom system is a function $V$ of $3N - 6$ internal coordinates (or $3N-5$ for a linear molecule): the **potential energy surface** (PES). A stable molecule sits in a valley of this surface; a reaction is a journey from one valley (reactants) to another (products). The **reaction coordinate** is the particular path of steepest descent through the pass that connects the valleys — the **minimum energy path** — and the distance travelled along it is the coordinate $s$ that parameterises the journey.
:::

For a triatomic reaction $\mathrm{A + BC \rightarrow AB + C}$ the surface has just two dimensions (the stretch $r_\mathrm{AB}$ and the stretch $r_\mathrm{BC}$, at fixed angle) and can be drawn as a landscape. Reactants and products are minima; between them lies a pass. The mathematical fact that governs everything below is what kind of point the pass is.

::: widget surface
f: x^2 - y^2
x: -2, 2
y: -2, 2
contours: true
tangent: 0, 0
caption: The prototype of every transition state: the saddle $V = x^{2} - y^{2}$. At the origin the surface is flat in both directions (the tangent plane is horizontal), yet the origin is neither a minimum nor a maximum — going along $x$ the energy falls, going along $y$ it rises. A reaction valley running along $x$ is separated from the product valley by the *lowest* point of the pass at the origin: the transition state. The contour map shows the signature — nested closed contours around each minimum, hyperbolas through the saddle.
:::

::: definition Transition state and activated complex {#def-ts}
The **transition state** (TS) is the configuration of the system at the top of the barrier along the minimum energy path: mathematically, a *first-order saddle point* of the PES — a maximum along exactly one direction (the reaction coordinate) and a minimum along all $3N - 7$ others. The **activated complex** is the collection of configurations in the neighbourhood of the transition state, the species that occupies the pass; the double-dagger symbol $^{\ddagger}$ marks it: $\mathrm{A + B \rightleftharpoons [AB]^{\ddagger} \rightarrow P}$. Strictly, the transition state is the single saddle-point geometry; the activated complex is the region around it. In practice the distinction is honoured more often than observed.
:::

Because the transition state is a maximum along one coordinate and a minimum along the rest, its vibrational analysis has one frequency with an *imaginary* value — the curvature along $s$ is negative — and $3N - 7$ ordinary ones. An imaginary frequency is not a mystery: it is the mathematical statement that the system, displaced along $s$, accelerates away in both directions. This one fact separates a transition state from every species a chemist can bottle.

::: proposition The saddle point and the choice of dividing surface {#prop-saddle}
A rate constant measures the flux of reactive systems through a **dividing surface** separating reactants from products. TST places that surface at the saddle point, perpendicular to the reaction coordinate, because there the mean force along $s$ vanishes: at any other placement, systems that have crossed the surface are pulled back towards reactants by a systematic force and cross again, and every such **recrossing** makes the naive flux an overestimate of the true rate. At the saddle, with the surface chosen perpendicular to $s$, recrossing is minimal, and the idealisation of zero recrossing defines the transmission coefficient $\kappa \le 1$ of the next sections.
:::

The geometry of the saddle also fixes the *shape* of the activated complex. For $\mathrm{H + H_2}$ the saddle is the symmetric linear $\mathrm{H\cdots H\cdots H}$; for an $\mathrm{S_N2}$ reaction it is the trigonal-bipyramidal $\mathrm{Nu\cdots C\cdots LG}$ with partial bonds; for a Diels–Alder reaction it is the two partial $\mathrm{C\cdots C}$ bonds of the forming ring, roughly $0.2\ \mathrm{nm}$ long instead of the $0.154\ \mathrm{nm}$ of a full single bond. Transition-state geometries are now computed routinely by electronic-structure methods, and the imaginary frequency is the check that the computed saddle is the right one.

::: warning The transition state is not an intermediate {#warn-not-intermediate}
An intermediate is a minimum on the PES: it has a finite lifetime, a (small but real) barrier to escape, and ordinary vibrational frequencies — a carbocation, a tetrahedral addition intermediate, an enzyme–substrate complex. A transition state is a saddle point: it has *no* lifetime other than the $\sim 10^{-13}\ \mathrm{s}$ it takes to traverse the pass, cannot be trapped, cooled, or observed, and carries one imaginary frequency. Two intermediates separated by a transition state; a transition state is the *mountain pass between* them. Sloppy writing calls the activated complex "the molecule about to react, sitting at the top of the hill, in equilibrium" — remember that the equilibrium of the Eyring equation is a postulated quasi-equilibrium of a fleeting region, not an equilibrium of isolable species. A related trap in numbers: an activation entropy more negative than about $-200\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for a reaction in solution almost always signals a standard-state artefact, an aggregation step, or a change of mechanism — not a genuinely "tight" transition state.
:::

## The Eyring equation

The Eyring picture replaces "collision with enough energy" by "equilibrium with the activated complex, which then crosses the pass at a universal attempt frequency". Two postulates do the work: a **quasi-equilibrium** between reactants and the activated complex in the dividing layer, governed by an equilibrium constant $K^\ddagger$; and **free motion** of the complex along $s$ through the layer, with no recrossing (all recrossing is then swept into $\kappa$).

::: theorem The Eyring equation {#thm-eyring}
For an elementary step $\mathrm{R} \rightarrow$ products with activated complex $[\mathrm{R}]^{\ddagger}$ and transmission coefficient $\kappa$,
$$
k = \kappa\,\frac{k_\mathrm{B}T}{h}\,K^\ddagger ,
$$
where $K^\ddagger$ is the equilibrium constant between reactants and activated complex with the motion along $s$ removed, written with respect to a chosen standard state. The standard state must match the rate law: for a **unimolecular** step (first-order $k$, units $\mathrm{s^{-1}}$) $K^\ddagger$ is dimensionless as it stands; for a **bimolecular** step in solution (second-order $k_2$) one reactant molecule too many condenses into the complex, and
$$
k_2 = \kappa\,\frac{k_\mathrm{B}T}{h}\,K^\ddagger\,(c^\circ)^{-1},
\qquad c^\circ = 1\ \mathrm{mol\,dm^{-3}},
$$
so that $k_2$ comes out in $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$; for a gas-phase bimolecular step the analogous factor is $k_\mathrm{B}T/p^\circ$ per unit volume with $p^\circ = 1\ \mathrm{bar}$. The factor $k_\mathrm{B}T/h$ is the universal frequency: $6.2\times10^{12}\ \mathrm{s^{-1}}$ at $\mathrm{298\ K}$.
:::

::: proof Derivation of $k_\mathrm{B}T/h$ {#proof-eyring}
Let the dividing surface sit at $s = 0$ and consider the thin layer $0 \le s \le \delta$ just past it. By quasi-equilibrium, the concentration of activated complexes anywhere in the layer equals $K^\ddagger[\mathrm{R}]$ multiplied by the partition function of free translation of the complex over the length $\delta$ with the momentum along $s$ included in the counting of states — that is, $z_s = \delta\,(2\pi m k_\mathrm{B}T)^{1/2}/h$, the one-dimensional translational partition function:
$$
[\mathrm{TS}]_\text{layer} = K^\ddagger[\mathrm{R}]\,\frac{\delta\,(2\pi m k_\mathrm{B}T)^{1/2}}{h}.
$$
A complex in the layer with speed $v$ along $s$ crosses the outer edge in time $\delta/v$; averaging the *forward* speed over the half-Maxwellian gives $\langle v \rangle_+ = (k_\mathrm{B}T/2\pi m)^{1/2}$. The rate of product formation is the layer population times this attempt frequency $\langle v \rangle_+/\delta$:
$$
v = [\mathrm{TS}]_\text{layer}\,\frac{\langle v \rangle_+}{\delta}
= K^\ddagger[\mathrm{R}]\,\frac{\delta\,(2\pi m k_\mathrm{B}T)^{1/2}}{h}\cdot\frac{1}{\delta}\left(\frac{k_\mathrm{B}T}{2\pi m}\right)^{1/2}.
$$
The layer thickness $\delta$ cancels — the rate cannot depend on an arbitrary geometric choice — and the product of the two square roots is $(2\pi m k_\mathrm{B}T \cdot k_\mathrm{B}T/2\pi m)^{1/2} = k_\mathrm{B}T$, leaving
$$
v = \frac{k_\mathrm{B}T}{h}\,K^\ddagger[\mathrm{R}]
\qquad\Longrightarrow\qquad
k = \frac{v}{[\mathrm{R}]} = \kappa\,\frac{k_\mathrm{B}T}{h}\,K^\ddagger,
$$
where $\kappa \le 1$ has been restored to account for the recrossings the ideal surface lets through. The mass $m$ has cancelled too: the attempt frequency is the same for every reaction, because a heavier complex has more translational states ($z_s \propto m^{1/2}$) but moves more slowly ($\langle v\rangle_+ \propto m^{-1/2}$), and the two effects annihilate.
:::

Combining $K^\ddagger = e^{-\Delta^\ddagger G^\circ/RT}$ with $\Delta^\ddagger G^\circ = \Delta^\ddagger H^\circ - T\Delta^\ddagger S^\circ$ converts the theorem into its working thermodynamic form: for a step of molecularity $n$ in solution,

$$
k_n = \kappa\,\frac{k_\mathrm{B}T}{h}\,(c^\circ)^{1-n}\,
e^{\Delta^\ddagger S^\circ/R}\,e^{-\Delta^\ddagger H^\circ/RT}.
$$ {#eq-thermo}

This is the equation every number in this lesson feeds: $\Delta^\ddagger H$ plays the role of the barrier (an enthalpy, not an energy — the difference is $RT$ per molecule lost, as we derive below), $\Delta^\ddagger S$ plays the role of the steric factor (an entropy is a count of arrangements, and $e^{\Delta^\ddagger S/\mathrm{R}}$ replaces $P$), and $k_\mathrm{B}T/h$ replaces the collision frequency.

::: proposition The Eyring plot {#prop-eyring-plot}
Taking the logarithm of $k/T$ in equation [[#eq-thermo]] and assuming $\Delta^\ddagger H$ and $\Delta^\ddagger S$ independent of $T$ over the range studied,
$$
\ln\frac{k}{T} = \ln\!\left(\kappa\frac{k_\mathrm{B}}{h}\right) + \frac{\Delta^\ddagger S^\circ}{R} + (1-n)\ln c^\circ - \frac{\Delta^\ddagger H^\circ}{R}\cdot\frac{1}{T}.
$$
A plot of $\ln(k/T)$ against $1/T$ (the **Eyring plot**) is a straight line of slope $-\Delta^\ddagger H^\circ/R$ and intercept $\ln(\kappa k_\mathrm{B}/h) + \Delta^\ddagger S^\circ/R$ (with $c^\circ$ contributing only its unit when $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$ is used as the numerical standard state). The extra $-\ln T$ relative to the Arrhenius $\ln k$ plot removes the linear-in-$T$ factor $k_\mathrm{B}T/h$ from the data, so that the slope measures $\Delta^\ddagger H$ directly instead of $E_\mathrm{a}$; the two plots differ in practice by only a few per cent, but the *interpretation* of the slope differs.
:::

::: widget plot
f: 23.76 + ds/8.314 - dh*x/8.314
x: 2, 4
y: -70, 30
sliders: dh=62:20:120:2; ds=-150:-250:50:10
labels: \text{Eyring plot of } \ln(k/T)
caption: An Eyring plot for equation [[#eq-thermo]] with $\kappa = 1$: $\ln\!\big(k/T\,\big)$ (in units of $\mathrm{s^{-1}K^{-1}}$ for a unimolecular step) against $x = 1000/T$ in $\mathrm{K^{-1}}$, with the activation enthalpy `dh` in $\mathrm{kJ\,mol^{-1}}$ and activation entropy `ds` in $\mathrm{J\,K^{-1}\,mol^{-1}}$ set by the sliders; the constant $23.76$ is $\ln(k_\mathrm{B}/h)$. The slope is $-\Delta^\ddagger H/R$: slide `dh` from 20 to $120\ \mathrm{kJ\,mol^{-1}}$ and watch the line pivot — the barrier controls the *slope*. Slide `ds` and the line translates vertically — the entropy controls the *intercept*, multiplying the rate by $e^{\Delta^\ddagger S/R}$ without changing its temperature dependence.
:::

::: example An Eyring plot from five rate constants {#ex-eyring-plot}
The second-order rate constants of a reaction in solution are measured at five temperatures:

| $T/\mathrm{K}$ | 280 | 290 | 300 | 310 | 320 |
|---|---|---|---|---|---|
| $k\ /\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ | $2.3\times10^{-7}$ | $6.0\times10^{-7}$ | $1.5\times10^{-6}$ | $3.4\times10^{-6}$ | $7.4\times10^{-6}$ |

Extract $\Delta^\ddagger H$ and $\Delta^\ddagger S$ (take $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$, $\kappa = 1$).
::: solution
Form $\ln(k/T)$ for each point; e.g. at $T = 300\ \mathrm{K}$, $\ln(1.5\times10^{-6}/300) = \ln(5.0\times10^{-9}) = -19.11$:

| $1000\ \mathrm{K}/T$ | 3.571 | 3.448 | 3.333 | 3.226 | 3.125 |
|---|---|---|---|---|---|
| $\ln(k/T)$ | $-20.92$ | $-20.00$ | $-19.11$ | $-18.33$ | $-17.58$ |

A least-squares straight line through the five points gives slope $-7.48\times10^{3}\ \mathrm{K}$ and intercept $5.81$. Hence
$$
\Delta^\ddagger H = -\text{slope}\times R = 7.48\times10^{3} \times 8.314 = 62.2\times10^{3}\ \mathrm{J\,mol^{-1}} = 62\ \mathrm{kJ\,mol^{-1}},
$$
$$
\Delta^\ddagger S = (\text{intercept} - \ln(k_\mathrm{B}/h))\,R = (5.81 - 23.76)\times 8.314 = -149\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
Two independent checks. The two-point slope from the extremes, $(-17.58 + 20.92)/(3.125 - 3.571)\times10^{3} = -7.47\times10^{3}\ \mathrm{K}$, agrees with the fit — the points are linear, as the model requires. And substituting back at $300\ \mathrm{K}$: $k = (k_\mathrm{B}T/h)e^{\Delta^\ddagger S/R}e^{-\Delta^\ddagger H/RT} = 6.2\times10^{12}\times e^{-17.9}\times e^{-24.9} = 1.5\times10^{-6}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, reproducing the table. The large negative $\Delta^\ddagger S$ says the transition state is far more ordered than the separated reactants — an associative, bimolecular, likely cyclic or ion-pair-forming step.
:::
:::

::: quiz
A student computes a bimolecular rate constant from $\Delta^\ddagger H = 45\ \mathrm{kJ\,mol^{-1}}$ and $\Delta^\ddagger S = -80\ \mathrm{J\,K^{-1}\,mol^{-1}}$ at $\mathrm{298\ K}$ using $k = (k_\mathrm{B}T/h)\,e^{\Delta^\ddagger S/R}e^{-\Delta^\ddagger H/RT}$ and reports $k = 1.1\times10^{5}\ \mathrm{s^{-1}}$. What is wrong?
- [x] The $(c^\circ)^{-1}$ factor of the bimolecular Eyring equation is missing: the numerical value is right for $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$, but the answer must be $1.1\times10^{5}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, and a second-order constant can never be in $\mathrm{s^{-1}}$.
- [ ] Nothing is wrong; second-order constants are conventionally quoted in $\mathrm{s^{-1}}$.
- [ ] The exponential in $\Delta^\ddagger H$ should use $E_\mathrm{a}$ instead, which changes the number.
- [ ] The factor $k_\mathrm{B}T/h$ applies only to tunnelling corrections, not to the prefactor.
::: solution
The number $1.1\times10^{5}$ is exactly what equation [[#eq-thermo]] gives for $n = 2$ with $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$ — but the standard-state factor is numerically one *and dimensionally essential*: $(c^\circ)^{1-2} = (1\ \mathrm{mol\,dm^{-3}})^{-1}$ supplies the $\mathrm{dm^{3}\,mol^{-1}}$ the rate law demands. Dropping it is the most common error in using the Eyring equation, and it is caught instantly by a units check: a second-order constant in $\mathrm{s^{-1}}$ is meaningless.
:::
:::

::: warning Standard states, and what $\Delta^\ddagger S$ is not {#warn-standard-state}
$\Delta^\ddagger S$ is a *relative* quantity: it depends on the standard state chosen, and gas-phase tables using $p^\circ = 1\ \mathrm{bar}$ and solution tables using $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$ differ by $R\ln(RTc^\circ/p^\circ) = 26.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$ per molecule lost at $\mathrm{298\ K}$ (the entropy of creating $24.8\ \mathrm{dm^{3}}$ of ideal gas per mole). Never compare a gas-phase $\Delta^\ddagger S$ with a solution one without converting. Second, $\Delta^\ddagger S$ is not "disorder" in the popular sense: it counts *states of the kind the rate law can see*. A termolecular step looks catastrophically entropic ($-200$ to $-300\ \mathrm{J\,K^{-1}\,mol^{-1}}$) because three independent translations are lost; a unimolecular dissociation looks favourable because one is gained. And values below about $-200\ \mathrm{J\,K^{-1}\,mol^{-1}}$ in solution should make you suspect the mechanism (aggregation, a change of rate-determining step, a wrong standard state) before you believe the story of a hyper-ordered transition state.
:::

## What $\Delta^\ddagger S$ means, with water exchange as the test case

An entropy of activation is a difference of entropies between the transition-state region and the reactants, so its *sign* reads the mechanism: **associative** steps (two species become one, or a ring closes) pay $-80$ to $-160\ \mathrm{J\,K^{-1}\,mol^{-1}}$; **dissociative** steps (one becomes two, or a bond breaks with little else demanded) gain $+50$ to $+120\ \mathrm{J\,K^{-1}\,mol^{-1}}$; steps that merely move a proton or an electron within an encounter complex sit near zero. The Diels–Alder reaction between butadiene and ethene, which welds two molecules into one cyclic transition state, carries $\Delta^\ddagger S \approx -120\ \mathrm{J\,K^{-1}\,mol^{-1}}$ in the gas phase — the classic associative fingerprint; an $\mathrm{S_N1}$ ionisation, where the rate-determining step is $\mathrm{C{-}Cl}$ bond breaking with no incoming partner, shows a *positive* $\Delta^\ddagger S$ of tens of $\mathrm{J\,K^{-1}\,mol^{-1}}$ despite the electrostriction of solvent around the emerging ions.

::: example Water exchange on $\mathrm{Fe^{2+}(aq)}$: extracting $\Delta^\ddagger S$ {#ex-water-exchange}
Water exchange on the hexaaqua iron(II) ion, $\mathrm{[Fe(H_2O)_6]^{2+} + H_2O^* \rightarrow [Fe(H_2O)_5(H_2O^*)]^{2+} + H_2O}$, has $k = 1.6\times10^{6}\ \mathrm{s^{-1}}$ at $\mathrm{298.15\ K}$ and $\Delta^\ddagger H = 43.7\ \mathrm{kJ\,mol^{-1}}$ (from the slope of an Eyring plot; standard high-pressure NMR values). Find $\Delta^\ddagger S$ and interpret its sign.
::: solution
Rearrange equation [[#eq-thermo]] for $n = 1$ (the entering water is the solvent, its concentration folded into $k$):
$$
\Delta^\ddagger S = R\left[\ln\frac{k}{k_\mathrm{B}T/h} + \frac{\Delta^\ddagger H}{RT}\right]
= 8.314\left[\ln\frac{1.6\times10^{6}}{6.21\times10^{12}} + \frac{43\,700}{8.314\times298.15}\right].
$$
The two terms: $\ln(2.58\times10^{-7}) = -15.17$ and $43\,700/2478.8 = 17.63$. Hence
$$
\Delta^\ddagger S = 8.314 \times (17.63 - 15.17) = 8.314 \times 2.46 = +20\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
A *positive* activation entropy for an exchange that formally adds a ligand: the transition state has *lost* constraint, not gained it. A water molecule is departing before the new one has fully arrived — a dissociative-interchange ($\mathrm{I_d}$) mechanism, with bond breaking dominating the pass. The isoelectronic $\mathrm{[Ti(H_2O)_6]^{3+}}$ gives the mirror image: $\Delta^\ddagger S \approx -20\ \mathrm{J\,K^{-1}\,mol^{-1}}$, an associative-interchange ($\mathrm{I_a}$) path. This pair, and hundreds like it measured by Merbach's school with high-pressure NMR, is why $\Delta^\ddagger S$ (together with $\Delta^\ddagger V$) is the mechanistic arbiter of substitution at metals.
:::
:::

## Relation to Arrhenius: $E_\mathrm{a}$ versus $\Delta^\ddagger H$

::: proposition $E_\mathrm{a} = \Delta^\ddagger H + RT$ (unimolecular), $+2RT$ (gas-phase bimolecular) {#prop-ea-dh}
For a gas-phase elementary step of molecularity $n$, the Arrhenius activation energy and the activation enthalpy are related by
$$
E_\mathrm{a} = \Delta^\ddagger H + (2 - n)RT ,
$$
so $E_\mathrm{a} = \Delta^\ddagger H + RT$ for a unimolecular step and $E_\mathrm{a} = \Delta^\ddagger H + 2RT$ for a bimolecular one. In solution the $pV$ term is negligible ($\Delta^\ddagger H \approx \Delta^\ddagger U$) and $E_\mathrm{a} = \Delta^\ddagger H + RT$ for both. At $\mathrm{298\ K}$, $RT = 2.48\ \mathrm{kJ\,mol^{-1}}$ and $2RT = 5.0\ \mathrm{kJ\,mol^{-1}}$: the distinction is small but not zero, and it is *systematic*, not random error.
:::

::: proof The relation from the definition of $E_\mathrm{a}$ {#proof-ea-dh}
The activation energy is defined as $E_\mathrm{a} \equiv RT^{2}\,\mathrm{d}\ln k/\mathrm{d}T$. Write the Eyring equation as $k = \kappa (k_\mathrm{B}T/h)\,K_\mathrm{c}^\ddagger$ with $K_\mathrm{c}^\ddagger$ the concentration-based equilibrium constant (units folded in), and take logs: $\ln k = \text{const} + \ln T + \ln K_\mathrm{c}^\ddagger$. Differentiating, and using the van 't Hoff relation for a concentration equilibrium constant, $\mathrm{d}\ln K_\mathrm{c}^\ddagger/\mathrm{d}T = \Delta^\ddagger U/RT^{2}$ (internal energy, not enthalpy, because $K_\mathrm{c}$ is held at constant volume),
$$
E_\mathrm{a} = RT^{2}\left(\frac{1}{T} + \frac{\Delta^\ddagger U}{RT^{2}}\right) = RT + \Delta^\ddagger U .
$$
Now convert to enthalpies. For an ideal gas, $\Delta^\ddagger H = \Delta^\ddagger U + \Delta n^\ddagger RT$ with $\Delta n^\ddagger = 0$ (unimolecular: one molecule forms one complex) or $\Delta n^\ddagger = -1$ (bimolecular: two molecules form one complex). Substituting $\Delta^\ddagger U = \Delta^\ddagger H - \Delta n^\ddagger RT$:
$$
E_\mathrm{a} = \Delta^\ddagger H + (1 - \Delta n^\ddagger)RT
= \begin{cases} \Delta^\ddagger H + RT, & \text{unimolecular},\\ \Delta^\ddagger H + 2RT, & \text{gas-phase bimolecular}. \end{cases}
$$
In solution $\Delta^\ddagger(pV) \approx 0$, so $\Delta^\ddagger H \approx \Delta^\ddagger U$ and $E_\mathrm{a} = \Delta^\ddagger H + RT$ whatever the molecularity. The physical picture: $E_\mathrm{a}$ is the slope of $\ln k$, which measures the *energy* barrier plus the work the thermal energy $RT$ per active degree of freedom does; $\Delta^\ddagger H$ additionally absorbs the $p\Delta V$ of forming the complex, which for a gas-phase association is $-RT$ per mole of pairs consumed.
:::

::: example $E_\mathrm{a}$, $\Delta^\ddagger H$ and $\Delta^\ddagger U$ for a gas-phase bimolecular reaction {#ex-ea-gas}
A gas-phase bimolecular reaction has $E_\mathrm{a} = 10.0\ \mathrm{kJ\,mol^{-1}}$ at $\mathrm{298.15\ K}$. Find $\Delta^\ddagger H$ and $\Delta^\ddagger U$, and by what factor the two conventions for the barrier differ in $e^{-\Delta/RT}$.
::: solution
With $RT = 8.314 \times 298.15 = 2.479\ \mathrm{kJ\,mol^{-1}}$:
$$
\Delta^\ddagger H = E_\mathrm{a} - 2RT = 10.0 - 4.96 = 5.0\ \mathrm{kJ\,mol^{-1}},
\qquad
\Delta^\ddagger U = E_\mathrm{a} - RT = 10.0 - 2.48 = 7.5\ \mathrm{kJ\,mol^{-1}}.
$$
The three "barriers" differ by $2.5$ and $5.0\ \mathrm{kJ\,mol^{-1}}$ — a factor $e^{1.0} = 2.7$ and $e^{2.0} = 7.4$ respectively in any Boltzmann factor built from them. This is why a paper's "$\Delta^\ddagger H$" must never be pasted into an Arrhenius calculation without the $2RT$ correction: at room temperature the bookkeeping is worth a factor of seven.
:::
:::

## Tunnelling and the transmission coefficient

::: definition Transmission coefficient {#def-kappa}
The **transmission coefficient** $\kappa$ is the fraction of activated complexes that, having reached the dividing surface, complete the reaction rather than recrossing to reactants. Ideal TST with a perfectly placed surface has $\kappa = 1$; classical recrossing makes $\kappa < 1$; quantum tunnelling through the barrier makes the *effective* $\kappa > 1$ relative to the classical saddle-point rate, because the complex need not climb to the top at all. $\kappa$ is the honest place TST writes down everything it has idealised away.
:::

Tunnelling is treated almost exactly for one model barrier: approximate the top of the barrier by an *inverted parabola*, $V(s) = -\tfrac{1}{2}m|\omega^\ddagger|^{2}s^{2}$, where the imaginary frequency $\omega^\ddagger = 2\pi c\,|\tilde\nu^\ddagger|$ measures its curvature. The quantum partition function of the inverted oscillator divided by its classical limit gives the parabolic-barrier transmission coefficient — the result of Wigner's 1937 tunnelling analysis, in the lineage of barrier-crossing work that runs from Wolff (1912) through Wigner to Kramers (1940):
$$
\kappa = \frac{u}{2\sin(u/2)}, \qquad u = \frac{h|\tilde\nu^\ddagger|}{k_\mathrm{B}T},
\qquad\text{with high-temperature limit}\qquad
\kappa \approx 1 + \frac{u^{2}}{24}
$$
(valid for $u < 2\pi$; beyond that the parabolic model fails and full WKB tunnelling must be integrated). The message is structural: $\kappa$ grows as $T$ falls and as the barrier gets *narrower* (larger $|\tilde\nu^\ddagger|$), and because $\tilde\nu^\ddagger$ for a transferring hydrogen is $1000$–$2000\ \mathrm{cm^{-1}}$ while for a heavy-atom motion it is $100$–$300\ \mathrm{cm^{-1}}$, hydrogen transfers tunnel strongly and heavy-atom transfers essentially do not. A tunnelling-dominated reaction shows a *curved*, upward-concave Arrhenius plot and $A$ factors anomalously small for its barrier — the classical interpretation of $E_\mathrm{a}$ and $A$ breaks down together.

::: example Tunnelling through a parabolic barrier {#ex-wigner}
A proton transfer has an imaginary frequency $|\tilde\nu^\ddagger| = 500\ \mathrm{cm^{-1}}$. Compute $\kappa$ at $\mathrm{298.15\ K}$ exactly (parabolic model) and from the Wigner high-temperature correction.
::: solution
First the dimensionless barrier curvature. Using $hc/k_\mathrm{B} = 1.4388\ \mathrm{cm\,K}$,
$$
u = \frac{hc|\tilde\nu^\ddagger|}{k_\mathrm{B}T} = \frac{1.4388 \times 500}{298.15} = 2.413 .
$$
Exact parabolic-barrier value:
$$
\kappa = \frac{u}{2\sin(u/2)} = \frac{2.413}{2\sin(1.207)} = \frac{2.413}{2 \times 0.9345} = 1.29 .
$$
Wigner correction: $\kappa \approx 1 + u^{2}/24 = 1 + 5.82/24 = 1.24$, within $4\,\%$ of the exact value — the expansion is good for $u \lesssim 2.5$. At $u = 2.41$ the barrier transmits $29\,\%$ more flux than the classical saddle allows. For a real hydrogen transfer with $|\tilde\nu^\ddagger| = 1500\ \mathrm{cm^{-1}}$ at $\mathrm{250\ K}$, $u = 8.6$ and the parabolic formula leaves its own domain — the honest statement is that $\kappa$ is several and rising as $T$ falls, which is exactly what is measured for, e.g., enol tautomerisations and the $\mathrm{OH + H_2}$ reaction.
:::
:::

## Kinetic isotope effects

::: definition Kinetic isotope effect {#def-kie}
The **kinetic isotope effect** (KIE) is the change in rate constant when one atom is replaced by an isotope, conventionally $k_\mathrm{H}/k_\mathrm{D}$ for hydrogen against deuterium. Because isotopes have (to enormous accuracy) the same electronic structure and the same PES, but different masses and hence different **zero-point energies** (ZPE), the effect is a direct probe of how much the bond to that atom has been stretched or broken in the transition state. A **primary KIE** ($k_\mathrm{H}/k_\mathrm{D} \approx 2$–$10$ at room temperature) marks the bond to H/D as being made or broken in the rate-determining transition state; a **secondary KIE** ($1.1$–$1.5$) marks neighbouring bonds rehybridising.
:::

The origin is a one-line energy bookkeeping. A $\mathrm{C{-}H}$ stretch at $3000\ \mathrm{cm^{-1}}$ and a $\mathrm{C{-}D}$ stretch at $2100\ \mathrm{cm^{-1}}$ have ZPEs $\tfrac{1}{2}h\nu$ differing by $\tfrac{1}{2}hc(3000 - 2100)\ \mathrm{cm^{-1}}$; the deuterated molecule is *less* bound relative to its own ZPE-lowered ground state by that amount. If the bond is *broken* in the transition state, the stretch has disappeared from both isotopologues and the difference vanishes there — so the D-labelled reaction must climb an extra $\tfrac{1}{2}hc\,\Delta\tilde\nu$ of barrier.

::: example The semiclassical ceiling on $k_\mathrm{H}/k_\mathrm{D}$ {#ex-kie-zpe}
Estimate the maximum primary deuterium KIE at $\mathrm{298.15\ K}$ for a reaction in which a $\mathrm{C{-}H}$ bond is fully broken in the transition state, taking $\tilde\nu(\mathrm{C{-}H}) = 3000\ \mathrm{cm^{-1}}$, $\tilde\nu(\mathrm{C{-}D}) = 2100\ \mathrm{cm^{-1}}$, and neglecting the smaller differences in the remaining modes and in the translational/rotational partition functions.
::: solution
The extra barrier for D equals the reactant ZPE difference (the transition-state contribution cancels because the stretch is gone):
$$
\Delta\Delta E_\mathrm{a} = \tfrac{1}{2}hc\,\Delta\tilde\nu
= \tfrac{1}{2}\times 1.4388\ \mathrm{cm\,K} \times 900\ \mathrm{cm^{-1}} \times k_\mathrm{B}
= 647\ \mathrm{K}\times k_\mathrm{B},
$$
i.e. $647 \times 8.314 = 5.38\ \mathrm{kJ\,mol^{-1}}$. Both isotopologues share the same $k_\mathrm{B}T/h$ prefactor, so
$$
\frac{k_\mathrm{H}}{k_\mathrm{D}} = e^{\Delta\Delta E_\mathrm{a}/RT} = e^{647/298.15} = e^{2.17} = 8.8 .
$$
Restoring the neglected factors (the lighter isotopologue also wins a little in the rotational and translational functions and in the bending modes) pushes the semiclassical ceiling to about $10$ — which is why $k_\mathrm{H}/k_\mathrm{D}$ of $6$–$8$ is called "near-maximal", why values much above $\sim 15$ at room temperature are taken as evidence of tunnelling (the particle escapes through, not over, and tunnelling favours H yet more), and why the KIE *shrinks with temperature*, as the widget below shows: at $600\ \mathrm{K}$ the same model gives $k_\mathrm{H}/k_\mathrm{D} = 2.9$.
:::
:::

::: widget plot
f: a*exp(d*1000/(8.314*x))
x: 250, 600
y: 0, 20
sliders: d=5.4:2:10:0.2; a=1:0.5:2:0.1
labels: \text{model } k_\mathrm{H}/k_\mathrm{D}
caption: The ZPE model of the primary KIE, $k_\mathrm{H}/k_\mathrm{D} = a\,e^{\Delta\Delta E_\mathrm{a}/RT}$, against temperature, with the ZPE difference `d` in $\mathrm{kJ\,mol^{-1}}$ (default $5.4$, the $\mathrm{C{-}H}$ vs $\mathrm{C{-}D}$ stretch difference) and the pre-exponential ratio `a` set by sliders. The KIE is largest when the reaction is coldest — at $\mathrm{250\ K}$ the default curve reaches $13$ — and falls towards the (near-unity) statistical limit as $T$ rises. A measured KIE that *grows* on cooling faster than this curve is the classic signature that tunnelling is adding to the over-barrier rate.
:::

Two refinements complete the working picture. **Secondary KIEs**: a $\beta$-deuterium KIE of $k_\mathrm{H}/k_\mathrm{D} \approx 1.1$–$1.5$ per D appears when a $\mathrm{C{-}D}$ bond *adjacent* to the reaction centre weakens in an $\mathrm{S_N1}$-like transition state (the out-of-plane bend softens, favouring H); $\alpha$-deuterium KIEs near $0.7$ (an *inverse* KIE) mark rehybridisation $\mathrm{sp^3 \rightarrow sp^2}$. **Swain–Schaad**: tritium amplifies the same ZPE effect about 1.44 times further than deuterium does relative to hydrogen, so the exponent
$$
\Lambda = \frac{\ln\!\left(k_\mathrm{H}/k_\mathrm{T} - 1\right)}{\ln\!\left(k_\mathrm{H}/k_\mathrm{D} - 1\right)} \approx 3.3
$$
at $\mathrm{298\ K}$ for a *classical* primary KIE; a measured $\Lambda$ far from 3.3 indicts tunnelling. And a preview of what equilibrium does: the same ZPE differences act on *stable* species, giving **equilibrium isotope effects** $K_\mathrm{H}/K_\mathrm{D}$ that can exceed any primary KIE (O–H vs O–D acidities differ by $\sim 3$–$7$ in $K$ at room temperature); when a step before the transition state is itself an isotope-sensitive pre-equilibrium, an EIE rides on the KIE and must be subtracted before the mechanism is read.

## Where transition-state theory fails

TST is exact *if* the dividing surface is chosen so that no trajectory recrosses it — but that is a definition, not a gift. In reality, trajectories that cross the saddle with too much momentum along $s$ return and recross ($\kappa < 1$); solvent in solution caging makes recrossing the rule on the femtosecond timescale, and **variational TST** repairs the placement error by choosing the surface (along $s$) that *minimises* the computed flux, which is always a better estimate than the saddle itself. Kramers' 1940 extension adds friction to the equation of motion along $s$ and predicts the turnover of the rate at high solvent viscosity: in the viscous limit the rate is no longer set by the barrier but by diffusion out of the well. Reaction dynamics — crossed beams, femtochemistry — tests the whole picture trajectory by trajectory on surfaces now computed *ab initio*, and is taken up in [[kinetics/reaction-dynamics]].

::: history
The Eyring equation appeared twice in 1935: Henry Eyring's "The Activated Complex in Chemical Reactions" (with the $k_\mathrm{B}T/h$ factor derived as here) and, independently, Michael Evans and Michael Polanyi's thermodynamic formulation at Manchester, where Polanyi's school was mapping the elementary steps of chain reactions. Evans died in 1937 and Polanyi turned to reaction dynamics — the field his son John Polanyi would create with infrared chemiluminescence (Nobel Prize, 1986). Eugene Wigner treated tunnelling through the parabolic barrier in 1937 (and won the 1963 Nobel Prize for symmetry in quantum mechanics); Hendrik Kramers added friction and diffusion in 1940. The isotope effects the theory explains were systematised by Frank Westheimer in his 1961 review; the Swain–Schaad test (1971), which compares hydrogen–deuterium with hydrogen–tritium KIEs, is still the standard diagnostic for tunnelling, and Westheimer's rule of thumb — "if the KIE is bigger than ten, look for tunnelling" — has aged well.
:::

## Where this leads

The Eyring equation is the bridge from kinetics to *thermodynamics made molecular*: every $\Delta^\ddagger H, \Delta^\ddagger S$ pair is an equilibrium constant's worth of information about a structure nobody will ever see, and reading those pairs is the daily work of physical organic and bioinorganic mechanism — the same reading done on substitution at metal centres in [[kinetics/homogeneous-catalysis]]. The collision-theory chapter ([[kinetics/collision-theory]]) is the classical limit of everything here: its steric factor is $e^{\Delta^\ddagger S/R}$ in disguise, and its $E_0 + \tfrac{1}{2}RT$ becomes $\Delta^\ddagger H + RT$. The mechanisms whose rate laws you derived in [[kinetics/rate-laws]] and [[kinetics/reaction-mechanisms]] are now testable *per step*: each elementary step carries its own $\Delta^\ddagger H$ and $\Delta^\ddagger S$. And the surfaces this lesson lives on are measured one collision at a time in [[kinetics/reaction-dynamics]], where the transition state is not inferred but steered.

::: summary
- The transition state is the first-order saddle point of the PES — maximum along the reaction coordinate, minimum in all other directions, one imaginary frequency; it is *not* an intermediate and has no lifetime.
- TST postulates quasi-equilibrium between reactants and activated complex and free flux through the dividing surface at the saddle, giving $k = \kappa(k_\mathrm{B}T/h)K^\ddagger$; the universal frequency $k_\mathrm{B}T/h = 6.2\times10^{12}\ \mathrm{s^{-1}}$ at $\mathrm{298\ K}$ replaces the collision frequency.
- Standard states matter: $k = \kappa(k_\mathrm{B}T/h)K^\ddagger$ for unimolecular steps, $k_2 = \kappa(k_\mathrm{B}T/h)K^\ddagger(c^\circ)^{-1}$ for bimolecular ones in solution; the thermodynamic form is $k \propto e^{\Delta^\ddagger S/R}e^{-\Delta^\ddagger H/RT}$.
- The Eyring plot $\ln(k/T)$ vs $1/T$ gives $\Delta^\ddagger H$ from the slope and $\Delta^\ddagger S$ from the intercept; $\Delta^\ddagger S$ reads the mechanism — associative negative (Diels–Alder, $\approx -120\ \mathrm{J\,K^{-1}\,mol^{-1}}$), dissociative positive (water exchange on $\mathrm{Fe^{2+}}$, $+20$).
- $E_\mathrm{a} = \Delta^\ddagger H + RT$ (unimolecular, and bimolecular in solution) or $\Delta^\ddagger H + 2RT$ (gas-phase bimolecular): the bookkeeping is worth a factor of seven in the Boltzmann factor at room temperature.
- The transmission coefficient $\kappa$ absorbs recrossing ($\kappa < 1$) and tunnelling ($\kappa > 1$); the parabolic-barrier result $\kappa = u/2\sin(u/2)$, $u = h|\tilde\nu^\ddagger|/k_\mathrm{B}T$, shows why H transfers tunnel and heavy-atom transfers do not, and why tunnelling curves the Arrhenius plot.
- Primary KIEs come from zero-point-energy differences: $k_\mathrm{H}/k_\mathrm{D} \approx e^{\frac{1}{2}hc\Delta\tilde\nu/RT} \approx 7$–$10$ at $\mathrm{298\ K}$ for $\mathrm{C{-}H}$ cleavage, shrinking with temperature; Swain–Schaad and oversized KIEs indict tunnelling.
- TST's idealisations — no recrossing, saddle-point surface, classical transition state — are repaired by variational TST and Kramers' friction, and tested directly by reaction dynamics.
:::

## Exercises

::: exercise The universal frequency {level=1 check="6.46"}
Compute the Eyring attempt frequency $k_\mathrm{B}T/h$ at $\mathrm{310\ K}$ (body temperature). (Enter it in units of $10^{12}\ \mathrm{s^{-1}}$.)
::: solution
$k_\mathrm{B}T/h = 1.381\times10^{-23} \times 310\,/\,6.626\times10^{-34} = 6.46\times10^{12}\ \mathrm{s^{-1}}$. Every elementary step attempts the pass this many times per second per activated complex, whatever the reaction — the mass of the moving atom cancels between the state count and the speed.
:::
:::

::: exercise Rate from a free energy of activation {level=1 check="0.06"}
A unimolecular rearrangement has $\Delta^\ddagger G = 80.0\ \mathrm{kJ\,mol^{-1}}$ at $\mathrm{298.15\ K}$, with $\kappa = 1$. What is $k$? (Enter it in $\mathrm{s^{-1}}$.)
::: solution
$k = (k_\mathrm{B}T/h)\,e^{-\Delta^\ddagger G/RT} = 6.21\times10^{12} \times e^{-80\,000/2478.8} = 6.21\times10^{12} \times 9.6\times10^{-15} = 0.060\ \mathrm{s^{-1}}$: a half-life of about $12\ \mathrm{s}$. Note how $80\ \mathrm{kJ\,mol^{-1}}$ — a fifth of a C–C bond — buys a reaction that is fast on the laboratory scale: the exponential is doing all the work.
:::
:::

::: exercise $E_\mathrm{a}$ from $\Delta^\ddagger H$ {level=1 check="92.5"}
A unimolecular gas-phase reaction has $\Delta^\ddagger H = 90.0\ \mathrm{kJ\,mol^{-1}}$ at $\mathrm{298.15\ K}$. What is $E_\mathrm{a}$? (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$E_\mathrm{a} = \Delta^\ddagger H + RT = 90.0 + 2.48 = 92.5\ \mathrm{kJ\,mol^{-1}}$. For a unimolecular step $\Delta n^\ddagger = 0$ so $\Delta^\ddagger H = \Delta^\ddagger U$, and the extra $RT$ is the thermal work term of the proof of proposition [[#prop-ea-dh]].
:::
:::

::: exercise Two-point Eyring {level=2 check="75"}
A first-order reaction has $k = 2.0\times10^{-3}\ \mathrm{s^{-1}}$ at $\mathrm{300\ K}$ and $k = 1.40\times10^{-2}\ \mathrm{s^{-1}}$ at $\mathrm{320\ K}$. Extract $\Delta^\ddagger H$ (assume $\kappa = 1$, $T$-independent parameters). (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
The Eyring slope uses $\ln(k/T)$, not $\ln k$:
$$
\text{slope} = \frac{\ln(1.40\times10^{-2}/320) - \ln(2.0\times10^{-3}/300)}{1/320 - 1/300}
= \frac{-10.04 - (-11.92)}{-2.083\times10^{-4}} = -9.03\times10^{3}\ \mathrm{K},
$$
so $\Delta^\ddagger H = 9.03\times10^{3} \times 8.314 = 75\ \mathrm{kJ\,mol^{-1}}$. Using $\ln k$ instead (the Arrhenius slope) would give $E_\mathrm{a} = 77.5\ \mathrm{kJ\,mol^{-1}}$ — the $RT$ bookkeeping again.
:::
:::

::: exercise A KIE at elevated temperature {level=2 check="6.8"}
For a reaction whose rate-determining transition state breaks a $\mathrm{C{-}H}$ bond completely, estimate $k_\mathrm{H}/k_\mathrm{D}$ at $\mathrm{320\ K}$ from $\tilde\nu(\mathrm{C{-}H}) = 2900\ \mathrm{cm^{-1}}$ and $\tilde\nu(\mathrm{C{-}D}) = 2050\ \mathrm{cm^{-1}}$, neglecting all other isotope differences. (Enter the ratio.)
::: solution
$\Delta\Delta E_\mathrm{a}/k_\mathrm{B} = \tfrac{1}{2}\times1.4388\times(2900-2050) = 611.5\ \mathrm{K}$, so $k_\mathrm{H}/k_\mathrm{D} = e^{611.5/320} = e^{1.91} = 6.8$. The same reaction at $\mathrm{298\ K}$ would show $7.7$ — the KIE always shrinks as the temperature rises, and a KIE that grows on heating is evidence for something else (a mechanism change, or a pre-equilibrium EIE).
:::
:::

::: exercise Tunnelling correction {level=2 check="1.46"}
A hydride transfer has an imaginary frequency $|\tilde\nu^\ddagger| = 600\ \mathrm{cm^{-1}}$. Compute the parabolic-barrier transmission coefficient at $\mathrm{298.15\ K}$. (Enter $\kappa$.)
::: solution
$u = 1.4388 \times 600/298.15 = 2.895$, so $\kappa = u/(2\sin(u/2)) = 2.895/(2\sin 1.448) = 2.895/1.985 = 1.46$. The Wigner approximation $1 + u^2/24 = 1.35$ is $8\,\%$ low here — acceptable, but drifting; the exact form should be used for $u > 2$.
:::
:::

::: exercise Derive the bimolecular gas-phase relation {level=3}
Starting from $k_2 = \kappa (k_\mathrm{B}T/h) K_\mathrm{c}^\ddagger$ with $K_\mathrm{c}^\ddagger$ the concentration-based equilibrium constant for $\mathrm{A + B \rightleftharpoons TS}$, derive $E_\mathrm{a} = \Delta^\ddagger H + 2RT$ for an ideal-gas bimolecular step, using only $E_\mathrm{a} \equiv RT^2\,\mathrm{d}\ln k/\mathrm{d}T$, the van 't Hoff relation $\mathrm{d}\ln K_\mathrm{c}^\ddagger/\mathrm{d}T = \Delta^\ddagger U/RT^2$, and the ideal-gas enthalpy relation. Where exactly does the factor $2$ come from?
::: solution
$\ln k_2 = \ln(\kappa k_\mathrm{B}/h) + \ln T + \ln K_\mathrm{c}^\ddagger$, so
$$
E_\mathrm{a} = RT^{2}\left(\frac{1}{T} + \frac{\Delta^\ddagger U}{RT^{2}}\right) = RT + \Delta^\ddagger U .
$$
For $\mathrm{A + B \rightarrow TS}$, $\Delta n^\ddagger = -1$ and $\Delta^\ddagger H = \Delta^\ddagger U - RT$, i.e. $\Delta^\ddagger U = \Delta^\ddagger H + RT$. Hence $E_\mathrm{a} = \Delta^\ddagger H + 2RT$. The factor 2 splits cleanly: one $RT$ from the explicit $T$ in $k_\mathrm{B}T/h$ (the attempt frequency rises with temperature), one $RT$ from $\Delta^\ddagger U - \Delta^\ddagger H = +RT$ (forming one molecule from two *releases* $RT$ of $pV$ work, so the internal-energy barrier exceeds the enthalpy barrier). Drop the assumption $\kappa$ = const and a third term $RT^2\,\mathrm{d}\ln\kappa/\mathrm{d}T$ appears — which is how tunnelling masquerades as an anomalously large $E_\mathrm{a}$.
:::
:::

::: exercise Predicting a bimolecular rate constant {level=3 check="206"}
A bimolecular reaction in solution has $\Delta^\ddagger H = 30.0\ \mathrm{kJ\,mol^{-1}}$ and $\Delta^\ddagger S = -100\ \mathrm{J\,K^{-1}\,mol^{-1}}$ at $\mathrm{298.15\ K}$ (standard state $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$, $\kappa = 1$). Compute $k_2$. (Enter it in $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.) Then: what $\Delta^\ddagger S$ would be needed, at the same $\Delta^\ddagger H$, for the reaction to run at the diffusion limit $1\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$?
::: solution
$k_2 = (k_\mathrm{B}T/h)(c^\circ)^{-1}e^{\Delta^\ddagger S/R}e^{-\Delta^\ddagger H/RT}$. The three factors: $6.21\times10^{12}\ \mathrm{s^{-1}}$; $e^{-100/8.314} = e^{-12.03} = 5.96\times10^{-6}$; $e^{-30\,000/2478.8} = e^{-12.10} = 5.55\times10^{-6}$. Their product:
$$
k_2 = 6.21\times10^{12} \times 5.96\times10^{-6} \times 5.55\times10^{-6} = 2.1\times10^{2}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}} .
$$
For the diffusion limit the entropy must supply the missing factor $10^{10}/206 = 4.9\times10^{7}$, i.e. $\Delta\Delta S = R\ln(4.9\times10^{7}) = +147\ \mathrm{J\,K^{-1}\,mol^{-1}}$, so $\Delta^\ddagger S = -100 + 147 = +47\ \mathrm{J\,K^{-1}\,mol^{-1}}$. A diffusion-controlled reaction needs a *positive* activation entropy — two molecules meeting is not entropically punished at the pass because the solvent pays the bill — and this is why encounter-limited rates cluster near $10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ whatever the chemistry.
:::
:::
