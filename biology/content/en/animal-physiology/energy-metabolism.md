A 4 g shrew must eat more than half its own body mass in insects every day; a few hours without food and it starves. An elephant weighing a million times as much eats only a few per cent of its body mass a day, and a python can go months between meals. These differences are not quirks of particular species. They follow from two of the most general patterns in physiology: animals that keep warm spend far more energy than animals that do not, and the energy an animal spends per gram of tissue falls steadily as body size increases.

This chapter is about the rate at which animals use energy — their **metabolic rate** — how it is measured, how it depends on body mass, temperature and activity, and what it costs to move. The cellular side, ATP, the respiratory chain and the energy yield of fuels, is in [[biochemistry/bioenergetics]] and [[biochemistry/oxidative-phosphorylation]]; the respiratory quotient, which tells us which fuel is being burned, is in [[biochemistry/metabolic-integration#prop-rq]]. Here we take the whole animal as a fire and ask how big the fire is and why.

## Measuring metabolic rate

The metabolic rate is the rate at which an animal converts the chemical energy of food into heat and external work. At rest, essentially all of it ends up as heat, because the ATP made in mitochondria is spent on processes — ion pumping, protein synthesis, the beating of the heart — whose energy is eventually dissipated. This gives three ways of measuring it.

- **Direct calorimetry** measures the heat an animal gives off. Antoine Lavoisier and Pierre-Simon Laplace did it in 1783 with a guinea pig in an ice calorimeter, weighing the water from the melted ice; modern calorimeters measure the heat flow through the walls of an insulated chamber. Direct calorimetry is accurate but slow and expensive, and is now used mainly to validate other methods.
- **Indirect calorimetry** (respirometry) measures the rate of O₂ consumption, $\dot V_{\mathrm{O_2}}$, or CO₂ production, $\dot V_{\mathrm{CO_2}}$, and converts it to energy. Because aerobic metabolism oxidises food with O₂, and the heat released per litre of O₂ varies only a little between fuels — about 21.1 kJ for carbohydrate, 19.6 kJ for fat and 18.7 kJ for protein — a mixed-diet value of **about 20.1 kJ per litre of O₂** is accurate to within a few per cent. Measuring the respiratory quotient as well refines the conversion.
- The **doubly labelled water** method measures CO₂ production in free-living animals over days. Nathan Lifson and colleagues showed in 1955 that the oxygen of respiratory CO₂ exchanges with body water, so if an animal is given water labelled with both a heavy isotope of hydrogen (²H) and one of oxygen (¹⁸O), the ¹⁸O leaves the body as both water and CO₂, while the ²H leaves only as water. The difference between the two rates of isotope loss gives the rate of CO₂ production.

::: definition Standard measures of metabolic rate {#def-bmr}
- The **basal metabolic rate** (BMR) of an endotherm is its metabolic rate when it is adult, resting, not digesting food (post-absorptive), not growing or reproducing, during its normal inactive phase, and in its **thermoneutral zone**, the range of air temperatures in which it spends no extra energy on heat production or active cooling ([[animal-physiology/thermoregulation]]).
- The **standard metabolic rate** (SMR) of an ectotherm is its resting, post-absorptive metabolic rate at a stated body temperature (an ectotherm has no single thermoneutral temperature).
- The **field metabolic rate** (FMR) is the average metabolic rate of a free-living animal over a day or more, including all its activities, usually measured with doubly labelled water.
- The **maximal metabolic rate** is the highest rate of aerobic metabolism the animal can reach, during exercise ($\dot V_{\mathrm{O_2,max}}$) or in the cold (summit metabolism). The ratio of maximal to basal or standard rate is the **factorial aerobic scope**.
:::

These definitions matter because metabolic rates vary several-fold with conditions, and comparisons between species are meaningful only under comparable conditions. BMR is not the minimum an animal ever reaches — hibernating and torpid animals go far below it — but a standardised reference point.

::: example A mouse in a respirometer {#ex-respirometry}
A 30 g mouse rests in a flow-through respirometer at thermoneutrality. Dry, CO₂-free air flows through the chamber at 500 mL min⁻¹ (corrected to standard temperature and pressure). The O₂ fraction falls from 0.2095 at the inlet to 0.2080 at the outlet. Estimate $\dot V_{\mathrm{O_2}}$, the metabolic rate in watts, and the mass-specific rate in W kg⁻¹. (Ignore the small correction needed because the outlet flow differs slightly from the inlet flow when RQ ≠ 1.)
::: solution
$\dot V_{\mathrm{O_2}} = 500\ \mathrm{mL\,min^{-1}} \times (0.2095 - 0.2080) = 500 \times 0.0015 = 0.75$ mL O₂ min⁻¹, or 45 mL h⁻¹ (1.5 mL O₂ g⁻¹ h⁻¹).

Metabolic rate $= 0.75\ \mathrm{mL\,min^{-1}} \times 20.1\ \mathrm{J\,mL^{-1}} / 60\ \mathrm{s\,min^{-1}} = 0.25$ W.

Mass-specific rate $= 0.25\ \mathrm{W} / 0.030\ \mathrm{kg} = 8.4$ W kg⁻¹. A resting human produces about 80 W, or about 1.1 W kg⁻¹: per gram, the mouse burns about seven times as fast. The rest of this chapter is about why.
:::
:::

## Endotherms and ectotherms

The first great division in metabolic rate is between **endotherms** — mammals and birds, which keep their body temperature high and steady mainly with metabolically produced heat — and **ectotherms** — almost all other animals, whose body temperature is set mainly by the environment. At the same body mass and the same body temperature, the resting metabolic rate of a mammal or bird is roughly five to ten times that of a lizard (A. F. Bennett and J. A. Ruben, 1979). Endotherms pay this price continuously, in food that ectotherms do not have to find. The thermal consequences are the subject of [[animal-physiology/thermoregulation]]; here we note the energetic one. A 30 g lizard can live for weeks on what a 30 g mouse burns in a day, and ectotherms convert a much larger fraction of the food they assimilate into growth and offspring.

Ectotherm metabolic rate depends strongly on body temperature. Over the range of temperatures an animal normally experiences, metabolic rate typically rises two- to threefold for each 10 °C rise in temperature, a ratio called the **Q₁₀** (treated quantitatively in [[animal-physiology/thermoregulation]]). Comparisons of ectotherms must therefore always state the temperature.

## Allometry: how rates scale with body size

Body masses of animals range over more than twenty orders of magnitude, from rotifers of a microgram to blue whales of over 100 tonnes. Across this range, almost every physiological variable — metabolic rate, heart rate, lung volume, lifespan, the length of the gut — changes with body mass in a regular way, and the regularity is captured by a power law.

::: proposition The allometric equation {#prop-allometry}
A variable $Y$ is said to scale **allometrically** with body mass $M$ if

$$
Y = a\,M^{b},
$$ {#eq-allometry}

where $a$ (the **coefficient**, or normalisation constant) and $b$ (the **exponent**) are constants for a given group of animals. Taking logarithms,

$$
\log Y = \log a + b\,\log M,
$$ {#eq-loglog}

so on log–log axes the relation is a straight line with slope $b$ and intercept $\log a$. If $b = 1$, $Y$ is proportional to $M$ (**isometry**); if $b < 1$, $Y$ increases less than in proportion to $M$, and $Y/M$ falls with size; if $b > 1$, $Y$ increases faster than $M$.

This is a statistical description, not a law of nature. The exponent is estimated by regression of $\log Y$ on $\log M$, and its value depends on which species are included, how they are sampled, and the regression method; the units of $a$ depend on $b$ (W kg⁻ᵇ when $Y$ is in watts and $M$ in kilograms).
:::

The log–log form explains why allometry is useful. Over a factor of a million in body mass, a small difference in exponent produces a large difference in prediction, and the logarithmic plot lets mice and elephants appear on the same graph with equal weight. Allometric analysis and power-law fitting are developed mathematically in [Maths Atlas](/learn/maths/); here we concentrate on what the exponents mean.

### The surface law

The oldest explanation of why small animals have high metabolic rates per gram is geometric. If animals of different size had the same shape, every length would scale as $M^{1/3}$ (because volume, and hence mass at constant density, scales as length cubed), and every area as $M^{2/3}$.

::: proposition Surface area of geometrically similar bodies {#prop-surface}
For a family of bodies of the same shape and density, surface area $S$ and body mass $M$ satisfy

$$
S = k\,M^{2/3},
$$ {#eq-surface}

where $k$ depends on shape only. Consequently surface area per unit mass, $S/M = k\,M^{-1/3}$, falls with increasing size: a body 1000 times heavier has 100 times the surface but one-tenth as much surface per gram.
:::

::: proof
Let $L$ be any characteristic length (say body length). For a fixed shape, volume $V = c_1 L^3$ and surface $S = c_2 L^2$ with constants $c_1, c_2$. With density $\rho$, $M = \rho c_1 L^3$, so $L = (M/\rho c_1)^{1/3}$ and $S = c_2 (\rho c_1)^{-2/3} M^{2/3}$.
:::

An endotherm loses heat through its surface. If it must replace heat at a rate proportional to its surface area to stay warm, its metabolic rate should scale as $M^{2/3}$. This was the **surface law**, proposed in the 1830s and supported by Max Rubner's measurements in 1883 on dogs of different breeds, whose heat production per square metre of body surface was nearly constant.

### Kleiber's law

When Max Kleiber compiled basal metabolic rates of mammals ranging from rats to steers in 1932, he found a steeper slope than the surface law predicted: close to 3/4. Samuel Brody's "mouse-to-elephant curve" (1945) and many later compilations found similar values, and in 1960 August Hemmingsen showed that unicellular organisms, ectotherms and endotherms each followed lines of similar slope, with endotherms about an order of magnitude higher. The relation is introduced in [[biochemistry/bioenergetics#prop-kleiber]]: $B \approx 3.4\,M^{3/4}$ W, with $M$ in kilograms, for mammals.

::: proposition Consequences of three-quarter-power scaling (empirical) {#prop-kleiber-consequences}
If whole-animal metabolic rate scales as $B = a M^{3/4}$, then

- the **mass-specific metabolic rate** scales as $B/M = a M^{-1/4}$: a 10,000-fold increase in mass lowers the rate per gram tenfold;
- a quantity stored in proportion to body mass (such as fat, at fixed fatness) lasts a time proportional to $M/M^{3/4} = M^{1/4}$;
- empirically, many biological times scale close to $M^{1/4}$ and rates close to $M^{-1/4}$ — heart rate, breathing rate, the time for blood to circulate, and maximum lifespan — so that, very roughly, a mammal's life lasts a similar number of heartbeats regardless of size.

These are regularities of data with considerable scatter, not consequences of a law. Their exponents are estimated with uncertainty and differ between taxa.
:::

::: example Fitting an exponent {#ex-fit}
Representative basal metabolic rates for seven mammals are given below. Fit the allometric equation by regression of $\log_{10} B$ on $\log_{10} M$.

| species | mass $M$ (kg) | BMR $B$ (W) |
|---|---|---|
| mouse | 0.025 | 0.21 |
| rat | 0.30 | 1.45 |
| rabbit | 2.5 | 7.6 |
| dog | 15 | 27 |
| human | 70 | 80 |
| cow | 600 | 380 |
| elephant | 4000 | 1700 |
::: solution
The logarithms are $\log_{10}M = -1.60, -0.52, 0.40, 1.18, 1.85, 2.78, 3.60$ and $\log_{10}B = -0.68, 0.16, 0.88, 1.43, 1.90, 2.58, 3.23$. Least-squares regression gives slope $b = 0.744$ and intercept $0.543$, so $a = 10^{0.543} = 3.49$ W kg⁻⁰·⁷⁴; $R^2 = 0.9996$. The fitted line is $B = 3.5\,M^{0.74}$, close to Kleiber's. (The values are rounded, illustrative figures chosen to be typical of each species; real data sets of hundreds of species show much more scatter around the line, and an exponent nearer 0.7.) Notice how a straight line through seven points on log–log axes can hide large deviations: the residual for any species is a *ratio*, and a residual of 0.1 in $\log_{10}B$ means the species is 26 % above or below the line.
:::
:::

::: widget regression
points: -1.60,-0.68; -0.52,0.16; 0.40,0.88; 1.18,1.43; 1.85,1.90; 2.78,2.58; 3.60,3.23
degree: 1
residuals: true
x: -2, 4
y: -1, 3.5
caption: The data of [[#ex-fit]] on log–log axes: $\log_{10}$ of body mass in kilograms (horizontal) and $\log_{10}$ of basal metabolic rate in watts (vertical), with the least-squares line, its equation and $R^2$. The slope is the allometric exponent. Drag a point — for instance, move the elephant up by 0.3 (doubling its rate) — and watch how much, or how little, the exponent changes. The large and small species have the greatest leverage on the slope.
:::

### Why three-quarters? An open question

The surface law predicts 2/3 and data from many compilations gave about 3/4, which demands an explanation. The most influential one, by Geoffrey West, James Brown and Brian Enquist (1997), derived 3/4 from the geometry of hierarchical, space-filling supply networks, such as blood vessels and airways, whose terminal units (capillaries) are the same size in all animals and that minimise the energy needed to pump fluid through them. The theory is elegant, but several of its assumptions have been challenged, and the data themselves are disputed. Re-analyses of large data sets, taking care to use only truly basal measurements and to account for body temperature and phylogeny, gave exponents for mammals nearer 2/3 (Craig White and Roger Seymour, 2003, found 0.686), and exponents differ between groups: birds, mammals, reptiles, fishes, insects and plants do not share a single value, and small and large mammals scale differently. Douglas Glazier (2005, 2010) assembled evidence that exponents range between about 2/3 and 1, depending on activity level and lifestyle, with resting rates of very inactive animals nearer 1 and of highly active endotherms nearer 2/3, and proposed that the exponent reflects a balance between surface-limited processes (heat, nutrient and waste exchange) and volume-limited ones (tissue maintenance and power production).

What is not disputed is the pattern itself: metabolic rate rises less than in proportion to mass, with an exponent between about 0.65 and 0.85 in most data sets, so that small animals have much higher rates per gram. The exact value, and whether any single value is "the" exponent, is a live research question. Maximal metabolic rates scale more steeply than basal rates — with an exponent close to 0.9 in mammals (E. R. Weibel and colleagues, 2004) — so aerobic scope tends to increase with size.

::: warning "Kleiber's law is a law of physics"
Kleiber's three-quarter-power relation is an empirical regularity: a straight line fitted through scattered data. It is not derived from first principles in the way that the surface law is derived from geometry, and the theories that derive it rest on contested assumptions. Its exponent varies between taxa, between resting and active states, and between small and large animals within a group. Treat it as a useful rule of thumb for orders of magnitude (it predicts most mammals' BMR to within a factor of about two), not as an exact law, and do not use it to prove that an individual species is "abnormal" when it lies within the usual scatter.
:::

::: widget plot
f: log10(3.4) + 0.75*x; log10(3.4) + 0.667*x; log10(3.4) + b*x
x: -3, 4
y: -2.5, 3.8
sliders: b=0.75:0.5:1:0.01
labels: \text{exponent } 3/4\ \text{(Kleiber)}; \text{exponent } 2/3\ \text{(surface law)}; \text{exponent } b
vlines: 0
caption: Allometric lines on log–log axes: $\log_{10}$ of metabolic rate in watts (vertical) against $\log_{10}$ of body mass in kilograms (horizontal), from a 1 g animal ($-3$) to a 10 t animal ($4$), all passing through the same rate (3.4 W) at 1 kg (the vertical line). The 3/4 and 2/3 lines cross at 1 kg, and the ratio between them changes by a factor of $10^{0.083 \times 7} \approx 4$ across this range of mass. Move the slider to compare other exponents: at $b = 1$ rate is proportional to mass, and every gram burns at the same rate.
:::

### Within and between species

Allometric exponents are usually estimated **between** species (interspecific scaling). Within a species, as an individual grows or as adults vary in size, the exponent is often different, and it may differ between developmental stages. It is also dangerous to read a between-species slope as a causal statement about what would happen if a given animal were made bigger: the species at the two ends of the line differ in many ways besides size, and they share evolutionary history unevenly ([[animal-physiology/homeostasis#ex-phylogeny]]). Modern analyses use phylogenetic regression for that reason.

Allometry is also a tool for spotting the exceptional. A species well above the line for its size is doing something energetically expensive. Shrews, hummingbirds and many small marsupials have metabolic rates above the mammalian line; desert mammals, which face food and water shortage, and burrowing mammals, which risk overheating underground, tend to lie below it. Brian McNab argued over several decades that much of the residual variation in mammalian BMR is associated with diet, climate and habits rather than with taxonomy alone.

::: example How much must a shrew eat? {#ex-shrew}
A 4.0 g shrew has a field metabolic rate of three times the Kleiber prediction. It eats insects with an energy content of 7.0 kJ per gram of wet mass, of which it assimilates 85 %. (a) How much must it eat each day? (b) By what factor is its mass-specific metabolic rate higher than that of a 4.0 kg mammal following the same relation? (c) How long would its fat reserve last if fat makes up 5 % of its body mass (energy content 39 kJ g⁻¹) and it continued at the same rate?
::: solution
(a) Kleiber BMR $= 3.4 \times 0.0040^{3/4} = 3.4 \times 0.0159 = 0.054$ W. FMR $= 3 \times 0.054 = 0.162$ W, or $0.162 \times 86\,400 = 14.0$ kJ per day. Food needed $= 14.0 / (7.0 \times 0.85) = 2.4$ g of insects per day: 59 % of its body mass.

(b) Mass-specific rates scale as $M^{-1/4}$, so the ratio is $(4.0/0.0040)^{1/4} = 1000^{1/4} = 5.6$.

(c) Fat $= 0.05 \times 4.0 = 0.20$ g, containing $0.20 \times 39 = 7.8$ kJ, enough for $7.8/14.0 = 0.56$ days, or about 13 hours. Small endotherms live close to starvation; many shrews and small birds survive cold nights only by entering torpor ([[animal-physiology/thermoregulation]]).
:::
:::

## The energetic cost of activity

### Aerobic and anaerobic metabolism

Activity raises metabolic rate above the resting level. As long as the extra ATP is made by oxidative phosphorylation, O₂ consumption rises in proportion to power output, and the activity can be sustained. Above the **maximal aerobic rate**, extra power must come from anaerobic sources: the phosphagen stores of muscle (phosphocreatine in vertebrates, phosphoarginine in many invertebrates; [[biochemistry/bioenergetics#def-phosphagen]]) and anaerobic glycolysis to lactate. Anaerobic metabolism can deliver ATP fast but only briefly, and it leaves an aftermath: O₂ consumption stays elevated after exercise while phosphagens are rebuilt and lactate is cleared (the excess post-exercise oxygen consumption, formerly called the oxygen debt).

Animals differ in how they combine the two. Many reptiles and amphibians rely heavily on anaerobic glycolysis for bursts of activity: a lizard chasing prey may produce most of its ATP anaerobically and then need many minutes to recover, whereas a mammal of the same size could sustain the same speed aerobically. Bennett and Ruben (1979) argued that the evolution of endothermy in mammals and birds was driven by selection for sustained aerobic activity, which required a high maximal aerobic rate, and that a high resting rate came along with it. Other hypotheses emphasise parental care, or the advantages of a warm body as such; the origin of endothermy remains debated.

::: definition Cost of transport {#def-cot}
The **cost of transport** is the metabolic energy an animal spends to move a unit of body mass over a unit of distance, usually expressed in J kg⁻¹ m⁻¹ (or as the dimensionless ratio of power to weight times speed). The **net** (or incremental) cost of transport excludes the resting metabolic rate and counts only the extra energy due to locomotion. For a given mode of locomotion and body mass, the **minimum** cost of transport is reached at the speed at which energy per distance is lowest.
:::

When running mammals of different sizes were trained on treadmills, their O₂ consumption increased linearly with speed, so the net cost of transport — the slope of metabolic rate against speed — was independent of speed for each animal. Richard Taylor, Norman Heglund and Geoffrey Maloiy (1982) measured it in species from mice to horses and found that it falls steeply with body size.

::: proposition Net cost of transport of running (empirical) {#prop-cot}
For running mammals and birds, the net cost of transport is approximately

$$
C = 10.7\,M^{-0.316}\ \ \mathrm{J\,kg^{-1}\,m^{-1}},
$$ {#eq-cot}

with $M$ in kilograms (Taylor, Heglund and Maloiy, 1982). It is an empirical fit to treadmill data on animals from about 20 g to 250 kg, and it describes level running at steady, aerobically supported speeds.
:::

::: example A mouse and a horse go for a run {#ex-cot}
Using [[#eq-cot]], calculate the net cost of transport of a 30 g mouse and a 500 kg horse, and the extra energy each spends running 1 km. How many grams of fat would each burn (39 kJ g⁻¹), and what percentage of its body mass is that?
::: solution
Mouse: $C = 10.7 \times 0.030^{-0.316} = 10.7 \times 3.03 = 32.4$ J kg⁻¹ m⁻¹. For 1 km: $32.4 \times 0.030 \times 1000 = 972$ J $\approx 0.97$ kJ, or $0.97/39 = 0.025$ g of fat, 0.083 % of body mass.

Horse: $C = 10.7 \times 500^{-0.316} = 10.7 \times 0.140 = 1.50$ J kg⁻¹ m⁻¹. For 1 km: $1.50 \times 500 \times 1000 = 751$ kJ, or $751/39 = 19$ g of fat, 0.0039 % of body mass.

Per kilogram of body, the mouse pays about 22 times as much to cover the same ground. A large animal can travel far at little cost relative to its reserves, which is part of why long-distance migrants on land are large mammals, while small animals must find food close by.
:::
:::

::: widget plot
f: 10.7*x^(-0.316)
x: 0.01, 100
y: 0, 50
points: 0.03, 32.4; 500, 1.5
labels: \text{net cost of transport (J kg}^{-1}\text{ m}^{-1}\text{)}
caption: Net cost of transport of running (vertical axis, J kg⁻¹ m⁻¹) against body mass (horizontal axis, kg) from [[#eq-cot]], on linear axes. The cost falls steeply among small animals and then levels off; the marked point at 30 g is the mouse of [[#ex-cot]] (the horse, at 500 kg, is off the right of the graph at 1.5 J kg⁻¹ m⁻¹). Hover to read values: the curve halves for every eightfold or so increase in mass.
:::

Why should running cost so much more per kilogram for a small animal? Not because its muscles are less efficient at turning ATP into work, but because it takes more and faster strides to cover a given distance, and the cost of generating force in muscle depends on how quickly it must be turned on and off. Taylor and colleagues showed that the metabolic cost of running is roughly proportional to body weight divided by the time each foot is in contact with the ground; small animals have short contact times and therefore must use fast, uneconomical muscle fibres ([[animal-physiology/muscle-movement]]). Elastic storage of energy in tendons reduces the cost further in large animals: in a classic experiment, Terence Dawson and Taylor (1973) found that the O₂ consumption of red kangaroos (*Osphranter rufus*, then *Megaleia rufa*) did not rise as hopping speed increased above about 2 m s⁻¹.

### Swimming, flying and running

Knut Schmidt-Nielsen (1972) compared the minimum cost of transport of animals that swim, fly and run. At any given body mass, swimming was the cheapest way to travel, flying intermediate and running the most expensive. A fish is nearly weightless in water and does not need to support itself, so its costs are those of overcoming drag; a flying bird must support its weight aerodynamically, but covers ground very fast; a runner loses energy with every stride as its body is decelerated and re-accelerated and its limbs are swung. Within each mode, cost per kilogram falls with body size. Hence a salmon migrating hundreds of kilometres upriver and a goose crossing an ocean spend less per kilogram per kilometre than a mouse crossing a field.

::: quiz
Two mammals, one of 10 g and one of 10 kg, run on treadmills at their own preferred speeds. Which statement is most likely to be true?
- [ ] They use the same energy per kilogram per kilometre, because muscle efficiency is the same in both.
- [x] The small mammal uses several times more energy per kilogram per kilometre.
- [ ] The large mammal uses more energy per kilogram per kilometre, because it has more mass to move.
- [ ] The small mammal uses less energy per kilometre in total and per kilogram.
::: solution
The net cost of transport falls with mass approximately as $M^{-0.32}$ ([[#prop-cot]]), so a 1000-fold difference in mass gives a factor of $1000^{0.316} \approx 9$ in cost per kilogram per metre. In *total* energy per kilometre the large animal spends more (it has 1000 times the mass but only about 1/9 the cost per kilogram), but per kilogram the small one pays more.
:::
:::

## Energy budgets in the field

Laboratory measurements describe what an animal *can* do; doubly labelled water measures what it actually does. Kenneth Nagy and colleagues have compiled field metabolic rates of hundreds of species of mammals, birds and reptiles. Field metabolic rates scale with body mass with exponents similar to those of basal rates, and are typically about two to four times BMR in endotherms. The energy an animal can sustain over weeks seems to have an upper limit: in the hardest-working animals and people — lactating mice, birds feeding nestlings, cyclists in the Tour de France — sustained expenditure rarely exceeds about four to five times BMR (C. C. Peterson, K. A. Nagy and J. Diamond, 1990; K. A. Hammond and J. Diamond, 1997). Whether the limit is set by the capacity of the gut and liver to process food, by the capacity of tissues to use it, or by the ability to lose the heat produced, is debated, and may differ between species.

::: example Doubly labelled water in a small bird {#ex-dlw}
A 50 g songbird has 33 g of body water. After an injection of doubly labelled water, the fractional rate of loss of ¹⁸O is 0.70 per day and that of ²H is 0.50 per day. (a) Estimate its CO₂ production from the simplified relation $\dot n_{\mathrm{CO_2}} = \tfrac{N}{2}(k_\mathrm{O} - k_\mathrm{H})$, where $N$ is body water in moles and $k$ the fractional turnover rates. (b) Assuming RQ = 0.80 and 20.1 kJ per litre O₂ (22.4 L mol⁻¹ for gases at STP), estimate its field metabolic rate in watts. (c) Compare with the Kleiber prediction of BMR.
::: solution
(a) $N = 33/18.0 = 1.83$ mol. The factor $1/2$ appears because each CO₂ carries two oxygen atoms. $\dot n_{\mathrm{CO_2}} = 0.917 \times (0.70 - 0.50) = 0.183$ mol per day $= 0.183 \times 22.4 = 4.1$ L CO₂ per day.

(b) O₂ consumption $= 4.1 / 0.80 = 5.13$ L per day; energy $= 5.13 \times 20.1 = 103$ kJ per day $= 103\,000/86\,400 = 1.19$ W.

(c) Kleiber: $3.4 \times 0.050^{3/4} = 0.36$ W. The FMR is 3.3 times the mammalian Kleiber BMR. (Small passerine birds have BMRs somewhat above the mammalian line, so the ratio to the bird's own BMR would be lower, about 2–3.) The full equations used in practice include corrections for isotope fractionation during evaporation and are reliable to within roughly 5–10 % when validated against respirometry.
:::
:::

::: application Energetics in conservation and farming
Allometric relations let ecologists estimate the food requirements of animals that cannot be measured directly — how many fish a colony of seabirds must catch, how much grazing land an antelope population needs, whether a reserve can support a population of large predators. In animal husbandry, the "metabolic body weight" $M^{0.75}$ introduced by Kleiber and Brody is still used to scale the maintenance feed and drug doses of livestock of different sizes; for humans the corresponding practice is a matter for [Medicine Atlas: pharmacology](/learn/medicine/course.php?c=pharmacology).
:::

::: history
Lavoisier and Laplace showed in 1783, with a guinea pig in an ice calorimeter, that animal heat is produced by slow combustion. In 1839 Pierre Sarrus and Jean-François Rameaux proposed that heat production should scale with surface area, and Max Rubner's measurements on dogs (1883) appeared to confirm the surface law. Francis Benedict and others developed respiration calorimeters in the early twentieth century. Max Kleiber (1932) and Samuel Brody (1945) established the three-quarter-power relation for mammals, and August Hemmingsen (1960) extended it to unicells and ectotherms. Nathan Lifson introduced doubly labelled water in 1955, opening field energetics. Knut Schmidt-Nielsen compared the cost of swimming, flying and running in 1972, and Taylor, Heglund and Maloiy measured the cost of running from mice to horses in 1982. West, Brown and Enquist's network theory (1997) and the re-analyses that followed have kept the scaling exponent a subject of active research.
:::

## Where this leads

Metabolic rate sets the demand that every supply system must meet: heat production and loss in [[animal-physiology/thermoregulation]], food in [[animal-physiology/feeding-digestion]], oxygen in [[animal-physiology/gas-exchange]] and [[animal-physiology/circulation]]. Allometric thinking will return in each, because gills, lungs, hearts and guts must all scale with the demand they supply. Ecological consequences — population density, home range and the flow of energy through food webs — are in [[ecology/ecosystem-energetics]].

::: summary
- Metabolic rate is measured by direct calorimetry, by respirometry (about 20.1 kJ per litre of O₂) and in the field by doubly labelled water.
- BMR (endotherms, thermoneutral, resting, post-absorptive), SMR (ectotherms, at a stated temperature), FMR and maximal rate are standardised measures; their ratios give aerobic scope.
- Endotherms have resting rates roughly five to ten times those of ectotherms of the same size and body temperature.
- Physiological variables scale with body mass as $Y = aM^b$, a straight line on log–log axes ([[#prop-allometry]]).
- Geometric similarity predicts surface ∝ $M^{2/3}$; measured metabolic exponents are mostly between about 0.65 and 0.85 (Kleiber's 3/4 is an empirical value, and its explanation is unresolved).
- Mass-specific metabolic rate falls with size ($\propto M^{-1/4}$ for exponent 3/4), and biological times lengthen roughly as $M^{1/4}$.
- The net cost of running per kilogram per metre falls as about $M^{-0.32}$; swimming is cheapest, running most expensive, flying intermediate.
- Sustained energy expenditure in the field rarely exceeds about four to five times BMR.
:::

## Exercises

::: exercise Oxygen to watts {level=1 check="5.03"}
A resting animal consumes 0.25 L O₂ per minute. What is its metabolic rate in kJ per minute, using 20.1 kJ per litre (three significant figures)?
::: solution
$0.25 \times 20.1 = 5.03$ kJ min⁻¹ (84 W) — the resting rate of an adult human.
:::
:::

::: exercise Surface per gram {level=1 check="0.1"}
Two animals have the same shape; one is 1000 times heavier than the other. By what factor does the larger animal's surface area per unit mass differ from the smaller one's?
::: solution
$S/M \propto M^{-1/3}$, so the factor is $1000^{-1/3} = 0.1$: one-tenth as much surface per gram.
:::
:::

::: exercise Mass-specific rates {level=1 check="10"}
If metabolic rate scales as $M^{3/4}$, by what factor is the mass-specific metabolic rate of a 20 g mouse higher than that of a 200 kg animal?
::: solution
Mass ratio $200/0.020 = 10^4$; mass-specific rate $\propto M^{-1/4}$, so the factor is $(10^4)^{1/4} = 10$.
:::
:::

::: exercise An exponent from two points {level=2 check="0.69"}
The BMR of a 0.10 kg mammal is 0.75 W and that of a related 100 kg species is 87 W. Assuming both lie on the same allometric line, estimate the exponent $b$ (two significant figures). Why is an exponent estimated from two species unreliable?
::: solution
$b = \log(87/0.75)/\log(100/0.10) = \log 116 / \log 1000 = 2.064/3 = 0.69$. Two points determine a line exactly, so any deviation of either species from the group's true relation — and most species deviate by tens of per cent — goes straight into the exponent. A 30 % error in one BMR changes $\log B$ by about 0.11 and the exponent by about 0.04. Reliable exponents need many species spread over a wide range of mass, and allowance for phylogeny.
:::
:::

::: exercise Heartbeats in a lifetime {level=2}
In mammals, resting heart rate scales approximately as $241\,M^{-0.25}$ beats per minute and maximum lifespan approximately as $11.6\,M^{0.20}$ years ($M$ in kg; empirical fits of the kind published by W. A. Calder and others). (a) Calculate the number of heartbeats in a maximum lifespan for a 0.03 kg mouse and a 3000 kg elephant. (b) What does the result suggest, and what are the limitations of the argument?
::: solution
(a) Mouse: heart rate $= 241 \times 0.03^{-0.25} = 241 \times 2.40 = 579$ min⁻¹; lifespan $= 11.6 \times 0.03^{0.20} = 11.6 \times 0.496 = 5.8$ years. Beats $= 579 \times 60 \times 24 \times 365 \times 5.8 = 1.8\times10^9$. Elephant: $241 \times 3000^{-0.25} = 241 \times 0.135 = 32.6$ min⁻¹; lifespan $= 11.6 \times 3000^{0.20} = 11.6 \times 4.96 = 57$ years; beats $= 32.6 \times 525\,600 \times 57 = 9.8\times10^8$. (b) The two numbers are within a factor of two despite a 100,000-fold difference in mass, consistent with the observation that biological times scale with a similar exponent. But the exponents differ (0.25 and 0.20), so the product is not exactly constant; the fits describe maximum lifespans in captivity, not typical lives; and bats, birds and humans live far longer than their body mass predicts. The "fixed number of heartbeats" is a memorable approximation, not a mechanism.
:::
:::

::: exercise Interpreting a residual {level=2}
A desert rodent of 100 g has a measured BMR of 0.30 W. The mammalian relation $B = 3.4\,M^{0.75}$ predicts what? Express the measured value as a percentage of the prediction, and suggest two hypotheses for the difference and how you would test them.
::: solution
Prediction $= 3.4 \times 0.10^{0.75} = 3.4 \times 0.178 = 0.60$ W; the measured value is 50 % of it. Hypotheses: (1) low BMR is an adaptation to scarce food or water in deserts, reducing food needs and respiratory water loss; (2) it is a feature of the rodent's lineage, shared with non-desert relatives. Test (1) against (2) by comparing BMR in related species from desert and mesic habitats (phylogenetically independent contrasts, [[animal-physiology/homeostasis#ex-phylogeny]]); test plasticity by acclimating animals of the desert species to abundant food and water and remeasuring; and check that the measurement was truly basal (thermoneutral, post-absorptive, inactive phase), since a measurement below thermoneutrality would give a higher, not lower, value.
:::
:::

::: exercise Swimming versus walking {level=2}
A 100 kg seal and a 100 kg deer each travel 50 km. Without detailed equations, explain which spends less energy on locomotion and why, and what physical cost each must overcome.
::: solution
The seal spends less. In water it is close to neutrally buoyant, so it does not have to support its weight, and its costs are those of overcoming drag, which at moderate speeds and with a streamlined body are small. The deer must support its weight and, with every stride, decelerate and re-accelerate its body and swing its limbs; tendons recover some of this energy, but much is lost as heat in the muscles. Schmidt-Nielsen's comparison (1972) showed that at the same body mass the minimum cost of transport of swimming is roughly an order of magnitude below that of running. (The seal pays other costs, such as staying warm in water, which are not locomotion.)
:::
:::

::: exercise A scaling argument for fasting {level=3}
Assume that the fat reserves of mammals scale isometrically ($F = f M$) and that during a fast metabolic rate stays at a fixed multiple of BMR, $B = 3.4\,M^{0.75}$ W. (a) Show that fasting endurance scales as $M^{1/4}$. (b) If a 30 g mouse with 10 % fat can survive about 1.4 days on its fat alone at its fasting metabolic rate, how long would a 3000 kg animal with the same fatness survive? (c) Use your answer to discuss why only large mammals can hibernate without torpor, and why small hibernators must drop their metabolic rate far below BMR.
::: solution
(a) Endurance $= fM/(cM^{0.75}) = (f/c)M^{0.25}$, where $c$ is the coefficient of metabolic rate. (b) The mass ratio is $10^5$, so endurance increases by $(10^5)^{0.25} = 17.8$: about $1.4 \times 17.8 = 25$ days. (Check for the mouse: fat $= 3$ g $\times 39$ kJ g⁻¹ $= 117$ kJ; BMR $= 3.4\times0.03^{0.75} = 0.245$ W $= 21.2$ kJ d⁻¹; endurance 5.5 days. At a fasting metabolic rate of about four times BMR, as for an active mouse, the stated 1.4 days.) (c) Even the largest animal could fast for only weeks to months at its normal metabolic rate; a winter-long fast is possible for a large mammal (a bear, which reduces its metabolic rate moderately and stays warm) only with very large fat stores and some metabolic depression. For a small mammal, endurance at BMR is measured in days, so surviving a winter without eating requires metabolic rate to fall to a few per cent of BMR — which is achieved only by abandoning thermoregulation and letting body temperature fall: hibernation ([[animal-physiology/thermoregulation]]).
:::
:::

::: exercise Designing a scaling study {level=3}
You want to test whether the BMR of birds scales with a different exponent from that of mammals. Describe the data you would need, how you would analyse them, and three sources of bias that could make two groups appear to differ when they do not (or vice versa).
::: solution
Data: BMR measured under standard conditions (adult, post-absorptive, resting in the inactive phase, thermoneutral) for many species in each group, spanning a wide and overlapping range of body mass, with body mass measured on the same individuals. Analysis: regress $\log B$ on $\log M$ with group as a factor and an interaction term (an analysis of covariance), using phylogenetic generalised least squares or independent contrasts to account for shared ancestry; the test of interest is the interaction (different slopes). Biases: (1) **non-basal measurements** — data including animals that were digesting, stressed, active or below thermoneutrality inflate BMR, especially in small species, which are hardest to measure at rest, and steepen or flatten the slope; (2) **unequal mass ranges** — if birds span a narrower range (there are no 4-tonne birds), their exponent is estimated less precisely and can differ by chance; (3) **phylogenetic clustering** — if large mammals are mostly from a few lineages (ungulates) with peculiar BMRs, the slope reflects those lineages; (4) **body temperature** — birds run warmer than mammals, so the groups differ in coefficient for reasons other than size; (5) **regression method** — ordinary least squares and reduced major axis regression give different slopes when the correlation is imperfect.
:::
:::
