Insulin, growth hormone, the enzymes in washing powder, the rennet in most cheese, the antibodies that are now the largest class of pharmaceutical product by value, the polymerases in every PCR tube: all are proteins made by cells that were engineered to make them. Protein production is the oldest commercial application of recombinant DNA and still the largest, and it is the point at which biology stops being an experiment and becomes a process with a yield.

The difficulty is rarely getting *some* protein. A construct designed as in [[biotechnology/recombinant-dna]], placed behind a strong promoter, will usually give a detectable band. The difficulty is getting a lot of protein that is correctly folded, correctly modified, not degraded, not toxic to its host and recoverable at a cost the application can bear — and these requirements pull against each other. This chapter is about that trade-off: the quantitative framework for expression, the competition between folding and aggregation, what each class of host can and cannot do, and how proteins themselves are engineered to be more active, more stable or more specific. The engineering of the vessel, rather than the cell, is [[biotechnology/bioprocessing]]; growth kinetics are assumed from [[microbiology/microbial-growth]]; the clinical use of protein products belongs to Medicine Atlas (/learn/medicine/).

## Expression as a number

Three quantities describe production, and confusing them is the commonest source of muddle in the literature.

::: definition Titre, specific productivity, volumetric productivity {#def-titre}
The **titre** $c_P$ is the concentration of product in the culture, in g L⁻¹. The **specific productivity** $q_P$ is the rate at which one cell makes it, in g cell⁻¹ h⁻¹ or, for animal cells, picograms per cell per day. The **volumetric productivity** is the titre divided by the duration of the run, in g L⁻¹ day⁻¹, and is what determines how much a plant of a given size can make. For intracellular protein a fourth measure is used: the product as a **fraction of total cell protein**, read off a stained gel.

The three are linked by the cell density. For a culture of cell concentration $X$,

$$
\frac{\mathrm{d}c_P}{\mathrm{d}t} = q_P X, \qquad\text{so}\qquad c_P = q_P \int_0^{t} X\,\mathrm{d}t ,
$$ {#eq-titre}

the integral being the **integral of viable cell density** (IVCD). A high titre can therefore come from productive cells, from many cells, or from a long run, and improving one may spoil another.
:::

::: example Three routes to a gram per litre {#ex-titre}
(a) An *E. coli* fed-batch culture reaches 10 g L⁻¹ dry cell weight, protein is 55 % of dry weight, and the recombinant protein is 25 % of total protein. What is the titre? (b) About how many molecules of a 40 kDa protein is that per cell, if a cell's dry mass is $3\times10^{-13}$ g? (c) A CHO cell culture holds $10^{7}$ cells mL⁻¹ for 14 days at a specific productivity of 20 pg cell⁻¹ day⁻¹. What titre does [[#eq-titre]] give?
::: solution
(a) Total protein is $0.55\times10 = 5.5$ g L⁻¹ and the product a quarter of it: **1.4 g L⁻¹**.

(b) Protein per cell is $0.55\times3\times10^{-13} = 1.65\times10^{-13}$ g; a quarter of it is the product, $4.1\times10^{-14}$ g. One molecule of 40 kDa weighs $40\,000/(6.022\times10^{23}) = 6.6\times10^{-20}$ g, so there are about $6\times10^{5}$ molecules of product per cell against roughly $2.5\times10^{6}$ protein molecules in total. A quarter of the cell's protein is an enormous commitment of its resources, and cells asked for it grow slowly.

(c) Taking the density as constant, the IVCD is $10^{7}\times14 = 1.4\times10^{8}$ cell day mL⁻¹, and $20\ \text{pg}\times1.4\times10^{8} = 2.8\times10^{9}$ pg mL⁻¹ $= 2.8$ mg mL⁻¹ $= \mathbf{2.8\ g\,L^{-1}}$. Both routes reach grams per litre, but by quite different means: the bacterium makes a vast amount per unit volume quickly and keeps it inside, the animal cell makes a little per cell for a fortnight and secretes it correctly folded and glycosylated.
:::
:::

### Steady state: why growth rate matters

Inside a growing cell, a protein's concentration is set by a balance between synthesis on one side and degradation and dilution by growth on the other.

::: proposition Steady-state level of an expressed protein {#prop-steady-state}
Let $p$ be the concentration of the product in a cell growing at specific growth rate $\mu$, synthesised at rate $k_s$ per unit volume and degraded with first-order rate constant $k_d$. Then

$$
\frac{\mathrm{d}p}{\mathrm{d}t} = k_s - (k_d + \mu)\,p , \qquad\text{so at steady state}\qquad p_\mathrm{ss} = \frac{k_s}{k_d + \mu} ,
$$ {#eq-steady-state}

approached with time constant $\tau = 1/(k_d + \mu)$ and hence a half-time $\ln 2/(k_d+\mu)$.

Two consequences are worth stating explicitly. First, for a **stable** protein ($k_d \ll \mu$) the level is set by growth rate alone, $p_\mathrm{ss} \approx k_s/\mu$: the same synthesis rate gives twice the concentration in a culture growing half as fast, and dilution by division, not proteolysis, is what removes most proteins from a bacterium. Second, the response time is also set by $\mu$, so a fast-growing culture reaches its new steady state quickly after induction and a slow one does not. This is the same calculation as for any gene product ([[systems-biology/gene-expression-dynamics]]); for a product that accumulates in inclusion bodies or is secreted, the dilution term does not apply and [[#eq-titre]] is the right description instead.
:::

::: widget plot
f: 1/(x + 0.1); 1/(x + 0.5); 1/(x + 2)
x: 0.05, 2
y: 0, 8
labels: k_d = 0.1\ \mathrm{h^{-1}}; k_d = 0.5; k_d = 2
caption: Steady-state product level $p_\mathrm{ss} = k_s/(k_d+\mu)$ from [[#eq-steady-state]], in units of $k_s$, against specific growth rate $\mu$ (h⁻¹) for three degradation rate constants. For a stable product (lowest $k_d$) the curve is close to $1/\mu$, so the level climbs steeply as growth slows — one reason expression is often induced late, at lower growth rate. For a rapidly degraded product the curve is nearly flat: proteolysis, not dilution, sets the level, and slowing growth buys nothing.
:::

## Controlling transcription and translation

The construct's promoter decides how much mRNA there is, and when.

**Inducible systems.** Expression that is on from the moment of transformation selects against itself: cells that mutate or lose the construct outgrow those that keep it, and a toxic product may prevent colonies forming at all. The standard solution is to separate growth from production with an inducible promoter. In *E. coli* the common choices are the *lac*-derived promoters induced by IPTG (a non-metabolisable analogue of allolactose; see [[molecular-biology/bacterial-gene-regulation]]), the *araBAD* promoter induced by arabinose, the tetracycline-responsive systems, and promoters responding to temperature or to phosphate starvation. Their properties differ in ways that matter: the *lac* system is strong but **leaky**, giving some product even uninduced, and its response across a population is all-or-none at intermediate inducer concentrations, whereas the arabinose system is more nearly graded.

**The T7 system.** The most widely used bacterial expression system (Alan Rosenberg and William Studier, 1987) puts the gene behind a promoter recognised only by the RNA polymerase of bacteriophage T7, and the T7 polymerase gene into the host chromosome under *lac* control — the strain BL21(DE3). Induction then switches on a polymerase that ignores host promoters, transcribes about eight times faster than the host enzyme and is not subject to host regulation. Yields can reach a third of total cell protein. The price is that transcription outruns everything downstream: ribosomes, chaperones and the cell's capacity to fold what is made.

::: warning Maximum expression is not maximum useful protein
The intuition that a stronger promoter gives more usable product fails, often abruptly. Beyond some rate of synthesis, additional protein appears as insoluble aggregate rather than active molecules; the cell's ribosomes and chaperones are diverted from its own proteins, so growth slows and the culture reaches a lower density; and the imbalance can trigger stress responses and proteolysis. The quantity to maximise is active, recoverable product per litre per day, and in a very large fraction of published comparisons that optimum lies at a *lower* induction level, a *lower* temperature and a *weaker* promoter than the maximum the system can be driven to. "Tuning down" is the first thing to try when a highly expressed protein is useless.
:::

**Translation.** In bacteria the rate at which ribosomes initiate depends on the Shine–Dalgarno sequence, its spacing from the start codon and the secondary structure of the 5′ end of the mRNA; initiation rates across a set of designed sites span three orders of magnitude, and predictive calculators based on the thermodynamics of ribosome binding are accurate to a factor of a few. Codon choice along the coding sequence matters too, for the reasons and with the caveats set out in [[biotechnology/recombinant-dna]].

## Folding, aggregation and inclusion bodies

::: intuition Folding is a race
A nascent polypeptide leaving the ribosome has exposed hydrophobic surfaces that belong in the protein's core. It can bury them by folding, or by sticking to the same surfaces on another copy of itself. The first process is first-order in the unfolded chain; the second is second-order, because it needs two molecules. So the ratio of aggregation to folding rises with the concentration of unfolded chains, which is set by the rate of synthesis. Over-expression creates exactly the conditions that favour aggregation, and every successful remedy either slows synthesis, assists folding, or dilutes the unfolded species.

This also explains the classic observations: lowering the temperature from 37 °C to 15–20 °C helps, because translation slows more than folding does; adding inducer gradually helps; and the same protein expressed from a weak promoter may be entirely soluble while from T7 it is entirely insoluble.
:::

Dense aggregates of misfolded product, visible in the electron microscope as refractile bodies, are **inclusion bodies**. They are not always a failure: they are easily separated from soluble host protein by centrifugation, are protected from proteolysis, and can be dissolved in a denaturant and **refolded** in vitro by removing it slowly under conditions that favour the native state. Refolding yields are protein-dependent and often poor, and for anything with several disulfide bonds the redox conditions must be controlled too, so refolding is a last resort for products that cannot be made soluble.

The main levers on solubility:

- **Rate.** Lower temperature, lower inducer concentration, weaker promoter, slower feeding.
- **Help.** Co-expression of chaperones (the GroEL/GroES and DnaK/DnaJ/GrpE systems), which raises the folding rate rather than lowering the synthesis rate.
- **Fusion partners.** Fusing the product to a highly soluble protein — maltose binding protein, thioredoxin, SUMO — often carries it into solution; the partner is afterwards removed with a specific protease, at the cost of a step and of some product.
- **Compartment.** Exporting the protein to the *E. coli* **periplasm** with a signal peptide gives it an oxidising environment with disulfide isomerases, so disulfide bonds form correctly, and a much lower protein concentration in which to fold. Periplasmic capacity is limited, so yields are lower.
- **Host.** A eukaryotic protein that resists all of the above in *E. coli* may fold readily in a yeast or an animal cell, where the endoplasmic reticulum provides the quality-control machinery it evolved with.

::: quiz
A 60 kDa human enzyme expressed in BL21(DE3) at 37 °C gives a strong band at the right size, all of it in the insoluble pellet, and no activity in the supernatant. Which single change is most likely to give soluble, active enzyme?
- [ ] A stronger promoter, to make more of it.
- [x] Induce at 18 °C with a tenth of the inducer.
- [ ] Add more antibiotic to raise plasmid copy number.
- [ ] Sonicate the pellet for longer.
::: solution
The symptom is classic aggregation from over-rapid synthesis, so the remedy is to slow synthesis and give folding time: lower temperature and lower induction. A stronger promoter makes it worse. Antibiotic concentration does not raise copy number — the origin does — and more antibiotic would simply select harder for a construct the cells already carry. Sonicating harder breaks cells more thoroughly but cannot make a misfolded aggregate active; it will simply put the inclusion bodies into suspension. If the gentle-induction route fails, the next steps are a solubility fusion, co-expressed chaperones, periplasmic export (this protein may need disulfides) or a eukaryotic host.
:::
:::

## Choosing a host

No host is best at everything. The table collects the properties that decide the choice; the numbers are typical ranges reported as of 2026 for well-developed processes, and any particular product may sit well outside them.

| host | doubling time | secretion | N-glycosylation | typical titre | characteristic use |
|---|---|---|---|---|---|
| *E. coli* | 20–30 min | periplasm only (limited) | none natively | 1–10 g L⁻¹ intracellular | enzymes, small non-glycosylated proteins, research reagents |
| *Bacillus subtilis* | 25–40 min | efficient, into the medium | none | up to ~10 g L⁻¹ secreted | bulk industrial enzymes (proteases, amylases) |
| *Saccharomyces cerevisiae* | 90–120 min | yes | yes, but hypermannosylated | 0.1–1 g L⁻¹ | proteins needing eukaryotic folding; a very well-characterised host |
| *Pichia pastoris* (*Komagataella*) | 2–3 h | yes, few native secreted proteins | yes, hypermannosylated | 1–10 g L⁻¹ secreted | secreted enzymes and small eukaryotic proteins |
| insect cells + baculovirus | ~24 h | yes | paucimannose, not human-like | 0.05–0.5 g L⁻¹ | large multi-subunit complexes, virus-like particles |
| CHO and HEK293 cells | 20–30 h | yes | human-like (not identical) | 3–10 g L⁻¹ (fed-batch monoclonal antibody) | glycosylated therapeutic proteins and antibodies |
| plants, plant cell culture | days | yes | plant-type glycans | variable | low-cost bulk or heat-stable products |
| cell-free extract | — | not applicable | none (unless supplied) | mg L⁻¹ to ~g L⁻¹ | toxic products, non-canonical amino acids, rapid prototyping |

::: example Volumetric productivity and the size of a plant {#ex-volumetric}
An *E. coli* process gives 1.4 g L⁻¹ in a 24 h run, with 12 h to harvest, clean and refill. A CHO process gives 4.5 g L⁻¹ in a 15-day run with 5 days of turnaround. (a) Compare the volumetric productivities. (b) How much product per year does a 10 m³ vessel deliver in each case, if the plant runs continuously? (c) Why, given these numbers, is anything ever made in CHO cells?
::: solution
(a) *E. coli*: $1.4/1.5 = 0.93$ g L⁻¹ day⁻¹. CHO: $4.5/20 = 0.23$ g L⁻¹ day⁻¹. The bacterium is about four times more productive per unit volume and time, despite the lower titre, because the cycle is thirteen times shorter.

(b) A 10 m³ vessel is $10^{4}$ L. *E. coli*: $365/1.5 = 243$ cycles, each giving $1.4\times10^{4}$ g $= 14$ kg, so about **3400 kg per year**. CHO: $365/20 = 18$ cycles of 45 kg, about **820 kg per year**. (Both figures are before recovery losses; at the 55 % of [[#ex-titre]] they would be 1900 and 450 kg.)

(c) Because for most of the products made this way the bacterial figure is unattainable, not merely lower: an antibody cannot be assembled, disulfide-bonded, glycosylated and secreted by *E. coli* at all. Where a product *can* be made in bacteria it generally is. The comparison also understates the difference in processing: 3400 kg of intracellular bacterial protein arrives inside broken cells together with endotoxin, host DNA and proteases, while 820 kg of secreted antibody arrives in a clarified supernatant. Volumetric productivity is the right measure only among routes that reach the same specification.
:::
:::

### Post-translational modification

This is usually what decides the host, because it is the one requirement engineering cannot talk its way around.

**N-linked glycosylation** attaches a branched oligosaccharide to asparagine in the sequence Asn-X-Ser/Thr (X not proline) as the protein enters the endoplasmic reticulum, after which the glycan is trimmed and rebuilt in the Golgi. Bacteria do not do this at all. Yeasts do, but extend the glycan with long chains of mannose; such glycans are cleared rapidly from mammalian circulation and can be recognised as foreign, so yeast is poorly suited to glycoprotein products, although strains with much of the mannosylation machinery replaced by mammalian enzymes have been built (Stephen Hamilton, Tillman Gerngross and colleagues, 2006). Insect cells make short, mostly unsialylated glycans. CHO cells make glycans close to human ones — which is why they dominate therapeutic protein manufacture — but not identical: they add sialic acid in α-2,3 rather than α-2,6 linkage, and can add small amounts of N-glycolylneuraminic acid and α-1,3-galactose epitopes that humans do not make. Glycan structure affects a protein's stability, solubility, clearance rate and, for antibodies, the strength of effector functions, so it is controlled as a product attribute and not left to chance.

Other modifications with the same character: **disulfide bonds** need an oxidising compartment (the periplasm or the ER), so a multiply disulfide-bonded protein made in the bacterial cytoplasm will usually be wrong; **γ-carboxylation**, **proteolytic maturation** and **O-glycosylation** are restricted to particular eukaryotic hosts; and **phosphorylation** patterns generally cannot be reproduced at all.

::: application Why monoclonal antibodies are made in CHO cells
An antibody is a glycoprotein of about 150 kDa assembled from four chains with sixteen disulfide bonds, carrying conserved N-glycans whose composition changes how it is cleared and how it engages other parts of the immune system. Every one of these features demands a mammalian secretory pathway. Chinese hamster ovary cells were adapted to suspension culture in the 1980s, grow in chemically defined medium without animal serum, secrete the product so that purification starts from a clean broth, tolerate the gene amplification used to raise copy number, and have a long regulatory history. Fed-batch titres rose from tens of milligrams per litre in the 1980s to 3–10 g L⁻¹ for well-developed processes as of 2026 — an improvement of two orders of magnitude that came almost entirely from the host cell line, the medium and the feeding strategy rather than from the construct. The therapeutic use of these products, their formulation and their clinical assessment belong to Medicine Atlas; the engineering of the culture is in [[biotechnology/bioprocessing]].
:::

### Expanding the chemistry: non-canonical amino acids

The genetic code can itself be engineered. If a stop codon is reassigned — classically the amber codon UAG — and the cell is given an **orthogonal** aminoacyl-tRNA synthetase and tRNA pair, imported from a distant organism so that neither cross-reacts with the host's own, then a chosen non-natural amino acid is incorporated wherever that codon appears (Lei Wang, Peter Schultz and colleagues, 2001). Hundreds of such amino acids have been installed, carrying photo-crosslinkers, bio-orthogonal handles for site-specific conjugation, metal-binding groups or fluorophores. Efficiency is limited by competition with release factors, and strains with the amber codon removed from their own genome by wholesale recoding make the reassignment cleaner. This is where protein production shades into synthetic biology ([[biotechnology/synthetic-biology]]).

## Engineering the protein

Once a protein can be made, it can be changed. Three strategies are used, and in practice they are combined.

**Rational design** changes specific residues for a stated reason: a catalytic residue to test a mechanism, a surface lysine to remove a protease site, an added disulfide or proline to rigidify a loop, a charge reversal to shift the pH optimum. It depends on site-directed mutagenesis, introduced by Michael Smith in 1978 (Nobel Prize in Chemistry 1993), and on a structure or a good model ([[structural-biology/structure-prediction]]). Its success rate for anything involving catalysis is modest, because the effects of mutations are not additive and our models of transition states are crude.

**Directed evolution** gives up on understanding. A library of variants is made, a selection or screen enriches the better ones, and the cycle is repeated — mutation, selection, amplification, applied to a molecule in a tube. Frances Arnold's work from 1993 onwards showed that a few rounds of random mutagenesis and screening could adapt an enzyme to conditions no natural selection had prepared it for, such as activity in organic solvents; Willem Stemmer's DNA shuffling (1994) recombined related genes to combine beneficial mutations found separately. Arnold shared the 2018 Nobel Prize in Chemistry with George Smith and Gregory Winter, whose phage display provided the selection method for binding proteins.

::: proposition How big a library, and how many clones? {#prop-library}
Replacing $n$ chosen residues by all twenty amino acids ("saturation mutagenesis") gives $20^{n}$ protein variants: 400 for two positions, 160,000 for four, $3.2\times10^{6}$ for five and $1.0\times10^{13}$ for ten. Sequence space is therefore unsearchable beyond a handful of simultaneous positions, and directed evolution works by taking small steps rather than by sampling the space.

Screening is worse than the raw count suggests, for two reasons. First, degenerate codons do not encode amino acids equally: the common NNK scheme (N = any base, K = G or T) uses 32 codons, of which some amino acids claim three and others one. For a specific variant whose $n$ residues are each encoded by a single codon the probability per clone is $(1/32)^{n}$, and the number of clones for a 95 % chance of seeing it is

$$
N = \frac{\ln(1-0.95)}{\ln\!\left(1 - (1/32)^{n}\right)} \approx 3\times 32^{n} .
$$ {#eq-library-size}

For $n = 4$ that is $3.1\times10^{6}$ clones, twenty times the 160,000 protein variants. Second, *screening* each clone individually is limited to perhaps $10^{4}$–$10^{6}$ by robotics, whereas a *selection*, in which only improved variants survive or fluoresce, can process $10^{8}$–$10^{12}$. Which of the two is available is usually the single most important constraint on an evolution campaign, and much of the craft consists in inventing a selection for a property one actually cares about.
:::

::: example Designing a campaign {#ex-campaign}
You want an enzyme that works at 60 °C instead of 37 °C and you can screen 2000 variants per round in a plate-based assay. (a) Can you saturate four active-site positions? (b) What strategy fits the screening capacity? (c) Why does a thermostability campaign often succeed where a new-activity campaign fails?
::: solution
(a) No, by three orders of magnitude: [[#eq-library-size]] requires about $3\times10^{6}$ clones for four positions, and 2000 samples a fraction $7\times10^{-4}$ of it. You would see a near-random 2000 variants and almost certainly miss the best.

(b) Take small steps. Random mutagenesis at a rate of about one to two amino acid changes per gene produces a library in which most variants are neutral or mildly deleterious and a few per cent are improved, so 2000 clones is enough to find several improvements; keep the best, and repeat. Alternatively use a focused library: mutate two positions at a time ($3\times32^{2} = 3072$ clones, just within reach), or use a reduced alphabet of codons chosen to cover the chemically distinct side chains in far fewer variants. Recombining the improvements found in separate rounds — shuffling — then tests combinations that stepwise search would not reach.

(c) Stability is a diffuse, additive-ish property: many surface and loop mutations each add a fraction of a kJ mol⁻¹ to the folding free energy, and their effects combine roughly additively, so a hill-climbing search finds them. A new catalytic activity requires a precise arrangement of several residues whose intermediate states confer no benefit — a fitness landscape with a plateau and a distant peak rather than a hill — which is why new activities usually need either an existing weak side activity to amplify or a computationally designed starting point.
:::
:::

**Computational design** proposes sequences from structure. Its track record for stability and for binding interfaces became good during the 2010s and 2020s, as deep-learning structure prediction and generative sequence-design models matured ([[structural-biology/dynamics-and-design]]); for de novo catalysis it remains hard, and designed enzymes are typically orders of magnitude less active than natural ones until improved by directed evolution. The current practice is a hybrid: compute a starting point, then evolve it, using sequence models to propose the variants worth testing.

### The thermodynamics of stability

Most engineered improvements in stability can be read as changes in a single number.

::: proposition Two-state folding and the effect of a mutation {#prop-stability}
Treat folding as an equilibrium between one folded and one unfolded state, $U \rightleftharpoons F$, with free energy of unfolding $\Delta G_\mathrm{u} = G_U - G_F > 0$ for a stable protein. Then the equilibrium constant for unfolding is $K = \exp(-\Delta G_\mathrm{u}/RT)$ and the fraction of molecules unfolded is

$$
f_U = \frac{K}{1+K} = \frac{1}{1 + \exp(\Delta G_\mathrm{u}/RT)} .
$$ {#eq-two-state}

At 37 °C, $RT = 2.58$ kJ mol⁻¹, so $\Delta G_\mathrm{u} = 20$ kJ mol⁻¹ leaves 0.04 % unfolded, 10 kJ mol⁻¹ leaves 2.0 %, and 5 kJ mol⁻¹ leaves 13 %. Typical small proteins sit at 20–60 kJ mol⁻¹, which is only a few hydrogen bonds' worth of margin — stability is a small difference between two large numbers.

The **melting temperature** $T_\mathrm{m}$ is where $\Delta G_\mathrm{u} = 0$, and near it $\Delta G_\mathrm{u} \approx \Delta S_\mathrm{m}(T_\mathrm{m} - T)$, so a mutation that adds $\Delta\Delta G$ raises the melting temperature by about

$$
\Delta T_\mathrm{m} \approx \frac{\Delta\Delta G}{\Delta S_\mathrm{m}} .
$$ {#eq-tm-shift}

Mutational effects on $\Delta G_\mathrm{u}$ are roughly, but only roughly, additive: residues that interact share their contributions, which is **epistasis**, and it is why combining ten mutations each worth $+2$ kJ mol⁻¹ rarely gives $+20$.
:::

::: example From free energy to melting temperature {#ex-tm}
A 120-residue enzyme has $\Delta G_\mathrm{u} = 24$ kJ mol⁻¹ at 37 °C and an entropy of unfolding at the melting point of $\Delta S_\mathrm{m} = 1.4$ kJ mol⁻¹ K⁻¹ (an illustrative value in the usual range for a protein of this size). (a) Estimate $T_\mathrm{m}$. (b) Six engineered mutations each contribute $+2.5$ kJ mol⁻¹ in isolation; measured together they give $+9$ kJ mol⁻¹. What is the new $T_\mathrm{m}$, and what does the shortfall tell you? (c) What fraction is unfolded at 60 °C before and after?
::: solution
(a) Setting $\Delta G_\mathrm{u} = \Delta S_\mathrm{m}(T_\mathrm{m} - T)$ gives $T_\mathrm{m} - 310 = 24/1.4 = 17$ K, so $T_\mathrm{m} \approx 327$ K $= 54$ °C.

(b) $\Delta T_\mathrm{m} = 9/1.4 = 6.4$ K, so $T_\mathrm{m} \approx 60$ °C. Additivity would have predicted $6\times2.5 = 15$ kJ mol⁻¹ and $+11$ K; the measured 9 kJ mol⁻¹ is 60 % of that. The shortfall is epistasis — several of the mutations are presumably rigidifying the same part of the structure, or two of them interact directly — and it is the normal outcome, which is why stabilising mutations are combined experimentally rather than summed on paper.

(c) At 60 °C $= 333$ K, before: $\Delta G_\mathrm{u} = 1.4\times(327-333) = -8.4$ kJ mol⁻¹, so $f_U = 1/(1+e^{-8.4/2.77}) = 0.95$ — essentially all unfolded. After: $\Delta G_\mathrm{u} = 1.4\times(333.4-333) = +0.6$ kJ mol⁻¹ and $f_U = 0.45$, so about half is folded at any instant. Note what this means for the application: a protein "stable to 60 °C" in the sense that its $T_\mathrm{m}$ is 60 °C has only half of its molecules folded there, and irreversible processes (aggregation, chemical damage) act on the unfolded half, so the operational limit is well below $T_\mathrm{m}$.
:::
:::

::: widget plot
f: 1/(1 + exp(S*(Tm - x)/(0.008314*x)))
x: 280, 370
y: 0, 1.05
sliders: Tm=327:300:360:1; S=1.4:0.6:2.5:0.1
hlines: 0.5
labels: \text{fraction unfolded}
caption: The thermal unfolding curve implied by [[#eq-two-state]] with $\Delta G_\mathrm{u} = \Delta S_\mathrm{m}(T_\mathrm{m}-T)$: fraction unfolded against temperature in kelvin, for melting temperature $T_\mathrm{m}$ and unfolding entropy $\Delta S_\mathrm{m}$ (kJ mol⁻¹ K⁻¹). Raise $T_\mathrm{m}$ with the slider and the whole curve shifts right; raise $\Delta S_\mathrm{m}$ and it steepens, because a larger entropy change makes the equilibrium swing over a narrower range. The horizontal line is the half-unfolded point, at which $T = T_\mathrm{m}$ by definition. (The linear approximation to $\Delta G_\mathrm{u}(T)$ is good near $T_\mathrm{m}$ and poor far from it, where heat capacity effects and cold denaturation matter.)
:::

## Recovery, and why it dominates cost

A protein in a cell is not a product. For intracellular protein the cells are harvested and broken; for secreted protein the cells are removed and the supernatant kept, which is why secretion is worth a great deal even at a lower titre. Purification then proceeds by chromatography — affinity (an immobilised ligand, or an antibody, or a metal ion binding an engineered histidine tag), ion exchange, hydrophobic interaction, size exclusion — in a sequence chosen so that each step exploits a different property. The arithmetic is unforgiving, as [[biotechnology/bioprocessing]] develops: step yields multiply, so six steps at 90 % leave 53 %, and for a highly purified product the recovery train commonly accounts for more of the cost of goods than the fermentation does. This is the main reason an affinity tag, which can collapse three steps into one, is designed into a research construct as a matter of course — and the main reason it is often removed from a product construct, where the tag itself would have to be justified.

::: history
Recombinant protein production began almost immediately after recombinant DNA itself. Somatostatin was expressed in *E. coli* from a synthetic gene by Keiichi Itakura, Arthur Riggs, Herbert Boyer and colleagues in 1977; the two chains of human insulin followed in 1978 at Genentech and the City of Hope National Medical Center, published by David Goeddel and colleagues in 1979, and the product was approved in 1982 as the first recombinant protein product. Human growth hormone followed in 1985. Monoclonal antibodies came from a different line of work — Georges Köhler and César Milstein's hybridomas of 1975 — and were made usable in people by Greg Winter's chimeric and humanised constructs in the mid-1980s, after which antibody production drove the development of mammalian cell culture; the first approved monoclonal antibody therapeutic reached the market in 1986. Michael Smith established site-directed mutagenesis in 1978. Studier and Rosenberg's T7 expression system (1986–1987) became the default for bacterial expression. Frances Arnold's directed evolution of subtilisin E for activity in organic solvent (1993) and Willem Stemmer's DNA shuffling (1994) founded protein engineering by evolution; Arnold shared the 2018 Nobel Prize in Chemistry with George Smith and Gregory Winter for phage display. Peter Schultz's laboratory incorporated the first non-canonical amino acid through an orthogonal tRNA–synthetase pair in *E. coli* in 2001.
:::

::: summary
- Distinguish titre (g L⁻¹), specific productivity (per cell) and volumetric productivity (per litre per day); they are linked through the integral of viable cell density, $c_P = q_P\int X\,\mathrm{d}t$ ([[#eq-titre]]).
- For a protein retained in a growing cell, $p_\mathrm{ss} = k_s/(k_d+\mu)$ ([[#eq-steady-state]]): for stable proteins dilution by growth dominates, so level and response time are both set by growth rate.
- Inducible promoters separate growth from production. The T7 system is the strongest common bacterial choice and for that reason the most likely to overwhelm folding; the useful optimum is usually below maximum expression.
- Folding competes with aggregation, and aggregation is higher-order in unfolded chain, so slowing synthesis (temperature, inducer, promoter), adding chaperones or fusion partners, exporting to the periplasm, or changing host are the levers on solubility. Inclusion bodies can be refolded, with variable yield.
- Host choice is usually decided by post-translational modification: bacteria make no N-glycans, yeasts make hypermannosylated ones, insect cells paucimannose, CHO cells human-like but not identical ones. Disulfide bonds need an oxidising compartment.
- Saturation mutagenesis gives $20^{n}$ variants and needs roughly $3\times32^{n}$ clones to cover with NNK codons ([[#eq-library-size]]), so directed evolution proceeds in small steps, and the availability of a selection rather than a screen sets the scale of what can be searched.
- Stability is $\Delta G_\mathrm{u}$ of a few tens of kJ mol⁻¹; $f_U = 1/(1+e^{\Delta G_\mathrm{u}/RT})$ ([[#eq-two-state]]) and $\Delta T_\mathrm{m} \approx \Delta\Delta G/\Delta S_\mathrm{m}$ ([[#eq-tm-shift]]). Mutational effects are only approximately additive.
- Step yields multiply during recovery, and purification often costs more than production; secretion and affinity tags are valuable because they shorten the train.
:::

## Exercises

::: exercise Titre from a gel {level=1 check="1.1"}
A culture reaches 8 g L⁻¹ dry cell weight; protein is 55 % of dry weight and the product is 25 % of total protein. What is the titre in g L⁻¹, to one decimal place?
::: solution
$8\times0.55\times0.25 = 1.1$ g L⁻¹.
:::
:::

::: exercise Dilution versus degradation {level=1 check="4"}
A stable recombinant protein ($k_d \approx 0$) accumulates in cells growing at $\mu = 0.35$ h⁻¹. By what factor does its steady-state level change if the growth rate is reduced to $0.0875$ h⁻¹ at constant synthesis rate?
::: solution
From [[#eq-steady-state]] with $k_d = 0$, $p_\mathrm{ss} \propto 1/\mu$, and the growth rate falls by a factor of 4, so the level rises four-fold. (In practice the synthesis rate does not stay constant when growth slows, since ribosome content falls with growth rate; the calculation gives the direction and the order of magnitude.)
:::
:::

::: exercise Choosing a host {level=1}
For each product, name the simplest adequate host and the single property that rules out the cheaper alternatives: (a) a bacterial DNA polymerase for PCR kits; (b) a secreted fungal cellulase for industrial use; (c) a human monoclonal antibody; (d) a 12-subunit viral capsid for structural work.
::: solution
(a) *E. coli*: the protein is bacterial, non-glycosylated and needs no secretion, so nothing more is required. (b) *Bacillus subtilis* or *Pichia pastoris*: efficient secretion into the medium, which turns purification into a filtration plus one chromatography step. (c) CHO cells: a mammalian secretory pathway for assembly, sixteen disulfide bonds and human-like glycosylation — the glycan is the decisive requirement. (d) Insect cells with baculovirus: the capacity to express several large subunits simultaneously at high level and assemble them, which bacteria generally cannot.
:::
:::

::: exercise Solubility troubleshooting {level=2}
An 85 kDa protein with four disulfide bonds is expressed in the *E. coli* cytoplasm. Yield is high, all insoluble; refolding gives 3 % active material with an incorrect disulfide pattern. (a) Explain both observations mechanistically. (b) Give two changes within *E. coli* and one outside it, in increasing order of effort.
::: solution
(a) The cytoplasm is a reducing compartment (maintained so by thioredoxin and glutaredoxin systems), so cysteines do not form stable disulfides there; a protein whose fold depends on four of them cannot reach its native state, and the partly folded chains aggregate. Refolding in vitro then has to find the correct one of the many possible disulfide pairings — for 8 cysteines there are 105 ways to form four pairs — and without a disulfide isomerase most molecules end up mispaired, hence the 3 %.

(b) Within *E. coli*: (i) export to the periplasm with a signal peptide, where DsbA/DsbC provide oxidation and isomerisation; (ii) use a strain with an engineered oxidising cytoplasm (deficient in the reducing pathways) together with co-expressed isomerases. Outside: express in a eukaryotic host, where the protein folds in the oxidising ER with the full chaperone and isomerase complement — more effort and lower titre, but the most likely to work.
:::
:::

::: exercise Antibody titre from cell culture {level=2 check="4.5"}
A fed-batch CHO process holds an average viable density of $1.5\times10^{7}$ cells mL⁻¹ for 15 days at $q_P = 20$ pg cell⁻¹ day⁻¹. What titre, in g L⁻¹, to one decimal place?
::: solution
IVCD $= 1.5\times10^{7}\times15 = 2.25\times10^{8}$ cell day mL⁻¹, and $20\ \mathrm{pg}\times2.25\times10^{8} = 4.5\times10^{9}$ pg mL⁻¹ $= 4.5$ mg mL⁻¹ $= 4.5$ g L⁻¹.
:::
:::

::: exercise Library coverage {level=2 check="98000"}
Using NNK codons, how many clones must be screened for a 95 % chance of finding one specific variant whose three saturated positions each carry an amino acid encoded by a single NNK codon? Give the answer to two significant figures.
::: solution
The probability that a given clone is that variant is $(1/32)^{3} = 3.05\times10^{-5}$, so

$$
N = \frac{\ln(0.05)}{\ln(1 - 3.05\times10^{-5})} = 9.8\times10^{4},
$$

in agreement with the approximation $3\times32^{n} = 3\times32\,768 = 9.8\times10^{4}$ in [[#eq-library-size]]. Each additional position multiplies this by 32: four positions need $3.1\times10^{6}$ clones, five need $10^{8}$. Note also that the same library contains only $20^{3} = 8000$ distinct protein variants — the thirty-fold excess of clones is the price of degenerate codons, and is avoided by synthesising a defined set of codons instead.
:::
:::

::: exercise Fraction unfolded {level=2 check="0.02"}
A protein has $\Delta G_\mathrm{u} = 10$ kJ mol⁻¹ at 37 °C. What fraction is unfolded at any instant, to two decimal places?
::: solution
$RT = 8.314\times10^{-3}\times310 = 2.58$ kJ mol⁻¹, so $\exp(\Delta G_\mathrm{u}/RT) = e^{3.88} = 48.4$ and $f_U = 1/49.4 = 0.02$, about 2 %.
:::
:::

::: exercise Reading an induction experiment {level=2}
Induction is tested at four IPTG concentrations. Total product on a gel rises steadily with inducer; soluble product peaks at the second lowest and then falls; final cell density falls monotonically; activity per litre of culture peaks at the lowest concentration tested. (a) Explain the four patterns together. (b) What would you do next? (c) Why is "product as a fraction of total cell protein" a misleading figure of merit here?
::: solution
(a) More inducer means a higher rate of synthesis, hence more total product; past the folding capacity of the cell the extra appears as aggregate, so soluble product peaks and falls. The synthesis diverts ribosomes, amino acids and energy from growth and the aggregates impose a stress burden, so cell density falls as induction rises. Activity per litre is the product of soluble protein per cell and cells per litre, both of which fall at high induction, so it peaks earliest of all.

(b) Test below the lowest concentration used, and in parallel lower the temperature after induction — both reduce the synthesis rate, which is the variable that all four patterns point to. Then re-optimise the two together, since the optimum temperature depends on the induction level.

(c) The fraction of total cell protein is a ratio, and here both of its terms are moving: the denominator shrinks as growth is suppressed, so the fraction can rise while the absolute amount of useful product per litre falls. The figure of merit should be active product per litre per day.
:::
:::

::: exercise Epistasis in a stability campaign {level=3}
Five mutations are measured singly as $\Delta\Delta G = +3.0, +2.5, +2.0, +1.5, +1.0$ kJ mol⁻¹ on a protein with $\Delta G_\mathrm{u} = 18$ kJ mol⁻¹ and $\Delta S_\mathrm{m} = 1.2$ kJ mol⁻¹ K⁻¹ at 37 °C. (a) Predict $T_\mathrm{m}$ before and, assuming additivity, after all five. (b) The quintuple mutant measures $+6.0$ kJ mol⁻¹ and has lost 70 % of its catalytic activity. Interpret both results. (c) How would you proceed?
::: solution
(a) Before: $T_\mathrm{m} = 310 + 18/1.2 = 325$ K $= 52$ °C. Additivity gives $\Delta\Delta G = +10$ kJ mol⁻¹, $\Delta G_\mathrm{u} = 28$ kJ mol⁻¹ and $T_\mathrm{m} = 310 + 23.3 = 333$ K $= 60$ °C.

(b) The measured $+6.0$ instead of $+10$ is negative epistasis: the mutations are not independent, most likely because several stabilise the same structural element, so their contributions overlap. The loss of activity is the standard stability–activity trade-off: catalysis requires flexibility — residues must move through the catalytic cycle — and mutations that rigidify the structure often rigidify the active site too. This is why thermostabilisation campaigns screen for activity at the operating temperature rather than for $T_\mathrm{m}$ alone.

(c) Deconvolute: measure the subsets to find which mutations carry the lost activity and which overlap, and rebuild from the compatible ones. Then look for stabilising mutations far from the active site, where rigidification is harmless, and screen directly for residual activity after incubation at the target temperature — which measures what the application needs rather than a thermodynamic proxy.
:::
:::

::: exercise Recovery arithmetic and a design decision {level=3}
A secreted enzyme is recovered by filtration (95 %), affinity chromatography (85 %), tag cleavage (90 %), a second chromatography to remove the protease and tag (80 %) and ultrafiltration (95 %). (a) What is the overall recovery? (b) An untagged construct would allow a three-step train — filtration (95 %), ion exchange (75 %) and ultrafiltration (95 %) — but with a 60 % lower titre. Which gives more product per litre? (c) What considerations beyond yield decide this in practice?
::: solution
(a) $0.95\times0.85\times0.90\times0.80\times0.95 = 0.552$, about **55 %**.

(b) Take the tagged titre as 1 unit: tagged delivers $0.552$ units. The untagged titre is $0.40$ units with recovery $0.95\times0.75\times0.95 = 0.677$, delivering $0.271$ units — less than half. On yield, the tagged route wins decisively.

(c) The tag itself: a residual tag or a few extra residues left by the protease is a product-related impurity that must be characterised and justified, and for a product administered to people that is a substantial regulatory burden, whereas for an industrial enzyme it is irrelevant. Also the cost of the affinity resin and the protease (both expensive, and the resin's lifetime over many cycles matters more than its unit price), the fact that fewer steps mean less equipment and less time, and whether the ion-exchange step actually achieves the required purity — a yield comparison is only meaningful between trains that reach the same specification.
:::
:::
