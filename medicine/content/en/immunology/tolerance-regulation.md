V(D)J recombination makes lymphocyte receptors at random. Many of them, inevitably, will bind the body's own molecules. If all of those self-reactive cells were allowed to respond, everyone would have autoimmune disease. Most people do not, because the immune system has a set of mechanisms that remove, silence or restrain self-reactive lymphocytes. Together they produce **immunological tolerance**.

Tolerance is not one mechanism but several layers, each catching cells that escaped the one before. That layered design explains two clinical facts. Single-gene defects in one layer cause severe, early autoimmunity with a recognisable pattern. And common autoimmune diseases usually need several small failures at once. The same mechanisms also protect the fetus, allow the gut to tolerate food and commensal bacteria, and are the brakes that cancer immunotherapy deliberately releases.

This chapter covers central tolerance in the thymus and bone marrow, peripheral tolerance (anergy, deletion, regulatory T cells and inhibitory receptors), tolerance at special sites, and the diseases that reveal each mechanism.

::: definition Immunological tolerance {#def-tolerance}
**Immunological tolerance** is specific unresponsiveness to an antigen that would otherwise provoke a response. **Self-tolerance** is tolerance to the body's own antigens. Tolerance is **antigen-specific**: a tolerant person still responds normally to other antigens. It is distinct from **immunosuppression**, which is a general reduction in responsiveness.
:::

## Central tolerance

::: definition Central tolerance {#def-central}
**Central tolerance** is the removal or reprogramming of self-reactive lymphocytes while they are still developing in the primary lymphoid organs: T cells in the **thymus** and B cells in the **bone marrow**. Its mechanisms are **clonal deletion** (death by apoptosis), **receptor editing** (in B cells, a new light-chain rearrangement that changes specificity), and diversion of some self-reactive CD4 T cells into **regulatory T cells**.
:::

### T-cell selection in the thymus

Immature T cells (thymocytes) arrive from the bone marrow and rearrange their TCR genes in the thymus. Each thymocyte is then tested twice.

**Positive selection** takes place in the cortex. Cortical thymic epithelial cells present self peptides on self MHC. A thymocyte whose TCR binds self MHC weakly receives a survival signal. One whose TCR cannot bind self MHC at all is useless, because it could never recognise antigen presented by the body's own cells, and it dies by neglect. This is how T cells become MHC-restricted. At the same stage the cell commits to CD4 (if its receptor binds class II) or CD8 (if it binds class I).

**Negative selection** takes place mainly in the medulla. Medullary thymic epithelial cells and dendritic cells present self peptides. A thymocyte whose TCR binds self peptide–MHC strongly is dangerous, and it is deleted by apoptosis. Some CD4 thymocytes with intermediate-to-high self-reactivity are instead diverted to become **regulatory T cells**.

::: theorem The affinity model of thymic selection {#thm-selection}
The fate of a thymocyte depends on the strength of its TCR's interaction with self peptide–MHC:

- **no or very weak binding**: death by neglect (about 90% of thymocytes);
- **weak to moderate binding**: positive selection and survival as a conventional T cell;
- **strong binding**: negative selection by apoptosis, or diversion into the regulatory T-cell lineage.

The mature repertoire is therefore enriched for receptors that bind self MHC weakly, which is exactly what is needed to bind self MHC plus a foreign peptide strongly.
:::

::: widget plot
f: 1/(1 + exp(-4*(x - a)))*(1 - 1/(1 + exp(-4*(x - b))))
x: 0, 10
y: 0, 1.05
sliders: a=3:1:5:0.1; b=7:5:9:0.1
labels: \text{probability of surviving selection}
vlines: 3; 7
caption: A simplified model of the thymic "affinity window". The horizontal axis is the strength of a thymocyte's interaction with self peptide–MHC (arbitrary units). Below $a$, cells die by neglect; above $b$, they are deleted or diverted to the regulatory lineage. Only cells in the window survive as conventional T cells. Narrowing the window by lowering $b$ represents stricter negative selection. Illustrative curve only.
:::

How can the thymus delete T cells specific for proteins that are made only in the pancreas, thyroid or skin? Medullary thymic epithelial cells express thousands of these **tissue-restricted antigens**, under the control of a transcriptional regulator called **AIRE** (autoimmune regulator). In effect, the thymic medulla contains a shadow of every organ in the body.

**Autoimmune polyendocrine syndrome type 1** (APS-1, also called APECED) shows what happens when AIRE fails. It is usually autosomal recessive. T cells specific for many tissue antigens escape deletion, and patients develop autoimmunity against several endocrine glands. The classic triad is:

- **chronic mucocutaneous candidiasis**, often the first feature, in early childhood;
- **hypoparathyroidism**;
- **primary adrenal insufficiency** (Addison disease).

The candidiasis has a striking explanation: most patients make neutralising autoantibodies against the Th17 cytokines IL-17F and IL-22, so they have an acquired defect in antifungal defence at mucosal surfaces.

::: example A teenager with thrush and tetany {#ex-aps1}
A 13-year-old girl has had recurrent oral thrush and dystrophic nails since the age of 4. She now presents with tingling of the fingers and carpopedal spasm. Her serum calcium is low, phosphate high and parathyroid hormone inappropriately low. What unifying diagnosis should be considered, which further problems should be anticipated, and how would the diagnosis be confirmed?
::: solution
**Diagnosis.** Chronic mucocutaneous candidiasis together with hypoparathyroidism (low calcium, high phosphate, low PTH) are two of the three classic features of **APS-1**, caused by loss-of-function variants in *AIRE*.

**Mechanism.** Without AIRE, the thymic medulla fails to express parathyroid, adrenal and other tissue-restricted antigens, so T cells reactive against them are not deleted and attack the glands. The candidiasis reflects autoantibodies that neutralise IL-17F and IL-22.

**What to anticipate.** Primary adrenal insufficiency is the third component and can be fatal if missed, so she needs regular monitoring and education about symptoms; an Addisonian crisis may be precipitated by intercurrent illness. Other features include primary ovarian insufficiency, type 1 diabetes, autoimmune hepatitis, pernicious anaemia, vitiligo, alopecia, enamel hypoplasia and malabsorption.

**Confirmation.** Genetic testing for *AIRE* variants and detection of autoantibodies against type I interferons (present in almost all patients and highly characteristic). Siblings should be offered testing.
:::
:::

### B-cell tolerance in the bone marrow

Immature B cells whose receptors bind self antigen strongly in the bone marrow are given a second chance: they continue to rearrange light-chain genes to replace the self-reactive receptor (**receptor editing**). If this fails, they die. B cells that bind self antigen weakly may leave the marrow but become **anergic**. B-cell tolerance is less complete than T-cell tolerance, but this matters less because most B-cell responses to protein need help from T cells, which are themselves tolerant.

## Peripheral tolerance

Central tolerance is incomplete. Some self antigens are not expressed in the thymus at all, some are expressed at too low a level, and the affinity threshold for deletion is not perfect. Every healthy person has self-reactive T cells in the circulation. **Peripheral tolerance** controls them.

::: definition Peripheral tolerance {#def-peripheral}
**Peripheral tolerance** is the control of mature self-reactive lymphocytes after they have left the primary lymphoid organs. Its mechanisms are:

1. **anergy**: functional inactivation after antigen recognition without costimulation;
2. **deletion**: apoptosis of repeatedly stimulated cells, mainly through **Fas** and **Fas ligand**;
3. **suppression** by **regulatory T cells**;
4. **inhibitory receptors**, especially **CTLA-4** and **PD-1**, which switch off activated T cells;
5. **ignorance**: the antigen is never presented to T cells in an activating context, for example because it is sequestered behind a barrier.
:::

### Anergy

As described in [[immunology/adaptive-responses]], a T cell that recognises its peptide–MHC without CD28 costimulation does not become activated. Instead it becomes unresponsive to later stimulation, even with costimulation. Self antigens are normally presented by resting dendritic cells that express little CD80 and CD86, so self-reactive T cells that meet their antigen in the periphery are usually rendered anergic. This is one reason why infection can trigger autoimmunity: microbial products activate dendritic cells that are also presenting self peptides, providing the missing costimulation.

### Deletion by Fas

T cells that are repeatedly stimulated express both Fas (CD95) and Fas ligand. Fas engagement triggers apoptosis through caspase-8. This **activation-induced cell death** removes T cells that respond persistently to self antigens and contracts the response after an infection.

**Autoimmune lymphoproliferative syndrome** (ALPS) is caused, in most cases, by heterozygous variants in *FAS*. Lymphocytes accumulate because they cannot die. Children develop:

- chronic, non-malignant **lymphadenopathy and splenomegaly**;
- **autoimmune cytopenias**, especially haemolytic anaemia and thrombocytopenia;
- a characteristic increase in **"double-negative" T cells**, which express the αβ TCR but neither CD4 nor CD8 (in health these are around 1% of T cells);
- an increased lifetime risk of lymphoma.

### Regulatory T cells

::: definition Regulatory T cells {#def-treg}
**Regulatory T cells** (Tregs) are CD4 T cells that express the transcription factor **FOXP3** and high levels of CD25 (the IL-2 receptor α chain), and that suppress the activation and function of other immune cells. **Thymic Tregs** develop in the thymus from self-reactive precursors. **Peripheral Tregs** develop from conventional CD4 T cells in the periphery, especially in the gut in response to food and commensal antigens, under the influence of TGF-β and retinoic acid.
:::

Tregs suppress by several mechanisms:

- **CTLA-4**, which they express constitutively. CTLA-4 binds CD80 and CD86 on dendritic cells and physically removes them from the cell surface, depriving other T cells of costimulation.
- **IL-2 consumption**: their high-affinity IL-2 receptors absorb IL-2, starving neighbouring effector cells.
- secretion of the inhibitory cytokines **IL-10**, **TGF-β** and IL-35.

**IPEX syndrome** (immune dysregulation, polyendocrinopathy, enteropathy, X-linked) is caused by loss-of-function variants in *FOXP3*. Affected boys lack functional Tregs and develop, usually in the first months of life, severe autoimmune enteropathy with watery diarrhoea, type 1 diabetes, eczema-like dermatitis and autoimmune cytopenias. It is fatal without treatment; haematopoietic stem cell transplantation is curative. Scurfy mice, with a natural *Foxp3* mutation, have the same disease, which is how the gene was identified.

Defects in Treg mechanisms produce related diseases. Heterozygous loss of one copy of *CTLA4* (CTLA-4 haploinsufficiency) and deficiency of LRBA, a protein that protects CTLA-4 from degradation, both cause autoimmunity with lymphocytic organ infiltration and antibody deficiency. A logical treatment is to replace CTLA-4 function with **abatacept**, a CTLA-4–Ig fusion protein, and it often works.

::: example A boy with diarrhoea and diabetes in infancy {#ex-ipex}
A 3-month-old boy has profuse watery diarrhoea that has not responded to dietary changes, failure to thrive, an eczematous rash and newly diagnosed diabetes with high glucose and positive anti-GAD antibodies. His mother's brother died in infancy of "intractable diarrhoea". What is the most likely diagnosis, what investigation supports it, and why does the disease affect these particular organs?
::: solution
**Diagnosis.** Neonatal or infantile autoimmune diabetes, autoimmune enteropathy and dermatitis in a boy, with an affected maternal uncle (suggesting X-linked inheritance), point to **IPEX syndrome**, caused by variants in *FOXP3*.

**Investigations.** Flow cytometry may show reduced or absent FOXP3-positive CD4 CD25-high cells (although some variants produce normal numbers of non-functional cells). Genetic testing of *FOXP3* confirms the diagnosis. Autoantibodies against the gut (anti-enterocyte or anti-harmonin) and against islet antigens are supportive. Serum IgE is often raised.

**Why these organs.** Tregs are most needed where the immune system is constantly exposed to antigens it must tolerate. The gut faces food and commensal bacteria continuously, and peripheral Tregs normally dominate the response there. The skin is another barrier rich in environmental antigen. Without Tregs, effector T cells attack the gut epithelium, the islets of Langerhans and the skin. The diabetes is truly autoimmune, unlike most monogenic neonatal diabetes caused by β-cell channel or insulin-gene defects.

**Management principles.** Supportive care (nutrition, insulin), immunosuppression to control inflammation, and haematopoietic stem cell transplantation as definitive treatment, under a specialist immunology team.
:::
:::

### Inhibitory receptors: CTLA-4 and PD-1

Activated T cells switch themselves off. Two receptors are particularly important.

**CTLA-4** is induced within days of T-cell activation and competes with CD28 for CD80 and CD86, which it binds with much higher affinity. It acts early, mainly in lymph nodes, raising the threshold for activation. Mice lacking CTLA-4 die within weeks of massive lymphoproliferation.

**PD-1** is expressed on T cells that have been stimulated repeatedly. Its ligand **PD-L1** can be induced on almost any cell by interferon-gamma, including tumour cells and inflamed tissue. PD-1 signalling recruits phosphatases that dampen TCR and CD28 signals. It acts mainly in tissues, late in a response, and limits damage during chronic stimulation. T cells under persistent PD-1 signalling, for example in chronic viral infection or in tumours, become **exhausted**: they persist but have reduced cytokine production and killing.

Blocking these receptors with antibodies, **ipilimumab** (anti-CTLA-4) and **pembrolizumab** or **nivolumab** (anti-PD-1), restores T-cell responses against tumours. It also releases peripheral tolerance to self, so these drugs cause **immune-related adverse events**: colitis, hepatitis, pneumonitis, dermatitis, thyroiditis, hypophysitis, adrenalitis, type 1 diabetes, myocarditis and arthritis. Their management is outlined in [[immunology/transplant-tumour-immunology]].

::: example Thyroid function on pembrolizumab {#ex-irae}
A 62-year-old man is receiving pembrolizumab for metastatic non-small-cell lung cancer. Six weeks after starting, he feels anxious with palpitations; free T4 is high and TSH suppressed. Eight weeks later he is tired and cold, with low free T4 and high TSH. Explain the course of events immunologically.
::: solution
The sequence of thyrotoxicosis followed by hypothyroidism is typical of a **destructive thyroiditis** caused by checkpoint inhibition. Blocking PD-1 removes a brake on T cells, including thyroid-reactive T cells that were previously held in check by peripheral tolerance (many such patients have pre-existing anti-thyroid peroxidase antibodies). The T-cell attack destroys follicles and releases stored thyroid hormone, causing transient **thyrotoxicosis** with low uptake on scintigraphy (unlike Graves disease, which is driven by stimulating antibodies to the TSH receptor). Once the stored hormone is exhausted and the gland is damaged, **hypothyroidism** follows and is often permanent.

**Management principles.** The thyrotoxic phase is usually managed symptomatically, for example with a β-blocker; antithyroid drugs are not useful because hormone synthesis is not increased. Levothyroxine is given for the hypothyroid phase. Pembrolizumab can usually be continued, because the condition is easily treated with hormone replacement. This differs from more dangerous immune-related events such as myocarditis, which require stopping the drug and high-dose corticosteroids. Decisions are made with oncology and endocrinology, following current guidance.
:::
:::

## Tolerance at special sites

Some tissues are **immune-privileged**: foreign grafts placed there survive longer than elsewhere. Examples are the anterior chamber of the eye, the testis, and to some degree the brain. Privilege is not just a matter of isolation; these tissues actively express Fas ligand and PD-L1, produce TGF-β, and have limited lymphatic drainage.

Privilege can break down. In **sympathetic ophthalmia**, a penetrating injury to one eye releases sequestered eye antigens; T cells are activated in the regional lymph nodes and later attack the **uninjured** eye as well. Similarly, vasectomy or testicular injury can lead to anti-sperm antibodies.

The **fetus** is a semi-allogeneic graft carrying paternal HLA, yet it is not rejected. Several mechanisms contribute. The placental trophoblast does not express the classical class I molecules HLA-A and HLA-B, which limits recognition by maternal T cells; instead it expresses HLA-C and the non-classical **HLA-G**, which inhibit NK cells. Maternal Tregs specific for paternal antigens expand during pregnancy. Uterine NK cells, rather than killing, help remodel the spiral arteries.

### Oral tolerance and the timing of food introduction

Food is foreign protein, eaten in large amounts every day, and it is normally tolerated. Food antigens absorbed in the gut are presented in a tolerogenic environment that favours peripheral Tregs. In contrast, early exposure of inflamed skin to food proteins, as in infant eczema, may promote sensitisation and allergy.

This understanding changed practice. The **LEAP** trial (Learning Early About Peanut Allergy, published in 2015) randomised 640 infants aged 4 to 11 months with severe eczema, egg allergy or both to either eat peanut regularly or avoid it until age 5. In the intention-to-treat analysis, peanut allergy at age 5 occurred in **17.2%** of the avoidance group and **3.2%** of the consumption group. Infants with a large skin-prick wheal to peanut, suggesting existing allergy, were excluded. Guidance in the UK and elsewhere now advises introducing allergenic foods, including peanut and egg, in an age-appropriate form from around 6 months alongside other foods, rather than delaying them; infants at high risk may need specialist advice first.

::: example How many infants to prevent one allergy? {#ex-leap}
Using the LEAP intention-to-treat figures, calculate the absolute risk reduction, the relative risk reduction and the number needed to treat for early peanut introduction in this high-risk population.
::: solution
**Absolute risk reduction** (ARR) $= 0.172 - 0.032 = 0.140$, that is, 14 percentage points.

**Relative risk** $= 0.032 / 0.172 \approx 0.186$, so the **relative risk reduction** is $1 - 0.186 \approx 0.81$, about 81%.

**Number needed to treat** $= 1/\text{ARR} = 1/0.140 \approx 7.1$. About 7 high-risk infants need to be fed peanut early to prevent one case of peanut allergy at age 5.

These figures apply to the high-risk infants studied (severe eczema and/or egg allergy, without a large peanut wheal). In infants at lower baseline risk, the same relative reduction would give a smaller absolute reduction and a larger number needed to treat.
:::
:::

:::warning
It is tempting to think of tolerance as simply "the absence of a response". It is an active state. Regulatory T cells, inhibitory receptors and the tolerogenic presentation of food antigens all require ongoing immune activity. That is why tolerance can be lost when these mechanisms are disturbed, for example by checkpoint inhibitors, by infection providing costimulation, or by loss of Tregs, and why it can sometimes be induced on purpose, as in allergen immunotherapy or early food introduction.
:::

## How tolerance fails

The single-gene diseases in this chapter show that each layer matters. Common autoimmune diseases, covered in [[immunology/autoimmunity]], are different: they arise from many small genetic effects, each slightly weakening a tolerance mechanism, combined with environmental triggers. Many of the genes involved are the same ones that cause the rare monogenic diseases. For example, common variants that slightly reduce *CTLA4* function or alter *PTPN22*, a phosphatase that sets the TCR signalling threshold, increase the risk of type 1 diabetes, rheumatoid arthritis and autoimmune thyroid disease.

| Mechanism | Monogenic disease | Main features |
|---|---|---|
| Thymic expression of tissue antigens | APS-1 (*AIRE*) | Candidiasis, hypoparathyroidism, Addison disease |
| Regulatory T cells | IPEX (*FOXP3*) | Infant enteropathy, type 1 diabetes, dermatitis |
| Inhibitory receptor | CTLA-4 haploinsufficiency; LRBA deficiency | Lymphocytic infiltration, cytopenias, antibody deficiency |
| Fas-mediated deletion | ALPS (*FAS*) | Lymphadenopathy, splenomegaly, autoimmune cytopenias |
| Clearance of apoptotic cells | C1q deficiency | Systemic lupus erythematosus |

::: quiz
A child has chronic lymphadenopathy and splenomegaly, autoimmune haemolytic anaemia and thrombocytopenia, and an increased proportion of TCRαβ-positive T cells that express neither CD4 nor CD8. Which mechanism of tolerance has most likely failed?
- [ ] Positive selection in the thymic cortex
- [ ] Expression of tissue-restricted antigens by AIRE
- [x] Fas-mediated deletion of activated lymphocytes
- [ ] FOXP3-dependent regulatory T-cell development
::: solution
Lymphoproliferation, autoimmune cytopenias and raised double-negative T cells are the features of autoimmune lymphoproliferative syndrome, usually caused by *FAS* variants. Lymphocytes that should die by activation-induced apoptosis accumulate, and self-reactive cells escape deletion. AIRE defects cause endocrine autoimmunity and candidiasis, and FOXP3 defects cause IPEX with enteropathy and diabetes.
:::
:::

::: history
In 1945 Ray Owen noticed that non-identical twin cattle, which share a placental circulation, carry each other's red cells throughout life without making antibodies to them. Frank Macfarlane Burnet and Frank Fenner argued in 1949 that the immune system learns what is "self" during development. In 1953 Rupert Billingham, Leslie Brent and Peter Medawar proved it: mice injected at birth with cells from another strain later accepted skin grafts from that strain. Burnet and Medawar shared the 1960 Nobel Prize for the discovery of acquired immunological tolerance.

The idea of suppressor T cells was popular in the 1970s, then fell out of favour when the proposed mechanisms could not be confirmed. In 1995 Shimon Sakaguchi showed that CD4 CD25 T cells prevent autoimmunity in mice, and in 2001 and 2003 several groups linked the scurfy mouse, human IPEX syndrome and the transcription factor FOXP3 to these cells. Sakaguchi, with Mary Brunkow and Fred Ramsdell, received the 2025 Nobel Prize in Physiology or Medicine for discoveries concerning peripheral immune tolerance.
:::

## Where this leads

The common autoimmune diseases, and how autoantibodies are used in diagnosis, are covered in [[immunology/autoimmunity]]. Transplantation and cancer immunotherapy, which respectively try to induce tolerance and to break it, are in [[immunology/transplant-tumour-immunology]].

::: summary
- Tolerance is antigen-specific unresponsiveness. It is built in layers: central tolerance during development and peripheral tolerance afterwards.
- In the thymus, thymocytes that cannot bind self MHC die by neglect, those that bind weakly are positively selected, and those that bind strongly are deleted or become regulatory T cells. AIRE allows the thymus to express tissue-restricted antigens; its loss causes APS-1.
- B cells that bind self antigen in the bone marrow edit their receptors, die or become anergic.
- Peripheral tolerance operates through anergy (antigen without costimulation), Fas-mediated deletion (lost in ALPS), FOXP3 regulatory T cells (lost in IPEX), inhibitory receptors CTLA-4 and PD-1, and ignorance of sequestered antigens.
- Tregs suppress by CTLA-4-mediated removal of CD80/CD86, IL-2 consumption and IL-10 and TGF-β secretion.
- Checkpoint inhibitors block CTLA-4 or PD-1 to boost anti-tumour immunity and predictably cause immune-related adverse events such as thyroiditis and colitis.
- Immune privilege, maternal–fetal tolerance and oral tolerance are active processes. Early introduction of peanut to high-risk infants in the LEAP trial reduced peanut allergy at age 5 from 17.2% to 3.2%.
- Common autoimmune diseases involve many small genetic effects on the same pathways that single-gene tolerance disorders reveal.
:::

## Exercises

::: exercise Absolute risk reduction {level=1 check="0.14"}
In LEAP, peanut allergy at age 5 occurred in 17.2% of the avoidance group and 3.2% of the consumption group. What is the absolute risk reduction, expressed as a decimal?
::: solution
$0.172 - 0.032 = 0.14$. The number needed to treat is $1/0.14 \approx 7.1$.
:::
:::

::: exercise Positive or negative selection? {level=1}
For each thymocyte, state its most likely fate: (a) its TCR does not bind any self MHC molecule; (b) its TCR binds self MHC with weak affinity; (c) its TCR binds a self insulin peptide presented by a medullary epithelial cell with high affinity; (d) a CD4 thymocyte with intermediate-to-high affinity for a self peptide.
::: solution
(a) Death by neglect in the cortex. (b) Positive selection and maturation into a conventional T cell. (c) Negative selection: apoptosis in the medulla (the insulin peptide is expressed there because of AIRE). (d) Possible diversion into the thymic regulatory T-cell lineage (FOXP3-positive), although deletion is also possible.
:::
:::

::: exercise Name the defect {level=1}
Name the gene most likely affected in each case: (a) a boy with infant-onset enteropathy, diabetes and dermatitis; (b) a child with chronic candidiasis, hypoparathyroidism and Addison disease; (c) a child with lymphadenopathy, splenomegaly and autoimmune cytopenias.
::: solution
(a) *FOXP3* (IPEX). (b) *AIRE* (APS-1). (c) *FAS* (ALPS).
:::
:::

::: exercise Infection and autoimmunity {level=2}
Explain how a viral infection might trigger autoimmunity in a person who has self-reactive T cells that were previously anergic or ignorant, describing two distinct mechanisms.
::: solution
**Bystander activation.** Virus-induced pattern-recognition signalling activates dendritic cells, which then express CD80, CD86 and inflammatory cytokines. If those dendritic cells are also presenting self peptides, for example from tissue damaged by the virus, self-reactive T cells now receive signal 1 with costimulation and can be activated instead of becoming anergic. Tissue damage also releases previously sequestered self antigens (as in sympathetic ophthalmia).

**Molecular mimicry.** A viral or bacterial peptide may resemble a self peptide closely enough that T cells or antibodies activated against the microbe cross-react with self. Rheumatic fever after group A streptococcal infection, with antibodies to streptococcal M protein cross-reacting with cardiac myosin, is the classic example.

In both cases tolerance was not absent beforehand; it was maintained by the lack of an activating context, which the infection provides.
:::
:::

::: exercise Why abatacept for CTLA-4 haploinsufficiency? {level=2}
A 22-year-old man has recurrent chest infections, low IgG, autoimmune thrombocytopenia and lymphocytic infiltration of the lungs and gut. Genetic testing shows a heterozygous loss-of-function variant in *CTLA4*. Explain why one working copy is not enough, and why abatacept is a rational treatment.
::: solution
CTLA-4 acts by binding CD80 and CD86 and physically removing them from antigen-presenting cells. The amount of CTLA-4 on the cell surface matters, so with only one functional copy, Tregs and activated T cells have too little CTLA-4 to remove costimulatory ligands effectively. This is **haploinsufficiency**. T cells are then over-activated, infiltrate organs and drive autoimmunity, while the disordered response also impairs normal antibody production. **Abatacept** is a soluble CTLA-4–Ig fusion protein that binds CD80 and CD86 and blocks their interaction with CD28, replacing the missing CTLA-4 function. Haematopoietic stem cell transplantation is considered in severe cases.
:::
:::

::: exercise Number needed to treat at lower risk {level=2 check="1/(0.05*(1 - 0.032/0.172))"}
Suppose early peanut introduction gives the same relative risk as in LEAP ($0.032/0.172$) in a population of infants whose risk of peanut allergy without intervention is 5%. Calculate the number needed to treat (give the unrounded value).
::: hint
The absolute risk reduction is the baseline risk times the relative risk reduction.
:::
::: solution
Relative risk reduction $= 1 - 0.032/0.172 \approx 0.814$. Absolute risk reduction $= 0.05 \times 0.814 \approx 0.0407$. Number needed to treat $= 1/0.0407 \approx 24.6$, so about 25 infants. The relative effect is the same as in the high-risk population, but because the baseline risk is lower, more infants must be treated to prevent one case. This is a general principle when applying trial results to populations with different baseline risks.
:::
:::

::: exercise A pregnancy as a graft {level=3}
Explain why the fetus, which expresses paternal HLA molecules, is not rejected by the maternal immune system, and describe one clinical situation in which maternal immunity to fetal antigens does cause harm.
::: solution
Several mechanisms protect the fetus. (1) The villous trophoblast in direct contact with maternal blood lacks classical class I and class II molecules, and extravillous trophoblast expresses HLA-C, HLA-E and the non-classical HLA-G but not HLA-A or HLA-B, limiting recognition by maternal T cells while inhibiting NK cells through receptors for HLA-G and HLA-E. (2) Maternal regulatory T cells specific for paternal antigens expand during pregnancy. (3) The decidua is a tolerogenic environment, and uterine NK cells mainly support vascular remodelling rather than killing. (4) Complement regulators on trophoblast protect it from complement attack.

Harm occurs when maternal **antibody** crosses the placenta. In **haemolytic disease of the fetus and newborn**, an RhD-negative mother sensitised by fetal RhD-positive red cells in a previous pregnancy makes anti-D IgG, which crosses the placenta via FcRn and destroys fetal red cells. Prevention is by anti-D immunoglobulin given to RhD-negative women at defined times, which prevents sensitisation. In **neonatal alloimmune thrombocytopenia**, maternal antibodies to paternal platelet antigens (commonly HPA-1a) destroy fetal platelets and can cause intracranial bleeding.
:::
:::

::: exercise Reasoning about a checkpoint toxicity {level=3}
A 55-year-old woman with melanoma develops severe diarrhoea with blood 8 weeks after starting combined ipilimumab and nivolumab. Colonoscopy shows colitis. (a) Explain why combination therapy causes more immune-related adverse events than either drug alone. (b) Outline the principles of management. (c) Why is it important to exclude infection first?
::: solution
(a) CTLA-4 and PD-1 act at different stages and places. CTLA-4 mainly limits the priming of naive T cells in lymph nodes and is used by Tregs, so blocking it lowers the threshold for activating new self-reactive clones and impairs Treg suppression. PD-1 mainly restrains already activated T cells in tissues. Blocking both removes two separate brakes, so more self-reactive T cells are primed and those that reach tissues are less restrained. The gut, with its constant antigen exposure and dependence on Treg control, is particularly affected.

(b) Grade the severity. For severe colitis, the checkpoint inhibitors are withheld, intravenous fluids and supportive care are given, and high-dose corticosteroids are started. If there is no response within a few days, additional immunosuppression with infliximab or vedolizumab is used. Decisions about restarting treatment are made by the oncology team, following current guidance such as that of ESMO.

(c) Infective colitis, particularly *Clostridioides difficile* and cytomegalovirus, can mimic immune-related colitis, and giving high-dose steroids or infliximab to someone with an uncontrolled infection could be dangerous. Stool cultures and *C. difficile* testing are therefore sent before or at the start of treatment.
:::
:::
