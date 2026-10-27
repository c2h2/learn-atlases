A human cell holds about two metres of DNA in a nucleus roughly ten micrometres across. That DNA must be packed more than a hundred-thousand-fold, yet every gene stays reachable by the proteins that read it. The whole genome must also be unpacked, copied and packed again at every division without tangling. Molecular biology begins with this physical problem. How a long, stiff, negatively charged polymer is folded, twisted and wrapped decides which parts of it can be read, and the proteins that do the folding are themselves tools of gene regulation.

This chapter starts from the double helix and asks what its geometry means for the proteins that bind it. It then treats DNA as a topological object, with linking number, supercoiling and the topoisomerases that change them, and ends with chromatin: nucleosomes, the higher-order folding of interphase and mitotic chromosomes, and the bacterial nucleoid. The chemistry of nucleotides, base pairing, helix stability and melting is covered in Chemistry Atlas ([Nucleic acids](/learn/chemistry/lesson.php?c=biochemistry&l=nucleic-acids)), and the evidence that genes are made of DNA in [[genetics/genes-and-mutation]]. Here we build on both.

## The double helix as a surface for proteins

Watson and Crick's model of 1953 had two antiparallel polynucleotide chains wound round a common axis. The sugar–phosphate backbones are on the outside and the bases are paired inside, A with T and G with C. Two features of the model matter most to a molecular biologist. First, the sequence of one strand fixes the sequence of the other, so either strand can serve as a template. Second, the outside of the helix is not uniform. Because the two glycosidic bonds of a base pair leave the pair on the same side, the backbones are closer together on one side of the helix than the other, and two grooves of different width wind round it.

::: definition B-DNA and its grooves {#def-bdna}
**B-DNA** is the right-handed double helix formed by DNA of mixed sequence in water at physiological salt. It has about **10.5 base pairs per turn** in solution, a rise of **0.34 nm** per base pair (so a pitch of about 3.6 nm) and a diameter of about **2 nm**. The base pairs lie nearly perpendicular to the helix axis. The helix has a **major groove**, about 2.2 nm wide and fairly deep, and a **minor groove**, about 1.2 nm wide. Either strand is written 5′→3′, and the strands run in opposite directions (antiparallel).
:::

The value of 10.5 base pairs per turn comes from solution measurements (James Wang, 1979, from the change in linking number when DNA segments of different lengths were inserted into a closed circle). The figure of 10 base pairs per turn in early fibre diagrams was an approximation. DNA is not a rigid rod, though over short distances it is stiff: its **persistence length**, the distance over which its direction stays correlated, is about 50 nm, or 150 base pairs, at physiological salt. Bending DNA much more sharply than that, as the nucleosome does, costs free energy that the bending protein must pay for.

The edges of the base pairs exposed in the grooves carry hydrogen-bond donors and acceptors and the methyl group of thymine. In the **major groove** the pattern of these groups differs for all four base-pair orientations (A·T, T·A, G·C, C·G), so a protein side chain inserted there can read the sequence without opening the helix. In the minor groove A·T and T·A look almost the same, as do G·C and C·G. Nadrian Seeman, John Rosenberg and Alexander Rich pointed this out in 1976. It is why most sequence-specific DNA-binding proteins, such as bacterial repressors and the eukaryotic transcription factors of [[molecular-biology/eukaryotic-gene-regulation]], put an α-helix into the major groove. Proteins that bind the minor groove, such as the TATA-binding protein of [[molecular-biology/transcription]], tend to read DNA *shape* (a narrow minor groove, a bendable sequence) rather than individual bases.

Other helical forms exist. **A-DNA**, favoured by dehydration and adopted by RNA duplexes and DNA–RNA hybrids, is right-handed and wider (about 2.6 nm), with about 11 base pairs per turn, base pairs tilted to the axis and a deep, narrow major groove. **Z-DNA**, which forms from alternating purine–pyrimidine sequences such as `(CG)n` under high salt or negative supercoiling, is a left-handed helix of about 12 base pairs per turn with a zigzag backbone. Proteins that bind Z-DNA specifically exist, but how much Z-DNA forms in cells is still uncertain.

::: example Which side of the helix? {#ex-helical-phase}
Two copies of a DNA-binding protein bind sites whose centres are separated by $d$ base pairs on a straight stretch of B-DNA. The proteins touch each other, and so bind cooperatively, only if their sites face the same side of the helix. Using 10.5 bp per turn, find the angle between the two sites for $d = 21$, $26$ and $63$ bp, and say which spacings allow contact without bending or twisting the DNA.
::: solution
Each base pair turns the helix by $360^\circ/10.5 = 34.3^\circ$, so the angle between sites is $34.3^\circ\times d$, read modulo $360^\circ$.

- $d = 21$: $21/10.5 = 2.0$ turns exactly, so the angle is $0^\circ$ and the sites are on the same face.
- $d = 26$: $26/10.5 = 2.476$ turns. The fractional part 0.476 turn is $171^\circ$, so the sites are on almost opposite faces. Contact would require twisting the intervening DNA by nearly half a turn, which is costly over so short a distance.
- $d = 63$: $63/10.5 = 6.0$ turns, so the sites are again on the same face. They are 21.4 nm apart, however, so the proteins can touch only if the DNA between them loops out.

Experiments of exactly this kind, in which the spacing between two operators was varied one base pair at a time, showed that repression by the λ and *lac* repressors rises and falls with a period of about 10.5–11 bp. That was some of the best evidence that the proteins act by forming a DNA loop ([[molecular-biology/bacterial-gene-regulation]]).
:::
:::

::: widget plot
f: (1 + cos(2*pi*x/h))/2
x: 0, 70
y: 0, 1.05
sliders: h=10.5:10:12:0.1
labels: \text{alignment of the two sites}
vlines: 21; 26; 63
caption: How well two protein-binding sites separated by $x$ base pairs face the same side of a B-DNA helix with $h$ base pairs per turn, on a scale from 1 (same face) to 0 (opposite faces): $(1 + \cos 2\pi x/h)/2$. The vertical lines mark the spacings of [[#ex-helical-phase]]. Change $h$ to 10.0, the old fibre value, and see how far the peaks drift by 60 bp. This is why the exact helical repeat matters when looping or cooperative binding is studied.
:::

## How long is a genome?

Genomes are enormous compared with the cells that hold them, and the numbers explain why packaging is unavoidable.

::: example Genome length and compaction {#ex-length}
(a) The *Escherichia coli* K-12 chromosome has $4.64\times10^6$ bp. How long is it as B-DNA, and how does that compare with a cell about 2 μm long? (b) Human chromosome 1 has about $2.49\times10^8$ bp (GRCh38 assembly). How long is its DNA, and by what factor is it compacted in a mitotic chromosome about 10 μm long? (c) How much DNA does a diploid human nucleus hold?
::: solution
(a) $4.64\times10^6\times0.34\ \mathrm{nm} = 1.58\times10^6\ \mathrm{nm} = 1.58\ \mathrm{mm}$, about 800 times the length of the cell.

(b) $2.49\times10^8\times0.34\ \mathrm{nm} = 8.5\times10^7\ \mathrm{nm} = 85\ \mathrm{mm}$. Each mitotic chromatid holds one DNA molecule, so the linear compaction is $85\ \mathrm{mm}/10\ \mu\mathrm{m} \approx 8.5\times10^3$, of the order of $10^4$. (The chromosome length is approximate; mitotic chromosomes vary in length with the preparation.)

(c) A diploid genome of about $6.2\times10^9$ bp is $6.2\times10^9\times0.34\ \mathrm{nm} = 2.1\ \mathrm{m}$ of DNA in a nucleus of diameter about 5–10 μm.
:::
:::

Genome size varies more than a thousand-fold among eukaryotes and is only loosely related to organismal complexity. The onion (*Allium cepa*) has about five times as much DNA per haploid genome as a human. This mismatch, once called the **C-value paradox**, has a simple explanation: most of the extra DNA in large genomes is repeated sequence, especially transposable elements ([[molecular-biology/dna-repair-recombination]]), and not extra genes. Humans have roughly 20,000 protein-coding genes (GENCODE, as of 2024), and coding sequence makes up only about 1.5 % of the genome.

## DNA topology

A closed circular DNA, or a long linear molecule whose ends are held fixed by proteins, has a property that a free linear molecule lacks. Its two strands are interlinked a definite number of times, and that number cannot change unless a strand is broken. The definitions of **linking number** $Lk$, **twist** $Tw$ and **writhe** $Wr$, with $Lk = Tw + Wr$, and of the superhelical density $\sigma = (Lk - Lk_0)/Lk_0$, are given in Chemistry Atlas ([Nucleic acids, Length and topology](/learn/chemistry/lesson.php?c=biochemistry&l=nucleic-acids)). We restate them as the working rules a biologist needs.

::: proposition Rules of DNA topology {#prop-topology}
For a covalently closed duplex DNA of $N$ base pairs:
1. $Lk$ is an integer and is unchanged by any deformation that does not break a strand. It is the sum of twist and writhe, $Lk = Tw + Wr$, which can trade off against each other continuously.
2. The relaxed molecule has $Lk_0 = N/h$, with $h \approx 10.5$ bp per turn. A molecule with $Lk < Lk_0$ is **negatively supercoiled** ($\sigma < 0$) and one with $Lk > Lk_0$ is **positively supercoiled**.
3. A **type I topoisomerase** cuts one strand, lets the duplex rotate or passes the other strand through the gap, and reseals it, changing $Lk$ by $\pm1$ per event. A **type II topoisomerase** cuts both strands, passes another duplex segment through the break and reseals it, changing $Lk$ by $\pm2$ per event and using ATP.
4. The free energy of supercoiling is approximately quadratic in $\sigma$, $\Delta G \propto N\sigma^2$, so it rises steeply with the degree of supercoiling. Negative supercoiling lowers the extra free energy needed to unwind the duplex locally.
:::

Rule 3 was demonstrated directly by gel electrophoresis. Supercoiled molecules are compact and run fast, and molecules that differ by one unit of $Lk$ separate into a ladder of **topoisomers**. Treatment with a type I enzyme produces a ladder spaced by one, while a type II enzyme changes the distribution in steps of two. Rule 4 explains why negative supercoiling helps replication origins and promoters open. Some of the strain stored in an underwound molecule is released when a bubble of separated strands forms, so less free energy is needed to start replication or transcription.

Topoisomerases are not optional. Two problems make them essential.

1. **Unwinding ahead of a fork or a polymerase.** To copy or transcribe DNA, the strands must be separated, removing one turn of twist for every 10.5 base pairs passed. If the DNA ahead cannot rotate freely, because it is very long or anchored, this unwinding piles up **positive supercoils** ahead of the machine and leaves **negative supercoils** behind it. This is the twin-supercoiled-domain model of Leroy Liu and James Wang (1987). In *E. coli*, **DNA gyrase**, a type II enzyme discovered by Martin Gellert and colleagues in 1976, removes positive supercoils and introduces negative ones using ATP. Eukaryotic topoisomerases I and II relax supercoils of both signs.
2. **Unlinking daughter molecules.** When two replication forks meet, the two daughter duplexes are still intertwined (**catenated**). Only a type II enzyme can separate them, by passing one duplex through the other: topoisomerase IV in *E. coli* and topoisomerase II in eukaryotes. Without it, sister chromatids cannot segregate at mitosis.

::: application Topoisomerases as drug targets
Because topoisomerases work by making transient breaks, a drug that traps the enzyme while the DNA is cut turns it into a source of DNA damage. The quinolone antibiotics, such as ciprofloxacin, trap bacterial gyrase and topoisomerase IV. Camptothecin derivatives trap human topoisomerase I, and etoposide and doxorubicin trap topoisomerase II; these are used in cancer chemotherapy, where rapidly dividing cells suffer most. How these drugs are used clinically belongs to Medicine Atlas ([/learn/medicine/](/learn/medicine/)). The point here is mechanistic: the target is the enzyme–DNA intermediate, and that is possible only because topoisomerases cut DNA.
:::

::: quiz
A relaxed closed circular plasmid is treated with an enzyme and ATP. On a gel the product runs as a ladder of topoisomers whose $Lk$ values differ by 2, all lower than $Lk_0$. Which enzyme was it most likely to be?
- [ ] *E. coli* topoisomerase I
- [x] DNA gyrase
- [ ] Human topoisomerase I
- [ ] DNA ligase
::: solution
A change of $Lk$ in steps of two requires a double-strand break with strand passage, so the enzyme is a type II topoisomerase. Producing *negative* supercoils from relaxed DNA uses energy, and gyrase is the type II enzyme that does this with ATP. Type I enzymes change $Lk$ in steps of one and, without an energy source, can only relax DNA. Ligase seals nicks; sealing a nicked circle in the presence of an intercalator or a bound protein can trap supercoils, but not in steps of two.
:::
:::

## Nucleosomes

In eukaryotes the first level of packing is the nucleosome. Its discovery came from several directions in 1973–75. Dean Hewish and Leigh Burgoyne found that a nuclease inside rat liver nuclei cut chromatin into fragments that were multiples of a unit length. Ada and Donald Olins, and Christopher Woodcock, saw "beads on a string" in electron micrographs of spread chromatin. Roger Kornberg (1974) proposed that the unit is about 200 bp of DNA associated with two each of the four core histones.

::: definition Nucleosome, core particle and linker {#def-nucleosome}
The **nucleosome core particle** is 147 bp of DNA wrapped in about 1.65 turns of a left-handed superhelix round a **histone octamer**, a disc about 11 nm across and 5.5 nm high. The octamer consists of a central (H3–H4)₂ tetramer flanked by two H2A–H2B dimers. Each histone has a **histone-fold** domain, which binds DNA, and a flexible N-terminal **tail** that protrudes from the particle and is heavily modified. Successive cores are joined by **linker DNA**, typically 20–80 bp. The **nucleosome repeat length** (core plus linker) is about 165 bp in budding yeast and about 185–200 bp in most animal cells. The **linker histone** H1 binds where DNA enters and leaves the core. A string of nucleosomes, about 10 nm wide, is the **10 nm fibre**.
:::

The atomic structure of the core particle was solved by Karolin Luger, Timothy Richmond and colleagues in 1997. The DNA contacts the octamer every 10 bp or so, where its minor groove faces inwards, through about 14 contact regions involving arginine side chains in the minor groove, helix dipoles and hydrogen bonds to the phosphates. Histones are rich in lysine and arginine, and their positive charges neutralise much of the DNA's charge. The contacts are with the backbone rather than with the bases, so histones bind almost any sequence. Sequences that bend easily, such as those with A·T-rich steps where the minor groove faces the octamer every 10 bp, are favoured, and some sequences, such as long poly(dA·dT) tracts, resist wrapping.

::: example Reading a micrococcal nuclease ladder {#ex-mnase}
Nuclei are digested briefly with micrococcal nuclease, which cuts linker DNA much faster than DNA on the octamer, and the DNA is purified and run on a gel. Bands appear at about 195, 390, 585 and 780 bp. After long digestion a single band of 147 bp remains. (a) What is the nucleosome repeat length? (b) What is the average linker length? (c) How many nucleosomes are there in a diploid human nucleus, taking this repeat length throughout?
::: solution
(a) The bands are multiples of 195 bp: 1, 2, 3 and 4 nucleosomes with their linkers. The repeat length is 195 bp.

(b) Long digestion trims away the linkers to leave the protected core of 147 bp, so the average linker is $195 - 147 = 48$ bp.

(c) $6.2\times10^9/195 = 3.2\times10^7$, about 30 million nucleosomes. That is $2.5\times10^8$ core histone molecules, about one histone for every 25 bp of DNA. Histone genes are accordingly present in many copies, and their expression is coupled to DNA replication in S phase ([[cell-biology/cell-cycle]]).
:::
:::

### Nucleosomes and supercoiling

Wrapping DNA in a left-handed superhelix round the octamer introduces negative writhe. If a closed circular DNA is assembled into nucleosomes and the free DNA between them is relaxed by a topoisomerase, removing the histones afterwards leaves the DNA negatively supercoiled. Measured this way, each nucleosome constrains a linking number change of about $-1$, even though the DNA makes about 1.65 superhelical turns. The discrepancy, once called the *linking number paradox*, arises because the wrapped DNA is also slightly overwound (about 10.2 bp per turn on the octamer against 10.5 free), which offsets part of the writhe. So eukaryotic DNA is negatively supercoiled overall, but the supercoiling is mostly **constrained** in nucleosomes, not freely available to drive strand separation as in bacteria.

::: example Counting nucleosomes on a minichromosome {#ex-minichromosome}
The circular DNA of the virus SV40, 5243 bp, is packaged in the host nucleus as a minichromosome. When the minichromosome is deproteinised in the presence of a type I topoisomerase that relaxes the unwrapped DNA, and the purified DNA is analysed by gel electrophoresis, its mean linking number deficit is about $\Delta Lk = -24$. (a) Estimate the number of nucleosomes. (b) What is the superhelical density of the deproteinised DNA? (c) Is this consistent with the nucleosome repeat length?
::: solution
(a) Each nucleosome constrains $\Delta Lk \approx -1$, so there are about 24 nucleosomes.

(b) $Lk_0 = 5243/10.5 = 499.3$, so $\sigma = -24/499.3 = -0.048$.

(c) $5243/24 = 218$ bp per nucleosome, within the usual range of repeat lengths. In fact SV40 has a nucleosome-free region of a few hundred base pairs round its origin and promoters, so the repeat over the rest of the molecule is a little shorter. The free region is where the regulatory proteins bind, a first glimpse of how nucleosome position controls access ([[molecular-biology/eukaryotic-gene-regulation]]).
:::
:::

Nucleosomes are not fixed. **Chromatin-remodelling complexes**, such as SWI/SNF, ISWI and INO80, use ATP to slide octamers along DNA, evict them or exchange histone variants. **Histone chaperones** assemble and disassemble nucleosomes during replication and transcription. Histone variants change nucleosome properties: H2A.Z marks promoters, H3.3 is deposited in transcribed regions independently of replication, and **CENP-A** replaces H3 at centromeres, where it specifies the site of the kinetochore. Covalent modifications of the histone tails, such as acetylation, methylation, phosphorylation and ubiquitination, change how nucleosomes interact with each other and with other proteins. We take these up in [[molecular-biology/eukaryotic-gene-regulation]].

## Beyond the nucleosome: folding the chromosome

The 10 nm fibre compacts DNA only about six-fold: roughly 200 bp, 68 nm of B-DNA, per 11 nm nucleosome. Much more folding is needed.

For decades textbooks drew a **30 nm fibre** as the next level, a regular helical array of nucleosomes, either a one-start solenoid (John Finch and Aaron Klug, 1976) or a two-start zigzag. Such fibres form readily in vitro from purified chromatin at moderate salt and with H1. Whether they exist in living interphase nuclei is much less clear. Cryo-electron microscopy of vitrified nuclei and electron tomography of stained chromatin in situ (ChromEMT; Horng Ou, Clodagh O'Shea and colleagues, 2017) found disordered chains of nucleosomes 5–24 nm across, packed at different densities, rather than regular 30 nm fibres. The current view, as of 2026, is that regular 30 nm fibres are at most local and transient in most interphase cells.

::: warning "DNA is packed in a fixed hierarchy: 10 nm fibre, 30 nm fibre, loops, chromosome"
This tidy staircase is a convenient summary, not an established structure. The 10 nm fibre and the nucleosome are certain. The 30 nm fibre is well documented in vitro and in a few special nuclei (such as some sperm and nucleated erythrocytes) but is not seen in most interphase cells. Higher-order folding is better described in terms of loops and domains that change with the cell cycle and with gene activity than as a fixed sequence of coils. When you meet a diagram of the staircase, read the levels above the nucleosome as hypotheses.
:::

Above the nucleosome, the best-supported organising principle is the **loop**. Two families of ring-shaped protein complexes, the **SMC** (structural maintenance of chromosomes) complexes **cohesin** and **condensin**, can extrude DNA loops: a complex bound to DNA reels in DNA from one or both sides, enlarging a loop, using ATP. Loop extrusion by condensin was seen directly in single-molecule experiments in 2018 (Ganji et al.). The method of **chromosome conformation capture** and its genome-wide form **Hi-C** (Lieberman-Aiden et al., 2009) cross-links DNA segments that are close in space and counts how often each pair of sites is joined. It reveals that interphase genomes are divided into **topologically associating domains** (TADs) of roughly 0.1–1 Mb, within which contacts are frequent, and that these domains are often bounded by sites bound by the protein **CTCF**. A widely supported model is that cohesin extrudes loops until it meets CTCF bound in a particular orientation. At larger scale, active and inactive chromatin segregate into separate **compartments**, and each chromosome occupies its own **territory** in the nucleus. The details belong to [[genomics/nuclear-organisation]].

In mitosis, condensin compacts each chromatid into a stiff rod of nested loops arranged round a central axis, about another 10- to 20-fold beyond interphase. Topoisomerase II, working with condensin, removes the catenanes between sister chromatids so that they can separate at anaphase ([[cell-biology/cell-cycle]]).

### Euchromatin and heterochromatin

Under the light microscope, interphase nuclei show regions that stain lightly, **euchromatin**, and regions that stay condensed and stain darkly, **heterochromatin** (Emil Heitz, 1928). Euchromatin contains most active genes. **Constitutive heterochromatin**, round centromeres and at telomeres, consists largely of repeated sequences, is gene-poor and is condensed in all cells. In humans the centromeres are made of arrays of a 171 bp repeat, α-satellite, extending over megabases. **Facultative heterochromatin** is condensed in some cells and not others; the inactive X chromosome of female mammals is the classic example ([[genetics/non-mendelian-inheritance]]). Heterochromatin is characterised by particular histone modifications (trimethylation of lysine 9 of histone H3, H3K9me3, bound by the protein HP1 in constitutive heterochromatin; H3K27me3 in Polycomb-repressed facultative heterochromatin) and, in vertebrates, by DNA methylation. A gene moved next to heterochromatin by a chromosome rearrangement can be silenced in some cells and not others, producing a mosaic called **position-effect variegation** (Muller, 1930, with the *white* gene of *Drosophila*), which shows that heterochromatin can spread along the chromosome.

::: intuition A library that rearranges its shelves
Think of chromatin as a library in which books are not only shelved but bound together in bundles, and the bundling changes with use. Frequently consulted volumes are kept on open shelves (euchromatin, nucleosomes well spaced, tails acetylated). Volumes not needed in this cell are tied into tight bundles in the basement (heterochromatin). Librarians (remodellers, modifying enzymes) can untie and move bundles, and leave labels (histone marks) that tell the next librarian what to do. Reading a gene therefore starts with getting at it.
:::

## The bacterial nucleoid

Bacteria have no histones (archaea, interestingly, do: many archaea wrap DNA round histone-like proteins into extended structures related to the nucleosome). The *E. coli* chromosome forms a compact body, the **nucleoid**, which occupies a defined region of the cytoplasm without a membrane round it. Three factors fold it. The first is **negative supercoiling**, maintained at $\sigma \approx -0.06$ by the balance of gyrase and topoisomerase I; about half of it is free and half constrained by proteins. The second is **nucleoid-associated proteins**: HU and IHF bend DNA sharply, H-NS bridges DNA segments and silences A·T-rich foreign genes, and Fis is abundant in rapidly growing cells. The third is **macromolecular crowding** and the bacterial SMC complex MukBEF. The chromosome is divided into some hundreds of independent supercoiled domains of about 10 kb, so a single nick relaxes only one domain, as Abraham Worcel and Ellen Burgi first deduced in 1972 and later studies confirmed. Free supercoiling makes promoter activity in bacteria sensitive to the energy state of the cell, because gyrase uses ATP.

::: example How much free supercoiling? {#ex-nucleoid}
Take the *E. coli* chromosome as $4.64\times10^6$ bp with overall $\sigma = -0.06$, half of it constrained by proteins. (a) What is $Lk_0$? (b) What is the total $\Delta Lk$, and how much of it is unconstrained? (c) If the chromosome forms 400 independent domains, what is the unconstrained $\Delta Lk$ per domain?
::: solution
(a) $Lk_0 = 4.64\times10^6/10.5 = 4.42\times10^5$.

(b) $\Delta Lk = -0.06\times4.42\times10^5 = -2.65\times10^4$. Half, about $-1.3\times10^4$, is unconstrained.

(c) $-1.3\times10^4/400 \approx -33$ per domain of about 11.6 kb. A nick in one domain releases those 33 turns there and leaves the others unaffected, which is why bacteria can survive frequent single-strand breaks in replication and repair.
:::
:::

::: history
James Watson and Francis Crick proposed the double helix in 1953, from model building informed by the X-ray photographs of Rosalind Franklin and Raymond Gosling and the work of Maurice Wilkins. Emil Heitz distinguished euchromatin from heterochromatin in 1928, and Hermann Muller described position-effect variegation in *Drosophila* in 1930. Jerome Vinograd and colleagues discovered supercoiling in polyoma virus DNA in 1965. Dean Hewish and Leigh Burgoyne's nuclease ladder (1973), the beads-on-a-string micrographs of Ada and Donald Olins (1974) and Roger Kornberg's octamer model (1974) established the nucleosome; Pierre Oudet, Pierre Chambon and colleagues named it in 1975. James Wang discovered the first topoisomerase, *E. coli* ω protein (topoisomerase I), in 1971, and Martin Gellert, Kiyoshi Mizuuchi and colleagues discovered DNA gyrase in 1976. Karolin Luger, Timothy Richmond and colleagues solved the nucleosome core particle at 2.8 Å in 1997, and Erez Lieberman-Aiden, Job Dekker and colleagues introduced Hi-C in 2009.
:::

::: summary
- B-DNA is right-handed, about 10.5 bp per turn, 0.34 nm rise and 2 nm diameter. The major groove exposes a pattern of hydrogen-bond donors and acceptors that distinguishes all four base pairs, so most sequence-specific proteins read it; the minor groove mainly reports shape.
- Sites separated by a whole number of helical turns face the same side of the helix. Cooperative binding and looping therefore depend on spacing with a period of about 10.5 bp.
- Genomes are millimetres (bacteria) to metres (human diploid) long and must be compacted roughly $10^3$ to $10^4$-fold or more.
- In closed DNA, $Lk = Tw + Wr$ is invariant without strand breakage. Type I topoisomerases change $Lk$ by 1, type II by 2. Gyrase introduces negative supercoils with ATP; topoisomerase II and IV unlink daughter molecules. Fork and polymerase movement creates positive supercoils ahead and negative behind.
- The nucleosome core is 147 bp wrapped 1.65 times round an octamer of H2A, H2B, H3 and H4; repeat lengths are about 165–200 bp; each nucleosome constrains $\Delta Lk \approx -1$.
- Above the nucleosome, chromosomes are organised into loops formed by cohesin and condensin, TADs bounded by CTCF, compartments and territories. The regular 30 nm fibre is seen in vitro but rarely in interphase nuclei.
- Heterochromatin is condensed, gene-poor and marked by H3K9me3 or H3K27me3 and DNA methylation; it can spread and silence genes.
- The bacterial nucleoid is folded by supercoiling, nucleoid-associated proteins and SMC complexes into many independent domains.
:::

## Exercises

::: exercise The length of phage λ {level=1 check="16.5"}
The DNA of bacteriophage λ has 48,502 bp. What is its length as B-DNA, in micrometres (one decimal place)?
::: solution
$48\,502\times0.34\ \mathrm{nm} = 16\,491\ \mathrm{nm} = 16.5\ \mu\mathrm{m}$. It is packed into a head about 0.06 μm across, a compaction of nearly 300-fold in length, achieved by an ATP-driven packaging motor rather than by proteins wrapped round the DNA.
:::
:::

::: exercise Helical turns {level=1 check="100"}
How many helical turns does a 1050 bp linear B-DNA fragment contain?
::: solution
$1050/10.5 = 100$ turns.
:::
:::

::: exercise Which change of linking number? {level=1}
Say whether each event changes $Lk$ of a closed circular DNA, and by how much: (a) the DNA is bent into a loop by a protein; (b) *E. coli* topoisomerase I acts once; (c) gyrase acts once; (d) the DNA is nicked; (e) a protein binds and unwinds 10.5 bp, without strand breakage.
::: solution
(a) No change: bending changes writhe and perhaps twist, but $Lk$ is invariant. (b) $+1$ (it relaxes negative supercoils one strand passage at a time). (c) $-2$. (d) The molecule is no longer closed, so $Lk$ is undefined: the DNA relaxes. (e) No change in $Lk$: $Tw$ falls by about 1 and $Wr$ rises by about 1 elsewhere in the molecule to compensate, producing a compensating positive supercoil.
:::
:::

::: exercise Linker length from a ladder {level=2 check="18"}
A micrococcal nuclease digest of budding-yeast chromatin gives a ladder of bands at 165, 330 and 495 bp, and extended digestion gives 147 bp. What is the average linker length in bp?
::: solution
The repeat is 165 bp, so the linker is $165 - 147 = 18$ bp. Short linkers are typical of yeast, which has little linker histone, and they make yeast chromatin less compact than that of animals.
:::
:::

::: exercise Nucleosomes in a yeast genome {level=2 check="73000"}
The budding-yeast (*Saccharomyces cerevisiae*) nuclear genome is about $1.21\times10^7$ bp. With a repeat length of 165 bp and nucleosomes covering the whole genome, how many nucleosomes does a haploid cell contain, to the nearest thousand? Why is the real number somewhat lower?
::: solution
$1.21\times10^7/165 = 73\,333$, about 73,000. The real number is lower (measurements give roughly 60,000–70,000) because promoters, origins and other regulatory regions are nucleosome-depleted, and highly transcribed genes such as the rRNA repeats are partly free of nucleosomes.
:::
:::

::: exercise Supercoiling of a reporter plasmid {level=2 check="-19"}
A 4000 bp plasmid is isolated from *E. coli* with $\sigma = -0.050$. Taking 10.5 bp per turn, what is $\Delta Lk$, to the nearest integer?
::: solution
$Lk_0 = 4000/10.5 = 381.0$, so $\Delta Lk = -0.050\times381.0 = -19.05 \approx -19$.
:::
:::

::: exercise Designing operator spacing {level=3}
You want two copies of a repressor, each binding an operator of about 20 bp, to cooperate by touching each other on straight DNA. The repressors can tolerate a misalignment of up to $\pm 40^\circ$ round the helix. (a) Which centre-to-centre spacings between 18 and 35 bp will work? (b) What changes if the proteins instead cooperate by forming a loop at spacings above about 150 bp? (c) Why would you expect weaker periodicity for very long loops?
::: solution
(a) With $34.3^\circ$ per bp, the angle at spacing $d$ is $34.3^\circ d$ modulo $360^\circ$. Same-face spacings near 21 bp (2 turns) and 31.5 bp (3 turns) qualify: 20 bp is $-34^\circ$, 21 bp is $0^\circ$, 22 bp is $+34^\circ$; 31 bp is $-17^\circ$, 32 bp is $+17^\circ$; 30 bp is $-51^\circ$ and 33 bp is $+51^\circ$, outside the tolerance. So 20, 21, 22, 31 and 32 bp; spacings below about 20 bp are also excluded in practice because the two 20 bp operators would overlap.

(b) At long spacings the DNA must bend into a loop. Looping is easiest when the sites are on the same face, so cooperativity still oscillates with a 10.5 bp period, but its average level depends on the cost of bending: short loops (well under the persistence length of 150 bp) are expensive, and looping probability rises to a maximum at a few hundred bp before falling slowly as the ends become less likely to meet.

(c) A long loop can absorb a misalignment by twisting a little over its whole length, which costs little when spread over many base pairs. So the periodicity damps out as the loop gets longer, as seen in experiments with the *lac* and λ systems.
:::
:::

::: exercise Interpreting a Hi-C map {level=3}
In a Hi-C map of a 2 Mb region, contacts are frequent within two blocks, 0–0.8 Mb and 0.8–2 Mb, and rare between them. A CTCF site at 0.8 Mb faces into the second block. (a) Interpret the pattern. (b) The CTCF site is deleted by genome editing and contacts across 0.8 Mb increase. What does this suggest? (c) In the edited cells, a gene at 1.0 Mb becomes expressed in a tissue where it was silent, and an enhancer is known at 0.6 Mb. Propose an explanation and a control experiment.
::: solution
(a) The region is divided into two topologically associating domains with a boundary at 0.8 Mb. Within each domain, DNA segments meet often; across the boundary, rarely.

(b) The CTCF site is needed for the boundary. In the loop-extrusion model, cohesin extruding loops is halted by CTCF in the appropriate orientation; without it, loops extend across 0.8 Mb and the two domains partly merge.

(c) The enhancer at 0.6 Mb, previously confined to the first domain, can now contact and activate the gene at 1.0 Mb ("enhancer hijacking"; such boundary deletions underlie some developmental limb malformations in humans and mice). Controls: show by chromosome conformation capture from the gene's promoter that its contacts with 0.6 Mb increase, and delete or inactivate the enhancer in the CTCF-deleted background to test whether expression of the gene is lost; restoring the CTCF site (or inserting it in the inverted orientation, which should not work as well) is a further test.
:::
:::

::: exercise Supercoiling and promoter opening {level=2}
Explain why a promoter that is weak on relaxed DNA can become active on negatively supercoiled DNA, and predict the effect on its activity of an antibiotic that inhibits gyrase.
::: solution
Opening a transcription bubble of about 13 bp removes about 1.2 turns of twist. In a closed, negatively supercoiled molecule, removing twist lets writhe become less negative, relieving stored strain, so the free-energy cost of strand separation is lower; on relaxed DNA, opening the same bubble creates new strain. A promoter that opens poorly therefore benefits from negative supercoiling. Inhibiting gyrase lets topoisomerase I relax the chromosome, so $\sigma$ becomes less negative and such promoters are expressed less. (In fact *E. coli* responds homeostatically: relaxation increases transcription of the gyrase genes and decreases that of topoisomerase I.)
:::
:::
