Switch on a vector network analyser, connect a cable to its port and an antenna to the cable, and the screen shows neither a number in ohms nor a graph of impedance against frequency. It shows a curve wandering inside a circle crossed by a lattice of other circles: the **Smith chart**. Every RF engineer reads impedances off it, designs matching networks on it, and judges at a glance whether a component is inductive or capacitive, well matched or badly matched, lossy or lossless. The chart is not an antique calculating aid that survived by habit; it is the natural coordinate system of the subject, because a lossless line does nothing to a reflection coefficient but rotate it, and lumped components move it along circles.

[[electromagnetics/transmission-lines]] derived the telegrapher's equations, the reflection coefficient $\Gamma_L = (Z_L - Z_0)/(Z_L + Z_0)$, the input-impedance formula and the definition of the chart. This chapter turns those results into working tools. We first settle how much power a generator delivers through a line to a mismatched load, which is the question every matching network answers. Then we construct the Smith chart properly, prove its circle properties, add the admittance grid, and learn to move on it: along lines, through series and shunt elements, and through lossy cable. We finish with measurement — finding an unknown load from its standing-wave pattern, and reading the frequency response of a resonant load as a locus on the chart. Phasors are those of [[circuits-2/sinusoids-phasors]] with $e^{j\omega t}$ time dependence, and voltages are peak values unless stated otherwise.

## Waves, reflections and delivered power {#sec-power}

Put the load at $z = 0$ and measure distance back towards the generator as $\ell$. On a line with propagation constant $\gamma = \alpha + j\beta$ the voltage and current are the sum of an incident and a reflected wave,

$$
V(\ell) = V_0^+e^{\gamma\ell}\bigl[1 + \Gamma(\ell)\bigr], \qquad I(\ell) = \frac{V_0^+}{Z_0}e^{\gamma\ell}\bigl[1 - \Gamma(\ell)\bigr],
$$ {#eq-vi}

where $Z_0$ is the characteristic impedance. All the information about the load is carried by one complex number at each point.

::: definition Reflection coefficient on a line and normalised impedance {#def-gamma-l}
The **reflection coefficient** at distance $\ell$ from the load is the ratio of the reflected to the incident voltage wave at that point,

$$
\Gamma(\ell) = \Gamma_Le^{-2\gamma\ell}, \qquad \Gamma_L = \frac{Z_L - Z_0}{Z_L + Z_0} .
$$ {#eq-gamma-ell}

The impedance $Z(\ell) = V(\ell)/I(\ell)$ looking towards the load, divided by $Z_0$, is the **normalised impedance** $z = r + jx$, and it is related to $\Gamma$ at the same point by

$$
z = \frac{1 + \Gamma}{1 - \Gamma}, \qquad \Gamma = \frac{z - 1}{z + 1} .
$$ {#eq-z-gamma}

The **normalised admittance** is $y = 1/z = g + jb$, where $g$ is the normalised conductance and $b$ the normalised susceptance.
:::

Equation [[#eq-z-gamma]] is the ratio of the two lines of [[#eq-vi]]. It holds at every point of the line, not only at the load, which is what makes the Smith chart possible: $\Gamma$ moves along the line in a simple way, and $z$ is always the same function of $\Gamma$. For a lossless line ($\alpha = 0$), $\abs{\Gamma}$ is constant and only the phase changes, by $-2\beta\ell$: a round trip to the load and back.

### Power from a generator through a line

A transmitter, signal generator or amplifier stage is modelled as a voltage source $V_g$ with internal impedance $Z_g$. Whatever is connected to it presents an impedance $Z_{\text{in}}$, and the power it absorbs is $P = \tfrac12\abs{I}^2R_{\text{in}} = \tfrac12\abs{V_g}^2R_{\text{in}}/\abs{Z_g + Z_{\text{in}}}^2$. For a lossless line, all the power entering the line reaches the load, so this is also the load power. Two questions follow: what is the most power the generator can deliver, and how far short of it does a given load fall?

::: theorem Conjugate matching and the mismatch factor {#thm-conjugate}
A generator $V_g$, $Z_g = R_g + jX_g$ ($R_g > 0$) delivers the greatest power to a passive load when the load impedance it sees is the complex conjugate of its own,

$$
Z_{\text{in}} = Z_g^* ,
$$ {#eq-conj}

and that maximum is the **available power** $P_{\text{avs}} = \abs{V_g}^2/(8R_g)$. For any $Z_{\text{in}}$, with $\Gamma_g$ and $\Gamma_{\text{in}}$ the reflection coefficients of $Z_g$ and $Z_{\text{in}}$ with respect to any real reference $Z_0$,

$$
P = P_{\text{avs}}\,\frac{\bigl(1 - \abs{\Gamma_g}^2\bigr)\bigl(1 - \abs{\Gamma_{\text{in}}}^2\bigr)}{\abs{1 - \Gamma_g\Gamma_{\text{in}}}^2} .
$$ {#eq-mismatch}

When the generator is matched to the line ($Z_g = Z_0$, $\Gamma_g = 0$) this reduces to $P = P_{\text{avs}}(1 - \abs{\Gamma_{\text{in}}}^2)$.
:::

::: proof
Write $P = \tfrac12\abs{V_g}^2R_{\text{in}}/[(R_g + R_{\text{in}})^2 + (X_g + X_{\text{in}})^2]$. The reactances appear only in the denominator, so $P$ is largest when $X_{\text{in}} = -X_g$. Then $P = \tfrac12\abs{V_g}^2R_{\text{in}}/(R_g + R_{\text{in}})^2$, whose derivative with respect to $R_{\text{in}}$ is proportional to $(R_g + R_{\text{in}}) - 2R_{\text{in}} = R_g - R_{\text{in}}$, zero at $R_{\text{in}} = R_g$. Substituting gives $P_{\text{avs}} = \abs{V_g}^2/(8R_g)$.

For the second form, use [[#eq-z-gamma]]: $Z_g = Z_0(1 + \Gamma_g)/(1 - \Gamma_g)$ and similarly for $Z_{\text{in}}$. Then

$$
Z_g + Z_{\text{in}} = \frac{2Z_0(1 - \Gamma_g\Gamma_{\text{in}})}{(1 - \Gamma_g)(1 - \Gamma_{\text{in}})}, \qquad R_{\text{in}} = \mathrm{Re}\,Z_{\text{in}} = Z_0\frac{1 - \abs{\Gamma_{\text{in}}}^2}{\abs{1 - \Gamma_{\text{in}}}^2},
$$

the second because $(1 + \Gamma)(1 - \Gamma^*) = 1 - \abs\Gamma^2 + (\Gamma - \Gamma^*)$ has real part $1 - \abs\Gamma^2$. Hence

$$
P = \frac{\abs{V_g}^2}{2}\,\frac{R_{\text{in}}}{\abs{Z_g + Z_{\text{in}}}^2} = \frac{\abs{V_g}^2\,\abs{1 - \Gamma_g}^2\,(1 - \abs{\Gamma_{\text{in}}}^2)}{8Z_0\,\abs{1 - \Gamma_g\Gamma_{\text{in}}}^2} .
$$

The same identity applied to $R_g$ gives $P_{\text{avs}} = \abs{V_g}^2\abs{1 - \Gamma_g}^2/[8Z_0(1 - \abs{\Gamma_g}^2)]$, and dividing yields [[#eq-mismatch]].
:::

The conjugate condition [[#eq-conj]] is not the same as "no reflection". A generator with $Z_g\ne Z_0$ attached to a matched line ($Z_{\text{in}} = Z_0$) sees no reflection but does *not* deliver its available power; conversely, when $Z_{\text{in}} = Z_g^*$ there is a standing wave on the line and yet the transfer is perfect. The quantity that matters is the generator's view of the whole line-plus-load. In the common case of a $50\,\Omega$ instrument on a $50\,\Omega$ system both conditions coincide, which is one reason for standardising on a single reference impedance.

::: example Choosing a line length for full power {#ex-conjugate}
A generator with $V_g = 10\,\mathrm V$ (peak, open circuit) and $Z_g = 25\,\Omega$ drives a $100\,\Omega$ load through a lossless $50\,\Omega$ line. Find the power delivered when the line is (a) $\lambda/4$, (b) $\lambda/2$ and (c) $\lambda/8$ long.
::: solution
The available power is $P_{\text{avs}} = 10^2/(8\times25) = 0.5\,\mathrm W$, and $\Gamma_g = (25 - 50)/(25 + 50) = -1/3$.

(a) A quarter-wave line inverts the load: $Z_{\text{in}} = Z_0^2/Z_L = 2500/100 = 25\,\Omega = Z_g^*$. The match is conjugate, and $P = 0.5\,\mathrm W$. Check with [[#eq-mismatch]]: $\Gamma_{\text{in}} = -1/3$, so $P = 0.5(8/9)(8/9)/(1 - 1/9)^2 = 0.5\,\mathrm W$.

(b) A half-wave line repeats the load: $Z_{\text{in}} = 100\,\Omega$, $\Gamma_{\text{in}} = +1/3$, and $P = 0.5(8/9)^2/(1 + 1/9)^2 = 0.5(0.8)^2 = 0.32\,\mathrm W$.

(c) From the input-impedance formula with $\tan\beta\ell = 1$: $Z_{\text{in}} = 50(100 + j50)/(50 + j100) = 40 - j30\,\Omega$, and directly $P = \tfrac12\times100\times40/\abs{65 - j30}^2 = 2000/5125 = 0.390\,\mathrm W$.

The load and the line are the same in all three cases; only the length differs. The reflection coefficient at the load, $\Gamma_L = 1/3$, is the same too, and the standing-wave ratio on the line is $2$ throughout. What changes is whether the reflected wave, re-reflected by the mismatched generator, adds in phase with the incident wave.
:::
:::

## Constructing the Smith chart {#sec-construction}

Equation [[#eq-z-gamma]] is a **Möbius transformation**, a map of the complex plane of the form $(az + b)/(cz + d)$. Such maps send circles and straight lines to circles and straight lines and preserve angles ([Maths Atlas: conformal maps](/learn/maths/)). The right half of the $z$-plane, $r\ge0$, which holds every passive impedance, maps to the unit disc $\abs\Gamma\le1$; the imaginary axis $r = 0$ maps to the unit circle; $z = 1$ (a matched load) maps to the centre.

::: theorem Circles of constant resistance and reactance {#thm-smith-circles}
Write $\Gamma = u + jv$. In the $\Gamma$-plane,

- the points of constant normalised resistance $r$ lie on the circle
$$
\Bigl(u - \frac{r}{1 + r}\Bigr)^2 + v^2 = \Bigl(\frac{1}{1 + r}\Bigr)^2 ,
$$ {#eq-r-circle}
- the points of constant normalised reactance $x\ne0$ lie on the circle
$$
(u - 1)^2 + \Bigl(v - \frac1x\Bigr)^2 = \Bigl(\frac1x\Bigr)^2 ,
$$ {#eq-x-circle}

of which only the arc inside the unit circle is used. All these circles pass through $\Gamma = 1$, the open circuit.
:::

::: proof
From [[#eq-z-gamma]], multiply numerator and denominator by $(1 - u) + jv$, the conjugate of $1 - \Gamma$:

$$
r + jx = \frac{(1 + u + jv)(1 - u + jv)}{(1 - u)^2 + v^2} = \frac{1 - u^2 - v^2 + 2jv}{(1 - u)^2 + v^2} .
$$

The real part gives $r[(1 - u)^2 + v^2] = 1 - u^2 - v^2$, i.e. $(1 + r)u^2 - 2ru + (1 + r)v^2 = 1 - r$. Divide by $1 + r$ and complete the square in $u$: $(u - r/(1 + r))^2 + v^2 = (1 - r)/(1 + r) + r^2/(1 + r)^2 = 1/(1 + r)^2$, which is [[#eq-r-circle]]. The imaginary part gives $x[(1 - u)^2 + v^2] = 2v$; divide by $x$ and complete the square in $v$: $(u - 1)^2 + (v - 1/x)^2 = 1/x^2$, which is [[#eq-x-circle]]. Setting $u = 1$, $v = 0$ satisfies both equations for every $r$ and $x$.
:::

A few circles are worth memorising. The $r = 0$ circle is the unit circle itself; $r = 1$ is the circle of radius $\tfrac12$ through the centre and the open-circuit point; $r\to\infty$ shrinks to the point $\Gamma = 1$. The $x = \pm1$ arcs are quarter-circles meeting the unit circle at $\Gamma = \pm j$; the upper half of the chart ($x > 0$) is inductive and the lower half ($x < 0$) capacitive; the horizontal axis ($x = 0$) holds the pure resistances, from the short at $\Gamma = -1$ on the left through the matched point $r = 1$ to the open at $\Gamma = +1$ on the right.

### The admittance chart

Replacing $\Gamma$ by $-\Gamma$ in [[#eq-z-gamma]] gives $(1 - \Gamma)/(1 + \Gamma) = 1/z = y$. So the admittance of a point is read from the impedance grid at the diametrically opposite point; equivalently, rotating the whole grid by $180^\circ$ gives a grid of constant-$g$ and constant-$b$ circles, all touching at $\Gamma = -1$. A chart that carries both grids, usually in two colours, is a **ZY Smith chart**. On it a point can be read as an impedance or as an admittance without moving it, which is what makes the chart convenient for ladder networks of series and shunt elements.

::: warning Normalise first, and know which grid you are reading
Every number on a Smith chart is normalised: to $Z_0$ for impedance and to $Y_0 = 1/Z_0$ for admittance. Reading $r = 2$ as $2\,\Omega$, or forgetting that a normalised susceptance $b$ means $b/Z_0$ siemens, is the most common error. On both grids the lower half of the chart is capacitive and the upper half inductive — a point is the same physical impedance however it is read — but the *signs* of the numbers differ: in the lower half $x < 0$ and $b > 0$, because a capacitor has negative reactance and positive susceptance.
:::

### Moving along a line

For a lossless line, [[#eq-gamma-ell]] says $\Gamma(\ell) = \Gamma_Le^{-2j\beta\ell}$: moving a distance $\ell$ **towards the generator** rotates the point *clockwise* about the centre by $2\beta\ell = 4\pi\ell/\lambda$ radians, a full turn for each half-wavelength. Moving **towards the load** rotates anticlockwise. Printed charts carry two scales round the rim, "wavelengths towards generator" and "wavelengths towards load", running from $0$ to $0.5$, so the rotation can be read directly in wavelengths. The wavelength is the **guided wavelength** on the line, $\lambda = 2\pi/\beta = u_p/f$, not the free-space wavelength: on a coaxial cable with velocity factor $0.66$ it is $0.66$ of the free-space value.

Circles about the centre are circles of constant $\abs\Gamma$, and therefore of constant standing-wave ratio $s = (1 + \abs\Gamma)/(1 - \abs\Gamma)$. Where such a circle crosses the positive real axis, $\Gamma = \abs\Gamma$ and $z = (1 + \abs\Gamma)/(1 - \abs\Gamma) = s$: the VSWR can be read directly as the value of $r$ there, which is also the point of the voltage maximum. The crossing of the negative real axis, at $z = 1/s$, is the voltage minimum.

::: proposition Circles of constant Q {#prop-q-circles}
The **nodal quality factor** of a point is $Q_n = \abs{x}/r$ (equivalently $\abs{b}/g$). The points of constant $Q_n$ lie on the arcs of the circles through $\Gamma = \pm1$ with centres at $(0, \pm1/Q_n)$:

$$
u^2 + \Bigl(v \pm \frac{1}{Q_n}\Bigr)^2 = 1 + \frac{1}{Q_n^2} .
$$ {#eq-q-circle}
:::

::: proof
From the proof of [[#thm-smith-circles]], $x/r = 2v/(1 - u^2 - v^2)$. Setting $x/r = \pm Q_n$ gives $1 - u^2 - v^2 = \pm 2v/Q_n$, i.e. $u^2 + v^2 \pm 2v/Q_n = 1$, and completing the square gives [[#eq-q-circle]]. The circle passes through $u = \pm1$, $v = 0$ for every $Q_n$.
:::

Constant-$Q$ arcs bound the region of the chart that a matching network can pass through if its loaded quality factor, and hence its bandwidth, is to be kept within limits; we use them in [[rf-microwave/impedance-matching]].

::: quiz
On a $50\,\Omega$ Smith chart, a point lies on the $r = 1$ circle in the lower half of the chart. Which statement is true?
- [ ] It is an inductive impedance with real part $1\,\Omega$
- [x] It is a capacitive impedance with real part $50\,\Omega$
- [ ] Its admittance has $g = 1$
- [ ] Its VSWR is $1$
::: solution
Normalised values are multiplied by $Z_0$: $r = 1$ means $R = 50\,\Omega$, and the lower half of the impedance grid holds negative reactance, i.e. capacitive impedances. Its admittance is $1/(1 + jx) = (1 - jx)/(1 + x^2)$, whose real part is $1/(1 + x^2) < 1$ unless $x = 0$. Only the centre point has VSWR $1$.
:::
:::

## Lumped elements and lines on the chart {#sec-moves}

A matching network or a transistor's bias network is a ladder of series elements, shunt elements and line sections. Each kind of element moves the point on the chart along a particular family of curves, and recognising them is the whole art of Smith-chart design.

::: proposition Motion of the impedance point {#prop-moves}
Starting from a point $z$ (admittance $y$) and adding a single lossless element:

1. a **series reactance** $jX$ adds $jX/Z_0$ to $z$ and moves the point along its circle of constant $r$ — clockwise (upwards) for a series inductor, anticlockwise for a series capacitor;
2. a **shunt susceptance** $jB$ adds $jBZ_0$ to $y$ and moves the point along its circle of constant $g$ — clockwise for a shunt capacitor, anticlockwise for a shunt inductor;
3. a **length of lossless line** of the same $Z_0$ rotates the point clockwise about the centre by $2\beta\ell$ (towards the generator);
4. a **length of lossless line of different impedance** $Z_1$ rotates the point clockwise about the point $\Gamma_c = (Z_1 - Z_0)/(Z_1 + Z_0)$ on a circle that is not centred at the origin.
:::

::: proof
Items 1 and 2 follow because the real part ($r$ or $g$) is unchanged. On the constant-$r$ circle, increasing $x$ moves the point towards the top of the chart, which for the circle's orientation means clockwise; on the constant-$g$ circle, increasing $b$ moves it towards the *bottom* of the chart (the $b > 0$ half of the admittance grid is the lower half of the $\Gamma$-plane, as $\Gamma\to-\Gamma$ maps it), which is again clockwise. Item 3 is [[#eq-gamma-ell]]. For item 4, renormalise to $Z_1$: in the $Z_1$ chart the point rotates about its own centre; the map from the $Z_1$-normalised $\Gamma'$ to the $Z_0$-normalised $\Gamma$ is the Möbius map $\Gamma = (\Gamma' + \Gamma_c)/(1 + \Gamma_c\Gamma')$, which sends circles to circles and fixes neither the origin nor the rim, so the locus is a circle in the $Z_0$ chart whose centre is in general not the origin. Its centre lies on the real axis, because the map has real coefficients and the $Z_1$-circle is symmetric about the real axis.
:::

The rule to remember is that *adding any reactive element of positive value* — series inductance, or shunt capacitance — moves clockwise, and the opposite element moves anticlockwise. A line moves clockwise too, since it acts like a series inductor followed by a shunt capacitor when it is short. The direction of motion on a circle can therefore be found without consulting the sign of anything: inductors in series, capacitors in shunt, and line towards the generator all move clockwise.

::: example An impedance through a line and a shunt capacitor {#ex-path}
At $1\,\mathrm{GHz}$ a transistor input has $Z_L = 15 - j20\,\Omega$. It is connected through a $50\,\Omega$ line $0.15\lambda$ long, and a $2\,\mathrm{pF}$ capacitor is connected in shunt at the far end of the line. Trace the impedance on the Smith chart and find the input impedance.
::: solution
**Load.** $z_L = 0.3 - j0.4$ and

$$
\Gamma_L = \frac{-0.7 - j0.4}{1.3 - j0.4} = -0.405 - j0.432 = 0.593\angle{-133.2^\circ} .
$$

The point is in the lower-left part of the chart, capacitive, on the $r = 0.3$ circle.

**Line.** Moving $0.15\lambda$ towards the generator rotates clockwise by $2\beta\ell = 720^\circ\times0.15 = 108^\circ$, to $0.593\angle{-241.2^\circ} = 0.593\angle118.8^\circ$. Converting back with [[#eq-z-gamma]] gives $z_1 = 0.337 + j0.540$, i.e. $Z_1 = 16.9 + j27.0\,\Omega$: the line has turned a capacitive load into an inductive one. As an admittance, $y_1 = 1/z_1 = 0.832 - j1.332$.

**Shunt capacitor.** Its susceptance is $B = \omega C = 2\pi(10^9)(2\times10^{-12}) = 12.57\,\mathrm{mS}$, normalised $b = BZ_0 = 0.628$. Adding it moves the point clockwise along the $g = 0.832$ circle to $y_2 = 0.832 - j0.704$, which is $z_2 = 1/y_2 = 0.700 + j0.592$, so

$$
Z_{\text{in}} = 35.0 + j29.6\,\Omega, \qquad \Gamma_{\text{in}} = 0.369\angle97.6^\circ .
$$

The VSWR at the input has fallen from $3.9$ on the line (for $\abs\Gamma = 0.593$) to $2.2$. A slightly larger capacitor would bring the point further along the $g = 0.832$ circle, but never to the centre, which lies on $g = 1$: to match fully, the line length must first bring the point onto the $g = 1$ circle — the single-stub idea of [[rf-microwave/impedance-matching]].
:::
:::

### Stubs as reactive elements

A short-circuited line of length $\ell$ has $Z_{\text{in}} = jZ_0\tan\beta\ell$ and an open-circuited line $Z_{\text{in}} = -jZ_0\cot\beta\ell$. On the chart, a short starts at $\Gamma = -1$ and an open at $\Gamma = +1$, and both rotate clockwise round the rim as the stub lengthens. A stub is therefore a reactance that can be given any value by choosing its length, which is how inductors and capacitors are made where lumped parts are unavailable or too lossy, for example on microstrip above a few gigahertz.

::: example Designing an open stub to replace a capacitor {#ex-stub-design}
A $2\,\mathrm{pF}$ shunt capacitor at $2.4\,\mathrm{GHz}$ is to be replaced by an open-circuited $50\,\Omega$ microstrip stub on a substrate with $\epsilon_{\text{eff}} = 3.3$. Find the stub length, and the capacitance it is equivalent to at $2.0$ and $2.8\,\mathrm{GHz}$.
::: solution
The capacitor's reactance at $2.4\,\mathrm{GHz}$ is $X_C = 1/(\omega C) = 1/(2\pi\cdot2.4\times10^9\cdot2\times10^{-12}) = 33.16\,\Omega$, so we need $Z_0\cot\beta\ell = 33.16\,\Omega$, i.e. $\tan\beta\ell = 50/33.16 = 1.508$ and $\beta\ell = 56.4^\circ = 0.1568$ wavelengths. The guided wavelength is

$$
\lambda_g = \frac{c}{f\sqrt{\epsilon_{\text{eff}}}} = \frac{3\times10^8}{2.4\times10^9\times1.817} = 68.8\,\mathrm{mm},
$$

so the stub is $0.1568\times68.8 = 10.8\,\mathrm{mm}$ long.

At another frequency $f$, $\beta\ell$ scales as $f$, and the equivalent capacitance is $C_{\text{eq}} = \tan(\beta\ell)/(\omega Z_0)$. At $2.0\,\mathrm{GHz}$, $\beta\ell = 47.0^\circ$ and $C_{\text{eq}} = 1.71\,\mathrm{pF}$; at $2.8\,\mathrm{GHz}$, $\beta\ell = 65.9^\circ$ and $C_{\text{eq}} = 2.54\,\mathrm{pF}$. The stub behaves like a capacitor whose value rises with frequency; it is a good replacement only over a modest band, and it becomes a short circuit at the frequency where it is a quarter-wave long ($4.6\,\mathrm{GHz}$ here). In practice the open end has a little fringing capacitance, equivalent to extending the stub by about $0.3$–$0.4h$ for substrate thickness $h$, and the drawn length is shortened accordingly.
:::
:::

## Lossy lines {#sec-lossy}

Real cables attenuate. On a line with $\alpha > 0$, [[#eq-gamma-ell]] gives $\Gamma(\ell) = \Gamma_Le^{-2\alpha\ell}e^{-2j\beta\ell}$: the point still rotates clockwise towards the generator, but it also spirals inward, by the factor $e^{-2\alpha\ell}$, the attenuation of a round trip. A long enough lossy line looks matched whatever is at the end of it.

::: theorem Reflection and power on a lossy line {#thm-lossy}
Let a line of characteristic impedance $Z_0$ (taken real, as it is for low-loss lines) have one-way attenuation $A = 8.686\,\alpha\ell$ decibels and be terminated in a load with reflection coefficient $\Gamma_L$. Then

1. the return loss at the input is the load's return loss plus twice the line loss:
$$
\mathrm{RL}_{\text{in}} = \mathrm{RL}_L + 2A \quad (\mathrm{dB}) ;
$$ {#eq-rl-lossy}
2. the fraction of the net power entering the line that reaches the load is
$$
\frac{P_L}{P_{\text{in}}} = e^{-2\alpha\ell}\,\frac{1 - \abs{\Gamma_L}^2}{1 - \abs{\Gamma_L}^2e^{-4\alpha\ell}} .
$$ {#eq-lossy-power}
:::

::: proof
Item 1: $\abs{\Gamma_{\text{in}}} = \abs{\Gamma_L}e^{-2\alpha\ell}$, so $-20\log_{10}\abs{\Gamma_{\text{in}}} = -20\log_{10}\abs{\Gamma_L} + 2(20\log_{10}e)\alpha\ell$, and $20\log_{10}e = 8.686$.

Item 2: the net power at any point is the incident minus the reflected power, $P = \abs{V^+}^2(1 - \abs\Gamma^2)/(2Z_0)$, where $V^+$ is the local incident amplitude. Between the input and the load the incident amplitude falls by $e^{-\alpha\ell}$, so $\abs{V_L^+}^2 = \abs{V_{\text{in}}^+}^2e^{-2\alpha\ell}$. Divide $P_L = \abs{V_L^+}^2(1 - \abs{\Gamma_L}^2)/(2Z_0)$ by $P_{\text{in}} = \abs{V_{\text{in}}^+}^2(1 - \abs{\Gamma_{\text{in}}}^2)/(2Z_0)$ and substitute $\abs{\Gamma_{\text{in}}} = \abs{\Gamma_L}e^{-2\alpha\ell}$.
:::

Item 1 is a trap for the unwary: a VSWR measured at the transmitter end of a long feeder makes the antenna look better than it is. Item 2 shows that a mismatch on a lossy line costs more than the mismatch alone, because the reflected power is attenuated on its way back and is lost even if the source re-reflects it.

::: example An antenna at the end of a long feeder {#ex-feeder}
A VHF antenna with VSWR $3.0$ at $150\,\mathrm{MHz}$ is fed through $30\,\mathrm m$ of $50\,\Omega$ coaxial cable whose matched loss is $6\,\mathrm{dB/100\,m}$ at that frequency. Find the VSWR measured at the transmitter, and the power reaching the antenna when $100\,\mathrm W$ of net power enters the cable.
::: solution
At the antenna $\abs{\Gamma_L} = (3 - 1)/(3 + 1) = 0.5$, a return loss of $6.02\,\mathrm{dB}$. The cable's one-way loss is $A = 0.30\times6 = 1.8\,\mathrm{dB}$, so by [[#eq-rl-lossy]] the input return loss is $6.02 + 3.6 = 9.62\,\mathrm{dB}$, i.e. $\abs{\Gamma_{\text{in}}} = 10^{-9.62/20} = 0.330$ and

$$
s_{\text{in}} = \frac{1 + 0.330}{1 - 0.330} = 1.99 .
$$

The transmitter's VSWR meter reads $2.0$ although the antenna's own VSWR is $3$.

For the power, $e^{-2\alpha\ell} = 10^{-1.8/10} = 0.661$ and $\abs{\Gamma_L}^2e^{-4\alpha\ell} = 0.25\times0.437 = 0.109$, so by [[#eq-lossy-power]]

$$
\frac{P_L}{P_{\text{in}}} = 0.661\times\frac{0.75}{0.891} = 0.556 ,
$$

and $55.6\,\mathrm W$ is absorbed by the antenna — and radiated, if the antenna itself is lossless — a loss of $2.55\,\mathrm{dB}$, which is $0.75\,\mathrm{dB}$ more than the matched-line loss. $P_L$ is the net power (incident minus reflected) at the antenna terminals, so the antenna's own reflection is already accounted for; the extra loss is the reflected wave being attenuated on its way back down the cable.
:::
:::

::: widget parametric
fx: g*exp(-2*a*t)*cos(p - 4*pi*t)
fy: g*exp(-2*a*t)*sin(p - 4*pi*t)
t: 0, 1
x: -1.05, 1.05
y: -1.05, 1.05
sliders: g=0.5:0:1:0.01; p=0.4636:-3.1416:3.1416:0.01; a=0:0:2:0.01
caption: The reflection coefficient $\Gamma(\ell) = u + jv$ as you move from the load towards the generator, with $t = \ell/\lambda$ from $0$ to one wavelength. The load has $\Gamma_L = g\,e^{jp}$, and $a$ is the attenuation in nepers per wavelength. With $a = 0$ the point runs round a circle of constant $\lvert\Gamma\rvert$ (constant VSWR) twice per wavelength, clockwise. Increase $a$: the circle becomes a spiral towards the centre, the matched point, and a long lossy line looks matched whatever its load. The read-out $(x, y)$ is $\Gamma$; the outer boundary of the Smith chart is the unit circle $\lvert\Gamma\rvert = 1$, which the curve touches only for a lossless reactive load ($g = 1$, $a = 0$).
:::

## Measuring an unknown load {#sec-measurement}

Before vector network analysers became common, impedance at microwave frequencies was measured with a **slotted line**: a section of air-filled coaxial line or waveguide with a narrow slot along it, through which a small probe sampled the electric field. Sliding the probe gave the standing-wave pattern directly. The method is still the clearest illustration of how a standing wave encodes a complex impedance, and the same reasoning underlies time-domain and six-port measurements.

::: theorem Load impedance from the standing-wave pattern {#thm-swr-load}
On a lossless line, let the VSWR be $s$ and let the first voltage minimum lie a distance $d_{\min}$ from the load. Then

$$
\Gamma_L = \frac{s - 1}{s + 1}\,e^{j\theta_L}, \quad \theta_L = \pi + 2\beta d_{\min}, \qquad z_L = \frac{1 - js\tan\beta d_{\min}}{s - j\tan\beta d_{\min}} .
$$ {#eq-zl-swr}
:::

::: proof
The magnitude follows from $s = (1 + \abs\Gamma)/(1 - \abs\Gamma)$. At a voltage minimum the incident and reflected waves are in antiphase, so $\Gamma(d_{\min}) = -\abs{\Gamma_L}$. Since $\Gamma(d_{\min}) = \Gamma_Le^{-2j\beta d_{\min}}$, we get $\Gamma_L = -\abs{\Gamma_L}e^{2j\beta d_{\min}} = \abs{\Gamma_L}e^{j(\pi + 2\beta d_{\min})}$. For the impedance form, the normalised impedance at the minimum is $z = 1/s$; moving a distance $d_{\min}$ back *towards the load* is the inverse of the input-impedance transformation, i.e. the same formula with $\ell\to-d_{\min}$:

$$
z_L = \frac{1/s - j\tan\beta d_{\min}}{1 - j(1/s)\tan\beta d_{\min}} ,
$$

and multiplying numerator and denominator by $s$ gives [[#eq-zl-swr]].
:::

Minima are used rather than maxima because they are sharp and can be located precisely, whereas maxima are broad and flat. The guided wavelength is measured at the same time: adjacent minima are $\lambda/2$ apart. In practice one first finds the minimum positions with the line shorted ($\Gamma_L = -1$ puts a minimum exactly at the load plane and at every $\lambda/2$ from it), then replaces the short by the unknown load and measures how far the minimum moves.

::: example A slotted-line measurement {#ex-slotted}
On an air-filled $50\,\Omega$ slotted line, adjacent voltage minima are $20.0\,\mathrm{cm}$ apart, the VSWR is $2.5$, and the first minimum is $4.8\,\mathrm{cm}$ from the load. Find the frequency, $\Gamma_L$ and $Z_L$.
::: solution
The minima are $\lambda/2$ apart, so $\lambda = 40\,\mathrm{cm}$ and $f = c/\lambda = 750\,\mathrm{MHz}$ (air line, so the guided and free-space wavelengths coincide). Then $d_{\min} = 4.8/40 = 0.12\lambda$, $2\beta d_{\min} = 720^\circ\times0.12 = 86.4^\circ$, and

$$
\abs{\Gamma_L} = \frac{1.5}{3.5} = 0.429, \quad \theta_L = 180^\circ + 86.4^\circ = 266.4^\circ, \quad \Gamma_L = 0.429\angle{-93.6^\circ} = -0.027 - j0.428 .
$$

With $\tan\beta d_{\min} = \tan43.2^\circ = 0.939$, [[#eq-zl-swr]] gives

$$
z_L = \frac{1 - j2.348}{2.5 - j0.939} = 0.660 - j0.691, \qquad Z_L = 33.0 - j34.6\,\Omega .
$$

On the chart: draw the $s = 2.5$ circle, start at the minimum on the left-hand real axis ($z = 0.4$), and move $0.12\lambda$ towards the load (anticlockwise); the point lands on $r\approx0.66$, $x\approx-0.69$. A first minimum less than $\lambda/4$ from the load always means a capacitive load, because between the load and the first minimum the point moves clockwise through the lower half.
:::
:::

### Frequency loci

A network analyser sweeps frequency and draws $\Gamma(f)$ as a curve. The shape of the curve tells the engineer what the load is. A resistor in series with an inductor traces a constant-$r$ circle upwards as frequency rises; a resistor in parallel with a capacitor traces a constant-$g$ circle; a resonator traces a loop. Consider a series RLC load with resonant frequency $f_0 = 1/(2\pi\sqrt{LC})$ and quality factor $Q = \omega_0L/R$:

$$
z(f) = r + jrQ\Bigl(\frac{f}{f_0} - \frac{f_0}{f}\Bigr), \qquad r = R/Z_0 .
$$ {#eq-rlc-locus}

The locus is the whole constant-$r$ circle traversed from the bottom (capacitive, below resonance) through the real axis at $f_0$ to the top (inductive). The higher the $Q$, the faster it moves near $f_0$. At $r = 1$ the circle passes through the centre and the load is perfectly matched at resonance — the condition of **critical coupling** for a resonator. Lines in front of the load add a frequency-dependent rotation, so real measured loci are distorted circles and loops, and a common first step in reading them is to "de-embed" the line by rotating the data back by $2\beta\ell$ at each frequency.

::: widget parametric
fx: (r^2 + (r*q*(t - 1/t))^2 - 1)/((r + 1)^2 + (r*q*(t - 1/t))^2)
fy: 2*r*q*(t - 1/t)/((r + 1)^2 + (r*q*(t - 1/t))^2)
t: 0.5, 2
x: -1.05, 1.05
y: -1.05, 1.05
sliders: r=1:0.1:4:0.05; q=5:0.5:30:0.5
caption: Frequency locus $\Gamma(f)$ of a series RLC load with normalised resistance $r$ and quality factor $Q = q$, for $f/f_0 = t$ from $0.5$ to $2$. Drag the point or press play: below resonance the load is capacitive (lower half), at $t = 1$ the point crosses the real axis at $\Gamma = (r - 1)/(r + 1)$, and above resonance it is inductive. With $r = 1$ the locus passes through the centre (critically coupled); for $r < 1$ the resonator is over-coupled and the circle encloses the centre, for $r > 1$ it is under-coupled. Raise $q$ and watch how much of the circle is crowded into a narrow band round $t = 1$.
:::

::: quiz
A network analyser shows the reflection coefficient of a one-port moving *anticlockwise* along a constant-$g$ circle as frequency increases. What is the most likely circuit?
- [ ] A resistor in series with an inductor
- [ ] A resistor in parallel with a capacitor
- [x] None of these: each of them moves clockwise as frequency rises
- [ ] A resistor in parallel with an inductor
::: solution
Foster's reactance theorem says that the reactance (and susceptance) of any lossless network increases with frequency, so lossless reactances always move clockwise round the chart, and so do the simple lossy one-ports built from one reactance and one resistor. A parallel $RC$ moves clockwise along a constant-$g$ circle (its susceptance $\omega C$ grows); a parallel $RL$ has susceptance $-1/(\omega L)$, which also grows towards zero, so it too moves clockwise. An anticlockwise locus usually means the reference plane is wrong (a calibration with negative electrical delay) or the device is active.
:::
:::

::: example Measuring a line's characteristic impedance and loss {#ex-oc-sc}
A $1.0\,\mathrm m$ length of unknown cable is measured at $33\,\mathrm{MHz}$ with its far end short-circuited and then open-circuited, giving $Z_{\text{sc}} = 9.9 + j85.7\,\Omega$ and $Z_{\text{oc}} = 3.33 - j28.8\,\Omega$. Find $Z_0$, the attenuation and the velocity factor, given that the electrical length is known to be less than a quarter-wavelength.
::: solution
For a line of length $\ell$, $Z_{\text{sc}} = Z_0\tanh\gamma\ell$ and $Z_{\text{oc}} = Z_0\coth\gamma\ell$ (the lossy input-impedance formula with $Z_L = 0$ and $Z_L\to\infty$). Their product and ratio give

$$
Z_0 = \sqrt{Z_{\text{sc}}Z_{\text{oc}}}, \qquad \tanh\gamma\ell = \sqrt{Z_{\text{sc}}/Z_{\text{oc}}} .
$$

Numerically $Z_{\text{sc}}Z_{\text{oc}} = (9.9)(3.33) + (85.7)(28.8) + j(3.33\times85.7 - 9.9\times28.8) = 2501 + j0.3$, so $Z_0 = 50.0\,\Omega$, real to the accuracy of the data. The ratio is $Z_{\text{sc}}/Z_{\text{oc}} = -2.90 + j0.68$, whose square root (taking the branch with positive imaginary part, since the shorted line looks inductive) is $\tanh\gamma\ell = 0.198 + j1.714$. Inverting, $\gamma\ell = \tfrac12\ln\bigl[(1 + \tanh\gamma\ell)/(1 - \tanh\gamma\ell)\bigr] = 0.050 + j1.047$. So $\alpha\ell = 0.050\,\mathrm{Np}$, a loss of $0.43\,\mathrm{dB}$ per metre, and $\beta\ell = 1.047\,\mathrm{rad} = 60^\circ$: the metre of cable is $\lambda/6$ long, so $\lambda = 6.0\,\mathrm m$ and $u_p = f\lambda = 33\times10^6\times6.0 = 1.98\times10^8\,\mathrm{m/s}$, a velocity factor of $0.66$ (a solid-polyethylene cable). The constraint on the length matters: a single-frequency measurement determines $\beta\ell$ only modulo $\pi$ (the inverse hyperbolic tangent has many branches), and $60^\circ + 180^\circ = 240^\circ$ would fit the data equally well with a velocity factor of $0.165$. In practice the ambiguity is resolved by measuring at two close frequencies and using the rate of change of phase.
:::
:::

## Design and practice {#sec-practice}

A few habits make Smith-chart work reliable.

- **Fix the reference plane.** A reflection coefficient refers to a particular plane on a particular line. Moving the plane by $\ell$ rotates $\Gamma$ by $2\beta\ell$; a vector network analyser's "port extension" or "electrical delay" setting does exactly this numerically. A connector adds a few tens of picoseconds of delay, which at $10\,\mathrm{GHz}$ is tens of degrees of rotation.
- **Check the direction of motion.** Series inductance, shunt capacitance and line towards the generator all rotate clockwise. If a computed path goes the other way, a sign is wrong.
- **Keep away from the rim.** Points near $\abs\Gamma = 1$ have high $Q$; matching from there is narrowband and sensitive to component tolerances. The constant-$Q$ arcs of [[#prop-q-circles]] show how close to the rim a design is.
- **Use software, but sketch first.** Modern design is done in simulators that draw the chart, but a hand sketch of the path tells you which topologies can work before you start optimising.

::: application The vector network analyser
A vector network analyser (VNA) measures the complex ratio of reflected to incident waves at its ports by separating them with directional couplers ([[rf-microwave/passive-microwave-components]]) and detecting their amplitude and phase with coherent receivers. Systematic errors — the couplers' imperfect directivity, the source mismatch, the frequency response of the cables — are removed by calibration: measuring a short, an open and a matched load (SOL), whose ideal reflection coefficients are $-1$, $+1$ and $0$, determines three error terms per frequency, and the corrected $\Gamma$ is displayed on a Smith chart or in decibels. The same principle extends to two-port measurements in [[rf-microwave/scattering-parameters]].
:::

::: history
Phillip Hagar Smith joined Bell Telephone Laboratories in 1928 and worked on antennas and feeders for radio transmitters, where he needed to compute the impedance seen through long lines repeatedly. In 1937 he devised a chart of reflection coefficient with circles of constant standing-wave ratio, and refined it into the familiar form, published in *Electronics* in January 1939 under the title "Transmission line calculator"; an improved version followed in the same magazine in 1944. Tosaku Mizuhashi had published a similar impedance chart in Japan in 1937, and Amiel Volpert one in the Soviet Union in 1940, where the chart is still often called the Volpert–Smith chart. The slotted line was the standard microwave impedance-measuring instrument from the Second World War until the late 1960s, when network analysers from Hewlett-Packard and others began to display measured reflection coefficients directly on a Smith-chart overlay.
:::

## Where this leads {#sec-next}

Everything in this chapter is used in the next one: [[rf-microwave/impedance-matching]] designs networks that move a load to the centre of the chart, with lumped elements, stubs and quarter-wave sections. [[rf-microwave/scattering-parameters]] generalises the reflection coefficient to multi-port networks, and the available-power result [[#thm-conjugate]] becomes the foundation of the gain definitions in [[rf-microwave/rf-amplifiers]], where stability circles and noise circles are drawn on the same chart. Antenna input impedances ([[rf-microwave/antennas]]) are measured and matched with these tools.

::: summary
- On a line, $\Gamma(\ell) = \Gamma_Le^{-2\gamma\ell}$ and $z = (1 + \Gamma)/(1 - \Gamma)$ at every point; a lossless line only rotates $\Gamma$, clockwise towards the generator, one turn per $\lambda/2$.
- A generator delivers its available power $\abs{V_g}^2/(8R_g)$ when it sees $Z_g^*$; in general $P = P_{\text{avs}}(1 - \abs{\Gamma_g}^2)(1 - \abs{\Gamma_{\text{in}}}^2)/\abs{1 - \Gamma_g\Gamma_{\text{in}}}^2$.
- The Smith chart is the $\Gamma$-plane with circles of constant $r$ (centre $r/(1+r)$, radius $1/(1+r)$) and constant $x$ (centre $1 + j/x$, radius $1/\abs x$); the admittance grid is the same grid rotated by $180^\circ$.
- Series reactance moves along constant-$r$ circles, shunt susceptance along constant-$g$ circles; series $L$, shunt $C$ and line towards the generator all move clockwise.
- On a lossy line the point spirals inward: input return loss = load return loss + twice the line loss, and mismatch costs extra power.
- An unknown load follows from the VSWR and the position of a voltage minimum: $\theta_L = \pi + 2\beta d_{\min}$.
- Frequency sweeps of lossless reactances and of simple RC, RL and RLC loads move clockwise; a series RLC traces a constant-$r$ circle and is critically coupled when $R = Z_0$.
:::

## Exercises

::: exercise Reading a reflection coefficient {level=1 check="sqrt(0.2)"}
Find $\Gamma$ (magnitude and angle) for the normalised impedance $z = 0.5 + j0.5$, and its normalised admittance. Give $\abs\Gamma$ as the answer.
::: solution
$\Gamma = (z - 1)/(z + 1) = (-0.5 + j0.5)/(1.5 + j0.5)$. Multiplying by the conjugate of the denominator, $(-0.5 + j0.5)(1.5 - j0.5)/2.5 = (-0.5 + j1.0)/2.5 = -0.2 + j0.4$, so $\abs\Gamma = \sqrt{0.2} = 0.447$ at $116.6^\circ$. The admittance is $y = 1/(0.5 + j0.5) = 1 - j1$: on the admittance grid it sits on the $g = 1$ circle, a fact that the next chapter exploits.
:::
:::

::: exercise Distance to the first maximum {level=1 check="60/720"}
A load has $\Gamma_L = 0.3\angle60^\circ$ on a lossless line. How far from the load, in wavelengths, is the first voltage maximum? What is the impedance there, normalised?
::: solution
A maximum occurs where $\Gamma$ is real and positive. Moving towards the generator rotates the phase from $60^\circ$ clockwise to $0^\circ$, a rotation of $60^\circ = 2\beta\ell$, so $\ell = 60^\circ/720^\circ\,\lambda = 0.0833\lambda$. There $z = s = 1.3/0.7 = 1.857$.
:::
:::

::: exercise A shorted stub as an inductor {level=1 check="0.09489"}
What length of short-circuited $50\,\Omega$ air line, in wavelengths, has the same reactance as a $3\,\mathrm{nH}$ inductor at $1.8\,\mathrm{GHz}$? Give the physical length too.
::: solution
$X_L = 2\pi(1.8\times10^9)(3\times10^{-9}) = 33.9\,\Omega$, so $\tan\beta\ell = 33.9/50 = 0.679$, $\beta\ell = 34.2^\circ$ and $\ell = 34.2/360 = 0.0949\lambda$. With $\lambda = c/f = 166.7\,\mathrm{mm}$ the stub is $15.8\,\mathrm{mm}$ long.
:::
:::

::: exercise Return loss through a cable {level=2 check="10"}
An amplifier input has a return loss of $6\,\mathrm{dB}$. It is measured through a test cable with $2\,\mathrm{dB}$ loss. What return loss, in decibels, does the uncalibrated analyser display? What VSWR does each figure correspond to?
::: solution
By [[#eq-rl-lossy]], $\mathrm{RL}_{\text{in}} = 6 + 2\times2 = 10\,\mathrm{dB}$. The true $\abs\Gamma = 10^{-6/20} = 0.501$, VSWR $3.0$; the displayed $\abs\Gamma = 0.316$, VSWR $1.92$. This is why the analyser must be calibrated at the end of the cable.
:::
:::

::: exercise Mismatch factor {level=2 check="8/9"}
A $50\,\Omega$ generator drives a lossless $50\,\Omega$ line terminated in $100\,\Omega$. What fraction of the available power reaches the load? Does the answer depend on the line length?
::: solution
$\Gamma_g = 0$, so [[#eq-mismatch]] reduces to $1 - \abs{\Gamma_{\text{in}}}^2$, and $\abs{\Gamma_{\text{in}}} = \abs{\Gamma_L} = 1/3$ for any length. The fraction is $8/9 = 0.889$, independent of length — a matched generator does not re-reflect, so no length-dependent interference arises. (Compare [[#ex-conjugate]], where the generator was mismatched.)
:::
:::

::: exercise Load from a standing wave {level=2}
On a lossless $50\,\Omega$ line the VSWR is $3.0$ and the first voltage minimum is $0.2\lambda$ from the load. Find $Z_L$. Is it inductive or capacitive?
::: solution
$\tan\beta d_{\min} = \tan72^\circ = 3.078$. From [[#eq-zl-swr]], $z_L = (1 - j9.233)/(3 - j3.078)$. Multiplying by $(3 + j3.078)$ and dividing by $3^2 + 3.078^2 = 18.47$: numerator $3 + 28.42 + j(3.078 - 27.70) = 31.42 - j24.62$, so $z_L = 1.701 - j1.333$ and $Z_L = 85.0 - j66.6\,\Omega$, capacitive. The phase of $\Gamma_L$ is $180^\circ + 144^\circ = 324^\circ = -36^\circ$, in the lower half of the chart, consistent with that.
:::
:::

::: exercise Equivalent capacitance of an open stub {level=2 check="1/(2*pi*1e9*50*tan(2*pi*0.4)) "}
An open-circuited $50\,\Omega$ stub is $0.1\lambda$ long at $1\,\mathrm{GHz}$. Find its input reactance in ohms, and the capacitance in farads that has the same reactance at $1\,\mathrm{GHz}$. (Enter the capacitance.)
::: solution
$X = -Z_0\cot\beta\ell = -50\cot36^\circ = -68.8\,\Omega$. A capacitor with this reactance has $C = 1/(\omega\cdot68.8) = \tan36^\circ/(\omega Z_0) = 2.31\,\mathrm{pF}$.
:::
:::

::: exercise The constant-reactance circles {level=3}
Starting from $z = (1 + \Gamma)/(1 - \Gamma)$, derive the equation of the circle of constant normalised reactance $x$ in the $\Gamma$-plane. Show that the circles for $x$ and $-x$ are mirror images in the real axis, and that every constant-$x$ circle is orthogonal to every constant-$r$ circle. Why must the second fact be true without calculation?
::: hint
For orthogonality, compare the distance between centres with the radii: two circles of radii $\rho_1$, $\rho_2$ whose centres are $d$ apart cross at right angles if $d^2 = \rho_1^2 + \rho_2^2$.
:::
::: solution
As in the proof of [[#thm-smith-circles]], $x = 2v/[(1 - u)^2 + v^2]$, which rearranges to $(u - 1)^2 + (v - 1/x)^2 = 1/x^2$: centre $(1, 1/x)$, radius $1/\abs x$. Replacing $x$ by $-x$ replaces $v$ by $-v$, a reflection in the real axis. For orthogonality, the $r$-circle has centre $(r/(1 + r), 0)$ and radius $1/(1 + r)$; the distance between centres satisfies

$$
d^2 = \Bigl(1 - \frac{r}{1 + r}\Bigr)^2 + \frac1{x^2} = \frac{1}{(1 + r)^2} + \frac{1}{x^2} = \rho_r^2 + \rho_x^2 ,
$$

so they cross at right angles. Without calculation: the lines $r = $ const and $x = $ const are perpendicular in the $z$-plane, and a Möbius map is conformal (it preserves angles wherever its derivative is non-zero, here everywhere except $z = -1$), so their images are perpendicular too.
:::
:::

::: exercise Open- and short-circuit measurement {level=3 check="50"}
A short length of lossless cable measured at one frequency shows $Z_{\text{sc}} = j35\,\Omega$ with the far end shorted and $Z_{\text{oc}} = -j71.4\,\Omega$ with it open. Find $Z_0$ in ohms and the electrical length, assuming it is less than $\lambda/4$. Then derive the formulas used from the input-impedance formula.
::: solution
For a lossless line $Z_{\text{sc}} = jZ_0\tan\beta\ell$ and $Z_{\text{oc}} = -jZ_0\cot\beta\ell$. Their product is $Z_0^2$ (the $j$ and $-j$ multiply to $1$) and their ratio is $-\tan^2\beta\ell$. Numerically $Z_0 = \sqrt{35\times71.4} = 50.0\,\Omega$ and $\tan\beta\ell = \sqrt{35/71.4} = 0.700$, so $\beta\ell = 35.0^\circ$, i.e. $\ell = 0.097\lambda$. The formulas follow from [[#eq-z-gamma]] with $\Gamma_L = -1$ (short), giving $z = (1 - e^{-2j\beta\ell})/(1 + e^{-2j\beta\ell}) = j\tan\beta\ell$, and $\Gamma_L = +1$ (open), giving $-j\cot\beta\ell$.
:::
:::

::: exercise Designing a phasing line {level=3}
Two identical antennas with input impedance $Z_A = 50\,\Omega$ are to be fed in parallel from a single $50\,\Omega$ cable at $100\,\mathrm{MHz}$. The parallel combination is $25\,\Omega$. Design a matching arrangement that uses only lengths of $75\,\Omega$ cable (velocity factor $0.66$) between each antenna and the junction, and state the cable lengths and the impedance seen at the junction.
::: hint
A quarter-wave of $Z_1$ transforms $Z_A$ to $Z_1^2/Z_A$. What must each branch present so that two in parallel give $50\,\Omega$?
:::
::: solution
Each branch must present $100\,\Omega$ at the junction, so that two in parallel make $50\,\Omega$. A quarter-wave section of $Z_1$ turns $50\,\Omega$ into $Z_1^2/50$; for $100\,\Omega$ we would need $Z_1 = \sqrt{5000} = 70.7\,\Omega$, and $75\,\Omega$ cable is the nearest standard value: it gives $75^2/50 = 112.5\,\Omega$ per branch and $56.25\,\Omega$ at the junction, $\Gamma = 0.059$, a return loss of $24.6\,\mathrm{dB}$ — an excellent match. The guided wavelength is $0.66\times3\,\mathrm m = 1.98\,\mathrm m$, so each branch is $\lambda_g/4 = 0.495\,\mathrm m$ long (or an odd multiple, $1.485\,\mathrm m$, if the antennas are further apart, at the cost of bandwidth). Both branches must be the same length so that the antennas are fed in phase.
:::
:::
