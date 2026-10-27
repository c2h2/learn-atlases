By 1915 genetics had a remarkably complete formal theory. Genes were arranged in a line along chromosomes, could be mapped by recombination and changed by mutation, but nobody knew what they were made of or what they did. Over the next half century three questions were answered in turn: what genes *do* (they specify proteins, often enzymes), what they are *made of* (DNA), and how the classical gene, defined by function, mutation and recombination, corresponds to a stretch of a DNA molecule. The answers came from experiments of great elegance, many of them done with fungi, bacteria and viruses, and they turned genetics into molecular biology.

This chapter follows that path. We meet the one gene–one enzyme hypothesis and the logic of biochemical genetics, the experiments showing that DNA is the genetic material, the **complementation test** that defines a gene operationally, the kinds of **point mutation** and how they arise spontaneously or are induced, and the **fluctuation test** showing that mutations arise at random rather than in response to need. The chemistry of DNA replication, transcription and translation is treated in [[molecular-biology]]; here we keep the geneticist's point of view, in which genes are known through their mutant alleles.

## What genes do

The first hint came from medicine. In 1902 the physician Archibald Garrod, studying alkaptonuria — a rare condition in which urine darkens on standing because it contains homogentisic acid — noticed that it often occurred in children of first-cousin marriages and behaved as a Mendelian recessive. In *Inborn Errors of Metabolism* (1908) he proposed that each such condition results from the absence of a particular enzyme, so that its substrate accumulates. (The enzyme missing in alkaptonuria, homogentisate 1,2-dioxygenase, was identified in 1958.) Garrod's idea was largely ignored by geneticists for three decades.

In 1941 George Beadle and Edward Tatum turned the problem around. Instead of starting with a phenotype and looking for its biochemistry, they used X-rays to induce mutations in the bread mould *Neurospora crassa* and searched for mutants unable to make an essential nutrient. Wild-type *Neurospora* (the **prototroph**) grows on a **minimal medium** of sugar, salts and the vitamin biotin, from which it makes all its amino acids and other vitamins. Mutants that could grow only if a particular nutrient was added — **auxotrophs** — each turned out to have a single Mendelian mutation that blocked one step of a biosynthetic pathway. Because *Neurospora* is haploid for most of its life, every mutation is expressed, and a cross to wild type gives $1:1$ segregation in the spores ([[genetics/chromosomes-meiosis]]).

::: definition Prototroph, auxotroph and the one gene–one enzyme hypothesis {#def-auxotroph}
A **prototroph** can grow on minimal medium; an **auxotroph** requires a supplement that the wild type can make for itself, because a mutation has blocked its synthesis. Beadle and Tatum's **one gene–one enzyme hypothesis** states that each gene controls the synthesis of one enzyme. Its modern form is that most genes encode a single polypeptide (several polypeptides may form one enzyme), while others encode functional RNAs, such as ribosomal and transfer RNAs, that are not translated.
:::

::: example Ordering a pathway from auxotroph growth {#ex-pathway}
Adrian Srb and Norman Horowitz (1944) studied *Neurospora* mutants requiring arginine. Suppose three classes of mutants are found. Class 1 grows on minimal medium supplemented with ornithine, citrulline or arginine; class 2 grows on citrulline or arginine but not on ornithine; class 3 grows only on arginine. Each mutant has a single block. (a) Deduce the order of ornithine, citrulline and arginine in the pathway and the step blocked in each class. (b) Which intermediate would you expect to accumulate in class 2 mutants?
::: solution
(a) A mutant blocked at a given step can grow on any compound *after* the block, because it can convert that compound to the end product, but not on compounds before it. Class 3 is rescued only by arginine, so its block is in the last step, just before arginine. Class 2 is rescued by citrulline but not ornithine, so it is blocked between ornithine and citrulline. Class 1 is rescued by all three, so its block lies before ornithine. The pathway is

$$
\text{precursor} \xrightarrow{\text{class 1}} \text{ornithine} \xrightarrow{\text{class 2}} \text{citrulline} \xrightarrow{\text{class 3}} \text{arginine}.
$$

(b) Class 2 mutants cannot convert ornithine to citrulline, so ornithine (the substrate of the blocked enzyme) accumulates — the same logic as Garrod's homogentisic acid. The rule "the more compounds rescue a mutant, the earlier its block" is general.
:::
:::

## What genes are made of

That genes are made of DNA was established by experiments with bacteria and their viruses.

In 1928 Frederick Griffith, a medical officer in London, worked with two forms of the bacterium *Streptococcus pneumoniae*: a smooth (S) form with a polysaccharide capsule that caused fatal infection in mice and a rough (R) form without a capsule that did not. Heat-killed S bacteria were harmless, and so were live R bacteria; but mice injected with a mixture of the two died, and live S bacteria were recovered from them. Something from the dead S cells had **transformed** the R cells into the S form, heritably. In 1944 Oswald Avery, Colin MacLeod and Maclyn McCarty at the Rockefeller Institute purified the "transforming principle" from S-strain extracts and showed that its activity was destroyed by enzymes that degrade DNA but not by those degrading protein or RNA, and that its chemical and physical properties were those of DNA. Many scientists remained sceptical, suspecting contamination by protein.

In 1952 Alfred Hershey and Martha Chase used the bacteriophage T2, a virus of *Escherichia coli* consisting only of protein and DNA. They labelled phage protein with radioactive sulfur ($^{35}$S, found in the amino acids methionine and cysteine but not in DNA) or phage DNA with radioactive phosphorus ($^{32}$P, in the DNA backbone but not in protein), let the phage infect bacteria, and then stripped the empty phage coats from the cell surfaces by agitating the culture in a blender. Most of the $^{32}$P entered the cells and was passed on to progeny phage; most of the $^{35}$S stayed outside in the coats. The material that entered the cell and directed the making of new phage was DNA.

The next year James Watson and Francis Crick, using X-ray diffraction data obtained by Rosalind Franklin and Maurice Wilkins, proposed the double-helical structure of DNA (1953), in which complementary base pairing (A with T, G with C) immediately suggested how the molecule could be copied and how it could carry information in its sequence. In some viruses the genetic material is RNA, as was shown for tobacco mosaic virus by Heinz Fraenkel-Conrat and Beatrice Singer in 1957.

::: warning "The Hershey–Chase experiment proved by itself that DNA is the genetic material"
The experiment was strongly suggestive rather than decisive: about 20 % of the protein label also entered or stayed with the cells, and the result alone could not exclude a role for that protein. Its force came from agreement with Avery's transformation experiments, which used purified DNA, and from the structure of DNA proposed a year later, which explained how genetic information could be stored and replicated. Scientific conclusions of this importance usually rest on several independent lines of evidence, as this one did.
:::

## The gene as a unit of function: complementation

How can we tell whether two mutations with the same phenotype are in the same gene? Mapping helps but is not decisive, since two genes can be very close. The decisive test is functional.

::: definition Complementation test {#def-complementation}
Given two recessive mutations $m_1$ and $m_2$ with the same mutant phenotype, construct the **trans heterozygote**, which carries $m_1$ on one homologue and $m_2$ on the other ($m_1\ {+}/{+}\ m_2$), in a diploid or in a partial diploid of a bacterium or phage. If it has the **wild-type** phenotype, the mutations **complement** each other and are taken to be in **different genes**: each homologue supplies the function the other lacks. If it has the **mutant** phenotype, they **fail to complement** and are in the **same gene**. Mutations that fail to complement each other form a **complementation group**, which corresponds to a gene.
:::

The logic is simple. If the two mutations are in different genes, the trans heterozygote has one functional copy of each gene and is wild type (both are recessive). If they are in the same gene, neither homologue has a functional copy, and the phenotype is mutant. The **cis heterozygote** ($m_1\ m_2/{+}\ {+}$), with both mutations on one homologue and a wild-type homologue, is wild type in either case and serves as a control; for this reason the test is also called the *cis–trans* test, a term introduced by Seymour Benzer in the 1950s, who defined the unit of function it identifies as the **cistron**.

::: example Grouping mutants by complementation {#ex-complementation}
Six independently isolated recessive mutations, *1* to *6*, all give white flowers in a normally purple-flowered diploid plant. Pairwise crosses between homozygous mutant lines give F1s with the following colours (+ purple, − white):

| | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| **1** | − | + | − | + | + | − |
| **2** | | − | + | − | + | + |
| **3** | | | − | + | + | − |
| **4** | | | | − | + | + |
| **5** | | | | | − | + |
| **6** | | | | | | − |

How many genes are represented, and which mutations are in each?
::: solution
A − means failure to complement: same gene. Mutation 1 fails with 3 and 6, and 3 fails with 6, so {1, 3, 6} is one gene. Mutation 2 fails with 4: {2, 4} is a second. Mutation 5 complements all the others: {5} is a third. So three genes are involved — consistent with a three-step pigment pathway, of the kind seen in [[genetics/extensions-of-mendel#ex-sweet-pea]] for two steps. (The table must be internally consistent: if 1 and 3 failed to complement and 1 and 6 failed, but 3 and 6 complemented, something would be wrong — perhaps one mutation is a deletion spanning two genes, or shows intragenic complementation.)
:::
:::

::: warning Complementation is not recombination
The complementation test asks about *function* in one generation: does the trans heterozygote have the wild-type phenotype? Recombination asks about *transmission*: can wild-type chromosomes be recovered from it in the next generation? Two mutations in the same gene fail to complement, yet they can recombine to give a wild-type gene if they are at different sites within it. The two tests answer different questions, and confusing them leads to errors. The complementation test also requires recessive mutations: a dominant mutation gives a mutant trans heterozygote whatever the other mutation is.
:::

::: quiz
Two recessive mutations, each giving white eyes in *Drosophila*, map 0.01 cM apart. The trans heterozygote has white eyes. What can you conclude?
- [x] They are probably alleles of the same gene.
- [ ] They are in different genes, because they recombine.
- [ ] They are in different genes, because they map to different sites.
- [ ] Nothing, because the cis heterozygote has not been tested.
::: solution
Failure to complement in the trans heterozygote means that neither homologue supplies the function, so the mutations are in the same gene. Mapping to different sites only means that they alter different base pairs within it; recombination between them can still regenerate a wild-type gene. The cis heterozygote is a control (it should be wild type) but is not needed to reach the conclusion if both mutations are known to be recessive.
:::
:::

Benzer's work on the *rII* region of phage T4, from 1955 to 1961, showed how far down recombination could go. *rII* mutants form large, sharp-edged plaques on one strain of *E. coli* but cannot grow on another (strain K), so even very rare wild-type recombinants among billions of progeny phage could be detected by plating on strain K. Complementation divided the *rII* mutants into two genes, *rIIA* and *rIIB*. Within each gene, Benzer mapped thousands of mutations to hundreds of sites, the smallest non-zero recombination frequencies being about 0.01–0.02 %, which corresponds to adjacent base pairs. The gene, he concluded, is a linear array of mutable sites — the sequence of a DNA segment — and some sites (**hotspots**) mutate far more often than others.

## Point mutations

::: definition Kinds of point mutation {#def-point-mutation}
A **point mutation** changes one or a few base pairs.
- A **base substitution** replaces one base pair by another. A **transition** replaces a purine by a purine or a pyrimidine by a pyrimidine (A·T ↔ G·C); a **transversion** replaces a purine by a pyrimidine or vice versa (A·T ↔ T·A, A·T ↔ C·G, G·C ↔ C·G, G·C ↔ T·A).
- An **insertion** or **deletion** (**indel**) adds or removes base pairs.

In a protein-coding sequence, a substitution may be **synonymous** (silent: the codon still encodes the same amino acid), **missense** (a different amino acid) or **nonsense** (a stop codon, truncating the protein). An indel whose length is not a multiple of three is a **frameshift**, changing every codon downstream.
:::

Of the twelve possible substitutions from a given base, four are transitions and eight are transversions, so if all substitutions were equally likely transversions would outnumber transitions two to one. In fact transitions are more common in most genomes — in humans the ratio of transitions to transversions among single-nucleotide variants is about 2. The main reason is chemistry: cytosine deaminates spontaneously to uracil (repaired efficiently) and 5-methylcytosine, common at CpG sites in vertebrates, deaminates to thymine, which repair systems cannot so easily recognise as wrong; the result is a C·G → T·A transition. CpG sites mutate roughly ten or more times faster than other sites and are prominent hotspots.

Hermann Muller (1932) classified mutant alleles by their effect on gene activity, a scheme that remains useful: **amorphs** (complete loss of function, or **null** alleles), **hypomorphs** (reduced function), **hypermorphs** (increased function), **antimorphs** (dominant-negative alleles that antagonise the wild type) and **neomorphs** (new functions). Amorphs and hypomorphs are usually recessive; the others usually dominant ([[genetics/extensions-of-mendel]]).

::: example A frameshift and its suppression {#ex-frameshift}
A coding sequence reads `5'-ATG AAA CCC GGG TTT AAA-3'`, encoding Met–Lys–Pro–Gly–Phe–Lys. (a) What are the codons after a single-base insertion of G between the first and second codons? (b) If a single-base deletion removes the first base of the fifth codon in the mutant, what is the reading frame from there on? (c) How did Crick, Brenner and colleagues use such combinations in 1961 to show that the code is read in triplets?
::: solution
(a) The sequence becomes `ATG GAA ACC CGG GTT TAA A...`: Met–Glu–Thr–Arg–Val–stop. Every codon after the insertion is changed, and here a stop codon appears.

(b) The fifth codon of the mutant is `GTT`. Deleting its G gives `ATG GAA ACC CGG TTT AAA`: the frame is restored from codon 5 on, with only codons 2–4 altered. A protein with a few wrong amino acids may still work.

(c) Working with acridine-induced mutations in the *rIIB* gene of phage T4, they found that mutations fell into two classes, (+) and (−), such that combining a (+) with a (−) close together often restored function, as did combining three (+) or three (−) mutations — but not two of the same kind. This is exactly what is expected if mutations add or remove one base and the code is read in non-overlapping groups of three from a fixed start: three insertions shift the frame by three, restoring it. The details of the code are in [[molecular-biology]].
:::
:::

## How mutations arise

**Spontaneous mutations** arise from errors in DNA replication that escape proofreading and mismatch repair, from spontaneous chemical damage — depurination (loss of a purine base), deamination of cytosine and 5-methylcytosine, oxidative damage such as 8-oxoguanine, which pairs with adenine — and from slippage of the replication machinery in repeated sequences, which adds or removes repeat units. Some human conditions, including Huntington's disease and fragile X syndrome, result from **expansion** of trinucleotide repeats beyond a threshold length; expanded repeats are unstable and tend to grow further in transmission, which explains the earlier onset or greater severity in successive generations (anticipation) seen in some of these families. Transposable elements, which can move from place to place in the genome, are a further source of mutation; their discovery by Barbara McClintock is described in [[genetics/non-mendelian-inheritance]] and [[genomics]].

::: definition Mutation rate {#def-mutation-rate}
The **mutation rate** is the probability of a mutation per unit of replication: per base pair per cell division, per gene per generation, or per genome per generation. It is distinct from the **mutation frequency**, the proportion of mutant individuals or cells in a population, which reflects how mutants accumulate and multiply after they arise.
:::

Typical rates are about $10^{-10}$ per base pair per replication in *E. coli*, and about $1.2\times10^{-8}$ per base pair per generation in humans (as estimated by sequencing parents and children, for example by the deCODE group in Iceland in 2012 and later). Since a human genome has about $6.2\times10^9$ bp in two copies, each child carries roughly $1.2\times10^{-8}\times6.2\times10^9 \approx 70$ new point mutations not present in either parent, most of them from the father and their number rising with his age, because sperm precursors keep dividing throughout adult life. Most fall in non-coding DNA and have no detectable effect.

### The fluctuation test: mutation is random

When bacteria are exposed to a virus or an antibiotic, resistant mutants appear. Do the mutations arise *in response to* the selective agent (directed, "acquired" mutation), or do they arise at random beforehand, the agent merely revealing them? In 1943 Salvador Luria and Max Delbrück answered the question with a statistical argument, using *E. coli* and phage T1.

::: proposition The Luria–Delbrück fluctuation test {#prop-luria}
Grow many parallel cultures, each from a small inoculum, to the same final size $N$, and plate each entire culture on a medium with the selective agent.
1. If resistance were **induced** by the agent, each of the $N$ cells would become resistant independently with a small probability, so the number of resistant colonies per culture would be approximately **Poisson**, with variance equal to the mean.
2. If resistance mutations arise **at random during growth**, a mutation in an early generation produces a large clone of resistant cells (a "jackpot"), and one late produces only one or a few. The number of resistant cells per culture then has a variance much larger than its mean.
3. Under random mutation, the number of mutational *events* per culture is Poisson with mean $m$, so the proportion $p_0$ of cultures with no resistant cells satisfies $p_0 = e^{-m}$, and $m = -\ln p_0$. The mutation rate per cell per division is approximately $\mu \approx m/N$.
:::

::: proof
(1) Under induction, the number of resistant cells is a sum of $N$ independent Bernoulli($p$) trials with $N$ large and $p$ small, which is approximately Poisson with mean $Np$; its variance equals its mean. (2) Under random mutation, the number of resistant cells is the sum over mutational events of clone sizes, and the clone founded by a mutation $g$ generations before plating has $2^g$ cells; early events are rare but give huge clones, so the distribution has a long right tail and a variance far above the mean. (3) A culture grown from a few cells to $N$ cells undergoes about $N$ cell divisions in total; if each gives rise to a mutation with small probability $\mu$, independently, the number of events is approximately Poisson with mean $m = \mu N$. A culture has no resistant cells exactly when no event occurred, with probability $e^{-m}$.
:::

::: example Analysing a fluctuation test {#ex-fluctuation}
Twenty parallel cultures, each grown to $N = 2\times10^8$ cells, give the following numbers of phage-resistant colonies: nine with 0; three with 1; two with 2; one each with 3, 5, 7, 12, 30 and 107. (a) Compute the mean and variance and comment. (b) Estimate the number of mutational events per culture and the mutation rate per cell division.
::: solution
(a) The total is $3 + 4 + 3 + 5 + 7 + 12 + 30 + 107 = 171$ colonies, so the mean is $171/20 = 8.55$. The sample variance is $585.5$, about 68 times the mean. Under induced mutation (Poisson), variance and mean would be about equal; a plate count of samples from a single culture would show Poisson variation only. The enormous variance, with occasional jackpots such as 107, is what random mutation before selection predicts.

(b) $p_0 = 9/20 = 0.45$, so $m = -\ln0.45 = 0.80$ events per culture and $\mu \approx 0.80/(2\times10^8) = 4.0\times10^{-9}$ per cell per division.
:::
:::

::: widget plot
f: exp(-x)
x: 0, 4
y: 0, 1
points: 0.8, 0.45
caption: The $p_0$ method of the fluctuation test: the probability that a culture contains no mutant, $p_0 = e^{-m}$, against the mean number $m$ of mutational events per culture. The marked point is the experiment of [[#ex-fluctuation]], where 9 of 20 cultures (0.45) had no resistant cells, giving $m = 0.80$. The method is most precise when $p_0$ lies roughly between 0.1 and 0.7; if almost every culture has mutants, the curve is too flat to read.
:::

Joshua and Esther Lederberg confirmed the conclusion directly in 1952 with **replica plating**: a velvet pad pressed onto a plate of bacterial colonies transfers cells from each colony to the same position on fresh plates. Resistant colonies on the selective replicas appeared at the same positions on independent replicas, showing that the resistant cells were already present on the master plate before it was exposed to the selective agent — and they could be recovered from the master plate without ever having been exposed.

::: warning "Mutations happen when an organism needs them"
The fluctuation test and replica plating show that mutations conferring resistance arise before, and independently of, exposure to the agent that selects them. Mutation is random with respect to its usefulness: an environment can change the overall *rate* of mutation (radiation and some stresses increase it) and selection then sorts among the variants, but the environment does not direct mutations to genes where they would help. This is a cornerstone of evolutionary theory ([[evolution]]). Nor are mutations always harmful: most are neutral or nearly so, many are deleterious, and a few are beneficial in a particular environment.
:::

### Induced mutations

In 1927 Hermann Muller showed that X-rays increase the mutation rate in *Drosophila* many-fold, using a specially constructed X chromosome on which new recessive lethal mutations could be detected simply by the absence of a class of sons. Lewis Stadler showed the same in barley and maize in 1928. During the Second World War Charlotte Auerbach and J. M. Robson in Edinburgh found that mustard gas is a mutagen, the first chemical mutagen discovered (published after the war, in 1946–47). Mutagens act in a few general ways, at the level of a textbook diagram:

- **Base analogues** such as 5-bromouracil resemble normal bases closely enough to be incorporated during replication but pair ambiguously, causing transitions.
- **Alkylating agents**, such as ethyl methanesulfonate (EMS), add alkyl groups to bases; O⁶-ethylguanine tends to pair with thymine, so EMS causes mainly G·C → A·T transitions, which is why it is widely used to make mutant collections in laboratory organisms such as *Arabidopsis* and *C. elegans*.
- **Intercalating agents**, such as the acridines used by Crick and Brenner, insert between stacked bases and cause small insertions and deletions in replication — frameshifts.
- **Ultraviolet light** joins adjacent pyrimidines into dimers, and errors in their repair or bypass cause mutations; **ionising radiation** breaks DNA strands and causes deletions and rearrangements ([[genetics/chromosome-mutations]]).

::: application Detecting mutagens
Because mutation is the first step in most cancers, many substances that cause mutations also cause cancer. The **Ames test**, developed by Bruce Ames and colleagues in the early 1970s, screens chemicals for mutagenicity by measuring how often they revert *his*$^-$ auxotrophs of a laboratory strain of *Salmonella* back to prototrophy, using strains whose mutations revert only by particular kinds of change (a base substitution or a frameshift). A liver enzyme extract is added because many chemicals become mutagenic only after metabolic conversion. The test is cheap and fast, and positive results flag a compound for further study under the regulatory frameworks that govern chemical safety; it is a screen, not a proof of carcinogenicity in humans.
:::

Mutations can also be reversed. A **reverse mutation** (reversion) restores the original sequence or an equivalent one; a **suppressor mutation** restores the phenotype by a second change at another site. **Intragenic suppressors** lie in the same gene — the second frameshift of [[#ex-frameshift]] is one. **Intergenic suppressors** lie in another gene; the classic examples are mutant transfer RNA genes whose anticodon reads a nonsense codon as an amino acid, allowing translation to continue through a premature stop.

::: history
Archibald Garrod described alkaptonuria as a recessive "inborn error of metabolism" in 1902 and developed the idea in a book in 1908. Frederick Griffith reported pneumococcal transformation in 1928. Hermann Muller published *Artificial transmutation of the gene* in 1927. George Beadle and Edward Tatum's *Genetic control of biochemical reactions in* Neurospora appeared in 1941. Salvador Luria and Max Delbrück's fluctuation test was published in 1943, and Oswald Avery, Colin MacLeod and Maclyn McCarty identified the transforming principle as DNA in 1944. Alfred Hershey and Martha Chase's blender experiment was published in 1952, as was the Lederbergs' replica plating. James Watson and Francis Crick proposed the double helix in 1953, based in part on X-ray data of Rosalind Franklin and Raymond Gosling and of Maurice Wilkins. Seymour Benzer's fine-structure analysis of *rII* ran from 1955 to 1961, and Francis Crick, Leslie Barnett, Sydney Brenner and Richard Watts-Tobin's paper on the triplet nature of the code appeared in 1961.
:::

::: summary
- Genes specify proteins (Garrod; Beadle and Tatum's one gene–one enzyme, now one gene–one polypeptide or functional RNA). Auxotrophs blocked at different steps of a pathway can be ordered by which intermediates rescue them; the substrate of a blocked step accumulates.
- Genes are DNA (Avery, MacLeod and McCarty 1944; Hershey and Chase 1952; the double helix 1953); some viruses use RNA.
- The complementation test defines a gene operationally: two recessive mutations whose trans heterozygote is wild type are in different genes; failure to complement means the same gene. Complementation (function) differs from recombination (transmission).
- Benzer's *rII* mapping showed that a gene is a linear array of mutable sites down to single base pairs.
- Point mutations are transitions, transversions and indels; in coding sequence they are synonymous, missense, nonsense or frameshift. Transitions predominate, partly through deamination of 5-methylcytosine at CpG hotspots.
- Mutation rates: about $10^{-10}$ per bp per replication in *E. coli*; about $1.2\times10^{-8}$ per bp per generation in humans, giving about 70 new mutations per child.
- The Luria–Delbrück fluctuation test (variance ≫ mean; $m = -\ln p_0$) and replica plating show that mutations arise at random, not in response to need.
- Mutagens include base analogues, alkylating agents (EMS: G·C → A·T), intercalators (frameshifts), UV and ionising radiation; suppressors restore function by a second mutation.
:::

## Exercises

::: exercise Transitions or transversions? {level=1}
Classify each substitution as a transition or transversion: (a) A·T → G·C; (b) G·C → T·A; (c) C·G → T·A; (d) A·T → T·A.
::: solution
(a) Transition (purine A to purine G). (b) Transversion. (c) Transition (pyrimidine C to pyrimidine T). (d) Transversion.
:::
:::

::: exercise Expected transition fraction {level=1 check="1/3"}
If every one of the possible single-base substitutions were equally likely, what fraction of substitutions would be transitions?
::: solution
From any base there is one transition and two transversions possible, so $\tfrac13$ of substitutions would be transitions. The observed fraction in human variation is about $\tfrac23$.
:::
:::

::: exercise Mutations per child {level=1 check="74"}
Taking the human mutation rate as $1.2\times10^{-8}$ per base pair per generation and a diploid genome of $6.2\times10^9$ bp, how many new point mutations does a child carry on average (nearest whole number)?
::: solution
$1.2\times10^{-8}\times6.2\times10^9 = 74.4$, about 74 — consistent with the 60–80 found in sequencing studies, the number depending strongly on the father's age.
:::
:::

::: exercise Ordering a pathway {level=2}
Four *Neurospora* mutants (1–4) require compound G for growth. Each is tested on minimal medium supplemented with one of the compounds C, D, E, F or G (+ growth, − no growth):

| | C | D | E | F | G |
|---|---|---|---|---|---|
| 1 | − | + | − | + | + |
| 2 | − | − | − | + | + |
| 3 | − | + | + | + | + |
| 4 | − | − | − | − | + |

Give the order of the compounds in the pathway and the position of each block. Where does C fit?
::: solution
The more compounds that rescue a mutant, the earlier its block. Mutant 4 is rescued only by G (block just before G). Mutant 2 is rescued by F and G (block before F). Mutant 1 by D, F, G (block before D). Mutant 3 by E, D, F, G (block before E). So the pathway is E → D → F → G, with blocks: 3 before E, 1 between E and D, 2 between D and F, 4 between F and G. C rescues no mutant, so it is either earlier than all the blocks (before mutant 3's step) or not on the pathway at all; these data cannot tell.
:::
:::

::: exercise Complementation groups {level=2 check="2"}
Five recessive mutations, *a*–*e*, cause the same phenotype. In trans heterozygotes, *a*, *c* and *e* all fail to complement one another, *b* fails to complement *d*, and every other pair complements. How many genes are represented?
::: solution
{*a*, *c*, *e*} form one complementation group and {*b*, *d*} a second, so 2 genes are represented. Note that the test needs every pair: had *c* and *e* complemented each other while each failed with *a*, the simplest explanation would be that *a* is a deletion (or other lesion) affecting two adjacent genes.
:::
:::

::: exercise Luria–Delbrück estimate {level=2 check="1.51"}
In a fluctuation test, 11 of 50 parallel cultures have no resistant cells. Estimate the mean number of mutational events per culture (two decimal places).
::: solution
$p_0 = 11/50 = 0.22$, so $m = -\ln0.22 = 1.51$ events per culture.
:::
:::

::: exercise A nonsense or a missense? {level=2}
The codon `TGG` (Trp) mutates by a single G→A transition. What are the possible results, and of what type is each? Which mutagen of those described would most likely cause these changes?
::: solution
A G→A transition at position 2 gives `TAG` (stop) and at position 3 gives `TGA` (stop): both are nonsense mutations. (Position 1 is T, not G.) G·C → A·T transitions are the characteristic change caused by EMS, so it would be the most likely mutagen; deamination of 5-methylcytosine on the complementary strand causes the same change spontaneously.
:::
:::

::: exercise Designing the interpretation {level=3}
A student argues that the Luria–Delbrück result could be explained if bacteria became resistant on contact with phage, but with a probability that varied from culture to culture. (a) Why does this alternative not explain the data? (b) How does replica plating rule it out? (c) Suggest a modern sequencing-based test.
::: solution
(a) If cultures varied in their probability of induction, the counts would be a mixture of Poisson distributions and would show extra variance — but the cultures were grown in the same medium from the same stock and were exposed identically, so there is no reason for large culture-to-culture differences in susceptibility to induction. Moreover, the specific shape of the Luria–Delbrück distribution, including its long tail of jackpots and the relation between $p_0$ and the mean, is predicted quantitatively by the random-mutation model, and samples taken from a single culture showed only Poisson variation.

(b) Replica plating shows that resistant cells exist at fixed positions on the master plate before any exposure, and can be recovered from it without exposure. Induction on contact cannot produce resistant cells that were never in contact with the agent.

(c) Sequence the resistance gene in single colonies from replicate cultures and in samples taken before selection. Under random mutation, cultures with jackpots will contain the same mutation in many resistant cells (one clone), different cultures will carry different mutations, and the mutation should be detectable at low frequency before exposure by deep sequencing.
:::
:::

::: exercise Recombination within a gene {level=3 check="0.002"}
Suppose a gene 2500 bp long has a total map length of 5 map units (5 % recombination between mutations at its two ends), and recombination is uniform along it and additive over such short distances. (a) What recombination frequency, in %, would you expect between mutations at adjacent base pairs? (b) Benzer's smallest measured recombination frequencies within *rII* were about 0.01–0.02 %. Why could he detect such rare events in phage, when in *Drosophila* frequencies below about 0.1 % are hard to measure?
::: solution
(a) $5\ \%/2500 = 0.002\ \%$ per base pair, i.e. $2\times10^{-5}$. On this estimate, Benzer's smallest values correspond to roughly 5–10 bp; given that recombination is not uniform, they are consistent with mutations at adjacent or nearly adjacent base pairs, the limit of resolution set by the DNA sequence itself.

(b) Only wild-type recombinant phage can grow on *E. coli* strain K, so a single plate selects them from among $10^8$ or more progeny phage, and frequencies down to about $10^{-8}$ can be measured. In *Drosophila*, every fly must be raised and scored by eye, so samples are limited to thousands or tens of thousands; selective systems like Benzer's are what make fine-structure mapping possible.
:::
:::
