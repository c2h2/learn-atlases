A bacterium growing in a rich broth stops making isoleucine within seconds of finding isoleucine in its food. A muscle at the start of a sprint raises its rate of glycogen breakdown several hundredfold in a fraction of a second. A liver switches from storing glucose to releasing it as a meal is digested and a fast begins. None of this is possible with enzymes that simply run at whatever rate their substrates dictate. Metabolism works because the activities of key enzymes are continually adjusted — by the molecules of the pathway itself, by hormones and nerves acting through signalling pathways, and by the cell changing how much of each enzyme it has.

This chapter describes the mechanisms of that control and asks a deceptively hard question: when a pathway's flux changes, which enzymes are responsible? The physical chemistry of cooperative binding — the Hill equation and the Monod–Wyman–Changeux and Koshland–Némethy–Filmer models, illustrated with haemoglobin — is in [Chemistry Atlas: protein function](/learn/chemistry/lesson.php?c=biochemistry&l=protein-function). We build on [[biochemistry/enzymes]].

## Four ways to change an enzyme's rate

Regulation acts on different time scales, and a biologist should always ask which is at work.

| mechanism | time scale | examples |
|---|---|---|
| substrate and product concentrations | milliseconds | mass action at near-equilibrium steps |
| allosteric effectors | milliseconds to seconds | feedback inhibition by end products; activation by AMP |
| reversible covalent modification | seconds to minutes | phosphorylation of glycogen phosphorylase; redox switching of chloroplast enzymes |
| changing the amount of enzyme | minutes to days | induction of the *lac* genes; degradation of regulated proteins |

Compartmentation — keeping enzymes and substrates in different organelles, and controlling transport between them — adds another layer. In eukaryotes, fatty-acid synthesis happens in the cytosol and fatty-acid oxidation in mitochondria, so the two can be regulated separately ([[biochemistry/metabolic-integration]]).

## Feedback inhibition and allostery

In 1956 H. Edwin Umbarger found that isoleucine, the end product of a five-step pathway in *Escherichia coli*, inhibits the first enzyme of the pathway, threonine deaminase; in the same year Richard Yates and Arthur Pardee found that cytidine nucleotides inhibit aspartate transcarbamoylase (ATCase), the first committed enzyme of pyrimidine synthesis. The inhibitors bear no structural resemblance to the substrates of the enzymes they inhibit. Jacques Monod, Jean-Pierre Changeux and François Jacob coined the term **allosteric** ("other site") in 1963 for this kind of regulation.

::: definition Allosteric regulation and feedback inhibition {#def-allostery}
An **allosteric effector** is a molecule that changes an enzyme's activity by binding at a site other than the active site, through a change in the protein's conformation. It may be an inhibitor or an activator, and it need not resemble the substrate. **Feedback inhibition** is the inhibition of an early enzyme of a pathway — usually the first **committed step**, after which the intermediates have no other use — by the pathway's end product. **Feed-forward activation** is the activation of a later enzyme by an earlier metabolite.
:::

Feedback inhibition at the committed step is economical: it stops the whole pathway at its entrance, so no intermediates accumulate and no energy is spent on a product the cell already has. Branched pathways use more elaborate schemes. In *E. coli*, aspartate is the precursor of lysine, methionine and threonine, and the first enzyme, aspartokinase, exists as three isozymes, each inhibited by a different end product, so that a surplus of one amino acid does not starve the cell of the others.

### Aspartate transcarbamoylase: a model allosteric enzyme

John Gerhart and Pardee showed in 1962 that ATCase has sigmoidal kinetics with respect to its substrate aspartate, that CTP shifts the curve to higher aspartate concentrations, that ATP shifts it to lower ones, and that mild heating or mercury compounds "desensitise" the enzyme, abolishing both the sigmoid shape and the response to CTP without destroying activity. In 1965 Gerhart and Howard Schachman separated the enzyme into catalytic and regulatory subunits: the catalytic trimers are active but unregulated, and regulation is restored when they reassemble with regulatory dimers into the native $\mathrm{c_6r_6}$ complex. The regulatory site is literally a different protein from the catalytic one.

Physiologically, the opposite effects of CTP and ATP make sense. CTP signals that pyrimidines are plentiful; ATP, a purine, signals both energy and purine supply, so ATCase balances the production of the two kinds of nucleotide needed in roughly equal amounts for nucleic acids.

::: intuition Why allostery is useful
An enzyme's active site is constrained by chemistry: it must bind its substrate and stabilise one transition state. If regulators had to bind there, every regulator would have to look like the substrate. Allostery breaks this constraint. Because the signal is transmitted through a change of conformation, *any* molecule can in principle regulate *any* enzyme, if evolution builds a binding site somewhere on its surface. Monod called this the principle of "gratuity": the chemical link between regulator and target is arbitrary, so regulatory networks are free to connect whatever physiology requires — just as, in gene regulation, any signal can control any gene.
:::

### Cooperativity and sensitivity

Many allosteric enzymes are oligomers whose sites interact, so that binding substrate at one site raises the affinity of the others. Their rate curves are **sigmoid** rather than hyperbolic, and a useful empirical description was introduced by Archibald Hill in 1910 for oxygen binding to haemoglobin.

::: proposition The Hill equation {#prop-hill}
The fractional saturation (or fractional rate) of a cooperative protein is often well described by

$$
\theta = \frac{[\mathrm{S}]^{n_\mathrm{H}}}{K_{0.5}^{\,n_\mathrm{H}} + [\mathrm{S}]^{n_\mathrm{H}}},\qquad\text{equivalently}\qquad \log\frac{\theta}{1-\theta} = n_\mathrm{H}\log[\mathrm{S}] - n_\mathrm{H}\log K_{0.5},
$$ {#eq-hill}

where $K_{0.5}$ is the concentration giving half-saturation and $n_\mathrm{H}$ the **Hill coefficient**. $n_\mathrm{H} = 1$ gives the Michaelis–Menten hyperbola; $n_\mathrm{H} > 1$ indicates positive cooperativity. The equation is exact only for the unphysical case of all $n$ sites binding at once; for real proteins $n_\mathrm{H}$ is an empirical measure of steepness, never larger than the number of binding sites (haemoglobin: 4 sites, $n_\mathrm{H} \approx 2.8$). Mechanistic models — the concerted MWC model (Monod, Jeffries Wyman and Changeux, 1965) and the sequential KNF model (Koshland, George Némethy and David Filmer, 1966) — derive sigmoid curves from conformational changes and are treated in [Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=protein-function).
:::

::: example How cooperativity sharpens a response {#ex-81}
For a protein obeying [[#eq-hill]], by what factor must [S] increase to raise $\theta$ from 0.1 to 0.9, for $n_\mathrm{H} = 1$, 2.8 and 4?
::: solution
From [[#eq-hill]], $\theta/(1-\theta) = ([\mathrm{S}]/K_{0.5})^{n_\mathrm{H}}$. At $\theta = 0.9$ the ratio is 9; at $\theta = 0.1$ it is 1/9; their quotient is 81. So $([\mathrm{S}]_{0.9}/[\mathrm{S}]_{0.1})^{n_\mathrm{H}} = 81$, and the required fold change is $81^{1/n_\mathrm{H}}$:

- $n_\mathrm{H} = 1$: 81-fold;
- $n_\mathrm{H} = 2.8$: $81^{1/2.8} = 4.8$-fold;
- $n_\mathrm{H} = 4$: 3-fold.

A non-cooperative enzyme needs an 81-fold change in substrate to go from 10 % to 90 % activity; a strongly cooperative one needs only a threefold change. Cooperativity converts a graded input into a nearly switch-like output, and is one of several ways cells achieve **ultrasensitivity**.
:::
:::

::: widget plot
f: x^n/(K^n + x^n); x/(K + x)
x: 0, 10
y: 0, 1.05
sliders: n=2.8:1:6:0.1; K=3:0.5:8:0.1
labels: \text{Hill, } n_\mathrm{H} = n; \text{Michaelis–Menten}
hlines: 0.1; 0.9
caption: Fractional activity $\theta$ against substrate concentration (arbitrary units) from [[#eq-hill]], with the Hill coefficient $n$ and half-saturation constant $K$ set by the sliders, and the hyperbola with the same $K$ for comparison. The horizontal lines mark $\theta = 0.1$ and $0.9$. Raise $n$ and see the range of concentrations between the two lines shrink as $81^{1/n}$ ([[#ex-81]]); an allosteric inhibitor acts by increasing $K$, moving the steep part to the right.
:::

::: example Estimating a Hill coefficient {#ex-hill-fit}
An allosteric enzyme runs at 20 % of its maximal rate at 2.0 mmol L⁻¹ substrate and at 67 % at 4.0 mmol L⁻¹. Assuming [[#eq-hill]], estimate $n_\mathrm{H}$ and $K_{0.5}$.
::: solution
$\theta/(1-\theta)$ is $0.2/0.8 = 0.25$ at 2.0 mmol L⁻¹ and $0.67/0.33 = 2.03$ at 4.0 mmol L⁻¹. Their ratio is 8.12, produced by a doubling of [S], so $n_\mathrm{H} = \log 8.12/\log 2 = 3.02$. Then $([\mathrm{S}]/K_{0.5})^{3.02} = 0.25$ at 2.0 gives $K_{0.5} = 2.0\times0.25^{-1/3.02} = 3.17$ mmol L⁻¹. With real data one would fit all points by non-linear regression, or plot $\log[\theta/(1-\theta)]$ against $\log[\mathrm{S}]$ (a Hill plot), whose slope near $\theta = 0.5$ is $n_\mathrm{H}$.
:::
:::

## Covalent modification

Allostery responds to molecules inside the cell. To respond to signals from outside — hormones, neurotransmitters, light — cells use reversible covalent modification, most often phosphorylation.

::: definition Reversible covalent modification {#def-covalent}
An enzyme is regulated by **reversible covalent modification** when its activity is changed by the enzyme-catalysed attachment of a chemical group, and restored by a second enzyme that removes it. The commonest is **phosphorylation** of serine, threonine or tyrosine side chains by a **protein kinase** using ATP, reversed by a **protein phosphatase**. Others include acetylation of lysine, adenylylation, ADP-ribosylation, and reduction and oxidation of cysteine disulfides.
:::

Edmond Fischer and Edwin Krebs discovered regulatory phosphorylation in 1955 while studying glycogen phosphorylase from rabbit skeletal muscle (Nobel Prize in Physiology or Medicine, 1992). Carl and Gerty Cori had already found that phosphorylase exists as a less active form *b* and a more active form *a*; Fischer and Krebs showed that conversion of *b* to *a* requires ATP and a second enzyme, phosphorylase kinase, which attaches a phosphate to a single serine (Ser14). Today the human genome is known to encode about 500 protein kinases (G. Manning and colleagues, 2002), and phosphoproteomic surveys detect phosphorylation on a large majority of human proteins at some time.

### Cascades and amplification

When adrenaline reaches a muscle cell, it sets off a chain of enzymes, each activating many copies of the next ([[cell-biology/cell-signalling]]): the hormone–receptor complex activates G proteins, which activate adenylyl cyclase, which makes cyclic AMP; cAMP activates protein kinase A; protein kinase A phosphorylates and activates phosphorylase kinase; and phosphorylase kinase phosphorylates glycogen phosphorylase, converting it to the *a* form. The same kinase phosphorylates glycogen synthase, *inactivating* it, so that glycogen is not made at the same time as it is broken down.

::: example Amplification by a cascade {#ex-cascade}
Suppose (illustratively) that the four amplifying steps of the cascade — receptor to G protein and adenylyl cyclase, cyclase to cAMP and active PKA, PKA to phosphorylase kinase, and phosphorylase kinase to phosphorylase — multiply the signal by factors of 10, 100, 10 and 100 respectively. How many molecules of phosphorylase *a* could one hormone-occupied receptor produce, and how many glucose 1-phosphate molecules per second would they release if each has $k_\mathrm{cat} \approx 50\ \mathrm{s^{-1}}$?
::: solution
The amplification is $10\times100\times10\times100 = 10^6$ molecules of phosphorylase *a* per receptor, each releasing about 50 glucose 1-phosphate per second, or $5\times10^7$ per second per receptor. A few hundred occupied receptors per cell can therefore mobilise glycogen at a rate that would take enormous numbers of hormone molecules if each acted directly on the enzyme. Cascades also offer several points for integration with other signals (Ca²⁺ from nerve stimulation activates phosphorylase kinase directly, so contraction and hormone combine) and for switching off: phosphodiesterase destroys cAMP and phosphatases remove the phosphates.
:::
:::

### Switches built from modification cycles

A kinase and a phosphatase acting on the same protein form a cycle, and the steady-state fraction of modified protein depends on the ratio of their activities. Albert Goldbeter and Daniel Koshland showed in 1981 that if both enzymes are saturated by their protein substrate — working in the "zero-order" regime — the cycle behaves as a sharp switch.

::: proposition Zero-order ultrasensitivity (Goldbeter–Koshland) {#prop-gk}
Let a protein be converted to its modified form by a kinase with maximal rate $V_1$ and Michaelis constant $K_1$, and back by a phosphatase with $V_2$ and $K_2$, both following Michaelis–Menten kinetics. Write $u = V_1/V_2$ and express the Michaelis constants relative to the total protein concentration, $J_1 = K_1/[\mathrm{P}]_\mathrm{T}$, $J_2 = K_2/[\mathrm{P}]_\mathrm{T}$. At steady state the fraction modified is

$$
f = \frac{2uJ_2}{B + \sqrt{B^2 - 4(1-u)uJ_2}},\qquad B = 1 - u + J_1 + uJ_2.
$$ {#eq-gk}

When $J_1, J_2 \gg 1$ (enzymes far from saturation), $f$ is a hyperbolic function of $u$, like $u/(1+u)$ for $J_1 = J_2$. When $J_1, J_2 \ll 1$ (both saturated), $f$ switches from near 0 to near 1 over a narrow range around $u = 1$. Assumptions: the enzymes are present at much lower concentration than the protein substrate, no enzyme is sequestered in complexes, and the steady state is reached.
:::

::: widget plot
f: 2*x*k/((1 - x + k + x*k) + sqrt((1 - x + k + x*k)^2 - 4*(1 - x)*x*k)); x/(1 + x)
x: 0, 3
y: 0, 1.05
sliders: k=0.01:0.001:2:0.001
labels: \text{Goldbeter–Koshland, } J_1 = J_2 = k; \text{first-order cycle}
caption: Steady-state fraction of a protein in its phosphorylated form against the ratio $u = V_1/V_2$ of kinase to phosphatase activity, from [[#eq-gk]] with $J_1 = J_2 = k$ (slider), compared with the hyperbola $u/(1+u)$ of a cycle with unsaturated enzymes. With $k = 0.01$ (enzymes saturated) the protein switches from almost all unmodified to almost all modified as $u$ crosses 1; move $k$ towards 2 and the switch softens into a gradual response.
:::

Zero-order ultrasensitivity is thought to sharpen many signalling responses, though in cells it competes with other mechanisms — multisite phosphorylation, positive feedback and sequestration — for the title of the main source of switch-like behaviour ([[systems-biology/switches-oscillators]]).

### Other modifications

- **Adenylylation.** Earl Stadtman and colleagues found in the late 1960s that glutamine synthetase of *E. coli*, a dodecamer at the centre of nitrogen assimilation, is progressively inactivated as AMP groups are attached to its subunits, under control of the cell's nitrogen status.
- **Redox switching.** In chloroplasts, several enzymes of the Calvin–Benson cycle are activated in the light when their disulfide bonds are reduced by thioredoxin, which receives electrons from photosystem I; they are switched off in the dark, preventing a futile cycle with the oxidative pentose phosphate pathway (B. B. Buchanan and colleagues, from the 1960s).
- **Proteolytic activation.** Digestive proteases are made as inactive **zymogens** (trypsinogen, chymotrypsinogen) and activated by cleavage in the gut, which protects the pancreas that makes them; blood clotting and complement are cascades of zymogen activation. This switch is irreversible: the active enzyme is turned off by inhibitors or destruction.

## Who controls the flux?

Biochemistry textbooks once described each pathway as having a **rate-limiting step**, a single slow enzyme that sets the flux. The idea is attractive but often wrong, and the way to see why led to one of the most useful frameworks in quantitative biology.

### Metabolic control analysis

Henrik Kacser and Jim Burns (1973) and, independently, Reinhart Heinrich and Tom Rapoport (1974) asked how much a pathway's steady-state flux changes when the activity of one enzyme is changed by a small amount.

::: definition Flux control coefficient {#def-control}
The **flux control coefficient** of enzyme $i$ over the steady-state flux $J$ through a pathway is the fractional change in flux divided by the fractional change in that enzyme's activity $E_i$, for a small change with everything else held constant:

$$
C^J_{E_i} = \frac{\partial\ln J}{\partial\ln E_i} \approx \frac{\Delta J/J}{\Delta E_i/E_i}.
$$ {#eq-control}

A coefficient of 1 means the enzyme is fully rate-limiting (a 10 % increase in its activity raises flux by 10 %); 0 means changing it has no effect on flux. Control coefficients are properties of the whole system at a particular steady state, not of an enzyme alone: the same enzyme can have high control in one tissue or condition and little in another.
:::

::: proposition The summation theorem {#prop-summation}
For a pathway at steady state, the flux control coefficients of all its enzymes sum to one:

$$
\sum_i C^J_{E_i} = 1.
$$ {#eq-summation}

Assumptions: each reaction rate is proportional to its enzyme's activity, and the system's steady state is determined by the enzymes and by fixed external concentrations (sources and sinks).
:::

::: proof Sketch
Suppose every enzyme's activity is multiplied by the same factor $(1+\varepsilon)$. Every rate then increases by that factor at the old metabolite concentrations, so those concentrations remain a steady state and the flux simply increases by $(1+\varepsilon)$. The fractional change in flux, $\varepsilon$, is the sum of the effects of each enzyme's fractional change, $\sum_i C^J_{E_i}\,\varepsilon$. Hence $\sum_i C^J_{E_i} = 1$.
:::

The theorem has a striking consequence. If a pathway has ten enzymes, control is shared among them, and the average coefficient is only 0.1. A truly rate-limiting step ($C = 1$) is possible only if every other enzyme has zero control, which is rare. Moreover, because a large increase in one enzyme's activity shifts control onto others, raising one enzyme rarely raises the flux much.

::: example Estimating a control coefficient {#ex-control}
In cultured cells, the activity of an enzyme is raised by 20 % by expressing extra copies of its gene, and the pathway's flux rises by 3 %. Estimate the flux control coefficient. If the pathway has five other enzymes with roughly equal control, what are their coefficients?
::: solution
By [[#eq-control]], $C \approx 0.03/0.20 = 0.15$ (using logarithms, $\ln1.03/\ln1.20 = 0.16$; the two agree for small changes). By [[#eq-summation]] the other five share $1 - 0.15 = 0.85$, about 0.17 each. No enzyme is rate-limiting; control is distributed. This is what Jürgen Heinisch, Fritz Zimmermann and colleagues found when they overexpressed glycolytic enzymes one at a time in baker's yeast in the 1980s: none of them increased the rate of ethanol production appreciably.
:::
:::

::: warning "The rate-limiting step is the slowest enzyme"
In a steady-state pathway every enzyme carries the same flux, so none is "slower" than another in that sense. A step with low maximal activity relative to the flux may have high control, but control depends also on how strongly each enzyme's rate responds to its substrates and products (its **elasticities**) and on feedback. An enzyme can exert little control precisely *because* it is strongly regulated by feedback: when its activity is raised, its end product rises and inhibits it back. And control is a property of a steady state — the enzyme that controls flux at rest may not do so during exercise. "Rate-limiting step" is best kept for a step that is shown, by measurement, to have a control coefficient near one.
:::

Where, then, does regulation act, if not on one rate-limiting enzyme? Regulated enzymes are typically those that catalyse steps far from equilibrium (the near-equilibrium steps simply follow mass action; see the flux–force relation in [Chemistry Atlas: glycolysis](/learn/chemistry/lesson.php?c=biochemistry&l=glycolysis-citric-acid)). But control analysis shows that a large change in flux is best achieved by changing several enzymes together, for instance by a hormone that phosphorylates several, or by induction of all the genes of a pathway at once. David Fell called this **multisite modulation** (*Understanding the Control of Metabolism*, 1997); it explains why gene-expression programmes usually switch whole pathways on together.

### Substrate cycles

At three points in glucose metabolism, opposing reactions catalysed by different enzymes interconvert the same pair of metabolites: fructose 6-phosphate and fructose 1,6-bisphosphate are interconverted by phosphofructokinase-1 (glycolysis) and fructose 1,6-bisphosphatase (gluconeogenesis). Running both together simply hydrolyses ATP, and such pairs were once called "futile cycles". Eric Newsholme argued in the 1970s that a low rate of cycling is the price of sensitivity.

::: example Sensitivity from a substrate cycle {#ex-cycle}
In a tissue, the forward reaction of a cycle runs at 10 units and the reverse at 9, giving a net flux of 1. An effector raises the forward rate by 20 % (to 12) without changing the reverse. By what factor does the net flux change? Compare with a pathway with no reverse reaction.
::: solution
The net flux goes from $10 - 9 = 1$ to $12 - 9 = 3$, a threefold (200 %) increase from a 20 % change in one enzyme. Without the reverse reaction, a 20 % increase gives a 20 % increase in flux. If the effector also inhibits the reverse enzyme (as fructose 2,6-bisphosphate activates PFK-1 and inhibits fructose 1,6-bisphosphatase), the amplification is greater still. The cost is the ATP hydrolysed by cycling, 9 units here. Cycling rates measured with isotopes in liver are indeed a modest fraction of the net flux.
:::
:::

Substrate cycles may also make heat. Bumblebees can warm their flight muscles before take-off in cold weather, and some species have very high fructose 1,6-bisphosphatase activity in those muscles, which Newsholme and colleagues proposed (1972) runs a cycle with PFK to generate heat. Later comparative studies (J. F. Staples and colleagues, 2004) found that the enzyme's activity varies greatly among bumblebee species, and questioned how much heat the cycle can make relative to shivering of the flight muscles — a hypothesis still debated.

## A case study: phosphofructokinase

Phosphofructokinase-1 (PFK-1), which commits fructose 6-phosphate to glycolysis, shows most of the mechanisms of this chapter in one enzyme.

- **Allosteric inhibition by ATP.** ATP is a substrate, but at high concentration it also binds a regulatory site and lowers the affinity for fructose 6-phosphate, so the enzyme slows when energy is plentiful. Citrate, signalling ample fuel for the citric acid cycle, enhances the inhibition.
- **Activation by AMP and ADP.** Because the adenylate kinase reaction ($2\,\mathrm{ADP} \rightleftharpoons \mathrm{ATP} + \mathrm{AMP}$) is near equilibrium, a small fall in ATP produces a large relative rise in AMP ([[biochemistry/bioenergetics]]), making AMP a sensitive signal of energy need.
- **Hormonal control through fructose 2,6-bisphosphate.** Discovered in 1980 by Émile Van Schaftingen, Louis Hue and Henri-Géry Hers in Louvain (and by other groups at about the same time), this metabolite is the most potent activator of liver PFK-1. Its level is set by a bifunctional enzyme whose kinase and phosphatase activities are switched by phosphorylation under the control of glucagon — so a hormone controls glycolysis and gluconeogenesis in the liver through an allosteric effector.
- **Isozymes.** Mammals have muscle, liver and platelet forms with different regulatory properties.
- **Evolutionary variation.** Bacterial PFKs are allosterically inhibited by phosphoenolpyruvate, and many plants and protists have, alongside ATP-PFK, a reversible pyrophosphate-dependent PFK that uses PPᵢ instead of ATP — a different way of managing the same metabolic junction.

::: quiz
In a five-enzyme pathway, the flux control coefficients of the first four enzymes are measured as 0.05, 0.40, 0.20 and 0.10. What is the control coefficient of the fifth, and which enzyme would be the best single target for increasing the flux?
- [ ] 0.75; the fifth enzyme.
- [x] 0.25; the second enzyme, though raising it alone would give less than a proportional increase.
- [ ] It cannot be determined without knowing the enzymes' maximal rates.
- [ ] 1; every enzyme in a pathway is rate-limiting.
::: solution
By the summation theorem, $C_5 = 1 - (0.05 + 0.40 + 0.20 + 0.10) = 0.25$. The second enzyme has the most control, so a small increase in it gives the largest fractional increase in flux (about 0.4 % per 1 %). But as its activity rises, control shifts to the others, so a large increase gives diminishing returns. To raise the flux substantially, increase several enzymes together.
:::
:::

::: application Engineering metabolism
Metabolic engineers who want a microbe or a crop to make more of a product — an amino acid, a biofuel, a drug precursor — learned from control analysis that overexpressing one "rate-limiting" enzyme is usually disappointing. Successful strategies remove feedback inhibition (using feedback-resistant mutant enzymes, as in industrial lysine production by *Corynebacterium glutamicum*), increase several enzymes together, delete competing branches, and balance the supply of cofactors such as NADPH and ATP ([[systems-biology/metabolic-networks]], [[biotechnology]]).
:::

::: history
Archibald Hill proposed his equation for haemoglobin in 1910. Carl and Gerty Cori described the *a* and *b* forms of phosphorylase in the 1930s–40s, and Fischer and Krebs discovered regulatory phosphorylation in 1955. Feedback inhibition was discovered independently by Umbarger and by Yates and Pardee in 1956. Monod, Changeux and Jacob introduced the term *allosteric* in 1963, and the concerted model followed in 1965 (Monod, Wyman and Changeux) and the sequential model in 1966 (Koshland, Némethy and Filmer). Gerhart and Schachman separated the catalytic and regulatory subunits of ATCase in 1965. Kacser and Burns (1973) and Heinrich and Rapoport (1974) founded metabolic control analysis; Goldbeter and Koshland described zero-order ultrasensitivity in 1981; fructose 2,6-bisphosphate was discovered in 1980.
:::

## Where this leads

These mechanisms reappear wherever metabolism is controlled: at PFK and pyruvate kinase in [[biochemistry/glycolysis-tca]], in respiratory control in [[biochemistry/oxidative-phosphorylation]], and in the hormonal switching of whole organisms between storage and mobilisation in [[biochemistry/metabolic-integration]]. Their dynamics — switches, oscillators and robustness — are developed in [[systems-biology]].

::: summary
- Enzyme activity is regulated on time scales from milliseconds (substrates, allosteric effectors) through minutes (covalent modification) to hours (enzyme amount), and by compartmentation.
- Feedback inhibition of the committed step by the end product (isoleucine on threonine deaminase; CTP on ATCase) is allosteric: effectors bind elsewhere and act through conformation, so any metabolite can regulate any enzyme.
- Cooperativity gives sigmoid kinetics, described empirically by the Hill equation; going from 10 % to 90 % activity needs an $81^{1/n_\mathrm{H}}$-fold change in substrate.
- Phosphorylation by kinases and dephosphorylation by phosphatases link enzymes to hormones; cascades amplify signals by factors of $10^6$; saturated modification cycles act as switches (Goldbeter–Koshland).
- Metabolic control analysis: flux control coefficients $C^J_{E_i} = \partial\ln J/\partial\ln E_i$ sum to 1, so control is usually shared and single "rate-limiting steps" are rare.
- Substrate cycles buy sensitivity at a cost in ATP; PFK-1 combines allostery (ATP, AMP, citrate), hormonal control via fructose 2,6-bisphosphate and isozymes.
:::

## Exercises

::: exercise The 81-fold rule {level=1 check="13.3"}
By what factor must the substrate concentration rise to take an enzyme with $n_\mathrm{H} = 1.7$ (such as glucokinase) from 10 % to 90 % of its maximal rate (three significant figures)?
::: solution
$81^{1/1.7} = 13.3$.
:::
:::

::: exercise Summing control {level=1 check="0.3"}
In a four-enzyme pathway, three enzymes have flux control coefficients 0.1, 0.2 and 0.4. What is the fourth?
::: solution
By [[#eq-summation]], $1 - 0.7 = 0.3$.
:::
:::

::: exercise A Hill coefficient from two points {level=2 check="2"}
An enzyme is 10 % active at 1.0 mmol L⁻¹ substrate and 50 % active at 3.0 mmol L⁻¹. Using [[#eq-hill]], find $n_\mathrm{H}$ to one significant figure.
::: solution
At 50 %, $[\mathrm{S}] = K_{0.5} = 3.0$. At 10 %, $\theta/(1-\theta) = 1/9 = (1/3)^{n_\mathrm{H}}$, so $n_\mathrm{H} = \ln 9/\ln 3 = 2.0$.
:::
:::

::: exercise Amplification by a substrate cycle {level=2 check="4.9"}
A substrate cycle has forward rate 10 and reverse rate 9.5 (arbitrary units). An effector raises the forward rate by 10 % and lowers the reverse rate by 10 %. By what factor does the net flux increase? Compare a cycle with reverse rate 8.
::: solution
The net flux goes from $10 - 9.5 = 0.5$ to $11 - 8.55 = 2.45$, a factor of 4.9, from 10 % changes in two enzymes. With reverse rate 8, it goes from 2 to $11 - 7.2 = 3.8$, a factor of only 1.9. The closer the two rates (the more cycling relative to net flux), the greater the amplification — and the more ATP is spent: 9.5 units of cycling per 0.5 units of net flux in the first case.
:::
:::

::: exercise Desensitised ATCase {level=2}
Gerhart and Pardee found that ATCase treated with mercurials loses its response to CTP and ATP and shows hyperbolic rather than sigmoid kinetics, with a $V_{\max}$ similar to or higher than that of the native enzyme. (a) What does this tell you about where CTP binds and about the origin of cooperativity? (b) Why might the desensitised enzyme be more active at low aspartate concentrations than the native enzyme in the absence of effectors?
::: solution
(a) CTP binds at sites separate from the active site (on what turned out to be separate regulatory subunits), since activity survives when regulation is lost; the sigmoid kinetics depend on interactions between subunits in the intact complex, which are disrupted when the regulatory subunits are removed. (b) In the native enzyme, the regulatory subunits stabilise a low-affinity (T) state; without substrate or ATP most molecules are in this state, so activity at low aspartate is low. The isolated catalytic trimers resemble the high-affinity (R) state, active even at low substrate. Allosteric enzymes are often *restrained* in their native form; regulation consists of releasing the restraint.
:::
:::

::: exercise A kinase–phosphatase switch {level=2}
Using [[#eq-gk]] with $J_1 = J_2 = 0.01$, the fraction modified is about 0.08 at $u = 0.9$ and about 0.91 at $u = 1.1$. (a) By what factor must the kinase-to-phosphatase ratio change to switch the protein from 8 % to 91 % modified? (b) Compare this with a single binding site obeying Michaelis–Menten kinetics. (c) Name two cellular conditions that would weaken the switch.
::: solution
(a) From 0.9 to 1.1, a factor of $1.1/0.9 = 1.22$ — a 22 % change. (b) A hyperbolic response would need roughly the 81-fold change of [[#ex-81]] to go from 10 % to 90 %. (c) Enzymes that are not saturated (their $K_\mathrm{m}$ comparable to or larger than the substrate protein's concentration), sequestration of a large fraction of the substrate protein in enzyme complexes (when enzyme and substrate concentrations are similar), or additional reactions that remove or degrade the modified protein.
:::
:::

::: exercise Interpreting an enzyme titration {level=3}
The flux of a liver pathway is measured while the activity of enzyme X is lowered with increasing concentrations of a specific irreversible inhibitor:

| X activity (% of normal) | 100 | 80 | 60 | 40 | 20 |
|---|---|---|---|---|---|
| flux (% of normal) | 100 | 97 | 91 | 78 | 52 |

(a) Estimate the flux control coefficient of X at normal activity from the first two points. (b) How does the control coefficient change as X is inhibited, and why? (c) A genetic study finds that people heterozygous for a null allele of the gene for X (50 % of normal activity) show no detectable change in the pathway's flux. Is this consistent with the data? What general phenomenon of genetics does it explain?
::: solution
(a) $C \approx (\Delta J/J)/(\Delta E/E) = (-3/100)/(-20/100) = 0.15$. (Using logarithms, $\ln0.97/\ln0.8 = 0.14$.)
(b) Between 40 % and 20 % activity, flux falls from 78 to 52 for a halving of activity: $C \approx \ln(52/78)/\ln(20/40) = 0.58$. Control rises as X is inhibited, because the other enzymes now have spare capacity and X becomes more limiting. Control coefficients are properties of a particular state.
(c) Yes: at 50 % activity the table predicts a flux of about 85–90 % of normal, a change that may be hard to detect against individual variation. This is Kacser and Burns's explanation of **dominance** (1981): because control is shared among many enzymes, most enzymes have small control coefficients, so halving one (as in a heterozygote for a loss-of-function allele) has little effect on flux, and the wild-type allele appears dominant. Recessiveness of most loss-of-function mutations is thus a consequence of metabolic network structure, not of special dominance-modifying genes ([[genetics/extensions-of-mendel]]).
:::
:::

::: exercise Designing a feedback-resistant pathway {level=3}
A biotechnology company wants *E. coli* to overproduce the amino acid threonine. Threonine is made from aspartate in a branched pathway (branches also lead to lysine and methionine); the first enzyme, aspartokinase, exists as three isozymes, one of them (AK I) inhibited by threonine; homoserine dehydrogenase, after the lysine branch, is also inhibited by threonine. (a) Why does simply adding extra copies of the AK I gene give little extra threonine? (b) Propose three genetic changes that together would increase threonine output, and explain each in terms of this chapter. (c) What new problem might arise in the engineered cells?
::: solution
(a) Extra enzyme raises threonine, which inhibits AK I and homoserine dehydrogenase more strongly, cancelling much of the increase; and by control analysis the flux depends on many enzymes, so raising one alone gives a small fractional gain.
(b) (1) Replace AK I and homoserine dehydrogenase with feedback-resistant mutant forms (selected, for instance, for resistance to a toxic threonine analogue), removing the allosteric brake. (2) Overexpress several enzymes of the pathway together (multisite modulation), for example the whole *thr* operon. (3) Reduce competing branches (lysine and methionine synthesis) and threonine degradation, and increase export of threonine. Further changes would increase the supply of aspartate and of NADPH used by the dehydrogenase steps.
(c) Without feedback, the cell may divert so much carbon, ATP and NADPH to threonine that growth slows, or it may run short of lysine and methionine; high intracellular threonine may also inhibit other enzymes. Industrial strains balance production against growth, sometimes by switching production on only after the culture has grown.
:::
:::
