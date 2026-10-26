Most patients never meet a pathologist, yet many of the most important decisions in their care depend on one. Whether a lump is cancer, which kind of cancer it is, whether it has been completely removed, and which drugs it is likely to respond to are all answered by the examination of tissue and cells. This chapter follows a specimen from the moment it leaves the patient to the moment its report is discussed at a multidisciplinary meeting. It then describes the autopsy, the quality systems that keep the process safe, and the arrival of digital pathology.

The concepts that a report expresses, such as grade, stage and predictive markers, are defined in [[pathology/cancer-diagnosis]]. This chapter is about how the pathologist produces them and how a clinician should read them.

## The disciplines of cellular pathology

**Histopathology** is the diagnosis of disease from tissue, where the architecture (how cells are arranged) is preserved. **Cytopathology** is the diagnosis of disease from individual cells or small clusters, without tissue architecture. Both are parts of **cellular pathology**, alongside the **autopsy** (post-mortem examination). Other pathology disciplines, such as clinical biochemistry, haematology and microbiology, analyse body fluids and organisms ([[clinical-skills/laboratory-tests]], [[microbiology/laboratory-diagnosis]]).

## The specimen and the request

The process begins with the clinician. Each specimen must be labelled with at least the patient's full name, date of birth and a unique identifier such as the NHS number, and matched to a **request form** that gives the same identifiers, the site of the specimen, the clinical question and relevant history. Clinical information changes the interpretation: "ulcer in the stomach of a person taking NSAIDs" and "ulcer with weight loss and anaemia" lead the pathologist to look for different things.

Specimens are of several kinds:

- **Biopsies** remove a small sample for diagnosis. A **core needle biopsy** takes a cylinder of tissue with a hollow needle, often guided by ultrasound or CT; an **endoscopic biopsy** takes small fragments of mucosa; a **punch biopsy** takes a cylinder of skin; an **incisional biopsy** removes part of a lesion; and an **excisional biopsy** removes the whole lesion.
- **Resections** remove an organ or part of one, usually to treat a known disease, such as a mastectomy or a colectomy.
- **Cytology** samples consist of cells: fluids, brushings, scrapings and aspirates.

## Fixation and processing

::: definition Fixation {#def-fixation}
**Fixation** is the treatment of tissue to preserve its structure as close as possible to its state in life, by stopping autolysis (self-digestion by the cell's own enzymes) and putrefaction (decomposition by bacteria). The standard fixative is **10% neutral buffered formalin**, a solution of about 4% formaldehyde, which forms cross-links (methylene bridges) between proteins.
:::

Good fixation depends on three things. The specimen must reach fixative quickly, because autolysis begins as soon as the blood supply is cut off; the time from removal to fixation is called the **cold ischaemia time**, and for breast cancer specimens it should be kept within about an hour, because delay degrades the receptors measured for treatment. The volume of fixative should be at least ten times the volume of tissue. And fixation must last long enough: formalin penetrates tissue slowly, and cross-linking takes longer still.

The depth of penetration of a fixative increases with the square root of time:

$$
d = K\sqrt{t}
$$ {#eq-penetration}

where $d$ is the depth in millimetres, $t$ the time in hours and $K$ a coefficient that depends on the fixative and the tissue. For formalin, $K$ is roughly 0.75 mm per square root of an hour (published values vary), so formalin reaches about 3.7 mm in 24 hours. This is why large specimens must be opened or sliced before they are immersed.

::: widget plot
f: k*sqrt(x)
x: 0, 48
y: 0, 8
sliders: k=0.75:0.4:1.2:0.05
hlines: 2; 5
labels: \text{penetration depth (mm)}
caption: Penetration of fixative into tissue over time, $d = K\sqrt{t}$, with $K$ in mm per square root of an hour. The lines at 2 mm and 5 mm mark the centre of a 4 mm slice and of a 10 mm slab. Because depth grows with the square root of time, doubling the thickness of a slab quadruples the time needed to fix its centre. The coefficient is an illustrative value; penetration is also not the same as complete fixation, which takes longer.
:::

::: example Why specimens are sliced {#ex-fixation}
A surgeon removes a kidney containing a tumour and places it whole in formalin. Assume $K = 0.75$ mm per square root of an hour. How long does formalin take to reach the centre of a 10 mm thick slab of tissue, and of a 4 mm thick slice? What happens to a tumour 3 cm below the capsule if the kidney is left intact?
::: solution
1. The centre of a 10 mm slab is 5 mm from each surface: $t = (5/0.75)^2 \approx 44$ hours.
2. The centre of a 4 mm slice is 2 mm deep: $t = (2/0.75)^2 \approx 7.1$ hours.
3. A tumour 30 mm from the surface would need $(30/0.75)^2 = 1600$ hours, more than two months. Long before then it would have autolysed.
4. Autolysed tissue loses nuclear detail and antigens, which can make grading, immunohistochemistry and molecular testing unreliable. This is why large specimens are opened or sliced promptly in the laboratory (or sent fresh by local arrangement), and why fixation protocols specify both a minimum and a maximum fixation time.
:::
:::

After fixation, the pathologist (or a trained biomedical scientist) performs the **macroscopic examination**, also called "cut-up" or "grossing". The specimen is described, measured, photographed if needed, and its surgical margins are painted with coloured inks so that they can be recognised under the microscope. Representative pieces are taken in plastic cassettes. The tissue is then **processed**: water is removed through increasing concentrations of alcohol, the alcohol is replaced by a clearing agent such as xylene, and the tissue is infiltrated with molten paraffin wax and set in a block. A microtome cuts sections 3 to 4 µm thick, which are floated onto glass slides.

The routine stain is **haematoxylin and eosin** (H&E). Haematoxylin stains nuclei blue-purple, because it binds acidic structures such as DNA (they are "basophilic"). Eosin stains cytoplasm, collagen and muscle in shades of pink (they are "eosinophilic"). Most diagnoses are made on H&E alone.

Routine processing takes a day or more. Bone and calcified tissue need **decalcification** in acid or chelating solutions first, which can take days to weeks and damages DNA. The UK Royal College of Pathologists (RCPath) has proposed as a key performance indicator that 80% of histopathology cases are reported within 7 calendar days of the specimen being taken, and 90% within 10 days.

### Frozen section

When a surgeon needs an answer during an operation, tissue can be frozen rapidly and cut in a refrigerated microtome (a cryostat). A **frozen section** gives a diagnosis in about 20 minutes. It is used to confirm that a lesion is malignant before a major resection, to check whether a surgical margin is clear, or to confirm that a biopsy contains diagnostic tissue. Freezing distorts tissue, fatty tissue cuts poorly, and some diagnoses, such as lymphoma or the distinction between some follicular thyroid lesions, cannot be made reliably. Every frozen section is therefore followed by examination of the same tissue after conventional processing.

## Cytopathology

::: definition Cytology samples {#def-cytology}
- **Exfoliative cytology** examines cells shed naturally or scraped from a surface: urine, sputum, pleural and peritoneal fluids, and cervical samples.
- **Fine-needle aspiration** (FNA) uses a thin needle to draw cells from a lump, such as a thyroid nodule, lymph node, breast lesion or, by endoscopic ultrasound, a mediastinal node or the pancreas.
- **Liquid-based cytology** places the sample in a preservative fluid from which a thin, even layer of cells is prepared, allowing additional tests, such as HPV testing, on the same sample.
- A **cell block** is made by spinning down fluid or aspirate and processing the pellet like tissue, so that immunohistochemistry and molecular tests can be performed.
:::

Cytology is fast, cheap and minimally invasive, and an FNA can often be reported within hours. Its main limitation is that it shows cells without their architecture. It can show that cells are malignant, but often not whether a tumour has invaded, and some diagnoses, such as follicular thyroid carcinoma, depend on invasion of a capsule or vessels that cytology cannot see. Results are therefore reported in categories that express both the diagnosis and its certainty; UK thyroid cytology, for example, uses categories Thy1 (non-diagnostic) to Thy5 (malignant). In **rapid on-site evaluation**, a cytopathologist or scientist checks during the procedure that enough diagnostic material has been obtained.

## Special stains

Before antibodies were available, pathologists developed chemical stains that highlight particular substances. Many remain in daily use.

| Stain | What it shows | Typical use |
|---|---|---|
| Periodic acid–Schiff (PAS) | Glycogen, mucin, fungal walls, basement membranes | Fungi, glycogen storage, mucin-secreting carcinoma |
| Ziehl–Neelsen | Acid-fast bacilli (red) | Mycobacteria in granulomas |
| Grocott methenamine silver | Fungal walls (black) | *Pneumocystis*, *Aspergillus* |
| Congo red | Amyloid (apple-green birefringence in polarised light) | Amyloidosis |
| Perls' Prussian blue | Ferric iron (blue) | Haemosiderin, iron overload |
| Reticulin | Reticulin fibres (black) | Liver architecture, marrow fibrosis |
| Masson trichrome | Collagen (blue or green) | Liver and kidney fibrosis |
| Gram | Bacteria (positive purple, negative pink) | Bacteria in tissue |

## Immunohistochemistry

::: definition Immunohistochemistry {#def-ihc}
**Immunohistochemistry** (IHC) uses antibodies to detect specific proteins in tissue sections. The bound antibody is made visible by an enzyme, usually peroxidase, that converts a chromogen such as diaminobenzidine into a brown deposit at the site of the protein. The pattern of staining (nuclear, cytoplasmic or membranous), its intensity and the proportion of cells stained are all assessed.
:::

IHC answers two kinds of questions. **Diagnostic** IHC establishes the **lineage** of a tumour: whether it is a carcinoma, lymphoma, melanoma or sarcoma, and for a carcinoma, its likely organ of origin. **Predictive** IHC measures proteins that guide treatment.

| Marker | Typical positivity |
|---|---|
| Pan-cytokeratin | Carcinomas (epithelial cells) |
| CD45 | Lymphomas and other leucocytes |
| S100, SOX10 | Melanoma, nerve sheath tumours |
| Desmin | Smooth and skeletal muscle tumours |
| CK7 / CK20 | CK7+ CK20−: lung, breast, many others; CK7− CK20+: colorectal; CK7+ CK20+: urothelial, some pancreatic and gastric |
| TTF-1 | Lung adenocarcinoma, thyroid |
| CDX2 | Intestinal adenocarcinoma |
| GATA3 | Breast and urothelial carcinoma |
| PAX8 | Renal, ovarian (serous), endometrial and thyroid tumours |
| WT1, calretinin | Mesothelioma (WT1 also serous ovarian carcinoma) |

::: theorem Interpret immunohistochemistry as a panel {#thm-panel}
No single immunohistochemical marker is completely specific or sensitive for a tumour type. Lineage is assigned from the pattern of a panel of markers, chosen in the light of the morphology and the clinical setting, and including markers expected to be negative as well as positive.
:::

::: proof
Proteins used as markers reflect differentiation programmes, and tumours may express them aberrantly, lose them as they dedifferentiate, or share them across organs. TTF-1 stains both lung and thyroid tumours; GATA3 stains both breast and urothelial carcinomas; some poorly differentiated carcinomas lose cytokeratins; and some melanomas lose S100. Technical factors such as poor fixation or decalcification can weaken staining. A panel turns several imperfect tests into a pattern that is far more specific than any one result, and the expected negatives guard against misinterpretation. The final interpretation always integrates the H&E appearance and the clinical picture.
:::

::: example A liver metastasis of unknown origin {#ex-cup}
A 68-year-old man has several masses in his liver. A core biopsy shows adenocarcinoma. IHC: CK7 negative, CK20 positive, CDX2 positive, TTF-1 negative. What is the most likely primary site, and what should happen next?
::: solution
1. The CK7−/CK20+ pattern, with CDX2 positivity, is typical of **colorectal adenocarcinoma**.
2. TTF-1 negativity argues against lung adenocarcinoma, the other common source of liver metastases in this age group.
3. The pathologist reports the tumour as metastatic adenocarcinoma with an immunophenotype consistent with colorectal origin, and the team arranges colonoscopy and CT to find the primary.
4. The same biopsy can be used for predictive tests: mismatch repair proteins by IHC, and *RAS* and *BRAF* status by molecular testing, because these influence treatment for metastatic colorectal cancer. Tissue is therefore used carefully, ordering only the tests that answer the question.
:::
:::

### Predictive immunohistochemistry

- **Oestrogen and progesterone receptors** in breast cancer are nuclear proteins scored by the proportion and intensity of stained nuclei (for example, with the Allred score). Positive tumours are likely to respond to endocrine therapy.
- **HER2** in breast and gastric cancer is a membrane protein scored 0, 1+, 2+ or 3+. A score of 3+ is positive; 2+ is equivocal and is resolved by in situ hybridisation for gene amplification; 0 and 1+ are negative for classical HER2-targeted treatment, although tumours with 1+ or 2+ without amplification ("HER2-low") may now be eligible for a newer antibody–drug conjugate.
- **PD-L1** is scored as the percentage of tumour cells (tumour proportion score) or of tumour and immune cells (combined positive score), and helps select patients for immune checkpoint inhibitors.
- **Mismatch repair proteins** (MLH1, PMS2, MSH2, MSH6) are nuclear proteins; loss of one pair indicates mismatch repair deficiency, which screens for Lynch syndrome and predicts response to checkpoint inhibitors ([[pathology/cancer-biology]]).

## Molecular pathology

Many treatments now depend on detecting specific genetic changes in a tumour.

- **Polymerase chain reaction** (PCR) amplifies a target sequence and can detect known mutations, such as *EGFR* mutations in lung cancer or *KRAS* mutations in colorectal cancer.
- **In situ hybridisation** uses labelled DNA probes on tissue sections. With fluorescent probes (**FISH**) the pathologist counts signals in each nucleus, for example to detect *HER2* amplification or, with "break-apart" probes, rearrangement of *ALK* in lung cancer.
- **Next-generation sequencing** (NGS) sequences many genes, or even whole genomes, at once, detecting mutations, fusions and amplifications, and measuring tumour mutational burden and microsatellite instability.
- **Liquid biopsy** detects circulating tumour DNA (ctDNA), released from tumour cells into the blood. It can identify targetable mutations when tissue is not available and monitor resistance, but a negative result does not exclude a mutation, because some tumours shed little DNA.

In England, genomic testing is organised through the NHS Genomic Medicine Service, which publishes a National Genomic Test Directory specifying which tests are available for which cancers and inherited conditions ([[genetics/genomic-medicine]]).

::: example A HER2 in situ hybridisation result {#ex-her2}
A breast carcinoma scored HER2 2+ on IHC. Dual-probe in situ hybridisation counted 20 nuclei and gave an average of 6.4 *HER2* signals and 2.0 chromosome 17 centromere (CEP17) signals per nucleus. Is the tumour HER2 amplified?
::: solution
1. Ratio $= 6.4/2.0 = 3.2$.
2. Under the international (ASCO/CAP) criteria used in the UK, a *HER2*/CEP17 ratio of 2.0 or more with an average *HER2* copy number of 4.0 or more per cell indicates **amplification**.
3. Both conditions are met (ratio 3.2, copy number 6.4), so the tumour is **HER2 positive**.
4. This makes her eligible for HER2-targeted therapy, following the multidisciplinary team's recommendation. The equivocal IHC result was resolved by measuring the gene directly, which is why the two techniques are used together.
:::
:::

::: example Will the test see the mutation? {#ex-vaf}
A lung adenocarcinoma biopsy is sent for NGS. The pathologist estimates that 30% of the nucleated cells in the sample are tumour cells; the rest are inflammatory and stromal cells. If the tumour cells carry a heterozygous *EGFR* mutation, what variant allele fraction (VAF) is expected? If the assay can reliably detect variants down to 5%, what is the lowest tumour content at which this mutation would be detected?
::: solution
1. Each tumour cell has two copies of *EGFR*, one mutated, so half the tumour alleles carry the mutation. Normal cells carry none.
2. Expected VAF $= 0.30 \times 0.5 = 0.15$, or 15% (assuming no change in copy number).
3. To reach the 5% limit: tumour fraction $\times 0.5 = 0.05$, so tumour fraction $= 0.10$, or 10%.
4. Below about 10% tumour content, a real mutation could be missed and reported as "not detected". This is why the pathologist selects the area richest in tumour, sometimes cuts it out of the section (macrodissection), and records the tumour content on the request, and why a negative result on a sample with little tumour is reported with that caveat.
:::
:::

## Reading a pathology report

A histopathology report usually has four parts: the clinical details supplied; the **macroscopic description** (what the specimen looked like, its size and weight, the size of the lesion and the blocks taken); the **microscopic description**; and the **conclusion** or diagnosis, often with a diagnostic code. For cancer resections, the Royal College of Pathologists publishes **datasets** that specify which items must be reported. Many reports present these items in a structured (**synoptic**) format. Internationally, the International Collaboration on Cancer Reporting harmonises these datasets.

For a cancer resection, the report typically records:

- the **tumour type** and **grade**;
- the **size** and the **extent** of invasion, giving the pT category;
- **lymphovascular invasion** (tumour within lymphatic or blood vessels) and **perineural invasion**;
- the **margins**: whether tumour reaches a margin, and if not, the distance to the nearest one in millimetres;
- the **lymph nodes**: the number examined and the number involved, and whether the tumour extends beyond the node capsule, giving the pN category;
- the **pathological stage** (pTNM, with the edition of TNM used);
- **biomarker** results, which may follow in a supplementary report.

::: definition Margins and sentinel nodes {#def-margins}
- A **resection margin** is the cut surface of a specimen. It is **involved** (positive) if tumour is present at the margin, which suggests that tumour may remain in the patient. The completeness of resection is summarised as **R0** (no residual tumour), **R1** (microscopic residual tumour) or **R2** (macroscopic residual tumour). What counts as a clear margin differs by tumour type: for some it means no tumour at the ink, for others a minimum distance.
- The **sentinel lymph node** is the first node or nodes to receive lymphatic drainage from a tumour, identified by injecting a radioactive tracer, dye or magnetic particles near the tumour. If the sentinel node is free of tumour, the other nodes are very unlikely to be involved, so a full lymph node dissection, with its risk of lymphoedema, can be avoided. It is standard in early breast cancer and melanoma.
:::

::: example Reading a breast cancer report {#ex-report}
A 57-year-old woman has a wide local excision and sentinel node biopsy. The report reads: "Invasive carcinoma of no special type, grade 2, 18 mm. Lymphovascular invasion not identified. Nearest invasive margin 3 mm (inferior). Sentinel lymph nodes: 0/2 involved. ER positive (Allred 8/8), HER2 negative (IHC 1+). pT1c pN0(sn)." Explain what this means.
::: solution
1. **Invasive carcinoma of no special type** is the commonest breast cancer, formerly called invasive ductal carcinoma.
2. **Grade 2** is intermediate differentiation (Nottingham score 6 or 7).
3. **18 mm** places the tumour in pT1c (over 10 mm and up to 20 mm).
4. **No lymphovascular invasion** and **two negative sentinel nodes** (pN0(sn)) indicate that spread to lymph nodes is unlikely, so further axillary surgery is not needed.
5. The **margin of 3 mm** shows that the tumour was completely removed; UK consensus guidance from the Association of Breast Surgery regards a radial margin of at least 1 mm as adequate after breast-conserving surgery, so re-excision is not needed.
6. **ER positive** with a maximal Allred score predicts benefit from endocrine therapy. **HER2 1+** is negative for classical HER2-targeted treatment.
7. The multidisciplinary team will combine these factors to recommend adjuvant treatment, typically radiotherapy to the breast after breast-conserving surgery and endocrine therapy, with chemotherapy considered according to the estimated benefit ([[surgery/breast-endocrine-surgery]]).
:::
:::

::: warning A negative biopsy is only as good as the sample
A biopsy shows only the tissue that was taken. A benign result from a small sample of a lesion that looks malignant on imaging may reflect a **sampling error**: the needle missed the tumour. The pathologist cannot know what was not sampled. Results must therefore be correlated with clinical and imaging findings; this is formalised in "triple assessment" for breast lumps (clinical examination, imaging and biopsy). When the three disagree, the discordance is discussed at the multidisciplinary meeting and the biopsy is usually repeated. The same logic applies to cytology reported as "non-diagnostic", which means insufficient material, not a normal result.
:::

## The multidisciplinary team

In the UK, every new cancer diagnosis is discussed by a **multidisciplinary team** (MDT), which includes surgeons, oncologists, radiologists, pathologists, specialist nurses and others. The pathologist presents the diagnosis, the grade and stage, the margins and the biomarkers, and highlights uncertainties. Discussion often reveals discrepancies between clinical, imaging and pathological findings, which can prompt review of the slides or further tests. The team's recommendation is then discussed with the patient, whose preferences shape the final decision.

## Quality and safety

The laboratory process has many steps, each a possible source of error: wrong labelling, a fragment of tissue from another patient carried over in processing (a "floater"), misinterpretation, a missed small focus of cancer, or a report that does not reach the clinician. Safeguards include:

- **positive patient identification** at every step, with barcoded specimens and slides;
- **internal quality control** of staining, with control tissue on each slide for IHC;
- **external quality assessment** schemes, such as UK NEQAS, which send the same material to many laboratories and compare results;
- **accreditation** of laboratories against the international standard ISO 15189 by the United Kingdom Accreditation Service (UKAS);
- **second opinion** and double reporting for difficult or high-stakes cases, and review at MDT meetings;
- systems to ensure that significant and unexpected results are communicated directly to the responsible clinician.

When an error is found, the report is amended, the clinician is informed, and the incident is investigated and disclosed to the patient under the professional duty of candour ([[clinical-skills/patient-safety]]).

## The autopsy

An **autopsy** (post-mortem examination) is a systematic external and internal examination of a body after death, with sampling for histology, microbiology and toxicology as needed. In England and Wales there are two kinds:

- A **hospital (consented) autopsy** is requested by clinicians, with the consent of the next of kin, to understand the disease, check the accuracy of diagnosis, assess the effect of treatment, and for teaching and research. Removal and retention of tissue are governed by the Human Tissue Act 2004 (in Scotland, the Human Tissue (Scotland) Act 2006), introduced after the discovery that organs had been retained without consent, and autopsy premises are licensed by the Human Tissue Authority.
- A **coroner's autopsy** is ordered by the coroner, an independent judicial officer, when a death is sudden and the cause unknown, violent or unnatural, occurred in state detention, or meets other criteria. Consent of the family is not required, although their views are respected.

Since 9 September 2024, all deaths in England and Wales that are not referred to the coroner must be reviewed by an independent **medical examiner**, a senior doctor who scrutinises the medical records, speaks to the attending doctor and the bereaved family, and agrees the cause of death before it is registered. The system was introduced after inquiries such as that into the murders committed by the general practitioner Harold Shipman, which showed how weak death certification had been.

Hospital autopsy rates have fallen steeply in many countries. Yet autopsy studies continue to find that a meaningful proportion of deaths have a major diagnosis that was missed or wrong during life. Less invasive methods, using post-mortem CT or MRI with targeted biopsies, are increasingly used where a full autopsy is not acceptable to the family.

## Digital pathology and artificial intelligence

In **digital pathology**, glass slides are scanned at high resolution to produce whole-slide images, which pathologists read on screens. This allows remote reporting, faster second opinions and easier teaching, and many NHS laboratories have adopted it. Digital images also make it possible to apply **artificial intelligence** algorithms, for example to flag likely cancer in prostate biopsies, count mitoses or score biomarkers. Some such tools have regulatory approval as aids to the pathologist. Their safe use requires validation on local cases, awareness that algorithms may perform worse on populations or staining methods unlike those they were trained on, and a pathologist who remains responsible for the diagnosis.

::: quiz
A metastatic carcinoma in a lymph node is CK7 positive, CK20 negative, TTF-1 positive and GATA3 negative. Which primary site is most likely?
- [ ] Colorectum
- [x] Lung
- [ ] Breast
- [ ] Urinary bladder
::: solution
CK7 positivity with CK20 negativity fits lung, breast and several other sites. TTF-1 positivity points to lung adenocarcinoma (or thyroid), and GATA3 negativity argues against breast and urothelial carcinoma. Colorectal carcinoma is usually CK7 negative and CK20 positive.
:::
:::

::: history
Johannes Müller published a microscopic study of tumours in 1838, and his student Rudolf Virchow made the microscope the central instrument of pathology. In 1905 Louis B. Wilson at the Mayo Clinic introduced a rapid frozen section method that let surgeons receive a diagnosis during an operation. In 1941 Albert Coons and colleagues labelled antibodies with a fluorescent dye and used them to locate antigens in tissue, the beginning of immunohistochemistry; enzyme-labelled methods visible with an ordinary microscope followed in the 1960s and 1970s. Kary Mullis devised the polymerase chain reaction in 1983, for which he shared the Nobel Prize in Chemistry in 1993; it made molecular pathology on small biopsies possible. In England and Wales, the statutory medical examiner system began on 9 September 2024.
:::

## Where this leads

Every organ system course draws on the techniques described here, especially in its cancer chapters. Genomic testing of tumours and of inherited predisposition is developed in [[genetics/genetic-testing]] and [[genetics/genomic-medicine]]. Death certification and the law are discussed in [[medical-ethics-law/end-of-life-ethics]], and the laboratory side of infection diagnosis in [[microbiology/laboratory-diagnosis]].

::: summary
- Histopathology examines tissue with its architecture; cytopathology examines cells without it. Both depend on correct labelling and clinical information.
- Formalin fixation cross-links proteins and stops autolysis. Penetration depth rises with the square root of time, so large specimens must be sliced; cold ischaemia time must be short.
- Tissue is processed into paraffin blocks, cut at 3 to 4 µm and stained with H&E. Frozen sections give intraoperative answers in about 20 minutes but are less reliable.
- Cytology (exfoliative, FNA, liquid-based, cell blocks) is fast and minimally invasive but often cannot assess invasion.
- Special stains detect organisms, mucin, amyloid, iron and fibrosis.
- Immunohistochemistry determines lineage (interpreted as a panel) and predictive markers (ER, PR, HER2, PD-L1, mismatch repair proteins).
- Molecular pathology (PCR, FISH, NGS, ctDNA) detects targetable changes; adequate tumour content is essential.
- A cancer report gives type, grade, size, invasion, lymphovascular invasion, margins, nodes, pTNM and biomarkers, often using RCPath datasets. Sentinel node biopsy avoids unnecessary node dissection.
- Results are integrated at the multidisciplinary team meeting. Quality depends on identification, EQA, ISO 15189 accreditation and second opinions.
- Autopsies are consented (hospital) or coroner's; medical examiners have reviewed all non-coronial deaths in England and Wales since 9 September 2024.
:::

## Exercises

::: exercise Fixation time {level=1 check="4"}
Using $d = K\sqrt{t}$ with $K = 0.75$ mm per square root of an hour, how many hours does formalin take to penetrate 1.5 mm? Give the exact value.
::: solution
$t = (1.5/0.75)^2 = 2^2 = 4$ hours.
:::
:::

::: exercise Choose the stain {level=1}
Which special stain would you request to show: (a) mycobacteria in a granuloma; (b) amyloid in a kidney biopsy; (c) iron in a liver biopsy; (d) fungal hyphae in a lung biopsy; (e) collagen in a liver biopsy?
::: solution
(a) Ziehl–Neelsen. (b) Congo red, examined in polarised light. (c) Perls' Prussian blue. (d) Grocott methenamine silver, or PAS. (e) Masson trichrome (or Sirius red).
:::
:::

::: exercise HER2 ratio {level=1 check="2.4"}
In dual-probe in situ hybridisation, the average *HER2* signal count is 4.8 per nucleus and the CEP17 count is 2.0. Calculate the *HER2*/CEP17 ratio. Give the exact value.
::: solution
$4.8/2.0 = 2.4$. With a ratio of 2.0 or more and an average *HER2* copy number of 4.0 or more, the tumour is amplified.
:::
:::

::: exercise Expected allele fraction {level=2 check="0.2"}
A tumour sample contains 40% tumour cells, which carry a heterozygous *KRAS* mutation with no copy number change. What variant allele fraction (as a decimal) is expected? Give the exact value.
::: solution
$0.40 \times 0.5 = 0.20$.
:::
:::

::: exercise Frozen section: when and when not {level=2}
For each situation, say whether a frozen section is appropriate and why: (a) confirming carcinoma in a lung nodule before lobectomy, when previous biopsy was not possible; (b) diagnosing a suspected lymphoma in an enlarged lymph node; (c) checking the bile duct margin during a pancreatic resection; (d) a 3 mm skin lesion suspected of being melanoma.
::: solution
(a) Appropriate: a malignant diagnosis justifies the lobectomy during the same operation. (b) Not appropriate for definitive diagnosis: lymphoma classification needs well-fixed tissue, immunohistochemistry and often molecular tests; a frozen section may confirm that diagnostic tissue has been obtained, and fresh tissue can be sent. (c) Appropriate: a positive margin may lead the surgeon to resect more duct. (d) Not appropriate: freezing a small melanocytic lesion distorts it and may use up the tissue needed for accurate measurement of thickness, which determines staging.
:::
:::

::: exercise Consent and the coroner {level=2}
A 45-year-old man dies suddenly at home with no known illness. His family do not want a post-mortem examination. An 82-year-old woman dies in hospital from known metastatic lung cancer, and her consultant would like to know whether she also had a pulmonary embolism. Explain who decides whether an autopsy takes place in each case.
::: solution
The sudden unexplained death of the man must be reported to the **coroner**, who decides whether a post-mortem examination is needed to establish the cause of death; family consent is not required, although the coroner considers their views and less invasive methods may be used. The woman's death has a known natural cause, so it is reviewed by the **medical examiner** and is not normally referred to the coroner. An autopsy to answer the consultant's question would be a **hospital autopsy**, which requires the consent of the next of kin under the Human Tissue Act 2004. If they decline, it cannot proceed.
:::
:::

::: exercise A discordant biopsy {level=3}
A 49-year-old woman has a 2 cm breast mass that feels hard and irregular. Mammography and ultrasound show a spiculated lesion highly suspicious for cancer. An ultrasound-guided core biopsy shows benign fibrous tissue and fat. Explain how to interpret this result and what should happen next.
::: hint
Think about triple assessment.
:::
::: solution
This is **discordant triple assessment**: clinical and imaging findings are strongly suspicious, but the biopsy is benign. The most likely explanation is a sampling error, in which the needle sampled tissue near the lesion rather than the lesion itself; some cancers, especially lobular carcinomas, also have little cellularity and can be hard to sample. A benign result cannot be accepted in this situation. The case should be discussed at the breast multidisciplinary meeting, the imaging and the position of the biopsy reviewed, and a repeat biopsy performed, for example with more cores or by vacuum-assisted biopsy, or the lesion excised for diagnosis. The general principle is that the pathologist can only report what is in the sample, and that correlation with clinical and imaging findings is part of interpreting every biopsy.
:::
:::

::: exercise Too little tumour {level=3}
A small bronchoscopic biopsy of a lung adenocarcinoma contains about 8% tumour cells. NGS reports "no *EGFR* mutation detected". The oncologist asks whether the patient can be considered *EGFR* wild type. Using variant allele fraction, explain the answer and suggest what can be done.
::: solution
With 8% tumour cells and a heterozygous mutation, the expected variant allele fraction is $0.08 \times 0.5 = 0.04$, or 4%, below a typical detection limit of about 5%. A real mutation could therefore have been missed, and the result should be interpreted as "not detected in a sample of low tumour content", not as confirmed wild type. Options include re-testing a block or area richer in tumour after macrodissection, using a more sensitive targeted PCR assay, testing circulating tumour DNA in the blood (a positive result would be actionable, although a negative one would not exclude a mutation), or obtaining a new biopsy. The decision matters because *EGFR*-mutant lung cancer is treated with targeted drugs that are more effective than chemotherapy or immunotherapy as a first choice.
:::
:::
