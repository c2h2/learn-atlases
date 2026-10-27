An **immunodeficiency** is a failure of some part of the immune system that leaves a person unusually susceptible to infection, and often also to autoimmunity, inflammation or cancer. Most children have six to ten respiratory infections a year, and most adults with recurrent colds have a normal immune system. The skill is in recognising the minority whose infections are telling a different story.

That story is usually told by the infections themselves. Each arm of the immune system protects against particular organisms at particular sites, so the organism, the site, the age at onset and the family history usually point to the defective component before any test is done. The tests then confirm what the history suggests.

This chapter sets out that reasoning, then covers the main primary immunodeficiencies (antibody, combined, phagocytic and complement defects), the much more common secondary immunodeficiencies including HIV infection and asplenia, and the principles of investigation and management. Defects of innate immunity were introduced in [[immunology/innate-immunity]].

::: definition Primary and secondary immunodeficiency {#def-immunodeficiency}
A **primary immunodeficiency**, now usually called an **inborn error of immunity**, is caused by a genetic defect in the immune system. Several hundred are known, classified by the International Union of Immunological Societies (IUIS). Many present in childhood, but some, such as common variable immunodeficiency, usually present in adults.

A **secondary immunodeficiency** is acquired, caused by another disease or its treatment: drugs, haematological cancer, HIV infection, loss of the spleen, protein loss, malnutrition, or extremes of age. Secondary immunodeficiency is far more common than primary.
:::

## Reading the pattern of infection

Clues that infections are abnormal are often summarised by the mnemonic **SPUR**: infections that are **S**erious, **P**ersistent, **U**nusual (an unusual organism or site) or **R**ecurrent. Other warning signs include failure to thrive in an infant, the need for intravenous antibiotics to clear infections, a family history of immunodeficiency or of unexplained early deaths, and infection with a live vaccine.

::: theorem The infection pattern points to the defect {#thm-pattern}
| Defective component | Typical organisms | Typical sites and features | Usual age at onset |
|---|---|---|---|
| **Antibody** | Encapsulated bacteria (*S. pneumoniae*, *H. influenzae*), *Giardia*, enteroviruses | Sinusitis, otitis, pneumonia, bronchiectasis; chronic diarrhoea | After 6 months (when maternal IgG wanes), or adulthood |
| **T cells (combined)** | Viruses (CMV, adenovirus, varicella), *Candida*, *Pneumocystis*, mycobacteria, live vaccines | Failure to thrive, chronic diarrhoea, persistent thrush, pneumonitis | First months of life |
| **Phagocytes** | *S. aureus*, Gram-negative bacteria, *Aspergillus*, *Candida* | Skin and deep abscesses, mouth ulcers, poor wound healing | Infancy or childhood |
| **Complement (terminal)** | *Neisseria* | Recurrent meningococcal disease | Any age, often adolescence |
| **Complement (early classical)** | Encapsulated bacteria | Lupus-like disease | Childhood or adulthood |
| **Spleen** | Encapsulated bacteria, *Plasmodium*, *Capnocytophaga* | Overwhelming sepsis | Any age after loss |
:::

::: proof
The pattern follows from what each component does. Antibody and complement opsonise extracellular bacteria, especially encapsulated ones that resist phagocytosis, and IgA protects mucosal surfaces, so antibody deficiency causes recurrent sinopulmonary bacterial infection; antibody also neutralises enteroviruses in the gut and blood and contains *Giardia*. T cells are needed to control intracellular pathogens (viruses, mycobacteria, *Pneumocystis*, fungi at mucosal surfaces) and to provide help for antibody production, so T-cell defects cause both kinds of infection and are the most severe. Phagocytes kill bacteria and fungi in tissue, so their defects cause abscesses. The membrane attack complex is especially important for *Neisseria*. The spleen filters the blood and makes the rapid IgM response to polysaccharides.

Age at onset follows from maternal IgG. Babies are protected by transplacental IgG for the first few months, so pure antibody deficiency rarely presents before about 6 months, whereas T-cell deficiency, which maternal antibody does not compensate for, presents in the first weeks or months.
:::

## Antibody deficiencies

Antibody deficiencies are the commonest primary immunodeficiencies that cause symptoms. They present mainly with recurrent bacterial infections of the respiratory tract. If untreated, repeated chest infections cause **bronchiectasis**, and much of the long-term harm is preventable by early diagnosis.

### Physiological hypogammaglobulinaemia of infancy

Maternal IgG crosses the placenta in the third trimester, so a term baby is born with an IgG level similar to its mother's. This IgG falls with a half-life of about 3 to 4 weeks. The baby's own production starts slowly. The result is a **physiological nadir** of IgG at about 3 to 6 months of age. Preterm babies, who receive less maternal IgG, have a deeper and earlier nadir.

::: widget plot
f: 10*0.5^(x/h); 7*(1 - exp(-x/8)); 10*0.5^(x/h) + 7*(1 - exp(-x/8))
x: 0, 18
y: 0, 11
sliders: h=1:0.5:2:0.1
labels: \text{maternal IgG}; \text{infant's own IgG}; \text{total IgG}
caption: A simplified model of serum IgG (g/L) in a term baby over the first 18 months. Maternal IgG falls with half-life $h$ months (about 1 month); the infant's own IgG rises slowly. The total reaches a minimum at about 3 to 5 months: the physiological nadir. In X-linked agammaglobulinaemia the second curve is absent, so the total simply follows the maternal curve to near zero, which is why infections typically begin after about 6 months. Illustrative curves, not reference values.
:::

### X-linked agammaglobulinaemia

**X-linked agammaglobulinaemia** (XLA) is caused by variants in the gene for **Bruton tyrosine kinase** (BTK), an enzyme required for B-cell development in the bone marrow. B cells fail to mature beyond the pre-B stage, so there are almost no B cells in the blood and all immunoglobulin classes are very low. Affected boys are well for the first months, then develop recurrent otitis, sinusitis and pneumonia with encapsulated bacteria. Tonsils and lymph nodes are very small, because they consist largely of B-cell follicles. Enteroviruses can cause a chronic, sometimes fatal meningoencephalitis, and live oral polio vaccine is dangerous. T-cell immunity is normal, so most viral and fungal infections are handled normally.

### Common variable immunodeficiency

**Common variable immunodeficiency** (CVID) is the commonest symptomatic primary antibody deficiency in adults. It is a heterogeneous group of conditions, most without a single identifiable gene defect, defined by:

- a marked reduction in IgG, together with low IgA and/or IgM;
- **poor antibody responses to vaccines** (for example, to pneumococcal polysaccharide or tetanus toxoid);
- exclusion of other causes of low antibodies, especially secondary causes such as drugs, lymphoma and protein loss;
- usually, onset after the age of 4 years; most patients are diagnosed in the second to fourth decades.

B cells are usually present but fail to differentiate into plasma cells. Beyond infections, many patients develop **non-infectious complications**: autoimmune cytopenias, granulomatous disease of the lungs, liver and lymph nodes (granulomatous–lymphocytic interstitial lung disease), enteropathy, splenomegaly and an increased risk of lymphoma. The delay from symptoms to diagnosis is often several years, during which bronchiectasis develops.

### Selective IgA deficiency

**Selective IgA deficiency** is the commonest primary immunodeficiency, affecting very roughly 1 in 500 to 1 in 700 people of European ancestry; it is much rarer in East Asian populations. Most affected people are healthy, because IgM can partly compensate at mucosal surfaces. Some have recurrent respiratory or gastrointestinal infections, and it is associated with autoimmunity, especially coeliac disease. Two practical points matter: coeliac IgA serology is falsely negative (see [[immunology/autoimmunity]]), and rarely, people with complete IgA deficiency and anti-IgA antibodies have severe reactions to blood products containing IgA.

::: example A toddler with recurrent pneumonia {#ex-xla}
A 2-year-old boy has had four episodes of pneumonia, recurrent otitis media and one episode of pneumococcal bacteraemia since the age of 9 months. He was well until then. On examination his tonsils are barely visible and no lymph nodes are palpable. His mother's brother died of meningitis aged 3. Immunoglobulins: IgG 0.6 g/L, IgA and IgM undetectable. What is the most likely diagnosis, how would you confirm it, and what are the principles of management?
::: solution
**Diagnosis.** Recurrent infection with encapsulated bacteria starting after 6 months (as maternal IgG waned), panhypogammaglobulinaemia, absent tonsils and lymph nodes, in a boy with a possibly affected maternal uncle, suggests **X-linked agammaglobulinaemia**.

**Confirmation.** Lymphocyte subsets by flow cytometry show **absent or nearly absent CD19 B cells** (fewer than 2% of lymphocytes) with normal T cells. BTK protein expression in monocytes and *BTK* gene sequencing confirm the diagnosis. His mother can then be offered carrier testing; each of her sons would have a 1 in 2 chance of being affected and each daughter a 1 in 2 chance of being a carrier.

**Management principles.** Lifelong **immunoglobulin replacement**, intravenously every 3 to 4 weeks or subcutaneously weekly, with doses adjusted to keep the trough IgG level in a target range and, more importantly, to prevent infections. Prompt antibiotic treatment of infections, monitoring of lung function and imaging for bronchiectasis, and avoidance of live vaccines that could cause disease. He does not need routine vaccines while on replacement, because he cannot make antibody and the immunoglobulin provides passive protection; inactivated influenza vaccine is sometimes still given because it may stimulate T-cell responses. With good replacement therapy, people with XLA can live largely normal lives.
:::
:::

## Combined immunodeficiencies

### Severe combined immunodeficiency

**Severe combined immunodeficiency** (SCID) is a group of defects in which T-cell development fails, with or without failure of B and NK cells. Because B cells need T-cell help, antibody responses also fail even when B cells are present. SCID is a paediatric emergency.

::: definition Severe combined immunodeficiency {#def-scid}
**SCID** is a group of inherited disorders in which T cells are absent or non-functional, so both cell-mediated and antibody responses fail. Infants present in the first months with **failure to thrive**, **chronic diarrhoea**, persistent **oral candidiasis** and infections with **opportunistic organisms** such as *Pneumocystis jirovecii*, CMV, adenovirus and parainfluenza virus. Live vaccines (BCG, rotavirus) can cause disseminated disease. Without haematopoietic stem cell transplantation or gene therapy, most affected children die within the first 1 to 2 years.
:::

SCID is classified by which lymphocyte populations are present, which points to the cause:

- **T−B+NK−**: defects of the common γ chain (*IL2RG*, X-linked, the commonest form), shared by the receptors for IL-2, IL-4, IL-7, IL-9, IL-15 and IL-21; IL-7 is needed for T-cell development and IL-15 for NK cells. JAK3 deficiency, its signalling partner, gives the same pattern with autosomal recessive inheritance.
- **T−B−NK+**: defects of V(D)J recombination (*RAG1*, *RAG2*, *DCLRE1C* encoding Artemis), in which T and B cells cannot make receptors but NK cells, which do not rearrange receptor genes, are normal (see [[immunology/antigen-recognition]]).
- **T−B−NK−**: **adenosine deaminase (ADA) deficiency**, in which toxic purine metabolites kill all developing lymphocytes.

Lymphopenia is a key clue: a normal infant has a much higher lymphocyte count than an adult, so a lymphocyte count that would be normal in an adult may be very low for an infant. Maternal T cells that crossed the placenta can engraft in a baby with SCID and cause a graft-versus-host-like rash, which can also confuse the T-cell count.

**Newborn screening** for SCID detects **T-cell receptor excision circles** (TRECs), small circles of DNA cut out during TCR gene rearrangement, which are present only in recently made T cells. Their absence in the dried blood spot taken in the first week of life indicates a lack of thymic output. Screening is routine in many countries; in England it has been run as an NHS in-service evaluation since September 2021. Early diagnosis matters because transplantation before infection gives the best survival, and because live vaccines can be avoided.

Curative treatment is **haematopoietic stem cell transplantation**, ideally from an HLA-matched sibling. **Gene therapy** with the patient's own corrected stem cells is available for some forms, such as ADA deficiency. Until then, the infant needs isolation from infection, *Pneumocystis* prophylaxis, immunoglobulin replacement, avoidance of live vaccines, and only **irradiated** and CMV-negative blood products, because viable donor lymphocytes in an unirradiated transfusion can cause fatal transfusion-associated graft-versus-host disease.

::: example An infant with diarrhoea and thrush {#ex-scid}
A 4-month-old girl has had diarrhoea since 6 weeks of age, persistent oral thrush despite treatment, and poor weight gain; she has dropped from the 50th to below the 2nd centile. She was admitted with cough, tachypnoea and hypoxia, and bronchoalveolar lavage shows *Pneumocystis jirovecii*. Her lymphocyte count is $0.9 \times 10^9$/L. Her parents are first cousins and an older sibling died of "pneumonia" at 5 months. What is the most likely diagnosis and what are the immediate priorities?
::: solution
**Diagnosis.** Onset in the first months with failure to thrive, chronic diarrhoea, persistent candidiasis and *Pneumocystis* pneumonia, with marked lymphopenia for her age (normal infant counts are several times higher), strongly suggests **severe combined immunodeficiency**. Consanguineous parents and a sibling's death suggest an autosomal recessive form such as RAG1/2, Artemis, JAK3 or ADA deficiency.

**Immediate investigations.** Lymphocyte subsets (T, B and NK cells and naive T-cell markers), immunoglobulins, T-cell proliferation tests, and genetic testing. An HIV test is also done, because HIV infection in infancy can present similarly.

**Immediate priorities.** Treat the *Pneumocystis* pneumonia, investigate for viruses (CMV, adenovirus, respiratory viruses) by PCR, and refer urgently to a supra-regional paediatric immunology and transplant centre. Protective isolation, immunoglobulin replacement, *Pneumocystis* prophylaxis after treatment, irradiated CMV-negative blood products only, and **no live vaccines** (check whether she has had rotavirus vaccine, and BCG if eligible). HLA typing of the family begins at once in preparation for haematopoietic stem cell transplantation, the only curative treatment apart from gene therapy for some forms. Siblings born later can be diagnosed at birth.
:::
:::

### Other combined defects

- **22q11.2 deletion syndrome** (DiGeorge syndrome) results from abnormal development of the third and fourth pharyngeal pouches. Features include conotruncal cardiac defects, hypocalcaemia from parathyroid hypoplasia, a characteristic facial appearance, palatal abnormalities, and learning and psychiatric difficulties. The thymus is small, and most children have a mild-to-moderate T-cell deficiency that improves with age; a small minority have no thymus and a SCID-like picture that needs thymus transplantation. Until T-cell function is known, blood products should be irradiated and live vaccines deferred.
- **Wiskott–Aldrich syndrome** (X-linked, *WAS*) causes eczema, thrombocytopenia with **small platelets**, recurrent infections, autoimmunity and lymphoma.
- **Ataxia telangiectasia** (*ATM*) causes progressive cerebellar ataxia, telangiectasia of the eyes and skin, antibody and T-cell deficiency, radiosensitivity and a high risk of lymphoid cancers; α-fetoprotein is raised.
- **Hyper-IgM syndrome** caused by CD40 ligand deficiency is described in [[immunology/adaptive-responses]].

## Phagocyte and complement defects

These were described in [[immunology/innate-immunity]]. In summary:

- **Neutropenia**, most often caused by chemotherapy, causes bacterial and fungal infection; severity rises steeply below $0.5 \times 10^9$/L.
- **Chronic granulomatous disease** causes abscesses and granulomas with catalase-positive bacteria and *Aspergillus*; the DHR test confirms it.
- **Leucocyte adhesion deficiency** causes delayed cord separation and infections without pus, with very high blood neutrophil counts.
- **Terminal complement** and properdin deficiencies cause recurrent neisserial infection; C3 deficiency causes pyogenic infection; early classical deficiencies cause lupus.

## Secondary immunodeficiency

Most immunodeficient people seen in hospital have a secondary immunodeficiency, and many are not labelled as such. Common causes include:

- **drugs**: corticosteroids, chemotherapy, antimetabolites (azathioprine, mycophenolate, methotrexate), calcineurin inhibitors, JAK inhibitors and biologics. **Rituximab** depletes B cells for 6 to 12 months and can cause prolonged hypogammaglobulinaemia; anti-TNF therapy predisposes to TB and other granulomatous infections;
- **haematological cancers**: chronic lymphocytic leukaemia and myeloma cause hypogammaglobulinaemia and functional antibody deficiency; leukaemias and their treatment cause neutropenia;
- **protein loss**: nephrotic syndrome, protein-losing enteropathy and severe burns cause loss of IgG;
- **malnutrition**, the commonest cause of immunodeficiency worldwide;
- **diabetes**, **chronic kidney disease**, **liver cirrhosis** and **alcohol use**, which impair neutrophil function and other defences;
- **extremes of age**: neonates (especially preterm) and older people (**immunosenescence**, with fewer naive T cells and weaker vaccine responses);
- **asplenia** and **HIV infection**, discussed below.

:::warning
Do not label a patient as having CVID or another primary antibody deficiency without excluding secondary causes. Low IgG in an adult has many acquired explanations: drugs (rituximab, antiepileptics such as phenytoin and carbamazepine, corticosteroids), protein loss through the kidneys or gut, and B-cell cancers. A serum protein electrophoresis, urinary protein measurement and a medication history are part of the first assessment. Missing a lymphoma or myeloma because the low IgG was attributed to "CVID" is a serious error.
:::

::: example Low antibodies in an older man {#ex-secondary}
A 71-year-old man has had three pneumonias in a year. His IgG is 3.5 g/L, IgA 0.3 g/L and IgM 0.2 g/L. He takes ramipril and atorvastatin. His haemoglobin is 104 g/L, calcium 2.75 mmol/L and creatinine mildly raised. What should be done before considering a primary antibody deficiency?
::: solution
**Think secondary first.** New-onset hypogammaglobulinaemia at 71 is very unlikely to be a primary immunodeficiency. Anaemia, hypercalcaemia and renal impairment with suppressed polyclonal immunoglobulins strongly suggest **multiple myeloma**: a malignant plasma-cell clone makes a single monoclonal immunoglobulin or free light chain, while the normal polyclonal immunoglobulins are suppressed, causing a functional antibody deficiency. Total globulin may even look normal because of the paraprotein.

**Tests.** Serum protein electrophoresis with immunofixation, serum free light chains, urine for Bence Jones protein, blood film, and referral to haematology for bone marrow examination and imaging. Chronic lymphocytic leukaemia (blood count and film, lymphocyte immunophenotyping) and lymphoma are the other main malignant causes; protein loss (urine protein:creatinine ratio, albumin) and drugs should also be checked.

**Management principles.** Treat the underlying disease. Prompt treatment of infections, vaccination and, if infections recur despite this with low IgG and poor vaccine responses, immunoglobulin replacement according to national criteria.
:::
:::

### The spleen

The spleen filters blood, removing opsonised bacteria and old or parasitised red cells, and its marginal zone produces the rapid IgM response to polysaccharide antigens. **Asplenia or hyposplenism** follows surgical removal, sickle cell disease (repeated infarction leads to "autosplenectomy" in early childhood), coeliac disease and other conditions. The blood film may show **Howell–Jolly bodies**, nuclear remnants normally removed by the spleen.

People without a functioning spleen are at lifelong risk of **overwhelming post-splenectomy infection**, mainly with *S. pneumoniae*, and also with *H. influenzae* type b, *N. meningitidis*, *Capnocytophaga canimorsus* (from dog bites) and severe malaria. It can progress from a mild febrile illness to septic shock within hours. UK guidance (the UKHSA *Green Book*) recommends vaccination against pneumococcus, Hib and meningococci (ACWY and B), annual influenza vaccination, consideration of lifelong antibiotic prophylaxis (especially in the first years after splenectomy and in higher-risk patients), a supply of standby antibiotics, an alert card, and advice to seek medical help immediately for fever.

### HIV infection

HIV is the most important acquired immunodeficiency worldwide. The virus enters cells through **CD4** and a coreceptor, usually the chemokine receptor **CCR5** (or CXCR4 later in infection), so it infects CD4 T cells, macrophages and dendritic cells. Most CD4 T-cell loss early in infection occurs in the gut-associated lymphoid tissue. People who inherit two copies of the CCR5 variant **Δ32** lack the coreceptor and are highly resistant to infection with CCR5-using strains, a fact that led to the cure of a small number of people who received stem cell transplants from CCR5 Δ32 homozygous donors for blood cancers.

Untreated, HIV causes a progressive fall in CD4 T cells over years. The **CD4 count** predicts which opportunistic infections can occur:

| CD4 count (cells/µL) | Infections and conditions that become likely |
|---|---|
| Below about 500 | Herpes zoster, oral candidiasis, tuberculosis (which can occur at any count) |
| Below 200 | *Pneumocystis* pneumonia; this level also defines AIDS in the US surveillance definition |
| Below 100 | Cerebral toxoplasmosis, cryptococcal meningitis |
| Below 50 | CMV retinitis, disseminated *Mycobacterium avium* complex |

Effective **antiretroviral therapy** (ART) suppresses viral replication, allows CD4 counts to recover and gives near-normal life expectancy when started early. UK (BHIVA) and WHO guidelines recommend ART for everyone with HIV, regardless of CD4 count. A person on ART with a sustained undetectable viral load does not transmit HIV sexually (**undetectable = untransmittable**, U=U). Prophylaxis against *Pneumocystis* is given when the CD4 count is below 200 cells/µL until it recovers. Starting ART in someone with a very low CD4 count can unmask or worsen existing infections as immunity recovers: the **immune reconstitution inflammatory syndrome** (IRIS). The clinical management of HIV is covered in [[infectious-diseases/hiv]].

::: example An adult with breathlessness {#ex-hiv}
A 41-year-old man has had 3 weeks of progressive breathlessness on exertion, dry cough and fever. His oxygen saturation falls from 95% at rest to 86% on walking. Chest X-ray shows bilateral perihilar interstitial shadowing. He has oral candidiasis. His lymphocyte count is $0.8 \times 10^9$/L with 9% CD4 T cells. Calculate his CD4 count, explain its significance, and outline the immunological principles of his care.
::: solution
**CD4 count.** The absolute CD4 count is the lymphocyte count multiplied by the CD4 fraction: $0.8 \times 10^9/\text{L} \times 0.09 = 0.072 \times 10^9/\text{L} = 72$ cells/µL (since $10^9$/L equals $1000$ per µL, $0.072 \times 1000 = 72$).

**Significance.** A CD4 count below 200 cells/µL with subacute breathlessness, exercise desaturation, interstitial shadowing and oral thrush strongly suggests **Pneumocystis pneumonia** as the presenting illness of advanced HIV infection. A count below 100 also puts him at risk of cerebral toxoplasmosis and cryptococcal disease, so these should be considered (for example, a serum cryptococcal antigen test).

**Principles of care.** Confirm HIV infection and measure the viral load. Confirm *Pneumocystis* (induced sputum or bronchoalveolar lavage PCR or immunofluorescence) and treat according to guidelines, with adjunctive corticosteroids if he is hypoxic. **Start ART early**, usually within the first two weeks of *Pneumocystis* treatment, under specialist guidance; delaying it increases the risk of further opportunistic infection, though starting it may provoke IRIS. Continue *Pneumocystis* prophylaxis until the CD4 count has recovered above 200 cells/µL on ART. Offer partner notification and testing. His diagnosis was a missed opportunity: earlier HIV testing, which UK guidance recommends routinely in many settings, would have prevented this illness.
:::
:::

## Investigating suspected immunodeficiency

Investigations are chosen by the infection pattern, in stages.

1. **First-line tests**: full blood count with differential and film (neutrophils, lymphocytes, platelet size, Howell–Jolly bodies); serum immunoglobulins IgG, IgA and IgM; **HIV test**; serum protein electrophoresis in adults; urinary protein.
2. **Antibody function**: specific IgG to vaccine antigens (tetanus, Hib, pneumococcal serotypes), with repeat measurement 4 to 8 weeks after a test vaccination if levels are low.
3. **Lymphocyte subsets** by flow cytometry: CD3, CD4, CD8 T cells, CD19 B cells, NK cells, with naive and memory subsets where needed.
4. **Complement**: CH50 and AH50.
5. **Neutrophil function**: DHR test.
6. **Genetic testing**, usually by gene panels or exome sequencing, which increasingly makes a precise molecular diagnosis possible and opens targeted treatment.

Results must be compared with **age-specific reference ranges**, because lymphocyte counts and immunoglobulin levels change greatly in childhood.

::: quiz
A 30-year-old woman has had six episodes of pneumonia in 3 years and now has early bronchiectasis. She also has autoimmune thrombocytopenia. Her IgG is 2.1 g/L, IgA 0.1 g/L and IgM 0.2 g/L. B cells are present. She takes no medication, her urine contains no protein, and serum electrophoresis shows no paraprotein. She did not respond to a pneumococcal polysaccharide test vaccine. What is the most likely diagnosis?
- [ ] X-linked agammaglobulinaemia
- [x] Common variable immunodeficiency
- [ ] Selective IgA deficiency
- [ ] Chronic granulomatous disease
::: solution
Low IgG with low IgA and IgM, poor vaccine response, present B cells, adult onset, recurrent respiratory infection with bronchiectasis, autoimmunity, and exclusion of secondary causes fit **common variable immunodeficiency**. XLA affects boys and causes absent B cells from infancy; selective IgA deficiency spares IgG; CGD affects neutrophil killing and causes abscesses rather than sinopulmonary infection with low immunoglobulins.
:::
:::

::: history
In 1952 Ogden Bruton, a US army paediatrician, described an 8-year-old boy with recurrent pneumococcal infections whose serum lacked the gamma globulin band on electrophoresis; he treated the boy with injections of gamma globulin, the first immunoglobulin replacement therapy. The defective gene, now named *BTK* after him, was identified in 1993. Swiss physicians described severe combined immunodeficiency in infants in the 1950s, and in 1968 Robert Good's team in Minneapolis carried out the first successful bone marrow transplant, from a sister, for a boy with SCID. In 1990 a girl with ADA-deficient SCID became one of the first people treated with gene therapy.

AIDS was first described in 1981, when the US Centers for Disease Control reported *Pneumocystis* pneumonia in previously healthy young men. The virus was isolated in 1983 by Françoise Barré-Sinoussi and Luc Montagnier, who received the Nobel Prize in 2008. Combination antiretroviral therapy, introduced in 1996, transformed HIV from a fatal disease into a chronic, manageable condition.
:::

## Where this leads

The management of infection in immunocompromised people is covered in [[infectious-diseases/immunocompromised-host]], and HIV in [[infectious-diseases/hiv]]. The transplantation and drug-induced immunosuppression that cause much secondary immunodeficiency are described in [[immunology/transplant-tumour-immunology]], and vaccination of immunocompromised people in [[immunology/vaccines-immunotherapy]].

::: summary
- Suspect immunodeficiency when infections are serious, persistent, unusual or recurrent, or when there is failure to thrive, a live-vaccine infection or a family history.
- The organism, site and age at onset point to the defect: antibody (encapsulated bacteria, sinopulmonary, after 6 months), T cells (opportunists, viruses, fungi, first months), phagocytes (abscesses, *S. aureus*, *Aspergillus*), terminal complement (*Neisseria*), spleen (overwhelming pneumococcal sepsis).
- Maternal IgG protects for the first months; a physiological IgG nadir occurs at about 3 to 6 months.
- XLA (*BTK*) causes absent B cells and immunoglobulins in boys; CVID causes low IgG with low IgA and/or IgM and poor vaccine responses, usually in adults, with frequent autoimmune and granulomatous complications; selective IgA deficiency is common and often asymptomatic.
- SCID causes failure to thrive, diarrhoea, candidiasis and opportunistic infection in infancy; its subtypes (T−B+NK−, T−B−NK+, T−B−NK−) point to the gene. Newborn TREC screening, irradiated blood, no live vaccines and stem cell transplantation are key.
- Secondary immunodeficiency is far more common: drugs, haematological cancer, protein loss, malnutrition, chronic disease, extremes of age, asplenia and HIV. Exclude secondary causes before diagnosing a primary antibody deficiency.
- HIV depletes CD4 T cells through CD4 and CCR5; the CD4 count predicts opportunistic infections; ART for everyone, *Pneumocystis* prophylaxis below 200 cells/µL, and U=U.
:::

## Exercises

::: exercise CD4 count {level=1 check="1.5*0.24*1000"}
A person has a lymphocyte count of $1.5 \times 10^9$/L, of which 24% are CD4 T cells. Calculate the absolute CD4 count in cells/µL.
::: hint
$1 \times 10^9$/L is 1000 cells per µL.
:::
::: solution
$1.5 \times 0.24 = 0.36 \times 10^9$/L, which is $0.36 \times 1000 = 360$ cells/µL.
:::
:::

::: exercise Which arm? {level=1}
For each presentation, name the arm of the immune system most likely to be defective: (a) a 6-week-old with *Pneumocystis* pneumonia and chronic diarrhoea; (b) a 25-year-old with a third episode of meningococcal meningitis; (c) a 3-year-old with *Staphylococcus aureus* liver abscess and *Aspergillus* pneumonia; (d) a 40-year-old with recurrent sinusitis and pneumonia and low IgG.
::: solution
(a) T cells (combined immunodeficiency). (b) Terminal complement (or properdin). (c) Phagocyte killing (chronic granulomatous disease). (d) Antibody (for example CVID, after excluding secondary causes).
:::
:::

::: exercise Maternal IgG {level=1 check="12*0.5^(84/28)"}
A term baby is born with an IgG of 12 g/L, all of maternal origin. Assuming a half-life of 28 days, what would the maternal IgG be at 84 days, in g/L?
::: solution
84 days is $84/28 = 3$ half-lives: $12 \times (1/2)^3 = 12/8 = 1.5$ g/L. By 3 months little maternal IgG remains, which is when infections begin in babies who cannot make their own antibody.
:::
:::

::: exercise After rituximab {level=2}
A 58-year-old woman treated with rituximab for granulomatosis with polyangiitis 18 months ago has had three chest infections in 6 months. Her IgG is 3.8 g/L. Explain the mechanism, what further information is needed, and the principles of management.
::: solution
**Mechanism.** Rituximab binds CD20 on B cells and depletes them. CD20 is absent from long-lived plasma cells, so IgG levels usually fall only slowly, but repeated courses, combination with other immunosuppressants and older age can cause persistent hypogammaglobulinaemia, because the plasma cell pool is not replenished from B cells.

**Further information.** B-cell counts (CD19) to see whether B cells have returned; IgA and IgM; specific antibody levels to vaccine antigens and response to test immunisation; other immunosuppressive drugs; protein loss (urine protein) and serum electrophoresis; and whether she had low IgG before rituximab (pre-existing antibody deficiency).

**Management.** Treat infections promptly, review whether further rituximab is needed, vaccinate (responses may be poor while B cells are depleted), and consider antibiotic prophylaxis. If infections continue with low IgG and poor vaccine responses, immunoglobulin replacement may be indicated, following national criteria. This is a secondary immunodeficiency and may improve as B cells recover.
:::
:::

::: exercise Inheritance of XLA {level=2 check="0.5*0.5"}
A woman is a confirmed carrier of a pathogenic *BTK* variant. Her partner is unaffected. What is the probability that their next child is an affected boy?
::: solution
The probability that a child is male is $1/2$; a son of a carrier mother has a $1/2$ chance of inheriting the X chromosome carrying the variant. So the probability of an affected boy is $1/2 \times 1/2 = 1/4 = 0.25$. Among sons only, the risk is $1/2$; daughters have a $1/2$ chance of being carriers but are not affected.
:::
:::

::: exercise After splenectomy {level=2}
A 35-year-old cyclist has a splenectomy after a road traffic collision. List the immunological reasons for his increased infection risk, and the preventive measures he should be offered.
::: solution
**Reasons.** The spleen filters blood and its macrophages remove bacteria that are poorly opsonised; encapsulated bacteria such as *S. pneumoniae*, *H. influenzae* type b and *N. meningitidis* resist opsonisation and are cleared largely by the spleen. Its marginal-zone B cells produce the rapid IgM response to polysaccharide antigens. The spleen also removes parasitised red cells, so malaria is more severe.

**Prevention.** Vaccination against pneumococcus, Hib and meningococci (ACWY and B), ideally at least 2 weeks before elective splenectomy or 2 weeks after emergency splenectomy, with boosters as recommended; annual influenza vaccination (secondary bacterial infection after influenza is a risk). Consideration of daily antibiotic prophylaxis, particularly in the early years, and a supply of standby antibiotics to take at the first sign of fever. An alert card or bracelet. Education to seek urgent help for fever, to treat dog bites seriously (*Capnocytophaga*) and to take malaria prevention very seriously when travelling. These follow the UKHSA *Green Book* and local guidance.
:::
:::

::: exercise Interpret lymphocyte subsets {level=3}
Three infants under 6 months have suspected SCID. Lymphocyte subsets: (a) T cells absent, B cells present, NK cells absent, a boy; (b) T cells absent, B cells absent, NK cells present, consanguineous parents; (c) T, B and NK cells all absent, with skeletal abnormalities on X-ray. Suggest the most likely genetic defect in each, and explain the reasoning.
::: solution
(a) **Common γ chain (IL2RG) deficiency**, X-linked. The common γ chain is part of the IL-7 receptor, needed for T-cell development, and the IL-15 receptor, needed for NK cells; B cells develop but function poorly without T-cell help (and IL-21 signalling). JAK3 deficiency gives the same phenotype with autosomal recessive inheritance, so a girl with this pattern would point to JAK3.

(b) A **V(D)J recombination defect**: *RAG1*, *RAG2* or *DCLRE1C* (Artemis). T and B cells cannot assemble receptors, so they fail to develop, while NK cells do not need rearrangement and are normal. Autosomal recessive inheritance fits consanguinity. Artemis deficiency also causes radiosensitivity, which affects the choice of transplant conditioning.

(c) **Adenosine deaminase deficiency**. Accumulating deoxyadenosine metabolites are toxic to all developing lymphocytes, so T, B and NK cells are all absent; ADA deficiency is a systemic metabolic disease, which explains the skeletal abnormalities (cupping of the costochondral junctions) and possible neurological and hearing problems. Enzyme replacement can stabilise the child before transplantation or gene therapy.
:::
:::

::: exercise A febrile man without a spleen {level=3}
A 62-year-old man who had a splenectomy for trauma 20 years ago presents with 6 hours of fever, rigors and a non-blanching rash. His blood pressure is 82/50 mmHg and his lactate is 6.1 mmol/L. He was bitten by his dog 2 days ago. He has not had any vaccinations since the splenectomy. Give a differential diagnosis for the causative organism, explain why his disease is so rapid, and list the key immediate actions.
::: solution
**Differential.** Overwhelming post-splenectomy infection, most commonly *Streptococcus pneumoniae*; *Neisseria meningitidis* (non-blanching rash); *H. influenzae* type b; and, given the dog bite, ***Capnocytophaga canimorsus***, a Gram-negative organism from dog saliva that causes fulminant sepsis with purpura and disseminated intravascular coagulation in asplenic people. If he had travelled to a malarial area, malaria would need exclusion.

**Why so rapid.** Without the spleen, bacteria that enter the blood are not cleared efficiently; encapsulated organisms multiply to very high numbers within hours, producing massive endotoxin or cell-wall release, cytokine storm, DIC and shock. Risk persists lifelong, and lack of vaccination has left him unprotected against the commonest pathogens.

**Immediate actions.** Treat as septic shock: resuscitate (ABCDE), blood cultures without delaying treatment, **immediate high-dose intravenous broad-spectrum antibiotics** according to local sepsis guidance for asplenic patients (covering pneumococcus, meningococcus and *Capnocytophaga*), fluids and vasopressors, and early critical-care involvement. Afterwards he needs vaccination, consideration of prophylactic and standby antibiotics, and an alert card.
:::
:::
