In 1992 Joseph Lau and colleagues published a cumulative meta-analysis of trials of intravenous streptokinase after myocardial infarction. They added the trials one at a time, in the order they were published, and recalculated the pooled result after each. A consistent, statistically significant reduction in mortality was apparent by the early 1970s. Yet many more trials were run over the following fifteen years, enrolling tens of thousands of patients, and textbooks and expert reviews continued to give inconsistent advice long after the answer was clear.

A single trial is rarely decisive. Trials differ in size, quality and setting, and their results scatter by chance. The question "what does the whole body of evidence show?" needs a method as rigorous as the trials themselves. That method is the systematic review, and its statistical arm is meta-analysis. This chapter explains how they are done, how to read a forest plot, how to recognise heterogeneity and publication bias, and how the certainty of a body of evidence is graded.

## Narrative and systematic reviews {#reviews}

::: definition Systematic review {#def-sr}
A **systematic review** answers a clearly formulated question by using explicit, prespecified methods to identify, select, appraise and synthesise all relevant studies. Its methods are written in a protocol before the review starts, and are reported in enough detail for others to reproduce it.

A **narrative review** summarises a topic from the author's knowledge and selected references, without systematic methods. It can be valuable for teaching and context, but its conclusions depend on which studies the author happened to choose.
:::

The difference matters because selective citation is easy and usually unconscious. An expert who believes a treatment works will remember the positive trials more readily. A systematic review protects against this by deciding in advance what will be included and by searching for everything that meets those criteria.

## The steps of a systematic review {#steps}

1. **Question.** The review question is framed in PICO terms (population, intervention, comparator, outcomes), with eligible study designs specified.
2. **Protocol and registration.** The methods are written down and registered before the search begins, for example in PROSPERO, the international register of systematic review protocols launched in 2011. Registration makes it possible to check later whether the review changed its outcomes or methods after seeing the data.
3. **Search.** Several bibliographic databases are searched, such as MEDLINE, Embase and the Cochrane Central Register of Controlled Trials, using a sensitive strategy designed with an information specialist. Trial registries, conference abstracts, regulatory documents and reference lists are searched for unpublished and "grey" literature. Language restrictions are avoided where possible.
4. **Screening.** Titles, abstracts and then full texts are screened against the eligibility criteria, usually by two reviewers working independently, with disagreements resolved by discussion or a third reviewer.
5. **Data extraction**, again ideally in duplicate, using a piloted form.
6. **Risk of bias assessment** for each included study.
7. **Synthesis**, by meta-analysis where studies are similar enough, or by structured narrative synthesis where they are not.
8. **Assessment of the certainty of evidence**, usually with GRADE.
9. **Reporting**, following the **PRISMA 2020** statement (Preferred Reporting Items for Systematic reviews and Meta-Analyses), which includes a flow diagram showing how many records were found, screened, excluded (with reasons) and included.

Risk of bias is judged with structured tools rather than a single quality score. For randomised trials, the Cochrane **RoB 2** tool (2019) asks about bias arising from the randomisation process, deviations from intended interventions, missing outcome data, measurement of the outcome and selection of the reported result. For non-randomised studies of interventions, **ROBINS-I** (2016) judges each study against a hypothetical ideal trial, with particular attention to confounding.

::: example Writing a review question {#ex-question}
A clinician wants to know "whether exercise helps depression". Turn this into a question suitable for a systematic review.
::: solution
A structured version:

- **Population**: adults with a diagnosis of depression (defined by recognised diagnostic criteria or a validated scale above a threshold), in any setting.
- **Intervention**: structured exercise programmes of at least 4 weeks, of any type.
- **Comparator**: no treatment, waiting list, usual care, or attention control; separately, comparisons with psychological therapy or antidepressants.
- **Outcomes**: primary, change in depressive symptoms on a validated scale at the end of treatment; secondary, remission, adverse events, quality of life, and symptoms at longer follow-up.
- **Study design**: randomised controlled trials.

Specifying the comparators separately matters: "exercise versus nothing" and "exercise versus antidepressants" are different questions, and pooling them would give an uninterpretable average. Blinding of participants is impossible, so outcome assessment by blinded assessors becomes an important risk-of-bias item.
:::
:::

## Meta-analysis {#meta-analysis}

::: definition Meta-analysis {#def-meta}
A **meta-analysis** is the statistical combination of results from two or more studies to produce a single summary estimate with a confidence interval. Each study contributes an effect estimate (such as a log risk ratio, log odds ratio or mean difference) and its standard error. Studies are weighted according to their precision.

Ratio measures are pooled on the log scale and transformed back at the end.
:::

::: theorem Inverse-variance weighting {#thm-inverse-variance}
Suppose $k$ studies estimate the same true effect $\theta$ with estimates $y_i$ and standard errors $s_i$. Give each study the weight $w_i = 1/s_i^2$. Then the pooled estimate

$$
\hat\theta = \frac{\sum_i w_i y_i}{\sum_i w_i}
$$ {#eq-pooled}

has standard error

$$
SE(\hat\theta) = \frac{1}{\sqrt{\sum_i w_i}},
$$ {#eq-pooled-se}

and among all weighted averages of the $y_i$ it has the smallest variance.
:::

::: proof
For any weights $w_i$ summing to $W$, the weighted average $\sum w_i y_i / W$ has expected value $\theta$, because each $y_i$ does. Its variance, if the studies are independent, is $\sum w_i^2 s_i^2 / W^2$. With $w_i = 1/s_i^2$, each term $w_i^2 s_i^2$ equals $w_i$, so the variance is $\sum w_i / W^2 = 1/W$, which gives the standard error above.

To see that these weights are best, minimise $\sum c_i^2 s_i^2$ subject to $\sum c_i = 1$, where $c_i$ are the normalised weights. Using a Lagrange multiplier, the minimum occurs when $c_i s_i^2$ is the same for all studies, that is when $c_i$ is proportional to $1/s_i^2$. Intuitively, a precise study carries more information and so deserves more weight. Because the pooled variance $1/\sum w_i$ is smaller than any single study's variance, pooling increases precision.
:::

The method just described is a **fixed-effect** (common-effect) meta-analysis. It assumes that every study estimates the same true effect, and that differences between results are due only to chance.

A **random-effects** meta-analysis assumes instead that the true effects differ between studies, because of differences in patients, doses, settings or outcome definitions, and that these true effects follow a distribution. It estimates the mean of that distribution. The commonest method, described by DerSimonian and Laird in 1986, adds an estimate of the between-study variance, $\tau^2$, to each study's variance before weighting. This gives relatively more weight to small studies and produces a wider confidence interval. When heterogeneity is substantial, a **prediction interval** shows the range in which the effect in a new setting is likely to lie, which is often more useful than the confidence interval for the mean.

::: example Pooling three trials {#ex-pooling}
Three fictional trials of a drug to prevent hospital admission report risk ratios of 0.70 (SE of log RR 0.20), 0.85 (SE 0.15) and 0.60 (SE 0.30). Calculate the fixed-effect pooled risk ratio and its 95% CI.
::: solution
Log risk ratios: $\ln 0.70 = -0.357$, $\ln 0.85 = -0.163$, $\ln 0.60 = -0.511$.

Weights $w = 1/s^2$: $25$, $44.4$ and $11.1$, total $80.6$. The second trial, the most precise, carries 55% of the weight; the first 31%; the third 14%.

Pooled log RR $= (25 \times -0.357 + 44.4 \times -0.163 + 11.1 \times -0.511)/80.6 = -0.271$.

$SE = 1/\sqrt{80.6} = 0.111$.

Pooled RR $= e^{-0.271} = 0.76$, with 95% CI $e^{-0.271 \pm 1.96 \times 0.111}$, which is 0.61 to 0.95.

Only the first trial was individually close to significance; the pooled estimate is clearly below 1 and more precise than any single trial.
:::
:::

## Heterogeneity {#heterogeneity}

Before pooling, ask whether the studies are similar enough to combine. This has two parts. **Clinical and methodological diversity** concerns whether the populations, interventions, comparators, outcomes and designs are similar enough for an average to mean something. **Statistical heterogeneity** concerns whether the results vary more than chance would predict.

::: definition Cochran's Q and I² {#def-heterogeneity}
**Cochran's Q** is the weighted sum of squared deviations of each study's estimate from the fixed-effect pooled estimate:

$$
Q = \sum_i w_i (y_i - \hat\theta)^2.
$$

If all studies share one true effect, $Q$ follows approximately a chi-squared distribution with $k - 1$ degrees of freedom, so its expected value is $k - 1$.

The **I² statistic** describes the percentage of variation across studies that is due to heterogeneity rather than chance:

$$
I^2 = \frac{Q - (k-1)}{Q} \times 100\%,
$$ {#eq-i2}

set to 0 when $Q < k - 1$. As a rough guide, values around 25%, 50% and 75% are often described as low, moderate and high heterogeneity, though interpretation depends on the size and direction of the effects.
:::

The Q test has low power when there are few studies, so a non-significant Q does not show that studies are homogeneous. I² does not depend on the number of studies in the same way, which is why it is widely reported. But I² measures *proportion*, not the absolute amount of variation: when studies are very large and precise, even small, clinically unimportant differences give a high I².

When heterogeneity is found, the first response is to look for its cause: differences in patients, doses, follow-up or risk of bias. **Subgroup analysis** and **meta-regression** can explore this, but they are observational comparisons between studies, prone to confounding, and should be prespecified and interpreted cautiously. Sometimes the right answer is not to pool at all.

In the three-trial example above, $Q = 1.35$ with 2 degrees of freedom. Since $Q$ is less than its expected value of 2, I² is 0: there is no evidence of heterogeneity beyond chance.

## Reading a forest plot {#forest}

Results of a meta-analysis are displayed in a **forest plot**. Each study occupies one row. A square marks its point estimate, with the size of the square proportional to its weight, and a horizontal line shows its confidence interval. A vertical line marks no effect (1 for ratios, 0 for differences). The pooled estimate appears at the bottom as a diamond, whose width is its confidence interval. Ratio measures are plotted on a log scale, so that, for example, 0.5 and 2 are the same distance from 1.

When reading a forest plot, check:

1. Which side of the line favours treatment (it should be labelled).
2. Whether the studies' intervals overlap; poor overlap suggests heterogeneity.
3. Which studies dominate the weight, and whether they are at low risk of bias.
4. The heterogeneity statistics, usually printed under the plot.
5. Whether the diamond's interval crosses the line of no effect, and whether it excludes effects too small to matter.

::: example Reading a forest plot {#ex-forest}
A forest plot of eight fictional trials of a drug for acute bronchitis shows that the two largest trials, at low risk of bias, have risk ratios for "symptoms at day 7" close to 1.0 with narrow intervals. Six small trials, several of them unblinded, show risk ratios between 0.4 and 0.7 with wide intervals. The random-effects pooled risk ratio is 0.72 (95% CI 0.55 to 0.94), with I² = 68%. What would you conclude?
::: solution
The pooled result suggests benefit, but the plot tells a different story. The large, well-conducted trials show little or no effect. The apparent benefit comes from small trials at higher risk of bias, which are given relatively more weight in a random-effects model. Heterogeneity is high, and it seems to be explained by study size and quality.

This pattern, in which small studies show larger effects, is called a **small-study effect**. It may reflect bias in small trials, publication bias (small negative trials were not published), or genuine differences in the patients studied. A sensitivity analysis restricted to trials at low risk of bias would probably show no clear benefit. The honest conclusion is that the drug probably has little effect, and the certainty of the pooled estimate is low.
:::
:::

## Publication bias {#publication-bias}

Studies with positive, statistically significant results are more likely to be published, to be published quickly, to be published in English and in widely read journals, and to be cited. Within published trials, outcomes that favour the intervention are more likely to be reported (**outcome reporting bias**). A review based only on the published literature therefore tends to overestimate benefits.

A **funnel plot** is a simple check. Each study's effect estimate is plotted against a measure of its precision, usually its standard error. Large, precise studies cluster closely around the true effect; small studies scatter more widely. Without bias the scatter is symmetrical, like an inverted funnel. If small studies showing no benefit are missing, the funnel is asymmetric. **Egger's regression test** (1997) assesses this asymmetry statistically.

::: widget plot
f: m+1.96*x; m-1.96*x; m
x: 0, 0.5
y: -1.4, 0.8
sliders: m=-0.25:-1:0.5:0.05
points: 0.05,-0.24; 0.07,-0.3; 0.09,-0.18; 0.11,-0.33; 0.14,-0.27; 0.18,-0.45; 0.22,-0.58; 0.26,-0.69; 0.3,-0.8; 0.35,-0.95; 0.4,-1.05; 0.45,-1.2
labels: \text{upper 95\% limit}; \text{lower 95\% limit}; \text{pooled log RR}
caption: A funnel plot turned on its side: each point is a fictional study, with its standard error on the horizontal axis and its log risk ratio on the vertical axis. Move the slider to set the pooled estimate. Without bias, about 95% of studies should fall inside the funnel and scatter evenly on both sides of the centre line. Here the small, imprecise studies all lie below it, showing large benefits, and the region where small studies with no benefit would appear is empty: a classic sign of publication bias or small-study effects.
:::

Asymmetry is not proof of publication bias. It can arise because small studies were done in different populations, or because of chance when there are few studies; at least about ten studies are usually needed for a funnel plot to be informative. The best protection against publication bias is prospective trial registration ([[epidemiology-ebm/randomised-trials]]), which lets reviewers find trials that were completed but never published.

::: warning Pooling does not remove bias
A meta-analysis of biased studies produces a precise, biased answer. If most trials had inadequate allocation concealment, pooling them yields a narrow confidence interval around an inflated effect. Similarly, pooling observational studies combines their confounding. The quality of a meta-analysis depends on the quality of the studies it includes, so risk of bias assessment and sensitivity analyses restricted to low-risk studies are essential, not optional.
:::

## Grading the certainty of evidence {#grade}

A meta-analysis gives an estimate. Users also need to know how much confidence to place in it. The **GRADE** approach (Grading of Recommendations Assessment, Development and Evaluation), first published in 2004, is now used by the World Health Organization, NICE, Cochrane and many other organisations.

::: definition GRADE certainty of evidence {#def-grade}
GRADE rates the certainty of a body of evidence for each outcome as **high**, **moderate**, **low** or **very low**.

Evidence from randomised trials starts as high; evidence from observational studies starts as low. It is then:

- **rated down** for risk of bias, inconsistency (unexplained heterogeneity), indirectness (differences between the studies' populations, interventions or outcomes and the question of interest), imprecision (wide confidence intervals or few events), and publication bias;
- **rated up** (mainly for observational evidence) for a large effect, a dose-response gradient, or when all plausible residual confounding would reduce the observed effect.
:::

The ratings have plain meanings. High certainty means the true effect is very likely close to the estimate. Moderate means it is probably close, but could be substantially different. Low means it may be substantially different. Very low means it is likely to be substantially different. GRADE results are presented in a **summary of findings table**, which gives, for each important outcome, the relative effect, the absolute effect per 1,000 people, the number of participants and studies, and the certainty rating.

::: example Grading a body of evidence {#ex-grade}
Six fictional randomised trials (1,200 participants in total) assess a drug for preventing migraine. Four have unclear allocation concealment and unblinded outcome assessment. The pooled mean reduction in migraine days per month is 1.2 (95% CI 0.1 to 2.3), with I² = 20%. The trials enrolled adults in specialist clinics, as does the review question. The funnel plot is uninformative because there are only six trials. Rate the certainty of the evidence.
::: solution
Start at **high**, because the evidence comes from randomised trials.

- **Risk of bias**: most trials have serious limitations in concealment and blinding, and migraine days are self-reported, so rate down one level.
- **Inconsistency**: I² of 20% is low, and there is no reason to rate down.
- **Indirectness**: the population and setting match the question, so no rating down.
- **Imprecision**: the confidence interval runs from a trivial 0.1 days to a worthwhile 2.3 days. If the minimal important difference is about 1 day, the interval includes both important and unimportant effects, so rate down one level.
- **Publication bias**: cannot be assessed well with six trials; not rated down without specific concern, but noted.

The certainty is therefore **low**: the true effect may be substantially different from the estimate. A summary statement might read: "The drug may reduce migraine days slightly; the evidence is of low certainty."
:::
:::

## Beyond the standard review {#beyond}

- **Individual participant data (IPD) meta-analysis** obtains the original data for every participant from each trial. It allows consistent definitions and analyses across trials and more reliable subgroup analyses, at the cost of much more time and collaboration.
- **Network meta-analysis** compares several treatments at once by combining direct comparisons (A versus B in the same trial) with indirect ones (A versus C and B versus C). It depends on the **transitivity** assumption: that the trials are similar enough, apart from the treatments compared, for indirect comparisons to be valid.
- **Living systematic reviews** are updated continually as new evidence appears. They became prominent during the COVID-19 pandemic, when evidence changed weekly.
- **Umbrella reviews** summarise several systematic reviews on related questions.
- **Rapid reviews** simplify some steps to produce an answer quickly, with a corresponding increase in the risk of missing evidence.

::: quiz
A meta-analysis of 12 trials reports a pooled odds ratio of 0.80 (95% CI 0.70 to 0.91) with I² = 0%. The funnel plot shows that all small trials favour treatment, and there are no small trials showing harm. Which is the most appropriate response?
- [ ] Accept the result: there is no heterogeneity, so the estimate is reliable.
- [x] Consider possible publication bias or small-study effects, search trial registries for unpublished trials, and examine the result of the largest trials.
- [ ] Switch from a fixed-effect to a random-effects model to correct the bias.
- [ ] Exclude the small trials and report only the largest one.
::: solution
Low heterogeneity does not rule out publication bias: if negative small trials are missing, the remaining studies can agree with each other and still all be biased in the same direction. The asymmetric funnel is a warning sign. The next steps are to search for unpublished trials, compare with the largest, most precise trials, and consider rating down the certainty for publication bias. A random-effects model gives more weight to small trials and would make the problem worse.
:::
:::

::: history
Archie Cochrane, a British epidemiologist, argued in his 1972 book *Effectiveness and Efficiency: Random Reflections on Health Services* that health services should be based on treatments shown by randomised trials to work. In 1979 he wrote that it was a great criticism of the medical profession that it had not organised a critical summary, by specialty and updated periodically, of all relevant randomised controlled trials.

Iain Chalmers and colleagues took up the challenge in perinatal medicine, assembling a register of trials in pregnancy and childbirth and publishing systematic reviews of them in the late 1980s. One of the best-known reviews concerned corticosteroids given to women expected to deliver preterm. Graham Liggins and Ross Howie had reported the first trial in 1972. By the early 1980s, the trials taken together showed that antenatal steroids reduced deaths among premature babies, but because no one had combined them, the treatment was widely underused for years. The forest plot from this review became the logo of the Cochrane Collaboration, founded in 1993 to prepare, maintain and disseminate systematic reviews of health care. The statistical term "meta-analysis" had been coined by the psychologist Gene Glass in 1976.
:::

## Where this leads

Systematic reviews are the foundation of clinical guidelines, discussed in [[epidemiology-ebm/critical-appraisal]]. The statistics of pooled estimates rest on the ideas in [[epidemiology-ebm/statistics-for-clinicians]], and the risk of bias domains on [[epidemiology-ebm/randomised-trials]] and [[epidemiology-ebm/bias-confounding]].

::: summary
- A **systematic review** answers a defined question with prespecified, reproducible methods: protocol and registration (PROSPERO), comprehensive search, duplicate screening and extraction, risk of bias assessment, synthesis, and PRISMA 2020 reporting.
- Risk of bias is assessed with RoB 2 for randomised trials and ROBINS-I for non-randomised studies.
- **Meta-analysis** pools study estimates, weighting each by the inverse of its variance. The pooled SE is $1/\sqrt{\sum w_i}$. Ratios are pooled on the log scale.
- Fixed-effect models assume one true effect; random-effects models assume a distribution of true effects and give wider intervals.
- Heterogeneity is assessed by Cochran's Q and $I^2 = (Q - df)/Q$. Look for its causes before pooling.
- In a forest plot, square size reflects weight and the diamond shows the pooled estimate. Check which studies drive the result.
- Publication and small-study bias inflate pooled effects; funnel plots and Egger's test detect asymmetry, and trial registration is the best protection.
- **GRADE** rates certainty as high, moderate, low or very low, rating down for risk of bias, inconsistency, indirectness, imprecision and publication bias, and up for large effects, dose-response and confounding that would reduce the effect.
:::

## Exercises

::: exercise Weight of a study {level=1 check="80"}
Two trials are combined in a fixed-effect meta-analysis. Trial A has a standard error of 0.1 for its log risk ratio; trial B has a standard error of 0.2. What percentage of the total weight does trial A receive?
::: solution
Weights are $1/0.1^2 = 100$ and $1/0.2^2 = 25$. Trial A receives $100/125 = 80\%$. Halving the standard error quadruples the weight, which in practice means roughly four times as many participants.
:::
:::

::: exercise Pooled standard error {level=1 check="0.1"}
Four trials each have a standard error of 0.2 for their log odds ratio. What is the standard error of the fixed-effect pooled log odds ratio?
::: solution
Each weight is $1/0.04 = 25$, total 100. Pooled $SE = 1/\sqrt{100} = 0.1$. Four equal studies halve the standard error, as one study four times as large would.
:::
:::

::: exercise Steps of a review {level=1}
A student searches PubMed for "drug X AND asthma", reads the first 20 abstracts, and summarises the five trials that look most relevant. List four ways in which this falls short of a systematic review.
::: solution
Any four of: no prespecified protocol or eligibility criteria; only one database searched and no search of trial registries or grey literature; search terms not designed for sensitivity (no synonyms or subject headings); only the first 20 records screened; selection by one person on the basis of "relevance" rather than criteria applied in duplicate; no formal risk of bias assessment; no structured synthesis or assessment of certainty; not reported in a reproducible way (PRISMA).
:::
:::

::: exercise Calculating I² {level=2 check="55"}
A meta-analysis of 10 studies reports Cochran's $Q = 20$. Calculate $I^2$ as a percentage.
::: solution
Degrees of freedom $= 10 - 1 = 9$. $I^2 = (20 - 9)/20 = 0.55$, or 55%: moderate heterogeneity. Its causes should be explored before a single pooled estimate is relied on.
:::
:::

::: exercise Pooling two trials {level=2 check="0.63"}
Two fictional trials have risk ratios of 0.5 and 0.8, each with a standard error of 0.25 for the log risk ratio. Calculate the fixed-effect pooled risk ratio to 2 decimal places.
::: hint
With equal weights, the pooled log RR is the simple average of the two log RRs.
:::
::: solution
$\ln 0.5 = -0.693$ and $\ln 0.8 = -0.223$. The average is $-0.458$, and $e^{-0.458} = 0.63$ (the geometric mean, $\sqrt{0.5 \times 0.8} = 0.632$). The pooled SE is $1/\sqrt{32} = 0.177$, so the 95% CI is 0.45 to 0.89. Here $Q = 1.77$ with 1 degree of freedom, so $I^2 = 43\%$.
:::
:::

::: exercise Rate the evidence {level=2}
Eight cohort studies consistently show that a fictional occupational exposure is associated with bladder cancer, with a pooled risk ratio of 4.5 (95% CI 3.6 to 5.6) and a clear increase in risk with years of exposure. What GRADE certainty would you assign, and why?
::: solution
Observational evidence starts at **low**. There is no obvious reason to rate down for inconsistency or imprecision (the interval is narrow and well away from 1), assuming the studies are at acceptable risk of bias. It can be rated **up** for a large effect (risk ratio above about 2 with consistent results, and arguably very large) and for a **dose-response gradient**. Rating up by one or two levels gives **moderate** or **high** certainty. The reasoning must be made explicit, including whether confounding by smoking, a strong cause of bladder cancer, was adequately addressed.
:::
:::

::: exercise Interpreting heterogeneity {level=3}
A meta-analysis of 15 trials of a fall-prevention programme in older people reports a pooled risk ratio for falls of 0.85 (95% CI 0.75 to 0.96) with $I^2 = 72\%$. The trials range from frail care-home residents to fit people living at home. What should the review authors do, and how should a clinician interpret the result?
::: solution
High heterogeneity means the effect varies substantially between trials, so the pooled estimate is an average of different effects. The authors should look for explanations planned in the protocol: setting (care home or community), baseline risk of falling, programme content and intensity, and risk of bias. Subgroup analysis or meta-regression by these factors, interpreted cautiously, may show that the programme works in some groups and not others. A random-effects model with a **prediction interval** would show the range of effects to expect in a new setting, which may include no benefit. The certainty of evidence should be rated down for inconsistency unless the heterogeneity is explained.

A clinician should not assume a 15% reduction applies to their patients. They should look for the subgroup that most resembles their own population. If no explanation is found, the honest message is that the programme reduces falls on average, but the size of the benefit in any particular setting is uncertain.
:::
:::

::: exercise A suspicious funnel {level=3}
Twenty fictional trials of an antidepressant are pooled. Three large trials funded by the manufacturer and registered in advance report small benefits. Seventeen small trials, few of them registered, report larger benefits. A search of the regulator's documents finds five completed trials that were never published, all showing no significant benefit. Describe the likely biases and how the review should handle them.
::: solution
The pattern suggests **publication bias** (negative trials unpublished), **small-study effects** (small trials showing larger effects, possibly because of weaker methods), and possibly **outcome reporting bias** in the small unregistered trials. The review should:

1. Include the unpublished trials using data from the regulator, clinical study reports or trial registries, and compare results with and without them.
2. Assess risk of bias in each trial, including selective reporting, by checking registered outcomes against published ones where possible.
3. Perform sensitivity analyses restricted to large or low-risk trials.
4. Present a funnel plot and Egger's test, noting their limits.
5. Rate down certainty for publication bias in GRADE if missing results remain likely to have changed the conclusion.

The pooled estimate including unpublished data is likely to show a smaller benefit than the published literature suggests. This happened in real reviews of antidepressants and other drugs once regulators' data were examined.
:::
:::
