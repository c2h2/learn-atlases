On a Monday morning a GP sees three patients with vomiting and bloody diarrhoea. All three were guests at the same wedding on Saturday. Each patient will be treated individually, but the GP's most important action takes less than five minutes: a telephone call to the local health protection team. That call starts a chain of events that may identify the food responsible, stop it being served to anyone else, find guests who are ill but have not seen a doctor, and prevent infection spreading in their homes and workplaces.

Communicable disease control is the public health response to infection: watching for it (surveillance), recognising when something unusual is happening, investigating it, and interrupting transmission. It ranges from a single case of meningococcal disease to a global pandemic. This chapter covers the vocabulary of transmission, surveillance and notification, the investigation of outbreaks, the control measures available, and preparedness for pandemics, including the International Health Regulations. The microbiology of individual infections and infection control in hospitals are covered in [[infectious-diseases/stewardship-outbreaks]] and [[microbiology/infection-control]].

## The language of transmission {#transmission}

An infection spreads through a **chain of infection**: an infectious agent leaves a **reservoir** (a person, animal or environment) through a **portal of exit**, travels by a **mode of transmission** (contact, droplet, airborne, faecal–oral, vector-borne, blood-borne, or vertical from mother to child), enters a **susceptible host** through a **portal of entry**, and causes infection. Control measures work by breaking one or more links.

::: definition Time periods and attack rates {#def-periods}
- The **incubation period** is the time from infection to the onset of symptoms.
- The **latent period** is the time from infection to the onset of infectiousness. It can be shorter than the incubation period, so that people transmit before they have symptoms (as in influenza and COVID-19), which makes control harder.
- The **infectious period** is the time during which an infected person can transmit.
- The **serial interval** is the time between symptom onset in a case and symptom onset in the people they infect. The **generation interval** is the corresponding time between infections.
- The **attack rate** is the proportion of an exposed population who become ill during an outbreak: cases divided by the number exposed. (It is a proportion, not a rate.)
- The **secondary attack rate** is the proportion of susceptible contacts of a primary case who become infected within the incubation period: a measure of transmissibility in settings such as households.
:::

The basic and effective reproduction numbers $R_0$ and $R_e$, introduced in [[public-health/vaccination-programmes]], measure how many people each case infects. $R_e$ depends on the probability of transmission per contact, the number of contacts per unit time and the duration of infectiousness. Every control measure reduces one of these three.

::: theorem Control measures act on the components of R {#thm-r-components}
The effective reproduction number can be written as

$$
R_e = \beta \times c \times D \times s,
$$ {#eq-r-components}

where $\beta$ is the probability of transmission per contact, $c$ the number of contacts per unit time, $D$ the duration of infectiousness and $s$ the proportion of contacts who are susceptible. An epidemic declines when $R_e < 1$. Independent interventions that each reduce one factor by a proportion multiply together.
:::

::: proof
Each infectious person makes $c$ contacts per day for $D$ days, giving $cD$ contacts in total. Of these, a fraction $s$ are with susceptible people, and each such contact transmits with probability $\beta$. The expected number of new infections is therefore $\beta c D s$. Hand hygiene, masks and condoms reduce $\beta$; isolation, social distancing and closure of settings reduce $c$; early diagnosis and treatment (for example of tuberculosis or sexually transmitted infections) shorten $D$; vaccination and prophylaxis reduce $s$. If one measure reduces $c$ by 50% and another reduces $\beta$ by 30%, the new $R_e$ is $0.5 \times 0.7 = 0.35$ times the original. This is why combinations of imperfect measures can control an epidemic that no single measure could.
:::

## Surveillance {#surveillance}

::: definition Public health surveillance {#def-surveillance}
**Surveillance** is the continuous, systematic collection, analysis and interpretation of health-related data, and the timely dissemination of the results to those who need to act. Its purposes are to detect outbreaks and new threats, to monitor trends, to evaluate interventions such as vaccination, and to guide policy. Surveillance is "information for action": data that are collected but not used are not surveillance.
:::

Surveillance systems include:

- **Passive surveillance**: clinicians and laboratories report cases as required (notifications, laboratory reports). It is cheap but incomplete.
- **Active surveillance**: public health staff seek out cases, for example by contacting hospitals daily during an outbreak.
- **Laboratory surveillance**: reports of organisms identified, now including whole-genome sequencing, which can link cases that seem unrelated (for example *Salmonella* or *Listeria* cases across the country traced to one food producer) and detect antimicrobial resistance.
- **Sentinel surveillance**: a sample of practices or hospitals reports in detail, as in the network of GP practices that reports influenza-like illness and takes swabs.
- **Syndromic surveillance**: monitors non-specific indicators such as NHS 111 calls, GP consultations and emergency department attendances for symptoms such as diarrhoea or respiratory illness, giving early warning before diagnoses are confirmed.
- **Environmental surveillance**: wastewater testing for viruses (used for SARS-CoV-2 and for poliovirus, which was detected in London sewage in 2022) and monitoring of vectors.
- **Event-based surveillance**: scanning media, reports and international sources for signals of unusual events.

The evaluation of a surveillance system considers its sensitivity, predictive value, timeliness, representativeness, simplicity, flexibility and acceptability.

### Notification of infectious diseases in England {#notification}

Under the **Health Protection (Notification) Regulations 2010**, registered medical practitioners in England must notify the "proper officer" of the local authority (in practice, the local UKHSA health protection team) of patients they suspect of having a **notifiable disease**. Key features:

- Notification is required on **clinical suspicion**. The doctor should not wait for laboratory confirmation.
- Notification should be made within **3 days**, and by telephone within **24 hours** if the case is urgent (for example meningococcal disease, measles, diphtheria, or suspected food poisoning in a food handler).
- Diagnostic laboratories separately notify the **causative agents** they identify.
- Doctors must also notify other infections or contamination (chemical or radiological) that present, or could present, significant harm to human health, even if not on the list.

The list includes, among others, acute meningitis, acute encephalitis, acute infectious hepatitis, cholera, diphtheria, enteric fever (typhoid and paratyphoid), food poisoning, haemolytic uraemic syndrome, infectious bloody diarrhoea, invasive group A streptococcal disease, Legionnaires' disease, malaria, measles, meningococcal septicaemia, mumps, plague, rabies, rubella, scarlet fever, tuberculosis, viral haemorrhagic fevers and whooping cough. Scotland, Wales and Northern Ireland have their own legislation and lists.

In England, the **UK Health Security Agency** (UKHSA, operational since October 2021) leads on infectious disease surveillance and response, with local **health protection teams** led by consultants in health protection. Directors of public health in local authorities, environmental health officers (who inspect food premises and investigate food-borne outbreaks) and NHS infection prevention and control teams work with them.

::: warning Notify on suspicion, not confirmation
A common error is to wait for a laboratory result before notifying. In meningococcal disease, contacts need antibiotic prophylaxis within 24 hours of the diagnosis; in measles, post-exposure vaccination works best within 72 hours of exposure; in food poisoning, a contaminated product may still be on sale. A notification that later turns out to be wrong costs very little. A delayed one can cost lives. The legal duty applies to the clinical suspicion, and health protection teams would rather hear early.
:::

## Investigating an outbreak {#outbreaks}

::: definition Outbreak {#def-outbreak}
An **outbreak** is two or more cases of an infection linked in time and place, or a greater than expected number of cases in a given time and place, or a single case of a particularly serious disease (such as diphtheria, a viral haemorrhagic fever or a case of polio). An **epidemic** is an increase in cases above the expected level in a population, usually over a larger area; a **pandemic** is an epidemic across several countries or continents. An infection is **endemic** when it is constantly present at a baseline level in a population.
:::

Outbreak investigation follows a set of steps, which in practice overlap and run in parallel with control:

::: algorithm Steps in investigating an outbreak {#alg-outbreak}
1. **Prepare and confirm the outbreak.** Check that the number of cases really exceeds what is expected (rule out changes in reporting, testing or population) and confirm the diagnosis with the laboratory.
2. **Convene an outbreak control team** if the outbreak is significant, with clear roles: health protection, microbiology, environmental health, communications, and the organisations affected.
3. **Define a case.** A case definition specifies person, place, time and clinical or laboratory criteria, often in tiers (confirmed, probable, possible). It is broad early on to find cases and narrower later for analytical studies.
4. **Find cases** and collect information on them with a standard questionnaire.
5. **Describe the outbreak** by time (an epidemic curve), place (a map) and person (age, sex, exposures).
6. **Generate hypotheses** about the source and mode of transmission.
7. **Test hypotheses** with analytical studies (cohort or case–control), microbiological typing and environmental investigation.
8. **Implement control measures** as soon as there is reason to act; do not wait for certainty.
9. **Communicate** with the public, professionals and those affected throughout.
10. **Evaluate and report**: declare the outbreak over (usually after two incubation periods without new cases), write a report with lessons learned, and change practice.
:::

### The epidemic curve {#epicurve}

An **epidemic curve** is a histogram of cases by date of symptom onset. Its shape suggests the type of outbreak:

- A **point-source** outbreak, from a single exposure at one time (a wedding meal), produces a sharp rise and fall within the range of one incubation period. The likely exposure time can be estimated by counting back one median incubation period from the peak.
- A **continuous common-source** outbreak (a contaminated water supply) produces a plateau that lasts as long as the exposure.
- A **propagated** outbreak, spread from person to person, produces successive waves separated by about one serial interval, usually growing until control measures or immunity slow it.

::: example Estimating the time of exposure {#ex-exposure-time}
In an outbreak of norovirus among the staff of an office, the first case began vomiting at 06:00 on Wednesday, the peak of cases was at 18:00 on Wednesday, and the last case began at 08:00 on Thursday. The incubation period of norovirus is usually 12 to 48 hours, with a median of about 33 hours. When was the likely exposure, and what does the curve suggest?
::: solution
**Counting back from the peak** by the median incubation period: 18:00 Wednesday minus 33 hours is 09:00 on Tuesday.

**Checking with the range.** The earliest case (06:00 Wednesday) minus the minimum incubation (12 hours) gives 18:00 on Tuesday as the latest plausible exposure time for that case. The last case (08:00 Thursday) minus the maximum incubation (48 hours) gives 08:00 on Tuesday as the earliest plausible exposure. An exposure on Tuesday between about 08:00 and 18:00 fits all the cases.

All the cases fall within about one incubation period, which suggests a **point source**, for example food at a Tuesday lunchtime meeting or a contaminated shared surface, rather than person-to-person spread. Norovirus very often spreads from person to person, so investigators would watch for a second wave one to two days later, among household contacts and colleagues, and advise strict hand washing with soap and water (alcohol gel is less effective against norovirus), cleaning with chlorine-based products and exclusion of cases until 48 hours after symptoms stop.
:::
:::

::: example A wedding meal {#ex-wedding}
Of 120 guests at a wedding, 47 develop diarrhoea and vomiting between 12 and 48 hours after the meal. A cohort study of all guests gives the following results:

| Food | Ate: ill / total | Did not eat: ill / total |
|---|---|---|
| Chicken | 42 / 70 | 5 / 50 |
| Rice salad | 30 / 80 | 17 / 40 |

Calculate the attack rates and relative risk for each food. Which food is the likely vehicle, and what should happen next?
::: solution
**Chicken.** Attack rate in those who ate it $= 42/70 = 60\%$; in those who did not $= 5/50 = 10\%$. Relative risk $= 0.60/0.10 = 6.0$.

**Rice salad.** Attack rate $= 30/80 = 37.5\%$ against $17/40 = 42.5\%$. Relative risk $= 0.375/0.425 = 0.88$.

The chicken is strongly associated with illness and the rice salad is not. The five ill guests who did not eat chicken may have eaten it without remembering (recall is imperfect), had a cross-contaminated dish, or had a different illness. The incubation period of 12–48 hours fits *Salmonella* or *Campylobacter*, among others; *Clostridium perfringens* (8–22 hours) is also possible with poultry cooked in bulk and cooled slowly.

**Next steps.** Stool samples from cases for culture or PCR and typing; samples of leftover food; inspection of the caterer by environmental health officers, focusing on cooking, cooling and storage temperatures; checking whether food handlers are ill (they must be excluded from work until 48 hours after symptoms stop); advice to cases on hygiene and on exclusion from work if they handle food or work in health or social care; and a check on whether the caterer has supplied other events. Statistical tests and confidence intervals for the relative risks would be reported.
:::
:::

When the exposed group cannot be defined (for example, cases scattered across a country), a **case–control study** compares exposures among cases with those among controls, and the measure of association is the odds ratio. Whole-genome sequencing now often links scattered cases and points to a common source, which is then confirmed by traceback through the food supply chain.

## Control measures {#control}

Control measures act on the source, the route of transmission and the susceptible population.

**The source.** Treat cases (which shortens infectiousness), remove a contaminated food from sale, close and decontaminate a cooling tower (Legionnaires' disease), cull infected animals, or treat water.

**The route.** Hand hygiene, food hygiene, safe water and sanitation, ventilation, masks and personal protective equipment, safer sex, and vector control.

**The people at risk.** Vaccination, post-exposure prophylaxis with antibiotics, antivirals, vaccine or immunoglobulin, and education.

::: definition Isolation, quarantine and exclusion {#def-isolation}
- **Isolation** separates people who are *ill or known to be infected* from others to prevent transmission (for example a patient with open pulmonary tuberculosis in a negative-pressure room).
- **Quarantine** restricts the movement of people who are *well but have been exposed*, for the duration of the incubation period, in case they become infectious.
- **Exclusion** keeps cases or contacts away from particular settings, such as school, nursery or food handling, for a defined period. For example, children and adults with diarrhoea or vomiting are usually excluded from school, nursery or work until 48 hours after symptoms have stopped, and stricter rules apply to some infections (such as Shiga toxin-producing *E. coli*) in high-risk groups.

In England, health protection legislation allows magistrates to order measures such as detention or isolation in rare cases where a person poses a significant risk and does not cooperate voluntarily. Such powers must be proportionate and are a last resort.
:::

### Contact tracing {#contact-tracing}

**Contact tracing** identifies people who have been exposed to a case, assesses them, and offers them testing, prophylaxis, vaccination, advice or quarantine. It is central to the control of tuberculosis, sexually transmitted infections (where it is called partner notification), meningococcal disease, measles, viral haemorrhagic fevers and, at the start of an epidemic, new infections.

Contact tracing works best when the infection has a long incubation period relative to the time needed to trace, when most transmission happens after symptoms start, and when contacts can be identified. It struggles when much transmission is presymptomatic or asymptomatic, as with COVID-19 and influenza, because by the time a case is identified, their contacts may already be infectious. **Backward tracing** (asking where the case was infected) can find clusters and superspreading events, which are often more productive targets than forward tracing of each individual's contacts.

::: widget graph
nodes: Index; Partner; Child; Colleague1; Colleague2; Friend; Partner2; Classmate
edges: Index-Partner; Index-Child; Index-Colleague1; Index-Colleague2; Index-Friend; Friend-Partner2; Child-Classmate; Colleague1-Colleague2
algorithm: bfs
start: Index
caption: A contact network for an index case, traced outward in generations by breadth-first search. First-generation contacts (partner, child, colleagues, friend) are found first, then their contacts. Real tracing is limited by time: if contacts become infectious before they are reached, the second generation escapes control. Step through the search and consider which contacts would be the highest priority for an infection with a short latent period.
:::

::: example Meningococcal disease in a household {#ex-meningococcal}
A 17-year-old student is admitted with meningococcal septicaemia. She lives with her parents and her younger brother, and her boyfriend stayed overnight at the house two days before she became ill. She attended college last week. Which contacts need prophylaxis, and what else should happen?
::: solution
**Notify** the health protection team urgently by telephone on clinical suspicion; do not wait for confirmation.

**Close contacts** are those who have had prolonged close contact with the case in a household-type setting during the 7 days before onset: here, her parents, her brother and the boyfriend who stayed overnight. Their risk is several hundred times that of the general population in the following weeks, mainly because they may carry the same strain. They are offered **antibiotic prophylaxis** (ciprofloxacin is commonly used) to eradicate carriage, ideally within 24 hours of the diagnosis, according to UKHSA guidance. If the strain is a vaccine-preventable serogroup (for example C, W or Y, or B for some contacts), close contacts may also be offered vaccine.

**College contacts** are not usually given prophylaxis after a single case, because their risk is only slightly raised. Instead, the college is given information on the signs and symptoms of meningococcal disease, to encourage early presentation. Two or more cases in the same setting would lead to a review of wider prophylaxis and vaccination.

**Health workers** need prophylaxis only if their mouth or nose was directly exposed to the patient's respiratory secretions (for example during intubation without a mask).

The case herself should receive an antibiotic that clears carriage if her treatment did not already include one.
:::
:::

### How fast is it spreading? {#growth}

At the start of an epidemic, cases grow roughly exponentially. If each generation of infection multiplies the number of cases by $R$, and generations are $T_g$ days apart, the **doubling time** is approximately

$$
T_d = T_g \times \frac{\ln 2}{\ln R}.
$$ {#eq-doubling}

::: example Combining interventions {#ex-combining}
A new respiratory virus has $R_0 = 2.5$ and a generation interval of 5 days. (a) What is the doubling time? (b) Measures that reduce contacts by half are introduced. What is $R_e$, and the new doubling time? (c) In addition, rapid testing and isolation cut the remaining transmission by 30%. What is $R_e$ now?
::: solution
(a) $T_d = 5 \times \ln 2/\ln 2.5 = 5 \times 0.693/0.916 = 3.8$ days. Cases double almost twice a week.

(b) $R_e = 2.5 \times 0.5 = 1.25$. $T_d = 5 \times 0.693/0.223 = 15.5$ days. The epidemic still grows, but much more slowly, buying time for health services and vaccine development.

(c) $R_e = 1.25 \times 0.7 = 0.875$. Below 1, the epidemic declines. Neither measure alone achieves this; together they do, as [[#thm-r-components]] predicts. The costs and harms of each measure (economic, social, educational) must be weighed, and the measures relaxed in an order and pace that keeps $R_e$ manageable.
:::
:::

## Health care-associated infection and antimicrobial resistance {#hcai}

Infections acquired in health care settings, including *Clostridioides difficile*, MRSA bacteraemia, Gram-negative bloodstream infections, norovirus outbreaks on wards and surgical site infections, are under mandatory surveillance in England. They are controlled by infection prevention and control (hand hygiene, isolation, cleaning, device care) and by antimicrobial stewardship. Antimicrobial resistance is one of the most serious long-term threats to communicable disease control: it turns treatable infections into untreatable ones and undermines surgery, cancer treatment and intensive care. Its global dimension is covered in [[public-health/global-health]], and stewardship in [[infectious-diseases/stewardship-outbreaks]].

## Pandemic preparedness and the International Health Regulations {#ihr}

::: definition The International Health Regulations {#def-ihr}
The **International Health Regulations (2005)** (IHR) are a legally binding instrument of international law, adopted by the World Health Assembly, which commit 196 States Parties to:

- develop core capacities to detect, assess, report and respond to public health events;
- notify the WHO within 24 hours of assessment of any event that may constitute a **public health emergency of international concern** (PHEIC);
- avoid health measures that interfere unnecessarily with international travel and trade.

A **PHEIC** is an extraordinary event that constitutes a public health risk to other states through the international spread of disease and potentially requires a coordinated international response. It is declared by the WHO Director-General on the advice of an Emergency Committee. Each country has a **National IHR Focal Point**; in the UK this function sits within UKHSA.
:::

PHEICs have been declared for H1N1 influenza (2009), polio (2014, still in place), Ebola in West Africa (2014) and in the Democratic Republic of the Congo (2019), Zika (2016), COVID-19 (2020), and mpox (2022, and again in 2024 until September 2025).

The COVID-19 pandemic exposed weaknesses in the regulations: delayed notification and information sharing, inequitable access to vaccines and other countermeasures, and widespread non-compliance. Amendments to the IHR adopted by the World Health Assembly in 2024 entered into force in September 2025. They introduce a new, higher alert level, the **pandemic emergency**, and strengthen provisions on equity, national IHR authorities and financing. Separately, the World Health Assembly adopted the **WHO Pandemic Agreement** on 20 May 2025. It covers prevention (including a One Health approach), research and development, technology transfer and equitable access; its annex on pathogen access and benefit sharing was still being negotiated, and the agreement needs 60 ratifications to enter into force.

National preparedness includes surveillance and laboratory capacity, stockpiles of countermeasures, plans for surge capacity in health services, legal powers, risk communication and exercises to test plans. The first report of the UK COVID-19 Inquiry (2024) concluded that the UK had prepared for the wrong pandemic, an influenza pandemic, and had not planned adequately for the testing, contact tracing and isolation needed for a different kind of pathogen, nor for the effects of measures on the most vulnerable groups.

::: quiz
A GP sees a 6-year-old with a fever and a maculopapular rash, conjunctivitis and cough. The child is unvaccinated. Measles is suspected but no test has yet been done. What should the GP do about notification?
- [ ] Wait for a positive measles test, then notify within 3 days.
- [ ] Notify only if there are other cases in the area.
- [x] Notify the health protection team urgently by telephone now, on clinical suspicion.
- [ ] Notification is not needed because the child will recover at home.
::: solution
Measles is notifiable on clinical suspicion, and it is an urgent notification because susceptible contacts (including infants, pregnant women and immunosuppressed people in the waiting room) may need post-exposure vaccination within 72 hours or immunoglobulin. The health protection team will arrange testing (often an oral fluid kit) and contact tracing. The child should be kept away from others, including in the practice, and excluded from school until 4 days after the rash appeared.
:::
:::

::: history
In 1854 John Snow mapped deaths from cholera around the Broad Street pump in Soho and persuaded the local board to remove the pump handle; his comparison of deaths among customers of two water companies supplied the stronger evidence that cholera was water-borne. William Farr, at the General Register Office, built the system of vital statistics on which surveillance depends. The Infectious Disease (Notification) Act 1889 made notification compulsory in much of England. In the 1900s, Mary Mallon ("Typhoid Mary"), an asymptomatic carrier who worked as a cook in New York, showed how carriers sustain outbreaks, and raised enduring questions about the limits of compulsion. Alexander Langmuir founded the Epidemic Intelligence Service at the US Communicable Disease Center in 1951 and defined modern surveillance as information for action. The SARS outbreak of 2003 led to the revision of the International Health Regulations in 2005, and the COVID-19 pandemic to their amendment in 2024 and the WHO Pandemic Agreement of 2025.
:::

## Where this leads

Vaccination as a control tool is covered in [[public-health/vaccination-programmes]]; the international system for health security, One Health and antimicrobial resistance in [[public-health/global-health]]; the microbiology of outbreaks and stewardship in [[infectious-diseases/stewardship-outbreaks]]; and infection prevention in hospitals in [[microbiology/infection-control]]. The epidemiological methods used in outbreak studies are in [[epidemiology-ebm/observational-studies]].

::: summary
- Transmission follows a chain from reservoir to susceptible host; control breaks the links. Key periods are incubation, latent, infectious and serial interval; the attack rate and secondary attack rate measure spread.
- $R_e = \beta c D s$: control measures reduce transmission per contact, contacts, duration of infectiousness or susceptibility, and their effects multiply.
- **Surveillance** is information for action: passive, active, laboratory and genomic, sentinel, syndromic, environmental and event-based.
- In England, doctors must notify suspected notifiable diseases to the health protection team **on clinical suspicion**, urgently by telephone for urgent cases (Health Protection (Notification) Regulations 2010).
- Outbreak investigation: confirm, convene a team, define cases, find and describe them (epidemic curve), generate and test hypotheses (cohort or case–control studies, typing, environmental investigation), control, communicate and evaluate. Act before certainty.
- **Isolation** separates the infected; **quarantine** restricts the exposed; **exclusion** keeps people out of specific settings. Contact tracing works best when transmission occurs after symptoms.
- The **IHR (2005)** require countries to build core capacities and notify possible **PHEICs**; 2024 amendments in force from September 2025 add a **pandemic emergency** level; the WHO Pandemic Agreement was adopted in May 2025.
:::

## Exercises

::: exercise Attack rate {level=1 check="25"}
Of 240 people who attended a conference lunch, 60 developed gastroenteritis. What is the attack rate, as a percentage?
::: solution
$60/240 = 0.25$, or 25%.
:::
:::

::: exercise Secondary attack rate {level=1 check="15"}
Twenty primary cases of an infection had 60 susceptible household contacts between them. Within one incubation period, 9 of these contacts became ill. Calculate the secondary attack rate as a percentage.
::: solution
$9/60 = 0.15$, or 15%.
:::
:::

::: exercise Isolation or quarantine? {level=1}
Classify each as isolation, quarantine or exclusion. (a) A traveller returning from an area with an Ebola outbreak, who cared for a patient but is well, is asked to stay at home and take their temperature twice daily for 21 days. (b) A patient with pulmonary tuberculosis is admitted to a negative-pressure room. (c) A nursery worker with norovirus stays off work until 48 hours after her last episode of vomiting.
::: solution
(a) Quarantine (or, with active monitoring, a form of it): the person is exposed but well. (b) Isolation: the person is infected and infectious. (c) Exclusion: a case is kept away from a specific setting for a defined period.
:::
:::

::: exercise Relative risk in a cohort study {level=2 check="round(100*(24/40)/(6/60))/100"}
At a barbecue, 24 of 40 people who ate burgers became ill, compared with 6 of 60 who did not. Calculate the relative risk to 2 decimal places.
::: solution
Attack rates: $24/40 = 0.60$ and $6/60 = 0.10$. RR $= 0.60/0.10 = 6.00$.
:::
:::

::: exercise Doubling time {level=2 check="round(10*4*log(2)/log(1.3))/10"}
An epidemic has $R_e = 1.3$ and a generation interval of 4 days. Calculate the doubling time in days, to 1 decimal place.
::: solution
$T_d = 4 \times \ln 2/\ln 1.3 = 4 \times 0.693/0.262 = 10.6$ days.
:::
:::

::: exercise What reduction is needed? {level=2 check="60"}
An infection has $R_0 = 2.5$ in a fully susceptible population. By what percentage must contacts be reduced (with nothing else changing) to bring $R_e$ to exactly 1?
::: solution
We need $2.5 \times (1 - r) = 1$, so $1 - r = 0.4$ and $r = 0.6$: contacts must fall by 60%.
:::
:::

::: exercise Reading an epidemic curve {level=2}
Describe the shape of the epidemic curve you would expect in (a) an outbreak of *Salmonella* from a single contaminated dessert at a party, (b) an outbreak of *Cryptosporidium* from a contaminated public water supply that continued for two weeks before it was detected, and (c) an outbreak of measles in a school. For (a), how would you estimate the time of exposure?
::: solution
(a) Point source: a single sharp peak, with cases spread over roughly one incubation period (for *Salmonella*, mostly 12–72 hours). The likely exposure time is found by counting back one median incubation period from the peak, or by checking that the earliest and latest cases fit the minimum and maximum incubation periods. (b) Continuous common source: a rise to a plateau lasting about as long as the exposure, then a decline over one incubation period (several days for *Cryptosporidium*) after the supply is made safe. (c) Propagated: a first case or cluster, then successive waves of cases about one serial interval apart (about 10–14 days for measles), growing until control measures or immunity slow transmission.
:::
:::

::: exercise A scattered outbreak {level=3}
UKHSA's genomic surveillance identifies 35 cases of *Salmonella* with almost identical genomes in different parts of England over six weeks. The cases range from 2 to 85 years of age. Describe how the source could be identified and controlled.
::: solution
**Confirm and organise.** The genomic link defines a likely outbreak; an incident team is formed with UKHSA, local health protection teams, the Food Standards Agency and environmental health.

**Case definition.** Laboratory-confirmed *Salmonella* of the outbreak strain (within a set number of SNPs) with onset in the time window; probable cases may be added.

**Describe.** Map cases, plot the epidemic curve (a prolonged curve suggests a continuous source such as a widely distributed food), and look at age and sex.

**Hypotheses.** Interview cases with a detailed food history questionnaire (often a "trawling" questionnaire), and look for common foods, shops or restaurants. Supermarket loyalty card data, with consent, can identify specific products.

**Test.** A case–control study comparing cases with controls (for example people with other illnesses, or controls from a market research panel) gives odds ratios for candidate foods. Test food samples and trace back through suppliers; sequencing isolates from food or the production site can confirm the link. International databases may show matching cases in other countries if the product was imported.

**Control.** Withdraw and recall the product as soon as evidence is sufficient; issue public advice; inform other countries via the international networks if the product was traded; and work with the producer to correct the fault. Continue surveillance to confirm that cases stop.
:::
:::

::: exercise Is contact tracing worth it? {level=3}
For which of these infections would you expect contact tracing to be most effective, and why: (a) tuberculosis, (b) influenza, (c) a new infection with an incubation period of 10 days, transmission only after symptom onset, and severe illness in most cases?
::: solution
(c) is the most favourable. Transmission only after symptoms means that cases can be isolated as soon as they are ill, and the long incubation period gives time to find contacts and quarantine them before they become infectious. Severe illness means that cases are recognised. These features (similar to SARS in 2003) explain why that outbreak was controlled without vaccines.

(a) Tuberculosis also suits contact tracing, because transmission requires prolonged contact, the incubation period is long, and contacts with latent infection can be found by testing and treated to prevent disease. It is resource-intensive but effective, and is standard practice.

(b) Influenza is the least suitable: its incubation period is about 2 days, transmission begins around symptom onset or before, and many infections are mild or asymptomatic. By the time contacts are traced they may already be infectious. Control relies instead on vaccination, antivirals for high-risk people, and general measures.
:::
:::
