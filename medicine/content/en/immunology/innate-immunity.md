Every day you inhale, swallow and touch millions of microbes, and almost none of them cause disease. The reason is not antibodies or T cells, which take a week or more to respond to something new. It is the **innate immune system**: defences that are present from birth, that recognise broad classes of microbe rather than individual ones, and that act within minutes to hours.

Innate immunity does three jobs. It holds most infections in check by itself. It buys time while the adaptive response is being organised. And it tells the adaptive system what kind of threat it is dealing with, so that the right type of lymphocyte response follows. When any part of it fails, the clinical pattern is distinctive enough that the missing part can often be named from the history alone.

This chapter covers the barriers, the cells of innate immunity, how those cells recognise microbes, the complement system, and the inflammatory and acute-phase responses that follow. The next chapter, [[immunology/antigen-recognition]], turns to the receptors of the adaptive system.

## Barriers

The first defence is to keep microbes out. Intact skin is a dry, acidic, constantly shedding surface coated with antimicrobial lipids. Mucosal surfaces are thinner and wetter, so they rely on movement and secretions instead: mucus traps particles, cilia sweep them upward in the airways, peristalsis and urine flow wash them along, and gastric acid kills most of what is swallowed.

::: definition Barrier defences {#def-barriers}
**Barrier defences** are the physical, chemical and biological features of epithelial surfaces that prevent microbes from entering tissue. They include:

- **physical barriers**: keratinised skin, tight junctions between epithelial cells, mucus, cilia and the flow of fluids;
- **chemical barriers**: low pH (skin, stomach, vagina), lysozyme in tears and saliva, and **antimicrobial peptides** such as defensins and cathelicidin, which disrupt microbial membranes;
- **biological barriers**: the resident **microbiota**, which occupy space and nutrients that pathogens would otherwise use.
:::

Barrier failures are a common, practical cause of infection, and they are often created by medical care. A burn removes the skin barrier. An intravenous cannula or urinary catheter provides a route straight past it. Smoking and viral infection paralyse cilia. Broad-spectrum antibiotics remove the protective microbiota, which is why *Clostridioides difficile* colitis follows antibiotic use. Proton-pump inhibitors reduce gastric acidity and modestly increase the risk of enteric infection. In each case the immune cells are normal; the problem is that microbes arrive where they would not normally be.

The microbiota are covered in more detail in [[microbiology/microbiota]].

## The cells of innate immunity

Microbes that cross a barrier meet resident cells first, then cells recruited from the blood.

**Macrophages** live in almost every tissue and have local names: Kupffer cells in the liver, alveolar macrophages in the lung, microglia in the brain. They engulf microbes and dead cells, and when they detect a microbe they release cytokines that start inflammation.

**Neutrophils** are the most numerous white cells in blood. They are made in large numbers in the bone marrow, circulate for hours and are recruited to tissue within minutes to hours of an infection. They are short-lived, and dead neutrophils form much of pus. Neutrophils are the main defence against extracellular bacteria and fungi.

**Dendritic cells** sit in tissues and sample their surroundings. When they pick up microbial material together with a danger signal, they migrate through the lymphatics to a lymph node and present antigen to T cells. They are the main link between innate and adaptive immunity.

**Mast cells** sit near blood vessels and nerves in skin and mucosa. They contain granules of histamine and other mediators. They can be triggered directly by complement fragments or by microbial products, and they are the central cell of allergic reactions, covered in [[immunology/hypersensitivity]].

**Eosinophils** and **basophils** are specialised for multicellular parasites and take part in allergic inflammation.

**Natural killer (NK) cells** are lymphocytes without antigen-specific receptors. They kill virus-infected and malignant cells, as described below.

### Getting neutrophils out of the blood

Neutrophils flow quickly through blood vessels, so leaving the circulation takes a sequence of steps known as the **leucocyte adhesion cascade**.

1. **Activation of the endothelium.** Cytokines from tissue macrophages (TNF and IL-1) cause nearby endothelial cells to display adhesion molecules called **selectins**.
2. **Rolling.** Selectins bind sugars on the neutrophil surface (sialyl-Lewis X). The bonds form and break rapidly, so the neutrophil slows and rolls along the vessel wall.
3. **Firm adhesion.** Chemokines on the endothelium, especially CXCL8 (IL-8), switch the neutrophil's **integrins** (such as LFA-1, made of CD11a and CD18) into a high-affinity state. The integrins bind ICAM-1 on endothelium and the cell stops.
4. **Transmigration.** The neutrophil squeezes between endothelial cells into the tissue.
5. **Chemotaxis.** It then moves up gradients of chemoattractants: C5a, leukotriene B4, CXCL8 and bacterial formyl peptides.

Each step has a human disease that proves it matters. In **leucocyte adhesion deficiency type 1**, a recessive defect in CD18 means integrins cannot form. Neutrophils cannot leave the blood, so the blood neutrophil count is very high while tissues are poorly defended. Infants present with delayed separation of the umbilical cord, omphalitis, and skin and gum infections that do not form pus. The diagnosis is made by flow cytometry showing absent CD18. In the rarer type 2, the fucose-containing selectin ligand is missing.

### Phagocytosis and killing

A phagocyte engulfs a particle more readily if the particle is coated with molecules the phagocyte has receptors for. This coating is called **opsonisation**, and the two main opsonins are the complement fragment **C3b** and **IgG antibody**. Encapsulated bacteria such as *Streptococcus pneumoniae*, *Haemophilus influenzae* type b and *Neisseria meningitidis* resist phagocytosis unless they are opsonised, which is why antibody deficiency, complement deficiency and loss of the spleen all predispose to them.

Once inside the phagosome, the microbe is killed by two mechanisms:

- **Oxygen-dependent killing.** The enzyme complex **NADPH oxidase** assembles on the phagosome membrane and transfers electrons to oxygen, making superoxide. This is converted to hydrogen peroxide and, by **myeloperoxidase**, to hypochlorous acid. The sudden oxygen consumption is called the respiratory burst.
- **Oxygen-independent killing.** Granule contents, including defensins, lysozyme, lactoferrin and proteases, are released into the phagosome.

Neutrophils can also expel their DNA and granule proteins as **neutrophil extracellular traps** (NETs), which immobilise microbes but can also damage tissue and promote thrombosis.

**Chronic granulomatous disease** (CGD) is caused by a defect in one of the NADPH oxidase subunits; about two thirds of cases are X-linked (the *CYBB* gene). Neutrophils engulf bacteria normally but cannot kill some of them. People with CGD have recurrent deep infections and abscesses with organisms such as *Staphylococcus aureus*, *Aspergillus*, *Burkholderia cepacia* complex, *Serratia* and *Nocardia*, and they form granulomas because macrophages keep trying to wall off what they cannot kill. The diagnostic test is the **dihydrorhodamine (DHR) flow cytometry test**, which measures the oxidative burst directly.

::: example A boy with a liver abscess {#ex-cgd}
A 6-year-old boy is admitted with fever and right upper quadrant pain. Imaging shows a liver abscess, and drainage grows *Staphylococcus aureus*. He has had two previous admissions: a neck lymph node abscess at age 2 and an *Aspergillus* pneumonia at age 4. His full blood count shows a high neutrophil count. Immunoglobulins are normal. A maternal uncle died in childhood of "pneumonia". What is the most likely diagnosis, how would you confirm it, and what are the principles of management?
::: solution
**Pattern.** Deep abscesses (liver, lymph node) and an invasive fungal infection in a child point to a phagocyte killing defect rather than an antibody problem. Antibody deficiency typically causes recurrent sinus and chest infections with encapsulated bacteria, and his immunoglobulins are normal.

**Why not a neutrophil number or migration problem?** His neutrophil count is high, and abscesses mean neutrophils are reaching the tissue. They arrive but fail to kill.

**Family history.** An affected maternal uncle in a boy fits X-linked inheritance, the commonest form of chronic granulomatous disease.

**Confirmation.** A DHR flow cytometry test shows absent or greatly reduced oxidative burst in stimulated neutrophils. Genetic testing then identifies the subunit (most likely *CYBB*), which allows carrier testing of his mother and counselling for the family.

**Management principles.** Treat the current abscess with drainage and prolonged antimicrobial therapy guided by culture. Long-term antibacterial and antifungal prophylaxis is standard; interferon-gamma is used in some centres. Haematopoietic stem cell transplantation can be curative and is increasingly offered early. Specific choices follow specialist immunology guidance.
:::
:::

## Natural killer cells

NK cells solve a problem that T cells cannot. Many viruses, and many tumours, reduce the expression of **MHC class I** molecules on the cell surface to hide from cytotoxic T cells (see [[immunology/antigen-recognition]]). NK cells carry **inhibitory receptors** (in humans, the killer-cell immunoglobulin-like receptors, KIRs) that recognise self MHC class I. A healthy cell with normal MHC class I switches the NK cell off.

::: theorem The missing-self principle {#thm-missing-self}
An NK cell kills a target when activating signals outweigh inhibitory signals. Loss of self MHC class I removes inhibition (**missing self**), and stress-induced ligands on infected or transformed cells add activation (**induced self**). Either change can tip the balance towards killing.
:::

NK cells kill by releasing **perforin**, which makes pores in the target membrane, and **granzymes**, which enter through the pores and trigger apoptosis. They also carry the Fc receptor CD16, which binds IgG on antibody-coated cells and triggers killing. This is **antibody-dependent cellular cytotoxicity** (ADCC), and it explains part of how therapeutic antibodies such as rituximab work. NK cells are also a major source of **interferon-gamma** early in infection, which activates macrophages.

## Pattern recognition

How does an innate cell tell a bacterium from a human cell without antigen-specific receptors? Charles Janeway's answer, proposed in 1989, was that innate cells carry germline-encoded receptors for molecular structures that are shared by whole classes of microbes and absent from host cells.

::: definition Pattern-recognition receptors {#def-prr}
**Pathogen-associated molecular patterns** (PAMPs) are conserved microbial structures, such as lipopolysaccharide (LPS) of Gram-negative bacteria, bacterial lipoproteins, flagellin, unmethylated CpG DNA and double-stranded RNA. **Damage-associated molecular patterns** (DAMPs) are host molecules released by injured or dying cells, such as ATP, uric acid crystals, HMGB1 and mitochondrial DNA.

**Pattern-recognition receptors** (PRRs) are germline-encoded receptors that bind PAMPs or DAMPs and trigger an innate response. The main families are:

- **Toll-like receptors** (TLRs) on the cell surface and in endosomes;
- **NOD-like receptors** (NLRs) in the cytoplasm, some of which form inflammasomes;
- **RIG-I-like receptors** (RLRs) in the cytoplasm, which detect viral RNA;
- the **cGAS–STING** pathway, which detects DNA in the cytoplasm;
- **C-type lectin receptors**, which bind microbial sugars such as fungal β-glucan (dectin-1).
:::

The location of each receptor matches the location of its ligand. Surface TLRs detect the outside of bacteria and fungi; endosomal TLRs and cytoplasmic sensors detect nucleic acids, which are the main clue to a virus.

| Receptor | Location | Main ligand | Typical organism |
|---|---|---|---|
| TLR4 | Cell surface | Lipopolysaccharide | Gram-negative bacteria |
| TLR2 (with TLR1 or TLR6) | Cell surface | Lipoproteins, lipoteichoic acid | Gram-positive bacteria, mycobacteria |
| TLR5 | Cell surface | Flagellin | Motile bacteria |
| TLR3 | Endosome | Double-stranded RNA | Viruses |
| TLR7 and TLR8 | Endosome | Single-stranded RNA | Viruses |
| TLR9 | Endosome | Unmethylated CpG DNA | Bacteria, DNA viruses |
| RIG-I, MDA5 | Cytoplasm | Viral RNA | RNA viruses |
| cGAS–STING | Cytoplasm | DNA in the cytoplasm | DNA viruses, intracellular bacteria |
| NOD2 | Cytoplasm | Muramyl dipeptide (peptidoglycan) | Bacteria |

### What happens when a PRR is triggered

Most TLRs signal through the adaptor protein **MyD88**, which activates the transcription factor **NF-κB**. NF-κB switches on genes for inflammatory cytokines (TNF, IL-1, IL-6), chemokines and adhesion molecules. The viral sensors (TLR3, TLR7/8/9, RIG-I and cGAS–STING) also activate **interferon regulatory factors**, which switch on **type I interferons** (IFN-α and IFN-β). Type I interferons put neighbouring cells into an antiviral state: they induce proteins that block viral replication and increase MHC class I expression.

Two human examples show that these pathways matter. Children with inherited MyD88 or IRAK-4 deficiency have severe, invasive pyogenic bacterial infections, often with a surprisingly weak fever and CRP. Children with defects in the TLR3 pathway are susceptible to herpes simplex encephalitis while handling most other viruses normally. Each narrow susceptibility reveals what the missing pathway normally does.

### The inflammasome

IL-1β is so potent that its release needs two signals. The first signal, usually a TLR, makes the inactive precursor pro-IL-1β. The second signal assembles an **inflammasome**, a cytoplasmic protein complex. The best-known one is built around **NLRP3**, which responds to a wide range of disturbances: potassium efflux, crystals such as monosodium urate, and damaged mitochondria. The inflammasome activates **caspase-1**, which cuts pro-IL-1β and pro-IL-18 into their active forms and also cleaves gasdermin D, which forms pores in the cell membrane and causes an inflammatory cell death called **pyroptosis**.

This explains why gout is so painful and so inflammatory: urate crystals activate NLRP3 in joint macrophages, and the resulting IL-1β drives neutrophil influx. It also explains a group of rare **autoinflammatory diseases**, in which inflammation occurs without autoantibodies or autoreactive T cells. Gain-of-function variants in *NLRP3* cause the cryopyrin-associated periodic syndromes, with recurrent fever, urticaria-like rash and raised inflammatory markers; they respond strikingly to IL-1 blockade. Familial Mediterranean fever, caused by variants in *MEFV* (encoding pyrin, another inflammasome sensor), produces recurrent attacks of fever and serositis and is treated with colchicine.

:::warning
"Autoimmune" and "autoinflammatory" are not interchangeable. Autoimmune disease is driven by the adaptive immune system recognising self antigen, usually with autoantibodies or autoreactive T cells. Autoinflammatory disease is driven by innate pathways switched on without a specific antigen. A patient with recurrent fevers, raised CRP and negative autoantibodies has not "ruled out" immune disease; they may have an autoinflammatory one.
:::

## Complement

The complement system is a set of more than 30 plasma and membrane proteins, mostly made by the liver. Most circulate as inactive precursors. When activated, they cleave and activate each other in sequence, so a small trigger is amplified into a large response.

::: definition The complement system {#def-complement}
**Complement** is a cascade of plasma proteins that, once activated on a surface, has three main effects:

1. **Opsonisation**: C3b coats the surface and is recognised by complement receptors on phagocytes.
2. **Inflammation**: the small fragments **C3a** and **C5a** (anaphylatoxins) cause mast-cell degranulation and increased vascular permeability; C5a is also a strong neutrophil chemoattractant.
3. **Lysis**: C5b with C6, C7, C8 and C9 forms the **membrane attack complex** (MAC), a pore that kills some bacteria, notably *Neisseria*.

Complement also clears **immune complexes** from the blood, carrying them on red cells to the liver and spleen.
:::

### Three pathways to one central step

Complement can be activated in three ways, all of which converge on the cleavage of **C3**.

- **Classical pathway.** C1q binds antibody (IgM, or IgG clustered on a surface) attached to an antigen. C1 then cleaves C4 and C2 to make the classical C3 convertase, C4b2a. This pathway links complement to adaptive immunity.
- **Lectin pathway.** **Mannose-binding lectin** (MBL) or ficolins bind sugar patterns on microbial surfaces and activate MBL-associated serine proteases, which also cleave C4 and C2.
- **Alternative pathway.** C3 in plasma undergoes slow spontaneous hydrolysis ("tick-over"). The product binds factor B, which factor D cleaves, forming a C3 convertase (C3bBb, stabilised by properdin). On host cells this is switched off quickly; on microbial surfaces it is not, so C3b deposition amplifies.

Each C3 convertase cleaves C3 into C3a and C3b. As more C3b binds, the convertase becomes a **C5 convertase**, which cleaves C5 into C5a and C5b and begins the membrane attack complex.

The alternative pathway also acts as an **amplification loop**: C3b made by any pathway can form more alternative-pathway convertase. This is why most C3b on a microbe ends up being made by the alternative pathway, whichever pathway started the process.

### Regulation: protecting self

Because C3b binds almost any nearby surface, host cells need protection. Regulatory proteins include:

- **C1 inhibitor** (C1-INH), which inactivates C1 and the MBL-associated proteases, and also kallikrein and factor XIIa in the contact (bradykinin) system;
- **factor H** and **factor I**, which inactivate C3b in plasma and on host cells;
- membrane regulators: **decay-accelerating factor** (CD55), which breaks down convertases, and **CD59**, which blocks assembly of the MAC.

Failure of a regulator causes disease just as surely as failure of a component. Loss of CD55 and CD59 from red cells in **paroxysmal nocturnal haemoglobinuria** (PNH) leaves them exposed to complement lysis. Variants in factor H or other alternative-pathway regulators predispose to **atypical haemolytic uraemic syndrome**, in which complement damages the endothelium of the kidney. Both are treated with antibodies that block C5.

::: theorem Complement deficiencies predict their infections {#thm-complement-def}
The clinical pattern of a complement deficiency follows from which function is lost:

- **early classical components** (C1q, C2, C4): poor clearance of immune complexes and apoptotic cells, so a high risk of **systemic lupus erythematosus**, plus infections with encapsulated bacteria;
- **C3**: loss of opsonisation, so severe recurrent **pyogenic infections**, like antibody deficiency;
- **terminal components** (C5 to C9) and **properdin**: loss of the membrane attack complex, so recurrent **neisserial** infection (meningococcal disease, sometimes with unusual serogroups, or disseminated gonococcal infection);
- **C1 inhibitor**: hereditary angioedema, caused by bradykinin rather than by complement itself.
:::

::: proof
Opsonisation by C3b and lysis by the MAC are partly redundant for most bacteria, because antibody and phagocytes can still clear them. *Neisseria* are an exception: their killing depends heavily on the MAC, so losing C5 to C9 exposes a narrow susceptibility. C3 sits at the convergence of all three pathways and is the source of C3b, so losing it removes opsonisation and everything downstream; the result resembles antibody deficiency. The early classical components are needed to tag immune complexes and dying cells with C4b and C3b for clearance; without them, nuclear material lingers and is presented to the adaptive immune system, which is one route to lupus autoantibodies.
:::

The same logic predicts the main risk of **C5 inhibitors** such as eculizumab and ravulizumab: they create a drug-induced terminal complement deficiency, so meningococcal infection is a serious risk. People starting these drugs are vaccinated against meningococci (including serogroup B) and in the UK are usually also given antibiotic prophylaxis, following the product information and local guidance.

### Hereditary angioedema

**Hereditary angioedema** (HAE) is an autosomal dominant deficiency or dysfunction of C1 inhibitor. Without C1-INH, the contact system runs unchecked and generates **bradykinin**, which increases vascular permeability. People with HAE have recurrent swelling of the skin, the gut wall (causing severe abdominal pain) and the upper airway, often triggered by minor trauma, dental work or oestrogens. There is no urticaria and no itch.

Because the swelling is caused by bradykinin rather than histamine, adrenaline, antihistamines and corticosteroids are not effective. Acute attacks are treated with C1-INH concentrate or the bradykinin B2-receptor antagonist icatibant, and long-term prophylaxis options include the anti-kallikrein antibody lanadelumab. The best screening test is the **C4 level**, which is low because C1 continuously consumes C4; C1-INH level and function then confirm the diagnosis. ACE inhibitors cause a similar bradykinin-mediated angioedema, because ACE normally breaks down bradykinin.

::: example Swelling that does not respond to adrenaline {#ex-hae}
A 24-year-old woman attends the emergency department with swelling of her lips and tongue that began 6 hours after a dental extraction. She has no rash or itch. She was given intramuscular adrenaline, chlorphenamine and hydrocortisone by the ambulance crew with no improvement. She has had episodes of severe abdominal pain since adolescence that settled after 2 to 3 days, and her father has had "allergic" swelling of his hands. She takes the combined oral contraceptive pill. What is the likely mechanism, what test would support it, and what are the principles of management?
::: solution
**Mechanism.** Angioedema without urticaria or itch, a dental trigger, no response to adrenaline, antihistamine or steroid, recurrent abdominal pain and an affected parent together point to hereditary angioedema: a C1-inhibitor deficiency causing bradykinin-mediated swelling. Oestrogen-containing contraception is a recognised aggravating factor.

**Tests.** A low C4 supports the diagnosis; C1-INH antigen level and function confirm it (low level in type 1, normal level with low function in type 2). Tryptase would be expected to be normal, because mast cells are not involved.

**Management principles.** Tongue swelling threatens the airway: early senior anaesthetic and ENT involvement and airway monitoring come first. The specific treatment is C1-INH concentrate or icatibant, following local protocol. Afterwards she needs referral to an immunology service, a written plan and access to on-demand treatment, pre-procedure prophylaxis before future dental work, a review of oestrogen-containing contraception, and testing of first-degree relatives.
:::
:::

## Inflammation

Inflammation is the coordinated response of blood vessels and leucocytes to infection or injury. The Roman writer Celsus described four **cardinal signs**: redness (*rubor*), heat (*calor*), swelling (*tumor*) and pain (*dolor*); loss of function (*functio laesa*) was added later and is usually credited to Virchow. Each has an immunological explanation:

- **Redness and heat** come from arteriolar dilatation, caused by histamine, prostaglandins and nitric oxide.
- **Swelling** comes from leakage of plasma proteins and fluid through gaps between endothelial cells in post-capillary venules, caused by histamine, bradykinin, C3a, C5a and leukotrienes.
- **Pain** comes from bradykinin and prostaglandin E2 sensitising nerve endings.
- **Loss of function** follows from pain, swelling and tissue damage.

The cellular events are those described above: endothelial activation, neutrophil recruitment within hours, then monocytes and lymphocytes over the following days. Most acute inflammation resolves actively: neutrophils die by apoptosis, macrophages remove them and switch to producing anti-inflammatory mediators, and the tissue is repaired. The pathology of acute and chronic inflammation is covered in [[pathology/acute-inflammation]].

## Cytokines, fever and the acute-phase response

**Cytokines** are small signalling proteins that act between cells. Three are central to innate immunity:

- **TNF** activates endothelium and neutrophils, and in large amounts causes shock;
- **IL-1** (mainly IL-1β) causes fever and activates endothelium;
- **IL-6** causes fever and drives the liver's acute-phase response.

**Fever** occurs when IL-1, IL-6 and TNF cause the hypothalamus to produce prostaglandin E2, which raises the temperature set point. Antipyretics such as paracetamol and NSAIDs reduce prostaglandin synthesis.

The **acute-phase response** is a change in the proteins the liver makes, driven mainly by IL-6. The liver increases production of C-reactive protein (CRP), serum amyloid A, fibrinogen, ferritin and hepcidin, and reduces albumin and transferrin. Hepcidin traps iron in macrophages and is the main cause of the anaemia of inflammation. Raised fibrinogen increases the erythrocyte sedimentation rate (ESR).

::: definition C-reactive protein {#def-crp}
**C-reactive protein** (CRP) is an acute-phase protein made by hepatocytes in response to IL-6. It binds phosphocholine on bacterial surfaces and on damaged cells and activates the classical complement pathway. In blood it begins to rise within about 6 hours of a stimulus, peaks at around 48 hours, and once the stimulus stops it falls with a half-life of about 19 hours. Its level therefore reflects how much IL-6 was being made over the previous day or two.
:::

The half-life gives CRP a useful property: once an infection is controlled, CRP should fall by about half every day. A CRP that stays high or rises after 48 to 72 hours of appropriate treatment suggests a source that has not been controlled, such as an undrained abscess, or a wrong diagnosis.

::: widget plot
f: c*0.5^(x/19); c*0.5^(x/h)
x: 0, 120
y: 0, 260
sliders: c=240:50:300:10; h=19:10:80:1
labels: \text{falls with half-life 19 h}; \text{falls with half-life } h
hlines: 5
caption: A simplified model of CRP after the source of inflammation is removed. The first curve falls with the normal half-life of about 19 hours. Increase $h$ to see what slower decline looks like: an apparent half-life much longer than 19 hours means IL-6 is still being made, usually because the source has not been controlled. The dotted line marks a typical upper reference limit of 5 mg/L. Illustrative model only; real CRP curves also depend on when production actually stops.
:::

::: example Is the CRP falling fast enough? {#ex-crp}
A 70-year-old man has a perforated appendix with a pelvic collection. His CRP is 240 mg/L on day 1 of antibiotics. Assume CRP production stops completely once treatment controls the source and CRP then falls with a half-life of 19 hours. (a) What would the CRP be 57 hours later? (b) His actual CRP at that time is 190 mg/L. What does this suggest?
::: solution
(a) 57 hours is $57/19 = 3$ half-lives, so the CRP should be

$$
240 \times \left(\tfrac{1}{2}\right)^{3} = 240 \times \tfrac{1}{8} = 30\ \text{mg/L}.
$$

(b) A CRP of 190 mg/L is far above the expected value. Solve for the apparent half-life: $190/240 = 0.5^{57/h}$, so $h = 57 \times \ln 0.5 / \ln(190/240) \approx 169$ hours. The CRP has barely fallen, which means IL-6 is still being produced. The likely explanation is that the collection has not been drained. This should prompt repeat imaging and discussion of drainage, not simply a change of antibiotic. The exact figure is less important than the comparison: the CRP is not behaving as it would if the source were controlled.
:::
:::

:::warning
CRP is not specific for infection. Any process that drives IL-6 production raises it, including surgery, trauma, pancreatitis, active inflammatory arthritis, vasculitis and some cancers. Conversely, CRP can be surprisingly low in early infection (it takes hours to rise), in severe liver disease, and in people taking the IL-6 receptor antibody tocilizumab, which blocks CRP production completely. In systemic lupus erythematosus a high ESR with a normal CRP is common, so a high CRP in a person with lupus should prompt a search for infection.
:::

## From local defence to systemic danger

If innate activation spreads beyond the infected tissue, the same mediators that help locally cause harm everywhere. Widespread vasodilatation and capillary leak cause hypotension; endothelial activation and tissue factor expression drive disseminated intravascular coagulation; and organ perfusion fails. **Sepsis** is now defined as life-threatening organ dysfunction caused by a dysregulated host response to infection (the Sepsis-3 definition of 2016). The definition puts the host response, not the microbe, at the centre. The clinical recognition and management of sepsis are covered in [[infectious-diseases/fever-sepsis]].

## Innate defects in the clinic

Defects of innate immunity are rare, but the infection pattern points to the missing component. The table summarises the patterns in this chapter; the full approach to the patient with recurrent infection is in [[immunology/immunodeficiency]].

| What is missing | Typical infections | Clues | Key test |
|---|---|---|---|
| Neutrophil numbers (neutropenia) | Bacterial sepsis, *Candida*, *Aspergillus* | Mouth ulcers, chemotherapy | Full blood count |
| Neutrophil adhesion (LAD-1) | Skin, gum and umbilical infections | Delayed cord separation, no pus, very high neutrophil count | CD18 by flow cytometry |
| Neutrophil killing (CGD) | *S. aureus*, *Aspergillus*, *Burkholderia*, *Serratia*, *Nocardia* | Deep abscesses, granulomas | DHR test |
| C3 | Pyogenic bacteria | Resembles antibody deficiency | C3 level |
| Terminal complement (C5–C9) | *Neisseria* | Recurrent or familial meningococcal disease | CH50 and AH50 |
| Early classical (C1q, C2, C4) | Encapsulated bacteria | Lupus-like disease | CH50, individual components |
| C1 inhibitor | (none) | Angioedema without urticaria | C4, then C1-INH level and function |

**CH50** and **AH50** are functional screening tests for the classical and alternative pathways respectively. Each measures the ability of a patient's serum to lyse target red cells, so a deficiency of any component in that pathway gives a low or absent result.

::: example Neutropenia and fever {#ex-neutropenic}
A 45-year-old woman receiving chemotherapy for breast cancer has a temperature of 38.4 °C, 10 days after her last cycle. She is alert, heart rate 104 per minute, blood pressure 118/72 mmHg. Her white cell count is $1.2 \times 10^9$/L, of which 30% are neutrophils. Calculate the absolute neutrophil count and explain its significance.
::: solution
The absolute neutrophil count is the total white cell count multiplied by the neutrophil fraction:

$$
1.2 \times 10^9/\text{L} \times 0.30 = 0.36 \times 10^9/\text{L}.
$$

This is below $0.5 \times 10^9$/L, which defines severe neutropenia. A temperature above 38 °C in a person with a neutrophil count of $0.5 \times 10^9$/L or lower meets the NICE definition of **neutropenic sepsis** (NICE CG151). With so few neutrophils, the usual signs of local infection, such as pus, consolidation and even pyuria, may be absent, and bacterial infection can progress to septic shock within hours. Management follows the local neutropenic sepsis pathway: immediate assessment, blood cultures and empirical intravenous broad-spectrum antibiotics within one hour of presentation, without waiting for the count.
:::
:::

::: quiz
A 17-year-old student is admitted with meningococcal meningitis. His older brother had meningococcal septicaemia at the age of 15. Which investigation is most likely to reveal an underlying cause?
- [ ] Serum immunoglobulins
- [ ] Neutrophil oxidative burst (DHR) test
- [x] Complement function (CH50 and AH50)
- [ ] Lymphocyte subsets
::: solution
Recurrent or familial neisserial infection is the classic presentation of a deficiency of the terminal complement components (C5 to C9) or of properdin, because killing of *Neisseria* depends on the membrane attack complex. CH50 tests the classical and terminal pathway, AH50 the alternative pathway and terminal pathway; together they screen for these defects. People with a confirmed deficiency are offered meningococcal vaccination and often antibiotic prophylaxis, and relatives are tested.
:::
:::

::: history
In 1882 the zoologist Élie Metchnikoff pushed rose thorns into transparent starfish larvae and saw mobile cells gather around them. He proposed that such cells, which he called phagocytes, defended the body by engulfing invaders. For two decades his "cellular" school argued with the "humoral" school of Paul Ehrlich and others, who held that the active agents were in serum. Jules Bordet showed in the 1890s that bacterial killing by fresh serum needed a heat-labile factor in addition to antibody; Ehrlich named it complement. Metchnikoff and Ehrlich shared the Nobel Prize in 1908, an early recognition that both views were right.

For most of the twentieth century innate immunity was seen as crude and non-specific. In 1989 Charles Janeway argued that innate cells must have receptors for conserved microbial patterns, and that these receptors decide whether an adaptive response starts at all. The receptors were found within a decade. In 1996 Jules Hoffmann's group, with Bruno Lemaitre, showed that the Toll protein controls antifungal defence in fruit flies; in 1997 Ruslan Medzhitov and Janeway described a human Toll homologue that activates inflammatory genes; and in 1998 Bruce Beutler's group showed that mice resistant to LPS carry mutations in *Tlr4*, identifying TLR4 as the LPS receptor. Beutler and Hoffmann shared the 2011 Nobel Prize with Ralph Steinman, who discovered dendritic cells.
:::

## Where this leads

Innate recognition decides whether, and how, the adaptive system responds. [[immunology/antigen-recognition]] describes the receptors of B and T cells and how dendritic cells present antigen; [[immunology/adaptive-responses]] follows what happens next. Mast cells reappear in [[immunology/hypersensitivity]], and the clinical approach to defects in innate immunity is in [[immunology/immunodeficiency]].

::: summary
- Barriers are the first line of defence, and many infections in hospital follow a barrier breach rather than a failure of immune cells.
- Neutrophils leave the blood by rolling (selectins), firm adhesion (integrins such as CD18) and transmigration, then kill by phagocytosis, the NADPH oxidase burst and granule contents. LAD-1 and chronic granulomatous disease show what happens when adhesion or killing fails.
- NK cells kill cells that have lost MHC class I or display stress ligands, and kill antibody-coated cells by ADCC.
- Pattern-recognition receptors (TLRs, NLRs, RLRs, cGAS–STING, C-type lectins) detect conserved microbial molecules and danger signals, signal through NF-κB and interferon regulatory factors, and produce inflammatory cytokines and type I interferons.
- The NLRP3 inflammasome activates caspase-1 to release IL-1β; its overactivity underlies gout flares and autoinflammatory syndromes, which are distinct from autoimmune disease.
- Complement is activated by the classical, lectin and alternative pathways, converges on C3, and opsonises (C3b), inflames (C3a, C5a) and lyses (C5b–9). Deficiencies predict infections: C3 with pyogenic bacteria, terminal components with *Neisseria*, early classical components with lupus.
- Hereditary angioedema is a C1-inhibitor deficiency causing bradykinin-mediated swelling that does not respond to adrenaline or antihistamines; C4 is the screening test.
- IL-1, IL-6 and TNF cause fever and the acute-phase response. CRP rises within hours, peaks at about 48 hours and falls with a half-life of about 19 hours, so failure to fall suggests an uncontrolled source.
:::

## Exercises

::: exercise Absolute neutrophil count {level=1 check="0.68"}
A man has a white cell count of $3.4 \times 10^9$/L with 20% neutrophils. Calculate his absolute neutrophil count in units of $10^9$/L.
::: hint
Multiply the total white cell count by the neutrophil fraction.
:::
::: solution
$3.4 \times 0.20 = 0.68$, so the absolute neutrophil count is $0.68 \times 10^9$/L. This is moderate neutropenia (between 0.5 and $1.0 \times 10^9$/L).
:::
:::

::: exercise Match receptor and ligand {level=1}
For each of the following microbial molecules, name a pattern-recognition receptor that detects it: (a) lipopolysaccharide; (b) flagellin; (c) double-stranded viral RNA in an endosome; (d) fungal β-glucan; (e) DNA in the cytoplasm.
::: solution
(a) TLR4 (with MD-2 and CD14). (b) TLR5. (c) TLR3. (d) Dectin-1, a C-type lectin receptor. (e) cGAS, which signals through STING. The general rule is that surface receptors detect bacterial and fungal cell-wall components, while endosomal and cytoplasmic receptors detect nucleic acids.
:::
:::

::: exercise Functions of complement {level=1}
Name the complement product responsible for each of the following: (a) opsonisation; (b) neutrophil chemotaxis; (c) lysis of *Neisseria*; (d) the screening test result most likely to be low in hereditary angioedema.
::: solution
(a) C3b. (b) C5a. (c) The membrane attack complex, C5b–9. (d) C4, which is consumed continuously by uncontrolled C1 activity when C1 inhibitor is deficient.
:::
:::

::: exercise CRP half-life {level=2 check="30"}
A woman with pyelonephritis has a CRP of 120 mg/L when an obstructing ureteric stone is relieved. Assuming CRP production then stops and CRP falls with a half-life of 19 hours, what would her CRP be after 38 hours, in mg/L?
::: hint
How many half-lives is 38 hours?
:::
::: solution
38 hours is $38/19 = 2$ half-lives, so the CRP should be $120 \times (1/2)^2 = 120/4 = 30$ mg/L. A value close to this supports adequate source control; a value much higher should prompt a search for a persisting source.
:::
:::

::: exercise Why no pus? {level=2}
An infant has a CD18 deficiency. Explain, step by step, why the blood neutrophil count is very high but skin infections do not form pus.
::: solution
CD18 is the shared β2 chain of the leucocyte integrins, including LFA-1 and Mac-1. Without it, neutrophils can still roll on selectins but cannot switch to firm adhesion on ICAM-1, so they cannot stop and cross the endothelium. Neutrophils therefore stay in the blood, raising the count, especially during infection when the marrow releases more. Pus is mostly dead neutrophils in tissue; if neutrophils cannot reach the tissue, infections become necrotic and spread without forming pus. Mac-1 (CD11b/CD18) is also a complement receptor, so phagocytosis of C3b-coated microbes is impaired as well.
:::
:::

::: exercise Before starting a C5 inhibitor {level=2}
A 32-year-old woman with paroxysmal nocturnal haemoglobinuria is to start eculizumab. Explain why her red cells are destroyed in this disease, how the drug helps, and which infection risk it creates and why.
::: solution
In PNH an acquired *PIGA* mutation in a haematopoietic stem cell prevents synthesis of the GPI anchor, so the red cells derived from it lack the GPI-anchored complement regulators CD55 and CD59. Complement then deposits on the red cells and the membrane attack complex lyses them, causing intravascular haemolysis, haemoglobinuria and thrombosis. Eculizumab binds C5 and prevents its cleavage, so the MAC cannot form and intravascular haemolysis stops. Blocking C5 reproduces a terminal complement deficiency, and killing of *Neisseria meningitidis* depends on the MAC. She therefore has a greatly increased risk of meningococcal disease and is vaccinated against meningococcal serogroups ACWY and B before treatment, with antibiotic prophylaxis according to local guidance, and is taught to seek urgent help for fever.
:::
:::

::: exercise A febrile child with a normal CRP {level=3}
A 14-month-old girl presents with high fever, lethargy and pneumococcal bacteraemia. Her CRP is only 18 mg/L despite 24 hours of illness. She had *Staphylococcus aureus* cellulitis at 6 months. Immunoglobulins, complement and neutrophil count are normal. Suggest an explanation that links the infections and the low CRP, and how it could be investigated.
::: hint
Think about which signalling pathway is needed to make IL-6 in response to bacteria.
:::
::: solution
A defect in TLR signalling through MyD88 or IRAK-4 would explain both features. These adaptors are needed for most TLRs (and the IL-1 receptor) to activate NF-κB, so the child's innate cells produce little IL-6, IL-1 or TNF in response to bacteria. Low IL-6 means little CRP and often little fever, and poor early inflammation allows invasive infection with pyogenic bacteria, especially *S. pneumoniae* and *S. aureus*. Such children typically have normal immunoglobulin levels, complement and neutrophil counts, so routine screening is normal. Investigation is by specialist assays of cytokine production after stimulation of blood cells with TLR ligands, followed by genetic testing. Recognising the pattern matters because a normal CRP in such a child does not exclude serious bacterial infection; these defects are rare, and the CRP is far more often low because sampling was too early. Infection risk in these conditions tends to decrease with age.
:::
:::

::: exercise The differential of recurrent infection by component {level=3}
Three children are referred for recurrent infection. (a) A 4-year-old with recurrent pneumococcal pneumonia and otitis media, normal immunoglobulins, low CH50 and low AH50. (b) A 16-year-old with a second episode of meningococcal disease, normal CH50 but absent AH50. (c) A 9-year-old with recurrent *S. aureus* skin abscesses and a *Serratia* osteomyelitis, normal complement and immunoglobulins. For each, name the most likely defect and the confirmatory test.
::: solution
(a) Both CH50 and AH50 are low, so the defect lies in a component shared by both pathways: C3 or a terminal component. Pyogenic pneumococcal infections rather than neisserial infections point to **C3 deficiency** (or consumption, for example by factor H or factor I deficiency, which cause secondary C3 depletion). Confirm with C3 level, factor H and factor I levels.

(b) A normal CH50 with absent AH50 indicates a defect confined to the alternative pathway, and recurrent meningococcal disease points to **properdin deficiency** (X-linked) or factor D deficiency. Confirm with properdin and factor D measurement.

(c) Catalase-positive organisms causing abscesses and osteomyelitis with normal complement and immunoglobulins point to **chronic granulomatous disease**. Confirm with a DHR flow cytometry test and genetic testing.
:::
:::
