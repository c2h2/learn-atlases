The structures of [[materials-chemistry/crystal-structures]] are idealisations. Every real crystal above absolute zero contains empty sites, atoms in the wrong places and impurities, and these **defects** are not mere blemishes. They are the reason that salt conducts electricity when hot, that zirconia doped with yttria is the electrolyte of solid oxide fuel cells and the oxygen sensor in a car exhaust, that silicon can be made n- or p-type, that ruby is red, and that "iron(II) oxide" is never $\mathrm{FeO}$ but always $\mathrm{Fe}_{1-x}\mathrm{O}$ with $x$ between about $0.05$ and $0.15$. Diffusion in solids, sintering of ceramics, corrosion, catalysis by oxides and the operation of every battery electrode depend on them.

This chapter treats **point defects** quantitatively. We show that a certain concentration of vacancies is required by the second law, derive that concentration, introduce the Kröger–Vink notation that turns defect formation into balanced chemical equations, and apply the law of mass action to them to predict how defect concentrations and conductivity depend on temperature, doping and oxygen pressure. We then discuss non-stoichiometric compounds and ionic conduction, with brief notes on extended defects and colour centres.

## Kinds of point defect

::: definition Point defects {#def-point-defects}
A **point defect** is a disturbance of the crystal confined to one or a few lattice sites:
- a **vacancy**, an empty site normally occupied;
- an **interstitial**, an atom on a site normally empty;
- a **substitutional** (impurity) atom on a host site, or an **antisite** atom, a host atom on the other sublattice's site (Ga on an As site in GaAs).

In an ionic crystal, defects must preserve overall charge neutrality. The two intrinsic combinations in a stoichiometric crystal are the **Schottky defect**, a stoichiometric set of cation and anion vacancies (one $\mathrm{Na^+}$ and one $\mathrm{Cl^-}$ vacancy in NaCl, one $\mathrm{Ca^{2+}}$ and two $\mathrm{F^-}$ vacancies in $\mathrm{CaF_2}$), and the **Frenkel defect**, an ion displaced from its site to an interstitial site, leaving a vacancy (the vacancy–interstitial pair). **Intrinsic** defects are present in the pure crystal at equilibrium; **extrinsic** defects are created by impurities or by deviation from stoichiometry.
:::

Which intrinsic defect dominates depends on the structure. Schottky defects are favoured in close-packed structures where interstitial sites are small and ions similar in size: alkali halides with the rock salt structure, MgO. Frenkel defects require interstitial space or a highly polarisable ion that tolerates an unusual environment: cation Frenkel defects in AgCl and AgBr (the small, polarisable $\mathrm{Ag^+}$ enters tetrahedral holes, the basis of the photographic process), and anion Frenkel ("anti-Frenkel") defects in fluorite-type $\mathrm{CaF_2}$, $\mathrm{UO_2}$ and $\mathrm{ZrO_2}$, where the large empty cubes of the fluorite structure, centred at $(\tfrac12, \tfrac12, \tfrac12)$, hold interstitial anions.

## The thermodynamics of defect formation

Creating a vacancy costs energy: bonds are broken, and in an ionic crystal the lattice around the vacancy relaxes and polarises. Why, then, are vacancies present at all at equilibrium? Because they increase the entropy: there are many ways of choosing which sites are empty.

::: proposition Equilibrium concentration of Schottky defects {#prop-schottky}
In a crystal MX with $N$ cation and $N$ anion sites, the equilibrium number $n_\mathrm{S}$ of Schottky defects (pairs of vacancies) satisfies
$$
\frac{n_\mathrm{S}}{N} \approx \exp\!\left(-\frac{\Delta H_\mathrm{S}}{2k_\mathrm{B}T}\right),
$$ {#eq-schottky}
where $\Delta H_\mathrm{S}$ is the enthalpy of forming one Schottky pair, provided $n_\mathrm{S} \ll N$, the defects do not interact, and the vibrational entropy change is neglected (including it multiplies the right-hand side by $\exp(\Delta S_\mathrm{vib}/2k_\mathrm{B})$, a factor of order 1–100). For Frenkel defects with $N$ normal and $N_\mathrm{i}$ interstitial sites, $n_\mathrm{F} \approx \sqrt{NN_\mathrm{i}}\,\exp(-\Delta H_\mathrm{F}/2k_\mathrm{B}T)$.
:::

::: proof
Let $n$ cation vacancies and $n$ anion vacancies be distributed over $N$ sites each. The number of distinguishable arrangements on each sublattice is $N!/[n!(N - n)!]$, so the configurational entropy is
$$
S_\mathrm{conf} = k_\mathrm{B}\ln\left(\frac{N!}{n!(N - n)!}\right)^2 = 2k_\mathrm{B}\left[N\ln N - n\ln n - (N - n)\ln(N - n)\right],
$$
using Stirling's approximation $\ln x! \approx x\ln x - x$. At constant temperature and pressure the crystal minimises its Gibbs energy ([[thermodynamics/free-energy]]),
$$
G(n) = G_0 + n\Delta H_\mathrm{S} - TS_\mathrm{conf}.
$$
Setting $\partial G/\partial n = 0$: $\Delta H_\mathrm{S} - 2k_\mathrm{B}T\left[-\ln n - 1 + \ln(N - n) + 1\right] = 0$, so
$$
\ln\frac{n}{N - n} = -\frac{\Delta H_\mathrm{S}}{2k_\mathrm{B}T}, \qquad \frac{n}{N - n} = \exp\!\left(-\frac{\Delta H_\mathrm{S}}{2k_\mathrm{B}T}\right),
$$
and for $n \ll N$, $N - n \approx N$, which gives [[#eq-schottky]]. The factor 2 in the exponent arises because each Schottky pair creates two independently placed vacancies, each contributing configurational entropy. For a Frenkel pair, one vacancy among $N$ normal sites and one interstitial among $N_\mathrm{i}$ interstitial sites give $n^2/[(N - n)(N_\mathrm{i} - n)] = \exp(-\Delta H_\mathrm{F}/k_\mathrm{B}T)$, hence $n_\mathrm{F} \approx \sqrt{NN_\mathrm{i}}\exp(-\Delta H_\mathrm{F}/2k_\mathrm{B}T)$.
:::

The result is a mass-action law in disguise. Writing the formation of a Schottky pair as a reaction, "perfect crystal ⇌ cation vacancy + anion vacancy", with site fractions as activities, the equilibrium constant is $x_\mathrm{V_M}x_\mathrm{V_X} = \exp(-\Delta G_\mathrm{S}/k_\mathrm{B}T)$, and with $x_\mathrm{V_M} = x_\mathrm{V_X}$ the square root gives [[#eq-schottky]]. This chemical way of thinking, developed in the next section, extends to every defect equilibrium.

::: example Vacancies in sodium chloride {#ex-nacl-vacancies}
The enthalpy of formation of a Schottky pair in NaCl is about $2.3\ \mathrm{eV}$. Calculate the fraction of vacant sites at $298\ \mathrm{K}$, at $800\ \mathrm{K}$ and just below the melting point, $1073\ \mathrm{K}$. How many vacancy pairs are there in $1\ \mathrm{mol}$ of NaCl at $1073\ \mathrm{K}$?
::: solution
With $k_\mathrm{B} = 8.617\times10^{-5}\ \mathrm{eV\,K^{-1}}$:
$$
\frac{n}{N}(298\ \mathrm{K}) = \exp\!\left(-\frac{2.3}{2 \times 8.617\times10^{-5} \times 298}\right) = \exp(-44.8) = 3.6\times10^{-20},
$$
$\exp(-16.68) = 5.7\times10^{-8}$ at $800\ \mathrm{K}$, and $\exp(-12.44) = 4.0\times10^{-6}$ at $1073\ \mathrm{K}$. One mole has $N = 6.022\times10^{23}$ cation sites, so at $1073\ \mathrm{K}$ there are $2.4\times10^{18}$ vacancy pairs. At room temperature the equilibrium value would be about $20\ 000$ pairs per mole, but real crystals contain far more vacancies than this, because divalent impurities at the ppm level each bring a cation vacancy (below), and because vacancies frozen in on cooling cannot leave. Two significant figures are the most that a $\Delta H_\mathrm{S}$ known to $\pm0.1\ \mathrm{eV}$ justifies; at $298\ \mathrm{K}$ that uncertainty changes the answer by a factor of 7.
:::
:::

::: widget plot
f: log(exp(-h/(2*8.617e-5*x)))/log(10)
x: 300, 1400
y: -22, 0
sliders: h=2.3:0.5:5:0.05
hlines: -6
labels: \log_{10}(n_\mathrm{S}/N)
caption: The equilibrium Schottky fraction of [[#eq-schottky]] (as $\log_{10}$) against temperature $x$ in K, for a pair formation enthalpy $h$ in eV (slider; NaCl about $2.3\ \mathrm{eV}$, MgO about $7$–$8\ \mathrm{eV}$, beyond the slider). The line at $10^{-6}$ marks a typical impurity level of 1 ppm. Wherever the curve lies below that line, the vacancy concentration is set by impurities rather than by thermal equilibrium: the crystal is in the **extrinsic** regime. For MgO this is true at every temperature up to the melting point.
:::

## Kröger–Vink notation and defect equilibria

To write defect reactions we need a notation that records what occupies a site, which site it is, and its charge *relative to the perfect crystal*. That relative charge, not the absolute charge of the species, is what matters for electroneutrality.

::: definition Kröger–Vink notation {#def-kroger-vink}
A defect is written $\mathrm{M}_\mathrm{S}^{c}$, where
- $\mathrm{M}$ is the species on the site: an atom or ion symbol, $\mathrm{V}$ for a vacancy, $e$ for an electron, $h$ for a hole;
- the subscript $\mathrm{S}$ is the site: the symbol of the atom normally there, or $\mathrm{i}$ for an interstitial site;
- the superscript $c$ is the **effective charge**, the charge of the site relative to the perfect lattice: $^\bullet$ for each unit of positive charge, $'$ for each unit of negative charge, and $^\times$ for zero.

Examples in NaCl: $\mathrm{V_{Na}'}$ (a missing $\mathrm{Na^+}$ leaves the site one unit more negative than normal), $\mathrm{V_{Cl}^\bullet}$, $\mathrm{Ca_{Na}^\bullet}$ ($\mathrm{Ca^{2+}}$ on an $\mathrm{Na^+}$ site), $\mathrm{Na_{Na}^\times}$. In oxides: $\mathrm{V_O^{\bullet\bullet}}$, $\mathrm{O_i''}$, $\mathrm{Y_{Zr}'}$, $\mathrm{Fe_{Fe}^\bullet}$ ($\mathrm{Fe^{3+}}$ on an $\mathrm{Fe^{2+}}$ site, equivalent to a hole localised on iron). A defect reaction must balance **mass**, **sites** (in the ratio of the structure) and **effective charge**.
:::

With this notation the Schottky and Frenkel equilibria in NaCl and AgCl, and the anion Frenkel equilibrium in $\mathrm{CaF_2}$, are
$$
\mathrm{nil} \rightleftharpoons \mathrm{V_{Na}'} + \mathrm{V_{Cl}^\bullet}, \qquad \mathrm{Ag_{Ag}^\times} \rightleftharpoons \mathrm{Ag_i^\bullet} + \mathrm{V_{Ag}'}, \qquad \mathrm{F_F^\times} \rightleftharpoons \mathrm{F_i'} + \mathrm{V_F^\bullet},
$$
with equilibrium constants $K_\mathrm{S} = [\mathrm{V_{Na}'}][\mathrm{V_{Cl}^\bullet}]$ and so on, square brackets denoting site fractions (or concentrations). The real power of the notation appears with **doping**. Dissolving $\mathrm{CaCl_2}$ in NaCl places each $\mathrm{Ca^{2+}}$ on a sodium site and needs a compensating defect:
$$
\mathrm{CaCl_2} \xrightarrow{\ \mathrm{NaCl}\ } \mathrm{Ca_{Na}^\bullet} + \mathrm{V_{Na}'} + 2\,\mathrm{Cl_{Cl}^\times}.
$$
Two Na sites and two Cl sites are used, so sites balance; effective charges $+1 - 1 = 0$. Each calcium ion creates one cation vacancy. Because $K_\mathrm{S}$ still holds, the extra cation vacancies *suppress* the anion vacancies: $[\mathrm{V_{Cl}^\bullet}] = K_\mathrm{S}/[\mathrm{V_{Na}'}]$, the solid-state analogue of the common-ion effect.

::: example Oxide-ion vacancies in yttria-stabilised zirconia {#ex-ysz}
Pure $\mathrm{ZrO_2}$ is monoclinic at room temperature, but dissolving $\mathrm{Y_2O_3}$ stabilises the cubic fluorite structure. (a) Write the defect reaction. (b) For 8 mol % $\mathrm{Y_2O_3}$ ("8YSZ"), find the composition $\mathrm{Zr}_{1-x}\mathrm{Y}_x\mathrm{O}_{2-x/2}$ and the fraction of oxide sites that are vacant.
::: solution
(a) Two $\mathrm{Y^{3+}}$ on zirconium sites carry effective charge $-1$ each and are compensated by one oxide vacancy:
$$
\mathrm{Y_2O_3} \xrightarrow{\ \mathrm{ZrO_2}\ } 2\,\mathrm{Y_{Zr}'} + 3\,\mathrm{O_O^\times} + \mathrm{V_O^{\bullet\bullet}}.
$$
Sites: 2 Zr sites and 4 O sites are used (the 1 : 2 ratio of $\mathrm{ZrO_2}$), three filled with oxide and one empty. Charge: $2(-1) + 2 = 0$.

(b) Take $0.92\ \mathrm{mol}\ \mathrm{ZrO_2} + 0.08\ \mathrm{mol}\ \mathrm{Y_2O_3}$: $0.92$ Zr, $0.16$ Y, $1.84 + 0.24 = 2.08$ O. Per cation, $1.08$ cations: $x = 0.16/1.08 = 0.148$, and the O content is $2.08/1.08 = 1.926 = 2 - x/2$. The vacancies per formula unit are $x/2 = 0.074$, out of 2 oxide sites: $3.7\ \%$ of the oxide sites are empty. This enormous, temperature-independent vacancy concentration, some $10^4$ times the intrinsic value, is what makes YSZ an oxide-ion conductor (about $0.1\ \mathrm{S\,cm^{-1}}$ at $1000\,^\circ\mathrm{C}$).
:::
:::

::: warning The effective charge is not the ionic charge {#warn-effective}
A common error is to write an oxide vacancy as $\mathrm{V_O''}$ ("oxide is $2-$") or a yttrium ion in zirconia as $\mathrm{Y_{Zr}^{\bullet\bullet\bullet}}$ ("yttrium is $3+$"). The effective charge is the difference between what is there and what should be there. Removing an $\mathrm{O^{2-}}$ removes two negative charges, so the vacancy is *positive*, $\mathrm{V_O^{\bullet\bullet}}$; replacing $\mathrm{Zr^{4+}}$ by $\mathrm{Y^{3+}}$ leaves the site one unit *negative*, $\mathrm{Y_{Zr}'}$. A second error is to forget site balance: writing $\mathrm{Y_2O_3} \rightarrow 2\mathrm{Y_{Zr}'} + 3\mathrm{O_O^\times}$ balances mass but uses two cation sites and only three anion sites, which is not the 1 : 2 ratio of the host. The missing site *is* the vacancy.
:::

## Non-stoichiometry and the gas phase

Many oxides of transition metals exchange oxygen with the surrounding gas, because the metal can change its oxidation state. The composition then depends on the oxygen partial pressure $p_{\mathrm{O_2}}$ and on temperature, and the electrons or holes released or consumed make the oxide a semiconductor. **Wüstite**, $\mathrm{Fe}_{1-x}\mathrm{O}$, has the rock salt structure with iron vacancies compensated by $\mathrm{Fe^{3+}}$; **nickel oxide** is slightly metal-deficient and a p-type semiconductor; reduced **titanium dioxide**, **zinc oxide** and **ceria** lose oxygen and become n-type.

::: proposition Oxygen-pressure dependence of defect concentrations {#prop-brouwer}
Consider an oxide MO in which the dominant defects are doubly charged oxide vacancies and free electrons, formed by
$$
\mathrm{O_O^\times} \rightleftharpoons \mathrm{V_O^{\bullet\bullet}} + 2e' + \tfrac12\mathrm{O_2(g)}, \qquad K_\mathrm{red} = [\mathrm{V_O^{\bullet\bullet}}]\,n^2\,p_{\mathrm{O_2}}^{1/2},
$$
with $n$ the electron concentration. If these defects compensate each other ($n = 2[\mathrm{V_O^{\bullet\bullet}}]$), then
$$
n = (2K_\mathrm{red})^{1/3}\,p_{\mathrm{O_2}}^{-1/6} \quad \text{and} \quad \sigma_\mathrm{e} \propto p_{\mathrm{O_2}}^{-1/6}.
$$ {#eq-brouwer}
If instead the vacancy concentration is fixed by acceptor doping, $[\mathrm{V_O^{\bullet\bullet}}] = \tfrac12[\mathrm{A'}]$, then $n \propto p_{\mathrm{O_2}}^{-1/4}$. For a metal-deficient oxide with doubly charged metal vacancies compensated by holes, $\tfrac12\mathrm{O_2(g)} \rightleftharpoons \mathrm{O_O^\times} + \mathrm{V_M''} + 2h^\bullet$, the hole concentration rises as $p_{\mathrm{O_2}}^{+1/6}$. These power laws assume dilute, non-interacting defects (activities equal to concentrations) and a single dominant pair of defects in each pressure range.
:::

::: proof
For the reduction equilibrium, substitute $[\mathrm{V_O^{\bullet\bullet}}] = n/2$ into $K_\mathrm{red}$: $K_\mathrm{red} = \tfrac12 n^3p_{\mathrm{O_2}}^{1/2}$, so $n^3 = 2K_\mathrm{red}p_{\mathrm{O_2}}^{-1/2}$ and $n = (2K_\mathrm{red})^{1/3}p_{\mathrm{O_2}}^{-1/6}$. The electronic conductivity is $\sigma_\mathrm{e} = ne\mu_\mathrm{e}$ with mobility $\mu_\mathrm{e}$ independent of $p_{\mathrm{O_2}}$, so $\sigma_\mathrm{e} \propto p_{\mathrm{O_2}}^{-1/6}$. If an acceptor fixes $[\mathrm{V_O^{\bullet\bullet}}]$, then $K_\mathrm{red} = [\mathrm{V_O^{\bullet\bullet}}]n^2p_{\mathrm{O_2}}^{1/2}$ with constant $[\mathrm{V_O^{\bullet\bullet}}]$ gives $n^2 \propto p_{\mathrm{O_2}}^{-1/2}$, $n \propto p_{\mathrm{O_2}}^{-1/4}$. For the oxidation reaction, $K_\mathrm{ox} = [\mathrm{V_M''}]p^2/p_{\mathrm{O_2}}^{1/2}$ with $p = 2[\mathrm{V_M''}]$ gives $p^3 = 2K_\mathrm{ox}p_{\mathrm{O_2}}^{1/2}$, $p \propto p_{\mathrm{O_2}}^{1/6}$. The temperature dependence enters through $K = \exp(-\Delta G^\circ/RT)$ for each equilibrium.
:::

A plot of $\log$ (concentration) against $\log p_{\mathrm{O_2}}$, with straight-line segments whose slopes are these simple fractions, is a **Brouwer diagram**. Measuring the slope of $\log\sigma$ against $\log p_{\mathrm{O_2}}$ is the standard experimental way of identifying the dominant defects: a slope of $-\tfrac16$ for undoped ceria at high temperature indicates doubly charged vacancies and free electrons, a slope of $-\tfrac14$ in doped ceria indicates fixed vacancies, and a slope of $+\tfrac16$ for NiO indicates doubly charged nickel vacancies compensated by holes. The practical consequences are large: ceria-based catalysts in car exhausts store and release oxygen by exactly this equilibrium, and the oxygen sensors that control engines use the conductivity or the Nernst potential of such oxides.

::: example Wüstite: vacancies or interstitials? {#ex-wustite}
Wüstite of composition $\mathrm{Fe_{0.95}O}$ has the rock salt structure with $a = 4.300\ \text{Å}$ (illustrative values close to those measured). Its iron deficit could be due either to vacancies on the iron sublattice (4 O and 3.80 Fe per cell) or to interstitial oxygen with a full iron sublattice (4 Fe and $4/0.95 = 4.21$ O per cell). (a) Calculate the density predicted by each model. (b) Write the defect reaction for the vacancy model and find the fraction of iron present as $\mathrm{Fe^{3+}}$.
::: solution
(a) $V = (4.300\times10^{-8}\ \mathrm{cm})^3 = 7.951\times10^{-23}\ \mathrm{cm^3}$. Vacancy model: cell mass $= [3.80(55.845) + 4(15.999)]/N_\mathrm{A} = 276.21/6.022\times10^{23}\ \mathrm{g}$, $\rho = 276.21/(6.022\times10^{23} \times 7.951\times10^{-23}) = 5.77\ \mathrm{g\,cm^{-3}}$. Interstitial model: $[4(55.845) + 4.2105(15.999)] = 290.75$, $\rho = 6.07\ \mathrm{g\,cm^{-3}}$. The two differ by 5 %, easily distinguished by a pycnometer. Measurements of this kind by Eric Jette and Frank Foote in 1933 showed that wüstite contains iron vacancies, the first proof of a vacancy model for a non-stoichiometric compound.

(b) Oxidation of the stoichiometric oxide creates iron vacancies, each compensated by two $\mathrm{Fe^{3+}}$:
$$
2\,\mathrm{Fe_{Fe}^\times} + \tfrac12\mathrm{O_2(g)} \rightleftharpoons 2\,\mathrm{Fe_{Fe}^\bullet} + \mathrm{V_{Fe}''} + \mathrm{O_O^\times}.
$$
In $\mathrm{Fe_{1-x}O}$ charge balance requires $2(1 - x) + (\text{number of }\mathrm{Fe^{3+}}) = 2$ per oxide, so the number of $\mathrm{Fe^{3+}}$ per formula unit is $2x = 0.10$, out of $0.95$ Fe: $10.5\ \%$ of the iron is $\mathrm{Fe^{3+}}$. (In real wüstite many $\mathrm{Fe^{3+}}$ ions sit in tetrahedral interstitial sites next to clusters of vacancies, the Koch–Cohen clusters: the point-defect model is the first approximation.)
:::
:::

When defect concentrations exceed about one per cent, defects interact and order. Wüstite's clusters, the **crystallographic shear planes** of reduced $\mathrm{WO_{3-x}}$ and $\mathrm{MoO_{3-x}}$ (in which planes of edge-sharing octahedra eliminate oxygen vacancies and produce a series of discrete phases $\mathrm{W}_n\mathrm{O}_{3n-1}$), and the Magnéli phases $\mathrm{Ti}_n\mathrm{O}_{2n-1}$ are examples. A "non-stoichiometric" range can then turn out, on closer study, to be a series of closely related stoichiometric phases.

::: quiz
Which defect reactions are correctly balanced in mass, sites and effective charge?
- [x] $\mathrm{MgO} \xrightarrow{\ \mathrm{Al_2O_3}\ } \mathrm{Mg_{Al}'} + \mathrm{O_O^\times} + \tfrac12\mathrm{V_O^{\bullet\bullet}}$
- [ ] $\mathrm{Li_2O} \xrightarrow{\ \mathrm{NiO}\ } 2\,\mathrm{Li_{Ni}^\bullet} + \mathrm{O_O^\times} + \mathrm{V_O''}$
- [x] $\mathrm{Gd_2O_3} \xrightarrow{\ \mathrm{CeO_2}\ } 2\,\mathrm{Gd_{Ce}'} + 3\,\mathrm{O_O^\times} + \mathrm{V_O^{\bullet\bullet}}$
- [ ] $\mathrm{CaO} \xrightarrow{\ \mathrm{ZrO_2}\ } \mathrm{Ca_{Zr}''} + \mathrm{O_O^\times}$
::: solution
(1) Al₂O₃ has cation : anion sites 2 : 3. One Mg uses 1 cation site, so $\tfrac32$ anion sites are needed: one filled, half empty. Charge $-1 + \tfrac12(2) = 0$. Correct (fractional coefficients are acceptable; double everything if preferred). (2) $\mathrm{Li^+}$ on a $\mathrm{Ni^{2+}}$ site is $\mathrm{Li_{Ni}'}$, not $^\bullet$, and an oxide vacancy is $^{\bullet\bullet}$; the correct reaction is $\mathrm{Li_2O} \rightarrow 2\mathrm{Li_{Ni}'} + \mathrm{O_O^\times} + \mathrm{V_O^{\bullet\bullet}}$. (3) Correct: 2 cation sites, 4 anion sites, charge $-2 + 2 = 0$. (4) Charge $-2$ is uncompensated and only one anion site is used for one cation site; the correct form is $\mathrm{CaO} \rightarrow \mathrm{Ca_{Zr}''} + \mathrm{O_O^\times} + \mathrm{V_O^{\bullet\bullet}}$.
:::
:::

## Ionic conduction

Ions move through a crystal by hopping into neighbouring vacancies (**vacancy mechanism**), by jumping between interstitial sites (**interstitial mechanism**), or by pushing a lattice ion into an interstitial site and taking its place (**interstitialcy**). Each hop crosses an energy barrier, the migration enthalpy $\Delta H_\mathrm{m}$, typically $0.5$–$1\ \mathrm{eV}$ for good conductors. A field biases the random hopping, producing a current.

::: proposition The Nernst–Einstein relation {#prop-nernst-einstein}
For mobile ions of charge $q = ze$ and number density $c$ (per unit volume), with diffusion coefficient $D$, the ionic conductivity is
$$
\sigma = \frac{c\,q^2D}{k_\mathrm{B}T}.
$$ {#eq-nernst-einstein}
With thermally activated hopping, $D = D_0\exp(-\Delta H_\mathrm{m}/k_\mathrm{B}T)$, so that $\sigma T = A\exp(-E_\mathrm{a}/k_\mathrm{B}T)$, where $E_\mathrm{a} = \Delta H_\mathrm{m}$ when the carrier concentration is fixed (extrinsic regime) and $E_\mathrm{a} = \Delta H_\mathrm{m} + \tfrac12\Delta H_\mathrm{S}$ (or $\tfrac12\Delta H_\mathrm{F}$) when it is thermally generated (intrinsic regime). The relation assumes uncorrelated hops; when $D$ is measured with tracer isotopes, a correlation factor (Haven ratio, typically $0.3$–$1$) relates the two.
:::

::: proof
Consider ions in a field $E$ along $x$, at equilibrium with a concentration gradient so that no net current flows. The drift flux is $c\,u\,E$, where the mobility $u$ is the drift velocity per unit field, and the diffusion flux is $-D\,dc/dx$ (Fick's first law). At equilibrium in the electrostatic potential $\phi$, with $E = -d\phi/dx$, the concentration follows the Boltzmann distribution $c \propto \exp(-q\phi/k_\mathrm{B}T)$, so $dc/dx = (qE/k_\mathrm{B}T)c$. Zero net flux requires $cuE = D(qE/k_\mathrm{B}T)c$, that is $u = qD/k_\mathrm{B}T$ (the Einstein relation). The current density in a uniform crystal is $j = cqu\,E$, so $\sigma = cqu = cq^2D/k_\mathrm{B}T$. If $D$ is activated with $\Delta H_\mathrm{m}$ and $c$ is fixed, $\sigma T \propto \exp(-\Delta H_\mathrm{m}/k_\mathrm{B}T)$; if $c \propto \exp(-\Delta H_\mathrm{S}/2k_\mathrm{B}T)$ by [[#prop-schottky]], the activation energies add.
:::

The two regimes produce the characteristic "knee" in a plot of $\ln(\sigma T)$ against $1/T$ for a lightly doped crystal: at high temperature the steep intrinsic line, at low temperature a shallower extrinsic line whose height is proportional to the dopant concentration. From the two slopes one extracts both $\Delta H_\mathrm{m}$ and $\Delta H_\mathrm{S}$, which is how the values used in [[#ex-nacl-vacancies]] were measured.

### From hops to a diffusion coefficient

The diffusion coefficient itself can be built from the hopping picture. An ion that makes $\Gamma$ jumps per second, each of length $\lambda$ in a random direction, has a mean square displacement $\langle r^2\rangle = \Gamma t\lambda^2$ after time $t$ (the displacements of successive random jumps are uncorrelated, so their squares add). Comparing with the three-dimensional diffusion result $\langle r^2\rangle = 6Dt$ gives
$$
D = \tfrac16\Gamma\lambda^2.
$$ {#eq-random-walk}
For the vacancy mechanism an ion can jump only if one of its $z$ neighbouring sites is empty, which happens with probability equal to the vacancy site fraction $x_\mathrm{V}$, and it then succeeds at a rate $\nu\exp(-\Delta G_\mathrm{m}/k_\mathrm{B}T)$, where the attempt frequency $\nu$ is of the order of a lattice vibration frequency, $10^{12}$–$10^{13}\ \mathrm{s^{-1}}$. So $\Gamma = z\nu x_\mathrm{V}\exp(-\Delta G_\mathrm{m}/k_\mathrm{B}T)$: the diffusion coefficient of the ions is proportional to the concentration of the defects that carry them. This is the microscopic basis of everything in this section, and the reason why doping, which fixes $x_\mathrm{V}$, controls ionic conductivity.

::: example Conductivity of doped sodium chloride from the hopping model {#ex-hopping}
NaCl ($a = 5.640\ \text{Å}$) contains divalent impurities that fix the cation vacancy fraction at $x_\mathrm{V} = 1.0\times10^{-5}$. Take $\nu = 5\times10^{12}\ \mathrm{s^{-1}}$, $\Delta H_\mathrm{m} = 0.70\ \mathrm{eV}$ (neglect the migration entropy), $z = 12$ cation neighbours at $\lambda = a/\sqrt2$. Estimate $D(\mathrm{Na^+})$ and $\sigma$ at $800\ \mathrm{K}$.
::: solution
$\exp(-0.70/(8.617\times10^{-5} \times 800)) = \exp(-10.15) = 3.89\times10^{-5}$, so $\Gamma = 12 \times 5\times10^{12} \times 1.0\times10^{-5} \times 3.89\times10^{-5} = 2.3\times10^{4}\ \mathrm{s^{-1}}$: each sodium ion hops some twenty thousand times a second. With $\lambda = 3.988\ \text{Å}$, [[#eq-random-walk]] gives $D = \tfrac16 \times 2.34\times10^4 \times (3.988\times10^{-10})^2 = 6.2\times10^{-16}\ \mathrm{m^2\,s^{-1}}$. The $\mathrm{Na^+}$ number density is $4/a^3 = 2.23\times10^{28}\ \mathrm{m^{-3}}$, so by [[#eq-nernst-einstein]]
$$
\sigma = \frac{2.23\times10^{28} \times (1.602\times10^{-19})^2 \times 6.2\times10^{-16}}{1.381\times10^{-23} \times 800} = 3.2\times10^{-5}\ \mathrm{S\,m^{-1}} = 3.2\times10^{-7}\ \mathrm{S\,cm^{-1}}.
$$
This is a typical order of magnitude for an extrinsic alkali halide; YSZ at a similar temperature conducts about $10^4$ times better, mostly because its vacancy fraction is $3.7\times10^{-2}$ instead of $10^{-5}$. Since $\nu$ and the neglected migration entropy are uncertain, the estimate is good to perhaps a factor of 3.
:::
:::

::: widget plot
f: log(exp(26.7 - 1.85*x/0.08617) + c*exp(8 - 0.7*x/0.08617))/log(10)
x: 0.7, 2.0
y: -7, 6
sliders: c=1:0.01:100:0.01
labels: \log_{10}(\sigma T)\ (\text{arbitrary units})
caption: Model Arrhenius plot of the ionic conductivity of a doped NaCl-like crystal against $x = 1000\ \mathrm{K}/T$ (illustrative prefactors). Each exponent has the form $-E_\mathrm{a}/k_\mathrm{B}T = -E_\mathrm{a}x/0.08617$ with $E_\mathrm{a}$ in eV. The intrinsic term has $E_\mathrm{a} = 1.85\ \mathrm{eV}$ ($\Delta H_\mathrm{m} + \tfrac12\Delta H_\mathrm{S}$ with $\Delta H_\mathrm{m} = 0.7$ and $\Delta H_\mathrm{S} = 2.3\ \mathrm{eV}$) and dominates at high temperature (small $x$); the extrinsic term has $E_\mathrm{a} = \Delta H_\mathrm{m} = 0.7\ \mathrm{eV}$ and is scaled by the dopant level $c$ (slider). Raising $c$ lifts the low-temperature branch and moves the knee to higher temperature. In real crystals the low-temperature end often bends down further as vacancies associate with dopant ions into neutral pairs.
:::

### Fast-ion conductors

Most ionic solids conduct poorly at room temperature ($\sigma < 10^{-10}\ \mathrm{S\,cm^{-1}}$ for NaCl). A few, the **fast-ion conductors** or **solid electrolytes**, conduct as well as liquid electrolytes, because their mobile sublattice has many more available sites than ions, so that carriers need not be created thermally and migration barriers are low. The classic example is **α-AgI**: above $147\,^\circ\mathrm{C}$ the iodide ions form a body-centred cubic array and the two $\mathrm{Ag^+}$ ions per cell are distributed over 42 available sites, giving $\sigma \approx 1\ \mathrm{S\,cm^{-1}}$, essentially the conductivity of a molten salt. Others are **sodium β-alumina** ($\mathrm{Na^+}$ moving in loosely packed planes between spinel blocks; the electrolyte of sodium–sulfur batteries), **YSZ** and **gadolinia-doped ceria** (oxide ions, for fuel cells and sensors, [[#ex-ysz]]), and the lithium conductors (garnet $\mathrm{Li_7La_3Zr_2O_{12}}$, sulfides such as $\mathrm{Li_{10}GeP_2S_{12}}$) being developed for solid-state batteries ([[materials-chemistry/energy-materials]]).

::: example Activation energy of an oxide-ion conductor {#ex-activation}
A sample of doped zirconia has conductivity $0.020\ \mathrm{S\,cm^{-1}}$ at $800\,^\circ\mathrm{C}$ and $0.090\ \mathrm{S\,cm^{-1}}$ at $1000\,^\circ\mathrm{C}$ (illustrative values of the right magnitude). Find the activation energy, using the form $\sigma T = A\exp(-E_\mathrm{a}/k_\mathrm{B}T)$, and compare with a plain Arrhenius fit of $\sigma$.
::: solution
$T_1 = 1073\ \mathrm{K}$, $T_2 = 1273\ \mathrm{K}$; $1/T_1 - 1/T_2 = 9.320\times10^{-4} - 7.855\times10^{-4} = 1.464\times10^{-4}\ \mathrm{K^{-1}}$. Then
$$
E_\mathrm{a} = \frac{k_\mathrm{B}\ln(\sigma_2T_2/\sigma_1T_1)}{1/T_1 - 1/T_2} = \frac{8.617\times10^{-5} \times \ln(114.6/21.46)}{1.464\times10^{-4}} = \frac{8.617\times10^{-5} \times 1.675}{1.464\times10^{-4}} = 0.99\ \mathrm{eV}.
$$
A plain fit of $\ln\sigma$ gives $8.617\times10^{-5}\ln4.5/1.464\times10^{-4} = 0.89\ \mathrm{eV}$. The difference, $k_\mathrm{B}\bar T \approx 0.1\ \mathrm{eV}$, comes from the $1/T$ prefactor of [[#eq-nernst-einstein]]; which form was used must always be stated when activation energies are compared. Because the vacancy concentration in doped zirconia is fixed by the dopant, $E_\mathrm{a}$ here is a migration enthalpy (plus, at lower temperatures, a vacancy–dopant association energy).
:::
:::

## Electronic defects and colour

Defects can also trap electrons. Heating an alkali halide in the vapour of its metal, or irradiating it, produces anion vacancies each holding a trapped electron, $\mathrm{V_X^\times}$ in Kröger–Vink notation (a vacancy $\mathrm{V_X^\bullet}$ plus an electron). These **F centres** (from German *Farbe*, colour) absorb visible light, because the trapped electron behaves like a particle in a box whose size is set by the lattice: NaCl turns yellow-orange, KCl violet, and the absorption energy falls as the lattice parameter grows roughly as $a^{-2}$ (the empirical Mollwo–Ivey relation, closer to $a^{-1.8}$). Impurity ions substituting in a host are the basis of colour in gems and phosphors: $\mathrm{Cr^{3+}}$ on $\mathrm{Al^{3+}}$ sites in corundum is ruby, $\mathrm{Ti^{3+}}$ and $\mathrm{Fe^{2+}}$/$\mathrm{Ti^{4+}}$ pairs give sapphire its blue, and $\mathrm{Eu^{2+}}$ or $\mathrm{Ce^{3+}}$ dopants make the phosphors of [[materials-chemistry/magnetic-optical]]. Donor and acceptor dopants in semiconductors, the defects of greatest economic importance, are treated in [[materials-chemistry/electronic-structure-solids]].

Beyond point defects lie **extended defects**: dislocations (line defects whose motion lets metals deform plastically at stresses far below those needed to shear a perfect crystal), stacking faults, twin boundaries and grain boundaries. They matter most for mechanical properties, but they also provide fast diffusion paths and, at grain boundaries in ceramics, space-charge layers that can block ionic conduction.

## Where this leads

Defect chemistry is the language of the rest of the course whenever composition varies. [[materials-chemistry/electronic-structure-solids]] treats doped semiconductors as electronic defect equilibria; [[materials-chemistry/solid-synthesis]] explains why solid-state reactions are slow (they need diffusion through defects) and how sintering works; [[materials-chemistry/energy-materials]] uses lithium-ion insertion, oxygen-vacancy conductors and mixed conductors in batteries and fuel cells. The electrochemical side, including the Nernst potential of oxygen sensors and fuel cells, is in [[electrochemistry/fuel-cells-electrolysis]], and the statistical mechanics behind configurational entropy in [[statistical-thermodynamics/boltzmann-distribution]].

::: history
Yakov Frenkel proposed in 1926 that ions in a crystal can leave their sites for interstitial positions, to explain ionic conduction, and Walter Schottky and Carl Wagner developed the statistical thermodynamics of defects in ionic crystals and non-stoichiometric compounds from 1930. Eric Jette and Frank Foote's density and X-ray measurements of 1933 showed that wüstite is iron-deficient through vacancies. Robert Pohl's group in Göttingen studied colour centres in alkali halides through the 1920s and 1930s. Ferdinand Kröger and Hendrik Vink introduced their notation in 1956, and Gerrit Brouwer his diagrams in 1954. The fast-ion conductor α-AgI was identified by Carl Tubandt and Erich Lorenz in 1914; sodium β-alumina was recognised as a fast $\mathrm{Na^+}$ conductor by Yung-Fang Yao and Joseph Kummer at the Ford Motor Company in 1967, and Arne Magnéli's work on oxide shear structures dates from the late 1940s and 1950s.
:::

::: summary
- Every crystal above $0\ \mathrm{K}$ contains vacancies because their configurational entropy lowers $G$; for Schottky pairs $n_\mathrm{S}/N = \exp(-\Delta H_\mathrm{S}/2k_\mathrm{B}T)$, for Frenkel pairs $n_\mathrm{F} = \sqrt{NN_\mathrm{i}}\exp(-\Delta H_\mathrm{F}/2k_\mathrm{B}T)$.
- Schottky defects dominate in rock salt halides and MgO, cation Frenkel defects in AgCl, anion Frenkel defects in fluorites.
- Kröger–Vink notation $\mathrm{M_S^c}$ records species, site and *effective* charge ($^\bullet$, $'$, $^\times$); defect reactions balance mass, sites and charge, and obey mass-action laws.
- Aliovalent dopants create compensating defects: $\mathrm{Y_2O_3}$ in $\mathrm{ZrO_2}$ gives one $\mathrm{V_O^{\bullet\bullet}}$ per two Y, a large fixed vacancy concentration (extrinsic regime).
- In oxides that exchange oxygen with the gas, carrier concentrations follow power laws in $p_{\mathrm{O_2}}$ (slopes $\pm\tfrac16$, $\pm\tfrac14$) that identify the dominant defects (Brouwer diagrams); $\mathrm{Fe_{1-x}O}$ is iron-deficient through vacancies.
- Ionic conductivity follows $\sigma = cq^2D/k_\mathrm{B}T$ with activated hopping; $E_\mathrm{a}$ is the migration enthalpy in the extrinsic regime and includes half the formation enthalpy in the intrinsic regime.
- Fast-ion conductors (α-AgI, β-alumina, YSZ, ceria, lithium garnets and sulfides) have many more sites than mobile ions and low migration barriers.
:::

## Exercises

::: exercise Kröger–Vink practice {level=1}
Write Kröger–Vink symbols for: (a) a chloride vacancy in KCl; (b) a $\mathrm{Mg^{2+}}$ ion on an $\mathrm{Al^{3+}}$ site in $\mathrm{Al_2O_3}$; (c) an interstitial $\mathrm{Ag^+}$ in AgBr; (d) a $\mathrm{Ni^{3+}}$ ion in NiO; (e) an $\mathrm{Nb^{5+}}$ ion on a $\mathrm{Ti^{4+}}$ site in $\mathrm{TiO_2}$.
::: solution
(a) $\mathrm{V_{Cl}^\bullet}$. (b) $\mathrm{Mg_{Al}'}$. (c) $\mathrm{Ag_i^\bullet}$ (an interstitial site normally holds nothing, so the full $+1$ charge is effective). (d) $\mathrm{Ni_{Ni}^\bullet}$ (equivalently, a hole localised on nickel). (e) $\mathrm{Nb_{Ti}^\bullet}$, a donor.
:::
:::

::: exercise Schottky defects in KCl {level=1 check="1.0e-7"}
The Schottky formation enthalpy of KCl is about $2.5\ \mathrm{eV}$. Estimate the equilibrium fraction of vacant cation sites at $900\ \mathrm{K}$. (Enter $n/N$ as a number, two significant figures.)
::: solution
$n/N = \exp[-2.5/(2 \times 8.617\times10^{-5} \times 900)] = \exp(-16.12) = 1.0\times10^{-7}$, or about $6\times10^{16}$ vacancy pairs per mole.
:::
:::

::: exercise Vacancies in gadolinia-doped ceria {level=1 check="5.0"}
Ceria doped with gadolinium has composition $\mathrm{Ce_{0.80}Gd_{0.20}O_{2-\delta}}$. Write the defect reaction, find $\delta$, and the percentage of oxide sites that are vacant. (Enter the percentage of vacant oxide sites.)
::: solution
$\mathrm{Gd_2O_3} \rightarrow 2\mathrm{Gd_{Ce}'} + 3\mathrm{O_O^\times} + \mathrm{V_O^{\bullet\bullet}}$. One vacancy per two Gd, so $\delta = 0.20/2 = 0.10$, and the composition is $\mathrm{Ce_{0.8}Gd_{0.2}O_{1.90}}$. There are $0.10$ vacancies among the $2$ oxide sites of each formula unit, so $0.10/2.00 = 5.0\ \%$ of the oxide sites are vacant, more than in 8YSZ, which is one reason doped ceria conducts better at intermediate temperatures.
:::
:::

::: exercise A pressure dependence {level=2 check="10"}
The electronic conductivity of an undoped oxide at $1000\ \mathrm{K}$ follows $\sigma \propto p_{\mathrm{O_2}}^{-1/6}$. By what factor does $\sigma$ increase when $p_{\mathrm{O_2}}$ is lowered from $1\ \mathrm{bar}$ to $10^{-6}\ \mathrm{bar}$? What defects are responsible? (Enter the factor.)
::: solution
$(10^{-6})^{-1/6} = 10^{1} = 10$. A slope of $-\tfrac16$ indicates doubly ionised oxide vacancies compensated by free electrons ([[#prop-brouwer]]), with no dopant fixing the vacancy concentration: an n-type, oxygen-deficient oxide such as $\mathrm{CeO_{2-x}}$ or $\mathrm{TiO_{2-x}}$.
:::
:::

::: exercise Calcium in sodium chloride {level=2 check="4.8e-15"}
NaCl containing $\mathrm{Ca^{2+}}$ at a site fraction of $1.0\times10^{-5}$ is held at $600\ \mathrm{K}$, where the Schottky product is $K_\mathrm{S} = [\mathrm{V_{Na}'}][\mathrm{V_{Cl}^\bullet}] = \exp(-\Delta H_\mathrm{S}/k_\mathrm{B}T)$ with $\Delta H_\mathrm{S} = 2.3\ \mathrm{eV}$. (a) Find the intrinsic vacancy fraction. (b) Assuming every Ca is compensated by a cation vacancy, find $[\mathrm{V_{Cl}^\bullet}]$. (Enter $[\mathrm{V_{Cl}^\bullet}]$ as a site fraction, two significant figures.)
::: solution
(a) $K_\mathrm{S} = \exp[-2.3/(8.617\times10^{-5} \times 600)] = \exp(-44.49) = 4.8\times10^{-20}$, so the intrinsic fraction is $\sqrt{K_\mathrm{S}} = 2.2\times10^{-10}$. (b) $[\mathrm{V_{Na}'}] \approx [\mathrm{Ca_{Na}^\bullet}] = 1.0\times10^{-5}$, far above the intrinsic level, so $[\mathrm{V_{Cl}^\bullet}] = K_\mathrm{S}/[\mathrm{V_{Na}'}] = 4.8\times10^{-20}/1.0\times10^{-5} = 4.8\times10^{-15}$. The dopant raises the cation vacancies by a factor of $4.5\times10^4$ and suppresses the anion vacancies by the same factor.
:::
:::

::: exercise Diffusion from conductivity {level=2 check="3.0"}
8YSZ has $\sigma = 0.10\ \mathrm{S\,cm^{-1}}$ at $1273\ \mathrm{K}$. Its oxide-ion number density is $5.67\times10^{28}\ \mathrm{m^{-3}}$. Use the Nernst–Einstein relation to estimate the diffusion coefficient of oxide ions. (Enter $D$ in units of $10^{-11}\ \mathrm{m^2\,s^{-1}}$, two significant figures.)
::: solution
$\sigma = 10\ \mathrm{S\,m^{-1}}$, $q = 2e = 3.204\times10^{-19}\ \mathrm{C}$. $D = \sigma k_\mathrm{B}T/(cq^2) = 10 \times 1.381\times10^{-23} \times 1273/(5.67\times10^{28} \times (3.204\times10^{-19})^2) = 1.758\times10^{-19}/(5.82\times10^{-9}) = 3.0\times10^{-11}\ \mathrm{m^2\,s^{-1}}$. Tracer measurements give a somewhat smaller value, because successive hops of a given ion are correlated (Haven ratio below 1).
:::
:::

::: exercise Derive the Frenkel concentration {level=3}
(a) For a crystal with $N$ cation sites and $N_\mathrm{i}$ interstitial sites, write the configurational entropy of $n$ cation Frenkel pairs, minimise $G$ and show that $n^2/[(N - n)(N_\mathrm{i} - n)] = \exp(-\Delta H_\mathrm{F}/k_\mathrm{B}T)$. (b) For AgBr ($\Delta H_\mathrm{F} \approx 1.1\ \mathrm{eV}$, and take $N_\mathrm{i} = 2N$ for the tetrahedral sites of the rock salt structure), estimate $n/N$ at $500\ \mathrm{K}$.
::: solution
(a) $S = k_\mathrm{B}\ln\{[N!/n!(N - n)!][N_\mathrm{i}!/n!(N_\mathrm{i} - n)!]\}$. By Stirling, $\partial S/\partial n = k_\mathrm{B}[\ln(N - n) - \ln n + \ln(N_\mathrm{i} - n) - \ln n]$. Setting $\partial G/\partial n = \Delta H_\mathrm{F} - T\,\partial S/\partial n = 0$ gives $\ln\{(N - n)(N_\mathrm{i} - n)/n^2\} = \Delta H_\mathrm{F}/k_\mathrm{B}T$, which is the result. For $n \ll N, N_\mathrm{i}$: $n = \sqrt{NN_\mathrm{i}}\exp(-\Delta H_\mathrm{F}/2k_\mathrm{B}T)$. (b) $n/N = \sqrt{2}\exp[-1.1/(2 \times 8.617\times10^{-5} \times 500)] = 1.414 \times \exp(-12.77) = 1.414 \times 2.85\times10^{-6} = 4.0\times10^{-6}$. This is high enough at moderate temperatures for interstitial silver ions to carry the current in AgBr and to migrate to latent-image sites in photographic emulsions.
:::
:::

::: exercise Composition of wüstite from its density {level=3 check="0.065"}
A wüstite sample has $a = 4.300\ \text{Å}$ and density $5.70\ \mathrm{g\,cm^{-3}}$. Assuming the iron-vacancy model (4 oxide ions per cell), find $x$ in $\mathrm{Fe_{1-x}O}$ and the fraction of iron present as $\mathrm{Fe^{3+}}$. (Enter $x$ to two significant figures.)
::: hint
The cell mass is $\rho a^3$; subtract the mass of the four oxide ions and divide by the mass of one iron atom.
:::
::: solution
Cell mass $\times N_\mathrm{A} = \rho N_\mathrm{A}a^3 = 5.70 \times 6.022\times10^{23} \times 7.951\times10^{-23} = 272.9\ \mathrm{g\,mol^{-1}}$ per cell. Subtract $4 \times 15.999 = 64.00$: iron $= 208.9\ \mathrm{g\,mol^{-1}}$, i.e. $208.9/55.845 = 3.741$ Fe per 4 O, so $1 - x = 0.935$ and $x = 0.065$. Then $\mathrm{Fe^{3+}}$ per formula unit $= 2x = 0.129$ of $0.935$ Fe: $13.8\ \%$. The answer is sensitive to the density: an error of $0.01\ \mathrm{g\,cm^{-3}}$ shifts $x$ by about $0.003$.
:::
:::
