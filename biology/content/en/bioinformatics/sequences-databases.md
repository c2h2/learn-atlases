In 1965 Margaret Dayhoff and her colleagues at the National Biomedical Research Foundation in Washington published a book called *Atlas of Protein Sequence and Structure*. It contained every protein sequence then known, typed out letter by letter, with the families aligned by hand. The book was small enough to read. Sixty years later the public sequence archives hold the genomes of hundreds of thousands of organisms and tens of petabases of raw sequencing reads, and nobody reads them: they are searched, filtered, aligned and counted by programs. Everything else in this course — alignment, database searches, trees, gene finding, variant calling and expression analysis — begins with a sequence stored in a file, drawn from a database, and handled by a few lines of code.

This chapter is about those foundations. We define what a biological sequence is to a computer, look at the file formats in which sequences, qualities, annotations and alignments are stored, tour the major public databases and their identifiers, and work out the simplest statistical question one can ask of a sequence: how often should a given word appear by chance? We end with the programming habits that make an analysis reproducible. The chemistry of DNA and the genetic code are assumed from [[molecular-biology/dna-structure]] and [[molecular-biology/translation]]; how reads are produced is the subject of [[genomics/sequencing-genomes]].

## Sequences as strings

To a computer a DNA molecule is a **string**: a finite sequence of symbols from an alphabet. The abstraction throws away almost everything — the double helix, the chromatin, the methyl groups — and keeps the one thing that is copied from generation to generation, the order of the bases. It is a remarkably good abstraction, because the order of bases is what replication preserves and what mutation changes.

::: definition Sequence, alphabet and length {#def-sequence}
A **sequence** of length $n$ over an **alphabet** $\mathcal{A}$ is a string $s = s_1s_2\cdots s_n$ with each $s_i \in \mathcal{A}$. For nucleic acids $\mathcal{A} = \{\mathtt{A}, \mathtt{C}, \mathtt{G}, \mathtt{T}\}$ (with `U` for `T` in RNA); for proteins $\mathcal{A}$ is the 20 standard amino acids in one-letter code. A **substring** $s_i\cdots s_j$ is written $s[i..j]$; a substring of length $k$ is a **$k$-mer** (or word). Nucleic-acid sequences are written 5′→3′ and protein sequences from the N terminus to the C terminus.
:::

Two refinements are needed in practice. First, laboratories rarely know every base for certain, so the alphabet is extended by the **IUPAC ambiguity codes**: `N` for any base, `R` for a purine (`A` or `G`), `Y` for a pyrimidine (`C` or `T`), `S` for `G` or `C`, `W` for `A` or `T`, and so on; `X` plays the role of `N` for proteins, and `*` often marks a stop codon in a translated sequence. Second, DNA has two strands, and a file stores only one of them.

::: definition Reverse complement {#def-revcomp}
The **reverse complement** of a DNA sequence $s = s_1\cdots s_n$ is $\bar s = c(s_n)c(s_{n-1})\cdots c(s_1)$, where $c$ exchanges `A`↔`T` and `C`↔`G`. It is the sequence of the opposite strand, read 5′→3′.
:::

A sequence and its reverse complement describe the same double-stranded molecule, so a search for a motif, a gene or a read must examine both. A **palindromic** site such as the *Eco*RI recognition sequence `GAATTC` is its own reverse complement.

### What a sequence can carry

A protein-coding stretch of DNA can be read in three **reading frames** on each strand, six in all. An **open reading frame** (ORF) is a stretch beginning with a start codon (usually `ATG`) and running to the first in-frame stop codon (`TAA`, `TAG` or `TGA`). Translation by the standard genetic code (NCBI translation table 1) maps each codon to an amino acid; other tables apply in vertebrate mitochondria, ciliates and some bacteria, and a program must be told which one to use. Gene finding, which is much more than looking for long ORFs, is the subject of [[bioinformatics/gene-finding]].

The amount of information a sequence can carry is easy to state. A base is one of four symbols, so it carries at most $\log_2 4 = 2$ bits; an amino acid carries at most $\log_2 20 \approx 4.32$ bits. Real sequences carry less, because base composition is uneven and neighbouring bases are correlated — which is exactly what compression programs exploit and what the statistical models of later chapters describe.

::: example Strands, frames and composition {#ex-revcomp}
A short sequence reads `5'-ATGGCTAAAGGCGAAGAACTGTTCACCGGTTAA-3'`. Find its length, its GC content, its reverse complement and its translation in frame +1.
::: solution
There are 33 bases: `A` occurs 11 times, `C` 6 times, `G` 9 times and `T` 7 times, so the GC content is $(6 + 9)/33 = 0.455$, or 45.5 %.

The reverse complement is obtained by complementing each base and reversing the order: `5'-TTAACCGGTGAACAGTTCTTCGCCTTTAGCCAT-3'`. (Check the ends: the sequence begins `ATG`, so its reverse complement must end `CAT`.)

Reading codons from the first base: `ATG GCT AAA GGC GAA GAA CTG TTC ACC GGT TAA` translates to `M A K G E E L F T G *` — an ORF of ten codons from `ATG` to the stop codon `TAA`.
:::
:::

## File formats

Bioinformatics runs on plain-text files with simple, rigid formats. They look primitive, but their simplicity is a strength: any program in any language can read them, and a human can inspect them with a text editor. The price is that small violations of a format — an extra space, a Windows line ending, a different coordinate convention — cause silent errors. Knowing the formats exactly is part of the craft.

::: definition FASTA and FASTQ formats {#def-fasta}
A **FASTA** file is a series of records, each a header line beginning with `>` followed by an identifier (the first word) and an optional description, then one or more lines of sequence. A **FASTQ** file stores sequencing reads as records of exactly four lines: `@` and an identifier; the sequence; a line beginning with `+`; and a quality string of the same length as the sequence, one character per base, encoding a **Phred quality** $Q = -10\log_{10}P(\text{error})$ as the character with ASCII code $Q + 33$.
:::

FASTA takes its name from the FASTA search program of William Pearson and David Lipman (1988); FASTQ grew up at the Wellcome Trust Sanger Institute around 2000 and was documented, with its several incompatible early variants, by Peter Cock and colleagues in 2010. The Phred scale itself, introduced with Phil Green's base caller *phred* in 1998, is explained in [[genomics/sequencing-genomes]]: $Q = 20$ means a 1 % chance that the base is wrong, $Q = 30$ a 0.1 % chance.

```
>NC_001416.1 Enterobacteria phage lambda, complete genome
GGGCGGCGACCTCGCGGGTTTTCGCTATTTATGAAAATTTTCCGGTTTAAGGCGTTTCCGTTCTTCTTCG
...
@read_0001
ACGTTGCAAGT
+
IIIIHHG@5+#
```

::: example Expected errors in a read {#ex-phred}
A read of 15 bases has the quality string `IIIIIIHHGG@@5+#` (Phred+33). How many sequencing errors does it contain on average, and which bases would a quality filter remove?
::: solution
Subtracting 33 from the ASCII codes (`I` = 73, `H` = 72, `G` = 71, `@` = 64, `5` = 53, `+` = 43, `#` = 35) gives the qualities

$$
40,40,40,40,40,40,39,39,38,38,31,31,20,10,2.
$$

The error probabilities are $10^{-Q/10}$: $10^{-4}$ for each $Q = 40$, down to $10^{-1}$ for $Q = 10$ and $10^{-0.2} = 0.63$ for $Q = 2$. Their sum, the expected number of errors, is $0.74$ — almost all of it from the last three bases. This pattern of quality falling towards the 3′ end is typical of sequencing by synthesis. A filter that trims bases below $Q = 20$ from the 3′ end removes the last two, and the expected number of errors in the remaining 13 bases drops to about $0.011$.
:::
:::

Beyond sequences, four further formats cover most of what you will meet.

- **GenBank and EMBL flat files** hold an annotated sequence record: a header (accession, organism, references), a `FEATURES` table describing genes, coding sequences and other features with their coordinates and qualifiers (`/gene="lacZ"`, `/translation="MTMITDSL..."`), and the sequence itself.
- **GFF3** (General Feature Format) and the related GTF describe features on a genome as tab-separated lines: sequence name, source, feature type (`gene`, `mRNA`, `exon`, `CDS`), start, end, score, strand, phase and attributes. **BED** is a leaner tabular format used for intervals such as peaks or regions of interest.
- **SAM** (Sequence Alignment/Map) and its compressed binary form **BAM** (or the reference-based **CRAM**) record where each read aligns to a reference, with a compact description of the alignment called a CIGAR string (`76M2I22M`: 76 aligned bases, a 2-base insertion, 22 aligned bases) and a mapping quality ([[bioinformatics/assembly-variants]]).
- **VCF** (Variant Call Format) lists the positions at which samples differ from the reference, with the reference and alternative alleles, a quality and per-sample genotypes.

### Coordinates

Feature formats need a way to say where things are, and here the formats disagree.

::: definition Coordinate conventions {#def-coordinates}
In a **one-based, fully closed** system (GenBank, GFF3, SAM, VCF) the first base of a sequence is position 1 and an interval $[a, b]$ includes both ends, so it has length $b - a + 1$. In a **zero-based, half-open** system (BED, and the slicing of strings in Python) the first base is position 0 and an interval $[a, b)$ includes $a$ but not $b$, so it has length $b - a$. The same bases are described by one-based $[a, b]$ and zero-based $[a - 1, b)$.
:::

The half-open convention looks odd but is convenient for computing: lengths are differences, adjacent intervals share an endpoint ($[0, 10)$ and $[10, 20)$), and an empty interval is $[a, a)$. The closed convention matches how biologists count. Neither is wrong; mixing them is.

::: warning Off-by-one errors
Converting between BED and GFF, or between a genome browser and a Python slice, is the commonest source of silent errors in genomics. A feature at GFF positions 1,001–2,000 (1,000 bases) is BED `1000 2000`, and in Python `seq[1000:2000]`. Writing `seq[1001:2000]` loses one base and, for a coding sequence, shifts every downstream codon. Always ask which convention a file uses, and test conversions on a feature whose sequence you know — for instance, check that a CDS begins with `ATG` and ends with a stop codon.
:::

::: example A gene on the minus strand {#ex-minus}
A GFF3 file contains the line `chrII  RefSeq  CDS  5001  5300  .  -  0  ID=cds7`. Write the Python expression that extracts the coding sequence, 5′→3′, from a string `chrom` holding chromosome II, and say what you expect its first and last three bases to be.
::: solution
GFF coordinates are one-based and closed, so the feature covers 300 bases, one-based 5,001 to 5,300, which is the Python slice `chrom[5000:5300]`. The strand is `-`, so the gene is read on the opposite strand: the coding sequence is `revcomp(chrom[5000:5300])`. Its length, 300, is a multiple of 3, as a complete CDS must be (the phase `0` says that translation starts at the first base of the feature). If the annotation is right, the extracted sequence should begin with a start codon such as `ATG` and end with `TAA`, `TAG` or `TGA`; on the plus-strand slice itself, before reverse complementing, you would instead see a reverse-complemented stop (`TTA`, `CTA` or `TCA`) at the left end and `CAT` at the right end. Checking this is the quickest test that the coordinates have been converted correctly.
:::
:::

::: quiz
A BED line reads `chr1  99  102`. Which bases does it cover, in one-based coordinates?
- [ ] 99, 100, 101 and 102
- [x] 100, 101 and 102
- [ ] 99, 100 and 101
- [ ] 100 and 101
::: solution
BED intervals are zero-based and half-open: `99 102` covers zero-based positions 99, 100 and 101, which are one-based positions 100, 101 and 102. The length is $102 - 99 = 3$. In GFF the same feature would be written `100 102`.
:::
:::

## The public databases

Biology is unusual among sciences in having made its primary data public almost from the start. Journals require sequences to be deposited before publication, and the 1996 **Bermuda principles** of the Human Genome Project committed its sequencing centres to releasing data within 24 hours. The result is a set of archives that anyone can search without charge.

### Primary archives and curated databases

Databases come in two kinds. **Primary archives** store what submitters deposit, with minimal change; the submitter owns the record and it may contain errors. **Curated** (or secondary) databases are built from the archives by experts or pipelines that merge redundant entries, correct errors and add annotation.

- **Nucleotide sequences.** The **International Nucleotide Sequence Database Collaboration** (INSDC) links GenBank at the US National Center for Biotechnology Information (NCBI), the European Nucleotide Archive (ENA) at EMBL's European Bioinformatics Institute (EMBL-EBI), and the DNA Data Bank of Japan (DDBJ). They exchange new submissions daily, so the three hold the same data. Raw reads go to the **Sequence Read Archive** (SRA) and its INSDC partners.
- **RefSeq** at NCBI is a curated, non-redundant set of genomic, transcript and protein sequences for each organism. Its accession prefixes say what a record is: `NC_` a complete chromosome or genome, `NM_` and `NP_` a curated mRNA and protein, `XM_` and `XP_` ones predicted by annotation pipelines.
- **Proteins.** **UniProtKB** combines **Swiss-Prot**, manually reviewed entries with curated function, domains, modifications and literature, and **TrEMBL**, automatically annotated translations of the nucleotide archives. Swiss-Prot is small — of the order of half a million entries — and TrEMBL hundreds of millions; most proteins known today have never been studied experimentally, and their annotations are inferred from similarity (the subject of the next two chapters).
- **Structures.** The **Protein Data Bank** (PDB), run by the worldwide PDB partners since its founding at Brookhaven in 1971, archives experimentally determined structures of proteins and nucleic acids; it passed 200,000 entries in 2023. Predicted structures, such as the AlphaFold Protein Structure Database built with EMBL-EBI, are held separately ([[bioinformatics/machine-learning]]).
- **Genomes and annotation.** **Ensembl** (EMBL-EBI with the Wellcome Sanger Institute), the **UCSC Genome Browser** and NCBI's genome resources present assembled genomes with gene models, variation, comparative alignments and regulatory annotation, and let you download any of it.
- **Function and families.** **Pfam** and **InterPro** classify proteins into families and domains with profile hidden Markov models ([[bioinformatics/multiple-alignment]]); the **Gene Ontology** (GO) provides a controlled vocabulary of molecular functions, biological processes and cellular components with which genes are annotated; expression data go to **GEO** at NCBI and **ArrayExpress**/BioStudies at EMBL-EBI.

Database sizes change monthly, so always quote them with a date and source. GenBank's size roughly doubled every eighteen months for decades, and since the arrival of high-throughput sequencing in 2005–2008 the read archives have grown faster still; as of 2026 their combined contents are measured in tens of petabases.

### Identifiers and versions

::: definition Accession and version {#def-accession}
An **accession** is a stable identifier assigned to a database record when it is first created (for example `NC_001416` for the genome of bacteriophage lambda, `P04637` for the UniProt entry of human p53, `1TUP` for a PDB structure of the p53 core domain bound to DNA). In the nucleotide databases a **version** number is appended after a dot (`NC_001416.1`) and increases whenever the sequence itself changes; annotation may change without a new version.
:::

An accession says which record; the version says which sequence. A published analysis should cite both, together with the database release or download date, because "the human genome" is not one sequence. The Genome Reference Consortium released assembly GRCh38 in 2013 and has issued patches since; the Telomere-to-Telomere consortium's gapless T2T-CHM13 assembly of 2022 added about 200 million bases of sequence missing from GRCh38 ([[genomics/human-variation]]). Coordinates on one assembly are meaningless on another without a conversion ("lift-over").

::: application Databases and the diagnosis of rare disease
When a clinical laboratory finds a variant in a patient's genome, its interpretation depends almost entirely on public databases: the reference sequence and transcript model that define the variant's name, population databases such as gnomAD that say how common it is, and archives such as ClinVar where laboratories deposit their classifications. A variant described against the wrong transcript version can be given the wrong consequence. The bioinformatics here is mundane — formats, identifiers and versions — but its errors have consequences; the clinical process itself is described in Medicine Atlas ([medical genetics](/learn/medicine/course.php?c=genetics)).
:::

## Words in random sequences

The simplest model of a sequence is a random one: each position independently `A`, `C`, `G` or `T` with probabilities $p_\mathtt{A}, p_\mathtt{C}, p_\mathtt{G}, p_\mathtt{T}$. Nobody believes that genomes are written like this. The model is useful because it says what to expect when nothing biological is going on, so that departures from it — a motif that is too common, a restriction site that is too rare, an alignment score that is too high — stand out. We shall use this logic again and again, most importantly for the statistics of database searches ([[bioinformatics/database-search]]).

::: proposition Expected number of occurrences of a word {#prop-words}
In a sequence of length $L$ whose bases are independent with probabilities $p_\mathtt{A}, \ldots, p_\mathtt{T}$, the expected number of occurrences of a word $w = w_1\cdots w_k$ (counting overlapping occurrences, on one strand) is

$$
\E[N_w] = (L - k + 1)\prod_{i=1}^{k}p_{w_i}.
$$ {#eq-words}

With equal base frequencies this is $(L - k + 1)/4^k$: a particular 6-mer is expected about once every $4^6 = 4{,}096$ bases. If occurrences are rare and the word cannot overlap itself, $N_w$ is approximately Poisson, so the probability of no occurrence is approximately $e^{-\E[N_w]}$.
:::

::: proof
There are $L - k + 1$ starting positions. Let $I_j$ be 1 if $w$ occurs starting at position $j$ and 0 otherwise. By independence, $\Prob(I_j = 1) = \prod_i p_{w_i}$, and $N_w = \sum_j I_j$, so linearity of expectation (which needs no independence between the $I_j$) gives [[#eq-words]]. The indicators of nearby positions are dependent, but if $w$ cannot overlap a shifted copy of itself, two occurrences cannot start within $k$ positions of each other, the dependence is weak, and the count of rare events is close to Poisson (the law of rare events; see [discrete random variables](/learn/maths/lesson.php?c=probability&l=discrete-random-variables) in Maths Atlas).
:::

The condition about overlap matters. A word such as `AAAA` can overlap itself (`AAAAA` contains two occurrences), so its occurrences come in clumps: the expected count is still given by [[#eq-words]], but the variance is larger than Poisson and the probability of no occurrence is higher than $e^{-\E[N_w]}$. Exact treatments of word statistics, which account for self-overlap, were worked out in the 1980s and are summarised in Waterman's *Introduction to Computational Biology* (1995).

::: widget plot
f: exp(-x/4^k)
x: 0, 20000
y: 0, 1
sliders: k=6:4:8:1
labels: P(\text{no site in } x \text{ bp})
caption: The Poisson approximation from [[#prop-words]] to the probability that a random sequence of $x$ base pairs, with equal base frequencies, contains no occurrence of a particular non-overlapping word of length $k$. Move the slider: a 4-base word (a "4-cutter" restriction site) is almost certain to occur within 2 kb, a 6-mer has a 37 % chance of being absent from 4 kb, and an 8-mer is often absent from 20 kb. This is why 6-cutters give fragments of a few kilobases and 8-cutters much longer ones.
:::

::: example EcoRI sites in phage lambda {#ex-ecori}
The genome of bacteriophage lambda (`NC_001416`) is 48,502 bp long and its GC content is close to 50 %. How many sites for the restriction enzyme *Eco*RI, `GAATTC`, would a random sequence of this length contain? The real genome has 5. Is that surprising?
::: solution
With equal base frequencies, [[#eq-words]] gives $\E[N] = (48{,}502 - 5)/4^6 = 48{,}497/4{,}096 = 11.84$. Because `GAATTC` is its own reverse complement, a site on one strand is a site on the other, so counting one strand counts every site once. (`GAATTC` cannot overlap itself either: no proper suffix of it equals a prefix of the same length.)

Under the Poisson approximation the probability of 5 or fewer sites is

$$
\Prob(N \le 5) = \sum_{j=0}^{5}e^{-11.84}\frac{11.84^j}{j!} = 0.022.
$$

Five sites is therefore unusually few for a random sequence of this length and composition. The deficit is real and has a biological explanation: many bacteriophages are depleted of the recognition sites of the restriction enzymes of their hosts, which are a defence against them. A hypothesis test like this one cannot prove the explanation, but it identifies a pattern worth explaining.
:::
:::

::: widget distribution
dist: poisson
params: lambda=11.84
a: 0
b: 5
caption: The number of *Eco*RI sites expected in a random 48.5 kb sequence, Poisson with mean 11.84, with the probability of 5 or fewer sites — the number actually found in phage lambda — shaded. Notice how far in the left tail the observed value lies.
:::

## Programming for biologists

There is no bioinformatics without programming. Most analyses chain together well-tested programs — an aligner, a variant caller, a statistics package — but the glue between them, the checks on their output, the filtering and the plots are written by the analyst, usually in Python or R. The level needed to start is modest: reading a file line by line, storing sequences in strings and dictionaries, looping, and writing results. Libraries such as Biopython (for Python) and Bioconductor (for R) provide parsers for every format above, and should be used in real work; the point of writing a parser once yourself is to understand what the library does.

The following listing, in standard-library Python, reads a FASTA file, computes GC content, reverse complements and translates a sequence in all six frames, and counts dinucleotides.

```python
from collections import Counter

fasta = """>seq1 a short made-up coding sequence
ATGGCTAAAGGCGAAGAACTG
TTCACCGGTTAA
>seq2 its reverse strand partner
TTAACCGGTGAACAGTTCTTC
GCCTTTAGCCAT
"""

def read_fasta(text):
    """Return a dict {identifier: sequence} from FASTA-formatted text."""
    records, name = {}, None
    for line in text.splitlines():
        if line.startswith(">"):
            name = line[1:].split()[0]          # identifier = first word after '>'
            records[name] = []
        elif name is not None:
            records[name].append(line.strip().upper())
    return {k: "".join(v) for k, v in records.items()}

COMPLEMENT = str.maketrans("ACGTN", "TGCAN")

def revcomp(s):
    return s.translate(COMPLEMENT)[::-1]

def gc(s):
    return (s.count("G") + s.count("C")) / len(s)

BASES = "TCAG"
AMINO = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG"
CODE = {a + b + c: AMINO[16 * i + 4 * j + k]
        for i, a in enumerate(BASES) for j, b in enumerate(BASES) for k, c in enumerate(BASES)}

def translate(s, frame=0):
    return "".join(CODE.get(s[i:i + 3], "X") for i in range(frame, len(s) - 2, 3))

seqs = read_fasta(fasta)
s1 = seqs["seq1"]
print(len(s1), round(gc(s1), 3))                 # length in nt, GC fraction
print(revcomp(s1) == seqs["seq2"])               # is seq2 the reverse complement?
print(translate(s1))                             # frame +1
for f in range(3):                               # the three frames of the other strand
    print(-(f + 1), translate(revcomp(s1), f))
print(Counter(s1[i:i + 2] for i in range(len(s1) - 1)).most_common(3))
```

It prints

```
33 0.455
True
MAKGEELFTG*
-1 LTGEQFFAFSH
-2 *PVNSSSPLA
-3 NR*TVLRL*P
[('AA', 5), ('GG', 3), ('TG', 2)]
```

Three details are worth noticing. The genetic code is stored as a 64-character string indexed by the codon, with the bases in the order `T`, `C`, `A`, `G` used in printed codon tables — a compact and checkable representation. Codons containing an ambiguity code are translated as `X` rather than causing an error. And the dictionary of sequences is keyed by the identifier, the first word of the header, which is the convention all tools follow; descriptions with spaces should never be used as keys.

::: intuition Why dictionaries and k-mers are everywhere
Many bioinformatics algorithms rest on a single trick: cut sequences into $k$-mers and put them in a hash table (a Python dictionary), so that every occurrence of a word can be found in constant time instead of by scanning ([hash tables](/learn/cs/lesson.php?c=data-structures&l=hash-tables) in Computer Science Atlas). BLAST seeds alignments this way ([[bioinformatics/database-search]]), assemblers build their graphs from $k$-mers ([[bioinformatics/assembly-variants]]), and fast RNA-seq quantifiers match reads to transcripts by their $k$-mers ([[bioinformatics/expression-analysis]]). The `Counter` in the last line of the listing is the smallest example.
:::

### Reproducible analysis

A result in bioinformatics is the output of a chain of programs, each with versions, parameters and inputs. Reproducing it requires all of them. The habits that make this possible are simple and widely taught.

- **Keep raw data read-only** and record where and when it was downloaded, with accessions and versions.
- **Script everything.** A sequence of commands typed into a terminal cannot be rerun; a script can. Workflow managers such as Snakemake and Nextflow record the dependencies between steps and rerun only what changed.
- **Record software versions**, ideally by running tools in a defined environment (a conda environment or a container).
- **Use version control** (git) for code and notes.
- **Check intermediate results** against things you know — the number of reads, the length of a known gene, the translation of a known protein.

The FAIR principles — data should be Findable, Accessible, Interoperable and Reusable — published by Mark Wilkinson and colleagues in 2016, express the same aims for the databases themselves.

::: warning Spreadsheets and gene names
Spreadsheet programs silently convert some gene symbols to dates: *SEPT2* becomes "2-Sep" and *MARCH1* "1-Mar". A 2016 survey by Mark Ziemann, Yotam Eren and Assam El-Osta found such errors in the supplementary files of about a fifth of genomics papers that included gene lists in Excel files. The HUGO Gene Nomenclature Committee renamed the affected human genes in 2020 (*SEPT2* is now *SEPTIN2*, *MARCH1* is *MARCHF1*), but the general lesson remains: keep data in plain text, read it with code, and never let a program "helpfully" reformat identifiers.
:::

::: history
Dayhoff's *Atlas* (1965) was the first sequence database; she also devised the one-letter amino-acid code that it used. The Protein Data Bank was founded at Brookhaven National Laboratory in 1971 with seven structures. The EMBL Nucleotide Sequence Data Library was established in Heidelberg in 1980 and GenBank at Los Alamos National Laboratory in 1982, joined by the DNA Data Bank of Japan in 1986; by the late 1980s the three were exchanging data in what became the INSDC, and GenBank moved to the newly founded NCBI in 1992. Amos Bairoch started Swiss-Prot in 1986, and it merged with the Protein Information Resource and TrEMBL to form UniProt in 2002. Pearson and Lipman's FASTA program (1988) gave its name to the simplest sequence format, and the release of the first complete genomes — the bacterium *Haemophilus influenzae* in 1995, the yeast *Saccharomyces cerevisiae* in 1996, and the human draft in 2001 — turned databases from collections into the infrastructure of biology.
:::

::: summary
- To a computer a sequence is a string over an alphabet ([[#def-sequence]]); DNA has two strands, so searches must consider the reverse complement ([[#def-revcomp]]) and six reading frames.
- FASTA stores sequences; FASTQ adds a Phred quality per base, $Q = -10\log_{10}P(\text{error})$ encoded as ASCII $Q + 33$ ([[#def-fasta]]); GenBank, GFF and BED hold annotation, SAM/BAM alignments and VCF variants.
- GFF, SAM and VCF are one-based and closed; BED and Python are zero-based and half-open ([[#def-coordinates]]). Conversions are a common source of off-by-one errors.
- INSDC (GenBank, ENA, DDBJ) archives what is submitted; RefSeq, UniProtKB/Swiss-Prot, Ensembl and Pfam curate and annotate it; the PDB archives structures. Cite accessions with versions, and date database sizes.
- In a random sequence a word of length $k$ is expected $(L - k + 1)\prod p_{w_i}$ times ([[#prop-words]]), about once per $4^k$ bases; departures from this expectation are clues to biology.
- Analyses should be scripted, versioned and checked against known results; plain text and code avoid silent reformatting.
:::

## Exercises

::: exercise Reverse complement {level=1}
Write the reverse complement of `5'-GATTACACCG-3'`, and say whether `5'-GGATCC-3'` (the *Bam*HI site) is palindromic.
::: solution
Complementing gives `CTAATGTGGC` (read 3′→5′); reversing gives `5'-CGGTGTAATC-3'`. For `GGATCC`, the complement is `CCTAGG` and its reverse is `GGATCC`, the same sequence, so the site is palindromic: it reads the same 5′→3′ on both strands.
:::
:::

::: exercise Phred scores {level=1 check="0.0631"}
A base has Phred quality 12. What is the probability that it is wrong (three significant figures)? What character represents it in Phred+33 encoding?
::: solution
$P = 10^{-12/10} = 10^{-1.2} = 0.0631$. The character has ASCII code $12 + 33 = 45$, which is `-`.
:::
:::

::: exercise Converting coordinates {level=1}
A GFF3 line describes an exon at positions 2,501–2,620 on the plus strand. (a) How long is it? (b) Write its start and end as a BED interval. (c) Write the Python slice that extracts it from a string `chrom` holding the chromosome.
::: solution
(a) $2{,}620 - 2{,}501 + 1 = 120$ bases. (b) BED `2500 2620`. (c) `chrom[2500:2620]`, which has length $2{,}620 - 2{,}500 = 120$.
:::
:::

::: exercise A 4-cutter {level=2 check="39.06"}
How many sites for a 4-base, non-overlapping recognition sequence are expected in 10,000 bp of random sequence with equal base frequencies? Give two decimal places, ignoring the edge correction $L - k + 1$.
::: solution
$10{,}000/4^4 = 10{,}000/256 = 39.06$ sites, so the mean fragment length after digestion is about 256 bp.
:::
:::

::: exercise Base composition changes expectations {level=2 check="324"}
A bacterial genome of $10^6$ bp has a GC content of 40 % (so $p_\mathtt{G} = p_\mathtt{C} = 0.2$ and $p_\mathtt{A} = p_\mathtt{T} = 0.3$). How many occurrences of `GAATTC` does [[#prop-words]] predict (ignore the edge correction)? Compare with a genome of equal base frequencies.
::: solution
The word contains one `G`, one `C`, two `A` and two `T`: $\prod p = 0.2^2\times0.3^4 = 0.04\times0.0081 = 3.24\times10^{-4}$, so $\E[N] = 324$. With equal frequencies $\E[N] = 10^6/4{,}096 = 244$. AT-rich words are more common in AT-rich genomes: an expectation must use the composition of the genome studied, not $1/4^k$.
:::
:::

::: exercise Storing a genome {level=2}
(a) How many bytes are needed to store the 3.1 Gb human genome at 2 bits per base? (b) Why is a plain-text FASTA file of it about four times larger? (c) A 30-fold whole-genome sequencing run in FASTQ format (reads of 150 bases) is uncompressed roughly how large, assuming each base costs about two bytes (the base and its quality) plus a header line of about 50 bytes per read? Treat the answer as an order-of-magnitude estimate.
::: solution
(a) $3.1\times10^9\times2/8 = 7.75\times10^8$ bytes, about 775 MB.

(b) A text file uses one byte (8 bits) per base, plus line endings and headers, so about 3.1–3.2 GB. It also has to represent `N` and lower-case letters (often used to mark repeats), which a 2-bit code cannot.

(c) The run has $30\times3.1\times10^9 = 9.3\times10^{10}$ bases, so about $1.9\times10^{11}$ bytes of bases and qualities. There are $9.3\times10^{10}/150 = 6.2\times10^8$ reads, whose headers add about $3\times10^{10}$ bytes. The total is of the order of 200 GB uncompressed. Quality strings compress poorly, which is why reference-based formats such as CRAM, and quality binning, are used for archiving.
:::
:::

::: exercise Self-overlapping words {level=3}
(a) Show that the word `ATA` can overlap itself but `ATG` cannot. (b) In a random sequence with equal base frequencies, the expected numbers of occurrences of `ATA` and `ATG` in 1,000 bp are equal. Explain why the probability that `ATA` is absent is nevertheless larger than for `ATG`. (c) For which of the two is the Poisson approximation better?
::: solution
(a) A word overlaps itself if a proper suffix equals a prefix of the same length. For `ATA` the suffix `A` equals the prefix `A`, so `ATATA` contains two occurrences sharing a base. For `ATG` the suffixes `G` and `TG` differ from the prefixes `A` and `AT`, so two occurrences cannot overlap.

(b) Both have $\E[N] = 998/64 = 15.6$. Given an occurrence of `ATA`, the probability that another starts two positions later is $1/16$ (it needs `TA` next), so occurrences tend to come in clumps. With the same mean, a clumped count has more variance: more probability on large counts must be balanced by more on small ones, including zero.

(c) For `ATG`, whose occurrences are nearly independent and cannot clump. For self-overlapping words a compound Poisson distribution (Poisson numbers of clumps, each containing a geometric number of occurrences) is the better approximation.
:::
:::

::: exercise Interpreting a word count {level=3}
In a 4.6 Mb bacterial genome with equal base frequencies, the 8-mer `GCTGGTGG` (the Chi site of *E. coli*, which stimulates recombinational repair by the RecBCD enzyme) would be expected about 70 times by [[#prop-words]]. It actually occurs about a thousand times in the *E. coli* K-12 genome, strongly biased towards one strand in each half of the chromosome. (a) Verify the expectation. (b) What does the excess suggest? (c) Why is the bias in strand orientation additional evidence, beyond the count alone?
::: solution
(a) $4.6\times10^6/4^8 = 4.6\times10^6/65{,}536 = 70$.

(b) A count more than ten times the random expectation (the probability under a Poisson model with mean 70 is astronomically small) suggests that the word has been favoured by selection — here because Chi sites help RecBCD to repair double-strand breaks without destroying the chromosome. The random model is only a null model: base composition and codon usage also make some words more common, so a careful analysis compares against a model that preserves them (for example a Markov chain fitted to the genome).

(c) A purely compositional explanation would affect both strands alike. A strong orientation bias that switches at the origin and terminus of replication links the word to a process that depends on the direction of replication, as RecBCD-mediated repair of collapsed replication forks does. Strand bias is therefore evidence of function that a raw count cannot provide.
:::
:::
