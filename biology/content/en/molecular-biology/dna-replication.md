Every cell division begins with a copy of the genome, and the copy must be very nearly perfect. A human cell copies $6.2\times10^9$ base pairs in a few hours and makes, on average, less than one uncorrected mistake. *E. coli* copies its 4.6 million base pairs in forty minutes, at a thousand nucleotides per second at each fork. Both cells start replication at defined places, make sure that each part of the genome is copied exactly once, and finish the ends of their chromosomes. The proteins that do this, the **replisome**, form one of the fastest and most accurate machines in biology.

The chemistry of nucleotide addition, the two-metal-ion mechanism of polymerases and the reason chains grow only 5′→3′ are explained in Chemistry Atlas ([Nucleic acids, Replication](/learn/chemistry/lesson.php?c=biochemistry&l=nucleic-acids)). This chapter takes the biologist's view. We start with the experiment that showed how DNA is copied, then build the replication fork protein by protein, follow it from origin to terminus in bacteria and in eukaryotes, and end with the two problems that a linear chromosome adds: licensing each origin once per cycle and replicating the ends.

## Semiconservative replication

Watson and Crick ended their 1953 paper with the remark that the specific pairing they proposed "immediately suggests a possible copying mechanism". If the strands separate and each serves as a template, each daughter molecule contains one old and one new strand: replication is **semiconservative**. Two alternatives were seriously considered. In **conservative** replication the parental duplex stays intact and a wholly new duplex is made. In **dispersive** replication old and new DNA are interspersed along both strands of each daughter, as Max Delbrück suggested to avoid the problem of untwisting long helices.

Matthew Meselson and Franklin Stahl, at the California Institute of Technology, distinguished the three in 1958. They grew *E. coli* for many generations in a medium whose only nitrogen source was $^{15}\mathrm{NH_4Cl}$, so that all the DNA contained the heavy isotope, then transferred the cells to $^{14}\mathrm{N}$ medium and took samples at intervals. DNA was extracted and centrifuged to equilibrium in a concentrated caesium chloride solution, which forms a density gradient in the centrifuge. Each DNA species comes to rest where its buoyant density equals that of the solution, and the bands were photographed by ultraviolet absorption.

::: proposition Predictions of the three models {#prop-meselson-stahl}
Let fully heavy DNA have buoyant density $\rho_H$ and fully light DNA $\rho_L$. In Meselson and Stahl's experiment $\rho_L = 1.710\ \mathrm{g\,cm^{-3}}$ and $\rho_H - \rho_L = 0.014\ \mathrm{g\,cm^{-3}}$. After $n$ generations in light medium:
1. **Semiconservative**: the parental strands are never separated from the hybrid duplexes they enter. A fraction $2^{1-n}$ of the DNA is hybrid, at density $(\rho_H+\rho_L)/2 = 1.717\ \mathrm{g\,cm^{-3}}$, and the rest is light. There is no heavy DNA for $n \ge 1$.
2. **Conservative**: a fraction $2^{-n}$ of the DNA is fully heavy and the rest is fully light. There is never hybrid DNA.
3. **Dispersive**: all molecules have the same composition, so there is one band at $\rho_L + (\rho_H - \rho_L)\,2^{-n}$, which moves gradually towards the light position.

In all three models the *mass-weighted mean* density is the same, $\rho_L + (\rho_H - \rho_L)2^{-n}$, because the amount of heavy nitrogen is fixed and the total DNA doubles each generation. The models differ only in how the heavy material is distributed among molecules.
:::

::: proof
Count strands. At the start there are $S$ heavy strands. After $n$ generations there are $2^n S$ strands, of which $S$ are heavy. Under semiconservative replication, each heavy strand is paired with a light strand from the first round on, so there are $S$ hybrid duplexes among $2^{n-1}S$ duplexes in total, a fraction $2^{1-n}$. Under conservative replication, the original $S/2$ heavy duplexes survive intact among $2^{n-1}S$ duplexes, a fraction $2^{-n}$. Under dispersive replication, every strand contains the same fraction $2^{-n}$ of heavy nucleotides. The mean fraction of heavy nitrogen is $2^{-n}$ in each case, and buoyant density is linear in it.
:::

The point at the end of the proposition is what made the experiment decisive. Measuring how much heavy nitrogen is left could not tell the models apart; resolving *molecules* by density could. Meselson and Stahl found a single band of hybrid density after one generation, which rules out conservative replication. After about two generations they found equal amounts of hybrid and light DNA. A single intermediate band would have been expected under dispersive replication, so its absence rules that model out. Heating hybrid DNA separated it into a heavy and a light component, showing that the two "subunits" of the hybrid were whole strands of a single density each. (That they were strands of a duplex was not proved by the experiment itself, which identified density subunits; later experiments confirmed it.)

```python
# Meselson-Stahl: follow every duplex through three generations under two models
from collections import Counter

def semiconservative(duplexes):
    # each duplex separates; each old strand gets a new light partner 'L'
    return [(s, 'L') for d in duplexes for s in d]

def conservative(duplexes):
    # parental duplex stays intact; one wholly new light duplex is made beside it
    return [x for d in duplexes for x in (d, ('L', 'L'))]

def density(d, light=1.710, heavy=1.724):          # g/cm^3, Meselson & Stahl 1958
    return light + (heavy - light) * d.count('H') / 2

for model in (semiconservative, conservative):
    dna = [('H', 'H')]                              # one fully 15N-labelled duplex
    print(model.__name__)
    for g in range(1, 4):
        dna = model(dna)
        bands = Counter(round(density(d), 3) for d in dna)
        print(' gen', g, {k: f"{v / len(dna):.3f}" for k, v in sorted(bands.items())})
```

Running it prints the fraction of DNA in each band (keys are densities in g cm⁻³):

```
semiconservative
 gen 1 {1.717: '1.000'}
 gen 2 {1.71: '0.500', 1.717: '0.500'}
 gen 3 {1.71: '0.750', 1.717: '0.250'}
conservative
 gen 1 {1.71: '0.500', 1.724: '0.500'}
 gen 2 {1.71: '0.750', 1.724: '0.250'}
 gen 3 {1.71: '0.875', 1.724: '0.125'}
```

::: example Reading the Meselson–Stahl gel quantitatively {#ex-meselson}
Meselson and Stahl reported their samples in generation times since the transfer, measured from the growth of the culture: 0, 0.3, 0.7, 1.0, 1.1, 1.5, 1.9, 2.5, 3.0 and 4.1 generations. Suppose that densitometry of the photographs gives the fraction of DNA in the hybrid band as 1.00 at 1.0 generation, 0.54 at 1.9 and 0.12 at 4.1. (a) Compare these with the semiconservative prediction. (b) What would the conservative model predict at 1.9 generations? (c) Where would the dispersive band lie at 1.9 generations? (d) The culture grew asynchronously, with cells replicating at all times. Why can the formula $2^{1-n}$ still be applied at non-integer $n$ once $n \ge 1$?
::: solution
(a) The semiconservative prediction is $2^{1-n}$: $2^{0} = 1.00$ at $n = 1.0$, $2^{-0.9} = 0.536$ at $n = 1.9$ and $2^{-3.1} = 0.117$ at $n = 4.1$. The data agree closely. (The data in this example are illustrative values consistent with the published photographs, not Meselson and Stahl's numbers.)

(b) Conservative replication would give $2^{-1.9} = 0.27$ of the DNA in a heavy band at 1.724 and 0.73 light, with no hybrid band at all.

(c) $1.710 + 0.014\times2^{-1.9} = 1.710 + 0.0038 = 1.714\ \mathrm{g\,cm^{-3}}$: a single band between the hybrid and light positions.

(d) In an exponentially growing culture, the total DNA increases as $2^n$ continuously while the number of old strands is fixed. Once every parental strand has been copied at least once (which is essentially true by $n \approx 1$), every old strand sits in a hybrid duplex, so the hybrid DNA is a constant mass equal to twice the mass of parental strands, and its fraction is $2 \cdot 2^{-n} = 2^{1-n}$ whether or not $n$ is an integer. Before $n = 1$, some parental duplexes have not yet replicated, and heavy and hybrid DNA coexist, as Meselson and Stahl saw at 0.3 and 0.7 generations.
:::
:::

::: widget plot
f: 2^(1-x); 1 - 2^(1-x); 2^(-x)
x: 1, 5
y: 0, 1.05
labels: \text{hybrid (semiconservative)}; \text{light (semiconservative)}; \text{heavy (conservative)}
points: 1.9, 0.54; 4.1, 0.12
caption: Predictions of [[#prop-meselson-stahl]] for the fraction of DNA in each band after $x$ generations in light medium. Under semiconservative replication the hybrid fraction halves every generation and is replaced by light DNA; under conservative replication a heavy band persists, falling as $2^{-x}$, and no hybrid band ever appears. The points are the illustrative hybrid fractions of [[#ex-meselson]]. Notice that the conservative heavy curve and the semiconservative hybrid curve have the same shape but are a factor of 2 apart, and that the two models predict bands at different densities: it is the band positions, not the curve shapes, that decide.
:::

Semiconservative replication was soon shown in eukaryotes too. J. Herbert Taylor, Philip Woods and Walter Hughes (1957) labelled root-tip chromosomes of the broad bean *Vicia faba* with tritiated thymidine and followed the label by autoradiography: after one round in label both sister chromatids were labelled, and after a further round in unlabelled medium only one of each pair was. In 1963 John Cairns labelled *E. coli* DNA with tritiated thymidine, spread whole chromosomes and photographed them by autoradiography. He saw a circle partly duplicated into a θ shape, the first direct picture of a replicating chromosome.

## The replication fork

At a **replication fork** the parental duplex is unwound and both strands are copied. Because the strands are antiparallel and polymerases extend only 3′ ends, one daughter strand, the **leading strand**, grows continuously towards the fork, while the other, the **lagging strand**, is made discontinuously as **Okazaki fragments** that grow away from it. Reiji and Tsuneko Okazaki and colleagues found these fragments in 1968 by pulse-labelling *E. coli* (infected with phage T4, and uninfected) for a few seconds: most of the label first appeared in short pieces of 1000–2000 nucleotides that were later joined into long DNA. Eukaryotic Okazaki fragments are shorter, 100–200 nucleotides, roughly a nucleosome repeat.

::: definition The core proteins of a replication fork {#def-fork}
- A **helicase** unwinds the parental duplex using ATP. The replicative helicase is a ring of six subunits that encircles one strand and translocates along it: DnaB moves 5′→3′ on the lagging-strand template in bacteria, and the CMG complex (Cdc45–MCM2-7–GINS) moves 3′→5′ on the leading-strand template in eukaryotes.
- **Single-strand DNA-binding protein** (SSB in bacteria, RPA in eukaryotes) coats exposed single strands, preventing secondary structure and protecting them.
- A **primase** makes short RNA primers, about 10–12 nucleotides in bacteria (DnaG), because DNA polymerases cannot start chains. In eukaryotes the polymerase α–primase complex makes an RNA primer of about 10 nucleotides and extends it with about 20 nucleotides of DNA.
- A **replicative DNA polymerase** extends primers with high speed, fidelity and processivity: DNA polymerase III in *E. coli*; polymerase ε on the leading strand and polymerase δ on the lagging strand in eukaryotes.
- A **sliding clamp** encircles the DNA and tethers the polymerase to it: the dimeric β clamp in bacteria, the trimeric PCNA (proliferating cell nuclear antigen) in eukaryotes. A **clamp loader** (the γ complex in bacteria, RFC in eukaryotes) opens the ring and places it on a primer–template junction using ATP.
- Primers are removed and replaced, by DNA polymerase I (with its 5′→3′ exonuclease) and RNase H in bacteria, and by polymerase δ strand displacement with the flap endonuclease FEN1 in eukaryotes. **DNA ligase** seals the nicks (NAD⁺-dependent in bacteria, ATP-dependent in eukaryotes).
- **Topoisomerases** remove the positive supercoils generated ahead of the fork ([[molecular-biology/dna-structure#prop-topology]]).
:::

Arthur Kornberg's discovery of DNA polymerase I in *E. coli* extracts in 1956 showed that DNA could be made in a test tube from deoxynucleoside triphosphates and a template. Pol I turned out not to be the main replicative enzyme. In 1969 Paula DeLucia and John Cairns isolated a mutant, *polA1*, that lacked almost all Pol I activity yet replicated its chromosome. It was, however, sensitive to DNA damage, and the search for the true replicase led to Pol III.

**Processivity**, the number of nucleotides a polymerase adds before it lets go, is the key to speed. The Pol III core alone adds only about ten nucleotides per binding event. Held by the β clamp it remains attached for tens of thousands of nucleotides, enough to make an entire leading strand. A polymerase that falls off must find the 3′ end again by diffusion, which is slow, so the clamp turns a sluggish enzyme into a fast one. On the lagging strand the clamp must be released at the end of each Okazaki fragment and a new one loaded on the next primer, which the clamp loader does every second or two.

In *E. coli* the two or three Pol III cores of the **holoenzyme** are linked by the τ subunits of the clamp loader, and the clamp loader is bound to the helicase. Leading- and lagging-strand synthesis are therefore coupled in one complex. To make the lagging strand in the same overall direction as the leading strand, the lagging-strand template is thought to be looped out, so that the polymerase moves 5′→3′ on it while the whole replisome moves with the fork. This is the **trombone model** of Bruce Alberts and colleagues (1980s), named after the loop that grows and is released with each fragment. Single-molecule experiments since 2017 have shown that the coupling is looser than this picture implies. The two polymerases move at varying speeds and pause independently, and polymerases exchange frequently, so the replisome is better seen as a dynamic assembly than a rigid machine.

::: warning "The lagging strand is copied 3′→5′"
Every DNA polymerase adds nucleotides only to a 3′-OH, so every new strand, leading or lagging, grows 5′→3′, and every template is read 3′→5′. What differs on the lagging strand is that each fragment grows *away* from the fork, so synthesis must restart repeatedly on new primers. No polymerase in any organism synthesises DNA 3′→5′; the chemical reason, in Chemistry Atlas, is that the energy for each bond comes from the incoming nucleotide's triphosphate, which would be lost at a chain end if growth went the other way.
:::

::: example Okazaki fragments per genome {#ex-okazaki}
(a) Estimate how many Okazaki fragments *E. coli* makes per round of replication, taking an average fragment length of 1500 nucleotides. (b) Repeat for a diploid human cell with 150-nucleotide fragments. (c) In *E. coli* each fork moves at about 1000 nt s⁻¹. How often must a new lagging-strand primer be made at each fork?
::: solution
(a) Half of all new DNA is lagging strand. In each round the cell makes $2\times4.64\times10^6$ nucleotides of new DNA, of which $4.64\times10^6$ are lagging strand, so there are $4.64\times10^6/1500 \approx 3.1\times10^3$ fragments.

(b) A diploid human cell makes $2\times6.2\times10^9$ new nucleotides, $6.2\times10^9$ of them on lagging strands, giving $6.2\times10^9/150 \approx 4\times10^7$ fragments. Each needs a primer, primer removal, a new PCNA clamp and a ligation, so tens of millions of these steps happen in every S phase.

(c) A 1500-nucleotide fragment is made in $1500/1000 = 1.5$ s, so primase must act about every 1.5 s at each fork.
:::
:::

## Origins, termini and the bacterial cell cycle

Replication begins at **origins**, where initiator proteins open the duplex and load helicases. The *E. coli* chromosome has a single origin, ***oriC***, about 245 bp long. It contains several 9 bp binding sites for the initiator protein **DnaA**, and an A·T-rich region of three repeated 13-mers that melts easily. DnaA bound to ATP forms a filament on the origin that strains the DNA and opens the A·T-rich region, aided by negative supercoiling. The loader DnaC then places two DnaB helicase rings on the single strands, one facing each way, and the primase DnaG starts the first primers. Two forks move away from *oriC* in opposite directions, so replication is **bidirectional**, and they meet roughly opposite the origin in a terminus region. There, **Tus** protein bound to ***ter*** sites acts as a one-way gate: a fork can pass a Tus–*ter* complex from one side but is stopped from the other, which traps the forks in the terminus region. Topoisomerase IV unlinks the daughter chromosomes.

Initiation is limited to once per cell cycle by several mechanisms. Newly replicated *oriC* is **hemimethylated**: the Dam methylase methylates adenine in `GATC` sequences, and *oriC* has many of them, but just after replication only the old strand is methylated. The protein SeqA binds hemimethylated *oriC* and sequesters it for about a third of the cell cycle. Meanwhile DnaA-ATP is converted to inactive DnaA-ADP, in part by a mechanism coupled to the β clamp.

::: proposition Origin-to-terminus ratio in a growing population {#prop-ori-ter}
Let the time to replicate the chromosome be $C$ and the doubling time of an exponentially growing, asynchronous population be $\tau$. Then the ratio of the number of copies of an origin-proximal sequence to that of a terminus-proximal sequence is
$$
\frac{\text{ori}}{\text{ter}} = 2^{C/\tau}.
$$ {#eq-ori-ter}
A gene at fractional distance $m$ along the path from origin to terminus ($m = 0$ at *oriC*, $m = 1$ at *ter*) has relative copy number $2^{(1-m)C/\tau}$ compared with the terminus. This assumes a constant fork rate and steady exponential growth.
:::

::: proof
An origin-proximal sequence is copied at initiation, and a terminus-proximal sequence a time $C$ later, when the forks arrive. In steady exponential growth, the number of copies of any sequence in the population grows as $2^{t/\tau}$, so the copies made at a given moment of the terminus are those initiated a time $C$ earlier, when the population (and hence the number of origins) was smaller by a factor $2^{C/\tau}$. Hence the ratio of origins to termini is $2^{C/\tau}$. A gene at fractional distance $m$ is reached at time $mC$ after initiation, so its copies lag behind the origin by $2^{mC/\tau}$ and lead the terminus by $2^{(1-m)C/\tau}$.
:::

::: example Multifork replication {#ex-multifork}
In *E. coli* at 37 °C, $C \approx 40$ min and the time from the end of replication to division, $D$, is about 20 min (Stephen Cooper and Charles Helmstetter, 1968). (a) What is the ori/ter ratio in a culture doubling every 20 min? Every 60 min? (b) How can cells divide every 20 min if replication takes 40 min? (c) How would you measure the ratio today?
::: solution
(a) From [[#eq-ori-ter]]: for $\tau = 20$ min, $2^{40/20} = 4$; for $\tau = 60$ min, $2^{40/60} = 1.59$.

(b) Replication of a chromosome must begin a time $C + D = 60$ min before the division it serves. If cells divide every 20 min, initiation must start three generations ahead, before the previous rounds have finished. Fast-growing cells therefore contain chromosomes with several generations of forks at once (**multifork replication**), and an origin can be present in four or eight copies per cell while the terminus is present in one or two.

(c) Sequence the total DNA of the culture and plot read depth along the chromosome. Coverage falls exponentially from *oriC* to *ter*, and the ratio of the two ends gives $2^{C/\tau}$. This is used in microbiome studies to estimate how fast bacteria are growing in a sample without culturing them. Genes near the origin, such as many ribosomal RNA operons in *E. coli*, gain dosage in fast growth, which helps the cell make ribosomes fastest when it needs them most.
:::
:::

::: widget plot
f: 2^(C/x); 2^(0.5*C/x)
x: 15, 120
y: 1, 6
sliders: C=40:20:80:1
labels: \text{origin / terminus}; \text{gene halfway / terminus}
caption: The copy number of the origin and of a gene halfway along the chromosome, relative to the terminus, against the doubling time $\tau$ (in minutes, horizontal axis) for a replication time $C$ (slider), from [[#prop-ori-ter]]. Fast growth (short $\tau$) produces large gradients of gene dosage. Slow the forks by raising $C$ and watch the gradient steepen at every growth rate.
:::

## Replicating eukaryotic chromosomes

Eukaryotic chromosomes are long and linear and are replicated from many origins. Two facts set the scale. Eukaryotic forks are slow, about 1–3 kb per minute in mammalian cells (roughly 20–50 nucleotides per second), presumably because they must also disassemble and reassemble nucleosomes. And S phase in a human cell lasts about 8 hours.

::: example How many origins does a human cell need? {#ex-origins}
A diploid human cell replicates $6.2\times10^9$ bp in an S phase of 8 h, with forks moving at 50 nt s⁻¹. (a) What is the minimum number of bidirectional origins, if all fired at the start of S phase and every fork ran continuously until it met another? (b) Measurements suggest that some 30,000–50,000 origins fire in each human S phase (reviews such as Fragkos et al., 2015). Why is the real number so much larger than the minimum?
::: solution
(a) Each origin produces two forks, which together copy $2\times50\times(8\times3600) = 2.88\times10^6$ bp in 8 h. The minimum number is $6.2\times10^9/2.88\times10^6 \approx 2.2\times10^3$ origins.

(b) Origins do not all fire at once: different regions of the genome replicate at characteristic times, euchromatin early and heterochromatin late, so many forks run for only part of S phase. Forks also pause and stall at obstacles such as tightly bound proteins, transcribing polymerases and damaged bases. An excess of licensed origins, many of which remain **dormant** and are used only when nearby forks stall, makes the process robust: an unreplicated gap between two stalled forks can be rescued by firing a dormant origin between them.
:::
:::

In budding yeast, origins are defined DNA sequences, **autonomously replicating sequences** (ARS), each containing an 11 bp core consensus bound by the **origin recognition complex** (ORC, six subunits Orc1–6); the genome has about 400 of them. In animals, origins are not defined by a consensus sequence. ORC binds DNA with little sequence preference, and origins are chosen by chromatin context: open, nucleosome-depleted regions, often near promoters and G-rich sequences.

::: definition Licensing and firing of origins {#def-licensing}
Eukaryotic replication starts in two separated steps.
1. **Licensing** (late M and G1 phase): ORC, with the proteins Cdc6 and Cdt1, loads the MCM2-7 helicase core onto origin DNA as an inactive **double hexamer** encircling the duplex. A licensed origin carries a **pre-replicative complex**. Loading is possible only when cyclin-dependent kinase (CDK) activity is low.
2. **Firing** (S phase): the Dbf4-dependent kinase DDK (Cdc7–Dbf4) phosphorylates MCM, and S-phase CDK phosphorylates further factors that recruit **Cdc45** and the **GINS** complex. Together with MCM these form the active **CMG helicase**. The double hexamer separates into two CMGs, each on one strand, which pass each other and travel in opposite directions. Polymerases ε, δ and α–primase, PCNA and RFC are then recruited.

Because helicase loading requires low CDK activity and activation requires high CDK activity, no origin can be licensed again once S phase has begun. Each origin therefore fires at most once per cell cycle. In metazoans the protein **geminin**, which inhibits Cdt1 from S phase to mitosis, adds a further block.
:::

This separation of loading from activation, worked out mainly in budding yeast from the 1990s on (John Diffley, Bruce Stillman, Stephen Bell and others), and reconstituted with purified proteins in 2015 (Yeeles et al.), is the molecular basis of the rule that DNA replicates once per cell cycle. Its regulation by cyclins and CDKs is part of the cell-cycle control system of [[cell-biology/cell-cycle]]. When licensing goes wrong, segments are re-replicated, giving amplifications and genome instability.

Behind each fork, chromatin must be rebuilt. Parental histones are passed to the daughter duplexes by chaperones associated with the replisome. Each daughter receives roughly half the old histones, with their modifications, and the gaps are filled with newly made histones assembled by **CAF-1**, which binds PCNA. Old histones then serve as templates for modifying the new ones, a central question in the inheritance of chromatin states ([[molecular-biology/eukaryotic-gene-regulation]]).

## Fidelity

The fidelity of replication is built up in three stages, each multiplying the accuracy of the one before.

::: proposition Fidelity of DNA replication {#prop-fidelity}
In *E. coli* the error rate of chromosomal replication is the product of three factors (Alberts et al., *Molecular Biology of the Cell*, Table 5-1):

| step | errors remaining |
|---|---|
| nucleotide selection by the polymerase (5′→3′ polymerisation) | 1 in $10^5$ |
| 3′→5′ exonucleolytic proofreading | 1 in $10^2$ |
| strand-directed mismatch repair | 1 in $10^3$ |
| **combined** | **1 in $10^{10}$** |

The factors multiply because each stage acts independently on the errors left by the previous one. Measured mutation rates in *E. coli* are of this order: mutation-accumulation experiments with whole-genome sequencing give about $2\times10^{-10}$ per base pair per generation (Lee et al., 2012).
:::

Selection by the polymerase depends on base-pair geometry as well as hydrogen bonding. The active site closes round the incoming nucleotide and checks that the nascent pair has the shape of a Watson–Crick pair. A mismatched nucleotide slows the closing step and the chemical step, giving it time to dissociate. **Proofreading** depends on a second active site. A mispaired 3′ terminus is a poor primer, so it melts and is transferred to the 3′→5′ exonuclease site (the ε subunit of Pol III, an intrinsic domain of Pols δ and ε), which cleaves it off. Mutations that inactivate the exonuclease raise the mutation rate dramatically. In *E. coli* the *mutD* (*dnaQ*) mutator, which affects the ε subunit, raises it by several orders of magnitude. **Mismatch repair** is described in [[molecular-biology/dna-repair-recombination]]. The RNA primer itself is made without proofreading, which is one reason it is removed and replaced by DNA.

::: example Errors per division {#ex-errors}
(a) Using the combined error rate of [[#prop-fidelity]], how many errors are expected in one replication of the *E. coli* genome? (b) In one replication of a diploid human genome? (c) A strain lacks mismatch repair. How do the answers change?
::: solution
(a) $4.64\times10^6\times10^{-10} = 4.6\times10^{-4}$: an error in roughly one cell in 2000 divisions.

(b) $6.2\times10^9\times10^{-10} = 0.62$ errors per division. (Human replication fidelity is of the same order.)

(c) Without mismatch repair the rate is $10^{-5}\times10^{-2} = 10^{-7}$, a thousand-fold higher: $0.46$ errors per *E. coli* replication and about 620 per human division. Mutator phenotypes of this size are seen in bacteria with *mutS* or *mutL* mutations, and loss of mismatch repair in human cells produces the genome-wide instability seen in some cancers.
:::
:::

## The ends of linear chromosomes

A linear chromosome poses a problem that a circle does not. When the last primer at the very end of the lagging strand is removed, no polymerase can fill the gap it leaves, because there is no 3′-OH upstream to extend. Each round of replication would therefore shorten the chromosome. James Watson (1972) and Alexey Olovnikov (1971–73) described this **end-replication problem**, and Olovnikov linked it to the finding of Leonard Hayflick (1961) that normal human fibroblasts divide only a limited number of times in culture.

::: definition Telomeres and telomerase {#def-telomerase}
**Telomeres** are the ends of linear eukaryotic chromosomes: tandem arrays of a short G-rich repeat, `TTAGGG` in vertebrates (`TTGGGG` in *Tetrahymena*, `TTTAGGG` in *Arabidopsis*), several kilobases long in humans, ending in a single-stranded 3′ overhang of the G-rich strand. **Telomerase** is a ribonucleoprotein reverse transcriptase that extends the 3′ overhang. Its protein subunit (TERT) copies a short template region in its own RNA subunit (TR, also called TERC), adding repeats one at a time. The complementary strand is then filled in by polymerase α–primase. Telomeres are bound by a protein complex, **shelterin** in mammals, which hides the ends from the DNA-damage response so that they are not treated as double-strand breaks.
:::

Elizabeth Blackburn and Joseph Gall (1978) found the telomeric repeats at the ends of the minichromosomes carrying ribosomal RNA genes in the ciliate *Tetrahymena thermophila*. Jack Szostak and Blackburn (1982) showed that *Tetrahymena* telomeres stabilise linear plasmids in yeast, which added their own repeats. Carol Greider and Blackburn (1985) found telomerase activity in *Tetrahymena* extracts, an enzyme that added `TTGGGG` repeats to a primer, and in 1989 identified its RNA template. The three shared the Nobel Prize in Physiology or Medicine in 2009.

::: example Counting divisions to a telomere limit {#ex-telomere}
Human fibroblast telomeres lose about 50–100 bp per division in culture without telomerase (Harley, Futcher and Greider, 1990, measured about 50 bp per division). Suppose that telomeres start at 10 kb and cells stop dividing when the shortest telomere reaches about 5 kb. (a) How many divisions are possible at 50 and at 100 bp per division? (b) Why is the shortening larger than the length of one RNA primer? (These starting and critical lengths are illustrative; real values vary between cell types and individuals.)
::: solution
(a) $(10\,000 - 5000)/50 = 100$ divisions at 50 bp per division and $5000/100 = 50$ at 100 bp. The second figure is close to the 40–60 population doublings that Hayflick observed.

(b) The loss from the last primer alone would be about 10 nucleotides on one strand of each end. Telomeres shorten much more because the C-rich strand is also **resected** by nucleases after replication to create the 3′ overhang needed for the protective cap, and because oxidative damage and fork problems in repetitive telomeric DNA cause further losses.
:::
:::

Telomerase is active in the germ line, in many stem-cell populations and in most cancer cells, which escape the division limit by re-expressing *TERT* or, in a minority of tumours, by a recombination-based mechanism (alternative lengthening of telomeres). Most somatic human cells have little activity. Mice have long telomeres and active telomerase in many tissues, so the "telomere clock" is not a universal timer of ageing. Telomere biology in human health and disease is discussed in Medicine Atlas ([/learn/medicine/](/learn/medicine/)).

::: quiz
A yeast mutant lacks the RNA subunit of telomerase. Which outcome do you expect over many generations?
- [ ] Immediate death in the first cell cycle, because chromosome ends cannot be replicated at all.
- [x] Progressive telomere shortening over dozens of generations, then a growth crisis, with rare survivors that lengthen telomeres by recombination.
- [ ] No effect, because yeast chromosomes are circular.
- [ ] Longer telomeres, because the telomeric protein cap is no longer limited by telomerase.
::: solution
Each division loses only a little telomeric DNA, so the cells grow normally until telomeres become critically short; then they arrest (senescence). Victoria Lundblad and Jack Szostak (1989) described this "ever shorter telomeres" phenotype in budding yeast, whose chromosomes are linear, for mutants of the telomerase subunit gene *EST1*, and the same is seen when the RNA subunit gene *TLC1* is deleted (Miriam Singer and Daniel Gottschling, 1994). Survivors arise that maintain telomeres by homologous recombination, analogous to the alternative lengthening of telomeres in some human cancers.
:::
:::

::: application Polymerases in the laboratory
The properties that make polymerases good replicases also make them tools. The thermostable polymerase of *Thermus aquaticus* (Taq) underlies the polymerase chain reaction, and enzymes with proofreading exonucleases (such as Pfu) are used when accuracy matters. Reverse transcriptases from retroviruses copy RNA into complementary DNA. The fluorescent dideoxynucleotides of Sanger sequencing exploit the polymerase's need for a 3′-OH, and DNA ligase joins fragments in cloning. All these are developed in [[molecular-biology/molecular-tools]].
:::

::: history
James Watson and Francis Crick suggested semiconservative copying in 1953. Arthur Kornberg and colleagues reported DNA polymerase I from *E. coli* in 1956 (Nobel Prize 1959, with Severo Ochoa). J. Herbert Taylor, Philip Woods and Walter Hughes showed semiconservative segregation of chromosomes in *Vicia faba* in 1957, and Matthew Meselson and Franklin Stahl published *The replication of DNA in* Escherichia coli in 1958. John Cairns photographed the θ-shaped replicating *E. coli* chromosome in 1963. François Jacob, Sydney Brenner and François Cuzin proposed the replicon model, with an initiator acting on a replicator sequence, in 1963. Reiji Okazaki and colleagues described the short fragments of discontinuous synthesis in 1968, Paula DeLucia and John Cairns isolated the *polA1* mutant in 1969, and Stephen Cooper and Charles Helmstetter worked out the timing of replication in the *E. coli* cell cycle in 1968. Elizabeth Blackburn and Joseph Gall described telomeric repeats in 1978, and Carol Greider and Blackburn discovered telomerase in 1985. Joseph Yeeles, John Diffley and colleagues reconstituted regulated eukaryotic origin firing with purified yeast proteins in 2015.
:::

::: summary
- Replication is semiconservative. Meselson and Stahl (1958) saw only hybrid DNA after one generation and equal hybrid and light DNA after two; the hybrid fraction falls as $2^{1-n}$. All models predict the same mean density, so resolving molecules by density was essential.
- At a fork, a hexameric helicase unwinds DNA, SSB or RPA coats single strands, primase makes RNA primers, and a clamp-bound replicative polymerase extends them. The leading strand is continuous; the lagging strand is made as Okazaki fragments (1–2 kb in bacteria, 100–200 nt in eukaryotes) that are processed and ligated.
- Processivity comes from sliding clamps (β, PCNA) placed by clamp loaders. Bacterial forks move at about 1000 nt s⁻¹, eukaryotic forks at about 1–3 kb min⁻¹.
- *E. coli* replicates bidirectionally from *oriC* (DnaA initiator) to a Tus–*ter* terminus. Fast-growing cells initiate before previous rounds finish, giving an ori/ter ratio of $2^{C/\tau}$.
- Eukaryotes use many origins: tens of thousands per human S phase. MCM double hexamers are loaded in G1 (licensing, low CDK) and activated as CMG in S phase (DDK and CDK), so each origin fires once per cycle.
- Fidelity is about $10^{-10}$ per bp per replication, the product of base selection ($10^{-5}$), proofreading ($10^{-2}$) and mismatch repair ($10^{-3}$).
- Linear chromosomes shorten at each division (the end-replication problem and end processing). Telomerase, a reverse transcriptase carrying its own RNA template, extends telomeric repeats; shelterin protects the ends.
:::

## Exercises

::: exercise Hybrid fraction {level=1 check="0.125"}
In a Meselson–Stahl experiment, what fraction of the DNA is in the hybrid band after 4 generations in $^{14}$N medium?
::: solution
$2^{1-4} = 2^{-3} = 0.125$. The remaining 0.875 is light.
:::
:::

::: exercise Density of a dispersive band {level=1 check="1.7135"}
Under the dispersive model, at what buoyant density (g cm⁻³, four decimal places) would DNA band after 2 generations in light medium, with $\rho_L = 1.710$ and $\rho_H = 1.724$?
::: solution
$1.710 + 0.014\times2^{-2} = 1.710 + 0.0035 = 1.7135\ \mathrm{g\,cm^{-3}}$.
:::
:::

::: exercise Replication time of a bacterial chromosome {level=1 check="45"}
A bacterium has a 5.4 Mb circular chromosome replicated bidirectionally from one origin, with forks moving at 1000 nt s⁻¹. How long does replication take, in minutes?
::: solution
Each fork copies $2.7\times10^6$ bp in $2.7\times10^6/1000 = 2700$ s, which is 45 min.
:::
:::

::: exercise What the heat-denaturation step showed {level=2}
After one generation Meselson and Stahl heated the hybrid DNA, which separated into two components of heavy and light density. (a) What does this show, and what would it have shown under the dispersive model? (b) Why could the experiment not, by itself, establish that the two subunits were the two strands of a Watson–Crick duplex?
::: solution
(a) The hybrid molecule consists of two subunits, one entirely heavy and one entirely light, so the parental material is conserved as intact subunits. Under dispersive replication every subunit would have contained a mixture of old and new material, and denaturation would have given a single band of intermediate density. (b) The experiment detected subunits by density only; their size and chemical nature were not determined. In 1958 the DNA was sheared into fragments of unknown structure, and the subunits might in principle have been pairs of duplexes, for example. That the subunits were single polynucleotide strands was confirmed later by physical studies and the identification of the denatured product as single-stranded DNA.
:::
:::

::: exercise Gene dosage in fast growth {level=2 check="2.83"}
A culture with $C = 45$ min doubles every 30 min. (a) What is the ori/ter ratio (two decimal places)? (b) What is the copy number of a gene halfway between *oriC* and *ter*, relative to a gene at *ter*?
::: solution
(a) From [[#eq-ori-ter]], $2^{C/\tau} = 2^{45/30} = 2^{1.5} = 2.83$.

(b) With $m = 0.5$, $2^{(1-m)C/\tau} = 2^{0.75} = 1.68$. Equivalently it has $2^{-0.75} = 0.59$ times the copy number of the origin: the dosage falls exponentially along each arm of the chromosome.
:::
:::

::: exercise Mutator strains {level=2}
Three *E. coli* mutants have elevated spontaneous mutation rates: mutant A lacks Pol III's 3′→5′ exonuclease, mutant B lacks MutS, and mutant C lacks Dam methylase. Using [[#prop-fidelity]], estimate the expected rise in mutation rate for A and B, and explain why C is also a mutator.
::: solution
A: losing proofreading removes a factor of about $10^2$, but in practice the rise is larger (the *mutD* mutator is up to $10^3$–$10^4$-fold), because the flood of replication errors saturates mismatch repair. B: losing mismatch repair removes the factor of $10^3$, so a rise of about 100- to 1000-fold is expected, as observed for *mutS* strains. C: mismatch repair in *E. coli* uses hemimethylated `GATC` sites to identify the new strand; without Dam methylation neither strand is marked, so repair cannot tell old from new, and about half of all "corrections" replace the right base with the wrong one. *dam* mutants are therefore mutators, though weaker ones.
:::
:::

::: exercise Interpreting a DNA fibre experiment {level=3}
Human cells are given a 20-minute pulse of one thymidine analogue (shown red) followed by a 20-minute pulse of another (green). Single DNA molecules are then spread on glass and stained. (a) A molecule shows a red stretch of 30 μm followed by green of 28 μm. What is the fork rate in kb per minute, taking 1 μm = 2.6 kb for stretched DNA? (b) Another molecule shows green–red–green with a short red track in the middle. What does this represent? (c) After treatment with a drug that slows forks, you see many more green-only tracks. Interpret this.
::: solution
(a) The red track records 20 min of fork movement: $30\ \mu\mathrm{m}\times2.6\ \mathrm{kb}\,\mu\mathrm{m}^{-1} = 78$ kb in 20 min, or 3.9 kb min⁻¹; the green track gives $28\times2.6/20 = 3.6$ kb min⁻¹, so the fork moved at about 3.6–3.9 kb min⁻¹, at or a little above the fast end of the usual range for mammalian forks.

(b) A green–red–green pattern is an origin that fired during the first pulse: two forks moved outwards from it, the red label marking the first 20 min and the green the continued movement of both forks. (The red section is centred on the origin.)

(c) Green-only tracks are origins that fired during the second pulse. More of them after the drug means that the cells fired extra (dormant) origins in response to slow forks, compensating to complete replication in time.
:::
:::

::: exercise Telomerase and the template {level=3}
The template region of human telomerase RNA is `3'-CAAUCCCAAUC-5'`. (a) Show how it directs the addition of `TTAGGG` repeats to a chromosome end ending in `...TTAGGG-3'`. (b) A mutant telomerase RNA has `3'-CAAUCCCCAUC-5'` in the template. Predict the repeat that would be added and how you could detect it. (c) Why does telomerase not need a separate primase to extend the G-rich strand?
::: solution
(a) Number the template from its 3′ end: `C1 A2 A3 U4 C5 C6 C7 A8 A9 U10 C11`. A chromosome end `...TTAGGG-3'` pairs with `3'-A2 A3 U4 C5 C6 C7-5'`, and telomerase copies the rest of the template (`A8 A9 U10 C11`), adding `TTAG`. The enzyme then translocates: the new end `...GTTAG-3'` re-pairs with `3'-C1 A2 A3 U4 C5-5'` at the template's 3′ end, and copying `C6` to `C11` adds `GGTTAG`. Each further cycle adds `GGTTAG`, which in continuous sequence is one more `TTAGGG` repeat in register.

(b) The mutant template is `C1 A2 A3 U4 C5 C6 C7 C8 A9 U10 C11`. Copying `C6` to `C11` now adds `GGGTAG` instead of `GGTTAG`, so the repeats become `GTAGGG` in place of `TTAGGG`. The altered product also pairs less well with the 3′ end of the template in the next cycle, so processivity may fall. The new repeats can be detected by sequencing telomeric DNA or with a probe specific for them. Guo-Liang Yu, Elizabeth Blackburn and colleagues (1990) did exactly this in *Tetrahymena*, showing that the RNA is the template in vivo; cells with mutant repeats also had abnormal telomeres and divided poorly, because the telomere-binding proteins recognise the repeat sequence.

(c) Telomerase extends an existing 3′ end — the overhang of the chromosome — using its own RNA as template; it needs a primer, as every polymerase does, and the chromosome end supplies it. The opposite, C-rich strand is then filled in by polymerase α–primase, which does need a primer.
:::
:::
