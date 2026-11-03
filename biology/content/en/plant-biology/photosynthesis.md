Every year the plants, algae and cyanobacteria of the Earth fix on the order of 100 billion tonnes of carbon from carbon dioxide into organic matter — the net primary production of land and oceans together — and release the oxygen that makes up a fifth of the atmosphere. Photosynthesis is the entry point of energy into the living world: the sugar in your breakfast, the fossil fuels formed from ancient forests and plankton, and the oxygen you use to burn them are all products of it. Its overall equation is simple,

$$
6\,\mathrm{CO_2} + 12\,\mathrm{H_2O} \xrightarrow{\ \text{light}\ } \mathrm{C_6H_{12}O_6} + 6\,\mathrm{O_2} + 6\,\mathrm{H_2O}, \qquad \Delta G^{\circ\prime} \approx +2870\ \text{kJ mol}^{-1},
$$

but behind it lies a machine of extraordinary sophistication: pigment antennae that capture photons and funnel their energy to reaction centres in less than a billionth of a second; a catalyst of manganese and calcium that splits water, which no human-made catalyst does as efficiently at room temperature; an electron transport chain that pumps protons for ATP synthesis; and a cycle of enzymes, led by the most abundant protein on Earth, that turns CO₂ into sugar.

This chapter follows the energy. We begin with light and pigments, then with the two photosystems and the **Z-scheme** of electron transport from water to NADP⁺, and with the chemiosmotic synthesis of ATP — the same principle as in mitochondria ([[biochemistry/oxidative-phosphorylation]]), run by light. We then turn to the **Calvin–Benson cycle**, its stoichiometry and regulation, and close with the response of whole leaves to light and the efficiency of the process. Along the way we will balance the books: how many photons, protons, ATP and NADPH it takes to fix one molecule of CO₂. The structure of the chloroplast was introduced in [[plant-biology/plant-cells-tissues]]; the problems caused by Rubisco's reaction with oxygen, and the C4 and CAM solutions, are the subject of [[plant-biology/c4-and-cam]].

## Light and pigments

Light comes in photons whose energy is fixed by their wavelength.

::: proposition Photon energy {#prop-photon}
A photon of wavelength $\lambda$ has energy $E = hc/\lambda$, where $h = 6.626\times10^{-34}$ J s is Planck's constant and $c = 2.998\times10^8$ m s⁻¹ the speed of light. One mole of photons (an **einstein**) therefore carries

$$
E_\text{mol} = \frac{hcN_\mathrm{A}}{\lambda} = \frac{1.196\times10^{5}\ \text{kJ nm mol}^{-1}}{\lambda}.
$$ {#eq-photon}
:::

::: example The energy of red and blue light {#ex-photon}
Find the energy of a mole of photons at 680 nm (red, absorbed by photosystem II) and at 450 nm (blue).
::: solution
By [[#eq-photon]], at 680 nm $E = 119{,}600/680 = 176$ kJ mol⁻¹, and at 450 nm $E = 119{,}600/450 = 266$ kJ mol⁻¹. Blue photons carry half as much energy again as red ones, but, as we shall see, photosynthesis cannot use the extra: a chlorophyll molecule excited by a blue photon relaxes within about a picosecond to its lowest excited state, losing the surplus as heat, so every absorbed photon does the same photochemical work as a red one. Plant physiologists therefore count light as photon flux — micromoles of photons per square metre per second in the **photosynthetically active radiation** (PAR) band, 400–700 nm — rather than as energy flux. Full sunlight at midday is about 2000 µmol m⁻² s⁻¹ of PAR.
:::
:::

The pigments that absorb light are bound to proteins in the thylakoid membranes. **Chlorophyll a** and **chlorophyll b** are tetrapyrroles with a magnesium ion at their centre and a long phytol tail anchoring them in the membrane; their conjugated ring of alternating single and double bonds absorbs strongly in the blue (around 430–450 nm) and the red (around 640–680 nm), and weakly in the green, which is why leaves look green. **Carotenoids** (β-carotene and the xanthophylls lutein, violaxanthin, zeaxanthin and neoxanthin) absorb blue-green light, pass its energy to chlorophyll, and — more importantly — protect the apparatus by quenching dangerous excited states of chlorophyll and singlet oxygen. Even so, a leaf is not transparent to green light: multiple scattering inside the leaf gives green photons many chances to be absorbed, and a typical leaf absorbs 80–90 % of incident PAR.

In 1882 Theodor Engelmann laid a filament of the alga *Cladophora* across a tiny spectrum projected under a microscope, among aerotactic bacteria that swim towards oxygen. The bacteria crowded around the parts of the filament lit by red and blue light: the first **action spectrum** of photosynthesis, matching the absorption spectrum of chlorophyll.

### Antennae and reaction centres

In 1932 Robert Emerson and William Arnold illuminated the green alga *Chlorella* with brief, saturating flashes and measured the oxygen produced per flash. Even when every chlorophyll molecule should have absorbed a photon, only one O₂ appeared per roughly 2,500 chlorophylls. Since several photons are needed per O₂ (about eight, as we shall see), this meant that only about one chlorophyll in a few hundred could do photochemistry at a time; the rest served as an **antenna** that collects light and passes the energy on.

::: definition Antenna, reaction centre and photosynthetic unit {#def-antenna}
A **photosystem** is a pigment–protein complex in which an **antenna** of a few hundred chlorophyll and carotenoid molecules, held in light-harvesting proteins, absorbs photons and transfers the excitation energy by resonance energy transfer from molecule to molecule — always towards pigments that absorb at slightly longer wavelength, and thus lower energy — to a **reaction centre**. There a special pair of chlorophylls uses the energy to transfer an electron to an acceptor, creating a charge-separated state. The antenna together with its reaction centre is a **photosynthetic unit**.
:::

The funnel is fast and efficient. Excitation energy hops between chlorophylls every few hundred femtoseconds, reaching the reaction centre within tens to hundreds of picoseconds, and more than 90 % of absorbed photons in low light produce a charge separation. Antennae let a reaction centre — an expensive, complicated complex — work at a reasonable rate even in dim light, by collecting photons from a much larger area. In plants the main antenna is **light-harvesting complex II** (LHCII), the most abundant membrane protein on Earth, with chlorophylls a and b and carotenoids.

## Two photosystems in series

Splitting water and reducing NADP⁺ are both demanding. The couple O₂/H₂O has a standard redox potential at pH 7 of $+0.82$ V, and NADP⁺/NADPH one of $-0.32$ V. Moving electrons "uphill" across this span stores free energy, as we can calculate from the standard relation between redox potential and free energy ([[biochemistry/bioenergetics]]).

::: proposition Free energy of an electron transfer {#prop-redox}
When $n$ electrons are transferred from a donor couple with reduction potential $E_\text{donor}$ to an acceptor couple with potential $E_\text{acceptor}$,

$$
\Delta G = -nF\,\Delta E, \qquad \Delta E = E_\text{acceptor} - E_\text{donor},
$$ {#eq-redox}

where $F = 96.485$ kJ mol⁻¹ V⁻¹ is the Faraday constant. Transfer to a more positive acceptor is spontaneous ($\Delta G < 0$); transfer to a more negative one requires an input of energy.
:::

::: example How much energy does it take to make NADPH from water? {#ex-nadph}
Find the standard free energy needed to transfer two electrons from water to NADP⁺, and compare it with the energy of the four red photons actually used (two per electron).
::: solution
$\Delta E = E(\mathrm{NADP^+/NADPH}) - E(\mathrm{O_2/H_2O}) = -0.32 - 0.82 = -1.14$ V. By [[#eq-redox]], $\Delta G = -2\times96.485\times(-1.14) = +220$ kJ per mole of NADPH. Four moles of 680 nm photons supply $4\times176 = 704$ kJ, so about 31 % of the light energy is stored as NADPH; more is stored as ATP from the proton gradient. The rest is the price of making each step fast and irreversible, so that the separated charges do not recombine.
:::
:::

Red light alone was found to give lower quantum yields at wavelengths beyond about 680 nm (the "red drop"), and Emerson and colleagues (1957) showed that adding shorter-wavelength light restored them — more oxygen with both beams than the sum of each alone (the **Emerson enhancement effect**). Robin Hill and Fay Bendall (1960) explained this: there are two photosystems, working in series, each driven by its own photons. Drawn on a scale of redox potential, the electron's path forms a Z on its side.

::: definition The Z-scheme of linear electron flow {#def-zscheme}
In the thylakoid membrane:

1. **Photosystem II** (PSII) absorbs a photon; its reaction-centre chlorophylls, **P680**, pass an electron via pheophytin to the bound plastoquinones Q_A and Q_B. The oxidised P680⁺ — at about +1.2 V the strongest biological oxidant — takes an electron back from a tyrosine, which takes one from the **oxygen-evolving complex**, a Mn₄CaO₅ cluster. After four such steps the cluster oxidises two water molecules: $2\,\mathrm{H_2O} \to \mathrm{O_2} + 4\,\mathrm{H^+} + 4\,e^-$, releasing the protons into the thylakoid **lumen**.
2. Q_B, after receiving two electrons and taking up two protons from the stroma, leaves as **plastoquinol** (PQH₂) into the membrane's mobile pool.
3. The **cytochrome b₆f complex** oxidises plastoquinol, releasing its protons into the lumen, and passes electrons to **plastocyanin**, a small copper protein in the lumen. Through the **Q cycle**, one of each pair of electrons is recycled to plastoquinone, so that two protons are moved into the lumen per electron reaching plastocyanin.
4. **Photosystem I** (PSI) absorbs a photon; its reaction-centre chlorophylls, **P700**, are excited to about −1.2 V and pass an electron through a chain of acceptors (chlorophyll, phylloquinone and iron–sulfur clusters) to **ferredoxin** in the stroma. P700⁺ is re-reduced by plastocyanin.
5. **Ferredoxin–NADP⁺ reductase** (FNR) uses two reduced ferredoxins to reduce NADP⁺ to NADPH in the stroma.
:::

The two-step design reflects a limit: a single reaction centre cannot both generate a strong enough oxidant to split water and a strong enough reductant to reduce NADP⁺ from the energy of one red photon (1.8 eV), with enough to spare to make each step irreversible. Two photons per electron give the span needed, with losses that buy speed and stability.

::: widget plot
f: 119627/x
x: 380, 760
y: 0, 350
hlines: 110; 176
vlines: 400; 700
labels: E_\text{photon} = hcN_A/\lambda
caption: Energy of a mole of photons (kJ mol⁻¹, vertical) against wavelength (nm, horizontal), from [[#eq-photon]]; the vertical lines bound photosynthetically active radiation. The lower horizontal line, 110 kJ mol⁻¹, is the minimum free energy needed to move one mole of electrons from water to NADP⁺ ($F\times1.14$ V); the upper one marks a 680 nm photon. Every PAR photon carries more than the minimum, yet plants use two photons per electron: hover along the curve and notice that even a 700 nm photon has only about 1.5 times the minimum, too little margin for one photosystem to do the whole job irreversibly.
:::

### The water-oxidising clock

How does a complex that receives one electron hole per photon assemble four of them to split two water molecules? Pierre Joliot and colleagues (1969) gave dark-adapted chloroplasts a series of short flashes and measured the oxygen released by each. Almost none came on the first two flashes; a burst came on the third, and then every fourth flash, damped over time. Bessel Kok (1970) explained the pattern: the oxygen-evolving complex cycles through five states, S₀ to S₄, each flash advancing it one step and O₂ being released on the transition S₄ → S₀. In the dark the complex rests mostly in S₁, so the third flash brings it to S₄. The damping comes from occasional misses and double hits. The structure of PSII at 1.9 Å resolution, from the cyanobacterium *Thermosynechococcus vulcanus* (Yasufumi Umena, Jian-Ren Shen, Nobuo Kamiya and colleagues, 2011), revealed the cluster as a distorted chair of four manganese ions, one calcium and five oxygens.

::: quiz
DCMU (diuron), a herbicide, binds in the Q_B site of photosystem II. Isolated chloroplasts are illuminated with an artificial electron acceptor for either photosystem. Which statement is correct?
- [ ] DCMU stops O₂ evolution with any electron acceptor, because it blocks photosystem I
- [x] DCMU stops O₂ evolution and NADP⁺ reduction from water, but PSI can still reduce an acceptor if electrons are supplied to plastocyanin from an artificial donor
- [ ] DCMU has no effect on electron flow because it acts on the Calvin cycle
- [ ] DCMU increases O₂ evolution by preventing back-reactions
::: solution
DCMU displaces plastoquinone from the Q_B site, so electrons cannot leave PSII: water oxidation and everything downstream of PSII stop. PSI is undamaged; if an artificial donor (such as reduced DCPIP with ascorbate) feeds electrons into plastocyanin, PSI still reduces ferredoxin or an acceptor such as methyl viologen in the light. Experiments like this dissected the Z-scheme into its two halves. Many commercial herbicides (atrazine, diuron) act at this site.
:::
:::

## Making ATP: photophosphorylation

Light-driven electron flow builds a proton-motive force across the thylakoid membrane: protons are released into the lumen by water oxidation and by plastoquinol oxidation at the cytochrome b₆f complex, and taken from the stroma when plastoquinone and NADP⁺ are reduced. In the light the lumen falls to about pH 5–6 while the stroma rises to about pH 8; unlike in mitochondria, most of the proton-motive force is in the pH difference, because counter-ion movements (Cl⁻ in, Mg²⁺ out of the lumen) collapse most of the membrane potential. The protons return to the stroma through **ATP synthase** (CF₀CF₁), whose CF₁ head projects into the stroma, so ATP is made where the Calvin–Benson cycle needs it.

The chemiosmotic mechanism was demonstrated most elegantly in chloroplasts. André Jagendorf and Ernest Uribe (1966) soaked thylakoids in the dark in a buffer at pH 4, so that the lumen became acidic, and then transferred them suddenly to pH 8 with ADP and phosphate: they made ATP in the dark, driven by nothing but the artificial pH gradient.

### The ATP:NADPH budget

The rotary mechanism of ATP synthase sets the number of protons needed for each ATP: one full turn of the rotor makes three ATP and moves as many protons as there are c subunits in its membrane ring. In spinach chloroplasts the ring has 14 subunits (Holger Seelert and colleagues, 2000), giving $14/3 \approx 4.67$ H⁺ per ATP.

::: example Is linear electron flow enough? {#ex-budget}
For each O₂ evolved, linear electron flow moves 4 electrons from water to NADP⁺, producing 2 NADPH. (a) How many protons enter the lumen per O₂? (b) How many ATP can be made from them, with 14/3 H⁺ per ATP? (c) The Calvin–Benson cycle needs 3 ATP and 2 NADPH per CO₂ fixed. Is linear flow sufficient? (d) If the deficit is made good by **cyclic electron flow** around PSI — electrons from ferredoxin returned to the plastoquinone pool, pumping 2 H⁺ per electron through the cytochrome b₆f complex — how many extra photons are needed per CO₂?
::: solution
(a) Water oxidation releases 4 H⁺ into the lumen; the Q cycle at cytochrome b₆f moves 2 H⁺ per electron, so $2\times4 = 8$. Total: **12 H⁺ per O₂**.

(b) $12/(14/3) = 2.57$ ATP per 2 NADPH, a ratio of 1.29 ATP per NADPH.

(c) The cycle needs $3/2 = 1.5$ ATP per NADPH. Linear flow is short by $3 - 2.57 = 0.43$ ATP per CO₂.

(d) The shortfall requires $0.43\times14/3 = 2.0$ more protons, i.e. 1 electron cycled around PSI, which needs **1 extra photon** absorbed by PSI. With linear flow requiring 8 photons per CO₂ (4 electrons × 2 photosystems), the total is about 9 photons per CO₂ — close to the measured minimum quantum requirements of 9–10 photons per O₂ in leaves and algae. The budget explains why cyclic electron flow, once thought a curiosity, is essential: plants without the main cyclic pathways (in *Arabidopsis*, the PGR5–PGRL1 route and the NDH complex) grow poorly, especially in fluctuating light.
:::
:::

::: intuition Why the ATP:NADPH ratio must be adjustable
A cell that made ATP and NADPH in a fixed ratio would be in trouble whenever demand changed. Besides the Calvin–Benson cycle, the chloroplast consumes ATP for protein synthesis and repair, for starch and lipid synthesis and for importing proteins, and reductant for nitrite and sulfate assimilation; photorespiration ([[plant-biology/c4-and-cam]]) needs more ATP per NADPH than carbon fixation does. Cyclic electron flow, which makes ATP without NADPH, and other "valves" that pass electrons to oxygen let the chloroplast tune the ratio from moment to moment. The fact that the c-ring stoichiometry varies between organisms (from 8 to 17 subunits among known ATP synthases) is a reminder that the ratio is not set by chemistry alone but by evolutionary tuning.
:::

## The Calvin–Benson cycle

The ATP and NADPH made in the light are spent in the stroma to reduce CO₂. The pathway was worked out by Melvin Calvin, Andrew Benson, James Bassham and colleagues in Berkeley between 1946 and 1954, using the newly available radioisotope ¹⁴C. They fed ¹⁴CO₂ to suspensions of *Chlorella* and *Scenedesmus* in the light for periods from a few seconds to minutes, killed the cells by dropping them into hot alcohol, separated the labelled compounds by two-dimensional paper chromatography and identified them on X-ray film. After a few seconds most of the label was in a single compound, **3-phosphoglycerate** (3-PGA), with the label in its carboxyl group. Its carbon came from the addition of CO₂ to a five-carbon acceptor, **ribulose 1,5-bisphosphate** (RuBP): when the light was switched off RuBP fell and 3-PGA rose, and when CO₂ was removed RuBP rose and 3-PGA fell.

::: definition The three phases of the Calvin–Benson cycle {#def-calvin}
1. **Carboxylation.** Ribulose-1,5-bisphosphate carboxylase/oxygenase (**Rubisco**) adds CO₂ to RuBP; the unstable six-carbon intermediate splits into two molecules of 3-PGA.
2. **Reduction.** 3-PGA is phosphorylated by ATP to 1,3-bisphosphoglycerate, which is reduced by NADPH to **glyceraldehyde 3-phosphate** (G3P), a triose phosphate — the reverse of steps of glycolysis ([[biochemistry/glycolysis-tca]]), but using NADPH.
3. **Regeneration.** Five of every six triose phosphates are rearranged by a series of transketolase, aldolase and phosphatase reactions (with four-, five-, six- and seven-carbon sugar phosphates as intermediates) into three five-carbon sugar phosphates, which **phosphoribulokinase** phosphorylates with ATP back to RuBP.
:::

::: proposition Stoichiometry of the Calvin–Benson cycle {#prop-calvin}
For three turns of the cycle,

$$
3\,\mathrm{CO_2} + 9\,\mathrm{ATP} + 6\,\mathrm{NADPH} + 5\,\mathrm{H_2O} \longrightarrow \mathrm{G3P} + 9\,\mathrm{ADP} + 8\,\mathrm{P_i} + 6\,\mathrm{NADP^+},
$$ {#eq-calvin}

so each CO₂ fixed costs **3 ATP and 2 NADPH**.
:::

::: proof
Carboxylation of 3 RuBP (15 C) with 3 CO₂ (3 C) gives 6 3-PGA (18 C). Reducing all 6 requires 6 ATP and 6 NADPH and gives 6 G3P (18 C). One G3P (3 C) is the net product; the other 5 G3P (15 C) are rearranged into 3 ribulose 5-phosphate (15 C), and phosphorylating them to 3 RuBP costs 3 more ATP. Total: 9 ATP and 6 NADPH per 3 CO₂. (The phosphate count: 9 ATP give 9 Pᵢ-equivalents, of which one remains in the exported G3P.)
:::

The product, triose phosphate, has two fates. By day, some is exported from the chloroplast in exchange for phosphate by the **triose phosphate/phosphate translocator** and used in the cytosol to make **sucrose**, the sugar exported in the phloem ([[plant-biology/water-transport]]). Some is kept in the chloroplast and made into **starch**, which is broken down at night to supply sucrose and energy until dawn. *Arabidopsis* adjusts its rate of nocturnal starch breakdown so that about 95 % of the starch is used, at a constant rate, by the expected time of dawn — a calculation involving the circadian clock ([[plant-biology/plant-responses]]).

### Rubisco

Rubisco is a slow enzyme: its catalytic rate is only about 2–5 reactions per second per active site in plants, against hundreds or thousands for typical enzymes. Plants compensate with quantity. The plant form is a hexadecamer of eight large subunits, encoded in the chloroplast genome, and eight small subunits, encoded in the nucleus (molecular mass about 550 kDa, with eight active sites); it makes up a large fraction of leaf soluble protein and of leaf nitrogen, and is probably the most abundant protein on Earth.

::: example How much Rubisco does a leaf need? {#ex-rubisco}
A leaf fixes CO₂ at 20 µmol m⁻² s⁻¹. If each Rubisco active site operates, under the conditions in the leaf, at 1 reaction per second (below its maximum because CO₂ is not saturating), how many grams of Rubisco does a square metre of leaf need?
::: solution
The number of active sites needed is $20$ µmol m⁻² $= 2.0\times10^{-5}$ mol m⁻². Each holoenzyme of 550 kDa has 8 sites, so each site accounts for $550{,}000/8 = 68{,}750$ g mol⁻¹. Mass $= 2.0\times10^{-5}\times68{,}750 = 1.4$ g m⁻². Measured Rubisco contents of C3 crop leaves are typically 1–3 g m⁻², representing a substantial fraction of all leaf nitrogen. This is why nitrogen fertiliser raises photosynthetic capacity, and why plants with a CO₂-concentrating mechanism ([[plant-biology/c4-and-cam]]) need less Rubisco and less nitrogen.
:::
:::

### Turning the cycle on and off

The Calvin–Benson cycle must run only in the light: at night it would consume ATP and NADPH made from stored sugar while oxidative pathways run in the opposite direction. Light switches it on in several ways.

- **Stromal pH and Mg²⁺.** Proton pumping into the lumen raises the stroma from about pH 7 to 8, and Mg²⁺ moves out of the lumen into the stroma. Rubisco, fructose-1,6-bisphosphatase and sedoheptulose-1,7-bisphosphatase are more active at higher pH and Mg²⁺.
- **Thioredoxin.** Reduced ferredoxin from PSI reduces thioredoxin, which reduces disulfide bonds in fructose-1,6-bisphosphatase, sedoheptulose-1,7-bisphosphatase, phosphoribulokinase and other enzymes, activating them (the ferredoxin–thioredoxin system, worked out by Bob Buchanan and colleagues from the 1960s onwards). In the dark, the disulfides re-form.
- **Rubisco activation.** Rubisco must be **carbamylated** — a CO₂ molecule (separate from the substrate) bound to a lysine, stabilised by Mg²⁺ — to be active, and sugar phosphates bound to the uncarbamylated or carbamylated site inhibit it. **Rubisco activase**, an ATP-dependent chaperone, removes these inhibitors; its activity depends on the ATP/ADP ratio and is regulated by thioredoxin, linking Rubisco activity to light. Activase is heat-sensitive, which contributes to the decline of photosynthesis at high temperatures.

::: warning "Light reactions" and "dark reactions"
Older books call the Calvin–Benson cycle the "dark reactions", and many students conclude that it runs at night. It does not: it depends on ATP and NADPH from the light reactions and is switched on by light through stromal pH, Mg²⁺ and thioredoxin. Within seconds of darkness its key enzymes begin to be inactivated. "Light-independent" means only that the cycle's reactions do not themselves absorb light. The terms "light reactions" (or thylakoid reactions) and "carbon reactions" (or stromal reactions) are less misleading.
:::

## Photosynthesis of a leaf

A leaf's net rate of CO₂ uptake, $A$, depends on light, CO₂, temperature and water. Measured with a gas-exchange system, its response to photon flux $I$ has a characteristic form: in darkness $A$ is negative (respiration releases CO₂); it rises linearly at low light, with a slope set by the **quantum yield** $\phi$ (CO₂ fixed per photon absorbed); and it saturates at high light, where the capacity of the Calvin–Benson cycle and electron transport limit it. The light level at which $A = 0$ is the **light compensation point**.

::: proposition A model of the light-response curve (empirical) {#prop-light}
The net CO₂ assimilation rate of a leaf at absorbed photon flux $I$ is well described by the **non-rectangular hyperbola**

$$
A = \frac{\phi I + A_\text{max} - \sqrt{(\phi I + A_\text{max})^2 - 4\theta\,\phi I A_\text{max}}}{2\theta} - R_d,
$$ {#eq-light}

where $\phi$ is the maximum quantum yield, $A_\text{max}$ the light-saturated gross rate, $\theta$ (between 0 and 1) a curvature parameter, and $R_d$ the rate of respiration. This is a fitted model, not a mechanistic law; it is the smaller root of $\theta P^2 - (\phi I + A_\text{max})P + \phi I A_\text{max} = 0$ for the gross rate $P$, a smooth transition between the two limits $P = \phi I$ (light-limited) and $P = A_\text{max}$ (capacity-limited). With $\theta = 1$ it becomes the "Blackman" response, $P = \min(\phi I, A_\text{max})$.
:::

::: example Reading a light-response curve {#ex-light}
A sun leaf has $\phi = 0.05$, $A_\text{max} = 25$ µmol m⁻² s⁻¹, $\theta = 0.7$ and $R_d = 1.0$ µmol m⁻² s⁻¹. (a) Estimate its light compensation point. (b) Calculate $A$ at 200, 500 and 1000 µmol m⁻² s⁻¹. (c) A shade leaf of the same species has $A_\text{max} = 8$ and $R_d = 0.3$ but the same $\phi$. Compare their compensation points.
::: solution
(a) At low light $P \approx \phi I$, so the compensation point is approximately $R_d/\phi = 1.0/0.05 = 20$ µmol m⁻² s⁻¹. (Solving [[#eq-light]] exactly gives 20.3.)

(b) Substituting into [[#eq-light]]: at 200, $A = 7.6$; at 500, $A = 15.2$; at 1000, $A = 19.6$ µmol m⁻² s⁻¹. The curve is already bending well below full sunlight; doubling light from 500 to 1000 adds less than a third.

(c) Shade leaf: $0.3/0.05 = 6$ µmol m⁻² s⁻¹. Shade leaves, with less Rubisco and lower respiration, reach a positive carbon balance in dimmer light but saturate at a much lower rate. The quantum yield, a property of the photochemistry, is almost the same in all C3 leaves under the same CO₂ and temperature.
:::
:::

::: widget plot
f: ((p*x + a) - sqrt((p*x + a)^2 - 4*t*p*x*a))/(2*t) - r; p*x - r
x: 0, 2000
y: -3, 35
sliders: p=0.05:0.02:0.08:0.001; a=25:5:45:0.5; t=0.7:0.05:0.99:0.01; r=1:0:3:0.1
labels: A(I); \phi I - R_d
hlines: 0
caption: The light-response curve of leaf photosynthesis, [[#eq-light]]: net CO₂ uptake (µmol m⁻² s⁻¹, vertical) against photon flux (µmol m⁻² s⁻¹, horizontal). Sliders set the quantum yield $\phi$ ($p$), the light-saturated rate $A_\text{max}$ ($a$), the curvature $\theta$ ($t$) and respiration $R_d$ ($r$). The straight line is the light-limited asymptote $\phi I - R_d$. The curve crosses zero at the compensation point; push $\theta$ towards 1 and the bend sharpens into two straight lines. Lower $a$ and $r$ to turn a sun leaf into a shade leaf (as in [[#ex-light]]): the compensation point moves left, the plateau falls.
:::

### Too much light

In full sunlight a leaf absorbs more photons than it can use. Excess excitation is dangerous: chlorophyll left in its excited state can pass energy to oxygen, making highly reactive singlet oxygen, and over-reduced electron carriers make superoxide. Plants defend themselves on several timescales. Within seconds, the acidification of the lumen activates **non-photochemical quenching** (NPQ): the protein PsbS senses low lumen pH and switches antenna complexes into a state that dissipates excitation as heat, and the enzyme violaxanthin de-epoxidase converts violaxanthin to **zeaxanthin**, which enhances quenching (the **xanthophyll cycle**). Over minutes, antenna complexes are redistributed between the photosystems (state transitions). And continuously, PSII is damaged — its D1 protein is destroyed by light at a rate proportional to light intensity — and repaired by synthesis of new D1 in the chloroplast, a repair cycle that runs throughout the day and fails when stress is severe (**photoinhibition**). Because NPQ relaxes slowly when a leaf moves from sun into shade, Johannes Kromdijk, Stephen Long and colleagues (2016) engineered tobacco to relax it faster, by overexpressing the genes for PsbS and the two xanthophyll-cycle enzymes, and found about 15 % more growth in field trials.

::: application How efficient is photosynthesis?
From the quantum requirement we can compute the ceiling. Fixing one CO₂ stores about $2870/6 = 478$ kJ in carbohydrate; nine photons of 680 nm supply $9\times176 = 1584$ kJ, an efficiency of 30 % for absorbed red light. But only about 49 % of solar energy lies in the PAR band, not all of it is absorbed, energy above 680 nm-equivalent is lost as heat, and respiration and photorespiration consume part of the product. Xin-Guang Zhu, Stephen Long and Donald Ort (2008) estimated the theoretical maximum efficiency of conversion of total solar energy into biomass at about 4.6 % for C3 and 6 % for C4 plants, against best observed seasonal efficiencies of about 2.4 % and 3.7 %. Typical crops achieve less than 1 % over a year. Improving photosynthesis — by faster photoprotection, better Rubisco, bypasses of photorespiration and better canopy architecture — is now a major goal of crop research.
:::

::: history
Joseph Priestley (1771) found that a sprig of mint "restored" air in which a candle had burnt out; Jan Ingenhousz (1779) showed that this needs light and green tissue; Jean Senebier (1782) that it needs "fixed air" (CO₂); and Nicolas-Théodore de Saussure (1804) that water is also consumed. Julius Sachs showed in the 1860s that starch forms in chloroplasts in the light. Cornelis van Niel, comparing green plants with purple sulfur bacteria that use H₂S instead of water, proposed in 1931 that the oxygen of photosynthesis comes from water; Samuel Ruben, Merle Randall, Martin Kamen and James Hyde confirmed it in 1941 with the heavy isotope ¹⁸O. Robin Hill (1937) showed that isolated chloroplasts evolve oxygen in light with an artificial electron acceptor (the Hill reaction). Daniel Arnon and colleagues discovered photophosphorylation in 1954; Calvin received the Nobel Prize in Chemistry in 1961, Peter Mitchell (chemiosmosis) in 1978, and Johann Deisenhofer, Robert Huber and Hartmut Michel in 1988 for the first structure of a photosynthetic reaction centre, from the purple bacterium *Blastochloris viridis* (then *Rhodopseudomonas viridis*).
:::

## Summary

::: summary
- Photons carry $E = hcN_\mathrm{A}/\lambda$ per mole: 176 kJ mol⁻¹ at 680 nm. Chlorophylls a and b absorb blue and red light; carotenoids harvest light and protect. Light is counted as photon flux in the 400–700 nm PAR band.
- Antennae of a few hundred pigments funnel excitation to reaction centres (Emerson and Arnold's photosynthetic unit).
- The **Z-scheme**: PSII (P680) oxidises water at the Mn₄CaO₅ cluster (S-state clock, O₂ every fourth photon), reduces plastoquinone; cytochrome b₆f passes electrons to plastocyanin with a Q cycle; PSI (P700) reduces ferredoxin, and FNR makes NADPH. Moving 2 e⁻ from water to NADP⁺ stores 220 kJ mol⁻¹ ($\Delta G = -nF\Delta E$).
- The proton gradient (mostly ΔpH) drives CF₀CF₁ ATP synthase; with 14 c subunits, 4.67 H⁺ per ATP. Linear flow gives 12 H⁺ and 2.57 ATP per 2 NADPH; the Calvin cycle needs 3 ATP per 2 NADPH, so cyclic flow adds the rest — about 9 photons per CO₂ in total.
- The **Calvin–Benson cycle**: Rubisco carboxylates RuBP to two 3-PGA; reduction gives triose phosphate; regeneration restores RuBP. Cost: 3 ATP and 2 NADPH per CO₂. Triose phosphate makes sucrose (exported) and starch (used at night).
- Rubisco is slow (2–5 s⁻¹) and abundant; light activates the cycle via stromal pH, Mg²⁺, thioredoxin and Rubisco activase.
- Leaf light-response curves rise with the quantum yield, saturate at $A_\text{max}$, and cross zero at the compensation point $\approx R_d/\phi$. Excess light is dissipated by NPQ and the xanthophyll cycle; PSII is continuously repaired.
:::

The weak point in this account is Rubisco, which also reacts with oxygen. What that costs, and how C4 and CAM plants avoid it, is the subject of [[plant-biology/c4-and-cam]].

## Exercises

::: exercise Blue photons {level=1 check="266"}
What is the energy, in kJ per mole of photons to the nearest whole number, of light at 450 nm?
::: solution
$119{,}600/450 = 266$ kJ mol⁻¹.
:::
:::

::: exercise The cost of a hexose {level=1 check="18"}
How many ATP does the Calvin–Benson cycle consume to make one molecule of glucose (two triose phosphates) from CO₂?
::: solution
6 CO₂ × 3 ATP = 18 ATP (and 12 NADPH).
:::
:::

::: exercise Ferredoxin to NADP⁺ {level=1 check="-19.3"}
Reduced ferredoxin has $E^{\circ\prime} = -0.42$ V. What is $\Delta G^{\circ\prime}$, in kJ per mole of NADPH to one decimal place, for the reduction of NADP⁺ ($-0.32$ V) by two ferredoxins?
::: solution
$\Delta E = -0.32 - (-0.42) = +0.10$ V; $\Delta G = -2\times96.485\times0.10 = -19.3$ kJ mol⁻¹. The step is downhill, as it must be for FNR to work.
:::
:::

::: exercise A different rotor {level=2 check="1.5"}
Suppose a chloroplast's ATP synthase had a ring of 12 c subunits. With 12 H⁺ per O₂ from linear flow, what ATP:NADPH ratio would linear flow give?
::: solution
$12/3 = 4$ H⁺ per ATP, so 12 H⁺ make 3 ATP per 2 NADPH: a ratio of 1.5, exactly what the Calvin–Benson cycle needs. With the real c₁₄ ring the ratio is 1.29, and cyclic flow is needed.
:::
:::

::: exercise Quantum requirement {level=2 check="10"}
At low light, a leaf absorbs 200 µmol photons m⁻² s⁻¹ and its gross O₂ evolution (net O₂ evolution plus dark respiration) is 20 µmol m⁻² s⁻¹. How many photons does it use per O₂ evolved?
::: solution
$200/20 = 10$ photons per O₂ (a quantum yield of 0.10 O₂ per photon), close to the theoretical 8–9 of [[#ex-budget]], the difference reflecting absorption by non-photosynthetic pigments and other losses.
:::
:::

::: exercise Dissecting the chain {level=2}
Isolated thylakoids are illuminated in four conditions, and the rate of the measured process is recorded. Explain each result. (a) With ferricyanide as electron acceptor, O₂ is evolved. (b) With ferricyanide and DCMU, no O₂ is evolved. (c) With DCMU, ascorbate plus DCPIP as electron donor, and methyl viologen as acceptor (which passes electrons to O₂), oxygen is *consumed* in the light. (d) With water as donor, NADP⁺ as acceptor, ADP and phosphate, adding an uncoupler (which makes the membrane permeable to protons) stops ATP synthesis but *increases* the rate of NADP⁺ reduction.
::: solution
(a) Ferricyanide accepts electrons from the chain (around plastoquinone/PSI), so PSII can oxidise water: the Hill reaction.
(b) DCMU blocks the Q_B site, so electrons cannot leave PSII and water oxidation stops.
(c) Electrons from ascorbate enter via DCPIP at the level of plastocyanin/cytochrome b₆f, downstream of the DCMU block; PSI drives them to methyl viologen, which reduces O₂ (to superoxide and then H₂O₂). Consumption of O₂ shows that PSI works independently of PSII.
(d) The uncoupler dissipates the proton gradient. Without it ATP synthase cannot make ATP; but the gradient normally slows electron transport (a high ΔpH restricts plastoquinol oxidation at cytochrome b₆f — "photosynthetic control"), so removing it lets electrons flow faster.
:::
:::

::: exercise The flash pattern {level=2}
Dark-adapted thylakoids are given a series of short, saturating flashes. (a) Explain why O₂ is released mainly on flashes 3, 7, 11, …. (b) After prolonged darkness, about 25 % of complexes are in S₀ and 75 % in S₁. On which flashes would you expect O₂ from each population, and how does this mixture contribute to the damping of the oscillation? (c) What would you expect if each flash had a 10 % chance of failing to advance the S-state?
::: solution
(a) The oxygen-evolving complex must accumulate four oxidising equivalents (S₀ → S₄) before releasing O₂ and returning to S₀. Dark-adapted complexes rest in S₁, so they reach S₄ on the third flash and every fourth flash thereafter.
(b) S₁ complexes yield O₂ on flashes 3, 7, 11…; S₀ complexes on flashes 4, 8, 12…. The two populations are out of phase, so the yields on flashes 3 and 4 are mixed, reducing the contrast of the oscillation.
(c) Misses progressively desynchronise the population: after several cycles the complexes are spread over all S-states, and the oxygen yield per flash converges to a constant value (a quarter of the maximum per complex), so the oscillation damps out. Fitting the damping gives the miss probability (typically about 10 %).
:::
:::

::: exercise Sun and shade {level=2}
Leaves at the top of a beech canopy and at its base are measured. Sun leaves: compensation point 25 µmol m⁻² s⁻¹, saturation near 1200, $A_\text{max}$ 15; shade leaves: compensation 5, saturation near 300, $A_\text{max}$ 5 µmol m⁻² s⁻¹. Both have a quantum yield of 0.05. (a) Explain the differences in terms of Rubisco, electron transport capacity and respiration. (b) Which leaf would gain more carbon at 50 µmol m⁻² s⁻¹? At 1000? (c) Why does it make sense for a tree to build two kinds of leaves rather than one?
::: solution
(a) Sun leaves invest more nitrogen in Rubisco, electron carriers and ATP synthase per unit area (they are thicker, with more palisade), which raises $A_\text{max}$ and the saturation point but also respiration — hence a higher compensation point. Shade leaves are thin, with more chlorophyll per unit of Rubisco (larger antennae), little capacity and low respiration.
(b) At 50: the shade leaf, which is above its compensation point; the sun leaf is close to its own compensation point and gains little or nothing. At 1000: the sun leaf, which is near its plateau of 15, while the shade leaf is saturated at 5.
(c) Nitrogen and carbon invested in photosynthetic capacity pay off only where light is high enough to use it. Matching capacity to the local light environment maximises whole-canopy carbon gain for a given nitrogen investment — an optimisation predicted by models of canopy photosynthesis and approximately observed.
:::
:::

::: exercise The source of oxygen {level=3}
In 1941 Ruben and colleagues grew *Chlorella* in water enriched in ¹⁸O, with ordinary CO₂, and in ordinary water with ¹⁸O-enriched bicarbonate/CO₂. (a) What result would show that photosynthetic O₂ comes from water? (b) Why does the overall equation have 12 H₂O on the left and 6 on the right, rather than 6 on the left? (c) A complication was that oxygen atoms exchange between CO₂ and water in solution (catalysed by carbonic anhydrase). How would this exchange affect the experiment, and how could it be minimised?
::: solution
(a) The ¹⁸O enrichment of the evolved O₂ should match that of the water, not that of the CO₂, in both experiments.
(b) All 12 oxygen atoms of 6 O₂ must come from water, which requires 12 H₂O; the 12 oxygen atoms of 6 CO₂ end up in the sugar (6) and in 6 new water molecules. Writing $6\mathrm{CO_2} + 6\mathrm{H_2O} \to \mathrm{C_6H_{12}O_6} + 6\mathrm{O_2}$ balances the atoms but hides the origin of the oxygen.
(c) Exchange tends to equalise the label between CO₂ and water, so over long experiments the O₂ would acquire label whichever compound was labelled initially, blurring the distinction. Short experiments, measuring the label in the substrate pools at the same time as in the O₂, and working where the exchange is slow, minimise the problem; later mass-spectrometric experiments with time-resolved sampling confirmed that the O₂ derives from water.
:::
:::

::: exercise A canopy's quantum requirement {level=3}
A field of maize at midsummer has a leaf area index of 4 (4 m² of leaf per m² of ground) and its leaves fix, on average, 10 µmol CO₂ per m² of leaf per second (gross) over 12 hours of daylight. (a) Calculate the daily gross carbon gain in moles of CO₂, grams of carbon and grams of dry matter (assume 0.45 g C per g dry matter) per m² of ground. (b) Photosynthetically active radiation averages 1000 µmol m⁻² s⁻¹ over those 12 hours, and the canopy absorbs 90 % of it. What is the canopy's apparent quantum requirement — photons absorbed per CO₂ fixed? (c) A single maize leaf in low light needs about 16 photons per CO₂ (C4 photosynthesis costs extra ATP; see [[plant-biology/c4-and-cam]]). Why does the canopy need more?
::: solution
(a) $10\times4 = 40$ µmol CO₂ m⁻² of ground s⁻¹; over $12\times3600 = 43{,}200$ s, $1.73$ mol CO₂ m⁻² day⁻¹, which is $20.7$ g C, or $20.7/0.45 = 46$ g dry matter per m² per day before respiration is subtracted. (Net growth rates of good maize crops of 20–40 g m⁻² day⁻¹ are consistent with this once respiration is taken into account.)
(b) Absorbed photons: $0.9\times1000 = 900$ µmol m⁻² s⁻¹; photons per CO₂ $= 900/40 = 22.5$.
(c) The minimum requirement applies only on the linear, light-limited part of the light-response curve ([[#prop-light]]). In a canopy at midday the upper leaves are near light saturation: extra photons they absorb add little CO₂ fixation and are dissipated as heat by non-photochemical quenching. Only the shaded lower leaves work near the minimum requirement. Spreading light over several layers of leaves, as a canopy with a high leaf area index does, brings the canopy closer to the minimum — which is one reason why erect-leaved crop varieties, which let light penetrate deeper, are more productive.
:::
:::
