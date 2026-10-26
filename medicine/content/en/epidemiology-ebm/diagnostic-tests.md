A 45-year-old woman with no symptoms has a screening blood test for a cancer. The test is described as "90% sensitive and 95% specific", and her result is positive. How likely is it that she has the cancer? When this question is put to doctors and medical students, many answer "about 90%" or "about 95%". If the cancer affects 1 in 100 women like her, the correct answer is about 15%.

This gap between intuition and arithmetic is the reason for this chapter. A test result is evidence, and evidence changes a probability that existed before the test. To interpret a test you need two things: how good the test is at telling people with and without the condition apart, and how likely the condition was in the first place. The chapter develops both, using the 2×2 table, predictive values, likelihood ratios and Bayes' theorem, and then looks at how test accuracy studies can mislead.

## The 2×2 table {#table}

Test accuracy is measured by comparing the test with a **reference standard** (sometimes called the gold standard), the best available way of deciding who really has the condition. Biopsy, angiography, culture or long-term follow-up are typical reference standards.

::: definition The 2×2 table {#def-2x2}
When a test with a positive or negative result is compared with a reference standard, each person falls into one of four cells:

| | Condition present | Condition absent |
|---|---|---|
| Test positive | $a$: true positives (TP) | $b$: false positives (FP) |
| Test negative | $c$: false negatives (FN) | $d$: true negatives (TN) |

The columns are defined by the reference standard; the rows by the test. Every accuracy measure in this chapter is a ratio of cells in this table.
:::

The **prevalence** in the study, also called the **pre-test probability**, is $(a + c)/(a + b + c + d)$: the proportion of people tested who actually have the condition.

## Sensitivity and specificity {#sens-spec}

::: definition Sensitivity and specificity {#def-sens-spec}
**Sensitivity** is the proportion of people *with* the condition who test positive:

$$
\text{sensitivity} = \frac{a}{a+c} = \frac{TP}{TP + FN}.
$$

**Specificity** is the proportion of people *without* the condition who test negative:

$$
\text{specificity} = \frac{d}{b+d} = \frac{TN}{TN + FP}.
$$

Sensitivity is read down the "condition present" column; specificity down the "condition absent" column. Neither depends on how many people in the sample have the condition, so, in principle, both are properties of the test.
:::

A highly sensitive test rarely misses the condition, so a *negative* result is reassuring. A highly specific test rarely labels healthy people as having the condition, so a *positive* result is informative. Most tests trade one against the other: making a test more sensitive by lowering its threshold for positivity usually makes it less specific.

In practice sensitivity and specificity are less fixed than the definition suggests. A test usually detects advanced disease more easily than early disease, so its sensitivity is higher in a hospital population with severe cases than in a screening population. Specificity is often lower in people with other conditions that mimic the target condition. This variation is called **spectrum effect**, and it is why accuracy figures from one setting should be transferred to another with care.

## Predictive values {#predictive}

Sensitivity and specificity answer the question "if a person has the condition, how likely is a positive test?" The patient and the clinician want the reverse: "given this positive test, how likely is the condition?"

::: definition Predictive values {#def-predictive}
The **positive predictive value** (PPV) is the proportion of people with a positive test who have the condition:

$$
PPV = \frac{a}{a+b}.
$$

The **negative predictive value** (NPV) is the proportion of people with a negative test who do not have the condition:

$$
NPV = \frac{d}{c+d}.
$$

Predictive values are read *across the rows* of the table. They depend on the prevalence of the condition in the people tested as well as on the test's sensitivity and specificity.
:::

::: example The same test in two settings {#ex-prevalence}
A test has sensitivity 90% and specificity 95%. Calculate its PPV and NPV (a) in a screening population with prevalence 1%, and (b) in a specialist clinic where 30% of referred patients have the condition.
::: solution
Use natural frequencies: imagine 10,000 people.

**(a) Prevalence 1%.** 100 have the condition: 90 test positive (TP) and 10 test negative (FN). 9,900 do not: 5% of them, 495, test positive (FP), and 9,405 test negative (TN).

$PPV = 90/(90 + 495) = 90/585 = 15.4\%$. $NPV = 9{,}405/9{,}415 = 99.9\%$.

**(b) Prevalence 30%.** 3,000 have the condition: 2,700 TP and 300 FN. 7,000 do not: 350 FP and 6,650 TN.

$PPV = 2{,}700/3{,}050 = 88.5\%$. $NPV = 6{,}650/6{,}950 = 95.7\%$.

The test is identical, but in the screening setting about 85% of positive results are false, because the few true positives are outnumbered by false positives from the very large healthy group. In the clinic, most positives are true. This is the answer to the question at the start of the chapter.
:::
:::

Natural frequencies, as in this example, are the easiest way to explain test results to patients and colleagues. Saying "out of 1,000 women like you, about 10 have the cancer; 9 of them would test positive, and about 50 of the 990 without it would also test positive" makes the result far easier to grasp than conditional probabilities.

::: widget bayes
mode: test
prevalence: 0.01
sensitivity: 0.9
specificity: 0.95
caption: Bayes' theorem as natural frequencies. Move the prevalence slider from screening levels (around 1%) to clinic levels (30% or more) and watch the positive predictive value change while sensitivity and specificity stay fixed. Then see how much specificity has to rise before a positive screening result becomes more likely true than false.
:::

## Likelihood ratios and Bayes' theorem {#lr}

Predictive values must be recalculated for every prevalence. Likelihood ratios avoid this, because they separate the contribution of the test from the contribution of the pre-test probability.

::: definition Likelihood ratios {#def-lr}
The **likelihood ratio** of a test result is the probability of that result in people with the condition divided by its probability in people without the condition.

For a positive result:

$$
LR^{+} = \frac{\text{sensitivity}}{1 - \text{specificity}}.
$$

For a negative result:

$$
LR^{-} = \frac{1 - \text{sensitivity}}{\text{specificity}}.
$$

A likelihood ratio above 1 makes the condition more likely; below 1, less likely; equal to 1, the result is useless. For tests with several result levels (for example, a blood test reported in bands), each band has its own **multilevel likelihood ratio**, the proportion of people with the condition in that band divided by the proportion of people without it in that band.
:::

To use a likelihood ratio we convert probabilities to odds. If the probability is $p$, the odds are $p/(1-p)$; and odds $o$ convert back to probability as $o/(1+o)$.

::: theorem Bayes' theorem in odds form {#thm-bayes}
For a test result with likelihood ratio $LR$,

$$
\text{post-test odds} = \text{pre-test odds} \times LR.
$$ {#eq-bayes-odds}

Tests whose results are conditionally independent given disease status can be applied in sequence by multiplying their likelihood ratios.
:::

::: proof
Let $D$ be the condition and $R$ the test result. Bayes' theorem gives

$$
P(D \mid R) = \frac{P(R \mid D)\,P(D)}{P(R)}, \qquad P(\bar D \mid R) = \frac{P(R \mid \bar D)\,P(\bar D)}{P(R)}.
$$

Dividing the first by the second cancels $P(R)$:

$$
\frac{P(D \mid R)}{P(\bar D \mid R)} = \frac{P(R \mid D)}{P(R \mid \bar D)} \times \frac{P(D)}{P(\bar D)}.
$$

The left side is the post-test odds, the first factor on the right is the likelihood ratio, and the second is the pre-test odds. For a positive result, $P(R \mid D)$ is the sensitivity and $P(R \mid \bar D)$ is $1 - $ specificity, giving $LR^+$. If a second test result $R_2$ is independent of $R_1$ within the diseased group and within the non-diseased group, then $P(R_1, R_2 \mid D) = P(R_1 \mid D)P(R_2 \mid D)$, and the same for $\bar D$, so the likelihood ratios multiply.
:::

As rough guides, likelihood ratios above 10 or below 0.1 usually cause large, often decisive, changes in probability. Ratios of 5 to 10 or 0.1 to 0.2 cause moderate changes. Ratios between 0.5 and 2 rarely change management. The **Fagan nomogram** is a chart that does the conversion graphically: a straight line from the pre-test probability through the likelihood ratio gives the post-test probability.

::: example A rule-out test {#ex-ruleout}
In this illustration, a D-dimer assay for pulmonary embolism has sensitivity 95% and specificity 40% (illustrative figures of the right order; real values depend on the assay and the population). Calculate its likelihood ratios. What is the post-test probability after a negative result in (a) a patient whose clinical pre-test probability is 15%, and (b) a patient whose pre-test probability is 50%?
::: solution
$LR^- = (1 - 0.95)/0.40 = 0.125$ and $LR^+ = 0.95/(1 - 0.40) = 1.58$.

**(a)** Pre-test odds $= 0.15/0.85 = 0.176$. Post-test odds $= 0.176 \times 0.125 = 0.022$. Post-test probability $= 0.022/1.022 = 2.2\%$. That is low enough that most clinicians would not pursue imaging.

**(b)** Pre-test odds $= 1$. Post-test odds $= 0.125$. Post-test probability $= 0.125/1.125 = 11.1\%$. That is still too high to stop investigating.

A positive result barely changes the probability ($LR^+ = 1.58$), so a positive D-dimer does not diagnose embolism. The test is useful only for ruling out, and only when the clinical probability is already low. This is why guidelines, including NICE's guidance on venous thromboembolism, use a clinical probability score such as the Wells score first and reserve D-dimer for patients whose clinical probability is low.
:::
:::

::: example Multilevel likelihood ratios {#ex-multilevel}
Serum ferritin is used to diagnose iron deficiency. Suppose, for illustration, that the likelihood ratios for iron deficiency are 50 for ferritin below 15 µg/L, 3 for 15–34 µg/L, 0.5 for 35–100 µg/L and 0.1 above 100 µg/L. An older man with anaemia has a pre-test probability of iron deficiency of 30%. What is the post-test probability if his ferritin is (a) 20 µg/L, (b) 120 µg/L?
::: solution
Pre-test odds $= 0.3/0.7 = 0.429$.

**(a)** Post-test odds $= 0.429 \times 3 = 1.29$; probability $= 1.29/2.29 = 56\%$.

**(b)** Post-test odds $= 0.429 \times 0.1 = 0.043$; probability $= 4.1\%$.

If the test had been reduced to "positive" (below 35) or "negative", a ferritin of 20 would have been treated the same as a ferritin of 5, which carries far stronger evidence. Keeping the bands preserves information. Note also that ferritin rises with inflammation, so in a patient with active inflammatory disease a "normal" ferritin is weaker evidence against iron deficiency; the likelihood ratios themselves depend on the population.
:::
:::

::: warning SnNout and SpPin are rules of thumb, not guarantees
The mnemonics say that a **S**ensitive test, when **N**egative, rules **out** (SnNout), and a **S**pecific test, when **P**ositive, rules **in** (SpPin). They are useful reminders of which way each property points. But a negative result from a test with 95% sensitivity rules out disease only if the pre-test probability is low, as [[#ex-ruleout]] showed. And a "specific" test with low sensitivity can still have a modest likelihood ratio. A test rules a diagnosis in or out only in combination with the pre-test probability, and the likelihood ratio is the honest measure of its strength.
:::

## Combining tests {#combining}

Two tests can be used in **series**, where the second is done only if the first is positive and both must be positive to diagnose; or in **parallel**, where either positive result counts.

If the two tests err independently, then:

- In series, sensitivity $= s_A \times s_B$ and specificity $= 1 - (1 - c_A)(1 - c_B)$, where $s$ is sensitivity and $c$ specificity. Series testing increases specificity and lowers sensitivity. Screening programmes often work this way: a cheap sensitive test followed by a more specific confirmatory one.
- In parallel, sensitivity $= 1 - (1 - s_A)(1 - s_B)$ and specificity $= c_A \times c_B$. Parallel testing increases sensitivity at the cost of specificity, which suits situations where missing the diagnosis is dangerous.

The independence assumption is often false. Two imaging tests that both struggle with small lesions will tend to miss the same patients, so combining them adds less than the formulas suggest.

::: example Two tests in sequence {#ex-serial}
A patient has a pre-test probability of 10% for a condition. Test A is positive ($LR^+ = 4$), and then test B is positive ($LR^+ = 6$). Assuming conditional independence, what is the post-test probability?
::: solution
Pre-test odds $= 0.1/0.9 = 0.111$. After both tests, odds $= 0.111 \times 4 \times 6 = 2.67$. Probability $= 2.67/3.67 = 72.7\%$.

Each test on its own would have given 31% (test A) or 40% (test B). Together they make the condition likely. If the tests measure overlapping features, the true combined likelihood ratio is less than 24 and this estimate is too high.
:::
:::

## ROC curves and thresholds {#roc}

Many tests give a continuous result, such as a concentration of troponin, PSA or glucose. Choosing a cut-off turns the result into "positive" or "negative", and every cut-off gives a different pair of sensitivity and specificity.

::: definition ROC curve and area under the curve {#def-roc}
A **receiver operating characteristic (ROC) curve** plots sensitivity (the true positive rate) against $1 - $ specificity (the false positive rate) for every possible threshold of a continuous test. A useless test lies on the diagonal. A perfect test passes through the top-left corner.

The **area under the curve** (AUC, also called the c-statistic) summarises discrimination across all thresholds. It equals the probability that a randomly chosen person with the condition has a more abnormal test result than a randomly chosen person without it. An AUC of 0.5 means no discrimination; 1.0 means perfect discrimination.

The **Youden index**, $J = \text{sensitivity} + \text{specificity} - 1$, is one way to pick a threshold: the point on the curve furthest above the diagonal.
:::

The slope of the ROC curve at any point equals the likelihood ratio for a result at that threshold, which links the curve back to Bayes' theorem.

::: example Choosing a threshold {#ex-threshold}
An illustrative biomarker for a serious bacterial infection in febrile children has the following accuracy at four thresholds:

| Threshold | Sensitivity | Specificity | Youden $J$ |
|---|---|---|---|
| 10 | 0.98 | 0.40 | 0.38 |
| 20 | 0.92 | 0.70 | 0.62 |
| 30 | 0.80 | 0.85 | 0.65 |
| 40 | 0.60 | 0.95 | 0.55 |

Which threshold should be used?
::: solution
The Youden index is highest at 30. But the Youden index weights a false negative and a false positive equally, and they are not equal here. Missing a serious bacterial infection in a child can be fatal; a false positive leads to further tests and perhaps a short course of antibiotics.

If the test is used to decide which children can safely go home, a low threshold of 10 or 20 makes sense, because sensitivity matters most: at 10, only 2% of infections are missed, and the negative likelihood ratio is $0.02/0.40 = 0.05$. If the test were used to select children for an invasive procedure, a higher threshold would be appropriate.

The right threshold depends on the consequences of each kind of error and on the prevalence in the population tested, not on a single statistic.
:::
:::

## When is a test worth doing? {#thresholds}

A test is useful only if it can change what happens to the patient. Pauker and Kassirer described this in 1980 with two thresholds. Below the **test threshold**, the probability of disease is so low that no plausible result would justify treatment, so the test should not be done. Above the **treatment threshold**, the probability is so high that treatment should start whatever the result. Testing is worthwhile between the two, where a result can move the probability across the line at which treatment becomes the better choice.

This explains why testing low-risk people often does harm. In a population where the condition is very rare, most positive results are false, and each one can lead to further investigations, anxiety and sometimes harmful treatment. It also explains why a test that is excellent in a specialist clinic can be unhelpful in general practice.

## How test accuracy studies go wrong {#study-bias}

Accuracy figures are only as good as the study that produced them. Common biases are:

- **Spectrum bias.** Comparing clearly diseased patients with healthy volunteers, a "diagnostic case-control" design, inflates both sensitivity and specificity. The test should be evaluated in a consecutive series of patients in whom the diagnosis is genuinely in doubt.
- **Partial verification bias.** If only patients with positive test results receive the reference standard, false negatives are rarely found, so sensitivity is overestimated and specificity underestimated.
- **Differential verification bias.** If positive and negative patients receive different reference standards (say, biopsy for positives and clinical follow-up for negatives), the reference standards may disagree with each other.
- **Incorporation bias.** If the test result is part of the reference standard, agreement is inflated.
- **Review bias.** If the person interpreting the test knows the reference standard result, or the reverse, interpretation can be influenced. Blinded interpretation prevents it.
- **Imperfect reference standard.** If the reference standard itself makes errors, a new test that is better than the reference can appear worse.

Diagnostic accuracy studies should be reported following **STARD** (Standards for Reporting of Diagnostic Accuracy Studies; the current version is STARD 2015). Systematic reviews of test accuracy assess the risk of bias in primary studies using **QUADAS-2** (2011).

Finally, accuracy is not the same as benefit. A more accurate test helps patients only if it leads to better decisions and those decisions lead to better outcomes. The strongest evidence that a test is worth using comes from randomised trials comparing testing strategies, which measure patient outcomes rather than accuracy.

::: quiz
A new rapid test for an infection has sensitivity 98% and specificity 98%. It is offered to everyone attending a festival, where the prevalence of the infection is about 0.1%. Which statement is correct?
- [ ] A positive result means the person almost certainly has the infection.
- [x] Most positive results will be false positives.
- [ ] The test's sensitivity will be much lower at the festival.
- [ ] The negative predictive value will be low.
::: solution
In 100,000 people, about 100 are infected and 98 test positive. Of the 99,900 uninfected, 2% (1,998) also test positive. The PPV is $98/(98 + 1{,}998) = 4.7\%$, so about 95% of positives are false. The NPV is very high, because almost everyone is uninfected. Sensitivity and specificity have not changed; what changed is the pre-test probability. A positive result needs confirmation with a different test.
:::
:::

::: history
The words *sensitivity* and *specificity* were introduced into medical statistics by Jacob Yerushalmy in 1947, in work on how consistently radiologists read chest films for tuberculosis. The mathematics was much older: Thomas Bayes's essay on inverse probability was published after his death, in 1763, by his friend Richard Price.

In 1959 Robert Ledley and Lee Lusted argued in *Science* that medical diagnosis could be described in terms of probability and Bayes' theorem, and ROC analysis, developed for radar signal detection, was soon applied to medical imaging. In 1975 Terrence Fagan published his nomogram for converting pre-test to post-test probability with a likelihood ratio. In 1980 Stephen Pauker and Jerome Kassirer described the test and treatment thresholds, giving clinicians a way to decide whether a test was worth doing at all. The methods were brought to the bedside in the 1980s and 1990s by the clinical epidemiologists at McMaster University, including David Sackett, whose teaching made the likelihood ratio a routine tool of evidence-based medicine.
:::

## Where this leads

Screening adds further problems of lead time, length time and overdiagnosis, discussed in [[epidemiology-ebm/bias-confounding]]. Appraising a diagnostic accuracy paper is covered in [[epidemiology-ebm/critical-appraisal]], and pooling accuracy studies in [[epidemiology-ebm/systematic-reviews]].

::: summary
- Test accuracy is measured against a reference standard in a 2×2 table of true and false positives and negatives.
- **Sensitivity** is the proportion of people with the condition who test positive; **specificity** is the proportion without it who test negative. They vary with the spectrum of disease.
- **Predictive values** answer the clinical question but depend strongly on prevalence: at low prevalence even a good test gives mostly false positives.
- **Likelihood ratios** ($LR^+ = $ sens$/(1-$spec$)$, $LR^- = (1-$sens$)/$spec) combine with pre-test odds by multiplication: post-test odds = pre-test odds × LR. Multilevel likelihood ratios keep the information in graded results.
- SnNout and SpPin are rough guides; whether a test rules in or out depends on the pre-test probability.
- Series testing raises specificity; parallel testing raises sensitivity. Independence is often assumed but not true.
- ROC curves show the trade-off across thresholds; the AUC summarises discrimination; the best threshold depends on the costs of each error.
- Accuracy studies are biased by unrepresentative spectrum, partial or differential verification, incorporation and unblinded reading. STARD guides reporting; QUADAS-2 assesses bias.
:::

## Exercises

::: exercise Sensitivity {level=1 check="90"}
A study of 1,000 patients finds 72 true positives, 8 false negatives, 45 false positives and 875 true negatives. Calculate the sensitivity as a percentage.
::: solution
Sensitivity $= 72/(72 + 8) = 72/80 = 0.90$, or 90%. (Specificity is $875/920 = 95.1\%$.)
:::
:::

::: exercise Positive predictive value {level=1 check="61.5"}
Using the same study (72 true positives, 45 false positives), calculate the positive predictive value as a percentage to 1 decimal place.
::: solution
$PPV = 72/(72 + 45) = 72/117 = 0.6154$, or 61.5%. This applies only to populations with the same prevalence as the study, here $80/1{,}000 = 8\%$.
:::
:::

::: exercise A likelihood ratio {level=1 check="18"}
A test has sensitivity 90% and specificity 95%. What is its positive likelihood ratio?
::: solution
$LR^+ = 0.90/(1 - 0.95) = 0.90/0.05 = 18$.
:::
:::

::: exercise Post-test probability {level=2 check="81.8"}
A patient's pre-test probability is 20%. A test with $LR^+ = 18$ is positive. What is the post-test probability, as a percentage to 1 decimal place?
::: solution
Pre-test odds $= 0.2/0.8 = 0.25$. Post-test odds $= 0.25 \times 18 = 4.5$. Probability $= 4.5/5.5 = 0.818$, or 81.8%.
:::
:::

::: exercise Screening at low prevalence {level=2 check="19.9"}
A screening test has sensitivity 99% and specificity 98%. The prevalence of the condition in the screened population is 0.5%. Calculate the positive predictive value as a percentage to 1 decimal place.
::: hint
Work with 100,000 people, or use $PPV = \dfrac{\text{sens} \times p}{\text{sens} \times p + (1-\text{spec})(1-p)}$.
:::
::: solution
In 100,000 people, 500 have the condition and 495 test positive. Of 99,500 without it, 2% (1,990) test positive. $PPV = 495/(495 + 1{,}990) = 495/2{,}485 = 0.199$, or 19.9%. Four out of five positive results are false, despite the excellent test.
:::
:::

::: exercise Tests in parallel {level=2 check="94"}
Two independent tests have sensitivities of 80% and 70% and specificities of 90% and 95%. They are used in parallel, so a patient is called positive if either test is positive. What is the combined sensitivity, as a percentage? What is the combined specificity?
::: solution
Combined sensitivity $= 1 - (1 - 0.8)(1 - 0.7) = 1 - 0.2 \times 0.3 = 0.94$, or 94%. Combined specificity $= 0.90 \times 0.95 = 0.855$, or 85.5%. Parallel testing catches more cases at the cost of more false positives.
:::
:::

::: exercise When a negative test is not enough {level=2 check="13.0"}
A patient with classic symptoms has a pre-test probability of 60% for a condition. A test with $LR^- = 0.1$ is negative. What is the post-test probability, as a percentage to 1 decimal place? Should the condition be considered excluded?
::: solution
Pre-test odds $= 0.6/0.4 = 1.5$. Post-test odds $= 1.5 \times 0.1 = 0.15$. Probability $= 0.15/1.15 = 0.130$, or 13.0%. A one-in-eight chance of a serious condition is not an exclusion. When clinical suspicion is high, a negative result from a good test lowers the probability but often not far enough, and further investigation is needed.
:::
:::

::: exercise Partial verification {level=3 check="97.6"}
A new test is evaluated in 1,000 patients, of whom 100 truly have the condition. The test's true sensitivity is 80% and true specificity 90%. All patients who test positive receive the reference standard, but only a random 10% of those who test negative do. If the investigators calculate sensitivity using only the verified patients, what value will they report, as a percentage to 1 decimal place?
::: hint
First fill in the full 2×2 table. Then keep all positives and 10% of negatives.
:::
::: solution
Full table: 80 TP, 20 FN, 90 FP, 810 TN. All 170 positives are verified. Of the 830 negatives, 10% are verified: 2 FN and 81 TN.

Reported sensitivity $= 80/(80 + 2) = 0.976$, or 97.6%, instead of the true 80%. Reported specificity $= 81/(81 + 90) = 47.4\%$, instead of 90%. Partial verification inflates sensitivity and deflates specificity. The correction is to verify a random sample of negatives and weight them back up, or better, to apply the reference standard to everyone.
:::
:::

::: exercise A new test in a new setting {level=3}
A company reports that its blood test for colorectal cancer has sensitivity 95% and specificity 97%, based on 200 patients with known advanced cancer and 200 healthy blood donors. A general practitioner asks whether to use it in patients with vague abdominal symptoms. Advise them.
::: solution
The study used a **diagnostic case-control** design: people with obvious, advanced disease against healthy volunteers. This maximises the apparent accuracy. Advanced cancers are easier to detect than early ones, so sensitivity in symptomatic primary care patients, many of whom would have earlier cancers, is likely to be lower. Healthy donors lack the conditions that cause false positives, such as inflammatory bowel disease or other cancers, so specificity in real patients is likely to be lower too.

Even taking the figures at face value, the prevalence of colorectal cancer among patients with vague symptoms in primary care is low, perhaps a few per cent. At 2% prevalence, PPV $= 0.95 \times 0.02/(0.95 \times 0.02 + 0.03 \times 0.98) = 39\%$, so most positives would still be false.

Before adoption, the test should be evaluated in a consecutive series of symptomatic primary care patients, with everyone receiving an appropriate reference standard (colonoscopy, or follow-up for those not investigated), interpreted blind, and reported to STARD. It should then be compared with existing approaches, such as faecal immunochemical testing, which NICE recommends to guide referral for suspected colorectal cancer in primary care. Ideally, its effect on patient outcomes should be studied, not just its accuracy.
:::
:::
