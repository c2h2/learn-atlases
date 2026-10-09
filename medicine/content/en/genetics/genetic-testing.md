A genetic test is a hypothesis test with a molecule in the middle. Before any sample leaves the clinic, four questions deserve an answer: what is the clinical question, which mechanism could explain it, which technique can see that mechanism, and in which tissue, and what will you and the patient do with each possible answer. Order the test after those questions and the report is an instrument; order it before them and the report becomes a source of new uncertainty — a variant whose meaning nobody can state, a result that belongs to the whole family, an incidental finding nobody consented to discuss.

This chapter covers the laboratory methods and their resolutions, the language of the report, the categories of testing and their settings — carrier, predictive, prenatal, newborn — and the counselling practice that turns a result into a plan.

## Choosing the technique

::: definition The main technologies, by what they can see {#def-tech}
**Karyotyping** cultures living cells and photographs the chromosomes at band resolution: about 5–10 Mb of DNA. It is the only routine test that sees balanced rearrangements, low-level mosaicism of whole chromosomes and the sex-chromosome complement as an intact picture.
**FISH** (fluorescence in-situ hybridisation) asks about a named sequence with a labelled probe, on fixed or living cells; it answers "is this locus deleted/duplicated/present in this many copies" and is the rapid test for, say, 22q11.2 when the clinical question is specific.
**Chromosomal microarray (CMA)** hybridises DNA to probes across the genome and measures copy number down to tens of kilobases; SNP arrays additionally report regions of homozygosity (which reveal consanguinity or uniparental disomy) and low-level mosaicism. It does not see balanced rearrangements, methylation or repeat size.
**Targeted single-gene and panel testing** (Sanger sequencing, amplicon or hybrid-capture next-generation sequencing) reads specified genes: good for sequence variants and small indels; copy number and deep-intronic changes need add-on analysis.
**Exome sequencing** targets the coding exons of ~20,000 genes; **genome sequencing** reads the whole genome and additionally reaches introns, repeats (with specific analysis), structural variants and mitochondrial DNA, and enables reanalysis without re-running the assay.
**Methylation and imprinting assays** (e.g. MS-MLPA) see parent-of-specific-allele methylation — the test for Prader-Willi/Angelman and Beckwith-Wiedemann/Silver-Russell, where the mechanism is invisible to sequencing. **Repeat-sizing assays** (PCR and Southern blot, or repeat-primed PCR) measure expansion length. **Enzyme and functional assays** measure the phenotype the gene produces; **RNA studies** (transcriptomics from a biopsy) detect spurious splicing when DNA results are ambiguous.
:::

| Question in the clinic | First-line test | Why not the others |
|---|---|---|
| Developmental delay, autism, or multiple congenital anomalies, unexplained | CMA (± Fragile X sizing) | Karyotype misses submicroscopic CNVs; exome second-line in most services |
| Suspected aneuploidy or a balanced translocation with recurrent miscarriage | Karyotype | CMA cannot detect balance; FISH answers only one question |
| Recurrent typical syndrome (e.g. 22q11.2 deletion suspected clinically) | Targeted CMA or FISH | Whole-genome approaches are overkill when the question is one locus |
| Early-onset or strongly suggestive monogenic disease | Gene panel or trio exome/genome | Single-gene testing is efficient only when one gene dominates the differential |
| Acute liver/neurological/metabolic deterioration of unclear cause | Urgent genome sequencing (research/STAT pathway) | Panels miss locus heterogeneity; time matters |
| Fetal anomalies on scan | Karyotype + CMA on amniocytes/CVS | Exome increasingly added when CMA is non-diagnostic (trial-supported) |
| Known familial variant (predictive, prenatal, carrier) | Targeted assay for that variant | Nothing else is informative; genome-wide testing does not replace a targeted question |

::: theorem The test must be able to see the mechanism {#thm-resolution}
A negative test excludes only what the assay's design covers: the class of variant (sequence, copy number, methylation, repeat, rearrangement), the genomic regions it measures, the tissues in which the lesion may be present, and the allele fraction above its limit of detection. Reassuring and false reassurance are separated by this single principle.
:::

::: proof
Each technology has characteristic blind spots, and they do not overlap neatly. A capture-based panel reads exons at depth but is blind to a promoter deletion, a deep-intronic splice variant, repeat expansions, and — because most pipelines suppress them — large structural events unless a copy-number caller is validated for the data. CMA reads copy number across the genome but is blind to anything that does not change dose: a balanced insertion, a point mutation, an imprinting defect, or an expansion. Methylation assays read only the loci on their probe list. Sanger sequencing of a gene with a highly similar pseudogene can report the pseudogene's sequence as if it were the gene. Mosaicism is a fraction problem: a variant at 10% allele fraction is reliably seen by deep sequencing, missed by Sanger, and may be absent from blood entirely if the lineage involved is not haematopoietic. Detection rate is a property of the assay on a population, not of the assay on your patient: even exome sequencing has a ceiling, set by the fraction of Mendelian disease whose genes are known and whose variants are callable — which is why the honest yield of exome in undiagnosed rare disease is around a third to a half, and why a negative result schedules reanalysis rather than closing the book.
:::

::: example The right sample in the wrong place {#ex-tissue}
A 12-year-old has segmental overgrowth of the right leg with vascular malformations, a capillary stain on the thigh, and focal findings on MRI. Two blood samples, sent for a vascular genes panel and then exome, are reported normal.
::: solution
Segmental overgrowth with vascular malformations is typically caused by post-zygotic activating variants in the PI3K–AKT–mTOR pathway (*PIK3CA*, *KCNK3*, *TEK*, *MAP3K3* and others) at low allele fraction, present in affected tissue and often undetectable in leucocytes. The correct sample is affected tissue — lesional skin, resected vascular specimen, or affected fat — examined by deep targeted sequencing able to call variants at 1–5% allele fraction, ideally with a unaffected control tissue for comparison. Blood exome is not a wrong test, it is the wrong specimen for this mechanism (see [[genetics/non-mendelian-inheritance]] on mosaicism): a result is bounded by where the mutation lives. Report practice belongs with the finding: the variant fraction, the tissue, and the depth achieved are part of the interpretation, and a clinical team that receives "negative on blood" should ask "and on which tissue, at what depth?" before accepting reassurance.
:::
:::

## The report's language

::: definition Variant classification {#def-classification}
Sequence variants are reported on a five-point scale: **pathogenic, likely pathogenic, variant of uncertain significance (VUS), likely benign, benign**. Classification weighs population frequency (a variant common enough in controls cannot cause a rare recessive disease), computational and functional prediction, segregation in the family, the property of the gene (a known mechanism: loss of function, gain of function, specific missense hot spots), and case-level evidence — the ACMG/AMP framework. Classification is a judgement with a date and a laboratory attached: the same variant may be reclassified upwards or downwards as evidence accumulates, which is why stored data are reanalysed and why "reclassification" messages arrive years later.
:::

Three report statements require specific literacy. **"Consistent with autosomal recessive inheritance, both parents carry one variant"** means each variant is assumed *in trans*; when phase matters (two variants in one gene in one person), parental testing is what proves it. **"Non-informative negative"** — or "excluded for the tested variant only" — means the relative was tested for one familial change, and the result says nothing about other mechanisms; the classic hazard is a family member reassured about the disease who was only ever tested for one variant. **"Secondary/incidental finding"** — a medically actionable result unrelated to the indication — should appear only where the patient opted in (adult protocols; in children only when relevant to the presenting phenotype).

::: warning A VUS is the beginning of an investigation, not the end, and never a treatment decision
Acting on a variant of uncertain significance — risk-reducing surgery, excluding a relative from screening, labelling a child's epilepsy "genetic" — converts a laboratory ambiguity into a clinical harm. The correct responses are to seek more evidence: phase in the parents, segregation in extended family, RNA or functional data, the matching of a phenotype to a gene's known mechanism, and reanalysis in a year or two. And the correct statement to the family is exactly that: "we do not know yet; here is what would tell us; here is when we will ask again."
:::

::: example A deletion of uncertain significance {#ex-vus}
A 7-year-old with learning difficulty and minor anomalies has a 220 kb copy-number deletion at a gene-poor locus on CMA; the laboratory calls it a VUS. His mother carries the same deletion and has mild learning difficulty; his father is unaffected and there are no other relatives tested.
::: solution
The classification evidence available from this family is modest but real: the deletion segregates with a mild phenotype in a maternally transmitted pattern, the region's gene content may include a haploinsufficient gene, and the population databases may contain a few carriers without full phenotypic description. What this justifies is not a diagnosis but a plan: re-examine the mother and her side of the family with the specific phenotype in mind (was she the "slow learner"? are there affected male relatives? which genes exactly fall inside the deletion, and is any of them established as dosage-sensitive?); request the laboratory to re-evaluate with the segregation data supplied; and — critically — manage the child on his phenotype, which needs speech therapy, educational support and cardiac/renal imaging whatever the deletion means, because a VUS neither creates nor cancels those needs. What the result does change is the family's decision-making, and here honesty about uncertainty is the intervention: the mother's recurrence risk reasoning, any future prenatal request, and the couple's question about their own testing all hinge on the eventual reclassification, so the family should be told in writing that this is an open question with a review date — the opposite of both overclaim and dismissal.
:::
:::

## Categories of testing, each with its own rules

::: definition The taxonomy of genetic testing {#def-categories}
**Diagnostic testing** answers "why does this patient have these features?". **Predictive testing** (presymptomatic) tests an at-risk adult for a known familial variant, typically late-onset disease (Huntington disease, *BRCA*, hypertrophic cardiomyopathy genes). **Carrier testing** looks for recessive variants in healthy people, alone or as couple/preconception screening. **Prenatal testing** diagnoses the fetus (chorion villus sampling from 11 weeks, amniocentesis from 15), distinguished from **prenatal screening** (combined test, cell-free DNA), which stratifies risk only. **Newborn screening** tests every infant for conditions whose early treatment prevents harm. **Pharmacogenetic testing** predicts drug handling (see [[genetics/genomic-medicine]]).
:::

::: theorem Screening versus diagnosis; and who consents {#thm-screening}
A screening test sorts a population into risk groups and is only justified when the condition is important, the test is acceptable, there is a treatment whose early use works, and quality-assured diagnosis and treatment are available; a diagnostic test answers a question about one individual. Screening always needs the possibility of diagnosis behind it, and predictive and antenatal testing in particular carry an ethical duty of non-directiveness: the laboratory supplies facts, the service supplies understanding, and the decisions belong to the patient.
:::

::: proof
Every property of a good screening programme in the classic Wilson–Jungner sense reappears as an operational requirement. The condition must matter clinically — which is why newborn screening panels are bounded by treatment, not by assay multiplexity: the question "what can we measure?" must never outrun "what can we do, early, that works?" The test's sensitivity and specificity determine two distinct harms — missed cases and false alarms — and in a low-prevalence population the false-alarm side dominates: with prevalence near 1 in 5,000 and specificity 99.9%, roughly half of screen-positives are false, so the programme must budget confirmatory capacity and the counsellors' time, not just strips and readers. Early treatment must work: phenylketonuria qualifies because diet prevents disability; conditions without an accepted early intervention have repeatedly been added under parent pressure and withdrawn when the evidence failed. And the diagnosis arm must be able to deliver: a screen-positive child whose metabolic referral waits weeks converts benefit into harm. The same logic disciplines prenatal screening: a contingent model (high-risk screening → offer of diagnostic sampling) works only where diagnostic services and non-directive counselling are resourced; where they are not, the screening programme itself is the harm.
:::

::: widget bayes
mode: test
prevalence: 0.0002
sensitivity: 0.99
specificity: 0.999
caption: A newborn screening test in natural frequencies. Prevalence near 2 in 10,000 with excellent analytical performance still leaves a substantial share of screen-positive infants false — move the prevalence (different conditions differ by two orders of magnitude) and the specificity to see when positive results are mostly real and mostly not. This is why screening programmes are built around confirmatory pipelines and counsellors, and why "you have been screened positive" must be explained immediately as "not affected, until confirmed" rather than as a diagnosis.
:::

## Prenatal and preimplantation pathways

The timeline matters clinically and ethically. **Combined first-trimester test** (nuchal translucency plus biochemical markers, 11–14 weeks) with maternal age gives about 85–90% detection for trisomy 21 at a 5% false-positive rate. **Cell-free DNA** (from 10 weeks) reads placental DNA in maternal plasma: >99% detection at <0.1% false positives for trisomy 21, weaker for 18, 13 and the sex chromosomes, contingent on fetal fraction, and confounded by confined placental mosaicism, vanishing twins and maternal copy-number change or neoplasia. Both are screening. **Diagnostic testing** — chorion villus sampling (11–13+6 weeks) and amniocentesis (from 15 weeks) — carries a procedure-related loss risk around 1–3 in 1,000 in experienced units, and yields fetal cells for karyotype, rapid aneuploidy assay and CMA, with exome sequencing added in selected anomaly cases. **Preimplantation genetic testing** (PGT-M for monogenic disease, PGT-SR for rearrangements, PGT-A for aneuploidy) biopsies trophectoderm cells from Day-5 embryos in an IVF cycle; its limits — mosaicism reports, allele drop-out, and the requirement to have the familial variant known in advance — belong in the consent discussion.

::: example The contingent result {#ex-nipt}
A 33-year-old woman's cell-free DNA at 12 weeks returns "high risk for trisomy 21". The 12-week scan is normal. She wants to book a termination.
::: solution
First, do not treat a screen as a diagnosis — especially this one: at 33 the prior risk is roughly 1 in 400, and even a test with 99% sensitivity and 99.9% specificity gives a positive predictive value around the low eighties per cent at that prevalence; a normal scan lowers but does not erase the probability. Second, explain why the result can be wrong without error — confined placental mosaicism, a co-twin lost early, maternal copy-number variation — and what follows: amniocentesis (preferred over repeat CVS here, because culture of amniocytes interrogates fetal rather than trophoblastic cells) with karyotype and microarray, results in days to two weeks. Third, keep the decision with her: if the fetus is affected, she faces the full menu — continue with antenatal and postnatal planning, continue with comfort-focused care, or end the pregnancy — and the timing of legal limits and of service pathways belongs in this conversation now, not after the diagnostic result. Fourth, address the screen itself: whatever follows, she should leave knowing the cell-free DNA never said the baby had Down syndrome, and that screening exists to expand informed choice, not to make decisions in advance. Document the counselling; book the diagnostic sample; and if the result returns normal, take seriously how common the distress of a false-positive screen is — it is a cost of the programme, not an aberration.
:::
:::

::: example A family asks for an "exome before we decide" {#ex-exome-prenatal}
At 20 weeks, targeted ultrasound shows bilateral renal cystic dysplasia and oligohydramnios. The parents ask whether exome sequencing on amniocytes will "tell us everything".
::: solution
It will tell them something real but bounded. Fetal exome sequencing after a non-diagnostic CMA adds a molecular diagnosis in roughly a quarter to a third of anomaly-affected fetuses, with the yield highest in the combination findings seen here (skeletal, renal, multiple-system ciliopathy-like patterns suggest monogenic causes such as *PKD1/PKD2*, ciliopathy genes, or — for isolated cystic kidneys — *HNF1B* deletions detectable on CMA rather than exome). Bound it honestly: turnaround is weeks, sometimes beyond the decision window for continuation; variants of uncertain significance are common in the prenatal setting and rarely actionable; a negative exome neither excludes a genetic cause nor predicts severity; and interpretation of a *de novo* dominant variant found in a fetus without postnatal phenotype is intrinsically uncertain. The ethical shape must also be discussed before the sample: what results do they want, at what turnaround, who will interpret, and what happens with a VUS? Fetal-medicine, clinical genetics and — where the pathway is neonatal or palliative — neonatal and palliative-care teams all belong in these conversations, and the decision stays with the parents whichever way the sequencing goes.
:::
:::

## Counselling as a clinical skill

::: definition Non-directiveness and its practice {#def-nondirective}
Genetic counselling is a communication process with a technical core: help a person or family (1) understand the medical facts including the range of possible outcomes, (2) understand the way heredity contributes and the risks to relatives, (3) understand the options for management and reproduction, (4) choose the option they judge right **in the context of their own values**, and (5) act on the choice. Non-directiveness means the counsellor's values are not substituted for the patient's — not that facts are withheld, that risks are vague, or that the counsellor has no professional opinion about management.
:::

::: proof
The protocol developed for predictive testing in Huntington disease — and carried across to other adult-onset conditions — is a direct application of the five aims to the psychological hazards of a result that cannot be unsaid. Pre-test counselling establishes the motivation, the personal and family psychiatric history, the understanding that a positive result has no current preventive treatment, the plan for who is told and how, and the insurance and occupational position in the jurisdiction; an interval before the blood sample allows reconsideration; the result is disclosed in person with a support person present, with follow-up scheduled; and a negative result is treated as a psychological event too (survivor guilt, broken family identity when the family's narrative is organised around the disease). Each step exists because an early cohort of clinics learned the failure modes: testing at first request, telephone disclosure, no follow-up, and the assumption that a negative result is simple relief. In practice the protocol also models consent for the genome era: it forces the conversation about what the person does and does not want to know, which returns as the design question for exome and genome sequencing — what to report, to whom, and when.
:::

::: history
The vocabulary of the field is young. "Genetic counselling" was named by Charles Davenport's circle in the 1900s — in a eugenic frame from which the modern specialty has spent a century detaching; Reed's 1947 paper and the first clinics in Kansas City and London began the non-directive, patient-centred practice, and the American Board of Genetic Counseling's first examinations were in the mid-1980s. Victor McKusick's textbooks and, from 1966, the genetics clinic at Johns Hopkins taught medicine to connect pedigree to management. The modern era of testing dates from cytogenetics (the human chromosome number fixed in 1956), to banding, to the first DNA-based prenatal diagnoses of the late 1970s and early 1980s — restriction-fragment studies on cultured amniocytes, and foetal DNA recovered from maternal blood only later — tests small enough that the laboratory ran them by hand and large enough in consequence to require a decade for validation — to the multiple-gene panels, exomes and genomes that made the bottleneck, unmistakably, interpretation and counselling rather than chemistry.
:::

::: quiz
A healthy 25-year-old man's maternal uncle died of haemophilia A; a familial *F8* variant is known. His mother has been tested and is not a carrier; he asks for testing "to be sure". What is the appropriate response?
- [ ] Sequence *F8* in him — full exclusion is the safest answer.
- [x] Explain that with a non-carrier mother and a known familial variant, his prior risk is already very low (rising from residual population and possible maternal germline mosaicism); testing for the familial variant is not indicated, and sequencing would raise more questions than it answers.
- [ ] Test his mother again by a different method.
- [ ] Offer testing only if he has symptoms.
::: solution
Predictive testing is only informative for the variant that runs in the family. His mother's negative result for the known familial *F8* variant reduces his prior risk to something like that of background plus a small allowance for germline mosaicism — at which point sequencing his *F8* cannot answer the actual question and can only produce a VUS to carry for life. The clinic conversation should restate the residual risk in numbers, document it, and revisit if new family information appears (an affected relative, or his mother's own family history changing). Full-gene sequencing as an anxiety-relieving test in a person with a resolved pedigree is a model of the wrong test for the right emotion.
:::
:::

## Where this leads

How the technologies answer specific syndromes is covered throughout [[genetics/chromosomal-disorders]] and [[genetics/mendelian-inheritance]]; mosaicism and tissue choice in [[genetics/non-mendelian-inheritance]]; the classification framework applied to cancer in [[genetics/cancer-genetics]]; predictive testing's ethical frame in [[medical-ethics-law/consent-capacity]]; the statistics behind the screening numbers in [[epidemiology-ebm/diagnostic-tests]]. The next chapter, [[genetics/genomic-medicine]], takes the results into treatment — and into the ethics of the genome as a public good.

::: summary
- Match the technology to the mechanism: karyotype for balance and number, microarray for copy number, sequencing for sequence, methylation assays for imprinting, repeat assays for expansions, functional assays for what genes do — and match the tissue to the lineage the disease lives in.
- No test excludes beyond its resolution: class of variant, regions covered, tissue tested, allele fraction detectable. "Negative" always means "negative for what this assay could see".
- The five-tier classification is a dated judgement, not a fact; a VUS is a scheduled reanalysis, never a treatment decision, and non-informative negatives must be recognised as such.
- Screening sorts populations, diagnosis answers questions about individuals, and a screening programme is judged by the pathway behind the positive result, not by the test in the laboratory.
- Predictive testing follows the Huntington-derived protocol — multiple counselling sessions, reflection interval, in-person disclosure, follow-up for positives *and* negatives — because the result is irreversible and belongs to a family.
- Counselling is non-directive by design: facts are the service's to supply, values the patient's to apply; the consent conversation about what one wants to know is part of the technology, not an obstacle to it.
:::

## Exercises

::: exercise Choosing a test {level=1}
For each, choose the first test: (a) 16-week fetus with a single bright echogenic focus in the left ventricle and normal everything else, low-risk cell-free DNA; (b) 4-year-old with developmental delay and normal examination; (c) adult with a known familial *LDLR* variant seeking assessment; (d) child with episodic weakness and a myasthenic phenotype.
::: solution
(a) No invasive testing: an isolated echogenic focus in a low-risk woman with normal contingent screening changes nothing — the pathway continues with the routine anomaly scan, and parental anxiety is addressed by counselling, not amniocentesis. (b) Chromosomal microarray (with Fragile X testing where indicated by the presentation and sex); exome if the CMA is non-diagnostic. (c) Targeted testing for the known familial *LDLR* variant — nothing else answers the question. (d) Clinical priority is the physiological diagnosis (antibodies, repetitive stimulation, single-fibre EMG); if seronegative with a family history or infantile onset, targeted sequencing of congenital myasthenic syndrome genes (or an exome) follows — the genetic test is chosen after the mechanism (junctional, synaptic, presynaptic) is localised.
:::
:::

::: exercise Reading the numbers on a report {level=1}
A laboratory reports a "detection rate 99.5%; failure rate 2%". In a unit screening 40,000 babies a year, the condition has prevalence 1 in 8,000, with sensitivity 99.5% and specificity 99.95%. Estimate the number of false positives and positives per true case found, and say what the programme must budget for.
::: solution
Of 40,000, 5 affected; 4.98 detected. The 39,995 unaffected give $39{,}995 \times 0.0005 \approx 20$ false positives; with a 2% failure rate a further 800 samples need re-sampling. Positives per true case found $\approx (20 + 5)/5 \approx 5$ — four in five screen-positives are false. The programme must budget: urgent re-sampling capacity for failures; confirmatory biochemical and clinical capacity for ~25 positives a year; a counselling and communication workforce sized to tell 20 sets of parents per year that their well baby is not affected; and outcome tracking so that false negatives (the 0.02 expected missed cases per year, more if the failure or recall pathway leaks) are found when they present clinically. A screening number is a workload forecast in disguise.
:::
:::

::: exercise Residual risk after a negative {level=1 check="0.0016"}
A woman's population carrier risk for a rare recessive condition is 1 in 40. A targeted test detects 96% of carrier alleles in her population. If her test is negative, what is her approximate residual carrier risk?
::: solution
Residual risk $= \dfrac{0.025 \times 0.04}{0.025 \times 0.04 + 0.975} \approx 0.001$, i.e. roughly one in a thousand — formally: prior odds $1/39$, multiplied by the probability of a negative test in a carrier ($1 - 0.96 = 0.04$), giving posterior odds $\approx 1/1560$; stated simply, the risk falls from 1 in 40 to about one in a thousand and a few hundred. The calculation generalises: a negative test divides the risk by the test's detection rate, subtracting almost nothing from a small prior and a great deal from a large one — and it is the number to quote when a couple asks whether a negative panel makes carrier screening pointless.
:::
:::

::: exercise The negative that is not a negative {level=2}
A 30-year-old man's father has a pathogenic *MYH7* variant for hypertrophic cardiomyopathy. The man tests negative for the familial variant and tells his GP "the genetics has cleared me — I can stop cardiology visits". What is correct, and what should the record say?
::: solution
Correct: a negative result for the known familial *MYH7* variant means he did not inherit it (allowing for the small laboratory error and germline mosaicism rates and — critically — assuming the tested variant is the family's true cause, which a laboratory that reports a negative for a variant whose pathogenicity was borderline may revisit). Discharge from surveillance is standard practice after negative predictive testing in HCM, with two conditions: the family variant must genuinely be the causal one (confirm the classification has not been revised), and the result must be communicated with the statement that this removes his *inherited* risk, not his population risk of cardiac disease. The record should state the variant tested, the laboratory, the date, the classification at the time, and the recommendation — discharged from cardiology surveillance on the basis of a negative result for the familial variant, with advice to re-present if symptoms occur. The consultation note that prevents the "cleared me" misunderstanding is one sentence longer than the one that creates it.
:::
:::

::: exercise When to offer an exome {level=2}
Parents of a 2-year-old with global delay, epilepsy and infantile-onset ataxia ask why the "full gene test" was refused when two single-gene tests have already been negative. Explain the reasoning on both sides and state the modern position.
::: solution
Against exome-first (the older discipline): the clinical picture suggests a small set of mechanisms, single-gene tests are cheaper, quicker and easier to interpret, and an exome multiplies VUS and secondary findings, requiring consent for information the parents may not want, and a service able to act on results. For (and this is the position of most guidelines by 2026, supported by randomised trials and national programmes): where the differential spans dozens of genes — and epileptic encephalopathy with ataxia does — exome/genome sequencing has higher diagnostic yield than sequential panels, costs less per diagnosis, returns results before a treatable cause is missed, and ends a diagnostic odyssey whose main costs are trial therapies and family anxiety. The honest synthesis is that exome is now first-line where the presentation crosses gene boundaries, and targeted testing remains right when the phenotype is a syndrome with one usual cause; either way the order requires pre-test consent covering secondary findings, storage and reanalysis, and a team able to counsel the result. The parents' question itself identifies the answer: they have already lived sequential testing; the system's job is to explain what an exome adds and what it cannot promise.
:::
:::

::: exercise Classify it {level=2}
A laboratory finds a heterozygous truncating variant in a gene whose disease mechanism is loss of function. Population frequency 0/280,000 in controls; the child is affected; each parent carries one copy of the "same" rare benign change; the laboratory's software predicts no functional effect because the variant escapes nonsense-mediated decay. Classify with reasoning, and say what one test would most change the classification.
::: solution
The evidence points to pathogenic-or-likely-pathogenic with an important ambiguity: truncating variants in a loss-of-function gene carry strong evidence (PVS1), but PVS1 is downgraded when the truncation escapes nonsense-mediated decay (last exon or escape variants) because the protein may be nearly normal. Absence from controls supports pathogenicity; the software prediction against NMD-mediated consequence is exactly the kind of *in silico* claim that cannot by itself move a classification in either direction. Phase is unresolved from the report — "each parent carries one copy of the same rare change" is suspicious of a benign artefact in that position rather than of disease. The single most informative step: RNA studies (from blood or a relevant biopsy) to see whether the transcript is actually produced and whether the protein is truncated — functional and RNA evidence would decide what prediction cannot. Until then, in a child whose phenotype does not specifically match the gene's syndrome, likely the variant is a VUS — a scheduled reanalysis, not a diagnosis.
:::
:::

::: exercise Design the consent {level=3}
You are writing the consent form for a paediatric genomic sequencing service. List the questions the form must actually put to parents — not signature lines — and justify each by what would go wrong if it were left implicit.
::: solution
Core questions, each defending against a documented failure mode. (1) What might be found beyond the child's condition — secondary/incidental findings: opt in, opt out, or a child-appropriate list (ACMG secondary findings gene list style); implicit coverage produces parents who learn, months later, that you knew something "about their own health" they never agreed to. (2) Whether results for *them* (the parents) may be reported when a variant is inherited: parental carrier states and adult-onset risks arise from a child's test and belong to a consent decision of their own. (3) Storage and reanalysis: is the data held, re-run when knowledge changes, who consents at the child's majority — implicit "no" forfeits the main advantage of sequencing. (4) Data sharing: laboratory partners, research repositories, publication, de-identification limits (a genome is only pseudonymised). (5) Insurance and disclosure context: whether results could affect insurance in the jurisdiction and the family's duties to disclose to relatives. (6) What a VUS means operationally — the family's expectation of certainty, otherwise reclassification calls arrive as betrayal. (7) The right not to know and withdrawal: what withdrawal can and cannot retrieve. A consent form that reads as a signature line rather than as a menu of these seven questions transfers all the foreseeable harms onto the family as surprise — the exact opposite of the specialty's non-directive inheritance.
:::
:::

::: exercise A counselling session in miniature {level=3}
A 34-year-old woman, sister of a man who died at 28 of a *TGFBR2*-related aortic dissection, presents for predictive testing. The familial variant is documented. She is anxious, 7 months into a pregnancy, and her partner wants to "test the baby directly if she's at risk". Structure your management and identify the decision points.
::: solution
Step one, manage her testing as predictive, not urgent-obstetric: pre-test counselling covering her understanding of the condition (vascular care, surveillance, surgical thresholds — because unlike Huntington disease there *is* a preventive pathway), the psychological stakes of a positive result during pregnancy, disclosure arrangements (the deceased brother's parents' and siblings' statuses), and insurance implications; an interval before the sample; in-person disclosure with follow-up. Her anxiety and the pregnancy make the case for doing this quickly but in the correct order — a same-week result without counselling is the error to avoid. Step two, on the fetus: prenatal testing for a late-onset, fully manageable-if-known condition in an ongoing pregnancy is not automatically indicated and is only ethical after her result: if she is negative for the familial variant, fetal testing has no purpose; if positive, fetal testing is defensible chiefly when it changes management in or immediately after the pregnancy — which for *TGFBR2* it generally does not (babies are monitored and treated from childhood, and knowing at birth does not alter neonatal care). The conversation should therefore distinguish "test me, now, and we talk about the baby only if I carry the variant" from the partner's wish to skip a step; and it should name the slippery slope the service must avoid — fetal testing for adult-onset conditions is reserved, in all major guidelines, for cases where there is a medical reason within the reproductive couple's own management. Step three, the practicalities that become the plan regardless of result: her cardiovascular assessment can start in pregnancy (beta-blockade decisions are a cardiology-obstetric conversation), the newborn's examination and the family's cascade map can be prepared, and the baby's own testing deferred to an age at which it acts — documented in the child's record as a decision, not an omission.
:::
:::
