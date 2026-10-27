In 1995 a 10-year-old girl, known in the courts as Child B, relapsed with acute myeloid leukaemia after a bone marrow transplant. Her doctors advised that further intensive treatment had a small chance of success and would cause considerable suffering. Her father found specialists willing to try a second transplant, but the health authority refused to pay for it, about £75,000 in total. The Court of Appeal declined to overturn the decision. "Difficult and agonising judgments have to be made", said the Master of the Rolls, Sir Thomas Bingham, "as to how a limited budget is best allocated to the maximum advantage of the maximum number of patients."

Every health system has less money, staff and equipment than it could use. Spending more on one patient or one service means spending less on others: this is **opportunity cost**. The question is not whether resources are rationed, but how, by whom, and on what principles. This chapter covers theories of distributive justice, the measurement of health benefit and cost-effectiveness, how NICE and NHS bodies make decisions, fair procedures and their legal tests, bedside rationing and triage, and justice in public health and health inequalities.

## Levels of allocation {#scarcity}

Resources are allocated at three levels.

- **Macro:** governments decide how much to spend on health compared with education, housing or defence, and how to divide the health budget between services.
- **Meso:** bodies such as NICE (the National Institute for Health and Care Excellence) and integrated care boards (ICBs) in England decide which treatments and services to fund for a population.
- **Micro:** clinicians decide how to use their time, beds, operating lists and tests for the patients in front of them.

Decisions at each level affect the others. A clinician who orders unnecessary scans uses capacity that another patient needs. A national decision not to fund a drug means that individual doctors cannot prescribe it on the NHS.

## Theories of distributive justice {#theories}

The principle of justice says that people should be treated fairly. Aristotle stated its formal core: equals should be treated equally, and unequals unequally, in proportion to the relevant differences. The hard part is deciding which differences are relevant.

::: theorem The formal principle of justice {#thm-formal-justice}
Equals should be treated equally and unequals unequally, in proportion to morally relevant differences. Any allocation must therefore state (1) the **criterion** by which people are distinguished, and (2) why that criterion is **morally relevant** to the good being distributed.
:::

::: proof
The formal principle follows from the idea of treating people as moral equals. If two patients are alike in every respect relevant to a treatment, then giving it to one and not the other can only be explained by an irrelevant factor, such as wealth, status or the clinician's preference, which is arbitrary. Conversely, treating different needs identically (giving everyone the same dose, or the same amount of nursing time) would fail people with greater needs.

The principle does not say which criteria are relevant; that is the job of substantive theories of justice. But it provides a test for any proposal: name the criterion and justify it. "Clinical need" and "capacity to benefit" pass easily for medical care. "Ability to pay" or "social worth" fail for publicly funded health care in the UK. Age, lifestyle and dependants are contested, and the debate about them is a debate about relevance.
:::

::: definition Theories of distributive justice in health {#def-theories}
- **Utilitarian:** allocate resources to produce the greatest total health benefit (for example, the most QALYs) from the budget.
- **Egalitarian:** aim for equality, of access to care, or of health outcomes.
- **Prioritarian:** give extra weight to benefits for people who are worse off, such as the most severely ill or the most disadvantaged.
- **Rawlsian:** John Rawls (*A Theory of Justice*, 1971) argued that fair principles are those people would choose behind a "veil of ignorance", without knowing their own position. Norman Daniels applied this to health: because health protects people's **fair equality of opportunity**, health care has special moral importance.
- **Libertarian:** people are entitled to what they acquire justly; compulsory redistribution through taxation is limited, and health care is a market good.
- **Need-based:** resources should go to those with the greatest clinical need, often combined with capacity to benefit.
:::

Two further ideas often appear in debates. The **fair innings** argument (Alan Williams, 1997) holds that everyone is entitled to a "normal" span of healthy life, so that people who have not yet had it have a stronger claim than those who have. The **rule of rescue** is the strong impulse to save an identifiable person in immediate danger, whatever the cost, which can conflict with policies that would save more statistical lives.

## Measuring benefit: QALYs and cost-effectiveness {#qaly}

To compare treatments for very different conditions, health economists need a common measure of benefit. The most widely used is the quality-adjusted life year.

::: definition QALYs and cost-effectiveness {#def-qaly}
A **quality-adjusted life year** (QALY) combines length and quality of life. One year in full health is 1 QALY. A year in a health state valued at 0.6 (on a scale where 0 is as bad as being dead and 1 is full health) is 0.6 QALYs. Health state values in England are usually derived from the EQ-5D questionnaire and population surveys of preferences.

The **incremental cost-effectiveness ratio** (ICER) compares a new treatment with the current one:

$$\text{ICER} = \frac{C_{\text{new}} - C_{\text{old}}}{E_{\text{new}} - E_{\text{old}}},$$

where $C$ is cost and $E$ is effect in QALYs. It gives the extra cost of each extra QALY gained.
:::

NICE uses ICERs in its technology appraisals. Treatments are compared with a **threshold**, which represents an estimate of the health that would be lost elsewhere in the NHS if the money were spent on the new treatment. In spring 2026 NICE raised its standard threshold from £20,000–£30,000 per QALY gained to **£25,000–£35,000 per QALY**, following a government decision. Below the lower end, a treatment is normally recommended if the evidence is sound; above it, NICE needs increasingly strong reasons, such as uncertainty about the estimates being favourable, innovation not captured in the QALY, or the severity of the condition. Since 2022, a **severity modifier** gives QALYs extra weight (1.2 or 1.7) for conditions that cause a large loss of expected future health. Very rare conditions are assessed under the Highly Specialised Technologies programme, with a much higher threshold. When NICE recommends a technology in a technology appraisal, NHS commissioners in England must normally fund it within three months.

::: widget plot
f: L*x
x: 0, 2
y: 0, 80
sliders: L=30:20:60:1
points: 0.5, 10; 1.6, 40; 0.4, 30; 1.2, 70
labels: \text{threshold line (cost per QALY} = L\text{ thousand)}
caption: A simplified cost-effectiveness plane. The horizontal axis is the extra QALYs gained per patient by a new treatment; the vertical axis is its extra cost per patient in thousands of pounds. Each point is a hypothetical treatment. Points below the line cost less than £$L$ thousand per QALY gained and would count as cost-effective at that threshold. Move the threshold $L$ to see which treatments change category. Illustrative numbers only.
:::

::: example Calculating an ICER {#ex-icer}
A new treatment for a type of lung cancer costs £48,000 per patient, compared with £12,000 for the current treatment. Patients on the new treatment live on average 1.5 years with a quality of life valued at 0.7. On the current treatment they live 0.8 years at 0.6. Calculate the ICER and interpret it against NICE's threshold.
::: solution
**QALYs:** new: $1.5 \times 0.7 = 1.05$; current: $0.8 \times 0.6 = 0.48$. Gain $= 1.05 - 0.48 = 0.57$ QALYs.

**Cost difference:** $48{,}000 - 12{,}000 = £36{,}000$.

**ICER:** $36{,}000 / 0.57 \approx £63{,}200$ per QALY gained.

**Interpretation:** this is well above £25,000–£35,000. At that price, NICE would be unlikely to recommend it unless a severity weighting or other factors applied. If the severity modifier of 1.7 applied, the weighted gain would be $0.57 \times 1.7 \approx 0.97$ QALYs and the ICER about £37,200, close to the upper end. In practice, the manufacturer might offer a confidential discount to bring the ICER into range. (Real appraisals discount future costs and benefits and model uncertainty; this example simplifies.)
:::
:::

**Criticisms of QALYs.** QALYs are powerful but contested.

- **Age.** Treatments for younger people often generate more QALYs because they have more years to gain. Some see this as unfair to older people; others, citing the fair innings argument, see it as appropriate.
- **Disability.** A person with a permanent disability may gain fewer QALYs from a life-saving treatment if their quality of life is valued below 1, which seems to value their life less. Disability rights advocates argue that this is discriminatory.
- **Aggregation.** QALYs add small benefits to many people and large benefits to a few as if they were equivalent. Many people think that saving one life matters more than relieving minor symptoms in thousands of people, even if the QALY totals are the same.
- **Whose values?** Health state values come from the general public imagining conditions, not from people living with them, who often rate their quality of life higher.

NICE's methods partly respond to these concerns: it does not use age weighting, it applies a severity modifier, and it considers equality and social value judgements alongside the ICER.

## Fair process: accountability for reasonableness {#procedures}

Because people disagree about substantive principles, Norman Daniels and James Sabin argued that legitimacy depends on fair **procedures**. Their framework, **accountability for reasonableness**, has four conditions.

::: definition Accountability for reasonableness {#def-a4r}
1. **Publicity:** decisions and their reasons are publicly available.
2. **Relevance:** the reasons are ones that fair-minded people can accept as relevant to meeting health needs fairly under resource constraints.
3. **Revision and appeals:** there are mechanisms to challenge decisions and revise them in the light of new evidence or arguments.
4. **Enforcement:** there is regulation to ensure the first three conditions are met.
:::

English public law requires similar things. NHS bodies may set priorities, and courts will not substitute their own view of how money should be spent (*R v Cambridge Health Authority, ex parte B*, 1995). But decisions must be lawful, rational and procedurally fair. A policy that refused a treatment to everyone without considering individual circumstances was unlawful in *R v North West Lancashire Health Authority, ex parte A, D and G* (1999). In *R (Rogers) v Swindon NHS Primary Care Trust* (2006), a policy of funding trastuzumab (Herceptin) for breast cancer only in "exceptional circumstances" was held irrational, because the trust could not explain what would make one eligible patient's case exceptional compared with another's when cost was not the reason.

Treatments not routinely funded can be requested through an **individual funding request** (IFR), which must show that the patient is clinically exceptional: different from others with the same condition in a way that means they would benefit more. Commissioners must also comply with the **Equality Act 2010**, including the public sector equality duty to consider the effect of decisions on groups with protected characteristics.

::: example An individual funding request {#ex-appeal}
A 34-year-old woman with a rare form of epilepsy has failed several medicines. Her neurologist wants to prescribe a drug licensed for a different epilepsy syndrome, which the ICB does not fund for her condition. The neurologist submits an IFR. The ICB panel refuses, saying that "many patients would benefit from this drug and funding her would be unfair to them". Was this reasoning appropriate?
::: solution
**The test:** an IFR panel asks whether the patient is clinically exceptional (whether there is something about her that means she would benefit more than other patients with the same condition), and whether the treatment would be an appropriate use of resources.

**The panel's reasoning:** "many patients would benefit" may be a reason to develop a commissioning policy for the whole group, not to refuse an individual. But fairness to similar patients is a legitimate concern: if she is not different from others with her condition, funding her alone would be inconsistent. The panel should have considered the specific evidence the neurologist submitted, such as previous response, side effects of alternatives, or a genetic finding predicting response.

**Next steps:** the neurologist can ask for the reasons in writing, provide additional evidence of exceptionality, and use the appeal process. If many patients are in the same position, the right route is to ask the ICB to consider a policy for the group. Throughout, the patient should be told honestly what is happening and why ([[public-health/health-systems-economics]]).
:::
:::

## Bedside rationing and triage {#triage}

Clinicians allocate resources every day: who is seen first in an emergency department, who gets the last intensive care bed, how long a ward round spends with each patient. The GMC requires doctors to make these decisions fairly, on the basis of clinical need and likely benefit, not on grounds such as age, disability, race, sex or lifestyle except where clinically relevant, and to be honest with patients when treatment is not available because of resource limits.

**Triage** sorts patients by urgency and likely benefit. In everyday emergency care the aim is to treat the most urgent first. In a major incident with overwhelming numbers, the aim shifts to doing the most good for the most people, so that patients who are unlikely to survive even with treatment may be given lower priority for scarce interventions ([[emergency-critical-care/major-incidents]]).

The COVID-19 pandemic tested these principles. In March 2020 NICE's rapid guideline on critical care in adults recommended using the Clinical Frailty Scale to inform decisions about critical care admission. Disability groups pointed out that the scale was not validated in younger people, people with stable long-term disabilities, learning disabilities or autism, and that using it in these groups could exclude people who would benefit. NICE amended the guidance within days to make clear that the scale should not be used in these groups and that decisions must be individual. The episode showed how a tool designed for one population can encode unfairness when applied to another.

::: warning Age, disability and lifestyle are not proxies for benefit
It is tempting to use age, a diagnosis or a lifestyle factor as a shortcut to decide who will benefit. These shortcuts are often inaccurate and can be unlawful discrimination under the Equality Act 2010. Decisions about access to treatment should rest on an individual assessment of the likely benefit and burden for this patient. Where a factor such as smoking really does change the risk of a procedure, it can be considered for that reason, openly, and the patient should be offered help to change it rather than simply excluded.
:::

::: example Smokers and the surgical list {#ex-twolists}
An ICB proposes that people who smoke, or who have a body mass index over 40, should not be referred for elective hip and knee replacement until they stop smoking or lose weight. Assess the proposal.
::: solution
**Relevant differences:** smoking increases the risk of wound infection and other complications, and high BMI is associated with higher complication rates. These are clinically relevant to the procedure's benefit and harm, which is a legitimate reason to discuss them.

**Problems:** a blanket rule ignores individual differences. Many people with obesity benefit greatly from joint replacement, which may help them become more active. Delays can leave people in pain and immobile, which makes weight loss harder. The Royal College of Surgeons and NICE have opposed blanket restrictions based on BMI or smoking. Such rules also fall hardest on people from deprived communities, where both are more common, which raises equality concerns.

**Fairer alternative:** use smoking and weight as part of an individual risk–benefit assessment; offer smoking cessation and weight management support while the person is on the list, without delaying referral; and explain the reasons openly. This respects both the evidence and the formal principle of justice.
:::
:::

## Justice, inequality and public health {#public-health}

Justice is not only about who gets treatment. Health is strongly shaped by income, education, housing, work and discrimination ([[public-health/determinants-inequalities]]). In England, people in the most deprived areas live several years less, and many more years in poor health, than people in the least deprived. The **inverse care law**, described by the Welsh GP Julian Tudor Hart in 1971, observes that "the availability of good medical care tends to vary inversely with the need for it in the population served". The Marmot Review (2010) recommended **proportionate universalism**: universal services, with effort and resources proportionate to need.

Public health interventions raise their own ethical questions, because they often restrict individuals for the sake of the population. The **harm principle** of John Stuart Mill holds that the only justification for exercising power over a person against their will is to prevent harm to others. The Nuffield Council on Bioethics (2007) proposed an **intervention ladder**, from doing nothing and providing information, through enabling and guiding choice by incentives and defaults, up to restricting and eliminating choice. The higher up the ladder, the stronger the justification needed. Examples include taxes on sugary drinks, smoking bans in enclosed public places (2007 in England), and, at the top, quarantine and compulsory vaccination. The requirement for COVID-19 vaccination as a condition of working in care homes in England (2021, revoked in 2022) showed how contested such measures are.

Justice also applies to the tools of medicine. The UK government's Independent Review of Equity in Medical Devices (2024) found evidence that pulse oximeters can overestimate oxygen saturation in people with darker skin, so that low oxygen levels may be missed, and raised concerns about bias in artificial intelligence tools trained on unrepresentative data.

::: example A biased algorithm {#ex-algorithm}
A hospital uses an algorithm to identify patients who should be offered an extra care-management programme. It ranks patients by their predicted future health care costs. An audit finds that, at the same level of illness, Black patients are less likely to be selected than White patients. What has gone wrong, and how should it be fixed?
::: solution
**The cause:** the algorithm predicts **cost**, not **need**. If one group has historically had less access to care, less is spent on them at the same level of illness, so they appear lower risk. The algorithm faithfully reproduces an existing injustice. A study of a widely used commercial algorithm in the United States, published in *Science* in 2019, found exactly this pattern.

**The principle:** the formal principle of justice requires allocation on a morally relevant criterion. Health need is relevant; past spending is a proxy that is biased.

**The fix:** change the target to a direct measure of health need (such as the number of active chronic conditions or measures of disease control), test performance separately for different groups before and after deployment, involve patients and communities in the design, and keep humans responsible for final decisions. Monitoring for bias must continue, because data and populations change.
:::
:::

::: quiz
A primary care trust decides to fund a cancer drug only for patients with "exceptional circumstances", but cannot say what would count as exceptional among patients who meet the clinical criteria. Cost is not the reason for the policy. Which statement reflects the law in England?
- [ ] The policy is lawful because commissioners have complete discretion over spending.
- [x] The policy is irrational and unlawful because it provides no rational basis for distinguishing between patients in the eligible group.
- [ ] The policy is lawful because the drug is expensive.
- [ ] Courts can order commissioners to fund any drug a clinician recommends.
::: solution
This is *R (Rogers) v Swindon PCT* (2006). Commissioners have wide discretion to set priorities, and courts will not decide how a budget should be spent (*ex parte B*). But decisions must be rational: a policy that says a drug will be funded only in exceptional cases, while giving no way to tell exceptional from ordinary cases among eligible patients, is arbitrary. Courts do not order particular treatments; they require decisions to be made lawfully.
:::
:::

::: history
In 1962 the American journalist Shana Alexander described in *Life* magazine an anonymous committee of lay people in Seattle that chose which patients with kidney failure would receive the new, scarce treatment of chronic haemodialysis, partly on judgements of social worth. The "God committee" became a symbol of how not to ration. In 1971 Julian Tudor Hart described the inverse care law, and John Rawls published *A Theory of Justice*.

In the 1990s the American state of Oregon ranked hundreds of condition–treatment pairs to decide what its Medicaid programme would cover, an early and public attempt at explicit priority setting. The Child B case (1995) brought rationing into British public debate. NICE was established in 1999 to make national, evidence-based decisions about the value of treatments, ending what became known as the "postcode lottery" for many drugs. Its methods have been revised repeatedly, including the severity modifier in 2022 and a higher cost-effectiveness threshold in 2026.
:::

## Where this leads

Health economics and the organisation of health systems are covered in [[public-health/health-systems-economics]], health inequalities in [[public-health/determinants-inequalities]], and global health justice in [[public-health/global-health]]. Triage in major incidents is in [[emergency-critical-care/major-incidents]]. Allocation of a single scarce bed was discussed in [[medical-ethics-law/ethical-principles]], and fair inclusion in research is in [[medical-ethics-law/research-ethics]].

::: summary
- Resources are always limited; every allocation has an **opportunity cost**. Allocation happens at macro, meso and micro levels.
- The **formal principle of justice** requires treating like cases alike, on morally relevant criteria. Clinical need and capacity to benefit are relevant; ability to pay and social worth are not.
- Theories of distributive justice include utilitarian, egalitarian, prioritarian, Rawlsian, libertarian and need-based approaches; the fair innings argument and the rule of rescue often appear in debates.
- **QALYs** combine length and quality of life; the **ICER** is extra cost per extra QALY. Since 2026 NICE's standard threshold is **£25,000–£35,000 per QALY**, with a severity modifier since 2022. QALYs are criticised for effects on older and disabled people and for aggregation.
- Fair process (**accountability for reasonableness**) requires publicity, relevance, appeals and enforcement. English courts require rational, lawful decisions (*ex parte B*, *ex parte A, D and G*, *Rogers*), not particular outcomes.
- Bedside decisions must be based on individual need and benefit, not proxies such as age or disability; the COVID-19 frailty scale episode shows the risks.
- Justice extends to health inequalities (inverse care law, proportionate universalism), to public health interventions (harm principle, intervention ladder) and to bias in devices and algorithms.
:::

## Exercises

::: exercise Name the theory {level=1}
Which theory of justice best matches each statement? (a) "We should spend the budget where it buys the most health." (b) "The sickest should come first, even if we could help others more." (c) "Choose rules you would accept if you did not know whether you would be rich or poor, healthy or sick." (d) "A person who has reached 85 has had a good run; a 20-year-old has a stronger claim."
::: solution
(a) Utilitarian. (b) Prioritarian (or need-based). (c) Rawlsian. (d) Fair innings argument.
:::
:::

::: exercise Counting QALYs {level=1 check="3"}
A treatment allows a patient to live 4 years in a health state valued at 0.75. How many QALYs is this?
::: solution
$4 \times 0.75 = 3$ QALYs.
:::
:::

::: exercise An ICER {level=1 check="25000"}
A new drug costs £40,000 more per patient than the current treatment and produces 1.6 more QALYs per patient. Calculate the ICER in pounds per QALY gained.
::: solution
$\text{ICER} = 40{,}000 / 1.6 = £25{,}000$ per QALY gained. This is at the lower end of NICE's standard threshold range (£25,000–£35,000 since 2026), so it would usually be considered cost-effective if the evidence is robust.
:::
:::

::: exercise The severity modifier {level=2 check="30000"}
A treatment for a severe condition has an unweighted ICER of £36,000 per QALY. NICE judges that the condition qualifies for a severity weight of 1.2, which multiplies the QALYs gained. What is the weighted ICER, in pounds per QALY?
::: hint
Multiplying the QALY gain by 1.2 divides the ICER by 1.2.
:::
::: solution
Weighted ICER $= 36{,}000 / 1.2 = £30{,}000$ per QALY. This falls within the standard range of £25,000–£35,000, so the severity modifier may change the recommendation. The modifier expresses a judgement that health gains for people with severe conditions deserve extra weight, a prioritarian element within a largely utilitarian method.
:::
:::

::: exercise Aggregation {level=2}
Programme A gives 1 extra year of full health to 50 people. Programme B gives 0.01 QALYs (about 3.7 days of full health) to 5,000 people who have mild hay fever. Both cost the same. Compare them by QALYs, and explain why many people would still prefer programme A.
::: solution
A: $50 \times 1 = 50$ QALYs. B: $5{,}000 \times 0.01 = 50$ QALYs. They are equal in QALYs. Many people would prefer A because the benefit to each person is large and life-changing, while B's benefit is trivial for each person. This intuition reflects concern for individuals and for the seriousness of need, which simple QALY aggregation ignores. Prioritarian and need-based views explain the preference; strict utilitarianism does not.
:::
:::

::: exercise The inverse care law {level=2}
Give three ways in which a general practice could reduce the inverse care law in its own population.
::: solution
Possible answers: (1) proactively identify and invite people at high risk who do not attend (for example, using registers for hypertension, diabetes or severe mental illness); (2) offer longer appointments to people with complex needs, multiple conditions or communication difficulties; (3) reduce barriers to access, such as offering interpreters, flexible appointment times and a mix of in-person and remote options, without making digital access the only route; (4) work with community organisations and link workers to address social needs; (5) audit uptake of screening and immunisation by deprivation and ethnicity and act on gaps.
:::
:::

::: exercise Triage in a surge {level=3}
During a severe respiratory epidemic, a hospital's critical care unit is full and three patients need ventilation: a 32-year-old with no comorbidities and severe viral pneumonia, a 58-year-old with well-controlled diabetes and similar pneumonia, and a 47-year-old with Down syndrome and similar pneumonia. One ventilator is available now; another hospital can accept one patient in two hours. Discuss how a fair decision should be made.
::: solution
**Criteria:** the decision should rest on each patient's likely benefit from ventilation now (probability of survival and the urgency of need), assessed individually, not on age bands, a learning disability or general judgements of quality of life.

**Individual assessment:** the 47-year-old's Down syndrome is not by itself a reason for lower priority; the question is whether any specific clinical factor (such as congenital heart disease or prior lung disease) changes their likely benefit. The 58-year-old's well-controlled diabetes may slightly increase risk but should be considered with other factors. Severity of current illness matters: who will deteriorate fastest without ventilation, and who can safely wait for transfer?

**Process:** senior clinicians, ideally a triage team not directly caring for the patients, apply published criteria transparently; decisions are documented, reviewed frequently, and communicated honestly to patients and families; patients who are not ventilated receive the best alternative care, including non-invasive support and palliative care where appropriate.

**Lessons from COVID-19:** tools validated in one population (such as the Clinical Frailty Scale in older people) should not be applied to others; equality duties apply even in emergencies.
:::
:::

::: exercise A funding decision with no good options {level=3}
An ICB has £1 million left for new investment this year. Two proposals: (A) a new drug for 20 patients with a rare, rapidly fatal disease, giving each about 1.5 extra QALYs; (B) an expanded community mental health service for 600 young people, estimated to give each 0.08 QALYs. Each costs £1 million. Calculate the cost per QALY of each, and discuss what else, besides the numbers, a fair decision should consider.
::: solution
**Numbers:** A gives $20 \times 1.5 = 30$ QALYs, about $1{,}000{,}000/30 \approx £33{,}300$ per QALY. B gives $600 \times 0.08 = 48$ QALYs, about $1{,}000{,}000/48 \approx £20{,}800$ per QALY. B produces more health for the money.

**Other considerations:** severity (A's patients face rapid death, which a prioritarian view would weight); uncertainty (how robust is the estimate for B, which depends on long-term effects?); equity (B may reduce inequalities if it reaches deprived groups; A's patients have no alternative); the rule of rescue (A's patients are identifiable); legal duties (NICE-approved treatments must be funded; equality duties); and procedural fairness (public reasons, involvement of patients and the public, an appeals route). A fair process might fund B on cost-effectiveness while seeking national funding routes (such as NICE's Highly Specialised Technologies programme) for A, and explain the reasons openly.
:::
:::
