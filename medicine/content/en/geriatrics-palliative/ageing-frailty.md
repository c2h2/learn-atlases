Ageing is not a disease, but it changes how every disease looks and how every treatment behaves. An 85-year-old with pneumonia may have no fever and no cough, only new confusion and a fall. A dose of a drug that suits a 40-year-old may accumulate for days. A week in bed can cost a month of independence. Geriatric medicine is the specialty built around these facts.

This chapter covers the biology of ageing and the idea of physiological reserve, the clinical state called frailty and how it is measured, sarcopenia and malnutrition, and comprehensive geriatric assessment (CGA), the core method of the specialty. Later chapters apply these ideas to falls ([[geriatrics-palliative/falls]]), delirium ([[geriatrics-palliative/delirium-dementia-care]]) and prescribing ([[geriatrics-palliative/polypharmacy]]).

## The biology of ageing {#sec-biology}

### Why things go wrong more often with age

Biologists describe ageing as the gradual accumulation of molecular and cellular damage that the body can no longer fully repair. A widely cited framework, the "hallmarks of ageing" (López-Otín and colleagues, first published in 2013 and updated in 2023), groups the processes into families: damage to DNA and shortening of telomeres, changes in gene regulation (epigenetic drift), failure of protein quality control, mitochondrial dysfunction, cellular senescence, exhaustion of stem cells, and altered communication between cells, including a low-grade chronic inflammation sometimes called "inflammageing".

For the clinician, the useful summary is simpler. Each organ keeps working at rest well into old age, but the margin between resting function and the maximum it can deliver shrinks. That margin is **physiological reserve**.

::: definition Physiological reserve and homeostenosis {#def-biology}
**Physiological reserve** is the difference between the level at which an organ system normally works and the maximum it can achieve under stress. **Homeostenosis** is the progressive narrowing of that reserve with age, so that a smaller stress is enough to push a system past the point where it fails and symptoms appear.
:::

Reserve declines in almost every system. A few examples matter at the bedside:

- **Heart and circulation.** The ventricle stiffens, the maximum heart rate falls (roughly 220 minus age is a crude guide), and the baroreflex becomes slower. Older people tolerate dehydration, blood loss and blood-pressure-lowering drugs less well, and are more prone to postural hypotension.
- **Kidneys.** Glomerular filtration rate (GFR) tends to fall with age, but serum creatinine often stays "normal" because muscle mass, the source of creatinine, also falls. A normal creatinine in a small, thin older woman can hide a GFR of 30 mL/min.
- **Brain.** Cognitive reserve falls, and the brain becomes vulnerable to delirium during any acute illness, drug change or move to an unfamiliar place.
- **Muscle and bone.** Muscle mass and strength decline from mid-life (see [[#def-sarcopenia]]); bone density falls, especially in women after the menopause.
- **Thermoregulation, thirst and immunity.** Older people feel less thirst, may not mount a fever in sepsis, and respond less strongly to some vaccines.

::: theorem The threshold principle {#thm-threshold}
A clinical problem appears when the stress on a system exceeds that system's remaining reserve. In an older person the reserve is smaller, so (1) a minor stress can produce a major failure, (2) the system that fails is often not the one under attack but the one with the least reserve, and (3) several small deficits can combine to cross the threshold where none would alone.
:::

::: proof
Consider the brain as a system with a reserve that falls with age and with any pre-existing dementia. A urinary infection causes fever, dehydration, sleep loss and inflammatory cytokines. In a 30-year-old these stresses stay well inside the brain's reserve, so the only symptoms come from the bladder. In an 88-year-old with mild dementia the same stresses exceed what remains, and the brain fails first: the presentation is delirium, while the bladder symptoms are mild or absent. The same arithmetic explains why a fall can be the first sign of pneumonia (balance and muscle have the least reserve) and why several mild problems, each tolerable alone (a cataract, a mild neuropathy, a new blood pressure tablet), add up to a fall.
:::

This principle explains the **geriatric syndromes**: falls, delirium, incontinence, immobility and pressure injury. Each is a final common pathway with many contributing causes. That is why the classic textbook advice to "find the single diagnosis" often fails in older people. The approach in geriatric medicine is to list every contributor and correct as many as possible.

### Atypical presentation

Because the weakest system fails first, older people often present with a non-specific decline: "off legs", "not herself", confusion, a fall, poor eating, or new incontinence. These presentations are sometimes dismissed as "acopia" or "social admission". Both labels should be avoided. They describe a failure of the patient's coping, when the more useful question is what new illness has pushed the patient past her threshold.

::: warning "Social admission" is a diagnosis of exclusion
A common mistake is to accept that an older person who "can't cope at home" has no medical problem. Sepsis, myocardial infarction without chest pain, hyponatraemia, hypercalcaemia, drug toxicity, urinary retention, constipation and subdural haematoma all present this way. A sudden loss of function always has a cause, and the history from a relative or carer about what changed, and when, is the first step to finding it.
:::

### Ageing and drugs

Ageing changes both what the body does to a drug (pharmacokinetics) and what the drug does to the body (pharmacodynamics). These changes are covered fully in [[geriatrics-palliative/polypharmacy]] and [[pharmacology/patient-variation]], but two are worth knowing now.

First, body composition changes: the proportion of fat rises and total body water falls. A fat-soluble drug such as diazepam therefore has a larger volume of distribution, and a water-soluble drug such as digoxin or lithium reaches a higher concentration from the same dose. Second, renal clearance falls. The elimination half-life depends on both:

$$
t_{1/2} = \frac{0.693 \times V_d}{CL}
$$ {#eq-halflife}

where $V_d$ is the volume of distribution and $CL$ the clearance. A larger $V_d$ and a smaller $CL$ both lengthen the half-life, and their effects multiply.

For renally cleared drugs, the BNF and drug manufacturers usually give dose adjustments in terms of creatinine clearance estimated by the **Cockcroft–Gault equation**, which includes age and body weight. With serum creatinine in µmol/L:

$$
\text{CrCl (mL/min)} = \frac{(140 - \text{age}) \times \text{weight (kg)} \times F}{\text{serum creatinine } (\mu\text{mol/L})}
$$ {#eq-cg}

with $F = 1.23$ for men and $F = 1.04$ for women. Laboratory eGFR (calculated with the CKD-EPI equation in the UK) is standardised to a body surface area of 1.73 m² and does not include weight, so in a small, old person it can overestimate the clearance that matters for drug dosing. UK guidance (MHRA and the BNF) advises using Cockcroft–Gault with actual body weight for drugs with a narrow therapeutic index and in people at the extremes of body weight, and for the direct oral anticoagulants.

::: example The 88-year-old whose creatinine is "normal" {#ex-renal}
Mrs Edith Clarke is 88, weighs 48 kg and is admitted with a chest infection and new atrial fibrillation. Her serum creatinine is 90 µmol/L, inside the laboratory reference range, and the laboratory eGFR is reported as about 50 mL/min/1.73 m². A junior doctor plans to start an anticoagulant and asks whether the kidneys need to be taken into account. Estimate her creatinine clearance.
::: solution
Apply [[#eq-cg]] with $F = 1.04$ for a woman:

$$
\text{CrCl} = \frac{(140 - 88) \times 48 \times 1.04}{90} = \frac{2595.8}{90} \approx 28.8 \text{ mL/min}
$$

Her creatinine clearance is about 29 mL/min, much lower than the "normal" creatinine and the eGFR suggest. The creatinine looks normal because she has little muscle to produce it. Several drugs have dose thresholds near 30 or 50 mL/min (including the direct oral anticoagulants, some antibiotics, gabapentinoids and metformin), so the dose chosen from the eGFR could be wrong. The prescriber should check the current BNF or summary of product characteristics for the drug, use the Cockcroft–Gault value where the guidance says so, and recheck renal function during the acute illness, since it may change quickly.
:::
:::

## Frailty {#sec-frailty}

Most people over 80 are not frail, and some people in their 60s are. Age alone is a poor guide to how someone will cope with illness or treatment. Frailty is the concept that captures the difference.

::: definition Frailty {#def-frailty}
**Frailty** is a clinically recognisable state of increased vulnerability, resulting from age-associated decline in reserve and function across several physiological systems, such that the ability to cope with everyday or acute stressors is compromised. A person living with frailty is at higher risk of falls, delirium, disability, hospital admission, care-home admission and death after a given illness or treatment than a non-frail person of the same age.
:::

Two models dominate research and practice.

**The frailty phenotype** (Fried and colleagues, 2001, using the Cardiovascular Health Study) defines frailty by five criteria:

1. unintentional weight loss (about 4.5 kg, or 5% of body weight, in the past year);
2. self-reported exhaustion;
3. weak grip strength;
4. slow walking speed;
5. low physical activity.

Three or more criteria define frailty; one or two define **pre-frailty**. The phenotype treats frailty as a specific syndrome of low energy and muscle failure.

**The deficit accumulation model** (Rockwood and Mitnitski) treats frailty as the proportion of possible health deficits that a person has. A **frailty index** is calculated by counting deficits (symptoms, signs, diseases, disabilities, abnormal test results) and dividing by the number considered:

$$
\text{frailty index} = \frac{\text{number of deficits present}}{\text{number of deficits considered}}
$$ {#eq-fi}

The index is a continuous number between 0 and 1. It rises with age, and at any age a higher index predicts a higher risk of death and disability. In England, general practice systems calculate an **electronic frailty index (eFI)** from 36 deficits coded in the primary care record. The original eFI used four bands: fit (0–0.12), mild frailty (above 0.12–0.24), moderate frailty (above 0.24–0.36) and severe frailty (above 0.36). A revised version, eFI2, which weights deficits by how strongly they predict outcomes, has been developed and is being introduced; whatever the version, an electronic score is a prompt for clinical assessment, not a diagnosis.

### The Clinical Frailty Scale

At the bedside the most widely used tool is the **Clinical Frailty Scale (CFS)**, devised by Rockwood and colleagues and revised as version 2.0 in 2020. The clinician grades the person's state about two weeks before the current illness, using judgement informed by the history:

| CFS | Description (summary) |
|---|---|
| 1 | Very fit: robust, active, energetic |
| 2 | Fit: no active disease symptoms, but less fit than category 1 |
| 3 | Managing well: medical problems well controlled, not regularly active beyond walking |
| 4 | Living with very mild frailty: not dependent, but symptoms limit activities; "slowed up" |
| 5 | Living with mild frailty: needs help with higher-order activities (finances, transport, heavy housework) |
| 6 | Living with moderate frailty: needs help with outside activities and with keeping house; may need help with bathing |
| 7 | Living with severe frailty: completely dependent for personal care, but stable |
| 8 | Living with very severe frailty: completely dependent, approaching the end of life |
| 9 | Terminally ill: life expectancy under about 6 months, but not otherwise evidently frail |

The CFS was validated in people aged 65 and over. It should not be used alone in younger people or in people with a stable single disability (for example a learning disability or a spinal cord injury), because it would score their disability rather than their frailty.

::: example Grading frailty from a history {#ex-ftt}
Mr Kwame Mensah, 78, is admitted with "failure to thrive". His daughter explains that two weeks ago he lived alone, washed and dressed himself, and walked to the corner shop with a stick, but she had taken over his shopping, banking and heavy cleaning about a year ago because he "got tired too easily". Over the past ten days he has eaten little, stayed in his chair and needed help to reach the toilet. What is his Clinical Frailty Scale score, and why does the timing of the grading matter?
::: solution
The CFS is graded on his baseline about two weeks before the acute illness, not on his state today. At baseline he was independent in personal care but needed help with higher-order activities (shopping, finances, heavy housework). That is **CFS 5, living with mild frailty**.

If he were graded on today's state (dependent for toileting, chair-bound) he would appear to be CFS 7. That would wrongly suggest a long-standing, severe dependency and might lead to less active treatment. The ten-day decline is a new problem that needs a cause: infection, dehydration, constipation, depression, a medicine change, or an underlying cancer. Calling it "failure to thrive" names the symptom without explaining it. The correct record states CFS 5 at baseline and an acute functional decline under investigation.
:::
:::

### What frailty scores are for

A frailty score is useful when it changes what happens next. Good uses include: prompting a CGA, informing a shared discussion about the risks of surgery or chemotherapy, targeting falls or medication review, and starting conversations about future care. Frailty is also partly reversible, especially in its milder forms: exercise, nutrition and treatment of contributing conditions can move a person down the scale.

A score should never be used on its own to deny treatment. The CFS predicts outcome across groups but cannot tell whether a particular 84-year-old will benefit from intensive care. That judgement needs the full clinical picture and the person's own goals. During the COVID-19 pandemic, NICE briefly recommended the CFS in its critical-care guideline and then amended the guidance within days to say it should not be used in younger people, people with stable long-term disabilities, learning disabilities or autism, after concerns that it would be applied unfairly.

::: quiz
A frailty index is calculated from 36 possible deficits. A 79-year-old woman has 9 of them recorded. Which statement is correct?
- [ ] Her frailty index is 9, which is high
- [x] Her frailty index is 0.25, which falls in the original eFI moderate frailty band
- [ ] Her index cannot be interpreted without knowing her age
- [ ] An index of 0.25 means she has a 25% chance of dying this year
::: solution
The index is 9/36 = 0.25 ([[#eq-fi]]). In the original eFI bands, "above 0.24 to 0.36" is moderate frailty. The index is a proportion of deficits, not a probability of death, and it is interpreted in the same way at any age (although older people tend to have higher values).
:::
:::

## Sarcopenia, malnutrition and immobility {#sec-sarcopenia}

::: definition Sarcopenia {#def-sarcopenia}
**Sarcopenia** is a progressive, generalised skeletal muscle disorder involving accelerated loss of muscle strength and mass. The European Working Group on Sarcopenia in Older People (EWGSOP2, 2019) defines **probable sarcopenia** by low muscle strength (for example low grip strength or slow repeated chair stands), **confirmed sarcopenia** when low muscle quantity or quality is also shown, and **severe sarcopenia** when poor physical performance (for example slow gait speed) is present as well.
:::

Muscle strength matters more than muscle mass. Weak legs make it hard to rise from a chair, climb stairs or recover from a trip, which links sarcopenia directly to falls, fractures and loss of independence. Sarcopenia and frailty overlap but are not the same: sarcopenia is a disorder of muscle, while frailty is a multi-system state that often includes it.

**Malnutrition** is common in older people at home and very common in hospital. Causes include poor appetite, dental problems, swallowing difficulty, depression, dementia, poverty, isolation, and illnesses that raise energy needs. In the UK, the Malnutrition Universal Screening Tool (MUST) combines body mass index, unplanned weight loss and the effect of acute illness on intake. Older adults generally need more protein per kilogram than younger adults to maintain muscle; expert groups such as the PROT-AGE study group (2013) and ESPEN recommend at least 1.0–1.2 g/kg/day for healthy older people and more during illness, unless kidney disease limits intake.

**Immobility** has its own harms. Bed rest causes rapid loss of muscle strength in older people, together with postural hypotension, pressure injury, constipation, urinary retention, venous thromboembolism and loss of confidence. Many hospitals now run programmes to get patients up, dressed and moving on every day of an admission, because "deconditioning" during a stay can turn an independent person into a dependent one.


## Comprehensive geriatric assessment {#sec-cga}

::: definition Comprehensive geriatric assessment {#def-cga}
**Comprehensive geriatric assessment (CGA)** is a multidimensional, interdisciplinary diagnostic process that identifies the medical, psychological, functional and social needs of a frail older person, and then develops and carries out a coordinated, integrated plan for treatment and follow-up. The plan, and its delivery by a team, are part of the definition: an assessment without a plan is not CGA.
:::

The domains of a CGA are usually grouped as follows.

| Domain | Typical content |
|---|---|
| Medical | Problem list, including undiagnosed problems; medication review; nutrition; continence; vision and hearing; oral health |
| Mental health | Cognition (for example the 4AT for delirium, a cognitive screen once delirium is excluded), mood, anxiety |
| Function | Basic activities of daily living (washing, dressing, toileting, transfers, eating) and instrumental activities (shopping, cooking, finances, medicines); gait and balance |
| Social | Living situation, carers and their strain, finances, support services, what matters to the person |
| Environment | Home layout and hazards, access to transport and community |
| Future planning | Goals, preferences, advance care planning, lasting power of attorney |

The team usually includes doctors, nurses, physiotherapists, occupational therapists, pharmacists and social workers, with dietitians, speech and language therapists and psychiatrists as needed. Its power comes from bringing these views together: the physiotherapist notices that the patient cannot stand without using her arms, the pharmacist finds two anticholinergic drugs, and the social worker learns that her husband, her carer, is himself unwell.

::: theorem CGA improves outcomes for frail older inpatients {#thm-cga}
A Cochrane review of randomised trials (Ellis and colleagues, 2017) found that older people admitted to hospital as an emergency who received CGA were more likely to be alive and living in their own homes 3 to 12 months later (risk ratio about 1.06) and less likely to be living in residential care (risk ratio about 0.80) than those who received usual care. The benefit was clearest when CGA was delivered on a dedicated ward by a specialist team.
:::

::: proof
CGA works because frail people's problems interact. Treating the pneumonia alone leaves the patient weak, confused and over-medicated. A team that also treats the delirium, gets her walking each day, stops the drugs that are causing postural hypotension, sorts out her nutrition and plans her discharge with her family addresses the reasons she might otherwise lose her independence. The size of the effect for an individual outcome is modest, but it applies to a large and growing population, and the outcome ("alive and at home") is the one that most older people say matters to them.
:::

::: example The "simple UTI" that was not simple {#ex-uti}
Mrs Rosa Bianchi, 84, is brought in by ambulance after being found on the floor at home. She is confused and her urine dipstick shows leucocytes and nitrites. The admitting note reads "UTI, start antibiotics, discharge when better". She lives alone, has hypertension and osteoarthritis, and takes amlodipine, bendroflumethiazide, co-codamol 30/500 four times daily and zopiclone at night. Use the threshold principle to identify what else must be assessed.
::: solution
In older women, a positive urine dipstick is common without infection (asymptomatic bacteriuria), and UK guidance (UKHSA and NICE) advises against using dipsticks to diagnose urinary infection in people over 65. So the first question is whether there is a urinary infection at all. Look for urinary symptoms, fever, raised inflammatory markers and other sources, and send a urine culture if infection is still suspected.

The threshold principle ([[#thm-threshold]]) says several deficits have combined. The list to assess:

- **Delirium.** Confusion with a fall suggests delirium; screen with the 4AT and look for every precipitant ([[geriatrics-palliative/delirium-dementia-care]]).
- **The fall.** How long was she on the floor? Check creatine kinase and renal function (rhabdomyolysis, acute kidney injury), temperature (hypothermia), pressure areas and injuries.
- **Medicines.** Codeine can cause constipation, urinary retention and confusion; zopiclone causes sedation and falls; the thiazide may cause hyponatraemia and, with amlodipine, postural hypotension. Check sodium and a lying and standing blood pressure.
- **Bladder and bowel.** Check for urinary retention (bladder scan) and constipation.
- **Function and home.** How did she manage before? Who can help now?

The plan becomes a CGA: treat any confirmed infection, correct the precipitants, review her medicines, get her moving early, and plan discharge with the team.
:::
:::

::: example After the hip fracture {#ex-hip}
Mr Harold Price, 76, falls at home and fractures his left femoral neck. He has Parkinson's disease, type 2 diabetes and mild cognitive impairment, and takes co-careldopa at fixed times five times a day. Outline the elements of good orthogeriatric care.
::: solution
In the UK, hip fracture care is shared between orthopaedic surgeons and orthogeriatricians (NICE CG124; outcomes are audited by the National Hip Fracture Database). The key elements:

1. **Surgery on the day of, or the day after, admission**, after optimising reversible problems without unnecessary delay. A nerve block (for example a fascia iliaca block) and regular analgesia control pain before surgery.
2. **Parkinson's medicines on time.** Missing doses of levodopa can cause severe rigidity, swallowing difficulty and, rarely, a dangerous syndrome resembling neuroleptic malignant syndrome. If he cannot swallow, specialist advice is needed on alternatives (for example a rotigotine patch). Dopamine-blocking antiemetics such as metoclopramide and most antipsychotics must be avoided.
3. **Delirium prevention**, because his cognitive impairment and the surgery make it likely.
4. **Mobilisation on the day after surgery**, unless there is a clear reason not to, with physiotherapy every day.
5. **Bone health and falls.** Start bone protection after the fracture (see [[endocrine/bone-calcium]]) and assess why he fell ([[geriatrics-palliative/falls]]): postural hypotension from Parkinson's disease or its treatment is a likely contributor.
6. **Nutrition, pressure care, glucose control and discharge planning** as part of a CGA.

Hip fracture carries a high mortality: roughly a quarter of patients die within a year, mostly from the frailty and illnesses that made the fall and fracture likely. That is why the orthogeriatric model treats the whole person, not only the hip.
:::
:::

## Explore: creatinine clearance and age

::: widget plot
f: (140-x)*w*1.23/s; (140-x)*w*1.04/s
sliders: w=60:40:100:1; s=90:50:200:5
x: 60, 100
y: 0, 100
hlines: 30; 50
labels: \text{men (F = 1.23)}; \text{women (F = 1.04)}
caption: Cockcroft–Gault creatinine clearance (mL/min) against age for a chosen weight $w$ (kg) and serum creatinine $s$ (µmol/L). The dashed lines at 30 and 50 mL/min mark thresholds at which many drug doses change. Keep the creatinine at 90 and reduce the weight to see how a "normal" creatinine can hide low clearance in a small, old person. An educational model, not a dosing tool.
:::

## Where this leads

The physiology behind reserve is covered in [[physiology/integrative-physiology]], and the pharmacology of age in [[pharmacology/patient-variation]]. Within this course, frailty and CGA are the foundation for [[geriatrics-palliative/falls]], [[geriatrics-palliative/delirium-dementia-care]] and [[geriatrics-palliative/polypharmacy]], and frailty is often the illness trajectory that leads to [[geriatrics-palliative/palliative-care]].

::: history
Before the twentieth century, most older people who could not live independently ended their lives in workhouse infirmaries, where they received little medical attention. In 1909 the New York physician Ignatz Nascher coined the word "geriatrics" and argued that old age deserved its own medicine. The modern specialty began in Britain in 1935, when Marjory Warren took charge of the chronic wards of the West Middlesex Hospital. She assessed each of the several hundred "chronic sick" patients, treated their illnesses, got them out of bed and rehabilitated them, and discharged many who had been assumed to need permanent care. Her approach of assessment, classification, rehabilitation and a dedicated team is the direct ancestor of comprehensive geriatric assessment. In 1963 Sidney Katz and colleagues published the index of activities of daily living, which gave clinicians a standard way to record function. The measurement of frailty followed at the turn of the century: Kenneth Rockwood and Arnold Mitnitski's deficit-accumulation index (2001) and Linda Fried's frailty phenotype (2001), and in 2005 the Clinical Frailty Scale.
:::

::: summary
- Ageing narrows physiological reserve (homeostenosis). Illness appears when a stress exceeds the remaining reserve, so the weakest system often fails first and presentations are atypical.
- The geriatric syndromes (falls, delirium, immobility, incontinence) have many contributing causes; the approach is to find and correct as many as possible.
- A "normal" creatinine can hide a low clearance in a small, older person; use the Cockcroft–Gault equation where drug guidance requires it.
- Frailty is a state of increased vulnerability. The phenotype counts five features; the frailty index is the proportion of deficits present. The Clinical Frailty Scale grades baseline function two weeks before the illness.
- Frailty scores prompt assessment and inform shared decisions; they never replace individual judgement.
- Sarcopenia (low muscle strength and mass) and malnutrition are common, linked to falls and dependence, and partly reversible.
- Comprehensive geriatric assessment is a team process that ends in a plan; for frail older inpatients it increases the chance of being alive and at home.
:::

## Exercises

::: exercise Calculate a frailty index {level=1 check="round(100*11/36)/100"}
A general practice record lists 11 of the 36 deficits used in the original electronic frailty index for an 82-year-old man. Calculate his frailty index to 2 decimal places and state his band.
::: hint
Divide the deficits present by the deficits considered ([[#eq-fi]]).
:::
::: solution
Frailty index $= 11/36 = 0.3056$, which is **0.31** to 2 decimal places. This is above 0.24 and not above 0.36, so it falls in the **moderate frailty** band of the original eFI. The score is a prompt to assess him clinically (for example with the Clinical Frailty Scale and a review of falls risk and medicines), not a diagnosis.
:::
:::

::: exercise Creatinine clearance in a man {level=1 check="round((140-79)*82*1.23/110)"}
A 79-year-old man weighing 82 kg has a serum creatinine of 110 µmol/L. Estimate his creatinine clearance with the Cockcroft–Gault equation, to the nearest whole mL/min.
::: solution
$$
\text{CrCl} = \frac{(140 - 79) \times 82 \times 1.23}{110} = \frac{6152.5}{110} \approx 55.9
$$
His creatinine clearance is about **56 mL/min**. The factor for men is 1.23 because creatinine is reported in µmol/L. For a heavier man the result is higher than for a small woman with the same creatinine, because more muscle produces more creatinine.
:::
:::

::: exercise Grade the Clinical Frailty Scale {level=1}
Grade the baseline Clinical Frailty Scale for each person: (a) a 72-year-old woman who swims three times a week and has well-controlled hypertension; (b) an 86-year-old man who washes and dresses himself but whose son does his shopping, cooking and banking; (c) a 90-year-old woman who needs two carers for all personal care but has been medically stable for a year.
::: solution
(a) She is active and has a well-controlled condition. She is fit (CFS 2), or very fit (CFS 1) if she is among the most active people for her age. (b) He needs help with higher-order activities but not personal care: **CFS 5, mild frailty**. (c) Completely dependent for personal care but stable and not approaching the end of life: **CFS 7, severe frailty**. In each case the grading describes the baseline, not the state during an acute illness.
:::
:::

::: exercise Protein for recovery {level=2 check="66"}
A 55 kg woman of 80 is recovering from pneumonia and has normal kidney function. Using a target of 1.2 g of protein per kg per day, how many grams of protein a day does she need? Suggest two practical ways to help her reach it in hospital.
::: solution
$55 \times 1.2 = 66$ g of protein per day. Practical steps: record her food intake and weigh her regularly; offer protein-rich snacks and oral nutritional supplements between meals; make sure she has her dentures, glasses and help with opening packets; protect mealtimes from interruptions; and involve a dietitian if her MUST score shows risk. Exercise with physiotherapy matters too: protein supports muscle best when the muscle is being used.
:::
:::

::: exercise Half-life and age {level=2 check="round(0.693*112/1.2)"}
Use these illustrative values for a fat-soluble benzodiazepine. In a young adult, $V_d = 77$ L and $CL = 1.6$ L/h. In an 85-year-old, $V_d = 112$ L and $CL = 1.2$ L/h. Calculate the half-life in the older person to the nearest hour, compare it with the young adult, and explain the clinical consequence.
::: hint
Use [[#eq-halflife]]. Roughly how many half-lives does a drug take to reach steady state?
:::
::: solution
Young adult: $t_{1/2} = 0.693 \times 77 / 1.6 \approx 33$ h. Older person: $t_{1/2} = 0.693 \times 112 / 1.2 \approx 64.7$ h, so about **65 hours**, roughly double. The larger volume of distribution (more fat) and the lower clearance both lengthen it. Steady state takes about four to five half-lives, so in the older person the drug keeps accumulating for 11–13 days after a regular dose is started, and sedation, falls and confusion can appear a week or more after the prescription. These values are illustrative; real doses and kinetics come from the formulary.
:::
:::

::: exercise Plan the admission of a frail man with delirium {level=2}
Mr Kwame Mensah ([[#ex-ftt]]) is found to have a urinary retention of 900 mL, constipation and a sodium of 126 mmol/L, and he is delirious. Using the CGA domains, write a problem list and the team members you would involve.
::: solution
Medical: delirium with precipitants (urinary retention, constipation, hyponatraemia, possible infection); review medicines that can cause retention or hyponatraemia (for example anticholinergics, opioids, thiazides, SSRIs); nutrition (poor intake for ten days); falls risk. Mental health: delirium now; screen cognition and mood once it has resolved. Function: baseline CFS 5; currently needs help to mobilise and toilet; daily physiotherapy to prevent deconditioning. Social: lives alone; daughter helps with shopping and finances; ask about her capacity to help more and whether he wants carers. Future: discuss goals and, if he wishes, a lasting power of attorney while he can make that decision. Team: doctors, nurses (catheter care, bowel care, delirium care), physiotherapist, occupational therapist, pharmacist, dietitian and, before discharge, social care. The plan should name who does what, by when.
:::
:::

::: exercise Interpret the CGA evidence {level=3 check="round(1/(0.6*0.06))"}
In a hospital, 60% of older emergency admissions who receive usual care are alive and living at home six months later. Suppose CGA increases this by a relative 6% (risk ratio 1.06, as in [[#thm-cga]]). Calculate the absolute increase and the number needed to treat for one extra person to be alive and at home, to the nearest whole number. Comment on whether the effect is worth having.
::: solution
With CGA, $0.60 \times 1.06 = 0.636$, so 63.6% are alive and at home. The absolute increase is $0.636 - 0.600 = 0.036$ (3.6 percentage points). The number needed to treat is $1/0.036 \approx 27.8$, so about **28**. One extra person alive and in her own home for every 28 frail older people assessed is a worthwhile effect: the intervention is mainly staff time, has few harms, and also reduces moves into care homes. The calculation assumes the trial result applies to this hospital's population, which depends on delivering CGA as the trials did.
:::
:::

::: exercise A frailty score at the door of intensive care {level=3}
A 74-year-old woman with severe pneumonia is being considered for intensive care. A colleague says, "Her CFS is 6, so she's not for ICU." Discuss what is right and wrong with this reasoning and how the decision should be made.
::: solution
What is right: frailty predicts worse outcomes after critical illness, and a CFS of 6 means she is likely to have a long and difficult recovery and a higher chance of dying, so the question of whether intensive care will help her is a fair one. What is wrong: a score summarises a group, not an individual. The decision must consider whether the CFS was graded correctly (her baseline two weeks ago, not her state today), whether the acute illness is likely to be reversible, her other conditions, and above all what she would want, including any advance decision or the views of her family about her wishes. Some patients with CFS 6 would choose and benefit from a time-limited trial of intensive treatment; others would prefer ward-based care focused on comfort. The fair process is a senior clinical decision, made with the patient or those who know her wishes, documented with reasons, and never made on the score alone.
:::
:::
