A molecule in the gas phase is a frustratingly well-fed object: every bond it possesses is satisfied, every valence is complete, and nothing about it *needs* another partner. A surface atom is the opposite. Cut a crystal and the atoms in the interior keep four, six or twelve neighbours, but the atoms in the topmost layer have lost the neighbours that used to sit where the vacuum now is — they are **coordinatively unsaturated**, carrying dangling bonds and an energy surplus (the surface energy) that makes them hungry to bind whatever drifts by. This single fact — that a surface is a sheet of under-coordinated, reactive sites — is why roughly nine out of ten steps of industrial catalysis run on solid surfaces: ammonia on promoted iron, exhaust gases on platinum–rhodium, polymerisation on supported titanium compounds, and why corrosion, poisoning and catalytic converters are all chapters of the same subject. This chapter builds the kinetics of that world: how molecules stick (adsorption isotherms), how the coverage they produce depends on pressure and temperature, how two adsorbed species find each other and react (the Langmuir–Hinshelwood picture), and how all of it explains orders of reaction that look impossible from the gas phase — zero, half and even negative. The prerequisite machinery is the equilibrium and steady-state algebra of [[kinetics/reaction-mechanisms]] and the collision flux of [[kinetics/collision-theory]]; the payoff is a quantitative understanding of catalysis at [[kinetics/homogeneous-catalysis]] by contrast, and of the surface science of [[kinetics/reaction-dynamics]].

## Why surfaces stick: physisorption and chemisorption

::: definition Adsorption; physisorption and chemisorption {#def-adsorption}
**Adsorption** is the accumulation of a species (the **adsorbate**) at the interface of a condensed phase (the **adsorbent**), as distinct from **absorption**, in which the species penetrates the bulk. Adsorption of a gas on a solid comes in two classes, distinguished by the force that holds it:

| | physisorption | chemisorption |
|---|---|---|
| force | van der Waals (dispersion, induction, dipole) | a genuine chemical bond (σ, π donation; back-donation into antibonding orbitals) |
| enthalpy | $-5$ to $-40\ \mathrm{kJ\,mol^{-1}}$, like condensation | $-50$ to $-400\ \mathrm{kJ\,mol^{-1}}$, like bond formation |
| specificity | nearly universal, weakly structure-dependent | highly specific: $\mathrm{H_2}$ chemisorbs on W and Ni, not on graphite |
| activation | none (always fast) | often activated: needs to break bonds (e.g. $\mathrm{H_2}$ dissociation) |
| reversibility | reversible near the condensation temperature | often irreversible; desorbs only at much higher $T$, sometimes dissociated |
| layers | multilayers possible | strictly a **monolayer**: one bond per surface site |
| adsorbate state | molecule intact, weakly polarised | molecule often dissociated ($\mathrm{N_2 \rightarrow 2\,N}$), strongly altered |

The two classes often act in sequence: a molecule first physisorbs in a shallow **precursor state**, diffuses over the surface, and either evaporates again or crosses into the chemisorbed well.
:::

::: definition Surface coverage {#def-coverage}
The **fractional surface coverage** $\theta$ of a given adsorbed species is the fraction of the available surface sites it occupies: $\theta = 0$ is a clean surface, $\theta = 1$ a complete **monolayer** (one adsorbed particle per surface site). Experimentally $\theta$ is obtained from the amount adsorbed $V$ (moles, or a gas volume at standard pressure and temperature) divided by the **monolayer capacity** $V_\mathrm{mon}$: $\theta = V/V_\mathrm{mon}$. A typical metal surface carries $\sim 10^{19}$ sites per $\mathrm{m^{2}}$, so a monolayer on one gram of a high-area catalyst is a measurable quantity of gas — adsorption isotherms are thermometers of the surface.
:::

Chemisorption is a chemical reaction with the surface, and like any reaction it has an activation energy when bonds must be broken — dissociative chemisorption of $\mathrm{H_2}$ or $\mathrm{N_2}$ usually does, molecular physisorption never does. That is why a "clean" surface in a vacuum chamber is not automatically covered: at $\mathrm{100\ K}$ almost every collision sticks (physisorption), while at $\mathrm{600\ K}$ a molecule may strike the surface a million times before one strike finds an activated site and bonds.

::: example The collision flux and the time to grow a monolayer {#ex-flux}
The flux of gas molecules striking unit area of surface (the Hertz–Knudsen or impingement rate, from [[kinetics/collision-theory]]: every molecule is a target sweeping volume $\tfrac{1}{2}\bar v$ per second, half the factor $\sqrt{2}$ of like-molecule collisions) is
$$
Z_\mathrm{W} = \frac{p}{\left(2\pi m k_\mathrm{B} T\right)^{1/2}} .
$$
Compute $Z_\mathrm{W}$ for $\mathrm{N_2}$ ($M = 28.02\ \mathrm{g\,mol^{-1}}$) at $p = 1.00\times10^{-4}\ \mathrm{Pa}$ and $T = 300\ \mathrm{K}$, and the time to grow one monolayer on a surface of site density $1.0\times10^{19}\ \mathrm{m^{-2}}$ if every collision sticks. What are the same two times at $p = 1.00\times10^{-7}\ \mathrm{Pa}$ and at $1.00\times10^{5}\ \mathrm{Pa}$?
::: solution
One $\mathrm{N_2}$ molecule has mass $m = 0.02802\ \mathrm{kg\,mol^{-1}} / 6.022\times10^{23}\ \mathrm{mol^{-1}} = 4.65\times10^{-26}\ \mathrm{kg}$, so
$$
2\pi m k_\mathrm{B} T = 2\pi \times 4.65\times10^{-26} \times 1.381\times10^{-23} \times 300 = 1.211\times10^{-45}\ \mathrm{kg^{2}\,m^{2}\,s^{-2}}
$$
and
$$
Z_\mathrm{W} = \frac{1.00\times10^{-4}\ \mathrm{Pa}}{\left(1.211\times10^{-45}\right)^{1/2}} = \frac{1.00\times10^{-4}}{3.48\times10^{-23}} = 2.87\times10^{18}\ \mathrm{m^{-2}\,s^{-1}} .
$$
One monolayer needs $1.0\times10^{19}\ \mathrm{m^{-2}}$ sticking events, so
$$
t_\mathrm{ML} = \frac{1.0\times10^{19}}{2.87\times10^{18}} = 3.5\ \mathrm{s}.
$$
Because $Z_\mathrm{W} \propto p$, the time scales inversely with pressure: at $1.00\times10^{-7}\ \mathrm{Pa}$ it is $3.5\times10^{3}\ \mathrm{s} \approx 1\ \mathrm{h}$, and at atmospheric $1.00\times10^{5}\ \mathrm{Pa}$ it is $3.5\times10^{-9}\ \mathrm{s}$ — nanoseconds. This is why surface science is done at $10^{-7}\ \mathrm{Pa}$ and below: only there does a clean surface live long enough to study.
:::
:::

## The Langmuir isotherm

The first quantitative theory of the surface was Irving Langmuir's (1916), and it is a masterpiece of assumption-minimisation.

::: proposition The Langmuir isotherm {#prop-langmuir}
Assume (i) a fixed density of equivalent, independent sites; (ii) one adsorbate per site, so a maximum of one monolayer; (iii) no interaction between adsorbed neighbours; (iv) molecular (non-dissociative) adsorption in equilibrium with the gas. Then the equilibrium coverage is
$$
\theta = \frac{Kp}{1 + Kp},
\qquad\text{equivalently}\qquad
\frac{p}{V} = \frac{1}{K V_\mathrm{mon}} + \frac{p}{V_\mathrm{mon}},
$$
where $V = V_\mathrm{mon}\theta$ is the amount adsorbed, and $K$ (units $\mathrm{pressure^{-1}}$) is the **adsorption equilibrium constant**. The two linear forms $p/V$ vs $p$ (slope $1/V_\mathrm{mon}$, intercept $1/KV_\mathrm{mon}$) and $1/\theta$ vs $1/p$ are the classical ways of extracting $K$ and $V_\mathrm{mon}$ from data. The limits are the interesting part: at low pressure $Kp \ll 1$ and $\theta \approx Kp$ — adsorption, and any surface reaction fed by it, is **first order in pressure**; at high pressure $Kp \gg 1$ and $\theta \rightarrow 1$ — the surface is **saturated** and the rate becomes **zero order**. The temperature dependence follows from the van 't Hoff equation with the (negative) enthalpy of adsorption:
$$
\frac{\mathrm{d}\ln K}{\mathrm{d}T} = \frac{\Delta_\mathrm{ads} H}{RT^{2}} < 0,
\qquad
K \propto e^{-\Delta_\mathrm{ads} H / RT},
$$
so at fixed pressure the coverage *falls* as the surface is heated: adsorption is exothermic, and heating always drives a surface towards being cleaner.
:::

::: proof The Langmuir isotherm, twice {#proof-langmuir}
**Dynamic-equilibrium derivation.** Adsorption needs a gas molecule *and* a free site, so its rate is proportional to the collision flux (∝ $p$) times the vacant fraction: $r_\mathrm{ads} = k_\mathrm{a}\,p\,(1 - \theta)$. Desorption needs only an adsorbed molecule: $r_\mathrm{des} = k_\mathrm{d}\,\theta$. At equilibrium the two rates are equal,
$$
k_\mathrm{a}\,p\,(1 - \theta) = k_\mathrm{d}\,\theta
\qquad\Longrightarrow\qquad
\theta = \frac{(k_\mathrm{a}/k_\mathrm{d})\,p}{1 + (k_\mathrm{a}/k_\mathrm{d})\,p},
$$
which is the isotherm with $K = k_\mathrm{a}/k_\mathrm{d}$. The physics of the two constants is transparent: $k_\mathrm{a}$ carries the collision flux and the sticking probability (weakly $T$-dependent), while $k_\mathrm{d} = \nu\,e^{-E_\mathrm{des}/RT}$ is an Arrhenius escape from the adsorption well of depth $E_\mathrm{des}$. Hence $K \propto e^{(E_\mathrm{des} - 0)/RT}$ up to prefactors, and since $\Delta_\mathrm{ads} H = E_\mathrm{ads} - E_\mathrm{des} < 0$ (with $E_\mathrm{ads} \approx 0$ for molecular adsorption), $K$ falls with temperature exactly as the van 't Hoff equation demands.

**Chemical-potential derivation.** Treat the gas as ideal, $\mu_\mathrm{g} = \mu^\circ(T) + RT\ln(p/p^\circ)$, and the adsorbed layer as an ideal two-dimensional solution of occupied sites (fraction $\theta$) and empty sites (fraction $1 - \theta$), whose chemical potential is
$$
\mu_\mathrm{ads} = \mu_\mathrm{ads}^{\circ}(T) + RT\ln\frac{\theta}{1 - \theta}
$$
(the mixing entropy of placing molecules on sites gives the $\ln\theta/(1-\theta)$ term). Equilibrium requires $\mu_\mathrm{ads} = \mu_\mathrm{g}$:
$$
\ln\frac{\theta}{1 - \theta} = \ln\frac{p}{p^\circ} - \frac{\mu_\mathrm{ads}^{\circ} - \mu^{\circ}}{RT}
\qquad\Longrightarrow\qquad
\frac{\theta}{1 - \theta} = Kp,
\qquad
K = \frac{1}{p^\circ}\,e^{-(\mu_\mathrm{ads}^{\circ} - \mu^{\circ})/RT}.
$$
The two derivations agree because $K = k_\mathrm{a}/k_\mathrm{d}$ *is* the equilibrium constant of the step $\mathrm{A(g)} + * \rightleftharpoons \mathrm{A(ads)}$ (here and below $*$ denotes a free site), and the second form makes the van 't Hoff sign obvious: $\mu^\circ$ contains the enthalpy, and adsorption lowers it. Solving $\theta/(1-\theta) = Kp$ for $\theta$ gives the isotherm; writing $V = V_\mathrm{mon}\theta$ and rearranging gives $p/V = p/V_\mathrm{mon} + 1/(KV_\mathrm{mon})$, a straight line in $p$.
:::

::: widget plot
f: k*x/(1 + k*x)
x: 0, 10
y: 0, 1.05
sliders: k=1:0.1:10:0.1
labels: \text{Langmuir coverage } \theta
caption: The Langmuir isotherm $\theta = Kp/(1 + Kp)$ with the adsorption constant $K$ (in units inverse to the pressure axis) set by the slider. Every curve rises linearly at low $p$ with slope $K$, bends at $Kp = 1$ (where $\theta = \tfrac{1}{2}$ exactly), and flattens towards $\theta = 1$: saturation is not a detail, it is the shape. Raising $K$ (stronger binding, or lower temperature) moves the bend to lower pressure — the whole family is one curve stretched along the $\log p$ axis. The flattening tail is where zero-order surface chemistry lives.
:::

::: example Coverages from a Langmuir constant {#ex-langmuir-theta}
A gas adsorbs molecularly on a uniform surface with $K = 0.25\ \mathrm{kPa^{-1}}$ at $300\ \mathrm{K}$. Compute $\theta$ at $p = 1.0$, $5.0$ and $20\ \mathrm{kPa}$, and the pressure at which $\theta = 0.99$. Adsorption is exothermic with $\Delta_\mathrm{ads} H = -60\ \mathrm{kJ\,mol^{-1}}$: what are $K$ and $\theta(5.0\ \mathrm{kPa})$ at $350\ \mathrm{K}$?
::: solution
$\theta = Kp/(1 + Kp)$:
$$
\theta(1.0) = \frac{0.25}{1.25} = 0.20,
\qquad
\theta(5.0) = \frac{1.25}{2.25} = 0.56,
\qquad
\theta(20) = \frac{5.0}{6.0} = 0.83 .
$$
Invert the isotherm for the pressure: $p = \theta/[K(1 - \theta)]$, so
$$
p(\theta = 0.99) = \frac{0.99}{0.25 \times 0.01} = 3.96\times10^{2}\ \mathrm{kPa}.
$$
Ninety-nine per cent coverage costs a thousand times the pressure of fifty per cent — saturation is jealous of its last percent. For the temperature change, integrate the van 't Hoff equation between $300$ and $350\ \mathrm{K}$:
$$
\ln\frac{K(350)}{K(300)} = -\frac{\Delta_\mathrm{ads} H}{R}\left(\frac{1}{350} - \frac{1}{300}\right)
= \frac{60\,000}{8.314}\times\left(-4.762\times10^{-4}\right) = -3.44,
$$
so $K(350) = 0.25\,e^{-3.44} = 8.0\times10^{-3}\ \mathrm{kPa^{-1}}$ — a factor $31$ smaller — and
$$
\theta(5.0\ \mathrm{kPa},\,350\ \mathrm{K}) = \frac{0.040}{1.040} = 0.039 .
$$
A $50\ \mathrm{K}$ rise at fixed pressure strips the surface from $56\ \%$ to $4\ \%$ covered. This is why "the reaction stopped when we heated it" can be a *surface* saturation story, not a deactivation story, and why temperature-programmed desorption works at all.
:::
:::

::: example Extracting $K$ and the monolayer capacity from a linear plot {#ex-linear-fit}
Adsorption of a gas on $1\ \mathrm{g}$ of a catalyst at $298\ \mathrm{K}$ gives the amounts $V$ below. Test them against the Langmuir isotherm and extract $K$ and $V_\mathrm{mon}$.

| $p/\mathrm{kPa}$ | $5.0$ | $10.0$ | $20.0$ | $40.0$ |
|---|---|---|---|---|
| $V/(\mathrm{cm^{3}\,g^{-1}})$ (STP) | $50.0$ | $66.7$ | $80.0$ | $88.9$ |
::: solution
Form $p/V$ (units $\mathrm{kPa\,g\,cm^{-3}}$): $0.100$, $0.150$, $0.250$, $0.450$. Against $p$ these four points fall on a straight line — the Langmuir test — because $p/V = p/V_\mathrm{mon} + 1/(KV_\mathrm{mon})$. The slope through the extreme points is
$$
\text{slope} = \frac{0.450 - 0.100}{40.0 - 5.0} = \frac{0.350}{35.0} = 0.0100\ \mathrm{g\,cm^{-3}},
\qquad
V_\mathrm{mon} = \frac{1}{0.0100} = 1.00\times10^{2}\ \mathrm{cm^{3}\,g^{-1}},
$$
and the intercept (read at $p = 0$, or from any point: $0.100 - 0.0100 \times 5.0$) is $0.050 = 1/(K V_\mathrm{mon})$, so
$$
K = \frac{1}{0.050 \times 100} = 0.20\ \mathrm{kPa^{-1}} .
$$
Check: the predicted $V(40) = 100 \times 8/9 = 88.9$ — the middle points lie on the line too, so the linear form is self-consistent. A least-squares fit (the figure below) returns the same slope and intercept; note how the *linearisation changes the weighting of the errors* — points at low $p$ are amplified in $p/V$ — which is why modern work fits $V$ directly.
:::
:::

::: widget regression
points: 5,0.100; 10,0.150; 20,0.250; 40,0.450
degree: 1
x: 0, 45
y: 0, 0.5
caption: The Langmuir linearisation $p/V$ against $p$ for the data of the worked example: a straight line of slope $1/V_\mathrm{mon} = 0.0100$ and intercept $1/(KV_\mathrm{mon}) = 0.050$, from which $V_\mathrm{mon} = 100\ \mathrm{cm^{3}\,g^{-1}}$ and $K = 0.20\ \mathrm{kPa^{-1}}$. Drag the points and watch $R^{2}$ collapse — the linearity of this plot *is* the experimental content of the Langmuir model, and its failure (curvature upward at high $p$, or downward) is how you diagnose multilayers or heterogeneity.
:::

::: warning Zero order is evidence of saturation, not of a zero-order elementary step {#warn-zero-order}
You met zero-order reactions in [[kinetics/rate-laws]] and were warned that a zero order is never a molecularity — no elementary step has a rate independent of everything. On a surface the zero order has a mechanism: it is $\theta \rightarrow 1$. A gas reaction that is zero order in a reactant over decades of pressure is telling you that reactant owns the surface ($Kp \gg 1$) and the rate is set by what happens to the crowded adsorbed layer, not by how fast molecules arrive. The practical consequences are sharp: the rate is independent of that reactant's pressure (so raising it buys nothing), it is *inhibited* by anything else that adsorbs (competition for the shrinking pool of free sites), and it can switch to first order abruptly when the pressure drops enough for $Kp \sim 1$. Enzyme saturation kinetics is the same mathematics in solution; seeing $\theta = Kp/(1+Kp)$ behind a rate law is a transferable skill.
:::

## When the assumptions fail: Temkin and Freundlich

::: proposition Beyond Langmuir: the Temkin and Freundlich isotherms {#prop-beyond-langmuir}
**Temkin isotherm (interacting adsorbates).** If adsorbed species repel (or attract) each other, the heat of adsorption changes linearly with coverage, $\Delta_\mathrm{ads} H(\theta) = \Delta_\mathrm{ads} H^{\circ}(1 - g\theta)$, and the equilibrium constant acquires a mean-field factor, $K(\theta) = K^{\circ} e^{g\theta/RT}$ — that is, $\ln K$ varies linearly with $\theta$. Writing the equilibrium condition $\theta/(1-\theta) = K(\theta)\,p$ and taking the physically interesting intermediate range gives
$$
\theta \propto \ln\!\left(K^{\circ} p\right) :
$$
coverage grows only *logarithmically* with pressure, the signature of a surface whose sites get progressively harder to fill.

**Freundlich isotherm (heterogeneous sites).** For a surface of sites with a spread of binding energies, the empirical law
$$
\theta = k_\mathrm{F}\, p^{1/n} \qquad (n > 1)
$$
fits over limited pressure ranges. It is **empirical**: it has no saturation limit ($\theta \rightarrow \infty$ as $p \rightarrow \infty$, absurd), no molecular interpretation of $k_\mathrm{F}$ or $n$, and no temperature thermodynamics — but it is simple, and heterogeneous surfaces (oxides, carbons, real catalysts) obey it over two or three decades of pressure. A distribution of Langmuir sites with a suitable spread of $K$'s reproduces the Freundlich form, which is the honest way to read it.
:::

::: warning Temkin and Freundlich are repairs, not refinements of Langmuir {#warn-fixes}
It is tempting to line the three isotherms up as "Langmuir, then corrections". Resist: Langmuir is a *model* (sites, no interactions, one layer) whose parameters mean something; Freundlich is a *fitting function* whose parameters mean nothing on their own, and Temkin trades one assumption (no interactions) for another (a linear coverage-dependence of the energy). Fitting Freundlich to data and reporting "$n$ characterises the heterogeneity" is a category error unless a site-energy distribution has actually been measured. The diagnostic that matters is shape: Langmuir bends over to a plateau, Temkin keeps creeping logarithmically, Freundlich never stops rising. Which one your data follow over the pressure range you can reach is a statement about your surface, not about the elegance of the equations.
:::

## Multilayers and surface area: the BET isotherm

Chemisorption stops at one monolayer; physisorption does not, and the multilayer is the basis of the most-used measurement in all of catalyst and materials science.

::: proposition The BET isotherm {#prop-bet}
Brunauer, Emmett and Teller (1938) let the Langmuir model stack: (i) the surface carries $N_\mathrm{s}$ sites; (ii) layers grow one by one — a molecule adsorbs on layer $i$ only if layer $i-1$ is complete there — and *each layer* obeys its own Langmuir equilibrium; (iii) the first layer feels the solid with enthalpy $\Delta_\mathrm{ads} H_1$, every higher layer feels only its neighbours, so $\Delta_\mathrm{ads} H_{i\ge 2} = \Delta_\mathrm{vap} H$ (condensation); (iv) no lateral interactions. Summing the resulting series gives the **BET isotherm**, almost always used in its linear form with $x = p/p^\circ$ (relative pressure):
$$
\frac{x}{V(1 - x)} = \frac{1}{V_\mathrm{m} C} + \frac{C - 1}{V_\mathrm{m} C}\,x,
\qquad
C = e^{-(\Delta_\mathrm{ads} H_1 - \Delta_\mathrm{vap} H)/RT} \gg 1,
$$
where $V_\mathrm{m}$ is the monolayer capacity and $C$ measures how much the first layer is favoured over condensation. A plot of $x/[V(1-x)]$ against $x$ is a straight line; slope $+$ intercept $= 1/V_\mathrm{m}$, and $C = (\text{slope}/\text{intercept}) + 1$. The standard measurement — a **measurement technique**, not a reaction — is adsorption of $\mathrm{N_2}$ at $\mathrm{77\ K}$ (liquid nitrogen), fitted over $x = 0.05$–$0.35$, with the molecular area $\sigma(\mathrm{N_2}) = 0.162\ \mathrm{nm^{2}}$:
$$
S = \frac{V_\mathrm{m} N_\mathrm{A} \sigma}{V_\mathrm{m}^\text{(gas)}}\,,
$$
where $V_\mathrm{m}^{\text{(gas)}} = 22\,414\ \mathrm{cm^{3}\,mol^{-1}}$ at STP converts the monolayer volume to moles.
:::

::: widget plot
f: (1 + (c - 1)*x)/(vm*c)
x: 0, 0.9
y: 0, 0.02
sliders: vm=120:50:200:10; c=20:5:300:5
labels: \text{BET linear form}
caption: The BET linear form $x/[V(1-x)] = [1 + (C-1)x]/(V_\mathrm{m}C)$ against relative pressure $x = p/p^\circ$, for monolayer capacity $V_\mathrm{m}$ and affinity parameter $C$ set by the sliders. The plot is linear by construction — that is the whole trick — with slope $+$ intercept $= 1/V_\mathrm{m}$; large $C$ (strong first-layer binding, the usual case for $\mathrm{N_2}$ on oxides at $77\ \mathrm{K}$) pushes the curve's curvature into the region $x > 0.4$ that the method deliberately ignores.
:::

::: example A BET surface area {#ex-bet}
Adsorption of $\mathrm{N_2}$ on $1.00\ \mathrm{g}$ of an oxide catalyst at $77\ \mathrm{K}$ ($p^\circ = 101.3\ \mathrm{kPa}$) gives:

| $p/p^\circ$ | $0.050$ | $0.100$ | $0.200$ | $0.300$ |
|---|---|---|---|---|
| $V/(\mathrm{cm^{3}\,g^{-1}})$ (STP) | $109.0$ | $124.0$ | $145.2$ | $168.2$ |

Find $V_\mathrm{m}$, $C$ and the specific surface area.
::: solution
Compute $y = x/[V(1 - x)]$ at each point:
$$
y = 4.83\times10^{-4},\ 8.96\times10^{-4},\ 1.722\times10^{-3},\ 2.549\times10^{-3}.
$$
Against $x$ these are a straight line (the differences confirm it: $\Delta y/\Delta x$ is constant to three figures). The slope from the extremes is
$$
\text{slope} = \frac{(2.549 - 0.483)\times10^{-3}}{0.300 - 0.050} = 8.26\times10^{-3},
\qquad
\text{intercept} = 4.83\times10^{-4} - 0.050 \times 8.26\times10^{-3} = 7.0\times10^{-5},
$$
so
$$
V_\mathrm{m} = \frac{1}{\text{slope} + \text{intercept}} = \frac{1}{8.33\times10^{-3}} = 1.20\times10^{2}\ \mathrm{cm^{3}\,g^{-1}},
\qquad
C = \frac{8.26\times10^{-3}}{7.0\times10^{-5}} + 1 \approx 1.2\times10^{2}.
$$
$C \approx 120$ is typical of $\mathrm{N_2}$ on oxides (the first layer binds far more strongly than condensation), and $C > 1$ with a linear plot is the quality check the method demands. The area follows from the number of molecules in one monolayer:
$$
S = \frac{120\ \mathrm{cm^{3}\,g^{-1}}}{22\,414\ \mathrm{cm^{3}\,mol^{-1}}} \times 6.022\times10^{23}\ \mathrm{mol^{-1}} \times 0.162\times10^{-18}\ \mathrm{m^{2}}
= 5.22\times10^{2}\ \mathrm{m^{2}\,g^{-1}} .
$$
One gram of this powder presents half a thousand square metres — a football pitch of surface per gram, which is why supported catalysts are powders and why $S$ is the first number on any catalyst datasheet. Three figures are carried because $V$ is quoted to four; the honest uncertainty of the BET method itself is a few per cent.
:::
:::

## Reactions between adsorbed species: Langmuir–Hinshelwood kinetics

::: definition Langmuir–Hinshelwood and Eley–Rideal mechanisms {#def-lh-er}
Consider a bimolecular surface reaction $\mathrm{A + B \rightarrow P}$. Two limiting mechanisms compete:

- **Langmuir–Hinshelwood (LH):** *both* reactants adsorb, diffuse as mobile adsorbed species (often fed by a physisorbed **precursor state**), and react with each other *while both are on the surface*: $\mathrm{A(ads) + B(ads) \rightarrow P + 2\,*}$. The rate is proportional to the probability of finding A and B adjacent, $v \propto \theta_\mathrm{A}\theta_\mathrm{B}$.
- **Eley–Rideal (ER):** one reactant adsorbs; the other reacts *directly from the gas phase* (or from a loosely held precursor) on striking it: $\mathrm{A(g) + B(ads) \rightarrow P + *}$. The rate is $v \propto p_\mathrm{A}\,\theta_\mathrm{B}$, and a hot, dilute gas beam can sustain it.

The two are distinguished experimentally by the pressure dependence: ER rates grow with the gas-phase pressure of the attacking species without limit, LH rates are throttled by site competition and pass through maxima. Many real reactions sit between the limits, with "hot atom" and precursor-mediated channels contributing.
:::

::: proposition The Langmuir–Hinshelwood rate law and site competition {#prop-lh-rate}
For molecular adsorption of both reactants on the same sites, with a surface reaction step of rate constant $k$ rate-determining,
$$
v = k\,\theta_\mathrm{A}\theta_\mathrm{B}
= \frac{k\,K_\mathrm{A} K_\mathrm{B}\,p_\mathrm{A} p_\mathrm{B}}{\left(1 + K_\mathrm{A}p_\mathrm{A} + K_\mathrm{B}p_\mathrm{B}\right)^{2}} .
$$
The denominator is the site-competition factor: every species that adsorbs steals sites from every other. The consequences are the reason LH kinetics explains so much industrial behaviour:

- **Inhibition by strong adsorption.** If B binds much more strongly than A ($K_\mathrm{B}p_\mathrm{B} \gg 1 + K_\mathrm{A}p_\mathrm{A}$), then $v \approx k\,(K_\mathrm{A}/K_\mathrm{B})\,p_\mathrm{A}/p_\mathrm{B}$: *first order in the weakly adsorbed reactant, inverse (negative) order in the strongly adsorbed one*. Adding more B slows the reaction — B poisons its own reaction.
- **A maximum in the rate.** With A weakly held, $v$ passes through a maximum in $p_\mathrm{B}$ at $K_\mathrm{B}p_\mathrm{B} = 1$ (proved below): optimum operation sits at half-covering B, not at saturating it.
- **The classic:** CO oxidation on platinum, $\mathrm{CO + \tfrac{1}{2}O_2 \rightarrow CO_2}$, where CO adsorbs far more strongly than oxygen (which needs *two* adjacent free sites to dissociate). At low temperature and high CO pressure the surface is CO-saturated and nearly dead — the self-poisoning that makes a cold car exhaust pollute; the light-off of a catalytic converter is the temperature at which CO coverage drops enough for oxygen to get on.
:::

::: proof The LH maximum sits at $K_\mathrm{B} p_\mathrm{B} = 1$ when A is weakly adsorbed {#proof-lh-max}
Let A adsorb weakly, $K_\mathrm{A}p_\mathrm{A} \ll 1$, so $\theta_\mathrm{A} \approx K_\mathrm{A}p_\mathrm{A}$ is essentially fixed and the competition is B against empty sites only:
$$
v \propto \theta_\mathrm{B} \cdot \text{const} \times \theta_\mathrm{A}
\propto \frac{K_\mathrm{B}p_\mathrm{B}}{\left(1 + K_\mathrm{B}p_\mathrm{B}\right)^{2}} .
$$
(The square: one factor $K_\mathrm{B}p_\mathrm{B}$ from $\theta_\mathrm{B}$, one from $\theta_\mathrm{A} \propto \theta_* = 1/(1 + K_\mathrm{B}p_\mathrm{B})$.) Write $x = K_\mathrm{B}p_\mathrm{B}$ and differentiate $f(x) = x/(1+x)^{2}$:
$$
f'(x) = \frac{(1+x)^{2} - x\cdot 2(1+x)}{(1+x)^{4}} = \frac{1 - x}{(1+x)^{3}},
$$
which vanishes only at $x = 1$ and changes sign there from $+$ to $-$: a maximum at
$$
K_\mathrm{B}\,p_\mathrm{B} = 1
\qquad\Longleftrightarrow\qquad
\theta_\mathrm{B} = \tfrac{1}{2}.
$$
The maximum rate is $f(1) = \tfrac{1}{4}$ of the product of the two saturation limits, and $f$ is symmetric in $\log x$ about the peak: $f(1/x) = f(x)$, so the rate at $K_\mathrm{B}p_\mathrm{B} = \tfrac{1}{2}$ equals the rate at $K_\mathrm{B}p_\mathrm{B} = 2$. Half a monolayer of B is the best of all worlds: enough B to react, enough empty sites for A to get on.
:::

::: widget plot
f: ka*kb*x/((1 + ka*pa + kb*x)^2)
x: 0, 10
y: 0, 0.3
sliders: ka=0.2:0.05:2:0.05; kb=1:0.1:5:0.1; pa=1:0.1:5:0.1
labels: \text{LH rate } v/k
caption: The Langmuir–Hinshelwood rate $v/k = K_\mathrm{A}K_\mathrm{B}p_\mathrm{A}p_\mathrm{B}/(1 + K_\mathrm{A}p_\mathrm{A} + K_\mathrm{B}p_\mathrm{B})^{2}$ against $p_\mathrm{B}$, with $K_\mathrm{A}$, $K_\mathrm{B}$ and $p_\mathrm{A}$ on sliders. With $K_\mathrm{A}p_\mathrm{A} \ll 1$ the curve rises linearly, peaks at $K_\mathrm{B}p_\mathrm{B} = 1$, then falls as $1/p_\mathrm{B}$ — negative order in a reactant, drawn from a mechanism. Slide $K_\mathrm{A}p_\mathrm{A}$ upward and watch the peak shrink and shift: A and B are rivals for the same seats, and the volcano is not in the chemistry, it is in the bookkeeping of sites.
:::

::: example Where does the CO-oxidation maximum fall? {#ex-lh-max}
For CO oxidation on a platinum surface at a certain temperature, take $K_\mathrm{CO} = 2.0\ \mathrm{kPa^{-1}}$ and treat oxygen as the weakly adsorbed reactant held at fixed $p_{\mathrm{O_2}}$. At what $p_\mathrm{CO}$ is the rate maximal, and what fraction of the maximum rate is lost at $p_\mathrm{CO} = 0.10$ and at $5.0\ \mathrm{kPa}$?
::: solution
With CO the strongly adsorbed species, the maximum is at $K_\mathrm{CO}\,p_\mathrm{CO} = 1$:
$$
p_\mathrm{CO}^{*} = \frac{1}{2.0\ \mathrm{kPa^{-1}}} = 0.50\ \mathrm{kPa}.
$$
The reduced rate is $f(x) = x/(1+x)^{2}$ with $x = K_\mathrm{CO}p_\mathrm{CO}$, and $f(1) = 0.25$. At $p_\mathrm{CO} = 0.10\ \mathrm{kPa}$, $x = 0.20$:
$$
\frac{v}{v_\mathrm{max}} = \frac{0.20/1.44}{0.25} = \frac{0.139}{0.25} = 0.56 ;
$$
at $5.0\ \mathrm{kPa}$, $x = 10$:
$$
\frac{v}{v_\mathrm{max}} = \frac{10/121}{0.25} = \frac{0.0826}{0.25} = 0.33 .
$$
Five times the optimum CO pressure gives a third of the rate — self-poisoning costs. Note also the log-symmetry: $0.25\ \mathrm{kPa}$ ($x = 0.5$) and $1.0\ \mathrm{kPa}$ ($x = 2$) give identical rates — a diagnostic when fitting data.
:::
:::

::: definition The Sabatier principle {#def-sabatier}
Sabatier's principle (1912): the best catalyst binds the reactant *neither too strongly nor too weakly*. Too weakly ($K \ll 1$) the surface is empty — no reactant is activated; too strongly ($K \rightarrow \infty$) the surface is dead — the adsorbate cannot move, cannot meet a partner, and cannot desorb as product. Between the two limits of the LH rate law lies an optimum, and plotting activity against a binding-energy proxy gives the **volcano curve** whose apex marks the ideal catalyst. The principle is not a theorem but it organises heterogeneous catalysis: Pt sits near the apex for hydrogenation and CO oxidation; sulfur binds to nearly everything too well and is therefore a universal poison; noble metals bind too weakly for some bond activations and are superb for others.
:::

::: example The rate law of ammonia decomposition on tungsten {#ex-nh3}
Ammonia decomposes on hot tungsten, $\mathrm{2\,NH_3 \rightarrow N_2 + 3\,H_2}$, and over much of the industrial range the observed rate law is
$$
v = k_\text{obs}\,\frac{p_\mathrm{NH_3}}{p_\mathrm{H_2}^{1/2}} .
$$
Propose an LH mechanism and derive it.
::: solution
Take three quasi-equilibrated or slow steps:

1. Molecular adsorption of ammonia, fast equilibrium: $\mathrm{NH_3(g)} + * \rightleftharpoons \mathrm{NH_3(ads)}$, with $K_1 = \theta_\mathrm{NH_3}/(p_\mathrm{NH_3}\,\theta_*)$.
2. Dissociative adsorption of hydrogen (the product), fast equilibrium: $\mathrm{H_2(g)} + 2\,* \rightleftharpoons 2\,\mathrm{H(ads)}$, with $\theta_\mathrm{H} = (K_2 p_\mathrm{H_2})^{1/2}\,\theta_*$ (dissociation onto pairs of sites — see the exercises).
3. Rate-determining surface conversion of adsorbed ammonia (N–H scission cascading to $\mathrm{N_2}$): $\mathrm{NH_3(ads)} \rightarrow$ products, $v = k\,\theta_\mathrm{NH_3}$.

From (1), $v = k K_1 p_\mathrm{NH_3}\,\theta_*$. The site balance is $\theta_\mathrm{NH_3} + \theta_\mathrm{H} + \theta_* = 1$; ammonia decomposition is strongly inhibited by hydrogen, so the surface is H-covered, $\theta_\mathrm{H} \gg \theta_\mathrm{NH_3}, \theta_*$, and
$$
\theta_* \approx \frac{1}{1 + (K_2 p_\mathrm{H_2})^{1/2}} \approx (K_2 p_\mathrm{H_2})^{-1/2}.
$$
Therefore
$$
v = k K_1\,p_\mathrm{NH_3}\,(K_2 p_\mathrm{H_2})^{-1/2}
= \underbrace{k K_1 K_2^{-1/2}}_{k_\text{obs}}\;\frac{p_\mathrm{NH_3}}{p_\mathrm{H_2}^{1/2}} .
$$
The half-order in hydrogen is *dissociative adsorption speaking*; the inhibition is site competition speaking; the first order in ammonia is the low-coverage limit of ammonia itself. At low $p_\mathrm{H_2}$ (or high temperature) the H blanket lifts, $\theta_* \rightarrow 1$, and the rate crosses over to $v = kK_1p_\mathrm{NH_3}/(1 + K_1p_\mathrm{NH_3})$ — first order in ammonia at low pressure, zero order when the surface saturates with ammonia. One mechanism, three observed orders, no coincidence.
:::
:::

::: quiz
CO oxidation on Pt follows the Langmuir–Hinshelwood rate law with CO much more strongly adsorbed than oxygen. Why does the rate *fall* when the CO pressure is raised well past the maximum?
- [x] CO fills the surface, and oxygen — which needs two adjacent free sites to dissociate — can no longer adsorb, so $\theta_\mathrm{O}$ collapses and $v \propto \theta_\mathrm{CO}\theta_\mathrm{O}$ falls.
- [ ] CO reacts with $\mathrm{CO_2}$ to reform $\mathrm{CO}$, cancelling the product.
- [ ] The activation energy of the surface step increases with CO pressure.
- [ ] High CO pressure shifts the adsorption equilibrium of oxygen to the gas phase by Le Chatelier's principle.
::: solution
The rate needs *both* partners on the surface. Past the maximum, $K_\mathrm{CO}p_\mathrm{CO} \gg 1 + K_\mathrm{O}p_\mathrm{O}$, so $\theta_\mathrm{CO} \rightarrow 1$ and $\theta_* \rightarrow 0$: oxygen dissociation (a two-site step, even more starved of free sites than the one-site approximation suggests) shuts down and $v \approx k(K_\mathrm{O}/K_\mathrm{CO})\,p_\mathrm{O}/p_\mathrm{CO}$ — inverse order in CO. Nothing happens to the activation energy (option 3); Le Chatelier (option 4) describes equilibria, not the rate of a driven reaction; option 1 is site competition, the whole content of the LH denominator.
:::
:::

## The catalytic cycle, promoters and poisons: Haber–Bosch

::: definition Turnover frequency {#def-tof}
The **turnover frequency** (TOF) is the number of product molecules formed per active site per unit time, $\mathrm{s^{-1}}$ — the catalytic analogue of the rate constant, and the only honest way to compare catalysts of different dispersion. A rate $R$ (moles per second) over $n_\text{sites}$ moles of surface sites is $\mathrm{TOF} = R/n_\text{sites}$; typical industrial TOFs are $10^{-2}$–$10^{2}\ \mathrm{s^{-1}}$. The **heterogeneous catalytic cycle** closes the bookkeeping: (i) *adsorb* the reactants (usually with dissociation — $\mathrm{H_2}$, $\mathrm{N_2}$, $\mathrm{O_2}$ all split); (ii) *react* between neighbours on the surface (LH); (iii) *desorb* the product, regenerating the site. A catalyst that fails at (iii) is a sponge, not a catalyst — the Sabatier principle applies to products as much as to reactants.
:::

The industrial test case for all of this is ammonia synthesis, $\mathrm{N_2 + 3\,H_2 \rightleftharpoons 2\,NH_3}$ — the Haber process (Fritz Haber, 1909) scaled by Carl Bosch's high-pressure engineering (BASF, 1913), today the largest chemical process by mass. Textbook-level description: the reactor runs over a **fused iron catalyst** — magnetite reduced in situ to a porous, high-surface-area $\alpha$-Fe sponge (a few $\mathrm{m^{2}\,g^{-1}}$ of exposed metal per gram of catalyst, its area measured exactly as in the BET example above) — promoted with $\mathrm{K_2O}$ (electronic promoter) and $\mathrm{Al_2O_3}$ and $\mathrm{CaO}$ (structural promoters), at roughly $400$–$500\,^\circ\mathrm{C}$ and $150$–$300\ \mathrm{bar}$, with the product condensed and the unreacted gas recycled because the equilibrium is unfavourable at the temperatures the kinetics demand.

Why this recipe? The isotherm and LH logic answers each ingredient:

- **Why iron, and why is $\mathrm{N_2}$ dissociation rate-limiting?** The $\mathrm{N{\equiv}N}$ bond ($945\ \mathrm{kJ\,mol^{-1}}$) is the strongest bond in industrial chemistry; on Fe it dissociates — the first step of the cycle — and every other step (H addition to N, NH, NH₂, NH₃) is fast by comparison. The rate law of the working catalyst carries the signature: approximately $v \approx k\,p_{\mathrm{N_2}}\,(p_{\mathrm{H_2}}^{3/2}/p_\mathrm{NH_3})^{\alpha}$ with $\alpha \approx 0.5$–$1$, i.e. *inverse* order in ammonia — product inhibition by adsorbed N and H competing for sites, exactly the LH denominator.
- **Why the promoters?** Potassium donates electron density to the iron, feeding back-donation into the $2\pi^{*}$ orbital of adsorbed $\mathrm{N_2}$ and lowering the barrier of the rate-limiting dissociation — a Sabatier nudge towards the top of the volcano. Alumina and lime hold the reduced iron crystallites apart so the surface area survives $500\,^\circ\mathrm{C}$ for years: they protect the site *count*, potassium the site *quality*.
- **Why the poisons?** Sulfur compounds bind to iron with chemisorption enthalpies far above those of $\mathrm{N_2}$ or $\mathrm{H_2}$: one $\mathrm{H_2S}$ molecule per several hundred surface atoms suffices to block sites essentially irreversibly, because $K_\mathrm{S}p_\mathrm{S} \gg 1$ at every operating pressure — the Langmuir competition is a monopoly. Feed gas is therefore hydrodesulfurised to sub-ppm sulfur before the converter. **Hazard note:** $\mathrm{H_2S}$ is a flammable gas, acutely toxic (it inhibits cytochrome c oxidase, the same terminal oxidase cyanide blocks; GHS: flammable gas category 2, acute toxic gas category 2), and sulfur-containing feedstocks are handled only with gas detection and fume extraction.

Selectivity, finally, is where surfaces beat their homogeneous counterparts: a surface can only hold a molecule in the geometries the sites allow, so it activates *the bond that binds* (C–H on one face, N≡N end-on) and pairs only *adjacent* adsorbates (the LH $\theta_\mathrm{A}\theta_\mathrm{B}$ is a selectivity filter as much as a rate law). Homogeneous catalysts tune electronics; surfaces tune electronics *and* geometry — the ensemble of neighbouring atoms — and that second dial is why zeolites, alloys and single-atom catalysts exist.

::: history
Irving **Langmuir** built his isotherm and the theory of unimolecular evaporation from surfaces at the General Electric laboratory (the 1916 paper "The constitution and fundamental properties of solids and liquids"), and received the 1932 Nobel Prize in Chemistry for the work — the first Nobel awarded for surface chemistry. Paul **Sabatier**, with Jean-Baptiste Senderens, had shown around 1900 that ethylene is hydrogenated by nickel *without the nickel being consumed*, introducing the adsorption-compound idea behind the 1912 Nobel Prize. Fritz **Haber** demonstrated catalytic ammonia synthesis in 1909 and Carl **Bosch** industrialised it by 1913 (Nobel Prizes 1918 and 1931). Hugh S. **Taylor** proposed in 1925 that chemisorption runs through adsorbed intermediates at "active centres" — his "super-moles" anticipated the modern idea that a catalyst surface is a patchwork of sites of different reactivity. Cyril **Hinshelwood** (Nobel 1956, with Semyonov) developed the kinetics of surface reactions, including the oxidation of CO, whose rate law with **Prutton** (1929) is an early LH analysis. Stephen **Brunauer**, **Emmett** and Edward **Teller** published the BET theory of multilayer adsorption and surface area in 1938, and Gerhard **Ertl** received the 2007 Nobel Prize for the molecular-level picture of synthesis gas chemistry on metals that completed the programme Langmuir began.
:::

## Watching the surface: TPD, LEED and STM

Surface science answers three questions with three tools. **Temperature-programmed desorption (TPD)**: cover the surface at low temperature, heat it linearly, and watch what desorbs and when — the peak temperature measures the desorption activation energy (stronger binding desorbs later), the peak area measures coverage, and a family of heating rates measures the pre-exponential; TPD is how $E_\mathrm{des}$, the depth of the chemisorption well, is actually tabulated. **Low-energy electron diffraction (LEED)**: diffract $\sim 100\ \mathrm{eV}$ electrons (whose inelastic mean free path is only a few atomic layers, so only the topmost layers scatter) to read the two-dimensional symmetry and reconstruction of the adsorbate overlayer. **Scanning tunnelling microscopy (STM)**: pass an atomically sharp tip a fraction of a nanometre above the surface and image the tunnelling current, which depends exponentially on gap — atomic-resolution real-space pictures of adsorbates, defects and reactions in progress, available since Binnig and Rohrer (1981, Nobel 1986) and the workhorse of Ertl's ammonia studies. Together they turned the isotherm's abstract $\theta$ into counted atoms.

## Where this leads

The Langmuir denominator you have now seen three times — in isotherms, in LH rates, in Haber kinetics — is the surface version of a general mechanism argument, and it reappears, with the same algebra, in enzyme saturation and in [[kinetics/homogeneous-catalysis]], where the "sites" are metal complexes and the competition is for the coordination sphere. The steady-state and pre-equilibrium bookkeeping used on the NH₃ mechanism is [[kinetics/reaction-mechanisms]] applied to adsorbates; the collision flux behind the monolayer clock is [[kinetics/collision-theory]]; and the chain chemistry of radical surfaces (halogenation, combustion on walls) joins this chapter's site kinetics to [[kinetics/chain-reactions]]. The modern continuation — state-resolved scattering from surfaces, femtochemistry of bond breaking, the density-functional theory that computes $K$ and $E_\mathrm{des}$ from first principles — is [[kinetics/reaction-dynamics]], and the photochemistry of excited surfaces and semiconductors is [[kinetics/photochemistry]].

::: summary
- Surfaces react because surface atoms are coordinatively unsaturated; **physisorption** (van der Waals, $-5$ to $-40\ \mathrm{kJ\,mol^{-1}}$, non-specific, multilayer-capable) and **chemisorption** (chemical bond, $-50$ to $-400\ \mathrm{kJ\,mol^{-1}}$, specific, often dissociative, monolayer only) are the two wells.
- The **Langmuir isotherm** $\theta = Kp/(1+Kp)$ follows from site balance and equilibrium (two ways: rates or chemical potentials); it is first order at low $p$, zero order (saturated) at high $p$, and $K$ falls with temperature because adsorption is exothermic.
- Zero order in a gas reactant is evidence of a saturated surface, never of a zero-order elementary step; the apparent order slides through $\tfrac{1}{2}$ at $Kp = 1$.
- **Temkin** (interactions: $\ln K$ linear in $\theta$, logarithmic isotherm) and **Freundlich** (heterogeneity: $\theta \propto p^{1/n}$, empirical, no saturation) repair Langmuir's failures; they are models of different physics, not refinements of one law.
- **BET** stacks Langmuir layers: the linear plot $x/[V(1-x)]$ vs $x$ gives $V_\mathrm{m}$ and $C$, and with $\mathrm{N_2}$ at $77\ \mathrm{K}$ ($\sigma = 0.162\ \mathrm{nm^{2}}$) the specific surface area — the standard $S$ of catalyst science.
- **Langmuir–Hinshelwood** kinetics ($v \propto \theta_\mathrm{A}\theta_\mathrm{B}$) produces inhibition, negative orders and a rate maximum at $K_\mathrm{B}p_\mathrm{B} = 1$; **Eley–Rideal** (gas attacks the adsorbate) lacks the maximum. CO oxidation on Pt is the classic; the **Sabatier principle** (bind neither too strongly nor too weakly) is the volcano behind it.
- NH₃ on W gives $v = k\,p_\mathrm{NH_3}/p_\mathrm{H_2}^{1/2}$: half orders from dissociative adsorption, inhibition from site competition — orders are mechanism, read through the isotherm.
- The catalytic cycle (adsorb–react–desorb) with TOF as its rate; Haber–Bosch iron, K and oxide promoters, and sulfur poisoning are the industrial grammar of everything above.
:::

## Exercises

::: exercise Coverage from a Langmuir constant {level=1 check="0.667"}
A gas adsorbs molecularly with $K = 0.80\ \mathrm{kPa^{-1}}$ at $300\ \mathrm{K}$. What is the fractional coverage $\theta$ at $p = 2.5\ \mathrm{kPa}$? (Enter $\theta$, dimensionless.)
::: solution
$\theta = Kp/(1 + Kp) = (0.80 \times 2.5)/(1 + 0.80 \times 2.5) = 2.0/3.0 = 0.667$. The surface is two-thirds covered, and a third of the sites remain free for reaction.
:::
:::

::: exercise Monolayer growth time {level=1 check="3.5"}
The flux of $\mathrm{O_2}$ on a cold surface at a certain pressure is $2.87\times10^{18}\ \mathrm{m^{-2}\,s^{-1}}$ and the site density is $1.0\times10^{19}\ \mathrm{m^{-2}}$. If every collision sticks, how long to grow one monolayer? (Enter the time in seconds.)
::: solution
$t = (1.0\times10^{19})/(2.87\times10^{18}) = 3.5\ \mathrm{s}$. If the sticking probability were $0.10$ the time would be ten times longer — $t_\mathrm{ML} = \theta_{\text{target}} N_\text{sites}/(s Z_\mathrm{W})$ is the working form.
:::
:::

::: exercise Saturation at high pressure {level=1 check="0.857"}
For $K = 1.5\ \mathrm{kPa^{-1}}$, what is $\theta$ at $p = 4.0\ \mathrm{kPa}$? (Enter $\theta$.)
::: solution
$Kp = 6.0$, $\theta = 6.0/7.0 = 0.857$. Note the pressure is well past the half-coverage point ($p_{1/2} = 1/K = 0.67\ \mathrm{kPa}$) yet the last $14\ \%$ of the monolayer still costs six more half-coverage pressures — the flattening of the isotherm in action.
:::
:::

::: exercise Two coverages, one isotherm {level=2 check="0.086"}
Adsorption data give $\theta = 0.30$ at $p = 5.0\ \mathrm{kPa}$ and $\theta = 0.75$ at $p = 35.0\ \mathrm{kPa}$, at $298\ \mathrm{K}$. Show they are consistent with a Langmuir isotherm and extract $K$; if $V = 15.0\ \mathrm{cm^{3}\,g^{-1}}$ (STP) at the first point, find $V_\mathrm{mon}$. (Enter $K$ in $\mathrm{kPa^{-1}}$.)
::: solution
Linearise as $\theta/(1 - \theta) = Kp$: the two points give $K = \dfrac{0.30/0.70}{5.0} = 0.0857$ and $K = \dfrac{0.75/0.25}{35.0} = 0.0857\ \mathrm{kPa^{-1}}$ — identical to three figures, so the two-point Langmuir test passes. $K = 0.086\ \mathrm{kPa^{-1}}$, and $V_\mathrm{mon} = V/\theta = 15.0/0.30 = 50.0\ \mathrm{cm^{3}\,g^{-1}}$. (Consistency check on the second point: $50.0 \times 0.75 = 37.5\ \mathrm{cm^{3}\,g^{-1}}$.)
:::
:::

::: exercise Heating a covered surface {level=2 check="0.029"}
$K = 0.50\ \mathrm{kPa^{-1}}$ at $300\ \mathrm{K}$ and $\Delta_\mathrm{ads} H = -50\ \mathrm{kJ\,mol^{-1}}$. What is $K$ at $350\ \mathrm{K}$, and what is $\theta$ at $p = 10\ \mathrm{kPa}$ there? (Enter $K$ in $\mathrm{kPa^{-1}}$.)
::: solution
$\ln[K(350)/K(300)] = -(\Delta_\mathrm{ads} H/R)(1/350 - 1/300) = (50\,000/8.314)(-4.762\times10^{-4}) = -2.86$, so $K(350) = 0.50\,e^{-2.86} = 0.029\ \mathrm{kPa^{-1}}$ — seventeen times smaller. Then $\theta = 0.29/1.29 = 0.22$: the same $10\ \mathrm{kPa}$ that covered $83\ \%$ of the surface at $300\ \mathrm{K}$ covers only $22\ \%$ at $350\ \mathrm{K}$. Desorption on heating is the van 't Hoff equation, not a leak.
:::
:::

::: exercise Position and cost of an LH maximum {level=2 check="0.25"}
A reaction follows LH kinetics with the strongly adsorbed reactant B having $K_\mathrm{B} = 4.0\ \mathrm{kPa^{-1}}$ and A weakly adsorbed. At what $p_\mathrm{B}$ is the rate maximal? What is $v/v_\mathrm{max}$ at $p_\mathrm{B} = 0.050\ \mathrm{kPa}$? (Enter the pressure in kPa.)
::: solution
Maximum at $K_\mathrm{B}p_\mathrm{B} = 1$: $p_\mathrm{B} = 1/4.0 = 0.25\ \mathrm{kPa}$. At $0.050\ \mathrm{kPa}$, $x = K_\mathrm{B}p_\mathrm{B} = 0.20$ and $v/v_\mathrm{max} = [x/(1+x)^{2}]/(1/4) = 0.1389/0.25 = 0.56$: a five-fold pressure deficit from the optimum costs less than half the rate — the low-pressure side of the volcano is forgiving, and by the log-symmetry the same $56\ \%$ is found at $x = 5$ ($p_\mathrm{B} = 1.25\ \mathrm{kPa}$).
:::
:::

::: exercise The dissociative isotherm and a half order {level=3}
Adsorption of $\mathrm{H_2}$ requires a *pair* of sites: $\mathrm{H_2(g)} + 2\,* \rightleftharpoons 2\,\mathrm{H(ads)}$. Derive the dissociative Langmuir isotherm $\theta = (Kp)^{1/2}/[1 + (Kp)^{1/2}]$, and then derive the rate law for an LH reaction between adsorbed H and a molecularly adsorbed species A on the same sites when hydrogen saturates the surface. What are the reaction orders in A and in $\mathrm{H_2}$?
::: solution
Equilibrium with $\theta$ the H-atom coverage: the adsorption rate $\propto p\,\theta_*^{2}$ (two sites needed) balances desorption $\propto \theta^{2}$, so $\theta/\theta_* = (Kp)^{1/2}$ and with $\theta_* = 1 - \theta$ (ignoring A) the isotherm follows. Now LH: $v = k\theta_\mathrm{A}\theta_\mathrm{H}$ with $\theta_\mathrm{A} = K_\mathrm{A}p_\mathrm{A}\theta_*$ and, for H dominant, $\theta_* \approx (Kp_\mathrm{H_2})^{-1/2}$. Then
$$
v = k\,K_\mathrm{A}p_\mathrm{A}\,\theta_* \cdot \theta_\mathrm{H} \approx k\,K_\mathrm{A}p_\mathrm{A}\,(Kp_\mathrm{H_2})^{-1/2},
$$
using $\theta_\mathrm{H} \approx 1$. The order in A is $+1$ (it is dilute, so its coverage is proportional to its pressure); the order in hydrogen is $-\tfrac{1}{2}$ — an *inverse* half order: hydrogen saturates the surface, and every extra molecule of it evicts A from the sites. Half orders in surface kinetics are dissociative adsorption leaving its fingerprint on the site balance; a negative half order says the same fingerprint is smothering the reaction.
:::
:::

::: exercise Apparent order and apparent activation energy on a Langmuir surface {level=3}
A unimolecular surface reaction has rate $v = k\theta$ with $k = A e^{-E_\mathrm{a}/RT}$ and Langmuir $\theta = Kp/(1 + Kp)$. (a) Show the apparent order in pressure is $n_\text{app} = \mathrm{d}\ln v/\mathrm{d}\ln p = 1/(1 + Kp)$ and find where it equals $\tfrac{1}{2}$. (b) Show the apparent activation energy is $E_\text{app} = E_\mathrm{a} + \Delta_\mathrm{ads} H/(1 + Kp)$ and give both limits. Why can a surface reaction's measured $E_\mathrm{a}$ be *smaller* than the elementary step's barrier?
::: solution
(a) $\ln v = \ln k + \ln K + \ln p - \ln(1 + Kp)$. Differentiating with respect to $\ln p$ at fixed $T$: $n_\text{app} = 1 - Kp/(1 + Kp) = 1/(1 + Kp)$. It equals $\tfrac{1}{2}$ exactly at $Kp = 1$ — the half-coverage point, the same pressure as the LH maximum of the previous exercise. Orders slide continuously from $1$ (clean surface) to $0$ (saturated); a reported "order $0.4$" is a statement about where on the isotherm you worked.
(b) $E_\text{app} = RT^{2}\,\mathrm{d}\ln v/\mathrm{d}T = E_\mathrm{a} + RT^{2}\,\mathrm{d}\ln\theta/\mathrm{d}T$. From $\theta = Kp/(1+Kp)$, $\mathrm{d}\ln\theta/\mathrm{d}T = [1/(1+Kp)]\,\mathrm{d}\ln K/\mathrm{d}T = \Delta_\mathrm{ads} H/[RT^{2}(1+Kp)]$, so
$$
E_\text{app} = E_\mathrm{a} + \frac{\Delta_\mathrm{ads} H}{1 + Kp}.
$$
At low coverage $E_\text{app} = E_\mathrm{a} + \Delta_\mathrm{ads} H$ — the measured barrier is *lowered* by the exothermicity of adsorption, because heating both speeds the step and empties the surface; at saturation $E_\text{app} = E_\mathrm{a}$, because $\theta$ is pinned at 1. A measured activation energy on a surface is therefore a *composite* of chemistry and thermodynamics, and quoting it without the coverage regime is meaningless — the same caution the Arrhenius equation asked of you in [[kinetics/rate-laws]].
:::
:::
