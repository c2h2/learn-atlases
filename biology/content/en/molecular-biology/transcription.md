A gene does nothing until it is transcribed. Transcription copies a stretch of one DNA strand into RNA, and it is the first and most heavily regulated step of gene expression. Every cell makes thousands of different RNAs, in amounts that range from a few molecules per cell to tens of thousands. It does so by choosing where RNA polymerase starts, how often it starts, how fast it moves and where it stops. Bacteria do all of this with one RNA polymerase and a handful of accessory proteins. Eukaryotes use three nuclear polymerases, each with its own set of factors, working on DNA packed into chromatin.

This chapter describes the machinery and the cycle of transcription: initiation at promoters, elongation and termination, first in bacteria, where the essential logic is clearest, and then in eukaryotes. How the frequency of initiation is controlled by repressors, activators and chromatin is the subject of [[molecular-biology/bacterial-gene-regulation]] and [[molecular-biology/eukaryotic-gene-regulation]]. What happens to the RNA afterwards is the subject of [[molecular-biology/rna-processing]].

## The basic reaction

::: definition Transcription and its vocabulary {#def-transcription}
**Transcription** is the synthesis of RNA by a **DNA-dependent RNA polymerase** using one strand of DNA as a template. The polymerase adds ribonucleoside triphosphates (ATP, GTP, CTP, UTP) to the 3′ end of the growing RNA, so RNA grows 5′→3′ and the template strand is read 3′→5′. The **template strand** (also called the antisense or non-coding strand) is complementary to the RNA. The **coding strand** (sense or non-template strand) has the same sequence as the RNA, with T in place of U, and gene sequences are written as the coding strand by convention. A **transcription unit** extends from the **start site**, numbered $+1$, to the terminator. Positions **upstream** (5′ on the coding strand) are numbered negatively, with no position 0, and positions **downstream** positively. A **promoter** is the DNA sequence at which RNA polymerase binds and initiates. Unlike DNA polymerase, RNA polymerase needs no primer.
:::

The existence of a short-lived RNA carrying information from genes to ribosomes, **messenger RNA**, was established in 1961. Sydney Brenner, François Jacob and Matthew Meselson showed that phage-infected *E. coli* make new RNA that associates with pre-existing ribosomes, and François Gros, Walter Gilbert and colleagues detected unstable RNA in uninfected cells. RNA polymerase had been found in bacterial extracts in 1959–60 by Samuel Weiss and Leonard Gladstone, Jerard Hurwitz and Audrey Stevens.

::: example Which strand is the template? {#ex-strands}
Part of a gene's coding strand reads `5'-ATGGCTTACGGA-3'`. (a) Write the template strand 5′→3′. (b) Write the RNA transcribed from this region. (c) In which direction does RNA polymerase move along the template strand?
::: solution
(a) The template is the reverse complement of the coding strand: `5'-TCCGTAAGCCAT-3'`.

(b) The RNA has the coding-strand sequence with U for T: `5'-AUGGCUUACGGA-3'`.

(c) The RNA grows 5′→3′, antiparallel to the template, so the polymerase reads the template 3′→5′. That means it moves from the 3′ end of the template sequence as written in (a) towards its 5′ end, which is the same as moving 5′→3′ along the coding strand. Downstream is the direction of movement.
:::
:::

## Transcription in bacteria

### RNA polymerase and σ

The *E. coli* RNA polymerase **core enzyme** has five subunits, α₂ββ′ω, about 400 kDa in total. The two large subunits β and β′ form a crab-claw shape with the active site, a Mg²⁺ ion held by aspartates of β′, at the back of the cleft between them. The core can transcribe, but it starts at random places. Specific initiation needs a **σ factor**, which turns the core into the **holoenzyme**. Richard Burgess, Andrew Travers, John Dunn and Ekkehard Bautz discovered σ in 1969, when a fraction of purified polymerase lost its ability to transcribe phage T4 DNA correctly until the σ fraction was added back.

*E. coli* has seven σ factors. The housekeeping factor σ⁷⁰ (RpoD) directs transcription of most genes. Alternative σ factors recognise different promoters and switch on sets of genes in particular conditions: σ³² (RpoH) for heat shock, σ³⁸ (RpoS) for stationary phase and stress, σ⁵⁴ (RpoN) for nitrogen limitation and others. In *Bacillus subtilis*, a cascade of σ factors directs the stages of spore formation. Exchanging σ is the simplest way to reprogram a bacterial cell's transcription.

### Promoters

::: definition σ⁷⁰ promoter elements {#def-promoter}
A typical *E. coli* σ⁷⁰ promoter has two hexamers, written on the coding strand, centred about 10 and 35 bp upstream of the start site:
- the **−10 element** (Pribnow box), consensus `TATAAT`;
- the **−35 element**, consensus `TTGACA`;
- separated by a **spacer** of 17 bp (functional promoters have 15–19 bp, with 17 optimal).

Some promoters also have an **extended −10** (`TG` immediately upstream of the −10 element) and an **UP element**, an A·T-rich sequence upstream of −35 that is bound by the C-terminal domains of the α subunits. σ⁷⁰ region 4 binds the −35 element and region 2 the −10 element, and the start site is usually a purine 6–8 bp downstream of the −10 element. The **consensus** sequence is the most common base at each position among many promoters. Few natural promoters match it exactly, and closer matches usually mean stronger promoters.
:::

David Pribnow (1975) and Heinz Schaller and colleagues (1975) noticed the −10 element by comparing the first few promoter sequences, and the −35 element followed as more promoters were sequenced. Mutations confirmed the model. Changes towards consensus (**up-promoter** mutations) increase transcription, and changes away from it (**down-promoter** mutations) decrease it. The *lac* promoter, for example, has a weak −10 element (`TATGTT`). The *lacUV5* mutant, with two changes that make it `TATAAT`, is so strong that it no longer needs the activator CAP ([[molecular-biology/bacterial-gene-regulation]]).

```python
# Score sigma-70 promoter elements: best -35 / -10 pair with a 15-19 bp spacer
M35, M10 = "TTGACA", "TATAAT"

def matches(a, b):
    return sum(x == y for x, y in zip(a, b))

def best_promoter(seq):
    best = None
    for i in range(len(seq) - 6):                     # start of the -35 hexamer
        for spacer in range(15, 20):
            j = i + 6 + spacer                        # start of the -10 hexamer
            if j + 6 > len(seq):
                break
            score = matches(seq[i:i+6], M35) + matches(seq[j:j+6], M10) - abs(spacer - 17)
            if best is None or score > best[0]:
                best = (score, seq[i:i+6], spacer, seq[j:j+6])
    return best

# made-up upstream sequences (5'->3', coding strand)
promoters = {
    "strong":  "GCATTTGACATTTATCCGCTCACAATTTATAATGGCATCG",
    "weak":    "GCATTTTACACTTTATGCTTCCGGCTCGTATGTTGTGTGG",
    "spacer":  "GCATTTGACATTTATCCGCTCACAATCGTTATAATGGCAT",
}
for name, s in promoters.items():
    score, m35, sp, m10 = best_promoter(s)
    print(f"{name:7s} -35 {m35} ({matches(m35, M35)}/6)  spacer {sp}  -10 {m10} ({matches(m10, M10)}/6)  score {score}")
```

The script prints:

```
strong  -35 TTGACA (6/6)  spacer 17  -10 TATAAT (6/6)  score 12
weak    -35 TTTACA (5/6)  spacer 18  -10 TATGTT (4/6)  score 8
spacer  -35 TTGACA (6/6)  spacer 19  -10 TATAAT (6/6)  score 10
```

The scoring rule, one point per matching base with a penalty for each base pair of departure from a 17 bp spacer, is a crude stand-in for binding energy. Its point is the logic, not the numbers. Both hexamers must be present at the right spacing, because the two σ domains that bind them are a fixed distance apart, and the spacer length also sets the angle between the two elements round the helix ([[molecular-biology/dna-structure#ex-helical-phase]]). Real promoter predictions use position weight matrices built from many known promoters ([[bioinformatics/gene-finding]]).

### Initiation step by step

Initiation is a sequence of distinct, measurable steps:

1. **Closed complex.** The holoenzyme binds the promoter as double-stranded DNA, contacting the −35 and −10 elements.
2. **Isomerisation to the open complex.** The polymerase unwinds about 13 bp, from about −11 to +2, placing the template strand in the active site. σ region 2 captures bases of the non-template strand at −10 as they flip out. No ATP is needed: binding energy and DNA supercoiling drive opening ([[molecular-biology/dna-structure#prop-topology]]).
3. **Initial transcription.** The polymerase makes short RNAs while staying bound to the promoter, pulling downstream DNA into itself (**scrunching**, observed in single molecules by Kapanidis, Revyakin and colleagues in 2006). Many of these RNAs, 2 to about 10 nucleotides long, are released (**abortive initiation**), and the cycle repeats.
4. **Promoter escape.** Once the RNA reaches about 10–15 nucleotides, the stress accumulated by scrunching is released, the polymerase breaks its contacts with the promoter, and the RNA exit channel is cleared of a σ loop that blocks it. σ is then usually released, though not always immediately.

::: proposition A two-step model of promoter strength {#prop-mcclure}
Let RNA polymerase holoenzyme $R$ bind a promoter $P$ rapidly and reversibly to form the closed complex $RP_c$ with association constant $K_B$, which then isomerises to the open complex $RP_o$ with rate constant $k_f$:
$$
R + P \;\underset{}{\overset{K_B}{\rightleftharpoons}}\; RP_c \;\xrightarrow{\;k_f\;}\; RP_o .
$$
If binding equilibrates fast compared with isomerisation, the closed-complex occupancy is $\theta = K_B[R]/(1 + K_B[R])$, and the rate of open-complex formation per promoter is
$$
v = k_f\,\theta = \frac{k_f\,[R]}{[R] + 1/K_B}.
$$ {#eq-mcclure}
So promoter strength has two separate components, affinity ($K_B$) and isomerisation ($k_f$). Mutations or regulators can change either. The model (William McClure, 1980) ignores abortive cycling, the reverse of isomerisation and the time for promoter escape.
:::

::: example Two kinds of strong promoter {#ex-mcclure}
Promoter A has $K_B = 2\times10^7\ \mathrm{M^{-1}}$ and $k_f = 0.05\ \mathrm{s^{-1}}$; promoter B has $K_B = 2\times10^6\ \mathrm{M^{-1}}$ and $k_f = 0.5\ \mathrm{s^{-1}}$. These are illustrative values within the range measured in vitro. Take the free holoenzyme concentration as 50 nM. (a) Compute $v$ for each promoter, and the mean time between open complexes. (b) Which promoter benefits more from doubling the free holoenzyme concentration? (c) An activator that touches the polymerase increases its affinity for the promoter ten-fold. Which promoter would it activate more?
::: solution
(a) For A, $1/K_B = 50$ nM, so $\theta = 50/(50 + 50) = 0.5$ and $v = 0.05\times0.5 = 0.025\ \mathrm{s^{-1}}$: one open complex every 40 s. For B, $1/K_B = 500$ nM, so $\theta = 50/550 = 0.091$ and $v = 0.5\times0.091 = 0.045\ \mathrm{s^{-1}}$: one every 22 s. B is the stronger promoter despite binding ten times more weakly.

(b) At 100 nM: A has $\theta = 100/150 = 0.667$ and $v = 0.033\ \mathrm{s^{-1}}$, an increase of 33 %; B has $\theta = 100/600 = 0.167$ and $v = 0.083\ \mathrm{s^{-1}}$, an increase of 83 %. B is far from saturated, so it responds almost linearly to polymerase concentration.

(c) Ten-fold tighter binding makes A's $1/K_B$ 5 nM, so $\theta = 50/55 = 0.91$ and $v = 0.045\ \mathrm{s^{-1}}$, a 1.8-fold increase. B's $1/K_B$ becomes 50 nM, so $\theta = 0.5$ and $v = 0.25\ \mathrm{s^{-1}}$, a 5.5-fold increase. An activator that works by recruitment helps most at promoters limited by binding. One that speeds isomerisation would help A more. Activators of both kinds are known, and kinetic measurements of $K_B$ and $k_f$ tell them apart.
:::
:::

::: widget plot
f: kf*x/(x + Kd); 0.05*x/(x + 50)
x: 0, 500
y: 0, 0.5
sliders: kf=0.5:0.01:1:0.01; Kd=500:5:1000:5
labels: \text{promoter with sliders}; \text{promoter A of the example}
caption: The rate of open-complex formation $v$ (s⁻¹) against free holoenzyme concentration (nM) from [[#eq-mcclure]], with $K_d = 1/K_B$ in nM. The fixed curve is promoter A of [[#ex-mcclure]]. The slider curve starts as promoter B. Notice that B overtakes A at all concentrations above a few nanomolar, and that halving $K_d$ (stronger binding) raises the curve most at low concentration while raising $k_f$ scales the whole curve. That is the difference between activating binding and activating isomerisation.
:::

### Elongation

After escape, the **elongation complex** is extremely stable: it may transcribe tens of kilobases without letting go. Inside it, about 9–10 bp of RNA–DNA hybrid sit in the active-site cleft, the transcription bubble is about 12–14 nucleotides, the RNA leaves through an exit channel, and the template strand is re-paired with the coding strand behind the polymerase. Bacterial RNA polymerase moves at about 50 nucleotides per second on average (Alberts, 7th ed.), and faster on rRNA genes. It does not move smoothly. It pauses at particular sequences, which gives time for the RNA to fold or for ribosomes to catch up, and it sometimes **backtracks**, sliding backwards so that the 3′ end of the RNA leaves the active site. The factors GreA and GreB (TFIIS in eukaryotes) stimulate cleavage of the backtracked RNA by the polymerase itself, creating a new 3′ end in the active site. The same cleavage allows a form of proofreading. RNA polymerase is less accurate than replicative DNA polymerase, with error rates of roughly $10^{-5}$ per nucleotide, which is tolerable because RNAs are short-lived and many copies are made.

In bacteria, transcription and translation are **coupled**: ribosomes begin translating an mRNA while it is still being made. Oscar Miller, Barbara Hamkalo and Charles Thomas saw this in 1970 in electron micrographs of lysed *E. coli*. DNA fibres carried RNA chains of increasing length, each studded with ribosomes. Coupling is the basis of attenuation and of polarity, the effect of a nonsense mutation on downstream genes of an operon ([[molecular-biology/bacterial-gene-regulation]]).

::: example Reading a Miller spread {#ex-miller}
In electron micrographs of a ribosomal RNA operon of *E. coli* in fast growth, the operon (about 5.5 kb) is covered by RNA polymerases at an average spacing of about 85 bp, giving the "Christmas tree" pattern first seen by Oscar Miller and Barbara Beatty in 1969 on amphibian rRNA genes. (a) How many polymerases are on the operon? (b) If the polymerases move at 85 nt s⁻¹, how often does a new polymerase initiate? (c) How long does each transcript take to complete? (The spacing and speed are illustrative values of the right order for rRNA operons.)
::: solution
(a) $5500/85 \approx 65$ polymerases.

(b) In steady state, polymerases leave the end at the rate they enter at the start. Each moves 85 nt in one second, so successive polymerases are separated by one second of travel: about one initiation per second, near the maximum possible for a promoter.

(c) $5500/85 = 65$ s. With seven *rrn* operons, several of them near the origin and present in multiple copies in fast growth ([[molecular-biology/dna-replication#prop-ori-ter]]), the cell can make thousands of ribosomes per generation.
:::
:::

### Termination

Bacteria stop transcription in two ways.

- **Intrinsic (Rho-independent) termination.** The terminator is a G·C-rich inverted repeat followed by a run of about 7–9 T residues on the coding strand. The transcribed inverted repeat folds into an RNA **hairpin** in the exit channel just as the polymerase reaches the U-run. The hairpin disrupts the upstream part of the RNA–DNA hybrid, and the remaining rU·dA hybrid is the weakest base-paired duplex there is, so the RNA is released. Termination efficiency depends on the hairpin's stability and the length of the U-run.
- **Rho-dependent termination.** **Rho** is a hexameric ring helicase that binds C-rich, unstructured stretches of nascent RNA (*rut* sites). It translocates 5′→3′ along the RNA using ATP until it reaches the polymerase, usually when the polymerase has paused, and pulls the RNA out. Because Rho needs naked RNA, ribosomes translating the mRNA protect it. Rho therefore terminates transcription of untranslated RNA, including the RNA downstream of a premature stop codon, which explains polarity.

::: quiz
A mutation changes the sequence just upstream of a run of T's in an intrinsic terminator so that the RNA can no longer form a hairpin. What happens?
- [ ] Transcription stops earlier, because the polymerase stalls at the mutation.
- [x] Termination is greatly reduced, and the polymerase reads through into downstream DNA.
- [ ] Nothing, because the U-run alone is sufficient.
- [ ] Termination now requires Rho, but occurs at the same place.
::: solution
Both elements are needed. The hairpin destabilises the hybrid at the moment the polymerase sits on the weakly paired U-run; without the hairpin, the rU·dA hybrid alone does not release the RNA efficiently, so the polymerase continues. Rho might terminate somewhere downstream if there is a suitable *rut* site and the RNA is untranslated, but not specifically at this position.
:::
:::

## Transcription in eukaryotes

### Three nuclear RNA polymerases

Robert Roeder and William Rutter separated three nuclear RNA polymerases from sea-urchin and rat-liver extracts in 1969 by chromatography. They differ in what they transcribe and in their sensitivity to **α-amanitin**, the toxin of the death-cap mushroom *Amanita phalloides*.

| polymerase | main products | α-amanitin |
|---|---|---|
| RNA polymerase I | the large rRNA precursor (45S in mammals), processed to 18S, 5.8S and 28S rRNA | insensitive |
| RNA polymerase II | pre-mRNAs; most small nuclear RNAs; precursors of microRNAs; many long non-coding RNAs | very sensitive (blocked by 1 μg mL⁻¹ or less) |
| RNA polymerase III | tRNAs, 5S rRNA, U6 snRNA, 7SL RNA and other small RNAs | moderately sensitive (higher concentrations) |

Plants have two further polymerases, IV and V, derived from Pol II and specialised in making the small RNAs that direct DNA methylation of transposons. All the eukaryotic polymerases share a core related to the bacterial enzyme. Pol II has 12 subunits, and its largest, Rpb1, corresponds to β′. The structure of yeast Pol II (Patrick Cramer, David Bushnell and Roger Kornberg, 2001) showed a clamp, a cleft and an active site strikingly similar to the bacterial enzyme. Kornberg received the 2006 Nobel Prize in Chemistry for the structural basis of eukaryotic transcription.

Rpb1 has a feature with no bacterial counterpart. Its **C-terminal domain** (CTD) is a tail of tandem repeats of the heptapeptide `YSPTSPS` (Tyr-Ser-Pro-Thr-Ser-Pro-Ser): 26 repeats in budding yeast and 52 in humans. The CTD is unphosphorylated when Pol II joins a promoter. Serine 5 is phosphorylated at initiation, and serine 2 increasingly during elongation. The changing pattern of phosphorylation, sometimes called the **CTD code**, recruits different proteins at different stages: the capping enzyme early, splicing factors during elongation, and the cleavage and polyadenylation machinery near the end. That is how RNA processing is coupled to transcription ([[molecular-biology/rna-processing]]).

### Core promoters and general transcription factors

Purified Pol II binds DNA but cannot start at promoters. It needs **general transcription factors** (GTFs), named TFIIA, TFIIB, TFIID, TFIIE, TFIIF and TFIIH, identified biochemically by Roeder's group and others from the late 1970s.

::: definition Core promoter and preinitiation complex {#def-pic}
The **core promoter** is the minimal sequence, roughly −40 to +40, at which the general machinery assembles. Elements include the **TATA box** (consensus `TATAWAWR`, where W is A or T and R is a purine) at about −30, the **initiator** (Inr) spanning the start site, the downstream promoter element (DPE) at about +30, and TFIIB recognition elements flanking the TATA box. No element is universal. Only a minority of human promoters have a TATA box, and many lie in **CpG islands**, G·C-rich regions with dispersed start sites. The **preinitiation complex** (PIC) assembles in a defined order in vitro:
1. **TFIID** binds the core promoter. Its **TATA-binding protein** (TBP) binds the TATA box in the minor groove and bends the DNA by about 80°. Its TBP-associated factors (TAFs) contact the Inr and DPE.
2. **TFIIA** and **TFIIB** join; TFIIB bridges TBP and the polymerase and helps select the start site.
3. **Pol II** arrives with **TFIIF**.
4. **TFIIE** and **TFIIH** join. TFIIH has two ATP-dependent activities: its translocase XPB opens the DNA (unlike bacterial polymerase, Pol II needs ATP to melt the promoter), and its kinase CDK7 phosphorylates CTD serine 5.
:::

TBP is used by all three polymerases. Its saddle-shaped structure (Stephen Burley, Paul Sigler and colleagues, 1993) explains the bend. The DNA is bent away from the protein, its minor groove widened, and two phenylalanine side chains are inserted between base pairs at each end of the TATA box. The A·T-rich TATA sequence is chosen because it is the easiest to deform in this way, an example of reading DNA shape rather than base edges ([[molecular-biology/dna-structure]]).

In cells, the PIC is helped onto promoters by activators bound to enhancers, by the large **Mediator** complex (about 25–30 subunits), which bridges activators and Pol II, and by co-activators that modify or remodel nucleosomes. These are the subject of [[molecular-biology/eukaryotic-gene-regulation]]. What matters here is that the GTFs are necessary but not sufficient. On chromatin templates they give very little transcription without activators.

::: warning "Every eukaryotic gene has a TATA box"
The TATA box was the first core promoter element found and is still the one most often drawn, but it is the exception rather than the rule. Genome-wide studies of start sites (for example by the FANTOM consortium) find a TATA box in only about 10–20 % of human promoters, mostly those of tissue-specific, highly regulated genes that start at a single sharp position. Most housekeeping genes have TATA-less CpG-island promoters with several start sites spread over 50–100 bp. TBP is still required at TATA-less promoters, recruited through TAFs and other proteins. Many promoters are also **bidirectional**, producing a short unstable RNA in the opposite direction.
:::

### Pausing, elongation and termination

In metazoans, Pol II often starts transcribing and then stops 20–60 nucleotides downstream of the start site. This **promoter-proximal pausing** is held by the factors DSIF and NELF. It is released when the kinase **P-TEFb** (CDK9–cyclin T) phosphorylates DSIF, NELF and CTD serine 2. Pausing was discovered in heat-shock genes of *Drosophila* (John Lis and colleagues, 1980s), where a paused polymerase waits for a heat-shock signal. Genome-wide methods that map engaged polymerase show it at a large fraction of genes, so the release from pausing is a major regulated step.

Elongating Pol II must get through nucleosomes. Histone chaperones such as **FACT** help it to displace and replace them, and the histones behind it are marked by methylation of H3K36, which prevents spurious initiation inside genes. Measured elongation rates in mammalian cells are about 1–4 kb per minute, varying between genes and along them.

::: example How long does a long gene take? {#ex-long-gene}
The human dystrophin gene (*DMD*) spans about 2.4 Mb (Alberts, 7th ed., Table 4-1); its mRNA is about 14 kb. (a) At an elongation rate of 3 kb min⁻¹, how long does one round of transcription take? (b) At 2 kb min⁻¹? (c) What fraction of the transcribed RNA ends up in the mRNA?
::: solution
(a) $2.4\times10^6/3000 = 800$ min, or 13.3 h.

(b) $2.4\times10^6/2000 = 1200$ min, or 20 h. Measurements in human muscle cells by Christopher Tennyson, Henry Klamut and Ronald Worton (1995) gave about 16 h, within this range. A single transcript can therefore take most of a cell cycle to make, which is one reason why very long genes are vulnerable to collisions with replication forks.

(c) $14/2400 = 0.6\ \%$. More than 99 % of the transcript is intron, removed by splicing ([[molecular-biology/rna-processing]]).
:::
:::

Termination of Pol II is coupled to the 3′ processing of the mRNA. When the polymerase transcribes the **polyadenylation signal** (`AAUAAA` and a downstream G/U-rich element), the cleavage and polyadenylation machinery, bound to the CTD, cuts the RNA. The upstream piece becomes the mRNA. The downstream piece, still attached to the polymerase, is uncapped and is degraded 5′→3′ by the exonuclease **Xrn2**. In the **torpedo model**, Xrn2 catches up with the polymerase and dislodges it, usually a few kilobases downstream. Conformational changes in the polymerase when it passes the signal (the **allosteric model**) also contribute, and the two are now thought to act together. Pol I terminates at specific terminator sequences bound by a terminator protein. Pol III terminates, like bacterial intrinsic terminators, at a run of T residues on the coding strand, without the need for a hairpin.

### Pol I and Pol III promoters

Pol I transcribes only the rRNA genes, present in hundreds of tandem copies in nucleolar organiser regions. Its promoter has a core element at the start site and an upstream control element, bound by the factors UBF and SL1 (which contains TBP). Pol III promoters are of three types. Type 1 (5S rRNA genes) and type 2 (tRNA genes) have **internal promoters** inside the transcribed region. In 5S genes this is the internal control region bound by TFIIIA; in tRNA genes it is the A and B boxes bound by TFIIIC. TFIIIC then places TFIIIB, which contains TBP, upstream of the start site to position the polymerase. Type 3 promoters (U6 snRNA) are upstream, with a TATA box. Donald Brown's laboratory discovered internal promoters in *Xenopus* 5S genes in 1980 by deleting progressively larger segments and finding that the essential region lay inside the gene.

::: example Errors in transcripts {#ex-rna-errors}
Take the error rate of RNA polymerase II as $10^{-5}$ per nucleotide (an order-of-magnitude figure from in vivo measurements). (a) What fraction of 1500-nucleotide mRNAs contains at least one error? (b) If the rate were $10^{-4}$? (c) Why can the cell tolerate an error rate a hundred thousand times higher than that of DNA replication?
::: solution
(a) $1 - (1 - 10^{-5})^{1500} = 0.015$: about 1.5 % of transcripts carry an error.

(b) $1 - (1 - 10^{-4})^{1500} = 0.139$: about 14 %.

(c) An error in an mRNA affects only the few protein molecules made from it before it is degraded, and other transcripts of the same gene are correct. An error in DNA is inherited by every descendant cell and every RNA made from the gene. RNA errors are also diluted by the much larger error rate of translation (about $10^{-4}$ per codon, [[molecular-biology/translation]]).
:::
:::

::: application Drugs and toxins that target transcription
The antibiotic **rifampicin** binds the β subunit of bacterial RNA polymerase in the RNA exit channel and blocks extension beyond 2–3 nucleotides. It does not affect eukaryotic polymerases, so it is selective. Resistance arises from mutations in the *rpoB* gene that alter the binding pocket, and these mutations are among the most-studied in bacterial genetics. **Actinomycin D** intercalates into DNA and blocks all polymerases. It is used in the laboratory to stop transcription and measure mRNA half-lives. **α-Amanitin** binds Pol II near the active site and blocks translocation; this is why the death cap is so dangerous, since liver cells, which take up the toxin, stop making mRNA. Clinical use of these agents is discussed in Medicine Atlas ([/learn/medicine/](/learn/medicine/)).
:::

::: history
François Jacob and Jacques Monod proposed an unstable messenger in 1961, and Sydney Brenner, Jacob and Matthew Meselson, and François Gros, Walter Gilbert and colleagues, demonstrated it the same year. Samuel Weiss and Leonard Gladstone (1959), and Jerard Hurwitz and Audrey Stevens (1960), had found DNA-dependent RNA polymerase. Richard Burgess, Andrew Travers and colleagues discovered σ in 1969, the year Robert Roeder and William Rutter separated three eukaryotic nuclear polymerases and Oscar Miller and Barbara Beatty photographed transcribing rRNA genes. David Pribnow described the −10 element in 1975. Donald Brown's group found internal Pol III promoters in 1980, and Roeder's group began defining the general transcription factors from 1980. Patrick Cramer, David Bushnell and Roger Kornberg reported the structure of yeast RNA polymerase II in 2001.
:::

::: summary
- RNA polymerases make RNA 5′→3′ from a DNA template read 3′→5′, without a primer. Gene sequences are written as the coding strand; positions are numbered from $+1$ at the start site.
- Bacterial core polymerase (α₂ββ′ω) needs σ to initiate at promoters. σ⁷⁰ promoters have `TTGACA` at −35 and `TATAAT` at −10, separated by about 17 bp; alternative σ factors recognise other promoters.
- Initiation proceeds through closed complex, open complex (about 13 bp melted without ATP), abortive initiation with scrunching, and promoter escape. Promoter strength combines affinity ($K_B$) and isomerisation ($k_f$): $v = k_f[R]/([R] + 1/K_B)$.
- Elongation is processive (about 50 nt s⁻¹ in bacteria) with pausing and backtracking. In bacteria it is coupled to translation.
- Intrinsic terminators are a G·C-rich hairpin plus a U-run. Rho is an RNA helicase that terminates on untranslated RNA.
- Eukaryotes have Pol I (rRNA), Pol II (mRNA, most snRNAs, miRNA precursors) and Pol III (tRNA, 5S rRNA, U6), distinguished by α-amanitin sensitivity. Pol II's CTD (`YSPTSPS` repeats) is phosphorylated on Ser5 at initiation and Ser2 in elongation and coordinates RNA processing.
- The Pol II preinitiation complex forms on core promoters (TATA, Inr, DPE; TATA in a minority) with TFIID (TBP bends DNA about 80°), TFIIA, B, F, E and H (which melts DNA with ATP and phosphorylates the CTD). Mediator and activators are needed in vivo.
- Promoter-proximal pausing and its release by P-TEFb is a major control point. Elongation is about 1–4 kb min⁻¹. Termination is coupled to polyadenylation (torpedo and allosteric models).
:::

## Exercises

::: exercise Reading the template {level=1}
A template strand reads `3'-TACCGATTA-5'`. Give the RNA and the coding strand, both 5′→3′.
::: solution
RNA: `5'-AUGGCUAAU-3'`. Coding strand: `5'-ATGGCTAAT-3'`.
:::
:::

::: exercise A promoter score {level=1 check="9"}
Using the scoring rule of the Python listing (one point per base matching `TTGACA` and `TATAAT`, minus one per base pair of departure from a 17 bp spacer), score a promoter with −35 `TTGATA`, a 16 bp spacer and −10 `TAAAAT`.
::: solution
`TTGATA` matches `TTGACA` at 5 of 6 positions (only the fifth differs), and `TAAAAT` matches `TATAAT` at 5 (only the third differs). The spacer penalty is $|16 - 17| = 1$, so the score is $5 + 5 - 1 = 9$, between the "weak" and "strong" examples of the listing.
:::
:::

::: exercise Initiation frequency {level=1 check="120"}
A promoter initiates once every 0.5 s on average. How many transcripts does it start per minute?
::: solution
$60/0.5 = 120$ per minute.
:::
:::

::: exercise Promoter occupancy {level=2 check="0.29"}
Using [[#eq-mcclure]], with $1/K_B = 250$ nM and free holoenzyme at 100 nM, what fraction of the time is the promoter in the closed complex (two decimal places)?
::: solution
$\theta = 100/(100 + 250) = 0.286 \approx 0.29$.
:::
:::

::: exercise α-Amanitin and the polymerases {level=2}
Nuclei are incubated with labelled nucleotides with no toxin, with 1 μg mL⁻¹ α-amanitin, or with 300 μg mL⁻¹ α-amanitin. Incorporation into RNA is 100 %, 55 % and 30 % of the control. (a) What fraction of nuclear RNA synthesis is due to each polymerase? (b) Predict which RNA species would be missing in each case.
::: solution
(a) The low concentration inhibits Pol II only, so Pol II accounts for $100 - 55 = 45\ \%$. The high concentration also inhibits Pol III, which accounts for $55 - 30 = 25\ \%$. The resistant remainder, 30 %, is Pol I. (Numbers are illustrative; in growing cells Pol I typically accounts for a large share of total RNA synthesis because rRNA is so abundant.) (b) At 1 μg mL⁻¹, pre-mRNA and Pol II-dependent snRNA synthesis stop; at 300 μg mL⁻¹, tRNA and 5S rRNA synthesis stop as well; 45S pre-rRNA synthesis continues in both.
:::
:::

::: exercise A down-promoter mutation in context {level=2}
A mutation changes the −10 element of a promoter from `TATAAT` to `TATGAT`. Transcription in vivo falls ten-fold. In vitro, the closed-complex binding constant is unchanged but the isomerisation rate falls ten-fold. (a) Interpret the result in terms of the steps of initiation. (b) Why would a −10 mutation be expected to affect isomerisation especially?
::: solution
(a) The mutation does not affect binding of the holoenzyme (unchanged $K_B$) but slows opening of the DNA (reduced $k_f$), so the rate of open-complex formation, and hence transcription, falls in proportion. (b) The −10 element is where DNA melting begins: σ region 2 captures the non-template-strand bases of the −10 element as they flip out, especially the conserved A at position −11 and T at −7. A substitution in the −10 element interferes with this strand capture, which is part of isomerisation, while the −35 element contributes mostly to initial binding.
:::
:::

::: exercise Transcription and replication conflicts {level=3}
In *E. coli*, highly expressed genes, including the rRNA operons, are mostly oriented so that they are transcribed in the same direction as the replication fork moves. (a) Why might head-on collisions between replication forks and RNA polymerases be harmful? (b) Using [[molecular-biology/dna-structure#prop-topology]], explain what happens to DNA supercoiling between a fork and a polymerase approaching each other head-on. (c) Predict the effect of inverting an rRNA operon in the chromosome.
::: solution
(a) A replisome moving at about 1000 nt s⁻¹ catches up with or meets RNA polymerases moving at about 50–90 nt s⁻¹. Co-directional encounters can be resolved by the replisome displacing or bypassing the polymerase; head-on encounters stall forks more severely, and stalled forks can break, causing recombination, mutations and deletions.

(b) Both machines unwind DNA and push positive supercoils ahead of themselves. Approaching each other head-on, each generates positive supercoils in the shrinking region between them, which becomes increasingly overwound and resists further unwinding; topoisomerases (gyrase) must remove these quickly. Co-directionally, the polymerase's negative supercoils behind it partly cancel the fork's positive supercoils ahead.

(c) Inverting an rRNA operon so that it is transcribed head-on to replication slows fork progression through it, increases the frequency of fork stalling and recombination near it, and reduces growth rate, especially in rich medium when rRNA transcription is intense. Such experiments (in *E. coli* and *B. subtilis*) have been done and show exactly these effects, supporting the idea that gene orientation in bacterial chromosomes has been shaped by selection to avoid head-on conflicts.
:::
:::

::: exercise Interpreting pausing data {level=3}
A genome-wide map of engaged Pol II in *Drosophila* cells shows a sharp peak 30–50 nt downstream of the start site of a heat-shock gene, and little signal in the gene body. Two minutes after heat shock, signal has spread 5 kb into the gene body; after 10 minutes the whole 10 kb gene is covered. (a) What was the state of the gene before heat shock? (b) Estimate the elongation rate. (c) A drug that inhibits CDK9 is added before heat shock. Predict the result.
::: solution
(a) Pol II had initiated and was paused promoter-proximally, held by DSIF and NELF, ready to be released into productive elongation.

(b) The front of the polymerase wave moved 5 kb in 2 min: about 2.5 kb min⁻¹. (Coverage of 10 kb after 10 min is consistent with the wave having passed the 3′ end within 4 min, followed by continued new rounds.)

(c) CDK9 is the kinase of P-TEFb, needed to release paused Pol II by phosphorylating DSIF, NELF and CTD Ser2. With it inhibited, the polymerase would remain paused near the promoter after heat shock, and the wave into the gene body would not appear, even though the heat-shock activator binds the promoter.
:::
:::
