A woman of 50 receives a letter inviting her for mammography. She has no symptoms. If she attends, the most likely outcome is a normal result. A few in every hundred women are recalled for further tests, and most of those are found not to have cancer after a worrying few weeks. A smaller number have a cancer found early, and some of them will avoid dying of breast cancer because of it. A few have a cancer found that would never have harmed them in their lifetime, and will have surgery, radiotherapy and perhaps hormone treatment that bring only harm. No one, including her doctor, can tell her in advance which group she will be in.

Screening is different from ordinary clinical medicine. The person has not come with a problem; the health service has approached a healthy person and offered a test. That changes the ethics: the programme must be confident that it does more good than harm across the whole population invited, and each person must be able to make an informed choice. This chapter explains the criteria that a screening programme must meet, how test performance behaves in a screened population, the biases that make screening look better than it is, overdiagnosis, the UK programmes as of 2026, and how programmes are run and evaluated. It assumes the material on test accuracy in [[epidemiology-ebm/diagnostic-tests]].

## What screening is {#definition}

::: definition Screening {#def-screening}
**Screening** is the process of identifying apparently healthy people who may be at increased risk of a disease or condition, so that they can be offered information, further tests and appropriate treatment to reduce their risk or the complications of the disease. (This follows the definition used by the UK National Screening Committee.)

Screening is not diagnosis. A positive screening result means that further testing is needed; the diagnosis is made by the follow-up investigations. A screening **programme** includes the whole pathway: identifying and inviting the eligible population, testing, communicating results, diagnostic follow-up, treatment, quality assurance and evaluation.
:::

Screening is distinguished from **case-finding**, in which a clinician tests a person who has come for some other reason (for example checking blood pressure at a consultation, or testing for atrial fibrillation by pulse palpation in older people). It is also distinguished from **surveillance** of people already known to be at high risk, such as colonoscopic surveillance after removal of advanced adenomas, or annual MRI for women with a *BRCA1* variant, which is run as part of specialist care.

Programmes may be **population-based** (everyone in an age group, as in bowel screening), **targeted** (a defined higher-risk group, as in lung screening for people who have smoked), or **opportunistic** (offered when people attend for other reasons, without systematic invitation). Population-based programmes with call and recall registers achieve higher and more equitable coverage than opportunistic testing.

## Criteria for a screening programme {#criteria}

::: definition The Wilson and Jungner principles {#def-wilson-jungner}
In 1968 James Wilson and Gunnar Jungner, writing for the World Health Organization, set out ten principles for screening:

1. The condition sought should be an important health problem.
2. There should be an accepted treatment for patients with recognised disease.
3. Facilities for diagnosis and treatment should be available.
4. There should be a recognisable latent or early symptomatic stage.
5. There should be a suitable test or examination.
6. The test should be acceptable to the population.
7. The natural history of the condition, including development from latent to declared disease, should be adequately understood.
8. There should be an agreed policy on whom to treat as patients.
9. The cost of case-finding (including diagnosis and treatment) should be economically balanced in relation to possible expenditure on medical care as a whole.
10. Case-finding should be a continuing process and not a "once and for all" project.
:::

Modern criteria add requirements that reflect later experience. The **UK National Screening Committee** (UK NSC), which advises ministers in all four UK nations, assesses a proposed programme against criteria grouped under the condition, the test, the intervention, the programme and its implementation. The most important additions are:

- There should be evidence from high-quality **randomised controlled trials** that the programme reduces mortality or morbidity. Where screening aims only to give information (as in some antenatal screening), there must be evidence that the test accurately measures risk and that the information is of value to the person screened.
- The benefit should outweigh the physical and psychological **harms** of the test, diagnostic procedures and treatment.
- The programme should be **cost-effective** compared with other uses of the money.
- There should be a plan for **quality assurance**, and for managing and monitoring the programme.
- People should be able to make an **informed choice**, with evidence-based information about the benefits and harms.
- All other options for managing the condition (such as primary prevention) should have been considered.

Most proposed screening programmes do not meet these criteria. The UK NSC has recommended against population screening for many conditions, including prostate cancer, ovarian cancer, and type 2 diabetes in the general population.

## Test performance in a screened population {#performance}

In a screening population the condition is rare, so even a good test produces mostly false positives. This is the most important arithmetic in screening.

::: example The positive predictive value of mammography {#ex-ppv}
In an illustrative screening round, 8 in 1,000 women screened have breast cancer. Mammography has a sensitivity of 85% and a specificity of 96% in this round. Of 10,000 women screened, how many are recalled, how many of those have cancer, and what is the positive predictive value?
::: solution
Women with cancer: $10{,}000 \times 0.008 = 80$. True positives: $80 \times 0.85 = 68$. False negatives: 12.

Women without cancer: 9,920. False positives: $9{,}920 \times 0.04 = 396.8 \approx 397$.

Recalled: $68 + 397 = 465$, a recall rate of about 4.6%.

$PPV = 68/465 = 14.6\%$. About six out of seven women recalled do not have cancer.

This is why the recall letter must explain that most women recalled are found not to have cancer, and why recall should lead quickly to assessment. The 12 false negatives also matter: some will present with symptoms before their next invitation as **interval cancers**.
:::
:::

::: widget bayes
mode: test
prevalence: 0.008
sensitivity: 0.85
specificity: 0.96
caption: A screening test applied to 10,000 people. With a prevalence of 0.8%, most positive results are false even though the test is good. Raise the specificity a little and see how much the positive predictive value improves, then raise the prevalence to see the same test used in a higher-risk group.
:::

Programmes use specific performance measures:

- **Coverage**: the proportion of the eligible population screened within a defined period. **Uptake** is the proportion of those invited in a round who attend.
- **Recall** or **positivity rate**: the proportion of people screened who have a positive result.
- **Detection rate**: cases found per 1,000 people screened.
- **Interval cancers**: cancers diagnosed after a negative screen and before the next one is due. Some are cancers missed by the test (false negatives); others are fast-growing cancers that arose after the screen.
- **Programme sensitivity**: screen-detected cases divided by screen-detected plus interval cases.

### Choosing the threshold {#threshold}

Many screening tests give a continuous result, and the programme chooses a threshold. The faecal immunochemical test (FIT) for bowel cancer measures the concentration of haemoglobin in a stool sample. A lower threshold detects more cancers and advanced adenomas but sends more people to colonoscopy, which has costs, discomfort and a small risk of perforation and bleeding. Programme capacity is part of the decision: a threshold that the colonoscopy service cannot cope with lengthens waiting times for everyone.

In England the bowel screening threshold was 120 µg of haemoglobin per gram of faeces. In January 2026 NHS England announced that it would be lowered to 80 µg/g from February 2026, phased in across the country by 2028, bringing England into line with Scotland and Wales. NHS England estimated that the change would detect about 600 more cancers a year at an early stage (an increase of about 11%), and that the proportion of participants referred for further testing would rise from about 2 in 100 to about 3 in 100.

## Why screening needs trials: the biases {#biases}

It seems obvious that finding disease early must be good. Three biases show why it is not obvious, and why screening must be evaluated in randomised trials.

::: theorem Screening is judged by mortality in randomised trials {#thm-endpoint}
Survival measured from the time of diagnosis is not a valid measure of the benefit of screening, because it is inflated by lead time and length bias even when screening changes nothing. Comparisons of screened with unscreened people are inflated by selection bias. The benefit of a screening programme must therefore be measured in randomised trials that compare the disease-specific (and ideally all-cause) mortality, or the incidence of advanced disease, in a group *invited* to screening with a group not invited.
:::

::: proof
**Lead-time bias.** Screening detects disease earlier than symptoms would. If treatment does not change the time of death, survival measured from diagnosis is still longer in screen-detected cases, simply because the clock starts earlier. The interval by which diagnosis is advanced is the **lead time**.

**Length-time bias.** Slowly growing tumours spend longer in the preclinical, detectable phase than fast-growing ones, so a screen at any moment is more likely to find slow-growing tumours. Fast-growing tumours more often appear as interval cancers. Screen-detected cases therefore have a better prognosis on average even if screening has no effect. Overdiagnosis is the extreme of length bias: tumours so slow that they would never have caused symptoms.

**Selection (healthy-volunteer) bias.** People who accept screening differ from those who decline: they are on average more affluent, more health-conscious, less likely to smoke and more likely to have other healthy behaviours. They would have lower mortality even without screening.

Randomisation removes selection bias, because the invited and uninvited groups are similar on average. Comparing mortality rates in the two whole groups (analysed by intention to screen, including those who did not attend) removes lead-time and length biases, because the endpoint is death in a defined population over a defined period, not survival from diagnosis. Disease-specific mortality is the usual primary endpoint because all-cause mortality would need impractically large trials; but a reduction in disease-specific mortality can be offset by deaths from the investigations or treatment, or distorted by misattribution of the cause of death.
:::

::: example Lead time {#ex-lead}
A man develops a lung cancer that becomes detectable by CT at age 60. Without screening, it would cause symptoms and be diagnosed at 63. He dies of it at 67, and in this example treatment at either stage does not change the date of death. Calculate his survival from diagnosis with and without screening, and state whether he counts as a 5-year survivor in each case.
::: solution
Without screening: diagnosed at 63, dies at 67: survival 4 years. He is not a 5-year survivor.

With screening: diagnosed at 60, dies at 67: survival 7 years. He is a 5-year survivor.

Lead time is 3 years. Screening has converted him from a "death within 5 years" to a "5-year survivor" without giving him a single extra day of life. He has, however, lived 3 more years with the knowledge that he has cancer and with the effects of treatment. If many cases are like this, a programme will show improving 5-year survival with no fall in mortality.
:::
:::

::: warning Improving survival statistics do not show that screening works
When a screening programme is introduced, 5-year survival from diagnosis almost always rises, and the incidence of the disease usually rises too, because cases are found earlier and some are overdiagnosed. Both changes occur even if screening saves no lives. Claims such as "screening has raised 5-year survival from 60% to 85%" are therefore not evidence of benefit. The right evidence is a fall in disease-specific mortality in randomised trials (or, for well-established programmes, careful observational studies of mortality that allow for these biases), together with a fall in the incidence of advanced-stage disease.
:::

## Overdiagnosis {#overdiagnosis}

::: definition Overdiagnosis and overtreatment {#def-overdiagnosis}
**Overdiagnosis** is the diagnosis of a condition that would never have caused symptoms or death during the person's lifetime. It happens because the condition progresses very slowly or not at all, or because the person dies of something else first. An overdiagnosed person cannot be identified individually: they look exactly like a person whose disease was found early and successfully treated.

**Overtreatment** is the treatment of an overdiagnosed condition. It brings only harm.

Overdiagnosis is not the same as a false-positive result. A false positive is a positive screening test in a person without the disease; overdiagnosis is a true diagnosis, confirmed by pathology, of disease that did not need to be found.
:::

Overdiagnosis is most important in breast, prostate, thyroid and lung cancer screening, and in screening for some precancerous lesions, such as cervical intraepithelial neoplasia in young women, much of which regresses. It is estimated by comparing the cumulative incidence of the disease in screened and unscreened groups over long follow-up, after screening has stopped: the excess incidence that never "catches up" is overdiagnosis.

::: example Benefits and harms of breast screening {#ex-overdiagnosis}
The Independent UK Panel on Breast Cancer Screening (2012) estimated that, for every 10,000 women in the UK aged 50 invited to screening for the next 20 years, about 43 breast cancer deaths would be prevented and about 129 cancers would be overdiagnosed. (a) How many women are overdiagnosed for each death prevented? (b) How many women must be invited for 20 years to prevent one breast cancer death? (c) How should this be presented to a woman deciding whether to attend?
::: solution
(a) $129/43 = 3.0$: about three women overdiagnosed for each breast cancer death prevented.

(b) $10{,}000/43 = 233$; the panel quoted "about 235" women invited for one death prevented.

(c) The panel estimated that screening reduces breast cancer mortality by about 20% in women invited, so for most women the decision is genuinely balanced and personal. The information should give absolute numbers over a stated period, in the same format for benefits and harms, alongside the chance of a false-positive recall. The NHS leaflet for breast screening presents numbers like these, so that women who decline are not seen as making an irrational choice. The panel noted that its figures were uncertain and based on trials from decades earlier; treatment has improved since, which may have reduced the benefit of early detection.
:::
:::

## The UK screening programmes in 2026 {#uk-programmes}

The UK NSC recommends programmes; each nation commissions and runs them. The details below refer to **England** as of 2026 unless stated; Scotland, Wales and Northern Ireland have similar programmes with some differences in ages, intervals and tests. Programmes change, so the current NHS and UK NSC guidance is the reference.

### Cancer screening {#cancer-programmes}

| Programme | Who is invited | Test and interval |
|---|---|---|
| Cervical | Women and people with a cervix aged 25 to 64 | Primary testing for high-risk HPV; cytology only if HPV is found. Every 5 years if HPV-negative (from 1 July 2025 for ages 25–49, who were previously screened every 3 years; ages 50–64 were already 5-yearly). |
| Breast | Women aged 50 up to their 71st birthday | Mammography every 3 years. Over 71s can self-refer. Women at very high familial risk have separate surveillance from a younger age. |
| Bowel | People aged 50 to 74 | Home FIT kit every 2 years. Over 74s can request a kit. Threshold being lowered from 120 to 80 µg Hb/g from 2026. |
| Lung | People aged 55 to 74 who have ever smoked, assessed as high risk | Low-dose CT, repeated every 2 years for those eligible. Being rolled out nationally, with full coverage planned by 2029/30. |

**Cervical screening** is highly effective because it is mainly a programme of *prevention*: it detects precancerous changes (cervical intraepithelial neoplasia) that are removed before cancer develops. England moved to HPV primary testing in 2019. A negative HPV test gives very strong reassurance for several years, which is why longer intervals are safe for HPV-negative people; those with HPV found are recalled sooner. From 2026, NHS England began offering HPV self-sampling kits to people who are overdue for screening, aimed at those who find the speculum examination difficult. As cohorts vaccinated against HPV in adolescence reach screening age, the prevalence of high-risk HPV is falling, which will lower the PPV of the test and may change the programme further.

**Breast screening** began in 1988 after the Forrest Report (1986). The AgeX trial, a cluster-randomised trial including several million women, has been testing whether one extra screen at age 47–49 or at 71–73 reduces mortality; the final results are not expected until the 2030s.

**Bowel screening** with FIT also prevents cancer by finding adenomas, which are removed at colonoscopy. Trials of the older guaiac faecal occult blood test showed a reduction in colorectal cancer mortality of about 15% in those invited; FIT is more sensitive and more acceptable, and is quantitative, which allows the threshold to be set.

**Lung screening** follows trials (the US National Lung Screening Trial and the Dutch–Belgian NELSON trial) that found reductions in lung cancer mortality of about 20–25% with low-dose CT in people at high risk. In England, people aged 55 to 74 registered with a GP who have ever smoked are invited to a risk assessment, and those at high risk are offered CT. The programme includes smoking cessation support, because stopping smoking is still the most effective intervention for these participants.

**Prostate cancer.** The PSA test has low specificity and causes substantial overdiagnosis, and trials have shown at most a small reduction in prostate cancer mortality, at the cost of many men treated unnecessarily. In May 2026 the UK NSC made a final recommendation against population screening, and against targeted screening of Black men, but recommended targeted screening every 2 years for men aged 45 to 61 who carry a *BRCA2* variant and have a relevant family history. As of late 2026, whether and how to implement it was for the UK governments to decide. Men without symptoms may still ask for a PSA test after an informed discussion with their GP.

### Non-cancer screening {#other-programmes}

- **Abdominal aortic aneurysm (AAA).** Men are invited for a one-off ultrasound scan in the year they turn 65; older men can self-refer. The UK Multicentre Aneurysm Screening Study (MASS, 2002) showed a reduction in aneurysm-related mortality of about 40% within four years in men invited. The aortic diameter determines management:

| Aortic diameter | Classification | Action |
|---|---|---|
| Below 3.0 cm | Normal | Discharged; no further screening |
| 3.0–4.4 cm | Small AAA | Ultrasound surveillance every 12 months |
| 4.5–5.4 cm | Medium AAA | Ultrasound surveillance every 3 months |
| 5.5 cm or more | Large AAA | Urgent referral to a vascular surgeon (to be seen within 2 weeks) |

  Men with small or medium aneurysms also receive cardiovascular risk assessment and advice, because they are at high risk of myocardial infarction and stroke. A rapidly growing aneurysm (1 cm or more in a year) is also referred.

- **Diabetic eye screening.** People with diabetes aged 12 and over are offered retinal photography, annually or, for those at low risk with no retinopathy on two consecutive screens, every 2 years.

- **Antenatal screening.** Pregnant women are offered screening for HIV, hepatitis B and syphilis; for sickle cell disease and thalassaemia; for Down's syndrome (trisomy 21), Edwards' syndrome (trisomy 18) and Patau's syndrome (trisomy 13), using the combined test in the first trimester with non-invasive prenatal testing as a further option for higher-chance results; and for structural abnormalities at the 18+0 to 20+6 week scan. Antenatal screening differs from other programmes because its aim is often to inform reproductive choices; neutral, non-directive information is essential.

- **Newborn and infant screening.** The physical examination (NIPE) at birth and at 6–8 weeks looks for eye, heart, hip and testicular abnormalities. Newborn hearing screening detects permanent hearing loss. The newborn blood spot test at day 5 screens for sickle cell disease, cystic fibrosis, congenital hypothyroidism and six inherited metabolic diseases (phenylketonuria, MCADD, maple syrup urine disease, isovaleric acidaemia, glutaric aciduria type 1 and homocystinuria). Screening for severe combined immunodeficiency (SCID) has been run as an in-service evaluation in parts of England since 2021.

## Running a programme {#delivery}

### Quality assurance {#qa}

A screening test is only as good as the programme around it. Each programme sets **standards** (for example minimum uptake, maximum time from test to result, and recall rates within a range) and is monitored by screening quality assurance services. Failures in a screening programme affect many people at once and can go unnoticed for years: past incidents have included computer errors in invitations, misread samples and lost follow-up. Every step from the call-recall register to treatment needs monitoring and audit.

### Uptake and inequalities {#uptake}

Uptake is lower in more deprived areas, in some minority ethnic groups, in people with learning disabilities or severe mental illness, in transgender and non-binary people (who may not be invited correctly), and in younger people for cervical screening. Because the people who do not attend are often at higher risk, low uptake in these groups widens inequalities in cancer outcomes. Approaches that help include GP endorsement of invitations, reminders by text and telephone, removing practical barriers (self-sampling, out-of-hours appointments), information in other languages and easy-read formats, and community health workers. Reducing inequality in uptake is a standard objective of every programme.

::: example Inequality in uptake {#ex-uptake}
In a bowel screening round, 20,000 people are invited in each of two areas. In area A (affluent), 75% return the kit; in area B (deprived), 55% do. Assume the prevalence of cancer is 3 per 1,000 participants in A and 4 per 1,000 in B, and that the programme detects 80% of cancers among participants. How many cancers are detected in each area, and how many cancers in the invited population of each area go undetected because the person did not take part?
::: solution
**Area A.** Participants: $20{,}000 \times 0.75 = 15{,}000$. Cancers among them: $15{,}000 \times 0.003 = 45$; detected: $45 \times 0.8 = 36$. Non-participants: 5,000; cancers among them: $5{,}000 \times 0.003 = 15$.

**Area B.** Participants: $20{,}000 \times 0.55 = 11{,}000$. Cancers: $11{,}000 \times 0.004 = 44$; detected: $44 \times 0.8 = 35.2 \approx 35$. Non-participants: 9,000; cancers among them: $9{,}000 \times 0.004 = 36$.

Area B has more cancer but the programme finds about the same number, while 36 cancers lie among non-participants compared with 15 in A. (In reality non-participants may have an even higher prevalence than participants, making this worse.) Raising uptake in B is likely to prevent more deaths than any refinement of the test.
:::
:::

### Informed choice {#informed-choice}

Screening is offered, not prescribed. People must receive balanced information on the possible benefits, harms and limitations (false positives, false reassurance, overdiagnosis, the risks of follow-up tests), so that they can decide whether to take part. Declining is a legitimate choice and should be respected and recorded. Programmes use personal invitations, but this does not make attendance compulsory, and clinicians should not use pressure or exaggerate benefit. The UK cancer screening leaflets now give absolute numbers for benefits and harms, in contrast to the persuasive leaflets of the 1990s.

### New tests and the evidence they need {#new-tests}

New screening technologies are constantly proposed: whole-body MRI, polygenic risk scores, and multi-cancer early detection blood tests that look for tumour DNA in the blood. These must meet the same criteria as any other screening test. Detecting more cancers, or detecting them earlier, is not enough, because of lead time and overdiagnosis. The NHS-Galleri randomised trial in England, which enrolled over 140,000 people from 2021, was designed to test whether adding a multi-cancer blood test reduces the number of cancers diagnosed at an advanced stage, a surrogate for mortality. Commercial screening tests sold directly to the public often bypass this evaluation, and their false positives create work and harm in the NHS.

::: quiz
A new blood test for pancreatic cancer is introduced in a private clinic. Five-year survival of patients whose cancer is detected by the test is 40%, compared with 10% in patients diagnosed after symptoms. Which conclusion is justified?
- [ ] The test saves lives and should be offered to everyone.
- [ ] The test saves lives, but only in high-risk people.
- [x] The comparison cannot show whether the test saves lives, because of lead-time, length and selection biases.
- [ ] Survival comparisons are valid if the groups are matched for age.
::: solution
Earlier diagnosis lengthens survival from diagnosis even if death is not delayed (lead time); screen-detected tumours are biased towards slow-growing ones (length bias), including some overdiagnosed ones; and people who pay for private tests differ from the general population (selection bias). Matching for age addresses none of these. Only a randomised trial comparing pancreatic cancer mortality (or at least advanced-stage incidence) in invited and uninvited groups can show benefit.
:::
:::

::: history
George Papanicolaou showed in 1928, and in more detail with Herbert Traut in 1943, that cancer cells could be recognised in vaginal smears; the "Pap smear" became the first widely used cancer screening test. The Health Insurance Plan (HIP) trial in New York, begun in 1963, was the first randomised trial of breast screening and showed a reduction in breast cancer mortality. In 1968 James Wilson and Gunnar Jungner published *Principles and Practice of Screening for Disease* for the WHO. In the UK, the Forrest Report (1986) led to the NHS Breast Screening Programme in 1988, and the cervical programme gained national computerised call and recall in the same year. The UK National Screening Committee was established in 1996. Bowel cancer screening began in England in 2006 and abdominal aortic aneurysm screening in 2009. The concept of overdiagnosis, recognised in the 1970s from autopsy studies and lung screening trials, became central to screening policy after the Independent UK Panel review of breast screening in 2012.
:::

## Where this leads

The mathematics of test accuracy is developed in [[epidemiology-ebm/diagnostic-tests]], and the biases in [[epidemiology-ebm/bias-confounding]]. Screening is one form of prevention, whose levels are described in [[public-health/prevention-promotion]]; vaccination, which is now changing the cervical screening programme, is covered in [[public-health/vaccination-programmes]]. Whether a programme is worth its cost is assessed with the methods of [[public-health/health-systems-economics]].

::: summary
- **Screening** offers tests to apparently healthy people to identify those at increased risk; positive results need diagnostic confirmation. A programme is the whole pathway, not just the test.
- Programmes should meet criteria derived from **Wilson and Jungner (1968)**, updated by the UK NSC: an important condition with a detectable early stage, a good acceptable test, effective early treatment, evidence from **randomised trials** of reduced mortality or morbidity, benefits outweighing harms, cost-effectiveness, quality assurance and informed choice.
- At low prevalence most positive results are false; the threshold balances detection against follow-up burden and capacity.
- **Lead-time**, **length** and **selection** biases make screen-detected cases look better even without benefit; programmes are judged by mortality in trials of invited versus uninvited groups, not by survival from diagnosis.
- **Overdiagnosis** is diagnosis of disease that would never have caused harm; for breast screening the UK panel estimated about 3 overdiagnosed per death prevented.
- England in 2026: cervical (25–64, HPV primary, 5-yearly if HPV-negative), breast (50 to 71st birthday, 3-yearly), bowel (50–74, FIT every 2 years, threshold falling to 80 µg/g), lung (55–74 who have ever smoked, being rolled out), AAA (men at 65), diabetic eye, antenatal and newborn programmes. Population prostate screening is not recommended.
- Uptake is lower in disadvantaged groups, which widens inequalities; reducing this is part of every programme's job.
:::

## Exercises

::: exercise Positive predictive value {level=1 check="round(1000*68/464.8)/10"}
Using the figures of [[#ex-ppv]] (prevalence 0.8%, sensitivity 85%, specificity 96%), calculate the PPV as a percentage to 1 decimal place without rounding the number of false positives.
::: solution
Per 10,000: 68 true positives and 396.8 false positives. $PPV = 68/464.8 = 0.1463$, or 14.6%.
:::
:::

::: exercise Programme sensitivity {level=1 check="75"}
In one screening round, 90 cancers are detected by screening and 30 interval cancers are diagnosed in screened people before the next round. Calculate the programme sensitivity as a percentage.
::: solution
Programme sensitivity $= 90/(90 + 30) = 0.75$, or 75%. Not all interval cancers are test failures: some arose after the screen. Review of the previous images classifies them as missed, minimal signs or truly new.
:::
:::

::: exercise AAA management {level=1}
Four men aged 65 have aortic diameters of (a) 2.6 cm, (b) 3.8 cm, (c) 5.0 cm and (d) 5.7 cm. State the management of each in the NHS AAA screening programme.
::: solution
(a) Normal: discharged, no further screening. (b) Small AAA: surveillance scan every 12 months, plus cardiovascular risk assessment and smoking cessation support. (c) Medium AAA: surveillance every 3 months, plus the same risk-factor management. (d) Large AAA: urgent referral to a vascular service to be seen within 2 weeks for consideration of repair.
:::
:::

::: exercise Overdiagnosis ratio {level=2 check="round(10*129/43)/10"}
Using the Independent UK Panel's estimates (43 breast cancer deaths prevented and 129 overdiagnosed cancers per 10,000 women invited for 20 years), how many cancers are overdiagnosed for each death prevented? Give your answer to 1 decimal place.
::: solution
$129/43 = 3.0$. About one woman's death from breast cancer is prevented for every three women who are diagnosed and treated for a cancer that would never have harmed them.
:::
:::

::: exercise Lead time and 5-year survival {level=2 check="2"}
In a population, a cancer always causes death 4 years after symptomatic diagnosis, and treatment does not alter this. A screening test advances diagnosis by 2 years, and every case is detected by screening. (a) By how many years does mean survival from diagnosis increase? (b) By how much does screening change the age at death?
::: solution
(a) Survival from diagnosis rises from 4 years to 6 years: an increase of 2 years, and 5-year survival rises from 0% to 100%.

(b) Not at all. Every person dies at the same age as before. The whole apparent gain is lead time, which is why survival from diagnosis cannot be used to judge screening.
:::
:::

::: exercise Choosing a FIT threshold {level=2}
A bowel screening programme is considering lowering its FIT threshold. List the expected effects on (a) cancers detected, (b) colonoscopies, (c) PPV for cancer, (d) interval cancers, and (e) the programme's ability to deliver. What evidence would you want before deciding?
::: solution
(a) More cancers and advanced adenomas detected, especially at earlier stages. (b) More colonoscopies, with their discomfort, costs and small risks of perforation and bleeding. (c) Lower PPV, because the extra positives include more people without significant disease. (d) Fewer interval cancers. (e) Increased demand for colonoscopy, endoscopists, pathology and bowel cancer treatment; if capacity is short, waits lengthen, which can harm people with positive tests at the old threshold and symptomatic patients. Evidence: modelling and pilot data on detection and positivity at each threshold, colonoscopy capacity, cost-effectiveness, and experience from programmes already using the lower threshold (Scotland and Wales use 80 µg/g).
:::
:::

::: exercise Uptake and missed cancers {level=2 check="36"}
In area B of [[#ex-uptake]], 20,000 people are invited and 55% take part. If the prevalence of cancer among non-participants is 4 per 1,000, how many cancers are there among non-participants?
::: solution
Non-participants: $20{,}000 \times 0.45 = 9{,}000$. Cancers: $9{,}000 \times 0.004 = 36$.
:::
:::

::: exercise Should we screen for it? {level=3}
A company proposes annual screening of all adults over 50 for pancreatic cancer with a new blood test. In a case-control study of 200 patients with known pancreatic cancer and 200 healthy volunteers, the test had sensitivity 90% and specificity 95%. Pancreatic cancer has an annual incidence of about 25 per 100,000 in people aged over 50. Assess the proposal against screening criteria.
::: solution
**Condition.** Important: pancreatic cancer has a very poor prognosis. But its natural history (how long a detectable, curable preclinical phase lasts) is poorly understood.

**Test accuracy.** A case-control design with known (often advanced) cancers and healthy volunteers overestimates sensitivity and specificity (spectrum bias). Even taking the figures at face value, with a prevalence of about 25 per 100,000: in 100,000 people, 22.5 true positives and $0.05 \times 99{,}975 \approx 4{,}999$ false positives; PPV about 0.45%. About 220 people would have a false-positive result for each true cancer, each needing CT or endoscopic ultrasound, with costs, anxiety and complications.

**Treatment.** Benefit requires that earlier treatment improves outcome. This is plausible but unproven for screen-detected pancreatic cancer.

**Evidence.** There is no randomised trial showing reduced mortality. Lead time and length bias would make any observational survival data misleading.

**Conclusion.** The proposal does not meet the criteria. A research programme should first study accuracy in a population representative of those to be screened, then run a randomised trial with mortality or stage-shift endpoints. Surveillance of very high-risk groups (for example people with certain inherited syndromes) in research settings is a more reasonable first step.
:::
:::

::: exercise Interpreting a trial {level=3}
In a randomised trial of a screening test, 50,000 people were invited and 50,000 were not. After 15 years, deaths from the target cancer were 200 in the invited group and 250 in the control group; all-cause deaths were 7,500 and 7,520. (a) Calculate the relative reduction in cancer mortality and the number needed to invite. (b) Why is the all-cause difference so small, and does that mean the programme does not work?
::: solution
(a) Cancer mortality: $200/50{,}000 = 0.4\%$ against $250/50{,}000 = 0.5\%$. Relative reduction $= 1 - 0.4/0.5 = 20\%$. Absolute reduction $= 0.1$ percentage point; number needed to invite for 15 years $= 1/0.001 = 1{,}000$.

(b) Deaths from the target cancer are a small fraction of all deaths (250 of 7,520), so preventing 50 of them changes all-cause mortality by under 1%, a difference far too small to detect reliably in a trial of this size. The small all-cause difference is consistent with the programme working. However, all-cause mortality matters because it would reveal any deaths caused by investigations or treatment, or deaths misclassified between causes. Trials and meta-analyses should report it, and its confidence interval should be examined, while recognising that most screening trials lack power for this endpoint.
:::
:::
