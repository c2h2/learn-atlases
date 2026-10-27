Hydrogen and the s-block metals are the simplest chemistry in the periodic table and, for that reason, the best place to watch the toolkit of the first four chapters at work. Hydrogen has one electron and no core; lithium to caesium have one valence electron outside a noble-gas core, and beryllium to barium have two. There are no lone pairs to place, no multiple bonds to argue about and almost no choice of oxidation state. Everything that distinguishes one of these elements from another — why lithium is the most reducing metal in water yet reacts with it most gently, why potassium burns to a superoxide while lithium gives a simple oxide, why barium sulfate is insoluble enough to swallow as an X-ray contrast agent while magnesium sulfate is a laxative salt, why sodium dissolves in liquid ammonia to give a blue solution of free electrons — follows from size, ionisation energy, lattice energy and hydration energy. This chapter derives those facts rather than listing them. The periodic quantities are those of [[main-group/periodic-trends]]; the lattice-energy machinery is that of [[bonding-structure/ionic-bonding]].

## Hydrogen: the element without a group

Hydrogen fits nowhere and everywhere. Its $1s^1$ configuration puts it over lithium; its need for one electron to complete a shell puts it over fluorine; its electronegativity, $\chi = 2.20$, puts it midway between boron ($2.04$) and carbon ($2.55$). Its ionisation energy, $1312\ \mathrm{kJ\,mol^{-1}}$, is closer to chlorine's ($1251$) than to lithium's ($520$), which is why "$\mathrm{H^+}$" never exists as a free ion in a condensed phase: the bare proton, $10^{-15}\ \mathrm{m}$ across, is always attached to a lone pair — $\mathrm{H_3O^+}$ in water, $\mathrm{NH_4^+}$ in ammonia. The element itself is the $\mathrm{H_2}$ molecule, with a short ($74\ \mathrm{pm}$) and strong ($436\ \mathrm{kJ\,mol^{-1}}$) bond. That bond enthalpy is the first fact of hydrogen chemistry: $\mathrm{H_2}$ is thermodynamically a good reducing agent but kinetically a lazy one, and nearly all its industrial reactions need a catalyst that can break the $\mathrm{H{-}H}$ bond on a metal surface.

Hydrogen has three isotopes with names of their own: protium $^1\mathrm{H}$, deuterium $^2\mathrm{H} = \mathrm{D}$ (about $0.016\ \%$ of natural hydrogen, roughly one atom in 6400) and radioactive tritium $^3\mathrm{H} = \mathrm{T}$ (a $\beta^-$ emitter with a half-life of $12.3$ years). Because the masses differ by factors of two and three — the largest relative differences of any element — hydrogen isotopes show measurably different chemistry, and the differences are among the most useful probes of mechanism we have.

::: proposition The primary kinetic isotope effect {#prop-kie}
If a bond to hydrogen is broken in the rate-determining step, and if the zero-point energy of its stretching vibration is lost at the transition state while everything else is unchanged, the ratio of rate constants for the H and D compounds at temperature $T$ is
$$
\frac{k_\mathrm{H}}{k_\mathrm{D}} = \exp\!\left(\frac{hc\,(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})}{2k_\mathrm{B}T}\right), \qquad \tilde\nu_\mathrm{D} = \tilde\nu_\mathrm{H}\sqrt{\mu_\mathrm{H}/\mu_\mathrm{D}},
$$
where $\tilde\nu$ are the stretching wavenumbers and $\mu$ the reduced masses of the $\mathrm{X{-}H}$ and $\mathrm{X{-}D}$ oscillators. The conditions are those of a semiclassical model: tunnelling, bending vibrations and any residual zero-point energy at the transition state are neglected.
:::

::: proof Zero-point energy as a head start
A harmonic oscillator has zero-point energy $\tfrac12 hc\tilde\nu$, and $\tilde\nu \propto \sqrt{k/\mu}$ with the force constant $k$ fixed by the electronic structure — the same for $\mathrm{C{-}H}$ and $\mathrm{C{-}D}$ in the Born–Oppenheimer approximation. Hence $\tilde\nu_\mathrm{D}/\tilde\nu_\mathrm{H} = \sqrt{\mu_\mathrm{H}/\mu_\mathrm{D}}$. The potential-energy surface is identical for the two isotopes; only the starting level differs. The $\mathrm{X{-}H}$ molecule sits higher in its well by $\Delta E_0 = \tfrac12 hc(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})$, so if the stretch becomes the reaction coordinate (and so contributes no zero-point energy at the transition state), the H compound has an activation energy smaller by $\Delta E_0$. With equal pre-exponential factors, the Arrhenius equation gives $k_\mathrm{H}/k_\mathrm{D} = \exp(\Delta E_0/k_\mathrm{B}T)$, which is the result. The same zero-point difference, applied to equilibria rather than barriers, is why $\mathrm{p}K_\mathrm{w}(\mathrm{D_2O})$ exceeds $\mathrm{p}K_\mathrm{w}(\mathrm{H_2O})$, the example worked in [[main-group/inorganic-acids-bases#ex-pd]].
:::

::: example The size of a C–H isotope effect {#ex-kie-ch}
A $\mathrm{C{-}H}$ stretch absorbs at $2900\ \mathrm{cm^{-1}}$. Estimate the $\mathrm{C{-}D}$ wavenumber and the maximum primary isotope effect $k_\mathrm{H}/k_\mathrm{D}$ at $298\ \mathrm{K}$ and at $373\ \mathrm{K}$. ($hc/k_\mathrm{B} = 1.4388\ \mathrm{cm\,K}$; atomic masses $12.000$, $1.008$, $2.014$.)
::: solution
Reduced masses: $\mu_\mathrm{CH} = (12.000)(1.008)/13.008 = 0.9299$ and $\mu_\mathrm{CD} = (12.000)(2.014)/14.014 = 1.7246$ (atomic mass units). Then $\sqrt{0.9299/1.7246} = 0.7343$ and $\tilde\nu_\mathrm{D} = 0.7343 \times 2900 = 2129\ \mathrm{cm^{-1}}$ — a little more than the $2900/\sqrt2 = 2051\ \mathrm{cm^{-1}}$ of the crude "doubled mass" estimate, because carbon also moves. The exponent at $298\ \mathrm{K}$ is
$$
\frac{1.4388\ \mathrm{cm\,K} \times (2900 - 2129)\ \mathrm{cm^{-1}}}{2 \times 298.15\ \mathrm{K}} = 1.860, \qquad \frac{k_\mathrm{H}}{k_\mathrm{D}} = e^{1.860} = 6.4,
$$
and at $373\ \mathrm{K}$ the same numerator over $746.3\ \mathrm{K}$ gives $e^{1.486} = 4.4$. The zero-point difference is $4.6\ \mathrm{kJ\,mol^{-1}}$, so the effect shrinks as $T$ rises. Observed primary effects of 2 to 7 at room temperature mean a $\mathrm{C{-}H}$ bond is being broken in the slow step; values of 1.0–1.4 mean it is not; values well above 7 point to tunnelling, which the model leaves out. This one exponential is why deuterium labelling is a routine tool in [[organic-synthesis/mechanism-determination]] and [[kinetics/reaction-mechanisms]].
:::
:::

The figure lets you vary the stretching wavenumber. Heavier partner atoms and stiffer bonds give larger effects; the effect for an $\mathrm{O{-}H}$ bond ($3600\ \mathrm{cm^{-1}}$) is larger than for $\mathrm{C{-}H}$, and both fade towards 1 at high temperature.

::: widget plot
f: exp(1.4388*0.2657*nu/(2*x))
x: 200, 800
y: 0, 20
sliders: nu=1000:100:3800
labels: k_\mathrm{H}/k_\mathrm{D}
hlines: 1
caption: The semiclassical maximum primary kinetic isotope effect $k_\mathrm{H}/k_\mathrm{D} = \exp[hc(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})/2k_\mathrm{B}T]$ against temperature $x$ (in K), with $\tilde\nu_\mathrm{D} = 0.7343\,\tilde\nu_\mathrm{H}$ (the $\mathrm{C{-}H}$/$\mathrm{C{-}D}$ reduced-mass ratio), so the exponent is $1.4388 \times 0.2657\,\tilde\nu_\mathrm{H}/2T$. The slider sets $\tilde\nu_\mathrm{H}$ in $\mathrm{cm^{-1}}$: $2900$ gives $6.4$ at $298\ \mathrm{K}$. The effect is largest for stiff, high-frequency bonds at low temperature, and tends to 1 as $T \to \infty$, when zero-point energy becomes negligible against $k_\mathrm{B}T$.
:::

### Hydrides

Hydrogen combines with almost every element, and its binary compounds sort themselves by the electronegativity of the partner.

::: definition The three classes of binary hydride {#def-hydrides}
- **Saline (ionic) hydrides** are formed by the most electropositive metals — the alkali metals and calcium, strontium and barium: $\mathrm{LiH}$, $\mathrm{NaH}$, $\mathrm{CaH_2}$. They are high-melting solids containing the **hydride ion** $\mathrm{H^-}$ (NaH has the rock-salt structure), and they are strong bases and reducing agents: $\mathrm{H^- + H_2O \rightarrow H_2 + OH^-}$.
- **Molecular (covalent) hydrides** are formed by the p-block elements: $\mathrm{B_2H_6}$, $\mathrm{CH_4}$, $\mathrm{NH_3}$, $\mathrm{H_2O}$, $\mathrm{HF}$, $\mathrm{SiH_4}$, $\mathrm{H_2S}$. They subdivide by electron count into **electron-deficient** (group 13, too few electrons for two-centre bonds: the boranes), **electron-precise** (group 14, every pair bonding) and **electron-rich** (groups 15–17, lone pairs on the central atom).
- **Metallic (interstitial) hydrides** are formed by many d- and f-block metals: $\mathrm{PdH}_x$, $\mathrm{TiH_2}$, $\mathrm{LaNi_5H_6}$. Hydrogen occupies interstices in a metal lattice, often non-stoichiometrically, and the materials remain metallic conductors.

Beryllium and magnesium hydrides lie between the saline and molecular classes: $\mathrm{BeH_2}$ is a polymer with $\mathrm{Be{-}H{-}Be}$ three-centre bridges, and $\mathrm{MgH_2}$ is largely ionic with appreciable covalent character.
:::

The sign of the charge on hydrogen follows electronegativity: it is **hydridic** ($\mathrm{H^{\delta-}}$) when bonded to anything less electronegative than itself (alkali metals, boron, aluminium, silicon) and **protic** ($\mathrm{H^{\delta+}}$) when bonded to nitrogen, oxygen or a halogen. That single comparison predicts which hydrides react with water to give $\mathrm{H_2}$ (the hydridic ones: $\mathrm{H^{\delta-}}$ meets $\mathrm{H^{\delta+}}$ of water) and which are Brønsted acids (the protic ones). Carbon, at $2.55$ against hydrogen's $2.20$, makes nearly non-polar $\mathrm{C{-}H}$ bonds, which is part of why hydrocarbons are so unreactive. The strong hydrogen bonds formed by protic hydrides — and their role in the anomalous boiling points of $\mathrm{NH_3}$, $\mathrm{H_2O}$ and $\mathrm{HF}$ — are treated in [[bonding-structure/intermolecular-forces]].

::: example Calcium hydride as a drying agent {#ex-cah2}
Calcium hydride is used in the laboratory to dry solvents such as dichloromethane and amines. Write the reaction with water, explain why it is suitable for an amine but not for an alcohol or a carboxylic acid, and state the hazard that must be managed.
::: solution
The hydride ion is hydridic and water protic, so they combine to dihydrogen:
$$
\mathrm{CaH_2(s)} + 2\,\mathrm{H_2O(l)} \rightarrow \mathrm{Ca(OH)_2(s)} + 2\,\mathrm{H_2(g)}.
$$
The reaction is irreversible (hydrogen escapes) and the products are insoluble solids, so the solvent can simply be distilled off. $\mathrm{H^-}$ is a very strong base ($\mathrm{H_2}$ has $\mathrm{p}K_\mathrm{a}$ around 35), so it deprotonates any $\mathrm{O{-}H}$ acid present: an alcohol ($\mathrm{p}K_\mathrm{a} \approx 16$) or a carboxylic acid would be consumed, not dried. A tertiary amine has no acidic proton and a primary amine's $\mathrm{N{-}H}$ ($\mathrm{p}K_\mathrm{a} \approx 35$ or more) reacts only very slowly with the solid, so amines are dried rather than destroyed. The hazard is the hydrogen itself: it is extremely flammable, so the drying is done under an inert atmosphere in a fume cupboard, with the vessel vented and away from ignition sources, and spent hydride is destroyed slowly and under supervision. Saline hydrides are classed as substances which, in contact with water, emit flammable gases (GHS02, flame pictogram).
:::
:::

### Making hydrogen

About a hundred million tonnes of hydrogen are made each year, most of it for ammonia synthesis and oil refining, and as of 2026 the great majority still comes from fossil fuels. The main route is **steam reforming** of methane over a nickel catalyst at around $800\ \mathrm{^\circ C}$, followed by the **water–gas shift** at lower temperature:
$$
\mathrm{CH_4(g) + H_2O(g) \rightleftharpoons CO(g) + 3\,H_2(g)}\quad \Delta_\mathrm{r}H^\circ = +206\ \mathrm{kJ\,mol^{-1}},
$$
$$
\mathrm{CO(g) + H_2O(g) \rightleftharpoons CO_2(g) + H_2(g)}\quad \Delta_\mathrm{r}H^\circ = -41\ \mathrm{kJ\,mol^{-1}}.
$$
Reforming is endothermic and makes four moles of gas from two, so Le Chatelier asks for high temperature and low pressure; the shift is exothermic with no change in gas moles, so it is run cooler, where its equilibrium lies further right. Every mole of methane ends as a mole of $\mathrm{CO_2}$, which is why "low-carbon" hydrogen requires either capture of that $\mathrm{CO_2}$ or a different source: the **electrolysis of water**, $\mathrm{2\,H_2O(l) \rightarrow 2\,H_2(g) + O_2(g)}$, which needs at least $1.23\ \mathrm{V}$ thermodynamically and around $1.8$–$2\ \mathrm{V}$ in practice because of the overpotentials discussed in [[electrochemistry/fuel-cells-electrolysis]]. The economics of these routes is the subject of [[green-chemistry/carbon-hydrogen]].

## The alkali metals

Lithium, sodium, potassium, rubidium and caesium (francium is too radioactive to accumulate) are soft, low-melting, highly reactive metals, each with a single $ns$ electron outside a noble-gas core. Their chemistry is almost entirely that of the $\mathrm{M^+}$ ion, and the properties that matter run smoothly down the group:

| | Li | Na | K | Rb | Cs |
|---|---|---|---|---|---|
| $IE_1$ / $\mathrm{kJ\,mol^{-1}}$ | 520 | 496 | 419 | 403 | 376 |
| $r(\mathrm{M^+})$ / pm (6-coordinate) | 76 | 102 | 138 | 152 | 167 |
| melting point / °C | 180.5 | 97.8 | 63.5 | 39.3 | 28.5 |
| $E^\circ(\mathrm{M^+/M})$ / V | $-3.04$ | $-2.71$ | $-2.93$ | $-2.98$ | $-3.03$ |
| flame colour | crimson | yellow | lilac | red-violet | blue-violet |

The melting points fall because metallic bonding weakens as one electron per atom is spread over an ever larger atom ([[bonding-structure/metallic-bonding]]); caesium melts in a warm hand. The flame colours are atomic emission lines: in a flame the atoms are excited and fall back, emitting at characteristic wavelengths — the sodium D lines at $589.0$ and $589.6\ \mathrm{nm}$, the lithium line at $670.8\ \mathrm{nm}$, the potassium pair at $766.5$ and $769.9\ \mathrm{nm}$ (barely visible, hence a pale lilac, best seen through blue cobalt glass that absorbs sodium's yellow). Rubidium and caesium were discovered in exactly this way, as new lines in a spectroscope, and named for them (Latin *rubidus*, deep red; *caesius*, sky blue). Flame photometry and atomic emission are the analytical descendants, treated in [[analytical-chemistry/atomic-spectrometry]].

The one row that is not smooth is the standard potential: lithium, not caesium, has the most negative value. That anomaly repays a careful look.

::: example Why lithium is the strongest reducing agent in water {#ex-li-potential}
Using the data below (standard tables, $298\ \mathrm{K}$; $\mathrm{kJ\,mol^{-1}}$), explain why $E^\circ(\mathrm{Li^+/Li})$ is more negative than $E^\circ(\mathrm{Na^+/Na})$ although lithium has the larger ionisation energy.

| | $\Delta_\mathrm{at}H^\circ$ (metal → gas) | $IE_1$ | $\Delta_\mathrm{f}H^\circ(\mathrm{M^+,aq})$ | $\Delta_\mathrm{f}G^\circ(\mathrm{M^+,aq})$ |
|---|---|---|---|---|
| Li | 159.3 | 520.2 | $-278.5$ | $-293.3$ |
| Na | 107.5 | 495.8 | $-240.1$ | $-261.9$ |
::: solution
**The potentials.** Against the standard hydrogen electrode, $\mathrm{M^+(aq)} + \tfrac12\,\mathrm{H_2(g)} \rightarrow \mathrm{M(s)} + \mathrm{H^+(aq)}$ has $\Delta_\mathrm{r}G^\circ = -\Delta_\mathrm{f}G^\circ(\mathrm{M^+,aq})$ (the conventional values set $\mathrm{H^+(aq)}$ to zero), so $E^\circ = \Delta_\mathrm{f}G^\circ(\mathrm{M^+,aq})/F$: $-293\,300/96\,485 = -3.04\ \mathrm{V}$ for lithium and $-261\,900/96\,485 = -2.71\ \mathrm{V}$ for sodium, the tabulated values.

**The cycle.** Build $\mathrm{M(s)} \rightarrow \mathrm{M(g)} \rightarrow \mathrm{M^+(g)} \rightarrow \mathrm{M^+(aq)}$. Hess's law gives $\Delta_\mathrm{f}H^\circ(\mathrm{M^+,aq}) = \Delta_\mathrm{at}H^\circ + IE_1 + \Delta_\mathrm{hyd}H^\circ(\mathrm{M^+})$, where the electron is handed to the conventional proton (a constant that cancels when we compare two metals). Subtract sodium from lithium:
$$
\underbrace{-38.4}_{\Delta\Delta_\mathrm{f}H^\circ} = \underbrace{+51.8}_{\Delta\Delta_\mathrm{at}H^\circ} + \underbrace{+24.4}_{\Delta IE_1} + \Delta\Delta_\mathrm{hyd}H^\circ \quad\Rightarrow\quad \Delta\Delta_\mathrm{hyd}H^\circ = -114.6\ \mathrm{kJ\,mol^{-1}}.
$$
Lithium loses on both of the first two steps — its metal is more strongly bonded and its electron harder to remove, $76\ \mathrm{kJ\,mol^{-1}}$ in all — but its tiny ion is hydrated about $115\ \mathrm{kJ\,mol^{-1}}$ more exothermically than $\mathrm{Na^+}$, which more than repays the debt. (Tables of absolute hydration enthalpies give about $-519$ and $-404\ \mathrm{kJ\,mol^{-1}}$, the same difference.) The enthalpy margin, $38\ \mathrm{kJ\,mol^{-1}}$, is $0.40\ \mathrm{V}$; the free-energy margin, $31\ \mathrm{kJ\,mol^{-1}}$, is the observed $0.33\ \mathrm{V}$ because hydrating the small ion also orders more water and costs more entropy. A standard potential is a statement about the *aqueous ion*, and small ions win in water.
:::
:::

::: warning Thermodynamics is not vigour {#warn-li-vigour}
Lithium has the most negative potential of the group, yet a piece of lithium in water fizzes steadily while potassium ignites the hydrogen it releases and caesium explodes. There is no contradiction: $E^\circ$ measures how far the reaction can go, not how fast. Lithium melts at $180\ \mathrm{^\circ C}$, so its surface stays solid and small, and its higher atomisation and ionisation energies make the electron-transfer steps slower; sodium ($97.8\ \mathrm{^\circ C}$) melts in the heat of reaction into a skating bead whose fresh surface reacts ever faster; potassium, rubidium and caesium melt even more easily and react faster still. All five are classed as substances that emit flammable gases on contact with water (GHS02) and as corrosive (their hydroxides cause severe burns); they are stored under oil or inert gas, handled with tongs behind a safety screen in demonstration quantities only, and never put into a sink or a waste-solvent drum.
:::

### Oxides, peroxides and superoxides

Burned in excess air, the alkali metals do not all give the same kind of compound. Lithium gives the **oxide** $\mathrm{Li_2O}$; sodium gives mainly the **peroxide** $\mathrm{Na_2O_2}$ (containing $\mathrm{O_2^{2-}}$, $\mathrm{O{-}O}$ bond order 1); potassium, rubidium and caesium give **superoxides** $\mathrm{MO_2}$ (containing paramagnetic $\mathrm{O_2^-}$, bond order $1\tfrac12$). The bond orders follow from the $\mathrm{O_2}$ molecular-orbital diagram of [[bonding-structure/molecular-orbitals]] by adding one or two electrons to the $\pi^*$ level. The pattern is a lattice-energy effect, and it is the clearest instance of a principle that will organise the rest of this chapter.

::: proposition The size-matching principle for ionic lattices {#prop-size-matching}
In a series of salts with a common anion, the stability of the lattice relative to some decomposition or dissolution product depends on how the lattice energy changes with cation radius. Because lattice energy varies as $1/(r_+ + r_-)$ (the Kapustinskii form), while hydration energy varies roughly as $1/r_+ + 1/r_-$:

(i) a **large anion** (peroxide, superoxide, carbonate, sulfate, triiodide) is stabilised, relative to a smaller anion it could decompose into, **most by a large cation**: thermal stability of oxoanion salts increases down groups 1 and 2;

(ii) salts are **least soluble when cation and anion are similar in size** (large–large or small–small) and most soluble when they are badly mismatched.

These are trends among related ionic solids at fixed charge type; they are not quantitative predictions, and they fail where covalent character (Li, Be) or a change of structure intervenes.
:::

::: proof The Kapustinskii argument
Take Kapustinskii's equation, $\Delta_\mathrm{latt}H \approx K\,\nu |z_+z_-|/(r_+ + r_-)$ with $K \approx 1.07\times10^{5}\ \mathrm{kJ\,pm\,mol^{-1}}$ and $\nu$ ions per formula unit (dropping its small correction term). (i) Consider $\mathrm{MCO_3(s)} \rightarrow \mathrm{MO(s)} + \mathrm{CO_2(g)}$. The non-lattice parts of the cycle — breaking $\mathrm{CO_3^{2-}}$ into $\mathrm{O^{2-}}$ and $\mathrm{CO_2}$ — are the same for every metal, so the metal-dependent part of $\Delta_\mathrm{r}H$ is the *gain* in lattice energy, which is proportional to
$$
\frac{1}{r_+ + r(\mathrm{O^{2-}})} - \frac{1}{r_+ + r(\mathrm{CO_3^{2-}})}.
$$
With $r(\mathrm{O^{2-}}) = 140\ \mathrm{pm}$ and a thermochemical radius of about $178\ \mathrm{pm}$ for carbonate, this bracket is $7.2\times10^{-4}\ \mathrm{pm^{-1}}$ for $\mathrm{Mg^{2+}}$ ($72\ \mathrm{pm}$) but only $4.4\times10^{-4}\ \mathrm{pm^{-1}}$ for $\mathrm{Ba^{2+}}$ ($135\ \mathrm{pm}$). The bracket is a difference of two reciprocals of sums, and it shrinks as $r_+$ grows, because a large cation dilutes the difference between the two anions. So the driving force for decomposition is largest for small cations: magnesium carbonate decomposes easily, barium carbonate only with difficulty. The same algebra, with peroxide and superoxide in place of carbonate, makes $\mathrm{Li_2O}$ the product for lithium and $\mathrm{KO_2}$ survivable for potassium. (ii) For dissolution, lattice energy $\propto 1/(r_+ + r_-)$ is dominated by the *larger* ion when the sizes are mismatched, while hydration $\propto 1/r_+ + 1/r_-$ is dominated by the *smaller* one. With a large anion, changing the cation barely moves the lattice term but changes the hydration term a lot, so solubility falls as the cation grows; with a small anion the reverse holds. That is the observed opposition of sulfate and hydroxide solubilities in group 2.
:::

::: example Superoxide in a breathing apparatus {#ex-ko2}
Self-contained rescue breathing sets have used potassium superoxide, which absorbs exhaled carbon dioxide and releases oxygen. Write the balanced equation, state the oxidation states of oxygen, and calculate the volume of $\mathrm{O_2}$ (at $298\ \mathrm{K}$, $1\ \mathrm{bar}$, $24.79\ \mathrm{dm^3\,mol^{-1}}$) released per kilogram of $\mathrm{KO_2}$ ($M = 71.10\ \mathrm{g\,mol^{-1}}$).
::: solution
$$
4\,\mathrm{KO_2(s)} + 2\,\mathrm{CO_2(g)} \rightarrow 2\,\mathrm{K_2CO_3(s)} + 3\,\mathrm{O_2(g)}.
$$
In $\mathrm{O_2^-}$ each oxygen is formally $-\tfrac12$; in carbonate it is $-2$ and in dioxygen $0$. Of the eight superoxide oxygens, two are reduced to $-2$ (gaining $1\tfrac12$ electrons each, $3$ in all) and six are oxidised to $0$ (losing $\tfrac12$ each, $3$ in all): a disproportionation, driven by the formation of the very stable carbonate lattice. One kilogram is $1000/71.10 = 14.06\ \mathrm{mol}$ of $\mathrm{KO_2}$, giving $\tfrac34 \times 14.06 = 10.55\ \mathrm{mol}$ of $\mathrm{O_2}$, or $10.55 \times 24.79 = 262\ \mathrm{dm^3}$. The device releases slightly more oxygen than it absorbs carbon dioxide ($3\ \mathrm{O_2}$ per $2\ \mathrm{CO_2}$), which suits human respiration, whose respiratory quotient is below 1. Superoxides are strong oxidisers (GHS03) and react violently with water and organic matter; they are kept sealed and away from combustibles.
:::
:::

### Solutions of the alkali metals in liquid ammonia

Liquid ammonia (boiling point $-33\ \mathrm{^\circ C}$) dissolves the alkali metals without reacting with them quickly, and the solutions are among the strangest in chemistry. Dilute solutions are an intense blue whatever the metal; they conduct electricity extremely well and are paramagnetic. Above about $3\ \mathrm{mol\,dm^{-3}}$ they turn bronze and metallic. The explanation is that the metal ionises in the solvent,
$$
\mathrm{Na(s)} \xrightarrow{\ \mathrm{NH_3(l)}\ } \mathrm{Na^+(am)} + \mathrm{e^-(am)},
$$
and the electron, like the cation, is **solvated**: it occupies a cavity among oriented ammonia molecules whose hydrogen atoms point towards it. The solvated electron has a broad absorption band in the near infrared whose tail spreads across the red end of the visible spectrum, so the transmitted light is blue; its unpaired spin gives the paramagnetism, and its high mobility the conductivity. In concentrated solutions the electrons overlap into a band and the liquid becomes a metal.

The solutions are metastable. Catalysed by transition metals (a trace of iron oxide suffices), they decompose to the amide and hydrogen,
$$
\mathrm{2\,Na + 2\,NH_3 \rightarrow 2\,NaNH_2 + H_2},
$$
the ammonia analogue of sodium's reaction with water — the solvent-system parallel of [[main-group/inorganic-acids-bases#def-autoionization]], in which $\mathrm{NH_2^-}$ is the characteristic base. Uncatalysed, they keep for hours at $-33\ \mathrm{^\circ C}$, and that window makes them powerful synthetic reductants: the **Birch reduction** of aromatic rings ([[organic-synthesis/redox-in-synthesis]]) uses lithium or sodium in liquid ammonia with an alcohol as proton source.

::: example Alkalides: sodium as an anion {#ex-sodide}
With the cryptand 2.2.2 (a cage-shaped polyether amine that wraps a $\mathrm{Na^+}$ ion completely), sodium forms a gold-coloured crystalline solid $\mathrm{[Na(2.2.2\text{-}crypt)]^+Na^-}$ in which half the sodium is present as the **sodide** anion $\mathrm{Na^-}$. Why is $\mathrm{Na^-}$ plausible, and why is a cryptand needed?
::: solution
Sodium's electron affinity is small but exothermic ($53\ \mathrm{kJ\,mol^{-1}}$ released): $\mathrm{Na^-}$ has the closed $3s^2$ configuration, and in the gas phase it is stable towards losing its extra electron. In ordinary conditions the anion never survives because any $\mathrm{Na^-}$ would immediately give its electrons to a cation, $\mathrm{Na^+ + Na^- \rightarrow 2\,Na}$ (the metal is far more stable than an ion pair). The cryptand blocks that path: it encapsulates $\mathrm{Na^+}$ so tightly that the complexed cation cannot be reduced to the metal, and it is so large that the lattice energy of the resulting salt is small, reducing the gain from returning electrons to it. With the back-reaction shut off, the anion persists. Its existence (first reported by James Dye's group in 1974) shows that the "obvious" oxidation state of an element is a statement about its usual partners, not about the element itself.
:::
:::

## The alkaline-earth metals

Beryllium, magnesium, calcium, strontium and barium (radium is radioactive) have two valence electrons and form $\mathrm{M^{2+}}$ ions. The doubled charge on a smaller ion makes them harder, denser and higher-melting than their group-1 neighbours, and more of their compounds are insoluble — the lattice energy scales with $z_+z_-$ while the hydration energy scales roughly with $z^2/r$, and for doubly charged cations the balance more often favours the solid.

Beryllium is the exception that proves the rules of [[main-group/periodic-trends#def-diagonal]]. The $\mathrm{Be^{2+}}$ ion ($45\ \mathrm{pm}$ in four-coordination) has so high a charge density that its compounds are essentially covalent: $\mathrm{BeCl_2}$ is a chain polymer with bridging chlorides, molten $\mathrm{BeCl_2}$ hardly conducts, and $\mathrm{Be(OH)_2}$ is amphoteric, dissolving in strong base as $\mathrm{[Be(OH)_4]^{2-}}$ just as aluminium hydroxide gives $\mathrm{[Al(OH)_4]^-}$. In water beryllium is always four-coordinate, as $\mathrm{[Be(H_2O)_4]^{2+}}$, which is markedly acidic. Beryllium compounds are toxic by inhalation and are classed as carcinogens (chronic beryllium disease); work with beryllium powders or dusts requires engineering controls that a teaching laboratory does not have.

Magnesium is light and, despite its negative potential ($E^\circ = -2.37\ \mathrm{V}$), stable in air and cold water because of a thin oxide–hydroxide film; burning magnesium is not put out by water or carbon dioxide (it reduces both). Its most important chemistry for the organic chemist is the **Grignard reagent** $\mathrm{RMgX}$, in which carbon is bonded to the electropositive metal and behaves as a carbanion ([[organometallics-catalysis/main-group-organometallics]]). In biology $\mathrm{Mg^{2+}}$ sits at the centre of chlorophyll and accompanies every molecule of ATP.

Calcium is the metal of limestone, cement and bone. The lime cycle,
$$
\mathrm{CaCO_3} \xrightarrow{\ \text{heat}\ } \mathrm{CaO} + \mathrm{CO_2}, \qquad \mathrm{CaO} + \mathrm{H_2O} \rightarrow \mathrm{Ca(OH)_2}, \qquad \mathrm{Ca(OH)_2} + \mathrm{CO_2} \rightarrow \mathrm{CaCO_3} + \mathrm{H_2O},
$$
underlies lime mortar, and the equilibrium $\mathrm{CaCO_3(s) + CO_2(aq) + H_2O \rightleftharpoons Ca^{2+}(aq) + 2\,HCO_3^-(aq)}$ explains both limestone caves and the "temporary hardness" of water, removed by boiling as kettle scale.

### The decomposition of the carbonates

The first part of [[#prop-size-matching]] makes a quantitative prediction we can test with ordinary thermodynamic tables.

::: example When does calcium carbonate decompose? {#ex-caco3}
Using the standard data below (CRC Handbook, $298\ \mathrm{K}$), find $\Delta_\mathrm{r}H^\circ$, $\Delta_\mathrm{r}S^\circ$ and the temperature at which $\mathrm{CaCO_3(s) \rightarrow CaO(s) + CO_2(g)}$ has $\Delta_\mathrm{r}G^\circ = 0$, treating $\Delta_\mathrm{r}H^\circ$ and $\Delta_\mathrm{r}S^\circ$ as independent of temperature. What does that temperature mean physically?

| | $\Delta_\mathrm{f}H^\circ$ / $\mathrm{kJ\,mol^{-1}}$ | $S^\circ$ / $\mathrm{J\,K^{-1}\,mol^{-1}}$ |
|---|---|---|
| $\mathrm{CaCO_3(s)}$ (calcite) | $-1207.6$ | $91.7$ |
| $\mathrm{CaO(s)}$ | $-634.9$ | $38.1$ |
| $\mathrm{CO_2(g)}$ | $-393.5$ | $213.8$ |
::: solution
$$
\Delta_\mathrm{r}H^\circ = -634.9 - 393.5 - (-1207.6) = +179.2\ \mathrm{kJ\,mol^{-1}},
$$
$$
\Delta_\mathrm{r}S^\circ = 38.1 + 213.8 - 91.7 = +160.2\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
$\Delta_\mathrm{r}G^\circ = \Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ$ vanishes at
$$
T = \frac{179\,200\ \mathrm{J\,mol^{-1}}}{160.2\ \mathrm{J\,K^{-1}\,mol^{-1}}} = 1119\ \mathrm{K}\ (846\ \mathrm{^\circ C}).
$$
Since the solids are in their standard states, $K = p(\mathrm{CO_2})/p^\circ$, and $\Delta_\mathrm{r}G^\circ = 0$ means $K = 1$: at $1119\ \mathrm{K}$ the equilibrium pressure of $\mathrm{CO_2}$ over the carbonate reaches $1\ \mathrm{bar}$, so the solid decomposes in an atmosphere of pure $\mathrm{CO_2}$ at atmospheric pressure. (The measured temperature is near $1170\ \mathrm{K}$; the $50\ \mathrm{K}$ error comes from assuming constant $\Delta_\mathrm{r}H^\circ$ and $\Delta_\mathrm{r}S^\circ$.) In air, where $p(\mathrm{CO_2})$ is only about $4\times10^{-4}\ \mathrm{bar}$, decomposition begins far lower — the reason lime kilns sweep the gas away. The entropy change is nearly the same for every carbonate, since it is dominated by the gas released; the metal enters through $\Delta_\mathrm{r}H^\circ$, exactly as the Kapustinskii argument said.
:::
:::

::: widget plot
f: 100.7 - 0.1751*x; 179.2 - 0.1602*x; 234.6 - 0.1711*x; 271.5 - 0.1738*x
x: 300, 1800
y: -80, 260
hlines: 0
points: 575,0; 1119,0; 1371,0; 1562,0
labels: \mathrm{MgCO_3}; \mathrm{CaCO_3}; \mathrm{SrCO_3}; \mathrm{BaCO_3}
caption: $\Delta_\mathrm{r}G^\circ$ (in $\mathrm{kJ\,mol^{-1}}$) for $\mathrm{MCO_3(s) \rightarrow MO(s) + CO_2(g)}$ against temperature $x$ (in K), from the 298 K values of $\Delta_\mathrm{r}H^\circ$ and $\Delta_\mathrm{r}S^\circ$ (CRC Handbook data; the lines ignore the temperature dependence of both). The dots mark where each line crosses zero — where the equilibrium $\mathrm{CO_2}$ pressure reaches 1 bar: about $575\ \mathrm{K}$ for magnesium, $1119\ \mathrm{K}$ for calcium, $1371\ \mathrm{K}$ for strontium and $1562\ \mathrm{K}$ for barium. The lines are nearly parallel (similar $\Delta_\mathrm{r}S^\circ$, set by the gas evolved) and are displaced upwards as the cation grows: the enthalpy needed to decompose the carbonate increases down the group, as the size-matching principle predicts.
:::

### Solubility in group 2

The second part of the principle explains the opposite solubility trends of group-2 sulfates and hydroxides, the kind of fact that is often memorised and rarely understood.

| | Mg | Ca | Sr | Ba |
|---|---|---|---|---|
| $K_\mathrm{sp}$ of $\mathrm{MSO_4}$ | soluble | $4.9\times10^{-5}$ | $3.4\times10^{-7}$ | $1.1\times10^{-10}$ |
| $K_\mathrm{sp}$ of $\mathrm{M(OH)_2}$ | $5.6\times10^{-12}$ | $5.0\times10^{-6}$ | soluble | soluble |

The sulfate ion is large: the lattice energy of $\mathrm{MSO_4}$ hardly changes from magnesium to barium, while the hydration energy of the cation falls steeply, so the sulfates become *less* soluble down the group. Hydroxide is small: the lattice energy of $\mathrm{M(OH)_2}$ falls faster than the cation hydration as the cation grows, so the hydroxides become *more* soluble. Barium sulfate's insolubility makes it safe as a "barium meal" for X-ray imaging even though soluble barium salts are toxic; magnesium hydroxide's insolubility makes it a mild antacid ("milk of magnesia"). (Strontium and barium hydroxides are tabulated as soluble because their saturated solutions exceed about $0.05\ \mathrm{mol\,dm^{-3}}$, too concentrated for a simple $K_\mathrm{sp}$ to describe them well.) Solubility-product arithmetic is that of [[general-chemistry-2/solubility-equilibria]].

::: quiz
Which compound is predicted by the size-matching principle to be the most thermally stable towards loss of $\mathrm{O_2}$ or $\mathrm{CO_2}$?
- [ ] $\mathrm{MgCO_3}$
- [ ] $\mathrm{LiO_2}$
- [x] $\mathrm{CsO_2}$
- [ ] $\mathrm{Li_2CO_3}$
::: solution
A large anion (superoxide or carbonate) is best stabilised by a large cation, and decomposition to the smaller $\mathrm{O^{2-}}$ gains most lattice energy when the cation is small. Caesium is the largest cation offered, so $\mathrm{CsO_2}$ is the stable one. Lithium superoxide is not isolable as a bulk solid at room temperature, lithium carbonate decomposes on strong heating (unlike the other alkali carbonates) and magnesium carbonate decomposes near $575\ \mathrm{K}$, all for the same reason: a small, highly polarising cation.
:::
:::

## Making and using the s-block elements

The extraction chemistry follows from the potentials. With $E^\circ$ near $-3\ \mathrm{V}$, no chemical reducing agent that is cheaper than the metal itself can make sodium or potassium from their salts at ordinary temperatures, and water would be reduced long before the metal ion at any aqueous cathode. So the metals are made by **electrolysis of molten salts**, the route Davy pioneered: sodium in the **Downs cell** from molten $\mathrm{NaCl}$, to which calcium chloride is added to lower the melting point from $801\ \mathrm{^\circ C}$ to about $600\ \mathrm{^\circ C}$; lithium similarly from an $\mathrm{LiCl{-}KCl}$ melt. Magnesium is made both electrolytically and thermally (the Pidgeon process reduces calcined dolomite with ferrosilicon at high temperature under vacuum, the Ellingham trade-off of [[main-group/inorganic-redox#prop-ellingham-reading]] in which removal of magnesium vapour drives the equilibrium). Potassium is made by reducing molten $\mathrm{KCl}$ with sodium vapour, an apparently uphill reaction made to run by distilling away the more volatile potassium.

The compounds are made on a far larger scale than the metals. **Chlor–alkali electrolysis** of brine, $\mathrm{2\,NaCl + 2\,H_2O \rightarrow 2\,NaOH + Cl_2 + H_2}$, supplies both sodium hydroxide and chlorine; the modern membrane cell separates the products with a cation-exchange membrane that passes $\mathrm{Na^+}$ but not $\mathrm{OH^-}$ or $\mathrm{Cl^-}$ ([[electrochemistry/fuel-cells-electrolysis]]). **Sodium carbonate** was made for a century and a half by the **Solvay process**, whose key step is the precipitation of the least soluble salt in a concentrated brine saturated with ammonia and carbon dioxide,
$$
\mathrm{NaCl + NH_3 + CO_2 + H_2O \rightarrow NaHCO_3(s) + NH_4Cl},
$$
followed by calcination of the bicarbonate to $\mathrm{Na_2CO_3}$; the ammonia is recovered with lime from limestone, so the net change is simply $\mathrm{CaCO_3 + 2\,NaCl \rightarrow Na_2CO_3 + CaCl_2}$ — a reaction that runs backwards if you try it directly, made to run forwards by a cycle of solubility and volatility. **Lithium** has become strategic as the cation of the lithium-ion battery: it is recovered from salt-lake brines by evaporation and from the mineral spodumene, and as of 2026 its supply chain is a subject of industrial policy in several countries ([[electrochemistry/batteries]]).

## Where this leads

The size-matching and lattice-versus-hydration arguments of this chapter reappear wherever ionic solids meet water: in the aluminium and silicate chemistry of [[main-group/groups-13-14]], in the stability of the polyhalide salts of [[main-group/halogens-noble-gases]], and in the solid-state chemistry of [[materials-chemistry/solid-synthesis]]. Hydrides return as boranes in [[main-group/groups-13-14]] and as ammonia, water and hydrogen sulfide in [[main-group/groups-15-16]], where the Haber–Bosch process turns the hydrogen made by steam reforming into fertiliser. The kinetic isotope effect is developed fully in [[kinetics/transition-state-theory]], the solvated electron reappears in [[kinetics/photochemistry]], and the s-block organometallics — Grignard and organolithium reagents — are the subject of [[organometallics-catalysis/main-group-organometallics]].

::: history
Hydrogen was characterised by Henry Cavendish in 1766 as the "inflammable air" from metals and acids; Lavoisier named it (*hydro-gène*, water-former) after showing in 1783 that its combustion gives water. The alkali and alkaline-earth metals came with the voltaic pile: Humphry Davy isolated potassium and sodium by electrolysing the fused hydroxides in 1807 and magnesium, calcium, strontium and barium in 1808. Lithium was recognised in the mineral petalite by Johan August Arfwedson, working in Berzelius's laboratory, in 1817. Rubidium and caesium were the first elements discovered by spectroscopy, found by Robert Bunsen and Gustav Kirchhoff in Dürkheim mineral water (caesium, 1860) and in lepidolite (rubidium, 1861) as new lines in the flame spectrum. The blue solutions of alkali metals in ammonia were described by W. Weyl in 1864, and Charles Kraus's conductivity measurements from 1907 onwards led to the idea of the solvated electron. Harold Urey, with Ferdinand Brickwedde and George Murphy, discovered deuterium spectroscopically in 1931 (Urey received the 1934 Nobel Prize in Chemistry), and tritium was made by Mark Oliphant, Paul Harteck and Ernest Rutherford in 1934. Charles Pedersen's report of the crown ethers in 1967 and Jean-Marie Lehn's cryptands opened the coordination chemistry of the alkali metals; Pedersen and Lehn shared the 1987 Nobel Prize with Donald Cram, and James Dye used a cryptand to make the first salt of the sodide anion in 1974.
:::

::: summary
- Hydrogen fits no group: its high ionisation energy forbids a free $\mathrm{H^+}$ in condensed phases, and its strong $436\ \mathrm{kJ\,mol^{-1}}$ bond makes $\mathrm{H_2}$ kinetically sluggish.
- Binary hydrides are saline (electropositive metals, $\mathrm{H^-}$), molecular (p block; electron-deficient, -precise or -rich) or metallic (interstitial); electronegativity relative to $2.20$ decides whether hydrogen is hydridic or protic.
- Isotope effects come from zero-point energy: $k_\mathrm{H}/k_\mathrm{D} = \exp[hc(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})/2k_\mathrm{B}T]$, about 6–7 for a $\mathrm{C{-}H}$ bond at room temperature.
- Alkali-metal properties run smoothly down the group except $E^\circ$: lithium is the strongest reductant in water because its small ion is hydrated so exothermically; reactivity with water is kinetics and rises down the group.
- The size-matching principle: large anions (peroxide, superoxide, carbonate) are stabilised by large cations, so thermal stability of oxoanion salts increases down groups 1 and 2; salts are least soluble when ion sizes match, so group-2 sulfates become less soluble and hydroxides more soluble down the group.
- Alkali metals dissolve in liquid ammonia as cations and solvated electrons — blue, paramagnetic, conducting, and powerful reductants.
- The very negative potentials force electrolytic extraction from molten salts; the bulk compounds come from chlor–alkali electrolysis and (historically) the Solvay process.
:::

## Exercises

::: exercise Classifying hydrides {level=1}
Classify each hydride as saline, molecular or metallic and say whether its hydrogen is hydridic or protic: (a) $\mathrm{KH}$; (b) $\mathrm{H_2S}$; (c) $\mathrm{SiH_4}$; (d) $\mathrm{PdH}_{0.6}$; (e) $\mathrm{NH_3}$.
::: solution
(a) Saline, hydridic: potassium ($\chi = 0.82$) gives $\mathrm{K^+H^-}$, which reacts with water to give $\mathrm{H_2}$. (b) Molecular, electron-rich, protic: sulfur ($2.58$) is more electronegative than hydrogen, and $\mathrm{H_2S}$ is a weak acid. (c) Molecular, electron-precise, hydridic: silicon ($1.90$) is less electronegative than hydrogen, so $\mathrm{SiH_4}$ reacts with water (base-catalysed) to give $\mathrm{H_2}$ and silica, and ignites in air. (d) Metallic (interstitial), non-stoichiometric; hydrogen dissolves in the palladium lattice and the solid remains a metal. (e) Molecular, electron-rich, protic in the sense of $\mathrm{H^{\delta+}}$ — though ammonia is far better known as a base through its lone pair than as an acid.
:::
:::

::: exercise The sodium D line {level=1 check="203"}
The sodium flame emits at $589.0\ \mathrm{nm}$. Calculate the energy of one mole of these photons ($h = 6.626\times10^{-34}\ \mathrm{J\,s}$, $c = 2.998\times10^{8}\ \mathrm{m\,s^{-1}}$, $N_\mathrm{A} = 6.022\times10^{23}\ \mathrm{mol^{-1}}$), and say which electronic transition it corresponds to. (Enter the energy in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$E = N_\mathrm{A}hc/\lambda = (6.022\times10^{23})(6.626\times10^{-34})(2.998\times10^{8})/(589.0\times10^{-9}\ \mathrm{m}) = 2.031\times10^{5}\ \mathrm{J\,mol^{-1}} = 203\ \mathrm{kJ\,mol^{-1}}$. It is the $3p \rightarrow 3s$ transition of the sodium atom (the doublet at $589.0$ and $589.6\ \mathrm{nm}$ comes from the two spin–orbit levels of $3p$). Note that it is far smaller than the ionisation energy, $496\ \mathrm{kJ\,mol^{-1}}$: a flame excites atoms but ionises few of them.
:::
:::

::: exercise Hydrogen from calcium hydride {level=1 check="1.18"}
What volume of hydrogen, measured at $298\ \mathrm{K}$ and $1\ \mathrm{bar}$, is released when $1.00\ \mathrm{g}$ of $\mathrm{CaH_2}$ ($M = 42.09\ \mathrm{g\,mol^{-1}}$) reacts completely with water? ($R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$.) (Enter the volume in $\mathrm{dm^3}$ to three significant figures.)
::: solution
$\mathrm{CaH_2 + 2\,H_2O \rightarrow Ca(OH)_2 + 2\,H_2}$. Amount of hydride $= 1.00/42.09 = 0.02376\ \mathrm{mol}$, so $n(\mathrm{H_2}) = 0.04752\ \mathrm{mol}$. $V = nRT/p = (0.04752)(8.314)(298)/(1.00\times10^{5}\ \mathrm{Pa}) = 1.178\times10^{-3}\ \mathrm{m^3} = 1.18\ \mathrm{dm^3}$. Over a litre of flammable gas from one gram of solid is the reason the reaction is run slowly, vented, and away from flames.
:::
:::

::: exercise Barium sulfate in water {level=2 check="10.4"}
$K_\mathrm{sp}(\mathrm{BaSO_4}) = 1.08\times10^{-10}$ at $25\ \mathrm{^\circ C}$. Calculate the molar solubility of barium sulfate in pure water, and explain with the size-matching principle why barium sulfate is so much less soluble than magnesium sulfate. (Enter the solubility in $\mu\mathrm{mol\,dm^{-3}}$ to three significant figures.)
::: solution
$\mathrm{BaSO_4(s) \rightleftharpoons Ba^{2+} + SO_4^{2-}}$, so $s^2 = K_\mathrm{sp}$ and $s = \sqrt{1.08\times10^{-10}} = 1.04\times10^{-5}\ \mathrm{mol\,dm^{-3}} = 10.4\ \mu\mathrm{mol\,dm^{-3}}$ (about $2.4\ \mathrm{mg}$ per litre). Sulfate is a large anion, so the lattice energy, which depends on $1/(r_+ + r_-)$, changes little between $\mathrm{Mg^{2+}}$ ($72\ \mathrm{pm}$) and $\mathrm{Ba^{2+}}$ ($135\ \mathrm{pm}$); the hydration enthalpy of the cation, which depends strongly on $1/r_+$, is much smaller for barium. With less hydration to pay for the lattice, $\mathrm{BaSO_4}$ stays solid. In medical use this low concentration of free $\mathrm{Ba^{2+}}$ is what makes the suspension safe, whereas soluble barium salts are toxic.
:::
:::

::: exercise Strontium carbonate {level=2 check="1371"}
For $\mathrm{SrCO_3(s) \rightarrow SrO(s) + CO_2(g)}$, use $\Delta_\mathrm{f}H^\circ$ ($\mathrm{kJ\,mol^{-1}}$) $\mathrm{SrCO_3}$ $-1220.1$, $\mathrm{SrO}$ $-592.0$, $\mathrm{CO_2}$ $-393.5$ and $S^\circ$ ($\mathrm{J\,K^{-1}\,mol^{-1}}$) $97.1$, $54.4$, $213.8$ to estimate the temperature at which the equilibrium $\mathrm{CO_2}$ pressure reaches $1\ \mathrm{bar}$. (Enter the temperature in K to the nearest kelvin.)
::: solution
$\Delta_\mathrm{r}H^\circ = -592.0 - 393.5 + 1220.1 = 234.6\ \mathrm{kJ\,mol^{-1}}$; $\Delta_\mathrm{r}S^\circ = 54.4 + 213.8 - 97.1 = 171.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$; $T = 234\,600/171.1 = 1371\ \mathrm{K}$. This sits between calcium ($1119\ \mathrm{K}$) and barium ($1562\ \mathrm{K}$), as the size-matching principle requires; the entropy term is almost the same as for calcium carbonate, so the whole difference is enthalpic.
:::
:::

::: exercise An O–H isotope effect {level=2 check="10.6"}
An $\mathrm{O{-}H}$ stretch at $3600\ \mathrm{cm^{-1}}$ becomes $2621\ \mathrm{cm^{-1}}$ on deuteration. Using the semiclassical model of [[#prop-kie]] with $hc/k_\mathrm{B} = 1.4388\ \mathrm{cm\,K}$, estimate the maximum $k_\mathrm{H}/k_\mathrm{D}$ at $298.15\ \mathrm{K}$ for a reaction that breaks this bond in its rate-determining step. (Enter the ratio to three significant figures.)
::: solution
Exponent $= 1.4388 \times (3600 - 2621)/(2 \times 298.15) = 1.4388 \times 979/596.3 = 2.362$; $k_\mathrm{H}/k_\mathrm{D} = e^{2.362} = 10.6$. It is larger than for $\mathrm{C{-}H}$ because the $\mathrm{O{-}H}$ stretch has a higher frequency and so more zero-point energy to lose. In practice proton transfers between oxygen atoms often show smaller effects, because the proton is shared at the transition state and keeps part of its zero-point energy — one of the assumptions of the model.
:::
:::

::: exercise The minimum energy for electrolytic hydrogen {level=2 check="32.7"}
For $\mathrm{H_2O(l) \rightarrow H_2(g) + \tfrac12\,O_2(g)}$ at $298\ \mathrm{K}$, $\Delta_\mathrm{r}G^\circ = +237.1\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}H^\circ = +285.8\ \mathrm{kJ\,mol^{-1}}$. Calculate the minimum electrical energy needed to make $1\ \mathrm{kg}$ of hydrogen ($M = 2.016\ \mathrm{g\,mol^{-1}}$), and the corresponding cell voltage. Why do real electrolysers use more? (Enter the energy in kWh to three significant figures.)
::: solution
One kilogram is $1000/2.016 = 496.0\ \mathrm{mol}$. Minimum electrical work $= 496.0 \times 237.1\ \mathrm{kJ} = 1.176\times10^{5}\ \mathrm{kJ} = 117.6\ \mathrm{MJ}$, and dividing by $3.6\ \mathrm{MJ\,kWh^{-1}}$ gives $32.7\ \mathrm{kWh}$. The voltage is $E = \Delta_\mathrm{r}G^\circ/nF = 237\,100/(2 \times 96\,485) = 1.23\ \mathrm{V}$. At this voltage the remaining $T\Delta_\mathrm{r}S^\circ = 48.7\ \mathrm{kJ\,mol^{-1}}$ must be supplied as heat; at $\Delta_\mathrm{r}H^\circ/2F = 1.48\ \mathrm{V}$ (the thermoneutral voltage) the cell neither absorbs nor rejects heat. Real cells run near $1.8$–$2\ \mathrm{V}$ because of the activation overpotentials at both electrodes (largest for oxygen evolution) and ohmic losses in electrolyte and membrane, so practical consumption is typically 50–55 kWh per kilogram.
:::
:::

::: exercise Sodium against potassium {level=3}
Potassium has a more negative standard potential than sodium ($-2.93$ against $-2.71\ \mathrm{V}$). Using $\Delta_\mathrm{at}H^\circ$ ($\mathrm{K}$: $89.0$; $\mathrm{Na}$: $107.5\ \mathrm{kJ\,mol^{-1}}$), $IE_1$ ($418.8$; $495.8$) and $\Delta_\mathrm{f}H^\circ(\mathrm{M^+,aq})$ ($-252.4$; $-240.1$), find the difference in hydration enthalpy $\Delta_\mathrm{hyd}H^\circ(\mathrm{K^+}) - \Delta_\mathrm{hyd}H^\circ(\mathrm{Na^+})$, and explain why the order of potentials is $\mathrm{Li} < \mathrm{K} < \mathrm{Na}$ (most negative first) rather than following either ionisation energy or hydration alone.
::: hint
Set up the same cycle as [[#ex-li-potential]] and subtract the sodium column from the potassium column.
:::
::: solution
For each metal $\Delta_\mathrm{f}H^\circ(\mathrm{M^+,aq}) = \Delta_\mathrm{at}H^\circ + IE_1 + \Delta_\mathrm{hyd}H^\circ$ (+ a constant). K minus Na: $-12.3 = -18.5 - 77.0 + \Delta\Delta_\mathrm{hyd}H^\circ$, so $\Delta\Delta_\mathrm{hyd}H^\circ = +83.2\ \mathrm{kJ\,mol^{-1}}$: potassium's larger ion is hydrated $83\ \mathrm{kJ\,mol^{-1}}$ *less* exothermically. But potassium saves $96\ \mathrm{kJ\,mol^{-1}}$ on atomisation and ionisation, so it comes out ahead by $12\ \mathrm{kJ\,mol^{-1}}$ in enthalpy (and by $21\ \mathrm{kJ\,mol^{-1}}$ in free energy, $0.22\ \mathrm{V}$, once entropy is included). Down the group from sodium the ionisation and atomisation savings outrun the hydration loss, so the potentials become slowly more negative; from sodium up to lithium the hydration gain ($115\ \mathrm{kJ\,mol^{-1}}$, [[#ex-li-potential]]) outruns the ionisation and atomisation losses ($76\ \mathrm{kJ\,mol^{-1}}$). The potential is a small difference of large terms, and different terms win at different ends of the group — which is why it is the one non-monotonic row in the table.
:::
:::

::: exercise The Kapustinskii bracket {level=3}
(a) Show that the lattice-energy gain on decomposing $\mathrm{MX \rightarrow MY}$ (same charges, $r_\mathrm{X} > r_\mathrm{Y}$) in the Kapustinskii approximation is proportional to $f(r_+) = 1/(r_+ + r_\mathrm{Y}) - 1/(r_+ + r_\mathrm{X})$, and prove that $f$ decreases as $r_+$ increases. (b) Evaluate $f$ for $\mathrm{Li^+}$ ($76\ \mathrm{pm}$) and $\mathrm{K^+}$ ($138\ \mathrm{pm}$) with $\mathrm{Y} = \mathrm{O^{2-}}$ ($140\ \mathrm{pm}$, as $\mathrm{M_2O}$) and $\mathrm{X} = \mathrm{O_2^{2-}}$ (take $173\ \mathrm{pm}$), and use the result to explain why lithium burns to the oxide and potassium does not stop at the oxide.
::: hint
Write $f$ over a common denominator and look at how numerator and denominator depend on $r_+$.
:::
::: solution
(a) In Kapustinskii's equation the lattice enthalpy is $K\nu|z_+z_-|/(r_+ + r_-)$; with the same charges and the same $\nu$ for both salts, the change is $K\nu|z_+z_-|\,f(r_+)$. Over a common denominator,
$$
f(r_+) = \frac{r_\mathrm{X} - r_\mathrm{Y}}{(r_+ + r_\mathrm{X})(r_+ + r_\mathrm{Y})}.
$$
The numerator is a positive constant and the denominator increases with $r_+$, so $f$ decreases monotonically (its derivative is $-(r_\mathrm{X} - r_\mathrm{Y})(2r_+ + r_\mathrm{X} + r_\mathrm{Y})/[(r_+ + r_\mathrm{X})(r_+ + r_\mathrm{Y})]^2 < 0$). (b) Lithium: $33/(249 \times 216) = 6.14\times10^{-4}\ \mathrm{pm^{-1}}$; potassium: $33/(311 \times 278) = 3.82\times10^{-4}\ \mathrm{pm^{-1}}$. The lattice reward for converting peroxide to oxide is about 60 % larger for lithium. The cost of the conversion (breaking the $\mathrm{O{-}O}$ bond and putting a second negative charge on each oxygen) is the same for both metals, so for lithium the reward exceeds it and $\mathrm{Li_2O}$ is the product, while for potassium the smaller reward does not, and the larger anions — peroxide and, with still more oxygen, superoxide — survive. Real radii and structures modify the numbers, but not the sign of the trend.
:::
:::
