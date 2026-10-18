---
title: "Thermal radiation: heat without a medium"
slug: "radiation"
overview: "Radiation is the only heat transfer that needs no material: it is electromagnetic, it travels in straight lines, it goes as the fourth power of absolute temperature, and it is selective in wavelength. This lesson builds the machinery engineers actually use — blackbody emission, Planck and Wien and Stefan-Boltzmann, emissivity and Kirchhoff's law, view factors and the network method, grey enclosures and radiation shields, and the band radiation of combustion gases — and the two problems those tools exist to solve: how much heat a hot part loses to a cold room, and how to stop it."
objectives:
  - "State and apply Planck's law, Wien's displacement law and the Stefan-Boltzmann law, and use blackbody band fractions to decide what wavelength range matters at a given temperature"
  - "Distinguish emissivity, absorptivity, reflectivity and transmissivity, apply Kirchhoff's law correctly, and explain why a solar absorber can have $\alpha = 0.95$ and $\varepsilon = 0.10$ at the same time"
  - "Compute view factors from the definition and from reciprocity, summation, symmetry and the crossed-strings rule, and say when the view factor, not the surface, is the limiting resistance"
  - "Set up and solve two- and three-surface grey enclosures with the electrical-network analogy, including radiation shields and the small-object-in-a-large-enclosure case"
  - "Estimate gas radiation with mean beam lengths and band emissivities, and explain why carbon dioxide and water vapour radiate while nitrogen and oxygen do not"
  - "Solve the coupled radiation-convection problems that appear in practice: thermocouple error, hot pipework in a cold plant room, insulation design, and spacecraft thermal control"
---

Put a red-hot forging on a steel bench and the bench scorches before the forging cools. No material connects them, the gap is a few micrometres of nearly still air, and the heat arrives at a rate proportional to the *fourth power* of the forging's absolute temperature — a law with no analogue anywhere else in this curriculum. Radiation is not a correction to conduction and convection; it is a different mechanism with different rules, and it is the mechanism that carries the Sun's energy across a hundred and fifty million kilometres of nothing, sets the temperature of every spacecraft, dominates every flame, every furnace and every glass of hot tea, and decides whether your engine bay runs twenty degrees too hot.

The engineering difficulty is that radiation is *selective* and *directional*. A surface does not have one emissivity; it has a different one for every wavelength and every direction, and the exchange between two surfaces depends on the geometry that joins them. The machinery that makes this tractable — the blackbody, the grey body, the view factor, and the network analogy — is one of the most elegant pieces of applied physics in the subject, and it is all built on a formula Max Planck wrote in 1900 to solve a problem nobody else could, in the course of which he invented quantum mechanics.

::: warning Four habits this subject will beat into you
**One — never use a temperature difference; use a difference of fourth powers.** $q = \varepsilon \sigma A ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } )$ is not $h _ { r } A \Delta T$ until you have deliberately linearised it, and the linearisation is only honest over a small range. Between $3 0 0 \ \mathrm { K }$ and $3 1 0 \ \mathrm { K }$ the two forms agree; between $3 0 0 \ \mathrm { K }$ and $1 5 0 0 \ \mathrm { K }$ they do not resemble each other at all.

**Two — the surroundings are a surface, not a temperature.** A thermocouple in a duct reads the balance between convection from the gas and radiation to the *wall it can see*, and if the wall is $4 0 0 \ \mathrm { K }$ colder than the gas the junction can read ninety kelvin low. "Ambient temperature" is not a radiation boundary condition; the surrounding-surface temperature is, and it is usually a different number.

**Three — emissivity is not a material constant.** It depends on wavelength, direction, temperature, and above all on the last few micrometres of surface history: polished aluminium that leaves the mill at $\varepsilon = 0 . 0 4$ is at $\varepsilon = 0 . 2$ after a year outdoors and $0 . 8$ after a spell in a furnace. Every emissivity in every table in this lesson is a *surface condition*, not a property of the metal beneath it.

**Four — radiation goes in straight lines.** Unlike conduction and convection, which diffuse, radiation streams, and two surfaces that cannot see each other cannot exchange by radiation, however hot they are and however close. Half of the arithmetic of this lesson is geometry.
:::

## 1. Emission, irradiation, radiosity: the bookkeeping

::: definition The quantities, and what each one counts {#def-quantities}
Thermal radiation is electromagnetic radiation in the band from about $0 . 1$ to $1 0 0 \ \mu \mathrm { m }$ — spanning the near-ultraviolet, the whole visible, and the thermal infrared. The bookkeeping has four levels and mixing them up is the commonest error in the subject:

| Quantity | Symbol | What it counts | Units |
|:--|:--|:--|:--|
| Spectral emissive power | $E _ { \lambda }$ | energy *emitted* by a real surface, per unit area, per unit wavelength | $\mathrm { W / m ^ { 2 } \, \mu m }$ |
| Blackbody emissive power | $E _ { b \lambda }$ | the same for the ideal emitter | $\mathrm { W / m ^ { 2 } \, \mu m }$ |
| Irradiation | $G$ | energy *arriving* at a surface from everything else | $\mathrm { W / m ^ { 2 } }$ |
| Radiosity | $J$ | energy *leaving* a surface: emitted plus reflected | $\mathrm { W / m ^ { 2 } }$ |
| Intensity | $I$ | energy per unit projected area, per unit solid angle, along a direction | $\mathrm { W / m ^ { 2 } \, sr }$ |

The total (integrated over all wavelengths) emissive power of a real surface is $E = \varepsilon \sigma T _ { s } ^ { 4 }$ and the net exchange is what matters:

$$q _ { \text{net,rad } } = E - G = \varepsilon \sigma T _ { s } ^ { 4 } - G \qquad \text{and} \qquad J = \underbrace { \varepsilon \sigma T _ { s } ^ { 4 } } _ { \text{emitted } } + \underbrace { ( 1 - \varepsilon ) G } _ { \text{reflected } } \quad \text{(opaque surface)}$$

**The radiosity equation is the whole of the network method in one line**: a surface emits what its temperature and emissivity dictate and reflects the rest of what arrives, and since $\varepsilon$ also sets how much of the irradiation is *not* reflected, one number closes the book. For a surface that transmits (a glass pane) you must add a transmitted term and the bookkeeping triples, which is why glazing calculations are their own small industry.
:::

::: definition The blackbody, and why it is the right reference {#def-blackbody}
A **blackbody** absorbs all radiation that falls on it $( \alpha = 1 )$ and, being the best possible absorber, is by Kirchhoff's law the best possible emitter at every wavelength. **No real surface can beat it, so it is the yardstick.** Two facts make it more than a convention. **First, a small isothermal cavity with a narrow hole is a near-perfect blackbody regardless of what the cavity is made of or how shiny it is** — radiation entering the hole is reflected many times and each reflection takes a fraction, so the probability of escape is negligible; the hole's emissivity exceeds $0 . 9 9$ even for a gold-plated cavity. This is the standard radiation source and the standard reference in every pyrometer and every infrared camera. **Second, the blackbody spectrum depends on temperature alone** — not on material, not on shape, not on history — which is why it is the one radiation problem that can be solved from first principles, and why it is the reference for everything else.
:::

::: example A hot pipe in a cold plant room level=2 check="775"
A steam line, $1 0 0 \ \mathrm { m m }$ diameter and $1 \ \mathrm { m }$ long, sits at $5 0 0 \ \mathrm { K }$ $( 2 2 7 \ \mathrm { {} ^ { \circ } C } )$ in a room whose walls, floor and ceiling are all at $3 0 0 \ \mathrm { K }$ . The pipe is painted with $\varepsilon = 0 . 8$ .

$$A = \pi D L = \pi \times 0 . 1 \times 1 = 0 . 3 1 4 \ \mathrm { m ^ { 2 } } \qquad q _ { \text{rad } } = \varepsilon \sigma A ( T _ { s } ^ { 4 } - T _ { \text{sur } } ^ { 4 } ) = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times 0 . 3 1 4 \times ( 6 . 2 5 - 0 . 8 1 ) \times 1 0 ^ { 1 0 }$$

$$q _ { \text{rad } } = \mathbf { 7 7 5 \ W } \qquad q _ { \text{conv } } = h A \Delta T \approx 5 \times 0 . 3 1 4 \times 2 0 0 = 3 1 4 \ \mathrm { W }$$

**Radiation is two and a half times the natural convection, and it is not the small term anyone expected.** **Three lessons in one number.** **The fourth power is brutal: $5 0 0 ^ { 4 } / 3 0 0 ^ { 4 } = 7 . 7$ even though the temperature is only $1 . 6 7$ times higher.** **The surroundings matter absolutely — replace the $3 0 0 \ \mathrm { K }$ walls with $4 5 0 \ \mathrm { K }$ furnace walls and the net radiation collapses to $5 6 0 \ \mathrm { W }$ while the pipe temperature rises, whatever the air does.** **And emissivity is a control knob you can turn: wrap the pipe in $\varepsilon = 0 . 0 5$ aluminium foil and the radiation term falls to $4 8 \ \mathrm { W }$ , which is exactly why "pipe lagging" is a shiny metal jacket on the outside and not black paint.**
:::

::: widget plot
title: Where the radiation is — Wien's displacement law
f: 2.898e6/x
x: 200,6000
y: 0,15000
labels: T (K); peak wavelength (nm); ; ;
hlines: 400,760
caption: The wavelength of peak emission against temperature, $\lambda _ { \max } T = 2 8 9 8 \ \mu \mathrm { m \, K }$ . The horizontal band is the visible window, $4 0 0$ to $7 6 0 \ \mathrm { n m }$ : only bodies between about $3 8 0 0$ and $7 2 0 0 \ \mathrm { K }$ peak inside it, which is why "red hot", "white hot" and "blue hot" are a thermometer and why the Sun, at $5 8 0 0 \ \mathrm { K }$ , is a yellow-white object. Read off the room-temperature end: a $3 0 0 \ \mathrm { K }$ surface peaks at $9 . 7 \ \mu \mathrm { m }$ and a human face at $9 . 4 \ \mu \mathrm { m }$ , which is the band every thermal camera is built for and the band ordinary glass is opaque to.
:::

## 2. Planck, Wien, Stefan–Boltzmann, and the band that matters

::: definition The three blackbody laws {#def-planck}
**Planck's law** gives the spectral emissive power of a blackbody at absolute temperature $T$ , per unit wavelength:

$$E _ { b \lambda } ( \lambda , T ) = { \frac { C _ { 1 } } { \lambda ^ { 5 } \left[ \exp \! \left( C _ { 2 } / \lambda T \right) - 1 \right] } } \qquad C _ { 1 } = 3 . 7 4 2 \times 1 0 ^ { 8 } \ { \frac { \mathrm { W \, \mu m ^ { 4 } } } { \mathrm { m ^ { 2 } } } } \ , \quad C _ { 2 } = 1 . 4 3 8 8 \times 1 0 ^ { 4 } \ \mu \mathrm { m \, K }$$

**Wien's displacement law** — differentiate with respect to $\lambda$ and set the result to zero — locates the peak:

$$\lambda _ { \max } T = 2 8 9 8 \ \mu \mathrm { m \, K }$$

**The Stefan–Boltzmann law** — integrate Planck over all wavelengths — gives the total:

$$\boxed { \ E _ { b } ( T ) = \sigma T ^ { 4 } \ } \qquad \sigma = 5 . 6 7 0 \times 1 0 ^ { - 8 } \ \mathrm { W / m ^ { 2 } K ^ { 4 } }$$

**The two laws say opposite things and both are load-bearing.** **Wien says where the energy is: as $T$ rises the whole spectrum shifts to shorter wavelengths, so a $3 0 0 \ \mathrm { K }$ surface radiates at $1 0 \ \mu \mathrm { m }$ and a $5 8 0 0 \ \mathrm { K }$ surface at $0 . 5 \ \mu \mathrm { m }$ .** **Stefan–Boltzmann says how much: the total goes as $T ^ { 4 }$ , so doubling the absolute temperature multiplies the emission by sixteen.** **For engineering, the useful derivative is the linearised coefficient**

$$h _ { r } = { \frac { \varepsilon \sigma ( T _ { s } ^ { 4 } - T _ { \text{sur } } ^ { 4 } ) } { T _ { s } - T _ { \text{sur } } } } \approx 4 \varepsilon \sigma T _ { m } ^ { 3 } \qquad \Longrightarrow \qquad h _ { r } = 4 . 9 \ , \ 2 3 \ , \ 9 3 \ , \ 1 8 1 \ , \ 6 1 2 \ \mathrm { W / m ^ { 2 } K } \ \text{at } T _ { m } = 3 0 0 , 5 0 0 , 8 0 0 , 1 0 0 0 , 1 5 0 0 \ \mathrm { K } \ ( \varepsilon = 0 . 8 )$$

**That ladder is the single most useful number in this lesson.** **At room temperature radiation competes with natural convection at best; at $8 0 0 \ \mathrm { K }$ it is worth more than almost any forced-flow coefficient you can build without burning power doing it; at $1 5 0 0 \ \mathrm { K }$ it is the only term that matters.**
:::

::: proof Integrating Planck, and where $\sigma$ comes from {#proof-sigma}
Write $x = C _ { 2 } / \lambda T$ , so $\lambda = C _ { 2 } / ( x T )$ and $d \lambda = - C _ { 2 } \, d x / ( x ^ { 2 } T )$ . Then

$$E _ { b } = \int _ { 0 } ^ { \infty } { \frac { C _ { 1 } } { \lambda ^ { 5 } ( e ^ { C _ { 2 } / \lambda T } - 1 ) } } \, d \lambda = { \frac { C _ { 1 } T ^ { 4 } } { C _ { 2 } ^ { 4 } } } \int _ { 0 } ^ { \infty } { \frac { x ^ { 3 } } { e ^ { x } - 1 } } \, d x = { \frac { C _ { 1 } T ^ { 4 } } { C _ { 2 } ^ { 4 } } } \cdot { \frac { \pi ^ { 4 } } { 1 5 } }$$

**so $E _ { b } \propto T ^ { 4 }$ for dimensional reasons that only Planck's exponential supplies — the fourth power is the statement that the photon gas has three translational degrees of freedom and a linear dispersion, and the number $\pi ^ { 4 } / 1 5 = 6 . 4 9$ is the one place this lesson touches number theory.** **Substituting the constants: $\sigma = 3 . 7 4 2 \times 1 0 ^ { 8 } \times 6 . 4 9 4 / ( 1 . 4 3 8 8 \times 1 0 ^ { 4 } ) ^ { 4 } = 5 . 6 7 \times 1 0 ^ { - 8 } \ \mathrm { W / m ^ { 2 } K ^ { 4 } }$ , exactly the measured value that Josef Stefan fitted to John Tyndall's data in 1 8 7 9 as an empirical law and that Ludwig Boltzmann derived three years later from thermodynamics alone.** **For the peak, differentiate Planck and set $d E _ { b \lambda } / d \lambda = 0$ , which gives the transcendental equation $5 ( 1 - e ^ { - x } ) = x$ with root $x = 4 . 9 6 5$ , hence $\lambda _ { \max } = C _ { 2 } / ( 4 . 9 6 5 \, T )$ and $\lambda _ { \max } T = 1 4 \, 3 8 8 / 4 . 9 6 5 = 2 8 9 8 \ \mu \mathrm { m \, K }$ .** **Note that the peak in wavelength is *not* the peak in frequency — $E _ { \nu }$ and $E _ { \lambda }$ peak at different places because $d \nu \neq d \lambda$ — which is why the Sun is sometimes quoted as peaking at $0 . 5 0 \ \mu \mathrm { m }$ and sometimes at $3 5 3 \ \mathrm { n m }$ . Both are correct; use the wavelength form, because every engineering table does.**
:::

::: definition Band fractions: how much of the emission is where you need it {#def-band}
Integrating Planck between two wavelengths gives a fraction of the total that depends on the single product $\lambda T$ :

$$F _ { ( 0 \rightarrow \lambda ) } = { \frac { \int _ { 0 } ^ { \lambda } E _ { b \lambda } \, d \lambda } { \sigma T ^ { 4 } } } = { \frac { 1 5 } { \pi ^ { 4 } } } \sum _ { n = 1 } ^ { \infty } { \frac { e ^ { - n s } } { n } } \left( s ^ { 3 } + { \frac { 3 s ^ { 2 } } { n } } + { \frac { 6 s } { n ^ { 2 } } } + { \frac { 6 } { n ^ { 3 } } } \right) \ , \qquad s = { \frac { 1 4 \, 3 8 8 } { \lambda T } }$$

| $\lambda T \ ( \mu \mathrm { m \, K } )$ | 1000 | 2000 | **2898** | 4000 | 5000 | 7000 | 10000 | 20000 |
|:--|--:|--:|--:|--:|--:|--:|--:|--:|
| $F _ { ( 0 \rightarrow \lambda ) }$ | 0.000 | 0.067 | **0.250** | 0.481 | 0.634 | 0.808 | 0.914 | 0.986 |

**Half the energy of any blackbody lies below $\lambda T \approx 4 1 1 0 \ \mu \mathrm { m \, K }$ , a little above the peak — the spectrum is badly skewed, with a long tail to long wavelengths carrying most of the last twenty per cent.** **Read the table in engineering sentences:**
:::

::: example The Sun, the furnace and the glass pane level=3 check="43"
**(a) How much of the Sun's output is visible?** For $T = 5 8 0 0 \ \mathrm { K }$ : $\lambda T = 0 . 4 \times 5 8 0 0 = 2 3 2 0$ gives $F = 0 . 1 2 4$ and $0 . 7 6 \times 5 8 0 0 = 4 4 0 8$ gives $F = 0 . 5 5 0$ , so

$$F _ { \text{visible } } = 0 . 5 5 0 - 0 . 1 2 4 = \mathbf { 0 . 4 3 } \quad ( 4 3 \ \%) \qquad F _ { ( \lambda < 4 \ \mu \mathrm { m } ) } = 0 . 9 9$$

**(b) How much of a room-temperature surface's emission is below $4 \ \mu \mathrm { m }$ ?** $\lambda T = 4 \times 3 0 0 = 1 2 0 0$ , $F = 0 . 0 0 5$ : **half a per cent.** **Everything a $3 0 0 \ \mathrm { K }$ surface emits is thermal infrared.**

**(c) Now put a glass pane between them.** Ordinary soda-lime glass transmits from about $0 . 3$ to $2 . 5 \ \mu \mathrm { m }$ and is effectively opaque beyond $4 \ \mu \mathrm { m }$ . **Sunlight passes through it almost unimpeded; the emission of the furniture it has heated cannot get back out.** That is the greenhouse effect, and it is not an analogy or a metaphor — it is the band-fraction arithmetic of (a) and (b) applied to one sheet of glass, and it is why a car interior left in the sun reaches $7 0 \ \mathrm { {} ^ { \circ } C }$ in an hour, why a solar collector is covered with glass, and why the same physics in the atmosphere with a hundredth the optical depth is a climate problem.

**The corollary for designers: a surface that is "transparent" or "opaque" is meaningless without a temperature attached.** **Silicon is opaque to visible light and transparent to $1 0 . 6 \ \mu \mathrm { m }$ carbon-dioxide-laser radiation, which is why CO₂ laser cutters are focused through silicon lenses; germanium makes infrared-camera windows that look like mirrors; and a furnace's fused-silica sighting port passes the $2 \ \mu \mathrm { m }$ peak of a $1 5 0 0 \ \mathrm { K }$ flame while blocking the $1 0 \ \mu \mathrm { m }$ radiation of the brickwork behind the operator.**
:::

::: widget plot
title: One curve to rule them all — the shape of blackbody emission
f: 142.5/(pow(x,5)*(exp(4.965/x)-1))
x: 0.35,4
y: 0,1.15
labels: wavelength / peak wavelength; E over E at the peak; ; ;
shade: 0.797,1.514
between: true
caption: Every blackbody spectrum, at every temperature, has this one shape when wavelength is measured in units of the peak. The shaded band is the visible range for a Sun-like source $( 0 . 4$ to $0 . 7 6 \ \mu \mathrm { m }$ divided by $\lambda _ { \max } = 0 . 5 0 2 \ \mu \mathrm { m } )$ . **Note the asymmetry: the short-wavelength side falls off far more steeply than the long-wavelength side rises, so a hot body's spectrum has a long infrared tail — and note how little of the curve lies to the left of the visible band, which is why only very hot things glow.** **The same curve is why an infrared thermometer aimed at a hot steel billet reads low if it is set for the wrong band, and why two-colour (ratio) pyrometers, which divide two bands and are insensitive to emissivity, are the instrument of choice when the emissivity is unknown.**
:::

## 3. Real surfaces: emissivity, absorptivity, and Kirchhoff's law

::: definition Emissivity, absorptivity, and the one law that connects them {#def-emissivity}
For an opaque surface at temperature $T _ { s }$ , the **total hemispherical emissivity** is the fraction of the blackbody emission it actually produces,

$$\varepsilon ( T _ { s } ) = { \frac { \int _ { 0 } ^ { \infty } \varepsilon _ { \lambda } ( \lambda ) \, E _ { b \lambda } ( \lambda , T _ { s } ) \, d \lambda } { \sigma T _ { s } ^ { 4 } } } \qquad \text{and} \qquad \alpha ( T _ { \text{source } } ) = { \frac { \int _ { 0 } ^ { \infty } \alpha _ { \lambda } ( \lambda ) \, G _ { \lambda } ( \lambda ) \, d \lambda } { G } }$$

**Look at the weighting functions: $\varepsilon$ is weighted by the surface's *own* emission at its own temperature, while $\alpha$ is weighted by the *incoming* radiation from whatever source happens to be shining on it.** **They are therefore different numbers whenever the source and the surface are at different temperatures.** **Kirchhoff's law** is the statement of when they coincide:

$$\boxed { \ \varepsilon _ { \lambda } ( \lambda , \theta , T ) = \alpha _ { \lambda } ( \lambda , \theta , T ) \ } \quad \text{at thermal equilibrium, direction by direction, wavelength by wavelength}$$

**A good absorber at a given wavelength and direction is a good emitter at that same wavelength and direction — this is a requirement of the second law, since a surface that absorbed more than it emitted in one mode would spontaneously heat a body of its own temperature.** **Note what Kirchhoff does *not* license: $\alpha = \varepsilon$ for total, broadband properties is true only when the incident radiation has the same spectral distribution as the surface's own emission, i.e. when the surface sees surroundings at its own temperature.** **A grey surface, defined by $\varepsilon _ { \lambda } = \alpha _ { \lambda } = \text{constant}$ at all wavelengths, is the assumption that makes the whole of section 6 tractable; it is a good approximation for non-metals, paints, oxides, skin, wood, paper and soot, and a bad one for polished metals.**
:::

::: definition Emissivities worth memorising, and what they really mean {#def-emissivity-table}
| Surface | $\varepsilon$ | Surface | $\varepsilon$ |
|:--|--:|:--|--:|
| Blackbody cavity | 0.99–0.999 | Oxidised copper | 0.6–0.8 |
| Black chrome (selective absorber) | 0.10 | Carbon steel, oxidised | 0.7–0.9 |
| Black nickel | 0.91 | Stainless, oxidised | 0.5–0.7 |
| White paint | 0.90–0.95 | Brick, fireclay | 0.85–0.95 |
| Human skin | 0.98 (and 0.92 in the visible) | Concrete | 0.85–0.95 |
| Water, ice | 0.95–0.97 | Glass | 0.85–0.94 |
| Snow, fresh | 0.90–0.95 | Human eye, cornea | 0.99 at $10 \mu m$ |
| Aluminium, polished | 0.03–0.06 | Aluminium, heavily oxidised | 0.2–0.6 |
| Silver, polished | 0.02 | Air, dry, at ordinary thickness | 0.0 (transparent) |
| Tungsten, polished | 0.05–0.45 (rises steeply with $T$) | Magnesium oxide | 0.4–0.7 |

**Three patterns to carry away.** **Polished metals are poor emitters and get worse as the temperature falls** — the free electrons make them good reflectors in the infrared, and $\varepsilon$ rises with $T$ , which is why a tungsten filament at $2 8 0 0 \ \mathrm { K }$ has $\varepsilon \approx 0 . 3 5$ while the same wire at room temperature is $0 . 0 6$ . **Non-metals are the opposite: high emissivity, fairly flat with temperature, and high absorptivity in the thermal infrared** — which is why white paint, white in the visible, is black at $1 0 \ \mu \mathrm { m }$ : **a radiator painted white and the same radiator painted black cool at the same rate, and the "black radiators give more heat" rule is a myth, while the "white car is cooler in the sun" rule is real because there the sun is the source.** **And the numbers for a given material span a factor of twenty depending on surface condition, which is why the honest designer takes a range, not a value.**
:::

::: example The selective surface: two properties, one surface, a factor of four level=3 check="585"
A flat-plate solar collector is exposed to $7 0 0 \ \mathrm { W / m ^ { 2 } }$ of sun at an ambient of $2 7 \ \mathrm { {} ^ { \circ } C }$ . Compare a flat-black plate $( \alpha = 0 . 9 5$ , $\varepsilon = 0 . 9 5 )$ with a **selective absorber** — black chrome or a cermet coating with $\alpha = 0 . 9 5$ in the solar band but $\varepsilon = 0 . 1 0$ in the thermal infrared. Ignoring convection, the stagnation temperature comes from $\alpha G = \varepsilon \sigma T ^ { 4 }$ :

$$T = \left( { \frac { \alpha G } { \varepsilon \sigma } } \right) ^ { 1 / 4 } = \left( { \frac { 0 . 9 5 \times 7 0 0 } { 0 . 1 0 \times 5 . 6 7 \times 1 0 ^ { - 8 } } } \right) ^ { 1 / 4 } = \mathbf { 5 8 5 \ K } \ ( 3 1 2 \ \mathrm { {} ^ { \circ } C } ) \qquad \text{versus} \qquad \left( { \frac { 0 . 9 5 \times 7 0 0 } { 0 . 9 5 \times 5 . 6 7 \times 1 0 ^ { - 8 } } } \right) ^ { 1 / 4 } = 3 3 8 \ \mathrm { K } \ ( 6 5 \ \mathrm { {} ^ { \circ } C } )$$

**Two hundred and fifty kelvin, from a coating.** **The trick is legal because the two properties refer to different wavelength bands and therefore to different physics: the absorber is a cermets-in-metal composite that is thick enough to swallow the $0 . 3$–$2 . 5 \ \mu \mathrm { m }$ solar spectrum and thin and metallic enough to reflect at the $5$–$2 5 \ \mu \mathrm { m }$ wavelengths at which a $4 0 0 \ \mathrm { K }$ surface emits.** **Kirchhoff is not violated: at $2 \ \mu \mathrm { m }$ it absorbs at $0 . 9 5$ and emits at $0 . 9 5$ ; at $1 0 \ \mu \mathrm { m }$ it absorbs at $0 . 1 0$ and emits at $0 . 1 0$ .** **The same asymmetry, reversed, is the low-emissivity coating on energy-efficient glazing: a $1 0 0 \ \mathrm { n m }$ layer of silver oxide between the panes drops the glass emissivity from $0 . 8 4$ to $0 . 0 5$ , and because the two panes are at $2 0 \ \ {} ^ { \circ } \mathrm { C }$ and $- 1 0 \ \ {} ^ { \circ } \mathrm { C }$ and both radiate in the same band, the exchange falls by a factor of**

$$\frac { 2 / 0 . 0 5 - 1 } { 2 / 0 . 8 4 - 1 } = \frac { 3 9 } { 1 . 3 8 } = \mathbf { 2 8 } \qquad 1 0 6 \ \mathrm { W / m ^ { 2 } } \ \longrightarrow \ 3 . 8 \ \mathrm { W / m ^ { 2 } }$$

**which is roughly the whole difference between a single-glazed window and a triple one, delivered by a coating that costs a few pounds per square metre and is invisible.**
:::

## 4. View factors: the geometry of what can be seen

::: definition The view factor, and the four rules that let you avoid integrating {#def-viewfactor}
Radiation leaves a surface element in a cone and travels straight. The **view factor** $F _ { i j }$ is the fraction of the total radiation leaving surface $i$ that strikes surface $j$ directly, and for diffuse surfaces it is a pure number depending on geometry alone:

$$F _ { i j } = { \frac { 1 } { A _ { i } } } \int _ { A _ { i } } \int _ { A _ { j } } { \frac { \cos \theta _ { i } \cos \theta _ { j } } { \pi S ^ { 2 } } } \, d A _ { j } \, d A _ { i } \qquad \left[ \sum _ { j } F _ { i j } = 1 \right]$$

The double integral is a four-dimensional one and is rarely evaluated directly. Four rules do almost all the work:

| Rule | Statement | Use |
|:--|:--|:--|
| **Reciprocity** | $A _ { i } F _ { i j } = A _ { j } F _ { j i }$ | Get the hard direction from the easy one |
| **Summation** | $\sum _ { j } F _ { i j } = 1$ for an enclosure | Get the unknown from the known |
| **Symmetry** | Exploit planes of symmetry before integrating | Halves or quarters the problem |
| **Crossed strings** (Hottel) | For 2-D geometries of any shape, $F _ { 1 2 } = \dfrac { ( a d + b c ) - ( c d + a b ) } { 2 d }$ — the crossed diagonals minus the uncrossed, over twice the width | Any long duct, channel, or groove without calculus |

**Two facts about the number itself.** **$F _ { i j }$ is not symmetric: a small hot bearing looking at a large cold room has $F _ { 1 2 } = 1$ while the room sees the bearing at $F _ { 2 1 } = A _ { 1 } / A _ { 2 }$ , a thousandth.** **And $F _ { i i } = 0$ for a flat or convex surface but can be large for a concave one — the inside of a hemisphere sees itself, and a deep cavity radiating to itself is what makes its effective emissivity approach unity.**
:::

::: example Four view factors you should be able to write down level=2 check="0.38"
**(a) Two infinite parallel plates:** $F _ { 1 2 } = 1$ . **Everything leaving one hits the other.**
**(b) Concentric cylinders or spheres, inner 1:** $F _ { 1 2 } = 1$ , and by reciprocity $F _ { 2 1 } = A _ { 1 } / A _ { 2 } = ( D _ { 1 } / D _ { 2 } ) ^ { 2 }$ . **For the $0 . 2 \ \mathrm { m }$ sphere inside a $0 . 5 \ \mathrm { m }$ sphere, $F _ { 2 1 } = 0 . 1 6$ — the outer sphere sees mostly itself.**
**(c) Coaxial parallel equal discs, radius $r$ , separation $L$ , with $r = L$ :** $X = 1 + ( 1 + ( r / L ) ^ { 2 } ) / ( r / L ) ^ { 2 } = 3$ , so

$$F _ { 1 2 } = { \frac { 1 } { 2 } } \left[ X - { \sqrt { X ^ { 2 } - 4 } } \right] = { \frac { 1 } { 2 } } ( 3 - 2 . 2 3 6 ) = \mathbf { 0 . 3 8 }$$

**Only $3 8 \ \%$ of what leaves one disc reaches the other, even in this generous geometry — a gap equal to the diameter throws away two thirds of the exchange.**
**(d) A differential element facing a coaxial disc** of radius $r$ at distance $L$ , the element parallel to the disc: $F = r ^ { 2 } / ( r ^ { 2 } + L ^ { 2 } )$ , so for $r = 0 . 5 \ \mathrm { m }$ and $L = 1 \ \mathrm { m }$ , $F = 0 . 2 5 / 1 . 2 5 = 0 . 2 0$ . **Tilt the element by $ 6 0 ^ { \circ } $ and the figure more than halves — which is why solar collectors are aimed, why a furnace sight-hole must be looked through square-on, and why an infrared pyrometer aimed at a weld at a grazing angle reads low for two reasons at once: a smaller view factor and a lower emissivity.**
:::

::: warning The three places view factors bite
**One — the "radiating area" is not the surface area.** A fin that cannot see the cold surface it is meant to be cooling contributes nothing, which is why radiative fins for spacecraft are flat plates in a plane, not pin fins, and why the inside of a furnace tube is smooth and not finned.

**Two — a shield, a baffle or a neighbouring component is a view-factor problem, not a conduction problem.** A $5 \ \mathrm { m m }$ disc of polished steel between a hot element and a cold sensor, larger in area than the element, drops the exchange to nearly zero even though it conducts heat freely, because it intercepts the lines of sight. **This is why "radiation baffles" work and why they are designed by drawing lines, not by solving equations.**

**Three — the sum rule can lie if the enclosure is not closed.** Writing $\sum F _ { i j } = 1$ requires that every ray leaving $i$ hits some surface in the list. An "open" box, a hole, or a surface that sees the sky through a window needs the opening treated as a real surface with the sky's effective temperature — which in clear dry weather at night is $2 0$ to $3 0 \ \mathrm { K }$ *below* the air temperature, and is why frost forms on a clear night at an air temperature of $5 \ \mathrm { {} ^ { \circ } C }$ and why a parked car's windscreen ices over when the road beside it does not.
:::

## 5. Exchange between black surfaces: the space resistance

::: definition Black-body exchange and the network idea {#def-space-resistance}
If every surface in an enclosure is black, every ray that arrives is absorbed, and the exchange between two of them is immediate:

$$q _ { i \rightarrow j } = A _ { i } F _ { i j } \, \sigma T _ { i } ^ { 4 } \qquad \Longrightarrow \qquad q _ { 1 2 , \text{net } } = \sigma ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } ) \, { \frac { 1 } { ( 1 - \varepsilon _ { 1 } ) / ( \varepsilon _ { 1 } A _ { 1 } ) + 1 / ( A _ { 1 } F _ { 1 2 } ) + ( 1 - \varepsilon _ { 2 } ) / ( \varepsilon _ { 2 } A _ { 2 } ) } } \ \text{(grey, below)}$$

**The driving potential is a difference of blackbody emissive powers, $\sigma T ^ { 4 }$ , not a difference of temperatures, and the resistance $1 / ( A _ { 1 } F _ { 1 2 } )$ is called the **space resistance** — it is the cost of the geometry, of the two surfaces not facing each other, and it is present even when both surfaces are perfect blackbodies.** **Two parallel black plates $1 \ \mathrm { m }$ apart, $1 \ \mathrm { m ^ { 2 } }$ each, at $1 0 0 0$ and $5 0 0 \ \mathrm { K }$ exchange**

$$q = \sigma ( 1 0 0 0 ^ { 4 } - 5 0 0 ^ { 4 } ) \times 1 \times 0 . 3 8 = 2 0 . 3 \ \mathrm { k W } \qquad \text{but if they are infinite, or joined by a duct, } F = 1 \text{ and } q = 5 3 . 1 \ \mathrm { k W }$$

**A factor of $2 . 6$ from geometry alone.** **The network method — potentials $\sigma T _ { i } ^ { 4 }$ at nodes, resistances on the branches, Kirchhoff's current law at each node — is not an analogy for effect's sake; it is exactly the algebra of the radiosity balance, and it means that any enclosure a designer can draw can be solved by the same rules as an electrical circuit, including series-parallel reduction, delta-star transforms and Thévenin sources.**
:::

## 6. Grey enclosures: the two-surface formula and its three limits

::: definition Two grey surfaces exchanging {#def-grey-two}
For two opaque grey surfaces forming an enclosure with each other (every ray leaving one eventually hits the other, possibly after reflections), the surface resistance $( 1 - \varepsilon ) / ( \varepsilon A )$ — the cost of *getting the radiation out of the surface* — adds in series with the space resistance:

$$\boxed { \ q = { \frac { \sigma ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } ) } { \dfrac { 1 - \varepsilon _ { 1 } } { \varepsilon _ { 1 } A _ { 1 } } + \dfrac { 1 } { A _ { 1 } F _ { 1 2 } } + \dfrac { 1 - \varepsilon _ { 2 } } { \varepsilon _ { 2 } A _ { 2 } } } } \ } \qquad \text{(three resistances in series)}$$

**Three limits worth memorising:**

| Geometry | $F _ { 1 2 }$ | Result |
|:--|:--|:--|
| Two large parallel plates | 1 | $q = \sigma A ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } ) / ( 1 / \varepsilon _ { 1 } + 1 / \varepsilon _ { 2 } - 1 )$ |
| Concentric cylinders or spheres, inner 1 | 1 | $q = \sigma A _ { 1 } ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } ) / [ 1 / \varepsilon _ { 1 } + ( 1 - \varepsilon _ { 2 } ) ( D _ { 1 } / D _ { 2 } ) ^ { 2 } / \varepsilon _ { 2 } ]$ |
| Small object of area $A _ { 1 }$ in a large enclosure | 1, and $A _ { 1 } / A _ { 2 } \to 0$ | $q = \varepsilon _ { 1 } \sigma A _ { 1 } ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } )$ — **the enclosure's emissivity drops out** |

**The third line is the one you will use most: a hot component in a room, a thermocouple junction in a duct, a forging leaving a furnace, a person in a cold hall.** **Note that the answer contains $\varepsilon _ { 1 }$ only — the walls could be polished metal or soot, it makes no difference, because the small object's own emission is what is limited and everything the walls return is already accounted for by the enclosure being large.** **Note also the shape of the parallel-plate denominator: with both surfaces at $\varepsilon = 0 . 0 5$ it is $3 9$ , so two polished surfaces facing each other exchange forty times less than two black ones, and the resistance is dominated by the surfaces, not the gap.**
:::

::: example The double-walled vessel: where the resistance actually is level=3 check="541"
A cryogenic inner cylinder, $D _ { 1 } = 0 . 1 \ \mathrm { m }$ , $\varepsilon _ { 1 } = 0 . 6$ , at $5 0 0 \ \mathrm { K }$ , is concentric with an outer cylinder $D _ { 2 } = 0 . 2 \ \mathrm { m }$ , $\varepsilon _ { 2 } = 0 . 8$ , at $3 0 0 \ \mathrm { K }$ . Per metre of length, $A _ { 1 } = \pi D _ { 1 } = 0 . 3 1 4 \ \mathrm { m ^ { 2 } }$ , $A _ { 2 } = 0 . 6 2 8 \ \mathrm { m ^ { 2 } }$ , $F _ { 1 2 } = 1$ :

$$R _ { 1 } = { \frac { 1 - 0 . 6 } { 0 . 6 \times 0 . 3 1 4 } } = 2 . 1 2 \qquad R _ { \text{space } } = { \frac { 1 } { 0 . 3 1 4 } } = 3 . 1 8 \qquad R _ { 2 } = { \frac { 1 - 0 . 8 } { 0 . 8 \times 0 . 6 2 8 } } = 0 . 4 0 \qquad \left[ \sum R = 5 . 7 0 \right]$$

$$q = { \frac { 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 6 . 2 5 - 0 . 8 1 ) \times 1 0 ^ { 1 0 } } { 5 . 7 0 } } = \mathbf { 5 4 1 \ W / m }$$

**The resistance breakdown is the useful output: $3 7 \ \%$ is the inner surface's own emission resistance, $5 6 \ \%$ is the space resistance, and only $7 \ \ \%$ is the outer surface.** **So polishing the *inner* cylinder helps a great deal and polishing the outer one is a waste of labour — the classic mistake, made for decades in vacuum-flask manufacture, of silvering the wrong surface.** **If the outer cylinder is made much larger, $R _ { 2 }$ falls further and the answer tends to the small-object-in-a-cold-room limit, $q \rightarrow \varepsilon _ { 1 } \sigma A _ { 1 } ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } ) = 5 4 2 \ \mathrm { W / m }$ : the outer boundary has already stopped mattering.**
:::

## 7. Radiation shields: the cheapest resistance there is

::: definition Why a thin, shiny, uncooled sheet does so much {#def-shield}
Insert a thin, low-emissivity shield between two surfaces and it acquires a floating temperature at which what it absorbs equals what it emits — so it must run *hotter than the cold surface and colder than the hot one*, and each surface now exchanges with a neighbour that is already part-way to its own temperature. **For one shield of emissivities $\varepsilon _ { s , 1 }$ and $\varepsilon _ { s , 2 }$ on its two faces between two large parallel plates,**

$$q = { \frac { \sigma ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } ) } { ( 1 / \varepsilon _ { 1 } + 1 / \varepsilon _ { 2 } - 1 ) + ( 1 / \varepsilon _ { s , 1 } + 1 / \varepsilon _ { s , 2 } - 1 ) } } \qquad \Longrightarrow \qquad q _ { N } = { \frac { q _ { 0 } } { 1 + N ( 2 / \varepsilon _ { s } - 1 ) / ( 1 / \varepsilon _ { 1 } + 1 / \varepsilon _ { 2 } - 1 ) } }$$

**The shield costs nothing: it needs no cooling, no power, no maintenance, and it weighs a few grams per square metre, because it is not a heat sink but a reflector.** **The catch is that it only works if the shield is *electrically isolated from the temperature it is screening* — a shield that touches the hot surface and the cold surface at one point is a short circuit across the very resistance you just bought, and a bolted, strapped or bridged shield is often worse than none.** **This is the reason a Dewar flask has a narrow neck of glass, a vacuum flask's inner vessel is held by a single point, and multilayer insulation in a cryogenic line is held apart by a sparse fibrous spacer whose conductance is designed to be comparable to the radiation it is spoiling.**
:::

::: example Seven sheets of aluminised Mylar level=3 check="0.98"
A liquid-helium Dewar: inner vessel at $4 . 2 \ \mathrm { K }$ , outer at $3 0 0 \ \mathrm { K }$ , both surfaces $\varepsilon = 0 . 2$ . Multilayer insulation of $N$ sheets of $\varepsilon = 0 . 0 3$ aluminised polymer film, spaced by a fibrous separator, in a good vacuum so that gas conduction is negligible.

$$q / A = { \frac { \sigma ( 3 0 0 ^ { 4 } - 4 . 2 ^ { 4 } ) } { ( 2 / 0 . 2 - 1 ) + N ( 2 / 0 . 0 3 - 1 ) } } = { \frac { 4 5 9 } { 9 + 6 5 . 7 \, N } } \qquad \Longrightarrow \qquad { \frac { 5 1 . 0 \ \mathrm { W / m ^ { 2 } } } { N = 0 } } \ , \quad { \frac { 6 . 2 } { N = 1 } } \ , \quad \mathbf { 0 . 9 8 } \ \mathbf { W / m ^ { 2 } } \ ( N = 7 ) \ , \quad 0 . 3 5 \ ( N = 2 0 )$$

**Fifty-one watts per square metre down to one.** **The first shield buys a factor of eight; the seventh buys another six; the twentieth buys less than the nineteenth, because by then the spacer's solid conduction and the residual gas conduction are the real resistances.** **Real dewars run at $5 0$ to $1 0 0$ layers for exactly this reason and are limited by the weight and cost of installing them, not by the radiation.** **The same arithmetic, at ordinary temperatures, is the multilayer blanket around a furnace lining, the "radiation barrier" behind a kitchen cooker, the aluminised board behind a domestic radiator, and the twenty layers of Kapton and beta-cloth that keep a satellite's instruments between $- 2 0$ and $+ 4 0 \ \ {} ^ { \circ } \mathrm { C }$ in Earth orbit.**
:::

::: widget plot
title: What each extra shield buys — and what each extra shield costs you
f: 1/(1+x*(2/0.05-1)/(2/0.5-1)); 1/(1+x*(2/0.5-1)/(2/0.5-1))
x: 0,6
y: 0,1.05
labels: number of shields between the plates; q / q without shields; ; ;
caption: Heat flux through a stack of radiation shields, normalised to the bare value, for $\varepsilon = 0 . 0 5$ shields (upper curve falls fast) and $\varepsilon = 0 . 5$ shields (lower). **The lesson is in the first step: one good shield cuts the flux by a factor of fourteen, and the second and third add factors of seven and five on top — the returns are steeply diminishing in *absolute* terms, from $7 5 9 0$ to $5 4 2 \ \mathrm { W / m ^ { 2 } }$ with one shield, to $1 9 0$ with three, and to $1 1 5$ with five .** **The second curve is the warning: shields made of ordinary sheet metal at $\varepsilon = 0 . 5$ are nearly useless, buying a factor of three at best. Shield performance is $\varepsilon$-limited, which is why every shield in engineering is polished metal, vaporised silver, or aluminised film — and why a shield that has been touched with a finger, oxidised, or covered in soot has stopped being a shield.**
:::

## 8. Participating media: what flames, furnace gases and the atmosphere do

::: definition Why some gases radiate and most do not {#def-gas-radiation}
Nitrogen and oxygen — $9 9 \ \%$ of air and $8 5 \ \%$ of any flue gas — are **perfectly transparent** to thermal radiation, in every band, at any practical path length. **The reason is quantum-mechanical and it is not negotiable: a molecule can absorb or emit infrared radiation only if the vibration changes its electric dipole moment, and a homonuclear diatomic molecule has no dipole to change.** **Carbon dioxide (its asymmetric stretch at $4 . 3 \ \mu \mathrm { m }$ and its bend at $1 5 \ \mu \mathrm { m }$ ), water vapour ( $2 . 7$ , $6 . 3$ and rotation–vibration bands beyond $1 2 \ \mu \mathrm { m }$ ), carbon monoxide, methane, sulphur dioxide and nitrous oxide all radiate strongly; so does soot, which is not a gas at all but a solid and radiates as an almost grey body.** **Three consequences follow, and they are the difference between a boiler that works and one that does not:**

**One — a gas does not radiate as a surface.** Emission and absorption accumulate along the path, so the relevant quantity is the **optical thickness**, and for a band of mean absorption coefficient $\kappa _ { \lambda }$ ,

$$I _ { \lambda } ( s ) = I _ { \lambda } ( 0 ) \, e ^ { - \kappa _ { \lambda } \rho s } + I _ { b \lambda } ( T _ { g } ) \left( 1 - e ^ { - \kappa _ { \lambda } \rho s } \right) \qquad \Longrightarrow \qquad \varepsilon _ { g } \approx 1 - e ^ { - \kappa \, p \, L }$$

**The product $p L$ of partial pressure and path length is the design variable, which is why a big furnace radiates far better than a small one at the same temperature and why a flame's heat flux depends on the chamber's size, not only its temperature.**

**Two — the spectrum is line-structured, so a gas is emphatically not grey** and the emissivity must be read from charts (Hottel, Leiden, or the Hottel–Saraf charts still tabulated in every heat-transfer book) at the gas temperature, then corrected for total pressure and for the fact that the gas is *absorbing* radiation from a wall at a different temperature:

$$q = \varepsilon _ { w } A _ { w } \, \sigma \left[ \alpha _ { g } \, T _ { g } ^ { 4 } - \varepsilon _ { g } \, T _ { w } ^ { 4 } \right] \ , \qquad \alpha _ { g } = C \left( { \frac { T _ { g } } { T _ { w } } } \right) ^ { n } \varepsilon _ { g } \! \left( T _ { w } , \ p L { \frac { T _ { w } } { T _ { g } } } \right)$$

**with $n \approx 0 . 6 5$ for $\mathrm { C O } _ { 2 }$ , $n \approx 0 . 4 5$ for $\mathrm { H } _ { 2 } \mathrm { O }$ and $C = 1$ for the usual furnace pressures. The gas is a better absorber of the wall's long-wavelength radiation than it is an emitter at its own temperature, so $\alpha _ { g } > \varepsilon _ { g }$ whenever $T _ { g } > T _ { w }$ — Kirchhoff is satisfied band by band, not in these totals.**

**Three — the mean beam length** $L _ { e }$ **replaces the true path for an irregular volume: $L _ { e } = 3 . 6 \, V / A$ for a gas volume enclosed by its boundary, and $0 . 9$ times the relevant dimension for a gas between large parallel surfaces.** **It is an approximation, it is good to about $\pm 2 0 \ \ \%$ in flux, and it is the reason a furnace designer cares about the shape of the chamber as much as its temperature.**
:::

::: example A furnace wall: gas radiation against gas convection level=3 check="90"
A $3 \times 3 \times 6 \ \mathrm { m }$ furnace burns with $12 \ \ \% \ \mathrm { C O } _ { 2 }$ and $12 \ \ \% \ \mathrm { H } _ { 2 } \mathrm { O }$ at $1 5 0 0 \ \mathrm { K }$ and $1 \ \mathrm { atm }$ ; the water-wall tubes are at $8 0 0 \ \mathrm { K }$ with $\varepsilon _ { w } = 0 . 8$ .

$$V = 5 4 \ \mathrm { m ^ { 3 } } \ , \ A = 9 0 \ \mathrm { m ^ { 2 } } \ , \qquad L _ { e } = 3 . 6 \times { \frac { 5 4 } { 9 0 } } = 2 . 1 6 \ \mathrm { m } \qquad p _ { c } L _ { e } = p _ { w } L _ { e } = 0 . 1 2 \times 2 . 1 6 = 0 . 2 6 \ \mathrm { atm \, m }$$

**From the Hottel charts at $T _ { g } = 1 5 0 0 \ \mathrm { K }$ : $\varepsilon _ { c } \approx 0 . 1 5$ , $\varepsilon _ { w } \approx 0 . 2 0$ , overlap correction $\Delta \approx 0 . 0 2$ , so $\varepsilon _ { g } \approx 0 . 3 3$ ; evaluating the same charts at the wall temperature with the corrected $p L$ and applying the $( T _ { g } / T _ { w } ) ^ { n }$ factors gives $\alpha _ { g } \approx 0 . 4 2$ . Then**

$$q = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } \left[ 0 . 4 2 \times 1 5 0 0 ^ { 4 } - 0 . 3 3 \times 8 0 0 ^ { 4 } \right] = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times \left[ 2 . 1 3 \times 1 0 ^ { 1 2 } - 1 . 4 \times 1 0 ^ { 8 } \right] = \mathbf { 9 0 \ k W / m ^ { 2 } }$$

**against a convective contribution of $h \Delta T \approx 1 0 0 \times 7 0 0 = 7 0 \ \mathrm { k W / m ^ { 2 } }$ at a typical gas velocity.** **Radiation is the larger term, and it is entirely due to the twelve per cent of carbon dioxide and water vapour — the nitrogen and oxygen, which are the bulk of the gas, contribute nothing at all.** **Now add a little fuel-rich, soot-laden flame: soot at a mass fraction of one part in ten thousand gives an emissivity near $0 . 8$ , and the same furnace radiates**

$$q = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times 1 . 8 \times 1 0 ^ { 1 2 } \approx \mathbf { 4 7 0 \ k W / m ^ { 2 } }$$

**five times more.** **That is why oil-fired boilers have slagged, sooty furnace walls and gas-fired ones have clean, bright, deliberately under-radiating chambers; why a luminous yellow flame is a hot flame and a transparent blue one is a poor radiator; and why "the flame looks the same" is not a heat-transfer answer.**
:::

::: warning The atmosphere is a participating medium, and this is not a metaphor
**Dry air is almost transparent in the $8$ to $1 3 \ \mu \mathrm { m }$ band, and a $3 0 0 \ \mathrm { K }$ surface puts $3 2 \ \ \%$ of its emission into that window — which is why radiative cooling to the night sky works, why a clear dry night can pull a rooftop $1 5 \ \mathrm { K }$ below air temperature, why dew forms on grass and not on concrete, and why every spacecraft thermal design is a battle between the Sun, the Earth's infrared and deep space at $2 . 7 \ \mathrm { K }$ .** **Water vapour and carbon dioxide close the rest of the spectrum: the "effective sky temperature" for radiation from a horizontal surface to a clear winter sky is commonly $2 0$ to $3 0 \ \mathrm { K }$ below the ambient air, and under a humid overcast sky only a few kelvin below — which is exactly the atmospheric greenhouse effect, the same band-by-band physics as the furnace gas above, run at $2 5 5 \ \mathrm { K }$ instead of $1 5 0 0 \ \mathrm { K }$ .** **The honest statement of the mechanism is short: the atmosphere is partly transparent to the Sun's $0 . 5 \ \mu \mathrm { m }$ radiation and partly opaque to the Earth's $1 1 \ \mu \mathrm { m }$ radiation, so adding an infrared-active gas raises the altitude from which the planet can radiate to space, and because temperature falls with altitude the surface must warm until the escaping flux is restored.** **Every term in that sentence is the same $\alpha _ { \lambda } = \varepsilon _ { \lambda }$ bookkeeping that decides the efficiency of a solar collector.**
:::

## 9. Radiation with convection: the two problems that are actually in your drawing

::: example The thermocouple that reads ninety kelvin low level=4 check="410"
A bare, unshielded thermocouple with $\varepsilon = 0 . 8$ measures gas at $5 0 0 \ \mathrm { {} ^ { \circ } C }$ $( 7 7 3 \ \mathrm { K } )$ in a duct whose walls are at $1 0 0 \ \mathrm { {} ^ { \circ } C }$ $( 3 7 3 \ \mathrm { K } )$ . The junction is small, so it sees the wall with $F = 1$ and the gas convects at $h = 1 0 0 \ \mathrm { W / m ^ { 2 } K }$ . At steady state what arrives by convection leaves by radiation:

$$h ( T _ { g } - T _ { j } ) = \varepsilon \sigma ( T _ { j } ^ { 4 } - T _ { w } ^ { 4 } ) \qquad 1 0 0 ( 7 7 3 - T _ { j } ) = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } ( T _ { j } ^ { 4 } - 3 7 3 ^ { 4 } )$$

**which solves to** $T _ { j } = 6 8 3 \ \mathrm { K } = \mathbf { 4 1 0 \ {} ^ { \circ } C }$ , **an error of $9 0 \ \mathrm { K }$ in the direction that will make you think the process is running cold.** **The error scales the way every radiation error scales:**

| $h \ ( \mathrm { W / m ^ { 2 } K } )$ | 5 | 20 | 50 | 100 | 300 |
|:--|--:|--:|--:|--:|--:|
| indicated temperature | $2 0 4 \ \mathrm { {} ^ { \circ } C }$ | $3 0 0 \ \mathrm { {} ^ { \circ } C }$ | $3 6 6 \ \mathrm { {} ^ { \circ } C }$ | $4 1 0 \ \mathrm { {} ^ { \circ } C }$ | $4 5 9 \ \mathrm { {} ^ { \circ } C }$ |
| error | $2 9 6 \ \mathrm { K }$ | $2 0 0 \ \mathrm { K }$ | $1 3 4 \ \mathrm { K }$ | $9 0 \ \mathrm { K }$ | $4 1 \ \mathrm { K }$ |

**There are exactly two cures, and they are the two levers of the equation.** **Raise $h$ : an aspirated (suction) thermocouple pulls the gas past the junction at forty times natural convection and cuts the error by a factor of four — this is the standard instrument in gas-turbine test cells and furnace calibration.** **Or lower the effective $\varepsilon$ seen by the junction: a single thin radiation shield cuts the error from $9 0$ to $5 6 \ \mathrm { K }$ , three shields to $3 2 \ \mathrm { K }$ , five to $2 2 \ \mathrm { K }$ , because the shield stack multiplies the radiative resistance by $N + 1$ while leaving the convection untouched.** **Note the equivalence the table reveals: one shield is worth exactly what doubling $h$ is worth, and three shields what quadrupling it is worth — which is why a well-designed thermocouple assembly does both, and why a bare bead in a cold duct is not a measurement.**
:::

::: example The gap in a window, and the radiator behind it level=3 check="8.7"
A $1 5 \ \mathrm { mm }$ still-air cavity between two surfaces at $2 9 3$ and $2 8 3 \ \mathrm { K }$ , both $\varepsilon = 0 . 9$ . **Conduction across the gap:**

$$h _ { \text{cond } } = { \frac { k } { L } } = { \frac { 0 . 0 2 6 } { 0 . 0 1 5 } } = 1 . 7 3 \ \mathrm { W / m ^ { 2 } K } \qquad h _ { r } = 4 \varepsilon _ { \text{eff } } \sigma T _ { m } ^ { 3 } = { \frac { 4 \sigma T _ { m } ^ { 3 } } { 1 / \varepsilon _ { 1 } + 1 / \varepsilon _ { 2 } - 1 } } = { \frac { 7 . 7 9 } { 1 . 2 2 } } = 6 . 4 \ \mathrm { W / m ^ { 2 } K }$$

**Radiation carries three quarters of the heat across a gap whose whole job in the designer's mind is conduction, and the total cavity conductance is $8 . 1 \ \mathrm { W / m ^ { 2 } K }$ , which is the standard still-air-layer figure of $R = 0 . 1 1$ to $0 . 1 3 \ \mathrm { m ^ { 2 } K / W }$ that every building code uses.** **Now coat one surface with low-emissivity film, $\varepsilon = 0 . 0 5$ : $h _ { r }$ falls to $7 . 7 9 / 2 0 = 0 . 3 9$ and the cavity conductance to $2 . 1 \ \mathrm { W / m ^ { 2 } K }$ — a factor of $3 . 9$ , from a coating that costs nothing and adds no thickness.** **Evacuate the gap as well and you have a vacuum insulation panel at $0 . 0 0 4 \ \mathrm { W / m ^ { 2 } K }$ , which is why cryogenic tanks, refrigerated trucks and the thinnest high-performance building envelopes all combine the same two ideas this lesson has been about since the first page: stop the gas, and make the surfaces shiny.** **The domestic radiator case is the same arithmetic in reverse: a radiator is roughly half radiation and half natural convection, painting it with a high-emissivity coating helps only marginally because it was already at $\varepsilon = 0 . 9$ , and putting a shiny board behind it on an external wall works not by "reflecting the heat back" into the room but by lowering the emissivity of the surface the radiator radiates *to*, which is the same trick as the low-e window.**
:::

::: example A radiator in Earth orbit level=4 check="231"
A satellite carries a $1 0 \ \mathrm { m ^ { 2 } }$ radiator with solar absorptivity $\alpha _ { s } = 0 . 2 0$ and infrared emissivity $\varepsilon = 0 . 8 5$ (an optical solar reflector, or second-surface mirror — the selective surface of section 3, run backwards: white to the Sun, black to deep space). In sunlight at $1 \ \mathrm { AU }$ it sees $G = 1 3 6 1 \ \mathrm { W / m ^ { 2 } }$ on its sun-facing face, and it rejects heat from both faces to a $3 \ \mathrm { K }$ sink.

$$\alpha _ { s } G = 2 \varepsilon \sigma T ^ { 4 } \qquad \Longrightarrow \qquad T = \left( { \frac { 0 . 2 0 \times 1 3 6 1 } { 2 \times 0 . 8 5 \times 5 . 6 7 \times 1 0 ^ { - 8 } } } \right) ^ { 1 / 4 } = \mathbf { 2 3 1 \ K } \ ( - 4 2 \ \mathrm { {} ^ { \circ } C } )$$

**If the same panel is mounted so that only its back face radiates, the equilibrium is $2 7 4 \ \mathrm { K }$ ; if it were painted white paint $( \alpha _ { s } = 0 . 2 5$ , $\varepsilon = 0 . 9 0 )$ it would run at $2 4 0 \ \mathrm { K }$ ; and if it were accidentally painted black $( \alpha _ { s } = \varepsilon = 0 . 9 0 )$ it would settle at $3 3 1 \ \mathrm { K }$ , $+ 5 8 \ \mathrm { {} ^ { \circ } C }$ , and cook the batteries behind it.** **The entire thermal design of every spacecraft ever flown is this one ratio, $\alpha _ { s } / \varepsilon$ , multiplied by the fluxes of the orbit — and the fact that a coat of paint changes the answer by a hundred kelvin is why thermal-control engineers are not allowed to let anyone paint anything without asking.**
:::

::: widget plot
title: Radiation is not a coefficient — but when you must, here it is
f: 4*0.8*5.67e-8*pow(x,3); 4*0.05*5.67e-8*pow(x,3)
x: 250,1600
y: 0,700
labels: mean temperature (K); radiation heat-transfer coefficient (W/m2K); emissivity 0.8 (paint, oxide, brick); emissivity 0.05 (polished metal); ;
caption: The linearised radiation coefficient $h _ { r } = 4 \varepsilon \sigma T _ { m } ^ { 3 }$ against temperature. **Read the shape: $h _ { r }$ grows as the cube of absolute temperature, so it crosses the natural-convection range $( 2$ to $8 \ \mathrm { W / m ^ { 2 } K } )$ at about $3 5 0 \ \mathrm { K }$ , matches good forced convection by water $( 1 0 0$ to $2 0 0 )$ near $9 5 0 \ \mathrm { K }$ , and at $1 5 0 0 \ \mathrm { K }$ is worth $6 0 0 \ \mathrm { W / m ^ { 2 } K }$ — more than an impinging water jet.** **The two curves are the same temperature apart by a factor of sixteen, which is the whole economic case for polished shields, shiny insulation jackets and low-emissivity coatings: at high temperature you cannot out-fan radiation, but you can out-reflect it.** **Use $h _ { r }$ only for small temperature differences and never for a flux calculation — the coefficient is a convenience, the fourth power is the law.**
:::

## Exercises

::: exercise A hot pipe in a cold shop {#ex-pipe level=1 check="1294"}
A $8 0 \ \mathrm { m m }$ diameter, $3 \ \mathrm { m }$ long steam pipe at $4 5 0 \ \mathrm { K }$ has $\varepsilon = 0 . 9$ and runs through a shop whose walls are at $2 9 3 \ \mathrm { K }$ . Find the radiative loss. (Enter W.)
::: solution
The pipe is a small convex object in a large enclosure, so $q = \varepsilon _ { 1 } \sigma A _ { 1 } ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } )$ with $A _ { 1 } = \pi \times 0 . 0 8 \times 3 = 0 . 7 5 4 \ \mathrm { m ^ { 2 } }$ :
$$q = 0 . 9 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times 0 . 7 5 4 \times ( 4 . 1 0 \times 1 0 ^ { 1 0 } - 7 . 3 7 \times 1 0 ^ { 9 } ) = \mathbf { 1 2 9 4 \ W }$$
**Wrap it in $\varepsilon = 0 . 0 5$ polished aluminium and the same pipe loses $7 2 \ \mathrm { W }$ — a factor of eighteen, for a strip of metal foil.** **That is the entire content of the "aluminium tape on the boiler flue" folk remedy, and it works for exactly as long as the tape stays shiny, which in a dusty, greasy, condensing plant room is a year or two: the emissivity of dirty, oxidised aluminium climbs towards $0 . 3$ and most of the benefit walks out of the door with the surface condition.**
:::
:::

::: exercise Who is cooling the person? {#ex-human level=2 check="81"}
A standing person has a clothed surface area of $1 . 8 \ \mathrm { m ^ { 2 } }$ at $2 8 \ \mathrm { {} ^ { \circ } C }$ and an emissivity of $0 . 9 5$ . Find the radiative heat loss to a room whose surfaces are all at $2 0 \ \mathrm { {} ^ { \circ } C }$ . (Enter W.)
::: solution
$$q = 0 . 9 5 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times 1 . 8 \times ( 3 0 1 ^ { 4 } - 2 9 3 ^ { 4 } ) = \mathbf { 8 1 \ W }$$
**A seated adult generates about $1 0 0 \ \mathrm { W }$ of metabolic heat, so radiation alone is most of the dry loss — and it depends not on the air temperature but on the temperature of the surfaces.** **Drop the mean surface temperature to $1 5 \ \ {} ^ { \circ } \mathrm { C }$ , as happens next to single glazing on a cold night, and the radiative loss rises to $1 2 9 \ \mathrm { W }$ , an extra $4 8 \ \mathrm { W }$ that the body must replace.** **That is why people complain of a "draught" in a room with a cold wall and warm air, why under-floor heating feels comfortable at an air temperature $2$ to $3 \ \mathrm { K }$ lower than a convector does, and why the fabric-first argument for insulation is a radiation argument dressed up as an energy one.**
:::
:::

::: exercise The faces of a cube {#ex-viewfactor level=2 check="0.2"}
A closed cubical box of side $L$ . Find the view factor from one face to the opposite face, and from that same face to one of the four adjacent faces. (Enter $F _ { \text{opposite} }$ .)
::: solution
**The four side faces are equivalent by the four-fold symmetry about the axis through the base, so the summation rule on the base face gives**
$$F _ { \text{opposite} } + 4 F _ { \text{adjacent} } = 1$$
**and one tabulated or computed value fixes the other. The standard parallel-equal-squares result gives**
$$F _ { \text{opposite} } = \mathbf { 0 . 2 0 } \qquad \Longrightarrow \qquad F _ { \text{adjacent} } = ( 1 - 0 . 2 0 ) / 4 = 0 . 2 0$$
**and the tabulated adjacent-face value is $0 . 2 0 0$ as well — the two are equal to better than $0 . 1 \ \%$ for a cube, which is a numerical coincidence and not a theorem, and one worth remembering precisely because it looks like a theorem.** **Two cross-checks worth doing by hand: the inscribed-disc formula for coaxial parallel discs of radius $L / 2$ at separation $L$ gives $F = 0 . 1 7 2$ , and a square is $2 7 \ \ \%$ more area than its inscribed disc, so $0 . 2 0$ is exactly where the answer should be; and a differential element at the centre of the base sees only $0 . 1 3 9$ of the top face, less than the whole face does, because the element at the centre is the worst-placed point on the base for seeing the top.** **That last number is the practical one: a detector mounted in the middle of a furnace floor sees much less of the opposite wall than the floor's average view factor suggests, and an irradiation calculation that uses face-averaged view factors instead of element values can be out by fifty per cent.**
:::
:::

::: exercise Where the shield sits {#ex-shield level=3 check="676"}
Two large parallel plates at $8 0 0$ and $3 0 0 \ \mathrm { K }$ have $\varepsilon _ { 1 } = \varepsilon _ { 2 } = 0 . 5$ . A single polished shield with $\varepsilon _ { s } = 0 . 0 5$ on both faces is placed between them. Find the shield's equilibrium temperature. (Enter K.)
::: solution
**The shield is a floating node: what it absorbs on one face it emits from the other, and because the two halves of the circuit have identical resistance,**
$$\sigma T _ { s } ^ { 4 } = { \frac { \sigma T _ { 1 } ^ { 4 } + \sigma T _ { 2 } ^ { 4 } } { 2 } } \qquad \Longrightarrow \qquad T _ { s } = \left( { \frac { 8 0 0 ^ { 4 } + 3 0 0 ^ { 4 } } { 2 } } \right) ^ { 1 / 4 } = \mathbf { 6 7 6 \ K } \ ( 4 0 3 \ \mathrm { {} ^ { \circ } C } )$$
**Note that the shield runs much nearer the hot plate than the cold one — the fourth power means the mid-point of $\sigma T ^ { 4 }$ is not the mid-point of $T$ .** **The heat flux is $q = \sigma ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } ) / [ ( 2 + 2 - 1 ) + ( 2 0 + 2 0 - 1 ) ] = 2 2 \, 7 6 5 / 4 2 = 5 4 2 \ \mathrm { W / m ^ { 2 } }$ against $7 5 8 8 \ \mathrm { W / m ^ { 2 } }$ bare, a factor of fourteen.** **If the shield is moved from the mid-plane to hug the hot plate, the flux does not change at all — for grey surfaces in a two-surface enclosure the shield's position is irrelevant, only its emissivity and its number matter, which is a useful thing to know before spending engineering time on where to put it.**
:::
:::

::: exercise A thermocouple in a furnace {#ex-thermocouple level=3 check="451"}
A bare thermocouple with $\varepsilon = 0 . 8$ sits in a duct where the gas is at $6 0 0 \ \mathrm { {} ^ { \circ } C }$ and the refractory walls at $5 0 \ \mathrm { {} ^ { \circ } C }$ . With $h = 8 0 \ \mathrm { W / m ^ { 2 } K }$ , what does it read? (Enter $^ { \circ } \mathrm { C }$ .)
::: solution
$$8 0 ( 8 7 3 - T _ { j } ) = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } ( T _ { j } ^ { 4 } - 3 2 3 ^ { 4 } ) \qquad \Longrightarrow \qquad T _ { j } = 7 2 4 \ \mathrm { K } = \mathbf { 4 5 1 \ {} ^ { \circ } C }$$
**An error of $1 4 9 \ \mathrm { K }$ , and it is a *systematic* error that no amount of calibration will remove, because it depends on the plant's wall temperature and gas velocity, not on the instrument.** **Doubling the gas velocity ( $h$ rises as $G ^ { 0 . 6 }$ , so about $\times 1 . 5$ ) cuts the error to roughly $1 0 0 \ \mathrm { K }$ ; three shields cut it to about $5 0 \ \mathrm { K }$ ; an aspirated probe, which does both, brings it under $2 0 \ \mathrm { K }$ .** **The lesson generalises to every temperature measurement in hot plant: the number on the display is the solution of an energy balance you have not been shown, and the first question to ask is what the sensor can see.**
:::
:::

::: exercise The furnace that lost its soot {#ex-gas level=4 check="0.32"}
A furnace gas at $1 4 0 0 \ \mathrm { K }$ and $1 \ \mathrm { atm }$ contains $1 1 \ \ \% \ \mathrm { C O } _ { 2 }$ and $1 1 \ \ \% \ \mathrm { H } _ { 2 } \mathrm { O }$ and fills a chamber of volume $4 0 \ \mathrm { m ^ { 3 } }$ and surface area $8 0 \ \mathrm { m ^ { 2 } }$ . Estimate the gas emissivity seen by the walls.
::: solution
$$L _ { e } = 3 . 6 \times { \frac { 4 0 } { 8 0 } } = 1 . 8 \ \mathrm { m } \qquad p _ { c } L _ { e } = p _ { w } L _ { e } = 0 . 1 1 \times 1 . 8 = 0 . 2 0 \ \mathrm { atm \, m }$$
**From the charts at $T _ { g } = 1 4 0 0 \ \mathrm { K }$ : $\varepsilon _ { c } \approx 0 . 1 4$ , $\varepsilon _ { w } \approx 0 . 1 9$ , $\Delta \approx 0 . 0 1$ , so $\varepsilon _ { g } = 0 . 1 4 + 0 . 1 9 - 0 . 0 1 = \mathbf { 0 . 3 2 }$ .** **Now halve the chamber while keeping the temperature: $V / A$ halves, $L _ { e }$ and $p L$ halve, and the emissivity falls to about $0 . 2 4$ — a $2 5 \ \ \%$ loss of radiant duty from a geometric change that leaves the temperature untouched.** **This is the single most under-appreciated number in combustion equipment: a furnace radiates less well when it is small, a boiler pass radiates less well when it is fouled to a narrow gasway, and a burner scaled up from a test rig by a factor of three in every dimension radiates about fifty per cent better than the rig suggested.**
:::
:::

::: exercise Two panes, one coating {#ex-window level=2 check="2.7"}
Two large parallel glass panes at $2 8 3$ and $2 9 3 \ \mathrm { K }$ face each other. Find the radiative flux with both at $\varepsilon = 0 . 8 4$ and with one coated to $\varepsilon = 0 . 0 5$ . (Enter the coated value in $\mathrm { W / m ^ { 2 } }$ .)
::: solution
$$q _ { \text{bare } } = { \frac { 5 . 6 7 \times 1 0 ^ { - 8 } ( 2 9 3 ^ { 4 } - 2 8 3 ^ { 4 } ) } { 2 / 0 . 8 4 + 2 / 0 . 8 4 - 1 } } = { \frac { 5 4 . 2 } { 1 . 3 8 } } = 3 9 \ \mathrm { W / m ^ { 2 } } \qquad q _ { \text{coated } } = { \frac { 5 3 . 4 } { 1 / 0 . 8 4 + 1 / 0 . 0 5 - 1 } } = { \frac { 5 4 . 2 } { 2 0 . 2 } } = \mathbf { 2 . 7 \ W / m ^ { 2 } }$$
**A factor of fourteen, from a transparent film $1 0 0 \ \mathrm { n m }$ thick.** **Note that the coated case is not $q _ { \text{bare } } / 1 7$ even though the emissivity fell by a factor of seventeen: the denominator is $1 / \varepsilon _ { 1 } + 1 / \varepsilon _ { 2 } - 1$ , and once one surface is shiny the other one stops mattering — the resistance is $2 0 . 2$ , of which $1 8 . 8$ is the coating and $1 . 4$ the bare pair.** **This is the "one good surface is enough" rule, and it is why low-e glazing is made with a single coated face rather than two, and why a shield stack with one oxidised layer in it is nearly as bad as no stack at all.**
:::
:::

::: exercise A spacecraft panel with two coatings {#ex-spacecraft level=4 check="331"}
A horizontal $1 \ \mathrm { m ^ { 2 } }$ panel on a satellite in sunlight at $1 \ \mathrm { AU }$ faces the Sun normally and radiates from both faces to deep space. Neglect Earth albedo and infrared. Find the equilibrium temperature if the sun-facing coating has $\alpha _ { s } = 0 . 9 0$ , $\varepsilon = 0 . 9 0$ and the back face has $\varepsilon = 0 . 9 0$ . (Enter K.)
::: solution
$$0 . 9 0 \times 1 3 6 1 = 2 \times 0 . 9 0 \times 5 . 6 7 \times 1 0 ^ { - 8 } \, T ^ { 4 } \qquad \Longrightarrow \qquad T = \left( { \frac { 1 2 2 5 } { 1 . 0 2 \times 1 0 ^ { - 7 } } } \right) ^ { 1 / 4 } = \mathbf { 3 3 1 \ K } \ ( 5 8 \ \mathrm { {} ^ { \circ } C } )$$
**Replace the front coating with an optical solar reflector $( \alpha _ { s } = 0 . 2 0$ , $\varepsilon = 0 . 8 5 )$ and the same panel runs at $2 3 1 \ \mathrm { K }$ , a hundred kelvin cooler, with no power, no moving parts and no maintenance.** **Note what the answer does not depend on: the panel's mass, its conductivity, its thickness, or what is behind it — those set the transient and the temperature *uniformity*, not the equilibrium.** **And note the trap in the design: a coating that is white in the laboratory is not necessarily white to the Sun, because $\alpha _ { s }$ is weighted by the solar spectrum while $\varepsilon$ is weighted by the panel's own $2 8 0 \ \mathrm { K }$ emission, and ultraviolet degradation in orbit moves $\alpha _ { s }$ up by $0 . 0 5$ to $0 . 1 0$ over ten years, which is why every spacecraft thermal design carries a degradation margin and a heater that can cope with it.**
:::
:::

::: proof The two-surface grey formula, from the network {#proof-network}
Derive $q = \sigma ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } ) / [ ( 1 - \varepsilon _ { 1 } ) / ( \varepsilon _ { 1 } A _ { 1 } ) + 1 / ( A _ { 1 } F _ { 1 2 } ) + ( 1 - \varepsilon _ { 2 } ) / ( \varepsilon _ { 2 } A _ { 2 } ) ]$ for two grey diffuse surfaces that see only each other, and show that it reduces to the parallel-plate, concentric-cylinder and small-object limits quoted in the lesson.
::: solution
**At each surface the radiosity balance $J = \varepsilon \sigma T ^ { 4 } + ( 1 - \varepsilon ) G$ can be rearranged, using $q _ { i } = A _ { i } ( J _ { i } - G _ { i } )$ , into the form of Ohm's law between the blackbody potential and the radiosity node:**
$$q _ { i } = { \frac { \sigma T _ { i } ^ { 4 } - J _ { i } } { ( 1 - \varepsilon _ { i } ) / ( \varepsilon _ { i } A _ { i } ) } }$$
**and the radiation that leaves surface 1 and reaches surface 2 minus the radiation that leaves 2 and reaches 1 gives**
$$q = { \frac { J _ { 1 } - J _ { 2 } } { 1 / ( A _ { 1 } F _ { 1 2 } ) } } \ , \qquad F _ { 1 2 } = F _ { 2 1 } = 1 \ \text{for a two-surface enclosure}$$
**Adding the three voltage drops and setting the total to $\sigma T _ { 1 } ^ { 4 } - \sigma T _ { 2 } ^ { 4 }$ gives the formula. The three limits are then arithmetic: parallel plates have $A _ { 1 } = A _ { 2 }$ , so the denominator becomes $( 1 / \varepsilon _ { 1 } + 1 / \varepsilon _ { 2 } - 1 ) / A$ ; concentric cylinders have $A _ { 1 } F _ { 1 2 } = A _ { 1 }$ and $A _ { 2 } = A _ { 1 } ( D _ { 2 } / D _ { 1 } ) ^ { 2 }$ , giving the $( D _ { 1 } / D _ { 2 } ) ^ { 2 }$ factor on the outer surface term; and $A _ { 1 } / A _ { 2 } \rightarrow 0$ kills the last term entirely, leaving $q = \varepsilon _ { 1 } \sigma A _ { 1 } ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } )$ .** **One caution the derivation makes obvious and the formulas do not: the result assumes each surface is *uniformly* isothermal and of uniform emissivity. Two plates at uniform but different temperatures joined by a conducting wall, or a surface partly coated, need the multi-node network — the same three resistances replicated across the area and solved as a circuit, which is exactly what every radiation-solving computer code does.**
:::
:::

::: proof Kirchhoff's law, and why $\alpha$ need not equal $\varepsilon$ {#proof-kirchhoff}
Prove that $\varepsilon _ { \lambda } = \alpha _ { \lambda }$ at a given wavelength and direction from the second law, and then construct the counter-example that makes a selective surface possible.
::: solution
**Put a body of area $A$ , spectral directional absorptivity $\alpha _ { \lambda }$ and emissivity $\varepsilon _ { \lambda }$ inside an isothermal cavity at the same temperature $T$ . The cavity irradiates it with blackbody radiation $E _ { b \lambda } ( T )$ , and the net exchange at wavelength $\lambda$ is**
$$q _ { \lambda } = A \, \alpha _ { \lambda } \, E _ { b \lambda } ( T ) \, d \lambda - A \, \varepsilon _ { \lambda } \, E _ { b \lambda } ( T ) \, d \lambda$$
**If $\alpha _ { \lambda } > \varepsilon _ { \lambda }$ the body absorbs more than it emits in that one band while everything else is at the same temperature, and it would heat up spontaneously — a perpetual motion machine of the second kind, since the excess could be drawn off as work by a reversible engine running between the body and the cavity it sits in.** **The inequality in the other direction is equally forbidden, so $\alpha _ { \lambda } = \varepsilon _ { \lambda }$ , and because the argument applies to each wavelength and each direction separately the equality is the *spectral, directional* one.** **The counter-example is now immediate: the total absorptivity is $\alpha = \int \alpha _ { \lambda } G _ { \lambda } d \lambda / G$ and the total emissivity is $\varepsilon = \int \varepsilon _ { \lambda } E _ { b \lambda } ( T _ { s } ) d \lambda / \sigma T _ { s } ^ { 4 }$ , and these two integrals are weighted by *different functions*.** **Take $\alpha _ { \lambda } = \varepsilon _ { \lambda } = 0 . 9 5$ for $\lambda < 3 \ \mu \mathrm { m }$ and $0 . 1 0$ beyond, a surface that obeys Kirchhoff perfectly at every wavelength. Illuminated by a $5 8 0 0 \ \mathrm { K }$ source, $9 9 \ \ \%$ of whose energy is below $4 \ \mu \mathrm { m }$ , it has $\alpha \approx 0 . 9 4$ ; emitting at $3 5 0 \ \mathrm { K }$ , at which essentially all its emission is above $4 \ \mu \mathrm { m }$ , it has $\varepsilon \approx 0 . 1 0$ .** **The two numbers differ by a factor of nine without breaking a single law, and that single sentence is the physics of solar thermal power, of low-emissivity glazing, of the white-painted water tank that stays cool in the sun, and of the Earth's climate.**
:::
:::

::: quiz The radiator myth {#quiz-myth}
Two identical radiators in identical rooms are painted with the same high-temperature enamel, one black and one white. Which gives more heat to the room?
- [ ] The black one, because it is a better emitter
- [x] Both the same, because both have $\varepsilon \approx 0 . 9$ in the thermal infrared
- [ ] The white one, because it reflects
- [ ] Neither — paint does not affect heat transfer at all

::: solution
**Both the same.** **Paints are dielectric-pigment films in a binder, and both are essentially black at the $1 0 \ \mu \mathrm { m }$ wavelengths at which a $6 0 \ \mathrm { {} ^ { \circ } C }$ radiator emits: $\varepsilon \approx 0 . 9 2$ for white and $0 . 9 6$ for black, a $4 \ \ \%$ difference in emissivity and no difference you can feel.** **The myth survives because it confuses the visible and the infrared: in the *solar* spectrum white and black differ by a factor of five in absorptivity, which is why a black car roof is hotter than a white one — but a radiator is not being illuminated by the Sun, it is emitting at its own temperature.** **The corollary that is true: painting a *polished metal* radiator with any paint at all roughly doubles its output, because you have changed $\varepsilon$ from $0 . 0 5$ to $0 . 9$ , and the colour is irrelevant.**
:::
:::

::: quiz Where the error is {#quiz-error}
A thermocouple in a duct reads $8 0 \ \mathrm { K }$ below the true gas temperature. Doubling which of these reduces the error the most?
- [ ] The thermocouple wire diameter
- [x] The gas velocity past the junction
- [ ] The duct wall thickness
- [ ] The length of the thermocouple sheath

::: solution
**Doubling the velocity raises $h$ (as $G ^ { 0 . 6 }$ , so about $1 . 5 \times$ ) and the error is roughly proportional to $1 / ( 1 + h / 4 \varepsilon \sigma T ^ { 3 } )$ , so it falls by a third or more.** **Wire diameter and sheath length change the *response time* and the conduction error along the sheath, not the radiation error — and confusing those two error mechanisms is the classic mistake.** **The single best answer in practice is neither: an aspirated shield raises the velocity and shields the radiation at once, and a shield alone is worth more than any plausible increase in velocity.**
:::
:::

## Where this lesson leads

- **[[heat-transfer/external-convection|Forced convection in external flow]]** and **[[heat-transfer/internal-convection|internal convection]]** supply the convective half of every problem in sections 8 and 9, where the surface temperature is set by the balance of the two.
- **[[heat-transfer/boiling-condensation|Boiling and condensation]]** is where radiation meets phase change: the radiative flux to a water-wall tube sets the boiling duty of a boiler, and the same $\alpha _ { g }$ , $\varepsilon _ { g }$ arithmetic sizes the furnace.
- **[[heat-transfer/natural-convection|Natural convection]]** couples to radiation everywhere a hot surface sits in a cold room, and the two are combined as $h _ { c } + h _ { r }$ across a gap — the arithmetic of the window example.
- **[[heat-transfer/heat-exchangers|Heat exchangers]]** is the design method for the convective machines; radiation is what you add when the hot side is a gas above $8 0 0 \ \mathrm { K }$ , where the radiative term exceeds the convective one.
- **[[heat-transfer/fins|Extended surfaces]]** changes character entirely under radiation: a fin that loses heat as $T ^ { 4 }$ rather than $T$ no longer has an exponential temperature profile, and radiative fins are the classic non-linear boundary-value problem.
- **[[heat-transfer/steady-conduction|Steady conduction]]** with a radiative boundary condition is the equation that actually sets the temperature of a furnace wall, a turbine blade and a re-entry panel.
- **[[thermodynamics/second-law|The second law]]** is where Kirchhoff's proof lives, and **[[thermodynamics/entropy|entropy]]** is where the photon-gas argument that gives the fourth power, and the radiation pressure $p = u / 3$ behind it, comes from.
- **[[energy-systems/gas-turbines-combined-cycles|Gas turbines and combined cycles]]**, **[[energy-systems/solar-energy|Solar energy]]** and **[[energy-systems/energy-economics-emissions|energy economics]]** are the applications in which this lesson is the whole of the design problem: a solar receiver, a heat-recovery steam generator's first pass, and every furnace efficiency number you will ever quote.

::: history Radiation, from a forge to a quantum
| Year | Event |
|:--|:--|
| 1791 | **William Herschel** passes sunlight through a prism and places a thermometer beyond the red end; it rises. He has discovered infrared radiation, and named it "calorific rays", twenty-six years before the visible spectrum is connected to heat. |
| 1800 | **Herschel's contemporary, the Reverend William Pictet**, and independently **John Leslie**, show that radiation is reflected by polished surfaces and absorbed by dark ones, and that the effect is not due to warmed air — the first quantitative evidence that radiation is a distinct mechanism. |
| 1822 | **Joseph Fourier**, in the *Théorie analytique de la chaleur*, writes the radiative boundary condition $k \partial T / \partial n = \varepsilon \sigma ( T ^ { 4 } - T _ { \text{sur } } ^ { 4 } )$ in all but the numerical value of the constant, and notes that the fourth power is "indicated by experiment". |
| 1859–1862 | **Gustav Kirchhoff** introduces the word *black body*, proves $\alpha _ { \lambda } = \varepsilon _ { \lambda }$ from the second law, and shows that the solar spectrum's dark lines are the same wavelengths the element emits — spectroscopy and radiation theory are born in the same three papers. |
| 1879 | **Josef Stefan**, fitting John Tyndall's and his own measurements of platinum at up to $1 9 0 0 \ \mathrm { {} ^ { \circ } C }$ , announces the empirical $T ^ { 4 }$ law. **1884: Ludwig Boltzmann** derives it from thermodynamics and the radiation pressure $p = u / 3$ that he predicted — later measured by Lebedew and by Nichols and Hull, and one of the few predictions of classical theory confirmed by direct mechanical measurement. |
| 1893–1896 | **Wilhelm Wien** derives the displacement law and a short-wavelength spectrum formula; **Otto Lummer and Ernst Pringsheim**, and independently **Heinrich Rubens and Ferdinand Kurlbaum**, measure the spectrum precisely and show Wien's formula fails at long wavelengths — "the most beautiful of all failures in physics", because it is the failure Planck is asked to explain. |
| 1900 | **Max Planck**, on 14 December, presents the interpolation formula that fits every data point by assuming the oscillator energy is quantised in units of $h \nu$ . Radiation theory becomes quantum mechanics; $\sigma$ , $C _ { 1 }$ and $C _ { 2 }$ become combinations of $h$ , $c$ and $k$ . |
| 1901 | **Walter Baumgartl and Ludwig Prandtl's school** begin measuring total hemispherical emissivities of metals and oxides; the tables of engineering emissivities, with their notorious twenty-fold spread for the same metal, date from this programme and from **Forbes's and Tyndall's** earlier English work. |
| 1911–1931 | **H. C. Hottel and the German school (Schmidt, Eckert)** attack gas radiation in furnaces: the band spectra of $\mathrm { C O } _ { 2 }$ and $\mathrm { H } _ { 2 } \mathrm { O }$ , the mean beam length, and the Leiden and Hottel emissivity charts that every boiler designer uses until the 1970s and most still use today. |
| 1931–1940 | **H. C. Hottel formalises the crossed-strings rule and the network method**, turning radiation exchange between real enclosures into a drawing-and-arithmetic exercise; **M. Jakob's** *Heat Transfer* (1949) fixes the presentation this lesson follows. |
| 1945–1960 | **Selective surfaces and space engineering**: the U.S. and Soviet programmes produce cermet and black-chrome coatings with $\alpha / \varepsilon > 1 0$ for solar collectors, and **aluminised Mylar, beta-cloth and optical solar reflectors** for the first satellites; **the Dewar flask, invented in 1892 to study liquid air, becomes an engineering product with multilayer insulation for liquid hydrogen and helium.** |
| 1965 | **Penzias and Wilson measure the $2 . 7 \ \mathrm { K }$ cosmic background** — the coldest and most perfect blackbody in existence, and the radiation sink that every spacecraft thermal design is written against. |
| 1970s–present | **Low-emissivity glazing, vacuum insulation panels, radiative cooling films, and passive daytime radiative cooling** that sends heat through the $8$–$1 3 \ \mu \mathrm { m }$ window to deep space by day; **and the greenhouse calculation of section 8**, which is the same band-by-band bookkeeping applied to a planet. |
:::

::: summary
- **Radiation is electromagnetic, needs no medium, travels in straight lines, and goes as $T ^ { 4 }$ .** $q = \varepsilon \sigma A ( T _ { s } ^ { 4 } - T _ { \text{sur } } ^ { 4 } )$ ; the surroundings are a *surface* with a temperature of their own, not the air temperature.
- **Three blackbody laws:** Planck gives the spectrum, Wien's $\lambda _ { \max } T = 2 8 9 8 \ \mu \mathrm { m \, K }$ gives where it is, Stefan–Boltzmann's $E _ { b } = \sigma T ^ { 4 }$ gives how much. **Band fractions from the $\lambda T$ table decide what matters:** the Sun is $4 3 \ \%$ visible and $9 9 \ \%$ below $4 \ \mu \mathrm { m }$ ; a $3 0 0 \ \mathrm { K }$ surface is essentially $1 0 0 \ \%$ above $4 \ \mu \mathrm { m }$ .
- **Kirchhoff's law is spectral and directional: $\alpha _ { \lambda } = \varepsilon _ { \lambda }$ .** Total $\alpha$ and total $\varepsilon$ differ whenever the source and the surface are at different temperatures — which is what makes selective surfaces, low-e glass, solar thermal power and the greenhouse effect possible.
- **Polished metals: $\varepsilon \sim 0 . 0 2$ to $0 . 1$ , rising with temperature. Non-metals, oxides, paints, skin, water: $0 . 8$ to $0 . 9 8$ , and white paint is black in the infrared.** Emissivity is a surface *condition*, not a material constant.
- **View factors from reciprocity, summation, symmetry and crossed strings.** $A _ { i } F _ { i j } = A _ { j } F _ { j i }$ ; $\sum _ { j } F _ { i j } = 1$ over a closed enclosure; convex surfaces see nothing of themselves.
- **The network method: potentials $\sigma T ^ { 4 }$ , surface resistance $( 1 - \varepsilon ) / ( \varepsilon A )$ , space resistance $1 / ( A _ { 1 } F _ { 1 2 } )$ .** Three limits: parallel plates, concentric cylinders, and — the one you will use most — a small object in a large enclosure, $q = \varepsilon _ { 1 } \sigma A _ { 1 } ( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } )$ , where the enclosure's emissivity drops out entirely.
- **Shields multiply the resistance and cost nothing.** $N$ low- $\varepsilon$ shields cut the flux by roughly $1 / ( 1 + N ( 2 / \varepsilon _ { s } - 1 ) / ( 1 / \varepsilon _ { 1 } + 1 / \varepsilon _ { 2 } - 1 ) )$ ; they must be thermally isolated and kept clean, and their position between two grey surfaces does not matter.
- **Gases radiate only if the molecule has a dipole that can vibrate:** $\mathrm { C O } _ { 2 }$ , $\mathrm { H } _ { 2 } \mathrm { O }$ , $\mathrm { C H } _ { 4 }$ , CO, $\mathrm { S O } _ { 2 }$ and soot do; $\mathrm { N } _ { 2 }$ and $\mathrm { O } _ { 2 }$ do not. Emissivity depends on $p L$ and the mean beam length $L _ { e } = 3 . 6 V / A$ , and $\alpha _ { g } > \varepsilon _ { g }$ when the gas is hotter than the wall.
- **Linearise only to think, never to size:** $h _ { r } = 4 \varepsilon \sigma T _ { m } ^ { 3 } = 4 . 9$ , $2 3$ , $9 3$ , $1 8 1$ , $6 1 2 \ \mathrm { W / m ^ { 2 } K }$ at $3 0 0$ , $5 0 0$ , $8 0 0$ , $1 0 0 0$ , $1 5 0 0 \ \mathrm { K }$ . **Radiation is a rounding error near room temperature, comparable to natural convection at $3 5 0 \ \mathrm { K }$ , and the dominant term in everything above $8 0 0 \ \mathrm { K }$ .**
- **The two problems this lesson exists to solve:** how much heat a hot object loses (radiation plus convection, with the surfaces setting the radiation), and how to stop it (evacuate the gas, make the surfaces shiny, interpose floating shields) — the same two levers in a thermos flask, a spacecraft blanket, a furnace lining, a double glazing unit and a planet's atmosphere.
:::

## Further reading

- **M. F. Modest & S. Mazumder**, *Radiative Heat Transfer*, 4th ed. (Academic Press, 2021) — the reference for participating media, the radiative-transfer equation, and every solution method in sections 4 to 8; the book you need when the network method stops working.
- **R. Siegel & J. R. Howell**, *Thermal Radiation Heat Transfer*, 6th ed. (CRC Press, 2016) — the view-factor catalogue, the enclosure networks, and the definitive treatment of the grey and non-grey assumptions.
- **H. C. Hottel & D. B. Saraf**, "Tables of the Radiant-Heat Transfer Between Gases and Walls", *Thermal Radiative Transfer* (1967) — the gas-emissivity charts, still the method of most boiler codes.
- **J. R. Howell, M. P. Mengüç & R. Siegel**, *Thermal Radiation Heat Transfer* companion website (View Factor Catalogue) — every view factor formula and the numerical Monte-Carlo and ray-tracing tools that have replaced the charts.
- **A. Bejan**, *Heat Transfer* (Wiley, 1993), chapters 15–17 — the cleanest derivation of the network method and of the radiation–convection coupled problems anywhere in the literature.
- **E. R. G. Eckert & R. M. Drake**, *Analysis of Heat and Mass Transfer* (McGraw-Hill, 1972) — the classic treatment of emissivity data and its scatter, with the cautionary tables that stop you quoting a third decimal place.
- **NASA Spacecraft Thermal Control Handbook**, Vol. I (The Aerospace Press, 2003), chapter on coatings and radiators — the definitive table of $\alpha _ { s }$ , $\varepsilon$ and their degradation for every space-qualified surface finish in service.
