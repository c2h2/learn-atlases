Glucose is broken down by almost every organism on Earth, and in almost every case the first stage is the same ten-step pathway, **glycolysis**, which splits it into two molecules of pyruvate and captures a little of its energy as ATP. What happens next depends on the organism and on oxygen. With oxygen, most organisms oxidise pyruvate completely to carbon dioxide through the **citric acid cycle**, passing the electrons to the respiratory chain. Without it, they must dispose of the electrons some other way, and the variety of their solutions — lactate in muscle and yoghurt, ethanol and CO₂ in bread and beer, the acids and gases of the gut, the holes in Swiss cheese — is the biology of **fermentation**.

The chemistry of the individual steps — the mechanisms of aldolase, glyceraldehyde-3-phosphate dehydrogenase and the other enzymes, the thermodynamics of each reaction, and the reactions of the citric acid cycle and gluconeogenesis — is set out in detail in [Chemistry Atlas: glycolysis and the citric acid cycle](/learn/chemistry/lesson.php?c=biochemistry&l=glycolysis-citric-acid). This chapter takes those steps as known and looks at the pathways from the outside: their diversity across life, the problem of redox balance and the many fermentations that solve it, the trade-off between the rate and the yield of ATP, the experiments by which the cycle was discovered, and the cycle's role as a hub that supplies biosynthesis as well as burning fuel.

## Glycolysis in outline

::: proposition The overall reaction of glycolysis {#prop-glycolysis}
The Embden–Meyerhof–Parnas pathway converts one glucose to two pyruvate with the net reaction

$$
\text{glucose} + 2\,\mathrm{NAD^+} + 2\,\mathrm{ADP} + 2\,\mathrm{P_i} \longrightarrow 2\,\text{pyruvate} + 2\,\mathrm{NADH} + 2\,\mathrm{H^+} + 2\,\mathrm{ATP} + 2\,\mathrm{H_2O}.
$$ {#eq-glycolysis}

Two ATP are invested (by hexokinase and phosphofructokinase-1) and four are made by substrate-level phosphorylation (by phosphoglycerate kinase and pyruvate kinase), for a net yield of 2 ATP; one oxidation (by glyceraldehyde-3-phosphate dehydrogenase) produces 2 NADH. Starting from glycogen, phosphorolysis gives glucose 1-phosphate without spending ATP, so the net yield is 3 ATP per glucose unit.
:::

The pathway has a **preparatory phase**, in which glucose is phosphorylated twice and split into two interconvertible three-carbon sugar phosphates, and a **payoff phase**, in which each three-carbon unit is oxidised and its energy captured as ATP. Three steps are far from equilibrium and regulated — hexokinase, phosphofructokinase-1 and pyruvate kinase ([[biochemistry/enzyme-regulation]]); the other seven are near equilibrium and also serve gluconeogenesis, in which four bypass enzymes reverse the irreversible steps.

Glycolysis runs in the cytosol (and, in trypanosomes, partly in peroxisome-like organelles called glycosomes). It needs no oxygen and no membranes, works at any rate from a trickle to a flood, and is found in all three domains of life — although, as we shall see, not always in the same form.

### Variations on the theme

The Embden–Meyerhof–Parnas (EMP) pathway is not the only route from glucose to pyruvate.

- **The Entner–Doudoroff (ED) pathway**, discovered in *Pseudomonas saccharophila* by Nathan Entner and Michael Doudoroff (1952), oxidises glucose 6-phosphate to 6-phosphogluconate, dehydrates it and splits it into pyruvate and glyceraldehyde 3-phosphate. It yields only 1 ATP per glucose, together with one NADH and one NADPH. It is widespread among bacteria, especially aerobes, and is used by the ethanol-producing bacterium *Zymomonas mobilis* and by cyanobacteria and plants.
- **The pentose phosphate pathway** oxidises glucose 6-phosphate to make NADPH and ribose 5-phosphate for biosynthesis, rather than ATP ([[biochemistry/bioenergetics]]).
- **Archaea** use modified versions of both pathways, with unusual enzymes: ADP- rather than ATP-dependent sugar kinases in some, and a non-phosphorylating glyceraldehyde-3-phosphate dehydrogenase that skips one ATP-producing step in others.

Why would an organism use a pathway that makes half as much ATP? A. Flamholz, R. Milo and colleagues (*PNAS* 110, 10039, 2013) calculated how much enzyme protein each pathway needs to sustain a given flux, given the kinetics and thermodynamics of its steps. The ED pathway, with fewer steps and a more favourable thermodynamic profile, needs several-fold less protein for the same glucose flux. An organism that makes plenty of ATP by respiration, or that is limited by the cost of making proteins rather than by ATP, may do better with ED; one that depends on glycolytic ATP, such as an anaerobe, does better with EMP. The distribution of the two pathways among bacteria fits this trade-off.

## The redox problem and fermentation

Glycolysis has a hidden flaw. Glyceraldehyde-3-phosphate dehydrogenase needs NAD⁺, and the cytosol contains only about a millimole per litre of NAD⁺ + NADH. If NADH were not reoxidised, glycolysis would stop within seconds. Respiring cells pass its electrons into mitochondria and on to oxygen ([[biochemistry/oxidative-phosphorylation]]). Without an external electron acceptor, the electrons must be handed back to an organic product of the pathway itself.

::: definition Fermentation {#def-fermentation}
In the biochemical sense, a **fermentation** is an energy-yielding catabolic process in which an organic compound acts as both electron donor and electron acceptor, with no external acceptor such as O₂, nitrate or sulfate and no respiratory electron-transport chain. ATP is made only by substrate-level phosphorylation. Because no electrons leave the system, the products taken together are exactly as oxidised as the substrate. (Industry uses "fermentation" more loosely for any large-scale microbial culture, aerobic or not.)
:::

::: proposition Electron balance in a fermentation {#prop-balance}
Count the **available electrons** of a molecule as the number of electrons it would give up on complete oxidation to CO₂, H₂O and NH₃: $4n_\mathrm{C} + n_\mathrm{H} - 2n_\mathrm{O} - 3n_\mathrm{N}$ plus the negative charge (for an ion), for a molecule with $n_\mathrm{C}$ carbon, $n_\mathrm{H}$ hydrogen, $n_\mathrm{O}$ oxygen and $n_\mathrm{N}$ nitrogen atoms. Glucose has 24, lactate (as lactic acid) 12, ethanol 12, acetic acid 8, succinic acid 14, formic acid 2, H₂ 2 and CO₂ 0. In a fermentation, carbon and available electrons are both conserved: the products of one glucose contain 6 carbons and 24 available electrons (less what is incorporated into cell material).
:::

::: example Balancing two classic fermentations {#ex-balance}
Check the electron and carbon balances of (a) homolactic fermentation, glucose → 2 lactate, and (b) alcoholic fermentation, glucose → 2 ethanol + 2 CO₂. In each, how is the NADH made by glycolysis reoxidised?
::: solution
(a) Carbon: $6 = 2\times3$. Electrons: $24 = 2\times12$. Lactate dehydrogenase reduces pyruvate with NADH, regenerating NAD⁺: the two NADH from glycolysis are used to make two lactate.
(b) Carbon: $6 = 2\times2 + 2\times1$. Electrons: $24 = 2\times12 + 2\times0$. Pyruvate decarboxylase removes CO₂ to give acetaldehyde, and alcohol dehydrogenase reduces acetaldehyde to ethanol with NADH. CO₂, the most oxidised product, carries no available electrons, so ethanol must carry them all — which is why ethanol is more reduced than lactate per carbon.

Both fermentations make only the 2 ATP of glycolysis, about a fifteenth of what respiration yields, so a fermenting cell must consume glucose much faster for the same ATP supply.
:::
:::

### A catalogue of fermentations

Microorganisms have found many ways to balance the books, each characteristic of a group and often of practical importance.

| fermentation | main products from glucose | organisms | ATP per glucose |
|---|---|---|---|
| homolactic | 2 lactate | *Lactococcus*, many *Lactobacillus*; animal muscle | 2 |
| heterolactic | lactate + ethanol + CO₂ | *Leuconostoc*, some lactobacilli (phosphoketolase pathway) | 1 |
| alcoholic | 2 ethanol + 2 CO₂ | *Saccharomyces* and other yeasts (EMP); *Zymomonas* (ED) | 2 (yeast), 1 (*Zymomonas*) |
| mixed acid | lactate, acetate, ethanol, succinate, formate (→ H₂ + CO₂) | *Escherichia coli*, *Salmonella* | 2–3 |
| butanediol | 2,3-butanediol, ethanol, CO₂ | *Enterobacter*, *Serratia* | 2 |
| propionic | propionate, acetate, CO₂ (from lactate) | *Propionibacterium* | variable |
| butyric and solventogenic | butyrate, acetate, H₂, CO₂; later butanol and acetone | *Clostridium* | up to 3 |

The yields differ because some routes recover extra ATP: an acetyl phosphate made from acetyl-CoA can pass its phosphate to ADP (acetate kinase), so organisms that release acetate and H₂ make more ATP than those that make only lactate — but must dispose of electrons as H₂, which is favourable only if the H₂ is kept at low pressure, typically by H₂-consuming partners such as methanogens. These partnerships are central to anaerobic ecosystems, from the cow's rumen to sewage digesters ([[microbiology/microbial-metabolism]]).

Fermentation products are signatures used to identify bacteria: the methyl red and Voges–Proskauer tests of the clinical laboratory distinguish mixed-acid fermenters such as *E. coli* (much acid) from butanediol fermenters such as *Enterobacter* (neutral products). They are also the products of food microbiology: lactic acid bacteria acidify milk to yoghurt and cabbage to sauerkraut; *Propionibacterium freudenreichii* makes the propionate that flavours Emmental cheese and the CO₂ that forms its eyes; and the acetone–butanol fermentation of *Clostridium acetobutylicum*, developed by Chaim Weizmann during the First World War to supply acetone for explosives, was one of the first large-scale industrial bioprocesses.

::: example The yield of a brewery {#ex-ethanol}
What is the maximum mass of ethanol that yeast can make from 1.00 kg of glucose, and what volume of CO₂ (at 25 °C and 1 atm, 24.47 L mol⁻¹) is released? Why do real fermentations achieve about 90–95 % of this?
::: solution
1.00 kg glucose is $1000/180.16 = 5.55$ mol, giving $11.1$ mol ethanol $= 11.1\times46.07 = 511$ g — a yield of 0.511 g per g, sometimes called the Gay-Lussac yield. The CO₂ is also 11.1 mol, or $11.1\times24.47 = 272$ L. Real yields are lower because some sugar becomes yeast cells, glycerol (made to reoxidise NADH generated in biosynthesis) and minor products, and some ethanol evaporates.
:::
:::

## Fermentation in animals

Animals ferment too. When muscle works faster than its oxygen supply allows, glycolysis outruns mitochondrial oxidation, and lactate dehydrogenase regenerates NAD⁺ by reducing pyruvate to lactate. A sprinter's leg muscles can reach lactate concentrations of 20–30 mmol per kilogram within a minute. The lactate is not wasted: it leaves the muscle, and is oxidised by the heart and by slower muscle fibres, or converted back to glucose in the liver (the Cori cycle, [[biochemistry/metabolic-integration]]).

::: warning "Lactic acid makes muscles sore the next day"
Lactate produced in exercise is cleared from blood with a half-time of roughly a quarter of an hour to an hour, depending on activity during recovery, so it is long gone by the next day. Delayed-onset muscle soreness, which peaks one to three days after unaccustomed exercise (especially eccentric contractions), is associated with microscopic damage to muscle fibres and the inflammation that follows, not with lactate. Whether lactate production even contributes to acute fatigue is debated: the acid load comes mainly from ATP hydrolysis and glycolysis as a whole, and lactate formation itself consumes a proton. The figure below models lactate clearance.
:::

::: widget odesolver
f: -0.05*(y - 1)
y0: 12
t: 0, 60
exact: 1 + 11*exp(-0.05*t)
h: 5
methods: euler; rk4
caption: Blood lactate (mmol L⁻¹) against minutes after a bout of hard exercise, for a simple first-order clearance model $dL/dt = -k(L - L_\mathrm{rest})$ with $k = 0.05$ min⁻¹ and resting lactate 1 mmol L⁻¹, starting from 12 mmol L⁻¹ (illustrative values). The exact solution decays with a half-time of $\ln 2/k = 14$ min, so after an hour the excess has fallen to about 5 %. Compare the Euler and RK4 approximations as the step size changes.
:::

Some animals survive for long periods with no oxygen at all, and the masters of anoxia show how far fermentation can be pushed.

- **Crucian carp and goldfish** (*Carassius*) survive for months in ice-covered ponds that become anoxic. In 1980 E. A. Shoubridge and P. W. Hochachka found that goldfish make **ethanol** as their end product, not lactate, and excrete it across the gills, so that acid does not build up in the body. Their muscle mitochondria carry a duplicated subunit of pyruvate dehydrogenase that has been co-opted into acting as a pyruvate decarboxylase (C. E. Fagernes and colleagues, 2017) — a case of neofunctionalisation after the whole-genome duplication in this lineage. They also store very large amounts of liver glycogen and suppress their metabolic rate.
- **Painted turtles** (*Chrysemys picta*) overwintering under ice can survive three to four months without oxygen at low temperature. They make lactate, and buffer it by releasing calcium and magnesium carbonates from their shell and skeleton and storing lactate in the shell (D. C. Jackson, 2000).
- **Intertidal and parasitic invertebrates** — mussels exposed at low tide, parasitic worms in the gut — run fermentations that make succinate, propionate and acetate, extracting more ATP per glucose than lactate fermentation does.

::: example How long can a fish live on glycogen? {#ex-anoxia}
A crucian carp of 100 g stores 5.0 g of glycogen (in liver and muscle together). Under anoxia it ferments glycogen to ethanol (3 ATP per glucose unit, molar mass of a glucosyl unit 162 g mol⁻¹) and depresses its ATP demand to 1.0 µmol ATP per gram of fish per hour (illustrative). How many days could the glycogen sustain it?
::: solution
Glucose units: $5.0/162 = 0.0309$ mol $= 30\,900$ µmol, giving $3\times30\,900 = 92\,600$ µmol ATP. Demand: $1.0\times100 = 100$ µmol h⁻¹. Duration: $92\,600/100 = 926$ h $= 38.6$ days. Survival for the several months observed in nature therefore requires both very large glycogen stores (the carp's liver can be a large fraction glycogen) and deep metabolic depression at near-freezing temperatures ([[biochemistry/enzymes#def-q10]]). Excreting ethanol rather than accumulating lactate avoids the acid load that limits other vertebrates.
:::
:::

## Rate versus yield: why ferment when oxygen is present?

In 1861 Louis Pasteur noticed that yeast consumes much less sugar when air is admitted than when it is excluded — the **Pasteur effect**: with oxygen, each glucose yields about fifteen times more ATP, so less is needed. But some cells do the opposite. Baker's yeast, *Saccharomyces cerevisiae*, ferments glucose to ethanol even in full oxygen whenever glucose is abundant (the **Crabtree effect**, after Herbert Crabtree's 1929 observations on tumours); *E. coli* growing fast on glucose excretes acetate ("overflow metabolism"); and in the 1920s Otto Warburg found that many tumours make lactate from glucose at high rates even with oxygen present (the **Warburg effect**; its role in cancer is discussed in [Medicine Atlas: pathology](/learn/medicine/lesson.php?c=pathology&l=cancer-biology)).

Why waste fourteen-fifteenths of the available ATP? Several explanations, not mutually exclusive, have support.

- **Rate.** Fermentation makes ATP faster per unit of enzyme than respiration, which needs a large investment in mitochondrial proteins and membranes. T. Pfeiffer, S. Schuster and S. Bonhoeffer (*Science* 292, 504, 2001) argued that when cells compete for a shared resource, a high-rate, low-yield strategy can win, while high-yield strategies prosper in spatially structured populations where the gains are kept.
- **Proteome allocation.** M. Basan and colleagues (*Nature* 528, 99, 2015) showed that *E. coli* switches to acetate overflow at the growth rate at which the protein cost of respiration exceeds that of fermentation: making the same ATP by fermentation needs less protein, freeing ribosomes for growth.
- **Ecology.** Wine yeasts make ethanol, which few competitors tolerate, then switch to respiring it once sugar runs out ("make–accumulate–consume"). In the *Saccharomyces* lineage the Crabtree effect appears to have evolved after a whole-genome duplication roughly 100 million years ago, around the time that fleshy fruits spread (J. Piškur and colleagues, 2006).

::: widget plot
f: D/(2 + 28*x)
x: 0, 1
y: 0, 6
sliders: D=30:5:60:1
labels: \text{glucose flux needed}
caption: Glucose consumption (mmol per unit time) needed to meet an ATP demand $D$ (mmol per unit time, slider) when a fraction $x$ of the pyruvate is oxidised by respiration (about 30 ATP per glucose) and the rest fermented (2 ATP per glucose). At $x = 1$ the cell needs $D/30$; at $x = 0$, $D/2$ — fifteen times more. The steep rise as $x$ falls toward zero is the Pasteur effect seen in reverse: a cell that switches to fermentation must increase its glucose uptake many-fold, as yeast, fast-growing bacteria and many tumour cells do.
:::

## From pyruvate to acetyl-CoA

In aerobic cells pyruvate enters the mitochondrial matrix (by the mitochondrial pyruvate carrier) and is oxidatively decarboxylated by the **pyruvate dehydrogenase complex**, a giant assembly of three enzymes and five coenzymes (thiamine pyrophosphate, lipoate, coenzyme A, FAD and NAD⁺):

$$
\text{pyruvate} + \mathrm{CoA} + \mathrm{NAD^+} \longrightarrow \text{acetyl-CoA} + \mathrm{CO_2} + \mathrm{NADH}.
$$

The reaction is irreversible, and this has a large consequence: animals cannot convert acetyl-CoA back to pyruvate, so they cannot make net glucose from fatty acids (which are broken down to acetyl-CoA). The complex is regulated by product inhibition (acetyl-CoA, NADH) and by phosphorylation: pyruvate dehydrogenase kinase inactivates it when energy and acetyl-CoA are plentiful, and a phosphatase reactivates it, notably in response to Ca²⁺ in contracting muscle and to insulin in fat tissue.

## The citric acid cycle

### How it was discovered

The cycle is a triumph of inference from experiments on minced tissue. By the mid-1930s Albert Szent-Györgyi had found that small amounts of the four-carbon dicarboxylic acids succinate, fumarate and malate stimulate oxygen consumption by minced pigeon breast muscle — a tissue with an exceptionally high rate of respiration — far more than their own oxidation could explain. They acted catalytically. Carl Martius and Franz Knoop showed in 1937 that citrate is converted to α-ketoglutarate, which was known to be oxidised to succinate. And in 1937 Hans Krebs and William Arthur Johnson, in Sheffield, showed that citrate is also catalytic, and that citrate is *formed* in muscle when oxaloacetate is added — joining the known reactions into a cycle. Their key evidence used malonate, a competitive inhibitor of succinate dehydrogenase: in malonate-poisoned muscle, adding fumarate, malate or oxaloacetate led to the *accumulation of succinate*, which could happen only if the four-carbon acids were converted forwards round a cycle to succinate rather than directly. (*Nature* declined the paper; it was published in *Enzymologia*.) Krebs shared the 1953 Nobel Prize in Physiology or Medicine with Fritz Lipmann, who discovered coenzyme A, the carrier of the acetyl group that enters the cycle.

::: example The catalytic effect of fumarate {#ex-catalytic}
In an experiment of the kind Szent-Györgyi performed, adding 1.0 µmol of fumarate to minced pigeon muscle increases its oxygen uptake over the following two hours by 12 µmol above that of an unsupplemented control (illustrative). (a) How much O₂ would the complete oxidation of 1.0 µmol fumarate (C₄H₄O₄) require? (b) What does the excess imply? (c) How would malonate change the result?
::: solution
(a) $\mathrm{C_4H_4O_4} + 3\,\mathrm{O_2} \to 4\,\mathrm{CO_2} + 2\,\mathrm{H_2O}$: 3.0 µmol O₂.
(b) The observed uptake is four times that, so fumarate cannot simply be a fuel; it must accelerate the oxidation of other substrates in the tissue (pyruvate, from the muscle's own carbohydrate) while being regenerated — a catalytic role, which is what a cycle predicts: fumarate is converted to oxaloacetate, which accepts an acetyl group and is regenerated after one turn.
(c) Malonate blocks succinate dehydrogenase, breaking the cycle; the stimulation of respiration largely disappears and succinate accumulates. That the added carbon ends up as succinate even when it was added as fumarate (downstream of the block) shows that it travelled round the cycle, through citrate, to reach succinate.
:::
:::

### The cycle as a whole

Each turn condenses an acetyl group (two carbons) with oxaloacetate (four carbons) to form citrate (six carbons), and through eight steps removes two carbons as CO₂ and regenerates oxaloacetate.

::: proposition The stoichiometry of the citric acid cycle {#prop-tca}
One turn of the cycle performs

$$
\text{acetyl-CoA} + 3\,\mathrm{NAD^+} + \mathrm{FAD} + \mathrm{GDP} + \mathrm{P_i} + 2\,\mathrm{H_2O} \longrightarrow 2\,\mathrm{CO_2} + 3\,\mathrm{NADH} + 3\,\mathrm{H^+} + \mathrm{FADH_2} + \mathrm{GTP} + \mathrm{CoA},
$$ {#eq-tca}

where FADH₂ remains bound to succinate dehydrogenase (complex II of the respiratory chain) and GTP is made by the mammalian succinyl-CoA synthetase isozyme of many tissues (ATP by others, and by plants and bacteria). For one glucose (two pyruvate, two turns), the pyruvate dehydrogenase step and the cycle together give 8 NADH, 2 FADH₂ and 2 GTP (or ATP), and release all six carbons as CO₂. Most of glucose's energy now resides in the reduced carriers, to be converted to ATP by oxidative phosphorylation.
:::

Note that the two carbons released as CO₂ in a given turn are not the two that entered as acetyl-CoA in that turn: isotope labelling shows that the acetyl carbons are retained and released only in later turns (the details are traced in [Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=glycolysis-citric-acid)). The cycle is regulated at citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase, by the NADH/NAD⁺ and ATP/ADP ratios and by Ca²⁺, so that its rate follows the demand for ATP — a coupling completed by respiratory control ([[biochemistry/oxidative-phosphorylation]]).

### A hub, not just a furnace

The citric acid cycle is **amphibolic**: it serves both catabolism and anabolism. Its intermediates are the starting points of biosynthesis.

- α-Ketoglutarate → glutamate → glutamine, proline, arginine;
- oxaloacetate → aspartate → asparagine, and (in bacteria and plants) lysine, methionine, threonine; and pyrimidines;
- succinyl-CoA → porphyrins (haem, chlorophyll);
- citrate, exported to the cytosol → acetyl-CoA for fatty-acid and sterol synthesis.

Every molecule drawn off for biosynthesis (**cataplerosis**) takes a four-carbon unit out of the cycle, which would then run down for lack of oxaloacetate. Cells replenish it by **anaplerotic** ("filling-up") reactions, the most important in animals being pyruvate carboxylase, which makes oxaloacetate from pyruvate and CO₂ and is allosterically activated by acetyl-CoA (M. F. Utter and D. B. Keech, 1960): when acetyl-CoA builds up, the cycle is short of the oxaloacetate it needs to accept it. Plants and many bacteria use phosphoenolpyruvate carboxylase for the same purpose.

::: definition The glyoxylate cycle {#def-glyoxylate}
The **glyoxylate cycle**, discovered by Hans Kornberg and Hans Krebs in 1957, is a variant of the citric acid cycle that bypasses its two decarboxylation steps. Isocitrate lyase splits isocitrate into succinate and glyoxylate, and malate synthase condenses glyoxylate with a second acetyl-CoA to form malate. The net result is the synthesis of one four-carbon dicarboxylic acid from two acetyl-CoA, with no loss of carbon as CO₂. It occurs in bacteria, fungi, protists, plants (in glyoxysomes of germinating oil seeds) and nematodes, but not in vertebrates.
:::

The glyoxylate cycle explains a basic difference between organisms. An *E. coli* cell can grow on acetate, and a germinating sunflower seed can turn its stored oil into sucrose to feed the seedling, because both can make oxaloacetate — and hence glucose by gluconeogenesis — from acetyl-CoA. A vertebrate cannot: in the ordinary citric acid cycle, the two carbons of acetyl-CoA are matched by two lost as CO₂, so there is no net gain of oxaloacetate. Fatty acids can fuel a fasting mammal, but they cannot feed its brain glucose ([[biochemistry/metabolic-integration]]).

### The cycle run backwards

In 1966 M. C. W. Evans, B. B. Buchanan and D. I. Arnon found that the green sulfur bacterium *Chlorobium* fixes CO₂ by running the citric acid cycle in reverse, using reduced ferredoxin to drive the carboxylations: the **reductive citric acid cycle**, one of at least six known pathways of autotrophic carbon fixation besides the Calvin–Benson cycle. It is also found in some deep-branching bacteria and archaea of hydrothermal environments. Its distribution, and the fact that many anaerobes have only the two arms of an incomplete cycle (an oxidative branch to α-ketoglutarate and a reductive branch to succinate), have made it a candidate for an ancient form of metabolism, perhaps related to the chemistry of the origin of life ([[diversity-of-life/origin-of-life]]).

::: quiz
A mutant yeast lacks pyruvate carboxylase. It grows on glucose in rich medium containing amino acids but not in minimal medium with glucose and ammonium as the only carbon and nitrogen sources, unless aspartate is added. Why?
- [ ] It cannot carry out glycolysis without pyruvate carboxylase.
- [x] It cannot replenish oxaloacetate drawn off for biosynthesis; aspartate supplies it (by transamination) and supplies the amino acids made from it.
- [ ] It cannot make acetyl-CoA from pyruvate.
- [ ] Aspartate is an essential amino acid for all yeasts.
::: solution
Pyruvate carboxylase is the main anaplerotic enzyme in yeast. On minimal medium the cell must make all its amino acids, and those derived from oxaloacetate and α-ketoglutarate drain the cycle. Without anaplerosis the cycle cannot keep up, and the cell cannot make aspartate-family amino acids. Added aspartate is transaminated to oxaloacetate, restoring both. In rich medium the amino acids are supplied, so less is drawn from the cycle.
:::
:::

::: application Metabolic flux analysis
Biologists now measure the rates of pathways in living cells by feeding substrates labelled with stable isotopes — typically glucose with ¹³C at defined positions — and measuring by mass spectrometry or NMR how the label is distributed among metabolites and protein amino acids. Because each pathway rearranges carbons in a characteristic way (the ED pathway labels pyruvate C-1 from glucose C-1, the EMP pathway labels pyruvate C-3), the labelling patterns, fitted to a stoichiometric model, give the flux through each branch: how much glucose goes through glycolysis versus the pentose phosphate pathway, how much pyruvate enters the cycle by carboxylation versus dehydrogenation. ¹³C flux analysis has been used to engineer industrial microbes and to compare the metabolism of tumours with that of normal tissue ([[systems-biology/metabolic-networks]]).
:::

::: history
Buchner's cell-free fermentation (1897) opened glycolysis to study. Arthur Harden and William Young found in 1905–06 that fermentation by yeast juice needs phosphate and a heat-stable dialysable "co-zymase" (later shown to be NAD⁺ with other cofactors); Harden shared the 1929 Nobel Prize in Chemistry with Hans von Euler-Chelpin, who characterised co-zymase. Otto Meyerhof showed that muscle makes lactate from glycogen (Nobel Prize in Physiology or Medicine, 1922, with A. V. Hill), and by about 1940 the work of Gustav Embden, Meyerhof, Jakub Parnas, Carl and Gerty Cori, Otto Warburg and others had established all ten steps. Szent-Györgyi (1935), Martius and Knoop (1937) and Krebs and Johnson (1937) discovered the citric acid cycle; Lipmann discovered coenzyme A in 1945–47. Entner and Doudoroff described their pathway in 1952, Kornberg and Krebs the glyoxylate cycle in 1957, and Evans, Buchanan and Arnon the reductive cycle in 1966.
:::

## Where this leads

The NADH and FADH₂ made here carry most of glucose's energy to [[biochemistry/oxidative-phosphorylation]], where the final ATP yield is calculated. How glycolysis, gluconeogenesis and the cycle are coordinated across tissues during feeding, fasting and exercise is the subject of [[biochemistry/metabolic-integration]]; the diversity of microbial catabolism is developed in [[microbiology/microbial-metabolism]].

::: summary
- Glycolysis (EMP) turns glucose into 2 pyruvate, 2 ATP and 2 NADH in the cytosol of nearly all cells; the Entner–Doudoroff pathway yields 1 ATP but needs several-fold less enzyme protein — a yield–cost trade-off.
- NADH must be reoxidised for glycolysis to continue. Fermentations use an organic product as electron acceptor; carbon and available electrons balance (glucose 24 = 2 lactate × 12 = 2 ethanol × 12 + 2 CO₂ × 0).
- Fermentations differ across microbes (homo- and heterolactic, alcoholic, mixed acid, butanediol, propionic, butyric) and are used to identify bacteria and make food and chemicals; ethanol yield is at most 0.511 g per g glucose.
- Animals ferment to lactate in working muscle; anoxia-tolerant carp make ethanol through a neofunctionalised PDH subunit; painted turtles buffer lactate with their shells.
- Fermenting when O₂ is present (Crabtree, overflow, Warburg effects) trades yield for rate and proteome economy.
- Krebs and Johnson (1937) inferred the citric acid cycle from catalytic stimulation of respiration and malonate block in pigeon muscle. Two turns per glucose give 6 NADH, 2 FADH₂ and 2 GTP, plus 2 NADH from pyruvate dehydrogenase.
- The cycle is amphibolic: anaplerosis (pyruvate carboxylase) replaces intermediates drawn off for biosynthesis. The glyoxylate cycle lets bacteria, fungi and plants make sugar from acetyl-CoA; vertebrates lack it. Some autotrophs run the cycle backwards to fix CO₂.
:::

## Exercises

::: exercise Available electrons {level=1 check="14"}
Using [[#prop-balance]], how many available electrons does succinic acid, C₄H₆O₄, have?
::: solution
$4\times4 + 6 - 2\times4 = 16 + 6 - 8 = 14$.
:::
:::

::: exercise Glucose for the same ATP {level=1 check="15"}
How many times more glucose must a cell ferment to lactate than oxidise completely (about 30 ATP per glucose) to make the same amount of ATP?
::: solution
$30/2 = 15$ times.
:::
:::

::: exercise A heterolactic balance {level=1}
Heterolactic fermentation converts glucose to lactate + ethanol + CO₂. Check the carbon and electron balance, and explain why the yield is only 1 ATP per glucose even though one lactate is made by the ordinary glycolytic route.
::: solution
Carbon: $3 + 2 + 1 = 6$. Electrons: $12 + 12 + 0 = 24$. Heterolactic bacteria such as *Leuconostoc* lack aldolase; they oxidise glucose 6-phosphate (making 2 NADPH or NADH) and decarboxylate it to a pentose phosphate, which phosphoketolase splits into glyceraldehyde 3-phosphate and acetyl phosphate. The triose goes to lactate (net 2 ATP from the payoff phase, minus 1 ATP invested in the first phosphorylation = 1 net), while the acetyl phosphate must be reduced to ethanol to reoxidise the extra NADH from the oxidative steps, so its phosphate is not used to make ATP.
:::
:::

::: exercise Ethanol from sugar cane {level=2 check="2.69"}
A distillery ferments 5.0 tonnes of sucrose (molar mass 342.3 g mol⁻¹; each sucrose is hydrolysed to two hexoses, which are fermented like glucose). What is the maximum mass of ethanol in tonnes (three significant figures)? Why is the yield per gram higher than the 0.511 g g⁻¹ of [[#ex-ethanol]]?
::: solution
$5.0\times10^6/342.3 = 14\,600$ mol sucrose gives 29 200 mol hexose and 58 400 mol ethanol, which is $58\,400\times46.07 = 2.69\times10^6$ g, i.e. 2.69 t. Per gram of sucrose the yield is $4\times46.07/342.3 = 0.538$ g g⁻¹, higher than from glucose because hydrolysis adds a molecule of water: 342.3 g of sucrose becomes 360.3 g of hexose.
:::
:::

::: exercise A carp in a colder pond {level=2 check="77.2"}
Repeat [[#ex-anoxia]] with the ATP demand halved, to 0.50 µmol g⁻¹ h⁻¹, as might happen at a lower temperature. How many days does the glycogen last (three significant figures)?
::: solution
$92\,600/50 = 1852$ h $= 77.2$ days. Halving metabolic rate doubles survival time; at $Q_{10} = 2$, a 10 °C fall achieves this without any active suppression.
:::
:::

::: exercise Anaplerosis and fat {level=2}
During prolonged fasting, a mammal's liver oxidises large amounts of fatty acids to acetyl-CoA but makes ketone bodies from much of it rather than oxidising it all in the citric acid cycle. Using the ideas of this chapter, explain (a) why acetyl-CoA cannot supply carbon for gluconeogenesis in mammals, (b) why oxaloacetate is scarce in the fasting liver, and (c) why ketone bodies are a useful product.
::: solution
(a) Acetyl-CoA enters the cycle by condensing with oxaloacetate; the two carbons gained are lost as two CO₂ before oxaloacetate is regenerated, so there is no net synthesis of oxaloacetate (and hence of phosphoenolpyruvate and glucose) — mammals lack the glyoxylate cycle. (b) In fasting the liver makes glucose by gluconeogenesis, which draws oxaloacetate out of the mitochondria (as malate or aspartate) to make phosphoenolpyruvate, so the cycle runs short of oxaloacetate to accept acetyl-CoA. (c) Ketone bodies (acetoacetate and β-hydroxybutyrate) are water-soluble carriers of acetyl units that the liver exports to brain, heart and muscle, which oxidise them, sparing glucose; making them also regenerates coenzyme A in the liver mitochondria ([[biochemistry/metabolic-integration]]).
:::
:::

::: exercise Interpreting a mixed-acid fermentation {level=3}
*E. coli* growing anaerobically produces the following products per 100 mmol of glucose fermented (illustrative values of the kind reported in classic studies): lactate 79.5, acetate 38.7, ethanol 49.8, succinate 10.7, formate 2.4, H₂ 75.0, CO₂ 88.0 mmol. (a) Calculate the carbon recovery and the recovery of available electrons. (b) Suggest where the missing carbon and electrons have gone. (c) Why are H₂ and CO₂ produced in nearly equal amounts, and why is so little formate left? (d) How would the products change if the bacteria were given nitrate as an electron acceptor?
::: solution
(a) Carbon: lactate 238.5, acetate 77.4, ethanol 99.6, succinate 42.8, formate 2.4, CO₂ 88 = 548.7 mmol, of 600: 91 % recovery. Electrons: lactate 954, acetate 309.6, ethanol 597.6, succinate 149.8, formate 4.8, H₂ 150, CO₂ 0 = 2165.8, of 2400: 90 %.
(b) Into cell material (biomass is roughly as reduced as carbohydrate per carbon), and into minor products not measured; CO₂ may also have been underestimated, since some stays dissolved as bicarbonate.
(c) Pyruvate formate-lyase splits pyruvate into acetyl-CoA and formate; formate hydrogen-lyase then splits formate into H₂ and CO₂ in a 1:1 ratio, so most formate is converted (and the remaining CO₂ excess comes from other reactions). (d) With nitrate, *E. coli* respires: NADH is reoxidised by an electron-transport chain reducing nitrate to nitrite, so pyruvate is oxidised further to acetyl-CoA and CO₂, the reduced products (ethanol, lactate, succinate, H₂) largely disappear, ATP yield rises and growth is faster.
:::
:::

::: exercise Why have a cycle? {level=3}
Acetyl-CoA could in principle be oxidised by a linear pathway. Give three reasons, based on this chapter and [[biochemistry/enzyme-regulation]], why a cycle in which oxaloacetate is regenerated might be advantageous, and one disadvantage that cells must manage.
::: solution
Advantages: (1) Catalysis by intermediates — a small pool of oxaloacetate and the other intermediates can process unlimited acetyl units, so the cell need not make a large pool of pathway-specific intermediates. (2) The two-carbon acetyl group is chemically hard to oxidise directly (C–C bond cleavage between two carbons with no activating group); attaching it to oxaloacetate allows oxidation by β-keto-acid decarboxylations, which are chemically easy. (3) The same intermediates connect to many biosynthetic routes and to other fuels (amino acids enter at several points), making the cycle a hub that can be regulated as a whole by the NADH/NAD⁺ and ATP/ADP ratios. Disadvantage: draining intermediates for biosynthesis depletes the cycle, so anaplerotic reactions must be regulated to match cataplerosis; a cycle can also run down or accumulate intermediates if its inputs and outputs are not balanced.
:::
:::
