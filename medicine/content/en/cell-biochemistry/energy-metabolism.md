The human body contains perhaps 50 grams of ATP at any moment, and hydrolyses roughly its own weight in the molecule every day. That single fact organises the whole of metabolism: ATP is not a store, it is a currency, kept at a high concentration by a rate of synthesis that would be startling if it were not ordinary. A resting person resynthesises the entire pool about a thousand times a day, using food as the deposit and muscle contraction, ion pumping and biosynthesis as the spending.

This lesson follows the flow from glucose to carbon dioxide: glycolysis in the cytosol, the citric acid cycle in the matrix, and oxidative phosphorylation on the inner membrane — together with the two routes that feed in and out of it, gluconeogenesis and glycogen. The clinical diseases of these pathways are among the most elegant in medicine, because each one unmasks exactly the step that is missing.

## Money: ATP, phosphocreatine and free energy

::: definition The energy currencies {#def-atp}
**ATP** is the intermediate between energy-releasing and energy-using reactions. Its hydrolysis has $\Delta G^{\circ\prime} \approx -30.5\ \text{kJ}\,\text{mol}^{-1}$ under standard conditions but about $-55\ \text{kJ}\,\text{mol}^{-1}$ inside a cell, where the ATP/ADP ratio is kept far from equilibrium — a small, highly charged molecule held in a state of readiness. **Phosphocreatine** in muscle and nerve buffers the ATP concentration for some seconds via creatine kinase; **GTP** is equivalent, interconverted by nucleoside diphosphate kinase.
:::

Energy from food is released in three ways: complete oxidation of carbohydrate and fat to CO₂ and water, anaerobic glycolysis to lactate, and the oxidation of amino acids. The fuel value per gram is about 17 kJ (4 kcal) for carbohydrate and protein and 38 kJ (9 kcal) for fat; the **respiratory quotient** (CO₂ produced ÷ O₂ consumed) identifies what is being burnt, being 1.0 for carbohydrate, about 0.7 for fat and 0.8 for protein, so a mixed diet at rest gives about 0.82. Because ATP is spent whether or not oxygen is available, what changes with oxygen is the *yield*, not the need.

## Glycolysis: ten steps, two rules

Glycolysis converts glucose to pyruvate in the cytosol, producing a net of 2 ATP and 2 NADH per glucose, and it needs no oxygen. It is worth knowing the shape rather than every enzyme name:

- **Investment (steps 1–5).** Glucose is phosphorylated (hexokinase in most tissues, glucokinase in liver and β-cells), isomerised, phosphorylated again, and split into two trioses. The two phosphorylations spend 2 ATP and, more importantly, trap the sugar inside the cell — phosphorylated intermediates cannot cross the plasma membrane.
- **Payoff (steps 6–10).** Each triose is oxidised with the capture of NADH, and substrate-level phosphorylation yields 4 ATP; the net is 2 ATP plus 2 pyruvate.

Three steps are effectively irreversible and therefore regulatory: hexokinase/glucokinase, **phosphofructokinase-1 (PFK-1)** and pyruvate kinase.

PFK-1 is the rate-limiting enzyme and the main control point. It is inhibited by ATP and citrate (signals that the cell is energised and has ample substrate for the cycle) and activated by AMP and, most powerfully, by **fructose-2,6-bisphosphate**, made by the kinase half of a bifunctional enzyme that insulin phosphorylates on and glucagon dephosphorylates off. The liver therefore does not compete with itself: a single phosphorylation event on one protein lowers fructose-2,6-bisphosphate, slowing glycolysis and de-repressing fructose-1,6-bisphosphatase, so glucose production rises.

::: widget plot
f: x^n/(K^n+x^n)
x: 0, 3
y: 0, 1.05
sliders: n=2.8:1:4:0.1; K=1:0.2:2:0.1
labels: \text{relative PFK-1 activity}
caption: Phosphofructokinase-1 responds sigmoidally to its activator fructose-2,6-bisphosphate (plotted as relative activity against activator concentration, in arbitrary units). Raise the Hill coefficient $n$ and the curve becomes more switch-like: a small change in the second messenger produces a large change in flux. This is how one phosphorylation event on the bifunctional PFK-2 enzyme can move the liver from glucose disposal to glucose output, and why sigmoid control, not hyperbolic control, is what hormones act on.
:::

Hexokinase and glucokinase are a study in design. Hexokinase has a low $K_m$, is inhibited by glucose-6-phosphate, and serves ordinary cells. **Glucokinase** has a high $K_m$, is not inhibited by its product, and is induced by insulin — so hepatic glucose uptake rises with the blood glucose instead of being switched off by it. It is the glucose sensor of the β-cell too, which is why a *GCK* loss-of-function mutation causes mild stable fasting hyperglycaemia (hepatic maturity-onset diabetes of the young, MODY 2), a complete loss causes permanent neonatal diabetes, and a gain-of-function mutation causes congenital hyperinsulinism.

::: theorem The red cell's predicament {#thm-rbc}
The mature erythrocyte has no mitochondria and no ribosomes: it derives all its ATP from glycolysis, cannot synthesise anything, and depends on the pentose phosphate pathway for NADPH. Its fate is therefore set by oxygen-independent ATP production, and by the antioxidant defence described in [[cell-biochemistry/proteins-enzymes]].
:::

::: proof
During maturation the red cell expels its nucleus and destroys its organelles, making room for haemoglobin. With no mitochondria, oxidative phosphorylation is impossible, so the ATP that runs the cation pumps and maintains deformability comes only from glycolysis — much of it spent on the Na⁺/K⁺-ATPase that keeps sodium out against a steep gradient. With no ribosomes, damaged proteins cannot be replaced, which sets the ~120-day lifespan and explains why enzyme defects that are tolerable elsewhere cause haemolysis here: pyruvate kinase deficiency and glucose-6-phosphate dehydrogenase deficiency are both chronic haemolytic anaemias with normal function in most other tissues. The red cell also runs the 2,3-bisphosphoglycerate shunt (bypassing the phosphoglycerate kinase step, so no ATP is gained), which is how it manufactures the molecule that lowers haemoglobin's oxygen affinity: the same cell that cannot make ATP oxidatively is the one that decides how tightly oxygen is held.
:::

**The fate of pyruvate** is the pivot of the whole subject. With oxygen available and the mitochondrion working, pyruvate dehydrogenase oxidatively decarboxylates it to acetyl-CoA. When the respiratory chain cannot run — hypoxia, shock, cyanide, thiamine deficiency — lactate dehydrogenase regenerates NAD⁺ so that glycolysis can continue, and lactate accumulates. Lactate is not waste: heart and resting muscle prefer it as fuel, exercising muscle exports it, and the liver returns it to glucose by the **Cori cycle**, at a cost of ATP to the liver and benefit to the muscle.

## From acetyl-CoA to NADH: the citric acid cycle

Acetyl-CoA cannot be turned back into glucose in humans, because the two decarboxylations of the cycle are irreversible and there is no route from acetyl units to a four-carbon intermediate in net amount. What it can do is be burnt.

One turn of the cycle oxidises one acetyl group to two CO₂ and yields 3 NADH, 1 FADH₂ and 1 GTP, regenerating oxaloacetate. Three features deserve emphasis beyond the diagram:

- **The cycle is regulated where the substrate arrives.** Pyruvate dehydrogenase is switched off by phosphorylation, which its own kinase promotes when acetyl-CoA and NADH are high and ATP is plentiful; insulin, calcium and prolonged exercise promote the phosphatase that switches it on. Isocitrate dehydrogenase and α-ketoglutarate dehydrogenase are stimulated by ADP and Ca²⁺.
- **It is the hub of biosynthesis, not just of oxidation.** Citrate leaves for fatty-acid and cholesterol synthesis; α-ketoglutarate for amino acids and glutathione; succinyl-CoA for haem; oxaloacetate for gluconeogenesis and aspartate. Removing intermediates for biosynthesis must be replaced by **anaplerotic** reactions, chiefly pyruvate carboxylase (biotin-dependent).
- **Fat is burnt in the presence of carbohydrate.** Oxaloacetate is required to condense with acetyl-CoA; if carbohydrate is scarce and oxaloacetate is drawn off for gluconeogenesis, acetyl-CoA accumulates and is converted to ketone bodies in the liver. That single stoichiometric fact explains ketosis in starvation and diabetic ketoacidosis.

## Oxidative phosphorylation: the proton economy

The reduced coenzymes are reoxidised by the respiratory chain, and their free energy is spent on one thing only: moving protons out of the matrix. Complexes I, III and IV pump; coenzyme Q and cytochrome c carry electrons between them; complex V (ATP synthase) lets protons return and uses the torque of that return to make ATP. Roughly 10 protons are moved per NADH, and about 3–4 protons are needed per ATP made and exported, giving the modern P/O ratios of about **2.5 ATP per NADH and 1.5 per FADH₂** — older texts quote 3 and 2, and the totals of 36–38 ATP per glucose that students memorised from them are too high.

::: example Count the ATP properly {#ex-atp}
Calculate the ATP yield of complete glucose oxidation in a hepatocyte, using P/O ratios of 2.5 and 1.5.
::: solution
Substrate-level phosphorylation: 2 net ATP from glycolysis and 2 GTP from the cycle (one per acetyl-CoA), i.e. 4.
Reduced coenzymes: glycolysis gives 2 cytosolic NADH, which enter the matrix mainly by the malate–aspartate shuttle, so 2 × 2.5 = 5; pyruvate dehydrogenase gives 2 NADH = 5; the cycle gives 6 NADH = 15 and 2 FADH₂ = 3.
Total $= 4 + 5 + 5 + 15 + 3 = 32$ ATP. In skeletal muscle, where cytosolic NADH is reoxidised through the glycerol-3-phosphate shuttle and its electrons reach ubiquinone directly, the two glycolytic NADH yield 1.5 each and the total is 30. Either figure corresponds to roughly 34% of the free energy of glucose combustion captured as phosphate bonds, the rest lost as heat — heat that is not wasted when the point is to stay warm.
:::
:::

::: warning 36 or 38 ATP?
The classic numbers assume P/O ratios of 3 and 2 and are still printed in older books and in some examination answers. They also ignore the cost of moving cytosolic NADH into the mitochondrion, which differs between tissues, and the proton leak that makes the coupling partly "leaky". Quote about 30–32 ATP per glucose, say why the number is a range, and treat the shuttle as the reason muscle and liver differ; if an examination or local protocol uses the older figures, use them and state that you are doing so.
:::

The membrane potential also carries the cell's second great use of the same gradient: thermogenesis. **Uncoupling protein 1** in brown adipose tissue lets protons return without making ATP, so respiration runs and heat is produced — the mechanism of non-shivering thermogenesis in the newborn, and the reason a cold-exposed adult has metabolically active brown fat visible on PET. Artificial uncouplers do the same thing without regulation: 2,4-dinitrophenol was sold as a slimming agent and killed patients with hyperthermia, and salicylate poisoning produces fever, sweat and a mixed respiratory alkalosis with metabolic acidosis partly by this route.

| Agent | Site of action | Consequence |
|---|---|---|
| Rotenone, amytal | Complex I | Blocks NADH oxidation; used experimentally to model Parkinsonism |
| Antimycin A | Complex III | Blocks all electron flow beyond ubiquinol |
| Cyanide, carbon monoxide, azide | Complex IV | Electrons cannot reach O₂; cells asphyxiate with well-oxygenated blood |
| Oligomycin | Complex V | Protons cannot return; respiration stops because the gradient cannot be discharged |
| Uncouplers (2,4-DNP, FAM, UCP1) | Inner membrane | Respiration accelerates, ATP falls, heat is produced |

::: example Blood that is not giving up its oxygen {#ex-cn}
Two people are pulled from a house fire, unconscious, with lactate of 14 mmol/L. One has a carboxyhaemoglobin of 28%; the other has a normal carboxyhaemoglobin, a venous oxygen saturation of 92% and severe lactic acidosis. Explain each.
::: solution
Both have cellular asphyxiation, by different mechanisms and with different tests. Carboxyhaemoglobin reduces the oxygen-carrying capacity of blood and, more insidiously, shifts the oxygen–haemoglobin dissociation curve to the left, so what oxygen is carried is less readily released; the pulse oximeter reads it as oxyhaemoglobin, so a normal saturation is no reassurance, and co-oximetry is required. Cyanide, also present in smoke from burning plastics and wool, binds the ferric iron of cytochrome oxidase and stops oxidative phosphorylation altogether: cells cannot extract oxygen, so venous blood leaves the tissues unusually well oxygenated (high mixed venous saturation, narrow arteriovenous difference) and lactate rises from anaerobic glycolysis and from impaired lactate clearance. Treatment reflects mechanism: 100% oxygen (and hyperbaric oxygen in selected cases) for carbon monoxide, and for cyanide hydroxocobalamin, which binds cyanide to form cyanocobalamin, or the older nitrite/thiosulfate regimen that creates methaemoglobin as a cyanide trap and provides sulfur for rhodanese. A fire victim with unexplained lactate and a normal carboxyhaemoglobin should be treated for cyanide poisoning.
:::
:::

## Gluconeogenesis: the expensive way to make glucose

The brain consumes about 120 g of glucose a day, and red cells and renal medulla consume more; the liver's glycogen holds roughly a day's supply. Between meals and during starvation, glucose must be manufactured from three substrates: **lactate** (Cori cycle), **glycerol** (from adipose triglyceride, and the only part of fat that can become glucose) and **amino acids**, especially alanine and glutamine from muscle protein, whose nitrogen is disposed of by the urea cycle.

Four reactions bypass glycolysis's irreversible steps, and each is a clinical opportunity:

| Bypass | Enzyme | Note |
|---|---|---|
| Pyruvate → oxaloacetate | Pyruvate carboxylase | Mitochondrial, biotin-dependent, absolutely activated by acetyl-CoA |
| Oxaloacetate → phosphoenolpyruvate | PEP carboxykinase | Exits the mitochondrion as malate or aspartate |
| Fructose-1,6-bisphosphate → fructose-6-phosphate | Fructose-1,6-bisphosphatase | Inhibited by fructose-2,6-bisphosphate |
| Glucose-6-phosphate → glucose | Glucose-6-phosphatase | Liver, kidney and gut only — the reason muscle cannot export glucose |

The cost is 4 ATP and 2 GTP per glucose, which is why the fast-fed cycle of simultaneous glycolysis and gluconeogenesis is not simply wasteful: small amounts of substrate cycling amplify hormonal control and, in brown fat and muscle, generate heat.

::: example A child who cannot fast {#ex-gsd1}
A nine-month-old, weaned onto three-hourly feeds, is brought in after a seizure during a night of vomiting. She is thin with a protruding abdomen, a large firm liver and a "doll-like" face. Glucose 1.4 mmol/L, lactate 7.8 mmol/L, pH 7.20, urate 640 µmol/L, triglycerides 9 mmol/L; liver enzymes mildly raised; the liver shrinks after 12 hours of continuous glucose. What is the block, and why is the lactate high?
::: solution
This is glycogen storage disease type I (von Gierke disease), deficiency of glucose-6-phosphatase, so neither glycogen breakdown nor gluconeogenesis can finish: glucose-6-phosphate is made but cannot be released. The consequences follow from the trapped metabolite. G6P is diverted into glycolysis, so pyruvate and lactate rise and the lactate also competes with urate for renal excretion, giving hyperuricaemia and, later, gout; excess acetyl-CoA drives lipogenesis, giving hypertriglyceridaemia and xanthomas; glycogen and fat enlarge the liver, and hypoglycaemia with ketosis is worst once feeding intervals lengthen. The distinction from a glycogen phosphorylase or debrancher defect is that gluconeogenesis is intact in those and lactate is normal between fasts. The management is mechanical — frequent feeds and uncooked cornstarch to provide a slow glucose trickle — and it works; untreated children die or develop adenomas, renal disease and pulmonary hypertension.
:::
:::

## Glycogen: a branched buffer

::: definition Glycogen {#def-glycogen}
**Glycogen** is the storage polymer of glucose in animals: α-1,4-linked chains, roughly 8–12 residues between branch points, each branch joined by an α-1,6 linkage, and the whole molecule built outward from a protein primer, glycogenin. Highly branched, highly hydrated and cytosolic, it is stored mainly in liver (regulated to defend blood glucose) and muscle (regulated to defend the muscle's own ATP).
:::

Glycogen is glucose stored as α-1,4-linked chains with α-1,6 branch points, which multiply the number of non-reducing ends and therefore the number of sites from which phosphorylase can work. Synthesis runs from UDP-glucose through glycogenin's primer, is catalysed by glycogen synthase (active when dephosphorylated, i.e. under insulin) and requires the branching enzyme to make α-1,6 links. Breakdown uses glycogen phosphorylase (active when phosphorylated, under adrenaline and glucagon, and in muscle by calcium — the link between contraction and fuel) plus the debranching enzyme's two activities.

The glycogen storage diseases read as a list of these enzymes, and their presentations sort by organ:

| Type | Deficiency | Hallmark |
|---|---|---|
| 0 | Glycogen synthase (liver) | Fasting ketotic hypoglycaemia, *without* hepatomegaly |
| I | Glucose-6-phosphatase | Severe fasting hypoglycaemia, lactic acidosis, hyperuricaemia, hyperlipidaemia, renomegaly |
| II (Pompe) | Lysosomal acid α-glucosidase | Cardiomyopathy, hypotonia, macroglossia; enzyme replacement available |
| III (Cori) | Debranching enzyme | Hepatomegaly and hypoglycaemia, milder; myopathy and raised CK |
| IV (Andersen) | Branching enzyme | Cirrhosis and failure to thrive; abnormal polyglucan storage |
| V (McArdle) | Muscle glycogen phosphorylase | Exercise intolerance, myalgia, myoglobinuria, "second wind" |
| VII | Phosphofructokinase (muscle) | Similar to V, plus haemolysis and hyperuricaemia |

::: example Painful cramps and a flat lactate {#ex-mcardle}
A 24-year-old weight trainer has had lifelong cramps and dark urine after sprinting, but can now walk briskly after a short rest without symptoms. Creatine kinase between episodes is 900 U/L. A forearm exercise test shows ammonia rising from 45 to 190 µg/dL while lactate goes from 0.9 to 1.0 mmol/L. Diagnose and explain the second wind.
::: solution
The inability to raise lactate with ischaemic exercise, in the presence of a normal ammonia response, localises the block to glycogenolysis or glycolysis in muscle: myophosphorylase deficiency (GSD type V, McArdle disease). Ammonia rises because purine nucleotide cycling reports the muscle's energy stress, so a normal ammonia with a flat lactate distinguishes a glycogenolytic defect from excessive effort or poor performance. Muscle ATP is depleted within seconds of intense work, membrane excitability fails, and the patient experiences contracture-like pain and rhabdomyolysis with myoglobinuria and the risk of acute kidney injury. The "second wind" occurs because, after a few minutes of mild exercise, increased heart rate and vasodilation deliver blood-borne glucose and free fatty acids that the muscle can use without glycogen phosphorylase — which is why the recommended treatment is a short warm-up and modest aerobic exercise, not rest from activity. Isometric and high-intensity exercise, and exercise after a fast, are what cause crises; carbohydrate before exertion helps.
:::
:::

::: quiz
A tumour takes up glucose at a high rate and produces lactate even when fully oxygenated. Which statement best explains why this is useful for imaging with ¹⁸F-fluorodeoxyglucose?
- [x] Glucose is taken up and phosphorylated, but hexokinase-bound FDG-6-phosphate cannot be metabolised further, so it accumulates in proportion to uptake.
- [ ] Tumour cells lack mitochondria, so glycolysis is their only source of ATP.
- [ ] FDG is transported by GLUT1 only, which tumours alone express.
- [ ] The signal depends on blood flow, not on glucose metabolism.
::: solution
FDG is a glucose analogue taken up by GLUT transporters and phosphorylated by hexokinase, but its fluorine at carbon 2 prevents further metabolism by phosphoglucose isomerase, so it is trapped in proportion to the flux of glucose into the cell — the basis of PET imaging of tumours, infection and inflammation, and of the caution needed where these overlap. The Warburg effect (aerobic glycolysis) is real but is a consequence of oncogenic signalling and biosynthetic demand, not evidence that tumour cells respire poorly: most have functioning mitochondria.
:::
:::

::: history
Otto Meyerhof and Otto Cori showed in the 1920s how muscle converts glycogen to lactate and how the liver returns lactate to glucose, work recognised by the 1947 Nobel Prize shared with Carl Cori. Otto Warburg had already noticed in 1923 that tumours glycolyse vigorously even in oxygen, the observation now exploited in imaging. The intermediates of glycolysis were fished out of yeast and muscle extracts through the early decades of the twentieth century, Eduard Buchner's cell-free fermentation of 1897 having made that approach possible, and Karl Lohmann identified ATP in muscle in 1929. Fritz Lipmann's coenzyme A of 1945 made the transfer of acetate intelligible, and Hans Krebs's outline of 1937 — the cycle that bears his name — took another decade to be completed enzymatically. Peter Mitchell's chemiosmotic hypothesis of 1961 took seventeen years and a Nobel Prize to be accepted; the crystal structure of the F1 sector of ATP synthase, solved by John Walker's group in 1986 and worked out in detail in 1994, revealed the rotary machine that Paul Boyer's binding-change mechanism had predicted, and Walker, Boyer and Jens Skou shared the 1997 Nobel Prize. The glycogenoses were described before the enzymes: Edgar von Gierke in 1929, Julius Pompe in 1932, Brian McArdle in 1951 and Henri Hers, who identified the lysosomal enzyme defect and the phosphorylase system, in the 1950s. Skou's potassium-stimulated ATPase of 1957, the sodium pump, completed the picture of where so much of the ATP is actually spent.
:::

## Where this leads

What the hormones do to all of this in the fed, fasting and starved states is [[cell-biochemistry/metabolic-integration]]; fat and amino-acid entry into these pathways is [[cell-biochemistry/lipid-amino-acid-metabolism]]; the clinical physiology of hypoglycaemia and diabetic emergencies is in [[endocrine/diabetes]] and [[endocrine/diabetes-complications]]; tissue hypoxia and shock are in [[emergency-critical-care/shock-fluids]].

::: summary
- ATP is a currency, not a store: the pool is small and turned over ~1000 times a day; phosphocreatine buffers it for seconds; intracellular $\Delta G$ of hydrolysis is far from standard values.
- Glycolysis yields 2 ATP and 2 NADH without oxygen, is controlled at PFK-1 by ATP, AMP and fructose-2,6-bisphosphate, and is the sole ATP source of the red cell.
- Pyruvate is the junction: to acetyl-CoA when respiration runs, to lactate when it does not; lactate is a fuel and a gluconeogenic substrate, not simply a waste product.
- The citric acid cycle is a biosynthetic hub as well as an oxidative one; acetyl-CoA cannot make net glucose in humans, and oxaloacetate availability determines whether fat is fully oxidised or diverted to ketone bodies.
- Oxidative phosphorylation couples electron flow to a proton gradient: ~2.5 ATP per NADH, ~1.5 per FADH₂, ~30–32 per glucose; inhibitors and uncouplers each produce a characteristic clinical picture.
- Gluconeogenesis bypasses three irreversible glycolytic steps at a cost of 6 nucleoside triphosphates, and only liver, kidney and gut can release glucose because only they have glucose-6-phosphatase.
- Glycogen multiplies accessible glucose ends; its enzymopathies divide into hepatic (hypoglycaemia, hepatomegaly) and muscle (cramps, myoglobinuria) disease, and the forearm exercise test distinguishes them from mimics.
:::

## Exercises

::: exercise Which shuttle? {level=1}
Give the two shuttles by which cytosolic NADH reducing equivalents enter the mitochondrion, name the tissues where each predominates, and say why one gives a lower yield.
::: solution
The malate–aspartate shuttle transfers electrons to matrix NAD⁺ and operates in liver, kidney, heart and (largely) brain, giving 2.5 ATP per cytosolic NADH. The glycerol-3-phosphate shuttle reduces FAD on the outer face of the inner membrane, feeding electrons to ubiquinone and so bypassing complex I; it predominates in skeletal muscle and white fat and gives 1.5 ATP. The overall yield of glucose oxidation is therefore about 32 in liver and 30 in muscle — a difference of biochemical interest and, in an exhaustive exercise test, of some physiological consequence.
:::
:::

::: exercise Respiratory quotient {level=1 check="0.8"}
A patient at rest consumes 250 mL/min of oxygen and produces 200 mL/min of carbon dioxide. Calculate the respiratory quotient and interpret it.
::: solution
$RQ = 200/250 = 0.8$, the value of a mixed diet with a substantial fat contribution, close to the post-absorptive state. An RQ near 1.0 means carbohydrate oxidation (or, if over 1.0, net lipogenesis or hyperventilation blowing off CO₂); near 0.7 means almost pure fat oxidation, as in prolonged starvation, and RQ also tells the dietitian whether a ventilated patient is overfed, since a rising RQ with a rising $p_{\mathrm{CO_2}}$ means too much carbohydrate.
:::
:::

::: exercise Cost of making glucose {level=1 check="6"}
How many nucleoside triphosphates are consumed in making one glucose from two pyruvate?
::: solution
Six: pyruvate carboxylase uses 1 ATP per pyruvate (2), PEP carboxykinase 1 GTP per pyruvate (2), phosphoglycerate kinase 1 ATP per 1,3-bisphosphoglycerate (2). The reverse of glycolysis's two ATP-yielding steps is thus paid for twice over, and the process also consumes 2 NADH to reduce 1,3-bisphosphoglycerate.
:::
:::

::: exercise Control in words {level=2}
Explain, in terms of the enzymes and second messengers of this lesson, why a glucagon injection raises blood glucose in a fasting adult but does little in a patient with severe, prolonged starvation who has depleted both glycogen and hepatic protein.
::: solution
Glucagon acts through a Gs-coupled receptor, raising cyclic AMP and activating protein kinase A, which phosphorylates glycogen phosphorylase kinase and so glycogen phosphorylase (glycogenolysis) and phosphorylates the bifunctional PFK-2/fructose-1,6-bisphosphatase to lower fructose-2,6-bisphosphate. The fall in fructose-2,6-bisphosphate both slows glycolysis and releases fructose-1,6-bisphosphatase, so gluconeogenesis proceeds. In starvation the glycogen store is empty, so the first mechanism has no substrate; gluconeogenesis continues but is limited by its substrates, of which amino acids from muscle protein are the largest supply and glycerol depends on fat mobilisation. Glucagon's effect is therefore blunted because the *capacity* to respond, not the signal, has failed — the same reason adrenaline produces less hyperglycaemia in a marasmic child than in a well-nourished one.
:::
:::

::: exercise Thiamine {level=2}
A person with alcohol dependence is admitted confused with nystagmus and an acidosis; glucose infusion is proposed before vitamin replacement. Name the enzymes at risk in thiamine deficiency, and explain why giving glucose first can precipitate Wernicke encephalopathy.
::: solution
Thiamine in the form of thiamine pyrophosphate is a cofactor of pyruvate dehydrogenase, α-ketoglutarate dehydrogenase, branched-chain ketoacid dehydrogenase and transketolase. Without it, pyruvate cannot enter the citric acid cycle and is reduced to lactate; the brain, dependent on oxidative metabolism, is starved even when glucose is plentiful. A glucose load raises the demand for these enzymes and consumes what little thiamine remains, and lactate rises further; classically this precipitates or worsens the ophthalmoplegia, ataxia and confusion of Wernicke encephalopathy, which is why parenteral thiamine is given before or with glucose in an at-risk patient. The same reasoning explains beriberi (with high-output cardiac failure in the "wet" form, from peripheral vasodilation and impaired muscle metabolism) and the raised lactate of refeeding.
:::
:::

::: exercise Read the biochemistry {level=2}
Two patients have fasting hypoglycaemia and hepatomegaly. In A, lactate and urate are high and glucagon after a fast produces no rise in glucose but a large rise in lactate. In B, lactate is normal, ketones are high, and glucagon after a short fast raises glucose normally but after an overnight fast not at all. Assign a defect to each.
::: solution
A: glucose-6-phosphatase deficiency (type I). Trapped G6P is metabolised to lactate, and the liver cannot release glucose from either glycogen or gluconeogenesis, so glucagon cannot raise glucose and instead raises lactate further. B: a hepatic glycogenolytic defect with intact gluconeogenesis — a phosphorylase or debrancher defect (type 0 has no hepatomegaly). Glycogen can be mobilised after a short fast, but once the store is depleted the patient depends on gluconeogenesis and becomes ketotic because fat oxidation is high; lactate stays normal because gluconeogenic flux and pyruvate handling are intact. Note how much a provocative test and three metabolites accomplish before any enzyme assay.
:::
:::

::: exercise Metformin and lactate {level=3}
A patient with type 2 diabetes, eGFR 26 mL/min/1.73 m², is admitted with septic shock and a lactate of 9 mmol/L, pH 7.05. Metformin has been continued. Explain the mechanism by which metformin raises lactate, why renal impairment matters, and why the combination of shock and metformin is dangerous.
::: solution
Metformin inhibits complex I of the respiratory chain, mildly and reversibly. The consequences are therapeutic — reduced hepatic gluconeogenesis (which is ATP-dependent and partly shifts cells towards AMP-activated protein kinase signalling), improved insulin sensitivity, no hypoglycaemia — and, at high concentration, harmful: with complex I partially blocked, NADH rises, pyruvate is pushed towards lactate, and hepatic clearance of lactate falls, because converting lactate to glucose requires lactate-derived NADH to be reoxidised by the respiratory chain that the drug is partly blocking. Normally this produces a small, asymptomatic rise in lactate. In renal impairment the drug accumulates because it is excreted unchanged, and in shock the lactate production of hypoperfused tissue is added to impaired hepatic clearance; metformin-associated lactic acidosis is therefore rare, but has a high mortality, and it is why the drug is stopped at an eGFR below about 30, withheld around surgery and iodinated contrast, and suspended in any acute illness that threatens perfusion or oxygenation.
:::
:::

::: exercise Anion-gap arithmetic {level=3}
Use the values in the previous question to compute the anion gap (Na 138, Cl 102, HCO₃⁻ 12 mmol/L) and, given lactate 9 mmol/L, decide whether the gap is fully explained. What does that leave to look for?
::: solution
Anion gap $= 138 - 102 - 12 = 24$ mmol/L, against a reference of about 12, an excess of 12 mmol/L. Lactate of 9 mmol/L above a normal of about 1 accounts for about 8 mmol/L of that excess, so roughly 4 mmol/L is unexplained — enough to demand a second cause: ketones (starvation, alcoholic ketoacidosis, metformin's own mild ketosis is not it), renal failure with retained sulphates and phosphates, or a toxic alcohol (an osmolar gap should be checked, and in a fire or smoke victim cyanide as well). Bicarbonate should also be reconciled with the change in gap to unmask a coexisting metabolic alkalosis from vomiting. The lesson generalises: an acidosis is rarely monocausal in shock, and metabolic arithmetic is the way to notice.
:::
:::
