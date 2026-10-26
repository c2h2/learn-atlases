Most bacteria that meet the human body do no harm. They are washed away, killed by innate defences, or settle as harmless members of the normal flora. A **pathogen** is an organism that can cause disease, and to do so it must solve a series of problems: reach a host, attach to a surface, multiply, avoid or resist the immune response, and damage tissue. Each solution is a **virulence factor**, and each virulence factor is a clue to the clinical picture.

Thinking in steps also explains treatment. Some diseases are caused by bacteria growing in tissue, and killing the bacteria cures them. Others are caused by a toxin that has already done its work, and antibiotics then help little. Some infections persist on implanted devices because the bacteria live in a biofilm that drugs cannot clear.

This chapter covers pathogenicity and virulence, the evidence that links a microbe to a disease, adhesion and invasion, immune evasion, bacterial toxins, biofilms, and the host factors that decide who becomes ill.

## Pathogenicity, virulence and dose {#virulence}

::: definition Pathogenicity and virulence {#def-virulence}
**Pathogenicity** is the ability of an organism to cause disease. It is a yes-or-no property of a species or strain.

**Virulence** is the degree of pathogenicity: how readily and how severely an organism causes disease. It is measured, for example, by the **infectious dose 50** (ID50), the dose that infects half of exposed hosts, or the **lethal dose 50** (LD50), the dose that kills half.

A **primary pathogen** causes disease in healthy people. An **opportunistic pathogen** causes disease mainly when host defences are impaired, for example by neutropenia, a central line or a burn.
:::

Infectious doses vary enormously. *Shigella* and Shiga toxin-producing *Escherichia coli* can cause disease after ingestion of perhaps 10–100 organisms, which is why they spread easily between children in nurseries. *Vibrio cholerae* needs a much larger dose in a person with normal stomach acid, because acid kills most ingested vibrios. People taking proton pump inhibitors, or with reduced stomach acid for other reasons, are infected by lower doses of several gut pathogens.

A simple model makes these numbers easier to use. Suppose each organism in a dose independently has a small probability $r$ of starting an infection. Then the probability that a dose $D$ infects the host is

$$
P(D) = 1 - e^{-rD}
$$ {#eq-dose}

Setting $P = 0.5$ gives $\text{ID}_{50} = \ln 2 / r$, so the same model can be written $P(D) = 1 - 2^{-D/\text{ID}_{50}}$. Every additional ID50 of exposure halves the chance of escaping infection.

::: widget plot
f: 1 - 2^(-x/m)
x: 0, 1000
y: 0, 1.05
sliders: m=100:10:1000:10
labels: \text{probability of infection}
caption: The exponential dose–response model $P = 1 - 2^{-D/\text{ID}_{50}}$, with dose $D$ (number of organisms) on the horizontal axis. The slider sets the ID50. A low ID50, as for *Shigella*, makes even small exposures dangerous; a high ID50 gives a gentle curve. Real dose–response curves also depend on the host, the vehicle (food, water, hands) and the strain; this is a simplified model.
:::

::: example How likely is infection after an exposure? {#ex-dose}
In a simplified model, a gut pathogen has an ID50 of 100 organisms. A child swallows about 300 organisms from a contaminated toy. Using the exponential dose–response model, what is the probability of infection? What would it be after a dose of 10 organisms?
::: solution
Use $P(D) = 1 - 2^{-D/\text{ID}_{50}}$.

For $D = 300$: $D/\text{ID}_{50} = 3$, so

$$
P = 1 - 2^{-3} = 1 - \tfrac{1}{8} = 0.875
$$

For $D = 10$: $P = 1 - 2^{-0.1} \approx 0.067$, about 7%.

Even a dose one-tenth of the ID50 carries a real risk. This is why hand washing and exclusion of children with diarrhoea from nursery until they have been symptom-free for 48 hours are standard UK public health advice: they lower the dose, not just the number of exposures.
:::
:::

## Linking a microbe to a disease {#causation}

Finding an organism in a sick person does not prove that it caused the illness. It may be a harmless coloniser or a contaminant. Medical microbiology has formal criteria for causation.

::: theorem Koch's postulates and their molecular version {#thm-koch}
**Koch's postulates** state that an organism causes a disease if:

1. it is found in every case of the disease;
2. it can be isolated and grown in pure culture;
3. the pure culture causes the disease when introduced into a susceptible host;
4. the same organism can be recovered from that host.

**Molecular Koch's postulates**, proposed by Stanley Falkow in 1988, apply the same logic to a virulence gene:

1. the gene is found in pathogenic strains and is usually absent from non-pathogenic ones;
2. inactivating the gene reduces virulence;
3. restoring the gene restores virulence.
:::

::: proof
The classical postulates fail in several common situations, and knowing the failures is as useful as knowing the rules.

- **Carriers.** Healthy people carry *Neisseria meningitidis*, *Streptococcus pneumoniae* and *Staphylococcus aureus*, so the organism is present without disease.
- **Organisms that cannot be cultured.** *Mycobacterium leprae* and *Treponema pallidum* cannot be grown on laboratory media.
- **No animal model.** Some human pathogens cause no comparable disease in animals, and deliberate infection of people is usually unethical.
- **Polymicrobial disease.** Abscesses and periodontal disease involve several organisms acting together.

The molecular version avoids some of these problems because it tests a specific gene rather than a whole organism. Modern evidence also comes from DNA detection in tissue, the immune response, epidemiology and the effect of treatment or vaccination. The disappearance of disease after a vaccine targeting one organism is strong evidence that the organism caused it.
:::

## Adhesion and colonisation {#adhesion}

The body's surfaces are protected by flow: saliva, urine, mucus moved by cilia, and peristalsis. A bacterium that cannot hold on is washed away.

::: definition Adhesion {#def-adhesion}
**Adhesion** is the specific binding of a bacterium to a host surface. It is mediated by **adhesins**, which are bacterial molecules that bind receptors on host cells or on the extracellular matrix. Many adhesins sit at the tips of **pili** (fimbriae); others are proteins anchored in the cell wall.

Because each adhesin binds a particular receptor, adhesion helps explain **tropism**: why an organism infects one tissue and not another.
:::

Examples show how specific this can be.

- **Uropathogenic *E. coli*.** Type 1 fimbriae bind mannose-containing receptors in the bladder, causing cystitis. **P fimbriae** bind glycolipid receptors in the kidney and are associated with pyelonephritis.
- ***Neisseria gonorrhoeae*** uses type IV pili to attach to urethral and cervical epithelium. It can switch pilin genes, changing the pilus antigen.
- ***Streptococcus pyogenes*** binds fibronectin on pharyngeal cells through surface proteins.
- ***S. aureus*** has surface proteins that bind fibrinogen and fibronectin. Implanted devices quickly become coated with these host proteins, which gives staphylococci something to grip.
- ***Vibrio cholerae*** attaches to the small-bowel mucosa by a pilus, which keeps it close to the cells its toxin acts on.

Adhesion is a target for prevention. Antibodies against adhesins, made after infection or vaccination, can block colonisation. Some vaccines, including the acellular pertussis vaccine, contain adhesins as antigens.

## Invasion and immune evasion {#invasion}

Some pathogens stay on the surface and act by toxins. Others enter tissue or live inside cells, where they are protected from antibodies and many antibiotics.

::: definition Invasion and immune evasion {#def-invasion}
**Invasion** is the entry of bacteria into host cells or tissues. Bacteria invade by:

- **inducing their own uptake**: *Salmonella* and *Shigella* inject proteins into gut epithelial cells through a needle-like **type III secretion system**, which makes the cell engulf them;
- **binding entry receptors**: *Listeria monocytogenes* uses a surface protein called internalin to bind E-cadherin;
- **breaking down tissue**: enzymes such as hyaluronidase and streptokinase help *S. pyogenes* spread through tissue planes.

**Immune evasion** includes any mechanism that lets a bacterium survive the host response:

- a **capsule**, which hides the surface from complement and antibodies and blocks phagocytosis;
- **protein A** of *S. aureus*, which binds the Fc part of IgG in the wrong orientation;
- **IgA proteases** of *Neisseria*, *Haemophilus influenzae* and *S. pneumoniae*, which cut mucosal IgA;
- **antigenic variation**, which changes surface antigens faster than antibody can follow;
- **leukocidins**, toxins that kill white cells;
- **intracellular survival**: *Mycobacterium tuberculosis* prevents the phagosome from fusing with lysosomes, and *Listeria* escapes from the phagosome into the cytoplasm.
:::

Intracellular bacteria change the immune response that controls them. Antibody cannot reach them, so control depends on **T cells** and activated macrophages. This is why people with HIV infection, people taking corticosteroids or TNF inhibitors, and transplant recipients are at risk from *M. tuberculosis*, *Listeria* and *Salmonella*. It also explains granulomas, which are organised collections of macrophages and T cells that wall off organisms they cannot kill.

*Listeria* and *Shigella* go one step further. Inside the cell they polymerise host actin into a tail that pushes them into the neighbouring cell. They spread from cell to cell without ever being exposed to the extracellular space.

## Toxins {#toxins}

::: definition Exotoxins and endotoxin {#def-toxins}
An **exotoxin** is a protein made and released by a bacterium that damages host cells. Exotoxins are made by Gram-positive and Gram-negative bacteria, are often highly potent and specific, and are usually inactivated by heat. Many can be converted into harmless **toxoids** that still induce antibodies, which is the basis of tetanus and diphtheria vaccines.

**Endotoxin** is the lipid A part of lipopolysaccharide in the outer membrane of Gram-negative bacteria. It is not secreted as such but released when bacteria grow or die. It is heat-stable, acts by triggering the host's inflammatory response rather than by damaging cells directly, and cannot be made into a toxoid.
:::

Many exotoxins share an **A–B structure**. The **B** (binding) part attaches to a receptor on the target cell and brings the toxin inside. The **A** (active) part is an enzyme that alters a cell component. Because the A part is an enzyme, a few molecules can affect a whole cell.

| Toxin | Organism | Action | Result |
|---|---|---|---|
| Cholera toxin | *V. cholerae* | ADP-ribosylates the G protein Gs, so adenylate cyclase stays switched on | High cAMP; chloride and water secretion; profuse watery diarrhoea |
| Heat-labile toxin | Enterotoxigenic *E. coli* | Similar to cholera toxin | Travellers' diarrhoea |
| Diphtheria toxin | *Corynebacterium diphtheriae* | ADP-ribosylates elongation factor 2 | Protein synthesis stops; pharyngeal membrane, myocarditis, neuropathy |
| Shiga toxin | *Shigella dysenteriae* type 1, Shiga toxin-producing *E. coli* | Cleaves ribosomal RNA | Protein synthesis stops; bloody diarrhoea, haemolytic uraemic syndrome |
| Pertussis toxin | *Bordetella pertussis* | ADP-ribosylates the inhibitory G protein Gi | Raised cAMP; lymphocytosis, impaired immune cell function |
| Tetanus toxin | *Clostridium tetani* | Travels to the spinal cord and cleaves a SNARE protein in inhibitory neurons | Loss of inhibition; spasms and rigidity |
| Botulinum toxin | *C. botulinum* | Cleaves SNARE proteins at cholinergic nerve terminals | Acetylcholine not released; flaccid paralysis |

Other exotoxins damage membranes directly. Examples are the α-toxin of *C. perfringens*, a phospholipase that destroys muscle in gas gangrene, and pore-forming toxins such as streptolysin O and Panton–Valentine leukocidin.

::: theorem Superantigens bypass antigen specificity {#thm-superantigen}
A **superantigen** is a toxin that binds the outside of MHC class II molecules on antigen-presenting cells and the variable β region of the T-cell receptor, without being processed or presented in the peptide groove. It therefore activates every T cell that carries a matching β region, which can be a large fraction of all T cells rather than the tiny fraction that responds to a normal antigen.
:::

::: proof
A normal antigen is cut into peptides, and only T cells whose receptors fit one peptide–MHC combination respond. That fraction is very small.

A superantigen clamps MHC class II and the T-cell receptor together from the side. Any T cell whose receptor has a compatible β region is activated, regardless of what the rest of its receptor recognises. Massive, simultaneous T-cell activation releases large amounts of cytokines such as IL-2, TNF and interferon-γ.

The cytokine flood causes fever, a diffuse red rash, capillary leak, hypotension and failure of several organs: **toxic shock syndrome**. Examples are toxic shock syndrome toxin 1 (TSST-1) and the enterotoxins of *S. aureus*, and the pyrogenic exotoxins of *S. pyogenes*.
:::

### Endotoxin and septic shock {#endotoxin}

Endotoxin works through the innate immune system. Lipid A in the blood binds **LPS-binding protein**, which hands it to **CD14** and then to the receptor **TLR4** with its partner MD-2 on macrophages and endothelial cells. Signalling through TLR4 switches on the transcription factor NF-κB and the release of TNF, IL-1 and IL-6.

In small amounts this response is useful: it causes fever and recruits neutrophils. In large amounts it causes vasodilatation, leaky capillaries, activation of coagulation with disseminated intravascular coagulation, and shock. The features of meningococcal septicaemia, with purpura and rapid circulatory collapse, show endotoxin at its most dramatic. Gram-positive bacteria trigger similar responses through other components, such as lipoteichoic acid and peptidoglycan fragments, which is why septic shock is not confined to Gram-negative infection.

::: warning Antibiotics do not neutralise a toxin already made
When disease is caused by a preformed toxin, killing the bacteria does not reverse the damage. In botulism and tetanus, **antitoxin** neutralises toxin that has not yet bound to nerves, and recovery from bound toxin takes weeks. In staphylococcal food poisoning the toxin is already in the food, and antibiotics have no role.

The opposite mistake also happens. In infections caused by Shiga toxin-producing *E. coli*, some antibiotics may increase toxin release from dying bacteria, and UK guidance advises against routine antibiotics because of the concern about haemolytic uraemic syndrome. Always ask whether a disease is caused by growing bacteria, by a toxin, or by both.
:::

::: example Watery diarrhoea after travel {#ex-cholera-vs-etec}
A 28-year-old aid worker returns from a cholera outbreak area with sudden, painless, profuse watery diarrhoea. She has no fever and there is no blood in the stool. Her pulse is 120 per minute and she feels faint when standing. Explain the mechanism and why oral rehydration solution works.
::: solution
The picture fits **cholera**, or the milder similar illness caused by enterotoxigenic *E. coli*. Both organisms stay on the surface of the small bowel and do not invade, so there is no fever, inflammation or blood.

Cholera toxin binds intestinal cells through its B subunits. The A subunit permanently activates adenylate cyclase. The rise in cAMP opens the CFTR chloride channel, so chloride, then sodium and water, pour into the gut lumen. Several litres a day can be lost, and death results from dehydration and electrolyte loss, not from tissue damage.

Oral rehydration solution works because the toxin leaves the **sodium–glucose co-transporter** (SGLT1) untouched. Glucose and sodium absorbed together pull water back into the body. Rehydration, by mouth or intravenously when severe, is the main treatment. Antibiotics shorten the illness and reduce shedding, but they are secondary to fluids.
:::
:::

::: example Fever, rash and shock in a young woman {#ex-toxic-shock}
A 24-year-old woman develops high fever, vomiting, diarrhoea and a diffuse red rash like sunburn. Her blood pressure is 82/45 mmHg and her creatinine is raised. She has been using tampons during her period. Blood cultures later grow nothing. Explain the pathogenesis and the principles of management.
::: solution
This is likely **staphylococcal toxic shock syndrome**. *S. aureus* colonising the vagina grows in the conditions created by the tampon and produces **TSST-1**, a superantigen. The toxin is absorbed and causes massive T-cell activation and cytokine release, which explains the rash, shock and organ failure. Blood cultures are usually negative in staphylococcal toxic shock, because the toxin, not bacteraemia, causes the illness. The skin of the palms and soles typically peels one to two weeks later.

Management principles are removal of the source (the tampon), resuscitation and organ support, and antibiotics that cover *S. aureus*. Guidelines commonly add a protein synthesis inhibitor such as clindamycin, because it reduces toxin production by the bacteria. Intravenous immunoglobulin, which contains antibodies against superantigens, is sometimes used in severe cases, particularly streptococcal toxic shock, following specialist advice and local guidelines.
:::
:::

## Biofilms and persistence {#biofilm}

::: definition Biofilm {#def-biofilm}
A **biofilm** is a community of bacteria attached to a surface and enclosed in a matrix they produce, made of polysaccharide, protein and DNA. Bacteria in biofilms grow slowly, are shielded from phagocytes and antibodies, and are much more tolerant of antibiotics than the same bacteria growing freely.
:::

Biofilms form on dead bone, heart valves, teeth, and above all on implanted material: central lines, urinary catheters, prosthetic joints, heart valves and pacemakers. Coagulase-negative staphylococci, *S. aureus* and *Pseudomonas aeruginosa* are typical biofilm organisms. In cystic fibrosis, *P. aeruginosa* forms biofilms in thick airway mucus and becomes almost impossible to eradicate once established.

Several features explain antibiotic tolerance. The matrix slows the penetration of some drugs. Many cells in a biofilm divide slowly or not at all, and most antibiotics act on growing cells. A small fraction of dormant **persister** cells survive treatment and regrow afterwards. Laboratory susceptibility tests are done on freely growing bacteria, so an organism can be reported as susceptible and still survive in a biofilm.

Bacteria in biofilms also coordinate their behaviour by **quorum sensing**. Each cell releases small signal molecules; when the population is dense, the signal concentration crosses a threshold and switches on genes for toxins, matrix production or dispersal. In *S. aureus* the **agr** system regulates toxin production in this way.

::: example Pain in a prosthetic hip {#ex-biofilm-joint}
A 71-year-old man had a hip replacement 18 months ago. For six months the hip has been increasingly painful, with no fever. X-rays show loosening of the prosthesis. Aspiration of the joint grows *Staphylococcus epidermidis* resistant to several antibiotics. Explain why this is a biofilm infection and why antibiotics alone are unlikely to cure it.
::: solution
A late, low-grade infection of a prosthetic joint by a coagulase-negative staphylococcus is a classic biofilm infection. *S. epidermidis* from the skin contaminated the implant, probably at the time of surgery, and formed a biofilm on its surface. The slow course, lack of fever and loosening reflect chronic low-grade inflammation rather than an acute invasive infection.

Because *S. epidermidis* also lives on skin, a single positive culture could be a contaminant. Diagnosis therefore relies on several samples: guidelines recommend multiple tissue samples at surgery, and growth of the same organism from two or more makes infection likely.

Antibiotics can suppress the infection but rarely clear it, because the biofilm shelters slow-growing and persister cells. Cure usually needs surgery to remove the biofilm, often by exchanging the prosthesis in one or two stages, followed by a prolonged course of antibiotics chosen with specialist advice.
:::
:::

## Host factors {#host}

Whether exposure leads to disease depends as much on the host as on the organism. Specific defects in defence predict specific infections, which is useful in both directions: a known defect tells you what to fear, and an unusual infection suggests a hidden defect.

- **Asplenia.** The spleen clears bacteria coated with antibody and complement and makes antibodies to capsular polysaccharides. People without a functioning spleen, including those with sickle cell disease, risk overwhelming infection by encapsulated bacteria: *S. pneumoniae*, *Haemophilus influenzae* type b and *N. meningitidis*.
- **Terminal complement deficiency** (C5–C9) prevents formation of the membrane attack complex. It predisposes to recurrent *Neisseria* infection. Drugs that block C5, such as eculizumab, carry the same risk, so patients are vaccinated before treatment and often take antibiotic prophylaxis.
- **Neutropenia** predisposes to Gram-negative bacteraemia, *S. aureus* and invasive fungal infection.
- **T-cell defects** predispose to intracellular bacteria, mycobacteria, fungi and viruses.
- **Broken barriers** let organisms in: burns (*P. aeruginosa*), intravenous lines (staphylococci), urinary catheters (gut organisms) and surgical wounds.

::: quiz
Which mechanism explains the massive cytokine release in toxic shock syndrome?
- [ ] Lipid A binding Toll-like receptor 4 on macrophages
- [x] A toxin linking MHC class II to T-cell receptors outside the peptide groove
- [ ] A toxin that ADP-ribosylates elongation factor 2
- [ ] Antibody binding to a capsule and activating complement
::: solution
Toxic shock toxins are **superantigens**. They bind MHC class II and the T-cell receptor β region outside the normal antigen-binding site, so a large fraction of T cells is activated at once. Lipid A signalling through TLR4 is the endotoxin mechanism of Gram-negative septic shock. ADP-ribosylation of elongation factor 2 is the action of diphtheria toxin.
:::
:::

::: history
In 1884 Friedrich Loeffler grew the diphtheria bacillus and noticed that it stayed in the throat while damage appeared in the heart and nerves. He suspected a circulating poison. In 1888 Émile Roux and Alexandre Yersin showed that sterile filtrates of diphtheria cultures reproduced the disease in animals, proving that a bacterial toxin could cause illness on its own. In 1890 Emil von Behring and Kitasato Shibasaburō showed that serum from immunised animals neutralised diphtheria and tetanus toxins, which led to antitoxin treatment and earned von Behring the first Nobel Prize in Physiology or Medicine in 1901.

Robert Koch's criteria for causation were set out in his work on tuberculosis in the 1880s and are now known as Koch's postulates. A century later, in 1988, Stanley Falkow proposed molecular Koch's postulates for virulence genes, as molecular genetics made it possible to switch individual bacterial genes on and off.
:::

## Where this leads

The structures that underlie virulence are introduced in [[microbiology/bacteria]], and the innate and adaptive responses that pathogens evade are covered in [[immunology/innate-immunity]] and [[immunology/adaptive-responses]]. Sepsis as a clinical syndrome is the subject of [[infectious-diseases/fever-sepsis]], and device-related infection is covered in [[infectious-diseases/healthcare-infections]]. How biofilms and toxins affect the choice of antibiotic is explained in [[microbiology/antimicrobials]].

::: summary
- Pathogenicity is the ability to cause disease; virulence is its degree, measured by the ID50 or LD50. In the exponential model $P = 1 - 2^{-D/\text{ID}_{50}}$.
- Koch's postulates link organism to disease but fail for carriers, unculturable organisms and polymicrobial infection; molecular Koch's postulates test individual virulence genes.
- Adhesins on pili and surface proteins bind specific receptors and explain tissue tropism.
- Invasive bacteria induce their own uptake or bind entry receptors; capsules, protein A, IgA proteases, antigenic variation and intracellular survival evade immunity.
- Exotoxins are proteins, often A–B enzymes, and can be made into toxoids; endotoxin is lipid A, which triggers inflammation through TLR4. Superantigens activate many T cells at once and cause toxic shock.
- Biofilms on devices tolerate antibiotics and usually need removal of the device.
- Host defects predict infections: asplenia and encapsulated bacteria, terminal complement deficiency and *Neisseria*, T-cell defects and intracellular organisms.
:::

## Exercises

::: exercise Match the toxin to its mechanism {level=1}
Match each toxin to its mechanism: (a) cholera toxin, (b) diphtheria toxin, (c) tetanus toxin, (d) TSST-1. Mechanisms: (1) superantigen, (2) ADP-ribosylation of elongation factor 2, (3) cleavage of a SNARE protein in inhibitory neurons, (4) permanent activation of adenylate cyclase.
::: hint
Two of these toxins affect signalling or protein synthesis by adding ADP-ribose; only one acts on the nervous system.
:::
::: solution
(a)–(4), (b)–(2), (c)–(3), (d)–(1). Cholera toxin keeps Gs active and raises cAMP. Diphtheria toxin inactivates elongation factor 2 and stops protein synthesis. Tetanus toxin blocks release of inhibitory transmitters in the spinal cord. TSST-1 is a superantigen.
:::
:::

::: exercise Dose and probability {level=1 check="0.875"}
In the exponential dose–response model, an organism has an ID50 of 100 organisms. What is the probability of infection after a dose of 300 organisms? Give the exact decimal.
::: hint
Use $P = 1 - 2^{-D/\text{ID}_{50}}$.
:::
::: solution
$D/\text{ID}_{50} = 3$, so $P = 1 - 2^{-3} = 1 - 0.125 = 0.875$.
:::
:::

::: exercise The spleen and the capsule {level=1}
Why are people without a functioning spleen at particular risk from *Streptococcus pneumoniae*?
::: hint
Consider what a capsule does to phagocytosis and what the spleen contributes.
:::
::: solution
*S. pneumoniae* has a polysaccharide **capsule** that resists phagocytosis unless the bacterium is coated with antibody and complement. The spleen filters the blood and removes poorly opsonised bacteria, and its marginal-zone B cells make antibodies to polysaccharide antigens. Without a spleen, encapsulated bacteria multiply in the blood and can cause overwhelming sepsis within hours. People with asplenia are therefore vaccinated against encapsulated organisms, may be offered antibiotic prophylaxis, and are advised to seek help urgently with fever, following national guidance.
:::
:::

::: exercise Toxoid or no toxoid {level=2}
Tetanus can be prevented by vaccination with a toxoid, but there is no vaccine against endotoxin. Explain the difference using the nature of the two molecules.
::: hint
Compare a protein with a lipid that is part of a membrane.
:::
::: solution
Tetanus toxin is a **protein**. Treating it with formaldehyde destroys its toxic activity but keeps enough of its shape for the immune system to make neutralising antibodies, which then block real toxin. Endotoxin is **lipid A**, a glycolipid built into the outer membrane of all Gram-negative bacteria. It is poorly immunogenic, similar across many species, and is not secreted as a discrete toxin, so there is no toxoid that could protect against it. Antibodies to the variable O antigen protect only against particular strains.
:::
:::

::: exercise Koch's postulates in practice {level=2}
Explain why *Mycobacterium leprae* and *Helicobacter pylori* each fail at least one of Koch's postulates, and what other evidence links them to disease.
::: hint
Think about culture, and about how many infected people stay well.
:::
::: solution
***M. leprae*** cannot be grown on artificial media, so postulate 2 fails. It is linked to leprosy by its presence in lesions, its growth in armadillos and mouse footpads, the immune response and the effect of treatment.

***H. pylori*** can be cultured, but many infected people never develop ulcers, so postulate 1 in its strict form fails. The evidence comes from Barry Marshall's self-ingestion experiment, which produced gastritis, from epidemiology, and above all from the fact that eradicating the organism greatly reduces ulcer recurrence.
:::
:::

::: exercise Dose for a high attack rate {level=2 check="332"}
Using the exponential dose–response model with an ID50 of 100 organisms, what dose gives a 90% probability of infection? Round to the nearest whole organism.
::: hint
Solve $0.9 = 1 - 2^{-D/100}$ for $D$.
:::
::: solution
$2^{-D/100} = 0.1$, so $D/100 = \log_2 10 \approx 3.32$ and $D \approx 332$ organisms. A tenfold reduction in the chance of escaping infection needs about 3.3 ID50s.
:::
:::

::: exercise Bloody diarrhoea in a child {level=3}
A 4-year-old boy has bloody diarrhoea three days after a farm visit. Stool PCR detects Shiga toxin genes, and culture grows *E. coli* O157. Six days later he is pale, his urine output falls, his platelet count is low and his blood film shows fragmented red cells. Explain the pathogenesis and why antibiotics are not routinely given.
::: hint
Where does Shiga toxin bind, and what happens to it when the bacteria are killed?
:::
::: solution
This is **haemolytic uraemic syndrome** after infection with Shiga toxin-producing *E. coli*. The bacteria colonise the colon and release **Shiga toxin**, which is absorbed into the blood. Its B subunit binds the glycolipid Gb3, abundant on the endothelium of the kidney's glomeruli. The A subunit stops protein synthesis, injuring endothelial cells. Damaged vessels activate platelets and form microthrombi, which consume platelets (thrombocytopenia), shear red cells (fragmented cells and haemolysis) and block glomeruli (acute kidney injury).

Antibiotics are generally avoided because some, by stressing or killing the bacteria, may increase toxin production or release, and observational studies have linked them with a higher risk of HUS. Management is supportive, with careful fluid balance and dialysis if needed, under specialist care. The case is notifiable, and public health teams investigate the source and exclude infected children from nursery until cleared, following UK guidance.
:::
:::

::: exercise Recurrent meningococcal disease {level=3}
A 27-year-old man has his second episode of meningococcal infection in three years, each time with an uncommon serogroup. What host defect should be suspected, how could it be investigated, and what are the implications for him and his family?
::: hint
Which part of the immune system kills *Neisseria* directly in the blood?
:::
::: solution
Recurrent or unusual-serogroup *Neisseria* infection suggests a defect of the **complement** system, especially of the terminal components C5–C9 that form the membrane attack complex, or of properdin. *Neisseria* is unusually dependent on complement-mediated lysis for its clearance.

Investigation starts with functional complement tests (classical and alternative pathway activity, CH50 and AP50), followed by measurement of individual components. Other causes of complement consumption or loss, such as lupus, should be considered.

Implications: he should receive meningococcal vaccines, may be offered antibiotic prophylaxis and should carry a plan for urgent treatment of fever, following specialist advice. Inherited deficiencies run in families, so siblings may be tested. The same reasoning applies to people given C5 inhibitors such as eculizumab, who are vaccinated before treatment starts.
:::
:::
