In 2024 an estimated 4.9 million children died before their fifth birthday, nearly half of them in the first month of life. Most died from causes that are rare among children in the UK: complications of preterm birth, problems during labour, pneumonia, diarrhoea and malaria. In 2023 about 260,000 women died from complications of pregnancy and childbirth, around 70% of them in sub-Saharan Africa. Almost all of these deaths are preventable with knowledge and technologies that have existed for decades. Global health is concerned with why they still happen and what can be done.

**Global health** is the study and practice of improving health and achieving equity in health for all people worldwide, with attention to problems that cross national boundaries and to the global causes of health and disease. It builds on the determinants of health ([[public-health/determinants-inequalities]]) and applies them across countries. This chapter covers how the global burden of disease is measured and how it is changing, maternal and child health, the major infectious diseases and antimicrobial resistance, One Health, the institutions of global health, universal health coverage and the Sustainable Development Goals.

## Measuring the global burden of disease {#burden}

Comparing the burden of different diseases requires a measure that combines death and disability. A death at age 5 and a death at age 85 are both one death, but the first loses far more life; and conditions such as depression, back pain and hearing loss cause little death but much suffering.

::: definition Disability-adjusted life years {#def-daly}
A **disability-adjusted life year** (DALY) is one lost year of healthy life. The DALYs due to a condition are the sum of:

- **years of life lost** (YLL) to premature death: for each death, the remaining life expectancy at the age of death, taken from a standard life table;
- **years lived with disability** (YLD): the number of people with the condition, multiplied by a **disability weight** between 0 (full health) and 1 (equivalent to death) and by the duration.

$$
\text{DALY} = \text{YLL} + \text{YLD}.
$$ {#eq-daly}

DALYs are the main measure of the **Global Burden of Disease** (GBD) study, coordinated by the Institute for Health Metrics and Evaluation, which estimates deaths, illness and risk factors for over 200 countries and territories.
:::

DALYs measure health lost; the **quality-adjusted life year** (QALY) used in economic evaluation, discussed in [[public-health/health-systems-economics]], measures health gained. Both rest on value judgements: disability weights come from surveys of the public, and the use of a single standard life expectancy treats a year of life as equally valuable everywhere. Critics argue that disability weights can seem to devalue the lives of disabled people, and that they ignore the social context of disability.

::: example Calculating DALYs {#ex-daly}
In a country, a disease causes 100 deaths a year, all at about age 40; the standard remaining life expectancy at 40 is 45 years. In the same year, 1,000 people have a non-fatal form of the disease with a disability weight of 0.2, lasting 5 years on average. Calculate the DALYs for the incident cases of that year.
::: solution
YLL $= 100 \times 45 = 4{,}500$.

YLD $= 1{,}000 \times 0.2 \times 5 = 1{,}000$.

DALYs $= 4{,}500 + 1{,}000 = 5{,}500$.

Most of the burden here comes from premature death. For a condition such as migraine or depression, the balance would be reversed: few deaths but many YLD. Earlier versions of the GBD also discounted future years and weighted years of life by age; current versions do neither.
:::
:::

### The epidemiological transition {#transition}

::: theorem The epidemiological transition {#thm-transition}
As countries develop economically and socially, the pattern of disease shifts from a predominance of infectious diseases, maternal and neonatal conditions and undernutrition, which kill mainly children and young adults, towards a predominance of non-communicable diseases and injuries, which kill mainly older adults. Life expectancy rises and the leading causes of death change. The transition accompanies the **demographic transition**, in which falling mortality is followed, after a lag, by falling fertility, so that the population first grows rapidly and then ages.
:::

::: proof
Abdel Omran described the transition in 1971 in three stages: an "age of pestilence and famine", an "age of receding pandemics" and an "age of degenerative and man-made diseases". The mechanisms are well understood. Better nutrition, clean water and sanitation, housing, education (especially of women), vaccination and medical care reduce deaths from infection, mostly among children. More children survive to adulthood and old age, where the risk of cardiovascular disease, cancer and other NCDs is highest. At the same time, urbanisation and economic change alter diet, physical activity, tobacco and alcohol use. Falling child mortality and better education and access to contraception lead families to have fewer children, so the population ages.
:::

The transition is not uniform or inevitable. Many low- and middle-income countries now face a **double burden**: infectious and maternal and child conditions remain common while NCDs rise rapidly, often at younger ages and with less access to treatment than in high-income countries. HIV reversed gains in life expectancy in southern Africa in the 1990s, and COVID-19 reduced life expectancy in many countries in 2020–21. Within any country, poorer groups are at an earlier stage of the transition than richer ones.

::: widget plot
f: 50 + 6*ln(x)
x: 1, 100
y: 40, 90
labels: \text{life expectancy (years, illustrative)}
points: 2, 54.2; 50, 73.5
caption: An illustrative "Preston curve": life expectancy rises steeply with national income at low incomes and flattens at high incomes (here a simple model, 50 + 6 ln x, with x in thousands of dollars per person per year). At low incomes a small increase in resources buys large health gains; at high incomes, how resources are distributed and used matters more than how much there is. Real countries scatter widely around such a curve, and the whole curve has moved upwards over time as knowledge and technologies spread.
:::

## Maternal, newborn and child health {#mch}

::: definition Maternal and child mortality measures {#def-mmr}
- A **maternal death** is the death of a woman while pregnant or within 42 days of the end of pregnancy, from any cause related to or aggravated by the pregnancy or its management, but not from accidental or incidental causes.
- The **maternal mortality ratio** (MMR) is the number of maternal deaths per 100,000 live births in a period.
- The **lifetime risk of maternal death** combines the MMR with fertility: the probability that a 15-year-old woman will eventually die from a maternal cause.
- The **under-5 mortality rate** is the probability of dying before age 5, per 1,000 live births. The **neonatal mortality rate** is the probability of dying in the first 28 days, per 1,000 live births.
:::

According to the WHO, there were about 260,000 maternal deaths in 2023, a global MMR of 197 per 100,000 live births, with around 70% of deaths in sub-Saharan Africa. The main causes are haemorrhage (especially postpartum), hypertensive disorders (pre-eclampsia and eclampsia), sepsis, complications of unsafe abortion and obstructed labour, together with indirect causes such as malaria, HIV and pre-existing heart disease. SDG target 3.1 is a global MMR below 70 per 100,000 by 2030; the WHO notes that this would require an annual rate of reduction of almost 15%, far faster than recent progress.

In 2024, 4.9 million children died before age 5, 2.3 million of them (47%) as newborns. Leading causes include complications of preterm birth, intrapartum complications (birth asphyxia and trauma), pneumonia, diarrhoea and malaria, with undernutrition an underlying factor in a large share of deaths. SDG target 3.2 aims to end preventable deaths of newborns and children under 5, with every country reducing neonatal mortality to 12 or fewer per 1,000 live births and under-5 mortality to 25 or fewer per 1,000 live births by 2030.

Effective interventions are well known and inexpensive:

- **Before and during pregnancy**: family planning, antenatal care, iron and folic acid, tetanus vaccination, prevention of malaria in pregnancy (insecticide-treated nets, intermittent preventive treatment), and prevention of mother-to-child transmission of HIV and syphilis.
- **At birth**: a skilled birth attendant, clean delivery, access to emergency obstetric care (including caesarean section and blood transfusion), active management of the third stage of labour and uterotonic drugs (such as oxytocin) to prevent haemorrhage, and magnesium sulfate for eclampsia.
- **Newborns**: neonatal resuscitation, early and exclusive breastfeeding, thermal care (including "kangaroo" skin-to-skin care for small babies) and treatment of neonatal infection.
- **Children**: vaccination, oral rehydration solution and zinc for diarrhoea, antibiotics for pneumonia, insecticide-treated nets and prompt treatment of malaria, safe water and sanitation, and prevention and treatment of malnutrition.

::: example The three delays {#ex-three-delays}
A 24-year-old woman in a rural district has a postpartum haemorrhage at home after the birth of her third child. Her family waits several hours before deciding to seek help; it takes four hours to reach the district hospital by borrowed motorbike; at the hospital there is no blood available and the only doctor is in theatre. She dies. Analyse her death using the "three delays" model and suggest interventions at each level.
::: solution
The **three delays model** (Thaddeus and Maine, 1994) identifies delays in (1) deciding to seek care, (2) reaching a health facility and (3) receiving adequate care once there.

**Delay 1: deciding to seek care.** Causes include lack of knowledge of danger signs, decisions controlled by others in the household, cost and previous poor experiences of care. Interventions: birth preparedness plans, community education on danger signs, women's groups, removing user fees, and respectful maternity care so that women want to use services. Encouraging birth in a facility with a skilled attendant avoids the situation entirely.

**Delay 2: reaching care.** Causes: distance, roads, lack of transport and money. Interventions: maternity waiting homes near hospitals, community emergency transport schemes, ambulance services, and more facilities able to manage emergencies.

**Delay 3: receiving adequate care.** Causes: lack of staff, blood, drugs (oxytocin, misoprostol), equipment and skills. Interventions: emergency obstetric care at district level, blood transfusion services, essential medicine supply chains, training, and audit of maternal deaths with action on findings.

In addition, prevention at the birth itself (active management of the third stage of labour with a uterotonic) would have greatly reduced her risk of haemorrhage. Her death reflects failures across the system, not one moment.
:::
:::

::: example Lifetime risk {#ex-lifetime-risk}
In a country, the MMR is 200 per 100,000 live births and the average woman has 5 births. In another, the MMR is 10 per 100,000 and women have 1.6 births on average. Estimate the lifetime risk of maternal death in each, ignoring deaths from other causes, and express each as "1 in N".
::: solution
Risk per birth: $0.002$ and $0.0001$.

**First country.** Lifetime risk $\approx 1 - (1 - 0.002)^5 = 0.00996$, or about 1 in 100.

**Second country.** Lifetime risk $\approx 1 - (1 - 0.0001)^{1.6} = 0.00016$, or about 1 in 6,250.

The difference in lifetime risk (about 60-fold) is larger than the difference in MMR (20-fold), because women in the first country face the risk more times. Family planning therefore reduces maternal mortality both by reducing the number of pregnancies and by avoiding high-risk and unwanted pregnancies.
:::
:::

## Infectious diseases and antimicrobial resistance {#infections}

HIV, tuberculosis and malaria remain major global causes of death, concentrated in sub-Saharan Africa and South Asia. Large global programmes since the early 2000s, including the Global Fund to Fight AIDS, Tuberculosis and Malaria (2002) and the US President's Emergency Plan for AIDS Relief (PEPFAR, 2003), expanded antiretroviral treatment, insecticide-treated nets and TB treatment, with large reductions in deaths. Tuberculosis has again become the leading single infectious cause of death worldwide since the COVID-19 pandemic receded. Progress is fragile: reductions in international funding in 2025, including the dismantling of USAID, disrupted HIV, TB, malaria and nutrition programmes in many countries.

**Neglected tropical diseases** (such as schistosomiasis, soil-transmitted helminths, lymphatic filariasis, onchocerciasis, trachoma, leishmaniasis and snakebite envenoming) affect over a billion of the world's poorest people. Many are controlled by mass drug administration and improved water and sanitation, and several countries have eliminated one or more of them as public health problems.

**Eradication.** Smallpox was eradicated in 1980. Wild poliovirus cases have fallen by over 99% since the Global Polio Eradication Initiative began in 1988, and wild poliovirus remains endemic only in Afghanistan and Pakistan, though outbreaks of circulating vaccine-derived poliovirus occur elsewhere. Dracunculiasis (Guinea worm disease) is close to eradication without any vaccine or drug, through safe water and behaviour change. The principles are in [[public-health/vaccination-programmes]].

### Antimicrobial resistance {#amr}

Antimicrobial resistance (AMR) arises wherever antimicrobials are used: in human medicine, in animals (for treatment and, in some countries, growth promotion) and in agriculture. Resistant organisms and resistance genes spread between people, animals and the environment and across borders through travel, trade and food. A systematic analysis for 2019 (the GRAM study, published in *The Lancet* in 2022) estimated that bacterial AMR directly caused about 1.27 million deaths and was associated with about 4.95 million, with the highest rates in sub-Saharan Africa and South Asia. In poorer countries the problem is often too little access to effective antibiotics as well as too much inappropriate use.

The response requires surveillance, infection prevention (including water, sanitation and vaccination, which reduce the need for antibiotics), stewardship in human and animal health, regulation of sales without prescription, and new antimicrobials, which need new economic models because new antibiotics should be used sparingly. The UK pays for some new antibiotics through a subscription model that is not linked to volume sold.

::: definition One Health {#def-one-health}
**One Health** is an integrated approach that recognises that the health of people, domestic and wild animals, plants and the wider environment are closely linked and interdependent, and that aims to balance and optimise the health of all of them together. It is promoted by the **Quadripartite** organisations: the Food and Agriculture Organization (FAO), the UN Environment Programme (UNEP), the WHO and the World Organisation for Animal Health (WOAH).
:::

About three-quarters of emerging infectious diseases in humans are zoonoses, including HIV, Ebola, avian influenza, SARS, MERS and probably SARS-CoV-2. Their emergence is driven by deforestation, land-use change, intensive farming, wildlife trade and climate change. One Health approaches include joint surveillance of animal and human disease, coordinated control of zoonoses such as rabies and brucellosis, reducing antimicrobial use in livestock, and environmental protection.

## The institutions of global health {#institutions}

- **The World Health Organization** (founded 1948) is the UN agency for health. Its governing body, the World Health Assembly, meets every May; its functions include setting norms and standards (such as the Essential Medicines List and treatment guidelines), coordinating responses to health emergencies under the International Health Regulations, prequalifying medicines and vaccines, and supporting countries. Most of its budget comes from voluntary contributions earmarked by donors for specific purposes, which limits its independence. The United States, historically the largest funder, withdrew from the WHO with effect from January 2026.
- **Other UN agencies**: UNICEF (child health, vaccine procurement), UNAIDS, UNFPA (reproductive health), and the World Bank (financing and health system loans).
- **Global health initiatives** focused on particular problems: **Gavi**, the Vaccine Alliance (2000), which finances vaccines for low-income countries, and the **Global Fund** (2002).
- **Bilateral donors**, such as the UK's Foreign, Commonwealth and Development Office; the UK government announced in 2025 that official development assistance would fall from 0.5% to 0.3% of gross national income by 2027.
- **Philanthropic foundations**, notably the Gates Foundation and the Wellcome Trust, which shape research and policy priorities.
- **Non-governmental organisations**, academic institutions, and the governments and health systems of low- and middle-income countries themselves, which provide most health spending in most countries.

The architecture has been criticised for fragmentation (many initiatives, each with its own reporting), for donor-driven priorities that favour single diseases over health systems, and for power imbalances in which decisions affecting low- and middle-income countries are made in high-income ones. Calls to "decolonise" global health ask for leadership, funding decisions, research authorship and agenda-setting to be shifted to the countries and communities most affected.

Health security is governed by the **International Health Regulations (2005)**, amended in 2024 with effect from September 2025, and the **WHO Pandemic Agreement**, adopted in May 2025; both are described in [[public-health/communicable-disease-control]].

## Universal health coverage and the Sustainable Development Goals {#uhc}

::: definition Universal health coverage {#def-uhc}
**Universal health coverage** (UHC) means that all people have access to the full range of quality health services they need, when and where they need them, without financial hardship. It has three dimensions, often drawn as a cube: **who** is covered (the share of the population), **which services** are covered, and **what proportion of the costs** is covered.

**Catastrophic health expenditure** is commonly defined as household out-of-pocket health spending exceeding 10% (or, in a stricter definition, 25%) of total household consumption or income. **Impoverishing** health expenditure pushes a household below the poverty line.
:::

The **Declaration of Alma-Ata** (1978) called for "health for all" through **primary health care**, and the Astana Declaration (2018) renewed the commitment. UHC is target 3.8 of the **Sustainable Development Goals**, adopted by UN member states in September 2015 with a deadline of 2030. SDG 3 ("ensure healthy lives and promote well-being for all at all ages") includes targets on maternal, newborn and child mortality (3.1, 3.2), epidemics of AIDS, TB, malaria and neglected tropical diseases (3.3), NCDs and mental health (3.4), substance use (3.5), road traffic injuries (3.6), sexual and reproductive health (3.7), UHC (3.8), and pollution (3.9). Many other goals, on poverty, hunger, education, gender equality, water and sanitation, and climate, are determinants of health.

Paying for care out of pocket at the time of use deters people from seeking care and pushes millions of households into poverty every year. Countries that have made progress towards UHC have generally increased public financing (from taxes or compulsory insurance), pooled risks across the population, and removed or reduced user fees, especially for poor people and for priority services such as maternal and child health. Financing models are compared in [[public-health/health-systems-economics]].

::: example Catastrophic health expenditure {#ex-catastrophic}
A household's monthly consumption is 200 dollars. A child is admitted to hospital with pneumonia and the family pays 30 dollars that month for fees, medicines and transport. Is this catastrophic at the 10% threshold? At the 25% threshold? What could the household have to give up?
::: solution
Share of consumption $= 30/200 = 15\%$. This exceeds the 10% threshold but not the 25% threshold.

A household spending most of its income on food and housing may cover such costs by selling assets (livestock, tools), borrowing at high interest, taking children out of school or cutting food intake, each of which harms health and future income. Measures based on spending also miss households that could not pay and so went without care. This is why UHC monitoring uses both service coverage and financial protection indicators.
:::
:::

::: warning Averages hide the people left behind
National progress towards global targets can conceal large gaps. A country can reach a national average under-5 mortality below 25 per 1,000 while rural, poorer and minority populations remain far above it; vaccination coverage can be high nationally with "zero-dose" children concentrated in urban slums, remote areas and conflict zones. The SDGs' principle of "leave no one behind" requires data broken down by income, sex, age, location, ethnicity, disability and migratory status. The same caution applies in the UK, as earlier chapters show.
:::

## Migration, conflict and humanitarian crises {#humanitarian}

Over 100 million people are forcibly displaced worldwide by conflict, persecution and disaster. Conflict destroys health facilities, kills health workers and causes outbreaks of measles and cholera, malnutrition and untreated chronic disease. Humanitarian health priorities, set out in the Sphere standards, include water, sanitation and hygiene, food and nutrition, shelter, vaccination (especially measles), communicable disease control, sexual and reproductive health, mental health and psychosocial support, and continuity of care for chronic conditions. Attacks on health care violate international humanitarian law.

Migrants arriving in high-income countries such as the UK generally have health needs similar to those of the host population, with some specific needs: incomplete vaccination, infections common in their country of origin (such as tuberculosis, hepatitis B and C, HIV), and, for refugees and asylum seekers, the effects of trauma. Barriers to care include language, cost (charging for some NHS services for overseas visitors), fear of immigration enforcement and unfamiliarity with the system. Every person, regardless of immigration status, can register with a GP in England.

::: quiz
Which statement about the global burden of disease is correct?
- [ ] Non-communicable diseases are mainly a problem of high-income countries.
- [ ] DALYs measure only deaths.
- [x] Most premature deaths from non-communicable diseases occur in low- and middle-income countries.
- [ ] The epidemiological transition happens at the same pace in every country.
::: solution
The WHO estimates that 82% of premature NCD deaths (before age 70) occur in low- and middle-income countries, where people often develop NCDs at younger ages and have less access to treatment. DALYs combine years of life lost to death with years lived with disability. The transition varies widely between and within countries, and many face a double burden of infectious and non-communicable disease.
:::
:::

::: history
The International Sanitary Conferences, beginning in Paris in 1851, tried to agree on quarantine rules against cholera, plague and yellow fever, and led to the first international health bodies. The World Health Organization was founded on 7 April 1948, now celebrated as World Health Day. The WHO's smallpox eradication programme, intensified in 1967, ended with the last natural case in Somalia in 1977 and the declaration of eradication in 1980. The Declaration of Alma-Ata (1978) made primary health care the route to "health for all by the year 2000". Oral rehydration therapy, described by *The Lancet* in 1978 as potentially the most important medical advance of the century, and UNICEF's "child survival revolution" of the 1980s cut child deaths from diarrhoea. The Millennium Development Goals (2000–2015) set targets for child and maternal mortality and for HIV, TB and malaria, and the first Global Burden of Disease study was published in the 1990s. The Sustainable Development Goals replaced them in 2015, with universal health coverage at their centre.
:::

## Where this leads

The social determinants behind global inequalities are discussed in [[public-health/determinants-inequalities]], NCDs in [[public-health/non-communicable-disease]], environmental and climate threats in [[public-health/environmental-occupational]], and health security and the International Health Regulations in [[public-health/communicable-disease-control]]. How health systems are financed and organised, and how priorities are set, is the subject of [[public-health/health-systems-economics]]. Tropical infections are covered clinically in [[infectious-diseases/tropical-infections]].

::: summary
- The **DALY** combines years of life lost and years lived with disability; the Global Burden of Disease study uses it to compare conditions and risk factors across countries.
- The **epidemiological transition** shifts the burden from infection, maternal and child conditions and undernutrition to NCDs; many countries face a **double burden**.
- In 2023 about 260,000 women died from maternal causes (MMR 197 per 100,000 live births, about 70% in sub-Saharan Africa); in 2024, 4.9 million children died before age 5, 47% as newborns. SDG targets are an MMR below 70, neonatal mortality of 12 or fewer and under-5 mortality of 25 or fewer per 1,000 by 2030.
- The **three delays** (deciding, reaching, receiving care) explain maternal deaths; effective, cheap interventions exist across pregnancy, birth and childhood.
- Wild polio is endemic only in Afghanistan and Pakistan. **AMR** directly caused about 1.27 million deaths in 2019. **One Health** links human, animal and environmental health.
- Global health institutions include the WHO, UNICEF, the World Bank, Gavi and the Global Fund; their funding and power are contested and in flux.
- **Universal health coverage** (SDG 3.8): everyone gets the services they need without financial hardship; out-of-pocket payments cause catastrophic and impoverishing expenditure.
:::

## Exercises

::: exercise Maternal mortality ratio {level=1 check="200"}
A country records 500 maternal deaths and 250,000 live births in a year. Calculate the maternal mortality ratio per 100,000 live births.
::: solution
$500/250{,}000 \times 100{,}000 = 200$ per 100,000 live births.
:::
:::

::: exercise Years of life lost {level=1 check="3000"}
A disease causes 60 deaths in children, each at an age where the standard remaining life expectancy is 50 years. Calculate the years of life lost.
::: solution
YLL $= 60 \times 50 = 3{,}000$ years.
:::
:::

::: exercise Years lived with disability {level=1 check="1200"}
Four thousand people have a condition with a disability weight of 0.1 that lasts on average 3 years. Calculate the YLD.
::: solution
YLD $= 4{,}000 \times 0.1 \times 3 = 1{,}200$.
:::
:::

::: exercise Share of neonatal deaths {level=2 check="round(1000*2.3/4.9)/10"}
In 2024, 4.9 million children died before age 5, of whom 2.3 million died in the first 28 days. What percentage of under-5 deaths were neonatal? Give your answer to 1 decimal place.
::: solution
$2.3/4.9 = 0.469$, or 46.9% (the WHO reports 47%). As child mortality falls, the share of deaths in the neonatal period rises, because interventions against pneumonia, diarrhoea and malaria in older children have been more successful than those for newborns, which depend on quality care at birth.
:::
:::

::: exercise Catastrophic expenditure {level=2 check="25"}
A household with monthly consumption of 160 dollars spends 40 dollars on medicines for a family member with diabetes. What percentage of consumption is this? Is it catastrophic at the 25% threshold?
::: solution
$40/160 = 25\%$. It is at the 25% threshold (and well above the 10% threshold). Chronic conditions requiring lifelong medicines cause repeated expenditure, which is especially damaging to household finances.
:::
:::

::: exercise Lifetime risk {level=2 check="round(1/(1-(1-0.004)^6))"}
In a country the MMR is 400 per 100,000 live births and the average woman has 6 births. Estimate the lifetime risk of maternal death as "1 in N", giving N as a whole number.
::: solution
Risk per birth $= 0.004$. Lifetime risk $= 1 - (1 - 0.004)^6 = 0.0238$. $N = 1/0.0238 = 42$. About 1 in 42 women would die from a maternal cause.
:::
:::

::: exercise One Health in practice {level=3}
An increase in human cases of a zoonotic disease, such as brucellosis or avian influenza, is reported in a rural region where livestock farming is expanding. Describe a One Health response.
::: solution
**Joint surveillance.** Share data between human and animal health services and laboratories; test livestock and, where relevant, wildlife; use genomic data to link human and animal isolates.

**Control at the animal source.** Vaccination of livestock (brucellosis), culling and movement controls where appropriate (avian influenza), biosecurity on farms, and compensation schemes so that farmers report disease rather than hide it.

**Interrupt transmission to people.** Pasteurisation of milk and safe food handling (brucellosis), protective equipment for farm and abattoir workers, and public information.

**Human health.** Diagnosis and treatment, contact follow-up, antivirals and seasonal influenza vaccination for exposed workers where recommended, and notification under the International Health Regulations if there is a risk of international spread.

**Environment and drivers.** Address land-use change, farm intensification and wildlife contact; reduce antimicrobial use in livestock.

**Governance.** A coordinating mechanism between ministries of health, agriculture and environment, with shared plans and budgets.
:::
:::

::: exercise Priorities for a district {level=3}
A rural district with an under-5 mortality rate of 60 per 1,000 live births and an MMR of 350 per 100,000 has a small additional budget. Propose and justify three priorities.
::: solution
Many answers are reasonable if they rest on evidence of effectiveness, cost and equity. For example:

1. **Skilled care at birth and emergency obstetric and newborn care.** A large share of both maternal and neonatal deaths occur around birth. Strengthening the district hospital's capacity (staff, blood, uterotonics, magnesium sulfate, caesarean section, neonatal resuscitation, kangaroo care) and making transport and maternity waiting homes available tackle the second and third delays, and benefit mothers and babies together.

2. **Community case management of childhood illness.** Trained and supplied community health workers who can treat pneumonia (antibiotics), diarrhoea (ORS and zinc) and malaria (rapid diagnostic tests and artemisinin-based combinations) close to home, addressing the leading post-neonatal causes of death in places far from facilities.

3. **Vaccination and prevention.** Reaching "zero-dose" children with routine vaccines, distributing insecticide-treated nets, and supporting breastfeeding, nutrition and family planning.

Removing user fees for maternal and child services would support all three. Progress should be monitored with data disaggregated by area and wealth, and maternal and perinatal deaths audited to guide improvement.
:::
:::
