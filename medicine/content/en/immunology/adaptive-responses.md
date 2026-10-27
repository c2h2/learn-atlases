The previous chapter described how B and T cells recognise antigen. Recognition alone does nothing. A naive lymphocyte that binds its antigen must be activated, must divide many times to build a clone large enough to matter, and must develop into an effector cell that does the right job for the threat. After the threat has gone, most of the clone dies, but a population of memory cells stays behind. The second encounter is then faster, larger and better.

This chapter follows that sequence: where the adaptive response happens, how T cells are activated and what the different T-cell subsets do, how B cells make antibody with T-cell help, what each antibody class does, and how memory works. These mechanisms underlie the interpretation of serology, the design of vaccines and the action of most immunosuppressive drugs.

## Where adaptive responses happen

Lymphocytes develop in the **primary lymphoid organs**: B cells in the bone marrow and T cells in the thymus. They meet antigen in the **secondary lymphoid organs**: lymph nodes, the spleen, and mucosa-associated lymphoid tissue such as tonsils and Peyer's patches in the gut.

The problem the system has to solve is one of numbers. Only about one naive T cell in $10^5$ to $10^6$ recognises any given peptide–MHC, and the infection may be in a toe. The solution is to bring the antigen and the lymphocytes to the same place. Dendritic cells carry antigen from tissues in the afferent lymph to the draining lymph node. Naive lymphocytes circulate continuously from blood into lymph nodes, crossing specialised **high endothelial venules** using L-selectin and the chemokine receptor CCR7, and leave again in the efferent lymph if they find nothing. The spleen does the same job for antigen in the blood.

Inside a lymph node, T cells gather in the **paracortex** and B cells in **follicles** in the cortex. The swelling of a lymph node draining an infection is the result of lymphocytes being retained and dividing there.

## Activating a naive T cell

::: theorem Three signals for T-cell activation {#thm-three-signals}
A naive T cell is fully activated only when it receives three signals from a dendritic cell:

1. **Signal 1, antigen**: the TCR binds its peptide–MHC, with CD4 or CD8 as co-receptor.
2. **Signal 2, costimulation**: **CD28** on the T cell binds **CD80 or CD86** (B7 molecules) on the dendritic cell.
3. **Signal 3, cytokines**: cytokines from the dendritic cell direct which kind of effector cell the T cell becomes.

Signal 1 without signal 2 does not activate the cell; instead it can make the T cell unresponsive (**anergy**). Dendritic cells express CD80 and CD86 strongly only after their pattern-recognition receptors detect microbial products or tissue damage.
:::

::: proof
The requirement for two signals is a safety mechanism. Self peptides are presented on MHC all the time, so signal 1 alone cannot be enough to trigger a response, or autoreactive T cells that escaped the thymus would be activated constantly. Costimulatory molecules appear on dendritic cells only when innate sensing has detected infection or damage. Coupling T-cell activation to innate danger signals means that a T cell responds to its peptide only when that peptide is encountered in a dangerous context. This is how the innate system "instructs" the adaptive system, and it is why vaccines need adjuvants.
:::

Inside the T cell, TCR signalling raises intracellular calcium, which activates the phosphatase **calcineurin**. Calcineurin removes a phosphate from the transcription factor **NFAT**, which enters the nucleus and, together with NF-κB and AP-1 activated by CD28, switches on the gene for **IL-2**. IL-2 and the high-affinity IL-2 receptor α chain (CD25) drive the T cell to divide. Several immunosuppressive drugs act on exactly these steps, as covered in [[immunology/transplant-tumour-immunology]]:

- **ciclosporin and tacrolimus** inhibit calcineurin (signal 1);
- **abatacept and belatacept** are CTLA-4–Ig fusion proteins that bind CD80/CD86 and block signal 2;
- **basiliximab** blocks CD25, the IL-2 receptor α chain;
- **sirolimus** (an mTOR inhibitor) blocks the proliferative signal downstream of IL-2.

Once activated, a T cell also expresses **CTLA-4**, which binds CD80/CD86 more strongly than CD28 does and switches the response off. Blocking CTLA-4 therapeutically releases this brake, which is the basis of checkpoint inhibitor therapy.

### Clonal expansion

An activated T cell divides about every 6 to 8 hours for several days. A clone can expand from a few hundred cells to millions within a week. That is why a primary response takes a week or more to become effective, and why the lymph node swells.

::: example How many divisions? {#ex-expansion}
A person has about 200 naive CD8 T cells specific for one viral peptide. At the peak of the response a week later, there are about $2 \times 10^6$ cells specific for that peptide. Assuming every cell divides and survives, how many rounds of division are needed, and how long would that take at one division every 8 hours?
::: solution
The clone grows by a factor of $2 \times 10^6 / 200 = 10^4$. Each division doubles the number, so the number of divisions $n$ satisfies $2^n = 10^4$:

$$
n = \log_2 10^4 = \frac{4}{\log_{10} 2} \approx 13.3.
$$

About 13 to 14 divisions are needed. At 8 hours per division, that is about $13.3 \times 8 \approx 106$ hours, or about 4.5 days, after the cells begin dividing. Add a day or two for the dendritic cell to arrive and for the T cells to find it, and the result fits the observed peak of a primary CD8 response at about a week. In reality some daughter cells die, so slightly more divisions are needed.
:::
:::

## Helper T-cell subsets

Naive CD4 T cells can develop into several kinds of helper cell, each specialised for a different kind of threat. The decision depends mainly on cytokines present during activation (signal 3), which in turn depend on what the dendritic cell has sensed. Each subset is defined by a **master transcription factor** and a set of **signature cytokines**.

::: definition Helper T-cell subsets {#def-help}
- **Th1** cells develop under the influence of **IL-12** (from dendritic cells and macrophages that have detected intracellular bacteria or viruses). Master regulator **T-bet**. They produce **interferon-gamma**, which activates macrophages to kill intracellular microbes such as mycobacteria and *Salmonella*.
- **Th2** cells develop under the influence of **IL-4**. Master regulator **GATA3**. They produce **IL-4, IL-5 and IL-13**, which drive IgE class switching, eosinophil production and activation, mucus secretion and gut smooth-muscle contraction: a response against helminths, and the response that underlies allergy.
- **Th17** cells develop under the influence of **IL-6 and TGF-β**, maintained by **IL-23**. Master regulator **RORγt**. They produce **IL-17 and IL-22**, which recruit neutrophils and stimulate epithelial antimicrobial peptides, defending against extracellular bacteria and fungi such as *Candida* at skin and mucosal surfaces.
- **T follicular helper (Tfh)** cells express the transcription factor **BCL6** and the chemokine receptor CXCR5, which takes them into B-cell follicles. They produce **IL-21** and provide CD40 ligand, giving the help B cells need to form germinal centres.
- **Regulatory T cells** (Tregs), defined by **FOXP3**, suppress responses; they are described in [[immunology/tolerance-regulation]].
:::

The subsets are not rigid compartments, and many T cells have mixed or changing phenotypes. But the framework predicts clinical patterns well, because each subset's absence leaves a characteristic gap.

| Subset | Threat | Defect | Typical consequence |
|---|---|---|---|
| Th1 (IL-12, IFN-γ) | Intracellular bacteria | Inherited defects of the IL-12/IFN-γ axis | Severe infection with weakly virulent mycobacteria (including BCG vaccine) and *Salmonella* |
| Th2 (IL-4, IL-5, IL-13) | Helminths | Excess rather than deficiency is the clinical problem | Allergy, eosinophilic asthma |
| Th17 (IL-17, IL-22) | Extracellular bacteria, fungi | STAT3 deficiency (autosomal dominant hyper-IgE syndrome); IL-17 pathway defects | Chronic mucocutaneous candidiasis, staphylococcal skin and lung abscesses |
| Tfh (IL-21, CD40L) | Antibody responses | CD40 ligand deficiency | Hyper-IgM syndrome |

Modern biologic drugs target these pathways. Antibodies against IL-5 or its receptor (mepolizumab, benralizumab) are used in severe eosinophilic asthma; dupilumab blocks the receptor shared by IL-4 and IL-13 in atopic dermatitis and asthma; antibodies against IL-17 (secukinumab) or IL-23 (guselkumab, risankizumab) treat psoriasis. The predictable side effect of IL-17 blockade is mucocutaneous candidiasis, exactly as the subset framework predicts.

## Cytotoxic T cells and macrophage activation

::: definition Cell-mediated cytotoxicity {#def-cytotoxic}
**Cytotoxic T lymphocytes** (CTLs) are effector CD8 T cells that kill cells displaying their specific peptide on MHC class I. They form a tight contact (an immunological synapse) with the target and release **perforin** and **granzymes** from granules into it; granzymes trigger apoptosis. CTLs can also kill through **Fas ligand** binding Fas on the target. A single CTL can kill several targets in succession. CTLs also secrete interferon-gamma and TNF.
:::

Killing by apoptosis rather than lysis matters: the target cell is dismantled from inside, viral nucleic acids are degraded, and the remains are cleared by phagocytes without spilling infectious virus.

CD4 help is needed for good CD8 responses. Helper T cells interact with the same dendritic cell through CD40 ligand and CD40, "licensing" the dendritic cell to provide stronger costimulation to CD8 T cells. Without this help, CD8 T cells respond poorly and form little memory. This is one reason why loss of CD4 T cells in HIV infection eventually compromises control of other viruses such as cytomegalovirus and EBV.

**Macrophage activation** by Th1 cells is the other arm of cell-mediated immunity. Macrophages can engulf mycobacteria but cannot kill them efficiently unless activated by interferon-gamma and TNF. Activated macrophages fuse lysosomes with phagosomes, produce reactive oxygen and nitrogen species, and form **granulomas**: compact collections of activated macrophages (epithelioid cells and multinucleated giant cells) surrounded by lymphocytes that wall off organisms they cannot eliminate. TNF is required to maintain granulomas.

::: example Before starting an anti-TNF drug {#ex-anti-tnf}
A 38-year-old woman born in India, who moved to the UK 10 years ago, is about to start infliximab for Crohn's disease. Her chest X-ray is normal and she is well. Her interferon-gamma release assay (IGRA) is positive. Explain the immunological reason for testing and what the result means.
::: solution
**The test.** An IGRA measures interferon-gamma release when her T cells are exposed to *Mycobacterium tuberculosis*-specific peptides. A positive result means she has memory Th1 cells specific for *M. tuberculosis*, so she has been infected at some time. With a normal chest X-ray and no symptoms, this is **latent TB infection**: viable bacilli contained within granulomas.

**Why it matters.** Granulomas are maintained by TNF, which keeps macrophages activated and the structure organised. Blocking TNF with infliximab can allow granulomas to break down, and latent TB can reactivate, often as disseminated or extrapulmonary disease within the first months of treatment.

**What follows.** After active TB has been excluded, current UK guidance (NICE and the British Society of Gastroenterology) is to treat latent TB before, or at the start of, anti-TNF therapy, usually with a recognised regimen supervised by a TB service, and to stay alert for symptoms of TB during treatment. The detailed regimen and timing follow local TB service protocols. A negative IGRA would not completely exclude infection in a person already on immunosuppression, because the test depends on a T-cell response.
:::
:::

## B-cell activation and antibody production

B cells can be activated in two ways.

**T-independent responses** occur to antigens with many identical repeated epitopes, especially bacterial **capsular polysaccharides**. Such antigens cross-link many BCRs at once, which activates the B cell without T-cell help. The response is made largely by **marginal-zone B cells** in the spleen, is mainly IgM, matures little in affinity and leaves little memory. Children under about 2 years respond poorly to polysaccharide antigens, which is why they are vulnerable to encapsulated bacteria and why plain polysaccharide vaccines do not work in infancy. Loss of the spleen removes the marginal zone, explaining part of the infection risk after splenectomy.

**T-dependent responses** are made to proteins and give class-switched, high-affinity antibody with memory. They require **linked recognition**:

1. A B cell binds a protein antigen through its BCR, internalises it, and presents peptides from it on MHC class II.
2. A CD4 T cell that was activated by a dendritic cell presenting the same antigen recognises that peptide–MHC on the B cell.
3. The T cell delivers help: **CD40 ligand** (CD154) binds CD40 on the B cell, and cytokines (IL-21, IL-4 and others) are released.

The B cell and T cell recognise different parts of the same antigen (the B cell a surface epitope, the T cell an internal peptide), but they must be physically linked in one molecule. Conjugate vaccines exploit this: linking a capsular polysaccharide to a carrier protein lets polysaccharide-specific B cells receive help from carrier-specific T cells.

### The germinal centre

Some activated B cells become short-lived **plasmablasts** outside the follicles, producing the early wave of mostly IgM antibody. Others enter the follicle with Tfh cells and form a **germinal centre**, where the antibody response is refined over weeks.

::: theorem Germinal-centre selection {#thm-germinal}
In the germinal centre, B cells divide rapidly and the enzyme **activation-induced cytidine deaminase** (AID) introduces point mutations into their rearranged variable-region genes (**somatic hypermutation**). The mutated B cells then compete to capture antigen held on **follicular dendritic cells** and to present it to Tfh cells. B cells whose mutations increase affinity capture more antigen, receive more help and survive; the rest die by apoptosis. Repeated cycles produce **affinity maturation**. AID also drives **class-switch recombination**, which replaces the heavy-chain constant region (Cμ) with Cγ, Cα or Cε while keeping the same variable region, under the direction of T-cell cytokines and CD40 signalling. Surviving B cells leave as long-lived plasma cells or memory B cells.
:::

Two inherited defects show that this is how it works. In **X-linked hyper-IgM syndrome**, CD40 ligand on T cells is absent. B cells cannot switch class, so IgM is normal or high but IgG, IgA and IgE are very low; the same CD40 signal is needed for macrophage and dendritic cell activation, so affected boys also get *Pneumocystis* pneumonia and *Cryptosporidium* infection. In **AID deficiency**, an autosomal recessive form, class switching and hypermutation both fail, lymph nodes are enlarged with giant germinal centres, but opportunistic infections do not occur because T-cell help to macrophages is normal.

## Antibody classes and what they do

Antibodies protect in five ways:

- **neutralisation**: binding to a toxin or a virus so that it cannot attach to its target cell;
- **opsonisation**: coating a microbe so that phagocytes with Fc receptors take it up;
- **complement activation** through the classical pathway;
- **antibody-dependent cellular cytotoxicity** by NK cells;
- **sensitisation of mast cells and eosinophils** (IgE).

::: definition Immunoglobulin isotypes {#def-isotypes}
| Isotype | Form | Main features |
|---|---|---|
| **IgM** | Pentamer in serum | First antibody made in a primary response; strong complement activator; high avidity; does not cross the placenta |
| **IgG** | Monomer | Most abundant in serum; four subclasses (IgG1 to IgG4); opsonises, activates complement (IgG1 and IgG3 most strongly) and mediates ADCC; actively transported across the placenta by the neonatal Fc receptor (FcRn); serum half-life about 3 weeks (shorter for IgG3) |
| **IgA** | Monomer in serum, dimer in secretions | Main antibody of mucosal surfaces; carried across epithelium by the polymeric Ig receptor, which leaves behind a secretory component; neutralises without causing inflammation; also in breast milk |
| **IgE** | Monomer | Very low serum level; binds the high-affinity receptor FcεRI on mast cells and basophils; defence against helminths and the cause of immediate allergy |
| **IgD** | Monomer | Mainly a receptor on naive B cells together with IgM |
:::

The long half-life of IgG has a specific cause. The **neonatal Fc receptor** (FcRn) in endothelial cells binds IgG that has been taken up by pinocytosis, rescues it from lysosomal degradation and returns it to the blood. The same receptor transports maternal IgG across the placenta, mostly in the third trimester, which is why preterm babies have low IgG and why maternal vaccination in pregnancy protects young infants. FcRn also explains why therapeutic monoclonal antibodies based on IgG can be given every few weeks, and why newer drugs that block FcRn lower IgG levels and are used in antibody-mediated diseases such as myasthenia gravis.

More IgA is produced each day than all other isotypes combined, almost all of it at mucosal surfaces. Selective IgA deficiency is the commonest primary antibody deficiency in people of European ancestry and is often asymptomatic, as discussed in [[immunology/immunodeficiency]].

## Primary and secondary responses

::: definition Primary response, secondary response and immunological memory {#def-memory}
A **primary response** follows the first exposure to an antigen. There is a **lag** of about 5 to 10 days before antibody is detectable, IgM appears first, then IgG, and the peak is modest and of moderate affinity.

A **secondary (anamnestic) response** follows re-exposure. It begins within a few days, reaches a much higher peak, consists mainly of class-switched IgG (or IgA or IgE), and has higher affinity.

**Immunological memory** is the property that makes the secondary response different. It is carried by:

- **long-lived plasma cells** in the bone marrow, which secrete antibody for years or decades without further stimulation;
- **memory B cells**, which respond rapidly to re-exposure;
- **memory T cells**: **central memory** cells (which express CCR7 and recirculate through lymph nodes), **effector memory** cells (which patrol tissues), and **tissue-resident memory** cells that remain in the skin, gut or lung where infection previously occurred.
:::

::: widget plot
f: if(x < 35, 1*(x/12)^4*exp(4*(1 - x/12)), 1*(x/12)^4*exp(4*(1 - x/12)) + s*((x - 35)/6)^4*exp(4*(1 - (x - 35)/6)))
x: 0, 70
y: 0, 12
sliders: s=8:1:12:0.5
vlines: 35
labels: \text{antibody level}
caption: A simplified picture of antibody concentration (arbitrary units) after a first exposure at day 0 and a second exposure at day 35 (dotted line). The primary response has a lag of about a week and a modest peak. The secondary response starts within days and is several times higher; the slider $s$ sets its peak relative to the primary peak. The curves are illustrative shapes, not data; in reality the secondary response is also of higher affinity and is mostly IgG.
:::

### Reading serology

The kinetics of the antibody response are what make serological diagnosis possible.

- **IgM** against a pathogen usually indicates recent primary infection. False-positive IgM tests are common, however, because of cross-reactivity and polyclonal B-cell activation (for example, in EBV infection), and IgM can persist for months.
- **IgG** shows past infection or vaccination. On its own it does not date the infection.
- A **rise in IgG titre** between an acute sample and a convalescent sample taken 2 to 4 weeks later (paired sera) indicates current infection. A **fourfold or greater rise** is the conventional threshold, because titres are measured in twofold dilutions and a single-step difference is within the error of the test.
- **IgG avidity** increases over months as affinity matures. Low-avidity IgG suggests infection within the past few months; high avidity suggests an older infection. Avidity testing is used particularly in pregnancy to date infections such as cytomegalovirus and toxoplasmosis.

::: example Dating an infection in pregnancy {#ex-avidity}
A 31-year-old woman has routine blood tests at 14 weeks of pregnancy because she works in a nursery. Her cytomegalovirus (CMV) IgG and IgM are both positive. Is this a recent primary infection, and what further test helps?
::: solution
**What the results do and do not show.** Positive IgG shows she has been infected with CMV at some time. Positive IgM could mean a primary infection in the last few months, but CMV IgM can also persist for many months after primary infection, appear during reactivation or reinfection, or be a false positive. On its own it does not date the infection.

**The next test.** **IgG avidity** on the same sample helps. If avidity is **high**, the IgG is the product of months of affinity maturation, so primary infection most likely occurred before about 3 months ago, that is, before conception. The risk of serious fetal damage is then much lower. If avidity is **low**, the infection is likely recent, and she would be referred to fetal medicine for counselling and possibly amniocentesis for CMV PCR and serial ultrasound. If a sample taken before pregnancy (for example, stored booking serum) was IgG-negative, seroconversion proves a recent primary infection.

The principle is that the maturation of the antibody response over time can be used as a clock. Exact avidity thresholds and the interpretation are assay-specific and follow the laboratory's guidance.
:::
:::

::: example Paired sera {#ex-paired}
A 50-year-old man has an atypical pneumonia. His *Mycoplasma pneumoniae* antibody titre is 1:32 on admission and 1:256 two weeks later. Assuming the test uses twofold dilutions, how large is the rise and how should it be interpreted?
::: solution
The fold-rise is $256/32 = 8$, which corresponds to three twofold dilution steps ($2^3 = 8$). This exceeds the conventional diagnostic threshold of a fourfold rise and indicates a current or recent infection. A single titre of 1:32 could have reflected past infection.

Paired serology is a **retrospective** diagnosis: by the time the convalescent sample is taken, the patient has usually been treated. For that reason, antigen or PCR tests are preferred when an answer is needed to guide treatment, and paired serology is used mostly for epidemiology or when other tests are unavailable.
:::
:::

:::warning
A negative antibody test does not always mean no infection. Antibody may be undetectable early in a primary infection (the "window period"), in people with antibody deficiency or on B-cell-depleting drugs such as rituximab, and after immunoglobulin replacement or blood products, which can also cause a *positive* result from passively transferred antibody. Before interpreting serology, ask when the sample was taken relative to exposure and whether the patient can make or has received antibody.
:::

::: quiz
A 6-year-old boy has had *Pneumocystis jirovecii* pneumonia and recurrent sinus infections. His IgM is raised, and his IgG and IgA are very low. B-cell numbers are normal. Which molecule is most likely to be defective?
- [ ] RAG1
- [ ] Bruton tyrosine kinase
- [x] CD40 ligand
- [ ] The IL-12 receptor
::: solution
High or normal IgM with absent IgG and IgA means B cells are present but cannot switch class. *Pneumocystis* infection means T-cell help to macrophages and dendritic cells is also impaired. CD40 ligand on activated T cells provides both signals, so X-linked CD40 ligand deficiency (hyper-IgM syndrome) explains the whole picture. Bruton tyrosine kinase deficiency would give absent B cells and low IgM; RAG1 deficiency gives absent T and B cells; IL-12 receptor deficiency gives mycobacterial and *Salmonella* infections with normal antibodies.
:::
:::

::: history
In 1956 Bruce Glick found that chickens whose bursa of Fabricius had been removed made poor antibody responses, and in 1961 Jacques Miller showed that mice thymectomised at birth failed to reject skin grafts and had few lymphocytes. Max Cooper and Robert Good combined these findings in 1965 into the concept of two lymphocyte lineages: bursa-derived (B) cells that make antibody and thymus-derived (T) cells that mediate cellular immunity. James Gowans showed in 1959 that lymphocytes recirculate continuously from blood to lymph, explaining how rare specific cells find their antigen.

In 1986 Tim Mosmann and Robert Coffman described two kinds of mouse helper T-cell clones with different cytokine profiles, which they named Th1 and Th2. The Th17 lineage was added in 2005, and T follicular helper cells were defined in the 2000s. In 1999 Federica Sallusto and Antonio Lanzavecchia distinguished central and effector memory T cells by their expression of the lymph-node homing receptor CCR7.
:::

## Where this leads

When the brakes on adaptive responses fail, the result is autoimmunity; how those brakes work is the subject of [[immunology/tolerance-regulation]]. Responses that are correctly regulated but directed at harmless antigens cause [[immunology/hypersensitivity]]. Defects in the steps of this chapter appear in [[immunology/immunodeficiency]], and vaccines, which deliberately induce memory, are covered in [[immunology/vaccines-immunotherapy]].

::: summary
- Naive lymphocytes recirculate through lymph nodes and spleen, where dendritic cells bring antigen from tissues.
- T-cell activation needs antigen (TCR with peptide–MHC), costimulation (CD28 with CD80/CD86) and cytokines. Signal 1 alone causes anergy. Calcineurin, NFAT, IL-2 and CD25 drive proliferation, and each is a drug target.
- CD4 T cells differentiate into Th1 (IFN-γ; intracellular bacteria), Th2 (IL-4, IL-5, IL-13; helminths and allergy), Th17 (IL-17, IL-22; extracellular bacteria and fungi), Tfh (help for B cells) and Treg subsets. Defects in each produce characteristic infections.
- CD8 cytotoxic T cells kill infected cells with perforin, granzymes and Fas ligand; Th1 cells activate macrophages and maintain granulomas through IFN-γ and TNF, so anti-TNF therapy can reactivate latent TB.
- T-independent responses to polysaccharides are weak and IgM-dominated, especially under 2 years; T-dependent responses need linked recognition and CD40 ligand.
- In germinal centres, AID drives somatic hypermutation and class switching, and selection on follicular dendritic cells produces affinity maturation.
- IgM comes first; IgG is the main serum antibody, crosses the placenta via FcRn and lasts about 3 weeks; IgA protects mucosa; IgE arms mast cells.
- Secondary responses are faster, larger, class-switched and of higher affinity. Serology uses IgM, a fourfold rise in paired sera and IgG avidity to date infections.
:::

## Exercises

::: exercise Fold-rise in titre {level=1 check="16"}
A patient's antibody titre against a virus is 1:20 in the acute phase and 1:320 three weeks later. By what factor has the titre risen?
::: solution
$320/20 = 16$, a sixteenfold rise (four twofold dilution steps). This is well above the fourfold threshold and supports current infection.
:::
:::

::: exercise Match the cytokine {level=1}
Name the helper T-cell subset most associated with each of the following, and its master transcription factor: (a) interferon-gamma; (b) IL-5; (c) IL-17; (d) IL-21 in B-cell follicles.
::: solution
(a) Th1, T-bet. (b) Th2, GATA3. (c) Th17, RORγt. (d) T follicular helper cells, BCL6.
:::
:::

::: exercise Passive IgG decay {level=1 check="0.125"}
A newborn has maternal IgG against measles at birth. Assuming a half-life of 21 days and no new production, what fraction of that IgG remains at 63 days? Give a decimal.
::: solution
63 days is $63/21 = 3$ half-lives, so the fraction remaining is $(1/2)^3 = 1/8 = 0.125$. This decline of maternal antibody over the first months of life is why infants become susceptible to measles, and also why measles vaccine given too early may be neutralised by residual maternal antibody.
:::
:::

::: exercise Why conjugate vaccines work {level=2}
Explain, in terms of linked recognition, why a vaccine of *Haemophilus influenzae* type b capsular polysaccharide conjugated to tetanus toxoid protein produces lasting, class-switched anti-polysaccharide antibody in infants, while plain polysaccharide does not.
::: solution
Plain polysaccharide is a T-independent antigen. It cross-links BCRs on polysaccharide-specific B cells but cannot be presented on MHC, so it gets no T-cell help. The response is mainly IgM from marginal-zone B cells, which are immature before about 2 years of age, and it produces little memory. In the conjugate, a polysaccharide-specific B cell binds the polysaccharide with its BCR and internalises the whole conjugate, including the attached protein. It presents tetanus toxoid peptides on MHC class II. Toxoid-specific Tfh cells recognise these peptides and provide CD40 ligand and cytokines. The B cell therefore enters a germinal centre, switches to IgG, matures in affinity and forms memory, even though the B cell and T cell recognise different molecules.
:::
:::

::: exercise Calcineurin inhibitor mechanism {level=2}
A kidney transplant recipient takes tacrolimus. Explain why this drug reduces T-cell activation but leaves her able to make an antibody response to a T-independent antigen, and why she is still at increased risk of viral infection.
::: solution
Tacrolimus binds the immunophilin FKBP-12, and the complex inhibits calcineurin. TCR signalling then cannot dephosphorylate NFAT, so IL-2 and other cytokine genes are not transcribed and T cells do not proliferate or differentiate. Responses that depend on T-cell help, including T-dependent antibody responses, are reduced. T-independent responses activate B cells through extensive BCR cross-linking; these are less dependent on calcineurin-driven T-cell help, so they are relatively preserved (B-cell receptor signalling also uses calcium, so they are not entirely unaffected). Control of viruses depends on CD8 T cells and on CD4 help to them, so she is at increased risk of viral infections such as CMV, BK polyomavirus and EBV-driven lymphoproliferation.
:::
:::

::: exercise Interpreting a single IgG result {level=2}
A 25-year-old healthcare student has a positive hepatitis B surface antibody (anti-HBs) and a negative hepatitis B core antibody (anti-HBc). What does this show, and how would the result differ after natural infection?
::: solution
Anti-HBs is produced against the surface antigen, which is the antigen in the hepatitis B vaccine. Anti-HBc is produced against the core protein, which is present only in the virus, not the vaccine. Positive anti-HBs with negative anti-HBc therefore indicates **immunity from vaccination**. A person who had cleared natural infection would have both anti-HBs and anti-HBc. A person with chronic infection would have HBsAg and anti-HBc but usually no anti-HBs. Choosing antigens present in the pathogen but not the vaccine allows serology to distinguish infection from immunisation.
:::
:::

::: exercise Timing a primary response {level=3 check="ceil(log2(5*10^5/50))"}
A vaccine primes 50 naive CD4 T cells specific for one peptide. At the peak there are $5 \times 10^5$ such cells. Assuming all cells divide synchronously and none die, what is the smallest whole number of divisions that reaches at least this number?
::: hint
Find $n$ with $50 \times 2^n \geq 5 \times 10^5$.
:::
::: solution
The required expansion is $5 \times 10^5 / 50 = 10^4$. We need $2^n \geq 10^4$, so $n \geq \log_2 10^4 \approx 13.29$. The smallest whole number is $n = 14$ ($2^{14} = 16\,384$, while $2^{13} = 8192$ is too few). At one division every 6 to 8 hours this takes about 3.5 to 4.7 days of continuous division, consistent with a peak about a week after vaccination.
:::
:::

::: exercise A boy with mycobacterial infection after BCG {level=3}
A 9-month-old boy who received BCG vaccine at birth develops persistent fever, hepatosplenomegaly and enlarged lymph nodes; biopsies show poorly formed granulomas with many acid-fast bacilli identified as the BCG strain. His neutrophil function, immunoglobulins and lymphocyte numbers are normal, and he has had no other unusual infections. Suggest the most likely immune defect, explain the mechanism, and name a treatment that might be useful in some forms.
::: solution
Disseminated infection with the weakly virulent BCG strain, poorly formed granulomas, and otherwise normal immunity suggest a defect in the **IL-12/interferon-gamma axis**, called Mendelian susceptibility to mycobacterial disease. Examples include defects in the IL-12 receptor β1 chain or the interferon-gamma receptor. Macrophages that have ingested mycobacteria produce IL-12, which drives T cells and NK cells to produce interferon-gamma; interferon-gamma in turn activates macrophages to kill intracellular mycobacteria and organise granulomas. Breaking this loop leaves macrophages unable to kill even attenuated mycobacteria, while defence against most other microbes remains intact. Infection with *Salmonella* is the other typical feature. In defects upstream of the interferon-gamma receptor (for example, IL-12 receptor β1 deficiency), giving recombinant interferon-gamma alongside antimycobacterial treatment can help; in complete interferon-gamma receptor deficiency it cannot, and stem cell transplantation may be needed. In the UK, BCG is offered only to infants at increased risk of TB, and is deferred where there is a family history of severe combined immunodeficiency or of this kind of susceptibility.
:::
:::
