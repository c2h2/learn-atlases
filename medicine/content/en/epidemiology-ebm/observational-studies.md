Many of the most important facts in medicine were never tested in a randomised trial. Nobody randomised people to smoke, to drink contaminated water, or to take a drug in pregnancy to see whether it harmed the baby. These causes of disease were found by watching what happens to people in ordinary life and comparing groups carefully. Studies of this kind are called **observational**, because the investigator observes exposures and outcomes but does not assign them.

This chapter describes the main observational designs, what each can and cannot measure, and how to choose between them. It uses the measures of frequency and association from [[epidemiology-ebm/measuring-disease]]. The biases that threaten these designs are covered in detail in [[epidemiology-ebm/bias-confounding]].

## Matching the question to the design {#question}

A study design is a strategy for answering a question. The first step in reading or planning any study is to state the question precisely. Most clinical and public health questions fall into a few types:

- **How common is it?** This needs a measure of prevalence or incidence in a defined population.
- **What causes it?** This needs a comparison of outcomes between people with and without an exposure.
- **Does this treatment work?** This needs a comparison of treated and untreated people that is protected against confounding, ideally by randomisation ([[epidemiology-ebm/randomised-trials]]).
- **What will happen to this patient?** This is a question of prognosis, usually answered by following a group of patients over time.

Observational designs differ in the direction in which they look. A **cohort study** starts from exposure and looks forward to outcome. A **case-control study** starts from outcome and looks back to exposure. A **cross-sectional study** measures both at once. Each direction has strengths, and each has typical weaknesses.

## Descriptive designs {#descriptive}

::: definition Case reports, case series, cross-sectional and ecological studies {#def-descriptive}
A **case report** describes a single patient. A **case series** describes a group of patients with the same condition or exposure. Neither has a comparison group.

A **cross-sectional study** measures exposures and outcomes in a sample of a population at one point in time. It estimates prevalence, and it can compare prevalence between groups, but it usually cannot show which came first.

An **ecological study** uses groups, such as countries, regions or years, as the unit of analysis. Exposure and outcome are measured as group averages, for example national salt consumption and national stroke mortality.
:::

Case reports and case series are often the first signal of something new. The first reports of AIDS in 1981 were case series of young men with *Pneumocystis* pneumonia and Kaposi sarcoma. The link between thalidomide and limb defects was first noticed by clinicians who saw an unusual cluster of cases. Signals like these generate hypotheses. Without a comparison group, they cannot test them.

Cross-sectional surveys are the workhorse of public health monitoring. The Health Survey for England, for example, measures the prevalence of obesity, hypertension and smoking each year. Their weakness for causal questions is **temporal ambiguity**. If a survey finds that people who are unemployed are more often depressed, it cannot tell whether unemployment led to depression or depression led to job loss. Cross-sectional studies also count prevalent cases, so they over-represent people who live a long time with a condition.

Ecological studies are cheap, because they use routine data, and they are the right design when the exposure genuinely acts at the level of a group, such as a law, a fluoridated water supply or air pollution across a city. Their danger is the **ecological fallacy**: assuming that an association seen between groups also holds between individuals.

::: example National diets and breast cancer {#ex-ecological}
In a well-known 1975 analysis, Armstrong and Doll compared many countries and found a strong correlation between average dietary fat consumption and breast cancer mortality. Can we conclude that a woman who eats more fat has a higher risk of breast cancer?
::: solution
No. The data show that *countries* with higher fat consumption had higher breast cancer rates. Within those countries, we do not know whether the women who developed breast cancer were the ones eating more fat.

Countries with high fat consumption also differed in many other ways: they were wealthier, women had fewer children and had them later, they were taller, and they had more access to diagnosis. Any of these could explain the national pattern. Later cohort studies that measured diet in individual women found much weaker associations between fat intake and breast cancer than the international comparison suggested.

The ecological study was useful because it raised a hypothesis. Testing that hypothesis needed individual data.
:::
:::

## Cohort studies {#cohort}

::: definition Cohort study {#def-cohort}
A **cohort study** identifies a group of people who are free of the outcome, measures their exposure, and follows them over time to record new cases of the outcome. The incidence (risk or rate) of the outcome is compared between exposed and unexposed people, usually as a **risk ratio** or **rate ratio**.

In a **prospective** cohort study, exposure is measured now and participants are followed into the future. In a **retrospective** (historical) cohort study, both exposure and outcome have already happened and are reconstructed from existing records, but the logic is the same: exposure is defined first, and outcomes are counted afterwards.
:::

Cohort studies have several strengths:

- They show the **time order** of exposure and outcome, which is one of the strongest arguments for causation.
- They measure **incidence** directly, so they give absolute risks as well as relative ones.
- One cohort can study **many outcomes** of the same exposure. The British Doctors Study, started in 1951, eventually reported on smoking and lung cancer, heart disease, chronic lung disease and many other causes of death.
- Exposure is recorded before the outcome is known, which protects against **recall bias**.

Their weaknesses mirror these strengths. Prospective cohorts are slow and expensive, and they are inefficient for rare outcomes: to see 50 cases of a disease with an incidence of 1 per 10,000 per year, you need 100,000 person-years of follow-up. People drop out, and if those who drop out differ in risk from those who stay, the estimates are biased. And because exposure is not assigned at random, exposed and unexposed people may differ in other ways that affect the outcome. That is confounding, the central weakness of every observational design.

::: example Night shifts and diabetes {#ex-cohort}
A fictional occupational cohort follows 5,000 night-shift nurses and 10,000 day-shift nurses for 10 years. During follow-up, 300 night-shift nurses and 400 day-shift nurses develop type 2 diabetes. Calculate the 10-year risks, the risk ratio and the risk difference. What are the main threats to the conclusion that night work causes diabetes?
::: solution
Risk in night-shift nurses $= 300/5{,}000 = 0.06$ (6%). Risk in day-shift nurses $= 400/10{,}000 = 0.04$ (4%).

Risk ratio $= 0.06/0.04 = 1.5$. Risk difference $= 0.02$, or 2 extra cases per 100 nurses over 10 years.

Threats to a causal interpretation:

- **Confounding.** Night-shift workers may differ in age, body mass index, smoking, diet, physical activity or socioeconomic position. These need to be measured and adjusted for.
- **Selection into and out of night work.** Nurses who tolerate night shifts poorly may switch to day work, so the night group becomes increasingly selected. If illness causes people to leave night work, the comparison is distorted.
- **Loss to follow-up**, if those who leave the cohort differ in risk.
- **Ascertainment.** If night workers have more occupational health checks, their diabetes may be diagnosed more completely.

A risk ratio of 1.5 is a moderate association that could be produced by modest confounding. Consistency with other studies, a dose-response relation with years of night work, and a plausible mechanism (disrupted circadian regulation of glucose metabolism) would all strengthen the case.
:::
:::

Some cohorts became landmarks. The **Framingham Heart Study** began in 1948 in a town in Massachusetts, enrolling adults and examining them every two years. It established raised blood pressure, raised cholesterol, smoking and diabetes as risk factors for coronary heart disease, and the phrase "risk factor" itself came into wide use through its reports. UK Biobank, which recruited about half a million adults between 2006 and 2010, is a modern example that links questionnaire, physical, genetic and imaging data to health records.

## Case-control studies {#case-control}

When an outcome is rare, a cohort study wastes most of its effort following people who never become cases. A case-control study reverses the logic.

::: definition Case-control study {#def-case-control}
A **case-control study** starts with people who have the outcome (**cases**) and a comparison group without it (**controls**), and compares their past exposures. Because the investigator chooses how many cases and controls to include, the study cannot estimate the risk of the outcome. It estimates the **odds ratio**: the odds of exposure among cases divided by the odds of exposure among controls.

With the usual table,

| | Cases | Controls |
|---|---|---|
| Exposed | $a$ | $b$ |
| Unexposed | $c$ | $d$ |

$$
OR = \frac{a/c}{b/d} = \frac{ad}{bc}.
$$ {#eq-or}

Controls should come from the same population that produced the cases. The guiding question is: if this control had developed the disease, would they have been included as a case?
:::

Case-control studies are fast, cheap and efficient for rare diseases, and they can examine many exposures for one outcome. They were the design that first linked smoking to lung cancer, aspirin in children to Reye syndrome, and maternal diethylstilbestrol to vaginal adenocarcinoma in daughters.

Two problems dominate. The first is **selection of controls**. Hospital controls are convenient, but they are in hospital for a reason, and that reason may be related to the exposure. If controls for a lung cancer study were drawn from patients with chronic bronchitis, many would be smokers and the association would be underestimated. The second is **recall bias**. People with a serious illness search their memories for causes, so cases may report past exposures more completely than controls. Using records made before the outcome, rather than interviews, avoids this.

::: example A case-control study of smoking {#ex-case-control}
A fictional hospital-based case-control study, in the style of the early smoking studies, recruits 200 people with lung cancer and 200 controls admitted with other conditions. Of the cases, 180 are smokers; of the controls, 120 are smokers. Calculate and interpret the odds ratio.
::: solution
The table is: cases exposed $a = 180$, cases unexposed $c = 20$; controls exposed $b = 120$, controls unexposed $d = 80$.

$$
OR = \frac{180 \times 80}{120 \times 20} = \frac{14{,}400}{2{,}400} = 6.
$$

The odds of having smoked are six times higher among people with lung cancer than among controls. Because lung cancer is rare in the population as a whole, the odds ratio approximates the risk ratio (see [[#thm-rare-disease]]), so smokers have roughly six times the risk of non-smokers.

Note what cannot be calculated: the risk of lung cancer in smokers. The 50:50 split of cases and controls was chosen by the investigators, so $180/(180+120)$ is not a risk of anything.
:::
:::

### Why the odds ratio approximates the risk ratio {#rare-disease}

::: theorem The rare-disease assumption {#thm-rare-disease}
Suppose a source population contains $N_1$ exposed and $N_0$ unexposed people, of whom $A_1$ and $A_0$ develop the disease. If controls are a random sample of the people who did **not** develop the disease, the case-control odds ratio estimates

$$
OR = \frac{A_1/(N_1-A_1)}{A_0/(N_0-A_0)},
$$

the odds ratio in the source population. When the disease is rare in both groups, $N_1 - A_1 \approx N_1$ and $N_0 - A_0 \approx N_0$, so

$$
OR \approx \frac{A_1/N_1}{A_0/N_0} = RR.
$$

If instead controls are sampled from the people still at risk at the time each case occurs (**incidence density sampling**), the odds ratio estimates the **rate ratio** directly, with no rare-disease assumption.
:::

::: proof
In the source population, the odds of exposure among cases are $A_1/A_0$. If controls are a random sample of non-cases with sampling fraction $f$, they contain about $f(N_1-A_1)$ exposed and $f(N_0-A_0)$ unexposed people. Cases are usually all included, with sampling fraction $g$. Then

$$
OR = \frac{gA_1/gA_0}{f(N_1-A_1)/f(N_0-A_0)} = \frac{A_1/(N_1-A_1)}{A_0/(N_0-A_0)}.
$$

The sampling fractions cancel, which is why the investigator's choice of how many controls to recruit does not bias the odds ratio. The odds of disease in each group, $A/(N-A)$, approach the risk $A/N$ when $A$ is small compared with $N$, so the odds ratio approaches the risk ratio.

With incidence density sampling, the number of controls drawn from each exposure group is proportional to the person-time that group spends at risk, $T_1$ and $T_0$. The odds ratio becomes $(A_1/A_0)/(T_1/T_0) = (A_1/T_1)/(A_0/T_0)$, which is the rate ratio.
:::

The reasoning was set out by Jerome Cornfield in 1951, and it is what made case-control studies quantitatively respectable.

::: widget plot
f: r*(1-x)/(1-r*x); r
x: 0, 0.45
y: 0, 8
sliders: r=2:0.2:2.2:0.1
labels: \text{odds ratio}; \text{risk ratio}
caption: The odds ratio corresponding to a fixed risk ratio $r$ (slider), plotted against the risk of the outcome in the unexposed group. When the outcome is rare (left of the plot) the two are almost equal. As the baseline risk rises, the odds ratio moves further from 1 than the risk ratio. The same happens for protective exposures with $r$ below 1.
:::

::: warning Odds ratios are not risk ratios when the outcome is common
Logistic regression produces odds ratios, so they appear in cohort studies and trials as well as in case-control studies. When the outcome is common, an odds ratio of 3 does not mean "three times the risk". For example, if 20% of unexposed people have the outcome and the risk ratio is 2, the odds ratio is 2.67. Reporting the odds ratio as if it were a risk ratio exaggerates the effect. When the baseline risk is above about 10%, ask for risk ratios or absolute risks.
:::

::: example When the outcome is common {#ex-common}
A fictional cross-sectional study of 1,000 adults finds that 40% of people who sleep less than 6 hours report back pain, compared with 25% of those who sleep longer. The paper reports an odds ratio of 2.0 and its press release says "short sleepers have double the risk of back pain". Is that right?
::: solution
The prevalence ratio is $0.40/0.25 = 1.6$. The odds are $0.40/0.60 = 0.667$ and $0.25/0.75 = 0.333$, so the odds ratio is $0.667/0.333 = 2.0$. The paper's odds ratio is correct, but the press release has translated it into a "double" risk when the actual ratio of proportions is 1.6.

There is a second problem. This is a cross-sectional study, so it measures prevalence, not risk, and it cannot show whether short sleep led to back pain or back pain disturbed sleep. A more accurate statement is: "back pain was 1.6 times as common among people who slept less than 6 hours, and the direction of the association is unknown."
:::
:::

## Variations and hybrids {#hybrids}

Several designs combine features of cohorts and case-control studies.

- A **nested case-control study** is carried out inside an existing cohort. All cases arising in the cohort are taken, and for each one, a few controls are sampled from cohort members still at risk at that time. Exposure data, such as stored blood samples, need to be analysed only for the cases and their controls. This saves money while keeping the cohort's prospective measurement of exposure.
- A **case-cohort study** compares all cases with a random subcohort drawn at the start. The same subcohort can serve as the comparison group for several different outcomes.
- A **case-crossover study** uses each case as their own control. It compares exposure just before the event with exposure at earlier times in the same person. It suits brief exposures with immediate effects, such as heavy exertion before a heart attack or mobile phone use before a car crash.
- A **natural experiment** exploits an event that changed exposure for one group and not another, roughly at random. Snow's comparison of households served by two water companies in 1854 is the classic example. Modern variants include comparisons before and after a policy change, and Mendelian randomisation, which uses genetic variants that influence an exposure as a natural randomisation.

::: example Choosing a design for a rare outcome {#ex-design}
A regulator receives reports that a newly licensed antibiotic may cause acute liver failure. The background incidence of acute liver failure is about 1 per 100,000 per year. National primary care records cover several million patients, including prescriptions and hospital diagnoses. Which design would you choose?
::: solution
A prospective cohort recruited for the purpose would need millions of person-years to see enough cases, so it is impractical.

A **nested case-control study** within the primary care database is efficient. Every patient with acute liver failure becomes a case. For each case, several controls of the same age and sex who were in the database and free of liver failure on the date of the case's diagnosis are sampled. Exposure to the antibiotic in a defined window before that date is taken from prescription records. Because prescriptions were recorded before anyone developed liver failure, recall bias is avoided. Because controls are sampled from those at risk at the time of each case, the odds ratio estimates the rate ratio.

The main threats are confounding by indication (the infections being treated, or other drugs and alcohol, may themselves cause liver injury), misclassification of exposure if prescriptions were not taken, and misclassification of the outcome. Comparing the new antibiotic with another antibiotic used for the same infections, rather than with no antibiotic, reduces confounding by indication. This is called an **active comparator** design.
:::
:::

## Comparing the designs {#comparison}

| Design | Starts from | Main measure | Good for | Main weaknesses |
|---|---|---|---|---|
| Case series | Cases | None (description) | New diseases, rare adverse events | No comparison group |
| Ecological | Groups | Correlation between group rates | Group-level exposures, hypotheses | Ecological fallacy, confounding |
| Cross-sectional | A sample at one time | Prevalence, prevalence ratio or OR | Burden of disease, service planning | Temporal ambiguity, prevalent cases |
| Cohort | Exposure | Risk, rate, RR, rate ratio, risk difference | Common outcomes, rare exposures, several outcomes | Slow, costly, loss to follow-up, confounding |
| Case-control | Outcome | Odds ratio | Rare outcomes, several exposures | Control selection, recall bias, confounding |

There is no single best design. The best design is the one that can answer the question with the time, money and data available, and whose weaknesses can be recognised and dealt with.

Observational studies should be reported following the **STROBE** statement (Strengthening the Reporting of Observational Studies in Epidemiology), first published in 2007. It lists the items a reader needs to judge a cohort, case-control or cross-sectional study, including how participants were selected, how exposures and outcomes were measured, how missing data were handled and which confounders were adjusted for.

::: quiz
An investigator wants to know whether a common anti-epileptic drug taken in early pregnancy increases the risk of a rare congenital heart defect (about 1 in 2,000 births). Which design is most efficient?
- [ ] A prospective cohort of pregnant women taking the drug and not taking it
- [x] A case-control study of babies with and without the defect, with exposure taken from prescription records made during pregnancy
- [ ] A cross-sectional survey of children with heart defects
- [ ] An ecological study comparing countries with high and low use of the drug
::: solution
The outcome is rare, so a case-control study is efficient: it assembles all available cases rather than waiting for them to occur. Taking exposure from prescription records made during pregnancy avoids recall bias, which is a real concern when mothers of affected babies are interviewed. A cohort would be valid but would need very large numbers. A cross-sectional survey has no comparison group for exposure, and an ecological comparison cannot link the exposure to individual pregnancies.
:::
:::

::: history
In 1950 two case-control studies of smoking and lung cancer appeared within months of each other: Ernst Wynder and Evarts Graham in the *Journal of the American Medical Association*, and Richard Doll and Austin Bradford Hill in the *British Medical Journal*. Doll and Hill interviewed patients with lung cancer in London hospitals and compared them with patients admitted for other conditions. They found that heavy smoking was far more common among the cases, and that the association rose with the amount smoked.

Critics argued that case-control studies were open to bias in the choice of controls and in what patients remembered. Doll and Hill responded with a prospective cohort. In 1951 they wrote to all doctors on the British medical register, asking about their smoking habits, and then followed their deaths. The first report in 1954 confirmed the association with lung cancer. The study continued for fifty years. Its 2004 report showed that men born between 1900 and 1930 who smoked cigarettes throughout their lives died, on average, about ten years earlier than lifelong non-smokers, and that stopping smoking at any age gained years of life.

Meanwhile, in 1951, Jerome Cornfield showed mathematically that the odds ratio from a case-control study approximates the relative risk when the disease is rare. Together, these developments gave chronic disease epidemiology its two basic designs.
:::

## Where this leads

Every observational design can be distorted by selection bias, measurement error and confounding. [[epidemiology-ebm/bias-confounding]] explains how to recognise and reduce them, and how to judge whether an association is causal. When an intervention can be assigned, the randomised trial removes confounding by design: see [[epidemiology-ebm/randomised-trials]].

::: summary
- Observational studies observe exposures and outcomes without assigning them. They are often the only ethical or practical way to study causes of disease and harms of treatment.
- Case reports and case series generate hypotheses but have no comparison group. Cross-sectional studies measure prevalence but usually cannot show which came first. Ecological studies compare groups and risk the ecological fallacy.
- **Cohort studies** start from exposure, follow people forward and measure incidence, giving risk ratios, rate ratios and risk differences. They show time order and suit rare exposures and several outcomes, but are slow and lose participants.
- **Case-control studies** start from outcome and compare past exposure, giving the odds ratio $ad/bc$. They suit rare outcomes, but depend on well-chosen controls and are vulnerable to recall bias.
- The odds ratio approximates the risk ratio when the outcome is rare; with incidence density sampling it estimates the rate ratio. For common outcomes, odds ratios exaggerate risk ratios.
- Nested case-control, case-cohort and case-crossover designs combine efficiency with good measurement. STROBE describes how observational studies should be reported.
:::

## Exercises

::: exercise A cohort risk ratio {level=1 check="3"}
In a fictional cohort, 45 of 1,500 exposed people and 30 of 3,000 unexposed people develop an outcome during 5 years. What is the risk ratio?
::: solution
Risks are $45/1{,}500 = 0.03$ and $30/3{,}000 = 0.01$. The risk ratio is $0.03/0.01 = 3$.
:::
:::

::: exercise A case-control odds ratio {level=1 check="3.5"}
A fictional case-control study finds that 60 of 100 cases and 30 of 100 controls were exposed. Calculate the odds ratio.
::: solution
$a = 60$, $c = 40$, $b = 30$, $d = 70$. $OR = (60 \times 70)/(30 \times 40) = 4{,}200/1{,}200 = 3.5$.
:::
:::

::: exercise Name the design {level=1}
Name the design: (a) a researcher compares national rates of bowel cancer with national meat consumption across 30 countries; (b) 400 children with leukaemia and 800 children without it are asked about past X-ray exposure; (c) 20,000 adults complete a dietary questionnaire and are followed through hospital records for 15 years; (d) a survey asks 3,000 adults about current smoking and current cough.
::: solution
(a) Ecological study. (b) Case-control study. (c) Prospective cohort study. (d) Cross-sectional study.
:::
:::

::: exercise Matched pairs {level=2 check="2.5"}
In a fictional individually matched case-control study, each case has one control of the same age and sex. In 40 pairs, the case was exposed and the control was not. In 16 pairs, the control was exposed and the case was not. In the remaining pairs both or neither were exposed. Estimate the matched odds ratio.
::: hint
Only the discordant pairs carry information about the association.
:::
::: solution
For a matched-pair design, the odds ratio is the ratio of the two kinds of discordant pair: $40/16 = 2.5$. Concordant pairs contribute nothing, because within them case and control do not differ in exposure.
:::
:::

::: exercise Temporal ambiguity {level=2}
A cross-sectional survey finds that people with chronic pain are twice as likely to be taking opioid medicines as people without chronic pain, and that people taking opioids report worse pain scores. A commentator concludes that opioids make pain worse. Discuss.
::: solution
The survey measures exposure (opioid use) and outcome (pain) at the same time, so it cannot show which came first. The most obvious explanation is that people with severe pain are prescribed opioids: the "outcome" causes the "exposure". This is **reverse causation**, and in a treatment context it is also called **confounding by indication**. Opioid-induced hyperalgesia is a real phenomenon, but this design cannot detect it. A cohort following people from the start of treatment, with comparison against similar people treated differently, would be needed, and a randomised trial would be better still.
:::
:::

::: exercise Loss to follow-up {level=2 check="2.25"}
A fictional cohort enrols 1,000 exposed and 1,000 unexposed people. Among exposed people, 800 complete follow-up and 100 have the outcome. Among unexposed people, 900 complete follow-up and 50 have the outcome. Calculate the risk ratio among those who completed follow-up. Then find the lowest and highest risk ratios that could be true if the outcomes of those lost were known.
::: solution
Among completers: $(100/800)/(50/900) = 0.125/0.0556 = 2.25$.

Lowest possible: all 200 exposed people lost had no outcome, and all 100 unexposed people lost had it. RR $= (100/1{,}000)/(150/1{,}000) = 0.67$.

Highest possible: all 200 exposed people lost had the outcome, and no unexposed person lost had it. RR $= (300/1{,}000)/(50/1{,}000) = 6$.

The extreme scenarios are unlikely, but the range from 0.67 to 6 shows how much uncertainty losses of 10–20% can create when they are larger than the number of outcomes. Good cohorts work hard to keep losses low and compare the characteristics of those lost with those retained.
:::
:::

::: exercise From risk ratio to odds ratio {level=3 check="2.67"}
In a fictional cohort, the risk of an outcome is 20% in unexposed people and the risk ratio for exposure is 2. What is the odds ratio, to 2 decimal places? Comment on how a reader might be misled.
::: solution
The risk in the exposed is $2 \times 0.2 = 0.4$. Odds: $0.4/0.6 = 0.667$ and $0.2/0.8 = 0.25$. The odds ratio is $0.667/0.25 = 2.67$ (exactly $8/3$).

Equivalently, $OR = RR(1-R_0)/(1 - RR \cdot R_0) = 2 \times 0.8/0.6$. A reader who interprets 2.67 as "2.67 times the risk" overstates the effect by a third. With an outcome this common, the risk ratio should be reported.
:::
:::

::: exercise Controls for a hospital study {level=3}
A fictional case-control study of coffee drinking and pancreatic cancer recruits cases from a gastroenterology unit and controls from patients admitted to the same unit with other gastrointestinal conditions, such as peptic ulcer and reflux disease. It finds a strong association with coffee. What is the likely problem, and how would you redesign the study?
::: solution
The controls are not representative of the population that produced the cases. Patients with peptic ulcer and reflux disease are often advised to reduce coffee, or stop drinking it because it worsens symptoms. Their coffee consumption is therefore lower than in the general population, so cases appear to drink more coffee by comparison. The association may be produced entirely by the choice of controls.

A redesign would sample controls from the population that gave rise to the cases, for example from the general practice lists of the same catchment area, matched on age and sex. If hospital controls are used, they should be drawn from a range of conditions unrelated to the exposure. Coffee consumption should be measured with the same standardised questionnaire in cases and controls, and ideally refer to a period before symptoms started. Smoking must be measured and adjusted for, since it is associated with both coffee drinking and pancreatic cancer.
:::
:::

::: exercise Design a study {level=3}
A health authority wants to know whether living near a new waste incinerator increases the risk of childhood asthma. Asthma is common, affecting roughly 1 in 10 children. Outline a suitable observational design and the main biases you would guard against.
::: solution
Because the outcome is common and the exposure is defined by place, a **cohort** design using routine records is feasible: identify children living at different distances from the incinerator, or with different modelled exposure to its emissions, and compare the incidence of new asthma diagnoses in primary care records after it opened. A comparison of the change in incidence before and after opening, against a similar area without an incinerator, strengthens the design (a difference-in-differences natural experiment).

Main biases:

- **Confounding** by socioeconomic position, housing quality, parental smoking and traffic pollution, which are often worse near industrial sites. These must be measured or the comparison area matched on them.
- **Ascertainment bias** if publicity about the incinerator leads parents nearby to seek medical advice more often, or doctors to diagnose asthma more readily. Using objective markers, such as prescriptions for preventer inhalers or emergency admissions, helps.
- **Exposure misclassification** if distance is a poor proxy for actual emissions, which depend on wind direction and stack height. Dispersion modelling is better than simple distance.
- **Migration**: families with children who have asthma may move away from, or towards, the site.

An ecological comparison of asthma rates in wards near and far from the plant would be quicker but more vulnerable to confounding and the ecological fallacy.
:::
:::
