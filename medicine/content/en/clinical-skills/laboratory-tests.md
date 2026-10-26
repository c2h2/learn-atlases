Laboratory tests are among the most frequent clinical actions: a typical hospital admission generates dozens of results. Each number answers a question only if the question was clear, the sample was taken and handled correctly, and the result is read against the right reference and the patient in front of you. This chapter is about reading results well. It covers how reference intervals are made, how errors enter before the sample reaches the analyser, how test accuracy and prevalence determine what a result means, and how to interpret the commonest blood tests, blood gases and urinalysis.

The probabilistic reasoning comes from [[clinical-skills/clinical-reasoning]]. How laboratories work, and how tissue samples are processed, is covered in [[pathology/diagnostic-pathology]].

## From the patient to the result

A result passes through three phases, and errors can enter in each.

::: definition The total testing process {#def-process}
The **total testing process** has three phases:

- The **pre-analytical phase**: choosing the test, identifying the patient, collecting the sample in the correct container, labelling, transport and storage until analysis.
- The **analytical phase**: the measurement itself, controlled by calibration, internal quality control and external quality assessment.
- The **post-analytical phase**: reporting, flagging, communicating urgent results, and the clinician's interpretation and action.

In modern laboratories most errors arise in the pre-analytical and post-analytical phases, not in the analyser.
:::

Common pre-analytical errors produce characteristic patterns, and recognising them avoids treating an artefact:

- **Haemolysis** releases the contents of red cells into the serum, falsely raising **potassium**, and also lactate dehydrogenase, AST and phosphate. It is caused by difficult venepuncture, small needles, vigorous shaking or forcing blood through a needle.
- **Delayed separation** of a sample (for example left overnight, especially in the cold) lets potassium leak from cells and glucose be consumed, so potassium rises and glucose falls.
- **EDTA contamination**, from filling tubes in the wrong order or decanting from a full blood count tube, gives a very high potassium with a very low calcium, because EDTA is a potassium salt that binds calcium.
- **Drip-arm contamination**, sampling from the arm into which an infusion is running, dilutes the sample and adds whatever the infusion contains, such as glucose or sodium chloride.
- **Wrong blood in tube**, a sample labelled with another patient's details, is rare but dangerous, especially for blood transfusion. Labels should be completed at the bedside from the patient's identity band, never pre-labelled.

::: example A potassium of 7.2 {#ex-potassium}
Mrs Fisher, 76, has a routine blood test in her GP surgery at 10 a.m. The sample is collected by courier at 6 p.m. and analysed the next morning. The laboratory phones with a potassium of 7.2 mmol/L. Her previous potassium was 4.3 mmol/L, she takes no drugs that raise potassium, and her creatinine is unchanged. How should the result be handled?

::: solution
A potassium of 7.2 mmol/L would be life-threatening if real, so it must never be ignored. But several features suggest **pseudohyperkalaemia**: a long delay before separation, a normal previous value, stable renal function, and no drug cause. Check whether the laboratory reported haemolysis.

The safe approach is to contact the patient the same day. If she is well, repeat the sample urgently with prompt delivery to the laboratory (or, where available, a point-of-care measurement) and consider an ECG. If she is unwell, has symptoms or the ECG shows changes of hyperkalaemia, she needs emergency assessment. The decision is driven by the possibility of a dangerous true result, while the pattern guides how likely that is. Document the reasoning and the repeat result.
:::
:::

## Reference intervals and what "abnormal" means

::: definition Reference interval {#def-reference}
A **reference interval** (often called a "normal range") is usually the interval containing the central **95%** of results from a reference population of healthy people, from the 2.5th to the 97.5th percentile. By construction, **5% of healthy people** have results outside it. Reference intervals depend on the method and the population, and many are specific to age, sex or pregnancy, so the interval printed by the reporting laboratory should be used.
:::

Three consequences follow.

First, a result just outside the interval is often normal for that person. Second, the more tests are done, the more likely a healthy person is to have an "abnormal" result. If tests were independent, the probability that a healthy person has all $n$ results inside the interval would be $0.95^n$. For 20 tests that is about 36%, so nearly two-thirds of healthy people would have at least one flagged result. Results are not fully independent, but the effect is real and is a strong argument against ordering tests without a question. Third, a result inside the interval is not necessarily normal for the patient: a creatinine that has risen from 60 to 100 µmol/L may still be "within range" while representing a substantial fall in kidney function.

The figure shows a reference interval as the central 95% of a normal distribution.

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: -1.96
b: 1.96
caption: A reference interval as the central 95% of results in healthy people, shown in standard-deviation units. About 2.5% of healthy people lie in each tail. Many analytes are not normally distributed, and laboratories use non-parametric percentiles; this is a simplified picture.
:::

### Change over time

For a patient being followed over time, a change between two results may matter more than either value. Every result varies because of **analytical variation** (imprecision of the method) and **biological variation** (natural fluctuation within the person). The **reference change value** estimates how big a difference must be before it is unlikely to be explained by this variation alone:

$$
\text{RCV} = \sqrt{2} \times z \times \sqrt{\text{CV}_A^2 + \text{CV}_I^2},
$$

where $\text{CV}_A$ and $\text{CV}_I$ are the analytical and within-person biological coefficients of variation and $z$ is 1.96 for 95% confidence (two-sided). Analytes with small biological variation, such as creatinine, can show meaningful change at small percentage differences; analytes with large biological variation need larger changes.

## Test accuracy and prevalence

::: definition Sensitivity, specificity and predictive values {#def-accuracy}
For a test compared with a reference standard:

| | Disease present | Disease absent |
|---|---|---|
| Test positive | true positive (TP) | false positive (FP) |
| Test negative | false negative (FN) | true negative (TN) |

- **Sensitivity** $= \text{TP}/(\text{TP} + \text{FN})$: the proportion of people with the disease who test positive.
- **Specificity** $= \text{TN}/(\text{TN} + \text{FP})$: the proportion of people without the disease who test negative.
- **Positive predictive value** (PPV) $= \text{TP}/(\text{TP} + \text{FP})$: the proportion of positive results that are true.
- **Negative predictive value** (NPV) $= \text{TN}/(\text{TN} + \text{FN})$: the proportion of negative results that are true.
:::

::: theorem Predictive values depend on prevalence {#thm-prevalence}
For a test with sensitivity $s$ and specificity $c$ applied to a population with prevalence (pre-test probability) $p$,

$$
\text{PPV} = \frac{s\,p}{s\,p + (1-c)(1-p)}, \qquad \text{NPV} = \frac{c\,(1-p)}{c\,(1-p) + (1-s)\,p}.
$$

As prevalence falls, the PPV falls and the NPV rises. The same test therefore performs very differently in a specialist clinic and in a screening programme.
:::

::: proof Derivation {#prf-prevalence}
In a population of size $N$, there are $pN$ people with the disease, of whom $s\,pN$ test positive, and $(1-p)N$ without it, of whom $(1-c)(1-p)N$ test positive. The PPV is the true positives divided by all positives, and $N$ cancels. The NPV follows in the same way from the true negatives, $c(1-p)N$, and the false negatives, $(1-s)pN$. When $p$ is small, the false positives $(1-c)(1-p)$ can easily outnumber the true positives $s\,p$, even when $c$ is high.
:::

::: widget plot
f: s*x/(s*x + (1-c)*(1-x)); c*(1-x)/(c*(1-x) + (1-s)*x)
x: 0, 1
y: 0, 1
sliders: s=0.9:0.5:0.99:0.01; c=0.9:0.5:0.99:0.01
labels: \text{PPV}; \text{NPV}
caption: Positive and negative predictive values against prevalence for a test with sensitivity $s$ and specificity $c$. At low prevalence even a good test produces mostly false positives. Simplified model.
:::

::: example A screening result {#ex-screen}
A test for a condition has sensitivity 90% and specificity 95%. It is used (a) in a clinic where 30% of the people tested have the condition, and (b) as a screen in a population where 1% have it. Calculate the PPV in each setting.

::: solution
(a) Of 1,000 clinic patients, 300 have the condition and 270 test positive; of 700 without it, 5% (35) test positive. $\text{PPV} = 270/305 \approx 89\%$.

(b) Of 1,000 people screened, 10 have the condition and 9 test positive; of 990 without it, 5% (49.5) test positive. $\text{PPV} = 9/58.5 \approx 15\%$.

In the screening setting about 85% of positive results are false. This is why positive screening tests lead to confirmatory testing rather than a diagnosis, and why tests should be chosen for a clinical question rather than added "in case".
:::
:::

::: warning Treat the patient, not the number
An abnormal result in a well patient is often an artefact, a normal variant or a minor finding, while a normal result does not exclude disease if the test was the wrong one or done too early (a troponin in the first hour after the onset of pain, a chest X-ray in early pneumonia). Before acting on a result, ask: does it fit the clinical picture? Could it be a pre-analytical error? Is it a change from the patient's baseline? Then act on the combination. Equally, never dismiss a dangerous result as an artefact without repeating it.
:::

## Common blood tests

### Full blood count

The full blood count reports haemoglobin, the red-cell indices, the white cell count with its differential, and platelets.

- **Haemoglobin** below the sex-specific reference interval defines **anaemia**. The **mean cell volume (MCV)** classifies it:
  - **microcytic** (low MCV): iron deficiency (the commonest cause), thalassaemia trait, and sometimes anaemia of chronic disease;
  - **normocytic**: acute blood loss, anaemia of chronic disease, chronic kidney disease, bone marrow failure, haemolysis;
  - **macrocytic** (high MCV): vitamin B12 or folate deficiency, alcohol, liver disease, hypothyroidism, some drugs (such as methotrexate and hydroxycarbamide), and a raised reticulocyte count.
- **Ferritin** is the best single test for iron stores: a low ferritin confirms iron deficiency, but ferritin rises in inflammation, so a normal value does not exclude it when inflammation is present.
- **White cells**: a **neutrophilia** suggests bacterial infection, inflammation, steroids or tissue damage; a **lymphocytosis** suggests viral infection or chronic lymphocytic leukaemia; **eosinophilia** suggests allergy, parasites or some drugs; **neutropenia** is important because it predisposes to severe infection.
- **Platelets**: thrombocytopenia increases bleeding risk at low counts; thrombocytosis is commonly reactive (infection, inflammation, iron deficiency) and less often a myeloproliferative neoplasm.

In iron-deficiency anaemia in adults, the main question is **why**: in men and post-menopausal women, gastrointestinal blood loss, including bowel cancer, must be excluded. Haematology is covered in the course on blood ([[blood]]).

::: example Tiredness in a 67-year-old man {#ex-anaemia}
Mr Davies, 67, has felt tired for three months. His full blood count shows haemoglobin 98 g/L, MCV 72 fL and platelets 460 × 10⁹/L; ferritin is 8 µg/L and CRP is normal. He takes aspirin and has no obvious bleeding. Interpret the results and state the next step.

::: solution
He has a **microcytic anaemia**. A low ferritin with a normal CRP confirms **iron deficiency** (ferritin is not falsely raised by inflammation here). The mildly raised platelet count is a common reactive finding in iron deficiency. In a man of 67, iron deficiency is caused by blood loss until proven otherwise, and the gastrointestinal tract is the usual source; aspirin adds a risk of upper gastrointestinal bleeding, but it must not be assumed to be the cause. Under UK suspected-cancer guidance, unexplained iron-deficiency anaemia at his age needs urgent investigation of the gastrointestinal tract (typically with upper and lower endoscopy, following local pathways), and coeliac serology should be checked. Iron replacement treats the anaemia but does not answer the question of why it happened.
:::
:::

### Urea, electrolytes and kidney function

- **Creatinine** reflects muscle mass as well as kidney function. **eGFR** is calculated from creatinine, age and sex; NICE (2021) recommends the CKD-EPI equation without an ethnicity adjustment. eGFR is valid only in a steady state: in acute kidney injury, creatinine lags behind the fall in filtration.
- **Urea** rises with dehydration, upper gastrointestinal bleeding and high protein intake as well as with reduced kidney function.
- **Sodium** disorders are disorders of water balance. **Potassium** disorders are dangerous because of their effect on the heart.

Acute kidney injury is staged on the rise in creatinine and the fall in urine output; the criteria and the approach are in [[renal/acute-kidney-injury]].

Many UK laboratories report an **adjusted calcium** for the albumin concentration, because about 40% of plasma calcium is bound to albumin. A common formula is

$$
\text{adjusted Ca} = \text{measured Ca} + 0.02 \times (40 - \text{albumin}),
$$

with calcium in mmol/L and albumin in g/L. Local formulas differ, and when the albumin is very abnormal or accuracy matters, **ionised calcium** (measured on a blood gas analyser) is better.

### Liver function tests

"Liver function tests" mostly measure liver **damage**, not function. Read them as a pattern:

- **Hepatocellular pattern**: ALT and AST raised more than ALP (viral hepatitis, drug injury, ischaemia, fatty liver disease, autoimmune hepatitis).
- **Cholestatic pattern**: ALP and GGT raised more than the transaminases (bile duct obstruction by stones or tumour, primary biliary cholangitis, primary sclerosing cholangitis, drugs). A raised ALP with a normal GGT suggests bone rather than liver as the source; ALP also rises normally in pregnancy and growing children.
- **Bilirubin**: raised in haemolysis (unconjugated), in Gilbert's syndrome (mildly raised unconjugated bilirubin, rising with fasting or illness, otherwise normal tests) and in liver disease and obstruction (conjugated).
- **Synthetic function**: **albumin** (slow, also falls in illness and with protein loss) and the **prothrombin time / INR** (fast; a raised INR not corrected by vitamin K indicates significant liver failure).

### Inflammatory markers

**C-reactive protein (CRP)** is an acute-phase protein made by the liver in response to interleukin-6. It rises within hours of inflammation and falls quickly when it settles, so it is useful for following a response. The **erythrocyte sedimentation rate (ESR)** rises more slowly and is affected by anaemia, age and immunoglobulins; it remains useful in a few conditions such as giant cell arteritis and myeloma. Neither test is specific: a raised CRP does not say where inflammation is or whether it is infective, and a normal CRP early in an illness does not exclude a serious infection.

### Cardiac troponin

**High-sensitivity cardiac troponin** assays detect very small amounts of troponin released by injured heart muscle. A value above the **99th percentile** of a healthy reference population indicates **myocardial injury**. **Myocardial infarction** requires a rise and/or fall in troponin with evidence of ischaemia (symptoms, ECG changes, imaging or angiography), as set out in the Fourth Universal Definition of Myocardial Infarction (2018). Troponin is also raised in many non-ischaemic conditions, including sepsis, pulmonary embolism, heart failure, myocarditis, renal impairment and after strenuous exercise. Interpretation therefore depends on the clinical picture and on the **change** between serial samples, using the assay-specific pathway in local protocols ([[cardiovascular/coronary-artery-disease]]).

## Blood gases

An arterial blood gas measures the pH, the partial pressures of oxygen and carbon dioxide, and (usually) electrolytes, lactate and haemoglobin. Typical adult reference values on air at sea level are: **pH 7.35–7.45**; **PaCO₂ 4.7–6.0 kPa** (35–45 mmHg); **PaO₂ above about 10 kPa** (75 mmHg), falling with age; **bicarbonate 22–26 mmol/L**; base excess −2 to +2 mmol/L. Venous gases are often sufficient for pH, bicarbonate, potassium, glucose and lactate.

::: theorem A stepwise reading of a blood gas {#thm-abg}
1. **Oxygenation**: is the patient hypoxaemic, and is the PaO₂ appropriate for the inspired oxygen? (On air, the alveolar–arterial gradient helps; see below.)
2. **pH**: acidaemia (below 7.35) or alkalaemia (above 7.45)?
3. **Respiratory component**: is the PaCO₂ high (respiratory acidosis) or low (respiratory alkalosis)?
4. **Metabolic component**: is the bicarbonate or base excess low (metabolic acidosis) or high (metabolic alkalosis)?
5. **Primary disorder and compensation**: which change explains the pH, and is the other component compensating as expected?
6. **In a metabolic acidosis, calculate the anion gap**: $\text{AG} = [\text{Na}^+] - ([\text{Cl}^-] + [\text{HCO}_3^-])$.
:::

The **anion gap** represents unmeasured anions, mainly albumin. Its reference range depends on the analyser, commonly around 8–16 mmol/L when potassium is not included. A **raised anion gap metabolic acidosis** suggests added acid: lactate (shock, sepsis, ischaemia), ketones (diabetic or alcoholic ketoacidosis), kidney failure, or toxins such as methanol, ethylene glycol and salicylate. A **normal anion gap (hyperchloraemic) acidosis** suggests bicarbonate loss (diarrhoea, some renal tubular acidoses) or large volumes of sodium chloride. Low albumin lowers the anion gap and can hide a raised-gap acidosis.

For a metabolic acidosis, **Winter's formula** predicts the expected respiratory compensation: expected $\text{PaCO}_2$ (mmHg) $= 1.5 \times [\text{HCO}_3^-] + 8 \pm 2$. A PaCO₂ higher than predicted indicates an additional respiratory acidosis. The physiology is developed in [[physiology/acid-base]] and the clinical disorders in [[renal/acid-base-disorders]].

The **alveolar–arterial (A–a) gradient** distinguishes hypoxaemia caused by hypoventilation (normal gradient) from that caused by a problem with gas exchange (raised gradient). The alveolar oxygen is estimated by the **alveolar gas equation**:

$$
P_AO_2 = F_iO_2 \times (P_{atm} - P_{H_2O}) - \frac{P_aCO_2}{0.8},
$$

which on room air at sea level is about $0.21 \times (101.3 - 6.3) - P_aCO_2/0.8 \approx 20 - 1.25\,P_aCO_2$ kPa. The gradient is $P_AO_2 - P_aO_2$, normally below about 2 kPa in young adults and rising with age.

::: example A blood gas in diabetic ketoacidosis {#ex-dka}
Mr Ali, 23, with type 1 diabetes, has vomiting and abdominal pain. On air: pH 7.12, PaCO₂ 2.8 kPa, PaO₂ 13.5 kPa, bicarbonate 9 mmol/L, sodium 136 mmol/L, chloride 100 mmol/L, glucose 28 mmol/L, blood ketones 5.2 mmol/L. Interpret the gas.

::: solution
1. **Oxygenation**: PaO₂ 13.5 kPa on air is normal. The A–a gradient is $20 - 1.25 \times 2.8 - 13.5 = 3.0$ kPa, slightly raised but acceptable when breathing very hard.
2. **pH** 7.12: severe acidaemia.
3. **PaCO₂** 2.8 kPa is low, which would cause alkalosis, so the respiratory change is not the cause.
4. **Bicarbonate** 9 mmol/L is very low: a **metabolic acidosis** is the primary disorder.
5. **Compensation**: expected PaCO₂ $= 1.5 \times 9 + 8 = 21.5 \pm 2$ mmHg, that is about 19.5–23.5 mmHg or 2.6–3.1 kPa (1 kPa = 7.5 mmHg). His 2.8 kPa (21 mmHg) is in range: appropriate respiratory compensation, with no additional respiratory disorder.
6. **Anion gap** $= 136 - (100 + 9) = 27$ mmol/L: raised. With hyperglycaemia and ketones of 5.2 mmol/L, this is **diabetic ketoacidosis**.

He meets the UK Joint British Diabetes Societies criteria for DKA (ketones 3.0 mmol/L or more, glucose above 11 mmol/L or known diabetes, and bicarbonate below 15 mmol/L and/or venous pH below 7.3). Management follows the local DKA protocol ([[endocrine]]).
:::
:::

## Urinalysis

A **urine dipstick** tests for blood, protein, glucose, ketones, leucocyte esterase, nitrites and specific gravity. It is cheap and quick but has important limits. In women under 65 with symptoms of urinary infection, dipstick results can support the diagnosis. In people **over 65**, UK guidance advises **not** using dipsticks to diagnose urinary infection, because asymptomatic bacteriuria is common and a positive dipstick leads to unnecessary antibiotics and missed alternative diagnoses. Positive dipstick blood needs microscopy or repeat testing and, if persistent and unexplained, assessment for urological or renal causes; proteinuria is quantified with an albumin:creatinine ratio. Urine pregnancy tests detect hCG and should be done in anyone who could be pregnant before imaging with ionising radiation, many drugs and surgery.

::: quiz
A 40-year-old man has a potassium of 6.9 mmol/L and a calcium of 0.9 mmol/L on a sample taken by a student who filled a full blood count tube first. He is well and his ECG is normal. What is the most likely explanation?
- [ ] Acute kidney injury
- [ ] Hypoparathyroidism
- [x] EDTA contamination of the sample
- [ ] Rhabdomyolysis
::: solution
A very high potassium with a very low calcium in a well patient suggests EDTA contamination: potassium EDTA from the full blood count tube raises potassium and chelates calcium. Filling the tubes in the recommended order and never decanting between tubes prevents it. The sample should be repeated promptly, because the result cannot be trusted either way.
:::
:::

::: history
Clinical chemistry grew from a few manual tests into automated analysis during the twentieth century. In the 1950s blood gas analysis was born of an emergency: during the 1952 polio epidemic in Copenhagen, the anaesthetist **Bjørn Ibsen** introduced manual ventilation through tracheostomies, and the laboratory physician **Poul Astrup** developed methods to measure blood pH and CO₂ to guide it. **Leland Clark** described the oxygen electrode in 1954 and **John Severinghaus** the CO₂ electrode in 1958, the basis of every modern blood gas analyser. In 1959–60 **Rosalyn Yalow** and **Solomon Berson** developed the radioimmunoassay, which made it possible to measure hormones such as insulin in blood; Yalow received the Nobel Prize in 1977.
:::

## Where this leads

The approach in this chapter applies to every specialty's tests. Organ-specific interpretation is developed in [[renal/acute-kidney-injury]], [[gastrointestinal/liver-function]] and [[endocrine]], and the evaluation of diagnostic tests in [[epidemiology-ebm/diagnostic-tests]]. Imaging is covered in [[clinical-skills/medical-imaging]].

::: summary
- Most laboratory errors happen before or after analysis; recognise the patterns of haemolysis, delayed separation, EDTA contamination and drip-arm samples.
- A reference interval contains the central 95% of healthy people; many tests make "abnormal" results in healthy people likely.
- A change from the patient's baseline may matter more than the reference interval; the reference change value quantifies meaningful change.
- Predictive values depend on prevalence: at low prevalence even an accurate test gives mostly false positives.
- Read the FBC by haemoglobin and MCV, LFTs as a pattern, CRP as a non-specific, fast-changing marker, and troponin as evidence of myocardial injury interpreted with the clinical picture and serial change.
- Read blood gases stepwise: oxygenation, pH, respiratory and metabolic components, compensation and the anion gap.
- Do not use urine dipsticks to diagnose urinary infection in people over 65.
:::

## Exercises

::: exercise Many tests, healthy person {level=1 check="round(0.95^20*1000)/1000"}
If a healthy person has 20 independent tests, each with a reference interval containing 95% of healthy people, what is the probability that all 20 results are within their intervals? Give the answer to three decimal places.
::: solution
$0.95^{20} = 0.358$. So about 64% of healthy people would have at least one result outside its interval.
:::
:::

::: exercise The anion gap {level=1 check="24"}
Sodium 140 mmol/L, chloride 104 mmol/L, bicarbonate 12 mmol/L. Calculate the anion gap (without potassium).
::: solution
$\text{AG} = 140 - (104 + 12) = 24$ mmol/L, which is raised. Look for lactate, ketones, kidney failure or toxins.
:::
:::

::: exercise Adjusted calcium {level=1 check="2.46"}
Measured calcium 2.20 mmol/L, albumin 27 g/L. Use the formula adjusted Ca = measured Ca + 0.02 × (40 − albumin). Give the exact value in mmol/L.
::: solution
$2.20 + 0.02 \times (40 - 27) = 2.20 + 0.26 = 2.46$ mmol/L, within a typical reference interval. The low measured value is explained by the low albumin. If accuracy matters, measure ionised calcium.
:::
:::

::: exercise Predictive value {level=2 check="round(1000*0.99*0.02/(0.99*0.02+0.01*0.98))/1000"}
A test has sensitivity 99% and specificity 99%. In a population with prevalence 2%, what is the positive predictive value? Give it as a proportion to three decimal places.
::: solution
Per 10,000 people: 200 have the disease, 198 test positive; 9,800 do not, of whom 1% (98) test positive. $\text{PPV} = 198/296 = 0.669$. Even with 99% sensitivity and specificity, one in three positive results is false at this prevalence.
:::
:::

::: exercise The A–a gradient {level=2 check="20 - 1.25*4.0 - 8.0"}
A patient breathing room air has PaO₂ 8.0 kPa and PaCO₂ 4.0 kPa. Using $P_AO_2 \approx 20 - 1.25\,P_aCO_2$ kPa, calculate the A–a gradient in kPa, exactly.
::: solution
$P_AO_2 = 20 - 1.25 \times 4.0 = 15.0$ kPa. Gradient $= 15.0 - 8.0 = 7.0$ kPa, markedly raised. The hypoxaemia is due to a problem with gas exchange (such as pneumonia, pulmonary embolism or pulmonary oedema), not to hypoventilation; the low PaCO₂ shows he is hyperventilating.
:::
:::

::: exercise Read the LFTs {level=2}
A 70-year-old woman has painless jaundice and weight loss. Bilirubin 180 µmol/L, ALP 650 U/L, GGT 520 U/L, ALT 90 U/L, albumin 32 g/L, INR 1.4. Interpret the pattern and suggest the next steps.
::: solution
The ALP and GGT are raised much more than the ALT: a **cholestatic** pattern with conjugated hyperbilirubinaemia. Painless jaundice with weight loss in an older person raises concern for **malignant obstruction** of the bile duct, such as carcinoma of the head of the pancreas or cholangiocarcinoma. The raised INR may reflect malabsorption of vitamin K (fat-soluble) in cholestasis rather than liver failure; it may correct with vitamin K. Next steps: an urgent ultrasound to look for duct dilatation, then cross-sectional imaging (CT) and referral following suspected-cancer pathways.
:::
:::

::: exercise Mixed acid–base disorder {level=3}
A 68-year-old man with COPD has pneumonia. On air: pH 7.18, PaCO₂ 8.5 kPa, PaO₂ 6.9 kPa, bicarbonate 18 mmol/L, sodium 138, chloride 100, lactate 5.0 mmol/L. Interpret the gas.
::: solution
Oxygenation: severe hypoxaemia (PaO₂ 6.9 kPa). pH 7.18: acidaemia. PaCO₂ 8.5 kPa is high: a **respiratory acidosis**. Bicarbonate 18 mmol/L is low: a **metabolic acidosis** too, since a respiratory acidosis alone would raise bicarbonate. Anion gap $= 138 - (100 + 18) = 20$ mmol/L, raised, consistent with lactic acidosis (lactate 5.0). This is a **mixed respiratory and metabolic acidosis**, which causes severe acidaemia because neither disorder compensates for the other. In this context it suggests hypercapnic respiratory failure with sepsis and tissue hypoperfusion: he needs urgent senior review, controlled oxygen to a target range, assessment for non-invasive ventilation, and sepsis management.
:::
:::

::: exercise Design a safer test request {level=3}
A medical admissions unit adds a standard panel of 18 blood tests to every admission, including thyroid function, vitamin D, ferritin, PSA and tumour markers. Using the ideas in this chapter, argue for or against the panel and propose an alternative.
::: solution
Against: many of the tests have no question attached for most patients. With 18 tests, a healthy person has a high chance of at least one result outside its reference interval ($1 - 0.95^{18} \approx 60\%$ if independent), and in acutely ill patients many results are disturbed by the illness itself (thyroid function tests are often abnormal in non-thyroidal illness; ferritin rises with inflammation). Tumour markers and PSA in unselected patients have low predictive values and lead to further tests, anxiety and incidental findings, and PSA testing should follow a discussion with the patient. The panel also costs time and money and generates results that someone must review and act on. Alternative: a small core set for all admissions (full blood count, urea and electrolytes, CRP, and others agreed locally for the population, such as glucose and liver tests), with further tests requested for a stated clinical question, decision support in the ordering system, and an audit of the impact.
:::
:::
