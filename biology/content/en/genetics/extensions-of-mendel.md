Mendel was lucky, and he was also shrewd. His seven pea traits each depend on a single gene, with one allele completely dominant over the other, both homozygotes equally viable, and a phenotype that does not depend on the weather. Most traits are not like that. Heterozygotes are often intermediate; a gene may have dozens of alleles; some alleles kill; several genes may affect the same trait, so that one masks another; and the same genotype can give different phenotypes in different environments. When the early Mendelians crossed other organisms, they found ratios such as $1:2:1$, $2:1$, $9:3:4$, $9:7$ and $12:3:1$, and for a few years these seemed to threaten the new theory.

They did not. Every one of these ratios follows from Mendel's two laws once we allow for the ways in which genotypes are translated into phenotypes. This chapter works through those extensions: dominance relations and their molecular basis, multiple and lethal alleles, penetrance and expressivity, interactions between genes (epistasis), the effect of environment, and finally the polygenic traits that vary continuously, where Mendelian inheritance and the statistics of continuous variation meet. The rule throughout is the same: **segregation and assortment are about genotypes; the ratios we count are about phenotypes**, and the mapping from one to the other is where biology enters.

## Dominance is a relation between phenotypes

::: definition Dominance relations {#def-dominance}
Consider a locus with alleles $A_1$ and $A_2$ and the phenotypes of the three genotypes $A_1A_1$, $A_1A_2$, $A_2A_2$.
- $A_1$ is **completely dominant** to $A_2$ if $A_1A_2$ has the phenotype of $A_1A_1$.
- The alleles show **incomplete** (or **partial**) **dominance** if $A_1A_2$ is intermediate between the homozygotes.
- The alleles are **codominant** if $A_1A_2$ shows the phenotypes of both homozygotes at once.
- **Overdominance** is the case in which the heterozygote lies outside the range of the homozygotes (for example, is larger or fitter than either).
:::

With incomplete dominance or codominance, the three genotypes have three distinguishable phenotypes, so the F2 phenotypic ratio is the genotypic ratio $1:2:1$ of [[genetics/mendelian-inheritance#eq-121]]. The classic example of incomplete dominance is flower colour in the snapdragon *Antirrhinum majus*, studied by Erwin Baur: red × white gives pink F1, and the F2 is red : pink : white in about $1:2:1$. This is *not* blending, because the red and white parental types reappear unchanged in the F2.

Codominance is best seen with molecular phenotypes. The human MN blood group is determined by two alleles of the gene *GYPA*, which encodes glycophorin A, a protein on the surface of red blood cells; the alleles differ at two amino acids, which define the M and N antigens. People of genotype *MN* carry both antigens on their cells, so all three genotypes can be identified by testing with antibodies.

::: intuition Why many loss-of-function alleles are recessive
Most genes encode enzymes or other proteins whose product is needed in some quantity, not in an exact amount. If one functional allele makes half the normal amount of an enzyme and half is enough for a normal phenotype, the gene is **haplosufficient** and the loss-of-function allele is recessive — Mendel's *r* allele ([[genetics/mendelian-inheritance]]) is an example. A dominant loss-of-function allele implies either that half the product is not enough (**haploinsufficiency**, common for structural proteins and dosage-sensitive regulators) or that the defective product actively interferes with the normal one (a **dominant-negative** effect, typical of proteins that work as multimers: one faulty subunit can spoil a whole complex). **Gain-of-function** alleles — making a protein overactive or active in the wrong place — are usually dominant.
:::

The level at which we look decides the dominance relation. Consider the β-globin allele *HBB*$^{S}$ (often written Hb$^S$), which replaces glutamate 6 by valine in the β chain of haemoglobin. At the level of the protein, the alleles are codominant: a heterozygote has both haemoglobin A and haemoglobin S, which can be separated by electrophoresis. At the level of red-cell shape under ordinary conditions, the normal allele is dominant: heterozygotes usually have normal cells, and the characteristic sickling disease is seen in homozygotes. At the level of resistance to severe *Plasmodium falciparum* malaria, the heterozygote is the most resistant genotype — and the selective consequences of that overdominance are a central example in [[population-genetics/selection-models]]. (The clinical aspects belong to [Medicine Atlas](/learn/medicine/course.php?c=genetics).)

::: warning "Dominant alleles mask recessive ones by switching them off"
In a heterozygote both alleles are normally transcribed and translated; the recessive allele is not inactivated or "suppressed". Dominance is a statement about the phenotype of the whole organism, which usually results from the combined output of the two alleles. For the same reason, a single allele can be dominant for one phenotype and recessive for another, as with *HBB*$^{S}$.
:::

## Multiple alleles

A diploid individual carries at most two alleles of a gene, but a population may carry many. With $k$ alleles there are $k$ homozygotes and $\binom{k}{2} = k(k-1)/2$ heterozygotes, so

$$
\text{number of genotypes} = k + \frac{k(k-1)}{2} = \frac{k(k+1)}{2}.
$$ {#eq-genotypes}

The **ABO blood group** system, discovered by Karl Landsteiner in 1900–01, is the textbook case. The gene *ABO* encodes a glycosyltransferase that adds a sugar to a carbohydrate (the H antigen) on the surface of red cells and other cells. The $I^A$ allele adds *N*-acetylgalactosamine (giving the A antigen), $I^B$ adds galactose (B antigen); the two enzymes differ at a few amino acids that change which sugar they transfer. The common $i$ (or O) allele carries a frameshift deletion and makes no active enzyme. So $I^A$ and $I^B$ are codominant with each other, and both are dominant to $i$:

| Genotype | $I^AI^A$, $I^Ai$ | $I^BI^B$, $I^Bi$ | $I^AI^B$ | $ii$ |
|---|---|---|---|---|
| Blood group (phenotype) | A | B | AB | O |

Three alleles give $3\cdot4/2 = 6$ genotypes but only four phenotypes.

A **dominance series** is a set of alleles ranked by dominance. Coat colour in rabbits is the standard example: full colour (*C*) > chinchilla ($c^{ch}$) > Himalayan ($c^{h}$) > albino ($c$), all alleles of the tyrosinase gene. At some loci the number of alleles is enormous. The self-incompatibility *S* locus of many flowering plants has dozens of alleles in a single population, because pollen carrying an allele also present in the style is rejected, which favours rare alleles; and the human major histocompatibility (HLA) loci have thousands of known alleles.

::: example A blood-group cross {#ex-abo}
A person of blood group A whose mother was group O has children with a person of group B whose father was group O. What blood groups can their children have, and in what proportions?
::: solution
The group A parent received $i$ from the group O mother, so is $I^Ai$; likewise the group B parent is $I^Bi$. The cross $I^Ai \times I^Bi$ gives

$$
I^AI^B : I^Ai : I^Bi : ii = \tfrac14 : \tfrac14 : \tfrac14 : \tfrac14 ,
$$

that is, AB : A : B : O = $1:1:1:1$. Four different phenotypes in equal proportions from one pair of parents is a hallmark of a cross between two different heterozygotes at a locus with codominant alleles.
:::
:::

## Lethal alleles

In 1905 Lucien Cuénot found that yellow mice (from the dominant allele $A^Y$ of the *agouti* locus) never bred true. Crossing yellow with yellow always gave yellow and non-yellow young, and the ratio was about $2:1$, not $3:1$. William Castle and Clarence Little explained the result in 1910: $A^YA^Y$ embryos die early in development, so the homozygotes are never born. Litters from yellow × yellow crosses are correspondingly about a quarter smaller.

::: proposition The 2 : 1 ratio of a recessive lethal {#prop-lethal}
Let an allele $L$ have a dominant visible effect and be lethal when homozygous. Then among the surviving offspring of $Ll \times Ll$,

$$
Ll : ll = \tfrac23 : \tfrac13 ,
$$

so the visible phenotype appears in a $2:1$ ratio, and every survivor showing the dominant phenotype is heterozygous.
:::

::: proof
Before selection the zygotes are $LL : Ll : ll = \tfrac14 : \tfrac12 : \tfrac14$. Conditioning on survival, which removes $LL$,

$$
P(Ll \mid \text{survives}) = \frac{1/2}{1/2 + 1/4} = \frac23, \qquad P(ll \mid \text{survives}) = \frac{1/4}{3/4} = \frac13 .
$$
:::

The molecular explanation came in the 1990s: the $A^Y$ allele is a deletion of about 170 kb that removes most of the neighbouring gene *Raly* and places *agouti* under the control of the *Raly* promoter. The yellow coat comes from overexpression of agouti protein (a dominant gain of function); the embryonic lethality from loss of *Raly* (a recessive loss of function). One mutation, two phenotypes with opposite dominance — a clear instance of **pleiotropy**, the influence of one gene on several traits. Many recessive lethal alleles have no visible effect in heterozygotes at all and are detected only because a quarter of the progeny of two carriers fail to develop.

::: example Testing 2 : 1 against 3 : 1 {#ex-lethal}
A cross of two short-tailed mice gives 236 short-tailed and 124 normal-tailed young. Test the hypotheses (a) that short tail is a simple dominant ($3:1$) and (b) that it is dominant with a recessive lethal effect ($2:1$).
::: solution
$n = 360$. (a) $E = 270,\ 90$: $X^2 = \dfrac{34^2}{270} + \dfrac{34^2}{90} = 4.28 + 12.84 = 17.13$, $\nu = 1$, $p \approx 3.5\times10^{-5}$. Reject. (b) $E = 240,\ 120$: $X^2 = \dfrac{16}{240} + \dfrac{16}{120} = 0.067 + 0.133 = 0.20$, $p = 0.65$. The data are consistent with a recessive lethal. A further test would be a test cross: if short-tailed mice are all heterozygous, every short-tailed × normal cross should give a $1:1$ ratio, and no short-tailed mouse should ever breed true.
:::
:::

## Penetrance, expressivity and the environment

Even at a single locus, the same genotype does not always produce the same phenotype.

::: definition Penetrance and expressivity {#def-penetrance}
The **penetrance** of a genotype is the proportion of individuals with that genotype who show the associated phenotype at all. A genotype is **fully penetrant** if the proportion is 1 and has **incomplete penetrance** otherwise. **Expressivity** is the degree to which the phenotype is expressed among those who show it; **variable expressivity** means that affected individuals differ in severity.
:::

Incomplete penetrance and variable expressivity arise from other genes (the **genetic background**), from the environment, and from chance events in development. They matter in pedigrees ([[genetics/sex-linkage-pedigrees]]), where a dominant allele with incomplete penetrance can appear to skip a generation.

The dependence of phenotype on environment is captured by the **norm of reaction**: the set of phenotypes that a genotype produces across a range of environments. The Himalayan rabbit is a vivid example. The $c^{h}$ allele encodes a temperature-sensitive tyrosinase that is active only below about 33 °C, so pigment forms only in the cooler extremities — ears, nose, feet and tail. If fur is shaved from a patch of the back and the patch is kept cool while the fur regrows, it grows in black. Siamese cats carry a similar allele. The same principle underlies **temperature-sensitive mutations** in *Drosophila*, yeast and bacteria, which have been invaluable in genetics because the mutant phenotype can be switched on or off by shifting the temperature.

::: warning "How much of a trait is due to genes and how much to environment?"
For an individual this question has no answer. The Himalayan rabbit's black ears need both the $c^{h}$ allele and a cold environment; neither alone produces them, so it is meaningless to divide the colour into a genetic part and an environmental part. What *can* be measured is how much of the **variation** among individuals in a particular population and environment is associated with genetic differences — the heritability of [[population-genetics/quantitative-traits]]. A trait can be entirely genetically determined in its mechanism and still be changed completely by the environment; the human condition phenylketonuria, caused by loss of the enzyme phenylalanine hydroxylase, is the classic case of an inherited condition whose consequences depend on diet.
:::

## Interactions between genes

Most traits depend on many genes. When two loci affect the same trait, their alleles can interact in ways that alter the $9:3:3:1$ of a dihybrid cross. The genotypes still assort exactly as Mendel's laws predict; what changes is how the nine genotypic classes are sorted into phenotypes.

### New phenotypes from interaction

William Bateson and Reginald Punnett found in 1905–08 that comb shape in chickens depends on two loci. Rose comb (*R-pp*) × pea comb (*rrP-*) gave an F1 with a new form, walnut comb, and an F2 of walnut (*R-P-*) : rose (*R-pp*) : pea (*rrP-*) : single (*rrpp*) in $9:3:3:1$. Four phenotypes are still distinguishable, so the ratio is unchanged, but two of them (walnut and single) appear in neither parent: they are the products of interaction.

### Epistasis

::: definition Epistasis {#def-epistasis}
**Epistasis** is an interaction between loci in which the genotype at one locus masks or modifies the phenotypic effect of the genotype at another. The masking locus is **epistatic** to the masked one, which is **hypostatic**. In population and quantitative genetics the word is used more broadly for any departure from additivity of the effects of different loci on a trait.
:::

Epistasis is different from dominance. Dominance is an interaction between two alleles at the *same* locus; epistasis is an interaction between alleles at *different* loci.

The modified ratios can all be derived by the same method. Start from the four classes of the dihybrid F2,

$$
A\text{-}B\text{-} : A\text{-}bb : aaB\text{-} : aabb = 9 : 3 : 3 : 1 ,
$$

decide from the biology which classes have the same phenotype, and add their probabilities.

::: proposition Modified dihybrid ratios {#prop-epistasis}
For the F2 of *Aa Bb* × *Aa Bb* with unlinked loci and complete dominance at each locus:
1. **Recessive epistasis** — *aa* masks the effect of the B locus — gives $9:3:4$.
2. **Duplicate recessive epistasis (complementary genes)** — the dominant phenotype requires at least one dominant allele at *both* loci — gives $9:7$.
3. **Dominant epistasis** — *A-* masks the effect of the B locus — gives $12:3:1$.
4. **Dominant suppression** — *A-* suppresses the effect of *B-*, and *aabb* has the same phenotype as the suppressed class — gives $13:3$.
5. **Duplicate dominant genes** — a dominant allele at *either* locus gives the same phenotype — gives $15:1$.
6. **Duplicate genes with cumulative effect** — one dominant allele at either locus gives an intermediate phenotype, dominant alleles at both an extreme — gives $9:6:1$.
:::

::: proof
In each case we group the classes of $9:3:3:1$.

1. Recessive epistasis: *A-B-* shows the B-dominant phenotype (9), *A-bb* the B-recessive phenotype (3), and both *aaB-* and *aabb* show the masked phenotype of *aa*: $3 + 1 = 4$. Hence $9:3:4$.
2. Complementary genes: only *A-B-* (9) has the dominant phenotype; *A-bb*, *aaB-* and *aabb* all lack it: $3 + 3 + 1 = 7$. Hence $9:7$.
3. Dominant epistasis: *A-B-* and *A-bb* share the phenotype determined by *A-*: $9 + 3 = 12$; *aaB-* (3) and *aabb* (1) are distinguished by the B locus. Hence $12:3:1$.
4. Dominant suppression: the phenotype of *B-* appears only in *aaB-* (3); the others, $9 + 3 + 1 = 13$, share the alternative. Hence $13:3$.
5. Duplicate dominant genes: every class with at least one dominant allele, $9 + 3 + 3 = 15$, versus *aabb* (1). Hence $15:1$.
6. Cumulative: *A-B-* (9), *A-bb* and *aaB-* together ($3 + 3 = 6$), *aabb* (1). Hence $9:6:1$.

In every case the denominators remain 16, because the underlying genotypic frequencies are those of [[genetics/mendelian-inheritance#prop-assortment]].
:::

Each grouping corresponds to a biological mechanism, and recognising which one applies is the useful skill.

| Ratio | Mechanism | Classic example |
|---|---|---|
| $9:3:4$ | recessive epistasis | coat colour in Labrador retrievers; mouse agouti/albino |
| $9:7$ | two steps of one pathway, both needed | flower colour in the sweet pea *Lathyrus odoratus* |
| $12:3:1$ | dominant epistasis | fruit colour in summer squash *Cucurbita pepo* |
| $13:3$ | dominant suppressor | white plumage in White Leghorn × White Wyandotte chickens |
| $15:1$ | duplicate genes | capsule shape in shepherd's purse *Capsella bursa-pastoris* |
| $9:6:1$ | cumulative duplicate genes | fruit shape in summer squash (disc : spherical : long) |

::: example Labrador retrievers: 9 : 3 : 4 {#ex-labrador}
In Labrador retrievers the *B* locus (the gene *TYRP1*) determines whether eumelanin pigment is black (*B-*) or brown (*bb*, "chocolate"), and the *E* locus (the melanocortin-1 receptor gene *MC1R*) determines whether eumelanin is deposited in the hair at all: *ee* dogs are yellow whatever their *B* genotype. Two black dogs, both *Bb Ee*, have many puppies. What proportions of black, chocolate and yellow puppies are expected? What fraction of the yellow puppies are *bb*?
::: solution
Black needs *B-E-*: $\tfrac34\cdot\tfrac34 = \tfrac9{16}$. Chocolate is *bbE-*: $\tfrac14\cdot\tfrac34 = \tfrac3{16}$. Yellow is *ee* regardless of *B*: $\tfrac14 = \tfrac4{16}$, made up of *B-ee* ($\tfrac3{16}$) and *bbee* ($\tfrac1{16}$). The ratio is black : chocolate : yellow = $9:3:4$. Among yellow puppies, a fraction $\dfrac{1/16}{4/16} = \tfrac14$ are *bb*. These dogs look like other yellows but have brown rather than black nose and lip pigment — the *b* allele is not entirely hidden, which is why careful scoring sometimes recovers four classes.
:::
:::

::: example Complementary genes in sweet peas: 9 : 7 {#ex-sweet-pea}
Bateson, Saunders and Punnett crossed two true-breeding white-flowered strains of sweet pea and obtained purple F1; the F2 contained purple and white plants in a ratio close to $9:7$. (a) Explain the result with a biochemical pathway. (b) An F2 of 700 plants contains 382 purple and 318 white. Test the fit to $9:7$ and to $1:1$.
::: solution
(a) Suppose the purple anthocyanin pigment is made in two steps, colourless precursor $\xrightarrow{\text{enzyme A}}$ colourless intermediate $\xrightarrow{\text{enzyme B}}$ purple, with the enzymes encoded by the dominant alleles of two unlinked loci. One white strain is *AAbb* (blocked at step 2), the other *aaBB* (blocked at step 1). The F1 is *AaBb*, with both enzymes: purple. In the F2 only *A-B-* ($\tfrac9{16}$) makes pigment; the other seven sixteenths are blocked at one step or both. The two white parents **complement** each other — the basis of the complementation test of [[genetics/genes-and-mutation]].

(b) For $9:7$: $E = 700\times\tfrac9{16} = 393.75$ and $306.25$; $X^2 = \dfrac{11.75^2}{393.75} + \dfrac{11.75^2}{306.25} = 0.351 + 0.451 = 0.80$, $\nu = 1$, $p = 0.37$: consistent. For $1:1$: $E = 350,\ 350$; $X^2 = \dfrac{32^2}{350}\times2 = 5.85$, $p = 0.016$: rejected at the 5 % level. Note that with smaller samples the two hypotheses could not be distinguished; ratios that differ only modestly need large F2 populations.
:::
:::

::: example Summer squash: 12 : 3 : 1 {#ex-squash}
In summer squash a dominant allele *W* gives white fruit whatever the genotype at a second locus, at which *Y-* gives yellow and *yy* green fruit in *ww* plants. (a) What are the F2 proportions from *WwYy* selfed? (b) A white F2 plant is test-crossed to *wwyy* and gives white and yellow fruit in a $1:1$ ratio, with no green. What was its genotype?
::: solution
(a) White: *W-*, $\tfrac34 = \tfrac{12}{16}$. Yellow: *wwY-*, $\tfrac14\cdot\tfrac34 = \tfrac3{16}$. Green: *wwyy*, $\tfrac1{16}$. Ratio $12:3:1$.

(b) The test-cross offspring are white (*Ww…*) or not. Half white means the plant was *Ww*. The non-white half were all yellow, so every gamete carrying *w* also carried *Y*; with no green offspring at all, the plant must be *YY*. Its genotype was *WwYY*. (A *WwYy* plant would give white : yellow : green = $2:1:1$; a *WWY-* plant would give only white.)
:::
:::

::: quiz
A cross of two true-breeding white-flowered lines gives an all-coloured F1, and an F2 of 160 plants of which 89 are coloured. Which explanation fits best?
- [ ] A single gene with colour recessive
- [ ] Recessive epistasis, $9:3:4$
- [x] Two complementary genes, $9:7$
- [ ] Dominant epistasis, $12:3:1$
::: solution
White × white giving coloured F1 means the two white lines are defective in different genes that complement each other; the F2 expectation is then $9:7$, i.e. $160\times\tfrac9{16} = 90$ coloured — very close to 89. A single recessive gene could not give a coloured F1 from two white parents of the same genotype, and $9:3:4$ and $12:3:1$ predict three phenotypic classes.
:::
:::

## Continuous variation: many genes of small effect

Height, body mass, milk yield and the number of bristles on a fly vary continuously, without discrete classes to count. Early in the twentieth century this seemed to separate the "biometricians", who studied such traits statistically following Francis Galton, from the Mendelians. The reconciliation began with experiments in plants.

In 1909 Herman Nilsson-Ehle crossed varieties of wheat with red and white kernels. Some crosses gave F2 ratios of $3:1$ (red : white), some $15:1$, and one $63:1$; and among the "red" F2 plants he could distinguish several shades. He proposed that kernel colour depends on several loci, each with a "red" allele that adds a fixed amount of pigment, so that the shade depends only on the *number* of red alleles. A $63:1$ ratio means that a fraction $\tfrac1{64} = (\tfrac14)^3$ of the F2 is white: three segregating loci.

::: proposition The additive polygene model {#prop-polygene}
Suppose a trait is determined by $n$ unlinked loci, each with an allele that adds a constant amount $a$ to the phenotype and an allele that adds nothing, with no dominance, no epistasis and no environmental effect. In the F2 of a cross between the two extreme homozygotes, the number $K$ of "plus" alleles in an individual has the binomial distribution

$$
P(K = j) = \binom{2n}{j}\left(\tfrac12\right)^{2n}, \qquad j = 0, 1, \dots, 2n,
$$ {#eq-polygene}

the phenotype takes $2n+1$ values, and the fraction of the F2 as extreme as either parent is $(\tfrac14)^n$ each.
:::

::: proof
The F1 is heterozygous at all $n$ loci. Each F2 individual receives $2n$ alleles (one from each parent at each locus), and each is independently a plus allele with probability $\tfrac12$ by segregation and independent assortment. The count of plus alleles is therefore binomial with $2n$ trials and probability $\tfrac12$. The parental extreme with no plus alleles has probability $(\tfrac12)^{2n} = (\tfrac14)^n$, and the same holds for the extreme with $2n$.
:::

For two loci the five phenotypic classes are in the ratio $1:4:6:4:1$; for three, $1:6:15:20:15:6:1$. As $n$ grows, the distribution approaches a normal curve, and when environmental variation blurs each class into its neighbours, the steps disappear altogether.

::: widget galton
rows: 6
balls: 640
p: 0.5
caption: Read each ball as one F2 individual of a three-locus additive cross and each row of pins as one of its $2n = 6$ allele slots: bouncing right means a "plus" allele (probability $1/2$). The bins count individuals by number of plus alleles, which [[#eq-polygene]] says should be in the ratio $1:6:15:20:15:6:1$. Increase the rows to model more loci and watch the histogram approach the normal curve; only one F2 individual in $4^n$ is as extreme as a parent.
:::

In 1916 Edward East confirmed the model for flower (corolla) length in tobacco, *Nicotiana longiflora*: the F1 of a long × short cross was intermediate and uniform, the F2 was much more variable, and selection within the F2 gave F3 lines that differed in mean — exactly as expected if the variation was due to many segregating Mendelian loci plus environmental noise. Two years later Ronald Fisher showed mathematically that the correlations between relatives measured by the biometricians follow from Mendelian inheritance at many loci (1918). The analysis of such **quantitative traits** — the partitioning of variance, heritability and the response to selection — is the subject of [[population-genetics/quantitative-traits]] and [[population-genetics/response-to-selection]].

::: application Epistasis and dominance in breeding and medicine
The modified ratios of this chapter are not curiosities. In dog and livestock breeding, coat-colour loci with recessive epistasis explain why two black parents can have yellow offspring. In plant breeding, complementary genes for disease resistance or flower pigmentation explain why crossing two unremarkable lines sometimes yields a striking F1. In human genetics, the effect of an allele at one locus can depend strongly on the genotype at another ("modifier genes"), which is one reason why penetrance and severity vary between families carrying the same allele; see [Medicine Atlas](/learn/medicine/lesson.php?c=genetics&l=mendelian-inheritance) for clinical examples.
:::

::: history
Karl Landsteiner described the ABO blood groups in 1900–01. Lucien Cuénot reported the failure of yellow mice to breed true in 1905, and William Castle and Clarence Little attributed the $2:1$ ratio to embryonic death of the homozygotes in 1910. William Bateson, Edith Saunders and Reginald Punnett described comb shape in fowl and the $9:7$ ratio of white sweet peas in reports to the Evolution Committee of the Royal Society (1905–08); Bateson had introduced the word *epistatic* by 1909, in *Mendel's Principles of Heredity*. Herman Nilsson-Ehle's wheat crosses (1909) and Edward East's tobacco experiments (1916) established the multiple-factor hypothesis for continuous traits, and Ronald Fisher's paper *The correlation between relatives on the supposition of Mendelian inheritance* (1918) joined Mendelian genetics to biometry. Richard Woltereck coined *Reaktionsnorm*, norm of reaction, in 1909.
:::

::: summary
- Dominance is a relation between the phenotypes of heterozygotes and homozygotes: complete, incomplete (heterozygote intermediate, F2 $1:2:1$), codominant (both phenotypes present) or overdominant. It can differ with the level of phenotype examined.
- Loss-of-function alleles of haplosufficient genes are recessive; dominant alleles act through haploinsufficiency, dominant-negative effects or gain of function.
- A locus with $k$ alleles has $k(k+1)/2$ genotypes; ABO has three alleles, six genotypes and four phenotypes.
- A recessive lethal with a dominant visible effect gives $2:1$ among survivors.
- Penetrance (who shows the phenotype) and expressivity (how strongly) depend on genetic background, environment and chance; a norm of reaction describes the phenotypes of one genotype across environments.
- Epistasis groups the $9:3:3:1$ classes: $9:3:4$ (recessive), $9:7$ (complementary), $12:3:1$ (dominant), $13:3$, $15:1$, $9:6:1$. The ratio points to the pathway.
- Continuous traits result from many loci of small effect plus environment: in the additive model the F2 count of plus alleles is binomial($2n$, ½), and a fraction $(\tfrac14)^n$ resembles each parent.
:::

## Exercises

::: exercise Counting genotypes {level=1 check="10"}
A gene has four alleles in a population. How many different genotypes are possible at this locus in a diploid?
::: solution
By [[#eq-genotypes]], $4\cdot5/2 = 10$: four homozygotes and six heterozygotes.
:::
:::

::: exercise Pink snapdragons {level=1 check="1/2"}
Two pink snapdragons (incompletely dominant red and white alleles) are crossed. What fraction of their offspring are pink?
::: solution
Pink is the heterozygote, which makes up $\tfrac12$ of the offspring of a heterozygote × heterozygote cross ([[genetics/mendelian-inheritance#eq-121]]).
:::
:::

::: exercise Blood groups of a family {level=1}
A group AB person has children with a group O person. Which blood groups can the children have? Can a group AB parent have a group O child?
::: solution
$I^AI^B \times ii$ gives $I^Ai$ (A) and $I^Bi$ (B) in equal proportions. No child can be AB or O. A group AB parent always passes on $I^A$ or $I^B$, so cannot have a group O ($ii$) child — barring rare exceptions such as the *cis*-AB allele, in which one chromosome carries an enzyme able to make both antigens, or the Bombay phenotype, in which an *hh* genotype at the separate *FUT1* locus prevents formation of the H substance on which the *ABO* enzymes act.
:::
:::

::: exercise A yellow test {level=2 check="2/3"}
Yellow mice ($A^Ya$) are crossed with each other. What fraction of the live-born young are yellow?
::: solution
By [[#prop-lethal]], $\tfrac23$ of survivors are $A^Ya$ (yellow) and $\tfrac13$ are $aa$.
:::
:::

::: exercise Yellow Labradors {level=2 check="1/4"}
A chocolate Labrador (*bbEe*) is mated with a yellow Labrador (*Bbee*). What fraction of the puppies are expected to be black?
::: solution
Black requires *B-E-*. From *bb* × *Bb*, $P(B\text{-}) = \tfrac12$; from *Ee* × *ee*, $P(E\text{-}) = \tfrac12$. So $P(\text{black}) = \tfrac14$. The remaining puppies are chocolate (*bbEe*, $\tfrac14$) and yellow (*ee*, $\tfrac12$).
:::
:::

::: exercise Which ratio? {level=2}
A cross of a squash plant with disc-shaped fruit and one with long fruit gives disc-shaped F1. The F2 contains 89 disc, 62 spherical and 9 long-fruited plants. (a) Propose a genetic explanation and test it with χ². (b) What F2 ratio would you expect from crossing a spherical F2 plant of genotype *AAbb* with one of genotype *aaBB*?
::: solution
(a) Three classes with the extreme parental type rare suggests $9:6:1$: two loci, disc *A-B-*, spherical *A-bb* or *aaB-*, long *aabb*. With $n = 160$, $E = 90,\ 60,\ 10$; $X^2 = \dfrac{1}{90} + \dfrac{4}{60} + \dfrac{1}{10} = 0.011 + 0.067 + 0.100 = 0.18$, $\nu = 2$, $p = 0.91$: an excellent fit. (A $9:3:4$ hypothesis gives $X^2 = 58$ and is rejected.)

(b) *AAbb* × *aaBB* gives *AaBb* F1 with disc fruit — two spherical parents produce disc offspring — and the F2 again segregates $9:6:1$.
:::
:::

::: exercise How many loci? {level=2 check="4"}
Two inbred strains differ in a quantitative trait. In an F2 of 2048 plants, about 8 are as extreme as each parent. Assuming the additive polygene model of [[#prop-polygene]], estimate the number of segregating loci.
::: solution
The fraction as extreme as one parent is $8/2048 = 1/256 = (\tfrac14)^4$, so $n = 4$. In practice this estimate is crude: environmental variation blurs the classes, loci have unequal effects, and linkage can make extreme types rarer still.
:::
:::

::: exercise Interpreting a 13 : 3 {level=3}
Two true-breeding white chicken breeds, one with dominant white plumage and one with recessive white, are crossed. The F1 are white, and the F2 contains 131 white and 29 coloured birds. (a) Propose a two-locus explanation, giving the genotypes of the parents and of the coloured F2 birds. (b) Test it. (c) What fraction of the white F2 birds would, if test-crossed to the recessive-white breed, produce some coloured offspring?
::: solution
(a) Let *C* be required for colour (*cc* is recessive white) and *I* be a dominant inhibitor of colour. The dominant-white breed is *IICC*, the recessive-white breed *iicc*; the F1 *IiCc* is white because of *I*. Coloured F2 birds are *iiC-* ($\tfrac3{16}$); all others ($\tfrac{13}{16}$) are white.

(b) $E = 160\times\tfrac{13}{16} = 130$ and $30$: $X^2 = \tfrac1{130} + \tfrac1{30} = 0.041$, $p = 0.84$. Consistent with $13:3$.

(c) A test cross to *iicc* gives coloured offspring only if the bird can transmit a gamete *iC*, i.e. carries *i* and *C*. Among the white F2 genotypes ($\tfrac{13}{16}$ in total) these are *IiCC* ($\tfrac2{16}$) and *IiCc* ($\tfrac4{16}$); *iicc* is white but carries no *C*. So the answer is $\dfrac{2+4}{13} = \dfrac6{13}$. The others (*IICC*, *IICc*, *IIcc*, *Iicc*, *iicc*: $1+2+1+2+1 = 7$ sixteenths) give only white offspring.
:::
:::

::: exercise Gene or environment? {level=3}
A *Drosophila* stock homozygous for a mutation shows abnormal wings in 70 % of flies reared at 25 °C and 10 % at 18 °C; wild-type flies are normal at both temperatures. (a) Describe the penetrance of the mutant genotype. (b) A student argues that the abnormality is "70 % genetic at 25 °C and 10 % genetic at 18 °C". Explain what is wrong. (c) Suggest a molecular explanation for the temperature effect and an experiment to test it.
::: solution
(a) The genotype has incomplete, temperature-dependent penetrance: 0.70 at 25 °C and 0.10 at 18 °C.

(b) The figures are penetrances of one genotype in two environments, not shares of causation. The abnormality requires the mutant genotype (wild-type flies never show it) *and* is promoted by the higher temperature; both are necessary causes, and the effect of each depends on the other (a genotype–environment interaction). Within the mutant stock all flies have the same genotype, so the variation among them is due to environment and developmental chance, not to genes at all.

(c) The mutation may make a protein less stable, so that it folds or functions adequately at low temperature but not at high temperature (a temperature-sensitive allele). One test is a temperature-shift experiment: move developing flies between 18 °C and 25 °C at different stages to find the temperature-sensitive period, which reveals when in development the gene product is needed. Biochemically, the mutant protein's thermal stability could be compared with the wild type's.
:::
:::
