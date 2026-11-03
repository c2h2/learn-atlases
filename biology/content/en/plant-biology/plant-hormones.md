A plant has no nervous system and no blood, yet its parts act in concert. A shoot tip suppresses the buds below it; a leaf that senses the shortening days tells the shoot apex to flower; a root that runs short of water makes the leaves close their stomata within minutes; a ripening apple makes its neighbours ripen too. The messages that coordinate these responses are carried by a handful of small molecules, the **plant hormones** (phytohormones), active at nanomolar concentrations or below, made in many tissues, moved by diffusion, by dedicated transporters and in the xylem and phloem, and perceived by receptors that switch on networks of gene expression.

This chapter introduces the five "classical" hormones — **auxin**, **cytokinins**, **gibberellins**, **abscisic acid** and **ethylene** — in the order in which they were discovered, and more briefly the brassinosteroids, jasmonates, salicylic acid and strigolactones. For each we ask how it is made, how it moves, how it is perceived and what it does. A surprising unity emerges at the level of mechanism: several hormone receptors work not by activating a pathway but by triggering the destruction of a repressor. The quantitative threads are the chemistry of auxin transport, which follows from the pH difference across the plasma membrane, and the dose–response relationships by which hormone concentrations are translated into effects. Receptor and second-messenger logic in general is treated in [[cell-biology/cell-signalling]]; the growth processes that hormones regulate were described in [[plant-biology/plant-form]].

::: definition Plant hormone {#def-hormone}
A **plant hormone** is an endogenous, small signalling molecule that, at very low concentrations (typically 10⁻¹¹–10⁻⁶ mol L⁻¹), regulates growth, development or responses to the environment by binding specific receptors. Unlike animal hormones, plant hormones are generally not made in dedicated glands; many cells can make them, and they may act in the cells that make them, in neighbouring cells, or at a distance after transport.
:::

::: warning One hormone, one effect
It is tempting to give each hormone a single job — "auxin makes cells grow", "ethylene ripens fruit", "ABA closes stomata". In reality each hormone affects almost every aspect of development, often in opposite directions in different tissues or at different concentrations (auxin promotes elongation of stems but inhibits elongation of roots at the same concentration), and most responses are controlled by several hormones acting together. Hormone effects depend on the competence of the responding cells — which receptors, transcription factors and partner pathways they express — as much as on the hormone itself. Think of hormones as signals interpreted by context, not as switches with fixed outcomes.
:::

## Auxin

### Discovery

The first plant hormone was discovered by following a bending seedling. In *The Power of Movement in Plants* (1880), Charles Darwin and his son Francis reported that coleoptiles of canary grass (*Phalaris canariensis*) bend towards a lateral light only if their tip is exposed; covering the tip with a cap prevented bending, though the bending itself occurs well below the tip. They concluded that "some influence is transmitted from the upper to the lower part". Peter Boysen-Jensen (1913) showed that the influence passes through a block of gelatin but not through a sheet of mica, and Árpád Paál (1919) that a tip replaced off-centre on a decapitated coleoptile causes bending in the dark, away from the side where it sits. Frits Went (1926–1928) collected the substance by standing oat (*Avena*) coleoptile tips on agar blocks, and showed that a block placed off-centre on a decapitated coleoptile causes curvature in proportion to the amount of substance — the *Avena* curvature test, the first quantitative bioassay of a plant hormone. Fritz Kögl, Arie Haagen-Smit and Hanni Erxleben identified a substance with the same activity as **indole-3-acetic acid** (IAA) in 1934, initially from urine and fungi; IAA was later confirmed as the main natural auxin of plants.

### Synthesis and transport

IAA is made from tryptophan mainly by a two-step pathway, in which TAA1 converts tryptophan to indole-3-pyruvate and YUCCA flavin monooxygenases convert this to IAA. It is synthesised mostly in young, growing tissues — shoot apices, young leaves, developing seeds — and also in root tips. From there it moves in two ways: rapidly and non-directionally in the phloem, and slowly and directionally from cell to cell by **polar auxin transport**, at rates of about 5–20 mm h⁻¹, much faster than diffusion and in a fixed direction — from shoot apex towards the base (basipetally) in stems, and towards the tip in the central cylinder of roots.

The mechanism of polar transport follows from the chemistry of a weak acid. IAA has a carboxyl group with p$K_\mathrm{a}$ about 4.8. In the acidic apoplast (pH about 5.5) a substantial fraction is uncharged, IAAH, which crosses membranes readily by diffusion (and is also taken up by AUX1/LAX symporters together with protons). In the cytosol (pH about 7) almost all of it is the anion IAA⁻, which cannot cross the membrane by diffusion and is trapped — unless specific efflux carriers let it out.

::: proposition Weak-acid trapping {#prop-trapping}
A weak acid HA with acid dissociation constant $K_\mathrm{a}$ distributes across a membrane separating compartments at pH$_o$ (outside) and pH$_i$ (inside). If only the uncharged form HA permeates and the system reaches equilibrium, the ratio of the total concentrations inside and outside is

$$
\frac{[\mathrm{HA}]_i + [\mathrm{A^-}]_i}{[\mathrm{HA}]_o + [\mathrm{A^-}]_o} = \frac{1 + 10^{\,\mathrm{pH}_i - \mathrm{p}K_\mathrm{a}}}{1 + 10^{\,\mathrm{pH}_o - \mathrm{p}K_\mathrm{a}}}.
$$ {#eq-trapping}
:::

::: proof
At equilibrium the uncharged form, which crosses the membrane, has the same concentration on both sides: $[\mathrm{HA}]_i = [\mathrm{HA}]_o$. On each side the Henderson–Hasselbalch equation gives $[\mathrm{A^-}] = [\mathrm{HA}]\,10^{\mathrm{pH} - \mathrm{p}K_\mathrm{a}}$ ([[biochemistry/water-and-bonds]]). So the total on each side is $[\mathrm{HA}](1 + 10^{\mathrm{pH}-\mathrm{p}K_\mathrm{a}})$, and the common factor $[\mathrm{HA}]$ cancels in the ratio.
:::

::: example How strongly does a cell trap auxin? {#ex-trapping}
Take p$K_\mathrm{a} = 4.8$ for IAA, an apoplast at pH 5.5 and a cytosol at pH 7.0. (a) What fraction of apoplastic IAA is uncharged? (b) What accumulation ratio would a cell reach if only IAAH could cross the membrane? (c) Repeat (b) for an apoplast acidified to pH 5.0.
::: solution
(a) Fraction uncharged $= 1/(1 + 10^{5.5 - 4.8}) = 1/(1 + 5.01) = 0.17$.

(b) By [[#eq-trapping]], $(1 + 10^{2.2})/(1 + 10^{0.7}) = 159.5/6.01 = 26.5$. The cell accumulates IAA about 27-fold, with no pump acting on IAA itself — the proton gradient, maintained by the plasma-membrane H⁺-ATPase, does the work.

(c) $159.5/(1 + 10^{0.2}) = 159.5/2.58 = 62$. Acidifying the wall more than doubles the accumulation; and since auxin itself promotes wall acidification, there is a positive feedback in auxin uptake.
:::
:::

::: widget plot
f: (1 + 10^(c - k))/(1 + 10^(x - k))
x: 4, 7.5
y: 0, 200
sliders: k=4.8:3.5:6:0.05; c=7:6.5:7.8:0.05
points: 5.5, 26.5; 5, 61.7
labels: \text{accumulation ratio (in/out)}
caption: Weak-acid trapping, [[#eq-trapping]]: equilibrium ratio of total auxin inside to outside a cell (vertical) against the pH of the apoplast (horizontal), for an acid with p$K_\mathrm{a} = k$ and a cytosol at pH $c$. The marked points are [[#ex-trapping]]. The ratio rises roughly ten-fold for each unit of acidification of the apoplast, until the apoplast pH falls near the p$K_\mathrm{a}$; when the two compartments have the same pH the ratio is 1. Raise $k$ to mimic a weaker acid: the curve shifts right, and trapping persists to higher apoplast pH.
:::

Trapping explains how auxin gets into cells. Its *direction* comes from how it gets out. Because IAA⁻ cannot leave by diffusion, it leaves through efflux carriers, chiefly the **PIN-FORMED** (PIN) proteins, which are located on one face of the cell — at the lower (basal) end of cells in the stem's vascular tissue, for example. Auxin then enters each cell all over its surface but leaves only at one end, and moves in that direction through a file of cells. This **chemiosmotic model** of polar auxin transport was proposed by Philip Rubery and Alan Sheldrake and by John Raven in 1974–1975, before any of the carriers were known; the PIN proteins were identified in the late 1990s in *Arabidopsis*, named after the pin-like, flowerless inflorescences of the *pin1* mutant, which cannot make flowers because it cannot make the auxin maxima that position them. ABCB transporters also export auxin, without polar localisation.

::: example Polar transport against diffusion {#ex-transport}
(a) How long does auxin take to travel 30 cm down a stem by polar transport at 10 mm h⁻¹? (b) How far would it typically spread in the same time by diffusion alone, with a diffusion coefficient of $5\times10^{-10}$ m² s⁻¹?
::: solution
(a) $300\ \text{mm}/10\ \text{mm h}^{-1} = 30$ h.

(b) In 30 h $= 108{,}000$ s, the root-mean-square distance of one-dimensional diffusion is $\sqrt{2Dt} = \sqrt{2\times5\times10^{-10}\times108{,}000} = 1.0\times10^{-2}$ m, about 1 cm — thirty times less than polar transport, and without direction. Over the distances of a meristem (100 µm, covered by diffusion in seconds) diffusion is fine; over the length of a stem a directed, active process is needed.
:::
:::

PIN proteins can be moved from one face of the cell to another within minutes by cycles of endocytosis and recycling, and their polarity is set by phosphorylation (the kinase PINOID and the phosphatase PP2A act antagonistically). This plasticity lets plants redirect auxin flow: in gravitropism and phototropism ([[plant-biology/plant-responses]]), PIN proteins relocalise to one side of the organ, auxin accumulates on that side, and differential growth bends the organ. Auxin also feeds back on its own transport: cells that conduct auxin up-regulate and polarise PINs, so that flow becomes concentrated into narrow channels — a mechanism (canalisation, proposed by Tsvi Sachs in the 1960s and 1970s) that is thought to pattern the veins of leaves and the reconnection of vascular tissue after wounding.

### Perception and response

How do cells sense auxin? The main receptor was discovered in 2005 by Nihal Dharmasiri, Mark Estelle and colleagues and by Stefan Kepinski and Ottoline Leyser: it is **TIR1** (TRANSPORT INHIBITOR RESPONSE 1) and its relatives the AFB proteins, F-box subunits of a ubiquitin ligase complex called SCF^TIR1^. The crystal structure (Xu Tan, Ning Zheng and colleagues, 2007) showed auxin sitting in a pocket of TIR1 and acting as a "molecular glue" that increases its affinity for a second protein.

::: definition The auxin signalling module {#def-auxin-signalling}
In the absence of auxin, **Aux/IAA** proteins bind to **AUXIN RESPONSE FACTOR** (ARF) transcription factors on the promoters of auxin-responsive genes and repress them, with the help of the co-repressor TOPLESS. Auxin binds to **TIR1/AFB** and stabilises its binding to Aux/IAA proteins; the SCF^TIR1^ complex then ubiquitinates the Aux/IAA, which is destroyed by the proteasome. Released ARFs activate (or, for some ARFs, repress) transcription. TIR1/AFB and the Aux/IAA protein together form the **co-receptor**: auxin binds the pair.
:::

*Arabidopsis* has 6 TIR1/AFB proteins, 29 Aux/IAAs and 23 ARFs, and different combinations, with different affinities for auxin, are expressed in different tissues — part of the reason auxin has so many different effects. Some auxin responses are too fast for gene expression: in roots, auxin inhibits growth within seconds, and in shoots it activates plasma-membrane H⁺-ATPases within minutes. These rapid responses involve non-transcriptional branches of TIR1/AFB signalling and cell-surface TRANSMEMBRANE KINASE (TMK) proteins, an active area of research.

### What auxin does

The **acid-growth hypothesis** (proposed by Achim Hager and colleagues and by Robert Cleland and David Rayle around 1970–1971) explains how auxin promotes cell elongation in shoots: auxin activates plasma-membrane H⁺-ATPases (in part through SAUR proteins that inhibit a phosphatase that would otherwise deactivate the pump), acidifying the wall, activating expansins and loosening it, so that turgor extends the wall faster — in Lockhart's terms, auxin increases extensibility $\phi$ ([[plant-biology/plant-form#prop-lockhart]]). Beyond elongation, auxin:

- positions leaves and flowers at the shoot apex, through auxin maxima generated by PIN-mediated transport;
- maintains apical dominance, with auxin from the apex inhibiting the outgrowth of axillary buds indirectly, through cytokinin and strigolactone;
- patterns the vascular system and the embryo's axis;
- initiates lateral and adventitious roots — the reason synthetic auxins are sold as rooting powders;
- mediates tropisms ([[plant-biology/plant-responses]]) and the growth of fruits.

## Cytokinins

In 1955 Carlos Miller, Folke Skoog and colleagues isolated from autoclaved herring sperm DNA a substance that made tobacco pith cells divide in culture, and named it **kinetin** (6-furfurylaminopurine) — a breakdown product of DNA, not a natural hormone. The first natural cytokinin, **zeatin**, was isolated from immature maize kernels by David Letham in 1963. Cytokinins are adenine derivatives with a side chain on the N⁶ nitrogen; they are made by isopentenyltransferases (an enzyme that the crown-gall bacterium *Agrobacterium tumefaciens* also carries on its tumour-inducing plasmid, making its host tissue proliferate).

Skoog and Miller (1957) made the discovery that founded plant tissue culture: the *ratio* of auxin to cytokinin determines what a mass of undifferentiated tobacco callus does. A high auxin/cytokinin ratio makes it form roots; a low ratio, shoots; intermediate ratios, continued proliferation of callus. With the right sequence of hormone treatments, whole plants can be regenerated from single cells — the basis of plant micropropagation and of producing transgenic plants.

Cytokinins are perceived by **histidine kinase receptors** (AHK2, AHK3 and CRE1/AHK4 in *Arabidopsis*) in the ER and plasma membrane, which relay a phosphate through histidine phosphotransfer proteins to nuclear **response regulators** — a **two-component system** inherited from the bacterial ancestors of plastids or from bacterial signalling generally. Type-B response regulators are transcription factors that activate cytokinin-responsive genes, including the type-A response regulators, which inhibit the pathway in a negative feedback loop. Cytokinins promote cell division in the shoot meristem (including activating *WUSCHEL*; [[plant-biology/plant-form#def-wus-clv]]), promote the outgrowth of axillary buds, delay leaf senescence, and in roots oppose auxin, limiting the size of the root meristem. They also help to regulate nodule formation in legumes.

## Gibberellins

Japanese rice farmers knew a disease, *bakanae* ("foolish seedling"), in which infected plants grew abnormally tall and spindly and failed to set seed. Eiichi Kurosawa showed in 1926 that a sterile filtrate of the fungus responsible, now called *Fusarium fujikuroi* (then *Gibberella fujikuroi*), reproduced the symptoms; Teijiro Yabuta and Yusuke Sumiki isolated the active compound in the 1930s and called it gibberellin. In the 1950s it became clear that plants make gibberellins themselves. Gibberellins (GAs) are diterpenoids; over 130 have been identified, of which only a few, such as GA₁ and GA₄, are biologically active, the rest being precursors and inactivated forms.

GA promotes stem elongation, seed germination, the transition to flowering in some plants, and the development of flowers and fruits. Its signalling module illustrates the "destroy the repressor" theme again.

::: definition The gibberellin–DELLA module {#def-della}
**DELLA** proteins (named after a conserved amino acid motif, Asp-Glu-Leu-Leu-Ala) are nuclear growth repressors that bind and inhibit transcription factors, including PHYTOCHROME-INTERACTING FACTORS. Gibberellin binds the soluble receptor **GID1** (GIBBERELLIN INSENSITIVE DWARF1; Miyako Ueguchi-Tanaka, Makoto Matsuoka and colleagues, 2005), which then binds DELLA proteins; the GA–GID1–DELLA complex is recognised by an SCF ubiquitin ligase (with the F-box protein SLY1 in *Arabidopsis*, GID2 in rice) and the DELLA is degraded. Growth is released.
:::

The logic explains the genetics. Mutants that cannot make GA (such as *ga1* of *Arabidopsis*) are dwarfs that can be rescued by spraying GA. Mutants with altered DELLA proteins that cannot bind GID1 are also dwarfs, but GA cannot rescue them, and they are genetically dominant, because the stable, mutant DELLA represses growth even in the presence of normal DELLA. Such a dominant gain-of-function mutation, *gai* ("GA-insensitive"), was characterised in *Arabidopsis* by Nicholas Harberd and colleagues; and when Jinrong Peng, Harberd and colleagues (1999) cloned the *Reduced height* (*Rht*) genes of wheat, they found that they encode DELLA proteins with the same kind of mutation.

::: application The Green Revolution
In the 1960s, new varieties of wheat and rice transformed food production in Asia and Latin America. Their key trait was short, stiff straw. Traditional tall varieties, given nitrogen fertiliser, grew taller and fell over (lodged), losing grain; the new semi-dwarfs could be fertilised heavily and put the extra growth into grain. Norman Borlaug, who bred semi-dwarf wheats in Mexico, received the Nobel Peace Prize in 1970. Both dwarfing traits turned out to be gibberellin mutations: the wheat *Rht-B1b* and *Rht-D1b* alleles encode GA-insensitive DELLA proteins (Peng and colleagues, 1999), and the rice *semi-dwarf1* (*sd1*) allele is a loss-of-function mutation in a gene for a GA biosynthetic enzyme, GA 20-oxidase (several groups, 2002). Gibberellins are also used directly: sprayed on seedless grapes, they lengthen the bunch stalks and enlarge the berries; in brewing, they speed the germination of barley for malting.
:::

In germinating cereal grains, GA from the embryo diffuses to the **aleurone layer**, a living tissue around the starchy endosperm, and induces it to secrete α-amylase and other hydrolases that digest the endosperm's starch and protein for the seedling — a classic system for studying hormone action ([[plant-biology/plant-reproduction]]).

## Abscisic acid

Abscisic acid (ABA) was discovered twice in the early 1960s: by Frederick Addicott's group as "abscisin II", promoting the abscission of cotton fruits, and by Philip Wareing's group as "dormin", inducing dormancy in sycamore buds; the two proved identical in 1965. Its name reflects a role in abscission that turned out to be minor. ABA is a sesquiterpenoid made by cleavage of a carotenoid in plastids; the rate-limiting step, catalysed by 9-*cis*-epoxycarotenoid dioxygenase (NCED), is strongly induced by water deficit, so that ABA levels in leaves can rise many-fold within an hour of drought.

ABA is the hormone of stress and dormancy. It closes stomata, induces genes for proteins and solutes that protect cells against dehydration, maintains seed dormancy and prevents germination during seed maturation (mutants deficient in ABA, or insensitive to it, show **vivipary**: seeds germinating on the ear or in the fruit).

Its receptors were found only in 2009, by Sang-Youl Park, Sean Cutler and colleagues and by Yue Ma, Erwin Grill and colleagues: the soluble **PYR/PYL/RCAR** proteins. Once again the pathway works by removing an inhibitor. In the absence of ABA, **clade A protein phosphatases type 2C** (PP2Cs, such as ABI1) keep a family of protein kinases, the **SnRK2s**, dephosphorylated and inactive. ABA bound to PYR/PYL creates a surface that binds and inhibits the PP2C; the SnRK2s autophosphorylate and become active; and they phosphorylate ion channels, transcription factors and enzymes. In guard cells, the SnRK2 OPEN STOMATA 1 (OST1) phosphorylates and opens the anion channel SLAC1; anion efflux depolarises the membrane, K⁺ leaves through outward channels, water follows, and the stomata close ([[plant-biology/water-transport]]). The PP2C *abi1-1* mutation, which prevents binding to the receptor, gives a dominant ABA-insensitive plant whose stomata do not close and which wilts easily.

## Ethylene

Ethylene, C₂H₄, is a gas. In 1901 Dimitry Neljubov, a student in St Petersburg, found that pea seedlings grown in the laboratory, where coal-gas lamps leaked, grew short and thick and bent sideways, and identified ethylene as the active component of illuminating gas. Seedlings germinated in the dark in ethylene show the **triple response**: a short, thick hypocotyl, an exaggerated apical hook, and (in *Arabidopsis*) a short root. Richard Gane (1934) showed that ripening fruit produce ethylene themselves. It is made from methionine via S-adenosylmethionine and **1-aminocyclopropane-1-carboxylic acid** (ACC) by ACC synthase and ACC oxidase (the pathway worked out by Douglas Adams and Shang Fa Yang, 1979). ACC synthase is the main control point, induced by wounding, flooding, auxin and ripening.

The ethylene receptors are another surprise. In *Arabidopsis* there are five (ETR1, ETR2, ERS1, ERS2, EIN4), related to bacterial histidine kinases, sitting in the membrane of the endoplasmic reticulum and binding ethylene with a copper cofactor. ETR1 was the first plant hormone receptor to be identified (Caren Chang, Elliot Meyerowitz and colleagues, 1993). The receptors are **negative regulators**: without ethylene, they activate the kinase CTR1, which phosphorylates and inhibits the protein EIN2. Ethylene switches the receptors off; CTR1 becomes inactive; EIN2's C-terminal part is cleaved and moves to the nucleus, where it stabilises the transcription factors EIN3 and EIL1, which are otherwise continuously degraded. The genetics fits this logic exactly: loss of *CTR1* gives a constitutive triple response, loss of *EIN2* complete insensitivity, and loss of several receptors at once a constitutive response — because it is the receptors' activity that keeps the pathway off.

::: quiz
In *Arabidopsis*, which mutant would show the triple response when grown in the dark **without** ethylene?
- [ ] An *ein2* loss-of-function mutant
- [ ] A dominant *etr1-1* mutant whose receptor cannot bind ethylene
- [x] A *ctr1* loss-of-function mutant
- [ ] A mutant lacking ACC oxidase
::: solution
CTR1 is a negative regulator, kept active by unoccupied receptors; without it, EIN2 is not inhibited and the pathway is on regardless of ethylene: a constitutive triple response. *ein2* and *etr1-1* plants are insensitive (*etr1-1* is dominant because its receptor stays in the signalling "off-switch" state even when ethylene is present). A plant that cannot make ethylene responds normally to applied ethylene but shows no response in its absence.
:::
:::

Ethylene coordinates **fruit ripening** in **climacteric** fruits (tomato, banana, apple, avocado), which show a burst of respiration and of autocatalytic ethylene synthesis at the onset of ripening; non-climacteric fruits (grape, citrus, strawberry) ripen without it. It promotes the abscission of leaves, flowers and fruits, senescence, the formation of air channels (aerenchyma) in flooded roots, and the elongation of submerged rice internodes. One rotten apple does spoil the barrel: it emits ethylene, which triggers ripening and ethylene production in its neighbours. Fruit stores control ripening by low oxygen, low temperature and ethylene scrubbing; the gas 1-methylcyclopropene, which binds the receptors irreversibly and blocks them, is used to keep apples firm for months.

::: example Ethylene in a fruit store {#ex-ethylene}
A sealed cold store of 1,000 m³ holds 10 tonnes of apples that have begun to ripen, each kilogram producing ethylene at 50 µL h⁻¹. Ripening responses of many fruits are triggered by ethylene concentrations of about 0.1 µL L⁻¹ (0.1 parts per million by volume). (a) How fast does the ethylene concentration in the store's air rise, ignoring leakage and the volume occupied by the fruit? (b) How long until the threshold is reached in a store that starts with no ethylene?
::: solution
(a) Production: $10{,}000\ \text{kg}\times50\ \text{µL kg}^{-1}\,\text{h}^{-1} = 5.0\times10^{5}$ µL h⁻¹ $= 0.50$ L h⁻¹. The store holds $10^{6}$ L of air, so the concentration rises by $0.50/10^{6} = 5\times10^{-7}$, i.e. **0.5 µL L⁻¹ per hour**.

(b) $0.1/0.5 = 0.2$ h — about 12 minutes. A few ripening fruits quickly raise the whole store above the threshold, and because ethylene induces its own synthesis in climacteric fruit, the response spreads. This is why commercial stores remove ethylene continuously (by ventilation, catalytic oxidation or permanganate scrubbers), keep oxygen low and temperature near 0 °C to suppress its synthesis, or block its perception with 1-methylcyclopropene.
:::
:::

## The other hormones, briefly

- **Brassinosteroids**, plant steroids first isolated from rape (*Brassica napus*) pollen in 1979, promote cell expansion and division. They are perceived at the cell surface by the leucine-rich-repeat receptor kinase BRI1, which inactivates the kinase BIN2 and so releases the BZR1 and BES1 transcription factors. Mutants unable to make or perceive them are dark green dwarfs.
- **Jasmonates**, derived from the fatty acid linolenic acid, mediate defence against chewing insects and necrotrophic fungi, and pollen development. The active form, jasmonoyl-isoleucine, is perceived by a co-receptor of the F-box protein COI1 and JAZ repressor proteins, which are destroyed — a module almost exactly parallel to auxin's.
- **Salicylic acid** mediates defence against biotrophic pathogens and systemic acquired resistance ([[plant-biology/plant-responses]]); its perception involves NPR proteins.
- **Strigolactones**, carotenoid-derived, inhibit shoot branching and, exuded from roots, attract arbuscular mycorrhizal fungi and trigger germination of parasitic witchweeds ([[plant-biology/mineral-nutrition]]). Their receptor, the α/β-hydrolase D14, hydrolyses the hormone as it signals, and promotes the destruction of SMXL repressors with the F-box protein MAX2 — yet again, degradation of a repressor.
- **Peptide hormones**, such as CLV3 ([[plant-biology/plant-form#def-wus-clv]]), systemin and the CLE peptides that regulate nodulation, act through receptor kinases.

::: intuition Why destroy a repressor?
Auxin, gibberellin, jasmonate and strigolactone all signal by targeting a repressor for ubiquitin-mediated destruction, and ethylene and ABA by switching off a negative regulator. Why would evolution favour this indirect design? One answer is speed and sensitivity: repressors with short half-lives can be cleared quickly, and the response genes are already poised, with transcription factors bound and waiting. Another is robustness: a system that is "on" unless actively held off fails safe in some contexts, and repression can be maintained by feedback (most of these pathways induce new repressor synthesis when activated, which shuts the response off again once the hormone falls). And modularity: the SCF ubiquitin ligase machinery, present in all eukaryotes, offered a ready-made way to link small molecules to protein turnover, recruited independently by several hormone pathways.
:::

## Dose and response

How does a cell translate a hormone concentration into a response? For a hormone binding a receptor with dissociation constant $K_\mathrm{d}$, receptor occupancy rises with concentration as a hyperbola; downstream amplification and cooperativity often make the response steeper and shift it relative to occupancy ([[cell-biology/cell-signalling]]). Dose–response data are therefore usually described by an empirical Hill function.

::: proposition Dose–response curve (empirical) {#prop-dose}
The response $R$ to a hormone at concentration $c$ is commonly described by

$$
R = R_\text{min} + \frac{R_\text{max} - R_\text{min}}{1 + (\mathrm{EC_{50}}/c)^n},
$$ {#eq-dose}

where $\mathrm{EC_{50}}$ is the concentration giving half the maximal effect and $n$ (the Hill coefficient) the steepness. On a logarithmic concentration axis the curve is sigmoid; the response rises from 10 % to 90 % of its range over a concentration factor of $81^{1/n}$. This is a fitted description, not a mechanism: $\mathrm{EC_{50}}$ need not equal the receptor's $K_\mathrm{d}$, and $n$ need not equal any number of binding sites.
:::

::: example Hormone concentrations in tissue {#ex-dose}
A growing pea internode contains 20 ng of IAA per gram of fresh mass. (a) Convert this to an approximate molar concentration (IAA, 175.2 g mol⁻¹; take 1 g of tissue as 1 mL). (b) A response to IAA in this tissue has $\mathrm{EC_{50}} = 300$ nmol L⁻¹ and $n = 1$. What fraction of the maximal response does the tissue's average concentration produce? (c) Why may the average be misleading?
::: solution
(a) $20\times10^{-9}\ \text{g}/175.2\ \text{g mol}^{-1} = 1.14\times10^{-10}$ mol in 1 mL, so about $1.1\times10^{-7}$ mol L⁻¹, or 114 nmol L⁻¹.

(b) By [[#eq-dose]] with $R_\text{min} = 0$, $R/R_\text{max} = 1/(1 + 300/114) = 0.28$ — about 28 %.

(c) The average hides gradients: auxin is concentrated in particular cells and compartments (by the trapping of [[#ex-trapping]], cytosolic concentrations can be tens of times higher than apoplastic ones), and much of the extracted IAA may be conjugated or stored. Fluorescent biosensors (such as DII-VENUS, an Aux/IAA domain fused to a fluorescent protein, which is degraded wherever auxin is perceived) show that auxin levels can differ several-fold between adjacent cells.
:::
:::

A classic observation is that roots are far more sensitive to auxin than stems. In Kenneth Thimann's (1937) dose–response curves, root elongation was promoted by very low IAA concentrations, around 10⁻¹¹–10⁻¹⁰ mol L⁻¹, and inhibited above that, while stem elongation was promoted up to about 10⁻⁵ mol L⁻¹ and inhibited only beyond. The same concentration may therefore promote shoot growth and inhibit root growth — a fact central to the explanation of tropisms.

::: widget plot
f: 1/(1 + 10^(n*(a - x))) - 1/(1 + 10^(n*(a + 2.5 - x))); 1/(1 + 10^(n*(b - x))) - 1/(1 + 10^(n*(b + 2.5 - x)))
x: -13, -2
y: 0, 1
sliders: n=1.5:0.5:4:0.1; a=-11.5:-13:-8:0.1; b=-7:-10:-4:0.1
labels: \text{root}; \text{stem}
caption: A schematic of tissue sensitivity to auxin: relative growth promotion (vertical) against $\log_{10}$ of IAA concentration in mol L⁻¹ (horizontal), each curve built from a rising Hill function ([[#eq-dose]]) minus a second, inhibitory one 2.5 log units higher. The slider $a$ sets the half-maximal concentration for root promotion, $b$ for stem promotion; $n$ the steepness. With the defaults, concentrations that maximally promote stem growth (around 10⁻⁶ mol L⁻¹) lie far beyond the root's peak, on the side of the root curve where promotion has given way to inhibition (shown here as zero promotion) — the pattern of Thimann's classic curves. The curves are illustrative shapes, not fits to data.
:::

::: history
Darwin and Darwin (1880) inferred a transmissible influence from the coleoptile tip; Boysen-Jensen (1913), Paál (1919) and Went (1926–1928) showed it was a diffusible substance; Kögl, Haagen-Smit and Erxleben (1934) identified IAA. Kurosawa (1926) traced bakanae disease to a fungal secretion, the source of gibberellin. Neljubov (1901) discovered the effects of ethylene and Gane (1934) its production by fruit. Miller, Skoog and colleagues (1955) found kinetin, and Skoog and Miller (1957) the auxin–cytokinin ratio that controls organogenesis. ABA was identified in 1963–1965. The receptor era began with ETR1 in 1993; the auxin receptor TIR1 (2005), the gibberellin receptor GID1 (2005), the cytokinin receptor CRE1/AHK4 (2001), the brassinosteroid receptor BRI1 (identified 1997, confirmed as receptor 2005), the jasmonate co-receptor COI1–JAZ (2007) and the ABA receptor PYR/PYL (2009) followed, largely through genetic screens in *Arabidopsis*.
:::

## Summary

::: summary
- Plant hormones are small signals active at very low concentrations, made in many tissues and acting locally or at a distance; their effects depend on context and interactions.
- **Auxin** (IAA) is made from tryptophan in young tissues and moved by polar transport: weak-acid trapping (accumulation $(1 + 10^{\mathrm{pH}_i - \mathrm{p}K_a})/(1 + 10^{\mathrm{pH}_o - \mathrm{p}K_a}) \approx 27$ at pH 5.5/7.0) plus polarly localised PIN efflux carriers. TIR1/AFB–Aux/IAA co-receptors trigger Aux/IAA destruction, releasing ARFs. Auxin drives acid growth, phyllotaxis, vascular patterning, lateral roots, apical dominance and tropisms.
- **Cytokinins** (adenine derivatives) act through a two-component histidine-kinase pathway; with auxin, their ratio controls root versus shoot regeneration; they promote shoot meristem activity and delay senescence.
- **Gibberellins** bind GID1, which targets DELLA repressors for destruction; DELLA and GA-biosynthesis mutations gave the semi-dwarf wheat and rice of the Green Revolution.
- **ABA** rises in drought and maintains seed dormancy; PYR/PYL receptors inhibit PP2Cs, activating SnRK2 kinases that open the SLAC1 anion channel to close stomata.
- **Ethylene** (from ACC) acts through ER-membrane receptors that are negative regulators via CTR1, EIN2 and EIN3; it causes the triple response, fruit ripening and abscission.
- Brassinosteroids, jasmonates, salicylic acid, strigolactones and peptides complete the set; repressor destruction is a recurring signalling logic.
- Dose–response curves are sigmoid in log concentration ($\mathrm{EC_{50}}$, Hill coefficient); roots are far more sensitive to auxin than stems.
:::

Hormones are the internal language; light, gravity, temperature and attack are what the plant must respond to. [[plant-biology/plant-responses]] describes how the environment is sensed and how hormones translate it into growth and development.

## Exercises

::: exercise Protonated auxin {level=1 check="0.39"}
What fraction of IAA (p$K_\mathrm{a}$ 4.8) is in the uncharged form at pH 5.0? Give two decimal places.
::: solution
$1/(1 + 10^{0.2}) = 1/2.585 = 0.39$.
:::
:::

::: exercise A less acidic wall {level=1 check="9.5"}
Using [[#eq-trapping]], what accumulation ratio would a cell with cytosolic pH 7.0 reach if its apoplast were at pH 6.0 (p$K_\mathrm{a}$ 4.8)? Give one decimal place.
::: solution
$(1 + 10^{2.2})/(1 + 10^{1.2}) = 159.5/16.85 = 9.5$.
:::
:::

::: exercise From nanograms to nanomoles {level=1 check="285"}
A sample of shoot apices contains 50 ng IAA per gram fresh mass. Assuming 1 g ≈ 1 mL, what is the average concentration in nmol L⁻¹, to the nearest whole number?
::: solution
$50\times10^{-9}/175.2 = 2.85\times10^{-10}$ mol per mL $= 2.85\times10^{-7}$ mol L⁻¹ $= 285$ nmol L⁻¹.
:::
:::

::: exercise Steepness {level=1 check="9"}
By what factor must the hormone concentration increase to raise the response from 10 % to 90 % of its range, for a Hill coefficient $n = 2$?
::: solution
$81^{1/n} = 81^{1/2} = 9$. (For $n = 1$ it is 81-fold.)
:::
:::

::: exercise Gibberellin genetics {level=2}
Predict the height of each *Arabidopsis* genotype and whether spraying GA restores normal height, explaining your reasoning: (a) *ga1* (no GA synthesis); (b) *gai*, dominant, a DELLA protein lacking the domain that binds GID1; (c) a quadruple loss-of-function mutant lacking the four main DELLA proteins; (d) *ga1* combined with the quadruple DELLA mutant.
::: solution
(a) Dwarf; rescued by GA, which binds GID1 and destroys DELLAs.
(b) Dwarf; not rescued, because the mutant DELLA cannot be recognised by GA–GID1 and is not degraded; dominant because the stable repressor acts even with normal copies present.
(c) Tall (taller than wild type, slender, early flowering); insensitive to GA because the targets of GA are gone, and growth is not repressed.
(d) Tall like (c): DELLA loss is epistatic to GA deficiency, showing that GA's only role in this pathway is to remove DELLAs. (Such double and higher-order mutants were key evidence for the derepression model.)
:::
:::

::: exercise Tissue culture {level=2}
Tobacco pith explants are placed on media with different hormone concentrations (mg L⁻¹): (i) IAA 2.0, kinetin 0.02; (ii) IAA 2.0, kinetin 0.2; (iii) IAA 0.02, kinetin 1.0; (iv) no hormones. Predict what each forms after four weeks, and explain how the results led to a general principle of plant development.
::: solution
(i) High auxin/cytokinin ratio (100): roots. (ii) Ratio 10: undifferentiated callus proliferation. (iii) Ratio 0.02: shoots (buds). (iv) Little or no growth: pith cells need both hormones to divide. Skoog and Miller (1957) concluded that organ formation is controlled not by specific organ-forming substances but by the balance between two hormones acting on competent cells — a quantitative, combinatorial principle that also underlies, for example, the antagonism of auxin and cytokinin in root meristems and in apical dominance.
:::
:::

::: exercise Receptors that switch off {level=2}
*Arabidopsis* has five ethylene receptors. (a) Loss of any one receptor has little effect, but a quadruple mutant lacking four shows a constitutive ethylene response. Explain this using the model in which receptors activate CTR1 in the absence of ethylene. (b) Why is the *etr1-1* mutation, which prevents ethylene binding, dominant? (c) Predict the phenotype of an *etr1-1 ctr1* double mutant and explain what it shows about the order of the genes.
::: solution
(a) Each unoccupied receptor helps keep CTR1 active and the pathway off. The receptors are partly redundant, so losing one leaves enough receptor activity; losing most removes the signal that activates CTR1, so EIN2 is released and the response is on even without ethylene.
(b) The mutant receptor cannot bind ethylene, so it keeps activating CTR1 even when ethylene is present, holding the pathway off regardless of the normal receptors: a dominant insensitive phenotype.
(c) Constitutive response, like *ctr1*: CTR1 acts downstream of the receptors, and without it the receptors' state is irrelevant. *ctr1* is epistatic to *etr1-1*.
:::
:::

::: exercise Polar transport in a segment {level=2}
A 10 mm segment of a sunflower hypocotyl is placed between a donor agar block containing ¹⁴C-IAA and a receiver block. (a) With the donor at the apical end, radioactivity appears in the receiver after about an hour. With the segment inverted (donor at the basal end), very little appears. Explain. (b) Adding NPA (an inhibitor of PIN-mediated efflux) to the segment abolishes transport in both orientations. What does this show? (c) Estimate the transport velocity if, with the apical donor, the first label appears in the receiver after 60 minutes.
::: solution
(a) Polar auxin transport moves from apical to basal ends of stem cells, because PIN efflux carriers are at the basal face of the cells. In the inverted segment the donor sits at the basal end, and IAA cannot be exported towards the original apex; only slow diffusion occurs.
(b) Polar transport requires efflux carriers; blocking them traps auxin inside the cells (it enters but cannot leave).
(c) $10\ \text{mm}/1\ \text{h} = 10$ mm h⁻¹ for the front of the label — within the typical range of 5–20 mm h⁻¹.
:::
:::

::: exercise Bending with a pH gradient {level=3}
In a coleoptile illuminated from one side, auxin moves laterally to the shaded side, so that the shaded side has 1.5 times the auxin of the lit side. (a) Using the dose–response of [[#ex-dose]] ($\mathrm{EC_{50}} = 300$ nmol L⁻¹, $n = 1$) with the lit side at 100 nmol L⁻¹, compare the growth responses of the two sides. (b) If the coleoptile is a cylinder of diameter 2 mm and the growing zone elongates at 1.0 mm h⁻¹ on the lit side, at what rate does it bend, in degrees per hour? Treat the difference in elongation rate as proportional to the difference in relative response. (c) Why would a steeper dose–response (larger $n$) make phototropism more sensitive?
::: solution
(a) Lit: $1/(1 + 300/100) = 0.25$. Shaded (150 nmol L⁻¹): $1/(1 + 300/150) = 0.333$. The shaded side's response is $0.333/0.25 = 1.33$ times that of the lit side.
(b) Shaded side elongates at $1.33$ mm h⁻¹; the difference is $\Delta v = 0.33$ mm h⁻¹ across a width $d = 2$ mm. A curved segment with a length difference $\Delta L$ between its two sides across width $d$ turns through an angle $\theta = \Delta L/d$ radians, so the rate is $0.33/2 = 0.167$ rad h⁻¹ $= 9.5^\circ$ h⁻¹. (Coleoptiles indeed bend at roughly this order — tens of degrees within a few hours.)
(c) With larger $n$ the response changes more steeply with concentration near EC₅₀, so a given ratio of auxin between the two sides produces a larger difference in growth — greater gain for the same signal. The trade-off is a narrower range of concentrations over which differences are detected.
:::
:::

::: exercise Hormones in a wilting leaf {level=3}
Within 30 minutes of the roots of a potted plant being exposed to a dry, salty solution, leaf stomatal conductance halves, before any fall in leaf water potential is detectable. (a) Propose two ways the information could travel from root to leaf this fast. (b) An *Arabidopsis* mutant unable to make ABA in its leaves (but able to make it in its roots), and grafting experiments, have been used to test where the ABA that closes stomata is made. Describe how a reciprocal grafting experiment between wild type and an ABA-deficient mutant could distinguish root-derived from leaf-derived ABA. (c) What would it mean if stomata of an ABA-deficient shoot grafted onto wild-type roots still failed to close?
::: solution
(a) Hydraulic signals — a change in xylem tension propagated almost instantly — that are sensed in the leaf (for example by guard cells or vascular tissue), triggering local ABA synthesis; or chemical signals carried in the xylem sap, such as ABA, its conjugates, a change in sap pH or small peptides (a CLE peptide moving from root to shoot has been shown to induce leaf ABA synthesis in *Arabidopsis*). Electrical or calcium waves are also possible.
(b) Graft combinations: wild-type shoot on mutant root; mutant shoot on wild-type root; and self-grafts of each as controls. Expose roots to drought and measure stomatal closure and leaf ABA. If closure requires ABA synthesis in the shoot, the mutant shoot fails to close even on a wild-type root, while a wild-type shoot on a mutant root closes normally.
(c) That root-derived ABA is not sufficient for stomatal closure, and that the leaf must make its own ABA in response to a signal from the root — a conclusion several studies have reached, which places the emphasis on hydraulic or peptide signals from the root.
:::
:::
