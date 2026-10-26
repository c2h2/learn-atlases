In the 1980s many patients who survived a heart attack had frequent ventricular ectopic beats on their ECG, and these patients were known to have a higher risk of sudden death. Drugs such as flecainide and encainide suppressed the ectopic beats very effectively. It seemed obvious that they would save lives. The Cardiac Arrhythmia Suppression Trial (CAST) tested this by randomly assigning patients to the drugs or to placebo. In 1989 it was stopped early: patients given the active drugs were dying at a higher rate than those given placebo.

CAST shows why the randomised controlled trial sits at the centre of evidence about treatment. Reasonable mechanisms, good observational data and expert confidence can all point the wrong way. This chapter explains how randomisation works, how trials are designed and analysed, and what to look for when reading one.

## Why randomise? {#why}

Observational comparisons of treatments suffer from **confounding by indication**: patients receive treatments for reasons that also affect their prognosis ([[epidemiology-ebm/bias-confounding]]). Adjustment can deal only with the confounders that were measured. Randomisation deals with all of them at once.

::: theorem What randomisation achieves {#thm-randomisation}
If participants are allocated to treatment groups by a random process that nobody can predict or influence, then:

1. every characteristic of the participants, measured or unmeasured, known or unknown, has the same distribution in each group in expectation, so the groups differ systematically only in the treatment they are assigned;
2. any remaining imbalance is due to chance, and its likely size is quantified by standard statistical methods, which therefore give valid confidence intervals and p-values for the treatment effect.
:::

::: proof
Suppose a characteristic $X$ (age, disease severity, a genetic variant nobody has discovered) takes any distribution in the trial population. If allocation is random, the probability of being assigned to treatment is the same for every participant, whatever their value of $X$. Allocation is therefore statistically independent of $X$, and the expected distribution of $X$ is identical in both groups. Because this holds for every characteristic simultaneously, it holds for every cause of the outcome other than treatment.

In any single trial the groups will differ somewhat by chance, more so in small trials. But because the allocation process is known, the probability of differences of any given size can be calculated, and this is what a p-value or confidence interval describes. In an observational study the process that determined treatment is unknown, so no such calculation can account for bias.
:::

Randomisation protects the comparison only at the moment of allocation. After that, the groups can be made unequal again by differences in care, in measurement or in who is analysed. The rest of trial design is about preserving the balance that randomisation creates.

## Framing the trial {#framing}

::: definition Elements of a randomised controlled trial {#def-rct}
A **randomised controlled trial** (RCT) allocates participants at random to two or more interventions and compares outcomes. Its question is usually written in **PICO** form:

- **Population**: who is eligible (inclusion and exclusion criteria);
- **Intervention**: the treatment being tested;
- **Comparator**: placebo, usual care, or an active alternative;
- **Outcomes**: what is measured, when, and how.

The **primary outcome** is the single outcome on which the main conclusion and the sample size are based. **Secondary outcomes** are supporting. A **surrogate outcome** is a laboratory measure or physical sign used in place of an outcome that matters to patients, such as cholesterol in place of heart attacks. A **composite outcome** combines several events, such as "cardiovascular death, myocardial infarction or stroke".
:::

The choice of outcome determines what a trial can show. Surrogates allow small, fast trials, but they are trustworthy only when changing the surrogate by that treatment reliably changes the clinical outcome. CAST is the classic warning: suppressing ectopic beats, a surrogate, was associated with *more* deaths. Composite outcomes increase the number of events and so the power, but they can mislead when the components differ in importance and the treatment effect is driven by the least serious one.

The comparator matters as much. Placebo control is appropriate when no effective treatment exists. When one does, the Declaration of Helsinki (most recently revised in 2024) requires that new treatments be tested against the best proven intervention, except in limited circumstances. The trial must also start from **equipoise**: genuine uncertainty in the expert community about which treatment is better.

## Allocation and blinding {#allocation}

::: definition Sequence generation and allocation concealment {#def-concealment}
The **allocation sequence** is the list that determines which treatment each participant receives. It should be generated by a truly random method, such as computer-generated random numbers. Variants include:

- **simple randomisation**, like tossing a coin for each participant;
- **block randomisation**, which keeps group sizes balanced at intervals (for example, every block of 4 contains two of each treatment);
- **stratified randomisation**, which randomises separately within important prognostic groups, such as centre or disease stage;
- **minimisation**, which assigns each new participant to the arm that best balances selected prognostic factors, with a random element.

**Allocation concealment** means that the person enrolling a participant cannot know or predict the next assignment until the participant has been irreversibly entered into the trial. The usual method is central randomisation by telephone or a web system.
:::

Concealment is different from blinding, and in some ways more important. If a recruiting clinician can see that the next envelope is "surgery", they may delay enrolling a frail patient until the next allocation is "medical". Without anyone intending to cheat, the groups become unequal. Studies comparing trials with adequate and inadequate concealment have found that poorly concealed trials tend to report larger treatment effects. Alternation, allocation by date of birth or by hospital number, and envelopes that can be held up to the light are all inadequate.

::: definition Blinding {#def-blinding}
**Blinding** (or masking) means that one or more groups of people involved in a trial do not know which treatment each participant received. The groups that can be blinded are participants, the clinicians caring for them, the people assessing outcomes, and the people analysing data.

Labels such as "single-blind" and "double-blind" are used inconsistently. A trial report should say exactly who was blinded and how.
:::

Blinding prevents differences in care, in reporting of symptoms and in the assessment of outcomes. Its importance depends on the outcome. Death is hard to misjudge. Pain, function and the decision to admit a patient to hospital are much more open to influence. When blinding of participants is impossible, as in most surgical or physiotherapy trials, blinding the outcome assessors is still usually feasible and valuable.

::: example A trial with leaky allocation {#ex-concealment}
In a fictional trial of early surgery versus conservative care for a hip fracture, the surgeon at one centre is given a stack of sealed envelopes and opens the next one when a patient consents. After the trial, it is found that patients randomised to surgery at that centre were younger and fitter than those randomised to conservative care, while groups at other centres were similar. What probably happened, and how should this have been prevented?
::: solution
The envelopes were opened by the person enrolling patients, and they were probably not opaque or not strictly sequential. If the surgeon could see or guess the next allocation, they could, perhaps unconsciously, enrol a fit patient when the next envelope was "surgery" and wait when it was "conservative". The allocation sequence may have been random, but **allocation concealment** failed, so the groups were selected rather than randomised.

Prevention: central, web-based or telephone randomisation, performed only after the patient's eligibility and consent are recorded. If envelopes must be used, they should be sequentially numbered, opaque, sealed, and opened only after the patient's details are written on them, with an audit of the order. The analysis should report baseline characteristics by centre, and the trial's results should be interpreted with caution.
:::
:::

## Trial designs {#designs}

- **Parallel group**: each participant receives one intervention for the whole trial. This is the default design.
- **Crossover**: each participant receives both treatments in random order, separated by a washout period. Each person acts as their own control, so fewer participants are needed. It suits stable chronic conditions with treatments whose effects wear off, such as some treatments for migraine prophylaxis or chronic pain, and it fails when the treatment cures the condition or has lasting effects (**carry-over**).
- **Factorial**: two or more interventions are tested at once by randomising each participant to each intervention. A 2×2 factorial design (A or not, B or not) answers two questions for nearly the price of one, provided the treatments do not interact. ISIS-2, discussed below, randomised patients to streptokinase, aspirin, both or neither.
- **Cluster**: groups such as general practices, wards or villages are randomised rather than individuals. This suits interventions delivered to groups and avoids contamination between arms, but outcomes within a cluster are correlated. The sample size must be multiplied by the **design effect**, $1 + (m-1)\rho$, where $m$ is the average cluster size and $\rho$ the intracluster correlation coefficient.
- **Explanatory and pragmatic trials**: an explanatory trial asks whether a treatment can work under ideal conditions, with selected patients and strict protocols. A pragmatic trial asks whether it works in routine practice, with broad eligibility and usual care. Most trials lie between these poles.
- **Adaptive and platform trials** allow prespecified changes as data accumulate, such as dropping an ineffective arm. A **platform trial** tests several treatments against a shared control and adds new ones over time. The UK RECOVERY trial, set up in 2020, used this design to test treatments for people admitted to hospital with COVID-19. Within months it showed that dexamethasone reduced 28-day mortality in patients receiving oxygen or mechanical ventilation, and that several other widely used treatments did not help.

### Superiority and non-inferiority {#non-inferiority}

Most trials ask whether a new treatment is better than the comparator: a **superiority** trial. Sometimes a new treatment is cheaper, safer or easier, and the question is only whether it is not unacceptably worse.

::: definition Non-inferiority trial {#def-noninferiority}
A **non-inferiority trial** tests whether a new treatment is not worse than an active comparator by more than a prespecified **non-inferiority margin**, $\Delta$. The margin is chosen before the trial, on clinical and statistical grounds, to be smaller than the effect the comparator is known to have over placebo.

Non-inferiority is shown if the whole confidence interval for the difference (new minus standard, for a harmful outcome) lies below $+\Delta$.
:::

Non-inferiority trials have particular weaknesses. Poor conduct, such as many participants not taking their allocated treatment, makes the two arms look alike and so favours a finding of non-inferiority. For this reason the per-protocol analysis is given at least as much weight as the intention-to-treat analysis. And a series of non-inferiority trials, each accepting a slightly worse treatment, can drift towards a treatment that is no better than placebo, a problem called **biocreep**.

::: example Reading a non-inferiority result {#ex-ni}
A fictional trial compares a new oral anticoagulant with warfarin for stroke prevention in atrial fibrillation. The prespecified margin is an absolute increase of 2 percentage points in stroke over 2 years. Interpret three possible results for the risk difference (new minus warfarin): (a) 0.5 percentage points, 95% CI −0.5 to 1.5; (b) 0.3, 95% CI −0.3 to 2.6; (c) −1.2, 95% CI −2.2 to −0.2.
::: solution
**(a)** The upper limit of 1.5 is below the margin of 2, so non-inferiority is shown. The interval includes 0, so superiority is not shown.

**(b)** The upper limit of 2.6 exceeds the margin, so non-inferiority is **not** shown. The trial is inconclusive: the new drug could be up to 2.6 points worse, which is more than was judged acceptable. It does not show that the drug is inferior.

**(c)** The whole interval lies below 0. Non-inferiority is shown, and the new drug is also superior. Testing for superiority after non-inferiority has been shown is acceptable if it was prespecified, because the confidence interval is the same.

In each case, check that the margin was set in advance and justified, and that the per-protocol analysis agrees.
:::
:::

## How many participants? {#sample-size}

::: definition Power and sample size {#def-power}
A trial can make two kinds of error. A **type I error** is concluding that there is a difference when there is none; its probability is the significance level $\alpha$, usually 0.05. A **type II error** is failing to detect a real difference; its probability is $\beta$. **Power**, $1 - \beta$, is the probability that the trial detects a true difference of a specified size. Trials are usually designed with power of 80% or 90%.

For comparing two proportions $p_1$ and $p_2$, the approximate number needed in each group is

$$
n = \frac{(z_{1-\alpha/2} + z_{1-\beta})^2 \,[\,p_1(1-p_1) + p_2(1-p_2)\,]}{(p_1 - p_2)^2},
$$ {#eq-samplesize}

where $z_{1-\alpha/2} = 1.96$ for a two-sided $\alpha$ of 0.05, and $z_{1-\beta} = 0.84$ for 80% power or $1.28$ for 90% power.
:::

The formula shows the main drivers. The sample size depends on the square of the difference to be detected: halving the target difference roughly quadruples the sample size. It is larger when outcomes are rare relative to the difference sought. It rises with the power and stringency demanded.

The target difference should be the smallest difference that would matter clinically, or a realistic estimate of the effect. Choosing an optimistic large effect to make a trial affordable is common, and it produces underpowered trials that end with "no significant difference" when a smaller but worthwhile effect may well exist.

::: example A sample size calculation {#ex-samplesize}
A fictional trial will test whether a new rehabilitation programme reduces 1-year readmission after a stroke from 10% to 7%. How many participants are needed in each arm for 80% power at a two-sided significance level of 0.05?
::: solution
$p_1 = 0.10$, $p_2 = 0.07$, $(1.96 + 0.84)^2 = 7.84$.

$p_1(1-p_1) + p_2(1-p_2) = 0.09 + 0.0651 = 0.1551$.

$(p_1 - p_2)^2 = 0.0009$.

$n = 7.84 \times 0.1551/0.0009 = 1{,}351.1$, rounded **up** to 1,352 per arm, or 2,704 in total. Allowing for 10% loss to follow-up, about 1,503 per arm should be recruited ($1{,}352/0.9$, rounded up).

Detecting a three-point absolute reduction needs a large trial. If the programme is expected to be delivered to groups, a cluster design would increase the number further by the design effect.
:::
:::

::: widget hypothesis
test: z
tail: two
alpha: 0.05
effect: 0.3
n: 50
caption: The null and alternative distributions of a test statistic. The effect is in standard deviation units. Increase the sample size $n$ and watch the power rise; reduce the effect and see how quickly a trial becomes underpowered. A simplified model of a trial with a continuous outcome.
:::

## Analysis {#analysis}

::: definition Intention to treat and per protocol {#def-itt}
In an **intention-to-treat** (ITT) analysis, every participant is analysed in the group to which they were randomised, whatever treatment they actually received and whether or not they completed it.

In a **per-protocol** analysis, only participants who received the allocated treatment as specified are included. In an **as-treated** analysis, participants are grouped by the treatment they actually received.
:::

ITT preserves the balance created by randomisation, so it is the primary analysis for superiority trials. It estimates the effect of *offering* a treatment in practice, including the effect of people stopping or switching. Per-protocol and as-treated analyses break randomisation, because the people who adhere or switch are not a random subset.

::: example Crossing over {#ex-itt}
In a fictional trial, 1,000 patients with a vascular condition are randomised to surgery or medical treatment, 500 in each arm. In the surgery arm, 50 patients become too unwell for surgery and receive medical treatment; 15 of them die. Of the 450 who have surgery, 36 die. In the medical arm, 30 patients later have surgery anyway, and 3 of them die; of the 470 who stay on medical treatment, 47 die. Compare the ITT, per-protocol and as-treated results.
::: solution
**ITT**: surgery arm $51/500 = 10.2\%$; medical arm $50/500 = 10.0\%$. No difference.

**Per protocol** (excluding crossovers): surgery $36/450 = 8.0\%$; medical $47/470 = 10.0\%$.

**As treated**: received surgery $(36 + 3)/480 = 8.1\%$; received medical treatment $(15 + 47)/520 = 11.9\%$.

The per-protocol and as-treated analyses make surgery look beneficial. But the patients who were too unwell for surgery had a death rate of 30%, and they were moved out of the surgery group. Surgery looks good partly because the sickest patients were not operated on. The ITT analysis, which keeps the randomised groups intact, shows no advantage for a policy of offering surgery.
:::
:::

**Missing data** threaten every trial. If participants who drop out differ in prognosis between arms, the comparison is biased. Methods such as multiple imputation can help when the reasons for missingness are understood, and sensitivity analyses should test how much conclusions depend on assumptions about the missing outcomes. The best protection is keeping losses small.

**Subgroup analyses** ask whether the effect differs between groups of patients. They are often misleading. With many subgroups, some will show apparently different effects by chance. ISIS-2, a large trial published in 1988, showed that aspirin reduced deaths after myocardial infarction. To make the point, the investigators analysed patients by astrological star sign: for those born under Gemini or Libra, aspirin appeared to have no benefit. Credible subgroup effects are few, prespecified with a predicted direction, supported by a formal test of interaction, biologically plausible, and replicated.

**Stopping early** for benefit is sometimes right, but trials stopped early, especially with few events, tend to overestimate the treatment effect, because they stop at a random high. Interim analyses should be planned in advance with strict stopping rules and overseen by an independent data monitoring committee.

::: warning A "non-significant" trial has not shown "no effect"
A trial that finds no statistically significant difference has not shown that the treatments are equivalent. If the confidence interval for the difference is wide, it is compatible with both a worthwhile benefit and harm, and the trial was simply too small. Before concluding "no effect", look at the confidence interval: does it exclude a difference that would matter to patients? Only then is "no important difference" a fair conclusion. Showing equivalence or non-inferiority requires a trial designed for it.
:::

## Registration and reporting {#reporting}

Trials that find no effect are less likely to be published, and outcomes that look unfavourable are sometimes left out of reports. Both distort the evidence. Two safeguards have become standard.

**Registration.** In 2004 the International Committee of Medical Journal Editors announced that its member journals would consider a trial for publication only if it had been registered in a public registry before the first participant was enrolled; the policy applied to trials starting recruitment on or after 1 July 2005. Registries such as ClinicalTrials.gov and the ISRCTN registry record the primary outcome in advance, so that readers can check whether the published outcome is the one that was planned.

**Protocols and reporting guidelines.** The **SPIRIT** statement (2013, updated in 2025) lists what a trial protocol should contain. The **CONSORT** statement, first published in 1996 and updated in 2001, 2010 and 2025, lists what a trial report should contain: CONSORT 2025 has a 30-item checklist and a participant flow diagram, and adds a section on open science such as data sharing and access to the protocol. The flow diagram shows how many people were screened, randomised, allocated, followed up and analysed in each arm, and it is the first thing to look at when reading a trial.

::: quiz
A trial randomises 400 patients to a new drug or placebo. Twenty per cent of the drug group stop taking it because of side effects. The authors report a per-protocol analysis showing a significant benefit, and an intention-to-treat analysis showing a smaller benefit that is not statistically significant. Which statement is most accurate?
- [ ] The per-protocol result is more valid because it reflects patients who actually took the drug.
- [x] The intention-to-treat result is the primary unbiased comparison; the per-protocol result may be biased because people who tolerate the drug differ from those who do not.
- [ ] Both results are equally valid; the truth lies between them.
- [ ] The trial proves the drug is ineffective.
::: solution
Only the intention-to-treat comparison keeps the groups formed by randomisation. People who stop a drug because of side effects may differ in health and prognosis from those who continue, so excluding them creates a non-random comparison. The ITT estimate of a modest benefit with a wide interval is the fair summary: the drug may help, but this trial has not shown it convincingly. It certainly has not shown the drug is ineffective.
:::
:::

::: history
In 1747, James Lind, a naval surgeon aboard HMS *Salisbury*, took twelve sailors with scurvy and gave pairs of them different remedies, including cider, vinegar, sea water and oranges and lemons. The two given citrus fruit recovered rapidly. Lind's was a controlled comparison, but not a randomised one.

Randomisation came from agricultural science: Ronald Fisher argued in the 1920s and in *The Design of Experiments* (1935) that random allocation was what made a statistical test valid. Austin Bradford Hill brought the idea into medicine. The Medical Research Council's trial of streptomycin for pulmonary tuberculosis, published in the *British Medical Journal* in 1948, allocated patients using random sampling numbers, with assignments held in sealed envelopes at a central office, and compared them with patients on bed rest alone. Streptomycin was in short supply, which made it ethically acceptable to allocate it by chance.

The trial is usually described as the first properly randomised clinical trial. Its methods, including concealed central allocation and assessment of chest radiographs by readers who did not know the treatment, set the template for modern trials.
:::

## Where this leads

The statistics needed to read trial results, including confidence intervals, p-values, the number needed to treat and hazard ratios, are in [[epidemiology-ebm/statistics-for-clinicians]]. Combining trials is the subject of [[epidemiology-ebm/systematic-reviews]], and appraising a single trial for a clinical decision is covered in [[epidemiology-ebm/critical-appraisal]].

::: summary
- Randomisation balances known and unknown prognostic factors in expectation and gives statistical tests their meaning. It removes confounding by indication.
- Trials are framed by PICO. Primary outcomes should matter to patients; surrogate and composite outcomes need care, as CAST showed.
- **Allocation concealment** protects randomisation at enrolment; **blinding** protects the groups afterwards. Report who was blinded rather than "double-blind".
- Designs include parallel, crossover, factorial, cluster (multiply sample size by $1 + (m-1)\rho$), pragmatic, adaptive and platform trials.
- **Non-inferiority** is shown when the whole confidence interval lies within a prespecified margin.
- Sample size depends on the square of the target difference, the baseline risk, $\alpha$ and power. Underpowered trials yield inconclusive results.
- **Intention to treat** is the primary analysis for superiority trials; per-protocol and as-treated analyses break randomisation.
- Be sceptical of subgroup claims and of trials stopped early for benefit. A non-significant result is not proof of no effect.
- Trials should be registered before enrolment (ICMJE policy since 2005), follow a SPIRIT protocol and be reported to CONSORT 2025.
:::

## Exercises

::: exercise Concealment or blinding? {level=1}
Explain the difference between allocation concealment and blinding, and say why concealment is possible in every trial while blinding is not.
::: solution
Allocation concealment hides the *next* assignment from those enrolling participants, until the participant is entered. It protects the randomisation process from selection bias. Blinding hides the assignment *after* allocation from participants, clinicians, outcome assessors or analysts, protecting against differences in care and in measurement. Concealment is always possible because it only requires that the sequence be held centrally or securely. Blinding is impossible when the treatments are obviously different, such as surgery versus tablets, although outcome assessors can usually still be blinded.
:::
:::

::: exercise An ITT risk difference {level=1 check="4.5"}
In a fictional trial, 30 of 400 participants randomised to a new treatment and 48 of 400 randomised to standard care have a stroke. Calculate the absolute risk reduction in percentage points, by intention to treat.
::: solution
Risks are $30/400 = 7.5\%$ and $48/400 = 12.0\%$. The absolute risk reduction is $12.0 - 7.5 = 4.5$ percentage points.
:::
:::

::: exercise Design effect {level=1 check="1.95"}
A cluster trial randomises general practices, with an average of 20 participants per practice and an intracluster correlation coefficient of 0.05. What is the design effect?
::: solution
Design effect $= 1 + (m - 1)\rho = 1 + 19 \times 0.05 = 1.95$. The trial needs nearly twice as many participants as an individually randomised trial with the same power.
:::
:::

::: exercise Sample size {level=2 check="196"}
A trial aims to detect a reduction in an outcome from 20% to 10%, with a two-sided $\alpha$ of 0.05 and 80% power. Using $z$ values of 1.96 and 0.84 and the formula in [[#def-power]], how many participants are needed in each arm?
::: solution
$n = (1.96 + 0.84)^2 \times [0.2 \times 0.8 + 0.1 \times 0.9]/(0.2 - 0.1)^2 = 7.84 \times 0.25/0.01 = 196$ per arm.
:::
:::

::: exercise A smaller target {level=2 check="902"}
The same investigators decide that a reduction from 20% to 15% would also be worthwhile. Using the same $z$ values, how many participants are needed per arm? Round up to a whole number.
::: solution
$n = 7.84 \times [0.2 \times 0.8 + 0.15 \times 0.85]/(0.05)^2 = 7.84 \times 0.2875/0.0025 = 901.6$, rounded up to 902 per arm. Halving the target difference has increased the sample size more than fourfold, because the variance term also rose slightly.
:::
:::

::: exercise Choose the design {level=2}
Suggest a design for each question. (a) Does a nurse-led education programme in general practices reduce emergency admissions for asthma? (b) Does a new inhaler reduce symptoms more than the current inhaler in stable asthma? (c) Do vitamin D supplements and omega-3 fatty acids each prevent cancer?
::: solution
(a) A **cluster randomised trial**, randomising practices, because the programme is delivered to whole practices and individual randomisation would lead to contamination. The sample size must allow for the design effect. (b) A **crossover trial** could work, because stable asthma returns to baseline after a washout and each patient can act as their own control; a parallel trial is the alternative if carry-over is a concern. (c) A **2×2 factorial trial**, randomising each participant to vitamin D or placebo and to omega-3 or placebo, answering both questions in one trial, provided the two do not interact.
:::
:::

::: exercise Interpret a subgroup claim {level=3}
A large fictional trial of a blood pressure drug shows an overall 15% relative reduction in strokes. The authors report 24 subgroup analyses; in one, women under 60, the drug appears to have no effect (risk ratio 1.02, 95% CI 0.80 to 1.30). A press release states that "the drug does not work in younger women". Evaluate this claim.
::: solution
The claim is weak. With 24 subgroups, at least one is expected to differ by chance even if the true effect is the same in all. The subgroup result has a wide confidence interval that includes the overall effect of 0.85, so it is compatible with the drug working just as well in younger women. The relevant question is whether the effect in this subgroup differs from the effect in others, which requires a test of interaction, not a separate test within the subgroup. The analysis was probably not prespecified with a predicted direction, and there is no obvious biological reason for the difference. Younger women also have few strokes, so the subgroup has low power. The best estimate for younger women remains the overall effect, until a prespecified analysis or another trial shows otherwise.
:::
:::

::: exercise Design a surgical trial {level=3}
Surgeons wish to compare arthroscopic surgery with physiotherapy for persistent knee pain from a degenerative meniscal tear. Outline the key design features of a trial, explaining how you would deal with the difficulties of blinding and crossover.
::: solution
- **Question and population**: adults with persistent knee pain and a degenerative meniscal tear on imaging, after a period of initial conservative care, without locking or advanced osteoarthritis.
- **Comparator**: a structured physiotherapy programme. A placebo (sham) surgery arm, in which an arthroscopy is performed without the therapeutic procedure, would allow blinding of participants and assessors and has been used in trials of this question; it raises ethical issues that must be justified by genuine uncertainty and informed consent.
- **Randomisation**: computer-generated, central, concealed, stratified by centre and perhaps by age.
- **Blinding**: if no sham arm, participants and surgeons cannot be blinded, so use patient-reported outcomes that are validated and ask outcome assessors and analysts to be blinded. Acknowledge the risk of expectation bias.
- **Primary outcome**: a validated knee pain and function score at 12 or 24 months, with a prespecified minimal clinically important difference used to set the sample size.
- **Crossover**: some physiotherapy patients will ask for surgery. Record it, do not prevent it if clinically justified, and analyse by intention to treat as primary, with per-protocol analysis as secondary. Report crossover rates clearly.
- **Registration and reporting**: register before enrolment, publish the protocol following SPIRIT, report to CONSORT including the extension for non-pharmacological treatments, and report harms in both arms.
:::
:::
