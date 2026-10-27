The innate immune system recognises classes of microbe. The adaptive immune system recognises individual molecules, and it does so with receptors that were not encoded in the genome as such but assembled by cutting and joining gene segments in each developing lymphocyte. A person has on the order of $10^{12}$ lymphocytes, and between them they carry many millions of different receptors, most of which will never meet the antigen they fit.

B cells and T cells see antigen in fundamentally different ways. A B cell's receptor, an antibody on its surface, binds the native, folded shape of a molecule. A T cell's receptor binds only a short peptide fragment held in the groove of a **major histocompatibility complex** (MHC) molecule on another cell's surface. Understanding that difference explains why T cells need antigen-presenting cells, why transplant matching is about HLA, why some drug reactions are predicted by a genetic test, and why certain bacterial toxins cause shock.

This chapter covers antigens, antibody and T-cell receptor structure, how receptor diversity is generated, the MHC molecules and the two antigen-processing pathways, and the clinical consequences of HLA variation.

## Antigens and epitopes

::: definition Antigen, epitope and hapten {#def-antigen}
An **antigen** is any molecule that can be bound specifically by an antibody or a T-cell receptor. An **immunogen** is an antigen that can also provoke an immune response on its own. The small part of an antigen that the receptor actually contacts is the **epitope** (or antigenic determinant).

- **B-cell epitopes** are on the surface of the native molecule. Many are **conformational**: they are made of amino acids that are far apart in the sequence but brought together by folding.
- **T-cell epitopes** are **linear** peptides produced by breaking the protein down inside a cell.

A **hapten** is a small molecule that can be bound by antibody but is not immunogenic by itself. It becomes immunogenic when it binds covalently to a carrier protein. Penicillin is the classic clinical example: it binds to serum and cell-surface proteins, and the drug–protein complex can provoke IgE or IgG responses.
:::

Proteins are the most powerful immunogens because they can be presented to T cells, which in turn help B cells. Pure polysaccharides cannot be presented on MHC, so they provoke weaker, T-independent antibody responses. This difference is the reason conjugate vaccines exist, as explained in [[immunology/vaccines-immunotherapy]].

## Antibodies and the B-cell receptor

::: definition Immunoglobulin structure {#def-antibody}
An **antibody** (immunoglobulin, Ig) is a Y-shaped glycoprotein made of two identical **heavy chains** and two identical **light chains** (either κ or λ), linked by disulphide bonds. Each chain has an amino-terminal **variable (V) domain** and one or more **constant (C) domains**.

- The two arms are the **Fab** fragments (fragment, antigen-binding). The V domains of one heavy and one light chain together form the antigen-binding site. Within each V domain, three hypervariable loops, the **complementarity-determining regions** (CDRs 1 to 3), make contact with antigen; CDR3 is the most variable.
- The stem is the **Fc** fragment (fragment, crystallisable). It does not bind antigen; instead it determines what the antibody does by binding Fc receptors on cells and complement component C1q.
- The heavy-chain constant region defines the **isotype** (class): IgM, IgD, IgG, IgA or IgE.

A **B-cell receptor** (BCR) is a membrane-bound immunoglobulin associated with the signalling molecules Igα and Igβ (CD79a and CD79b). A plasma cell secretes the same antibody in soluble form.
:::

The design separates recognition from action. The variable end decides what is bound; the constant end decides what happens next. That is why the same antigen specificity can appear first as IgM and later as IgG or IgA, with different effects, without changing what is recognised. Isotypes and their functions are described in [[immunology/adaptive-responses]].

### Affinity and avidity

The strength of binding between one antigen-binding site and one epitope is its **affinity**. It is usually expressed as the **dissociation constant** $K_d$, the concentration of free antigen at which half the binding sites are occupied. A lower $K_d$ means tighter binding. For a simple reversible interaction, the fraction of binding sites occupied at free antigen concentration $[A]$ is

$$
\theta = \frac{[A]}{[A] + K_d}.
$$ {#eq-occupancy}

**Avidity** is the overall strength of binding of a whole antibody, with several binding sites, to an antigen with repeated epitopes. Because all the sites must let go at once for the antibody to detach, avidity can be much greater than affinity. IgM, a pentamer with ten binding sites, has low affinity in a primary response but high avidity for antigens with repeated epitopes, such as bacterial polysaccharide.

::: widget plot
f: x/(x + k); x/(x + 10*k)
x: 0, 100
y: 0, 1
sliders: k=5:0.5:50:0.5
labels: K_d = k; K_d = 10k
hlines: 0.5
caption: Fraction of antigen-binding sites occupied, $\theta = [A]/([A]+K_d)$, as free antigen concentration rises (arbitrary units, for example nmol/L). Occupancy is one half when $[A] = K_d$ (dotted line). The second curve has ten times lower affinity. Affinity maturation during an immune response moves antibodies from curves like the second towards curves like the first. Simplified model of a single binding site at equilibrium.
:::

::: example How much antigen fills the receptors? {#ex-occupancy}
An antibody has $K_d = 2$ nmol/L for its antigen. (a) What fraction of binding sites is occupied at a free antigen concentration of 2 nmol/L? (b) At 18 nmol/L? (c) After affinity maturation, $K_d$ falls to 0.2 nmol/L. What is the occupancy at 2 nmol/L now?
::: solution
Use $\theta = [A]/([A] + K_d)$.

(a) $\theta = 2/(2 + 2) = 0.5$. At a concentration equal to $K_d$, half the sites are occupied, by definition.

(b) $\theta = 18/(18 + 2) = 0.9$. A ninefold excess over $K_d$ fills 90% of the sites.

(c) $\theta = 2/(2 + 0.2) = 0.909$, about 91%. A tenfold improvement in affinity gives the same occupancy at a tenfold lower antigen concentration. This is why late, affinity-matured antibody neutralises toxins and viruses at concentrations that early antibody could not.
:::
:::

## The T-cell receptor

::: definition T-cell receptor {#def-tcr}
The **T-cell receptor** (TCR) is a membrane heterodimer of an **α chain and a β chain** (in most T cells), each with one variable and one constant domain, structurally related to an antibody Fab arm. It is never secreted and binds only to a **peptide bound to an MHC molecule** (peptide–MHC). The TCR is associated with the **CD3** complex and ζ chains, which carry the activation signal into the cell.

The **co-receptors** CD4 and CD8 bind a non-polymorphic part of the MHC molecule. **CD4** binds MHC class II, so CD4 T cells recognise peptide on class II; **CD8** binds MHC class I, so CD8 T cells recognise peptide on class I.
:::

A minority of T cells use a γδ TCR instead. γδ T cells are enriched in epithelia, recognise stress-induced and non-peptide antigens without classical MHC, and behave partly like innate cells. Other T-cell populations recognise non-peptide antigens on non-classical molecules: lipids on **CD1**, and vitamin B metabolites from bacteria on **MR1** (recognised by mucosal-associated invariant T, or MAIT, cells).

The key fact about TCR recognition is **MHC restriction**: a given T cell recognises its peptide only when it is presented by a particular MHC molecule, normally one of the person's own. Rolf Zinkernagel and Peter Doherty showed this in 1974, when they found that mouse cytotoxic T cells killed virus-infected cells only if those cells shared MHC with the mouse.

| Feature | B-cell receptor / antibody | T-cell receptor |
|---|---|---|
| Chains | Two heavy, two light | α and β (or γ and δ) |
| Binding sites per molecule | Two (or more in IgM, IgA) | One |
| What is recognised | Native molecule: protein, polysaccharide, lipid, nucleic acid, small chemical | Short peptide bound to MHC |
| Epitope | Often conformational | Linear |
| Secreted form | Yes (antibody) | No |
| Affinity matures during response | Yes, by somatic hypermutation | No |

## Generating diversity

There are not enough genes in the genome to encode millions of receptors directly. Instead, each lymphocyte builds its receptor genes by **V(D)J recombination**.

::: theorem Somatic recombination generates the repertoire {#thm-vdj}
The variable domain of each receptor chain is encoded by separate gene segments: **variable (V)**, **diversity (D)** (heavy chain and TCR β only) and **joining (J)**. In each developing lymphocyte, one segment of each type is chosen and joined together, and the joined V(D)J unit encodes that cell's variable domain. Diversity comes from four sources:

1. **combinatorial diversity**: the choice of V, D and J segments;
2. **junctional diversity**: imprecise joining, with nucleotides removed by exonucleases and non-template nucleotides added by **terminal deoxynucleotidyl transferase** (TdT); this creates CDR3;
3. **chain pairing**: any heavy chain can pair with any light chain (or any α with any β);
4. in B cells only, later **somatic hypermutation** of the rearranged genes during an immune response.
:::

::: proof
The recombination is carried out by the **RAG1 and RAG2** enzymes, which recognise recombination signal sequences beside each segment and cut the DNA. The cut ends are processed and rejoined by the general DNA repair machinery for double-strand breaks (non-homologous end joining), which includes the nuclease **Artemis**. Because the joins are imprecise, two-thirds of attempts produce a frame-shift and a non-functional chain; a developing cell that fails to make a functional receptor dies. A cell that succeeds on one chromosome stops rearranging on the other (**allelic exclusion**), so each lymphocyte expresses a single specificity. That is the physical basis of clonal selection: each cell is a clone-founder with one receptor.
:::

The arithmetic shows why combinatorial choice alone is not enough. Textbook figures for the human heavy-chain locus are about 40 functional V segments, 23 D segments and 6 J segments; combinatorial choice gives $40 \times 23 \times 6 = 5520$ heavy chains. Junctional diversity then multiplies this by many orders of magnitude, which is why the potential repertoire is far larger than the number of lymphocytes in the body.

Two clinical consequences follow. First, **RAG1, RAG2 or Artemis deficiency** prevents any T or B cell from making a receptor, causing severe combined immunodeficiency with absent T and B cells but normal NK cells (which do not rearrange receptors); see [[immunology/immunodeficiency]]. Second, because each lymphocyte's rearrangement is unique, a population of cells sharing one rearrangement is a clone. Detecting a **clonal** immunoglobulin or TCR rearrangement in a lymphoid infiltrate is evidence of lymphoma rather than reactive inflammation, and monitoring the rearrangement measures residual leukaemia after treatment.

Random receptor generation has a cost: many receptors will recognise self. How those cells are removed or controlled is the subject of [[immunology/tolerance-regulation]].

## MHC molecules

T cells only see peptide that another cell displays. The display molecules are encoded in the **major histocompatibility complex**, a gene cluster on chromosome 6 that in humans is called the **HLA** (human leucocyte antigen) region, because its products were first found on white cells by antibodies from transfused patients and multiparous women.

::: definition MHC class I and class II {#def-mhc}
**MHC class I** molecules (HLA-A, HLA-B and HLA-C) consist of a polymorphic heavy chain paired with **β2-microglobulin**. They are expressed on **almost all nucleated cells** (not on red cells). Their groove is closed at both ends and holds peptides of about 8 to 10 amino acids, usually derived from proteins made **inside** the cell. They present to **CD8** T cells.

**MHC class II** molecules (HLA-DR, HLA-DQ and HLA-DP) consist of an α chain and a β chain. They are expressed constitutively only on **professional antigen-presenting cells**: dendritic cells, macrophages and B cells (and on thymic epithelium); interferon-gamma can induce them on other cells. Their groove is open at the ends and holds longer peptides, about 13 to 25 amino acids, usually derived from proteins taken up from **outside** the cell. They present to **CD4** T cells.
:::

The division of labour makes biological sense. Any cell can be infected by a virus, so every nucleated cell needs to be able to show a cytotoxic T cell what it is making. Helper T cells need to interact with a few specialised cells that have sampled the environment, so class II is restricted to those cells.

### HLA polymorphism and inheritance

HLA genes are the most polymorphic in the human genome, with thousands of known alleles at the main loci. Each allele binds a different set of peptides, determined by pockets in the groove that accommodate particular **anchor residues**. Population-level diversity makes it unlikely that a single pathogen can escape presentation in everyone.

HLA alleles are **codominant**: both parental alleles at each locus are expressed, so a person typically has six different class I molecules (two each of A, B and C) and several class II molecules. The genes are close together and are usually inherited as a block, called a **haplotype**, one from each parent. Two siblings therefore share both haplotypes with probability $\tfrac14$, one haplotype with probability $\tfrac12$, and neither with probability $\tfrac14$. This is the basis of sibling donor searching in transplantation, covered in [[immunology/transplant-tumour-immunology]].

Modern HLA typing is by DNA sequencing, and alleles are written in a standard nomenclature: for example, **HLA-B\*57:01** is locus B, allele group 57, specific protein 01.

## Antigen processing and presentation

::: theorem Two pathways, two kinds of T cell {#thm-pathways}
Where a protein is located inside a cell determines which MHC class presents it.

- **Cytosolic pathway (class I).** Proteins in the cytosol, including viral and tumour proteins, are degraded by the **proteasome**. Peptides are pumped into the endoplasmic reticulum by the transporter **TAP**, loaded onto newly made class I molecules and carried to the surface for CD8 T cells.
- **Endocytic pathway (class II).** Proteins taken up by endocytosis or phagocytosis are degraded in acidified endosomes. Class II molecules are made in the endoplasmic reticulum with the **invariant chain** blocking their groove, travel to the endosomes, and there the chain is cut down to a fragment called **CLIP**. The molecule **HLA-DM** removes CLIP and allows a high-affinity peptide to bind. The class II–peptide complex goes to the surface for CD4 T cells.
:::

::: proof
The two pathways are separated physically. Class I molecules acquire peptide in the endoplasmic reticulum, where only cytosolic peptides arrive through TAP. Class II molecules are kept empty in the endoplasmic reticulum by the invariant chain, so they cannot pick up those cytosolic peptides, and they only become receptive in the endosome, where internalised proteins are being degraded. A virus that is replicating in a cell is therefore reported to CD8 cytotoxic T cells, which can kill that cell, and material taken up from outside is reported to CD4 helper T cells, which coordinate the response.
:::

There is an important exception. To start a CD8 response against a virus that does not infect dendritic cells, or against a tumour, a dendritic cell must put **exogenous** antigen onto class I. Certain dendritic cells do this, a process called **cross-presentation**. It is how vaccines made of protein can, in some circumstances, prime cytotoxic T cells, and it is central to tumour immunity.

Dendritic cells are the only cells that can efficiently activate a **naive** T cell. When their pattern-recognition receptors detect microbial products, they migrate to the draining lymph node, increase MHC expression, and express the **costimulatory** molecules CD80 and CD86. The need for costimulation is the subject of the next chapter.

Defects in these pathways are rare but instructive. In **MHC class II deficiency** (one form of "bare lymphocyte syndrome", caused by defects in transcription factors such as CIITA), CD4 T cells fail to develop and children present in infancy with severe combined immunodeficiency. In **TAP deficiency**, class I expression is very low; children have few CD8 T cells and develop chronic bacterial sinus and lung infections and necrotising skin granulomas, with surprisingly mild viral disease.

:::warning
It is a common mistake to say that "antibodies recognise peptides" or that "T cells recognise proteins". Antibodies recognise the three-dimensional surface of native antigens, which may be protein, carbohydrate, lipid or nucleic acid; that is why denatured protein on a Western blot may not be recognised by an antibody raised against the folded molecule. T cells recognise a short linear peptide only when it is bound to an MHC molecule; they cannot see free antigen at all.
:::

## Superantigens

Some bacterial toxins bypass normal recognition. A **superantigen** binds to the outside of the MHC class II molecule and to the side of the TCR β-chain variable region, outside the peptide groove. It therefore activates every T cell that uses certain β-chain variable families, whatever their specificity. A conventional antigen activates perhaps one T cell in $10^4$ to $10^5$; a superantigen can activate up to a fifth of all T cells.

The result is a massive release of cytokines, including TNF, IL-2 and interferon-gamma, causing fever, rash, capillary leak, shock and multi-organ failure. **Toxic shock syndrome** is caused by staphylococcal superantigens such as toxic shock syndrome toxin-1 (TSST-1), and by streptococcal pyrogenic exotoxins in streptococcal toxic shock. Management is covered in [[infectious-diseases/fever-sepsis]]; the immunological point is that clindamycin is often added because it suppresses toxin production, and intravenous immunoglobulin, which contains neutralising antibodies, is sometimes used in severe cases.

::: example A tampon and a rash {#ex-superantigen}
A 19-year-old woman presents on the fourth day of her period with fever of 39.8 °C, vomiting, watery diarrhoea and a diffuse red rash like sunburn. Her blood pressure is 78/40 mmHg and her creatinine is raised. A tampon has been in place for over 24 hours. Explain the immunological mechanism of her illness and why it is so severe compared with an ordinary local infection.
::: solution
The picture fits **staphylococcal toxic shock syndrome**: fever, diffuse erythroderma, hypotension and multi-organ involvement in association with a retained tampon. *Staphylococcus aureus* growing on the tampon produces **TSST-1**, a superantigen.

TSST-1 is absorbed and cross-links MHC class II on antigen-presenting cells to TCRs that use particular β-chain variable families, without regard to the peptide in the groove. A large fraction of all T cells is activated at once, rather than the tiny antigen-specific fraction activated in an ordinary infection. The result is a cytokine storm: IL-2, TNF and interferon-gamma cause fever, vasodilatation and capillary leak, hence shock and organ dysfunction. The local infection may be trivial; the disease is caused by the immune response.

Management principles: remove the tampon (source control), resuscitate, and give antibiotics that include an agent active against *S. aureus* plus one that suppresses toxin synthesis, following local guidance. The characteristic desquamation of the palms and soles follows one to two weeks later.
:::
:::

## HLA and disease

Because HLA alleles determine which peptides are presented, they influence susceptibility to infection, autoimmunity and drug reactions. Associations are expressed as a relative risk or odds ratio, and most are far from deterministic.

| HLA allele | Associated condition | Comment |
|---|---|---|
| HLA-B27 | Ankylosing spondylitis and other spondyloarthritides | Present in most patients of European ancestry with ankylosing spondylitis, but only a small minority of B27-positive people develop it |
| HLA-DQ2 and HLA-DQ8 | Coeliac disease | Almost all patients carry one of them, so their absence makes coeliac disease very unlikely |
| HLA-DR3 and HLA-DR4 (with DQ2/DQ8) | Type 1 diabetes | Highest risk in DR3/DR4 heterozygotes |
| HLA-DRB1 "shared epitope" alleles | Seropositive rheumatoid arthritis | Associated with more erosive disease |
| HLA-B\*57:01 | Abacavir hypersensitivity | Screen before prescribing |
| HLA-B\*15:02 | Carbamazepine-induced Stevens–Johnson syndrome / toxic epidermal necrolysis | Common in people of Han Chinese, Thai and other South-East Asian ancestry |
| HLA-B\*58:01 | Allopurinol-induced severe cutaneous reactions | Commoner in some Asian populations |

In coeliac disease the mechanism is understood in detail: HLA-DQ2 and DQ8 bind deamidated gluten peptides especially well and present them to CD4 T cells in the gut. In drug hypersensitivity, abacavir binds inside the groove of HLA-B\*57:01 and changes which self peptides it presents, so T cells react to the altered self as if it were foreign.

The high sensitivity and modest specificity of these associations make them more useful for **ruling out** than for ruling in. HLA-DQ2/DQ8 typing is a negative test: if both are absent, coeliac disease is very unlikely. HLA-B27 is the opposite case: it is common in the healthy population, so a positive result in a person with non-specific back pain adds little.

::: example Screening before abacavir {#ex-abacavir}
A 34-year-old man with newly diagnosed HIV is to start antiretroviral therapy, and abacavir is being considered. In the PREDICT-1 randomised trial (Mallal and colleagues, 2008), prospective HLA-B\*57:01 screening reduced clinically diagnosed abacavir hypersensitivity from 7.8% to 3.4%, and immunologically confirmed (patch-test-positive) hypersensitivity from 2.7% to 0%. The positive predictive value of HLA-B\*57:01 for immunologically confirmed hypersensitivity was about 48% and the negative predictive value was 100%. Interpret these figures.
::: solution
**Negative predictive value of 100%.** No HLA-B\*57:01-negative patient had immunologically confirmed hypersensitivity. A negative screen therefore effectively rules out true abacavir hypersensitivity. That is why HIV guidelines recommend HLA-B\*57:01 testing before abacavir is started, and why abacavir is not given to people who carry the allele.

**Positive predictive value of about 48%.** About half of allele carriers given abacavir developed confirmed hypersensitivity, so carrying the allele is necessary but not sufficient. Other factors, including the T-cell repertoire, influence whether the reaction occurs. For a test whose purpose is to avoid a dangerous reaction, a moderate positive predictive value is acceptable, because the cost of withholding one drug when alternatives exist is small.

**The residual 3.4%.** Clinically diagnosed reactions still occurred in screened patients. Many of these were other conditions mistaken for hypersensitivity, because the clinical picture (fever, rash, gastrointestinal symptoms) is non-specific. The clinical warning to stop abacavir and never rechallenge after a suspected reaction therefore still applies.
:::
:::

::: example Carbamazepine and ancestry {#ex-carbamazepine}
A 28-year-old woman of Han Chinese ancestry with newly diagnosed focal epilepsy is being considered for carbamazepine. Her doctor plans to test for HLA-B\*15:02 first. Explain the immunological basis of the test and what would be done if it were positive.
::: solution
Carbamazepine can cause **Stevens–Johnson syndrome and toxic epidermal necrolysis**, severe T-cell-mediated reactions in which cytotoxic CD8 T cells and NK cells kill keratinocytes, causing widespread skin detachment. In people of Han Chinese and several other South-East Asian ancestries, the reaction is strongly associated with **HLA-B\*15:02**: the drug interacts directly with this class I molecule and the resulting complex is recognised by CD8 T cells as foreign.

Because the allele is relatively common in these populations and the reaction is life-threatening, drug regulators and guidelines advise testing people from these groups before carbamazepine is started. If she carries HLA-B\*15:02, carbamazepine is avoided (and caution is usually also advised for structurally related drugs such as oxcarbazepine and phenytoin), and an alternative antiseizure medicine is chosen. A negative result does not remove the risk entirely, so she is still told to stop the drug and seek help at once if a rash, mouth ulcers or fever develop in the first weeks. In people of European ancestry the relevant allele is different (HLA-A\*31:01) and testing is less established.
:::
:::

::: quiz
A virus infects hepatocytes but not dendritic cells. Which statement best explains how CD8 T cells specific for the virus are first activated?
- [ ] Hepatocytes migrate to lymph nodes and present viral peptide on MHC class I to naive CD8 T cells.
- [ ] Antibodies bind the virus and present it to CD8 T cells.
- [x] Dendritic cells take up infected cells or viral material and cross-present viral peptides on MHC class I to naive CD8 T cells in the lymph node.
- [ ] CD8 T cells recognise the native viral proteins on the hepatocyte surface.
::: solution
Naive T cells are activated only by dendritic cells, which provide peptide–MHC and costimulation in the lymph node. A dendritic cell that is not itself infected must route exogenous viral protein into the class I pathway: cross-presentation. Once activated, effector CD8 T cells leave the node and kill infected hepatocytes, which display viral peptide on their own MHC class I. T cells never recognise native protein, and antibodies do not present antigen.
:::
:::

::: history
In 1890 Emil von Behring and Kitasato Shibasaburō showed that serum from animals immunised against diphtheria or tetanus toxin protected other animals, and Paul Ehrlich proposed that cells carry "side-chains" that bind toxins and are shed into the blood as antitoxin. The puzzle of how the body could make antibodies against almost anything, including synthetic chemicals that had never existed in nature, led to instructive theories in which antigen moulded the antibody. In 1957 Frank Macfarlane Burnet proposed the opposite: each lymphocyte carries one pre-existing receptor, and antigen selects and expands the clone that fits. Burnet's **clonal selection** theory still frames the subject.

The structure of antibodies was worked out by Gerald Edelman and Rodney Porter in the 1960s (Nobel Prize 1972). In 1976 Susumu Tonegawa showed that antibody genes are rearranged in B cells, solving the diversity problem (Nobel Prize 1987). Jean Dausset, Baruj Benacerraf and George Snell were recognised in 1980 for discovering the MHC and its role in immune responses, and Zinkernagel and Doherty's 1974 discovery of MHC restriction was recognised in 1996. In 1987 Pamela Bjorkman, Don Wiley and colleagues published the crystal structure of HLA-A2, showing a peptide lying in a groove: the picture that made sense of everything before it.
:::

## Where this leads

Recognition is only the first step. Whether a T cell that recognises its peptide–MHC is activated, ignored or switched off depends on costimulation and cytokines, described in [[immunology/adaptive-responses]] and [[immunology/tolerance-regulation]]. HLA matching and the T-cell response to foreign MHC are central to [[immunology/transplant-tumour-immunology]].

::: summary
- B cells recognise native, often conformational epitopes on any kind of molecule; T cells recognise short linear peptides bound to MHC molecules.
- Antibodies are two heavy and two light chains; the variable domains (with CDR loops) bind antigen and the Fc region determines function. Affinity is the strength of one site, measured as $K_d$; avidity is the combined strength of several sites.
- The TCR is an αβ heterodimer with CD3; CD4 binds MHC class II and CD8 binds MHC class I. T cells are MHC-restricted.
- Receptor diversity comes from V(D)J recombination by RAG1/RAG2, junctional diversity (TdT), chain pairing and, in B cells, somatic hypermutation. RAG or Artemis deficiency causes T−B−NK+ severe combined immunodeficiency.
- MHC class I (HLA-A, B, C) is on all nucleated cells and presents cytosolic peptides via the proteasome and TAP to CD8 T cells. MHC class II (HLA-DR, DQ, DP) is on antigen-presenting cells and presents endocytosed peptides, after removal of the invariant chain and CLIP, to CD4 T cells. Dendritic cells can cross-present exogenous antigen on class I.
- HLA genes are highly polymorphic, codominant and inherited as haplotypes; siblings are HLA-identical with probability 1/4.
- Superantigens activate a large fraction of T cells by binding MHC class II and TCR Vβ outside the groove, causing toxic shock.
- HLA associations (B27, DQ2/DQ8, B\*57:01, B\*15:02) are useful mainly for ruling out disease or for preventing drug reactions.
:::

## Exercises

::: exercise Occupancy at three times Kd {level=1 check="0.75"}
An antibody binds its antigen with $K_d = 4$ nmol/L. What fraction of its binding sites is occupied at a free antigen concentration of 12 nmol/L? Give the answer as a decimal.
::: solution
$\theta = 12/(12 + 4) = 12/16 = 0.75$. At three times $K_d$, three quarters of the sites are occupied.
:::
:::

::: exercise Class I or class II? {level=1}
For each situation, state which MHC class presents the antigen and which type of T cell responds: (a) an influenza protein made in an infected bronchial epithelial cell; (b) tetanus toxoid taken up by a B cell whose receptor binds it; (c) a mutated protein made inside a melanoma cell; (d) a bacterial protein inside a macrophage phagosome.
::: solution
(a) Class I, CD8 T cells: the protein is made in the cytosol of an ordinary nucleated cell. (b) Class II, CD4 T cells: the B cell internalises toxoid via its BCR and presents its peptides on class II, which is how it obtains help. (c) Class I, CD8 T cells. (d) Class II, CD4 T cells: phagosomal proteins enter the endocytic pathway.
:::
:::

::: exercise Combinatorial diversity {level=1 check="40*23*6*(40*5 + 30*4)"}
Using textbook estimates of about 40 functional V, 23 D and 6 J heavy-chain segments, about 40 V and 5 J κ segments, and about 30 V and 4 J λ segments, calculate the number of different antibody variable regions that could be produced by combinatorial joining and random pairing alone, ignoring junctional diversity.
::: hint
Calculate the number of heavy chains and the number of light chains (κ plus λ) separately, then multiply.
:::
::: solution
Heavy chains: $40 \times 23 \times 6 = 5520$. κ light chains: $40 \times 5 = 200$; λ light chains: $30 \times 4 = 120$; total light chains $320$. Pairing: $5520 \times 320 = 1\,766\,400$, about $1.8 \times 10^6$. Junctional diversity and somatic hypermutation increase the actual repertoire by many orders of magnitude beyond this.
:::
:::

::: exercise Interpreting a negative HLA test {level=2}
A 40-year-old woman with iron-deficiency anaemia and bloating has been following a gluten-free diet for a year, so serology for coeliac disease is now uninformative. Her HLA typing shows neither HLA-DQ2 nor HLA-DQ8. What can be concluded, and why would a positive result have been much less useful?
::: solution
Almost everyone with coeliac disease carries HLA-DQ2 or DQ8, because these molecules are needed to present deamidated gluten peptides to gut CD4 T cells. Their absence therefore makes coeliac disease very unlikely, and another cause for her symptoms and iron deficiency should be sought. A positive result would have been much less useful because DQ2 or DQ8 is carried by a large minority of the general population, most of whom never develop coeliac disease; it would not have distinguished her from the healthy population. If DQ2/DQ8 had been present, a gluten challenge followed by serology and duodenal biopsy would be needed.
:::
:::

::: exercise Why no class II on red cells matters {level=2}
Red cells express neither MHC class I nor class II. Explain one advantage and one disadvantage of this for the host, with reference to a specific infection.
::: solution
**Disadvantage.** A pathogen that lives inside red cells, such as *Plasmodium falciparum* in the blood stage of malaria, cannot be reported to CD8 T cells, because there is no class I to present its peptides. Defence against blood-stage malaria therefore depends on antibody (against parasite proteins exported to the red cell surface and against merozoites) and on phagocytosis in the spleen.

**Advantage.** Red cells are transfused between people much more readily than other tissues, because they carry no HLA molecules to provoke an alloreactive T-cell response; transfusion compatibility depends mainly on ABO and other red cell antigens recognised by antibody (see [[blood/transfusion]]). Also, red cells cannot be targets for cytotoxic T cells in viral infection.
:::
:::

::: exercise A child with no CD4 T cells {level=2}
A 7-month-old girl has persistent diarrhoea, failure to thrive, oral candidiasis and *Pneumocystis jirovecii* pneumonia. Her total lymphocyte count is normal but CD4 T cells are very low; CD8 T cells and B cells are present. Her immunoglobulins are low. Flow cytometry shows that her B cells and monocytes do not express HLA-DR. Explain the mechanism.
::: solution
Absent HLA-DR on B cells and monocytes indicates **MHC class II deficiency**, usually caused by a defect in one of the transcription factors that switch on all class II genes (such as CIITA or the RFX complex). CD4 T cells are selected in the thymus by recognising self peptide on class II; without class II, few CD4 T cells develop, while CD8 T cells, selected on class I, are present. Without CD4 help, B cells cannot make class-switched antibody, so immunoglobulins are low despite B cells being present. The result is a combined immunodeficiency with opportunistic infections. Curative treatment is haematopoietic stem cell transplantation.
:::
:::

::: exercise The value of HLA-B27 {level=3}
In a population, assume 8% of people carry HLA-B27 and that ankylosing spondylitis affects 0.2% of the population, of whom 90% are B27-positive. (a) What proportion of B27-positive people have ankylosing spondylitis? (b) What does this imply about ordering HLA-B27 for a person with chronic back pain?
::: hint
Work with 100 000 people. How many have ankylosing spondylitis and are B27-positive? How many are B27-positive in total?
:::
::: solution
(a) In 100 000 people, 200 have ankylosing spondylitis and $0.9 \times 200 = 180$ of them are B27-positive. In total, $8000$ people are B27-positive. So $180/8000 = 0.0225$, about 2.3% of B27-positive people have the disease (with these illustrative figures).

(b) A positive HLA-B27 on its own raises the probability only modestly in a person with non-specific back pain, because most B27-positive people never develop spondyloarthritis. It is useful only as one part of a structured assessment: inflammatory features of the back pain, MRI of the sacroiliac joints, CRP and other features such as uveitis. A negative result reduces the probability but, with 10% of patients B27-negative in this example, does not exclude the diagnosis.
:::
:::

::: exercise Toxic shock versus septic shock {level=3}
Compare the mechanism of shock in staphylococcal toxic shock syndrome with that in Gram-negative septic shock. Why might intravenous immunoglobulin be considered in severe streptococcal toxic shock but not in Gram-negative sepsis?
::: solution
In Gram-negative septic shock, the trigger is a pathogen-associated molecular pattern, mainly lipopolysaccharide, which activates TLR4 on innate cells and drives TNF, IL-1 and IL-6 release; the response is proportional to the bacterial load and is mediated mainly by innate cells. In toxic shock syndrome, the trigger is a superantigen, which activates a large fraction of T cells by cross-linking MHC class II and TCR Vβ regardless of peptide. The cytokine storm (IL-2, interferon-gamma, TNF) can be massive even with a small local infection.

Intravenous immunoglobulin, pooled from thousands of donors, contains antibodies that neutralise many streptococcal superantigens, so it may reduce ongoing T-cell activation by toxin already circulating. Lipopolysaccharide acts through an innate receptor and is not a single toxin that a pooled antibody preparation would reliably neutralise in a clinically useful way, so IVIG has no established role in Gram-negative sepsis. Its use in streptococcal toxic shock remains a specialist decision guided by local and national guidance.
:::
:::
