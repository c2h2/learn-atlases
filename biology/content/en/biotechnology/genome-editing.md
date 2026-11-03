Adding a gene to a cell, as in [[biotechnology/recombinant-dna]], leaves the genome it came with intact. **Editing** means changing the genome itself: disrupting a gene where it sits, correcting a single base, replacing one allele with another, deleting a regulatory element. Until about 2010 this was possible routinely only in organisms whose homologous recombination machinery would cooperate — budding yeast, the moss *Physcomitrella*, and mouse embryonic stem cells, in which Mario Capecchi, Martin Evans and Oliver Smithies developed gene targeting in the 1980s (Nobel Prize in Physiology or Medicine, 2007). In most cells a targeting construct integrated at the right place in perhaps one cell in $10^{5}$ to $10^{6}$, so the experiment was possible only where enormous numbers of cells could be selected.

What changed was the realisation that the cell will do the work if you break the DNA for it. Maria Jasin's laboratory showed in the mid-1990s that a targeted double-strand break raised the frequency of homologous recombination at that site by orders of magnitude, because the break recruits the repair machinery to exactly the place the experimenter cares about. Every modern editing tool is a solution to the same problem that follows from this: how to make a programmable nuclease that cuts, or nicks, one chosen sequence in a genome of billions of base pairs. This chapter covers the four generations of such tools, the repair processes that decide what the edit actually is, the quantitative question of specificity, and the newer editors that avoid breaking the DNA at all. The underlying repair biochemistry is in [[molecular-biology/dna-repair-recombination]]; the basics of Cas9 as a laboratory reagent are in [[molecular-biology/molecular-tools]], which this chapter assumes; the use of editing in crops is [[biotechnology/agricultural-biotechnology]], in therapy is Medicine Atlas (/learn/medicine/), and its governance is [[biotechnology/biosafety-ethics]].

## The edit is made by the cell, not by the nuclease

::: definition Programmable nuclease editing {#def-editing}
A **programmable nuclease** is a protein, or a protein–RNA complex, that can be directed to cleave a chosen DNA sequence. Editing consists of two separable steps: **targeted cleavage**, which the nuclease performs, and **repair**, which the cell performs. The outcome is therefore determined by which repair pathway acts, not by the nuclease:

- **Non-homologous end joining** (NHEJ) rejoins the broken ends directly. It is active throughout the cell cycle and is the dominant pathway in most cells. Rejoining is usually accurate, but a proportion of events lose or gain a few base pairs, giving a distribution of small **indels** at the cut site. In a coding sequence, those that are not multiples of three cause a frameshift, so NHEJ is the route to a **knockout**.
- **Microhomology-mediated end joining** (MMEJ) uses short (2–20 bp) direct repeats flanking the break, giving characteristic deletions between them. Because the microhomologies are predictable from the sequence, the indel spectrum at a given target is partly predictable — different guides at the same gene give reproducibly different outcome distributions.
- **Homology-directed repair** (HDR) copies a template with homology to the two sides of the break. Supply an artificial template and any designed change can be installed: a point mutation, a tag, a whole cassette. HDR requires a sister chromatid or an exogenous donor and is largely restricted to S and G2 phase, so it is inefficient in slowly dividing or non-dividing cells and typically much rarer than NHEJ at the same site.
:::

That division explains the characteristic frustrations of the field. Knocking a gene out is easy, because the abundant pathway does it. Making a precise change is hard, because the rare pathway does it, and the abundant pathway competes by destroying the site. Much of the methodological work since 2013 has been directed at this asymmetry — suppressing NHEJ, timing delivery to S phase, redesigning donors, and ultimately avoiding the double-strand break altogether.

::: example How many edited cells, and how many useful ones? {#ex-knockout}
A guide cuts both alleles of an autosomal gene in 70 % of alleles in a population of cells; of the NHEJ products, indel lengths are distributed such that two thirds are not multiples of three. Assume the two alleles are edited independently. (a) What fraction of alleles is a null? (b) What fraction of cells is a complete knockout? (c) What fraction retains at least one functional allele, and why does that matter for interpreting a phenotype? (d) If instead HDR installs a designed point mutation in 5 % of alleles, what fraction of cells is homozygous for it?
::: solution
(a) $0.70\times\tfrac23 = 0.467$.

(b) Both alleles null: $0.467^{2} = 0.218$, about 22 % of cells.

(c) $1 - 0.218 = 0.782$. Four cells in five still make some protein, so a measurement on the bulk population dilutes the knockout phenotype by a factor of about five and may show nothing at all. It also means a bulk population is a mixture of genotypes — unedited, heterozygous, and various indel combinations — so phenotypes must be assigned using clonal lines, and several independent clones compared to separate the effect of the edit from clonal variation.

(d) $0.05^{2} = 0.0025$, one cell in 400 — and that is why precise editing is done by screening clones, or with selection, rather than in bulk. Note also that a cell can be heterozygous for the designed change *and* carry an NHEJ indel on the other allele, which looks like a homozygote in a phenotype assay and is not one; genotyping must read both alleles.
:::
:::

## Four generations of targeting

### Meganucleases

The first targeted breaks used natural **homing endonucleases** such as I-SceI from yeast mitochondria, which recognise sites of 18–24 bp — long enough to be unique in a genome. The specificity is excellent and the programmability almost nil: recognition is spread across a large protein–DNA interface rather than carried by modular units, so retargeting means redesigning the whole protein. Engineered meganucleases are still used where an extremely clean single site matters, but they did not generalise.

### Zinc-finger nucleases

The Cys₂His₂ **zinc finger** is a small DNA-binding module, about 30 residues around a zinc ion, that contacts roughly three base pairs through a few residues of its recognition helix. Fingers can be strung together, so a three-finger array recognises about 9 bp and a four-finger array about 12. Fusing such an array to the catalytic domain of the nuclease FokI gives a **zinc-finger nuclease** (ZFN); FokI must dimerise to cut, so two ZFNs are designed to bind opposite strands a few base pairs apart, and the paired requirement doubles the recognised sequence to 18–24 bp and improves specificity. Using FokI variants that can only heterodimerise suppresses cutting by either protein with itself.

ZFNs made targeted editing possible in flies, plants, zebrafish and human cells from about 2001 onwards, and the first clinical trials of genome editing used them. But designing an array for an arbitrary sequence proved unreliable: the three-base "code" of individual fingers is not strictly modular, because neighbouring fingers influence each other's specificity, so arrays had to be selected empirically for each target.

### TALENs

In 2009 Jens Boch and Ulla Bonas, and independently Matthew Moscou and Adam Bogdanove, cracked the recognition code of the **transcription activator-like effector** (TALE) proteins that the plant pathogen *Xanthomonas* injects into host cells. A TALE's DNA-binding region is a tandem array of near-identical 33–35 residue repeats, and each repeat contacts **one** base pair, specified by two variable residues (the repeat-variable di-residue): NI for A, HD for C, NG for T, and NN for G (also binding A). The code is one repeat per base and, unlike zinc fingers, close to genuinely modular.

Fusing an array of 15–20 repeats to FokI gives a **TALEN**, again used in pairs. TALENs can be designed for almost any sequence — subject to a preference for a thymine immediately 5′ of the target — and are highly specific. Their drawbacks are practical: the repeats are long, nearly identical and therefore awkward to assemble and to deliver (a TALEN pair is some 3 kb of coding sequence), and they remain proteins, so each new target needs a new protein.

### CRISPR–Cas nucleases

The decisive change was to move specificity from protein to RNA. Cas9 of *Streptococcus pyogenes*, loaded with a guide RNA carrying a 20-nucleotide spacer, cuts double-stranded DNA next to a `5'-NGG-3'` protospacer-adjacent motif (PAM), making a blunt break three base pairs from the PAM; the mechanism, the PAM's role in self–non-self discrimination and the history are given in [[molecular-biology/molecular-tools]]. Retargeting requires only a new 20-nucleotide sequence, which is why the technique spread across biology within a year of the 2012 and 2013 papers.

The family is large and the differences matter:

| nuclease | PAM | cut | notes |
|---|---|---|---|
| SpCas9 (*S. pyogenes*) | `NGG` | blunt, 3 bp from PAM | the standard; ~1370 residues |
| SaCas9 (*S. aureus*) | `NNGRRT` | blunt | smaller, fits more easily into a viral delivery vector |
| Cas12a / Cpf1 | `TTTV` | staggered, with 5′ overhangs | one short crRNA, no tracrRNA; T-rich PAM complements Cas9's G-rich one |
| engineered SpCas9 variants | `NG`, `NRN`, nearly PAM-less | blunt | wider targeting range, often at some cost in specificity |
| Cas13 | — (RNA target) | RNA cleavage | targets transcripts, not the genome; collateral RNA cleavage in some systems |
| dCas9 (catalytically dead) | `NGG` | none | binds without cutting: used to repress, activate or image loci |

::: proposition Target density and the reach of a PAM {#prop-pam}
In random DNA with equal base frequencies, a given position begins an `NGG` with probability $1/16$ on one strand, so counting both strands a PAM occurs on average every 8 bp. The probability that a window of $w$ base pairs contains no usable PAM on either strand is $(1 - 1/16)^{2w}$: for $w = 60$ this is $4.3\times10^{-4}$, so a 60 bp stretch almost always contains a target, and the practical question is not whether a target exists but which of the several available ones is best.

Cas9 cuts 3 bp from the PAM, so the reachable cut positions are determined by PAM positions. If an edit must be installed at a precise base — a point mutation by HDR, or a base within a base editor's narrow window — the requirement is much more demanding than "a PAM somewhere nearby", and it is the commonest reason a particular desired edit cannot be made with a particular enzyme. Alternative PAMs (Cas12a's `TTTV`, engineered near-PAM-less variants) exist mainly to relieve this constraint; real genomes, with unequal base composition and repeats, deviate from the random calculation in both directions.
:::

::: example Can this base be reached? {#ex-reach}
A base editor acts only on bases falling at positions 4–8 of the 20-nucleotide protospacer, and a protospacer is fixed relative to its PAM. (a) For one chosen base pair in random DNA, what is the probability that some `NGG` PAM places it inside the window? Count both strands, since a C•G pair presents an editable C on one strand or the other. (b) How does this change with a window of positions 3–9, or with an engineered variant recognising `NG`? (c) Contrast with the number of PAMs in a 60 bp stretch, and explain why the two calculations give such different impressions.
::: solution
(a) If the target base is to sit at protospacer position $p$, the PAM must begin exactly $21-p$ bases downstream of it. There are 5 admissible values of $p$ and 2 strands, so 10 specific positions, each carrying an `NGG` with probability $1/16$. Treating them as independent,

$$
P = 1 - (1 - 1/16)^{10} = 1 - 0.9375^{10} = 0.48 .
$$

Less than half of base pairs in the genome can be reached at all.

(b) Widening the window to seven positions gives 14 trials and $P = 0.60$. An `NG` PAM has probability $1/4$ per position, and $1-(3/4)^{10} = 0.94$: relaxing the PAM is far more powerful than widening the window, which is why engineering PAM recognition has been pursued so hard.

(c) A 60 bp stretch contains on average $2\times60/16 = 7.5$ PAMs, so a *gene* is always targetable — that is the calculation behind knockouts, where any cut in an early exon will do. Reaching a *specified base pair* requires a PAM at one of ten exact positions, which fails more than half the time. The same PAM density supports an easy problem and a hard one, and quoting "a PAM every 8 bp" without saying which problem is meant is the source of much confusion.
:::
:::

## Specificity: how wrong can a guide be?

A 20-nucleotide guide specifies far more information than a genome contains, so exact off-target matches are essentially impossible — and yet off-target cutting is real, because Cas9 tolerates mismatches, especially at the PAM-distal end of the guide.

::: proposition Counting near-matches {#prop-offtarget}
The number of 20-mers differing from a given 20-mer in exactly $k$ positions is $\binom{20}{k}3^{k}$, and the number differing in at most $k$ positions is $\sum_{j=0}^{k}\binom{20}{j}3^{j}$:

| $k$ | exactly $k$ | at most $k$ | expected sites in $6.2\times10^{9}$ bp |
|---|---|---|---|
| 0 | 1 | 1 | $3.5\times10^{-4}$ |
| 1 | 60 | 61 | 0.02 |
| 2 | 1,710 | 1,771 | 0.6 |
| 3 | 30,780 | 32,551 | 11 |
| 4 | 392,445 | 424,996 | 150 |

The last column takes the probability that a given position carries a specified 20-mer followed by `GG` as $4^{-22} = 5.7\times10^{-14}$ and multiplies by the number of positions in a human genome.

So a guide unique for exact matches typically has of order ten sites in the genome within three mismatches and a hundred or more within four. Whether those sites are actually cut depends on **where** the mismatches fall: mismatches in the 8–12 nucleotides nearest the PAM (the seed) usually abolish cleavage, while two or three at the PAM-distal end often do not. This positional dependence is why off-target prediction is done with scoring schemes fitted to measured cleavage data rather than by counting mismatches, and why the counts above are an upper bound on the sites that matter rather than an estimate of them.

The calculation assumes random, independent bases. Real genomes contain paralogous gene families, segmental duplications and repeats, so a guide placed in a repetitive region may have dozens of near-perfect off-targets, and the genome must be searched explicitly.
:::

::: widget plot
f: 6.2e9*(1/4)^22*sum(binom(20,k)*3^k, k, 0, floor(x))
x: 0, 4.9
y: 0, 160
labels: \text{expected sites within } k \text{ mismatches}
caption: The expected number of sites in a $6.2\times10^{9}$ bp random genome lying within $k$ mismatches of a 20-nucleotide guide and followed by `GG`, from [[#prop-offtarget]]. The curve is a staircase because $k$ is an integer: read the value at $k = 0, 1, 2, 3, 4$. Each extra mismatch allowed multiplies the count by roughly fifteen, so specificity is lost very quickly as tolerance rises — and Cas9's real tolerance depends on where the mismatches sit, not only on how many there are.
:::

Three ways of improving specificity follow from the mechanism. **High-fidelity Cas9 variants** carry substitutions that weaken non-specific protein–DNA contacts, so that the enzyme needs more of the guide's binding energy to cut and mismatched sites fall below threshold. **Paired nickases** use a Cas9 mutated in one nuclease domain, which only nicks; two nickases on opposite strands produce a staggered break, and since a single nick is repaired without indels, cutting requires two independent near-matches at the right spacing. **Transient delivery** of pre-assembled protein–RNA complex, rather than a plasmid that expresses the nuclease for days, limits the time during which off-target cutting can accumulate — on-target editing saturates faster than off-target editing does.

### Measuring outcomes, and what cannot be measured

On-target outcomes are read by amplifying the target region and sequencing it deeply: the distribution of indels, the fraction of alleles edited, and the fraction carrying a designed change are all read directly from the reads. Off-target discovery is harder, and no method establishes absence. Genome-wide approaches fall into two classes: **biochemical** methods, which treat purified genomic DNA with the nuclease in vitro and sequence the cut ends, giving high sensitivity but many sites that are never cut in a living cell with its chromatin; and **cell-based** methods, which capture breaks in living cells, for example by trapping a short donor oligonucleotide at the break, giving physiologically relevant but less sensitive results.

::: example How deep must you sequence? {#ex-depth}
You want to detect editing at a candidate off-target site occurring in 0.1 % of alleles. (a) Treating reads at that site as independent with probability $0.001$ of carrying the edit, how many reads give a 95 % chance of seeing at least three edited reads? (b) Why is "at least three" the sensible criterion rather than "at least one"? (c) Your assay returns zero edited reads in 10,000. What may you conclude?
::: solution
(a) The number of edited reads is approximately Poisson with mean $m = 0.001N$. We need $P(X\ge3) \ge 0.95$, that is $P(X\le2) \le 0.05$. At $m = 5$ ($N = 5000$), $P(X\ge3) = 0.875$; at $m = 10$ ($N = 10\,000$), $P(X\ge3) = 0.997$. Interpolating, $m \approx 6.3$, so about **6500 reads** suffice; 10,000 is a comfortable choice.

(b) Because high-throughput sequencing has an intrinsic error rate per base of roughly $10^{-3}$, and PCR adds further errors. A single read bearing an apparent one-base indel is far more likely to be an artefact than an edit, so a detection threshold must sit above the noise; three or more independent reads with the *same* indel at the *same* position is the usual minimum, and the background is measured on unedited control samples rather than assumed.

(c) That editing at this site is below roughly 0.1 % — the limit of what this experiment could see — not that it is absent. With $N = 10\,000$ and zero observed, the upper 95 % bound on the frequency is about $3/10\,000 = 3\times10^{-4}$. Claims of "no detectable off-target editing" always mean "none above the detection limit of the assay used", and the limit should be stated.
:::
:::

::: widget distribution
dist: poisson
params: lambda=6.3
a: 0
b: 2
caption: The number of edited reads expected at a site edited in 0.1 % of alleles when 6300 reads are collected, treated as Poisson with mean $\lambda = 6.3$. The shaded region is 0, 1 or 2 reads — the outcomes that would fall below a three-read detection threshold and be scored as "not detected", here about 5 % of the time. Slide $\lambda$ down to see how quickly a shallower experiment becomes blind: at $\lambda = 2$ (2000 reads) the assay misses a real 0.1 % event two times in three.
:::

::: warning "No off-target edits were found" is not the same as "the genome is otherwise unchanged"
Mismatch-tolerant cleavage elsewhere in the genome is only one of the ways editing changes a cell, and concentrating on it can hide the others. At the on-target site itself, a double-strand break can produce large deletions of hundreds or thousands of base pairs, inversions, duplications, loss of heterozygosity over a long stretch of the chromosome, and — if two breaks are made at once — translocations between them. Cutting can trigger a p53-dependent arrest, so the cells that grow out are enriched for those with a weakened damage response. A short PCR amplicon across the cut site is blind to all of this: it cannot amplify an allele that has lost a primer site, so large deletions and whole-chromosome losses are scored as unedited or simply disappear from the data. Characterising an edited line properly means long-range PCR or long-read sequencing across the locus, karyotype or copy-number analysis, and comparison of several independent clones.
:::

## Editing without a double-strand break

If the double-strand break is the source of both the imprecision and the collateral damage, the obvious move is to do without it. Two classes of editor achieve this by fusing a catalytically disabled Cas9 to an enzyme that chemically alters DNA at the site where it binds.

::: definition Base editors {#def-base-editor}
A **base editor** is a fusion of a Cas9 nickase, or a catalytically dead Cas9, to a single-strand DNA-modifying enzyme. When the complex binds, the displaced non-target strand is exposed as single-stranded DNA within a short **editing window**, typically positions 4–8 of the protospacer, and the enzyme acts on bases there.

- **Cytosine base editors** (CBEs; Alexis Komor, David Liu and colleagues, 2016) use a cytidine deaminase to convert C to uracil, which is read as T at replication, giving a C•G → T•A transition. A uracil glycosylase inhibitor is included in the fusion to stop the cell excising the uracil and restoring the original base.
- **Adenine base editors** (ABEs; Nicole Gaudelli, Liu and colleagues, 2017) use a laboratory-evolved deoxyadenosine deaminase, derived from a tRNA-editing enzyme, to convert A to inosine, read as G, giving an A•T → G•C transition.

Together these make the four transitions. They make no transversions (newer C-to-G and A-to-C editors address this with different glycosylase and deaminase combinations) and cannot insert or delete. Because no double-strand break is made, indels and translocations are rare, and the editors work in non-dividing cells where HDR does not.

The characteristic limitation is the **bystander edit**: every editable base within the window is a substrate, so a target cytosine with another cytosine two positions away will often give a doubly edited product. Guides are chosen to place the target in the window and competitors outside it; where that is impossible, deaminases with narrowed windows or altered sequence preference are used.
:::

::: example Bystander arithmetic {#ex-bystander}
A cytosine base editor's window contains the target C and one bystander C. Each is deaminated independently with probability 0.6. (a) What fraction of alleles carries the intended edit and nothing else? (b) What fraction is edited at the target at all? (c) If the bystander C is a synonymous third position in a codon, does it matter? (d) A second guide places the bystander outside the window but the target at position 9, where the editing efficiency is 0.15. Which guide would you use, and what would you need to know?
::: solution
(a) $0.6\times(1-0.6) = 0.24$.

(b) $0.6$ — but two thirds of those alleles also carry the bystander edit.

(c) It depends entirely on what the experiment is for. If you are modelling a specific disease-associated variant, a second change in the same allele destroys the interpretation whether or not it alters the protein, since a synonymous change can still alter splicing, mRNA stability or translation rate. If you are inactivating a gene, the bystander is irrelevant. State which case you are in before optimising.

(d) The second guide gives $0.15$ clean edits against $0.24$ for the first, so on these numbers the first guide is better *if* a mixed population is acceptable and the clean alleles can be identified by sequencing clones. What you need to know is whether you are screening clones (where the fraction only sets how many you screen: at 15 % you need about 20 clones for a 95 % chance of several clean ones) or using the population directly (where purity matters more than efficiency). The decision is set by the downstream use, not by the larger number.
:::
:::

::: definition Prime editing {#def-prime-editing}
A **prime editor** (Andrew Anzalone, David Liu and colleagues, 2019) fuses a Cas9 nickase to a reverse transcriptase and is guided by a **prime editing guide RNA** (pegRNA) with three functional parts: a spacer that directs the complex, a **primer binding site** complementary to the nicked strand, and a **reverse transcription template** carrying the desired new sequence. The nicked 3′ end anneals to the primer binding site and the reverse transcriptase extends it, copying the template into DNA, so the new sequence is written as a 3′ flap. Resolution of the flap — excision of the competing original flap and ligation, followed by resolution of the resulting mismatch — installs the edit.

Prime editing can make any substitution, including transversions, and small insertions and deletions of up to tens of base pairs, without a double-strand break or a donor template. Its efficiency is lower and more sequence-dependent than base editing, and depends strongly on the cell's mismatch repair, which recognises the heteroduplex intermediate and often reverts it; transiently inhibiting that pathway raises efficiency substantially. A variant design nicks the unedited strand as well, biasing repair towards the edited one at the cost of some indel formation. Paired prime editors can install larger insertions and deletions, including whole cassettes at a chosen site.
:::

The three classes now form a hierarchy of invasiveness: a nuclease plus NHEJ for knockouts, base editing for transitions, prime editing for arbitrary small changes, HDR for large insertions, and the choice is made against the edit required rather than from preference.

::: quiz
You need to convert a single G•C base pair to A•T in a population of non-dividing primary cells, with no indels, and no second change within 30 bp. Which approach fits best?
- [ ] Cas9 with a donor template for HDR.
- [x] A cytosine base editor, with a guide placing the target C in the window and no other C nearby.
- [ ] Cas9 with two guides flanking the base, to delete and replace the region.
- [ ] A TALEN pair with an HDR donor.
::: solution
The base change G•C → A•T is a transition and is exactly what a cytosine base editor makes (reading the C on whichever strand carries it). It needs no double-strand break, so indels are rare, and it does not require replication — which is decisive here, because both HDR options depend on homologous recombination and are therefore nearly inert in non-dividing cells, whatever nuclease creates the break. The two-guide deletion both breaks the DNA twice and removes sequence. The one requirement to check is the bystander: the guide must place the target in the editing window with no other editable cytosine there.
:::
:::

## Delivery is the real constraint

In cultured cells, the editing machinery can be introduced as a plasmid, as mRNA plus guide, or as a pre-assembled protein–RNA complex, and the choice mainly trades efficiency against duration of exposure. Everywhere else, delivery dominates. Editing a population of cells outside the body and returning them is tractable because the cells can be handled, selected and characterised; editing cells in place requires a vehicle that reaches the right tissue, enters enough cells, releases its cargo, and does not provoke a damaging response — and the cargo is large (SpCas9 alone is about 4.1 kb of coding sequence, which strains the capacity of the small viral vectors with the best safety record). Lipid nanoparticles carrying mRNA, which express transiently and are naturally taken up by the liver, and adeno-associated viral vectors, which persist, are the two main routes as of 2026. The clinical dimension of all this belongs to Medicine Atlas.

For organisms rather than cells, the editing reagents are delivered into zygotes or into cells that will be regenerated into a whole organism — the route taken for edited crops ([[biotechnology/agricultural-biotechnology]]) and for model animals. Editing in the germ line of an organism makes the change heritable, which is a biological fact about any sexually reproducing species and an ethical and legal question in humans; it is taken up in [[biotechnology/biosafety-ethics]].

::: application What editing is actually used for
The bulk of genome editing is research. A knockout made in a week where a mouse line once took two years; allelic series at a locus to test which variant does what; tagging a protein at its endogenous locus so its expression is normal; dCas9 fused to repressors, activators or fluorophores to control or image a gene without changing its sequence; and pooled screens, in which a library of tens of thousands of guides is introduced into a population and the guides enriched or depleted under a selection identify the genes involved ([[genomics/functional-genomics]]). In agriculture, editing has produced crops with altered oil composition, delayed browning, disease resistance and modified flowering, in some jurisdictions under a lighter regulatory regime than transgenic plants because no foreign DNA remains. In medicine, editing of a patient's own blood stem cells outside the body was approved in 2023 for sickle-cell disease and β-thalassaemia, and in vivo editing of liver targets has entered trials; these are clinical matters and belong to Medicine Atlas. And in **gene drives**, editing machinery is designed to copy itself into the homologous chromosome in the germ line, so that it spreads through a wild population faster than Mendelian inheritance would allow — a prospect for controlling disease vectors and invasive species whose governance is unresolved and which is discussed in [[biotechnology/biosafety-ethics]] and [[conservation-biology/invasions-climate]].
:::

::: history
Gene targeting by homologous recombination in mouse embryonic stem cells was established by Mario Capecchi, Martin Evans and Oliver Smithies through the 1980s (Nobel Prize 2007). In 1994 and 1996 Maria Jasin's laboratory showed that a site-specific double-strand break, made by the yeast meganuclease I-SceI, stimulated homologous recombination at that site by several orders of magnitude — the observation on which all later editing rests. Yang-Gyun Kim, Jin-Soo Kim and Srinivasan Chandrasegaran fused zinc fingers to the FokI nuclease domain in 1996, and Dana Carroll's and Matthew Porteus's laboratories used zinc-finger nucleases for targeted editing in *Drosophila* and human cells from 2001 to 2005. The TALE recognition code was deciphered by Jens Boch and Ulla Bonas and by Matthew Moscou and Adam Bogdanove in 2009, and TALENs followed within two years. In 2012 Martin Jinek, Krzysztof Chylinski, Emmanuelle Charpentier, Jennifer Doudna and colleagues showed that Cas9 could be programmed with a guide RNA; in early 2013 the laboratories of Feng Zhang and George Church, and others, edited human cells with it, and within a year it had been applied across eukaryotes. Base editors came from David Liu's laboratory in 2016 (cytosine, Alexis Komor) and 2017 (adenine, Nicole Gaudelli), and prime editing from the same laboratory in 2019 (Andrew Anzalone). Charpentier and Doudna received the 2020 Nobel Prize in Chemistry. The birth in 2018 of twins from embryos edited without adequate justification or oversight was condemned internationally and led to the governance reviews discussed in [[biotechnology/biosafety-ethics]].
:::

::: summary
- Editing is targeted cleavage (by the nuclease) followed by repair (by the cell). NHEJ gives indels and hence knockouts; MMEJ gives microhomology-defined deletions; HDR installs designed changes from a template but is restricted to dividing cells and is much rarer.
- The four generations are meganucleases (specific, barely programmable), zinc-finger nucleases (~3 bp per finger, FokI dimer, imperfectly modular), TALENs (one repeat per base, modular, bulky) and CRISPR–Cas (specificity carried by a guide RNA, hence trivially retargetable).
- `NGG` PAMs occur every ~8 bp counting both strands, so finding a target is easy; placing a cut at a *specified* base is the real constraint, and alternative or relaxed PAMs exist to relieve it.
- Near-matches number $\binom{20}{k}3^{k}$ at $k$ mismatches, giving of order 10 genomic sites within three mismatches ([[#prop-offtarget]]); whether they are cut depends on mismatch position. High-fidelity variants, paired nickases and transient delivery raise specificity.
- Off-target assays have detection limits; a negative result bounds the frequency rather than excluding it. On-target large deletions, loss of heterozygosity, translocations and selection for a weakened damage response are missed entirely by short amplicon sequencing.
- Base editors make the four transitions within a narrow window without a double-strand break, with bystander edits as the main limitation; prime editors write arbitrary short sequences from a pegRNA template, with lower efficiency and a strong dependence on mismatch repair.
- Delivery, not nuclease design, now limits most applications outside cultured cells.
:::

## Exercises

::: exercise Null alleles {level=1 check="0.4"}
A guide edits 60 % of alleles, and two thirds of the indels cause a frameshift. What fraction of alleles is a null?
::: solution
$0.60\times2/3 = 0.40$.
:::
:::

::: exercise Mismatch counting {level=1 check="1710"}
How many 20-nucleotide sequences differ from a given one in exactly two positions?
::: solution
Choose the two positions, $\binom{20}{2} = 190$ ways, and change each to one of three other bases: $190\times3^{2} = 1710$.
:::
:::

::: exercise Which tool? {level=1}
Name the most appropriate approach for each, in one line: (a) knock out a gene in a cell line; (b) install a known single-nucleotide transition in non-dividing cells; (c) insert a 2 kb reporter cassette at a gene's stop codon; (d) repress a gene without changing its sequence.
::: solution
(a) Cas9 with a guide in an early exon, relying on NHEJ indels. (b) A base editor of the appropriate class, since HDR is unavailable without replication. (c) Cas9 with an HDR donor carrying homology arms, in dividing cells, with selection — a cassette of this size is beyond base and prime editors in routine use. (d) dCas9 fused to a repressor domain, targeted to the promoter (CRISPR interference), which is reversible and leaves the genome intact.
:::
:::

::: exercise Biallelic knockouts {level=2 check="0.09"}
Editing efficiency is 50 % of alleles and 60 % of edits are frameshifts. What fraction of cells is a complete knockout, assuming independent alleles? Give two decimal places.
::: solution
Per allele $0.50\times0.60 = 0.30$; both alleles $0.30^{2} = 0.09$. To obtain knockout clones you would therefore screen about a dozen clones to be reasonably sure of several. (Independence is an idealisation: a cell that cuts one allele efficiently often cuts the other, which raises the homozygote frequency above the independent prediction.)
:::
:::

::: exercise Paired nickases {level=2}
Explain quantitatively why two nickases at a site give better specificity than one nuclease, and state the cost. If each guide has 10 near-match sites in the genome, roughly how many off-target *breaks* would the pair be expected to produce?
::: solution
A single nick is repaired by the cell without indels, so an editing event requires nicks on both strands at an appropriate spacing, which requires both guides to bind near-matches *at the same place and in the correct relative orientation and spacing*. If the two guides' off-target sites are independently distributed, the chance that one of each falls within the required few tens of base pairs of the other is the product of two small numbers: with 10 sites each in $6\times10^{9}$ bp and a permissive window of, say, 50 bp, the expected number of coincidences is about $10\times10\times50/6\times10^{9} \approx 10^{-6}$ — effectively zero. The costs are a doubling of the design constraint (two targets of the right spacing and orientation must exist), generally lower on-target efficiency, and the fact that single nicks, while usually harmless, are not entirely so: nicks encountered by a replication fork can become double-strand breaks.
:::
:::

::: exercise Detection limit {level=2 check="0.0006"}
An off-target assay returns zero edited reads among 5000. What is the approximate upper 95 % bound on the editing frequency at that site?
::: solution
Zero events with Poisson mean $m$ has probability $e^{-m}$, which is 0.05 at $m = 3.0$. So the data are consistent with a mean of up to about 3 events, that is a frequency of $3/5000 = 6\times10^{-4}$. The experiment therefore excludes editing above about 0.06 %, and says nothing below it.
:::
:::

::: exercise Reading an indel spectrum {level=2}
Amplicon sequencing of an edited population gives: 38 % unmodified, 22 % with a 1 bp insertion, 17 % with a 4 bp deletion, 11 % with a 7 bp deletion, 8 % with a 3 bp deletion, 4 % other. (a) What fraction of alleles is frameshifted? (b) The 4 bp deletion removes exactly the sequence between two 3 bp direct repeats flanking the cut. What does this indicate? (c) The gene's protein is reduced to 55 % in the bulk population. Is that consistent with (a)?
::: solution
(a) Frameshifts are the events whose length change is not a multiple of three: 22 + 17 + 11 = 50 %. The 3 bp deletion is in frame (it may still abolish function, but it is not a frameshift) and the 4 % "other" is unassignable without the sequences.

(b) It is the signature of microhomology-mediated end joining, which uses short flanking repeats to align the ends. Because the microhomologies are determined by the sequence around the cut, this particular deletion is reproducible — the same guide in the same gene gives the same dominant product in different experiments, which is why outcome prediction from sequence is possible at all.

(c) Roughly, yes. If 50 % of alleles are null and the remainder (including the in-frame deletion) make protein, the expected level is about 50 %, close to the measured 55 %. Agreement at this level is weak evidence, though: it would also be consistent with 60 % null alleles plus protein persisting from before editing, and a definitive answer requires clonal lines.
:::
:::

::: exercise Base editor window and codons {level=3}
A pathogenic allele arises from a C•G → T•A change; you wish to reverse it with an adenine base editor acting on the A of the mutant A•T pair. Within the 20 nt protospacer that places this A at position 6, there are two other adenines, at positions 5 and 12. The per-position editing efficiencies are 0.55 at position 5, 0.60 at 6 and 0.05 at 12. (a) What fraction of alleles carries the intended edit alone? (b) The adenine at position 5 lies in an intron 3 bp from a splice acceptor site. Why does this change the calculation's significance? (c) Suggest two ways forward.
::: solution
(a) Treating the three positions as independent: $0.60\times(1-0.55)\times(1-0.05) = 0.26$.

(b) Because a bystander edit in a splice site is not a harmless silent change: altering a base 3 bp from an acceptor can abolish or shift splicing, so the 74 % of edited alleles that also carry the position-5 edit are not merely impure, they may be functionally worse than the allele you set out to correct. Purity, not efficiency, is the governing quantity.

(c) Choose a different guide — shifting the protospacer by a few base pairs, if another PAM permits, moves position 5 out of the window; or use a base editor with a narrowed editing window, or one whose deaminase has a sequence preference disfavouring the bystander's context. Failing both, prime editing installs the single intended change with no window at all, at lower efficiency, which is acceptable if clones are being screened. In every case the edited alleles must be sequenced over the whole amplicon, and the splicing of the transcript checked directly.
:::
:::

::: exercise What the amplicon cannot see {level=3}
Two guides are used together to delete a 500 bp element. A 600 bp amplicon spanning the region shows 45 % of reads with the expected deletion and 55 % unmodified, and a clone chosen as "homozygous deleted" shows only the deletion band. Long-read sequencing later reveals that one chromosome carries a 12 kb deletion. (a) Why did the amplicon assay miss it? (b) How could the clone have appeared homozygous? (c) Design a minimal set of assays that would have caught it, and say what each adds.
::: solution
(a) A 12 kb deletion removes at least one of the two primer binding sites, so that allele cannot be amplified; PCR reports only the alleles it can amplify, and the missing one is invisible rather than counted as absent. This is **allele dropout**, and it systematically biases editing data towards small, clean outcomes.

(b) If the other chromosome carried the intended 500 bp deletion and the 12 kb allele dropped out, every read came from the intended allele and the clone appeared homozygous. A heterozygote has been misclassified as a homozygote — and the undetected allele has lost 12 kb of sequence, possibly including neighbouring genes.

(c) Minimally: (i) long-range PCR with primers several kilobases outside the cut sites, or long-read sequencing across the locus, which detects large deletions and inversions and would have shown the 12 kb allele; (ii) a copy-number measurement (quantitative PCR of a sequence within the deleted span, or shallow whole-genome sequencing) to count how many copies of the region remain, which catches losses too large even for long-range PCR; (iii) genotyping of several independent clones, which distinguishes a reproducible consequence of the edit from one clone's accident. For work where the integrity of the genome matters, whole-genome sequencing of the final clone against its parent is now the standard answer.
:::
:::

::: exercise Choosing between two guides {level=3}
Guide A cuts 80 % of alleles and has, by prediction, three off-target sites with two mismatches, all in intergenic regions. Guide B cuts 35 % and has one off-target site with three mismatches, inside the coding sequence of a gene in the same family as the target. (a) Which would you use for a bulk screen of a cell population, and which for making a cell line to be used for ten years? (b) What experiment distinguishes them properly? (c) Why is the "same family" detail important?
::: solution
(a) For a bulk screen, efficiency matters most and a confounding effect must merely be improbable: guide A, with the caveat that intergenic cuts are not automatically harmless (a cut could remove an enhancer). For a long-lived line, the single off-target of guide B is the greater worry if it hits a paralogue — but so is the fact that A has three sites with only two mismatches, which Cas9 tolerates more readily than three. The honest answer is to use both, independently, and require that the phenotype agrees; agreement between two guides with different off-target profiles is the strongest routine evidence that a phenotype is on-target.

(b) Measure, rather than predict: amplicon sequencing of the predicted sites in the edited cells, a genome-wide off-target assay, and — definitively for a line that will be used for years — whole-genome sequencing of the clone and its parent. Add a rescue: re-expressing the target gene from a guide-resistant construct should reverse the phenotype.

(c) Because a paralogue in the same family is likely to share sequence with the target *and* to have a related function, so an off-target edit in it would produce a phenotype resembling the one you expect, rather than an obvious artefact. Off-target effects that mimic the intended result are the hardest to detect and the most likely to be believed.
:::
:::
