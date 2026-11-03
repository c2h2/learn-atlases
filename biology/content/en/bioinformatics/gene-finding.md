When the first complete genome of a free-living organism, the 1.83 Mb chromosome of *Haemophilus influenzae*, was published in 1995, the sequence itself was only half of the result. The other half was a list of 1,743 predicted protein-coding genes, each with its coordinates, its likely function where a database search could suggest one, and a large fraction of "hypothetical proteins" of unknown function. That list — the **annotation** — is what most biologists use; a genome without it is a string of letters. Every new genome since has needed the same work, and the methods have had to scale from bacterial chromosomes, where genes are dense and continuous, to plant and animal genomes in which coding sequence is scattered in exons across a background that is mostly something else.

This chapter covers how genes and other functional elements are found computationally. We start with open reading frames and Markov models of coding sequence in prokaryotes, use CpG islands to introduce posterior decoding with hidden Markov models, build the gene-structure HMMs used for eukaryotes, see how modern pipelines combine such predictions with evidence from transcripts and proteins, and finish with the discovery of regulatory motifs. Hidden Markov models, the forward and Viterbi algorithms and position weight matrices are assumed from [[bioinformatics/multiple-alignment]]; the composition of genomes, including the statistics of random open reading frames, is in [[genomics/genome-architecture]].

## Genes in prokaryotic genomes

In bacteria and archaea, about 85–90 % of the genome is protein-coding, genes have no introns, and each gene is an open reading frame (ORF) from a start codon to a stop codon. The obvious method is to list long ORFs. Its weakness is that random sequence also contains ORFs: in sequence with equal base frequencies, 3 of the 64 codons are stops, so the length of a stop-free stretch is geometrically distributed with mean $64/3 \approx 21$ codons ([[genomics/genome-architecture]]).

::: example Chance ORFs in a bacterial genome {#ex-orfs}
In random sequence with equal base frequencies, what fraction of stop-free stretches extend at least 100 codons? About how many such stretches would a random 5 Mb genome contain, counting all six frames? How does a GC content of 65 % change the picture?
::: solution
Each codon is a stop with probability $3/64$, so a stretch survives 100 codons without a stop with probability $(61/64)^{100} = 0.0082$. Each frame of a 5 Mb sequence contains about $5\times10^6/3$ codons and hence about $5\times10^6/64 = 78{,}000$ stops, so the six frames hold about 470,000 stop-to-stop stretches, of which $0.0082\times470{,}000 \approx 3{,}900$ would be at least 100 codons long — comparable to the number of real genes in *E. coli*.

At 65 % GC, $p_\mathtt{A} = p_\mathtt{T} = 0.175$ and $p_\mathtt{G} = p_\mathtt{C} = 0.325$. The stops `TAA`, `TAG` and `TGA` are AT-rich, with total probability $0.175^3 + 2\times0.175^2\times0.325 = 0.025$, so the mean stop-free stretch is about 40 codons and 7.7 % of stretches exceed 100 codons. Long ORFs arise easily by chance in GC-rich genomes, and length alone becomes a poor guide to genes. (Real genomes are not random, and real genes overlap the spurious ORFs on other frames, but the conclusion stands.)
:::
:::

::: widget plot
f: (1 - ((1 - c)/2)^3 - 2*((1 - c)/2)^2*(c/2))^x
x: 0, 300
y: 0, 1
sliders: c=0.5:0.25:0.75:0.01
labels: P(\text{no stop in } x \text{ codons})
caption: The probability that a stretch of random sequence with GC content $c$ (slider) runs for $x$ codons without a stop codon. At $c = 0.5$ it is $(61/64)^x$, and stretches of 100 codons are rare (0.8 %). Move the slider to 0.7: the AT-rich stop codons become rare, and chance ORFs of 100 codons become common. At 0.3 the curve falls steeply and almost every long ORF is a gene.
:::

### Coding statistics

Coding sequence differs from non-coding sequence in more than the absence of stops. The genetic code, codon usage, and the amino-acid composition of proteins impose a characteristic pattern with period three, and short-range dependencies between neighbouring bases differ between coding and non-coding DNA. **Markov chain** models capture both.

::: definition Markov chain model of a sequence {#def-markov-seq}
A **Markov chain of order $k$** models a sequence by letting the probability of each base depend on the $k$ preceding bases:

$$
\Prob(x) = \Prob(x_1\cdots x_k)\prod_{i=k+1}^{n}a(x_{i-k}\cdots x_{i-1}\to x_i),
$$

where the transition probabilities $a(w\to b)$ are estimated from training sequences as the frequency with which $(k$-mer $w)$ is followed by $b$. A **three-periodic** (inhomogeneous) chain for coding sequence uses three sets of transition probabilities, one for each codon position.
:::

::: proposition Log-likelihood ratio score {#prop-llr}
Given two Markov chain models of the same order, $+$ (for example coding, or CpG island) and $-$ (non-coding, or background), with transition probabilities $a^+$ and $a^-$, the log-likelihood ratio of a sequence $x$ (ignoring the first $k$ bases) is

$$
S(x) = \log_2\frac{\Prob(x\mid +)}{\Prob(x\mid -)} = \sum_{i=k+1}^{n}\log_2\frac{a^+(x_{i-k}\cdots x_{i-1}\to x_i)}{a^-(x_{i-k}\cdots x_{i-1}\to x_i)},
$$ {#eq-llr}

a sum of one term per base. $S > 0$ favours the $+$ model. Dividing by the length gives a score per base, comparable across sequences of different lengths.
:::

::: proof
Both probabilities factorise as products of transition probabilities by [[#def-markov-seq]]; the ratio of products is the product of ratios, and the logarithm turns it into a sum. The initial term $\Prob(x_1\cdots x_k)$ is assumed equal under both models or neglected.
:::

Mark Borodovsky and James McIninch's **GeneMark** (1993) scored each ORF in each frame with three-periodic fifth-order Markov chains and became the standard for bacterial genomes; **Glimmer** (Arthur Delcher, Steven Salzberg and colleagues, 1998–99) introduced *interpolated* Markov models, which use long contexts where training data are abundant and fall back to shorter ones where they are not; **Prodigal** (Doug Hyatt and colleagues, 2010) added careful modelling of start codons and ribosome-binding sites. These methods are trained on the genome itself, typically starting from its longest ORFs, so no external training set is needed. For prokaryotic genomes they predict nearly all real genes; the residual errors are mostly in short genes and in the choice of start codon.

## CpG islands and posterior decoding

In vertebrate genomes, the dinucleotide `CG` (usually written CpG, the p denoting the phosphate between them) is strongly depleted: in the human genome it occurs at about a quarter of the frequency expected from the frequencies of `C` and `G`. The reason is chemical. The cytosine of most CpGs is methylated, and 5-methylcytosine deaminates spontaneously to thymine, so CpGs mutate to `TG` and `CA` roughly ten times faster, or more, than other dinucleotides ([[genomics/epigenomics]]). The exceptions are **CpG islands**, stretches of a few hundred to a few thousand bases in which CpG is not depleted, which are usually unmethylated and lie at the promoters of about two thirds of human genes. Finding islands is therefore a way of finding promoters, and it is the classic first application of hidden Markov models to DNA (the example of Durbin and colleagues' textbook).

The traditional definition, from Margaret Gardiner-Garden and Marianne Frommer (1987), is a region of at least 200 bp with GC content above 50 % and a ratio of observed to expected CpG above 0.6, where

$$
\frac{\text{observed}}{\text{expected}} = \frac{N_\mathtt{CG}\,L}{N_\mathtt{C}\,N_\mathtt{G}}
$$ {#eq-cpg-oe}

for a window of length $L$ containing $N_\mathtt{C}$ `C`s, $N_\mathtt{G}$ `G`s and $N_\mathtt{CG}$ CpG dinucleotides. Daiya Takai and Peter Jones (2002) proposed stricter thresholds (500 bp, 55 %, 0.65) to exclude repeats.

::: example Is this window an island? {#ex-cpg}
Two 1,000-bp windows are analysed. Window 1 contains 300 `C`, 280 `G` and 70 CpG; window 2 contains 200 `C`, 210 `G` and 9 CpG. Compute their GC contents and observed/expected CpG ratios.
::: solution
Window 1: GC content $580/1{,}000 = 58\%$; observed/expected $= 70\times1{,}000/(300\times280) = 0.83$. It satisfies both criteria: a candidate island.

Window 2: GC content 41 %; observed/expected $= 9\times1{,}000/(200\times210) = 0.21$, typical of bulk human DNA, with CpG strongly depleted.
:::
:::

Windows and thresholds give yes-or-no answers that depend on where the window falls. A model-based alternative compares a Markov chain trained on known islands with one trained on the rest of the genome. With first-order chains, the scores of [[#prop-llr]] depend on dinucleotides, and the key term is the transition $\mathtt C\to\mathtt G$, which is several times more probable in islands.

::: example Scoring a short sequence {#ex-llr}
In (illustrative) first-order models, $a^+(\mathtt C\to\mathtt G) = 0.27$ and $a^-(\mathtt C\to\mathtt G) = 0.08$, while $a^+(\mathtt G\to\mathtt C) = 0.34$ and $a^-(\mathtt G\to\mathtt C) = 0.25$. Compute the log-likelihood ratio score of `CGCG`.
::: solution
The transitions are `C`→`G`, `G`→`C`, `C`→`G`:

$$
S = 2\log_2\frac{0.27}{0.08} + \log_2\frac{0.34}{0.25} = 2\times1.755 + 0.444 = 3.95\ \text{bits}.
$$

Four bases already give odds of about $2^{3.95} \approx 15$ to 1 in favour of the island model, mostly from the two CpGs. Scored over a long window, such scores separate islands from bulk DNA much more sharply than GC content alone.
:::
:::

To find where islands begin and end, the two chains are combined into one hidden Markov model with an "island" and a "background" state, and the sequence is decoded. In [[bioinformatics/multiple-alignment]] we found the single most probable path with the Viterbi algorithm. Often more useful is the probability that each position belongs to an island, taking all paths into account.

::: proposition Posterior decoding {#prop-posterior}
Let $f_k(i) = \Prob(x_1\cdots x_i, \pi_i = k)$ be the forward variables of an HMM and define the **backward variables** $b_k(i) = \Prob(x_{i+1}\cdots x_n\mid\pi_i = k)$, computed from $b_k(n) = 1$ by

$$
b_k(i) = \sum_la_{kl}\,e_l(x_{i+1})\,b_l(i+1).
$$

Then the posterior probability that position $i$ is in state $k$ is

$$
\Prob(\pi_i = k\mid x) = \frac{f_k(i)\,b_k(i)}{\Prob(x)}.
$$ {#eq-posterior}
:::

::: proof
By the Markov property, given $\pi_i = k$ the symbols after position $i$ are independent of the symbols up to $i$. Hence $\Prob(x, \pi_i = k) = \Prob(x_1\cdots x_i, \pi_i = k)\,\Prob(x_{i+1}\cdots x_n\mid\pi_i = k) = f_k(i)b_k(i)$, and dividing by $\Prob(x)$ gives [[#eq-posterior]]. The recursion for $b_k(i)$ conditions on the state at $i + 1$, exactly as the forward recursion conditions on the state at $i - 1$.
:::

The following listing decodes a simulated sequence with a simplified two-state island model that uses base composition only (real island models also use the CpG transitions). Products of probabilities over a thousand positions underflow ordinary floating-point numbers, so the forward values are rescaled to sum to 1 at each step and the backward values are divided by the same factors.

```python
import random

states = ("island", "background")
start = {"island": 0.01, "background": 0.99}
trans = {"island": {"island": 0.995, "background": 0.005},
         "background": {"island": 0.002, "background": 0.998}}
emit = {"island": {"A": 0.15, "C": 0.35, "G": 0.35, "T": 0.15},
        "background": {"A": 0.30, "C": 0.20, "G": 0.20, "T": 0.30}}

def posterior(x):
    """Forward-backward with scaling: P(state at i = island | whole sequence)."""
    n = len(x)
    f, scale = [], []
    prev = {k: start[k] * emit[k][x[0]] for k in states}
    for i in range(n):
        if i:
            prev = {l: emit[l][x[i]] * sum(f[-1][k] * trans[k][l] for k in states) for l in states}
        c = sum(prev.values())
        scale.append(c)
        f.append({k: v / c for k, v in prev.items()})       # scaled forward values
    b = [None] * n
    b[-1] = {k: 1.0 for k in states}
    for i in range(n - 2, -1, -1):
        b[i] = {k: sum(trans[k][l] * emit[l][x[i + 1]] * b[i + 1][l] for l in states) / scale[i + 1]
                for k in states}
    return [f[i]["island"] * b[i]["island"] for i in range(n)]

rng = random.Random(7)
draw = lambda probs, n: "".join(rng.choices("ACGT", weights=[probs[c] for c in "ACGT"], k=n))
x = draw(emit["background"], 400) + draw(emit["island"], 300) + draw(emit["background"], 400)
post = posterior(x)
for w in range(0, len(x), 100):                     # mean posterior in 100-bp windows
    window = post[w:w + 100]
    print(f"{w:5d}-{w + 99:<5d} GC {sum(c in 'GC' for c in x[w:w + 100]):3d}%  P(island) {sum(window) / len(window):.2f}")
```

```
    0-99    GC  43%  P(island) 0.00
  100-199   GC  35%  P(island) 0.00
  200-299   GC  41%  P(island) 0.01
  300-399   GC  36%  P(island) 0.08
  400-499   GC  73%  P(island) 0.99
  500-599   GC  66%  P(island) 1.00
  600-699   GC  66%  P(island) 0.98
  700-799   GC  30%  P(island) 0.03
  800-899   GC  38%  P(island) 0.00
  900-999   GC  44%  P(island) 0.01
 1000-1099  GC  35%  P(island) 0.00
```

The simulated island occupies positions 400–699, and the posterior recovers it, with slight uncertainty at its edges (the small values in the windows on either side). The transition probabilities encode prior expectations about lengths: a self-transition of 0.995 means islands last 200 bases on average, and 0.998 means background stretches of 500. Notice also that the window 0–99, with 43 % GC, is not called an island: one GC-rich stretch is not enough to overcome the low prior probability of entering the island state.

## Genes in eukaryotic genomes

Eukaryotic genes are harder. In the human genome about 1–2 % of the sequence is protein-coding, a typical gene has around ten exons separated by introns that are often thousands of bases long, and much of the coding signal of an exon is a hundred or so bases surrounded by sequence that looks almost the same. A gene finder must identify the signals that bound each exon — the start codon, the **splice donor** (5′ splice site, almost always beginning `GT` in the intron), the **splice acceptor** (3′ splice site, ending `AG`, preceded by a pyrimidine-rich tract and a branch point), and the stop codon — and assemble exons into a structure in which the reading frame is maintained across every intron ([[molecular-biology/rna-processing]]). About 99 % of human introns follow the `GT`…`AG` rule, most of the rest are `GC`…`AG`, and a small minority, spliced by the minor spliceosome, are `AT`…`AC`.

Signals are modelled by position weight matrices or short Markov models ([[bioinformatics/multiple-alignment#def-pssm]]), and content — coding or non-coding — by three-periodic Markov chains. What ties them together is a grammar: an initial exon must be followed by an intron, then an internal or terminal exon, and the phase of the reading frame must be carried across each intron.

::: definition Generalised hidden Markov model {#def-ghmm}
A **generalised** (or semi-Markov) hidden Markov model is an HMM in which each state, when entered, emits a whole segment of sequence whose length is drawn from a state-specific length distribution $\Prob_k(\ell)$, and whose content is scored by a state-specific model (a Markov chain, a weight matrix, or both). Transitions occur between segments. For a gene model, the states are segment types — intergenic region, initial exon, internal exon, terminal exon, single-exon gene, intron (in three phases, according to where in a codon it interrupts the frame), and the corresponding states on the reverse strand — and the transitions encode which segments may follow which.
:::

Ordinary HMMs implicitly give every state a geometric length distribution (with self-transition $a$, the length is $\ell$ with probability $a^{\ell-1}(1 - a)$, most probably 1). Real exons have a peaked length distribution, with very short and very long internal exons both rare, so explicit length distributions are a large improvement. The price is computational: the Viterbi algorithm must consider, at each position, every possible length of the segment ending there, though in practice lengths are bounded by the positions of stop codons and splice signals.

::: widget plot
f: (1/m)*(1 - 1/m)^(x - 1); exp(-(ln(x) - ln(m))^2/(2*0.25))/(x*0.5*sqrt(2*pi))
x: 1, 600
y: 0, 0.02
sliders: m=150:50:300:10
labels: \text{geometric (ordinary HMM state)}; \text{peaked (explicit length model)}
caption: Two length distributions for an exon state with typical length $m$ (slider), drawn for illustration: the geometric distribution implied by a single HMM state with self-transition $1 - 1/m$ (mean $m$), and a peaked log-normal distribution with median $m$, the kind of shape real internal exons have. The geometric curve is highest at length 1 and gives very short exons more probability than any other length; the peaked curve makes both very short and very long exons unlikely. A generalised HMM can use the second shape directly.
:::

Chris Burge and Samuel Karlin's **GENSCAN** (1997) was the first gene finder of this kind to perform well on human genes, predicting most exons correctly from sequence alone, and it was used to annotate the draft human genome. Its successors — **AUGUSTUS** (Mario Stanke and Stephan Waack, 2003), **SNAP** and others — follow the same design, trained separately for each species or clade because signals and composition vary.

::: example Keeping the frame {#ex-phase}
A predicted gene on the plus strand has three coding exons at one-based positions 1,001–1,120, 2,501–2,607 and 4,001–4,193, starting with `ATG` at 1,001 and ending with a stop codon at 4,191–4,193. (a) Is the total length consistent with a complete coding sequence? (b) Where in a codon does each intron fall? (c) How many amino acids does the protein have? (d) What would happen if the third exon actually began at 4,002?
::: solution
(a) The exons have lengths 120, 107 and 193, total 420. A coding sequence including its stop codon must be a multiple of 3, and $420 = 3\times140$, so the structure is consistent.

(b) Count the bases of coding sequence before each intron. Before intron 1 there are $120 = 3\times40$, so the intron falls between codons (phase 0, in the convention that counts the bases of an incomplete codon at the end of the exon). Before intron 2 there are $227 = 3\times75 + 2$, so intron 2 interrupts a codon after its second base (phase 2): the codon is completed by the first base of exon 3. (GFF files record a related but different quantity in their "phase" column: the number of bases to skip at the start of a CDS feature to reach the next codon.)

(c) 140 codons, of which the last is the stop: 139 amino acids.

(d) The third exon would have 192 bases and the total would be 419, not a multiple of 3; the stop codon at 4,191–4,193 would no longer be in frame, and translation would continue in another frame. Gene finders enforce exactly this bookkeeping: each exon must begin at a plausible acceptor and end at a plausible donor, and its length must carry the reading frame correctly into the next exon.
:::
:::

### Annotation with evidence

Gene predictions from sequence alone, however sophisticated, are hypotheses. Since the 2000s, genome annotation has been driven mainly by **evidence**:

- **Transcripts.** RNA-sequencing reads aligned to the genome by spliced aligners reveal exons and introns directly; long reads (PacBio Iso-Seq, Oxford Nanopore cDNA) sequence whole transcripts and resolve alternative isoforms.
- **Proteins.** Alignments of known proteins from related species to the genome (spliced protein-to-genome alignment) locate conserved genes and their exon boundaries.
- **Conservation.** Comparative genomics distinguishes coding sequence by its pattern of substitution, in which synonymous changes are frequent and non-synonymous changes rare across many species (PhyloCSF, Michael Lin, Irwin Jungreis and Manolis Kellis, 2011), and finds conserved non-coding elements ([[genomics/comparative-genomics]]).

Pipelines such as **MAKER** (Brandi Cantarel, Mark Yandell and colleagues, 2008), **BRAKER** (Katharina Hoff, Stanke and colleagues, from 2016), the **Ensembl** gene-annotation pipeline and NCBI's **Eukaryotic Genome Annotation Pipeline** combine evidence with ab initio predictions, usually by training a gene finder on the genes the evidence supports and letting it fill in the rest. Human reference annotation (GENCODE, from Ensembl and the HAVANA manual annotation group) adds expert curation; as of the mid-2020s it lists about 20,000 protein-coding genes and a larger number of long non-coding RNA genes, figures that still change with each release ([[genomics/genome-architecture]]).

Non-coding RNA genes need their own methods: tRNAs are found by **tRNAscan-SE** (Todd Lowe and Sean Eddy, 1997), and other structured RNAs by **covariance models**, which extend profile HMMs to capture the base pairing of RNA secondary structure, as in Infernal and the Rfam database. Completeness of an annotation is commonly checked with **BUSCO** (Felipe Simão, Evgeny Zdobnov and colleagues, 2015), which reports the fraction of a set of near-universal single-copy genes for the clade that are found.

::: warning "No ORF means no gene" and "every ORF is a protein"
Neither is true. Many genes produce no protein — ribosomal and transfer RNAs, small nuclear and nucleolar RNAs, microRNAs, and thousands of long non-coding RNAs — and a gene finder trained on protein-coding genes will not see them. Conversely, a long ORF may be a chance ORF, a pseudogene that has lost its function, or a frame on the opposite strand of a real gene, and many small ORFs (below 100 codons) do encode functional peptides but are missed by length thresholds. Annotations are predictions with uneven support; an entry labelled "predicted" or "hypothetical" should be treated as a hypothesis.
:::

## Finding regulatory motifs

Transcription factors bind short, degenerate DNA motifs, typically 6–20 bp long, in promoters and enhancers. If we have a set of sequences believed to share a binding site — promoters of co-regulated genes, or the peaks of a ChIP-seq experiment for one factor ([[genomics/functional-genomics]]) — can we find the motif without knowing it in advance? This is **motif discovery**: find a position weight matrix (and its sites) that is over-represented in the input relative to a background model.

Two approaches dominate. **Enumerative** methods count every $k$-mer (allowing some mismatches) and compare the counts with expectations from a background Markov model, as in [[bioinformatics/sequences-databases#prop-words]]; they are exhaustive for short motifs. **Probabilistic** methods fit a PWM directly: MEME (Timothy Bailey and Charles Elkan, 1994) uses the expectation–maximisation algorithm, and the **Gibbs sampler** of Charles Lawrence and colleagues (1993) uses Markov chain Monte Carlo.

::: algorithm Gibbs sampling for motif discovery (one site per sequence) {#alg-gibbs}
Given $N$ sequences and a motif width $w$:

1. Choose a starting position $z_i$ at random in each sequence $i$.
2. Repeat many times:
   1. Pick a sequence $i$ at random and remove its site.
   2. Build a PWM, with pseudocounts, from the sites in the other $N - 1$ sequences ([[bioinformatics/multiple-alignment#def-pssm]]).
   3. For every possible position $j$ in sequence $i$, compute the likelihood ratio $R_j = \Prob(\text{word at } j\mid\text{PWM})/\Prob(\text{word at } j\mid\text{background})$.
   4. Choose a new $z_i$ at random with probability proportional to $R_j$.
3. Report the PWM with the highest total score encountered, and its sites.
:::

Sampling rather than always taking the best position lets the algorithm escape poor starting points: a sequence's site moves towards positions that resemble the emerging motif, the motif sharpens, and the sites converge. Several runs from different starts are needed, and motifs found must be tested for significance against shuffled sequences or a background model, because a degenerate motif can always be fitted to random input. Discovered motifs are compared with collections of known binding preferences, such as JASPAR and the results of high-throughput binding assays.

::: example The futility of genome-wide scanning {#ex-futility}
A position weight matrix for a transcription factor is used to scan the human genome ($3.1\times10^9$ bp, both strands), calling a site wherever the score exceeds a threshold that random sequence exceeds with probability $10^{-5}$ per position. How many sites would be called by chance? What does this imply?
::: solution
There are about $2\times3.1\times10^9$ positions, so the expected number of chance hits is $6.2\times10^9\times10^{-5} = 62{,}000$. Even a stringent threshold predicts tens of thousands of sites, of which only a small fraction will be bound in any cell; and ChIP-seq experiments typically find a few thousand to tens of thousands of bound sites, many lacking a strong motif match. Wyeth Wasserman and Albin Sandelin (2004) called this the "futility theorem": a motif alone cannot predict functional binding sites in large genomes. Useful predictions combine motifs with context — clusters of sites, conservation, open chromatin measured by ATAC-seq or DNase-seq, and the presence of partner factors — which is what modern machine-learning models of regulation do ([[bioinformatics/machine-learning]]).
:::
:::

::: quiz
A PWM search of a 2 kb promoter finds a site scoring 9 bits. The motif's maximum possible score is 14 bits. Which conclusion is best justified?
- [ ] The factor binds this promoter, because 9 bits is a high score.
- [ ] The factor cannot bind, because the site is 5 bits below the best possible.
- [x] The site is a candidate whose significance depends on how often random sequence of this composition scores 9 bits or more, and on independent evidence of binding.
- [ ] The factor binds with $2^9$ times greater affinity than to random DNA.
::: solution
The score is a log-odds ratio of two sequence models, not an affinity or a binding measurement. A 9-bit match is expected roughly once every $2^9 = 512$ positions in background-like sequence (more precisely, the P-value must be computed from the score distribution of the matrix), so in 4,000 positions (2 kb, both strands) several such matches are expected by chance. Binding needs to be shown experimentally or supported by context such as conservation and open chromatin.
:::
:::

::: application From annotation to function
Annotation does not end with gene structures. Each predicted protein is searched against sequence and domain databases ([[bioinformatics/database-search]], Pfam and InterPro) and assigned Gene Ontology terms and enzyme numbers by similarity, which lets metabolic pathways be reconstructed for organisms that have never been cultured in a laboratory. This transfer of function by similarity is enormously productive and also the main source of annotation errors: once a wrong annotation enters the databases, it is copied to new genomes that match it. Experimental evidence codes in the Gene Ontology distinguish annotations backed by experiments from those inferred electronically, and they should be checked before an annotation is used as a premise.
:::

::: history
Russell Doolittle, Richard Staden and others analysed codon usage and coding statistics on the first sequenced genes in the early 1980s, and James Fickett's 1982 "TESTCODE" statistic distinguished coding from non-coding DNA by its periodicity. Adrian Bird described CpG islands in 1986, and Gardiner-Garden and Frommer gave the standard definition in 1987. GeneMark (1993) and Glimmer (1998) made bacterial gene finding routine, just as the first complete genomes appeared from 1995. David Kulp, David Haussler and colleagues built Genie, a generalised HMM for human genes, in 1996, and Burge and Karlin's GENSCAN (1997) became the standard ab initio gene finder for vertebrate genomes. Lawrence and colleagues' Gibbs sampler (1993) and Bailey and Elkan's MEME (1994) established probabilistic motif discovery.
:::

::: summary
- Prokaryotic genes are ORFs, but random sequence contains many ORFs, especially at high GC; coding regions are recognised by three-periodic Markov chain models of coding sequence (GeneMark, Glimmer, Prodigal) scored by log-likelihood ratios ([[#prop-llr]]).
- CpG islands, unmethylated GC-rich regions at many vertebrate promoters, are found by window criteria (length, GC content, observed/expected CpG) or by HMMs; posterior decoding, $\Prob(\pi_i = k\mid x) = f_k(i)b_k(i)/\Prob(x)$, gives the probability of each state at each position ([[#prop-posterior]]).
- Eukaryotic gene finders are generalised HMMs whose states emit whole exons, introns and intergenic regions with explicit length distributions, and enforce splice signals and the reading frame ([[#def-ghmm]]).
- Modern annotation combines ab initio prediction with transcript, protein and conservation evidence (MAKER, BRAKER, Ensembl, GENCODE); non-coding RNA genes need separate methods; BUSCO measures completeness.
- Motif discovery finds over-represented PWMs in sets of sequences by enumeration, expectation–maximisation (MEME) or Gibbs sampling ([[#alg-gibbs]]). A PWM alone predicts far more sites than are bound; context is essential.
:::

## Exercises

::: exercise Mean ORF length {level=1 check="64/3"}
In random sequence with equal base frequencies, what is the mean number of codons from one stop codon to the next in the same frame (including the stop)?
::: solution
The number of codons up to and including the first stop is geometric with success probability $3/64$, so its mean is $64/3 \approx 21.3$ codons.
:::
:::

::: exercise Observed and expected CpG {level=1 check="0.6"}
A 500-bp window contains 150 `C`, 150 `G` and 27 CpG dinucleotides. Compute the observed/expected CpG ratio of [[#eq-cpg-oe]].
::: solution
$27\times500/(150\times150) = 13{,}500/22{,}500 = 0.6$, exactly at the Gardiner-Garden–Frommer threshold. Its GC content, 60 %, satisfies the other criterion.
:::
:::

::: exercise Geometric lengths {level=1 check="0.995^99*0.005"}
In an ordinary HMM with self-transition probability 0.995 in the island state, what is the probability that an island lasts exactly 100 bases? (Give an exact expression.)
::: solution
Staying 99 times and then leaving: $0.995^{99}\times0.005 \approx 0.0030$. The geometric distribution's most probable length is 1, which is unrealistic for islands or exons; generalised HMMs replace it with an explicit length distribution.
:::
:::

::: exercise A splice-site score {level=2}
A donor-site PWM gives the following (illustrative) scores in bits for positions −2, −1 (last two exon bases) and +1 to +4 (first four intron bases): the consensus `AG|GTAA` scores $0.9, 1.5, 2.0, 2.0, 1.1, 0.8$; `G` at +1 and `T` at +2 are invariant in the training set, and all other bases at those positions score $-6$. (a) What is the score of the consensus? (b) A variant changes `T` at +2 to `C`. By how much does the score fall, and why might the variant affect splicing? (c) Why are the scores at +1 and +2 not $-\infty$?
::: solution
(a) $0.9 + 1.5 + 2.0 + 2.0 + 1.1 + 0.8 = 8.3$ bits.

(b) The +2 score drops from 2.0 to $-6$, a fall of 8 bits, making the site look like background. The `GT` dinucleotide is recognised by the U1 snRNP and is nearly invariant; changing it usually abolishes the donor, causing exon skipping or the use of a cryptic site. (Real effects must be tested experimentally or with dedicated splicing predictors; clinical interpretation belongs to Medicine Atlas.)

(c) Pseudocounts: a few genuine donors are `GC` (and some minor-spliceosome introns `AT`), so these bases must keep a small probability; assigning $-\infty$ would make such sites impossible.
:::
:::

::: exercise Viterbi or posterior? {level=2}
An island HMM is run on a 50-kb region. The Viterbi path labels 1,200 bases as island in two segments. Posterior decoding gives probabilities above 0.9 for 900 of these bases, between 0.5 and 0.9 for 200 and below 0.5 for 100. (a) How can the Viterbi path include bases whose posterior probability of being island is below 0.5? (b) Which output would you report to a user, and how?
::: solution
(a) The Viterbi path is the single most probable *path*, chosen as a whole; it must be a consistent sequence of states, and it may include a few weak positions to avoid paying for two extra transitions out of and back into the island. The posterior for each position sums over all paths, and can be below 0.5 for positions that the best path happens to label as island.

(b) Report the segments (the Viterbi path is convenient and gives contiguous islands) but annotate them with posterior probabilities, or trim the segment ends where the posterior falls below a threshold. The posterior conveys the uncertainty at the boundaries, which the single path hides.
:::
:::

::: exercise A Gibbs-sampling step {level=2}
In a run of the Gibbs sampler with $w = 4$, the PWM built from the other sequences gives likelihood ratios $R_j$ of 0.5, 2, 40, 1, 0.5 and 6 at the six possible positions of the sequence left out. (a) With what probability is each position chosen? (b) Why not simply choose position 3?
::: solution
(a) The total is $0.5 + 2 + 40 + 1 + 0.5 + 6 = 50$, so the probabilities are $0.01, 0.04, 0.80, 0.02, 0.01, 0.12$.

(b) Always taking the best position makes the algorithm a greedy local search that locks in its current motif; early in a run, when the motif is mostly noise, that would freeze in an arbitrary pattern. Sampling in proportion to $R_j$ lets sites move to other positions occasionally, so the sampler can leave a poor motif and find a better one; the method is an MCMC sampler whose stationary distribution favours alignments of sites with high likelihood.
:::
:::

::: exercise Motif enrichment {level=3}
A ChIP-seq experiment yields 2,000 peaks of 200 bp. A known motif matches (above a fixed threshold) in 1,100 peaks, and in 300 of 2,000 matched background regions with the same GC content. (a) Compute the enrichment. (b) Test it with a contingency table, stating the null hypothesis. (c) Give two reasons why 900 peaks lack a match.
::: solution
(a) 55 % of peaks against 15 % of background regions: enrichment $0.55/0.15 = 3.7$-fold.

(b) The null hypothesis is that a region is equally likely to contain a match whether it is a peak or a background region. The 2×2 table is 1,100 matches and 900 non-matches among peaks, 300 and 1,700 among background regions. Under the null, each group of 2,000 is expected to contain $2{,}000\times1{,}400/4{,}000 = 700$ matches and 1,300 non-matches, so

$$
\chi^2 = 2\times\frac{400^2}{700} + 2\times\frac{400^2}{1{,}300} = 457.1 + 246.2 = 703,
$$

on 1 degree of freedom ([[biostatistics/categorical-data]]), giving a vanishingly small P-value: the motif is strongly enriched in the peaks.

(c) The factor may bind indirectly, through a partner protein that binds its own motif; it may bind weaker sites below the threshold; some peaks are false positives of the experiment; and the PWM may not capture dependencies between positions or the effects of DNA shape and methylation on binding.
:::
:::

::: exercise A gene model that cannot be right {level=3}
An automated pipeline predicts a gene in a fungal genome with exons of 300, 151 and 448 bases and a stop codon at the end of the last exon. RNA-seq reads show a junction joining the end of exon 1 to a position 2 bases downstream of the predicted start of exon 2. (a) Show that the predicted model is inconsistent. (b) Show that the RNA-seq junction fixes the inconsistency. (c) What does this suggest about relying on ab initio predictions?
::: solution
(a) The total is $300 + 151 + 448 = 899 = 3\times299 + 2$, not a multiple of 3, so the stop codon cannot be in frame with the start codon: the model is not a valid coding sequence.

(b) Starting exon 2 two bases later shortens it to 149 bases and the total to $897 = 3\times299$, a valid coding sequence of 298 codons plus the stop. The acceptor used in the cell lies two bases from the predicted one — a common kind of error, since acceptor sites (`AG`) are short, frequent signals.

(c) Ab initio predictions are hypotheses that get most exons approximately right and many boundaries slightly wrong. Evidence from transcripts (or protein alignments) corrects them, which is why pipelines train on and integrate evidence rather than trusting predictions alone.
:::
:::
