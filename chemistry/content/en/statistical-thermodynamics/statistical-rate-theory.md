The previous lessons computed where a reaction ends up — its equilibrium constant — from the partition functions of reactants and products. A rate constant asks a harder question: how fast does the system get there? Remarkably, much of the same machinery applies. Transition-state theory, introduced in kinetics as the Eyring equation ([[kinetics/transition-state-theory]]), treats the configuration at the top of the barrier as a species in equilibrium with the reactants, so that the rate constant becomes an equilibrium constant times a universal frequency; written with partition functions, it predicts rate constants from the structure and vibrational frequencies of a transition state, explains the "steric factor" that collision theory could only fit, and reduces to collision theory itself for the simplest reaction. For unimolecular reactions, where a molecule must first be energised by collisions and then wait for the energy to find its way into the right bond, statistical theory goes further: the Lindemann mechanism explains why their rate constants depend on pressure, and the RRK and RRKM theories compute the rate at which an energised molecule falls apart by counting its quantum states.

This lesson develops these statistical theories of reaction rates. It assumes the partition functions of [[statistical-thermodynamics/partition-function]] and the equilibrium constants of [[statistical-thermodynamics/equilibrium-from-molecules]]; the thermodynamic form of TST, with $\Delta^\ddagger H$ and $\Delta^\ddagger S$, and the treatment of tunnelling and isotope effects are in [[kinetics/transition-state-theory]], and the collision theory of [[kinetics/collision-theory]] is assumed known.

## Transition-state theory in terms of partition functions

Consider a bimolecular reaction $\mathrm{A} + \mathrm{B} \rightarrow$ products in the gas phase, passing through an activated complex $\mathrm{C}^\ddagger$ at a saddle point of the potential energy surface ([[computational-chemistry/potential-energy-surfaces]]). TST makes two assumptions: the complexes are in **quasi-equilibrium** with the reactants (their population is given by the Boltzmann distribution, as if they were a stable species), and every complex that crosses the dividing surface at the saddle in the forward direction goes on to products (**no recrossing**). One of the $3N^\ddagger - 6$ vibrations of a nonlinear complex is replaced by the motion along the reaction coordinate $s$, a translation over the top of the barrier.

::: proposition The TST rate constant in terms of partition functions {#prop-tst}
For $\mathrm{A} + \mathrm{B} \rightarrow \mathrm{C}^\ddagger \rightarrow$ products, with energies measured from each species' lowest state and $\Delta E_0$ the difference between the zero-point levels of the complex and the reactants (the **threshold energy**),
$$
k_2 = \kappa\,\frac{k_\mathrm{B}T}{h}\,\frac{\bar q^{\,\ddagger}/V}{(q_\mathrm{A}/V)(q_\mathrm{B}/V)}\,e^{-\Delta E_0/k_\mathrm{B}T}
$$ {#eq-tst}
in molecular units ($\mathrm{m^{3}\,s^{-1}}$; multiply by $N_\mathrm{A}$ for $\mathrm{m^{3}\,mol^{-1}\,s^{-1}}$). Here $\bar q^{\,\ddagger}$ is the partition function of the complex with the reaction-coordinate mode removed, and $\kappa$ is the transmission coefficient. For a unimolecular step $\mathrm{A} \rightarrow \mathrm{C}^\ddagger \rightarrow$ products, $k_1 = \kappa(k_\mathrm{B}T/h)(\bar q^{\,\ddagger}/q_\mathrm{A})e^{-\Delta E_0/k_\mathrm{B}T}$, in $\mathrm{s^{-1}}$.
:::

::: proof
Quasi-equilibrium means that the number density of complexes is given by [[statistical-thermodynamics/equilibrium-from-molecules#eq-k]] written in number densities:
$$
\frac{[\mathrm{C}^\ddagger]}{[\mathrm{A}][\mathrm{B}]} = \frac{q^{\ddagger}/V}{(q_\mathrm{A}/V)(q_\mathrm{B}/V)}\,e^{-\Delta E_0/k_\mathrm{B}T},
$$
where $q^{\ddagger}$ is the full partition function of the complex. Define the complex as any configuration within a short length $\delta$ of the dividing surface along $s$. Motion along $s$ near the top of the barrier is free translation of an effective mass $m^\ddagger$, so this factor of $q^{\ddagger}$ is the one-dimensional translational partition function over length $\delta$: $q_s = \delta(2\pi m^\ddagger k_\mathrm{B}T)^{1/2}/h$, and $q^{\ddagger} = q_s\bar q^{\,\ddagger}$. Of the complexes in the layer, half move forwards, with mean forward speed $\langle v_s\rangle_+ = (k_\mathrm{B}T/2\pi m^\ddagger)^{1/2}$ (the mean of $|v|$ over a one-dimensional Maxwell distribution is $(2k_\mathrm{B}T/\pi m)^{1/2}$, and only half the complexes move forwards); the number crossing per unit time and volume is $[\mathrm{C}^\ddagger]\langle v_s\rangle_+/\delta$. Hence the rate is
$$
v = [\mathrm{A}][\mathrm{B}]\,\frac{\delta(2\pi m^\ddagger k_\mathrm{B}T)^{1/2}}{h}\cdot\frac{1}{\delta}\left(\frac{k_\mathrm{B}T}{2\pi m^\ddagger}\right)^{1/2}\frac{\bar q^{\,\ddagger}/V}{(q_\mathrm{A}/V)(q_\mathrm{B}/V)}e^{-\Delta E_0/k_\mathrm{B}T} = \frac{k_\mathrm{B}T}{h}\,\frac{\bar q^{\,\ddagger}/V}{(q_\mathrm{A}/V)(q_\mathrm{B}/V)}e^{-\Delta E_0/k_\mathrm{B}T}[\mathrm{A}][\mathrm{B}].
$$
The arbitrary length $\delta$ and the unknown effective mass both cancel, leaving the universal factor $k_\mathrm{B}T/h$. The transmission coefficient $\kappa$ corrects for recrossing and tunnelling. The unimolecular case is identical with one reactant.
:::

Equation [[#eq-tst]] is a recipe. Compute the geometry and vibrational frequencies of the transition state (nowadays by quantum chemistry), evaluate its translational, rotational and vibrational partition functions with the formulas of [[statistical-thermodynamics/partition-function]], do the same for the reactants, and take the barrier height including zero-point energies. The thermodynamic Eyring form, $k = (k_\mathrm{B}T/h)e^{\Delta^\ddagger S^\circ/R}e^{-\Delta^\ddagger H^\circ/RT}(c^\circ)^{-1}$, is the same statement expressed through the standard Gibbs energy of activation, $\Delta^\ddagger G^\circ = -RT\ln K^{\ddagger}$, with $K^\ddagger$ built from $\bar q^{\,\ddagger}$.

::: warning Which partition function, and which zero? {#warn-tst}
Three points cause most errors with [[#eq-tst]]. (i) $\bar q^{\,\ddagger}$ omits *one* vibrational mode — the one with the imaginary frequency — and includes all the others, among them low-frequency bends that may contribute large factors; do not drop real modes of the complex as well. (ii) The barrier $\Delta E_0$ is between zero-point levels, not the classical potential-energy barrier $V^\ddagger$; the two differ by the change in zero-point energy, which can be several kilojoules per mole when bonds to hydrogen are involved (the origin of kinetic isotope effects). (iii) Symmetry numbers belong in every rotational partition function, or equivalently a reaction-path degeneracy must be included: for $\mathrm{H + CH_4 \rightarrow H_2 + CH_3}$ there are four equivalent hydrogens to abstract, and the ratio of symmetry numbers $\sigma(\mathrm{CH_4})/\sigma^\ddagger = 12/3 = 4$ supplies exactly this factor.
:::

## Collision theory as a special case

The cleanest test of [[#eq-tst]] is a reaction between two atoms, for which the activated complex is a diatomic "molecule" with no vibration left — its only vibration *is* the reaction coordinate.

::: proposition TST for atom + atom reproduces collision theory {#prop-atoms}
For $\mathrm{A} + \mathrm{B} \rightarrow \mathrm{AB}^\ddagger$, with a complex of bond length $d$ (reduced mass $\mu$, moment of inertia $I = \mu d^{2}$) and $\kappa = 1$, [[#eq-tst]] gives
$$
k_2 = \pi d^{2}\left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2}e^{-\Delta E_0/k_\mathrm{B}T},
$$ {#eq-collision}
the collision-theory rate constant with collision cross-section $\pi d^{2}$ and steric factor 1.
:::

::: proof
For the atoms, $q/V = 1/\Lambda^{3} = (2\pi mk_\mathrm{B}T)^{3/2}/h^{3}$ (ignoring electronic degeneracies, which would multiply both sides alike if the complex inherits them). For the complex, $\bar q^{\,\ddagger}/V = [2\pi(m_\mathrm{A} + m_\mathrm{B})k_\mathrm{B}T]^{3/2}/h^{3}\times q^\mathrm{R}$, with $q^\mathrm{R} = 8\pi^{2}Ik_\mathrm{B}T/h^{2}$ (the linear-rotor result $k_\mathrm{B}T/hcB$ with $B = h/8\pi^{2}cI$; $\sigma = 1$ for unlike atoms). The mass factors combine as $(m_\mathrm{A} + m_\mathrm{B})^{3/2}/(m_\mathrm{A}m_\mathrm{B})^{3/2} = \mu^{-3/2}$, so
$$
k_2 = \frac{k_\mathrm{B}T}{h}\cdot\frac{h^{3}}{(2\pi\mu k_\mathrm{B}T)^{3/2}}\cdot\frac{8\pi^{2}\mu d^{2}k_\mathrm{B}T}{h^{2}}\,e^{-\Delta E_0/k_\mathrm{B}T} = \frac{8\pi^{2}d^{2}(k_\mathrm{B}T)^{1/2}}{(2\pi)^{3/2}\mu^{1/2}}\,e^{-\Delta E_0/k_\mathrm{B}T}.
$$
Every $h$ has cancelled. Since $8\pi^{2}/(2\pi)^{3/2} = 2(2\pi)^{1/2} = \pi(8/\pi)^{1/2}$, the prefactor is $\pi d^{2}(8k_\mathrm{B}T/\pi\mu)^{1/2}$, as stated.
:::

The cancellation of Planck's constant is a strong consistency check: collision theory is classical, and TST for structureless particles must agree with it. What collision theory calls the cross-section, TST calls the moment of inertia of the complex — rotation of the complex is the relative orbital motion of the colliding pair.

::: example Collision-limited rate constant from TST {#ex-atoms}
Evaluate [[#eq-collision]] for an oxygen atom ($16.00\ \mathrm{g\,mol^{-1}}$) and a chlorine atom ($35.45\ \mathrm{g\,mol^{-1}}$) at $300\ \mathrm{K}$ with $d = 300\ \mathrm{pm}$ and zero threshold, in $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.
::: solution
$\mu = (16.00\times35.45/51.45)\ \mathrm{u} = 11.02\ \mathrm{u} = 1.831\times10^{-26}\ \mathrm{kg}$. The mean relative speed is
$$
\left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2} = \left(\frac{8\times1.3807\times10^{-23}\times300}{\pi\times1.831\times10^{-26}}\right)^{1/2}\ \mathrm{m\,s^{-1}} = 759\ \mathrm{m\,s^{-1}},
$$
and $\pi d^{2} = \pi\times(3.00\times10^{-10})^{2} = 2.827\times10^{-19}\ \mathrm{m^{2}}$. So $k_2 = 2.146\times10^{-16}\ \mathrm{m^{3}\,s^{-1}}$ per molecule pair; multiplying by $N_\mathrm{A}$ and by $10^{3}\ \mathrm{dm^{3}\,m^{-3}}$,
$$
k_2 = 2.146\times10^{-16}\times6.022\times10^{23}\times10^{3} = 1.29\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}} .
$$
This is the typical gas-kinetic ceiling, $10^{10}$–$10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, for a reaction with no barrier and no orientational requirement. (Atom–atom *recombination* also needs a third body to remove energy; the number computed is the rate of forming the complex.)
:::
:::

### The origin of the steric factor

For polyatomic reactants, the ratio of partition functions in [[#eq-tst]] does something collision theory cannot: it accounts for the rotational freedom that the reactants *lose* when they lock together in the complex. Eyring's order-of-magnitude analysis makes this explicit by assigning each degree of freedom a typical partition function per mode: $q_\mathrm{t}$ for each translational degree (per unit length), $q_\mathrm{r}$ for each rotational degree ($\approx 10$–$100$), and $q_\mathrm{v}$ for each vibration ($\approx 1$–$3$ at ordinary temperatures).

::: example Estimating the steric factor {#ex-steric}
Use per-mode partition functions to compare the TST rate constants for (a) atom + atom and (b) nonlinear molecule + nonlinear molecule (with $N_\mathrm{A}$ and $N_\mathrm{B}$ atoms, nonlinear complex), and hence estimate the steric factor $P$ of collision theory. Evaluate $P$ for $q_\mathrm{r} = 30$, $q_\mathrm{v} = 1.5$.
::: solution
(a) Each atom has three translational modes; the complex has three translations and two rotations (its vibration is the reaction coordinate). So $k^{(a)} \propto q_\mathrm{t}^{3}q_\mathrm{r}^{2}/q_\mathrm{t}^{6} = q_\mathrm{r}^{2}/q_\mathrm{t}^{3}$, and this is the collision-theory result with $P = 1$ ([[#prop-atoms]]).

(b) Each reactant has $3$ translations, $3$ rotations and $3N - 6$ vibrations. The complex of $N_\mathrm{A} + N_\mathrm{B}$ atoms has $3$ translations, $3$ rotations and $3(N_\mathrm{A} + N_\mathrm{B}) - 6 - 1$ vibrations (one is the reaction coordinate). The ratio is
$$
k^{(b)} \propto \frac{q_\mathrm{t}^{3}q_\mathrm{r}^{3}q_\mathrm{v}^{3(N_\mathrm{A}+N_\mathrm{B})-7}}{q_\mathrm{t}^{6}q_\mathrm{r}^{6}q_\mathrm{v}^{3N_\mathrm{A}-6+3N_\mathrm{B}-6}} = \frac{q_\mathrm{v}^{5}}{q_\mathrm{t}^{3}q_\mathrm{r}^{3}} .
$$
Dividing by the collision-theory form (a), which uses the same cross-section and threshold, gives
$$
P \approx \frac{k^{(b)}}{k^{(a)}} = \left(\frac{q_\mathrm{v}}{q_\mathrm{r}}\right)^{5} .
$$
With $q_\mathrm{r} = 30$ and $q_\mathrm{v} = 1.5$, $P \approx (0.05)^{5} = 3\times10^{-7}$. The reactants' five rotational degrees of freedom that become (stiff) vibrations of the complex each cost a factor of $q_\mathrm{v}/q_\mathrm{r}$: the steric factor is the price of orientation, an entropy of activation of $5R\ln(q_\mathrm{v}/q_\mathrm{r}) \approx -125\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Observed $P$ values of $10^{-4}$ to $10^{-9}$ for reactions between polyatomic molecules are of exactly this order, and a "loose" transition state that keeps some free rotation gives larger $P$.
:::
:::

### Tight and loose transition states

For a unimolecular reaction the translational partition functions of reactant and complex are identical and cancel, and the rotational ones nearly so; the prefactor $(k_\mathrm{B}T/h)\bar q^{\,\ddagger}/q$ is then governed by the *vibrations*. A transition state in which one bond is merely stretched and every other mode is little changed has $\bar q^{\,\ddagger} \approx q$ divided by the reactant's partition function for the mode that became the reaction coordinate — which is close to 1 for a stiff stretch — so its prefactor is close to $k_\mathrm{B}T/h \approx 10^{13}\ \mathrm{s^{-1}}$. Such a **tight** transition state is typical of concerted rearrangements through cyclic structures. In a simple bond fission, by contrast, the bending motions of the separating fragments become soft and large-amplitude in the complex — a **loose** transition state — and every softened mode multiplies the prefactor.

::: example Prefactors of tight and loose transition states {#ex-loose}
A molecule decomposes at $1000\ \mathrm{K}$ by breaking one bond. In a tight transition state all the remaining modes keep their reactant frequencies; in a loose one, two bending modes fall from $400$ to $100\ \mathrm{cm^{-1}}$. Treating the vibrations as harmonic, compare the TST prefactors $(k_\mathrm{B}T/h)\bar q^{\,\ddagger}/q$, taking the partition function of the broken stretch in the reactant as 1.
::: solution
At $1000\ \mathrm{K}$, $k_\mathrm{B}T/h = 2.08\times10^{13}\ \mathrm{s^{-1}}$. For the tight TS, $\bar q^{\,\ddagger}/q = 1$ and the prefactor is $2.1\times10^{13}\ \mathrm{s^{-1}}$. For the loose TS the two bends change from $q^\mathrm{V} = 1/(1 - e^{-1.438\,78\times400/1000}) = 2.285$ to $1/(1 - e^{-0.1439}) = 7.462$, a factor of $3.27$ each, so
$$
\frac{\bar q^{\,\ddagger}}{q} = 3.27^{2} = 10.7, \qquad \frac{k_\mathrm{B}T}{h}\frac{\bar q^{\,\ddagger}}{q} = 2.2\times10^{14}\ \mathrm{s^{-1}} .
$$
Softening just two modes raises the prefactor tenfold, an activation entropy of $R\ln 10.7 \approx +20\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Real bond fissions, in which several bends become nearly free rotations of the fragments, reach pre-exponential factors of $10^{15}$–$10^{17}\ \mathrm{s^{-1}}$; concerted four- and six-centre eliminations, in which internal rotations are *frozen* in the cyclic transition state, have $10^{11}$–$10^{13}\ \mathrm{s^{-1}}$. Measured Arrhenius $A$ factors are therefore a diagnostic of the looseness of the transition state.
:::
:::

## Unimolecular reactions: the Lindemann mechanism

A unimolecular reaction such as the isomerisation of cyclopropane to propene, $\mathrm{C_3H_6} \rightarrow \mathrm{CH_3CH{=}CH_2}$, poses a puzzle. It is first order at high pressure, but where does a single molecule get the energy to react? Frederick Lindemann's answer (1922) is that it gets it from collisions — and that the reaction is first order only because activation is fast compared with reaction.

::: proposition The Lindemann–Hinshelwood mechanism {#prop-lindemann}
For the mechanism
$$
\mathrm{A} + \mathrm{M} \xrightleftharpoons[k_{-1}]{k_1} \mathrm{A}^{*} + \mathrm{M}, \qquad \mathrm{A}^{*} \xrightarrow{k_2} \mathrm{P},
$$
where M is any collision partner and $\mathrm{A}^{*}$ an energised molecule, the steady-state approximation for $\mathrm{A}^{*}$ gives $v = k_\mathrm{uni}[\mathrm{A}]$ with
$$
k_\mathrm{uni} = \frac{k_1k_2[\mathrm{M}]}{k_{-1}[\mathrm{M}] + k_2} = \frac{k_\infty}{1 + [\mathrm{M}]_{1/2}/[\mathrm{M}]}, \qquad k_\infty = \frac{k_1k_2}{k_{-1}}, \quad [\mathrm{M}]_{1/2} = \frac{k_2}{k_{-1}} = \frac{k_\infty}{k_1} .
$$ {#eq-lindemann}
At high pressure $k_\mathrm{uni}\to k_\infty$ (first order); at low pressure $k_\mathrm{uni}\to k_1[\mathrm{M}]$ (second order, activation rate-limiting). The **fall-off** occurs around $[\mathrm{M}]_{1/2}$.
:::

::: proof
Setting $\mathrm{d}[\mathrm{A}^{*}]/\mathrm{d}t = k_1[\mathrm{A}][\mathrm{M}] - k_{-1}[\mathrm{A}^{*}][\mathrm{M}] - k_2[\mathrm{A}^{*}] = 0$ ([[kinetics/reaction-mechanisms]]) gives $[\mathrm{A}^{*}] = k_1[\mathrm{A}][\mathrm{M}]/(k_{-1}[\mathrm{M}] + k_2)$, and $v = k_2[\mathrm{A}^{*}]$. Dividing numerator and denominator by $k_{-1}[\mathrm{M}]$ gives the second form. At $[\mathrm{M}] = [\mathrm{M}]_{1/2}$, $k_\mathrm{uni} = k_\infty/2$.
:::

::: widget plot
f: log10(1/(1 + 10^(h - x))); log10(1/(1 + 10^(h - x)*10^(-w)))
x: -4, 4
y: -5, 0.5
sliders: h=0:-3:3:0.1; w=2:0:6:0.1
labels: \text{Lindemann}; \text{with } [\mathrm{M}]_{1/2}\text{ lowered by }10^{w}
caption: Fall-off curves: $\log_{10}(k_\mathrm{uni}/k_\infty)$ against $\log_{10}[\mathrm{M}]$ (arbitrary units) from [[#eq-lindemann]], with the half-pressure $\log_{10}[\mathrm{M}]_{1/2} = h$ (slider). At high pressure the curve is flat (first order); at low pressure it falls with unit slope (second order). The second curve lowers $[\mathrm{M}]_{1/2}$ by a factor $10^{w}$, as the Hinshelwood correction for many internal oscillators does: the fall-off moves to lower pressure. Real fall-off curves are also *broader* than the Lindemann form, because $k_2$ depends on the energy of $\mathrm{A}^{*}$ — the point of RRKM theory.
:::

The Lindemann mechanism explains the qualitative behaviour, but its simplest quantitative form fails badly. If activation is a strong collision that delivers at least $E_0$ to the molecule with the collision-theory probability $e^{-E_0/RT}$, then $k_1 = Z\,e^{-E_0/RT}$, and $[\mathrm{M}]_{1/2} = k_\infty/k_1$ comes out absurdly high.

::: example The fall-off of cyclopropane: Lindemann against Hinshelwood {#ex-cyclopropane}
The high-pressure rate constant for cyclopropane isomerisation is $k_\infty = 1.5\times10^{15}\ \mathrm{s^{-1}}\exp(-272\ \mathrm{kJ\,mol^{-1}}/RT)$ (Chambers and Kistiakowsky, 1934). At $765\ \mathrm{K}$, estimate $[\mathrm{M}]_{1/2}$ and the corresponding pressure with $k_1 = Ze^{-E_0/RT}$, taking $E_0 = 266\ \mathrm{kJ\,mol^{-1}}$ and a collision rate constant $Z = 6.9\times10^{-16}\ \mathrm{m^{3}\,s^{-1}}$ (diameter $500\ \mathrm{pm}$). Then repeat with Hinshelwood's activation rate, in which the energy may be distributed over $s$ classical oscillators, so that $k_1 = Z\,(E_0/RT)^{s-1}e^{-E_0/RT}/(s-1)!$, for $s = 10$.
::: solution
$k_\infty = 1.5\times10^{15}\exp(-272\,000/(8.3145\times765)) = 1.5\times10^{15}\times2.68\times10^{-19} = 4.0\times10^{-4}\ \mathrm{s^{-1}}$. With $E_0/RT = 266\,000/6360 = 41.8$, $e^{-41.8} = 7.3\times10^{-19}$, so the strong-collision Lindemann estimate is $k_1 = 6.9\times10^{-16}\times7.3\times10^{-19} = 5.0\times10^{-34}\ \mathrm{m^{3}\,s^{-1}}$, and
$$
[\mathrm{M}]_{1/2} = \frac{k_\infty}{k_1} = \frac{4.0\times10^{-4}}{5.0\times10^{-34}} = 8.0\times10^{29}\ \mathrm{m^{-3}}, \qquad p_{1/2} = [\mathrm{M}]_{1/2}k_\mathrm{B}T = 8.5\times10^{9}\ \mathrm{Pa}.
$$
Nearly $10^{5}\ \mathrm{bar}$: Lindemann's theory in this form predicts that cyclopropane should be in the second-order regime at every accessible pressure. In fact the fall-off is observed at pressures of the order of kilopascals and below. Hinshelwood's factor for $s = 10$ is $41.8^{9}/9! = 1.07\times10^{9}$; it raises $k_1$ by that amount and lowers the estimate to $p_{1/2} \approx 8\ \mathrm{Pa}$. The probability that a molecule has energy *at least* $E_0$ somewhere among many oscillators is far larger than the probability that one oscillator has it; the result is now very sensitive to $s$ (and overshoots for $s = 10$), which shows that a theory of the energy dependence of $k_2$ is needed, not a fudge.
:::
:::

## RRK and RRKM theory

The remaining question is the rate constant $k_2(E)$ at which an energised molecule with energy $E$ decomposes. The statistical answer assumes that the energy flows rapidly and randomly among all the molecule's vibrations (**intramolecular vibrational energy redistribution**, IVR), so that the molecule reacts when, by chance, at least $E_0$ is concentrated in the critical coordinate.

::: proposition The RRK rate constant {#prop-rrk}
If a molecule is modelled as $s$ identical classical oscillators of frequency $\nu$ sharing total energy $E$, the probability that one particular oscillator holds at least $E_0$ is $(1 - E_0/E)^{s-1}$, and the rate constant for reaction is
$$
k_2(E) = \nu\left(1 - \frac{E_0}{E}\right)^{s-1}\qquad(E \ge E_0) .
$$ {#eq-rrk}
:::

::: proof
For $s$ classical oscillators with total energy $E$, the energies $(\varepsilon_1, \ldots, \varepsilon_s)$ are uniformly distributed (by equal a priori probabilities) over the simplex $\sum_i\varepsilon_i = E$, $\varepsilon_i \ge 0$, whose $(s-1)$-dimensional volume is proportional to $E^{s-1}$. The configurations with $\varepsilon_1 \ge E_0$ are obtained by writing $\varepsilon_1 = E_0 + \varepsilon_1'$; they form a simplex of the same shape with total $E - E_0$, of volume proportional to $(E - E_0)^{s-1}$. The ratio, $(1 - E_0/E)^{s-1}$, is the probability that the critical oscillator holds at least $E_0$. If reaction occurs once per vibrational period whenever this is the case, $k_2 = \nu(1 - E_0/E)^{s-1}$.
:::

::: widget plot
f: (1 - 1/x)^(s - 1)
x: 1, 6
y: 0, 1
sliders: s=10:1:30:1
labels: k_2(E)/\nu
caption: The RRK rate constant [[#eq-rrk]], $k_2/\nu$, against $E/E_0$ for $s$ oscillators (slider). Just above threshold the rate is minute, because the energy must find its way into one bond out of $s$; it rises steeply and approaches the vibrational frequency only when $E$ is many times $E_0$. The larger the molecule (larger $s$), the longer an energised molecule lives at a given excess energy — the reason why big molecules are collisionally stabilised more easily and show fall-off at lower pressures.
:::

RRK theory (Rice and Ramsperger, Kassel, 1927–1928) captured the energy dependence, but the classical oscillators and the single frequency $\nu$ were too crude. Rudolph Marcus's reformulation (RRKM, 1952) combines it with transition-state theory, applied not to a thermal ensemble but to molecules of a fixed energy — a *microcanonical* TST.

::: proposition The RRKM rate constant {#prop-rrkm}
For an energised molecule of total energy $E$ (measured from its zero-point level), with density of vibrational states $\rho(E)$, and a transition state whose vibrational modes (excluding the reaction coordinate) have sum of states $N^\ddagger(E - E_0)$ — the number of states with energy between $0$ and $E - E_0$ above the transition state's zero-point level —
$$
k_2(E) = \frac{N^\ddagger(E - E_0)}{h\,\rho(E)} .
$$ {#eq-rrkm}
In the classical limit with $s$ reactant oscillators of frequencies $\nu_i$ and $s - 1$ transition-state oscillators of frequencies $\nu_j^\ddagger$, this reduces to the RRK form with $\nu = \prod_{i=1}^{s}\nu_i/\prod_{j=1}^{s-1}\nu_j^\ddagger$.
:::

::: proof
In the microcanonical ensemble at energy $E$, every state of the energised molecule is equally probable; the molecule's states lie in an energy shell of width $\mathrm{d}E$, $\rho(E)\,\mathrm{d}E$ of them. Of these, consider those near the dividing surface with energy $\varepsilon_s$ in the reaction coordinate and $E - E_0 - \varepsilon_s$ in the other modes of the complex. The translational motion along $s$ over a length $\delta$ has $\delta(2m^\ddagger)^{1/2}\varepsilon_s^{-1/2}\,\mathrm{d}\varepsilon_s/h$ forward-moving states per energy interval (from the classical phase-space count $\delta\,\mathrm{d}p/h$), and a complex with that energy crosses the layer at the rate $v_s/\delta = (2\varepsilon_s/m^\ddagger)^{1/2}/\delta$. Their product is $\mathrm{d}\varepsilon_s/h$, independent of $\varepsilon_s$, $m^\ddagger$ and $\delta$ — the microcanonical analogue of $k_\mathrm{B}T/h$. Summing over the states of the other modes of the complex, the total number of crossings per unit time is $\rho^\ddagger$-weighted: $\int_0^{E-E_0}\rho^\ddagger(E - E_0 - \varepsilon_s)\,\mathrm{d}\varepsilon_s\,\mathrm{d}E/h = N^\ddagger(E - E_0)\,\mathrm{d}E/h$. Dividing by the number of states of the energised molecule, $\rho(E)\,\mathrm{d}E$, gives [[#eq-rrkm]].

For the classical limit, $s$ harmonic oscillators have $N(E) = E^{s}/(s!\prod_ih\nu_i)$, so $\rho(E) = \mathrm{d}N/\mathrm{d}E = E^{s-1}/((s-1)!\prod_ih\nu_i)$; and the $s - 1$ oscillators of the complex have $N^\ddagger(E - E_0) = (E - E_0)^{s-1}/((s-1)!\prod_jh\nu_j^\ddagger)$. Their ratio divided by $h$ is $(\prod_i\nu_i/\prod_j\nu_j^\ddagger)(1 - E_0/E)^{s-1}$.
:::

The power of [[#eq-rrkm]] lies in the *quantum* counts. Real molecules have zero-point energy and widely different frequencies, and their sums and densities of states are computed exactly by counting (the Beyer–Swinehart algorithm, 1973) or by good approximations (Whitten and Rabinovitch, 1963). Averaging $k_2(E)$ over the distribution of energised molecules produced by collisions gives fall-off curves that agree with experiment over many decades of pressure.

::: example Counting states for RRKM {#ex-rrkm}
A model molecule has three harmonic oscillators of $1000\ \mathrm{cm^{-1}}$; at the transition state one becomes the reaction coordinate and two remain at $1000\ \mathrm{cm^{-1}}$. The threshold is $E_0 = 5000\ \mathrm{cm^{-1}}$. For a molecule energised to $E = 8000\ \mathrm{cm^{-1}}$ (both measured from the zero-point levels), calculate $k_2(E)$ by direct counting, and compare with the classical RRK result.
::: solution
*Sum of states of the complex.* $E - E_0 = 3000\ \mathrm{cm^{-1}}$, i.e. at most three quanta shared between two oscillators. The number of ways $(v_1, v_2)$ with $v_1 + v_2 \le 3$ is $1 + 2 + 3 + 4 = 10$, so $N^\ddagger = 10$.

*Density of states of the molecule.* At $E = 8000\ \mathrm{cm^{-1}}$ the reactant has exactly eight quanta in three oscillators: $\binom{8+2}{2} = 45$ states, and since the levels come every $1000\ \mathrm{cm^{-1}}$ the density of states, averaged over that interval, is $\rho = 45/(1000\ \mathrm{cm^{-1}})$, i.e. $45/(1000\,hc)$ per joule.

*Rate constant.* By [[#eq-rrkm]],
$$
k_2 = \frac{N^\ddagger}{h\rho} = \frac{10}{45}\times(1000\ \mathrm{cm^{-1}})\times c = 0.222\times(1000\ \mathrm{cm^{-1}}\times2.998\times10^{10}\ \mathrm{cm\,s^{-1}}) = 6.7\times10^{12}\ \mathrm{s^{-1}} .
$$
*Classical RRK*, with $\nu = c\times1000\ \mathrm{cm^{-1}} = 3.0\times10^{13}\ \mathrm{s^{-1}}$ and $s = 3$: $k_2 = 3.0\times10^{13}\times(1 - 5/8)^{2} = 4.2\times10^{12}\ \mathrm{s^{-1}}$. The quantum count is $60\,\%$ larger, because at such low energies (eight quanta) the classical formulas misrepresent the discrete counts of both reactant and complex. For a real molecule with 20 or 30 modes, the classical error in $\rho(E)$ alone can exceed a factor of $10^{3}$ near threshold, which is why RRKM uses exact counts.
:::
:::

::: widget plot
f: log10(binom(floor(x) + s, s)); log10(x^s/fact(s)); log10((x + s/2)^s/fact(s))
x: 0, 12
y: -2, 5
sliders: s=3:1:6:1
labels: \text{exact count}; \text{classical } E^{s}/s!; \text{classical with zero-point energy}
caption: The logarithm $\log_{10}N(E)$ of the sum of vibrational states of $s$ identical harmonic oscillators (slider) against $E$ in units of $h\nu$, measured from the zero-point level: the exact staircase $\binom{n+s}{s}$ ($n$ = number of quanta available), the classical formula $E^{s}/s!$ used in RRK theory, and the classical formula with the zero-point energy $\tfrac{1}{2}sh\nu$ added to $E$ (the Marcus–Rice approximation). The classical count is far too small at low energies; the zero-point-shifted count overestimates. Whitten and Rabinovitch's interpolation between the two is accurate to a few per cent and was the standard in RRKM calculations before exact counting became routine.
:::

::: quiz
According to RRKM theory, which change *increases* the rate constant $k_2(E)$ of an energised molecule at fixed total energy $E$?
- [x] Loosening the transition state (lowering some of its vibrational frequencies), which raises $N^\ddagger(E - E_0)$.
- [ ] Adding more low-frequency modes to the reactant, which raises $\rho(E)$.
- [ ] Raising the threshold energy $E_0$.
- [ ] Increasing the pressure of the bath gas.
::: solution
$k_2(E) = N^\ddagger(E - E_0)/h\rho(E)$. A looser transition state has more states below any energy, raising the numerator: this is why simple bond fissions, with loose transition states, have large pre-exponential factors ($10^{15}$–$10^{17}\ \mathrm{s^{-1}}$) and tight, cyclic transition states small ones. More reactant modes raise $\rho(E)$ and *lower* $k_2$ (the energy is diluted); a higher threshold leaves less energy for the complex. Pressure does not change $k_2(E)$ at all — it changes $k_\mathrm{uni}$ by changing the population of energised molecules, which is a different quantity.
:::
:::

::: history
René Marcelin derived a form of the activated-complex rate expression in his 1915 thesis, and Henry Eyring, and independently Meredith Evans and Michael Polanyi, formulated transition-state theory in terms of partition functions in 1935 ([[kinetics/transition-state-theory]]). Frederick Lindemann proposed the collisional activation mechanism at a Faraday Society discussion in 1921 (published 1922), and Cyril Hinshelwood introduced the many-oscillator activation rate in 1926–1927, work that contributed to his share of the 1956 Nobel Prize in Chemistry. Oscar Rice and Herman Ramsperger (1927) and Louis Kassel (1928) developed the RRK theory; Rudolph Marcus combined it with transition-state theory in 1952 (with Rice's early collaboration), giving RRKM theory. Marcus received the 1992 Nobel Prize in Chemistry for his theory of electron-transfer reactions, another statistical rate theory. Direct tests of the statistical assumption came from chemical activation and, later, from femtosecond experiments that watched IVR occur.
:::

## Where this leads

Statistical rate theories are the working tools of gas-phase kinetics, combustion and atmospheric chemistry, where pressure-dependent rate constants (expressed as Troe fall-off parameters in kinetic databases such as those of IUPAC and NASA/JPL) are needed for every unimolecular and recombination step ([[environmental-chemistry/tropospheric-chemistry]], [[kinetics/chain-reactions]]). Variational TST, which places the dividing surface where the computed flux is smallest, and the microcanonical variational methods used for barrierless reactions, are refinements of the ideas here; their failures — non-statistical dynamics, incomplete IVR, recrossing — are the subject of reaction dynamics ([[kinetics/reaction-dynamics]]). In solution, the same free-energy picture underlies Marcus theory of electron transfer ([[electrochemistry/electrode-kinetics]]) and the analysis of enzyme catalysis ([[biochemistry/enzymes]]); computing the free energy along a reaction coordinate in a solvent or protein is a central task of [[computational-chemistry/free-energy-sampling]].

::: summary
- TST in partition-function form: $k_2 = \kappa(k_\mathrm{B}T/h)\,(\bar q^{\,\ddagger}/V)/[(q_\mathrm{A}/V)(q_\mathrm{B}/V)]\,e^{-\Delta E_0/k_\mathrm{B}T}$, with the reaction-coordinate mode removed from $\bar q^{\,\ddagger}$ and $\Delta E_0$ measured between zero-point levels.
- For atom + atom, TST reduces exactly to collision theory, $k = \pi d^{2}(8k_\mathrm{B}T/\pi\mu)^{1/2}e^{-\Delta E_0/k_\mathrm{B}T}$; Planck's constant cancels.
- The steric factor is a ratio of partition functions: $P \approx (q_\mathrm{v}/q_\mathrm{r})^{5}$ for two nonlinear reactants, $10^{-5}$–$10^{-9}$, the entropic price of orientation.
- Lindemann: $k_\mathrm{uni} = k_1k_2[\mathrm{M}]/(k_{-1}[\mathrm{M}] + k_2)$, first order at high pressure and second order at low; strong-collision estimates of the fall-off pressure are many orders too high.
- Hinshelwood and RRK: energy shared among $s$ oscillators; $k_2(E) = \nu(1 - E_0/E)^{s-1}$ rises steeply above threshold.
- RRKM: $k_2(E) = N^\ddagger(E - E_0)/h\rho(E)$, microcanonical TST with exact state counts; loose transition states give large rate constants, many reactant modes small ones.
:::

## Exercises

::: exercise The universal frequency at 500 K {level=1 check="1.042e13"}
Calculate $k_\mathrm{B}T/h$ at $500\ \mathrm{K}$. (Enter it in $\mathrm{s^{-1}}$.)
::: solution
$k_\mathrm{B}T/h = 1.380\,649\times10^{-23}\times500/6.626\,070\times10^{-34} = 1.042\times10^{13}\ \mathrm{s^{-1}}$. It is the rate at which complexes cross the dividing surface per unit $K^\ddagger$, independent of their mass.
:::
:::

::: exercise RRK rate constant {level=1 check="1.95e10"}
An energised molecule is modelled as $s = 10$ oscillators with $\nu = 1.0\times10^{13}\ \mathrm{s^{-1}}$. Calculate $k_2$ when $E = 2E_0$. (Enter $k_2$ in $\mathrm{s^{-1}}$.)
::: solution
$k_2 = \nu(1 - E_0/E)^{s-1} = 1.0\times10^{13}\times(0.5)^{9} = 1.0\times10^{13}\times1.953\times10^{-3} = 1.95\times10^{10}\ \mathrm{s^{-1}}$. Even with twice the threshold energy, the molecule survives on average about 2000 vibrational periods before the energy gathers in the critical bond.
:::
:::

::: exercise The Hinshelwood factor {level=1 check="7.22e8"}
Calculate the factor $(E_0/RT)^{s-1}/(s-1)!$ by which Hinshelwood's activation rate exceeds the single-oscillator value when $E_0/RT = 40$ and $s = 10$. (Enter the factor.)
::: solution
$40^{9}/9! = 2.621\times10^{14}/362\,880 = 7.22\times10^{8}$. Nearly a billionfold: sharing the energy among ten oscillators makes "at least $E_0$ in total" vastly more probable than "at least $E_0$ in one mode".
:::
:::

::: exercise Fall-off half-pressure {level=2 check="2.0e-4"}
For a unimolecular reaction, $k_\infty = 2.0\times10^{-3}\ \mathrm{s^{-1}}$ and the low-pressure (second-order) rate constant is $k_1 = 1.0\times10^{1}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. Find $[\mathrm{M}]_{1/2}$ and the value of $k_\mathrm{uni}$ when $[\mathrm{M}] = 1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$. (Enter $[\mathrm{M}]_{1/2}$ in $\mathrm{mol\,dm^{-3}}$.)
::: solution
$[\mathrm{M}]_{1/2} = k_\infty/k_1 = 2.0\times10^{-3}/10 = 2.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ (about $1.2\ \mathrm{kPa}$ at $700\ \mathrm{K}$). At $[\mathrm{M}] = 1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$, $k_\mathrm{uni} = k_\infty/(1 + 2.0) = 6.7\times10^{-4}\ \mathrm{s^{-1}}$, one third of the high-pressure value: the reaction is in the fall-off region.
:::
:::

::: exercise TST prefactor for atom + atom {level=2 check="0.5"}
According to [[#eq-collision]], how does the pre-exponential factor of an atom + atom reaction depend on temperature, and what is the corresponding difference $E_\mathrm{a} - \Delta E_0$ in units of $RT$? (Enter $(E_\mathrm{a} - \Delta E_0)/RT$.)
::: solution
The prefactor $\pi d^{2}(8k_\mathrm{B}T/\pi\mu)^{1/2}$ varies as $T^{1/2}$. With $E_\mathrm{a} = RT^{2}\,\mathrm{d}\ln k/\mathrm{d}T = RT^{2}(\tfrac{1}{2}T^{-1} + \Delta E_0/RT^{2}) = \Delta E_0 + \tfrac{1}{2}RT$, so $(E_\mathrm{a} - \Delta E_0)/RT = 0.5$ — the collision-theory relation of [[kinetics/collision-theory]]. In general, TST gives $E_\mathrm{a} - \Delta E_0 = RT^{2}\,\mathrm{d}\ln[(k_\mathrm{B}T/h)\bar q^{\,\ddagger}/q_\mathrm{A}q_\mathrm{B}]/\mathrm{d}T$, a sum of $\tfrac{1}{2}RT$ terms for each temperature power in the partition-function ratio.
:::
:::

::: exercise Counting states of a transition state {level=2 check="35"}
A transition state has four harmonic modes of $500\ \mathrm{cm^{-1}}$. How many vibrational states does it have with energy (above its zero-point level) no greater than $1500\ \mathrm{cm^{-1}}$? (Enter $N^\ddagger$.)
::: solution
The energy allows at most $n = 3$ quanta shared among $s = 4$ oscillators. The number of ways to distribute *at most* $n$ identical quanta among $s$ oscillators equals the number of ways to distribute exactly $n$ among $s + 1$ (adding a "slack" oscillator): $\binom{n+s}{s} = \binom{7}{4} = 35$. Directly: $1$ (no quanta) $+ 4$ (one) $+ 10$ (two) $+ 20$ (three) $= 35$. The classical formula $E^{s}/s! = 3^{4}/24 = 3.4$ underestimates by a factor of ten.
:::
:::

::: exercise Classical RRKM reduces to RRK {level=3}
Using $N(E) = E^{s}/(s!\prod_ih\nu_i)$ for $s$ classical harmonic oscillators, derive the classical limit of [[#eq-rrkm]] stated in [[#prop-rrkm]], and show that for a transition state in which the reaction coordinate replaces the mode of frequency $\nu_1$ and all others are unchanged, $k_2(E) = \nu_1(1 - E_0/E)^{s-1}$. Interpret the result.
::: solution
$\rho(E) = \mathrm{d}N/\mathrm{d}E = E^{s-1}/((s-1)!\prod_{i=1}^{s}h\nu_i)$. The complex has $s - 1$ oscillators, so $N^\ddagger(E - E_0) = (E - E_0)^{s-1}/((s-1)!\prod_{j=1}^{s-1}h\nu_j^\ddagger)$. Then
$$
k_2(E) = \frac{N^\ddagger}{h\rho} = \frac{(E - E_0)^{s-1}}{(s-1)!\prod_jh\nu_j^\ddagger}\cdot\frac{(s-1)!\prod_ih\nu_i}{hE^{s-1}} = \frac{\prod_{i=1}^{s}\nu_i}{\prod_{j=1}^{s-1}\nu_j^\ddagger}\left(1 - \frac{E_0}{E}\right)^{s-1},
$$
the $h$ factors cancelling ($s$ in the numerator, $s - 1 + 1$ in the denominator). If $\nu_j^\ddagger = \nu_{j+1}$ for $j = 1, \ldots, s-1$, the ratio of products is $\nu_1$, and $k_2 = \nu_1(1 - E_0/E)^{s-1}$: the critical oscillator attempts to break once per period, succeeding with the RRK probability. The "frequency factor" of RRK theory is therefore not a free parameter but a ratio of reactant and transition-state frequencies; when the transition state is looser (lower $\nu_j^\ddagger$), the effective $\nu$ exceeds any real vibrational frequency, which is how pre-exponential factors above $10^{14}\ \mathrm{s^{-1}}$ arise.
:::
:::

::: exercise The high-pressure limit of RRKM is TST {level=3}
At high pressure the energised molecules are in thermal equilibrium, with the Boltzmann distribution $P(E) = \rho(E)e^{-\beta E}/q$ over energies, where $q = \int_0^\infty\rho(E)e^{-\beta E}\,\mathrm{d}E$ is the reactant's vibrational partition function. Show that $k_\infty = \int_{E_0}^\infty k_2(E)P(E)\,\mathrm{d}E$, with $k_2$ from [[#eq-rrkm]], equals the unimolecular TST expression $(k_\mathrm{B}T/h)(\bar q^{\,\ddagger}/q)e^{-\beta E_0}$.
::: hint
Integrate by parts, or note that $\int_0^\infty N(x)e^{-\beta x}\,\mathrm{d}x = q/\beta$ for any sum of states $N$ whose derivative is the density $\rho$ with partition function $q$.
:::
::: solution
Substituting, $k_\infty = \int_{E_0}^\infty\frac{N^\ddagger(E - E_0)}{h\rho(E)}\cdot\frac{\rho(E)e^{-\beta E}}{q}\,\mathrm{d}E = \frac{e^{-\beta E_0}}{hq}\int_0^\infty N^\ddagger(x)e^{-\beta x}\,\mathrm{d}x$ with $x = E - E_0$: the density of states of the reactant cancels. Integrating by parts, with $\mathrm{d}N^\ddagger/\mathrm{d}x = \rho^\ddagger$ and $N^\ddagger(x)e^{-\beta x}\to0$ as $x\to\infty$ (in the continuum treatment $N^\ddagger(0) = 0$; for discrete levels the same result follows by summing, $N^\ddagger$ being a staircase),
$$
\int_0^\infty N^\ddagger(x)e^{-\beta x}\,\mathrm{d}x = \left[-\frac{N^\ddagger e^{-\beta x}}{\beta}\right]_0^\infty + \frac{1}{\beta}\int_0^\infty\rho^\ddagger(x)e^{-\beta x}\,\mathrm{d}x = \frac{\bar q^{\,\ddagger}}{\beta} .
$$
Hence $k_\infty = (k_\mathrm{B}T/h)(\bar q^{\,\ddagger}/q)e^{-\beta E_0}$, the TST result of [[#prop-tst]] for a unimolecular step (with the rotational and translational factors, which are the same for reactant and complex in this model, cancelled). RRKM is thus the energy-resolved form of TST, and TST is its thermal average: the two theories make the same statistical assumption, applied to different ensembles.
:::
:::
