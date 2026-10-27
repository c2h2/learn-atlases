In July 2007 smoking became illegal in enclosed public places and workplaces in England. No individual smoker received advice, a prescription or a follow-up appointment as a result, yet within a year emergency admissions for heart attack had fallen, bar workers' lungs were healthier and the number of children exposed to smoke at home did not rise, as critics had predicted, but fell. Over the same period, stop-smoking services helped many thousands of people to quit, one consultation at a time. Both approaches prevent disease. They work in very different ways, reach different people and raise different ethical questions.

This chapter is about prevention: how it is classified, why a small change across a whole population can prevent more disease than a large change in a few people at high risk, how health promotion works, what makes people change behaviour, and how preventive interventions are evaluated and justified. It builds on the determinants of health described in [[public-health/determinants-inequalities]].

## Levels of prevention {#levels}

::: definition Levels of prevention {#def-levels}
- **Primordial prevention** stops risk factors from arising in the first place, by shaping the social, economic and environmental conditions that produce them. Examples: urban design that makes walking and cycling easy, restrictions on marketing unhealthy food to children, and preventing children from starting to smoke.
- **Primary prevention** prevents disease in people who do not have it by removing or reducing a cause, or by increasing resistance. Examples: vaccination, smoking cessation, treating raised blood pressure before any cardiovascular event, folic acid before conception, seat belts.
- **Secondary prevention** detects disease at an early, often asymptomatic, stage and treats it so that it does not progress. Screening is the main example; others are case-finding of hypertension or atrial fibrillation in primary care.
- **Tertiary prevention** reduces the impact of established disease: limiting complications, disability and recurrence. Examples: cardiac rehabilitation after myocardial infarction, foot care in diabetes, stroke rehabilitation.
- **Quaternary prevention** protects people from unnecessary or harmful medical intervention: over-investigation, overdiagnosis and overtreatment.
:::

The boundaries are blurred. In cardiology, "secondary prevention" usually means treatment after a first event to prevent a second one, which in the general scheme above is tertiary prevention. Treating high blood pressure is primary prevention of stroke but treatment of a condition (hypertension) that is itself a disease. The classification is a way of thinking, not a set of exclusive boxes, and the context should make the meaning clear.

The levels can also be described by how far "upstream" an intervention acts. **Upstream** interventions change the conditions that create risk (tax, regulation, housing); **downstream** interventions act on individuals once risk or disease is present. Most primordial and many primary interventions are upstream; secondary and tertiary prevention are downstream.

## The population and high-risk strategies {#strategies}

In 1985 the epidemiologist Geoffrey Rose published a paper called "Sick individuals and sick populations". He pointed out that the question "why did this person get the disease?" has a different answer from "why does this population have so much of it?". The causes of individual cases explain who, within a population, falls ill. The causes of incidence explain why one population has far more disease than another. A population in which everyone smokes cannot reveal through within-population comparisons that smoking causes lung cancer, because there is no unexposed group; it takes a comparison between populations to see it.

::: definition The high-risk and population strategies {#def-strategies}
The **high-risk strategy** identifies the individuals at highest risk (for example by screening for raised blood pressure or calculating cardiovascular risk) and offers them an intervention.

The **population strategy** aims to shift the distribution of a risk factor in the whole population, so that everyone's risk falls a little (for example by reducing the salt content of processed food).
:::

The high-risk strategy has clear advantages. The intervention is matched to the individual; the person is motivated because they know they are at risk; doctors are comfortable with it; and resources are concentrated where the benefit per person is largest. Its weaknesses are that it requires screening, which costs money and misses people who do not attend; it is palliative, in that it does not change the underlying causes, so new high-risk people keep appearing; and, as Rose showed, it can address only a small part of the burden of disease.

::: theorem The prevention paradox {#thm-paradox}
A large number of people exposed to a small risk may generate many more cases than a small number exposed to a high risk. A preventive measure that brings large benefits to the community may therefore offer little to each participating individual.
:::

::: proof
Most risk factors, such as blood pressure, cholesterol, alcohol intake and body weight, are continuous and roughly bell-shaped in distribution, and risk rises steadily across the whole range rather than starting at a threshold. The high-risk tail of the distribution contains few people. The middle contains most people, each at modest risk. When the numbers of people are multiplied by their risks, the middle often contributes most of the cases.

For example, suppose 10% of a population of 100,000 is at high risk (20% over ten years) and 90% at lower risk (5%). The high-risk group will produce $10{,}000 \times 0.2 = 2{,}000$ cases and the lower-risk group $90{,}000 \times 0.05 = 4{,}500$. Over two-thirds of cases arise in the lower-risk majority, whom the high-risk strategy never treats. Shifting the whole distribution reaches these people. But each individual's absolute benefit is small, so most people who change their behaviour will never experience a disease that they would otherwise have had; that is the paradox.
:::

Rose also observed that the mean of a population's distribution predicts how many people lie in the extreme tail. Populations with high average blood pressure have more people with hypertension; populations with high average alcohol consumption have more heavy drinkers. "The sick individuals are part of a sick population." A modest fall in the mean therefore reduces the number of high-risk individuals considerably.

::: example Shifting the distribution of blood pressure {#ex-shift}
Assume systolic blood pressure in adults is normally distributed with mean 125 mmHg and standard deviation 15 mmHg. (a) What proportion of adults have systolic pressure above 140 mmHg? (b) A national salt-reduction programme lowers the mean by 5 mmHg without changing the spread. What proportion is now above 140 mmHg? (c) In a population of 1 million adults, how many fewer people are above the threshold?
::: solution
(a) $z = (140 - 125)/15 = 1.00$. The proportion above $z = 1$ is $1 - \Phi(1) = 0.1587$, or 15.9%.

(b) The new mean is 120 mmHg. $z = (140 - 120)/15 = 1.33$. The proportion above is $1 - \Phi(1.333) = 0.0912$, or 9.1%.

(c) In 1 million adults: $158{,}700 - 91{,}200 \approx 67{,}400$ fewer people above 140 mmHg.

A 5 mmHg change is barely noticeable for any one person, yet it reduces the number of people above the hypertension threshold by about 43%. The effect on cardiovascular events would be larger still than this count suggests, because the people below the threshold also benefit: risk rises continuously with blood pressure.
:::
:::

::: widget distribution
dist: normal
params: mu=125, sigma=15
a: 140
b: 220
caption: A normal distribution of systolic blood pressure (mmHg). The shaded area is the proportion above 140 mmHg. Lower the mean by 5 mmHg and watch the shaded tail shrink by far more than 5/125 of its size, which is Rose's argument for the population strategy. Then try narrowing the standard deviation instead, which is what a pure high-risk strategy attempts.
:::

The two strategies are complementary. A sensible cardiovascular prevention policy combines a population strategy (salt reduction, tobacco control, active travel, food reformulation) with a high-risk strategy (NHS Health Checks for adults aged 40 to 74 every five years, risk assessment with QRISK3, and treatment of people at high risk according to NICE guidance).

### Absolute risk and the benefit of preventive treatment {#absolute-benefit}

Preventive treatments are usually tested in trials that report a **relative risk reduction** (RRR). The benefit to an individual depends on their **absolute risk**. The same relative effect produces a much larger absolute benefit in someone at high baseline risk.

::: example Who benefits most from a statin? {#ex-nnt}
A statin reduces the relative risk of a major cardiovascular event by about 25% in the illustrative trial used here. Calculate the absolute risk reduction and the number needed to treat for ten years (NNT) for (a) a 68-year-old man with a 10-year cardiovascular risk of 20%, and (b) a 45-year-old woman with a 10-year risk of 5%.
::: solution
(a) ARR $= 0.20 \times 0.25 = 0.05$, or 5 percentage points. NNT $= 1/0.05 = 20$: twenty people like him would need to take the statin for ten years to prevent one event.

(b) ARR $= 0.05 \times 0.25 = 0.0125$, or 1.25 points. NNT $= 1/0.0125 = 80$.

The relative benefit is the same, but treating the man prevents four times as many events per person treated. This is why preventive treatment is offered according to absolute risk rather than the level of a single risk factor. The decision for an individual also weighs adverse effects, the burden of daily medication and personal preferences, and follows current NICE guidance on lipid modification. Risk calculators also have limits: a 10-year risk is low in most young people even when their lifetime risk is high, which is why tools such as lifetime risk estimates are used alongside them.
:::
:::

::: warning Relative risk reductions exaggerate the benefit for low-risk people
"This treatment halves your risk" sounds impressive, but if the risk was 2 in 1,000, it falls to 1 in 1,000: an absolute reduction of 0.1 percentage points and an NNT of 1,000. Patients, the public and clinicians all judge benefits as larger when they are presented as relative risks. Good communication of preventive benefit uses absolute risks over a stated time period, ideally as natural frequencies ("out of 100 people like you, about 10 will have a heart attack or stroke in the next ten years without treatment and about 8 with it"), and presents harms in the same format.
:::

## Health promotion {#promotion}

::: definition Health promotion {#def-promotion}
**Health promotion** is "the process of enabling people to increase control over, and to improve, their health" (WHO, Ottawa Charter, 1986). It covers actions directed at strengthening the skills and capabilities of individuals, and actions directed at changing social, environmental and economic conditions.

**Health education** is the narrower task of communicating information and developing skills so that people can make informed decisions about their health. **Health protection** refers to measures that protect populations from hazards, such as infectious disease control, environmental regulation and food safety, often through law.
:::

The **Ottawa Charter** set out five action areas that still structure health promotion:

1. **Build healthy public policy**: put health on the agenda of policy makers in all sectors (taxation, transport, housing, education, agriculture), not just the health sector. This idea is now called "health in all policies".
2. **Create supportive environments**: make the healthy choice the easy choice, in homes, schools, workplaces and cities.
3. **Strengthen community action**: communities set priorities and plan and implement strategies themselves.
4. **Develop personal skills**: information, education and life skills, including **health literacy**, the ability to obtain, understand and use health information.
5. **Reorient health services**: from treating illness towards promoting health, with services that are sensitive to culture and need.

A useful distinction is between interventions that rely on individual **agency** (people must notice, understand and act) and those that change **structure** (the environment changes for everyone). As [[public-health/determinants-inequalities]] explains, agentic interventions tend to benefit advantaged groups more, while structural interventions are more equitable.

### How behaviour changes {#behaviour}

Several models describe how people change health behaviours. They overlap, and none is complete.

- **The health belief model** (developed in the 1950s for tuberculosis screening) holds that people act if they believe they are susceptible to a condition, that it is serious, that action will help, and that the barriers are smaller than the benefits; a cue to action (a symptom, a reminder, advice) triggers behaviour.
- **The transtheoretical (stages of change) model** of Prochaska and DiClemente describes precontemplation, contemplation, preparation, action and maintenance, with relapse common. It is widely used in counselling, but trials of interventions "tailored" to a person's stage have not shown that tailoring improves outcomes, and the stages are not as distinct as the model implies.
- **The COM-B model**, part of the Behaviour Change Wheel published by Susan Michie and colleagues in 2011, states that behaviour (B) occurs when a person has the **capability** (C: physical and psychological), the **opportunity** (O: physical and social) and the **motivation** (M: reflective and automatic) to perform it. It links each deficit to types of intervention: education and training for capability, environmental restructuring and enablement for opportunity, persuasion and incentives for motivation, with policy options such as regulation and fiscal measures around them.
- **Nudges**, described by Richard Thaler and Cass Sunstein in 2008, alter the "choice architecture" without forbidding options or significantly changing economic incentives: default options (opt-out organ donation, pre-booked screening appointments), placement of healthier food at eye level, and smaller plate sizes. Defaults are among the most effective nudges. Many health problems need more than nudges, though: the evidence suggests that price and regulation produce larger effects.

Much behaviour is habitual and cued by the environment rather than reflectively chosen. This is why information alone changes behaviour so little, and why environmental changes are so powerful.

### Health promotion in clinical practice {#mecc}

Every clinical contact is an opportunity. **Making Every Contact Count** (MECC), an approach adopted across the NHS in England, encourages staff to use routine contacts to raise lifestyle issues briefly. For smoking, **very brief advice** follows three steps, often summarised as "Ask, Advise, Act": ask about smoking and record it; advise that the best way to stop is with a combination of medication or vaping support and specialist behavioural support; and act on the response by referring to a stop-smoking service or prescribing. It takes less than a minute. For alcohol, a **brief intervention** after screening with the AUDIT-C or full AUDIT questionnaire, giving structured feedback and advice, reduces drinking in people drinking at increasing or higher risk, according to systematic reviews in primary care.

NICE guidance on individual behaviour change (PH49, 2014) recommends that interventions be based on recognised behaviour change techniques, such as goal setting, self-monitoring, planning for barriers and arranging social support, and that staff be trained to deliver them.

::: example A brief intervention in general practice {#ex-brief}
A 38-year-old man of Bangladeshi heritage attends with a sprained ankle. His record shows he smokes 20 cigarettes a day and that his father had a heart attack at 52. He has not been asked about smoking for three years. Describe how the clinician could use this contact for prevention in under two minutes, and how the COM-B model helps to plan support if he is interested.
::: solution
**Ask.** "Do you still smoke?" Record the answer and the amount.

**Advise.** "The best thing you can do for your health is to stop, and the most effective way is with support from the stop-smoking service together with medication or a vape. People who use that support are about three times as likely to succeed as those who try on their own." Avoid lecturing or linking it to the ankle.

**Act.** If he is interested, refer him to the local stop-smoking service (with an offer of support in Bengali or Sylheti if that would help) or prescribe a stop-smoking medicine. If not, accept the answer, note it and offer help in future. Very brief advice is still worthwhile when the person declines, because it plants a cue for a future attempt.

**Further prevention.** His family history of premature coronary disease and South Asian ethnicity both raise his cardiovascular risk, so he should be invited for a risk assessment (blood pressure, lipids, HbA1c and BMI, with ethnicity-specific BMI thresholds).

**COM-B.** Capability: he may not know about the support available, or how to use nicotine replacement properly; explain it. Opportunity: work shifts, a household of smokers, and cigarettes sold at the corner shop; agree practical plans such as a smoke-free home and support at times he can attend. Motivation: his own reasons (his children, his father's heart attack, money saved) are stronger than the clinician's; automatic motivation (habit and craving) is addressed by medication and by replacing cues.
:::
:::

## The evidence for population interventions {#evidence}

Some of the largest gains in public health have come from population measures. Their evidence rarely comes from randomised trials, which are often impossible for national laws. Instead it comes from **natural experiments**, in which a policy changes in one place or time and not another, analysed with designs such as **interrupted time series** (comparing the trend after a change with the trend projected from before it), **difference-in-differences** (comparing the change in an exposed population with the change in an unexposed one), and **synthetic controls**. The Medical Research Council's framework for developing and evaluating complex interventions (updated in 2021) describes how to combine such evaluations with modelling and with process evaluation, which asks how and why an intervention worked.

Examples with good evidence include:

- **Tobacco control.** Taxation, smoke-free legislation, advertising bans, standardised packaging and age-of-sale laws. After England's 2007 smoke-free law, an interrupted time-series analysis found a small but significant fall, of about 2.4%, in emergency admissions for myocardial infarction (Sims and colleagues, 2010). Tobacco control is discussed fully in [[public-health/non-communicable-disease]].
- **Alcohol pricing.** Scotland's minimum unit pricing, introduced in 2018, was followed by an estimated 13.4% fall in deaths wholly attributable to alcohol, with the largest falls in the most deprived areas (Lancet, 2023).
- **Road safety.** Compulsory seat belts for front-seat occupants in the UK (1983), drink-driving laws and breath testing, speed limits and traffic calming, and graduated licensing. Deaths on Britain's roads fell from about 8,000 a year in the mid-1960s to fewer than 2,000 a year in the 2010s, despite far more traffic.
- **Food fortification.** Mandatory folic acid fortification of flour reduced neural tube defects in the United States, Canada and many other countries. The UK legislated in 2024 to add folic acid to non-wholemeal wheat flour, with the requirement due to apply from the end of 2026.
- **Water fluoridation.** Adjusting the fluoride concentration of drinking water reduces dental decay. The size of the benefit in the era of fluoride toothpaste is smaller than older studies suggested, and recent UK evaluations found modest effects, so fluoridation remains debated; about a tenth of the population of England receives fluoridated water.

::: example An interrupted time series {#ex-its}
A region introduces a ban on smoking in cars carrying children. Before the ban, monthly emergency admissions of children with asthma were falling steadily, and extrapolating that trend predicts 950 admissions in the first year after the ban. The observed number is 920. (a) What is the estimated reduction attributable to the ban, as a percentage of the expected number? (b) What are the main threats to this conclusion?
::: solution
(a) Reduction $= 950 - 920 = 30$ admissions. As a percentage of expected: $30/950 = 3.2\%$.

(b) The estimate assumes that the pre-existing trend would have continued unchanged. Threats include: other events at the same time (a mild winter, a new asthma guideline, a change in coding of admissions, or a respiratory virus season of different severity), which is why a control series (for example adult asthma admissions, or a region without the ban) strengthens the design; regression to the mean if the ban followed an unusually bad year; chance, given the modest numbers; and anticipatory effects if behaviour changed before the law took effect. An analysis would also check whether the effect appeared as a step change, a change in slope or both, and would report a confidence interval.
:::
:::

### Is prevention cheaper than cure? {#costs}

Prevention is often defended on the grounds that it saves money. Sometimes it does: childhood vaccination and tobacco control save far more in treatment costs than they cost. But in an analysis of published cost-effectiveness studies, Cohen, Neumann and Weinstein (2008) found that most preventive measures, like most treatments, cost more than they save, though many offer good value for the health gained. People who live longer also use health care in their extra years. The right question is not "does it save money?" but "does it buy health at a reasonable cost compared with the alternatives?". The methods for answering this are covered in [[public-health/health-systems-economics]].

## The ethics of prevention {#ethics}

Population prevention raises ethical issues that individual clinical care does not. Prevention is offered to people who are well and who did not ask for it; most of those who comply will gain nothing personally (the prevention paradox); and some measures restrict freedom.

The **Nuffield Council on Bioethics** (2007) described an **intervention ladder** of increasing intrusiveness, from doing nothing and monitoring the situation, through providing information, enabling choice, guiding choice by changing the default, guiding choice through incentives or disincentives, to restricting choice and eliminating choice. The higher the rung, the stronger the justification needed. The Council described a "stewardship" role for the state: it has a duty to protect vulnerable people (especially children), to reduce health inequalities and to make it easy to lead a healthy life, while minimising coercion and respecting autonomy.

Arguments in favour of more intrusive measures include harm to others (second-hand smoke, drink-driving), the vulnerability of children, the commercial forces that shape the environment (marketing is itself an intrusion on choice), and the fact that informational approaches widen inequalities. Arguments against include paternalism, the regressive effect of some taxes (people on low incomes spend a larger share of their income on tobacco, although they also gain most health), stigma, and the risk that the state blames individuals for conditions shaped by their circumstances.

::: quiz
Which of the following is an example of primordial prevention?
- [ ] Prescribing an antihypertensive to a 60-year-old with blood pressure of 165/100 mmHg.
- [ ] Inviting women aged 50 to 70 for mammography.
- [x] Restricting the advertising of foods high in fat, sugar and salt to children.
- [ ] Cardiac rehabilitation after a myocardial infarction.
::: solution
Primordial prevention stops risk factors from developing, by changing the conditions that create them. Restricting the marketing of unhealthy food to children aims to prevent unhealthy diets and obesity from developing in the first place. Antihypertensive treatment is primary prevention of cardiovascular disease, mammography is secondary prevention (screening), and cardiac rehabilitation is tertiary prevention.
:::
:::

::: history
The idea of levels of prevention was set out by Hugh Leavell and E. Gurney Clark in their textbook *Preventive Medicine for the Doctor in His Community* (1958). In 1974 the Canadian minister of health Marc Lalonde published *A New Perspective on the Health of Canadians*, which argued that lifestyle and environment, not only health care, determined health, and is often seen as the start of modern health promotion. The Declaration of Alma-Ata (1978) made primary health care the basis of "health for all", and the Ottawa Charter for Health Promotion (1986) set out the five action areas still in use. In 1985 Geoffrey Rose published "Sick individuals and sick populations", and his book *The Strategy of Preventive Medicine* (1992) set out the prevention paradox and the case for the population strategy. Marc Jamoulle introduced the term quaternary prevention in 1986.
:::

## Where this leads

Screening, the main form of secondary prevention, has its own chapter: [[public-health/screening]]. Vaccination programmes, the most effective primary prevention against infection, follow in [[public-health/vaccination-programmes]]. Tobacco, alcohol, diet and physical activity as policy targets are covered in [[public-health/non-communicable-disease]].

::: summary
- Prevention is classified as **primordial** (preventing risk factors), **primary** (preventing disease), **secondary** (detecting disease early), **tertiary** (limiting the effects of established disease) and **quaternary** (preventing harm from medical intervention). Usage varies by specialty.
- Rose's **population strategy** shifts the whole distribution of a risk factor; the **high-risk strategy** treats individuals in the tail. They are complementary.
- **The prevention paradox**: most cases arise in the large number of people at moderate risk, so measures that benefit the community offer little to each individual.
- A small shift in the mean of a distribution reduces the number of people at high risk substantially.
- Preventive treatment is targeted by **absolute risk**: the same relative risk reduction gives a smaller absolute benefit and a larger NNT in low-risk people. Present benefits and harms as absolute risks.
- **Health promotion** (Ottawa Charter) works through healthy public policy, supportive environments, community action, personal skills and reoriented services.
- Behaviour change models include the health belief model, stages of change and **COM-B**; defaults and environmental change are more powerful than information.
- Population interventions are evaluated as **natural experiments**, with interrupted time series and difference-in-differences designs.
- More intrusive measures need stronger justification (the Nuffield **intervention ladder**).
:::

## Exercises

::: exercise Absolute risk reduction {level=1 check="40"}
A preventive treatment reduces the 5-year risk of stroke from 5% to 2.5%. Calculate the number needed to treat for five years to prevent one stroke.
::: solution
ARR $= 0.05 - 0.025 = 0.025$. NNT $= 1/0.025 = 40$. The relative risk reduction is 50%.
:::
:::

::: exercise Classify the prevention {level=1}
Classify each as primordial, primary, secondary, tertiary or quaternary prevention. (a) HPV vaccination of 12-year-olds. (b) Bowel cancer screening with a faecal immunochemical test. (c) A minimum unit price for alcohol. (d) Deprescribing a statin in a frail 92-year-old in whom it no longer offers benefit. (e) Retinal screening in a person with diabetes. (f) Physiotherapy after a hip fracture to restore mobility.
::: solution
(a) Primary: prevents infection and therefore cervical and other cancers. (b) Secondary: detects cancer and precancerous polyps early. (c) Primordial or primary: it changes the environment that drives harmful drinking (primordial) and reduces consumption in drinkers (primary); this is a good example of blurred boundaries. (d) Quaternary: preventing harm from unnecessary treatment. (e) Secondary prevention of sight loss: detecting retinopathy before it threatens vision (though tertiary in relation to diabetes itself). (f) Tertiary: limiting disability after an established injury.
:::
:::

::: exercise Where do the cases come from? {level=1 check="round(1000*4500/6500)/10"}
In a population of 100,000, 10% are at high risk of a disease (20% over ten years) and 90% at lower risk (5%). What percentage of all cases arise in the lower-risk group? Give your answer to 1 decimal place.
::: solution
High-risk cases: $10{,}000 \times 0.2 = 2{,}000$. Lower-risk cases: $90{,}000 \times 0.05 = 4{,}500$. Total 6,500. Percentage from the lower-risk group: $4{,}500/6{,}500 = 69.2\%$.
:::
:::

::: exercise The tail of the distribution {level=2 check="round(1000*0.0098153)/10"}
Using the distribution of [[#ex-shift]] (mean 125 mmHg, standard deviation 15 mmHg), what percentage of adults have systolic pressure above 160 mmHg? Give your answer to 1 decimal place. ($1 - \Phi(2.333) = 0.0098$.)
::: solution
$z = (160 - 125)/15 = 2.333$. Proportion above $= 0.0098$, or 1.0%. If the mean falls by 5 mmHg to 120, $z = 2.667$ and the proportion becomes 0.38%: a fall of more than 60% in the number of people with very high blood pressure, from a 4% fall in the mean.
:::
:::

::: exercise Same treatment, different benefit {level=2 check="25"}
A treatment reduces the relative risk of an event by 20%. For a person whose baseline 10-year risk is 20%, what is the NNT over ten years? (Give a whole number.)
::: solution
ARR $= 0.20 \times 0.20 = 0.04$. NNT $= 1/0.04 = 25$. For someone with a baseline risk of 5%, ARR $= 0.01$ and NNT $= 100$.
:::
:::

::: exercise A step change {level=2 check="round(1000*45/1500)/10"}
Before a new speed-limit policy, a city's annual number of road casualties was stable at about 1,500. In the two years after the change it averaged 1,455, while in three similar cities without the change it did not change. Estimate the percentage reduction attributable to the policy, to 1 decimal place, and name the study design.
::: solution
Reduction $= 1{,}500 - 1{,}455 = 45$; $45/1{,}500 = 3.0\%$. Comparing the change in the city with the change in control cities is a **difference-in-differences** design (here the control change is zero). It relies on the assumption that the cities would have followed parallel trends without the policy.
:::
:::

::: exercise Choosing a strategy {level=3}
A country's average adult salt intake is 8.5 g per day, against a recommended maximum of 6 g. The health ministry has a fixed budget and is choosing between (A) dietitian counselling for people with diagnosed hypertension, and (B) a programme of voluntary and then mandatory salt targets for processed foods, which supply most of the salt eaten. Discuss the likely effects of each on population blood pressure, on inequalities and on individual choice.
::: solution
**(A) High-risk strategy.** Counselling reaches only diagnosed people, who are a minority of those who will have a stroke, and depends on their motivation, literacy and ability to buy and cook different food. Adherence to dietary advice declines over time. Effects on population blood pressure would be small and would favour advantaged groups. It respects choice and is well accepted.

**(B) Population strategy.** Most salt is already in food when it is bought, so reformulation lowers everyone's intake without any action by consumers, including those who never see a doctor. The UK's salt reduction programme from 2003 was followed by falls in measured salt intake and in average blood pressure, though attributing them precisely is difficult. Gradual reformulation is not noticed by consumers, because taste adapts. It is likely to reduce inequalities, because lower-income groups eat more processed food. It changes the choice architecture rather than restricting choice. Voluntary targets work only if they are monitored and backed by the possibility of regulation.

The best policy combines the two, but on Rose's logic the population strategy is likely to prevent many more strokes per pound spent.
:::
:::

::: exercise Ethics of a tax {level=3}
A government proposes a tax on sugar-sweetened drinks. Opponents argue that it is paternalistic and regressive. Using the intervention ladder, evaluate these objections.
::: solution
**Where it sits.** A tax guides choice through disincentives: a middle rung of the ladder. It does not prohibit any product. If, as with the UK Soft Drinks Industry Levy, it is designed to encourage manufacturers to reformulate, the main effect is on the products rather than on consumers' choices, which is lower on the ladder still.

**Paternalism.** The justifications for this rung are strong: the main consumers of sugary drinks include children, whom the state has a particular duty to protect; heavy marketing already shapes choice; and the consequences (obesity, type 2 diabetes, dental decay) impose costs on others through the health service.

**Regressiveness.** People on low incomes spend a larger share of income on such drinks, so the financial burden is regressive. But the health benefit is likely to be progressive, because they consume more and are more price-sensitive; reformulation removes sugar without any price rise; and revenue can be used for children's health (the UK levy's revenue was linked to school sport and breakfast programmes). The objection is real but can be mitigated.

A proportionate conclusion is that the tax is justified if it is evidence-based, transparent, monitored for effects on health and inequality, and accompanied by measures that make healthier options available and affordable.
:::
:::
