Transplantation and cancer pose opposite problems for the immune system. In transplantation the immune response is the enemy: a kidney from another person is foreign tissue, and without treatment the recipient's T cells and antibodies will destroy it. The aim is to suppress or avoid the response without leaving the patient defenceless against infection. In cancer the immune response is the ally, but tumours are made from self and have evolved to escape it. The aim is to strengthen or redirect the response without unleashing autoimmunity.

Both fields rest on the same science: MHC molecules and their recognition by T cells ([[immunology/antigen-recognition]]), costimulation and inhibitory receptors ([[immunology/adaptive-responses]], [[immunology/tolerance-regulation]]). The drugs used to stop rejection are the mirror image of the drugs used to treat cancer: one group blocks calcineurin or costimulation, the other blocks CTLA-4 and PD-1. This chapter covers transplantation first, then tumour immunology and immunotherapy.

## Why grafts are rejected

A graft from one part of a person's body to another (an **autograft**) or from an identical twin (a **syngeneic** graft) is accepted. A graft from a genetically different member of the same species (an **allograft**) is rejected unless the immune response is suppressed. A graft from another species (a **xenograft**) is rejected even more vigorously.

The main targets are the donor's **HLA molecules**, called **alloantigens** in this setting. ABO blood group antigens, which are expressed on endothelium as well as red cells, are also important, and minor histocompatibility antigens (polymorphic peptides from other proteins) matter especially in stem cell transplantation.

The T-cell response to foreign HLA is unusually strong. Between about 1% and 10% of all a person's T cells respond to a given foreign HLA type, compared with perhaps one in $10^5$ for a conventional microbial peptide. The reason is that T cells are selected in the thymus to recognise self HLA weakly; many of them cross-react strongly with a foreign HLA molecule carrying its own peptides, which resembles self HLA plus a foreign peptide.

::: definition Pathways of allorecognition {#def-allorecognition}
- **Direct allorecognition**: recipient T cells recognise intact donor HLA molecules on **donor** antigen-presenting cells (passenger dendritic cells carried in the graft). Because so many T cells respond, this pathway drives **acute** rejection early after transplantation. It wanes as donor dendritic cells disappear.
- **Indirect allorecognition**: **recipient** antigen-presenting cells take up donor HLA proteins and present their peptides on recipient MHC, like any foreign protein. This pathway persists for the life of the graft, provides help for **donor-specific antibody** production and contributes to **chronic** rejection.
:::

### HLA matching and the crossmatch

For kidney transplantation, matching concentrates on **HLA-A, HLA-B and HLA-DR**, giving a mismatch grade from 0 (no mismatches, "000") to 6 (two mismatches at each of the three loci, "222"). Fewer mismatches mean better long-term graft survival, especially at HLA-DR. Because each person inherits one HLA haplotype from each parent, a sibling has a one in four chance of being HLA-identical.

**Sensitisation** is the presence of antibodies against HLA. It follows exposure to foreign HLA through **pregnancy**, **blood transfusion** or a **previous transplant**. A sensitised recipient who receives a kidney carrying the HLA type their antibodies recognise is at risk of immediate antibody-mediated rejection. Before transplantation, the recipient's serum is therefore screened against a panel of single HLA antigens on beads (detecting **donor-specific antibodies**, DSA), and a **crossmatch** is performed, either directly (testing recipient serum against donor lymphocytes) or virtually (comparing the antibody profile with the donor's HLA type). A positive crossmatch normally rules out the transplant. Highly sensitised patients wait much longer for a compatible organ.

::: example A husband who wants to donate {#ex-sensitised}
A 39-year-old woman with kidney failure from IgA nephropathy has had three pregnancies with her husband and received a blood transfusion after her last delivery. Her husband, who is blood group compatible, offers to donate a kidney. Her antibody screening shows strong antibodies against HLA-B7 and HLA-DR15, both of which her husband carries, and the crossmatch with his cells is positive. Explain why she has these antibodies and what options remain.
::: solution
**Why.** During each pregnancy, fetal cells and debris carrying the husband's HLA (inherited by the children) entered her circulation, especially at delivery. These paternal HLA molecules are foreign to her, and she made IgG antibodies against them; the transfusion added further exposure to foreign HLA. Long-lived plasma cells and memory B cells maintain these antibodies. A kidney from her husband would carry the same HLA-B7 and HLA-DR15, and the preformed antibodies would bind the graft endothelium immediately, risking hyperacute or early antibody-mediated rejection. The positive crossmatch confirms this.

**Options.** The UK Living Kidney Sharing Scheme allows incompatible donor–recipient pairs to exchange donors with other pairs, so her husband could donate to someone compatible with him while she receives a kidney from a donor whose HLA her antibodies do not recognise. She also remains on the deceased-donor list, where her high sensitisation gives her some priority. Antibody-incompatible transplantation after desensitisation (plasma exchange, intravenous immunoglobulin and B-cell-directed therapy to lower antibody levels) is possible in specialist centres but carries a higher risk of rejection. The choice is made with the transplant team.
:::
:::

::: widget plot
f: 1 - (3/4)^x; 1 - (1 - p)^x
x: 0, 10
y: 0, 1
sliders: p=0.25:0.01:0.5:0.01
points: 1, 0.25; 2, 0.4375; 3, 0.578125
labels: \text{at least one HLA-identical sibling}; \text{at least one match, per-donor probability } p
caption: The probability that at least one of $n$ siblings is HLA-identical to a patient, $1 - (3/4)^n$, assuming full siblings with the same two parents and no recombination within the HLA region. With one sibling it is 25%; with three, about 58%. The second curve shows the same calculation for any per-donor match probability $p$. Most patients without a matched sibling now find an unrelated or haploidentical donor.
:::

## Types of rejection

::: definition Types of allograft rejection {#def-rejection}
- **Hyperacute rejection** occurs within minutes to hours. It is caused by **preformed antibodies** in the recipient against donor ABO antigens or HLA, which bind graft endothelium, activate complement and cause thrombosis of the graft's vessels. It cannot be treated, so it is prevented by ABO matching and crossmatching; it is now rare.
- **Acute T-cell-mediated rejection** usually occurs in the first weeks to months, though it can happen at any time, especially if immunosuppression is reduced. Recipient T cells infiltrate the graft; in the kidney they invade tubules (**tubulitis**) and the interstitium, and in severe cases arteries. It usually responds to increased immunosuppression, such as pulsed corticosteroids.
- **Antibody-mediated rejection** is caused by donor-specific antibodies binding endothelium. Biopsy shows inflammation in the small vessels (glomerulitis, peritubular capillaritis) and often deposition of the complement fragment **C4d** in peritubular capillaries. It can be acute or chronic, and it is harder to treat.
- **Chronic rejection** develops over months to years and is the main cause of late graft loss. It is mediated largely by antibody and indirect allorecognition. It causes progressive scarring and narrowing of arteries (**transplant vasculopathy**): interstitial fibrosis and transplant glomerulopathy in the kidney, cardiac allograft vasculopathy in the heart, and bronchiolitis obliterans in the lung.
:::

Organs differ in how strongly they provoke rejection. The **liver** is relatively tolerant: it can be transplanted across a positive crossmatch, and patients often need less immunosuppression. The **cornea** is avascular and immune-privileged, so corneal grafts are usually not HLA-matched. The **small bowel**, **lung** and **skin** are highly immunogenic.

## Immunosuppression

Immunosuppressive treatment has two phases. **Induction** therapy at the time of transplantation gives intense suppression when the risk of rejection is highest: an IL-2 receptor antibody such as **basiliximab** for standard-risk recipients, or a lymphocyte-depleting agent such as **alemtuzumab** (anti-CD52) or **anti-thymocyte globulin** for higher-risk recipients. **Maintenance** therapy then continues for the life of the graft, typically a combination of drugs acting at different steps of T-cell activation.

::: theorem Maintenance immunosuppression targets the three signals {#thm-immunosuppression}
| Drug class | Example | Target | Main adverse effects |
|---|---|---|---|
| Calcineurin inhibitors | Tacrolimus, ciclosporin | Signal 1: calcineurin–NFAT, so no IL-2 transcription | Nephrotoxicity, hypertension, diabetes after transplantation, tremor, hyperkalaemia |
| Antiproliferative agents | Mycophenolate mofetil, azathioprine | DNA synthesis in proliferating lymphocytes | Bone marrow suppression, gut upset; mycophenolate is teratogenic |
| Corticosteroids | Prednisolone | Many pro-inflammatory genes | Diabetes, osteoporosis, weight gain, infection |
| mTOR inhibitors | Sirolimus, everolimus | Signal 3: proliferation driven by IL-2 | Poor wound healing, hyperlipidaemia, mouth ulcers, pneumonitis |
| Costimulation blockers | Belatacept | Signal 2: CD80/CD86 | Post-transplant lymphoproliferative disorder in EBV-negative recipients |

A common kidney transplant regimen in the UK combines tacrolimus, mycophenolate and prednisolone, with drug choices and target levels set by the transplant centre.
:::

Tacrolimus and ciclosporin have narrow therapeutic ranges and are metabolised by **CYP3A4**. Drugs that inhibit this enzyme (clarithromycin, azole antifungals, diltiazem, grapefruit juice) can raise levels into the toxic range, and inducers (rifampicin, carbamazepine, St John's wort) can lower them and cause rejection. Blood levels are monitored, and any new prescription for a transplant recipient should be checked for interactions.

The cost of immunosuppression is predictable from what is suppressed:

- **Infection**: in the first month, mainly ordinary surgical and hospital infections; from 1 to 6 months, opportunistic infections such as **CMV**, **BK polyomavirus** and *Pneumocystis*, which is why prophylaxis is given in this period; later, community infections, with continuing risk.
- **Cancer**: an increased risk of cancers driven by viruses, which are normally controlled by T cells. Cutaneous **squamous cell carcinoma** is the commonest, many times more frequent than in the general population, and is driven by ultraviolet damage and possibly papillomaviruses. **Post-transplant lymphoproliferative disorder** (PTLD) is usually driven by EBV. Kaposi sarcoma (HHV-8) and anogenital cancers (HPV) are also increased.
- **Drug toxicity**, especially calcineurin-inhibitor nephrotoxicity, which can be mistaken for rejection.

::: example A rising creatinine after kidney transplant {#ex-bk}
A 49-year-old woman received a deceased-donor kidney transplant 5 months ago. She takes tacrolimus, mycophenolate and prednisolone. Her creatinine has risen from 110 to 165 µmol/L over 3 weeks. She feels well. Her tacrolimus level is within the target range. Plasma BK virus PCR shows a high and rising viral load. What are the possible causes, and how is the distinction made?
::: solution
**Differential.** A rising creatinine at 5 months may be due to acute rejection (T-cell-mediated or antibody-mediated), **BK polyomavirus nephropathy**, calcineurin-inhibitor toxicity, ureteric obstruction or stenosis, renal artery stenosis, dehydration, infection, or recurrence of the original kidney disease.

**The BK clue.** BK virus infects most people in childhood and remains latent in the urinary tract. Intense immunosuppression allows it to reactivate in the graft's tubular cells, causing tubular damage and inflammation. A high and rising plasma BK load at 2 to 6 months after transplantation strongly suggests BK nephropathy.

**Making the distinction.** Ultrasound excludes obstruction. A **graft biopsy** is the key test. In BK nephropathy it shows viral inclusions in tubular cells and positive immunohistochemistry for the SV40 large T antigen; in T-cell-mediated rejection, tubulitis without viral cytopathic change; in antibody-mediated rejection, microvascular inflammation, often with C4d staining and circulating donor-specific antibodies.

**Why it matters.** The treatments are opposite. BK nephropathy is treated by **reducing** immunosuppression (often reducing or stopping mycophenolate) so that T cells can control the virus; acute rejection is treated by **increasing** it. Giving pulsed steroids for presumed rejection in a patient with BK nephropathy would worsen the infection. Because both can coexist, and reducing immunosuppression can provoke rejection, the patient is monitored closely by the transplant team.
:::
:::

## Haematopoietic stem cell transplantation

In **haematopoietic stem cell transplantation** (HSCT), the recipient's bone marrow is replaced with donor stem cells after "conditioning" with chemotherapy, with or without irradiation. Allogeneic HSCT is used to treat leukaemia, lymphoma, bone marrow failure and inherited disorders such as SCID and haemoglobinopathies.

Here the direction of the immune problem is reversed. The graft contains a donor immune system, and the recipient is the target.

::: definition Graft-versus-host disease and graft-versus-leukaemia {#def-gvhd}
**Graft-versus-host disease** (GvHD) occurs when donor T cells in an allogeneic graft recognise the recipient's HLA and minor histocompatibility antigens as foreign and attack the recipient's tissues. **Acute GvHD** affects mainly the **skin** (maculopapular rash, starting on the palms and soles), **gut** (diarrhoea, abdominal pain) and **liver** (cholestatic jaundice). **Chronic GvHD** resembles autoimmune disease, with skin sclerosis, dry eyes and mouth, lung disease (bronchiolitis obliterans) and liver involvement.

The **graft-versus-leukaemia** (GvL) effect is the same process directed against residual malignant cells: donor T cells and NK cells recognise the recipient's leukaemia cells and kill them. It is a major reason allogeneic HSCT cures leukaemias that chemotherapy alone does not.
:::

The two effects are hard to separate, because both depend on donor T cells recognising recipient antigens. Removing T cells from the graft reduces GvHD but increases relapse and graft failure. **Donor lymphocyte infusion** after transplantation deliberately boosts the GvL effect when leukaemia relapses, at the cost of GvHD. HLA matching for HSCT is stricter than for solid organs, usually at HLA-A, -B, -C, -DRB1 and -DQB1 (a "10 out of 10" match), because the graft contains the immune cells. The availability of **haploidentical** donors (sharing one haplotype, usually a parent, child or sibling), made possible by giving cyclophosphamide after transplantation to eliminate the most alloreactive T cells, means that almost every patient now has a potential donor.

Transfusion-associated GvHD, mentioned in [[immunology/hypersensitivity]], is a related, almost always fatal condition caused by viable lymphocytes in a blood transfusion engrafting in a recipient who cannot reject them. It is prevented by irradiating blood components for at-risk recipients.

## Tumour immunology

### Immunosurveillance and immunoediting

The idea that the immune system protects against cancer was proposed by Paul Ehrlich in 1909 and developed as the **immunosurveillance** hypothesis by Burnet and Lewis Thomas in the 1950s and 1960s. Clinical evidence supports it in part: people who are immunosuppressed, after transplantation or with HIV, have a greatly increased risk of cancers, especially virus-driven ones. In many solid tumours, a dense infiltrate of cytotoxic T cells is associated with better survival.

::: theorem Cancer immunoediting {#thm-immunoediting}
The interaction between a developing tumour and the immune system can be described in three phases:

1. **Elimination**: the innate and adaptive immune systems detect and destroy transformed cells.
2. **Equilibrium**: tumour cells that survive are held in check by the immune system, sometimes for years, while further mutations accumulate.
3. **Escape**: tumour variants that have become poorly immunogenic or immunosuppressive grow and become clinically apparent.

A tumour that presents clinically has, by definition, already escaped, so its properties reflect selection by the immune system.
:::

### Tumour antigens

T cells can recognise tumours because tumours contain antigens that differ from normal tissue:

- **neoantigens**, created by somatic mutations that change protein sequences. These are truly foreign and not covered by central tolerance. Tumours with many mutations (high **tumour mutational burden**), such as melanoma, smoking-related lung cancer and cancers with **mismatch repair deficiency** (dMMR, or microsatellite instability, MSI-high), have more neoantigens and respond better to checkpoint inhibitors;
- **viral antigens** in virus-driven cancers: HPV E6 and E7 in cervical and oropharyngeal cancer, EBV in some lymphomas and nasopharyngeal carcinoma, HBV and HCV in hepatocellular carcinoma, HHV-8 in Kaposi sarcoma;
- **cancer–testis antigens**, normally expressed only in germ cells (which lack MHC class I) and re-expressed in some tumours;
- **differentiation antigens** of the tissue of origin, such as CD19 and CD20 on B-cell cancers and melanocyte proteins in melanoma; targeting these damages normal cells of the same lineage too;
- **overexpressed** proteins such as HER2 in some breast and gastric cancers.

### How tumours escape

- **Loss of antigen presentation**: mutations in HLA genes, in β2-microglobulin or in the antigen-processing machinery reduce MHC class I expression, hiding the tumour from CD8 T cells (though potentially exposing it to NK cells).
- **Inhibitory ligands**: tumours and the infiltrating myeloid cells express **PD-L1**, often induced by interferon-gamma from the T cells attacking them, which switches off PD-1-positive T cells.
- **An immunosuppressive microenvironment**: regulatory T cells, myeloid-derived suppressor cells and tumour-associated macrophages; cytokines such as TGF-β and IL-10; metabolic suppression by the enzyme indoleamine 2,3-dioxygenase (IDO) and by adenosine.
- **Exclusion**: some tumours ("cold" tumours) have stroma that prevents T cells from entering at all.

## Cancer immunotherapy

### Checkpoint inhibitors

**Immune checkpoint inhibitors** are antibodies that block inhibitory receptors on T cells. **Ipilimumab** (anti-CTLA-4) was approved for advanced melanoma in 2011, and the anti-PD-1 antibodies **pembrolizumab** and **nivolumab** in 2014; anti-PD-L1 antibodies such as **atezolizumab** and **durvalumab** followed. They are now used in many cancers, including melanoma, lung, kidney, bladder, head and neck cancers, Hodgkin lymphoma and dMMR tumours of any site, sometimes alone, sometimes with chemotherapy, and increasingly before or after surgery.

They do not attack tumour cells directly. They release the brakes on T cells that already recognise the tumour, so they work best in tumours with many neoantigens and a pre-existing T-cell infiltrate. When they work, responses can be durable for years. Predictive biomarkers include PD-L1 expression on tumour or immune cells, mismatch repair status and tumour mutational burden, but none is perfect.

Because they release tolerance generally, checkpoint inhibitors cause **immune-related adverse events** (irAEs), described in [[immunology/tolerance-regulation]]. They can affect almost any organ: commonly skin, colon, liver, lungs, thyroid, pituitary and joints, and rarely heart (myocarditis), nervous system and pancreatic islets. They are more frequent with anti-CTLA-4 and with combination therapy. The general principles, set out in ESMO and other guidelines, are early recognition, grading of severity, exclusion of alternative causes such as infection, withholding the drug and starting corticosteroids for moderate to severe events, and further immunosuppression for steroid-refractory cases. Endocrine irAEs such as hypothyroidism and hypophysitis are usually managed with hormone replacement and are often permanent.

::: example A cancer with a mismatch repair defect {#ex-dmmr}
A 44-year-old woman has metastatic colorectal cancer. Testing of the tumour shows loss of the mismatch repair proteins MLH1 and PMS2 (dMMR, MSI-high). Explain why this result makes her a candidate for checkpoint inhibitor therapy and what it implies for her family.
::: solution
**Immunological reasoning.** Mismatch repair corrects errors made during DNA replication. Without it, tumour cells accumulate thousands of mutations, especially insertions and deletions in repetitive sequences, which shift the reading frame and create entirely new peptide sequences. Many of these are presented on MHC class I as **neoantigens**, which T cells recognise as foreign. dMMR tumours are therefore heavily infiltrated by T cells, which are held in check by PD-1/PD-L1 signalling. Blocking PD-1 with pembrolizumab releases these T cells. In metastatic dMMR colorectal cancer, first-line pembrolizumab improved progression-free survival compared with chemotherapy in the KEYNOTE-177 trial, and it is recommended in this setting by NICE. Most colorectal cancers are mismatch-repair proficient and respond poorly to checkpoint inhibitors alone.

**Family implications.** dMMR colorectal cancer in a young person may be due to **Lynch syndrome**, an inherited mismatch repair gene variant. Loss of MLH1 is often caused by acquired methylation of the MLH1 promoter (common in older patients) rather than Lynch syndrome, so the next step is testing for MLH1 promoter methylation (or *BRAF* V600E), followed by germline genetic testing if indicated, with genetic counselling. Relatives found to carry a Lynch variant would be offered colonoscopic surveillance and other measures. See [[genetics/cancer-genetics]].
:::
:::

### Engineered T cells and antibodies

**Chimeric antigen receptor (CAR) T cells** are the patient's own T cells, collected and genetically modified to express a synthetic receptor. A CAR combines an antibody-derived binding domain (recognising, for example, **CD19** on B cells or **BCMA** on myeloma cells) with the signalling domain of CD3ζ and a costimulatory domain such as CD28 or 4-1BB. CAR T cells recognise native surface antigen without MHC restriction, expand in the patient and kill target cells. The first CAR-T therapy, tisagenlecleucel, was approved in the US in 2017 for children and young adults with relapsed B-cell acute lymphoblastic leukaemia. CAR-T therapy can cure some patients with refractory B-cell leukaemia and lymphoma, and gives long remissions in myeloma.

Its characteristic toxicities follow from its mechanism:

- **Cytokine release syndrome** (CRS): massive T-cell activation releases IL-6 and other cytokines, causing fever, hypotension and hypoxia, usually within the first days to two weeks. It is treated with the IL-6 receptor antibody **tocilizumab** and, if needed, corticosteroids.
- **Immune effector cell-associated neurotoxicity syndrome** (ICANS): confusion, dysphasia, seizures and cerebral oedema.
- **On-target, off-tumour toxicity**: CD19 CAR-T cells destroy normal B cells, causing prolonged B-cell aplasia and hypogammaglobulinaemia that may need immunoglobulin replacement.

**Bispecific T-cell engagers** are antibodies with two binding sites, one for CD3 on T cells and one for a tumour antigen; **blinatumomab** (CD19 × CD3) links any T cell to a leukaemia cell. Conventional **monoclonal antibodies** against tumour antigens, such as **rituximab** (CD20) and **trastuzumab** (HER2), act by ADCC, complement activation and signalling blockade (see [[immunology/vaccines-immunotherapy]]).

::: example Fever after CAR-T therapy {#ex-crs}
A 58-year-old man with relapsed diffuse large B-cell lymphoma receives CD19-directed CAR-T cells. Three days later he has a temperature of 39.5 °C, heart rate 125 per minute, blood pressure 88/50 mmHg and oxygen saturation 92% on air. His CRP and ferritin are very high. Explain the mechanism and the principles of management.
::: solution
**Mechanism.** This is most likely **cytokine release syndrome**. The CAR T cells meet CD19 on lymphoma cells and normal B cells, become activated and proliferate rapidly, releasing interferon-gamma and other cytokines. These activate macrophages, which release large amounts of **IL-6** and IL-1. IL-6 drives fever, the acute-phase response (very high CRP and ferritin), capillary leak, hypotension and hypoxia. The timing, a few days after infusion, matches CAR-T expansion.

**Management principles.** Grade CRS by its severity (fever, hypotension, hypoxia), which determines treatment according to the treating centre's protocol. Because he is neutropenic and immunosuppressed after lymphodepleting chemotherapy, infection must be presumed and treated at the same time: blood cultures and immediate broad-spectrum antibiotics. Give fluids and oxygen. With hypotension and hypoxia, the IL-6 receptor antibody **tocilizumab** is given, and corticosteroids are added if the response is inadequate; escalation to critical care for vasopressors may be needed. Monitor closely for **ICANS** (with regular neurological assessment such as a simple writing and naming test) and treat with corticosteroids if it develops. Modern management has made CRS largely manageable without abolishing the anti-tumour effect.
:::
:::

:::warning
Do not assume that an immunosuppressed patient will show the usual signs of infection or rejection, or that a patient on checkpoint inhibitors has "just an infection" or "just a side effect". Transplant recipients may have serious infection with little fever because of steroids; a patient on a checkpoint inhibitor with diarrhoea may have *C. difficile*, immune-related colitis or both. In both situations the treatment of one cause (more immunosuppression or less) can worsen the other, so investigation to establish the mechanism comes before treatment wherever the patient's condition allows.
:::

::: quiz
A kidney transplant recipient develops graft dysfunction 8 years after transplantation. Biopsy shows interstitial fibrosis, tubular atrophy, duplication of the glomerular basement membrane and narrowing of arteries with intimal thickening. Donor-specific anti-HLA antibodies are detected. Which process is most likely?
- [ ] Hyperacute rejection
- [ ] Acute T-cell-mediated rejection
- [x] Chronic antibody-mediated rejection
- [ ] BK polyomavirus nephropathy
::: solution
Late, slowly progressive dysfunction with transplant glomerulopathy (duplication of the basement membrane), arterial intimal thickening and circulating donor-specific antibodies is **chronic antibody-mediated rejection**, the leading cause of late kidney graft loss. Hyperacute rejection occurs within minutes to hours, acute T-cell-mediated rejection causes tubulitis and interstitial inflammation, and BK nephropathy usually occurs in the first year with viral changes in tubular cells.
:::
:::

::: history
During the Second World War, Peter Medawar studied skin grafts in burned airmen and showed, in rabbits, that a second graft from the same donor is rejected faster than the first: rejection was an immune response with memory. In 1954 Joseph Murray's team in Boston transplanted a kidney between identical twins, Ronald and Richard Herrick, avoiding rejection altogether. Azathioprine, introduced by Roy Calne and others in the early 1960s, allowed transplantation between non-identical donors, and the discovery of ciclosporin's immunosuppressive action by Jean-François Borel in the 1970s, followed by its clinical use by Calne, transformed results in the early 1980s. Murray shared the 1990 Nobel Prize with E. Donnall Thomas, a pioneer of bone marrow transplantation.

In the 1890s the New York surgeon William Coley injected bacterial mixtures ("Coley's toxins") into inoperable sarcomas and reported some regressions, an early, crude attempt at cancer immunotherapy. A century later, James Allison showed in 1996 that blocking CTLA-4 caused tumour rejection in mice, and Tasuku Honjo's group, which had discovered PD-1 in 1992, showed its role as an inhibitory receptor. They shared the 2018 Nobel Prize. Zelig Eshhar and colleagues described the first chimeric antigen receptors in 1989, the starting point for CAR-T therapy.
:::

## Where this leads

The clinical care of transplant recipients is covered in [[renal/chronic-kidney-disease]] and [[infectious-diseases/immunocompromised-host]]; haematological transplantation in [[blood/leukaemia]]; cancer biology in [[pathology/cancer-biology]]. Vaccines against cancer-causing viruses and therapeutic antibodies are discussed in [[immunology/vaccines-immunotherapy]].

::: summary
- Allografts are rejected mainly because of HLA differences. Many T cells (1–10%) recognise foreign HLA directly on donor antigen-presenting cells; indirect presentation of donor peptides by recipient cells drives donor-specific antibody and chronic rejection.
- Kidney matching focuses on HLA-A, -B and -DR; sensitisation by pregnancy, transfusion or previous transplants is detected by antibody screening and the crossmatch. A sibling is HLA-identical with probability 1/4.
- Rejection may be hyperacute (preformed antibody, minutes), acute T-cell-mediated (tubulitis; steroid-responsive), antibody-mediated (DSA, microvascular inflammation, C4d) or chronic (vasculopathy and fibrosis).
- Maintenance immunosuppression combines calcineurin inhibitors, antiproliferative drugs and steroids, targeting the signals of T-cell activation. Its costs are opportunistic infection (CMV, BK, *Pneumocystis*), virus-driven cancers and drug toxicity; tacrolimus interacts with CYP3A4 inhibitors and inducers.
- In HSCT, donor T cells cause GvHD (skin, gut, liver) but also the beneficial graft-versus-leukaemia effect.
- Tumours are recognised through neoantigens, viral antigens and other tumour antigens; they escape by losing MHC class I, expressing PD-L1 and creating a suppressive microenvironment (immunoediting).
- Checkpoint inhibitors (anti-CTLA-4, anti-PD-1, anti-PD-L1) work best in tumours with many neoantigens, such as dMMR cancers, and cause immune-related adverse events.
- CAR-T cells and bispecific engagers redirect T cells to surface antigens such as CD19 and BCMA; cytokine release syndrome (IL-6, treated with tocilizumab), neurotoxicity and B-cell aplasia are their typical toxicities.
:::

## Exercises

::: exercise Counting mismatches {level=1 check="3"}
A recipient types as HLA-A1, A2; B8, B44; DR3, DR4. The donor types as HLA-A1, A3; B8, B7; DR4, DR15. How many HLA-A, -B and -DR mismatches are there (counting donor antigens absent from the recipient)?
::: solution
A: donor A1 (present in recipient) and A3 (absent): 1 mismatch. B: B8 (present) and B7 (absent): 1 mismatch. DR: DR4 (present) and DR15 (absent): 1 mismatch. Total: 3, a "111" mismatch.
:::
:::

::: exercise Siblings as donors {level=1 check="1 - (3/4)^3"}
A patient with leukaemia has three full siblings. Assuming independent inheritance and no recombination, what is the probability that at least one sibling is HLA-identical? Give the exact value or a decimal.
::: solution
The probability that a given sibling is not identical is $3/4$, so the probability that none of three is identical is $(3/4)^3 = 27/64$. The probability that at least one is identical is $1 - 27/64 = 37/64 \approx 0.578$.
:::
:::

::: exercise Name the rejection {level=1}
State the type of rejection most likely in each case: (a) a kidney becomes dusky and mottled within minutes of reperfusion in theatre; (b) at 3 weeks, creatinine rises and biopsy shows tubulitis; (c) 10 years after a heart transplant, angiography shows diffuse concentric narrowing of the coronary arteries.
::: solution
(a) Hyperacute rejection, from preformed anti-donor antibodies (now very rare because of crossmatching). (b) Acute T-cell-mediated rejection. (c) Chronic rejection: cardiac allograft vasculopathy.
:::
:::

::: exercise A new antibiotic {level=2}
A heart transplant recipient on tacrolimus is prescribed clarithromycin for a chest infection by an out-of-hours doctor. Five days later she is admitted with tremor, confusion, hyperkalaemia and acute kidney injury. Explain the mechanism and how it could have been prevented.
::: solution
Clarithromycin is a strong inhibitor of **CYP3A4** (and of P-glycoprotein), the main pathways of tacrolimus metabolism and efflux. Her tacrolimus level will have risen substantially, causing toxicity: neurotoxicity (tremor, confusion), nephrotoxicity from vasoconstriction of the afferent arteriole, and hyperkalaemia. It could have been prevented by checking for interactions before prescribing (an interaction checker or the BNF), choosing an antibiotic that does not interact, such as amoxicillin or doxycycline where appropriate, or, if clarithromycin was essential, reducing the tacrolimus dose in discussion with the transplant team and checking levels within days. Transplant recipients should be advised to tell any prescriber that they take tacrolimus.
:::
:::

::: exercise Why liver and cornea are different {level=2}
Explain why corneal grafts are usually performed without HLA matching or systemic immunosuppression, while lung transplants need intensive immunosuppression.
::: solution
The cornea is **avascular** and has no lymphatics in its central part, so donor antigens and passenger dendritic cells have little access to the recipient's lymph nodes. The eye is immune-privileged, with Fas ligand, TGF-β and other inhibitory signals in the anterior chamber. Most corneal grafts therefore survive with topical steroids alone; risk rises when the recipient cornea has become vascularised by previous inflammation. The lung, by contrast, is richly vascularised, has abundant lymphatic drainage and many donor dendritic cells, and is constantly exposed to inhaled microbes and particles that activate innate immunity and provide costimulation. Lung transplants therefore provoke strong direct and indirect allorecognition and have the highest rates of acute and chronic rejection (bronchiolitis obliterans) of the common solid organs.
:::
:::

::: exercise Skin cancer after transplant {level=2}
A 63-year-old man who has had a kidney transplant for 15 years has developed his sixth cutaneous squamous cell carcinoma. Explain why his risk is so high and what can be done.
::: solution
Cutaneous squamous cell carcinoma is many times more common in organ transplant recipients than in the general population, rising with the duration and intensity of immunosuppression. Ultraviolet light causes many mutations in keratinocytes, producing neoantigens normally recognised by T cells; immunosuppression impairs this surveillance, and some drugs (azathioprine, which sensitises DNA to UVA, and calcineurin inhibitors) may contribute directly. Human papillomaviruses may also play a part. Measures include strict sun protection and regular skin examination, early treatment of premalignant lesions, and, in discussion with the transplant team, adjusting immunosuppression, for example reducing doses or switching from a calcineurin inhibitor to an mTOR inhibitor such as sirolimus, which has anti-proliferative effects and reduces new skin cancers in some patients. Oral nicotinamide or acitretin is used in some patients to reduce new tumours.
:::
:::

::: exercise Checkpoint inhibitors after transplant {level=3}
A 66-year-old man with a functioning kidney transplant develops metastatic melanoma. His oncologist considers a PD-1 inhibitor. Discuss the immunological risk and how it might be weighed.
::: solution
PD-1 and PD-L1 contribute to peripheral tolerance of the graft: the graft endothelium and tubular cells express PD-L1, which restrains alloreactive T cells. Blocking PD-1 can therefore precipitate **acute rejection**, reported in a substantial proportion of kidney transplant recipients treated with checkpoint inhibitors (with anti-PD-1 thought to carry a higher risk than anti-CTLA-4), sometimes with irreversible graft loss. His existing immunosuppression may also reduce the anti-tumour response. The decision is weighed between the high mortality of untreated metastatic melanoma and the consequences of graft loss: a kidney transplant recipient can return to dialysis, whereas loss of a heart or liver graft is usually fatal. It involves the patient, oncology and transplant teams; options include modifying immunosuppression (for example, switching to an mTOR inhibitor with low-dose steroid) before checkpoint therapy, close monitoring of graft function, and agreeing in advance what will happen if rejection occurs.
:::
:::

::: exercise GvHD versus GvL {level=3}
A 35-year-old woman with acute myeloid leukaemia receives an allogeneic HSCT from a matched unrelated donor. At 6 months she has mild skin GvHD and her leukaemia remains in remission. At 12 months, after immunosuppression has been stopped, a bone marrow test shows early relapse. Explain why some GvHD is associated with lower relapse rates, and how donor lymphocyte infusion might be used.
::: solution
GvHD and the graft-versus-leukaemia effect both arise when donor T cells (and NK cells) recognise recipient antigens: HLA mismatches where present, and in matched transplants mainly minor histocompatibility antigens, polymorphic peptides that differ between donor and recipient and are expressed both by normal tissues and by the leukaemia. Patients with mild-to-moderate GvHD have, on average, more active alloreactive donor T cells and lower relapse rates; T-cell depletion of the graft reduces GvHD but increases relapse. For her early relapse, the immunosuppression has already been stopped; **donor lymphocyte infusion**, collected from the same donor, adds alloreactive T cells to boost the GvL effect, often after chemotherapy or a hypomethylating agent to reduce the leukaemia burden. The main risk is inducing or worsening GvHD, so doses are escalated cautiously. Identifying antigens expressed only by haematopoietic cells, or using engineered T cells, are ways to separate the beneficial and harmful effects.
:::
:::
