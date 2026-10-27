"Every cell from a cell": the third clause of the cell theory ([[cell-biology/cells-and-microscopy#def-cell-theory]]) hides a demanding task. To make two cells from one, a cell must double its mass, copy its entire genome exactly once, separate the two copies so that each daughter gets one complete set, and only then divide. The sequence of events by which it does this is the **cell cycle**. A human body contains some $3\times10^{13}$ cells, the product of about 45 rounds of doubling, and in an adult tens of billions of cells divide every day to replace those that are lost. Each division must be accurate: an error in chromosome segregation or a division at the wrong time can kill the cell, or start it on the road to cancer.

This chapter explains the stages of the cycle, the mechanics of mitosis and cytokinesis, and the control system — a biochemical oscillator built from **cyclin-dependent kinases** — that orders them. We then look at the **checkpoints** that pause the cycle when something is wrong, and at how the failure of control leads to cancer. Along the way we use simple models to answer quantitative questions: what fraction of cells in a growing culture are in mitosis, how long it takes to copy a genome, and how a bacterium can divide faster than it replicates its chromosome.

## The phases of the cycle

::: definition Phases of the eukaryotic cell cycle {#def-phases}
The eukaryotic cell cycle consists of **interphase** and **M phase**. Interphase is divided into **G1** (the gap between mitosis and DNA synthesis), **S phase** (DNA synthesis, in which the chromosomes are replicated) and **G2** (the gap between S and mitosis). **M phase** comprises **mitosis**, the separation of the replicated chromosomes (sister chromatids) into two nuclei, and **cytokinesis**, the division of the cytoplasm. Cells that stop dividing leave the cycle from G1 into a resting state called **G0**, from which many can re-enter.
:::

The names date from 1953, when Alma Howard and Stephen Pelc fed radioactive phosphate to the root tips of the broad bean *Vicia faba* and found by autoradiography that DNA was synthesised only during a limited period of interphase, separated from mitosis by gaps on either side. Durations vary enormously. A typical proliferating human cell in culture has a cycle of about 24 h: G1 about 11 h, S about 8 h, G2 about 4 h and M about 1 h (Alberts, *Molecular Biology of the Cell*, 7th ed.). Budding yeast divides in about 90 minutes in rich medium. The early embryos of the frog *Xenopus laevis* go through twelve rapid cycles of about 30 minutes, and those of *Drosophila* through cycles of under ten minutes, by skipping the gap phases and alternating S and M using stores laid down in the egg.

::: example How many divisions make and maintain a body? {#ex-doublings}
(a) If a human body of $3\times10^{13}$ cells were built from a fertilised egg by synchronous doublings with no cell death, how many rounds of division would be needed? (b) Ron Sender and Ron Milo (2021) estimated that an adult replaces about $3.3\times10^{11}$ cells per day, mostly blood cells and gut epithelium. What fraction of the body's cells is that, and how many divisions per second?
::: solution
(a) $\log_2(3\times10^{13}) = \log_2 3 + 13\log_2 10 = 1.58 + 43.19 = 44.8$, so about 45 doublings. Real development involves extensive cell death and unequal proliferation, so many lineages divide more often than this.

(b) $3.3\times10^{11}/3\times10^{13} \approx 1.1\ \%$ per day. Since each division produces one extra cell, about $3.3\times10^{11}/86\,400 \approx 3.8\times10^6$ divisions are needed every second — each one an opportunity for an error that the controls described below must catch.
:::
:::

## Mitosis and cytokinesis

Mitosis was described and named by Walther Flemming in 1882 from the fixed and stained cells of salamander larvae. It is conventionally divided into stages, though the process is continuous.

1. **Prophase.** The replicated chromosomes **condense**, each visible as two sister chromatids held together along their length and especially at the **centromere** by the protein ring **cohesin**; condensation is driven by condensin complexes. The two **centrosomes**, duplicated in S phase, separate and nucleate the microtubules of the **mitotic spindle** ([[cell-biology/cytoskeleton]]).
2. **Prometaphase.** The nuclear envelope breaks down (in animal and plant cells; many fungi and protists keep it, an "open" versus "closed" mitosis). Microtubules from the spindle poles grow and shrink by dynamic instability until their plus ends are captured by **kinetochores**, protein assemblies on each centromere.
3. **Metaphase.** Each pair of sister kinetochores becomes attached to opposite poles (**bi-orientation**), and the chromosomes line up at the spindle equator, held under tension.
4. **Anaphase.** Cohesin is cleaved suddenly and simultaneously on all chromosomes, the sisters separate, and they are pulled to opposite poles (**anaphase A**, by kinetochore-microtubule shortening), while the poles themselves move apart (**anaphase B**, by sliding of interpolar microtubules and pulling on astral microtubules).
5. **Telophase.** The chromosomes arrive at the poles and decondense, and nuclear envelopes reform around each set.

**Cytokinesis** in animal cells is carried out by a **contractile ring** of actin and myosin II assembled beneath the plasma membrane at the cell's equator, its position specified by the anaphase spindle. The ring constricts, forming a cleavage furrow, until a narrow bridge remains, which is finally severed (**abscission**). Plant cells, inside rigid walls, cannot pinch in two; instead a structure of microtubules and actin, the **phragmoplast**, guides Golgi-derived vesicles to the equator, where they fuse to build a new wall, the **cell plate**, from the centre outwards.

::: warning "Mitosis is the same as cell division" — and "chromosomes are pulled by motors at the poles"
Mitosis is the division of the nucleus; cytokinesis is the division of the cell. They usually go together but can be uncoupled: the cells of the early *Drosophila* embryo, of the liver and of cardiac muscle undergo mitosis without cytokinesis, giving multinucleate or polyploid cells. A second misconception is that chromosomes are hauled in by motors sitting at the spindle poles. In fact the force for anaphase A comes largely from the kinetochore itself, which keeps hold of a depolymerising microtubule end and is carried along as it shrinks — Gary Gorbsky, Paul Sammak and Gary Borisy showed in 1987 that tubulin is lost at the kinetochore end as chromosomes move poleward.
:::

## How long is each phase? The age distribution of a growing culture

Watching single cells, as can now be done for days by time-lapse microscopy, is the most direct way to measure phase durations. The classic method was to look at a fixed sample of an asynchronously growing culture and count the fraction of cells in each phase — the **mitotic index** for M, the fraction labelled by a short pulse of a DNA precursor for S. Converting such a fraction into a duration requires a small piece of population biology.

::: proposition Age distribution of an exponentially growing population {#prop-age}
Suppose every cell divides into two at exactly age $T$ (the cycle time), and the population grows exponentially in steady state. Then the density of cells of age $a$ is

$$
n(a) = \frac{2\ln 2}{T}\,2^{-a/T}, \qquad 0 \le a < T,
$$ {#eq-age}

so the fraction of cells whose age lies between $a_1$ and $a_2$ is

$$
f = 2^{1-a_1/T} - 2^{1-a_2/T}.
$$ {#eq-phase-fraction}

There are twice as many newborn cells as cells about to divide. Assumptions: all cells have the same cycle time (no variability), no cells die or leave the cycle, and the population has grown long enough to reach its stable age distribution.
:::

::: proof
In exponential growth with doubling time $T$, the rate of births at time $s$ is proportional to $e^{\lambda s}$, where $\lambda = \ln2/T$. A cell of age $a$ at time $t$ was born at time $t - a$, so $n(a) \propto e^{\lambda(t-a)} \propto 2^{-a/T}$. Normalising, $\int_0^T 2^{-a/T}\,da = \frac{T}{\ln2}(1 - \tfrac12) = \frac{T}{2\ln2}$, which gives [[#eq-age]]. Integrating $n(a)$ from $a_1$ to $a_2$ gives $2(2^{-a_1/T} - 2^{-a_2/T})$, which is [[#eq-phase-fraction]].
:::

::: example What fraction of cells are in mitosis? {#ex-mitotic-index}
For the 24 h human cycle (G1 11 h, S 8 h, G2 4 h, M 1 h), calculate the fraction of cells in each phase in an exponentially growing culture, and compare with the naive fractions (duration divided by 24 h).
::: solution
Using [[#eq-phase-fraction]] with ages measured from birth (M occupies the last hour, ages 23–24 h):

$$
\begin{aligned}
f_\mathrm{G1} &= 2^{1} - 2^{1-11/24} = 2 - 1.456 = 0.544,\\
f_\mathrm{S} &= 2^{1-11/24} - 2^{1-19/24} = 1.456 - 1.155 = 0.300,\\
f_\mathrm{G2} &= 2^{1-19/24} - 2^{1-23/24} = 1.155 - 1.029 = 0.126,\\
f_\mathrm{M} &= 2^{1-23/24} - 1 = 0.029.
\end{aligned}
$$

The naive values are 0.458, 0.333, 0.167 and 0.042. Because young cells are more numerous than old ones, early phases are over-represented and late phases under-represented: the mitotic index of 2.9 % is about 30 % lower than the 4.2 % that M's share of the cycle would suggest. Ignoring the age distribution overestimates G2 and M durations measured from snapshot fractions.
:::
:::

::: widget plot
f: 2*ln(2)/T*2^(-x/T)*H(T - x)
x: 0, 36
y: 0, 0.08
sliders: T=24:10:36:0.5
vlines: 11; 19; 23
caption: The age density [[#eq-age]] of an exponentially growing population (fraction of cells per hour of age) against age in hours, for the cycle time $T$ set by the slider. The vertical lines mark the G1/S, S/G2 and G2/M boundaries of the 24 h cycle of [[#ex-mitotic-index]]; the area under the curve between two lines is the fraction of cells in that phase. Notice that the density falls by exactly half from birth to division, whatever $T$.
:::

## Copying the genome in S phase

DNA replication starts at **origins of replication** and proceeds in both directions from each origin, at two **replication forks**. The biochemistry belongs to [[molecular-biology]]; what matters here is the timing and the problem of copying every part of the genome once and only once.

::: example Copying a bacterial chromosome {#ex-ecoli-replication}
*E. coli* has a single circular chromosome of $4.64\times10^6$ bp with one origin. Replication forks move at about 1000 nucleotides per second at 37 °C. How long does replication take? The same bacterium can divide every 20 minutes in rich medium. How is that possible?
::: solution
Two forks, each copying half the circle: $t = 4.64\times10^6/(2\times1000) = 2320\ \mathrm{s} \approx 39\ \mathrm{min}$. This **C period** of about 40 minutes is longer than the 20-minute doubling time.

The answer, found by Stephen Cooper and Charles Helmstetter in 1968, is **multifork replication**: a cell starts new rounds of replication before the previous round is finished. Division follows the end of a round of replication by a roughly constant **D period** of about 20 minutes, so initiation must occur $C + D \approx 60$ minutes before the division it serves — three generations earlier in a 20-minute cycle. A fast-growing cell is born with chromosomes that are already being replicated, sometimes with several pairs of forks moving along each.
:::
:::

Eukaryotic chromosomes are much larger, and forks are slower (typically 1–3 kb per minute in mammalian cells), so they need many origins.

::: example How many origins does a human cell need? {#ex-origins}
A diploid human cell has $6.4\times10^9$ bp of DNA and an S phase of 8 h, with forks moving at about 2 kb per minute. What is the minimum number of origins needed if all of them fired at the start of S phase?
::: solution
Each origin gives two forks, each copying $2000\ \mathrm{bp\,min^{-1}}\times480\ \mathrm{min} = 9.6\times10^5$ bp. The minimum number of origins is

$$
N = \frac{6.4\times10^9}{2\times9.6\times10^5} \approx 3300.
$$

In fact some 30,000–50,000 origins fire in each S phase, spaced on average every 50–300 kb. With that many, all firing at once, the genome could be copied in well under an hour; S phase lasts 8 h because origins fire in a temporal programme — gene-rich, active regions early, heterochromatin late — and each origin fires only when its turn comes.
:::
:::

::: widget plot
f: 3200/(x*v)/60
x: 3, 60
y: 0, 8
sliders: v=2:1:3:0.1
labels: S\text{-phase duration (h) if all origins fire together}
hlines: 8
caption: The time in hours to replicate $6.4\times10^9$ bp of DNA if a given number of origins (horizontal axis, in thousands) all fire at once, with fork speed $v$ in kb per minute set by the slider. The horizontal line marks a typical 8 h S phase. Notice that the 30,000–50,000 origins actually used would finish in well under an hour: the length of S phase reflects the timing of origin firing, not the speed of the forks.
:::

How does a eukaryotic cell ensure that each origin fires only once per cycle? Origins are **licensed** in G1 by the loading of the MCM helicase (as an inactive double hexamer, with the help of the origin recognition complex, Cdc6 and Cdt1). In S phase, kinase activity converts loaded MCM into active helicases, and the same kinase activity prevents new MCM from loading. Licensing (low CDK activity) and firing (high CDK activity) are therefore separated in time, and no origin can be relicensed until the cell has passed through mitosis and CDK activity has fallen again. This scheme, worked out in *Xenopus* egg extracts and yeast by Ronald Laskey, John Diffley, Bruce Stillman and others, ties replication to the oscillation of CDK activity that drives the whole cycle.

## The control system: cyclins and CDKs

### Clues from frog eggs, yeast and sea urchins

Three lines of experiment converged in the late 1980s.

- **Cell fusion and egg extracts.** In 1970 Potu Rao and Robert Johnson fused HeLa cells in different phases: when a mitotic cell was fused with an interphase cell, the interphase nucleus immediately condensed its chromosomes, showing that M-phase cells contain a dominant cytoplasmic inducer. A year later Yoshio Masui and Clement Markert, working on oocytes of the leopard frog *Rana pipiens*, showed that cytoplasm from mature eggs injected into immature oocytes made them enter M phase. They called the activity **maturation-promoting factor** (MPF).
- **Yeast genetics.** From 1970 Leland Hartwell isolated temperature-sensitive *cdc* (cell-division-cycle) mutants of budding yeast that arrested at particular stages of the cycle — each cell at the restrictive temperature arresting with the same, characteristic morphology — and defined a commitment point, **Start**, in G1. In fission yeast, *Schizosaccharomyces pombe*, Paul Nurse identified *cdc2* (1975–76), whose loss blocked the cycle and whose dominant mutant allele (*wee*) made cells divide at a small size; in 1987 Melanie Lee and Nurse showed that a human gene, now called *CDK1*, could replace *cdc2* in fission yeast. The control machinery had been conserved for a billion years.
- **Cyclins.** In 1982 Tim Hunt and colleagues, studying fertilised eggs of the sea urchin *Arbacia punctulata* at the Marine Biological Laboratory in Woods Hole, noticed a protein that was made continuously but destroyed abruptly at each division; they named it **cyclin** (Evans and colleagues, 1983).

In 1988 Manfred Lohka, Marianne Hayes and James Maller purified MPF from *Xenopus* eggs, and it turned out to be a complex of the Cdc2 kinase and a cyclin. Andrew Murray and Marc Kirschner showed in 1989 that in *Xenopus* egg extracts, the synthesis of cyclin alone is enough to drive repeated cycles. Hartwell, Hunt and Nurse shared the 2001 Nobel Prize in Physiology or Medicine.

::: definition Cyclin-dependent kinase {#def-cdk}
A **cyclin-dependent kinase** (CDK) is a serine/threonine protein kinase that is active only when bound to a regulatory subunit, a **cyclin**. Cyclin levels rise and fall during the cell cycle, so the activity of each cyclin–CDK complex oscillates, and the different complexes — G1/S cyclins, S cyclins and M cyclins with their CDKs (in vertebrates, cyclin D with CDK4/6 in G1, cyclin E with CDK2 at G1/S, cyclin A with CDK2 in S, and cyclins A and B with CDK1 in G2 and M) — phosphorylate different targets to trigger successive events. CDK activity is further controlled by inhibitory and activating phosphorylation and by **CDK inhibitor proteins** (CKIs).
:::

### Building an oscillator

Rising **M-CDK** (cyclin B–CDK1) activity triggers the events of mitosis: it phosphorylates lamins (breaking down the nuclear envelope), condensins, microtubule-associated proteins and many others. Entry into mitosis is made abrupt by **positive feedback**. Cyclin B–CDK1 accumulates in G2 in an inactive form, held off by inhibitory phosphorylation of CDK1 by the kinase Wee1; at the G2/M transition the phosphatase Cdc25 removes it. Active CDK1 phosphorylates and activates Cdc25 and inhibits Wee1, so a little active CDK1 makes more active CDK1 — a switch of the kind described in [[cell-biology/cell-signalling]].

Exit from mitosis is made abrupt and irreversible by **proteolysis**. The **anaphase-promoting complex/cyclosome** (APC/C), a ubiquitin ligase activated by M-CDK together with the protein Cdc20, tags two key proteins for destruction by the proteasome: **securin**, whose loss frees the protease **separase** to cleave cohesin and start anaphase (Frank Uhlmann and Kim Nasmyth, 1999), and the M cyclins themselves, whose destruction lets the cell leave mitosis. Since M-CDK activates its own destroyer after a delay, the system is a **negative-feedback oscillator** — the sea-urchin cyclin that "appeared and disappeared" was the visible trace of this loop.

::: intuition An oscillator made of a switch and a delayed brake
Think of a toilet cistern. Water (cyclin) flows in steadily; when the level reaches a threshold, a switch (positive feedback through Cdc25 and Wee1) flips CDK1 fully on, mitosis begins, and the APC/C (the flush) empties the tank, destroying cyclin and resetting the switch. Then the cistern starts to refill. The positive feedback makes each transition sharp and stops the system dithering near the threshold; the negative feedback with a delay makes it repeat. Bistable switches with delayed negative feedback produce robust **relaxation oscillations**, and mathematical models of exactly this design, developed by John Tyson, Béla Novák and James Ferrell, reproduce the behaviour of frog-egg extracts.
:::

In G1, the cycle must be *started*, and this is where cells listen to the outside world. In animal cells, growth factors acting through the Ras–MAP-kinase pathway ([[cell-biology/cell-signalling]]) induce the transcription of cyclin D. Cyclin D–CDK4/6 begins to phosphorylate the **retinoblastoma protein** (Rb), which in its unphosphorylated form binds and inhibits the **E2F** transcription factors. Partly phosphorylated Rb releases some E2F, which switches on the genes for cyclin E and for S-phase proteins; cyclin E–CDK2 phosphorylates Rb further, releasing more E2F — another positive feedback loop. The point at which a cell no longer needs growth factors to complete the cycle is the **restriction point**, defined by Arthur Pardee in 1974 from experiments on cultured fibroblasts; molecularly it corresponds closely to the switch-like release of E2F (Guang Yao, Lingchong You and colleagues, 2008). Budding yeast's Start is the analogous decision, made by a different set of proteins with the same logic.

## Checkpoints

::: definition Checkpoint {#def-checkpoint}
A **checkpoint** is a control mechanism that delays a cell-cycle transition until a prior event has been completed correctly, by sensing a defect and sending an inhibitory signal to the cell-cycle machinery. The term was introduced by Leland Hartwell and Ted Weinert in 1989.
:::

Three checkpoints are best understood.

- **The DNA-damage checkpoints** (in G1, S and G2). Damaged or unreplicated DNA activates the kinases ATM and ATR, which activate the kinases Chk1 and Chk2. These block Cdc25 (preventing CDK activation and so entry into S or M) and stabilise the transcription factor **p53**, which is normally destroyed within minutes. Stabilised p53 induces the CDK inhibitor **p21** (arresting the cycle), DNA-repair genes and, if damage is severe, apoptosis. Weinert and Hartwell's 1988 study of yeast *rad9* mutants, which do not arrest after X-irradiation and die as a result, was the first genetic demonstration that a cell actively delays division to allow repair ([[#exr-rad9]]).
- **The spindle assembly checkpoint** (in metaphase). A single kinetochore not attached to the spindle generates a "wait anaphase" signal, built from the proteins Mad2, BubR1 and Bub3 (found in yeast screens for mutants that failed to arrest when microtubules were destroyed: Rong Li and Andrew Murray, and Andrew Hoyt and colleagues, 1991), which inhibits APC/C–Cdc20. Only when every kinetochore is attached and under tension is the signal extinguished and anaphase allowed — one unattached chromosome can hold up the whole cell.
- **The G1/S size and growth checks.** Cells do not commit to dividing until they have grown enough and, in multicellular organisms, received growth signals.

::: quiz
Cells are treated with nocodazole, a drug that depolymerises microtubules. Most cells end up arrested with condensed chromosomes and high cyclin B levels. Why?
- [ ] Cyclin B cannot be made without microtubules.
- [x] Without a spindle, kinetochores remain unattached, the spindle assembly checkpoint keeps APC/C–Cdc20 inhibited, and so cyclin B and securin are not destroyed.
- [ ] Nocodazole inhibits CDK1 directly.
- [ ] The DNA-damage checkpoint arrests the cells because chromosomes break.
::: solution
Unattached kinetochores generate the checkpoint signal that inhibits the APC/C. Cyclin B is therefore stable, CDK1 stays active, and the cells remain in a mitotic state. This arrest is used experimentally to collect mitotic cells, and spindle poisons used in cancer treatment ([[cell-biology/cytoskeleton]]) work by triggering it in dividing cells; cells held in mitosis for many hours eventually die or "slip" out of mitosis.
:::
:::

## When control fails: cancer

Cancer is a disease of cell populations that escape the controls on division, survival and location. At the cellular level, it arises by accumulation of mutations in two classes of genes.

- **Proto-oncogenes** promote proliferation. A gain-of-function mutation in one copy — making the protein overactive or produced at the wrong time — converts it into an **oncogene**. Examples are mutant *RAS* ([[cell-biology/cell-signalling]]), amplified *MYC*, and overexpressed cyclin D.
- **Tumour suppressor genes** restrain proliferation or promote repair and death. They contribute to cancer when both copies are lost. *RB1*, *TP53* (encoding p53, mutated in about half of all human cancers) and *CDKN2A* (encoding the CDK4/6 inhibitor p16) are central examples.

Alfred Knudson's analysis of retinoblastoma, a childhood eye cancer, in 1971 explained the difference. In inherited cases tumours appear earlier and often in both eyes; in sporadic cases they appear later and in one eye. Knudson proposed that two "hits" are needed: inherited cases are born with one defective copy in every cell and need only one more mutation, whereas sporadic cases need two independent mutations in the same cell. When the *RB1* gene was cloned in 1986, both copies were indeed found to be lost or mutated in the tumours.

The pathway from normal cell to tumour typically involves mutations in a handful of driver genes, accumulated over years, together with defects in the checkpoints that would normally stop a cell with damaged DNA or abnormal chromosomes from dividing — which is why loss of p53 or of the spindle checkpoint accelerates the process. Douglas Hanahan and Robert Weinberg's "hallmarks of cancer" (2000, updated 2011 and 2022) organise these changes into a small number of acquired capabilities, among them sustained proliferative signalling, evasion of growth suppressors, resistance to cell death and replicative immortality. The pathology, diagnosis and treatment of cancer belong to [Medicine Atlas: cancer biology](/learn/medicine/lesson.php?c=pathology&l=cancer-biology).

::: application Cell-cycle inhibitors and the limits of division
Because the G1 machinery is so often disrupted in cancer, it has become a target of drugs: inhibitors of CDK4/6, which keep Rb unphosphorylated, are used for some breast cancers ([Medicine Atlas: pharmacology](/learn/medicine/course.php?c=pharmacology)). Normal human cells, by contrast, have a built-in limit to division. Leonard Hayflick and Paul Moorhead found in 1961 that human fibroblasts in culture stop dividing after about 40–60 doublings and enter a permanent arrest, **replicative senescence**. One cause is the shortening of telomeres, the protective ends of chromosomes, at each round of replication in cells that lack the enzyme telomerase; short telomeres are recognised as DNA damage and trigger a p53-dependent arrest. Most cancer cells reactivate telomerase, one route to replicative immortality.
:::

::: history
Walther Flemming described mitosis in 1882, and Theodor Boveri's studies of sea-urchin eggs with abnormal numbers of chromosomes led him to propose, in 1902 and 1914, that tumours could arise from cells with abnormal chromosome constitutions. Alma Howard and Stephen Pelc defined G1, S and G2 in 1953. Potu Rao and Robert Johnson's cell-fusion experiments (1970), Yoshio Masui and Clement Markert's MPF (1971), Leland Hartwell's *cdc* mutants (from 1970), Arthur Pardee's restriction point (1974), Paul Nurse's *cdc2* (1975–76) and Tim Hunt's cyclins (1982–83) were brought together when MPF was purified and found to contain Cdc2 and cyclin B (1988). Alfred Knudson proposed the two-hit model in 1971; the first tumour suppressor, *RB1*, was cloned by Stephen Friend, Robert Weinberg, Thaddeus Dryja and colleagues in 1986, and p53, discovered in 1979 in several laboratories as a protein bound to the SV40 large T antigen, was recognised as a tumour suppressor in 1989. Leland Hartwell and Ted Weinert introduced the checkpoint concept in 1989.
:::

::: summary
- The eukaryotic cell cycle runs G1 → S → G2 → M; a typical human cell takes about 24 h (G1 11, S 8, G2 4, M 1 h). Cells leave to G0 from G1.
- Mitosis: prophase (condensation, spindle formation), prometaphase (envelope breakdown, kinetochore capture), metaphase (bi-orientation), anaphase (cohesin cleavage, sister separation), telophase; cytokinesis by a contractile ring (animals) or cell plate (plants).
- In an exponentially growing culture the age density is $n(a) \propto 2^{-a/T}$, so snapshot fractions over-represent early phases: the mitotic index of a 24 h cycle with a 1 h M phase is 2.9 %, not 4.2 %.
- *E. coli* replicates its 4.6 Mb chromosome in about 40 min and divides faster by multifork replication; human cells fire 30,000–50,000 origins in a temporal programme, licensed once per cycle.
- Cyclin–CDK complexes drive the cycle. Positive feedback (Cdc25, Wee1; Rb–E2F) makes transitions switch-like; APC/C-mediated destruction of securin and cyclins makes anaphase and mitotic exit irreversible; together they form a relaxation oscillator.
- Checkpoints (DNA damage via ATM/ATR–p53–p21; spindle assembly via Mad2–Bub; growth and size at G1/S) delay transitions until conditions are right.
- Cancer results from accumulated mutations in proto-oncogenes (gain of function, dominant) and tumour suppressors (loss of both copies, Knudson's two hits), together with loss of checkpoints.
:::

## Exercises

::: exercise A mitotic index {level=1 check="0.0353"}
Using [[#eq-phase-fraction]], what fraction of an exponentially growing population with a 20 h cycle is in a 1 h M phase at the end of the cycle (three significant figures)?
::: solution
$f_\mathrm{M} = 2^{1-19/20} - 2^{0} = 2^{0.05} - 1 = 0.0353$ (the naive value would be 0.05).
:::
:::

::: exercise Doublings to a trillion {level=1 check="39.9"}
How many doublings are needed to make $10^{12}$ cells from one cell (three significant figures)?
::: solution
$\log_2 10^{12} = 12\log_2 10 = 12\times3.322 = 39.9$. Exponential growth is fast: forty divisions suffice, and the $3\times10^{13}$ cells of a human body need only about 45, though in reality many more divisions occur because cells also die and are replaced.
:::
:::

::: exercise A slower replication fork {level=1 check="48.3"}
If replication forks in *E. coli* moved at 800 nucleotides per second (as at a lower temperature), how many minutes would it take to replicate the $4.64\times10^6$ bp chromosome from its single origin (three significant figures)?
::: solution
$4.64\times10^6/(2\times800) = 2900\ \mathrm{s} = 48.3\ \mathrm{min}$.
:::
:::

::: exercise Duration from a mitotic index {level=2 check="1.36"}
In an exponentially growing culture with a 24 h cycle, 4.0 % of the cells are in mitosis. Using [[#eq-phase-fraction]], find the duration of M phase in hours (three significant figures).
::: solution
$f_\mathrm{M} = 2^{t_\mathrm{M}/T} - 1 = 0.040$, so $t_\mathrm{M} = T\log_2 1.04 = 24\times0.0566 = 1.36\ \mathrm{h}$. The naive estimate, $0.04\times24 = 0.96$ h, would be 30 % too short.
:::
:::

::: exercise Minimum origins {level=2 check="5930"}
A cell line has $6.4\times10^9$ bp of DNA, an S phase of 6.0 h and a fork speed of 1.5 kb per minute. What is the minimum number of origins needed if all fired at the start of S phase (three significant figures)?
::: solution
$N = 6.4\times10^9/(2\times1500\times360) = 5930$.
:::
:::

::: exercise Interpreting cell fusion {level=2}
Rao and Johnson fused HeLa cells in different phases. (a) When a G1 cell was fused with an S-phase cell, the G1 nucleus began DNA synthesis early. (b) When a G2 cell was fused with an S-phase cell, the G2 nucleus did not replicate its DNA again; the S nucleus continued. (c) When a mitotic cell was fused with a cell in any interphase stage, the interphase nucleus condensed its chromatin prematurely. Interpret each result in terms of the control system described in this chapter.
::: solution
(a) The S-phase cytoplasm contains a diffusible activator of DNA synthesis (S-CDK activity and associated factors); a G1 nucleus is licensed (its origins carry loaded MCM helicases) and so can respond to it.
(b) A G2 nucleus has already replicated and its origins are no longer licensed; it cannot replicate again until it passes through mitosis. This shows that "once per cycle" is a property of the nucleus (the state of its origins), not only of the cytoplasm — the basis of the licensing model.
(c) M-phase cytoplasm contains a dominant inducer of mitosis — MPF, cyclin B–CDK1 — which acts on any nucleus. G1 nuclei condense into single chromatids, G2 nuclei into paired chromatids, and S nuclei into fragmented, "pulverised"-looking chromatin, because replication is incomplete.
:::
:::

::: exercise Multifork replication {level=3}
In the Cooper–Helmstetter model, a round of replication takes $C = 40$ min and is followed by division after $D = 20$ min. (a) For a doubling time $\tau = 60$ min, when in the cycle does initiation occur, and how many origins does a newborn cell have? (b) For $\tau = 30$ min, how many generations before the division it serves does initiation occur? (c) Explain why fast-growing bacteria are larger and contain more DNA per cell than slow-growing ones.
::: solution
(a) Initiation occurs $C + D = 60$ min before division, i.e. at the moment of the previous division (birth). A newborn cell has one origin, which fires immediately; it is born with a chromosome just starting replication.
(b) $(C + D)/\tau = 60/30 = 2$ generations before. Initiation for the division at the end of a given cycle occurred at the start of the previous cycle, in the mother. A newborn cell has a chromosome already halfway replicated, with two origins that fire at once, so it contains four origins after initiation.
(c) The DNA content per cell, averaged over the cycle, increases as $2^{(C+D)/\tau}$ roughly, because more rounds of replication overlap at short $\tau$; and cell mass at initiation per origin is approximately constant (William Donachie, 1968), so cells with more origins are larger. Both scale up together with growth rate.
:::
:::

::: exercise A checkpoint mutant {#exr-rad9 level=3}
Weinert and Hartwell (1988) irradiated budding yeast with X-rays. Wild-type cells with damaged DNA arrested in G2 for several hours before dividing; *rad9* mutants did not arrest, divided with broken chromosomes and mostly died. (a) What does this show about the normal function of *RAD9*? (b) When *rad9* cells were treated after irradiation with a microtubule poison that delayed mitosis for several hours, and then released, their survival increased substantially. Explain. (c) Why was this result important for the concept of checkpoints?
::: solution
(a) *RAD9* is not needed to repair DNA, but to *delay* division until repair is complete: it is part of a surveillance system that senses damage and inhibits progression into mitosis.
(b) The drug gave the mutants the time that the checkpoint would normally provide. Repair enzymes, which *rad9* cells still have, could mend the breaks during the artificial delay, so the cells survived.
(c) It separated control from execution: cell-cycle order is not only enforced by each event physically depending on the previous one, but by dedicated controls that can be removed by mutation without abolishing the events themselves. Loss of such controls makes cells genetically unstable, which links checkpoints to cancer.
:::
:::

::: exercise Two hits {level=3}
In a population, the probability that a given retinal cell suffers a loss-of-function mutation in one *RB1* copy during development is $\mu$ (very small), and there are $N$ susceptible cells per eye. (a) Explain why, if $N\mu$ is of order 1, a child born with one defective copy in every cell is very likely to develop a tumour, and often more than one. (b) Explain why a child born with two functional copies is very unlikely to develop one. (c) Knudson observed that the number of tumours per eye in inherited cases follows a Poisson distribution with mean about 3. What is the probability that an eye in an inherited case has no tumour?
::: solution
(a) Every cell already has one hit; a tumour needs only one more, which happens with probability $\mu$ per cell. The expected number of tumours per eye is $N\mu$, of order 1–3, so most such children develop at least one tumour, frequently several, often in both eyes.
(b) Two hits are needed in the same cell, with probability about $\mu^2$ per cell, giving an expected number $N\mu^2 = (N\mu)\mu$, which is tiny because $\mu$ is small. Sporadic tumours are therefore rare, single, unilateral and arise later.
(c) With a Poisson mean $m = 3$, $P(0) = e^{-3} = 0.050$: about 5 % of eyes are tumour-free, consistent with the observation that a minority of carriers are unaffected (incomplete penetrance). This kind of reasoning about rates and counts is the subject of [[biostatistics]]; it involves no clinical judgement.
:::
:::
