The standard potential of the hydrogen electrode is the same on every metal — it is zero by definition — and thermodynamics says that any electrode held negative of $0\ \mathrm{V}$ in $1\ \mathrm{mol\,dm^{-3}}$ acid should evolve hydrogen. On platinum it does: a few tens of millivolts beyond equilibrium give a brisk stream of bubbles. On lead or mercury almost nothing happens until the electrode is about a volt more negative. A lead–acid battery, whose negative plate sits $0.36\ \mathrm{V}$ below the hydrogen potential, could not exist without this sluggishness, and neither could the electrolytic production of zinc, or polarography at mercury. The difference between metals is not thermodynamic. It is kinetic: the *rate* of electron transfer across the interface, at a given departure from equilibrium, differs by ten orders of magnitude from one metal to another.

This chapter develops the kinetics of electrode reactions. The key idea, which makes electrochemical kinetics unusually clean, is that the electrode potential acts directly on the activation Gibbs energy: changing the potential by $0.1\ \mathrm{V}$ changes the energy of the electrons by $9.6\ \mathrm{kJ\,mol^{-1}}$, and a fraction of that change goes into the barrier. From this we shall derive the Butler–Volmer equation, the exchange current density, the charge-transfer resistance and Tafel's law, add mass transport to obtain the full current–potential curve, and look briefly at Marcus theory and at multistep reactions such as hydrogen evolution. The background is transition-state theory ([[kinetics/transition-state-theory]]) and the structure of the interface ([[electrochemistry/double-layer]]).

## Current as a reaction rate

For an electrode reaction $\mathrm{O} + n\mathrm{e^-} \rightleftharpoons \mathrm{R}$, every mole of O reduced carries $nF$ of charge through the interface, so a current is simply a rate of reaction measured in amperes.

::: definition Faradaic current density and overpotential {#def-overpotential}
The **faradaic current** $I$ through an electrode is the current due to electron transfer across its interface; the **current density** is $j = I/A$. With the IUPAC sign convention, anodic (oxidation) currents are positive and cathodic (reduction) currents negative. If the net rate of oxidation per unit area is $v_\mathrm{net} = v_\mathrm{ox} - v_\mathrm{red}$ (in $\mathrm{mol\,m^{-2}\,s^{-1}}$), then
$$
j = nFv_\mathrm{net} = nF(v_\mathrm{ox} - v_\mathrm{red}) .
$$
The **overpotential** is the departure of the electrode potential from its equilibrium (zero-current) value,
$$
\eta = E - E_\mathrm{eq} ,
$$ {#eq-eta}
where $E_\mathrm{eq}$ is given by the Nernst equation for the bulk solution composition. An anodic current requires $\eta > 0$, a cathodic current $\eta < 0$.
:::

Faraday's laws of electrolysis (1833–1834) are the statement that $I\,\mathrm{d}t = nF\,\mathrm{d}n_\mathrm{reacted}$. Their power in kinetics is that a current of a microampere is easy to measure, and it corresponds to only $10^{-11}\ \mathrm{mol\,s^{-1}}$ of reaction: electrochemistry measures rates with exquisite sensitivity, and controls them with a knob.

The rates of the forward and backward electron transfers are first order in the surface concentrations of O and R:
$$
v_\mathrm{red} = k_\mathrm{red}\,c_\mathrm{O}(0,t), \qquad v_\mathrm{ox} = k_\mathrm{ox}\,c_\mathrm{R}(0,t),
$$
where $c(0,t)$ is the concentration at the electrode surface (strictly at the outer Helmholtz plane), and the heterogeneous rate constants $k_\mathrm{red}$ and $k_\mathrm{ox}$ have units of $\mathrm{m\,s^{-1}}$ (usually quoted in $\mathrm{cm\,s^{-1}}$) because they convert a volume concentration into a flux per unit area. The whole subject is the dependence of these rate constants on potential.

## How potential changes the barrier

Picture the Gibbs energy of the system along a reaction coordinate for $\mathrm{O} + \mathrm{e^-}(\text{metal}) \rightarrow \mathrm{R}$. On the left, the electron is in the metal and O sits at the interface; on the right, the electron is on R. If the electrode potential is raised by $\Delta E$, the electrochemical potential of electrons in the metal falls by $F\Delta E$ ([[electrochemistry/cell-thermodynamics#def-echem-potential]]), so the left-hand (reactant) curve drops by $F\Delta E$ relative to the right-hand one. Near the crossing point, the barrier for reduction rises by a fraction of that, and the barrier for oxidation falls by the rest.

::: definition Transfer coefficient {#def-alpha}
For a one-electron step, the **transfer coefficient** $\alpha$ (also called the symmetry factor $\beta$ for a single elementary step) is the fraction of a change in the electrical energy $F(E - E^{\circ\prime})$ that appears in the activation Gibbs energy of reduction:
$$
\Delta^\ddagger G_\mathrm{red} = \Delta^\ddagger G_0 + \alpha F(E - E^{\circ\prime}), \qquad
\Delta^\ddagger G_\mathrm{ox} = \Delta^\ddagger G_0 - (1-\alpha)F(E - E^{\circ\prime}),
$$
where $\Delta^\ddagger G_0$ is the common barrier at the formal potential $E^{\circ\prime}$. For intersecting curves of similar slope, $\alpha \approx 0.5$; experimental values usually lie between $0.3$ and $0.7$.
:::

::: proposition Potential dependence of the rate constants {#prop-rate-constants}
For a one-electron outer-sphere reaction, with $f \equiv F/RT$ ($38.92\ \mathrm{V^{-1}}$ at $25\,^\circ\mathrm{C}$),
$$
k_\mathrm{red} = k^\circ\exp\!\left[-\alpha f(E - E^{\circ\prime})\right], \qquad
k_\mathrm{ox} = k^\circ\exp\!\left[(1-\alpha)f(E - E^{\circ\prime})\right],
$$ {#eq-k}
where $k^\circ$, the **standard heterogeneous rate constant**, is the common value of both rate constants at $E = E^{\circ\prime}$. At equilibrium these rate laws reproduce the Nernst equation.
:::

::: proof
Transition-state theory ([[kinetics/transition-state-theory]]) gives each rate constant as a pre-exponential factor times $\exp(-\Delta^\ddagger G/RT)$. Inserting the barriers of [[#def-alpha]], with the same pre-factor $Z$ for both directions,
$$
k_\mathrm{red} = Z\mathrm{e}^{-\Delta^\ddagger G_0/RT}\mathrm{e}^{-\alpha f(E - E^{\circ\prime})}, \qquad
k_\mathrm{ox} = Z\mathrm{e}^{-\Delta^\ddagger G_0/RT}\mathrm{e}^{(1-\alpha)f(E - E^{\circ\prime})},
$$
and the common factor $Z\mathrm{e}^{-\Delta^\ddagger G_0/RT}$ is $k^\circ$. For consistency, at equilibrium with no net current, $k_\mathrm{red}c_\mathrm{O} = k_\mathrm{ox}c_\mathrm{R}$, so
$$
\frac{c_\mathrm{O}}{c_\mathrm{R}} = \frac{k_\mathrm{ox}}{k_\mathrm{red}} = \mathrm{e}^{f(E - E^{\circ\prime})}, \qquad E = E^{\circ\prime} + \frac{RT}{F}\ln\frac{c_\mathrm{O}}{c_\mathrm{R}},
$$
which is the Nernst equation in terms of the formal potential. The exponents of [[#eq-k]] must differ by exactly $f(E - E^{\circ\prime})$ for this to work, which is why $\alpha$ and $1 - \alpha$ appear together.
:::

The size of the effect is the essence of electrochemistry's power. At $25\,^\circ\mathrm{C}$, $\alpha f = 19.5\ \mathrm{V^{-1}}$ for $\alpha = 0.5$, so moving the potential by $118\ \mathrm{mV}$ changes a rate constant by a factor of ten, and a volt changes it by eight orders of magnitude. To achieve the same with temperature you would need to heat a reaction with a $50\ \mathrm{kJ\,mol^{-1}}$ barrier from room temperature to well over $1000\ \mathrm{K}$.

## The Butler–Volmer equation

::: proposition The Butler–Volmer equation {#prop-bv}
When the surface concentrations equal the bulk concentrations $c_\mathrm{O}^*$ and $c_\mathrm{R}^*$ (fast mass transport, or small currents), the current density of a one-electron reaction at overpotential $\eta$ is
$$
j = j_0\left[\mathrm{e}^{(1-\alpha)f\eta} - \mathrm{e}^{-\alpha f\eta}\right],
$$ {#eq-bv}
with the **exchange current density**
$$
j_0 = Fk^\circ\left(c_\mathrm{O}^*\right)^{1-\alpha}\left(c_\mathrm{R}^*\right)^{\alpha} .
$$ {#eq-j0}
:::

::: proof
The net current is $j = F(k_\mathrm{ox}c_\mathrm{R}^* - k_\mathrm{red}c_\mathrm{O}^*)$. At equilibrium the two terms are equal; each is the exchange current density, $j_0 = Fk_\mathrm{red}(E_\mathrm{eq})c_\mathrm{O}^* = Fk_\mathrm{ox}(E_\mathrm{eq})c_\mathrm{R}^*$. Substituting [[#eq-k]] with $E_\mathrm{eq} - E^{\circ\prime} = (1/f)\ln(c_\mathrm{O}^*/c_\mathrm{R}^*)$:
$$
j_0 = Fk^\circ c_\mathrm{O}^*\left(\frac{c_\mathrm{O}^*}{c_\mathrm{R}^*}\right)^{-\alpha} = Fk^\circ\left(c_\mathrm{O}^*\right)^{1-\alpha}\left(c_\mathrm{R}^*\right)^{\alpha} .
$$
Now write $E - E^{\circ\prime} = \eta + (E_\mathrm{eq} - E^{\circ\prime})$ in each rate constant. Then $Fk_\mathrm{red}c_\mathrm{O}^* = Fk_\mathrm{red}(E_\mathrm{eq})c_\mathrm{O}^*\,\mathrm{e}^{-\alpha f\eta} = j_0\mathrm{e}^{-\alpha f\eta}$ and similarly $Fk_\mathrm{ox}c_\mathrm{R}^* = j_0\mathrm{e}^{(1-\alpha)f\eta}$. Their difference is [[#eq-bv]].
:::

The exchange current density is the central kinetic parameter of an electrode. At equilibrium the net current is zero, but oxidation and reduction are both proceeding, each at the rate $j_0/F$; $j_0$ measures how readily the interface passes charge in both directions, and it depends on concentration, the electrode material and its surface state.

::: example Exchange current and a fast couple {#ex-j0}
A one-electron redox mediator has $k^\circ = 1.0\times10^{-3}\ \mathrm{cm\,s^{-1}}$ and $\alpha = 0.50$ at a gold electrode, with both forms present at $1.0\ \mathrm{mmol\,dm^{-3}}$. Find $j_0$, and the current density at $\eta = +50\ \mathrm{mV}$ and $\eta = +200\ \mathrm{mV}$ (ignoring mass transport) at $25\,^\circ\mathrm{C}$.
::: solution
With $c = 1.0\ \mathrm{mmol\,dm^{-3}} = 1.0\times10^{-6}\ \mathrm{mol\,cm^{-3}}$,
$$
j_0 = Fk^\circ c = 96\,485\ \mathrm{C\,mol^{-1}}\times1.0\times10^{-3}\ \mathrm{cm\,s^{-1}}\times1.0\times10^{-6}\ \mathrm{mol\,cm^{-3}} = 9.6\times10^{-5}\ \mathrm{A\,cm^{-2}} = 96\ \mu\mathrm{A\,cm^{-2}} .
$$
At $\eta = 0.050\ \mathrm{V}$: $\alpha f\eta = (1-\alpha)f\eta = 0.973$, so $j = j_0(\mathrm{e}^{0.973} - \mathrm{e}^{-0.973}) = j_0(2.646 - 0.378) = 2.27j_0 = 0.22\ \mathrm{mA\,cm^{-2}}$. At $\eta = 0.200\ \mathrm{V}$: $(1-\alpha)f\eta = 3.89$, and $j = j_0(49.0 - 0.020) = 49j_0 = 4.7\ \mathrm{mA\,cm^{-2}}$. In practice a current this large from a millimolar solution would be limited by mass transport (it exceeds the diffusion-limited current of an unstirred solution), which is why we shall need [[#prop-full]]. Note the concentration unit trap: $k^\circ$ in $\mathrm{cm\,s^{-1}}$ needs $c$ in $\mathrm{mol\,cm^{-3}}$ to give $\mathrm{A\,cm^{-2}}$.
:::
:::

### Two limits: linear and Tafel

::: proposition Low- and high-overpotential limits {#prop-limits}
(1) For $|\eta| \ll RT/F$ (in practice $|\eta| \lesssim 10\ \mathrm{mV}$), the Butler–Volmer equation is linear:
$$
j = j_0f\eta, \qquad R_\mathrm{ct} \equiv \frac{\eta}{j} = \frac{RT}{Fj_0},
$$ {#eq-rct}
where $R_\mathrm{ct}$ is the **charge-transfer resistance** (in $\Omega\,\mathrm{m^2}$ or $\Omega\,\mathrm{cm^2}$).
(2) For $|\eta| \gg RT/F$ (in practice $|\eta| \gtrsim 100\ \mathrm{mV}$ for $\alpha \approx 0.5$), one exponential dominates and the overpotential is logarithmic in current — **Tafel's law**:
$$
\eta = \frac{RT}{(1-\alpha)F}\ln\frac{j}{j_0} \quad (\text{anodic}), \qquad
\eta = -\frac{RT}{\alpha F}\ln\frac{|j|}{j_0} \quad (\text{cathodic}) .
$$ {#eq-tafel}
Written as $\eta = a + b\log_{10}|j|$, the **Tafel slope** is $b = 2.303RT/(1-\alpha)F$ (anodic) or $-2.303RT/\alpha F$ (cathodic), i.e. $118\ \mathrm{mV}$ per decade for $\alpha = 0.5$ at $25\,^\circ\mathrm{C}$, and the intercept at $\eta = 0$ of a plot of $\log_{10}|j|$ against $\eta$ is $\log_{10}j_0$.
:::

::: proof
(1) Expand both exponentials to first order: $\mathrm{e}^{(1-\alpha)f\eta} - \mathrm{e}^{-\alpha f\eta} \approx [1 + (1-\alpha)f\eta] - [1 - \alpha f\eta] = f\eta$, independent of $\alpha$. The error is of order $(f\eta)^2(1-2\alpha)/2$, small for $\alpha$ near $0.5$ even somewhat beyond $10\ \mathrm{mV}$. (2) For $\eta \gg 1/f$, $\mathrm{e}^{-\alpha f\eta}$ is negligible beside $\mathrm{e}^{(1-\alpha)f\eta}$ — at $\eta = 118\ \mathrm{mV}$ with $\alpha = 0.5$ the neglected term is $1\,\%$ of the kept one — and $j = j_0\mathrm{e}^{(1-\alpha)f\eta}$; taking logarithms gives the anodic form. The cathodic form follows in the same way for $\eta \ll -1/f$. Converting to base 10 introduces the factor $\ln10 = 2.303$, and $2.303RT/F = 59.16\ \mathrm{mV}$ at $25\,^\circ\mathrm{C}$.
:::

The linear regime is the basis of impedance and linear-polarisation measurements, including the corrosion-rate meters of [[electrochemistry/corrosion]]: a $10\ \mathrm{mV}$ perturbation is too small to damage the electrode but enough to measure $R_\mathrm{ct}$, hence $j_0$. The Tafel regime is where electrolysers, fuel cells and most electrosynthesis operate, and the Tafel plot is the standard way to extract $\alpha$ and $j_0$.

::: example Charge-transfer resistance {#ex-rct}
For the couple of [[#ex-j0]] ($j_0 = 96\ \mu\mathrm{A\,cm^{-2}}$), find $R_\mathrm{ct}$ per unit area and for a disc electrode of area $0.0707\ \mathrm{cm^2}$, and the current at $\eta = 5.0\ \mathrm{mV}$.
::: solution
$$
R_\mathrm{ct} = \frac{RT}{Fj_0} = \frac{0.025693\ \mathrm{V}}{9.65\times10^{-5}\ \mathrm{A\,cm^{-2}}} = 266\ \Omega\,\mathrm{cm^2} .
$$
For $A = 0.0707\ \mathrm{cm^2}$, $R = 266/0.0707 = 3.77\ \mathrm{k\Omega}$ — area-specific resistances are *divided* by the area. At $\eta = 5.0\ \mathrm{mV}$, $I = \eta/R = 5.0\times10^{-3}/3770\ \mathrm{A} = 1.33\ \mu\mathrm{A}$. In an impedance spectrum, $R_\mathrm{ct}$ appears in parallel with the double-layer capacitance ([[electrochemistry/double-layer]]) as a semicircle in the complex plane whose diameter is $R_\mathrm{ct}$; with $C_\mathrm{d} = 20\ \mu\mathrm{F\,cm^{-2}}$ its peak is at $\omega = 1/R_\mathrm{ct}C_\mathrm{d} = 1/(266\times20\times10^{-6}) = 188\ \mathrm{rad\,s^{-1}}$, about $30\ \mathrm{Hz}$.
:::
:::

::: widget plot
f: j0*(exp((1-al)*38.92*x) - exp(-al*38.92*x)); j0*exp((1-al)*38.92*x); -j0*exp(-al*38.92*x)
x: -0.25, 0.25
y: -10, 10
sliders: j0=1:0.01:5:0.01; al=0.5:0.2:0.8:0.01
labels: \text{Butler–Volmer } j; \text{anodic branch}; \text{cathodic branch}
hlines: 0
caption: The Butler–Volmer equation [[#eq-bv]]: current density (in the units of $j_0$, e.g. $\mathrm{mA\,cm^{-2}}$) against overpotential $\eta$ in volts at $25\,^\circ\mathrm{C}$. The net current is the difference of the two exponential partial currents. Near $\eta = 0$ the curve is a straight line of slope $fj_0$ (the inverse of $R_\mathrm{ct}$); beyond about $\pm0.1\ \mathrm{V}$ it follows one branch alone (Tafel). Lower $j_0$ to $0.01$ to see an irreversible system: almost no current flows until a large overpotential is applied. Move $\alpha$ away from $0.5$ to make the curve asymmetric — the anodic branch steepens as $\alpha$ falls.
:::

::: warning The exchange current is not a rate constant {#warn-j0}
Students often compare $j_0$ values between experiments as if they were properties of the couple. They are not: by [[#eq-j0]], $j_0$ is proportional to $(c_\mathrm{O}^*)^{1-\alpha}(c_\mathrm{R}^*)^\alpha$, so diluting the solution tenfold lowers $j_0$ tenfold. The concentration-independent kinetic parameter is $k^\circ$. Tables of $j_0$ for hydrogen evolution are quoted for a stated condition ($1\ \mathrm{mol\,dm^{-3}}$ acid, $1\ \mathrm{bar}$ $\mathrm{H_2}$). Two related mistakes: applying the Tafel equation at overpotentials of a few tens of millivolts, where the back reaction is not negligible (the error is $17\,\%$ at $50\ \mathrm{mV}$ for $\alpha = 0.5$); and reading a Tafel slope of $59\ \mathrm{mV}$ per decade as "$\alpha = 1$" for a single electron transfer, when it usually signals a multistep mechanism with a chemical step after the first electron transfer.
:::

## Tafel analysis

::: example A Tafel plot for hydrogen evolution {#ex-tafel}
For hydrogen evolution on a metal in $1\ \mathrm{mol\,dm^{-3}}$ acid at $25\,^\circ\mathrm{C}$, the overpotential (corrected for ohmic drop) is $-0.240\ \mathrm{V}$ at $|j| = 0.10\ \mathrm{mA\,cm^{-2}}$, $-0.360\ \mathrm{V}$ at $1.0\ \mathrm{mA\,cm^{-2}}$ and $-0.480\ \mathrm{V}$ at $10\ \mathrm{mA\,cm^{-2}}$. Find the Tafel slope, $\alpha$ and $j_0$.
::: solution
Each decade of current costs $120\ \mathrm{mV}$, so $b = -0.120\ \mathrm{V\,dec^{-1}}$. With $b = -2.303RT/\alpha F$,
$$
\alpha = \frac{0.05916\ \mathrm{V}}{0.120\ \mathrm{V}} = 0.49 .
$$
Extrapolating to $\eta = 0$: from the middle point, $\log_{10}(|j|/\mathrm{A\,cm^{-2}}) = \log_{10}(1.0\times10^{-3}) - 0.360/0.120 = -3 - 3 = -6$, so $j_0 = 1.0\times10^{-6}\ \mathrm{A\,cm^{-2}}$. This $j_0$ and slope are typical of iron or nickel. Two practical cautions: the extrapolation covers three decades below the data, so a small error in the slope gives a large error in $j_0$; and at these currents bubbles and ohmic drop must be controlled, or the plot bends upwards at high current.
:::
:::

::: widget regression
points: -4,-0.240; -3,-0.360; -2,-0.480
degree: 1
x: -7, -1
y: -0.6, 0.1
caption: The Tafel data of [[#ex-tafel]]: overpotential $\eta$ in volts against $\log_{10}(|j|/\mathrm{A\,cm^{-2}})$. The fitted line's slope is the Tafel slope $b$, and the value of $x$ at which it reaches $\eta = 0$ is $\log_{10}j_0$ (here $-6$). Add a point near $x = -5.5$ at $\eta = -0.05$ — what a real electrode would show close to equilibrium, where the back reaction matters — and see how including non-Tafel data distorts both the slope and the extrapolated $j_0$.
:::

Hydrogen evolution makes the material dependence vivid. Representative exchange current densities in $1\ \mathrm{mol\,dm^{-3}}$ acid at $25\,^\circ\mathrm{C}$ span from about $10^{-3}\ \mathrm{A\,cm^{-2}}$ on platinum through $10^{-5}$–$10^{-6}$ on nickel and iron to $10^{-12}$–$10^{-13}$ on lead and mercury (compilations of Trasatti, 1972). To pass $10\ \mathrm{mA\,cm^{-2}}$, platinum needs a few tens of millivolts; lead, with $b \approx 120\ \mathrm{mV}$ per decade, needs $0.120\times\log_{10}(10^{-2}/10^{-12}) = 1.2\ \mathrm{V}$. This **hydrogen overpotential** lets lead–acid batteries charge their negative plates, zinc be electrowon from acid sulfate solution, and mercury and lead electrodes reduce organic compounds at potentials where water "should" be reduced first.

::: quiz
An electrode reaction has $j_0 = 1.0\ \mathrm{mA\,cm^{-2}}$ and $\alpha = 0.5$. Which overpotential is needed for an anodic current density of $10\ \mathrm{mA\,cm^{-2}}$ at $25\,^\circ\mathrm{C}$ (mass transport fast)?
- [ ] about $59\ \mathrm{mV}$
- [x] about $118\ \mathrm{mV}$
- [ ] about $257\ \mathrm{mV}$, from $\eta = jR_\mathrm{ct}$
- [ ] about $1.2\ \mathrm{V}$
::: solution
One decade above $j_0$ in the Tafel regime costs one Tafel slope, $2.303RT/(1-\alpha)F = 118\ \mathrm{mV}$. (The exact Butler–Volmer value, from $2\sinh(f\eta/2) = 10$, is $119\ \mathrm{mV}$; the back reaction is already only $1\,\%$.) The linear formula $\eta = jR_\mathrm{ct} = j/(fj_0) = 0.26\ \mathrm{V}$ is valid only for $|\eta| \lesssim 10\ \mathrm{mV}$ and fails badly here; $1.2\ \mathrm{V}$ would be ten Tafel slopes, i.e. ten decades of current.
:::
:::

## Adding mass transport

At large overpotentials the surface concentration of the reactant falls below its bulk value, because the reaction consumes it faster than diffusion and convection can resupply it. The rate laws then need the surface concentrations.

::: proposition The current–overpotential equation with mass transport {#prop-full}
If mass transport to and from the electrode is described by limiting current densities $j_{\mathrm{l,a}}$ (for R, anodic) and $j_{\mathrm{l,c}}$ (for O, cathodic, taken positive), so that $c_\mathrm{R}(0)/c_\mathrm{R}^* = 1 - j/j_\mathrm{l,a}$ and $c_\mathrm{O}(0)/c_\mathrm{O}^* = 1 + j/j_\mathrm{l,c}$, then
$$
j = j_0\left[\frac{c_\mathrm{R}(0)}{c_\mathrm{R}^*}\mathrm{e}^{(1-\alpha)f\eta} - \frac{c_\mathrm{O}(0)}{c_\mathrm{O}^*}\mathrm{e}^{-\alpha f\eta}\right]
= \frac{\mathrm{e}^{(1-\alpha)f\eta} - \mathrm{e}^{-\alpha f\eta}}{\dfrac{1}{j_0} + \dfrac{\mathrm{e}^{(1-\alpha)f\eta}}{j_\mathrm{l,a}} + \dfrac{\mathrm{e}^{-\alpha f\eta}}{j_\mathrm{l,c}}} .
$$ {#eq-full}
:::

::: proof
Repeat the derivation of [[#prop-bv]] with the surface concentrations in the rate laws: $j = F[k_\mathrm{ox}c_\mathrm{R}(0) - k_\mathrm{red}c_\mathrm{O}(0)]$, and divide and multiply each term by its bulk concentration to obtain the first form. For the second, the linear relations between surface concentration and current come from a steady diffusion layer of fixed thickness $\delta$ (the Nernst diffusion-layer model of [[electrochemistry/voltammetry]]): the flux of O to the surface is $D_\mathrm{O}(c_\mathrm{O}^* - c_\mathrm{O}(0))/\delta = -j/F$ (cathodic $j < 0$), and its maximum, at $c_\mathrm{O}(0) = 0$, is $j_\mathrm{l,c}/F = D_\mathrm{O}c_\mathrm{O}^*/\delta$; dividing gives $c_\mathrm{O}(0)/c_\mathrm{O}^* = 1 + j/j_\mathrm{l,c}$, and similarly for R. Substituting,
$$
j = j_0\left[\left(1 - \frac{j}{j_\mathrm{l,a}}\right)\mathrm{e}^{(1-\alpha)f\eta} - \left(1 + \frac{j}{j_\mathrm{l,c}}\right)\mathrm{e}^{-\alpha f\eta}\right],
$$
and collecting the terms in $j$ on the left gives the second form.
:::

The denominator is a sum of "resistances in series" in the sense of rates: at small $\eta$ the kinetic term $1/j_0$ dominates; at large $|\eta|$ one exponential grows and the corresponding mass-transport term takes over, so the current saturates at $j_\mathrm{l,a}$ or $-j_\mathrm{l,c}$. An electrode is called **reversible** (electrochemically) when $j_0 \gg j_\mathrm{l}$, so that the interface stays in Nernstian equilibrium with the surface concentrations at every current and the curve is governed by transport alone; **irreversible** when $j_0 \ll j_\mathrm{l}$, so that a large overpotential is needed before any current flows. The same couple can be either, depending on how fast mass is transported — a distinction central to [[electrochemistry/voltammetry]].

::: widget plot
f: (exp((1-al)*38.92*x) - exp(-al*38.92*x))/(1/j0 + exp((1-al)*38.92*x)/jl + exp(-al*38.92*x)/jl); j0*(exp((1-al)*38.92*x) - exp(-al*38.92*x))
x: -0.5, 0.5
y: -8, 8
sliders: j0=1:0.0001:20:0.0001; al=0.5:0.2:0.8:0.01; jl=5:1:10:0.1
labels: \text{with mass transport}; \text{Butler–Volmer alone}
hlines: 5; -5
caption: The full current–overpotential curve [[#eq-full]] (current densities in $\mathrm{mA\,cm^{-2}}$, $\eta$ in volts, $25\,^\circ\mathrm{C}$) with equal anodic and cathodic limiting currents $j_\mathrm{l}$, compared with the Butler–Volmer curve without transport limitation. With $j_0 = 20$ (reversible), the curve is a steep sigmoid that reaches the plateaus within about $\pm0.1\ \mathrm{V}$, and its shape no longer depends on $j_0$ or $\alpha$. Lower $j_0$ to $0.001$ (irreversible) and the curve splits into separate anodic and cathodic waves, hundreds of millivolts apart, whose rising portions are Tafel lines.
:::

## Measuring kinetics without disturbing the electrode: impedance

Tafel analysis drives an electrode far from equilibrium, which can change its surface. The linear regime of [[#prop-limits]] offers a gentler route. Apply a small sinusoidal potential $\Delta E\sin\omega t$ of $5$–$10\ \mathrm{mV}$ about the equilibrium potential and measure the current's amplitude and phase over a range of angular frequencies $\omega$. Their ratio, the complex **impedance** $Z(\omega)$, is the electrochemical analogue of a circuit's impedance. For a simple electron transfer with fast mass transport, the interface behaves as the charge-transfer resistance $R_\mathrm{ct}$ in parallel with the double-layer capacitance $C_\mathrm{d}$ ([[electrochemistry/double-layer]]), both in series with the uncompensated solution resistance $R_\mathrm{u}$ — the **Randles circuit** (without its diffusional Warburg element):
$$
Z(\omega) = R_\mathrm{u} + \frac{R_\mathrm{ct}}{1 + \mathrm{i}\omega R_\mathrm{ct}C_\mathrm{d}} = R_\mathrm{u} + \frac{R_\mathrm{ct}}{1 + (\omega R_\mathrm{ct}C_\mathrm{d})^2} - \mathrm{i}\,\frac{\omega R_\mathrm{ct}^2C_\mathrm{d}}{1 + (\omega R_\mathrm{ct}C_\mathrm{d})^2} .
$$
Plotted as $-\mathrm{Im}\,Z$ against $\mathrm{Re}\,Z$ (a **Nyquist plot**), this traces a semicircle: at high frequency the capacitor short-circuits the interface and $Z \rightarrow R_\mathrm{u}$; at low frequency the capacitor is open and $Z \rightarrow R_\mathrm{u} + R_\mathrm{ct}$; and the top of the semicircle, where $-\mathrm{Im}\,Z = R_\mathrm{ct}/2$, lies at $\omega = 1/R_\mathrm{ct}C_\mathrm{d}$. One measurement therefore gives $R_\mathrm{u}$, $R_\mathrm{ct}$ (hence $j_0$) and $C_\mathrm{d}$ separately — the three quantities that a single current–potential curve mixes together. At still lower frequencies, diffusion adds a $45^\circ$ line (the Warburg impedance), and in batteries and fuel cells several semicircles appear, one for each interface or process with its own time constant.

::: widget parametric
fx: Ru + Rct/(1 + (10^t*Rct*C*1e-6)^2)
fy: 10^t*Rct^2*C*1e-6/(1 + (10^t*Rct*C*1e-6)^2)
t: -1, 6
x: 0, 160
y: 0, 80
sliders: Ru=20:0:50:1; Rct=100:10:140:1; C=20:5:50:1
equal: true
caption: Nyquist plot of the Randles circuit: $-\mathrm{Im}\,Z$ against $\mathrm{Re}\,Z$ (both in $\Omega$) as the angular frequency $\omega = 10^{t}\ \mathrm{rad\,s^{-1}}$ sweeps from $0.1$ to $10^{6}\ \mathrm{rad\,s^{-1}}$; the moving point follows the frequency. Sliders: solution resistance $R_\mathrm{u}$, charge-transfer resistance $R_\mathrm{ct}$ and double-layer capacitance $C$ in $\mu\mathrm{F}$. The semicircle starts at $R_\mathrm{u}$ (high frequency, left) and ends at $R_\mathrm{u} + R_\mathrm{ct}$ (low frequency, right). Changing $C$ does not change the shape — only which frequency sits at the apex ($\omega = 1/R_\mathrm{ct}C$, $500\ \mathrm{rad\,s^{-1}}$ by default) — which is why impedance spectra are always reported with frequencies marked.
:::

## Beyond Butler–Volmer: Marcus theory

The Butler–Volmer equation treats $\alpha$ as constant, which makes Tafel plots perfectly straight. Rudolph Marcus's theory of electron transfer (1956 for homogeneous reactions; extended to electrodes in 1965) predicts that they should curve. Electron transfer is much faster than nuclear motion, so it can occur only at a nuclear configuration at which the reactant and product states have equal energy (the Franck–Condon principle). If the Gibbs energy of each state is a parabola in a collective solvent coordinate, with the same curvature, then with **reorganisation energy** $\lambda$ — the energy needed to distort the reactant and its solvent shell into the equilibrium configuration of the product without transferring the electron — the activation Gibbs energy for reduction at an electrode is
$$
\Delta^\ddagger G_\mathrm{red} = \frac{\left[\lambda + F(E - E^{\circ\prime})\right]^2}{4\lambda}
$$
per mole (for a reaction at the outer Helmholtz plane, ignoring work terms). At $E = E^{\circ\prime}$ the barrier is $\lambda/4$. Differentiating with respect to $F(E - E^{\circ\prime})$ gives the transfer coefficient
$$
\alpha = \frac{\partial\Delta^\ddagger G_\mathrm{red}}{\partial[F(E - E^{\circ\prime})]} = \frac{1}{2} + \frac{F(E - E^{\circ\prime})}{2\lambda},
$$
which equals $\tfrac{1}{2}$ at the formal potential and changes linearly with potential. For typical reorganisation energies of $0.5$–$1.5\ \mathrm{eV}$ ($50$–$150\ \mathrm{kJ\,mol^{-1}}$), $\alpha$ changes by only about $0.05$ per $100\ \mathrm{mV}$, which is why Tafel plots look straight over a decade or two; careful measurements over wide ranges of overpotential (Chidsey, 1991, with redox groups tethered to gold through alkanethiol monolayers) confirmed the curvature. On a metal electrode the "inverted region" of homogeneous Marcus theory is not reached, because the metal offers electrons over a continuous range of energies; the rate instead levels off at large overpotentials. The theory of outer-sphere electron transfer in solution, from which this comes, is discussed in [[coordination-chemistry/inorganic-mechanisms]].

::: example A potential-dependent transfer coefficient {#ex-marcus}
A couple has $\lambda = 1.00\ \mathrm{eV}$ ($96.5\ \mathrm{kJ\,mol^{-1}}$). Find the activation Gibbs energy for reduction and $\alpha$ at $E - E^{\circ\prime} = 0$ and at $-0.30\ \mathrm{V}$.
::: solution
Working per electron in electronvolts (so $F(E - E^{\circ\prime})$ becomes $e(E - E^{\circ\prime})$): at $E = E^{\circ\prime}$, $\Delta^\ddagger G = \lambda/4 = 0.250\ \mathrm{eV}$ ($24.1\ \mathrm{kJ\,mol^{-1}}$) and $\alpha = 0.50$. At $-0.30\ \mathrm{V}$:
$$
\Delta^\ddagger G = \frac{(1.00 - 0.30)^2}{4\times1.00}\ \mathrm{eV} = 0.1225\ \mathrm{eV}\ (11.8\ \mathrm{kJ\,mol^{-1}}), \qquad
\alpha = \frac{1}{2} - \frac{0.30}{2\times1.00} = 0.35 .
$$
The Butler–Volmer prediction with constant $\alpha = 0.5$ would be $0.250 - 0.5\times0.30 = 0.100\ \mathrm{eV}$: the barrier falls *less* than linearly, so the rate constant at $-0.30\ \mathrm{V}$ is smaller than the straight Tafel line predicts, by a factor $\mathrm{e}^{(0.1225 - 0.100)/0.025693} = 2.4$. Over $300\ \mathrm{mV}$ the measured Tafel slope would steepen from $118$ towards $170\ \mathrm{mV}$ per decade.
:::
:::

## Multistep reactions: the hydrogen electrode

Most reactions of practical importance transfer more than one electron and involve adsorbed intermediates. Hydrogen evolution in acid on a metal M proceeds through adsorbed hydrogen atoms $\mathrm{H_{ad}}$:
$$
\begin{aligned}
&\text{Volmer (discharge):} && \mathrm{H^+ + e^- + M \rightarrow M\text{–}H_{ad}}\\
&\text{Heyrovsky (electrochemical desorption):} && \mathrm{M\text{–}H_{ad} + H^+ + e^- \rightarrow M + H_2}\\
&\text{Tafel (recombination):} && \mathrm{2\,M\text{–}H_{ad} \rightarrow 2M + H_2}
\end{aligned}
$$
Two pathways exist, Volmer–Heyrovsky and Volmer–Tafel, and the rate-determining step leaves a fingerprint in the Tafel slope. If the first electron transfer (Volmer) is rate-determining, the slope is $2.303RT/\alpha F \approx 118\ \mathrm{mV}$ per decade. If the Volmer step is fast and at equilibrium and the second electron transfer (Heyrovsky) is rate-determining, the surface coverage of $\mathrm{H_{ad}}$ itself increases exponentially with $-\eta$ (at low coverage), adding a full factor $f$ to the exponent: the slope becomes $2.303RT/(1+\alpha)F \approx 40\ \mathrm{mV}$ per decade. If the chemical recombination (Tafel step) is rate-determining after a fast Volmer equilibrium, the rate goes as the square of the coverage, and the slope is $2.303RT/2F \approx 30\ \mathrm{mV}$ per decade, as on platinum in acid.

::: algorithm Diagnosing a mechanism from Tafel slopes {#alg-tafel}
1. Measure steady-state $|j|$ over at least two decades in the Tafel region, correct $\eta$ for ohmic drop ($\eta_\mathrm{true} = \eta_\mathrm{meas} - jR_\mathrm{u}$) and for mass transport, and plot $\eta$ against $\log_{10}|j|$.
2. Read the slope $b$ and convert to an *apparent* transfer coefficient $\alpha_\mathrm{app} = 2.303RT/(F|b|)$; its value is $\alpha$, $1 + \alpha$ or $2$ for the three classical cases above (more generally, the number of electrons transferred before and in the rate-determining step).
3. Measure the reaction orders, $(\partial\log|j|/\partial\log c_i)_\eta$, with respect to each reactant (e.g. $\mathrm{H^+}$).
4. Propose mechanisms consistent with both slope and orders, and test their predictions at other temperatures, pH values or surface coverages. A Tafel slope alone rarely proves a mechanism: different mechanisms can share a slope, and coverage effects change the slope with potential.
:::

The rate of the Volmer step depends on the strength of the M–H bond. Too weak, and the metal cannot hold hydrogen atoms long enough to form $\mathrm{H_2}$; too strong, and the adsorbed atoms poison the surface. Plotted against the M–H bond energy, $\log j_0$ forms a **volcano** with platinum-group metals at the top, a direct expression of Sabatier's principle in catalysis ([[kinetics/surface-kinetics]]). Designing cheaper catalysts near the top of the volcano is one of the subjects of [[electrochemistry/fuel-cells-electrolysis]].

::: history From Tafel's law to Marcus {#hist-kinetics}
Julius Tafel, working on the electroreduction of organic compounds in Würzburg, reported in 1905 that the overpotential of hydrogen evolution increases linearly with the logarithm of the current density. John Alfred Valentine Butler (1924) and Tibor Erdey-Grúz with Max Volmer (1930) gave the theoretical explanation by letting the electrode potential lower one activation barrier and raise the other, and Alexander Frumkin (1933) added the correction for the potential drop in the diffuse layer. Juro Horiuti and Michael Polanyi (1935) interpreted the transfer coefficient through intersecting potential-energy curves, and Ronald Gurney (1931) had already given a quantum-mechanical treatment of electron transfer at electrodes. Rudolph Marcus's theory of outer-sphere electron transfer (1956), extended to electrodes in 1965 and recognised by the 1992 Nobel Prize in Chemistry, introduced the reorganisation energy and predicted the potential dependence of $\alpha$; Heinz Gerischer (1960s) developed the description in terms of the distribution of electron states in the electrode and in solution.
:::

## Where this leads

The Butler–Volmer equation and its mass-transport extension are the working equations for the rest of the course. [[electrochemistry/voltammetry]] combines them with diffusion to give the shapes of cyclic voltammograms, whose peak separations measure $k^\circ$. In [[electrochemistry/batteries]] and [[electrochemistry/fuel-cells-electrolysis]], the activation overpotentials of the two electrodes, together with ohmic and mass-transport losses, explain why a real cell delivers less than its thermodynamic voltage and why an electrolyser needs more; the oxygen electrode, whose $j_0$ is only about $10^{-9}\ \mathrm{A\,cm^{-2}}$ even on platinum, is the main culprit. In [[electrochemistry/corrosion]] two Tafel lines for different reactions on the same metal cross at the corrosion potential, the basis of Evans diagrams and of the measurement of corrosion rates from polarisation resistance. For the analytical uses of electrode kinetics see [[analytical-chemistry/electroanalytical]].

::: summary
- A current is a reaction rate: $j = nF(v_\mathrm{ox} - v_\mathrm{red})$; the overpotential $\eta = E - E_\mathrm{eq}$ is the departure from the Nernst potential needed to drive it.
- The electrode potential shifts the activation Gibbs energy by a fraction $\alpha$ of $F(E - E^{\circ\prime})$, giving $k_\mathrm{red} = k^\circ\mathrm{e}^{-\alpha f(E - E^{\circ\prime})}$ and $k_\mathrm{ox} = k^\circ\mathrm{e}^{(1-\alpha)f(E - E^{\circ\prime})}$, consistent with the Nernst equation at equilibrium.
- The Butler–Volmer equation $j = j_0[\mathrm{e}^{(1-\alpha)f\eta} - \mathrm{e}^{-\alpha f\eta}]$ contains the exchange current density $j_0 = Fk^\circ(c_\mathrm{O}^*)^{1-\alpha}(c_\mathrm{R}^*)^\alpha$, which depends on concentration and on the electrode material.
- Near equilibrium the interface is a resistor, $R_\mathrm{ct} = RT/Fj_0$; far from it Tafel's law $\eta = a + b\log|j|$ holds with $b = 2.303RT/\alpha F$ ($118\ \mathrm{mV\,dec^{-1}}$ for $\alpha = 0.5$), and its intercept gives $j_0$.
- Mass transport limits the current to $j_\mathrm{l}$; "reversible" ($j_0 \gg j_\mathrm{l}$) and "irreversible" ($j_0 \ll j_\mathrm{l}$) describe the competition between kinetics and transport.
- Marcus theory gives $\Delta^\ddagger G = (\lambda + F(E - E^{\circ\prime}))^2/4\lambda$ and a potential-dependent $\alpha$; multistep reactions such as hydrogen evolution show Tafel slopes of about $120$, $40$ or $30\ \mathrm{mV\,dec^{-1}}$ depending on the rate-determining step.
:::

## Exercises

::: exercise Exchange current from a rate constant {level=1 check="0.482"}
A couple has $k^\circ = 0.010\ \mathrm{cm\,s^{-1}}$ and $\alpha = 0.5$, with both forms at $0.50\ \mathrm{mmol\,dm^{-3}}$. Find $j_0$. (Enter $j_0$ in $\mathrm{mA\,cm^{-2}}$.)
::: solution
$j_0 = Fk^\circ c = 96\,485\times0.010\times0.50\times10^{-6}\ \mathrm{A\,cm^{-2}} = 4.82\times10^{-4}\ \mathrm{A\,cm^{-2}} = 0.482\ \mathrm{mA\,cm^{-2}}$, with $c$ converted to $\mathrm{mol\,cm^{-3}}$. When $c_\mathrm{O}^* = c_\mathrm{R}^*$, the value of $\alpha$ does not matter.
:::
:::

::: exercise Tafel slope for an asymmetric barrier {level=1 check="148"}
Find the magnitude of the cathodic Tafel slope at $25\,^\circ\mathrm{C}$ for a one-electron step with $\alpha = 0.40$. (Enter $|b|$ in mV per decade.)
::: solution
$|b| = 2.303RT/(\alpha F) = 59.16\ \mathrm{mV}/0.40 = 148\ \mathrm{mV}$ per decade. The anodic slope would be $59.16/0.60 = 98.6\ \mathrm{mV}$ per decade: an asymmetric barrier makes the steeper-rising branch of the current the one in the direction favoured by the larger share of the potential.
:::
:::

::: exercise Charge-transfer resistance {level=1 check="12.8"}
Find the charge-transfer resistance at $25\,^\circ\mathrm{C}$ of an electrode with $j_0 = 2.0\ \mathrm{mA\,cm^{-2}}$. (Enter $R_\mathrm{ct}$ in $\Omega\,\mathrm{cm^2}$.)
::: solution
$R_\mathrm{ct} = RT/(Fj_0) = 0.025693/2.0\times10^{-3}\ \Omega\,\mathrm{cm^2} = 12.8\ \Omega\,\mathrm{cm^2}$.
:::
:::

::: exercise Overpotential for an anodic current {level=2 check="0.319"}
An oxidation has $j_0 = 0.10\ \mathrm{mA\,cm^{-2}}$ and $\alpha = 0.50$. What overpotential drives $50\ \mathrm{mA\,cm^{-2}}$ at $25\,^\circ\mathrm{C}$, if mass transport is fast? Check that the Tafel approximation is justified. (Enter $\eta$ in V.)
::: solution
In the Tafel regime, $\eta = \dfrac{RT}{(1-\alpha)F}\ln\dfrac{j}{j_0} = 0.051386\ \mathrm{V}\times\ln500 = 0.051386\times6.215 = 0.319\ \mathrm{V}$. The neglected cathodic term is $\mathrm{e}^{-\alpha f\eta}/\mathrm{e}^{(1-\alpha)f\eta} = \mathrm{e}^{-f\eta} = \mathrm{e}^{-12.4} \approx 4\times10^{-6}$ of the anodic one: Tafel is excellent.
:::
:::

::: exercise When Tafel fails {level=2 check="2.27"}
For $j_0 = 1.00\ \mathrm{mA\,cm^{-2}}$ and $\alpha = 0.50$, find the current density at $\eta = +50\ \mathrm{mV}$ from the Butler–Volmer equation, and compare with the Tafel and linear approximations. (Enter $j$ in $\mathrm{mA\,cm^{-2}}$.)
::: solution
$(1-\alpha)f\eta = \alpha f\eta = 0.5\times38.92\times0.050 = 0.973$. Butler–Volmer: $j = 1.00(\mathrm{e}^{0.973} - \mathrm{e}^{-0.973}) = 2.646 - 0.378 = 2.27\ \mathrm{mA\,cm^{-2}}$. Tafel: $2.65$ ($17\,\%$ high). Linear: $j_0f\eta = 1.95$ ($14\,\%$ low). At $50\ \mathrm{mV}$ neither limit is adequate; fit data in this range with the full equation.
:::
:::

::: exercise Exchange current from two points {level=2 check="3.16"}
Hydrogen evolution on an electrode gives $\eta = -0.30\ \mathrm{V}$ at $j = -1.0\ \mathrm{mA\,cm^{-2}}$ and $\eta = -0.42\ \mathrm{V}$ at $j = -10\ \mathrm{mA\,cm^{-2}}$ (Tafel region, $25\,^\circ\mathrm{C}$). Find the Tafel slope, $\alpha$ and $j_0$. (Enter $j_0$ in $\mu\mathrm{A\,cm^{-2}}$.)
::: solution
$b = (-0.42 + 0.30)/(\log10 - \log1) = -0.120\ \mathrm{V\,dec^{-1}}$, so $\alpha = 0.05916/0.120 = 0.49$. At $\eta = 0$: $\log_{10}(|j|/\mathrm{A\,cm^{-2}}) = \log_{10}(1.0\times10^{-3}) - 0.30/0.120 = -5.5$, giving $j_0 = 3.16\times10^{-6}\ \mathrm{A\,cm^{-2}} = 3.16\ \mu\mathrm{A\,cm^{-2}}$.
:::
:::

::: exercise A mass-transport-limited reduction {level=3 check="-4.53"}
For a couple with $j_0 = 1.0\ \mathrm{mA\,cm^{-2}}$, $\alpha = 0.50$ and equal limiting current densities $j_\mathrm{l,a} = j_\mathrm{l,c} = 5.0\ \mathrm{mA\,cm^{-2}}$, find the current density at $\eta = -0.20\ \mathrm{V}$ (at $25\,^\circ\mathrm{C}$), and compare with the Butler–Volmer value without transport limitation. What is $c_\mathrm{O}(0)/c_\mathrm{O}^*$? (Enter $j$ in $\mathrm{mA\,cm^{-2}}$, with its sign.)
::: hint
Evaluate the two exponentials first, then use the second form of [[#eq-full]].
:::
::: solution
$(1-\alpha)f\eta = -3.892$ and $-\alpha f\eta = +3.892$, so the exponentials are $\mathrm{e}^{-3.892} = 0.0204$ and $\mathrm{e}^{3.892} = 49.0$. Then
$$
j = \frac{0.0204 - 49.0}{1/1.0 + 0.0204/5.0 + 49.0/5.0}\ \mathrm{mA\,cm^{-2}} = \frac{-48.98}{10.81}\ \mathrm{mA\,cm^{-2}} = -4.53\ \mathrm{mA\,cm^{-2}} .
$$
Without transport limitation it would be $-49.0\ \mathrm{mA\,cm^{-2}}$, ten times larger. The surface concentration ratio is $c_\mathrm{O}(0)/c_\mathrm{O}^* = 1 + j/j_\mathrm{l,c} = 1 - 4.53/5.0 = 0.093$: the reactant is $91\,\%$ depleted at the surface, and the current is $91\,\%$ of its limiting value. Increasing $\eta$ further would gain little; stirring faster (raising $j_\mathrm{l}$) would gain much.
:::
:::

::: exercise Marcus transfer coefficient {level=3 check="0.375"}
From $\Delta^\ddagger G_\mathrm{red} = [\lambda + F(E - E^{\circ\prime})]^2/4\lambda$, derive the transfer coefficient as a function of potential, and evaluate it at $E - E^{\circ\prime} = -0.20\ \mathrm{V}$ for $\lambda = 0.80\ \mathrm{eV}$. What Tafel slope would be measured locally there at $25\,^\circ\mathrm{C}$? (Enter $\alpha$.)
::: solution
$\alpha = \partial\Delta^\ddagger G/\partial[F(E - E^{\circ\prime})] = 2[\lambda + F(E - E^{\circ\prime})]/4\lambda = \tfrac{1}{2} + F(E - E^{\circ\prime})/2\lambda$. With energies per electron in eV: $\alpha = 0.5 + (-0.20)/(2\times0.80) = 0.5 - 0.125 = 0.375$. The local Tafel slope is $59.16/0.375 = 158\ \mathrm{mV}$ per decade, compared with $118$ at the formal potential. Strictly, $\alpha$ defined through the barrier differs slightly from the slope of $\ln k$ because of the distribution of electronic states in the metal, but the trend — a cathodic Tafel line that bends as $|\eta|$ grows — is the signature of Marcus kinetics.
:::
:::

::: exercise Activation energy of an exchange current {level=3 check="32.7"}
The exchange current density of a reaction at its equilibrium potential is $1.0\ \mathrm{mA\,cm^{-2}}$ at $25\,^\circ\mathrm{C}$ and $4.0\ \mathrm{mA\,cm^{-2}}$ at $60\,^\circ\mathrm{C}$, with the same solution composition. Find the apparent activation energy, and explain why "the" activation energy of an electrode reaction must be measured at a stated potential. (Enter $E_\mathrm{a}$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
Treating $j_0$ as an Arrhenius rate, $E_\mathrm{a} = R\ln(j_2/j_1)/(1/T_1 - 1/T_2) = 8.314\times\ln4.0/(1/298.15 - 1/333.15)\ \mathrm{J\,mol^{-1}} = 8.314\times1.386/3.524\times10^{-4} = 32.7\ \mathrm{kJ\,mol^{-1}}$. At any fixed overpotential the barrier is $\Delta^\ddagger G_0 \pm \alpha F\eta$ (with the appropriate sign), so the activation energy measured at constant $\eta \neq 0$ differs from this by about $\alpha F\eta$ — $10\ \mathrm{kJ\,mol^{-1}}$ for $\alpha = 0.5$ and $\eta = 0.2\ \mathrm{V}$. And the equilibrium potential itself shifts with temperature (by $(\partial E/\partial T)_p = \Delta_\mathrm{r}S/\nu F$, [[electrochemistry/cell-thermodynamics#prop-temp]]), so "constant potential" against a reference at a different temperature is not "constant overpotential". The cleanest quantity is the activation energy at the equilibrium potential, as here.
:::
:::

::: exercise Kinetics from an impedance spectrum {level=2 check="103"}
An electrode in a solution containing both forms of a couple at equal concentrations gives a Nyquist plot with a semicircle of diameter $250\ \Omega\,\mathrm{cm^2}$ whose apex is at $32\ \mathrm{Hz}$. Find $j_0$ and $C_\mathrm{d}$ at $25\,^\circ\mathrm{C}$. (Enter $j_0$ in $\mu\mathrm{A\,cm^{-2}}$.)
::: solution
The diameter is $R_\mathrm{ct}$, so $j_0 = RT/(FR_\mathrm{ct}) = 0.025693/250\ \mathrm{A\,cm^{-2}} = 1.03\times10^{-4}\ \mathrm{A\,cm^{-2}} = 103\ \mu\mathrm{A\,cm^{-2}}$. The apex is at $\omega = 2\pi\times32 = 201\ \mathrm{rad\,s^{-1}} = 1/R_\mathrm{ct}C_\mathrm{d}$, so $C_\mathrm{d} = 1/(201\times250)\ \mathrm{F\,cm^{-2}} = 19.9\ \mu\mathrm{F\,cm^{-2}}$, a typical double-layer value — a useful check that the semicircle really is the interface and not, say, a surface film. Note the factor $2\pi$ between the frequency in hertz and the angular frequency.
:::
:::
