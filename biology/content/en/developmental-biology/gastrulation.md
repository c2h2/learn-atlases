At the end of cleavage, the embryo is a ball or disc of cells with little internal organisation: the cells that will form the gut are on the outside, and the cells that will form the brain are next to them. In the next few hours this changes completely. Sheets of cells fold inwards, individual cells detach and crawl inside, the surface spreads to cover the whole embryo, and tissues narrow and lengthen. When it is over, the embryo has three layers — an outer **ectoderm**, an inner **endoderm** lining a primitive gut, and between them the **mesoderm** — and a body axis along which these layers are arranged. This reorganisation is **gastrulation**. "It is not birth, marriage, or death, but gastrulation, which is truly the most important time in your life," wrote Lewis Wolpert in 1986, and the joke makes a serious point: gastrulation places cells next to the neighbours that will instruct them, and almost every later induction depends on it.

This chapter has two halves. The first is about mechanics: the small set of cell behaviours from which all gastrulation is built, and how they combine in four kinds of embryo. The second is about signals: the **organiser**, discovered by grafting in 1924, and the molecules that explain it, which turned out to work largely by *blocking* other signals. We build on the axes of [[developmental-biology/axis-formation]] and the blastulae of [[developmental-biology/early-embryos]].

## The germ layers

::: definition Germ layers {#def-germ-layers}
The **germ layers** are the three primary tissue layers established at gastrulation in triploblastic animals.
- **Ectoderm**, the outer layer, forms the epidermis and its derivatives (hair, feathers, nails, skin glands), the nervous system, and, in vertebrates, the neural crest and the placodes of the sense organs.
- **Mesoderm**, the middle layer, forms the notochord, muscles, skeleton, dermis, heart and blood vessels, blood, kidneys and gonads (except the germ cells), and the connective tissue of the gut.
- **Endoderm**, the inner layer, forms the epithelial lining of the gut and its outgrowths: the liver, pancreas, lungs, thyroid and the epithelium of the bladder.
:::

Cnidarians (sea anemones, jellyfish) and ctenophores are traditionally called **diploblastic**, with only ectoderm and endoderm, while other animals are **triploblastic**. The opening through which material moves inside is the **blastopore**. In **protostomes** (such as insects, molluscs and annelids) it typically contributes to the mouth; in **deuterostomes** (echinoderms, chordates) it becomes the anus and the mouth forms separately — though the distinction is less clean across all species than the classic definitions suggest.

Germ layers are a description of where tissues come from, not a rule that every organ comes from one layer. Most organs combine tissue from two or three: the gut has an endodermal lining, mesodermal muscle and an enteric nervous system from neural crest (ectoderm).

::: warning "Each germ layer has a fixed set of fates from the start"
The germ layers are produced by gastrulation; they are not compartments with sealed boundaries. Vertebrate **neural crest** cells, which arise from ectoderm, form bone and cartilage of the face — tissues otherwise typical of mesoderm — which is why the neural crest is sometimes called the fourth germ layer. In the tail bud, single **neuromesodermal progenitors** produce both spinal cord (ectoderm) and somites (mesoderm) long after gastrulation has formed the rest of the body. And until cells have moved and been induced, their fate depends on signals ([[developmental-biology/principles-of-development#ex-spemann-1918]]). Germ-layer identity is a state set by signals and transcription factors, and like other states it can be reprogrammed.
:::

## The cell behaviours of gastrulation

However different gastrulation looks in different animals, it is built from a few kinds of cell behaviour.

::: definition The movements of gastrulation {#def-movements}
- **Invagination**: a region of an epithelial sheet buckles inwards, like a finger pushed into a soft ball.
- **Involution**: an expanding outer sheet rolls over an edge and spreads along the inner surface of the remaining outer cells.
- **Ingression**: individual cells leave an epithelial sheet and migrate into the interior as free cells.
- **Delamination**: one sheet splits into two roughly parallel sheets.
- **Epiboly**: an epithelial sheet spreads, usually by thinning, to enclose the deeper layers or the yolk.
- **Convergent extension**: a tissue narrows along one axis and lengthens along the perpendicular axis, by cells intercalating between each other.
:::

Two cellular mechanisms underlie most of these. In **apical constriction**, a contractile network of actin and non-muscle myosin II at the apical surface of epithelial cells shrinks their apical area, turning columnar cells into wedges; a band of wedge-shaped cells bends the sheet. In the **epithelial-to-mesenchymal transition** (EMT), epithelial cells lose their adhesions (largely by repression of E-cadherin by transcription factors of the Snail family), lose their apical–basal polarity, and become migratory mesenchymal cells; ingression is EMT. Both mechanisms reappear in organogenesis and, unfortunately, in the invasion of tissues by cancer cells.

::: proposition Bending a sheet with wedge-shaped cells {#prop-wedge}
Consider an epithelium of height $h$ in which each cell has apical width $a$ and basal width $b > a$, the cell faces being radial. The cells then tile an arc: each cell subtends an angle

$$
\theta = \frac{b - a}{h},
$$

and the apical surface has a radius of curvature

$$
R = \frac{a\,h}{b - a}.
$$ {#eq-wedge}

A closed tube with the apical side inwards needs $2\pi/\theta = 2\pi h/(b-a)$ such cells around its circumference. Assumptions: identical cells, straight radial lateral faces, a sheet free to bend (not held by neighbouring tissue). Real invaginations also depend on the forces from surrounding tissue, so the formula sets a scale rather than predicting a shape.
:::

::: proof
If the apical surface of one cell is an arc of radius $R$ and angle $\theta$, its length is $a = R\theta$. The basal surface, a distance $h$ further out, has length $b = (R + h)\theta$. Subtracting, $b - a = h\theta$, so $\theta = (b-a)/h$, and $R = a/\theta = ah/(b-a)$. A full circle needs $2\pi/\theta$ cells.
:::

::: example Wedge-shaped cells fold a sheet {#ex-wedge}
Columnar epithelial cells 20 µm tall, 8 µm wide, constrict their apical surfaces to 2 µm while keeping their basal width. (a) What angle does each cell subtend, and what is the radius of curvature of the apical surface? (b) How many such cells would form a closed tube? (c) If constriction is less extreme, with apical width 6 µm, how do the answers change?
::: solution
(a) $\theta = (8 - 2)/20 = 0.30$ rad (17°); by [[#eq-wedge]], $R = 2\times20/6 = 6.7$ µm.

(b) $2\pi/0.30 = 21$ cells.

(c) $\theta = (8-6)/20 = 0.10$ rad, $R = 6\times20/2 = 60$ µm, and a closed tube would need 63 cells. A modest constriction confined to a narrow band only produces a shallow groove; a deep, narrow fold needs strong constriction of a band of cells. The cells of the *Drosophila* ventral furrow constrict their apical surfaces strongly and in pulses, ratcheting down step by step (Adam Martin, Matthias Kaschube and Eric Wieschaus, 2009), and they also shorten along their apical–basal axis, which helps push the furrow inwards.
:::
:::

::: widget plot
f: x*h/(b - x)
x: 0, 8
y: 0, 150
sliders: h=20:5:50:1; b=8:4:16:0.5
labels: R \text{ (}\mu\text{m)}
caption: Radius of curvature $R$ of a sheet of wedge-shaped cells [[#eq-wedge]] against the apical width $a$ (horizontal axis, µm), for cell height $h$ and basal width $b$ (sliders, µm). As the apical surface constricts (moving left), the radius falls steeply and the sheet folds into a tight groove; with the apical width close to the basal width ($x \to b$), the sheet is nearly flat and $R$ diverges. Taller cells need more constriction to give the same curvature.
:::

::: proposition Convergent extension conserves area {#prop-ce}
If a tissue of constant thickness and constant volume narrows from width $w_0$ to width $w$, it lengthens from $L_0$ to

$$
L = L_0\,\frac{w_0}{w}.
$$

When the cells keep their shape, the number of cells across the tissue falls by the factor $w/w_0$ and the number along it rises by $w_0/w$: cells **intercalate** between their neighbours across the narrowing axis.
:::

Convergent extension was analysed most thoroughly by Ray Keller and colleagues in explants of *Xenopus* dorsal mesoderm: cells become elongated mediolaterally, extend protrusions on their medial and lateral ends, and crawl between one another, so that the tissue narrows and lengthens even when cut out of the embryo. The polarisation of the cells depends on the **planar cell polarity** pathway, a branch of Wnt signalling acting through Dishevelled and the transmembrane proteins Van Gogh-like and Frizzled, which orient cells within the plane of a tissue rather than along its apical–basal axis. In the *Drosophila* germ band, which more than doubles in length during gastrulation, intercalation occurs instead by the remodelling of junctions between epithelial cells (Kenneth Irvine and Eric Wieschaus, 1994; Jennifer Zallen and colleagues later).

::: example Convergent extension of the notochord {#ex-ce}
A band of dorsal mesoderm is 200 µm wide and 100 µm long, and its cells are about 10 µm across. During gastrulation and neurulation it narrows to 50 µm. (a) Assuming constant thickness and volume, how long does it become? (b) How many cells were across it before and after, and how many cells long was it?
::: solution
(a) By [[#prop-ce]], $L = 100\times200/50 = 400$ µm: a fourfold lengthening.

(b) Before: 20 cells across and 10 along. After: 5 cells across and 40 along. Cells must have interdigitated, with roughly every four cells across the tissue becoming lined up one behind another along it. In the *Xenopus* notochord the end point is extreme: cells end up stacked like coins, a single cell across. The figures here are illustrative, but they show how mediolateral intercalation can produce large extensions with no growth or cell division.
:::
:::

## Gastrulation in four embryos

### Sea urchin

Gastrulation in the sea urchin is the simplest to watch, because the embryo is transparent and its blastula is a single layer of cells. It proceeds in clear stages:

1. **Ingression of primary mesenchyme.** The descendants of the micromeres at the vegetal pole undergo EMT, lose their contacts with neighbours and the hyaline layer, and enter the blastocoel. They migrate along the inner wall, settle in a ring in the vegetal region and form the calcareous larval skeleton.
2. **Invagination.** The vegetal plate flattens and buckles inwards, forming a short tube, the **archenteron** (primitive gut), which extends about a quarter to a third of the way across the blastocoel.
3. **Extension.** The archenteron lengthens by convergent extension of its cells. At its tip, **secondary mesenchyme** cells extend long filopodia to the inner surface of the animal hemisphere, attach and contract, pulling the gut across. Jeff Hardin showed in 1988 that destroying these cells with a laser stops the archenteron short of its full length.
4. **Fusion.** The tip of the archenteron meets the ectoderm at the future mouth, which opens there; the blastopore becomes the anus — the defining feature of deuterostomes.

### *Xenopus*

Amphibian gastrulation begins at the **dorsal lip of the blastopore**, on the side opposite sperm entry, just below the equator. Here **bottle cells** constrict their apical surfaces and form a slit. Cells of the marginal zone — the equatorial belt between the animal and vegetal regions — then **involute**: they roll over the lip and migrate inside, along the inner surface of the blastocoel roof, which is coated with fibronectin. The first cells to involute become pharyngeal endoderm and head mesoderm (the **prechordal plate**); later ones become **notochord**, then somites and lateral mesoderm. The lip spreads laterally and ventrally until it forms a ring around the vegetal yolky cells (the **yolk plug**), which are gradually enclosed. Meanwhile the animal cap spreads by **epiboly**, thinning as deep cells intercalate radially, to cover the whole embryo as ectoderm, and the involuted dorsal mesoderm undergoes **convergent extension**, elongating the embryo. The cavity enclosed by the involuted endoderm is the archenteron, and the blastocoel is squeezed away.

### Chick

Chick gastrulation takes place in a flat disc, the epiblast, lying on top of the yolk over a lower layer, the hypoblast. A thickening, the **primitive streak**, forms at the posterior edge and extends forwards along the midline, through large-scale "polonaise" movements of the epiblast. At its anterior tip forms a knot of cells, **Hensen's node**. Epiblast cells move towards the streak, undergo EMT and **ingress** through it. The first to go through displace the hypoblast and form the definitive endoderm; later cells spread between the epiblast and endoderm as mesoderm. Cells ingressing through Hensen's node form the prechordal plate and notochord. Then the node **regresses** posteriorly, laying down the notochord behind it, while the head forms in front: the chick, like other vertebrates, is built from head to tail. The epiblast cells that stay on the surface form the ectoderm.

The mouse embryo gastrulates in the same way through a primitive streak and a node, but on the surface of its cup-shaped egg cylinder; human embryos gastrulate on a flat disc, much as the chick does.

### *Drosophila*

In *Drosophila*, gastrulation begins about 3 h after fertilisation (at 25 °C) along the ventral midline. A band of cells about 18 cells wide, those expressing the Dorsal targets *twist* and *snail*, constricts apically and invaginates to form the **ventral furrow**; the cells then undergo EMT and spread out as mesoderm beneath the ectoderm. The endoderm invaginates at the anterior and posterior ends. The **germ band**, the ventral and lateral ectoderm that will form the segmented body, then lengthens by convergent extension and wraps around the posterior end of the egg.

::: quiz
Which cell behaviour is the primary mechanism by which mesoderm cells leave the epiblast through the chick primitive streak?
- [ ] Invagination
- [ ] Epiboly
- [x] Ingression, after an epithelial-to-mesenchymal transition
- [ ] Delamination
::: solution
Epiblast cells arriving at the streak lose E-cadherin-based junctions (under the control of Snail family transcription factors), detach as individual mesenchymal cells, and migrate into the space below: that is ingression through an EMT. Invagination moves a coherent sheet; epiboly spreads a sheet over a surface; delamination splits a sheet into two.
:::
:::

## The organiser

### Spemann and Mangold

In 1924 Hans Spemann and his graduate student Hilde Mangold published a grafting experiment that became the most famous in embryology. Using newts, Mangold cut out the dorsal lip of the blastopore of an early gastrula of an unpigmented species and grafted it into the opposite, ventral side of a gastrula of a pigmented species. The host developed a second body axis, sometimes almost a whole second embryo, joined belly to belly with the first. Thanks to the difference in pigment, the origin of each tissue could be traced: the grafted cells formed mostly notochord, while the secondary neural tube and somites were formed largely from host cells — cells that, left alone, would have become ventral epidermis and belly mesoderm.

::: definition The organiser {#def-organiser}
The **organiser** is the region of the early gastrula, the dorsal lip of the blastopore in amphibians, that can induce a complete secondary body axis when grafted to the ventral side of another embryo. It (1) forms the prechordal plate and notochord itself; (2) **dorsalises** the neighbouring mesoderm, inducing it to form somites rather than ventral mesoderm; (3) induces the overlying ectoderm to form the nervous system (**neural induction**); and (4) initiates the movements of gastrulation. Equivalent organisers are **Hensen's node** in the chick, the **node** in the mouse and the embryonic **shield** in zebrafish.
:::

::: example Reading the Spemann–Mangold graft {#ex-organiser-graft}
In a secondary axis produced by a dorsal-lip graft, the notochord consists entirely of unpigmented (donor) cells, the somites of a mixture of unpigmented and pigmented cells, and the neural tube almost entirely of pigmented (host) cells. What does each observation tell you?
::: solution
The notochord is made by the graft itself: the organiser **self-differentiates** according to its own fate, as determined tissue would. The mixed somites show that the graft recruited host ventral mesoderm, which would normally have formed blood and lateral tissues, to form dorsal somitic mesoderm — dorsalisation. The neural tube of host origin shows that host ventral ectoderm, which would normally have become belly epidermis, was induced to become nervous system — neural induction. The experiment therefore showed that the grafted tissue organises its neighbours rather than simply building the axis itself, which is why Spemann called it the organiser. (Mangold died in 1924, before the paper appeared; Spemann received the Nobel Prize in Physiology or Medicine in 1935.)
:::
:::

### What the organiser secretes

For sixty years the molecules behind the organiser resisted identification. They were found in the early 1990s, largely in *Xenopus*, by screening for genes expressed in the dorsal lip and for mRNAs that could restore an axis to UV-ventralised embryos ([[developmental-biology/axis-formation#ex-uv]]). The organiser expresses transcription factors such as **Goosecoid** (Ken Cho, Edward De Robertis and colleagues, 1991), which can induce a secondary axis when its mRNA is injected ventrally, and it secretes a set of proteins that, surprisingly, were nearly all **antagonists** of other signals:

- **Noggin** (William Smith and Richard Harland, 1992), **Chordin** (Yoshiki Sasai, De Robertis and colleagues, 1994) and **Follistatin** bind BMP proteins, especially BMP4, and stop them from activating their receptors.
- **Cerberus**, **Dickkopf** and **Frzb** inhibit Wnt signalling, and Cerberus also blocks Nodal and BMP; these are needed in the anterior for the head to form.

### Neural induction and the default model

On the ventral side of the gastrula, BMP4 is expressed throughout the ectoderm and mesoderm. Signalling by BMP4 instructs ectoderm to become epidermis and mesoderm to adopt ventral fates (blood, lateral plate). The organiser, by secreting BMP antagonists, protects the dorsal ectoderm from BMP and so allows it to become neural tissue.

The striking support for this came from experiments with the ectoderm of the animal cap. An intact cap cultured alone forms epidermis. But if its cells are dissociated and kept apart for a few hours, so that the BMP they secrete diffuses away, they form neural tissue (Hildegard Grunz and Lothar Tacke, 1989, among others). Ali Hemmati-Brivanlou and Douglas Melton showed in 1994 that animal caps expressing a dominant-negative receptor, which blocks signalling by activin and related ligands, became neural without any organiser. These results led to the **default model**: ectoderm becomes neural unless it receives BMP signals, and neural induction consists of *removing* an inhibitory signal. In chick and mouse, FGF signalling and the timing of its action are also needed, so the default model is now seen as an important part of the story, not the whole of it.

::: intuition Instruction by subtraction
The organiser does not paint "neural" onto the ectoderm; it shields it from a signal that says "epidermis". Because the antagonists diffuse away from the organiser and BMP is made all round, the result is a gradient of BMP *activity*, low dorsally and high ventrally, even though BMP mRNA itself is fairly uniform. Cells read this activity gradient: low gives neural plate, intermediate gives neural crest and placodes at its edge, high gives epidermis; in the mesoderm, low gives somites, higher gives intermediate mesoderm, and highest gives lateral plate and blood. The same logic — a BMP and an antagonist from the opposite side — patterns the dorsal–ventral axis of the fly, with Dpp and Sog ([[developmental-biology/axis-formation]]), but upside down: the fly's nerve cord is ventral, the vertebrate's dorsal.
:::

::: widget plot
f: 1/(1 + C*exp(-x/L)); t1; t2
x: 0, 500
y: 0, 1.05
sliders: C=20:0:50:1; L=80:20:200:5; t1=0.5:0.1:0.7:0.01; t2=0.75:0.6:0.95:0.01
labels: \text{BMP activity}; \text{neural / border}; \text{border / epidermis}
caption: A simple model of BMP activity across the ectoderm, from the organiser (left, $x = 0$) to the ventral side (right, µm). An antagonist such as Chordin, made by the organiser, falls off as $e^{-x/\lambda}$ (decay length set by slider $L$) and reduces the activity of uniformly made BMP to $1/(1 + C e^{-x/\lambda})$, where $C$ is the antagonist's strength at its source. Ectoderm with activity below the lower line becomes neural plate, between the lines neural plate border (neural crest), and above the upper line epidermis. Set $C = 0$, as when the organiser is removed, and the whole ectoderm becomes epidermis; increase $C$ and the neural plate expands ventrally.
:::

### Mesoderm induction and the activin experiment

Mesoderm itself is induced, before gastrulation, by the vegetal cells (Nieuwkoop's experiment, [[developmental-biology/axis-formation]]). In *Xenopus*, the vegetal transcription factor VegT activates genes for **Nodal-related** proteins, TGF-β family ligands that signal through Smad2/3 to the marginal zone. High Nodal signalling, dorsally (where β-catenin also acts), induces organiser and dorsal mesoderm; lower levels induce ventral and lateral mesoderm.

Activin, a TGF-β family protein that acts through the same receptors as Nodal, gave a clean demonstration that a single molecule can specify different fates at different concentrations. Jeremy Green and Jim Smith (1990) exposed dissociated animal-cap cells to different concentrations of activin and found that low concentrations activated genes of ventral mesoderm and of the pan-mesodermal gene *Brachyury* (*Xbra*), while higher concentrations activated dorsal genes such as *goosecoid*. Steven Dyson and John Gurdon (1998) went further and estimated that cells respond to the absolute number of occupied receptors: about 100 occupied receptors per cell (out of about 5000) for *Xbra*, and about 300 for *goosecoid* — a threefold difference in receptor occupancy separating two fates.

::: example From receptor occupancy to concentration {#ex-activin}
A cell has 5000 activin receptors, binding activin with a dissociation constant $K_\mathrm{d}$. By the occupancy equation of [[cell-biology/cell-signalling]], $\theta = [\mathrm{L}]/(K_\mathrm{d} + [\mathrm{L}])$. (a) What fractions of receptors are occupied when 100 and 300 are bound? (b) What concentrations of activin, in units of $K_\mathrm{d}$, give these occupancies? (c) If $K_\mathrm{d}$ were 1 nM (an illustrative value), what concentrations separate the *Xbra* and *goosecoid* responses?
::: solution
(a) $100/5000 = 0.02$ and $300/5000 = 0.06$.

(b) Solving for $[\mathrm{L}]$: $[\mathrm{L}] = K_\mathrm{d}\,\theta/(1-\theta)$. For $\theta = 0.02$, $[\mathrm{L}] = 0.0204\,K_\mathrm{d}$; for $\theta = 0.06$, $[\mathrm{L}] = 0.0638\,K_\mathrm{d}$.

(c) About 20 pM and 64 pM: a ratio of 3.1. At such low occupancy, the number of occupied receptors is almost proportional to concentration, so a threefold step in concentration gives a threefold step in signal. The cells are reading occupancies of a few per cent, far below saturation, so they have plenty of dynamic range left for higher thresholds.
:::
:::

::: application Gastruloids and stem-cell models of early development
Aggregates of a few hundred mouse embryonic stem cells, briefly exposed to a Wnt-pathway activator, break symmetry, elongate and express genes of all three germ layers in an orderly anterior–posterior sequence; these **gastruloids** (Susanne van den Brink, Alfonso Martinez Arias and colleagues, 2014) and related models built from human stem cells let researchers study gastrulation-like processes in a dish, with genetic and imaging tools that are hard to apply to embryos. They lack many features of real embryos (most lack a brain and extra-embryonic tissues). Because models built from human cells raise ethical questions, their use is governed by the regulations and guidelines for research with human stem cells, such as those of the International Society for Stem Cell Research.
:::

::: history
Ernst Haeckel coined the word *gastrula* in 1872 and proposed that all animals descend from a two-layered ancestor, the "gastraea". Christian Pander described the three germ layers of the chick in 1817, and Karl Ernst von Baer extended the concept to other vertebrates in 1828. Walther Vogt's vital-dye fate maps of amphibian gastrulae (1925–29) showed where each tissue came from. Spemann and Mangold's organiser paper appeared in 1924; Johannes Holtfreter's experiments of the 1930s showed that even dead organiser tissue could induce, starting a long search for the inducing substance. The molecular organiser was revealed in 1991–94 with Goosecoid, Noggin, Chordin and Follistatin, and the default model was proposed in 1994. Ray Keller's explant studies from the 1980s onwards established convergent extension as a driving force of vertebrate gastrulation.
:::

::: summary
- Gastrulation converts the blastula into a three-layered embryo — ectoderm, mesoderm, endoderm — and places tissues next to the neighbours that will induce them.
- It is built from invagination, involution, ingression, delamination, epiboly and convergent extension, driven by apical constriction, the epithelial-to-mesenchymal transition and cell intercalation.
- Wedge-shaped cells of height $h$, apical width $a$ and basal width $b$ bend a sheet to radius $R = ah/(b-a)$; convergent extension conserves area, so $L = L_0w_0/w$.
- Sea urchins gastrulate by ingression of primary mesenchyme and invagination of the archenteron; frogs by involution at the blastopore lip, epiboly and convergent extension; chicks and mammals by ingression through the primitive streak; flies by ventral furrow invagination and germ-band extension.
- The organiser (dorsal lip; Hensen's node; node; shield) self-differentiates into notochord, dorsalises mesoderm, induces the nervous system and drives gastrulation (Spemann and Mangold, 1924).
- Organiser proteins are mostly antagonists: Noggin, Chordin and Follistatin bind BMP; Cerberus, Dickkopf and Frzb block Wnt. Ectoderm free of BMP becomes neural (the default model), giving a BMP activity gradient that patterns ectoderm and mesoderm.
- Nodal-related signals induce mesoderm; activin experiments show that a few-fold change in receptor occupancy (about 100 versus 300 receptors) selects between fates.
:::

## Exercises

::: exercise Germ-layer origins {level=1}
Give the germ layer that forms each of the following in a vertebrate: (a) the lens of the eye; (b) the lining of the lungs; (c) the heart muscle; (d) the facial bones; (e) the notochord; (f) the epithelium of the liver.
::: solution
(a) Ectoderm (a placode of the head ectoderm). (b) Endoderm. (c) Mesoderm. (d) Ectoderm, via the neural crest. (e) Mesoderm (axial mesoderm, from the organiser). (f) Endoderm.
:::
:::

::: exercise Name the movement {level=1}
Name the gastrulation movement described: (a) an epithelium thins and spreads over the yolk of a zebrafish embryo; (b) cells of the sea-urchin vegetal pole leave the epithelium one by one and enter the blastocoel; (c) a ring of tissue rolls over the lip of the blastopore and spreads inside along the blastocoel roof; (d) a tissue lengthens fourfold while narrowing, without cell division.
::: solution
(a) Epiboly. (b) Ingression (of primary mesenchyme). (c) Involution. (d) Convergent extension.
:::
:::

::: exercise A furrow of wedge-shaped cells {level=1 check="30"}
Cells 30 µm tall with basal width 6 µm constrict their apical width to 3 µm. What is the radius of curvature of the apical surface, in µm?
::: solution
$R = ah/(b-a) = 3\times30/3 = 30$ µm.
:::
:::

::: exercise Extension by intercalation {level=2 check="250"}
A sheet of cells 150 µm wide and 50 µm long narrows by convergent extension to 30 µm wide, with constant area. How long does it become, in µm?
::: solution
$L = 50\times150/30 = 250$ µm, a fivefold extension.
:::
:::

::: exercise Receptor occupancy and fate {level=2 check="3.13"}
In the activin experiment, a cell has 5000 receptors and switches from *Xbra* to *goosecoid* expression when occupancy rises from 100 to 300 receptors. By what factor must the activin concentration increase (three significant figures)?
::: solution
$[\mathrm{L}] \propto \theta/(1-\theta)$, so the factor is $(0.06/0.94)/(0.02/0.98) = 0.0638/0.0204 = 3.13$.
:::
:::

::: exercise Predicting grafts {level=2}
Predict the results of the following experiments in *Xenopus*, and explain each. (a) *chordin* mRNA is injected into a ventral blastomere at the 4-cell stage. (b) The organiser is removed at the early gastrula stage. (c) An animal cap is cultured intact; another is dissociated into single cells for three hours and then reaggregated. (d) *BMP4* mRNA is injected into the dorsal side.
::: solution
(a) A secondary axis on the ventral side, with neural tissue and somites: Chordin blocks BMP ventrally, mimicking the organiser (though without a full head, which also needs Wnt and Nodal antagonists). (b) A ventralised embryo, lacking notochord, somites and nervous system, because BMP is unopposed. (c) The intact cap forms epidermis; the dissociated cells form neural tissue, because the BMP they secrete is diluted away — the evidence for the default model. (d) Reduced dorsal structures (a smaller nervous system and loss of dorsal mesoderm), because the extra BMP overwhelms the organiser's antagonists.
:::
:::

::: exercise A threshold model of the ectoderm {level=3}
In the model of the BMP activity figure, BMP activity is $A(x) = 1/(1 + Ce^{-x/\lambda})$, where $x$ is the distance from the organiser. Neural plate forms where $A < 0.5$. (a) Show that the neural plate extends to $x_N = \lambda\ln C$. (b) For $\lambda = 100$ µm and $C = 20$, how far does it extend? (c) If the organiser's output of antagonist doubles, by how much does the neural plate widen? (d) Why might a frog embryo injected with extra *chordin* mRNA dorsally have an enlarged nervous system?
::: solution
(a) $A < 0.5 \iff 1 + Ce^{-x/\lambda} > 2 \iff Ce^{-x/\lambda} > 1 \iff x < \lambda\ln C$.

(b) $x_N = 100\ln20 = 100\times3.00 = 300$ µm.

(c) Doubling $C$ gives $x_N = \lambda\ln(2C)$, an increase of $\lambda\ln2 = 69$ µm — the same logarithmic dose dependence as for any exponential gradient ([[developmental-biology/axis-formation]]).

(d) More Chordin blocks BMP over a wider region, lowering BMP activity below the neural threshold further ventrally, so more ectoderm becomes neural plate. Such embryos (and those with excess Noggin) indeed develop enlarged neural plates and heads, while BMP overexpression has the opposite effect.
:::
:::

::: exercise Interpreting a laser-ablation experiment {level=3}
In sea-urchin embryos, the archenteron normally invaginates to about one third of the way across the blastocoel, then extends to reach the animal pole. In embryos in which the secondary mesenchyme cells at the tip are ablated by laser after the first phase, the archenteron reaches about two thirds of the way and stops. In embryos in which the ablation is done before invagination, a short archenteron still forms. (a) What can you conclude about the forces responsible for each phase? (b) What other observation would support a role for convergent extension in the archenteron?
::: solution
(a) The first phase (invagination to about a third) does not depend on the secondary mesenchyme: it is driven by the vegetal plate itself — apical constriction and other shape changes of its cells. The extension from about a third to two thirds occurs without the tip cells, so it is driven by the archenteron wall itself, through cell rearrangement. Only the final third requires the filopodia of the secondary mesenchyme, which pull the tip to the animal pole. Gastrulation here is the sum of several independent mechanisms acting in sequence, each testable by removing one.

(b) Counting cells around the circumference of the archenteron during extension: if it narrows from many cells around to few, with the total number of cells roughly constant and little cell division, the lengthening must come from rearrangement — convergent extension. Labelling individual cells and following their neighbours would show intercalation directly.
:::
:::
