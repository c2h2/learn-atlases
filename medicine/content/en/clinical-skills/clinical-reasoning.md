Clinical reasoning is the thinking that turns a history, an examination and a set of results into a diagnosis and a plan. It is done under uncertainty, often under time pressure, and usually with incomplete information. Most of the time it works well. When it fails, the cause is more often a flaw in reasoning than a lack of knowledge: the right diagnosis was known to the clinician but was not considered, or was dismissed too early.

This chapter describes how clinicians generate and test hypotheses, how probability and Bayes' theorem lie behind every decision to test or treat, how clinical prediction rules work, and how cognitive biases cause diagnostic error. The quantitative ideas are taken further in [[clinical-skills/laboratory-tests]] and [[epidemiology-ebm/diagnostic-tests]].

## Diagnosis as a process

::: definition Differential and working diagnosis {#def-differential}
A **differential diagnosis** is the list of conditions that could explain a patient's presentation, ideally ordered by likelihood and with the most dangerous possibilities identified. A **working diagnosis** is the diagnosis on which the clinician is currently acting, held provisionally and revised as information arrives. A **final diagnosis** is the one accepted after the evidence has been gathered, which may itself be revised if the course of illness does not fit.
:::

Diagnosis is rarely a single moment. It is a cycle of generating hypotheses, gathering information that discriminates between them, and updating. The cycle continues after the patient is treated: a response to treatment is evidence, and so is a failure to respond.

### Two modes of thinking

Psychologists describe two modes of thought, often called **System 1** and **System 2**. The distinction, popularised in medicine by the emergency physician Pat Croskerry, is useful for understanding both expertise and error.

::: definition Dual-process reasoning {#def-dual}
**System 1** (intuitive, or non-analytical) reasoning is fast, automatic and based on **pattern recognition**: the clinician recognises a presentation because it resembles cases seen before. **System 2** (analytical) reasoning is slow, deliberate and effortful: the clinician works through a problem step by step, considering probabilities and alternatives. Experts use both and switch between them; System 1 handles familiar presentations efficiently, and System 2 is needed when the pattern does not fit, the stakes are high, or the case is unfamiliar.
:::

Pattern recognition is not a lesser form of reasoning. It is how experienced clinicians recognise shingles from across a room, and it is usually right. It is vulnerable, though, when a presentation looks like a common pattern but is not one: the "migraine" that is a subarachnoid haemorrhage, the "gastritis" that is an inferior myocardial infarction. Analytical reasoning is slower but makes assumptions explicit. Good practice is to let System 1 propose and System 2 check, especially before discharging a patient or closing a diagnosis.

### Generating the differential

Several strategies help to produce a complete list:

- **Anatomical**: think through the structures in the region. For chest pain: skin and muscle, ribs, pleura, lung, pericardium, myocardium, aorta, oesophagus, and referred pain from the abdomen.
- **Pathological (the "surgical sieve")**: run through categories of disease: congenital, infective, inflammatory, neoplastic, vascular, traumatic, metabolic and endocrine, degenerative, drug-induced and iatrogenic, and psychological.
- **Physiological**: reason from mechanism. For hyponatraemia: too much water relative to sodium, or loss of sodium in excess of water; then ask which mechanism fits.
- **Common, dangerous and treatable**: list the commonest causes, the causes that must not be missed because they are dangerous, and those that are treatable.

Two old maxims pull in opposite directions. **Occam's razor** suggests looking for a single diagnosis that explains all the findings, which works well in young, previously healthy patients. **Hickam's dictum** ("patients can have as many diseases as they please") reminds us that older people with several conditions often have more than one explanation for their symptoms.

## Probability and Bayes' theorem

Every diagnostic decision rests on a probability, even if it is never stated. "This is probably musculoskeletal" means something like "I think there is a low probability of a serious cause". Making the probability explicit helps decide when to test and how to interpret the result.

::: definition Pre-test and post-test probability {#def-pretest}
The **pre-test probability** is the probability that the patient has the condition before a particular test result is known. It comes from the prevalence of the condition in similar patients, adjusted by the history and examination. The **post-test probability** is the probability after the result is known. The **odds** of the condition are $\text{odds} = \dfrac{p}{1-p}$, and conversely $p = \dfrac{\text{odds}}{1 + \text{odds}}$.
:::

::: theorem Bayes' theorem in odds form {#thm-bayes}
For a test result with likelihood ratio $\text{LR}$,

$$
\text{post-test odds} = \text{pre-test odds} \times \text{LR},
$$

where for a positive result $\text{LR}^+ = \dfrac{\text{sensitivity}}{1 - \text{specificity}}$ and for a negative result $\text{LR}^- = \dfrac{1 - \text{sensitivity}}{\text{specificity}}$. If several findings are conditionally independent given disease status, their likelihood ratios can be multiplied in sequence.
:::

::: proof Why the odds form works {#prf-bayes}
Let $D$ be the disease and $T$ the test result. Bayes' theorem gives $P(D \mid T) = \dfrac{P(T \mid D) P(D)}{P(T)}$ and $P(\bar D \mid T) = \dfrac{P(T \mid \bar D) P(\bar D)}{P(T)}$. Dividing the first by the second cancels $P(T)$:

$$
\frac{P(D \mid T)}{P(\bar D \mid T)} = \frac{P(D)}{P(\bar D)} \times \frac{P(T \mid D)}{P(T \mid \bar D)}.
$$

The left side is the post-test odds and the first factor on the right is the pre-test odds. The second factor is the likelihood ratio. For a positive result $P(T \mid D)$ is the sensitivity and $P(T \mid \bar D) = 1 - \text{specificity}$; for a negative result they are $1 - \text{sensitivity}$ and the specificity. Multiplying ratios in sequence assumes that each finding gives independent information once disease status is known, which is often only approximately true: two findings that reflect the same process (for example two inflammatory markers) should not be counted twice.
:::

The consequence is the most important idea in diagnostic testing: **the meaning of a test result depends on the pre-test probability**. A positive result in a patient who was very unlikely to have the disease is often a false positive; a negative result in a patient who was very likely to have it is often a false negative.

Likelihood ratios give a rough feel for how much a result changes things. As a rule of thumb, an LR of about 2 raises the probability modestly, around 5 moderately and 10 or more substantially; an LR of about 0.5 lowers it modestly, around 0.2 moderately and 0.1 or less substantially. A result with an LR near 1 changes almost nothing, however impressive the test sounds.

::: example A D-dimer in two patients {#ex-ddimer}
A D-dimer test for venous thromboembolism has, for illustration, sensitivity 95% and specificity 45%. Interpret a negative result in (a) a patient whose pre-test probability of pulmonary embolism is 10%, and (b) a patient whose pre-test probability is 60%.

::: solution
$\text{LR}^- = \dfrac{1 - 0.95}{0.45} = \dfrac{0.05}{0.45} = 0.111$.

(a) Pre-test odds $= 0.10/0.90 = 0.111$. Post-test odds $= 0.111 \times 0.111 = 0.0123$. Post-test probability $= 0.0123/1.0123 \approx 1.2\%$. This is low enough that, in practice, pulmonary embolism can usually be considered excluded.

(b) Pre-test odds $= 0.60/0.40 = 1.5$. Post-test odds $= 1.5 \times 0.111 = 0.167$. Post-test probability $= 0.167/1.167 \approx 14\%$. A one-in-seven chance of a dangerous condition is far too high to stop. In a patient with a high pre-test probability, the D-dimer cannot rule out the disease, which is why guidelines send such patients straight to imaging.

The test is the same; the conclusion is opposite, because the starting point differs. A positive D-dimer, with $\text{LR}^+ = 0.95/0.55 \approx 1.7$, would change either probability only slightly, so a positive D-dimer is a reason for imaging, not a diagnosis.
:::
:::

The figure shows the same arithmetic as natural frequencies: out of 1,000 patients, how many test positive, and how many of those have the disease.

::: widget bayes
mode: test
prevalence: 0.1
sensitivity: 0.95
specificity: 0.45
caption: A test with high sensitivity and low specificity, like the D-dimer in [[#ex-ddimer]]. Change the prevalence to see how the meaning of a positive and a negative result changes. Illustrative values.
:::

### Thresholds for testing and treating

A test is worth doing only if its result could change what happens. This idea was formalised by Stephen Pauker and Jerome Kassirer in 1980.

::: definition Test and treatment thresholds {#def-threshold}
The **treatment threshold** is the probability of disease above which the clinician would treat without further testing, because the expected benefit of treating exceeds the expected harm. The **test threshold** is the probability below which the clinician would neither test nor treat, because the disease is so unlikely that the harms and costs of testing (including false positives) outweigh the benefits. Between the two thresholds, testing is worthwhile. The thresholds depend on the severity of the disease, the benefits and harms of treatment, and the accuracy, risks and costs of the test.
:::

For a dangerous disease with a safe, effective treatment (for example bacterial meningitis), the treatment threshold is low: clinicians give antibiotics while still uncertain. For a disease whose treatment is risky (for example thrombolysis), the threshold is higher. A test is wasted if no plausible result would carry the probability across a threshold.

::: example Thresholds in a febrile, drowsy student {#ex-threshold}
Tomás, 19, a university student, has had a headache and fever for 12 hours. He is drowsy, has neck stiffness and a few non-blanching spots on his legs. The clinician wants a lumbar puncture to confirm the diagnosis before starting antibiotics, which would take at least an hour to arrange. Use the threshold idea to decide what to do.

::: solution
The pre-test probability of bacterial meningitis or meningococcal sepsis is high: fever, headache, drowsiness, neck stiffness and a non-blanching rash together make it the leading diagnosis. The disease can kill within hours, and the treatment (intravenous antibiotics) is effective and relatively safe. For such a disease the **treatment threshold is low**, and his probability is well above it. No lumbar puncture result could lower the probability enough to justify withholding treatment, and the delay itself is harmful. So antibiotics should be given **immediately** after taking blood cultures (if this causes no delay), following local and national guidance. A lumbar puncture may still be useful later to identify the organism, but it must not delay treatment, and it may be contraindicated by his reduced consciousness or a coagulopathy.

The general lesson: when a disease is dangerous and treatment is safe, act on probability rather than waiting for certainty.
:::
:::

## Clinical prediction rules

A **clinical prediction rule** combines several items from the history, examination and simple tests into a score that estimates the probability of a diagnosis or outcome. Well-validated rules are less variable than unaided judgement and make the pre-test probability explicit.

::: definition The two-level Wells score for pulmonary embolism {#def-wells}
The **two-level Wells score** used in NICE guideline NG158 (2020) for suspected pulmonary embolism assigns points as follows:

| Item | Points |
|---|---|
| Clinical signs and symptoms of deep vein thrombosis | 3 |
| An alternative diagnosis is less likely than pulmonary embolism | 3 |
| Heart rate above 100/min | 1.5 |
| Immobilisation for 3 or more days, or surgery in the previous 4 weeks | 1.5 |
| Previous deep vein thrombosis or pulmonary embolism | 1.5 |
| Haemoptysis | 1 |
| Active cancer (treated within 6 months, or palliative) | 1 |

A score **above 4** means pulmonary embolism is **likely**: NICE recommends CT pulmonary angiography (with interim anticoagulation if there is a delay). A score of **4 or less** means it is **unlikely**: a D-dimer test is done first, and imaging only if it is positive.
:::

Other commonly used rules include **CURB-65** for the severity of community-acquired pneumonia (Confusion, Urea above 7 mmol/L, Respiratory rate 30/min or more, low Blood pressure (systolic below 90 mmHg or diastolic 60 mmHg or less), age 65 or more), the **Ottawa ankle rules** for deciding when an ankle injury needs an X-ray, and **CHA₂DS₂-VASc** for stroke risk in atrial fibrillation. A rule is only as good as its validation in a population like the one in which it is used, and the item "alternative diagnosis less likely" in the Wells score shows that judgement remains part of the rule.

::: example Applying the Wells score {#ex-wells}
Mrs Kowalski, 54, has sudden pleuritic chest pain and breathlessness 10 days after a knee replacement. Her heart rate is 108/min. There are no signs of deep vein thrombosis and no haemoptysis or cancer. Her chest X-ray is clear and the clinician thinks pulmonary embolism is the most likely diagnosis. Calculate her Wells score and state the next step.

::: solution
- Clinical signs of DVT: no, 0.
- Alternative diagnosis less likely than PE: yes, 3.
- Heart rate above 100: yes, 1.5.
- Surgery in the previous 4 weeks: yes, 1.5.
- Previous DVT or PE: no, 0.
- Haemoptysis: no, 0.
- Cancer: no, 0.

Total $= 3 + 1.5 + 1.5 = 6$, which is above 4, so pulmonary embolism is **likely**. The next step, following NICE NG158, is CT pulmonary angiography, with interim anticoagulation if it cannot be done promptly and there is no contraindication. A D-dimer should **not** be used to rule out PE here: as [[#ex-ddimer]] showed, a negative D-dimer cannot lower a high pre-test probability enough. After recent surgery the D-dimer is very likely to be raised anyway.
:::
:::

## When reasoning goes wrong

A **diagnostic error** is a failure to establish an accurate and timely explanation of the patient's health problem, or to communicate it to the patient. The US National Academies report *Improving Diagnosis in Health Care* (2015) concluded that most people will experience at least one diagnostic error in their lifetime. Errors arise from system factors (missing results, poor handover, workload) and from cognitive factors, and usually from both.

::: definition Common cognitive biases {#def-bias}
A **cognitive bias** is a systematic tendency in judgement that can lead to error. Biases often seen in clinical reasoning include:

- **Anchoring**: fixing on the first impression and failing to adjust when new information arrives.
- **Premature closure**: accepting a diagnosis before it has been adequately confirmed, and stopping the search for alternatives. It is the most frequently identified cognitive cause of diagnostic error.
- **Availability**: judging a diagnosis as more likely because it comes easily to mind, for example after a recent memorable case.
- **Confirmation bias**: seeking or giving weight to evidence that supports the favoured diagnosis and discounting evidence against it.
- **Base-rate neglect**: ignoring the prevalence of a condition when interpreting a finding.
- **Diagnostic momentum**: a label attached early, by the patient, a referrer or a colleague, gathering certainty as it passes from person to person.
- **Search satisficing**: stopping the search once one abnormality is found (one fracture on an X-ray, one cause of anaemia), missing a second.
- **Affective bias**: letting feelings about a patient (frustration, liking, stigma) influence judgement. People with mental illness, learning disability or a history of drug use are at risk of having physical symptoms attributed to their known condition, sometimes called **diagnostic overshadowing**.
- **Overconfidence**: believing one's judgement to be more accurate than it is.
:::

::: example The frequent attender with abdominal pain {#ex-bias}
Mr Barnes, 46, has attended the emergency department six times in a year with abdominal pain related to alcohol. He arrives at 3 a.m. smelling of alcohol, with epigastric pain. The handover from the previous shift says "known alcohol abuser, usual pain". He is given analgesia and left to sleep. Four hours later he is hypotensive with a rigid abdomen. CT shows a perforated duodenal ulcer. Identify the cognitive factors and how they might have been countered.

::: solution
- **Diagnostic momentum**: the handover label ("usual pain") passed on as a diagnosis without a new assessment.
- **Affective bias and diagnostic overshadowing**: the man's alcohol use and frequent attendance lowered the team's suspicion and possibly their wish to engage. The stigmatising phrase "alcohol abuser" may have contributed; "a man who drinks alcohol heavily" describes the same fact without the judgement.
- **Anchoring and premature closure**: the presentation was matched to previous visits without checking whether anything was different.
- **Base-rate neglect, reversed**: frequent attenders have higher, not lower, rates of serious disease than the general population, and alcohol raises the risk of peptic ulcer, pancreatitis and other surgical causes.

Countermeasures: a full examination and observations at every attendance, regardless of previous diagnoses; asking explicitly "what is different this time?" and "what must I not miss?"; checking blood tests (including amylase or lipase) and repeating observations before deciding; neutral, non-stigmatising language in handovers; and a culture in which any member of the team can ask for a reassessment.
:::
:::

### Reducing diagnostic error

No technique removes bias, and simply knowing about biases does not prevent them. Some strategies do help:

- **A diagnostic time-out**: before closing a diagnosis, pause and ask: what else could this be? What doesn't fit? What is the worst thing this could be, and have I excluded it?
- **Considering the opposite**: deliberately looking for evidence against the favoured diagnosis.
- **Checklists** for common presentations and for "must not miss" conditions.
- **Second opinions** and discussion with colleagues, including asking a colleague to take a fresh look before seeing your conclusion.
- **Feedback**: following up patients to learn whether the diagnosis was right. Clinicians who never learn their outcomes cannot calibrate their judgement.
- **System measures**: reliable result follow-up, good handover and time to think ([[clinical-skills/records-handover]], [[clinical-skills/patient-safety]]).
- **Involving the patient**: telling patients what the working diagnosis is, what should happen next, and what would suggest it is wrong (safety-netting).

::: warning A diagnosis in the notes is a hypothesis, not a fact
Diagnoses recorded by others, including your own previous entries, may be wrong. When a patient fails to improve, has a new symptom, or something does not fit, return to the raw data: retake the history, re-examine, and look at the investigations yourself. "Known to have X" should prompt the question "how was X established?"
:::

::: quiz
A test for a disease has sensitivity 90% and specificity 90%. In a population where the prevalence is 1%, roughly what proportion of positive results are true positives?
- [ ] About 90%
- [ ] About 50%
- [x] About 8%
- [ ] About 1%
::: solution
Of 1,000 people, 10 have the disease and 9 test positive. Of the 990 without it, 10% (99) test positive. So 9 of the 108 positive results are true: about 8%. Ignoring the low prevalence and assuming "90% accurate" means a 90% chance of disease is base-rate neglect.
:::
:::

::: history
The Reverend **Thomas Bayes**'s essay on inverse probability was published in 1763, after his death, by his friend **Richard Price**. Its use in medicine was proposed by **Robert Ledley** and **Lee Lusted** in a 1959 paper in *Science*, "Reasoning foundations of medical diagnosis". In the 1970s **Arthur Elstein** and colleagues studied how physicians actually reason and found that they generate a small number of hypotheses early, while **Amos Tversky** and **Daniel Kahneman** (1974) described the heuristics and biases of judgement under uncertainty. **Stephen Pauker** and **Jerome Kassirer** introduced the threshold approach to testing in 1980. From the 2000s **Pat Croskerry** and others applied the psychology of bias to emergency medicine, and the 2015 National Academies report made diagnostic error a recognised patient-safety problem.
:::

## Where this leads

The tools in this chapter are applied to laboratory results in [[clinical-skills/laboratory-tests]] and to imaging in [[clinical-skills/medical-imaging]]. The statistics of test accuracy, including receiver operating characteristic curves and the design of diagnostic accuracy studies, are covered in [[epidemiology-ebm/diagnostic-tests]]. The system factors that contribute to diagnostic error are covered in [[clinical-skills/patient-safety]].

::: summary
- Diagnosis is a cycle of generating hypotheses, discriminating between them and updating; a working diagnosis is provisional.
- Experts combine fast pattern recognition (System 1) with deliberate analysis (System 2), using analysis to check intuition when stakes are high or the pattern does not fit.
- Generate differentials anatomically, pathologically or physiologically, and always list the dangerous diagnoses.
- Post-test odds equal pre-test odds times the likelihood ratio; the meaning of a result depends on the pre-test probability.
- Test only when a result could move the probability across a test or treatment threshold.
- Clinical prediction rules such as the two-level Wells score make the pre-test probability explicit and determine whether a D-dimer or imaging comes first.
- Premature closure, anchoring, availability, confirmation bias, diagnostic momentum and diagnostic overshadowing are common causes of error; time-outs, considering alternatives, feedback, good systems and safety-netting reduce it.
:::

## Exercises

::: exercise Probability and odds {level=1 check="0.25"}
Convert a probability of 20% to odds, as a decimal.
::: solution
$\text{odds} = 0.2/(1 - 0.2) = 0.2/0.8 = 0.25$, also written as 1 to 4.
:::
:::

::: exercise Likelihood ratios from a 2×2 table {level=1 check="8"}
A test has sensitivity 80% and specificity 90%. Calculate its positive likelihood ratio.
::: solution
$\text{LR}^+ = 0.80/(1 - 0.90) = 0.80/0.10 = 8$. Its negative likelihood ratio is $0.20/0.90 \approx 0.22$.
:::
:::

::: exercise Generate a differential {level=1}
Use the surgical sieve to list at least six causes of acute confusion in an 80-year-old woman.
::: solution
Infective: urinary tract infection, pneumonia, meningitis or encephalitis (less common). Metabolic: hyponatraemia, hypercalcaemia, hypoglycaemia, uraemia, hypoxia or hypercapnia. Vascular: stroke, subdural haematoma (especially after a fall or on anticoagulants). Drug-induced: opioids, anticholinergic drugs, benzodiazepines, alcohol or benzodiazepine withdrawal. Neoplastic: brain metastases, hypercalcaemia of malignancy. Others: urinary retention, constipation, pain, dehydration, post-ictal state. Many patients have more than one contributor (Hickam's dictum).
:::
:::

::: exercise Post-test probability {level=2 check="round(100*(0.3/0.7*8)/(1+0.3/0.7*8))"}
A patient has a pre-test probability of 30% for a condition. A test with positive likelihood ratio 8 is positive. What is the post-test probability, as a percentage rounded to the nearest whole number?
::: solution
Pre-test odds $= 0.3/0.7 = 0.4286$. Post-test odds $= 0.4286 \times 8 = 3.429$. Post-test probability $= 3.429/4.429 = 0.774$, which is **77%**.
:::
:::

::: exercise A Wells score {level=2 check="4.5"}
A 38-year-old man has pleuritic chest pain and a swollen, tender left calf with pitting oedema. His heart rate is 104/min. He has no other risk factors, and the clinician thinks another diagnosis is at least as likely as pulmonary embolism. Calculate his two-level Wells score and say what it means.
::: solution
Clinical signs of DVT: 3. Alternative diagnosis less likely than PE: no, 0. Heart rate above 100: 1.5. Immobilisation or surgery: 0. Previous VTE: 0. Haemoptysis: 0. Cancer: 0. Total $= 3 + 1.5 = 4.5$. This is above 4, so PE is **likely**: under NICE NG158 the next step is CT pulmonary angiography (with interim anticoagulation if it is delayed), not a D-dimer. A small change in one item (a heart rate of 98 instead of 104) would have moved him into the "unlikely" group, which is a reminder that scores simplify a continuous judgement.
:::
:::

::: exercise Sequential tests {level=2 check="round(1000*(0.05/0.95*6*4)/(1+0.05/0.95*6*4))/1000"}
A patient's pre-test probability of a condition is 5%. Two independent findings are both present, with positive likelihood ratios 6 and 4. What is the post-test probability, as a proportion rounded to three decimal places?
::: solution
Pre-test odds $= 0.05/0.95 = 0.05263$. Post-test odds $= 0.05263 \times 6 \times 4 = 1.263$. Post-test probability $= 1.263/2.263 = 0.558$. Multiplying likelihood ratios is valid only if the findings are conditionally independent; if both reflect the same underlying process, this overestimates the probability.
:::
:::

::: exercise Should we test? {level=3}
A 25-year-old woman with no risk factors has two days of right-sided chest wall pain after moving house. The pain is reproduced exactly by pressing on a costal cartilage. Her observations are normal, and the clinician estimates her probability of pulmonary embolism at about 1%. A colleague suggests a D-dimer "to be safe". Discuss whether this is a good idea.
::: solution
Her pre-test probability is likely below the test threshold. A D-dimer has low specificity, so a positive result is common in people without PE (for illustration, with specificity 45%, more than half of people without PE test positive). A positive result would raise the probability only slightly (LR⁺ about 1.7, so from about 1% to under 2%) but would lead to CT pulmonary angiography, with radiation, contrast, cost and the chance of incidental findings. A negative result would add little to an already low probability. Clinical decision tools such as the PERC rule are designed for this situation: in a low-risk patient who meets all its criteria, no test is recommended. A better plan is a clear explanation and specific safety-netting (sudden breathlessness, haemoptysis, leg swelling). The test is not "safe" if its likely outcome is harm from further investigation.
:::
:::

::: exercise A diagnostic time-out {level=3}
A 67-year-old man is admitted with "community-acquired pneumonia" and treated with antibiotics. On day 4 he remains breathless with a fever, and his chest X-ray shows a right lower-zone opacity that is unchanged. Perform a diagnostic time-out: list the questions you would ask and the alternative diagnoses you would consider.
::: solution
Questions: Was the original diagnosis well founded (history, examination, imaging, inflammatory markers)? What doesn't fit? Is the patient taking and absorbing the antibiotic, and is the organism likely to be covered? Has something new happened? Alternatives and complications: a parapneumonic effusion or **empyema** (look for dullness, perform ultrasound); a **lung abscess**; an **obstructing tumour** causing post-obstructive pneumonia (smoking history, weight loss, haemoptysis; consider CT); **pulmonary embolism** with infarction; **tuberculosis**; aspiration; an atypical or resistant organism; a non-infective cause such as organising pneumonia, vasculitis or heart failure; and a new hospital-acquired infection or drug fever. The time-out turns "not responding to antibiotics" from a reason to change the antibiotic into a reason to question the diagnosis.
:::
:::
