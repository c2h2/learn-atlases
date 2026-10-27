Hospitals cure infections, and they also cause them. Every intravenous cannula, urinary catheter, ventilator tube and surgical incision breaches the body's defences, and hospitals concentrate vulnerable people, antibiotic-resistant organisms and the hands that move between them. The European Centre for Disease Prevention and Control (ECDC) estimated that in 2022–23 about 4.3 million patients a year acquired at least one healthcare-associated infection in acute hospitals in the EU and EEA. Respiratory infections were the commonest type, followed by urinary tract and surgical site infections.

Many of these infections are preventable. The most important measures are simple: hand hygiene, aseptic technique, using devices only when needed and removing them promptly, and prescribing antibiotics wisely. They work when they are done reliably by every member of staff, every time. This chapter covers how healthcare-associated infections arise and are prevented, the infections linked to devices and to surgery, *Clostridioides difficile*, and the control of multidrug-resistant organisms. UK practice follows NICE and the national infection prevention and control manual for England; treatments are described as principles.

## How healthcare-associated infections arise

::: definition Healthcare-associated infection {#def-epidemiology}
A **healthcare-associated infection (HCAI)** is an infection that develops as a result of healthcare and was not present or incubating when care began. For surveillance, an infection in a hospital patient is usually counted as **hospital-onset** if symptoms start on day 3 of admission or later (48 hours or more after admission). Infections that start in the community soon after discharge, or that relate to outpatient care such as dialysis or chemotherapy, can also be healthcare-associated.

Every HCAI follows a **chain of infection**: an organism from a **source** (the patient's own flora, another patient, a member of staff, the environment or equipment) reaches a **susceptible host** by a **route of transmission**:

- **Contact**, direct (hands) or indirect (equipment, surfaces): the commonest route in hospitals, for example for MRSA, *C. difficile* and resistant Gram-negative bacteria.
- **Droplet**: larger respiratory particles that travel short distances (influenza, pertussis).
- **Airborne**: small particles that remain suspended (tuberculosis, measles, varicella).

**Standard infection control precautions** apply to every patient: hand hygiene, personal protective equipment according to the task, safe management of sharps, blood and body fluids, respiratory hygiene, and clean equipment and environments. **Transmission-based precautions** (contact, droplet, airborne) are added when a specific infection is known or suspected.
:::

Many HCAIs are caused by the patient's own organisms, which gain access to sterile sites through devices and wounds. Others are carried from patient to patient, most often on the hands of staff. **Hand hygiene** at the right moments, as set out in WHO's "five moments" (before touching a patient, before a clean or aseptic procedure, after body-fluid exposure risk, after touching a patient, and after touching a patient's surroundings), is the single most important control measure. Alcohol-based hand rub is quicker and more effective than soap and water for most organisms; the exception is spores, such as those of *C. difficile*, which need soap and water.

## Device-associated infections

::: definition Device-associated infections and care bundles {#def-devices}
A **device-associated infection** is an infection that arises because a medical device bypasses normal defences. The main types are:

- **Central line-associated bloodstream infection (CLABSI)**: bacteraemia in a patient with a central venous catheter, without another source. Organisms enter from the skin along the outside of the catheter (early) or through the hub and lumen (later). Common causes are coagulase-negative staphylococci, *Staphylococcus aureus*, Gram-negative bacilli and *Candida*.
- **Peripheral cannula infection**: phlebitis and, importantly, *S. aureus* bacteraemia from a cannula left in too long.
- **Catheter-associated urinary tract infection (CAUTI)**: bacteria colonise the catheter surface within days, forming a **biofilm**. Almost all long-term catheters are colonised, so bacteriuria alone is not infection.
- **Ventilator-associated pneumonia (VAP)**: pneumonia arising more than 48 hours after intubation, from aspiration of colonised secretions around the tube cuff.

A **care bundle** is a small set of evidence-based practices that are delivered together, every time, and audited. For central lines: hand hygiene and **maximal sterile barriers** at insertion; skin preparation with **2% chlorhexidine in 70% alcohol**; choice of site (avoiding the femoral vein where possible) and ultrasound guidance; decontamination of hubs before every access; a clean, dry dressing; and a **daily review of whether the line is still needed**. Similar bundles exist for urinary catheters (avoid unnecessary catheters, aseptic insertion, closed drainage, early removal) and ventilated patients (head of bed raised 30–45°, daily sedation breaks, oral care, subglottic secretion drainage).
:::

::: theorem The device-day principle {#thm-device-days}
The risk of a device-associated infection accumulates with each day the device is in place. If a device carries a roughly constant daily infection risk (hazard) $\lambda$, the probability that an infection has occurred by day $t$ is

$$
P(t) = 1 - e^{-\lambda t} \approx \lambda t \quad \text{when } \lambda t \text{ is small.}
$$

For this reason infection rates are reported per **1,000 device-days** (for example, CLABSIs per 1,000 central-line days), and the two most effective ways to prevent device infections are to lower the daily hazard (by care bundles) and to shorten the number of days (by removing devices as soon as they are no longer needed).
:::

The power of bundles was shown by the Keystone project in Michigan intensive care units, reported by Peter Pronovost and colleagues in 2006: with an insertion checklist, staff empowered to stop non-compliant insertions, and daily review, the median CLABSI rate fell from 2.7 per 1,000 catheter-days to zero within three months, and the mean rate fell by about two-thirds over 18 months.

::: widget plot
f: 100*(1 - exp(-L*x/1000))
x: 0, 60
y: 0, 30
sliders: L=4:0.5:10:0.5
labels: \text{cumulative risk of infection (\%)}
caption: Cumulative probability of a device-associated infection over days of device use (horizontal axis) for a constant daily hazard of $L$ infections per 1,000 device-days. Halving the hazard (better bundle compliance) or halving the number of days (earlier removal) has the same effect over short periods. A simplified model: real hazards vary with time since insertion, device type and patient.
:::

::: example A fever in intensive care {#ex-clabsi}
A 61-year-old man on day 9 in intensive care after emergency bowel surgery develops a temperature of 38.9 °C and needs more noradrenaline. He has a right internal jugular central line inserted on admission. The insertion site is slightly red. Blood cultures taken simultaneously from the line and from a peripheral vein both grow Gram-positive cocci in clusters, identified next day as *S. aureus*, sensitive to flucloxacillin. The line culture became positive three hours before the peripheral one.
::: solution
**Diagnosis**: **catheter-related *S. aureus* bloodstream infection**. The same organism in both sets, with the line culture becoming positive two hours or more before the peripheral one (**differential time to positivity**), points to the catheter as the source.

**Management of *S. aureus* bacteraemia** has fixed principles because the organism seeds heart valves, bones, joints and other sites:
1. **Remove the line** (and any other unnecessary lines). Leaving it in causes relapse.
2. **Repeat blood cultures** after 48–72 hours to confirm clearance.
3. **Echocardiography** to look for endocarditis; transoesophageal echo is often needed.
4. Treat with an **intravenous anti-staphylococcal beta-lactam** (here flucloxacillin), for at least **14 days** from the first negative culture in uncomplicated cases, and longer (usually 4–6 weeks) if there is endocarditis, metastatic infection, persistent bacteraemia or a prosthetic device.
5. **Infectious diseases consultation**, which is associated with lower mortality.

**Surveillance**: the unit had 6 CLABSIs in 2,400 central-line days over the last year, a rate of $6/2400 \times 1000 = 2.5$ per 1,000 line-days. An audit of bundle compliance, particularly hub care and daily line review, should follow.
:::
:::

::: example An infected pacemaker {#ex-cied}
A 79-year-old woman had a dual-chamber pacemaker inserted four months ago. The skin over the generator has become red and thin, and now a small area has broken down, exposing metal. She is afebrile and blood cultures are negative.
::: solution
**Diagnosis**: **cardiac implantable electronic device (CIED) pocket infection**. Erosion of the device through the skin means the pocket and device are infected, whatever the cultures show, because the device is covered by a bacterial **biofilm**, which antibiotics cannot sterilise. Coagulase-negative staphylococci and *S. aureus* are the usual organisms.

**Management**: antibiotics alone fail. The standard is **complete removal of the generator and all leads**, usually by percutaneous extraction in a specialist centre, with cultures of the pocket tissue and lead tips, and antibiotic treatment. Blood cultures and echocardiography look for **lead or valve endocarditis**, which would lengthen treatment. A new device is implanted, usually on the other side, after the infection is controlled and blood cultures are negative, with temporary pacing if she depends on the pacemaker in the meantime. Small superficial wound infections without pocket involvement are the only situations managed with antibiotics alone, and they need close review.
:::
:::

## Surgical site infection

::: definition Surgical site infection {#def-ssi}
A **surgical site infection (SSI)** is an infection at the site of an operation within 30 days (or up to 90 days when an implant is left in place). It is classified by depth:

- **Superficial incisional**: skin and subcutaneous tissue of the incision.
- **Deep incisional**: fascia and muscle layers.
- **Organ/space**: any part of the anatomy opened or manipulated, for example an intra-abdominal abscess or a prosthetic joint infection.

Risk depends on the **wound class**: **clean** (no entry to respiratory, alimentary or genitourinary tracts), **clean-contaminated** (controlled entry), **contaminated** (gross spillage, open fresh trauma) and **dirty** (established infection, perforated viscus). Patient factors (diabetes, obesity, smoking, malnutrition, immunosuppression, nasal *S. aureus* carriage) and operative factors (long operations, hypothermia, poor tissue handling) add to the risk.
:::

Prevention combines measures before, during and after surgery, as set out in NICE guidance (NG125): the patient showers before surgery; hair is removed only if necessary, with **clippers** rather than razors; **antibiotic prophylaxis** is given as a single dose before incision (timed so that tissue levels are adequate at the start of surgery) for clean surgery with implants, clean-contaminated and contaminated surgery, and is **not** routinely continued after the operation; skin is prepared with an alcohol-based antiseptic, preferably chlorhexidine; the patient is kept warm; glucose is controlled; and the wound is covered with an appropriate dressing. Decolonisation of *S. aureus* carriers is used before some high-risk operations such as cardiac and orthopaedic implant surgery. Dirty surgery requires treatment, not prophylaxis.

::: example Pain out of proportion {#ex-necfasc}
A 55-year-old man with type 2 diabetes grazed his shin on a garden step three days ago. He now has severe pain in the lower leg, much worse than the mild redness suggests, with swelling extending to the knee. Temperature 38.8 °C, pulse 122 per minute, blood pressure 95/55 mmHg. The skin over the swelling is dusky with a few blisters and the area feels "woody"; there is reduced sensation over it. White cell count 24 × 10⁹/L, sodium 130 mmol/L, glucose 19 mmol/L, creatinine 160 µmol/L, CK raised.
::: solution
**Diagnosis**: **necrotising soft tissue infection (necrotising fasciitis)** until proven otherwise. The warning features are **pain out of proportion to the visible signs**, rapid spread, systemic toxicity, skin discoloration, bullae, hard induration and anaesthesia of the skin (from destruction of cutaneous nerves). Type I infection is polymicrobial (common in diabetes and after abdominal or perineal surgery, including Fournier's gangrene); type II is usually *Streptococcus pyogenes*, sometimes with *S. aureus*, and can follow minor injuries in healthy people.

**Management is surgical**: urgent review by a senior surgeon and **early, aggressive debridement** of all necrotic tissue, usually repeated over the following days. Imaging must not delay surgery. Laboratory scores such as LRINEC are not reliable enough to exclude the diagnosis.

**Antibiotics**: broad-spectrum cover for streptococci, staphylococci (including MRSA if at risk), Gram-negatives and anaerobes according to local guidance, **plus clindamycin**, which suppresses toxin production in streptococcal and staphylococcal infection. Sepsis care, glucose control and intensive care support. Intravenous immunoglobulin is sometimes used in streptococcal toxic shock. Invasive group A streptococcal infection is notifiable in the UK, and household contacts may need antibiotic prophylaxis.
:::
:::

::: example A cluster after cardiac surgery {#ex-surgeon}
Over three months, a cardiac surgical unit sees five deep sternal wound infections with methicillin-sensitive *S. aureus* after coronary bypass surgery, against a usual rate of about one a quarter. How should this be investigated?
::: solution
This is a **possible outbreak**, investigated with the same steps as any outbreak ([[infectious-diseases/stewardship-outbreaks]]):

1. **Confirm the cluster**: check that the cases are real SSIs by standard definitions and that the increase is not explained by a change in surveillance or case mix.
2. **Type the isolates**: whole-genome sequencing shows whether the five isolates are closely related (suggesting a common source) or unrelated (suggesting a general lapse in practice).
3. **Describe the cases** by time, operating theatre, procedures, staff present and postoperative ward.
4. **Review practice**: skin preparation, prophylactic antibiotic timing, theatre ventilation, instrument decontamination, wound care, and adherence to decolonisation protocols.

Suppose sequencing shows all five isolates to be the same strain, and all cases involved one surgeon. Staff screening finds that this surgeon carries the same strain in the nose and on a patch of chronic hand dermatitis. The surgeon is managed confidentially through occupational health: treatment of the dermatitis, **decolonisation**, and temporary restriction from operating until clearance is confirmed. This is a staff health issue, not a disciplinary one. Ongoing surveillance confirms that the cluster has ended.
:::
:::

## *Clostridioides difficile* infection

::: definition *Clostridioides difficile* infection {#def-cdiff}
***Clostridioides difficile*** is a Gram-positive, spore-forming, toxin-producing anaerobe. **C. difficile infection (CDI)** is diarrhoea (three or more unformed stools in 24 hours) or colitis caused by its toxins A and B, which damage the colonic epithelium; severe cases develop **pseudomembranous colitis**. Spores survive for months on surfaces, resist alcohol, and spread on hands and in the environment.

**Risk factors**: antibiotics that disrupt the colonic microbiota (especially clindamycin, cephalosporins, fluoroquinolones and co-amoxiclav), older age, hospital or care-home residence, proton pump inhibitors and serious illness.

**Diagnosis** uses a two-stage test on a liquid stool: a sensitive screening test (glutamate dehydrogenase antigen or toxin-gene PCR), then a **toxin** immunoassay. A positive toxin test confirms infection; a positive screen with a negative toxin test may mean colonisation. Testing formed stools, or retesting after cure, is not useful.

**Severity** (UK guidance): severe disease is suggested by a white cell count above 15 × 10⁹/L, an acutely rising creatinine (more than 50% above baseline), a temperature above 38.5 °C, or evidence of severe colitis; **life-threatening** disease by hypotension, partial or complete ileus, or toxic megacolon.

**Treatment** (NICE NG199, 2021): stop the causative antibiotic if possible and review drugs that reduce gut motility or acid. For a first episode, **oral vancomycin** for 10 days is first-line, with **fidaxomicin** second-line. A further episode within 12 weeks of resolution (relapse) is treated with fidaxomicin; one after 12 weeks (recurrence) with vancomycin or fidaxomicin. Life-threatening disease needs specialist care, often surgical, with oral vancomycin and intravenous metronidazole. **Faecal microbiota transplant** is considered after two or more previous episodes.
:::

In England, mandatory surveillance and national action from 2007, including restriction of cephalosporins and fluoroquinolones, isolation, and cleaning with sporicidal agents, coincided with a steep fall in CDI. This is one of the clearest demonstrations that **antimicrobial stewardship prevents infection**.

::: warning
**Don't treat colonisation, and don't test the wrong sample.** Many HCAI "diagnoses" are colonisation. A catheterised patient almost always has bacteriuria; urine dipsticks are not used in catheterised patients, and antibiotics are given only for symptoms of infection. A positive MRSA screening swab is a reason for decolonisation and precautions, not for systemic antibiotics. A formed stool should not be tested for *C. difficile*, and a positive GDH test without toxin in a patient whose diarrhoea has another explanation may represent carriage. Treating colonisation drives resistance and *C. difficile* without helping the patient.
:::

## Multidrug-resistant organisms

The resistant organisms that spread in healthcare are discussed in detail in [[infectious-diseases/stewardship-outbreaks]]. The main ones are:

- **Meticillin-resistant *S. aureus* (MRSA)**: carries the *mecA* gene, which encodes an altered penicillin-binding protein (PBP2a) with low affinity for beta-lactams. Controlled in the UK by screening of admissions in high-risk groups, decolonisation with nasal mupirocin and chlorhexidine body wash, contact precautions and line care; MRSA bacteraemia rates in England fell sharply in the 2000s.
- **Vancomycin-resistant enterococci (VRE)**: colonise the gut of patients in haematology, renal and intensive care units.
- **Extended-spectrum beta-lactamase (ESBL)-producing Enterobacterales**: resistant to most penicillins and cephalosporins; now common in the community as well as hospitals.
- **Carbapenemase-producing Enterobacterales (CPE)**: produce enzymes such as KPC, OXA-48, NDM, VIM or IMP that destroy carbapenems; often resistant to almost all antibiotics, and carried on plasmids that spread between species. Patients transferred from hospitals abroad or from UK hospitals with known CPE are screened by rectal swab on admission and isolated until results are available.
- **Non-fermenting Gram-negative bacteria** such as *Pseudomonas aeruginosa* and *Acinetobacter baumannii*, which survive in sinks, drains and on equipment.
- ***Candida auris***: a yeast that colonises skin, persists on surfaces, causes outbreaks in intensive care and is often resistant to antifungals.

Control rests on the same pillars: early identification by screening, isolation or cohorting of colonised and infected patients, contact precautions, thorough cleaning (including attention to sinks and drains), and reducing antibiotic pressure.

::: history
In 1847 Ignaz Semmelweis, working in the obstetric clinic of the Vienna General Hospital, noticed that mothers delivered by doctors and students, who came from the autopsy room, died of puerperal fever far more often than those delivered by midwives. After he required hand washing in chlorinated lime solution, maternal mortality on the doctors' ward fell dramatically; his ideas were widely rejected during his lifetime. Florence Nightingale's work in the Crimean War (1854–56) used statistics to show that deaths from disease far exceeded deaths from wounds, and that sanitation saved lives. In 1867 Joseph Lister reported the use of carbolic acid to prevent wound infection, building on Pasteur's germ theory. Within two years of methicillin's introduction, MRSA was reported in England in 1961. In the modern era, the WHO "Clean care is safer care" campaign (2005) and Pronovost's checklist-based reduction of central line infections (2006) showed that systematic, reliable practice prevents infection on a large scale.
:::

::: quiz
A nurse is about to care for a patient with *C. difficile* diarrhoea. Which hand hygiene method is required after contact?
- [ ] Alcohol-based hand rub
- [x] Washing with soap and running water
- [ ] Chlorhexidine alcohol gel
- [ ] Gloves alone, without hand hygiene
::: solution
*C. difficile* spores are not killed by alcohol. Washing with soap and running water removes them mechanically. Gloves and aprons are worn for contact, but hands are still washed after removing gloves, because gloves can be contaminated or torn.
:::
:::

## Where this leads

The principles of infection prevention and control are introduced in [[microbiology/infection-control]], and the biology of resistance and antimicrobials in [[microbiology/antimicrobials]]. Antimicrobial stewardship and outbreak investigation are developed in [[infectious-diseases/stewardship-outbreaks]]. Surgical wounds are covered in [[surgery/wounds-surgical-infection]], intensive care in [[emergency-critical-care/critical-care]], and the safety culture behind care bundles in [[clinical-skills/patient-safety]].

::: summary
- Healthcare-associated infections are common and often preventable; most spread by contact, frequently on hands, or arise from the patient's own flora entering through devices and wounds.
- Hand hygiene at WHO's five moments is the most important control measure; soap and water are needed for *C. difficile* spores.
- Device infection risk accumulates per device-day; care bundles lower the daily hazard and early removal reduces the days. Rates are reported per 1,000 device-days.
- *S. aureus* bacteraemia needs line removal, repeat cultures, echocardiography and at least 14 days of intravenous treatment; infected cardiac devices need complete removal.
- SSIs are prevented by appropriate prophylaxis (a single pre-incision dose), clipping not shaving, alcohol-based chlorhexidine skin preparation, normothermia and glucose control. Necrotising fasciitis is a surgical emergency.
- *C. difficile* infection follows antibiotic exposure; diagnosis needs a toxin test, treatment follows NICE NG199 (oral vancomycin first-line), and stewardship and environmental control prevent it.
- Multidrug-resistant organisms (MRSA, VRE, ESBL and carbapenemase producers, *C. auris*) are controlled by screening, isolation, cleaning and reducing antibiotic pressure.
:::

## Exercises

::: exercise A line infection rate {level=1 check="2.5"}
An intensive care unit records 9 central line-associated bloodstream infections over 3,600 central-line days. What is the rate per 1,000 line-days?
::: solution
$9/3600 \times 1000 = 2.5$ per 1,000 line-days.
:::
:::

::: exercise Risk over a month {level=1 check="round(1000*(1-exp(-0.06)))/10"}
A urinary catheter carries a constant daily risk of infection of 0.002 (2 per 1,000 catheter-days). Using [[#thm-device-days]], what is the probability of infection over 30 days? Give the answer as a percentage to one decimal place.
::: solution
$P = 1 - e^{-0.002 \times 30} = 1 - e^{-0.06} = 0.0582$, or **5.8%**. The approximation $\lambda t = 0.06$ (6%) is close because $\lambda t$ is small. Removing the catheter after 10 days instead would lower the risk to about 2%.
:::
:::

::: exercise Wound classes {level=1}
Classify each operation by wound class: (a) elective inguinal hernia repair with mesh; (b) elective right hemicolectomy; (c) laparotomy for a perforated appendix with pus in the pelvis; (d) emergency repair of an open fracture sustained two hours ago. State which need prophylactic antibiotics and which need treatment.
::: solution
(a) **Clean** surgery, with an implant (mesh), so a single dose of prophylaxis is given. (b) **Clean-contaminated** (controlled entry into the bowel): prophylaxis. (c) **Dirty** (established infection): this needs a **treatment** course, not prophylaxis. (d) **Contaminated** (open fresh trauma): early antibiotics are given as part of treatment of an open fracture, alongside debridement, according to orthopaedic guidance.
:::
:::

::: exercise Bacteria in the catheter bag {level=2}
An 84-year-old woman with a long-term urinary catheter is in hospital after a fall. She is well, afebrile, with no new confusion. A routine catheter urine sample grows more than 10⁵ CFU/mL of *Proteus mirabilis*. A doctor prescribes antibiotics. Was this right?
::: solution
No. Long-term catheters are almost always colonised with bacteria growing in biofilm, and **asymptomatic bacteriuria** in a catheterised patient should not be treated: antibiotics do not clear the biofilm, select resistance and cause *C. difficile* infection. Urine should be cultured from catheterised patients only when there are features of infection (fever, rigors, new confusion with no other cause, loin pain, suprapubic tenderness, sepsis). If she later develops symptoms of infection, the catheter should be changed before a sample is taken and treatment started. *Proteus* also forms crystalline biofilms that block catheters, which is a reason to review the catheter, not to treat the urine.
:::
:::

::: exercise Is it severe? {level=2}
A 76-year-old man develops diarrhoea on day 8 of treatment for pneumonia. *C. difficile* GDH and toxin are both positive. Temperature 38.0 °C, white cell count 18 × 10⁹/L, creatinine 145 µmol/L (baseline 85), blood pressure 128/74 mmHg, abdomen soft and mildly tender, bowel sounds present. Assess severity and outline management.
::: solution
**Severity**: the white cell count is above 15 × 10⁹/L and the creatinine has risen by $(145-85)/85 \approx 71\%$, more than 50% above baseline, so this is **severe** CDI. There are no features of life-threatening disease (no hypotension, ileus or megacolon). **Management**: isolate with enteric precautions; review and, if possible, stop or narrow the pneumonia antibiotics; stop proton pump inhibitors and antimotility drugs if possible; assess and correct fluid and electrolyte balance; start **oral vancomycin** (first-line in NICE NG199); daily review for signs of deterioration (rising white count or lactate, abdominal distension, ileus) with a low threshold for abdominal imaging and surgical review. Report as required by local and national surveillance.
:::
:::

::: exercise When to give prophylaxis {level=2}
For an elective hip replacement, the anaesthetist gives the prophylactic antibiotic two hours before incision, and the surgical team continue it for five days afterwards "because there is an implant". Identify the problems and explain the principles.
::: solution
**Timing**: prophylaxis aims to have adequate tissue levels **at the moment of incision** and throughout the operation, so it is given shortly before incision (usually at induction of anaesthesia), with a repeat dose for long operations or major blood loss. Two hours before may leave levels falling when the incision is made, depending on the drug's half-life. **Duration**: continuing prophylaxis for days after surgery does not reduce SSI, even with implants; it increases adverse effects, *C. difficile* infection and resistance. A single dose (or prophylaxis limited to the operative period, according to local policy) is standard. Other measures (clipping, alcohol-based chlorhexidine skin preparation, normothermia, decolonisation of *S. aureus* carriers, laminar-flow theatres in joint replacement) matter as much as the antibiotic.
:::
:::

::: exercise A CPE alert {level=3}
On a general medical ward, a patient transferred two weeks ago from a hospital overseas is found on a rectal screening swab to carry an NDM carbapenemase-producing *Klebsiella pneumoniae*. He has not been isolated so far. Outline the response.
::: hint
Think about the index patient, contacts, the environment, laboratory confirmation and communication.
:::
::: solution
**Index patient**: move him to a single room with en-suite facilities, with contact precautions (gloves and aprons, dedicated equipment), and flag his record so that future admissions are isolated promptly. He is colonised, not infected, so antibiotics are not given unless infection develops; if they are needed, they are chosen with microbiology, because NDM producers are resistant to almost all beta-lactams.

**Contacts**: identify patients who shared his bay or toilet facilities, screen them with rectal swabs (often on several occasions), and isolate or cohort any positives. Consider screening the whole ward if the patient was there for a long time.

**Environment**: enhanced cleaning, including sinks, drains and toilets, which can harbour CPE.

**Laboratory and surveillance**: confirm the carbapenemase type, send the isolate to the reference laboratory, and inform the infection prevention and control team and, as required, the health protection team.

**Learning**: the trigger for screening on admission (transfer from a hospital abroad) was missed. The admission pathway should be reviewed, and staff reminded that screening and pre-emptive isolation of such transfers are standard, because CPE can spread silently between patients and are very difficult to eradicate.
:::
:::

::: exercise *S. aureus* from a forgotten cannula {level=3}
A 68-year-old woman admitted with a stroke develops a fever on day 6. A peripheral cannula in her left forearm, inserted in the emergency department, is still in place; the vein is red and tender. Two sets of blood cultures grow MRSA. She is otherwise stable. Outline management, including the duration of treatment and what determines it, and how such infections are prevented.
::: solution
**Management**: remove the cannula immediately (and send the tip if local practice requires). Start **intravenous treatment active against MRSA** (for example vancomycin or daptomycin according to local guidance) after discussion with infection specialists. Repeat blood cultures at 48–72 hours. Perform **echocardiography** (transthoracic, and transoesophageal if there is any concern) and examine for metastatic infection (spine, joints, abscesses). **Duration**: if this is uncomplicated (catheter source removed, blood cultures negative within 72 hours, fever settling, no endocarditis, no implanted prosthesis, no metastatic infection), at least **14 days** of intravenous therapy from the first negative culture; otherwise 4–6 weeks. Infectious diseases consultation is standard.

**Prevention**: peripheral cannulae should be inserted only when needed, inserted and handled aseptically, inspected at least daily with a visual phlebitis score, and **removed as soon as they are no longer needed** or when phlebitis appears. MRSA screening and decolonisation, and documentation of insertion dates, support this. Many trusts review cannula-related *S. aureus* bacteraemias as patient safety incidents.
:::
:::
