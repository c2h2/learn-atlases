In 1945 almost nobody thought that bacteria had genes in the same sense as peas and flies. They reproduce by binary fission, show no meiosis and have no visible chromosomes; their heredity seemed a matter of vague "adaptation". Within fifteen years bacteria and their viruses had become the organisms of choice for genetics. Their genes could be mapped, mutations in them could be selected from among billions of cells in a single dish, and the first systems of gene regulation were worked out in them. The reasons are practical: an *E. coli* culture doubles every 20–30 minutes in rich medium and reaches $10^9$ cells per millilitre, bacteria are haploid so every mutation is expressed, and with selective media one can find a single recombinant among a hundred million parents.

This chapter describes how genes move between bacteria — by **transformation**, **conjugation** and **transduction** — and how each of these processes was used to map genes; the genetics of bacteriophages; and the use of partial diploids for complementation and regulatory analysis. Throughout, the organisms are laboratory strains, and the description stays at the level of principles: the methods of handling microorganisms belong to a supervised teaching laboratory, and the medical side of bacterial genetics to [Medicine Atlas](/learn/medicine/course.php?c=microbiology). The biology of microbes as organisms is the subject of [[microbiology]].

## Bacterial genomes, phenotypes and notation

The genome of *E. coli* K-12, the laboratory strain used in most classical work, is a single circular chromosome of $4.64\times10^6$ bp carrying about 4300 protein-coding genes. Many bacteria also carry **plasmids**: small, usually circular DNA molecules that replicate independently of the chromosome and carry genes that are useful in some environments but not essential, such as genes for resistance to antibiotics or heavy metals, for the use of unusual nutrients, or for transfer of DNA to other cells.

Bacterial genes are named with three lower-case italic letters and an upper-case letter for the particular gene, such as *lacZ*, *lacY* and *trpA*; the protein is written with an initial capital and in roman type, LacZ. Phenotypes are written in roman type with an initial capital: Lac$^+$ (able to use lactose), Lac$^-$, Str$^\mathrm{r}$ (resistant to streptomycin), Str$^\mathrm{s}$ (sensitive). Genotypes take the same superscripts in italic: a *lacZ*$^-$ mutant is Lac$^-$. Auxotrophs ([[genetics/genes-and-mutation#def-auxotroph]]) are named after the nutrient they need: a *his*$^-$ strain requires histidine.

The key experimental tool is the **selective medium**, on which only cells of a particular phenotype can grow. Minimal medium selects prototrophs; medium containing an antibiotic selects resistant cells; a medium with lactose as sole carbon source selects Lac$^+$ cells. Combined with replica plating ([[genetics/genes-and-mutation]]), selection allows a few recombinant cells among $10^8$ parents to be found and counted.

::: definition Modes of gene transfer in bacteria {#def-transfer}
Bacteria do not fuse whole genomes. Instead a fragment of DNA from a **donor** enters a **recipient**, which becomes a temporary **partial diploid** (merozygote) for the transferred region. The three modes of entry are:
- **transformation**: uptake of free DNA from the surroundings;
- **conjugation**: transfer of DNA through direct contact between cells, directed by a conjugative plasmid;
- **transduction**: transfer of bacterial DNA packaged by mistake inside a bacteriophage particle.

The donor fragment (exogenote) is incorporated into the recipient's chromosome (endogenote) by homologous recombination. Because a linear fragment must be joined to a circular chromosome without breaking it, incorporation requires an **even number of crossovers**, one on each side of the incorporated marker; unincorporated linear DNA is degraded.
:::

::: intuition Bacterial recombination counts crossovers in pairs
In a diploid eukaryote, any odd number of crossovers between two loci makes the products recombinant. In a bacterium receiving a linear fragment, a single crossover would open the circular chromosome into a line, which the cell cannot maintain; viable recombinants need two crossovers (or four, or six) between the fragment and the chromosome. A donor marker gets into the recipient's chromosome only if one crossover falls on each side of it, and two donor markers are inherited together only if no crossover falls between them. The frequency with which two markers are co-inherited therefore measures how close they are.
:::

## Conjugation

In 1946 Joshua Lederberg and Edward Tatum mixed two different multiple auxotrophs of *E. coli* K-12 — one requiring threonine, leucine and thiamine, the other biotin, phenylalanine and cysteine — and plated them on minimal medium. Neither strain could grow alone, and reversion of all three mutations in one strain would be vanishingly rare; yet prototrophic colonies appeared at a frequency of about $10^{-7}$. Bernard Davis showed in 1950 that no prototrophs formed if the strains were grown on two sides of a U-shaped tube separated by a filter that let medium but not cells pass: transfer required contact between cells.

::: definition The F factor, Hfr strains and F′ plasmids {#def-f-factor}
William Hayes, Luca Cavalli-Sforza and the Lederbergs showed in the early 1950s that transfer is one-way and controlled by a plasmid, the **fertility factor F**. F$^+$ cells carry F and act as donors; F$^-$ cells lack it and act as recipients. In an F$^+$ × F$^-$ mating, F is copied and transferred, so the recipient becomes F$^+$, but chromosomal genes are rarely transferred. In an **Hfr** (high frequency of recombination) strain, F has integrated into the bacterial chromosome by recombination; transfer then starts within the integrated F at the **origin of transfer** and proceeds into the chromosome, carrying chromosomal genes linearly in a fixed order. An **F′ plasmid** is an F factor that, on excision from an Hfr chromosome, has taken a segment of chromosomal DNA with it; a cell receiving it is a stable partial diploid for that segment.
:::

Transfer of a whole Hfr chromosome takes about 100 minutes at 37 °C, but mating pairs usually break apart well before then, so genes near the origin are transferred to many recipients and genes far from it to few. Recipients rarely receive the part of F at the end of the transferred strand and so usually remain F$^-$.

Élie Wollman and François Jacob exploited this in the **interrupted-mating** experiments of 1955–57. They mixed Hfr and F$^-$ cells, took samples at intervals, separated the mating pairs by violent agitation in a kitchen blender and plated the samples on media selecting recombinants for each donor marker in turn (while killing the Hfr donor with an antibiotic to which the recipient was resistant). Each donor gene first appeared among recombinants at a characteristic **time of entry**, and the frequency of recombinants for each gene then rose to a plateau that was lower the later the gene entered.

::: proposition Time-of-entry mapping {#prop-time-of-entry}
In an Hfr × F$^-$ cross, donor genes enter the recipient in a fixed linear order determined by the position and orientation of the integrated F, at a constant speed. The time of first entry of a gene measures its distance from the origin of transfer, and the difference between entry times of two genes measures their distance on the chromosome. The *E. coli* chromosome map is accordingly measured in **minutes**, 100 minutes for the whole circle, one minute corresponding on average to about 46 kb.
:::

::: example An interrupted-mating experiment {#ex-interrupted}
An Hfr strain that is Str$^\mathrm{s}$ and carries the wild-type alleles *azi*$^\mathrm{s}$ (sensitive to sodium azide), *ton*$^\mathrm{s}$ (sensitive to phage T1), *lac*$^+$ and *gal*$^+$, as well as markers *thr*$^+$ *leu*$^+$, is mated with an F$^-$ strain that is Str$^\mathrm{r}$, *thr*$^-$ *leu*$^-$ *azi*$^\mathrm{r}$ *ton*$^\mathrm{r}$ *lac*$^-$ *gal*$^-$. Recombinants are selected as Thr$^+$ Leu$^+$ Str$^\mathrm{r}$ (*thr* and *leu* enter first), and the samples interrupted at different times are scored for the unselected donor markers. The percentage of selected recombinants carrying each donor allele is:

| Time (min) | *azi*$^\mathrm{s}$ | *ton*$^\mathrm{s}$ | *lac*$^+$ | *gal*$^+$ |
|---|---|---|---|---|
| 5 | 0 | 0 | 0 | 0 |
| 10 | 12 | 3 | 0 | 0 |
| 15 | 70 | 31 | 0 | 0 |
| 20 | 88 | 70 | 16 | 0 |
| 30 | 91 | 80 | 38 | 21 |
| 60 | 91 | 80 | 40 | 25 |

Give the order of the genes and estimate their entry times and spacing.
::: solution
The genes appear in the order *azi*, *ton*, *lac*, *gal*, and extrapolating each rising curve back to zero gives entry times of roughly 9, 10–11, 18 and 25 minutes. So the order from the origin is (*thr leu*) – *azi* – *ton* – *lac* – *gal*, with *azi*–*ton* about 2 minutes, *ton*–*lac* about 7 and *lac*–*gal* about 7. The plateaus fall (91, 80, 40, 25 %) because spontaneous breakage of mating pairs makes later genes less likely to be transferred at all: this **gradient of transfer** itself gives an approximate order even without interruption. Selection for the early markers *thr* and *leu* ensures that every scored cell actually mated; the streptomycin kills the donors.
:::
:::

::: widget plot
f: 91*(1 - exp(-(x - 9)/3))*H(x - 9); 80*(1 - exp(-(x - 11)/4))*H(x - 11); 40*(1 - exp(-(x - 18)/4))*H(x - 18); 25*(1 - exp(-(x - 25)/3))*H(x - 25)
x: 0, 60
y: 0, 100
labels: azi; ton; lac; gal
caption: A stylised model of the interrupted-mating curves of [[#ex-interrupted]]: the percentage of selected recombinants that carry each donor marker against the time (in minutes) at which mating was interrupted. Each curve starts at its gene's entry time (9, 11, 18 and 25 min) and rises to a plateau. Notice two separate pieces of information: the entry times give the map order and spacing, and the falling plateau heights show the gradient of transfer, since fewer mating pairs survive long enough to transfer late genes.
:::

Different Hfr strains, in which F has integrated at different sites and in different orientations, transfer the chromosome from different origins and in either direction. The gene orders they give overlap in a way that is consistent only with a **circular** chromosome — the first evidence, in 1957, that the *E. coli* chromosome is a circle.

::: example Assembling the circle {#ex-circle}
Four Hfr strains transfer genes in the following orders (each list starts with the first gene transferred):

- Hfr 1: *thr leu azi ton pro lac*
- Hfr 2: *pro ton azi leu thr thi*
- Hfr 3: *his trp gal lac pro ton*
- Hfr 4: *thi met str his trp gal*

Construct the map.
::: solution
Hfr 1 gives the segment *thr–leu–azi–ton–pro–lac*. Hfr 2 runs *pro–ton–azi–leu–thr* (the same segment in the opposite direction) and continues to *thi*, so *thi* lies beyond *thr*. Hfr 3 gives *his–trp–gal–lac–pro–ton*, so *gal*, *trp* and *his* lie beyond *lac*. Hfr 4 gives *thi–met–str–his–trp–gal*, which joins the *thi* end to the *his* end. The genes form a closed circle:

*thr – leu – azi – ton – pro – lac – gal – trp – his – str – met – thi* – (back to *thr*).

Hfr 1 and 3 transfer clockwise in this listing; Hfr 2 and 4 anticlockwise.
:::
:::

An F′ plasmid makes a cell diploid for part of its genome, which allows complementation and dominance tests in bacteria. The most famous use was by François Jacob and Jacques Monod, who in 1959–61 constructed partial diploids for the *lac* genes. The repressor gene *lacI* acted in *trans*: a wild-type *lacI*$^+$ on either copy made both copies inducible. The operator mutation *lacO*$^\mathrm{c}$ acted only in *cis*: it made constitutive only the *lacZ* gene on the same DNA molecule. These **cis–trans** observations — the logic of [[genetics/genes-and-mutation#def-complementation]] applied to regulation — led to the operon model, described in [[molecular-biology]].

::: quiz
In a partial diploid of genotype *lacO*$^\mathrm{c}$ *lacZ*$^-$ / F′ *lacO*$^+$ *lacZ*$^+$ (with *lacI*$^+$ present), how is β-galactosidase synthesised?
- [ ] Constitutively, because *lacO*$^\mathrm{c}$ is dominant
- [x] Only in the presence of an inducer
- [ ] Not at all
- [ ] Constitutively on one copy and inducibly on the other
::: solution
The only functional *lacZ* gene is next to a wild-type operator, which the repressor binds unless inducer is present. The *lacO*$^\mathrm{c}$ mutation affects only the gene on its own DNA molecule (it is *cis*-dominant), and that gene is *lacZ*$^-$, so whatever it makes is inactive. Synthesis of active enzyme is therefore inducible.
:::
:::

## Transduction

In 1952 Norton Zinder and Joshua Lederberg, looking for conjugation in *Salmonella enterica* serovar Typhimurium (laboratory strain LT2), found instead that genes were carried between strains by the bacteriophage P22 even through a filter that stopped cells — a new mode of transfer, **transduction**.

::: definition Generalised and specialised transduction {#def-transduction}
In **generalised transduction**, a phage that packages DNA into its head by filling it to capacity ("headful packaging") occasionally packages a fragment of the host chromosome instead of its own DNA, after the host chromosome has been broken up during infection. The resulting **transducing particle** can inject the fragment into a new host, where it may be incorporated by recombination. Any host gene can be transduced, with about equal probability. In **specialised transduction**, a temperate phage that integrates at a particular site in the host chromosome (as a **prophage**) occasionally excises imprecisely and takes with it host genes adjacent to its integration site — for phage λ of *E. coli*, the *gal* or *bio* genes — so that only those genes can be transduced.
:::

The phage P1 of *E. coli* packages about 100 kb, roughly 2 minutes of the chromosome. Two genes can be **cotransduced** — carried into the same recipient by one particle — only if they lie within this distance; the closer they are, the more often they are carried and incorporated together.

::: proposition Wu's formula for cotransduction {#prop-wu}
If transducing fragments have a fixed length $L$ and their end points fall at random on the chromosome, and recombination is otherwise uniform, the frequency $C$ with which a selected marker is accompanied by an unselected marker at distance $d \le L$ is approximately

$$
C = \left(1 - \frac{d}{L}\right)^3 .
$$ {#eq-wu}

$C = 1$ when the markers coincide and $C = 0$ for $d \ge L$. (T. T. Wu, 1966; the cube results from the requirement that both markers be on the fragment and that no crossover separate them.)
:::

The formula is an idealisation, but it fits P1 data well enough to convert cotransduction frequencies into distances in minutes, and it shows why cotransduction falls steeply at first: two markers half a fragment-length apart are cotransduced in only $(\tfrac12)^3 = 12.5\ \%$ of selected transductants.

::: widget plot
f: (1 - x/L)^3*H(L - x)
x: 0, 3
y: 0, 1
sliders: L=2:1:3:0.1
caption: Wu's formula [[#eq-wu]]: the cotransduction frequency of two markers against the distance between them in minutes, for transducing fragments of length $L$ minutes (about 2 for phage P1). The curve falls steeply and reaches zero at $d = L$: markers farther apart than one fragment are never cotransduced. Read off the distance for a measured frequency of 0.4 — about 0.53 min when $L = 2$.
:::

::: example Gene order by three-factor transduction {#ex-transduction}
P1 grown on an *a*$^+$ *b*$^+$ *c*$^+$ strain is used to transduce an *a*$^-$ *b*$^-$ *c*$^-$ strain. Of 100 transductants selected as *a*$^+$, the unselected markers are: *b*$^+$ *c*$^+$ 45, *b*$^+$ *c*$^-$ 20, *b*$^-$ *c*$^-$ 34, *b*$^-$ *c*$^+$ 1. (a) What are the cotransduction frequencies of *b* and *c* with *a*? (b) What is the gene order? (c) Estimate the distances with Wu's formula, taking $L = 2$ min.
::: solution
(a) *a*–*b*: $(45 + 20)/100 = 0.65$. *a*–*c*: $(45 + 1)/100 = 0.46$.

(b) *b* is closer to *a* than *c* is. To decide whether the order is *a*–*b*–*c* or *b*–*a*–*c*, look at the rarest class, *a*$^+$ *b*$^-$ *c*$^+$. If *b* lies between *a* and *c*, this class needs four crossovers (two to bring in *a*$^+$, two more to exclude *b*$^+$ while including *c*$^+$), so it should be very rare — as observed (1 of 100). If *a* were in the middle, *a*$^+$ *b*$^-$ *c*$^+$ would need only two crossovers and would not be the rarest class. So the order is *a*–*b*–*c*.

(c) *a*–*b*: $d = 2(1 - 0.65^{1/3}) = 2(1 - 0.866) = 0.27$ min. *a*–*c*: $d = 2(1 - 0.46^{1/3}) = 2(1 - 0.772) = 0.46$ min. So *b*–*c* is about 0.19 min. The rare-class argument is the same as the double-crossover argument of the three-point cross in [[genetics/linkage-mapping#alg-three-point]], with crossovers counted in pairs.
:::
:::

## Transformation

Natural transformation, discovered by Griffith in pneumococci and shown by Avery and his colleagues to be due to DNA ([[genetics/genes-and-mutation]]), occurs in a minority of bacterial species — *Bacillus subtilis*, *Haemophilus influenzae*, *Streptococcus pneumoniae* and *Neisseria* species among them — that can enter a physiological state of **competence**, in which they bind DNA fragments from their surroundings, take up one strand and incorporate it by recombination. The fragments taken up are typically of the order of 10–20 kb, so **cotransformation** of two markers, like cotransduction, shows that they are very close. Bacteria that are not naturally competent, including *E. coli*, can be made to take up DNA in the laboratory by chemical treatment or brief electric pulses; this is the basis of molecular cloning with harmless laboratory strains ([[biotechnology]]).

In transformation, the frequency with which a single marker is transferred rises in proportion to DNA concentration (at low concentrations), whereas the frequency of independent double transformants — two markers on separate fragments — rises as the square. Two markers that are cotransformed at a frequency proportional to the DNA concentration must therefore be on the *same* fragment, i.e. linked.

## The genetics of bacteriophages

Phage mutants can be scored by the appearance of their **plaques** — clear zones where phage have killed the bacteria in a lawn — or by their host range. Max Delbrück and Alfred Hershey showed in 1946–49 that when a bacterium is infected simultaneously with two phage mutants, recombinant phage appear among the progeny.

::: example A phage cross {#ex-phage-cross}
*E. coli* cells are infected at high multiplicity with both T2 *h r*$^+$ (host-range mutant, normal plaques) and T2 *h*$^+$ *r* (normal host range, rapid-lysis plaques). The progeny phage are plated on a mixed lawn on which all four genotypes can be distinguished, and 1000 plaques are classified: *h r*$^+$ 420, *h*$^+$ *r* 405, *h*$^+$ *r*$^+$ 90, *h r* 85. What is the recombination frequency between *h* and *r*, and what is special about recombination in phage?
::: solution
The recombinants are *h*$^+$ *r*$^+$ and *h r*: $(90 + 85)/1000 = 0.175$, i.e. 17.5 % (17.5 map units). Phage recombination differs from meiosis in that it takes place in a pool of many replicating phage chromosomes within one cell, which pair and recombine repeatedly and at random over several rounds; recombination frequencies therefore reflect population-level mixing rather than one exchange event, and maps from phage crosses are constructed in the same additive way as other maps but need care in interpretation. Phage crosses are also the basis of Benzer's fine-structure mapping ([[genetics/genes-and-mutation]]).
:::
:::

**Temperate** phages such as λ can either multiply and lyse the host (the **lytic** cycle) or integrate into the host chromosome as a prophage and be replicated with it (**lysogeny**), until some signal induces them to excise and enter the lytic cycle. André Lwoff characterised lysogeny in *Bacillus megaterium* in 1950, and Esther Lederberg discovered phage λ in *E. coli* K-12 in 1951. The genetic switch that decides between lysis and lysogeny became one of the best-understood regulatory circuits in biology ([[systems-biology]]).

::: application Horizontal gene transfer and antibiotic resistance
Conjugation, transduction and transformation also operate in nature, where they move genes between strains and even between species — **horizontal gene transfer**. Plasmids carrying genes for resistance to several antibiotics at once were found in *Shigella* in Japan in the late 1950s, and the spread of such plasmids among bacterial populations is a central reason why antibiotic resistance has become a global public-health problem. Understanding the genetics of transfer underpins surveillance, prudent antibiotic use and the containment rules that govern work with microorganisms; the clinical aspects are treated in [Medicine Atlas](/learn/medicine/course.php?c=infectious-diseases). Comparative genomics shows that a substantial fraction of the genes of many bacterial genomes were acquired horizontally ([[genomics]]).
:::

::: history
Joshua Lederberg and Edward Tatum reported genetic recombination in *E. coli* K-12 in 1946, and Bernard Davis showed in 1950 that it requires cell contact. William Hayes (1952–53) discovered the one-way transfer controlled by the F factor, and Luca Cavalli-Sforza isolated the first Hfr strain (1950). Max Delbrück and William Bailey, and Alfred Hershey, reported phage recombination in 1946; Hershey and Raquel Rotman mapped T2 mutants in 1948–49. André Lwoff described lysogeny in 1950, Esther Lederberg discovered λ in 1951, and Norton Zinder and Joshua Lederberg discovered transduction in 1952. Élie Wollman and François Jacob performed interrupted-mating experiments from 1955 and reported the circularity of the *E. coli* map in 1957; Larry Morse and Esther and Joshua Lederberg described specialised transduction by λ in 1956. Arthur Pardee, Jacob and Monod published the "PaJaMo" experiment in 1959 and Jacob and Monod the operon model in 1961. Lederberg, Beadle and Tatum shared the 1958 Nobel Prize in Physiology or Medicine.
:::

::: summary
- Bacteria are haploid, multiply fast and can be screened by selective media; genes are named *lacZ* (gene), LacZ (protein), Lac$^+$ (phenotype).
- DNA enters a recipient by transformation (free DNA), conjugation (cell contact, plasmid-directed) or transduction (phage particles); recombination into the circular chromosome needs an even number of crossovers.
- F$^+$ cells transfer F; Hfr cells, with F integrated, transfer chromosomal genes in a fixed order from an origin. Interrupted mating gives times of entry (map in minutes, 100 min for *E. coli*); overlapping Hfr orders revealed a circular chromosome. F′ plasmids create partial diploids for complementation and cis–trans tests, as in the *lac* operon.
- Generalised transduction (P1, P22) can carry any gene within a fragment of about 2 min; cotransduction frequency $C \approx (1 - d/L)^3$ (Wu). Specialised transduction (λ) carries genes next to the prophage site. In three-factor crosses, the rarest class (four crossovers) identifies the middle marker.
- Cotransformation of markers at a frequency proportional to DNA concentration shows that they are on one fragment.
- Phage crosses in mixed infections give recombinant progeny; temperate phages can integrate as prophages (lysogeny).
- Horizontal gene transfer spreads resistance and other traits in nature.
:::

## Exercises

::: exercise Minutes to kilobases {level=1 check="232"}
Taking the *E. coli* chromosome as $4.64\times10^6$ bp and 100 minutes, how many kilobases correspond to 5 minutes of map?
::: solution
$4.64\times10^6/100 = 46{,}400$ bp per minute, so 5 minutes is $232{,}000$ bp $= 232$ kb.
:::
:::

::: exercise Which mode of transfer? {level=1}
For each observation, name the mode of gene transfer: (a) transfer is prevented by a filter that stops cells but not phage particles, and is not affected by DNase; (b) transfer is prevented by adding DNase to the medium; (c) transfer passes through a filter that stops cells and is not affected by DNase.
::: solution
(a) Conjugation (needs contact; DNA is protected inside cells). (b) Transformation (free DNA is degraded by DNase). (c) Transduction (phage particles pass the filter and protect the DNA in their heads).
:::
:::

::: exercise Recombination in a phage cross {level=1 check="0.12"}
A cross of phage *a b*$^+$ × *a*$^+$ *b* gives 1000 progeny, of which 61 are *a*$^+$ *b*$^+$ and 59 are *a b*. What is the recombination frequency?
::: solution
$(61 + 59)/1000 = 0.12$.
:::
:::

::: exercise Converting a cotransduction frequency {level=2 check="0.53"}
Two markers are cotransduced by P1 at a frequency of 0.40. Using Wu's formula with $L = 2$ min, estimate their distance in minutes (two decimal places).
::: solution
$0.40 = (1 - d/2)^3$, so $1 - d/2 = 0.40^{1/3} = 0.737$ and $d = 2(1 - 0.737) = 0.53$ min.
:::
:::

::: exercise Hfr orientation {level=2}
An Hfr strain transfers *pro* first, then *lac* at 8 min and *gal* at 16 min. A second Hfr transfers *gal* first, *lac* at 8 min and *pro* at 16 min. What can you say about the positions and orientations of F in the two strains?
::: solution
Both strains transfer the same segment, *pro*–*lac*–*gal*, with the same spacing, but in opposite directions. In the first, F is integrated just before *pro* on the side away from *lac*, oriented to transfer towards *lac*; in the second, F is integrated just beyond *gal*, oriented to transfer towards *lac*. Integration occurs by recombination between F and one of several insertion-sequence elements scattered in the chromosome, so different Hfr strains have different origins and directions.
:::
:::

::: exercise Ordering by cotransduction {level=2}
In P1 transductions, *x* and *y* are cotransduced at 0.60, *y* and *z* at 0.30, and *x* and *z* at 0.05. What is the most likely order? Check the distances with Wu's formula ($L = 2$ min).
::: solution
The two most rarely cotransduced markers are at the ends: *x*–*y*–*z*. Distances: *x*–*y*: $2(1 - 0.6^{1/3}) = 0.31$ min; *y*–*z*: $2(1 - 0.3^{1/3}) = 0.66$ min; *x*–*z*: $2(1 - 0.05^{1/3}) = 1.26$ min. The sum $0.31 + 0.66 = 0.97$ is less than 1.26; given the crudeness of the formula and sampling error in small frequencies, the order is still clear, but the distances show that Wu's formula is only approximately additive in practice.
:::
:::

::: exercise A merodiploid analysis {level=2}
For each partial diploid, say whether active β-galactosidase is made constitutively, only with inducer, or not at all: (a) *lacI*$^-$ *lacZ*$^+$ / F′ *lacI*$^+$ *lacZ*$^+$; (b) *lacI*$^+$ *lacO*$^\mathrm{c}$ *lacZ*$^+$ / F′ *lacI*$^+$ *lacO*$^+$ *lacZ*$^-$; (c) *lacI*$^-$ *lacZ*$^-$ / F′ *lacI*$^-$ *lacZ*$^+$.
::: solution
(a) Inducible: the wild-type repressor from the F′ acts in *trans* and represses both copies; *lacI*$^+$ is dominant to *lacI*$^-$. (b) Constitutive: the functional *lacZ*$^+$ is next to the operator-constitutive mutation, to which repressor cannot bind; *lacO*$^\mathrm{c}$ is *cis*-dominant. (c) Constitutive: no functional repressor is made by either copy, so the *lacZ*$^+$ on the F′ is expressed all the time.
:::
:::

::: exercise Interpreting a gradient {level=3}
In an uninterrupted Hfr × F$^-$ cross, recombinants for five donor markers are found at the following frequencies (per 100 Hfr cells): *a* 22, *b* 0.8, *c* 9, *d* 3.5, *e* 0.2. Selection was for each marker separately. (a) Propose an order of transfer. (b) Why does the frequency fall roughly geometrically with time of entry? (c) What other factor besides time of entry could make a particular marker unexpectedly rare among recombinants?
::: solution
(a) Ranking by frequency, *a* (22) > *c* (9) > *d* (3.5) > *b* (0.8) > *e* (0.2): order of transfer *a*–*c*–*d*–*b*–*e*.

(b) If mating pairs break apart at a constant rate per minute, the probability that a pair is still connected after time $t$ is $e^{-kt}$; the fraction of recipients receiving a marker therefore falls exponentially with its time of entry, i.e. geometrically with distance from the origin. Each successive marker loses a similar factor if markers are evenly spaced.

(c) The efficiency of incorporation by recombination can vary between regions, for example near the end of the transferred fragment (where there may be no room for a second crossover on the far side) or where the recipient carries a deletion or rearrangement in the region. Selection also matters: a marker whose donor allele reduces growth on the selective medium will be under-represented.
:::
:::

::: exercise Designing a mapping strategy {level=3}
A new recessive mutation *new*$^-$ in *E. coli* K-12 causes a nutritional requirement. Outline, in principle, how you would locate it on the chromosome, first roughly and then precisely, using the methods of this chapter.
::: solution
Roughly: cross a set of Hfr strains with different, known origins to an F$^-$ *new*$^-$ recipient carrying a counter-selectable resistance marker, select prototrophs for the requirement, and see which Hfr strains transfer *new*$^+$ early. Interrupted mating with the best Hfr gives the time of entry to within a minute or two, placing *new* between known markers. Precisely: use P1 transduction from strains carrying known markers in that interval; measure cotransduction of *new*$^+$ with each, convert frequencies to distances with Wu's formula, and order *new* relative to its neighbours by three-factor crosses using the rare-class argument. Finally, complementation with F′ plasmids or cloned DNA fragments identifies the gene, which can then be sequenced. (In current practice whole-genome sequencing of the mutant often finds the mutation directly, and the genetic mapping serves as confirmation.)
:::
:::
