The homogeneous catalysts of the previous chapters are molecules: every metal atom is identical, every ligand can be named, and every intermediate can, in principle, be observed in solution. Most of the world's catalysis does not work like that. The ammonia that feeds half of humanity is made on porous iron; petrol is cracked on zeolite crystals; car exhausts are cleaned on platinum, palladium and rhodium nanoparticles scattered over alumina; margarine, sulfuric acid, methanol, ethylene oxide and polypropylene are all made on solids. In **heterogeneous catalysis** the catalyst is a separate phase — almost always a solid — and the reaction happens at its surface. Solids are easy to separate from products, survive high temperatures and can be used for years in continuous reactors, which is why industry prefers them. Their price is that the active site is hard to see: on a real catalyst, only a small and changing fraction of surface atoms does the work.

This chapter asks what those sites are and how they are counted. The kinetic framework — adsorption isotherms, the Langmuir–Hinshelwood and Eley–Rideal mechanisms, the Sabatier principle, turnover frequency and the Haber–Bosch cycle — was developed in [[kinetics/surface-kinetics]], and we build on it rather than repeat it. Here we look at the **structure** of active sites on metals, at **supported** metal catalysts and how their dispersion is measured, at the **descriptors** (adsorption energy, d-band centre) that let catalysts be compared and designed, at **zeolites and oxides**, at the **mass-transport** limits that a porous pellet imposes, and at the methods used to **characterise** working catalysts. Throughout, we connect surface chemistry to the molecular organometallic chemistry of this course: chemisorbed CO, surface alkyls and hydrides are organometallic species, and many surface reactions are elementary steps in disguise.

## Active sites on metal surfaces

A metal surface is not uniform. A close-packed face such as fcc(111) consists of **terraces** whose atoms have nine nearest neighbours instead of the twelve of the bulk; **steps** expose atoms with seven neighbours; **kinks** in steps and isolated **adatoms** fewer still. Hugh Taylor proposed in 1925 that catalysis happens at a minority of special "active centres", and surface science has made the idea precise: low-coordinated atoms bind adsorbates more strongly (they have more unsatisfied valence) and often present ensembles of atoms with the right geometry to break a bond. N₂ dissociation on ruthenium, for example, occurs almost exclusively at step sites, where five metal atoms can bind the two nitrogen atoms as the N≡N bond stretches.

::: definition Structure sensitivity {#def-structure-sensitivity}
A catalytic reaction is **structure-insensitive** if its turnover frequency (rate per surface metal atom, [[kinetics/surface-kinetics]]) is nearly independent of particle size and of which crystal face is exposed; it is **structure-sensitive** if the TOF varies strongly with them. The distinction is empirical and was introduced by Michel Boudart in the 1960s. Hydrogenation of alkenes on platinum is a classic structure-insensitive reaction (the active sites are formed from the adsorbed layer itself and are much the same on any face); ammonia synthesis on iron and N₂ or CO dissociation generally are strongly structure-sensitive. On iron single crystals, Somorjai's group found ammonia synthesis rates in the ratio $418 : 25 : 1$ for the (111), (100) and (110) faces (1982): the open (111) face exposes seven-coordinate iron atoms, the close-packed (110) face only eight-coordinate ones.
:::

Structure sensitivity matters because the proportion of each kind of site depends on particle size. A metal particle of a few nanometres has a large fraction of its atoms on edges and corners; a particle of 20 nm is mostly terrace. For a structure-sensitive reaction, the "best" particle size is an optimum to be found, and it is the reason a catalyst's activity can change over months of use as particles sinter and grow.

## Supported metal catalysts and dispersion

Precious metals are expensive, and only surface atoms can work, so catalysts are made with the metal spread as nanoparticles over a high-area **support** — alumina, silica, titania, carbon, ceria — at loadings of typically $0.1$–$5\ \%$ by mass. The support can be more than inert scaffolding: it can stabilise particles against sintering, provide acid or oxygen-storage sites, and interact electronically with the metal (the "strong metal–support interaction" that Samuel Tauster described for titania-supported metals in 1978, in which a reduced oxide layer creeps over the metal and suppresses H₂ and CO chemisorption).

::: definition Dispersion {#def-dispersion}
The **dispersion** $D$ of a supported metal is the fraction of metal atoms that lie at the surface,
$$
D = \frac{N_\text{surface}}{N_\text{total}}, \qquad 0 < D \le 1.
$$
It is measured by **selective chemisorption** of a probe molecule that adsorbs on the metal but not on the support, with an assumed stoichiometry: hydrogen dissociates on Pt, Pd, Ni and Rh and is usually taken as one H atom per surface metal atom ($\mathrm{H/M_s} = 1$); CO usually binds linearly, about one per surface atom, though bridging makes the stoichiometry less certain. Then $D = (\text{moles of H atoms adsorbed})/(\text{moles of metal})$.
:::

::: proposition Dispersion and particle size {#prop-dispersion-size}
For metal particles of diameter $d$ (approximated as spheres, or as cubes with five faces exposed) with atomic volume $v_m$ and average area per surface atom $a_m$,
$$
D = \frac{6\,v_m}{a_m\,d}.
$$ {#eq-dispersion}
For platinum ($M = 195.08\ \mathrm{g\,mol^{-1}}$, $\rho = 21.45\ \mathrm{g\,cm^{-3}}$, $a_m = 8.07\ \text{Å}^2$), this gives $D \approx 1.12/(d/\mathrm{nm})$. The relation holds for $d$ above about $1.5\ \mathrm{nm}$; for smaller clusters $D$ approaches 1 and the continuum picture fails.
:::

::: proof
A sphere of diameter $d$ has volume $\pi d^3/6$ and surface area $\pi d^2$. The number of atoms is volume over atomic volume, $N_\text{total} = \pi d^3/(6v_m)$; the number of surface atoms is area over area per surface atom, $N_\text{surface} = \pi d^2/a_m$. The ratio is
$$
D = \frac{\pi d^2/a_m}{\pi d^3/(6v_m)} = \frac{6v_m}{a_m d}.
$$
A cube of edge $d$ attached to the support by one face exposes five faces, area $5d^2$, and contains $d^3/v_m$ atoms; the ratio is $5v_m/(a_m d)$, close to the same form, and with the conventional choice of an "equivalent" diameter the factor 6 is usually retained. For platinum, $v_m = M/(\rho N_\mathrm{A}) = 195.08/(21.45 \times 6.022\times10^{23})\ \mathrm{cm^3} = 1.510\times10^{-23}\ \mathrm{cm^3} = 15.10\ \text{Å}^3$, so $D = 6 \times 15.10/(8.07\,d/\text{Å}) = 11.2/(d/\text{Å}) = 1.12/(d/\mathrm{nm})$. $\blacksquare$
:::

::: example Dispersion and turnover frequency from chemisorption {#ex-chemisorption}
A $1.00\,\%$ (by mass) $\mathrm{Pt/Al_2O_3}$ catalyst adsorbs $20.0\ \mu\mathrm{mol}$ of $\mathrm{H_2}$ per gram of catalyst (irreversible uptake, after subtracting adsorption on the support). (a) Find the dispersion and the mean particle diameter, assuming $\mathrm{H/Pt_s} = 1$. (b) In a test reaction the catalyst converts $5.0\ \mu\mathrm{mol}$ of substrate per second per gram. What is the TOF?
::: solution
(a) Platinum per gram: $0.0100\ \mathrm{g}/195.08\ \mathrm{g\,mol^{-1}} = 51.3\ \mu\mathrm{mol}$. Hydrogen *atoms* adsorbed: $2 \times 20.0 = 40.0\ \mu\mathrm{mol}$, equal to the number of surface Pt atoms. So
$$
D = \frac{40.0}{51.3} = 0.780, \qquad d = \frac{1.12\ \mathrm{nm}}{0.780} = 1.44\ \mathrm{nm}.
$$
(b) The TOF is the rate per surface site: $\mathrm{TOF} = 5.0\ \mu\mathrm{mol\,s^{-1}\,g^{-1}}/40.0\ \mu\mathrm{mol\,g^{-1}} = 0.125\ \mathrm{s^{-1}}$. Note how many assumptions this number carries: the H/Pt stoichiometry, that every surface atom is equally active, and that the support adsorbs nothing. For a structure-sensitive reaction, a TOF "per surface atom" averages over sites of very different activity, and two catalysts with the same TOF may have quite different active sites.
:::
:::

## Descriptors: why some metals are better than others

The Sabatier principle ([[kinetics/surface-kinetics]]) says that a good catalyst binds the key intermediate neither too weakly (no activation) nor too strongly (the surface is poisoned by its own intermediates). Two empirical relations turn this idea into numbers.

The first is the **Brønsted–Evans–Polanyi (BEP) relation**: for a family of similar surface reactions — say, dissociation of N₂ on different metals — the activation energy varies linearly with the reaction energy, $E_\mathrm{a} = E_0 + \alpha\,\Delta E$, with $0 < \alpha < 1$. The second is the observation of **scaling relations**: adsorption energies of related species (N, NH, NH₂; C, CH, CH₂, CH₃) are linear functions of each other across metals, so a single **descriptor** — often the adsorption energy of one atom — predicts all of them. These regularities were established in large part from density functional calculations by Jens Nørskov's group in the 1990s and 2000s ([[computational-chemistry/density-functional-theory]]).

::: proposition The Sabatier volcano from a BEP relation {#prop-volcano}
Consider a catalytic reaction with two consecutive steps on the surface: activation of the reactant to form an adsorbed intermediate, with activation energy given by the BEP relation $E_1 = E_0 + \alpha\,\Delta E$ (where $\Delta E < 0$ is the adsorption energy of the intermediate; more negative means stronger binding), and removal of the intermediate, with activation energy $E_2 = -\Delta E$ (desorption or reaction of the bound species, assumed to scale with the binding strength). If the overall rate is limited by the slower step, with a common prefactor $\nu$, then
$$
\ln\frac{r}{\nu} = \frac{1}{RT}\min\!\left(\Delta E,\ -E_0 - \alpha\,\Delta E\right),
$$ {#eq-volcano}
a "volcano" with maximum at the optimal binding energy $\Delta E^* = -E_0/(1+\alpha)$.
:::

::: proof
The two rates are $r_1 = \nu e^{-E_1/RT}$ and $r_2 = \nu e^{-E_2/RT}$. When steps are in series and one is much slower, the overall rate is approximately that of the slower one, $r = \min(r_1, r_2)$. Taking logarithms, $\ln(r/\nu) = \min(-E_1, -E_2)/RT = \min(-E_0 - \alpha\Delta E,\ \Delta E)/RT$. For weak binding ($\Delta E$ near zero) the first argument is the smaller: activation limits the rate, and it improves as binding strengthens (slope $-\alpha/RT$ in $\Delta E$, i.e. the rate rises as $\Delta E$ becomes more negative). For strong binding the second is smaller: removal limits the rate, which falls as binding strengthens (slope $1/RT$). The two lines cross where $\Delta E = -E_0 - \alpha\Delta E$, i.e. $\Delta E^* = -E_0/(1 + \alpha)$, the top of the volcano. A real volcano is rounded at the top because both steps contribute there, and coverage effects shift the lines, but the linear branches and the existence of an optimum follow from the two assumptions alone. $\blacksquare$
:::

::: widget plot
f: min(x, -(e + a*x))/9.574
x: -200, 0
y: -22, 0
sliders: e=100:50:150:1; a=0.5:0.2:0.9:0.05
labels: \log_{10}(r/\nu)
caption: A Sabatier volcano from [[#eq-volcano]] at $T = 500\ \mathrm{K}$: $\log_{10}(r/\nu)$ against the adsorption energy $\Delta E$ of the key intermediate (in $\mathrm{kJ\,mol^{-1}}$; left is stronger binding). The right branch is limited by activation (BEP line with intercept $E_0$ and slope $\alpha$ on the sliders), the left by removal of the over-bound intermediate. With $E_0 = 100\ \mathrm{kJ\,mol^{-1}}$ and $\alpha = 0.5$ the optimum is at $\Delta E^* = -66.7\ \mathrm{kJ\,mol^{-1}}$. Metals plotted on such a diagram for ammonia synthesis place Ru and Fe near the top, with Mo and Re (too strong) on the left branch and Ni, Pt (too weak) on the right — the ranking found experimentally.
:::

::: example Designing for the top of the volcano {#ex-volcano}
For a reaction obeying [[#prop-volcano]] with $E_0 = 100\ \mathrm{kJ\,mol^{-1}}$ and $\alpha = 0.50$ at $500\ \mathrm{K}$: (a) find the optimal adsorption energy; (b) compare the rates of a metal with $\Delta E = -40\ \mathrm{kJ\,mol^{-1}}$ and one with $\Delta E = -100\ \mathrm{kJ\,mol^{-1}}$ with the rate at the optimum.
::: solution
(a) $\Delta E^* = -E_0/(1+\alpha) = -100/1.50 = -66.7\ \mathrm{kJ\,mol^{-1}}$. At the optimum both barriers equal $66.7\ \mathrm{kJ\,mol^{-1}}$.

(b) $RT = 4.157\ \mathrm{kJ\,mol^{-1}}$. For $\Delta E = -40$: the activation barrier is $E_1 = 100 - 0.50 \times 40 = 80\ \mathrm{kJ\,mol^{-1}}$ and the removal barrier $40$; the slower step has barrier $80$, so $r/r^* = e^{-(80 - 66.7)/4.157} = e^{-3.21} = 0.040$. For $\Delta E = -100$: $E_1 = 50$, $E_2 = 100$; the slower step has barrier $100$, so $r/r^* = e^{-(100 - 66.7)/4.157} = e^{-8.02} = 3.3\times10^{-4}$. Binding $33\ \mathrm{kJ\,mol^{-1}}$ too strongly costs more than binding $27\ \mathrm{kJ\,mol^{-1}}$ too weakly, because the strong-binding branch is steeper (slope $1$ against $\alpha = 0.5$). Alloying a strongly binding metal with a weakly binding one, so that its adsorption energy moves towards the optimum, is a standard design strategy — for example, cobalt–molybdenum nitrides for ammonia synthesis sit near the top although neither metal alone does.
:::
:::

Why do metals differ in binding strength? Bjørk Hammer and Jens Nørskov's **d-band model** (1995) attributes it largely to the energy of the metal's $d$ states relative to the Fermi level. An adsorbate orbital interacts with the narrow metal $d$ band to form bonding and antibonding states; the higher the d-band centre, the higher the antibonding states and the fewer of them are filled, so bonding is stronger. Moving left across the transition series raises the d-band centre and strengthens binding (W, Mo bind N and O very strongly), moving right lowers it, and gold, whose filled $d$ band lies deep below the Fermi level and whose antibonding adsorbate states are full, binds almost nothing — the noblest of metals. Strain, alloying and low coordination shift the d-band centre and so tune reactivity. The model is a surface analogue of the synergic bonding of [[organometallics-catalysis/ligands-complexes]]: chemisorbed CO on a metal surface is bound by σ donation and π back-donation exactly as in a carbonyl complex, and its infrared stretching wavenumber falls from atop to bridge to hollow sites just as it does from terminal to $\mu_2$ to $\mu_3$ carbonyls.

## Zeolites and oxides

**Zeolites** are crystalline aluminosilicates whose frameworks of corner-sharing $\mathrm{SiO_4}$ and $\mathrm{AlO_4}$ tetrahedra enclose channels and cages of molecular size ([[main-group/groups-13-14]], [[materials-chemistry/porous-materials]]). Each aluminium in the framework carries a negative charge; when that charge is balanced by a proton, the bridging hydroxyl $\mathrm{Si{-}O(H){-}Al}$ is a **Brønsted acid site** comparable in strength with concentrated sulfuric acid. Zeolites are the acid catalysts of fluid catalytic cracking (zeolite Y, from the early 1960s), of isomerisation and alkylation, and of methanol-to-hydrocarbons chemistry (ZSM-5, patented by Mobil in 1972).

Their distinctive property is **shape selectivity**. Only molecules small enough to enter the pores reach the acid sites (reactant selectivity); only products small enough to leave escape (product selectivity); and transition states too bulky for the cavities are suppressed (transition-state selectivity). ZSM-5 has channels about $0.55\ \mathrm{nm}$ across; in the alkylation of toluene it produces mainly the slim 1,4-dimethylbenzene (*para*-xylene), because the *ortho* and *meta* isomers diffuse out far more slowly and are isomerised inside the crystals before they escape.

::: example Acid-site density of H-ZSM-5 {#ex-zsm5}
The unit cell of ZSM-5 contains $96$ tetrahedral (T) atoms and $192$ oxygen atoms. For the proton form with $\mathrm{Si/Al} = 25$, find the number of Al per unit cell, the molar mass of the unit cell $\mathrm{H_nAl_nSi_{96-n}O_{192}}$, and the theoretical density of Brønsted acid sites in $\mathrm{mmol\,g^{-1}}$.
::: solution
With $\mathrm{Si/Al} = 25$, $n_\mathrm{Si} = 25\,n_\mathrm{Al}$ and $n_\mathrm{Si} + n_\mathrm{Al} = 96$, so $n = n_\mathrm{Al} = 96/26 = 3.69$ per unit cell. Molar mass:
$$
M = 3.69\,(1.008 + 26.982) + (96 - 3.69)(28.085) + 192\,(15.999) = 103.3 + 2592.6 + 3071.8 = 5768\ \mathrm{g\,mol^{-1}}.
$$
One proton per Al gives $3.69\ \mathrm{mol}$ of acid sites per $5768\ \mathrm{g}$:
$$
\frac{3.69}{5768}\ \mathrm{mol\,g^{-1}} = 6.40\times10^{-4}\ \mathrm{mol\,g^{-1}} = 0.640\ \mathrm{mmol\,g^{-1}}.
$$
Measured values (by temperature-programmed desorption of ammonia or by titration with amines) are usually somewhat lower, because some aluminium sits outside the framework and some protons are lost on calcination. Raising Si/Al lowers the number of acid sites but makes each one slightly stronger and the framework more hydrophobic and stable.
:::
:::

**Metal oxides** catalyse oxidations by a mechanism first proposed by Pieter Mars and Dirk van Krevelen in 1954: the substrate is oxidised by **lattice oxygen** of the oxide, leaving a reduced site (an oxygen vacancy and reduced metal cations), and gas-phase $\mathrm{O_2}$ then reoxidises the site. The two half-reactions run at different places and can be studied separately with isotopically labelled $^{18}\mathrm{O_2}$: lattice $^{16}\mathrm{O}$ appears in the product first. Vanadium(V) oxide in the contact process ($\mathrm{SO_2 \rightarrow SO_3}$; strictly a molten-salt catalyst under working conditions), bismuth molybdates in propene oxidation and ammoxidation, and ceria in the oxygen-storage component of the **three-way catalyst** of petrol cars all work this way. The three-way catalyst simultaneously oxidises CO and hydrocarbons and reduces NO over Pt, Pd and Rh on an alumina–ceria washcoat, but only within a narrow window around the stoichiometric air-to-fuel ratio; ceria's reversible $\mathrm{Ce^{4+}/Ce^{3+}}$ redox stores and releases oxygen to widen that window.

::: warning Catalysts are not unchanged {#warn-catalyst-change}
The definition "a catalyst is not consumed" is true of the *overall* reaction and false of the catalyst's *structure*. Under reaction conditions metal particles reshape, facet, sinter and sometimes dissolve and re-form; surfaces are covered by adsorbates, carbon deposits ("coke") and oxides; promoters migrate; oxides are partly reduced; zeolites lose framework aluminium. A catalyst characterised in a vacuum chamber or after removal from the reactor may not resemble the working catalyst. This "pressure gap" and "materials gap" between surface science and practice is why modern catalyst research emphasises **in situ** and **operando** characterisation — measuring structure while the catalyst is turning over, under realistic temperature and pressure — and why catalyst *deactivation* (sintering, poisoning by sulfur, coking) is as important a subject as activity.
:::

## Mass transport inside a pellet

An industrial catalyst is a porous pellet or extrudate a few millimetres across, in which the active surface is mostly *inside* the pores. Reactants must diffuse in and products out; if the intrinsic reaction is fast compared with diffusion, the interior is starved of reactant and only the outer shell works.

::: proposition The Thiele modulus and effectiveness factor {#prop-thiele}
For an isothermal first-order reaction with rate constant $k$ (per unit pellet volume) in a slab-shaped pellet of half-thickness $L$, with effective diffusion coefficient $D_\text{eff}$ in the pores and surface concentration $c_s$, the steady-state concentration profile is $c(x) = c_s\cosh(\phi x/L)/\cosh\phi$, where
$$
\phi = L\sqrt{\frac{k}{D_\text{eff}}}
$$
is the **Thiele modulus**, and the **effectiveness factor** — the actual rate divided by the rate if the whole pellet were at $c_s$ — is
$$
\eta = \frac{\tanh\phi}{\phi}.
$$ {#eq-thiele}
For $\phi \ll 1$, $\eta \to 1$ (kinetic control); for $\phi \gg 1$, $\eta \to 1/\phi$ (strong diffusion limitation). For a sphere of radius $R$ with $\phi = R\sqrt{k/D_\text{eff}}$, the result is $\eta = (3/\phi^2)(\phi\coth\phi - 1)$.
:::

::: proof
In a thin slice of the slab at distance $x$ from the centre, diffusion in minus diffusion out equals consumption by reaction. With Fick's law this gives, at steady state,
$$
D_\text{eff}\frac{\mathrm{d}^2c}{\mathrm{d}x^2} = kc,
$$
with boundary conditions $c(L) = c_s$ at the surface and $\mathrm{d}c/\mathrm{d}x = 0$ at the centre (symmetry). The general solution is $c = A\cosh(x\sqrt{k/D_\text{eff}}) + B\sinh(x\sqrt{k/D_\text{eff}})$; the symmetry condition sets $B = 0$ and the surface condition $A = c_s/\cosh\phi$. The total rate per unit area of slab face equals the diffusive flux in through the surface:
$$
r_\text{obs} = D_\text{eff}\left.\frac{\mathrm{d}c}{\mathrm{d}x}\right|_{x = L} = D_\text{eff}\,\frac{c_s\phi}{L}\tanh\phi.
$$
Without diffusion limitation the rate would be $kc_sL$ for the half-slab. The ratio is
$$
\eta = \frac{D_\text{eff}c_s\phi\tanh\phi/L}{kc_sL} = \frac{\phi\tanh\phi}{kL^2/D_\text{eff}} = \frac{\phi\tanh\phi}{\phi^2} = \frac{\tanh\phi}{\phi}.
$$
The limits follow from $\tanh\phi \approx \phi$ for small $\phi$ and $\tanh\phi \to 1$ for large $\phi$. The spherical result comes from the same balance written in spherical coordinates, $D_\text{eff}\,r^{-2}(r^2c')' = kc$, whose regular solution is $c \propto \sinh(\phi r/R)/r$. The analysis, due to Ernest Thiele (1939), assumes isothermal conditions and first-order kinetics. $\blacksquare$
:::

::: widget plot
f: tanh(x)/x; 3/x^2*(x/tanh(x) - 1); 1/x
x: 0.05, 15
y: 0, 1.05
labels: \text{slab: }\eta = \tanh\phi/\phi; \text{sphere: }\eta = (3/\phi^2)(\phi\coth\phi - 1); \text{asymptote } 1/\phi
caption: Effectiveness factor against Thiele modulus $\phi$ for a slab and a sphere ([[#prop-thiele]]), with the strong-diffusion asymptote $1/\phi$ (for the sphere the asymptote is $3/\phi$ with the radius as length). Below $\phi \approx 0.3$ the whole pellet works and $\eta$ is close to 1; above $\phi \approx 3$ only an outer shell of thickness about $L/\phi$ is active. Because $\phi \propto L$, halving the pellet size doubles $\eta$ in the diffusion-limited regime — which is why industrial catalysts are made as small particles, thin "egg-shell" coatings or shaped extrudates, trading against the pressure drop of a packed bed.
:::

::: example Is the reaction diffusion-limited? {#ex-thiele}
A first-order reaction has an intrinsic rate constant $k = 10\ \mathrm{s^{-1}}$ (per unit pellet volume) and an effective diffusion coefficient of $1.0\times10^{-7}\ \mathrm{m^2\,s^{-1}}$ in the pores. Calculate $\phi$ and $\eta$ for slab pellets of half-thickness $1.0\ \mathrm{mm}$ and $0.10\ \mathrm{mm}$. What happens to the apparent activation energy in the strongly limited regime?
::: solution
$\sqrt{k/D_\text{eff}} = \sqrt{10/1.0\times10^{-7}}\ \mathrm{m^{-1}} = 1.0\times10^{4}\ \mathrm{m^{-1}}$.
For $L = 1.0\ \mathrm{mm}$: $\phi = (1.0\times10^{-3})(1.0\times10^{4}) = 10$, and $\eta = \tanh 10/10 = 0.100$: only a tenth of the catalyst's potential is used.
For $L = 0.10\ \mathrm{mm}$: $\phi = 1.0$, $\eta = \tanh 1.0/1.0 = 0.762$.
In the strongly limited regime, $r_\text{obs} = \eta k c_s \approx (1/\phi)kc_s \propto \sqrt{kD_\text{eff}}$. Since $k$ follows Arrhenius with activation energy $E_\mathrm{a}$ and $D_\text{eff}$ varies only weakly with temperature, the observed activation energy is about $E_\mathrm{a}/2$. A measured activation energy that halves at higher temperatures (where $k$, and hence $\phi$, becomes large) is a classic diagnostic of pore-diffusion limitation, as is a rate that depends on pellet size. Intrinsic kinetics must be measured on crushed catalyst, where $\phi$ is small.
:::
:::

## How working catalysts are characterised

No single method sees an active site; catalyst chemists combine several, each answering a different question.

| question | methods | what they give |
|---|---|---|
| How much surface? | $\mathrm{N_2}$ physisorption (BET, [[kinetics/surface-kinetics]]) | total surface area, pore volume and size distribution |
| How much *metal* surface? | $\mathrm{H_2}$, CO or $\mathrm{N_2O}$ chemisorption | dispersion, metal area ([[#ex-chemisorption]]) |
| What phase and particle size? | X-ray diffraction, Scherrer analysis; electron microscopy (TEM, STEM) | crystalline phases; crystallite size; particle size distribution and shape |
| What oxidation state, what neighbours? | X-ray photoelectron spectroscopy (XPS); X-ray absorption (XANES, EXAFS) | surface composition and oxidation states; coordination numbers and bond lengths, also *operando* |
| What is adsorbed, and where? | infrared spectroscopy of CO or pyridine; temperature-programmed desorption (TPD), reduction (TPR) | binding sites (atop vs bridge CO); Brønsted vs Lewis acid sites (pyridinium band near $1545\ \mathrm{cm^{-1}}$, Lewis-bound pyridine near $1450\ \mathrm{cm^{-1}}$); site strength distributions; reducibility |
| What does the surface look like? | scanning tunnelling microscopy, LEED on model single crystals | atomic structure of terraces, steps, adsorbate layers |

The **Scherrer equation** estimates the mean crystallite size from the broadening of a diffraction peak ([[materials-chemistry/diffraction]]): $\tau = K\lambda/(\beta\cos\theta)$, where $\lambda$ is the X-ray wavelength, $\beta$ the peak width (full width at half maximum, in radians, after subtracting instrumental broadening), $\theta$ the Bragg angle and $K \approx 0.9$ a shape factor.

::: example Crystallite size by XRD {#ex-scherrer}
The Pt(111) reflection of a supported platinum catalyst, measured with Cu Kα radiation ($\lambda = 0.15406\ \mathrm{nm}$), appears at $2\theta = 39.8^\circ$ with a corrected width of $0.80^\circ$. Estimate the crystallite size with $K = 0.9$, and compare with the chemisorption estimate of $1.44\ \mathrm{nm}$ in [[#ex-chemisorption]] for a different sample. Why might the two methods disagree on the same sample?
::: solution
Convert the width to radians: $\beta = 0.80 \times \pi/180 = 0.01396\ \mathrm{rad}$. With $\theta = 19.9^\circ$, $\cos\theta = 0.9403$:
$$
\tau = \frac{0.9 \times 0.15406\ \mathrm{nm}}{0.01396 \times 0.9403} = 10.6\ \mathrm{nm}.
$$
This sample has much larger crystallites (dispersion about $1.12/10.6 \approx 0.11$). On the *same* sample, the methods often disagree because they weight particles differently: XRD sees only crystalline domains large enough to give a diffraction peak (particles below about $2\ \mathrm{nm}$ are nearly invisible), and gives a volume-weighted average dominated by the largest crystallites; chemisorption counts surface atoms and is dominated by the smallest particles. A broad size distribution, amorphous particles, or a particle made of several crystalline domains all produce disagreement. TEM, which measures individual particles, is used to reconcile the two.
:::
:::

::: quiz
A catalyst's activity per gram doubles when the pellets are crushed from 3 mm to 0.3 mm, but does not change on further crushing to 0.1 mm. What does this show?
- [x] The 3 mm pellets were limited by pore diffusion; at 0.3 mm the effectiveness factor is close to 1 and the intrinsic kinetics are being measured.
- [ ] Crushing creates new active sites, so the 0.1 mm powder should be even more active.
- [ ] The reaction is structure-insensitive.
- [ ] The reaction is limited by external heat transfer at all sizes.
::: solution
A rate that depends on pellet size signals internal mass-transport limitation ([[#prop-thiele]]); once the rate becomes independent of size, $\phi$ is small and $\eta \approx 1$. Crushing does not change the specific surface area significantly (almost all of it is inside the pores), so new sites are not the explanation. Structure sensitivity concerns the atomic nature of sites, not pellet size.
:::
:::

## Where this leads

This chapter closes the course by joining molecular organometallic chemistry to the solids that do most industrial catalysis. The kinetics of surface reactions, the Langmuir and BET isotherms, the Sabatier principle and the Haber–Bosch process are in [[kinetics/surface-kinetics]]; zeolites and other porous solids are treated structurally in [[materials-chemistry/porous-materials]]; diffraction and electronic structure of solids in [[materials-chemistry/diffraction]] and [[materials-chemistry/electronic-structure-solids]]; density functional descriptors in [[computational-chemistry/density-functional-theory]]. Heterogeneous catalysis in the chemical industry — ammonia, sulfuric acid, methanol, cracking and reforming — is surveyed in [[green-chemistry/industrial-inorganic]] and [[green-chemistry/petrochemicals]], and catalysis for energy (fuel cells, electrolysers) in [[electrochemistry/fuel-cells-electrolysis]]. The bridge between the two worlds is growing: single-atom catalysts, metal–organic frameworks and surface organometallic chemistry graft well-defined molecular sites onto solid supports, aiming for the selectivity of a homogeneous catalyst with the robustness of a solid.

::: history
Johann Wolfgang Döbereiner's lamp of 1823, in which hydrogen ignites over platinum sponge, was the first practical use of heterogeneous catalysis, and Jöns Jacob Berzelius coined the word *catalysis* in 1835. Paul Sabatier and Jean-Baptiste Senderens discovered nickel-catalysed hydrogenation in 1897, and Sabatier shared the 1912 Nobel Prize; Wilhelm Normann's fat hardening (1902) and the Haber–Bosch ammonia process, in production at BASF's Oppau plant from 1913, made surface catalysis an industry. Irving Langmuir's adsorption studies (1915–18) earned the 1932 Nobel Prize, Hugh Taylor introduced active centres in 1925, Juro Horiuti and Michael Polanyi proposed their hydrogenation mechanism in 1934, and Eugene Houdry's catalytic cracking went into production in 1937. Ernest Thiele analysed pore diffusion in 1939; Pieter Mars and Dirk van Krevelen described oxidation by lattice oxygen in 1954; zeolite cracking catalysts were introduced in the early 1960s and ZSM-5 was patented in 1972. Samuel Tauster reported strong metal–support interactions in 1978, Bjørk Hammer and Jens Nørskov the d-band model in 1995, and Gerhard Ertl received the 2007 Nobel Prize for his surface-science studies of chemical processes on solid surfaces, including ammonia synthesis and CO oxidation.
:::

::: summary
- Heterogeneous catalysts work at surfaces; low-coordinated atoms (steps, kinks, edges) are often the active sites, and structure-sensitive reactions (N₂ dissociation, NH₃ synthesis: Fe(111) : (100) : (110) ≈ 418 : 25 : 1) depend strongly on which sites are exposed.
- Supported catalysts spread metal as nanoparticles; dispersion $D = N_\text{surface}/N_\text{total}$ is measured by selective chemisorption and relates to size by $D = 6v_m/(a_md)$ ($\approx 1.12/d_\mathrm{nm}$ for Pt). TOF is rate per surface site.
- BEP and scaling relations make one adsorption energy a descriptor; a rate limited by activation on one side and product removal on the other gives a Sabatier volcano with optimum $\Delta E^* = -E_0/(1+\alpha)$. The d-band centre explains trends in binding strength.
- Zeolites are shape-selective solid acids (bridging Si–O(H)–Al sites; acid density from Si/Al); oxides oxidise by the Mars–van Krevelen mechanism using lattice oxygen.
- In porous pellets, $\phi = L\sqrt{k/D_\text{eff}}$ and $\eta = \tanh\phi/\phi$ (slab); strong diffusion limitation gives $\eta \approx 1/\phi$, a size-dependent rate and a halved apparent activation energy.
- Characterisation combines physisorption, chemisorption, XRD (Scherrer), electron microscopy, XPS, X-ray absorption, IR of probe molecules and temperature-programmed methods — ideally *operando*, because working catalysts change.
:::

## Exercises

::: exercise Dispersion from particle size {level=1 check="0.37"}
Estimate the dispersion of platinum particles $3.0\ \mathrm{nm}$ in diameter using $D \approx 1.12/(d/\mathrm{nm})$. (Enter $D$ to two significant figures.)
::: solution
$D = 1.12/3.0 = 0.373 \approx 0.37$: just over a third of the atoms are on the surface.
:::
:::

::: exercise Turnover frequency per site {level=1 check="0.125"}
A catalyst has $40.0\ \mu\mathrm{mol}$ of surface metal atoms per gram and converts $5.0\ \mu\mathrm{mol}$ of reactant per second per gram. What is the TOF? (Enter the TOF in $\mathrm{s^{-1}}$.)
::: solution
$\mathrm{TOF} = 5.0/40.0 = 0.125\ \mathrm{s^{-1}}$ ([[#ex-chemisorption]]).
:::
:::

::: exercise Effectiveness factor {level=1 check="0.762"}
For a slab-shaped pellet with Thiele modulus $\phi = 1.0$, what is the effectiveness factor for a first-order reaction? (Enter $\eta$ to three significant figures.)
::: solution
$\eta = \tanh(1.0)/1.0 = 0.762$.
:::
:::

::: exercise Scherrer size {level=2 check="10.6"}
A diffraction peak at $2\theta = 39.8^\circ$ measured with $\lambda = 0.15406\ \mathrm{nm}$ has a corrected width of $0.80^\circ$. Using $K = 0.9$, estimate the crystallite size. (Enter the size in nm, to three significant figures.)
::: solution
$\tau = 0.9 \times 0.15406/(0.01396 \times \cos 19.9^\circ) = 0.13865/(0.01396 \times 0.9403) = 10.6\ \mathrm{nm}$ ([[#ex-scherrer]]).
:::
:::

::: exercise Acid sites in a high-silica zeolite {level=2 check="0.406"}
Calculate the theoretical Brønsted acid-site density of H-ZSM-5 with $\mathrm{Si/Al} = 40$ (96 T atoms and 192 O atoms per unit cell; atomic masses H 1.008, Al 26.982, Si 28.085, O 15.999). (Enter the density in $\mathrm{mmol\,g^{-1}}$, to three significant figures.)
::: solution
$n_\mathrm{Al} = 96/41 = 2.341$ per unit cell. $M = 2.341(1.008 + 26.982) + 93.659(28.085) + 192(15.999) = 65.5 + 2630.4 + 3071.8 = 5767.7\ \mathrm{g\,mol^{-1}}$. Density $= 2.341/5767.7\ \mathrm{mol\,g^{-1}} = 4.06\times10^{-4}\ \mathrm{mol\,g^{-1}} = 0.406\ \mathrm{mmol\,g^{-1}}$. (The unit-cell mass hardly changes with Si/Al, because Al + H weighs almost the same as Si.)
:::
:::

::: exercise The volcano optimum {level=2 check="-62.5"}
For a reaction obeying [[#prop-volcano]] with $E_0 = 100\ \mathrm{kJ\,mol^{-1}}$ and $\alpha = 0.60$, find the optimal adsorption energy of the intermediate. (Enter $\Delta E^*$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta E^* = -E_0/(1 + \alpha) = -100/1.60 = -62.5\ \mathrm{kJ\,mol^{-1}}$. A larger $\alpha$ (a "later" transition state for activation) moves the optimum towards weaker binding.
:::
:::

::: exercise Pore diffusion and apparent activation energy {level=3}
Starting from [[#eq-thiele]], show that in the strong-diffusion limit the observed rate per unit pellet volume is $r_\text{obs} \approx c_s\sqrt{kD_\text{eff}}/L$, and hence that the apparent activation energy is $E_\text{app} \approx (E_\mathrm{a} + E_\mathrm{D})/2$, where $E_\mathrm{D}$ is the (small) activation energy of pore diffusion. Explain also why the apparent reaction order of an $n$th-order reaction becomes $(n+1)/2$ in this limit.
::: hint
For the order, note that the generalised Thiele modulus for an $n$th-order reaction contains $c_s^{(n-1)/2}$.
:::
::: solution
For $\phi \gg 1$, $\eta \approx 1/\phi$, so $r_\text{obs} = \eta k c_s \approx kc_s/\phi = kc_s/(L\sqrt{k/D_\text{eff}}) = c_s\sqrt{kD_\text{eff}}/L$. Write $k = A e^{-E_\mathrm{a}/RT}$ and $D_\text{eff} = D_0e^{-E_\mathrm{D}/RT}$; then
$$
r_\text{obs} \propto \sqrt{AD_0}\,e^{-(E_\mathrm{a} + E_\mathrm{D})/2RT},
$$
and the apparent activation energy, $-R\,\mathrm{d}\ln r_\text{obs}/\mathrm{d}(1/T)$, is $(E_\mathrm{a} + E_\mathrm{D})/2 \approx E_\mathrm{a}/2$ because $E_\mathrm{D}$ is usually only a few $\mathrm{kJ\,mol^{-1}}$. For an $n$th-order reaction, $r = kc^n$, the balance $D_\text{eff}c'' = kc^n$ has a generalised Thiele modulus $\phi_n = L\sqrt{\tfrac{n+1}{2}\,kc_s^{\,n-1}/D_\text{eff}}$ and the same large-$\phi$ limit $\eta \approx 1/\phi_n$. Then $r_\text{obs} = \eta kc_s^n \propto kc_s^n/(c_s^{(n-1)/2}\sqrt{k}) = \sqrt{k}\,c_s^{(n+1)/2}$: the apparent order is $(n+1)/2$. A first-order reaction stays first order, a second-order one appears to be of order 1.5, and a zero-order one of order 0.5. Diffusion limitation thus distorts both activation energies and orders — another reason to measure intrinsic kinetics on small particles.
:::
:::

::: exercise Bridging molecules and surfaces {level=3}
Chemisorbed CO on a Pt(111) surface shows infrared bands near $2090\ \mathrm{cm^{-1}}$ at low coverage on some samples and near $1850\ \mathrm{cm^{-1}}$ on others. (a) Assign the bands to atop and bridging CO, using the molecular analogy of [[organometallics-catalysis/ligands-complexes]]. (b) Using the harmonic estimate $k = \mu(\tilde\nu/130.28)^2$ with $\mu = 6.856\ \mathrm{u}$, compare the C–O force constants in the two sites. (c) Explain, in terms of the d-band model, why CO binds much more weakly to gold surfaces, and why small gold particles on oxide supports are nevertheless active for CO oxidation (Masatake Haruta's discovery of the late 1980s).
::: solution
(a) A CO bound to one metal atom (atop, terminal) receives back-donation from one metal and absorbs near $2100$–$2000\ \mathrm{cm^{-1}}$; a CO bridging two metal atoms receives back-donation from both and absorbs near $1900$–$1800\ \mathrm{cm^{-1}}$. So $2090\ \mathrm{cm^{-1}}$ is atop CO and $1850\ \mathrm{cm^{-1}}$ bridging CO — exactly the terminal/μ₂ distinction in metal carbonyl clusters.
(b) Atop: $k = 6.856 \times (2090/130.28)^2 = 6.856 \times 257.4 = 1765\ \mathrm{N\,m^{-1}}$. Bridging: $k = 6.856 \times (1850/130.28)^2 = 6.856 \times 201.6 = 1383\ \mathrm{N\,m^{-1}}$. The bridging CO bond is about $22\,\%$ softer, reflecting greater population of the $2\pi^*$ orbitals.
(c) Gold's $5d$ band lies well below the Fermi level. The antibonding states formed between the CO $5\sigma$ orbital and the gold $d$ band lie below the Fermi level and are filled, cancelling much of the σ bond, and back-donation from the deep $d$ band into $2\pi^*$ is weak; extended gold surfaces therefore bind CO weakly and do not dissociate $\mathrm{O_2}$. Small gold particles (a few nanometres) on reducible oxides such as $\mathrm{TiO_2}$ or $\mathrm{Fe_2O_3}$ are different: their low-coordinated edge and corner atoms have higher-lying $d$ states and bind CO more strongly, and the metal–oxide perimeter provides sites where $\mathrm{O_2}$ is activated (possibly with lattice oxygen in a Mars–van Krevelen-like step). Activity appears only below a critical particle size — a striking case of structure sensitivity, and a reminder that "noble" describes bulk metals, not nanoparticles.
:::
:::
