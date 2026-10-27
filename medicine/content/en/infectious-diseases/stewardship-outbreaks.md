Antibiotics changed medicine more than almost any other invention. They made pneumonia, meningitis and childbirth survivable, and they underpin surgery, chemotherapy, transplantation and intensive care. Every use of an antibiotic also selects for resistance, and resistance spreads between people, animals and the environment. The Global Research on Antimicrobial Resistance (GRAM) project estimated that in 2021 bacterial antimicrobial resistance directly caused about 1.14 million deaths and was associated with 4.71 million, and forecast more than 39 million deaths directly caused by resistance between 2025 and 2050 if trends continue.

This chapter is about the public-health half of infectious diseases. It covers how bacteria resist antibiotics, how pharmacology and the laboratory guide good prescribing, the practice of **antimicrobial stewardship**, and the investigation and control of **outbreaks**. UK practice follows NICE (NG15), UK Health Security Agency guidance including "Start smart, then focus", and the UK national action plan *Confronting antimicrobial resistance 2024 to 2029*; global practice follows WHO.

## How bacteria resist

::: definition Antimicrobial resistance {#def-resistance}
**Antimicrobial resistance** is the ability of a microorganism to survive or grow in the presence of a drug concentration that would normally kill or inhibit it. **Intrinsic resistance** is a property of the whole species (for example, Gram-negative bacteria are not affected by vancomycin, whose large molecule cannot cross their outer membrane). **Acquired resistance** arises in previously susceptible strains, by **mutation** or by **acquisition of genes** from other bacteria.

The mechanisms fall into four groups:

1. **Destroying or modifying the drug**: beta-lactamases hydrolyse the beta-lactam ring. They range from simple penicillinases to **extended-spectrum beta-lactamases (ESBLs, such as CTX-M)**, which destroy third-generation cephalosporins, and **carbapenemases (KPC, OXA-48, NDM, VIM, IMP)**, which also destroy carbapenems. Aminoglycoside-modifying enzymes act in a similar way.
2. **Altering the target**: MRSA makes an alternative penicillin-binding protein (PBP2a, encoded by *mecA*) with low affinity for beta-lactams; enterococci with *vanA* build cell walls ending in D-Ala–D-Lac, which vancomycin binds poorly; mutations in DNA gyrase cause fluoroquinolone resistance, and mutations in *rpoB* rifampicin resistance.
3. **Reducing entry**: loss of outer-membrane porins in Gram-negative bacteria.
4. **Pumping the drug out**: efflux pumps, often acting on several drug classes at once.

**Horizontal gene transfer** spreads resistance genes between bacteria, including between species: **conjugation** of plasmids (the main route for ESBL and carbapenemase genes), **transformation** by free DNA and **transduction** by bacteriophages. Plasmids often carry several resistance genes together, as well as genes for disinfectant and metal resistance.
:::

::: proof
**Why antibiotic use selects resistance, and why it rarely goes away.** Suppose a population of bacteria contains a small fraction of resistant cells. Without antibiotic, resistance genes usually carry a **fitness cost**: the resistant cells grow slightly slower and stay rare. With antibiotic, the susceptible majority is killed and the resistant minority expands to fill the space. The more often a population (in one patient, a ward, a farm or a country) is exposed, the more resistance is enriched. This is why antibiotic consumption and resistance rates correlate across hospitals and countries.

If use stops, one might expect resistance to decline as the costly genes are lost. In practice it often persists, for three reasons: bacteria acquire **compensatory mutations** that reduce the fitness cost; resistance genes travel on plasmids with other genes, so the use of **any** drug whose resistance gene is on the same plasmid co-selects them all; and reservoirs in the community, in animals and in the environment keep reintroducing resistant strains. Stewardship therefore aims to prevent resistance emerging and spreading, rather than relying on it to disappear.
:::

The colistin story shows how quickly this can happen. Colistin was an old, toxic drug held back as a last resort for carbapenem-resistant infections, but it had been used heavily in livestock. In 2015 researchers in China identified *mcr-1*, a plasmid-borne colistin resistance gene, in bacteria from pigs and patients; within months it had been found in many countries. This is a **One Health** problem: human, animal and environmental antibiotic use and resistance are linked.

## Using antibiotics well: pharmacology

::: theorem Pharmacokinetic–pharmacodynamic targets {#thm-pkpd}
An antibiotic's effect depends on how its concentration over time compares with the **minimum inhibitory concentration (MIC)** of the organism. Antibiotics fall into three groups:

- **Time-dependent killing** (beta-lactams): what matters is the **fraction of the dosing interval during which the free concentration exceeds the MIC** ($fT_{>\text{MIC}}$). Frequent dosing or prolonged infusions achieve this.
- **Concentration-dependent killing** (aminoglycosides): what matters is the **peak concentration relative to the MIC** ($C_{\max}/\text{MIC}$). Large once-daily doses achieve high peaks and allow the drug to clear before the next dose, which also reduces kidney toxicity.
- **Exposure-dependent killing** (vancomycin, fluoroquinolones): what matters is the **area under the concentration–time curve relative to the MIC** ($\text{AUC}/\text{MIC}$).

For a drug eliminated by first-order kinetics, $C(t) = C_0 e^{-kt}$ with half-life $t_{1/2} = \ln 2/k$, so the time for the concentration to fall from $C_0$ to the MIC is

$$
t_{>\text{MIC}} = \frac{\ln(C_0/\text{MIC})}{k} = t_{1/2} \log_2\!\left(\frac{C_0}{\text{MIC}}\right).
$$
:::

::: widget plot
f: 40*exp(-ln(2)*x/h); m
x: 0, 8
y: 0, 42
sliders: h=1:0.5:4:0.25; m=2:0.25:16:0.25
labels: \text{concentration (mg/L)}; \text{MIC}
caption: Concentration of a beta-lactam after a single intravenous dose (peak 40 mg/L), with half-life $h$ hours, over an 8-hour dosing interval, against an organism with MIC $m$ mg/L. The time during which the curve stays above the MIC line is $fT_{>\text{MIC}}$. Doubling the MIC shortens it by one half-life, so organisms with higher MICs need more frequent dosing or a prolonged infusion. Illustrative values; real dosing comes from the formulary and therapeutic drug monitoring.
:::

::: example How long above the MIC? {#ex-pkpd}
A beta-lactam given every 8 hours reaches a free peak concentration of 40 mg/L and has a half-life of 1 hour. (a) For how long is the concentration above an MIC of 2 mg/L? (b) What fraction of the dosing interval is this? (c) What happens if the organism's MIC is 8 mg/L?
::: solution
(a) $t_{>\text{MIC}} = 1 \times \log_2(40/2) = \log_2 20 = 4.32$ hours.

(b) $4.32/8 = 0.54$, so the concentration is above the MIC for 54% of the interval. For penicillins, a target of roughly 50% is usually adequate.

(c) $t_{>\text{MIC}} = \log_2(40/8) = \log_2 5 = 2.32$ hours, only 29% of the interval. Options are to give the same total dose more often (every 6 or 4 hours), to use a **prolonged or continuous infusion**, or to choose another drug. This reasoning underlies extended-infusion beta-lactams in intensive care and the use of breakpoints that link MICs to achievable doses.
:::
:::

## Using antibiotics well: the laboratory

::: definition Susceptibility testing and the antibiogram {#def-antibiogram}
**Susceptibility testing** measures how an isolate responds to antibiotics, by determining the **MIC** (the lowest concentration that inhibits visible growth) or by disc diffusion. Results are interpreted using **clinical breakpoints** set by bodies such as EUCAST (used in the UK): **S** (susceptible at standard dosing), **I** ("susceptible, increased exposure": effective if a higher dose or concentration at the site is achieved) and **R** (resistant).

An **antibiogram** is a summary of the percentage of isolates of each organism that are susceptible to each antibiotic in a given hospital or region over a period, usually counting only the first isolate per patient. It describes local resistance and is the basis of **empirical** prescribing guidelines: an antibiotic is generally not used empirically for a serious infection if a substantial share of the likely organisms (often above 10–20%) are resistant to it.
:::

Rapid diagnostics are changing this picture: molecular tests can detect resistance genes such as *mecA* or carbapenemases directly from positive blood cultures within hours, allowing earlier targeted treatment. "Diagnostic stewardship" means testing the right patients with the right tests: urine cultures from people with symptoms rather than routine screening, and *C. difficile* tests on liquid stools only.

::: example A resistant *E. coli* {#ex-esbl}
A 72-year-old woman with type 2 diabetes is admitted with pyelonephritis and treated empirically with intravenous ceftriaxone. After 48 hours she is still febrile. Blood and urine cultures grow *E. coli* resistant to ceftriaxone, co-amoxiclav and trimethoprim, susceptible to meropenem, piperacillin–tazobactam (MIC near the breakpoint), gentamicin, temocillin and ciprofloxacin. The laboratory reports it as an **ESBL producer**.
::: solution
**Interpretation**: an ESBL hydrolyses third-generation cephalosporins, explaining the failure of ceftriaxone. ESBL genes are often carried with genes for resistance to other classes, as here.

**Choice of treatment**: for a **bloodstream infection** with an ESBL-producing *E. coli*, the MERINO trial (2018) found higher 30-day mortality with piperacillin–tazobactam than with meropenem (12.3% versus 3.7%), so a **carbapenem** is generally preferred for serious infection. Alternatives guided by susceptibility and local advice include temocillin and aminoglycosides. Once she is improving, with negative repeat cultures and able to take tablets, switching to an oral agent to which the organism is susceptible (here ciprofloxacin) completes treatment, typically 7 days in total for an uncomplicated pyelonephritis with bacteraemia that is responding well. Imaging (ultrasound or CT) looks for obstruction or abscess, which would need drainage.

**Stewardship and infection control**: the patient's record is flagged as an ESBL carrier to guide future empirical treatment; carbapenem use is reviewed daily and stopped as soon as an oral switch is possible, because carbapenem use drives carbapenemase selection.
:::
:::

## Antimicrobial stewardship

::: definition Antimicrobial stewardship {#def-stewardship}
**Antimicrobial stewardship** is an organisational or system-wide approach to promoting and monitoring the judicious use of antimicrobials, to preserve their future effectiveness (NICE NG15). Its aims are to improve outcomes for the patient, reduce adverse effects including *C. difficile* infection, and limit the emergence and spread of resistance.

Typical interventions:
- **Local guidelines** based on the antibiogram, with restriction of selected broad-spectrum agents.
- **Prospective audit and feedback** by an antimicrobial stewardship team (infection specialists and pharmacists).
- **The 48–72 hour review**: in UK "Start smart, then focus", every antibiotic prescription is reviewed with the results and a documented decision is made: **stop**, **switch** from intravenous to oral, **change** (usually narrow), **continue** with a set duration and review date, or move to **outpatient parenteral antimicrobial therapy**.
- **Shorter courses** where evidence supports them, for example 5 days for most community-acquired pneumonia in NICE guidance, and 7 rather than 14 days for many bloodstream infections (BALANCE trial, 2024).
- **Penicillin allergy assessment and de-labelling**.
- **Dose optimisation** and therapeutic drug monitoring.
- **Primary care measures**: self-care advice, **back-up (delayed) prescriptions** for respiratory infections, and point-of-care tests.

Globally, WHO's **AWaRe** classification groups antibiotics into **Access** (first- and second-choice antibiotics for common infections), **Watch** (higher resistance potential, to be used for specific indications) and **Reserve** (last-resort agents). The UK action plan for 2024–2029 aims to reduce total human antibiotic use by 5% from the 2019 baseline and to have 70% of antibiotic use come from the Access group by 2029.
:::

::: warning
**A penicillin allergy label is not a harmless precaution.** Around one in ten hospital patients carries a penicillin allergy label, and when tested more than 90% of them can take penicillin safely. Many labels record side-effects (nausea, diarrhoea), childhood rashes during viral infections, or family history. People with a label receive more broad-spectrum and second-line antibiotics, have more *C. difficile* and MRSA infections and longer hospital stays. Take a careful allergy history (what happened, when, how soon after the drug, what treatment was needed), document it precisely, and refer for de-labelling where appropriate. A history of anaphylaxis, severe skin reactions or other serious reactions is respected and recorded.
:::

::: example The day-three review {#ex-cdiff-switch}
A 67-year-old man was admitted three days ago with suspected community-acquired pneumonia (CURB-65 score 2) and started on intravenous piperacillin–tazobactam because of a vague "penicillin allergy?" note, which on questioning was nausea with amoxicillin as a child. He is now afebrile for 36 hours, eating and drinking, with heart rate 82 per minute and oxygen saturation 96% on air. CRP has fallen from 190 to 70 mg/L. Blood cultures are negative; sputum grew normal flora. Chest radiograph showed right lower lobe consolidation.
::: solution
**Review using "Start smart, then focus"**: the diagnosis of pneumonia is supported; he is clinically stable and improving, can swallow and absorb, and has no condition requiring intravenous therapy (such as meningitis, endocarditis, undrained abscess or neutropenia). The decision is to **switch** to an oral antibiotic.

**Choice**: piperacillin–tazobactam is broader than needed; the allergy history describes an intolerance, not allergy, so the label should be updated, and he can take an oral penicillin. For moderate-severity community-acquired pneumonia, a narrow oral agent per local guidance (for example amoxicillin, with a macrolide if atypical infection is suspected) completes treatment.

**Duration**: NICE recommends a **5-day course** for community-acquired pneumonia in most adults, provided they are stable by day 3. He has had 3 days, so 2 more days of oral treatment is enough.

**Why it matters**: each extra day of broad-spectrum intravenous therapy adds risk of line infection, *C. difficile* infection and resistance with no benefit. Writing the stop date on the prescription at the time of the switch prevents courses from running on by default.
:::
:::

## Outbreaks and their investigation

An **outbreak** is the occurrence of more cases of a disease than expected in a particular place, time or group of people, or two or more linked cases of an unusual infection. Outbreaks range from norovirus on a hospital ward to a food-borne outbreak at a wedding to an international epidemic.

::: definition Outbreak investigation {#def-outbreak}
**Outbreak investigation** follows a recognised sequence, although in practice several steps run at the same time and **control measures are started as soon as there is a reasonable suspicion of the source**:

1. **Prepare**: assemble the team (outbreak control group) with clear roles.
2. **Confirm the diagnosis** (clinical and laboratory) and **confirm that an outbreak exists**, excluding artefacts such as changes in testing or reporting, or laboratory contamination.
3. **Write a case definition**: clinical and laboratory criteria, restricted by **time, place and person**, often graded as confirmed, probable and possible.
4. **Find cases** systematically.
5. **Describe the outbreak** by time (an **epidemic curve**), place (maps, ward plans) and person (age, sex, exposures). A **point-source** outbreak gives a sharp single peak within one incubation period; a **continuing common source** gives a plateau; **person-to-person (propagated)** spread gives successive waves separated by about one incubation period.
6. **Form hypotheses** about the source and route, and **test them** with an analytical study: a **cohort study** comparing **attack rates** in exposed and unexposed people (giving a **relative risk**), or a **case–control study** comparing exposures in cases and controls (giving an **odds ratio**). Microbiological typing, now often whole-genome sequencing, links cases to each other and to the source.
7. **Control and prevent**: remove the source, interrupt transmission (isolation, cohorting, hygiene, closure), protect people at risk (vaccination, prophylaxis).
8. **Communicate** with staff, patients and the public, and **evaluate and report**, including lessons for prevention.
:::

::: theorem The reproduction number and herd immunity {#thm-r0}
The **basic reproduction number** $R_0$ is the average number of secondary cases caused by one infectious person in a fully susceptible population. When a fraction $s$ of the population is susceptible, the **effective reproduction number** is $R = R_0 s$. An outbreak grows while $R > 1$ and declines when $R < 1$. Transmission therefore cannot be sustained once the immune fraction exceeds the **herd immunity threshold**

$$
H = 1 - \frac{1}{R_0}.
$$

For measles, with $R_0$ commonly estimated at 12–18, the threshold is above 90%, which is why very high vaccine coverage is needed; for influenza, with $R_0$ near 1.5, it is about a third.
:::

::: widget phaseplane
f: -R*x*y
g: R*x*y - y
x: 0, 1
y: 0, 0.6
sliders: R=2.5:1.2:6:0.1
points: 0.99, 0.01
caption: A simple SIR epidemic model in the phase plane, with time measured in infectious periods: $x$ is the susceptible fraction and $y$ the infectious fraction, $R$ is $R_0$. Starting with 1% infectious, the trajectory rises while $x > 1/R$ and turns down when the susceptible fraction falls below $1/R$, the herd immunity threshold drawn as a nullcline. Increase $R$ to see a taller, faster epidemic that leaves fewer susceptibles behind. A teaching model that ignores births, deaths, age structure and interventions.
:::

::: example Illness after a wedding {#ex-outbreak}
Twelve to thirty-six hours after a wedding reception attended by 100 guests, many develop vomiting and diarrhoea. A questionnaire is completed by all guests. Of 60 who ate the chicken dish, 45 became ill; of 40 who did not, 6 became ill. Of 70 who ate the rice salad, 36 became ill; of 30 who did not, 15 became ill. Analyse these data.
::: solution
This is a **retrospective cohort study**, because the whole exposed group (the guests) can be surveyed.

**Chicken**: attack rate in those who ate it $= 45/60 = 75\%$; in those who did not $= 6/40 = 15\%$. **Relative risk** $= 0.75/0.15 = 5.0$.

**Rice salad**: attack rate $36/70 \approx 51\%$ versus $15/30 = 50\%$; relative risk $\approx 1.03$, no association.

The **chicken dish** is strongly implicated, with a fivefold risk. The six ill people who said they did not eat it may have misremembered, had a small taste or been secondary cases. The incubation period of 12–36 hours and the symptoms fit, for example, *Clostridium perfringens* or *Salmonella*; stool samples from cases and any leftover food are tested, and the kitchen's practices (cooling and reheating of large batches of meat) are inspected by environmental health. The epidemic curve would be expected to show a **point-source** pattern with a single peak.
:::
:::

::: example A pseudo-outbreak {#ex-pseudo}
Over two months, bronchoalveolar lavage samples from eleven patients in one hospital grow *Pseudomonas aeruginosa*, compared with one or two a month previously. Most of the patients had no signs of pneumonia, and several had been bronchoscoped for suspected cancer. What could explain this, and how would you investigate?
::: solution
The pattern (a rise in positive cultures in patients who do not appear infected, all linked by a procedure) suggests a **pseudo-outbreak**: contamination of samples or equipment rather than true infection. Possible sources include a contaminated bronchoscope (damaged channels can hold biofilm that survives decontamination), a contaminated automated endoscope washer or its rinse water, contaminated topical solutions, or laboratory contamination.

**Investigation**: confirm the case definition and review each patient's clinical state; list the bronchoscope serial number, washer and date for each sample; **type the isolates** (whole-genome sequencing) to see whether they are identical; culture the bronchoscopes, washer and water; and review decontamination procedures. **Control**: withdraw the implicated scopes or washer, notify the patients' clinicians (some may have received unnecessary antibiotics), and report the incident. Pseudo-outbreaks matter: they lead to unnecessary treatment, and the same equipment fault could transmit real infection.
:::
:::

**Emerging infections and global health security.** The COVID-19 pandemic, Ebola in West Africa (2014–2016), mpox and recurring avian influenza show how quickly a new or re-emerging pathogen can spread. The **International Health Regulations (2005)** require countries to detect, assess and report events that may constitute a **public health emergency of international concern**, which the WHO Director-General can declare. Nationally, doctors in England must notify suspected cases of listed infectious diseases to the health protection team, without waiting for laboratory confirmation, so that public-health action starts early ([[public-health/communicable-disease-control]]).

::: history
In 1854 John Snow mapped cholera deaths around the Broad Street pump in London, showed that they clustered around it, and persuaded the authorities to remove its handle: a founding example of outbreak investigation. In 1907 the investigation of typhoid in New York households led to Mary Mallon, an asymptomatic carrier working as a cook. As penicillin was being developed, Edward Abraham and Ernst Chain described a bacterial enzyme that destroyed it (1940). In his Nobel lecture of 1945, Alexander Fleming warned that under-dosing would allow resistant organisms to emerge. In 1951 Alexander Langmuir founded the Epidemic Intelligence Service at the US Communicable Disease Center, training "disease detectives" in field epidemiology. In 2015 the World Health Assembly adopted the Global Action Plan on Antimicrobial Resistance, and in 2016 the UK review led by Jim O'Neill brought the economic and human cost of resistance to wide attention.
:::

::: quiz
An epidemic curve of a diarrhoeal outbreak in a care home shows a first small peak, then larger peaks roughly every two days for two weeks. Which type of outbreak is most likely?
- [ ] A point-source outbreak from a single meal
- [ ] A continuing common source such as a contaminated water supply
- [x] Person-to-person (propagated) spread, as with norovirus
- [ ] A pseudo-outbreak due to laboratory error
::: solution
Successive peaks separated by roughly one incubation period (one to two days for norovirus) indicate propagated spread from person to person. A single meal would cause one sharp peak; a continuing source would produce a plateau of cases. Control focuses on isolating or cohorting ill residents, excluding ill staff until 48 hours after symptoms stop, hand washing with soap and water, enhanced cleaning, and restricting admissions and transfers.
:::
:::

## Where this leads

The antimicrobial drugs themselves are covered in [[microbiology/antimicrobials]], and infection prevention and control in [[microbiology/infection-control]] and [[infectious-diseases/healthcare-infections]]. Resistance in gonorrhoea is discussed in [[infectious-diseases/sexually-transmitted-infections]], and drug-resistant TB in [[infectious-diseases/tuberculosis]]. The epidemiological study designs used in outbreaks are in [[epidemiology-ebm/observational-studies]], and the national control of communicable disease in [[public-health/communicable-disease-control]].

::: summary
- Resistance arises by mutation and by horizontal gene transfer (especially plasmids), through drug inactivation, target change, reduced entry and efflux. Antibiotic use selects it, and co-selection and compensatory mutations keep it from disappearing.
- PK/PD targets guide dosing: time above MIC for beta-lactams, peak/MIC for aminoglycosides, AUC/MIC for vancomycin and fluoroquinolones.
- Susceptibility testing (MIC and breakpoints) guides targeted therapy, and the antibiogram guides empirical choices.
- Stewardship: local guidelines, review at 48–72 hours (stop, switch, change, continue, OPAT), shorter evidence-based courses, penicillin allergy de-labelling, and the WHO AWaRe classification; the UK aims for 70% Access use by 2029.
- Outbreak investigation: confirm, define cases, find cases, describe by time, place and person, test hypotheses (attack rates and relative risks; odds ratios), control early, and communicate.
- An outbreak grows while $R > 1$; the herd immunity threshold is $1 - 1/R_0$.
:::

## Exercises

::: exercise Herd immunity {level=1 check="1-1/4"}
An infection has $R_0 = 4$. What fraction of the population must be immune to prevent sustained transmission? Give the answer as a decimal.
::: solution
$H = 1 - 1/R_0 = 1 - 1/4 = 0.75$, so 75% of the population must be immune. If a vaccine is less than fully effective, coverage must be higher still: with 90% vaccine effectiveness, coverage of $0.75/0.9 \approx 83\%$ would be needed.
:::
:::

::: exercise A relative risk {level=1 check="8"}
In an outbreak at a school lunch, 24 of 30 pupils who ate the egg sandwiches became ill, compared with 5 of 50 who did not. What is the relative risk of illness associated with the egg sandwiches?
::: solution
Attack rates: $24/30 = 0.8$ and $5/50 = 0.1$. Relative risk $= 0.8/0.1 = 8$.
:::
:::

::: exercise Finding a half-life {level=1 check="2"}
After an intravenous dose, an antibiotic's concentration is 20 mg/L at 1 hour and 5 mg/L at 5 hours. Assuming first-order elimination, what is its half-life in hours?
::: solution
The concentration falls from 20 to 5 mg/L, a factor of 4 or two half-lives, in 4 hours. So $t_{1/2} = 2$ hours. Equivalently, $k = \ln 4/4 = 0.347$ per hour and $t_{1/2} = \ln 2/k = 2$ hours.
:::
:::

::: exercise Time above MIC {level=2 check="1.5*log2(32)"}
A beta-lactam reaches a free peak of 32 mg/L, has a half-life of 1.5 hours, and is given every 8 hours. For how many hours does its concentration exceed an MIC of 1 mg/L? Is this dosing adequate for a target of 50% $fT_{>\text{MIC}}$?
::: solution
$t_{>\text{MIC}} = 1.5 \times \log_2(32/1) = 1.5 \times 5 = 7.5$ hours, which is $7.5/8 = 94\%$ of the interval, comfortably above the 50% target. If the MIC were 8 mg/L, the time would be $1.5 \times \log_2 4 = 3$ hours (37.5%), and more frequent dosing or a prolonged infusion would be needed.
:::
:::

::: exercise A penicillin allergy label {level=2}
A 45-year-old woman with cellulitis has "penicillin allergy" in her records. List the questions you would ask, and explain how the answers change management.
::: solution
Ask: **which drug**, and **what happened** (rash, its appearance and extent; swelling of lips, tongue or throat; breathing difficulty; collapse; blistering or peeling skin; mouth ulcers; organ involvement); **how soon** after the first dose; **how long ago**; whether she needed **treatment** (adrenaline, hospital admission); whether she has taken any penicillin or cephalosporin **since** without problems; and whether the label came from a **family history** or a side-effect such as nausea or diarrhoea.

**Interpretation**: gastrointestinal upset or a family history is **not allergy**, so the label should be removed and a penicillin (such as flucloxacillin) used. A remote, mild, non-urticarial rash is low risk and may be suitable for direct oral challenge or referral for de-labelling under local protocols. Features of an immediate reaction (urticaria, angioedema, bronchospasm, anaphylaxis) mean avoiding penicillins and choosing an alternative, with referral to allergy services. Severe delayed reactions such as Stevens–Johnson syndrome or DRESS mean permanent avoidance of the culprit and related drugs. The result is documented precisely.
:::
:::

::: exercise Choosing from an antibiogram {level=2}
A hospital's antibiogram for *E. coli* from blood cultures shows susceptibility: amoxicillin 42%, co-amoxiclav 68%, trimethoprim 64%, ciprofloxacin 84%, ceftriaxone 88%, piperacillin–tazobactam 91%, gentamicin 93%, meropenem 99.9%, temocillin 96%. The empirical guideline for suspected urinary sepsis is being revised. Which agents are reasonable empirical choices, and which are not? What other information would you want?
::: solution
Agents with susceptibility well below 80–90% (amoxicillin, co-amoxiclav, trimethoprim, and arguably ciprofloxacin) are **not suitable alone** for empirical treatment of a serious infection, because too many patients would receive an ineffective drug. Reasonable options include **gentamicin** (93%, often as a single dose or short course combined with another agent while awaiting cultures), **temocillin** or **piperacillin–tazobactam**, chosen with attention to kidney function and allergy. **Meropenem**, despite near-total susceptibility, is best reserved for patients with known ESBL carriage or severe sepsis with risk factors, to limit carbapenem pressure. Other information: susceptibility of *Klebsiella* and other urinary pathogens; how resistance differs between community and hospital-onset infections; the patient's previous cultures and recent antibiotics; and local rates of *C. difficile* infection, which may argue against broad-spectrum beta-lactams.
:::
:::

::: exercise Norovirus on the ward {level=3}
Over three days, eight patients and four staff on a 28-bed elderly care ward develop sudden vomiting and diarrhoea. Write a case definition and list the control measures, explaining how you would decide when the outbreak is over.
::: hint
Norovirus has an incubation period of 12–48 hours and is shed for some time after symptoms stop.
:::
::: solution
**Case definition** (example): any patient or staff member on Ward X, from [date of first case] onwards, with two or more episodes of vomiting and/or diarrhoea (type 5–7 stool) within 24 hours, not explained by another cause. A **confirmed** case has norovirus detected in stool; a **probable** case meets the clinical definition with an epidemiological link.

**Control measures**: confirm with stool samples from the first cases; **isolate** symptomatic patients in single rooms or **cohort** them in one bay; close affected bays (or the ward) to admissions and transfers, with a risk assessment that balances patient flow; **exclude ill staff** until 48 hours after their symptoms stop; **hand hygiene with soap and water** (alcohol rub is less effective against norovirus); gloves and aprons; enhanced cleaning with chlorine-based agents, especially toilets and frequently touched surfaces; limit visiting and advise visitors; communicate with infection prevention and control, bed managers and the health protection team; and keep a daily line list and epidemic curve.

**Declaring the outbreak over**: according to local policy, typically when **no new cases have occurred and the last case has been free of symptoms for at least 48 hours** (some policies use 72 hours), followed by a **terminal clean** of affected areas before reopening.
:::
:::

::: exercise A case–control study {level=3 check="9"}
Forty people with *Salmonella* infection (cases) and eighty people without it (controls) are asked about eating at a particular restaurant. Thirty cases and twenty controls report eating there. Calculate the odds ratio, explain why a case–control rather than cohort design was used, and interpret the result.
::: solution
The 2×2 table: cases 30 exposed, 10 unexposed; controls 20 exposed, 60 unexposed.

$$
\text{OR} = \frac{30 \times 60}{10 \times 20} = \frac{1800}{200} = 9
$$

**Why case–control**: the people who ate at the restaurant cannot all be identified (it serves the general public), so attack rates cannot be calculated; but cases can be found through laboratory reports and controls recruited from the same population. The **odds ratio** of 9 means the odds of having eaten at the restaurant were nine times higher in cases than controls, strong evidence of an association. It is not proof: chance (calculate a confidence interval), bias (cases may recall exposures differently from controls, and controls must come from the same population as cases) and confounding must be considered. Microbiological evidence, such as whole-genome sequencing linking case isolates to food or kitchen samples, would strengthen the conclusion and justify control measures at the restaurant.
:::
:::
