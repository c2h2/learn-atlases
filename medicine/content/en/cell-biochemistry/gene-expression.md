A human cell reads about ten thousand of its twenty-odd thousand protein-coding genes at any moment, chooses which ones to read by the chromatin it has assembled and the transcription factors it contains, splices many of the resulting transcripts in more than one way, edits a few of them, translates them at a rate set partly by the messenger RNAs themselves, and destroys the products on a schedule written into their sequences. Almost every step of that pipeline has a disease, and an increasing number have drugs.

This lesson follows the information: DNA to DNA (replication and repair), DNA to RNA (transcription and its regulation), RNA to protein (translation), and the layers between — splicing, editing, epigenetic marks and non-coding RNAs — where most of the interesting clinical genetics now lives.

## DNA, chromatin and what a gene is

DNA is a double helix with A paired to T and G to C, the two strands antiparallel, and the sequence read 5′ to 3′. Because the strands are complementary, each is a template for the other — the physical basis of heredity, of PCR, and of the mutation being a change in one strand that becomes permanent only after replication.

In the nucleus DNA is not naked. It is wrapped in nucleosomes (147 base pairs around an octamer of H2A, H2B, H3 and H4), separated by linker DNA bound by histone H1, folded into higher-order structure, and attached at the nuclear periphery by lamins. The position of nucleosomes, which is a heritable property of a promoter, determines whether transcription factors can bind at all. "Open" chromatin with nucleosome-depleted promoters and active marks is **euchromatin**; densely packed, methylated, transcriptionally silent DNA is **heterochromatin** — the visible Barr body being an entire chromosome in that state.

A **gene** is a locus whose transcript has a function, which includes the great majority of the human transcriptome:

- **Protein-coding genes**: exons interrupted by introns, with untranslated 5′ and 3′ regions (which are anything but unimportant: they carry regulatory motifs, microRNA target sites and, for haemoglobin, iron-responsive elements), a promoter with core elements such as the TATA box and CpG islands, and enhancers that may lie hundreds of kilobases away and act by chromatin looping.
- **Non-coding RNA genes**: transfer and ribosomal RNA, small nuclear and nucleolar RNAs, microRNAs, long non-coding RNAs such as **XIST**, and circular RNAs.
- **Pseudogenes**, repeats, and structural elements such as insulators (CTCF-bound), whose disruption causes disease by moving a boundary (for example, the α-globin locus).

::: definition Classes of disease-causing DNA change {#def-mutation}
**Point substitutions**: missense (amino-acid change), nonsense (a stop codon), silent/synonymous (no change), splice-site (the consensus GT–AG dinucleotides and branch point), and untranslated-region changes. **Small insertions or deletions**: frameshift unless a multiple of three; in-frame deletion of a codon (as ΔF508). **Copy-number and structural change**: deletions, duplications, inversions, translocations, and the fusion genes they create (BCR-ABL1, PML-RARA, EWSR1-FLI1). **Repeat expansion**: trinucleotide and tetranucleotide repeats with instability and anticipation. **Epigenetic change**: abnormal methylation or imprinting with a normal sequence.
:::

::: warning A genetic report is not a diagnosis
A laboratory result says what was found in the region sequenced, and each variant is classified from population frequency, computational prediction, functional data and segregation — with "variant of uncertain significance" meaning that the laboratory cannot yet tell. The clinical question is different: does this change explain *this* phenotype, in this inheritance pattern, with this family history? Before acting, check (i) whether the gene and its mechanism fit the disease, (ii) whether the second allele is accounted for in a recessive condition, (iii) whether the finding has been seen in an unaffected relative or in a control population, and (iv) whether a specialist clinical genetics opinion and, if needed, testing of parents or tissue confirmation is required. Acting on an unclassified variant — for instance, offering a reproductive decision or an irreversible operation — is the error; and the reverse error, discarding a finding because the phenotype is atypical, loses diagnoses in about a fifth of exome-negative cases that are reanalysed over time.
:::

## Replication, and the cost of copying

Replication is semiconservative and starts at many origins. Helicase unwinds, single-strand binding proteins protect, primase makes RNA primers, DNA polymerase ε and δ extend (only 5′→3′, hence the leading and discontinuous lagging strands with Okazaki fragments), flap endonuclease and ligase tidy up, and topoisomerases relieve supercoiling ahead of the fork. Telomerase, a reverse transcriptase using its own RNA template, maintains the telomeric ends lost in every division; it is active in germline and stem cells and re-acquired in most cancers.

Three facts make fidelity possible: base selection, 3′→5′ exonuclease proofreading, and post-replicative repair. Yet about one new nucleotide change arises per $10^{8}$ bases copied, so each of us carries dozens of new variants; the balance between mutation, repair and clonal selection is the subject of cancer genetics ([[genetics/cancer-genetics]]).

| Repair system | What it fixes | Disease when it fails | Therapeutic angle |
|---|---|---|---|
| Direct reversal | Alkyl groups (MGMT), pyrimidine dimers partially | Temozolomide resistance when MGMT is expressed | MGMT promoter methylation predicts alkylator response in glioma |
| Base excision repair | Deamination, oxidation, uracil | MUTYH-associated polyposis | PARP inhibition exploits repair dependence |
| Nucleotide excision repair | Bulky adducts, UV dimers | Xeroderma pigmentosum (skin cancer), Cockayne, trichothiodystrophy | – |
| Mismatch repair | Replication slippage and mispairs | Lynch syndrome (colorectal, endometrial); microsatellite instability | Checkpoint inhibitors in MSI-high tumours |
| Homologous recombination | Double-strand breaks, in S/G2 | BRCA1/2 breast–ovarian; ataxia-telangiectasia (ATM); Fanconi anaemia | Synthetic lethality with PARP inhibitors; platinum sensitivity |
| Non-homologous end joining | Double-strand breaks, any phase | Severe combined immunodeficiency (Artemis, DNA-PKcs), radiosensitivity | – |

Drugs aimed at these enzymes are among the most used in medicine: antifolates (methotrexate) and fluoropyrimidines (5-fluorouracil) and cytosine analogues disturb thymidylate synthesis; hydroxycarbamide and cytarabine block replication; etoposide and irinotecan trap topoisomerases; platinum agents crosslink DNA and rely on the cell's failure to repair; bleomycin breaks strands. The therapeutic window is the difference in repair capacity and division rate between tumour and tissue — hence the shared toxicities of bone marrow, gut mucosa and hair follicles, and the teratogenicity of almost all of them.

## Transcription and the regulation of which genes are read

RNA polymerase II transcribes mRNA with the help of the general transcription factors (TFIID containing TBP binds the core promoter, then TFIIA, B, E, F, H, the last with helicase and kinase activity that phosphorylates the C-terminal heptad repeats of the polymerase, releasing it into elongation). The cap is added almost immediately; the poly(A) tail at the 3′ end is added after cleavage, and both determine how long an mRNA survives and how efficiently it is translated.

**Splicing** removes introns by recognizing the 5′ splice site (usually GT), the branch point adenosine, the polypyrimidine tract and the 3′ splice site (AG), with the U1, U2, U4/U6 and U5 small nuclear ribonucleoproteins assembling and rearranging the spliceosome; the intron leaves as a lariat. Two consequences are clinically central:

1. **About a fifth to a quarter of disease-causing point mutations act on splicing** — creating a new splice site, destroying one, or disrupting an enhancer sequence (splicing factors such as SRSF2 and U2AF1 are themselves mutated in myeloid neoplasms). The β-thalassaemias show all the classes, including the common IVS-I-110 and IVS-II-654 intronic variants and the cryptic-site mutations that produce a partially normal mRNA.
2. **Alternative splicing is a regulatory layer and a therapeutic target.** A single gene yields different proteins in different tissues; the survival-motor-neuron gene *SMN1* has a nearly identical paralogue, *SMN2*, which differs by a single nucleotide that causes exon 7 to be skipped in about 90% of its transcripts. Antisense oligonucleotides that bind the *SMN2* pre-mRNA and restore exon 7 inclusion (nusinersen, and the related approach of risdiplam given orally) convert *SMN2* into a functional copy of *SMN1* and have changed the outcome of spinal muscular atrophy — the clearest demonstration that a "splicing disease" can be treated by editing splicing.

Transcription is regulated by **transcription factors** with common DNA-binding modules (zinc fingers, helix-loop-helix and leucine-zipper dimers, nuclear-receptor domains) acting through enhancers and looping, and by **chromatin state**: histone acetylation generally opens chromatin (and histone deacetylase inhibitors are used in T-cell lymphoma), while methylation marks have position-dependent meanings (H3K4me3 at active promoters, H3K27me3 for Polycomb repression, H3K9me3 and DNA methylation at CpG for stable silencing). DNA methylation of promoter CpG islands is the heritable mark that underlies **imprinting** (see [[genetics/non-mendelian-inheritance]]), X-inactivation, and the stable gene silencing of development and of cancer.

**Small RNAs** add another level. MicroRNAs, processed by Drosha and Dicer and loaded into Argonaute, base-pair with target 3′UTRs and reduce protein output; a single microRNA can tune hundreds of mRNAs, and loss of a microRNA cluster (for example miR-15/16 on 13q14, deleted in many chronic lymphocytic leukaemias) or of a target site (the poly(A) signal and 3′UTR mutations that cause disease) has real phenotypes. Synthetic **small interfering RNA** exploits the same machinery: patisiran and vutrisiran silence transthyretin in the liver, given intravenously and subcutaneously respectively, with effects lasting months — an example of a drug class that came directly from Fire and Mello's discovery of RNA interference.

::: definition Epigenetic inheritance {#def-epigenetic}
**Epigenetic** mechanisms transmit a pattern of gene activity through cell division without changing the DNA sequence: CpG methylation, histone modification and chromatin state, and the non-coding RNAs that maintain them — and, in the germ line, **imprinting**, by which an allele is marked according to the parent it came from so that only one copy is expressed. These patterns are established in early development, maintained by DNA methyltransferases, partly erased and re-established in the germ line, and can be disturbed by deletion of an imprinting centre, by uniparental disomy, by a mutation in a *cis* control region, or by a mutation in the machinery itself (*DNMT3B*, *MECP2*, *ZBTB24*).
:::

## Translation

The code is triplet, non-overlapping, degenerate (61 sense codons, 20 amino acids, with most third-position variation silent), and read 5′→3′ from a start AUG. Wobble pairing at the third base explains why fewer than 61 transfer RNAs are needed, and codon usage and transfer-RNA abundance influence how fast a message is translated. The mitochondrial code differs slightly, which matters when interpreting mitochondrial variants and when assigning a variant to the nuclear or mitochondrial genome.

Initiation is the regulated step: eukaryotic initiation factors assemble the 43S complex, the 40S subunit scans from the 5′ cap to the AUG in a favourable Kozak context, and the 60S subunit joins. Phosphorylation of eIF2α by the kinases that sense double-stranded RNA, amino-acid starvation, haem deficiency and endoplasmic reticulum stress globally reduces initiation while allowing specific messages (ATF4) to be translated better — the integrated stress response. Many viruses bypass the control entirely, using an internal ribosome entry site or by shutting down host cap-dependent translation (as poliovirus does by cleaving eIF4G).

Elongation uses eEF1A (GTP, aminoacyl-transfer-RNA delivery) and eEF2 (translocation), and termination occurs when release factors eRF1 and eRF2 recognise a stop codon. Clinical correlations:

- **Diphtheria toxin** and **exotoxin A of *Pseudomonas*** inactivate elongation factor 2 by ADP-ribosylation.
- **Aminoglycosides** bind bacterial 16S rRNA, cause misreading and block translocation — the reason they are bactericidal, and (via the related mitochondrial ribosome) partly why they are ototoxic and nephrotoxic; **tetracyclines**, **macrolides**, **chloramphenicol**, **clindamycin**, **oxazolidinones** and **lincosamides** all target the bacterial ribosome at defined sites, and the bacterial ribosome's resemblance to the mitochondrial one underlies several of their adverse effects with prolonged use (linezolid and chloramphenicol causing lactic acidosis, neuropathy and marrow suppression).
- **Nonsense mutations** can be read through by certain aminoglycosides and by ataluren (which shows selectivity for premature stop codons in some *DMD*, *CFTR* and other nonsense genotypes), with modest and genotype-specific benefit — an active research area rather than a routine therapy.
- **Ribosomopathies** such as Diamond–Blackfan anaemia show that ribosomal protein haploinsufficiency is not simply a growth problem: it stabilises p53 and deletes specific lineages, which is why the phenotype is tissue-selective and sometimes improves with age.

Newly made chains fold co-translationally with chaperones and are targeted by the signal-recognition-particle route described in [[cell-biochemistry/cell-structure]]; the ubiquitin–proteasome and autophagy systems then decide their half-life. Post-translational modification — glycosylation, phosphorylation, myristoylation, prenylation, γ-carboxylation, hydroxylation — completes the product, and its failures form a large group of congenital disorders of glycosylation and the drug-induced syndromes of vitamin K or C deficiency.

::: example Four patients, one gene, four mechanisms {#ex-thal}
All four patients have reduced β-globin output and a microcytic anaemia with raised HbA₂. (i) A nucleotide change in the TATA box region of the promoter; (ii) an intron 1 GT→AT change; (iii) a G→A at codon 39 creating a stop; (iv) a five-base deletion in exon 1. Predict the amount of β-globin mRNA and protein in each, and which is most likely to be "intermedia" rather than "major".
::: solution
(i) Promoter mutations reduce transcription efficiency but do not abolish it: some normal mRNA is made, so the phenotype is usually β⁺-thalassaemia and often thalassaemia intermedia, particularly when only a modest reduction is produced. (ii) A splice-donor change causes aberrant or absent splicing; unspliced transcript is largely retained and degraded, and the phenotype depends on how much correct splicing survives — often severe, sometimes intermediate with leaky splicing. (iii) A nonsense codon creates a premature termination codon, and the transcript is destroyed by nonsense-mediated decay, so little mRNA and no protein: β⁻ (null), severe. (iv) A frameshift also triggers nonsense-mediated decay or makes an unstable truncated protein, and is again severe. The general principle — nonsense-mediated decay degrades messages with premature stop codons upstream of the last exon junction, so "nonsense" and "frameshift" behave as null alleles while promoter and leaky splice variants produce a graded phenotype — is the reason genotype predicts severity in β-thalassaemia better than in most single-gene diseases, and the reason modifiers such as co-inherited α-thalassaemia, the *BCL11A* and *HBS1L-MYB* loci and the ability to raise fetal haemoglobin matter so much.
:::
:::

::: example A boy, his mother, and a grandfather with an unsteady gait {#ex-fmr1}
A 7-year-old boy has learning difficulties, prominent ears, hand-flapping, macro-orchidism and a seizure history. His mother is well; her father left school early and, at 58, developed progressive cerebellar ataxia, parkinsonism and memory decline. Testing shows 132 CGG repeats in the 5′ untranslated region of *FMR1* in the boy and 78 in his mother. Explain, and say whom else to counsel.
::: solution
The boy has fragile X syndrome. The *FMR1* triplet repeat expands characteristically on maternal transmission: premutation alleles of 55–200 repeats are unstable in the oocyte and can reach the full mutation above 200, at which point the promoter is methylated and the gene silenced. The mechanism of the syndrome is therefore loss of FMRP protein caused by an epigenetic lesion produced by a DNA change, and the inheritance shows anticipation with a parental bias. The grandfather's later-onset ataxia, tremor and cognitive decline is **fragile X-associated tremor/ataxia syndrome**, caused by the *premutation* through RNA gain of function with intranuclear inclusions: expansion size determines opposite mechanisms at either end of the range, since 55–200 repeats make excess toxic transcript and over 200 make none. Counselling covers the boy's diagnosis and management, the mother's risk of a further affected child (which depends on her repeat size and is substantial) and her own risk of primary ovarian insufficiency, and the risk to the grandfather's other relatives. Note the laboratory point: repeat-primed PCR with methylation testing detects this, and a "negative exome" would have missed it — which is why unexplained developmental delay is still investigated with microarray and *FMR1* testing as well as exome sequencing.
:::
:::

::: example Overgrowth, a normal karyotype, and a tumour risk {#ex-bws}
A 4-month-old has macroglossia, an umbilical hernia, birth weight above the 97th centile, an earlobe crease and left-sided body overgrowth. Methylation testing shows loss of methylation at the maternal imprinting centre IC2 (the *KCNQ1OT1* differentially methylated region) at 11p15, with no uniparental disomy. Diagnose, and explain what the molecular result changes.
::: solution
This is Beckwith-Wiedemann spectrum, the commonest imprinting-related overgrowth disorder. The 11p15 domain contains two independently imprinted sub-regions; normally IC1 is methylated on the paternal allele (controlling *IGF2* and *H19*) and IC2 methylated on the maternal allele (controlling *KCNQ1OT1* and *CDKN1C*). Loss of maternal IC2 methylation makes the maternal chromosome behave like a paternal one, so the fetal growth-promoting pattern is doubled. The molecular subtype predicts the tumour risk — IC2 loss of methylation carries a lower risk of embryonal tumour than IC1 gain of methylation or paternal uniparental disomy, and the subtypes differ in which tumour to look for — so the result determines the surveillance schedule (abdominal ultrasound, with alpha-fetoprotein measurement for hepatoblastoma in the higher-risk groups) rather than the diagnosis alone. Two clinical details matter early: neonatal hypoglycaemia from islet hyperplasia, which must be detected by feeding-time glucose checks because repeated hypoglycaemia damages the brain, and the cardiac and renal assessment. Silver-Russell syndrome is the mirror lesion at the same locus (IC1 loss of methylation reducing *IGF2*), which is why one imprinted region can cause under- as well as overgrowth, and why "imprinting disorder" is a mechanism rather than a disease.
:::
:::

::: example Editing a patient's own cells {#ex-crispr}
A 16-year-old with severe sickle cell disease has had eleven vaso-occlusive crises and two episodes of acute chest syndrome despite adherent hydroxycarbamide. She is assessed for exagamglogene autotemcel. Explain the reasoning behind the target, the procedure, and what must be discussed before it.
::: solution
The target was chosen from a protective human phenotype: people who inherit sickle cell disease together with hereditary persistence of fetal haemoglobin have few crises, because fetal haemoglobin inhibits polymerisation of haemoglobin S. *BCL11A* is the repressor that switches fetal haemoglobin off after birth, and its erythroid-specific enhancer is what CRISPR-Cas9 cuts in this therapy. The patient's own haematopoietic stem cells are mobilised and collected, edited in the laboratory so that erythroid precursors re-express fetal haemoglobin, and reinfused after myeloablative busulfan conditioning; the correction is epigenetic-silencing-of-a-repressor rather than gene repair, so a proportion of haemoglobin F in red cells is enough, and no selected clone is needed. What must be discussed: the risks of ablation (mucositis, infection, prolonged cytopenias, subfertility — so fertility preservation first), graft failure or inadequate editing, the uncertain longevity of effect, the unknown long-term risk of off-target editing and of clonal haematopoiesis, the time to treatment and the fact that standard care (hydroxycarbamide, transfusion programmes, and newer agents to reduce crises) continues meanwhile. The general shift is worth naming: *ex vivo* editing converts an inherited disease into a one-off cell-therapy procedure, with all the irreversibility that implies, and moves the ethical questions from the germline to access, cost and consent.
:::
:::

::: theorem Threshold effects {#thm-threshold}
For most enzymes, clinical abnormality appears only when residual activity falls below a fraction of normal, because flux through a pathway is buffered by enzyme excess; the shape of the curve explains why heterozygote carriers of recessive enzyme defects are well and why some X-linked conditions vary so much between women.
:::

::: proof
Suppose a pathway's output is roughly proportional to enzyme activity until the flux requirement of the tissue is met, and then plateaus: the relationship between activity and phenotype is therefore not linear but thresholded, and the observed phenotype can be written as rising steeply once activity falls under some critical value (which depends on tissue demand, on the presence of an alternative route, and on the substrate load). For a recessive disorder, one normal allele gives ~50% activity and 50% is comfortably above the threshold, so carriers are unaffected — but not always: in some disorders the threshold is high, and carriers of, for example, glucose-6-phosphate dehydrogenase or porphyria may show biochemical or even clinical signs under stress. For X-linked disease in females, random X-inactivation makes the tissue a mosaic whose proportion of expressing cells determines severity, and skewing of the pattern produces the continuum from asymptomatic carrier to affected. Somatic mosaicism and the timing of the mutational event give a similar graded picture. So the same genotype can produce a range of phenotypes, and "the enzyme is 30% active, is that enough?" is a question about the tissue's demand curve — which is exactly what clinical assessment answers, and a laboratory value alone does not.
:::

::: widget plot
f: 30 + 4000/(x + 12)
x: 0, 100
y: 0, 420
hlines: 50; 150
labels: \text{plasma ammonia}
caption: A threshold curve, drawn for plasma ammonia (µmol/L, illustrative) against the residual activity of a urea-cycle enzyme as a percentage of normal. With activity above roughly half of normal the value sits near the reference range (lower dashed line); the abnormality appears only as activity falls further, and rises steeply near the bottom. Reference limits are the lower dashed line and a decompensation threshold of about 150 µmol/L the upper. This is why a carrier has a normal test, why a late-onset urea-cycle disorder can present after a protein load in someone previously "well", and why a normal screening biochemistry is not a guarantee.
:::

::: quiz
A patient with cystic fibrosis has a *CFTR* variant reported in exon 11 that changes a serine to a leucine. Which piece of information most helps you decide whether it is pathogenic?
- [ ] It changes an amino acid, so it must matter.
- [x] Whether the residue is conserved across species, what the population frequency is, whether the protein is made and trafficked, and whether it segregates with disease in the family.
- [ ] Whether the parents are related.
- [ ] Whether the chest disease is severe, because genotype always predicts phenotype in cystic fibrosis.
::: solution
Missense is not the same as pathogenic: most new missense changes in a gene are benign. Classification uses frequency (a variant common in a population cannot cause a rare recessive disease), conservation and structural context, computed predictors (weak evidence), functional assays such as chloride conductance or CFTR folding and trafficking, and segregation with disease in the family, all reported through a standard five-tier system. Phenotype severity in cystic fibrosis depends on mutation class — a nonsense or splicing allele on both chromosomes usually causes pancreatic insufficiency, while residual-function alleles such as R117H or poly(T) tract variants often do not — which is precisely why variant interpretation must be mechanism-based, and why a genotype may be consistent with a mild or late presentation.
:::
:::

::: history
Archibald Garrod proposed in 1908 that disease could be a block in a chemical pathway; George Beadle and Edward Tatum converted that into an experimental programme in 1941. The chemical nature of the gene was settled by Avery, MacLeod and McCarty in 1944 and by Hershey and Chase in 1952, and the code was cracked between 1961 and 1966 by Marshall Nirenberg, Har Gobind Khorana, Severo Ochoa and others, after Sydney Brenner, François Jacob and Matthew Meselson established the triplet, non-overlapping nature of the message and the existence of transfer RNA. The surprise came with the split gene: in 1977 Richard Roberts and Phillip Sharp showed independently that adenovirus transcripts are spliced, so an intron can interrupt a coding sequence — work that earned them half of the 1993 Nobel Prize, the other half going to Thomas Cech and Sidney Altman for catalytic RNA. Frederick Sanger's sequencing methods of 1977 made DNA readable, Kary Mullis's polymerase chain reaction of 1985 made it amplifiable, and the human genome of 2001–03 made it enumerable. Andrew Fire and Craig Mello's RNA interference (Nobel Prize, 2006) turned out to be the mechanism that made small-interfering RNA drugs and antisense oligonucleotides possible, and Emmanuelle Charpentier and Jennifer Doudna's CRISPR-Cas9 system (Nobel Prize, 2020) turned targeted editing from an aspiration into a bench method within a decade — with the first licensed gene-edited medicines arriving in 2023.
:::

## Where this leads

Chromosomes, pedigree reasoning and the classification of variants are in [[genetics/genome-chromosomes]] and [[genetics/genetic-testing]]; imprinting, repeat expansion and mitochondrial inheritance in [[genetics/non-mendelian-inheritance]]; the somatic genetics of cancer in [[genetics/cancer-genetics]]; translation-level control of metabolism in [[cell-biochemistry/metabolic-integration]].

::: summary
- A gene is a locus with a functional transcript: promoter, exons and introns, untranslated regions and often distant enhancers; most of the genome is transcribed, only some of it is translated.
- Replication is accurate because of selection, proofreading and repair, and each repair system has its own disease and its own therapeutic exploitation (mismatch repair and checkpoint inhibitors, homologous recombination and PARP inhibitors).
- Transcription is controlled by chromatin state and by transcription factors acting through enhancers; splicing is a major site of disease and a realistic drug target, as spinal muscular atrophy shows.
- Epigenetic marks — CpG methylation, histone modification, imprinting, X-inactivation — change expression without changing sequence, and can be disturbed by disease as well as by parental origin.
- Translation is regulated at initiation, is the target of many antibiotics and a few toxins, and premature stop codons usually cause loss of the message by nonsense-mediated decay rather than a truncated protein.
- Variant classification is a judgement about frequency, mechanism, function and segregation: a genetic report is evidence, not a diagnosis.
- Most enzyme phenotypes show threshold behaviour, which explains carrier health, variable expressivity and the value of a biochemical as well as a genetic test.
:::

## Exercises

::: exercise Read the codon table logic {level=1}
Explain why a G→A transition in the third position of a codon is more likely to be silent than one in the first position, and why a C→T transition at a CpG dinucleotide is disproportionately common as a disease mutation.
::: solution
Degeneracy is concentrated at the third base, which pairs loosely with the anticodon wobble position, so third-position changes frequently encode the same amino acid. Conversely, methylated cytosine at CpG deaminates spontaneously to thymine, and the repair systems cope less well with this than with unmethylated cytosine deamination; CpG sites are therefore mutational hotspots, which is why recurrent "CpG" mutations (for example in *FGFR2*, *MECP2*, the retinoblastoma gene and many others) appear independently in unrelated families.
:::
:::

::: exercise Which repair? {level=1}
Name the repair pathway chiefly responsible for each lesion: (a) a uracil mispaired in DNA; (b) a UV-induced pyrimidine dimer; (c) an insertion–deletion loop formed at a dinucleotide repeat; (d) a double-strand break in G1 phase.
::: solution
(a) Base excision repair (uracil-DNA glycosylase, then AP endonuclease). (b) Nucleotide excision repair — its failure gives xeroderma pigmentosum. (c) Mismatch repair — its failure gives microsatellite instability, as in Lynch syndrome. (d) Non-homologous end joining, which is error-prone; homologous recombination operates only when a sister chromatid is available, i.e. late S and G2.
:::
:::

::: exercise Nonsense-mediated decay {level=1}
Two patients have the same gene: one has a nonsense mutation in exon 3 of 10, the other in the last exon. Predict which has more residual protein and why.
::: solution
The last-exon premature stop codon escapes nonsense-mediated decay, because the surveillance machinery depends on exon-junction complexes deposited upstream of the normal stop; a stop codon in the final exon is read as normal termination. That transcript is translated, yielding a truncated protein that may retain partial function (or, worse, act dominantly-negative). The exon 3 stop triggers decay, so little mRNA and little or no protein — usually a null allele and a more severe loss-of-function phenotype. This is why "truncating mutations are all equivalent" is wrong, and why some genotypes respond to readthrough or to exon-skipping strategies and others do not.
:::
:::

::: exercise Explain the mechanism {level=2}
A 30-year-old with colorectal cancer at 29 has a tumour that is microsatellite-unstable, and his brother has had endometrial cancer. Explain why immune-checkpoint inhibition works in such tumours, and why the same drug usually fails in a microsatellite-stable colorectal cancer.
::: solution
Germline loss of one mismatch-repair allele with somatic loss of the second (Lynch syndrome) makes the tumour accumulate thousands of insertion and deletion mutations in repetitive sequences, including frameshifts that create novel peptide sequences absent from the thymus. These neoantigens are presented on HLA and are immunogenic, so the tumour survives only by restraining the T-cell response — typically through programmed death ligand 1 — and antibodies that release that brake (pembrolizumab, nivolumab with or without ipilimumab) produce durable responses, enough that mismatch-repair status is now a tissue-agnostic indication. A microsatellite-stable tumour has few neoantigens, so removing the brake has little to act on; the same reasoning explains why tumour mutational burden, POLE-mutant hypermutation and mismatch-repair status are now reported together, and why testing at diagnosis changes treatment rather than prognosis alone.
:::
:::

::: exercise Splicing {level=2}
A patient has a homozygous intronic mutation 5 nucleotides upstream of the exon 2 donor site that creates a new GT dinucleotide. Describe the predicted transcript and protein, and how you would confirm the prediction.
::: solution
If the new donor site is used, the exon is lengthened by five nucleotides, which shifts the reading frame and creates a premature stop codon downstream; or the new site is used in addition to the normal one, giving a mixture of normal and aberrant transcripts, and some transcripts may skip the exon entirely. The predicted products are therefore a truncated protein from frameshift-containing transcripts plus whatever normal protein escapes. Confirmation requires demonstration of the RNA: reverse-transcribe patient RNA (from blood if the gene is expressed there, otherwise from a cultured cell or biopsy), amplify across the exon, and sequence the products; quantifying the relative amounts by fragment analysis or by digital PCR gives the fraction of correctly spliced message, which is what determines whether the phenotype is mild or severe. cDNA analysis is the standard evidence class for a splice-affecting variant, and is the reason a laboratory report on RNA can be decisive where DNA is ambiguous.
:::
:::

::: exercise Imprinting again {level=2}
A girl has a paternal deletion of 15q11-q13 and a boy has maternal uniparental disomy for the same region. Predict the phenotype of each, and explain why "the same chromosome abnormality" gives the same disease here.
::: solution
Both have lost the paternally expressed contribution of 15q11-q13 — *SNRPN*, the SNORD116 cluster and the rest of the paternal transcripts — while *UBE3A*, which is expressed from the maternal allele in neurons, is unaffected; both therefore have Prader-Willi syndrome: neonatal hypotonia and feeding difficulty followed by hyperphagia, obesity, hypogonadism, learning difficulties and behavioural features. The reason the mechanism differs but the phenotype does not is that this region is imprinted: only the paternal copy is active, so losing it by deletion or by inheriting two maternal copies (uniparental disomy, arising from a trisomy rescue) is functionally equivalent. The mirror lesion, loss of maternal contribution (deletion, paternal uniparental disomy, or an *UBE3A* mutation) causes Angelman syndrome. The clinical corollary is that a normal karyotype does not exclude either, and methylation-specific testing is the screen that detects both.
:::
:::

::: exercise Design the experiment {level=3}
A fetus is found to have hydrops; the parents are first cousins. Non-invasive and standard genetic testing is uninformative. Outline a diagnostic strategy and its interpretation, and say why a negative exome does not end the case.
::: solution
Take a diagnostic fetal sample (villi or amniocytes) and offer rapid trio exome sequencing with a panel for the hydrops differential (lymphatic and cardiac malformation genes, storage diseases such as LAMA2-related and lysosomal disorders, haemoglobin Bart's hydrops, parvovirus B19, alpha-thalassaemia in populations at risk, chromosomal disorders including copy-number change and uniparental disomy, and RASopathies). Trio analysis — sequencing fetus and both parents together — allows de novo and compound-heterozygous calls and is what makes the consanguinity interpretable, since identity-by-descent segments will show recessive candidates. A negative result is not evidence against a genetic cause: the exome may miss deep intronic and regulatory variants, repeat expansions (which now need targeted assays or long-read sequencing), copy-number and structural change in regions the pipeline filters, mosaicism below detection, and genes with no disease association yet; it may also reflect a sample problem such as confined placental mosaicism. Reanalysis after birth, targeted RNA studies on an affected tissue, methylation studies, and genome sequencing are all reasonable next steps, and a proportion of "exome-negative" cases yield a diagnosis on reanalysis years later. Interpretation, in this as in all prenatal genetics, is best done with a clinical geneticist and with counselling about uncertainty.
:::
:::

::: exercise Quantitative genetics {level=3}
An enzyme assay in a heterozygous carrier of a recessive disorder measures 52% of the control mean. In another family, a symptomatic sib-pair with the same disorder measure 8% and 4%. What does the assay add to the DNA result, and when would it mislead?
::: solution
The enzyme assay supplies the missing functional evidence: 52% activity is what haploinsufficiency for a single null allele predicts, confirming that one allele is non-functional, and 4–8% confirms the affected state, which can be decisive for a variant of uncertain significance found in trans with a known pathogenic allele. It misleads when the assay is on a tissue that does not express the relevant isoform (or expresses a related protein that cross-reacts), when a mutant protein is present but catalytically dead and immunologically normal (so a "normal" protein level misleads while the activity is low, or the reverse), when the disease is due to a qualitative rather than quantitative defect (dominant-negative or gain-of-function alleles), when the threshold for disease is low so that a symptomatic patient still has 30–40% activity, and when inflammation or haemolysis alters the sample. The general rule: an enzyme assay is an excellent functional test only if the tissue, the isoform and the disease mechanism are known to match.
:::
:::
