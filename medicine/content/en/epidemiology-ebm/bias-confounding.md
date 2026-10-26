In the 1980s and 1990s, large observational studies found that women taking hormone replacement therapy after the menopause had roughly half the rate of coronary heart disease of women who did not. The finding was consistent, biologically plausible and widely acted on. Then the Women's Health Initiative randomised trial, reported in 2002, found no protection at all: combined oestrogen and progestin did not reduce coronary events, and early in treatment it increased them.

The observational studies were not careless. Their problem was that women who chose to take hormones were, on average, healthier, wealthier and more health-conscious than women who did not, and no amount of adjustment fully removed that difference. This chapter is about how associations like that arise without causation, how to recognise them, and how to judge when an association is likely to be causal.

## Two kinds of error {#errors}

::: definition Random error and systematic error {#def-bias}
**Random error** is the variation in a study's estimate that arises by chance, because the study measures a sample rather than the whole population. It makes estimates imprecise, but it does not push them in a particular direction. It shrinks as the study gets larger, and it is quantified by confidence intervals and p-values.

**Systematic error**, or **bias**, is a consistent departure of the estimate from the truth, caused by the way the study was designed, conducted or analysed. Bias does not shrink with a larger sample. A large biased study gives a precise estimate of the wrong answer.

Epidemiologists divide bias into three broad groups: **selection bias**, **information bias** and **confounding**.
:::

The distinction matters because the tools are different. Random error is handled by statistics ([[epidemiology-ebm/statistics-for-clinicians]]). Bias must be prevented by design or, where possible, corrected in the analysis. A narrow confidence interval says nothing about bias.

## Selection bias {#selection}

::: definition Selection bias {#def-selection}
**Selection bias** occurs when the way people enter a study, or remain in it, produces a relation between exposure and outcome among participants that differs from the relation in the population the study is meant to describe.
:::

Common forms include:

- **Non-response.** People who agree to take part in surveys are usually healthier and better off than those who do not. A prevalence estimate from volunteers is often too low for conditions linked to deprivation.
- **Loss to follow-up.** In a cohort, if exposed people who develop the outcome are more likely to drop out than unexposed people, the association is underestimated, and the reverse.
- **Poor choice of controls** in a case-control study, as described in [[epidemiology-ebm/observational-studies]].
- **The healthy worker effect.** People in employment are healthier than the general population, so comparing workers with the general population makes occupations look safer than they are.
- **Berkson's bias.** Described by Joseph Berkson in 1946, this arises when a study is restricted to hospital patients. If two conditions each increase the chance of admission, then among admitted patients they can appear associated even when they are independent in the population.

Berkson's bias is an example of a general mechanism. If both the exposure and the outcome affect whether someone is included in a study, restricting to included people creates a spurious association between them. In the language of causal diagrams, inclusion is a **collider**, a variable caused by both exposure and outcome. Conditioning on a collider opens a false path between its causes. This is why selecting or adjusting on a variable that is a consequence of both exposure and outcome can create bias where none existed.

## Information bias {#information}

::: definition Information bias and misclassification {#def-information}
**Information bias** arises from errors in measuring exposure, outcome or other variables. When the measured variable is categorical, the error is called **misclassification**.

Misclassification is **non-differential** when the error in measuring one variable does not depend on the other, for example when exposure is measured equally badly in cases and controls. It is **differential** when the error differs between groups, for example when cases remember past exposures better than controls.

For a binary exposure, non-differential misclassification usually biases the association **towards the null** (towards a risk ratio of 1). Differential misclassification can bias it in either direction.
:::

Familiar types of information bias:

- **Recall bias.** In a case-control study, cases often search their memories for causes, so they report past exposures more completely than controls. Mothers of babies with congenital anomalies, for example, may recall medicines and illnesses in pregnancy in more detail than other mothers.
- **Interviewer or observer bias.** An interviewer who knows a participant's disease status may probe more deeply for exposure. An assessor who knows a patient's treatment may record outcomes differently. Blinding prevents this.
- **Detection bias.** If exposed people are examined more often, their outcomes are found more often. Women taking oral contraceptives see doctors regularly, so minor conditions are diagnosed more often in them.

::: example Non-differential misclassification {#ex-misclass}
In a fictional case-control study, the truth is that 50 of 100 cases and 25 of 100 controls were exposed, giving an odds ratio of 3. Exposure is measured by a questionnaire with sensitivity 0.8 and specificity 0.9, equally in cases and controls. What odds ratio will the study observe?
::: solution
Among cases, the number classified as exposed is $0.8 \times 50 + 0.1 \times 50 = 40 + 5 = 45$. The first term counts truly exposed cases correctly detected; the second counts unexposed cases wrongly classified as exposed (1 − specificity = 0.1).

Among controls: $0.8 \times 25 + 0.1 \times 75 = 20 + 7.5 = 27.5$.

Observed odds ratio $= \dfrac{45 \times 72.5}{55 \times 27.5} = \dfrac{3{,}262.5}{1{,}512.5} = 2.16$.

A true odds ratio of 3 is observed as about 2.2. The error is the same in both groups, yet it does not cancel. Mixing some exposed and unexposed people into the wrong group makes the groups more alike, so the association is diluted. This is why studies with crude exposure measures, such as a single dietary questionnaire, tend to underestimate effects.
:::
:::

## Confounding {#confounding}

::: definition Confounding {#def-confounding}
**Confounding** is a distortion of the association between an exposure and an outcome caused by a third factor, the **confounder**, that is mixed up with the exposure. A variable is a potential confounder if:

1. it is a cause of the outcome (or a marker of such a cause), independently of the exposure;
2. it is associated with the exposure in the population studied; and
3. it is **not** on the causal pathway between exposure and outcome.

Confounding can create an association where none exists, hide a real one, exaggerate it, or even reverse its direction.
:::

The third condition is important. If an antihypertensive drug prevents strokes by lowering blood pressure, then blood pressure after treatment is a **mediator**, not a confounder. Adjusting for it would remove part of the drug's real effect. Deciding which variables to adjust for therefore needs knowledge of the causal structure, not just statistical association. Drawing a **causal diagram** (a directed acyclic graph), with arrows from causes to effects, is a practical way to make those assumptions explicit and to see which variables to adjust for and which to leave alone.

::: example Coffee, smoking and heart attack {#ex-confounding}
A fictional case-control study of coffee drinking and myocardial infarction includes 150 cases and 200 controls. The results, overall and split by smoking, are:

| | Cases, coffee | Cases, no coffee | Controls, coffee | Controls, no coffee | Odds ratio |
|---|---|---|---|---|---|
| Smokers | 80 | 20 | 40 | 10 | 1.0 |
| Non-smokers | 10 | 40 | 30 | 120 | 1.0 |
| All | 90 | 60 | 70 | 130 | 2.79 |

Explain what has happened.
::: solution
The crude odds ratio is $(90 \times 130)/(70 \times 60) = 2.79$, suggesting that coffee nearly triples the odds of myocardial infarction.

Within each smoking stratum, the odds ratio is exactly 1: $(80 \times 10)/(40 \times 20) = 1$ among smokers and $(10 \times 120)/(30 \times 40) = 1$ among non-smokers. Among people with the same smoking status, coffee drinkers and non-drinkers are equally likely to be cases.

Smoking meets all three conditions for a confounder. It causes myocardial infarction. In these data it is strongly associated with coffee drinking: 80% of smoking controls drink coffee, compared with 20% of non-smoking controls. And it is not on a causal path from coffee to infarction. Coffee drinkers are more often smokers, and smoking explains the whole crude association. The adjusted, or Mantel–Haenszel, odds ratio is 1.0.
:::
:::

### Simpson's paradox {#simpson}

Confounding can be strong enough to reverse an association. This is called **Simpson's paradox**, and a real example comes from a 1986 study by Charig and colleagues comparing treatments for kidney stones.

::: example Kidney stones and Simpson's paradox {#ex-simpson}
The success rates of open surgery and percutaneous nephrolithotomy (PCNL) were:

| Stone size | Open surgery | PCNL |
|---|---|---|
| Small (under 2 cm) | 81/87 (93%) | 234/270 (87%) |
| Large | 192/263 (73%) | 55/80 (69%) |
| All stones | 273/350 (78%) | 289/350 (83%) |

Which treatment had the better results?
::: solution
Within each stone size, open surgery had the higher success rate: 93% against 87% for small stones, and 73% against 69% for large stones. Overall, PCNL appears better, 83% against 78%.

The explanation is that stone size is a confounder. Large stones are harder to treat by any method, and surgeons chose open surgery mainly for large stones: 263 of the 350 open operations were for large stones, compared with 80 of the 350 PCNL procedures. The open surgery group therefore contained a much higher proportion of difficult cases. Pooling the strata mixes the effect of treatment with the effect of case difficulty.

The stratified comparison is the fairer one, because stone size affects both the choice of treatment and the outcome. This is a form of **confounding by indication**, the commonest problem in observational studies of treatments: patients receive treatments because of features that also affect their prognosis.
:::
:::

### Effect modification {#effect-modification}

::: definition Effect modification {#def-effect-modification}
**Effect modification**, also called **interaction**, is present when the effect of an exposure on an outcome genuinely differs according to the level of a third variable. The stratum-specific measures differ from each other, and the difference is a real feature of the biology or the population, not a bias.
:::

Confounding and effect modification are easy to confuse, because both are found by stratifying. The difference is in what the strata show:

- In **confounding**, the stratum-specific estimates are similar to each other but different from the crude estimate. The right response is to report a single adjusted estimate.
- In **effect modification**, the stratum-specific estimates differ from each other. The right response is to report them separately, because a single summary would hide something important.

A classic example is asbestos exposure and smoking. Each increases the risk of lung cancer, and in people exposed to both the risk is much greater than either alone, roughly the product of the two. For a smoker, the effect of asbestos in absolute terms is far larger than for a non-smoker. Effect modification is also why a treatment's relative effect may be similar across patients while its absolute benefit is much larger in high-risk patients ([[epidemiology-ebm/critical-appraisal]]).

## Controlling confounding {#control}

Confounding can be dealt with at the design stage or in the analysis.

**At the design stage:**

- **Randomisation** distributes all confounders, known and unknown, equally between groups on average. It is the only method that deals with confounders nobody has thought of, which is why randomised trials are the standard for questions about treatment ([[epidemiology-ebm/randomised-trials]]).
- **Restriction** limits the study to one level of the confounder, for example only non-smokers. It is simple and effective but limits generalisability.
- **Matching** makes the comparison groups similar on selected confounders, such as age and sex. In a case-control study, matching must be accounted for in the analysis.

**In the analysis:**

- **Stratification** analyses the association within levels of the confounder and then combines the stratum-specific estimates. The **Mantel–Haenszel** method gives a weighted average. For case-control strata indexed by $i$, with $n_i$ people in stratum $i$,

$$
OR_{MH} = \frac{\sum_i a_i d_i / n_i}{\sum_i b_i c_i / n_i}.
$$ {#eq-mh}

- **Multivariable regression** (logistic, Cox, Poisson) adjusts for several confounders at once.
- **Propensity scores** summarise the probability of receiving a treatment given measured characteristics. Patients with similar scores can be matched, or the score can be used for weighting or adjustment.

All analytical methods share one limit: they can only adjust for confounders that were measured, and measured accurately. **Residual confounding** remains when a confounder is measured crudely (for example, smoking recorded only as "yes/no"), and **unmeasured confounding** remains when a confounder was not recorded at all. The hormone replacement story at the start of this chapter is the standard example. Studies adjusted for many factors, but "being the kind of person who takes preventive medicine" was not something they could measure.

::: widget plot
f: (a*(x-1)+1)/(b*(x-1)+1)
x: 1, 10
y: 0, 5
sliders: a=0.6:0:1:0.05; b=0.2:0:1:0.05
labels: \text{apparent risk ratio}
caption: How strong must an unmeasured confounder be? Here the exposure has no effect at all (true risk ratio 1). The horizontal axis is the risk ratio linking the confounder to the outcome; the sliders set the prevalence of the confounder among exposed ($a$) and unexposed ($b$) people. The curve shows the risk ratio a study would observe. A simplified model with a single binary confounder.
:::

The plot illustrates an argument first made by Jerome Cornfield and colleagues in 1959, when critics proposed that some hidden constitutional factor caused both smoking and lung cancer. For such a factor to produce the observed ninefold risk ratio on its own, it would have to be at least nine times as common among smokers as among non-smokers, and it would have to be strongly related to lung cancer. No plausible candidate came close. Sensitivity analyses of this kind, including the modern **E-value**, ask how strong unmeasured confounding would need to be to explain away an observed association.

## Biases that involve time {#time}

Several important biases come from how time is counted.

**Lead-time bias.** Screening detects disease earlier, so survival measured from diagnosis is longer even if death occurs at exactly the same age. A person whose cancer is diagnosed by symptoms at 65 and who dies at 70 has 5-year survival. If screening had found the same cancer at 62, with death still at 70, survival from diagnosis would be 8 years, and nothing would have changed.

**Length-time bias.** Slow-growing tumours spend longer in the detectable pre-symptomatic phase, so screening preferentially finds them. Screen-detected cancers therefore have a better prognosis than symptomatic ones, even if screening does no good.

**Overdiagnosis** is the extreme case: detection of disease that would never have caused symptoms or death in the person's lifetime. After South Korea added thyroid ultrasound to a national screening programme from 1999, the number of thyroid cancers diagnosed rose about fifteen-fold between 1993 and 2011, while thyroid cancer mortality stayed flat (Ahn, Kim and Welch, 2014). Most of the extra cancers were small papillary tumours that would not have harmed the people in whom they were found.

**Immortal time bias.** This arises when a cohort study classifies people as "treated" on the basis of something that happens after follow-up starts. A person must survive long enough to receive the treatment, so the time before treatment is "immortal" for the treated group but is counted in their follow-up.

::: example Immortal time {#ex-immortal}
A fictional study follows patients from the day of discharge after a myocardial infarction. Patients who collect a prescription for a new drug at any point in the next 12 months are classified as "users"; all others are "non-users". Users have much lower mortality during the year. What is wrong with the analysis?
::: solution
A patient who collects the prescription at month 6 must, by definition, have survived the first 6 months. Those 6 months of guaranteed survival are counted as user time, although the patient was not yet taking the drug. Meanwhile, patients who died early never had the chance to collect the prescription and are all counted as non-users. The drug appears protective even if it has no effect.

The correct analysis treats drug use as **time-varying**: each patient contributes person-time as a non-user until the day they start the drug, and as a user afterwards. An alternative is a **landmark analysis**, which classifies exposure at a fixed time (say 3 months) and starts follow-up for everyone from that point. A newer approach, **target trial emulation**, designs the observational analysis to mimic a hypothetical randomised trial, with a clear time zero at which eligibility, treatment assignment and the start of follow-up coincide.
:::
:::

::: warning Adjusting for everything is not the same as adjusting correctly
It is tempting to put every available variable into a regression model. But adjusting for a mediator removes part of the true effect, and adjusting for a collider (a common consequence of exposure and outcome, or a variable affected by both through other paths) can create bias where there was none. A large number of adjustment variables is not a sign of quality. What matters is whether the variables were chosen according to a sensible causal model, measured well, and recorded before the exposure.
:::

::: quiz
A cohort study finds that people who take vitamin supplements have lower mortality than people who do not. After adjustment for age, sex, smoking and body mass index, the hazard ratio is 0.85. Which explanation is most important to consider before concluding that supplements prolong life?
- [ ] Random error, because the hazard ratio is close to 1
- [x] Residual and unmeasured confounding by health-conscious behaviour and socioeconomic position
- [ ] Recall bias, because supplement use was self-reported
- [ ] Lead-time bias
::: solution
People who take supplements differ in many ways that are hard to measure: diet, exercise, income, education, access to health care and attention to symptoms. This **healthy-user effect** is a form of confounding that adjustment for a few variables cannot remove. Randomised trials of many supplements have generally not shown the mortality benefits suggested by cohort studies. Recall bias is less relevant because supplement use was recorded before death; lead-time bias concerns survival from diagnosis.
:::
:::

## From association to causation {#causation}

No observational study proves causation. But causal judgements must be made, often urgently, because public health cannot wait for trials that will never be done. In 1965 Austin Bradford Hill set out the viewpoints that epidemiologists still use.

::: theorem Bradford Hill's viewpoints on causation {#thm-hill}
Once an association has been found, and chance and bias have been considered, the following features make a causal interpretation more or less likely:

1. **Strength**: a large relative risk is harder to explain by confounding.
2. **Consistency**: the association has been found repeatedly, by different investigators, in different populations, with different methods.
3. **Specificity**: the exposure is associated with a particular disease rather than with everything.
4. **Temporality**: the exposure precedes the outcome.
5. **Biological gradient**: risk rises with dose or duration of exposure.
6. **Plausibility**: there is a credible biological mechanism.
7. **Coherence**: the interpretation fits what is known of the natural history and biology of the disease.
8. **Experiment**: removing or reducing the exposure reduces the outcome.
9. **Analogy**: similar exposures are known to cause similar effects.

Only temporality is necessary. None of the others is necessary, and none is sufficient.
:::

::: proof
Each viewpoint works by making alternative explanations less likely.

A strong association requires a correspondingly strong and unequal confounder to explain it away, as the plot above shows. Consistency across settings with different confounding structures and different biases makes it unlikely that one shared bias explains every result. A dose-response relation is harder to produce by confounding unless the confounder also varies in step with dose. Temporality is required by the meaning of "cause": an effect cannot precede its cause. An experiment, including a natural experiment such as a falling disease rate after people stop an exposure, removes much of the confounding inherent in comparing people who chose different exposures.

Specificity and analogy are the weakest. Smoking causes many diseases, so lack of specificity does not count against causation. Plausibility depends on current knowledge, which may be incomplete: Snow acted on cholera before *Vibrio cholerae* was recognised as its cause. Hill himself stressed that his viewpoints were aids to judgement, not a checklist to be scored.
:::

::: history
Joseph Berkson described the bias that bears his name in 1946, using hospital data to show how admission patterns could produce false associations between diseases. In the 1950s the smoking and lung cancer controversy forced epidemiologists to think hard about confounding. Ronald Fisher, the most famous statistician of the day and a smoker, argued that a common genetic constitution might cause both the urge to smoke and the cancer. In 1959 Jerome Cornfield and colleagues answered with a quantitative argument: any such confounder would need to be implausibly strongly associated with smoking to explain the observed risk.

In 1965 Austin Bradford Hill gave a lecture to the Royal Society of Medicine, published as "The environment and disease: association or causation?". His nine viewpoints became the most cited framework for causal judgement in medicine. Since the 1980s, causal diagrams and the counterfactual framework developed by Judea Pearl, James Robins, Sander Greenland and others have made the logic of confounding, mediation and collider bias precise.
:::

## Where this leads

The most reliable way to remove confounding is to randomise, the subject of [[epidemiology-ebm/randomised-trials]]. Bias in diagnostic accuracy studies, such as verification bias, is covered in [[epidemiology-ebm/diagnostic-tests]]. Systematic reviews assess bias formally with risk-of-bias tools ([[epidemiology-ebm/systematic-reviews]]).

::: summary
- Random error makes estimates imprecise and shrinks with sample size. Bias makes them wrong and does not.
- **Selection bias** arises from how people enter or leave a study. Berkson's bias and other collider biases arise when inclusion depends on both exposure and outcome.
- **Information bias** arises from measurement error. Non-differential misclassification of a binary exposure usually biases towards the null; differential misclassification, such as recall bias, can bias either way.
- A **confounder** is associated with the exposure, causes the outcome, and is not on the causal pathway. Confounding can create, hide or reverse associations, as in Simpson's paradox.
- **Effect modification** is a real difference in effect between subgroups; report it rather than adjust it away.
- Confounding is controlled by randomisation, restriction and matching at the design stage, and by stratification (Mantel–Haenszel), regression and propensity scores in analysis. Residual and unmeasured confounding remain.
- Lead-time, length-time and overdiagnosis distort survival comparisons in screening; immortal time bias favours treatments that start after follow-up begins.
- Bradford Hill's viewpoints help judge causation. Only temporality is essential.
:::

## Exercises

::: exercise Name the bias {level=1}
Name the main bias in each case. (a) A case-control study of birth defects interviews mothers about medicines taken in pregnancy. (b) A cohort study compares cancer mortality in nuclear power workers with the general population and finds it lower. (c) Survival after diagnosis of a cancer improves after a screening programme starts, but mortality from the cancer is unchanged.
::: solution
(a) Recall bias, a differential information bias: mothers of affected babies may remember exposures more completely. (b) The healthy worker effect, a selection bias: employed people are healthier than the general population. (c) Lead-time bias, possibly with length-time bias and overdiagnosis: earlier diagnosis lengthens survival from diagnosis without changing the date of death.
:::
:::

::: exercise A bigger study {level=1}
A cohort study of 2,000 people finds an association with a wide confidence interval. A colleague says a study of 200,000 people would remove both chance and bias. Is this right?
::: solution
No. A larger study reduces random error, so the confidence interval would be narrower. Bias is systematic and does not shrink with sample size. A very large study with confounding or selection bias gives a precise estimate of the wrong value, and its narrow confidence interval may make the error more convincing.
:::
:::

::: exercise Confounder or mediator? {level=1}
A study asks whether regular physical activity reduces the risk of type 2 diabetes. Should the analysis adjust for (a) age, (b) body weight measured after several years of activity, (c) socioeconomic position?
::: solution
(a) Yes: age affects both activity and diabetes risk and is not caused by activity. (b) Probably not, at least not in the main analysis: physical activity reduces diabetes risk partly by reducing weight, so later weight is a mediator. Adjusting for it estimates only the part of the effect not acting through weight. (Weight measured *before* the activity period is different and could be a confounder.) (c) Yes: socioeconomic position influences both activity and diabetes risk.
:::
:::

::: exercise Mantel–Haenszel odds ratio {level=2 check="2.19"}
A fictional case-control study has two age strata. Under 60: exposed cases 40, unexposed cases 60, exposed controls 20, unexposed controls 60. Aged 60 and over: exposed cases 25, unexposed cases 25, exposed controls 20, unexposed controls 50. Calculate the Mantel–Haenszel odds ratio to 2 decimal places.
::: hint
For each stratum, with $a$ exposed cases, $b$ exposed controls, $c$ unexposed cases and $d$ unexposed controls, compute $ad/n$ and $bc/n$, where $n$ is the stratum total.
:::
::: solution
Under 60: $n = 180$; $ad/n = 40 \times 60/180 = 13.333$; $bc/n = 20 \times 60/180 = 6.667$. (Stratum OR = 2.0.)

60 and over: $n = 120$; $ad/n = 25 \times 50/120 = 10.417$; $bc/n = 20 \times 25/120 = 4.167$. (Stratum OR = 2.5.)

$OR_{MH} = (13.333 + 10.417)/(6.667 + 4.167) = 23.75/10.833 = 2.19$.

The crude odds ratio is $(65 \times 110)/(40 \times 85) = 2.10$, close to the adjusted value, so age is not a strong confounder here.
:::
:::

::: exercise Diluted by misclassification {level=2 check="2.27"}
In truth, 40 of 100 cases and 20 of 100 controls in a fictional case-control study were exposed. Exposure is measured with sensitivity 0.9 and specificity 0.95 in both groups. Calculate the true odds ratio and the observed odds ratio, giving the observed odds ratio to 2 decimal places.
::: solution
True odds ratio $= (40 \times 80)/(60 \times 20) = 2.67$.

Cases classified exposed $= 0.9 \times 40 + 0.05 \times 60 = 36 + 3 = 39$; unexposed $= 61$.

Controls classified exposed $= 0.9 \times 20 + 0.05 \times 80 = 18 + 4 = 22$; unexposed $= 78$.

Observed odds ratio $= (39 \times 78)/(61 \times 22) = 3{,}042/1{,}342 = 2.27$. Non-differential misclassification has biased the estimate towards 1.
:::
:::

::: exercise Strength of an unmeasured confounder {level=2 check="1.75"}
An exposure has no real effect on an outcome. An unmeasured binary confounder multiplies the risk of the outcome by 4, and is present in 60% of exposed and 20% of unexposed people. Using the formula in the figure, what risk ratio would a study observe?
::: solution
Apparent $RR = \dfrac{0.6 \times (4-1) + 1}{0.2 \times (4-1) + 1} = \dfrac{2.8}{1.6} = 1.75$.

A modest risk ratio like 1.75 can be produced entirely by a plausible confounder. This is why weak associations in observational studies need particularly careful interpretation.
:::
:::

::: exercise Interpret the strata {level=3}
A fictional cohort study of a drug and gastrointestinal bleeding reports a crude risk ratio of 2.0. Stratified by age, the risk ratio is 1.1 in people under 65 and 3.5 in people aged 65 and over. Is age a confounder, an effect modifier, or both? How should the result be reported?
::: solution
The stratum-specific risk ratios differ substantially from each other (1.1 and 3.5), so age is an **effect modifier**: the drug appears to increase bleeding much more in older people. Age may also confound, if older people are more likely to receive the drug, but the main finding is the difference between strata.

A single adjusted risk ratio would average across very different effects and hide the clinically important point. The results should be reported separately by age group, with confidence intervals, and ideally with absolute risks, since older people also have a higher baseline risk of bleeding. A formal test of interaction should be reported, and the finding should be checked for plausibility and replication, because subgroup differences can arise by chance.
:::
:::

::: exercise Apply the viewpoints {level=3}
Several cohort studies in different countries find that heavy alcohol consumption is associated with a raised risk of oesophageal squamous cell carcinoma, with risk ratios of 3 to 5, rising with the number of drinks per day, and falling in people who stop drinking. Alcohol is metabolised to acetaldehyde, a known carcinogen. Use Bradford Hill's viewpoints to assess whether the association is causal, and name the main alternative explanation.
::: solution
- **Strength**: risk ratios of 3 to 5 are moderately strong; a confounder would need to be strongly linked to both drinking and cancer.
- **Consistency**: found in several cohorts in different countries.
- **Temporality**: cohort designs measure drinking before diagnosis.
- **Biological gradient**: risk rises with drinks per day.
- **Experiment**: risk falls after stopping, a natural experiment.
- **Plausibility and coherence**: acetaldehyde is carcinogenic, and alcohol contacts the oesophageal mucosa directly.
- **Specificity** is weak, since alcohol is linked to several cancers, but that does not count against causation.

The main alternative is **confounding by smoking**, which is strongly associated with heavy drinking and is itself a cause of oesophageal squamous cell carcinoma. It must be measured carefully and adjusted for; analysis restricted to never-smokers is a useful check. Residual confounding by diet and socioeconomic position should also be considered. Overall, the evidence supports a causal interpretation.
:::
:::

::: exercise Redesign the analysis {level=3}
A fictional registry study compares 10-year survival in patients with heart failure who were ever referred to a specialist clinic with those never referred, and finds referral associated with a 40% lower risk of death. Identify two biases that could explain this, and propose a better analysis.
::: solution
1. **Immortal time bias.** Patients must survive long enough to be referred. If referral is classified as "ever" and follow-up starts at diagnosis, the waiting time before referral is guaranteed survival credited to the referred group, while early deaths accumulate in the never-referred group.
2. **Confounding by indication and selection.** Clinicians may refer patients who are younger, fitter and more likely to benefit, and not refer frail patients or those near the end of life. These differences affect survival.

A better analysis treats referral as a time-varying exposure, or uses a landmark time (for example, survival from 6 months after diagnosis according to whether referral had happened by then). Adjustment for measured prognostic factors at diagnosis (age, ejection fraction, kidney function, comorbidity) is needed. Framing the analysis as an emulation of a target trial, with a clear time zero, makes these choices explicit. Even then, unmeasured frailty may remain, so the result should be treated with caution unless a trial is available.
:::
:::
