A living cell is a chemical system held far from equilibrium. Its ATP is hundreds of millions of times more concentrated, relative to ADP and phosphate, than it would be at equilibrium; its NADPH is kept almost fully reduced while its NAD⁺ is kept almost fully oxidised; its membranes hold ions at concentrations that differ tenfold or ten-thousandfold across a few nanometres. Every one of these states would decay within minutes if the cell stopped taking in energy. Erwin Schrödinger put the point memorably in *What Is Life?* (1944): an organism stays alive by continually drawing order from its environment. Bioenergetics is the accounting of that flow — where the energy comes from, in what currency it is carried, and how it is spent.

This chapter takes the thermodynamic tools as given — the Gibbs free energy, the biochemical standard state, the coupling of reactions and the relation between redox potential and free energy are developed in [Chemistry Atlas: bioenergetics](/learn/chemistry/lesson.php?c=biochemistry&l=bioenergetics) — and asks what they tell us about real cells and whole organisms: how far from equilibrium different tissues keep their ATP, how muscles buffer it, how cells sense their energy state, why there are two pools of nicotinamide coenzymes, and how the energy budget of a cell scales up to the metabolic rate of an animal.

## Free energy in a living cell

The direction of every reaction in a cell is set by its actual free-energy change, which depends on concentrations as well as on the reaction's intrinsic properties.

::: proposition Actual free-energy change {#prop-dg}
For a reaction $\mathrm{A} + \mathrm{B} \rightleftharpoons \mathrm{C} + \mathrm{D}$ in a cell, the free-energy change per mole of reaction is

$$
\Delta G = \Delta G^{\circ\prime} + RT\ln Q,\qquad Q = \frac{[\mathrm{C}][\mathrm{D}]}{[\mathrm{A}][\mathrm{B}]},
$$ {#eq-dg}

where $\Delta G^{\circ\prime}$ is the standard free-energy change at pH 7 with all other reactants at 1 mol L⁻¹ (the biochemical standard state), and $Q$ is the **mass-action ratio** of the actual concentrations (strictly, activities; water, H⁺ at pH 7 and Mg²⁺ are absorbed into $\Delta G^{\circ\prime}$). At equilibrium $\Delta G = 0$ and $Q = K'_\mathrm{eq} = e^{-\Delta G^{\circ\prime}/RT}$. At 37 °C, $RT\ln10 = 5.94\ \mathrm{kJ\,mol^{-1}}$: every tenfold change in $Q$ shifts $\Delta G$ by 5.94 kJ mol⁻¹.
:::

The ratio $Q/K'_\mathrm{eq}$ tells us how far a reaction is from equilibrium in the cell. Measurements of metabolite concentrations in tissues (freeze-clamped within a fraction of a second to stop metabolism, then extracted and assayed) divide the reactions of metabolism into two kinds. Most are **near equilibrium**, with $Q$ within a factor of ten or so of $K'_\mathrm{eq}$ ($|\Delta G|$ of a few kJ mol⁻¹); their net direction is set by the supply and removal of their substrates and products, and they can run either way. A few are **far from equilibrium**, with $Q$ smaller than $K'_\mathrm{eq}$ by many orders of magnitude; they are effectively irreversible, and they are the steps at which pathways are regulated ([[biochemistry/enzyme-regulation]]).

::: example The free energy of ATP in resting and fatigued muscle {#ex-atp-muscle}
For ATP hydrolysis, $\mathrm{ATP} + \mathrm{H_2O} \to \mathrm{ADP} + \mathrm{P_i}$, take $\Delta G^{\circ\prime} = -30.5\ \mathrm{kJ\,mol^{-1}}$. In resting skeletal muscle, ³¹P NMR and the creatine kinase equilibrium give [ATP] = 8 mmol L⁻¹, free [ADP] = 13 µmol L⁻¹ and [Pᵢ] = 3 mmol L⁻¹; after intense exercise to fatigue, representative values are [ATP] = 4 mmol L⁻¹, [ADP] = 200 µmol L⁻¹, [Pᵢ] = 25 mmol L⁻¹ (illustrative). Calculate $\Delta G$ in each state at 37 °C.
::: solution
Rest: $Q = (13\times10^{-6})(3\times10^{-3})/(8\times10^{-3}) = 4.9\times10^{-6}$, so $\Delta G = -30.5 + 2.579\ln(4.9\times10^{-6}) = -30.5 - 31.5 = -62\ \mathrm{kJ\,mol^{-1}}$.

Fatigue: $Q = (2\times10^{-4})(0.025)/(0.004) = 1.25\times10^{-3}$, so $\Delta G = -30.5 + 2.579\ln(1.25\times10^{-3}) = -30.5 - 17.2 = -48\ \mathrm{kJ\,mol^{-1}}$.

The ATP concentration fell by only half, but the free energy available from each ATP fell by about 14 kJ mol⁻¹, because ADP and Pᵢ rose so much. Some ATP-driven processes, notably the calcium pump of the sarcoplasmic reticulum, need more than about 50 kJ mol⁻¹ to work against their gradients; the fall in $|\Delta G_\mathrm{ATP}|$, along with the direct effects of Pᵢ on the contractile proteins, is thought to contribute to muscle fatigue. "Energy" in a cell is not the amount of ATP but how far the ATP/ADP·Pᵢ ratio is from equilibrium.
:::
:::

::: widget plot
f: g + 5.938*x
x: -9, 3
y: -90, 20
sliders: g=-30.5:-60:20:0.5
labels: \Delta G = \Delta G^{\circ\prime} + RT\ln Q
hlines: 0
caption: The actual free-energy change $\Delta G$ (kJ mol⁻¹, 37 °C) against $\log_{10}Q$, the mass-action ratio, from [[#eq-dg]]. The slider sets $\Delta G^{\circ\prime}$; it starts at −30.5 kJ mol⁻¹ for ATP hydrolysis. Resting muscle sits near $\log_{10}Q = -5.3$ (about −62 kJ mol⁻¹), fatigued muscle near −2.9. The line crosses zero at equilibrium, $\log_{10}Q = \log_{10}K'_\mathrm{eq}$. Set $g$ to +23.8 (a typical unfavourable step such as the aldolase reaction) and see that it can still run forwards if the cell keeps $Q$ below about $10^{-4}$.
:::

## ATP: the currency and its reserves

ATP is the common currency because it is an intermediate: its hydrolysis is favourable enough to drive most biosynthetic reactions and transport, yet ADP can be rephosphorylated by the energy-releasing reactions of catabolism. Its position between "high-energy" compounds such as phosphoenolpyruvate and 1,3-bisphosphoglycerate, and "low-energy" ones such as glucose 6-phosphate, is what lets it carry phosphoryl groups from one to the other. Fritz Lipmann set out this idea in 1941, introducing the symbol ~P for an "energy-rich" phosphate bond; the term is shorthand for a large negative free energy of hydrolysis of the whole compound, not energy stored in one bond.

A reaction that is unfavourable alone is driven by **coupling** to ATP hydrolysis through a shared intermediate, usually a phosphorylated substrate or enzyme, so that the overall free-energy change is the sum of the parts ([Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=bioenergetics)). One ATP hydrolysed multiplies the equilibrium ratio of the coupled reaction by about $e^{55/2.58} \approx 10^9$ under cellular conditions.

The ATP pool itself is tiny compared with its turnover: in a resting human it would last about two minutes ([[biochemistry/carbohydrates-lipids#ex-atp-turnover]]). Tissues whose ATP demand can rise suddenly therefore keep a reserve.

::: definition Phosphagens {#def-phosphagen}
A **phosphagen** is a guanidino compound phosphorylated on a nitrogen (an N-phosphoryl guanidine) that serves as a rapidly available reserve of high-energy phosphate in excitable and motile cells. A phosphagen kinase transfers its phosphoryl group reversibly to ADP:

$$
\text{phosphagen-P} + \mathrm{ADP} + \mathrm{H^+} \rightleftharpoons \text{phosphagen} + \mathrm{ATP}.
$$ {#eq-phosphagen}

Vertebrates use **phosphocreatine** (creatine kinase); most invertebrates, including arthropods and molluscs, use **phosphoarginine** (arginine kinase); annelids and some other invertebrates use several others (phosphoglycocyamine, phosphotaurocyamine, phospholombricine).
:::

Phosphocreatine was discovered in 1927 in frog muscle, by Philip and Grace Eggleton in Cambridge and by Cyrus Fiske and Yellapragada Subbarow at Harvard; Otto Meyerhof and Karl Lohmann found phosphoarginine in crustacean muscle in 1928; and Lohmann showed in 1934 that phosphocreatine serves to regenerate ATP. The comparative distribution of phosphagens has been reviewed by W. R. Ellington (*Annual Review of Physiology* 63, 289, 2001). The phosphagen kinases are homologous, so the diversity of phosphagens reflects the evolution of one enzyme family to use different guanidine substrates.

Phosphagens serve two functions. They **buffer** ATP: because the kinase reaction is near equilibrium and its equilibrium constant favours ATP, the ATP concentration is held almost constant while phosphocreatine is drawn down, and free ADP stays low (which keeps $\Delta G_\mathrm{ATP}$ large, [[#ex-atp-muscle]]). And in large or elongated cells they act as a **shuttle**: phosphocreatine and creatine, smaller and more abundant than ATP and ADP, diffuse between mitochondria, where mitochondrial creatine kinase makes phosphocreatine, and the sites of ATP use. The flagella of sea-urchin sperm, tens of micrometres long, depend on such a shuttle (R. M. Tombes and B. M. Shapiro, 1985).

::: example How long do ATP and phosphocreatine last in a sprint? {#ex-sprint}
A sprinter's leg muscle at rest contains about 8 mmol L⁻¹ ATP and 25 mmol L⁻¹ phosphocreatine (per litre of cell water; representative values). At maximal effort it hydrolyses ATP at about 3 mmol L⁻¹ s⁻¹ (illustrative). How long could (a) ATP alone and (b) ATP plus phosphocreatine supply this demand, with no other ATP synthesis?
::: solution
(a) $8/3 = 2.7$ s. In practice ATP never falls below about half its resting level, so the usable ATP lasts barely a second.
(b) Each phosphocreatine regenerates one ATP, so together $(8 + 25)/3 = 11$ s. This matches the observation that maximal power can be sustained for roughly ten seconds — the length of a 100 m sprint — before glycolysis (seconds to a minute, [[biochemistry/glycolysis-tca]]) and then oxidative phosphorylation (minutes to hours) must take over, at progressively lower power. The three systems differ in *capacity* (how much ATP) and *power* (how fast): phosphagen high power, low capacity; oxidation low power, enormous capacity.
:::
:::

::: warning "ATP is an energy store"
At about 4–8 mmol L⁻¹, the ATP of a tissue would sustain its resting demand for a minute or two and its maximal demand for a second or two. ATP is a *carrier* in rapid circulation, regenerated as fast as it is used; energy is stored in fat, glycogen and starch, and — for seconds only — in phosphagens. The concentration of ATP in most cells is in fact held remarkably constant across conditions; what changes is the flux through it.
:::

## Sensing the cell's energy state

If ATP concentration hardly changes, how do enzymes "know" when energy is short? Through the other adenine nucleotides.

::: definition Adenylate energy charge {#def-energy-charge}
Daniel Atkinson (1968) defined the **adenylate energy charge** as the mole fraction of the adenylate pool in the form of ATP, counting ADP as half-charged:

$$
\mathrm{EC} = \frac{[\mathrm{ATP}] + \tfrac12[\mathrm{ADP}]}{[\mathrm{ATP}] + [\mathrm{ADP}] + [\mathrm{AMP}]}.
$$ {#eq-ec}

It ranges from 0 (all AMP) to 1 (all ATP). Growing cells of bacteria, yeasts, plants and animals generally hold it between about 0.8 and 0.95, and cells whose energy charge falls much below 0.5 usually die. It is a useful summary, though enzymes respond to individual nucleotide concentrations, not to the energy charge as such.
:::

::: proposition AMP as an amplified signal of energy need {#prop-amp}
The enzyme adenylate kinase keeps the reaction $2\,\mathrm{ADP} \rightleftharpoons \mathrm{ATP} + \mathrm{AMP}$ close to equilibrium in most cells, with $K = [\mathrm{ATP}][\mathrm{AMP}]/[\mathrm{ADP}]^2 \approx 1$. Hence

$$
[\mathrm{AMP}] = K\frac{[\mathrm{ADP}]^2}{[\mathrm{ATP}]}.
$$ {#eq-amp}

Because AMP depends on the *square* of ADP, and ATP greatly exceeds AMP, a small fractional fall in ATP produces a much larger fractional rise in AMP. Assumptions: adenylate kinase at equilibrium, a constant total adenylate pool on the time scale considered, and free (not protein-bound) concentrations.
:::

::: example A ten per cent fall in ATP {#ex-amp}
A cell has a total adenylate pool of 5.0 mmol L⁻¹, with ATP 4.50, ADP 0.454 and AMP 0.046 mmol L⁻¹ (consistent with [[#eq-amp]] for $K = 1$). Energy demand rises and ATP falls by 10 %, to 4.05 mmol L⁻¹. With adenylate kinase at equilibrium and the total pool constant, find the new ADP and AMP and the new energy charge.
::: solution
We need ADP $= a$ and AMP $= m$ with $a + m = 5.0 - 4.05 = 0.95$ and $m = a^2/4.05$. Substituting, $a^2/4.05 + a - 0.95 = 0$, whose positive root is $a = 0.794$, so $m = 0.156$ mmol L⁻¹.

ATP fell by 10 %, ADP rose 1.75-fold, and AMP rose $0.156/0.046 = 3.4$-fold. The energy charge fell only from $(4.50 + 0.227)/5 = 0.945$ to $(4.05 + 0.397)/5 = 0.889$. An enzyme that responds to AMP sees a signal more than thirty times larger, in relative terms, than one that responds to ATP. This is why the master energy sensor of eukaryotes is activated by AMP (and ADP) rather than inhibited by ATP.
:::
:::

::: widget plot
f: (-1 + sqrt(1 + 4*(1 - x)/x))*x/2; 1 - x - (-1 + sqrt(1 + 4*(1 - x)/x))*x/2
x: 0.5, 1
y: 0, 0.45
labels: \text{ADP fraction}; \text{AMP fraction}
vlines: 0.9; 0.81
caption: Fractions of the adenylate pool present as ADP and AMP against the fraction present as ATP (horizontal axis), with adenylate kinase at equilibrium, $K = 1$ in [[#eq-amp]]. Moving left from 0.9 to 0.81 (vertical lines; ATP down by 10 %) more than triples AMP, while ATP has barely changed in relative terms. Near the right-hand edge, where healthy cells sit, AMP is tiny but rises steeply — the amplification that AMP-activated enzymes exploit.
:::

The **AMP-activated protein kinase** (AMPK) of animals — Snf1 in yeast, SnRK1 in plants, all orthologues — is activated when AMP and ADP rise. It then phosphorylates dozens of targets, switching on ATP-producing pathways (glucose uptake, fatty-acid oxidation, mitochondrial biogenesis) and switching off ATP-consuming ones (fatty-acid, cholesterol and protein synthesis, cell growth). D. Grahame Hardie called it a "fuel gauge" of the cell. Its conservation from yeast to plants to mammals shows that sensing the energy state through adenine nucleotides is ancient. In bacteria, the corresponding role in starvation is played partly by ppGpp ([[biochemistry/carbohydrates-lipids]]).

## Two currencies of reducing power

Energy is carried in a second form: electrons. Oxidising food removes electrons, which are carried by NAD⁺ (as NADH) and FAD (as FADH₂) to the respiratory chain; biosynthesis needs electrons to reduce precursors, supplied by NADPH. NAD⁺ and NADP⁺ differ only by a phosphate on the 2′ position of the adenosine ribose, which has no effect on their chemistry but lets enzymes tell them apart. Why have two?

The answer is that cells keep the two pools at very different redox states. In 1967 Dermot Williamson, Patricia Lund and Hans Krebs used the near-equilibrium reactions catalysed by lactate dehydrogenase (in the cytosol) and β-hydroxybutyrate dehydrogenase (in mitochondria) to calculate free NAD⁺/NADH ratios from metabolite concentrations in rat liver: about 700 in the cytosol but only about 8 in mitochondria. Richard Veech, Leslie Eggleston and Krebs (1969), using NADP-linked dehydrogenases, found the cytosolic free NADP⁺/NADPH ratio to be about 0.01 — the NADP pool is almost entirely reduced.

::: proposition Reduction potential of a redox couple {#prop-nernst}
The actual reduction potential of a couple such as NAD⁺/NADH ($n = 2$ electrons) is

$$
E = E^{\circ\prime} + \frac{RT}{nF}\ln\frac{[\mathrm{ox}]}{[\mathrm{red}]},
$$ {#eq-nernst-redox}

and the free energy of transferring $n$ electrons from a donor couple to an acceptor couple is $\Delta G = -nF\Delta E$, with $\Delta E = E_\mathrm{acceptor} - E_\mathrm{donor}$. At 37 °C, $RT/2F = 13.4$ mV. (Derivation in [Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=bioenergetics); assumptions: activities equal concentrations of free coenzyme, and protons are accounted for in $E^{\circ\prime}$ at pH 7.)
:::

::: example Why NADPH is the reductant of biosynthesis {#ex-nadph}
$E^{\circ\prime}$ is −0.320 V for NAD⁺/NADH and −0.324 V for NADP⁺/NADPH. Using the ratios measured in rat liver (cytosolic NAD⁺/NADH = 700, mitochondrial NAD⁺/NADH = 8, cytosolic NADP⁺/NADPH = 0.01), calculate the actual reduction potentials at 37 °C, and the free energy available from transferring two electrons from NADPH to NAD⁺ in the cytosol.
::: solution
By [[#eq-nernst-redox]], with $RT/2F = 0.01337$ V:

- cytosolic NAD: $E = -0.320 + 0.01337\ln700 = -0.320 + 0.088 = -0.232$ V;
- mitochondrial NAD: $E = -0.320 + 0.01337\ln8 = -0.320 + 0.028 = -0.292$ V;
- cytosolic NADP: $E = -0.324 + 0.01337\ln0.01 = -0.324 - 0.062 = -0.386$ V.

The two cytosolic couples, almost identical in $E^{\circ\prime}$, differ in actual potential by about 0.15 V. Transferring two electrons from NADPH to NAD⁺ would release $\Delta G = -2\times96.485\times0.153 = -29.5\ \mathrm{kJ\,mol^{-1}}$. The cell keeps NADPH as a powerful reductant, "charged" for driving reductive biosynthesis (fatty acids, sterols, nucleotides) and for antioxidant defence, while it keeps cytosolic NAD⁺ largely oxidised, ready to accept electrons in glycolysis. Two pools that enzymes can tell apart let the cell run oxidation and reduction in the same compartment, each pushed in its own direction.
:::
:::

The same logic explains the main sources of NADPH: the oxidative pentose phosphate pathway, malic enzyme, isocitrate dehydrogenase (NADP-linked), and — in photosynthetic organisms — photosystem I, which reduces NADP⁺ directly, so that light drives the reductive Calvin–Benson cycle ([[plant-biology/photosynthesis]]). Mitochondrial **transhydrogenase** uses the proton-motive force to transfer reducing equivalents from NADH to NADP⁺, keeping the mitochondrial NADPH pool reduced too.

::: quiz
A tissue has the following adenylate concentrations (mmol L⁻¹): ATP 3.0, ADP 1.0, AMP 1.0. What is its energy charge, and what would you predict about it?
- [ ] 0.85; it is in a normal growing state.
- [x] 0.70; it is energetically stressed, and AMP-activated pathways should be strongly on.
- [ ] 0.60; it cannot be calculated without knowing Pᵢ.
- [ ] 0.50; it is dead.
::: solution
$\mathrm{EC} = (3.0 + 0.5)/5.0 = 0.70$. Below the 0.8–0.95 typical of healthy cells, and with AMP at 20 % of the pool rather than the usual one or two per cent, AMPK and AMP-activated enzymes such as phosphofructokinase and glycogen phosphorylase would be strongly activated. (Note also that $[\mathrm{ATP}][\mathrm{AMP}]/[\mathrm{ADP}]^2 = 3$, so adenylate kinase is not at equilibrium with $K \approx 1$ — the numbers describe a transient state.)
:::
:::

## From cells to organisms: metabolic rate

The bioenergetics of a whole organism is measured as its **metabolic rate**, the rate at which it converts chemical energy into heat and work. Antoine Lavoisier and Pierre-Simon Laplace showed in 1780, by measuring the ice melted by a guinea pig in a calorimeter and the CO₂ it exhaled, that respiration is a slow combustion. Max Rubner (with dogs, 1894) and Wilbur Atwater and Francis Benedict (with humans, around 1900) showed that the heat produced equals that expected from the food oxidised: the first law of thermodynamics holds for animals.

Direct calorimetry is difficult, so metabolic rate is usually measured by **indirect calorimetry**: the rate of oxygen consumption, converted to energy using the heat released per litre of O₂ — about 21.1 kJ L⁻¹ when carbohydrate is oxidised, 19.6 kJ L⁻¹ for fat, and about 20.1 kJ L⁻¹ for a typical mixed diet. The ratio of CO₂ produced to O₂ consumed, the respiratory quotient, reveals which fuel is being burned ([[biochemistry/metabolic-integration]]).

::: example Power from oxygen consumption {#ex-power}
A resting adult consumes 0.25 L of O₂ per minute. Estimate the metabolic rate in watts, and the efficiency with which the oxidation of glucose is captured as ATP if about 30 ATP are made per glucose ($\Delta G$ of complete oxidation of glucose about −2870 kJ mol⁻¹, of ATP synthesis in the cell about +55 kJ mol⁻¹).
::: solution
Metabolic rate $= 0.25\ \mathrm{L\,min^{-1}}\times20.1\ \mathrm{kJ\,L^{-1}} = 5.03\ \mathrm{kJ\,min^{-1}} = 83.8$ W — about the power of a bright incandescent lamp, almost all of it eventually released as heat. Efficiency of capture: $30\times55/2870 = 0.57$, so a little over half the free energy of glucose is conserved as ATP; the rest is dissipated as heat in the reactions and proton movements that make it, and is what keeps an endotherm warm.
:::
:::

Across species, metabolic rate rises with body mass less steeply than mass itself.

::: proposition Kleiber's law (empirical) {#prop-kleiber}
For mammals ranging from mice to cattle, basal metabolic rate $B$ is approximately

$$
B \approx B_0\,M^{3/4},
$$ {#eq-kleiber}

with $M$ in kilograms and $B_0 \approx 3.4$ W kg⁻³ᐟ⁴ (Max Kleiber, 1932, about 70 kcal per day per kg³ᐟ⁴). This is an empirical regularity, not a law of physics. The best-fitting exponent depends on the species and the statistical method; re-analyses of mammalian data give values from about 0.67 to 0.75 (for example C. R. White and R. S. Seymour, 2003), and exponents differ between groups and between resting and maximal rates. Theories derive 3/4 from the geometry of branching supply networks (G. B. West, J. H. Brown and B. J. Enquist, 1997), but they remain debated.
:::

::: example A mouse and an elephant {#ex-kleiber}
Use [[#eq-kleiber]] to estimate the basal metabolic rate of a 25 g mouse and a 4000 kg elephant, and compare their rates per kilogram.
::: solution
Mouse: $3.39\times0.025^{0.75} = 3.39\times0.0629 = 0.21$ W. Elephant: $3.39\times4000^{0.75} = 3.39\times503 = 1700$ W. Per kilogram: mouse $0.21/0.025 = 8.5\ \mathrm{W\,kg^{-1}}$, elephant $1700/4000 = 0.43\ \mathrm{W\,kg^{-1}}$ — a twentyfold difference, $(4000/0.025)^{1/4} = 20$. Each gram of mouse tissue must make ATP twenty times faster than a gram of elephant, which shows up in its higher heart rate, breathing rate, food intake per gram and density of mitochondria. The scaling of metabolism, and why it matters for physiology and ecology, is developed in [[animal-physiology/energy-metabolism]].
:::
:::

::: application Measuring energy flow in the field
The doubly labelled water method measures the energy expenditure of free-living animals and people. The subject drinks water containing heavy isotopes of both hydrogen (²H) and oxygen (¹⁸O). Hydrogen leaves the body only as water; oxygen leaves both as water and as CO₂ (because carbonic anhydrase equilibrates the oxygen of water and bicarbonate). The difference between the two isotopes' elimination rates, measured in a few samples of body water over days, gives CO₂ production, and hence energy expenditure. Introduced by Nathan Lifson in the 1950s for small animals, it is now used for birds on migration, foraging seals and human populations, and has shown, for example, that total daily energy expenditure of humans, adjusted for body size, is similar in hunter-gatherers and in industrialised populations (H. Pontzer and colleagues, 2012).
:::

::: history
Lavoisier and Laplace's calorimetry (1780) identified respiration as combustion. Julius Robert Mayer (1842) and Hermann von Helmholtz (1847), both starting from physiology, formulated the conservation of energy. Josiah Willard Gibbs defined the free energy in 1873–78. Phosphocreatine was found in 1927, ATP by Karl Lohmann and independently by Fiske and Subbarow in 1929, and the creatine kinase reaction by Lohmann in 1934. Fritz Lipmann's 1941 review introduced the energy-rich phosphate bond and the idea of ATP as the cell's currency (Nobel Prize in Physiology or Medicine, 1953, shared with Hans Krebs). Kleiber published his scaling of metabolic rate in 1932. Atkinson proposed the energy charge in 1968; Williamson, Lund and Krebs measured the compartmental NAD⁺/NADH ratios in 1967.
:::

## Where this leads

The ATP and NADH accounted for here are made in [[biochemistry/glycolysis-tca]] and [[biochemistry/oxidative-phosphorylation]], and the energy state of the cell — through AMP, ATP, NADH and their sensors — controls those pathways and the hormonal integration of whole-body metabolism in [[biochemistry/metabolic-integration]]. The use of ion gradients as a second energy currency appeared in [[cell-biology/membrane-transport]].

::: summary
- The actual free-energy change $\Delta G = \Delta G^{\circ\prime} + RT\ln Q$ (5.94 kJ mol⁻¹ per tenfold change in $Q$ at 37 °C) decides the direction of reactions; most steps are near equilibrium, a few far from it, and those are the regulated ones.
- $\Delta G_\mathrm{ATP}$ is about −62 kJ mol⁻¹ in resting muscle and falls to about −48 kJ mol⁻¹ in fatigue, mainly because ADP and Pᵢ rise.
- ATP is a carrier recycled hundreds of times a day; phosphagens (phosphocreatine in vertebrates, phosphoarginine in most invertebrates) buffer it for seconds and shuttle high-energy phosphate within cells.
- Adenylate energy charge is kept at 0.8–0.95; because $[\mathrm{AMP}] = K[\mathrm{ADP}]^2/[\mathrm{ATP}]$, AMP amplifies small falls in ATP, and AMPK/Snf1/SnRK1 senses it.
- Cytosolic NAD⁺/NADH ≈ 700 but NADP⁺/NADPH ≈ 0.01: the two pools differ by about 0.15 V, letting NAD⁺ accept electrons in catabolism while NADPH drives biosynthesis.
- Metabolic rate is measured by O₂ consumption (about 20 kJ per litre); a resting human runs at about 84 W, and basal rate scales empirically as about $M^{3/4}$ across mammals.
:::

## Exercises

::: exercise A tenfold change {level=1 check="-36.4"}
A reaction has $\Delta G^{\circ\prime} = -30.5\ \mathrm{kJ\,mol^{-1}}$. What is $\Delta G$ at 37 °C when $Q = 0.1$ (three significant figures)?
::: solution
$\Delta G = -30.5 + 2.579\ln0.1 = -30.5 - 5.94 = -36.4\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise Energy charge {level=1 check="0.9"}
Calculate the energy charge of a cell with ATP 4.0, ADP 1.0 and AMP 0 mmol L⁻¹.
::: solution
$(4.0 + 0.5)/5.0 = 0.90$.
:::
:::

::: exercise A mouse's oxygen {level=1 check="37.8"}
Using [[#ex-kleiber]], a 25 g mouse has a basal metabolic rate of about 0.211 W. How many millilitres of O₂ does it consume per hour, at 20.1 kJ L⁻¹ (three significant figures)?
::: solution
$0.211\ \mathrm{J\,s^{-1}}\times3600\ \mathrm{s} = 760$ J per hour $= 0.760$ kJ. Divided by 20.1 kJ L⁻¹: 0.0378 L, or 37.8 mL per hour — about 1.5 L O₂ per kilogram per hour, roughly seven times the resting human value per kilogram (0.21 L kg⁻¹ h⁻¹).
:::
:::

::: exercise ATP in a working heart {level=2 check="-59.4"}
In working heart muscle, representative values are [ATP] = 6 mmol L⁻¹, free [ADP] = 40 µmol L⁻¹ and [Pᵢ] = 2 mmol L⁻¹. Calculate $\Delta G$ of ATP hydrolysis at 37 °C in kJ mol⁻¹ (three significant figures; $\Delta G^{\circ\prime} = -30.5$ kJ mol⁻¹).
::: solution
$Q = (4\times10^{-5})(2\times10^{-3})/(6\times10^{-3}) = 1.33\times10^{-5}$, and $\ln Q = -11.23$, so $\Delta G = -30.5 + 2.579\times(-11.23) = -30.5 - 28.9 = -59.4\ \mathrm{kJ\,mol^{-1}}$. The heart, which works continuously, keeps its ATP nearly as far from equilibrium as resting skeletal muscle.
:::
:::

::: exercise How AMP responds {level=2 check="0.322"}
Repeat [[#ex-amp]] for a 20 % fall in ATP, from 4.50 to 3.60 mmol L⁻¹ (total pool 5.0 mmol L⁻¹, $K = 1$). What is the new AMP concentration in mmol L⁻¹ (three significant figures), and by what factor has it risen?
::: solution
ADP $a$ and AMP $m$ satisfy $a + m = 1.40$ and $m = a^2/3.60$. So $a^2/3.6 + a - 1.40 = 0$, giving $a = 1.078$ and $m = 0.322$ mmol L⁻¹ — a sevenfold rise from 0.046, for a 20 % fall in ATP.
:::
:::

::: exercise The potential of mitochondrial NADH {level=2 check="-0.292"}
Using [[#eq-nernst-redox]] with $E^{\circ\prime} = -0.320$ V, calculate the reduction potential of the mitochondrial NAD⁺/NADH couple at a ratio of 8 at 37 °C, in volts to three significant figures. Why is it useful for mitochondrial NAD to be more reduced than cytosolic NAD?
::: solution
$E = -0.320 + 0.01337\ln8 = -0.320 + 0.0278 = -0.292$ V. A more reduced matrix NADH pool (more negative potential) maximises the free energy available when NADH donates electrons to the respiratory chain ($E^{\circ\prime}$ of O₂/H₂O = +0.816 V), and is maintained by the dehydrogenases of the citric acid cycle and β-oxidation. Cytosolic NAD⁺ is kept oxidised so that glyceraldehyde-3-phosphate dehydrogenase in glycolysis can run forwards; electrons are carried into mitochondria by shuttles that, in effect, move them "uphill" in potential at a small cost.
:::
:::

::: exercise Choosing a phosphagen {level=2}
Phosphocreatine and phosphoarginine are both phosphagens. In crustacean muscle, phosphoarginine reaches 30–50 mmol L⁻¹. (a) What two functions does a phosphagen serve? (b) Why might muscles that work in sudden bursts (the tail flip of a lobster, the sprint of a cheetah) have particularly large phosphagen stores? (c) Some marine worms have several different phosphagen kinases. What does the homology of the phosphagen kinases suggest about how this diversity arose?
::: solution
(a) A temporal buffer of ATP, regenerating ATP from ADP during sudden increases in demand and keeping ADP low (so $\Delta G_\mathrm{ATP}$ stays large); and a spatial shuttle carrying high-energy phosphate from mitochondria to sites of use. (b) Burst activity demands ATP faster than glycolysis or respiration can supply it in the first seconds; the phosphagen is the only reserve with high enough power (rate of ATP regeneration). (c) The kinases share a common ancestor, so the different phosphagens arose by gene duplication and divergence of a kinase's substrate specificity, with the corresponding guanidine compounds being made by the animals' existing metabolism. Which phosphagen a lineage uses is largely a matter of evolutionary history rather than a different function — although properties such as the equilibrium constant and the acid released differ somewhat between phosphagens.
:::
:::

::: exercise Interpreting energy expenditure data {level=3}
Doubly labelled water measurements give the following daily energy expenditures (illustrative values) for adults of similar lean body mass: hunter-gatherers 10.5 MJ, farmers 11.0 MJ, office workers 10.3 MJ, despite much higher physical activity among hunter-gatherers. (a) What is surprising about these results? (b) Suggest two physiological explanations. (c) What would you need to measure to distinguish them? (d) Why does this matter for understanding energy balance — and why is it not a basis for personal dietary advice?
::: solution
(a) If energy expenditure were simply basal rate plus activity, more active people should spend much more energy; they do not. (b) The body may "constrain" total expenditure, compensating for higher activity by reducing energy spent elsewhere — for example on immune function, reproduction-related processes, stress responses or non-exercise movement — or the more active people may move more efficiently. (c) Basal metabolic rate (by indirect calorimetry at rest), the energy cost of specific activities, measures of other energy-using processes (immune and endocrine markers), and longitudinal measurements of individuals as their activity changes. (d) It suggests that differences in energy balance between populations are driven more by intake than by expenditure, which bears on evolutionary and public-health questions; but population averages say nothing reliable about what any individual should eat or do, which is a matter for clinical guidance ([Medicine Atlas](/learn/medicine/)).
:::
:::

::: exercise A reaction pulled forward {level=3}
The aldolase reaction of glycolysis, fructose 1,6-bisphosphate ⇌ dihydroxyacetone phosphate + glyceraldehyde 3-phosphate, has $\Delta G^{\circ\prime} = +23.8\ \mathrm{kJ\,mol^{-1}}$. (a) What is $K'_\mathrm{eq}$ at 37 °C? (b) In a cell, [FBP] = 30 µmol L⁻¹, [DHAP] = 140 µmol L⁻¹ and [GAP] = 6 µmol L⁻¹ (illustrative values of the kind measured in tissues). Calculate $\Delta G$, and say whether the reaction is near or far from equilibrium. (c) Why can a reaction with a positive standard free-energy change carry a large forward flux?
::: solution
(a) $K' = e^{-23.8/2.579} = e^{-9.23} = 9.8\times10^{-5}$ mol L⁻¹.
(b) $Q = (1.4\times10^{-4})(6\times10^{-6})/(3\times10^{-5}) = 2.8\times10^{-5}$, so $\Delta G = 23.8 + 2.579\ln(2.8\times10^{-5}) = 23.8 - 27.0 = -3.2\ \mathrm{kJ\,mol^{-1}}$. $Q/K' \approx 0.3$: the reaction is near equilibrium, as measurements show for aldolase in most tissues.
(c) Because one molecule becomes two, $Q$ has units of concentration, and at the micromolar concentrations of cells it is many orders of magnitude below 1 mol L⁻¹, so $RT\ln Q$ is large and negative; and the products are removed continuously by the next steps of glycolysis, keeping $Q$ just below $K'$. The standard free energy refers to 1 mol L⁻¹ of everything, which is irrelevant to the cell. A near-equilibrium step can carry a large net flux provided its enzyme is abundant enough.
:::
:::
