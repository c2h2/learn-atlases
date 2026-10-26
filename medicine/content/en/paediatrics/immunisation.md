Vaccines have prevented more childhood deaths than any other medical intervention apart from clean water. Diseases that filled children's wards a few generations ago, such as diphtheria, polio and *Haemophilus influenzae* type b meningitis, are now rarities in the UK. That success creates its own difficulty: parents today rarely see the diseases, but they do hear about the vaccines' side effects, real and imagined.

The clinical job has three parts. The first is to understand how vaccines work in infants, because that explains the schedule. The second is to give the right vaccines at the right time, safely, and to know the few true contraindications. The third is to talk with families in a way that answers their questions honestly. This chapter covers all three, using the UK programme as of 2026. Schedules change, so the current UKHSA *Green Book* (Immunisation against infectious disease) is always the reference.

## How vaccines protect children

::: definition Vaccine types and the immune response {#def-science}
**Active immunisation** stimulates the child's own immune system to produce antibodies and memory cells. **Passive immunisation** gives ready-made antibodies, as in immunoglobulin or monoclonal antibody products, or as antibodies pass from mother to fetus across the placenta. Passive protection is immediate but fades over weeks to months.

A **live attenuated vaccine** contains a weakened organism that replicates briefly in the body, as in MMRV, rotavirus vaccine and BCG. It usually produces strong, long-lasting immunity after one or two doses, but it must be avoided in people with severely weakened immunity and in pregnancy.

An **inactivated vaccine** contains a killed organism, a purified part of it, or an inactivated toxin (a **toxoid**, as for diphtheria and tetanus). It cannot cause infection, but it usually needs several doses and boosters.

A **conjugate vaccine** links a bacterial polysaccharide to a carrier protein, as in the Hib, pneumococcal and meningococcal vaccines.
:::

### Why infants need conjugate vaccines

The bacteria that cause the most dangerous infections in infants (Hib, pneumococcus and meningococcus) are surrounded by a polysaccharide capsule. Antibodies against the capsule protect, but infants under about 2 years respond poorly to pure polysaccharide antigens.

::: theorem Conjugation turns a polysaccharide into a T-cell-dependent antigen {#thm-conjugate}
Infants respond poorly to polysaccharide vaccines but well to conjugate vaccines, because linking the polysaccharide to a protein recruits T-cell help, which produces class-switched antibody and immunological memory.
:::

::: proof
A pure polysaccharide activates B cells directly by cross-linking their receptors. This **T-cell-independent** response depends on a population of B cells in the marginal zone of the spleen that is immature in infancy, so infants make little antibody. The antibody that is made is mostly IgM, and no memory forms. In a conjugate vaccine, a B cell whose receptor recognises the polysaccharide takes up the whole conjugate, processes the protein carrier, and presents carrier peptides on MHC class II molecules to helper T cells. The T cells then help that B cell to switch class to IgG, to mature its affinity, and to form memory B cells. Infants can mount this response from 2 months of age. Conjugate vaccines also reduce carriage of the bacteria in the nose and throat, so they protect unvaccinated people as well.
:::

### Maternal antibody and the timing of the schedule

IgG antibodies cross the placenta, mostly in the third trimester. They protect the baby in the first months, but they also neutralise live vaccines. This is the main reason why measles-containing vaccine is given at 1 year rather than in early infancy. Babies born preterm receive less maternal antibody, which is one reason they are vaccinated at their normal chronological age, without correction for prematurity.

Vaccinating pregnant women uses the same transfer deliberately. Pertussis vaccine in pregnancy protects young babies from whooping cough before they can be vaccinated themselves, and the RSV vaccine in pregnancy protects them against bronchiolitis.

### Population protection

Vaccines protect the individual child, but they also reduce transmission. If enough of a population is immune, each case causes less than one further case on average, and outbreaks die out.

::: theorem The herd immunity threshold {#thm-herd}
If each case of an infection causes $R_0$ new cases in a fully susceptible population, transmission falls below replacement when the immune proportion $p$ exceeds

$$
p_c = 1 - \frac{1}{R_0}.
$$ {#eq-hit}

If a vaccine prevents infection in a fraction $E$ of those who receive it, the vaccine coverage needed is $p_c / E$.
:::

::: proof
When a proportion $p$ of the population is immune, only a fraction $1-p$ of an infectious person's contacts can be infected, so each case causes on average $R = R_0(1-p)$ new cases. The infection declines when $R < 1$, that is when $1 - p < 1/R_0$, which rearranges to $p > 1 - 1/R_0$. If vaccinating a person makes them immune with probability $E$, then a coverage $c$ produces an immune proportion $cE$, so we need $cE > p_c$. This simple model assumes random mixing. Real populations have clusters of unvaccinated children, in a school or a community, where outbreaks can occur even when national coverage looks high.
:::

::: widget plot
f: 1 - 1/x
x: 1, 20
y: 0, 1
hlines: 0.95
labels: p_c = 1 - 1/R_0
caption: The herd immunity threshold rises steeply with $R_0$. Measles ($R_0$ about 12–18) needs about 92–94% of people to be immune, which is why the WHO target is 95% coverage with two doses of measles-containing vaccine. An infection with $R_0 = 2$ needs only 50%.
:::

::: example How much measles vaccine coverage is enough? {#ex-herd}
Take $R_0 = 15$ for measles. Two doses of measles-containing vaccine protect about 97% of children who receive them. What coverage with two doses is needed to prevent sustained transmission?
::: solution
**Threshold.** $p_c = 1 - 1/15 = 14/15 = 0.933$, so about 93.3% of the population must be immune.

**Coverage.** Because only 97% of vaccinated children become immune, the coverage needed is $0.933/0.97 = 0.962$, about **96%**.

**Interpretation.** Measles needs almost universal coverage. In England, coverage with two doses by age 5 has been well below 95% for years, which is why measles outbreaks have returned, especially in communities and areas with lower uptake. A single dose protects about 93%, so the second dose matters both for individual children and for the population.
:::
:::

## The UK routine schedule

The table shows the routine schedule in England as of 2026, after the changes of July 2025 and January 2026. The other UK nations have closely similar schedules.

| Age | Vaccines |
|---|---|
| 8 weeks | 6-in-1 (DTaP/IPV/Hib/HepB) dose 1; MenB dose 1; rotavirus dose 1 |
| 12 weeks | 6-in-1 dose 2; MenB dose 2; rotavirus dose 2 |
| 16 weeks | 6-in-1 dose 3; pneumococcal conjugate (PCV) dose 1 |
| 1 year (on or after the first birthday) | PCV booster; MenB booster; MMRV dose 1 |
| 18 months | 6-in-1 dose 4; MMRV dose 2 |
| 2 years to end of Year 11 | Influenza vaccine (live nasal spray) every autumn |
| 3 years 4 months | 4-in-1 pre-school booster (dTaP/IPV) |
| 12–13 years | HPV (one dose) |
| 14 years | Td/IPV teenage booster; MenACWY |

The 6-in-1 vaccine protects against diphtheria, tetanus, pertussis, polio, Hib and hepatitis B. MMRV protects against measles, mumps, rubella and varicella (chickenpox).

### What changed in 2025 and 2026

- **July 2025.** The second infant MenB dose moved from 16 weeks to 12 weeks, because MenB disease peaks in the first months of life. The single infant PCV dose moved from 12 weeks to 16 weeks.
- **January 2026.** **MMRV** replaced MMR, adding chickenpox to the routine programme. The **Hib/MenC** booster at 1 year was withdrawn: the adolescent MenACWY programme has made MenC disease in infants rare, and Hib boosting is now given by a fourth 6-in-1 dose. A new **18-month** appointment was created for children born on or after 1 July 2024, to give the fourth 6-in-1 dose and the second MMRV dose.

Children born before these dates follow transition rules. For example, children born between 1 September 2022 and 31 December 2024 are offered MMRV at the 3-year-4-month appointment, and a catch-up MMRV dose is being offered from November 2026 to March 2028 to children born between 1 January 2020 and 31 August 2022 who have not had chickenpox or a varicella vaccine. For any individual child, the current Green Book and the child's record decide what is due.

### Why the doses are where they are

- **8, 12 and 16 weeks.** Three doses of an inactivated vaccine one month apart build a primary response early, before the peak age of pertussis, Hib and MenB disease, while maternal antibody is waning.
- **Rotavirus** has strict age limits. The first dose cannot be given at 15 weeks or older, and the course must be finished before 24 weeks. These limits exist because the risk of intussusception, a rare side effect, is lower in young infants. A missed rotavirus dose is therefore not caught up later.
- **1 year.** Maternal antibody has gone, so the live MMRV vaccine works. The boosters of PCV and MenB create long-lasting memory.
- **Adolescence.** HPV vaccine is given before most young people become sexually active. Since September 2023 one dose has been used, because studies showed a single dose gives protection similar to two in young people. MenACWY at 14 protects teenagers at their second peak of meningococcal disease and reduces carriage, protecting others.

### Selective programmes

Some vaccines are offered only to children at higher risk:

- **Hepatitis B for babies of mothers with hepatitis B.** Monovalent hepatitis B vaccine within 24 hours of birth and again at 4 weeks, then the routine 6-in-1 doses, with further doses and a blood test at 1 year according to the Green Book. Babies of mothers with high infectivity, and very low birth weight babies, also receive hepatitis B immunoglobulin at birth.
- **BCG** for babies at higher risk of tuberculosis, for example those living in an area of high incidence or with a parent or grandparent born in a country with high incidence. Since 2021 BCG has been given at about 28 days of age, after the result of newborn screening for severe combined immunodeficiency is available, because BCG is a live vaccine.
- Additional pneumococcal, meningococcal and influenza vaccines for children with asplenia, sickle cell disease, complement deficiency, chronic heart, lung, kidney or liver disease, and other risk conditions.

In pregnancy, women are offered **pertussis** vaccine (from 16 weeks, ideally around 20 weeks), **RSV** vaccine (from 28 weeks) and **influenza** vaccine in the flu season.

## Giving vaccines safely

::: definition Contraindications and precautions {#def-practice}
A **contraindication** is a condition in which a vaccine should not be given. True contraindications are few:

- a confirmed **anaphylactic reaction** to a previous dose of the vaccine or to one of its components;
- for **live vaccines**, severe immunosuppression (for example from treatment for cancer, high-dose corticosteroids or primary immunodeficiency) and pregnancy;
- for rotavirus vaccine specifically, severe combined immunodeficiency and a previous intussusception.

A **precaution** is a reason to delay or take care, such as an acute illness with fever, when vaccination is postponed until the child has recovered.

A **false contraindication** is a reason sometimes given for not vaccinating that is not valid.
:::

False contraindications are a common reason for missed vaccinations. None of the following is a reason to withhold vaccines: a mild illness without fever, such as a cold; being on antibiotics; prematurity; breastfeeding; a family history of vaccine reactions or of seizures; a stable neurological condition; eczema or asthma; egg allergy (including for MMRV and the children's flu vaccine, apart from children with egg allergy who have needed intensive care for anaphylaxis, who should have the flu vaccine in hospital); and a previous mild local reaction.

**Consent** is given by a person with parental responsibility for a young child. Adolescents who are competent to decide can consent for themselves (see [[paediatrics/adolescent-health]]). Vaccines are given intramuscularly into the anterolateral thigh in infants and the deltoid in older children, except the oral rotavirus vaccine and the nasal flu vaccine. Several vaccines can safely be given at the same visit, in different sites.

### Expected reactions

Mild reactions are common: soreness and swelling at the injection site, fever, irritability and poor sleep for a day or two. **MenB vaccine** causes fever in many infants, so in the UK **paracetamol** is advised after the 8-week and 12-week MenB doses, in a dose by age from the current schedule. The measles component of MMRV can cause fever and a rash 7–12 days after vaccination, when the attenuated virus replicates; this is not infectious.

Suspected adverse reactions are reported through the **Yellow Card** scheme run by the Medicines and Healthcare products Regulatory Agency. Passive reporting can detect rare signals, but it cannot show cause and effect by itself; that requires comparison of rates in vaccinated and unvaccinated groups.

::: warning Fainting is not anaphylaxis
Adolescents commonly faint at or soon after vaccination, especially when standing. Fainting is a reflex: it begins within seconds to minutes, with pallor, sweating and a slow pulse, and recovers quickly when the person lies flat. **Anaphylaxis** is rare (about one per million doses for most vaccines), usually starts within minutes, and causes airway swelling, wheeze, hypotension with a fast pulse, and often an urticarial rash. Confusing the two causes harm both ways: labelling a faint as allergy denies future vaccines, and treating anaphylaxis as a faint delays **intramuscular adrenaline**, the essential treatment. Vaccinate teenagers sitting down and keep them seated for a few minutes afterwards.
:::

::: example A collapse in the school vaccination session {#ex-anaphylaxis}
A 14-year-old receives Td/IPV and MenACWY in a school session. While standing up she says she feels dizzy and slumps to the floor. She is pale and sweaty with a pulse of 48 per minute. Within a minute of lying flat with her legs raised she is talking, her colour returns and her pulse is 76. There is no rash, wheeze or swelling.
::: solution
**Timing and features.** Immediate onset while standing, pallor, sweating and a **slow** pulse, with rapid recovery when lying flat, are typical of a **vasovagal faint**.

**Against anaphylaxis.** There is no airway, breathing or skin involvement, and the pulse is slow rather than fast. She recovered without treatment.

**Management.** Keep her lying down until fully recovered, then sitting for a while, observe her, and document the event as a faint. Check for any injury from the fall. She can receive future vaccines, ideally lying down or seated.

**If the features had been different.** Swelling of the lips or tongue, stridor, wheeze, hypotension with a fast pulse or widespread urticaria would mean anaphylaxis. The response is to call for help, lie her flat and give intramuscular adrenaline promptly, following the Resuscitation Council UK algorithm, with a repeat dose after 5 minutes if there is no improvement.
:::
:::

## Talking with families

Most parents who hesitate have questions rather than fixed positions. The approach that works best is honest, specific and respectful:

- Start from the assumption that the child will be vaccinated, and ask what questions the parent has.
- Find out what the parent has heard and what worries them most.
- Give clear numbers, comparing the risk of the disease with the risk of the vaccine.
- Acknowledge real side effects. Parents trust clinicians who are honest about fever and sore legs.
- If the parent declines, keep the door open and offer another appointment.

The most damaging vaccine scare in the UK began in 1998 with a paper by Andrew Wakefield and colleagues suggesting a link between MMR and autism. Large studies in millions of children found no link, the paper was retracted in 2010, and Wakefield was struck off the medical register. MMR coverage fell for years, and measles returned.

::: definition Post-exposure and special-situation immunisation {#def-situations}
**Post-exposure prophylaxis** is vaccine or immunoglobulin given after exposure to an infection to prevent disease. Examples are MMR (or MMRV) within 72 hours of exposure to measles in a susceptible person aged 6 months or more; human normal immunoglobulin for exposed infants under 6 months, severely immunosuppressed people and susceptible pregnant women; tetanus vaccine and immunoglobulin for tetanus-prone wounds; and hepatitis B vaccine with or without immunoglobulin after exposure to blood.

**Catch-up immunisation** brings a child who has missed doses up to date. The rule is to continue the course, never to restart it.
:::

::: example Measles in a household {#ex-measles}
A 3-year-old who has not been vaccinated develops a high fever, cough, runny nose and red eyes, followed by a blotchy rash that started behind the ears. Measles is confirmed. She lives with her parents, a 4-month-old brother, and a grandmother who is taking mycophenolate after a kidney transplant. Her 7-year-old cousin, who had two doses of MMR, visited yesterday.
::: solution
**Infectivity.** Measles is infectious from about 4 days before to 4 days after the onset of the rash, and it spreads through the air. The diagnosis should be notified to the local health protection team, who coordinate the response.

**The 4-month-old brother** is too young for MMR and is at risk of severe disease. He should be offered **human normal immunoglobulin**, which can be given up to 6 days after exposure.

**The grandmother** is immunosuppressed. Her measles immunity should be checked urgently; if she is not immune, she should receive immunoglobulin. She must not receive MMR, which is live.

**The parents** should check their own vaccine history; if not immune, they can receive MMR within 72 hours.

**The cousin** has had two doses and is very likely protected.

**The patient** should be kept away from nursery and other people until 4 days after the rash appeared, and watched for complications: pneumonia, otitis media, diarrhoea and, rarely, encephalitis. Measles also suppresses immune memory for months to years. Once she has recovered, her other vaccines should be brought up to date, including a second dose of measles-containing vaccine, which protects against mumps, rubella and varicella as well.
:::
:::

::: example A baby whose mother has hepatitis B {#ex-hepb}
Mei was born at term to a mother with chronic hepatitis B, who is HBeAg-negative with a low viral load. The birth dose was missed because of a busy night on the postnatal ward. Mei is now 36 hours old. What should happen?
::: solution
**Risk.** Without immunisation, up to 90% of babies infected at birth develop chronic infection, which can lead to cirrhosis and liver cancer. Vaccination given promptly prevents most of these infections.

**Action today.** Give the monovalent hepatitis B vaccine **now**. The target is within 24 hours of birth, but a late dose still protects and must not be skipped. Because the mother has low infectivity and Mei is a term baby, immunoglobulin is not usually indicated, but this follows the Green Book criteria and local advice.

**Afterwards.** The second monovalent dose at 4 weeks, the routine 6-in-1 doses from 8 weeks, and further doses and a blood test at 1 year to confirm that Mei has not been infected, as set out in the Green Book. Breastfeeding is safe.

**System.** Record the delay as an incident and review how the birth dose is flagged, because missed birth doses are a known weak point in the pathway.
:::
:::

::: example A family history of immunodeficiency {#ex-bcg}
Ravi is 8 weeks old and due for his first vaccines. His older brother died at 7 months of severe combined immunodeficiency (SCID). Ravi's newborn screening for SCID was not done because his family lives in an area where it is not offered. He is due BCG because his parents were born in a country with a high incidence of tuberculosis.
::: solution
**The danger.** In a baby with SCID, live vaccines can cause severe, persistent infection. BCG can cause disseminated BCG disease, and rotavirus vaccine can cause chronic diarrhoea.

**Action.** Do not give BCG or rotavirus vaccine until Ravi's immune status is known. Arrange urgent immunological assessment, including a lymphocyte count and lymphocyte subsets. A family history of SCID in a sibling is itself an indication for urgent assessment, whatever the screening result.

**Inactivated vaccines.** The 6-in-1 and MenB vaccines are not live and cannot cause infection. They can be given, although a baby with SCID may not respond to them.

**Timing matters.** Rotavirus vaccine has a strict upper age limit, so a decision is needed quickly. If Ravi's immune system is normal, the first dose can be given before 15 weeks. BCG can be given later.
:::
:::

::: quiz
A mother asks whether her 8-week-old baby, who has a runny nose but no fever, should postpone his vaccines. He was born at 34 weeks. What is the best advice?
- [ ] Postpone the vaccines until the cold has gone, then start the schedule from that date.
- [ ] Postpone until 8 weeks corrected age because he was born preterm.
- [x] Give the vaccines today at his chronological age.
- [ ] Give the inactivated vaccines today but postpone rotavirus.
::: solution
A minor illness without fever is not a reason to delay, and prematurity is not a reason either: preterm babies are vaccinated at their chronological age, because they lose maternal antibody early and are at higher risk of infection. Rotavirus vaccine can be given with a cold, and delaying it risks missing its strict age window.
:::
:::

::: history
In 1796 Edward Jenner inoculated James Phipps with material from a cowpox lesion and showed that the boy was then protected against smallpox. Louis Pasteur extended the idea in the 1880s with attenuated vaccines against chicken cholera, anthrax and rabies. Diphtheria and tetanus toxoids followed in the 1920s, Jonas Salk's inactivated polio vaccine was licensed in 1955, and Albert Sabin's oral live vaccine followed in the early 1960s. The UK introduced routine immunisation against diphtheria in the 1940s, and the National Health Service brought vaccines to every child. Conjugate vaccines transformed infant protection: Hib vaccine was introduced in the UK in 1992 and meningococcal C conjugate vaccine in 1999, the first country to use it nationally. In 2015 the UK became the first country to offer MenB vaccine to all infants. Smallpox was declared eradicated by the World Health Assembly in 1980.
:::

## Where this leads

The immunology of memory, adjuvants and vaccine platforms is covered in [[immunology/vaccines-immunotherapy]], and how programmes are planned, monitored and evaluated across a population is covered in [[public-health/vaccination-programmes]]. The infections these vaccines prevent appear in [[paediatrics/acute-childhood-illness]] and [[microbiology/viruses]]. Immunisation of children with immunodeficiency is discussed in [[immunology/immunodeficiency]].

::: summary
- Live vaccines give strong immunity but are avoided in severe immunosuppression and pregnancy; inactivated vaccines need several doses.
- Conjugate vaccines recruit T-cell help, so infants make IgG and memory against capsular polysaccharides.
- The herd immunity threshold is $1 - 1/R_0$; measles needs about 95% coverage with two doses.
- As of 2026 the UK schedule is: 8 weeks 6-in-1, MenB, rotavirus; 12 weeks 6-in-1, MenB, rotavirus; 16 weeks 6-in-1, PCV; 1 year PCV, MenB, MMRV; 18 months 6-in-1, MMRV; 3 years 4 months 4-in-1; HPV at 12–13; Td/IPV and MenACWY at 14; annual flu from 2 years.
- Rotavirus vaccine has strict age limits (first dose before 15 weeks, course finished before 24 weeks) and is never caught up late.
- True contraindications are few; minor illness, prematurity, egg allergy and family history are not contraindications. Never restart a course.
- Fainting and anaphylaxis differ in timing, pulse and features; anaphylaxis is treated with intramuscular adrenaline.
- Parents deserve honest numbers and respect; most hesitancy is a set of questions, not a refusal.
:::

## Exercises

::: exercise Write the schedule today {level=1}
A healthy child in England has her first birthday today and has had all her vaccines so far. List what she has already received, what is due today, and what comes next.
::: solution
**Already given:** at 8 weeks, 6-in-1, MenB and rotavirus; at 12 weeks, 6-in-1, MenB and rotavirus; at 16 weeks, 6-in-1 and PCV.

**Due today (on or after the first birthday):** PCV booster, MenB booster and MMRV dose 1. The Hib/MenC vaccine is no longer given.

**Next:** at 18 months, the fourth 6-in-1 dose and MMRV dose 2; flu vaccine every autumn from age 2; the 4-in-1 pre-school booster at 3 years 4 months. The current Green Book should always be checked, because schedules change.
:::
:::

::: exercise Herd immunity threshold {level=1 check="round(100*(1-1/4))"}
An infection has $R_0 = 4$. What percentage of the population must be immune to prevent sustained transmission? Give a whole number.
::: solution
$p_c = 1 - 1/4 = 0.75$, so **75%**.
:::
:::

::: exercise True or false contraindication? {level=1}
For each, say whether it is a contraindication to the 12-month vaccines: (a) a cold without fever; (b) anaphylaxis to a previous dose of MenB vaccine; (c) egg allergy with urticaria; (d) current chemotherapy for leukaemia.
::: solution
(a) Not a contraindication. (b) A contraindication to further MenB vaccine; seek specialist advice about the others. (c) Not a contraindication; MMRV can be given in primary care. (d) A contraindication to the live MMRV vaccine; inactivated vaccines may be given but may not work, and timing is planned with the oncology team.
:::
:::

::: exercise Vaccine effectiveness {level=2 check="round(100*(1-0.03/0.30))"}
In a school outbreak, 30% of unvaccinated children and 3% of vaccinated children developed the disease. Calculate vaccine effectiveness as a percentage, to the nearest whole number.
::: hint
Vaccine effectiveness is one minus the relative risk in vaccinated compared with unvaccinated people.
:::
::: solution
Relative risk $= 0.03/0.30 = 0.1$. Effectiveness $= 1 - 0.1 = 0.9$, that is **90%**.
:::
:::

::: exercise Coverage needed for an imperfect vaccine {level=2 check="round(1000*(1-1/6)/0.85)/10"}
An infection has $R_0 = 6$ and the vaccine protects 85% of those vaccinated. What coverage, as a percentage to one decimal place, is needed to reach the herd immunity threshold?
::: solution
$p_c = 1 - 1/6 = 0.8333$. Coverage needed $= 0.8333/0.85 = 0.9804$, that is **98.0%**. When the threshold is close to 100% and the vaccine is imperfect, herd immunity may be unreachable by vaccination alone, and protection of the most vulnerable depends on high coverage and on vaccinating those around them.
:::
:::

::: exercise A hesitant parent {level=2}
A father says he has read that giving several vaccines at once "overloads" a baby's immune system and asks whether they can be spread out. How would you respond?
::: solution
Acknowledge the concern and ask what he has read. Explain that a baby's immune system meets thousands of new antigens every day, from food and the bacteria colonising the gut and skin, and that the total number of antigens in modern vaccines is small compared with this. Studies show that giving vaccines together does not reduce the response to each or increase serious side effects. Spreading vaccines out means more injections over more visits, and leaves the baby unprotected for longer during the age at which pertussis, MenB and pneumococcal disease are most dangerous. Be honest that fever and soreness are common, and explain the paracetamol advice after MenB. If he still prefers to wait, agree a plan to vaccinate as soon as possible rather than ending the conversation.
:::
:::

::: exercise Catch-up after the 16-week visit was missed {level=3}
A child in England, born in March 2025, comes to her 1-year appointment. She had her 8- and 12-week vaccines, but missed the 16-week visit. What should she receive today, and what should not be given?
::: hint
Remember the rule about restarting courses, the age limit for rotavirus, and the fact that a child over 1 needs only one PCV dose.
:::
::: solution
**Never restart.** She has had two doses of 6-in-1 and needs the third. The minimum interval of 4 weeks since the previous dose has passed, so it can be given today.

**Today:** the third 6-in-1 dose, together with the 1-year vaccines: PCV, MenB booster and MMRV dose 1, in separate sites. Several vaccines at one visit are safe and avoid another missed contact.

**PCV:** a child of 1 year or older needs only the single PCV dose given after the first birthday, so the missed infant PCV is not given separately.

**Rotavirus:** her two doses are complete, but even if they had been missed, rotavirus is never given after 24 weeks.

**Next:** the 18-month appointment for the fourth 6-in-1 dose and MMRV dose 2. Document what was given and ask why the 16-week visit was missed. Moving house, lost records and difficulty getting appointments are common reasons, and fixing them prevents further gaps.
:::
:::

::: exercise A measles outbreak in a school {level=3}
A primary school has 400 pupils. Records show that 340 have had two doses of MMR or MMRV, 20 have had one dose and 40 have had none. Two cases of measles occur. Using the effectiveness figures of 97% for two doses and 93% for one dose, estimate how many pupils are still susceptible, and outline the public health response.
::: solution
**Susceptible pupils.** Two doses: $340 \times 0.03 = 10.2$. One dose: $20 \times 0.07 = 1.4$. None: 40 (unless they have had measles). Total about **52** susceptible pupils, of whom 40 are unvaccinated.

The immune proportion is about $348/400 = 87\%$, below the threshold of about 93% needed for measles, so further spread is likely.

**Response.** Notify the health protection team. Identify contacts. Offer MMR or MMRV to unvaccinated and partially vaccinated pupils and staff, ideally within 72 hours of exposure. Exclude cases until 4 days after the rash appears, and advise susceptible contacts with immunosuppression, pregnant contacts and infant siblings to seek advice about immunoglobulin. Communicate clearly and quickly with parents, in the languages they use. After the outbreak, look at why 10% of pupils were unvaccinated and work with the community on access and trust.
:::
:::
