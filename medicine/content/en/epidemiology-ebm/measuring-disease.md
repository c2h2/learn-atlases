A district reports 300 people living with multiple sclerosis and 12 new diagnoses this year. A newspaper says deaths from a cancer have "doubled". A drug leaflet says a side effect is "common". Each statement is a measurement of disease, and each one can mean very different things depending on what was counted, in whom, and over what period.

Epidemiology starts with counting. Before we can ask whether smoking causes lung cancer or whether a drug prevents strokes, we need precise ways to say how much disease there is and how fast it is appearing. This chapter builds that vocabulary: prevalence, incidence, mortality and survival measures, standardisation, and the measures that compare two groups. Later chapters use every one of these terms.

## Counting cases {#counting}

Every measure of disease frequency is a fraction. The numerator counts cases. The denominator counts the people who could have become cases. Most errors in reading epidemiological numbers come from not asking what sits on each side of the fraction.

::: definition Case definition and population at risk {#def-case}
A **case definition** is the set of criteria a person must meet to be counted as having the condition. It may be clinical (symptoms and signs), laboratory based, or a combination, and it often has levels of certainty such as *suspected*, *probable* and *confirmed*.

The **population at risk** is the group of people who are capable of developing the condition during the period of observation. People who already have the condition, or who cannot get it, are excluded from the denominator of an incidence measure.
:::

Two examples show why both parts matter. A woman who has had a hysterectomy is not at risk of cancer of the cervix, so including her in the denominator lowers the apparent incidence. And if a surveillance system changes its case definition, say from "confirmed by culture" to "confirmed by culture or by PCR", the number of cases can rise sharply although nothing has changed in the population. When a count jumps, the first question is always whether the definition, the test or the reporting changed.

## Prevalence {#prevalence}

::: definition Prevalence {#def-prevalence}
**Prevalence** is the proportion of a population that has the condition at a given time:

$$
\text{prevalence} = \frac{\text{number of people with the condition}}{\text{number of people in the population}}
$$

**Point prevalence** refers to a single moment (for example, 1 January). **Period prevalence** counts everyone who had the condition at any time during an interval (for example, during the past 12 months). Prevalence is a proportion. It has no units and lies between 0 and 1, though it is often written as a percentage or per 1,000 or per 100,000.
:::

Prevalence describes the burden of disease. It tells a health service how many people need a diabetes clinic, how many inhalers to buy, or how many hospital beds are occupied by people with dementia. It is what a cross-sectional survey measures, because a survey looks at a population at one point in time.

Prevalence does not tell us about risk. A condition can be highly prevalent because it is common to develop or because people live with it for a long time. Type 2 diabetes and HIV infection in countries with good access to antiretroviral therapy are prevalent mainly because people survive with them for decades. A rapidly fatal cancer can have a high incidence and a low prevalence.

## Incidence {#incidence}

Incidence measures the occurrence of *new* cases. There are two versions, and they answer different questions.

::: definition Incidence: risk and rate {#def-incidence}
The **cumulative incidence**, or **risk**, is the proportion of an initially disease-free population that develops the condition during a stated period:

$$
\text{risk} = \frac{\text{new cases during the period}}{\text{people at risk at the start of the period}}
$$

A risk is a probability. It must always be quoted with its time period ("the 10-year risk of a heart attack is 12%").

The **incidence rate** divides new cases by the total **person-time** at risk, the sum of the time each person was observed while free of the condition:

$$
\text{incidence rate} = \frac{\text{new cases}}{\text{total person-time at risk}}
$$

Its units are "per person-year" (or per 1,000 person-years, and so on). A rate is not a probability. It describes how fast new cases arise, like speed describes how fast distance is covered.
:::

Risk is the natural measure when everyone is followed for the same period, as in a short trial or an outbreak. Rates are needed when people enter and leave observation at different times: they join a registry late, move away, die of something else, or develop the outcome and so stop contributing time at risk. Person-time handles all of these by giving each person credit only for the time they were actually observed and at risk.

::: example Person-time in a dialysis unit {#ex-persontime}
A dialysis unit follows 40 patients for up to 2 years to measure the occurrence of line infections. Thirty patients complete 2 years without infection. Six develop an infection, on average after 1 year. Four transfer to another unit after 6 months, free of infection. Calculate the incidence rate, and explain why "6 out of 40" is not a satisfactory answer.
::: solution
Add up the time at risk:

- 30 patients × 2 years = 60 person-years
- 6 patients × 1 year = 6 person-years (each stops contributing at the time of infection)
- 4 patients × 0.5 years = 2 person-years

Total person-time = 68 person-years. The incidence rate is $6/68 = 0.088$ per person-year, or about 88 per 1,000 person-years.

The figure 6/40 = 15% treats the four transferred patients as if they had been followed for the full 2 years and stayed infection-free. We do not know that. They might have developed an infection after transfer. The person-time approach uses exactly the information we have and no more.
:::

:::

::: warning "Rate" is not a synonym for "proportion"
Newspapers, and many papers, call any fraction a "rate": the "prevalence rate", the "case fatality rate", the "attack rate". Strictly, a rate has time in its denominator. A prevalence of 8% is not a rate, and neither is a 5-year risk of 12%. The distinction matters when you compare studies: a rate of 10 per 1,000 person-years and a 10-year risk of 10% are not the same quantity, and they only approximately agree when the outcome is uncommon. When you read "rate", check the units. If there is no time unit, it is a proportion.
:::

## How incidence and prevalence are linked {#linking}

Think of a population as a bath. New cases flow in through the tap at the incidence rate. Cases leave through the plughole by recovery or death. The water in the bath at any moment is the prevalence pool. If the tap and the plughole are steady, the level settles where inflow equals outflow.

::: theorem Prevalence, incidence and duration {#thm-prev-inc}
In a stable population in which the incidence rate $I$ and the mean duration of the condition $D$ do not change over time,

$$
\frac{P}{1-P} = I \times D
$$ {#eq-prev-odds}

where $P$ is the prevalence. When the condition is uncommon ($P$ below about 10%), $1-P$ is close to 1 and

$$
P \approx I \times D.
$$ {#eq-prev-approx}
:::

::: proof
Suppose the population contains $N$ people, of whom $NP$ have the condition and $N(1-P)$ do not. New cases arise only among those without the condition, so the number of new cases per year is $I \times N(1-P)$. Cases end, by recovery or death, at a rate of $1/D$ per case per year, so the number leaving the pool per year is $NP/D$.

In a steady state, the inflow equals the outflow:

$$
I \, N(1-P) = \frac{NP}{D}.
$$

Dividing both sides by $N(1-P)$ and multiplying by $D$ gives $P/(1-P) = I D$. When $P$ is small, $P/(1-P) \approx P$, which gives the approximation.
:::

The relation explains several patterns that surprise people. A treatment that keeps people alive longer without curing them *raises* prevalence, because $D$ increases. This happened with HIV after effective antiretroviral therapy, and it happens with many cancers as survival improves. Conversely, a disease can become less prevalent either because fewer people develop it or because people die of it faster. Prevalence alone cannot tell these apart.

::: example Prevalence from incidence and duration {#ex-prevalence}
In a fictional population the incidence of a chronic condition is 4 per 1,000 person-years, and people live with it for an average of 20 years. Estimate its prevalence, assuming a steady state.
::: solution
$I = 0.004$ per year and $D = 20$ years, so $I \times D = 0.08$.

The approximation gives $P \approx 0.08$, or 8%.

The exact relation gives $P/(1-P) = 0.08$, so $P = 0.08/1.08 = 0.074$, or 7.4%.

The approximation overestimates prevalence a little because the condition is not rare. Both answers depend on the steady-state assumption, which fails if incidence is rising, if survival is improving, or if migration changes the population.
:::

:::

::: widget plot
f: a*x/(1+a*x); a*x
x: 0, 40
y: 0, 0.7
sliders: a=0.01:0.001:0.05:0.001
labels: \text{exact prevalence}; I \times D
caption: Steady-state prevalence against the mean duration of a condition (years), for an incidence rate $a$ per person-year set by the slider. The straight line is the approximation $P \approx I \times D$. The two agree while prevalence is low and separate as the condition becomes common. This is a simplified model that assumes a stable population.
:::

## Mortality and survival {#mortality}

Death is the most reliably recorded health event, and mortality statistics are the oldest data in epidemiology. Several measures are in routine use, and their denominators differ.

::: definition Common mortality and survival measures {#def-mortality}
- The **crude mortality rate** is the number of deaths in a year divided by the mid-year population, usually per 1,000 or per 100,000 per year.
- The **cause-specific mortality rate** counts only deaths from one cause, using the same denominator.
- The **case fatality** (often called the case fatality rate or ratio) is the proportion of people with a condition who die of it within a stated period. Its denominator is cases, not the whole population.
- The **infant mortality rate** is the number of deaths under 1 year of age per 1,000 live births in the same year.
- The **maternal mortality ratio** is the number of maternal deaths per 100,000 live births.
- The **5-year survival** is the proportion of people with a diagnosis who are alive 5 years later. **Net survival** (or relative survival) compares this with the survival expected in people of the same age and sex in the general population, so that deaths from other causes are allowed for.
:::

Case fatality and mortality rate are often confused. Suppose a town of 50,000 has an outbreak with 400 cases and 12 deaths. The case fatality is 12/400 = 3%: it describes how dangerous the disease is for someone who catches it. The mortality rate from the outbreak is 12/50,000, or 24 per 100,000: it describes the impact on the whole town. A disease can have a high case fatality and a low population mortality if few people catch it, and the reverse.

Survival figures need care too. Survival measured from diagnosis gets longer if diagnosis happens earlier, even when the date of death does not change at all. This is **lead-time bias**, discussed in [[epidemiology-ebm/bias-confounding]], and it is the reason screening programmes are judged by mortality, not by survival from diagnosis.

When people are followed for different lengths of time, survival is estimated with the **Kaplan–Meier method**. The follow-up time is divided at each death. At each death, the probability of surviving that moment is the number who survive divided by the number still under observation. Multiplying these probabilities gives the survival curve. People who leave the study alive are **censored**: they count in the denominator up to the time they leave and then drop out of it. The method and the hazard ratio used to compare two curves are covered in [[epidemiology-ebm/statistics-for-clinicians]].

## Comparing populations fairly: standardisation {#standardisation}

Crude mortality rates are dominated by age. A seaside town full of retired people will have a higher crude death rate than a university town, even if every age group in the seaside town is healthier. To compare populations with different age structures we standardise.

::: definition Direct and indirect standardisation {#def-standardisation}
**Direct standardisation** applies the age-specific rates of each study population to a single **standard population** (for example the 2013 European Standard Population). The result, the **age-standardised rate**, is the rate each population would have if it had the standard age structure. Direct standardisation needs reliable age-specific rates in each population.

**Indirect standardisation** goes the other way. It applies the age-specific rates of a reference population (often the national rates) to the age structure of the study population. This gives the number of **expected** deaths. The **standardised mortality ratio** is

$$
\text{SMR} = \frac{\text{observed deaths}}{\text{expected deaths}},
$$

often multiplied by 100. An SMR of 100 means mortality is as expected for the age structure; 150 means 50% more deaths than expected. Indirect standardisation is used when the study population is small, so its own age-specific rates would be unstable.
:::

::: example Two towns {#ex-direct}
Two fictional towns each have 10,000 residents. Their age structure and age-specific mortality rates (deaths per 1,000 per year) are:

| Age group | Town A population | Town A rate | Town B population | Town B rate | Standard population |
|---|---|---|---|---|---|
| Under 45 | 2,000 | 1 | 6,000 | 1.5 | 5,000 |
| 45–64 | 3,000 | 5 | 3,000 | 7 | 3,000 |
| 65 and over | 5,000 | 40 | 1,000 | 50 | 2,000 |

Compare the crude and age-standardised mortality rates.
::: solution
**Crude rates.** Town A has $2 + 15 + 200 = 217$ deaths, a crude rate of 21.7 per 1,000. Town B has $9 + 21 + 50 = 80$ deaths, a crude rate of 8.0 per 1,000. Town A looks far worse.

**Directly standardised rates.** Apply each town's rates to the standard population of 10,000:

- Town A: $5 \times 1 + 3 \times 5 + 2 \times 40 = 100$ deaths, so 10.0 per 1,000.
- Town B: $5 \times 1.5 + 3 \times 7 + 2 \times 50 = 128.5$ deaths, so 12.85 per 1,000.

After standardisation, Town B has the higher mortality. Every age-specific rate in Town B is higher than in Town A. Town A's high crude rate came entirely from its older population. Age here is acting as a confounder, a third factor linked both to the "exposure" (living in Town A) and to the outcome (death). Confounding is the subject of [[epidemiology-ebm/bias-confounding]].
:::

:::

::: example An occupational SMR {#ex-smr}
A fictional cohort of 8,000 factory workers records 45 deaths in one year. National death rates per 1,000 per year are 0.8 at ages 20–39, 4 at ages 40–59 and 12 at ages 60–64. The cohort contains 4,000, 3,000 and 1,000 workers in these groups. Calculate the SMR.
::: solution
Expected deaths, using national rates:

- $4{,}000 \times 0.8/1{,}000 = 3.2$
- $3{,}000 \times 4/1{,}000 = 12$
- $1{,}000 \times 12/1{,}000 = 12$

Total expected = 27.2. SMR = $45/27.2 = 1.65$, or 165. The workers had about 65% more deaths than people of the same ages nationally.

Interpreting this needs caution. Workers are usually *healthier* than the general population, because people who are very unwell tend not to be employed. This **healthy worker effect** pushes occupational SMRs below 100, so an SMR of 165 is even more striking than it looks. Also, SMRs from different cohorts should not be compared directly with each other, because each is standardised to its own age structure.
:::

:::

## Comparing groups: measures of association and impact {#association}

Most epidemiological questions compare an exposed group with an unexposed group. There are two ways to compare: by division, which gives a relative measure, and by subtraction, which gives an absolute measure.

::: definition Measures of association and impact {#def-association}
Let $R_1$ be the risk of the outcome in the exposed group and $R_0$ the risk in the unexposed group.

- The **risk ratio** (relative risk) is $RR = R_1/R_0$. The **rate ratio** is the same with incidence rates.
- The **risk difference** (absolute risk difference) is $RD = R_1 - R_0$.
- The **odds** of an outcome are $R/(1-R)$. The **odds ratio** is

$$
OR = \frac{R_1/(1-R_1)}{R_0/(1-R_0)}.
$$

- The **attributable fraction among the exposed** is $(RR-1)/RR$: the proportion of cases among exposed people that would not have occurred without the exposure, if the association is causal.
- The **population attributable fraction** is the proportion of all cases in the population that would not have occurred without the exposure. With $p$ the proportion of the population exposed,

$$
PAF = \frac{p(RR-1)}{1 + p(RR-1)}.
$$
:::

A ratio of 1 and a difference of 0 both mean no association. A risk ratio of 2 means the risk in the exposed is twice that in the unexposed. It says nothing about how large either risk is.

The relative measures describe the *strength* of an association and are the usual currency of causal research. The absolute measures describe the *size* of the effect for individuals and for services. The number needed to treat is simply the reciprocal of a risk difference, and it is developed in [[epidemiology-ebm/statistics-for-clinicians]].

::: example One cohort, five numbers {#ex-cohort-measures}
In a fictional cohort, 200 people exposed to a solvent and 800 unexposed people are followed for 5 years. Thirty of the exposed and 40 of the unexposed develop a liver condition. Calculate the RR, RD, OR, the attributable fraction among the exposed, and the population attributable fraction.
::: solution
$R_1 = 30/200 = 0.15$ and $R_0 = 40/800 = 0.05$.

- $RR = 0.15/0.05 = 3$.
- $RD = 0.15 - 0.05 = 0.10$: 10 extra cases per 100 exposed people over 5 years.
- $OR = (30/170)/(40/760) = 0.1765/0.0526 = 3.35$. The OR is further from 1 than the RR because the outcome is not rare.
- Attributable fraction among the exposed $= (3-1)/3 = 2/3$. About two in three cases among exposed workers would not have occurred without the solvent, if the link is causal.
- Here the cohort itself is the population, with $p = 200/1{,}000 = 0.2$. $PAF = 0.2 \times 2/(1 + 0.2 \times 2) = 0.4/1.4 = 0.286$. Check: the overall risk is $70/1{,}000 = 0.07$, and $(0.07 - 0.05)/0.07 = 0.286$. Removing the exposure would prevent about 29% of all cases.
:::

:::

::: example Reading a headline {#ex-headline}
A newspaper reports that a new contraceptive pill "doubles the risk" of venous thromboembolism. In the fictional study behind it, the annual risk was 2 per 10,000 women with the older pill and 4 per 10,000 with the new one. How should a clinician explain this to a woman choosing a pill?
::: solution
The relative risk is $4/2 = 2$, so the headline is accurate. The risk difference is $4 - 2 = 2$ per 10,000 women per year. Put another way, if 10,000 women switched to the new pill for a year, about 2 additional women would have a clot.

Both numbers are true, and both are needed. The relative risk shows that the pill has a real effect on clotting. The absolute risk shows how small that effect is for one woman over one year, and it can be set against the absolute risks of the alternatives, including the much higher risk of thrombosis during pregnancy. Presenting only relative changes tends to exaggerate harms and benefits alike, which is why good patient information gives absolute numbers, ideally as natural frequencies ("2 in 10,000").
:::

:::

::: quiz
A new treatment for a chronic disease prevents deaths but does not cure anyone. Over the following decade, incidence stays the same. What happens to prevalence?
- [ ] It falls, because fewer people die of the disease.
- [x] It rises, because people live longer with the disease.
- [ ] It stays the same, because incidence has not changed.
- [ ] It cannot change, because prevalence depends only on incidence.
::: solution
Prevalence depends on incidence *and* duration ([[#thm-prev-inc]]). If incidence is unchanged and people live longer with the condition, the mean duration $D$ increases, so the prevalence pool grows. A rising prevalence is therefore not, on its own, evidence that a disease is becoming more common.
:::
:::

## Sources of data {#data}

Epidemiological measures are only as good as the data behind them. The main sources in the UK and most other high-income countries are:

- **Vital registration**: births and deaths, with the cause of death coded from the death certificate using the International Classification of Diseases (ICD).
- **The census**: the denominator for most population rates.
- **Disease registries**: cancer registries, congenital anomaly registers and others that aim to capture every new case in a defined area.
- **Notification and surveillance systems**: for infectious diseases, from clinicians and laboratories.
- **Routine health service data**: hospital admissions, primary care records and prescribing data. These are rich but were collected for care, not research, so diagnoses may be incomplete or coded inconsistently.
- **Surveys**: health surveys measure prevalence of conditions and risk factors that never reach a health service.

Each has typical weaknesses. Death certificates are less accurate for older people with several conditions. Registries depend on complete reporting. Routine data change when coding rules or payment systems change. A trend in a routine dataset should always be checked against a change in how the data were collected.

::: history
Systematic counting of disease began with **John Graunt**, a London haberdasher. In 1662 he published *Natural and Political Observations Made upon the Bills of Mortality*, an analysis of the weekly lists of burials in London. He noticed that more boys than girls were born, that deaths were concentrated in early childhood, and that the city's deaths regularly exceeded its baptisms, so London grew only by migration. He also built a rough table of survival by age, a forerunner of the life table.

Two centuries later, **William Farr** became compiler of abstracts at the new General Register Office for England and Wales in 1839. Farr designed a classification of causes of death, computed rates with proper denominators, and used them to compare districts and occupations. His statistics provided the data that **John Snow** used in 1854 when he compared cholera deaths among households supplied by two London water companies, one drawing water from a sewage-polluted stretch of the Thames. Snow's study was, in effect, an incidence comparison between an exposed and an unexposed group: the basic design of the cohort study.
:::

## Where this leads

The measures in this chapter are the raw material of every study design. [[epidemiology-ebm/observational-studies]] shows which measures each design can estimate. [[epidemiology-ebm/bias-confounding]] explains how a measure can be distorted, as age distorted the crude death rates in [[#ex-direct]]. [[epidemiology-ebm/statistics-for-clinicians]] adds the uncertainty that surrounds every estimate.

::: summary
- Every frequency measure is a fraction: check what is counted as a case and who is in the denominator.
- **Prevalence** is the proportion of a population with a condition at a time. It measures burden and is what cross-sectional surveys estimate.
- **Risk** (cumulative incidence) is the proportion of initially disease-free people who develop the condition over a stated period. The **incidence rate** divides new cases by person-time and has units of "per person-year".
- In a steady state, $P/(1-P) = I \times D$, so $P \approx I \times D$ for uncommon conditions. Longer survival with a disease raises its prevalence.
- Case fatality has cases as its denominator; mortality rates have the whole population. Survival from diagnosis is inflated by earlier diagnosis.
- Crude rates are distorted by age structure. Direct standardisation gives age-standardised rates; indirect standardisation gives the SMR (observed/expected).
- Relative measures (RR, rate ratio, OR) describe the strength of an association; absolute measures (risk difference, attributable fractions) describe its size and public health importance. Report both.
:::

## Exercises

::: exercise Point prevalence {level=1 check="8"}
A survey of 4,250 adults finds 340 people with current asthma. What is the point prevalence, as a percentage?
::: solution
Prevalence = $340/4{,}250 = 0.08$, or 8%.
:::
:::

::: exercise Incidence rate {level=1 check="5"}
A cohort accumulates 3,600 person-years of follow-up and records 18 new cases of a condition. What is the incidence rate per 1,000 person-years?
::: solution
Rate $= 18/3{,}600 = 0.005$ per person-year, which is 5 per 1,000 person-years.
:::
:::

::: exercise Which measure? {level=1}
Which measure of frequency best answers each question? (a) How many people in a district need long-term insulin supplies? (b) Does living near a busy road increase the chance of developing childhood asthma? (c) How dangerous is a new strain of influenza for a person who catches it?
::: solution
(a) Prevalence, because the question is about current burden and service need. (b) Incidence (risk or rate) in exposed and unexposed children, compared by a risk ratio or rate ratio, because the question is about developing a new condition. (c) Case fatality, the proportion of cases who die, because the denominator should be people who are infected, not the whole population.
:::
:::

::: exercise Mortality versus case fatality {level=2 check="24"}
An outbreak in a town of 50,000 people causes 400 cases and 12 deaths. What is the mortality rate from the outbreak per 100,000 population? What is the case fatality?
::: hint
The two measures share a numerator but not a denominator.
:::
::: solution
Mortality rate $= 12/50{,}000 = 0.00024$, which is 24 per 100,000. Case fatality $= 12/400 = 3\%$. The first describes the effect on the town; the second describes the danger to an infected person.
:::
:::

::: exercise Prevalence from incidence {level=2 check="2.91"}
A condition has an incidence of 2 per 1,000 person-years and a mean duration of 15 years. Using the exact steady-state relation $P/(1-P) = I \times D$, find the prevalence as a percentage, rounded to 2 decimal places.
::: solution
$I \times D = 0.002 \times 15 = 0.03$. Then $P = 0.03/1.03 = 0.029126$, which is 2.91%. The approximation $P \approx I \times D$ would give 3.00%.
:::
:::

::: exercise An SMR {level=2 check="125"}
An occupational cohort has 2,000 people aged 40–49, 1,500 aged 50–59 and 500 aged 60–64. National death rates in these groups are 3, 8 and 12 per 1,000 per year. In one year the cohort records 30 deaths. Calculate the SMR, expressed with 100 meaning "as expected".
::: solution
Expected deaths $= 2{,}000 \times 0.003 + 1{,}500 \times 0.008 + 500 \times 0.012 = 6 + 12 + 6 = 24$. SMR $= 30/24 \times 100 = 125$. The cohort had 25% more deaths than expected for its age structure, and the healthy worker effect means the true excess may be larger.
:::
:::

::: exercise Population attributable fraction {level=2 check="33.3"}
A quarter of adults in a population are exposed to a risk factor, which triples the risk of a disease (RR = 3). Assuming the association is causal, what percentage of all cases in the population is attributable to the exposure? Give the answer to 1 decimal place.
::: solution
$PAF = \dfrac{p(RR-1)}{1+p(RR-1)} = \dfrac{0.25 \times 2}{1 + 0.25 \times 2} = \dfrac{0.5}{1.5} = 0.333$, so 33.3%. A strong risk factor affecting a minority can account for a smaller share of cases than a weak risk factor affecting nearly everyone.
:::
:::

::: exercise Direct standardisation {level=3 check="11.35"}
A fictional region has age-specific mortality rates of 0.5, 6 and 60 per 1,000 per year at ages 0–39, 40–69 and 70 and over. A standard population is 50% aged 0–39, 35% aged 40–69 and 15% aged 70 and over. Calculate the directly age-standardised mortality rate per 1,000 per year.
::: hint
Weight each age-specific rate by the share of the standard population in that age group, then add.
:::
::: solution
Standardised rate $= 0.50 \times 0.5 + 0.35 \times 6 + 0.15 \times 60 = 0.25 + 2.1 + 9 = 11.35$ per 1,000 per year. The result is meaningful only for comparison with another population standardised to the same standard.
:::
:::

::: exercise Odds ratio for a common outcome {level=3 check="2.43"}
In a fictional cohort, 120 of 400 exposed people and 90 of 600 unexposed people develop an outcome. Calculate the risk ratio and the odds ratio. Give the odds ratio to 2 decimal places, and explain why the two differ.
::: solution
Risks: $120/400 = 0.30$ and $90/600 = 0.15$, so $RR = 2.0$.

Odds: $120/280 = 0.4286$ and $90/510 = 0.1765$, so $OR = 0.4286/0.1765 = 2.43$.

The OR exceeds the RR because the outcome is common. Odds and risks are close only when risks are small, since then $1-R \approx 1$. Describing an OR of 2.43 as "2.4 times the risk" would overstate the effect. [[epidemiology-ebm/observational-studies]] explains when the OR is a good approximation to the RR.
:::
:::

::: exercise Interpreting a rising prevalence {level=3}
In a fictional country, the recorded prevalence of type 1 diabetes in children doubled over 20 years, while the incidence rose by only 20%. Suggest explanations, and say what further data would help you decide between them.
::: solution
From $P \approx I \times D$, prevalence can rise through incidence or through duration. A 20% rise in incidence cannot by itself double prevalence, so other explanations are likely:

1. **Longer duration within the age band.** Children diagnosed younger remain in the "children with diabetes" pool for more years. Earlier age at onset increases $D$ for a childhood prevalence even though type 1 diabetes is not curable at any age.
2. **Better ascertainment.** A new national register or better coding in primary care may capture cases that were missed before. This changes the recorded numbers without a real change in disease.
3. **Population change**, such as migration of families with affected children, or a change in the denominator.
4. **A non-steady state.** If incidence rose recently and steeply, prevalence lags behind and the simple relation does not hold.

Useful data include age at diagnosis over time, the date and method of case ascertainment, mortality among affected children (which in high-income countries is very low), and checks of the denominator against census data.
:::
:::
