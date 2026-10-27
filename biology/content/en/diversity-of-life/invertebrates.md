About 1.5 million species of animals have been described (Zhi-Qiang Zhang, 2013, counted 1,552,319), and roughly 97 % of them are **invertebrates** — animals without a backbone. Four in five described animal species are arthropods, most of them insects; but the invertebrates also include sponges that filter thousands of times their own volume of water a day, corals that build reefs visible from space, flatworms that regenerate a whole body from a fragment, earthworms that turn over the soil, octopuses with half a billion neurons, and sea urchins whose larvae helped to found developmental biology. "Invertebrate" is not a natural group — it means "all animals except one subphylum of chordates", a paraphyletic grade — but it is a convenient way to divide a vast subject.

The organising idea of this chapter is the **body plan**: the basic architecture shared by the members of a phylum — symmetry, tissue layers, body cavities, segmentation, skeleton. We first define animals and sketch the tree of animal phyla as of the mid-2020s, including the unresolved question of which lineage branched first. We then work through the major phyla, from sponges and cnidarians through the protostomes (molluscs, annelids, flatworms, nematodes, arthropods) to the echinoderms, and end with the Cambrian explosion, linking to [[evolution/macroevolution]]. Two pieces of physics run through the chapter: how diffusion limits the size and shape of animals without circulatory systems, and how arthropods grow by moulting. Development of body plans is treated in [[developmental-biology]].

## What is an animal?

::: definition Animals (Metazoa) {#def-metazoa}
**Animals** (Metazoa) are a clade of multicellular, heterotrophic eukaryotes in the Opisthokonta ([[diversity-of-life/protists#def-supergroups]]), whose closest living relatives are the choanoflagellates. Their synapomorphies include an extracellular matrix rich in **collagen**; cell–cell junctions and, in most, **epithelia** (sheets of polarised cells on a basement membrane); development from a **blastula**; and a life cycle in which the only multicellular phase is diploid, meiosis producing **gametes** (a small motile sperm with a single posterior flagellum and a large egg) directly. Most animals ingest food and digest it internally, and most have **muscle** and **nerve** cells.
:::

Animals originated from colonial choanoflagellate-like ancestors. Molecular clocks put the origin of crown animals in the Cryogenian or Tonian, roughly 650–850 million years ago (Mario dos Reis and colleagues, 2015), though with wide uncertainty; the oldest widely accepted animal fossils are in the Ediacaran, from about 570 million years ago. *Dickinsonia*, a flat, quilted Ediacaran organism up to a metre long, was confirmed as an animal when Ilya Bobrovskiy and colleagues (2018) extracted from its organically preserved fossils cholesteroid molecules — the sterols characteristic of animals.

### The vocabulary of body plans

::: definition Symmetry, germ layers and body cavities {#def-bodyplan}
- **Symmetry**: an **asymmetric** body has no plane of symmetry (most sponges); a **radially symmetric** body has many planes through a central oral–aboral axis (cnidarians; echinoderm adults are pentaradial, five-fold); a **bilaterally symmetric** body has a single plane dividing it into mirror-image left and right halves, with distinct anterior and posterior, dorsal and ventral sides.
- **Germ layers**: in the embryo, cells form an outer **ectoderm**, an inner **endoderm** lining the gut and, in **triploblastic** animals, a middle **mesoderm** that forms muscles, connective tissue and, in many, circulatory and excretory organs. Cnidarians and ctenophores are usually called **diploblastic** (ectoderm and endoderm only, with a largely non-cellular middle layer, the mesoglea).
- **Body cavities**: an **acoelomate** animal has solid tissue between gut and body wall (flatworms); a **pseudocoelomate** has a fluid-filled cavity between mesoderm and endoderm (nematodes, rotifers); a **coelomate** has a cavity entirely lined by mesoderm, the **coelom** (annelids, molluscs, arthropods in reduced form, echinoderms, chordates).
:::

The coelom and its fluid matter mechanically. A closed fluid-filled cavity surrounded by muscle is a **hydrostatic skeleton**: because the fluid is incompressible, contraction of circular muscles lengthens a segment and contraction of longitudinal muscles shortens and widens it. An earthworm crawls by passing waves of such contractions along its segmented coelom; a sea anemone extends its body the same way.

::: example How a hydrostatic skeleton works {#ex-hydrostatic}
Treat one segment of an earthworm as a cylinder of fixed volume $V = \pi r^2\ell$ (the coelomic fluid is incompressible, and the segment is sealed from its neighbours by septa). (a) If the circular muscles contract and reduce the radius by 20 %, by how much does the segment lengthen? (b) If the longitudinal muscles then shorten it back to its original length, what is its radius?
::: solution
(a) With $V$ fixed, $\ell \propto 1/r^2$. Reducing $r$ to $0.8r$ multiplies $\ell$ by $1/0.8^2 = 1.5625$: the segment becomes 56 % longer. A modest squeeze produces a large extension, which is how a worm pushes its front end forward through soil.

(b) Back to the original length means back to the original radius, since $r \propto 1/\sqrt{\ell}$: the segment fattens again and anchors itself against the burrow wall (aided by bristles, chaetae), while the next segment extends. Segmentation lets each section do this independently, so waves of thin-and-long and short-and-fat segments pass backwards along the body (peristalsis). In an unsegmented animal, squeezing one region would push fluid into every other.
:::
:::

Hydrostatic skeletons, exoskeletons (arthropods, molluscan shells) and endoskeletons (echinoderm ossicles, vertebrate bone) are three solutions to the same problem of transmitting muscle force.

::: warning "Body plans are a ladder from simple to complex"
Textbooks once arranged phyla in a sequence — acoelomate, then pseudocoelomate, then coelomate — as if each were a step towards higher animals. Molecular phylogenies broke the sequence. Acoelomate flatworms are not primitive bilaterians but members of the Spiralia, closely related to coelomate annelids and molluscs, and their solid bodies are probably derived; pseudocoelomate nematodes and rotifers belong to two different branches; and the coelom may have arisen more than once, or been lost repeatedly. Body cavities are useful descriptions, but not reliable guides to relationships. Similarly, sponges are not "failed" animals but a successful lineage, 9,000 or so species strong, that has filtered sea water since the Cryogenian or Ediacaran.
:::

## The tree of animals

Animal phylogeny was transformed between 1995 and 2010 by ribosomal RNA and then phylogenomic data. The main features of the current tree, as of 2026, are:

- **The first split.** Either sponges (Porifera) or comb jellies (Ctenophora) are the sister group of all other animals. Ctenophores have nerves, muscles and a through-gut, sponges have none of these, so the answer matters for whether nervous systems evolved once and were lost in sponges, or twice. Analyses of sequence data have long disagreed, sensitive to models and taxon sampling; in 2023 Darrin Schultz and colleagues used a different kind of character — the conservation of **gene linkage groups (synteny)** across chromosomes, including rare irreversible fusions shared by sponges and other animals but not ctenophores — and found strong support for **ctenophores as the sister of all other animals**. This is now the leading hypothesis, but not universally accepted.
- **Placozoa** (*Trichoplax adhaerens* and relatives), flat discs of a few thousand cells of a handful of types, and **Cnidaria** branch next, with the Bilateria.
- **Bilateria** consist of **Xenacoelomorpha** (small worms without a through-gut; whether they are sister to all other bilaterians or belong with the deuterostomes is debated) and the **Nephrozoa**, which split into protostomes and deuterostomes.
- **Protostomia** consist of two great clades: **Ecdysozoa**, animals that grow by moulting a cuticle (arthropods, velvet worms, tardigrades, nematodes and others; Anna Marie Aguinaldo and colleagues, 1997), and **Spiralia** (including **Lophotrochozoa**: molluscs, annelids, brachiopods, nemerteans and others, and flatworms, rotifers and relatives; Kenneth Halanych and colleagues, 1995, for Lophotrochozoa).
- **Deuterostomia** consist of **Ambulacraria** (echinoderms and hemichordates) and **Chordata** ([[diversity-of-life/vertebrates]]).

::: widget graph
nodes: Metazoa@0,4; Ctenophora@2,7.2; N1@1.2,3.5; Porifera@2.6,6.2; N2@2.2,3; Placozoa@3.6,5.4; N3@3.2,2.6; Cnidaria@4.6,4.6; Bilateria@4.2,2; Deuterostomia@5.6,3.4; Ecdysozoa@5.6,1.6; Spiralia@5.6,0.4
edges: Metazoa>Ctenophora; Metazoa>N1; N1>Porifera; N1>N2; N2>Placozoa; N2>N3; N3>Cnidaria; N3>Bilateria; Bilateria>Deuterostomia; Bilateria>Ecdysozoa; Bilateria>Spiralia
caption: A summary of animal phylogeny with ctenophores as the sister group of all other animals (Schultz and colleagues, 2023), drawn as a directed graph from ancestors (unlabelled nodes N1–N3) to descendants. The alternative "sponges first" tree would swap Ctenophora and Porifera. The relationship of Placozoa to Cnidaria and Bilateria is still uncertain, and Xenacoelomorpha (not shown) attach near the base of Bilateria. Bilateria are shown splitting three ways: protostomes are Ecdysozoa plus Spiralia. Drag nodes to try the alternatives; branch lengths are meaningless.
:::

### Protostomes and deuterostomes

The names describe the fate of the **blastopore**, the opening through which cells move inwards during gastrulation: in "protostomes" ("mouth first") it was said to become the mouth, in "deuterostomes" ("mouth second") the anus, the mouth forming later. Classical embryology added other differences: spiral and determinate cleavage, and a coelom formed by splitting of mesoderm (schizocoely), in many protostomes; radial and indeterminate cleavage, and a coelom formed by outpocketing of the gut (enterocoely), in deuterostomes. These are tendencies, not rules — blastopore fates are variable among protostomes, and many ecdysozoans lack spiral cleavage — and the two clades are now defined by molecular phylogeny.

## Sponges, ctenophores and cnidarians

**Sponges** (Porifera, about 9,000 species, mostly marine) have no tissues in the strict sense and no nerves or muscles. Water is drawn through pores in the body wall by the beating flagella of **choanocytes**, collar cells strikingly like choanoflagellates, which trap bacteria and particles; it leaves through a larger opening, the osculum. A sponge can pump its own volume of water every few seconds to minutes, and skeletal elements of silica or calcium carbonate (spicules) or collagen (spongin) support it.

::: example A sponge as a filter {#ex-sponge}
Suppose a sponge of volume 1 L pumps 0.2 L of water per second and its choanocytes retain 90 % of the bacteria in the water, which contains $10^6$ bacterial cells per millilitre, each holding about 20 fg of carbon. (These are round numbers of the order measured for tropical reef sponges.) (a) How long does the sponge take to pump its own volume? (b) How many bacteria, and how much carbon, does it capture per day?
::: solution
(a) $1/0.2 = 5$ s.

(b) Water pumped per day: $0.2\times1000$ mL s⁻¹ $\times 86{,}400$ s $= 1.73\times10^7$ mL. Bacteria captured: $1.73\times10^7\times10^6\times0.9 = 1.6\times10^{13}$ cells per day, about $1.6\times10^{13}\times20\times10^{-15}$ g $= 0.31$ g of carbon. A reef with many such sponges filters the overlying water in hours to days and recycles the dissolved and particulate organic matter that would otherwise be lost, one reason coral reefs are productive in nutrient-poor seas (the "sponge loop" proposed by Jasper de Goeij and colleagues, 2013).
:::
:::

**Ctenophores** (comb jellies, about 200 species) swim with eight rows of fused cilia (comb plates), the largest animals that swim by cilia; most capture prey with adhesive cells (colloblasts).

**Cnidarians** (about 11,000–12,000 species: jellyfish, sea anemones, corals, hydroids) have two body forms, the attached **polyp** and the swimming **medusa**, one or both occurring in a life cycle; a gastrovascular cavity with a single opening; a nerve net; and **cnidocytes**, stinging cells containing an organelle, the **cnidocyst** (nematocyst), which discharges a harpoon-like tubule. Discharge of the cnidocyst of *Hydra* takes about 700 nanoseconds, with the stylet accelerating at more than 5 million $g$ (Timm Nüchter and colleagues, 2006) — one of the fastest movements in biology. Reef-building corals house photosynthetic dinoflagellates ([[diversity-of-life/protists]]).

## The problem of size without circulation

Sponges, cnidarians, flatworms and many small animals have no blood vessels: every cell gets its oxygen by diffusion from the surface or from the gut. Diffusion is fast over micrometres and slow over millimetres ([[cell-biology/cells-and-microscopy#prop-diffusion]]), which sets a limit on the thickness of such an animal.

::: proposition The diffusion limit on body size {#prop-diffusion-limit}
Consider tissue consuming oxygen at a uniform rate $M$ (mol m⁻³ s⁻¹), with oxygen diffusing through it with diffusion coefficient $D$ and held at concentration $C_0$ at the surface. At steady state,

1. in a **slab** of thickness $2L$ (both faces exposed), the oxygen concentration at distance $x$ from the mid-plane is $C(x) = C_0 - \dfrac{M}{2D}(L^2 - x^2)$, and the centre stays oxygenated only if
$$
L^2 \le \frac{2DC_0}{M};
$$ {#eq-slab}
2. in a **sphere** of radius $R$, $C(r) = C_0 - \dfrac{M}{6D}(R^2 - r^2)$, and the centre stays oxygenated only if
$$
R^2 \le \frac{6DC_0}{M}.
$$ {#eq-sphere}
:::

::: proof
At steady state, diffusion into each small volume balances consumption: $D\nabla^2C = M$. For the slab, $C$ depends only on $x$: $D\,d^2C/dx^2 = M$, so $C = C_0 + (M/2D)(x^2 - L^2)$, using symmetry ($dC/dx = 0$ at $x = 0$) and $C(\pm L) = C_0$. The minimum is at $x = 0$: $C(0) = C_0 - ML^2/2D$, which is non-negative iff $L^2 \le 2DC_0/M$. For the sphere, with $C$ depending only on $r$, $\nabla^2C = r^{-2}\,d(r^2\,dC/dr)/dr = M/D$. Integrating once, $r^2\,dC/dr = Mr^3/3D$ (the constant is zero for a finite gradient at the centre), so $dC/dr = Mr/3D$ and $C = C_0 - (M/6D)(R^2 - r^2)$. The minimum, $C(0) = C_0 - MR^2/6D$, is non-negative iff $R^2 \le 6DC_0/M$.
:::

::: example How thick can a flatworm be? {#ex-flatworm}
Take $D = 2\times10^{-9}$ m² s⁻¹ for oxygen in tissue (an upper value, close to that in water), surface oxygen $C_0 = 0.28$ mol m⁻³ (air-saturated water at 20 °C), and a modest metabolic rate of 0.1 mL O₂ per gram per hour. (a) Convert the metabolic rate to mol m⁻³ s⁻¹, assuming a tissue density of 1 g cm⁻³. (b) What is the largest radius of a spherical animal, and the largest thickness of a flat one, that can be supplied by diffusion alone? (c) What happens if the metabolic rate is ten times higher?
::: solution
(a) 0.1 mL O₂ is $0.1/22{,}400 = 4.46\times10^{-6}$ mol (at standard temperature and pressure). Per gram per hour, that is $4.46\times10^{-6}\times10^6$ g m⁻³ / 3600 s $= 1.24\times10^{-3}$ mol m⁻³ s⁻¹.

(b) Sphere: $R = \sqrt{6\times2\times10^{-9}\times0.28/1.24\times10^{-3}} = \sqrt{2.71\times10^{-6}} = 1.65$ mm. Slab: $L = \sqrt{2\times2\times10^{-9}\times0.28/1.24\times10^{-3}} = 0.95$ mm, a total thickness of about 1.9 mm.

(c) Both limits shrink by $\sqrt{10}$: a radius of 0.52 mm and a half-thickness of 0.30 mm. This is why animals without circulation are small, flat, thin-walled or sluggish. Free-living flatworms are flat and at most a few millimetres thick (larger species are thin ribbons, and some have a branched gut that brings food close to every cell); jellyfish are mostly non-living mesoglea, with living cells in thin layers; and sponges ensure that water flows past every cell. To be large, thick and active an animal needs a circulatory system or tracheae, and specialised respiratory surfaces ([[animal-physiology/gas-exchange]]).
:::
:::

::: widget plot
f: if(abs(x) <= L, 0.28 - M*(L^2 - x^2)/4, 0.28)
x: -1.5, 1.5
y: -0.3, 0.35
sliders: M=1.24:0.2:10:0.02; L=0.95:0.1:1.5:0.01
hlines: 0
labels: C(x)\ \text{(mol m}^{-3}\text{)}
caption: The steady-state oxygen concentration across a flat sheet of tissue of half-thickness $L$ (slider, in mm), from [[#prop-diffusion-limit]], with $D = 2\times10^{-9}$ m² s⁻¹ and surface concentration 0.28 mol m⁻³. The slider $M$ is the metabolic rate in units of $10^{-3}$ mol m⁻³ s⁻¹; the horizontal axis is position in mm. At the starting values the profile just touches zero at the centre. Thicken the sheet or raise the metabolic rate and the curve dips below zero: the model then says that the central tissue is anoxic (the parabola below zero is not physical).
:::

## Protostomes

### Spiralia

**Flatworms** (Platyhelminthes, about 30,000 species) are bilateral, acoelomate and lack a through-gut and a circulatory system. Free-living planarians, such as *Schmidtea mediterranea*, have pluripotent stem cells (neoblasts) distributed through the body, which allow a fragment as small as about 1/279 of the animal to regenerate a whole worm (Thomas Hunt Morgan, 1898). Most flatworm species are parasites: tapeworms (cestodes), which have lost the gut entirely and absorb food through their surface, and flukes (trematodes), with complex life cycles involving snails as intermediate hosts.

**Molluscs** (Mollusca, roughly 85,000 living species described) share a body plan with a muscular **foot**, a **visceral mass** containing the organs, a **mantle** that secretes the shell and encloses a mantle cavity with gills, and, in most, a rasping tongue-like **radula**. Gastropods (snails and slugs) undergo **torsion** during development, twisting the visceral mass 180° so that the mantle cavity and anus come to lie above the head. Bivalves (clams, mussels, oysters) have lost the head and radula and filter-feed with enlarged gills. Cephalopods (octopuses, squid, cuttlefish, nautiluses) have converted the foot into arms and a funnel for jet propulsion, and include the largest invertebrates (the colossal squid, *Mesonychoteuthis hamiltoni*, may reach 500 kg) and animals with large, centralised brains; an octopus has about 500 million neurons, most of them in its arms. The camera eyes of cephalopods and vertebrates are a famous case of convergence: the cephalopod retina faces the light, with no blind spot.

**Annelids** (segmented worms, roughly 20,000 species: earthworms, leeches and the marine bristle worms, polychaetes) have a body divided into repeated **segments**, each with its own section of coelom, muscles, excretory organs and nerve ganglia — an arrangement that allows independent control of each section's hydrostatic skeleton. Darwin's last book (1881) estimated from the castings that earthworms bring up some 7–18 tons of soil per acre per year at English sites.

### Ecdysozoa

**Nematodes** (roundworms) are among the most abundant animals on Earth: a global analysis estimated about $4.4\times10^{20}$ nematodes in the topsoil alone (Johan van den Hoogen and colleagues, 2019). Some 25,000 species are described, but there may be ten or a hundred times more. *Caenorhabditis elegans*, about 1 mm long with exactly 959 somatic cells in the adult hermaphrodite and an invariant cell lineage (John Sulston and colleagues, 1983), is one of the great model organisms ([[cell-biology/tissues-and-cell-death#ex-elegans]]). Nematodes have a pseudocoelom under pressure, longitudinal muscles only (so they move by thrashing), and a cuticle moulted four times during development.

**Arthropods** (Arthropoda, about 1.25 million described species, four-fifths of all described animals) have a segmented body with **jointed appendages** and an **exoskeleton** of chitin and protein, often hardened with minerals, which is moulted periodically (ecdysis). Segments are grouped into functional regions, **tagmata**, such as head, thorax and abdomen. The living groups are:

- **Chelicerates**: horseshoe crabs, sea spiders and arachnids (spiders, scorpions, mites, ticks; about 110,000 described species), with chelicerae (fangs or pincers) as the first appendages, two tagmata (prosoma and opisthosoma) and no antennae.
- **Myriapods**: centipedes and millipedes, with many similar trunk segments.
- **Pancrustacea**: crustaceans (crabs, shrimps, barnacles, copepods — perhaps the most abundant animals in the oceans) and **hexapods** (insects and their wingless relatives), which evolved from within the crustaceans, so that "Crustacea" without insects is paraphyletic. Insects, with three tagmata, six legs, usually two pairs of wings and about a million described species, are the most diverse group of organisms known. Insect flight evolved once, by at least the Early Carboniferous (winged insects appear around 325 million years ago), and complete metamorphosis (larva, pupa, adult) characterises the most diverse orders (beetles, flies, moths and butterflies, wasps, bees and ants).

Their close relatives, the **velvet worms** (Onychophora) and **water bears** (Tardigrada), share lobe-like legs; tardigrades survive desiccation, freezing and even exposure to space in a dormant state.

### Growth by moulting

An exoskeleton cannot grow, so an arthropod grows in steps: it secretes a new, soft, folded cuticle under the old one, splits and sheds the old one, expands (by swallowing air or water), and hardens the new cuticle. The stages between moults are **instars**. In 1890 Harrison Dyar, measuring the head capsules of caterpillars, found that the width increases by a roughly constant factor at each moult.

::: proposition Dyar's rule (an empirical regularity) {#prop-dyar}
In many insects and crustaceans, the size of a hard body part (such as the width of the head capsule) increases at each moult by a roughly constant ratio $\rho$, typically between 1.2 and 1.7 and often near 1.4, so that in the $i$th instar

$$
w_i \approx w_1\,\rho^{\,i-1}, \qquad \ln w_i \approx \ln w_1 + (i - 1)\ln\rho.
$$ {#eq-dyar}

This is an observation, not a law: ratios vary between species, sexes, environments and stages, and deviations from it are used to detect instars that were missed or extra. A plot of $\ln w$ against instar number is approximately a straight line of slope $\ln\rho$.
:::

::: example Counting instars {#ex-dyar}
Head-capsule widths of caterpillars collected in the field cluster at 0.32, 0.45, 0.62, 0.88 and 1.23 mm. (a) What are the moult-to-moult ratios? Do they follow Dyar's rule? (b) Estimate a single growth ratio. (c) Pupae of this species are known to form from caterpillars with head capsules about 2.4 mm wide. Has an instar been missed?
::: solution
(a) $0.45/0.32 = 1.41$, $0.62/0.45 = 1.38$, $0.88/0.62 = 1.42$, $1.23/0.88 = 1.40$: nearly constant, consistent with Dyar's rule.

(b) The geometric mean ratio over four moults is $(1.23/0.32)^{1/4} = 1.400$.

(c) Continuing with $\rho = 1.4$: $1.23\times1.4 = 1.72$ mm, and $1.72\times1.4 = 2.41$ mm. The final instar (2.4 mm) is two moults beyond the largest sample, so the caterpillars have at least seven instars, and the sampling missed the sixth (about 1.72 mm) — perhaps because it was present for a short time or at a different season.
:::
:::

::: quiz
Which pairs of animals are each other's closer relatives than either is to the third animal listed?
- [x] An earthworm and a snail, relative to an insect
- [ ] An insect and an earthworm (both segmented), relative to a snail
- [x] An insect and a nematode, relative to a flatworm
- [ ] A sea star and a jellyfish (both radial), relative to a human
::: solution
Earthworms (annelids) and snails (molluscs) are both Spiralia, while insects are Ecdysozoa; segmentation in annelids and arthropods evolved independently (or was lost in many relatives). Insects and nematodes are both Ecdysozoa, moulting animals, whereas flatworms are Spiralia. Sea stars are deuterostomes, closer to humans than to jellyfish; their radial symmetry is derived from a bilateral ancestor, as their bilateral larvae show.
:::
:::

## Deuterostome invertebrates: echinoderms

**Echinoderms** (about 7,500 living species: sea stars, brittle stars, sea urchins, sea cucumbers, feather stars) are exclusively marine. Their adults are **pentaradial**, but their larvae are bilateral, and the five-fold symmetry develops at metamorphosis: echinoderms descend from bilateral ancestors. They have an endoskeleton of calcite plates (ossicles), each a single crystal, and a unique **water vascular system** of fluid-filled canals that operates hundreds of hydraulic **tube feet** for locomotion, feeding and gas exchange. Many have remarkable powers of regeneration. Sea urchin eggs and embryos were used to discover the events of fertilisation (Oscar Hertwig, 1876), the cyclins of the cell cycle (Tim Hunt and colleagues, 1983) and gene-regulatory networks of development. Their relatives the **hemichordates** (acorn worms) share pharyngeal gill slits with chordates.

## The Cambrian explosion

Almost all animal phyla with mineralised skeletons appear in the fossil record within the first 20–25 million years of the Cambrian, which began 538.8 million years ago — the **Cambrian explosion**. Its record and dating are discussed in [[evolution/macroevolution]]; the points that matter for body plans are these.

1. **The record before it.** The Ediacaran biota (about 575–539 Ma) includes animals (*Dickinsonia*, the mollusc-like *Kimberella* with its radula-like scratch marks) and forms of uncertain affinity, and trace fossils of bilaterian burrowing appear in the late Ediacaran. Molecular clocks put the origin of animals and the main bilaterian splits tens to hundreds of millions of years before the Cambrian. The explosion is partly a revolution in preservation and ecology — the evolution of skeletons, eyes, predation and burrowing — on top of a longer, cryptic history.
2. **Exceptional deposits.** The Chengjiang biota of Yunnan (about 518 Ma) and the Burgess Shale of British Columbia (about 508 Ma) preserve soft-bodied animals: early arthropods, the predator *Anomalocaris*, lobopodians related to velvet worms, early chordates. Many once thought to belong to extinct phyla have since been placed in the **stem groups** of living phyla ([[diversity-of-life/classifying-life#def-rank-clade]]) — *Hallucigenia* is a stem velvet worm, *Opabinia* a stem arthropod.
3. **Causes.** Proposed triggers include a rise in oxygen at the end of the Neoproterozoic, changes in ocean chemistry favouring skeletons, the evolution of the developmental toolkit (*Hox* genes and their regulatory networks, [[evolution/macroevolution]]) and the ecological feedbacks of predation, vision and burrowing. No single cause is accepted; most researchers see a combination of environmental permission and ecological escalation.

::: application Invertebrates and people
Invertebrates provide services worth enormous sums: insects pollinate most flowering plants, including about three-quarters of the leading food crops at least in part (Alexandra-Maria Klein and colleagues, 2007); earthworms and other soil animals maintain soil structure; corals build reefs that support perhaps a quarter of marine fish species and protect coastlines; bivalves filter coastal waters. They also include pests of crops and stored food and vectors of disease (mosquitoes, ticks, tsetse flies, sandflies), and parasites; for medical aspects see [Medicine Atlas](/learn/medicine/course.php?c=infectious-diseases). Long-term monitoring in some regions has found steep declines of insect biomass — 76 % over 27 years in German nature reserves (Caspar Hallmann and colleagues, 2017) — although trends vary between places, groups and methods ([[conservation-biology]]). Model invertebrates — *Drosophila melanogaster*, *C. elegans*, sea urchins, *Hydra*, planarians, squid giant axons — have supplied much of what we know about genes, development and neurons.
:::

::: history
Linnaeus (1758) put all invertebrates except insects into a class "Vermes"; Jean-Baptiste Lamarck (1801) coined "invertebrates" and began their modern classification, and Georges Cuvier (1812) divided animals into four *embranchements* by body plan (vertebrates, molluscs, articulates, radiates). Ernst Haeckel's gastraea theory (1874) proposed that animals descend from a two-layered, gut-bearing ancestor, and Karl Grobben (1908) divided the bilaterians into protostomes and deuterostomes. Libbie Hyman's *The Invertebrates* (6 volumes, 1940–1967) organised the field around grades of body cavity. Ribosomal RNA phylogenies overturned that framework: Lophotrochozoa (Halanych and colleagues, 1995) and Ecdysozoa (Aguinaldo and colleagues, 1997). Charles Walcott found the Burgess Shale in 1909, and the Chengjiang biota was found by Hou Xianguang in 1984. Chromosome-scale genomes brought the synteny evidence for ctenophores as the sister of all other animals (Schultz and colleagues, 2023).
:::

::: summary
- Animals (Metazoa) are opisthokonts with collagen, epithelia and diploid life cycles; choanoflagellates are their closest relatives. Crown animals probably originated 650–850 Ma; *Dickinsonia* (about 560 Ma) is a confirmed animal.
- About 1.55 million animal species are described, 97 % invertebrates and 80 % arthropods. "Invertebrates" are a paraphyletic grade.
- Body plans are described by symmetry (radial, bilateral), germ layers (diploblastic, triploblastic) and body cavities (acoelomate, pseudocoelomate, coelomate); body cavities are poor guides to relationships.
- The tree: ctenophores (leading hypothesis, from synteny, 2023) or sponges first; then placozoans, cnidarians and Bilateria (Xenacoelomorpha + Nephrozoa); protostomes are Ecdysozoa (arthropods, nematodes …) and Spiralia (molluscs, annelids, flatworms …); deuterostomes are Ambulacraria (echinoderms, hemichordates) and chordates.
- Without circulation, oxygen reaches the centre of a slab only if $L^2 \le 2DC_0/M$, or of a sphere if $R^2 \le 6DC_0/M$ — about 1–2 mm at modest metabolic rates — which explains why such animals are small, flat or watery.
- Arthropods grow by moulting; Dyar's rule (an empirical regularity) says hard parts grow by a near-constant ratio, often about 1.4, per moult.
- Echinoderms are pentaradial deuterostomes with bilateral larvae and a water vascular system. The Cambrian explosion (from 538.8 Ma) records the appearance of skeletonised phyla after a longer cryptic history.
:::

## Exercises

::: exercise A thin sheet {level=1 check="0.669"}
With $D = 2\times10^{-9}$ m² s⁻¹, $C_0 = 0.28$ mol m⁻³ and $M = 2.5\times10^{-3}$ mol m⁻³ s⁻¹, what is the maximum half-thickness of a flat animal supplied by diffusion from both faces, in mm to three decimal places?
::: solution
$L = \sqrt{2DC_0/M} = \sqrt{2\times2\times10^{-9}\times0.28/2.5\times10^{-3}} = \sqrt{4.48\times10^{-7}} = 6.69\times10^{-4}$ m $= 0.669$ mm.
:::
:::

::: exercise Dyar's rule forward {level=1 check="1.15"}
A beetle larva has a first-instar head capsule 0.30 mm wide and a Dyar ratio of 1.4. What is the predicted width in the fifth instar, in mm to two decimal places?
::: solution
$0.30\times1.4^4 = 0.30\times3.8416 = 1.15$ mm.
:::
:::

::: exercise Body plan vocabulary {level=1}
Describe the symmetry, number of germ layers and type of body cavity of: (a) a sea anemone; (b) a planarian; (c) *C. elegans*; (d) an earthworm; (e) an adult sea urchin.
::: solution
(a) Radial; diploblastic; no body cavity apart from the gastrovascular cavity. (b) Bilateral; triploblastic; acoelomate. (c) Bilateral; triploblastic; pseudocoelomate. (d) Bilateral; triploblastic; coelomate, with a segmented coelom. (e) Pentaradial as an adult (bilateral larva); triploblastic; coelomate (the water vascular system is part of the coelom).
:::
:::

::: exercise Counting moults {level=2 check="7"}
A crustacean's carapace is 0.2 mm long in the first instar and 2.1 mm in the last, with a Dyar ratio of 1.48. How many instars does it have?
::: solution
The number of moults $m$ satisfies $1.48^m = 2.1/0.2 = 10.5$, so $m = \ln 10.5/\ln 1.48 = 2.351/0.392 = 6.0$. Six moults means seven instars.
:::
:::

::: exercise Arthropod share {level=2 check="80.6"}
If 1.25 million of 1.55 million described animal species are arthropods, what percentage is that, to one decimal place? Give two reasons why this figure may overstate or understate their true share.
::: solution
$1.25/1.55 = 80.6\,\%$. Overstate: some other groups (nematodes, mites are arthropods but also undersampled; flatworms, marine invertebrates) are even less well described, so their true shares may be larger relative to their described numbers. Understate: estimates of undescribed insects run to several million (about 5.5 million insect species estimated by Nigel Stork, 2018), more than any other group in absolute terms. Taxonomic effort is unevenly distributed: conspicuous insects such as butterflies and beetles attract collectors.
:::
:::

::: exercise A larger sphere {level=2}
Using [[#eq-sphere]], by what factor must the metabolic rate per unit volume fall for a spherical animal to double its radius while still being supplied by diffusion? What evolutionary solutions avoid this constraint?
::: solution
$R^2 \propto 1/M$, so doubling $R$ requires $M$ to fall fourfold. Solutions: circulatory systems with pigments such as haemoglobin or haemocyanin; tracheal systems that pipe air to the tissues (insects); flattening or elongating the body (flatworms, ribbon-like forms); filling the volume with metabolically inert material (jellyfish mesoglea, sponge skeleton); and moving water past all cells (sponges' canal systems, cnidarians' gastrovascular cavity).
:::
:::

::: exercise Convergent eyes {level=2}
Octopuses and humans both have camera eyes with a lens, iris and retina. (a) What is the evidence that these eyes evolved independently? (b) How does the "deep homology" of the gene *Pax6* complicate the answer? (c) Explain the difference in the orientation of the retina and its consequence.
::: solution
(a) Cephalopods and vertebrates are protostome and deuterostome respectively; their common ancestor was a small bilaterian, and most intermediate lineages (other molluscs, many vertebrate relatives) lack camera eyes; the eyes develop differently (the cephalopod eye from an infolding of the surface epidermis, the vertebrate retina from an outgrowth of the brain) and their lenses are made of different crystallin proteins.
(b) *Pax6* and related regulatory genes control eye development in both, as in flies ([[evolution/macroevolution]]); so the genetic toolkit for specifying light-sensitive organs is homologous and ancient, even though the camera eyes themselves are convergent.
(c) In vertebrates the photoreceptors face away from the light, behind the neurons and blood vessels, which leave the eye through a gap in the retina (the blind spot). In cephalopods the photoreceptors face the light and nerves leave from behind, so there is no blind spot. The vertebrate arrangement is a historical consequence of how the eye develops from the brain, not a design optimum.
:::
:::

::: exercise Slab or sphere? {level=3}
(a) Show from [[#prop-diffusion-limit]] that, for the same tissue, the maximum radius of a sphere is $\sqrt3$ times the maximum half-thickness of a slab. (b) Explain physically why the sphere does better. (c) A long cylinder (a worm) of radius $a$ satisfies $a^2 \le 4DC_0/M$. Rank the three shapes by their maximum *volume per unit surface area* and discuss which is the most economical shape for a diffusion-limited animal.
::: solution
(a) $R_{\max}^2/L_{\max}^2 = (6DC_0/M)/(2DC_0/M) = 3$, so $R_{\max} = \sqrt3\,L_{\max}$.
(b) The sphere is supplied from all directions: its centre is surrounded by surface in three dimensions, the slab's mid-plane only from two faces. Equivalently, the volume that must be supplied per unit of surface is smaller near the centre of a sphere ($V/S = R/3$) than of a slab ($V/S = L$).
(c) At the limits, $V/S$ = $L_{\max}$ for the slab, $a_{\max}/2 = \sqrt{4DC_0/M}/2 = \sqrt{DC_0/M}$ for the cylinder, and $R_{\max}/3 = \sqrt{6DC_0/M}/3 = 0.816\sqrt{DC_0/M}$ for the sphere, against $\sqrt{2DC_0/M} = 1.414\sqrt{DC_0/M}$ for the slab. So, per unit area of surface, a slab can hold the most tissue (1.41), then a cylinder (1.00), then a sphere (0.82); but the slab achieves this only by being unbounded in two directions. A flat sheet is the most economical shape for a large diffusion-limited body, which is why the largest animals without circulation — flatworms, some jellyfish tissue layers, placozoans — are thin sheets.
:::
:::

::: exercise Which animal came first? {level=3}
(a) Under the "ctenophores first" hypothesis, what are the two possible histories of the nervous system and of muscles? (b) What evidence could decide between them? (c) Why is synteny — the conservation of which genes lie together on chromosomes — less prone than sequence evolution to the artefacts that plagued earlier analyses?
::: solution
(a) Either nerves and muscles evolved once in the common ancestor of all animals and were lost in sponges (and placozoans), or they evolved independently in ctenophores and in the ancestor of cnidarians and bilaterians.
(b) Molecular details of the systems: ctenophore neurons use a distinctive set of neuropeptides and lack many neurotransmitter pathways and synaptic genes found in other animals; their nerve net, studied by electron microscopy, is a syncytium (Pawel Burkhardt and colleagues, 2023). Such differences favour independent origin, while shared homologous components (ion channels, synaptic scaffold proteins, many of which also exist in sponges and choanoflagellates) are expected in either case and are not decisive. Homology of the cell types themselves, assessed by single-cell transcriptomes, is a key test.
(c) Synteny changes by rare, large events — chromosome fusions followed by mixing of the genes — which are effectively irreversible and unlikely to arise twice the same way. Sequence characters change frequently and can converge by chance, so fast-evolving lineages such as ctenophores attract or repel other long branches (long-branch attraction, [[evolution/phylogenetics]]), and the result depends on the substitution model. A shared derived fusion-with-mixing is a rare genomic change of the kind Hennig's method values most.
:::
:::
