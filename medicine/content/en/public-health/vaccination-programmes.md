In January 2026 the World Health Organization announced that the United Kingdom had lost its measles elimination status. The decision rested on data from 2024, when England recorded 2,911 laboratory-confirmed cases of measles, the highest annual number since 2012. Children died. Measles vaccine had been in the UK schedule since 1968 and MMR since 1988, and it is one of the most effective vaccines ever made. The problem was not the vaccine. It was that too few children received both doses, and that the unvaccinated were clustered in particular communities and areas.

A vaccine protects the person who receives it. A vaccination *programme* protects a population, and that requires decisions about which vaccines to offer, to whom, at what age and how; enough people vaccinated to stop transmission; a system to monitor coverage, disease and safety; and the trust of the public. This chapter covers the population side of vaccination: herd immunity and coverage thresholds, how programmes are designed, the UK programme as of 2026, how vaccine effectiveness and safety are monitored, and how confidence is built and lost. The immunology of vaccines is covered in [[immunology/vaccines-immunotherapy]], and the clinical delivery of childhood immunisation in [[paediatrics/immunisation]].

## Direct and indirect protection {#protection}

Vaccines are of several types: **live attenuated** (MMRV, rotavirus, BCG, the nasal influenza vaccine), **inactivated whole organism** (inactivated polio vaccine), **toxoid** (diphtheria, tetanus), **subunit and recombinant protein** (hepatitis B, acellular pertussis, HPV, MenB, shingles), **polysaccharide conjugate** (Hib, pneumococcal, meningococcal ACWY), **mRNA** and **viral vector** vaccines. The type determines the immune response, the number of doses, the duration of protection and the contraindications.

A vaccine's effect on a population has two parts. The **direct effect** is the protection of vaccinated individuals. The **indirect effect** is the protection of unvaccinated people (and vaccinated people in whom the vaccine failed) because there is less infection circulating. Indirect protection requires that the vaccine reduces infection or transmission, not only disease. Tetanus vaccine gives no indirect protection, because tetanus is not transmitted from person to person. Conjugate vaccines against Hib, pneumococci and meningococci reduce nasopharyngeal carriage and therefore transmission, and their introduction in infants and adolescents has reduced disease in older age groups who were never vaccinated.

## Herd immunity {#herd-immunity}

::: definition Reproduction numbers and herd immunity {#def-herd}
The **basic reproduction number** $R_0$ is the average number of secondary cases caused by one infectious person introduced into a wholly susceptible population.

The **effective reproduction number** $R_e$ (or $R_t$) is the average number of secondary cases at a given time, when part of the population is immune or control measures are in place. If a proportion $s$ of the population is susceptible and mixing is random, $R_e = R_0 s$.

**Herd immunity** is the indirect protection of susceptible people that arises when enough of the population is immune that an infection cannot spread widely, because $R_e < 1$. The **herd immunity threshold** is the proportion of the population that must be immune for this to happen.
:::

::: theorem The herd immunity threshold {#thm-hit}
With random mixing, an infection cannot sustain transmission when the immune proportion $p$ exceeds

$$
p_c = 1 - \frac{1}{R_0}.
$$ {#eq-hit}

If a vaccine prevents infection in a proportion $E$ of those vaccinated (its effectiveness against infection), the **critical vaccination coverage** is

$$
V_c = \frac{1 - 1/R_0}{E}.
$$ {#eq-vc}

If $V_c > 1$, elimination cannot be achieved with that vaccine alone at any coverage.
:::

::: proof
An epidemic grows if each case causes more than one new case on average. In a population with susceptible fraction $s$, each infectious person makes $R_0$ effective contacts, of which a fraction $s$ are with susceptible people, so $R_e = R_0 s$. Transmission declines when $R_e < 1$, that is when $s < 1/R_0$. The immune fraction is $p = 1 - s$, so the condition is $p > 1 - 1/R_0$.

If a proportion $V$ of the population is vaccinated with a vaccine that prevents infection in a proportion $E$ of recipients, the immune fraction from vaccination is $VE$. Setting $VE = 1 - 1/R_0$ gives $V_c = (1 - 1/R_0)/E$.
:::

The threshold is a simplification. Real populations do not mix randomly: people mix mostly with others of similar age, in households, schools and communities. If unvaccinated people are clustered, for example in a school or a religious or social community with low uptake, $R_e$ within the cluster can exceed 1 even when national coverage is above the threshold, and outbreaks occur. Immunity also wanes for some vaccines (pertussis, mumps), and some vaccines prevent disease better than infection. The threshold is therefore a lower bound for planning, not a guarantee.

| Infection | Typical $R_0$ | Herd immunity threshold |
|---|---|---|
| Measles | 12–18 | 92–94% |
| Pertussis | 12–17 | 92–94% |
| Varicella | 8–10 | 88–90% |
| Mumps | 4–7 | 75–86% |
| Rubella | 6–7 | 83–86% |
| Polio | 5–7 | 80–86% |
| Smallpox | 5–7 | 80–86% |

*Values of $R_0$ vary between settings; these are commonly quoted ranges.*

::: example Measles and the 95% target {#ex-measles-vc}
Take $R_0 = 15$ for measles and a two-dose MMR effectiveness of 97%. (a) What is the herd immunity threshold? (b) What vaccination coverage is needed? (c) If two-dose coverage is 85% and there is no other immunity, what is $R_e$?
::: solution
(a) $p_c = 1 - 1/15 = 0.933$, or 93.3%.

(b) $V_c = 0.933/0.97 = 0.962$, or about 96%. This is why the WHO target is at least 95% coverage with two doses.

(c) Immune fraction $= 0.85 \times 0.97 = 0.8245$; susceptible fraction $s = 0.1755$; $R_e = 15 \times 0.1755 = 2.6$. Each case would on average cause more than two new cases, so outbreaks would grow wherever measles was introduced. In reality some older people are immune from past infection, and coverage varies between areas, so local $R_e$ differs from this average.

In 2023–24, 83.9% of children in England had received two doses of MMR by their fifth birthday. That is far below the threshold, and coverage in some London boroughs and other areas is much lower.
:::
:::

::: widget phaseplane
f: -R*x*y
g: R*x*y - y
x: 0, 1
y: 0, 0.4
points: 0.99, 0.01; 0.5, 0.01; 0.1, 0.01
nullclines: true
sliders: R=3:0.5:18:0.5
caption: A simplified SIR epidemic drawn in the susceptible–infectious plane: x is the susceptible fraction, y the infectious fraction, and time is measured in units of the infectious period. The vertical nullcline at x = 1/R marks the herd immunity threshold: an epidemic can grow only from a starting point to the right of it. The three trajectories start with 99%, 50% and 10% susceptible. Raise R towards measles values and watch how small the susceptible fraction must be to prevent an outbreak.
:::

## Designing a vaccination programme {#programme-design}

In the UK, the **Joint Committee on Vaccination and Immunisation** (JCVI) advises the governments of the four nations on which vaccines to use and for whom. It considers the burden of disease, vaccine efficacy and safety, the likely impact on the population (including indirect effects, modelled with transmission models) and cost-effectiveness. The **Green Book** (*Immunisation against infectious disease*), published by the UK Health Security Agency (UKHSA), is the clinical reference for each vaccine and is updated chapter by chapter. Vaccines are bought centrally, which gives purchasing power and allows national supply to be managed.

Key design choices are:

- **Strategy.** **Universal** programmes offer the vaccine to everyone in an age group (MMRV to all infants). **Selective** programmes target groups at higher risk (BCG for infants in areas of high tuberculosis incidence or with parents from high-incidence countries; hepatitis B for babies of mothers with hepatitis B; influenza and pneumococcal vaccines for people with certain clinical conditions). **Occupational** vaccination protects workers and those they care for (hepatitis B and influenza for health workers). **Travel** vaccines are mostly outside the routine programme.
- **Age at vaccination.** The vaccine should be given before the age of greatest risk but when the immune system can respond and maternal antibody no longer interferes. This is why most infant vaccines start at 8 weeks and measles-containing vaccine is given at 1 year.
- **Target group for indirect protection.** Sometimes vaccinating one group protects another. Adolescent MenACWY vaccination targets the age group with the highest carriage, protecting younger and older people. Pertussis vaccination in pregnancy protects the newborn, who is too young to be vaccinated, through transplacental antibody.
- **Routine and catch-up.** New programmes often include a one-off catch-up of older cohorts. Mass campaigns are used in outbreaks and for eradication.
- **Doses and schedule.** Fewer doses reduce cost and improve completion; the HPV programme moved to a **single dose** for adolescents in England from September 2023, after evidence that one dose gives protection comparable to two in that age group.

## The UK programme in 2026 {#uk-schedule}

The routine childhood schedule in England, after the changes of July 2025 and January 2026, is:

| Age | Vaccines |
|---|---|
| 8 weeks | 6-in-1 (DTaP/IPV/Hib/HepB) dose 1; MenB dose 1; rotavirus dose 1 |
| 12 weeks | 6-in-1 dose 2; MenB dose 2; rotavirus dose 2 |
| 16 weeks | 6-in-1 dose 3; pneumococcal conjugate (PCV) dose 1 |
| 1 year | PCV booster; MenB booster; MMRV dose 1 |
| 18 months | 6-in-1 dose 4; MMRV dose 2 |
| 3 years 4 months | 4-in-1 pre-school booster (dTaP/IPV) |
| 12–13 years | HPV (one dose) |
| 14 years | 3-in-1 teenage booster (Td/IPV); MenACWY |

Children are also offered influenza vaccine every autumn from age 2 through the school years. The changes of January 2026 replaced MMR with **MMRV**, adding varicella (chickenpox) to the routine programme, withdrew the Hib/MenC booster, and created the 18-month appointment. Details of the transition for older children, and of selective neonatal BCG and hepatitis B, are in [[paediatrics/immunisation]].

Programmes for adults include:

- **Pregnancy**: pertussis (from 16 weeks), RSV (from 28 weeks) and seasonal influenza.
- **Older adults**: annual influenza from 65; a pneumococcal vaccine at 65; shingles vaccine (the recombinant vaccine, Shingrix) from 65, with transitional arrangements for older cohorts and earlier vaccination for people who are severely immunosuppressed; and **RSV** vaccine, introduced in September 2024 for people aged 75 to 79 and extended from 1 April 2026 to everyone aged 80 and over and to residents of care homes for older adults.
- **Clinical risk groups**: influenza, pneumococcal, COVID-19 (seasonal campaigns for people at highest risk) and others according to the Green Book.
- **Sexual health services**: hepatitis A and B, HPV and mpox vaccines for gay, bisexual and other men who have sex with men at higher risk; and, since August 2025, the 4CMenB vaccine to reduce gonorrhoea in those at highest risk, the first programme of its kind in the world, based on observational evidence of about 30–40% protection.

### Monitoring coverage {#coverage}

Coverage is measured from GP and child health records. In England, UKHSA's **COVER** programme reports quarterly and annual coverage by age 1, 2 and 5 years for each local area. Coverage is lower in more deprived areas, in some ethnic and religious communities, among Gypsy, Roma and Traveller families, among children in care and recently arrived migrants, and in areas with high population turnover such as inner London. National averages hide these pockets, which is where outbreaks start.

Reasons for missed vaccination are varied: practical barriers (appointment availability, changing address, lost records, work, transport), lack of reminders, missed opportunities when a child attends for something else, false beliefs about contraindications, and hesitancy. Effective measures include call and recall systems, text reminders, flexible and outreach clinics, checking status at every contact, and working with community leaders. Most unvaccinated children in the UK have parents who are not opposed to vaccination; they face access barriers or have unanswered questions.

## Vaccine effectiveness in the field {#effectiveness}

Pre-licensure trials measure **efficacy** under trial conditions. **Effectiveness** is the protection achieved in routine use, which may differ because of storage and handling, schedules, the population vaccinated, strain variation and waning. Effectiveness is estimated after introduction with cohort studies, case–control studies (including the **test-negative design**, used for influenza and COVID-19, which compares vaccination among people testing positive and negative for the infection), and the **screening method**.

::: warning "Most cases were vaccinated" does not mean the vaccine failed
When coverage is high, vaccinated people make up most of the population, so even a very effective vaccine can leave more vaccinated than unvaccinated cases. With 97% coverage and 97% effectiveness, about half of all cases occur in vaccinated people, because 3% of a very large group fail to be protected while the unvaccinated group is tiny. The proportion of cases vaccinated must always be compared with the proportion of the population vaccinated. This misunderstanding is common in news reports and anti-vaccine material.
:::

::: example The screening method {#ex-screening-method}
The **screening method** estimates vaccine effectiveness (VE) from the proportion of cases vaccinated (PCV) and the proportion of the population vaccinated (PPV):

$$
VE = 1 - \frac{PCV}{1 - PCV} \times \frac{1 - PPV}{PPV}.
$$ {#eq-screening-method}

In an outbreak of measles in a school, 90% of pupils have had two doses of MMR. Of the cases, 31.0% were vaccinated. Estimate the vaccine effectiveness.
::: solution
$\dfrac{PCV}{1-PCV} = \dfrac{0.310}{0.690} = 0.449$. $\dfrac{1-PPV}{PPV} = \dfrac{0.10}{0.90} = 0.111$.

$VE = 1 - 0.449 \times 0.111 = 1 - 0.050 = 0.95$, or about 95%.

Nearly a third of cases were vaccinated, yet the vaccine reduced the risk by about 95%. The method is quick and useful for monitoring, but it is sensitive to errors in PPV (which should be measured in the same population as the cases, here the school) and assumes that vaccinated and unvaccinated people have similar exposure.
:::
:::

## Vaccine safety {#safety}

Vaccines are given to healthy people, often children, in very large numbers, so the standard of safety must be very high, and rare adverse events matter. Pre-licensure trials, typically including thousands to tens of thousands of participants, cannot detect adverse events rarer than about 1 in 10,000. **Post-licensure surveillance** (pharmacovigilance) is therefore essential.

In the UK, the **Yellow Card** scheme run by the Medicines and Healthcare products Regulatory Agency (MHRA) collects spontaneous reports of suspected adverse reactions from health professionals and the public. New vaccines carry a black triangle, asking for all suspected reactions to be reported. Spontaneous reports can generate **signals** but cannot establish causation, because events occur by chance after vaccination and reporting is incomplete and influenced by publicity.

Signals are tested with analytical methods:

- **Observed versus expected analysis.** The number of events reported in a risk window after vaccination is compared with the number expected from the background incidence.
- **The self-controlled case series** (SCCS), developed by Paddy Farrington and colleagues in the 1990s, compares the incidence of an event in defined risk periods after vaccination with its incidence at other times in the *same* individuals. Because each person is their own control, fixed confounders such as genetics and chronic disease are removed. It was used to show the association between one MMR vaccine containing the Urabe mumps strain and aseptic meningitis, which led to its withdrawal in the UK in 1992, and the absence of an association between MMR and autism.
- **Cohort and case–control studies** in large linked databases.

::: example Observed versus expected {#ex-observed-expected}
Two million adults receive a new vaccine. Guillain–Barré syndrome (GBS) has a background incidence of about 1.5 per 100,000 person-years. In the 42 days after vaccination, 8 cases are reported. How many would be expected by chance, and is this a signal?
::: solution
Person-time at risk $= 2{,}000{,}000 \times 42/365 = 230{,}137$ person-years.

Expected cases $= 230{,}137 \times 1.5/100{,}000 = 3.45$.

Observed 8. If cases follow a Poisson distribution with mean 3.45, the probability of 8 or more is about 0.025. The observed number is more than twice the expected number, and unlikely to be chance alone, so this is a **signal** that needs investigation. It is not proof: background rates may be higher than assumed in the vaccinated group (older age, for example), reporting may be more complete after vaccination, and some cases may not meet the case definition. A self-controlled case series or cohort study with confirmed cases would follow. If confirmed, the risk (here a few excess cases per million doses) must be weighed against the benefits of the vaccine. This is the kind of analysis that identified rare thrombosis with thrombocytopenia after adenoviral-vector COVID-19 vaccines in 2021, which led to age-based changes to their use.
:::
:::

People who are severely disabled as a result of vaccination can claim under the UK **Vaccine Damage Payment** scheme (established by the Vaccine Damage Payments Act 1979), which pays a lump sum without the need to prove negligence. Such schemes support public trust by acknowledging that rare harms happen.

## Vaccine confidence and communication {#confidence}

::: definition Vaccine hesitancy {#def-hesitancy}
**Vaccine hesitancy** is the delay in acceptance or refusal of vaccines despite availability of vaccination services (WHO Strategic Advisory Group of Experts on Immunization, 2015). It is a continuum between full acceptance and outright refusal, and it is specific to context, time, place and vaccine.

Its determinants are often summarised as the "3Cs": **confidence** (trust in the vaccine, the health service and the policy makers), **complacency** (low perceived risk of the disease) and **convenience** (availability, affordability, accessibility). Later models add **calculation** (information searching) and **collective responsibility**.
:::

Successful vaccination creates complacency: when diseases become rare, parents no longer see them, and attention shifts to the side effects of the vaccine. Confidence can be damaged quickly. In 1998 Andrew Wakefield and colleagues published a case series in *The Lancet* that suggested a link between MMR and autism. The research was later shown to be fraudulent; the paper was retracted in 2010 and Wakefield was struck off the UK medical register. Large studies found no association. But MMR coverage in England fell to around 80% in the early 2000s and took years to recover, and measles became endemic again in 2008.

Evidence on communication suggests several principles:

- **Recommend clearly.** A health professional's recommendation is the strongest predictor of vaccination. A **presumptive** approach ("Today she is due her 1-year vaccines") leads to higher uptake than a participatory one ("What do you want to do about her vaccines?") without reducing satisfaction.
- **Listen and respond to concerns.** Many hesitant parents have specific questions. Techniques from **motivational interviewing**, which explore the person's own views and reasons, are recommended for those with persistent concerns. Dismissing concerns damages trust.
- **Give accurate, balanced information**, including about common side effects, in plain language and in the languages people use.
- **Address misinformation carefully.** Lead with the facts rather than the myth, explain why the false claim is wrong, and use trusted messengers from the community. Repeating the myth prominently can strengthen recall of it.
- **Make vaccination easy.** Convenience barriers often matter more than beliefs.

::: example A hesitant parent {#ex-hesitant}
A father brings his 13-month-old daughter to the GP practice for a minor illness. Her record shows she has not had her 1-year vaccines. He says he is "not against vaccines" but has read that MMRV "overloads the immune system" and that he would prefer to wait. How should the practice nurse respond?
::: solution
**Use the contact.** A minor illness without fever is not a contraindication, so the vaccines could be given today if he agrees.

**Recommend, then listen.** "She's due her 1-year vaccines, and I'd recommend she has them today. You mentioned some worries; can you tell me more?" Explore what he has read and what matters to him.

**Respond to the specific concern.** Infants' immune systems respond to enormous numbers of antigens every day from food, the environment and the bacteria that colonise them. The vaccines in the schedule contain a tiny fraction of the antigens the immune system deals with daily, and modern vaccines contain far fewer antigens than older ones. Giving several vaccines at once has been studied extensively; it is safe and does not reduce the response to each. Delay leaves her unprotected at an age when measles and pneumococcal and meningococcal disease are dangerous, and measles is currently circulating in England.

**Be honest about side effects.** Fever and irritability are common; MMRV can cause fever and a rash about 7 to 12 days later. Febrile seizures are uncommon. Serious reactions are very rare.

**Respect the decision.** If he wants to think about it, give written information, arrange a convenient appointment soon, and record the discussion. Keep the door open: many parents return, and a respectful conversation increases the chance of that.
:::
:::

## Elimination and eradication {#eradication}

**Control** reduces disease to an acceptable level; **elimination** stops endemic transmission in a defined area (for example, measles elimination requires the absence of endemic transmission for at least 12 months with high-quality surveillance); **eradication** is the permanent reduction to zero of worldwide incidence, so that interventions are no longer needed.

Smallpox, declared eradicated in 1980, is the only human disease eradicated so far. Features that made it possible were: no animal reservoir; no asymptomatic carriage, so cases were visible; a characteristic rash that allowed diagnosis without a laboratory; lifelong immunity after infection or vaccination; a heat-stable freeze-dried vaccine; and a strategy of **surveillance and containment** (finding cases and vaccinating their contacts in "rings") that worked even where mass coverage was impossible. Wild poliovirus transmission has been reduced by more than 99% since 1988 and remains endemic only in Afghanistan and Pakistan, but the oral vaccine's rare reversion to circulating vaccine-derived poliovirus, conflict and vaccine refusal have made the last steps difficult. The global aspects of vaccination are discussed further in [[public-health/global-health]].

::: quiz
In a community with 97% two-dose MMR coverage, an outbreak of measles occurs and half of the cases had two doses of MMR. A local newspaper headline says "Vaccine fails half the time". What is the best interpretation?
- [ ] The vaccine's effectiveness is about 50%.
- [ ] The vaccine has lost effectiveness because the virus has mutated.
- [x] The result is consistent with a highly effective vaccine, because almost everyone is vaccinated.
- [ ] Two doses give no more protection than none.
::: solution
With coverage of 97% and effectiveness of 97%, vaccinated cases arise from $0.97 \times 0.03 = 2.9\%$ of the population and unvaccinated cases from up to 3%. About half of cases would be vaccinated even though each vaccinated person's risk is reduced by 97%. The screening method, which uses both the proportion of cases vaccinated and the coverage, would give an effectiveness of about 97%.
:::
:::

::: history
In 1796 Edward Jenner inoculated James Phipps with material from a cowpox lesion and later showed that the boy was protected against smallpox; he published his *Inquiry* in 1798. Vaccination was made compulsory for infants in England in 1853, which provoked an anti-vaccination movement and, in 1898, a "conscientious objection" clause. Louis Pasteur's attenuated vaccines for chicken cholera, anthrax and rabies (1885) showed that the principle could be generalised. The 20th century brought vaccines against diphtheria, tetanus, pertussis, polio (Salk 1955, Sabin in the early 1960s), measles (1963), mumps and rubella. The WHO launched the Expanded Programme on Immunization in 1974, and the World Health Assembly declared smallpox eradicated in May 1980. The UK introduced MMR in 1988, Hib vaccine in 1992 and, in 1999, became the first country to introduce a meningococcal C conjugate vaccine. Gavi, the Vaccine Alliance, was founded in 2000 to finance vaccines for low-income countries. The COVID-19 vaccines of 2020, including the first licensed mRNA vaccines, were developed and deployed faster than any before.
:::

## Where this leads

The immunology behind vaccines is in [[immunology/vaccines-immunotherapy]], and the clinical delivery of childhood vaccination, including contraindications and catch-up schedules, in [[paediatrics/immunisation]]. Outbreak control, in which vaccination is one tool, is the subject of [[public-health/communicable-disease-control]].

::: summary
- Vaccines give **direct** protection to recipients and, if they reduce transmission, **indirect** protection to others.
- **Herd immunity threshold** $p_c = 1 - 1/R_0$; **critical coverage** $V_c = (1 - 1/R_0)/E$. Measles ($R_0$ 12–18) needs about 95% two-dose coverage. Clustering of unvaccinated people allows outbreaks even above national thresholds.
- In the UK, the **JCVI** advises, the **Green Book** guides practice, and UKHSA monitors coverage (COVER), disease and effectiveness.
- The 2026 schedule includes MMRV at 1 year and 18 months, MenB at 8 and 12 weeks and 1 year, single-dose HPV, maternal pertussis and RSV, and RSV for adults aged 75 and over and in care homes.
- **Effectiveness** in the field is estimated by cohort, case–control (test-negative) and screening methods. High coverage means many cases are vaccinated even with an excellent vaccine.
- Safety relies on post-licensure surveillance: **Yellow Card** signals, observed-versus-expected analysis and the **self-controlled case series**.
- **Vaccine hesitancy** depends on confidence, complacency and convenience. Clear recommendation, listening, honest information and easy access improve uptake.
- Smallpox is the only human disease eradicated; wild polio remains endemic only in Afghanistan and Pakistan.
:::

## Exercises

::: exercise Herd immunity threshold {level=1 check="round(1000*(1-1/6))/10"}
Mumps has $R_0 = 6$ in a population. What is the herd immunity threshold, as a percentage to 1 decimal place?
::: solution
$p_c = 1 - 1/6 = 0.8333$, or 83.3%.
:::
:::

::: exercise Critical coverage {level=1 check="round(1000*(1-1/6)/0.9)/10"}
If the mumps component of a vaccine is 90% effective against infection, what coverage is needed to reach the threshold of the previous exercise? Give a percentage to 1 decimal place.
::: solution
$V_c = 0.8333/0.90 = 0.926$, or 92.6%. Mumps outbreaks among vaccinated university students show that effectiveness against infection can be lower than this and that immunity can wane, making the coverage needed even higher.
:::
:::

::: exercise Effective reproduction number {level=1 check="2.4"}
An infection has $R_0 = 8$. Seventy per cent of the population is immune. Assuming random mixing, what is $R_e$?
::: solution
$s = 0.3$; $R_e = 8 \times 0.3 = 2.4$. The infection can still spread.
:::
:::

::: exercise Proportion of cases vaccinated {level=2 check="round(1000*0.97*0.03/(0.97*0.03+0.03))/10"}
Coverage is 97% and vaccine effectiveness is 97%. Assuming equal exposure, what percentage of cases will have been vaccinated? Give your answer to 1 decimal place.
::: solution
Relative to the population, vaccinated cases arise from $0.97 \times 0.03 = 0.0291$ and unvaccinated cases from $0.03 \times 1 = 0.03$ (taking the attack rate in the unvaccinated as the reference). Proportion vaccinated $= 0.0291/(0.0291 + 0.03) = 0.492$, or 49.2%.
:::
:::

::: exercise The screening method {level=2 check="round(100*(1 - (0.2/0.8)*(0.15/0.85)))"}
In an outbreak of pertussis among children, 85% of the children in the community are fully vaccinated, and 20% of the cases are fully vaccinated. Estimate vaccine effectiveness using the screening method, as a whole percentage.
::: solution
$\dfrac{PCV}{1-PCV} = 0.2/0.8 = 0.25$; $\dfrac{1-PPV}{PPV} = 0.15/0.85 = 0.176$. $VE = 1 - 0.25 \times 0.176 = 0.956$, or 96%.
:::
:::

::: exercise Expected background events {level=2 check="round(100*500000*30/365*10/100000)/100"}
Half a million people receive a vaccine. The background incidence of Bell's palsy is about 10 per 100,000 person-years. How many cases would be expected by chance in the 30 days after vaccination? Give your answer to 2 decimal places.
::: solution
Person-time $= 500{,}000 \times 30/365 = 41{,}096$ person-years. Expected $= 41{,}096 \times 10/100{,}000 = 4.11$. Several cases of Bell's palsy after vaccination are therefore expected by coincidence alone; reports of a handful would not by themselves indicate a problem.
:::
:::

::: exercise Planning an outbreak response {level=3}
A primary school in an area with low MMR coverage reports two confirmed cases of measles. Records show that of 420 pupils, 330 have had two doses of MMR or MMRV, 30 one dose and 60 none. Describe the public health response, and explain why the herd immunity threshold calculated for England as a whole is not reassuring here.
::: solution
**Immediate actions.** Notify the local UKHSA health protection team (measles is notifiable on clinical suspicion). Confirm cases (oral fluid or blood testing), exclude cases until 4 days after rash onset, and identify contacts in the school and in households.

**Vaccination.** Offer MMR or MMRV to unvaccinated and partially vaccinated pupils and staff, ideally within 72 hours of exposure as post-exposure prophylaxis, and in any case to protect against further exposure. Run a school or community clinic to remove access barriers.

**Vulnerable contacts.** Identify contacts who are pregnant, immunosuppressed or infants too young for vaccination, who may need human normal immunoglobulin according to UKHSA guidance.

**Communication.** Clear letters to parents in the languages they use, with trusted community figures involved.

**Why the national threshold does not help.** The school's own immunity determines spread within it. With roughly 0.97 × 330 + 0.93 × 30 ≈ 348 pupils immune, about 72 (17%) remain susceptible, well above the 6–7% susceptible fraction that measles can tolerate. The school is a cluster with $R_e$ above 1, regardless of national averages.
:::
:::

::: exercise Should a new vaccine be added? {level=3}
A new vaccine against a bacterial infection that causes 300 cases of severe disease and 30 deaths a year in UK infants is licensed. It is 80% effective against disease, may reduce carriage, causes fever in 10% of recipients and is expensive. Outline the questions JCVI would consider before recommending it.
::: solution
**Burden.** Incidence, severity, deaths and long-term sequelae by age, and trends over time.

**Vaccine.** Efficacy against disease and carriage, duration of protection, the number of doses and the ages at which they must be given to protect infants at peak risk, strain coverage, safety (including the fever and any rare events), and whether it can be given alongside existing vaccines without interference or more appointments.

**Impact.** Transmission modelling of direct and indirect effects, including possible protection of older people if carriage is reduced, and the risk of serotype or strain replacement.

**Cost-effectiveness.** Cost per QALY gained, using the vaccine price and programme costs; the price negotiated for national supply often determines the decision.

**Programme.** Fit with the schedule, workload, acceptability to parents, the effect of extra injections or fever on confidence (for example the need for prophylactic paracetamol, as with MenB), surveillance to measure impact, and equity of access.
:::
:::
