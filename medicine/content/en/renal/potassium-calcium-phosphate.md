Sodium and water determine volume and tonicity. Potassium, calcium, magnesium and phosphate determine something more immediate: whether nerves fire, muscles contract and the heart keeps a stable rhythm. Their plasma concentrations are small, and the margins between normal and dangerous are narrow. A plasma potassium of 4 mmol/L is normal; 7 mmol/L can stop the heart within minutes.

These ions share a pattern. Each is mostly stored somewhere other than the plasma: potassium inside cells, calcium and phosphate in bone. The plasma level therefore depends both on **distribution** between the store and the extracellular fluid and on **external balance**, the difference between intake and excretion. The kidney sets the long-term balance, but shifts between compartments cause many of the sudden changes seen in hospital.

This lesson covers potassium in most detail, because its disorders are common and immediately dangerous, then calcium, magnesium and phosphate. It builds on the collecting duct physiology of [[renal/tubular-function]]. The cardiac electrophysiology behind the ECG changes is in [[cardiovascular/electrophysiology-ecg]], and the endocrine control of calcium and bone in [[endocrine/bone-calcium]].

## Potassium

### Where potassium is and how it moves

The body of a 70 kg adult contains about 3500 mmol of potassium. About 98% of it is inside cells, at a concentration of around 140–150 mmol/L, mostly in skeletal muscle. The extracellular fluid holds only about 60 mmol, at 3.5–5.0 mmol/L. The ratio between the two sets the resting membrane potential of every excitable cell.

Because so little potassium is outside cells, a tiny shift has a large effect on plasma levels.

::: widget plot
f: 4+35*x/E
x: 0, 2
y: 3, 10
sliders: E=14:8:20:1
hlines: 5.5; 6.5
labels: \text{plasma K}^+\text{ after a shift out of cells}
caption: Plasma potassium (mmol/L) when a given percentage of the body's intracellular potassium (about 3500 mmol) moves into an extracellular fluid of volume $E$ litres, starting from 4 mmol/L. A shift of just 1% raises plasma potassium by about 2.5 mmol/L. Smaller people (lower $E$) are affected more. The horizontal lines mark 5.5 and 6.5 mmol/L. A simplified teaching model ignoring renal excretion.
:::

::: definition Potassium homeostasis {#def-k}
**Internal balance** (distribution between cells and ECF) is controlled within minutes. Factors that move potassium **into cells** are **insulin**, **β₂-adrenergic stimulation** and **alkalosis**. Factors that move it **out of cells** are insulin deficiency, β-blockade, **metabolic acidosis** caused by mineral acids (less so organic acids), hyperosmolality, and cell breakdown (rhabdomyolysis, haemolysis, tumour lysis).

**External balance** is set mainly by the kidney, which excretes about 90% of the daily intake (typically 70–100 mmol); the colon excretes the rest. Filtered potassium is almost entirely reabsorbed before the distal nephron. The amount in the urine is determined by **secretion** in the connecting tubule and collecting duct.
:::

::: theorem The determinants of potassium secretion {#thm-k-secretion}
Potassium secretion by principal cells increases with:

1. **aldosterone**, which increases ENaC channels, ROMK channels and Na⁺/K⁺-ATPase;
2. **sodium delivery and flow** to the distal nephron, which increases sodium entry through ENaC (making the lumen more negative) and washes away secreted potassium;
3. **plasma potassium** itself, which stimulates aldosterone and directly increases secretion.

Conversely, low aldosterone, low distal sodium delivery and low flow reduce potassium secretion.
:::

::: proof
Principal cells take up potassium from the blood through the basolateral Na⁺/K⁺-ATPase and release it into the lumen through ROMK and BK channels. The driving force for exit is the electrochemical gradient across the apical membrane. Sodium entering through ENaC depolarises the apical membrane and makes the lumen negative, which favours the exit of positively charged potassium. More sodium delivered to these cells means more ENaC-driven entry and a more negative lumen. Faster flow keeps luminal potassium low, maintaining the concentration gradient. Aldosterone increases the number of channels and pumps involved in each step. This explains why loop and thiazide diuretics (more distal sodium and flow, plus aldosterone from volume loss) cause hypokalaemia, and why ACE inhibitors, spironolactone, amiloride and trimethoprim (which blocks ENaC) cause hyperkalaemia.
:::

### Hyperkalaemia

::: definition Hyperkalaemia {#def-hyperk}
**Hyperkalaemia** is a plasma potassium above 5.5 mmol/L. UK Kidney Association guidance grades it as **mild** (5.5–5.9 mmol/L), **moderate** (6.0–6.4 mmol/L) and **severe** (6.5 mmol/L or more). Its causes fall into three groups:

- **reduced excretion**: acute kidney injury, advanced chronic kidney disease, drugs (ACE inhibitors, angiotensin receptor blockers, mineralocorticoid receptor antagonists, amiloride, trimethoprim, NSAIDs, calcineurin inhibitors), hypoaldosteronism (Addison's disease, type 4 renal tubular acidosis);
- **shift out of cells**: insulin deficiency (diabetic ketoacidosis), acidosis, rhabdomyolysis, tumour lysis, haemolysis, β-blockers, digoxin toxicity, suxamethonium;
- **excess intake**, usually only when excretion is also impaired.
:::

Before treating, it is worth asking whether the result is real. **Pseudohyperkalaemia** is a high potassium in the sample but not in the patient. It occurs when red cells haemolyse during a difficult blood draw, when a sample is stored for hours or chilled before separation, when a tourniquet is left on with fist clenching, when platelets or white cells are very high, or when the sample is contaminated with potassium EDTA from a full blood count tube (which also produces an impossibly low calcium). If the patient is well, the ECG is normal and there is no reason for a high potassium, a prompt repeat sample is appropriate. If there is any doubt, treat while waiting.

Hyperkalaemia reduces the resting membrane potential gradient. At first this makes cardiac cells more excitable and speeds repolarisation; later it inactivates sodium channels and slows conduction. The **ECG changes** follow roughly in sequence: tall, peaked T waves; flattening and loss of P waves with a long PR interval; broadening of the QRS complex; a sine-wave pattern; and finally ventricular fibrillation or asystole. Bradycardia and heart block are common. The ECG is an insensitive guide: some people with severe hyperkalaemia have a nearly normal trace and then arrest.

The management of hyperkalaemia follows five steps, as set out in UK Kidney Association guidance. Doses below are typical adult regimens in that guidance, given for understanding; treatment follows the local protocol.

1. **Protect the heart.** If there are ECG changes, **intravenous calcium** (for example 30 mL of 10% calcium gluconate over 10 minutes, repeated if the ECG does not improve) stabilises the cardiac membrane within minutes for about 30–60 minutes. It does not lower potassium.
2. **Shift potassium into cells.** **Insulin with glucose** (for example 10 units of soluble insulin with 25 g of glucose) lowers potassium by about 0.6–1.0 mmol/L within 15–30 minutes, lasting several hours. Blood glucose must be monitored for several hours afterwards because hypoglycaemia is common, particularly in people with kidney disease. **Nebulised salbutamol** adds a further effect in severe cases.
3. **Remove potassium from the body.** Potassium binders (sodium zirconium cyclosilicate, patiromer) increase loss in the gut; restoring urine output in acute kidney injury and, if needed, **dialysis** remove potassium definitively.
4. **Monitor** potassium and glucose.
5. **Prevent** recurrence: stop or reduce causative drugs, treat the cause, and give dietary advice.

::: example Peaked T waves {#ex-hyperk}
A 79-year-old man with type 2 diabetes and chronic kidney disease (baseline eGFR 32) takes ramipril, spironolactone and co-trimoxazole, recently started for a chest infection. He feels weak. His potassium is 7.1 mmol/L, creatinine 280 µmol/L (baseline 170), venous pH 7.28. The ECG shows tall peaked T waves and a QRS duration of 130 ms. Explain the hyperkalaemia and outline the immediate management.
::: solution
**Why the potassium is high.** Four factors combine. His kidney function has worsened acutely (acute kidney injury on chronic kidney disease), reducing excretion. Ramipril lowers aldosterone, spironolactone blocks its receptor, and the trimethoprim in co-trimoxazole blocks ENaC like amiloride: all three reduce collecting duct secretion. The acidosis shifts potassium out of cells.

**Immediate management** (severe hyperkalaemia with ECG changes, following the local protocol): continuous cardiac monitoring; intravenous calcium gluconate to stabilise the myocardium; insulin with glucose to shift potassium into cells, with blood glucose monitoring for several hours; nebulised salbutamol as an adjunct; stop ramipril, spironolactone and co-trimoxazole (choosing another antibiotic); assess volume status and restore perfusion; start a potassium binder; and involve the renal team early, because refractory hyperkalaemia in acute kidney injury is an indication for dialysis ([[renal/acute-kidney-injury]]). Potassium is rechecked within an hour or two and then regularly, as the shifting treatments wear off.
:::
:::

### Hypokalaemia

::: definition Hypokalaemia {#def-hypok}
**Hypokalaemia** is a plasma potassium below 3.5 mmol/L; below 2.5 mmol/L is severe. Causes:

- **shift into cells**: insulin (including treatment of diabetic ketoacidosis), β₂-agonists, alkalosis, refeeding, thyrotoxic and familial periodic paralysis;
- **gastrointestinal loss**: diarrhoea, laxative misuse, high-output stomas, villous adenoma; vomiting causes hypokalaemia mainly through the kidney, as bicarbonate delivery and aldosterone increase potassium secretion;
- **renal loss**: loop and thiazide diuretics, osmotic diuresis, mineralocorticoid excess (primary aldosteronism, Cushing's syndrome, liquorice), Bartter and Gitelman syndromes, renal tubular acidosis types 1 and 2, hypomagnesaemia;
- **low intake**, which contributes but rarely causes hypokalaemia alone.
:::

Hypokalaemia hyperpolarises muscle and nerve. It causes weakness, cramps, constipation and ileus, and in severe cases paralysis and rhabdomyolysis. The ECG shows flattened T waves, ST depression and prominent **U waves**, with a risk of atrial and ventricular arrhythmias, especially in people taking digoxin or with heart disease. Chronic hypokalaemia impairs urine concentration (nephrogenic diabetes insipidus).

Where the cause is not obvious, a spot urine potassium separates renal from extrarenal loss: a urine potassium below about 20 mmol/L (or a low potassium:creatinine ratio) suggests the kidney is conserving potassium appropriately. Blood pressure and the acid–base status then narrow the renal causes. Hypokalaemia with hypertension suggests mineralocorticoid excess; hypokalaemia with normal blood pressure and alkalosis suggests diuretics, vomiting or Bartter/Gitelman syndromes; with acidosis, diarrhoea or renal tubular acidosis.

Replacement is oral where possible. Intravenous potassium is used for severe hypokalaemia, symptoms, ECG changes or when the gut cannot be used. Because concentrated intravenous potassium can cause fatal arrhythmias, its use is governed by strict local rules: premixed bags, limited infusion rates through peripheral lines (often around 10 mmol per hour), and cardiac monitoring for faster rates. **Magnesium** must be replaced at the same time if it is low; otherwise potassium wasting continues.

::: example A low potassium that would not stay corrected {#ex-hypok-workup}
A 46-year-old woman has a blood pressure of 168/104 mmHg despite three antihypertensive drugs. Her potassium is 3.1 mmol/L, bicarbonate 31 mmol/L and sodium 143 mmol/L. She takes no diuretics. Urine potassium is 45 mmol/L. What is the most likely diagnosis and how is it tested?
::: solution
Resistant hypertension with hypokalaemia, metabolic alkalosis, a high-normal sodium and inappropriate urinary potassium loss suggest **mineralocorticoid excess**, and the most common cause is **primary aldosteronism** (Conn's syndrome). Excess aldosterone increases sodium reabsorption through ENaC (expanding volume and raising blood pressure, which suppresses renin) and increases potassium and hydrogen secretion.

The screening test is the **aldosterone:renin ratio**, ideally with potassium corrected first and after reviewing interfering drugs. A high ratio is followed by confirmatory testing, adrenal imaging and usually adrenal vein sampling to distinguish a unilateral adenoma (which can be cured by surgery) from bilateral hyperplasia (treated with a mineralocorticoid receptor antagonist) ([[endocrine/adrenal]]).
:::
:::

::: example Sudden weakness after a large meal {#ex-thyrotoxic-pp}
A 28-year-old man of East Asian heritage wakes after a large carbohydrate meal and an evening at the gym unable to move his legs. He has lost weight recently and has a tremor. Potassium is 1.9 mmol/L. His TSH is undetectable and free T4 high. Explain, and identify the hazard of treatment.
::: solution
This is **thyrotoxic periodic paralysis**. Thyroid hormone increases the activity of Na⁺/K⁺-ATPase in muscle, and a carbohydrate load (insulin) or adrenaline after exercise drives potassium suddenly into cells. Total body potassium is normal; the problem is distribution. It is much more common in men of East Asian heritage, in whom genetic variants in a muscle potassium channel (Kir2.6) increase susceptibility.

The hazard is **rebound hyperkalaemia**: once the shift reverses, potassium returns from cells. Replacement is therefore given cautiously, in small amounts with frequent monitoring. A non-selective β-blocker such as propranolol reverses the adrenergic drive and helps. Definitive treatment of the thyrotoxicosis prevents further attacks ([[endocrine/thyroid]]).
:::
:::

## Calcium

::: definition Calcium balance {#def-ca}
Normal total plasma calcium is about 2.2–2.6 mmol/L. About 45% is **ionised** (the physiologically active fraction), about 40% is bound to albumin and the rest is complexed with anions such as citrate and phosphate. When albumin is low, total calcium falls while ionised calcium may be normal, so laboratories report an **adjusted (albumin-corrected) calcium**. A widely used formula is

$$
\text{adjusted Ca (mmol/L)} = \text{total Ca} + 0.02 \times (40 - \text{albumin (g/L)})
$$ {#eq-adjca}

though many laboratories use a locally derived version. Ionised calcium, measured on a blood gas analyser, is more reliable in critical illness. Alkalosis increases binding to albumin and lowers ionised calcium, which is why hyperventilation causes tingling and carpopedal spasm.

Calcium is controlled by:
- **parathyroid hormone** (PTH), released when ionised calcium falls; it releases calcium from bone, increases calcium reabsorption in the distal tubule, increases phosphate excretion and stimulates renal 1α-hydroxylase;
- **calcitriol** (1,25-dihydroxyvitamin D), made in the proximal tubule, which increases intestinal absorption of calcium and phosphate;
- **FGF23**, released from bone when phosphate is high; it increases phosphate excretion and suppresses calcitriol.
:::

### Hypercalcaemia

Hypercalcaemia (adjusted calcium above about 2.6 mmol/L) is usually caused by **primary hyperparathyroidism** in outpatients and by **malignancy** in inpatients; together they account for about 90% of cases. They can be separated with a single test: PTH is high or inappropriately normal in hyperparathyroidism and suppressed in malignancy and most other causes. Malignancy raises calcium through PTH-related peptide (squamous cancers, renal and breast cancer), bone destruction (myeloma, metastases), or excess calcitriol (lymphoma). Other causes include granulomatous disease (sarcoidosis, tuberculosis), vitamin D excess, thiazides, lithium, immobilisation, thyrotoxicosis and familial hypocalciuric hypercalcaemia.

Symptoms include thirst and polyuria (high calcium causes nephrogenic diabetes insipidus), constipation, abdominal pain, nausea, confusion, fatigue, depression, kidney stones and bone pain. The ECG may show a short QT interval. Severe hypercalcaemia causes dehydration, which reduces calcium excretion and raises calcium further: a vicious circle.

Management of severe or symptomatic hypercalcaemia starts with **intravenous fluids** (0.9% saline) to restore volume and promote calcium excretion. An intravenous **bisphosphonate** then reduces bone resorption, with its effect over two to four days. Other options in specific situations include calcitonin (rapid but short-lived), denosumab, glucocorticoids (for calcitriol-driven causes such as lymphoma and sarcoidosis) and dialysis. The cause is treated in parallel.

### Hypocalcaemia

Hypocalcaemia causes **neuromuscular irritability**: perioral and fingertip tingling, muscle cramps, carpopedal spasm, laryngospasm and seizures. Two bedside signs are taught: **Trousseau's sign** (carpal spasm when a blood pressure cuff is inflated above systolic pressure for up to three minutes) and **Chvostek's sign** (twitching of facial muscles when the facial nerve is tapped). The ECG shows a prolonged QT interval.

Causes include **hypoparathyroidism** (most often after thyroid or parathyroid surgery), **vitamin D deficiency**, **chronic kidney disease** (low calcitriol and high phosphate), **hypomagnesaemia** (which impairs PTH secretion and action), acute pancreatitis, rhabdomyolysis, citrate in massive transfusion, and "hungry bone" after parathyroidectomy. Symptomatic hypocalcaemia is treated with intravenous calcium gluconate, under cardiac monitoring; chronic hypocalcaemia with oral calcium and vitamin D (or active vitamin D in hypoparathyroidism and kidney disease).

## Magnesium and phosphate

::: definition Magnesium and phosphate {#def-mg}
**Magnesium** (normal plasma about 0.7–1.0 mmol/L) is mostly in bone and cells. It is reabsorbed mainly in the thick ascending limb. **Hypomagnesaemia** is caused by diarrhoea, alcohol use, malnutrition, loop and thiazide diuretics, proton pump inhibitors, and some drugs such as cisplatin. It causes weakness, tremor, arrhythmias (including torsades de pointes) and makes **hypokalaemia** and **hypocalcaemia** resistant to treatment. Hypermagnesaemia is uncommon and mainly iatrogenic in kidney failure or during magnesium treatment of pre-eclampsia.

**Phosphate** (normal plasma about 0.8–1.5 mmol/L) is mostly in bone and is essential for ATP and 2,3-bisphosphoglycerate. **Hypophosphataemia** is caused by shifts into cells (refeeding, insulin, respiratory alkalosis), renal loss (hyperparathyroidism, Fanconi syndrome, FGF23 excess) and poor intake or absorption. Severe hypophosphataemia (below about 0.3 mmol/L) causes muscle weakness, respiratory failure, heart failure, haemolysis and confusion. **Hyperphosphataemia** is common in kidney failure and in cell breakdown (tumour lysis, rhabdomyolysis); it lowers calcium by precipitation and, in chronic kidney disease, drives vascular calcification.
:::

::: example The refeeding collapse {#ex-refeed}
A 23-year-old woman with anorexia nervosa and a BMI of 13 kg/m² is admitted and started on nasogastric feeding. On day 3 she is confused, short of breath and weak. Phosphate is 0.25 mmol/L, potassium 2.9 mmol/L and magnesium 0.5 mmol/L. Explain.
::: solution
This is **refeeding syndrome**. During starvation, intracellular phosphate, potassium and magnesium become depleted even if plasma levels are normal. Feeding carbohydrate stimulates insulin, which drives glucose, phosphate, potassium and magnesium into cells and switches on anabolic processes that consume phosphate (ATP synthesis). Plasma levels fall sharply. Low phosphate causes respiratory muscle weakness, heart failure and confusion; low potassium and magnesium cause arrhythmias. Thiamine deficiency may also be unmasked.

**Prevention** (NICE nutrition guidance) is to identify high-risk people (very low BMI, little intake for over 10 days, rapid weight loss, low electrolytes before feeding), start feeding cautiously and build up slowly, give thiamine and vitamins before and during feeding, and check and replace phosphate, potassium and magnesium daily. Her treatment now is electrolyte replacement, slowing the feed, and monitoring in an appropriate setting ([[gastrointestinal/clinical-nutrition]] and [[psychiatry/eating-personality-disorders]]).
:::
:::

::: warning Treat the number in context {#warn-electrolytes}
Two common errors with electrolytes run in opposite directions. The first is to treat a laboratory value without checking whether it is real: haemolysed and EDTA-contaminated samples give false hyperkalaemia and hypocalcaemia, and a low total calcium with low albumin may be a normal ionised calcium. The second is to dismiss a dangerous value because the patient "looks well" or the ECG is normal: severe hyperkalaemia can cause arrest without warning ECG changes. When a result is surprising, repeat it promptly, and if it could be real and dangerous, treat while waiting.
:::

::: quiz
A 67-year-old man with diabetic ketoacidosis has a plasma potassium of 5.8 mmol/L on admission. Which statement is correct?
- [ ] His total body potassium is high, so potassium should be avoided until the level is below 4.0
- [x] His total body potassium is probably low; insulin will drive potassium into cells, so potassium will usually need to be added to his fluids once the level falls below about 5.5 mmol/L
- [ ] Insulin should be withheld until his potassium is normal
- [ ] The level reflects haemolysis and should be ignored
::: solution
In diabetic ketoacidosis, insulin deficiency and hyperosmolality shift potassium out of cells, while the osmotic diuresis loses it in the urine. The plasma level can be high while total body potassium is low. Insulin treatment moves potassium back into cells and plasma potassium can fall rapidly, causing dangerous hypokalaemia. UK protocols therefore add potassium to the fluids once the plasma level is below 5.5 mmol/L, with frequent monitoring ([[endocrine/endocrine-emergencies]]). Insulin is not withheld unless potassium is very low at presentation, in which case potassium replacement comes first.
:::
:::

::: history
In 1882 and 1883 the London physician and pharmacologist Sydney Ringer was studying isolated frog hearts. He found that hearts perfused with saline made up in London tap water continued to beat for hours, whereas hearts in saline made with distilled water soon stopped. He traced the difference to the calcium in the tap water and showed that the heart needs calcium and potassium in the right proportions to contract. The balanced salt solution he devised was the ancestor of "Ringer's solution" and of the Hartmann's solution used in hospitals today. In 1925 James Collip in Toronto prepared an active parathyroid extract and showed that it raised blood calcium and relieved tetany in animals whose parathyroids had been removed.
:::

## Where this leads

The role of the collecting duct in potassium and acid secretion links directly to [[renal/acid-base-disorders]], where hypokalaemia and alkalosis travel together. Hyperkalaemia as an indication for dialysis is in [[renal/acute-kidney-injury]]; chronic kidney disease–mineral and bone disorder, the calcium and phosphate disturbance of kidney failure, is in [[renal/chronic-kidney-disease]]. Parathyroid disease and vitamin D are developed in [[endocrine/bone-calcium]].

::: summary
- 98% of body potassium is intracellular; a 1% shift out of cells can raise plasma potassium by about 2.5 mmol/L. Insulin, β₂-agonists and alkalosis move potassium into cells.
- Urinary potassium is determined by secretion in the collecting duct, driven by aldosterone, distal sodium delivery and flow.
- Hyperkalaemia (mild 5.5–5.9, moderate 6.0–6.4, severe ≥ 6.5 mmol/L): exclude pseudohyperkalaemia, assess the ECG, then protect the heart (calcium), shift (insulin–glucose, salbutamol), remove (binders, dialysis), monitor and prevent.
- Hypokalaemia: shifts, gastrointestinal loss or renal loss; urine potassium and blood pressure separate the causes; replace magnesium too.
- Adjusted calcium ≈ total calcium + 0.02 × (40 − albumin). Hypercalcaemia is mostly primary hyperparathyroidism (PTH not suppressed) or malignancy (PTH suppressed); treat with fluids and a bisphosphonate.
- Hypocalcaemia causes tetany, seizures and a long QT; hypomagnesaemia causes refractory hypokalaemia and hypocalcaemia.
- Refeeding syndrome is a dangerous shift of phosphate, potassium and magnesium into cells; anticipate and prevent it.
:::

## Exercises

::: exercise Read the ECG {level=1}
List, in the usual order of appearance, the ECG changes of rising plasma potassium, and the ECG changes of hypokalaemia.
::: solution
**Rising potassium**: peaked T waves; prolonged PR interval and flattened or absent P waves; widened QRS; sine-wave pattern; ventricular fibrillation or asystole. Bradycardia and heart block may occur at any stage. **Hypokalaemia**: flattened or inverted T waves, ST depression, prominent U waves, an apparently prolonged QT (actually QU) interval, and atrial and ventricular ectopy and arrhythmias.
:::
:::

::: exercise Adjusted calcium {level=1 check="2.05+0.02*(40-25)"}
A woman with cirrhosis has a total calcium of 2.05 mmol/L and an albumin of 25 g/L. Calculate her adjusted calcium (mmol/L) using the formula in this lesson.
::: solution
Adjusted calcium $= 2.05 + 0.02 \times (40 - 25) = 2.05 + 0.30 = 2.35$ mmol/L, within the normal range. Her low total calcium reflects low albumin. If an accurate value matters (for example if she has symptoms), ionised calcium should be measured directly.
:::
:::

::: exercise Grade and classify {level=1}
Grade each potassium using the UK Kidney Association bands and give one likely cause: (a) 5.7 mmol/L in a man starting spironolactone for heart failure; (b) 6.3 mmol/L in a woman with acute kidney injury after sepsis; (c) 7.0 mmol/L in a young man after a crush injury; (d) 2.4 mmol/L in a woman with profuse diarrhoea.
::: solution
(a) **Mild** hyperkalaemia (5.5–5.9): reduced collecting duct secretion from aldosterone receptor blockade, often with some kidney impairment.

(b) **Moderate** hyperkalaemia (6.0–6.4): reduced excretion in acute kidney injury, with acidosis shifting potassium out of cells.

(c) **Severe** hyperkalaemia (6.5 or more): release of intracellular potassium from damaged muscle (rhabdomyolysis), often with acute kidney injury from myoglobin.

(d) **Severe hypokalaemia** (below 2.5): gastrointestinal loss of potassium-rich fluid, with secondary aldosteronism from volume loss increasing renal loss.
:::
:::

::: exercise A small shift, a big rise {level=2 check="0.01*3500/14"}
A person has 3500 mmol of intracellular potassium and an extracellular fluid volume of 14 L. If 1% of the intracellular potassium moves into the ECF (for example in rhabdomyolysis), by how much (in mmol/L) does plasma potassium rise, ignoring excretion?
::: solution
1% of 3500 mmol is 35 mmol. Spread over 14 L, this raises potassium by $35/14 = 2.5$ mmol/L, enough to take a normal potassium of 4.5 to a dangerous 7.0. Crush injury, rhabdomyolysis and tumour lysis can therefore cause severe hyperkalaemia within hours, especially when acute kidney injury prevents excretion.
:::
:::

::: exercise Trace the secretion {level=2}
Explain how each of the following changes potassium secretion in the collecting duct: (a) furosemide; (b) spironolactone; (c) trimethoprim; (d) a low-sodium diet with volume depletion and very low distal delivery, as in severe heart failure.
::: solution
(a) Furosemide increases sodium delivery and flow to the collecting duct and causes volume loss that raises aldosterone: **more secretion**, hypokalaemia.

(b) Spironolactone blocks the aldosterone receptor, reducing ENaC and ROMK: **less secretion**, hyperkalaemia risk.

(c) Trimethoprim blocks ENaC like amiloride, reducing the negative lumen voltage: **less secretion**. High doses or kidney impairment make hyperkalaemia more likely.

(d) Aldosterone is high, which should increase secretion, but very low sodium delivery and flow limit secretion. Potassium may then rise, particularly if an ACE inhibitor or mineralocorticoid receptor antagonist is added.
:::
:::

::: exercise Hypercalcaemia on the ward {level=2}
A 71-year-old woman is admitted with confusion, constipation and polyuria. Adjusted calcium is 3.4 mmol/L, phosphate 1.2 mmol/L, PTH suppressed, creatinine 140 µmol/L (baseline 80). She has a past history of breast cancer. Outline the likely mechanism and the principles of management.
::: solution
A suppressed PTH points away from hyperparathyroidism. With a history of breast cancer, the likely cause is **malignancy**, through bone metastases or PTH-related peptide. Hypercalcaemia causes nephrogenic diabetes insipidus and vomiting, so she is dehydrated, and her acute kidney injury reduces calcium excretion further.

Management: intravenous 0.9% saline to restore volume and promote calcium excretion, with careful fluid balance; an intravenous bisphosphonate, with the dose adjusted for kidney function according to the product information; stop thiazides, calcium and vitamin D supplements; and investigate and treat the cancer, which determines the outlook. Calcium is rechecked daily.
:::
:::

::: exercise The magnesium link {level=2}
A 58-year-old man on long-term omeprazole and a thiazide has a potassium of 2.9 mmol/L that remains below 3.2 mmol/L despite three days of oral potassium. His calcium is 1.95 mmol/L (adjusted). What test is missing, and why does it matter?
::: solution
**Magnesium**. Proton pump inhibitors reduce intestinal magnesium absorption and thiazides increase urinary loss. Low intracellular magnesium removes its normal block of ROMK channels, so potassium leaks into the urine and cannot be corrected until magnesium is replaced. Hypomagnesaemia also impairs PTH secretion and action, causing hypocalcaemia. Replacing magnesium, and reviewing the omeprazole and thiazide, allows potassium and calcium to correct.
:::
:::

::: exercise A potassium of 6.8 in the clinic {level=3}
A general practitioner's laboratory telephones a result: potassium 6.8 mmol/L in a 52-year-old man seen in clinic that morning for a routine review. He takes ramipril for hypertension; eGFR was 78 last year. The sample took six hours to reach the laboratory on a cold day, and his full blood count shows a platelet count of 650 × 10⁹/L. Discuss how to interpret and act on the result.
::: solution
Several features suggest **pseudohyperkalaemia**: a long delay before separation, cold storage (which slows the Na⁺/K⁺-ATPase of red cells, so potassium leaks out), and thrombocytosis (platelets release potassium during clotting). His kidney function was normal and ramipril alone rarely causes severe hyperkalaemia with normal kidneys.

However, a potassium of 6.8 could be real and dangerous, and one cannot be sure without seeing him. The safe approach is to contact him the same day, ask about symptoms, and arrange an urgent repeat sample processed quickly (for example a heparinised sample on a blood gas analyser or in an emergency department), with an ECG. If he cannot be assessed promptly, or has symptoms or ECG changes, he is sent to hospital. If the repeat is normal, the result was spurious; the thrombocytosis also deserves explanation in its own right ([[clinical-skills/laboratory-tests]]).
:::
:::

::: exercise Design the refeeding plan {level=3}
A ward is admitting several people at risk of refeeding syndrome each month. Describe the elements of a safe pathway, from identification to monitoring, explaining the physiological reason for each step.
::: solution
1. **Identify risk at admission** with a recognised screening tool (very low BMI, little or no intake for more than 5–10 days, rapid weight loss, alcohol misuse, low potassium, phosphate or magnesium before feeding). Risk is a property of the person's recent starvation, not of the plasma levels alone.
2. **Measure electrolytes before feeding** and correct severe deficits, recognising that plasma levels underestimate intracellular depletion.
3. **Give thiamine and multivitamins** before and during the first days, because carbohydrate metabolism uses thiamine and can precipitate Wernicke's encephalopathy.
4. **Start feeding slowly** (low initial energy, built up over several days) to limit the insulin surge that drives phosphate, potassium and magnesium into cells.
5. **Monitor** phosphate, potassium and magnesium daily for at least the first few days, along with fluid balance, heart rate and oedema (insulin also causes sodium and water retention).
6. **Replace** electrolytes promptly according to local protocols, and slow feeding if levels fall sharply.
7. **Involve** dietitians and, for eating disorders, specialist teams, with clear escalation criteria.
:::
:::
