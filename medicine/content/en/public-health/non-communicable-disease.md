In 1950 Richard Doll and Austin Bradford Hill reported that almost all of the patients with lung cancer in their London hospital study had smoked. Seventy-five years later, smoking is still the largest single preventable cause of death in the UK, but the proportion of adults who smoke has fallen from over half of men to about one in ten adults. That fall was achieved mainly by policy: tax, advertising bans, smoke-free laws and, from 2027, a rising age of sale that will mean people born on or after 1 January 2009 can never legally be sold tobacco. Tobacco control is the model for preventing non-communicable disease, and it shows both what works and how long it takes.

Non-communicable diseases (NCDs), chiefly cardiovascular disease, cancer, chronic respiratory disease and diabetes, now cause most deaths in almost every country. This chapter describes their burden, the risk-factor approach to preventing them, and the policy levers for each of the main behavioural risk factors: tobacco, alcohol, diet and physical activity. It applies the principles of [[public-health/prevention-promotion]] to specific problems.

## The burden of non-communicable disease {#burden}

::: definition Non-communicable disease {#def-ncd}
A **non-communicable disease** (NCD) is a disease that is not passed from person to person, usually of long duration and resulting from a combination of genetic, physiological, environmental and behavioural factors. The WHO's NCD programme focuses on four main groups: **cardiovascular diseases**, **cancers**, **chronic respiratory diseases** and **diabetes**, and on their four shared behavioural risk factors: **tobacco use**, **harmful use of alcohol**, **unhealthy diet** and **physical inactivity**. Air pollution has been added as a fifth risk factor and mental health as a fifth disease group in the "5×5" framework.

A **premature** NCD death, for monitoring purposes, is one between the ages of 30 and 70.
:::

According to the WHO (fact sheet of September 2025), NCDs killed at least 43 million people in 2021, about 75% of deaths worldwide not related to the pandemic. Eighteen million of these deaths occurred before the age of 70, and 82% of those premature deaths were in low- and middle-income countries. Cardiovascular diseases caused at least 19 million deaths, cancers 10 million, chronic respiratory diseases 4 million and diabetes over 2 million (including kidney deaths caused by diabetes). The idea that NCDs are "diseases of affluence" is wrong: within and between countries, they fall most heavily on poorer people.

Sustainable Development Goal target 3.4 aims to reduce premature mortality from NCDs by one-third between 2015 and 2030 through prevention and treatment, and to promote mental health. Few countries are on track.

In the UK, cardiovascular disease and cancer cause about half of all deaths, and the leading risk factors for lost healthy life are tobacco, high blood pressure, high body mass index, dietary risks, high blood glucose and alcohol. Each is strongly socially patterned, which is why NCDs account for much of the gap in life expectancy described in [[public-health/determinants-inequalities]].

## The risk-factor approach {#risk-factors}

Most NCDs have several causes acting together over decades. A useful way to think about them is as a chain: **distal** determinants (income, education, the food and tobacco industries, urban design) shape **behavioural** risk factors (smoking, diet, inactivity, alcohol), which lead to **metabolic** risk factors (raised blood pressure, raised blood glucose, raised cholesterol, overweight and obesity), which lead to **disease** (myocardial infarction, stroke, cancer, chronic kidney disease). Intervention is possible at every link: policies act on distal and behavioural factors, clinical care on metabolic factors and disease.

The burden attributable to a risk factor is estimated with the **population attributable fraction** (PAF): the proportion of cases that would not have occurred if exposure had been at the lowest feasible level. For a single dichotomous exposure, $PAF = p(RR - 1)/[1 + p(RR - 1)]$, where $p$ is the prevalence of exposure and $RR$ the relative risk.

::: warning Attributable fractions do not add up to 100%
Diseases have several causes that act together. A myocardial infarction in a person who smokes and has high cholesterol may be attributable to both: it would have been prevented by removing either. The PAFs for different risk factors for the same disease therefore overlap, and their sum can exceed 100%. If the risk factors act independently, the combined PAF is $1 - (1 - PAF_1)(1 - PAF_2)\cdots$, not the sum. This is not a paradox; it reflects the fact that multiple causes are usually needed, which means that there are several ways to prevent each case.
:::

::: example Combining attributable fractions {#ex-paf}
In a population, 30% of coronary deaths are attributable to raised blood pressure and 20% to smoking. Assuming the two risk factors act independently, what fraction of coronary deaths is attributable to one or both?
::: solution
The fraction *not* attributable to blood pressure is $1 - 0.30 = 0.70$; of these, the fraction not attributable to smoking is $1 - 0.20 = 0.80$. The fraction attributable to neither is $0.70 \times 0.80 = 0.56$.

Combined PAF $= 1 - 0.56 = 0.44$, or 44%, not $30\% + 20\% = 50\%$. Some deaths are attributable to both factors and would be prevented by removing either, so adding the separate PAFs double-counts them.
:::
:::

### Why price is the strongest lever {#price}

The products that cause most NCDs (tobacco, alcohol, foods high in fat, salt and sugar) are made and marketed by profitable industries. Their influence on health through marketing, pricing, product design and lobbying is called the **commercial determinants of health**. Because these products are bought, their price and availability are among the most effective levers for reducing consumption.

::: theorem Price elasticity of demand {#thm-elasticity}
The **price elasticity of demand** $\varepsilon$ is the percentage change in consumption that results from a 1% change in price. For small changes,

$$
\%\Delta Q \approx \varepsilon \times \%\Delta P.
$$ {#eq-elasticity}

For tobacco and alcohol, $\varepsilon$ is negative (higher prices reduce consumption) and its magnitude is usually below 1 (demand is **inelastic**): in high-income countries, estimates for cigarettes are typically around $-0.4$, and for alcohol between about $-0.3$ and $-0.8$ depending on the beverage. Demand is more elastic in young people and in people on low incomes.
:::

::: proof
Inelastic demand has two consequences that together make taxation effective. First, a price rise still reduces consumption: with $\varepsilon = -0.4$, a 10% price rise reduces consumption by about 4%, which across a whole population means fewer smokers, fewer cigarettes per smoker and fewer young people starting. Second, because consumption falls by a smaller proportion than price rises, total spending on the product, and therefore tax revenue, increases. The government gains revenue that can fund services while the health benefit accrues.

Greater elasticity among young people and people on low incomes means that taxes have their largest effect on smoking and drinking in these groups, so price measures tend to narrow health inequalities, even though the financial burden of the tax is regressive. Tobacco taxes are also only as effective as their enforcement: illicit and cross-border trade undermine them, and tobacco companies can absorb tax rises on cheaper brands to keep prices low, which is why minimum prices and tax structures that raise the price of the cheapest products matter.
:::

::: widget plot
f: 100*(1 + x/100)^k
x: 0, 100
y: 0, 110
sliders: k=-0.4:-1.5:0:0.05
labels: \text{consumption (\% of baseline)}
hlines: 100
caption: Consumption (as a percentage of the baseline) against the percentage price increase, for a constant price elasticity k. With k = −0.4, typical of cigarettes, doubling the price (a 100% increase) cuts consumption by about a quarter. Move k towards −1 to see the stronger response of more price-sensitive groups such as young people.
:::

::: example A tax rise {#ex-tax}
Cigarette prices rise by 10% after a tax increase. Using an elasticity of $-0.4$, estimate the fall in consumption (a) with the linear approximation and (b) with the constant-elasticity model $Q = Q_0(1 + \Delta P)^{\varepsilon}$. If total spending was £10 billion, what happens to it?
::: solution
(a) $\%\Delta Q \approx -0.4 \times 10\% = -4\%$.

(b) $Q/Q_0 = 1.10^{-0.4} = 0.9626$, a fall of 3.7%. The approximation is close for small changes.

Spending is price × quantity: $1.10 \times 0.9626 = 1.059$, so spending rises by about 5.9%, to about £10.6 billion. Smokers as a group spend more, and the extra goes mainly to the government as tax. This is the "double dividend" of tobacco taxation: less smoking and more revenue. It is also why help to quit should accompany tax rises, so that people who cannot afford to keep smoking are supported to stop rather than pushed into hardship.
:::
:::

## Tobacco {#tobacco}

Smoking causes cancers of at least 15 sites (lung, mouth, larynx, oesophagus, bladder, pancreas, kidney, cervix and others), coronary heart disease, stroke, peripheral arterial disease, COPD, and harms in pregnancy. In the 50-year follow-up of the British Doctors Study (2004), men who smoked throughout adult life died on average about 10 years earlier than lifelong non-smokers, and about half of persistent smokers were killed by their habit. Stopping at age 30 avoided almost all of the excess risk, and stopping at 50 halved it.

Smoking prevalence among adults in the UK was 10.6% in 2024 (about 5.3 million people), the lowest since records began in 2011, according to the Office for National Statistics. It remains much higher in more deprived areas, among people with mental illness (who smoke a large share of all cigarettes consumed) and in some occupational groups.

**Policy measures in the UK** follow the WHO Framework Convention on Tobacco Control (FCTC, adopted 2003, in force 2005), whose demand-reduction measures the WHO summarises as **MPOWER**: Monitor use; Protect people from smoke; Offer help to quit; Warn about the dangers; Enforce bans on advertising, promotion and sponsorship; Raise taxes. UK milestones include:

- the ban on most tobacco advertising (2002–2003);
- smoke-free enclosed public places and workplaces (2006 in Scotland, 2007 in England and Wales);
- raising the age of sale from 16 to 18 (2007);
- removing tobacco displays from shops (2012–2015) and standardised packaging (2016–2017);
- banning smoking in cars carrying children (2015);
- a ban on the sale of single-use (disposable) vapes (June 2025);
- the **Tobacco and Vapes Act 2026** (Royal Assent 29 April 2026), which makes it an offence to sell tobacco to anyone born on or after 1 January 2009, with the age restrictions applying from 1 January 2027, and introduces licensing of retailers and powers to regulate the flavours, packaging and display of vapes.

**Stop-smoking support.** The most effective approach combines behavioural support from a stop-smoking service with medication (varenicline, cytisine or combination nicotine replacement therapy) or a nicotine vape. Systematic reviews by Cochrane have found high-certainty evidence that nicotine e-cigarettes increase quit rates compared with nicotine replacement therapy. Vapes are not risk-free, and their use by children who have never smoked is a serious concern, which is why marketing and sales to young people are restricted; but for adults who smoke, switching completely to vaping is far less harmful than continuing to smoke.

## Alcohol {#alcohol}

Alcohol causes liver disease, several cancers (mouth, throat, oesophagus, liver, bowel and breast), hypertension, atrial fibrillation, cardiomyopathy, haemorrhagic stroke, pancreatitis, injuries, violence and dependence, and contributes to suicide. There is no level of drinking that is free of cancer risk.

::: definition The UK alcohol unit and low-risk guidelines {#def-units}
One UK **unit** is 10 mL (8 g) of pure ethanol. The number of units in a drink is

$$
\text{units} = \frac{\text{ABV (\%)} \times \text{volume (mL)}}{1000}.
$$ {#eq-units}

The UK Chief Medical Officers' low-risk drinking guidelines (2016) advise that, to keep health risks low, men and women should not drink more than **14 units a week** on a regular basis; that people who drink as much as 14 units should spread it over three or more days; that several drink-free days each week help; and that women who are pregnant or planning a pregnancy should not drink at all.
:::

::: example Counting units {#ex-units}
A 52-year-old man tells his GP that he drinks "a bottle of wine most nights, maybe five nights a week". The wine is 13.5% ABV, and the bottle is 750 mL. How many units does he drink a week? What should happen next?
::: solution
Units per bottle $= 13.5 \times 750/1000 = 10.1$ units. Five bottles a week $= 50.6$ units, more than three times the low-risk guideline.

**Next steps.** Ask about drinking in a structured way with the AUDIT-C, then the full AUDIT if positive, to assess risk and possible dependence (for example morning drinking, withdrawal symptoms). Check for harm: blood pressure, liver function tests and full blood count, and ask about mood, sleep and injuries. Give a brief intervention: personalised feedback about his drinking compared with the guideline, the risks that matter to him, and practical goals. If he is dependent, he should not stop suddenly, because of the risk of withdrawal seizures and delirium; he should be referred for assisted withdrawal and treatment through specialist services. Management follows NICE guidance on alcohol-use disorders. Alcohol-related harm and dependence are discussed further in [[psychiatry/substance-use]].
:::
:::

**Alcohol policy.** The WHO's "best buys" for alcohol are raising prices through taxation or pricing policies, restricting physical availability (hours, outlets, age of sale), and restricting advertising. Other effective measures include drink-driving laws with breath testing.

**Minimum unit pricing** (MUP) sets a floor price per unit of alcohol, below which alcohol cannot be sold. It targets cheap, strong products that are drunk mainly by heavy drinkers, and has little effect on the price of drinks in pubs or on moderate drinkers. Scotland introduced MUP at 50p per unit in May 2018 and raised it to 65p in September 2024. Wales introduced MUP at 50p in 2020 and raised it to 65p in October 2026. An evaluation published in *The Lancet* in 2023 estimated that MUP in Scotland was associated with a 13.4% reduction in deaths wholly attributable to alcohol, compared with what would have been expected, with the largest falls in the most deprived areas. England and Northern Ireland have not introduced MUP.

## Diet, obesity and physical activity {#diet}

Unhealthy diets (high in salt, sugar, processed meat and energy-dense foods, and low in fruit, vegetables, whole grains, legumes and nuts) are among the leading global risk factors for death. In England more than a quarter of adults have obesity, and more than a fifth of children in Year 6 (aged 10–11) have obesity according to the National Child Measurement Programme, with prevalence in the most deprived areas about twice that in the least deprived.

Obesity results from an energy imbalance that is driven far more by the environment than by individual willpower. The supply of cheap, energy-dense food, portion sizes, marketing, and a built environment designed for cars have all changed over the period in which obesity has risen, while human biology has not. Policies therefore aim to change the food environment:

- **Fiscal measures.** The **Soft Drinks Industry Levy** (2018) taxes manufacturers of soft drinks with added sugar, with a higher rate above 8 g of sugar per 100 mL and a lower rate above 5 g. Most manufacturers reformulated to stay below the thresholds, and the sugar content of drinks sold fell substantially. From 1 January 2028 the lower threshold falls to 4.5 g per 100 mL and pre-packaged milk-based drinks with added sugar come into scope.
- **Reformulation programmes** for salt, sugar and calories, with targets for industry. Salt reduction from 2003 was followed by falls in measured salt intake.
- **Marketing restrictions.** Since 5 January 2026, advertising of identifiable "less healthy" food and drink products in the UK has been banned on television and on-demand services between 5:30 am and 9 pm, and in paid-for online media at any time. Promotions of such products in prominent store locations were restricted in England from 2022.
- **Labelling.** Front-of-pack traffic-light labels and, since 2022, calorie labelling on menus in large food businesses in England.
- **Settings.** School food standards, free school meals and the Healthy Start scheme.

For individuals, NICE recommends multicomponent weight-management programmes, and medicines that act on the GLP-1 receptor (such as semaglutide and tirzepatide) now produce substantial weight loss in trials and are being introduced in the NHS for people meeting NICE criteria. These treatments are valuable but cannot by themselves reverse a population trend driven by the environment, and their cost and supply limit access.

**Physical activity.** The UK Chief Medical Officers' guidelines (2019) recommend that adults do at least **150 minutes** of moderate-intensity activity (or 75 minutes of vigorous activity, or a combination) each week, muscle-strengthening activities on at least two days, and that they minimise prolonged sitting. Children and young people should average at least 60 minutes of moderate-to-vigorous activity a day. Any activity is better than none, and the largest gains come from moving the least active people to doing some. Population measures include safe walking and cycling routes ("active travel"), urban design, school sport and workplace policies; individual measures include brief advice in primary care and exercise referral.

## Preventing cardiovascular disease and cancer {#cvd-cancer}

Cardiovascular prevention combines the population strategy (tobacco control, salt reduction, food policy, active travel) with the high-risk strategy. In England, the **NHS Health Check** invites adults aged 40 to 74 without known cardiovascular disease every 5 years for a check of blood pressure, cholesterol, BMI, smoking, alcohol and physical activity, with a 10-year cardiovascular risk calculated with **QRISK3**. People at increased risk are offered lifestyle support and, where appropriate, statins and treatment for hypertension in line with NICE guidance. Detecting and controlling high blood pressure is one of the most effective interventions: many people with hypertension are undiagnosed or not treated to target.

For cancer, Cancer Research UK estimates that around 4 in 10 cancer cases in the UK are preventable, chiefly through not smoking, keeping a healthy weight, drinking less alcohol, eating a healthy diet, protecting the skin from the sun and avoiding certain infections (HPV and hepatitis B, through vaccination). Screening, the other arm of cancer control, is covered in [[public-health/screening]].

::: example A risk-factor consultation {#ex-health-check}
A 47-year-old woman of Black Caribbean heritage attends an NHS Health Check. She does not smoke, drinks about 6 units a week, walks little, and has a BMI of 32 kg/m². Her blood pressure is 152/96 mmHg, total cholesterol 5.9 mmol/L and HbA1c 44 mmol/mol (6.2%). Outline the next steps.
::: solution
**Confirm the blood pressure.** A single raised reading in a check is not a diagnosis. Following NICE guidance on hypertension, offer ambulatory (or home) blood pressure monitoring to confirm it, and look for target-organ damage (urine albumin:creatinine ratio, electrolytes and eGFR, fundoscopy, ECG).

**Glycaemia.** An HbA1c of 42–47 mmol/mol indicates a high risk of type 2 diabetes ("non-diabetic hyperglycaemia"). She should be offered referral to the NHS Diabetes Prevention Programme and annual HbA1c checks.

**Cardiovascular risk.** Calculate her QRISK3 score with the full data; ethnicity, blood pressure, cholesterol and BMI all contribute. Offer a statin if her 10-year risk is 10% or more, after discussion, in line with NICE lipid guidance.

**Lifestyle.** Discuss weight, diet (including salt) and physical activity, using goals that matter to her; offer referral to a weight-management service. Weight loss and reduced salt would also lower her blood pressure.

**Treatment of hypertension** if confirmed: the NICE algorithm recommends a calcium-channel blocker as first-line treatment for people of Black African or African-Caribbean family origin without diabetes, with an angiotensin II receptor blocker preferred over an ACE inhibitor as an addition in this group. Management decisions follow current NICE guidance and are made with the patient.

The case illustrates how several modest risk factors combine into substantial risk, and how a single check can open several routes to prevention.
:::
:::

## The global response {#global}

The WHO's "**best buys**" are the most cost-effective and feasible interventions for NCDs, including tobacco taxes, smoke-free laws, plain packaging and advertising bans; alcohol taxes and restrictions on availability and marketing; salt reduction through reformulation and labelling; public education on physical activity; and drug therapy and counselling for people at high cardiovascular risk. The successful example of North Karelia in Finland, where a community programme from 1972 combined with national policy reduced coronary mortality dramatically, encouraged population approaches worldwide.

Obstacles are considerable. Industries whose products cause NCDs lobby against regulation, litigate and fund research and organisations that favour individual responsibility over policy. Trade agreements can constrain domestic regulation. Health systems in low- and middle-income countries were built for acute and infectious disease and are often poorly equipped for long-term conditions. These issues are developed in [[public-health/global-health]].

::: quiz
A government wants to reduce harm from alcohol as much as possible for a fixed budget. Which approach is supported by the strongest evidence of population benefit?
- [ ] A national media campaign about the risks of drinking.
- [ ] Alcohol education lessons in secondary schools.
- [x] Increasing the price of the cheapest alcohol, through tax or a minimum unit price.
- [ ] Labelling bottles with the number of units.
::: solution
Price measures are among the WHO "best buys" for alcohol. Demand falls when price rises, the effect is greatest among heavy drinkers of cheap alcohol and young people, and minimum unit pricing in Scotland was associated with a reduction in alcohol-specific deaths concentrated in deprived areas. Education campaigns, school lessons and labels are popular and have value for informing people, but evaluations show little effect on drinking on their own.
:::
:::

::: history
In 1950 Richard Doll and Austin Bradford Hill in the UK, and Ernst Wynder and Evarts Graham in the US, published case–control studies linking smoking to lung cancer. Doll and Hill's British Doctors Study, begun in 1951, followed about 34,000 male doctors for 50 years and quantified the lifetime risks of smoking. The Framingham Heart Study, begun in 1948 in Massachusetts, introduced the term "risk factor" and identified high blood pressure, high cholesterol and smoking as causes of coronary disease. The Royal College of Physicians report *Smoking and Health* (1962) and the US Surgeon General's report (1964) turned the evidence into policy. In 1972 the North Karelia Project in Finland began a community-wide programme to reduce cardiovascular risk factors. The WHO Framework Convention on Tobacco Control, adopted in 2003, became one of the most widely ratified treaties in UN history. In 2011 the first UN High-Level Meeting on NCDs placed them on the global development agenda.
:::

## Where this leads

The principles of prevention behind this chapter are in [[public-health/prevention-promotion]], and the social gradient in NCDs in [[public-health/determinants-inequalities]]. Clinical prevention of cardiovascular disease is covered in [[cardiovascular/hypertension]], of diabetes in [[endocrine/diabetes]], and alcohol and drug use in [[psychiatry/substance-use]]. The global NCD agenda continues in [[public-health/global-health]].

::: summary
- NCDs (cardiovascular disease, cancer, chronic respiratory disease, diabetes) killed at least 43 million people in 2021, 18 million of them before age 70, mostly in low- and middle-income countries. SDG 3.4 aims to cut premature NCD mortality by one-third by 2030.
- Shared behavioural risk factors (tobacco, alcohol, diet, inactivity) act through metabolic risk factors (blood pressure, glucose, lipids, obesity). Attributable fractions overlap and do not sum to 100%.
- The **commercial determinants of health** shape exposure; price is the strongest lever because demand is **inelastic**: taxes reduce consumption and raise revenue, and reduce inequalities.
- **Tobacco**: about half of persistent smokers are killed by smoking. UK adult prevalence was 10.6% in 2024. MPOWER measures, smoke-free laws, standardised packaging and the **Tobacco and Vapes Act 2026** (no sales to anyone born on or after 1 January 2009, from 2027). Vapes help adults to quit.
- **Alcohol**: units $=$ ABV × mL/1000; CMO guideline 14 units a week. **Minimum unit pricing** (65p in Scotland and Wales) reduced alcohol deaths in Scotland by an estimated 13.4%.
- **Diet and activity**: the Soft Drinks Industry Levy, reformulation, restrictions on advertising less healthy food (from January 2026) and active travel; CMO guidance of 150 minutes of moderate activity a week.
- The **NHS Health Check** (ages 40–74, every 5 years) applies the high-risk strategy alongside population measures.
:::

## Exercises

::: exercise Units in a drink {level=1 check="round(10*5.2*568/1000)/10"}
How many units are in a pint (568 mL) of beer at 5.2% ABV? Give your answer to 1 decimal place.
::: solution
$5.2 \times 568/1000 = 2.95$, or 3.0 units to 1 decimal place. Four pints contain about 12 units, close to a whole week's low-risk limit.
:::
:::

::: exercise Minimum price {level=1 check="18.2"}
Under a minimum unit price of 65p, what is the lowest price (in pounds) at which a 700 mL bottle of vodka at 40% ABV can be sold?
::: solution
Units $= 40 \times 700/1000 = 28$. Minimum price $= 28 \times £0.65 = £18.20$.
:::
:::

::: exercise A week's drinking {level=1 check="round(10*12*175/1000*5)/10"}
A woman drinks a 175 mL glass of wine at 12% ABV five evenings a week. How many units does she drink a week? Give your answer to 1 decimal place.
::: solution
Units per glass $= 12 \times 175/1000 = 2.1$. Per week $= 2.1 \times 5 = 10.5$ units: within the guideline, though she might be advised to have several drink-free days, as she does.
:::
:::

::: exercise Combined attributable fraction {level=2 check="round(100*(1-(1-0.25)*(1-0.15)*(1-0.10)))/100"}
For a disease, the population attributable fractions of three independent risk factors are 25%, 15% and 10%. What fraction of cases is attributable to at least one of them? Give your answer as a decimal to 2 decimal places.
::: solution
Fraction attributable to none $= 0.75 \times 0.85 \times 0.90 = 0.574$. Combined PAF $= 1 - 0.574 = 0.426$, or 0.43 to 2 decimal places, compared with a sum of 0.50.
:::
:::

::: exercise Elasticity {level=2 check="-10"}
The price elasticity of demand for alcohol among young adults is estimated at $-0.5$. Using the linear approximation, by what percentage would their consumption change after a 20% price rise? (Give a signed number.)
::: solution
$\%\Delta Q \approx -0.5 \times 20\% = -10\%$. Consumption falls by about 10%.
:::
:::

::: exercise Population attributable fraction of smoking {level=2 check="round(1000*0.11*19/(1+0.11*19))/10"}
Suppose 11% of adults smoke and the relative risk of lung cancer in smokers compared with never-smokers is 20. Using $PAF = p(RR-1)/[1 + p(RR-1)]$, calculate the PAF as a percentage to 1 decimal place. Why is the true fraction of lung cancers attributable to smoking higher than this today?
::: solution
$p(RR - 1) = 0.11 \times 19 = 2.09$. $PAF = 2.09/3.09 = 0.676$, or 67.6%.

Lung cancer develops decades after exposure, so the relevant prevalence is that of smoking 20–40 years ago, which was much higher than 11%. Former smokers also remain at increased risk, and this simple formula treats them as unexposed. Estimates that account for past smoking attribute over 70% of UK lung cancers to smoking.
:::
:::

::: exercise Designing a smoke-free generation {level=3}
The Tobacco and Vapes Act 2026 prohibits the sale of tobacco to anyone born on or after 1 January 2009. Discuss the arguments for and against this policy, and how its effects could be evaluated.
::: solution
**For.** Almost all smokers start before age 21, so preventing uptake in young people would, over time, nearly eliminate smoking. Tobacco is uniquely harmful when used as intended, and nicotine is highly addictive, so the "choice" to smoke is made by children and then constrained by dependence. A rising age of sale does not take anything away from current adult smokers. It sends a clear signal and can be enforced through retailer licensing.

**Against.** It treats adults born on different days differently; enforcement may be difficult as the age of the restricted cohort rises; it may increase illicit trade; and some argue that adults should be free to accept risks. There is little direct evidence, because no country has fully implemented such a law (New Zealand repealed its version before it took effect).

**Evaluation.** Monitor smoking uptake by birth cohort with large surveys, comparing cohorts born just before and after the cut-off (a natural experiment) and comparing with other countries; track retailer compliance with test purchases; monitor illicit tobacco market share and vaping among young people; and in the long term, measure smoking-related disease in the affected cohorts.
:::
:::

::: exercise Choosing interventions for obesity {level=3}
A local authority has a budget to reduce childhood obesity. It is considering (a) a weight-management programme for children with obesity, (b) restricting new hot-food takeaways near schools through planning policy, (c) a campaign encouraging parents to cook healthy meals, and (d) school-based physical activity and healthier school food. Evaluate each in terms of reach, likely effect and equity.
::: solution
(a) Targeted programmes help individual families and are needed, but reach few children, have modest and often short-lived effects, and depend on parental time and resources. Low reach, modest effect, and equity depends on making them accessible.

(b) Planning restrictions change the environment for all children around schools, at low cost, and act in areas where takeaways are concentrated, which are often deprived. Evidence of an effect on obesity is limited and mostly observational, but the measure is structural and likely to be equitable. High reach, uncertain effect.

(c) Information campaigns are popular but rely on time, money, skills and cooking facilities that many families lack. Low effect and likely to widen inequalities.

(d) School-based measures reach almost all children, regardless of family resources, every day. Evidence for school food standards and activity programmes shows modest benefits. High reach and equitable.

A combination emphasising (b) and (d), with (a) for children who need it, fits the evidence and the principle of proportionate universalism, and the authority could also support national measures such as marketing restrictions and the Soft Drinks Industry Levy.
:::
:::
