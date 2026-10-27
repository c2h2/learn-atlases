An *E. coli* cell has about 4300 protein-coding genes, but at any moment it makes only some of their products, and in very different amounts. Enzymes for using lactose are almost absent when there is no lactose and appear within minutes when it is added. Enzymes for making tryptophan are made only when the cell cannot get tryptophan from outside. Heat, starvation, crowding and attack by phages each switch on their own sets of genes. Bacteria live in environments that change quickly, and their success depends on turning genes on and off as quickly. Since most genes in a bacterium are regulated at transcription, and the chain from DNA to protein is short and fast, bacterial gene regulation shows the logic of control in its clearest form.

This chapter is built round the **lac operon**, the system in which François Jacob and Jacques Monod discovered how genes are regulated, and whose analysis is a model of genetic reasoning. It then looks at activation by CAP, repression and attenuation in the *trp* operon, the λ switch, and regulation by RNA: riboswitches and small RNAs. The machinery of transcription itself is in [[molecular-biology/transcription]], and the dynamics of regulatory circuits, such as switches, oscillators and feedback, in [[systems-biology/gene-expression-dynamics]].

## Principles

::: definition Operons and modes of control {#def-operon}
An **operon** is a group of adjacent genes transcribed from one promoter into one **polycistronic** mRNA and so regulated together, with the regulatory sites that control them. Regulation is **negative** when a **repressor** protein, bound to an **operator** near the promoter, prevents transcription. It is **positive** when an **activator** protein, bound near the promoter, is required for transcription. A system is **inducible** if a small molecule (the **inducer**, typically a substrate of the pathway) switches expression on, and **repressible** if a small molecule (the **corepressor**, typically the pathway's end product) switches it off. Sequences such as operators and promoters act only on the DNA molecule they are part of (in ***cis***). Diffusible products such as repressors and activators can act on any copy in the cell (in ***trans***).
:::

The four combinations all occur. The *lac* operon is negatively controlled and inducible: its repressor is inactivated by an inducer. The *trp* operon is negatively controlled and repressible: its repressor is activated by tryptophan. The *ara* operon (arabinose utilisation) is positively controlled and inducible, through the AraC protein. Regulating catabolic enzymes by their substrates, and biosynthetic enzymes by their products, is the economic logic of bacterial metabolism: make the enzyme only when it has work to do.

## The lac operon

### The genes

::: definition The lac operon of E. coli {#def-lac}
The ***lac* operon** contains three structural genes: ***lacZ***, encoding **β-galactosidase** (LacZ), which hydrolyses lactose to glucose and galactose and also converts some lactose to the isomer **allolactose**; ***lacY***, encoding **lactose permease** (LacY), which takes lactose into the cell with a proton; and ***lacA***, encoding a thiogalactoside transacetylase. They are transcribed from the promoter ***lacP*** in the order *lacZ lacY lacA*. Upstream is the separately transcribed gene ***lacI***, encoding the **Lac repressor** (LacI), a tetramer that binds the operator. The main operator ***O1*** overlaps the start site (it is centred at +11). Two auxiliary operators lie at −82 (***O3***) and +412, inside *lacZ* (***O2***). The natural inducer is allolactose; **IPTG** (isopropyl β-D-thiogalactoside) is a **gratuitous inducer**, which induces the operon but is not metabolised.
:::

Notation follows the bacterial convention ([[genetics/microbial-genetics]]): genes are lower-case italic (*lacZ*), proteins upper-case roman (LacZ), and superscripts give alleles: *lacZ*⁺, *lacZ*⁻, *lacI*^s^ (super-repressor), *lacO*^c^ (operator constitutive).

Without inducer, a cell contains only a few molecules of β-galactosidase. A few minutes after an inducer is added, β-galactosidase is being made at about a thousand times the uninduced rate and soon makes up a few per cent of the cell's protein. The time course itself was evidence. Induction began within minutes and stopped as quickly when inducer was removed, which suggested an unstable intermediate between gene and protein. This was one of the observations that led Jacob and Monod to propose messenger RNA.

### The genetic analysis

Jacob and Monod, working with Arthur Pardee at the Pasteur Institute from 1957, isolated mutants that made the *lac* enzymes all the time, with or without inducer: they were **constitutive**. The mutations fell into two classes. One class mapped in *lacI* and the other close to *lacZ*, at the site Jacob and Monod called the operator. To understand what each did, they built partial diploids, with one *lac* region on the chromosome and another on an F′ plasmid ([[genetics/microbial-genetics]]), and asked which allele was dominant, and whether a mutation acted only on genes on the same DNA molecule.

```python
# Jacob-Monod logic: beta-galactosidase from lac partial diploids, with and without inducer
# A copy is a dict: I in {'+','-','s'} (repressor gene), O in {'+','c'} (operator), Z in {'+','-'}

def repressor_present(copies, inducer):
    """Is there active repressor in the cell? lacI+ repressor is inactivated by inducer;
    lacI^s (super-repressor) cannot bind inducer. Repressor diffuses: it acts in trans."""
    kinds = {c['I'] for c in copies}
    return 's' in kinds or ('+' in kinds and not inducer)

def beta_gal(copies, inducer):
    """beta-galactosidase is made from each copy with Z+ whose operator is not occupied."""
    R = repressor_present(copies, inducer)
    return any(c['Z'] == '+' and (c['O'] == 'c' or not R) for c in copies)

def parse(g):
    """'I+ O+ Z-' -> {'I': '+', 'O': '+', 'Z': '-'}"""
    return {t[0]: t[1:] for t in g.split()}

genotypes = ["I+ O+ Z+", "I- O+ Z+", "I+ O+ Z- / I- O+ Z+", "I+ Oc Z- / I+ O+ Z+",
             "I+ Oc Z+ / I+ O+ Z-", "Is O+ Z+ / I+ O+ Z+", "Is Oc Z+ / I+ O+ Z+"]
print(f"{'genotype':24s} {'no inducer':>11s} {'inducer':>8s}")
for g in genotypes:
    copies = [parse(x) for x in g.split('/')]
    row = ['+' if beta_gal(copies, ind) else '-' for ind in (False, True)]
    print(f"{g:24s} {row[0]:>11s} {row[1]:>8s}")
```

The program encodes the operon model as two rules. It prints `+` where β-galactosidase is made at a high rate and `-` where it is at the basal level:

```
genotype                  no inducer  inducer
I+ O+ Z+                           -        +
I- O+ Z+                           +        +
I+ O+ Z- / I- O+ Z+                -        +
I+ Oc Z- / I+ O+ Z+                -        +
I+ Oc Z+ / I+ O+ Z-                +        +
Is O+ Z+ / I+ O+ Z+                -        -
Is Oc Z+ / I+ O+ Z+                +        +
```

::: example Reading the partial-diploid table {#ex-merodiploid}
Explain each line of the table in terms of the model, and say what each shows about the gene or site concerned.
::: solution
1. Wild type: repressor blocks *lacO* without inducer; inducer inactivates it. Inducible.
2. *lacI*⁻: no functional repressor, so the operator is never occupied. Constitutive.
3. *lacI*⁺ *lacZ*⁻ / *lacI*⁻ *lacZ*⁺: the repressor made from the *lacI*⁺ copy diffuses and represses the *lacZ*⁺ gene on the *other* molecule. The diploid is inducible, so *lacI*⁺ is dominant to *lacI*⁻ and acts in *trans*: *lacI* encodes a diffusible product.
4. *lacO*^c^ *lacZ*⁻ / *lacO*⁺ *lacZ*⁺: the only *lacZ*⁺ gene is next to a normal operator, so it is inducible. The *lacO*^c^ mutation does nothing for a *lacZ* gene on another molecule.
5. *lacO*^c^ *lacZ*⁺ / *lacO*⁺ *lacZ*⁻: now the *lacZ*⁺ gene is next to the mutant operator and is constitutive, even though active repressor is present. Lines 4 and 5 together show that *lacO*^c^ is **cis-dominant**: it affects only genes on the same DNA molecule, as expected of a site that does not make a product. (Jacob and Monod measured LacY and LacA too, which behaved like LacZ, showing that one operator controls all three genes.)
6. *lacI*^s^ / *lacI*⁺: the super-repressor cannot bind inducer, so it stays on both operators. Uninducible, and dominant in *trans* over *lacI*⁺.
7. *lacI*^s^ with *lacO*^c^ *lacZ*⁺ in *cis*: the mutant operator cannot be bound even by the super-repressor, so that *lacZ* gene is constitutive. Operator-constitutive mutations are **epistatic** to *lacI*^s^, which places the operator downstream of the repressor in the pathway of control.
:::
:::

From such experiments Jacob and Monod proposed the **operon model** in 1961 (*Genetic regulatory mechanisms in the synthesis of proteins*, *Journal of Molecular Biology*). A regulator gene makes a repressor that acts on an operator to control transcription of linked structural genes, and an inducer acts by inactivating the repressor. Every element of the model was later confirmed biochemically. Walter Gilbert and Benno Müller-Hill (1966) isolated the Lac repressor by its binding to radioactive IPTG. There are only about ten repressor tetramers per cell, so they had to use an overproducing strain. In 1967 they showed that it binds *lac* DNA and is released by IPTG. Gilbert and Allan Maxam sequenced the operator in 1973: a region of a little over 20 bp, with near-twofold symmetry, that bound repressor protected from nuclease digestion. Jacob and Monod shared the 1965 Nobel Prize in Physiology or Medicine with André Lwoff.

::: warning "A dominant mutation is one that makes the enzyme"
Dominance in these tests is about phenotype in a partial diploid, not about which allele is "stronger". *lacI*⁺ is dominant to *lacI*⁻ because a functional repressor is supplied in *trans* to both copies, yet *lacI*^s^ is dominant to *lacI*⁺, and some *lacI* mutations (*lacI*^−d^) are dominant to *lacI*⁺ even though they make no functional repressor. They encode subunits that join wild-type subunits into inactive mixed tetramers (a **dominant-negative** effect, analysed by Müller-Hill's group). And *lacO*^c^ is dominant only in *cis*. Before calling a mutation dominant or recessive, say which phenotype is scored, in which partial diploid, and whether the alleles are in *cis* or *trans*.
:::

### How the repressor works

The Lac repressor is a tetramer of identical subunits of 360 amino acids, formed as a dimer of dimers. Each dimer binds one operator with a **helix-turn-helix** motif inserted into the major groove ([[molecular-biology/dna-structure#def-bdna]]). Binding of inducer to the core of each subunit changes its shape so that the DNA-binding domains can no longer bind both operator half-sites, and affinity for the operator falls about a thousandfold. Because the tetramer has two DNA-binding dimers, it can bind O1 and an auxiliary operator at once, looping the DNA between them. Looping raises the local concentration of repressor at O1 and so strengthens repression. Stefan Oehler, Benno Müller-Hill and colleagues (1990) found that removing both auxiliary operators reduced repression by more than an order of magnitude. Repression with all three operators is about a thousandfold. That loops form most easily when the operators lie on the same face of the helix was shown by varying their spacing ([[molecular-biology/dna-structure#ex-helical-phase]]).

::: proposition Fold repression by a repressor {#prop-repression}
Let a repressor bind its operator with dissociation constant $K_d$, let its free concentration in the cell be $[R]$, and suppose transcription occurs only when the operator is free. At equilibrium the operator is free a fraction
$$
\frac{1}{1 + [R]/K_d}
$$ {#eq-repression}
of the time, so the **fold repression** (expression without repressor divided by expression with it) is $1 + [R]/K_d$. In a cell of volume $V$, one molecule corresponds to a concentration $1/(N_A V)$, which is about 1.7 nM for $V = 1$ fL, roughly the volume of *E. coli*. The model assumes binding at equilibrium, a single operator, no non-specific binding and a promoter that is fully active whenever the operator is free.
:::

::: example How much repression from ten molecules? {#ex-repression}
A cell of volume 1 fL contains 10 repressor tetramers, and the effective $K_d$ of the repressor for O1 in vivo is taken as 0.1 nM (an illustrative value). (a) What is the fold repression predicted by [[#eq-repression]]? (b) An inducer lowers the repressor's affinity a thousandfold. What fraction of maximal expression is then reached? (c) Why is the real repression stronger than this one-operator estimate, and the real induced level close to full?
::: solution
(a) $[R] = 10\times1.66\ \mathrm{nM} = 16.6$ nM, so the fold repression is $1 + 16.6/0.1 = 167$.

(b) With $K_d = 100$ nM, the operator is free a fraction $1/(1 + 16.6/100) = 0.86$ of the time, so expression reaches 86 % of the maximum.

(c) Looping between O1 and the auxiliary operators raises the effective local concentration of repressor at O1 far above 16.6 nM, increasing repression to about a thousandfold. On the other hand, non-specific binding to the rest of the chromosome lowers the free repressor concentration, and the induced repressor's affinity falls far enough that it is almost always off the operator. More detailed thermodynamic models, which include non-specific binding and looping (for example Bintu et al., 2005), predict measured repression levels well.
:::
:::

::: widget plot
f: 1/(1 + 1.66*x/K); 1/(1 + 1.66*x/(1000*K))
x: 0, 100
y: 0, 1
sliders: K=0.1:0.01:2:0.01
labels: \text{no inducer}; \text{with inducer (affinity }/1000)
caption: Fraction of maximal expression, $1/(1 + [R]/K_d)$, against the number of repressor molecules in a 1 fL cell (1 molecule ≈ 1.66 nM) for the operator affinity $K_d$ in nM on the slider, without inducer and with an inducer that weakens binding a thousandfold, from [[#prop-repression]]. With $K_d = 0.1$ nM, ten molecules repress about 170-fold and inducer restores most expression. Notice that more repressor deepens repression but also raises the floor of the induced curve: the cell's ten or so molecules are a compromise between tight repression and full induction.
:::

### Induction is cooperative, and can be all-or-none

The response of the operon to inducer is sigmoid, not hyperbolic. Each repressor tetramer must bind more than one inducer molecule before it lets go of DNA, and lactose uptake requires LacY, which is itself encoded by the operon.

::: proposition The Hill function {#prop-hill}
When a response requires the cooperative binding of $n$ ligand molecules, the fraction of maximal response at ligand concentration $x$ is often described by the **Hill function**
$$
f(x) = \frac{x^n}{K^n + x^n},
$$ {#eq-hill}
where $K$ is the concentration giving half the maximal response and $n$ is the **Hill coefficient**, which measures steepness. The response rises from 10 % to 90 % of maximum over a range of concentrations $x_{90}/x_{10} = 81^{1/n}$: 81-fold for $n = 1$, 9-fold for $n = 2$ and 3-fold for $n = 4$. The Hill function is an empirical description. $n$ is not in general the number of binding sites, though it cannot exceed it in a simple equilibrium model. For induction of *lac* by IPTG, measured Hill coefficients are about 2.
:::

::: proof
Set $f = x^n/(K^n + x^n)$ and solve for $x$: $x = K\,[f/(1-f)]^{1/n}$. Then $x_{90} = K\cdot9^{1/n}$ and $x_{10} = K\cdot(1/9)^{1/n}$, so $x_{90}/x_{10} = 81^{1/n}$.
:::

::: example Estimating a Hill coefficient {#ex-hill}
In a population of cells carrying a *lac* reporter, expression is 10 % of maximal at 20 μM IPTG and 90 % at 60 μM. (a) Estimate the Hill coefficient and $K$. (b) What expression would you predict at 30 μM? (c) Why might a population average give a misleading Hill coefficient? (The numbers are illustrative.)
::: solution
(a) From [[#prop-hill]], $x_{90}/x_{10} = 81^{1/n}$, so $3 = 81^{1/n}$ and $n = \ln81/\ln3 = 4$. Then $K = x_{10}\cdot9^{1/n} = 20\times9^{0.25} = 34.6$ μM, the geometric mean of 20 and 60.

(b) $f = 30^4/(34.6^4 + 30^4) = 8.1\times10^5/(1.44\times10^6 + 8.1\times10^5) = 0.36$.

(c) If individual cells are bistable, each is either off or on, and the population average reflects the *fraction* of induced cells rather than a graded response in each. The average curve can then be much steeper (or shallower) than the response of the repressor to inducer. With the lactose permease removed, or with the cells pre-loaded with inducer, the single-cell response is graded and its Hill coefficient is about 2. Measuring single cells, by flow cytometry or microscopy of a fluorescent reporter, distinguishes the two cases.
:::
:::

Aaron Novick and Milton Weiner (1957) found something stranger. At low concentrations of a gratuitous inducer, individual cells were either fully induced or uninduced, with few intermediates, and the induced state was inherited for many generations. The reason is **positive feedback**. An induced cell has permease, takes up inducer efficiently and stays induced, while an uninduced cell has almost no permease and takes up little. The population is **bistable**. Such switches, and the mathematics of bistability, are treated in [[systems-biology/switches-oscillators]].

::: widget plot
f: x^n/(K^n + x^n)
x: 0, 200
y: 0, 1
sliders: n=2:1:4:0.1; K=50:5:150:1
caption: The Hill function [[#eq-hill]]: fraction of maximal expression against inducer concentration $x$ (μM, illustrative) for Hill coefficient $n$ and half-maximal concentration $K$. With $n = 1$ the curve is hyperbolic and the change from 10 % to 90 % expression needs an 81-fold rise in inducer; with $n = 2$ only 9-fold; with $n = 4$ only 3-fold. Cooperativity turns a graded response into a near switch.
:::

### Positive control: CAP and catabolite repression

When *E. coli* is grown on a mixture of glucose and lactose, it uses the glucose first. Only when glucose runs out, after a pause, does it switch to lactose. Monod described this **diauxie** in his thesis of 1942, and it was the problem that started his work on *lac*. Part of the explanation is positive control of *lac* by the **catabolite activator protein** (CAP, also called CRP, the cAMP receptor protein).

::: definition CAP and catabolite repression {#def-cap}
**CAP** is a dimeric activator that binds DNA only when bound to **cyclic AMP** (cAMP). At *lac*, CAP–cAMP binds a site centred at −61.5, bends the DNA by about 90°, and contacts the C-terminal domain of an α subunit of RNA polymerase, helping the polymerase to bind the weak *lac* promoter (**class I activation**, by recruitment). At other promoters CAP binds closer, at about −41.5, and contacts σ as well (**class II**). When glucose is plentiful, the glucose-transport system keeps adenylate cyclase inactive and cAMP is low, so CAP is inactive and *lac* is transcribed poorly even with lactose present. In addition, the glucose transport protein EIIA^Glc^, dephosphorylated during glucose uptake, inhibits LacY (**inducer exclusion**), keeping lactose out of the cell. Together these effects constitute **catabolite repression**.
:::

Measurements in the 1990s (Toshifumi Inada, Hiroji Aiba and colleagues, 1996) suggested that inducer exclusion, not the fall in cAMP, accounts for most of the glucose effect on *lac* in *E. coli*. The textbook story of cAMP alone is incomplete. The *lac* promoter thus works as an **AND gate**: it is strongly expressed only when lactose is present (repressor off) *and* glucose is absent (CAP on, inducer admitted).

::: quiz
Which strain would express β-galactosidase at a high level when grown on lactose plus glucose?
- [ ] Wild type
- [ ] A strain lacking adenylate cyclase (*cya*⁻)
- [x] A strain whose *lac* promoter carries the *lacUV5* mutation, which makes the −10 element match consensus
- [ ] A strain carrying *lacI*^s^
::: solution
The *lacUV5* promoter is strong enough to bind RNA polymerase well without CAP, so it is largely insensitive to catabolite repression; with lactose present to inactivate repressor (and with less complete inducer exclusion of high external lactose), it is expressed. Wild type is catabolite-repressed; a *cya*⁻ strain has no cAMP and so no active CAP, and expresses *lac* poorly under all conditions; *lacI*^s^ is uninducible.
:::
:::

## The trp operon: repression and attenuation

The *trp* operon encodes the five enzymes that make tryptophan from chorismate (*trpE*, *D*, *C*, *B*, *A*). It is controlled in two independent ways, both responding to tryptophan.

**Repression.** The **Trp repressor** (TrpR) binds the *trp* operator, which overlaps the promoter, only when it has bound tryptophan, the **corepressor**. High tryptophan means active repressor and little transcription. This gives about a 70-fold range of control.

**Attenuation.** Charles Yanofsky and colleagues found in the 1970s that a *trpR*⁻ strain, lacking repressor, still regulated the operon about ten-fold by tryptophan. The second mechanism lies in the 162-nucleotide **leader** between the promoter and *trpE*. The leader encodes a **leader peptide** of 14 amino acids that includes two adjacent tryptophan codons, and its RNA can fold in alternative ways.

::: definition Attenuation in the trp leader {#def-attenuation}
The *trp* leader RNA contains four segments, 1–4, which can pair as 1:2 and 3:4 or as 2:3. The **3:4 hairpin**, followed by a run of U residues, is an intrinsic **terminator** (the **attenuator**). The **2:3 hairpin** is an **antiterminator** that prevents 3:4 from forming. Because bacterial translation is coupled to transcription, a ribosome follows close behind RNA polymerase, translating the leader peptide, whose Trp codons lie in segment 1:
- When charged tRNA^Trp^ is **plentiful**, the ribosome translates through the Trp codons and reaches segment 2 just as segments 3 and 4 are made. With segment 2 covered, the **3:4 terminator** forms, and transcription stops before the structural genes.
- When charged tRNA^Trp^ is **scarce**, the ribosome stalls at the Trp codons, covering segment 1. Segment 2 is free to pair with 3 as it is made, forming the **2:3 antiterminator**, so 3:4 cannot form and transcription continues into *trpE*.
- If no ribosome loads at all, 1:2 and 3:4 form, and transcription terminates.
:::

The combined range of control is the product of the two: about 70-fold from repression and 8- to 10-fold from attenuation, some 600- to 700-fold overall. Attenuation senses charged tRNA, not tryptophan itself, and so tracks the cell's real capacity to make proteins. Attenuation is common in amino-acid biosynthetic operons of enteric bacteria. The *his* operon leader encodes seven consecutive histidine codons, and the *leu* and *thr* operons work similarly, and in some of these attenuation is the only control.

::: example Predicting attenuation {#ex-attenuation}
Predict whether the *trp* structural genes are transcribed (most RNA polymerases reading past the attenuator) in each case, in a *trpR*⁻ strain: (a) high tryptophan; (b) starvation for tryptophan; (c) starvation for both tryptophan and arginine, given that the leader peptide contains an arginine codon just after the two Trp codons; (d) a mutation that changes the two Trp codons to Leu codons, under tryptophan starvation; (e) a mutation that destroys the ribosome-binding site of the leader peptide, under tryptophan starvation.
::: solution
(a) Ribosomes pass the Trp codons and cover segment 2; 3:4 forms; termination. Little transcription.

(b) Ribosomes stall at Trp codons; 2:3 forms; antitermination. Transcription of the genes.

(c) Ribosomes stall at the Trp codons, which come first, so the outcome is the same as (b): antitermination. (The Arg codon matters only when Trp is plentiful and Arg scarce: a stall at the Arg codon, just downstream, also leaves segment 2 free in part, and gives some antitermination.)

(d) Ribosomes no longer stall under tryptophan starvation, because there are no Trp codons; they cover segment 2; 3:4 forms. Attenuation no longer responds to tryptophan. (It would respond to leucine instead.)

(e) No ribosome translates the leader, so 1:2 and 3:4 form; termination regardless of tryptophan. Transcription is low, which shows that translation of the leader is needed for antitermination.
:::
:::

## The λ switch

Phage λ, after infecting *E. coli*, either grows lytically, making about a hundred progeny and lysing the cell, or integrates its DNA into the chromosome as a **prophage** ([[molecular-biology/dna-repair-recombination]]) and is replicated with the host, a state called **lysogeny**. Mark Ptashne's group in the 1960s–80s worked out how the choice is made and maintained, and it became the paradigm of a genetic switch.

Two repressors compete for three adjacent operator sites, O~R~1, O~R~2 and O~R~3, which overlap two divergent promoters, P~R~ (lytic genes, starting with *cro*) and P~RM~ (the *cI* gene for λ repressor). The **λ repressor** (CI) binds O~R~1 most tightly and, cooperatively through contacts between dimers, O~R~2. Bound there, it represses P~R~ and also *activates* its own promoter P~RM~ by touching RNA polymerase. At high concentration it also binds O~R~3 and represses itself. This keeps its level within narrow bounds. **Cro** binds O~R~3 first, repressing P~RM~, and at higher levels the other sites. In a lysogen, CI holds the lytic genes off and keeps itself on, and the state is inherited by daughter cells. When the host's DNA is damaged, activated RecA stimulates self-cleavage of CI (as it does for LexA in the SOS response, [[molecular-biology/dna-repair-recombination]]). P~R~ is then de-repressed, Cro is made and takes over, and the prophage is **induced** into lytic growth. The switch combines cooperative binding, positive and negative autoregulation and mutual repression, the ingredients of a bistable memory, in a few hundred base pairs.

## Regulation by RNA

Not every regulator is a protein.

::: definition Riboswitches {#def-riboswitch}
A **riboswitch** is a structured region of an mRNA, usually in the 5′ untranslated region, that binds a small metabolite directly and changes the expression of the downstream gene. It consists of an **aptamer**, which binds the ligand with high specificity, and an **expression platform**, whose alternative folding is determined by ligand binding. In bacteria, ligand binding typically either forms an intrinsic terminator (stopping transcription) or sequesters the Shine–Dalgarno sequence in a hairpin (blocking translation initiation). Some activate expression instead.
:::

Ronald Breaker's group described the first riboswitches in 2002, for thiamine pyrophosphate, flavin mononucleotide and coenzyme B~12~, after noticing conserved RNA structures upstream of genes for their biosynthesis. Riboswitches are now known for more than 40 ligands, including amino acids (lysine, glycine), nucleobases (guanine, adenine), metal ions and signalling nucleotides. They are found mostly in bacteria. One class, for thiamine pyrophosphate, also occurs in fungi and plants, where it controls splicing. A riboswitch works like attenuation without a ribosome: the metabolite itself decides how the RNA folds. Because riboswitches are absent from humans, some are being explored as antibiotic targets.

Bacteria also use **small regulatory RNAs** (sRNAs), typically 50–300 nucleotides, which base-pair with target mRNAs, often near the ribosome-binding site, to block translation or promote degradation. Many depend on the RNA chaperone **Hfq**. For example, when iron is scarce, the sRNA RyhB is made and represses mRNAs for iron-containing proteins that are not essential, so that iron is saved for essential ones. The CRISPR systems of [[molecular-biology/molecular-tools]] are also RNA-guided regulators, though of foreign DNA rather than of the cell's own genes.

## Sensing the outside: two-component systems and quorum sensing

Many bacterial regulators respond to signals outside the cell. **Two-component systems** consist of a membrane **sensor histidine kinase**, which autophosphorylates on a histidine when it detects a signal, and a cytoplasmic **response regulator**, to which the phosphate is transferred (onto an aspartate). The phosphorylated regulator is usually a DNA-binding transcription factor. *E. coli* has about 30 such pairs. EnvZ–OmpR, for example, adjusts outer membrane porins to the osmolarity of the medium, and PhoR–PhoB responds to phosphate limitation.

**Quorum sensing** lets bacteria regulate genes according to their population density. In the marine bacterium *Vibrio fischeri*, which lives in the light organ of the Hawaiian bobtail squid, the enzyme LuxI makes a diffusible **acyl-homoserine lactone**. At high cell density it accumulates, binds the activator LuxR and switches on the *lux* genes for bioluminescence. Light is produced only when enough bacteria are present to make it useful. Quorum sensing controls many group behaviours, including biofilm formation, and is discussed in [[microbiology/microbial-ecology]].

::: application Bacterial regulatory parts in biotechnology
The parts of these systems are the standard toolkit for controlling gene expression in the laboratory. Recombinant proteins are commonly made in *E. coli* from the *lac* promoter or the hybrid *tac* promoter, repressed by LacI until IPTG is added, or from the phage T7 promoter with the T7 RNA polymerase gene itself placed under *lacUV5* control. Arabinose-inducible (AraC–P~BAD~) and tetracycline-inducible (TetR) systems allow graded control, and the tetracycline system has been adapted for mammalian cells. In synthetic biology, repressors such as LacI, TetR and λ CI have been wired into toggle switches (Gardner, Cantor and Collins, 2000) and oscillators (the repressilator of Elowitz and Leibler, 2000). See [[biotechnology/protein-production]] and [[biotechnology/synthetic-biology]].
:::

::: history
Jacques Monod described diauxie in 1942. Aaron Novick and Milton Weiner reported all-or-none induction in 1957, and Arthur Pardee, François Jacob and Jacques Monod published the "PaJaMo" experiment, showing that the inducible allele is dominant and that its product acts in the cytoplasm, in 1959. Jacob and Monod set out the operon model in 1961, and with André Lwoff received the Nobel Prize in 1965. Walter Gilbert and Benno Müller-Hill isolated the Lac repressor in 1966, and Mark Ptashne isolated the λ repressor the same year (published 1967). Geoffrey Zubay and colleagues, and Ira Pastan and Robert Perlman, showed in 1970 that cAMP and CAP activate *lac* transcription. Charles Yanofsky's group described attenuation in the *trp* operon from the mid-1970s, and Ronald Breaker's group reported riboswitches in 2002.
:::

::: summary
- Operons are co-transcribed genes with shared regulatory sites. Control may be negative (repressor at operator) or positive (activator), and inducible (substrate turns on) or repressible (product turns off). Sites act in *cis*, diffusible products in *trans*.
- The *lac* operon (*lacZYA*) is repressed by LacI, a tetramer binding O1 (with O2 and O3 for looping), and induced by allolactose or IPTG. Partial diploids showed that *lacI* acts in *trans*, *lacO*^c^ is cis-dominant, *lacI*^s^ is trans-dominant and uninducible, and *lacI*^−d^ is dominant negative.
- Fold repression in the simplest equilibrium model is $1 + [R]/K_d$; one molecule per femtolitre is about 1.7 nM. Looping and non-specific binding modify this.
- Induction is cooperative (Hill coefficient about 2; 10–90 % range $81^{1/n}$-fold) and can be bistable because LacY gives positive feedback.
- CAP–cAMP activates *lac* by recruiting RNA polymerase. Catabolite repression combines low cAMP with inducer exclusion, so *lac* is an AND gate for "lactose present, glucose absent".
- The *trp* operon is controlled by TrpR repression (about 70-fold) and attenuation (about 10-fold): ribosome stalling at Trp codons in the leader favours the 2:3 antiterminator over the 3:4 terminator.
- The λ switch uses cooperative binding of CI and Cro at O~R~1–3 to choose and remember lysogeny or lysis; RecA-stimulated cleavage of CI induces the prophage.
- Riboswitches (aptamer plus expression platform) and Hfq-dependent sRNAs regulate by RNA. Two-component systems and quorum sensing link transcription to external signals.
:::

## Exercises

::: exercise Constitutive or inducible? {level=1}
For each haploid *E. coli* genotype, say whether β-galactosidase is made without inducer, with inducer, both or neither: (a) *lacI*⁺ *lacO*⁺ *lacZ*⁺; (b) *lacI*⁻ *lacO*⁺ *lacZ*⁻; (c) *lacI*^s^ *lacO*⁺ *lacZ*⁺; (d) *lacI*⁺ *lacO*^c^ *lacZ*⁺.
::: solution
(a) With inducer only. (b) Neither (no functional *lacZ*). (c) Neither (uninducible). (d) Both (constitutive).
:::
:::

::: exercise Fold repression {level=1 check="51"}
A repressor at 20 nM free concentration binds its operator with $K_d = 0.4$ nM. What fold repression does [[#eq-repression]] predict?
::: solution
$1 + 20/0.4 = 1 + 50 = 51$-fold.
:::
:::

::: exercise Combined control {level=1 check="700"}
If repression controls the *trp* operon over a 70-fold range and attenuation independently over a 10-fold range, what is the combined range?
::: solution
Independent multiplicative controls combine as a product: $70\times10 = 700$-fold.
:::
:::

::: exercise Steepness of induction {level=2 check="3"}
For a Hill function with $n = 2$, by what factor must the inducer concentration rise to take expression from 50 % to 90 % of maximum?
::: solution
$x_{50} = K$ and $x_{90} = K\cdot9^{1/2} = 3K$, so a 3-fold rise.
:::
:::

::: exercise More partial diploids {level=2}
Predict β-galactosidase and permease synthesis (without and with inducer) in: (a) *lacI*⁺ *lacO*^c^ *lacZ*⁻ *lacY*⁺ / *lacI*⁺ *lacO*⁺ *lacZ*⁺ *lacY*⁻; (b) *lacI*^s^ *lacO*⁺ *lacZ*⁺ *lacY*⁺ / *lacI*⁻ *lacO*^c^ *lacZ*⁻ *lacY*⁺; (c) *lacI*^−d^ *lacO*⁺ *lacZ*⁺ / *lacI*⁺ *lacO*⁺ *lacZ*⁺.
::: solution
(a) β-galactosidase comes only from the second copy (normal operator): inducible. Permease comes only from the first copy (*lacO*^c^): constitutive. The example shows that the operator controls only genes in *cis*.

(b) β-galactosidase comes only from the first copy, whose normal operator is bound by the super-repressor with or without inducer: none. Permease comes from the second copy with *lacO*^c^: constitutive, because the super-repressor cannot bind a constitutive operator.

(c) *lacI*^−d^ subunits poison wild-type subunits in mixed tetramers, so little active repressor forms: both *lacZ* genes are expressed constitutively (or nearly so). This is the dominant-negative phenotype.
:::
:::

::: exercise Diauxie {level=2}
*E. coli* is grown in a medium with a little glucose and much lactose. The growth curve shows exponential growth (doubling every 40 min) for 3 h, a pause of 40 min, and then exponential growth with a doubling time of 60 min. (a) Explain each phase in molecular terms. (b) Predict the curve for a *lacI*⁻ mutant. (c) Predict the curve for a *crp*⁻ (CAP-deficient) mutant.
::: solution
(a) Phase 1: glucose is used; *lac* is repressed (glucose causes inducer exclusion and low cAMP), so lactose is not taken up. Pause: glucose runs out; cAMP rises, inducer exclusion ends, a little lactose enters through the few permease molecules, allolactose is made and induces the operon; enzymes accumulate. Phase 2: growth on lactose, slower because lactose yields less energy per unit time than glucose in this medium.

(b) A *lacI*⁻ mutant expresses *lac* constitutively, though glucose still reduces it through CAP and still blocks lactose uptake by inducer exclusion; the pause would be shorter or absent because the enzymes are already present when glucose runs out.

(c) Without CAP, the wild-type *lac* promoter is weak, so after glucose is exhausted the cells induce *lac* poorly: a long lag and slow growth on lactose.
:::
:::

::: exercise Designing a riboswitch test {level=3}
You find a conserved RNA structure in the 5′ UTR of a bacterial gene for lysine biosynthesis, followed by a hairpin and a run of U residues. (a) Propose how it regulates the gene. (b) Design an experiment, using a reporter gene, to test whether lysine itself (not a protein) controls expression. (c) How would you show directly that the RNA binds lysine?
::: solution
(a) A lysine riboswitch: when lysine is abundant it binds the aptamer, stabilising a structure that allows the downstream terminator (hairpin plus U-run) to form, so transcription stops before the coding sequence; when lysine is scarce, an alternative antiterminator forms and the gene is transcribed.

(b) Fuse the 5′ UTR to *lacZ* (or GFP) and measure expression in cells grown with high or low lysine. To show that no protein is needed, use an in vitro transcription system with purified RNA polymerase, the DNA template and lysine at different concentrations: if lysine increases termination at the U-run in vitro without any other protein, the RNA senses lysine directly. Point mutations in the aptamer that abolish lysine binding should make expression constitutive in vivo, and compensatory mutations restoring the structure should restore regulation.

(c) Measure binding of lysine (or a labelled analogue) to the purified RNA, for example by in-line probing (ligand-induced changes in spontaneous cleavage of flexible nucleotides), isothermal titration calorimetry, or equilibrium dialysis, and show specificity by testing related amino acids.
:::
:::

::: exercise Interpreting a λ mutant {level=3}
λ mutants that form clear plaques (no lysogens survive in the plaque) fall into three genes, *cI*, *cII* and *cIII*. A *cI*⁻ mutant can never form lysogens; *cII*⁻ and *cIII*⁻ mutants form lysogens rarely, but once formed, the lysogens are stable. A *vir* mutant forms clear plaques even on a lawn of λ lysogens, which are immune to ordinary λ. (a) What do these results suggest about the roles of CI, CII and CIII? (b) Why are λ lysogens immune to superinfection by λ? (c) Where would you expect *vir* mutations to lie?
::: solution
(a) CI (λ repressor) is needed both to establish and to maintain lysogeny. CII and CIII are needed only to establish it: CII is an activator of the promoter that gives the first burst of *cI* transcription (P~RE~), and CIII protects CII from degradation; once CI is made, it maintains its own synthesis from P~RM~ and no longer needs CII.

(b) A lysogen contains CI, which binds the operators of any incoming λ DNA and represses its lytic genes in *trans*.

(c) In the operators (O~R~ and O~L~): multiple mutations that prevent CI binding make the lytic promoters immune to repressor — cis-acting operator-constitutive mutations, the λ equivalent of *lacO*^c^.
:::
:::
