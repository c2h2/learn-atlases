About a third of all proteins need a metal to work. The iron in haemoglobin carries the oxygen you are breathing now; zinc in carbonic anhydrase turns the carbon dioxide you produce into hydrogencarbonate a million times a second per enzyme molecule; copper and iron in cytochrome *c* oxidase reduce that oxygen to water at the end of the respiratory chain; a manganese–calcium cluster in photosystem II made all the oxygen in the atmosphere; and an iron–molybdenum–sulfur cluster in nitrogenase fixes the nitrogen that ends up in your proteins. Each of these sites is a coordination compound, with amino-acid side chains, a porphyrin or water as ligands, and each works because of the ideas of the previous chapters: ligand field effects on spin state and redox potential, the stability and lability of complexes, hard–soft matching, and the mechanisms of substitution and electron transfer.

This chapter surveys the main kinds of metal site in biology: oxygen carriers, electron-transfer proteins, metalloenzymes, and the medical use of metals in drugs and imaging agents. Its emphasis is chemical: what the metal does that an organic group could not, and how the protein tunes it. The biochemistry of the same proteins, their structures and their place in metabolism, is in [[biochemistry/protein-function]] and [[biochemistry/oxidative-phosphorylation]]. Medical statements here are for education only; nothing in this chapter is advice on treatment.

## Metal sites in proteins

::: definition Metalloproteins and their ligands {#def-metalloprotein}
A **metalloprotein** contains one or more metal ions bound to the protein; a **metalloenzyme** is a metalloprotein whose metal takes part in catalysis. The metal may be bound directly by amino-acid side chains (histidine imidazole N, cysteine thiolate S, methionine thioether S, aspartate and glutamate carboxylate O, tyrosine phenolate O, the peptide backbone) and water, or held in an organic **cofactor** such as a porphyrin (haem), a corrin (cobalamin) or a pterin. The coordination sphere is set by the protein's three-dimensional structure, which can impose geometries, donor sets and second-sphere interactions (hydrogen bonds, electrostatics, hydrophobic pockets) that the free ion would not adopt. The idea that the protein holds a metal in a strained, reactive geometry close to the transition state of its reaction is the **entatic state** hypothesis of Bert Vallee and Robert Williams (1968).
:::

Which metal goes where follows the rules of [[coordination-chemistry/complex-stability]]. Hard ions ($\mathrm{Na^+}$, $\mathrm{K^+}$, $\mathrm{Mg^{2+}}$, $\mathrm{Ca^{2+}}$) bind to carboxylates, phosphates and water, are labile, and serve as charge carriers, structural ions and signals. Borderline and soft ions bind nitrogen and sulfur. The Irving–Williams series means that copper and zinc would win almost any competition for a protein site against manganese, iron or cobalt; cells prevent mismetallation by keeping free copper and zinc at extremely low concentrations (free $\mathrm{Cu^+}$ in the cytoplasm is estimated to be below $10^{-18}\ \mathrm{mol\,dm^{-3}}$) and by delivering metals with dedicated chaperone proteins.

## Oxygen transport: myoglobin and haemoglobin

Oxygen is poorly soluble in water (about $0.25\ \mathrm{mmol\,dm^{-3}}$ in equilibrium with air at $25\ ^\circ\mathrm{C}$), far too little to supply a large animal. Vertebrates carry it bound to iron(II) in **haemoglobin** (Hb, in red blood cells) and store it in **myoglobin** (Mb, in muscle). Both contain **haem**: iron(II) in the plane of a dianionic porphyrin (protoporphyrin IX), bonded to its four pyrrole nitrogens and, on one side, to a histidine (the **proximal histidine**). The sixth site, on the other side, binds $\mathrm{O_2}$; a second histidine (the **distal histidine**) lies above it in the pocket.

In **deoxy** haemoglobin the iron is five-coordinate, high-spin $d^6$ ($S = 2$), with two electrons in the σ-antibonding $e_g$-type orbitals. High-spin iron(II) is too large to fit in the porphyrin hole, and it sits about $40\ \mathrm{pm}$ out of the plane towards the proximal histidine. When $\mathrm{O_2}$ binds, the iron becomes six-coordinate and **low spin**, the antibonding orbitals empty, the iron shrinks and moves into the plane, pulling the proximal histidine with it. Oxyhaemoglobin is diamagnetic. Its O–O stretching frequency (about $1105\ \mathrm{cm^{-1}}$, between $\mathrm{O_2}$ at $1555\ \mathrm{cm^{-1}}$ and peroxide near $800$) shows that the bound dioxygen is close to superoxide; the site is best described, as Jerome Weiss proposed in 1964, as low-spin iron(III) bonded to $\mathrm{O_2^-}$, with the two spins antiferromagnetically coupled. Linus Pauling had described it as iron(II) bound to singlet $\mathrm{O_2}$ in 1936; the two descriptions are limiting resonance forms of one bent $\mathrm{Fe{-}O{-}O}$ unit.

::: proposition Oxygen binding curves {#prop-binding}
For a protein with a single, independent binding site (myoglobin), the fractional saturation at oxygen partial pressure $p$ is
$$
Y = \frac{p}{P_{50} + p},
$$ {#eq-mb}
where $P_{50}$ is the pressure at half saturation. For haemoglobin, whose four sites interact cooperatively, the saturation is described empirically by the **Hill equation**
$$
Y = \frac{p^{\,n}}{P_{50}^{\,n} + p^{\,n}}, \qquad \log\frac{Y}{1 - Y} = n\log p - n\log P_{50},
$$ {#eq-hill}
with Hill coefficient $n \approx 2.8$ for human haemoglobin. The Hill equation is exact only for the limiting case of all-or-none binding of $n$ ligands; for real haemoglobin it fits the middle of the curve, and $n$ is a measure of cooperativity, not the number of sites.
:::

::: proof
For a single site, $\mathrm{Mb + O_2 \rightleftharpoons MbO_2}$ with dissociation constant $K_\mathrm{d} = [\mathrm{Mb}]\,p/[\mathrm{MbO_2}]$, taking the dissolved oxygen as proportional to $p$ (Henry's law). Then $Y = [\mathrm{MbO_2}]/([\mathrm{Mb}] + [\mathrm{MbO_2}]) = p/(K_\mathrm{d} + p)$, and $Y = \tfrac12$ when $p = K_\mathrm{d}$, so $K_\mathrm{d} = P_{50}$. For the all-or-none model, suppose a protein with $n$ sites binds $n$ ligands in a single step, $\mathrm{P} + n\,\mathrm{O_2} \rightleftharpoons \mathrm{P(O_2)_n}$, with constant $K$ and no partially liganded species. The fraction of sites occupied is the fraction of protein in the fully bound form, $Y = Kp^n/(1 + Kp^n)$; writing $K = P_{50}^{-n}$ gives [[#eq-hill]]. Rearranging, $Y/(1 - Y) = (p/P_{50})^n$, and taking logarithms gives the linear **Hill plot**, whose slope is $n$. In haemoglobin partially liganded forms do exist, so the observed slope (about 2.8 near half saturation) is less than the number of sites (4), and it falls to 1 at very low and very high saturation, where only one site at a time is changing. Cooperativity arises because binding at one haem moves the iron into the porphyrin plane, the movement is transmitted through the proximal histidine to the protein, and it shifts the tetramer from a low-affinity (T) towards a high-affinity (R) quaternary structure, the model of Jacques Monod, Jeffries Wyman and Jean-Pierre Changeux (1965) and of Max Perutz's structural work.
:::

::: widget plot
f: x/(0.37 + x); x^n/(3.5^n + x^n)
x: 0, 14
y: 0, 1.05
sliders: n=2.8:1:4:0.1
vlines: 5.3; 13.3
labels: \text{myoglobin}, P_{50} = 0.37\ \mathrm{kPa}; \text{haemoglobin}, P_{50} = 3.5\ \mathrm{kPa}
caption: Fractional oxygen saturation against oxygen partial pressure $x$ in kPa, from [[#eq-mb]] and [[#eq-hill]] with typical human values ($P_{50} \approx 0.37\ \mathrm{kPa}$ (2.8 mmHg) for myoglobin and $3.5\ \mathrm{kPa}$ (26 mmHg) for haemoglobin; the slider sets the Hill coefficient, 2.8 for normal haemoglobin, 1 for a non-cooperative protein). The vertical lines mark the oxygen pressure in the lungs (about $13.3\ \mathrm{kPa}$) and in resting tissue (about $5.3\ \mathrm{kPa}$). Myoglobin is almost saturated at both and so cannot deliver oxygen between them; it releases its oxygen only at the much lower pressures in working muscle. The sigmoidal haemoglobin curve is steep exactly in the range between lungs and tissues. Set $n = 1$ to see how much less oxygen a non-cooperative haemoglobin with the same $P_{50}$ would deliver.
:::

::: example How much oxygen does haemoglobin deliver? {#ex-delivery}
Using [[#eq-hill]] with $P_{50} = 3.5\ \mathrm{kPa}$ and $n = 2.8$, find the saturation of haemoglobin in the lungs ($13.3\ \mathrm{kPa}$), in resting tissue ($5.3\ \mathrm{kPa}$) and in exercising muscle ($2.7\ \mathrm{kPa}$), and the fraction of its oxygen delivered at rest and during exercise. Compare with a non-cooperative protein ($n = 1$) with the same $P_{50}$, and with myoglobin.
::: solution
In the lungs $(13.3/3.5)^{2.8} = 3.80^{2.8} = 42.0$, so $Y = 42.0/43.0 = 0.977$. In resting tissue $(5.3/3.5)^{2.8} = 1.514^{2.8} = 3.19$, $Y = 3.19/4.19 = 0.762$. In exercising muscle $(2.7/3.5)^{2.8} = 0.771^{2.8} = 0.483$, $Y = 0.483/1.483 = 0.326$. Delivery: $0.977 - 0.762 = 0.215$ of the load at rest, and $0.977 - 0.326 = 0.651$ during exercise. For $n = 1$: $Y = 13.3/16.8 = 0.792$ in the lungs and $5.3/8.8 = 0.602$ in tissue, delivering $0.189$ at rest, and $0.792 - 0.435 = 0.357$ during exercise, about half the cooperative value. Myoglobin delivers only $0.973 - 0.935 = 0.038$ at rest. Cooperativity makes haemoglobin load fully in the lungs and unload steeply when demand rises: a molecular amplifier built from four haems and the spin-state change of iron(II).
:::
:::

### Carbon monoxide and the role of the protein

Free haem in solution is a poor oxygen carrier. Two iron(II) porphyrins and $\mathrm{O_2}$ react irreversibly, through a $\mu$-peroxo dimer, to give iron(III) $\mu$-oxo dimers, $\mathrm{[(porph)Fe{-}O{-}Fe(porph)]}$. The protein prevents this by isolating each haem in a pocket. It also discriminates against carbon monoxide: free haem binds CO about $10^4$ times more strongly than $\mathrm{O_2}$, but in haemoglobin the ratio is only about 200–250. Carbon monoxide prefers a linear Fe–C–O unit and oxygen a bent Fe–O–O unit; the distal pocket accommodates the bent oxygen better, and the distal histidine donates a hydrogen bond to the terminal oxygen of the polar $\mathrm{Fe^{III}{-}O_2^-}$ unit, which CO cannot accept. Even reduced by the protein, the remaining preference makes CO a dangerous poison (a colourless, odourless gas, GHS06 and GHS08): it binds to haemoglobin in place of oxygen and also increases the oxygen affinity of the remaining sites, so that less oxygen is released to the tissues.

Other organisms use different chemistry. **Haemocyanin** (molluscs and arthropods) has two copper(I) ions, each bound by three histidines; oxygen binds between them as side-on peroxide, $\mathrm{Cu^{II}(\mu\text{-}\eta^2\!:\!\eta^2\text{-}O_2^{2-})Cu^{II}}$, and the colourless deoxy form turns blue. **Haemerythrin** (some marine worms) has two non-haem iron(II) ions bridged by hydroxide; oxygen binds to one iron as hydroperoxide, with the proton taken from the bridge.

## Electron-transfer proteins

Electron-transfer chains move electrons over long distances between redox enzymes, through a series of carriers with suitable potentials. The carriers must transfer electrons quickly, which in Marcus terms ([[coordination-chemistry/inorganic-mechanisms#prop-marcus]]) means a small reorganisation energy $\lambda$: the metal's coordination sphere must change very little between the two oxidation states.

- **Cytochromes** are haem proteins whose iron cycles between low-spin iron(II) and iron(III) ($t_{2g}^6$ and $t_{2g}^5$, so no $e_g$ electrons change and the Fe–N bonds hardly move). Cytochrome *c* has histidine and methionine as axial ligands; potentials range from about $-0.3$ to $+0.4\ \mathrm{V}$ depending on the axial ligands and the protein environment.
- **Iron–sulfur proteins** contain clusters of iron and sulfide bound by cysteine thiolates: rubredoxin (one Fe, four Cys), $\mathrm{[2Fe{-}2S]}$ ferredoxins, the Rieske centre (two of the cysteines replaced by histidines, raising the potential), and $\mathrm{[4Fe{-}4S]}$ cubane clusters. The electrons are delocalised over the cluster, so a one-electron change alters each iron's charge by only a fraction and the reorganisation energy is small. $\mathrm{[4Fe{-}4S]}$ clusters use the $\mathrm{2+/1+}$ couple in ferredoxins (around $-0.4\ \mathrm{V}$) and the $\mathrm{3+/2+}$ couple in high-potential iron–sulfur proteins (around $+0.35\ \mathrm{V}$); the protein decides which couple is accessible.
- **Blue copper proteins** (plastocyanin, azurin) contain one copper bonded to two histidines, a cysteine thiolate and, more weakly, a methionine thioether, in a distorted tetrahedral geometry.

::: example The blue copper site {#ex-blue-copper}
Plastocyanin is intensely blue, absorbing at about $597\ \mathrm{nm}$ with $\varepsilon \approx 4500\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$, and has $E^{\circ\prime} = +0.37\ \mathrm{V}$, against $+0.153\ \mathrm{V}$ for $\mathrm{Cu^{2+}/Cu^+}$ in water. (a) Why can the band not be a $d$–$d$ transition? (b) Explain the high potential. (c) Why is a distorted tetrahedral site good for fast electron transfer?
::: solution
(a) Copper(II) $d$–$d$ bands in tetragonal complexes have $\varepsilon$ of about 10–100 ([[coordination-chemistry/spectra-of-complexes#prop-selection]]); a value near 4500 needs an allowed transition. It is a ligand-to-metal charge-transfer band from the cysteine thiolate (a soft, easily oxidised donor with a strongly covalent Cu–S bond) to the half-filled copper orbital. (b) By [[coordination-chemistry/complex-stability#prop-redox-shift]], $\log(\beta^\mathrm{II}/\beta^\mathrm{I}) = (0.153 - 0.37)/0.05916 = -3.7$: the site binds copper(I) about $10^{3.7}$ times more strongly than copper(II), relative to water. Copper(I), $d^{10}$, is soft and prefers tetrahedral coordination with sulfur donors; copper(II) prefers a tetragonal geometry with harder donors. The protein imposes a geometry and donor set closer to copper(I)'s preferences, raising the potential. (c) Copper(I) and copper(II) normally have very different geometries (tetrahedral against square planar), so electron transfer between them in solution needs large reorganisation and is slow. The protein holds both oxidation states in nearly the same distorted geometry, the entatic state, so $\lambda$ is small and self-exchange is fast.
:::
:::

## Metalloenzymes

The catalytic metals use the chemistry of the previous chapters in a few recurring ways: as **Lewis acids** that activate a substrate or lower the $\mathrm{p}K_\mathrm{a}$ of coordinated water (zinc), as **redox catalysts** that bind and activate $\mathrm{O_2}$, $\mathrm{H_2O_2}$ or $\mathrm{N_2}$ (iron, copper, manganese, molybdenum), and as **radical generators** through weak metal–carbon bonds (cobalt in vitamin $\mathrm{B_{12}}$).

### Zinc as a Lewis acid: carbonic anhydrase

Carbonic anhydrase catalyses $\mathrm{CO_2 + H_2O \rightleftharpoons HCO_3^- + H^+}$, one of the fastest enzymes known, with a turnover number of about $10^6\ \mathrm{s^{-1}}$. Its zinc is bound by three histidines and one water, in a tetrahedral site. Coordination to $\mathrm{Zn^{2+}}$ lowers the $\mathrm{p}K_\mathrm{a}$ of that water from about 14 (strictly 15.7 on the molar scale) to about 7, so a substantial fraction exists as $\mathrm{Zn{-}OH^-}$ at physiological pH. The zinc-bound hydroxide attacks the carbon of $\mathrm{CO_2}$ held in a hydrophobic pocket, giving a zinc-bound hydrogencarbonate that is displaced by water; a histidine shuttle then removes the proton from the new zinc water to regenerate $\mathrm{Zn{-}OH^-}$. Zinc is ideal for this role: as $d^{10}$ it has no ligand field preference, so it changes coordination number easily during the cycle; it is redox-inactive, so it cannot generate radicals; and it is a strong enough Lewis acid to lower the $\mathrm{p}K_\mathrm{a}$ by seven units.

::: example How much zinc hydroxide? {#ex-carbonic}
Taking $\mathrm{p}K_\mathrm{a} = 7.0$ for the zinc-bound water of carbonic anhydrase, find the fraction of the enzyme in the active $\mathrm{Zn{-}OH^-}$ form at pH 7.4 and at pH 6.5. How would you expect the rate to vary with pH?
::: solution
$\mathrm{Zn{-}OH_2 \rightleftharpoons Zn{-}OH^- + H^+}$; the fraction deprotonated is $f = 1/(1 + 10^{\mathrm{p}K_\mathrm{a} - \mathrm{pH}})$. At pH 7.4: $f = 1/(1 + 10^{-0.4}) = 1/(1 + 0.398) = 0.715$. At pH 6.5: $f = 1/(1 + 10^{0.5}) = 1/(1 + 3.16) = 0.240$. Since the hydroxide form is the nucleophile, the rate of $\mathrm{CO_2}$ hydration follows $f$, rising sigmoidally with pH with its midpoint at the $\mathrm{p}K_\mathrm{a}$, as observed. In bulk water at pH 7.4, by contrast, hydroxide is present at only $10^{-6.6}\ \mathrm{mol\,dm^{-3}}$, about one ion for every $2\times10^8$ water molecules, against 72 % of the zinc-bound waters: a measure of what coordination to $\mathrm{Zn^{2+}}$ does to acidity.
:::
:::

### Redox enzymes

Many enzymes bind dioxygen and use it as an oxidant. **Cytochrome P450** enzymes, haem proteins with a cysteine thiolate as proximal ligand, hydroxylate unactivated C–H bonds in drug metabolism and steroid synthesis. They do this through a high-valent iron(IV)-oxo porphyrin radical cation, "compound I", formally iron(V), which abstracts a hydrogen atom from the substrate and returns a hydroxyl group to the resulting radical ("oxygen rebound"). The thiolate ligand, a strong electron donor, helps to stabilise this intermediate. **Cytochrome *c* oxidase** reduces $\mathrm{O_2}$ to water with four electrons and four protons at a haem-iron/copper site, without releasing partially reduced oxygen species, and uses the energy to pump protons ([[biochemistry/oxidative-phosphorylation]]).

**Photosystem II** oxidises water to $\mathrm{O_2}$ at a $\mathrm{Mn_4CaO_5}$ cluster, which stores four oxidising equivalents in successive light-driven steps (the "S-state" cycle of Bessel Kok) before releasing $\mathrm{O_2}$; the high oxidation states of manganese (III and IV) and the oxide bridges make this possible. **Nitrogenase** reduces $\mathrm{N_2}$ to ammonia at the FeMo cofactor, $\mathrm{MoFe_7S_9C}$, a cluster with a central carbide whose structure was completed only in 2011; it consumes 16 ATP and evolves one $\mathrm{H_2}$ per $\mathrm{N_2}$ reduced. The Haber–Bosch process does the same reaction on iron at about $400$–$500\ ^\circ\mathrm{C}$ and $150$–$300\ \mathrm{bar}$ ([[green-chemistry/industrial-inorganic]]); nitrogenase does it at room temperature, and how it does so is still being worked out.

**Vitamin $\mathrm{B_{12}}$** (cobalamin) holds cobalt in a corrin macrocycle. Its coenzyme forms have a cobalt–carbon bond, to a 5′-deoxyadenosyl or methyl group, one of the very few metal–carbon bonds in biology. The Co–C bond of adenosylcobalamin is weak (about $130\ \mathrm{kJ\,mol^{-1}}$) and breaks homolytically in the enzyme to give cobalt(II) and an adenosyl radical, which initiates radical rearrangements. Dorothy Hodgkin's X-ray structure of vitamin $\mathrm{B_{12}}$ (1956) was a landmark of crystallography.

::: quiz
Which statements about biological metal sites are correct?
- [x] Deoxyhaemoglobin contains high-spin iron(II) displaced from the porphyrin plane.
- [ ] Zinc is used in carbonic anhydrase because it is easily oxidised and reduced.
- [x] Electron-transfer proteins keep the coordination geometry nearly the same in both oxidation states.
- [ ] Oxyhaemoglobin is paramagnetic with two unpaired electrons.
- [x] Iron–sulfur clusters delocalise the transferred electron over several iron atoms.
::: solution
Deoxy-Hb is high-spin $d^6$, too large for the porphyrin hole. Zinc(II) is redox-inactive; its virtues are Lewis acidity and flexible coordination. Small structural change between oxidation states means small reorganisation energy and fast electron transfer, the strategy of cytochromes, Fe–S proteins and blue copper sites. Oxyhaemoglobin is diamagnetic (low-spin Fe(III)–superoxide with antiferromagnetically coupled spins, or Fe(II)–singlet $\mathrm{O_2}$). Delocalisation in Fe–S clusters spreads the charge change over the cluster.
:::
:::

## Metals in medicine

### Platinum anticancer drugs

Barnett Rosenberg discovered in 1965 that electrolysis of a bacterial culture with platinum electrodes in an ammonium chloride medium stopped the bacteria from dividing, and traced the effect to *cis*-$\mathrm{[PtCl_2(NH_3)_2]}$, **cisplatin**, formed from the electrodes. It became one of the most successful anticancer drugs, notably for testicular cancer; the *trans* isomer is inactive. Its mode of action is a sequence of ligand substitutions on square-planar platinum(II) ([[coordination-chemistry/inorganic-mechanisms]]).

::: proposition Activation of cisplatin by chloride loss {#prop-cisplatin}
For the first aquation step $\mathrm{[PtCl_2(NH_3)_2] + H_2O \rightleftharpoons [PtCl(H_2O)(NH_3)_2]^+ + Cl^-}$, with equilibrium constant $K$ (in $\mathrm{mol\,dm^{-3}}$, the activity of water taken as 1), the fraction of platinum present as the aqua complex at equilibrium, neglecting further aquation and hydrolysis, is
$$
f_\mathrm{aq} = \frac{K}{K + [\mathrm{Cl^-}]}.
$$ {#eq-aquation}
:::

::: proof
$K = [\mathrm{PtCl(H_2O)^+}][\mathrm{Cl^-}]/[\mathrm{PtCl_2}]$, so $[\mathrm{PtCl(H_2O)^+}]/[\mathrm{PtCl_2}] = K/[\mathrm{Cl^-}]$ and $f_\mathrm{aq} = (K/[\mathrm{Cl^-}])/(1 + K/[\mathrm{Cl^-}]) = K/(K + [\mathrm{Cl^-}])$. At high chloride the equilibrium lies on the dichlorido side; at low chloride it shifts towards the aqua complex. The aqua complex is the reactive species because water is a far better leaving group than chloride, so its substitution by a nucleophile is much faster.
:::

::: widget plot
f: K/(K + x); 1 - K/(K + x)
x: 0, 0.12
y: 0, 1
sliders: K=0.004:0.001:0.02:0.001
vlines: 0.1; 0.004
labels: \text{aquated fraction } f_\mathrm{aq}; \text{cisplatin } \mathrm{[PtCl_2(NH_3)_2]}
caption: Equilibrium fraction of cisplatin present as the monoaqua complex against chloride concentration $x$ in $\mathrm{mol\,dm^{-3}}$, from [[#eq-aquation]], with an illustrative aquation constant $K$ of order $10^{-3}$–$10^{-2}\ \mathrm{mol\,dm^{-3}}$ set by the slider. The vertical lines mark typical chloride concentrations in blood plasma (about $0.1\ \mathrm{mol\,dm^{-3}}$) and inside cells (a few $\mathrm{mmol\,dm^{-3}}$). In plasma the drug remains mostly as the neutral dichlorido complex, which can cross cell membranes; inside the cell the low chloride concentration lets it aquate, giving the charged, reactive aqua species that binds DNA. The equilibrium picture ignores the rates (aquation has a half-life of about two hours at body temperature) and the reactions of platinum with other cellular nucleophiles.
:::

The aqua complex binds the N7 atom of guanine in DNA, then loses its second chloride and binds a second base, mainly an adjacent guanine on the same strand: the 1,2-intrastrand $\mathrm{d(GpG)}$ crosslink, the major adduct. The crosslink bends and unwinds the double helix, is recognised by cellular proteins, and triggers cell death. The *cis* geometry is essential: only two *cis* sites can span adjacent bases on one strand. Carboplatin replaces the two chlorides by a chelating dicarboxylate, which hydrolyses more slowly and gives fewer side effects; oxaliplatin carries a chelating diamine (1,2-diaminocyclohexane) and an oxalate. Platinum compounds are cytotoxic, mutagenic and sensitising, and in the laboratory are handled with protection appropriate to these hazards.

### Imaging agents: gadolinium and technetium

**Gadolinium(III)** complexes are the most widely used contrast agents for magnetic resonance imaging. Gd³⁺ has seven unpaired electrons and a symmetric $^8S_{7/2}$ ground state ([[coordination-chemistry/f-block#ex-moments]]) with slow electron relaxation, so it is extremely effective at shortening the relaxation time of nearby water protons, and one coordinated water molecule exchanging rapidly with the bulk spreads this effect to many water molecules per second. Free $\mathrm{Gd^{3+}}$ is toxic (it competes with $\mathrm{Ca^{2+}}$, which has a similar size), so it is given as a very stable chelate with an octadentate polyaminocarboxylate ligand: open-chain DTPA or macrocyclic DOTA. Both have very large formation constants, but they differ in kinetic inertness. Macrocyclic complexes, which can only release the metal by an improbable unwrapping of several donors at once ([[coordination-chemistry/complex-stability]], macrocyclic effect), dissociate far more slowly. When retention of gadolinium in tissues, including the brain, was found after repeated doses of some open-chain agents, the European Medicines Agency in 2017 recommended suspending or restricting their use, in favour of macrocyclic agents. The episode is a direct application of the distinction between thermodynamic stability and kinetic inertness ([[coordination-chemistry/inorganic-mechanisms#warn-inert]]).

**Technetium-99m** is the workhorse of diagnostic nuclear medicine: it emits a $140\ \mathrm{keV}$ gamma ray, easy to image, with a half-life of $6.0\ \mathrm{h}$, long enough to prepare and administer a complex and short enough to limit the radiation dose. It is produced in hospital generators as pertechnetate, $\mathrm{[TcO_4]^-}$, from the decay of molybdenum-99, and reduced in kits in the presence of ligands that direct the complex to particular organs.

::: example Decay of a technetium-99m dose {#ex-tc}
What fraction of a $^{99m}\mathrm{Tc}$ preparation remains after $24.0\ \mathrm{h}$ ($t_{1/2} = 6.01\ \mathrm{h}$)? Why is the half-life of the parent $^{99}\mathrm{Mo}$ ($66\ \mathrm{h}$) convenient for a hospital?
::: solution
Radioactive decay is first order: $N/N_0 = (1/2)^{t/t_{1/2}} = (1/2)^{24.0/6.01} = (1/2)^{3.99} = 0.0628$, about 6 % ([[general-chemistry-2/nuclear-chemistry]]). The patient's radiation exposure therefore falls rapidly, which is part of what makes the isotope attractive. The parent $^{99}\mathrm{Mo}$, with a 66-hour half-life, decays slowly enough that a generator delivered once a week can be "milked" daily: technetium builds up between elutions and is washed off the column as pertechnetate, while molybdate stays bound.
:::
:::

::: warning Essential does not mean harmless, and toxic does not mean useless {#warn-essential}
It is tempting to divide the metals into "essential" (iron, zinc, copper) and "toxic" (mercury, cadmium, lead). Every metal has both faces, and the difference is concentration, speciation and kinetics. Free copper and iron ions catalyse the formation of hydroxyl radicals from hydrogen peroxide (Fenton chemistry), so cells keep them bound and chaperoned; iron overload and copper accumulation (Wilson's disease) cause disease. Conversely, compounds of platinum, arsenic (arsenic trioxide in a form of leukaemia) and gold (in older antirheumatic drugs) are used as medicines precisely because they react with biological ligands. What matters is the chemical form: free $\mathrm{Gd^{3+}}$ is toxic, its macrocyclic chelate is a diagnostic agent; methylmercury and inorganic mercury differ greatly in how they are absorbed and where they go. The coordination chemistry of this course is the language in which such differences are explained. This discussion is educational and not a guide to diagnosis or treatment.
:::

## Where this leads

Bioinorganic chemistry draws on the whole course: ligand fields set the spin-state change that makes haemoglobin cooperative, stability constants and the Irving–Williams series decide metal selectivity, mechanisms decide which drugs survive in the body, and Marcus theory describes biological electron transfer. The proteins themselves are studied in [[biochemistry/protein-function]] and [[biochemistry/enzymes]], their roles in energy metabolism in [[biochemistry/oxidative-phosphorylation]], and the design of metal-based drugs in [[medicinal-chemistry/drug-case-studies]]. Model complexes that reproduce features of enzyme sites, and catalysts inspired by them for water oxidation, nitrogen fixation and hydrogen production, connect this chapter to [[organometallics-catalysis]] and [[green-chemistry/carbon-hydrogen]].

::: history
The first metalloprotein structures were among the first protein structures of all: John Kendrew's myoglobin (1958, at 6 Å, then 2 Å in 1960) and Max Perutz's haemoglobin (1959–60), for which they shared the 1962 Nobel Prize in Chemistry. Linus Pauling and Charles Coryell showed in 1936 that oxyhaemoglobin is diamagnetic and deoxyhaemoglobin paramagnetic, the first use of magnetism to study a protein. Carbonic anhydrase was identified as a zinc enzyme by David Keilin and Thaddeus Mann in 1940. Dorothy Hodgkin determined the structure of vitamin $\mathrm{B_{12}}$ in 1956 (Nobel Prize 1964). Bert Vallee and Robert J. P. Williams proposed the entatic state in 1968. Barnett Rosenberg's discovery of the biological activity of cisplatin appeared in *Nature* in 1965, and cisplatin was approved for clinical use in the United States in 1978. The structure of the nitrogenase FeMo cofactor was solved progressively from 1992, with the central carbide identified in 2011, and that of the photosystem II manganese cluster at atomic resolution in 2011 by Jian-Ren Shen, Nobuo Kamiya and co-workers.
:::

::: summary
- Metal sites in proteins are coordination compounds with amino-acid and cofactor ligands; the protein sets geometry, donor set and second-sphere interactions, sometimes in an entatic state, and metal selection follows hard–soft rules and the Irving–Williams series.
- Haemoglobin and myoglobin bind $\mathrm{O_2}$ at iron(II) porphyrins; binding converts high-spin, out-of-plane iron(II) to a diamagnetic low-spin site (Fe(III)–superoxide), and the movement drives cooperativity ($n \approx 2.8$), which maximises delivery between lungs and tissues.
- The protein prevents irreversible oxidation of haem and reduces its preference for CO from about $10^4$ to about 200–250.
- Electron-transfer proteins (cytochromes, Fe–S clusters, blue copper) minimise reorganisation energy; their potentials are tuned by ligands and protein environment, as the redox-shift equation describes.
- Zinc serves as a redox-inactive Lewis acid (carbonic anhydrase, $\mathrm{p}K_\mathrm{a}$ of bound water about 7); iron, copper, manganese and molybdenum activate $\mathrm{O_2}$, $\mathrm{H_2O}$ and $\mathrm{N_2}$; cobalt in $\mathrm{B_{12}}$ makes radicals through a weak Co–C bond.
- Cisplatin is activated by aquation at low intracellular chloride and forms *cis* 1,2-intrastrand GpG crosslinks; Gd(III) MRI agents need both thermodynamic stability and kinetic inertness (macrocycles); $^{99m}\mathrm{Tc}$ is the main diagnostic radionuclide.
:::

## Exercises

::: exercise Myoglobin saturation {level=1 check="0.730"}
Using $P_{50} = 0.37\ \mathrm{kPa}$, find the fractional saturation of myoglobin at an oxygen pressure of $1.0\ \mathrm{kPa}$. (Enter $Y$ to three significant figures.)
::: solution
$Y = 1.0/(0.37 + 1.0) = 0.730$.
:::
:::

::: exercise Ligands and oxidation states {level=1}
For each site give the metal's oxidation state(s), the donor atoms and the coordination number: (a) deoxymyoglobin; (b) oxidised plastocyanin; (c) the zinc site of carbonic anhydrase; (d) rubredoxin.
::: solution
(a) Fe(II), four porphyrin N and one histidine N: five-coordinate, high spin. (b) Cu(II), two histidine N, one cysteine S and one methionine S: four-coordinate, distorted tetrahedral. (c) Zn(II), three histidine N and one water O (or hydroxide): four-coordinate, tetrahedral. (d) Fe(III) or Fe(II) (both are used), four cysteine S: tetrahedral, high spin.
:::
:::

::: exercise Haemoglobin in the lungs {level=1 check="0.977"}
With $P_{50} = 3.5\ \mathrm{kPa}$ and $n = 2.8$, find the saturation of haemoglobin at $13.3\ \mathrm{kPa}$. (Enter $Y$ to three significant figures.)
::: solution
$(13.3/3.5)^{2.8} = 3.80^{2.8}$; $\ln 3.80 = 1.335$, times 2.8 is $3.738$, $e^{3.738} = 42.0$. $Y = 42.0/43.0 = 0.977$.
:::
:::

::: exercise A Hill coefficient from two points {level=2 check="2.8"}
A haemoglobin sample is 20 % saturated at $2.13\ \mathrm{kPa}$ and 80 % saturated at $5.74\ \mathrm{kPa}$. Use [[#eq-hill]] to find $n$ and $P_{50}$. (Enter $n$ to two significant figures.)
::: hint
Divide the two forms $Y/(1 - Y) = (p/P_{50})^n$ to eliminate $P_{50}$.
:::
::: solution
$Y/(1 - Y)$ is $0.25$ at $p_1 = 2.13$ and $4$ at $p_2 = 5.74$. Dividing, $16 = (5.74/2.13)^n = 2.695^n$, so $n = \log16/\log2.695 = 1.204/0.4306 = 2.80$. Then $P_{50} = p_1 \times 0.25^{-1/n} = 2.13 \times 4^{1/2.8} = 2.13 \times 1.641 = 3.50\ \mathrm{kPa}$. A non-cooperative protein ($n = 1$) would need a sixteenfold rise in pressure to go from 20 % to 80 % saturation; haemoglobin needs less than threefold.
:::
:::

::: exercise Zinc water acidity {level=2 check="0.240"}
Find the fraction of carbonic anhydrase in the $\mathrm{Zn{-}OH^-}$ form at pH 6.5 if the $\mathrm{p}K_\mathrm{a}$ of the zinc-bound water is 7.0, and explain why the enzyme loses activity in acidic conditions. (Enter the fraction to three significant figures.)
::: solution
$f = 1/(1 + 10^{7.0 - 6.5}) = 1/(1 + 3.162) = 0.240$. The zinc hydroxide is the nucleophile that attacks $\mathrm{CO_2}$; as the pH falls below the $\mathrm{p}K_\mathrm{a}$ the site is increasingly the unreactive $\mathrm{Zn{-}OH_2}$, and activity falls with $f$.
:::
:::

::: exercise A technetium preparation {level=2 check="0.0628"}
Find the fraction of $^{99m}\mathrm{Tc}$ activity remaining $24.0\ \mathrm{h}$ after preparation ($t_{1/2} = 6.01\ \mathrm{h}$), and the time for the activity to fall to 1 %. (Enter the fraction remaining after 24.0 h, to three significant figures.)
::: solution
$(1/2)^{24.0/6.01} = 2^{-3.993} = 0.0628$. For 1 %: $t = t_{1/2}\log_2 100 = 6.01 \times 6.644 = 39.9\ \mathrm{h}$.
:::
:::

::: exercise Tuning a copper potential {level=3 check="-3.67"}
(a) Use [[coordination-chemistry/complex-stability#prop-redox-shift]] to find $\log(\beta^\mathrm{II}/\beta^\mathrm{I})$ for plastocyanin, $E^{\circ\prime} = +0.370\ \mathrm{V}$, relative to aqueous copper ($+0.153\ \mathrm{V}$). (b) Rusticyanin, a blue copper protein from an acidophilic bacterium, has $E^{\circ\prime} = +0.68\ \mathrm{V}$. By what factor does it favour copper(I) over copper(II) relative to plastocyanin? (c) Suggest two structural features a protein could use to raise the potential of a copper site. (Enter the value for (a), to three significant figures.)
::: solution
(a) $\log(\beta^\mathrm{II}/\beta^\mathrm{I}) = (0.153 - 0.370)/0.05916 = -3.67$. (b) The difference in potential is $0.68 - 0.37 = 0.31\ \mathrm{V}$, worth $0.31/0.05916 = 5.2$ log units: rusticyanin favours copper(I) relative to copper(II) about $10^{5.2} \approx 1.7\times10^5$ times more than plastocyanin does. (c) Enforce a tetrahedral geometry, which suits $d^{10}$ copper(I) and costs $d^9$ copper(II) its tetragonal Jahn–Teller stabilisation; use soft donors (thioethers, thiolates) that prefer copper(I); bury the site in a hydrophobic environment, which destabilises the more highly charged copper(II); and avoid hydrogen-bond donors or negative charges near the copper, which would stabilise copper(II). Rusticyanin is thought to combine a more hydrophobic environment with tighter constraints on the geometry.
:::
:::

::: exercise Cisplatin inside and outside the cell {level=3 check="0.5"}
Take $K = 4\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ as an illustrative value for the first aquation of cisplatin. Using [[#eq-aquation]], find the equilibrium fraction aquated (a) in plasma ($[\mathrm{Cl^-}] = 0.10\ \mathrm{mol\,dm^{-3}}$) and (b) in a cell with $[\mathrm{Cl^-}] = 4\ \mathrm{mmol\,dm^{-3}}$. (c) Explain why the drug is designed as a neutral dichlorido complex rather than as the aqua complex, and why the second chloride must also be labile. (Enter the fraction in (b).)
::: solution
(a) $f_\mathrm{aq} = 4\times10^{-3}/(4\times10^{-3} + 0.10) = 0.038$: about 4 % aquated in plasma. (b) $4\times10^{-3}/(4\times10^{-3} + 4\times10^{-3}) = 0.5$: half aquated inside the cell. (c) The neutral dichlorido complex crosses cell membranes (passively and with transporters) and reacts slowly with the many nucleophiles in plasma, so more of it reaches its target; a pre-formed cationic aqua complex would be taken up poorly and would react indiscriminately on the way. Once in the cell, aquation of the first chloride generates the species that binds the first guanine N7; loss of the second chloride (or water) then lets the platinum bind the neighbouring guanine, forming the 1,2-intrastrand crosslink. A complex with one labile and one inert leaving group could only bind DNA monofunctionally, which is much less cytotoxic. This illustrates how the kinetics of substitution, as much as the thermodynamics, determines the action of a metal drug.
:::
:::
