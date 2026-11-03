Anfinsen's experiment implied that a protein's sequence contains all the information needed to specify its structure ([[biochemistry/amino-acids-proteins]]). If so, it should be possible to compute the structure from the sequence. For half a century this "protein folding problem" — in its practical form, the **structure prediction problem** — resisted every attack, while the gap widened between the number of known sequences (hundreds of millions) and of experimentally determined structures (a few hundred thousand). Then, in 2020, a deep-learning system predicted structures in a blind test with accuracy comparable to experiment for most targets, and within two years predicted models were available for almost every protein sequence in the public databases.

This chapter explains the three approaches that led there — modelling from homologous templates, physics-based simulation and fragment assembly, and the extraction of structural information from evolution — and how deep learning combined them. It ends with how to judge a predicted model and what prediction still cannot do. The architecture of proteins and the conservation of folds are in [[structural-biology/protein-architecture]], the physics of folding in [[structural-biology/protein-folding]]; sequence alignment, substitution matrices and database searching are covered in [[bioinformatics]].

## How to measure success

Before predicting anything we need a way to compare a model with the true structure. The obvious measure is the **root-mean-square deviation** (RMSD) of the Cα atoms after optimal superposition,

$$
\mathrm{RMSD} = \sqrt{\frac{1}{N}\sum_{i=1}^N d_i^2},
$$

where $d_i$ is the distance between equivalent atoms. RMSD has a weakness: being a mean of squares, it is dominated by the worst-predicted regions, so a model with a perfect core and one misplaced loop or domain can have a large RMSD. Assessment therefore uses measures that reward the fraction of the structure predicted well.

::: definition TM-score and GDT {#def-tm}
For a model of a protein of length $L$, superimposed on the target to maximise the score, the **TM-score** is

$$
\mathrm{TM} = \max\frac{1}{L}\sum_{i=1}^{L_\mathrm{aligned}}\frac{1}{1 + (d_i/d_0)^2}, \qquad d_0(L) = 1.24\sqrt[3]{L - 15} - 1.8\ \text{Å},
$$ {#eq-tm}

(Y. Zhang and J. Skolnick, 2004). Each residue contributes between 0 and 1, and the length-dependent scale $d_0$ makes scores comparable between proteins of different sizes. TM-scores lie between 0 and 1; pairs of unrelated structures typically score below about 0.3, and scores above 0.5 indicate the same fold in most cases. The **global distance test** GDT_TS, used in the CASP experiments, is the average of the percentages of residues that can be superimposed within 1, 2, 4 and 8 Å. The **lDDT** (local distance difference test; V. Mariani, T. Schwede and colleagues, 2013) compares all interatomic distances within 15 Å in model and target, without any superposition, and so is insensitive to domain movements.
:::

::: example Why RMSD can mislead {#ex-tm}
A model of a 100-residue protein has 80 residues within 1.0 Å of the target and a 20-residue terminal segment pointing the wrong way, 10 Å from its true position. Calculate the RMSD, the GDT_TS and the TM-score (assume this superposition is optimal).
::: solution
RMSD $= \sqrt{(80\times1^2 + 20\times10^2)/100} = \sqrt{20.8} = 4.6$ Å, which sounds poor. GDT_TS: 80 % of residues are within 1, 2, 4 and 8 Å, so GDT_TS = 80. For the TM-score, $d_0(100) = 1.24\times85^{1/3} - 1.8 = 3.65$ Å; the good residues contribute $80/(1 + (1/3.65)^2) = 74.4$ and the bad ones $20/(1 + (10/3.65)^2) = 2.4$, giving TM $= 76.8/100 = 0.77$. GDT and TM-score both say correctly that most of the model is right; RMSD is dominated by one wrong segment.
:::
:::

::: widget plot
f: 1/(1 + (x/(1.24*(L - 15)^(1/3) - 1.8))^2)
x: 0, 15
y: 0, 1
sliders: L=100:20:1000:10
labels: \text{TM-score contribution per residue}
vlines: 1; 2; 4; 8
caption: The contribution of one residue to the TM-score [[#eq-tm]] against its distance $d$ (Å) from the true position, for a protein of $L$ residues (slider). The vertical lines are the GDT cut-offs of 1, 2, 4 and 8 Å, where GDT counts a residue as fully right or fully wrong; the TM-score instead declines smoothly. Increase $L$ and the scale $d_0$ grows (3.7 Å at $L = 100$, 6.4 Å at $L = 300$), so the same error counts for less in a larger protein.
:::

### CASP

Progress has been measured since 1994 by the **Critical Assessment of protein Structure Prediction** (CASP), organised by John Moult and colleagues every two years. Groups predict the structures of proteins whose experimental structures are about to be determined but are not yet public; independent assessors then compare predictions with experiment. This blind design, now copied in many fields, made it impossible to fool oneself by tuning a method to known answers, and it documented both the long stagnation and the sudden breakthrough.

## Template-based modelling

Because folds are conserved far longer than sequences ([[structural-biology/protein-architecture#prop-chothia-lesk]]), the most reliable way to predict a structure, for decades, was to find a homologue of known structure and copy it.

::: algorithm Comparative (homology) modelling {#alg-homology}
1. **Find templates**: search the sequences of the PDB for homologues of the target, using pairwise methods (BLAST) or, for distant homologues, profile and hidden-Markov-model methods (PSI-BLAST, HHpred) that use the variability of whole families.
2. **Align** the target to one or more templates, correcting the alignment where it would place gaps inside secondary structures.
3. **Build** a model: copy the backbone of aligned regions, and satisfy spatial restraints derived from the templates (as in MODELLER; A. Šali and T. L. Blundell, 1993).
4. **Model loops and side chains** for unaligned regions and changed residues, using libraries of loop conformations and rotamers.
5. **Refine and assess** the model with statistical potentials or physics-based energy functions.
:::

The accuracy of a comparative model depends mainly on the sequence identity between target and template and on the quality of the alignment. Above about 50 % identity, models of the core are often within about 1 Å RMSD of the true structure; between 30 and 50 %, the core is usually right but loops and side chains deviate; below about 25–30 %, in the **twilight zone** (B. Rost, 1999), detecting the template and aligning it correctly become the limiting steps, and an alignment error of a few residues ruins the model locally.

::: example The cost of an alignment error {#ex-register}
In a comparative model, the target's sequence is aligned to a template helix but shifted by one residue (every residue is placed one position along from where it should be). In an ideal α-helix, Cα atoms lie on a cylinder of radius 2.3 Å, with a rise of 1.5 Å and a rotation of 100° per residue. How far is each Cα placed from its correct position? Compare a shift of four residues, and the error expected from template divergence at 30 % identity (about 1.5 Å).
::: solution
A shift by $n$ residues moves each atom $1.5n$ Å along the axis and rotates it by $100n°$ about it; the chord for a rotation $\alpha$ on a circle of radius $r$ is $2r\sin(\alpha/2)$. For $n = 1$: chord $2\times2.3\times\sin50° = 3.52$ Å, so the displacement is $\sqrt{3.52^2 + 1.5^2} = 3.8$ Å. For $n = 4$: chord $2\times2.3\times\sin200° $, of magnitude $1.57$ Å, and axial shift 6.0 Å, so 6.2 Å. Every side chain now points to the wrong place: a one-residue misalignment produces an error more than twice that caused by 70 % sequence divergence of a correctly aligned template. Getting the alignment right is the crux of comparative modelling in the twilight zone.
:::
:::

::: widget plot
f: sqrt((2*2.3*sin(50*x*pi/180))^2 + (1.5*x)^2)
x: 0, 8
y: 0, 13
labels: \text{C}\alpha\ \text{displacement (Å)}
hlines: 1.5
points: 1, 3.83; 4, 6.20
caption: The displacement of each Cα atom (Å) when a sequence is misaligned on an ideal α-helix by $x$ residues (horizontal axis; only whole numbers are meaningful), from [[#ex-register]]. The rotational part oscillates with a period of 3.6 residues while the axial part grows steadily; the marked points are shifts of 1 and 4 residues. The horizontal line at 1.5 Å is the typical core error of a correctly aligned template at 30 % identity: any misalignment is worse.
:::

When no homologue can be detected by sequence, **fold recognition** or **threading** asks which known fold the sequence is most compatible with, by scoring how well each residue fits its environment (buried or exposed, helix or strand) in each candidate fold (J. U. Bowie, R. Lüthy and D. Eisenberg, 1991; D. T. Jones, W. R. Taylor and J. M. Thornton, 1992). Fold recognition works because the number of folds is limited.

## Physics and fragments

The alternative is to compute the structure from first principles, by finding the conformation of lowest free energy with a physical model of the interactions. **Molecular dynamics** simulations with all-atom force fields ([[structural-biology/dynamics-and-design]]) can fold small, fast-folding proteins: in 2011 K. Lindorff-Larsen, S. Piana, R. O. Dror and D. E. Shaw folded twelve proteins of 10–80 residues to their native structures in simulations of up to milliseconds on the special-purpose computer Anton. But such simulations are enormously expensive and the force fields are not accurate enough to discriminate reliably among compact structures of larger proteins.

The most successful approach before deep learning combined physics with knowledge. **Fragment assembly**, developed in the program Rosetta (K. T. Simons, C. Kooperberg, E. Huang and D. Baker, 1997), cuts the target sequence into overlapping segments of 3 and 9 residues, collects for each segment the conformations of similar sequences in known structures, and builds models by Monte Carlo search that inserts fragments into the chain and keeps changes that lower a knowledge-based energy. Local structure is taken from the database; the search explores how it is assembled. Rosetta could produce correct folds for many small proteins, but often failed for larger ones or for complex topologies.

## Evolution as a source of structure

The decisive source of information turned out to be evolution itself. Suppose residues $i$ and $j$ are in contact in a protein's structure. If a mutation changes residue $i$ in a way that disturbs the contact, a compensating mutation at $j$ may restore it, and over millions of years of evolution the two positions will tend to change together. In a large alignment of homologous sequences, **correlated mutations** therefore reveal contacts — the same logic as covariation in RNA ([[structural-biology/nucleic-acid-structure]]).

The idea was old (U. Göbel, C. Sander, R. Schneider and A. Valencia, 1994), but early attempts failed because correlations are transitive: if $i$ touches $j$ and $j$ touches $k$, then $i$ and $k$ also correlate although they are not in contact. **Direct coupling analysis** (M. Weigt, T. Hwa and colleagues, 2009; F. Morcos and colleagues, 2011; D. S. Marks, C. Sander and colleagues, 2011) separated direct from indirect correlations by fitting a global statistical model to the whole alignment.

::: definition Potts model of a protein family {#def-potts}
A **Potts model** assigns a probability to each sequence $\mathbf a = (a_1, \dots, a_L)$ in a family of aligned sequences, with $a_i$ one of 21 states (20 amino acids and a gap):

$$
P(\mathbf a) = \frac1Z\exp\Bigl(\sum_i h_i(a_i) + \sum_{i<j} J_{ij}(a_i, a_j)\Bigr),
$$ {#eq-potts}

where the **fields** $h_i$ describe the preferences of each position and the **couplings** $J_{ij}$ describe interactions between pairs of positions, and $Z$ normalises. The parameters are fitted so that the model reproduces the single-site and pairwise amino-acid frequencies of the alignment. Pairs with strong couplings $J_{ij}$ are predicted to be in contact. The model is a maximum-entropy description, not a physical one: the couplings absorb physical contacts, functional constraints and phylogenetic correlations alike.
:::

::: example How many sequences are needed? {#ex-potts}
How many parameters does a Potts model have for a family of length $L = 200$? Why does contact prediction from coevolution work poorly for families with only a few dozen known sequences?
::: solution
The fields have $21\times200 = 4\,200$ parameters and the couplings $21^2\times L(L-1)/2 = 441\times19\,900 = 8.8\times10^6$. With so many parameters, the pairwise frequencies must be estimated from many sequences — in practice, thousands of effectively independent sequences (after down-weighting near-duplicates) gave reliable contacts in the early 2010s, while families with tens of members gave mostly noise even with strong regularisation. This is why coevolution methods first succeeded for large families, and why the explosion of metagenomic sequences in the 2010s, which supplied deep alignments for many more families, was so important to structure prediction.
:::
:::

Predicted contacts were good enough to fold some proteins, including membrane proteins of unknown structure (T. A. Hopf, D. S. Marks and colleagues, 2012). Then deep neural networks, trained on the PDB to map alignments to contact maps and then to maps of inter-residue distances, made contact prediction much more accurate (S. Wang, J. Xu and colleagues, 2017); the first AlphaFold, from DeepMind, used predicted distance distributions as a potential to fold proteins by gradient descent and led CASP13 in 2018 (A. W. Senior and colleagues, 2020).

## Deep learning: AlphaFold2 and its successors

At CASP14 in 2020, AlphaFold2 (J. Jumper, R. Evans, A. Pritzel, D. Hassabis and colleagues at DeepMind; published 2021) achieved a median GDT_TS of about 92 across all targets — for many of them, within the uncertainty of the experimental structures themselves. Its design is worth understanding in outline.

- **Inputs**: a multiple sequence alignment of homologues of the target, from large sequence databases including metagenomes, and optionally structural templates.
- **Evoformer**: a deep network that maintains two representations, one for the alignment (sequences × positions) and one for pairs of positions (positions × positions), and repeatedly exchanges information between them with attention mechanisms. The pair representation comes to encode distances and orientations; updates are constrained by geometric consistency (for example, "triangle" updates that reflect that distances $ij$, $jk$ and $ik$ must be compatible).
- **Structure module**: converts the pair and single representations into three-dimensional coordinates, treating each residue as a rigid frame and using an attention mechanism that is invariant to rotation and translation of the whole structure; side chains are placed from predicted torsion angles.
- **Recycling**: the output is fed back as input several times, refining the prediction.
- **Confidence**: for each residue the network predicts its own accuracy as the **pLDDT** (predicted lDDT, 0–100), and for each pair of residues the **predicted aligned error** (PAE), the expected position error of residue $j$ when the structure is superimposed on residue $i$.

The network was trained end to end on structures in the PDB, so it learned from experimental structures the relationships between evolutionary patterns, sequence and geometry, rather than relying on a physical energy function.

::: definition pLDDT and PAE {#def-plddt}
**pLDDT** is the network's estimate of the lDDT of each residue's Cα atom, on a scale of 0–100. As conventionally interpreted for AlphaFold models: above 90, very high confidence (backbone and side chains usually accurate); 70–90, confident (backbone usually correct); 50–70, low confidence; below 50, very low confidence — often regions that are intrinsically disordered in isolation. The **PAE** matrix gives, for each pair of residues $(i, j)$, the expected error in Å in the position of $j$ when model and true structure are aligned on $i$. Low PAE within a block and high PAE between blocks indicate well-predicted domains whose relative placement is uncertain.
:::

The consequences were rapid. RoseTTAFold, a related three-track network, was published by D. Baker's group in 2021 (M. Baek and colleagues). In collaboration with the European Bioinformatics Institute, DeepMind released the **AlphaFold Protein Structure Database** in July 2021 with models of the human and 20 other proteomes, expanding it in 2022 to more than 200 million models covering almost every sequence in UniProt. Meta's ESMFold (Z. Lin and colleagues, 2023), which replaces the alignment by the internal representation of a protein **language model** trained on hundreds of millions of sequences, predicted structures for some 600 million metagenomic proteins, at somewhat lower average accuracy but much higher speed. AlphaFold-Multimer (2021) and AlphaFold3 (J. Abramson and colleagues, 2024), together with RoseTTAFold All-Atom and openly available reimplementations such as OpenFold and Boltz, extended prediction to complexes of proteins with each other, with nucleic acids, small-molecule ligands, ions and modified residues, with AlphaFold3 replacing the structure module by a diffusion-based generative model. The 2024 Nobel Prize in Chemistry was shared by Demis Hassabis and John Jumper, for protein structure prediction, and David Baker, for computational protein design ([[structural-biology/dynamics-and-design]]).

::: example Reading a predicted model {#ex-plddt}
An AlphaFold model of a 450-residue human signalling protein shows: residues 1–60 with pLDDT 25–40, coiled loosely around the rest; residues 61–200 (a kinase N-lobe and C-lobe) with pLDDT 88–96; residues 201–260 with pLDDT 45–60; residues 261–420 (a second domain) with pLDDT 85–93; and residues 421–450 with pLDDT below 30. The PAE between the kinase domain and the second domain is 20–25 Å. Interpret the model.
::: solution
The kinase domain (61–200) and the second domain (261–420) are each confidently predicted and can be used as structures, for instance to map mutations or as search models for molecular replacement. Residues 1–60 and 421–450, with very low pLDDT, are probably intrinsically disordered in the isolated protein: their coordinates are not predictions of a structure and should not be interpreted (the "spaghetti" is a graphical artefact). The linker 201–260 is uncertain. The high inter-domain PAE means that the relative orientation of the two domains is not predicted: the picture shows one arrangement, but any other may be correct, and the domains may move relative to each other. Disordered regions may fold on binding a partner, which a prediction of the isolated protein cannot show.
:::
:::

::: warning A confident prediction is still a prediction
High pLDDT means the network is confident, and for single domains it is usually right; but a model is a hypothesis, not a measurement. Predictions are least reliable for proteins with few homologues (orphan genes, rapidly evolving viral proteins), for designed or engineered sequences, for alternative conformations (a predicted model usually shows one state, often resembling the most common one in the PDB), for complexes whose interfaces are not conserved, and for the effects of single mutations, which the networks generally do not capture well. A prediction should be tested against experiment whenever its details matter — and predicted structures should never be described as "determined".
:::

## What prediction is used for

Predicted models have changed daily practice in structural biology.

- **Experimental structure determination**: predicted models are used as search models for molecular replacement ([[structural-biology/x-ray-crystallography]]) and are docked into cryo-EM maps of moderate resolution ([[structural-biology/cryo-em]]), turning a 6–8 Å map of a large complex into an interpretable model. Experiment increasingly focuses on what prediction cannot give: complexes, conformational states, ligand binding and dynamics.
- **Annotation**: structural similarity detects homology beyond the reach of sequence. Fast structural search over hundreds of millions of predicted models, with tools such as Foldseek (M. van Kempen, M. Steinegger and colleagues, 2023), has assigned folds and likely functions to many proteins of unknown function and has revealed previously unrecognised families.
- **Interactions**: predicting complexes for all pairs of proteins in a proteome can propose new interactions; a 2021 screen of about 8 million pairs of yeast proteins with combined coevolution and deep-learning methods predicted structures for 106 previously unknown complexes (I. R. Humphreys, D. Baker, Q. Cong and colleagues).
- **Variants and design**: models help interpret disease-associated missense variants (by locating them in cores, interfaces or active sites) and are the starting point for engineering and design ([[structural-biology/dynamics-and-design]]).

::: quiz
An AlphaFold model of a protein has pLDDT above 90 throughout, but the experimental structure, solved later with a bound ligand, differs by 8 Å in the position of a lid domain. Which explanation is most likely?
- [ ] The experiment must be wrong, because the prediction was confident.
- [ ] pLDDT measures the accuracy of relative domain positions, so the prediction was simply wrong.
- [x] The protein adopts more than one conformation; the prediction shows one well-formed state (often the one most represented among homologues in the PDB), while the ligand-bound state is another.
- [ ] Ligands never change protein structures.
::: solution
pLDDT is a per-residue, local measure; it says each part is well formed, not that the arrangement shown is the only one the protein adopts. Many proteins switch between open and closed or apo and liganded states, and a prediction typically returns one of them. The PAE between lid and core, and comparison with homologues in different states, would be the first things to examine.
:::
:::

::: application Structural biology of the "dark proteome"
When the human proteome was predicted in 2021, about 58 % of all its residues received confident models (pLDDT above 70) — considerably more than experimental structures and template-based models had covered — and much of the remainder lay in regions likely to be disordered (K. Tunyasuvunakool and colleagues, 2021). For many organisms used in agriculture and for neglected pathogens, which had few experimental structures, predicted proteomes provided the first structural view of most proteins. Coverage figures change as databases and methods improve; for current numbers consult the AlphaFold Database and UniProt (figures here as of 2021–22).
:::

### What remains hard

As of 2026, several problems remain open. Prediction of **RNA** structures lags far behind proteins, because RNA families have fewer known structures to learn from; the CASP15 assessment (2022), which included RNA targets for the first time, found that the best methods were not deep-learning ones. **Conformational ensembles** and the effects of mutations on stability and function are only partly addressed, by sampling from networks with modified inputs or by combining them with simulation. **Intrinsically disordered regions** are recognised but not described as the ensembles they are. Protein–ligand complexes are predicted with variable success, and **accuracy for genuinely novel situations** — new folds, orphan proteins, designed sequences far from natural ones — is harder to assess because the training data are dominated by natural, well-studied families.

::: history
In the 1960s and 1970s prediction was largely of secondary structure, by the statistical propensities of P. Y. Chou and G. D. Fasman (1974) and others, reaching about 60–65 % accuracy for three states; neural networks trained on alignments raised it above 70 % (B. Rost and C. Sander, 1993). Comparative modelling became routine in the 1990s (MODELLER, SWISS-MODEL), threading and fragment assembly extended prediction to new folds, and CASP from 1994 measured the slow progress. Coevolution-based contact prediction (2009–2011) and its deep-learning successors (2016–2018) set the stage, and at CASP14 in December 2020 AlphaFold2's results were described by the organisers as having essentially solved the single-chain prediction problem for most proteins. The full method and code were published in July 2021, followed within weeks by the AlphaFold Database and RoseTTAFold.
:::

## Where this leads

Predicted structures are static. How proteins move, bind and change shape — and how the same networks, run in reverse, are used to design proteins that have never existed — is the subject of [[structural-biology/dynamics-and-design]]. Molecular machines, whose mechanisms depend on sequences of conformational states, are in [[structural-biology/molecular-machines]].

::: summary
- Models are compared with targets by RMSD (dominated by outliers), GDT_TS, TM-score ([[#eq-tm]]; above 0.5 usually the same fold) and superposition-free lDDT. CASP has tested predictions blind since 1994.
- Comparative modelling copies a homologous template; accuracy falls with sequence identity and fails in the twilight zone below 25–30 %. Threading recognises known folds.
- Physics-based simulation folds only small proteins; fragment assembly (Rosetta) combined database fragments with Monte Carlo search.
- Coevolving pairs of positions in large alignments reveal contacts; Potts models (direct coupling analysis) separate direct from indirect correlations, but need thousands of sequences.
- AlphaFold2 (CASP14, 2020) learned to map alignments and templates to coordinates, with per-residue pLDDT and pairwise PAE confidence; successors predict complexes, nucleic acids and ligands.
- Predictions are hypotheses: weakest for orphan proteins, alternative states, mutations, RNA and disordered regions.
:::

## Exercises

::: exercise The TM-score scale {level=1 check="6.36"}
Calculate $d_0$ (Å, three significant figures) for a protein of 300 residues.
::: solution
$d_0 = 1.24\times285^{1/3} - 1.8 = 1.24\times6.580 - 1.8 = 6.36$ Å.
:::
:::

::: exercise A uniformly good model {level=1 check="0.91"}
In a model of a 300-residue protein every residue is 2.0 Å from its true position after superposition. What is the TM-score (two significant figures)?
::: solution
Each residue contributes $1/(1 + (2.0/6.36)^2) = 1/1.0989 = 0.910$, so TM $= 0.91$. The RMSD is 2.0 Å.
:::
:::

::: exercise Expected accuracy of a homology model {level=1 check="1.2"}
Using the Chothia–Lesk relation $\Delta \approx 0.40e^{1.87H}$ Å, estimate the core RMSD (Å, two significant figures) of a model built on a template with 40 % sequence identity, assuming a perfect alignment.
::: solution
$H = 0.6$: $\Delta = 0.40e^{1.122} = 0.40\times3.07 = 1.2$ Å. Alignment errors and loop modelling usually make the overall model worse than this.
:::
:::

::: exercise Transitive correlations {level=2}
In an alignment, positions 10 and 50 co-vary strongly, as do positions 50 and 90, and also, more weakly, 10 and 90. In the structure, 10 contacts 50 and 50 contacts 90, but 10 and 90 are 18 Å apart. Explain the weak 10–90 correlation and how a Potts model avoids predicting it as a contact.
::: solution
The 10–90 correlation is indirect: a change at 10 favours a particular residue at 50, which in turn favours a particular residue at 90, so 10 and 90 become correlated through 50 without interacting. Simple correlation measures (mutual information) cannot distinguish this from direct coupling. A Potts model fits all pairwise couplings simultaneously so as to reproduce all the observed pairwise frequencies; the 10–90 correlation is then explained by the product of the 10–50 and 50–90 couplings, and the fitted direct coupling $J_{10,90}$ is small.
:::
:::

::: exercise Choosing a template {level=2}
For a 250-residue target, three templates are found: A, 85 % identity over residues 1–80; B, 32 % identity over residues 10–245; C, 28 % identity over residues 1–250, but in a different conformational state (inactive) from the one of interest (active). How would you build the best model, and what would you expect to be least reliable?
::: solution
B covers almost the whole chain and, at 32 %, should give a correct fold with core RMSD around 1.5 Å; use it as the main template, with A for residues 1–80, where its much higher identity gives accurate local structure, provided A and B agree on the relative placement. C is useful for checking alignment in the twilight zone but would bias the model towards the inactive state. Least reliable: residues 246–250 and other unaligned segments, loops with insertions relative to B, side-chain conformations at 32 % identity, and any regions that differ between active and inactive states. Today one would also run a deep-learning prediction and compare; with a 32 % template available, it would very likely agree on the fold and might do better on loops.
:::
:::

::: exercise Interpreting PAE {level=2}
A predicted model of a two-domain enzyme has pLDDT above 90 in both domains. The PAE matrix shows values below 3 Å within each domain and below 4 Å between them. A second protein, also with pLDDT above 90 in both domains, has PAE of 25 Å between domains. What can you conclude about the relative orientation of the domains in each case, and what experiment would test it?
::: solution
In the first protein the low inter-domain PAE means the network is confident about the relative placement of the domains — typically because they form a conserved interface. In the second it is not: each domain is well predicted but their arrangement is undetermined, perhaps because they are connected by a flexible linker or adopt several arrangements. SAXS (comparing the measured scattering with that calculated from the model), cross-linking mass spectrometry, FRET between labelled sites, or a crystal or cryo-EM structure would test the arrangement.
:::
:::

::: exercise Data for coevolution {level=2}
A protein family has 400 sequences in the databases, but 300 of them are from a single genus and are more than 90 % identical to each other. Why is the "effective number of sequences" much smaller than 400, and why does it matter for contact prediction?
::: solution
Closely related sequences share mutations by common descent rather than by independent compensation, so they do not provide independent evidence of coevolution; many correlations among them are phylogenetic. Methods therefore weight each sequence by the inverse of the number of sequences within (say) 80 % identity of it. The 300 near-identical sequences then count for perhaps a few, giving an effective number of a hundred or so — far too few to fit the millions of parameters of a Potts model reliably ([[#ex-potts]]). Deep-learning methods are less demanding but also degrade for shallow alignments.
:::
:::

::: exercise Prediction and folding {level=3}
"AlphaFold has solved the protein folding problem." Discuss this claim, distinguishing (a) the prediction of the native structure from sequence, (b) the physical mechanism and kinetics of folding, and (c) the prediction of stability and of the effects of mutations.
::: solution
(a) For most single-domain natural proteins with many homologues, deep-learning methods predict the native structure with near-experimental accuracy; in that practical sense the prediction problem is largely solved, with exceptions (orphans, alternative states, some complexes, RNA). (b) The networks do not simulate folding; they map sequence and evolutionary information to a structure learned from the PDB. They say nothing directly about the pathway, transition states, folding rates, intermediates, misfolding or the role of chaperones ([[structural-biology/protein-folding]]). (c) Stability ($\Delta G_\mathrm U$) and $\Delta\Delta G$ of mutations are thermodynamic quantities that the networks were not trained to predict; their confidence scores correlate only weakly with stability, and a destabilising point mutation usually leaves the predicted structure unchanged. These require physics-based methods, dedicated models trained on stability data, or experiment. The claim is therefore true of (a), with caveats, and not of (b) or (c).
:::
:::

::: exercise Designing a test {level=3}
You suspect that AlphaFold's high accuracy partly reflects proteins similar to its training set. Design a fair test of its accuracy on "novel" proteins. What would you hold out, how would you define novelty, and what pitfalls would you guard against?
::: solution
Use only structures released after the training cut-off date (the CASP principle of blind prediction), and define novelty by the absence of detectable homologues in the training set: for example, no PDB entry before the cut-off with a TM-score above 0.5 to the target or any sequence similarity detectable by HMM searches. Stratify results by alignment depth (effective number of sequences) and by structural class. Pitfalls: leakage through homologues of the target in the training data, through templates found at prediction time, or through the multiple sequence alignment databases; using few targets (report confidence intervals); and choosing the metric (report GDT, TM-score and lDDT, and check interfaces and loops separately). Comparing with experimental replicate variability gives a ceiling for "experimental accuracy".
:::
:::
