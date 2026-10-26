An intensive care unit (ICU) looks after patients whose organs are failing, using machines and drugs to support them while the underlying illness is treated or recovers. The technology is impressive, but most of what makes a difference to outcome is unglamorous: avoiding harm from the treatment itself, preventing infections, keeping sedation light, getting patients moving, feeding them sensibly, and talking honestly with them and their families. Critical care is also where many of the hardest decisions in medicine are made, about when treatment is helping and when it is only prolonging dying.

This chapter describes how critical care is organised, who is admitted and why, the daily review, organ support, sepsis and organ dysfunction scores, sedation and delirium, weaning from ventilation, nutrition and glucose control, the prevention of ICU-acquired complications, communication and end-of-life care, organ donation, and recovery after critical illness. UK organisation and guidance (Intensive Care Society, Faculty of Intensive Care Medicine, NICE) are followed, with international trials where they shaped practice.

## The unit {#def-unit}

::: definition Levels of care {#def-levels}
In the UK, care is described by the level of support a patient needs rather than by the ward they are on (Intensive Care Society, *Levels of Adult Critical Care*, second edition, 2021):

| Level | Patients |
|---|---|
| **0** | Needs can be met on a normal ward |
| **1** | At risk of deterioration, or recently stepped down from higher care, needing additional monitoring or input from the critical care outreach team, on a ward |
| **2** | Need single organ support (other than advanced respiratory support), more detailed observation or intervention, or step-down from level 3 (traditionally a high-dependency unit) |
| **3** | Need advanced respiratory support (invasive ventilation) alone, or support of two or more organ systems |

Organ support includes invasive ventilation, non-invasive ventilation, vasoactive drugs, renal replacement therapy and, in specialist centres, extracorporeal membrane oxygenation (ECMO).
:::

**Who is admitted?** Critical care is appropriate for patients with a reversible illness who need organ support that cannot be given elsewhere and who would want it. The decision balances the likelihood of benefit (the reversibility of the acute illness, the patient's frailty and chronic health, and their physiological reserve) against the burden of treatment, and it respects the patient's known wishes. Frailty, measured for example by the **Clinical Frailty Scale**, strongly predicts outcome in older patients. Admission is not an all-or-nothing choice: a patient may be admitted for a **time-limited trial** of treatment with clear goals, or may receive ward-based care with a defined ceiling of treatment.

### The daily review

Each patient is reviewed at least daily by the multidisciplinary team (intensivists, nurses, pharmacists, physiotherapists, dietitians, microbiologists), system by system: neurology and sedation, respiratory, cardiovascular, renal and fluid balance, gastrointestinal and nutrition, haematology, infection and lines, skin, and the family's understanding and the goals of care. Many units use a checklist so that nothing is forgotten. One common mnemonic is **FAST HUGS BID**: **F**eeding, **A**nalgesia, **S**edation, **T**hromboprophylaxis, **H**ead of bed elevation, stress **U**lcer prophylaxis, **G**lucose control, **S**pontaneous breathing trial, **B**owel care, **I**ndwelling catheter removal, **D**e-escalation of antibiotics.

## Organ dysfunction and sepsis {#sec-sepsis}

::: definition Sepsis, septic shock and the SOFA score {#def-sofa}
Under the **Sepsis-3** definitions (2016), **sepsis** is life-threatening organ dysfunction caused by a dysregulated host response to infection. Organ dysfunction is identified as an acute increase of **2 points or more** in the **Sequential Organ Failure Assessment (SOFA)** score. **Septic shock** is sepsis in which, despite adequate fluid resuscitation, vasopressors are needed to maintain a MAP of 65 mmHg or more and the serum lactate is above 2 mmol/L.

The SOFA score assigns 0–4 points to each of six systems (total 0–24):

| System | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Respiration: PaO₂/FiO₂, mmHg | ≥400 | <400 | <300 | <200 with respiratory support | <100 with respiratory support |
| Coagulation: platelets, ×10⁹/L | ≥150 | <150 | <100 | <50 | <20 |
| Liver: bilirubin, µmol/L | <20 | 20–32 | 33–101 | 102–204 | >204 |
| Cardiovascular | MAP ≥70 mmHg | MAP <70 mmHg | Dopamine ≤5 or any dobutamine | Dopamine >5, or adrenaline or noradrenaline ≤0.1 µg/kg/min | Dopamine >15, or adrenaline or noradrenaline >0.1 µg/kg/min |
| CNS: Glasgow Coma Scale | 15 | 13–14 | 10–12 | 6–9 | <6 |
| Renal: creatinine, µmol/L (or urine output) | <110 | 110–170 | 171–299 | 300–440 (or <500 mL/day) | >440 (or <200 mL/day) |

A revised score, **SOFA-2**, was published in 2025 with the same six systems but updated variables and thresholds that reflect current practice; units are beginning to adopt it.
:::

The point of the SOFA score is not to make a diagnosis but to describe how sick a patient is and how that changes. A rising SOFA score over the first days predicts mortality; a falling score suggests recovery. In ICU, sepsis is managed by finding and controlling the source (drainage of collections, removal of infected lines, surgery), choosing and then narrowing antibiotics on the basis of cultures, and supporting the failing organs as described in [[emergency-critical-care/shock-fluids]]. Many patients have **acute kidney injury**, staged by KDIGO criteria ([[renal/acute-kidney-injury]]); renal replacement therapy is started for refractory hyperkalaemia, acidosis, fluid overload or uraemic complications. The STARRT-AKI trial (2020) found no survival benefit from starting it early in the absence of these indications.

::: example Calculating a SOFA score {#ex-sofa}
A 67-year-old man with faecal peritonitis is ventilated with PaO₂ 10.5 kPa on FiO₂ 0.5. Platelets 85 × 10⁹/L, bilirubin 40 µmol/L, noradrenaline 0.15 µg/kg/min, creatinine 190 µmol/L. Before sedation, his GCS was 15. Calculate his SOFA score.
::: solution
PaO₂/FiO₂ $= 10.5 / 0.5 = 21$ kPa, which is $21 \times 7.5 \approx 158$ mmHg: below 200 with respiratory support, **3 points**.

| System | Value | Points |
|---|---|---|
| Respiration | 158 mmHg, ventilated | 3 |
| Coagulation | 85 | 2 |
| Liver | 40 | 2 |
| Cardiovascular | Noradrenaline 0.15 | 4 |
| CNS | GCS 15 (pre-sedation) | 0 |
| Renal | 190 | 2 |

Total: $3 + 2 + 2 + 4 + 0 + 2 = 13$. This indicates severe multiple organ dysfunction. For a sedated patient the GCS is usually scored as the presumed value without sedation.
:::
:::

## Organ support and the liberation bundle {#def-support}

### Ventilation, sedation and delirium

Mechanical ventilation (see [[emergency-critical-care/airway-ventilation]]) needs analgesia and, often, sedation. Deep sedation, once routine, is now known to prolong ventilation, increase delirium and weakness, and possibly raise mortality. Modern practice is **analgesia first**, then the **lightest sedation** that keeps the patient safe and comfortable, assessed regularly with the **Richmond Agitation–Sedation Scale (RASS)**, which runs from +4 (combative) through 0 (alert and calm) to −5 (unrousable). A target of 0 to −2 suits most patients. Propofol and dexmedetomidine are preferred to benzodiazepines, which are linked to more delirium.

::: definition Delirium in critical care {#def-delirium}
**Delirium** is an acute, fluctuating disturbance of attention and awareness, with disorganised thinking or an altered level of consciousness, caused by an underlying medical condition. In the ICU it is common (often affecting a third or more of ventilated patients), is frequently **hypoactive** (quiet and withdrawn) rather than agitated and so easily missed, and is associated with longer stays, higher mortality and long-term cognitive impairment. It is screened for at least daily with a validated tool such as the **Confusion Assessment Method for the ICU (CAM-ICU)**: (1) acute onset or fluctuating course, plus (2) inattention, plus either (3) altered level of consciousness or (4) disorganised thinking.
:::

Delirium is managed by treating causes (infection, hypoxaemia, metabolic disturbance, drug withdrawal, pain, urinary retention, constipation, drugs with anticholinergic or sedative effects), by non-drug measures (orientation, glasses and hearing aids, a day–night routine, sleep, early mobilisation, family visits), and by avoiding benzodiazepines except in alcohol withdrawal. Antipsychotics have not been shown to shorten delirium; they are reserved for distressing agitation.

::: definition The ABCDEF bundle {#def-abcdef}
The **ABCDEF ("liberation") bundle** groups evidence-based practices that reduce ventilator days, delirium and weakness:

- **A**: Assess, prevent and manage pain.
- **B**: **Both** spontaneous awakening trials (daily interruption or lightening of sedation) and spontaneous breathing trials.
- **C**: **Choice** of analgesia and sedation.
- **D**: **Delirium**: assess, prevent and manage.
- **E**: **Early** mobility and exercise.
- **F**: **Family** engagement and empowerment.

In large observational studies, higher compliance with the bundle was associated with lower mortality, less delirium and fewer days of ventilation.
:::

### Weaning from ventilation

As the illness improves, the patient is assessed daily for readiness to wean: the cause of respiratory failure improving, adequate oxygenation on modest FiO₂ and PEEP, haemodynamic stability, and the ability to breathe spontaneously. A **spontaneous breathing trial (SBT)**, usually 30–120 minutes on low pressure support or a T-piece, tests whether the patient can manage. If they pass, and can cough and protect their airway, they are extubated.

Patients who need prolonged ventilation may need a **tracheostomy**, which is more comfortable, allows lighter sedation and makes weaning easier. In the UK TracMan trial (2013), early tracheostomy (within 4 days) did not reduce 30-day mortality compared with tracheostomy after 10 days or more, and many patients in the late group never needed one, so tracheostomy is usually deferred until it is clear that prolonged ventilation is likely.

### Other organ support

- **Cardiovascular**: vasopressors and inotropes, guided by echocardiography and cardiac output monitoring.
- **Renal**: continuous renal replacement therapy (haemofiltration) is used in haemodynamically unstable patients; intermittent haemodialysis in stable ones.
- **Respiratory**: in severe respiratory failure, **venovenous ECMO** in a specialist centre. In the UK CESAR trial (2009), referral to an ECMO centre improved survival without severe disability at 6 months; the international EOLIA trial (2018) in severe ARDS did not show a statistically significant difference in 60-day mortality, though results favoured ECMO. ECMO is concentrated in a small number of designated centres in the UK.

### Nutrition and glucose

Critical illness causes rapid loss of muscle, and patients who cannot eat need feeding. **Enteral nutrition** (via a nasogastric tube) is preferred to parenteral and is usually started within 24–48 hours once the patient is resuscitated. In the first days, energy targets are modest (full feeding early can worsen outcomes), increasing over the first week; typical targets are about 20–25 kcal/kg/day of energy and about 1.3 g/kg/day of protein, adjusted by a dietitian. Patients who have eaten little for days are at risk of **refeeding syndrome**, with falls in phosphate, potassium and magnesium, and are started slowly with thiamine and electrolyte monitoring. Hidden calories count: propofol is given in a lipid emulsion that provides about 1.1 kcal/mL.

**Glucose control**: stress hyperglycaemia is common. Very tight control was once favoured, but the NICE-SUGAR trial (2009), in more than 6,000 ICU patients, found that a target of 4.5–6.0 mmol/L increased mortality compared with a target of 10 mmol/L or less, largely through hypoglycaemia. Most units now aim for about 6–10 mmol/L.

## Preventing the complications of intensive care {#sec-prevention}

Many of the harms in an ICU come from the treatment itself. Preventing them is part of everyday care.

| Complication | Prevention |
|---|---|
| **Ventilator-associated pneumonia** | Head of bed raised 30–45°, light sedation and daily sedation holds, early weaning, subglottic secretion drainage, oral care, avoidance of unnecessary reintubation |
| **Central line-associated bloodstream infection** | Insertion bundle (hand hygiene, full barrier precautions, chlorhexidine skin preparation, avoiding the femoral site where possible), daily review of need, prompt removal |
| **Catheter-associated urinary infection** | Avoid catheters when possible; remove as soon as possible |
| **Venous thromboembolism** | Low-molecular-weight heparin unless contraindicated; mechanical prophylaxis when anticoagulation is not possible |
| **Stress ulcer bleeding** | Acid suppression in high-risk patients (such as those ventilated); in the REVISE trial (2024), pantoprazole reduced clinically important upper gastrointestinal bleeding in ventilated patients without changing mortality |
| **Pressure injuries** | Regular repositioning, pressure-relieving mattresses, nutrition, skin inspection |
| **ICU-acquired weakness** | Light sedation, early mobilisation and rehabilitation, glucose control, minimising neuromuscular blockers and steroids |
| **Antimicrobial resistance and *C. difficile*** | Daily antibiotic review, short courses, de-escalation on culture results |

The value of simple bundles was shown in a 2006 study led by Peter Pronovost in more than 100 ICUs in Michigan: a checklist-based programme for central line insertion reduced catheter-related bloodstream infections dramatically and the effect was sustained.

::: warning The forgotten line
Lines, catheters and drains that are no longer needed are a leading source of preventable infection. They are easy to forget because they are not causing a problem today. Every indwelling device should be reviewed daily with one question: is it still needed? A cannula placed in the emergency department for a fluid bolus five days ago, or a urinary catheter kept "for strict fluid balance" in a patient who is now drinking, is a risk without a benefit.
:::

::: widget markov
matrix: 0.85,0.10,0,0.05; 0.05,0.70,0.22,0.03; 0,0,1,0; 0,0,0,1
states: Ventilated; Off ventilator in ICU; Discharged from ICU; Died
start: 0
steps: 30
title: A simplified model of daily transitions in ICU
caption: An illustrative Markov model, not real data. Each day a ventilated patient has, in this example, an 85% chance of remaining ventilated, 10% of being liberated from the ventilator and 5% of dying; a patient off the ventilator may be reintubated, stay, be discharged or die. Run the chain to see how the probabilities of discharge and death accumulate over a month. Small changes in the daily chance of liberation (which bundles such as ABCDEF aim to increase) change the length of stay considerably.
:::

## The person and the family {#def-person}

Critically ill patients usually cannot take part in decisions, and their families are often frightened and exhausted. Good communication is a core clinical skill in critical care.

::: definition Shared decision-making and time-limited trials {#def-tlt}
Decisions about life-sustaining treatment for a patient who lacks capacity are made in the patient's **best interests** (in England and Wales under the Mental Capacity Act 2005), which means considering what the patient would have wanted, consulting those close to them and anyone holding a lasting power of attorney for health and welfare, and respecting any valid **advance decision to refuse treatment**. Clinicians are not obliged to provide treatment that they judge would not be of overall benefit. A **time-limited trial** is an agreement to provide full support for a defined period, with explicit goals and a planned review, after which treatment continues if it is helping or is withdrawn if it is not.
:::

Families are best informed through regular, planned meetings with a senior clinician and the bedside nurse, in a quiet room, starting by asking what they already understand, giving information in plain language, acknowledging uncertainty and emotion, and agreeing next steps. **ICU diaries**, written by staff and family during the stay, help patients later make sense of the gap in their memory and have been associated with less post-traumatic stress in some studies.

When treatment is no longer able to achieve a recovery the patient would value, the focus moves to comfort. Life-sustaining treatments (vasopressors, ventilation, dialysis) are withdrawn in a planned way, symptoms such as breathlessness, distress and secretions are treated, and the family is supported. Withdrawing treatment that is not helping is ethically and legally equivalent to not starting it.

### Organ donation

Many organ donors die in intensive care. Donation can follow **death verified by neurological criteria** (brain-stem death) or **circulatory death** after planned withdrawal of treatment. In the UK, every potential donor should be identified and referred to the NHS Blood and Transplant specialist nurse, who leads the conversation with the family. The UK nations now have opt-out ("deemed consent") systems: Wales from 2015, England from 2020, Scotland from 2021 and Northern Ireland from 2023. The family is still always involved, and the decision to withdraw treatment is made separately from, and before, any discussion of donation.

## After intensive care {#sec-recovery}

Survival is not the end of the story. Many survivors have **post-intensive care syndrome (PICS)**: new or worse physical problems (weakness, fatigue, breathlessness, pain), cognitive impairment (memory, attention, executive function), and psychological problems (anxiety, depression, post-traumatic stress disorder). Families can have psychological symptoms too ("PICS-family"). Recovery may take months or years, and some patients never return to work.

NICE guideline CG83 (rehabilitation after critical illness, 2009) recommends assessing patients for the risk of physical and non-physical problems during their ICU stay, an individualised rehabilitation programme, a review before discharge from the ward, and a follow-up review 2–3 months after discharge from critical care. Many units run follow-up clinics and peer support groups.

**Readmission** to ICU after discharge is associated with high mortality. Risk factors include discharge at night, discharge while still physiologically unstable, high SOFA score at discharge and multiple comorbidities. Critical care outreach teams follow patients after discharge to the ward to detect deterioration early.

## Worked cases

::: example A ventilated grandmother with a ceiling of treatment {#ex-ceiling}
An 84-year-old woman with moderate dementia (Clinical Frailty Scale 6), who lives in a care home, is admitted with severe pneumonia and type 1 respiratory failure. She is on high-flow nasal oxygen at FiO₂ 0.7 with SpO₂ 90%. Her son asks for "everything to be done". How should the team approach the decision about invasive ventilation?
::: solution
The decision is a best-interests judgement, because she cannot take part in it now.

1. **Likelihood of benefit**: her frailty, dementia and severe pneumonia mean that invasive ventilation would carry a high risk of death and, for survivors, of further loss of function. That does not decide the question alone, but it must be explained honestly.
2. **Her wishes and values**: ask her son and the care home what she has said about hospital treatment and what matters to her. Check for an advance care plan, a ReSPECT form, an advance decision or a lasting power of attorney.
3. **Options short of intubation**: continued high-flow oxygen or non-invasive support on a ward or in a level 2 area, antibiotics, physiotherapy, symptom control, with intubation as a ceiling not crossed.
4. **Communication**: a senior clinician explains that "everything" will be done that can help her, and that the team will continue active treatment, but that intubation is unlikely to help her recover to a life she would value and may cause suffering. Clinicians are not obliged to provide treatment that is not in her best interests, but should seek agreement, offer a second opinion if there is disagreement, and document the discussion.

A clear plan protects her from a crisis decision at 3 a.m.
:::
:::

::: example The preventable third of the stay {#ex-bundle}
A 45-year-old man is ventilated for pneumonia. On day 4 his oxygenation has improved (FiO₂ 0.35, PEEP 5), but he is deeply sedated (RASS −4) on a midazolam infusion, has had no spontaneous breathing trial, and has not been out of bed. What changes would the ABCDEF bundle make?
::: solution
- **A**: assess pain with a validated tool and treat it, with analgesia first.
- **B**: perform a **spontaneous awakening trial** today (stop or reduce sedation), followed by a **spontaneous breathing trial** if he is awake and breathing adequately. He meets the basic criteria for weaning.
- **C**: change the sedative from midazolam (a benzodiazepine, linked to delirium and prolonged ventilation, and accumulating in the body) to light sedation with propofol or dexmedetomidine if sedation is still needed, targeting RASS 0 to −1.
- **D**: screen for delirium with CAM-ICU once he is rousable, and address causes.
- **E**: physiotherapy for early mobilisation: sitting on the edge of the bed, standing, then walking when safe, even while still ventilated.
- **F**: involve his family in reorientation and goals.

Deep sedation without a clear reason is one of the main reasons ventilation lasts days longer than necessary.
:::
:::

::: example The line that stayed in {#ex-line}
On day 9 of an ICU admission for pancreatitis, a 51-year-old woman develops fever (38.9 °C), rigors and hypotension. She has a femoral central venous catheter inserted on day 1 and a urinary catheter. Her abdomen is unchanged. What is the likely source, and what should be done?
::: solution
A **central line-associated bloodstream infection** is likely: a line in place for 9 days, at the femoral site (higher infection risk), with sudden fever, rigors and hypotension. Other possibilities are infected pancreatic necrosis, ventilator-associated pneumonia (if ventilated), urinary infection and *C. difficile*.

1. Resuscitate and treat as septic shock.
2. Take **blood cultures from the line and peripherally**, and cultures from other sites.
3. **Remove the catheter** (insert a new one at a different site if needed) and send the tip for culture.
4. Start empirical antibiotics covering skin organisms including MRSA, and Gram-negative organisms, according to local guidance; narrow once cultures return. *Staphylococcus aureus* bacteraemia needs echocardiography and a prolonged course.
5. Review why the line was still there, and the unit's line care bundle.
:::
:::

::: example The readmission that was predictable {#ex-readmission}
A 70-year-old man with COPD is discharged from ICU to a respiratory ward at 23:30 on day 6 after ventilation for pneumonia, because the unit needs his bed. His respiratory rate is 26/min and he has a weak cough with thick secretions. Two days later he is readmitted to ICU with respiratory failure. What could have been done differently?
::: solution
Several known risk factors for readmission were present: discharge **at night**, a raised **respiratory rate** at discharge, a **weak cough** with secretions after recent extubation, and chronic lung disease. Preventive steps would include: delaying discharge until daytime where possible (or escalating the bed pressure to managers rather than moving an at-risk patient at night); a structured handover to the ward team with a clear plan and ceiling of treatment; chest physiotherapy and a plan for secretion clearance (possibly NIV or cough assistance); and a review by the **critical care outreach** team within hours of discharge and regularly afterwards. Night discharge and premature discharge are system problems, and they should be audited.
:::
:::

::: quiz
Which statement about glucose control in critically ill adults is supported by the NICE-SUGAR trial?
- [ ] Glucose should be kept between 4.5 and 6.0 mmol/L in all ICU patients.
- [x] A target of 10 mmol/L or less was associated with lower mortality than a tight target of 4.5–6.0 mmol/L.
- [ ] Insulin should be avoided in ICU.
- [ ] Hyperglycaemia in ICU does not need treatment.
::: solution
NICE-SUGAR (2009) found higher mortality with intensive glucose control, largely because of hypoglycaemia. Most units now aim for about 6–10 mmol/L, treating hyperglycaemia with insulin but avoiding both extremes.
:::
:::

::: history
The modern ICU grew from the Copenhagen poliomyelitis epidemic of 1952, when the anaesthetist Bjørn Ibsen showed that patients with respiratory paralysis could be kept alive with tracheostomy and manual positive-pressure ventilation, delivered around the clock by teams of medical students. Gathering such patients in one area with continuous nursing and medical attention became the model for intensive care units, which spread through Europe and North America in the 1950s and 1960s. Peter Safar, who had worked on resuscitation in Baltimore, established one of the first physician-staffed ICUs in the USA in 1958. In the UK, intensive care medicine became a specialty in its own right with the founding of the Faculty of Intensive Care Medicine in 2010. Large randomised trials from the 1990s onward, many of them led by British, Australian, New Zealand and Canadian trial groups, have repeatedly shown that doing less (lower tidal volumes, lighter sedation, less glucose control, less blood) is often better.
:::

## Where this leads

Shock and fluid therapy are in [[emergency-critical-care/shock-fluids]]; ventilation in [[emergency-critical-care/airway-ventilation]]; care after cardiac arrest in [[emergency-critical-care/resuscitation]]. Acute kidney injury is in [[renal/acute-kidney-injury]], sepsis in [[infectious-diseases/fever-sepsis]], infections acquired in hospital in [[infectious-diseases/healthcare-infections]], nutrition in [[gastrointestinal/clinical-nutrition]], and the ethics and law of withdrawing treatment and organ donation in [[medical-ethics-law/end-of-life-ethics]].

::: summary
- Critical care is organised by level of support (levels 0–3). Admission weighs reversibility, frailty and the patient's wishes; time-limited trials and ceilings of care are legitimate options.
- Sepsis-3: sepsis is infection with organ dysfunction (SOFA rise of 2 or more); septic shock needs vasopressors for MAP 65 mmHg and has lactate above 2 mmol/L.
- Analgesia first, light sedation (RASS 0 to −2), avoid benzodiazepines, screen for delirium (CAM-ICU), and apply the ABCDEF bundle.
- Daily spontaneous awakening and breathing trials shorten ventilation; tracheostomy is usually deferred (TracMan).
- Feed enterally early with modest initial targets, watch for refeeding, and keep glucose about 6–10 mmol/L (NICE-SUGAR).
- Prevent VAP, line infection, VTE, stress ulcer bleeding, pressure injuries and weakness with simple daily bundles; remove lines that are no longer needed.
- Communicate early and regularly with families; withdraw treatment that is not helping, provide good end-of-life care, and refer potential organ donors.
- Survivors often have post-intensive care syndrome; follow-up and rehabilitation are part of critical care (NICE CG83).
:::

## Exercises

::: exercise PaO₂/FiO₂ ratio {level=1 check="20"}
A ventilated patient has a PaO₂ of 8 kPa on FiO₂ 0.4. Calculate the PaO₂/FiO₂ ratio in kPa.
::: solution
$8 / 0.4 = 20$ kPa (about 150 mmHg). This would score 3 on SOFA if he is on respiratory support (below 200 mmHg), and corresponds to moderate ARDS by the Berlin criteria if the other criteria are met.
:::
:::

::: exercise Hidden calories {level=1 check="528"}
A patient receives propofol 1% at 20 mL/h for 24 hours. If the lipid vehicle provides 1.1 kcal/mL, how many kcal does the propofol supply per day?
::: solution
Volume per day $= 20 \times 24 = 480$ mL. Energy $= 480 \times 1.1 = 528$ kcal. This is a substantial fraction of the energy target and should be counted when prescribing feed, to avoid overfeeding.
:::
:::

::: exercise A SOFA score {level=2 check="9"}
A ventilated patient has PaO₂/FiO₂ 250 mmHg, platelets 45 × 10⁹/L, bilirubin 18 µmol/L, MAP 66 mmHg without vasopressors, GCS 15 before sedation, and creatinine 320 µmol/L. Calculate the SOFA score.
::: solution
Respiration: 250 is below 300, **2**. Coagulation: 45 is below 50, **3**. Liver: 18 is below 20, **0**. Cardiovascular: MAP below 70 without vasopressors, **1**. CNS: **0**. Renal: 320 is in 300–440, **3**. Total $2 + 3 + 0 + 1 + 0 + 3 = 9$.
:::
:::

::: exercise Start nutrition {level=1}
A 70 kg man is ventilated on day 2 for pneumonia. He is haemodynamically stable on a low dose of noradrenaline, and his gut is functioning. He ate little for a week before admission. Outline his nutrition plan.
::: solution
Start **enteral feeding** via a nasogastric tube within 24–48 hours, at a modest rate that increases over several days to a target of about 20–25 kcal/kg/day (roughly 1,400–1,750 kcal) and protein about 1.3 g/kg/day (about 90 g), adjusted by the dietitian. Because he ate little for a week, he is at risk of **refeeding syndrome**: give thiamine, start slowly, and check phosphate, potassium and magnesium daily, replacing as needed. Count propofol calories if he is on it. Monitor gastric tolerance, glucose (target about 6–10 mmol/L) and bowels.
:::
:::

::: exercise Screen the delirium {level=2}
On day 5, a ventilated woman is calm and lies quietly with her eyes open (RASS 0). When asked to squeeze the nurse's hand whenever she hears the letter "A" in a list of ten letters, she makes six errors. Her nurse says she was more alert yesterday. Does she have delirium by CAM-ICU, and what should be done?
::: solution
Feature 1 (acute change or fluctuating course) is present: her mental state fluctuates compared with yesterday. Feature 2 (inattention) is present: more than two errors on the attention test. Feature 3 (altered level of consciousness) is absent, as her RASS is 0, so feature 4 (disorganised thinking) must be tested with simple yes/no questions and a command. If she makes more than one error, she is **CAM-ICU positive**: she has **hypoactive delirium**. Look for causes (infection, metabolic disturbance, drugs, pain, sleep deprivation), reduce sedatives and anticholinergic drugs, and use non-drug measures (orientation, glasses and hearing aids, mobilisation, sleep, family visits). Antipsychotics are not indicated for quiet delirium.
:::
:::

::: exercise Tracheostomy or not? {level=2}
On day 3 of ventilation for severe pneumonia, a 58-year-old man's family asks whether he should have a tracheostomy now, "to get it over with". What does the evidence suggest?
::: solution
The TracMan trial found that early tracheostomy (within 4 days) did not reduce mortality compared with tracheostomy after 10 days or more, and that many patients in the late group were extubated without ever needing one. A tracheostomy is a procedure with risks, so the usual approach is to continue daily sedation holds and breathing trials, and to perform a tracheostomy if it becomes clear that ventilation will be prolonged or weaning repeatedly fails. Explaining this reasoning helps the family understand that waiting is an active decision, not delay.
:::
:::

::: exercise Lead the family meeting {level=3}
A 62-year-old man has been in ICU for 3 weeks after a cardiac arrest followed by multiple organ failure. Neurological assessment shows severe hypoxic brain injury with no prospect of meaningful recovery. His wife and two daughters believe he is "a fighter". Plan the family meeting.
::: solution
Before: a senior clinician reviews all the information and agrees the plan with colleagues (including a second consultant opinion on the prognosis); a quiet room, the bedside nurse present, enough time, interpreters if needed.

During: introductions; ask what they understand and what they have noticed; give a warning that the news is serious; explain clearly and without jargon that his brain was badly injured when his heart stopped, the tests that show this, and that he will not wake up to recognise or communicate with them. Pause and allow emotion. Ask what he valued and what he would have wanted in this situation, framing the decision as the team's recommendation in his best interests rather than a burden placed on the family. Explain that treatment that cannot help him will be withdrawn, that his comfort will be the priority and that they can be with him. Organ donation is raised by or with the specialist nurse only after the decision about withdrawal has been understood. Agree the next steps and check understanding.

After: document the conversation, support the staff, and offer the family bereavement support.
:::
:::

::: exercise Run the outreach service {level=3}
An outreach team is asked to reduce unplanned ICU readmissions within 48 hours of discharge. Using what you know about risk factors, propose three measures and a way of measuring their effect.
::: solution
1. **Avoid high-risk discharges**: stop non-urgent discharges at night and discharges of patients who still meet "not ready" criteria (raised NEWS2, high respiratory rate, weak cough with secretions, recent extubation), escalating bed pressures to managers instead.
2. **Structured handover and follow-up**: a written and verbal handover to the ward with a treatment plan and ceiling of care, and an outreach review within 4–6 hours of discharge and daily for 48 hours.
3. **Ward support**: training in early warning scores and escalation, and rapid physiotherapy access for patients with secretion problems.

Measure the 48-hour readmission rate (and mortality after readmission) monthly, with run charts to look for change over time, and audit each readmission to learn which measure failed.
:::
:::
