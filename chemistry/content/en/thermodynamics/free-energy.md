The first course reduced the question "will it happen?" to a single number: compute $\Delta G$ and read its sign ([[general-chemistry-2/entropy-free-energy|entropy and free energy]]). That rule works, and it will keep working — but it hides a suspicious amount of structure inside one letter $G$. Why should a difference $H - TS$ of two quantities as different as an enthalpy and an entropy be the thing that decides everything? What becomes of $G$ when we change the temperature, or squeeze the system to ten thousand bar? And what exactly is the *chemical potential* that every chapter after this one treats as the air it breathes? This chapter answers all three questions with a single tool: differentiate $G$ carefully, and read what comes out.

The tool is the calculus of exact differentials, and the reward is a small set of identities — the fundamental equations, the four Maxwell relations, the Gibbs–Helmholtz equation — that between them generate most of physical chemistry. The bookkeeping conventions are unchanged from [[thermodynamics/first-law|the first law]]: $\Delta U = q + w$ with $w$ the work done **on** the system, and $p^\circ = 1\ \mathrm{bar}$; the entropy $S$ and the criterion $\mathrm{d}G \le 0$ come from [[thermodynamics/second-law|the second law]]. What is new is the level of the argument: instead of computing $\Delta G$ for one reaction at a time, we compute what $\mathrm{d}G$ *must* contain, once and for all, and then let the consequences fall where they like — into [[thermodynamics/phase-equilibria|phase equilibria]], [[thermodynamics/mixtures|mixtures]], [[thermodynamics/reaction-equilibrium|chemical equilibrium]] and [[thermodynamics/ions-in-solution|ions in solution]].

## Exact differentials, and the price of being a state function

Thermodynamics distinguishes ruthlessly between quantities a system *has* and quantities a process *does*. Internal energy, enthalpy and entropy are properties of states; heat and work belong to paths. The mathematical name for the distinction is exactness.

::: definition Exact differential {#def-exact}
A differential form $\delta F = M\,\mathrm{d}x + N\,\mathrm{d}y$ is **exact** if there is a function $F(x, y)$ with $\mathrm{d}F = M\,\mathrm{d}x + N\,\mathrm{d}y$; equivalently, if its integral between two points is independent of the path, or $\oint \delta F = 0$ around every cycle. For continuous $M$ and $N$ the test is one equation: $\delta F$ is exact if and only if
$$
\left(\frac{\partial M}{\partial y}\right)_x = \left(\frac{\partial N}{\partial x}\right)_y .
$$
A quantity whose differential is exact is a **state function**. The first law found $\mathrm{d}U$ exact and $\delta q$, $\delta w$ not; the second law's discovery was that $\delta q_\mathrm{rev}/T$ is exact, and named its integral $S$.
:::

Exactness has a second face, which drives the whole chapter: if $\mathrm{d}F$ is exact, then the order of differentiation does not matter, $\partial^2 F/\partial x\,\partial y = \partial^2 F/\partial y\,\partial x$. Every Maxwell relation is that sentence in disguise. Before we spend it, we need three everyday rules for handling partial derivatives under the constraint of an equation of state.

::: proposition Reciprocal, chain and cyclic rules {#prop-partial-rules}
For the variables of a simple system, tied together by one equation of state,
$$
\left(\frac{\partial x}{\partial y}\right)_z = \frac{1}{\left(\partial y/\partial x\right)_z}
\qquad\text{(reciprocal)},
\qquad
\left(\frac{\partial x}{\partial y}\right)_z\left(\frac{\partial y}{\partial w}\right)_z = \left(\frac{\partial x}{\partial w}\right)_z
\qquad\text{(chain)},
$$
$$
\left(\frac{\partial x}{\partial y}\right)_z\left(\frac{\partial y}{\partial z}\right)_x\left(\frac{\partial z}{\partial x}\right)_y = -1
\qquad\text{(cyclic)}.
$$
:::

::: proof
Write $x = x(y, z)$, so $\mathrm{d}x = (\partial x/\partial y)_z\,\mathrm{d}y + (\partial x/\partial z)_y\,\mathrm{d}z$. Holding $x$ constant ($\mathrm{d}x = 0$) and dividing by $\mathrm{d}z$ gives $0 = (\partial x/\partial y)_z (\partial y/\partial z)_x + (\partial x/\partial z)_y$, hence $(\partial x/\partial y)_z = -(\partial x/\partial z)_y / (\partial y/\partial z)_x$. Multiply both sides by $(\partial y/\partial z)_x (\partial z/\partial x)_y$ and use the reciprocal rule $(\partial x/\partial z)_y (\partial z/\partial x)_y = 1$ — itself immediate from comparing $\mathrm{d}x = (\partial x/\partial y)_z\,\mathrm{d}y$ with its inverse at constant $z$ — and the cyclic rule follows. The chain rule is the one-variable chain rule with $z$ carried along as a passenger.
:::

::: example The cyclic rule on an ideal gas {#ex-cyclic-rule}
One mole of ideal gas at $300\ \mathrm{K}$ in $V = 24.94\ \mathrm{L}$ stands at $p = 1.000\ \mathrm{bar}$. Evaluate the three derivatives of the cyclic rule for $p$, $V$, $T$ at this state and verify the product.
::: solution
$$
\left(\frac{\partial p}{\partial T}\right)_V = \frac{nR}{V} = \frac{8.314}{0.02494\ \mathrm{m^3}} = 333\ \mathrm{J\,m^{-3}\,K^{-1}} = 333\ \mathrm{Pa\,K^{-1}},
$$
$$
\left(\frac{\partial T}{\partial V}\right)_p = \frac{p}{nR} = \frac{1.000\times 10^{5}}{8.314} = 1.203\times 10^{4}\ \mathrm{K\,m^{-3}},
\qquad
\left(\frac{\partial V}{\partial p}\right)_T = -\frac{nRT}{p^2} = -\frac{V}{p} = -2.494\times 10^{-7}\ \mathrm{m^3\,Pa^{-1}} .
$$
The product is $333 \times 1.203\times 10^{4} \times \left(-2.494\times 10^{-7}\right) = -1.000$. Each factor is an awkward number; their product is exactly $-1$. That is the practical value of the rule: it lets you trade a derivative you cannot measure for two you can, and it is a consistency test any proposed equation of state must pass.
:::
:::

From here on, every potential in the chapter is a state function, so every one of their differentials is exact — and exactness, unlike the first and second laws, is a source of information that costs no experiment at all.

## The four potentials and their fundamental equations

Entropy is the natural coordinate of an isolated system, but nobody holds entropy fixed in a flask. Chemists control temperature, pressure and amount — and the potentials are designed in pairs for exactly that swap. Replacing a variable by its conjugate slope is a Legendre transform; we will not dwell on the construction, only note that each new potential is made from $U$ by adding or subtracting a product of a conjugate pair, $pV$ or $TS$.

::: definition The four thermodynamic potentials {#def-potentials}
The **thermodynamic potentials** of a closed simple system are the internal energy $U$, the enthalpy $H = U + pV$, the **Helmholtz energy** $A = U - TS$, and the **Gibbs energy** $G = H - TS = U + pV - TS$. All four are state functions, and each has its **natural variables**: $U(S, V)$, $H(S, p)$, $A(T, V)$, $G(T, p)$. Knowing a potential as a function of its natural variables is knowing *everything* — every other thermodynamic property follows by differentiation.
:::

::: proposition The fundamental equations {#prop-fundamental}
For a closed system of fixed composition doing no work other than expansion, the four potentials obey
$$
\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V, \qquad
\mathrm{d}H = T\,\mathrm{d}S + V\,\mathrm{d}p,
$$
$$
\mathrm{d}A = -S\,\mathrm{d}T - p\,\mathrm{d}V, \qquad
\mathrm{d}G = -S\,\mathrm{d}T + V\,\mathrm{d}p .
$$
:::

::: proof
Take two neighbouring equilibrium states. Because $U$ is a state function, $\Delta U$ may be computed along any path, so choose a reversible one: $\mathrm{d}U = \delta q_\mathrm{rev} + \delta w_\mathrm{rev} = T\,\mathrm{d}S - p\,\mathrm{d}V$, the first law with the second law's $\delta q_\mathrm{rev} = T\,\mathrm{d}S$ and expansion work $\delta w_\mathrm{rev} = -p\,\mathrm{d}V$. The other three follow by differentiation of the definitions: $\mathrm{d}H = \mathrm{d}U + p\,\mathrm{d}V + V\,\mathrm{d}p = T\,\mathrm{d}S + V\,\mathrm{d}p$; $\mathrm{d}A = \mathrm{d}U - T\,\mathrm{d}S - S\,\mathrm{d}T = -S\,\mathrm{d}T - p\,\mathrm{d}V$; and $\mathrm{d}G = \mathrm{d}H - T\,\mathrm{d}S - S\,\mathrm{d}T = -S\,\mathrm{d}T + V\,\mathrm{d}p$.
:::

Read the coefficients as derivatives. From $\mathrm{d}G = -S\,\mathrm{d}T + V\,\mathrm{d}p$ alone,

$$
\left(\frac{\partial G}{\partial T}\right)_p = -S, \qquad
\left(\frac{\partial G}{\partial p}\right)_T = V,
$$

and these two lines will occupy the last third of the chapter. The equations also fix which potential does the work of a criterion, because each is minimised under the conditions its natural variables hold fixed.

::: proposition Spontaneity criteria from the potentials {#prop-natural}
For a closed system in contact with a heat bath at temperature $T$ and surroundings at pressure $p$, exchanging only expansion work:
$$
\text{constant } T, p: \quad \mathrm{d}G \le 0; \qquad
\text{constant } T, V: \quad \mathrm{d}A \le 0,
$$
with equality at equilibrium. The spontaneous direction is the one that lowers the potential natural to the constraints, and equilibrium is its minimum.
:::

::: proof
The Clausius inequality of [[thermodynamics/second-law|the second law]] says $\delta q \le T\,\mathrm{d}S$ for a system in contact with a bath at $T$, so the first law gives $\mathrm{d}U = \delta q - p\,\mathrm{d}V \le T\,\mathrm{d}S - p\,\mathrm{d}V$. At constant $T$ and $p$ the differential of $G = U + pV - TS$ is $\mathrm{d}G = \mathrm{d}U + p\,\mathrm{d}V - T\,\mathrm{d}S \le 0$; at constant $T$ and $V$ the differential of $A = U - TS$ is $\mathrm{d}A = \mathrm{d}U - T\,\mathrm{d}S \le 0$. Neither potential can fall below its equilibrium value, or the reverse change would lower it further; the minimum is equilibrium.
:::

::: warning The fundamental equations are not the whole story {#warn-natural}
Four tidy lines tempt you to treat them as universal. They are not: each describes a **closed system of fixed composition** that exchanges **only expansion work**, and the criteria $\mathrm{d}G \le 0$, $\mathrm{d}A \le 0$ belong to constant $T, p$ and constant $T, V$ respectively. Open the system — let water evaporate, let a reaction run, let a mole of ions cross a membrane — and every one of the equations is missing a term $\sum_i \mu_i\,\mathrm{d}n_i$; that term is the last section of this chapter. Let the system deliver electrical work, as a galvanic cell does ([[electrochemistry/cell-thermodynamics]]), and a further work term appears. And a reaction in a sealed rigid vessel minimises $A$, not $G$ — using the wrong potential under the wrong constraints is the thermodynamics-exam error with the longest pedigree.
:::

::: widget plot
f: hm - sm*x/1000
x: 0, 1500
y: -450, 50
sliders: hm=-200:-500:100:10; sm=150:0:400:5
labels: G_\mathrm{m} \text{ / } \mathrm{kJ\,mol^{-1}}
caption: The molar Gibbs energy $G_\mathrm{m} = H_\mathrm{m} - T S_\mathrm{m}$ against temperature for a hypothetical substance (sliders: $H_\mathrm{m}$ in $\mathrm{kJ\,mol^{-1}}$ and $S_\mathrm{m}$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$). Where $S_\mathrm{m}$ is constant the graph is a straight line of slope $-S_\mathrm{m}$: entropy is the rate at which $G$ falls with temperature. A real substance is a chain of such segments, each steeper than the last, because $S_\mathrm{m}$ jumps up at every phase transition — the kinks that [[thermodynamics/phase-equilibria|the next chapter]] reads for a living.
:::

::: quiz
A sealed, rigid, thermally conducting steel vessel contains a reacting gas mixture; the surroundings stay at constant temperature. As the mixture approaches equilibrium, which quantity is being minimised?
- [x] The Helmholtz energy $A$: the constraints are constant $T$ (conducting walls, bath) and constant $V$ (rigid vessel).
- [ ] The Gibbs energy $G$: it is always the quantity that is minimised.
- [ ] The entropy of the gas mixture.
- [ ] The internal energy $U$: reactions release energy.
::: solution
The constraints pick the potential, and here they are $T$ and $V$, so $A$ falls to its minimum. $G$ is minimised only at constant $T$ and $p$ — the vessel's pressure changes as it reacts. The system's own entropy may decrease (the surroundings gain more), and $U$ is not minimised either: heat flows out to the bath, and what is minimised is $U - TS$, energy traded against entropy.
:::
:::

## The Maxwell relations

Because each fundamental equation is an exact differential, the cross-derivatives of its coefficients must agree. Doing this four times yields four identities of disproportionate power.

::: proposition The Maxwell relations {#prop-maxwell}
For a closed simple system,
$$
\left(\frac{\partial T}{\partial V}\right)_S = -\left(\frac{\partial p}{\partial S}\right)_V, \qquad
\left(\frac{\partial T}{\partial p}\right)_S = \left(\frac{\partial V}{\partial S}\right)_p,
$$
$$
\left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial p}{\partial T}\right)_V, \qquad
\left(\frac{\partial S}{\partial p}\right)_T = -\left(\frac{\partial V}{\partial T}\right)_p .
$$
:::

::: proof
Apply equality of cross-derivatives to each potential in turn. For $A(T, V)$: $\mathrm{d}A = -S\,\mathrm{d}T - p\,\mathrm{d}V$ gives $\left(\partial(-S)/\partial V\right)_T = \left(\partial(-p)/\partial T\right)_V$, i.e. $(\partial S/\partial V)_T = (\partial p/\partial T)_V$. For $G(T, p)$: $\left(\partial(-S)/\partial p\right)_T = \left(\partial V/\partial T\right)_p$ gives $(\partial S/\partial p)_T = -(\partial V/\partial T)_p$. The remaining two follow identically from $U(S, V)$ and $H(S, p)$.
:::

The point of a Maxwell relation is always the same trade: it replaces a derivative of entropy — unmeasurable, since you cannot attach a sensor to $S$ — with a derivative of $p$, $V$, $T$, which a dilatometer and a manometer supply. The entropy of any substance can be mapped with a thermometer and a piston alone. Three worked uses show the machinery at work.

::: proposition The energy pressure {#prop-energy-pressure}
$$
\left(\frac{\partial U}{\partial V}\right)_T = T\left(\frac{\partial p}{\partial T}\right)_V - p .
$$
For an ideal gas the right-hand side vanishes — Joule's law, derived here from the equation of state alone. For a van der Waals gas, $p = nRT/(V - nb) - a(n/V)^2$, it equals $a(n/V)^2 > 0$: the internal energy of a real gas rises with volume, because expansion lets molecules climb out of one another's attractive well.
:::

::: proof
From $\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V$, divide by $\mathrm{d}V$ at constant $T$: $(\partial U/\partial V)_T = T(\partial S/\partial V)_T - p$. The third Maxwell relation converts $(\partial S/\partial V)_T$ into $(\partial p/\partial T)_V$, giving the result. For an ideal gas $(\partial p/\partial T)_V = nR/V = p/T$, and the right-hand side is $p - p = 0$. For the van der Waals gas $(\partial p/\partial T)_V = nR/(V - nb)$, so $T(\partial p/\partial T)_V - p = a(n/V)^2$.
:::

::: example How strongly does $\mathrm{CO_2}$ hold itself together? {#ex-energy-pressure}
Carbon dioxide at $298.15\ \mathrm{K}$ and $1.00\ \mathrm{bar}$ is nearly ideal, with $V_\mathrm{m} = 24.79\ \mathrm{L\,mol^{-1}}$; the van der Waals parameter is $a = 3.640\ \mathrm{L^2\,bar\,mol^{-2}}$ (CRC). Estimate the energy pressure $\left(\partial U_\mathrm{m}/\partial V_\mathrm{m}\right)_T$, and the energy cost of doubling the molar volume isothermally.
::: solution
$$
\left(\frac{\partial U_\mathrm{m}}{\partial V_\mathrm{m}}\right)_T = \frac{a}{V_\mathrm{m}^2}
= \frac{3.640\ \mathrm{L^2\,bar\,mol^{-2}}}{\left(24.79\ \mathrm{L\,mol^{-1}}\right)^2}
= 5.92\times 10^{-3}\ \mathrm{bar} = 592\ \mathrm{Pa}.
$$
A pascal is a joule per cubic metre, so the gas gains $592\ \mathrm{J}$ of internal energy per cubic metre of molar volume created. Doubling the volume costs $\Delta U_\mathrm{m} = a\left(1/V_\mathrm{i} - 1/V_\mathrm{f}\right) = a/2V_\mathrm{i} = 7.3\ \mathrm{J\,mol^{-1}}$, and expansion to infinite dilution $14.7\ \mathrm{J\,mol^{-1}}$ — negligible against $RT\ln 2 = 1.7\ \mathrm{kJ\,mol^{-1}}$ of free energy, which is why Joule's law works so well for dilute gases. At liquid density, $V_\mathrm{m} \approx 0.05\ \mathrm{L\,mol^{-1}}$, the same formula gives about $1500\ \mathrm{bar}$: inside a liquid the energy cost of expansion rivals the pressure itself, and Joule's law fails completely.
:::
:::

::: proposition The enthalpy pressure, and the Joule–Thomson connection {#prop-enthalpy-pressure}
$$
\left(\frac{\partial H}{\partial p}\right)_T = V - T\left(\frac{\partial V}{\partial T}\right)_p = V\left(1 - \alpha T\right),
\qquad
\mu_\mathrm{JT} = \left(\frac{\partial T}{\partial p}\right)_H = -\frac{V\left(1 - \alpha T\right)}{C_{p,\mathrm{m}}},
$$
with $\alpha = (1/V)(\partial V/\partial T)_p$ the thermal expansion coefficient. An ideal gas has $\alpha T = 1$ and both coefficients vanish; a substance cools on throttling exactly where $\alpha T > 1$.
:::

::: proof
From $\mathrm{d}H = T\,\mathrm{d}S + V\,\mathrm{d}p$, $(\partial H/\partial p)_T = T(\partial S/\partial p)_T + V$; the fourth Maxwell relation turns $(\partial S/\partial p)_T$ into $-(\partial V/\partial T)_p$, giving the first formula. The second is the Joule–Thomson coefficient of [[thermodynamics/heat-capacity-adiabatic]] rewritten: along an isenthalp, $0 = \mathrm{d}H = C_{p,\mathrm{m}}\,\mathrm{d}T + (\partial H/\partial p)_T\,\mathrm{d}p$, so $\mu_\mathrm{JT} = -(\partial H/\partial p)_T/C_{p,\mathrm{m}}$.
:::

::: example Squeezing water: the enthalpy pressure of a liquid {#ex-hp-water}
Liquid water at $298.15\ \mathrm{K}$ has $V_\mathrm{m} = 18.07\ \mathrm{cm^3\,mol^{-1}}$ and $\alpha = 2.57\times 10^{-4}\ \mathrm{K^{-1}}$ (CRC). Find $(\partial H_\mathrm{m}/\partial p)_T$ and the Joule–Thomson coefficient, and say what happens when water is throttled through a valve.
::: solution
$\alpha T = 2.57\times 10^{-4} \times 298.15 = 0.0766$, so
$$
\left(\frac{\partial H_\mathrm{m}}{\partial p}\right)_T = V_\mathrm{m}\left(1 - \alpha T\right)
= 18.07 \times 0.9234\ \mathrm{cm^3\,mol^{-1}} = 16.7\ \mathrm{cm^3\,mol^{-1}},
$$
$$
\mu_\mathrm{JT} = -\frac{16.7\times 10^{-6}\ \mathrm{m^3\,mol^{-1}}}{75.3\ \mathrm{J\,K^{-1}\,mol^{-1}}}
= -2.2\times 10^{-7}\ \mathrm{K\,Pa^{-1}} = -0.022\ \mathrm{K\,bar^{-1}} .
$$
Water *warms* on throttling, by about two hundredths of a degree per bar. Liquids (and gases above their inversion temperature) sit in the regime $\alpha T < 1$, where pushing molecules together adds energy faster than their attraction can pay for it; gases below their inversion temperature sit in $\alpha T > 1$ and cool — the sign change the Linde liquefier feeds on.
:::
:::

::: proposition Entropy against pressure and volume {#prop-sp}
The third and fourth Maxwell relations read
$$
\left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial p}{\partial T}\right)_V, \qquad
\left(\frac{\partial S}{\partial p}\right)_T = -\left(\frac{\partial V}{\partial T}\right)_p = -\alpha V .
$$
For an ideal gas the first gives $(\partial S/\partial V)_T = nR/V$, hence $\Delta S = nR\ln(V_\mathrm{f}/V_\mathrm{i})$ — the entropy of isothermal expansion of [[thermodynamics/second-law|the second-law chapter]], now derived from exactness rather than from a constructed path. For stretched rubber the analogue $(\partial S/\partial L)_T = -(\partial f/\partial T)_L$ with the tension $f$: rubber has $(\partial f/\partial T)_L > 0$, so stretching *lowers* its entropy, and a loaded rubber band contracts when warmed — the Gough–Joule effect, an engine built from a polymer's willingness to be disordered.
:::

::: example Compressing water: entropy against pressure {#ex-sp-water}
Estimate the molar entropy change when liquid water at $298.15\ \mathrm{K}$ is compressed from $1.00$ to $1000\ \mathrm{bar}$, taking $\alpha = 2.57\times 10^{-4}\ \mathrm{K^{-1}}$ and $V_\mathrm{m} = 18.07\ \mathrm{cm^3\,mol^{-1}}$ as constant. Is the result small?
::: solution
$\Delta S_\mathrm{m} \approx -\alpha V_\mathrm{m}\,\Delta p = -2.57\times 10^{-4} \times 18.07\times 10^{-6}\ \mathrm{m^3} \times 9.99\times 10^{7}\ \mathrm{Pa} = -0.46\ \mathrm{J\,K^{-1}\,mol^{-1}}$.
Against $\Delta_\mathrm{vap}S = 109\ \mathrm{J\,K^{-1}\,mol^{-1}}$, a kilobar barely touches a liquid's entropy — molecules have nowhere to go when they are already in contact. But small is not zero: at $300\ \mathrm{K}$ the term $T\Delta S$ is $140\ \mathrm{J\,mol^{-1}}$, and pressure-sensitive *reactions* amplify the lever. Protein unfolding has $\Delta V \approx -40\ \mathrm{cm^3\,mol^{-1}}$, so $(\partial \Delta G/\partial p)_T = \Delta V$ shifts the unfolding free energy by about $-4\ \mathrm{kJ\,mol^{-1}}$ per kilobar — enough to denature a protein at pressures where nothing else has changed, which is both a nuisance for deep-sea biology and the basis of industrial pressure pasteurisation.
:::
:::

::: quiz
You want $\left(\partial U/\partial V\right)_T$ for a real gas from its equation of state alone. Which Maxwell relation do you need?
- [x] $\left(\partial S/\partial V\right)_T = \left(\partial p/\partial T\right)_V$, because $\left(\partial U/\partial V\right)_T = T\left(\partial S/\partial V\right)_T - p$.
- [ ] $\left(\partial S/\partial p\right)_T = -\left(\partial V/\partial T\right)_p$, because $U$ contains no $p$.
- [ ] $\left(\partial T/\partial V\right)_S = -\left(\partial p/\partial S\right)_V$, because $U$ is natural in $S$.
- [ ] None: $\left(\partial U/\partial V\right)_T = 0$ for every gas.
::: solution
Dividing $\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V$ by $\mathrm{d}V$ at constant $T$ leaves $(\partial S/\partial V)_T$, and only the third relation converts it into the equation-of-state derivative $(\partial p/\partial T)_V$. The fourth relation handles $(\partial H/\partial p)_T$ instead; the first two hold entropy constant and are rarely used; and the last option is Joule's law, true for ideal gases only — the whole point of the energy pressure is that real gases fail it.
:::
:::

## Temperature dependence: $\left(\partial G/\partial T\right)_p = -S$ and the Gibbs–Helmholtz equation

The slope of $G$ against temperature is $-S$, so $G$ of every substance falls as $T$ rises, and it falls faster the more entropy the substance carries. A vapour, whose $S_\mathrm{m}$ runs two to three times the liquid's, slides downhill most steeply of all — so the vapour line of $\mu$ against $T$ must cross the liquid line somewhere, and at the crossing the two phases share one chemical potential and coexist. Below it the liquid is stable, above it the vapour. That single slope argument is the seed from which [[thermodynamics/phase-equilibria|the next chapter]] grows; here we use the slope quantitatively.

::: proposition The Gibbs–Helmholtz equation {#prop-gh}
For any substance or any change (reaction, transition, dissolution) at constant pressure,
$$
\left(\frac{\partial (G/T)}{\partial T}\right)_p = -\frac{H}{T^2},
\qquad
\left(\frac{\partial (\Delta G/T)}{\partial T}\right)_p = -\frac{\Delta H}{T^2},
$$
and if $\Delta H$ is constant over the range,
$$
\frac{\Delta G(T_2)}{T_2} = \frac{\Delta G(T_1)}{T_1} + \Delta H\left(\frac{1}{T_2} - \frac{1}{T_1}\right).
$$
:::

::: proof
Differentiate $G/T = (H - TS)/T$ with respect to $T$ at constant $p$, using $(\partial G/\partial T)_p = -S$:
$$
\left(\frac{\partial (G/T)}{\partial T}\right)_p = \frac{1}{T}\left(\frac{\partial G}{\partial T}\right)_p - \frac{G}{T^2}
= -\frac{S}{T} - \frac{H - TS}{T^2} = -\frac{H}{T^2}.
$$
Applying it to the final state and subtracting the initial state gives the form for $\Delta$. Integrating with constant $\Delta H$, using $\int T^{-2}\,\mathrm{d}T = -1/T$, gives the two-temperature formula.
:::

::: example Ammonia synthesis at $500\ \mathrm{K}$ {#ex-nh3-gh}
For $\tfrac{1}{2}\,\mathrm{N_2(g)} + \tfrac{3}{2}\,\mathrm{H_2(g)} \rightarrow \mathrm{NH_3(g)}$, take $\Delta_\mathrm{f}H^\circ = -45.9\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{f}G^\circ(298.15\ \mathrm{K}) = -16.45\ \mathrm{kJ\,mol^{-1}}$ (NIST-JANAF). Estimate $\Delta_\mathrm{f}G^\circ$ at $500\ \mathrm{K}$ by Gibbs–Helmholtz, and find $K$ there.
::: solution
$$
\frac{\Delta_\mathrm{f}G^\circ(500)}{500}
= \frac{-16\,450}{298.15} + \left(-45\,900\right)\left(\frac{1}{500} - \frac{1}{298.15}\right)
= -55.17 + 62.15 = 6.98\ \mathrm{J\,K^{-1}\,mol^{-1}},
$$
so $\Delta_\mathrm{f}G^\circ(500\ \mathrm{K}) = 500 \times 6.98 = +3.49\ \mathrm{kJ\,mol^{-1}}$, and
$$
K = \exp\!\left(-\frac{3490}{8.314 \times 500}\right) = e^{-0.839} = 0.43 .
$$
The sign has flipped: at $500\ \mathrm{K}$ standard-state ammonia is no longer favoured, because the slope of $\Delta_\mathrm{r}G$ is $-\Delta_\mathrm{r}S = +99\ \mathrm{J\,K^{-1}\,mol^{-1}}$ — the reaction destroys gas moles, and heating punishes it for it. The Haber process accepts $K < 1$ per pass and compensates with pressure, which enters through the $RT\ln Q$ term of [[general-chemistry-2/chemical-equilibrium|the equilibrium chapter]]. Holding $\Delta H$ constant is the same approximation as Kirchhoff's law; over a few hundred kelvin it is good to a few tenths of a $\mathrm{kJ\,mol^{-1}}$, and it fails near any phase transition of a participant.
:::
:::

::: warning Every $G$ falls with $T$; $\Delta G$ may rise {#warn-gt-slope}
$(\partial G_\mathrm{m}/\partial T)_p = -S_\mathrm{m} < 0$ for every substance, and students sometimes conclude from it that every reaction becomes more spontaneous as it gets hotter. The slope of $\Delta_\mathrm{r}G$ against $T$ is not $-S$ but $-\Delta_\mathrm{r}S$, and that can be positive: for $\mathrm{CaCO_3}$ decomposition $\Delta_\mathrm{r}S > 0$ and heating drives the reaction forward; for ammonia synthesis $\Delta_\mathrm{r}S < 0$ and heating drives it back. What matters is the *difference* of the slopes, not the slope — the same reason $\Delta H$ rather than $H$ does the work of thermochemistry.
:::

::: widget plot
f: -sl*(x-373.15)/1000 ; -sv*(x-373.15)/1000
x: 250, 500
y: -30, 30
sliders: sl=70:40:120:1; sv=189:120:260:1
labels: \mu_\mathrm{l}(T); \mu_\mathrm{g}(T)
caption: The chemical potentials of liquid water and water vapour against temperature, measured from their common value at $373.15\ \mathrm{K}$ (sliders: the molar entropies in $\mathrm{J\,K^{-1}\,mol^{-1}}$, defaults $S_\mathrm{m}(\mathrm{l}) = 70$ and $S_\mathrm{m}(\mathrm{g}) = 189$). Both lines pass through the same point at $373.15\ \mathrm{K}$ — the phases share one $\mu$ at the transition — but the vapour line descends almost three times faster, because $S_\mathrm{m}(\mathrm{g}) \gg S_\mathrm{m}(\mathrm{l})$. Below the crossing the liquid has the lower $\mu$ and is stable; above it the vapour is. Slide the entropies: the crossing stays pinned, because equality of $\mu$ at $T_\mathrm{tr}$ is what defines it; only the steepness of the descent — how fast the wrong phase loses its stability — responds.
:::

## Pressure dependence: $\left(\partial G/\partial p\right)_T = V$

::: proposition Pressure dependence of $G$ {#prop-gp}
For a closed system of fixed composition, $\left(\partial G/\partial p\right)_T = V$, so along an isotherm $\Delta G = \int V\,\mathrm{d}p$. For one mole of ideal gas,
$$
G_\mathrm{m}(p_2) - G_\mathrm{m}(p_1) = RT\ln\frac{p_2}{p_1},
$$
and for a condensed phase with nearly constant $V_\mathrm{m}$,
$$
\Delta G_\mathrm{m} \approx V_\mathrm{m}\,\Delta p .
$$
:::

::: proof
$\mathrm{d}G = V\,\mathrm{d}p$ at constant $T$; insert $V_\mathrm{m} = RT/p$ for the gas and integrate, or $V_\mathrm{m} \approx$ const for the condensed phase. The two results differ by three orders of magnitude at ordinary pressures: at $298.15\ \mathrm{K}$ and $1\ \mathrm{bar}$ the slope $(\partial G_\mathrm{m}/\partial p)_T$ is $2.48\ \mathrm{kJ\,mol^{-1}\,bar^{-1}}$ for a gas but $0.0018\ \mathrm{kJ\,mol^{-1}\,bar^{-1}}$ for liquid water — a gas has somewhere to go when you squeeze it, a liquid does not.
:::

::: example Diamond, graphite, and the pressure that flips the scale {#ex-diamond-graphite}
At $298.15\ \mathrm{K}$, $\Delta_\mathrm{f}G^\circ[\mathrm{C,\,diamond}] = +2.90\ \mathrm{kJ\,mol^{-1}}$ relative to graphite (NIST-JANAF), and the densities are $3.515$ and $2.267\ \mathrm{g\,cm^{-3}}$ (CRC). At what pressure does diamond become the stable form of carbon at $298.15\ \mathrm{K}$, and why does a diamond ring survive at the surface?
::: solution
The molar volumes are $V_\mathrm{m} = 12.011/3.515 = 3.417\ \mathrm{cm^3\,mol^{-1}}$ for diamond and $12.011/2.267 = 5.298\ \mathrm{cm^3\,mol^{-1}}$ for graphite, so $\Delta V_\mathrm{m} = -1.881\ \mathrm{cm^3\,mol^{-1}} = -1.881\times 10^{-6}\ \mathrm{m^3\,mol^{-1}}$. With both phases nearly incompressible on this scale,
$$
\Delta G(p) = \Delta G^\circ + \Delta V_\mathrm{m}\left(p - p^\circ\right),
$$
which vanishes at $p = 2900 / 1.881\times 10^{-6} = 1.54\times 10^{9}\ \mathrm{Pa} = 1.54\ \mathrm{GPa} \approx 15\ \mathrm{kbar}$.
Diamond is the high-pressure form of carbon: at mantle pressures of several $\mathrm{GPa}$ it is the stable phase — which is why diamonds come up in kimberlite pipes from kilometres down. At the surface $\Delta G = +2.9\ \mathrm{kJ\,mol^{-1}}$ and diamond is thermodynamically unstable but kinetically immortal: rearranging $\mathrm{sp^3}$-bonded carbon into graphite sheets has an activation barrier no ring can pay at room temperature. The lesson is the slope itself: $(\partial \Delta G/\partial p)_T = \Delta V$, so pressure always favours the denser phase — the same lever that melts ice under a skate blade, in [[thermodynamics/phase-equilibria]].
:::
:::

::: widget plot
f: 8.314*t*log(x)/1000
x: 0.01, 10
y: -12, 12
sliders: t=298:200:600:10
labels: G_\mathrm{m}(p) - \mu^\circ \text{ / } \mathrm{kJ\,mol^{-1}}
caption: $G_\mathrm{m}(p) - \mu^\circ = RT\ln(p/p^\circ)$ for one mole of ideal gas (slider: temperature in K). The slope is $V_\mathrm{m} = RT/p$: enormous at low pressure, gentle at high, and the whole curve steepens as the gas is heated. The logarithmic plunge as $p \rightarrow 0$ is why a gas expanding into vacuum gains $RT\ln(V_\mathrm{f}/V_\mathrm{i})$ of free energy — the entropy of expansion of [[thermodynamics/second-law|the second-law chapter]], wearing its Gibbs-energy clothes — and the curve's height at any $p$ is the chemical potential of the next section.
:::

## The chemical potential

Every equation so far carried a silent assumption: fixed composition. Let the amount of a substance change — water evaporating, salt dissolving, a reaction running, an ion crossing a membrane — and $G$ acquires a new sensitivity, one so central that it gets a name.

::: definition Chemical potential {#def-mu}
The **chemical potential** of species $i$ is
$$
\mu_i = \left(\frac{\partial G}{\partial n_i}\right)_{T, p, n_{j \ne i}} :
$$
the rate at which the Gibbs energy rises when one mole of $i$ is added to the system, holding temperature, pressure and all other amounts fixed. Its units are $\mathrm{J\,mol^{-1}}$, and it is a **partial molar** property: in a mixture it belongs to the mixture's composition, not to the pure substance.
:::

::: proposition The fundamental equation with composition {#prop-mu-fund}
For an open system, or a closed one in which reaction changes the amounts,
$$
\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V + \sum_i \mu_i\,\mathrm{d}n_i, \qquad
\mathrm{d}G = -S\,\mathrm{d}T + V\,\mathrm{d}p + \sum_i \mu_i\,\mathrm{d}n_i,
$$
and likewise for $\mathrm{d}H$ and $\mathrm{d}A$. The Gibbs energy is the sum $G = \sum_i n_i \mu_i$; for a pure substance,
$$
\mu = G_\mathrm{m}, \qquad \mathrm{d}\mu = -S_\mathrm{m}\,\mathrm{d}T + V_\mathrm{m}\,\mathrm{d}p .
$$
:::

::: proof
$G$ is extensive: doubling all the amounts at fixed $T$ and $p$ doubles $G$, so $G$ is homogeneous of degree one in the $n_i$ and Euler's theorem gives $G = \sum_i n_i\left(\partial G/\partial n_i\right)_{T,p,n'} = \sum_i n_i \mu_i$. For a pure substance $G = n\mu$, so $\mu = G/n = G_\mathrm{m}$. Differentiating $G = n\mu$ and comparing with $\mathrm{d}G = -S\,\mathrm{d}T + V\,\mathrm{d}p + \mu\,\mathrm{d}n$ gives $n\,\mathrm{d}\mu = -S\,\mathrm{d}T + V\,\mathrm{d}p$; dividing by $n$ yields the molar fundamental equation. The extra terms in the four equations are the work-free energy cost of changing composition; dropping $n_i$-dependence recovers [[#prop-fundamental]].
:::

::: proposition Chemical potential of an ideal gas {#prop-mu-ideal}
For one mole of ideal gas at temperature $T$ and pressure $p$, with standard state $p^\circ = 1\ \mathrm{bar}$,
$$
\mu(\mathrm{g}, T, p) = \mu^\circ(T) + RT\ln\frac{p}{p^\circ}.
$$
:::

::: proof
Integrate the molar fundamental equation $\mathrm{d}\mu = V_\mathrm{m}\,\mathrm{d}p$ at constant $T$ with $V_\mathrm{m} = RT/p$: $\mu(p) - \mu(p^\circ) = RT\ln(p/p^\circ)$, and $\mu(p^\circ) \equiv \mu^\circ(T)$. (The temperature dependence of $\mu^\circ$ is $-S_\mathrm{m}$, the slope of the previous section.) The full content of the logarithm — why it is the same logarithm as the entropy of mixing — is unpacked in [[thermodynamics/mixtures]].
:::

::: warning Three traps in $\mu = \mu^\circ + RT\ln(p/p^\circ)$ {#warn-mu-ideal}
First, the logarithm is an **ideal-gas** property. For a liquid or solid, $\mu$ moves only by $V_\mathrm{m}\Delta p$ across a whole laboratory's pressure range; in solution the argument of the logarithm becomes the **activity**, and getting that argument right is the subject of [[thermodynamics/mixtures]] and [[thermodynamics/ions-in-solution]]. Second, $\mu^\circ$ is a function of temperature and of the chosen standard state — it is not "the chemical potential under your conditions", and only differences of $\mu$ are measurable. Third, $\mu = G_\mathrm{m}$ holds for a **pure** substance only: in a mixture $\mu_i$ is a partial molar Gibbs energy, generally different from the molar Gibbs energy of pure $i$, and that difference is exactly what mixing does.
:::

::: proposition The condition of phase equilibrium {#prop-phase-eq}
A pure substance with two phases $\alpha$ and $\beta$ in a closed system at constant $T$ and $p$ is at equilibrium if and only if
$$
\mu^\alpha = \mu^\beta .
$$
If $\mu^\alpha < \mu^\beta$, the $\beta$ phase converts spontaneously into $\alpha$; the stable phase at any $T$ and $p$ is the one with the lower chemical potential.
:::

::: proof
Let $\mathrm{d}n$ moles move from $\beta$ to $\alpha$ at constant $T$ and $p$. With only two phases, $\mathrm{d}G = \mu^\alpha \mathrm{d}n - \mu^\beta \mathrm{d}n = (\mu^\alpha - \mu^\beta)\,\mathrm{d}n$, and the spontaneity criterion $\mathrm{d}G \le 0$ says transfer runs toward the lower $\mu$. At equilibrium neither direction is spontaneous, so $\mu^\alpha - \mu^\beta = 0$; if the two differed by any amount, transfer in one direction would lower $G$ and the system would not be at equilibrium.
:::

::: example How much cheaper is rarefied argon? {#ex-mu-argon}
Find $\mu - \mu^\circ$ for argon gas at $298.15\ \mathrm{K}$ and $0.010\ \mathrm{bar}$, in $\mathrm{kJ\,mol^{-1}}$ and per atom.
::: solution
$$
\mu - \mu^\circ = RT\ln\frac{p}{p^\circ}
= 8.314 \times 298.15 \times \ln 0.010
= -11.4\ \mathrm{kJ\,mol^{-1}} .
$$
Per atom this is $11.4/96.485 = 0.118\ \mathrm{eV}$ — about $4.6\,k_\mathrm{B}T$. Rarefied argon is $11.4\ \mathrm{kJ\,mol^{-1}}$ *cheaper* in Gibbs energy than standard-state argon, so compressing a mole from $0.010$ to $1\ \mathrm{bar}$ costs at least that much work, and a vacuum pump must spend it. The same number says the atmosphere will never spontaneously concentrate itself: $\mu$ rises with $p$, so matter flows from high pressure to low and never back — the direction rule of the warning below, in its simplest case.
:::
:::

::: warning Matter flows from high $\mu$ to low $\mu$ — not from high concentration to low {#warn-mu-direction}
Heat flows hot to cold; the honest analogue for matter is *high chemical potential to low*, and the difference is not pedantry. Pour fresh water over a membrane into sugar solution and water flows **into** the solution — into the side where water is more dilute — because the mixing term $RT\ln x$ in $\mu$ makes water's chemical potential lower there. Osmosis, distillation, extraction, precipitation, corrosion and the setting of cement are all statements about the direction of decreasing $\mu$; "down the concentration gradient" is the special case where the mixture is ideal and $\mu$ happens to rise with concentration. When you are told a substance "moves to equalise its concentration", translate it in your head to "moves to equalise its chemical potential" — the translation is free, and it is the only version that survives into [[thermodynamics/mixtures]].
:::

::: history From the Connecticut Academy to the laboratory {#hist-gibbs}
Josiah Willard Gibbs built this chapter in two steps. In 1873, in transactions of the Connecticut Academy of Sciences, he gave a geometrical representation of the thermodynamic properties of substances by the consideration of surfaces; in 1876 and 1878, in the same obscure proceedings, *On the Equilibrium of Heterogeneous Substances* introduced the chemical potential, the phase rule, and the condition $\mu^\alpha = \mu^\beta$ — the most consequential pair of papers in the history of physical chemistry, understood at first by almost no one. James Clerk Maxwell had coined the word *thermodynamic* in his 1871 *Theory of Heat* and had already recast Clausius's second law in the language of exact differentials; he recognised Gibbs's work immediately, reproduced Gibbs's surface in plaster in the mid-1870s, and wrote the commentaries that made it readable. Hermann von Helmholtz arrived at the same territory from the other side: the relation between $G/T$, $H$ and temperature that carries both their names was obtained by Helmholtz in 1873, in a paper on the electromotive force of galvanic cells, and by Gibbs in the same year; Helmholtz's 1882 paper on the thermodynamics of chemical processes then introduced $A = U - TS$ as the free energy of isothermal change, the maximum-work interpretation the first course inherited. The vocabulary chemists actually use — free energy as a working quantity, chemical potential as "escaping tendency" — was fixed by Gilbert Lewis and Merle Randall in their 1923 textbook, fifty years after the Connecticut Academy had printed the mathematics almost unread.
:::

## Where this leads

The slope arguments of this chapter are the whole content of [[thermodynamics/phase-equilibria]]: Clapeyron's equation is the condition $\mu^\alpha = \mu^\beta$ differentiated along a coexistence line, and the kinked $G_\mathrm{m}(T)$ figure is a phase diagram in disguise. [[thermodynamics/mixtures]] derives the logarithm of the chemical potential from mixing entropy, promotes it to activities and fugacities, and explains why solutions break the ideal rule. [[thermodynamics/reaction-equilibrium]] rewrites the reaction criterion as $\Delta_\mathrm{r}G = \sum_i \nu_i \mu_i$ and finds the equilibrium constant inside it — the van 't Hoff equation of [[general-chemistry-2/chemical-equilibrium|the equilibrium chapter]] is the Gibbs–Helmholtz equation in reaction clothing, and [[thermodynamics/ions-in-solution]] carries the same $\mu$ into electrochemistry, where [[electrochemistry/cell-thermodynamics|a cell's electromotive force]] is a difference of chemical potentials divided by Faraday's constant. The molecular meaning of $\mu$ — why the logarithm counts states — belongs to [[statistical-thermodynamics/thermodynamic-functions]] and [[statistical-thermodynamics/canonical-ensemble]], built on [[statistical-thermodynamics/partition-function|the partition function]]. And the first course's $\Delta_\mathrm{r}G^\circ = -RT\ln K$ ([[general-chemistry-2/entropy-free-energy|entropy and free energy]]) is waiting to be seen as one line of $\sum_i \nu_i \mu_i$.

::: summary
- The four potentials $U(S,V)$, $H(S,p)$, $A(T,V)$, $G(T,p)$ carry exact differentials — the fundamental equations — whose coefficients are derivatives: $(\partial G/\partial T)_p = -S$, $(\partial G/\partial p)_T = V$, and so on.
- Exactness of the fundamental equations yields the four Maxwell relations, which trade entropy derivatives for measurable $pVT$ derivatives: $(\partial S/\partial V)_T = (\partial p/\partial T)_V$, $(\partial S/\partial p)_T = -(\partial V/\partial T)_p$, and the two at constant $S$.
- The energy pressure $(\partial U/\partial V)_T = T(\partial p/\partial T)_V - p$ vanishes for an ideal gas and equals $a(n/V)^2$ for a van der Waals gas; the enthalpy pressure $(\partial H/\partial p)_T = V(1 - \alpha T)$ sets the Joule–Thomson coefficient.
- $G$ falls with $T$ at rate $S$, and $\Delta G$ moves at rate $-\Delta S$; the Gibbs–Helmholtz equation $(\partial(\Delta G/T)/\partial T)_p = -\Delta H/T^2$ carries $\Delta G$ to a new temperature.
- $G$ rises with $p$ at rate $V$: $RT\ln(p_2/p_1)$ for an ideal gas, $V_\mathrm{m}\Delta p$ for a condensed phase — which is why pressure flips graphite to diamond near $1.5\ \mathrm{GPa}$ and barely touches a liquid.
- The chemical potential $\mu_i = (\partial G/\partial n_i)_{T,p,n'}$ extends every fundamental equation with $\sum_i \mu_i\,\mathrm{d}n_i$; for a pure substance $\mu = G_\mathrm{m}$, and for an ideal gas $\mu = \mu^\circ + RT\ln(p/p^\circ)$.
- Phase equilibrium is $\mu^\alpha = \mu^\beta$; matter flows from high $\mu$ to low $\mu$, which is the rule beneath osmosis, distillation and every chapter that follows.
:::

## Exercises

::: exercise Energy pressure of carbon dioxide {level=1 check="592"}
Using the van der Waals energy pressure $\left(\partial U_\mathrm{m}/\partial V_\mathrm{m}\right)_T = a/V_\mathrm{m}^2$ with $a = 3.640\ \mathrm{L^2\,bar\,mol^{-2}}$ (CRC), evaluate it for $\mathrm{CO_2}$ at $298.15\ \mathrm{K}$ and $1.00\ \mathrm{bar}$, treating the gas as ideal. (Enter the value in $\mathrm{Pa}$.)
::: solution
At $1.00\ \mathrm{bar}$ and $298.15\ \mathrm{K}$, $V_\mathrm{m} = RT/p = 24.79\ \mathrm{L\,mol^{-1}}$, so
$$
\left(\frac{\partial U_\mathrm{m}}{\partial V_\mathrm{m}}\right)_T = \frac{3.640}{24.79^2}\ \mathrm{bar}
= 5.92\times 10^{-3}\ \mathrm{bar} = 592\ \mathrm{Pa}.
$$
Six hundred pascals against a pressure of $10^5\ \mathrm{Pa}$: at room conditions the molecules of $\mathrm{CO_2}$ barely feel one another across the expansion, and Joule's law is excellent.
:::
:::

::: exercise Compressing liquid water {level=1 check="0.902"}
Take $V_\mathrm{m} = 18.07\ \mathrm{cm^3\,mol^{-1}}$ for liquid water at $298.15\ \mathrm{K}$ as constant and compute $\Delta G_\mathrm{m}$ for compression from $1.00$ to $500\ \mathrm{bar}$. (Enter the value in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta G_\mathrm{m} = V_\mathrm{m}\,\Delta p = 18.07\times 10^{-6}\ \mathrm{m^3\,mol^{-1}} \times 4.99\times 10^{7}\ \mathrm{Pa} = 902\ \mathrm{J\,mol^{-1}} = 0.902\ \mathrm{kJ\,mol^{-1}}$.
Five hundred bar — the pressure of a hydraulic press — moves a liquid's Gibbs energy by less than a kilojoule per mole, where the same pressure change on a gas moves it by $RT\ln 500 = 15.4\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise Chemical potential of a dilute gas {level=1 check="-11.4"}
Compute $\mu - \mu^\circ$ for an ideal gas at $298.15\ \mathrm{K}$ and $0.010\ \mathrm{bar}$. (Enter the value in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\mu - \mu^\circ = RT\ln(p/p^\circ) = 8.314 \times 298.15 \times \ln 0.010 = -11.4\ \mathrm{kJ\,mol^{-1}}$.
The logarithm is negative below $p^\circ$: a gas below one bar has lower chemical potential than its standard state, which is why it expands into evacuated space of its own accord.
:::
:::

::: exercise Gibbs–Helmholtz for vaporisation {level=2 check="1.09"}
For water, $\Delta_\mathrm{vap}H = 40.65\ \mathrm{kJ\,mol^{-1}}$ at $373.15\ \mathrm{K}$, where $\Delta_\mathrm{vap}G = 0$. Using Gibbs–Helmholtz with $\Delta H$ constant, estimate $\Delta_\mathrm{vap}G$ at $363.15\ \mathrm{K}$ and interpret the sign. (Enter the value in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$$
\frac{\Delta_\mathrm{vap}G(363.15)}{363.15} = 0 + 40\,650\left(\frac{1}{363.15} - \frac{1}{373.15}\right) = 40\,650 \times 7.38\times 10^{-5} = 3.00\ \mathrm{J\,K^{-1}\,mol^{-1}},
$$
so $\Delta_\mathrm{vap}G = 363.15 \times 3.00 = +1.09\ \mathrm{kJ\,mol^{-1}}$. Positive: below the boiling point liquid water is the stable phase and vaporisation is nonspontaneous in the standard sense — the ten-degree deficit is worth about a kilojoule, a tenth of $RT$, which is why a little superheating or a dust particle can flip it.
:::
:::

::: exercise Enthalpy pressure of liquid water {level=2 check="16.7"}
With $V_\mathrm{m} = 18.07\ \mathrm{cm^3\,mol^{-1}}$ and $\alpha = 2.57\times 10^{-4}\ \mathrm{K^{-1}}$ at $298.15\ \mathrm{K}$, compute $\left(\partial H_\mathrm{m}/\partial p\right)_T$ for liquid water. (Enter the value in $\mathrm{cm^3\,mol^{-1}}$.)
::: solution
$\alpha T = 0.0766$, so $\left(\partial H_\mathrm{m}/\partial p\right)_T = V_\mathrm{m}(1 - \alpha T) = 18.07 \times 0.9234 = 16.7\ \mathrm{cm^3\,mol^{-1}}$.
Positive, so $\mu_\mathrm{JT} = -16.7\times 10^{-6}/75.3 = -0.022\ \mathrm{K\,bar^{-1}} < 0$: throttling warms water. The enthalpy of a liquid rises under pressure because the pushing-on work $pV_\mathrm{m}$ outweighs the small structural relaxation ($\alpha T < 1$).
:::
:::

::: exercise Entropy of compressed water {level=2 check="-0.464"}
Using $\left(\partial S_\mathrm{m}/\partial p\right)_T = -\alpha V_\mathrm{m}$ with $\alpha = 2.57\times 10^{-4}\ \mathrm{K^{-1}}$ and $V_\mathrm{m} = 18.07\ \mathrm{cm^3\,mol^{-1}}$ constant, estimate $\Delta S_\mathrm{m}$ when liquid water at $298.15\ \mathrm{K}$ is compressed from $1.00$ to $1000\ \mathrm{bar}$. (Enter the value in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: solution
$\Delta S_\mathrm{m} = -\alpha V_\mathrm{m}\,\Delta p = -2.57\times 10^{-4} \times 18.07\times 10^{-6} \times 9.99\times 10^{7} = -0.464\ \mathrm{J\,K^{-1}\,mol^{-1}}$.
A kilobar removes less than half a joule per kelvin from a mole of water — a thousandth of $\Delta_\mathrm{vap}S$. Pressure orders liquids only very gently; it takes phase transitions, not pistons, to move entropies by tens of $\mathrm{J\,K^{-1}\,mol^{-1}}$.
:::
:::

::: exercise From exactness to the entropy of a van der Waals gas {level=3 check="-27.0"}
Derive the Maxwell relation $\left(\partial S/\partial V\right)_T = \left(\partial p/\partial T\right)_V$ from the exactness of $\mathrm{d}A = -S\,\mathrm{d}T - p\,\mathrm{d}V$, then integrate it at constant temperature to show that a van der Waals gas obeys $\Delta S_\mathrm{m} = R\ln\!\left[(V_{\mathrm{m},\mathrm{f}} - b)/(V_{\mathrm{m},\mathrm{i}} - b)\right]$ for an isothermal change. Evaluate $\Delta S_\mathrm{m}$ for compressing $1\ \mathrm{mol}$ of $\mathrm{CO_2}$ from $24.79$ to $1.000\ \mathrm{L\,mol^{-1}}$ at $298.15\ \mathrm{K}$ with $b = 0.0427\ \mathrm{L\,mol^{-1}}$ (CRC), and compare with the ideal-gas value. (Enter $\Delta S_\mathrm{m}$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: solution
Exactness of $\mathrm{d}A$ requires $\left(\partial(-S)/\partial V\right)_T = \left(\partial(-p)/\partial T\right)_V$, i.e. $(\partial S/\partial V)_T = (\partial p/\partial T)_V$. For the van der Waals gas $p = RT/(V_\mathrm{m} - b) - a/V_\mathrm{m}^2$, so $(\partial p/\partial T)_{V_\mathrm{m}} = R/(V_\mathrm{m} - b)$ and
$$
\Delta S_\mathrm{m} = \int_{V_{\mathrm{m},\mathrm{i}}}^{V_{\mathrm{m},\mathrm{f}}} \frac{R}{V_\mathrm{m} - b}\,\mathrm{d}V_\mathrm{m}
= R\ln\frac{V_{\mathrm{m},\mathrm{f}} - b}{V_{\mathrm{m},\mathrm{i}} - b}.
$$
Numerically, $\Delta S_\mathrm{m} = 8.314 \times \ln\frac{1.000 - 0.0427}{24.79 - 0.0427} = 8.314 \times \ln 0.03868 = -27.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$, against $R\ln(1/24.79) = -26.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for the ideal gas. The $b$ correction makes the entropy loss slightly larger, because the molecules' own volume has already eaten part of the free volume: the gas had less room to lose than the ideal calculation assumes. Note that $a$ never appears — the attractive term moves the *energy* (the energy pressure) but not the entropy of an isotherm.
:::
:::

::: exercise The diamond anvil, thermodynamically {level=3 check="1.54"}
Using $\Delta_\mathrm{f}G^\circ[\mathrm{C,\,diamond}] = +2.90\ \mathrm{kJ\,mol^{-1}}$ and molar volumes $3.417$ (diamond) and $5.298\ \mathrm{cm^3\,mol^{-1}}$ (graphite), compute the pressure at which $\Delta G$ for graphite $\rightarrow$ diamond vanishes at $298.15\ \mathrm{K}$, taking both phases incompressible. (Enter the value in $\mathrm{GPa}$.)
::: solution
$\Delta V_\mathrm{m} = 3.417 - 5.298 = -1.881\ \mathrm{cm^3\,mol^{-1}} = -1.881\times 10^{-6}\ \mathrm{m^3\,mol^{-1}}$, and $\Delta G(p) = \Delta G^\circ + \Delta V_\mathrm{m}(p - p^\circ)$ vanishes at
$$
p = \frac{2900\ \mathrm{J\,mol^{-1}}}{1.881\times 10^{-6}\ \mathrm{m^3\,mol^{-1}}} = 1.54\times 10^{9}\ \mathrm{Pa} = 1.54\ \mathrm{GPa}.
$$
Above about $15\ \mathrm{kbar}$ diamond is the stable form — the reason the Earth's mantle manufactures it and synthetic-diamond presses run at five or six. A diamond ring at the surface is metastable for kinetic reasons only: $\Delta G = -2.9\ \mathrm{kJ\,mol^{-1}}$ drives the graphitisation, and nothing happens, because the barrier is enormous. Thermodynamics decides the destination; kinetics decides the arrival — and here it decides that the arrival never occurs.
:::
:::
