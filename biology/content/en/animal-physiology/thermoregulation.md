At dawn in the Mojave Desert a desert iguana lies flat on a rock, turned broadside to the sun, its body at 25 °C and rising. By mid-morning it is at 38 °C and hunting; by noon the sand is above 60 °C and the lizard is in a burrow. A few hundred kilometres north, a ground squirrel that went underground in autumn lies curled in its burrow with a body temperature of 2 °C, its heart beating a few times a minute. Both are managing the same physical quantity — heat — in completely different ways, and both are doing it to keep the temperature of their tissues where their biochemistry works.

Temperature matters because every rate in a cell depends on it. This chapter starts from that dependence, sets out the physics of heat exchange between an animal and its surroundings, and then follows the two great strategies, ectothermy and endothermy, with their intermediate forms: regional endothermy in fish and insects, torpor and hibernation in mammals and birds. We build on the energy measures of [[animal-physiology/energy-metabolism]] and the control loop of [[animal-physiology/homeostasis]].

## Temperature and the rates of life

Enzyme-catalysed reactions, diffusion, membrane fluidity and the binding of ligands to proteins all depend on temperature. Over the range an animal normally experiences, physiological rates — metabolic rate, heart rate, the speed of nerve conduction, the rate of digestion — typically double or triple for each 10 °C rise.

::: proposition The temperature coefficient Q₁₀ {#prop-q10}
If a physiological rate $R$ increases by a constant factor for each 10 °C rise in temperature, that factor is the **temperature coefficient**

$$
Q_{10} = \left(\frac{R_2}{R_1}\right)^{10/(T_2 - T_1)},
$$ {#eq-q10}

where $R_1$ and $R_2$ are the rates at temperatures $T_1$ and $T_2$. Equivalently, $R_2 = R_1\,Q_{10}^{(T_2 - T_1)/10}$, so $\log R$ is a linear function of $T$.

$Q_{10}$ is an empirical description of a measured pair of rates. It is not strictly constant: for a process obeying the Arrhenius equation, $R \propto \mathrm{e}^{-E_\mathrm{a}/k_\mathrm{B}T}$, it falls slowly as temperature rises, and near the upper limit of tolerance rates stop rising and fall as proteins denature. Typical values for biochemical and physiological rates are 2–3; physical processes such as diffusion have $Q_{10}$ near 1.2–1.4.
:::

::: example Calculating a Q₁₀ {#ex-q10}
The resting O₂ consumption of a lizard is 4.5 mL h⁻¹ at 18 °C and 12 mL h⁻¹ at 30 °C. (a) Calculate $Q_{10}$. (b) Predict its O₂ consumption at 38 °C if $Q_{10}$ stays the same. (c) What fraction of its 30 °C rate would it use on a cold night at 10 °C?
::: solution
(a) $Q_{10} = (12/4.5)^{10/12} = 2.667^{0.833} = 2.26$.

(b) $R = 12 \times 2.26^{8/10} = 12 \times 1.92 = 23$ mL h⁻¹.

(c) $R_{10}/R_{30} = 2.26^{-2} = 0.20$: one-fifth. A cool night costs an ectotherm very little energy, which is one advantage of ectothermy; the price is that it cannot run, digest or react quickly until it warms again.
:::
:::

::: widget plot
f: 12*Q^((x - 30)/10)
x: 0, 45
y: 0, 60
sliders: Q=2.26:1:4:0.02
points: 18, 4.5; 30, 12
labels: \text{O}_2\text{ consumption (mL h}^{-1}\text{) with constant } Q_{10}
caption: Resting O₂ consumption of the lizard of [[#ex-q10]] (vertical axis, mL h⁻¹) against body temperature (horizontal axis, °C), assuming a constant $Q_{10}$ set by the slider; the marked points are the two measurements. With $Q_{10} = 2.26$ the curve passes through both. Notice the exponential shape: each 10 °C step multiplies the rate by the same factor, so the absolute increase is largest at high temperature. Set $Q_{10} = 1$ to see a rate that does not depend on temperature at all.
:::

Each species has a range of body temperatures in which it performs well. A **thermal performance curve** — sprint speed, swimming endurance or growth rate against body temperature — rises gradually to an optimum and then falls steeply to a **critical thermal maximum** (CTmax), at which the animal loses coordination; below, performance falls to a **critical thermal minimum** (CTmin). The asymmetry, a slow rise and a sharp fall, means that an animal living just below its optimum is closer to disaster than it looks. Antarctic fishes, which live at about −1.9 °C, have some of the narrowest ranges known, and tropical lizards and insects often live close to their CTmax, which is why physiologists expect them to be among the animals most affected by a warming climate.

## The vocabulary of thermal biology

Older terms describe the *outcome*: a **poikilotherm** has a variable body temperature, a **homeotherm** a constant one. They are unsatisfactory, because a deep-sea fish has an almost constant body temperature without regulating anything, and a hibernating mammal's temperature varies by 35 °C. Modern usage classifies animals by the *source* of their heat.

::: definition Thermal strategies {#def-thermal}
- An **ectotherm** gets its body heat mainly from the environment; its body temperature is set by the balance of heat exchange with its surroundings, which it may manipulate by behaviour.
- An **endotherm** generates most of its body heat metabolically and regulates its body temperature by varying heat production and heat loss.
- A **heterotherm** is an animal that is endothermic only in some parts of the body (**regional heterothermy**, as in tunas and flying insects) or only at some times (**temporal heterothermy**, as in animals that enter torpor or hibernation).

**Thermoregulation** is the maintenance of body temperature within a range, by physiological or behavioural means; an ectotherm can thermoregulate as precisely as an endotherm when it has a suitable environment to exploit.
:::

## Heat exchange with the environment

An animal exchanges heat with its surroundings by four physical routes, and its body temperature changes whenever the total exchange does not balance its metabolic heat production.

::: definition Routes of heat exchange {#def-heat-routes}
- **Conduction**: transfer between surfaces in contact, proportional to the temperature difference and the thermal conductivity of the material; water conducts heat about 25 times better than air.
- **Convection**: transfer by a moving fluid (wind, water currents, or blood within the body), which renews the layer next to the surface and greatly increases conductive exchange.
- **Radiation**: exchange of infrared radiation between surfaces at different temperatures, and absorption of solar radiation; it needs no medium and can dominate in sunlight.
- **Evaporation**: loss of heat as water evaporates from the skin or the respiratory tract, about 2.4 kJ per gram of water at body temperatures; it is the only route by which an animal can lose heat to an environment hotter than itself.
:::

::: proposition The heat-balance equation {#prop-heat-balance}
For an animal of mass $M$ and specific heat capacity $c$ (about 3.5 kJ kg⁻¹ K⁻¹ for animal tissue), the rate of change of body temperature $T_\mathrm{b}$ satisfies

$$
M c\,\deriv{T_\mathrm{b}}{t} = H_\mathrm{met} - H_\mathrm{cond} - H_\mathrm{conv} - H_\mathrm{rad} - H_\mathrm{evap},
$$ {#eq-heat-balance}

where $H_\mathrm{met}$ is metabolic heat production and each other term is the net heat lost by one route (negative if heat is gained). Body temperature is steady when the right-hand side is zero. The non-evaporative terms are often lumped together as **dry heat loss**, approximately $C(T_\mathrm{b} - T_\mathrm{a})$ over a moderate range, where $T_\mathrm{a}$ is the ambient temperature and $C$ (W K⁻¹) is the animal's **thermal conductance** (Newton's law of cooling). Its reciprocal, $1/C$, is the animal's **insulation**.
:::

Equation [[#eq-heat-balance]] tells us what an animal can control. It can change $H_\mathrm{met}$ (shivering, thermogenesis). It can change $C$, by fluffing fur or feathers, by changing posture (curling into a ball reduces exposed surface), by changing blood flow to the skin, or by huddling with others. It can change $T_\mathrm{a}$ by choosing where to be, and the radiation term by orienting to or away from the sun. And it can change $H_\mathrm{evap}$ by sweating, panting or wetting its body. An ectotherm relies mainly on behaviour and on blood-flow changes; an endotherm adds metabolic heat production.

### Living in water

Water is a hostile medium for an endotherm: its high conductivity and very high heat capacity (about 3500 times that of the same volume of air) mean that a warm body in water loses heat quickly, and a fish cannot easily be warmer than the water around it. The problem is worse for a fish than for a whale, because a fish's gills, which must expose blood to water for gas exchange ([[animal-physiology/gas-exchange]]), are also perfect heat exchangers: any heat in the blood is lost to the water at the gills within one pass. Almost all fishes are therefore at water temperature. Marine mammals and birds avoid the problem by breathing air, and they insulate themselves with blubber or with air trapped in dense fur or feathers.

## Endotherms: the thermoneutral zone

When an endotherm is placed in a respirometer at different air temperatures, its metabolic rate follows a characteristic pattern. Over a range of moderate temperatures it is constant and minimal: the animal adjusts its dry heat loss by changing its insulation (posture, piloerection, skin blood flow) and needs no extra heat. Below this range metabolic rate rises as the air gets colder; above it, metabolic rate rises again as the animal works to lose heat by panting or sweating.

::: definition Thermoneutral zone and critical temperatures {#def-tnz}
The **thermoneutral zone** (TNZ) is the range of ambient temperatures over which an endotherm's metabolic rate is at its minimum (BMR, under basal conditions) and body temperature is regulated by changes in insulation alone. Its lower bound is the **lower critical temperature** (LCT), below which metabolic heat production must increase; its upper bound is the **upper critical temperature** (UCT), above which active evaporative cooling increases metabolic rate.
:::

::: proposition The Scholander–Irving model {#prop-scholander}
Below the lower critical temperature, an endotherm with constant body temperature $T_\mathrm{b}$ and constant (minimal) thermal conductance $C$ must produce heat at the rate

$$
H_\mathrm{met} = C\,(T_\mathrm{b} - T_\mathrm{a}),
$$ {#eq-scholander}

(neglecting the small evaporative loss), so metabolic rate rises linearly as ambient temperature falls, with slope $-C$, and the line extrapolates to zero metabolic rate at $T_\mathrm{a} = T_\mathrm{b}$. The lower critical temperature is where this line meets BMR:

$$
T_\mathrm{LCT} = T_\mathrm{b} - \frac{\mathrm{BMR}}{C}.
$$ {#eq-lct}

Assumptions: steady state, constant body temperature, and conductance already at its minimum below the LCT. Real animals often deviate: conductance may keep falling a little below the LCT, and evaporative and respiratory losses add a small term; then the line extrapolates to a temperature somewhat different from $T_\mathrm{b}$.
:::

::: proof
At steady state $\deriv{T_\mathrm{b}}{t} = 0$, so by [[#eq-heat-balance]] metabolic heat production equals heat loss. With evaporation neglected and dry heat loss $C(T_\mathrm{b} - T_\mathrm{a})$, this gives [[#eq-scholander]]. Within the TNZ the animal produces heat at its basal rate and adjusts $C$ to balance it; at the LCT, $C$ has reached its minimum, and the basal rate exactly balances the loss: $\mathrm{BMR} = C(T_\mathrm{b} - T_\mathrm{LCT})$, which rearranges to [[#eq-lct]].
:::

Per Scholander, Laurence Irving and colleagues used this framework in their classic 1950 comparison of arctic and tropical mammals and birds in Alaska and Panama. Tropical mammals had lower critical temperatures of about 20–30 °C: a little cooling forced them to raise their metabolic rate steeply. Arctic mammals with thick fur were very different. An arctic fox (*Vulpes lagopus*) did not increase its metabolic rate until the air fell to about −40 °C, and even at −70 °C needed only about 50 % above basal. The adaptation of arctic mammals lay not in a higher BMR — basal rates were broadly in line with body size — but in insulation, which lowers $C$ and therefore the slope and the LCT.

::: example A metabolic rate curve {#ex-lct}
A 2 kg mammal has BMR = 20 W, body temperature 38 °C and minimal thermal conductance 0.80 W K⁻¹. (a) What is its lower critical temperature? (b) What is its metabolic rate at −20 °C, as a multiple of BMR? (c) An arctic relative of the same mass and BMR has an LCT of −40 °C. What is its conductance, and what would its metabolic rate be at −20 °C?
::: solution
(a) $T_\mathrm{LCT} = 38 - 20/0.80 = 38 - 25 = 13$ °C.

(b) $H = 0.80 \times (38 - (-20)) = 0.80 \times 58 = 46$ W, 2.3 times BMR. In food, that is more than twice the daily requirement just to stay warm.

(c) $C = \mathrm{BMR}/(T_\mathrm{b} - T_\mathrm{LCT}) = 20/78 = 0.26$ W K⁻¹, about one-third of the temperate animal's. At −20 °C it is still within its thermoneutral zone, at BMR, 20 W. Insulation, not a hotter furnace, is what makes the cold affordable.
:::
:::

::: widget plot
f: (20 + C*(38 - x) + abs(20 - C*(38 - x)))/2
x: -50, 40
y: 0, 80
sliders: C=0.8:0.1:2:0.02
hlines: 20
vlines: 38
labels: \text{metabolic rate (W)}
caption: Metabolic rate (vertical axis, W) against ambient temperature (horizontal axis, °C) for an endotherm with BMR 20 W (horizontal line) and body temperature 38 °C (vertical line), from the Scholander–Irving model [[#eq-scholander]]; the thermal conductance $C$ (W K⁻¹) is set by the slider. Below the lower critical temperature the line rises with slope $-C$ and extrapolates to zero at body temperature; the kink is the LCT. Lower $C$ to see the effect of thicker fur: the slope flattens and the LCT moves to colder air. (The model does not draw the rise above the upper critical temperature.)
:::

### Making heat

Below the LCT, endotherms raise heat production in two ways. **Shivering** is the asynchronous contraction of skeletal muscle, producing heat but no movement. **Non-shivering thermogenesis** in placental mammals takes place mainly in **brown adipose tissue**, whose mitochondria contain uncoupling protein 1 (UCP1), which lets the proton gradient run down as heat instead of making ATP ([[biochemistry/oxidative-phosphorylation]]). Brown fat is prominent in newborns, small mammals and hibernators, which use it to rewarm. Birds have no brown fat and no functional UCP1; they rely on shivering of their large flight and leg muscles, and there is evidence for non-shivering heat production in their skeletal muscle as well, though its mechanism and importance are still being worked out.

### Keeping heat in: insulation and countercurrent exchange

Fur, feathers and blubber insulate the core. But an animal standing on ice or swimming in cold water cannot insulate its feet, flippers or tongue without making them useless. The solution, which has evolved many times, is to keep the extremities cold while preventing them from draining heat from the core.

::: definition Countercurrent heat exchange {#def-countercurrent}
A **countercurrent heat exchanger** consists of two fluid streams flowing in opposite directions in close thermal contact, such as an artery and the veins that run alongside it. Warm arterial blood flowing out to an extremity gives up heat to cold venous blood returning from it. Because the streams run in opposite directions, a temperature difference between them exists along the whole length of the exchanger, and nearly all the heat can be transferred: arterial blood arrives at the extremity almost at its temperature, and venous blood returns to the core almost at core temperature. In a **concurrent** (parallel-flow) arrangement the two streams can only reach a common intermediate temperature, so at most half the heat is recovered.
:::

Countercurrent exchangers in the legs of gulls and wading birds, the flippers of whales and seals (Scholander and William Schevill, 1955) and the legs of arctic foxes let the extremities sit a few degrees above freezing while the core stays at 38–40 °C. A duck standing on ice loses only a small fraction of its heat production through its feet.

::: example A gull standing on ice {#ex-foot}
Blood flows through a gull's legs at 2.0 mL min⁻¹ (density 1.05 g mL⁻¹, specific heat 3.6 J g⁻¹ K⁻¹). The core is at 40 °C and the feet stand in water at 0 °C, from which the blood leaving the foot is at 2 °C. (a) If there were no heat exchange in the leg, arterial blood would enter the foot at 40 °C. How much heat would the feet lose? (b) With an efficient countercurrent exchanger, arterial blood reaches the foot at 4 °C. How much heat is lost now? (c) Compare both with the bird's resting metabolic rate of about 5 W.
::: solution
Heat carried per kelvin: $2.0 \times 1.05 \times 3.6 = 7.56$ J K⁻¹ min⁻¹.

(a) The blood cools from 40 to 2 °C in the foot: $7.56 \times 38 = 287$ J min⁻¹ $= 4.8$ W.

(b) The blood cools only from 4 to 2 °C in the foot: $7.56 \times 2 = 15$ J min⁻¹ $= 0.25$ W. The rest of the heat has been transferred from artery to vein in the leg and carried back to the core.

(c) Without the exchanger the feet alone would lose almost the bird's entire resting heat production; with it, about 5 %. (Illustrative values of the right order for a large gull.) Many birds can also shunt blood past the exchanger when they need to *lose* heat, so the legs serve as an adjustable radiator.
:::
:::

### Losing heat

In hot environments the problem reverses. Above the upper critical temperature, and whenever the air is hotter than the body, evaporation is the only way to lose heat. Mammals sweat (horses and humans profusely, many others hardly at all) or pant; birds pant and flutter the floor of the throat (gular flutter), moving air over moist surfaces with little muscular effort. Panting animals breathe at the resonant frequency of their respiratory system, which makes the work cheap, and they move air mostly over the dead space of the upper airways, so they lose heat without blowing off too much CO₂.

Evaporation costs water, which in deserts is the scarcest resource. Small animals cannot afford it, because their surface is large relative to their water content. Larger ones have another option: let the body heat up during the day, storing heat, and get rid of it by conduction and radiation during the cool night.

::: example Saving water by letting the body heat up {#ex-camel}
Knut Schmidt-Nielsen and colleagues found in 1957 that a dehydrated dromedary camel (*Camelus dromedarius*) in the Sahara let its body temperature fall to about 34 °C at night and rise to about 40–41 °C by the end of the day before it began to sweat. (a) For a 500 kg camel with a specific heat of 3.4 kJ kg⁻¹ K⁻¹, how much heat is stored by a 6 °C rise? (b) How much water would be needed to dissipate that heat by evaporation (2.4 kJ g⁻¹)? (c) Why would this strategy not work for a 100 g rodent?
::: solution
(a) $500 \times 3.4 \times 6 = 10\,200$ kJ.

(b) $10\,200/2.4 = 4250$ g, about 4 L of water per day — water the camel does not need to drink.

(c) A 100 g animal has a heat capacity 5000 times smaller, so its body temperature would rise 6 °C in minutes, not hours, under the same per-gram heat load (which is actually larger, because its surface per gram is greater). It cannot store a day's heat. Small desert mammals such as kangaroo rats avoid the problem entirely by staying in cool burrows during the day and coming out at night. A high body temperature has a second benefit for the camel: it reduces the temperature difference between the hot air and the body, so less heat flows in.
:::
:::

## Ectotherms: thermoregulation by behaviour

An ectotherm cannot raise its temperature much by making heat, but in a varied environment it can regulate its body temperature precisely by choosing where to be. Desert lizards bask in the morning, oriented perpendicular to the sun and pressed against warm rocks, then shuttle between sun and shade through the day, keeping body temperature within a few degrees of a **preferred temperature** (around 38–40 °C in the desert iguana). Charles Cowles and Raymond Bogert's study of desert reptiles in 1944 established that reptiles thermoregulate, and that many die of overheating within minutes if they cannot escape the sun. Physiological adjustments help: Galápagos marine iguanas (*Amblyrhynchus cristatus*), which feed in cold sea water, heat up on land about twice as fast as they cool in the water, because they increase heart rate and skin blood flow while warming and reduce them while cooling (George Bartholomew and Robert Lasiewski, 1965).

Behavioural thermoregulation has limits. In a uniform environment, such as a forest floor in deep shade or a lake at depth, there is nothing to exploit, and the animal's temperature follows the environment. The cost of thermoregulating — time spent basking instead of feeding, exposure to predators — must be weighed against its benefit, a theme of R. B. Huey and M. Slatkin's cost–benefit model of 1976.

::: warning "Cold-blooded animals are cold"
"Cold-blooded" is misleading. A basking lizard is often at 37–40 °C, as warm as a mammal; an active bumblebee's flight muscles run at 30–40 °C on a cool morning; a tuna's swimming muscles may be 10–20 °C warmer than the sea. Ectotherms are not necessarily cold, and many keep their temperature in a narrow range for much of the day. The difference between ectotherms and endotherms is where the heat comes from and what it costs, not how warm the animal is. Conversely, an endotherm in deep hibernation may be at 2 °C — colder than most ectotherms most of the time.
:::

## Regional endothermy in fishes and insects

Some ectotherms are endothermic in part of the body. They achieve it with the same two tools as birds and mammals, heat production and countercurrent exchange.

- **Tunas and lamnid sharks.** Bluefin tunas (*Thunnus*) and the shortfin mako and white shark keep their red swimming muscle, which lies deep inside the body near the backbone, warm by countercurrent exchangers (*retia mirabilia*) between the arteries and veins supplying it: heat from muscle activity is retained instead of being carried to the gills (Francis Carey and John Teal, 1966 and 1969). Warm muscle contracts faster and more powerfully, and warm eyes and brains process information faster, which may help these fast predators hunt in cold water.
- **Billfishes.** Swordfish and marlins have a **brain heater**: an eye muscle modified into a tissue specialised to produce heat, which warms the brain and eyes (Carey, 1982).
- **The opah.** The opah (*Lampris guttatus*), a deep-bodied fish of cool mid-water, warms its whole body: heat from its continuously beating pectoral-fin muscles is retained by countercurrent exchangers in its gills, so blood leaving the gills is not cooled to water temperature (Nicholas Wegner and colleagues, 2015).
- **Insects.** Many moths, bees and beetles cannot fly until their flight muscles are warm. They warm up by contracting the antagonistic flight muscles simultaneously, a kind of shivering, and then hold thoracic temperature high during flight; bumblebee queens even incubate their brood by pressing their warm abdomens against it. Bernd Heinrich's studies from the 1970s showed that bumblebees and sphinx moths regulate thoracic temperature by controlling blood flow from the thorax to the abdomen, which acts as a radiator.

## Torpor and hibernation

For a small endotherm, the cost of staying warm in the cold can exceed what it can find to eat. [[animal-physiology/energy-metabolism#ex-shrew]] showed that a shrew's fat lasts hours. Many small mammals and birds have evolved a way out: they stop defending a high body temperature for a while.

::: definition Torpor and hibernation {#def-torpor}
**Torpor** is a controlled reduction of metabolic rate and body temperature below the normal resting values, from which the animal can rewarm by its own heat production. **Daily torpor** lasts hours, usually during the inactive part of each day, with body temperatures typically falling to 10–30 °C. **Hibernation** consists of multi-day bouts of deep torpor through a season, with body temperatures often close to ambient and as low as 0–5 °C (or, exceptionally, below 0 °C), interrupted by periodic arousals to normal body temperature. **Aestivation** is torpor in the hot, dry season.
:::

Hummingbirds, many small bats, small marsupials, mice and some small birds use daily torpor. Classic hibernators include ground squirrels, marmots, dormice, hedgehogs and many bats. Hibernation is not restricted to mammals of cold climates: the common poorwill (*Phalaenoptilus nuttallii*), a North American nightjar, was found hibernating in a rock crevice by Edmund Jaeger in the late 1940s, and the fat-tailed dwarf lemur (*Cheirogaleus medius*) of Madagascar hibernates for months in tree holes, its body temperature following the daily swings of its tree hole when they are large (Kathrin Dausmann and colleagues, 2004). The arctic ground squirrel (*Urocitellus parryii*) lets its body temperature fall below 0 °C, to about −2.9 °C, without freezing (Brian Barnes, 1989).

During a bout of hibernation metabolic rate may fall to a few per cent of BMR, heart rate from hundreds of beats per minute to a handful, and breathing to a few breaths a minute or less, sometimes with long pauses. Body temperature is not abandoned altogether: the animal defends a new, low set point and rewarms if the burrow becomes too cold. Every week or few weeks the hibernator **arouses**, rewarming to near 37 °C over a few hours with brown fat and shivering, stays euthermic for a day or less, and re-enters torpor. These arousals account for most of the energy spent during the hibernation season. Why they are necessary is still not settled; proposed reasons include the need to restore immune function, to sleep, to clear waste products and to repair tissues.

::: example How much does cooling save? {#ex-hibernation}
A hibernating ground squirrel's body temperature falls from 37 °C to 5 °C. (a) If its metabolism slowed only through the direct effect of temperature, with $Q_{10} = 2.5$, what fraction of the euthermic rate would remain? (b) Measured torpid metabolic rates in such hibernators are often about 2 % of the euthermic resting rate. What does the comparison suggest?
::: solution
(a) $R_5/R_{37} = 2.5^{(5 - 37)/10} = 2.5^{-3.2} = 0.053$: about 5 %.

(b) The measured value is well below what the temperature effect alone predicts, so there must be an additional, **active** suppression of metabolism, in which cellular processes such as protein synthesis and ion pumping are shut down (and ion leak is reduced to match). This conclusion is supported by measurements on hibernators entering torpor, in which metabolic rate falls before body temperature does. How much of the reduction is due to active suppression and how much to temperature differs between species and between daily torpor and hibernation, and has been debated; in many hibernators both contribute substantially.
:::
:::

Large mammals do not hibernate in this sense. Bears in winter dens fast for months, but their body temperature falls only a few degrees, to about 30–35 °C. Øivind Tøien and colleagues (2011) found that black bears (*Ursus americanus*) in Alaska nevertheless reduced their metabolic rate to about a quarter of their basal rate, a reduction far larger than the small fall in temperature would produce — another case of active metabolic suppression. A large body cools so slowly, and stores so much fat ([[animal-physiology/energy-metabolism]]), that deep cooling brings less benefit.

### Freezing and its avoidance

Animals that cannot avoid sub-zero temperatures either prevent ice from forming in their bodies or tolerate it. Antarctic notothenioid fishes, in sea water at −1.9 °C (below the freezing point of their blood), have **antifreeze glycoproteins** that bind to small ice crystals and stop them growing (Arthur DeVries and colleagues, from 1969); antifreeze proteins have evolved independently in several fish lineages and in insects. Many insects overwinter by **supercooling**, removing ice-nucleating agents so that their body fluids stay liquid far below their freezing point. A few animals tolerate freezing: the North American wood frog (*Lithobates sylvaticus*, formerly *Rana sylvatica*) survives with about two-thirds of its body water frozen, its heart stopped, protected by large amounts of glucose made from liver glycogen as freezing begins, which limits cell shrinkage and keeps the ice outside the cells (studied extensively by Kenneth and Janet Storey).

::: quiz
A mammal's metabolic rate is measured at several air temperatures. It is constant at 12 W between 25 and 33 °C, and rises linearly below 25 °C with a slope of −0.6 W K⁻¹. Which conclusion is correct?
- [ ] Its body temperature is 25 °C.
- [x] Its lower critical temperature is 25 °C and its minimal thermal conductance is 0.6 W K⁻¹.
- [ ] Its lower critical temperature is 33 °C.
- [ ] Its BMR increases as the air cools within the thermoneutral zone.
::: solution
The kink at 25 °C, where the rising line meets the basal plateau, is the lower critical temperature, and the slope below it gives the minimal conductance, 0.6 W K⁻¹ ([[#prop-scholander]]). Extrapolating the line to zero metabolic rate gives $25 + 12/0.6 = 45$ °C, higher than any plausible body temperature, which suggests that conductance continues to fall below the LCT or that the model's assumptions are not fully met — a common finding in real data.
:::
:::

::: application Thermal physiology and climate change
Thermal tolerance limits and performance curves are now central to predicting how species will respond to warming. Comparative studies of insects and lizards suggest that tropical ectotherms, living close to their thermal optima and with narrow tolerance ranges, may suffer more from a few degrees of warming than temperate species, which experience wider swings (C. A. Deutsch and colleagues, 2008). Conservation biologists use field measurements of body temperature, operative environmental temperatures (the temperature an inanimate model of the animal would reach in a given microhabitat) and tolerance limits to identify where shade and refuges matter most ([[conservation-biology/invasions-climate]]).
:::

::: history
Claude Bernard showed in 1851–52, by cutting the sympathetic nerve to a rabbit's ear and watching the ear warm and flush, that nerves control the diameter of skin blood vessels, and the hypothalamic centre for thermoregulation was located in the twentieth century. Charles Cowles and Raymond Bogert demonstrated behavioural thermoregulation in desert reptiles in 1944. Per Scholander, Laurence Irving and colleagues set out the modern framework of insulation, conductance and the lower critical temperature in their 1950 comparison of arctic and tropical animals, and Scholander described countercurrent heat exchange in whale flippers in 1955. Knut Schmidt-Nielsen's studies of camels (1957), Francis Carey's of warm fishes (from 1966), Bernd Heinrich's of insect thermoregulation (from the 1970s) and Brian Barnes's discovery of sub-zero body temperatures in the arctic ground squirrel (1989) showed how widely the same physical principles are exploited.
:::

## Where this leads

The heat an endotherm produces must be fuelled by food ([[animal-physiology/feeding-digestion]]) and oxygen ([[animal-physiology/gas-exchange]]), and its distribution around the body depends on the circulation ([[animal-physiology/circulation]]). Evaporative cooling links thermoregulation to water balance ([[animal-physiology/water-salt-balance]]), and the hormones that set metabolic rate and trigger seasonal changes are in [[animal-physiology/endocrine-control]].

::: summary
- Physiological rates typically rise by a factor $Q_{10}$ of 2–3 per 10 °C ([[#prop-q10]]); performance curves rise to an optimum and fall steeply towards the critical thermal maximum.
- Ectotherms get their heat from the environment, endotherms from metabolism; heterotherms are endothermic only in part of the body or part of the time.
- Heat is exchanged by conduction, convection, radiation and evaporation; at steady state metabolic heat equals total heat loss ([[#prop-heat-balance]]).
- Below the lower critical temperature an endotherm's metabolic rate rises as $C(T_\mathrm{b} - T_\mathrm{a})$; arctic mammals cope with cold mainly by insulation, which lowers $C$ and the LCT ([[#prop-scholander]]).
- Countercurrent exchangers keep extremities cool without draining the core, and keep the muscles of tunas and lamnid sharks warm.
- Evaporation is the only route of heat loss in hot air; large desert mammals save water by storing heat by day, small ones avoid the heat in burrows.
- Ectotherms thermoregulate by behaviour, often precisely; insects and some fishes are regionally endothermic.
- Torpor and hibernation lower metabolism by both cooling ($Q_{10}$) and active suppression; arousals consume most of the hibernation energy budget.
- Ice is avoided by antifreeze proteins and supercooling, or tolerated, as in the wood frog.
:::

## Exercises

::: exercise A Q₁₀ {level=1 check="2.5"}
A crab's heart rate is 40 beats min⁻¹ at 10 °C and 100 beats min⁻¹ at 20 °C. What is the $Q_{10}$?
::: solution
$Q_{10} = (100/40)^{10/10} = 2.5$.
:::
:::

::: exercise Lower critical temperature {level=1 check="22"}
An endotherm has BMR 4.0 W, body temperature 37 °C and minimal thermal conductance 0.27 W K⁻¹. What is its lower critical temperature, to the nearest degree?
::: solution
$T_\mathrm{LCT} = 37 - 4.0/0.27 = 37 - 14.8 = 22$ °C.
:::
:::

::: exercise Evaporative cooling {level=1 check="150"}
How many grams of water must a 70 kg runner evaporate to remove the heat of one hour at a metabolic rate of 100 W above what can be lost by dry heat loss (2.4 kJ g⁻¹; nearest 10 g)?
::: solution
$100\ \mathrm{W} \times 3600\ \mathrm{s} = 360$ kJ; $360/2.4 = 150$ g of water per hour. (Much more sweat is usually produced than evaporates, since some drips off without cooling.)
:::
:::

::: exercise Heat storage in a small animal {level=2 check="25"}
A 100 g desert rodent outside its burrow at midday produces 0.60 W of metabolic heat and gains a further 0.25 W from the hot environment. If it cannot evaporate water, how many minutes would its body temperature take to rise by 3.6 °C (specific heat 3.5 kJ kg⁻¹ K⁻¹; two significant figures)? If it did evaporate water to stay at a constant temperature, what percentage of its body mass would it lose per hour?
::: solution
Heat to store: $0.100 \times 3500 \times 3.6 = 1260$ J. Rate of gain: $0.60 + 0.25 = 0.85$ W. Time $= 1260/0.85 = 1480$ s, or 25 min. Evaporation: $0.85/2400\ \mathrm{g\,s^{-1}} \times 3600 = 1.3$ g h⁻¹, 1.3 % of body mass per hour, far more than the animal can replace from its dry seed diet. It must retreat to its burrow.
:::
:::

::: exercise Reading a metabolic curve {level=2}
Metabolic rates (W) of a 1 kg mammal at different air temperatures are: −10 °C, 14.0; 0 °C, 11.0; 10 °C, 8.0; 20 °C, 5.0; 25 °C, 4.5; 30 °C, 4.5; 35 °C, 6.0. (a) Estimate BMR, the minimal conductance and the lower critical temperature. (b) Extrapolate the line below the LCT to zero metabolic rate and comment on the result if body temperature is 37 °C. (c) What happens above 30 °C, and why?
::: solution
(a) BMR $\approx 4.5$ W (the plateau). Below the plateau the rate rises by 3.0 W per 10 °C, so $C = 0.30$ W K⁻¹. The line $H = 14.0 - 0.30(T_\mathrm{a} + 10)$ meets 4.5 W at $T_\mathrm{a} = -10 + 9.5/0.30 = 21.7$ °C, so LCT $\approx 22$ °C. (b) The line reaches zero at $T_\mathrm{a} = -10 + 14.0/0.30 = 36.7$ °C, close to the body temperature of 37 °C, as the Scholander–Irving model predicts when conductance is constant below the LCT. (c) Above the upper critical temperature (about 30 °C) metabolic rate rises because the animal must work to lose heat by panting or sweating, and because rising body temperature itself speeds metabolism (a $Q_{10}$ effect).
:::
:::

::: exercise Concurrent versus countercurrent {level=2}
Two blood streams of equal heat-capacity flow rate, one entering at 40 °C and one at 0 °C, exchange heat along a long tube. (a) What are their outlet temperatures if they flow in the same direction (concurrent) and the exchanger is very long? (b) What are the outlet temperatures in an ideal, very long countercurrent exchanger? (c) Why is the countercurrent arrangement found in limbs and gills?
::: solution
(a) In a concurrent exchanger the streams approach a common temperature, here $(40 + 0)/2 = 20$ °C, after which no more heat flows: each leaves at 20 °C, and only half the possible heat is transferred. (b) In an ideal countercurrent exchanger a temperature difference is maintained along the whole length, and the warm stream leaves at nearly 0 °C while the cold stream leaves at nearly 40 °C: nearly all the heat is transferred. (c) Countercurrent flow allows almost complete exchange of heat (in a limb, conserving heat) or of gases (in a fish gill, where blood and water flow in opposite directions, [[animal-physiology/gas-exchange]]), which a concurrent arrangement cannot achieve.
:::
:::

::: exercise Torpor in a hummingbird {level=2}
A 4 g hummingbird roosting at night at 15 °C would use 0.10 W to stay euthermic. In torpor its metabolic rate falls to 0.010 W; entering and leaving torpor costs an extra 0.20 kJ in total. (Illustrative values.) (a) How much energy does it save by spending 8 h of a 10 h night torpid? (b) If nectar provides 17 kJ per gram of sugar, how much sugar does this save? (c) Why might a bird with ample food reserves choose not to enter torpor?
::: solution
(a) Euthermic for 10 h: $0.10 \times 36\,000 = 3.6$ kJ. With torpor: 2 h euthermic ($0.10 \times 7200 = 0.72$ kJ) + 8 h torpid ($0.010 \times 28\,800 = 0.29$ kJ) + 0.20 kJ for entry and arousal $= 1.21$ kJ. Saving $= 3.6 - 1.21 = 2.4$ kJ, two-thirds of the night's cost. (b) $2.4/17 = 0.14$ g of sugar, a substantial fraction of a 4 g bird's body mass in reserves. (c) Torpor has costs besides energy: a torpid animal cannot escape predators, may be slow to rewarm if disturbed, and may suffer from reduced immune function or sleep deprivation; hummingbirds with sufficient reserves often stay euthermic, which suggests that torpor is used when the energetic benefit outweighs these risks.
:::
:::

::: exercise A warm fish {level=3}
A bluefin tuna's red muscle is at 30 °C in water at 15 °C. (a) Explain why an ordinary fish cannot be much warmer than the water, considering the gills. (b) How does the tuna's arrangement of blood vessels solve the problem? (c) Using a $Q_{10}$ of 2.5, by what factor might the warm muscle's rates of contraction and relaxation exceed those of muscle at water temperature? (d) Suggest an ecological advantage and a cost.
::: solution
(a) All blood passes through the gills once per circuit, where it is in close contact with water over a huge area for gas exchange; the gills equilibrate it with water temperature, so any heat produced in the tissues is carried to the gills and lost. (b) In the tuna, the arteries supplying the red muscle run from the body surface inwards, alongside the veins leaving the muscle, forming a countercurrent exchanger (rete mirabile). Cold arterial blood from the gills is warmed by the venous blood leaving the warm muscle; the heat stays in the muscle instead of reaching the gills, while O₂ and CO₂, which diffuse more slowly in this geometry, still get through. (c) $2.5^{(30-15)/10} = 2.5^{1.5} = 4.0$. (d) Advantages: faster, more powerful swimming muscles; warm eyes and brain for detecting prey; the ability to range into colder water and to dive into cold depths while remaining active. Costs: the energy to make the heat (tunas have high metabolic rates for fish), the need to obtain more food, and the risk of overheating during sustained high activity in warm water.
:::
:::

::: exercise Why hibernators arouse {level=3}
Arousals from hibernation consume most of a hibernator's winter energy budget. (a) Using the energy of rewarming a 300 g ground squirrel from 5 to 37 °C (specific heat 3.5 kJ kg⁻¹ K⁻¹), show why each arousal is expensive (ignore heat lost during warming). (b) Propose two hypotheses for why arousals have nevertheless been retained, and for each one an experiment that could test it.
::: solution
(a) Heat needed $= 0.300 \times 3.5 \times 32 = 33.6$ kJ, plus the much larger heat lost to the cold burrow during the hours of warming and the day at 37 °C. A torpid day at about 2 % of a BMR of roughly 1.5 W costs only about $0.03 \times 86\,400 \approx 2.6$ kJ, so a single arousal (rewarming plus a day at euthermic rates, roughly 40–100 kJ) costs as much as several weeks of torpor. (b) Examples: (1) **Immune function**: torpor suppresses immune responses, and periodic warming lets the immune system clear infections; test by comparing pathogen loads and immune activity in animals whose arousals are prevented or increased, or by infecting animals and measuring the effect on arousal frequency. (2) **Sleep debt**: hibernators show signs of sleep deprivation and sleep deeply when they arouse; test by recording brain activity during arousals and preventing sleep during arousals to see if the next torpor bout is shortened. (3) **Metabolic waste or depletion**: some metabolite builds up or is depleted at low temperature; test by measuring candidate metabolites through torpor bouts and manipulating them. These hypotheses are not exclusive, and the question remains open.
:::
:::
