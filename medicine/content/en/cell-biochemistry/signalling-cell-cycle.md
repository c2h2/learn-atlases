A cell decides what to do by reading the molecules around it. Adrenaline makes a liver cell release glucose in seconds, insulin makes a fat cell take up glucose in minutes, a growth factor makes a progenitor cell divide, and cortisol makes almost every cell change which genes it reads. Each of these is a chain: a ligand binds a receptor, the receptor changes conformation, that change is relayed by a small number of intermediary proteins, the relay is amplified and shaped by feedback, and the output is a change in enzyme activity, ion conductance, gene transcription or cell fate.

Nearly a third of modern medicines act on a single family of these receptors, and most of the rest act further along the same chains. The cell cycle and its death programmes are the ultimate outputs: whether a cell divides, stops, or dies.

## Properties of any signalling system

Before the parts, the general principles, because they explain most clinical pharmacology:

- **Specificity comes from the receptor set, not the ligand.** Acetylcholine does one thing at the nicotinic junctional membrane and another at the muscarinic receptor of the heart, because the receptors differ. The same principle lets a single hormone act differently in liver, muscle and adipose.
- **Amplification is built in.** One activated receptor can activate many G proteins; one adenylyl cyclase makes many cyclic AMP molecules; one kinase phosphorylates many substrates. A picomolar hormone therefore moves micromolar metabolite pools — and, symmetrically, a small fraction of receptor occupancy can give a large response.
- **Response is graded by occupancy and by efficacy.** For a simple reversible ligand, fractional occupancy is $[L]/([L] + K_d)$; **agonists** have efficacy (they activate), **antagonists** have affinity without efficacy, and **partial agonists** have submaximal efficacy however much receptor they occupy.
- **Systems desensitise.** Receptor phosphorylation by G-protein-coupled receptor kinases (GRKs) and binding of arrestins, internalisation, degradation and resensitisation determine how long a signal lasts and explain tolerance and rebound on stopping a drug abruptly.
- **Feedback and modularity make it robust and druggable.** Negative feedback (SOCS proteins on JAK-STAT, phosphodiesterases on cyclic nucleotides, ERK phosphorylating SOS) limits duration; positive feedback (calcium-induced calcium release, caspase activation) makes responses all-or-none.

::: example The same second messenger, different meanings {#ex-camp}
Raising cyclic AMP in cardiac myocyte increases contractile force and rate; in adipocyte it stimulates lipolysis; in renal collecting duct it causes aquaporin-2 insertion; in airway smooth muscle it causes relaxation; in gastric parietal cell it stimulates acid secretion. What makes the difference, and why does it matter for drugs?
::: solution
The messenger is generic; the meaning comes from the complement of cyclic-AMP-dependent protein kinase (PKA) anchors and substrates in each cell. AKAP scaffolding proteins hold PKA next to specific targets — L-type calcium channels and phospholamban in myocyte, hormone-sensitive lipase and perilipin in adipocyte, aquaporin-2 vesicles in collecting duct, and myosin light-chain kinase machinery and potassium channels in smooth muscle. Two clinical consequences follow. First, a drug that raises cyclic AMP systemically (a β₂-agonist, a phosphodiesterase inhibitor, cholera toxin in infection) produces a syndrome of the whole body's PKA targets — tremor, tachycardia, hypokalaemia, hyperglycaemia, relaxation of gut and bronchi — and the therapeutic effect is one item on that list. Second, tissue selectivity can be obtained downstream of the receptor instead: selective β₂-agonism, PDE4 versus PDE5 inhibition (rolipram versus sildenafil), and inhaled rather than systemic delivery all exploit the fact that the isoenzymes, not the nucleotide, differ between tissues.
:::
:::

## The four ways to cross a membrane

::: definition Classes of cell-surface receptor {#def-receptors}
**Ligand-gated ion channels** (nicotinic acetylcholine, GABA_A, glycine, glutamate, 5-HT₃, and the purinergic P2X receptors): fastest signalling, milliseconds, and the mechanism of most anaesthetics, sedatives and anticonvulsants.
**G-protein-coupled receptors** (rhodopsin family): seven transmembrane α-helices, activating heterotrimeric G proteins — Gs, Gi/o, Gq/11, G12/13 — and desensitising through GRKs and arrestins.
**Enzyme-coupled receptors**: receptor tyrosine kinases (insulin, IGF, EGF, FGF, PDGF, VEGF, RET, KIT), cytokine receptors signalling through JAKs, and receptor guanylyl cyclases (natriuretic peptides, guanylin).
**Adhesion and junctional receptors** (integrins, cadherins, selectins, immunoglobulin superfamily) which signal through the cytoskeleton and are the targets of anti-integrin and anti-selectin therapy.
Intracellular receptors — the **nuclear receptor** superfamily for steroids, thyroid hormone, vitamin D, retinoids and lipid ligands — complete the list, and act as transcription factors rather than at the membrane.
:::

::: definition Second messengers {#def-second}
**Cyclic AMP** (adenylyl cyclase; removed by phosphodiesterases; effector PKA and cyclic-AMP-gated channels). **Cyclic GMP** (soluble guanylyl cyclase for nitric oxide, particulate guanylyl cyclase for natriuretic peptides; phosphodiesterase 5; effector PKG). **Diacylglycerol and IP₃** (phospholipase C; DAG activates protein kinase C, IP₃ releases endoplasmic-reticulum calcium). **Calcium**, buffered by the endoplasmic/sarcoplasmic reticulum SERCA pumps and mitochondria, acting through calmodulin, calcineurin and PKC. **PIP₃** (PI3K; countered by PTEN; effector AKT and PDK1). **Inositol polyphosphates, arachidionate eicosanoids, nitric oxide and carbon monoxide** as short-range messengers. Each is defined therapeutically almost as much by the enzymes that terminate it — phosphodiesterases, lipid phosphatases, calcium pumps and kinases — as by the enzymes that make it.
:::

### G-protein-coupled receptors

The G protein cycle is a molecular switch with a built-in timer. Agonist-bound receptor acts as a guanine-nucleotide exchange factor on Gα, which releases GDP, binds GTP, dissociates from Gβγ, and modulates an effector until its intrinsic GTPase — accelerated by RGS GTPase-activating proteins — turns it off.

The effectors: **Gs** stimulates adenylyl cyclase; **Gi/o** inhibits it and opens potassium channels (GIRK) while Gβγ subunits can activate PI3Kβ; **Gq/11** activates phospholipase Cβ, giving inositol-1,4,5-trisphosphate (IP₃) and diacylglycerol, hence calcium release from endoplasmic reticulum and protein kinase C activation; **G12/13** act on Rho GEFs and the cytoskeleton.

Two bacterial toxins are the classic teaching pair: cholera toxin ADP-ribosylates Gsα and locks it on, so adenylyl cyclase runs continuously and CFTR pours chloride into the gut; pertussis toxin ADP-ribosylates Gi and prevents it working, so inhibitory signalling fails, giving lymphocytosis (chemokine signalling requires Gi), pertussis toxin's own effects and, in the heart, unopposed stimulation.

Human disease has followed the same routes. Inactivating mutations of the vasopressin V2 receptor cause X-linked nephrogenic diabetes insipidus; activating mutations of the TSH receptor cause autosomal dominant non-autoimmune hyperthyroidism, and Gsα-activating "gsp" mutations occur in growth-hormone-secreting pituitary adenomas; inactivating mutations of the calcium-sensing receptor cause familial hypocalcaemic hypercalcaemia while activating ones cause hypocalcaemia; rhodopsin mutations cause retinitis pigmentosa; and deletion of the CCR5 co-receptor (the Δ32 allele) confers resistance to HIV-1 infection and is the reason a CCR5-edited cell therapy was ever attempted. **Pseudohypoparathyroidism type 1a**, with resistance to parathyroid hormone and to other hormones acting through Gs, plus the Albright hereditary osteodystrophy phenotype, comes from maternally inherited inactivating mutations of *GNAS*, whose imprinting explains the parent-of-origin-specific features of the same gene (also seen in McCune-Albright syndrome with a post-zygotic activating mutation).

### Receptor tyrosine kinases and the RAS–MAPK, PI3K axes

Ligand binding dimerises the receptor, its kinase domains trans-phosphorylate, and the phosphotyrosines recruit proteins with SH2 or PTB domains — GRB2/SOS to activate RAS, IRS proteins in insulin signalling, PI3K, PLCγ and SHP phosphatases. RAS-GTP recruits RAF, activating MEK1/2 and then ERK1/2, which enter the nucleus to induce FOS, MYC and cyclin D. PI3-Kinase makes PIP₃ at the membrane, recruiting PDK1 and AKT, which phosphorylate targets that inhibit TSC2 and GSK3, activate mTORC1 and promote growth, and inhibit FOXO transcription factors and the apoptotic machinery; **PTEN** reverses the lipid step and is one of the most frequently deleted tumour suppressors.

The clinical list is long enough to be a curriculum of its own: the RASopathies (NF1, Noonan, Costello and cardiofaciocutaneous syndromes) are developmental disorders caused by the same pathway being overactive; achondroplasia is a constitutively active FGFR3; HER2 amplification defines a breast-cancer subtype treated with trastuzumab and antibody–drug conjugates; activating *EGFR* mutations in lung cancer respond to osimertinib and acquire resistance through *T790M* and *C797S*, MET amplification or small-cell transformation; *KIT* and *PDGFRA* mutations make gastrointestinal stromal tumours imatinib-sensitive; *BRAF* V600E melanoma responds to BRAF plus MEK inhibition; and *PIK3CA*, *AKT* and *mTOR* inhibitors, and the PARP inhibitors of synthetic-lethality fame, all act on these branches. The toxicities are pathway toxicities: EGFR inhibition causes an acneiform rash, paronychia and diarrhoea because normal skin and gut need EGFR; VEGF-pathway inhibition causes hypertension, proteinuria, impaired wound healing and thrombosis.

### JAK–STAT, and its pharmacological success

Cytokine receptors have no intrinsic kinase activity; receptor-bound **JAK** kinases phosphorylate each other and the receptor, recruit **STAT** proteins, which dimerise and go straight to the nucleus. Growth hormone signals through JAK2 and STAT5b (loss of which causes Laron-type growth-hormone insensitivity, treated with insulin-like growth factor 1); erythropoietin through JAK2 (whose V617F mutation causes polycythaemia vera); interferons through STAT1/2; IL-6 through STAT3; and IL-2 through JAK3 (whose loss causes severe combined immunodeficiency). Gain-of-function *STAT3* mutations cause a multi-organ autoimmune and lymphoproliferative syndrome, loss-of-function causes the hyper-IgE (Job) syndrome with staphylococcal abscesses, pneumatoceles and characteristic facies. Because the pathway converges on many cytokines at once, JAK inhibitors (tofacitinib, baricitinib, upadacitinib) work in rheumatoid arthritis, inflammatory bowel disease, atopic dermatitis, alopecia and graft-versus-host disease — and carry class effects: herpes zoster reactivation, venous thrombosis, major cardiovascular events and malignancy signals that required labelling changes, a reminder that switching off a survival pathway has costs.

### Nuclear receptors

These are ligand-regulated transcription factors with a DNA-binding zinc-finger pair, a ligand-binding domain, and corepressor or coactivator complexes whose exchange is the switch. Thyroid hormone, vitamin D, retinoids, oestrogen, androgen, glucocorticoid, mineralocorticoid and progesterone receptors, plus the "permissive" PPARs, LXR, FXR and others, each control a defined gene set.

Clinical examples are mostly endocrine receptor syndromes and their drugs: complete androgen insensitivity (*AR*) gives a 46,XY female phenotype with breast development and absent uterus; the CAG expansion of *AR* in a gain-of-interaction manner causes spinal and bulbar muscular atrophy; glucocorticoid receptor mutations cause cortisol resistance with fatigue and raised ACTH; mineralocorticoid receptor activation by cortisol in the kidney is prevented by 11β-hydroxysteroid dehydrogenase type 2, whose deficiency gives the syndrome of apparent mineralocorticoid excess, and the receptor itself is the target of spironolactone and eplerenone; *VDR* mutations cause vitamin D-dependent rickets type II with alopecia and resistance to treatment; *PPARG* mutations cause familial partial lipodystrophy and insulin resistance, and PPARγ agonism (the glitazones) is the basis of a diabetes drug class; and in acute promyelocytic leukaemia the PML-RARA fusion blocks myeloid differentiation at the promyelocyte stage until pharmacological doses of all-trans retinoic acid release the corepressor complex and the cells differentiate — differentiation syndrome being the therapeutic effect turned dangerous. Resistance mechanisms — receptor mutations, alternative splicing, and bypass by other pathways — are the reason endocrine cancers are treated by sequences of receptor-targeting drugs.

### Developmental pathways that stay

**Notch** (ligand-induced proteolysis of the receptor's intracellular domain, which then acts as a transcription cofactor) governs binary cell-fate decisions: *NOTCH3* mutations cause CADASIL with subcortical strokes and dementia, *JAG1* and *NOTCH2* mutations cause Alagille syndrome with bile-duct paucity, and *NOTCH1* gain-of-function underlies a subset of T-cell leukaemia. **WNT** signalling, destroyed by an APC-containing destruction complex that degrades β-catenin, drives crypt proliferation; germline *APC* mutation causes familial adenomatous polyposis and the somatic *APC* mutation is the initiating event of most colorectal cancers. **Hedgehog** (PTCH1 relieving SMO, and GLI transcription factors) causes Gorlin syndrome and medulloblastoma subtype, and is druggable (vismodegib). **TGF-β and the SMADs** both restrain epithelial growth and drive fibrosis; *TGFBR1/2* mutations cause Loeys-Dietz aortic disease, *SMAD4* loss causes juvenile polyposis and is a late event in pancreatic cancer, and *ACVR1* gain of function causes fibrodysplasia ossificans progressiva.

::: example A malignant rise in temperature on the table {#ex-mh}
An 18-year-old has uneventful induction of anaesthesia with sevoflurane and suxamethonium for ankle fixation; after 20 minutes end-tidal carbon dioxide rises, the heart rate is 140, masseter spasm occurs, potassium rises from 4.2 to 6.4 mmol/L and temperature climbs steeply. What is the receptor defect, and why does dantrolene work?
::: solution
This is malignant hyperthermia susceptibility, usually a gain-of-function mutation in *RYR1*, the skeletal-muscle calcium-release channel of the sarcoplasmic reticulum, or less often in *CACNA1S*, the dihydropyridine receptor that senses the transverse-tubule voltage. Volatile anaesthetics and depolarising muscle relaxants trigger excessive calcium release; sustained contraction of the calcium pumps and the contractile apparatus consumes ATP, produces heat and carbon dioxide, and leaks potassium and muscle enzymes, so the earliest signs are unexplained hypercapnia and tachycardia, followed by rigidity, hyperkalaemia, rhabdomyolysis, acidosis and hyperthermia — a late and often terminal sign if the diagnosis waits for it. Dantrolene binds RYR1 and reduces calcium release, so it acts at the channel itself; management is to stop the triggering agents immediately, hyperventilate with 100% oxygen, give dantrolene, treat hyperkalaemia and acidosis, cool actively, watch for rhabdomyolysis and disseminated intravascular coagulation, and monitor for recurrence for at least a day. Family counselling, anaesthetic cards and avoidance of triggers (and the note that inhaled anaesthetics are safe for most other surgery, whereas suxamethonium must be avoided) are part of the same signalling lesion.
:::
:::

## The cell cycle and its enforcement

::: definition The cell-cycle engine {#def-cycle}
Progression is driven by **cyclin-dependent kinases** (CDKs) whose abundance is constant but whose activity depends on binding **cyclins**, on phosphorylation (activating by the CDK-activating kinase, inhibitory by Wee1, removed by the CDC25 phosphatases), and on CDK inhibitors of the INK4 family (p16^INK4a^, p15, p18, p19, which bind CDK4/6) and the CIP/KIP family (p21^CIP1^, p27^KIP1^, which inhibit CDK2 complexes). Cyclin D–CDK4/6 and then cyclin E–CDK2 hyperphosphorylate **retinoblastoma protein**, releasing **E2F** transcription factors and committing the cell to S phase; cyclin A–CDK2 drives replication, cyclin B–CDK1 mitosis; the anaphase-promoting complex/cyclosome (APC/C) ubiquitinates cyclin B and securin to end mitosis.
:::

Two checkpoints matter most clinically. The **DNA-damage checkpoints** use sensors and transducers — ATM responding to double-strand breaks and CHK2, ATR responding to replication stress and CHK1, both converging on p53 and on cell-cycle arrest — so that damage is repaired before it is replicated or segregated. **p53**, induced by these kinases and by ARF and released from MDM2, is the archetype of a tumour suppressor: it induces p21 (arrest), DNA-repair genes, cell-cycle arrest, senescence or apoptosis, and germline *TP53* mutations cause Li-Fraumeni syndrome with early sarcomas, breast cancer, brain tumours and adrenocortical carcinoma. The **spindle assembly checkpoint** prevents anaphase until every kinetochore is attached; its pharmacological disruption by taxanes, vinca alkaloids and agents that poison the mitotic spindle produces mitotic arrest and death in rapidly dividing cells.

Loss of these controls is the essence of cancer (see [[genetics/cancer-genetics]] and [[pathology/cancer-biology]]), but the pathway is also the reason cytotoxic therapy has a therapeutic window: bone marrow, gut crypts and hair follicles divide, and are damaged — hence myelosuppression, mucositis and alopecia — and the CDK4/6 inhibitors palbociclib, ribociclib and abemaciclib are used with endocrine therapy in oestrogen-receptor-positive breast cancer, an example of cell-cycle biology becoming an everyday prescription.

## Death as a signalling outcome

Two principal routes were contrasted in [[cell-biochemistry/cell-structure]]; here are their molecular controls.

- **Intrinsic (mitochondrial) apoptosis**: BH3-only sensors (PUMA, NOXA, BIM) inhibit the anti-apoptotic guardians BCL-2, BCL-XL and MCL1, allowing BAX and BAK to permeabilise the outer membrane; cytochrome c drives the APAF1 apoptosome and caspase 9. Venetoclax, a BCL-2 inhibitor, is lethal to cells that have become dependent on BCL-2 — chronic lymphocytic leukaemia being the paradigm — and the same mechanism is why BCL-2 up-regulation causes chemo-resistance.
- **Extrinsic (death-receptor) apoptosis**: FAS ligand and TRAIL with FADD, caspase 8 and, in some cells, BID cleavage linking the two routes. Loss of FAS causes autoimmune lymphoproliferative syndrome with double-negative T cells, splenomegaly and autoimmunity.
- **Programmed alternatives** with their own pharmacology: necroptosis through RIPK1/RIPK3 and MLKL; pyroptosis through inflammatory caspases and gasdermin D pores, downstream of inflammasomes (the mechanism of IL-1β release and of the colchicine and IL-1 blockade benefit in gout and pericarditis); ferroptosis through lipid peroxidation and glutathione peroxidase 4.
- **Senescence**: stable arrest with a secretory phenotype (the SASP), driven by persistent DNA-damage signalling and oncogene-induced p16 and p53; senescent cells accumulate with age and are being targeted experimentally by senolytics.

::: example A short child with very high growth hormone {#ex-laron}
An 8-year-old, height below the 0.4th centile, has parents of normal height, undetectable insulin-like growth factor 1 and insulin-like growth factor binding protein 3, and a growth hormone of 42 mU/L after a glucose load. What is the pathway defect, how do you confirm it, and what follows from the mechanism for treatment?
::: solution
Growth hormone acts through a dimeric cytokine receptor with JAK2, mainly inducing IGF1 from the liver and locally in growth plate, and STAT5b mediates much of the transcriptional response including the induction of acid-labile subunit and IGF1 itself. A phenotype of postnatal growth failure with very low IGF1 that does not rise on a short course of growth hormone, together with high endogenous growth hormone, is growth hormone insensitivity (Laron syndrome), most often from a *GHR* defect and, in some families, from *STAT5b* or post-receptor defects. Confirm with an IGF1 generation test and, where available, reduced STAT5b-dependent transcription or a surface receptor binding study, and sequence *GHR* and *STAT5b*; note the differential of an IGF1-receptor defect (low IGF1 with high IGFBP3, and often hyperglycaemia and micrognathia), of *IGF1* itself, and of an *ALS* (acid-labile subunit) deficiency, in which IGF1 and IGFBP3 are both low. Treatment bypasses the receptor: recombinant IGF1 (mecasermin) given subcutaneously twice daily, with monitoring for hypoglycaemia and for tonsillar and adenoid lymphoid tissue, and with the practical limitation that it must be started early to work at the growth plate. The mechanism also explains the metabolic phenotype that these families develop — the relative protection against cancer and against type 2 diabetes reported in the original Ecuadorian cohort — one of the clearest human examples of a signalling pathway determining two common diseases.
:::
:::

::: example The transplant patient with tremor and hypertension {#ex-calcineurin}
Two patients after renal transplantation, one on ciclosporin and one on tacrolimus, both develop tremor, headache, hypertension and a creatinine rise of 25% with a normal Doppler. Both are also given a proton-pump inhibitor and, in one case, an azole antifungal. Explain the shared mechanism, the drug interaction, and why sirolimus does not cause the same problem.
::: solution
Ciclosporin (with cyclophilin) and tacrolimus (with FKBP12) both inhibit **calcineurin**, the calcium–calmodulin-dependent phosphatase that dephosphorylates NFAT and lets it enter the nucleus to transcribe IL-2 and other cytokine genes; blocking the final common step of T-cell activation is why they are such effective immunosuppressants and why their toxicity is a class effect. Nephrotoxicity comes from afferent arteriolar vasoconstriction and, chronically, from interstitial fibrosis and arteriolar hyalinosis; hypertension is renal and vascular; neurotoxicity, tremor, headache and (rarely) PRES are shared, slightly more with tacrolimus, which also causes diabetes by β-cell toxicity. Both drugs are substrates of P-glycoprotein and CYP3A4, so azole antifungals, macrolides, diltiazem and grapefruit raise levels sharply, and enzyme inducers (rifampicin, some anticonvulsants) cause rejection; that is why these agents are given with measured trough levels and why a dose change is expected whenever an azole starts. Sirolimus binds FKBP12 too, but inhibits mTOR rather than calcineurin, blocking the response to IL-2 rather than its production, and so does not cause the arteriolar nephrotoxicity or hypertension — instead it causes mouth ulcers, oedema, hyperlipidaemia, proteinuria, impaired wound healing and pneumonitis. The lesson generalises: two drugs can bind the same intracellular protein and inhibit entirely different things, and the side-effect profile tells you which node of the pathway you have hit.
:::
:::

::: widget plot
f: x/(1+x); (x/(1+x))^e
x: 0, 5
y: 0, 1.05
sliders: e=0.2:0.05:1:0.05
labels: \text{receptor occupancy}; \text{response}
caption: Receptor occupancy and response as a function of ligand concentration expressed in units of $K_d$. With $e = 1$ the two curves coincide, and half the receptors must be occupied for half the response. Lower the exponent $e$ and the response curve moves left of occupancy: the tissue has **spare receptors**, so a drug can give a full response while occupying a small fraction of receptors. This is why the potency of an agonist depends on receptor density and on the efficiency of coupling, why partial agonists can behave as antagonists in a tissue with high receptor reserve, and why a dose–response curve measured in one tissue cannot be transferred to another.
:::

::: quiz
Nitric oxide lowers blood pressure by acting on vascular smooth muscle. Which mechanism is correct?
- [ ] It binds an endothelial receptor that activates phospholipase C.
- [x] It diffuses into the smooth-muscle cell and activates soluble guanylyl cyclase, raising cGMP and activating protein kinase G.
- [ ] It opens ATP-sensitive potassium channels directly.
- [ ] It inhibits phosphodiesterase 5, which is its physiological target.
::: solution
Nitric oxide activates soluble guanylyl cyclase by binding its haem iron, increasing cGMP and so activating PKG, which lowers intracellular calcium and relaxes smooth muscle. Phosphodiesterase 5 is the enzyme that breaks cGMP down — which is why sildenafil and related drugs *potentiate* rather than mimic nitric oxide, and why the combination with nitrate therapy causes profound hypotension. The endothelial release of nitric oxide is itself calcium-dependent and is disturbed in endothelial dysfunction, which is partly why erectile dysfunction and coronary disease share risk factors.
:::
:::

::: warning "Targeted" does not mean tumour-specific
The pathways that kinase inhibitors and monoclonal antibodies block are the same pathways that normal tissue uses: EGFR in skin and gut, VEGF in endothelium and kidney, BRAF/MEK in skin and myocardium, PDGFR in pericytes and testis, HER2 in myocardium. So an EGFR inhibitor causes rash, paronychia and diarrhoea; VEGF or VEGFR inhibitors cause hypertension, proteinuria, bleeding, impaired wound healing and sometimes arterial thrombosis; MEK inhibitors cause visual disturbance and a reversible fall in ejection fraction; trastuzumab can cause cardiomyopathy, especially after anthracyclines. Expect these, monitor blood pressure, echocardiographic function, urine protein and skin, plan wound healing around surgery, and treat them as adverse drug reactions rather than allergies. Resistance is the other half of the story — drug levels, secondary mutations in the target, activation of a parallel pathway, or lineage change — and the reason treatment is usually sequential and often combined.
:::

::: history
The chemical transmission of nerve signals was argued by Otto Loewi, whose 1921 frog-heart experiment — stimulating a vagal nerve and transferring the perfusate to a second heart to slow it — showed that a chemical is released; Henry Dale characterised acetylcholine, and the two shared the 1961 Nobel Prize. Sutherland's discovery of cyclic AMP as the intracellular "second messenger" of adrenaline earned the 1971 Nobel Prize; the phosphoinositide cycle and diacylglycerol were worked out by Yasutomi Nishizuka in the 1970s and 1980s, and calcium as a universal intracellular messenger was established over the same decades. Alfred Gilman and Martin Rodbell discovered the G proteins that couple receptors to effectors (Nobel Prize, 1994), and Robert Lefkowitz and Brian Kobilka the receptors themselves, including the visual pigment rhodopsin in structure (Nobel Prize, 2012). The cell-cycle engine came from genetics: Paul Nurse and Leland Hartwell's *cdc* mutants in yeast, with Tim Hunt's cyclins, earned the 2001 Nobel Prize; p53 was identified in 1979 and understood as a tumour suppressor during the 1980s; and the death programme was opened by the discovery of the *ced* genes in *Caenorhabditis elegans* by Robert Horvitz, with BCL-2 and the caspases following, for which Horvitz shared the 2002 Nobel Prize with Sydney Brenner and John Sulston.
:::

## Where this leads

The ion channels and pumps that these signals control are in [[cell-biochemistry/membranes-transport]]; the disposal systems and cytoskeleton in [[cell-biochemistry/cell-structure]]; receptor theory, dose–response and drug interactions in [[pharmacology/drug-receptor]]; the autonomic division of this system in [[physiology/autonomic-nervous-system]] and [[pharmacology/autonomic-drugs]]; failure of growth control in [[genetics/cancer-genetics]] and [[pathology/cancer-biology]].

::: summary
- Signalling chains have common properties — receptor-determined specificity, amplification, graded occupancy, desensitisation, feedback — and those properties explain potency, tolerance, and why the same messenger means different things in different tissues.
- Four surface receptor classes (ion channels, G-protein-coupled, enzyme-coupled, adhesion) plus intracellular nuclear receptors cover almost all hormonal, neurotransmitter and drug action.
- G proteins are GTPase timers; cholera and pertussis toxins, and inherited GPCR and G-protein disease, map the cycle; arrestins and GRKs explain desensitisation and biased signalling.
- RTK–RAS–MAPK and PI3K–AKT–mTOR, JAK–STAT, and the developmental Notch, WNT, hedgehog and TGF-β pathways are both disease mechanisms and drug targets, and their toxicities are pathway toxicities.
- The cell cycle runs on cyclin–CDK complexes, is restrained by INK4 and CIP/KIP inhibitors, Rb–E2F and p53, and is enforced by DNA-damage and spindle checkpoints; its pharmacological inhibition is routine cancer therapy.
- Cell death is a signalling outcome with several programmes — caspase-dependent apoptosis intrinsic and extrinsic, necroptosis, pyroptosis, ferroptosis, senescence — each with developing drugs.
:::

## Exercises

::: exercise Occupancy {level=1 check="0.9"}
A drug has a dissociation constant $K_d$ of 2 nM. What fraction of receptors is occupied at a free concentration of 18 nM?
::: solution
Occupancy $= \dfrac{[L]}{[L] + K_d} = \dfrac{18}{18 + 2} = 0.9$. Note that occupancy depends on *free* drug, and that a plasma concentration is not a receptor concentration — tissue binding, plasma-protein binding and compartment distribution all separate the two, which is why potency in a tissue and potency at a receptor differ.
:::
:::

::: exercise Agonist arithmetic {level=1}
Define potency and efficacy, and explain how a partial agonist can act as an antagonist in the same tissue.
::: solution
Potency is the concentration or dose needed for a given effect (commonly EC50), and is affected by affinity, receptor density and coupling efficiency; efficacy is the maximum response a drug can produce once receptors are occupied. A partial agonist has lower intrinsic efficacy than the endogenous transmitter, so in a tissue with few spare receptors it produces a submaximal response — and if the tissue is already fully stimulated by endogenous agonist, occupying some receptors with the lower-efficacy drug reduces the total response, i.e. it behaves as a functional antagonist. Buprenorphine at opioid receptors, pindolol and aripiprazole in their own systems, illustrate the same pharmacology, and the clinical consequences are the ceiling effect on respiratory depression and the withdrawal-precipitating risk when a partial agonist is given to a fully agonised patient.
:::
:::

::: exercise Match the pathway {level=1}
Name the dominant signalling route for each receptor: insulin, erythropoietin, nicotinic acetylcholine, thyroxine, ADH at V2, atrial natriuretic peptide.
::: solution
Insulin: receptor tyrosine kinase through IRS proteins to PI3K–AKT and Ras–MAPK. Erythropoietin: cytokine receptor with JAK2–STAT5. Nicotinic acetylcholine: ligand-gated cation channel (Na⁺/K⁺, depolarising end-plate potential). Thyroxine (as T3): intracellular nuclear thyroid hormone receptor regulating transcription. ADH at V2: Gs–adenylyl cyclase–PKA, with aquaporin-2 insertion. Atrial natriuretic peptide: receptor guanylyl cyclase, raising cGMP in target cells (and, in the vessel wall, the closely related nitric oxide pathway acting on soluble guanylyl cyclase).
:::
:::

::: exercise Second messenger to bedside {level=2}
Explain, using the pathway, (a) why a β₂-agonist tremor and hypokalaemia occur; (b) why sildenafil and a nitrate together cause profound hypotension; (c) why theophylline causes tachycardia and convulsions in overdose.
::: solution
(a) β₂-receptor → Gs → cyclic AMP → PKA in skeletal muscle enhances contractile and spindle-related signalling (tremor), and in skeletal muscle PKA increases Na⁺/K⁺-ATPase activity and drives potassium intracellularly, so plasma potassium falls; hyperglycaemia and lipolysis come from the same mechanism in liver and fat. (b) Nitrate therapy donates nitric oxide, activating soluble guanylyl cyclase and raising cGMP; sildenafil inhibits PDE5, the enzyme that hydrolyses cGMP in cavernous and vascular smooth muscle, so the two act on production and removal of the same messenger and the response multiplies, with syncope and myocardial ischaemia reported. (c) Theophylline inhibits phosphodiesterases (raising cyclic AMP and cyclic GMP generally) and blocks adenosine receptors; the cyclic AMP excess drives cardiac stimulation and arrhythmias and, with adenosine-receptor blockade lowering seizure threshold, convulsions — which is why theophylline's narrow therapeutic index requires level measurement and why its interactions (ciprofloxacin, macrolides, smoking induction of CYP1A2) matter so much.
:::
:::

::: exercise Receptor reserve and dose {level=2}
In tissue A a full response occurs when 5% of receptors are occupied; in tissue B the same drug requires 80% occupancy. Compare their sensitivity to (i) a non-competitive antagonist given at 50% receptor blockade and (ii) partial receptor irreversible inactivation.
::: solution
Tissue A has a large receptor reserve, tissue B little or none. In A, 50% of receptors blocked or destroyed still leaves five times the occupancy needed for a full response, so the dose–response curve shifts right only slightly and the maximum is preserved until reserve is exhausted; in B the same blockade reduces the maximum immediately. After irreversible antagonism, A shows a rightward shift first and then loss of maximum once reserve is used up, whereas B shows a depressed maximum with little change in apparent affinity — the classic experiment by which receptor reserve was demonstrated. Clinically, this is why tissues with high receptor reserve can tolerate a loss of receptors (as in down-regulation) without much change in response, and why the same drug can behave very differently in different organs.
:::
:::

::: exercise Checkpoint therapy {level=3}
A patient with metastatic breast cancer is started on a CDK4/6 inhibitor with an aromatase inhibitor. Explain the biology behind the combination, the expected toxicities, and how resistance arises.
::: solution
Oestrogen deprivation reduces cyclin D1 transcription in oestrogen-receptor-positive cells, so the cell's drive through the restriction point depends increasingly on CDK4/6; adding a CDK4/6 inhibitor keeps retinoblastoma protein hypophosphorylated, sequesters E2F and arrests cells in G1 — cytostatic synergy rather than two cytotoxics. The main toxicities are neutropenia (CDK4 and CDK6 are needed for myeloid progenitor proliferation, and the effect is largely reversible and less often febrile than chemotherapy-induced neutropenia), fatigue, diarrhoea (more with abemaciclib), and QT prolongation with ribociclib, requiring blood counts, liver function and ECG monitoring. Resistance occurs through loss or mutation of RB1 (no brake to enforce), amplification of CDK6 or CCNE1 and CDK2 activation, loss of the INK4A pathway in the other direction, and activation of alternative kinase signalling. The lesson for practice: a drug that enforces a checkpoint is only as good as the checkpoint it depends on, and its benefit is predicted by the tumour's dependence on that axis, not by its being "a cancer drug".
:::
:::

::: exercise Immunotherapy by pathway {level=3}
Explain why blocking PD-1 or PD-L1 can produce hypophysitis, thyroiditis, colitis, pneumonitis and type 1 diabetes, and how that should change ward management.
::: solution
The PD-1 pathway is a physiological tolerance mechanism: it restrains T cells in peripheral tissues, and it is co-opted by tumours to escape immunity. Releasing that brake therefore increases T-cell activity against self-antigens in organs where the pathway normally matters, producing immune-related adverse events that are, in effect, autoimmune disease with a drug trigger. Endocrine glands are prominent targets, and the pattern differs by drug: hypophysitis is characteristic of CTLA-4 blockade and may leave permanent anterior pituitary deficiency, whereas thyroid dysfunction is common with PD-1/PD-L1 inhibitors and often passes through a thyrotoxic phase to hypothyroidism; colitis and hepatitis present with diarrhoea and transaminitis; pneumonitis is the most feared; and a rapidly destructive β-cell failure produces insulin-dependent diabetes, sometimes with ketoacidosis. Management is to think of the diagnosis (these events appear weeks to months after starting and can occur after stopping), to exclude infection and progression, to grade severity, and to treat with corticosteroids for most organ involvement while holding the checkpoint inhibitor — but to replace hormone rather than immunosuppress in isolated hypopituitarism or hypothyroidism, and to escalate to infliximab or vedolizumab for steroid-refractory colitis. The practical ward rule is that an unexplained diarrhoea, cough, breathlessness, or a new headache or thirst in a patient on these drugs is an adverse event until proven otherwise, and that patients should carry a card and know which symptoms to report.
:::
:::

::: exercise Design an experiment {level=3}
A new small molecule protects cardiomyocytes from simulated ischaemia-reperfusion injury. You suspect it signals through the mitochondrial permeability transition and that a novel kinase phosphorylates the opening pore. Describe the experiments that would establish mechanism, target engagement and specificity.
::: solution
Mechanism first: measure the endpoint directly — mitochondrial membrane potential, calcein-cobalt quench or the swelling assay for the conductance pore, with genetic and pharmacological tools of known direction (cyclophilin D ligands, and *Ppif* deletion) as positive and negative controls, and with reactive oxygen species, calcium load and ATP as the recognised modulators. Then show the kinase is upstream: demonstrate that a kinase-inactive mutant, small interfering RNA or a structurally unrelated inhibitor abolishes protection, and that gain of function mimics it; establish phosphorylation of the candidate pore component by mass spectrometry with a phospho-specific antibody, and test whether phospho-null and phospho-mimetic mutants reproduce the phenotype. Target engagement needs a cellular readout of the kinase's own substrate phosphorylation and, if possible, direct binding (surface plasmon resonance or thermal shift) plus a crystal or cryo-electron-microscopy structure of the kinase with the compound. Specificity requires a counter-screen across the kinome, an off-target prediction, and demonstration that the protection is lost when the presumed target is removed — and then the whole story must be tested in an independent species and in vivo with infarct-size measurement and a blinded analysis. If the drug works through the pore but the kinase connection cannot be reproduced by a second method, the honest conclusion is a phenotypic observation without a mechanism, which is where much of translational cardiology has historically ended up.
:::
:::

::: exercise Dose–response in practice {level=3}
Two patients with the same tumour receive the same targeted drug at the same dose. One achieves a plasma concentration well above the in-vitro IC90 and has no response; the other has a level at the IC90 and a dramatic response. Propose four explanations that are not "the tumour is different".
::: solution
First, target engagement may not follow plasma concentration: the drug may be excluded from the tumour by poor perfusion, an ineffective blood–tumour barrier, may be pumped out by efflux transporters, or may be bound in plasma so the free concentration is lower than measured. Second, the assay system matters: an IC90 measured in cell lines at low serum may not translate, and the in-vivo pathway may be more active or driven by a bypass. Third, the tumour may be dependent on a parallel pathway not present in the line used for the assay, or the biopsy may have missed a subclone with a gatekeeper mutation that was present at a low frequency in the untreated tumour. Fourth, host factors change the pharmacology: drug interactions inducing metabolism, anti-drug antibodies for a biologic, differing receptor or target expression, and comorbidity and adherence. The general habit is to separate delivery (does enough active drug reach the target), engagement (is the target inhibited, measured by a pharmacodynamic marker), and dependence (does the tumour actually need that target) — a negative response can fail at any of the three, and the remedy is different each time.
:::
:::
