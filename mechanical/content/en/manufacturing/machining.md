Machining is the process the other processes are measured against, and the one that should never have been invented. It is the only way to make a metal part in which you **remove material to create the shape**, which means it wastes metal, spends energy, breaks tools, and leaves a surface whose properties are those of a heavily sheared, thermally cycled, work-hardened skin rather than of the bulk. Every serious manufacturing engineer's first instinct should be to form or cast the part and machine only the surfaces that must be held — and the reason the instinct is not always right is that machining has four virtues nothing else matches: **it can make any shape that a tool can reach, in any material, to any tolerance the machine is stiff enough to hold, with no part-specific tooling at all.** A casting cannot make a 0.01 mm bore in a 1,200 MPa steel; a forging cannot make an internal cooling passage; a mould cannot make forty parts a year of a 3 m welded frame. Machining can, and it can do it on Monday from a drawing that did not exist on Friday.

That is the whole commercial argument, and it is why machining is where the money goes: **the buy-to-fly ratio of a machined titanium aircraft bracket is 5-10** — five to ten kilograms of mill product are turned into swarf for every kilogram that ends up in the aeroplane — and **the machining time of a jet engine disc is forty hours of a £200-an-hour machine** while the forging that became it cost £2,000. This lesson is about the physics that sets those numbers: what a chip is, why the tool wears out, how much power it takes, what surface you get, and where machining stops being the answer.

::: warning Seven ways machining goes wrong
**Choosing machining because it is the default.** Every part on the drawing with a $\pm 0 . 1 \ \mathrm { m m }$ dimension and a $1 . 6 \ \mu \mathrm { m }$ finish is a part that has been designed into a £40 machine hour. The question is never "can it be machined?" but "what does the tolerance cost, and what does it buy?" — see [[manufacturing/process-selection]]. **Specifying a tolerance the drawing does not need.** The cost of a hole rises steeply with every IT grade it tightens: an IT11–12 drilled hole is a minute of work, an IT7 reamed hole a few minutes, an IT5 honed bore ten, and an IT3–4 lapped hole an hour and a technician. **Asking for $R _ { a } \ 0 . 8$ "on all surfaces" is the single most expensive sentence in mechanical engineering.** **Running the tool to failure instead of to the optimum.** Taylor's exponent means that, for a carbide with $n = 0.25$, the tool life at 200 m/min is a sixteenth of that at 100; the shop that runs at the speed the operator likes is paying either for tools or for machine time, and the arithmetic of the optimum is only two lines long. **Ignoring the size effect.** The specific cutting energy of steel is $2 { - } 3 \ \mathrm { J / m m ^ { 3 } }$ at a $0 . 3 \ \mathrm { m m }$ chip and several times that at $1 0 \ \mu \mathrm { m }$ , because as the chip approaches the size of the tool's edge radius ( $2 { - } 1 0 \ \mu \mathrm { m }$ no matter how sharp the edge is) more and more of the work goes into ploughing and burnishing rather than cutting. **Micro-machining is a different physics and a different machine.** **Confusing up-milling with climb milling.** In up (conventional) milling the tooth starts at zero thickness, rubs, and then pulls the workpiece up the table; in climb milling it starts at full thickness and the table feed helps the cut. Climb milling gives a better surface, longer tool life and less work hardening, and can only be used when the table's lead-screw backlash has been taken out — which is why every old manual mill must be up-milled and every CNC can and should climb-mill. **Letting the machine chatter.** Chatter is self-excited: the wave the tooth leaves is cut by the next tooth, and at the wrong spindle speed the two reinforce. It costs the surface, the insert and sometimes the spindle bearings, and the cure is not to slow down but to **change the speed by 15-20 %** or use a cutter with unequal tooth pitch. **Machining a part that should have been formed, or forming a part that should have been machined.** A 4,000-piece stainless bracket machined from plate at a buy-to-fly of 6 is a £300 part that a £60,000 press tool would have made for £40 — and a 40-piece prototype "formed" in a £60,000 press tool is a prototype that will never be built. **And never forget the hazards:** rotating chucks and spindles, flying chips and hot swarf, sharp edges, coolant mist and skin contact, the dust of cast iron, composites and beryllium-bearing alloys, the fire risk of magnesium and titanium fines, and the bursting energy of a grinding wheel run above its rated speed. Machining is done only with proper training, guards, eye protection, extraction and supervision.
:::

## 1. What a chip is

::: definition Shear plane, force circle, and the three kinds of chip {#def-chip}
Turn the handle of a lathe and the tool does not "cut" the way a knife cuts. It **shears the metal along a narrow plane at $2 0 { - } 3 5 ^ { \circ }$ to the surface**, and the chip rides up that plane and over the tool's rake face. Everything else follows. The **chip thickness ratio** $r = t _ { 1 } / t _ { 2 }$ (uncut over cut, always less than 1 because the chip is thicker than the layer it came from, having been compressed) fixes the shear-plane angle $\phi$ geometrically, and the forces on the tool resolve into a clean circle:

$$
\tan \phi \; = \; { \frac { r \cos \alpha } { 1 - r \sin \alpha } } , \qquad
F _ { s } = F _ { c } \cos \phi - F _ { t } \sin \phi , \qquad
\mu \; = \; { \frac { F _ { t } + F _ { c } \tan \alpha } { F _ { c } - F _ { t } \tan \alpha } }
$$

with $F _ { c }$ the cutting force (the power-consuming component, $P = F _ { c } V )$ and $F _ { t }$ the thrust. The **shear stress on the shear plane** is then $\tau _ { s } = F _ { s } / ( w t _ { 1 } / \sin \phi )$ , where $w t _ { 1 } / \sin \phi$ is the area of the shear plane, which runs from the tool tip up to the free surface at angle $\phi$ . It is usually well above the shear yield strength measured in a slow test on the annealed metal, because the shear zone is a region of $1 0 0 { - } 3 0 0 \ \ \%$ strain at $1 0 ^ { 3 } { - } 1 0 ^ { 6 } \ \mathrm { s ^ { - 1 } }$ and a few hundred degrees.

The **chip form** tells you what the material did, and it is the machinist's diagnosis:

$$
\begin{array} { l l l l }
\textbf{Chip} & \textbf{Materials} & \textbf{What is happening} & \textbf{Consequence} \\ \hline
\text{Continuous, ribbon} & \text{mild steel, Al, Cu (ductile, high } n ) & \text{uniform shear} & \text{good finish; long strings that wrap the part} \\
\text{Continuous + BUE} & \text{low-carbon steel, stainless, Ti} & \text{welded layer on the rake face} & \text{poor finish, oversized cut, then it releases as a pit} \\
\text{Discontinuous, powder} & \text{grey cast iron, leaded brass} & \text{cracks ahead of the tool} & \text{good finish but abrasive dust, tool wear} \\
\text{Serrated (segmented)} & \text{Ti-6Al-4V, Inconel, 45 HRC steel} & \text{adiabatic shear bands} & \text{chipping, vibration, tool fracture} \\
\text{Helical / C-shaped} & \text{same, with a chip breaker} & \text{geometry forces a curl} & \text{the only chip that gets out of a deep bore}
\end{array}
$$

The **built-up edge** is the most important of these and the least understood on shop floors: at $3 0 0 { - } 5 0 0 \ \mathrm { ^ { \circ } C }$ and high pressure, a fraction of the chip welds to the rake face, grows to two or three times the tool's edge radius, and then breaks off — so the part is being cut by a temporarily sharper, then blunter, then absent edge. It is why a low-carbon steel machined slowly has a worse surface than the same steel machined fast (the BUE needs time and moderate temperature to form), why adding sulphur and lead to steel makes it "free-machining" (the inclusions are pre-made crack paths and solid lubricants), and why the answer is usually more speed, a polished rake face, and flood coolant — not less.
:::

::: proof The shear-plane angle and the friction angle {#proof-merchant}
Volume constancy in the shear zone says the metal crossing the plane is neither created nor destroyed, so the uncut layer of thickness $t _ { 1 }$ becomes a chip of thickness $t _ { 2 }$ travelling up the shear plane at angle $\phi$ . From the geometry of the triangle cut by the shear plane (with the tool's rake angle $\alpha )$ ,

$$
t _ { 1 } = l _ { c } \sin \phi , \qquad t _ { 2 } = l _ { c } \cos ( \phi - \alpha ) \qquad \Longrightarrow \qquad r = { \frac { t _ { 1 } } { t _ { 2 } } } = { \frac { \sin \phi } { \cos ( \phi - \alpha ) } }
$$

Cross-multiplying, expanding $\cos ( \phi - \alpha )$ and dividing through by $\cos \phi$ gives

$$
r ( \cos \phi \cos \alpha + \sin \phi \sin \alpha ) \; = \; \sin \phi \; \Longrightarrow \; r ( \cos \alpha + \tan \phi \sin \alpha ) \; = \; \tan \phi \; \Longrightarrow \; \tan \phi \; = \; { \frac { r \cos \alpha } { 1 - r \sin \alpha } }
$$

For the friction, resolve the measured forces on the tool's rake face: with $F _ { c }$ along the cutting direction and $F _ { t }$ normal to the machined surface (pushing the tool away from the work), the friction and normal forces on a rake face of rake angle $\alpha$ are $F = F _ { c } \sin \alpha + F _ { t } \cos \alpha$ and $N = F _ { c } \cos \alpha - F _ { t } \sin \alpha$ , so the coefficient of friction on the rake face is

$$
\mu \; = \; { \frac { F } { N } } \; = \; { \frac { F _ { c } \tan \alpha + F _ { t } } { F _ { c } - F _ { t } \tan \alpha } } \; = \; \tan \beta
$$

and **Merchant's relation**, $2 \phi + \beta - \alpha \approx 9 0 ^ { \circ }$ , which follows from choosing the $\phi$ that minimises the cutting force on the assumption that the shear strength $\tau _ { s }$ and the friction angle $\beta$ do not depend on $\phi$ , then says that the shear plane settles where the material's own shear strength and the tool's friction balance. It is not exact — sometimes it agrees with measurement to a few degrees, often much worse, and modern practice measures $\phi$ and $\mu$ and uses the measured values — but it is the reason a cutting tool's rake angle is chosen the way it is: **a larger $\alpha$ raises $\phi$ , which shortens the shear plane, which reduces the shear strain, the force and the power, which is why aluminium is cut on a $2 0 ^ { \circ }$ positive rake and hardened steel on a $6 ^ { \circ }$ negative one, which gives the brittle edge the strength to survive.**
:::

::: example An orthogonal cut, measured {#ex-merchant level=3 check="34.0"}
Orthogonal turning of an aluminium alloy at $\alpha = 1 0 ^ { \circ }$ , width $5 \ \mathrm { m m }$ , uncut thickness $0 . 5 \ \mathrm { m m }$ , gives $F _ { c } = 1 1 7 7 \ \mathrm { N }$ , $F _ { t } = 5 6 8 \ \mathrm { N }$ and a length ratio $l _ { 1 } / l _ { 2 } = 0 . 6 1 3$ (so $r = 0 . 6 1 3 )$ at $V = 1 0 0 \ \mathrm { m / m i n }$ .

$$
\tan \phi = { \frac { 0 . 6 1 3 \cos 1 0 ^ { \circ } } { 1 - 0 . 6 1 3 \sin 1 0 ^ { \circ } } } = { \frac { 0 . 6 0 4 } { 0 . 8 9 4 } } = 0 . 6 7 6 \qquad \Longrightarrow \qquad \phi = { \bf 3 4 . 0 ^ { \circ } }
$$
$$
\mu = { \frac { 5 6 8 + 1 1 7 7 \tan 1 0 ^ { \circ } } { 1 1 7 7 - 5 6 8 \tan 1 0 ^ { \circ } } } = { \frac { 7 7 6 } { 1 0 7 7 } } = 0 . 7 2 \qquad ( \beta = 3 5 . 8 ^ { \circ } )
$$
$$
F _ { s } = 1 1 7 7 \cos 3 4 ^ { \circ } - 5 6 8 \sin 3 4 ^ { \circ } = 9 7 5 - 3 1 8 = 6 5 7 \ \mathrm { N } , \qquad A _ { s } = { \frac { 5 \times 0 . 5 } { \sin 3 4 ^ { \circ } } } = 4 . 4 7 \ \mathrm { m m ^ { 2 } }
$$
$$
\tau _ { s } = { \frac { 6 5 7 } { 4 . 4 7 } } = 1 4 7 \ \mathrm { M P a } , \qquad P = { \frac { F _ { c } V } { 6 0 } } = { \frac { 1 1 7 7 \times 1 0 0 } { 6 0 } } = 1 . 9 6 \ \mathrm { k W } , \qquad u = { \frac { 1 9 6 2 } { 4 1 6 7 \ \mathrm { m m ^ { 3 } / s } } } = 0 . 4 7 \ \mathrm { J / m m ^ { 3 } }
$$

**Check the two numbers against the physics.** Merchant's relation gives $2 \phi + \beta - \alpha = 6 8 . 1 + 3 5 . 8 - 1 0 = 9 3 . 9 ^ { \circ }$ , within $4 ^ { \circ }$ of the predicted $9 0 ^ { \circ }$ — the theory works. And the specific energy, $0 . 4 7 \ \mathrm { J / m m ^ { 3 } }$ , is exactly the handbook value for aluminium ( $0 . 4 { - } 0 . 7 \ \mathrm { J / m m ^ { 3 } }$ , against $2 { - } 3 . 5$ for steel and 2.5 for cast iron), while the shear stress of $1 4 7 \ \mathrm { M P a }$ is a plausible flow stress in shear for a heavily strained aluminium alloy. **The power figure is the one to keep in your head: two kilowatts to machine aluminium at a heavy rate — and grinding steel (§3) costs some fifty times as much energy per cubic millimetre.**
:::

::: widget plot
title: The size effect — why micro-machining is not small machining
f: 2.2*(1+0.05/x); 2.2; 10
x: 0.01,1
y: 0,14
labels: u = u₀(1 + h/t₁), h = 0.05 mm; the bulk value u₀ = 2.2 J/mm³; the point where cutting stops paying
caption: Specific cutting energy of steel against the uncut chip thickness. The bulk value of $2 . 2 \ \mathrm { J / m m ^ { 3 } }$ is what a $0 . 3 \ \mathrm { m m }$ chip costs; take the chip to $1 0 \ \mu \mathrm { m }$ and this simple model says it costs six times as much per cubic millimetre, because the tool's cutting edge has a radius of $2 { - } 1 0 \ \mu \mathrm { m }$ no matter how it is ground, and below the **minimum chip thickness** (typically a fraction — very roughly a quarter to a half — of the edge radius) the metal is displaced, ploughed and recovered elastically instead of being sheared. **The consequences are practical and expensive: a finishing pass below $5 \ \mu \mathrm { m }$ work-hardens the surface and burns the tool rather than cutting; a "light finishing cut" taken to improve a surface can leave it worse, with a compressive-then-tensile residual profile; and micro-machining needs tools with edge radii of a micrometre or two, which is why many micro-features are made by laser, EDM or lithographic processes instead.**
:::

## 2. Heat, tool life, and the tools

::: definition Where the heat goes and why the tool dies {#def-heat}
Roughly **60-75 % of the work of cutting becomes heat in the chip, 15-25 % goes into the workpiece, and 5-20 % into the tool** — the split set by the chip's speed and conductivity, which is why machining aluminium (a heat sink on legs) is cool and machining titanium (whose chips leave with the heat still in them) is not. Of the heat that reaches the tool, almost all of it arrives at a spot the size of a grain of sand on the rake face behind the edge, where the freshly cut, chemically hungry, $6 0 0 { - } 9 0 0 \ \mathrm { ^ { \circ } C }$ underside of the chip is sliding over a coated carbide at $1 { - } 3 \ \mathrm { m / s }$ under a contact pressure of $2 { - } 4 \ \mathrm { G P a }$ . **Tool wear is that interface**, and there are five mechanisms, always in combination:

$$
\begin{array} { l l l l }
\textbf{Mechanism} & \textbf{Where} & \textbf{Needs} & \textbf{Defence} \\ \hline
\text{Abrasion} & \text{flank, crater} & \text{hard particles (carbides, oxides, sand in the casting skin)} & \text{harder tool, chamfered edge} \\
\text{Adhesion} & \text{rake face} & T > 3 0 0 \ \mathrm { ^ { \circ } C } , \ \text{affinity} & \text{inert coating (Al}_2\text{O}_3\text{), rake, coolant} \\
\text{Diffusion} & \text{crater} & T > 7 0 0 \ \mathrm { ^ \circ C } , \ \text{solubility} & \text{no diamond on steel (carbon affinity)} \\
\text{Oxidation} & \text{both faces} & T > 5 0 0 \ \mathrm { ^ \circ C } , \ \text{oxygen} & \text{oxidation-resistant coatings} \\
\text{Plastic flow} & \text{edge} & \text{high temperature and pressure soften the edge} & \text{compressive coating stress, thick grade} \\
\text{Fracture, chipping} & \text{edge, tip} & \text{shock, chatter, interrupted cut} & \text{tougher grade, edge hone, gentler entry}
\end{array}
$$

The **tool-life equation** is the empirical law that organises all of it — **Taylor's** $V T ^ { n } = C$ , with $V$ in m/min, $T$ the minutes of cutting to a defined wear (conventionally $0 . 3 \ \mathrm { m m }$ of flank wear for finishing, $0 . 6 \ \mathrm { m m }$ for roughing), $n$ the slope and $C$ the speed at one minute of life:

$$
V T ^ { n } = C \qquad \Longleftrightarrow \qquad { \frac { T _ { 2 } } { T _ { 1 } } } = \left( { \frac { V _ { 1 } } { V _ { 2 } } } \right) ^ { 1 / n } \qquad \Longrightarrow \qquad n = { \frac { \log V _ { 2 } - \log V _ { 1 } } { \log T _ { 1 } - \log T _ { 2 } } }
$$

$$
\begin{array} { l c c c c c }
& \text{HSS} & \text{carbide} & \text{cermet} & \text{ceramic} & \text{PCBN / diamond} \\
n & 0 . 0 8 { - } 0 . 1 5 & 0 . 2 0 { - } 0 . 3 5 & 0 . 3 { - } 0 . 4 & 0 . 4 { - } 0 . 6 & 0 . 5 { - } 0 . 9 \\
\text{usable } T _ { \text{interface } } & 6 0 0 \ \mathrm { ^ \circ C } & 9 0 0 \ \mathrm { ^ \circ C } & 1 0 0 0 \ \mathrm { ^ \circ C } & 1 2 0 0 \ \mathrm { ^ \circ C } & 1 3 0 0 { - } 1 5 0 0 \ \mathrm { ^ \circ C } \\
\text{typical } V \text{ on steel} & 2 5 { - } 4 0 \ \mathrm { m / m i n } & 1 5 0 { - } 3 0 0 & 2 0 0 { - } 3 5 0 & 3 0 0 { - } 6 0 0 & 1 0 0 { - } 2 0 0 \text{ (hard turned)}
\end{array}
$$

**The exponent is the whole story.** With $n = 0 . 2 5$ , doubling the speed costs a factor of $2 ^ { 4 } = 1 6$ in tool life; with $n = 0 . 6$ (a ceramic) it costs only $2 ^ { 1 . 7 } = 3 . 2$ . **That is why the history of cutting speed is the history of tool materials, and why a shop's decision to run at 300 m/min instead of 150 is not a decision about tools but about $n$ , and therefore about whether the insert is coated carbide, cermet or ceramic.** Feed costs less than speed and depth costs least of all — an extended Taylor relation with exponents typical of carbide on steel, $V T ^ { 0 . 2 5 } f ^ { 0 . 6 } a _ { p } ^ { 0 . 3 } = C$ , says a $25 \ \ \%$ increase in feed costs the same tool life as a $14 \ \ \%$ increase in speed ( $1 . 2 5 ^ { 0 . 6 } = 1 . 1 4$ ) while removing metal $25 \ \ \%$ faster instead of $14 \ \ \%$ , which is why the first thing to increase when a shop wants more metal removed is the feed, and the last is the speed.

**Cutting fluids** do four jobs (cool, lubricate the tool-chip interface, flush chips, protect the surface) and cost three things (5-15 % of the part cost in purchase, sump, filtration, mist extraction and disposal; a health and slip hazard; and a scrap-quality problem when the fluid degrades). The industry's answer since the 1990s has been to remove them where possible — **dry machining** with a polished rake face and a thermal-barrier coating on the insert, **MQL** (minimum quantity lubrication, $2 0 { - } 1 0 0 \ \mathrm { m l / h }$ of ester sprayed as a fine aerosol exactly at the wedge, which does the lubrication job at $1 \ \ \%$ of the volume), and high-pressure through-tool air or $\mathrm { C O } _ { 2 }$ for bores where chips must be forced out. **The rule of thumb that survives: fluids help most at low speed with ductile materials (where BUE is the problem) and cast iron (where the dust is), and least at high speed with carbide on steel, where thermal cycling from a flooded jet is a bigger cause of insert cracking than the heat is.**
:::

::: proof The speed that costs least, and the speed that makes most {#proof-tayloropt}
Machining time per part is $t _ { m } = A / V$ for a fixed cut, and tool life is $T = ( C / V ) ^ { 1 / n }$ , so the number of tools consumed per part is $t _ { m } / T$ . If $t _ { i }$ is the time lost per tool change (tool change plus index) and $t _ { c }$ the workpiece loading time, the production time per part is

$$
T _ { p } ( V ) \; = \; { \frac { A } { V } } + t _ { c } + t _ { i } \, { \frac { A / V } { ( C / V ) ^ { 1 / n } } }
$$

Differentiating with respect to $V$ and setting the result to zero,

$$
- \, { \frac { A } { V ^ { 2 } } } + { \frac { t _ { i } A } { C ^ { 1 / n } } } \left( \frac { 1 } { n } - 1 \right) V ^ { 1 / n - 2 } = 0 \qquad \Longrightarrow \qquad V ^ { 1 / n } = C ^ { 1 / n } \, { \frac { n } { t _ { i } ( 1 - n ) } }
$$

and substituting back for the tool life,

$$
\boxed { \; T _ { \text{opt } } \; = \; t _ { i } \left( { \frac { 1 } { n } } - 1 \right) \; \Longleftrightarrow \; V _ { \text{opt } } = { \frac { C } { T _ { \text{opt } } ^ { n } } } \; }
$$

**Two things about this result are worth more than the algebra.** First, **the optimum tool life is a multiple of the tool change time, and the multiple is $1 / n - 1$** : for carbide ( $n = 0 . 2 5 )$ it is 3, for HSS ( $n = 0 . 1 )$ it is 9, for ceramic ( $n = 0 . 5 )$ it is 1. **A hard, brittle, wear-resistant tool with a high $n$ should be run to a SHORT life; a soft, tough, cheap tool with a low $n$ should be run a long time.** That is counter-intuitive and it is why the tool supplier's recommended speed is usually conservative. Second, **for minimum cost rather than maximum output, replace $t _ { i }$ by $t _ { i } + C _ { t } / M$ , where $C _ { t }$ is the cost per tool edge and $M$ the machine rate per minute** — the tooling cost enters as an equivalent time, and the optimum tool life lengthens to $T = ( 1 / n - 1 ) ( t _ { i } + C _ { t } / M )$ . **The dearer a cutting edge is compared with a minute of machine time, the longer each edge should be made to last.**
:::

::: example The speed to run {#ex-toollife level=3 check="190"}
Carbide turning a mild steel shaft: $n = 0 . 2 5$ , $C = 2 5 0 \ \mathrm { m / m i n }$ , tool change time $t _ { i } = 1 \ \mathrm { m i n }$ , cost per cutting edge £6, machine rate £60/hour (£1/min). Find the cutting speed for maximum production rate and for minimum cost. (Enter the maximum-production speed in m/min, to the nearest 10.)

$$
\text{Maximum production rate: } \; T _ { \text{opt } } = 1 \times ( 4 - 1 ) = 3 \ \mathrm { m i n } \qquad \Longrightarrow \qquad V = { \frac { 2 5 0 } { 3 ^ { 0 . 2 5 } } } = { \bf 1 9 0 \ m / m i n }
$$
$$
\text{Minimum cost: } \; t _ { \text{eq } } = 1 + { \frac { 6 } { 1 } } = 7 \ \mathrm { m i n } \qquad \Longrightarrow \qquad T _ { \text{opt } } = 7 \times 3 = 2 1 \ \mathrm { m i n } , \; V = { \frac { 2 5 0 } { 2 1 ^ { 0 . 2 5 } } } = 1 1 7 \ \mathrm { m / m i n }
$$

**One hundred and ninety metres a minute if the machine is the bottleneck and the order book is full; about a hundred and twenty if the shop has spare capacity and the edges are expensive.** The tool life at the two settings differs by a factor of seven, and the metal removed per edge (proportional to $V T$ ) by a factor of about four — which is the whole of the argument, and which is why "what speed should I run?" is not a question about the material, the tool or the workpiece but about the state of the factory. **Note also what the two optima have in common: neither is the speed at which the tool is run to destruction, and neither is the conservative speed in the catalogue.**
:::

::: widget plot
title: Tool life against cutting speed — Taylor's two curves
f: pow(250/x,4); pow(1400/x,2); 15
x: 100,400
y: 0,60
labels: carbide, n = 0.25, C = 250; ceramic, n = 0.5, C = 1400; the shortest life a shop will accept
caption: Tool life against cutting speed for two tool materials on steel, from $T = ( C / V ) ^ { 1 / n }$ , with the horizontal line the 15 minutes of life a production shop will accept before it starts counting changes. **The carbide curve is on the steep part of its life at every speed a shop would choose, which is why carbide tooling is bought in minutes and not in pieces.** The ceramic curve is the trap: Taylor's law says the ceramic outlasts the carbide at $2 0 0 \ \mathrm { m / m i n }$ by twenty to one, and in the shop it does not, because below its speed window a ceramic fails by chipping, by notching at the cut line, and by the thermal cracking of a rake face that never gets hot enough to soften — failure modes the wear law does not describe. **A ceramic is not a "better carbide"; it is a material whose $n$ only pays inside a speed window that the machine, the workholding and the toolholder must also be able to reach.** That is why high-speed machining did not arrive with the tool material in 1960 but with the balanced spindle, the symmetric toolholder, the control and the rigid fixture of the 1990s.
:::

## 3. The machine tools

::: definition Turning, boring, and the kinematics of a single point {#def-turn}
Turning is the oldest and simplest of the processes: the work rotates, the tool feeds, and the swept surface is a surface of revolution. The whole arithmetic is four numbers:

$$
V = { \frac { \pi D N } { 1 0 0 0 } } \ [ \mathrm { m / m i n } ] , \qquad v _ { f } = f N \ [ \mathrm { m m / m i n } ] , \qquad
\mathrm { M R R } = a _ { p } \, f \, V \times 1 0 ^ { 3 } / 6 0 \ [ \mathrm { m m ^ { 3 } / s } ] , \qquad P = { \frac { F _ { c } V } { 6 0 \times 1 0 ^ { 3 } \eta } } \ [ \mathrm { k W } ]
$$

with $a _ { p }$ the depth of cut, $f$ the feed per revolution, and the cutting force given by the **specific cutting force** $F _ { c } = k _ { c } a _ { p } f$ ( $k _ { c } \approx 1 { , } 5 0 0 { - } 3 { , } 0 0 0 \ \mathrm { N / m m ^ { 2 } }$ for steels, falling as the chip thickens — the size effect of §1). The **machine time** of a turned step is $t _ { m } = L / ( f N )$ plus the approach and the in-feed, and it is the number a quoting engineer multiplies by the machine-hour rate; the **power** is what stops him going faster.

The processes built on this one point are the whole of the "round" world: **facing, boring** (the tool inside, the rigidity of the bar replaced by that of the tooling, which is why bores are harder to hold than diameters and why a bore over $3 \times$ its diameter needs a damping bar), **threading** (single- or multi-point, or **whirling** for acme and ball-screw forms), **parting and grooving**, **knurling**, **roller burnishing** (which is not machining but a forming operation done on a lathe, and gives an $R _ { a }$ of $0 . 2 \ \mu \mathrm { m }$ and a compressive surface), and **turn-milling** on a lathe with driven tools, which machines flats, slots and cross-holes in the same set-up instead of moving the part to a milling machine.

The modern turning machine is a **turning centre**: a turret or two, a sub-spindle, live tooling, a bar-feeder, and a parts-catcher — and the geometry it is good at is the axisymmetric part in ductile material at 20-200 a hour. Its characteristic failure is **the long thin slender part**: a $5 0 0 \times 2 0 \ \mathrm { m m }$ shaft between centres, where with the tool at mid-span even a $1 0 0 \ \mathrm { N }$ radial force deflects it by $F L ^ { 3 } / 4 8 E I \approx 0 . 1 7 \ \mathrm { m m }$ , and the part comes out barrel-shaped and chattered and the answer is a steady rest, a smaller nose radius, or a different process.
:::

::: example Power, force and the machine-time bill {#ex-power level=3 check="6.6"}
Turn a $6 0 \ \mathrm { m m }$ diameter steel shaft down by $a _ { p } = 3 \ \mathrm { m m }$ at $f = 0 . 3 \ \mathrm { m m / r e v }$ and $V = 2 0 0 \ \mathrm { m / m i n }$ , with $k _ { c } = 2 { , } 2 0 0 \ \mathrm { N / m m ^ { 2 } }$ and a spindle efficiency of $8 5 \ \ \%$ . Find the cutting power at the tool, the motor power and the machine time. (Enter the power at the tool in kW to one decimal place.)

$$
F _ { c } = 2 2 0 0 \times 3 \times 0 . 3 = 1 9 8 0 \ \mathrm { N } , \qquad P _ { c } = { \frac { 1 9 8 0 \times 2 0 0 } { 6 0 \times 1 0 ^ { 3 } } } = { \bf 6 . 6 \ k W } \ \text{at the tool} , \qquad P _ { \text{motor} } = { \frac { 6 . 6 } { 0 . 8 5 } } = 7 . 8 \ \mathrm { k W }
$$
$$
\mathrm { M R R } = { \frac { 3 \times 0 . 3 \times 2 0 0 \times 1 0 ^ { 3 } } { 6 0 } } = 3 { , } 0 0 0 \ \mathrm { m m ^ { 3 } / s } = 1 8 0 \ \mathrm { c m ^ { 3 } / m i n } , \qquad u = { \frac { 6 6 0 0 } { 3 0 0 0 } } = 2 . 2 \ \mathrm { J / m m ^ { 3 } }
$$

**One hundred and eighty cubic centimetres a minute — a $2 0 \ \mathrm { m m }$ cube of steel every 2.7 seconds — for eight kilowatts at the motor.** Now the time bill: taking this cut along $2 0 0 \ \mathrm { m m }$ of the $6 0 \ \mathrm { m m }$ shaft takes $t _ { m } = 2 0 0 / ( 0 . 3 \times 1 0 6 1 ) = 0 . 6 3 \ \mathrm { m i n }$ ( $N = 1 0 0 0 \times 2 0 0 / ( \pi \times 6 0 ) = 1 { , } 0 6 1 \ \mathrm { r p m } )$ , so at £60 an hour the cutting costs 63p, the loading and unloading 30p, and the insert 12p. **Even here, where the cut is the biggest item, about 40 % of the £1.05 is not cutting at all; on a short, finished part with several set-ups the cut is often the minority of the cost** — which is why the fastest way to cut a machining cost is to change the parting line, the datum or the batch size, and the slowest is to buy a faster spindle.
:::

::: definition Milling, and the wave that makes it sing or scream {#def-mill}
Milling is turning with the cutting motion chopped into $z$ small arcs, and everything good and bad about it follows. **Climb (down) milling** has the tooth entering at the full chip thickness and the table feed carrying the work *with* the tool: the chip forms cleanly, the surface is better, the tool lasts longer, and the force pulls the work into the cut — which is dangerous on a manual machine with backlash and normal on a CNC with a preloaded ball-screw. **Up (conventional) milling** starts the tooth at zero thickness on a work-hardened surface, rubs, and pushes the work away from the cut; it is the only safe choice on an old hand mill and it is why hand-milled surfaces look worse than machine-milled ones.

The metal removal rate and the power are

$$
\mathrm { M R R } = a _ { e } \, a _ { p } \, v _ { f } \ [ \mathrm { m m ^ { 3 } / m i n } ] , \qquad v _ { f } = f _ { z } \, z \, N , \qquad P = { \frac { u \ \mathrm { M R R } } { 6 \times 1 0 ^ { 4 } \, \eta } } \ [ \mathrm { k W } ] , \qquad F _ { z } = k _ { c } \, a _ { p } \, f _ { z } \\ \text{with } u \text{ in } \mathrm { J / m m ^ { 3 } } , \; \eta \text{ the spindle efficiency, and } F _ { z } \text{ the tooth load that decides whether the cutter deflects}
$$

and the **tooth-passing frequency** $f _ { t p } = N z / 6 0$ is the number that decides whether the cut is quiet. Milling (like turning and boring) can be **unstable even with a sharp tool and a well-built machine**, because the tool and spindle always have some flexible vibration mode: each tooth leaves a wavy surface, the next tooth cuts that wave, and if the phase of the wave is right the variation in chip thickness feeds the vibration that made it. This is **regenerative chatter**, and it produces the stability lobe diagram: for each integer $k = 0 , 1 , 2 , \dots$ there is (approximately) a spindle speed

$$
N _ { k } \; \approx \; { \frac { 6 0 \, f _ { n } } { z \left( k + 1 \right) } }
$$

at which a whole number of vibration waves fits between successive teeth, so the wave left by one tooth is in phase with the vibration of the next, the chip thickness hardly varies, and the **stable depth of cut has a local peak** (in practice just above $N _ { k }$ ). For an end mill with a natural frequency $f _ { n } = 1 { , } 0 0 0 \ \mathrm { H z }$ and $z = 4$ the peaks sit near 15,000, 7,500, 5,000, 3,750 and $3 { , } 0 0 0 \ \mathrm { r p m }$ — and between them, at 6,000 rpm say, the stable depth may be only a small fraction of the depth possible on a peak. **The practical consequences are three: if a cut chatters, change the speed by 15-20 % rather than reducing the depth; a cutter with unequal tooth pitch (82°/88°/90°) smears the lobes and is worth buying for any deep slot; and a machine's "high-speed spindle" is not a marketing feature but a stability tool, because the highest and widest lobes lie at tooth-passing frequencies close to $f _ { n }$ , which for a stiff tool means a very high spindle speed.**

The rest of milling is a taxonomy of cutters: **face mills** (indexable, 60-160 mm, the flatness workhorses), **end mills** (solid carbide, 2-4 flutes for aluminium with high helix and polished flutes, 5-7 flutes for steel with variable pitch, 8-12 for finishing), **ball-nose** (the only decent way to cut a doubly-curved die, at a step-over that sets the scallop height), **shell end mills and modular boring heads** for large flat areas, **slot drills**, **form cutters**, and **trochoidal and adaptive-clearance toolpaths**, which keep the radial engagement small and constant (typically 5-15 % of the cutter diameter, with the full flute length in the cut) so that even hardened tool steel can be roughed without overloading a tooth.
:::

::: example Roughing a pocket: can the spindle do it? {#ex-mill level=3 check="8.9"}
A $2 0 0 \times 1 2 0 \ \mathrm { m m }$ pocket in a mild steel plate is roughed with an $8 0 \ \mathrm { m m }$ face mill, $z = 6$ , $n = 1 { , } 5 0 0 \ \mathrm { r p m }$ , $f _ { z } = 0 . 1 5 \ \mathrm { m m }$ , $a _ { p } = 3 \ \mathrm { m m }$ , width of cut $a _ { e } = 6 0 \ \mathrm { m m }$ , $k _ { c } = 2 { , } 2 0 0 \ \mathrm { N / m m ^ { 2 } }$ ( $u = 2 . 2 \ \mathrm { J / m m ^ { 3 } }$ ), spindle efficiency 0.85. (Enter the power at the cut in kW to one decimal place.)

$$
v _ { f } = 0 . 1 5 \times 6 \times 1 5 0 0 = 1 { , } 3 5 0 \ \mathrm { m m / m i n } , \qquad \mathrm { M R R } = 6 0 \times 3 \times 1 3 5 0 = 2 4 3 { , } 0 0 0 \ \mathrm { m m ^ { 3 } / m i n } = 4 { , } 0 5 0 \ \mathrm { m m ^ { 3 } / s }
$$
$$
P = { \frac { u \times \mathrm { M R R } } { 6 \times 1 0 ^ { 4 } } } = { \frac { 2 . 2 \times 2 4 3 { , } 0 0 0 } { 6 0 { , } 0 0 0 } } = { \bf 8 . 9 \ k W } \quad \text{at the cut } ( 1 0 . 5 \ \mathrm { k W } \text{ at the motor, } \eta = 0 . 8 5 ) , \qquad F _ { z } = 2 2 0 0 \times 3 \times 0 . 1 5 = 9 9 0 \ \mathrm { N }
$$

**Nine kilowatts, which looks comfortable on a "15 kW" machining centre — and the $2 0 0 \times 1 2 0 \times 3 0 \ \mathrm { m m }$ pocket, $7 2 0 \ \mathrm { c m ^ { 3 } }$ of steel, takes $7 2 0 { , } 0 0 0 / 2 4 3 { , } 0 0 0 = 3 . 0$ minutes of cutting.** The trap is the machine's **low-speed torque**: a spindle rated at 15 kW above a base speed of, say, $3 { , } 0 0 0 \ \mathrm { r p m }$ is torque-limited below it, so at $1 { , } 5 0 0 \ \mathrm { r p m }$ it delivers only $7 . 5 \ \mathrm { k W }$ — less than the $1 0 . 5 \ \mathrm { k W }$ this cut needs at the motor — and at $6 0 0 \ \mathrm { r p m }$ only $3 \ \mathrm { k W }$ . **Always ask for the torque-speed curve, never the peak power.**
:::

::: definition Drilling, and the worst two millimetres of cutting in industry {#def-drill}
A twist drill is two single-point tools joined by a **chisel edge** — and the chisel edge, whose cutting speed falls to zero at the drill axis and whose rake angle is strongly negative, hardly cuts at all. It **extrudes** metal outward, accounts for roughly half of the thrust force (but only a small part of the torque), lets the drill wander off-centre, and is the reason a drilled hole is $\pm 0 . 2 \ \mathrm { m m }$ out of position before anything else has gone wrong. Hence the whole vocabulary of drill-point geometry: **split point** (a 118° or 140° point ground with a cross-cut so the chisel edge shears instead of extrudes, halving the thrust), **indexable drills with replaceable tips** for bores above $2 0 \ \mathrm { m m }$ , **gun drilling** (a single-flute tube with internal coolant to the tip and chip evacuation up the outside, for holes a hundred or more diameters deep), **BTA and ejector drilling** (coolant in the annulus, chips back through the bore of the drill tube; the process for long, larger-diameter holes in shafts, rolls and tube sheets), and **peck drilling** on a CNC (retract every $0 . 5 { - } 2 \times$ diameter to break the chip, which costs 30 % of the cycle and is unavoidable in steel deeper than $3 \times$ diameter).

The drill's numbers: $v _ { f } = f N$ , and a $2 0 \ \mathrm { m m }$ drill in mild steel at $0 . 2 5 \ \mathrm { m m }$ per revolution wants a few kilonewtons of thrust and roughly $3 0 \ \mathrm { N \, m }$ of torque ( $M \approx k _ { c } f D ^ { 2 } / 8$ ), half of the thrust spent by the chisel edge, while the **machine time** $t _ { m } = ( L + \text{overrun} ) / ( f N )$ . Drilling is a low-power, high-thrust, chip-evacuation-limited process, and the failure modes are drill breakage (brittle, sudden, and expensive in a multi-spindle head), hole wander, and the work-hardened, smeared entry edge on stainless and titanium that ruins the reamer behind it.
:::

::: definition Grinding, and why anyone would spend ten times the energy {#def-grind}
Grinding is cutting by **thousands of randomly oriented, negative-rake, worn-as-they-cut abrasive grains**, each taking a chip of $0 . 1 { - } 1 \ \mu \mathrm { m }$ , at a wheel speed of $3 0 { - } 4 0 \ \mathrm { m / s }$ (high-speed grinding to $1 0 0 \ \mathrm { m / s } )$ . Its specific energy is $u _ { g } = 2 0 { - } 5 0 \ \mathrm { J / m m ^ { 3 } }$ on steel, **ten to twenty times turning**, and the reason is the size effect of §1 pushed to the limit: at a $0 . 5 \ \mu \mathrm { m }$ chip against a $1 0 { - } 5 0 \ \mu \mathrm { m }$ grain radius, most of the energy is ploughing and rubbing, and most of that energy becomes heat **in the workpiece**, because the chip is too small to carry it away.

$$
P = F _ { t } \, v _ { s } , \qquad u _ { g } = { \frac { P } { \mathrm { M R R } } } , \qquad G = { \frac { \text{volume of work removed} } { \text{volume of wheel worn} } }
$$

($G$ is of order 5-100 for vitrified aluminium-oxide wheels on steel and can reach thousands for CBN.) That heat is grinding's one great problem. When the **specific power** $P ^ { \prime } = P / b$ (power per mm of wheel contact width) exceeds a limit that depends on the work speed, depth of cut and contact length (Malkin's burn criterion) and, in practice, is found for each wheel and job by trial, the surface temperature rises to several hundred degrees and produces **burn**: a temper-coloured oxide, a re-austenitised and re-quenched layer, retained austenite, and — the expensive one — **grinding cracks** tens to hundreds of micrometres deep, typically running across the grinding direction, which are invisible until the part is in service. The defences are the wheel's own softness (a **soft grade**, a **open structure**, a **self-sharpening** bond), a **coolant** delivered at the right pressure and into the arc of contact, **creep-feed grinding** (a deep cut, $a _ { p }$ up to $1 0 \ \mathrm { m m }$ , at a very slow work speed, made possible by soft, open wheels and copious coolant forced into the long arc of contact), **CBN wheels at high speed** (which cut rather than plough), and **dressing** the wheel to expose fresh grit.

The wheel's code is a sentence: **abrasive** (A = aluminium oxide for steels, C = silicon carbide for cast iron and carbides, CBN for hardened steels, diamond for cemented carbide, ceramics and glass), **grit size** (46 coarse to 1200 lapping), **structure** (the spacing), **grade** (how hard the bond holds on), and **bond** (vitrified V, resin B, metal M, electroplated E). And grinding exists because it is the **only** way to machine a 65 HRC bearing race, a carbide tip, a ceramic substrate or a ground thread to $3 \ \mu \mathrm { m }$ and an $R _ { a }$ of $0 . 2 \ \mu \mathrm { m }$ — and because gentle grinding can leave a compressive residual stress that helps fatigue life, where abusive grinding leaves a tensile one that destroys it.
:::

::: example Grinding power and the burn limit {#ex-grind level=3 check="5.0"}
Surface grind a hardened tool steel: $v _ { s } = 3 5 \ \mathrm { m / s }$ , wheel width $b = 3 0 \ \mathrm { m m }$ , $a _ { p } = 0 . 0 2 \ \mathrm { m m }$ , work speed $v _ { w } = 2 0 \ \mathrm { m / m i n }$ , $u _ { g } = 2 5 \ \mathrm { J / m m ^ { 3 } }$ . Trials with this wheel have shown burn above $P ^ { \prime } = 0 . 5 \ \mathrm { k W / m m }$ . (Enter the grinding power in kW to one decimal place.)

$$
\mathrm { M R R } = 3 0 \times 0 . 0 2 \times { \frac { 2 0 { , } 0 0 0 } { 6 0 } } = 2 0 0 \ \mathrm { m m ^ { 3 } / s } , \qquad P = 2 5 \times 2 0 0 = 5 . 0 \ \mathrm { k W } , \qquad F _ { t } = { \frac { 5 0 0 0 } { 3 5 } } = 1 4 3 \ \mathrm { N }
$$
$$
P ^ { \prime } = { \frac { 5 . 0 } { 3 0 } } = 0 . 1 7 \ \mathrm { k W / m m } \qquad \text{(a third of the } 0 . 5 \ \mathrm { k W / m m } \text{ burn limit found in trials)}
$$

**Five kilowatts to remove $1 2 \ \mathrm { c m ^ { 3 } }$ of steel a minute — against the $1 8 0 \ \mathrm { c m ^ { 3 } / m i n }$ for $6 . 6 \ \mathrm { k W }$ of the turning example: $0 . 4 2$ against $0 . 0 3 7 \ \mathrm { k W }$ per cubic centimetre a minute, so grinding costs eleven times the energy per unit volume.** And the burn margin: at $0 . 1 7 \ \mathrm { k W / m m }$ this cut is safe, and it stays safe until the wheel **loads** (pores clog with chips), at which point rubbing replaces cutting and the tangential force — and with it the power and the heat — can rise severalfold within minutes. **This is why grinding is monitored by spindle power and by acoustic emission, and why a burn on a ground crankshaft is found by etching the part in nital and looking for the dark patches, not by a gauge.**
:::

::: widget plot
title: Ten times the energy: power against metal removal rate
f: 0.037*x; 0.417*x; 15
x: 0,40
y: 0,20
labels: turning steel, u = 2.2 J/mm³; grinding steel, u = 25 J/mm³; a 15 kW spindle
caption: Spindle power against metal removal rate for turning and grinding steel, from $P = u \times \mathrm { M R R }$ . The slopes are the specific energies: **turning costs $0 . 0 4 \ \mathrm { k W }$ per cubic centimetre a minute and grinding costs $0 . 4 2 \ \mathrm { k W }$ , and no amount of wheel technology closes that gap, because it is set by the chip thickness and the negative rake of an abrasive grain.** Read the consequences off the two lines: a grinding machine that removes $3 0 ~ \mathrm { c m ^ { 3 } / m i n }$ needs a 15 kW spindle and a coolant system that can carry away 15 kW of heat — which is most of the machine's cost — while a turning machine removing the same rate needs 1.1 kW. **This is why the industry's standing effort is to replace grinding with hard turning or hard milling wherever the geometry allows, and why it never quite succeeds: the ground surface has the tolerance, the $R _ { a }$ , the residual stress and the ability to cut 65 HRC, and none of those are free.**
:::

## 4. What machining leaves behind

::: definition Feed marks, the finish ladder, and the tolerance ladder {#def-finish}
The theoretical roughness of a turned surface is set by the tool's geometry, not by the machine's accuracy: with a feed $f$ and a nose radius $r _ { \varepsilon }$ , the peak-to-valley height of the feed marks is

$$
R _ { \max } \; = \; { \frac { f ^ { 2 } } { 8 \, r _ { \varepsilon } } } \qquad \Longrightarrow \qquad R _ { a } \approx { \frac { R _ { \max } } { 4 } } \approx { \frac { f ^ { 2 } } { 3 2 \, r _ { \varepsilon } } }
$$

and this is the only formula in manufacturing that a designer reads and then ignores at his cost. **A $0 . 2 \ \mathrm { m m }$ feed and a $0 . 8 \ \mathrm { m m }$ nose radius give $6 . 3 \ \mu \mathrm { m }$ peak-to-valley, about $R _ { a } \ 1 . 6$ ; halving the feed to 0.1 gives $R _ { a } \ 0 . 4$ , which is the finish most drawings ask for and which is why the machinist's first move on a finish pass is a smaller feed, not a better machine.** Below $R _ { a } \ 0 . 2$ the feed-mark formula stops applying because the surface is made by rubbing, built-up edge, vibration and the machine's guideways, and the process has to change: burnishing, honing, lapping, polishing.

$$
\begin{array} { l c c l c }
\textbf{Process} & \text{Tolerance (typ.)} & R _ { a } \ [ \mu \mathrm { m } ] & \textbf{Process} & \text{Tolerance} & R _ { a } \ [ \mu \mathrm { m } ] \\ \hline
\text{Flame/plasma cut} & \pm 1 { - } 3 \ \mathrm { m m } & 2 5 & \text{Reamed bore} & \pm 0 . 0 1 { - } 0 . 0 5 & 1 . 6 \\
\text{Sand cast} & \pm 1 { - } 3 & 1 2 { - } 2 5 & \text{Bored} & \pm 0 . 0 1 { - } 0 . 0 5 & 0 . 8 { - } 3 . 2 \\
\text{Hot forged} & \pm 0 . 3 { - } 1 & 6 { - } 1 2 & \text{Turned, fine} & \pm 0 . 0 1 { - } 0 . 0 3 & 0 . 4 { - } 1 . 6 \\
\text{Rolled / extruded} & \pm 0 . 1 { - } 0 . 5 & 1 . 6 { - } 6 & \text{Milled, fine} & \pm 0 . 0 2 { - } 0 . 0 5 & 0 . 8 { - } 1 . 6 \\
\text{Drilled} & \pm 0 . 1 { - } 0 . 5 & 3 . 2 { - } 1 2 & \text{Ground} & \pm 0 . 0 0 2 { - } 0 . 0 1 & 0 . 2 { - } 0 . 8 \\
\text{Milled / turned, rough} & \pm 0 . 0 5 { - } 0 . 2 & 3 . 2 { - } 1 2 & \text{Honed} & \pm 0 . 0 0 2 { - } 0 . 0 0 5 & 0 . 0 5 { - } 0 . 4 \\
\text{Drilled + reamed} & \pm 0 . 0 2 { - } 0 . 0 5 & 1 . 6 { - } 3 . 2 & \text{Lapped} & \pm 0 . 0 0 0 5 { - } 0 . 0 0 2 & 0 . 0 1 { - } 0 . 1
\end{array}
$$

**Read the two ladders together and one sentence comes out: tolerance and roughness are bought with the same currency, and the exchange rate is brutal below $\pm 0 . 0 1 \ \mathrm { m m }$ and $R _ { a } \ 0 . 4 .$ ** The other thing the ladder says is that **a process is a sequence, not a choice**: a bore is drilled, then bored, then reamed, then honed, and each step exists to correct the previous one's error and to leave a stock the next one can cut. A designer who specifies a $\pm 0 . 0 1 \ \mathrm { m m }$ , $R _ { a } \ 0 . 4$ bore on a $4 0 \ \mathrm { m m }$ thick flange has specified four machines and a fixture that can present the part to all four on the same datum — and the fixture is more expensive than the cutting.
:::

::: example Choosing the feed {#ex-finish level=3 check="0.18"}
A turned bore must hold $R _ { \max } \leq 3 . 2 \ \mu \mathrm { m }$ with a $1 . 2 \ \mathrm { m m }$ nose radius. What feed, and what does it cost in time? (Enter the feed in mm/rev to two decimal places.)

$$
f \; = \; { \sqrt { 8 \, r _ { \varepsilon } \, R _ { \max } } } \; = \; { \sqrt { 8 \times 1 . 2 \times 0 . 0 0 3 2 } } \; = \; { \sqrt { 0 . 0 3 0 7 } } \; = \; { \bf 0 . 1 8 \ m m / r e v }
$$

**Against the $0 . 3 5 \ \mathrm { m m }$ the same tool would run for a roughing pass, so the finish pass takes 1.9 times as long for the same area** — and note that the *other* way to buy the finish is a larger nose radius, which is free in time but costs a chatter risk, because a larger radius raises the radial force on a slender bar. **On a production job the usual answer is a wiper insert, whose short flat land behind the nose smooths the feed marks and lets it run at roughly twice the feed of a conventional insert for the same finish.**
:::

::: widget plot
title: The feed-mark formula, plotted — what a feed costs in surface
f: 156*x*x; 78*x*x; 3.2
x: 0.05,0.5
y: 0,40
labels: r = 0.8 mm; r = 1.6 mm; the 3.2 µm a drawing calls "smooth"
caption: Theoretical peak-to-valley roughness against feed for two nose radii, from $R _ { \max } = f ^ { 2 } / 8 r _ { \varepsilon }$ . **The curve is a parabola, so halving the feed quarters the roughness — which is why the finish pass is cheap in tooling and expensive in time, and why the nose radius is the free parameter.** Read the two numbers every turner knows: at $f = 0 . 2 \ \mathrm { m m }$ with a $0 . 8 \ \mathrm { m m }$ radius you get $6 . 3 \ \mu \mathrm { m }$ peak-to-valley, about $R _ { a } \ 1 . 6$ , which is a general-purpose machined surface; and to reach $R _ { a } \ 0 . 4$ you must either feed at $0 . 1 \ \mathrm { m m }$ or fit a $1 . 6 \ \mathrm { m m }$ radius and feed at $0 . 1 4$ . **Below about $R _ { a } \ 0 . 2$ this formula stops describing reality, because the surface is then made by rubbing, built-up edge and the guideways rather than by the tool's geometry — and the process has to change, not the feed.**
:::

## 5. When the chip is the wrong tool

::: definition The non-traditional processes, and why they exist {#def-nconv}
Every one of these exists because of one of three sentences: **"the material is harder than any tool"**, **"the shape has no tool-entry"**, or **"the force would deflect the part"**.

$$
\begin{array} { l l l l l l }
\textbf{Process} & \textbf{Mechanism} & \textbf{Material limit} & \textbf{Tolerance} & R _ { a } \ [\mu\mathrm { m } ] & \textbf{MRR} \\ \hline
\text{EDM (sinking)} & \text{thousands of sparks melt and eject} & \text{any conductor} & \pm 0 . 0 0 5 \ \mathrm { m m } & 0 . 2 { - } 1 . 5 & 5 { - } 5 0 0 \ \mathrm { m m ^ { 3 } / m i n } \\
\text{Wire EDM} & \text{travelled } 0 . 1 { - } 0 . 4 \ \mathrm { m m } \text{ brass wire} & \text{any conductor} & \pm 0 . 0 0 2 \ \mathrm { m m } & 0 . 1 { - } 0 . 4 & \text{kerf } 0 . 2 5 \ \mathrm { m m } \\
\text{ECM} & \text{anodic dissolution} & \text{any conductor} & \pm 0 . 0 5 \ \mathrm { m m } & 0 . 4 { - } 1 . 6 & 1 0 0 { - } 5 { , } 0 0 0 \ \mathrm { m m ^ { 3 } / m i n } \\
\text{Laser cutting} & \text{melt/blow with } \mathrm { N } _ { 2 } \text{ or } \mathrm { O } _ { 2 } & \text{almost anything} & \pm 0 . 0 5 \ \mathrm { m m } & 6 { - } 2 5 & \text{sheet-limited} \\
\text{Waterjet / abrasive jet} & \text{erosion at } 3 0 0 { - } 4 0 0 \ \mathrm { M P a } & \text{anything} & \pm 0 . 1 \ \mathrm { m m } & 3 { - } 1 2 & \text{slow, cold} \\
\text{Electron beam} & \text{vacuum, } 6 0 { - } 1 5 0 \ \mathrm { k V } \text{ electrons} & \text{almost anything} & \pm 0 . 0 5 & 3 & \text{deep, narrow} \\
\text{Chemical milling} & \text{etched through a mask} & \text{sheet, chemically} & \pm 0 . 0 5 \ \mathrm { m m } & 1 . 6 { - } 3 . 2 & \text{no force at all} \\
\text{Ultrasonic} & \text{slurry, } 2 0 \ \mathrm { k H z } \text{ tool} & \text{glass, ceramic, stone} & \pm 0 . 0 2 & 0 . 4 & \text{very slow}
\end{array}
$$

**EDM** is the one every engineer must understand, because it is the process that makes dies. An electrode (graphite, or copper, or copper-tungsten) is fed towards the workpiece in a dielectric flush of deionised water or oil; when the gap falls to $1 0 { - } 5 0 \ \mu \mathrm { m }$ the field breaks the dielectric down, a channel forms, the plasma reaches $1 0 { , } 0 0 0 \ \mathrm { K }$ , and a crater of molten metal is blasted away; the dielectric flushes the debris and recovers its insulation before the next pulse of $0 . 5 { - } 3 0 0 \ \mu \mathrm { s }$ at $5 { - } 1 0 0 \ \mathrm { A }$ . **Nothing touches anything, so the hardness of the workpiece is irrelevant — a 65 HRC die cavity is machined as easily as mild steel — and the electrode wears at 0.5-5 % of the removed volume, which is why the electrode is designed, machined and paid for as a tool.** The costs are a **recast layer** of re-solidified, microcracked metal $1 { - } 1 0 \ \mu \mathrm { m }$ deep that must be removed for a fatigue-critical part, a **heat-affected zone**, a **taper** on the wire (from the wire's bow in the flush, corrected by tilting the head), and a **surface that is a pockmark field** whose $R _ { a }$ improves as the pulse energy falls and the metal removal rate falls with it. **Wire EDM** in particular has become a primary production process rather than a die-shop one: turbine blade platforms, stator laminations, surgical instruments, and any flat-through part in a superalloy that would destroy a punch.
:::

::: example A 40 mm cavity in hardened tool steel {#ex-edm level=3 check="16.0"}
A $1 2 0 \times 8 0 \times 4 0 \ \mathrm { m m }$ deep cavity with a $5 \ \mathrm { m m }$ internal corner radius is needed in $1 . 2 3 4 4$ tool steel at $6 0 \ \mathrm { H R C }$ , for a die that will make 30 pieces. Compare hard milling with sinking EDM. (Enter the hard-milling roughing time in hours to one decimal place.)

**Milling** has a problem with both the hardness and the corner: hard-milling a $6 0 \ \mathrm { H R C }$ steel with a $1 0 \ \mathrm { m m }$ cutter at $a _ { p } = 0 . 2 \ \mathrm { m m }$ , $a _ { e } = 5 \ \mathrm { m m }$ and $v _ { f } = 4 0 0 \ \mathrm { m m / m i n }$ removes $0 . 2 \times 5 \times 4 0 0 = 4 0 0 \ \mathrm { m m ^ { 3 } / m i n }$ , so the $1 2 0 \times 8 0 \times 4 0 = 3 8 4 { , } 0 0 0 \ \mathrm { m m ^ { 3 } }$ of cavity is $9 6 0 \ \mathrm { m i n } = { \bf 1 6 . 0 \ h }$ of a £150/hour five-axis machine before any finishing; and the $5 \ \mathrm { m m }$ corner radius forces a cutter of $1 0 \ \mathrm { m m }$ diameter or less to reach $4 0 \ \mathrm { m m }$ deep — a $4 \times$ -diameter overhang that chatters in hardened steel. **Sinking EDM** with a machined graphite electrode removes of the order of $4 0 0 \ \mathrm { m m ^ { 3 } / m i n }$ on roughing settings at this size, so the cavity takes about $1 6 \ \mathrm { h }$ of roughing and $3 \ \mathrm { h }$ of finish sparking on a £80/hour machine that runs unattended **with no corner-radius problem at all** — the electrode simply has the corner — plus $5 \ \mathrm { h }$ of making the electrode. **Wire EDM** cannot make a blind cavity, but it will cut the through-profiles in the same die, rough and finish, in about two hours at $\pm 0 . 0 0 3 \ \mathrm { m m }$ .

$$
\text{EDM route: } \; 1 9 \ \mathrm { h } \times \pounds 8 0 + 5 \ \mathrm { h } \times \pounds 6 0 + \pounds 1 4 0 \ \text{graphite} = \pounds 1 { , } 9 6 0 \qquad \text{vs hard-milling: } \; 1 8 \ \mathrm { h } \times \pounds 1 5 0 + \pounds 4 0 0 \ \text{tooling} = \pounds 3 { , } 1 0 0
$$

**and the EDM die is better into the bargain, because it has no tool marks in the corner, no chatter, and a surface the mould polisher will take to a mirror in an hour instead of a day.** **The 30 pieces are irrelevant — this is a die, not a product — and that is the point: EDM's economics are set by the hardness of the material and the difficulty of the shape, and not at all by the quantity.** (In practice a toolmaker would also rough the cavity in the soft, annealed steel before hardening and leave only a few tenths of a millimetre for EDM or hard milling, which cuts both routes' times several-fold.)
:::

## 6. What machining is for

::: definition Machining in the process map {#def-econ}
Machining's four capabilities and their four costs, side by side:

$$
\begin{array} { l l }
\textbf{Capability} & \textbf{Cost} \\ \hline
\text{Any geometry a tool can reach, including undercuts and internal cavities} & \text{Buy-to-fly 2-10: the swarf is paid for at mill prices} \\
\text{Any material, including the ones no other process can cut} & 0 . 4 { - } 5 0 \ \mathrm { J / m m ^ { 3 } } \text{ of removed material, mostly as heat} \\
\text{Tolerance to } \pm 1 \ \mu \mathrm { m } \text{ and } R _ { a } \ 0 . 0 1 \ \mu \mathrm { m } \text{ (lapped, in a controlled room)} & \text{Tooling near zero, but fixturing and metrology are not} \\
\text{No part-specific tooling: a drawing on Monday, a part on Tuesday} & \text{The surface is a sheared, work-hardened, thermally altered skin}
\end{array}
$$

The **cost of a machined part** is

$$
c \; = \; \underbrace { m _ { 0 } ( 1 + s ) } _ { \text{stock, with scrap} } \; + \; \underbrace { M _ { w } \, t _ { m } } _ { \text{machine time} } \; + \; \underbrace { M _ { w } \, t _ { \text{setup} } / N } _ { \text{setup, amortised} } \; + \; \underbrace { C _ { t } \, t _ { m } / T _ { \text{tool}} } _ { \text{tooling} } \; + \; \underbrace { C _ { \text{fluid}} + C _ { \text{swarf}} } _ { \text{consumables} } \; + \; \underbrace { C _ { \text{inspect}} } _ { \text{quality} }
$$

and its structure is the reason the industry behaves as it does: **machine time dominates, machine time is nearly proportional to the volume removed divided by the MRR, and the volume removed is a decision the designer made.** The three levers, in order of leverage, are (1) buy or form a net-shape blank so there is less to remove, (2) put all the features on one set-up so the part is machined in one machine-time rather than three, and (3) then, and only then, optimise the cutting. **A faster spindle shortens only the cutting part of the machine time; a near-net-shape blank removes the cutting altogether.**

The last word is the one this whole lesson has been building to. **Machining is the process you use when the tolerance, the material, the geometry or the quantity has excluded everything else.** It is the most flexible, most accurate, most universally applicable and most wasteful way of making a metal part, and a design that uses it as the default is a design that has not asked what the other seven processes can do.
:::

## Exercises

::: exercise Shear plane and friction {#ex-shearplane level=2 check="23.1"}
In an orthogonal cut the chip thickness ratio is $r = 0 . 4 0$ and the rake angle $\alpha = 1 2 ^ { \circ }$ . Find the shear-plane angle. (Enter degrees to one decimal place.)
::: solution
$\tan \phi = 0 . 4 0 \cos 1 2 ^ { \circ } / ( 1 - 0 . 4 0 \sin 1 2 ^ { \circ } ) = 0 . 3 9 1 / 0 . 9 1 7 = 0 . 4 2 7$ , $\phi = { \bf 2 3 . 1 ^ { \circ } }$ . **Merchant would predict $\beta = 9 0 + 1 2 - 4 6 . 2 = 5 5 . 8 ^ { \circ }$ , i.e. $\mu = 1 . 5$ , which is far above any measured friction coefficient — the well-known weakness of the energy-minimisation argument, and the reason production calculations use measured $\phi$ and $\mu$ rather than predicted ones.**
:::
:::

::: exercise Tool life at a new speed {#ex-tl level=2 check="5.5"}
A carbide grade has $n = 0 . 3 0$ and $C = 3 0 0 \ \mathrm { m / m i n }$ . What tool life at $V = 1 8 0 \ \mathrm { m / m i n } \mathrm { ? }$ (Enter minutes to one decimal place.)
::: solution
$T = ( 3 0 0 / 1 8 0 ) ^ { 1 / 0 . 3 } = 1 . 6 6 7 ^ { 3 . 3 3 } = { \bf 5 . 5 \ m i n }$ . **At $1 5 0 \ \mathrm { m / m i n }$ the same tool gives $( 2 ) ^ { 3 . 3 3 } = 1 0 . 1 \ \mathrm { m i n }$ — a one-sixth speed reduction nearly doubles the life, which is the single most useful number in this lesson and the reason a shop with a tooling problem should slow down before it changes tools.**
:::
:::

::: exercise The rate-optimal speed {#ex-rateopt level=3 check="190"}
For the grade of the previous question, with a tool change time of $2 \ \mathrm { m i n }$ , find the optimum tool life and speed for maximum production rate. (Enter the speed in m/min to the nearest 10.)
::: solution
$T _ { \text{opt } } = t _ { i } ( 1 / n - 1 ) = 2 \times ( 3 . 3 3 - 1 ) = 4 . 6 7 \ \mathrm { m i n }$ , $V = 3 0 0 / 4 . 6 7 ^ { 0 . 3 } = 3 0 0 / 1 . 5 9 = { \bf 1 9 0 \ m / m i n }$ . **Note that the optimum tool life is 2.3 times the tool change time and not, as intuition says, "as long as possible"; and that if the tool change were done in $3 0 \ \mathrm { s }$ by a turret and a preset tool, the optimum tool life would fall to $1 . 1 7 \ \mathrm { m i n }$ and the optimum speed would rise to about $2 9 0 \ \mathrm { m / m i n }$ — which is one of the real reasons automatic tool changers pay for themselves.**
:::
:::

::: exercise Turning force and power {#ex-turnpower level=2 check="10.6"}
Turn with $a _ { p } = 4 \ \mathrm { m m }$ , $f = 0 . 4 \ \mathrm { m m / r e v }$ , $V = 1 8 0 \ \mathrm { m / m i n }$ , $k _ { c } = 2 { , } 2 0 0 \ \mathrm { N / m m ^ { 2 } }$ . Find the cutting power at the cut. (Enter kW to one decimal place.)
::: solution
$F _ { c } = 2 2 0 0 \times 4 \times 0 . 4 = 3 5 2 0 \ \mathrm { N }$ , $P = 3 5 2 0 \times 1 8 0 / 6 0 { , } 0 0 0 = { \bf 1 0 . 6 \ k W }$ , at an MRR of $2 8 8 \ \mathrm { c m ^ { 3 } / m i n }$ ( $u = 2 . 2 \ \mathrm { J / m m ^ { 3 } } )$ . **Ten kilowatts and a $3 . 5 \ \mathrm { k N }$ cutting force: check that the workholding can take it, because a thin-walled bush gripped hard enough in a three-jaw chuck to resist that force is squeezed out of round and springs back lobed when released.**
:::
:::

::: exercise Pocketing: MRR and power {#ex-pocket level=2 check="9.0"}
Face-mill with $z = 8$ at $8 0 0 \ \mathrm { r p m }$ , $f _ { z } = 0 . 1 2 \ \mathrm { m m }$ , $a _ { e } = 8 0 \ \mathrm { m m }$ , $a _ { p } = 4 \ \mathrm { m m }$ , $u = 2 . 2 \ \mathrm { J / m m ^ { 3 } }$ . Find the power at the cut. (Enter kW to one decimal place.)
::: solution
$v _ { f } = 0 . 1 2 \times 8 \times 8 0 0 = 7 6 8 \ \mathrm { m m / m i n }$ , $\mathrm { M R R } = 8 0 \times 4 \times 7 6 8 = 2 4 6 { , } 0 0 0 \ \mathrm { m m ^ { 3 } / m i n } = 4 { , } 1 0 0 \ \mathrm { m m ^ { 3 } / s }$ , $P = 2 . 2 \times 4 1 0 0 / 1 0 0 0 = { \bf 9 . 0 \ k W }$ . **The tooth load is $F _ { z } = k _ { c } a _ { p } f _ { z } = 2 2 0 0 \times 4 \times 0 . 1 2 = 1 { , } 0 6 0 \ \mathrm { N }$ per tooth, which is fine for the insert; multiplied by the number of teeth in contact at once, it is the load the spindle, the arbor and the fixture must carry without deflecting.**
:::
:::

::: exercise Feed for a finish {#ex-feedfin level=2 check="0.14"}
What feed gives $R _ { a } \leq 0 . 8 \ \mu \mathrm { m }$ (i.e. $R _ { \max } \approx 3 . 2 \ \mu \mathrm { m } )$ with a $0 . 8 \ \mathrm { m m }$ nose radius? (Enter mm/rev to two decimal places.)
::: solution
$f = \sqrt { 8 \times 0 . 8 \times 0 . 0 0 3 2 } = \sqrt { 0 . 0 2 0 5 } = { \bf 0 . 1 4 \ m m / r e v }$ . **With a $1 . 6 \ \mathrm { m m }$ radius the same finish allows $f = 0 . 2 0$ , so doubling the nose radius buys 1.4 times the feed and a better-looking surface at the same time — until the extra radial force starts to chatter a slender bar, which is the trade every finish turner makes.**
:::
:::

::: exercise Drilling time {#ex-drilltime level=2 check="42"}
Sixty $2 5 \ \mathrm { m m }$ holes, $4 0 \ \mathrm { m m }$ deep, are drilled in a flange at $3 5 0 \ \mathrm { r p m }$ and $0 . 2 \ \mathrm { m m }$ per revolution, with $8 \ \mathrm { s }$ per hole for approach, peck and retract. Find the total drilling time. (Enter minutes to the nearest minute.)
::: solution
$t = 4 0 / ( 0 . 2 \times 3 5 0 ) = 0 . 5 7 1 \ \mathrm { m i n } = 3 4 . 3 \ \mathrm { s }$ , plus $8 \ \mathrm { s }$ gives $4 2 . 3 \ \mathrm { s }$ per hole and $6 0 \times 4 2 . 3 / 6 0 = { \bf 4 2 \ m i n }$ . **Of that, 8 minutes is non-cutting — and the way to buy it back is not more speed (the drill's $0 . 2 \ \mathrm { m m }$ feed is set by chip evacuation in steel at $1 . 6 \times$ diameter) but a gun-drill or an indexable tip that will run $0 . 4 \ \mathrm { m m }$ per rev, or a core hole cast or drilled in the pattern so the hole is half-made already.**
:::
:::

::: exercise Derive the shear-plane angle relation {#ex-deriveshear level=4 check="29.0"}
From $t _ { 1 } = l _ { c } \sin \phi$ and $t _ { 2 } = l _ { c } \cos ( \phi - \alpha )$ , derive $\tan \phi = r \cos \alpha / ( 1 - r \sin \alpha )$ and evaluate it for $r = 0 . 5$ , $\alpha = 1 5 ^ { \circ }$ . (Enter degrees to one decimal place.)
::: solution
$r = \sin \phi / \cos ( \phi - \alpha ) = \sin \phi / ( \cos \phi \cos \alpha + \sin \phi \sin \alpha )$ . Inverting and dividing by $\cos \phi$ :
$$
{ \frac { 1 } { r } } \; = \; { \frac { \cos \phi \cos \alpha + \sin \phi \sin \alpha } { \sin \phi } } \; = \; \cos \alpha \cot \phi + \sin \alpha \qquad \Longrightarrow \qquad \tan \phi = { \frac { r \cos \alpha } { 1 - r \sin \alpha } } = { \frac { 0 . 4 8 3 } { 0 . 8 7 1 } } = 0 . 5 5 5
$$
so $\phi = { \bf 2 9 . 0 ^ { \circ } }$ . **Note the two limits: at $\alpha = 0$ , $\phi = \arctan r$ ; and as $\alpha$ rises toward $\phi$ the shear plane rotates and the strain falls — which is the whole reason a positive rake cuts easier, until the edge becomes too weak to survive the cut.**
:::
:::

::: exercise Derive the cost-optimal tool life {#ex-derivecost level=4 check="24"}
For minimum cost per piece rather than maximum rate, the tool change time $t _ { i }$ in $T _ { \text{opt } } = t _ { i } ( 1 / n - 1 )$ is replaced by $t _ { i } + C _ { t } / M$ , where $C _ { t }$ is the cost per tool edge and $M$ the machine rate per minute. Find the cost-optimal tool life for $n = 0 . 2 5$ , $t _ { i } = 2 \ \mathrm { m i n }$ , $C _ { t } = \pounds 6$ , $M = \pounds 1 / \mathrm { m i n }$ . Show where the replacement comes from. (Enter the tool life in minutes.)
::: solution
The cost per part is $M ( A / V + t _ { c } ) + ( M t _ { i } + C _ { t } ) ( A / V ) / T$ : each tool change costs the machine time lost plus the edge itself, so dividing by $M$ the change "costs" $t _ { i } + C _ { t } / M$ minutes, and the derivation of the rate optimum goes through unchanged with that time. Here $t _ { \text{eq } } = 2 + 6 / 1 = 8 \ \mathrm { m i n }$ , so $T _ { \text{opt } } = 8 \times 3 = { \bf 2 4 \ m i n }$ . **Four times the rate-optimal tool life of 6 min: when tooling is expensive relative to machine time, the machine waits for tools far less than the accountant waits for the tool bill. The two optima bracket every real shop's operating point, and a shop that cannot say which end of the bracket it is running at is running by habit.**
:::
:::

::: quiz Why is climb milling preferred on a CNC? {#quiz-climb}
- [ ] Because it produces longer chips
- [x] Because the chip forms without rubbing, so the surface, the tool life and the work hardening all improve
- [ ] Because it needs less spindle power
- [ ] Because it is safer if the work breaks loose
::: solution
**In up-milling the tooth enters at zero thickness, rubs until it bites, and this rubs a work-hardened skin, burns the flank and leaves a worse surface.** **Climb milling starts at full thickness; the force also pushes the work down onto the table instead of lifting it. The power is essentially the same and the safety is worse — climb milling will pull the table and the work through the cut if the lead screw has backlash, which is exactly why manual machines up-mill and CNCs, with preloaded ballscrews and clamped tables, climb-mill.**
:::
:::

::: quiz A ground part shows temper colours and fails magnetic-particle inspection. What happened? {#quiz-burn}
- [ ] The wheel was too soft
- [ ] The coolant concentration was too high
- [x] The power per unit width exceeded the burn threshold, and the surface re-hardened and cracked
- [ ] The work speed was too low, which cools the arc
::: solution
**Burn is a thermal failure: the power number $P ^ { \prime } = P / b ^ { \prime }$ rose above the wheel's threshold — because the wheel loaded, the dressing was missed, or the feed was pushed — and the surface reached the austenitising range and was quenched by the coolant into brittle, crack-prone untempered martensite, with grinding cracks under it.** **A softer wheel, a more open structure, a sharper dressing, a nozzle into the arc of contact, or a lower feed all reduce it; a lower work speed makes it worse, not better, because it lengthens the contact time per unit area.**
:::
:::

## Where this lesson leads

- **[[manufacturing/bulk-forming|Bulk deformation]] and [[manufacturing/sheet-metal-forming|sheet-metal forming]]** are what a part should have been before it became a machined one, and their flow stress is what the cutting edge shears.
- **[[manufacturing/joining|Joining]]** covers the weld preparations and the machined faying surfaces that machining exists to make.
- **[[manufacturing/metrology-quality|Metrology, quality and automation]]** is the other half of the tolerance ladder: a $\pm 2 \ \mu \mathrm { m }$ part is a measurement problem before it is a cutting problem.
- **[[manufacturing/additive-manufacturing|Additive manufacturing]]** inverts the material-removal logic entirely, and its economics cross machining's at the point where buy-to-fly dominates.
- **[[manufacturing/process-selection|Process selection]]** is where the cost structure of §6 becomes a screening exercise.
- **[[materials-science/mechanical-properties|Mechanical properties]]** supplies the hardness, work-hardening and elevated-temperature behaviour that decide whether a material is easy or impossible to cut, and **[[materials-science/phase-transformations|phase transformations]]** the grinding burn and the weld HAZ.
- **[[solid-mechanics/fracture-mechanics|Fracture and fracture mechanics]]** explains why the machined skin, the recast layer and the grinding crack are not surface-finish details.

::: history
**c. 1800.** **Henry Maudslay** (1771–1831), who had trained under Joseph Bramah, builds in London a screw-cutting lathe with a rigid iron frame, a slide rest and a master leadscrew, so that a lathe could cut an accurate screw and that screw could make the next lathe more accurate; his workshop also used true surface plates, and his bench micrometer of the early 1800s (the "Lord Chancellor") could resolve about a ten-thousandth of an inch. **1841.** **Joseph Whitworth**, a former Maudslay workman, proposes a standard screw thread with a $5 5 ^ { \circ }$ flank angle — the British Standard Whitworth form — and later promotes standard gauges and measurement to a fraction of a thousandth of an inch. **1868.** **Robert Mushet's** self-hardening tungsten tool steel ("R. Mushet's Special Steel") hardens in air and allows higher cutting speeds than carbon tool steel. **1898–1907.** **F. W. Taylor**, with **Maunsel White** at Bethlehem Steel, finds that heat-treating tungsten–chromium tool steel at temperatures close to melting produces **high-speed steel**, shown at the Paris Exposition of 1900; by about 1910 the standard 18 % W, 4 % Cr, 1 % V grade (T1) had emerged. Taylor's ASME presidential paper *On the Art of Cutting Metals* (presented 1906, published in the *Transactions of the ASME*, vol. 28, 1907) summarised some twenty-six years of cutting experiments begun at Midvale Steel, and from it comes the tool-life law $V T ^ { n } = C$ . **1923–1927.** **Karl Schröter** at Osram in Berlin patents cobalt-bonded **cemented tungsten carbide** (1923); Krupp licenses it and markets it as **Widia** ("wie Diamant") from 1926–27, and cutting speeds rise several-fold again. **1941–1945.** **Hans Ernst and M. Eugene Merchant** at Cincinnati Milling Machine publish the shear-plane model of chip formation (1941), and Merchant's papers in the *Journal of Applied Physics* (1945) give the force circle and the shear-angle relation of §1. **1943.** **Boris and Natalya Lazarenko** in the Soviet Union turn the erosive effect of electric sparks into a controlled machining method, the origin of **EDM**; Agie in Switzerland introduces a numerically controlled **wire EDM** machine in 1969. **1952.** Following **John T. Parsons's** idea of driving a machine from computed coordinates (first used for helicopter rotor-blade templates), the **MIT Servomechanisms Laboratory** demonstrates the first **numerically controlled milling machine**. **1958.** **Kearney & Trecker's** Milwaukee-Matic, with an automatic tool changer, is generally regarded as the first **machining centre**. **Late 1960s–1990s.** **Coated carbide inserts**: CVD TiC coatings from the late 1960s, then Al₂O₃ multilayers, PVD TiN in the 1980s and TiAlN around 1990 — each allowing higher speeds than the uncoated grade. **1990s–2000s.** **High-speed machining** with balanced spindles and toolholders, **dry and MQL machining**, and **hard turning and hard milling** with CBN and ceramic tools take over some finishing work that had previously been ground.
:::

::: summary
**A chip is a shear plane, not a cut.** Metal shears along a plane at $2 0 { - } 3 5 ^ { \circ }$ ; $\tan \phi = r \cos \alpha / ( 1 - r \sin \alpha )$ ; the shear stress there is above the slow-test shear strength because the strain is of order $200 \ \ \%$ and the rate $1 0 ^ { 3 } { - } 1 0 ^ { 6 } \ \mathrm { s ^ { - 1 } }$ ; and the chip form — ribbon, built-up edge, powder, serrated — is a diagnosis of the material, the speed and the temperature.
**Power is specific energy times removal rate.** Steel costs $2 { - } 3 . 5 \ \mathrm { J / m m ^ { 3 } }$ , aluminium $0 . 4 { - } 0 . 7$ , cast iron 2.5, and grinding 20-50 — ten times turning, because a $0 . 5 \ \mu \mathrm { m }$ chip against a $2 0 \ \mu \mathrm { m }$ grain radius is ploughing, not cutting. Below the minimum chip thickness nothing is cut at all.
**Tool life is $V T ^ { n } = C$ and the exponent is the material's biography.** Doubling the speed costs $2 ^ { 1 / n }$ in life: sixteen times for carbide, three for ceramic. The optimum is $T = t _ { i } ( 1 / n - 1 )$ for rate and a longer one for cost — a hard tool with a high $n$ should be run to a short life, which surprises everyone except the arithmetic.
**Tool materials are a trade of hardness against toughness, and coatings are a way of having both.** HSS at $6 0 0 \ \mathrm { ^ { \circ } C }$ , carbide at $9 0 0 \ \mathrm { ^ \circ C }$ , ceramic at $1 2 0 0 \ \mathrm { ^ { \circ } C }$ , CBN at $1 4 0 0 \ \mathrm { ^ { \circ } C }$ ; a few micrometres of TiN, TiAlN or alumina coating buys a substantial increase in speed, and diamond must not be used on steel.
**Milling's limit is chatter, and chatter is a phase problem.** $f _ { t p } = N z / 6 0$ against the tool's natural frequency, stability lobes near $N _ { k } \approx 6 0 f _ { n } / z ( k + 1 )$ , and three cures: move the speed 15-20 %, unequal pitch, more static rigidity. Never "go slower" within a lobe.
**Roughness and tolerance are one ladder.** $R _ { \max } = f ^ { 2 } / 8 r _ { \varepsilon }$ sets the finish you can get from a feed and a nose radius; below $\pm 0 . 0 1 \ \mathrm { m m }$ and $R _ { a } \ 0 . 4$ the process must change to grinding, honing or lapping, each step adding time and cost.
**Machining is the flexible, accurate, universal, wasteful last resort.** Its cost is dominated by machine time, its machine time by the volume removed, and the volume removed is decided by the designer, not the machinist. Buy a net-shape blank before you buy a faster spindle.
:::

## Further reading

- M. C. Shaw, *Metal Cutting Principles*, 2nd ed., Oxford University Press, 2005 — the mechanics of §1 with a candour about what is not understood that few textbooks attempt.
- E. M. Trent and P. K. Wright, *Metal Cutting*, 4th ed., Butterworth-Heinemann, 2000 — chip formation, the tool–chip interface, tool wear and tool materials, from metallographic evidence.
- S. Kalpakjian and S. R. Schmid, *Manufacturing Engineering and Technology*, 7th ed., Pearson, 2014 — the clearest treatment of §2 to §5 for an engineering student.
- Y. Altintas, *Manufacturing Automation: Metal Cutting Mechanics, Machine Tool Vibrations, and CNC Design*, 2nd ed., Cambridge University Press, 2012 — cutting forces, regenerative chatter and the stability lobe diagram, done properly.
- S. Malkin and C. Guo, *Grinding Technology: Theory and Applications of Machining with Abrasives*, 2nd ed., Industrial Press, 2008 — grinding energy, temperatures and the burn limit of §3.
- *Machinery's Handbook* (Industrial Press, regularly revised) — the feed and speed data, the tolerance tables and the drill-point geometry, and the book on most shop shelves.
