A pot of water boils at $100\,^\circ\mathrm{C}$ by the sea, at about $90\,^\circ\mathrm{C}$ on a high mountain, and at room temperature inside a vacuum desiccator; ice melts under a skate's blade but not in the tray beside it; and a block of carbon dioxide never gives you a puddle, only a wisp of fog. None of these facts is about chemistry — the molecule is the same $\mathrm{H_2O}$ or $\mathrm{CO_2}$ in every one of them — and all of them are the same fact: which phase of a pure substance is stable depends on temperature and pressure, and the boundaries between the regions where different phases win are curves with definite, computable slopes. The chemist who commands those curves can predict the boiling point in a pressure cooker, the pressure needed to liquefy a gas, the composition of a vapour over ice, and the reason a diamond does not turn to graphite in your hand.

The condition that generates all of it is the free-energy machinery of [[thermodynamics/free-energy]] applied to a single substance. At constant temperature and pressure a closed system moves towards the minimum of its Gibbs energy, and for a pure substance the molar Gibbs energy *is* the chemical potential, $\mu = G_\mathrm{m}$. Two phases can therefore coexist only where their chemical potentials are equal, $\mu_\alpha(T, p) = \mu_\beta(T, p)$, and a phase is stable only where its $\mu$ is the lowest available. Everything else in this chapter — the Clapeyron slope, the exponential vapour-pressure law, the Gibbs phase rule, the negative slope of the ice line — is counting, differentiating and integrating that one equation. The two ingredients we import are the fundamental equation for one mole, $\mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p$, and the entropy of a reversible transition, $\Delta_\mathrm{tr}S = \Delta_\mathrm{tr}H/T_\mathrm{tr}$, from [[thermodynamics/second-law]].

## Phases, components and degrees of freedom

::: definition Phase, component, number of phases, degrees of freedom {#def-phase-terms}
A **phase** is a region of matter that is homogeneous throughout — uniform chemical composition and physical state — bounded from other regions by boundaries across which properties change abruptly. A gas mixture is a single phase; liquid water with bubbles of its vapour is two phases; ice, liquid water and vapour together are three. A **component** is a chemically independent species, and the number of components $C$ is the minimum number of independent species needed to prepare the system in the same state; the **number of phases** is $P$; and the **degrees of freedom** (or **variance**) $F$ is the number of independent intensive variables — temperature, pressure, phase compositions — that can be varied without changing the number of phases present.
:::

Two counting rules keep $C$ honest. First, species tied together by an equilibrium or by a fixed proportion do not all count separately: the system $\mathrm{CaCO_3(s)} \rightleftharpoons \mathrm{CaO(s)} + \mathrm{CO_2(g)}$ contains three species but one independent reaction, so $C = 3 - 1 = 2$. Second, a constraint imposed *by you* rather than by chemistry can also count: run the decomposition in vacuum starting from pure $\mathrm{CaCO_3}$ and every mole of $\mathrm{CO_2}$ in the gas is matched by a mole of $\mathrm{CaO}$, an extra proportionality that reduces $C$ to $1$. Salt water in equilibrium with its vapour has $C = 2$ ($\mathrm{NaCl}$ and $\mathrm{H_2O}$) and $P = 2$; a sealed tube containing only argon has $C = 1$, and $P$ can be 1, 2 or 3 depending on where you stand in the $(p, T)$ plane.

::: definition Chemical potential of a pure substance {#def-mu-pure}
For a **pure substance** the chemical potential is the molar Gibbs energy, $\mu \equiv G_\mathrm{m}$. Its dependence on temperature and pressure follows from the fundamental equation of [[thermodynamics/free-energy]] for one mole,
$$
\mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p ,
$$
so that $\left(\partial\mu/\partial T\right)_p = -S_\mathrm{m}$ and $\left(\partial\mu/\partial p\right)_T = V_\mathrm{m}$. Because $S_\mathrm{m} > 0$ always, $\mu$ falls as $T$ rises; because $V_\mathrm{m}(\mathrm{g}) \gg V_\mathrm{m}(\mathrm{l}) > 0$, it rises steeply with pressure for a gas and gently for a condensed phase.
:::

::: proposition Phase equilibrium of a pure substance {#prop-eq-line}
Two phases $\alpha$ and $\beta$ of a pure substance are in equilibrium at exactly those $(p, T)$ where
$$
\mu_\alpha(T, p) = \mu_\beta(T, p) .
$$
One equation between two variables generically defines a **curve** $p = p(T)$ in the $(p, T)$ plane — a **coexistence line** — not a point; and the phase with the *lower* chemical potential at a given point off the line is the stable one there.
:::

The line-versus-point logic is worth spelling out, because it is the whole geometry of phase diagrams. A single condition removes one degree of freedom: fix $T$ and the coexistence pressure is determined, or fix $p$ and the transition temperature is determined. That is why a pot of boiling water at fixed pressure sits at one temperature until it is gone, and why the vapour pressure of a liquid is a function of temperature alone. The stability claim — lower $\mu$ wins — is the local version of $\Delta G < 0$: if $\mu_\mathrm{l} < \mu_\mathrm{g}$ at some $(p, T)$, then converting a mole of vapour to liquid lowers $G$, so vapour condenses there; the two statements "$\mu_\mathrm{g} > \mu_\mathrm{l}$" and "the stable phase is the liquid" are the same statement.

## The Clapeyron equation

The coexistence line has a slope, and the slope is a property of the substance.

::: proposition The Clapeyron equation {#prop-clapeyron}
Along any coexistence line of a pure substance,
$$
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{\Delta_\mathrm{tr}S}{\Delta_\mathrm{tr}V} = \frac{\Delta_\mathrm{tr}H}{T\,\Delta_\mathrm{tr}V} ,
$$
where $\Delta_\mathrm{tr}H$, $\Delta_\mathrm{tr}S$ and $\Delta_\mathrm{tr}V$ are the molar enthalpy, entropy and volume changes of the transition ($\text{tr} = \text{fus}, \text{vap}$ or $\text{sub}$) at temperature $T$ on the line.
:::

::: proof
Along the line the two phases stay in equilibrium, so $\mathrm{d}\mu_\alpha = \mathrm{d}\mu_\beta$ for every displacement $(\mathrm{d}T, \mathrm{d}p)$ along it. With $\mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p$,
$$
-S_{\mathrm{m},\alpha}\,\mathrm{d}T + V_{\mathrm{m},\alpha}\,\mathrm{d}p
= -S_{\mathrm{m},\beta}\,\mathrm{d}T + V_{\mathrm{m},\beta}\,\mathrm{d}p
\quad\Longrightarrow\quad
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{S_{\mathrm{m},\beta} - S_{\mathrm{m},\alpha}}{V_{\mathrm{m},\beta} - V_{\mathrm{m},\alpha}} = \frac{\Delta_\mathrm{tr}S}{\Delta_\mathrm{tr}V}.
$$
At a transition temperature the two phases are in equilibrium, so the transition is reversible and $\Delta_\mathrm{tr}S = \Delta_\mathrm{tr}H/T$ (second law, [[thermodynamics/second-law]]), which gives the second form. Note what the proof used and did not use: only the fundamental equation and reversibility — no ideal gas, no smallness assumptions. The Clapeyron equation is exact.
:::

::: example The vapour-pressure slope of water at $100\,^\circ\mathrm{C}$ {#ex-vap-slope}
For water at $373.15\ \mathrm{K}$ and $1.013\ \mathrm{bar}$, $\Delta_\mathrm{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$ (NIST). Taking the vapour as ideal and $V_\mathrm{m}(\mathrm{l}) = 18.8\ \mathrm{cm^3\,mol^{-1}}$, find $\mathrm{d}p/\mathrm{d}T$ along the liquid–vapour line.
::: solution
$$
V_\mathrm{m}(\mathrm{g}) = \frac{RT}{p} = \frac{8.314 \times 373.15}{1.013\times 10^{5}}\ \mathrm{m^3\,mol^{-1}} = 30.62\ \mathrm{L\,mol^{-1}},
$$
so $\Delta_\mathrm{vap}V = 30.62 - 0.0188 = 30.60\ \mathrm{L\,mol^{-1}}$ — the liquid volume is $0.06\,\%$ of the total and might as well not be there. Then
$$
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{40\,660\ \mathrm{J\,mol^{-1}}}{373.15\ \mathrm{K} \times 30.60\times 10^{-3}\ \mathrm{m^3\,mol^{-1}}}
= 3.56\times 10^{3}\ \mathrm{Pa\,K^{-1}} = 3.56\ \mathrm{kPa\,K^{-1}} .
$$
Raising the boiling point by one kelvin costs $3.6\ \mathrm{kPa} \approx 0.036\ \mathrm{bar}$: a pressure cooker running at $2.0\ \mathrm{bar}$ buys about $28\ \mathrm{K}$, cooking at roughly $120\,^\circ\mathrm{C}$ — the reason it exists.
:::
:::

::: example The slope of the ice–water line: why it is negative {#ex-fusion-slope}
For ice melting at $273.15\ \mathrm{K}$, $\Delta_\mathrm{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$ (NIST), and the densities at $0\,^\circ\mathrm{C}$ are $\rho(\text{ice}) = 0.9167$ and $\rho(\text{water}) = 0.99984\ \mathrm{g\,cm^{-3}}$. Find $\mathrm{d}p/\mathrm{d}T$ for the fusion line.
::: solution
With $M = 18.015\ \mathrm{g\,mol^{-1}}$,
$$
V_\mathrm{m}(\text{ice}) = \frac{18.015}{0.9167} = 19.65\ \mathrm{cm^3\,mol^{-1}}, \qquad
V_\mathrm{m}(\text{water}) = \frac{18.015}{0.99984} = 18.02\ \mathrm{cm^3\,mol^{-1}},
$$
so $\Delta_\mathrm{fus}V = 18.02 - 19.65 = -1.63\ \mathrm{cm^3\,mol^{-1}}$: ice is *less* dense than the liquid, so melting shrinks the volume. Therefore
$$
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{6010\ \mathrm{J\,mol^{-1}}}{273.15\ \mathrm{K}\times\left(-1.63\times 10^{-6}\ \mathrm{m^3\,mol^{-1}}\right)}
= -1.35\times 10^{7}\ \mathrm{Pa\,K^{-1}} = -135\ \mathrm{bar\,K^{-1}} .
$$
Negative, and enormous in magnitude: pressure *melts* ice, and it takes $135\ \mathrm{bar}$ to depress the melting point by a single kelvin. Water, gallium, bismuth and antimony are the classic exceptions to the rule that solids sink in their own melts; the open hydrogen-bonded network of ice Ih is what makes them so ([[general-chemistry-2/liquids-solutions]]).
:::
:::

::: widget contour
f: dH*(1 - x/273.15) + dV*0.1*(y - 1)
x: 250, 290
y: 0, 2500
sliders: dH=6010:5000:7000:10; dV=-1.63:-3:-0.5:0.01
constraint: dH*(1 - x/273.15) + dV*0.1*(y - 1)
gradient: false
caption: The sign of $\mu_\text{water} - \mu_\text{ice} \approx \Delta_\text{fus}H\,(1 - T/T_\text{fus}) + \Delta_\text{fus}V\,(p - 1\ \mathrm{bar})$ (colour) over temperature $T$ (horizontal axis, K) and pressure (vertical axis, bar), with the fusion enthalpy and the (negative) fusion volume as sliders. The drawn constraint curve $\mu_\text{water} = \mu_\text{ice}$ is the melting line, running from $1\ \mathrm{bar}$ at $273.15\ \mathrm{K}$ up and to the *left* with slope $-135\ \mathrm{bar\,K^{-1}}$: above it the liquid has the lower chemical potential and is stable, below it the ice. Slide $\Delta_\text{fus}V$ positive — the behaviour of every ordinary substance — and watch the line tilt the other way.
:::

::: warning Ice skating is not pressure melting {#warn-skating}
The standard story — the skate's pressure melts a lubricating film of water — fails an order-of-magnitude check that is worth doing once and keeping. A blade $2\ \mathrm{mm}$ wide and $7\ \mathrm{cm}$ in contact carries a $75\ \mathrm{kg}$ skater on $1.4\ \mathrm{cm^2}$, a pressure of $5.3\times 10^{6}\ \mathrm{Pa} \approx 53\ \mathrm{bar}$, which depresses the melting point by $53/135 \approx 0.4\ \mathrm{K}$. Skaters glide happily at $-10\,^\circ\mathrm{C}$, where the pressure needed would be $1350\ \mathrm{bar}$ — about a $960\ \mathrm{kg}$ mass on the same blade. The real lubricant is a combination of frictional heating as the blade strokes the ice and the *premelted surface layer*: the outermost molecular layers of ice are disordered and quasi-liquid well below $0\,^\circ\mathrm{C}$, because surface molecules lack neighbours above them. Pressure melting is real — regelation, the refreezing of ice under a cutting wire, works — but for skating it supplies at most a fraction of a degree. A warning about warnings: the honest calculation, not the folklore, is what the Clapeyron equation is for.
:::

## The Clausius–Clapeyron equation

Vapour pressures are the numbers chemists actually need, and along vapour–liquid and vapour–solid lines the Clapeyron equation simplifies spectacularly.

::: proposition The Clausius–Clapeyron equation {#prop-cc}
For a transition into the vapour ($\text{tr} = \text{vap}$ or $\text{sub}$) at temperatures well below the critical point, where the vapour is ideal and $V_\mathrm{m}(\mathrm{g}) \gg V_\mathrm{m}(\text{cond})$,
$$
\frac{\mathrm{d}\ln p}{\mathrm{d}T} = \frac{\Delta_\mathrm{tr}H}{R\,T^{2}} ,
$$
and if $\Delta_\mathrm{tr}H$ is roughly constant over the range,
$$
\ln\frac{p_2}{p_1} = -\frac{\Delta_\mathrm{tr}H}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)
\qquad\text{equivalently}\qquad
\ln p = -\frac{\Delta_\mathrm{tr}H}{R}\cdot\frac{1}{T} + \text{const}.
$$
A plot of $\ln p$ against $1/T$ is therefore a straight line of slope $-\Delta_\mathrm{tr}H/R$ — the same van 't Hoff geometry as the temperature dependence of $K$ in [[general-chemistry-2/entropy-free-energy]].
:::

::: proof
Start from Clapeyron, $\mathrm{d}p/\mathrm{d}T = \Delta_\mathrm{tr}H/(T\,\Delta_\mathrm{tr}V)$, and replace $\Delta_\mathrm{tr}V = V_\mathrm{m}(\mathrm{g}) - V_\mathrm{m}(\text{cond})$ by $RT/p$, dropping the condensed-phase volume (at $373\ \mathrm{K}$ it is $0.06\,\%$) and treating the vapour as ideal (good at the few-tenths-of-a-bar pressures where these formulas are used). Then $\mathrm{d}p/\mathrm{d}T = p\,\Delta_\mathrm{tr}H/(RT^2)$; dividing by $p$ gives $\mathrm{d}\ln p/\mathrm{d}T$, and integrating from $(T_1, p_1)$ to $(T_2, p_2)$ with constant $\Delta_\mathrm{tr}H$ gives the straight-line form. Three approximations are built in — ideal vapour, negligible condensed volume, temperature-independent $\Delta_\mathrm{tr}H$ — and the first two are far better than the third.
:::

::: example Boiling on a mountain and in a pressure cooker {#ex-boil-altitude}
Water boils when its vapour pressure equals the external pressure. Taking $\Delta_\mathrm{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$ and $p = 1.013\ \mathrm{bar}$ at $373.15\ \mathrm{K}$, find the boiling point (a) where the atmospheric pressure is $0.70\ \mathrm{bar}$, and (b) in a pressure cooker set to $2.0\ \mathrm{bar}$.
::: solution
$$
\text{(a)}\quad \frac{1}{T_2} = \frac{1}{373.15} - \frac{R}{\Delta_\mathrm{vap}H}\ln\frac{0.70}{1.013}
= 2.680\times 10^{-3} + 7.57\times 10^{-5} = 2.756\times 10^{-3}\ \mathrm{K^{-1}},
$$
so $T_2 = 362.9\ \mathrm{K} = 89.8\,^\circ\mathrm{C}$: ten degrees of lost cooking temperature at three thousand metres of altitude, and the reason high-altitude bread recipes cut the water and raise the oven.
$$
\text{(b)}\quad \frac{1}{T_2} = \frac{1}{373.15} - \frac{8.314}{40\,660}\ln\frac{2.0}{1.013}
= 2.680\times 10^{-3} - 1.39\times 10^{-4} = 2.541\times 10^{-3}\ \mathrm{K^{-1}},
$$
so $T_2 = 393.6\ \mathrm{K} = 120.4\,^\circ\mathrm{C}$. Cooking rate roughly doubles per $10\ \mathrm{K}$, so $20\ \mathrm{K}$ buys a factor of four: a pressure cooker is a $1\ \mathrm{bar}$-of-thermodynamics purchase.
:::
:::

::: widget plot
f: exp(13.12 - dH*1000/(8.314*x))
x: 280, 400
y: 0, 2.6
sliders: dH=40.7:35:45:0.1
hlines: 1.013
vlines: 373.15
labels: p_\text{vap} \text{ / bar}
caption: The Clausius–Clapeyron curve for water, $p_\text{vap}(T) = \exp\!\left(13.12 - \Delta H_\text{vap}/RT\right)$ in bar, with the vaporisation enthalpy (in $\mathrm{kJ\,mol^{-1}}$) on the slider. The horizontal line is one atmosphere: where the curve crosses it, the liquid boils. Slide $\Delta H_\text{vap}$ up and the curve pivots to become steeper in $1/T$ — a more strongly bound liquid has a vapour pressure that rises more violently with temperature — and the crossing, hence the boiling point, moves. The exponential shape is the same one an Arrhenius plot will wear, and for the same reason: both count the fraction of molecules with enough energy to escape.
:::

::: example $\Delta_\text{sub}H$ of ice from two vapour pressures {#ex-dhsub-ice}
The vapour pressure of ice is $259.9\ \mathrm{Pa}$ at $-10\,^\circ\mathrm{C}$ and $38.0\ \mathrm{Pa}$ at $-30\,^\circ\mathrm{C}$ (CRC). Estimate $\Delta_\text{sub}H$ of ice over this range and check it against the enthalpies of fusion and vaporisation.
::: solution
$$
\Delta_\text{sub}H = \frac{R\,\ln(p_1/p_2)}{1/T_2 - 1/T_1}
= \frac{8.314 \times \ln(259.9/38.0)}{\dfrac{1}{243.15} - \dfrac{1}{263.15}}\ \mathrm{J\,mol^{-1}}
= \frac{8.314 \times 1.923}{3.126\times 10^{-4}} = 51.1\ \mathrm{kJ\,mol^{-1}} .
$$
Check: sublimation is fusion followed by vaporisation, and enthalpy is a state function, so $\Delta_\text{sub}H = \Delta_\text{fus}H + \Delta_\text{vap}H = 6.01 + 45.05 = 51.1\ \mathrm{kJ\,mol^{-1}}$ at $273\ \mathrm{K}$ (NIST). The two independent routes agree to four figures across a $20\ \mathrm{K}$ span — a satisfying moment for the bookkeeping, and a reminder that vapour-pressure measurements are a legitimate calorimeter.
:::
:::

::: widget plot
f: 13.12 - dHw*1000/(8.314*x); 13.22 - dHe*1000/(8.314*x)
x: 260, 400
y: -6, 4
sliders: dHw=40.7:30:55:0.1; dHe=38.6:30:55:0.1
labels: \text{water}; \text{ethanol}
caption: $\ln(p/\mathrm{bar})$ against temperature $T$ for water and ethanol, each a Clausius–Clapeyron line $\ln p = \text{const} - \Delta H_\text{vap}/RT$ with its vaporisation enthalpy (in $\mathrm{kJ\,mol^{-1}}$) on its own slider and both anchored to boil at one atmosphere. The slope against $1/T$ is $-\Delta H_\text{vap}/R$: water's line is the steeper, and its $\Delta H_\text{vap}$ of $40.7\ \mathrm{kJ\,mol^{-1}}$ against ethanol's $38.6$ is the vapour-pressure signature of water's hydrogen-bond network. Slide one enthalpy to zero and the line flattens to a horizontal wall — a liquid with no enthalpy of vaporisation has no temperature-dependent vapour pressure, and no boiling point.
:::

Most liquids vaporise with $\Delta_\text{vap}S = \Delta_\text{vap}H/T_\text{b}$ near $85$–$88\ \mathrm{J\,K^{-1}\,mol^{-1}}$ — Trouton's rule, empirical and rough — because vaporisation buys roughly the same translational entropy everywhere; water's $109$ sits above the range because the vapour must also break hydrogen bonds ([[general-chemistry-2/liquids-solutions]]).

::: quiz
Which of the following is *not* an assumption used in deriving the integrated Clausius–Clapeyron equation $\ln(p_2/p_1) = -\Delta_\text{vap}H\,R^{-1}(1/T_2 - 1/T_1)$?
- [x] That the liquid's molar volume is independent of temperature.
- [ ] That the vapour behaves as an ideal gas.
- [ ] That the liquid's molar volume is negligible against the vapour's.
- [ ] That $\Delta_\text{vap}H$ is roughly constant over the temperature range.
::: solution
The liquid's molar volume is not assumed constant — it is dropped altogether as negligible against $V_\mathrm{m}(\mathrm{g})$, which is why the derivation never needs its temperature dependence. The other three are exactly the approximations listed in the proof; the constant-$\Delta H$ one is the weakest, and the exercise on the Kirchhoff-corrected form quantifies how much it costs.
:::
:::

## The phase rule

::: proposition The Gibbs phase rule {#prop-phase-rule}
For a system of $C$ components and $P$ phases in equilibrium, with only $pV$-work, the number of degrees of freedom is
$$
F = C - P + 2 .
$$
:::

::: proof
Count the intensive variables and the relations among them. Specifying the state of one phase needs $T$, $p$ and $C - 1$ mole fractions (the $C$-th is $1$ minus the rest), so all $P$ phases together carry $2 + P(C - 1)$ variables — $T$ and $p$ are shared, since they are equal across phases at equilibrium. The equilibrium conditions are the equalities of chemical potentials: for each component, $\mu_i$ must match across all $P$ phases, which is $P - 1$ independent equations per component, $C(P - 1)$ in total. Therefore
$$
F = 2 + P(C - 1) - C(P - 1) = 2 + PC - P - CP + C = C - P + 2 . \qquad \blacksquare
$$
The counting is the content: the phase rule is not a deep new law but bookkeeping of the condition $\mu_\alpha = \mu_\beta$ across every component and phase pair.
:::

::: example Counting freedoms: water and its points {#ex-freedom-count}
For pure water, $C = 1$: how many degrees of freedom does (a) liquid water, (b) liquid in equilibrium with its vapour, (c) ice, liquid and vapour together? And what do the answers mean?
::: solution
(a) $F = 1 - 1 + 2 = 2$: a single phase fills an *area* of the $(p, T)$ plane — both variables are free. (b) $F = 1 - 2 + 2 = 1$: two phases live on a *line*; fix $T$ and $p$ is the vapour pressure, fix $p$ and $T$ is the boiling point. (c) $F = 1 - 3 + 2 = 0$: three phases meet at a *point*, the triple point, fixed for pure water at $273.16\ \mathrm{K}$ and $611.66\ \mathrm{Pa}$ (NIST) — no freedom at all, which is why the triple point of water was chosen to define the kelvin. The general pattern — areas for one phase, lines for two, points for three — is the phase rule read as geometry, and it holds for every one-component diagram, carbon dioxide's included.
:::
:::

The water diagram then reads itself. The liquid–vapour line runs from the triple point ($273.16\ \mathrm{K}$, $6.12\ \mathrm{mbar}$) up to the **critical point**, $647.10\ \mathrm{K}$ and $220.64\ \mathrm{bar}$ (NIST), where liquid and vapour become indistinguishable and the line simply ends — beyond it, supercritical water combines the density of a liquid with the penetrability of a gas. The solid–vapour line runs down from the triple point with the sublimation slope. And the fusion line leans *left*, at $-135\ \mathrm{bar\,K^{-1}}$; at a few hundred bar the ice phase diagram branches into several crystalline forms (ices II, III, V, VI, …) with their own triple points — over a dozen in all — because pressure can reorganise the hydrogen-bond network into denser arrangements.

Carbon dioxide is the instructive contrast. Its triple point sits at $216.6\ \mathrm{K}$ and $5.18\ \mathrm{bar}$ (CRC) — *above* one atmosphere. At $1\ \mathrm{bar}$ there is no liquid branch to cross: heating solid $\mathrm{CO_2}$ carries you along the sublimation line until it reaches $1.013\ \mathrm{bar}$ at $194.7\ \mathrm{K}$ ($-78.5\,^\circ\mathrm{C}$), and the solid passes straight into vapour. Dry ice "smoke" is ordinary water fog condensed from the air by the cold gas, not the carbon dioxide itself, which is invisible. Above the critical point, $304.1\ \mathrm{K}$ and $73.8\ \mathrm{bar}$, supercritical $\mathrm{CO_2}$ is a cheap, tunable solvent — the caffeine in decaffeinated coffee is removed with it — because its density, and therefore its solvent power, can be dialled continuously with pressure.

::: warning The triple point is not the melting point {#warn-triple-point}
Both are "where ice and water coexist", and both are near $273\ \mathrm{K}$, so they get confused constantly — but they are different experiments. The **triple point** of pure water, $273.16\ \mathrm{K}$ at $611.66\ \mathrm{Pa}$, is invariant ($F = 0$): one unique state, reproducible to a few tenths of a millikelvin, which is why it defined the kelvin until 2019. The **melting point** is the ice–water line *at whatever pressure you happen to be at*: at $1.013\ \mathrm{bar}$ the $-135\ \mathrm{bar\,K^{-1}}$ slope alone shifts it down by $1.007/135 \approx 0.0075\ \mathrm{K}$, and dissolved air in ordinary water shifts it down by a further $\approx 0.0025\ \mathrm{K}$ (a colligative effect, [[thermodynamics/mixtures]]). The textbook $273.15\ \mathrm{K}$ is the melting point of air-saturated water at one atmosphere; the triple point is $273.16\ \mathrm{K}$ of pure water under its own vapour. Two different points, seven thousandths of a kelvin apart, and a favourite exam distinction.
:::

::: history From Clapeyron to the critical point {#hist-phase-rule}
Benoît Paul Émile Clapeyron (Clapeyron) restated Carnot's engine in $pV$-language in 1834 and wrote down the slope relation that bears his name; Rudolf Clausius (Clausius) put it in modern form in 1850, combining it with the second law to compute latent heats from vapour pressures — the Clausius–Clapeyron equation. Michael Faraday (Faraday) had liquefied chlorine and a handful of "permanent" gases by 1823 and twice watched the meniscus of carbon dioxide vanish at about $31\,^\circ\mathrm{C}$ without knowing what it meant. Thomas Andrews (Andrews) made that disappearance the subject of his 1869 Bakerian Lecture, *The Continuity of the Gaseous and Liquid States of Matter*: above a substance-specific **critical temperature** no pressure liquefies the gas, and below it liquid and vapour are distinct. William Ramsay (Ramsay) and Sydney Young (Young) then spent the 1880s measuring vapour pressures to four figures by the isochoric method, turning the straight line of $\ln p$ against $1/T$ into a routine source of vaporisation enthalpies. The phase rule itself is one page of Josiah Willard Gibbs's (Gibbs) 1876 *On the Equilibrium of Heterogeneous Substances* — the same treatise whose history is told in [[thermodynamics/second-law]] — and it took two decades to be digested, partly because it was written in Connecticut and read in Europe.
:::

## Why only one phase is stable: the $\mu(T)$ curves

::: proposition Stability and the shape of $\mu(T)$ {#prop-stability}
At fixed pressure, the chemical potential of a phase as a function of temperature satisfies
$$
\left(\frac{\partial \mu}{\partial T}\right)_p = -S_\mathrm{m} < 0, \qquad
\left(\frac{\partial^2 \mu}{\partial T^2}\right)_p = -\frac{C_{p,\mathrm{m}}}{T} < 0 .
$$
So every phase's $\mu(T)$ curve falls and is concave (bending downwards); and because $S_\mathrm{m}(\mathrm{g}) \gg S_\mathrm{m}(\mathrm{l}) > S_\mathrm{m}(\mathrm{s})$, the vapour curve falls fastest, the solid curve slowest. The stable phase at each temperature is the one whose curve is lowest, and as $T$ rises the lowest curve switches solid $\rightarrow$ liquid $\rightarrow$ vapour. At each switch the two curves *cross*, so $\mu$ is continuous but its slope jumps by $-\Delta_\mathrm{tr}S \ne 0$: every such transition is **first order**.
:::

::: proof
Both derivatives follow from $\mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p$ at constant $p$: the first is the coefficient of $\mathrm{d}T$, and the second differentiates it again, $(\partial(-S_\mathrm{m})/\partial T)_p = -C_{p,\mathrm{m}}/T$, which is negative because heat capacities are positive for stable phases ([[thermodynamics/heat-capacity-adiabatic]]). The ordering of slopes is the ordering of molar entropies, and the entropy of a gas exceeds a liquid's by $\Delta_\mathrm{vap}S \approx 85$–$109\ \mathrm{J\,K^{-1}\,mol^{-1}}$ — far more than fusion's $\approx 22$. Three falling, concave curves with strictly ordered slopes can cross each other at most once per pair, so heating at fixed $p$ walks the minimum of the lower envelope through the phases in order. At a crossing $\mu_\alpha = \mu_\beta$ (equilibrium) while $\mathrm{d}\mu_\alpha/\mathrm{d}T \ne \mathrm{d}\mu_\beta/\mathrm{d}T$, i.e. $S_{\mathrm{m},\alpha} \ne S_{\mathrm{m},\beta}$ and likewise $V_{\mathrm{m},\alpha} \ne V_{\mathrm{m},\beta}$: entropy and volume jump discontinuously, which is exactly what first order means.
:::

This picture explains more than it costs. It shows why the coexistence lines of the phase diagram are not coincidences: the vapour-pressure curve *is* the locus where the vapour curve dips below the liquid curve. It shows why transitions are first order for every pure substance — the slopes $-S_\mathrm{m}$ of two different phases cannot match at their crossing — while second-order behaviour (continuous $\mu$ and slope, jumping curvature) belongs to the critical point, where $C_{p,\mathrm{m}}$ diverges instead. And it makes metastability obvious rather than paradoxical: supercooled water at $263\ \mathrm{K}$ sits on the liquid curve, which is a *local* minimum of $\mu$ — the ice curve is lower, but reaching it requires nucleating a crystal, and nucleation is a matter of [[general-chemistry-2/liquids-solutions|kinetics and interfaces]], not of equilibrium. Superheated liquids in microwave ovens, the cloud in an expansion cloud chamber, and the boiling chips in a flask are all the same lesson: equilibrium says which curve is lowest; getting there needs a seed.

## Where this leads

The condition $\mu_\alpha = \mu_\beta$ generalises in two directions, and both are later chapters. Add a second component and chemical potentials acquire composition dependence: Raoult's and Henry's laws, colligative properties and the two-component temperature–composition diagrams are [[thermodynamics/mixtures]], and the freezing line of ice in sea water is the fusion line of this chapter read through a solution. Add a reaction and the equilibrium condition $\sum_i \nu_i \mu_i = 0$ produces the reaction Gibbs energy and $\Delta_\mathrm{r}G^\circ = -RT\ln K$ in [[thermodynamics/reaction-equilibrium]]; the van 't Hoff equation there is the Clausius–Clapeyron equation of this chapter wearing a reaction label, and the decomposition pressure of limestone is a phase-rule problem with $C = 2$. The critical point, treated here as the end of a line, is the starting point of [[statistical-thermodynamics/real-gases-liquids]], where the van der Waals equation produces $T_\mathrm{c}$, $p_\mathrm{c}$ and $V_\mathrm{c}$ from its own flat inflection. The low-temperature ends of the sublimation and fusion lines — why $\Delta_\text{sub}H$ becomes temperature-independent and slopes flatten as $T \rightarrow 0$ — follow from the third law and the $T^3$ heat capacities of [[statistical-thermodynamics/quantum-statistics]]. The measurement side (vapour pressures, gas thermometers, Dalton's corrections) is [[general-chemistry-1/gases]], the machinery we differentiated is [[thermodynamics/free-energy]] and [[thermodynamics/second-law]], and the anomalies of water that bend the ice line are [[general-chemistry-2/liquids-solutions]].

::: summary
- For a pure substance $\mu = G_\mathrm{m}$ with $\mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p$; two phases coexist where $\mu_\alpha(T,p) = \mu_\beta(T,p)$, and the phase with the lower $\mu$ is the stable one.
- One equilibrium condition between two variables defines a coexistence *line*; its slope is the Clapeyron equation $\mathrm{d}p/\mathrm{d}T = \Delta_\mathrm{tr}H/(T\,\Delta_\mathrm{tr}V)$, exact for every transition.
- For vaporisation and sublimation the Clapeyron equation integrates to $\ln p = -\Delta_\text{tr}H/(RT) + \text{const}$: vapour pressures are exponential in $-1/T$, and boiling is the crossing of $p_\text{vap}$ with the external pressure.
- The ice line has slope $-135\ \mathrm{bar\,K^{-1}}$: pressure melts ice, but skating is friction and surface premelting, not pressure.
- The phase rule $F = C - P + 2$ counts $\mu$-equalities away from the variables: areas, lines and points for one, two and three phases; water's triple point ($273.16\ \mathrm{K}$, $611.66\ \mathrm{Pa}$) is invariant, its critical point $647.10\ \mathrm{K}$, $220.64\ \mathrm{bar}$.
- $\mathrm{CO_2}$'s triple point at $5.18\ \mathrm{bar}$ lies above one atmosphere, so dry ice sublimes at $194.7\ \mathrm{K}$; above $304.1\ \mathrm{K}$ and $73.8\ \mathrm{bar}$ it is supercritical.
- $\mu(T)$ curves fall with slope $-S_\mathrm{m}$ and bend down with curvature $-C_{p,\mathrm{m}}/T$; their crossings are first-order transitions, and metastable states are local minima waiting for a nucleus.
:::

## Exercises

::: exercise Boiling in a vacuum desiccator {level=1 check="354"}
At what temperature does water boil when the pressure is reduced to $0.50\ \mathrm{bar}$? Take $\Delta_\text{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$ and $p = 1.013\ \mathrm{bar}$ at $373.15\ \mathrm{K}$. (Enter $T$ in K, to three significant figures.)
::: solution
$$
\frac{1}{T} = \frac{1}{373.15} - \frac{8.314}{40\,660}\ln\frac{0.50}{1.013}
= 2.680\times 10^{-3} + 1.44\times 10^{-4} = 2.824\times 10^{-3}\ \mathrm{K^{-1}},
$$
so $T = 354\ \mathrm{K}$ ($80.9\,^\circ\mathrm{C}$). At $0.50\ \mathrm{bar}$ water boils at $81\,^\circ\mathrm{C}$; pump harder and the boiling point walks down toward room temperature, which is why warm samples dry under vacuum without ever being heated.
:::
:::

::: exercise Sublimation from fusion and vaporisation {level=1 check="51.1"}
Using $\Delta_\text{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\text{vap}H = 45.05\ \mathrm{kJ\,mol^{-1}}$ at $273.15\ \mathrm{K}$ (NIST), find $\Delta_\text{sub}H$ of ice at that temperature. (Enter the value in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
Sublimation is fusion followed by vaporisation, and enthalpy is a state function (Hess's law, [[thermodynamics/first-law]]):
$$
\Delta_\text{sub}H = \Delta_\text{fus}H + \Delta_\text{vap}H = 6.01 + 45.05 = 51.1\ \mathrm{kJ\,mol^{-1}} .
$$
The same additivity holds for the entropies, $\Delta_\text{sub}S = \Delta_\text{fus}S + \Delta_\text{vap}S$, and it is why the sublimation curve is steeper than the vaporisation curve in $\ln p$ against $1/T$: sublimation pays both bills.
:::
:::

::: exercise Counting degrees of freedom {level=1}
Give $C$, $P$ and $F$ for: (a) argon gas at $300\ \mathrm{K}$ and $1\ \mathrm{bar}$; (b) liquid argon in equilibrium with its vapour; (c) a saturated aqueous sucrose solution with undissolved solid sugar and its vapour (treat sucrose and water as the components); (d) water ice, liquid water and water vapour together.
::: solution
(a) $C = 1$, $P = 1$, $F = 2$: both variables free. (b) $C = 1$, $P = 2$, $F = 1$: one free variable, the vapour-pressure line. (c) $C = 2$, $P = 3$ (solid sugar, solution, vapour), $F = 2 - 3 + 2 = 1$: at fixed $T$ the vapour pressure and the solubility are both fixed — you cannot change the concentration of a saturated solution without changing the temperature. (d) $C = 1$, $P = 3$, $F = 0$: the triple point, $273.16\ \mathrm{K}$ and $611.66\ \mathrm{Pa}$, nothing free.
:::
:::

::: exercise $\Delta_\text{sub}H$ from two vapour pressures {level=2 check="51.2"}
The vapour pressure of ice is $103.3\ \mathrm{Pa}$ at $-20\,^\circ\mathrm{C}$ and $38.0\ \mathrm{Pa}$ at $-30\,^\circ\mathrm{C}$ (CRC). Estimate $\Delta_\text{sub}H$ over this range. (Enter the value in $\mathrm{kJ\,mol^{-1}}$, to three significant figures.)
::: solution
$$
\Delta_\text{sub}H = \frac{R\,\ln(p_1/p_2)}{1/T_2 - 1/T_1}
= \frac{8.314 \times \ln(103.3/38.0)}{\dfrac{1}{243.15} - \dfrac{1}{253.15}}
= \frac{8.314 \times 1.000}{1.625\times 10^{-4}} = 51.2\ \mathrm{kJ\,mol^{-1}} .
$$
Consistent with $\Delta_\text{fus}H + \Delta_\text{vap}H = 51.1\ \mathrm{kJ\,mol^{-1}}$ at $273\ \mathrm{K}$; the slight excess is the slow drift of $\Delta_\text{sub}H$ as heat capacities make the enthalpy larger at lower temperature.
:::
:::

::: exercise The slope of the ice–water line {level=2 check="-135"}
Using $\Delta_\text{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$ at $273.15\ \mathrm{K}$ and densities $0.9167$ (ice) and $0.99984\ \mathrm{g\,cm^{-3}}$ (water), compute $\mathrm{d}p/\mathrm{d}T$ for the fusion line of ice. (Enter the value in $\mathrm{bar\,K^{-1}}$, to three significant figures.)
::: solution
$\Delta_\text{fus}V = 18.015\left(1/0.99984 - 1/0.9167\right)\ \mathrm{cm^3\,mol^{-1}} = -1.63\ \mathrm{cm^3\,mol^{-1}}$, so
$$
\frac{\mathrm{d}p}{\mathrm{d}T} = \frac{6010}{273.15 \times (-1.63\times 10^{-6})}\ \mathrm{Pa\,K^{-1}}
= -1.35\times 10^{7}\ \mathrm{Pa\,K^{-1}} = -135\ \mathrm{bar\,K^{-1}} .
$$
The negative sign is the volume *decrease* on melting; the size says $135\ \mathrm{bar}$ per kelvin, which is why the skating story in the warning cannot be a pressure story.
:::
:::

::: exercise Vapour pressure of ethanol at $25\,^\circ\mathrm{C}$ {level=2 check="7.6"}
Ethanol boils at $351.4\ \mathrm{K}$ under $1.013\ \mathrm{bar}$, and $\Delta_\text{vap}H = 42.3\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$ (NIST). Estimate its vapour pressure at $298.15\ \mathrm{K}$. (Enter the value in $\mathrm{kPa}$, to two significant figures.)
::: solution
$$
p = 101.325\ \mathrm{kPa}\times\exp\!\left[-\frac{42\,300}{8.314}\left(\frac{1}{298.15} - \frac{1}{351.4}\right)\right]
= 101.325 \times e^{-2.588} = 7.6\ \mathrm{kPa}.
$$
The measured value is $7.9\ \mathrm{kPa}$; using the boiling-point enthalpy $38.6\ \mathrm{kJ\,mol^{-1}}$ instead would give $9.6\ \mathrm{kPa}$, so choosing $\Delta_\text{vap}H$ near the temperature you integrate *to* is worth $25\,\%$ here — the constant-$\Delta H$ assumption is the Clausius–Clapeyron equation's weakest link.
:::
:::

::: exercise The Kirchhoff-corrected vapour pressure {level=3 check="3.27"}
Drop only the constant-$\Delta H$ approximation: take $\Delta_\text{vap}H(T) = \Delta_\text{vap}H(T_1) + \Delta_\text{vap}C_p\,(T - T_1)$ with $\Delta_\text{vap}C_p = C_{p,\mathrm{m}}(\mathrm{g}) - C_{p,\mathrm{m}}(\mathrm{l}) = -41.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$, integrate $\mathrm{d}\ln p/\mathrm{d}T = \Delta_\text{vap}H/(RT^2)$ from $T_1 = 373.15\ \mathrm{K}$ ($p_1 = 101.325\ \mathrm{kPa}$) to $298.15\ \mathrm{K}$, and find the vapour pressure of water at $25\,^\circ\mathrm{C}$. (Enter the value in $\mathrm{kPa}$, to three significant figures.)
::: solution
With $\int (\Delta H_1 + \Delta C_p(T - T_1))/T^2\,\mathrm{d}T = -\Delta H_1/T + \Delta C_p(\ln T + T_1/T)$,
$$
\ln\frac{p_2}{p_1} = \frac{1}{R}\left[\Delta_\text{vap}H(T_1)\left(\frac{1}{T_1} - \frac{1}{T_2}\right) + \Delta_\text{vap}C_p\left(\ln\frac{T_2}{T_1} + \frac{T_1}{T_2} - 1\right)\right].
$$
Numbers: $\Delta_\text{vap}H(T_1)(1/T_1 - 1/T_2) = 40\,660 \times (-6.741\times 10^{-4}) = -27.41\ \mathrm{J\,mol^{-1}}$ and $\Delta_\text{vap}C_p(-0.2244 + 0.2516) = -41.7 \times 0.0272 = -1.13\ \mathrm{J\,mol^{-1}}$, so $\ln(p_2/p_1) = -28.54/8.314 = -3.433$:
$$
p_2 = 101.325\ \mathrm{kPa}\times e^{-3.433} = 3.27\ \mathrm{kPa}.
$$
Against the NIST value $3.17\ \mathrm{kPa}$ this is $3\,\%$ — where the constant-$\Delta H$ form gave $3.75\ \mathrm{kPa}$, $18\,\%$ high. One Kirchhoff correction ([[thermodynamics/heat-capacity-adiabatic]]) cuts the error by a factor of six, because $\Delta_\text{vap}H$ really does grow by $3.1\ \mathrm{kJ\,mol^{-1}}$ as you cool from $373$ to $298\ \mathrm{K}$.
:::
:::

::: exercise Derive and use the phase rule {level=3}
Derive $F = C - P + 2$ by counting variables and chemical-potential equalities, as in the proof of the proposition, and apply it to the system $\mathrm{CaCO_3(s)} \rightleftharpoons \mathrm{CaO(s)} + \mathrm{CO_2(g)}$ with the two solids present as separate phases and $\mathrm{CO_2}$ the only gas. How many degrees of freedom are there, and what does the answer say about the decomposition pressure?
::: solution
Variables: $T$, $p$, and $C - 1$ mole fractions in each of $P$ phases, i.e. $2 + P(C-1)$. Relations: $\mu_i$ equal across all phases for each component, $C(P-1)$ of them. Hence $F = 2 + P(C-1) - C(P-1) = C - P + 2$. For the decomposing limestone: three species, one equilibrium relation, so $C = 2$; three phases (two solids, one gas), so $P = 3$; and $F = 2 - 3 + 2 = 1$. One degree of freedom means the gas composition and pressure are *not* independent of $T$: the decomposition pressure $p(\mathrm{CO_2})$ is a function of temperature alone, exactly as the lime-kiln calculation of [[general-chemistry-2/entropy-free-energy]] found from $\Delta_\mathrm{r}G^\circ = -RT\ln K$. The phase rule saw it before any free energy was computed — that is what a counting theorem is for.
:::
:::

::: exercise The critical point from van der Waals {level=3 check="0.375"}
The critical point is the top of the liquid–vapour line, where the two phases become identical; thermodynamically it is the flat inflection of the isotherm, $\left(\partial p/\partial V\right)_T = \left(\partial^2 p/\partial V^2\right)_T = 0$. Apply these two conditions to the van der Waals equation $p = RT/(V_\mathrm{m} - b) - a/V_\mathrm{m}^2$ to find $V_{\mathrm{m},\mathrm{c}}$, $T_\mathrm{c}$ and $p_\mathrm{c}$ in terms of $a$, $b$ and $R$, and compute the critical compressibility factor $Z_\mathrm{c} = p_\mathrm{c}V_{\mathrm{m},\mathrm{c}}/(RT_\mathrm{c})$. (Enter $Z_\mathrm{c}$ as a decimal.)
::: solution
Differentiating, $\partial p/\partial V_\mathrm{m} = -RT/(V_\mathrm{m}-b)^2 + 2a/V_\mathrm{m}^3$ and $\partial^2 p/\partial V_\mathrm{m}^2 = 2RT/(V_\mathrm{m}-b)^3 - 6a/V_\mathrm{m}^4$. Setting both to zero turns each into an expression for $RT_\mathrm{c}$: $RT_\mathrm{c} = 2a(V_\mathrm{m}-b)^2/V_\mathrm{m}^3$ and $RT_\mathrm{c} = 3a(V_\mathrm{m}-b)^3/V_\mathrm{m}^4$. Equating them gives $2V_\mathrm{m}^4(V_\mathrm{m}-b)^2 = 3V_\mathrm{m}^3(V_\mathrm{m}-b)^3$, i.e. $2V_\mathrm{m} = 3(V_\mathrm{m}-b)$, so $V_{\mathrm{m},\mathrm{c}} = 3b$. Back-substitution gives $T_\mathrm{c} = 8a/(27Rb)$ and then $p_\mathrm{c} = RT_\mathrm{c}/(V_{\mathrm{m},\mathrm{c}}-b) - a/V_{\mathrm{m},\mathrm{c}}^2 = a/(27b^2)$. Therefore
$$
Z_\mathrm{c} = \frac{p_\mathrm{c}V_{\mathrm{m},\mathrm{c}}}{RT_\mathrm{c}} = \frac{\dfrac{a}{27b^2}\cdot 3b}{R\cdot\dfrac{8a}{27Rb}} = \frac{3}{8} = 0.375 .
$$
A universal number from a model with no substance-specific physics left in it — real gases sit lower ($0.27$ for $\mathrm{CO_2}$, $0.29$ for $\mathrm{N_2}$) because the van der Waals form is crude near the critical region, where fluctuations take over. The full story, including why $C_{p,\mathrm{m}}$ diverges there, is [[statistical-thermodynamics/real-gases-liquids]].
:::
:::
