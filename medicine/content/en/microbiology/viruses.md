A virus is a set of genes wrapped in protein, and sometimes in a membrane, that can multiply only inside a living cell. Outside a cell a virus particle does nothing: it has no metabolism, makes no energy and builds no proteins. Inside a cell it takes over the host's machinery to copy itself, often thousands of times.

This dependence on the host has two consequences for medicine. First, there are fewer targets for drugs than in bacteria, because most steps of viral replication use human enzymes. The useful antiviral drugs act on the few steps that the virus performs with its own proteins. Second, the way a virus replicates explains its behaviour in patients: how it spreads, whether it can hide for decades, how quickly it evolves, and whether it can cause cancer.

This chapter covers the structure of virus particles, the Baltimore classification, the replication cycle and the drugs that target it, the possible outcomes of infection including latency, viral evolution, the host response, and viruses that cause cancer.

## The virus particle {#virion}

::: definition Virion {#def-virion}
A **virion** is a complete virus particle outside a cell. It contains:

- a **genome** of either DNA or RNA, never both; it may be single- or double-stranded, linear or circular, and in one piece or in several segments;
- a **capsid**, a protein shell built from repeating subunits, which protects the genome; most capsids are **icosahedral** (a roughly spherical shape with 20 faces) or **helical** (a spiral around the nucleic acid);
- in many viruses, an **envelope**: a lipid membrane taken from the host cell as the virus buds out, studded with viral **glycoproteins** that bind receptors on the next cell.
:::

Virions are tiny: from about 20 nm for parvoviruses to about 300 nm for poxviruses. Most can be seen only by electron microscopy.

Whether a virus has an envelope is a useful practical fact. The envelope is a lipid membrane, so it is destroyed by drying, detergents, soap and alcohol. **Enveloped viruses**, such as influenza, measles, herpesviruses, HIV and SARS-CoV-2, generally need close contact, respiratory secretions, blood or sexual contact to spread. **Non-enveloped viruses**, such as norovirus, rotavirus, adenovirus, enteroviruses and human papillomavirus, survive much longer on surfaces, resist stomach acid and bile, and often spread by the faecal–oral route. Norovirus is relatively resistant to alcohol hand rub, so soap and water and chlorine-based cleaning are used in outbreaks.

## Classifying viruses by genome {#baltimore}

Viruses are grouped into families by their structure and genome sequence. A more useful grouping for understanding replication is the one proposed by David Baltimore in 1971. It starts from one fact: every virus must make **messenger RNA** (mRNA) that the host ribosomes can read. The type of genome decides the route to mRNA.

::: definition The Baltimore classification {#def-baltimore}
| Group | Genome | Route to mRNA | Medically important examples |
|---|---|---|---|
| I | double-stranded DNA | host or viral RNA polymerase transcribes DNA | herpesviruses, adenoviruses, papillomaviruses, poxviruses |
| II | single-stranded DNA | converted to double-stranded DNA first | parvovirus B19 |
| III | double-stranded RNA | viral RNA polymerase transcribes one strand | rotavirus |
| IV | positive-sense single-stranded RNA | the genome itself acts as mRNA | enteroviruses, norovirus, hepatitis C virus, flaviviruses, coronaviruses |
| V | negative-sense single-stranded RNA | viral RNA polymerase copies the genome into mRNA | influenza, measles, mumps, respiratory syncytial virus, rabies, Ebola |
| VI | single-stranded RNA with reverse transcriptase | RNA copied into DNA, which integrates into the host genome | HIV, HTLV-1 |
| VII | partly double-stranded DNA with reverse transcriptase | replicates through an RNA intermediate | hepatitis B virus |
:::

Each group has its own requirements. Human cells have no enzyme that copies RNA from an RNA template, so all RNA viruses must encode an **RNA-dependent RNA polymerase**. A positive-sense genome can be translated as soon as it enters the cell, so the polymerase is made from it. A negative-sense genome cannot be read directly, so the virion must carry polymerase molecules into the cell. Retroviruses and hepatitis B virus encode a **reverse transcriptase**, an enzyme that copies RNA into DNA. These viral enzymes have no human equivalent and are the main targets of antiviral drugs.

## The replication cycle {#replication}

::: theorem Steps of viral replication, and why each is a drug target {#thm-cycle}
Every virus completes the same sequence of steps:

1. **attachment** of a viral protein to a receptor on the host cell;
2. **entry**, by fusion of the envelope with a cell membrane or by endocytosis;
3. **uncoating**, the release of the genome from the capsid;
4. **genome expression and replication**, making viral proteins and new genomes;
5. **assembly** of new virions;
6. **release**, by budding through a membrane or by lysis of the cell, sometimes followed by **maturation**.

A step that depends on a viral protein with no human counterpart is a potential target for a selective drug.
:::

::: proof
Selective toxicity requires a difference between virus and host. The steps that use only host machinery, such as translation on host ribosomes, cannot be blocked without harming the cell. Steps that use viral enzymes or viral surface proteins can be.

- **Attachment and entry.** HIV binds CD4 and then a co-receptor, CCR5 or CXCR4. Maraviroc blocks CCR5, and enfuvirtide blocks fusion.
- **Uncoating.** Influenza A needs its M2 ion channel to uncoat. Amantadine blocked it, but almost all current strains are resistant, so it is no longer used for influenza.
- **Genome replication.** This is the richest target. **Nucleoside analogues** such as aciclovir are built into viral DNA by the viral polymerase and stop chain growth. HIV reverse transcriptase is blocked by nucleoside and non-nucleoside inhibitors. Hepatitis C virus polymerase is blocked by sofosbuvir. HIV **integrase**, which inserts viral DNA into the host chromosome, is blocked by integrase inhibitors such as dolutegravir.
- **Assembly and maturation.** HIV and hepatitis C virus make long polyproteins that a viral **protease** cuts into working parts; protease inhibitors stop this.
- **Release.** Influenza **neuraminidase** cleaves sialic acid so that new virions can leave the cell; oseltamivir and zanamivir inhibit it.
:::

Receptors decide **tropism**, the range of cells and tissues a virus infects. Influenza haemagglutinin binds sialic acid on respiratory epithelium. SARS-CoV-2 binds ACE2. Epstein–Barr virus binds CD21 on B cells. HIV infects cells carrying CD4, chiefly helper T cells and macrophages. A change in receptor use can change disease: avian influenza viruses prefer a form of sialic acid found deep in the human lung, which is one reason they spread poorly between people but cause severe pneumonia when they do infect.

In a laboratory culture infected all at once, the number of infectious virions first falls, because the incoming particles uncoat and are no longer infectious. This gap, before new virions appear, is the **eclipse period**. Then the infectious titre rises sharply as the cells release their progeny. The number of new virions released by one cell is the **burst size**, which can be hundreds or thousands.

## Outcomes of infection {#outcomes}

A virus infection can follow several courses, depending on the virus and the host.

- **Acute infection**: the virus replicates, the immune response clears it, and the host is left immune. Examples are influenza, measles, rotavirus and hepatitis A.
- **Chronic (persistent) infection**: the virus keeps replicating for months or years because the immune response fails to clear it. Examples are hepatitis B, hepatitis C and HIV.
- **Latent infection**: the virus persists in a dormant form with little or no production of virions, and can later reactivate.
- **Transformation**: the virus changes the growth control of the cell it infects, sometimes leading to cancer.

::: definition Latency {#def-latency}
**Latency** is a state in which a virus genome persists in a cell without producing infectious virus. Only a few viral genes are expressed, so the infected cell is nearly invisible to the immune system. **Reactivation** to productive infection can occur when immune control weakens or after a trigger such as stress, fever or ultraviolet light.

All human herpesviruses establish latency:

- **herpes simplex virus** types 1 and 2 in sensory ganglia, reactivating as cold sores or genital herpes;
- **varicella-zoster virus** in dorsal root and cranial nerve ganglia, reactivating as shingles;
- **Epstein–Barr virus** in memory B cells;
- **cytomegalovirus** in myeloid cells, reactivating in transplant recipients and people with advanced HIV.
:::

Latency explains why herpesvirus infections are lifelong. Antiviral drugs act on replicating virus, so they shorten reactivations but cannot remove the latent genome. HIV has a similar reservoir: integrated proviral DNA in resting memory T cells persists despite effective treatment, which is why antiretroviral therapy must continue for life.

::: example A painful rash in one dermatome {#ex-shingles}
A 74-year-old woman of South Asian heritage has three days of burning pain over the left side of her chest, followed by a band of red papules and blisters that stops at the midline. She had chickenpox as a child. Explain the virology and the reasoning behind early antiviral treatment.
::: solution
This is **herpes zoster** (shingles). After her childhood chickenpox, varicella-zoster virus travelled up sensory nerves and became latent in the dorsal root ganglion supplying this dermatome. With age, T-cell immunity to the virus declines. The virus reactivated, replicated in the ganglion, causing pain, and travelled down the nerve to the skin, causing the rash in one dermatome. On darker skin the redness may be less obvious, and the blisters and dermatomal pattern are the more reliable signs.

Antivirals such as aciclovir or valaciclovir are typically started within 72 hours of the rash appearing, in line with local guidelines. They inhibit viral DNA replication, which shortens the reactivation and can reduce acute pain. They do not remove the latent virus. Older people are at higher risk of **post-herpetic neuralgia**, pain that persists after the rash heals. The UK offers a shingles vaccine to older adults and to people with weakened immunity; current eligibility is set out in the Green Book.
:::
:::

## Viral evolution {#evolution}

RNA viruses evolve quickly. Their polymerases lack the proofreading of DNA polymerases and make roughly one error for every 10,000 to 100,000 nucleotides copied. With genomes of about 10,000 nucleotides and huge numbers of replications, almost every new genome differs from its parent. An infected person therefore carries a swarm of related variants, sometimes called a **quasispecies**. Variants that resist a drug or escape antibody are selected rapidly.

This is why HIV is always treated with a combination of drugs. A single drug selects resistant mutants within weeks, but a virus would need several simultaneous mutations to escape three drugs at once, which is very unlikely.

::: definition Antigenic drift and shift {#def-drift-shift}
Influenza virus changes its surface antigens, **haemagglutinin** (H) and **neuraminidase** (N), in two ways.

- **Antigenic drift**: gradual accumulation of point mutations in the H and N genes. Antibodies made against last year's virus bind this year's less well. Drift causes seasonal epidemics and is the reason the vaccine is updated every year.
- **Antigenic shift**: replacement of a whole H or N gene by a new one, usually from an animal influenza virus. The influenza genome has eight separate RNA segments, and when two different viruses infect the same cell, their segments can mix (**reassortment**). A virus with a new haemagglutinin meets a population with little immunity and can cause a **pandemic**. Shift occurs only in influenza A, which has animal reservoirs in birds and pigs.
:::

::: example Drift or shift? {#ex-influenza}
Two situations are reported. (a) In a normal winter, the circulating H3N2 strain has several amino acid changes in its haemagglutinin compared with the vaccine strain, and vaccine effectiveness is lower than usual. (b) A new influenza A virus appears in humans whose haemagglutinin gene comes from a bird virus and whose other genes come from human and pig viruses; it spreads rapidly worldwide. Classify each, and explain the public health consequences.
::: solution
(a) is **antigenic drift**. The virus is the same subtype, but point mutations alter the antibody-binding sites of haemagglutinin. Many people have partial immunity, so the result is a seasonal epidemic, and the mismatch with the vaccine strain reduces protection. The response is the annual update of vaccine strains, guided by worldwide surveillance coordinated by WHO.

(b) is **antigenic shift**. Reassortment has given the virus a haemagglutinin to which most people have no antibody. This can cause a pandemic with high attack rates in all age groups. Examples of pandemics associated with new influenza A viruses are those of 1957 (H2N2), 1968 (H3N2) and 2009 (H1N1). The response includes pandemic preparedness plans, rapid development of a matched vaccine, and use of neuraminidase inhibitors according to national guidance.
:::
:::

## The host response {#host-response}

Viruses live inside cells, so the immune system must either block them before they enter or kill the cells that harbour them.

- **Interferons.** Infected cells detect viral nucleic acid and release **type I interferons** (interferon-α and -β). These bind neighbouring cells and induce an **antiviral state**: enzymes that degrade RNA and stop protein synthesis if virus enters. Interferons also cause much of the fever, muscle ache and tiredness of a viral illness.
- **Natural killer cells** kill cells that have lost MHC class I molecules, which many viruses remove from the cell surface to hide from T cells.
- **Cytotoxic T cells** recognise viral peptides on MHC class I and kill infected cells. They are essential for clearing established infection and for controlling latent herpesviruses.
- **Antibodies** neutralise free virions by blocking attachment or entry, and are the main protection provided by most vaccines.

Some disease is caused by this response rather than by the virus. In acute hepatitis B, liver damage is caused largely by T cells killing infected hepatocytes. The details of these mechanisms are covered in [[immunology/innate-immunity]] and [[immunology/adaptive-responses]].

::: example Measuring the response to treatment {#ex-viral-load}
A 34-year-old man with newly diagnosed HIV has a plasma viral load of 100,000 copies/mL. After he starts antiretroviral therapy, the viral load falls with a half-life of about 1.5 days during the first phase of decline. Assuming this half-life holds, estimate the viral load after 15 days, and express the fall as a log reduction.
::: solution
Fifteen days is $15/1.5 = 10$ half-lives. The viral load is

$$
100{,}000 \times 2^{-10} = \frac{100{,}000}{1{,}024} \approx 98 \text{ copies/mL}
$$

The reduction factor is $1{,}024$, so the **log reduction** is $\log_{10} 1{,}024 \approx 3.0$, about a thousandfold fall.

In reality the decline slows after the first phase, because longer-lived infected cells keep releasing virus. Viral load usually becomes undetectable within a few months of starting treatment. The rapid first phase shows that most plasma virus comes from short-lived, actively infected cells, and it gives a measurable early sign that the drugs are working. Viral load is reported on a log scale because it ranges over many orders of magnitude, and a change of less than about 0.5 log is usually treated as within normal variation.
:::
:::

::: widget plot
f: max(5 - 0.30103*x/h, 1.7)
x: 0, 28
y: 0, 5.5
sliders: h=1.5:0.5:7:0.5
labels: \log_{10}\ \text{copies per mL}
caption: A simplified model of a single-phase fall in plasma viral load after starting effective antiviral treatment, from $10^5$ copies/mL. The slider sets the half-life in days. On a log scale exponential decay is a straight line; each half-life lowers the curve by 0.3 log. The floor at 1.7 (50 copies/mL) represents a typical limit of detection. Real HIV decay has a fast first phase followed by a slower second phase.
:::

## Viruses and cancer {#oncogenic}

About one in eight cancers worldwide is attributed to infection. The bacterium *Helicobacter pylori* accounts for many of these, and viruses for most of the rest. Viruses that can cause cancer are called **oncogenic viruses**.

::: definition Oncogenic viruses {#def-oncovirus}
An **oncogenic virus** contributes to cancer by changing the control of cell growth. The main human examples are:

| Virus | Main cancers |
|---|---|
| Human papillomavirus, especially types 16 and 18 | cervical, anal, oropharyngeal, vulval, vaginal and penile cancer |
| Epstein–Barr virus | Burkitt lymphoma, nasopharyngeal carcinoma, some Hodgkin lymphomas, lymphoproliferative disease after transplant |
| Hepatitis B and C viruses | hepatocellular carcinoma |
| Human herpesvirus 8 | Kaposi sarcoma, primary effusion lymphoma |
| HTLV-1 | adult T-cell leukaemia/lymphoma |
| Merkel cell polyomavirus | Merkel cell carcinoma |
:::

The mechanisms differ. High-risk HPV types make two proteins, **E6** and **E7**. E6 promotes the destruction of the tumour suppressor **p53**, and E7 inactivates the retinoblastoma protein **Rb**. Cells lose the checks that stop division after DNA damage, and mutations accumulate. Hepatitis B and C cause cancer largely through decades of inflammation, liver cell death and regeneration, often after cirrhosis has developed, although hepatitis B DNA can also integrate into the host genome.

In every case infection is necessary but not sufficient: most infected people never develop cancer. Other mutations, immune suppression and time are also needed. This is why cancers caused by viruses can be prevented: by vaccination against HPV and hepatitis B, by treating hepatitis B and C, and by screening for precancerous change.

::: example A positive HPV test {#ex-hpv}
A 31-year-old woman attends cervical screening in England. Her sample tests positive for high-risk HPV, and the cytology shows low-grade changes. Explain what these results mean and why screening starts with an HPV test.
::: solution
High-risk HPV is very common in young adults and is cleared by the immune system in most people within one to two years. Persistent infection with a high-risk type is needed for cancer to develop. In persistently infected cells the viral genome may integrate into host DNA, and continued expression of E6 and E7 drives the cell towards cancer over many years.

England uses **primary HPV testing**: the sample is first tested for high-risk HPV, and cytology is done only on HPV-positive samples. A negative HPV test means a very low risk of cervical cancer over the following years, which is why, as of 2026, people aged 25–49 with a negative test are recalled after five years in England. A positive test with abnormal cytology, as here, leads to referral for **colposcopy** to look for precancerous change, following national screening protocols.

HPV vaccination, given in adolescence before exposure, prevents infection with the types it covers and is expected to reduce cervical cancer greatly over the coming decades.
:::
:::

::: warning Prions are not viruses
**Prions** cause transmissible spongiform encephalopathies such as Creutzfeldt–Jakob disease. They are sometimes taught alongside viruses, but they contain no nucleic acid. A prion is a misfolded form of a normal host protein, PrP, which converts the normal protein into the misfolded form. Prions provoke no immune response and are not destroyed by standard sterilisation, so surgical instruments used on high-risk tissue need special handling. Antiviral drugs and the usual laboratory methods for viruses are irrelevant to them.
:::

::: quiz
Why does an influenza virus need to carry an RNA polymerase inside the virion, when poliovirus does not?
- [ ] Influenza replicates in the cytoplasm and poliovirus in the nucleus
- [x] Influenza has a negative-sense genome that cannot be read by ribosomes, while the poliovirus genome can act directly as mRNA
- [ ] Poliovirus uses the host's RNA-dependent RNA polymerase
- [ ] Influenza is a DNA virus
::: solution
Poliovirus has a **positive-sense** RNA genome that ribosomes translate as soon as it enters the cell, producing the viral polymerase. Influenza has a **negative-sense** genome, the complement of mRNA, which cannot be translated. Without a polymerase packed into the virion, no viral mRNA could be made. Human cells have no RNA-dependent RNA polymerase, and influenza, unusually for an RNA virus, replicates in the nucleus.
:::
:::

::: history
In 1892 Dmitri Ivanovsky showed that the cause of tobacco mosaic disease passed through filters that held back bacteria. In 1898 Martinus Beijerinck concluded that it was a new kind of infectious agent that multiplied only in living cells, and in the same year Friedrich Loeffler and Paul Frosch showed that foot-and-mouth disease of cattle was caused by a filterable agent. Walter Reed's commission showed in 1901 that yellow fever was carried by mosquitoes and caused by a filterable agent, the first human disease attributed to a virus.

Viruses were first seen with the electron microscope in the late 1930s. In 1949 John Enders, Thomas Weller and Frederick Robbins grew poliovirus in cultures of human tissue that was not nerve tissue, which made the polio vaccines possible and earned them the 1954 Nobel Prize. In 1970 Howard Temin and David Baltimore independently discovered reverse transcriptase, and in 1971 Baltimore proposed his classification. Harald zur Hausen identified HPV types 16 and 18 in cervical cancer in the early 1980s, work recognised by a Nobel Prize in 2008.
:::

## Where this leads

The immune mechanisms against viruses are in [[immunology/innate-immunity]] and [[immunology/adaptive-responses]], and vaccines in [[immunology/vaccines-immunotherapy]]. Antiviral drugs are discussed with other antimicrobials in [[microbiology/antimicrobials]], and the laboratory tests for viruses, from PCR to serology, in [[microbiology/laboratory-diagnosis]]. The major clinical viral infections are covered in [[infectious-diseases/hiv]], [[respiratory/respiratory-infections]] and [[gastrointestinal/liver-disease]].

::: summary
- A virion is a DNA or RNA genome in a protein capsid, sometimes with a lipid envelope. Enveloped viruses are fragile; non-enveloped viruses survive on surfaces and resist alcohol.
- The Baltimore classification groups viruses by how they make mRNA. RNA viruses need their own RNA-dependent RNA polymerase; retroviruses and hepatitis B need reverse transcriptase.
- Replication runs through attachment, entry, uncoating, genome replication, assembly and release. Drugs act on steps that use viral proteins: entry, polymerase, integrase, protease and neuraminidase.
- Infection may be acute, chronic, latent or transforming. Herpesviruses become latent and reactivate; antivirals cannot remove latent genomes.
- RNA viruses mutate rapidly. Influenza drift causes seasonal epidemics; shift by reassortment can cause pandemics.
- Interferons, NK cells, cytotoxic T cells and neutralising antibodies control viral infection, and the immune response itself causes some of the disease.
- HPV, EBV, hepatitis B and C, HHV-8, HTLV-1 and Merkel cell polyomavirus contribute to cancer; vaccination, treatment and screening prevent much of it.
:::

## Exercises

::: exercise Classify the genome {level=1}
Place each virus in its Baltimore group: (a) influenza A, (b) HIV, (c) hepatitis B virus, (d) norovirus, (e) herpes simplex virus.
::: hint
Ask what the genome is made of, its sense, and whether reverse transcription is involved.
:::
::: solution
(a) Group V, negative-sense single-stranded RNA. (b) Group VI, single-stranded RNA with reverse transcriptase. (c) Group VII, partly double-stranded DNA that replicates through RNA by reverse transcription. (d) Group IV, positive-sense single-stranded RNA. (e) Group I, double-stranded DNA.
:::
:::

::: exercise Log reduction {level=1 check="3.7"}
A patient's hepatitis C viral load falls from 250,000 IU/mL to 50 IU/mL during treatment. What is the log reduction? Give your answer to one decimal place.
::: hint
Log reduction $= \log_{10}(\text{before}/\text{after})$.
:::
::: solution
The ratio is $250{,}000/50 = 5{,}000$, and $\log_{10} 5{,}000 \approx 3.70$. The log reduction is **3.7**.
:::
:::

::: exercise Envelopes and hand hygiene {level=1}
Explain why alcohol hand rub is effective against influenza virus but less reliable against norovirus.
::: hint
What is the envelope made of?
:::
::: solution
Influenza has a lipid **envelope**, which alcohol dissolves; without its envelope glycoproteins the virus cannot attach to or enter cells. Norovirus has no envelope. Its protein capsid is more resistant to alcohol, so during norovirus outbreaks staff wash their hands with soap and water, which removes virus mechanically, and surfaces are cleaned with chlorine-based products.
:::
:::

::: exercise Why aciclovir is selective {level=2}
Aciclovir inhibits herpes simplex virus with little toxicity to uninfected cells, yet it cannot cure the infection. Explain both facts.
::: hint
Which enzyme first phosphorylates aciclovir, and in which state of infection is the viral polymerase active?
:::
::: solution
Aciclovir is a nucleoside analogue. It must be phosphorylated to become active, and the first phosphate is added efficiently only by the **viral thymidine kinase**, so the drug is activated mainly in infected cells. Host enzymes add the remaining phosphates. Aciclovir triphosphate is then preferred by the **viral DNA polymerase**, and once built into viral DNA it stops chain growth.

It cannot cure, because in **latency** the virus is not replicating its DNA in the ganglion neurons. The latent genome is not affected by a drug that acts only on DNA synthesis, so reactivations can occur after treatment stops. Resistance usually arises through mutations in the viral thymidine kinase.
:::
:::

::: exercise Estimate a half-life {level=2 check="1.5"}
After treatment starts, a viral load falls from 80,000 to 5,000 copies/mL in 6 days, following a single exponential decline. What is the half-life in days?
::: hint
How many times has the viral load halved?
:::
::: solution
$80{,}000/5{,}000 = 16 = 2^4$, so four half-lives have passed in 6 days. The half-life is $6/4 = 1.5$ days.
:::
:::

::: exercise Annual vaccines {level=2}
Influenza vaccines are updated every year, but a measles vaccine given in childhood protects for decades. Both are RNA viruses with error-prone polymerases. Explain the difference.
::: hint
Think about how well each virus tolerates changes in its surface proteins, and about reassortment.
:::
::: solution
Both viruses mutate at similar rates. The difference is what the mutations can achieve. Influenza haemagglutinin tolerates many changes in its antibody-binding sites while still working, so variants that escape antibody arise and spread every year: **antigenic drift**. Influenza A can also acquire a completely new haemagglutinin by reassortment.

Measles virus surface proteins are much more constrained. Changes in the sites targeted by neutralising antibodies tend to impair their function, so the virus has remained essentially one serotype. Antibodies induced by vaccination therefore keep neutralising circulating strains, and two doses give long-lasting protection.
:::
:::

::: exercise Cytomegalovirus after transplantation {level=3}
A 52-year-old man receives a kidney from a donor who is seropositive for cytomegalovirus (CMV); he is seronegative. Six weeks after transplantation, during intense immunosuppression, he develops fever, low white cell count and abnormal liver tests. Explain why he is at high risk, how CMV is monitored, and the logic of prevention.
::: hint
Consider latency in the donor organ, the recipient's lack of immunity, and the role of T cells.
:::
::: solution
CMV is a herpesvirus that remains **latent** in cells of the donor kidney. The recipient has no prior immunity, so when the virus reactivates in the transplanted organ it meets no memory T cells or antibody. His immunosuppressive drugs, designed to block T-cell responses to the graft, also block the T cells needed to control CMV. Donor-positive, recipient-negative transplants carry the highest risk of CMV disease.

CMV is monitored by **quantitative PCR** of blood. A rising viral load identifies replication before or as symptoms develop.

Prevention follows one of two strategies set by transplant guidelines: **prophylaxis**, giving an antiviral to all high-risk recipients for a set period after transplantation, or **pre-emptive therapy**, monitoring PCR regularly and starting treatment when the viral load rises above a threshold. His illness should prompt urgent PCR testing and specialist treatment.
:::
:::

::: exercise A new influenza virus in a poultry worker {level=3}
A poultry farm worker develops conjunctivitis and fever after culling birds infected with highly pathogenic avian influenza A(H5N1). PCR confirms H5 infection. Explain why this case matters to public health, even though the worker recovers, and which virological events would turn it into a pandemic threat.
::: hint
Consider receptor binding, reassortment and human-to-human transmission.
:::
::: solution
Human infection with an avian H5 virus shows that the virus can cross the species barrier. Most people have no antibodies to H5 haemagglutinin, so a version that spread efficiently between humans could cause a pandemic.

Two virological changes would raise the threat. **Receptor adaptation**: avian viruses prefer a form of sialic acid found deep in the human lung, not in the upper airway, which limits coughing and sneezing of virus; mutations that switch preference to the upper-airway receptor would aid transmission. **Reassortment**: if the worker or a pig were infected simultaneously with a human seasonal virus, the eight RNA segments could mix, producing a virus with an H5 surface and internal genes adapted to humans.

The public health response follows national guidance: notification, isolation, antiviral treatment, testing and antiviral prophylaxis for contacts, protective equipment for workers, and sequencing of the virus to look for mammalian adaptation. The absence of onward spread from this worker is reassuring, but surveillance continues.
:::
:::
