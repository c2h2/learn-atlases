In 1981 a new illness began killing previously healthy young adults. For fifteen years an HIV diagnosis usually meant death within about a decade. Today a person diagnosed early and treated well can expect a near-normal life span, and a person whose virus is suppressed by treatment does not pass HIV on to sexual partners. Few changes in medicine have been so large.

The epidemic is not over. UNAIDS estimated that in 2024 about 40.8 million people were living with HIV, 1.3 million acquired it, and 630,000 died of HIV-related causes, most of them in sub-Saharan Africa and most because they were diagnosed late or could not stay on treatment. In countries like the UK the main problems are late diagnosis, stigma, and the long-term health of an ageing population living with HIV.

This chapter covers the virus and its life cycle, transmission and natural history, diagnosis, antiretroviral therapy, the opportunistic infections of advanced disease, and prevention. UK practice follows the British HIV Association (BHIVA) and British Association for Sexual Health and HIV (BASHH); global practice follows WHO. Drug choices are given as principles: individual regimens come from specialist HIV services and current guidelines.

## The virus and its life cycle

::: definition HIV and its replication cycle {#def-virology}
**Human immunodeficiency virus (HIV)** is an enveloped RNA virus of the lentivirus genus of retroviruses. **HIV-1** causes almost all infections worldwide; **HIV-2**, found mainly in West Africa, is less transmissible, progresses more slowly and is naturally resistant to some drugs. Each virion carries two copies of a single-stranded RNA genome of about 9,700 bases, together with three viral enzymes: **reverse transcriptase**, **integrase** and **protease**.

The replication cycle has seven steps, and each is a drug target:

1. **Attachment**: the envelope glycoprotein gp120 binds the **CD4** molecule on helper T cells, macrophages and dendritic cells.
2. **Co-receptor binding**: gp120 then binds a chemokine co-receptor, **CCR5** (most transmitted viruses) or **CXCR4** (often later in infection).
3. **Fusion**: gp41 drives fusion of the viral and cell membranes, and the capsid enters the cytoplasm.
4. **Reverse transcription**: reverse transcriptase copies the RNA genome into double-stranded DNA. It has no proofreading function and makes frequent errors.
5. **Integration**: integrase inserts the viral DNA into the host chromosome as a **provirus**, which persists for the life of the cell.
6. **Transcription and translation**: the host machinery makes viral RNA and long polyproteins.
7. **Assembly, budding and maturation**: new virions bud from the membrane, and protease cuts the polyproteins into working parts; without this the virions are not infectious.
:::

::: proof
**Why the CD4 count falls, and why treatment is lifelong.** In the first weeks of infection the virus replicates explosively, especially in the gut-associated lymphoid tissue, where most of the body's memory CD4 T cells live. Many are destroyed within weeks. CD4 cells are then lost steadily through direct killing by the virus, inflammatory death of abortively infected cells, killing by cytotoxic T cells, and chronic immune activation that drives cells to exhaustion. The bone marrow and thymus cannot keep pace, and the blood CD4 count falls by an average of roughly 50–100 cells/µL per year without treatment, with wide variation between people.

A small number of infected cells are **resting memory CD4 T cells**. In these the provirus is integrated but silent, so the cell makes no virus and is invisible to both the immune system and drugs, which act only on replicating virus. This **latent reservoir** decays extremely slowly, with a half-life of years. If treatment stops, virus re-emerges from it, usually within weeks. That is why antiretroviral therapy controls HIV but does not cure it.
:::

## Transmission and natural history

HIV is transmitted by **sexual contact**, by **blood** (shared injecting equipment, transfusion of unscreened blood, needlestick injury) and **from parent to child** during pregnancy, birth or breastfeeding. It is not transmitted by kissing, sharing utensils, insect bites or ordinary social contact.

The risk from a single exposure to an untreated source is low but not trivial. United States CDC estimates are about 1.4% for receptive anal sex, about 0.6% for sharing a needle when injecting drugs, about 0.2–0.3% for a needlestick injury, and about 0.1% for receptive vaginal sex. Without intervention, 15–45% of babies born to mothers with HIV acquire it. Other STIs, a high viral load in the source and acute infection all raise the risk. A source on treatment with a suppressed viral load removes sexual transmission risk entirely.

Untreated infection passes through three phases:

- **Acute (primary) HIV infection**, 2–4 weeks after exposure: many people have a glandular-fever-like illness with fever, sore throat, rash, lymphadenopathy, mouth ulcers and sometimes aseptic meningitis. The viral load is extremely high, so this is the most infectious phase, and antibodies may not yet be detectable.
- **Chronic asymptomatic infection**, a median of about ten years: the person feels well while the CD4 count declines. Shingles, seborrhoeic dermatitis, persistent lymphadenopathy, thrombocytopenia and recurrent bacterial pneumonia may appear.
- **Advanced disease and AIDS**: opportunistic infections and cancers appear as the CD4 count falls below about 200 cells/µL. WHO defines **advanced HIV disease** in adults as a CD4 count below 200 cells/µL or a WHO clinical stage 3 or 4 event; all children under five with HIV are considered to have advanced disease.

::: widget plot
f: log10(1e5*(0.97*exp(-k*x) + 0.03*exp(-0.05*x)))
x: 0, 120
y: 0, 5.5
sliders: k=0.5:0.2:1:0.05
hlines: 1.7
labels: \log_{10}\text{HIV RNA (copies/mL)}
caption: A simplified two-phase model of viral load after starting effective ART from 100,000 copies/mL. Virus made by short-lived productively infected cells falls fast (rate $k$ per day, half-life of one to two days), and a slower second phase follows from longer-lived infected cells. The horizontal line is 50 copies/mL, roughly log₁₀ 1.7, the usual threshold for "undetectable"; most people cross it within three to six months. Latently infected resting cells, which keep the infection alive for life, are not shown. A teaching model, not a clinical predictor.
:::

## Diagnosis

::: definition HIV testing {#def-diagnosis}
The standard laboratory screening test is a **fourth-generation assay**, which detects both HIV-1/2 antibodies and HIV-1 **p24 antigen**. Because p24 appears before antibodies, most infections are detectable about four weeks after exposure, and UK guidance (BHIVA/BASHH/BIA, 2020) states that a negative fourth-generation test **45 days** after the last possible exposure excludes infection. Point-of-care and self-tests that detect antibody only have a longer window period of up to **90 days**.

A reactive screening test is always **confirmed** on a separate sample with a different assay before diagnosis is given. After diagnosis, the baseline assessment includes the **CD4 count** (immune status), the **HIV RNA viral load** (replication), a **genotypic resistance test**, **HLA-B\*57:01** (before abacavir), hepatitis B and C serology, STI screening and a check for opportunistic infections when the CD4 count is low.
:::

Testing is the gateway to everything else, and the main obstacle to good outcomes is late diagnosis. In the UK a person is "late" if their CD4 count at diagnosis is below 350 cells/µL. Strategies to reduce this include **opt-out testing** (testing is routine unless the person declines), which NHS England introduced in emergency departments in areas of very high prevalence from 2022, and testing anyone with an **indicator condition**: an illness that is more common in people with HIV. Examples are tuberculosis, any STI, hepatitis B or C, lymphoma, cervical or anal cancer, shingles in a younger adult, unexplained weight loss or lymphadenopathy, a glandular-fever-like illness, community-acquired pneumonia, oral candidiasis and unexplained low platelets.

::: warning
**Don't call it glandular fever without testing for HIV.** Acute HIV infection looks like infectious mononucleosis: fever, sore throat, lymph nodes and a rash. If the Epstein–Barr virus test is negative, or the person has had a recent possible exposure, test for HIV with a fourth-generation assay (and repeat it if the first is within the window period). Diagnosing HIV at this stage allows treatment to start when the reservoir is smallest, and prevents transmission during the most infectious weeks.
:::

## Antiretroviral therapy

::: theorem Principles of antiretroviral therapy {#thm-art}
1. **Treat everyone.** Antiretroviral therapy (ART) is recommended for every person with HIV, whatever their CD4 count, and started as soon as they are ready.
2. **Combine drugs.** A regimen contains at least two, and usually three, fully active drugs, normally from at least two classes.
3. **Aim for suppression.** The goal is a viral load below 50 copies/mL, usually reached within 3–6 months, and kept there for life.
4. **Undetectable = untransmittable (U=U).** A person with a sustained viral load below 200 copies/mL does not transmit HIV sexually.
:::

::: proof
**Why combination therapy prevents resistance.** The numbers explain it. Reverse transcriptase makes roughly $3 \times 10^{-5}$ errors per base copied. With a genome of about $9.7 \times 10^{3}$ bases, the expected number of new mutations per genome per cycle is

$$
3 \times 10^{-5} \times 9.7 \times 10^{3} \approx 0.29,
$$

so roughly one in four new genomes carries at least one mutation. An untreated person produces in the order of $10^{10}$ virions per day. Every possible single-base change is therefore made many times every day, and a virus resistant to any single drug that needs only one mutation already exists before treatment starts. Monotherapy selects it within weeks, as zidovudine monotherapy showed in the late 1980s.

A virus that must carry two or three specific mutations at once, each with a probability of order $10^{-5}$ per site, arises with a probability near $10^{-10}$ to $10^{-15}$ per genome. When three active drugs suppress replication almost completely, very few new genomes are made at all, and the chance of such a virus emerging becomes negligible. Resistance under combination therapy comes mostly from **incomplete adherence**, which allows replication in the presence of drug levels too low to suppress it.
:::

The START trial (2015) settled the question of when to start: immediate ART reduced serious AIDS and non-AIDS events by more than half compared with waiting until the CD4 count fell below 350 cells/µL. Most people start within days to weeks of diagnosis.

| Class | Examples | Key points |
|---|---|---|
| Nucleoside/nucleotide reverse transcriptase inhibitors (NRTIs) | tenofovir (as TDF or TAF), emtricitabine, lamivudine, abacavir | Backbone of most regimens. Tenofovir and emtricitabine/lamivudine also treat hepatitis B. Abacavir causes a severe hypersensitivity reaction in people with HLA-B\*57:01. TDF can affect the kidneys and bone density |
| Non-nucleoside reverse transcriptase inhibitors (NNRTIs) | efavirenz, rilpivirine, doravirine | Single mutations can cause high-level resistance. Efavirenz has neuropsychiatric effects. Rilpivirine needs stomach acid to be absorbed |
| Integrase strand transfer inhibitors (INSTIs) | dolutegravir, bictegravir, cabotegravir | Potent, well tolerated, high barrier to resistance (dolutegravir, bictegravir). Absorption reduced by antacids, iron and calcium. Weight gain reported |
| Protease inhibitors (PIs) | darunavir, atazanavir | Given with a pharmacokinetic **booster** (ritonavir or cobicistat), which inhibits CYP3A4 and causes many drug interactions. High barrier to resistance |
| Entry and other inhibitors | maraviroc (CCR5 antagonist), fostemsavir (attachment inhibitor), lenacapavir (capsid inhibitor) | Used mainly in treatment-experienced people. Long-acting lenacapavir is also used for prevention |

As of 2026, BHIVA and WHO guidance recommend that most people start with **two NRTIs plus an integrase inhibitor**, such as dolutegravir or bictegravir. WHO's preferred first-line regimen for adults is a single daily tablet of tenofovir disoproxil, lamivudine and dolutegravir. Two-drug regimens (for example dolutegravir with lamivudine) and long-acting injections of cabotegravir with rilpivirine every two months are options for selected people. Monitoring after the start includes viral load at about 1 and 3 months, then every 6–12 months once suppressed, with renal function and other tests according to the drugs used. A confirmed viral load above 200 copies/mL on treatment is **virological failure** and prompts a review of adherence, interactions and resistance.

::: warning
**Boosted regimens interact with many everyday drugs.** Ritonavir and cobicistat strongly inhibit CYP3A4. Inhaled or injected fluticasone or triamcinolone can then accumulate and cause **iatrogenic Cushing's syndrome** with adrenal suppression; simvastatin can cause rhabdomyolysis; some sedatives become dangerous. Rifampicin, carbamazepine and St John's wort do the opposite: they induce metabolism and can lower antiretroviral levels enough to cause failure. Check every new prescription, including over-the-counter and herbal products, against an HIV drug interaction resource.
:::

::: example Resistance arithmetic {#ex-mutation}
Using a reverse transcriptase error rate of $3 \times 10^{-5}$ per base, (a) estimate how many copies of the genome must be made, on average, to produce one with a particular single-base change at one site, and (b) explain what this means for a person producing $10^{10}$ virions per day.
::: solution
(a) A specific base can mutate to one of three alternatives, so a particular change at a particular site has a probability of about $3 \times 10^{-5}/3 = 10^{-5}$ per copy. On average about $10^{5}$ copies are needed to produce it once.

(b) With $10^{10}$ new virions per day, that specific mutation arises about $10^{10}/10^{5} = 10^{5}$ times **every day**. Any single-mutation resistance is therefore pre-existing in an untreated person. For a combination of two specific mutations the probability falls to about $10^{-10}$ per copy, and for three to about $10^{-15}$: rare enough that, once three drugs have cut virus production to almost nothing, multiply resistant virus is very unlikely to emerge, provided drug levels stay adequate.
:::
:::

## Opportunistic infections

::: definition Opportunistic infections and the CD4 count {#def-opportunistic}
An **opportunistic infection** is caused by an organism that rarely causes disease in a person with normal immunity. In HIV the risk tracks the CD4 count:

| CD4 count (cells/µL) | Typical conditions |
|---|---|
| Any | Tuberculosis, bacterial pneumonia, herpes zoster, Kaposi sarcoma, lymphoma (risks rise as CD4 falls) |
| Below 200 | *Pneumocystis jirovecii* pneumonia (PCP), oesophageal candidiasis, progressive multifocal leukoencephalopathy |
| Below 100 | Cerebral toxoplasmosis, cryptococcal meningitis |
| Below 50 | Cytomegalovirus retinitis, disseminated *Mycobacterium avium* complex |

**Primary prophylaxis** prevents a first episode: co-trimoxazole for people with a CD4 count below 200 cells/µL prevents PCP and, at lower counts, toxoplasmosis. In WHO guidance, people with a CD4 count below 100 cells/µL (and considered below 200) are screened for **cryptococcal antigen** in blood so that pre-emptive treatment can prevent meningitis. Prophylaxis is stopped once ART has restored the CD4 count above guideline thresholds.
:::

**Kaposi sarcoma**, caused by human herpesvirus 8, produces purple patches, plaques or nodules on the skin, mouth, gut and lungs; it often regresses with ART alone, and chemotherapy is added for extensive disease. Lymphomas, cervical cancer and anal cancer are also more common.

**Immune reconstitution inflammatory syndrome (IRIS)** is a paradoxical worsening after ART is started. As the immune system recovers, it mounts an inflammatory response against an infection that was already present: tuberculosis, cryptococcus or cytomegalovirus, for example. It is most likely when the starting CD4 count is very low. The timing of ART after an opportunistic infection balances the risk of IRIS against the risk of further immune decline: for most infections, including PCP and tuberculosis, ART is started within two weeks; for **cryptococcal** and **tuberculous meningitis**, where inflammation inside the skull is dangerous, it is deferred by about four to eight weeks.

::: example Breathless and desaturating {#ex-pjp}
A 34-year-old man has had three weeks of dry cough, low-grade fever and increasing breathlessness on exertion. He has oral thrush. His oxygen saturation is 95% at rest but falls to 86% after walking up a flight of stairs. The chest radiograph shows faint bilateral perihilar haziness. An HIV test is positive and his CD4 count is 40 cells/µL; arterial $P_a\mathrm{O_2}$ on air is 8.6 kPa.
::: solution
**Diagnosis.** A subacute dry cough, exertional desaturation, perihilar infiltrates and oral candidiasis with a CD4 count below 200 cells/µL point strongly to ***Pneumocystis jirovecii* pneumonia**. It is confirmed by PCR or immunofluorescence on induced sputum or bronchoalveolar lavage; serum beta-D-glucan is usually raised. Pneumothorax is a recognised complication.

**Treatment.** High-dose co-trimoxazole for 21 days is first-line. Because his $P_a\mathrm{O_2}$ is below 9.3 kPa, **adjunctive corticosteroids** are given, started early, because they reduce mortality and the need for ventilation in moderate to severe disease. Alternatives exist for people who cannot take co-trimoxazole.

**Then.** ART is started within two weeks, after which he takes co-trimoxazole prophylaxis until his CD4 count recovers. His partners should be offered testing. The case also shows a missed opportunity: oral thrush and weight loss are indicator conditions that should have prompted an HIV test earlier.
:::
:::

::: example Headache that would not settle {#ex-crypto}
A 29-year-old woman who moved to the UK from Zimbabwe three years ago has had two weeks of worsening headache, nausea and blurred vision. She is newly diagnosed with HIV with a CD4 count of 35 cells/µL. CT head is normal. Lumbar puncture: opening pressure 38 cm H₂O, cerebrospinal fluid white cells 12/µL, protein mildly raised, glucose low-normal; cryptococcal antigen is strongly positive and India ink shows encapsulated yeasts.
::: solution
**Diagnosis**: **cryptococcal meningitis** caused by *Cryptococcus neoformans*, a leading cause of HIV-related death in sub-Saharan Africa. The cerebrospinal fluid can look almost normal, because there are so few white cells to mount a response. The very high **opening pressure** explains the headache and visual blurring and is itself a cause of death.

**Induction treatment**: WHO (2022) recommends a single high dose of **liposomal amphotericin B** with 14 days of **flucytosine** and **fluconazole**, based on the AMBITION-cm trial, which showed this to be as effective as longer amphotericin regimens with fewer side-effects. Where liposomal amphotericin is unavailable, other amphotericin-based combinations are used. This is followed by consolidation and maintenance fluconazole.

**Raised pressure** is treated with repeated therapeutic lumbar punctures until it normalises; acetazolamide and steroids do not help and steroids are harmful.

**ART is deferred** for about four to six weeks: the COAT trial found higher mortality when ART was started within one to two weeks, probably because of IRIS in the brain.
:::
:::

## Prevention and living with HIV

::: definition HIV prevention and long-term care {#def-longterm}
**Combination prevention** uses several methods together:

- **Treatment as prevention**: ART that suppresses the viral load prevents sexual transmission (U=U). The HPTN 052 trial (2011) showed a 96% reduction in linked transmission in couples, and the PARTNER studies found no linked transmissions from partners with suppressed virus during tens of thousands of acts of condomless sex.
- **Pre-exposure prophylaxis (PrEP)**: antiretroviral drugs taken by HIV-negative people before exposure. Oral tenofovir disoproxil with emtricitabine, taken daily or (for anal sex) on demand around sex, is highly effective when taken as directed. Long-acting injectable **cabotegravir** every two months is more effective than oral PrEP in trials. Twice-yearly **lenacapavir** was approved for PrEP in the United States in June 2025, recommended by WHO in July 2025, and licensed in the UK in December 2025; as of 2026, routine NHS access is still under assessment.
- **Post-exposure prophylaxis (PEP)**: a 28-day course of ART started as soon as possible, ideally within 24 hours and no later than 72 hours after a significant exposure.
- **Prevention of vertical transmission**: antenatal testing, ART throughout pregnancy, management of delivery according to the viral load, and short-course ART for the baby. In the UK this has reduced vertical transmission to well below 1%.
- Condoms, sterile injecting equipment, screened blood and treatment of other STIs.

**Long-term care** of people with suppressed HIV focuses on the conditions of ageing, which occur earlier and more often: cardiovascular disease, kidney and bone disease, some cancers, and cognitive and mental-health problems. Smoking cessation, blood pressure and lipid management, cervical and anal cancer screening, vaccination (avoiding live vaccines when the CD4 count is below 200 cells/µL) and support against stigma are part of routine care.
:::

::: example A needlestick on the ward {#ex-pep}
A nurse sustains a deep needlestick injury with a hollow needle used to take blood from a patient known to have HIV. What is the approximate risk of transmission, and does she need PEP? How would the answer change if the source patient had been on ART with an undetectable viral load for two years?
::: solution
**First aid**: encourage bleeding, wash with soap and running water, do not scrub or suck the wound, and report the injury immediately to occupational health or the emergency department.

**Risk**: about 0.3% (roughly 1 in 300) for a percutaneous injury from an untreated source; deep injuries, visible blood on the device and a needle that had been in a vein carry more risk. The source's viral load is the key fact.

**If the source viral load is unknown or detectable**: PEP is recommended: a combination of antiretrovirals (typically two NRTIs plus an integrase inhibitor), started as soon as possible, ideally within an hour or two and no later than 72 hours, continued for 28 days. She is tested at baseline and again after the window period, and followed for side-effects and adherence.

**If the source has a confirmed undetectable viral load**: the risk of transmission is negligible, and current UK guidance (BHIVA/BASHH, 2021) does not recommend PEP in this situation. She still has baseline and follow-up testing and the injury is reported. Hepatitis B and C risks are assessed separately in every needlestick injury.
:::
:::

::: history
On 5 June 1981 the United States CDC's *Morbidity and Mortality Weekly Report* described *Pneumocystis* pneumonia in five previously healthy young gay men in Los Angeles, reported by Michael Gottlieb and colleagues. In 1983 Françoise Barré-Sinoussi and Luc Montagnier at the Pasteur Institute isolated the causative retrovirus, work recognised by the Nobel Prize in 2008; Robert Gallo's group in the United States confirmed it as the cause in 1984. Antibody tests to screen blood followed in 1985, and the first antiretroviral drug, zidovudine, was licensed in 1987. Monotherapy failed through resistance. In 1996 combination therapy with protease inhibitors, developed with the viral-dynamics work of David Ho and others, transformed survival. The HPTN 052 trial (2011), led by Myron Cohen, proved that treatment prevents transmission, and the START trial (2015) that everyone benefits from immediate treatment.
:::

::: quiz
A woman with newly diagnosed HIV has a CD4 count of 80 cells/µL and is well. Which preventive measures are indicated? Select all that apply.
- [x] Co-trimoxazole prophylaxis
- [x] Serum cryptococcal antigen screening
- [x] Starting antiretroviral therapy promptly
- [ ] Live attenuated yellow fever vaccine before travel
::: solution
At a CD4 count of 80 cells/µL, co-trimoxazole prevents *Pneumocystis* pneumonia and toxoplasmosis, and cryptococcal antigen screening (recommended below 100 cells/µL) can detect infection before meningitis develops. ART should start promptly once active opportunistic infections have been excluded. Live vaccines such as yellow fever are contraindicated when the CD4 count is below 200 cells/µL.
:::
:::

## Where this leads

Primary and secondary immunodeficiency is covered in [[immunology/immunodeficiency]], and the virus itself in [[microbiology/viruses]]. Tuberculosis, the leading cause of death in people with HIV, is in [[infectious-diseases/tuberculosis]]. Other sexually transmitted infections are in [[infectious-diseases/sexually-transmitted-infections]], and infection in other immunocompromised hosts in [[infectious-diseases/immunocompromised-host]]. Population testing programmes are discussed in [[public-health/screening]].

::: summary
- HIV is a retrovirus that infects CD4-bearing cells using CCR5 or CXCR4, integrates into the host genome and establishes a latent reservoir, so ART controls but does not cure it.
- Untreated infection runs from acute seroconversion through years of silent CD4 decline to advanced disease with opportunistic infections below about 200 cells/µL.
- Fourth-generation tests detect antibody and p24 antigen; a negative test 45 days after exposure excludes infection. Reactive results are always confirmed.
- ART is recommended for everyone, combining at least two (usually three) active drugs; two NRTIs plus an integrase inhibitor is the usual start. The goal is a viral load below 50 copies/mL.
- Combination therapy prevents resistance because a virus needing several simultaneous mutations is vanishingly rare; resistance mostly follows poor adherence.
- Opportunistic infections track the CD4 count; co-trimoxazole and cryptococcal antigen screening prevent common killers. ART timing after an opportunistic infection balances IRIS against continued immune decline.
- Prevention combines U=U, PrEP, PEP within 72 hours, and prevention of vertical transmission.
:::

## Exercises

::: exercise Counting log drops {level=1 check="round(10*log10(250000/50))/10"}
A man's viral load falls from 250,000 copies/mL before treatment to 50 copies/mL after three months of ART. By how many log₁₀ units has it fallen? Give the answer to one decimal place.
::: solution
$\log_{10}(250{,}000/50) = \log_{10}(5000) = 3.699 \approx 3.7$ log₁₀ units, a more than 5,000-fold reduction. A fall of at least 1 log₁₀ in the first month is expected with effective treatment.
:::
:::

::: exercise Window periods {level=1}
A man attends for testing 20 days after condomless sex with a partner of unknown HIV status. A laboratory fourth-generation test is negative. What do you tell him, and when should he be retested? Would a negative antibody-only self-test at the same time be more or less informative?
::: solution
At 20 days he is still within the window period, so a negative fourth-generation test does not exclude infection. He should be retested at **45 days** after the exposure; a negative result then excludes HIV. An antibody-only self-test has a longer window (up to 90 days), so it is less informative at 20 days. PEP is no longer an option at 20 days, because it must start within 72 hours of exposure; PrEP should be discussed for the future, and he should be offered a full STI screen.
:::
:::

::: exercise Testing in a low-prevalence population {level=1 check="round(100*0.002*0.999/(0.002*0.999 + 0.998*0.002))/100"}
A screening test for HIV has sensitivity 99.9% and specificity 99.8%. It is used in a population where the prevalence is 0.2%. What is the positive predictive value of a single reactive result? Give the answer as a decimal to two decimal places.
::: hint
Out of 100,000 people, how many have HIV and test positive, and how many do not have HIV but test positive?
:::
::: solution
Per 100,000 people: 200 have HIV, of whom $200 \times 0.999 \approx 199.8$ test positive. Of the 99,800 without HIV, $99{,}800 \times 0.002 = 199.6$ test falsely positive.

$$
\text{PPV} = \frac{0.002 \times 0.999}{0.002 \times 0.999 + 0.998 \times 0.002} = \frac{0.001998}{0.003994} \approx 0.50
$$

Only about half of reactive screening results are true positives in this setting, which is why every reactive result is confirmed with a different assay on a second sample before diagnosis.
:::
:::

::: exercise An inhaler and a booster {level=2}
A 52-year-old man with HIV has taken darunavir boosted with ritonavir, with tenofovir and emtricitabine, for six years. His GP started inhaled fluticasone for asthma four months ago. He now has a round face, easy bruising, weight gain around the abdomen and new hypertension. Explain what has happened and how it should be managed.
::: solution
Ritonavir strongly inhibits **CYP3A4**, the enzyme that metabolises fluticasone. Even inhaled fluticasone then reaches high systemic levels and causes **iatrogenic Cushing's syndrome**, with suppression of the hypothalamic–pituitary–adrenal axis. Management: switch to an inhaled corticosteroid less dependent on CYP3A4 (for example beclometasone) or change the antiretroviral regimen to one without a booster, in discussion with the HIV team. Because his own adrenal function is suppressed, the steroid must not simply be stopped: he is at risk of **adrenal crisis**, needs assessment of adrenal function, and may need a temporary physiological glucocorticoid with sick-day rules. The case shows why every new prescription for a person on ART must be checked for interactions.
:::
:::

::: exercise Glandular fever that was not {level=2}
A 24-year-old woman has a week of fever, sore throat, a fine rash on her trunk, cervical lymphadenopathy and two painful mouth ulcers. A monospot test for Epstein–Barr virus is negative. Her liver enzymes are mildly raised and her platelets are 110 × 10⁹/L. Give a differential diagnosis, the key test, and why diagnosis now matters.
::: solution
**Differential**: acute HIV infection, cytomegalovirus, early Epstein–Barr virus infection (monospot can be falsely negative early), secondary syphilis, streptococcal pharyngitis, toxoplasmosis and drug reaction. Mouth ulcers, rash and a negative monospot make **acute HIV** important to exclude.

**Key test**: a fourth-generation HIV antigen/antibody test (p24 antigen is usually positive in acute infection even before antibodies appear), with HIV RNA if the result is equivocal, plus syphilis serology. A sexual history is needed.

**Why now**: the viral load in acute infection is very high, so the risk of transmission to partners is highest in these weeks. Starting ART early limits the size of the latent reservoir, protects the immune system and prevents onward transmission; partners can be offered testing and PEP if within 72 hours of exposure.
:::
:::

::: exercise HIV in pregnancy {level=2}
A woman is found to have HIV at her booking blood tests at 12 weeks of pregnancy. Her CD4 count is 420 cells/µL and her viral load 35,000 copies/mL. Outline the principles of care to prevent transmission to the baby.
::: solution
**ART should start promptly**, with a regimen known to be safe and effective in pregnancy, aiming for an undetectable viral load well before delivery; the viral load is monitored during pregnancy and at about 36 weeks. **Mode of delivery** depends on the viral load near term: in UK guidance, a viral load below 50 copies/mL at 36 weeks supports a planned vaginal birth, a viral load of 400 copies/mL or more leads to a recommendation of planned caesarean section, and intravenous zidovudine is given in labour when the viral load is above 1,000 copies/mL or unknown. **The baby** receives a short course of antiretroviral prophylaxis and is tested at intervals to confirm they are HIV-negative. **Feeding**: in the UK formula feeding avoids all postnatal risk; for women who are fully suppressed and choose to breastfeed, BHIVA guidance supports this with close monitoring of mother and baby. Her partner and any older children should be offered testing. With this care, vertical transmission is well below 1%.
:::
:::

::: exercise Reading a resistance report {level=3}
A 40-year-old man has taken tenofovir disoproxil, emtricitabine and efavirenz for three years. He admits to frequently missing doses. His viral load is 4,500 copies/mL on two occasions a month apart. A genotype shows M184V in reverse transcriptase and K103N. Interpret these results and outline the next steps.
::: hint
M184V affects lamivudine and emtricitabine; K103N affects the first-generation NNRTIs.
:::
::: solution
**Interpretation**: two viral loads above 200 copies/mL confirm **virological failure**. **M184V** gives high-level resistance to emtricitabine and lamivudine (though it also reduces viral fitness and slightly increases susceptibility to tenofovir). **K103N** gives high-level resistance to efavirenz and nevirapine but not to newer NNRTIs such as doravirine or etravirine in isolation. In effect he has been taking a regimen with only one fully active drug, tenofovir, and further resistance is likely if nothing changes.

**Next steps**: address the cause first: explore the reasons for missed doses (side-effects such as efavirenz's vivid dreams, mental health, housing, stigma, pill burden) and offer support. Check for drug interactions. Construct a new regimen with **at least two fully active drugs**, usually including a drug with a high barrier to resistance such as dolutegravir or boosted darunavir, guided by the resistance report and specialist advice (often in a virtual multidisciplinary clinic). Repeat the viral load at about 1 and 3 months to confirm re-suppression.
:::
:::

::: exercise HIV and tuberculosis together {level=3}
A 33-year-old man with smear-positive pulmonary tuberculosis is newly diagnosed with HIV, CD4 count 60 cells/µL. He is starting standard TB treatment including rifampicin. Discuss (a) when to start ART, (b) the main drug interaction and how it is handled, and (c) what complication to watch for in the following weeks.
::: solution
(a) **Timing**: ART should be started within about two weeks of TB treatment, especially with a CD4 count this low, because early ART reduces death in people with advanced HIV. The exception is tuberculous meningitis, where ART is deferred by several weeks because of the risk of intracranial inflammation.

(b) **Interaction**: rifampicin is a strong inducer of CYP3A4 and UGT1A1. It lowers levels of dolutegravir, which is overcome by giving dolutegravir twice daily instead of once for as long as rifampicin is taken and for two weeks afterwards. Rifampicin cannot be combined with boosted protease inhibitors, bictegravir or long-acting cabotegravir/rilpivirine, which is why regimen choice is made with the TB and HIV teams together.

(c) **TB-associated IRIS**: within weeks of starting ART, fever, enlarging lymph nodes, worsening chest radiograph or serous effusions can appear as the immune system recovers. It must be distinguished from TB treatment failure, drug resistance or a new infection; most cases are managed by continuing both treatments, and prednisolone reduces symptoms in moderate cases. Prednisolone given when ART is started also reduces IRIS in people at high risk.
:::
:::
