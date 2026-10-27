By the end of the citric acid cycle a glucose molecule has been taken apart completely: its six carbons have left as CO₂, but only four ATP (or GTP) have been made. The rest of its energy is held as electrons on ten NADH and two FADH₂. **Oxidative phosphorylation** converts that electron energy into ATP: the electrons pass down a chain of carriers in the inner membrane of the mitochondrion (or the plasma membrane of a bacterium) to oxygen, and the energy released at each step is used to pump protons across the membrane; the protons flow back through a rotary motor, ATP synthase, which makes ATP. This two-stage mechanism — electrons build a proton gradient, the gradient makes ATP — was Peter Mitchell's chemiosmotic theory of 1961, initially greeted with deep scepticism and now one of the unifying principles of biology. The same mechanism makes ATP in chloroplasts and in almost every bacterium and archaeon, and the same gradient drives transport and the rotation of bacterial flagella.

The thermodynamics of the respiratory chain, the components of the proton-motive force and the energy budget of ATP synthesis are developed in [Chemistry Atlas: oxidative phosphorylation and photosynthesis](/learn/chemistry/lesson.php?c=biochemistry&l=oxidative-phosphorylation). This chapter concentrates on how the mechanism was established and is studied, how it varies across organisms — in ATP-synthase design, in proton-motive force, in electron acceptors — and how organisms deliberately uncouple it to make heat.

## The respiratory chain

In 1925 David Keilin, using a hand spectroscope on the flight muscles of insects and on yeast, saw absorption bands that appeared and disappeared as the tissue was oxygenated and deoxygenated: the **cytochromes**, haem proteins that carry electrons. Otto Warburg had identified the oxygen-reducing "respiratory enzyme" as an iron–haem protein inhibited by cyanide and carbon monoxide (Nobel Prize in Physiology or Medicine, 1931). Eugene Kennedy and Albert Lehninger showed in 1949, with fractionated rat liver, that the citric acid cycle and oxidative phosphorylation both take place in mitochondria.

::: definition The mitochondrial respiratory chain {#def-chain}
The **respiratory chain** of mitochondria consists of four membrane-protein complexes and two mobile carriers in the inner membrane:

- **Complex I** (NADH–ubiquinone oxidoreductase) transfers two electrons from NADH to ubiquinone (Q) and pumps 4 H⁺ across the membrane;
- **Complex II** (succinate dehydrogenase, also an enzyme of the citric acid cycle) transfers electrons from succinate via FAD to Q, pumping no protons;
- **ubiquinone**, a lipid-soluble carrier, diffuses in the membrane carrying two electrons as ubiquinol (QH₂);
- **Complex III** (cytochrome $bc_1$) transfers electrons from QH₂ to cytochrome c and, by the **Q cycle**, releases 4 H⁺ to the outside per two electrons;
- **cytochrome c**, a small water-soluble protein in the intermembrane space, carries one electron at a time;
- **Complex IV** (cytochrome c oxidase) reduces O₂ to water, consuming 4 H⁺ from the matrix per O₂ and pumping 4 more, i.e. 2 pumped per two electrons.

Per pair of electrons, NADH oxidation moves about **10 H⁺** from the matrix to the intermembrane space; succinate oxidation, entering at Q, moves **6 H⁺**.
:::

The complexes are arranged in order of increasing reduction potential, from NAD⁺/NADH ($E^{\circ\prime} = -0.32$ V) to O₂/H₂O ($+0.82$ V), so electrons flow spontaneously "downhill" and release about 220 kJ per mole of NADH oxidised. Complexes I, III and IV associate in **supercomplexes** ("respirasomes"), seen by cryo-electron microscopy since the 2010s, though how much they matter for function is still debated.

The chain is partly encoded by the mitochondrion's own genome. Human mitochondrial DNA, 16,569 base pairs long, encodes 13 proteins — all subunits of complexes I, III, IV and ATP synthase — plus the rRNAs and tRNAs to translate them; the remaining components, more than 70 subunits, are encoded in the nucleus and imported ([[cell-biology/organelles]], [[cell-biology/protein-sorting]]). This dual genetic control, a legacy of the bacterial ancestor of mitochondria, is why mitochondrial disorders can be inherited maternally or in Mendelian fashion ([[genetics/non-mendelian-inheritance]]).

## The chemiosmotic theory

Through the 1950s biochemists searched for a "high-energy intermediate" — a phosphorylated compound, analogous to 1,3-bisphosphoglycerate in glycolysis, that would link electron transfer to ATP synthesis. None was found. Mitchell proposed in 1961 that there is no such compound: the link is a gradient of protons across a membrane that is impermeable to them.

::: proposition The proton-motive force {#prop-pmf}
The free energy stored in a proton gradient is expressed as the **proton-motive force** $\Delta p$ (in volts), the electrochemical potential difference of H⁺ per unit charge. For protons moving from the positive (P, outside) to the negative (N, matrix or cytoplasm) side,

$$
\Delta p = \Delta\psi + \frac{2.303\,RT}{F}\,\Delta\mathrm{pH},
$$ {#eq-pmf}

where $\Delta\psi = \psi_\mathrm{P} - \psi_\mathrm{N}$ is the membrane potential (positive outside for mitochondria) and $\Delta\mathrm{pH} = \mathrm{pH}_\mathrm{N} - \mathrm{pH}_\mathrm{P}$; at 37 °C, $2.303RT/F = 61.5$ mV. The free energy released when one mole of protons flows back is $F\Delta p$. (This is [[cell-biology/membrane-transport#eq-dg-ion]] for H⁺; sign conventions differ between books — here $\Delta p$ is positive when the gradient can drive ATP synthesis.)
:::

The theory made testable predictions: the membrane must be intact and closed; electron transport must pump protons; an artificially imposed gradient should drive ATP synthesis without electron transport; and any agent that makes the membrane leaky to protons should **uncouple** respiration from phosphorylation. Each was confirmed.

- **Uncouplers.** Lipid-soluble weak acids such as 2,4-dinitrophenol (DNP) and carbonyl cyanide *p*-trifluoromethoxyphenylhydrazone (FCCP) carry protons across membranes and abolish ATP synthesis while respiration speeds up — just as expected if they short-circuit the gradient, and hard to explain otherwise, since they share no structure except the ability to carry protons.
- **The acid bath.** André Jagendorf and Ernest Uribe (1966) soaked spinach chloroplast thylakoids at pH 4 in the dark, so their lumen equilibrated at pH 4, then transferred them quickly to pH 8 with ADP and phosphate. They made ATP, in the dark, with no electron transport — driven by the imposed pH gradient alone.
- **The reconstitution.** Efraim Racker and Walther Stoeckenius (1974) built artificial lipid vesicles containing two proteins from unrelated organisms: bacteriorhodopsin, a light-driven proton pump from the archaeon *Halobacterium salinarum*, and ATP synthase from beef-heart mitochondria. Illuminated, the vesicles made ATP. The only thing the two proteins could share was the proton gradient.

Mitchell, who did much of his later work in a private laboratory in a restored house in Cornwall, received the 1978 Nobel Prize in Chemistry.

::: example Proton-motive force in three membranes {#ex-pmf}
Calculate $\Delta p$ at 37 °C from [[#eq-pmf]] for (a) a respiring mitochondrion with $\Delta\psi = 160$ mV and $\Delta\mathrm{pH} = 0.75$; (b) an illuminated chloroplast thylakoid with $\Delta\psi = 10$ mV and a lumen 2.5 pH units more acidic than the stroma; (c) the alkaliphilic bacterium *Bacillus pseudofirmus* growing at external pH 10.5 with cytoplasmic pH 8.2 and $\Delta\psi = 180$ mV (representative values).
::: solution
(a) $160 + 61.5\times0.75 = 160 + 46 = 206$ mV, mostly electrical.

(b) $10 + 61.5\times2.5 = 10 + 154 = 164$ mV, almost all as ΔpH. Chloroplasts let Cl⁻ and Mg²⁺ move to dissipate the potential, so the gradient is stored as pH.

(c) Here the cytoplasm is *more acidic* than the outside, so $\Delta\mathrm{pH} = 8.2 - 10.5 = -2.3$ and the pH term opposes ATP synthesis: $180 + 61.5\times(-2.3) = 180 - 141 = 39$ mV. Yet the bacterium grows by oxidative phosphorylation. How alkaliphiles make ATP with such a small bulk proton-motive force — perhaps by moving protons along the membrane surface, or through adaptations of their ATP synthase — has been a long-standing puzzle (studied especially by Terry Krulwich and colleagues). Many alkaliphiles also use a sodium-motive force for transport and flagella.
:::
:::

::: widget plot
f: s + 61.5*x
x: -3, 3
y: -100, 400
sliders: s=160:0:250:5
labels: \Delta p = \Delta\psi + 61.5\,\Delta\mathrm{pH}
hlines: 0; 200
vlines: 0.75; -2.3
caption: Proton-motive force $\Delta p$ (mV, 37 °C) against the pH difference $\Delta\mathrm{pH} = \mathrm{pH}_\mathrm{N} - \mathrm{pH}_\mathrm{P}$, for the membrane potential $\Delta\psi$ (mV) set by the slider, from [[#eq-pmf]]. The vertical lines mark a mitochondrion (ΔpH 0.75) and an alkaliphile at pH 10.5 (ΔpH −2.3); the horizontal line at 200 mV is a typical mitochondrial value. Set $s = 10$ to see how chloroplasts store a similar force almost entirely as ΔpH, and $s = 180$ to see how little is left for an alkaliphile.
:::

## ATP synthase: a rotary motor

The enzyme that uses the proton gradient, F₁F₀-ATP synthase, has two parts. **F₀**, in the membrane, contains a ring of $c$ subunits and an **a** subunit that together form a path for protons; **F₁**, projecting into the matrix, contains three catalytic β subunits alternating with three α subunits around a central stalk, the γ subunit, attached to the c-ring.

Paul Boyer proposed in the 1970s, from isotope-exchange experiments, that the three catalytic sites pass in turn through three states — open, loose and tight — and that the energy of the gradient is used not to form ATP (which forms spontaneously in the tight site) but to release it: the **binding-change mechanism**. John Walker's crystal structure of bovine F₁ (J. P. Abrahams and colleagues, 1994) showed the three β subunits in three different conformations around an asymmetric γ subunit, as Boyer's model required. Then in 1997 Hiroyuki Noji, Masasuke Yoshida, Kazuhiko Kinosita and colleagues attached a fluorescent actin filament to the γ subunit of F₁ from a thermophilic *Bacillus*, fixed the α₃β₃ ring to a glass surface, and watched under a microscope as the filament rotated, counter-clockwise, in steps of 120° as ATP was hydrolysed. Boyer and Walker shared the 1997 Nobel Prize in Chemistry (with Jens Skou, for the sodium pump).

In synthesis, protons entering from the P side bind to c subunits, the ring turns, and the protons leave on the N side; the rotating γ subunit forces each β subunit through its cycle. One full turn of the ring makes three ATP, one per β subunit, and requires as many protons as there are c subunits.

::: proposition The proton cost of ATP {#prop-stoich}
If the c-ring of an ATP synthase has $n$ subunits, each binding one proton per revolution, then synthesising one ATP requires $n/3$ protons through F₀. In mitochondria, exporting the ATP and importing ADP and phosphate costs about one further proton per ATP (the ATP/ADP translocase is electrogenic, and phosphate enters with a proton). The number of ATP made per pair of electrons transferred to oxygen (the **P/O ratio**) is therefore

$$
\text{P/O} = \frac{H^+_\text{pumped}}{n/3 + 1},
$$ {#eq-po}

with $H^+_\text{pumped} = 10$ for NADH and 6 for succinate in mitochondria. Assumptions: perfectly coupled pumps and synthase with no proton leak, and the stated pumping stoichiometries.
:::

The size of the c-ring is not fixed. It is 8 in vertebrate mitochondria (bovine ATP synthase, I. N. Watt and colleagues, 2010), 10 in yeast mitochondria and *E. coli*, 11 in the sodium-driven ATP synthase of the bacterium *Ilyobacter tartaricus*, 14 in spinach chloroplasts and 15 in the cyanobacterium *Arthrospira* (*Spirulina*); larger rings are known in some bacteria. Each ring size sets a different "gear ratio" between protons and ATP: a small ring makes ATP cheaply in protons but needs a larger proton-motive force for each step, whereas a large ring can work with a weaker force at a higher cost in protons.

::: example ATP per NADH in different organisms {#ex-po}
Use [[#eq-po]] to calculate the P/O ratio for NADH in (a) bovine mitochondria ($n = 8$) and (b) yeast mitochondria ($n = 10$). (c) In a chloroplast, ATP is made directly in the stroma and does not need to be exported. How many protons does each ATP cost with $n = 14$?
::: solution
(a) $n/3 = 2.67$, plus 1 for transport: 3.67 H⁺ per ATP; P/O $= 10/3.67 = 2.73$.
(b) $10/3 + 1 = 4.33$ H⁺ per ATP; P/O $= 10/4.33 = 2.31$.
(c) $14/3 = 4.67$ H⁺ per ATP, with no transport cost.
Measured P/O ratios for NADH-linked substrates in animal mitochondria are about 2.5, and for succinate about 1.5, a little below the theoretical 2.73 and 1.64 because some protons leak back. These non-integer values, once controversial, follow naturally from the chemiosmotic mechanism; older textbooks' values of 3 and 2 assumed integer stoichiometries. With 2.5 and 1.5, complete oxidation of one glucose yields about 30–32 ATP (the counting is done in [Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=oxidative-phosphorylation)).
:::
:::

::: widget plot
f: 10/(x/3 + 1); 6/(x/3 + 1); 3
x: 7, 18
y: 0, 3.5
labels: \text{P/O, NADH (10 H}^+\text{)}; \text{P/O, succinate (6 H}^+\text{)}; \text{integer value assumed in old textbooks}
vlines: 8; 10; 14; 15
caption: Theoretical P/O ratios from [[#eq-po]] against the number $n$ of c subunits in the ATP-synthase rotor (horizontal axis), for electrons from NADH (10 H⁺ pumped) and from succinate (6 H⁺), including one proton per ATP for transport. Vertical lines mark the measured ring sizes of bovine mitochondria (8), yeast and *E. coli* (10), spinach chloroplasts (14) and *Spirulina* (15) — though chloroplasts and bacteria do not pay the transport proton and have different pumping stoichiometries, so only the mitochondrial points apply directly. The ratio is not an integer, and it differs between species.
:::

## Measuring oxidative phosphorylation

Much of what we know was learned with a simple instrument: the **oxygen electrode** invented by Leland Clark (1956), which measures the dissolved O₂ concentration in a stirred chamber containing isolated mitochondria. Britton Chance and G. R. Williams (1955) defined the standard experimental states.

::: definition Respiratory states, respiratory control and P/O ratio {#def-states}
In an oxygen-electrode experiment with isolated mitochondria and an oxidisable substrate, **state 3** is the rapid respiration that follows the addition of ADP, while ATP is being made; **state 4** is the slower respiration after the ADP has been converted to ATP, supported only by the leak of protons back across the membrane. The **respiratory control ratio** (RCR) is the ratio of state 3 to state 4 rates; a high value (often 4–10) shows that the mitochondria are well coupled. The **P/O ratio** is the amount of ADP phosphorylated divided by the amount of oxygen *atoms* consumed during state 3.
:::

Respiratory control is the cellular expression of chemiosmotic coupling. When ATP is in demand, ADP rises, ATP synthase lets protons back in, the proton-motive force falls slightly, and electron transport (which is restrained by the back-pressure of the gradient) speeds up. When demand falls, the gradient builds up and slows the chain. Respiration thus follows ATP use automatically, without any separate signal.

::: example Reading an oxygen-electrode trace {#ex-electrode}
Rat-liver mitochondria respiring on glutamate plus malate consume O₂ at 20 nmol O₂ min⁻¹ before ADP is added. After 250 nmol ADP is added, respiration rises to 120 nmol O₂ min⁻¹, and 46 nmol O₂ are consumed before the rate falls back to 20 nmol O₂ min⁻¹. Calculate the RCR and the P/O ratio, and say what you would expect after adding (a) oligomycin, (b) an uncoupler, (c) cyanide.
::: solution
RCR $= 120/20 = 6.0$, typical of good preparations. P/O $= 250\ \text{nmol ADP}/(2\times46\ \text{nmol O}) = 250/92 = 2.72$ — close to the theoretical value for NADH-linked substrates ([[#ex-po]]). (Strictly, the oxygen used for the leak during the ADP burst should be subtracted first, which would raise the P/O slightly.)
(a) Oligomycin blocks the proton channel of ATP synthase: in state 3 respiration falls to the state-4 rate, because protons can no longer re-enter through the synthase.
(b) An uncoupler makes the membrane leaky to protons: respiration rises to its maximum, even without ADP, and no ATP is made.
(c) Cyanide blocks complex IV: respiration stops entirely, whatever else is added. Used in sequence, such inhibitors dissect a cell's respiration into ATP-linked, leak and maximal components — the basis of modern extracellular-flux assays on intact cells.
:::
:::

Classical inhibitors and their sites of action are tools of every bioenergetics laboratory: rotenone (a plant insecticide) blocks complex I; antimycin A (from *Streptomyces*) blocks complex III; cyanide, azide and carbon monoxide block complex IV; oligomycin blocks F₀; atractyloside (from a thistle) and bongkrekic acid (from a bacterium) block the ATP/ADP translocase. Many are natural toxins that organisms use against competitors and predators, which is why they are so potent.

## Uncoupling for heat

A proton gradient that leaks makes heat instead of ATP. Organisms have repeatedly evolved ways to do this deliberately.

### Brown adipose tissue

**Brown adipose tissue** (BAT), packed with mitochondria (whose cytochromes give it its colour), is the heater of small mammals, hibernators arousing from torpor, and newborns, including human infants. Its inner mitochondrial membrane contains **uncoupling protein 1** (UCP1, thermogenin), identified in the 1970s by David Nicholls and colleagues and by Daniel Ricquier, a carrier that lets protons back into the matrix when activated by fatty acids released under sympathetic nervous stimulation. The chain then runs at full speed, oxidising fat, and the energy appears as heat — **non-shivering thermogenesis**. UCP1 is present in most placental mammals but has been inactivated independently in several lineages, including pigs (J. Berg and colleagues, *PLoS Genetics* 2, e129, 2006), whose piglets are notoriously poor at keeping warm, and horses, elephants and whales (M. J. Gaudry and colleagues, 2017); birds lack it and warm themselves by shivering and other mechanisms. Adult humans retain active BAT in some depots, as positron-emission imaging revealed in 2009, a finding that is studied in metabolic research ([Medicine Atlas: endocrine](/learn/medicine/course.php?c=endocrine)).

::: warning "Uncouplers are a way to burn fat safely"
2,4-Dinitrophenol was marketed as a slimming drug in the early 1930s, because by uncoupling oxidative phosphorylation it raises metabolic rate and burns fat. It also produced cataracts and many deaths from uncontrolled hyperthermia, because the heat it generates is not regulated: there is no thermostat on a chemical protonophore, unlike UCP1, which is switched on and off by the nervous system. It was withdrawn in the United States in 1938. The difference between a regulated physiological uncoupler and an unregulated chemical one is the point; the clinical toxicology belongs to [Medicine Atlas: pharmacology](/learn/medicine/course.php?c=pharmacology).
:::

### Hot flowers

Plants have a second route to heat. In addition to complexes III and IV, plant mitochondria have an **alternative oxidase** (AOX) that takes electrons directly from ubiquinol to O₂, bypassing two proton-pumping sites; it is insensitive to cyanide. In ordinary tissues AOX is thought to act as a safety valve, preventing over-reduction of the chain under stress. In some flowers it makes heat. The inflorescence of the voodoo lily (*Sauromatum guttatum*) heats up by more than 10 °C on the day it opens, volatilising foul-smelling compounds that attract pollinating carrion insects; the trigger is salicylic acid (I. Raskin and colleagues, *Science* 237, 1601, 1987). The eastern skunk cabbage (*Symplocarpus foetidus*) keeps its flower spike at around 15–22 °C for weeks in late winter while the air is near or below freezing (R. M. Knutson, 1974), and the sacred lotus (*Nelumbo nucifera*) regulates its flower temperature between about 30 and 35 °C over a wide range of air temperatures, a true thermoregulation (R. S. Seymour and P. Schultze-Motel, *Nature* 383, 305, 1996). How much of the heat comes from AOX and how much from uncoupling proteins differs between species.

::: example The power of a lotus flower {#ex-lotus}
A sacred lotus flower produces about 1.0 W of heat while thermoregulating on a cool night. If all of it comes from respiration, how much O₂ must the flower consume per minute (20.1 kJ L⁻¹ O₂)? Compare with a resting human's 250 mL min⁻¹ for 84 W.
::: solution
$1.0\ \mathrm{J\,s^{-1}}\times60\ \mathrm{s} = 60$ J per minute $= 0.060$ kJ, so $0.060/20.1 = 0.0030$ L $= 3.0$ mL O₂ min⁻¹. Per watt, the flower and the human are identical ($250/84 = 3.0$ mL min⁻¹ W⁻¹), as they must be: heat from respiration depends only on the fuel and O₂ consumed. The flower's receptacle weighs only tens of grams, so its mass-specific respiration rate rivals that of a small flying animal — which is why respiration rates of thermogenic flowers are among the highest measured in plants.
:::
:::

## Respiration without oxygen

Mitochondria use O₂, but respiration — electron transport coupled to a proton (or sodium) gradient — is far older than atmospheric oxygen. Bacteria and archaea respire with many electron acceptors, and the energy available depends on how far apart the donor and acceptor are on the scale of reduction potentials.

| acceptor couple | $E^{\circ\prime}$ (V) | organisms (examples) |
|---|---|---|
| O₂/H₂O | +0.82 | aerobes, mitochondria |
| NO₃⁻/NO₂⁻ | +0.42 | *E. coli*, denitrifiers such as *Paracoccus* |
| Fe³⁺/Fe²⁺ (iron minerals) | about 0 to +0.2, depending on mineral | *Geobacter*, *Shewanella* |
| fumarate/succinate | +0.03 | *E. coli*, parasitic worms |
| SO₄²⁻/HS⁻ | −0.22 | *Desulfovibrio* |
| CO₂/CH₄ | −0.24 | methanogenic archaea |

::: example How much energy does each acceptor give? {#ex-acceptors}
Using $\Delta G^{\circ\prime} = -nF\Delta E^{\circ\prime}$ with $n = 2$, calculate the standard free energy released when a pair of electrons passes from NADH ($E^{\circ\prime} = -0.32$ V) to O₂, to nitrate and to fumarate, and from H₂ ($E^{\circ\prime} = -0.41$ V) to sulfate. Compare with the roughly 50 kJ mol⁻¹ needed to make one ATP in a cell.
::: solution
$\Delta G^{\circ\prime} = -2\times96.5\times\Delta E^{\circ\prime}$ kJ mol⁻¹:

- NADH → O₂: $\Delta E = 1.14$ V, $-219$ kJ mol⁻¹;
- NADH → nitrate: $\Delta E = 0.74$ V, $-143$ kJ mol⁻¹;
- NADH → fumarate: $\Delta E = 0.35$ V, $-68$ kJ mol⁻¹;
- H₂ → sulfate: $\Delta E = 0.19$ V, $-38$ kJ mol⁻¹.

Oxygen supports about four ATP-equivalents per electron pair, nitrate nearly three, fumarate about one, and sulfate reduction with H₂ less than one — which is why sulfate reducers and methanogens grow slowly, live close to the thermodynamic limit, and why the chemiosmotic mechanism, which can couple fractions of an ATP to each electron transfer, was essential for their evolution. The order of the table is also the order in which acceptors are used up in a lake sediment or a waterlogged soil as one goes deeper: oxygen first, then nitrate, iron and manganese, sulfate and finally CO₂ ([[microbiology/microbial-metabolism]], [[ecology]]).
:::
:::

::: quiz
Isolated mitochondria respiring on succinate are given ADP and then, in turn, oligomycin and then FCCP. What happens to oxygen consumption at each step?
- [ ] ADP: falls; oligomycin: rises; FCCP: stops.
- [x] ADP: rises; oligomycin: falls back to the leak rate; FCCP: rises to the maximum rate.
- [ ] ADP: no change; oligomycin: stops; FCCP: no change.
- [ ] ADP: rises; oligomycin: rises further; FCCP: stops.
::: solution
ADP gives state 3 respiration. Oligomycin blocks the proton channel of ATP synthase, so the only route back for protons is the leak, and respiration slows to the state-4 rate. FCCP opens a new route for protons across the membrane, collapsing the gradient; the chain is released from back-pressure and runs at its maximal rate, even though no ATP can be made.
:::
:::

::: application Reactive oxygen species
A small fraction of electrons in the respiratory chain react directly with O₂ to form superoxide, mainly at complexes I and III, especially when the chain is highly reduced and the proton-motive force is high. Superoxide and the hydrogen peroxide made from it are **reactive oxygen species** (ROS), which damage lipids, proteins and DNA but also act as signals. Early estimates that 1–2 % of the oxygen consumed becomes superoxide are now thought much too high for mitochondria in living cells; more recent estimates are roughly an order of magnitude lower and depend strongly on conditions (M. D. Brand, 2010). Mild uncoupling lowers ROS production by lowering the proton-motive force, one proposed function of UCP homologues in non-thermogenic tissues. The role of ROS in ageing, once central to a "free-radical theory", is now regarded as more complicated than first thought.
:::

::: history
Keilin described the cytochromes in 1925; Warburg identified the respiratory enzyme as an iron–haem protein by 1928. Vladimir Engelhardt (1930) and Herman Kalckar (1937) showed that respiration is coupled to phosphorylation, and Severo Ochoa (1940) measured P/O ratios. Kennedy and Lehninger located oxidative phosphorylation in mitochondria in 1949. Chance and Williams defined the respiratory states in 1955. Mitchell proposed chemiosmosis in 1961; Jagendorf and Uribe's acid-bath experiment (1966) and Racker and Stoeckenius's reconstitution (1974) supported it, and Mitchell received the Nobel Prize in 1978. Boyer's binding-change mechanism (1970s), Walker's structure of F₁ (1994) and Noji and colleagues' observation of rotation (1997) explained ATP synthase. The structure of complex I, the last of the large respiratory complexes, was completed by Leonid Sazanov's group in 2013–16.
:::

## Where this leads

The ATP made here supports everything else in the course; how its production is coordinated with fuel supply across tissues, and how much ATP different fuels yield, is the subject of [[biochemistry/metabolic-integration]]. Chemiosmosis in photosynthesis — light-driven electron transport, the Z-scheme and photophosphorylation — is developed in [[plant-biology/photosynthesis]], and the evolutionary origin of mitochondria in [[cell-biology/organelles]].

::: summary
- The respiratory chain (complexes I–IV, ubiquinone, cytochrome c) passes electrons from NADH ($-0.32$ V) to O₂ ($+0.82$ V), pumping about 10 H⁺ per NADH and 6 per succinate.
- Chemiosmosis (Mitchell, 1961): the proton-motive force $\Delta p = \Delta\psi + 61.5\,\Delta\mathrm{pH}$ mV couples electron transport to ATP synthesis; confirmed by uncouplers, the acid-bath experiment and the bacteriorhodopsin–ATP synthase reconstitution.
- Mitochondria store $\Delta p$ (about 200 mV) mostly as $\Delta\psi$, chloroplasts mostly as ΔpH; alkaliphiles grow with a bulk $\Delta p$ of only about 40 mV.
- ATP synthase is a rotary motor (binding change, Boyer; structure, Walker; rotation seen in 1997); with $n$ c subunits, ATP costs $n/3$ protons plus 1 for export; c-rings of 8–15 subunits give species-specific, non-integer P/O ratios (about 2.5 for NADH, 1.5 for succinate).
- Oxygen electrodes measure states 3 and 4, the respiratory control ratio and the P/O ratio; inhibitors (rotenone, antimycin, cyanide, oligomycin, atractyloside) and uncouplers dissect the chain.
- Regulated uncoupling makes heat: UCP1 in brown fat of placental mammals, the alternative oxidase in thermogenic flowers.
- Bacteria and archaea respire with nitrate, iron, fumarate, sulfate and CO₂; the energy per electron pair falls with the acceptor's reduction potential.
:::

## Exercises

::: exercise A proton-motive force {level=1 check="196"}
Calculate $\Delta p$ in mV at 37 °C for $\Delta\psi = 150$ mV and $\Delta\mathrm{pH} = 0.75$ (three significant figures).
::: solution
$150 + 61.5\times0.75 = 150 + 46.1 = 196$ mV.
:::
:::

::: exercise Protons per ATP {level=1 check="4"}
How many protons pass through the F₀ part of an ATP synthase with a 12-subunit c-ring for each ATP made?
::: solution
$12/3 = 4$.
:::
:::

::: exercise P/O for succinate {level=1 check="1.64"}
Using [[#eq-po]], what is the theoretical P/O ratio for succinate in bovine mitochondria ($n = 8$; three significant figures)?
::: solution
$6/(8/3 + 1) = 6/3.667 = 1.64$.
:::
:::

::: exercise Is the gradient strong enough? {level=2 check="2.59"}
ATP synthesis in a mitochondrion requires about 50 kJ mol⁻¹. If $\Delta p = 200$ mV, how many protons must flow back, at minimum, to provide this energy (three significant figures)? Compare with the 2.67 protons per ATP through the bovine F₀.
::: solution
Each mole of protons provides $F\Delta p = 96.485\times0.200 = 19.3$ kJ. Minimum $= 50/19.3 = 2.59$ protons. With $n = 8$, F₀ uses 2.67, just enough — consistent with the idea that the smallest c-rings belong to organisms that maintain a large proton-motive force.
:::
:::

::: exercise An oxygen-electrode experiment {level=2 check="1.47"}
Mitochondria respiring on succinate (with rotenone) are given 200 nmol ADP; during the burst of state 3 respiration they consume 68 nmol O₂. What is the P/O ratio (three significant figures)? Is the value consistent with theory?
::: solution
P/O $= 200/(2\times68) = 200/136 = 1.47$. The theoretical value for bovine mitochondria is 1.64; the measured value is somewhat lower, as expected from proton leak, and close to the accepted 1.5. Rotenone is added to block complex I, so that NADH made from the succinate (via fumarate and malate) does not contribute.
:::
:::

::: exercise Thermogenesis in a newborn {level=2}
Explain, step by step, how activation of UCP1 by noradrenaline released from sympathetic nerves raises heat production in brown adipose tissue. Why does respiration increase rather than stop when ATP synthesis falls? Why must brown adipocytes also mobilise their own fat stores?
::: solution
Noradrenaline binds β-adrenergic receptors, raising cAMP and activating protein kinase A, which activates lipolysis (hormone-sensitive lipase and others). Fatty acids released activate UCP1, which lets protons back into the matrix. The proton-motive force falls; because respiration is held back by the back-pressure of the gradient (respiratory control), the chain speeds up, oxidising substrate faster, and the free energy that would have made ATP is released as heat. Fat is mobilised both as the signal that activates UCP1 and as the fuel (via β-oxidation, [[biochemistry/metabolic-integration]]) to supply NADH and FADH₂ at the high rate needed.
:::
:::

::: exercise Choosing an inhibitor {level=2}
A researcher wants to know how much of a cell line's oxygen consumption is (a) used to make ATP, (b) due to proton leak, (c) not mitochondrial at all, and (d) the spare capacity of the chain. Design a sequence of additions to cells in an oxygen-consumption assay, and explain how each quantity is calculated.
::: solution
Measure basal respiration. Add oligomycin: the fall in respiration is ATP-linked respiration (a); the remaining mitochondrial respiration is leak (b), after subtracting (c). Add an uncoupler (FCCP), titrated to the concentration giving maximal rate: the difference between maximal and basal respiration is spare capacity (d). Finally add rotenone plus antimycin A (or cyanide) to stop mitochondrial electron transport: the residual oxygen consumption is non-mitochondrial (c), due to other oxidases, and is subtracted from all the others.
:::
:::

::: exercise Interpreting c-ring diversity {level=3}
c-Ring sizes range from 8 (vertebrate mitochondria) to 15 or more (some cyanobacteria and bacteria). (a) Using [[#prop-stoich]] and the energetics of ATP synthesis, explain the trade-off that a given ring size represents. (b) Chloroplasts have $n = 14$ but generate a proton-motive force similar to that of mitochondria. Their ATP synthase operates at a higher proton cost per ATP; suggest why this might be advantageous in a photosynthetic membrane. (c) How could you test experimentally whether ring size is set by the c-subunit sequence itself?
::: solution
(a) The free energy per ATP is fixed (about 50 kJ mol⁻¹ in vivo), but each proton delivers $F\Delta p$. A small ring (few protons per ATP) gives a high yield of ATP per proton but works only if $\Delta p$ is large enough that $n/3$ protons supply 50 kJ; a large ring can make ATP with a smaller $\Delta p$ (more protons share the work) but at a lower yield. Ring size thus tunes the synthase to the proton-motive force an organism can sustain and to whether protons or ATP are the more limiting.
(b) In chloroplasts, light-driven electron transport supplies protons abundantly when light is plentiful, so yield per proton matters less; a large ring lets ATP synthesis proceed at a lower ΔpH, which protects the photosynthetic machinery (a very acidic lumen damages photosystem II and is used to signal for photoprotection), and it changes the ratio of ATP to NADPH made by linear electron flow — which must match the 3:2 ratio required by the Calvin–Benson cycle, aided by cyclic electron flow ([[plant-biology/photosynthesis]]).
(c) Express c-subunit genes from organisms with different ring sizes, or chimaeras and point mutants (especially of residues packed between neighbouring c subunits), in a host or *in vitro*, and determine the ring stoichiometry of the assembled rotor by mass spectrometry of the intact ring or by structure determination. Studies of this kind indicate that the c-subunit sequence largely determines ring size.
:::
:::

::: exercise Interpreting a sediment profile {level=3}
In a lake sediment, porewater measurements down a core show that O₂ disappears within the top few millimetres, nitrate in the top 1–2 cm, then Fe²⁺ appears, sulfate declines between 5 and 20 cm, and methane rises below about 20 cm. (a) Explain this sequence using the energy yields of [[#ex-acceptors]]. (b) Why does sulfate reduction stop before methanogenesis begins, even though both use CO₂-level electrons from organic matter? (c) What does this tell you about the competition between microbial groups, and what would happen to the profile if sulfate were added?
::: solution
(a) Organic matter is oxidised by microbes using the acceptor that yields most energy. Oxygen yields most and is consumed first near the surface; once it is gone, nitrate reducers outcompete others; then iron and manganese reducers; then sulfate reducers; and only when sulfate is exhausted do methanogens dominate, using CO₂ (and acetate) as acceptors. (b) Sulfate reducers obtain more energy per electron pair from H₂ or acetate than methanogens do, so they can grow at lower H₂ concentrations and keep H₂ below the threshold methanogens need; methanogenesis takes over only below the sulfate zone. (c) The sequence reflects competitive exclusion based on thermodynamics: whichever group can make ATP at the lowest substrate concentration wins. Adding sulfate (as happens when sea water intrudes into freshwater wetlands) would extend the sulfate-reduction zone deeper and suppress methane production — an effect that has been studied in relation to greenhouse-gas emissions from wetlands.
:::
:::
