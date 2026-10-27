Molecular biology became an experimental science of genes, rather than a theory about them, when a handful of enzymes and physical methods let people cut DNA at chosen places, join pieces together, multiply them, read their sequence and see where they were expressed. Almost all of these tools were borrowed from nature. Restriction enzymes come from bacteria defending themselves against phages, ligases and polymerases from DNA replication, reverse transcriptase from retroviruses, green fluorescent protein from a jellyfish, and Cas9 from the adaptive immune system of bacteria. Each was understood first as biology and became a tool afterwards.

This chapter explains how each tool works and what it measures. It covers restriction enzymes and restriction mapping, gel electrophoresis, cloning, the polymerase chain reaction and its arithmetic, sequencing, blotting and hybridisation, reporter genes, and genome editing with CRISPR–Cas9. The treatment is conceptual and quantitative, at the level of a teaching laboratory that cuts, amplifies and sequences harmless DNA. Production methods, synthetic biology and the regulation of genetic engineering are taken further in [[biotechnology/recombinant-dna]], [[biotechnology/genome-editing]] and [[biotechnology/biosafety-ethics]].

## Restriction enzymes

In the early 1950s Salvador Luria and Mary Human, and Giuseppe Bertani and Jean Weigle, noticed that a phage grown on one strain of bacterium often grew poorly on another. A few phages that did succeed then grew well on the new strain, but only until they were passed through the old one again. Werner Arber explained this **host-controlled restriction and modification** in the 1960s. Bacteria carry an enzyme that cuts DNA at particular sequences, and a matching methylase that modifies the same sequences in the cell's own DNA so that they are not cut. Phage DNA coming from a strain without the methylase is destroyed. In 1970 Hamilton Smith and Kent Wilcox purified the first enzyme that cut at a defined sequence, HindII from *Haemophilus influenzae*. Kathleen Danna and Daniel Nathans used such enzymes in 1971 to cut the DNA of the virus SV40 into specific fragments and map them. Arber, Smith and Nathans shared the 1978 Nobel Prize.

::: definition Type II restriction endonuclease {#def-restriction}
A **type II restriction endonuclease** recognises a specific DNA sequence, usually 4–8 bp long and **palindromic** (reading the same 5′→3′ on both strands), and cuts both strands at fixed positions within or next to it. Depending on where the two cuts fall, the products have **5′ overhangs** (EcoRI cuts `G^AATTC`, leaving 5′-`AATT` single-stranded ends), **3′ overhangs** (PstI, `CTGCA^G`) or **blunt ends** (EcoRV, `GAT^ATC`). Overhanging, or **sticky**, ends from the same enzyme can base-pair with each other. Enzymes are named after the organism they come from: EcoRI is the first such enzyme from *Escherichia coli* strain RY13.
:::

::: proposition Expected spacing of restriction sites {#prop-site-frequency}
In a sequence in which the four bases occur independently with probabilities $p_A, p_C, p_G, p_T$, the probability that a particular $k$ bp recognition sequence starts at a given position is the product of the probabilities of its bases. With equal base frequencies this is $4^{-k}$, so sites occur on average every $4^k$ bp: every 256 bp for a 4-cutter, 4096 bp for a 6-cutter and 65,536 bp for an 8-cutter. Real genomes deviate: base composition is unequal, and some short sequences are under- or over-represented. For example, `CG` is depleted about four-fold in vertebrate DNA, so enzymes with `CG` in their site cut human DNA rarely.
:::

::: example Fragments of phage λ {#ex-lambda}
The 48,502 bp genome of phage λ is a standard size marker. (a) How many EcoRI sites would you expect by chance? (b) λ in fact has 5 EcoRI sites. Digestion gives fragments of 21,226, 7421, 5804, 5643, 4878 and 3530 bp. Check that these account for the whole genome, and explain why there are six fragments rather than five. (c) Why might the 5804 and 5643 bp fragments be hard to tell apart on an agarose gel?
::: solution
(a) $48\,502/4096 = 11.8$ sites expected for a random 6 bp sequence. Five is lower, but not extraordinarily so; phages are under selection to avoid sites recognised by the restriction enzymes of their hosts.

(b) The sizes sum to $21\,226 + 7421 + 5804 + 5643 + 4878 + 3530 = 48\,502$ bp. λ DNA is linear in the phage, so five cuts give six pieces. A circular molecule with five cuts would give five.

(c) They differ by only 161 bp, about 3 %. In a 0.7 % agarose gel the resolution in this size range is a few per cent, so they run as a close doublet or a single thick band.
:::
:::

## Separating DNA by size: gel electrophoresis

DNA is negatively charged along its whole length, about one charge per phosphate, so its charge-to-mass ratio is nearly independent of size. In free solution all DNA moves at about the same speed in an electric field. In a gel of **agarose** (for fragments of about 0.1–25 kb) or **polyacrylamide** (for fragments of a few to about 1000 bp), the gel matrix acts as a sieve, and long molecules move more slowly than short ones. Over a useful range the distance travelled is approximately linear in the logarithm of the length. After the run the DNA is stained with a fluorescent dye that binds the double helix, and bands are seen under illumination. Fragments longer than about 50 kb all move at a limiting speed in a steady field. Separating them needs **pulsed-field gel electrophoresis** (David Schwartz and Charles Cantor, 1984), in which the field changes direction periodically and large molecules take longer to reorient.

::: example Sizing a fragment from a marker ladder {#ex-gel}
A marker ladder runs as follows (migration distance in cm): 10,000 bp at 2.00, 5000 bp at 2.75, 3000 bp at 3.31, 2000 bp at 3.75, 1000 bp at 4.50. An unknown PCR product runs at 3.60 cm. Estimate its size (a) by interpolating between the two nearest markers on a log scale, and (b) by fitting a straight line of $\log_{10}(\text{size})$ against distance to all five markers.
::: solution
(a) The unknown lies between 3000 bp (3.31 cm) and 2000 bp (3.75 cm), a fraction $(3.75 - 3.60)/(3.75 - 3.31) = 0.341$ of the way from 2000 towards 3000. On a log scale, $\log_{10}\text{size} = \log_{10}2000 + 0.341(\log_{10}3000 - \log_{10}2000) = 3.301 + 0.341\times0.176 = 3.361$, so the size is about 2300 bp.

(b) Least squares on the five points gives $\log_{10}\text{size} = 4.799 - 0.3997\,d$, and at $d = 3.60$ this is 3.360, a size of about 2290 bp. The two estimates agree to within 0.2 %. Neither should be quoted to better than a few per cent, since gel mobility also depends on DNA conformation and loading. Regression is treated in [[biostatistics/regression]].
:::
:::

### Restriction mapping

A **restriction map** shows where the cleavage sites for several enzymes lie on a DNA molecule. It is found by digesting with each enzyme alone and with pairs of enzymes together, and asking which arrangement of sites explains all the fragment sizes. The logic is that of a jigsaw. Every single-digest fragment must be divided exactly into double-digest fragments, and the fragments must add up to the length of the molecule.

```python
# Find restriction sites and predict fragment sizes for a linear or circular DNA
import re

ENZYMES = {'EcoRI': ('GAATTC', 1), 'BamHI': ('GGATCC', 1), 'HindIII': ('AAGCTT', 1)}
# value: (recognition site, cut position after this many bases on the top strand)

def cut_positions(seq, enzyme):
    site, offset = ENZYMES[enzyme]
    # lookahead so that overlapping sites are all found; all three sites are palindromes,
    # so searching one strand finds every site
    return [m.start() + offset for m in re.finditer('(?=' + site + ')', seq)]

def fragments(seq, enzymes, circular=False):
    cuts = sorted(p for e in enzymes for p in cut_positions(seq, e))
    if not cuts:
        return [len(seq)]
    if circular:
        sizes = [b - a for a, b in zip(cuts, cuts[1:])] + [len(seq) - cuts[-1] + cuts[0]]
    else:
        ends = [0] + cuts + [len(seq)]
        sizes = [b - a for a, b in zip(ends, ends[1:])]
    return sorted(sizes, reverse=True)

# a made-up 60 bp sequence with one EcoRI and two BamHI sites
seq = "ATGCGAATTCTTAGGCCATGGATCCAAATTTGGGCCCTTAAGGATCCTTGACAAGTTAAC"
print(len(seq), cut_positions(seq, 'EcoRI'), cut_positions(seq, 'BamHI'))
for enz in (['EcoRI'], ['BamHI'], ['EcoRI', 'BamHI']):
    print('+'.join(enz), 'linear:', fragments(seq, enz), 'circular:', fragments(seq, enz, True))
```

Output (positions are cut points counted from 0 on the top strand; sizes in bp):

```
60 [5] [20, 42]
EcoRI linear: [55, 5] circular: [60]
BamHI linear: [22, 20, 18] circular: [38, 22]
EcoRI+BamHI linear: [22, 18, 15, 5] circular: [23, 22, 15]
```

Notice two general points that the toy sequence makes visible. A single cut opens a circle without changing its length, while it divides a linear molecule in two. And in the double digest, the circular 38 bp BamHI fragment, which contains the EcoRI site, is split into 23 + 15, while the 22 bp fragment is unchanged. That is exactly the reasoning used to place sites from gel data.

::: example Mapping a plasmid {#ex-map}
A circular plasmid gives these fragments (in kb): EcoRI alone, 5.0; BamHI alone, 3.2 and 1.8; EcoRI + BamHI, 2.0, 1.8 and 1.2. Draw the map.
::: solution
EcoRI gives a single 5.0 kb fragment from a circle, so the plasmid is 5.0 kb with one EcoRI site; place it at 0. BamHI gives two fragments, so there are two BamHI sites, 1.8 kb apart one way round the circle and 3.2 kb the other. In the double digest the 1.8 kb fragment survives intact, so the EcoRI site is not in it; the 3.2 kb fragment is split into 2.0 + 1.2, so the EcoRI site lies inside it, 1.2 kb from one BamHI site and 2.0 kb from the other. The map is: EcoRI at 0, BamHI at 1.2, BamHI at 3.0 (1.2 + 1.8), and back to EcoRI at 5.0 (3.0 + 2.0). The mirror image (BamHI at 2.0 and 3.8) is the same circle read the other way round. A third enzyme, or a single-cut enzyme whose position relative to an asymmetric feature is known, is needed to fix the orientation relative to a gene.
:::
:::

## Making recombinant DNA

::: definition Molecular cloning {#def-cloning}
**Cloning** a DNA fragment means inserting it into a **vector**, a DNA molecule that can replicate in a host cell, and growing a clonal population of cells that each carry the same recombinant molecule. A typical plasmid vector has an **origin of replication**, a **selectable marker** (usually an antibiotic-resistance gene, so that only cells that took up a plasmid grow on selective medium) and a **multiple cloning site** with unique restriction sites. The fragment and vector are cut with the same enzyme(s), their compatible ends are annealed and joined by **DNA ligase**, and the products are introduced into competent *E. coli* cells by **transformation**.
:::

The first recombinant DNA molecules were made in Paul Berg's laboratory in 1972 (David Jackson, Robert Symons and Berg joined SV40 and λ DNA). In 1973 Stanley Cohen, Annie Chang, Herbert Boyer and Robert Helling cut and rejoined plasmids with EcoRI, and their recombinant plasmids replicated in *E. coli* and conferred the resistances of both parents. Concern about possible hazards led scientists to call a voluntary moratorium, then to the Asilomar conference of 1975. Its recommendations, a system of physical and biological containment matched to the assessed risk, became the basis of official guidelines such as those of the US National Institutes of Health (1976). Laboratory cloning today uses disabled *E. coli* K-12 strains that cannot survive outside the laboratory, under institutional biosafety oversight.

Several refinements made cloning routine:

- **Screening by α-complementation.** In vectors such as the pUC plasmids, the multiple cloning site lies inside a fragment of the *lacZ* gene encoding the α-peptide of β-galactosidase. Host cells carrying the complementary fragment make active enzyme only if the vector's *lacZα* is intact, and active enzyme turns the chromogenic substrate X-gal blue. An insert disrupts *lacZα*, so colonies carrying recombinant plasmids are **white**, and those with an empty vector are blue.
- **cDNA.** Eukaryotic genes contain introns ([[molecular-biology/rna-processing]]), which bacteria cannot remove. To express a eukaryotic protein in bacteria, one clones **complementary DNA** (cDNA), a DNA copy of mature mRNA made with **reverse transcriptase**, the enzyme discovered in RNA tumour viruses by Howard Temin and Satoshi Mizutani and by David Baltimore in 1970.
- **Libraries.** A **genomic library** is a collection of clones that together contain a whole genome; a **cDNA library** represents the mRNAs of a tissue. A clone is found by hybridisation with a labelled probe or by the function it confers.
- **Sequence-independent assembly.** Methods such as Gibson assembly (2009) join fragments with overlapping ends using an exonuclease, a polymerase and a ligase in one tube, so cloning no longer depends on convenient restriction sites.

## The polymerase chain reaction

PCR, conceived by Kary Mullis at the Cetus Corporation in 1983 and first published by Randall Saiki, Mullis and colleagues in 1985, copies a chosen segment of DNA over and over in vitro. It uses two **primers**, oligonucleotides of about 18–25 nucleotides complementary to opposite strands at either end of the target, and a DNA polymerase. Each **cycle** has three steps:

1. **Denaturation** at about 95 °C separates the strands.
2. **Annealing** at a temperature a few degrees below the primers' melting temperature (typically 50–65 °C) lets the primers pair with their targets. (Melting temperatures are calculated in Chemistry Atlas, [Nucleic acids](/learn/chemistry/lesson.php?c=biochemistry&l=nucleic-acids).)
3. **Extension** at about 72 °C lets the polymerase extend each primer across the target.

The breakthrough that made PCR practical was the **thermostable** DNA polymerase of the bacterium *Thermus aquaticus*, isolated from a hot spring in Yellowstone National Park by Thomas Brock in the 1960s. Taq polymerase survives the denaturation step, so it need not be added again at every cycle, and its high working temperature makes priming more specific (Saiki et al., 1988).

::: proposition PCR amplification {#prop-pcr}
1. If each cycle copies a fraction $E$ of the template molecules present ($0 \le E \le 1$, the **efficiency**), then after $n$ cycles the number of product molecules is
$$
N_n = N_0\,(1 + E)^n ,
$$ {#eq-pcr}
which is $N_0\,2^n$ at perfect efficiency.
2. Starting from one double-stranded template molecule at perfect efficiency, the number of duplexes whose two ends are *both* defined by the primers (the target-length product) after $n$ cycles is
$$
2^n - 2n .
$$ {#eq-pcr-exact}
The first such molecules appear in cycle 3.
3. In real-time (quantitative) PCR, the **threshold cycle** $C_t$ at which the product reaches a fixed detection level satisfies $C_t = \text{const} - \log_{1+E} N_0$. A plot of $C_t$ against $\log_{10}N_0$ is therefore a straight line with slope $-1/\log_{10}(1+E)$, so
$$
E = 10^{-1/\text{slope}} - 1 .
$$ {#eq-qpcr}
At $E = 1$ the slope is $-3.32$: one more cycle per halving, 3.32 more cycles per ten-fold dilution.

Exponential growth lasts only while primers, nucleotides and polymerase are in excess. Late in the reaction amplification slows to a **plateau**, which is why quantitation uses $C_t$ from the exponential phase and not the final yield.
:::

::: proof
(1) Each cycle turns $N$ molecules into $N + EN = (1+E)N$; iterating $n$ times gives [[#eq-pcr]].

(2) After $n$ cycles there are $2^n$ duplexes. Each duplex consists of a template strand from the previous cycle and the new strand made on it. Call a strand **long** if it starts at a primer but was copied from an original strand, so that it runs past the other primer site. Each original strand yields one long strand per cycle, so after $n$ cycles there are $2n$ long strands. A duplex fails to be of target length only if it contains an original or a long strand. These are the 2 duplexes containing the original strands (each paired with the long strand just made on it) and the $2(n-1)$ duplexes in which a long strand from an earlier cycle served as template, $2n$ duplexes in all. Every other duplex has both ends set by the primers, so there are $2^n - 2n$ of them. Check: $n = 1$ and $n = 2$ give 0, and $n = 3$ gives $8 - 6 = 2$.

(3) The product reaches the threshold $N_t$ when $N_0(1+E)^{C_t} = N_t$, that is, $C_t = \log_{1+E}N_t - \log_{1+E}N_0 = \text{const} - \log_{10}N_0/\log_{10}(1+E)$. The slope against $\log_{10}N_0$ is $-1/\log_{10}(1+E)$; solving for $E$ gives [[#eq-qpcr]].
:::

::: example How much product, and how pure? {#ex-pcr}
A PCR starts from 10 copies of a 500 bp target. (a) How many copies are there after 30 cycles at 100 % efficiency, and at 95 %? (b) Starting from one template duplex, what fraction of duplexes after 30 cycles are of exactly the target length? (c) What mass of DNA does $10^{10}$ copies of a 500 bp product represent? Take 650 g mol⁻¹ per base pair.
::: solution
(a) $10\times2^{30} = 1.07\times10^{10}$; $10\times1.95^{30} = 5.0\times10^{9}$. A 5 % loss of efficiency per cycle halves the yield over 30 cycles, so efficiency matters a great deal.

(b) $(2^{30} - 60)/2^{30} = 1 - 5.6\times10^{-8}$: essentially all of it. The long products grow only linearly.

(c) One copy weighs $500\times650/(6.022\times10^{23}) = 5.4\times10^{-19}$ g, so $10^{10}$ copies weigh $5.4\times10^{-9}$ g, about 5 ng. That is easily visible on a stained gel, from a starting amount of about $5\times10^{-18}$ g.
:::
:::

::: example Efficiency from a standard curve {#ex-qpcr}
A ten-fold dilution series of a plasmid standard gives threshold cycles of 15.1, 18.6, 22.1 and 25.6 for $10^6$, $10^5$, $10^4$ and $10^3$ copies. (a) What is the amplification efficiency? (b) An unknown sample gives $C_t = 20.0$. How many copies did it contain?
::: solution
(a) $C_t$ rises by 3.5 cycles per ten-fold dilution, so the slope against $\log_{10}N_0$ is $-3.5$ and $E = 10^{1/3.5} - 1 = 0.93$, or 93 %. Efficiencies between about 90 and 105 % are usually accepted.

(b) The line is $C_t = 15.1 + 3.5(6 - \log_{10}N_0)$, so $\log_{10}N_0 = 6 - (20.0 - 15.1)/3.5 = 6 - 1.40 = 4.60$, giving $N_0 = 4.0\times10^4$ copies.
:::
:::

::: widget plot
f: log(N0)/log(10) + x*log(1 + E)/log(10); log(N0)/log(10) + x
x: 0, 40
y: 0, 14
sliders: E=0.9:0.5:1:0.01; N0=10:1:1000:1
hlines: 10
labels: \log_{10}N \text{ at efficiency } E; \log_{10}N \text{ at } E = 1
caption: The logarithm of the number of product molecules against cycle number in the exponential phase of PCR, $\log_{10}N = \log_{10}N_0 + n\log_{10}(1+E)$ from [[#eq-pcr]], for $N_0$ starting copies. The horizontal line is an arbitrary detection threshold; the cycle where each line crosses it is $C_t$. Raise $N_0$ ten-fold and the crossing moves 3.3 cycles earlier when $E = 1$. Lower $E$ and the crossing moves later and becomes more sensitive to $N_0$. Real reactions bend over into a plateau, which this exponential model omits.
:::

PCR made it possible to study DNA from tiny samples. It is used to amplify a gene for cloning or sequencing, detect a particular sequence (as in diagnostic and forensic tests), measure mRNA levels after reverse transcription (RT-qPCR) and amplify ancient DNA. Its sensitivity is also its weakness: a single contaminating molecule can be amplified as well as the target, so controls without template are essential.

::: warning "More cycles give more product, so run as many as possible"
Amplification is exponential only while reagents are in excess. Once the product reaches roughly $10^{11}$–$10^{12}$ copies per reaction, primers and nucleotides become limiting, the polymerase is saturated, and product strands re-anneal to each other instead of to primers. Extra cycles then add little specific product but give more time for mispriming, so non-specific bands and primer dimers accumulate. Final yield is therefore a poor measure of starting amount: two samples that differ ten-fold in template can give the same plateau. Quantitative PCR uses the threshold cycle, read while amplification is still exponential.
:::

## Reading DNA: sequencing

In 1977 two methods for sequencing DNA were published. Allan Maxam and Walter Gilbert used base-specific chemical cleavage. Frederick Sanger, Steve Nicklen and Alan Coulson used chain-terminating nucleotides. Sanger's method won out, and Sanger and Gilbert shared the 1980 Nobel Prize in Chemistry (with Paul Berg).

::: definition Chain-termination (Sanger) sequencing {#def-sanger}
A DNA polymerase extends a primer annealed to a single-stranded template in the presence of the four normal dNTPs and a small proportion of **dideoxynucleoside triphosphates** (ddNTPs), which lack the 3′-OH. When a ddNTP is incorporated, extension stops. The product is a nested set of strands, each ending at a position where the template specified the base of that ddNTP. Separating the products by length with single-nucleotide resolution, and noting which ddNTP ends each one, reads the sequence 5′→3′ from the primer. In the modern form each ddNTP carries a different fluorescent dye, and the products are separated in one capillary. Reads are typically 600–1000 nucleotides long.
:::

Read length is limited by statistics as well as by the separation. If each position at which a G is specified has a small probability $q$ of receiving ddG, the fraction of strands extending past $k$ such positions is $(1 - q)^k$. With $q = 0.01$, about 78 % of strands pass 25 G positions, so the signal is spread over the whole read but fades gradually; the ratio of ddNTP to dNTP is tuned to balance signal at short and long distances.

**High-throughput** ("next-generation") methods, developed from the mid-2000s, sequence millions to billions of DNA fragments in parallel. In the most widely used approach (Illumina sequencing by synthesis), fragments are amplified into clusters on a glass surface and read one base per cycle with reversibly terminated, fluorescent nucleotides, giving reads of about 100–300 bases. **Single-molecule long-read** methods read individual molecules tens of kilobases long or longer, either by watching a polymerase incorporate fluorescent nucleotides in real time (Pacific Biosciences) or by measuring the current through a protein nanopore as DNA passes through it (Oxford Nanopore). Long reads make it possible to assemble repetitive regions. The first telomere-to-telomere human genome sequence was completed with them in 2022. The cost of sequencing a human genome fell from roughly US\$100 million in 2001 to around US\$1000 by 2016 and, by NHGRI estimates and manufacturers' figures, to a few hundred dollars by 2024. Genome assembly and analysis are treated in [[genomics/sequencing-genomes]] and [[bioinformatics/assembly-variants]].

::: example How deep must you sequence? {#ex-coverage}
In the Lander–Waterman model, reads fall at random positions on a genome. If the total length of reads is $c$ times the genome length (the **coverage** or depth), the number of reads covering a given base is approximately Poisson with mean $c$. (a) What fraction of a genome is not covered at all at 5× and at 30× coverage? (b) For a 3.1 Gb human genome at 30×, how many bases would that leave uncovered? (c) Why do real projects still have gaps at 30×?
::: solution
(a) The probability of zero reads is $e^{-c}$: $e^{-5} = 6.7\times10^{-3}$ at 5×, so about 0.7 % of bases are missed, and $e^{-30} = 9.4\times10^{-14}$ at 30×.

(b) $3.1\times10^9\times9.4\times10^{-14} = 3\times10^{-4}$ bases: effectively none.

(c) Reads are not placed at random: regions of extreme GC content amplify and sequence poorly, and reads shorter than a repeat cannot be placed uniquely within it. At 30× the remaining gaps are due to these biases, not to sampling, which is why long reads were needed to finish the human genome.
:::
:::

## Detecting specific molecules: hybridisation and blotting

Many techniques rely on the specificity of base pairing: a labelled single-stranded **probe** will find and anneal with its complement among millions of other sequences.

- **Southern blotting** (Edwin Southern, 1975): DNA fragments separated on a gel are denatured and transferred ("blotted") to a membrane, which is then incubated with a labelled probe. The method reveals the size of the restriction fragments carrying a sequence. It was used to detect gene rearrangements and restriction-fragment length polymorphisms.
- **Northern blotting** (James Alwine, David Kemp and George Stark, 1977, named as a joke) does the same for RNA, showing the size and abundance of a transcript in different tissues.
- **Western blotting** (Harry Towbin and colleagues, 1979; W. Neal Burnette named it in 1981) transfers proteins separated by gel electrophoresis to a membrane and detects one of them with an antibody.
- **In situ hybridisation** detects a sequence in fixed cells or tissues, showing where a gene is expressed or where a sequence lies on a chromosome. Fluorescent probes are used in FISH.
- **DNA microarrays** (1990s) immobilise thousands of probes on a slide and hybridise them to labelled cDNA, measuring expression of many genes at once. For most purposes they have been replaced by sequencing cDNA directly (**RNA-seq**).

## Seeing where and when genes act: reporter genes

A **reporter gene** encodes a product that is easy to detect, and is placed under the control of the regulatory sequences being studied, or fused in frame to the protein being studied. Common reporters are *lacZ* (β-galactosidase, detected with X-gal), firefly **luciferase** (light from luciferin, measured quantitatively), and **green fluorescent protein** (GFP) from the jellyfish *Aequorea victoria*. GFP is the most transformative because it fluoresces in living cells without any added substrate. Osamu Shimomura isolated it in 1962. Douglas Prasher cloned its gene in 1992, and Martin Chalfie and colleagues expressed it in *E. coli* and *C. elegans* in 1994, showing that it needs no other jellyfish factor. Roger Tsien's laboratory then engineered brighter variants and other colours. Shimomura, Chalfie and Tsien shared the 2008 Nobel Prize in Chemistry. Reporter assays are how enhancers and promoters are defined ([[molecular-biology/eukaryotic-gene-regulation]]), and fluorescent protein fusions are how protein movement is followed in living cells ([[cell-biology/cells-and-microscopy]]).

::: quiz
You fuse the promoter and enhancer region of a gene expressed only in fly muscle to the coding sequence of GFP and make transgenic flies. GFP appears in muscle and, unexpectedly, also in gut. Which conclusion is best supported?
- [ ] The gene is also expressed in gut.
- [x] The fragment contains sequences able to drive expression in gut; whether the endogenous gene is expressed there must be tested directly, for example by in situ hybridisation.
- [ ] GFP is toxic in muscle and has moved to the gut.
- [ ] The experiment failed, because a reporter must reproduce the endogenous pattern exactly.
::: solution
A reporter shows what the cloned regulatory sequences can do in the context where they were inserted. Removed from their normal surroundings, they may lack nearby silencers or insulators, or be influenced by enhancers near the insertion site. The extra gut expression could reflect such context effects, so the endogenous gene's expression must be checked directly; testing several independent insertions helps exclude position effects.
:::
:::

## Editing genomes: CRISPR–Cas9

The most powerful tool of the last decade also came from bacterial immunity. Many bacteria and archaea carry **CRISPR** arrays (clustered regularly interspaced short palindromic repeats), first noticed in *E. coli* by Yoshizumi Ishino and colleagues in 1987. In 2005, three groups, including Francisco Mojica's, noticed that the spacers between the repeats match sequences from phages and plasmids. Rodolphe Barrangou, Philippe Horvath and colleagues (2007) showed in the dairy bacterium *Streptococcus thermophilus* that new spacers are acquired from attacking phages and make the cells resistant to them. The array is transcribed and processed into short **CRISPR RNAs** (crRNAs), each guiding a Cas nuclease to destroy DNA matching its spacer.

In 2012 Martin Jinek, Krzysztof Chylinski, Ines Fonfara, Michael Hauer, Jennifer Doudna and Emmanuelle Charpentier showed that the Cas9 protein of *Streptococcus pyogenes*, with two RNAs, cuts any DNA matching a 20-nucleotide guide. Those RNAs are a crRNA and a trans-activating crRNA (tracrRNA), and the two can be fused into a single **guide RNA**. Within months, groups led by Feng Zhang and by George Church used the system to edit human and mouse cells (Cong et al. and Mali et al., 2013). Charpentier and Doudna received the 2020 Nobel Prize in Chemistry.

::: definition The Cas9 mechanism {#def-cas9}
*S. pyogenes* **Cas9** is an RNA-guided endonuclease. Loaded with a **guide RNA** whose 5′ end carries a 20-nucleotide **spacer**, it scans DNA for a **protospacer-adjacent motif** (PAM), `5'-NGG-3'` on the non-target strand. On finding a PAM, it unwinds the adjacent DNA and tests whether the spacer base-pairs with the target strand, beginning at the PAM-proximal "seed" region. If the match extends through most of the 20 nucleotides, the **HNH** nuclease domain cuts the target strand (the one paired with the guide) and the **RuvC** domain cuts the other strand. The result is a blunt **double-strand break** 3 bp upstream (5′) of the PAM. The cell then repairs the break ([[molecular-biology/dna-repair-recombination]]): NHEJ often leaves a small insertion or deletion that disrupts a gene, while homology-directed repair from a supplied template can introduce a precise change.
:::

The PAM requirement is the key to self–non-self discrimination in the bacterium. The spacer in the CRISPR array is not adjacent to a PAM, so Cas9 does not cut the cell's own array. It also constrains editing: a target must lie next to an `NGG`, which occurs on average every 16 bp on each strand of random DNA, or every 8 bp counting both strands. Engineered variants of Cas9 recognise other PAMs, and other Cas enzymes (such as Cas12a, with a T-rich PAM and staggered cuts) widen the choice. **Base editors** and **prime editors** fuse a Cas9 that nicks only one strand to a deaminase or a reverse transcriptase, changing bases without a double-strand break.

::: example Specificity of a 20-nucleotide guide {#ex-specificity}
(a) In a random sequence with equal base frequencies, how often would a particular 20-nucleotide target followed by `GG` occur, per position on one strand? (b) How many exact matches would you expect by chance in a diploid human genome ($6.2\times10^9$ bp, counting both strands)? (c) Cas9 can tolerate a few mismatches, especially far from the PAM. How many sequences lie within three mismatches of a given 20-mer, and how many such near-matches next to `NGG` would you expect by chance? What does this imply for the design of guides?
::: solution
(a) $4^{-20}\times4^{-2} = 4^{-22} = 5.7\times10^{-14}$ per position.

(b) There are $2\times6.2\times10^9$ positions on the two strands of a diploid genome, but the two haploid copies are nearly identical, so count $6.2\times10^9$ positions for both strands of one haploid genome: $6.2\times10^9\times5.7\times10^{-14} = 3.5\times10^{-4}$ chance matches. A unique target is therefore essentially guaranteed in random DNA.

(c) The number of 20-mers with at most three mismatches is $\sum_{k=0}^{3}\binom{20}{k}3^k = 1 + 60 + 1710 + 30\,780 = 32\,551$. The expected number of such near-matches next to `GG` is $32\,551\times3.5\times10^{-4} \approx 11$. So a guide that is unique for exact matches can still have several off-target sites with a few mismatches, and real genomes, which are full of repeats, have more. Guides are therefore chosen with software that searches the genome for near-matches, and edited cells are checked by sequencing. (The random-sequence calculation is only a baseline.)
:::
:::

::: application Genome editing: uses, limits and rules
Cas9 and its relatives are used to knock out genes in cell lines and model organisms, to make precise mutations that model human variants, to screen thousands of genes in parallel with pooled guide libraries, and to breed crops. The first CRISPR-based therapy, for sickle-cell disease and β-thalassaemia (editing a regulatory sequence of *BCL11A* in a patient's own blood stem cells outside the body), was approved in the UK and USA in 2023; clinical matters belong to Medicine Atlas. Editing the human germ line, so that changes would be inherited, is prohibited or not permitted in most countries. The birth in 2018 of twins whose embryos had been edited was condemned internationally, and the scientist responsible was imprisoned. Genome editing of organisms is regulated by national biosafety and GMO laws, and work with any agent that could cause harm is covered by biosecurity rules. The ethical and regulatory framework is discussed in [[biotechnology/biosafety-ethics]].
:::

::: history
Werner Arber described restriction and modification in the 1960s, and Hamilton Smith and Kent Wilcox purified the sequence-specific enzyme HindII in 1970. Howard Temin and Satoshi Mizutani, and David Baltimore, discovered reverse transcriptase in 1970. David Jackson, Robert Symons and Paul Berg made the first recombinant DNA in 1972, and Stanley Cohen, Annie Chang, Herbert Boyer and Robert Helling cloned plasmid DNA in *E. coli* in 1973. The Asilomar conference on recombinant DNA was held in 1975, the year Edwin Southern published blotting. Frederick Sanger, Steve Nicklen and Alan Coulson, and Allan Maxam and Walter Gilbert, published DNA sequencing methods in 1977. Kary Mullis conceived PCR in 1983; Randall Saiki and colleagues published its first use in 1985 and the use of Taq polymerase in 1988 (Mullis: Nobel Prize in Chemistry 1993, with Michael Smith for site-directed mutagenesis). Martin Chalfie and colleagues introduced GFP as a reporter in 1994. Martin Jinek, Jennifer Doudna, Emmanuelle Charpentier and colleagues described programmable cleavage by Cas9 in 2012.
:::

::: summary
- Type II restriction enzymes cut at short, usually palindromic sites, giving sticky or blunt ends. Sites of length $k$ occur about every $4^k$ bp in random sequence. Restriction maps are deduced from single and double digests.
- Gel electrophoresis separates DNA by size; mobility is roughly linear in $\log(\text{size})$, and unknown sizes are read from a ladder.
- Cloning joins a fragment to a vector with ligase and propagates it in *E. coli*, with selection for the vector and screening for the insert (blue–white). cDNA made with reverse transcriptase lacks introns.
- PCR amplifies a target between two primers: $N = N_0(1+E)^n$. Target-length duplexes number $2^n - 2n$ from one template. qPCR quantifies by threshold cycle, with $E = 10^{-1/\text{slope}} - 1$ (slope $-3.32$ at 100 %).
- Sanger sequencing reads nested chain-terminated products; high-throughput and long-read methods sequence millions of molecules in parallel. Coverage $c$ leaves a fraction $e^{-c}$ of bases unsampled in the idealised model.
- Southern, northern and western blots detect DNA, RNA and protein after size separation; in situ hybridisation shows location. Reporter genes (*lacZ*, luciferase, GFP) report regulatory activity.
- Cas9 with a 20-nt guide cuts DNA next to an `NGG` PAM, making a blunt break 3 bp from the PAM. Repair by NHEJ disrupts genes; homology-directed repair installs precise edits. Off-target cutting at near-matches must be checked, and germ-line editing in humans is prohibited in most jurisdictions.
:::

## Exercises

::: exercise Site frequency {level=1 check="256"}
On average, how often (one site every how many bp) does a 4 bp recognition sequence occur in random DNA with equal base frequencies?
::: solution
$4^4 = 256$ bp.
:::
:::

::: exercise Sticky ends {level=1}
EcoRI cuts `G^AATTC` and MfeI cuts `C^AATTG`. (a) Draw the ends each enzyme leaves. (b) Can an EcoRI end be ligated to an MfeI end? (c) Can the junction be recut by either enzyme?
::: solution
(a) Both leave 5′ overhangs of `AATT`: EcoRI gives `5'-G` and `5'-AATTC...`; MfeI gives `5'-C` and `5'-AATTG...`. (b) Yes: the overhangs are identical and complementary, so they anneal and ligate. (c) The hybrid junction reads `GAATTG` (or `CAATTC` on the other side), which is neither `GAATTC` nor `CAATTG`, so neither enzyme recuts it. Such compatible but non-regenerating ends are used to destroy a site deliberately during cloning.
:::
:::

::: exercise PCR yield {level=1 check="1048576"}
Starting from one template molecule, how many product molecules does a perfectly efficient PCR give after 20 cycles?
::: solution
$2^{20} = 1\,048\,576$, about $10^6$.
:::
:::

::: exercise Efficiency from a slope {level=2 check="1.10"}
A qPCR standard curve has a slope of $-3.1$ cycles per decade. What is the apparent efficiency $E$ (two decimal places), and what might explain a value above 1?
::: solution
$E = 10^{1/3.1} - 1 = 1.10$, apparently 110 %. Values above 100 % are physically impossible for specific product; they usually indicate inhibitors in the concentrated standards (which delay $C_t$ at high input and flatten the curve), pipetting errors in the dilution series, or primer-dimer signal contributing at low input.
:::
:::

::: exercise Target-length products {level=2 check="1004"}
Starting from one template duplex at perfect efficiency, how many duplexes of exactly the target length are present after 10 cycles?
::: solution
From [[#eq-pcr-exact]], $2^{10} - 2\times10 = 1024 - 20 = 1004$.
:::
:::

::: exercise A second mapping problem {level=2}
A 7.0 kb linear DNA gives: HindIII alone, 4.0 and 3.0 kb; XhoI alone, 5.5 and 1.5 kb; HindIII + XhoI, 3.0, 2.5 and 1.5 kb. Construct the map. Is there more than one solution?
::: solution
Each enzyme cuts once (two fragments from a linear molecule). Place HindIII at 4.0 kb from the left end (fragments 4.0 and 3.0). The double digest keeps the 3.0 and 1.5 kb fragments and splits the 4.0 kb HindIII fragment into 2.5 + 1.5, so the XhoI site lies within the 4.0 kb fragment, 1.5 kb from one of its ends. If XhoI were 1.5 kb from the left end, the XhoI fragments would be 1.5 and 5.5 — correct. If it were at 2.5 kb from the left end (1.5 kb from the HindIII site), the XhoI fragments would be 2.5 and 4.5 — wrong. So the map is: left end — XhoI at 1.5 — HindIII at 4.0 — right end at 7.0 (or its mirror image read from the other end). The solution is unique up to orientation.
:::
:::

::: exercise Reading a Sanger trace {level=2}
A Sanger reaction with dye-labelled terminators gives, in order of increasing fragment length, peaks of colours corresponding to: ddA, ddT, ddG, ddG, ddC, ddA, ddT. (a) What is the sequence of the newly synthesised strand, 5′→3′? (b) What is the sequence of the template, 5′→3′? (c) Why are peaks from long fragments smaller and wider?
::: solution
(a) The shortest fragment ends nearest the primer, so the new strand reads `5'-ATGGCAT-3'` (after the primer).

(b) The template is the reverse complement: `5'-ATGCCAT-3'`.

(c) The fraction of strands extending past each successive position falls geometrically, as in $(1-q)^k$, so fewer molecules terminate at distant positions; and in capillary electrophoresis the resolution between strands differing by one nucleotide falls as length increases (a one-nucleotide difference is a smaller fraction of the length), so peaks broaden and overlap.
:::
:::

::: exercise Choosing a Cas9 target {level=3}
Here is part of the coding strand of an exon (5′→3′): `ATGCCTGAAGCTTGGACCATCGTAGCAGGTCTTAAG`. (a) Find every `NGG` on this strand, and give the 20-nucleotide protospacer and the cut site for each that has 20 nucleotides upstream within the sequence. (b) To find targets on the other strand, which motif do you look for on this strand? Find one. (c) Why might you prefer a target whose cut site lies early in the coding sequence?
::: solution
(a) Numbering from 1, this strand contains `TGG` at positions 13–15 and `AGG` at 27–29. Only 12 nucleotides lie upstream of the `TGG`, too few for a 20-nucleotide protospacer within the given sequence. For the `AGG`, the protospacer is positions 7–26, `GAAGCTTGGACCATCGTAGC`, and the guide RNA would carry the same sequence (with U for T). Cas9 cuts 3 bp upstream of the PAM, between positions 23 and 24: `GAAGCTTGGACCATCGT^AGC AGG`.

(b) An `NGG` on the other strand appears on this strand as `CCN`, and the protospacer is then the 20 nucleotides *downstream* of the `CCN` on this strand, with the guide matching their reverse complement. This strand has `CCT` at 4–6 and `CCA` at 17–19. Only 17 nucleotides follow the `CCA`, but the `CCT` is followed by positions 7–26. The guide sequence is the reverse complement of that stretch, `GCTACGATGGTCCAAGCTTC`, and the cut lies 3 bp from the PAM, between positions 9 and 10. Here the same 20 bp happen to be targetable from both strands, with cuts 14 bp apart.

(c) A frameshift indel early in the coding sequence is more likely to produce a severely truncated, non-functional protein and to trigger nonsense-mediated decay of the mRNA ([[molecular-biology/rna-processing]]); an indel near the 3′ end might leave most of the protein intact and functional.
:::
:::

::: exercise Interpreting a western blot after editing {level=3}
A population of cultured cells is treated with Cas9 and a guide targeting exon 2 of a gene. Sequencing of the target region shows 70 % edited alleles, all frameshifts. A western blot with an antibody against the protein's C-terminus shows a band of normal size at 40 % of the control intensity. A clone derived from a single cell shows no band. (a) Is 40 % consistent with 70 % frameshift alleles? (b) Why is a single-cell clone needed for many experiments? (c) What else should you check before concluding that a phenotype of the clone is due to loss of the protein?
::: solution
(a) If alleles are edited independently, a fraction $0.3$ of alleles still encode normal protein; with protein made in proportion to functional alleles, the population would show about 30 % of control. 40 % is close — the difference could reflect protein persisting from before editing (stable proteins take time to dilute out), alternative start codons, or exon skipping that removes the frameshift.

(b) A population is a mixture of cells with different genotypes (unedited, heterozygous, different indels); a clone from one cell has a defined genotype at both alleles, so the effect of complete loss can be studied.

(c) Off-target edits elsewhere in the genome (check predicted near-match sites by sequencing, or use a second independent guide and clone); clonal variation unrelated to the edit (compare several independent clones); and rescue — re-expressing the protein from a guide-resistant construct should reverse the phenotype if it is due to the knockout.
:::
:::
