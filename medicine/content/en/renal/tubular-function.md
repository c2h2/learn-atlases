The glomeruli filter about 180 litres of plasma a day, containing roughly 25 000 mmol of sodium, 900 mmol of glucose and 4000 mmol of bicarbonate. A person excretes perhaps 1.5 litres of urine with 150 mmol of sodium, no glucose and almost no bicarbonate. The difference is the work of the tubule. It reclaims more than 99% of the filtered water and salt, all the glucose and amino acids, and nearly all the bicarbonate, and it fine-tunes what remains to match intake.

The tubule is not one structure but a sequence of segments, each with its own transporters and its own job. The proximal tubule reabsorbs in bulk. The loop of Henle separates salt from water and builds the concentration gradient of the medulla. The distal tubule and collecting duct make the final, hormone-controlled adjustments. Most diuretics, and most inherited tubular disorders, can be understood as a single transporter switched off in one segment.

This lesson builds on the filtration physics of [[renal/filtration]] and on the membrane transport principles of [[physiology/homeostasis-body-fluids]]. The regulation of sodium and water as clinical variables follows in [[renal/water-sodium]].

## How a tubule cell moves solute

Tubular epithelial cells are polarised. The **apical** (luminal) membrane faces the tubular fluid; the **basolateral** membrane faces the interstitium and the peritubular capillaries. Neighbouring cells are joined by **tight junctions**, which are leaky in the proximal tubule and tight in the collecting duct.

::: definition Tubular transport {#def-transport}
**Reabsorption** is movement from the tubular lumen back into the blood; **secretion** is movement from the blood into the lumen. Both can take two routes:

- **transcellular**: across the apical membrane, through the cell and out across the basolateral membrane;
- **paracellular**: between cells, through the tight junctions, driven by concentration or voltage gradients.

Almost all transcellular transport is powered, directly or indirectly, by the **Na⁺/K⁺-ATPase** on the basolateral membrane. It pumps sodium out of the cell, keeping intracellular sodium low and the cell interior negative. Sodium then enters across the apical membrane down its electrochemical gradient, either alone through channels or coupled to other solutes by **cotransporters** (moving in the same direction, such as Na⁺–glucose) and **exchangers** (moving in opposite directions, such as Na⁺–H⁺). Movement of a solute against its own gradient using the sodium gradient is called **secondary active transport**.
:::

Water follows solute. Wherever salt is reabsorbed and the epithelium contains water channels (aquaporins), water moves by osmosis. Where the epithelium lacks water channels, salt can be removed while water stays behind; this is how the kidney makes dilute urine.

Carrier-mediated transport has a ceiling. There is a finite number of carriers, so the rate of reabsorption of a substance like glucose cannot rise indefinitely.

::: theorem Transport maximum and renal threshold {#thm-tm}
For a solute reabsorbed by saturable carriers, the reabsorption rate rises with the filtered load until the carriers are saturated, at the **transport maximum** ($T_m$). Above this, all extra filtered solute is excreted:

$$
\text{excretion} = \text{filtered load} - T_m = \text{GFR} \times P_x - T_m \quad (\text{when } \text{GFR} \times P_x > T_m)
$$ {#eq-tm}

The **renal threshold** is the plasma concentration at which the solute first appears in the urine. Because nephrons differ in their capacity, some saturate before others, so the threshold is lower than $T_m$/GFR would predict and the transition is curved rather than sharp (this curvature is called **splay**).
:::

For glucose, the renal threshold in healthy adults is about 10–11 mmol/L (180–200 mg/dL). Below it, essentially no glucose appears in the urine. About 90% of filtered glucose is reabsorbed in the early proximal tubule by **SGLT2** (sodium–glucose cotransporter 2) and the rest further along by **SGLT1**.

::: example Glucose in the urine {#ex-tm}
A person with uncontrolled diabetes has a plasma glucose of 20 mmol/L and a GFR of 125 mL/min. Take the transport maximum for glucose as 2.0 mmol/min. Estimate the rate of glucose excretion, ignoring splay.
::: solution
Filtered load $= \text{GFR} \times P = 0.125 \text{ L/min} \times 20 \text{ mmol/L} = 2.5$ mmol/min.

Reabsorption is capped at $T_m = 2.0$ mmol/min, so excretion $= 2.5 - 2.0 = 0.5$ mmol/min, about 720 mmol (130 g) a day.

Glucose in the tubular fluid holds water with it, causing an **osmotic diuresis**: polyuria, thirst and dehydration, the classic symptoms of hyperglycaemia. The same principle explains how SGLT2 inhibitors work. By blocking the main glucose carrier, they lower the effective threshold so that glucose is lost in the urine at normal blood glucose, about 60–80 g a day in people with normal kidney function. Their benefits on kidney and heart outcomes are covered in [[renal/chronic-kidney-disease]].
:::
:::

## The segments of the nephron

### Proximal tubule

::: definition The proximal tubule {#def-proximal}
The **proximal tubule** reabsorbs about two-thirds of the filtered sodium and water, almost all filtered glucose and amino acids, about 80% of filtered bicarbonate, and most filtered phosphate, potassium and urate. Reabsorption here is **isosmotic**: water follows solute so closely through the leaky epithelium (rich in aquaporin-1) that the tubular fluid stays at the osmolality of plasma.

The proximal tubule is also the main site of **secretion** of organic anions and cations, including many drugs (penicillins, methotrexate, metformin), uric acid and creatinine.
:::

The key apical transporter is the **sodium–hydrogen exchanger NHE3**. Hydrogen ions secreted into the lumen combine with filtered bicarbonate to form carbonic acid, which carbonic anhydrase on the brush border splits into CO₂ and water. CO₂ diffuses into the cell, is turned back into H⁺ and HCO₃⁻, and the bicarbonate leaves across the basolateral membrane. The net effect is reabsorption of filtered bicarbonate. Acetazolamide, a carbonic anhydrase inhibitor, blocks this and causes bicarbonate loss in the urine.

Phosphate is reabsorbed by sodium–phosphate cotransporters (NaPi-IIa and IIc). Parathyroid hormone and FGF23 remove these transporters from the membrane, causing phosphaturia ([[renal/potassium-calcium-phosphate]]).

The proximal tubule also makes ammonia from glutamine. This becomes important in acidosis, when ammonium excretion is the kidney's main way of getting rid of acid ([[renal/acid-base-disorders]]).

### Loop of Henle

::: definition The loop of Henle {#def-loop}
The **thin descending limb** is permeable to water but not very permeable to salt. The **thick ascending limb** (TAL) is impermeable to water and actively reabsorbs about 25% of the filtered sodium chloride through the apical **Na⁺–K⁺–2Cl⁻ cotransporter (NKCC2)**. Because salt leaves without water, fluid leaving the TAL is hypotonic, about 100 mOsm/kg, whatever the body's water balance. For this reason the TAL is called the **diluting segment**.
:::

Potassium taken up by NKCC2 leaks back into the lumen through **ROMK** channels. This recycling keeps NKCC2 supplied with potassium and makes the lumen electrically positive. The positive lumen pushes calcium and magnesium out between the cells, through tight junction proteins called claudins. The TAL is therefore the main site of magnesium reabsorption and an important one for calcium.

**Loop diuretics** (furosemide, bumetanide) block NKCC2. They are the most powerful diuretics because they act on the segment that handles a quarter of filtered sodium, and because they abolish the medullary gradient, preventing urine concentration. By removing the positive lumen voltage, they also increase calcium and magnesium loss.

### Distal convoluted tubule

The **distal convoluted tubule** (DCT) reabsorbs about 5–7% of filtered sodium through the **sodium–chloride cotransporter (NCC)**. It is also impermeable to water, so it dilutes the urine further. **Thiazide diuretics** block NCC. Unlike loop diuretics, thiazides *reduce* urinary calcium. In the DCT, calcium is reabsorbed through apical TRPV5 channels under the control of parathyroid hormone; blocking NCC lowers intracellular sodium, which drives more calcium out of the cell across the basolateral membrane, so more is reabsorbed. This is why thiazides are used to prevent calcium stones and why they can cause mild hypercalcaemia.

### Connecting tubule and collecting duct

The last segments contain two main cell types.

- **Principal cells** reabsorb sodium through the **epithelial sodium channel (ENaC)** and secrete potassium through ROMK. Sodium entry makes the lumen negative, which drives potassium secretion. **Aldosterone** increases the number of ENaC channels and Na⁺/K⁺-ATPase pumps. Principal cells are also where **antidiuretic hormone** (ADH, vasopressin) acts: binding to V2 receptors raises cAMP and inserts **aquaporin-2** water channels into the apical membrane.
- **Intercalated cells** handle acid and base. Type A (α) cells secrete H⁺ through an apical H⁺-ATPase and are essential for excreting acid. Type B (β) cells secrete bicarbonate in exchange for chloride through pendrin.

Although these segments handle only 2–5% of filtered sodium, they decide the final composition of the urine. **Amiloride** blocks ENaC; **spironolactone** and **eplerenone** block the aldosterone receptor. Both reduce potassium secretion, which is why they are called potassium-sparing diuretics and why they can cause hyperkalaemia.

| Segment | Share of filtered Na⁺ | Key apical transporter | Diuretic acting here | Effect on K⁺ and Ca²⁺ excretion |
|---|---|---|---|---|
| Proximal tubule | about 65% | NHE3, SGLT2 | acetazolamide, SGLT2 inhibitors | K⁺ rises (distal delivery) |
| Thick ascending limb | about 25% | NKCC2 | furosemide, bumetanide | K⁺ rises, Ca²⁺ rises |
| Distal convoluted tubule | about 5–7% | NCC | thiazides | K⁺ rises, Ca²⁺ falls |
| Collecting duct | about 2–5% | ENaC | amiloride; spironolactone (receptor) | K⁺ falls |

Diuretics acting upstream of the collecting duct cause **hypokalaemia** for two reasons: more sodium and fluid reach the principal cells, which increases potassium secretion; and the resulting volume loss activates aldosterone.

## Concentrating and diluting the urine

A healthy person can produce urine as dilute as about 50 mOsm/kg or as concentrated as about 1200 mOsm/kg. The kidney achieves this range by creating a gradient of osmolality in the medullary interstitium, from about 290 mOsm/kg at the corticomedullary junction to about 1200 at the papillary tip, and then varying the water permeability of the collecting duct, which runs through that gradient.

::: theorem The countercurrent mechanism {#thm-countercurrent}
The medullary osmotic gradient is generated by **countercurrent multiplication** in the loop of Henle, reinforced by **urea recycling**, and preserved by **countercurrent exchange** in the vasa recta. In the presence of ADH, the collecting duct becomes permeable to water, and water leaves it into the hypertonic medulla until the urine approaches the osmolality of the papillary interstitium.
:::

::: proof
At any level of the medulla, the thick ascending limb pumps salt out into the interstitium without water, so the interstitium becomes a little more concentrated than the ascending fluid beside it; the single effect is only about 200 mOsm/kg. The adjacent descending limb is permeable to water, so water leaves it and the descending fluid concentrates to match the interstitium. This concentrated fluid then flows round the hairpin into the ascending limb, where more salt is pumped out at a deeper level. Because the flows in the two limbs run in opposite directions, the small horizontal difference is repeated along the length of the loop and multiplied into a large vertical gradient. Longer loops build steeper gradients.

Urea adds to the gradient in the inner medulla. Under ADH, the inner medullary collecting duct becomes permeable to urea through urea transporters; urea concentrated in the upper collecting duct diffuses out into the inner medulla, contributing about half of its osmolality.

The vasa recta could wash the gradient away, but they too form hairpins. Blood descending into the medulla gains solute and loses water; on the way back up it loses solute and regains water. The blood therefore leaves the medulla only slightly more concentrated than it entered, and the gradient is preserved.
:::

::: definition Urine concentration and ADH {#def-concentrate}
**Antidiuretic hormone** (arginine vasopressin) is made in the hypothalamus and released from the posterior pituitary when plasma osmolality rises or effective circulating volume falls. Acting on V2 receptors in the collecting duct, it inserts aquaporin-2 channels and produces concentrated urine. Without ADH, the collecting duct is nearly water-impermeable and the dilute fluid from the TAL and DCT passes into the urine (**water diuresis**).

The **minimum urine volume** is set by the daily solute load the urine must carry and the maximum concentration the kidney can achieve:

$$
V_{\min} = \frac{\text{solute excreted (mOsm/day)}}{U_{\text{osm, max}} \text{ (mOsm/kg)}}
$$ {#eq-vmin}
:::

A typical Western diet produces 600–900 mOsm of solute a day, mainly urea and salts. With a maximum urine osmolality of 1200 mOsm/kg, 600 mOsm can be excreted in 0.5 L. Conversely, the **maximum** urine volume is the solute load divided by the minimum urine osmolality. With 600 mOsm and a minimum of 50 mOsm/kg, a person can excrete up to 12 L of water a day. A person who eats very little (low solute) and drinks a lot of beer or tea has a much lower ceiling, which explains the hyponatraemia of beer potomania ([[renal/water-sodium]]).

::: widget plot
f: S/x; 600/x
x: 50, 1200
y: 0, 12
sliders: S=600:150:1200:50
vlines: 300
labels: \text{urine volume, solute load } S;\ \text{urine volume, 600 mOsm/day}
caption: Daily urine volume (L) against urine osmolality (mOsm/kg) for a fixed solute load, $V = S/U_{osm}$. The kidney can move along the curve from about 50 to 1200 mOsm/kg. Lower $S$ to model a "tea and toast" diet: the maximum water that can be excreted falls sharply. In advanced chronic kidney disease the urine is fixed near 300 mOsm/kg (vertical line), so 600 mOsm needs 2 L of urine, explaining nocturia. A simplified teaching model.
:::

Free water clearance puts a number on whether the kidney is adding or removing water relative to solute. Osmolar clearance is $C_{osm} = U_{osm} V / P_{osm}$, the volume needed to excrete the urine's solute at plasma osmolality. **Free water clearance** is $C_{H_2O} = V - C_{osm}$. It is positive when the urine is dilute (the kidney is excreting pure water) and negative when the urine is concentrated (the kidney is retaining water).

## Disorders of the tubule

Inherited tubular disorders are rare, but they are among the clearest experiments in physiology: each one shows what happens when a single transporter fails. Acquired versions, from drugs and toxins, are common.

::: example A global proximal leak {#ex-fanconi}
A 64-year-old woman has bone pain and fatigue. Her plasma glucose is 5.2 mmol/L, but her urine dipstick shows glucose 2+. Plasma phosphate is 0.55 mmol/L (low), urate is low, bicarbonate is 17 mmol/L with a normal anion gap, and urine contains amino acids. Her serum free light chains are markedly abnormal. Explain.
::: solution
Glycosuria with normal blood glucose, phosphate wasting, low urate, aminoaciduria and a normal anion gap acidosis from bicarbonate loss together mean generalised failure of proximal tubular reabsorption: the **renal Fanconi syndrome**. The acidosis is a proximal (type 2) renal tubular acidosis.

In an adult, acquired causes are commoner than inherited ones. The abnormal light chains point to **monoclonal light chains** damaging proximal tubular cells, which take up filtered light chains by endocytosis; she needs investigation for myeloma or another plasma cell disorder ([[blood/lymphoma-myeloma]]). Other acquired causes are drugs, including tenofovir disoproxil, ifosfamide and some older aminoglycosides, and heavy metals. In children, cystinosis is the commonest inherited cause. Her bone pain probably reflects osteomalacia from chronic phosphate loss.
:::
:::

::: example Two salt-wasting syndromes {#ex-bartter-gitelman}
Two young adults have hypokalaemia, metabolic alkalosis, normal or low blood pressure and high renin and aldosterone. Patient A is 22 and has hypomagnesaemia and very low urinary calcium. Patient B was born prematurely after polyhydramnios and has high urinary calcium and nephrocalcinosis. Which transporter is likely to be defective in each?
::: solution
Both have the picture of a person on a diuretic without taking one: salt is lost, volume falls, renin and aldosterone rise, and the extra distal sodium delivery with high aldosterone drives potassium and hydrogen secretion, causing hypokalaemic alkalosis. Blood pressure is not raised because the primary problem is salt loss.

**Patient A** has **Gitelman syndrome**, loss of function of the thiazide-sensitive NCC in the distal convoluted tubule. Like a thiazide, it lowers urinary calcium. Hypomagnesaemia is characteristic. It usually presents in adolescence or adulthood with cramps, fatigue or an incidental low potassium.

**Patient B** has **Bartter syndrome**, a defect in the thick ascending limb (NKCC2, ROMK or the chloride channel ClC-Kb and its subunit barttin). Like a loop diuretic, it increases calcium excretion, causing nephrocalcinosis, and the antenatal forms cause fetal polyuria and polyhydramnios.
:::
:::

::: warning Before diagnosing a tubular syndrome {#warn-tubular}
Covert diuretic use, laxative misuse and self-induced vomiting all produce hypokalaemic metabolic alkalosis with high renin and aldosterone and can be indistinguishable from Bartter or Gitelman syndrome on blood tests. Urine chloride helps: it is low (below about 20 mmol/L) after vomiting, but high in diuretic use and in the inherited syndromes. A urine diuretic screen, sometimes repeated, separates the last two. These possibilities should be approached without judgement, because they are often linked to an eating disorder ([[psychiatry/eating-personality-disorders]]). Genetic testing confirms an inherited syndrome.
:::

Mutations that *increase* tubular sodium reabsorption cause the mirror-image picture: **hypertension** with hypokalaemia and low renin. In **Liddle syndrome**, ENaC is overactive because it cannot be removed from the membrane; aldosterone is suppressed and the condition responds to amiloride but not spironolactone. Primary hyperaldosteronism produces a similar picture with high aldosterone ([[endocrine/adrenal]]).

### Diabetes insipidus

::: definition Diabetes insipidus {#def-di}
**Diabetes insipidus** (DI) is the production of large volumes of dilute urine because ADH is lacking or ineffective. In **central DI** (now also called arginine vasopressin deficiency), the posterior pituitary does not release enough ADH, for example after pituitary surgery, head injury or with tumours and infiltrative disease. In **nephrogenic DI** (arginine vasopressin resistance), the collecting duct does not respond, as with chronic lithium use, hypercalcaemia, hypokalaemia or inherited V2 receptor or aquaporin-2 mutations. **Primary polydipsia**, excessive drinking with intact ADH, also causes dilute polyuria and must be distinguished. Polyuria in adults is usually defined as more than about 3 L a day (or more than 40–50 mL/kg/day).
:::

::: example Polyuria after pituitary surgery {#ex-di}
A 45-year-old man has transsphenoidal surgery for a pituitary adenoma. That night he passes 400 mL of urine an hour. His plasma sodium rises from 140 to 149 mmol/L, plasma osmolality is 305 mOsm/kg and urine osmolality is 110 mOsm/kg. He is awake and asking for water. Interpret and outline the response.
::: solution
A high plasma osmolality with an inappropriately dilute urine (well below plasma) means the kidney is not conserving water when it should be: **diabetes insipidus**. In the setting of pituitary surgery, this is most likely **central** DI from damage to the posterior pituitary or stalk.

He is protected while he is awake and can drink, because thirst replaces his losses; the danger rises if he becomes drowsy or is kept nil by mouth. Management follows local endocrine protocols: allow him to drink to thirst, chart fluid balance and measure sodium regularly, and give **desmopressin** (a V2-selective ADH analogue) if polyuria is sustained and sodium rises. A response to desmopressin (urine osmolality rising markedly and urine volume falling) confirms central DI.

After pituitary surgery DI is often transient, and some people follow a **triphasic pattern**: DI, then a few days of inappropriate ADH release from degenerating neurones (with a risk of hyponatraemia, especially if desmopressin is continued), then permanent DI in some. Repeated sodium checks are therefore essential.
:::
:::

Outside the postoperative setting, distinguishing central DI, nephrogenic DI and primary polydipsia is done in specialist centres. The classic **water deprivation test** withholds fluid under supervision and measures urine osmolality, then gives desmopressin. Central DI fails to concentrate on deprivation but responds to desmopressin; nephrogenic DI responds to neither; primary polydipsia concentrates partly, though a long-standing water diuresis washes out the medullary gradient and blunts the maximum. **Copeptin**, a stable fragment cleaved from the same precursor as ADH, is increasingly measured after stimulation with hypertonic saline or arginine because it gives a clearer answer than the deprivation test.

Lithium deserves a note. It enters principal cells through ENaC and interferes with aquaporin-2 production. Nephrogenic DI affects a substantial minority of people on long-term lithium and can persist after the drug is stopped. Amiloride, which blocks lithium entry through ENaC, is sometimes used under specialist advice. Long-term lithium can also cause a slowly progressive chronic interstitial nephritis, which is why kidney function is monitored during treatment ([[psychiatry/treatments-mental-health-law]]).

::: quiz
A person drinks 10 L of water a day because of primary polydipsia. Their plasma sodium is 136 mmol/L. Which statement about their urine is correct?
- [ ] Urine osmolality will be around 600 mOsm/kg because ADH is maximal
- [x] Urine will be dilute because ADH is suppressed; if they are then deprived of water, the urine may fail to reach full concentration because the medullary gradient has been washed out
- [ ] They will develop hypernatraemia because the kidney cannot excrete free water
- [ ] Their free water clearance will be negative
::: solution
Drinking large volumes lowers plasma osmolality slightly, which suppresses ADH; the collecting duct becomes water-impermeable and the urine is dilute, so free water clearance is positive. The continuous high urine flow carries solute out of the medulla and reduces the medullary gradient. On water deprivation, ADH rises but the urine cannot reach the maximum concentration of a healthy kidney. Partial concentration is therefore typical of primary polydipsia and is one reason the distinction from partial DI can be difficult.
:::
:::

::: history
In 1951 the Swiss physical chemist Werner Kuhn and his student Bartholomew Hargitay built a physical model showing how a hairpin loop with counter-flowing streams could multiply a small single effect into a large gradient. The same year, Heinrich Wirz, Hargitay and Kuhn measured the osmolality of tissue slices from rat kidneys and found it rising steadily from cortex to papilla, the gradient the theory predicted. In 1953 Vincent du Vigneaud synthesised oxytocin and then vasopressin, the first peptide hormones made in the laboratory, for which he received the 1955 Nobel Prize in Chemistry. The water channel that vasopressin moves into the membrane remained hypothetical until 1992, when Peter Agre and colleagues showed that a red cell membrane protein, later named aquaporin-1, made frog eggs swell rapidly in dilute water; Agre shared the 2003 Nobel Prize in Chemistry.
:::

## Where this leads

Sodium and water reabsorption, the renin–angiotensin–aldosterone system and ADH are put to clinical use in [[renal/water-sodium]]. Potassium secretion in the collecting duct and calcium and phosphate handling are developed in [[renal/potassium-calcium-phosphate]]. Acid secretion and the renal tubular acidoses are in [[renal/acid-base-disorders]]. The mechanisms of drug excretion by the proximal tubule are in [[pharmacology/metabolism-excretion]].

::: summary
- Tubular transport is powered by the basolateral Na⁺/K⁺-ATPase; apical cotransporters and exchangers use the sodium gradient to move other solutes.
- Saturable carriers have a transport maximum. Glucose appears in the urine above a plasma level of about 10–11 mmol/L; SGLT2 reabsorbs about 90% of filtered glucose.
- The proximal tubule reabsorbs about two-thirds of filtered sodium and water isosmotically, all glucose and amino acids and most bicarbonate and phosphate, and secretes many drugs.
- The thick ascending limb (NKCC2, loop diuretics) reabsorbs about 25% of sodium without water and powers the medullary gradient; the DCT (NCC, thiazides) about 5–7%; the collecting duct (ENaC, aldosterone; aquaporin-2, ADH) makes the final adjustments.
- Countercurrent multiplication, urea recycling and countercurrent exchange create and preserve a medullary gradient up to about 1200 mOsm/kg; ADH determines how much water the collecting duct removes.
- Minimum urine volume = solute load / maximum urine osmolality.
- Single-transporter disorders mimic diuretics: Bartter (loop), Gitelman (thiazide), Liddle (overactive ENaC). Fanconi syndrome is global proximal failure. Diabetes insipidus is central or nephrogenic and must be distinguished from primary polydipsia.
:::

## Exercises

::: exercise Power the pump {level=1}
Explain why poisoning the basolateral Na⁺/K⁺-ATPase would reduce glucose reabsorption in the proximal tubule, even though the ATPase does not transport glucose.
::: solution
SGLT2 moves glucose into the cell by coupling it to sodium entering down its electrochemical gradient. That gradient (low intracellular sodium, negative cell interior) is maintained by the Na⁺/K⁺-ATPase. If the pump stops, intracellular sodium rises, the gradient collapses and SGLT2 can no longer drive glucose uphill into the cell. This is secondary active transport: the energy comes from ATP indirectly, through the sodium gradient.
:::
:::

::: exercise Diuretics and calcium {level=1}
A 70-year-old woman with recurrent calcium oxalate stones and hypercalciuria needs a diuretic for hypertension. Which class would also help her stones, and which might make them worse? Explain using tubular physiology.
::: solution
A **thiazide** would help. Blocking NCC in the distal convoluted tubule increases calcium reabsorption there, lowering urinary calcium. A **loop diuretic** would make stones more likely: blocking NKCC2 abolishes the positive lumen voltage in the thick ascending limb that drives paracellular calcium reabsorption, so urinary calcium rises.
:::
:::

::: exercise Fractional excretion of sodium {level=1 check="round(150/(180*140)*1000)/10"}
A healthy adult has a GFR of 180 L/day, a plasma sodium of 140 mmol/L and excretes 150 mmol of sodium a day. What percentage of the filtered sodium is excreted? Give your answer to one decimal place.
::: solution
Filtered sodium $= 180 \times 140 = 25\,200$ mmol/day. Fractional excretion $= 150 / 25\,200 \times 100 = 0.595\%$, about **0.6%**. More than 99% of filtered sodium is reabsorbed. A change of only 1% in reabsorption would change sodium excretion by 250 mmol a day, more than a typical daily intake, which is why tubular sodium handling is so tightly regulated.
:::
:::

::: exercise Free water clearance {level=2 check="round((6-100*6/290)*100)/100"}
A person with primary polydipsia passes 6 L of urine a day with an osmolality of 100 mOsm/kg. Plasma osmolality is 290 mOsm/kg. Calculate the free water clearance in L/day, rounded to two decimal places.
::: hint
$C_{osm} = U_{osm} V / P_{osm}$, then $C_{H_2O} = V - C_{osm}$.
:::
::: solution
$C_{osm} = 100 \times 6 / 290 = 2.07$ L/day. $C_{H_2O} = 6 - 2.07 = 3.93$ L/day. The kidney is excreting almost 4 L of solute-free water each day, which is exactly what it should do when intake is high.
:::
:::

::: exercise Trace the voltage {level=2}
Explain why the thick ascending limb is the main site of magnesium reabsorption, and predict the effect on plasma magnesium of long-term loop diuretic use and of a proton pump inhibitor (which reduces intestinal magnesium absorption) taken together.
::: solution
In the TAL, potassium entering the cell through NKCC2 recycles back into the lumen through ROMK, making the lumen about +10 mV relative to the interstitium. This positive voltage drives magnesium and calcium out of the lumen between the cells, through claudin-based channels in the tight junctions. Loop diuretics block NKCC2, abolish the voltage and increase magnesium loss in the urine. A proton pump inhibitor independently reduces magnesium absorption in the gut. Together they can cause significant hypomagnesaemia, which in turn causes refractory hypokalaemia and hypocalcaemia ([[renal/potassium-calcium-phosphate]]).
:::
:::

::: exercise Minimum urine volume {level=2 check="750/300"}
A person with advanced chronic kidney disease can neither concentrate nor dilute their urine beyond about 300 mOsm/kg. They excrete 750 mOsm of solute a day. What is the smallest urine volume (in L/day) they can produce? Why do they wake at night to pass urine?
::: solution
$V_{\min} = 750 / 300 = 2.5$ L/day. A healthy kidney could excrete the same solute in $750/1200 = 0.625$ L. Because the urine volume cannot be reduced overnight by concentrating it, urine production continues at a steady rate through the night, causing nocturia. The same loss of concentrating ability means these patients become dehydrated quickly when they cannot drink, and also cannot excrete large water loads, so they are vulnerable to both hyper- and hyponatraemia.
:::
:::

::: exercise Lithium and the collecting duct {level=2}
A 52-year-old woman who has taken lithium for 20 years for bipolar disorder passes 5 L of urine a day. She is admitted after a fall and is drowsy for two days. Her plasma sodium is 158 mmol/L and her lithium level is above the therapeutic range. Explain the sequence of events.
::: solution
Long-term lithium has caused **nephrogenic diabetes insipidus**: lithium enters principal cells through ENaC and reduces aquaporin-2 expression, so her collecting ducts cannot respond to ADH and she produces large volumes of dilute urine. She stays in balance while she can drink to thirst. After the fall, while drowsy, she could not drink. She continued to lose water and became hypernatraemic. Dehydration lowers GFR and increases proximal reabsorption of lithium (handled like sodium), so her lithium level rose, which worsens drowsiness, a dangerous cycle. Management, following local guidance, is careful water replacement within the safe rate of sodium correction ([[renal/water-sodium]]), withholding lithium, and specialist advice on whether lithium removal by dialysis is needed.
:::
:::

::: exercise Localise the glycosuria {level=3}
Explain the glycosuria in each case, naming the mechanism. (a) A pregnant woman at 28 weeks with a plasma glucose of 6.0 mmol/L and glucose 1+ in her urine. (b) A man with type 2 diabetes who starts dapagliflozin and has glucose 3+ in his urine with a plasma glucose of 7.0 mmol/L. (c) A man with plasma glucose 22 mmol/L. (d) A healthy 30-year-old with persistent glucose 2+, normal plasma glucose and no other tubular abnormality.
::: solution
(a) In pregnancy GFR rises by about 50%, so the filtered load of glucose rises at any given plasma level, and tubular capacity does not rise as much. Glucose can appear in urine at normal blood glucose. Glycosuria in pregnancy is common and is not a test for gestational diabetes, which needs a glucose tolerance test ([[obstetrics-gynaecology/pregnancy-complications]]).

(b) Dapagliflozin is an **SGLT2 inhibitor**: by blocking the main glucose transporter in the early proximal tubule it lowers the renal threshold, so glucose is excreted at normal blood glucose. This is the intended effect.

(c) The filtered load exceeds the **transport maximum**: overflow glycosuria from hyperglycaemia.

(d) Isolated glycosuria with normal blood glucose and otherwise normal tubular function is **familial renal glycosuria**, usually caused by variants in *SLC5A2*, the gene for SGLT2. It is benign. This "natural experiment" reassured developers that drug inhibition of SGLT2 was likely to be safe.
:::
:::

::: exercise Design the polyuria pathway {level=3}
Outline a logical sequence of questions and tests for an adult who reports passing large volumes of urine, from confirming polyuria to identifying the cause.
::: solution
1. **Confirm polyuria** with a 24-hour urine volume (more than about 3 L/day), distinguishing it from frequency with small volumes (bladder or prostate problems) and from nocturia alone.
2. **Measure urine osmolality** to separate a **solute diuresis** (urine osmolality near or above plasma, total solute excretion high) from a **water diuresis** (dilute urine, below about 300 mOsm/kg and often below 150).
3. For a solute diuresis, look for the solute: glucose (diabetes, SGLT2 inhibitors), urea (recovery from acute kidney injury or relief of obstruction, high-protein feeds), sodium (saline infusions, diuretics), mannitol.
4. For a water diuresis, check plasma sodium, calcium, potassium and glucose, and review drugs (lithium). A high-normal or raised sodium favours DI; a low-normal sodium favours primary polydipsia.
5. If still unclear, refer for a specialist test: water deprivation with desmopressin, or a stimulated copeptin test, to separate central DI, nephrogenic DI and primary polydipsia.
6. For central DI, image the pituitary and hypothalamus (MRI) and assess anterior pituitary function; for nephrogenic DI, correct reversible causes.
:::
:::
