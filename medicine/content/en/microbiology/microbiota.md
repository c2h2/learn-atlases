Every person carries a large population of microorganisms on the skin and in the mouth, gut, upper airway and vagina. Most of them are bacteria, but there are also viruses, fungi and archaea. A careful estimate suggests that the number of bacterial cells in the body is of the same order as the number of human cells, most of them in the colon.

These organisms are not passengers. They digest food we cannot digest, make vitamins, train the immune system and, above all, occupy space that would otherwise be taken by pathogens. They are also the source of most infections in hospital, which come from the patient's own flora when it reaches a place it should not be. Antibiotics change this community, sometimes for a long time, and *Clostridioides difficile* infection is the clearest example of the harm that follows.

This chapter covers the vocabulary of the microbiota, its composition at different body sites, its development and functions, how it is studied, how antibiotics disturb it, *C. difficile* infection and faecal microbiota transplantation, and the difference between colonisation and infection.

## Vocabulary {#vocabulary}

::: definition Microbiota and microbiome {#def-microbiota}
The **microbiota** is the community of microorganisms living in a particular environment, such as the human gut. The **microbiome** is, strictly, the collection of their genes, although the two words are often used interchangeably.

Members of the microbiota are described by their relationship to the host:

- a **commensal** lives on the host without causing harm;
- a **mutualist** benefits the host as well as itself;
- a **pathobiont** is normally harmless but can cause disease when conditions change, for example after antibiotics or when immunity is impaired.

The same organism can occupy several roles. *Escherichia coli* is a harmless commensal in the colon and the commonest cause of urinary tract infection.
:::

::: definition Colonisation, infection and contamination {#def-colonisation}
**Colonisation** is the presence and multiplication of microorganisms at a body site without tissue invasion or a host response that causes illness.

**Infection** is invasion of tissue by microorganisms with a host response and, usually, symptoms or signs of disease.

**Contamination** is the presence of organisms in a specimen that were introduced during collection or processing and were not present at the site sampled.

The distinction decides treatment. Colonisation usually needs no antibiotic, infection usually does, and contamination needs a better specimen.
:::

A positive culture alone cannot tell these apart. *Staphylococcus aureus* grown from a nose swab, *Pseudomonas aeruginosa* from a leg ulcer, *Candida* from sputum and *E. coli* from the urine of an older woman without symptoms are all usually colonisation. The clinical picture decides what a result means.

## Where the microbiota lives {#sites}

Each body site has its own conditions of moisture, oxygen, nutrients and acidity, and therefore its own community.

| Site | Typical organisms | Clinical relevance |
|---|---|---|
| Skin | coagulase-negative staphylococci, *Cutibacterium acnes*, corynebacteria; *S. aureus* in moist areas | source of contaminants in blood cultures and of line and prosthetic infections |
| Nose | coagulase-negative staphylococci, corynebacteria; *S. aureus* in a large minority of people | nasal *S. aureus* carriers have a higher risk of surgical site infection |
| Mouth | viridans streptococci, many anaerobes | dental caries, periodontitis, endocarditis, aspiration pneumonia |
| Upper airway | streptococci, *Haemophilus*, *Neisseria*; sometimes *Streptococcus pneumoniae* and *N. meningitidis* | carriage precedes invasive disease and spread to others |
| Stomach | few organisms, because of acid; *Helicobacter pylori* in many people | low acid allows overgrowth and lowers the dose needed for gut infection |
| Colon | very dense, mostly anaerobes such as *Bacteroides*, *Faecalibacterium* and other Firmicutes; *E. coli* and enterococci in smaller numbers | fermentation, colonisation resistance, source of intra-abdominal and urinary infection |
| Vagina (reproductive years) | *Lactobacillus* dominance | acid pH protects against pathogens; loss causes bacterial vaginosis |

The colon has by far the largest population, with around $10^{11}$ bacteria per gram of contents. Hundreds of species are present in each person, and the precise mix differs from one person to another more than it differs within one person over time.

Areas once thought sterile, such as the lower airways and bladder, contain a small number of organisms that sequencing can detect. Their significance is still debated, and in practice a routine culture of urine or a sample from the lower airway is interpreted as if the site were normally sterile.

## Development and functions {#functions}

The microbiota is acquired at and after birth. Babies born vaginally are first colonised by organisms from the mother's vagina and gut; babies born by caesarean section acquire more skin and environmental organisms at first. Breast milk contains complex sugars that babies cannot digest but that feed *Bifidobacterium*, which dominates the gut of breastfed infants. Diet, siblings, pets and antibiotics shape the community during infancy, and by about three years of age it resembles that of an adult. In adults it is fairly stable but responds to diet, drugs, illness and age.

The functions of the microbiota fall into three groups.

- **Metabolism.** Colonic bacteria ferment dietary fibre that human enzymes cannot digest, producing **short-chain fatty acids** such as acetate, propionate and butyrate. Butyrate is the main energy source of colonocytes. Bacteria also make vitamin K2 and some B vitamins, and transform bile acids and drugs.
- **Immune development.** Animals raised without any microorganisms, so-called germ-free animals, have underdeveloped gut lymphoid tissue and abnormal immune responses. Microbial products help induce regulatory T cells and IgA, which keep the response to commensals in balance.
- **Colonisation resistance**, the most important function in clinical microbiology.

::: theorem Colonisation resistance {#thm-colonisation-resistance}
An intact microbiota protects the host against colonisation and infection by incoming pathogens. Disrupting the microbiota, most often by antibiotics, removes this protection and allows pathogens or resistant organisms to establish themselves.
:::

::: proof
Several mechanisms combine.

- **Competition for nutrients and space.** Resident bacteria consume the sugars, amino acids and iron that a newcomer needs, and occupy attachment sites on the mucosa.
- **Inhibitory products.** Short-chain fatty acids lower the pH and inhibit some Enterobacterales. Many bacteria release **bacteriocins**, proteins that kill related bacteria.
- **Bile acid conversion.** The liver secretes **primary bile acids**. Colonic bacteria convert them to **secondary bile acids**. Some primary bile acids promote germination of *C. difficile* spores, while secondary bile acids inhibit its growth.
- **Stimulation of host defences.** Commensals induce mucus, antimicrobial peptides and IgA secretion by the gut wall.

When antibiotics kill large parts of the community, nutrients become available, secondary bile acids fall and primary bile acids rise. A pathogen arriving at this point, or a resistant organism already present in small numbers, can expand. This explains *C. difficile* infection after antibiotics, the gut colonisation by multidrug-resistant Enterobacterales during hospital treatment, and vaginal candidiasis after a course of antibiotics.
:::

::: widget plot
f: -(x*ln(x) + (1-x)*ln(1-x))
x: 0.001, 0.999
y: 0, 0.8
labels: H
caption: The Shannon diversity index $H$ for a community of two species, plotted against the proportion $x$ of the first species. $H$ is highest, $\ln 2 \approx 0.69$, when the two are equally common, and falls towards zero as one species takes over. A healthy colonic community has hundreds of species and a much higher $H$; after broad-spectrum antibiotics, a few organisms may dominate and $H$ falls sharply.
:::

## How the microbiota is studied {#methods}

Most gut bacteria are strict anaerobes that are hard to grow in the laboratory, so culture alone gives a very incomplete picture. Modern studies use DNA sequencing.

- **16S rRNA gene sequencing** amplifies part of a gene found in all bacteria and sorts the sequences into taxa. It is cheap and shows which bacteria are present and in what proportions, usually to the level of genus.
- **Shotgun metagenomics** sequences all the DNA in a sample. It identifies species and strains and shows which genes are present, including resistance genes and metabolic pathways.
- **Metabolomics** measures the chemical products, such as short-chain fatty acids and bile acids, which link composition to function.

Results are summarised by **diversity** measures. A community is more diverse when it has more types of organism (richness) and when they are more evenly represented (evenness). The **Shannon index** combines both:

$$
H = -\sum_{i} p_i \ln p_i
$$ {#eq-shannon}

where $p_i$ is the proportion of the community belonging to taxon $i$. For $S$ equally abundant taxa, $H = \ln S$, the largest possible value.

::: example Diversity before and after antibiotics {#ex-shannon}
A simplified gut community contains four taxa in proportions 0.4, 0.3, 0.2 and 0.1. After a week of broad-spectrum antibiotics, only three taxa are detected, in proportions 0.85, 0.10 and 0.05. Calculate the Shannon index before and after, to two decimal places.
::: solution
Before:

$$
H = -(0.4\ln 0.4 + 0.3\ln 0.3 + 0.2\ln 0.2 + 0.1\ln 0.1) \approx 1.28
$$

The maximum possible for four taxa is $\ln 4 \approx 1.39$, so the community was fairly even.

After:

$$
H = -(0.85\ln 0.85 + 0.10\ln 0.10 + 0.05\ln 0.05) \approx 0.52
$$

Diversity has fallen by more than half. One taxon was lost, and one now dominates. Real communities have hundreds of taxa, but the pattern is the same: broad-spectrum antibiotics reduce both richness and evenness. Recovery takes weeks to months, and some taxa may not return.
:::
:::

::: warning Association is not causation
Hundreds of conditions have been associated with differences in the gut microbiota, from obesity and diabetes to depression and autism. Most of these findings are associations from cross-sectional studies. A different microbiota may be a cause of the disease, a consequence of it, or a consequence of the diet, drugs and lifestyle that go with it. Metformin, proton pump inhibitors and antibiotics, for example, all change the microbiota. Treat claims that a microbiome difference causes a disease, or that a probiotic will treat it, with the same scrutiny as any other claim, and look for randomised trials with clinical outcomes.
:::

## Antibiotics and *Clostridioides difficile* {#cdiff}

::: definition *Clostridioides difficile* infection {#def-cdiff}
*Clostridioides difficile* is an anaerobic, spore-forming, Gram-positive rod. **C. difficile infection** (CDI) is diarrhoea, or colitis, caused by toxin-producing strains. Its features are:

- **transmission** by spores, which survive on surfaces and hands for long periods and resist alcohol;
- **germination** of spores in the gut when the microbiota has been disrupted, especially when primary bile acids are high and secondary bile acids are low;
- **toxins A and B**, which inactivate signalling proteins that control the actin cytoskeleton of colonic cells, so the cells round up and die and the colon becomes inflamed;
- a spectrum of disease from mild diarrhoea to **pseudomembranous colitis**, toxic megacolon, perforation and death.

The main risk factors are recent antibiotic use, older age, hospital or care home stay, and severe illness. Clindamycin, cephalosporins, fluoroquinolones and broad-spectrum penicillins with β-lactamase inhibitors carry the highest risk. Proton pump inhibitors are associated with a higher risk.
:::

About one in five people treated for a first episode has a **recurrence**, and the risk rises with each episode. Recurrence occurs because spores persist in the gut and the microbiota has not yet recovered, so the conditions that allowed the first episode still exist.

Many people, especially in hospital, carry *C. difficile* without symptoms. Testing is therefore restricted to people with diarrhoea that has no other obvious cause, and UK laboratories use a two-stage algorithm: a sensitive screening test, such as glutamate dehydrogenase (GDH) antigen or PCR for the toxin gene, followed by a test for free toxin. A positive toxin test indicates disease; organism present without detectable toxin suggests carriage or a low toxin level, and the result is interpreted with the clinical picture.

::: example Diarrhoea after antibiotics {#ex-cdiff}
An 81-year-old woman in a care home was treated with a cephalosporin for a chest infection. Ten days later she develops six episodes a day of watery diarrhoea, abdominal pain and a fever. Her white cell count is $16 \times 10^9$/L and her creatinine has risen. Stool tests show GDH positive and toxin positive. Explain the pathogenesis and the principles of management.
::: solution
This is **C. difficile infection**. The cephalosporin killed much of her colonic microbiota, removing colonisation resistance. *C. difficile* spores, acquired from the care home environment or already present in small numbers, germinated in the altered bile acid environment and multiplied. Toxins A and B damaged the colonic epithelium, causing diarrhoea, inflammation, fever and a raised white cell count. The raised creatinine reflects fluid loss.

Management principles, following UK guidance:

- **stop or review the causative antibiotic** if possible, and review other drugs such as proton pump inhibitors and laxatives;
- **isolate** her in a single room with its own toilet, with gloves and aprons, soap-and-water hand washing and sporicidal cleaning;
- **assess severity** using the white cell count, temperature, creatinine and signs of colitis, and monitor fluids;
- give an **oral antibiotic active against C. difficile**: as of 2026, NICE recommends oral vancomycin for a first episode, with fidaxomicin as an alternative, and fidaxomicin for an early recurrence;
- seek urgent surgical and specialist advice if there are signs of life-threatening colitis.

The irony of treating an antibiotic-associated infection with another antibiotic is real. Vancomycin and fidaxomicin are used because they stay in the gut and act on *C. difficile*; fidaxomicin has a narrower spectrum and spares more of the normal flora, which partly explains its lower recurrence rate.
:::
:::

### Faecal microbiota transplantation {#fmt}

**Faecal microbiota transplantation** (FMT) transfers stool from a screened healthy donor into the gut of a patient, by colonoscopy, enema, nasogastric tube or capsules. Its aim is to restore a diverse community, and with it colonisation resistance and secondary bile acid metabolism.

FMT is the clearest clinical demonstration that the microbiota protects against infection. In a randomised trial published in 2013, van Nood and colleagues found that FMT cured recurrent *C. difficile* infection far more often than vancomycin alone, and the trial was stopped early. As of 2026, NICE recommends considering FMT for adults with recurrent *C. difficile* infection who have had two or more previous episodes.

Donors are screened carefully for infections, including multidrug-resistant organisms, because transmission of resistant bacteria through FMT has caused serious infections. Its use for other conditions, such as inflammatory bowel disease or metabolic disease, remains experimental.

**Probiotics** are live microorganisms given to provide a health benefit. Trials of probiotics to prevent antibiotic-associated diarrhoea and *C. difficile* infection have given inconsistent results, products differ widely, and they are not part of standard UK guidance for preventing or treating *C. difficile* infection. Rare bloodstream infections with probiotic organisms have occurred in severely ill and immunocompromised people.

## When the flora causes infection {#endogenous}

Most bacterial infections in hospital patients are **endogenous**: caused by the patient's own flora reaching a sterile site.

- Gut organisms such as *E. coli* ascend the urethra to cause urinary infection, more easily along a catheter.
- Skin organisms enter through intravenous lines and surgical wounds. People who carry *S. aureus* in the nose have a higher risk of surgical site infection with their own strain, which is why some surgical units screen for carriage and offer decolonisation before surgery.
- Bowel perforation or surgery releases a mixture of anaerobes and Enterobacterales into the peritoneum.
- Mouth flora aspirated into the lungs causes aspiration pneumonia and lung abscess.

This is the reason infection prevention focuses so much on devices and procedures: they create routes from colonised sites to sterile ones.

::: example A positive urine culture without symptoms {#ex-asb}
A 78-year-old man with a long-term urinary catheter has a routine urine sample sent "for screening". It grows more than $10^5$ CFU/mL of *E. coli*. He has no fever, no new confusion and no pain. Should he be treated?
::: solution
No. Almost everyone with a long-term urinary catheter has bacteria in the urine within weeks, because organisms from the skin and gut colonise the catheter and form a biofilm. This is **asymptomatic bacteriuria**, a form of colonisation. Treating it does not prevent symptomatic infection, but it does select resistant organisms, disturbs the gut microbiota and raises the risk of *C. difficile* infection.

UK guidance advises against sending urine samples from catheterised people without symptoms and against treating asymptomatic bacteriuria in this group. Urine dipsticks are also unreliable in catheterised people and in older adults. If he develops symptoms of infection, such as fever, rigors, flank pain or new delirium without another cause, a sample should be taken from a newly inserted catheter, ideally after the old one is changed, and treatment guided by local guidelines.
:::
:::

::: example Vaginal discharge with a fishy smell {#ex-bv}
A 29-year-old woman has a thin, grey-white vaginal discharge with a fishy odour, without itching or soreness. The vaginal pH is 5.5. Microscopy shows epithelial cells coated with small bacteria and few lactobacilli. Explain the microbiology.
::: solution
This is **bacterial vaginosis**, a change in the vaginal microbiota rather than an infection with a single new organism. Normally *Lactobacillus* species dominate and produce lactic acid, which keeps the pH at or below about 4.5 and inhibits other organisms. In bacterial vaginosis the lactobacilli are largely replaced by a mixed community of anaerobes and *Gardnerella* species. The pH rises, and bacterial amines cause the fishy odour, especially after adding alkali (the "whiff test").

The epithelial cells coated with bacteria are **clue cells**. Diagnosis uses **Amsel's criteria** (at least three of: thin homogeneous discharge, pH above 4.5, positive whiff test and clue cells) or a Gram-stain score such as the **Nugent score**. Treatment follows national guidelines, and recurrence is common because the microbiota tends to drift back to the same state.
:::
:::

::: quiz
Which change after a course of clindamycin most directly allows *C. difficile* spores to germinate and grow in the colon?
- [ ] A rise in secondary bile acids produced by commensal bacteria
- [x] Loss of commensals that convert primary to secondary bile acids
- [ ] Increased production of short-chain fatty acids
- [ ] Increased gastric acid
::: solution
Commensal bacteria convert **primary** bile acids, some of which promote germination of *C. difficile* spores, into **secondary** bile acids, which inhibit the organism's growth. Clindamycin kills many of these commensals, so primary bile acids accumulate and secondary bile acids fall. Short-chain fatty acid production also falls, not rises, after broad-spectrum antibiotics.
:::
:::

::: history
In 1885 Theodor Escherich described the bacteria in the faeces of infants, including the organism later named *Escherichia coli*. At the start of the twentieth century Élie Metchnikoff suggested that lactic acid bacteria in fermented milk might promote health by displacing harmful gut organisms, an early version of the idea behind probiotics. In 1958 Ben Eiseman and colleagues in Denver reported treating pseudomembranous colitis with faecal enemas.

*C. difficile* was described in 1935 by Ivan Hall and Elizabeth O'Toole in the stool of healthy newborns; its name reflects how difficult it was to culture. Only in the late 1970s was it identified as the cause of antibiotic-associated pseudomembranous colitis. Large outbreaks of a hypervirulent strain in North America and the UK in the early 2000s, including deaths at hospitals in Buckinghamshire, led to mandatory surveillance and major changes in antibiotic prescribing in England. The Human Microbiome Project, launched in 2007, published its reference catalogue of the healthy human microbiota in 2012, using DNA sequencing rather than culture.
:::

## Where this leads

The structure and growth of the organisms of the microbiota are in [[microbiology/bacteria]]. How antibiotics are chosen to limit damage to the microbiota is part of stewardship in [[microbiology/antimicrobials]], and the control of *C. difficile* on wards is in [[microbiology/infection-control]]. The colitis itself, and other gut diseases linked to the microbiota, are covered in [[gastrointestinal/bowel-disease]], and the immune tolerance that allows commensals to live with us is in [[immunology/tolerance-regulation]].

::: summary
- The microbiota is the community of microorganisms living on and in the body; the bacterial cells number about the same as human cells, most of them in the colon.
- Colonisation is presence without disease, infection is invasion with a host response, and contamination is introduced during sampling. A positive culture alone does not distinguish them.
- Each site has its own flora. Lactobacilli keep vaginal pH low; colonic anaerobes ferment fibre to short-chain fatty acids and convert primary to secondary bile acids.
- Colonisation resistance, through competition, inhibitory products, bile acid conversion and stimulation of host defences, protects against pathogens. Antibiotics remove it.
- The microbiota is studied by 16S sequencing, shotgun metagenomics and metabolomics; diversity is measured by indices such as $H = -\sum p_i \ln p_i$.
- *C. difficile* infection follows antibiotic disruption: spores germinate, toxins A and B damage the colon, and recurrence is common. FMT restores colonisation resistance in recurrent disease.
- Most hospital infections are endogenous; asymptomatic bacteriuria, especially with catheters, should not be treated.
:::

## Exercises

::: exercise Colonisation or infection? {level=1}
Classify each as colonisation, infection or contamination: (a) MRSA grown from a nose screening swab in a well man before surgery; (b) *Streptococcus pyogenes* grown from a hot, spreading area of cellulitis; (c) a coagulase-negative staphylococcus in one of four blood culture bottles from a woman without a line who has a urinary infection.
::: hint
Ask whether there is tissue invasion with a host response, and how the organism could have reached the specimen.
:::
::: solution
(a) **Colonisation**: MRSA is carried in the nose without disease. It still matters, because it raises the risk of surgical site infection and is a reason for decolonisation. (b) **Infection**: the organism is invading tissue and causing inflammation. (c) Probably **contamination**: a skin organism in one of several bottles, with no device and another clear source of illness, was most likely introduced from the skin during venepuncture.
:::
:::

::: exercise Diversity of two equal species {level=1 check="0.69"}
A community contains two taxa in equal proportions. Calculate its Shannon index, to two decimal places.
::: hint
Use [[#eq-shannon]] with $p_1 = p_2 = 0.5$.
:::
::: solution
$H = -(0.5\ln 0.5 + 0.5\ln 0.5) = -\ln 0.5 = \ln 2 \approx 0.69$.
:::
:::

::: exercise The acid vagina {level=1}
Explain how lactobacilli protect against vaginal infection, and why oestrogen matters.
::: hint
Consider what lactobacilli produce, and what they feed on.
:::
::: solution
Lactobacilli ferment glycogen in the vaginal epithelium to **lactic acid**, which keeps the pH at or below about 4.5. The acid inhibits many pathogens and the anaerobes associated with bacterial vaginosis; some strains also produce other inhibitory substances. Glycogen deposition depends on **oestrogen**, so lactobacillus dominance is a feature of the reproductive years. Before puberty and after the menopause the pH is higher and the flora more mixed.
:::
:::

::: exercise A three-taxon community {level=2 check="1.04"}
A community contains three taxa in proportions 0.5, 0.25 and 0.25. Calculate its Shannon index to two decimal places, and compare it with the maximum possible for three taxa.
::: hint
$\ln 0.25 = 2\ln 0.5$.
:::
::: solution
$H = -(0.5\ln 0.5 + 0.25\ln 0.25 + 0.25\ln 0.25) = 0.5\ln 2 + 0.5\ln 4 = 1.5\ln 2 \approx 1.04$.

The maximum for three taxa is $\ln 3 \approx 1.10$, reached when all three are equal. This community is slightly uneven.
:::
:::

::: exercise Why some antibiotics carry more risk {level=2}
Clindamycin and broad-spectrum cephalosporins carry a high risk of *C. difficile* infection, while a short course of nitrofurantoin carries little. Explain the difference.
::: hint
Where in the body does each drug reach high concentrations, and which bacteria does it kill?
:::
::: solution
Clindamycin is very active against gut **anaerobes**, which make up most of the colonic microbiota and include many of the bacteria that produce secondary bile acids. Broad-spectrum cephalosporins also reach the gut and kill a wide range of commensals, while *C. difficile* itself is resistant to them. Both therefore remove colonisation resistance and leave *C. difficile* free to grow.

Nitrofurantoin is absorbed and concentrated in the **urine**, with little activity in the colon and a short course. It barely disturbs the gut microbiota, which is one reason it is a first-line drug for uncomplicated cystitis.
:::
:::

::: exercise Nasal carriage before cardiac surgery {level=2}
A 66-year-old man due for coronary artery bypass surgery is found to carry meticillin-sensitive *S. aureus* in his nose. Explain why this matters and what measures might be taken.
::: hint
Where do most surgical site infections with *S. aureus* come from?
:::
::: solution
Most surgical site infections with *S. aureus* are caused by the patient's **own strain**, carried in the nose and on the skin. Carriers therefore have a higher risk of infection of the sternal wound and of bacteraemia after surgery.

Many units offer **decolonisation** before high-risk surgery, typically a nasal antibacterial ointment and an antiseptic body wash for several days, according to local protocols. The aim is to reduce the number of organisms at the time of surgery, not to eradicate carriage permanently. Surgical antibiotic prophylaxis is also chosen to cover *S. aureus*. Overuse of decolonising agents can select resistance, which is why programmes target defined high-risk groups.
:::
:::

::: exercise Interpreting a C. difficile result {level=3}
A 55-year-old woman in hospital has diarrhoea after starting enteral tube feeding. She received antibiotics two weeks ago. Her stool test is GDH positive and toxin negative. How should this result be interpreted and what should happen next?
::: hint
What does each stage of the UK two-stage test detect?
:::
::: solution
GDH detects the **organism**, whether or not it produces toxin; the toxin test detects **free toxin** in the stool. GDH positive and toxin negative means *C. difficile* is present but free toxin was not detected. She may be a **carrier** whose diarrhoea has another cause, such as the enteral feed, or she may have CDI with toxin levels below the detection limit. Many laboratories add a PCR for the toxin gene, which shows whether the strain can produce toxin.

Clinical assessment decides. Other causes, such as the feed, laxatives and other drugs, should be reviewed. Because she could transmit *C. difficile*, she should be isolated with enteric precautions while she has diarrhoea. If the clinical picture strongly suggests CDI, with fever, raised white cell count or colitis on imaging, treatment may be started on clinical grounds after discussion with the microbiology team, following local guidance.
:::
:::

::: exercise Appraise a microbiome claim {level=3}
A cross-sectional study finds that people with type 2 diabetes have lower gut microbial diversity than people without diabetes. A newspaper reports that "gut bacteria cause diabetes" and recommends a probiotic. Identify three alternative explanations for the finding and describe a study design that could test causation.
::: hint
Think about reverse causation, confounding by drugs and diet, and what an intervention study would show.
:::
::: solution
Alternative explanations:

- **Reverse causation**: diabetes itself, through high glucose, altered gut motility or changes in bile acids, could change the microbiota.
- **Confounding by treatment**: **metformin**, taken by most people with type 2 diabetes, changes the gut microbiota substantially. Statins, proton pump inhibitors and recent antibiotics also do.
- **Confounding by diet and lifestyle**: low-fibre diets, obesity and physical inactivity are associated both with diabetes and with lower diversity.

Better evidence would come from **prospective cohort studies** that measure the microbiota before diabetes develops and adjust for diet and drugs, from **transfer experiments** in germ-free animals, and above all from **randomised controlled trials** of a defined microbial intervention, such as FMT or a specific probiotic, with clinical outcomes such as HbA1c. A probiotic should be recommended only if such trials show benefit; the newspaper's claim goes far beyond the evidence.
:::
:::
