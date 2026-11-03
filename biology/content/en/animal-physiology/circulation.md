In 1628 William Harvey, physician to King Charles I, published a small book, *Exercitatio anatomica de motu cordis et sanguinis in animalibus*, that contained a piece of arithmetic. If the left ventricle of the human heart holds even two ounces of blood, and only a fraction of it is expelled at each beat, then at a thousand beats in half an hour the heart pumps more blood than the whole body contains — far more than could possibly be made from food and consumed in the tissues. The blood, Harvey concluded, must go round and round. He supported the argument with experiments on snakes, fish, frogs, dogs and many other animals, and with the observation that valves in the veins let blood flow only towards the heart.

[[animal-physiology/gas-exchange#prop-sphere]] showed that diffusion alone can supply tissue only within about a millimetre of its source. A circulation solves the problem by **bulk flow**: a pump drives fluid through vessels, carrying O₂, nutrients, CO₂, wastes, hormones and heat over distances that diffusion could never cover, so that diffusion is needed only for the last few micrometres. This chapter compares the ways animals have built circulatory systems and develops the physics of pressure and flow — the Fick principle, Poiseuille's law, the law of Laplace and Starling's principle — that govern all of them.

## Open and closed circulation

::: definition Open and closed circulatory systems {#def-open-closed}
In an **open** circulatory system, the heart pumps **haemolymph** into vessels that open into spaces among the tissues (the **haemocoel**, or sinuses); the haemolymph bathes the cells directly and returns to the heart through openings (ostia) or open channels. In a **closed** circulatory system, **blood** remains within a continuous network of vessels — arteries, capillaries and veins — and exchange with the tissues takes place across the walls of the capillaries; the interstitial fluid is separate from the blood plasma.
:::

Open systems are found in arthropods and most molluscs; closed systems in annelids, cephalopod molluscs and vertebrates. An open system works at lower pressure and lower flow, and its fluid makes up a large fraction of the body — often 20–40 % of body volume in crustaceans and insects, against about 7 % for the blood of a mammal. It is not simply a primitive or inferior arrangement. In insects, the circulation carries little O₂, because the tracheae deliver it directly ([[animal-physiology/gas-exchange]]), so a low-pressure, slow circulation is enough for nutrients, hormones and immune cells. The insect heart is a dorsal tube that pumps haemolymph forwards towards the head, assisted by accessory pulsatile organs at the bases of the wings, legs and antennae. Haemolymph pressure also does mechanical work: spiders extend their legs hydraulically, by raising haemolymph pressure, because they have no extensor muscles at some leg joints, and many insects inflate their new cuticle after moulting by swallowing air and raising body pressure.

Cephalopods, by contrast, are fast, active predators. An octopus or squid has a closed circulation with three hearts — a systemic heart and two branchial hearts that pump blood through the gills — and its blood carries O₂ on haemocyanin. Closed circulation, high pressure and separate pumps for gills and body evolved in cephalopods and in vertebrates independently.

## Vertebrate hearts and circuits

Vertebrate hearts are chambered muscular pumps with valves that prevent backflow. Their arrangement reflects how each group breathes.

- **Fishes** have a **single circuit**: the heart, with four chambers in series (sinus venosus, atrium, ventricle and, in teleosts, an elastic bulbus arteriosus), pumps deoxygenated blood to the gills, and blood then flows on to the body without returning to the heart. The gills add resistance, so systemic blood pressure in fishes is low, typically a few kilopascals.
- **Amphibians** have a heart with two atria and one ventricle. Oxygenated blood from the lungs and deoxygenated blood from the body enter the ventricle separately and, thanks to the spongy ventricular wall and a spiral valve in the outflow tract, are partly kept apart as they leave for the lungs and skin and for the body.
- **Non-crocodilian reptiles** (lizards, snakes, turtles) have a ventricle partly divided by muscular ridges. Their ventricles can separate pulmonary and systemic flows effectively, but they can also **shunt** blood past the lungs (a right-to-left shunt), for example during breath-holding or diving.
- **Crocodilians** have a fully divided four-chambered heart, but their left aorta leaves the *right* ventricle, and blood can be diverted from the lungs into the systemic circulation through it, controlled by a valve in the pulmonary outflow; a small connection between the two aortae (the foramen of Panizza) links the circuits.
- **Birds and mammals** have four-chambered hearts with completely separate **double circulation**: the right ventricle pumps blood through the lungs (the pulmonary circuit) and the left ventricle through the body (the systemic circuit). This arrangement evolved independently in the two groups, from different reptilian ancestors.

A double circulation lets the two circuits run at different pressures. The systemic circuit can operate at a high pressure (a mean arterial pressure of roughly 12–13 kPa in mammals, higher in birds), needed to push blood quickly through a long, branching network of narrow vessels, while the pulmonary circuit runs at a low pressure (about 2 kPa), which keeps fluid from leaking out of the thin lung capillaries into the air spaces. Crocodilians, turtles and other "intermediate" hearts are not failed attempts to reach the mammalian design: their ability to shunt blood is used for diving, thermoregulation and digestion, and why they shunt is an active research question.

## How much blood does a heart pump?

The volume of blood pumped per minute by one ventricle is the **cardiac output** $\dot Q$, the product of heart rate $f_\mathrm{H}$ and **stroke volume** $V_\mathrm{S}$:

$$
\dot Q = f_\mathrm{H}\,V_\mathrm{S}.
$$ {#eq-output}

Measuring it directly is difficult, but Adolf Fick pointed out in 1870 that it can be calculated from the O₂ the animal takes up.

::: proposition The Fick principle {#prop-fick-principle}
At steady state, the rate at which an animal takes up O₂ at its respiratory organ, $\dot V_{\mathrm{O_2}}$, equals the rate at which blood carries it away:

$$
\dot V_{\mathrm{O_2}} = \dot Q\,(C_\mathrm{a} - C_\mathrm{v}),
\qquad\text{so}\qquad
\dot Q = \frac{\dot V_{\mathrm{O_2}}}{C_\mathrm{a} - C_\mathrm{v}},
$$ {#eq-fick-principle}

where $C_\mathrm{a}$ and $C_\mathrm{v}$ are the O₂ contents of arterial and mixed venous blood (mL O₂ per litre of blood) and $C_\mathrm{a} - C_\mathrm{v}$ is the **arteriovenous difference**. The same balance applies to any organ and any substance it takes up or releases. Assumptions: steady state (no change in the O₂ stores of blood or tissues), all O₂ uptake passing through the blood (it fails for animals with substantial cutaneous uptake directly into tissues), and well-mixed venous blood.
:::

::: example Cardiac output by the Fick principle {#ex-fick}
(a) A resting person consumes 250 mL O₂ min⁻¹; arterial blood contains 200 mL O₂ L⁻¹ and mixed venous blood 150 mL O₂ L⁻¹. Calculate cardiac output, and the stroke volume if heart rate is 70 min⁻¹. (b) A 1 kg trout consumes 67 mL O₂ h⁻¹; its arterial blood contains 90 mL O₂ L⁻¹ and its venous blood 50 mL O₂ L⁻¹. Calculate its cardiac output in mL min⁻¹.
::: solution
(a) $\dot Q = 250/(200 - 150) = 5.0$ L min⁻¹. Stroke volume $= 5000/70 = 71$ mL. In exercise, $\dot V_{\mathrm{O_2}}$ may rise tenfold; cardiac output rises perhaps four- to fivefold and the arteriovenous difference about threefold, as the working muscles extract more O₂.

(b) $\dot V_{\mathrm{O_2}} = 67/60 = 1.12$ mL min⁻¹; $\dot Q = 1.12/(0.090 - 0.050) = 28$ mL min⁻¹ per kilogram — about a third of the mass-specific output of a resting mammal of the same size (roughly 80–100 mL min⁻¹ kg⁻¹), consistent with the fish's much lower metabolic rate.
:::
:::

### Scaling of the heart

Across mammals, heart mass is roughly proportional to body mass, about 0.5–0.6 % of it, and stroke volume is too. Heart rate, however, falls as roughly $M^{-1/4}$ ([[animal-physiology/energy-metabolism#prop-kleiber-consequences]]), from over 600 beats per minute in a resting shrew or mouse to about 30 in an elephant. Cardiac output, the product of stroke volume and heart rate, therefore scales as about $M^{1}\times M^{-1/4} = M^{3/4}$, matching metabolic rate. A mouse and an elephant have hearts of the same relative size and blood of similar O₂ capacity; the mouse matches its higher mass-specific demand by beating its heart faster.

## Pressure, flow and resistance

Blood flows from high pressure to low pressure. For a vessel, or a whole circuit, the flow $\dot Q$ is proportional to the pressure difference $\Delta P$ that drives it:

$$
\Delta P = \dot Q\,R,
$$ {#eq-darcy}

the haemodynamic analogue of Ohm's law, which defines the **resistance** $R$. For the systemic circulation of a resting human, $\Delta P \approx 12$ kPa and $\dot Q \approx 5$ L min⁻¹, so the total peripheral resistance is about 2.4 kPa min L⁻¹. Resistances in series add, and resistances in parallel combine like electrical ones ($1/R = \sum 1/R_i$). The circulation is mostly a set of parallel circuits, one for each organ, so the flow to each can be adjusted independently by changing its own resistance.

::: proposition The Hagen–Poiseuille law {#prop-poiseuille}
For steady, laminar flow of a Newtonian fluid of viscosity $\eta$ through a rigid cylindrical tube of radius $r$ and length $L$, the volume flow rate is

$$
\dot Q = \frac{\pi r^4}{8\eta L}\,\Delta P,
\qquad\text{so}\qquad
R = \frac{8\eta L}{\pi r^4}.
$$ {#eq-poiseuille}

Assumptions: laminar (not turbulent) flow, steady (not pulsatile), a rigid tube, a fluid with constant viscosity, and a tube much longer than its radius. Blood violates several of these — it is a suspension of cells whose apparent viscosity falls in tubes narrower than about 0.3 mm (the **Fåhræus–Lindqvist effect**), flow in large arteries is pulsatile, and vessels are elastic — but the strong dependence of resistance on radius holds approximately throughout the circulation.
:::

::: proof {collapsed}
In steady laminar flow, consider a cylinder of fluid of radius $s$ coaxial with the tube. The pressure force on its ends, $\pi s^2\Delta P$, is balanced by the viscous shear force on its curved surface, $-\eta\,\deriv{u}{s}\cdot 2\pi s L$, where $u(s)$ is the velocity. Hence $\deriv{u}{s} = -s\Delta P/(2\eta L)$, and with $u(r) = 0$ at the wall (no slip), $u(s) = \frac{\Delta P}{4\eta L}(r^2 - s^2)$, a parabolic profile. The flow rate is $\dot Q = \int_0^r u(s)\,2\pi s\,\dd s = \frac{\pi\Delta P}{2\eta L}\left[\frac{r^2 s^2}{2} - \frac{s^4}{4}\right]_0^r = \frac{\pi r^4\Delta P}{8\eta L}$.
:::

The fourth power of the radius is the key to circulatory control. Halving a vessel's radius increases its resistance sixteenfold; a 10 % reduction increases it by 52 %. The **arterioles**, small arteries with thick walls of smooth muscle, account for most of the systemic resistance and, by constricting and dilating, determine both arterial pressure and the distribution of blood among organs.

::: widget plot
f: (x)^4
x: 0, 1.5
y: 0, 5
points: 0.5, 0.0625; 0.9, 0.656; 1, 1
labels: \text{relative flow at constant pressure, } (r/r_0)^4
hlines: 1
vlines: 1
caption: Flow through a vessel at a fixed pressure difference (vertical axis, relative to the flow at the reference radius $r_0$) against vessel radius (horizontal axis, $r/r_0$), from the Hagen–Poiseuille law [[#eq-poiseuille]]. The marked points show that halving the radius cuts flow to one-sixteenth, and narrowing it by 10 % cuts flow by about a third; dilating by 19 % doubles it. Hover to read values. This steepness is why small changes in the smooth muscle of arterioles can redirect blood flow between organs.
:::

::: example Redistributing blood flow {#ex-redistribution}
At rest, a mammal's skeletal muscles receive 20 % of a cardiac output of 5.0 L min⁻¹. In exercise, the arterioles of the working muscles dilate so that their radius increases by 70 %, while mean arterial pressure stays constant and the resistance of the muscle circuit is dominated by its arterioles. (a) By what factor does muscle blood flow increase? (b) Could the heart supply this flow without changes elsewhere?
::: solution
(a) Flow $\propto r^4$ at constant pressure: $1.7^4 = 8.4$. Muscle flow would rise from 1.0 to about 8.4 L min⁻¹.

(b) Total output would have to rise to about 12.4 L min⁻¹ if the other organs kept their 4.0 L min⁻¹; this is within the range of a trained mammal, and cardiac output does rise in exercise. But arterial pressure would fall unless output rose fast enough, and the baroreceptor reflex responds by constricting arterioles in the gut, kidneys and inactive muscles, diverting part of their flow to the working muscles. Real exercise uses both: more output, and redistribution.
:::
:::

## The law of Laplace and the walls of vessels

Pressure inside a vessel or a heart chamber stretches its wall. How much tension the wall must withstand depends on its size.

::: proposition The law of Laplace {#prop-laplace}
For a thin-walled cylinder of radius $r$ with a transmural pressure difference $P$, the wall tension (force per unit length of wall) is

$$
T = P\,r,
$$ {#eq-laplace}

and for a thin-walled sphere $T = Pr/2$. If the wall has thickness $w$, the stress in the wall material is $\sigma = T/w = Pr/w$. Assumptions: thin walls ($w \ll r$), static equilibrium, and uniform pressure.
:::

::: proof
Cut a cylinder of length $L$ along a plane through its axis. Pressure pushes the two halves apart with a force $P \times 2rL$ (pressure times the projected area). The wall resists with a tension $T$ along each of the two cut edges, a force $2TL$. Equilibrium gives $2TL = 2PrL$, so $T = Pr$. For a sphere, cut through a great circle: $P\pi r^2 = T \cdot 2\pi r$, so $T = Pr/2$.
:::

::: example Aorta and capillary {#ex-laplace}
Compare the wall tension in (a) a capillary of radius 3.0 µm at a pressure of 3.0 kPa and (b) a mammalian aorta of radius 12 mm at 13 kPa. (c) Why can a capillary wall be a single layer of cells, while the aorta's wall is about 2 mm thick, with layers of elastic fibres and smooth muscle?
::: solution
(a) $T = 3.0\times10^3 \times 3.0\times10^{-6} = 9.0\times10^{-3}$ N m⁻¹.

(b) $T = 13\times10^3 \times 0.012 = 156$ N m⁻¹.

(c) The aorta's wall tension is about 17,000 times that of the capillary at only four times the pressure, because tension grows with radius. The capillary's tiny radius lets its wall, one endothelial cell plus a basement membrane, withstand the pressure while being thin enough for rapid diffusion. The aorta needs a thick wall of elastin and collagen to bear the load. The same law explains why a dilated, enlarged heart must develop more wall tension to produce the same pressure, which increases its energy cost.
:::
:::

### Gravity and the giraffe

In a standing animal, gravity adds a hydrostatic pressure $\rho g h$ to the blood at a depth $h$ below a reference level. For blood (density about 1050 kg m⁻³), this amounts to about 10 kPa per metre. A giraffe's head is about 2 m above its heart, so its heart must produce about $1050 \times 9.81 \times 2.0 = 21$ kPa just to lift blood to the head, in addition to the pressure needed to drive it through the brain. Giraffes have mean arterial pressures at heart level of roughly twice those of other mammals, achieved not with an unusually large heart but with a thick-walled left ventricle of small radius — which, by Laplace's law, can generate high pressure without excessive wall stress. Their legs face the opposite problem, high pressures that would force fluid out of the capillaries; tight skin and fascia around the lower legs, and thick-walled arteries, prevent swelling. Snakes show a parallel adaptation: tree-climbing species have their hearts closer to the head and higher blood pressures than aquatic species, in which gravity is offset by the surrounding water (Harvey Lillywhite and colleagues).

## Exchange in the capillaries

Exchange between blood and tissues takes place across the capillary walls. Small solutes (O₂, CO₂, glucose, ions) cross mainly by diffusion; water moves by filtration, driven by the balance of hydrostatic and osmotic pressures.

::: proposition Starling's principle of fluid exchange {#prop-starling}
The net rate of fluid filtration $J_\mathrm{v}$ out of a capillary is

$$
J_\mathrm{v} = K_\mathrm{f}\left[(P_\mathrm{c} - P_\mathrm{i}) - \sigma(\pi_\mathrm{c} - \pi_\mathrm{i})\right],
$$ {#eq-starling}

where $P_\mathrm{c}$ and $P_\mathrm{i}$ are the hydrostatic pressures in the capillary and the interstitial fluid, $\pi_\mathrm{c}$ and $\pi_\mathrm{i}$ the **colloid osmotic** (oncotic) pressures exerted by proteins that cannot cross the wall freely, $\sigma$ the reflection coefficient of the wall for those proteins (1 for a wall impermeable to them), and $K_\mathrm{f}$ the filtration coefficient (permeability times area). Positive $J_\mathrm{v}$ means filtration out of the capillary. (Ernest Starling, 1896.)
:::

In the classical textbook picture, capillary hydrostatic pressure falls along the capillary, from about 4.5 kPa at the arteriolar end to 2 kPa at the venular end, while plasma oncotic pressure, about 3.3 kPa in mammals, stays constant, so fluid is filtered at the arteriolar end and reabsorbed at the venular end. Measurements since the 1990s have revised this. The relevant oncotic pressure is the one immediately beneath the **endothelial glycocalyx**, the layer of glycoproteins on the inner surface of the capillary, which can be much lower than that of the bulk interstitial fluid; and in most tissues at steady state there is little or no sustained reabsorption — capillaries filter along most of their length, and the filtered fluid returns to the blood through the **lymphatic system** (J. R. Levick and C. C. Michel, 2010). Reabsorption occurs transiently after a fall in capillary pressure, as after a haemorrhage, and continuously in specialised capillaries such as those of the kidney and intestine that are fed by absorbing epithelia.

::: example Filtration along a capillary {#ex-starling}
Using the classical values $P_\mathrm{c} = 4.7$ kPa at the arteriolar end and 2.0 kPa at the venular end, $P_\mathrm{i} = 0$, $\pi_\mathrm{c} = 3.3$ kPa, $\pi_\mathrm{i} = 0.5$ kPa and $\sigma = 1$, calculate the net driving pressure at each end. What would happen to the balance if plasma protein concentration fell by a third?
::: solution
Arteriolar end: $(4.7 - 0) - (3.3 - 0.5) = 4.7 - 2.8 = +1.9$ kPa, filtration. Venular end: $(2.0 - 0) - 2.8 = -0.8$ kPa, absorption in the classical picture. If plasma protein fell by a third, $\pi_\mathrm{c}$ would fall to about 2.2 kPa, the oncotic term to 1.7 kPa, and the driving pressure would become $+3.0$ kPa at the arteriolar end and $+0.3$ kPa at the venular end: filtration everywhere, at a greater rate. If lymph flow cannot keep up, fluid accumulates in the tissues (oedema) — the reason that protein deficiency causes swelling. (In the revised view, the change still increases filtration, since filtration depends on the oncotic difference across the glycocalyx.)
:::
:::

::: widget plot
f: (4.7 - 2.7*x) - (p - 0.5); 0
x: 0, 1
y: -2, 4
sliders: p=3.3:1.5:4.5:0.1
labels: \text{net filtration pressure (kPa)}; \text{zero}
caption: Net driving pressure for fluid filtration (vertical axis, kPa) along a capillary from its arteriolar end (0) to its venular end (1) on the horizontal axis, from Starling's equation [[#eq-starling]] with the classical values of [[#ex-starling]]: capillary hydrostatic pressure falling linearly from 4.7 to 2.0 kPa, interstitial hydrostatic pressure 0, interstitial oncotic pressure 0.5 kPa, and plasma oncotic pressure $p$ set by the slider. Above the zero line fluid is filtered out; below it, reabsorbed. Lower $p$ to mimic a loss of plasma protein and see filtration extend along the whole capillary. The straight-line pressure profile is a simplification, and in most tissues the reabsorbing segment is now thought to be small or absent at steady state.
:::

## Hearts as pumps

Vertebrate hearts are **myogenic**: the heartbeat originates in the heart muscle itself, in pacemaker cells whose membrane potential depolarises spontaneously until it triggers an action potential, which spreads through the heart. Nerves change the rate but do not start each beat. Mollusc hearts are also myogenic. In many crustaceans and in the horseshoe crab *Limulus*, the heart is **neurogenic**: each beat is triggered by bursts from a **cardiac ganglion** on the heart, a small network of neurons that has been a model for studying how neural circuits generate rhythms.

Hearts adjust their output to the blood returned to them. If more blood returns, the ventricle fills more, its muscle fibres are stretched, and the next contraction is stronger and ejects more blood — the **Frank–Starling mechanism**, named after Otto Frank (who worked on frog hearts in the 1890s) and Ernest Starling (dog heart–lung preparations, 1914–18). The basis is the length–tension relation of muscle ([[cell-biology/cytoskeleton#exr-length-tension]], [[animal-physiology/muscle-movement]]), together with a length-dependent increase in the sensitivity of the contractile proteins to Ca²⁺. Fish hearts rely on this mechanism more than mammalian hearts do: when a trout swims harder, its cardiac output rises mainly through stroke volume, whereas in mammals it rises mainly through heart rate.

::: warning "Arteries carry oxygenated blood and veins deoxygenated blood"
Arteries are defined as vessels carrying blood *away from* the heart and veins as vessels carrying it *towards* the heart, whatever its O₂ content. The pulmonary arteries of mammals carry deoxygenated blood to the lungs, and the pulmonary veins oxygenated blood back. In a fish, the ventral aorta and afferent branchial arteries carry deoxygenated blood from the heart to the gills, and the fish heart contains only deoxygenated blood. A related error is to think that a three-chambered heart necessarily mixes blood wastefully: reptilian and amphibian hearts separate flows well when it pays, and their ability to shunt is under physiological control.
:::

## Control of the circulation

Arterial pressure is regulated by negative feedback ([[animal-physiology/homeostasis]]). Stretch receptors (**baroreceptors**) in the walls of major arteries — in mammals, the carotid sinuses and aortic arch — signal pressure to the brainstem, which adjusts heart rate, stroke volume and arteriolar resistance through the autonomic nerves. A fall in pressure raises heart rate and constricts arterioles; a rise does the opposite. Over longer times, hormones and the kidneys adjust blood volume ([[animal-physiology/water-salt-balance]]).

Local control matches flow to need. Working tissues release vasodilators — adenosine, K⁺, H⁺, CO₂ and, from the endothelium, nitric oxide — that relax the smooth muscle of their own arterioles, so that blood flow follows metabolic activity. Many organs also **autoregulate**, keeping their flow nearly constant over a range of arterial pressures by constricting when pressure rises.

The most dramatic example of circulatory control is the **diving response**. Per Scholander (1940) and Laurence Irving found that when seals dive, their heart rate drops sharply (bradycardia) and the arteries to most organs — gut, kidneys, skin and muscle — constrict, so that cardiac output falls and the blood's O₂ is reserved for the brain and heart ([[animal-physiology/gas-exchange#ex-dive]]). The response is graded: in short, routine dives it is moderate; in long or forced dives it is extreme, with heart rates in seals falling to a few beats per minute. Diving birds, turtles and even humans show versions of it.

::: quiz
A ventricle with a radius of 3 cm must generate a peak pressure of 16 kPa. Another ventricle, with radius 1.5 cm and the same wall thickness, generates the same pressure. How does the wall stress of the smaller ventricle compare with that of the larger one?
- [ ] It is the same, because the pressures are the same.
- [x] It is half as large.
- [ ] It is twice as large.
- [ ] It is a quarter as large, because stress depends on the square of the radius.
::: solution
By the law of Laplace ([[#prop-laplace]]), wall stress $\sigma = Pr/w$ (for a sphere $Pr/2w$). At equal pressure and wall thickness, halving the radius halves the stress. A small, thick-walled chamber is the best way to generate high pressure, as in the giraffe's left ventricle.
:::
:::

::: application Comparative cardiology
Comparative studies of hearts inform medicine in unexpected ways. The hearts of zebrafish and newts regenerate after injury, replacing lost muscle with new cardiomyocytes, whereas adult mammalian hearts form scar tissue; zebrafish heart regeneration (K. D. Poss and colleagues, 2002) is studied in the hope of stimulating repair in humans. Burmese pythons enlarge their hearts rapidly after a meal ([[animal-physiology/feeding-digestion]]), a reversible, healthy growth that is studied for comparison with the harmful enlargement of diseased hearts. Clinical cardiovascular physiology is in [Medicine Atlas: cardiovascular](/learn/medicine/course.php?c=cardiovascular).
:::

::: history
Galen in the second century described the heart and vessels but believed that blood was made continuously in the liver and consumed in the tissues, and that it passed through invisible pores in the septum of the heart. Ibn al-Nafis in the thirteenth century and Realdo Colombo in the sixteenth described the pulmonary circulation. William Harvey demonstrated the circulation of the blood in 1628, and Marcello Malpighi saw capillaries in the lung of a frog in 1661, completing the circuit. Stephen Hales first measured blood pressure in 1733, in a horse, with a glass tube nearly 3 m tall connected to its carotid artery. Jean Poiseuille's experiments on flow through glass capillaries (1840s) gave the law that bears his name with that of Gotthilf Hagen. Adolf Fick stated his principle in 1870, Ernest Starling the balance of capillary forces in 1896 and the law of the heart in 1918, and August Krogh's work on the regulation of capillaries in muscle won the Nobel Prize in 1920. Scholander and Irving described the diving response in the 1930s and 1940s.
:::

## Where this leads

The circulation delivers the O₂ that gills and lungs take up ([[animal-physiology/gas-exchange]]) and carries the hormones of [[animal-physiology/endocrine-control]]. Its plasma is filtered by the kidneys, which control its volume and composition ([[animal-physiology/water-salt-balance]]), and the muscle of the heart and vessels is examined in [[animal-physiology/muscle-movement]].

::: summary
- Bulk flow carries materials over distances diffusion cannot; open systems (arthropods, most molluscs) bathe tissues in haemolymph at low pressure, closed systems (annelids, cephalopods, vertebrates) keep blood in vessels.
- Fishes have a single circuit; amphibians and most reptiles can separate or shunt flows; birds and mammals independently evolved double circulation with high systemic and low pulmonary pressure.
- Cardiac output $\dot Q = f_\mathrm{H}V_\mathrm{S}$ can be calculated by the Fick principle $\dot Q = \dot V_{\mathrm{O_2}}/(C_\mathrm{a} - C_\mathrm{v})$ ([[#prop-fick-principle]]); it scales as about $M^{3/4}$ through heart rate.
- $\Delta P = \dot QR$; by Hagen–Poiseuille, $R = 8\eta L/\pi r^4$ ([[#prop-poiseuille]]), so arterioles control resistance and distribution of flow.
- Wall tension $T = Pr$ (law of Laplace, [[#prop-laplace]]): capillaries can be thin because they are narrow; giraffes generate high pressure with small, thick-walled ventricles.
- Starling's principle balances hydrostatic and oncotic pressures across capillaries ([[#prop-starling]]); in most tissues filtered fluid returns via lymph rather than by venular reabsorption.
- Vertebrate hearts are myogenic, some crustacean hearts neurogenic; the Frank–Starling mechanism matches output to venous return.
- Baroreceptor reflexes regulate pressure; local vasodilators match flow to need; diving animals show bradycardia and peripheral vasoconstriction.
:::

## Exercises

::: exercise Cardiac output {level=1 check="3.75"}
A dog's heart beats 150 times a minute with a stroke volume of 25 mL. What is its cardiac output in L min⁻¹?
::: solution
$150 \times 25 = 3750$ mL min⁻¹ $= 3.75$ L min⁻¹.
:::
:::

::: exercise The Fick principle {level=1 check="100"}
An animal consumes 2.0 L O₂ min⁻¹ during exercise with a cardiac output of 20 L min⁻¹. If arterial blood contains 200 mL O₂ L⁻¹, what is the O₂ content of mixed venous blood in mL L⁻¹?
::: solution
$C_\mathrm{a} - C_\mathrm{v} = 2000/20 = 100$ mL L⁻¹, so $C_\mathrm{v} = 200 - 100 = 100$ mL L⁻¹.
:::
:::

::: exercise Radius and resistance {level=1 check="16"}
By what factor does the resistance of a vessel increase if its radius is halved, all else being equal?
::: solution
$R \propto r^{-4}$: $2^4 = 16$.
:::
:::

::: exercise Hydrostatic pressure {level=2 check="14"}
A person stands upright. Taking blood density as 1050 kg m⁻³ and $g = 9.81$ m s⁻², how much higher (in kPa, to two significant figures) is the hydrostatic pressure in the veins of the feet, 1.4 m below the heart, than at heart level? Explain why the feet do not fill with fluid.
::: solution
$\rho g h = 1050 \times 9.81 \times 1.4 = 14\,400$ Pa $\approx 14$ kPa. This raises capillary pressure in the feet far above plasma oncotic pressure, so filtration increases. Oedema is limited by contraction of leg muscles, which squeezes the veins and, with venous valves, pumps blood upwards (the muscle pump); by increased lymph flow; by constriction of arterioles in the legs, which lowers capillary pressure; and by a rise in interstitial pressure as tissue fluid accumulates.
:::
:::

::: exercise Parallel circuits {level=2}
Two organs are supplied in parallel from the aorta. Organ A has resistance 6.0 kPa min L⁻¹ and organ B 3.0 kPa min L⁻¹. Mean arterial pressure is 12 kPa and venous pressure is 0. (a) Find the flow to each and the total. (b) The arterioles of organ B constrict so that its radius falls by 16 %. Find the new resistance of B and the new flows, assuming arterial pressure is held constant by reflexes. (c) What would happen to arterial pressure if the heart's output stayed at the original total instead?
::: solution
(a) $\dot Q_A = 12/6.0 = 2.0$ L min⁻¹; $\dot Q_B = 12/3.0 = 4.0$ L min⁻¹; total 6.0 L min⁻¹. (b) $R_B$ increases by $1/0.84^4 = 2.0$, to 6.0 kPa min L⁻¹; $\dot Q_B = 2.0$ L min⁻¹, total 4.0 L min⁻¹. (c) Total resistance would be $1/(1/6 + 1/6) = 3.0$ kPa min L⁻¹ (from $1/(1/6 + 1/3) = 2.0$ before), so at 6.0 L min⁻¹ arterial pressure would rise to 18 kPa; baroreceptor reflexes would then lower heart rate and dilate other vessels.
:::
:::

::: exercise A crocodile's shunt {level=2}
When a crocodile dives, blood from the right ventricle is increasingly diverted into the left aorta instead of the pulmonary artery. (a) Using the anatomy described in this chapter, explain how this bypasses the lungs. (b) Give two hypotheses for the function of such a right-to-left shunt during diving or digestion. (c) How might you test one of them?
::: solution
(a) In crocodilians the left aorta arises from the right ventricle. When resistance to pulmonary outflow rises (a valve in the pulmonary outflow tract closes partially, forming the "cog-teeth" valve), right-ventricular pressure rises until it exceeds that in the left aorta, and deoxygenated blood flows out through the left aorta to the body, bypassing the lungs. (b) Hypotheses: (1) during breath-holding, when the lungs are not ventilated, pumping blood through them wastes energy, so shunting saves cardiac work and lets the lung O₂ store be used more slowly; (2) shunting delivers CO₂-rich, acidic blood to the stomach (the left aorta supplies the gut), which could aid acid secretion during digestion (C. G. Farmer and colleagues proposed this in 2008); (3) it may help thermoregulation or reduce plasma filtration into the lungs. (c) For (2), surgically prevent the shunt in some animals and compare acid secretion and digestion rates with sham-operated controls; Farmer's group did an experiment of this kind with alligators. Results have been debated, and the function of the shunt remains an open question.
:::
:::

::: exercise Murray's law {level=3}
Cecil Murray (1926) asked how the radius of a vessel should be chosen to minimise the total cost of a blood vessel: the power needed to drive flow through it, $\dot Q^2 R$, plus the metabolic cost of maintaining its volume of blood, $b\,\pi r^2 L$, where $b$ is a constant. (a) Using the Hagen–Poiseuille resistance, show that the cost is minimised when $\dot Q \propto r^3$. (b) Deduce that at a branch where a parent vessel of radius $r_0$ divides into daughter vessels of radii $r_1, r_2, \ldots$, the optimal radii satisfy $r_0^3 = r_1^3 + r_2^3 + \cdots$. (c) What does Murray's law predict for the radius of each daughter at a symmetrical bifurcation?
::: solution
(a) Cost $W = \dot Q^2 \cdot \dfrac{8\eta L}{\pi r^4} + b\pi r^2 L$. Setting $\deriv{W}{r} = 0$: $-4\dot Q^2\dfrac{8\eta L}{\pi r^5} + 2b\pi r L = 0$, so $\dot Q^2 = \dfrac{b\pi^2 r^6}{16\eta}$, and $\dot Q = \dfrac{\pi}{4}\sqrt{\dfrac{b}{\eta}}\,r^3 \propto r^3$. (b) Flow is conserved at the branch: $\dot Q_0 = \dot Q_1 + \dot Q_2 + \cdots$. If every vessel is optimal, each $\dot Q_i = c\,r_i^3$ with the same constant $c$, so $r_0^3 = r_1^3 + r_2^3 + \cdots$. (c) $r_0^3 = 2r_1^3$, so $r_1 = 2^{-1/3}r_0 = 0.79\,r_0$. Measurements on many vascular beds and on plant xylem roughly follow this rule, especially in smaller vessels; large arteries, where flow is pulsatile, deviate from it.
:::
:::

::: exercise A giraffe's heart {level=3}
A giraffe's brain is 2.0 m above its heart, and arterial pressure at the base of the brain is about 13 kPa. (a) Estimate the mean arterial pressure needed at heart level. (b) If its left ventricle had the same radius-to-thickness ratio as that of a human (in which a peak pressure of 16 kPa produces a given wall stress), by what factor would the giraffe's wall stress exceed the human's at a peak pressure of 40 kPa? (c) Giraffe left ventricles in fact have relatively thick walls but are not unusually large relative to body mass. What does this imply about how the giraffe achieves high pressure, and what is the cost?
::: solution
(a) $13 + \rho g h = 13 + 1050 \times 9.81 \times 2.0/1000 = 13 + 21 = 34$ kPa, roughly double that of other large mammals (measured values are of this order). (b) Wall stress $\sigma \propto Pr/w$; with the same $r/w$, stress scales with pressure: $40/16 = 2.5$ times the human value. (c) By Laplace's law, the giraffe lowers wall stress by having a thick wall relative to chamber radius; a smaller radius also means a smaller stroke volume per unit of heart mass, so the giraffe compensates with heart rate, and its cardiac output per kilogram is similar to that of other mammals. The cost is that the heart must do more work per unit of blood pumped (work = pressure × volume), so a larger share of the giraffe's metabolism goes to pumping blood than in a mammal of the same size with ordinary blood pressure.
:::
:::

::: exercise Interpreting a heart-rate record {level=2}
Heart-rate loggers on a diving bird show: at the surface, 250 beats min⁻¹; within seconds of submerging, 80 beats min⁻¹; during the last seconds of the dive, before surfacing, 180 beats min⁻¹; on surfacing, 300 beats min⁻¹ for a minute, then back to 250. Explain each phase.
::: solution
Submerging triggers the diving response: bradycardia and peripheral vasoconstriction conserve the O₂ store for the brain and heart. Shortly before surfacing heart rate rises in anticipation — a feedforward response ([[animal-physiology/homeostasis]]), perhaps to restore blood flow and speed up gas exchange as soon as the bird breathes. On surfacing, a tachycardia above the resting rate speeds the reloading of O₂ stores and the washout of CO₂ and of lactate from tissues that were vasoconstricted, after which heart rate returns to normal.
:::
:::
