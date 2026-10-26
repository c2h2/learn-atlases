A trial abstract reports: "The new treatment reduced stroke (7.5% vs 12.0%; relative risk 0.63, 95% CI 0.40 to 0.97; p = 0.03)." A clinician who reads this needs to know what each of those numbers means, which of them answer the questions a patient will ask, and what none of them can say. This chapter covers the statistical ideas that appear in almost every clinical paper: variability and standard errors, confidence intervals, p-values, absolute and relative effects, the number needed to treat, survival analysis and regression. The aim is not to make you a statistician but to let you read results accurately and explain them honestly.

We use one fictional trial throughout: 800 people at high risk of stroke are randomised, 400 to a new treatment and 400 to standard care. Over 3 years, 30 people in the treatment group and 48 in the control group have a stroke.

## Describing data {#describing}

A **mean** is the arithmetic average; a **median** is the middle value when observations are ordered. For skewed data, such as length of hospital stay or income, a few large values pull the mean upwards, so the median is the better summary. The spread of data is described by the **standard deviation** (SD) or, for skewed data, the interquartile range.

::: definition Standard deviation and standard error {#def-se}
The **standard deviation** (SD) describes how much individual observations vary around their mean. It is a property of the population and does not get smaller as more people are measured.

The **standard error** (SE) describes how precisely a sample statistic, such as a mean, estimates the corresponding population value. For a mean of $n$ independent observations,

$$
SE = \frac{SD}{\sqrt{n}}.
$$

For a proportion $p$ estimated from $n$ people, $SE = \sqrt{p(1-p)/n}$. The standard error shrinks as the sample grows.
:::

The two are often confused, and some papers report the SE because it is smaller and makes data look tidier. The rule is simple: use the SD to describe the people in a study, and the SE (or better, a confidence interval) to describe the uncertainty of an estimate.

## Confidence intervals {#ci}

::: definition Confidence interval {#def-ci}
A **95% confidence interval** (CI) is a range calculated from the data by a method that, if the study were repeated many times, would include the true population value in 95% of repetitions.

For an estimate that is approximately normally distributed, the 95% CI is

$$
\text{estimate} \pm 1.96 \times SE.
$$ {#eq-ci}

Ratio measures, such as risk ratios, odds ratios and hazard ratios, are calculated on the log scale and then transformed back, so their intervals are not symmetrical around the estimate.
:::

The practical interpretation is that values inside the interval are reasonably compatible with the data, and values well outside it are not. A wide interval means the study is imprecise. A narrow interval means it is precise, though not necessarily unbiased: a confidence interval accounts for random error only ([[epidemiology-ebm/bias-confounding]]).

It is not quite correct to say "there is a 95% probability that the true value lies in this interval". The true value is fixed; it is the interval that varies from study to study. The figure below shows this directly.

::: widget confidence
dist: normal
n: 20
level: 0.95
intervals: 50
caption: Fifty simulated studies, each estimating the same true mean from a sample of 20. Each line is one study's 95% confidence interval. About 95% of the intervals contain the true value, but any single interval either does or does not. Change the sample size and see the intervals narrow; change the confidence level and see the trade-off between width and coverage.
:::

::: example A confidence interval for a proportion {#ex-ci-proportion}
A surgical audit finds 40 complications in 200 operations. Calculate the complication rate with its 95% confidence interval.
::: solution
$p = 40/200 = 0.20$.

$SE = \sqrt{0.20 \times 0.80/200} = \sqrt{0.0008} = 0.0283$.

95% CI $= 0.20 \pm 1.96 \times 0.0283 = 0.20 \pm 0.055$, so 14.5% to 25.5%.

The true complication rate for this surgeon is plausibly anywhere between about 15% and 25%. If the national rate were 15%, these data would not be strong evidence that the surgeon is worse. This simple (Wald) interval is adequate here; for small samples or proportions near 0 or 1, better methods such as the Wilson interval should be used.
:::
:::

## P-values and hypothesis tests {#p-values}

::: definition P-value, significance and errors {#def-pvalue}
A **null hypothesis** states that there is no difference between groups (for example, the true risk ratio is 1). A **p-value** is the probability of obtaining a result at least as extreme as the one observed, if the null hypothesis were true.

If the p-value is below a prespecified **significance level** $\alpha$, conventionally 0.05, the result is called **statistically significant**. Rejecting a true null hypothesis is a **type I error** (probability $\alpha$); failing to reject a false one is a **type II error** (probability $\beta$). **Power**, $1 - \beta$, is the probability of detecting an effect of a specified size.
:::

A p-value is easy to misread. It is **not**:

- the probability that the null hypothesis is true;
- the probability that the result occurred "by chance";
- a measure of the size or importance of an effect.

A large trial can produce a tiny p-value for a trivial effect. A small trial can produce a large p-value for an important effect that it was too small to detect. In 2016 the American Statistical Association issued a formal statement making these points, and recommending that p-values be interpreted alongside estimates, confidence intervals and context, not in isolation.

**Multiple testing** inflates false positives. If 20 independent comparisons are made where no true differences exist, the probability that at least one reaches $p < 0.05$ is $1 - 0.95^{20}$, about 64%. Trials therefore name a single primary outcome in advance, and analyses of many outcomes or subgroups should be treated as hypothesis-generating unless corrected for multiplicity.

::: theorem Confidence intervals and p-values agree {#thm-duality}
For the usual tests, a two-sided p-value is below 0.05 if and only if the 95% confidence interval excludes the null value (0 for a difference, 1 for a ratio).
:::

::: proof
Both are built from the same estimate and standard error. The test statistic is $z = (\text{estimate} - \text{null value})/SE$, and $p < 0.05$ two-sided exactly when $|z| > 1.96$. That inequality is the same as saying that the null value lies more than $1.96 \times SE$ from the estimate, which is the same as saying that it lies outside the interval $\text{estimate} \pm 1.96 \times SE$. For ratios, the same argument applies on the log scale, where the null value is $\ln 1 = 0$. (Small discrepancies can occur when the test and the interval are calculated by slightly different methods.)
:::

The confidence interval therefore contains everything the p-value says, and more: it shows the size of the effect and the range of values compatible with the data. This is why journals, following the argument of Gardner and Altman in 1986, ask authors to report confidence intervals rather than p-values alone.

::: example Statistical and clinical significance {#ex-significance}
A fictional drug lowers systolic blood pressure by a mean of 1.5 mmHg more than placebo in a trial of 20,000 people (95% CI 1.0 to 2.0 mmHg, $p < 0.001$). A second fictional drug lowers it by 8 mmHg more than placebo in a trial of 60 people (95% CI −1 to 17 mmHg, $p = 0.08$). Which result is more important?
::: solution
The first result is highly statistically significant, but the whole interval lies between 1 and 2 mmHg, an effect too small to matter for most individual patients. The large trial has measured a small effect precisely.

The second result is not statistically significant, but the point estimate is large, and the interval runs from a slight rise to a 17 mmHg fall. The data are compatible with no effect and with a very large one. The trial is too small to tell, and a larger trial is justified.

Neither p-value tells you what matters. The confidence intervals, judged against the smallest difference that would be clinically important (the **minimal clinically important difference**, MCID), do.
:::
:::

## Absolute and relative effects {#effects}

::: definition Measures of treatment effect and the number needed to treat {#def-nnt}
Let the risk of the outcome be $R_C$ in the control group (the **control event rate**) and $R_T$ in the treatment group.

- **Absolute risk reduction**: $ARR = R_C - R_T$.
- **Relative risk**: $RR = R_T/R_C$.
- **Relative risk reduction**: $RRR = 1 - RR = (R_C - R_T)/R_C$.
- **Number needed to treat**: $NNT = 1/ARR$, the number of people who must be treated for the stated time for one extra person to benefit. By convention it is rounded **up** to a whole number.

When a treatment increases an adverse outcome, the corresponding **number needed to harm** is $NNH = 1/(R_T - R_C)$ for that outcome.

An NNT is meaningful only with its comparator, outcome and time period ("40 people treated for 5 years to prevent one heart attack").
:::

::: example The running trial {#ex-nnt}
In the trial described at the start of the chapter, 30/400 people in the treatment group and 48/400 in the control group had a stroke over 3 years. Calculate the ARR, RR, RRR and NNT, with a 95% CI for the ARR and the RR.
::: solution
$R_T = 30/400 = 0.075$; $R_C = 48/400 = 0.12$.

**ARR** $= 0.12 - 0.075 = 0.045$ (4.5 percentage points). Its SE is $\sqrt{0.075 \times 0.925/400 + 0.12 \times 0.88/400} = 0.0209$, so the 95% CI is $0.045 \pm 0.041$, or 0.4 to 8.6 percentage points.

**RR** $= 0.075/0.12 = 0.625$; **RRR** $= 37.5\%$. On the log scale, $\ln RR = -0.470$ and

$$
SE(\ln RR) = \sqrt{\tfrac{1}{30} - \tfrac{1}{400} + \tfrac{1}{48} - \tfrac{1}{400}} = 0.222.
$$

The 95% CI is $\exp(-0.470 \pm 1.96 \times 0.222)$, which is 0.40 to 0.97.

**NNT** $= 1/0.045 = 22.2$, rounded up to 23 people treated for 3 years to prevent one stroke. Inverting the ARR limits gives an NNT CI of 12 to 250: the data are compatible with a substantial benefit or with a very small one.

The interval for the RR excludes 1, and the interval for the ARR excludes 0, consistent with the p-value of about 0.03 quoted in the abstract.
:::
:::

Relative and absolute measures tell different stories, and both are needed. Relative effects are often fairly constant across patients with different baseline risks. Absolute effects are not. A relative risk reduction of 25% means an ARR of 2.5 percentage points (NNT 40) for a patient whose risk is 10%, but only 0.5 points (NNT 200) for a patient whose risk is 2%. This is why the decision to treat depends on the individual's baseline risk, a point developed in [[epidemiology-ebm/critical-appraisal]].

Presenting only relative effects makes treatments look more impressive. "Reduces the risk of stroke by 37%" sounds more persuasive than "reduces it from 12% to 7.5% over 3 years", although they describe the same result. Both doctors and patients judge treatments more favourably when given relative figures. Good practice is to give absolute risks with and without treatment, in natural frequencies, over a stated time.

::: warning Regression to the mean
Patients are often selected for treatment, or for a study, because a measurement is unusually high: a blood pressure of 170 mmHg, a cholesterol at the top of the range, a bad week of symptoms. Any measurement includes random variation, so a person picked because of an extreme reading will, on average, have a less extreme reading next time, even with no treatment at all. This is **regression to the mean**. It makes untreated patients appear to improve, and makes any treatment given after an extreme reading appear to work. A randomised control group, which regresses equally, is the remedy. It also explains why a single high reading should be repeated before a diagnosis is made.
:::

## Survival analysis {#survival}

Many trials measure time to an event, such as death, relapse or hospital admission. Participants are followed for different lengths of time, and some reach the end of the study without the event. Their observations are **censored**: we know only that their event, if any, happens after their last follow-up.

::: definition Kaplan–Meier curve and hazard ratio {#def-hr}
The **Kaplan–Meier estimate** of survival is a step function that drops at each event time. At each event, the probability of surviving that moment is the number not having the event divided by the number still at risk; censored participants leave the risk set without causing a drop. The survival curve is the product of these probabilities.

The **hazard** is the instantaneous rate of the event among those still at risk. The **hazard ratio** (HR) compares the hazards in two groups. An HR of 0.75 means that, at any time, people in the treatment group have the event at three-quarters of the rate of those in the control group. It is usually estimated with the **Cox proportional hazards model**, which assumes that the ratio is constant over time.
:::

When reading a survival result, look at the curves, not just the HR. Check how many people remain at risk at later times (often shown below the plot): the tail of a curve based on a handful of people is unreliable. Look for curves that cross, which suggests that hazards are not proportional and that a single HR is a poor summary. And translate the HR into absolute terms where possible, such as the difference in the proportion alive at 5 years or in median survival.

::: example Reading a survival result {#ex-survival}
A fictional cancer trial reports overall survival with an HR of 0.80 (95% CI 0.70 to 0.92). Median survival was 14 months with the new drug and 12 months with the standard drug. At 3 years, 18% and 13% of patients were alive. How would you summarise this for a patient?
::: solution
The HR means that at any time the death rate was about 20% lower with the new drug, and the interval (0.70 to 0.92) excludes 1, so the result is unlikely to be due to chance alone. In absolute terms, half of the patients lived longer than 14 months with the new drug and 12 months with the standard drug, a difference of about 2 months in median survival. At 3 years, about 18 in 100 patients were alive with the new drug compared with 13 in 100 with the standard drug.

A fair summary for a patient might be: "On average people lived about 2 months longer, and a few more were still alive after 3 years: about 18 in every 100 compared with 13." This would be weighed against side effects, quality of life and the patient's own priorities. The relative figure "20% lower risk of death" alone would give a misleading impression of the size of the benefit.
:::
:::

## Regression and prediction {#regression}

Regression models describe how an outcome depends on several variables at once:

- **Linear regression** for continuous outcomes, such as blood pressure.
- **Logistic regression** for binary outcomes, giving odds ratios.
- **Cox regression** for time to event, giving hazard ratios.
- **Poisson regression** for counts and rates, giving rate ratios.

In observational research these models are used to adjust for confounders. Their coefficients are then interpreted as the association with one variable "holding the others constant", which is only as good as the choice and measurement of the other variables.

Regression is also used to build **clinical prediction models**, such as cardiovascular risk scores. Two warnings apply. First, a model fitted to too few events will **overfit**: it describes the noise in the development data and predicts poorly in new patients. A common rough guide is to have at least 10 outcome events for each candidate predictor, though current methods calculate the required sample size more carefully. Second, a model must be **validated** in new data, ideally from a different setting, and checked for **discrimination** (the c-statistic, or area under the ROC curve; see [[epidemiology-ebm/diagnostic-tests]]) and **calibration** (whether predicted risks match observed risks).

Correlation is not causation, and a strong correlation coefficient says nothing about the size of an effect. Ice cream sales and drowning are correlated because both rise in hot weather.

::: example Regression to the mean in a clinic {#ex-rtm}
A practice invites 200 patients whose last cholesterol was above 7.5 mmol/L to a new dietary education session. Six weeks later the mean cholesterol in the group has fallen by 0.6 mmol/L. The practice manager concludes that the session works. What else could explain the fall?
::: solution
The patients were selected *because* their last reading was high. Cholesterol varies from day to day and with laboratory error, so many of those above 7.5 mmol/L had a reading above their usual level. On re-testing, their values will tend to be lower even without any intervention. This is regression to the mean, and it can easily account for a fall of this size.

Other explanations include changes made by patients after being told their result (they may have started medication or changed diet independently) and seasonal variation. To find out whether the session works, the practice would need a comparison group selected in the same way, ideally randomised to session or no session, with both groups re-tested at six weeks. Using the average of two baseline measurements to select patients would also reduce the effect.
:::
:::

::: quiz
A trial reports a hazard ratio for death of 0.85 with a 95% CI of 0.72 to 1.01 ($p = 0.06$). Which conclusion is best supported?
- [ ] The treatment has no effect on mortality.
- [ ] The treatment reduces mortality by 15%.
- [x] The data are compatible with a mortality reduction of up to about 28% and with a very small increase; the trial is inconclusive.
- [ ] The result would have been significant with a one-sided test, so the treatment works.
::: solution
The interval includes 1, so the trial has not shown a statistically significant effect, but it does not show "no effect" either: most of the interval lies on the side of benefit. The honest summary is uncertainty. Switching to a one-sided test after seeing the data is not legitimate. A systematic review combining this trial with others may resolve the question.
:::
:::

::: history
William Sealy Gosset, a chemist at the Guinness brewery in Dublin, published the *t*-distribution in 1908 under the pen name "Student", to deal with the small samples used in quality control. Ronald Fisher developed significance testing and popularised the 5% level as a convenient threshold in the 1920s, while Jerzy Neyman and Egon Pearson developed the framework of hypothesis tests with type I and type II errors in the late 1920s and 1930s. Neyman also introduced the confidence interval in 1937.

Survival analysis took its modern form when Edward Kaplan and Paul Meier published their estimator in 1958, and David Cox introduced the proportional hazards model in 1972. In medicine, Martin Gardner and Douglas Altman's 1986 paper in the *British Medical Journal* argued for confidence intervals rather than p-values alone, and journals changed their instructions to authors. Andreas Laupacis, David Sackett and Robin Roberts proposed the number needed to treat in 1988 as a clinically meaningful way to express treatment effects.
:::

## Where this leads

These ideas are applied to pooling studies in [[epidemiology-ebm/systematic-reviews]], and to deciding whether a result applies to a particular patient in [[epidemiology-ebm/critical-appraisal]]. The design features that make the statistics trustworthy are in [[epidemiology-ebm/randomised-trials]].

::: summary
- The SD describes variation between people; the SE describes the precision of an estimate and shrinks as $1/\sqrt{n}$.
- A 95% CI is estimate ± 1.96 SE (on the log scale for ratios). It shows the size of an effect and the range compatible with the data, and it reflects random error only.
- A p-value is the probability of data at least this extreme if the null hypothesis were true. It is not the probability that the null is true, and it does not measure effect size. Multiple testing inflates false positives.
- The CI excludes the null value exactly when $p < 0.05$, so the CI carries more information.
- Report absolute effects (ARR, NNT = 1/ARR, rounded up) alongside relative effects (RR, RRR). Absolute benefit depends on baseline risk.
- Statistical significance is not clinical importance: compare the CI with the minimal clinically important difference.
- Survival analysis handles censoring with Kaplan–Meier curves; the hazard ratio compares event rates over time and assumes proportional hazards.
- Regression adjusts for several variables; prediction models must avoid overfitting and be validated for discrimination and calibration.
- Regression to the mean makes extreme values move towards average on re-measurement; only a control group protects against it.
:::

## Exercises

::: exercise Standard error {level=1 check="2"}
A sample of 36 patients has a mean haemoglobin of 128 g/L with a standard deviation of 12 g/L. What is the standard error of the mean, in g/L?
::: solution
$SE = 12/\sqrt{36} = 12/6 = 2$ g/L. The 95% CI for the mean is $128 \pm 3.9$, about 124 to 132 g/L.
:::
:::

::: exercise Number needed to treat {level=1 check="20"}
In a fictional trial, 20% of control patients and 15% of treated patients have the outcome over 2 years. What is the NNT?
::: solution
$ARR = 0.20 - 0.15 = 0.05$. $NNT = 1/0.05 = 20$: twenty people treated for 2 years to prevent one outcome. The RRR is 25%.
:::
:::

::: exercise Number needed to harm {level=1 check="50"}
In the same trial, a side effect occurs in 3% of treated patients and 1% of controls. What is the number needed to harm?
::: solution
The absolute risk increase is $0.03 - 0.01 = 0.02$, so $NNH = 1/0.02 = 50$. For every 50 people treated for 2 years, one extra person has the side effect, while one in 20 avoids the outcome.
:::
:::

::: exercise A confidence interval for a proportion {level=2 check="17.2"}
A screening programme finds that 18 of 150 people invited did not attend. Calculate the 95% confidence interval for the non-attendance rate using the simple (Wald) method, and give the upper limit as a percentage to 1 decimal place.
::: solution
$p = 18/150 = 0.12$. $SE = \sqrt{0.12 \times 0.88/150} = 0.0265$. $1.96 \times SE = 0.052$. The interval is 0.068 to 0.172, so the upper limit is 17.2%.
:::
:::

::: exercise A confidence interval for a risk ratio {level=2 check="0.82"}
In a fictional trial, 20 of 200 treated patients and 40 of 200 controls have an event. Calculate the risk ratio and the upper limit of its 95% confidence interval, using $SE(\ln RR) = \sqrt{1/a - 1/n_1 + 1/c - 1/n_0}$. Give the upper limit to 2 decimal places.
::: solution
$RR = (20/200)/(40/200) = 0.5$.

$SE(\ln RR) = \sqrt{1/20 - 1/200 + 1/40 - 1/200} = \sqrt{0.065} = 0.255$.

Upper limit $= \exp(\ln 0.5 + 1.96 \times 0.255) = 0.5 \times e^{0.4997} = 0.82$. The lower limit is $0.5 \times e^{-0.4997} = 0.30$. The interval, 0.30 to 0.82, excludes 1.
:::
:::

::: exercise An individual NNT {level=2 check="42"}
A treatment reduces the relative risk of an outcome by 30%. A patient's estimated 5-year risk without treatment is 8%. Estimate this patient's NNT over 5 years, rounded up to a whole number.
::: solution
$ARR = 0.08 \times 0.30 = 0.024$. $NNT = 1/0.024 = 41.7$, rounded up to 42. A patient with a 24% baseline risk would have an NNT of 14 from the same treatment.
:::
:::

::: exercise Multiple comparisons {level=2 check="64.2"}
A study compares two groups on 20 independent outcomes, none of which truly differs. Each test uses $\alpha = 0.05$. What is the probability, as a percentage to 1 decimal place, that at least one comparison is statistically significant?
::: solution
The probability that none is significant is $0.95^{20} = 0.358$. So the probability that at least one is significant is $1 - 0.358 = 0.642$, or 64.2%. A "significant" finding among many outcomes is weak evidence unless it was the prespecified primary outcome or the analysis was corrected for multiplicity.
:::
:::

::: exercise When the NNT interval crosses infinity {level=3}
A fictional trial finds an ARR of 2 percentage points with a 95% CI of −1 to 5 points. What is the NNT, and how should its confidence interval be described?
::: solution
$NNT = 1/0.02 = 50$. Inverting the confidence limits gives $1/0.05 = 20$ (benefit) and $1/(-0.01) = -100$, an NNH of 100. Because the ARR interval includes 0, the NNT interval passes through infinity (no effect). It should be reported as "NNT 50 (95% CI: NNT 20 to infinity to NNH 100)", which means the data are compatible with benefit for 1 in 20 treated, with no effect, or with harm for 1 in 100. Reporting "NNT 50 (−100 to 20)" is confusing and wrong. Altman described this convention in 1998.
:::
:::

::: exercise Interpreting two trials {level=3}
Two fictional trials test the same drug for reducing pain on a 0–100 scale, where the minimal clinically important difference is 10 points. Trial A: mean difference 4 points (95% CI 2 to 6). Trial B: mean difference 12 points (95% CI −2 to 26). Interpret each trial, and explain what a clinician should conclude.
::: solution
**Trial A** shows a statistically significant difference, but the whole interval lies below the MCID of 10. The drug probably has a real but clinically unimportant average effect. (Some individual patients may still benefit more than average.)

**Trial B** is not statistically significant, because the interval includes 0. But the point estimate exceeds the MCID, and the interval extends well above it. The trial is imprecise: the drug could have no effect or a large one.

Taken together, the precise Trial A suggests that a large average effect is unlikely, since its upper limit is 6. The clinician should conclude that the average benefit is probably small, and look for a systematic review combining all trials. Neither trial supports the statement "the drug works" or "the drug does not work" on the basis of its p-value alone.
:::
:::
