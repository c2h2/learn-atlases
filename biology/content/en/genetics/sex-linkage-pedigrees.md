In 1910 Thomas Hunt Morgan, breeding fruit flies in a crowded laboratory at Columbia University in New York, found a single male with white eyes instead of the usual brick red. When he crossed it with red-eyed females and bred their offspring, the white eyes came back in the F2 at about the expected frequency for a recessive trait — but only in males. A gene was behaving as though it were attached to the X chromosome. This one fly connected a particular gene to a particular chromosome for the first time, and the analysis of exceptions to its inheritance, by Morgan's student Calvin Bridges, turned the chromosome theory of inheritance from a plausible hypothesis into an established fact.

This chapter develops the genetics of genes on sex chromosomes, the mechanisms by which organisms compensate for having different numbers of X chromosomes in the two sexes, and the analysis of **pedigrees**: family trees from which, in humans and other species that cannot be crossed at will, the mode of inheritance of a trait has to be inferred. We use the probability of [[genetics/mendelian-inheritance]] throughout and add one new tool, Bayes' theorem, for updating genotype probabilities with information from relatives.

## Morgan's white-eyed fly

::: definition Sex linkage {#def-sex-linkage}
A gene on the X chromosome is **X-linked**; one on the Y (and absent from the X) is **Y-linked**. Genes on the Z or W chromosomes of ZZ/ZW species are **Z-linked** or **W-linked**. The heterogametic sex (XY males, ZW females) carries a single copy of X-linked (or Z-linked) genes and is **hemizygous** for them: whatever allele it carries is expressed, dominant or recessive. Inheritance that differs between reciprocal crosses because of sex linkage is called **sex-linked inheritance**.
:::

We write X-linked genotypes with the allele as a superscript on the chromosome: in *Drosophila* convention, the recessive white allele is $w$ and the wild-type red allele $w^+$, so a white-eyed male is $X^{w}Y$ and a heterozygous female $X^{w^+}X^{w}$, often abbreviated to $X^+X^w$.

Morgan's crosses were as follows.

1. **Red ♀ × white ♂** ($X^+X^+ \times X^wY$). All F1 were red-eyed: the daughters $X^+X^w$, the sons $X^+Y$ (sons receive their X from their mother).
2. **F1 × F1** ($X^+X^w \times X^+Y$). The F2 consisted of 2459 red-eyed females, 1011 red-eyed males and 782 white-eyed males. The expected classes are $X^+X^+$ and $X^+X^w$ (all red females, $\tfrac12$), $X^+Y$ (red males, $\tfrac14$) and $X^wY$ (white males, $\tfrac14$). White-eyed females were absent, as predicted.
3. **The reciprocal, white ♀ × red ♂** ($X^wX^w \times X^+Y$), done with white-eyed females obtained from further crosses, gave red-eyed daughters ($X^+X^w$) and white-eyed sons ($X^wY$): the sons resemble their mothers and the daughters their fathers. This is **criss-cross inheritance**, the signature of X linkage of a recessive allele.

::: proposition Crosses for an X-linked recessive allele {#prop-xlinked}
Let $a$ be a recessive allele of an X-linked gene in an XX/XY species, with regular segregation and equal viability. Then:
1. Sons receive their X from their mother and their Y from their father; daughters receive one X from each parent.
2. $X^AX^a \times X^AY$ gives daughters all of the dominant phenotype (half carriers) and sons $\tfrac12$ $X^AY$ and $\tfrac12$ $X^aY$.
3. $X^AX^A \times X^aY$ gives all offspring of the dominant phenotype, with all daughters carriers.
4. $X^aX^a \times X^AY$ gives dominant-phenotype (carrier) daughters and recessive-phenotype sons.
5. $X^AX^a \times X^aY$ gives daughters and sons each $\tfrac12$ dominant, $\tfrac12$ recessive.
:::

::: proof
The female produces eggs carrying each of her X chromosomes with probability $\tfrac12$; the male produces X-bearing sperm, which make daughters, and Y-bearing sperm, which make sons, each with probability $\tfrac12$. So a daughter's genotype is (mother's random X, father's X) and a son's is (mother's random X, Y). Each case follows by listing the mother's two X chromosomes: for example in (2), daughters are $X^AX^A$ or $X^aX^A$ — both of dominant phenotype — and sons are $X^AY$ or $X^aY$ with probability $\tfrac12$ each.
:::

::: example An X-linked and an autosomal gene together {#ex-x-auto}
In *Drosophila*, vestigial wings (*vg*) are an autosomal recessive trait. A female heterozygous at both loci, $X^+X^w\ vg^+/vg$, is crossed with a white-eyed, vestigial male, $X^wY\ vg/vg$. What fraction of the offspring are (a) white-eyed females with vestigial wings, (b) red-eyed males with normal wings? (c) What is the phenotypic ratio among the sons?
::: solution
The loci are on different chromosomes, so they assort independently, and we multiply. For the X locus, every offspring is equally likely to be any of $X^+X^w$ (red ♀), $X^wX^w$ (white ♀), $X^+Y$ (red ♂), $X^wY$ (white ♂), each $\tfrac14$. For the autosomal locus, *vg*$^+$/*vg* × *vg*/*vg* gives normal : vestigial = $\tfrac12 : \tfrac12$ in both sexes.

(a) $\tfrac14\cdot\tfrac12 = \tfrac18$. (b) $\tfrac14\cdot\tfrac12 = \tfrac18$. (c) Among sons, red : white = $1:1$ and normal : vestigial = $1:1$ independently, so red normal : red vestigial : white normal : white vestigial = $1:1:1:1$. Daughters show the same four classes in the same ratio here, because the father carries *w*; with a red-eyed father, all daughters would be red.
:::
:::

::: example Testing Morgan's F2 {#ex-morgan}
Test Morgan's F2 counts (2459 red females : 1011 red males : 782 white males) against the $2:1:1$ expected under X linkage. If the fit is poor, locate the discrepancy.
::: solution
$n = 4252$, so $E = 2126,\ 1063,\ 1063$. $X^2 = \dfrac{333^2}{2126} + \dfrac{52^2}{1063} + \dfrac{281^2}{1063} = 52.2 + 2.5 + 74.3 = 129.0$ with $\nu = 2$; $p < 10^{-20}$. The fit is very poor. But the problem lies in the numbers, not the pattern: females outnumber males ($2459 : 1793$), and among males whites are fewer than reds ($782 : 1011$, $X^2 = 29.2$ for $1:1$). Both deviations are explained if white-eyed flies survive less well than red-eyed ones — a common property of mutant flies in crowded cultures. The qualitative prediction, no white females, is met exactly. The lesson is general: a χ² test rejects a precise numerical hypothesis, but whether to reject the genetic model depends on which assumption — here, equal viability — has failed.
:::
:::

## Bridges and non-disjunction: the proof of the chromosome theory

When Calvin Bridges repeated the cross white ♀ × red ♂ on a large scale, he found that about one offspring in 2000 was exceptional: a white-eyed daughter or a red-eyed son, contrary to [[#prop-xlinked]](4). The exceptional red-eyed sons were sterile. Bridges proposed in 1916 that in the mothers of these flies the two X chromosomes had occasionally failed to separate in meiosis — **non-disjunction** — producing eggs with two X chromosomes ($X^wX^w$) or with none (O).

| Egg | Sperm $X^+$ | Sperm Y |
|---|---|---|
| $X^wX^w$ | $X^+X^wX^w$ (usually dies) | $X^wX^wY$: **white-eyed female** |
| O | $X^+O$: **red-eyed, sterile male** | YO: dies |

The hypothesis made a striking prediction: the exceptional white-eyed females should carry a Y chromosome, and the exceptional red males should lack one. Bridges examined their chromosomes in the microscope and found exactly that. He went further: XXY females, having an extra chromosome, undergo **secondary non-disjunction** at a much higher rate (a few per cent), because the X and Y sometimes pair with each other and leave the other X to go either way, and he predicted and found the corresponding exceptional offspring among their progeny.

::: intuition Why Bridges' exceptions were decisive
Morgan's crosses showed that *white* behaves as an X-linked gene would. Bridges showed that whenever the X chromosomes do something unusual, the white gene does the same unusual thing — and the abnormality of the chromosomes can be seen directly. A gene and a chromosome whose irregularities coincide in every case are hard to regard as anything but the same physical object. The title of his paper, *Non-disjunction as proof of the chromosome theory of heredity*, published in the first volume of the journal *Genetics* (1916), states the conclusion.
:::

The same mechanism, non-disjunction of X chromosomes in human meiosis, explains the origin of people with 47,XXY or 45,X chromosome constitutions ([[genetics/chromosome-mutations]]). The results in *Drosophila* also revealed the different roles of the Y: XO flies are male and XXY flies female ([[genetics/chromosomes-meiosis]]).

## Other sex-linked patterns

**Y-linked** (holandric) genes pass from father to all sons and never to daughters. Few genes are confined to the Y: the human Y carries a few dozen protein-coding genes, many concerned with testis determination (*SRY*) and sperm production. At the tips of the human X and Y are the **pseudoautosomal regions**, short segments shared by both chromosomes that pair and cross over in male meiosis; genes there are inherited almost like autosomal genes.

**Z linkage** reverses the sexes. The first example of sex linkage was in fact found in a ZW species, the currant moth *Abraxas grossulariata*, by Leonard Doncaster and Gerald Raynor (1906), before anyone understood it. In chickens, the dominant Z-linked allele *B* for barred plumage gives a simple method of sexing chicks: a non-barred cock ($Z^bZ^b$) crossed with a barred hen ($Z^BW$) gives barred sons ($Z^BZ^b$) and non-barred daughters ($Z^bW$), distinguishable at hatching by the head spot of down.

## Dosage compensation

In XX/XY species, females have two copies of every X-linked gene and males one. Since most genes are expressed in proportion to their number of copies, and since the X carries many genes needed by both sexes (about 800 protein-coding genes in humans), unequal dosage would cause trouble. Different groups solved the problem in different ways.

::: definition Dosage compensation {#def-dosage}
**Dosage compensation** is any mechanism that equalises the expression of X-linked genes between the sexes despite their different numbers of X chromosomes. In **placental mammals** one X in each female cell is inactivated early in development; in ***Drosophila*** the single male X is transcribed about twice as actively; in ***C. elegans*** both X chromosomes of the hermaphrodite are expressed at half the level.
:::

In 1949 Murray Barr and Ewart Bertram noticed a small, darkly staining body in the nuclei of nerve cells of female cats, absent in males — the **Barr body**. Mary Lyon proposed in 1961, from the mottled coats of mice heterozygous for X-linked coat-colour genes, that the Barr body is an inactivated X chromosome. The **Lyon hypothesis**, now amply confirmed, has four parts.

1. In each cell of a female mammal, one X chromosome is inactivated: it becomes condensed heterochromatin and most of its genes are silent.
2. Inactivation happens early in embryonic development (in humans around the time of implantation).
3. In each cell, the choice of which X — maternal or paternal — is inactivated is random (except in the placenta of mice and some other cases, where the paternal X is preferentially inactivated).
4. Once made, the choice is inherited by all descendants of that cell.

A heterozygous female is therefore a **mosaic** of patches of cells expressing one allele or the other. The tortoiseshell and calico coats of cats show this directly: the X-linked *Orange* locus has an allele *O* (orange pigment) and *o* (black), and $X^OX^o$ females have patches of orange and black fur. Tortoiseshell males are rare and are usually XXY. Inactivation is initiated by the long non-coding RNA ***XIST***, transcribed from the X that will become inactive and coating it in *cis*. Some genes, including those in the pseudoautosomal regions, escape inactivation, which is one reason why people with an X chromosome aneuploidy show phenotypes.

::: warning "Carrier females are unaffected because the normal allele is dominant in each cell"
A heterozygous female mammal is not a uniform heterozygote at the cellular level: each cell expresses only one of the two alleles. Whether she shows a phenotype depends on whether a mosaic with roughly half normal cells functions normally, and on the proportion of cells in which each X happens to be active, which can by chance be far from 50 : 50 ("skewed X inactivation"). For a secreted product such as a blood-clotting factor, normal cells usually make enough for the whole body; for a protein needed in every muscle fibre, a mosaic may show patchy effects.
:::

## Human X-linked traits and their frequencies

Because males are hemizygous, an X-linked recessive allele shows its phenotype in every male who carries it but in females only when homozygous.

::: proposition Sex ratio of an X-linked recessive trait {#prop-xfreq}
Let the frequency of an X-linked recessive allele in a randomly mating population be $q$, the same in both sexes. Then the frequency of the recessive phenotype is $q$ in males and $q^2$ in females, and the ratio of affected males to affected females is $1/q$.
:::

::: proof
A male receives one X from a random mother; it carries the allele with probability $q$. A female receives an X from each parent, independently under random mating; both carry the allele with probability $q\cdot q = q^2$. The ratio is $q/q^2 = 1/q$.
:::

Red–green colour vision deficiency, caused mainly by rearrangements of the tandem opsin genes *OPN1LW* and *OPN1MW* on Xq28, affects about 8 % of men of northern European ancestry. With $q \approx 0.08$, [[#prop-xfreq]] predicts about $0.08^2 = 0.64\ \%$ of women, close to the observed frequency of about 0.5 %; the ratio is $1/0.08 = 12.5$ men per woman. For rare X-linked conditions such as haemophilia A (factor VIII gene *F8*) or Duchenne muscular dystrophy (*DMD*), $q$ is of order $10^{-4}$, and affected females are exceedingly rare. (Clinical aspects belong to [Medicine Atlas](/learn/medicine/lesson.php?c=genetics&l=mendelian-inheritance).)

::: widget plot
f: x; x^2
x: 0, 0.2
y: 0, 0.2
labels: males, $q$; females, $q^2$
caption: The frequency of an X-linked recessive phenotype in males ($q$, the allele frequency) and in females ($q^2$) against $q$, under random mating ([[#prop-xfreq]]). At $q = 0.08$ (red–green colour vision deficiency) the female curve is at 0.0064, twelve-and-a-half times lower than the male line; the rarer the allele, the larger the ratio, and for $q$ near $10^{-4}$ the female curve is indistinguishable from zero.
:::

## Pedigree analysis

In humans, matings cannot be arranged, families are small, and the genotypes of most individuals are unknown. The mode of inheritance must be deduced from **pedigrees**, drawn with standard symbols: squares for males, circles for females, filled symbols for affected individuals, a horizontal line joining mates and a vertical line descending to a sibship, a double line for a consanguineous mating (between relatives), and Roman numerals for generations with individuals numbered from left to right (II-3 is the third person in generation II). The person through whom the family came to attention is the **proband**.

::: definition Criteria for the principal modes of inheritance {#def-pedigree-criteria}
For a rare, fully penetrant trait:
- **Autosomal recessive**: affected individuals usually have unaffected parents (both carriers); the trait often appears in siblings but not in other generations ("horizontal" pattern); both sexes are equally affected; consanguinity of parents is more common than in the population. Two affected parents have only affected children.
- **Autosomal dominant**: every affected person has an affected parent (unless the allele arose by new mutation); the trait appears in every generation ("vertical" pattern); about half the children of an affected person are affected; both sexes are affected and transmit it, including from father to son.
- **X-linked recessive**: many more males than females are affected; affected males are related through unaffected carrier females (the trait passes from a man through his daughters to half of their sons); there is **no male-to-male transmission**.
- **X-linked dominant**: affected males pass the trait to all their daughters and none of their sons; affected heterozygous females pass it to half their children of either sex; affected females are about twice as common as affected males.
- **Y-linked**: only males affected, all sons of an affected man affected.
- **Mitochondrial**: transmitted by affected mothers to all or many of their children, never by affected fathers ([[genetics/non-mendelian-inheritance]]).
:::

The reasoning is by elimination. One instance of an affected child of two unaffected parents excludes dominant inheritance (with full penetrance and without new mutation); one instance of father-to-son transmission excludes X linkage; one affected daughter of an unaffected father excludes X-linked recessive inheritance. A pattern usually remains compatible with more than one mode, and then we say which is more probable — the "rare trait" assumption is crucial, because for a common allele many marrying-in people are carriers and recessive traits can appear in successive generations.

::: example Reading a pedigree {#ex-pedigree}
In a family, an unaffected couple (I-1, I-2) have four children: an affected son II-1, an unaffected daughter II-2, an unaffected son II-3 and an affected daughter II-4. II-2 marries an unaffected man from an unrelated family, and they have three unaffected children. Which modes of inheritance are possible for this rare trait?
::: solution
Affected children of unaffected parents exclude autosomal dominant and X-linked dominant inheritance (with full penetrance and no new mutations). An affected daughter (II-4) of an unaffected father (I-1) excludes X-linked recessive inheritance, since an $X^aX^a$ daughter would need an $X^aY$, affected, father. Y-linked inheritance is excluded by the affected daughter, and mitochondrial inheritance would require the mother to be affected. Only **autosomal recessive** inheritance fits: I-1 and I-2 are both *Aa*. II-2 and II-3 are each carriers with probability $\tfrac23$ ([[genetics/mendelian-inheritance#prop-two-thirds]]).
:::
:::

::: quiz
In a pedigree for a rare trait, an affected man has an affected son, and the man's wife is unaffected and unrelated to him. Which mode of inheritance is excluded?
- [ ] Autosomal dominant
- [ ] Autosomal recessive
- [x] X-linked recessive
- [ ] None of them
::: solution
A son receives his X from his mother, never from his father, so an X-linked trait cannot pass from father to son. (X-linked dominant inheritance is excluded for the same reason.) Autosomal dominant inheritance fits well. Autosomal recessive inheritance is not strictly excluded, but would need the unrelated wife to be a carrier of a rare allele, which is unlikely.
:::
:::

### Bayesian risk calculation

Pedigrees often contain more information than simple Mendelian probabilities use. Consider a woman whose brother has an X-linked recessive condition and whose mother is therefore a carrier (because the condition is rare, the brother's allele almost certainly came from the mother rather than by new mutation). Before we know anything else, the woman is a carrier with probability $\tfrac12$. But suppose she has three sons, all unaffected. If she were a carrier, each son would have escaped with probability $\tfrac12$; if she is not, unaffected sons are certain. Her sons are evidence against her being a carrier, and Bayes' theorem says by how much.

::: proposition Bayesian carrier probability {#prop-bayes-carrier}
Let a woman have prior probability $p_0$ of being a heterozygous carrier of a fully penetrant X-linked recessive allele, and let her have $k$ sons, all unaffected (and no other relevant information). Then her posterior probability of being a carrier is

$$
P(\text{carrier} \mid k \text{ unaffected sons}) = \frac{p_0\,(\tfrac12)^k}{p_0\,(\tfrac12)^k + (1 - p_0)} .
$$ {#eq-bayes-carrier}

For $p_0 = \tfrac12$ this is $1/(1 + 2^k)$. Assumptions: no new mutations, full penetrance, independence of the sons' inheritance, and that the sons' phenotypes are known without error.
:::

::: proof
By Bayes' theorem, $P(C \mid D) = P(D \mid C)\,P(C)/P(D)$, where $C$ is "carrier" and $D$ is the data. $P(D \mid C) = (\tfrac12)^k$, since each son independently receives the normal X with probability $\tfrac12$; $P(D \mid \bar C) = 1$. The law of total probability gives $P(D) = p_0(\tfrac12)^k + (1-p_0)\cdot1$, and substituting gives [[#eq-bayes-carrier]]. With $p_0 = \tfrac12$ the factor $\tfrac12$ cancels: $\dfrac{(1/2)^k}{(1/2)^k + 1} = \dfrac{1}{1 + 2^k}$.
:::

::: example Three unaffected sons {#ex-bayes}
For the woman described above, with $p_0 = \tfrac12$ and three unaffected sons, compute the probability that she is a carrier and the probability that her next son will be affected.
::: solution
By [[#eq-bayes-carrier]], $P(\text{carrier}) = 1/(1 + 2^3) = \tfrac19 \approx 0.111$. Laid out as a table:

| | Carrier | Not a carrier |
|---|---|---|
| Prior | $\tfrac12$ | $\tfrac12$ |
| Likelihood of 3 unaffected sons | $\tfrac18$ | $1$ |
| Joint | $\tfrac1{16}$ | $\tfrac12 = \tfrac8{16}$ |
| Posterior | $\tfrac{1}{9}$ | $\tfrac89$ |

Her next son is affected with probability $\tfrac19\cdot\tfrac12 = \tfrac1{18} \approx 0.056$, compared with $\tfrac14$ before her sons' phenotypes were taken into account. This is an exercise in conditional probability; risk assessment for real families takes many more factors into account and is the business of clinical genetics services ([Medicine Atlas](/learn/medicine/lesson.php?c=genetics&l=genetic-testing)).
:::
:::

::: widget plot
f: p*(1/2)^x/(p*(1/2)^x + 1 - p)
x: 0, 8
y: 0, 1
sliders: p=0.5:0.01:0.99:0.01
caption: The posterior probability [[#eq-bayes-carrier]] that a woman is a carrier of an X-linked recessive allele, against the number $k$ of her sons, all unaffected (read the curve at whole numbers). The slider sets the prior $p_0$. With $p_0 = 1/2$ the curve passes through $1/3$, $1/5$ and $1/9$ at $k = 1, 2, 3$: each unaffected son roughly halves the odds. With a high prior even several unaffected sons leave substantial doubt; an obligate carrier ($p_0 = 1$) stays at 1 whatever her sons' phenotypes.
:::

::: application Pedigrees beyond humans
Pedigree analysis is equally important for animals and plants that cannot easily be test-crossed: endangered species in captive breeding programmes (where studbooks track ancestry to minimise inbreeding, [[conservation-biology]]), livestock and companion animals (where carriers of recessive conditions are identified from relatives' records and, increasingly, from DNA tests), and long-lived trees. The same logic of elimination and Bayesian updating applies; in breeding programmes it is often automated over thousands of related individuals.
:::

::: history
Leonard Doncaster and Gerald Raynor described sex-linked inheritance in the currant moth in 1906, and William Spillman in barred chickens in 1908, without a chromosomal explanation. Thomas Hunt Morgan reported the white-eyed male and its X-linked inheritance in *Science* in July 1910 (*Sex limited inheritance in* Drosophila). Calvin Bridges published *Non-disjunction as proof of the chromosome theory of heredity* in 1916. Murray Barr and Ewart Bertram described the sex chromatin body in 1949, and Mary Lyon proposed X inactivation in 1961 (*Gene action in the X-chromosome of the mouse*, *Nature*). The *XIST* gene was identified in 1991 by Carolyn Brown, Huntington Willard and colleagues. The pseudoautosomal region of the human X and Y was characterised in the 1980s, and the Y-linked sex-determining gene *SRY* in 1990.
:::

::: summary
- X-linked genes are transmitted from mothers to sons and from both parents to daughters; males are hemizygous. An X-linked recessive shows criss-cross inheritance and is never transmitted from father to son.
- Morgan's white-eyed *Drosophila* (1910) tied a gene to the X chromosome; Bridges' exceptional progeny from X non-disjunction (1916), confirmed cytologically, proved that genes are on chromosomes.
- Y-linked genes pass from father to all sons; Z-linked genes in birds and moths show the reverse pattern of X-linked genes.
- Dosage compensation equalises X-linked expression: random X inactivation in female mammals (Lyon hypothesis; *XIST*; mosaicism as in tortoiseshell cats), twofold upregulation of the male X in *Drosophila*, halving of both Xs in *C. elegans* hermaphrodites.
- With allele frequency $q$, an X-linked recessive trait affects a fraction $q$ of males and $q^2$ of females.
- Pedigrees are interpreted by elimination using the criteria for autosomal and X-linked dominant and recessive inheritance; one observation (an affected child of unaffected parents, father-to-son transmission) can exclude a mode.
- Bayes' theorem combines a prior genotype probability with the phenotypes of relatives: with prior $\tfrac12$ and $k$ unaffected sons the carrier probability is $1/(1+2^k)$.
:::

## Exercises

::: exercise White-eyed sons {level=1 check="1/2"}
A heterozygous red-eyed *Drosophila* female ($X^+X^w$) is crossed with a white-eyed male. What fraction of her daughters have white eyes?
::: solution
Daughters receive $X^w$ from the father and $X^+$ or $X^w$ from the mother, each with probability $\tfrac12$: half are $X^wX^w$ (white) and half $X^+X^w$ (red).
:::
:::

::: exercise Colour vision in women {level=1 check="0.0036"}
If 6 % of men in a population have an X-linked recessive colour vision deficiency, what fraction of women are expected to have it, assuming random mating?
::: solution
$q = 0.06$, so $q^2 = 0.0036$, i.e. 0.36 % of women ([[#prop-xfreq]]).
:::
:::

::: exercise Sexing chicks {level=1}
Which cross between barred and non-barred chickens allows chicks to be sexed by plumage at hatching, and why does the reciprocal cross not work?
::: solution
Non-barred cock ($Z^bZ^b$) × barred hen ($Z^BW$): sons $Z^BZ^b$ are barred, daughters $Z^bW$ are non-barred. In the reciprocal, barred cock ($Z^BZ^B$) × non-barred hen ($Z^bW$), all chicks are barred ($Z^BZ^b$ sons and $Z^BW$ daughters), so plumage does not distinguish them.
:::
:::

::: exercise A carrier's daughter {level=2 check="1/8"}
A woman's maternal uncle has haemophilia A, a rare X-linked recessive condition; her grandmother is therefore taken to be a carrier. Neither her mother nor she has any other relevant family information. What is the prior probability that the woman is a carrier, and the probability that her first son is affected?
::: solution
Her mother is a carrier with probability $\tfrac12$; if so, the woman is a carrier with probability $\tfrac12$. So $p_0 = \tfrac14$. A son is affected with probability $\tfrac14\cdot\tfrac12 = \tfrac18$. (If her mother had unaffected sons, a Bayesian correction like [[#ex-bayes]] would reduce these numbers.)
:::
:::

::: exercise Bayesian update with two sons {level=2 check="1/5"}
A woman with prior carrier probability $\tfrac12$ for an X-linked recessive allele has two unaffected sons. What is her posterior probability of being a carrier?
::: solution
$1/(1 + 2^2) = \tfrac15$ by [[#eq-bayes-carrier]].
:::
:::

::: exercise Which mode? {level=2}
For each of the following rare, fully penetrant traits, state which modes of inheritance (autosomal dominant, autosomal recessive, X-linked dominant, X-linked recessive) are excluded, and which is most likely. (a) An affected man and an unaffected woman have three affected daughters and two unaffected sons. (b) Two unaffected first cousins have two affected children out of five. (c) An affected woman and an unaffected man have an affected son, an unaffected son, an affected daughter and an unaffected daughter.
::: solution
(a) All daughters affected and no sons affected fits **X-linked dominant** inheritance exactly: the father gives his X to every daughter and to no son. Autosomal dominant inheritance is not excluded, but each child would then be affected with probability $\tfrac12$ independently of sex, and this particular split has probability $(\tfrac12)^5 = \tfrac1{32}$. Both recessive modes would require the unrelated mother to carry a rare allele, and X-linked recessive inheritance would in addition make the affected daughters $X^aX^a$ — possible only if she is a carrier, in which case some sons should be affected too. X-linked dominant is the most likely.

(b) Affected children of unaffected parents exclude dominant modes. Consanguinity points to **autosomal recessive**. X-linked recessive is excluded if any affected child is a daughter (with an unaffected father); otherwise it is possible but consanguinity would be irrelevant to it.

(c) Affected children of both sexes from an affected mother fits **autosomal dominant** and **X-linked dominant** equally well; this family cannot distinguish them. X-linked recessive is excluded by the affected daughter of an unaffected father. Autosomal recessive would require the unrelated father to be a carrier: possible but unlikely for a rare trait. Distinguishing autosomal from X-linked dominant needs affected *men*: an affected man with an affected son excludes X linkage.
:::
:::

::: exercise Tortoiseshell toms {level=2}
A tortoiseshell male cat is found. (a) What is its most likely sex-chromosome constitution, and how could it arise? (b) Why are such males usually sterile? (c) Name another way in which a male could be tortoiseshell.
::: solution
(a) $X^OX^oY$ — an XXY male, from a sperm or egg produced by non-disjunction (an $X^OY$ sperm with an $X^o$ egg, or an $X^OX^o$ egg with a Y sperm). The Y makes the cat male; the two X chromosomes, one inactivated at random in each cell, give the patches of colour.

(b) XXY males, like men with 47,XXY, usually have impaired sperm production.

(c) As a **chimera** formed by fusion of two embryos, one carrying $X^O$ and the other $X^o$ (both XY), or by a somatic mutation in the *Orange* gene early in development, producing a mosaic.
:::
:::

::: exercise Bridges' numbers {level=3}
In a cross of white-eyed females with red-eyed males, suppose primary non-disjunction of the X in the mothers occurs in 0.1 % of meioses, producing XX and O eggs in equal numbers, and that XXX and YO zygotes die. (a) What fraction of the *surviving* offspring are exceptional white-eyed females? (b) Exceptional red-eyed males? (c) Why could Bridges not have proved his hypothesis from the counts alone, and what observation clinched it?
::: solution
(a) Eggs: $X^w$ with probability 0.999, $X^wX^w$ with 0.0005, O with 0.0005. Sperm $X^+$ and Y each $\tfrac12$. Zygotes: regular daughters $X^+X^w$ $0.4995$, regular sons $X^wY$ $0.4995$; $X^+X^wX^w$ $0.00025$ (dies); $X^wX^wY$ $0.00025$ (white female); $X^+O$ $0.00025$ (red male); YO $0.00025$ (dies). Survivors total $1 - 0.0005 = 0.9995$. White-eyed exceptional females: $0.00025/0.9995 = 2.5\times10^{-4}$, about one in 4000.

(b) The same, $2.5\times10^{-4}$, so the two kinds of exception together make up about one in 2000 survivors, as Bridges observed.

(c) Rare exceptions could have other explanations, such as new mutations or contamination. The hypothesis made a non-obvious prediction about chromosomes: exceptional females should be XXY and exceptional males XO. Bridges saw these karyotypes in the microscope and also predicted and found the high rate of secondary non-disjunction in XXY females, linking genetic and cytological observations.
:::
:::

::: exercise Interpreting a large pedigree {level=3}
A rare trait occurs in a five-generation family. Of 16 affected individuals, 15 are male. Every affected male's mother is unaffected; four affected males have had children, and none of their 9 sons and 7 daughters is affected, but two of their daughters had affected sons. (a) What mode of inheritance is indicated? (b) The single affected female's father is unaffected and her mother is the sister of affected men. Suggest two genetic explanations for her phenotype. (c) What is the probability that a daughter of an affected man is a carrier, and that such a carrier's son is affected?
::: solution
(a) X-linked recessive: almost only males affected, transmission through unaffected women, no male-to-male transmission, and affected men's daughters having affected sons (the classic "grandfather to grandson through a daughter" pattern).

(b) She is probably a heterozygous carrier ($X^AX^a$) who shows the trait because of strongly skewed X inactivation, with the normal X inactive in most relevant cells. Alternatively she could carry a second, *de novo* mutant allele from her father's gamete or a chromosomal abnormality such as 45,X (a single X) or an X;autosome translocation that forces inactivation of the normal X. (Homozygosity by inheritance is excluded because her father is unaffected.)

(c) An affected man passes his single X to every daughter, so each daughter is an obligate carrier (probability 1). Each of her sons is affected with probability $\tfrac12$.
:::
:::
