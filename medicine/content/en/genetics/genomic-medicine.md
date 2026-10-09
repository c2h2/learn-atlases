The genome left the genetics clinic and entered general medicine sometime around 2010, and most clinicians have not yet updated their model of what that means. Four developments carry it: drugs prescribed against a patient's drug-metabolising genotype; treatments that add, silence or rewrite genes; the genome as research infrastructure and public good; and the ethical questions that follow from all three — consent over material that predicts relatives' risks, equity of access to treatments that cost millions, and the first practical question of heritable modification.

This chapter is the applied end of the course: pharmacogenetics as clinical pharmacology, gene and cell therapy as mechanisms that already treat patients, editing as a technology in the doorway, and ethics as the discipline that keeps the rest honest.

## Pharmacogenetics

::: definition Pharmacogenetics and pharmacogenomics {#def-pgx}
**Pharmacogenetics** studies inherited variation in drug response, classically in one gene and one drug; **pharmacogenomics** studies the genome-wide picture. The clinically actionable variants fall in two families: **pharmacokinetic** — genes that determine exposure (activating, loss or copy-number variants in CYP2D6, CYP2C19, CYP2C9, TPMT, NUDT15, UGT1A1, DPYD, SLCO1B1) — and **pharmacodynamic** — genes that determine the target or pathway (HLA risk alleles such as *HLA-B\*57:01* with abacavir or *HLA-B\*15:02* with carbamazepine; *VKORC1* for warfarin sensitivity; *IFNL3/IL28B* for hepatitis C response; *CYP2C19* loss alleles reducing clopidogrel activation). The result of a test is a phenotype label — poor, intermediate, normal (extensive), rapid or ultrarapid metaboliser — not a raw genotype, and prescribing guidance attaches to the label.
:::

The doses and drugs change when the genotype is known; the reasoning is the pharmacology of [[pharmacology/metabolism-excretion]] applied to inherited variation.

| Gene | Drugs affected | Mechanism | Clinical consequence of the "wrong" genotype |
|---|---|---|---|
| *TPMT* / *NUDT15* | thiopurines (azathioprine, 6-mercaptopurine) | reduced inactivation → cytotoxic nucleotides accumulate | life-threatening myelosuppression; dose reduction or avoidance by genotype |
| *DPYD* | fluoropyrimidines (5-FU, capecitabine) | reduced catabolism | severe mucositis, diarrhoea, neutropenia; start at reduced dose or avoid |
| *UGT1A1* (promoter *28 allele) | irinotecan | reduced glucuronidation of active metabolite | neutropenia; dose adjustment at higher doses |
| *CYP2C19* | clopidogrel (prodrug), PPIs, some SSRIs | loss alleles fail to activate; gain alleles accelerate | reduced antiplatelet effect after stenting; choice of alternative (prasugrel, ticagrelor) |
| *CYP2D6* | codeine/tramadol (prodrug activation), tamoxifen, many antidepressants and antipsychotics | copy-number and function spectrum from no to ultrarapid | toxicity in ultrarapid metabolisers of codeine (respiratory depression; breastfeeding caution); failure of analgesia in poor metabolisers |
| *CYP2C9* / *VKORC1* | warfarin | dose of clearance and of target | large differences in maintenance dose; pharmacogenetic dosing reduces time out of range in some trials |
| *HLA-B\*57:01* | abacavir | immune-mediated hypersensitivity | avoid — a preventable, potentially fatal reaction |
| *HLA-B\*15:02 / -A\*31:01* | carbamazepine, oxcarbazepine, phenytoin | SJS/TEN and DRESS risk by allele | test before prescribing in at-risk ancestries; choose alternative |
| *SLCO1B1* | simvastatin | reduced hepatic uptake | myopathy risk; dose cap or alternative statin |
| *G6PD* deficiency (X-linked) | primaquine, rasburicase, dapsone, nitrofurantoin | reduced NADPH, oxidative haemolysis | acute haemolysis; test before oxidant drugs in at-risk populations |

::: theorem Actionable pharmacogenetics requires an action {#thm-pgx}
A pharmacogenetic test changes outcomes only if the result is available before the first dose, the phenotype-to-dose rule is written in the record and the prescribing system, and the laboratory result is stored where it will be found for every future drug. The dominant failure mode of implemented pharmacogenomics is not interpretation but retrieval: a *CYP2D6* phenotype that no prescriber can see at the moment of writing codeine.
:::

::: proof
Implementation science has separated the assays that work from the assays that merely predict well. Warfarin dosing illustrates the difference: pharmacogenetic algorithms (CYP2C9, VKORC1, clinical factors) shorten time to stable dosing in most but not all large trials, and outcome benefit depends on population genotype frequency and on whether INR monitoring is already good — so guidance differs between countries, and the honest summary is "useful where monitoring is imperfect, not a replacement for it". Codeine illustrates the opposite case — actionability without a good historical signal to act on: ultrarapid metabolism via CYP2D6 copy-number amplification converts codeine to morphine quickly enough to cause respiratory depression in children and breastfed infants, and post-mortem case reports preceded the labelling; the action is to avoid codeine in these groups, which is now guidance in multiple jurisdictions. The general design rule for using the tests is: (1) read the phenotype, not the alleles; (2) check the evidence grade (level 1A drugs-and-gene pairs act, weaker pairs inform); (3) record the phenotype once, in the problem list or an interoperable field, and (4) treat a "normal metaboliser" result as permissive, not protective — the test excluded an inherited cause of an unusual response, not all causes.
:::

::: example The pharmacist's call {#ex-thiopurine}
A 19-year-old with inflammatory bowel disease is about to start azathioprine. The hospital pharmacogenetics service reports *TPMT* activity intermediate (one no-function allele) and *NUDT15* wild type. The prescriber asks whether to check a TPMT level "as usual" after starting.
::: solution
Reverse the sequence: with a known intermediate *TPMT* phenotype, guidelines (e.g. CPIC-based) support starting at a reduced dose (on the order of a third to two thirds of standard) rather than standard dose with later correction; monitoring of blood counts remains necessary because reduced dose limits but does not abolish myelosuppression risk, and because the phenotype label does not capture thiopurine metabolite handling in full (*NUDT15* is tested precisely because it dominates risk in East Asian and Hispanic populations independently of TPMT). Explain why: thiopurines are inactivated by TPMT; one working allele leaves less reserve, so standard doses accumulate cytotoxic thioguanine nucleotides. What the record needs is the phenotype, the date, and the rule applied, so that any future prescriber (the same patient may receive 6-mercaptopurine for a leukaemia one day) inherits the inference, not just the number.
:::
:::

::: example The stent and the prodrug {#ex-clopidogrel}
A 58-year-old Chinese man has a drug-eluting stent placed for an acute coronary syndrome. He is loaded with clopidogrel. The pharmacy service reports a pre-admission pharmacogenetic result: *CYP2C19* \*2/\*3 — poor metaboliser.
::: solution
Clopidogrel is a prodrug requiring CYP2C19-mediated activation; two loss-of-function alleles mean markedly reduced active metabolite, higher on-treatment platelet reactivity, and a consistently reported excess of stent thrombosis and ischaemic events after PCI in poor metabolisers — the reason CPIC recommends an alternative P2Y12 inhibitor for carriers of two loss-of-function alleles after stenting, if no contraindication. The action is to switch to prasugrel or ticagrelor (not dose-doubling clopidogrel, which overcomes the metabolic block only inconsistently), to record the phenotype where every future prescriber will see it, and to note the asymmetry the case teaches: the same genotype that makes clopidogrel fail makes some proton-pump inhibitors and certain antidepressants behave differently, because CYP2C19 touches many pathways. It also makes the negative point precisely: a normal-metaboliser result would not have protected him from the common causes of stent thrombosis — under-dosing, non-adherence, stopping the drug — which is why the pharmacogenetic result is one input to vigilance, not a substitute for it.
:::
:::

## Adding, silencing and editing genes

::: definition Gene therapy modalities {#def-gene-therapy}
**Gene addition** delivers a functional copy, typically by adeno-associated virus (AAV) into liver, retina, muscle or CNS, or by **lentiviral transduction** of the patient's own haematopoietic or lymphoid cells ex vivo followed by transplant. It is *episomal* — the gene sits alongside the genome — and does not correct the original mutation, so it must be re-dosed in growing children, which it generally cannot be (neutralising antibodies). **Gene editing** — CRISPR–Cas9 with a guide RNA making a double-strand break, repaired by non-homologous end joining (knockout) or by a supplied template (knock-in) — changes the sequence; base and prime editing make smaller, cleaner edits. **RNA-level therapy** — antisense oligonucleotides (ASOs) that degrade RNA or modulate splicing (nusinersen for *SMN2* splicing in SMA), siRNA (patisiran, givosiran, inclisiran), and aptamers — acts transiently, is repeatedly dosed, and does not touch DNA.
:::

The clinical reality, as of 2026, is a handful of diseases treated well by each modality and a long list treated in trials. Approved examples include: AAV gene addition for *RPE65*-related retinal dystrophy (subretinal injection), and for haemophilia B (factor IX variant under a liver promoter) and haemophilia A (a Factor VIII construct; durable expression but limited by pre-existing immunity and hepatotoxicity episodes, and by the episome-loss problem in dividing liver); lentiviral gene addition for beta-thalassaemia and sickle cell disease (myeloablated autologous CD34+ cells — the first CRISPR-edited therapy, **exagamglogene autotemcel**, raised to solve this by disrupting the *BCL11A* erythroid enhancer to reconstitute fetal haemoglobin); ASO splicing modulation for SMA with nusinersen and for Duchenne dystrophin exon-skipping with eteplirsen-class drugs; and siRNA for hereditary transthyretin amyloidosis and acute hepatic porphyria. The common properties define the field: ultra-rare indications, single-infusion pricing measured in millions, conditioning regimens whose toxicity (alkylator exposure, myeloablation, insertion-oncogenesis signals in early lentiviral series) is now being weighed against durable benefit, and manufacturing so complex that a batch failure is a clinical event.
::: example Two brothers, one pump {#ex-smadri}
A 5-year-old with severe haemophilia A (*F8* nonsense variant) has no inhibitors. His hepatology team discusses the AAV gene addition trial result in the context of a new approved product.
::: solution
Explain the therapy in its mechanism and its limits. A single intravenous infusion of an AAV5 vector carrying a *F8* transgene under a liver-specific promoter raises endogenous factor VIII production from (<1%) to a sustained 20–50%-equivalent range in many patients, converting severe haemophilia A from weekly prophylaxis to near-ordinary life — the measured effect in trials was a >95% reduction in annualised bleed rates with most patients off prophylaxis. But: the episomal transgene is diluted when hepatocytes divide (childhood growth, and any future liver regeneration or injury), so expression measured at two to three years is a fragile promise; pre-existing or induced capsid immunity excludes patients and can threaten re-dosing for life; transaminase rises require steroid rescue; there is a small theoretical insertional and hepatocellular carcinoma signal requiring years of registry follow-up; and the liver is exactly the organ that cannot easily be "un-treated". For this 5-year-old, an adult-licensed product is at present an off-licence or trial option at best; the responsible statement is not "not yet, never" but "the benefit he needs — decades of prophylaxis avoided — is real, and the durability question we cannot yet answer is exactly the reason the field is studying him as a child".
:::
:::

## Editing, and the heritable line

::: definition Somatic versus germline editing {#def-editing}
**Somatic editing** alters cells of a patient and is not inherited: ex vivo editing of haematopoietic stem cells (the sickle cell therapy above) or T cells (CAR-T), and in vivo editing (lipid-nanoparticle or AAV delivery of editors, in trials for transthyretin amyloidosis and others). **Germline editing** alters sperm, eggs or embryos such that changes pass to descendants — heritable human genome editing. Following the 2018 announcement of CRISPR-edited twin girls in Guangzhou, the research and clinical consensus (US National Academies 2020; WHO expert advisory committee 2021) is that germline editing for reproduction is not acceptable absent adequate safety and necessity, with the strong position of most states and the Council of Europe being that it is prohibited.
:::

::: theorem The ethics of the heritable line {#thm-heritable}
Three arguments structure the germline debate and cannot be separated without distortion: safety (off-target and on-target mosaicism in embryos; unknown transgenerational effects); consent (the edited person, and their descendants, cannot consent); and justice (heritable modification of the rich would be a new mechanism of inherited advantage, distinct in kind from treatment). Each has a different logical endpoint — technique, prohibition, and policy — which is why "editing yes or no" is a confused question.
:::

::: proof
The safety argument is empirical and may erode: founder-line correction of *MYBPC3* in human embryos (Mitalipov's group, 2017) showed high efficiency and no detected off-target edits by the assays used, but the assays themselves — whole-genome sequencing of a few cells — under-detect large deletions, chromothripsis-like events and mosaicism, and mouse work has shown that repair-pathway choice in embryos differs from somatic cells (large indels and loss-of-heterozygosity events via p53-independent mechanisms), so "no off-targets detected" is not "no off-targets". Consent arguments apply symmetrically to selection (PGT already chooses among embryos), but asymmetrically in kind: editing fixes a choice for all descendants of an individual, closing options rather than opening them — the difference between the sickle-cell therapy that repairs a child's marrow and an edit made in an embryo that any child of that lineage will carry. Justice is the argument least amenable to technique: gene therapies at single-dose prices of one to three million dollars already strain the systems that ration them (outcome-based contracts, annuity payment, population rebates), and a heritable, one-time "enhancement" market would compound advantage across generations in a way no treatment does — the reason the Nuffield and WHO reports fold the equity question into the permissibility question rather than treating it as distribution after the fact.
:::

::: warning The governance is the therapy
For every modality in this chapter the binding constraints are not scientific: access (who receives a £1.6–3 million one-off treatment within a budget that must also buy ward medicines), long-term follow-up obligations written into trial protocols and registries, manufacture and quality as a patient-safety problem, and the consent of children who will live sixty years with an episome. A "cure" whose access rules are not decided before launch reproduces inequity at the speed of the approval. State the price question when you discuss these treatments; pretending it is someone else's ethics is the commonest failure of genomic-medicine conversations.
:::

::: widget plot
f: C0*exp(-k1*x) + A*(1-exp(-k2*x))*exp(-k3*x)
x: 0, 100
y: 0, 130
sliders: C0=100:10:100:5; A=80:20:120:5; k1=2.0:0.5:4:0.1; k2=0.10:0.02:0.4:0.01; k3=0.02:0.005:0.1:0.005
labels: \text{relative factor level}
caption: Schematic of the durability problem in AAV gene addition: the transgene product appears over weeks and then declines slowly as the unintegrated episome is diluted by hepatocyte turnover (superimposed on the pre-existing low baseline). The curve is illustrative, not fitted: it exists to make the clinical conversation concrete — a "cure" measured at two years may deliver a factor level that drifts, which is why trial protocols carry five-year-plus follow-up and why childhood treatment is studied later than adult.
:::

## Genome as public good; genetics as family information

::: definition The ethical frame for genetic information {#def-ethics-frame}
Four properties of genetic data drive the ethics: it is **predictive** (risks before disease), **familial** (a variant is everyone's shared inheritance, so one patient's result changes relatives' information), **identifying** (a genome is a durable identifier; "de-identification" is weakening anonymity), and **double-edged** (the same sequence may justify treatment or discrimination). The counterweights from the tradition — autonomy, confidentiality, non-maleficence, justice — therefore operate with unusual strain: autonomy extends to a right not to know and, for children, to an open future; confidentiality runs into duties to warn relatives whose medical decisions change (the classic being hereditary cancer syndromes), regulated in some jurisdictions through codes that permit disclosure with safeguards; and justice concerns access, discrimination (GINA-style protections vary by country; life and long-term-care insurance often sit outside them) and the ownership and reuse of population datasets.
:::

::: example Duty to a relative you have never met {#ex-duty-warn}
A man with Huntington disease declines to tell his half-sister, whose address he has; he asks the team to keep the family history confidential. What do the professional rules and the moral arguments permit?
::: solution
Start from the framework nearly all codes share. The genetic information about him is his; the information's implication for the half-sister is hers, and her reproductive and occupational decisions are the ones at stake — for an adult-onset condition with no preventive treatment. First attempt, always: persuade with support (offer to accompany her to a genetics appointment, let the service write a generic "you may benefit from a genetics consultation" letter, explore his fears — stigma, guilt, family conflict). Only where persuasion fails, and where the professional code and local law provide for it, may disclosure without consent be considered, and then in narrow form: the minimum information — that a relative is at risk and should seek counselling, not his diagnosis or his gene — to the person who can act, after documented attempts, and with the reason recorded. Note that clinical genetics services have an alternative technology here: they can *invite* the relative for counselling without revealing anything about the patient — the practical mechanism that resolves many of these cases — and that invitation is the standard of care in cascade systems. Moral remainder: whichever path is taken, document, and offer the patient continued care — a confidentiality refusal handled punitively teaches patients to hide family histories, which harms the next person's cascade map.
:::
:::

::: history
The therapeutic arc is short. The first gene addition into a human was the 1990 NIH experiment in which a child with adenosine deaminase (ADA) deficiency received gene-marked lymphocytes — a marker study that could not treat, and a caution about what was to follow: the 1999 death of Jesse Gelsinger in a urea-cycle trial, the 2002–03 leukaemias in the X-SCID trials (lentiviral and gamma-retroviral vectors beside a *LMO2* promoter), and a decade of reticence. The field rebuilt on safer designs: lentiviral vectors with self-inactivating promoters from 2005 onward produced the beta-thalassaemia and cerebral-adenosine-deaminase-deficiency results; luxturna (*RPE65*) was approved in 2017; the first AAV haemophilia trials reported durable expression in 2017–2020; and in late 2023 the first CRISPR-edited therapy (for sickle cell disease and transfusion-dependent beta-thalassaemia) was licensed in the United Kingdom and United States, closing the distance from Doudna and Charpentier's 2012 biochemistry to a bedside. Alongside, population sequencing matured from the Human Genome Project's 2003 completion through the 100,000 Genomes and national programmes that made the genome hospital infrastructure — and made the questions in this chapter's second half routine ward business rather than conference philosophy.
:::

::: quiz
A child with severe sickle cell disease is offered exagamglogene autotemcel. Which statement captures the trade-off the family must understand?
- [ ] The edit is inherited by their future children, so sterilisation must be discussed.
- [x] The edit stays in the patient's own marrow, requires myeloablative conditioning with its own risks including fertility loss, and is a one-time intervention with durable but not yet lifetime-proven benefit.
- [ ] The therapy will need repeating every year as the edited cells are replaced.
- [ ] The therapy edits mature red cells, so it works only while transfused.
::: solution
Exagamglogene autotemcel harvests the patient's CD34+ stem cells, disrupts the *BCL11A* erythroid enhancer by CRISPR, and reinfuses them after busulfan-like myeloablation; edited stem cells self-renew, so the effect is not annual but long-lived — yet myeloablation carries mucositis, infection and infertility risks, engraftment failure is possible, and the oldest cohorts are still being followed. Somatic edits are not inherited; edited red cells derive from the edited stem cells; no yearly re-dosing is intended. The fertility question is the real daily ethics: myeloablation is gonadotoxic, so fertility preservation must be discussed before a therapy that saves a life by conditioning it first.
:::
:::

## Where this leads

The pharmacology this chapter presumes is in [[pharmacology/metabolism-excretion]] and [[pharmacology/patient-variation]]; the vectors and expression biology in [[cell-biochemistry/gene-expression]]; testing pathways in [[genetics/genetic-testing]]; the family-confidentiality case law in [[medical-ethics-law/confidentiality]] and resource ethics in [[medical-ethics-law/justice-resources]]; the haemoglobin disease being edited in [[blood/haemoglobin-disorders]].

::: summary
- Pharmacogenetics is inherited variation in drug handling with a phenotype label and an action attached; it works only when the result is retrieved before the first dose and stored for every future prescription.
- Gene addition, RNA therapy and editing treat real diseases now — retinal dystrophy, SMA, haemophilia, haemoglobinopathies, amyloidosis — each modality with its own fixed costs: immunology, repeat dosability, conditioning toxicity, durability, price.
- Somatic editing is medicine; heritable germline editing is, for now, prohibited or moratorial, for interlocking reasons of safety, consent and justice that lead to different remedies and must not be conflated.
- Genetic data are predictive, familial, identifying and double-edged; the professional practice is cascade invitation, consent for secondary findings, and confidentiality that yields — minimally and with procedure — to a relative's preventable harm.
- Access and governance are part of the therapy; a genomic medicine delivered only to those whose health system can absorb it has failed as medicine whatever it achieved as biotechnology.
:::

## Exercises

::: exercise Read a phenotype label {level=1}
A report states: "CYP2D6: one functional and one no-function allele; predicted intermediate metaboliser; activity score 1.0." Can this patient take codeine safely?
::: solution
Intermediate metaboliser is not a contraindication by itself — conversion to morphine occurs but at reduced rather than increased capacity, so the concern is inadequate analgesia more than toxicity. The safety answer is that codeine prescribing does not rest on a genotype alone in most settings: the guidance that matters (avoid codeine in children, in breastfeeding mothers, and in known ultrarapid metabolisers; use usual analgesic principles in others) applies regardless, and an intermediate label neither warns about nor licenses anything the clinical judgement did not already govern. The practical action is to note the phenotype, expect reduced efficacy for CYP2D6-activated drugs, choose alternatives if analgesia fails, and — if the patient were an ultrarapid or poor metaboliser — act on the CPIC rules, which for codeine are avoid/reduce.
:::
:::

::: exercise Match drug to gene {level=1}
Which pharmacogenetic test should be available before each: (a) abacavir; (b) azathioprine; (c) carbamazepine in a patient of Southeast Asian ancestry; (d) primaquine in a patient of Mediterranean ancestry; (e) fluoropyrimidine chemotherapy?
::: solution
(a) *HLA-B\*57:01* — positivity means never prescribe; hypersensitivity is prevented by avoidance. (b) *TPMT* (activity or genotype) and *NUDT15* — reduced-function genotypes require dose reduction or an alternative. (c) *HLA-B\*15:02* (± *-A\*31:01*) — SJS/TEN risk. (d) G6PD activity — oxidant haemolysis; quantitative testing in deficient-range results before primaquine, and haematology advice on severe deficiency. (e) *DPYD* — reduced-function variants dictate start-dose reduction or avoidance, with the caution that common missense variants have low positive predictive value so guidance is dose-based rather than binary.
:::
:::

::: exercise episome arithmetic {level=1}
An AAV liver gene therapy expresses at 25% of normal at year 2. Assume the transgene is lost with each hepatocyte division and liver cell turnover dilutes expression such that the level falls by about 6% per decade in adults and twice as fast in early childhood growth. Estimate the adult age at which this patient, treated at 4, might need prophylaxis again, and explain the calculation's limits.
::: solution
A simple exponential: 25% × 0.94^n for adult turnover, or 25% × 0.88^m during the first two decades of growth. Setting a severe-haemophilia threshold at ~5%, the childhood-growth phase alone brings 25% to 5% in about 14 years (0.88^14 ≈ 0.17, 25% × 0.17 ≈ 4%), i.e. late teens; with slower adult loss the number is later and gentler. The limits are the point: real data show variable and non-exponential loss, episome copy differences across individuals, selection for transgene-bearing hepatocytes (which raises levels over time and may offset dilution), and no human data at all at decades. The number exists to make one clinical statement precise: an apparently permanent correction at year 3 is not demonstrated to be permanent at year 30, and follow-up obligations are designed accordingly.
:::
:::

::: exercise Vector choice {level=2}
For each target, choose the vector/modality and defend it: (a) haemophilia B, liver, permanent; (b) SMA with motor-neuron disease starting in infancy; (c) sickle cell disease curable by reconstituted marrow; (d) a dominant gain-of-function allele requiring allele-specific silencing.
::: solution
(a) AAV — non-dividing hepatocytes sustain the episome; liver-tropic serotype; permanent expression is the goal and the integration risk is acceptable. (b) An ASO (nusinersen) or AAV9 gene addition (*SMN1*): the problem is the CNS and splicing — ASOs act at the RNA level in CSF with repeated dosing but no immune-permanence problem; AAV9 crosses into neurons as a one-time but non-repeatable dose. Both exist; a defensible answer chooses by age and repeatability. (c) Lentiviral transduction or CRISPR ex vivo on autologous CD34+ cells with myeloablation — the marrow is a self-renewing target and conditioning is survivable, which is exactly the design that made the first licensed edited therapies. (d) Allele-specific ASO or siRNA, or CRISPR with a variant-specific guide — knock-down needs discrimination between the mutant and wild-type transcript, which RNA-level modalities achieve by sequence and AAV-overexpression cannot.
:::
:::

::: exercise The screening panel dispute {level=2}
A national programme proposes adding sequencing-based screening of newborns for adult-onset conditions with actionable risks (*BRCA1/2*, familial hypercholesterolaemia variants) to the existing biochemical panel. Give the strongest two arguments each way, and the procedural condition under which most ethicists would accept it.
::: solution
For: the preventive value is real and time-shifted — statins from the twenties prevent the events of FH, and *BRCA* surveillance saves lives; newborn sampling gives the coverage that adult uptake never achieves (equity argument: a childhood sample screens everyone, adult cascade testing screens the articulate); storage makes later reanalysis cheap. Against: the benefit accrues in adulthood, decades before consent or assent are possible; parents' decisional authority is being used for a future person's information, with insurance and family-dynamics consequences that the child cannot undo; panel design invites mission creep from actionable to merely interesting. The procedural condition most ethicists accept: the result must not be *disclosed* in childhood — the sample is stored under governance with a right not to know, disclosure deferred to the age of consent with an opt-out, and the programme evaluated on downstream uptake of surveillance rather than on tests performed. Note which side of the argument each objection really attacks: the science is not in dispute; the authority to decide for an unconsented future person is.
:::
:::

::: exercise Justice and price {level=2}
A one-off gene therapy priced at $2.5 million cures a disease that costs the health service $1.2 million per patient over a lifetime. Explain why "it pays for itself" is the wrong frame, and name three financing mechanisms actually proposed.
::: solution
Wrong frame for three reasons: the time-value of money makes an immediate cost fall hardest on the department that pays while savings accrue elsewhere (patient flows, social care, future budgets — the "wrong-pocket" problem); the counterfactual lifetime cost assumes the therapy works for every treated patient and for decades, which no trial supports; and cost-neutrality is not justice — a therapy can pay for itself and still be rationed to those who survive the application queue. Proposed mechanisms: annuity/mortgage payment (the payer pays over years, only while benefit persists); outcome-based rebates (money returned if the effect fails); and population-level risk pools or independent national access funds that hold the budget for ultra-rare therapies outside local commissioning, decoupling the decision from one hospital's cash flow. The honest clinical consequence is that eligibility criteria — which genotypes, which comorbidities, which ages — become rationing documents, and clinicians should say so rather than present criteria as purely medical.
:::
:::

::: exercise Design a consent {level=3}
You are drafting consent for an in-vivo CRISPR trial (lipid nanoparticles to liver). List the ten elements a rigorous consent must cover, distinguishing what is scientifically uncertain from what is a value trade-off.
::: solution
Scientific uncertainty to state: (1) the off-target profile and what assays cannot detect (large deletions, mosaicism); (2) durability and the possibility of a non-durable edit in liver turnover; (3) immunogenicity to the Cas protein limiting re-dosing; (4) long-term unknowns — the vector-editing combination has no decades of human experience; (5) dose-finding status and personal uncertainty about where in the trial's dose range they sit. Value trade-offs to name: (6) germline exposure — incidental editing of gonadal tissue at low levels is measurable with nanoparticles; the participant's values about hypothetical transmission matter and must be elicited, not assumed away; (7) reproduction and timing; (8) privacy and future insurability of a durable, identifying result; (9) what happens to the participant if the manufacturer withdraws (product half-life, follow-up obligations); (10) the option not to know on-target effects at trial sites with variable assay quality. The consent should say which of these are unknown, which are unknowable, and which are the participant's own decision — a separation the 2018 Guangzhou episode made into an international norm.
:::
:::

::: exercise The last question {level=3}
A 22-year-old with no personal or family history asks for a whole genome "to plan my life": diet, exercise, career risk, insurance, partner screening. What do you say?
::: solution
Answer on three levels. What the genome could give: pharmacogenetic labels useful for future prescriptions; a handful of validated monogenic risks with surveillance consequences if present (hereditary cancer and cardiac panels on a *family-history* basis — he has none); ancestry and carrier status relevant to a future partner's reproductive planning. What it could not: polygenic scores for behaviour, career or most complex disease — effect sizes too small to direct an individual, transfer too poor for reliable prediction; dietary and exercise "genetic" prescriptions sold beyond their evidence; and insurability, which in most jurisdictions is unaffected by data the insurer cannot compel but which he may nonetheless disclose voluntarily and regret. The ethical core is his last item: partner screening is reproductive medicine only when both individuals' carrier states and preferences are in the room; screened alone, it converts a mutual decision into a market and can stigmatise; the correct referral is to a genetics service *with* the partner, or preconception carrier screening as it is legitimately offered. Close with what he should actually take home: sequence the clinical record, keep the pharmacogenetic results retrievable, get the pedigree properly recorded, and spend the money on the tests whose results change what he and his doctor would do — which the genome will do least of, today, for someone without family history.
:::
:::
