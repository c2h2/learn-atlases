A cell is a chemical argument that the outside world keeps trying to win. The plasma membrane is what allows the argument to continue: a lipid film barely 5 nm thick, held together by nothing stronger than the reluctance of hydrocarbon tails to meet water, and yet able to keep a 30-fold difference in sodium concentration, a million-fold difference in hydrogen ions and an electrical potential of its own making. Almost every membrane in the body works the same way, and almost every compartment differs from its neighbour only in which proteins are inserted into it.

This lesson deals with the physics of the bilayer, the proteins that move solutes across it, the electrical consequences of moving a charged particle, and the osmotic consequences of moving water. These four ideas account for the resting membrane potential, for the concentration of sodium in plasma, for the action of diuretics and digoxin, for the danger of correcting hyponatraemia too fast, for cystic fibrosis and for the composition of the fluid in an oedematous ankle.

## The bilayer

Phospholipids are amphipathic: a polar head group and two non-polar tails. In water they spontaneously form a bilayer, because that arrangement hides the tails from water while keeping the heads hydrated. No enzyme and no energy input is required — the structure is thermodynamically inevitable, which is why membranes seal themselves when punctured.

::: definition Fluid mosaic membrane {#def-membrane}
The **plasma membrane** is a two-dimensional lipid solution: a phospholipid bilayer, 4–5 nm thick, in which cholesterol and membrane proteins float laterally. It is freely permeable to water and small non-polar molecules, effectively impermeable to ions and to polar molecules larger than about 100 Da, and its properties are set by the proteins it contains.
:::

Two features of the lipid phase matter clinically. First, **fluidity** depends on temperature and on lipid composition: unsaturated tails and short chains increase fluidity, cholesterol buffers it — restraining movement in a hot, fluid membrane and preventing tight packing in a cold one. Bacterial and mammalian membranes alike are damaged by extremes of temperature, and the ability of some organisms to alter their lipid composition with temperature is the molecular basis of *homeoviscous adaptation*. Second, the two leaflets are **asymmetric**: glycolipids and phosphatidylcholine predominate outside, phosphatidylethanolamine and phosphatidylserine inside, maintained by flippases and scramblases. Exposure of phosphatidylserine on the outer leaflet is not a curiosity: it is a procoagulant surface for platelets and the "eat me" signal that lets macrophages find senescent red cells and apoptotic bodies.

Proteins occupy perhaps half the membrane mass, more in mitochondria. They are of two kinds: **integral** proteins, with hydrophobic transmembrane segments (usually 20–25 residues as an α-helix) that sit in the lipid, and **peripheral** proteins attached to the inner face by protein–protein bonds — spectrin and ankyrin in the red cell, for instance, whose defects are described in [[#ex-spherocytosis]].

## Simple diffusion through membrane

Small non-polar molecules cross the lipid by simple diffusion, at a rate described by Fick's law. For a membrane of area $A$ and thickness $\delta$, with solute concentrations $C_1$ and $C_2$ on either side,

$$
J = \frac{\dd}{\dd t}\text{(amount)} = \frac{D\,K\,A}{\delta}\left(C_{1} - C_{2}\right) = P A\left(C_{1} - C_{2}\right),
$$ {#eq-fick}

where $D$ is the diffusion coefficient in the membrane, $K$ the oil–water partition coefficient and $P = DK/\delta$ the **permeability coefficient**. Because $K$ rises steeply with lipid solubility, lipid-soluble substances cross in preference to water-soluble ones of the same size.

| Substance | Relative permeability | Reason |
|---|---|---|
| O₂, CO₂, N₂ | very high | small and non-polar |
| Ethanol, urea | moderate | small, uncharged, partly lipid-soluble |
| Water | moderate despite polarity | very small; also crosses aquaporins |
| Glucose, amino acids | negligible | large and polar — carriers required |
| Na⁺, K⁺, Cl⁻, Ca²⁺ | essentially nil | hydrated ions cannot enter the lipid |
| Proteins, polysaccharides | nil | macromolecules |

The clinical consequences are direct. General anaesthetics, diazepam, alcohol and most drugs given by mouth are lipid-soluble for this reason; polar drugs such as neuromuscular blockers and aminoglycosides do not cross cell membranes at all and stay largely in extracellular fluid, which fixes their volume of distribution and their dosing weight (see [[pharmacology/absorption-distribution]]).

## Channels and carriers: mediated transport

Anything that cannot dissolve in lipid must be carried. Transport proteins fall into two families with entirely different kinetics.

**Channels** are aqueous pores, formed by a ring of subunits, that allow ions to pass down their electrochemical gradient at up to $10^{8}$ ions per second. They are selective (a K⁺ channel excludes Na⁺ by roughly 10,000-fold, using a selectivity filter whose carbonyl oxygens replace the hydration shell of potassium exactly) and they are **gated**: opened and closed by voltage (the cardiac Na⁺ channel), by ligands (the nicotinic acetylcholine receptor), by stretch, or by second messengers. Channel gating is not all-or-none; each gate flickers with a probability that depends on what it senses, and the membrane conductance is the summed behaviour of many such gates.

**Carriers** (transporters, pumps) bind the solute, change shape and release it on the other side. They are slower ($10^{2}$–$10^{4}$ molecules per second), highly specific, and — crucially — they **saturate**, so their rate follows Michaelis–Menten kinetics:

$$
J = J_{\max}\,\frac{C}{K_{t} + C},
$$ {#eq-carrier}

where $J_{\max}$ reflects the number of transporters (older texts write $T_{\max}$) and $K_t$ is the concentration at half-maximal rate.

::: definition Mediated transport {#def-mediated}
**Mediated transport** is transmembrane movement through a specific protein. It shows (i) selectivity, (ii) **saturation** with a maximum rate $J_{\max}$, and (iii) competition between related substrates. **Facilitated diffusion** is mediated and passive; **active transport** is mediated and consumes energy, either directly (primary active transport, e.g. Na⁺/K⁺-ATPase) or by borrowing an existing gradient (secondary active transport, e.g. Na⁺–glucose cotransport).
:::

::: widget plot
f: Jm*x/(Kt+x)
x: 0, 400
y: 0, 420
sliders: Jm=400:50:400:10; Kt=80:5:200:5
labels: J
caption: Saturation of a carrier-mediated flux (Equation [[#eq-carrier]]), with concentration $x$ on the horizontal axis and flux $J$ on the vertical. Below about $K_t/3$ the rate is almost proportional to concentration and looks like diffusion; near $J_{\max}$ adding more substrate achieves nothing. This is why the glucose excretion threshold is a *threshold* and not a linear overflow, and why a transporter defect can be silent at low loads.
:::

Saturation is a diagnostic gift. Glucose is reabsorbed from the renal tubule by sodium–glucose cotransporters until every transporter is busy; plasma glucose above roughly 11 mmol/L then appears in urine, and a similar $T_m$ limits secretion in the proximal tubule of para-aminohippurate, creatinine (slightly) and many drugs.

## Moving ions creates electricity

Separating charge across a membrane costs very little: an excess of one ion species in $10^{18}$ on one side is enough to make tens of millivolts. That is why cells can be batteries without measurably changing their chemistry, and why two ions with identical concentrations can behave completely differently.

For a single permeant ion the equilibrium potential — the voltage at which the electrical and chemical driving forces exactly balance — is given by the Nernst equation.

::: theorem Nernst equation {#thm-nernst}
At temperature $T$, the equilibrium potential for an ion of valence $z$ is
$$
E_{\text{ion}} = \frac{RT}{zF}\ln\frac{[\text{ion}]_{\text{out}}}{[\text{ion}]_{\text{in}}},
$$
which at 37 °C becomes $E_{\text{ion}} = \dfrac{61.5}{z}\log_{10}\dfrac{[\text{ion}]_{\text{out}}}{[\text{ion}]_{\text{in}}}$ mV.
:::

::: proof
The chemical potential difference for moving one mole of ion inward is $RT\ln([\text{in}]/[\text{out}])$. The electrical work of moving one mole of charge $zF$ through a potential difference $V_{\text{in}} - V_{\text{out}}$ is $zF V$. At equilibrium the sum is zero:
$$
RT\ln\frac{[\text{in}]}{[\text{out}]} + zFV = 0
\quad\Longrightarrow\quad
V = \frac{RT}{zF}\ln\frac{[\text{out}]}{[\text{in}]}. \qquad\blacksquare
$$
:::

At 37 °C, $E_K \approx -97$ mV, $E_{Na} \approx +66$ mV and $E_{Cl} \approx -89$ mV (using extracellular K⁺ 4, Na⁺ 140, Cl⁻ 110 and intracellular K⁺ 150, Na⁺ 12, Cl⁻ 4 mmol/L). The **resting membrane potential** of a nerve or muscle fibre, about −70 to −90 mV, therefore sits near $E_K$ because at rest the membrane is far more permeable to K⁺ than to Na⁺. The quantitative version is the Goldman–Hodgkin–Katz equation, which weights each ion by its permeability; its most useful consequence is that the resting potential always moves *towards* the equilibrium potential of whichever ion is most permeable at the time.

::: example Why hyperkalaemia stops the heart {#ex-k}
A patient with acute kidney injury has a plasma K⁺ of 8 mmol/L; the ECG shows broad QRS complexes and the patient is weak, progressing to flaccid paralysis. Explain.
::: solution
$E_K = 61.5\log_{10}(8/150) = 61.5 \times (-1.273) \approx -78$ mV, against roughly $-97$ mV at a plasma K⁺ of 4. The resting potential therefore *depolarises* by about 19 mV. Modest depolarisation makes voltage-gated Na⁺ channels open more easily, so early hyperkalaemia increases excitability; but sustained depolarisation keeps a large fraction of Na⁺ channels in their inactivated state, from which they can only recover by repolarisation. Conduction then slows in heart and skeletal muscle — broad QRS, sine wave, paralysis — while membranes that rely on ligand-gated channels fare better. The lesson generalises: the clinical picture of a potassium disorder is a picture of membrane *excitability*, and it is the change in $E_K$, not the absolute value, that matters.
:::
:::

::: warning A sodium gradient is not a concentration difference
Sodium is more concentrated outside, so it diffuses in when a channel opens — but the inside-negative potential *also* pulls Na⁺ inward, so its electrochemical gradient is much steeper than its concentration gradient alone. Potassium is the opposite: its concentration gradient drives it out and its electrical gradient holds it in, and the two nearly cancel. Assuming the electrical term is negligible, or forgetting the sign of $z$, gives equilibrium potentials the wrong way round; check every Nernst calculation against intuition about which way the ion wants to go.
:::

## The sodium pump and secondary active transport

The Na⁺/K⁺-ATPase moves three sodium ions out and two potassium ions in for each ATP hydrolysed. It is **electrogenic** (net export of one positive charge), it maintains the gradients on which most other transporters depend, and it consumes roughly a quarter of the body's resting ATP — much more in kidney, brain and heart. It is the target of cardiac glycosides, which inhibit it in myocardial cell membranes, raising intracellular sodium, reducing the extrusion of calcium by the Na⁺/Ca²⁺ exchanger and so increasing contractile force.

::: theorem The sodium gradient as a currency {#thm-na}
Secondary active transporters use the energy stored in the sodium gradient — set up by the sodium pump — to move a second solute against its own gradient. The direction of sodium movement determines whether the two move together (symport) or in opposite directions (antiport).
:::

::: proof
Coupling is thermodynamic, not mechanical. A transporter that binds Na⁺ and a substrate S has conformations whose relative stability depends on which sites are occupied. If the sum of the free-energy changes, $n\Delta\mu_{Na} + \Delta\mu_{S}$, is negative, the coupled cycle runs in the direction that moves S uphill while Na⁺ falls downhill; if the sum is positive it runs backwards or not at all. Because $\Delta\mu_{Na}$ contains both the concentration term and the membrane potential, the same transporter can reverse when the potential changes. Two consequences follow: the maximum gradient achievable for S is set by the sodium gradient (about 13 kJ/mol under physiological conditions, equivalent to roughly a 200-fold concentration gradient for an uncharged solute, so cotransport of two or three sodium ions can drive accumulation of $10^{4}$–$10^{6}$-fold), and inhibiting the sodium pump eventually collapses substrate transport even though the substrate transporter is normal.
:::

Examples worth knowing: **SGLT2** and **SGLT1** reabsorb renal and intestinal glucose against its gradient (SGLT2 is inhibited by the gliflozins, which produce glycosuria); the **Na⁺/H⁺ exchanger NHE3** reabsorbs sodium and excretes hydrogen; the **Na⁺/K⁺/2Cl⁻ cotransporter NKCC2** generates the medullary gradient and is blocked by loop diuretics; the **Cl⁻/HCO₃⁻ exchanger** of the red cell carries carbon dioxide as bicarbonate; the basolateral **Na⁺/K⁺-ATPase** of virtually every epithelium is what makes transepithelial transport possible at all.

::: example Two patients, one channel {#ex-cftr}
Patient A, aged 6, has failure to thrive, steatorrhoea and repeated chest infections; sweat chloride is 95 mmol/L. Patient B, aged 30, has profuse watery diarrhoea after travel, stool sodium 90 mmol/L and chloride 100 mmol/L, and the diarrhoea continues during a 24-hour fast. Both involve the CFTR chloride channel. Reconcile them.
::: solution
CFTR is a cAMP-regulated chloride channel in the apical membrane of epithelia, which also regulates other channels and is the route by which chloride (and so sodium bicarbonate) is secreted. In A the channel is absent or destroyed — most often by the ΔF508 mutation, which produces a misfolded protein retained and degraded in the endoplasmic reticulum — so epithelia cannot secrete chloride, cannot hydrate their surface, and mucus and secretions inspissate: the disease of the duct, in pancreas, lung and sweat gland, where failure to reabsorb chloride from sweat makes it salty. In B the channel is intact but pathologically over-active: cholera toxin locks Gsα in its active state, adenylyl cyclase runs continuously, cAMP rises and CFTR pours chloride into the lumen, with sodium and water following, and the enterocyte's normal braking mechanism is overridden. Loss-of-function and excessive activation of the *same* channel produce obstructive and secretory disease respectively — which is why a drug that corrects folding (a chaperone-type corrector) helps A and a channel inhibitor would help B.
:::
:::

## Water, osmolality and tonicity

Water crosses lipid slowly and aquaporins fast, and it always moves towards the higher concentration of osmotically active particles. Two quantities describe solutions and are constantly confused.

::: definition Osmolarity, osmolality and tonicity {#def-tonicity}
**Osmolality** (mOsm/kg water) counts dissolved particles; measured in the laboratory. **Osmolarity** (mOsm/L) is the same idea per litre of solution, and is what a formula gives: for clinical purposes plasma osmolality ≈ $2[\text{Na}^+] + [\text{glucose}] + [\text{urea}]$ in mmol/L. **Tonicity** (effective osmolality) counts only the particles that *cannot cross the cell membrane* and therefore actually move water. Urea and ethanol are osmotically active but, given time, equilibrate across cell membranes, so a urea solution is hyperosmolar but not hypertonic.
:::

Plasma osmolality is 285–295 mOsm/kg. A gap of more than about 10 mOsm/kg between measured and calculated osmolality means that an unmeasured osmole is present — ethanol, mannitol, or the toxic alcohols and their metabolites in poisoning — and the osmolar gap is used in that way in [[emergency-critical-care/poisoning]].

Because water follows sodium, the plasma sodium concentration is a measure of water balance, not of salt balance: hypernatraemia nearly always means a water deficit, hyponatraemia an excess of water relative to sodium. The clinical corollary concerns infused fluids. Sodium does not enter cells readily, so 0.9% saline (154 mmol/L of each ion, ~308 mOsm/L) stays in extracellular fluid and expands it; 5% dextrose is isotonic in the bag but the glucose is metabolised, leaving free water that distributes across total body water — so one litre of dextrose raises neither plasma volume nor much of anything else, and one litre of saline given to a hyponatraemic patient usually worsens the hyponatraemia if the urine is inappropriately concentrated.

::: example Reading a sodium {#ex-na}
A 78-year-old on bendroflumethiazide after a chest infection has plasma sodium 118 mmol/L, glucose 6 mmol/L, urea 4 mmol/L, measured osmolality 246 mOsm/kg, urine osmolality 520 mOsm/kg and urine sodium 60 mmol/L. Her blood pressure is normal and she is not oedematous. Calculate the osmolar gap and classify the state.
::: solution
Calculated osmolality $= 2(118) + 6 + 4 = 246$ mOsm/kg, so the gap is zero: this is a true hypo-osmolar (hypotonic) hyponatraemia, not pseudohyponatraemia from lipids or protein and not a translocational hyponatraemia from hyperglycaemia. She is euvolaemic, with urine that should have been dilute (< 100 mOsm/kg) once serum osmolality was low but is concentrated, and a urine sodium that is high; the pattern is impaired water excretion: the thiazide is the likely cause, since thiazides block dilution of urine in the distal tubule without disturbing the medullary gradient needed to concentrate it, and syndrome of inappropriate antidiuresis from the chest infection contributes. Two rules follow from membrane physiology: correct slowly, because brain cells have exported osmolytes to survive the swelling and cannot regrow them as fast as water will leave them, and stop the offending drug.
:::
:::

::: quiz
One litre of 0.9% sodium chloride is infused into a patient with a total body water of 42 L and an extracellular fluid volume of 14 L. What happens, approximately?
- [ ] It distributes across 42 L, raising plasma sodium slightly.
- [x] It stays in the extracellular compartment, expanding it by about 1 L.
- [ ] It enters cells because it is isotonic.
- [ ] It is excreted unchanged within minutes and changes nothing.
::: solution
Sodium is effectively impermeant, and the pump keeps it out, so an isotonic saline infusion adds isotonic fluid to extracellular fluid: about 1 L is retained in that 14 L compartment for as long as sodium balance is positive, and plasma sodium is unchanged. In a patient who can excrete a sodium load, most of it is eventually lost with water; in heart, liver or renal disease, it appears as oedema or ascites — Starling forces are discussed in [[physiology/homeostasis-body-fluids]].
:::
:::

## Membranes do the body's work

Epithelia are sheets of polarised cells in which apical and basolateral membranes carry *different* transporters, and the sodium pump in the basolateral membrane drives everything. Vectorial transport — absorption one way, secretion the other — is simply the consequence of that asymmetry, and the paracellular route through tight junctions may complete the circuit. Where the epithelium is "tight" (collecting duct, gut in the colon) little can leak back and large gradients are generated; where it is "leaky" (proximal tubule, jejunum) transport is isosmotic and bulk.

Two further specialisations depend on membrane transport machinery. In **muscle and nerve**, voltage-gated channels in the surface membrane and, in muscle, in the transverse tubules, allow an action potential to reach the contractile apparatus within a millisecond. In **acinar and duct cells**, regulated chloride or potassium secretion draws water osmotically and produces saliva, pancreatic juice and bile — and it is this machinery, hijacked by cholera toxin, that makes secretory diarrhoea so voluminous.

::: example A membrane skeleton, not a metabolic defect {#ex-spherocytosis}
A 19-year-old has jaundice, splenomegaly, haemoglobin 92 g/L, reticulocytes 12%, raised MCHC, negative Coombs test and spherocytes on the blood film; her mother had a cholecystectomy at 24. Explain the pathophysiology and why splenectomy helps.
::: solution
This is hereditary spherocytosis, usually autosomal dominant, caused by deficiency of a membrane-skeleton protein — ankyrin, spectrin, band 3 or protein 4.2. Loss of vertical links between the lipid bilayer and the spectrin network allows blebs of membrane to be lost: the surface area falls while the volume is unchanged, so the cell becomes a sphere with a low surface-to-volume ratio. Spherocytes cannot deform through the narrow slits of the splenic cords, they are trapped in the hypoxic, glucose-poor splenic environment and die early — extravascular haemolysis, with unconjugated hyperbilirubinaemia and pigment stones. The raised MCHC is the diagnostic clue (relative cellular dehydration), and the osmotic fragility test or eosin-5-maleimide binding flow cytometry confirm the membrane defect. Removing the spleen removes the site of destruction, not the defect: the film still shows spherocytes, but they survive. Hence the treatment is symptomatic and lifelong vaccination against encapsulated organisms is required.
:::
:::

::: history
The semipermeable behaviour of living tissue was demonstrated by Lazzaro Spallanzani in the 1760s using bladder and gut in dilute solutions. In 1855 Adolf Fick, then in his twenties, wrote down the law of diffusion that still bears his name; Jacobus van 't Hoff showed in 1877 that dilute solutes exert osmotic pressure according to the gas laws, work that earned him the first Nobel Prize in chemistry. Walther Nernst derived his equation in 1888, and Julius Bernstein proposed in 1902 that the resting potential is a diffusion potential set by ion permeabilities. David Goldman gave the constant-field equation in 1943; Alan Hodgkin and Andrew Huxley described the action potential quantitatively in 1952 using the squid giant axon, and Erwin Neher and Bert Sakmann recorded single channels with the patch clamp in 1976. The lipid bilayer itself was proposed by Gorter and Grendel in 1925, drawn as a protein–lipid–protein sandwich by Davson and Danielli in 1935, and replaced by Singer and Nicolson's fluid mosaic model in 1972. Roderick MacKinnon's crystal structure of a potassium channel, published in 1998, finally explained the selectivity filter in atomic detail; the cystic fibrosis gene encoding CFTR had been cloned eleven years earlier by John Riordan, Lap-Chee Tsui and Francis Collins.
:::

## Where this leads

The membrane potentials described here are the basis of excitable tissue in [[physiology/membrane-potentials]] and of the ECG in [[cardiovascular/electrophysiology-ecg]]. Enzyme saturation and carrier kinetics are treated in [[cell-biochemistry/proteins-enzymes]]; body fluid compartments, Starling forces and oedema in [[physiology/homeostasis-body-fluids]] and [[pathology/haemodynamics]]; the pharmacology of channels and pumps in [[pharmacology/autonomic-drugs]].

::: summary
- The bilayer is a self-sealing lipid solution: permeable to gases and lipid-soluble molecules, impermeable to ions and polar solutes, which need channels or carriers.
- Channels are fast, gated and selective; carriers are slow, specific and saturable, with a $J_{\max}$ that creates thresholds in the kidney and limits drug secretion.
- Primary active transport (Na⁺/K⁺-ATPase, H⁺-ATPase, Ca²⁺-ATPase) spends ATP to build gradients; secondary transport spends the gradients to move other solutes.
- Ions are moved by electrochemical gradients: $E_{\text{ion}} = 61.5/z \log_{10}([\text{out}]/[\text{in}])$ at 37 °C; the resting potential is closest to $E_K$, and disorders of potassium act by changing it.
- Tonicity, not osmolarity, determines where water goes; urea and ethanol are osmotically active but ineffective once they equilibrate, and infused fluid distributes according to the impermeant solute it contains.
- Epithelial transport follows from the polarised distribution of transporters; loss of CFTR obstructs secretions, over-activation of CFTR causes secretory diarrhoea.
- Membrane diseases include channelopathies and defects of the membrane skeleton such as hereditary spherocytosis.
:::

## Exercises

::: exercise Permeability and structure {level=1}
Rank the following for passage across a pure lipid bilayer: oxygen, glucose, sodium, ethanol, inulin (a 5 kDa polysaccharide). Explain the two or three principles behind the ranking.
::: solution
Oxygen > ethanol > glucose > sodium > inulin. The principles are size (small crosses faster), charge (ions are essentially excluded however small) and lipid solubility (partition coefficient, which favours ethanol over glucose). Macromolecules such as inulin cross only through pores or by vesicular transport, which is why inulin is used as a marker of extracellular space and glomerular filtration.
:::
:::

::: exercise Saturation in the clinic {level=1}
Glucose appears in the urine of a pregnant woman with a plasma glucose of 7 mmol/L although she is not diabetic. Give the transport explanation.
::: solution
Filtered glucose load $=$ GFR $\times$ plasma glucose. Pregnancy raises GFR by around 50%, and the filtered load can exceed the tubular $T_m$ for glucose even at a normal plasma concentration: transporters are saturated, so the renal threshold falls and glycosuria follows. The lesson is that a threshold depends on both a $T_m$ and a filtration rate, so glycosuria is not by itself evidence of diabetes — whereas a raised plasma glucose with glycosuria is expected.
:::
:::

::: exercise Nernst {level=1 check="round(61.5*log10(8/150))"}
Calculate the equilibrium potential for potassium at 37 °C when extracellular K⁺ is 8 mmol/L and intracellular K⁺ is 150 mmol/L. Give your answer in mV to the nearest whole number.
::: solution
$E_K = 61.5\log_{10}(8/150) = 61.5 \times \log_{10}(0.0533) = 61.5 \times (-1.273) \approx -78$ mV.
:::
:::

::: exercise Which transport step? {level=2}
For each, name the transporter or channel and say whether it is primary active transport, secondary active transport, facilitated diffusion or a channel: (a) apical entry of glucose in the proximal tubule; (b) basolateral exit of glucose from the same cell; (c) reabsorption of filtered sodium in the collecting duct under aldosterone control; (d) extrusion of calcium from a cardiomyocyte after contraction; (e) upstroke of the cardiac action potential.
::: solution
(a) SGLT2, secondary active transport (Na⁺ symport). (b) GLUT2 (GLUT1 in some species/segments), facilitated diffusion down the concentration gradient created by (a). (c) ENaC, an epithelial sodium channel; aldosterone increases its number and open probability, and the basolateral Na⁺/K⁺-ATPase is primary active transport. (d) Mostly the Na⁺/Ca²⁺ exchanger (secondary active transport, driven by sodium) with some sarcolemmal Ca²⁺-ATPase. (e) Voltage-gated Na⁺ channel. Note how many steps one epithelium contains, and that a defect in the *basolateral* pump limits all of them.
:::
:::

::: exercise Osmolar gap {level=2 check="42"}
A patient is found unconscious. Sodium 140 mmol/L, glucose 8 mmol/L, urea 5 mmol/L, measured plasma osmolality 335 mOsm/kg. Calculate the osmolar gap and name the commonest causes of a gap this size.
::: solution
Calculated $= 2(140) + 8 + 5 = 293$ mOsm/kg, so the gap is $335 - 293 = 42$ mOsm/kg. A gap of this magnitude means a large amount of an unmeasured small osmole — classically ethanol, and clinically the dangerous causes are methanol, ethylene glycol, isopropanol, propylene glycol (from infusions), mannitol or severe ketoacidosis with acetone. Check the anion gap and osmolar gap together and treat as poisoning if the history is unclear.
:::
:::

::: exercise Free water {level=2 check="14"}
Estimate the fall in plasma sodium, in mmol/L, if 4 L of electrolyte-free water were retained by a patient whose total body water is 36 L and plasma sodium 140 mmol/L. (Assume the sodium content is unchanged and that water equilibrates throughout total body water.)
::: solution
New sodium $= 140 \times 36/40 = 126$ mmol/L, a fall of 14 mmol/L — about 3.5 mmol/L per litre of retained water, and in practice rather more, because retained water also triggers natriuresis. The arithmetic explains why a hyponatraemic patient given large volumes of hypotonic fluid can drop their sodium dangerously fast, and why acute falls cause headache, seizures and (in the un-adapted brain) herniation.
:::
:::

::: exercise Tonicity in the ward {level=3}
Two patients both have plasma sodium 128 mmol/L. In A, measured osmolality is 288 mOsm/kg, calculated 267 mOsm/kg, and triglycerides 55 mmol/L. In B, measured osmolality is 305 mOsm/kg, glucose 42 mmol/L, urea 5 mmol/L, pH normal. Which patient has hypotonic hyponatraemia, and what is the management implication?
::: solution
Neither does — or rather, only A does, and A is an artefact. In A the raised lipids displace water in the sample, so the sodium measured per litre of *plasma* is falsely low while sodium per litre of plasma water (and the tonicity the brain experiences) is normal: pseudohyponatraemia, seen in severe hyperlipidaemia and paraproteinaemia, and recognised because the measured osmolality is normal while the sodium-derived calculation is low. Direct ion-selective potentiometry or a blood-gas analyser reports the correct value. In B, glucose is an effective osmole and draws water out of cells, diluting sodium: the corrected sodium rises by about 1.6–2.4 mmol/L for every 5.6 mmol/L of glucose above normal, so the true sodium is roughly $128 + 16 \approx 144$ mmol/L and the patient is hyperosmolar and probably dehydrated. Treating either as hyponatraemia with hypertonic saline would be harmful; the correct treatments are respectively reassurance and insulin plus fluids.
:::
:::

::: exercise A pump with two faces {level=3}
A patient on digoxin for atrial fibrillation is admitted with vomiting and a potassium of 3.0 mmol/L after a thiazide; the rhythm is now a slow ventricular rhythm with intermittent junctional tachycardia. Explain the interaction in terms of membrane transport, and say why hypokalaemia potentiates digoxin.
::: solution
Digoxin inhibits the Na⁺/K⁺-ATPase. In myocardium that raises intracellular Na⁺, reduces the driving force for the Na⁺/Ca²⁺ exchanger, leaves more calcium available to the sarcoplasmic reticulum and increases contractility — the therapeutic effect. Toxicity is largely electrical: raised intracellular calcium activates the sodium–calcium exchanger's inward current (transient inward current, depolarising), producing delayed afterdepolarisations and ectopic rhythms, while increased vagal and direct effects slow the AV node — hence the combination of slow atrial fibrillation with an accelerated junctional rhythm, a classic digoxin-toxic rhythm. Hypokalaemia matters because potassium and digoxin compete for the same site on the extracellular face of the pump: with less potassium to displace it, more drug binds at any given concentration. Diarrhoea and vomiting compound the problem with magnesium loss, and renal impairment raises drug levels because digoxin is renally excreted. Management is to stop the drug, correct potassium and magnesium carefully, and give specific antibody fragments for life-threatening toxicity.
:::
:::

::: exercise Epithelial logic {level=3}
Explain, using the distribution of transporters, why (a) aldosterone causes sodium retention and potassium loss; (b) amiloride reverses the hypertension of Liddle syndrome but spironolactone does not.
::: solution
Aldosterone acts on the principal cell of the collecting duct, entering through the basolateral membrane and acting on cytoplasmic (nuclear) receptors to increase transcription of SGK1 and ENaC. More active apical sodium channels admit more sodium, which is extruded by the basolateral sodium pump; the resulting lumen-negative potential difference drives potassium secretion through ROMK channels and hydrogen ion secretion, so sodium is retained with potassium wasting. In Liddle syndrome a mutation in the ENaC γ-subunit prevents its internalisation and degradation, so excessively many channels sit in the apical membrane *independently of aldosterone*; sodium retention and hypertension follow with suppressed renin and aldosterone. Spironolactone acts on a receptor whose target pathway is bypassed, and therefore does nothing; amiloride blocks the channel itself and is specific therapy. The pair shows the value of transporter-level reasoning: the same final pathway can be reached by a drug acting on receptor, channel or pump, and only one of them works.
:::
:::
