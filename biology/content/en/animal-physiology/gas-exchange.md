Bar-headed geese migrate between the lowlands of India and their breeding grounds on the Tibetan Plateau, crossing passes of the Himalaya at altitudes where the air holds only about half the oxygen it does at sea level. A Weddell seal dives under the Antarctic ice for half an hour on one breath. A trout in a cold stream extracts most of the oxygen from water that contains thirty times less of it than air. A beetle has no lungs and no blood-borne oxygen carrier at all, and oxygen reaches its flight muscles by diffusion through air-filled tubes. Each of these animals must move oxygen from the environment to its mitochondria, and carbon dioxide back, at the rate its metabolism demands ([[animal-physiology/energy-metabolism]]).

This chapter explains the physics that sets the problem — diffusion, partial pressures and solubility — and the solutions animals have evolved: skin, gills, lungs and tracheae for exchange with the environment, and respiratory pigments such as haemoglobin for carrying oxygen in the blood. The circulation that moves the blood is the subject of [[animal-physiology/circulation]].

## The physics of gas exchange

Gases move across exchange surfaces by **diffusion**, from high to low partial pressure; no animal transports oxygen actively. (August and Marie Krogh settled this in 1910, showing that the O₂ partial pressure in the alveolar air of the lung is always higher than in arterial blood, against the then-popular theory that lungs secrete oxygen.) Diffusion is fast over short distances and hopelessly slow over long ones, and that single fact shapes every respiratory system.

::: definition Partial pressure, solubility and capacitance {#def-partial-pressure}
In a gas mixture, the **partial pressure** of a gas is the pressure it would exert if it alone filled the volume: for O₂ in dry air at sea level, $P_{\mathrm{O_2}} = 0.2095 \times 101.3\ \text{kPa} = 21.2$ kPa. A liquid in equilibrium with a gas phase is said to have the same partial pressure. The concentration of a dissolved gas is proportional to its partial pressure (**Henry's law**), $C = \beta P$, where the **capacitance coefficient** $\beta$ (mmol L⁻¹ kPa⁻¹) depends on the gas, the liquid and the temperature. For air, treated as an ideal gas, $\beta = 1/RT$, about 0.41 mmol L⁻¹ kPa⁻¹ at 20 °C; for O₂ in water at 20 °C, $\beta \approx 0.013$ mmol L⁻¹ kPa⁻¹, about 30 times lower. CO₂ is about 25–30 times more soluble in water than O₂.
:::

Gases diffuse down gradients of partial pressure, not of concentration, which is why physiologists use partial pressures throughout: at equilibrium between air and blood the partial pressures are equal although the concentrations are very different.

::: proposition Fick's law for gas exchange {#prop-fick}
The rate $\dot M$ (mol s⁻¹) at which a gas diffuses across a barrier of area $A$ and thickness $x$, with a partial-pressure difference $\Delta P$ across it, is

$$
\dot M = K\,\frac{A\,\Delta P}{x},
$$ {#eq-fick}

where $K = D\beta$ is **Krogh's diffusion constant**, the product of the diffusion coefficient $D$ of the gas in the barrier material and its capacitance coefficient. The law assumes steady state and a uniform barrier; it is the gas-exchange form of Fick's first law ([[cell-biology/membrane-transport#prop-fick]]). An exchange surface can increase its flux by increasing its area, decreasing its thickness, or increasing the partial-pressure difference across it (by ventilating one side and perfusing the other).
:::

Equation [[#eq-fick]] lists the design variables of every respiratory organ. Gills and lungs have enormous areas; their barriers are typically 0.5–10 µm thick; and their two sides are continuously renewed, by ventilation with water or air and by perfusion with blood, so that $\Delta P$ is kept large.

### How far can diffusion supply a tissue?

How large can an animal be if it relies on diffusion alone, with no circulation and no ventilation? The question has a clean answer for a sphere.

::: proposition The diffusion limit of a sphere {#prop-sphere}
Consider a sphere of radius $R$ of tissue that consumes O₂ at a uniform rate $\dot m$ (mol m⁻³ s⁻¹), with diffusion coefficient $D$, and whose surface is held at O₂ concentration $C_0$. At steady state the concentration at distance $r$ from the centre is

$$
C(r) = C_0 - \frac{\dot m}{6D}\,(R^2 - r^2),
$$ {#eq-sphere}

so the centre, the lowest point, has $C(0) = C_0 - \dot m R^2/6D$. The whole sphere is supplied only if $C(0) \ge 0$, that is if

$$
R \le R_\mathrm{max} = \sqrt{\frac{6 D C_0}{\dot m}}.
$$ {#eq-rmax}

Assumptions: steady state, uniform consumption that does not depend on concentration (true for mitochondria down to very low $P_{\mathrm{O_2}}$), uniform $D$, and no internal convection. Equivalently, in partial pressures, $R_\mathrm{max} = \sqrt{6K P_0/\dot m}$.
:::

::: proof
In a spherically symmetric steady state, the O₂ diffusing inwards across a sphere of radius $r$ must equal the consumption inside it: $4\pi r^2 D\,\deriv{C}{r} = \tfrac43\pi r^3 \dot m$. Hence $\deriv{C}{r} = \dot m r/3D$. Integrating from $r$ to $R$ with $C(R) = C_0$ gives $C_0 - C(r) = \dot m (R^2 - r^2)/6D$, which is [[#eq-sphere]]. Setting $C(0) \ge 0$ gives [[#eq-rmax]].
:::

::: example The size limit of a diffusion-supplied animal {#ex-sphere}
Tissue metabolising at 1 W kg⁻¹ (a modest rate for an ectotherm) consumes O₂ at about $\dot m = 2.2\times10^{-3}$ mol m⁻³ s⁻¹. If its surface is in contact with water equilibrated with air at 20 °C ($C_0 = 0.28$ mol m⁻³) and $D = 2.0\times10^{-9}$ m² s⁻¹, what is the largest spherical animal that diffusion alone could supply? What happens to this radius if the metabolic rate is ten times higher?
::: solution
$R_\mathrm{max} = \sqrt{6 \times 2.0\times10^{-9} \times 0.28 / 2.2\times10^{-3}} = \sqrt{1.53\times10^{-6}}\ \text{m} = 1.2\times10^{-3}$ m, about 1.2 mm. With a tenfold higher rate, $R_\mathrm{max}$ falls by $\sqrt{10} = 3.2$, to about 0.4 mm. (The derivation of $\dot m$: 1 W kg⁻¹ $\div$ 20.1 kJ L⁻¹ $= 5.0\times10^{-5}$ L O₂ s⁻¹ kg⁻¹, $\div$ 22.4 L mol⁻¹ $= 2.2\times10^{-6}$ mol s⁻¹ kg⁻¹, $\times$ 1000 kg m⁻³.) Animals that rely on diffusion are therefore either tiny (rotifers, small worms), flat (flatworms, a few millimetres long but less than a millimetre thick), or have low metabolic rates and much non-living material (jellyfish, whose jelly consumes almost no O₂). Everything larger needs a respiratory organ and a circulation.
:::
:::

::: widget plot
f: 0.28 - 0.1833*(R^2 - x^2); 0
x: 0, 2
y: -0.4, 0.3
sliders: R=1:0.2:2:0.02
labels: \text{O}_2\text{ concentration (mol m}^{-3}\text{)}; \text{zero}
vlines: 1.24
caption: Steady-state O₂ concentration (vertical axis, mol m⁻³) against distance from the centre (horizontal axis, mm) inside a sphere of radius $R$ (slider, mm) of tissue with the properties of [[#ex-sphere]], from [[#eq-sphere]]. Only the part of the curve with $x \le R$ is meaningful; the surface is at 0.28 mol m⁻³. The vertical line marks $R_\mathrm{max} = 1.24$ mm. Increase $R$ beyond it and the curve dips below zero at the centre: in reality the core becomes anoxic, which the simple formula cannot describe. The parabolic profile means that doubling the radius quadruples the drop in concentration.
:::

### Water versus air

Water and air are very different media to breathe.

| property (20 °C) | air | water | ratio |
|---|---|---|---|
| O₂ content at equilibrium with air | 8.7 mmol L⁻¹ | 0.28 mmol L⁻¹ | about 30 |
| diffusion coefficient of O₂ | $2.0\times10^{-5}$ m² s⁻¹ | $2.0\times10^{-9}$ m² s⁻¹ | about 10,000 |
| density | 1.2 kg m⁻³ | 1000 kg m⁻³ | about 800 |
| viscosity | $1.8\times10^{-5}$ Pa s | $1.0\times10^{-3}$ Pa s | about 55 |

A water breather must move a medium that is 800 times denser and 55 times more viscous to obtain the same oxygen, and in which O₂ diffuses 10,000 times more slowly, so that the layer of water next to the gill becomes depleted unless it is constantly replaced. The O₂ content of water also falls with rising temperature and salinity, and water can be nearly anoxic in stagnant swamps, in the depths of stratified lakes and in sediments. Water breathers therefore spend a much larger fraction of their metabolism on ventilation than air breathers, and they move water in one direction across their gills rather than in and out.

::: example Breathing water or air {#ex-ventilation}
A 1 kg trout at 15 °C consumes 3.0 mmol O₂ h⁻¹; the water contains 0.30 mmol O₂ L⁻¹, and the gills extract 60 % of it. A 1 kg mammal with a metabolic rate of 3.4 W consumes about 27 mmol O₂ h⁻¹; the air it breathes contains 8.2 mmol O₂ L⁻¹ at 37 °C, of which it extracts 20 %. Calculate the ventilation each needs, in litres per hour, and the mass of medium each must move.
::: solution
Trout: $3.0/(0.30 \times 0.60) = 16.7$ L h⁻¹ of water, a mass of 16.7 kg h⁻¹. Mammal: $27/(8.2 \times 0.20) = 16.5$ L h⁻¹ of air, a mass of about 0.02 kg h⁻¹. The volumes are almost the same, although the fish uses nine times less O₂, because water holds thirty times less O₂ per litre. The mass of medium moved differs by a factor of 800. That is why water breathers rely on high extraction (countercurrent gills), on unidirectional flow, and on low metabolic rates.
:::
:::

A second consequence concerns CO₂. A fish ventilating its gills heavily to get enough O₂ washes out CO₂ easily, because CO₂ is so much more soluble in water; its blood $P_{\mathrm{CO_2}}$ is typically only a few tenths of a kilopascal. An air breather ventilates far less volume and retains CO₂ at a $P_{\mathrm{CO_2}}$ ten times higher (about 5 kPa in mammals). Water breathers therefore regulate their breathing mainly by sensing O₂, and air breathers mainly by sensing CO₂ and pH. The transition from water to land in vertebrate evolution required a corresponding change in acid–base regulation.

## Respiratory organs

::: definition Types of respiratory organ {#def-organs}
- **Cutaneous exchange**: gas exchange across the general body surface, important in small animals, many amphibians and some fishes; the lungless salamanders (family Plethodontidae, the largest family of salamanders) rely entirely on skin and the lining of the mouth.
- **Gills**: evaginations of the body surface, ventilated with water; external (larval amphibians, many annelids and molluscs) or enclosed in a chamber (fishes, crustaceans).
- **Lungs**: invaginations of the body, ventilated with air (or, in some cases, water); either **diffusion lungs**, which exchange air with the environment mainly by diffusion (some snails, scorpions and spiders' book lungs), or **ventilation lungs**, which are actively pumped (vertebrates).
- **Tracheae**: a branching system of air-filled tubes that carry gas directly to the tissues (insects, some other arthropods).
:::

### Fish gills and countercurrent exchange

A teleost fish has four gill arches on each side, each carrying two rows of gill filaments, and each filament carrying hundreds of thin, plate-like **secondary lamellae**, where the exchange takes place. Water is pumped over the gills by the coordinated action of the mouth (buccal) and opercular cavities, so that flow over the gills is nearly continuous and one-way. Fast-swimming fishes such as tunas and mackerel simply swim with their mouths open (**ram ventilation**) and many cannot ventilate any other way.

Within each lamella, blood flows in the direction opposite to the water. This **countercurrent** arrangement ([[animal-physiology/thermoregulation#def-countercurrent]]) keeps a $P_{\mathrm{O_2}}$ difference between water and blood along the whole length of the lamella, so blood leaving the gill can reach a $P_{\mathrm{O_2}}$ higher than that of the water leaving it. In a concurrent arrangement the two would at best equilibrate halfway. Fish gills commonly extract 50–80 % of the O₂ from the water passing over them; a mammal's lungs extract about 20 % of the O₂ in inspired air.

### Mammalian lungs: a ventilated pool

Mammalian lungs are tidal: air moves in and out of the same airways, which branch about 23 times (in humans) before ending in hundreds of millions of alveoli. The alveolar gas is a **ventilated pool**, only partly renewed with each breath, because the last air breathed out remains in the airways (the **dead space**) and is breathed in again first. The O₂ partial pressure in the alveoli is therefore lower than in the outside air (about 13–14 kPa rather than 21 kPa at sea level), and arterial blood can at best equilibrate with alveolar gas. The blood–gas barrier in mammals is extraordinarily thin, about 0.2–0.6 µm in most species, and its area, measured by Ewald Weibel and colleagues using stereology, scales almost in proportion to body mass, being largest relative to body size in the most aerobic species.

### Bird lungs: one-way flow

Birds solved the problem of the ventilated pool differently. Their lungs are small, rigid and do not change volume. Ventilation is driven by a system of thin-walled **air sacs**, which act as bellows, and air flows through the gas-exchanging tubes of the lung, the **parabronchi**, in the same direction during both inspiration and expiration. Blood capillaries run across the parabronchi at an angle (a **crosscurrent** arrangement), so that blood leaving the lung can have a higher $P_{\mathrm{O_2}}$ than the air leaving it, as in a countercurrent system, although less efficiently. Avian air capillaries are tiny and their blood–gas barrier is thinner than that of mammals of the same size. These features let birds sustain flight, the most energetically demanding form of locomotion, and fly at altitudes where mammals of the same size are incapacitated. Unidirectional airflow is not unique to birds: C. G. Farmer and Kent Sanders (2010) found it in the lungs of American alligators, and it has since been described in monitor lizards and iguanas, which suggests that it evolved long before birds, possibly in the common ancestor of archosaurs or even earlier.

### Insect tracheae

Insects take a radically different approach: they do not use blood to carry oxygen. Air enters through **spiracles** along the sides of the body, which can be opened and closed, and passes into **tracheae**, tubes lined with cuticle, which branch into **tracheoles** less than a micrometre in diameter that reach into individual cells, sometimes indenting the membranes of flight muscle cells next to the mitochondria. The final steps are diffusion in air (fast) and through tissue (slow, but only over a few micrometres). Krogh showed in 1920 that diffusion along the tracheae is sufficient to supply small, resting insects; larger and more active insects also ventilate the tracheae by pumping movements of the abdomen, and some compress parts of the tracheal system rhythmically, as revealed by X-ray imaging of living beetles, ants and crickets (M. W. Westneat and colleagues, 2003).

Many resting insects breathe in bursts: their spiracles stay closed for long periods, flutter partly open, then open widely to release accumulated CO₂ — the **discontinuous gas-exchange cycle**. Its function is still debated; the main hypotheses are that it reduces water loss, that it helps gas exchange in burrows with high CO₂, and that it limits oxidative damage by keeping tissue $P_{\mathrm{O_2}}$ low.

Because the tracheal system's capacity depends on diffusion over the length of the tubes, it has been suggested that tracheae limit the maximum size of insects. The giant dragonfly-like insects of the late Carboniferous and early Permian, such as *Meganeura*, with wingspans of about 70 cm, lived when atmospheric O₂ is estimated to have been higher than today (perhaps about 30 %), and Jeffrey Graham and colleagues (1995) proposed a causal link. Experiments rearing insects under raised O₂ have given mixed results, and the hypothesis remains debated.

::: warning "Insects breathe through their blood like we do" and "fish gills work like lungs in water"
In insects, the haemolymph has little role in carrying oxygen (most insects have no respiratory pigment); oxygen travels as gas through the tracheal system to the tissues. And fish gills are not simply lungs in water: they are ventilated one-way, with countercurrent blood flow, and they extract a much larger fraction of the O₂ available. A lung, by contrast, is a tidal pool. A fish taken out of water suffocates not because its gills cannot extract O₂ from air, which is richer in O₂ than water, but because the gill filaments and lamellae, unsupported by water, collapse and stick together, losing most of their area.
:::

## Respiratory pigments

The dissolved O₂ in blood is very small: at an arterial $P_{\mathrm{O_2}}$ of 13 kPa, human plasma holds only about 3 mL O₂ per litre, while the whole blood holds about 200 mL per litre, nearly all of it bound to **haemoglobin**. Respiratory pigments increase the O₂-carrying capacity of blood many-fold and buffer its $P_{\mathrm{O_2}}$, so that large amounts of O₂ can be unloaded at tissue partial pressures that still drive diffusion into cells.

Four main types are known.

| pigment | O₂-binding site | colour (oxygenated / deoxygenated) | where found | location |
|---|---|---|---|---|
| haemoglobin | iron in haem | red / purple-red | vertebrates, many annelids, some molluscs, insects (e.g. chironomid larvae), crustaceans | in red cells (vertebrates) or dissolved |
| haemocyanin | two copper atoms | blue / colourless | many molluscs (including cephalopods), many arthropods (crustaceans, horseshoe crabs, spiders) | dissolved in haemolymph |
| haemerythrin | two non-haem iron atoms | violet-pink / colourless | sipunculans, brachiopods, some annelids | in cells |
| chlorocruorin | iron in a modified haem | green (dilute) / red (concentrated) | some polychaete annelids | dissolved |

Haemocyanins and the dissolved haemoglobins of annelids are enormous multisubunit molecules, which keeps them from being lost through the kidneys and from raising the colloid osmotic pressure of the blood as much as the same number of small molecules would.

::: definition The oxygen-equilibrium curve {#def-oec}
The **oxygen-equilibrium curve** (or dissociation curve) of a respiratory pigment plots its fractional **saturation** $S$ (the fraction of binding sites occupied by O₂) against $P_{\mathrm{O_2}}$. Its **P₅₀** is the $P_{\mathrm{O_2}}$ at which $S = 0.5$; a lower P₅₀ means **higher affinity**. Pigments with several interacting binding sites, such as tetrameric vertebrate haemoglobin, show **cooperative** binding, with a sigmoid curve; monomeric pigments such as myoglobin give a hyperbolic curve.
:::

::: proposition The Hill equation for oxygen binding (empirical) {#prop-hill-o2}
Over the middle range of saturation (roughly 20–80 %), the oxygen-equilibrium curve of a cooperative pigment is described approximately by

$$
S = \frac{P^{n}}{P_{50}^{\,n} + P^{n}},
$$ {#eq-hill-o2}

where $P$ is $P_{\mathrm{O_2}}$ and $n$ is the **Hill coefficient** ([[cell-biology/cell-signalling#prop-hill]]). For myoglobin $n = 1$; for human haemoglobin $n \approx 2.7$ and $P_{50} \approx 3.5$ kPa under standard conditions (pH 7.4, 37 °C). The Hill coefficient is an empirical index of cooperativity, not the number of binding sites; the full mechanism of cooperative binding is described by allosteric models ([[structural-biology/molecular-machines]]).
:::

A sigmoid curve is what an O₂ carrier needs. In the lungs, where $P_{\mathrm{O_2}}$ is high, the pigment is nearly saturated and small changes in alveolar $P_{\mathrm{O_2}}$ make little difference; in the tissues, the steep middle part of the curve means that a small fall in $P_{\mathrm{O_2}}$ releases a large amount of O₂.

### Shifting the curve

The affinity of haemoglobin is not fixed. It is lowered (the curve shifts right, P₅₀ rises) by:

- lower pH and higher $P_{\mathrm{CO_2}}$ — the **Bohr effect**, described by Christian Bohr, Karl Hasselbalch and August Krogh in 1904 — so that haemoglobin releases more O₂ in active tissues, which are acidic and produce CO₂;
- higher temperature, which likewise promotes unloading in warm, working muscle;
- organic phosphates that bind to deoxyhaemoglobin: **2,3-bisphosphoglycerate** in the red cells of most mammals, ATP and GTP in fishes, inositol pentaphosphate in birds.

In many fishes, low pH not only lowers the affinity of some of their haemoglobins but reduces their maximum O₂-carrying capacity, so that they cannot become fully saturated even at high $P_{\mathrm{O_2}}$: the **Root effect** (Raymond Root, 1931). Combined with a countercurrent capillary network that multiplies the effect, it lets fishes secrete O₂ into the swim bladder against pressures of many atmospheres and supply O₂ to the poorly vascularised retina at high partial pressure.

::: example How much oxygen does haemoglobin unload? {#ex-hill}
Human haemoglobin has $P_{50} = 3.5$ kPa and $n = 2.7$. Arterial blood is at 13 kPa, mixed venous blood at 5.0 kPa, and the blood contains 200 mL O₂ L⁻¹ when fully saturated. (a) Calculate the arterial and venous saturations from [[#eq-hill-o2]] and the O₂ unloaded per litre of blood. (b) In exercising muscle the Bohr effect raises P₅₀ to 4.0 kPa. Repeat the calculation for the same arterial and venous $P_{\mathrm{O_2}}$. (c) What would a non-cooperative pigment ($n = 1$) with the same P₅₀ of 3.5 kPa unload?
::: solution
(a) $S_\mathrm{a} = 13^{2.7}/(3.5^{2.7} + 13^{2.7}) = 0.972$; $S_\mathrm{v} = 5.0^{2.7}/(3.5^{2.7} + 5.0^{2.7}) = 0.724$. Unloaded: $(0.972 - 0.724) \times 200 = 50$ mL O₂ per litre.

(b) With $P_{50} = 4.0$: $S_\mathrm{a} = 0.960$, $S_\mathrm{v} = 0.646$, unloaded $= 0.314 \times 200 = 63$ mL L⁻¹, about a quarter more, at no cost in loading.

(c) With $n = 1$: $S_\mathrm{a} = 13/16.5 = 0.788$, $S_\mathrm{v} = 5.0/8.5 = 0.588$, unloaded $= 0.200 \times 200 = 40$ mL L⁻¹, and the arterial blood would be far from saturated. Cooperativity both loads the pigment fully in the lungs and unloads more in the tissues. (The Hill equation slightly underestimates arterial saturation compared with the measured curve, which flattens near the top.)
:::
:::

::: widget plot
f: x^n/(P^n + x^n); x/(3.5 + x)
x: 0, 15
y: 0, 1
sliders: P=3.5:1:8:0.1; n=2.7:1:4:0.1
labels: \text{haemoglobin (Hill, } P_{50}, n\text{)}; \text{myoglobin-like, } n = 1,\ P_{50} = 3.5
vlines: 5; 13
hlines: 0.5
caption: Oxygen-equilibrium curves from the Hill equation [[#eq-hill-o2]]: fractional saturation (vertical axis) against $P_{\mathrm{O_2}}$ (horizontal axis, kPa). The sliders set the P₅₀ (labelled $P$, kPa) and Hill coefficient $n$ of the first curve; the second is a non-cooperative pigment with P₅₀ 3.5 kPa. The vertical lines mark typical venous (5 kPa) and arterial (13 kPa) partial pressures, and the horizontal line half-saturation. Raise $P$ to mimic the Bohr effect and see the venous saturation fall while the arterial value hardly changes; lower $P$ to 2 kPa for a high-affinity pigment, such as that of an animal living at altitude or of a foetus.
:::

### Pigments matched to environments

Comparisons of respiratory pigments are among the clearest examples of physiological adaptation, because the molecular changes behind them can be identified.

- **Altitude.** Bar-headed geese (*Anser indicus*) have haemoglobin with higher O₂ affinity than their lowland relatives, in part because of a single amino-acid substitution (proline to alanine at position 119 of the α chain) that weakens a contact between subunits (Thomas Jessen and colleagues, 1991). Andean geese reached a similar result by a different substitution. Deer mice (*Peromyscus maniculatus*) living at high altitude in the Rocky Mountains and Andes have higher-affinity haemoglobins than lowland mice, and Jay Storz and colleagues have traced the differences to specific substitutions and tested them in recombinant proteins.
- **Development.** Mammalian foetuses have haemoglobins of higher affinity than their mothers', which favours transfer across the placenta; in humans foetal haemoglobin binds 2,3-BPG weakly.
- **Activity and temperature.** Active fishes tend to have lower-affinity haemoglobins with large Bohr effects; fishes of stagnant, hypoxic water have high-affinity haemoglobins and often breathe air.
- **No pigment at all.** The Antarctic icefishes (family Channichthyidae) have no haemoglobin and almost no red cells, as Johan Ruud reported in 1954. They live in water at about −1.9 °C, which holds more O₂ than warmer water, have low metabolic rates, and compensate with large hearts, high blood volumes and wide capillaries. The loss is probably viable rather than advantageous: their genomes carry remnants of the globin genes.

::: application High altitude and diving
Physiologists study animals that live at altitude or dive deeply partly for what they reveal about adaptation, and partly because of the parallel with human high-altitude populations and with clinical hypoxia. At the summit of Everest the $P_{\mathrm{O_2}}$ of the air is only about 7 kPa, one-third of the sea-level value, yet bar-headed geese fly over the Himalaya, and Tibetan and Andean human populations show distinct genetic adaptations to high altitude ([[genomics/human-variation]]). Diving mammals such as seals store O₂ in blood (with high blood volume and haemoglobin concentration) and in muscle myoglobin, at concentrations up to about ten times that of human muscle; Scott Mirceta and colleagues (2013) found that the myoglobin of diving mammals has evolved an increased net surface charge, which may stop the protein from aggregating at such high concentrations. The human respiratory system and its disorders are in [Medicine Atlas: respiratory](/learn/medicine/course.php?c=respiratory).
:::

::: example How long can a seal dive aerobically? {#ex-dive}
A 400 kg Weddell seal (*Leptonychotes weddellii*) has usable O₂ stores of about 60 mL per kilogram of body mass, mostly in blood and muscle myoglobin. During a dive its metabolic rate is about 1.3 times the Kleiber prediction of BMR. (a) Estimate its aerobic dive limit, the dive duration beyond which it must rely on anaerobic metabolism. (b) Measured aerobic dive limits of Weddell seals are about 20 min (G. L. Kooyman and colleagues, 1980), although they can dive for over an hour. How do they manage the long dives, and what is the cost?
::: solution
(a) O₂ store $= 400 \times 60 = 24\,000$ mL $= 24$ L. Kleiber BMR $= 3.4 \times 400^{0.75} = 304$ W, which is $304/20.1 = 15.1$ mL O₂ s⁻¹, or 0.91 L min⁻¹; diving rate $= 1.3 \times 0.91 = 1.18$ L min⁻¹. Aerobic dive limit $= 24/1.18 = 20$ min.

(b) In long dives the seal slows its heart (bradycardia) and constricts the blood vessels to most organs, reserving the blood's O₂ for the brain and heart, while the muscles use their myoglobin O₂ and then glycolysis, accumulating lactate ([[animal-physiology/circulation]]). After such a dive the seal must stay at the surface for a long time to clear the lactate, so long dives are inefficient: most of the dives seals choose to make are shorter than the aerobic limit. (The numbers in (a) are illustrative but of the right magnitude.)
:::
:::

## Carbon dioxide transport

CO₂ is carried in blood in three forms: dissolved; bound to proteins (mainly as carbamino groups on haemoglobin); and, mostly, as **bicarbonate**. CO₂ entering red cells is hydrated rapidly to carbonic acid by the enzyme carbonic anhydrase; the acid dissociates to H⁺, which is buffered largely by haemoglobin, and HCO₃⁻, which leaves the cell in exchange for Cl⁻ through the anion exchanger (band 3). Deoxygenated haemoglobin binds H⁺ and CO₂ more strongly than oxygenated haemoglobin, so blood takes up more CO₂ as it gives up O₂ in the tissues (the **Haldane effect**), the mirror image of the Bohr effect. In the lungs or gills all these reactions run backwards.

::: quiz
A fish and a mammal are both moved into an environment with lower O₂ but unchanged CO₂. Which prediction is most consistent with how their breathing is controlled?
- [ ] Neither changes ventilation, because both control breathing by CO₂.
- [x] The fish increases ventilation promptly in response to the low O₂; the mammal responds less strongly until $P_{\mathrm{O_2}}$ falls quite far.
- [ ] The mammal responds strongly; the fish does not, because water breathers sense only CO₂.
- [ ] Both reduce ventilation to save energy.
::: solution
Water breathers have low blood $P_{\mathrm{CO_2}}$ and are driven mainly by O₂-sensitive chemoreceptors on the gills, so hypoxia is a strong stimulus. Air breathers are driven mainly by CO₂ and pH; in mammals the hypoxic drive, via the carotid bodies, becomes strong only once arterial $P_{\mathrm{O_2}}$ has fallen substantially, because the haemoglobin curve is flat at high $P_{\mathrm{O_2}}$ and O₂ delivery is little affected until then.
:::
:::

::: history
In the seventeenth century Robert Hooke kept a dog alive by blowing air through its lungs after opening its chest, showing that it is fresh air, not movement of the lungs, that matters, and John Mayow argued that a component of air is consumed in breathing and combustion. Lavoisier identified that component as oxygen in the 1770s. Christian Bohr, Karl Hasselbalch and August Krogh described the effect of CO₂ on haemoglobin's affinity in 1904, and Krogh, with Marie Krogh, showed in 1910 that the lungs work by diffusion alone; Krogh analysed tracheal respiration in insects in 1920 and received the Nobel Prize for his work on capillaries the same year. Max Perutz's structure of haemoglobin (from 1959 to the 1960s) explained cooperativity and the Bohr effect at the atomic level. Johan Ruud described the haemoglobin-free icefishes in 1954, and Ewald Weibel's morphometry from the 1960s onwards quantified the gas-exchange surfaces of animals from shrews to horses.
:::

## Where this leads

Respiratory organs exchange gases with the environment, but the gases must then be carried between those organs and every tissue. How hearts and vessels do this, and how they cope with the demands of exercise and diving, is the subject of [[animal-physiology/circulation]]. Respiratory surfaces also lose water and ions, which links breathing to [[animal-physiology/water-salt-balance]].

::: summary
- Gases move by diffusion from high to low partial pressure; Fick's law $\dot M = KA\Delta P/x$ sets the design of every exchange surface ([[#prop-fick]]).
- Diffusion alone supplies a tissue sphere only up to $R_\mathrm{max} = \sqrt{6DC_0/\dot m}$, about a millimetre ([[#prop-sphere]]); larger animals need respiratory organs and circulation.
- Water holds about 30 times less O₂ than air, is 800 times denser and slows diffusion 10,000-fold: water breathers ventilate one way with countercurrent gills and sense O₂; air breathers retain CO₂ and sense mainly CO₂.
- Mammalian lungs are tidal ventilated pools; bird lungs have unidirectional parabronchial flow with crosscurrent exchange, a pattern also found in crocodilians and some lizards; insects deliver gas through tracheae with no blood transport.
- Respiratory pigments (haemoglobin, haemocyanin, haemerythrin, chlorocruorin) raise O₂ capacity; cooperative binding gives a sigmoid curve described approximately by the Hill equation ([[#prop-hill-o2]]).
- Affinity is lowered by H⁺ and CO₂ (Bohr effect), temperature and organic phosphates; the Root effect lets fish fill swim bladders. Pigment affinities track altitude, development and activity, and icefishes have none.
- CO₂ travels mainly as bicarbonate, with carbonic anhydrase and the Haldane effect.
:::

## Exercises

::: exercise Partial pressure at altitude {level=1 check="11.3"}
At an altitude of 5000 m the barometric pressure is about 54 kPa. What is the $P_{\mathrm{O_2}}$ of dry air there, in kPa (three significant figures)? (O₂ is 20.95 % of dry air at all altitudes.)
::: solution
$0.2095 \times 54 = 11.3$ kPa, about half the sea-level value.
:::
:::

::: exercise Fick's law {level=1 check="2"}
If the thickness of a gas-exchange barrier doubles and its area is unchanged, by what factor must the partial-pressure difference across it increase to keep the same O₂ flux?
::: solution
By [[#eq-fick]], $\dot M \propto A\Delta P/x$. Doubling $x$ requires doubling $\Delta P$: a factor of 2.
:::
:::

::: exercise Saturation from the Hill equation {level=1 check="0.5"}
What is the saturation of a pigment at a $P_{\mathrm{O_2}}$ equal to its P₅₀, whatever its Hill coefficient?
::: solution
$S = P_{50}^n/(P_{50}^n + P_{50}^n) = 1/2$.
:::
:::

::: exercise A flatworm's thickness {level=2 check="1.1"}
A flatworm consumes O₂ at $\dot m = 4.0\times10^{-3}$ mol m⁻³ s⁻¹ and lives in water with $C_0 = 0.28$ mol m⁻³; $D = 2.0\times10^{-9}$ m² s⁻¹. For a flat sheet of thickness $L$ supplied from both faces, the steady-state solution is $C(z) = C_0 - \frac{\dot m}{2D}\left(\frac{L^2}{4} - z^2\right)$ for $-L/2 \le z \le L/2$. What is the maximum thickness in millimetres (two significant figures)? Compare with a sphere of the same tissue.
::: solution
The centre ($z = 0$) has $C = C_0 - \dot m L^2/8D \ge 0$, so $L_\mathrm{max} = \sqrt{8DC_0/\dot m} = \sqrt{8 \times 2.0\times10^{-9} \times 0.28/4.0\times10^{-3}} = \sqrt{1.12\times10^{-6}} = 1.06\times10^{-3}$ m $\approx 1.1$ mm. A sphere has $R_\mathrm{max} = \sqrt{6DC_0/\dot m} = 0.92$ mm, i.e. a diameter of 1.8 mm. A flat sheet can be extended indefinitely in two dimensions, so flatness allows a large body without a circulation, provided it stays about a millimetre thick.
:::
:::

::: exercise Interpreting oxygen-equilibrium curves {level=2}
The P₅₀ values (kPa, at pH 7.4 and 37 °C or the species' body temperature) of haemoglobin from four animals are: llama 2.9; human 3.5; mouse 5.3; trout at 15 °C 2.4. (a) Which has the highest affinity? (b) Suggest why the mouse has a lower affinity than the human, considering body size and metabolic rate. (c) Why might it be misleading to compare the trout's value directly with the mammals'?
::: solution
(a) The trout (lowest P₅₀), then the llama. (b) A mouse has a much higher mass-specific metabolic rate ([[animal-physiology/energy-metabolism]]); a lower affinity lets its haemoglobin unload O₂ at higher tissue $P_{\mathrm{O_2}}$, maintaining a steep gradient for diffusion into the tissues. Across mammals, P₅₀ tends to increase as body size decreases. The llama, from high altitude, has high affinity to load O₂ in thin air. (c) Affinity depends on temperature, pH and organic phosphates, so values measured under different conditions (15 °C for the trout, 37 °C for mammals, with ATP/GTP rather than 2,3-BPG) are not directly comparable; a fair comparison uses each species' in vivo conditions, and asks how the curve relates to the $P_{\mathrm{O_2}}$ values the animal actually encounters at its gills or lungs and in its tissues.
:::
:::

::: exercise A countercurrent gill {level=2}
Water enters a gill at $P_{\mathrm{O_2}}$ = 20 kPa and venous blood enters at 2 kPa. Explain, with a sketch of partial pressure along the length of the exchanger, (a) why in a concurrent arrangement the blood can leave at no more than about 11 kPa, even with a very long exchanger (assume equal capacitance flow rates for simplicity), and (b) how, in a countercurrent arrangement, the blood can leave at nearly 20 kPa. (c) What happens to the advantage if the fish reverses water flow experimentally?
::: solution
(a) In concurrent flow both streams start at the same end; O₂ moves from water to blood, the water $P_{\mathrm{O_2}}$ falls and the blood's rises, and with equal capacitance flow rates they converge on the mean, $(20 + 2)/2 = 11$ kPa, at which point exchange stops. (b) In countercurrent flow, blood about to leave meets fresh water at 20 kPa, and blood entering meets water that has already given up most of its O₂ but is still above 2 kPa; a difference is maintained everywhere, and with a long enough exchanger the blood leaves close to 20 kPa while the water leaves close to 2 kPa. (c) Reversing water flow makes the arrangement concurrent; in classic experiments by G. M. Hughes on tench in the 1960s, reversing flow reduced O₂ extraction from about 50 % or more to about 10 %.
:::
:::

::: exercise Myoglobin and haemoglobin {level=2}
Myoglobin in muscle has P₅₀ ≈ 0.3 kPa and $n = 1$. (a) What is its saturation at 2.0 kPa and at 0.5 kPa? (b) Explain why myoglobin, with its much higher affinity than haemoglobin, helps rather than hinders the movement of O₂ from blood to mitochondria.
::: solution
(a) $2.0/(0.3 + 2.0) = 0.87$; $0.5/(0.3 + 0.5) = 0.63$. (b) Haemoglobin unloads O₂ at capillary $P_{\mathrm{O_2}}$ of a few kPa, at which myoglobin is still mostly saturated, so O₂ moves from haemoglobin into the muscle; inside the fibre, $P_{\mathrm{O_2}}$ falls towards the mitochondria to below 1 kPa, where myoglobin releases its O₂. Myoglobin therefore (1) stores O₂ in muscle, important in diving mammals and in heart muscle between beats, and (2) facilitates diffusion: the gradient of oxymyoglobin concentration across the fibre carries O₂ in parallel with dissolved O₂. The cascade of affinities — haemoglobin lower, myoglobin higher, cytochrome c oxidase highest — means each carrier gives up O₂ to the next.
:::
:::

::: exercise The hoverfly and the giant dragonfly {level=3}
(a) A tracheal tube of length $\ell$, open to the air at one end and closed at the other, supplies tissue spread uniformly along its length, so that the O₂ it must carry past any point is proportional to the length of tube beyond that point. Using an argument like the proof of [[#prop-sphere]], show that the largest $\ell$ that diffusion can supply is proportional to the square root of the $P_{\mathrm{O_2}}$ difference available along the tube. (b) Atmospheric O₂ in the late Carboniferous is estimated to have been about 30 %, compared with 21 % today. If insect size were limited by tracheal diffusion, by roughly what factor could linear dimensions have been larger? (c) Give two reasons why this simple argument may not explain the giant insects of the past.
::: solution
(a) Let $z$ be the distance from the closed end and $q$ the O₂ demand per unit length of tube, per unit cross-section of the tube. At steady state the diffusive flux through the tube at $z$ must supply all the tissue between the closed end and $z$: $K\,\deriv{P}{z} = q z$. Integrating from the closed end ($z = 0$) to the open end ($z = \ell$) gives $\Delta P = q\ell^2/2K$, so $\ell_\mathrm{max} = \sqrt{2K\Delta P/q} \propto \sqrt{\Delta P}$ — the same square-root dependence as for the sphere. (b) If the available $\Delta P$ increases in proportion to atmospheric O₂, $\sqrt{30/21} = 1.2$: tubes, and hence linear dimensions, about 20 % greater. That is far smaller than the difference between *Meganeura* and modern dragonflies (wingspans about 70 cm against about 15–20 cm for the largest today), so diffusion along the tracheae is unlikely to be the whole explanation. (c) Insects ventilate their tracheae actively, so diffusion is not the only transport; tracheal volume can be increased in larger insects, at a cost (it has been shown to scale more than proportionally with size in beetles, constraining the legs), and the decline of giant insects coincides with other changes, such as the evolution of flying vertebrate predators. The hypothesis is debated, and experiments rearing insects at high O₂ have given mixed results.
:::
:::

::: exercise Interpreting a diving record {level=3}
A data logger on a Weddell seal records heart rate and dive duration. In dives of 10 min, heart rate falls from 60 to about 40 beats min⁻¹, and the seal can dive again after 2–3 min at the surface. In a 45 min dive heart rate falls to about 10 beats min⁻¹, and the seal rests at the surface for over an hour afterwards; its blood lactate is high after the dive but not during it. (a) Explain the different responses. (b) Why does lactate appear in the blood only after the dive? (c) What does this tell you about the "aerobic dive limit" as a concept?
::: solution
(a) Short dives are within the aerobic dive limit: O₂ stores in blood, lungs and muscle suffice, a moderate bradycardia and some peripheral vasoconstriction match O₂ use to stores, and recovery requires only re-oxygenation, which is quick. In the long dive the seal exceeds its aerobic stores; it shuts down blood flow to most organs (strong bradycardia, intense vasoconstriction), preserving O₂ for the brain and heart, while muscles and other tissues switch to anaerobic glycolysis. (b) During the dive, the vasoconstricted muscles are cut off from the circulation, so the lactate they produce stays in them; when the seal surfaces and vessels reopen, the lactate washes out into the blood. This was one of the key observations of Scholander (1940) and later of Kooyman and colleagues. (c) The aerobic dive limit is a threshold in behaviour and physiology: dives beyond it are possible but expensive, requiring long recovery that reduces the total time available for foraging. Seals mostly dive within it, which supports the idea that it is a meaningful constraint on their foraging.
:::
:::
