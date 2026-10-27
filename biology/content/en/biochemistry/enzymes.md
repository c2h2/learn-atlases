Almost every chemical reaction in a cell would be far too slow to sustain life without a catalyst. The decarboxylation of orotidine monophosphate, a step in making the pyrimidine nucleotides, has an uncatalysed half-life in water of about 78 million years; the enzyme that catalyses it does the job in milliseconds, a rate enhancement of about $10^{17}$ (A. Radzicka and R. Wolfenden, *Science* 267, 90, 1995). Enzymes make metabolism possible, and because each is the product of a gene, they make it controllable and evolvable: a cell decides what chemistry happens by deciding which enzymes to make and how active to let them be.

This chapter is about enzymes as a biologist uses and meets them: how their activity is measured, what the Michaelis–Menten parameters mean inside a living cell, how isozymes adapt the same reaction to different tissues, how enzymes have evolved to work at the temperatures of their owners, and how inhibitors — natural toxins, herbicides, antibiotics and drugs — exploit them. The physical chemistry of catalysis (transition-state binding, catalytic strategies, the mechanism of the serine proteases and the effect of pH) is developed in [Chemistry Atlas: enzymes](/learn/chemistry/lesson.php?c=biochemistry&l=enzymes).

## What an enzyme is

::: definition Enzyme, cofactor and active site {#def-enzyme}
An **enzyme** is a biological catalyst, almost always a protein (sometimes an RNA, a **ribozyme**), that increases the rate of a specific reaction without being consumed and without changing its equilibrium constant. The substrate binds at the **active site**, a cleft or pocket formed by residues often far apart in the sequence. Many enzymes need a non-protein **cofactor**: a metal ion (Zn²⁺, Mg²⁺, Fe²⁺) or an organic **coenzyme** (NAD⁺, FAD, coenzyme A, pyridoxal phosphate), which may be tightly bound (a **prosthetic group**) or bind and leave like a second substrate.
:::

An enzyme speeds up both directions of a reaction equally, so it cannot make an unfavourable reaction go; it only lets a favourable one reach equilibrium sooner. The direction of metabolic reactions is set by thermodynamics and concentrations ([[biochemistry/bioenergetics]]), and the enzyme decides only whether, and how fast, the reaction happens.

Two features distinguish enzymes from most laboratory catalysts. They are **specific**, often for one substrate among many similar molecules and for one stereoisomer; Emil Fischer's 1894 image of a lock and key captured this, and Daniel Koshland's induced-fit model (1958) refined it by recognising that substrate binding changes the enzyme's shape. And they are **regulated** ([[biochemistry/enzyme-regulation]]).

Enzymes are classified by the International Union of Biochemistry and Molecular Biology into seven classes, identified by the first digit of their EC number: oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases and (since 2018) translocases.

### Vitamins are mostly parts of coenzymes

Animals have lost the ability to make many coenzymes and must eat their precursors, the water-soluble vitamins. This is the biochemical meaning of the word "vitamin".

| vitamin | coenzyme | typical reaction |
|---|---|---|
| thiamine (B₁) | thiamine pyrophosphate | decarboxylation of α-keto acids (pyruvate dehydrogenase) |
| riboflavin (B₂) | FAD, FMN | redox (succinate dehydrogenase) |
| niacin (B₃) | NAD⁺, NADP⁺ | redox (dehydrogenases) |
| pantothenate (B₅) | coenzyme A | acyl-group transfer |
| pyridoxine (B₆) | pyridoxal phosphate | amino-acid transformations (transaminases) |
| biotin (B₇) | biotin, bound to enzyme | carboxylation |
| folate (B₉) | tetrahydrofolate | one-carbon transfer |
| cobalamin (B₁₂) | adenosyl- and methylcobalamin | rearrangements, methyl transfer |

Cobalamin is made only by certain bacteria and archaea; animals obtain it through food chains or from gut microbes, and plants neither make nor need it. Such dependencies trace how metabolic capabilities are distributed through the tree of life. The clinical side of vitamin deficiencies belongs to [Medicine Atlas: cell biology and biochemistry](/learn/medicine/course.php?c=cell-biochemistry).

## Measuring enzyme activity

Everything we know about an enzyme's kinetics comes from **assays**: measuring how fast product appears or substrate disappears under controlled conditions. The workhorse is the **coupled spectrophotometric assay**. NADH absorbs light at 340 nm and NAD⁺ does not, so any reaction that makes or uses NADH, or can be linked to one that does by adding an excess of a second enzyme, can be followed continuously in a spectrophotometer.

::: definition Enzyme activity and specific activity {#def-activity}
The **activity** of an enzyme preparation is the rate at which it converts substrate under defined conditions (temperature, pH, saturating substrate). It is reported in **units**: one unit (U) converts 1 µmol of substrate per minute (the SI unit, the katal, is 1 mol s⁻¹). The **specific activity** is the activity per milligram of protein (U mg⁻¹); it rises as an enzyme is purified from other proteins, and is constant once it is pure.
:::

::: example A coupled NADH assay {#ex-assay}
Lactate dehydrogenase (LDH) activity is measured by its reduction of pyruvate by NADH: $\text{pyruvate} + \text{NADH} + \text{H}^+ \to \text{lactate} + \text{NAD}^+$. To a 1.00 mL cuvette (path length 1.00 cm) containing saturating pyruvate and NADH, 10 µL of a muscle extract is added, and the absorbance at 340 nm falls by 0.124 per minute. The molar absorption coefficient of NADH at 340 nm is $6220\ \mathrm{L\,mol^{-1}\,cm^{-1}}$. What is the LDH activity of the extract in U mL⁻¹?
::: solution
By the Beer–Lambert law, $\Delta A = \varepsilon\,\ell\,\Delta c$, so the rate of NADH consumption is

$$
\frac{\Delta c}{\Delta t} = \frac{0.124\ \mathrm{min^{-1}}}{6220\ \mathrm{L\,mol^{-1}\,cm^{-1}}\times1.00\ \mathrm{cm}} = 1.99\times10^{-5}\ \mathrm{mol\,L^{-1}\,min^{-1}} = 19.9\ \mathrm{\mu mol\,L^{-1}\,min^{-1}}.
$$

In 1.00 mL that is 0.0199 µmol min⁻¹, or 0.0199 U, supplied by 10 µL of extract. The extract therefore contains $0.0199/0.010 = 1.99$ U mL⁻¹. In practice one checks that the rate is proportional to the volume of extract added — the test that the enzyme, not some other component, is limiting.
:::
:::

Assays must measure the **initial rate**, before substrate is depleted, product accumulates (and may inhibit or reverse the reaction) or the enzyme loses activity. The same logic underlies every kinetic analysis in this chapter.

## Michaelis–Menten kinetics

In 1913 Leonor Michaelis and Maud Menten, studying the hydrolysis of sucrose by invertase from yeast, measured initial rates at different sucrose concentrations and found that the rate rose in proportion to substrate at low concentrations but levelled off at high ones. They explained it by a single assumption: the enzyme forms a complex with its substrate before converting it.

::: proposition The Michaelis–Menten equation {#prop-mm}
For the scheme $\mathrm{E} + \mathrm{S} \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} \mathrm{ES} \xrightarrow{k_\mathrm{cat}} \mathrm{E} + \mathrm{P}$, if the concentration of ES is constant (quasi-steady state) and substrate is in large excess over enzyme, the initial rate is

$$
v = \frac{V_{\max}[\mathrm{S}]}{K_\mathrm{m} + [\mathrm{S}]},\qquad V_{\max} = k_\mathrm{cat}[\mathrm{E}]_\mathrm{T},\qquad K_\mathrm{m} = \frac{k_{-1} + k_\mathrm{cat}}{k_1},
$$ {#eq-mm}

where $[\mathrm{E}]_\mathrm{T}$ is the total enzyme concentration. Assumptions: initial rates (no product, so no reverse reaction), $[\mathrm{S}] \gg [\mathrm{E}]_\mathrm{T}$, a single substrate (or other substrates saturating) and a single kind of active site.
:::

::: proof Briggs–Haldane steady state
At steady state, ES forms as fast as it breaks down: $k_1[\mathrm{E}][\mathrm{S}] = (k_{-1} + k_\mathrm{cat})[\mathrm{ES}]$. Writing $[\mathrm{E}] = [\mathrm{E}]_\mathrm{T} - [\mathrm{ES}]$ and solving, $[\mathrm{ES}] = [\mathrm{E}]_\mathrm{T}[\mathrm{S}]/(K_\mathrm{m} + [\mathrm{S}])$ with $K_\mathrm{m}$ as given. The rate is $v = k_\mathrm{cat}[\mathrm{ES}]$, which is [[#eq-mm]]. (G. E. Briggs and J. B. S. Haldane gave this steady-state derivation in 1925; Michaelis and Menten had assumed instead that E, S and ES are at equilibrium, which gives the same form with $K_\mathrm{m} = k_{-1}/k_1$.)
:::

::: definition Turnover number and specificity constant {#def-kcat}
$k_\mathrm{cat}$, the **turnover number**, is the number of substrate molecules one active site converts per second when saturated. $K_\mathrm{m}$, the **Michaelis constant**, is the substrate concentration at which $v = V_{\max}/2$; it is a measure of the substrate concentration the enzyme "works at", and equals the dissociation constant of ES only if $k_\mathrm{cat} \ll k_{-1}$. The ratio $k_\mathrm{cat}/K_\mathrm{m}$, the **specificity constant**, is the second-order rate constant for the reaction of free enzyme with substrate at low substrate concentration, $v = (k_\mathrm{cat}/K_\mathrm{m})[\mathrm{E}][\mathrm{S}]$. It cannot exceed the rate at which enzyme and substrate meet by diffusion, about $10^8$–$10^9\ \mathrm{L\,mol^{-1}\,s^{-1}}$.
:::

Enzymes span an enormous range: carbonic anhydrase turns over about $10^5$–$10^6$ molecules per second, while Rubisco, the enzyme that fixes CO₂ in photosynthesis, manages only a few. Triose phosphate isomerase, whose $k_\mathrm{cat}/K_\mathrm{m}$ is close to the diffusion limit, was called catalytically "perfect" by W. J. Albery and J. R. Knowles (1976): making it faster would not speed up the pathway, because the enzyme already reacts with nearly every substrate molecule that reaches it.

The figure lets you explore [[#eq-mm]] and the effect of inhibitors, which we meet below.

::: widget plot
f: V*x/(K*a + u*x); V*x/(K + x)
x: 0, 20
y: 0, 110
sliders: V=100:10:110:1; K=2:0.2:10:0.1; a=1:1:5:0.1; u=1:1:5:0.1
labels: \text{with inhibitor: } V_{\max}[S]/(\alpha K_\mathrm{m} + \alpha'[S]); \text{no inhibitor}
caption: Initial rate $v$ (per cent of the uninhibited $V_{\max}$ when $V = 100$) against substrate concentration in mmol L⁻¹, from [[#eq-mm]] and [[#eq-inhibition]]. Sliders set $V_{\max}$ ($V$), $K_\mathrm{m}$ ($K$), and the inhibitor factors $\alpha = 1 + [\mathrm{I}]/K_\mathrm{i}$ (a) and $\alpha' = 1 + [\mathrm{I}]/K_\mathrm{i}'$ (u). Raise only $a$: a competitive inhibitor, overcome at high substrate. Raise only $u$: an uncompetitive inhibitor, which lowers both the plateau and the half-saturation point. Raise both equally: pure non-competitive inhibition, with $K_\mathrm{m}$ unchanged and $V_{\max}$ reduced.
:::

### Estimating $K_\mathrm{m}$ and $V_{\max}$

Because [[#eq-mm]] is a hyperbola, it was traditionally linearised. Taking reciprocals gives the **Lineweaver–Burk** (double-reciprocal) plot of Hans Lineweaver and Dean Burk (1934):

$$
\frac{1}{v} = \frac{K_\mathrm{m}}{V_{\max}}\,\frac{1}{[\mathrm{S}]} + \frac{1}{V_{\max}},
$$ {#eq-lb}

a straight line with intercept $1/V_{\max}$ and slope $K_\mathrm{m}/V_{\max}$. It remains useful for seeing at a glance how an inhibitor acts, but it is a poor way to estimate the parameters, because taking reciprocals magnifies the errors of the slowest rates, measured at the lowest substrate concentrations. Modern practice is to fit [[#eq-mm]] directly by non-linear least squares ([[biostatistics/regression]]).

::: example Fitting initial-rate data {#ex-mm-fit}
An enzyme gives the following initial rates (µmol min⁻¹ mg⁻¹):

| [S] (mmol L⁻¹) | 0.5 | 1 | 2 | 4 | 8 |
|---|---|---|---|---|---|
| $v$ | 10.3 | 16.4 | 25.4 | 32.8 | 40.4 |

Estimate $K_\mathrm{m}$ and $V_{\max}$ from a Lineweaver–Burk plot, and compare with a direct non-linear fit, which gives $V_{\max} = 50.2$ and $K_\mathrm{m} = 2.01$ mmol L⁻¹.
::: solution
The reciprocals $(1/[\mathrm{S}], 1/v)$ are $(2, 0.0971)$, $(1, 0.0610)$, $(0.5, 0.0394)$, $(0.25, 0.0305)$, $(0.125, 0.0248)$. A least-squares line through them has slope 0.0386 and intercept 0.0206 (try it in the figure below). So $V_{\max} = 1/0.0206 = 48.5$ µmol min⁻¹ mg⁻¹ and $K_\mathrm{m} = 0.0386\times48.5 = 1.87$ mmol L⁻¹.

The two methods agree within about 7 %, but the double-reciprocal fit is dominated by the point at the lowest [S] (far to the right), where a small error in $v$ becomes a large error in $1/v$. With noisier data the disagreement can be much worse. The direct fit, which weights each measured rate equally, is preferred; the double-reciprocal plot is best kept for display.
:::
:::

::: widget regression
points: 2,0.0971; 1,0.0610; 0.5,0.0394; 0.25,0.0305; 0.125,0.0248
degree: 1
x: 0, 2.2
y: 0, 0.11
caption: Lineweaver–Burk plot of the data in [[#ex-mm-fit]]: $1/v$ against $1/[\mathrm{S}]$, with the least-squares line. Its intercept is $1/V_{\max}$ and its slope $K_\mathrm{m}/V_{\max}$. Drag the right-most point (the lowest substrate concentration) up or down by a small amount and watch the intercept, and hence $V_{\max}$, swing — the reason double-reciprocal fits are unreliable.
:::

## Enzymes in their physiological setting

Michaelis–Menten parameters measured in a test tube become biologically meaningful when compared with the concentrations of substrates in cells. If $[\mathrm{S}] \ll K_\mathrm{m}$, the rate is roughly proportional to [S]: the enzyme responds sensitively to substrate supply and has spare capacity. If $[\mathrm{S}] \gg K_\mathrm{m}$, the enzyme is saturated, and the rate is set by how much enzyme there is. When B. D. Bennett and colleagues measured the absolute concentrations of more than 100 metabolites in *E. coli* (*Nature Chemical Biology* 5, 593, 2009), they found that for a majority of the enzyme–substrate pairs they could compare, the substrate concentration exceeded the $K_\mathrm{m}$ — so many enzymes run near saturation, and the cell's control of flux comes largely from controlling enzyme amounts and activities rather than substrate levels.

### Isozymes: one reaction, several enzymes

Many reactions are catalysed in different tissues, compartments or developmental stages by different, homologous enzymes — **isozymes** (C. L. Markert and F. Møller, 1959), usually encoded by paralogous genes. Their different kinetic properties fit the reaction to the physiology of each tissue.

::: example Hexokinase and glucokinase {#ex-glucokinase}
Most mammalian tissues phosphorylate glucose with hexokinase I, which has $K_\mathrm{m} \approx 0.05$ mmol L⁻¹ for glucose (and is inhibited by its product, glucose 6-phosphate). Liver cells and the insulin-secreting β-cells of the pancreas use glucokinase (hexokinase IV), which is half-saturated at about 8 mmol L⁻¹ glucose with sigmoidal kinetics, $v/V_{\max} = [\mathrm{S}]^{1.7}/(8^{1.7} + [\mathrm{S}]^{1.7})$ (representative values; [[biochemistry/enzyme-regulation]]). Calculate the fractional activity of each enzyme at 5 and 10 mmol L⁻¹ glucose, roughly the blood glucose concentration between and after meals, and explain the physiological sense of the difference.
::: solution
Hexokinase I: $5/(0.05 + 5) = 0.990$ and $10/10.05 = 0.995$ — essentially saturated at both. Glucokinase: $5^{1.7}/(8^{1.7} + 5^{1.7}) = 0.310$ and $10^{1.7}/(8^{1.7} + 10^{1.7}) = 0.594$, almost doubling.

Hexokinase I ensures that tissues such as brain take up glucose at a steady rate whatever the blood level, so long as it is well above 0.05 mmol L⁻¹. Glucokinase's activity tracks the blood glucose concentration across its physiological range, which suits the two tissues that must *respond* to glucose: the liver, which stores excess glucose as glycogen after a meal, and the β-cell, which uses its glucose-phosphorylation rate as a sensor to decide how much insulin to release. Variants of the human glucokinase gene that shift its kinetics alter the glucose concentration the body regulates to ([Medicine Atlas: endocrine](/learn/medicine/course.php?c=endocrine)).
:::
:::

Another classic case is lactate dehydrogenase. Its tetramers are built from two kinds of subunit, H (predominant in heart) and M (in skeletal muscle and liver). The H₄ isozyme is more strongly inhibited by high pyruvate concentrations, which suits aerobic heart muscle that oxidises lactate; the M₄ isozyme suits anaerobic muscle that reduces pyruvate to lactate during bursts of activity ([[biochemistry/glycolysis-tca]]), although the physiological importance of this difference has been debated.

### Competing substrates and specificity

Inside a cell an enzyme is often exposed to several possible substrates at once. Which does it act on?

::: proposition Competition between substrates {#prop-competition}
If two substrates A and B compete for the same active site of an enzyme following Michaelis–Menten kinetics, the ratio of their rates of conversion is

$$
\frac{v_\mathrm{A}}{v_\mathrm{B}} = \frac{(k_\mathrm{cat}/K_\mathrm{m})_\mathrm{A}\,[\mathrm{A}]}{(k_\mathrm{cat}/K_\mathrm{m})_\mathrm{B}\,[\mathrm{B}]},
$$ {#eq-competition}

at any concentrations, saturating or not. Discrimination between competing substrates is therefore governed by the specificity constants, not by $K_\mathrm{m}$ or $k_\mathrm{cat}$ alone.
:::

::: proof
With both substrates present, the free enzyme is shared: $[\mathrm{E}] = [\mathrm{E}]_\mathrm{T}/(1 + [\mathrm{A}]/K_\mathrm{A} + [\mathrm{B}]/K_\mathrm{B})$ by the same steady-state argument as in [[#prop-mm]]. Each rate is $v_\mathrm{X} = (k_\mathrm{cat}/K_\mathrm{m})_\mathrm{X}[\mathrm{E}][\mathrm{X}]$, and the common factor $[\mathrm{E}]$ cancels in the ratio.
:::

::: example Rubisco's oxygen problem {#ex-rubisco}
Rubisco, the carboxylase that fixes CO₂ in the Calvin–Benson cycle, also reacts with O₂, starting the wasteful process of photorespiration. Its CO₂/O₂ **specificity factor** $S_{c/o} = (k_\mathrm{cat}/K_\mathrm{m})_{\mathrm{CO_2}}/(k_\mathrm{cat}/K_\mathrm{m})_{\mathrm{O_2}}$ is about 90 in many C3 plants. In the chloroplast of a C3 leaf in air at 25 °C the dissolved CO₂ is about 8 µmol L⁻¹ and O₂ about 250 µmol L⁻¹ (approximate values). What is the ratio of carboxylation to oxygenation?
::: solution
By [[#eq-competition]], $v_c/v_o = 90\times8/250 = 2.9$: roughly one oxygenation for every three carboxylations. Each oxygenation wastes energy and releases previously fixed CO₂ in photorespiration, so a C3 plant in warm conditions loses a substantial part of its potential photosynthesis. This one ratio has had enormous evolutionary consequences. Rubisco evolved when the atmosphere had little O₂; since O₂ rose, its specificity seems to have been limited by a trade-off between specificity and $k_\mathrm{cat}$ (G. Tcherkez and colleagues, 2006). C4 and CAM plants instead concentrate CO₂ around Rubisco, raising $v_c/v_o$ roughly tenfold ([[biochemistry/metabolic-integration]], [[plant-biology/c4-and-cam]]).
:::
:::

## Temperature and the evolution of enzymes

Most organisms are ectotherms, whose enzymes work at the temperature of their surroundings. Reaction rates rise steeply with temperature, until the enzyme begins to unfold.

::: definition Temperature coefficient {#def-q10}
The **temperature coefficient** $Q_{10}$ of a rate is the factor by which it increases for a 10 °C rise: $Q_{10} = (k_2/k_1)^{10/(T_2 - T_1)}$. For most enzyme-catalysed reactions and for the metabolic rates of whole ectotherms, $Q_{10}$ is about 2–3 within the normal physiological range. It is an empirical summary, not a constant: it follows from the Arrhenius law $k = A\,e^{-E_\mathrm{a}/RT}$ and decreases slowly as temperature rises even when $E_\mathrm{a}$ is constant.
:::

::: example Warming a lizard {#ex-q10}
A lizard's muscle enzyme has activity 2.0 (arbitrary units) at 10 °C and $Q_{10} = 2.3$. (a) What is its activity at 25 °C? (b) What Arrhenius activation energy corresponds to $Q_{10} = 2.3$ between 20 and 30 °C?
::: solution
(a) $2.0\times2.3^{15/10} = 2.0\times3.49 = 6.98$, a three-and-a-half-fold increase — which is why lizards bask before hunting.
(b) $\ln Q_{10} = (E_\mathrm{a}/R)(1/T_1 - 1/T_2)$, so $E_\mathrm{a} = 8.314\times\ln 2.3/(1/293.15 - 1/303.15) = 8.314\times0.833/1.125\times10^{-4} = 61.5\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

Species living at different temperatures have evolved enzymes adapted to them, a subject pioneered by Peter Hochachka and George Somero (*Biochemical Adaptation*, 2002). Three regularities stand out.

- **Conservation of $K_\mathrm{m}$.** Orthologous enzymes from species with different body temperatures tend to have similar $K_\mathrm{m}$ values *when each is measured at its own body temperature*, although their $K_\mathrm{m}$ values differ when measured at a common temperature. Lactate dehydrogenases of Antarctic fishes, temperate fishes and mammals are an example. Holding $K_\mathrm{m}$ near the physiological substrate concentration preserves both catalytic rate and regulatory sensitivity.
- **Higher $k_\mathrm{cat}$ in the cold.** Enzymes of cold-adapted organisms often have higher turnover numbers at low temperature than their warm-adapted homologues, partly compensating for the slowing effect of cold — achieved by greater flexibility of the regions that move during catalysis, at the cost of lower stability.
- **Few changes suffice.** Such differences can come from one or a few amino-acid substitutions, often away from the active site, in regions whose mobility limits the rate.

::: widget plot
f: exp(-E/0.008314*(1/(x + 273.15) - 1/298.15))/(1 + exp((x - m)/2))
x: 0, 70
sliders: E=60:20:100:1; m=45:10:65:1
labels: \text{relative activity}
caption: Relative activity of an enzyme against temperature (°C) for a simple model: Arrhenius acceleration with activation energy $E$ (kJ mol⁻¹, slider), multiplied by the fraction of enzyme still folded, which falls steeply around a midpoint $m$ (°C, slider). Activity is 1 at 25 °C for the folded enzyme. The apparent "optimum" temperature is not a property of the active site but where acceleration and unfolding balance; moving $m$ (a more or less stable protein, as in thermophiles or psychrophiles) moves the optimum with it. Real thermal-performance curves also depend on how long the enzyme is exposed to heat.
:::

::: warning "An enzyme's optimum temperature is the temperature its owner lives at"
The temperature of maximum activity measured in a short assay is usually several degrees, sometimes tens of degrees, above the organism's body temperature, because unfolding is slow on the time scale of an assay. What selection maintains is adequate activity, regulation and stability at the temperatures the organism actually experiences. Equating optimum with habitat temperature also ignores that over longer exposures an enzyme near its "optimum" may be steadily inactivated.
:::

## Inhibitors in biology

Inhibitors are both a tool for studying enzymes and a large part of their biology: plants and microbes defend themselves with enzyme inhibitors, and many herbicides, pesticides, antibiotics and drugs are enzyme inhibitors.

::: proposition Reversible inhibition {#prop-inhibition}
Let an inhibitor I bind reversibly to free enzyme with dissociation constant $K_\mathrm{i}$ and to the enzyme–substrate complex with dissociation constant $K_\mathrm{i}'$. Then

$$
v = \frac{V_{\max}[\mathrm{S}]}{\alpha K_\mathrm{m} + \alpha'[\mathrm{S}]},\qquad \alpha = 1 + \frac{[\mathrm{I}]}{K_\mathrm{i}},\quad \alpha' = 1 + \frac{[\mathrm{I}]}{K_\mathrm{i}'}.
$$ {#eq-inhibition}

A **competitive** inhibitor binds only free enzyme ($\alpha' = 1$): the apparent $K_\mathrm{m}$ rises to $\alpha K_\mathrm{m}$, and $V_{\max}$ is unchanged. An **uncompetitive** inhibitor binds only ES ($\alpha = 1$): both apparent $V_{\max}$ and $K_\mathrm{m}$ fall by $\alpha'$. A **mixed** inhibitor binds both; if $K_\mathrm{i} = K_\mathrm{i}'$ it is called **non-competitive**, and only $V_{\max}$ falls. Derivation and the diagnostic double-reciprocal plots are in [Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=enzymes). Assumptions: those of [[#prop-mm]], with rapid, reversible inhibitor binding.
:::

::: example How much does a competitive inhibitor inhibit? {#ex-inhibitor}
A competitive inhibitor with $K_\mathrm{i} = 1.0$ µmol L⁻¹ is present at 5.0 µmol L⁻¹, and the substrate is at its $K_\mathrm{m}$. What fraction of the uninhibited rate remains? What substrate concentration would restore the rate to half of $V_{\max}$?
::: solution
$\alpha = 1 + 5/1 = 6$. With $[\mathrm{S}] = K_\mathrm{m}$, $v/V_{\max} = K_\mathrm{m}/(6K_\mathrm{m} + K_\mathrm{m}) = 1/7 = 0.143$, against 0.5 without inhibitor: $0.143/0.5 = 28.6$ % of the uninhibited rate remains. Half-maximal rate requires $[\mathrm{S}] = \alpha K_\mathrm{m} = 6K_\mathrm{m}$. In a cell, an enzyme upstream of a competitively inhibited step will often make substrate accumulate, partly overcoming the inhibition — one reason the effect of an inhibitor on a pathway's flux is usually smaller than its effect on the isolated enzyme ([[biochemistry/enzyme-regulation]]).
:::
:::

**Irreversible inhibitors** react covalently with the enzyme. Some are "suicide" substrates that the enzyme itself activates. Penicillin, discovered by Alexander Fleming in 1928 in the mould *Penicillium*, acylates the serine in the active site of the transpeptidases that cross-link bacterial peptidoglycan, killing growing bacteria ([[microbiology/antimicrobials]]).

The deepest principle in the biological use of inhibitors is **selective toxicity**: an inhibitor harms organisms that depend on its target and spares those that lack it.

- **Sulfonamides**, the first synthetic antibacterials (Gerhard Domagk, 1935), are structural analogues of *p*-aminobenzoate and competitively inhibit dihydropteroate synthase in the bacterial folate pathway. Humans do not make folate, but obtain it in food, so they lack the target.
- **Glyphosate**, the world's most widely used herbicide, inhibits EPSP synthase of the shikimate pathway, by which plants, fungi and bacteria make aromatic amino acids. Animals lack the pathway — the same loss that makes Phe and Trp essential amino acids ([[biochemistry/amino-acids-proteins]]). Glyphosate-tolerant crops carry a bacterial EPSP synthase (from *Agrobacterium* strain CP4) that glyphosate binds poorly.
- **Statins** competitively inhibit HMG-CoA reductase, the committed step of cholesterol synthesis; their clinical use is described in [Medicine Atlas: pharmacology](/learn/medicine/course.php?c=pharmacology).

Resistance evolves by the same rules: target-site mutations that lower the inhibitor's affinity more than the substrate's, overproduction of the target, enzymes that destroy the inhibitor (β-lactamases), or pumps that expel it.

::: quiz
An enzyme's activity is measured with and without a compound X at many substrate concentrations. With X, the rate at very high substrate concentration is the same as without it, but more substrate is needed to reach half that rate. What kind of inhibitor is X, and what is the most likely way it binds?
- [x] Competitive; it binds the free enzyme, probably at the active site.
- [ ] Uncompetitive; it binds only the enzyme–substrate complex.
- [ ] Non-competitive; it binds equally well to E and ES at a separate site.
- [ ] Irreversible; it covalently modifies the active site.
::: solution
An unchanged $V_{\max}$ with increased apparent $K_\mathrm{m}$ is the signature of competitive inhibition ($\alpha > 1$, $\alpha' = 1$ in [[#eq-inhibition]]); high substrate outcompetes the inhibitor. Usually this means it binds at the active site, often as a substrate analogue, though binding elsewhere in a way that excludes substrate gives the same kinetics. An irreversible inhibitor would lower $V_{\max}$ by removing active enzyme.
:::
:::

::: application Enzymes in industry and the laboratory
Enzymes from organisms adapted to extreme conditions are used where those conditions occur: heat-stable DNA polymerases from *Thermus aquaticus* and *Pyrococcus* in the polymerase chain reaction; cold-active proteases and lipases from psychrophiles in detergents for low-temperature washing; amylases and glucose isomerase in making high-fructose syrup from starch. Directed evolution — repeated rounds of mutation and selection for activity, pioneered by Frances Arnold (Nobel Prize in Chemistry, 2018) — tunes such enzymes for new substrates and conditions, applying in the laboratory the process that shaped them in nature ([[biotechnology]]).
:::

::: history
Anselme Payen and Jean-François Persoz isolated a starch-digesting preparation, diastase, from malt in 1833. Louis Pasteur held that fermentation required living yeast; in 1897 Eduard Buchner showed that a cell-free juice of ground yeast ferments sugar to ethanol, proving that the chemistry of life can be studied outside the cell (Nobel Prize in Chemistry, 1907). Wilhelm Kühne had coined the word *enzyme* ("in yeast") in 1877. Emil Fischer proposed the lock-and-key model in 1894. Michaelis and Menten published their kinetics in 1913, Briggs and Haldane the steady-state derivation in 1925, and Lineweaver and Burk their plot in 1934. James Sumner crystallised urease in 1926 and showed it was a protein; John Northrop and Wendell Stanley crystallised pepsin and other enzymes (Nobel Prize, 1946, shared with Sumner). Isozymes were named in 1959. Thomas Cech (1982) and Sidney Altman (1983) found that RNA can be an enzyme (Nobel Prize in Chemistry, 1989).
:::

## Where this leads

Enzymes are controlled by allostery, covalent modification and changes in amount — the subject of [[biochemistry/enzyme-regulation]], which also asks how much control any one enzyme exerts over a pathway. The thermodynamics that decides which way an enzyme-catalysed reaction runs is in [[biochemistry/bioenergetics]].

::: summary
- Enzymes accelerate reactions up to $10^{17}$-fold without changing equilibria; many need metal ions or coenzymes, most of which animals make from vitamins.
- Activity is measured by initial-rate assays, often coupled to NADH ($\varepsilon_{340} = 6220\ \mathrm{L\,mol^{-1}\,cm^{-1}}$), in units of µmol min⁻¹; specific activity rises with purification.
- Michaelis–Menten kinetics: $v = V_{\max}[\mathrm{S}]/(K_\mathrm{m} + [\mathrm{S}])$; $k_\mathrm{cat}$ is turnover per site, $k_\mathrm{cat}/K_\mathrm{m}$ the specificity constant (diffusion limit $10^8$–$10^9\ \mathrm{L\,mol^{-1}\,s^{-1}}$). Fit directly; double-reciprocal plots distort errors.
- Isozymes tune a reaction to tissues: hexokinase I is saturated at blood glucose; glucokinase tracks it.
- Competing substrates are discriminated by $k_\mathrm{cat}/K_\mathrm{m}$: Rubisco makes about one oxygenation per three carboxylations in a C3 leaf.
- $Q_{10} \approx 2$–3; enzymes of species from different climates conserve $K_\mathrm{m}$ at their own temperatures and adjust $k_\mathrm{cat}$ and flexibility.
- Reversible inhibitors are competitive, uncompetitive or mixed; selective toxicity (sulfonamides, glyphosate, penicillin) exploits targets present in one organism but absent in another.
:::

## Exercises

::: exercise Fraction of maximal rate {level=1 check="0.2"}
At what fraction of $V_{\max}$ does a Michaelis–Menten enzyme work when $[\mathrm{S}] = K_\mathrm{m}/4$?
::: solution
$v/V_{\max} = (K_\mathrm{m}/4)/(K_\mathrm{m} + K_\mathrm{m}/4) = (1/4)/(5/4) = 0.2$.
:::
:::

::: exercise Turnover number {level=1 check="250"}
A pure enzyme (molar mass 50 kDa, one active site per molecule) has a specific activity of 300 U mg⁻¹ at saturating substrate. What is $k_\mathrm{cat}$ in s⁻¹?
::: solution
1 mg is $10^{-3}/50\,000 = 2.0\times10^{-8}$ mol of enzyme. 300 U is $300\ \mathrm{\mu mol\,min^{-1}} = 5.0\times10^{-6}\ \mathrm{mol\,s^{-1}}$. $k_\mathrm{cat} = 5.0\times10^{-6}/2.0\times10^{-8} = 250\ \mathrm{s^{-1}}$.
:::
:::

::: exercise A purification table {level=1 check="400"}
An enzyme is purified in four steps with the following total protein and total activity: crude extract 2000 mg, 4000 U; ammonium sulfate fraction 400 mg, 3200 U; ion exchange 40 mg, 2400 U; affinity column 2.0 mg, 1600 U. Calculate the specific activity after each step, the overall fold purification and the yield.
::: solution
Specific activities: 2.0, 8.0, 60 and 800 U mg⁻¹. Fold purification $= 800/2.0 = 400$. Yield $= 1600/4000 = 40$ %. If a further step does not raise the specific activity, the enzyme is probably pure (check by SDS-PAGE, [[biochemistry/amino-acids-proteins#ex-sds]]).
:::
:::

::: exercise Glucokinase as a sensor {level=2 check="1.91"}
Using the glucokinase rate law of [[#ex-glucokinase]], by what factor does its rate increase when glucose rises from 5 to 10 mmol L⁻¹ (three significant figures)? By what factor does hexokinase I's rate increase?
::: solution
Glucokinase: $0.594/0.310 = 1.91$. Hexokinase I: $0.995/0.990 = 1.005$. Only glucokinase reports a change in blood glucose.
:::
:::

::: exercise Specificity and Rubisco {level=2 check="28.8"}
In the bundle-sheath cells of a C4 leaf, the CO₂ concentration around Rubisco is raised about tenfold, to roughly 80 µmol L⁻¹, while O₂ stays at about 250 µmol L⁻¹. Using $S_{c/o} = 90$, what is the ratio of carboxylation to oxygenation (three significant figures)?
::: solution
$v_c/v_o = 90\times80/250 = 28.8$, ten times the C3 value: oxygenation and photorespiration are almost suppressed. (C4 Rubiscos in fact tend to have somewhat lower $S_{c/o}$ and higher $k_\mathrm{cat}$ than C3 Rubiscos, consistent with the trade-off: with CO₂ concentrated, selection can favour speed over specificity.)
:::
:::

::: exercise Q₁₀ in the cold {level=2 check="0.435"}
A fish enzyme has $Q_{10} = 2.0$. If the water cools from 20 °C to 8 °C, what fraction of its activity at 20 °C remains, assuming no acclimation (three significant figures)?
::: solution
$2.0^{-12/10} = 2^{-1.2} = 0.435$. Less than half the activity remains, which is why fish acclimated to cold increase the amounts of key enzymes or switch to isozymes with higher activity at low temperature.
:::
:::

::: exercise Diagnosing an inhibitor {level=2}
Initial rates of an enzyme are measured at several [S] in the absence and presence of 2 µmol L⁻¹ of an inhibitor. Without inhibitor, $V_{\max} = 100$ and $K_\mathrm{m} = 1.0$ mmol L⁻¹; with inhibitor, the apparent $V_{\max} = 50$ and apparent $K_\mathrm{m} = 0.50$ mmol L⁻¹. (a) What kind of inhibition is this? (b) Calculate the inhibition constant. (c) Sketch how the two lines would look on a double-reciprocal plot.
::: solution
(a) Both parameters fall by the same factor, 2: uncompetitive inhibition, binding only ES ($\alpha = 1$, $\alpha' = 2$). (b) $\alpha' = 1 + [\mathrm{I}]/K_\mathrm{i}' = 2$ with $[\mathrm{I}] = 2$ µmol L⁻¹, so $K_\mathrm{i}' = 2$ µmol L⁻¹. (c) By [[#eq-lb]] the slope $K_\mathrm{m}/V_{\max}$ is unchanged (1.0/100 = 0.5/50), while the intercept $1/V_{\max}$ doubles: two parallel lines, the inhibited one above.
:::
:::

::: exercise Interpreting a temperature-adaptation study {level=3}
Lactate dehydrogenase is purified from an Antarctic fish (body temperature −1.9 °C), a temperate fish (about 15 °C) and a mammal (37 °C), and the $K_\mathrm{m}$ for pyruvate is measured over a range of temperatures (illustrative values, mmol L⁻¹):

| assay temperature | 0 °C | 15 °C | 37 °C |
|---|---|---|---|
| Antarctic fish | 0.15 | 0.24 | 0.55 |
| temperate fish | 0.10 | 0.16 | 0.36 |
| mammal | 0.06 | 0.09 | 0.17 |

(a) Read off each species' $K_\mathrm{m}$ at its own body temperature (use 0 °C for the Antarctic fish). What pattern do you see? (b) Why might selection conserve $K_\mathrm{m}$ at body temperature? (c) What would you expect for $k_\mathrm{cat}$ measured at 0 °C, and why?
::: solution
(a) About 0.15 (Antarctic, 0 °C), 0.16 (temperate, 15 °C) and 0.17 (mammal, 37 °C): nearly the same, although at a common temperature they differ two- to threefold. This is the conservation of $K_\mathrm{m}$ at physiological temperature described by Hochachka and Somero. (b) Pyruvate concentrations in muscle are similar across vertebrates; keeping $K_\mathrm{m}$ near the physiological substrate concentration keeps the enzyme responsive to changes in substrate (neither saturated nor working at a tiny fraction of capacity) and keeps its catalytic efficiency. (c) The Antarctic enzyme would have the highest $k_\mathrm{cat}$ at 0 °C, compensating for cold through a more flexible structure, and would be the least stable to heat. The higher $K_\mathrm{m}$ (weaker binding) at a given temperature is part of the same trade-off: a more flexible enzyme binds less tightly but turns over faster.
:::
:::

::: exercise Choosing a selective target {level=3}
You are asked to find a target for a new herbicide that should be harmless to mammals, birds, fish and insects. Using the principle of selective toxicity, (a) name two classes of plant enzyme that would be good candidates and explain why; (b) explain why an inhibitor of a plant enzyme that has a close animal homologue might still be selective; (c) describe two ways in which weeds could evolve resistance, and how resistance would show up in enzyme kinetics measured on extracts.
::: solution
(a) Enzymes of pathways absent from animals: the shikimate pathway for aromatic amino acids (target of glyphosate), branched-chain amino-acid synthesis (acetolactate synthase, the target of sulfonylurea herbicides), photosynthesis (photosystem II, the target of atrazine and related herbicides) and carotenoid synthesis. Animals have no target, so direct toxicity is low. (b) Homologous enzymes differ in structure, particularly at regulatory and binding surfaces, so an inhibitor can be designed to bind the plant form much more tightly; differences in uptake, metabolism and excretion between plants and animals add further selectivity. Plant-specific isoforms or compartments (plastids) help too. (c) Target-site resistance: mutations in the enzyme that reduce inhibitor binding — seen as a raised $K_\mathrm{i}$ in extracts, ideally with little change in $K_\mathrm{m}$ for the natural substrate (otherwise the mutation carries a fitness cost). Non-target-site resistance: increased detoxification (higher activity of cytochrome P450s or glutathione transferases), reduced uptake or translocation, or amplification of the target gene (as found for EPSP synthase in glyphosate-resistant *Amaranthus palmeri*), seen as increased $V_{\max}$ of the target enzyme in extracts with unchanged $K_\mathrm{i}$.
:::
:::
