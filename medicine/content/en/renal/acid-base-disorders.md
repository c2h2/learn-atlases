An arterial blood gas is one of the fastest and most informative tests in acute medicine. Within a minute it shows whether a patient is acidaemic or alkalaemic, whether the lungs or the metabolism are responsible, and, with a little arithmetic, whether there is a second hidden disorder. The arithmetic matters. Many of the most important acid–base pictures, such as salicylate poisoning, diabetic ketoacidosis with vomiting or sepsis in a person with chronic lung disease, involve two or three disorders at once, and they are only visible to someone who checks each number against what it should be.

The physiology of buffers, the respiratory and renal control of pH and the derivation of the Henderson–Hasselbalch equation are in [[physiology/acid-base]]. This lesson applies them clinically. It sets out a method for reading a blood gas, then works through the four primary disorders, the anion gap and the other calculations that reveal mixed disorders, and the renal tubular acidoses. Each step is illustrated with worked cases.

Units: UK laboratories report $P_{a}\text{CO}_2$ in kPa; much of the literature and the compensation rules use mmHg. To convert, 1 kPa = 7.5 mmHg. Both are given here.

## The method

::: definition Normal values and the primary disorders {#def-method}
Typical arterial reference ranges are: **pH** 7.35–7.45; **$P_a\text{CO}_2$** 4.7–6.0 kPa (35–45 mmHg); **bicarbonate** 22–26 mmol/L. A pH below 7.35 is **acidaemia** and above 7.45 is **alkalaemia**. The processes that cause them are **acidosis** and **alkalosis**.

The four primary disorders are:
- **metabolic acidosis**: a primary fall in bicarbonate;
- **metabolic alkalosis**: a primary rise in bicarbonate;
- **respiratory acidosis**: a primary rise in $P_a\text{CO}_2$ (hypoventilation);
- **respiratory alkalosis**: a primary fall in $P_a\text{CO}_2$ (hyperventilation).

**Compensation** is the secondary change in the other variable that limits the change in pH: the lungs compensate for metabolic disorders within minutes to hours, the kidneys for respiratory disorders over three to five days. Compensation rarely returns pH fully to normal.
:::

The pH is set by the ratio of bicarbonate to $\text{CO}_2$:

$$
\text{pH} = 6.1 + \log_{10} \frac{[\text{HCO}_3^-]}{0.23 \times P_a\text{CO}_2\,(\text{kPa})}
$$ {#eq-hh}

(with mmHg the factor is 0.03 instead of 0.23). Bicarbonate is controlled by the kidneys and $\text{CO}_2$ by the lungs, so pH is a ratio of kidney to lung. Every disorder changes one side of the ratio; compensation moves the other side in the same direction.

::: widget plot
f: 6.1+log10(x/(0.23*p))
x: 4, 45
y: 6.8, 7.8
sliders: p=5.3:2:12:0.1
hlines: 7.35; 7.45
labels: \text{pH at }P_a\text{CO}_2 = p\text{ kPa}
caption: pH against plasma bicarbonate (mmol/L) at a chosen $P_a\text{CO}_2$, from the Henderson–Hasselbalch equation. At 5.3 kPa, a bicarbonate of 24 gives a pH of about 7.39. Lower $p$ (hyperventilation) to see how respiratory compensation lifts the pH of a metabolic acidosis; raise it to model CO₂ retention. Because the scale is logarithmic, the same loss of bicarbonate changes pH far more when bicarbonate is already low. A simplified teaching model.
:::

::: theorem Reading a blood gas in five steps {#thm-five-steps}
1. **Look at the patient and the oxygenation.** Is the person hypoxic? A blood gas is interpreted with the clinical picture.
2. **Is there acidaemia or alkalaemia?** Look at the pH.
3. **What is the primary disorder?** If $P_a\text{CO}_2$ moves in the direction that explains the pH, the primary disorder is respiratory; if bicarbonate does, it is metabolic.
4. **Is the compensation appropriate?** Compare the other variable with the expected value from the rules below. A value outside the expected range means a **second primary disorder**.
5. **In any metabolic acidosis, calculate the anion gap**, correct it for albumin, and if it is raised, compare the rise in the gap with the fall in bicarbonate (the delta ratio). Consider the osmolal gap if a toxic alcohol is possible.
:::

The expected compensation rules are empirical, derived from people with single disorders.

| Primary disorder | Expected compensation |
|---|---|
| Metabolic acidosis | $P_a\text{CO}_2$ (mmHg) $= 1.5 \times [\text{HCO}_3^-] + 8 \pm 2$ (Winter's formula); in kPa, about $0.2 \times [\text{HCO}_3^-] + 1.1 \pm 0.3$ |
| Metabolic alkalosis | $P_a\text{CO}_2$ rises about 0.7 mmHg per 1 mmol/L rise in bicarbonate, rarely above about 55–60 mmHg (7.3–8 kPa) |
| Acute respiratory acidosis | bicarbonate rises about 1 mmol/L per 10 mmHg (1.3 kPa) rise in $P_a\text{CO}_2$ |
| Chronic respiratory acidosis | bicarbonate rises about 3.5 mmol/L per 10 mmHg rise |
| Acute respiratory alkalosis | bicarbonate falls about 2 mmol/L per 10 mmHg fall |
| Chronic respiratory alkalosis | bicarbonate falls about 4–5 mmol/L per 10 mmHg fall |

::: proof
The rules reflect the time scale and mechanism of each defence. In acute respiratory disorders, only chemical buffering is available: $\text{CO}_2$ is hydrated to carbonic acid, and the non-bicarbonate buffers (mainly haemoglobin and proteins) take up the hydrogen ions, generating a little bicarbonate. Hence the small change of about 1 mmol/L per 10 mmHg. Over several days the kidney adds its own response, increasing acid excretion as ammonium and generating new bicarbonate in respiratory acidosis, or reducing bicarbonate reabsorption in respiratory alkalosis. Hence the larger chronic changes. In metabolic acidosis, peripheral and central chemoreceptors sense the low pH and increase ventilation within minutes, giving Winter's linear relationship. In metabolic alkalosis, the ventilatory response is weak because hypoventilation causes hypoxaemia, which itself drives ventilation, so compensation is limited.
:::

## Metabolic acidosis

The **anion gap** is the key to classifying metabolic acidosis. Plasma must be electrically neutral. The measured cations (sodium, sometimes potassium) exceed the measured anions (chloride and bicarbonate); the difference is made up of unmeasured anions, mainly albumin, phosphate and sulphate.

$$
\text{AG} = [\text{Na}^+] - ([\text{Cl}^-] + [\text{HCO}_3^-])
$$ {#eq-ag}

A typical reference range with modern analysers is about 8–12 mmol/L (older texts quote 12 ± 4), but each laboratory's own range should be used. When an acid HA is added to the plasma, the H⁺ is buffered by bicarbonate, and the A⁻ stays as an unmeasured anion: bicarbonate falls and the gap rises. When bicarbonate is lost and replaced by chloride, the gap stays normal.

Albumin is the main normal unmeasured anion, so **hypoalbuminaemia lowers the gap** and can hide a raised one. A common correction adds about 2.5 mmol/L to the gap for every 10 g/L that albumin is below 40 g/L.

::: definition Raised anion gap metabolic acidosis {#def-aga}
A **raised anion gap metabolic acidosis** is caused by the accumulation of an acid whose anion is not chloride. The main causes are:

- **lactic acidosis**: type A from tissue hypoperfusion or hypoxia (shock, sepsis, cardiac arrest, mesenteric ischaemia); type B without hypoperfusion (liver failure, metformin accumulation, malignancy, some drugs);
- **ketoacidosis**: diabetic, alcoholic and starvation;
- **kidney failure**: retention of sulphate, phosphate and organic anions;
- **toxins**: methanol (formate), ethylene glycol (glycolate and oxalate), salicylate, and pyroglutamic acid (5-oxoproline), associated with regular paracetamol use in malnourished or septic people.
:::

::: definition Normal anion gap (hyperchloraemic) metabolic acidosis {#def-naga}
A **normal anion gap metabolic acidosis** results from **loss of bicarbonate** or **failure of renal acid excretion**, with chloride rising to replace the lost bicarbonate. The main causes are:

- **gastrointestinal bicarbonate loss**: diarrhoea, high-output ileostomy or fistula, ureteric diversion into bowel;
- **renal tubular acidosis** (RTA);
- **carbonic anhydrase inhibitors** (acetazolamide);
- **large volumes of 0.9% saline**, which contains 154 mmol/L of chloride and no bicarbonate.

The **urine anion gap**, $[\text{Na}^+]_u + [\text{K}^+]_u - [\text{Cl}^-]_u$, estimates urinary ammonium. In diarrhoea the kidney excretes plenty of ammonium (with chloride), so the urine anion gap is **negative**. In distal RTA, ammonium excretion is impaired and the gap is **positive**.
:::

### The renal tubular acidoses

| Type | Defect | Urine pH during acidosis | Potassium | Typical causes |
|---|---|---|---|---|
| Type 1 (distal) | collecting duct cannot secrete H⁺ | always above 5.5 | low | Sjögren's syndrome, SLE, amphotericin, inherited forms; nephrocalcinosis and stones are common |
| Type 2 (proximal) | proximal bicarbonate reabsorption reduced | can fall below 5.5 once bicarbonate is low | low | Fanconi syndrome (myeloma, tenofovir, cystinosis), acetazolamide |
| Type 4 (hyperkalaemic) | low aldosterone or aldosterone resistance | usually below 5.5 | high | diabetic kidney disease (hyporeninaemic hypoaldosteronism), ACE inhibitors, angiotensin receptor blockers, spironolactone, adrenal insufficiency |

Type 4 is by far the commonest in adults. Its acidosis is usually mild, and hyperkalaemia is the main clinical problem. Hyperkalaemia itself reduces ammonia production in the proximal tubule, which worsens the acidosis.

### The delta ratio

In a pure raised anion gap acidosis, each extra unmeasured anion is matched by roughly one lost bicarbonate. Comparing the two changes reveals a hidden second disorder.

$$
\text{delta ratio} = \frac{\Delta \text{AG}}{\Delta [\text{HCO}_3^-]} = \frac{\text{AG} - 12}{24 - [\text{HCO}_3^-]}
$$ {#eq-delta}

As a guide: below 0.4 suggests a normal anion gap acidosis; 0.4–0.8 a combined raised and normal gap acidosis; 1–2 a pure raised anion gap acidosis (lactic acidosis tends towards 1.6, because some lactate leaves the plasma and cells buffer some H⁺; ketoacidosis towards 1, because ketones are lost in urine); above 2 suggests a coexisting **metabolic alkalosis** or a high baseline bicarbonate from chronic respiratory acidosis. These are rules of thumb, not precise thresholds.

::: example Ketoacidosis with vomiting {#ex-deltadelta}
A 19-year-old woman with type 1 diabetes has vomited for two days. Results: pH 7.32, $P_a\text{CO}_2$ 4.3 kPa (32 mmHg), bicarbonate 16 mmol/L, sodium 136, chloride 88 mmol/L, glucose 28 mmol/L, blood ketones 5.8 mmol/L, albumin 42 g/L. Interpret.
::: solution
**Step 2**: pH 7.32, acidaemia.

**Step 3**: bicarbonate is low, so a metabolic acidosis.

**Step 4**: Winter's formula: expected $P_a\text{CO}_2 = 1.5 \times 16 + 8 = 32 \pm 2$ mmHg. Measured 32 mmHg, appropriate.

**Step 5**: AG $= 136 - (88 + 16) = 32$, raised. Albumin is normal. With ketones of 5.8 this is **diabetic ketoacidosis**.

Delta ratio $= (32 - 12)/(24 - 16) = 20/8 = 2.5$. The bicarbonate has fallen far less than the gap has risen. Something has added bicarbonate: two days of **vomiting** have caused a **metabolic alkalosis** (loss of gastric HCl). The low chloride supports this.

So she has two primary disorders: diabetic ketoacidosis and metabolic alkalosis from vomiting. The near-normal bicarbonate disguises how severe her ketoacidosis is; her ketone level and anion gap give the true picture ([[endocrine/endocrine-emergencies]]).
:::
:::

::: example Poisoning with a gap in the osmolality {#ex-methanol}
A 45-year-old man is brought in drowsy and complaining of blurred vision. Results: pH 7.12, $P_a\text{CO}_2$ 2.9 kPa (22 mmHg), bicarbonate 7 mmol/L, sodium 140, chloride 101 mmol/L, glucose 5 mmol/L, urea 5 mmol/L, lactate 2.0 mmol/L, ketones negative. Measured plasma osmolality is 330 mOsm/kg. Interpret.
::: solution
Severe metabolic acidosis. Winter's: $1.5 \times 7 + 8 = 18.5 \pm 2$ mmHg; measured 22 mmHg is slightly higher than expected, suggesting he is beginning to tire or has a degree of respiratory depression, which is dangerous.

AG $= 140 - (101 + 7) = 32$, markedly raised, and neither lactate nor ketones explain it.

**Osmolal gap**: calculated osmolality $= 2 \times 140 + 5 + 5 = 290$. Measured 330. Gap $= 40$ mOsm/kg (normal below about 10). An unmeasured, osmotically active substance is present. A raised anion gap with a raised osmolal gap and visual symptoms points to **methanol** poisoning (formate damages the optic nerve); ethylene glycol poisoning gives a similar picture with kidney injury and calcium oxalate crystals in urine.

Management follows toxicology advice (in the UK, TOXBASE and the National Poisons Information Service): an antidote that blocks alcohol dehydrogenase (fomepizole, or ethanol), haemodialysis to remove the toxin and its metabolites, correction of acidosis and folate or folinic acid ([[emergency-critical-care/poisoning]]). Note that the osmolal gap falls as the alcohol is metabolised to acid, so a late presentation can show a high anion gap with a normal osmolal gap.
:::
:::

## Metabolic alkalosis

::: definition Metabolic alkalosis {#def-ma}
**Metabolic alkalosis** is a primary rise in bicarbonate. Two things are needed: a process that **generates** bicarbonate (loss of acid from the stomach or in urine, or gain of alkali) and a process that **maintains** it by stopping the kidney from excreting the excess. The usual maintaining factors are volume depletion, chloride depletion, hypokalaemia and excess mineralocorticoid.

It is classified by urine chloride:
- **chloride-responsive** (urine chloride below about 20 mmol/L): vomiting, nasogastric drainage, after diuretic use has stopped, after correction of chronic hypercapnia; corrected by giving sodium chloride and potassium chloride;
- **chloride-resistant** (urine chloride above about 40 mmol/L): current diuretic use, mineralocorticoid excess (primary aldosteronism, Cushing's syndrome, liquorice), Bartter and Gitelman syndromes, severe hypokalaemia.
:::

::: example Vomiting from pyloric obstruction {#ex-vomiting}
A 68-year-old man with a gastric cancer has vomited after every meal for a week. Results: pH 7.53, $P_a\text{CO}_2$ 6.5 kPa (49 mmHg), bicarbonate 39 mmol/L, sodium 134, chloride 82, potassium 2.8 mmol/L, urea 14 mmol/L, urine chloride 8 mmol/L, urine pH 5.5. Interpret.
::: solution
Alkalaemia with a high bicarbonate: **metabolic alkalosis**. Expected $P_a\text{CO}_2 = 40 + 0.7 \times (39 - 24) = 50.5$ mmHg, measured 49: appropriate respiratory compensation.

**Generation**: vomiting removes HCl from the stomach. For every H⁺ secreted by the parietal cell, one bicarbonate enters the blood.

**Maintenance**: volume and chloride depletion (urine chloride 8) make the kidney reabsorb sodium avidly with bicarbonate in the proximal tubule; aldosterone (from volume loss) increases distal H⁺ and potassium secretion. The result is the classic **paradoxical aciduria**: the urine is acidic despite systemic alkalosis, because the kidney is giving priority to volume and potassium.

**Treatment**: 0.9% saline with potassium chloride, following local guidance. Chloride and volume allow the kidney to excrete the excess bicarbonate, and the alkalosis corrects. The obstruction itself needs surgical or endoscopic management.
:::
:::

## Respiratory disorders

::: definition Respiratory acidosis and alkalosis {#def-resp}
**Respiratory acidosis** results from alveolar hypoventilation: depressed respiratory drive (opioids, sedatives, brain injury), neuromuscular weakness (Guillain–Barré syndrome, myasthenia, motor neurone disease), chest wall disease (severe kyphoscoliosis, obesity hypoventilation) or lung disease (COPD, severe asthma when tiring). **Acute** respiratory acidosis has a small bicarbonate rise; **chronic** respiratory acidosis a larger one from renal compensation.

**Respiratory alkalosis** results from hyperventilation: anxiety and pain, hypoxaemia (pneumonia, pulmonary embolism, altitude), sepsis, liver failure, pregnancy (progesterone stimulates ventilation), salicylate poisoning and central nervous system disease.
:::

A useful pattern is **acute-on-chronic** respiratory acidosis: a person with COPD and a stable high $P_a\text{CO}_2$ with a correspondingly high bicarbonate develops a chest infection; $P_a\text{CO}_2$ rises further, bicarbonate does not have time to rise in step, and pH falls. Another is **post-hypercapnic alkalosis**: when a person with chronic $\text{CO}_2$ retention is ventilated and $P_a\text{CO}_2$ is lowered quickly, the compensatory high bicarbonate remains and a metabolic alkalosis appears. Gentle reduction of $P_a\text{CO}_2$ and chloride replacement avoid it.

::: example Two disorders from one bottle {#ex-aspirin}
A 23-year-old woman has taken a large number of aspirin tablets some hours earlier. She has tinnitus, nausea and is breathing fast. Results: pH 7.46, $P_a\text{CO}_2$ 3.2 kPa (24 mmHg), bicarbonate 16 mmol/L, sodium 140, chloride 102 mmol/L. Interpret.
::: solution
The pH is slightly alkalaemic. $P_a\text{CO}_2$ is low and bicarbonate is low.

If the primary disorder were metabolic acidosis, Winter's formula would predict $1.5 \times 16 + 8 = 32 \pm 2$ mmHg. The measured 24 mmHg is far lower: there is an additional **respiratory alkalosis**. AG $= 140 - (102 + 16) = 22$, raised: there is a **raised anion gap metabolic acidosis**.

This is the classic salicylate picture. Salicylate stimulates the respiratory centre directly (respiratory alkalosis, often the first change), and uncouples oxidative phosphorylation, causing lactic and keto-acid accumulation (metabolic acidosis). In adults the two often coexist, producing a near-normal or alkalaemic pH.

The danger sign is a falling pH. Acidaemia allows more salicylate (a weak acid) to remain un-ionised and cross into the brain. If she becomes drowsy or needs intubation, ventilation must keep $P_a\text{CO}_2$ low, because a rise in $\text{CO}_2$ would worsen acidaemia and drive salicylate into the brain. Management follows toxicology guidance: activated charcoal if appropriate, intravenous sodium bicarbonate to alkalinise the urine (trapping ionised salicylate in the urine), potassium replacement, and haemodialysis for severe poisoning ([[emergency-critical-care/poisoning]]).
:::
:::

::: warning A normal pH can hide two serious disorders {#warn-normal-ph}
A normal pH does not mean a normal acid–base state. When two primary disorders push pH in opposite directions, the pH can sit in the normal range while bicarbonate and $P_a\text{CO}_2$ are both badly abnormal. Examples are salicylate poisoning (metabolic acidosis with respiratory alkalosis) and ketoacidosis with vomiting (metabolic acidosis with metabolic alkalosis). Always check the compensation and the anion gap, even when the pH is 7.40. Similarly, a normal anion gap in a person with low albumin may conceal a raised gap; correct it.
:::

::: quiz
A 72-year-old man with COPD has these results when well: pH 7.37, $P_a\text{CO}_2$ 8.0 kPa (60 mmHg), bicarbonate 33 mmol/L. Which description fits best?
- [ ] Acute respiratory acidosis
- [x] Chronic respiratory acidosis with appropriate renal compensation
- [ ] Metabolic alkalosis with respiratory compensation
- [ ] Mixed respiratory acidosis and metabolic acidosis
::: solution
$P_a\text{CO}_2$ is 20 mmHg above normal. In chronic respiratory acidosis bicarbonate should rise about 3.5 mmol/L per 10 mmHg, so by about 7 mmol/L, to about 31. His 33 is close to this, and the pH is almost normal: a **chronic respiratory acidosis with appropriate renal compensation**. An acute rise of the same size would increase bicarbonate by only about 2 mmol/L and lower pH to about 7.26. A primary metabolic alkalosis would make the pH alkalaemic, and the $P_a\text{CO}_2$ of 60 mmHg would be at the limit of compensation.
:::
:::

::: history
In 1908 the American biochemist Lawrence Henderson described how carbonic acid and bicarbonate buffer the blood, and in 1916 the Danish physician Karl Albert Hasselbalch rewrote Henderson's equation in logarithmic form using the then-new pH notation. Clinical acid–base analysis grew from a crisis. During the 1952 poliomyelitis epidemic in Copenhagen, many patients with respiratory paralysis had a high plasma bicarbonate that was at first interpreted as a metabolic alkalosis. The anaesthetist Bjørn Ibsen argued that it reflected $\text{CO}_2$ retention, and the laboratory physician Poul Astrup developed methods to measure pH and $P_a\text{CO}_2$ at the bedside. Ibsen's introduction of tracheostomy and manual positive-pressure ventilation, delivered for weeks by medical students, cut mortality sharply and helped found intensive care medicine.
:::

## Where this leads

Acidosis in acute kidney injury, and the decision to start dialysis for acidosis, are in [[renal/acute-kidney-injury]]. The chronic metabolic acidosis of chronic kidney disease, and its treatment with oral bicarbonate, is in [[renal/chronic-kidney-disease]]. Diabetic ketoacidosis is covered in [[endocrine/endocrine-emergencies]], respiratory failure in [[respiratory/respiratory-failure]], and the poisonings in [[emergency-critical-care/poisoning]].

::: summary
- Normal values: pH 7.35–7.45, $P_a\text{CO}_2$ 4.7–6.0 kPa (35–45 mmHg), bicarbonate 22–26 mmol/L. pH depends on the ratio of bicarbonate (kidney) to $\text{CO}_2$ (lung).
- Read a gas in five steps: patient and oxygen; pH; primary disorder; expected compensation; anion gap and delta ratio (and osmolal gap if relevant).
- Winter's formula: expected $P_a\text{CO}_2$ (mmHg) $= 1.5 \times \text{HCO}_3^- + 8 \pm 2$. Compensation outside the expected range means a second disorder.
- Anion gap $= \text{Na}^+ - (\text{Cl}^- + \text{HCO}_3^-)$; correct for low albumin (+2.5 per 10 g/L below 40). Raised gap: lactate, ketones, kidney failure, toxins. Normal gap: diarrhoea, RTA, saline, acetazolamide.
- The delta ratio (ΔAG/ΔHCO₃⁻) reveals a hidden metabolic alkalosis (above 2) or a coexisting normal gap acidosis (below 1).
- A raised osmolal gap with a raised anion gap suggests methanol or ethylene glycol.
- Metabolic alkalosis needs generation and maintenance; urine chloride separates chloride-responsive from chloride-resistant causes.
- A normal pH can conceal two opposing disorders.
:::

## Exercises

::: exercise Anion gap {level=1 check="138-(110+14)"}
Calculate the anion gap for: sodium 138, chloride 110, bicarbonate 14 mmol/L. Is this a raised or normal gap acidosis, and give two possible causes.
::: solution
AG $= 138 - (110 + 14) = 14$ mmol/L, at or just above the upper end of a typical modern reference range: essentially a **normal anion gap (hyperchloraemic) acidosis**, with chloride replacing bicarbonate. Causes include diarrhoea, renal tubular acidosis, large volumes of 0.9% saline and acetazolamide. The urine anion gap helps separate gastrointestinal from renal causes.
:::
:::

::: exercise Winter's formula {level=1 check="1.5*12+8"}
A person with a metabolic acidosis has a bicarbonate of 12 mmol/L. Calculate the expected $P_a\text{CO}_2$ in mmHg (central value, without the ±2).
::: solution
Expected $P_a\text{CO}_2 = 1.5 \times 12 + 8 = 26$ mmHg (about 3.5 kPa), range 24–28 mmHg. A measured value above 28 means a coexisting respiratory acidosis (often a tiring patient); below 24, a coexisting respiratory alkalosis.
:::
:::

::: exercise Name the disorders {level=1}
Name the primary disorder and say whether compensation looks appropriate: (a) pH 7.25, $P_a\text{CO}_2$ 8.5 kPa (64 mmHg), bicarbonate 27; (b) pH 7.50, $P_a\text{CO}_2$ 3.6 kPa (27 mmHg), bicarbonate 21; (c) pH 7.30, $P_a\text{CO}_2$ 3.7 kPa (28 mmHg), bicarbonate 13.
::: solution
(a) **Acute respiratory acidosis**: $P_a\text{CO}_2$ has risen by 24 mmHg, so bicarbonate should rise by about 2.4, to about 26–27. Appropriate for an acute disorder; for example, opioid overdose or a tiring person with asthma.

(b) **Acute respiratory alkalosis**: $P_a\text{CO}_2$ has fallen by 13 mmHg, so bicarbonate should fall by about 2.6, to about 21. Appropriate; for example, anxiety, pain or pulmonary embolism.

(c) **Metabolic acidosis**: Winter's predicts $1.5 \times 13 + 8 = 27.5 \pm 2$ mmHg; measured 28. Appropriate respiratory compensation. The next step is the anion gap.
:::
:::

::: exercise Correct the gap for albumin {level=2 check="(140-104-22)+0.25*(40-20)"}
A septic patient in intensive care has sodium 140, chloride 104, bicarbonate 22 mmol/L and albumin 20 g/L. Calculate the albumin-corrected anion gap (adding 0.25 mmol/L for each g/L of albumin below 40) and interpret.
::: solution
Uncorrected AG $= 140 - (104 + 22) = 14$. Correction $= 0.25 \times (40 - 20) = 5$. Corrected AG $= 19$ mmol/L, clearly **raised**. Low albumin has hidden an accumulation of unmeasured anions, most likely lactate in sepsis. Lactate should be measured.
:::
:::

::: exercise The osmolal gap {level=2 check="320-(2*138+6+4)"}
A man is found confused next to an empty bottle of antifreeze. Measured plasma osmolality is 320 mOsm/kg; sodium 138, glucose 6 and urea 4 mmol/L. Calculate the osmolal gap in mOsm/kg and explain its significance.
::: solution
Calculated osmolality $= 2 \times 138 + 6 + 4 = 286$. Gap $= 320 - 286 = 34$ mOsm/kg, markedly raised. The most likely unmeasured osmole is **ethylene glycol**. As it is metabolised to glycolate and oxalate, the osmolal gap falls and the anion gap rises, causing metabolic acidosis, acute kidney injury and calcium oxalate crystals. Urgent toxicology advice, an alcohol dehydrogenase blocker and haemodialysis may be needed.
:::
:::

::: exercise Interpret the urine {level=2}
Two people have a normal anion gap metabolic acidosis with bicarbonate 15 mmol/L. Person A: urine sodium 40, potassium 30, chloride 100 mmol/L; urine pH 5.2. Person B: urine sodium 50, potassium 30, chloride 55 mmol/L; urine pH 6.6; plasma potassium 2.9 mmol/L, nephrocalcinosis on ultrasound. Explain each.
::: solution
Person A: urine anion gap $= 40 + 30 - 100 = -30$, negative. The kidney is excreting a lot of ammonium (with chloride), and the urine is acidic. Renal acid excretion is working: the acidosis is from **gastrointestinal bicarbonate loss**, most likely diarrhoea.

Person B: urine anion gap $= 50 + 30 - 55 = +25$, positive. Little ammonium is being excreted and urine pH stays above 5.5 despite systemic acidosis. With hypokalaemia and nephrocalcinosis this is **distal (type 1) renal tubular acidosis**. Causes include Sjögren's syndrome and other autoimmune diseases.
:::
:::

::: exercise A gas in sepsis with COPD {level=3}
A 70-year-old woman with COPD has pneumonia and is hypotensive. Results: pH 7.18, $P_a\text{CO}_2$ 7.8 kPa (59 mmHg), bicarbonate 21 mmol/L, sodium 138, chloride 100 mmol/L, lactate 6 mmol/L, albumin 30 g/L. Her previous gas when well showed bicarbonate 30 mmol/L. Identify all the disorders present.
::: solution
**Respiratory acidosis**: $P_a\text{CO}_2$ is high. Her bicarbonate when well (30) suggests chronic compensated respiratory acidosis, now acute-on-chronic as pneumonia worsens ventilation.

**Metabolic acidosis**: with $P_a\text{CO}_2$ of 59 mmHg, chronic compensation would predict a bicarbonate of about $24 + 3.5 \times 1.9 \approx 31$. Her bicarbonate of 21 is much lower: a metabolic acidosis has consumed about 10 mmol/L.

**Anion gap**: $138 - (100 + 21) = 17$; corrected for albumin, $17 + 0.25 \times 10 = 19.5$, raised. With lactate 6, this is a **lactic acidosis** from septic shock.

Using her own baseline bicarbonate of 30, the bicarbonate has fallen by 9 while the corrected gap has risen by about 7.5: a delta ratio near 1, consistent with a pure raised gap acidosis on top of her chronic respiratory acidosis.

So three processes coexist: chronic respiratory acidosis, an acute worsening of respiratory acidosis, and lactic acidosis. Both her ventilation (she may need non-invasive ventilation or intubation) and her circulation need urgent support.
:::
:::

::: exercise Design a blood gas checklist {level=3}
Design a one-page checklist that a junior doctor could use to interpret any arterial blood gas safely at night. Explain why each item is there.
::: solution
1. **Patient details and $F_I\text{O}_2$**: oxygenation cannot be interpreted without knowing the inspired oxygen; a "normal" $P_a\text{O}_2$ on 60% oxygen is severe hypoxaemia.
2. **Arterial or venous?** Venous gases are useful for pH, bicarbonate, lactate and electrolytes but not for oxygenation; venous $P\text{CO}_2$ is a few mmHg higher than arterial.
3. **pH**: acidaemia or alkalaemia.
4. **Primary disorder**: which of $P_a\text{CO}_2$ and bicarbonate explains the pH.
5. **Expected compensation** from the rules (written on the sheet), and a statement of any second disorder if compensation is outside range.
6. **Anion gap**, with albumin correction, in every metabolic acidosis; **delta ratio** if the gap is raised.
7. **Lactate, glucose and ketones**, which explain most raised gaps.
8. **Osmolal gap** if the cause of a raised gap is unexplained or poisoning is possible.
9. **Potassium**, because acidosis and alkalosis shift it and its treatment may be urgent.
10. **Clinical synthesis and escalation**: a one-line summary of all disorders and their likely causes, and clear criteria for senior review (pH below 7.2, rising $P_a\text{CO}_2$, lactate above 4, suspected poisoning).
:::
:::
