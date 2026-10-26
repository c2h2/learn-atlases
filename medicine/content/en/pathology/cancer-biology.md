Cancer is not one disease but hundreds, yet they share a common logic. In every cancer, a single cell has acquired changes in its DNA that free it from the controls that keep normal cells in their place. Its descendants divide when they should not, survive when they should die, invade tissues they should respect and spread to distant organs. This chapter explains how that happens: which genes are altered, how the altered cells behave, what causes the alterations, and how this knowledge has produced treatments aimed at the specific defects of a tumour.

The chapter concentrates on mechanism. How tumours are classified, graded, staged and diagnosed is covered in [[pathology/cancer-diagnosis]], and inherited cancer syndromes in more depth in [[genetics/cancer-genetics]].

## What a neoplasm is

::: definition Neoplasm {#def-neoplasm}
A **neoplasm** (literally "new growth") is an abnormal mass of tissue whose growth exceeds and is not coordinated with that of the normal tissues, and which persists in the same excessive manner after the stimulus that caused it has stopped. The word **tumour** originally meant any swelling but is now used as a synonym for neoplasm. **Cancer** is the common term for a **malignant** neoplasm, one that can invade and spread; a **benign** neoplasm stays localised.
:::

The definition contains the key difference from hyperplasia ([[pathology/cell-injury]]). Hyperplastic tissue grows in response to a stimulus and stops when the stimulus is withdrawn. A neoplasm is autonomous: it keeps growing because its own genes have changed.

Almost all tumours are **clonal**: every cell descends from one original cell. This can be shown in tumours of women by examining genes on the X chromosome. Each cell in a woman inactivates one X chromosome at random early in development, so normal tissue is a mixture of cells with the maternal or the paternal X active. All the cells of a tumour have the same X inactivated, because they descend from one cell. In lymphoid tumours, clonality is shown by every cell carrying the same rearrangement of the immunoglobulin or T cell receptor genes.

## Cancer is a genetic disease of somatic cells

::: theorem Carcinogenesis is a multistep process of clonal evolution {#thm-multistep}
Cancer develops through the accumulation of several genetic and epigenetic changes in one cell lineage. Each change that gives the cell a growth or survival advantage lets its descendants outgrow their neighbours. The changes that confer an advantage are **driver** mutations; the many others that are carried along without effect are **passenger** mutations. A clinically evident cancer usually contains a handful of drivers, acquired over years or decades.
:::

::: proof
The evidence comes from several directions. The incidence of most carcinomas rises steeply with age, roughly as a power of age, which is what is expected if several independent rate-limiting events must occur in one cell. Pathologists can see the intermediate stages: in the colon, small benign adenomas grow into large adenomas, which develop high-grade dysplasia and then invasive carcinoma. Sequencing these stages shows that they accumulate mutations in a typical order. The first step is usually inactivation of the *APC* gene, which allows an adenoma to form; activating mutations of *KRAS* let the adenoma grow; loss of *TP53* accompanies the change to carcinoma. This **adenoma–carcinoma sequence** was described by Fearon and Vogelstein in 1990. Within one tumour, cells continue to acquire new mutations, so the tumour becomes a mixture of related subclones (**intratumoural heterogeneity**). Treatment selects for resistant subclones, which explains why cancers that respond at first often relapse.
:::

The genes involved fall into three groups: **oncogenes**, which promote growth; **tumour suppressor genes**, which restrain it; and genes that maintain the integrity of the genome, whose failure speeds up the accumulation of the others.

## Oncogenes

::: definition Proto-oncogene and oncogene {#def-oncogene}
A **proto-oncogene** is a normal gene whose product promotes cell growth or survival. An **oncogene** is a mutated or overexpressed form of a proto-oncogene whose product is active when it should not be. Oncogenes act **dominantly**: a change in one of the two copies is enough to have an effect.
:::

Proto-oncogenes code for every step in the pathway by which a growth signal reaches the nucleus:

- **Growth factors**, such as PDGF.
- **Growth factor receptors**, such as the epidermal growth factor receptor (*EGFR*) and *HER2* (also called *ERBB2*).
- **Signal transducers**, such as *RAS* and *BRAF*. RAS is a molecular switch that is "on" when it binds GTP and turns itself off by hydrolysing GTP to GDP. Mutated RAS cannot hydrolyse GTP, so it stays on. *KRAS* mutations are found in most pancreatic cancers and many colorectal and lung cancers. The *BRAF* V600E mutation is common in melanoma.
- **Transcription factors**, such as *MYC*, which switches on many genes needed for growth.
- **Cell cycle regulators**, such as cyclin D1 and the cyclin-dependent kinase CDK4.

A proto-oncogene becomes an oncogene in three main ways:

1. **Point mutation**, which changes the structure of the protein so that it is constantly active (*RAS*, *BRAF*, *EGFR*).
2. **Gene amplification**, in which many copies of the gene are made, so that far too much normal protein is produced. *HER2* is amplified in about 15 to 20% of breast cancers, and *MYCN* in some neuroblastomas.
3. **Chromosomal translocation**, which either places a gene under the control of a strong promoter (in Burkitt lymphoma, the t(8;14) translocation places *MYC* next to an immunoglobulin gene) or fuses two genes to make a new protein (in chronic myeloid leukaemia, the t(9;22) translocation creates the Philadelphia chromosome and the *BCR::ABL1* fusion gene).

::: example A raised white cell count {#ex-cml}
A 52-year-old woman has tiredness and discomfort under the left ribs. Her white cell count is $180 \times 10^9$/L, with neutrophils and myelocytes at every stage of maturation, and her spleen is enlarged. Cytogenetics shows t(9;22)(q34;q11). Explain the molecular basis and how it is treated.
::: solution
1. The translocation joins part of the *BCR* gene on chromosome 22 to the *ABL1* gene on chromosome 9. The shortened chromosome 22 is the **Philadelphia chromosome**.
2. The fusion gene *BCR::ABL1* encodes a tyrosine kinase that is always active. It drives proliferation of myeloid cells and protects them from apoptosis. This is **chronic myeloid leukaemia**.
3. Because a single oncogenic kinase drives the disease, inhibiting it is highly effective. **Imatinib**, a tyrosine kinase inhibitor designed against BCR::ABL1, was the first such drug; newer ones followed.
4. With these drugs most people with chronic-phase CML now have a near-normal life expectancy. Response is monitored by measuring *BCR::ABL1* transcripts in the blood. Resistance can arise from mutations in the kinase domain, an example of selection of resistant subclones ([[blood/leukaemia]]).
:::
:::

## Tumour suppressor genes

::: definition Tumour suppressor gene {#def-tsg}
A **tumour suppressor gene** is a gene whose product restrains cell growth or promotes the death of damaged cells. Cancer results from **loss of function**, which usually requires inactivation of **both** copies of the gene in the cell.
:::

::: theorem Knudson's two-hit hypothesis {#thm-two-hit}
For a tumour suppressor gene, two "hits" (inactivating events) are needed, one in each allele, before the cell loses control. In hereditary cancer syndromes the first hit is inherited in every cell and only the second is acquired, so tumours appear earlier, are often multiple and may be bilateral. In sporadic cancers both hits must be acquired in the same cell, so tumours are later and usually single.
:::

Alfred Knudson proposed this in 1971 from the statistics of **retinoblastoma**, a tumour of the eye in young children. Children with the inherited form developed tumours earlier and often in both eyes. The gene, *RB1*, was later identified. A familiar consequence is that an inherited mutation in a tumour suppressor gene shows **dominant inheritance** in a family, because the second hit is almost certain to happen in some cell, yet acts **recessively** in each cell. The second hit is often loss of the whole region containing the normal allele, called **loss of heterozygosity**.

The most important tumour suppressors are:

- **RB**, the protein of the *RB1* gene, controls the transition from the G1 to the S phase of the cell cycle. In its active form it binds the transcription factor E2F and prevents the cell from entering S phase. Growth signals activate cyclin D and CDK4/6, which phosphorylate RB and release E2F. Almost every cancer disables this checkpoint in some way: by losing RB, by overexpressing cyclin D or CDK4, or by losing the CDK inhibitor p16. CDK4/6 inhibitors are used in hormone receptor-positive breast cancer.
- **p53**, the product of *TP53*, is the "guardian of the genome". It is normally kept at low levels by MDM2, which targets it for destruction. DNA damage, oncogene activity and hypoxia stabilise p53. It then stops the cell cycle (through the CDK inhibitor p21) to allow repair, and if the damage cannot be repaired it triggers apoptosis or permanent senescence. *TP53* is the most frequently mutated gene in human cancer. Inherited mutations cause the **Li–Fraumeni syndrome**, with sarcomas, breast cancer, brain tumours and other cancers at young ages.
- **APC** controls the WNT signalling pathway by promoting destruction of β-catenin. When APC is lost, β-catenin accumulates, enters the nucleus and switches on growth genes. Inherited mutations cause **familial adenomatous polyposis**, with hundreds to thousands of colonic adenomas and an almost certain risk of colorectal cancer if the colon is not removed.
- Others include *BRCA1* and *BRCA2* (DNA repair), *PTEN* (which opposes the PI3K–AKT growth pathway), *NF1* (which switches off RAS), *VHL* (which controls the response to hypoxia; lost in clear cell renal carcinoma) and *CDKN2A* (which encodes p16).

::: warning Dominant in the family, recessive in the cell
Students often reason that because a family cancer syndrome is inherited as an autosomal dominant trait, the mutated tumour suppressor gene must act dominantly. It does not. One working copy is enough to control the cell. What is inherited is a greatly increased probability that, in at least one of billions of cells, the remaining copy will be lost. This is why people with the same inherited mutation can develop cancer at very different ages, and why a germline result describes risk, not certainty ([[genetics/cancer-genetics]]).
:::

::: quiz
A child develops retinoblastoma in both eyes at 8 months of age. What best explains the bilateral, early disease?
- [ ] Both copies of *RB1* were inherited in a mutated form.
- [x] One mutated copy of *RB1* was inherited in every cell, so only one further somatic hit was needed in each tumour.
- [ ] *RB1* acts as an oncogene, so one mutation is sufficient.
- [ ] The child was exposed to a carcinogen during pregnancy.
::: solution
In hereditary retinoblastoma every retinal cell already carries the first hit. A single further somatic event in any of millions of retinal cells is enough, so tumours arise early and often in both eyes. Two inherited mutated copies would usually be incompatible with life, *RB1* is a tumour suppressor, and no environmental cause is needed.
:::
:::

## Genomic instability and epigenetic change

Mutations accumulate faster when the cell's systems for repairing DNA fail. **Genomic instability** is therefore described as an *enabling* characteristic of cancer: it does not itself make a cell malignant, but it speeds up the acquisition of the changes that do.

- **Mismatch repair** corrects errors made when DNA is copied. When it fails, errors accumulate, especially in short repetitive sequences called microsatellites, which change length: **microsatellite instability** (MSI). Inherited defects in mismatch repair genes cause **Lynch syndrome** (colorectal, endometrial and other cancers). In sporadic tumours, the commonest cause is silencing of the *MLH1* gene by methylation.
- **Homologous recombination** repairs double-strand breaks accurately using the sister chromosome as a template. It requires BRCA1 and BRCA2. Cells lacking it depend on other, error-prone pathways and are highly sensitive to **PARP inhibitors**, a principle called synthetic lethality.
- **Nucleotide excision repair** removes damage caused by ultraviolet light. Its inherited failure in **xeroderma pigmentosum** causes many skin cancers at a young age.
- **Chromosomal instability**, with gains and losses of whole chromosomes or large segments, is common in most carcinomas.

**Epigenetic** changes alter gene expression without changing the DNA sequence. Tumour suppressor genes can be silenced by methylation of their promoters, as with *MLH1* and *CDKN2A*. Mutations in enzymes that modify chromatin are common in cancer. Mutant forms of the metabolic enzyme isocitrate dehydrogenase (IDH), found in some gliomas and leukaemias, produce 2-hydroxyglutarate, which blocks enzymes that remove methyl groups from DNA and histones. Because epigenetic changes are reversible, drugs that inhibit DNA methylation or mutant IDH are used in some cancers.

::: example A colorectal cancer in a young woman {#ex-msi}
A 38-year-old woman has a carcinoma of the right colon. Her mother had endometrial cancer at 48. Immunohistochemistry on the tumour shows loss of the mismatch repair proteins MSH2 and MSH6, and the tumour is microsatellite unstable. Explain the findings and their implications.
::: solution
1. Loss of MSH2 and MSH6 (they work as a pair) means that mismatch repair has failed, and the resulting accumulation of errors in microsatellites explains the instability.
2. Her young age and her mother's endometrial cancer suggest an inherited defect: **Lynch syndrome**, with a germline *MSH2* mutation and a second hit in the tumour. Loss of MSH2 is rarely caused by methylation, unlike loss of MLH1.
3. She should be referred for genetic counselling and germline testing. If a mutation is found, relatives can be tested and offered colonoscopic surveillance and risk-reducing measures. In the UK, NICE recommends testing all colorectal and endometrial cancers for mismatch repair deficiency for this reason.
4. MSI-high tumours carry very many mutations, which generate abnormal proteins (**neoantigens**) that the immune system can recognise. This is why such tumours respond well to immune checkpoint inhibitors when advanced.
:::
:::

## The hallmarks of cancer

In 2000 Douglas Hanahan and Robert Weinberg proposed that the bewildering variety of cancers could be understood through a small number of capabilities that every cancer must acquire. Their framework was extended in 2011 and again in 2022.

::: theorem The hallmarks of cancer {#thm-hallmarks}
To become a malignant tumour, cells acquire a set of functional capabilities:

1. **Sustaining proliferative signalling**: oncogenes keep growth pathways switched on.
2. **Evading growth suppressors**: loss of RB, p53 and other brakes.
3. **Resisting cell death**: loss of p53, overexpression of BCL-2.
4. **Enabling replicative immortality**: reactivation of telomerase.
5. **Inducing angiogenesis**: recruitment of new blood vessels.
6. **Activating invasion and metastasis**.
7. **Reprogramming cellular metabolism** (added in 2011).
8. **Avoiding immune destruction** (added in 2011).

Two **enabling characteristics** make their acquisition possible: **genome instability and mutation**, and **tumour-promoting inflammation**. The 2022 update proposed further candidates, including unlocking of phenotypic plasticity, senescent cells, non-mutational epigenetic reprogramming and the influence of microbiomes.
:::

The value of the framework is that each hallmark is a potential target for treatment:

| Hallmark | Example of a targeted treatment |
|---|---|
| Proliferative signalling | Trastuzumab against HER2; EGFR inhibitors in *EGFR*-mutant lung cancer; BRAF inhibitors in melanoma |
| Evading growth suppressors | CDK4/6 inhibitors in hormone receptor-positive breast cancer |
| Resisting cell death | BCL-2 inhibitor in chronic lymphocytic leukaemia |
| Angiogenesis | Antibody against VEGF (bevacizumab) |
| Avoiding immune destruction | Antibodies against PD-1, PD-L1 or CTLA-4 |
| Genome instability | PARP inhibitors in *BRCA*-mutant cancers |

### Unlimited replication

Normal human cells can divide only a limited number of times, because telomeres shorten with each division until the cell enters senescence ([[pathology/cell-injury]]). Most cancers reactivate **telomerase**, the enzyme that rebuilds telomeres, and a minority use an alternative recombination mechanism. Without this, a clone would stop growing long before reaching a size that matters.

### Altered metabolism

Cancer cells take up glucose avidly and convert much of it to lactate, even when oxygen is plentiful. This **aerobic glycolysis** (the Warburg effect) seems wasteful, but it supplies the carbon building blocks that dividing cells need for new membranes, proteins and nucleic acids. The high uptake of glucose is the basis of **FDG-PET** imaging, which uses a radioactive glucose analogue to show tumours and their metastases.

### Angiogenesis

A tumour cannot grow beyond about 1 to 2 mm in diameter without its own blood supply, because oxygen diffuses only a short distance. Hypoxia stabilises the transcription factor **HIF-1α**, which switches on **VEGF** and other angiogenic factors. The resulting vessels are leaky, tortuous and disorganised. In clear cell renal carcinoma, loss of the *VHL* gene stabilises HIF even in normal oxygen, which is why these tumours are so vascular.

## Invasion and metastasis

**Metastasis**, the spread of tumour to distant sites, is the main cause of death from cancer. It requires a sequence of steps, each of which few cells complete.

1. **Loss of cohesion.** Carcinoma cells normally stick together through **E-cadherin**. Loss of E-cadherin lets cells detach. Many carcinoma cells partly adopt the features of mesenchymal cells (an **epithelial–mesenchymal transition**), becoming more mobile.
2. **Invasion of the basement membrane and stroma.** Tumour cells and the stromal cells around them secrete proteases, such as **matrix metalloproteinases**, that degrade the extracellular matrix. Crossing the basement membrane is what separates an invasive carcinoma from carcinoma in situ.
3. **Intravasation.** Cells enter lymphatic or blood vessels.
4. **Survival in the circulation.** Most circulating tumour cells die. Survivors are protected partly by coating themselves with platelets.
5. **Extravasation and colonisation.** Cells leave the vessel in a distant organ and must then grow there. Many remain dormant for years before growing, which explains late recurrence, for example of breast cancer.

Tumours spread by three main routes:

- **Lymphatic spread**, typical of carcinomas, first to the regional lymph nodes. The first node to receive drainage is the **sentinel node**, sampled in breast cancer and melanoma.
- **Haematogenous spread**, typical of sarcomas but common in carcinomas too. Veins are invaded more easily than arteries. Tumours drained by the portal vein (from the gut) metastasise first to the liver; tumours drained by the systemic veins metastasise to the lungs.
- **Transcoelomic spread** across body cavities, as when ovarian cancer seeds the peritoneum.

The pattern of metastasis is not explained by blood flow alone. Stephen Paget proposed in 1889 that the tumour cell (the "seed") grows only in a compatible organ (the "soil"). Prostate cancer prefers bone, for example, and this preference depends on the interaction between tumour cells and the local environment.

### Avoiding the immune system

The immune system can recognise cancer cells, because mutated proteins produce new antigens. Cancers that become clinically evident have escaped this surveillance. A key mechanism is the use of **immune checkpoints**, the "off switches" that normally prevent T cells from damaging the body. Tumour cells may express **PD-L1**, which binds PD-1 on T cells and switches them off. Antibodies that block PD-1, PD-L1 or CTLA-4 release this brake and have transformed the treatment of melanoma, lung cancer, MSI-high cancers and others ([[immunology/transplant-tumour-immunology]]). Because they release a brake on immunity in general, they can cause autoimmune side effects in almost any organ.

## Tumour growth

Tumour growth is often described by its **doubling time**. A tumour that starts from one cell needs about 30 doublings to contain $10^9$ cells, which is roughly a 1 cm mass weighing 1 g, the smallest size usually detectable clinically. Ten more doublings would give $10^{12}$ cells, about 1 kg, a mass that is often fatal. Most of a tumour's life history is therefore over before it can be found, and a small further number of doublings separates detection from death.

::: widget plot
f: log10(2)*x/d
x: 0, 240
y: 0, 13
sliders: d=4:1:12:0.5
hlines: 9; 12
labels: \log_{10}(\text{cell number})
caption: An idealised tumour growing from one cell with a constant doubling time of $d$ months; the vertical axis shows $\log_{10}$ of the number of cells. The line at 9 marks about $10^9$ cells (about 1 cm, the threshold of clinical detection) and the line at 12 marks about $10^{12}$ cells (about 1 kg). Real tumours slow down as they grow, and cells are lost continuously, so this simplified model overstates speed early on. It shows why most of a tumour's life is invisible.
:::

::: example How fast is this lung nodule growing? {#ex-vdt}
A CT scan shows a solid lung nodule 8 mm in diameter in a 64-year-old woman who smokes. Three months (90 days) later it is 10 mm. Assuming a sphere growing exponentially, calculate its volume doubling time.
::: solution
1. Volume is proportional to diameter cubed, so $V_2/V_1 = (10/8)^3 = 1.953$.
2. For exponential growth, the volume doubling time is $\text{VDT} = \dfrac{t \ln 2}{\ln(V_2/V_1)}$.
3. $\text{VDT} = \dfrac{90 \times 0.693}{3 \ln 1.25} = \dfrac{62.4}{0.669} \approx 93$ days.
4. A volume doubling time below about 400 days is a feature of malignancy in the British Thoracic Society guideline on pulmonary nodules, and 93 days is well within that range. Very short doubling times (weeks) suggest infection or inflammation instead. This nodule needs investigation for lung cancer ([[respiratory/lung-cancer-pleura]]).
5. Note the sensitivity to measurement: a 2 mm change in diameter corresponds to almost doubling in volume, so small errors in measurement matter. Volumetric software is preferred.
:::
:::

## Causes of cancer

The mutations that drive cancer arise from three sources: random errors during DNA replication, which increase with the number of cell divisions; inherited variants; and environmental exposures. Many common cancers are linked strongly to exposures that can be avoided.

**Chemical carcinogens.** Chemical carcinogenesis has two phases. **Initiation** is a permanent change in DNA caused by a mutagen. **Promotion** is the stimulation of proliferation of initiated cells by agents that are not themselves mutagens, such as hormones or chronic irritation. Some carcinogens act directly, such as the alkylating agents used in chemotherapy, which can cause later leukaemias. Most need to be activated by enzymes in the liver or tissues: benzo[a]pyrene from tobacco smoke, **aflatoxin B1** (from a mould on stored grains and nuts, a major cause of liver cancer in parts of Africa and Asia, which causes a characteristic *TP53* mutation), and aromatic amines that cause bladder cancer in dye and rubber workers. Tobacco and alcohol are discussed in [[pathology/environmental-pathology]].

**Radiation.** Ultraviolet B light causes pyrimidine dimers in DNA, leading to skin cancers ([[musculoskeletal/skin-cancer]]). Ionising radiation causes double-strand breaks and chromosomal rearrangements; survivors of the atomic bombs had increased leukaemia and solid cancers, and children exposed to radioactive iodine after the Chernobyl accident developed papillary thyroid cancer.

**Infectious agents.**

| Agent | Cancer | Mechanism in brief |
|---|---|---|
| High-risk human papillomavirus (HPV 16, 18 and others) | Cervical, anal, oropharyngeal and other carcinomas | Viral E6 protein degrades p53; E7 binds and inactivates RB |
| Epstein–Barr virus | Burkitt lymphoma, nasopharyngeal carcinoma, some Hodgkin lymphomas | Viral proteins drive B cell proliferation and survival |
| Hepatitis B and C viruses | Hepatocellular carcinoma | Mainly chronic inflammation, cell death and regeneration, usually with cirrhosis |
| HTLV-1 | Adult T cell leukaemia/lymphoma | Viral Tax protein activates growth genes |
| Human herpesvirus 8 | Kaposi sarcoma, especially with immunosuppression | Viral proteins promote proliferation and angiogenesis |
| *Helicobacter pylori* | Gastric adenocarcinoma, gastric MALT lymphoma | Chronic inflammation; lymphoma may regress after eradication |
| *Schistosoma haematobium* | Squamous carcinoma of the bladder | Chronic inflammation |

::: example Why HPV causes cervical cancer {#ex-hpv}
A 34-year-old woman's cervical screening sample is positive for high-risk HPV, and cytology shows high-grade dyskaryosis. Colposcopic biopsy confirms CIN 3. Explain how a virus can cause cancer, and why most HPV infections do not.
::: solution
1. High-risk HPV types infect the basal cells of the cervical epithelium. In most people the immune system clears the infection within one to two years, so most infections never cause disease.
2. In persistent infection, the viral DNA may integrate into the host genome. This often disrupts the viral gene that normally restrains expression of the oncogenes **E6** and **E7**, so they are made in large amounts.
3. E6 promotes the destruction of **p53**, so the cell no longer stops or dies in response to DNA damage. E7 binds **RB** and releases E2F, so the cell enters S phase without growth signals. Two key tumour suppressors are disabled at once.
4. Genetic instability follows, and additional mutations accumulate. The result is first dysplasia (CIN) and, over years, invasive carcinoma.
5. CIN 3 is treated, usually by excision of the transformation zone, to prevent invasive cancer. The UK HPV vaccination programme and primary HPV screening aim to prevent these changes; screening is discussed in [[pathology/cancer-diagnosis]].
:::
:::

::: history
In 1775 the London surgeon Percivall Pott linked cancer of the scrotum in chimney sweeps to their exposure to soot, the first description of an occupational cancer. In 1889 Stephen Paget proposed the "seed and soil" theory of metastasis after studying the distribution of metastases from breast cancer. In 1911 Peyton Rous transmitted a sarcoma between chickens with a cell-free filtrate, showing that a virus can cause cancer; he received a Nobel Prize in 1966. In 1915 Katsusaburo Yamagiwa and Koichi Ichikawa produced skin cancers by painting coal tar on rabbits' ears, the first experimental chemical carcinogenesis. In 1976 J. Michael Bishop and Harold Varmus showed that the cancer-causing gene of the Rous sarcoma virus is a captured version of a normal cellular gene, establishing the proto-oncogene; they received the Nobel Prize in 1989. Alfred Knudson's two-hit hypothesis (1971) and Hanahan and Weinberg's hallmarks (2000) gave the field its organising ideas.
:::

## Where this leads

The same mechanisms reappear in every organ: colorectal cancer in [[gastrointestinal/gi-bleeding-cancer]], lung cancer in [[respiratory/lung-cancer-pleura]], leukaemias and lymphomas in [[blood/leukaemia]] and [[blood/lymphoma-myeloma]]. How tumours are named, graded, staged and screened for is the subject of [[pathology/cancer-diagnosis]], and how a pathologist detects oncogenes and repair defects in tissue is in [[pathology/diagnostic-pathology]].

::: summary
- A neoplasm is an autonomous, clonal growth that persists after the stimulus has gone; malignant neoplasms invade and metastasise.
- Cancer develops by accumulation of driver mutations in one cell lineage (clonal evolution), as in the adenoma–carcinoma sequence: *APC*, then *KRAS*, then *TP53*.
- Oncogenes are activated proto-oncogenes acting dominantly, through point mutation (*RAS*, *BRAF*), amplification (*HER2*) or translocation (*BCR::ABL1*, *MYC*).
- Tumour suppressor genes need two hits. RB controls the G1/S checkpoint, p53 responds to DNA damage, APC controls β-catenin.
- Failure of DNA repair (mismatch repair, homologous recombination) and epigenetic silencing accelerate carcinogenesis and create treatment targets.
- The hallmarks include sustained proliferation, evasion of growth suppressors and of cell death, immortality, angiogenesis, invasion and metastasis, altered metabolism and immune evasion, enabled by genomic instability and inflammation.
- Metastasis needs loss of cohesion, invasion, entry into vessels, survival and colonisation; spread is lymphatic, haematogenous or transcoelomic.
- About 30 doublings give a detectable 1 cm tumour; most of a tumour's life is invisible.
- Carcinogens include chemicals, radiation and infectious agents such as HPV, EBV, hepatitis B and C and *H. pylori*.
:::

## Exercises

::: exercise Oncogene or tumour suppressor? {level=1}
Classify each as an oncogene or a tumour suppressor gene, and say how it is typically altered in cancer: (a) *KRAS*; (b) *TP53*; (c) *HER2*; (d) *APC*; (e) *MYC* in Burkitt lymphoma.
::: solution
(a) Oncogene, activating point mutation. (b) Tumour suppressor, inactivation of both alleles (often a mutation plus loss of the other allele). (c) Oncogene, amplification. (d) Tumour suppressor, inactivation of both alleles. (e) Oncogene, translocation t(8;14) placing it under an immunoglobulin promoter.
:::
:::

::: exercise Doublings to detection {level=1 check="round(log2(10^9))"}
How many doublings, starting from a single cell, are needed to reach $10^9$ cells? Round to the nearest whole number.
::: solution
$\log_2(10^9) = 29.9$, so about 30 doublings.
:::
:::

::: exercise Routes of spread {level=1}
Give the typical first site of distant spread, and the reason, for: (a) a carcinoma of the colon; (b) a sarcoma of the thigh; (c) a carcinoma of the ovary.
::: solution
(a) The liver, because the colon drains through the portal vein (lymph nodes are usually involved first). (b) The lungs, because sarcomas spread through the blood and the systemic veins drain to the lungs. (c) The peritoneum, by transcoelomic spread across the peritoneal cavity.
:::
:::

::: exercise Volume doubling time {level=2 check="round(60*log(2)/(3*log(1.2)))"}
A lung nodule grows from 10 mm to 12 mm in diameter in 60 days. Assuming a sphere growing exponentially, calculate its volume doubling time in days, rounded to the nearest day.
::: hint
$\text{VDT} = \dfrac{t \ln 2}{3 \ln(d_2/d_1)}$.
:::
::: solution
$\text{VDT} = \dfrac{60 \times 0.693}{3 \ln 1.2} = \dfrac{41.6}{0.547} \approx 76$ days, consistent with malignancy.
:::
:::

::: exercise Two viral proteins {level=2}
Explain how the HPV proteins E6 and E7 each disable one of the cell's main tumour suppressors, and why disabling both is more dangerous than disabling either alone.
::: solution
E6 targets p53 for destruction, so the cell no longer arrests or undergoes apoptosis in response to DNA damage. E7 binds RB and releases E2F, so the cell enters S phase without a growth signal. Together, the cell is driven to divide (through loss of RB) and is unable to stop or die when this produces DNA damage (through loss of p53). Each alone would trigger the other's defence: unscheduled proliferation normally activates p53, which kills the cell. With both disabled, damaged cells keep dividing and accumulate further mutations.
:::
:::

::: exercise Match the treatment to the hallmark {level=2}
For each treatment name the hallmark it targets and the molecular reason it works: (a) a PARP inhibitor in ovarian cancer with a germline *BRCA1* mutation; (b) a PD-1 antibody in MSI-high colorectal cancer; (c) a CDK4/6 inhibitor in oestrogen receptor-positive breast cancer.
::: solution
(a) Genome instability: tumour cells lacking BRCA1 cannot repair double-strand breaks by homologous recombination, and blocking PARP leaves them unable to repair DNA damage, so they die (synthetic lethality), while normal cells with one working *BRCA1* copy survive. (b) Avoiding immune destruction: MSI-high tumours have many neoantigens, and blocking PD-1 releases T cells to attack them. (c) Evading growth suppressors: CDK4/6 inhibitors keep RB active, so E2F stays bound and cells cannot pass the G1/S checkpoint.
:::
:::

::: exercise Interpreting a time course {level=3}
A 60-year-old man's lung nodule is 6 mm on one scan and 6 mm again 12 months later. A colleague says "it has not grown, so it is benign". Using the idea of volume doubling time and measurement error, discuss whether this is justified.
::: hint
Calculate what diameter change a doubling time of 400 days would produce over a year.
:::
::: solution
For a volume doubling time of 400 days, the volume after 365 days would be $2^{365/400} \approx 1.88$ times the original, which corresponds to a diameter increase by a factor of $1.88^{1/3} \approx 1.23$, from 6 mm to about 7.4 mm. A slower-growing cancer, with a doubling time of 600 days, would grow to about 6.9 mm, a change of under 1 mm, which is close to the error of manual measurement. So stable diameter is reassuring but not conclusive for small nodules: some adenocarcinomas, especially part-solid ones, grow very slowly. This is why guidelines use volumetric measurement and set the follow-up interval by nodule type, and why "no growth" is defined over a minimum period.
:::
:::

::: exercise Two patients, one gene {level=3}
Two women each have a breast cancer with a *TP53* mutation. One is 62 and has no family history; the other is 29, her brother had an osteosarcoma at 15 and her mother a brain tumour at 40. Explain how the same gene can be involved in both, what the second case suggests, and why the distinction matters for treatment and family.
::: solution
In the 62-year-old, both *TP53* hits are most likely somatic, acquired in a breast cell over decades as part of ordinary clonal evolution; *TP53* is the most commonly mutated gene in cancer. In the 29-year-old, the young age and the family pattern of sarcoma and brain tumour suggest **Li–Fraumeni syndrome**: a germline *TP53* mutation, with only one further hit needed in any cell. The distinction matters because germline testing would confirm it and allow cascade testing of relatives; people with Li–Fraumeni syndrome are offered intensive surveillance, often including whole-body MRI; and because their cells are sensitive to radiation-induced cancer, radiotherapy and CT exposure are minimised where possible, which can influence surgical choices such as mastectomy rather than breast-conserving surgery with radiotherapy. Decisions follow specialist genetic and oncology guidance.
:::
:::
