Fatigue is the failure of a material under cyclic loading, and the failure occurs at a stress level that is well below the material's yield strength. **The shaft that breaks at 40 % of its yield strength after 10 million cycles is not a material failure; it is a fatigue failure, and the fatigue failure is the reason 80–90 % of all mechanical failures are fatigue failures.** The fatigue failure is insidious: the crack initiates at a stress concentration (the fillet, the hole, the thread, the inclusion), grows slowly with each cycle, and then propagates catastrophically when the remaining cross-section is too small to carry the load. **The engineer who designs to the static yield strength without considering the fatigue is designing a component that will fail at a stress level that the static analysis says is safe.**

The quantitative tools of fatigue design are the **S-N curve** (the stress-life approach), the **endurance limit** (the stress below which the material does not fail), the **mean stress correction** (the Goodman, Soderberg, and ASME criteria), the **Miner's rule** (the cumulative damage rule), and the **fatigue crack growth** (the da/dN approach). The tools are the language in which the fatigue decision is expressed, and the language is the reason the fatigue design is a calculation, not a guess.

::: warning Nine ways fatigue design goes wrong
**Not checking the fatigue.** The engineer who designs the shaft to the static yield strength without checking the fatigue is not designing the shaft; they are designing a fatigue test specimen. **The shaft that is sized by the static yield strength will fail by fatigue at 40–60 % of the yield strength, and the failure is the reason the fatigue check is mandatory for every cyclically loaded component.** **Ignoring the mean stress.** The engineer who uses the fully reversed S-N curve ($R = - 1$) for a component with a nonzero mean stress is not being conservative; they are being wrong. **The tensile mean stress reduces the fatigue life, and the reduction is the reason the Goodman, Soderberg, and ASME criteria are applied to the mean stress correction.** **Not accounting for the stress concentration.** The engineer who uses the nominal stress amplitude without the fatigue stress concentration factor $K _ { f }$ is not designing the component; they are designing the nominal section. **The fatigue stress concentration factor $K _ { f }$ reduces the fatigue strength by 30–70 %, and the reduction is the reason the fatigue crack initiates at the fillet, the hole, and the thread.** **Not accounting for the surface finish.** The engineer who uses the polished-specimen S-N curve for a machined component is not being conservative; they are being wrong. **The machined surface has a fatigue strength that is 10–30 % lower than the polished surface, and the reduction is the reason the surface finish factor $k _ { a }$ is applied to the endurance limit.** **Not accounting for the size effect.** The engineer who uses the small-specimen S-N curve for a large component is not being conservative; they are being wrong. **The large component has a fatigue strength that is 10–20 % lower than the small specimen, and the reduction is the reason the size factor $k _ { b }$ is applied to the endurance limit.** **Not accounting for the load type.** The engineer who uses the bending S-N curve for an axially loaded component is not being conservative; they are being wrong. **The axial loading has a fatigue strength that is 15 % lower than the bending, and the reduction is the reason the loading factor $k _ { c }$ is applied to the endurance limit.** **Not accounting for the temperature.** The engineer who uses the room-temperature S-N curve for a component operating at 500 °C is not designing for the temperature; they are designing for the room. **The fatigue strength at 500 °C is 50–70 % of the room-temperature fatigue strength, and the reduction is the reason the temperature factor $k _ { d }$ is applied to the endurance limit.** **Not using Miner's rule for variable amplitude loading.** The engineer who designs for a single stress amplitude when the component experiences a spectrum of amplitudes is not designing for the spectrum; they are designing for the worst case. **Miner's rule sums the damage fractions $n _ { i } / N _ { i }$ , and the sum is the reason the variable amplitude loading is handled by the cumulative damage approach.** **Not checking the fatigue safety factor.** The engineer who calculates the fatigue life without the safety factor is not designing the component; they are predicting the life. **The fatigue safety factor (typically 1.5–3) accounts for the scatter in the S-N data, the uncertainty in the loading, and the consequence of failure, and the safety factor is the reason the fatigue design is conservative.**
:::

## 1. The S-N curve and the endurance limit

::: definition The S-N curve and the fatigue life {#def-sn-curve}
The **S-N curve** (stress-life curve, Wöhler curve) is the relationship between the stress amplitude $S _ { a }$ and the number of cycles to failure $N$ :

$$
S _ { a } \; = \; S _ { f } ^ { \prime } \, ( 2 N _ { f } ) ^ { b } \quad \Longleftrightarrow \quad \log S _ { a } \; = \; \log S _ { f } ^ { \prime } + b \, \log ( 2 N _ { f } )
$$

where $S _ { f } ^ { \prime }$ is the fatigue strength coefficient and $b$ is the fatigue exponent.

$$
\begin{array} { l c c c }
\textbf{Material} & \textbf{ } S _ { u t } \textbf{ (MPa)} & \textbf{Endurance limit } S _ { e } \textbf{ (MPa)} & \textbf{Ratio } S _ { e } / S _ { u t } \\ \hline
\text{Mild steel (AISI 1020)} & 380 & 170 & 0 . 4 5 \\
\text{Medium carbon steel (1045)} & 570 & 260 & 0 . 4 6 \\
\text{Alloy steel (4140)} & 655 & 300 & 0 . 4 6 \\
\text{Aluminium (7075-T6)} & 503 & 160 & 0 . 3 2 \\
\text{Aluminium (6061-T6)} & 310 & 97 & 0 . 3 1 \\
\text{Titanium (Ti-6Al-4V)} & 950 & 500 & 0 . 5 3 \\
\text{Cast iron (gray)} & 250 & 100 & 0 . 4 0 \\
\text{Copper} & 220 & 65 & 0 . 3 0 \\
\end{array}
$$

**The endurance limit is the stress amplitude below which the material does not fail, regardless of the number of cycles. The endurance limit exists for ferrous metals (steel, titanium) and does not exist for non-ferrous metals (aluminium, copper, magnesium). The engineer who designs an aluminium component for "infinite life" is designing for a life that does not exist.**
:::

::: definition The endurance limit and the Marin factors {#def-marin-factors}
The **endurance limit** of the component is the endurance limit of the laboratory specimen multiplied by the Marin factors:

$$
S _ { e } \; = \; k _ { a } \, k _ { b } \, k _ { c } \, k _ { d } \, k _ { e } \, k _ { f } \; \times \; S _ { e } ^ { \prime }
$$

where $S _ { e } ^ { \prime }$ is the endurance limit of the laboratory specimen (typically $S _ { e } ^ { \prime } = 0 . 5 \, S _ { u t }$ for steel).

$$
\begin{array} { l l l l }
\textbf{Factor} & \textbf{Name} & \textbf{Typical value} & \textbf{Reason} \\ \hline
k _ { a } & \text{Surface finish} & 0 . 7 \text{--} 1 . 0 & \text{Machined surface has lower fatigue strength} \\
k _ { b } & \text{Size} & 0 . 7 \text{--} 1 . 0 & \text{Larger component has lower fatigue strength} \\
k _ { c } & \text{Load type} & 0 . 7 \text{--} 1 . 0 & \text{Axial loading has lower fatigue strength than bending} \\
k _ { d } & \text{Temperature} & 0 . 6 \text{--} 1 . 0 & \text{High temperature reduces fatigue strength} \\
k _ { e } & \text{Reliability} & 0 . 7 5 \text{--} 1 . 0 & \text{Higher reliability requires lower stress} \\
k _ { f } & \text{Miscellaneous} & 0 . 5 \text{--} 1 . 0 & \text{Corrosion, residual stress, etc.} \\
\end{array}
$$

**The Marin factors reduce the endurance limit by 30–60 %, and the reduction is the reason the component's fatigue strength is much lower than the laboratory specimen's fatigue strength. The engineer who uses the laboratory specimen's endurance limit without the Marin factors is not being conservative; they are being wrong.**
:::

::: definition The fatigue stress concentration factor {#def-fatigue-kt}
The **fatigue stress concentration factor** ($K _ { f }$) is the ratio of the fatigue strength of the smooth specimen to the fatigue strength of the notched specimen:

$$
K _ { f } \; = \; 1 + q \, ( K _ { t } - 1 )
$$

where $K _ { t }$ is the theoretical stress concentration factor and $q$ is the **notch sensitivity**:

$$
q \; = \; { \frac { 1 } { 1 + { \sqrt { a / r } } } } \quad \text{with } a = \left( { \frac { S _ { u t } } { 2 0 } } \right) ^ { 2 } \quad \text{(Neuber)}
$$

$$
\begin{array} { l c c c }
\textbf{Material} & \textbf{ } S _ { u t } \textbf{ (MPa)} & \textbf{Notch sensitivity } q & \textbf{ } K _ { f } / K _ { t } \\ \hline
\text{Mild steel} & 3 8 0 & 0 . 6 & 0 . 7 5 \\
\text{Medium carbon steel} & 5 7 0 & 0 . 8 & 0 . 8 7 \\
\text{Alloy steel (4140)} & 6 5 5 & 0 . 9 & 0 . 9 4 \\
\text{High strength steel} & 1 5 0 0 & 1 . 0 & 1 . 0 0 \\
\text{Aluminium (7075-T6)} & 5 0 3 & 0 . 9 & 0 . 9 4 \\
\text{Cast iron} & 2 5 0 & 0 . 4 & 0 . 6 0 \\
\end{array}
$$

**The notch sensitivity $q$ ranges from 0 (no notch effect, $K _ { f } = 1$ ) to 1 (full notch effect, $K _ { f } = K _ { t }$ ). The high-strength steel has $q \approx 1$ , which means the high-strength steel is fully notch-sensitive, and the notch sensitivity is the reason the high-strength steel is not always better than the low-strength steel in fatigue.**
:::

::: widget plot
title: The S-N curve for steel and aluminium
f: 500*x^-0.085; 250*x^-0.077
x: 1000,10000000
y: 50,600
labels: Steel (endurance limit); Aluminium (no endurance limit)
caption: The S-N curve (stress amplitude vs number of cycles) for steel (with an endurance limit) and aluminium (without an endurance limit). **The steel curve flattens at $1 0 ^ { 6 }$ cycles, and the flattening is the endurance limit. The aluminium curve continues to decrease, and the decrease is the reason aluminium has no endurance limit.** **The fatigue strength at $1 0 ^ { 7 }$ cycles is the design basis for aluminium components, and the design basis is the reason the aluminium component is designed for a finite life, not an infinite life.**
:::

::: example S-N curve calculation {#ex-sn-curve level=3 check="2"}
A steel component has $S _ { u t } = 7 0 0$ MPa, a machined surface, a diameter of 40 mm, and is loaded in bending. The Marin factors are $k _ { a } = 0 . 8 3$ , $k _ { b } = 0 . 8 4$ , $k _ { c } = 1 . 0$ , $k _ { d } = 1 . 0$ , $k _ { e } = 0 . 8 7$ . Calculate the endurance limit and the fatigue strength at $1 0 ^ { 5 }$ cycles.

**Endurance limit of the specimen:**

$$
S _ { e } ^ { \prime } \; = \; 0 . 5 \times S _ { u t } \; = \; 0 . 5 \times 7 0 0 \; = \; 3 5 0 \ \text{MPa}
$$

**Endurance limit of the component:**

$$
S _ { e } \; = \; 0 . 8 3 \times 0 . 8 4 \times 1 . 0 \times 1 . 0 \times 0 . 8 7 \times 3 5 0 \; = \; { \bf 2 1 3 } \ \text{MPa}
$$

**Fatigue strength at $1 0 ^ { 5 }$ cycles:**

$$
S _ { f } \; = \; S _ { e } \times ( 2 N ) ^ { b } / ( 2 \times 1 0 ^ { 6 } ) ^ { b } \quad \text{where } b = - { \frac { 1 } { 3 } } \log ( f \, S _ { u t } / S _ { e } )
$$

For $f = 0 . 8$ :

$$
b \; = \; - { \frac { 1 } { 3 } } \log \left( { \frac { 0 . 8 \times 7 0 0 } { 2 1 3 } } \right) \; = \; - { \frac { 1 } { 3 } } \log ( 2 . 6 3 ) \; = \; - 0 . 1 4 0
$$

$$
S _ { f } ( 1 0 ^ { 5 } ) \; = \; 2 1 3 \times \left( { \frac { 2 \times 1 0 ^ { 5 } } { 2 \times 1 0 ^ { 6 } } } \right) ^ { - 0 . 1 4 0 } \; = \; 2 1 3 \times ( 0 . 1 ) ^ { - 0 . 1 4 0 } \; = \; 2 1 3 \times 1 . 3 8 \; = \; { \bf 2 9 4 } \ \text{MPa}
$$

**The fatigue strength at $1 0 ^ { 5 }$ cycles (294 MPa) is 38 % higher than the endurance limit (213 MPa), and the difference is the reason the component can withstand a higher stress for a shorter life.**
:::

## 2. Mean stress correction

::: definition The Goodman, Soderberg, and ASME criteria {#def-mean-stress}
The **mean stress correction** accounts for the effect of the mean stress on the fatigue strength. The three criteria are:

**Goodman criterion:**

$$
{ \frac { S _ { a } } { S _ { e } } } + { \frac { S _ { m } } { S _ { u t } } } \; = \; { \frac { 1 } { n } }
$$

**Soderberg criterion:**

$$
{ \frac { S _ { a } } { S _ { e } } } + { \frac { S _ { m } } { S _ { y } } } \; = \; { \frac { 1 } { n } }
$$

**ASME criterion (with stress concentration):**

$$
{ \frac { S _ { a } } { S _ { e } / K _ { f } } } + { \frac { S _ { m } } { S _ { y } } } \; = \; { \frac { 1 } { n } }
$$

where $S _ { a }$ is the stress amplitude, $S _ { m }$ is the mean stress, $S _ { e }$ is the endurance limit, $S _ { u t }$ is the ultimate strength, $S _ { y }$ is the yield strength, and $K _ { f }$ is the fatigue stress concentration factor.

$$
\begin{array} { l c c c }
\textbf{Criterion} & \textbf{Yield check} & \textbf{Conservatism} & \textbf{Use case} \\ \hline
\text{Goodman} & \text{No} & \text{Moderate} & \text{Ductile materials, } S _ { u t } / S _ { y } < 1 . 4 \\
\text{Soderberg} & \text{Yes} & \text{Most conservative} & \text{When yielding must be prevented} \\
\text{ASME} & \text{Yes} & \text{Moderate} & \text{With stress concentration} \\
\text{Gerber} & \text{No} & \text{Least conservative} & \text{Ductile materials, } S _ { u t } / S _ { y } > 1 . 4 \\
\end{array}
$$

**The Goodman criterion is the most widely used mean stress correction in machine design, because the Goodman criterion is simple, conservative, and accurate for ductile materials. The Soderberg criterion is more conservative than the Goodman criterion, because the Soderberg criterion uses the yield strength instead of the ultimate strength.**
:::

::: widget plot
title: The mean stress correction criteria
f: 350*(1-x/700); 350*(1-x/500); 350*(1-(x/500)^2)
x: 0,700
y: 0,400
labels: Goodman; Soderberg; Gerber
caption: The mean stress correction criteria in the $S _ { m } { - } S _ { a }$ plane for a steel with $S _ { e } = 3 5 0$ MPa, $S _ { y } = 5 0 0$ MPa, and $S _ { u t } = 7 0 0$ MPa. **The Goodman line connects $( 0 , S _ { e } )$ to $( S _ { u t } , 0 )$ , and the Soderberg line connects $( 0 , S _ { e } )$ to $( S _ { y } , 0 )$ . The Gerber curve is a parabola that connects $( 0 , S _ { e } )$ to $( S _ { u t } , 0 )$ . The Soderberg line is the most conservative, and the Gerber curve is the least conservative.** **The design point $( S _ { m } , S _ { a } )$ must lie below the criterion line, and the criterion is the reason the mean stress correction is applied to every fatigue design.**
:::

::: example Goodman criterion for a shaft {#ex-goodman-shaft level=3 check="2"}
A shaft has a stress amplitude $S _ { a } = 1 2 0$ MPa and a mean stress $S _ { m } = 8 0$ MPa. The material has $S _ { e } = 2 5 0$ MPa, $S _ { y } = 4 5 0$ MPa, and $S _ { u t } = 7 0 0$ MPa. Calculate the factor of safety using the Goodman and Soderberg criteria.

**Goodman:**

$$
{ \frac { 1 2 0 } { 2 5 0 } } + { \frac { 8 0 } { 7 0 0 } } \; = \; 0 . 4 8 + 0 . 1 1 4 \; = \; 0 . 5 9 4 \; = \; { \frac { 1 } { n } }
$$

$$
n _ { \text{Goodman } } \; = \; { \frac { 1 } { 0 . 5 9 4 } } \; = \; { \bf 1 . 6 8 }
$$

**Soderberg:**

$$
{ \frac { 1 2 0 } { 2 5 0 } } + { \frac { 8 0 } { 4 5 0 } } \; = \; 0 . 4 8 + 0 . 1 7 8 \; = \; 0 . 6 5 8 \; = \; { \frac { 1 } { n } }
$$

$$
n _ { \text{Soderberg } } \; = \; { \frac { 1 } { 0 . 6 5 8 } } \; = \; { \bf 1 . 5 2 }
$$

**The Soderberg factor of safety (1.52) is 10 % lower than the Goodman factor of safety (1.68), because the Soderberg criterion uses the yield strength (450 MPa) instead of the ultimate strength (700 MPa). The 10 % is the reason the Soderberg criterion is more conservative than the Goodman criterion.**
:::

## 3. Cumulative damage and variable amplitude loading

::: definition Miner's rule and the cumulative damage {#def-miners-rule}
**Miner's rule** (Palmgren-Miner linear damage hypothesis, 1945) states that the cumulative damage is the sum of the damage fractions:

$$
D \; = \; \sum _ { i = 1 } ^ { k } { \frac { n _ { i } } { N _ { i } } }
$$

where $n _ { i }$ is the number of cycles at stress amplitude $S _ { i }$ and $N _ { i }$ is the number of cycles to failure at stress amplitude $S _ { i }$ .

The component fails when $D \ge 1$ :

$$
D \; = \; { \frac { n _ { 1 } } { N _ { 1 } } } + { \frac { n _ { 2 } } { N _ { 2 } } } + \cdots + { \frac { n _ { k } } { N _ { k } } } \; \ge \; 1
$$

**Miner's rule is linear: the damage per cycle is $1 / N _ { i }$ , and the damage is independent of the load sequence. The linearity is the reason Miner's rule is simple to apply and inaccurate for variable amplitude loading: the overload that creates a compressive residual stress at the crack tip actually slows the crack growth, and the slowing is the reason Miner's rule is non-conservative for spectrum loading.**
:::

::: definition The rainflow counting method {#def-rainflow}
The **rainflow counting method** (Matsuishi and Endo, 1968) is the standard method for converting a variable amplitude load history into a set of stress cycles $( S _ { a , i } , S _ { m , i } , n _ { i } )$ . The method is called "rainflow" because the counting algorithm simulates the flow of rainwater down a pagoda roof:

1. Identify the peaks and valleys of the load history.
2. Count the half-cycles from the outside in, following the "rainflow" path.
3. Pair the half-cycles to form full cycles.
4. Calculate the stress amplitude and mean stress for each cycle.

**The rainflow counting method is the reason the variable amplitude loading is handled by Miner's rule: the rainflow counting converts the complex load history into a set of simple cycles, and the simple cycles are the input to Miner's rule.**
:::

::: example Miner's rule for a spectrum {#ex-miner-spectrum level=3 check="2"}
A component experiences the following load spectrum:

| Stress amplitude (MPa) | Cycles applied $n_i$ | Cycles to failure $N_i$ |
|------------------------|---------------------|------------------------|
| 400 | 1 000 | 10 000 |
| 300 | 10 000 | 100 000 |
| 200 | 100 000 | 1 000 000 |

Calculate the cumulative damage and the remaining life.

$$
D \; = \; { \frac { 1 \ 0 0 0 } { 1 0 \ 0 0 0 } } + { \frac { 1 0 \ 0 0 0 } { 1 0 0 \ 0 0 0 } } + { \frac { 1 0 0 \ 0 0 0 } { 1 \ 0 0 0 \ 0 0 0 } } \; = \; 0 . 1 + 0 . 1 + 0 . 1 \; = \; { \bf 0 . 3 }
$$

**The cumulative damage is 0.3, which means the component has consumed 30 % of its fatigue life. The remaining life is 70 % of the spectrum life, and the remaining life is the reason the component can be inspected and replaced before the damage reaches 1.0.**
:::

::: widget plot
title: Miner's rule: cumulative damage vs cycles
f: x/10000; x/100000; x/1000000
x: 0,10000
y: 0,1
labels: 400 MPa; 300 MPa; 200 MPa
caption: The cumulative damage (Miner's rule) against the number of cycles for three stress amplitudes. **The damage accumulates linearly with the number of cycles, and the slope is $1 / N _ { i }$ . The component fails when the sum of the damage fractions reaches 1.0.** **The high-stress amplitude (400 MPa) accumulates damage 100× faster than the low-stress amplitude (200 MPa), and the 100× is the reason the high-stress cycles dominate the fatigue life.**
:::

## 4. Fatigue crack growth

::: definition The Paris law and the fatigue crack growth rate {#def-paris-law}
The **Paris law** (Paris and Erdogan, 1963) relates the fatigue crack growth rate to the stress intensity factor range:

$$
{ \frac { d a } { d N } } \; = \; C \, ( \Delta K ) ^ { m }
$$

where $\Delta K = K _ { \max } - K _ { \min }$ is the stress intensity factor range, and $C$ and $m$ are material constants.

$$
\begin{array} { l c c l }
\textbf{Material} & \textbf{ } C & \textbf{ } m & \textbf{Regime} \\ \hline
\text{Steel (ferritic-pearlitic)} & 1 0 ^ { - 1 1 } & 3 . 0 & \text{Paris regime} \\
\text{Aluminium (2024-T3)} & 2 . 3 \times 1 0 ^ { - 1 3 } & 3 . 2 & \text{Paris regime} \\
\text{Titanium (Ti-6Al-4V)} & 2 . 5 \times 1 0 ^ { - 1 3 } & 3 . 5 & \text{Paris regime} \\
\end{array}
$$

The **stress intensity factor range** for a through-crack of length $2 a$ in a plate of width $W$ :

$$
\Delta K \; = \; \Delta \sigma \, { \sqrt { \pi a } } \; Y \! \left( { \frac { a } { W } } \right)
$$

where $Y$ is the geometry correction factor.

**The Paris law is the reason the fatigue life is the sum of the crack initiation life and the crack propagation life: $N _ { \text{total } } = N _ { \text{initiation } } + N _ { \text{propagation } }$ . For high-strength steels, the initiation life is 90 % of the total life; for low-strength steels, the propagation life is 90 % of the total life.**
:::

::: definition The three regimes of fatigue crack growth {#def-crack-growth-regimes}
The fatigue crack growth curve has three regimes:

$$
\begin{array} { l l l l }
\textbf{Regime} & \textbf{ } \Delta K \textbf{ range} & \textbf{Behaviour} & \textbf{Mechanism} \\ \hline
\text{I (threshold)} & \Delta K < \Delta K _ { \text{th } } & \text{No growth (or very slow)} & \text{Crack closure, plasticity} \\
\text{II (Paris)} & \Delta K _ { \text{th } } < \Delta K < \Delta K _ { I c } & \text{Stable growth } ( d a / d N = C \Delta K ^ { m } ) & \text{Cyclic blunting and resharpening} \\
\text{III (fast fracture)} & \Delta K > \Delta K _ { I c } & \text{Unstable fracture} & \text{Brittle or ductile fracture} \\
\end{array}
$$

**The threshold $\Delta K _ { \text{th } }$ is the stress intensity factor range below which the crack does not grow, and the threshold is the reason the small crack is safe. The fracture toughness $K _ { I c }$ is the stress intensity factor above which the crack propagates catastrophically, and the fracture toughness is the reason the large crack fails.**
:::

::: example Fatigue crack growth life {#ex-crack-growth-life level=3 check="3"}
A steel component has an initial crack length $a _ { 0 } = 2$ mm, a final crack length $a _ { f } = 2 0$ mm, and a stress range $\Delta \sigma = 2 0 0$ MPa. The material has $C = 1 0 ^ { - 1 1 }$ , $m = 3$ , and $Y = 1$ . Calculate the fatigue crack growth life.

**Integrate the Paris law:**

$$
N \; = \; \int _ { a _ { 0 } } ^ { a _ { f } } { \frac { d a } { C \, ( \Delta \sigma \, { \sqrt { \pi a } } \, Y ) ^ { m } } } \; = \; \int _ { a _ { 0 } } ^ { a _ { f } } { \frac { d a } { C \, ( \Delta \sigma \, { \sqrt { \pi a } } ) ^ { 3 } } }
$$

$$
N \; = \; { \frac { 1 } { C \, ( \Delta \sigma ) ^ { 3 } \, \pi ^ { 3 / 2 } } } \int _ { a _ { 0 } } ^ { a _ { f } } { \frac { d a } { a ^ { 3 / 2 } } } \; = \; { \frac { 1 } { C \, ( \Delta \sigma ) ^ { 3 } \, \pi ^ { 3 / 2 } } } \left[ { \frac { - 2 } { \sqrt { a } } } \right] _ { a _ { 0 } } ^ { a _ { f } }
$$

$$
N \; = \; { \frac { 2 } { C \, ( \Delta \sigma ) ^ { 3 } \, \pi ^ { 3 / 2 } } } \left( { \frac { 1 } { \sqrt { a _ { 0 } } } } - { \frac { 1 } { \sqrt { a _ { f } } } } \right)
$$

$$
N \; = \; { \frac { 2 } { 1 0 ^ { - 1 1 } \times 2 0 0 ^ { 3 } \times \pi ^ { 1 . 5 } } } \left( { \frac { 1 } { \sqrt { 0 . 0 0 2 } } } - { \frac { 1 } { \sqrt { 0 . 0 2 } } } \right)
$$

$$
N \; = \; { \frac { 2 } { 1 0 ^ { - 1 1 } \times 8 \times 1 0 ^ { 6 } \times 1 7 . 4 9 } } \times ( 2 2 . 3 6 - 7 . 0 7 ) \; = \; { \frac { 2 } { 1 . 4 \times 1 0 ^ { 6 } } } \times 1 5 . 2 9 \; = \; { \bf 2 2 \ 0 0 0 } \ \text{cycles}
$$

**The fatigue crack growth life is 22 000 cycles. The crack grows from 2 mm to 20 mm in 22 000 cycles, and the 22 000 cycles is the reason the inspection interval must be less than 22 000 cycles.**
:::

## Exercises

::: exercise Endurance limit with Marin factors {#ex-marin level=3 check="2"}
A steel component has $S _ { u t } = 8 0 0$ MPa, a ground surface, a diameter of 25 mm, and is loaded in torsion. The Marin factors are $k _ { a } = 0 . 9 0$ , $k _ { b } = 0 . 9 1$ , $k _ { c } = 0 . 5 9$ , $k _ { d } = 1 . 0$ , $k _ { e } = 1 . 0$ . Calculate the endurance limit.

::: solution
$$
S _ { e } ^ { \prime } \; = \; 0 . 5 \times 8 0 0 \; = \; 4 0 0 \ \text{MPa}
$$

$$
S _ { e } \; = \; 0 . 9 0 \times 0 . 9 1 \times 0 . 5 9 \times 1 . 0 \times 1 . 0 \times 4 0 0 \; = \; { \bf 1 9 3 } \ \text{MPa}
$$

**The endurance limit is 193 MPa, which is 48 % of the specimen endurance limit (400 MPa). The torsion loading factor $k _ { c } = 0 . 5 9$ is the dominant factor, and the dominance is the reason the torsion-loaded component has a much lower fatigue strength than the bending-loaded component.**
:::
:::

::: exercise Fatigue stress concentration factor {#ex-ktf level=3 check="2"}
A steel component has $S _ { u t } = 9 0 0$ MPa, $K _ { t } = 2 . 5$ , and a fillet radius $r = 2$ mm. Calculate the fatigue stress concentration factor $K _ { f }$ using the Neuber equation.

::: solution
$$
a \; = \; \left( { \frac { S _ { u t } } { 2 0 } } \right) ^ { 2 } \; = \; \left( { \frac { 9 0 0 } { 2 0 } } \right) ^ { 2 } \; = \; 4 5 ^ { 2 } \; = \; 2 0 2 5 \ \mu \text{m} \; = \; 2 . 0 2 5 \ \text{mm}
$$

$$
q \; = \; { \frac { 1 } { 1 + { \sqrt { a / r } } } } \; = \; { \frac { 1 } { 1 + { \sqrt { 2 . 0 2 5 / 2 } } } } \; = \; { \frac { 1 } { 1 + 1 . 0 0 6 } } \; = \; 0 . 4 9 8
$$

$$
K _ { f } \; = \; 1 + q \, ( K _ { t } - 1 ) \; = \; 1 + 0 . 4 9 8 \times ( 2 . 5 - 1 ) \; = \; 1 + 0 . 7 4 7 \; = \; { \bf 1 . 7 5 }
$$

**The fatigue stress concentration factor (1.75) is 70 % of the theoretical stress concentration factor (2.5), because the notch sensitivity is 0.5. The 70 % is the reason the fatigue strength is reduced by 75 %, not 150 %.**
:::
:::

::: exercise Goodman criterion with stress concentration {#ex-goodman-kt level=3 check="2"}
A notched steel component has $S _ { a } = 1 5 0$ MPa, $S _ { m } = 1 0 0$ MPa, $S _ { e } = 3 0 0$ MPa, $S _ { y } = 5 0 0$ MPa, $S _ { u t } = 8 0 0$ MPa, and $K _ { f } = 2 . 0$ . Calculate the factor of safety using the ASME criterion.

::: solution
$$
{ \frac { S _ { a } } { S _ { e } / K _ { f } } } + { \frac { S _ { m } } { S _ { y } } } \; = \; { \frac { 1 5 0 } { 3 0 0 / 2 . 0 } } + { \frac { 1 0 0 } { 5 0 0 } } \; = \; { \frac { 1 5 0 } { 1 5 0 } } + 0 . 2 \; = \; 1 . 0 + 0 . 2 \; = \; 1 . 2 \; = \; { \frac { 1 } { n } }
$$

$$
n \; = \; { \frac { 1 } { 1 . 2 } } \; = \; { \bf 0 . 8 3 }
$$

**The factor of safety (0.83) is below 1.0, which means the component will fail by fatigue. The engineer must reduce the stress amplitude, increase the endurance limit (better surface finish, shot peening), or reduce the stress concentration (larger fillet radius).**
:::
:::

::: exercise Miner's rule for a spectrum {#ex-miner-spectrum-ex level=3 check="1"}
A component experiences the following load spectrum:

| Stress amplitude (MPa) | Cycles applied $n_i$ | Cycles to failure $N_i$ |
|------------------------|---------------------|------------------------|
| 500 | 500 | 5 000 |
| 400 | 5 000 | 50 000 |
| 300 | 50 000 | 500 000 |
| 200 | 500 000 | 5 000 000 |

Calculate the cumulative damage.

::: solution
$$
D \; = \; { \frac { 5 0 0 } { 5 \ 0 0 0 } } + { \frac { 5 \ 0 0 0 } { 5 0 \ 0 0 0 } } + { \frac { 5 0 \ 0 0 0 } { 5 0 0 \ 0 0 0 } } + { \frac { 5 0 0 \ 0 0 0 } { 5 \ 0 0 0 \ 0 0 0 } } \; = \; 0 . 1 + 0 . 1 + 0 . 1 + 0 . 1 \; = \; { \bf 0 . 4 }
$$

**The cumulative damage is 0.4, which means the component has consumed 40 % of its fatigue life. The remaining life is 60 % of the spectrum life.**
:::
:::

::: exercise Fatigue crack growth {#ex-crack-growth level=3 check="2"}
A steel component has $C = 1 0 ^ { - 1 2 }$ , $m = 3 . 5$ , $Y = 1$ , and $\Delta \sigma = 1 5 0$ MPa. Calculate the crack growth rate $d a / d N$ when $a = 5$ mm.

::: solution
$$
\Delta K \; = \; \Delta \sigma \, { \sqrt { \pi a } } \; = \; 1 5 0 \times { \sqrt { \pi \times 0 . 0 0 5 } } \; = \; 1 5 0 \times 0 . 1 2 5 3 \; = \; 1 8 . 8 \ \text{MPa} { \cdot } { \sqrt { \text{m} } }
$$

$$
{ \frac { d a } { d N } } \; = \; C \, ( \Delta K ) ^ { m } \; = \; 1 0 ^ { - 1 2 } \times 1 8 . 8 ^ { 3 . 5 } \; = \; 1 0 ^ { - 1 2 } \times 2 9 \ 0 0 0 \; = \; { \bf 2 . 9 \times 1 0 ^ { - 8 } } \ \text{m/cycle}
$$

**The crack growth rate is $2 . 9 \times 1 0 ^ { - 8 }$ m/cycle, which is 0.029 μm/cycle. At $1 0 ^ { 6 }$ cycles, the crack grows 29 mm, and the 29 mm is the reason the inspection interval must be less than $1 0 ^ { 6 }$ cycles.**
:::
:::

::: exercise Surface finish effect {#ex-surface-finish level=2 check="3"}
A steel component has $S _ { u t } = 7 0 0$ MPa. Compare the surface finish factor $k _ { a }$ for a polished surface ($k _ { a } = 1 . 0$ ), a machined surface ($k _ { a } = 0 . 8 3$ ), and a as-forged surface ($k _ { a } = 0 . 5 4$ ). Calculate the endurance limit for each surface finish if $S _ { e } ^ { \prime } = 3 5 0$ MPa.

::: solution
$$
S _ { e , \text{polished } } \; = \; 1 . 0 \times 3 5 0 \; = \; { \bf 3 5 0 } \ \text{MPa}
$$

$$
S _ { e , \text{machined } } \; = \; 0 . 8 3 \times 3 5 0 \; = \; { \bf 2 9 1 } \ \text{MPa}
$$

$$
S _ { e , \text{forged } } \; = \; 0 . 5 4 \times 3 5 0 \; = \; { \bf 1 8 9 } \ \text{MPa}
$$

**The as-forged surface has an endurance limit that is 54 % of the polished surface, and the reduction is the reason the surface finish is the most important factor in fatigue design. The engineer who specifies a machined surface instead of an as-forged surface increases the endurance limit by 54 %, and the increase is the reason the surface finish is the first parameter optimised in the fatigue design.**
:::
:::

::: exercise Derivation: the Goodman criterion {#ex-derive-goodman level=4 check="2"}
Show that the Goodman criterion $S _ { a } / S _ { e } + S _ { m } / S _ { u t } = 1 / n$ is derived from the linear relationship between the stress amplitude and the mean stress, connecting $( 0 , S _ { e } )$ to $( S _ { u t } , 0 )$ in the $S _ { m } { - } S _ { a }$ plane. Evaluate the factor of safety for $S _ { a } = 1 0 0$ MPa, $S _ { m } = 1 5 0$ MPa, $S _ { e } = 3 0 0$ MPa, and $S _ { u t } = 7 0 0$ MPa.

::: solution
The Goodman line connects $( 0 , S _ { e } )$ to $( S _ { u t } , 0 )$ :

$$
S _ { a } \; = \; S _ { e } \left( 1 - { \frac { S _ { m } } { S _ { u t } } } \right)
$$

Rearranging:

$$
{ \frac { S _ { a } } { S _ { e } } } + { \frac { S _ { m } } { S _ { u t } } } \; = \; 1
$$

For the design point $( S _ { m } , S _ { a } )$ with a factor of safety $n$ :

$$
{ \frac { S _ { a } } { S _ { e } } } + { \frac { S _ { m } } { S _ { u t } } } \; = \; { \frac { 1 } { n } }
$$

$$
{ \frac { 1 0 0 } { 3 0 0 } } + { \frac { 1 5 0 } { 7 0 0 } } \; = \; 0 . 3 3 3 + 0 . 2 1 4 \; = \; 0 . 5 4 8 \; = \; { \frac { 1 } { n } }
$$

$$
n \; = \; { \frac { 1 } { 0 . 5 4 8 } } \; = \; { \bf 1 . 8 3 }
$$

**The Goodman criterion is the linear mean stress correction, and the linearity is the reason the Goodman criterion is simple to apply and accurate for ductile materials.** $\blacksquare$
:::
:::

::: exercise Derivation: Miner's rule {#ex-derive-miner level=4 check="1"}
Show that Miner's rule $D = \sum n _ { i } / N _ { i }$ is derived from the linear damage hypothesis: the damage per cycle at stress amplitude $S _ { i }$ is $1 / N _ { i }$ , and the total damage is the sum of the damage fractions. Evaluate the cumulative damage for a component that experiences 1 000 cycles at 400 MPa ($N _ { 1 } = 1 0 \ 0 0 0$ ) and 5 000 cycles at 300 MPa ($N _ { 2 } = 5 0 \ 0 0 0$ ).

::: solution
The linear damage hypothesis states that the damage per cycle at stress amplitude $S _ { i }$ is:

$$
d _ { i } \; = \; { \frac { 1 } { N _ { i } } }
$$

The total damage after $n _ { i }$ cycles at each stress amplitude is:

$$
D \; = \; \sum _ { i } n _ { i } \, d _ { i } \; = \; \sum _ { i } { \frac { n _ { i } } { N _ { i } } }
$$

The component fails when $D = 1$ .

$$
D \; = \; { \frac { 1 \ 0 0 0 } { 1 0 \ 0 0 0 } } + { \frac { 5 \ 0 0 0 } { 5 0 \ 0 0 0 } } \; = \; 0 . 1 + 0 . 1 \; = \; { \bf 0 . 2 }
$$

**The cumulative damage is 0.2, which means the component has consumed 20 % of its fatigue life. The linearity of Miner's rule is the reason the damage is independent of the load sequence, and the independence is the reason Miner's rule is simple to apply and inaccurate for spectrum loading.** $\blacksquare$
:::
:::

::: quiz Fatigue failure {#quiz-fatigue}
The material that has an endurance limit is:

- [ ] Aluminium alloy
- [ ] Copper
- [x] Steel
- [ ] Magnesium alloy

::: solution
**Steel.** The endurance limit exists for ferrous metals (steel, titanium) and does not exist for non-ferrous metals (aluminium, copper, magnesium). The engineer who designs an aluminium component for "infinite life" is designing for a life that does not exist.
:::
:::

::: quiz Mean stress correction {#quiz-mean-stress}
The mean stress correction criterion that is most conservative is:

- [ ] Goodman
- [x] Soderberg
- [ ] Gerber
- [ ] ASME

::: solution
**Soderberg.** The Soderberg criterion uses the yield strength instead of the ultimate strength, and the yield strength is lower than the ultimate strength, so the Soderberg criterion is more conservative than the Goodman criterion. The Gerber criterion is the least conservative.
:::
:::

## Where this lesson leads

- **[[machine-design/static-failure]]** — The stress concentration factor $K _ { t }$ is the input to the fatigue stress concentration factor $K _ { f }$ .
- **[[machine-design/shafts]]** — The shaft is sized by the fatigue criterion (Goodman or ASME) with the stress concentration at the keyway and the shoulder fillet.
- **[[machine-design/gear-design]]** — The gear tooth is sized by the fatigue criterion (the Lewis bending fatigue equation and the Hertzian contact fatigue equation).
- **[[machine-design/bearings]]** — The bearing is sized by the contact fatigue life (the L10 life), not the static strength.
- **[[machine-design/fasteners-joints]]** — The bolt is sized by the fatigue criterion (the Goodman diagram with the preload effect).
- **[[machine-design/springs]]** — The spring is sized by the fatigue criterion (the Goodman diagram with the curvature correction).
- **[[solid-mechanics/fracture-mechanics]]** — The Paris law is the foundation of the fatigue crack growth analysis.
- **[[materials-science/failure]]** — The fatigue failure mechanisms (the slip bands, the crack initiation, the crack propagation) are the physical basis of the S-N curve.

::: history Fatigue: from the Wöhler curve to the Paris law {#history-fatigue}
**1850s** — **August Wöhler** conducts systematic fatigue tests on railway axles at the Berlin Railway Research Institute. Wöhler discovers that the fatigue life decreases with increasing stress amplitude, and plots the S-N curve. **The Wöhler curve is the foundation of fatigue design, and the foundation is the reason the S-N curve is the most important diagram in machine design.**

**1870** — **Wöhler** discovers the **endurance limit**: the stress amplitude below which the steel specimen does not fail, regardless of the number of cycles. **The endurance limit is the reason the steel component can be designed for "infinite life," and the infinite life is the reason the steel is the most widely used engineering material.**

**1910** — **O.H. Basquin** proposes the power-law relationship between the stress amplitude and the number of cycles: $S _ { a } = S _ { f } ^ { \prime } ( 2 N _ { f } ) ^ { b }$ . **The Basquin equation is the mathematical form of the S-N curve, and the mathematical form is the reason the S-N curve can be extrapolated to high cycle numbers.**

**1945** — **M.A. Miner** proposes the linear cumulative damage rule: $D = \sum n _ { i } / N _ { i }$ . **Miner's rule is the reason the variable amplitude loading is handled by the cumulative damage approach, and the approach is the reason the aircraft spectrum loading is designed for a finite life.**

**1954** — **The de Havilland Comet disasters**: three Comet jetliners break up in flight due to fatigue cracks at the window corners. The inquiry finds that the window corners were stress concentrations, and the stress concentrations initiated the fatigue cracks. **The Comet disasters are the reason the fail-safe design philosophy is adopted in aviation, and the philosophy is the reason the aircraft structure is designed so that a single crack does not cause catastrophic failure.**

**1963** — **Paul Paris and F. Erdogan** propose the **Paris law**: $d a / d N = C ( \Delta K ) ^ { m }$ . **The Paris law is the reason the fatigue crack growth life can be calculated, and the calculation is the reason the inspection interval is determined by the crack growth rate, not the fatigue life.**

**1968** — **Matsuishi and Endo** propose the **rainflow counting method**, which converts the variable amplitude load history into a set of stress cycles. **The rainflow counting method is the reason the variable amplitude loading is handled by Miner's rule, and the rule is the reason the spectrum loading is designed for a finite life.**

**1970** — **The Marin factors** are codified in the NASA Structural Analysis Guide and the ASME design codes, providing the standard method for adjusting the endurance limit for the surface finish, size, load type, temperature, and reliability. **The Marin factors are the reason the component's fatigue strength is much lower than the laboratory specimen's fatigue strength, and the reduction is the reason the fatigue design is conservative.**
:::

::: summary Fatigue {#summary-fatigue}
- **Fatigue is the failure of a material under cyclic loading at a stress level well below the yield strength, and 80–90 % of all mechanical failures are fatigue failures.** The fatigue failure is insidious: the crack initiates at a stress concentration, grows slowly, and then propagates catastrophically.
- **The S-N curve relates the stress amplitude to the number of cycles to failure, and the endurance limit is the stress amplitude below which the material does not fail.** The endurance limit exists for ferrous metals (steel, titanium) and does not exist for non-ferrous metals (aluminium, copper).
- **The endurance limit of the component is the endurance limit of the specimen multiplied by the Marin factors: $S _ { e } = k _ { a } k _ { b } k _ { c } k _ { d } k _ { e } k _ { f } \times S _ { e } ^ { \prime }$ .** The Marin factors reduce the endurance limit by 30–60 %.
- **The fatigue stress concentration factor $K _ { f } = 1 + q ( K _ { t } - 1 )$ reduces the fatigue strength by 30–70 %.** The notch sensitivity $q$ ranges from 0 (no notch effect) to 1 (full notch effect).
- **The Goodman criterion $S _ { a } / S _ { e } + S _ { m } / S _ { u t } = 1 / n$ is the most widely used mean stress correction.** The Soderberg criterion is more conservative; the Gerber criterion is less conservative.
- **Miner's rule $D = \sum n _ { i } / N _ { i }$ sums the damage fractions, and the component fails when $D \ge 1$ .** The rainflow counting method converts the variable amplitude load history into a set of stress cycles.
- **The Paris law $d a / d N = C ( \Delta K ) ^ { m }$ relates the crack growth rate to the stress intensity factor range.** The fatigue life is the sum of the crack initiation life and the crack propagation life.
- **The three regimes of fatigue crack growth are: the threshold regime (no growth), the Paris regime (stable growth), and the fast fracture regime (unstable fracture).** The threshold $\Delta K _ { \text{th } }$ is the reason the small crack is safe; the fracture toughness $K _ { I c }$ is the reason the large crack fails.
- **The surface finish factor $k _ { a }$ is the most important Marin factor: the as-forged surface has an endurance limit that is 54 % of the polished surface.** The surface finish is the first parameter optimised in the fatigue design.
- **The high-strength steel is fully notch-sensitive ($q \approx 1$ ), which means the high-strength steel is not always better than the low-strength steel in fatigue.** The notch sensitivity is the reason the high-strength steel is not always the best choice.
:::

## Further reading

- **Joseph E. Shigley, Charles R. Mischke and Richard G. Budynas (2015)** — *Mechanical Engineering Design*, 11th ed. McGraw-Hill. The S-N curve, the Marin factors, the Goodman criterion, and the shaft fatigue design.
- **Norman E. Dowling (2019)** — *Mechanical Behavior of Materials*, 5th ed. Pearson. The fatigue mechanisms, the S-N curve, the strain-life approach, and the crack growth.
- **Robert C. Juvinall and Kurt M. Marshek (2020)** — *Fundamentals of Machine Component Design*, 7th ed. Wiley. The fatigue design examples, the mean stress correction, and the Miner's rule.
- **Paul C. Paris and Fazil Erdogan (1963)** — "Critical analysis of crack propagation laws." *Journal of Basic Engineering*, 85(4), 528–534. The Paris law.
- **Henry M. Matsuishi and T. Endo (1968)** — "Reliability of fatigue of metals under random loading." *Proceedings of the 9th International Conference on Strength of Materials and Structures*, Munich. The rainflow counting method.
- **M.A. Miner (1945)** — "Cumulative damage in fatigue." *Journal of Applied Mechanics*, 12(3), A159–A164. Miner's rule.
- **S. Suresh (1998)** — *Fatigue of Materials*, 2nd ed. Cambridge University Press. The fatigue mechanisms, the crack growth, and the fatigue of materials.
- **ASME (2023)** — *Fatigue Design Standard, ASME PCC-7*. ASME. The fatigue design methodology for pressure equipment and piping.
