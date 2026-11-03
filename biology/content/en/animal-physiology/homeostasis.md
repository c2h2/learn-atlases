A shore crab caught in a rock pool at low tide may find itself, within a few hours, in sea water diluted by rain to half its usual salt concentration, then back in full-strength sea water as the tide returns. A camel in the Sahara can go a week without drinking while the air around it reaches 45 °C. An emperor penguin incubates its egg through the Antarctic winter at −40 °C and keeps its own body near 38 °C. Yet the cells inside each of these animals work in a fluid whose temperature, salt concentration, pH and oxygen content change only a little. How do animals keep their insides so much steadier than their surroundings, and why do some of them not bother?

This chapter introduces the ideas that run through the whole course: the **internal environment** of an animal, the **feedback control** that keeps it within limits, the distinction between animals that regulate a variable and those that let it follow the environment, and the **comparative method**, which uses the diversity of animals to learn how physiology works and how it evolved. The molecular machinery of sensing and signalling, receptors, second messengers and kinase cascades, is in [[cell-biology/cell-signalling]]; here we look at whole animals and the logic of their control systems.

## The internal environment

The cells of a multicellular animal are not bathed by the outside world. They are bathed by **extracellular fluid**, and they exchange materials with the outside only through specialised surfaces: gills, lungs, gut, kidneys and skin. The French physiologist Claude Bernard made this the central idea of physiology. In his *Introduction à l'étude de la médecine expérimentale* (1865) and later lectures he argued that complex animals live in two environments, the external *milieu extérieur* and the *milieu intérieur*, the fluid around their cells, and that "the constancy of the internal environment is the condition for a free and independent life".

::: definition Body-fluid compartments {#def-compartments}
The water of an animal's body is divided by cell membranes and capillary walls into compartments:

- **intracellular fluid** (ICF), the cytosol and organelle contents of all cells;
- **extracellular fluid** (ECF), everything outside the cells, comprising the **interstitial fluid** that bathes the cells and, in animals with a closed circulation, the **plasma** of the blood;
- in animals with an open circulation (most arthropods and molluscs) there is no separation between blood and interstitial fluid, and the single extracellular fluid is called **haemolymph**.

The **internal environment** is the extracellular fluid. Its composition is set by exchange with the cells on one side and with the outside world, through the exchange surfaces, on the other.
:::

In an adult human about 60 % of the body mass is water; about two-thirds of it is intracellular, and of the extracellular third roughly a quarter is plasma and three-quarters interstitial fluid. The proportions differ between species and with fatness (adipose tissue holds little water), but the pattern is general: most of an animal's water is inside its cells, and the extracellular fluid is a thin film around them that turns over rapidly.

Intracellular and extracellular fluids have very different compositions. In a mammal the ECF contains about 140–145 mmol L⁻¹ Na⁺, about 4–5 mmol L⁻¹ K⁺ and about 100–110 mmol L⁻¹ Cl⁻, whereas the cytosol contains about 140 mmol L⁻¹ K⁺ and only 10–15 mmol L⁻¹ Na⁺. These differences are maintained by the Na⁺/K⁺-ATPase and other transporters and are the source of the membrane potential ([[cell-biology/membrane-transport]]). Osmotically, however, the two compartments are almost equal: water crosses most cell membranes easily, so cells shrink or swell until their internal osmotic concentration matches that of the ECF. Controlling the **osmolality** of the ECF therefore controls cell volume throughout the body, which is one reason it is regulated so closely.

| fluid | Na⁺ (mmol L⁻¹) | K⁺ (mmol L⁻¹) | Cl⁻ (mmol L⁻¹) | osmolality (mOsm kg⁻¹) |
|---|---|---|---|---|
| sea water (35 ‰ salinity) | about 470 | about 10 | about 550 | about 1000 |
| marine mussel haemolymph | close to sea water | slightly above sea water | close to sea water | about 1000 |
| marine teleost plasma | about 180 | about 5 | about 160 | about 350–400 |
| mammalian plasma | about 145 | about 4 | about 105 | about 290 |
| fresh water (typical lake) | < 1 | < 0.1 | < 1 | < 10 |

(Representative values; individual species and preparations differ.) The table already shows the two strategies of this chapter. A marine mussel lets its body fluids match sea water; a marine fish keeps its plasma at about a third of the osmolality of the sea around it, and pays to do so, as we shall see in [[animal-physiology/water-salt-balance]].

::: example Measuring a compartment by dilution {#ex-dilution}
The volume of a body-fluid compartment is measured by the **indicator-dilution principle**: inject a known amount of a marker that spreads through that compartment and no other, wait for it to mix, and measure its concentration. A 300 g laboratory rat is injected with 30 mg of a polysaccharide marker that distributes through the extracellular fluid but does not enter cells. After mixing, and correcting for the small amount excreted, its plasma concentration is 0.50 mg mL⁻¹. In a second experiment, heavy water (D₂O), which mixes with all body water, gives a total body water of 180 mL. Find the ECF and ICF volumes and express them as percentages of body mass.
::: solution
Volume $=$ amount $/$ concentration. ECF $= 30\ \text{mg} / 0.50\ \text{mg mL}^{-1} = 60$ mL, which is 20 % of the 300 g body mass (taking 1 mL of water as 1 g). Total body water is 180 mL, or 60 % of body mass, so the ICF is $180 - 60 = 120$ mL, 40 % of body mass. Two-thirds of the water is inside cells and one-third outside, the same proportions as in a human. The method assumes that the marker is confined to the compartment, is fully mixed, and is neither metabolised nor (after correction) excreted; markers that leak slowly into cells overestimate the ECF.
:::
:::

## Homeostasis and feedback

Bernard's idea was given its modern name by the American physiologist Walter Cannon, who in 1926 coined **homeostasis** and analysed it in a long review, "Organization for physiological homeostasis" (1929), and in *The Wisdom of the Body* (1932). Cannon chose *homeo-* ("similar") rather than *homo-* ("same") on purpose: the internal environment is not held perfectly constant, but within limits, by processes that act whenever it starts to drift.

::: definition Homeostasis and its control loop {#def-homeostasis}
**Homeostasis** is the maintenance of a variable of the internal environment within a limited range despite disturbances from outside or from the animal's own activity. A homeostatic control system has:

- a **regulated variable** (for example core body temperature, plasma osmolality, blood glucose concentration, arterial O₂ partial pressure);
- **sensors** (receptors) that measure it;
- an **integrator** or controller, usually in the nervous or endocrine system, that compares the measurement with a reference value, the **set point**, and computes an **error signal**;
- **effectors** (muscles, glands, transport epithelia) whose activity changes the variable.

In **negative feedback** the effectors act to reduce the error: a deviation in one direction produces a response that pushes the variable back in the other direction.
:::

Body temperature in a mammal is the textbook case. Thermoreceptors in the skin, spinal cord and hypothalamus signal temperature to the preoptic area of the hypothalamus. If core temperature falls, the hypothalamus drives effectors that conserve and produce heat: constriction of skin blood vessels, erection of fur or feathers, shivering and non-shivering thermogenesis. If it rises, it drives skin vasodilation, sweating or panting. The details are in [[animal-physiology/thermoregulation]]; what matters here is the structure, which is the same for glucose, osmolality and blood gases.

::: intuition A thermostat with a twist
A home thermostat is the usual analogy, and it captures the loop: sensor, set point, comparison, heater. Two differences are worth keeping in mind. A thermostat is an on–off switch; physiological controllers are mostly **graded**, producing a correction that grows with the size of the error. And a house has one heater, while an animal usually has several effectors recruited in sequence, cheapest first: a cold mammal first constricts its skin vessels and fluffs its fur, which cost almost nothing, and only shivers, which costs a great deal of fuel, when those are not enough.
:::

### Proportional control and its error

How well does a negative-feedback loop work? The simplest quantitative model treats the correction as proportional to the error. Let $x$ be the regulated variable and $x_0$ its set point, and let $e = x - x_0$ be the error. A sustained disturbance $D$ would, on its own, shift the variable by $D$ (a cold wind that would lower body temperature by 2 °C if nothing were done). The control system responds with a correction $-Ge$ proportional to the error, where the dimensionless number $G$ is the **loop gain**.

::: proposition Steady-state error and speed of proportional control {#prop-gain}
Suppose that without control the error relaxes to the disturbance $D$ with time constant $\tau$, so that $\tau\,\deriv{e}{t} = -e + D$, and that the controller adds a correction $-Ge$. Then

$$
\tau\,\deriv{e}{t} = -e + D - Ge = -(1+G)\,e + D,
$$ {#eq-loop}

and, starting from $e(0) = 0$,

$$
e(t) = \frac{D}{1+G}\left(1 - \mathrm{e}^{-(1+G)t/\tau}\right).
$$ {#eq-loop-solution}

The error settles to the **steady-state error** $e_\infty = D/(1+G)$, a fraction $1/(1+G)$ of what it would be without control, and it gets there with the shorter time constant $\tau/(1+G)$.

Assumptions: a linear system with a single time constant, a correction that depends only on the present error and acts instantly, and effectors that do not saturate. Real loops have delays, several effectors and limits, so the formula describes the behaviour near the set point, not in extreme conditions.
:::

::: proof
Equation [[#eq-loop]] is linear and first order. Its equilibrium, where $\deriv{e}{t} = 0$, is $e_\infty = D/(1+G)$. Writing $u = e - e_\infty$ gives $\tau\,\deriv{u}{t} = -(1+G)u$, whose solution is $u(t) = u(0)\,\mathrm{e}^{-(1+G)t/\tau}$ with $u(0) = -e_\infty$. Adding back $e_\infty$ gives [[#eq-loop-solution]].
:::

Two conclusions follow. First, a proportional controller **never removes the error completely**: some error must remain, because the correction is driven by the error itself. The higher the gain, the smaller the residual error. Second, feedback makes the response faster as well as smaller. Both are general properties of negative feedback, and both are what an animal gains by investing in sensors and effectors.

::: widget plot
f: 2*(1 - exp(-x/30)); 2/(1+G)*(1 - exp(-(1+G)*x/30))
x: 0, 120
y: 0, 2.2
sliders: G=4:0:30:1
labels: \text{no control}; \text{proportional control, gain } G
hlines: 2
caption: The error $e$ (vertical axis, °C) after a sustained disturbance $D = 2$ °C is applied at time 0 (horizontal axis, minutes), from [[#eq-loop-solution]] with an uncontrolled time constant $\tau = 30$ min. The upper curve is the system without control; the lower curve has proportional control with the loop gain $G$ set by the slider. Raise $G$ and notice two things: the final error $D/(1+G)$ shrinks, and the curve reaches its plateau sooner. At $G = 0$ the two curves coincide.
:::

::: example Estimating a loop gain {#ex-gain}
A small mammal in a chamber is exposed to a step fall in air temperature. From its heat loss and heat capacity, physiologists estimate that, with all its regulatory responses blocked, its core temperature would eventually fall by 2.0 °C, with a time constant of 30 min. In the intact animal, core temperature falls by only 0.10 °C. (a) What is the loop gain of temperature regulation over this range? (b) What is the time constant of the regulated response? (c) How long does the intact animal take to complete 95 % of its small change?
::: solution
(a) From [[#prop-gain]], $e_\infty = D/(1+G)$, so $1 + G = 2.0/0.10 = 20$ and $G = 19$.

(b) The time constant is $\tau/(1+G) = 30/20 = 1.5$ min.

(c) A first-order response reaches 95 % of its final value after $\ln 20 \approx 3.0$ time constants, here $3.0 \times 1.5 = 4.5$ min (against 90 min for the uncontrolled system). The numbers are illustrative, but they show the order of magnitude of good physiological regulation: gains of tens, residual errors of a few per cent of the disturbance, and responses within minutes.
:::
:::

### Integral control, delays and oscillation

If a proportional controller always leaves an error, how do some variables return exactly to their set point after a sustained disturbance? The answer is that the correction can depend on the error accumulated over time, not only on its present value. In **integral control** the effector output grows as long as any error persists, and stops changing only when the error is zero. Hormonal systems often behave this way, because a hormone concentration builds up while secretion exceeds clearance. The short program below compares the two kinds of control on the model of [[#prop-gain]].

```python
# Proportional (P) and proportional-integral (PI) control of a first-order system.
# x is the deviation of the regulated variable from its set point (degC);
# without control:  tau * dx/dt = -x + D
tau = 30.0   # min, time constant of the uncontrolled system
D = 2.0      # degC, sustained disturbance
G = 9.0      # dimensionless proportional loop gain
Ki = 0.5     # min^-1, integral gain
dt, T = 0.01, 240.0   # min

x_p = x_pi = integral = 0.0
for step in range(int(T / dt)):
    x_p += dt / tau * (-x_p + D - G * x_p)
    integral += x_pi * dt
    x_pi += dt / tau * (-x_pi + D - G * x_pi - Ki * integral)

print(f"P only:  error after {T:.0f} min = {x_p:.3f} degC (theory D/(1+G) = {D/(1+G):.3f})")
print(f"P + I:   error after {T:.0f} min = {x_pi:.3f} degC")
# P only:  error after 240 min = 0.200 degC (theory D/(1+G) = 0.200)
# P + I:   error after 240 min = 0.000 degC
```

High gain has a price. Every real loop has **delays**: nerve conduction, hormone transport and clearance, the time for blood to circulate from an effector to a sensor. A strong correction based on stale information overshoots, the overshoot produces a strong correction in the other direction, and the variable oscillates. This is why many physiological variables show damped oscillations after a disturbance, and why some, such as the breathing pattern of animals with long circulation delays, can oscillate spontaneously. Control theory, developed for engineering and applied to physiology from Norbert Wiener's *Cybernetics* (1948) onwards, makes the trade-off precise: gain buys accuracy and speed, delay limits how much gain a loop can use.

### Feedforward and positive feedback

Negative feedback acts only after an error has appeared. Animals also act in advance. In **feedforward** (anticipatory) control an effector responds to a signal that predicts a disturbance rather than to the disturbance itself. Cold receptors in the skin trigger shivering before core temperature has fallen; the sight, smell and taste of food trigger the release of insulin before glucose is absorbed (the cephalic phase of secretion); and dehydrated animals stop drinking long before the water they have swallowed has been absorbed and diluted their blood, because receptors in the mouth, throat and stomach meter the volume drunk. Feedforward reduces the error that feedback would otherwise have to correct, but it can only be as good as the prediction, so it is always backed by feedback.

In **positive feedback** a deviation produces a response that increases the deviation. That sounds like the opposite of homeostasis, and it is: positive feedback is used for events that must run to completion quickly, not for holding a variable steady. When a nerve membrane is depolarised, voltage-gated Na⁺ channels open, Na⁺ enters, and the membrane depolarises further, giving the all-or-none action potential ([[neuroscience/action-potential]]). During birth in mammals, stretch of the cervix triggers release of oxytocin, which strengthens uterine contractions, which stretch the cervix further. Blood clotting is a cascade in which activated enzymes activate more of themselves. In each case something ends the cycle: Na⁺ channels inactivate, the offspring is delivered, the clot forms and the damaged surface is sealed. Positive feedback without a terminator is a runaway.

::: quiz
When a mammal is warmed, it sweats or pants; the evaporation cools it, and sweating decreases as its temperature returns towards normal. Which description is correct?
- [ ] Positive feedback, because the response increases when the temperature increases.
- [x] Negative feedback, because the response opposes the deviation that caused it.
- [ ] Feedforward, because sweating starts before the temperature changes.
- [ ] Not feedback at all, because evaporation is a physical process.
::: solution
"Negative" refers to the effect of the response on the error, not to the direction in which the response changes. A rise in temperature increases evaporative cooling, which lowers temperature: the response opposes the deviation, so this is negative feedback. Positive feedback would be a response that pushed the temperature further up.
:::
:::

### Set points that move

Set points are not fixed. Body temperature in many mammals follows a daily rhythm of about 1 °C; it is lowered by several tens of degrees in hibernation ([[animal-physiology/thermoregulation]]); and it is raised during **fever**, when signals from the immune system act on the hypothalamus. An animal with a fever shivers and seeks warmth while its temperature is rising, although it is already warmer than normal, because its temperature is below the new set point. Ectotherms show the same response by behaviour: desert iguanas (*Dipsosaurus dorsalis*) infected with the bacterium *Aeromonas hydrophila* selected warmer places, raising their body temperature by about 2 °C, and infected lizards prevented from doing so died more often (Matthew Kluger and colleagues, 1975). Changes of this kind, in which the regulated level itself is adjusted, are sometimes called **rheostasis** or, when they anticipate a predictable demand, **allostasis**.

Sometimes the regulated variable is not the obvious one. The blood pH of many ectotherms is not held at a fixed value: it rises by roughly 0.015 pH units for each degree that body temperature falls. The neutral pH of water also rises as temperature falls, by a similar amount, and the result is that the fractional ionisation of the imidazole groups of histidine residues in proteins stays nearly constant — the **alphastat hypothesis** of Robert Reeves (1972). What is regulated, on this view, is the charge state of proteins, and pH changes in order to keep it constant.

::: warning "Homeostasis means keeping everything constant"
Homeostasis keeps a few variables within limits, and it does so by letting others change. To keep its core temperature constant in the cold, a mammal lets its skin and feet cool almost to freezing and raises its metabolic rate several-fold. To keep plasma osmolality constant, it varies urine volume a hundredfold. Regulated variables also fluctuate around their set points, with daily rhythms and with activity, and the set points themselves are adjusted. A fixed, perfectly constant internal environment exists in no animal, and many animals do not regulate many variables at all, as the next section shows.
:::

::: application When control fails
Many human diseases can be understood as failures of a homeostatic loop: a sensor that no longer detects, an effector that no longer responds, or a set point that has moved. In type 1 diabetes, the insulin-secreting cells that act as both sensor and effector of glucose regulation are destroyed, and glucose is no longer held in range; in type 2 diabetes the tissues respond less to insulin, so the loop gain falls. The clinical physiology of body fluids and their regulation is in [Medicine Atlas: homeostasis and body fluids](/learn/medicine/lesson.php?c=physiology&l=homeostasis-body-fluids); this course stays with the comparative picture.
:::

## Regulators and conformers

Homeostasis costs energy. Pumping ions against a gradient, making heat, and running sensors and controllers all consume ATP. An animal does not have to pay that cost for every variable, and many do not. For any environmental variable we can ask whether an animal keeps its internal value steady as the external value changes, or lets it follow.

::: definition Regulators and conformers {#def-regulator}
For a given variable, an animal is a **regulator** if it keeps the internal value nearly constant over a range of external values, and a **conformer** if its internal value changes with, and approximately equals or parallels, the external value. Applied to body temperature these become **endotherm/ectotherm** (strictly, regulators and conformers of temperature by physiological means); applied to osmotic concentration, **osmoregulator** and **osmoconformer**. Many animals are regulators over part of the range of a variable and conformers over the rest, and an animal can regulate one variable while conforming in another.
:::

Plotting the internal value against the external value makes the distinction visible. A perfect conformer lies on the line of equality, slope 1. A perfect regulator lies on a horizontal line, slope 0. Real animals lie between, and the slope over a given range measures how strongly they regulate.

::: widget plot
f: x; 300; 300 + b*(x - 300)
x: 0, 1200
y: 0, 1200
sliders: b=0.5:0:1:0.05
labels: \text{conformer (internal = external)}; \text{perfect regulator}; \text{partial regulator, slope } b
vlines: 1000
caption: Internal osmolality (vertical axis, mOsm kg⁻¹) against the osmolality of the external water (horizontal axis) for three idealised animals. The conformer follows the line of equality; the perfect regulator holds 300 mOsm kg⁻¹ whatever the external value; the partial regulator has slope $b$, set by the slider. The vertical line marks full-strength sea water. Real animals usually conform over part of the range and regulate over another, so their curves bend; try $b$ between 0.3 and 0.6 for a typical estuarine crab in dilute sea water.
:::

Marine invertebrates give classic examples. The spider crabs and most other marine crabs that live offshore are **osmoconformers**: their haemolymph has nearly the osmolality of sea water, and if the water is diluted their body fluids dilute too, until they die. The shore crab *Carcinus maenas*, which lives in estuaries and rock pools, conforms in full-strength sea water but **hyperosmoregulates** in dilute sea water, keeping its haemolymph more concentrated than the medium by taking up Na⁺ and Cl⁻ actively across its gills. That ability, and its cost, lets it live where the conformers cannot.

::: example Reading a regulation curve {#ex-crab}
Haemolymph osmolality was measured in two crab species after a day in sea water of different dilutions. Representative values (mOsm kg⁻¹) are:

| external | 1000 | 750 | 500 | 300 |
|---|---|---|---|---|
| species A | 1010 | 900 | 780 | 660 |
| species B | 1005 | 760 | 510 | dead |

(a) Classify each species. (b) Calculate the slope of internal against external osmolality for species A between 300 and 750 mOsm kg⁻¹, and interpret it. (c) Which species would you expect to find in an estuary?
::: solution
(a) Species B follows the line of equality within a few mOsm kg⁻¹: it is an osmoconformer, and it does not survive the most dilute medium. Species A conforms in full-strength sea water (1010 against 1000) but holds its haemolymph well above the medium as it is diluted: it is a hyperosmoregulator in dilute media.

(b) Slope $= (900 - 660)/(750 - 300) = 240/450 = 0.53$. For every 1 mOsm kg⁻¹ the medium is diluted, the haemolymph is diluted by only about half as much. Species A is a partial regulator: its internal environment still changes, but its cells experience about half the osmotic change outside, a change they can compensate for by adjusting their own content of small organic solutes.

(c) Species A, which tolerates and regulates against dilution, as estuarine crabs such as *Carcinus maenas* do. The numbers here are illustrative, of the kind measured for estuarine and offshore crabs.
:::
:::

Conformity is not failure. A conformer saves the cost of regulation and can be very successful where its environment is stable: the open ocean changes little in salinity, and the deep sea little in temperature. Conformers also often compensate *at the cellular level*. An osmoconforming mussel whose haemolymph is diluted keeps its cells from swelling by releasing intracellular amino acids and other organic osmolytes, and an ectothermic fish living in cold water has enzymes that work faster at low temperature than those of its warm-water relatives. Regulating the internal environment and protecting cells against a changing internal environment are two solutions to the same problem.

## Acclimation and adaptation

Animals respond to a changed environment on several time scales, and physiologists distinguish them carefully because they have different mechanisms.

::: definition Time scales of physiological response {#def-acclimation}
- An **acute response** occurs within seconds to hours, using mechanisms the animal already has (vasoconstriction, panting, changes in breathing).
- **Acclimation** is a reversible change in physiology over days to weeks in response to a change in one environmental variable imposed in the laboratory; **acclimatisation** is the equivalent change in the field, where many variables change together (the seasons). Both involve changes in gene expression and tissue structure within an individual's lifetime.
- **Developmental plasticity** is an irreversible or long-lasting change caused by conditions during development.
- **Evolutionary adaptation** is a genetically based difference between populations or species, produced by natural selection over generations.
:::

A goldfish kept at 30 °C for some weeks tolerates higher temperatures than one kept at 10 °C, and is killed by cold that the cold-acclimated fish survives; F. E. J. Fry and colleagues mapped these shifting limits of thermal tolerance in fish in the 1940s. That is acclimation. Fish from polar seas, by contrast, cannot acclimate to warm water at all: many Antarctic notothenioid fishes die at a few degrees above 0 °C. That is the result of evolutionary history. To separate the two in a field comparison, physiologists raise animals from different populations under identical conditions for one or more generations (**common-garden** experiments): differences that persist are likely to be genetic; differences that disappear were plastic.

## The comparative method

Animal physiology is comparative in two senses. It uses particular animals as tools to study general mechanisms, and it compares species to understand how physiology has adapted to environments.

The first use was stated by the Danish physiologist August Krogh in 1929: "For a large number of problems there will be some animal of choice, or a few such animals, on which it can be most conveniently studied." Hans Krebs later called this the **August Krogh principle**. The squid giant axon, up to about 1 mm in diameter, made it possible for Alan Hodgkin and Andrew Huxley to put an electrode inside a nerve fibre and work out the ionic basis of the action potential. The large, few nerve cells of the sea slug *Aplysia* let Eric Kandel trace learning to changes at identified synapses. The frog sartorius muscle, the dog's pancreas, the insect's salivary gland and the desert rodent's kidney have each played this role. Choosing the right animal is often the decisive step in a physiological discovery.

The second use asks whether a trait is an adaptation. If birds living at high altitude have haemoglobins with higher oxygen affinity than their lowland relatives, that suggests the trait evolved for life in thin air ([[animal-physiology/gas-exchange]]). But such comparisons need care. Species are not independent data points: related species share traits by common descent, not because each evolved them separately. Ten species of seal all diving well tell us about one evolutionary origin of diving ability, not ten.

::: example Why phylogeny matters {#ex-phylogeny}
A physiologist compares ten mammal species, five from deserts and five from wet habitats, and finds that the desert species produce much more concentrated urine. It turns out that all five desert species are rodents of one family, and all five wet-habitat species are from a different order. How many independent comparisons of desert and wet habitats does the data set contain, and what would a better design be?
::: solution
Effectively only one. All five desert species may share their kidneys from a common ancestor in which the trait evolved once, and all five wet-habitat species may share theirs; a difference between the two groups could equally reflect any other difference between the two lineages, such as body size or diet. The comparison has, in effect, a sample size of one. A better design compares **pairs** of closely related species that differ in habitat — a desert and a wet-habitat rodent from the same genus, a desert and a wet-habitat marsupial, a desert and a wet-habitat bird — so that each pair is an independent evolutionary contrast. Formal methods that do this along a phylogenetic tree, starting with Joseph Felsenstein's independent contrasts (1985), are now standard.
:::
:::

A further caution is that not every difference is an adaptation. A trait may be a by-product of body size, a constraint of ancestry, or the consequence of a different trait that was selected. Physiologists therefore test adaptive explanations in several ways: by showing that the trait improves performance in the relevant environment, by comparing independent evolutionary origins, and, increasingly, by experimental evolution in the laboratory, where populations of fruit flies, mice or microbes are selected for a physiological trait and the responses are measured directly.

::: history
Claude Bernard set out the idea of the internal environment in lectures from the 1850s, in his *Introduction à l'étude de la médecine expérimentale* (1865) and in his last lectures (1878). Walter Cannon coined *homeostasis* in 1926 and developed it in 1929 and in *The Wisdom of the Body* (1932), drawing on his studies of the sympathetic nervous system and the adrenal medulla in cats. Norbert Wiener's *Cybernetics* (1948) brought the mathematics of feedback control from engineering into biology. August Krogh stated his principle of the "animal of choice" in a lecture published in 1929; Hans Krebs named it in 1975. Comparative physiology became a field of its own in the mid-twentieth century through the work of Krogh, Per Scholander, Laurence Irving, C. Ladd Prosser and Knut Schmidt-Nielsen, and it acquired statistical methods for comparing species after Joseph Felsenstein's 1985 paper on phylogenies and the comparative method.
:::

## Where this leads

The control loop of this chapter will reappear in every system: temperature in [[animal-physiology/thermoregulation]], blood gases in [[animal-physiology/gas-exchange]], blood pressure in [[animal-physiology/circulation]], osmolality and volume in [[animal-physiology/water-salt-balance]], and glucose, growth and reproduction in [[animal-physiology/endocrine-control]]. Before that, [[animal-physiology/energy-metabolism]] asks how much all of this costs, and how the cost depends on the size of the animal.

::: summary
- Cells live in the extracellular fluid, Bernard's *milieu intérieur*; most body water is intracellular, and cell volume follows the osmolality of the ECF.
- Homeostasis (Cannon) keeps regulated variables within limits through sensors, an integrator with a set point, and effectors acting by negative feedback.
- Proportional control leaves a steady-state error $D/(1+G)$ and speeds the response by a factor $1+G$ ([[#prop-gain]]); integral control removes the error; delays limit the usable gain and cause oscillation.
- Feedforward acts on predictions of disturbance; positive feedback drives self-terminating events such as action potentials, birth and clotting.
- Set points move (daily rhythms, fever, hibernation), and the regulated variable may not be the obvious one (alphastat pH regulation).
- Regulators hold an internal variable steady; conformers let it follow the environment and often protect their cells instead. Many animals regulate over part of a range only.
- Acute responses, acclimation, developmental plasticity and evolutionary adaptation act on different time scales; common-garden experiments separate plastic from genetic differences.
- The Krogh principle chooses the best animal for a problem; comparisons between species must account for shared ancestry.
:::

## Exercises

::: exercise Dilution of a marker {level=1 check="250"}
A 1.0 kg fish is injected with 15 mg of a marker that distributes through the extracellular fluid only. After mixing, the plasma concentration is 0.060 mg mL⁻¹. What is the ECF volume in millilitres?
::: solution
$15\ \text{mg} / 0.060\ \text{mg mL}^{-1} = 250$ mL, or 25 % of body mass — a typical value for a teleost fish.
:::
:::

::: exercise Residual error {level=1 check="0.2"}
A disturbance would change a regulated variable by 5.0 units in the absence of control. If the loop gain is 24, what is the steady-state error, in the same units?
::: solution
By [[#prop-gain]], $e_\infty = D/(1+G) = 5.0/25 = 0.2$.
:::
:::

::: exercise Kinds of control {level=1}
Classify each as negative feedback, positive feedback or feedforward, and give your reason. (a) A rise in plasma osmolality increases secretion of antidiuretic hormone, which reduces water loss in the urine. (b) A lizard moves into the shade when its body temperature reaches 38 °C. (c) A rat begins to secrete insulin when it smells food. (d) The rising concentration of oestradiol from a growing ovarian follicle triggers a surge of luteinising hormone, which completes the maturation of the follicle and causes ovulation.
::: solution
(a) Negative feedback: the response (water conservation) lowers the osmolality that triggered it. (b) Negative feedback acting through behaviour: high body temperature triggers a behaviour that lowers it. (c) Feedforward: insulin is released before glucose rises, in response to a cue that predicts it. (d) Positive feedback: oestradiol stimulates the LH surge, which drives further follicle maturation; the cycle ends with ovulation, after which the follicle becomes a corpus luteum and the hormonal pattern changes ([[animal-physiology/endocrine-control]]).
:::
:::

::: exercise A gain from time constants {level=2 check="19"}
When a regulatory reflex is blocked pharmacologically, a variable responds to a step disturbance with a time constant of 40 min. With the reflex intact the time constant is 2.0 min. Assuming the model of [[#prop-gain]], what is the loop gain? What fraction of the disturbance remains as steady-state error?
::: solution
The controlled time constant is $\tau/(1+G)$, so $1 + G = 40/2.0 = 20$ and $G = 19$. The steady-state error is $1/(1+G) = 1/20 = 5$ % of the disturbance. Measuring the speeding of the response is thus a way of estimating gain without measuring the error itself, provided the single-time-constant model holds.
:::
:::

::: exercise Alphastat regulation {level=2 check="7.67"}
A freshwater turtle has an arterial pH of 7.40 at 37 °C. If its blood pH follows the alphastat rule, rising by 0.016 units for each degree fall in temperature, what pH would you expect at 20 °C (two decimal places)? Explain why this is not acidosis or alkalosis.
::: solution
$\Delta T = -17$ °C, so pH $= 7.40 + 0.016 \times 17 = 7.40 + 0.27 = 7.67$. The neutral point of water itself rises as temperature falls (pN is about 6.8 at 37 °C and about 7.1 at 20 °C), and the p$K$ of histidine imidazole groups rises similarly, so the blood is equally far on the alkaline side of neutrality and the charge on proteins is unchanged. Judging the turtle by the mammalian standard of 7.40 would be a mistake: the regulated quantity is the ionisation state of proteins, not the pH number.
:::
:::

::: exercise Interpreting a field comparison {level=2}
Fiddler crabs from a northern population have a higher metabolic rate at 20 °C than crabs of the same species from a southern population, measured on animals collected in summer. Give two explanations that differ in mechanism, and design an experiment to distinguish them.
::: solution
(1) **Acclimatisation**: the northern crabs have experienced colder conditions and have adjusted their enzyme levels and mitochondrial density, a plastic response that would disappear if they lived in the south. (2) **Genetic adaptation**: the populations have diverged genetically, so that northern crabs have a higher metabolic rate at a given temperature whatever conditions they experience (a pattern called countergradient variation, which compensates for the slowing effect of cold). To distinguish them, rear crabs from both populations from eggs (or acclimate adults for several weeks) under identical laboratory conditions at several temperatures — a common-garden experiment. If the difference persists in animals raised identically, especially in the second generation (which removes maternal effects), it is genetic; if it disappears, it was plastic. Both can contribute.
:::
:::

::: exercise Choosing the animal {level=2}
For each problem, suggest the kind of animal a physiologist might choose under the Krogh principle, and say why. (a) The mechanism by which kidneys make concentrated urine. (b) How muscle contraction is switched on by calcium. (c) The physiology of breath-hold diving. (d) Whether metabolic rate can evolve in response to selection.
::: solution
Many answers are possible; what matters is the reasoning. (a) A desert rodent such as a kangaroo rat or a gerbil, whose kidneys concentrate urine very strongly, exaggerating the mechanism and making it easier to measure. (b) Large single muscle fibres, such as the giant fibres of barnacles, which allow injection of calcium indicators and electrodes into one cell; frog muscle has also been widely used because it survives well in vitro at room temperature. (c) A seal, such as the Weddell seal, which dives for long periods and can be studied from isolated breathing holes in the ice, so that it must return to the same place. (d) An animal with a short generation time that can be bred in large numbers, such as a laboratory mouse or a fruit fly, in a selection experiment with replicate selected and control lines.
:::
:::

::: exercise Oscillation from delay {level=3}
A physiologist models a regulated variable in discrete time steps: at each step the effector applies a correction equal to $-G$ times the error measured **one step earlier**, so that $e_{n+1} = e_n - G\,e_{n-1}$ in the absence of disturbance. (a) Starting from $e_0 = e_1 = 1$, compute $e_2$ to $e_6$ for $G = 0.2$ and for $G = 0.8$. (b) Describe the difference. (c) What does this suggest about the evolution of loop gain in systems with long delays?
::: hint
Just iterate the recursion. For (c), think about what an animal would gain and lose by a higher gain.
:::
::: solution
(a) For $G = 0.2$: $e_2 = 1 - 0.2 = 0.8$, $e_3 = 0.8 - 0.2 = 0.6$, $e_4 = 0.6 - 0.16 = 0.44$, $e_5 = 0.44 - 0.12 = 0.32$, $e_6 = 0.32 - 0.088 = 0.232$. For $G = 0.8$: $e_2 = 1 - 0.8 = 0.2$, $e_3 = 0.2 - 0.8 = -0.6$, $e_4 = -0.6 - 0.16 = -0.76$, $e_5 = -0.76 + 0.48 = -0.28$, $e_6 = -0.28 + 0.608 = 0.328$.

(b) With low gain the error decays smoothly towards zero. With high gain it overshoots, changes sign and oscillates, because each correction is based on an error that has already changed. (The characteristic equation $\lambda^2 - \lambda + G = 0$ has complex roots for $G > 1/4$, giving oscillation; for $G > 1$ the roots have modulus greater than 1 and the oscillation grows.)

(c) In loops with long delays, high gain is destabilising, so selection should favour moderate gain plus other strategies: feedforward control based on predictions, faster sensing (shorter delay), or several effectors acting on different time scales. Physiological systems with long delays, such as hormonal control, do typically show damped oscillations after a disturbance.
:::
:::

::: exercise Why positive feedback needs an end {level=3}
Explain, for the action potential and for blood clotting, what terminates the positive-feedback cycle. Then explain why positive feedback could not by itself maintain a variable within a range, using a simple model $\deriv{e}{t} = +k\,e$ with $k > 0$.
::: solution
In the action potential, depolarisation opens Na⁺ channels, which depolarises further; the cycle is ended by **inactivation** of the Na⁺ channels a millisecond or so after they open and by the slower opening of voltage-gated K⁺ channels, which repolarise the membrane ([[neuroscience/action-potential]]). In clotting, each activated protease activates more; the cycle is limited by the consumption of the precursors at the wound, by inhibitors circulating in the plasma, and by the dilution of activated factors by flowing blood away from the wound, so the clot stays local. In the model, $\deriv{e}{t} = ke$ gives $e(t) = e(0)\,\mathrm{e}^{kt}$: any deviation, however small, grows exponentially until something else limits it. There is no stable value except $e = 0$, which is unstable. Positive feedback therefore amplifies and accelerates a change; holding a variable within a range requires negative feedback.
:::
:::

::: exercise Conformers in a changing world {level=3}
Osmoconforming marine invertebrates have dominated the open oceans for hundreds of millions of years, yet few are found in estuaries or fresh water. Using the ideas of this chapter, explain (a) why conforming is a good strategy in the open ocean, (b) what problems a conformer faces in an estuary, and (c) why hyperregulation in fresh water costs more energy than in brackish water.
::: solution
(a) The salinity of the open ocean varies very little, so an animal whose fluids match sea water faces no osmotic gradient and needs to spend nothing on salt and water balance; the saving can go into growth and reproduction. (b) In an estuary the salinity changes with tides and rainfall, sometimes within hours. A conformer's body fluids would follow it, so its cells would be exposed to large osmotic changes; it must either compensate within cells (adjusting organic osmolytes, which takes time and has limits), close up and wait (as mussels do by shutting their shells), or regulate. (c) The animal must take up ions actively to replace those lost by diffusion. The diffusive loss is proportional to the concentration difference between body fluids and the medium, and the free energy needed to move each ion inward increases with the logarithm of the concentration ratio. In fresh water, with internal concentrations hundreds of times those outside, both the loss and the cost per ion are much larger than in brackish water. That is why freshwater animals also reduce their permeability and produce dilute urine ([[animal-physiology/water-salt-balance]]).
:::
:::
