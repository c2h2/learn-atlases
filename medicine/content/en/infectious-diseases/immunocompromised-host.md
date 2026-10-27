More people than ever live with weakened immunity. Chemotherapy, organ and stem cell transplantation, long-term corticosteroids and a growing range of biological drugs for rheumatoid arthritis, inflammatory bowel disease, multiple sclerosis and cancer all save lives, and all impair some part of the immune system. In these people, infections are more frequent, present atypically, progress quickly, and are caused by organisms that rarely trouble healthy people.

The key to reasoning about them is to ask **which part of the immune system is missing**. Neutrophils, T cells, antibodies, complement and the spleen each defend against characteristic groups of organisms, so knowing the defect predicts the likely infections, guides empirical treatment and tells us which prophylaxis and vaccines prevent them. The second question is **what the person has been exposed to**, now and in the past: an organism acquired years ago, such as tuberculosis or *Strongyloides*, can reactivate when immunity falls.

This chapter covers the defects and their organisms, neutropenia and neutropenic sepsis, infections after transplantation, and the infections linked to steroids, biological drugs and loss of the spleen. HIV, the commonest acquired immunodeficiency worldwide, has its own chapter ([[infectious-diseases/hiv]]). UK practice follows NICE and specialist society guidance; treatments are described as principles.

## Matching the defect to the organism

::: definition Immune defects and their infections {#def-defects}
An **immunocompromised host** is a person whose defences against infection are reduced by disease or treatment. The main defects and the organisms they expose the person to:

| Defect | Common causes | Typical organisms |
|---|---|---|
| **Neutropenia** or neutrophil dysfunction | Chemotherapy, leukaemia, aplastic anaemia, some drugs | Gram-negative bacilli (including *Pseudomonas*), *Staphylococcus aureus*, streptococci; *Candida* and *Aspergillus* with prolonged neutropenia |
| **Cell-mediated (T-cell) immunity** | HIV, transplant immunosuppressants, high-dose corticosteroids, lymphoma, some chemotherapy and biologics | Herpesviruses (HSV, VZV, CMV, EBV), *Pneumocystis*, *Cryptococcus*, mycobacteria, *Listeria*, *Nocardia*, *Toxoplasma*, *Strongyloides* |
| **Antibody (humoral) deficiency** | Common variable immunodeficiency, myeloma, chronic lymphocytic leukaemia, rituximab | Encapsulated bacteria (*Streptococcus pneumoniae*, *Haemophilus influenzae*), enteroviruses, *Giardia* |
| **Complement deficiency** | Inherited deficiencies; complement inhibitors such as eculizumab | *Neisseria meningitidis* and other neisseriae (terminal pathway); encapsulated bacteria |
| **Asplenia or hyposplenism** | Splenectomy, sickle cell disease, coeliac disease | Encapsulated bacteria, *Capnocytophaga* (dog bites); severe malaria and babesiosis |
| **Barrier breaches** | Mucositis, central lines, surgery, burns | Skin and gut flora: staphylococci, streptococci, Gram-negatives, *Candida* |

Many patients have several defects at once: a person after stem cell transplantation may have neutropenia, mucositis, a central line, T-cell suppression and antibody deficiency over the course of a few months.
:::

::: theorem The net state of immunosuppression {#thm-net-state}
The risk of infection in an immunocompromised person is determined by the interaction of two factors:

1. **Epidemiological exposure**: organisms in the community, in hospital, in the donated organ and those carried latently from the past (herpesviruses, tuberculosis, hepatitis B, *Strongyloides*, *Toxoplasma*).
2. **The net state of immunosuppression**: the type, dose, duration and combination of immunosuppressive drugs; neutropenia; breaches of skin and mucosa; metabolic factors such as diabetes, uraemia and malnutrition; and infection with immunomodulating viruses such as CMV.

A small exposure can cause disease when immunosuppression is intense, and a heavy exposure can cause disease when immunosuppression is mild. Prevention acts on both: reducing exposure (screening, prophylaxis, food and water advice, vaccination of contacts) and reducing immunosuppression to the minimum effective level.
:::

::: warning
**Infection in the immunocompromised looks different: don't wait for the usual signs.** Without neutrophils there is no pus: pneumonia may show little on a chest radiograph, a urinary infection may have no white cells in the urine, and cellulitis may be a faint pink patch. Corticosteroids suppress fever and abdominal signs, so a perforated bowel can be painless. Fever may be the only sign, and it may be absent. Treat on suspicion, investigate widely (blood cultures, imaging such as CT, and samples from any possible site), and involve infection specialists early.
:::

## Neutropenia and neutropenic sepsis

The **absolute neutrophil count (ANC)** is the white cell count multiplied by the proportion of neutrophils (including band forms). The risk of infection rises as the ANC falls below $1.0 \times 10^9$/L, is high below $0.5 \times 10^9$/L, and is highest below $0.1 \times 10^9$/L; it rises further with the **duration** of neutropenia. After most cytotoxic chemotherapy, the neutrophil count falls to its lowest point (the **nadir**) about 7–14 days after treatment and then recovers.

::: definition Neutropenic sepsis {#def-neutropenic}
**Neutropenic sepsis**, in NICE guidance, is a neutrophil count of $0.5 \times 10^9$/L or lower in a person receiving anticancer treatment, together with a temperature above 38 °C or other signs or symptoms consistent with clinically significant sepsis. It is a **medical emergency**: infection can progress to septic shock within hours.

**Management principles** (NICE CG151 and UK acute oncology practice):
- **Empirical antibiotics immediately**, usually within one hour of arrival, without waiting for the neutrophil count if the patient has had recent chemotherapy and is unwell.
- **Piperacillin–tazobactam monotherapy** is the usual initial choice in NICE guidance; aminoglycosides are not added routinely, and glycopeptides are not added just because a central line is present, unless there are patient-specific or local reasons.
- **Cultures** before antibiotics: blood cultures from each lumen of any central line and peripherally, and samples from any suspected site.
- **Risk stratification**, for example with the MASCC score, identifies low-risk patients who may switch early to oral antibiotics or outpatient care.
- **Persistent fever** after several days of antibiotics prompts a search for fungal infection (CT chest, serum galactomannan) and consideration of empirical or pre-emptive antifungal treatment.
:::

Prevention includes growth factors (G-CSF) for some regimens, antibacterial prophylaxis with a fluoroquinolone for some adults expected to have profound neutropenia, antifungal prophylaxis for people at high risk of mould infection (such as those receiving induction chemotherapy for acute myeloid leukaemia), and patient education: people receiving chemotherapy carry instructions to seek help immediately if they develop a fever.

::: widget plot
f: 5 - 4.9*exp(-((x - 12)/w)^2)
x: 0, 28
y: 0, 6
sliders: w=4:2:8:0.5
hlines: 0.5; 1
labels: \text{neutrophil count (}\times 10^9\text{/L)}
caption: A simplified picture of the neutrophil count after a cycle of chemotherapy given on day 0, with the nadir around day 12. The lines mark $1.0 \times 10^9$/L and $0.5 \times 10^9$/L. Widen the curve with the slider (more myelotoxic regimens, marrow infiltration, older age) and see how the number of days spent below $0.5 \times 10^9$/L grows: the risk of serious bacterial and fungal infection depends on both the depth and the duration of neutropenia. Illustrative only.
:::

::: example Fever on day nine {#ex-febrile-neut}
A 54-year-old woman is receiving adjuvant chemotherapy for breast cancer; her last cycle was nine days ago. She telephones the oncology helpline with shivering and a temperature of 38.6 °C and is told to attend immediately. On arrival: pulse 112 per minute, blood pressure 108/64 mmHg, respiratory rate 20 per minute, SpO₂ 97% on air. She has a tunnelled central line. White cell count $0.9 \times 10^9$/L with 22% neutrophils.
::: solution
**ANC**: $0.9 \times 0.22 = 0.198 \approx 0.2 \times 10^9$/L, well below 0.5: this is **neutropenic sepsis**.

**Immediate actions**:
1. Assess with ABCDE and NEWS2; she is tachycardic but not hypotensive.
2. Take blood cultures from the central line and peripherally, plus urine and any other relevant samples, without delaying antibiotics.
3. Give **intravenous piperacillin–tazobactam** within the hour (or the local alternative if she is allergic to penicillin).
4. Fluids, observation, and escalation if she deteriorates.

**Then**: examine for a source, including the line exit site and tunnel, the mouth (mucositis), perianal area, skin and chest; chest radiograph. Calculate a risk score: if she remains stable with no complicating features, she may be suitable for an early switch to oral antibiotics and discharge with close follow-up. If cultures show a line-related infection, the line may need removal. If fever persists beyond four to seven days with no cause, investigate for fungal infection. G-CSF may be considered for future cycles.
:::
:::

## Infection after transplantation

::: definition The transplant infection timeline {#def-transplant}
After **solid organ transplantation**, infections follow a predictable timeline, determined by surgery, the level of immunosuppression and the prophylaxis given:

- **First month**: infections related to **surgery and hospital care** (wound, anastomotic leak, pneumonia, line and urinary infections, *C. difficile*) and **donor-derived** infections transmitted with the organ. Opportunistic infections are uncommon because immunosuppression has not yet accumulated.
- **One to six months**: the period of greatest immunosuppression. Without prophylaxis, **cytomegalovirus (CMV)**, *Pneumocystis*, *Listeria*, *Nocardia*, *Toxoplasma*, reactivation of hepatitis B and C, **BK polyomavirus** (kidney transplant nephropathy) and fungi appear. With modern prophylaxis, many of these are delayed rather than abolished.
- **After six months**: most patients, on stable lower immunosuppression, have **community-acquired infections**, often more severe than usual; some have late CMV, VZV reactivation, **post-transplant lymphoproliferative disorder (PTLD)** or infections after extra immunosuppression for rejection.

**Haematopoietic stem cell transplantation (HSCT)** has a different pattern: a **pre-engraftment** phase of profound neutropenia and mucositis (bacteria, *Candida*, *Aspergillus*, HSV), a **post-engraftment** phase dominated by T-cell deficiency and graft-versus-host disease and its treatment (CMV, adenovirus, *Pneumocystis*, moulds), and a **late** phase with deficient antibody responses and functional hyposplenism (encapsulated bacteria, VZV), which is why recipients are revaccinated.

**Prevention** includes co-trimoxazole against *Pneumocystis* (and *Toxoplasma* and *Nocardia*); CMV prevention by **prophylaxis** (for example valganciclovir for CMV-seronegative recipients of organs from seropositive donors, D+/R−, or letermovir in seropositive HSCT recipients) or by **pre-emptive monitoring** of CMV DNA in blood with treatment when it rises; antifungal prophylaxis in high-risk groups; and vaccination of the patient before transplantation and of household contacts.
:::

::: example Fever after prophylaxis ends {#ex-cmv}
A 46-year-old man received a kidney transplant six months ago from a CMV-seropositive donor; he was CMV-seronegative (D+/R−). He took valganciclovir prophylaxis for the first 200 days, which ended three weeks ago. He now has fever, fatigue, diarrhoea and a creatinine that has risen from 120 to 165 µmol/L. White cell count $2.6 \times 10^9$/L, platelets $95 \times 10^9$/L, ALT 110 U/L. His immunosuppression is tacrolimus, mycophenolate and prednisolone.
::: solution
**Likely diagnosis**: **CMV disease**. The D+/R− combination carries the highest risk, because the recipient has no immunity to the virus carried latently in the donor organ, and disease commonly appears soon after prophylaxis stops. CMV causes fever, leucopenia, thrombocytopenia, hepatitis, colitis and, in kidney recipients, graft dysfunction. It also increases the risk of rejection and of other opportunistic infections.

**Investigations**: quantitative **CMV PCR** in blood; colonoscopy with biopsy if colitis is suspected (blood PCR can underestimate gut disease); tacrolimus level; graft assessment, including biopsy if needed to distinguish rejection from CMV or BK virus nephropathy; blood cultures and *C. difficile* testing.

**Treatment**: intravenous **ganciclovir** (or oral valganciclovir in milder disease), with doses adjusted for kidney function, continued until the viral load is undetectable and symptoms resolve; **reduction of immunosuppression** (often mycophenolate) where safe, in discussion with the transplant team; monitoring of blood counts, as ganciclovir is myelosuppressive. If the viral load fails to fall, testing for resistance mutations follows. Afterwards, CMV DNA is monitored to detect relapse.
:::
:::

::: example Swollen nodes a year later {#ex-ptld}
A 22-year-old woman had a liver transplant 14 months ago. She was EBV-seronegative before transplantation; her donor was seropositive. She now has fevers, night sweats and enlarged cervical lymph nodes. Her blood EBV DNA load is high, and CT shows multiple enlarged lymph nodes and a mass in the small bowel.
::: solution
**Likely diagnosis**: **post-transplant lymphoproliferative disorder (PTLD)**. In a person with suppressed T-cell immunity, EBV-infected B cells, which are normally controlled by cytotoxic T cells, proliferate unchecked. The spectrum runs from polyclonal proliferation to aggressive monoclonal lymphoma. The greatest risk is in **EBV-seronegative recipients of seropositive organs**, children, the first year after transplantation and intense immunosuppression (especially T-cell-depleting antibodies).

**Diagnosis** requires **biopsy** of an affected node or mass, for histology, clonality and EBV staining, followed by staging.

**Treatment** begins with **reduction of immunosuppression**, which allows recovering T cells to control the EBV-driven proliferation, balanced against the risk of rejection. **Rituximab** (anti-CD20) is added for CD20-positive disease, with chemotherapy if the response is inadequate. Monitoring of EBV DNA in high-risk recipients allows earlier detection.
:::
:::

## Steroids, biological drugs and the spleen

::: definition Iatrogenic immunosuppression {#def-iatrogenic}
Many drugs increase the risk of particular infections, and most of that risk can be anticipated by **screening before treatment**, **vaccination** and **prophylaxis**:

| Treatment | Main infection risks | Prevention |
|---|---|---|
| **Corticosteroids** (risk rises with dose and duration; prednisolone of about 20 mg/day or more for four weeks or longer is commonly used as a threshold) | Bacterial infections, *Pneumocystis*, VZV, TB reactivation, *Strongyloides* hyperinfection, fungal infection | PJP prophylaxis in combination with other immunosuppressants or high-risk conditions; *Strongyloides* screening or empirical ivermectin in people from endemic areas |
| **TNF inhibitors** (infliximab, adalimumab and others) | **TB reactivation**, often extrapulmonary or disseminated; also *Listeria*, endemic fungi, hepatitis B reactivation | **IGRA and chest radiograph before treatment**, and treatment of TB infection; hepatitis B, hepatitis C and HIV testing |
| **Anti-CD20 antibodies** (rituximab) | **Hepatitis B reactivation**, including in people with resolved infection (anti-HBc positive); hypogammaglobulinaemia; poor vaccine responses; progressive multifocal leukoencephalopathy (PML) | Hepatitis B serology before treatment; antiviral prophylaxis for those with past or current infection; vaccinate before treatment |
| **Complement inhibitors** (eculizumab, ravulizumab) | **Meningococcal disease**, which can be fulminant | Meningococcal ACWY and B vaccination at least two weeks before starting (or antibiotic cover until then), plus antibiotic prophylaxis according to guidance; patient alert card |
| **JAK inhibitors** | Herpes zoster | Recombinant (non-live) zoster vaccine |
| **Natalizumab** | **PML** caused by JC polyomavirus | JC virus antibody testing to stratify risk; MRI monitoring |

Live vaccines are generally avoided during significant immunosuppression, so vaccination is best completed **before** treatment starts.

**Asplenia and hyposplenism** remove the main filter for blood-borne encapsulated bacteria, opsonised bacteria and infected red cells. The danger is **overwhelming post-splenectomy infection (OPSI)**: fulminant sepsis, most often pneumococcal, with a high mortality. Prevention combines **vaccination** (pneumococcal, *Haemophilus influenzae* type b, meningococcal ACWY and B, and annual influenza), **antibiotic prophylaxis** (often long-term penicillin or an alternative, especially in the first years and for higher-risk people), an **emergency supply** of antibiotics to start if fever develops, an **alert card**, advice after dog bites, and strict malaria prevention when travelling.
:::

::: example A fever that became purpura {#ex-opsi}
A 35-year-old man had his spleen removed after a road traffic collision ten years ago. He did not receive the recommended vaccines and stopped taking penicillin after a year. He develops sudden fever and rigors at 6 pm; by midnight he is confused, with blood pressure 78/40 mmHg and a spreading purpuric rash. Blood film shows Gram-positive diplococci in neutrophils.
::: solution
**Diagnosis**: **overwhelming post-splenectomy infection**, almost certainly with *Streptococcus pneumoniae* (Gram-positive diplococci), complicated by septic shock and disseminated intravascular coagulation (purpura fulminans). Bacteria visible on a peripheral blood film indicate an enormous bacterial load, which the absent spleen could not clear.

**Management**: immediate high-dose intravenous antibiotics according to local sepsis guidance (for example a third-generation cephalosporin, with additional cover if penicillin-resistant pneumococci are prevalent); resuscitation and vasopressors; intensive care; management of DIC. Mortality is high even with optimal treatment, and survivors may lose digits or limbs.

**Prevention was possible**: vaccination (ideally at least two weeks before an elective splenectomy, or two weeks after an emergency one), antibiotic prophylaxis, a standby supply of antibiotics to take at the first sign of fever, and an alert card. Everyone without a functioning spleen should be on a register and recalled for vaccination.
:::
:::

::: history
In 1952 Harold King and Harris Shumacker described overwhelming sepsis in infants after splenectomy, first drawing attention to the spleen's role in defence against bacteria. In 1954 Joseph Murray's team in Boston performed the first successful kidney transplant, between identical twins; transplantation between non-identical people became possible only with immunosuppressive drugs, first azathioprine and corticosteroids, and from the early 1980s ciclosporin, introduced into clinical transplantation by Roy Calne. E. Donnall Thomas developed bone marrow transplantation for leukaemia; he and Murray shared the Nobel Prize in 1990. In 1966 Gerald Bodey and colleagues showed how the risk of infection in acute leukaemia rose as the neutrophil count fell and the longer it stayed low, the basis of modern neutropenic sepsis care. In the 1970s and 1980s, studies by Philip Pizzo and others established immediate empirical broad-spectrum antibiotics for febrile neutropenia, and later empirical antifungal therapy for persistent fever.
:::

::: quiz
A 30-year-old woman receiving eculizumab for paroxysmal nocturnal haemoglobinuria develops fever and headache. Which organism is the most important to consider and treat immediately?
- [ ] *Pneumocystis jirovecii*
- [ ] Cytomegalovirus
- [x] *Neisseria meningitidis*
- [ ] *Aspergillus fumigatus*
::: solution
Eculizumab blocks cleavage of complement C5 and so prevents formation of the membrane attack complex (C5b–9), which is essential for killing neisseriae. People receiving it have a greatly increased risk of meningococcal disease, even after vaccination. Fever in such a patient is treated as possible meningococcal infection, with immediate antibiotics.
:::
:::

## Where this leads

The immune mechanisms behind these defects are in [[immunology/immunodeficiency]] and [[immunology/transplant-tumour-immunology]]. Leukaemia and its treatment are in [[blood/leukaemia]]. HIV, the commonest cause of acquired T-cell deficiency, is in [[infectious-diseases/hiv]], and tuberculosis, a key reactivation risk, in [[infectious-diseases/tuberculosis]]. *Strongyloides* and other infections from past travel are covered in [[infectious-diseases/tropical-infections]], and vaccination programmes in [[public-health/vaccination-programmes]].

::: summary
- Identify the immune defect first: neutropenia (bacteria, then fungi), T-cell deficiency (viruses, *Pneumocystis*, *Cryptococcus*, mycobacteria, *Listeria*), antibody deficiency and asplenia (encapsulated bacteria), complement deficiency (*Neisseria*).
- Infection risk reflects both exposure (including latent organisms acquired years earlier) and the net state of immunosuppression.
- Signs of infection are muted; treat on suspicion and investigate widely.
- Neutropenic sepsis (neutrophils ≤ $0.5 \times 10^9$/L with fever or signs of sepsis) is an emergency: cultures and immediate empirical antibiotics, usually piperacillin–tazobactam, within an hour.
- After transplantation, infections follow a timeline: surgical and donor-derived in the first month, opportunistic (CMV, *Pneumocystis*) at one to six months, community and late complications (PTLD) afterwards. Prophylaxis and monitoring shift this pattern.
- Before steroids and biological drugs: screen for TB, hepatitis B, HIV and *Strongyloides* as appropriate, vaccinate before starting, and give targeted prophylaxis.
- People without a functioning spleen need vaccines, antibiotic prophylaxis, standby antibiotics and an alert card to prevent overwhelming sepsis.
:::

## Exercises

::: exercise The neutrophil count {level=1 check="1.2*0.2"}
A patient's white cell count is $1.2 \times 10^9$/L, with 15% neutrophils and 5% band forms. What is the absolute neutrophil count in units of $10^9$/L?
::: solution
$\text{ANC} = 1.2 \times (0.15 + 0.05) = 1.2 \times 0.20 = 0.24 \times 10^9$/L. This is below 0.5, so a fever would meet the definition of neutropenic sepsis.
:::
:::

::: exercise Match the defect {level=1}
For each patient, name the immune defect and one characteristic infection: (a) a man with chronic lymphocytic leukaemia and low immunoglobulins who has had three pneumonias in a year; (b) a woman on prednisolone 40 mg daily and methotrexate with a dry cough and hypoxia; (c) a man who had a splenectomy and was bitten by a dog; (d) a woman five days after induction chemotherapy for acute myeloid leukaemia.
::: solution
(a) **Antibody deficiency**: recurrent pneumococcal or *H. influenzae* pneumonia; immunoglobulin replacement may be considered. (b) **T-cell suppression** from high-dose steroids plus a second agent: ***Pneumocystis* pneumonia**, which prophylaxis would have helped prevent. (c) **Asplenia**: fulminant ***Capnocytophaga canimorsus*** sepsis, so antibiotics are given after any dog bite. (d) **Neutropenia** and mucositis: Gram-negative bacteraemia (including *Pseudomonas*), streptococcal bacteraemia, and with prolonged neutropenia *Aspergillus*.
:::
:::

::: exercise Vaccines and splenectomy {level=1}
A 40-year-old woman will have an elective splenectomy for immune thrombocytopenia in six weeks. Another patient has an emergency splenectomy for trauma today. When should each be vaccinated, and why does the timing differ?
::: solution
For the **elective** operation, vaccines (pneumococcal, Hib/MenC, MenACWY, MenB, influenza) are given **at least two weeks before** surgery, so that the antibody response develops while the spleen is still present, which helps it. After an **emergency** splenectomy, vaccination is given about **two weeks after** surgery (or before discharge if follow-up is uncertain), because responses are better once the acute stress of injury and surgery has passed. Both need antibiotic prophylaxis, a standby supply, an alert card and advice.
:::
:::

::: exercise Before infliximab {level=2}
A 28-year-old man born in the Philippines, with Crohn's disease, is to start infliximab. List the screening and preventive steps before the first infusion, with the reason for each.
::: solution
- **TB**: symptom review, chest radiograph and **IGRA**; TNF is essential for maintaining granulomas, so TB infection can reactivate as severe, often extrapulmonary disease. If TB infection is found, treatment is started, usually at least a few weeks before infliximab, with specialist advice.
- **Hepatitis B** (HBsAg, anti-HBc, anti-HBs): risk of reactivation; vaccinate if non-immune; antiviral prophylaxis or monitoring if previously infected.
- **Hepatitis C and HIV**: undiagnosed infection affects safety and management.
- **VZV serology** if no history of chickenpox: varicella vaccine (live) must be given before treatment starts.
- **Vaccinations**: pneumococcal, annual influenza, COVID-19, and HPV as appropriate; live vaccines are avoided once treatment has started.
- ***Strongyloides* serology** should be considered given his origin, especially if steroids are also used.
- **Education**: to seek prompt advice for fever or new symptoms, and to tell any clinician that he takes infliximab.
:::
:::

::: exercise A positive core antibody {level=2}
A 66-year-old woman with lymphoma is to receive rituximab-containing chemotherapy. Her hepatitis B tests show HBsAg negative, anti-HBc positive, anti-HBs negative, and HBV DNA undetectable. Interpret this and outline management.
::: solution
**Interpretation**: **resolved (past) hepatitis B infection**. The virus persists as covalently closed circular DNA in hepatocytes and is controlled by the immune system. Rituximab depletes B cells and can allow **reactivation**, which may cause severe hepatitis and liver failure.

**Management**: because rituximab carries a high risk of reactivation in this situation, **antiviral prophylaxis** (entecavir or tenofovir) is usually given, starting before or with chemotherapy and continuing for many months after the last rituximab dose (commonly at least 12–18 months), with monitoring of liver tests and HBV DNA. An alternative in lower-risk settings is close monitoring with treatment at the first sign of reactivation, but for rituximab prophylaxis is generally preferred, following hepatology advice.
:::
:::

::: exercise Fever that will not settle {level=2}
A 58-year-old man with acute myeloid leukaemia is on day 12 of neutropenia after induction chemotherapy. He has had fever for five days despite piperacillin–tazobactam, and blood cultures are negative. He now has a dry cough and pleuritic chest pain. CT chest shows several nodules, one surrounded by a halo of ground-glass change. Serum galactomannan is positive. What is the diagnosis and treatment?
::: solution
**Diagnosis**: probable **invasive pulmonary aspergillosis**. Prolonged profound neutropenia is the main risk factor. Nodules with a **halo sign** (haemorrhage around a nodule caused by angioinvasion) and a positive **galactomannan** (a component of the *Aspergillus* cell wall) are typical early findings; bronchoscopy with lavage galactomannan and culture can add support.

**Treatment**: an antifungal active against *Aspergillus*, **voriconazole** or **isavuconazole** first-line, with therapeutic drug monitoring for voriconazole and attention to its many interactions; liposomal amphotericin B is an alternative, and also covers mucormycosis, which the CT can mimic. Recovery of neutrophils is the most important determinant of outcome. Continue his broad-spectrum antibiotics while neutropenic and febrile. Consider whether antifungal prophylaxis was appropriate, and plan secondary prophylaxis for later chemotherapy.
:::
:::

::: exercise Headache after a kidney transplant {level=3}
A 52-year-old woman who had a kidney transplant two years ago, on tacrolimus, mycophenolate and prednisolone, has a week of headache, low-grade fever and mild confusion. She was recently given clarithromycin by her GP for a chest infection. Discuss the differential diagnosis and the management issues, including the drug interaction.
::: hint
Think of T-cell-deficiency infections of the central nervous system, and of non-infective causes related to her drugs.
:::
::: solution
**Infective differential** (T-cell deficiency): **cryptococcal meningitis** (subacute headache, often with raised intracranial pressure; serum and CSF cryptococcal antigen), ***Listeria*** meningitis or rhombencephalitis, **TB meningitis**, **PML** (JC virus), toxoplasmosis, **viral encephalitis** (HSV, VZV, HHV-6), and *Nocardia* brain abscess (often with lung lesions); also common bacterial meningitis.

**Non-infective differential**: **calcineurin inhibitor toxicity**. Clarithromycin is a strong **CYP3A4 inhibitor** and raises tacrolimus levels, which can cause headache, tremor, confusion, seizures, hypertension and acute kidney injury, and **posterior reversible encephalopathy syndrome (PRES)**. PTLD in the brain is a further possibility.

**Management**: urgent tacrolimus level and kidney function; MRI brain; blood cultures, serum cryptococcal antigen; lumbar puncture (if safe) for opening pressure, cell count, glucose, protein, Gram stain, culture, cryptococcal antigen and PCR panels; empirical treatment covering bacterial meningitis **including *Listeria*** (amoxicillin added to a cephalosporin) and aciclovir pending results. Stop clarithromycin and adjust tacrolimus with the transplant team. The case shows two rules: in transplant recipients, check every new drug for interactions, and consider both opportunistic infection and drug toxicity for any new neurological symptom.
:::
:::

::: exercise Diarrhoea after a stem cell transplant {level=3}
A 41-year-old man is 60 days after an allogeneic stem cell transplant from an unrelated donor. He develops profuse watery diarrhoea (two litres a day), abdominal cramps and a new skin rash on his palms. He takes ciclosporin, co-trimoxazole and aciclovir prophylaxis, and letermovir. Give the differential diagnosis, how you would distinguish the causes, and why this matters.
::: solution
**Differential**: **acute gastrointestinal graft-versus-host disease (GVHD)**, suggested by high-volume diarrhoea with a palmar rash in the post-engraftment period; **CMV colitis** (less likely on letermovir prophylaxis, but possible); **adenovirus** and **norovirus** (which can cause prolonged diarrhoea in HSCT recipients); ***C. difficile*** infection; other enteric bacteria and parasites; and drug effects (mycophenolate if used, magnesium supplements).

**Distinguishing them**: stool tests for *C. difficile* toxin, bacterial, viral (norovirus, adenovirus, rotavirus PCR) and parasitic pathogens; blood CMV and adenovirus PCR; skin biopsy of the rash; and **endoscopy with biopsies** of the colon (and often upper gut), which can show the apoptotic crypt changes of GVHD, CMV inclusions on immunohistochemistry, or other pathogens.

**Why it matters**: the treatments point in opposite directions. GVHD is treated by **increasing immunosuppression** (high-dose corticosteroids and other agents), while infection needs antimicrobial therapy and, where possible, **less** immunosuppression. Starting steroids for presumed GVHD when the cause is CMV or adenovirus could allow the infection to disseminate; missing GVHD causes severe fluid loss and damage. Both can coexist, which is why biopsy and microbiology are pursued in parallel.
:::
:::
