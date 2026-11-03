Animals have one way of making a living: they oxidise organic food with oxygen. Plants have two, photosynthesis by day and respiration by night. Bacteria and archaea, between them, have dozens. Some ferment sugars in the dark without any external oxidant; some breathe nitrate, sulfate, iron rust or carbon dioxide instead of oxygen; some live on hydrogen gas, ammonia, sulfide or ferrous iron and make all their organic matter from CO₂; some harvest light with pigments that absorb infrared; and some turn atmospheric nitrogen, the most inert molecule in the air, into ammonia. Earth's chemistry — the oxygen of its atmosphere, the nitrogen in its soils, the sulfur and iron in its sediments — has been shaped by this diversity for more than three billion years.

The diversity is less bewildering than it seems, because almost all of it rests on one principle: energy is conserved when electrons pass from a donor to an acceptor of more positive reduction potential, and the energy is captured either directly in ATP or, much more often, as an ion gradient across a membrane. This chapter develops that principle and applies it to fermentation, respiration with oxygen and with other acceptors, chemolithotrophy, phototrophy, the fixation of CO₂ and the fixation of nitrogen. It builds on [[biochemistry/glycolysis-tca]] and [[biochemistry/oxidative-phosphorylation]], and on the nutritional categories defined in [[diversity-of-life/bacteria-archaea#def-trophic]]; the role of these processes in the cycles of the elements is the subject of [[microbiology/microbial-ecology]].

## The three needs of a cell

To grow, any cell needs **energy** (ATP and ion gradients), **reducing power** (electrons, carried mainly as NAD(P)H and reduced ferredoxin, to make the reduced molecules of biomass from more oxidised precursors) and **carbon** (to build skeletons). In a heterotroph growing on glucose in air, glucose supplies all three; that is why the separation of the three is easy to overlook. In other organisms they come from different sources: a cyanobacterium gets energy from light, electrons from water and carbon from CO₂; a nitrifier gets energy and electrons from ammonia and carbon from CO₂; a purple non-sulfur bacterium growing in the light on succinate gets energy from light but carbon and electrons from succinate. The vocabulary of [[diversity-of-life/bacteria-archaea#def-trophic]] (photo-/chemo-, litho-/organo-, auto-/heterotroph) names these combinations.

Whatever the sources, the cell's biosynthetic pathways start from the same dozen **precursor metabolites** of central metabolism — glucose 6-phosphate, fructose 6-phosphate, ribose 5-phosphate, erythrose 4-phosphate, triose phosphates, 3-phosphoglycerate, phosphoenolpyruvate, pyruvate, acetyl-CoA, 2-oxoglutarate, succinyl-CoA and oxaloacetate — from which all amino acids, nucleotides, lipids and sugars are made. Microbes differ in how they reach these precursors. Besides the familiar Embden–Meyerhof pathway of glycolysis, many bacteria, including *Pseudomonas* and the ethanol-producing *Zymomonas mobilis*, degrade glucose by the **Entner–Doudoroff pathway**, which yields only one ATP per glucose but needs far less enzyme protein; many archaea use modified versions of both, with unusual enzymes and ferredoxin instead of NAD⁺ as electron acceptor.

## Redox potentials and the energy of electron transfer

The energy available from transferring electrons from a donor couple to an acceptor couple follows from their **standard reduction potentials** $E^{\circ\prime}$ (at pH 7), introduced in [[biochemistry/bioenergetics#prop-nernst]].

::: proposition Free energy from a redox reaction {#prop-redox}
For the transfer of $n$ electrons from the reduced member of a donor couple (potential $E_\mathrm{donor}$) to the oxidised member of an acceptor couple (potential $E_\mathrm{acceptor}$),

$$
\Delta G^{\circ\prime} = -nF\,\Delta E^{\circ\prime}, \qquad \Delta E^{\circ\prime} = E^{\circ\prime}_\mathrm{acceptor} - E^{\circ\prime}_\mathrm{donor},
$$ {#eq-redox}

where $F = 96.485$ kJ mol⁻¹ V⁻¹ is the Faraday constant. The reaction is exergonic under standard conditions when the acceptor has the more positive potential. Under actual conditions each potential is corrected for concentrations by the Nernst equation, and for couples that consume protons the potential changes by $-59$ mV per unit of pH at 25 °C for each proton per electron.
:::

The couples used by microbes span more than a volt and a quarter. Arranged as a "redox tower", with the strongest reductants at the top, they show at a glance which reactions can supply energy:

| couple (oxidised/reduced) | electrons | $E^{\circ\prime}$ (V) |
|---|---|---|
| CO₂/glucose | 24 | −0.43 |
| 2 H⁺/H₂ | 2 | −0.41 |
| NAD⁺/NADH | 2 | −0.32 |
| S⁰/H₂S | 2 | −0.27 |
| CO₂/CH₄ | 8 | −0.24 |
| SO₄²⁻/HS⁻ | 8 | −0.22 |
| fumarate/succinate | 2 | +0.03 |
| NO₂⁻/NH₄⁺ | 6 | +0.34 |
| NO₃⁻/NO₂⁻ | 2 | +0.42 |
| NO₃⁻/N₂ | 5 per N | +0.75 |
| Fe³⁺/Fe²⁺ (dissolved, acid) | 1 | +0.77 |
| O₂/H₂O | 4 | +0.82 |

(Values are standard potentials at pH 7 and 25 °C, rounded; the Fe³⁺/Fe²⁺ value applies to dissolved ions, which exist only in acid solutions — at neutral pH, ferric iron precipitates as oxides and hydroxides with potentials near 0 to +0.2 V.)

Any donor can in principle be oxidised by any acceptor below it in the table. Organic matter and H₂ at the top are the best donors; O₂ at the bottom is the best acceptor; and many inorganic couples in between can serve as either, depending on the partner. The "electron tower" thus maps out the space of possible metabolisms. The energy needed to make one ATP inside a growing cell is about 50–70 kJ mol⁻¹, but energy is usually conserved in smaller packets, by moving ions across a membrane.

::: proposition The quantum of energy conservation {#prop-quantum}
Moving one mole of protons inward across a membrane with proton-motive force $\Delta p$ (in volts, a negative number for an energised membrane) releases $F\lvert\Delta p\rvert$; for $\Delta p = -0.15$ V this is about 14.5 kJ mol⁻¹. ATP synthase couples the inward movement of roughly 3 to 4 protons to the synthesis of one ATP (the exact number depends on the number of $c$ subunits in its rotor; [[biochemistry/oxidative-phosphorylation#prop-stoich]]). A reaction can therefore support growth if it releases enough energy to pump at least one ion, so organisms can live on reactions yielding much less than one ATP's worth of energy per turnover, down to perhaps −10 to −20 kJ mol⁻¹ (an empirical estimate; [[diversity-of-life/bacteria-archaea#prop-gibbs]]).
:::

## Fermentation

::: definition Fermentation {#def-fermentation-micro}
**Fermentation** is energy metabolism in which an organic substrate is both the electron donor and, after partial oxidation, the source of the electron acceptor: the products as a whole are at the same average oxidation state as the substrate, no external acceptor is used, and ATP is made mainly by **substrate-level phosphorylation** — the transfer of a phosphate group from a high-energy intermediate (1,3-bisphosphoglycerate, phosphoenolpyruvate, acetyl phosphate, butyryl phosphate) to ADP.
:::

The general principle and the main fermentations of glucose (lactic, alcoholic) are set out in [[biochemistry/glycolysis-tca#def-fermentation]]. Microbes extend the repertoire in two ways. They ferment many substrates besides sugars — amino acids (the **Stickland reaction** of clostridia, in which one amino acid is oxidised and another reduced), purines, organic acids, even acetylene — and they make a wide range of products from the same substrate, depending on how they dispose of the electrons released in glycolysis.

| fermentation | main products from glucose | organisms |
|---|---|---|
| homolactic | 2 lactate | *Lactococcus*, *Streptococcus*, many lactobacilli |
| heterolactic | lactate, ethanol, CO₂ | *Leuconostoc*, some lactobacilli |
| alcoholic | 2 ethanol, 2 CO₂ | yeasts, *Zymomonas* |
| mixed acid | acetate, ethanol, lactate, succinate, formate (or H₂ + CO₂) | *Escherichia*, *Salmonella* |
| butanediol | 2,3-butanediol, ethanol, CO₂, H₂ | *Enterobacter*, *Serratia* |
| butyric and acetone–butanol | butyrate, acetate, butanol, acetone, CO₂, H₂ | *Clostridium* |
| propionic | propionate, acetate, CO₂ | *Propionibacterium freudenreichii* (the holes in Swiss cheese) |

Two microbial tricks increase the ATP yield beyond the two per glucose of glycolysis. First, pyruvate can be split by **pyruvate formate-lyase** or by pyruvate:ferredoxin oxidoreductase into acetyl-CoA, which is converted via acetyl phosphate to acetate with the formation of one more ATP. But acetyl-CoA is more oxidised than ethanol or lactate, so making acetate leaves electrons that must go somewhere — into ethanol, lactate or succinate, or, best of all, into **H₂**. Second, electrons can be released as H₂ by hydrogenases, which frees the cell from having to dump them onto its own carbon. But H₂ production from NADH is thermodynamically possible only if H₂ is kept at a very low partial pressure ($E^{\circ\prime}$ of H⁺/H₂ is below that of NAD⁺/NADH), which happens when hydrogen-consuming organisms such as methanogens remove it — **interspecies hydrogen transfer**, the basis of syntrophy ([[diversity-of-life/bacteria-archaea]]).

::: example Balancing a mixed-acid fermentation {#ex-mixed-acid}
*E. coli* growing anaerobically on glucose can convert one glucose to one acetate, one ethanol and two formate. (a) Show that this is redox-balanced by counting NADH. (b) How many ATP are made per glucose? (c) Why can it not simply convert glucose to two acetate and two formate, gaining another ATP?
::: solution
(a) Glycolysis converts glucose to 2 pyruvate, producing 2 NADH. Pyruvate formate-lyase splits each pyruvate into acetyl-CoA and formate without any redox change. One acetyl-CoA becomes acetate (no NADH used). The other is reduced to acetaldehyde and then ethanol, consuming 2 NADH. Net NADH: $2 - 2 = 0$: balanced.

(b) Glycolysis: 2 ATP (net). Acetyl-CoA → acetyl phosphate → acetate: 1 ATP. Total: 3 ATP per glucose, 50 % more than homolactic fermentation.

(c) Making two acetates would leave 2 NADH unoxidised, with no acceptor to regenerate NAD⁺; glycolysis would stop. The 1 : 1 ratio of acetate to ethanol is forced by the redox balance. Formate can be split to H₂ and CO₂ by the formate hydrogenlyase complex, but this does not change the balance of NADH, because formate carries no electrons from NADH.
:::
:::

Fermentation is also industrially important: lactic acid bacteria in dairy and vegetable fermentations, yeasts in brewing and baking, and *Clostridium acetobutylicum*, whose acetone–butanol fermentation was developed by Chaim Weizmann during the First World War to supply acetone for explosives and is being revived for biofuels ([[biotechnology]]).

## Respiration with many acceptors

In respiration, electrons from a donor pass through a membrane-bound **electron transport chain** to an external terminal acceptor, and the chain pumps protons (or Na⁺) to create the proton-motive force that drives ATP synthase ([[biochemistry/oxidative-phosphorylation#def-chain]]). Bacterial chains differ from the mitochondrial chain in being **branched and modular**. *E. coli*, for example, has several dehydrogenases that feed electrons from NADH, succinate, formate, lactate, glycerol 3-phosphate or H₂ into a pool of quinones, and several terminal enzymes that take electrons from the quinones: a cytochrome *bo*₃ oxidase that pumps protons but has a low affinity for O₂, used in well-aerated conditions; a cytochrome *bd* oxidase with a very high affinity for O₂ that does not pump protons, used at low O₂; and reductases for nitrate, nitrite, fumarate, dimethyl sulfoxide and trimethylamine *N*-oxide, used in the absence of O₂. Regulators (FNR senses O₂ directly; ArcB–ArcA senses the redox state of the quinone pool; NarX/NarL senses nitrate) switch the chain to the best acceptor available. The energy yields of the main acceptors are worked out in [[biochemistry/oxidative-phosphorylation#ex-acceptors]].

::: warning Fermentation is not anaerobic respiration
"Anaerobic" describes the absence of O₂, not the mechanism of energy conservation. Anaerobic respiration uses an electron transport chain and an external acceptor other than O₂ (nitrate, sulfate, Fe³⁺, CO₂, fumarate); fermentation uses no external acceptor and no chain is needed for redox balance. Both occur without oxygen, and some organisms switch between them. Conversely, fermentation can happen in air: yeasts ferment sugar to ethanol in the presence of O₂ when sugar is abundant (the Crabtree effect), and lactic acid bacteria ferment whether or not O₂ is present.
:::

Several anaerobic respirations deserve a closer look.

**Denitrification.** Nitrate is reduced stepwise, NO₃⁻ → NO₂⁻ → NO → N₂O → N₂, by four enzymes: nitrate reductase (Nar or Nap), nitrite reductase (NirK or NirS), nitric oxide reductase (Nor) and nitrous oxide reductase (Nos). Denitrifiers such as *Paracoccus denitrificans* and many *Pseudomonas* species are facultative: they use O₂ when they can, and switch on denitrification when O₂ is scarce and nitrate is available. Denitrification returns fixed nitrogen to the atmosphere as N₂, and when the last step is incomplete releases N₂O, a potent greenhouse gas and the main ozone-depleting substance now emitted. Some bacteria instead reduce nitrite to ammonium (**dissimilatory nitrate reduction to ammonium**, DNRA), which keeps the nitrogen in the ecosystem.

**Sulfate reduction.** Sulfate is a poor acceptor ($E^{\circ\prime}$ of SO₄²⁻/HS⁻ is −0.22 V) and must first be activated with ATP to adenosine 5′-phosphosulfate (APS) before it can be reduced, an investment the cell recovers only through the subsequent chain. Sulfate reducers such as *Desulfovibrio* oxidise H₂, lactate or acetate and produce H₂S, which gives anoxic muds their smell and black colour (iron sulfides). In marine sediments, where sulfate is abundant in sea water, sulfate reduction oxidises a large fraction of the organic matter that reaches the sea floor.

**Iron and manganese reduction and extracellular electron transfer.** Fe³⁺ and Mn⁴⁺ occur mostly as insoluble oxide minerals, so the bacteria that respire them must pass electrons out of the cell. *Shewanella oneidensis* uses chains of multihaem cytochromes that span the envelope and reach the outer surface, and secretes flavins that shuttle electrons to minerals; *Geobacter sulfurreducens* produces conductive extracellular filaments — originally interpreted as pili ("nanowires"), and shown by cryo-electron microscopy in 2019 to include polymerised cytochromes (Fengbin Wang and colleagues; the relative roles of pili and cytochrome filaments are still debated). These organisms can also pass electrons to an electrode, which makes microbial fuel cells possible.

**Methanogenesis** by archaea can be seen as a respiration with CO₂ as the terminal acceptor (CO₂ + 4 H₂ → CH₄ + 2 H₂O), or with the methyl group of acetate, methanol or methylamines. It uses unique coenzymes (methanofuran, tetrahydromethanopterin, coenzyme F₄₂₀, coenzyme M and coenzyme B), and its last step, catalysed by methyl-coenzyme M reductase with its nickel cofactor F₄₃₀, is found only in methanogens and in the related anaerobic methane-oxidising archaea, which run the pathway in reverse. **Acetogens** such as *Acetobacterium woodii* reduce CO₂ with H₂ to acetate by the Wood–Ljungdahl pathway. Both live on the edge of thermodynamic feasibility ([[diversity-of-life/bacteria-archaea#ex-methanogen]]).

::: quiz
A bacterium grows anaerobically on lactate only when sulfate is supplied, and its growth produces H₂S and acetate. What kind of metabolism is this?
- [ ] Fermentation of lactate
- [x] Anaerobic respiration with sulfate as the terminal electron acceptor
- [ ] Chemolithotrophy using H₂S as electron donor
- [ ] Anoxygenic photosynthesis
::: solution
Growth requires an external acceptor (sulfate), which is reduced (to H₂S) while the organic donor (lactate) is oxidised (to acetate and CO₂): that is respiration, here sulfate respiration by a sulfate reducer such as *Desulfovibrio*. In a fermentation no external acceptor is needed. H₂S is a product, not the electron donor.
:::
:::

## Chemolithotrophy

Chemolithotrophs gain energy by oxidising inorganic compounds. Sergei Winogradsky discovered them in 1887 ([[microbiology/microbial-world]]), and they are now known to oxidise H₂, CO, reduced sulfur compounds (H₂S, S⁰, thiosulfate), Fe²⁺, Mn²⁺, NH₃, nitrite, phosphite and even arsenite. Most are autotrophs, fixing CO₂; some are **mixotrophs**, using an inorganic energy source and organic carbon.

| process | reaction | $\Delta G^{\circ\prime}$ (kJ per mol donor) | organisms |
|---|---|---|---|
| hydrogen oxidation | H₂ + ½ O₂ → H₂O | −237 | *Cupriavidus necator* ("Knallgas" bacteria), *Aquifex* |
| sulfide oxidation | H₂S + 2 O₂ → SO₄²⁻ + 2 H⁺ | −798 | *Beggiatoa*, *Thiobacillus*, vent symbionts |
| ammonia oxidation | NH₄⁺ + 1½ O₂ → NO₂⁻ + 2 H⁺ + H₂O | −275 | *Nitrosomonas*, *Nitrosopumilus* |
| nitrite oxidation | NO₂⁻ + ½ O₂ → NO₃⁻ | −76 | *Nitrobacter*, *Nitrospira* |
| ferrous iron oxidation (pH 2) | Fe²⁺ + ¼ O₂ + H⁺ → Fe³⁺ + ½ H₂O | about −33 | *Acidithiobacillus ferrooxidans*, *Leptospirillum* |
| anammox | NH₄⁺ + NO₂⁻ → N₂ + 2 H₂O | −357 | '*Candidatus* Brocadia', '*Ca.* Kuenenia' |

(The anammox value is per mole of ammonium, from standard free energies of formation.)

Nitrification is split between organisms: ammonia oxidisers (bacteria such as *Nitrosomonas* and the abundant ammonia-oxidising archaea) make nitrite, and nitrite oxidisers make nitrate, except for the "comammox" *Nitrospira*, which do both (2015; [[diversity-of-life/bacteria-archaea]]). Ammonia is first oxidised to hydroxylamine by ammonia monooxygenase, which uses O₂ as a substrate, and hydroxylamine to nitrite by hydroxylamine oxidoreductase, which releases the electrons that feed the chain.

Chemolithotrophs face a special problem: many of their donors have potentials well above that of NAD⁺/NADH (−0.32 V), so they cannot reduce NAD⁺ directly to make the NADH they need for CO₂ fixation. They solve it by **reverse electron transport**: using the proton-motive force to drive electrons "uphill" through parts of the chain, from the donor to NAD⁺. This consumes much of the energy they conserve, which is one reason why nitrite and iron oxidisers grow slowly and have low yields.

::: example Living on ferrous iron {#ex-iron}
*Acidithiobacillus ferrooxidans* grows at pH 2 by oxidising dissolved Fe²⁺ with O₂. (a) The O₂/H₂O couple has $E^{\circ\prime} = +0.816$ V at pH 7. What is its potential at pH 2 (all else standard), given that it shifts by +59 mV per unit decrease of pH? (b) With $E^\circ = +0.77$ V for Fe³⁺/Fe²⁺ (independent of pH), calculate $\Delta G$ per mole of Fe²⁺ oxidised at pH 2. (c) If the cell needs about 60 kJ to make one ATP and conserves energy with 40 % efficiency, how many moles of Fe²⁺ must it oxidise per mole of ATP? (d) Why do neutrophilic iron oxidisers live at the boundary between oxic and anoxic water?
::: solution
(a) $E = 0.816 + 0.059\times(7 - 2) = 0.816 + 0.295 = 1.11$ V.

(b) $\Delta E = 1.11 - 0.77 = 0.34$ V, $n = 1$, so $\Delta G = -96.485\times0.34 = -33$ kJ per mol Fe²⁺. For dissolved ions at pH 7 the yield would shrink to $-96.485\times(0.816 - 0.77) = -4.4$ kJ mol⁻¹; acidity raises the potential of the O₂/H₂O couple and so makes the iron reaction worth more. (At pH 7 ferric iron precipitates, and the relevant couple is then the mineral one, near 0 to +0.2 V.)

(c) Energy captured per Fe²⁺: $0.4\times33 = 13$ kJ; ATP needs 60 kJ, so about $60/13 \approx 4.5$ mol Fe²⁺ per mol ATP. Making a gram of cells needs on the order of tens of millimoles of ATP, plus reverse electron transport for NAD(P)H, so the bacterium must oxidise enormous amounts of iron — which is why it is visible as the orange ferric precipitate of acid mine drainage, and why it is used to leach copper and other metals from low-grade ores.

(d) At neutral pH, Fe²⁺ is oxidised abiotically by O₂ within minutes, so bacteria cannot compete in fully oxic water; they live where Fe²⁺ diffusing up from anoxic zones meets low concentrations of O₂ diffusing down, where the chemical reaction is slow (for example *Gallionella* and *Mariprofundus*, which are microaerophiles).
:::
:::

::: widget plot
f: -96.485*(0.816 + 0.059*(7 - x) - 0.77 - 0.059*log10(r))
x: 0, 7
y: -60, 10
sliders: r=1:0.01:100:0.01
hlines: 0
labels: \Delta G\ \text{per Fe}^{2+}\ \text{(kJ mol}^{-1}\text{)}
caption: Free energy of oxidising dissolved Fe²⁺ with O₂, against pH, at standard concentrations of everything except H⁺. The slider sets the ratio $r = [\mathrm{Fe^{3+}}]/[\mathrm{Fe^{2+}}]$, which raises the iron couple's potential by 59 mV per tenfold increase. At pH 2 and $r = 1$ the reaction yields about −33 kJ mol⁻¹; as Fe³⁺ accumulates ($r = 100$) the yield falls to about −22 kJ mol⁻¹. Towards neutral pH the yield computed for dissolved ions shrinks to about −4 kJ mol⁻¹ — but dissolved Fe³⁺ does not exist there, so the curve is meaningful only in acid.
:::

## Phototrophy

Phototrophs convert light into chemical energy. Two quite different systems do this.

**Chlorophyll-based phototrophy** uses reaction centres in which a special pair of chlorophyll or bacteriochlorophyll molecules, excited by light, gives up an electron to a chain of acceptors. There are two types of reaction centre: **type II** (quinone-reducing), found in purple bacteria, Chloroflexota and photosystem II, and **type I** (iron–sulfur, ferredoxin-reducing), found in green sulfur bacteria, heliobacteria and photosystem I.

::: definition Oxygenic and anoxygenic photosynthesis {#def-photosynthesis}
In **oxygenic photosynthesis** (Cyanobacteriota, and the plastids of algae and plants descended from them), two photosystems in series — PSII and PSI — drive electrons from water to NADP⁺, and the oxidation of water releases O₂. In **anoxygenic photosynthesis** (purple sulfur and non-sulfur bacteria, green sulfur bacteria, Chloroflexota, heliobacteria, and some members of other phyla), a single type of reaction centre drives **cyclic electron flow** that pumps protons for ATP synthesis; electrons for reducing NAD(P)⁺ come from donors such as H₂S, S⁰, H₂, Fe²⁺ or organic acids, often by reverse electron transport, and no O₂ is made.
:::

Cornelis van Niel, studying purple and green sulfur bacteria in the 1930s, wrote photosynthesis in the general form CO₂ + 2 H₂A → (CH₂O) + H₂O + 2 A, where H₂A is H₂S in the sulfur bacteria and H₂O in plants, and concluded that the O₂ of plant photosynthesis comes from water — later confirmed with ¹⁸O-labelled water (Samuel Ruben, Martin Kamen and colleagues, 1941). Anoxygenic photosynthesis is older; oxygenic photosynthesis, which uses the most abundant electron donor on Earth, evolved in the ancestors of cyanobacteria and transformed the planet in the Great Oxidation Event about 2.4 billion years ago ([[diversity-of-life/origin-of-life]]).

Anoxygenic phototrophs absorb light that plants cannot use. Bacteriochlorophyll *a* in purple bacteria absorbs in living cells at about 800–890 nm, in the near infrared; bacteriochlorophyll *b* absorbs beyond 1,000 nm; green sulfur bacteria pack bacteriochlorophylls *c*, *d* and *e* into giant antennae called **chlorosomes**, so efficient that some live at depths in the Black Sea where very little light arrives, and one strain was isolated from a deep-sea hydrothermal vent where the only light is the faint glow of hot rock (J. Thomas Beatty and colleagues, 2005). In a stratified pond or a Winogradsky column, cyanobacteria and algae at the top absorb the red and blue, and purple and green bacteria below use the far-red and infrared that passes through.

::: example How much energy is in a photon? {#ex-photon}
The energy of one mole of photons of wavelength $\lambda$ is $E = N_Ahc/\lambda$, which works out to $119{,}600/\lambda$ kJ mol⁻¹ with $\lambda$ in nm. (a) Calculate it for 680 nm (absorbed by PSII), 870 nm (purple bacterial reaction centre) and 1,020 nm (bacteriochlorophyll *b*). (b) The purple bacterial reaction centre moves one electron across the membrane per photon, creating a potential difference of about 0.5 V between the excited special pair and the quinone it reduces. What fraction of the photon's energy at 870 nm is stored in this charge separation?
::: solution
(a) 680 nm: $119{,}600/680 = 176$ kJ mol⁻¹. 870 nm: $137$ kJ mol⁻¹. 1,020 nm: $117$ kJ mol⁻¹.

(b) Energy stored per mole of electrons: $F\times0.5 = 96.5\times0.5 = 48$ kJ mol⁻¹; $48/137 = 35\,\%$. The rest is lost as heat in making the charge separation fast and irreversible. Infrared photons carry less energy, which limits the potential span a single reaction centre can generate — one reason why splitting water, which needs a very strong oxidant, required a second photosystem in series.
:::
:::

::: widget plot
f: 119600/x
x: 350, 1100
y: 100, 350
vlines: 680; 700; 870; 1020
labels: E\ \text{(kJ per mol photons)}
caption: Energy per mole of photons, $E = 119{,}600/\lambda$ kJ mol⁻¹, against wavelength $\lambda$ (nm). The vertical lines mark the main absorption of photosystem II (680 nm), photosystem I (700 nm), the reaction centre of purple bacteria (870 nm) and bacteriochlorophyll *b* (1,020 nm). Hover to compare: a blue photon at 400 nm carries about 300 kJ mol⁻¹, an infrared photon at 1,020 nm only 117 — still enough for a single reaction centre, but not for splitting water.
:::

**Rhodopsin-based phototrophy** uses retinal-containing proteins that pump ions when they absorb light: bacteriorhodopsin of haloarchaea (Dieter Oesterhelt and Walther Stoeckenius, 1971) and the proteorhodopsins, found in a large fraction of bacteria in the sunlit ocean (Oded Béjà and colleagues, 2000), pump protons outwards; others pump Na⁺ or Cl⁻. A rhodopsin is a single small protein, with no electron transport and no reducing power — it supplies energy only, supplementing a heterotrophic life.

## Fixing carbon

Autotrophs build all their organic matter from CO₂. Plants and cyanobacteria use only the **Calvin–Benson cycle**, but microbes use at least seven pathways:

| pathway | key features | where found |
|---|---|---|
| Calvin–Benson cycle | RuBisCO; 9 ATP and 6 NAD(P)H per triose phosphate | cyanobacteria, many proteobacteria, plants and algae |
| reductive citric acid cycle | the TCA cycle run backwards with ferredoxin-dependent carboxylases | green sulfur bacteria, *Aquifex*, some others |
| reductive acetyl-CoA (Wood–Ljungdahl) | two CO₂ to acetyl-CoA; uses CO dehydrogenase/acetyl-CoA synthase; cheapest in ATP | acetogens, methanogens, anammox bacteria |
| 3-hydroxypropionate bi-cycle | bicarbonate carboxylations | *Chloroflexus* |
| 3-hydroxypropionate/4-hydroxybutyrate cycle | oxygen-tolerant; thermoacidophiles | *Metallosphaera*, ammonia-oxidising archaea |
| dicarboxylate/4-hydroxybutyrate cycle | oxygen-sensitive | *Ignicoccus* and other anaerobic archaea |
| reductive glycine pathway | CO₂ to formate, glycine, serine and pyruvate | *Desulfovibrio desulfuricans* (Irene Sánchez-Andrea and colleagues, 2020) |

The pathways differ in energy cost, in sensitivity to oxygen (several use enzymes destroyed by O₂) and in the forms of carbon they take up (CO₂ or bicarbonate). The Wood–Ljungdahl pathway is the least expensive and, because it runs on metals and simple cofactors, is a candidate for the most ancient. Fixed carbon flows from autotrophs into the rest of the biosphere; heterotrophs live on it.

## Nitrogen fixation

Nitrogen is the element that most often limits the growth of organisms, yet the atmosphere is 78 % N₂. The triple bond of N₂ is extraordinarily stable, and only bacteria and archaea can break it biologically.

::: definition Nitrogenase {#def-nitrogenase}
**Nitrogenase** is the enzyme complex that reduces N₂ to NH₃. It consists of two proteins: the **Fe protein** (dinitrogenase reductase, NifH), a homodimer with one [4Fe–4S] cluster that hydrolyses ATP, and the **MoFe protein** (dinitrogenase, NifDK), an α₂β₂ tetramer containing the P cluster and the **iron–molybdenum cofactor** (FeMo-co, MoFe₇S₉C·homocitrate) at which N₂ is bound and reduced. Electrons from reduced ferredoxin or flavodoxin pass to the Fe protein, which transfers them one at a time to the MoFe protein, hydrolysing two ATP per electron. The overall stoichiometry is

$$
\mathrm{N_2 + 8\,H^+ + 8\,e^- + 16\,ATP \;\longrightarrow\; 2\,NH_3 + H_2 + 16\,ADP + 16\,P_i}.
$$ {#eq-nitrogenase}

Alternative nitrogenases with vanadium (VFe) or only iron (FeFe) at the active site are used when molybdenum is scarce; they are less efficient and produce more H₂.
:::

Two features of nitrogenase shape the biology of every nitrogen fixer. The first is **cost**: sixteen ATP and eight electrons per N₂, with one of the four electron pairs obligatorily lost as H₂, which many fixers recapture with an "uptake" hydrogenase. Fixing nitrogen is so expensive that bacteria switch off the *nif* genes, and inactivate the enzyme, whenever ammonium is available. The second is **oxygen sensitivity**: both proteins are irreversibly destroyed by O₂, so fixers must protect the enzyme while, in many cases, using O₂ for respiration or making it by photosynthesis. Their solutions include:

- living anaerobically (*Clostridium pasteurianum*, the first free-living fixer isolated, by Winogradsky in 1893);
- **respiratory protection**: *Azotobacter* respires so fast that it keeps its cytoplasm nearly free of O₂;
- **heterocysts**: filamentous cyanobacteria such as *Anabaena* and *Nostoc* differentiate about one cell in ten into a heterocyst that lacks photosystem II, has a thick envelope that slows O₂ entry and fixes nitrogen for the filament, receiving sugars in return;
- **temporal separation**: unicellular cyanobacteria such as *Crocosphaera* photosynthesise by day and fix nitrogen at night;
- **symbiosis**: in legume root nodules, rhizobia (as bacteroids) are supplied with dicarboxylic acids by the plant, which makes **leghaemoglobin** to bind O₂ and deliver it at very low free concentration to the bacteroids' high-affinity oxidases ([[microbiology/microbial-ecology]]).

::: example The price of a gram of nitrogen {#ex-nitrogen-cost}
(a) How many moles of ATP and of electrons are needed, by [[#eq-nitrogenase]], to fix 1 g of nitrogen? (b) If the electrons come from glucose (24 electrons per glucose when it is completely oxidised), how much glucose supplies them? (c) Why is the real cost to a legume higher than this?
::: solution
(a) 1 g N is $1/14 = 0.0714$ mol N, or $0.0357$ mol N₂. ATP: $16\times0.0357 = 0.57$ mol. Electrons: $8\times0.0357 = 0.29$ mol.

(b) $0.29/24 = 0.0119$ mol glucose, $0.0119\times180 = 2.1$ g. The ATP must also be made by oxidising more substrate (at, say, 30 ATP per glucose, $0.57/30 = 0.019$ mol, 3.4 g), so the minimum is about 5–6 g of glucose per g of nitrogen.

(c) Bacteroids also spend energy on maintenance, protection against O₂, assimilating the ammonia into amino acids, and growth; the plant must build and maintain the nodules, make leghaemoglobin and transport the fixed nitrogen. Field measurements of the carbon cost of nodulated legumes are correspondingly larger than the stoichiometric minimum.
:::
:::

Nitrogenase also reduces acetylene (C₂H₂) to ethylene, which is easily measured by gas chromatography; the **acetylene reduction assay** (developed in the 1960s, including by Ralph Hardy and colleagues, 1968) is the standard way to detect and measure nitrogen fixation in cultures, soils and nodules. Biological nitrogen fixation adds on the order of 100–200 million tonnes of nitrogen a year to the land and ocean, comparable with the industrial Haber–Bosch process ([[diversity-of-life/bacteria-archaea]]).

::: intuition The redox ladder of a lake sediment
In a sediment, the best acceptor is used first. Near the surface, aerobic heterotrophs consume O₂; within millimetres it is gone, and denitrifiers take over until nitrate is exhausted; then iron and manganese reducers, then sulfate reducers, and finally, where sulfate too is gone (as in fresh water, where it is scarce), methanogens and fermenters. Each step down the ladder yields less energy per electron, so organisms using a better acceptor can draw the electron donors (H₂, acetate) down to concentrations too low for those using a poorer one — which is why the zones are separate. Rising up through the zones, the reduced products (Fe²⁺, H₂S, CH₄, NH₄⁺) meet the oxidants coming down, and chemolithotrophs live at each boundary. The whole column is a redox tower laid out in space ([[microbiology/microbial-ecology]]).
:::

::: application Microbial metabolism at work
Every process of this chapter is used by people. Lactic, alcoholic and propionic fermentations make food and drink; acetone–butanol and ethanol fermentations make solvents and fuels. Denitrification and anammox remove nitrogen from sewage in treatment plants; methanogens make biogas from waste in anaerobic digesters. Iron- and sulfur-oxidising acidophiles leach copper, gold and uranium from ores (biomining). Nitrogen fixation by rhizobia in legumes and by cyanobacteria in rice paddies replaces fertiliser. Polyhydroxybutyrate from *Cupriavidus necator* is a biodegradable plastic, and engineered chemolithoautotrophs and acetogens are being developed to turn CO₂, H₂ and CO into chemicals ([[biotechnology]]).
:::

::: history
Pasteur described "life without air" in butyric fermentation in 1861. Winogradsky discovered chemolithotrophy with *Beggiatoa* (1887) and the nitrifiers (1890), and isolated *Clostridium pasteurianum* (1893). Hermann Hellriegel and Hermann Wilfarth showed in 1886–1888 that legumes fix nitrogen only when their roots bear nodules, and Martinus Beijerinck isolated the nodule bacteria in 1888. Theodor Engelmann found in 1883 that purple bacteria accumulate in light and are attracted to infrared wavelengths; van Niel's comparative biochemistry of photosynthesis (1931 onwards) generalised the photosynthetic equation. Kluyver's "unity of biochemistry" (1926) and Peter Mitchell's chemiosmotic theory (1961) supplied the common framework, and Rudolf Thauer, Kurt Jungermann and Karl Decker's review of the energetics of anaerobic bacteria (1977) supplied the thermodynamic tables still used today. Since 2000, the discovery of anammox (1995–1999), proteorhodopsin (2000), comammox (2015) and new carbon-fixation pathways has shown that the catalogue is not closed.
:::

::: summary
- A cell needs energy, reducing power and carbon; central metabolism (Embden–Meyerhof, Entner–Doudoroff, TCA) supplies about a dozen precursor metabolites for biosynthesis.
- The energy of an electron transfer is $\Delta G^{\circ\prime} = -nF\Delta E^{\circ\prime}$; the redox tower runs from organic matter and H₂ (about −0.4 V) to O₂ (+0.82 V). Energy is conserved in quanta of one ion pumped (about −15 kJ mol⁻¹), so small energy yields can support life.
- Fermentation balances redox internally and makes ATP by substrate-level phosphorylation; acetate formation via acetyl phosphate adds ATP, and H₂ release, made possible by H₂-consuming partners, frees electrons.
- Bacterial respiratory chains are branched and modular; anaerobic respiration uses nitrate (denitrification), Fe³⁺ and Mn⁴⁺ (with extracellular electron transfer), sulfate (after activation as APS), CO₂ (methanogenesis, acetogenesis) and other acceptors.
- Chemolithotrophs oxidise H₂, reduced sulfur, Fe²⁺, NH₃ and nitrite; many need reverse electron transport for NAD(P)H. Iron oxidation at pH 2 yields about −33 kJ per mole of Fe²⁺.
- Phototrophs use chlorophyll-based reaction centres (type I and II; oxygenic with two photosystems in series, or anoxygenic with one and cyclic electron flow) or retinal-based rhodopsin pumps.
- At least seven pathways fix CO₂: Calvin–Benson, reductive TCA, Wood–Ljungdahl, and several hydroxypropionate and hydroxybutyrate cycles, and the reductive glycine pathway.
- Nitrogenase (Fe protein and MoFe protein) reduces N₂ at a cost of 16 ATP and 8 electrons, producing H₂; it is destroyed by O₂, against which fixers use anaerobiosis, respiratory protection, heterocysts, temporal separation and symbiosis.
:::

## Exercises

::: exercise Reading the redox tower {level=1}
Using the table of redox potentials, decide whether each of the following can in principle support energy conservation: (a) oxidation of H₂ with sulfate; (b) oxidation of H₂S with nitrate; (c) oxidation of NH₄⁺ with sulfate; (d) oxidation of succinate with nitrate.
::: solution
(a) Yes: H⁺/H₂ (−0.41 V) is above SO₄²⁻/HS⁻ (−0.22 V); $\Delta E = +0.19$ V. (b) Yes: S⁰/H₂S (−0.27 V) or SO₄²⁻/HS⁻ (−0.22 V) are above NO₃⁻/NO₂⁻ (+0.42 V); many sulfur oxidisers are denitrifiers. (c) No: NO₂⁻/NH₄⁺ (+0.34 V) is below SO₄²⁻/HS⁻ (−0.22 V), so the reaction is strongly endergonic. (d) Yes: fumarate/succinate (+0.03 V) is above NO₃⁻/NO₂⁻ (+0.42 V); $\Delta E = 0.39$ V.
:::
:::

::: exercise Hydrogen and oxygen {level=1 check="-237"}
Calculate $\Delta G^{\circ\prime}$ in kJ per mol H₂ for H₂ + ½ O₂ → H₂O, using $E^{\circ\prime} = -0.414$ V for 2H⁺/H₂ and +0.816 V for O₂/H₂O.
::: solution
$\Delta E = 0.816 - (-0.414) = 1.230$ V, $n = 2$: $\Delta G^{\circ\prime} = -2\times96.485\times1.230 = -237$ kJ mol⁻¹.
:::
:::

::: exercise Naming metabolisms {level=1}
Classify each process as fermentation, aerobic respiration, anaerobic respiration, chemolithotrophy or phototrophy (more than one may apply): (a) *Desulfovibrio* oxidising H₂ with sulfate; (b) *Lactococcus* making lactate from lactose; (c) *Nitrobacter* oxidising nitrite with O₂; (d) *Chromatium* fixing CO₂ in the light with H₂S; (e) *Paracoccus* oxidising acetate with nitrate.
::: solution
(a) Anaerobic respiration and chemolithotrophy (inorganic donor H₂). (b) Fermentation. (c) Chemolithotrophy by aerobic respiration (inorganic donor, O₂ acceptor). (d) Phototrophy (anoxygenic photosynthesis), with H₂S as electron donor: a photolithoautotroph. (e) Anaerobic respiration (denitrification) with an organic donor.
:::
:::

::: exercise Nitrite oxidisers are slow {level=2 check="-76"}
(a) Calculate $\Delta G^{\circ\prime}$ per mol nitrite for NO₂⁻ + ½ O₂ → NO₃⁻, using $E^{\circ\prime} = +0.42$ V for NO₃⁻/NO₂⁻ (to the nearest kJ). (b) Compare with the oxidation of glucose by O₂ ($-2{,}870$ kJ mol⁻¹). (c) Give two reasons why *Nitrobacter* grows slowly and with a low yield.
::: solution
(a) $\Delta E = 0.816 - 0.42 = 0.396$ V, $n = 2$: $-2\times96.485\times0.396 = -76$ kJ mol⁻¹. (b) Per mole of donor glucose releases almost 40 times as much energy; per electron the comparison is $2{,}870/24 = 120$ kJ against $76/2 = 38$ kJ. (c) Each electron carries little energy, so many nitrite molecules must be oxidised for each ATP; and the donor potential (+0.42 V) is far above NAD⁺/NADH, so reducing power for CO₂ fixation (by the Calvin cycle, which is itself expensive) requires costly reverse electron transport.
:::
:::

::: exercise A heterolactic balance {level=2 check="1"}
In heterolactic fermentation, glucose is converted by the phosphoketolase pathway into one lactate, one ethanol and one CO₂. Glucose 6-phosphate is oxidised to ribulose 5-phosphate and CO₂ (producing 2 NAD(P)H), which is split into glyceraldehyde 3-phosphate and acetyl phosphate. Count the ATP and the NAD(P)H, and give the net ATP per glucose.
::: solution
ATP: −1 to phosphorylate glucose; glyceraldehyde 3-phosphate → pyruvate gives +2 ATP and +1 NADH; pyruvate → lactate uses 1 NADH. Acetyl phosphate → acetyl-CoA → acetaldehyde → ethanol uses 2 NAD(P)H (and forgoes the ATP that acetate kinase could have made). NAD(P)H: +2 (oxidative decarboxylation) +1 (glyceraldehyde 3-phosphate dehydrogenase) −1 (lactate) −2 (ethanol) = 0, balanced. Net ATP: $-1 + 2 = 1$ per glucose — half that of homolactic fermentation. If fructose is available as an extra electron acceptor (reduced to mannitol), the acetyl phosphate can instead make acetate and an extra ATP, as *Leuconostoc* does.
:::
:::

::: exercise Protecting nitrogenase {level=2}
For each, explain how nitrogenase is protected from O₂: (a) *Anabaena* growing in light on N₂; (b) *Azotobacter vinelandii* in air; (c) *Bradyrhizobium* in soybean nodules; (d) *Clostridium pasteurianum*. In which of these would you expect to find nitrogenase activity in every cell?
::: solution
(a) Heterocysts lack PSII (no O₂ evolution), have a thick glycolipid envelope that restricts O₂ entry and high respiratory activity; only the heterocysts (about 5–10 % of cells) fix N₂. (b) Very high respiration rates consume O₂ at the cell surface, keeping the interior nearly anoxic, together with a protein (FeSII) that binds nitrogenase in a protected, inactive form during oxygen stress. (c) The plant nodule restricts O₂ diffusion and leghaemoglobin delivers it at very low free concentration (tens of nanomolar) to the bacteroids' high-affinity terminal oxidase. (d) It is an obligate anaerobe living in anoxic microsites, so no protection is needed. Every cell can fix nitrogen in (b) and (d); in (c), every bacteroid but not free-living cells; in (a), only heterocysts.
:::
:::

::: exercise Energy from a photon {level=2 check="45"}
Photosystem I absorbs at 700 nm and, in each turnover, moves one electron from plastocyanin ($E^{\circ\prime} \approx +0.37$ V) to ferredoxin ($E^{\circ\prime} \approx -0.43$ V). What percentage of the photon's energy is stored in the reduced ferredoxin? Use $E = 119{,}600/\lambda$ kJ mol⁻¹ and $F = 96.485$ kJ mol⁻¹ V⁻¹, and give a whole number.
::: solution
Photon energy: $119{,}600/700 = 170.9$ kJ mol⁻¹. Energy stored: $F\times\Delta E = 96.485\times0.80 = 77.2$ kJ mol⁻¹. Fraction: $77.2/170.9 = 45\,\%$. The remainder is dissipated as heat in the fast, nearly irreversible steps that prevent the separated charges from recombining.
:::
:::

::: exercise Interpreting a sediment profile {level=3}
In a freshwater lake sediment, porewater profiles show: O₂ falls from 250 µmol L⁻¹ at the surface to zero at 3 mm; nitrate peaks at 2 mm and is gone by 8 mm; dissolved Fe²⁺ appears below 10 mm and peaks at 30 mm; sulfate (low in fresh water, 100 µmol L⁻¹ above) falls to zero at 40 mm; methane appears below 40 mm and rises with depth. (a) Explain the sequence. (b) Why does nitrate peak below the surface rather than at it? (c) What would you expect to happen to Fe²⁺ and CH₄ as they diffuse upwards? (d) How would the profile differ in a marine sediment?
::: solution
(a) Electron acceptors are used in order of decreasing energy yield (O₂, nitrate, Mn⁴⁺ and Fe³⁺ oxides, sulfate, then CO₂ in methanogenesis); organisms using a better acceptor outcompete the rest for donors, so each acceptor is depleted before the next is used. (b) Ammonium released by decomposition is nitrified in the oxic layer, producing nitrate; below, denitrification removes it. The nitrate peak marks the zone where nitrification produces it just above where denitrification consumes it. (c) Fe²⁺ is re-oxidised near the oxic boundary, chemically or by iron-oxidising bacteria, precipitating iron oxides (an orange layer); CH₄ is oxidised by aerobic methanotrophs near the oxic boundary and, in part, anaerobically (with sulfate, nitrate or iron), so little escapes if the sediment is undisturbed. (d) Sea water has about 28 mmol L⁻¹ sulfate, so sulfate reduction would extend over metres and dominate organic carbon oxidation; methanogenesis would begin only much deeper, below the sulfate zone, and anaerobic oxidation of methane coupled to sulfate reduction would consume most of the methane at the sulfate–methane transition.
:::
:::

::: exercise A chemolithotroph's choice {level=3}
A bacterium can oxidise H₂S either completely to sulfate (8 electrons) or only to elemental sulfur (2 electrons), with O₂ as acceptor. Using $E^{\circ\prime}$ values of −0.27 V (S⁰/H₂S), −0.22 V (SO₄²⁻/HS⁻) and +0.82 V (O₂/H₂O), (a) calculate $\Delta G^{\circ\prime}$ per mol H₂S for each. (b) *Beggiatoa* stores sulfur globules when sulfide is plentiful and oxidises them to sulfate when sulfide runs out. Explain the advantage. (c) Some *Thiomargarita* and *Beggiatoa* store nitrate in vacuoles. What does this allow them to do?
::: solution
(a) To S⁰: $\Delta E = 0.82 + 0.27 = 1.09$ V, $n = 2$: $-2\times96.485\times1.09 = -210$ kJ mol⁻¹. To sulfate: $\Delta E = 0.82 + 0.22 = 1.04$ V, $n = 8$: $-8\times96.485\times1.04 = -803$ kJ mol⁻¹. (b) Oxidising to S⁰ is fast and uses less O₂ per sulfide, letting the cell process sulfide rapidly when it is abundant; the stored S⁰ is a reserve of electron donor (about three-quarters of the total energy remains) that can be used later, like a fat store. (c) Stored nitrate is a reserve of electron acceptor: the cell can oxidise sulfide in anoxic sediment, where sulfide is abundant but O₂ absent, by denitrification or DNRA, and return to the oxic or nitrate-rich zone to recharge — separating donor and acceptor in space and time.
:::
:::
