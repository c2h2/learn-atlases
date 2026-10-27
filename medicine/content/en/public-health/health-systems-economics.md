Every health system has less money, staff and time than it could use. A new cancer drug costing £80,000 a course, an extra community nursing team, a smoking cessation service and a shorter waiting list for hip replacements all compete for the same budget. When the NHS pays for one of them, the money is not available for the others. Health economics studies how such choices are made and how they could be made better; health systems research studies how care is financed, organised and delivered, and with what results.

This chapter introduces the basic ideas of health economics (scarcity, opportunity cost and why health care markets do not work like other markets), the methods of economic evaluation (cost-effectiveness analysis, the quality-adjusted life year and the incremental cost-effectiveness ratio), how NICE uses them, and how health systems are financed and organised, with the NHS as the main example. These ideas matter for clinicians, who make most of the decisions that spend health care resources.

## Scarcity and opportunity cost {#scarcity}

::: definition Opportunity cost and efficiency {#def-opportunity}
- **Scarcity**: resources (money, staff, beds, time) are limited relative to the needs and wants they could meet, so choices must be made.
- The **opportunity cost** of using a resource in one way is the benefit that would have been obtained from its best alternative use. In a health system with a fixed budget, the opportunity cost of funding a new treatment is the health lost by the patients whose care is displaced to pay for it.
- **Technical efficiency** means producing a given output with the fewest resources (for example, doing day-case surgery rather than inpatient surgery when outcomes are the same).
- **Allocative efficiency** means distributing resources between different activities so as to produce the greatest total benefit (for example, deciding how much to spend on prevention compared with treatment).
- **Equity** concerns the fairness of the distribution of resources and health. **Horizontal equity** means equal treatment for equal need; **vertical equity** means appropriately unequal treatment for unequal need.
:::

Opportunity cost is easy to forget because the people who lose out are usually invisible: they are not in the room when a decision to fund a new drug is made, and they do not know that a service they might have used was never provided. The benefit of a new treatment is concentrated in identifiable patients; its cost is spread across many unidentifiable ones. Economic evaluation tries to make both sides visible.

### Why health care is different {#market-failure}

In 1963 the economist Kenneth Arrow explained why markets for health care do not behave like markets for ordinary goods. Several features lead to **market failure**, in which an unregulated market would produce an inefficient or unfair result:

- **Uncertainty.** Illness is unpredictable and can be very expensive, so people want insurance; but insurance markets have their own problems.
- **Information asymmetry.** Doctors know much more than patients about what care is needed. Patients rely on doctors as their agents, which creates a risk of **supplier-induced demand** when providers are paid for each item of service.
- **Moral hazard.** People who are insured may use more care than they would if they paid the full price at the point of use.
- **Adverse selection.** If insurers cannot tell who is at high risk, the people who buy insurance will be those who expect to need it, premiums will rise, and low-risk people will drop out. Insurers respond by **risk selection** ("cream-skimming"): avoiding people with pre-existing conditions.
- **Externalities.** Some care benefits others: vaccinating one person protects those around them; treating tuberculosis prevents transmission.
- **Equity.** Many people believe that access to health care should depend on need, not ability to pay.

These failures explain why every high-income country intervenes heavily in health care: through public financing, compulsory insurance, regulation of insurers and professionals, and public provision.

## Economic evaluation {#evaluation}

Economic evaluation compares two or more alternatives in terms of both their costs and their consequences. The main types differ in how they measure consequences:

| Type | Consequences measured as | Example question |
|---|---|---|
| Cost-minimisation analysis | Assumed equal; compare costs only | Is a generic drug cheaper than the branded one, with the same effect? |
| Cost-effectiveness analysis | Natural units (cases detected, life years gained) | What is the cost per case of cancer detected by two screening strategies? |
| Cost-utility analysis | Quality-adjusted life years (QALYs) | What is the cost per QALY gained of a new drug for multiple sclerosis compared with current treatment? |
| Cost-benefit analysis | Money | Do the monetary benefits of a road safety scheme exceed its costs? |

Cost-utility analysis is the form used by NICE, because the QALY allows comparisons across very different areas of health care.

::: definition QALY and ICER {#def-qaly}
A **quality-adjusted life year** (QALY) combines length and quality of life. Each period of life is weighted by a **utility** (health state value) on a scale on which 1 represents full health and 0 represents death (negative values, representing states considered worse than death, are possible). One QALY is one year in full health; two years at a utility of 0.5 is also one QALY.

In the UK, utilities are usually obtained by asking patients to complete the **EQ-5D** questionnaire (mobility, self-care, usual activities, pain or discomfort, anxiety or depression), and converting their answers into a value using preferences elicited from the general public.

The **incremental cost-effectiveness ratio** (ICER) of a new intervention compared with its comparator is

$$
\text{ICER} = \frac{C_{\text{new}} - C_{\text{old}}}{E_{\text{new}} - E_{\text{old}}} = \frac{\Delta C}{\Delta E},
$$ {#eq-icer}

the additional cost per additional QALY gained. The comparator should be the best current alternative, not doing nothing, unless doing nothing is current practice.

The **net monetary benefit** at a threshold $\lambda$ (the value placed on one QALY) is $\text{NMB} = \lambda\,\Delta E - \Delta C$. An intervention is cost-effective at that threshold if its NMB is positive, which is the same as an ICER below $\lambda$ when $\Delta E > 0$.
:::

::: example An ICER for a new drug {#ex-icer}
A new drug for a chronic inflammatory condition costs £3,000 a year more than current treatment, including savings from fewer hospital admissions. Patients live about 10 years with or without it, but it improves their utility from 0.60 to 0.75. Calculate the ICER (a) without discounting and (b) discounting both costs and QALYs at 3.5% a year, with costs and QALYs in the first year not discounted.
::: solution
(a) Each year: $\Delta C = £3{,}000$ and $\Delta E = 0.15$ QALY. Over 10 years, $\Delta C = £30{,}000$ and $\Delta E = 1.5$ QALYs. ICER $= 30{,}000/1.5 = £20{,}000$ per QALY.

(b) The discount factor for year $t$ (with $t = 0$ for the first year) is $1/1.035^{t}$. Summing over $t = 0, \ldots, 9$ gives 8.608. Discounted $\Delta C = 3{,}000 \times 8.608 = £25{,}823$; discounted $\Delta E = 0.15 \times 8.608 = 1.291$ QALYs. ICER $= 25{,}823/1.291 = £20{,}000$ per QALY.

Because costs and benefits occur evenly over the same years and are discounted at the same rate, discounting does not change the ICER here. It does change the ICER when costs and benefits occur at different times. For prevention, costs come now and benefits years later, so discounting makes prevention look less cost-effective.
:::
:::

**Discounting.** People and societies generally prefer benefits now to benefits later, and money spent now could otherwise be invested. Economic evaluations therefore convert future costs and outcomes to their **present value**: a cost or outcome $X$ occurring in $t$ years is worth $X/(1 + r)^{t}$ now, at a discount rate $r$. NICE uses 3.5% a year for both costs and health effects in its reference case, with 1.5% considered in some cases where benefits are long-lasting.

::: widget plot
f: 100*(1 + r)^(-x)
x: 0, 50
y: 0, 100
sliders: r=0.035:0:0.1:0.005
labels: \text{present value of 100 (QALYs or £)}
caption: The present value of 100 units of cost or health occurring x years in the future, at a discount rate r. At NICE's standard rate of 3.5%, 100 QALYs gained in 20 years are worth about 50 today, and in 50 years about 18. Move the slider to see how strongly the choice of rate affects interventions such as childhood vaccination or smoking prevention, whose benefits come decades later.
:::

### The cost-effectiveness plane and dominance {#plane}

Results are often shown on the **cost-effectiveness plane**, with the difference in effect on the horizontal axis and the difference in cost on the vertical axis. An intervention that is cheaper and more effective than its comparator (bottom right) **dominates** it, and should be adopted. One that is more costly and less effective (top left) is **dominated** and should be rejected. In the other two quadrants (more effective but more costly, or less effective but cheaper) a judgement is needed, using the ICER and a threshold.

When several options are compared, they are ranked by effectiveness, dominated options are removed, and ICERs are calculated for each option compared with the next less effective option that remains.

::: example Choosing among several strategies {#ex-dominance}
A health board is choosing a strategy to prevent a complication. Discounted costs and QALYs per patient compared with no programme (A) are: B costs £4,000 and gains 0.10 QALY; C costs £8,000 and gains 0.25 QALY; D costs £20,000 and gains 0.30 QALY; E costs £10,000 and gains 0.20 QALY. Which strategy should be chosen at a threshold of £35,000 per QALY?
::: solution
**Strict dominance.** E costs more than C and gains fewer QALYs, so E is dominated and removed.

**Extended dominance.** Compared with A, B has an ICER of $4{,}000/0.10 = £40{,}000$ per QALY, while C has an ICER of $8{,}000/0.25 = £32{,}000$. B is less effective than C but has a higher ICER, so a mixture of A and C could achieve B's effect more cheaply; B is **extendedly dominated** and removed.

**Remaining options.** A, C, D. ICER of C against A $= £32{,}000$ per QALY. ICER of D against C $= (20{,}000 - 8{,}000)/(0.30 - 0.25) = £240{,}000$ per QALY.

At £35,000 per QALY, C is cost-effective compared with A, but D is not compared with C. Choose **C**. Comparing D with A directly (ICER £66,667) would hide the fact that most of D's extra cost buys very little extra health compared with C.
:::
:::

### NICE and the threshold {#nice}

The **National Institute for Health and Care Excellence** (NICE), established in 1999, appraises new medicines and other technologies for the NHS in England (Wales and Northern Ireland generally follow its technology appraisals; Scotland has the Scottish Medicines Consortium). When NICE recommends a medicine in a technology appraisal, NHS commissioners in England must fund it, normally within 90 days.

NICE's reference case uses QALYs measured with the EQ-5D, costs from the perspective of the NHS and personal social services, and a 3.5% discount rate. For many years it judged interventions with an ICER below **£20,000 per QALY** as usually cost-effective and those between £20,000 and £30,000 as acceptable with additional considerations. Following a government decision in 2025, the range was raised to **£25,000 to £35,000 per QALY** for appraisals from April 2026. Special arrangements apply: highly specialised technologies for very rare diseases are appraised against much higher thresholds, and since 2022 a **severity modifier** gives extra weight (multiplying QALY gains by 1.2 or 1.7) to treatments for conditions that cause a large proportion of a person's expected remaining healthy life to be lost. Many medicines are recommended only after the company agrees a confidential discount (a "patient access scheme"), and some through the **Cancer Drugs Fund** or managed access while more evidence is collected. The **Voluntary Scheme for Branded Medicines Pricing, Access and Growth** (VPAG) caps the growth of NHS spending on branded medicines, with companies paying back a proportion of sales above the cap.

::: theorem The opportunity cost argument for a threshold {#thm-threshold}
With a fixed budget, adopting a new intervention that costs more than current care improves total population health only if the health it gains is greater than the health lost from the services displaced to pay for it. If displaced services produce health at a cost of $k$ pounds per QALY at the margin, then a new intervention with an ICER above $k$ reduces total health, even though it benefits its own patients. The cost-effectiveness threshold should therefore reflect the marginal productivity of the health system.
:::

::: proof
Suppose the new intervention adds cost $\Delta C$ and gains $\Delta E$ QALYs. Under a fixed budget, $\Delta C$ must be found by cutting or not expanding other services, which at the margin produce one QALY per $k$ pounds; the health lost is $\Delta C/k$. The net effect on population health is $\Delta E - \Delta C/k$, which is positive only if $\Delta C/\Delta E < k$, that is, ICER $< k$. Claxton and colleagues (2015) estimated the marginal productivity of NHS spending in England at about £13,000 per QALY, below the NICE threshold; if that estimate is correct, interventions approved with ICERs between £13,000 and the threshold displace more health than they create. The estimate is contested, and the threshold set by policy also reflects other aims, such as supporting the life sciences industry.
:::

::: example Budget impact and displaced health {#ex-budget}
A new treatment is recommended with an ICER of £30,000 per QALY. It will cost the NHS an extra £10 million a year and gain 333 QALYs a year. If displaced NHS services produce one QALY for every £13,000 at the margin, what is the net effect on population health?
::: solution
Health lost from displaced services $= 10{,}000{,}000/13{,}000 \approx 769$ QALYs a year.

Net effect $= 333 - 769 = -436$ QALYs a year.

The treatment is "cost-effective" by the policy threshold, yet on these assumptions it reduces total population health. The losers would be patients whose care is delayed or not provided, often in services with less political visibility, such as mental health or community care. This example illustrates why the threshold matters and why some economists argue it should be lower; others argue that the marginal productivity estimate is too uncertain, or that the NHS budget is not truly fixed. A budget impact analysis, separate from cost-effectiveness, tells commissioners whether the service is affordable in the short term.
:::
:::

**Criticisms of the QALY.** QALYs are valued equally regardless of who receives them, which some regard as fair and others regard as ignoring factors people care about, such as severity, rarity, the end of life and whether a person has dependants. QALYs may undervalue treatments for people with disabilities or long-term conditions, whose quality of life cannot rise to 1, and may miss benefits outside health, such as to carers. The EQ-5D is insensitive in some conditions, for example in mental health and hearing loss. Measures such as the **ICECAP** capability instruments and **wellbeing-adjusted life years** have been proposed as alternatives or supplements.

## Health systems and financing {#systems}

::: definition Health system {#def-health-system}
The WHO defines a **health system** as all the organisations, people and actions whose primary intent is to promote, restore or maintain health. Its framework describes six **building blocks**: service delivery; health workforce; health information systems; access to essential medicines, vaccines and technologies; financing; and leadership and governance. The goals of a health system are improved health (level and equity), **responsiveness** (treating people with dignity and meeting their non-health expectations), **financial protection** (fairness in financing), and efficiency.

**Health financing** has three functions: **revenue collection** (raising money), **pooling** (sharing financial risk across the population, so that the healthy subsidise the sick), and **purchasing** (paying providers for services).
:::

Countries finance health care in four main ways, and most use a mixture:

- **General taxation** (the "Beveridge" model): the NHS in the UK, and systems in Scandinavia, Spain and Italy. Coverage is universal and based on residence; services are largely free at the point of use; the government controls the overall budget.
- **Social health insurance** (the "Bismarck" model): Germany, France, the Netherlands and Japan. Compulsory contributions from employers and employees go to insurance funds (sickness funds), with the state covering people without work. Providers are often a mix of public, non-profit and private.
- **Private health insurance**: voluntary premiums, often through employers, as for much of the working-age population in the United States. Without regulation, it tends to exclude high-risk people; in most countries it supplements public coverage.
- **Out-of-pocket payments**: patients pay providers directly. They are the least equitable form of financing, deter use of necessary care and cause catastrophic expenditure; they make up a large share of health spending in many low-income countries ([[public-health/global-health]]).

**Paying providers.** The way providers are paid affects what they do. **Fee-for-service** encourages more activity (and supplier-induced demand); **salaries** do not reward productivity; **capitation** (a fixed amount per registered person, as for UK general practice) encourages efficiency and prevention but risks under-provision and avoiding complex patients; **case-based payment** (a fixed price per episode, as in diagnosis-related groups and the former NHS "payment by results") rewards efficiency per case but can encourage early discharge and more admissions. **Pay-for-performance** schemes reward measured quality: the **Quality and Outcomes Framework** (QOF), introduced for UK general practice in 2004, improved recording and some process measures, but evidence of effects on mortality is weak, and unmeasured aspects of care can suffer.

### The NHS {#nhs}

The NHS was founded on 5 July 1948, based on the principles that it should meet the needs of everyone, be free at the point of delivery, and be based on clinical need, not ability to pay. Health policy is devolved: NHS England, NHS Scotland, NHS Wales and Health and Social Care in Northern Ireland are organised differently. Northern Ireland has integrated health and social care since 1973; Scotland and Wales abolished the internal market and organise care through health boards.

In England, the **Health and Care Act 2022** created 42 **integrated care systems** (ICSs) from July 2022, each with an **integrated care board** (ICB) that plans and commissions most NHS services for its population, and an integrated care partnership with local authorities. The Act moved away from the competition-based approach of the Health and Social Care Act 2012. In March 2025 the government announced that NHS England would be abolished and its functions merged into the Department of Health and Social Care, with ICBs asked to reduce their running costs substantially. The **10 Year Health Plan** for England, published in July 2025, set out three "shifts": from hospital to community, from analogue to digital, and from sickness to prevention.

Adult **social care** is funded and organised separately, by local authorities, and is means-tested; people with assets above a threshold pay for their own care. The boundary between free NHS care and means-tested social care, and the shortage of social care staff and funding, are major sources of delayed hospital discharges and of unequal access.

::: example A health system choice {#ex-financing}
A middle-income country with a large informal labour sector wants to move towards universal health coverage. One adviser proposes a social health insurance scheme funded by payroll contributions; another proposes expanding tax-funded primary care. Compare the options.
::: solution
**Social health insurance funded by payroll contributions** works well where most people are formally employed. Where much of the workforce is informal (farmers, traders, domestic workers), contributions are hard to collect, so the scheme would initially cover mainly better-off formal workers and civil servants. Covering others requires government subsidies from tax revenue, so the system ends up partly tax-funded anyway. Multiple funds fragment the risk pool unless they are merged or risk-equalised.

**Tax-funded services** can cover everyone from the start, based on residence, and pool risk across the whole population. The constraints are the country's tax capacity and the political priority given to health. Expanding primary care first reaches the poorest people and addresses common conditions efficiently.

**In practice**, countries that have made rapid progress (for example Thailand's Universal Coverage Scheme in 2002) have used general revenue to cover the informal sector, removed or reduced user fees, defined a benefits package using evidence on cost-effectiveness, and paid providers by capitation for primary care. Whichever model is chosen, financial protection requires limiting out-of-pocket payments, and coverage should be monitored by income group.
:::
:::

::: warning Cost-effective is not the same as cheap or affordable
"Cost-effective" means that an intervention offers good value for the health it produces compared with the alternatives at a given threshold. A cost-effective intervention may still increase spending (most do), and a cheap one may be poor value if it does little good. An intervention can also be cost-effective but unaffordable in the short term, if it would be given to very many people: this is why budget impact matters as well. Conversely, "saving money" is rarely the right test for prevention: most preventive interventions improve health at an acceptable cost rather than saving money, and few treatments are expected to pay for themselves.
:::

::: quiz
A new drug gains 0.5 QALY per patient compared with current treatment and costs £20,000 more per patient. Which statement is correct?
- [ ] The drug dominates current treatment.
- [x] The ICER is £40,000 per QALY, which is above NICE's normal threshold range from April 2026.
- [ ] The ICER is £10,000 per QALY.
- [ ] The drug should be rejected because it increases costs.
::: solution
ICER $= 20{,}000/0.5 = £40{,}000$ per QALY, above £25,000–£35,000. NICE would be unlikely to recommend it at this price unless a severity modifier, special considerations or a price discount applied. It does not dominate because it costs more. Increasing costs alone is not a reason to reject an intervention: almost all new treatments cost more; the question is whether the extra health justifies the extra cost.
:::
:::

::: history
William Beveridge's report *Social Insurance and Allied Services* (1942) identified disease as one of five "giant evils" and assumed a comprehensive health service. Aneurin Bevan, as Minister of Health, launched the NHS on 5 July 1948; earlier, Otto von Bismarck had introduced compulsory sickness insurance for German workers in 1883. Kenneth Arrow's 1963 paper "Uncertainty and the welfare economics of medical care" founded health economics as a field. In 1971 Julian Tudor Hart described the "inverse care law": the availability of good medical care tends to vary inversely with the need for it in the population served. Alan Williams's 1985 analysis of the cost per QALY of coronary artery bypass grafting helped establish QALYs in British policy. NICE was established in 1999 and its threshold range was first stated explicitly in the early 2000s. The Health and Social Care Act 2012 increased the role of competition; the Health and Care Act 2022 reversed much of it in favour of integration.
:::

## Where this leads

The economic evaluation of screening and prevention programmes uses the methods in this chapter; see [[public-health/screening]] and [[public-health/prevention-promotion]]. Global financing and universal health coverage are discussed in [[public-health/global-health]]. Evidence on effectiveness, which economic evaluations depend on, comes from the methods in [[epidemiology-ebm/critical-appraisal]].

::: summary
- **Opportunity cost**: in a fixed budget, funding one service means the health benefit of the next best use is lost. Efficiency may be technical or allocative; equity may be horizontal or vertical.
- Health care markets fail because of **uncertainty, information asymmetry, moral hazard, adverse selection and externalities**, so governments intervene.
- Economic evaluation types: cost-minimisation, cost-effectiveness, **cost-utility** (QALYs; used by NICE) and cost-benefit.
- **QALY** = years × utility; **ICER** = ΔC/ΔE; **NMB** = λΔE − ΔC. Dominated and extendedly dominated options are removed before ICERs are calculated. Costs and QALYs are **discounted** at 3.5% a year.
- NICE's threshold range is **£25,000–£35,000 per QALY** from April 2026 (previously £20,000–£30,000), with separate arrangements for very rare diseases and a severity modifier. The threshold should reflect the health displaced elsewhere; one estimate of NHS marginal productivity is about £13,000 per QALY.
- Financing: general taxation (Beveridge), social insurance (Bismarck), private insurance and out-of-pocket payments; financing functions are revenue collection, pooling and purchasing. Provider payment methods create incentives.
- In England, 42 **integrated care systems** were created in 2022; NHS England is being merged into DHSC; the 10 Year Health Plan (2025) seeks shifts to community, digital and prevention.
:::

## Exercises

::: exercise Calculating an ICER {level=1 check="30000"}
A new intervention costs £12,000 more per patient than current care and gains 0.4 QALY per patient. Calculate the ICER in pounds per QALY.
::: solution
ICER $= 12{,}000/0.4 = £30{,}000$ per QALY, within NICE's £25,000–£35,000 range from April 2026.
:::
:::

::: exercise Counting QALYs {level=1 check="3.5"}
A patient lives 5 years with a utility of 0.7. How many undiscounted QALYs is this?
::: solution
$5 \times 0.7 = 3.5$ QALYs.
:::
:::

::: exercise Present value {level=1 check="round(1000/1.035^5)"}
What is the present value of a cost of £1,000 incurred in 5 years' time, at a discount rate of 3.5% a year? Give a whole number of pounds.
::: solution
$1{,}000/1.035^5 = 1{,}000/1.188 = £842$.
:::
:::

::: exercise Net monetary benefit {level=2 check="-2500"}
An intervention gains 0.5 QALY and costs £15,000 more than its comparator. Calculate its net monetary benefit at a threshold of £25,000 per QALY.
::: solution
NMB $= 25{,}000 \times 0.5 - 15{,}000 = 12{,}500 - 15{,}000 = -£2{,}500$. It is not cost-effective at this threshold (its ICER is £30,000). At £35,000 the NMB would be +£2,500.
:::
:::

::: exercise Discounted QALYs {level=2 check="round(100*0.8*(1+1/1.035+1/1.035^2))/100"}
A treatment gives 0.8 QALY a year for 3 years. Discount at 3.5% a year, with the first year not discounted (years $t = 0, 1, 2$). How many discounted QALYs is this, to 2 decimal places?
::: solution
$0.8 \times (1 + 1/1.035 + 1/1.035^2) = 0.8 \times (1 + 0.9662 + 0.9335) = 0.8 \times 2.8997 = 2.32$ QALYs.
:::
:::

::: exercise Displaced health {level=2 check="round(5000000/13000)"}
A commissioner funds a new service costing £5 million a year from a fixed budget. If displaced services produce one QALY for every £13,000 at the margin, how many QALYs a year are lost elsewhere? Give a whole number.
::: solution
$5{,}000{,}000/13{,}000 = 385$ QALYs a year. The new service improves total health only if it gains more than this.
:::
:::

::: exercise Paying general practice {level=2}
Compare capitation, fee-for-service and pay-for-performance as ways to pay general practices. What incentives does each create, and why do many systems use a mixture?
::: solution
**Capitation** (a fixed sum per registered patient, often weighted for age, sex and deprivation) gives a predictable budget and rewards keeping patients healthy and providing care efficiently, but may encourage under-provision, referring work elsewhere and avoiding complex patients, unless the weighting reflects need.

**Fee-for-service** rewards activity, which is useful for services that are under-provided (such as vaccinations, which UK practices are paid per dose for), but encourages over-provision of profitable items and supplier-induced demand, and is costly to administer.

**Pay-for-performance** (such as QOF) rewards measured quality and can raise standards in what is measured, but encourages attention to measured indicators at the expense of unmeasured care, may reward practices already doing well, and can increase inequalities if targets are harder to achieve in deprived areas; exception reporting creates scope for gaming.

**Mixtures** combine the strengths: capitation for a stable core, item-of-service fees for specific under-provided services, and modest quality payments, with monitoring for unintended effects.
:::
:::

::: exercise Appraising a costly drug for a rare disease {level=3}
A new gene therapy for a rare, fatal childhood condition costs £1.5 million per patient, with an estimated ICER of £120,000 per QALY. Discuss the arguments for and against funding it in the NHS, using the ideas in this chapter.
::: solution
**For.** The condition is severe and the patients are children with few or no alternatives; the severity modifier and the highly specialised technologies process recognise that society may value such health gains more. Few patients are affected, so the budget impact is small. Funding encourages research into rare diseases that would otherwise be commercially unattractive. Uncertainty may be reduced through managed access with data collection, and the price may be reduced by a confidential discount or an outcomes-based agreement (paying only if the treatment works).

**Against.** At £120,000 per QALY, the money would produce several times more health if spent on existing services (at a marginal productivity of about £13,000 per QALY, roughly nine times more). The patients who lose out are less visible but equally real. High prices may reflect market power rather than research costs, and accepting them sets a precedent. Long-term effectiveness is often uncertain, because trials are small and short.

**Balance.** A reasonable answer recognises that the decision is a value judgement made through a legitimate, transparent process (NICE's highly specialised technologies programme uses a much higher threshold and weights QALYs for very large gains), seeks the lowest price and robust data collection, and accounts openly for the opportunity cost.
:::
:::
