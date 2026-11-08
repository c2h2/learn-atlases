A mobile-phone power amplifier transistor wants to see about $3\,\Omega$ at its output; the antenna it drives presents about $50\,\Omega$. A low-noise amplifier gives its lowest noise figure only when its input sees one particular source impedance, which is not $50\,\Omega$ either. A dipole antenna has $73\,\Omega$, a folded dipole $290\,\Omega$, a small loop a fraction of an ohm. Between every pair of such components there is a **matching network**: a lossless (or nearly lossless) circuit that transforms one impedance into another so that power flows where it should. Without one, the amplifier would deliver a fraction of its power, its output would see a standing wave that could destroy it, and the receiver would lose decibels of sensitivity.

This chapter designs matching networks. We start with the simplest, the two-element **L-section** of inductors and capacitors, derive its design equations and see on the Smith chart why there are always two solutions. Then we replace lumped elements by lines: the **single-stub tuner**, which uses a length of line and one stub, and the **quarter-wave transformer** of [[electromagnetics/transmission-lines]], now analysed for bandwidth. Cascading quarter-wave sections leads to the **binomial** and **Chebyshev** transformers and to the theory of small reflections. Finally, the **Bode–Fano limit** answers the question every designer eventually asks: how wide a band *can* this load be matched over, no matter how clever the network? Throughout we use the Smith-chart moves of [[rf-microwave/lines-smith-chart]] and the conjugate-matching theorem [[rf-microwave/lines-smith-chart#thm-conjugate]].

## Why and what to match {#sec-why}

Matching serves several purposes, and they do not always ask for the same impedance.

- **Maximum power transfer.** A generator delivers its available power only into the conjugate of its own impedance. For an amplifier output stage, "available power" is limited by voltage swing and current rather than by a Thévenin resistance, so the optimum load is a **load-line** impedance chosen for output power and efficiency, not a conjugate match — but the matching network that presents it is designed in the same way.
- **Low reflection on a line.** A matched line carries the least current and voltage for a given power, has the lowest loss, and gives a response that does not depend on its length.
- **Low noise.** The noise figure of an amplifier depends on the impedance its input sees; the optimum, $\Gamma_{\text{opt}}$, is generally not the conjugate of the input impedance ([[rf-microwave/rf-amplifiers]]).
- **Stability and filtering.** A matching network is also a filter; its out-of-band behaviour can suppress harmonics, or can present impedances at which a transistor oscillates.

In all cases the problem is the same: given a load $Z_L$ and a required impedance $Z_{\text{in}}$ (most often a real $Z_0$), find a lossless two-port that transforms one into the other at a frequency $f_0$, and as well as possible over a band around it.

::: definition Matching network and fractional bandwidth {#def-matching}
A **matching network** for a load $Z_L$ at frequency $f_0$ is a lossless two-port whose input impedance, when terminated in $Z_L$, equals a prescribed $Z_{\text{in}}$ (here $Z_0$) at $f_0$. Its **bandwidth** for a tolerance $\Gamma_m$ is the range of frequencies $[f_1, f_2]$ around $f_0$ over which $\abs{\Gamma_{\text{in}}}\le\Gamma_m$, and its **fractional bandwidth** is $(f_2 - f_1)/f_0$.
:::

Typical tolerances are $\Gamma_m = 0.1$ (VSWR $1.22$, return loss $20\,\mathrm{dB}$) for test equipment and $\Gamma_m = 0.2$–$0.33$ (VSWR $1.5$–$2$) for antennas.

## The L-section {#sec-l-section}

The simplest network has two reactive elements, one in series and one in shunt, arranged like the letter L. Which element goes next to the load depends on whether the load's resistance is above or below $Z_0$.

::: theorem L-section design equations {#thm-l-section}
Let $Z_L = R_L + jX_L$ be matched to a real $Z_0$ by a shunt susceptance $jB$ and a series reactance $jX$.

1. If $R_L < Z_0$, put the series element next to the load and the shunt element at the input. Then
$$
X = \pm\sqrt{R_L(Z_0 - R_L)} - X_L, \qquad B = \pm\frac1{Z_0}\sqrt{\frac{Z_0 - R_L}{R_L}} ,
$$ {#eq-l-low}
with the same choice of sign in both.
2. If $R_L > Z_0$, put the shunt element next to the load and the series element at the input. Then
$$
B = \frac{X_L \pm\sqrt{R_L/Z_0}\,\sqrt{R_L^2 + X_L^2 - Z_0R_L}}{R_L^2 + X_L^2}, \qquad X = \frac1B + \frac{X_LZ_0}{R_L} - \frac{Z_0}{BR_L} .
$$ {#eq-l-high}

For a resistive load the network's **nodal quality factor** is $Q = \sqrt{R_{\text{high}}/R_{\text{low}} - 1}$, where $R_{\text{high}}$ and $R_{\text{low}}$ are the larger and smaller of $R_L$ and $Z_0$.
:::

::: proof
Case 1. The series element gives $R_L + j(X_L + X)$; the shunt element then must make the admittance equal to $1/Z_0$:

$$
\frac{1}{Z_0} = jB + \frac{1}{R_L + j(X + X_L)} .
$$

Multiplying out and separating real and imaginary parts gives $BZ_0(X + X_L) = Z_0 - R_L$ and $(X + X_L) = BZ_0R_L$. Substituting the second into the first, $B^2Z_0^2R_L = Z_0 - R_L$, which gives $B$; then $X + X_L = BZ_0R_L = \pm\sqrt{R_L(Z_0 - R_L)}$. A real solution exists only if $R_L < Z_0$.

Case 2. The shunt element gives the admittance $jB + 1/Z_L$; then the series element must make the impedance $Z_0$:

$$
Z_0 = jX + \frac{1}{jB + 1/(R_L + jX_L)} .
$$

Separating real and imaginary parts yields $B(XR_L - X_LZ_0) = R_L - Z_0$ and $X(1 - BX_L) = BZ_0R_L - X_L$. Eliminating $X$ gives a quadratic in $B$, $Z_0(R_L^2 + X_L^2)B^2 - 2X_LZ_0B + (Z_0 - R_L) = 0$, whose roots are [[#eq-l-high]]; $X$ then follows from the second equation. The discriminant $R_L(R_L^2 + X_L^2 - Z_0R_L)$ is positive when $R_L > Z_0$.

For a resistive load in case 1, the series element has $\abs{X}/R_L = \sqrt{(Z_0 - R_L)/R_L} = \sqrt{Z_0/R_L - 1}$ and the shunt element $\abs B/(1/Z_0) = $ the same; case 2 is symmetric with $R_L$ and $Z_0$ exchanged.
:::

The two signs give two networks. For a resistive load one is a **low-pass** network (series inductor, shunt capacitor), which also attenuates harmonics and passes DC; the other is a **high-pass** network (series capacitor, shunt inductor), which blocks DC and can provide a bias path through the inductor. The choice between them is made on those grounds, or on which gives realistic component values, since the theory gives the same $Q$ for both.

### On the Smith chart

Case 2 has an elegant picture. A load with $R_L > Z_0$ lies inside the $r = 1$ circle. The final series element moves along a constant-$r$ circle, so it can reach the centre only from the $r = 1$ circle; the shunt element must therefore move the load, along its constant-$g$ circle, onto the $r = 1$ circle, which the constant-$g$ circle of the load crosses at two points, one above and one below the real axis. Those two crossings are the two solutions. From each, the series element slides along $r = 1$ to the centre. In case 1 the roles are swapped: the load is inside the $g = 1$ circle; a series element moves it along its $r$-circle to one of the two intersections with $g = 1$, and a shunt element then moves it along $g = 1$ to the centre. A load outside both unit circles (in the region where $r < 1$ and $g < 1$) can be matched either way.

::: example An L-section for a 2.4 GHz antenna {#ex-l-antenna}
A patch antenna fed at its edge presents $Z_L = 150 + j60\,\Omega$ at $2.4\,\mathrm{GHz}$. Design both L-sections that match it to $50\,\Omega$ and give the component values.
::: solution
Here $R_L = 150 > Z_0$, so the shunt element goes next to the load (case 2). With $R_L^2 + X_L^2 = 22\,500 + 3600 = 26\,100$ and $\sqrt{R_L/Z_0}\sqrt{R_L^2 + X_L^2 - Z_0R_L} = \sqrt3\sqrt{18\,600} = 236.2$:

$$
B = \frac{60\pm236.2}{26\,100} = +11.35\,\mathrm{mS}\ \text{or}\ -6.75\,\mathrm{mS} .
$$

Then $X = 1/B + X_LZ_0/R_L - Z_0/(BR_L)$:

- Solution 1: $B = 11.35\,\mathrm{mS}$, $X = 88.1 + 20 - 29.4 = +78.7\,\Omega$. A shunt capacitor $C = B/\omega = 0.753\,\mathrm{pF}$ and a series inductor $L = X/\omega = 5.22\,\mathrm{nH}$: a low-pass network.
- Solution 2: $B = -6.75\,\mathrm{mS}$, $X = -78.7\,\Omega$. A shunt inductor $L = -1/(\omega B) = 9.82\,\mathrm{nH}$ and a series capacitor $C = -1/(\omega X) = 0.842\,\mathrm{pF}$: a high-pass network.

Check solution 1: $1/Z_L = (150 - j60)/26\,100 = 5.747 - j2.299\,\mathrm{mS}$; adding $j11.35\,\mathrm{mS}$ gives $5.747 + j9.05\,\mathrm{mS}$, whose inverse is $50.0 - j78.7\,\Omega$; adding $+j78.7\,\Omega$ gives $50\,\Omega$. A sweep shows $\abs{\Gamma_{\text{in}}}\le0.2$ from $1.98$ to $2.74\,\mathrm{GHz}$ ($32\,\%$) for solution 1 and from $2.05$ to $2.93\,\mathrm{GHz}$ ($37\,\%$) for solution 2, with the antenna modelled as $150\,\Omega$ in series with an inductance (in reality a patch antenna is far narrower than either network, and its own $Q$ sets the bandwidth). Component values below $1\,\mathrm{pF}$ are awkward — a $0402$ capacitor's own parasitics are a few tenths of a picofarad — which is a reason to use distributed elements at this frequency.
:::
:::

### Bandwidth and the Q of the network

At the centre frequency a lossless matching network stores energy in its reactances; the ratio of stored energy to power delivered sets how fast the match deteriorates away from $f_0$. For an L-section between two resistances, the loaded quality factor of the circuit — the network $Q$ with both terminations in place — is about $Q/2$, and the fractional bandwidth for a given tolerance $\Gamma_m$ is roughly inversely proportional to $Q$ (for small $\Gamma_m$ and large ratios, about $2\Gamma_m/Q$). The useful consequence is qualitative: **a large impedance ratio forces a high $Q$ and a narrow bandwidth.** Matching $5\,\Omega$ to $50\,\Omega$ needs $Q = 3$; matching $1\,\Omega$ to $50\,\Omega$ needs $Q = 7$.

To widen the band, split the transformation into steps. Two L-sections in cascade, each transforming by the factor $\sqrt{R_{\text{high}}/R_{\text{low}}}$ through an intermediate resistance $R_i = \sqrt{R_{\text{high}}R_{\text{low}}}$, each have the lower $Q = \sqrt{\sqrt{R_{\text{high}}/R_{\text{low}}} - 1}$. Conversely, a **π-** or **T-network** (three elements) transforms through an intermediate resistance *higher* (or lower) than both terminations, which raises $Q$ and narrows the band deliberately when selectivity is wanted, as in the output network of a transmitter.

::: widget plot
f: sqrt(((k/(1 + (k - 1)*x^2) - 1)^2 + (k - 1)*x^2*(1 - k/(1 + (k - 1)*x^2))^2)/((k/(1 + (k - 1)*x^2) + 1)^2 + (k - 1)*x^2*(1 - k/(1 + (k - 1)*x^2))^2)); 1/sqrt(1 + 4*k/((k - 1)^2*cos(pi/2*x)^2))
x: 0.4, 1.6
y: 0, 1
sliders: k=4:1.2:20:0.1
hlines: 0.1; 0.2
labels: \lvert\Gamma_{\text{in}}\rvert\ \text{L-section}; \lvert\Gamma_{\text{in}}\rvert\ \lambda/4\ \text{transformer}
caption: Reflection coefficient against normalised frequency $f/f_0$ for a resistive load $R_L = kZ_0$ matched by a low-pass L-section (series $L$, shunt $C$ across the load) and by a single quarter-wave transformer, both designed for $f_0$. The horizontal lines are $\lvert\Gamma\rvert = 0.1$ and $0.2$. Increase the ratio $k$: both bandwidths shrink, because the network must store more energy. For moderate ratios the quarter-wave line is slightly broader than the L-section; both are a long way from the Bode–Fano limit.
:::

::: example A low-impedance transmitter stage {#ex-l-pa}
The output of a $433\,\mathrm{MHz}$ transmitter transistor should see a load of $12.5\,\Omega$. Design a low-pass L-section that presents $12.5\,\Omega$ when terminated by a $50\,\Omega$ antenna, and estimate its bandwidth.
::: solution
Seen from the antenna side, the problem is to match $R_L = 12.5\,\Omega$ to $Z_0 = 50\,\Omega$; the network is reciprocal, so a network that turns $12.5\,\Omega$ into $50\,\Omega$ turns $50\,\Omega$ into $12.5\,\Omega$ when reversed. With $R_L < Z_0$ (case 1), the series element is at the $12.5\,\Omega$ side and the shunt element at the $50\,\Omega$ side:

$$
X = \sqrt{12.5\times37.5} = 21.65\,\Omega, \qquad B = \frac{1}{50}\sqrt{\frac{37.5}{12.5}} = 34.6\,\mathrm{mS} .
$$

At $\omega = 2\pi\times433\times10^6 = 2.72\times10^9\,\mathrm{rad/s}$, the series inductor is $L = 21.65/\omega = 7.96\,\mathrm{nH}$ and the shunt capacitor (across the antenna port) is $C = B/\omega = 12.7\,\mathrm{pF}$. The network $Q$ is $\sqrt{4 - 1} = 1.73$. A frequency sweep gives $\abs\Gamma\le0.1$ from $403$ to $461\,\mathrm{MHz}$ ($13\,\%$) and $\abs\Gamma\le0.2$ from $369$ to $488\,\mathrm{MHz}$ ($27\,\%$), ample for a narrowband transmitter. The low-pass topology attenuates the second harmonic at $866\,\mathrm{MHz}$, which a transmitter must suppress by law; in practice a further low-pass filter follows.
:::
:::

::: warning Lumped components are not lumped at microwave frequencies
A surface-mount capacitor has series inductance (about $0.4$–$1\,\mathrm{nH}$ for an $0402$ or $0603$ part) and resonates at its **self-resonant frequency**, above which it is inductive. An inductor has parallel capacitance between its turns and becomes capacitive above its own resonance. Both have finite $Q$ (typically $30$–$100$), so a matching network with a high network $Q$ wastes power in their resistance. A series inductor of reactance $X = Q_nR_{\text{low}}$ and quality factor $Q_c$ has resistance $X/Q_c$, which dissipates the fraction $Q_n/Q_c$ of the power flowing through $R_{\text{low}}$: about $4.3\,Q_n/Q_c\,\mathrm{dB}$ per lossy element, e.g. $0.17\,\mathrm{dB}$ for $Q_n = 2$ and $Q_c = 50$. Always use the manufacturer's S-parameter models above a few hundred megahertz.
:::

## Single-stub matching {#sec-stub}

Above a few gigahertz, matching networks are made of lines. The **single-stub tuner** uses a length $d$ of line from the load to a point where the real part of the admittance is $Y_0$, and a shunt stub of length $\ell$ there that cancels the remaining susceptance.

::: theorem Single-stub (shunt) matching {#thm-stub}
Let $Z_L = R_L + jX_L$ be at the end of a lossless line of characteristic impedance $Z_0$, and let $t = \tan\beta d$. The normalised conductance at distance $d$ from the load equals $1$ when

$$
t = \frac{X_L\pm\sqrt{R_L\bigl[(Z_0 - R_L)^2 + X_L^2\bigr]/Z_0}}{R_L - Z_0}\quad (R_L\ne Z_0), \qquad t = -\frac{X_L}{2Z_0}\quad (R_L = Z_0) ,
$$ {#eq-stub-t}

and $d = \frac{\lambda}{2\pi}\arctan t$, plus $\lambda/2$ if $t < 0$. If the admittance there is $Y_0 + jB$, a short-circuited stub of length $\ell_s = \frac{\lambda}{2\pi}\arctan\bigl(Y_0/B\bigr)$ or an open-circuited stub of length $\ell_o = \frac{\lambda}{2\pi}\arctan\bigl(-B/Y_0\bigr)$ (each plus $\lambda/2$ if negative) cancels $jB$ and completes the match.
:::

::: proof
The impedance at distance $d$ is $Z = Z_0(Z_L + jZ_0t)/(Z_0 + jZ_Lt)$, so its admittance is $Y = (Z_0 + jZ_Lt)/[Z_0(Z_L + jZ_0t)]$. Multiplying numerator and denominator by the conjugate of $Z_L + jZ_0t = R_L + j(X_L + Z_0t)$ and taking the real part gives

$$
G = \frac{R_L(1 + t^2)}{R_L^2 + (X_L + Z_0t)^2} .
$$

Setting $G = 1/Z_0$ and expanding: $Z_0(R_L - Z_0)t^2 - 2X_LZ_0t + (R_LZ_0 - R_L^2 - X_L^2) = 0$. The discriminant simplifies to $4Z_0R_L[(R_L - Z_0)^2 + X_L^2]$, and the quadratic formula gives [[#eq-stub-t]]; if $R_L = Z_0$ the quadratic degenerates to a linear equation. A short-circuited stub has admittance $-jY_0\cot\beta\ell$; requiring it to equal $-jB$ gives $\tan\beta\ell = Y_0/B$. An open stub has $jY_0\tan\beta\ell = -jB$.
:::

On the Smith chart the procedure is: plot $y_L$ on the admittance grid, rotate it clockwise on its constant-$\abs\Gamma$ circle until it meets the $g = 1$ circle (two possible meeting points, the two signs in [[#eq-stub-t]]), read the susceptance $b$ there, and choose the stub that supplies $-b$. The rotation to the first crossing gives the shorter $d$; which solution is better depends on the stub lengths too, because shorter lines mean less frequency dependence.

::: example Designing a single-stub tuner {#ex-stub}
Match $Z_L = 25 - j50\,\Omega$ to a $50\,\Omega$ line with a short-circuited shunt stub. Give both solutions in wavelengths and say which has the wider bandwidth.
::: solution
$\Gamma_L = (-25 - j50)/(75 - j50) = 0.077 - j0.615$, so $\abs{\Gamma_L} = 0.620$ and the VSWR is $4.3$. With $R_L = 25$, $X_L = -50$: $\sqrt{R_L[(Z_0 - R_L)^2 + X_L^2]/Z_0} = \sqrt{25(625 + 2500)/50} = 39.53$ and $R_L - Z_0 = -25$, so

$$
t = \frac{-50\pm39.53}{-25} = 0.419\ \text{or}\ 3.581 .
$$

- Solution 1: $d = \arctan(0.419)/(2\pi) = 0.0631\lambda$. There $y = 1 + j1.581$, so the stub must supply $b = -1.581$: $\ell_s = \arctan(1/1.581)/(2\pi) = 0.0898\lambda$.
- Solution 2: $d = \arctan(3.581)/(2\pi) = 0.2067\lambda$, $y = 1 - j1.581$, and the stub must supply $+j1.581$, which a short stub does only beyond a quarter-wave: $\ell_s = 0.5 + \arctan(-0.632)/(2\pi) = 0.4102\lambda$.

Sweeping frequency (load held fixed, all lengths scaled with frequency) gives $\abs{\Gamma_{\text{in}}}\le0.2$ over $0.887$–$1.144\,f_0$ (about $26\,\%$) for solution 1, but only $0.964$–$1.028\,f_0$ ($6\,\%$) for solution 2. The shorter total length wins: the electrical length of a long line changes by many degrees for a small change in frequency.
:::
:::

::: remark Double-stub tuners
A single-stub tuner needs a stub at an adjustable position $d$, which is inconvenient in a fixed fixture. A **double-stub tuner** has two stubs at fixed positions, typically $\lambda/8$ or $3\lambda/8$ apart, and matches by adjusting only their lengths. The first stub moves the load along its constant-$g$ circle onto the $g = 1$ circle rotated *towards the load* by the stub spacing; the line section then rotates it onto $g = 1$, and the second stub cancels the susceptance. Loads whose conductance $g$ is too large — inside a circle tangent to the rotated $g = 1$ circle, $g > 1/\sin^2\beta d_s$ — cannot be matched: the double-stub tuner has a **forbidden region**, avoided by adding a section of line in front of the load.
:::

::: quiz
In a single-stub design, the load admittance is rotated clockwise along its constant-VSWR circle to an intersection with the $g = 1$ circle that lies in the *upper* half of the chart. What stub is needed there?
- [ ] A short-circuited stub shorter than $\lambda/4$
- [x] An open-circuited stub shorter than $\lambda/4$ (or a shorted stub between $\lambda/4$ and $\lambda/2$)
- [ ] A stub of exactly $\lambda/4$
- [ ] No stub: every point on the $g = 1$ circle is matched
::: solution
In the upper half of the chart the admittance is inductive, $y = 1 - j\abs b$ (negative susceptance, see the warning in [[rf-microwave/lines-smith-chart]]). The stub must cancel it by supplying $+j\abs b$, a capacitive susceptance: an open stub shorter than $\lambda/4$ ($jY_0\tan\beta\ell$) or a shorted stub longer than $\lambda/4$. A shorted stub shorter than $\lambda/4$ is inductive and would make things worse; a $\lambda/4$ stub is an open or short circuit, not a susceptance of the right size. Only the centre of the $g = 1$ circle, $b = 0$, is matched. In [[#ex-stub]], solution 1 lands in the lower half ($y = 1 + j1.581$) and needs an inductive stub.
:::
:::

## Quarter-wave transformers and the theory of small reflections {#sec-qw}

The quarter-wave transformer $Z_1 = \sqrt{Z_0R_L}$ matches a resistive load perfectly at the frequency where it is $\lambda/4$ long. How good is it nearby?

::: theorem Bandwidth of a quarter-wave transformer {#thm-qw-band}
Let a section of $Z_1 = \sqrt{Z_0R_L}$ and electrical length $\theta = \beta\ell = \frac{\pi}{2}\frac{f}{f_0}$ (TEM line) match $R_L$ to $Z_0$. Then

$$
\abs{\Gamma(\theta)} = \left[1 + \frac{4Z_0R_L}{(R_L - Z_0)^2}\sec^2\theta\right]^{-1/2} \approx \frac{\abs{R_L - Z_0}}{2\sqrt{Z_0R_L}}\abs{\cos\theta}\quad(\theta\approx\pi/2) ,
$$ {#eq-qw-gamma}

and the fractional bandwidth for $\abs\Gamma\le\Gamma_m$ is

$$
\frac{\Delta f}{f_0} = 2 - \frac4\pi\arccos\left[\frac{\Gamma_m}{\sqrt{1 - \Gamma_m^2}}\,\frac{2\sqrt{Z_0R_L}}{\abs{R_L - Z_0}}\right] .
$$ {#eq-qw-bw}
:::

::: proof
With $t = \tan\theta$, the input impedance is $Z_{\text{in}} = Z_1(R_L + jZ_1t)/(Z_1 + jR_Lt)$; substituting $Z_1^2 = Z_0R_L$ and forming $\Gamma = (Z_{\text{in}} - Z_0)/(Z_{\text{in}} + Z_0)$, the factors of $Z_1$ cancel to give $\Gamma = (R_L - Z_0)/[R_L + Z_0 + 2jt\sqrt{Z_0R_L}]$. Its magnitude squared is $(R_L - Z_0)^2/[(R_L + Z_0)^2 + 4t^2Z_0R_L]$; writing $(R_L + Z_0)^2 = (R_L - Z_0)^2 + 4Z_0R_L$ and $1 + t^2 = \sec^2\theta$ gives [[#eq-qw-gamma]]. Setting $\abs\Gamma = \Gamma_m$ and solving for $\cos\theta_m$ gives the band edge $\theta_m < \pi/2$; the response is symmetric about $\pi/2$, so the band is $2(\pi/2 - \theta_m)$ in $\theta$, which is $\Delta f/f_0 = 2 - 4\theta_m/\pi$.
:::

For a $4{:}1$ ratio ($50$ to $200\,\Omega$) and $\Gamma_m = 0.1$, [[#eq-qw-bw]] gives $\theta_m = 82.3^\circ$ and a fractional bandwidth of $17\,\%$. For a $2{:}1$ ratio the same tolerance gives about $35\,\%$.

### Multisection transformers

A cascade of $N$ quarter-wave sections, with impedances stepping gradually from $Z_0$ to $R_L$, does much better. The key approximation is that each small step reflects a little and the reflections add with the phase delays of the sections between them.

::: theorem Theory of small reflections {#thm-small-reflections}
Let $N$ sections of equal electrical length $\theta$ have impedances $Z_1, \dots, Z_N$ between $Z_0$ and $Z_{N+1} = R_L$, and let the local reflection coefficients $\Gamma_n = (Z_{n+1} - Z_n)/(Z_{n+1} + Z_n)$, $n = 0,\dots,N$, all be small. Then, neglecting multiple reflections,

$$
\Gamma(\theta)\approx\Gamma_0 + \Gamma_1e^{-2j\theta} + \Gamma_2e^{-4j\theta} + \dots + \Gamma_Ne^{-2jN\theta} ,
$$ {#eq-small-refl}

and $\Gamma_n\approx\tfrac12\ln(Z_{n+1}/Z_n)$.
:::

::: proof
Each step $n$ produces a reflected wave of relative amplitude $\Gamma_n$ when the incident wave reaches it; that wave has travelled $n$ sections to get there and $n$ sections back, a phase delay $2n\theta$. Transmission through earlier steps multiplies by $(1 + \Gamma_k)(1 - \Gamma_k)\approx1$, and waves reflected more than once carry products $\Gamma_j\Gamma_k$, both negligible to first order. Finally $(Z_{n+1} - Z_n)/(Z_{n+1} + Z_n) = \tanh\bigl(\tfrac12\ln(Z_{n+1}/Z_n)\bigr)\approx\tfrac12\ln(Z_{n+1}/Z_n)$ for small steps.
:::

[[#eq-small-refl]] is a polynomial in $e^{-2j\theta}$, so designing a transformer is designing a polynomial — the same problem as designing a digital FIR filter ([[dsp/fir-filter-design]]). Two choices are classical.

::: definition Binomial and Chebyshev transformers {#def-binomial}
A **binomial** (maximally flat) transformer chooses $\Gamma(\theta) = A(1 + e^{-2j\theta})^N$, so that $\abs\Gamma = 2^N\abs A\abs{\cos\theta}^N$ has $N - 1$ zero derivatives at $\theta = \pi/2$. Then $\Gamma_n = A\binom Nn$ with $A = 2^{-N}(R_L - Z_0)/(R_L + Z_0)$, and approximately

$$
\ln\frac{Z_{n+1}}{Z_n} = 2^{-N}\binom Nn\ln\frac{R_L}{Z_0} .
$$ {#eq-binomial}

A **Chebyshev** (equal-ripple) transformer makes $\abs\Gamma$ proportional to a Chebyshev polynomial $T_N(\sec\theta_m\cos\theta)$, so that it ripples between $0$ and $\Gamma_m$ across the band; for a given $N$ and $\Gamma_m$ it has the widest possible bandwidth.
:::

The binomial bandwidth follows from $2^N\abs A\cos^N\theta_m = \Gamma_m$: $\Delta f/f_0 = 2 - (4/\pi)\arccos[\tfrac12(\Gamma_m/\abs A)^{1/N}]$.

::: example A three-section binomial transformer {#ex-binomial}
Design a three-section binomial transformer from $50\,\Omega$ to $200\,\Omega$ and compare its bandwidth for $\Gamma_m = 0.1$ with a single quarter-wave section.
::: solution
$\ln(200/50) = 1.386$ and $2^{-3}\binom3n = \tfrac18, \tfrac38, \tfrac38$ for $n = 0, 1, 2$. By [[#eq-binomial]]:

$$
Z_1 = 50e^{1.386/8} = 59.5\,\Omega, \quad Z_2 = 59.5e^{3(1.386)/8} = 100.0\,\Omega, \quad Z_3 = 100e^{3(1.386)/8} = 168.2\,\Omega ,
$$

and the last step to $200\,\Omega$ is again $e^{1.386/8}$. The design is symmetric about the geometric mean $\sqrt{50\times200} = 100\,\Omega$.

For the bandwidth, $A = \tfrac18\cdot\tfrac{150}{250} = 0.075$ and $\cos\theta_m = \tfrac12(0.1/0.075)^{1/3} = 0.550$, so $\theta_m = 56.6^\circ$ and $\Delta f/f_0 = 2 - 4(56.6)/180 = 0.74$. An exact calculation (cascading the three input-impedance transformations at each frequency) gives $\abs\Gamma\le0.1$ from $0.66f_0$ to $1.34f_0$, a fractional bandwidth of $0.68$: the small-reflection approximation is a little optimistic for a $4{:}1$ ratio. Either way the three sections give four times the $17\,\%$ bandwidth of the single section, at the cost of three times the length.
:::
:::

::: widget plot
f: 1/sqrt(1 + 4*k/((k - 1)^2*cos(pi/2*x)^2)); abs((k - 1)/(k + 1))*abs(cos(pi/2*x))^2; abs((k - 1)/(k + 1))*abs(cos(pi/2*x))^3
x: 0, 2
y: 0, 0.8
sliders: k=4:1.2:20:0.1
hlines: 0.1
labels: N = 1\ \text{(exact)}; N = 2\ \text{binomial}; N = 3\ \text{binomial}
caption: Reflection coefficient against $f/f_0$ for transformers from $Z_0$ to $R_L = kZ_0$: one quarter-wave section (exact) and two- and three-section binomial transformers (small-reflection approximation). At $f/f_0 = 1$ every curve is zero; at $f = 0$ and $2f_0$ the sections are half a wavelength long and the transformer is invisible, so $\lvert\Gamma\rvert$ equals that of the bare load. Each extra section flattens the bottom of the curve. Read the bandwidth where the curves cross the line $\lvert\Gamma\rvert = 0.1$.
:::

## The Bode–Fano limit {#sec-bode-fano}

Adding sections widens the bandwidth of a resistive load without limit. A *reactive* load is different: its stored energy cannot be removed by any lossless network, and that sets a hard bound.

::: theorem Bode–Fano criterion {#thm-bode-fano}
For a load consisting of a resistance $R$ in parallel with a capacitance $C$, any lossless passive matching network satisfies

$$
\int_0^\infty\ln\frac{1}{\abs{\Gamma(\omega)}}\,\mathrm d\omega\le\frac{\pi}{RC} .
$$ {#eq-bode-fano}

For a series $RL$ load the bound is $\pi R/L$; analogous bounds hold for series $RC$ ($\int\omega^{-2}\ln(1/\abs\Gamma)\,\mathrm d\omega\le\pi RC$) and parallel $RL$ loads. If $\abs\Gamma = \Gamma_m$ over a band $\Delta\omega$ and $\abs\Gamma = 1$ elsewhere — the best possible use of the integral — then

$$
\Delta\omega\,\ln\frac{1}{\Gamma_m}\le\frac{\pi}{RC} .
$$ {#eq-bode-fano-band}
:::

::: proof
A sketch; the full proof is in Fano's 1950 paper and in Pozar's or Matthaei, Young and Jones's books. Look into the matching network from the load end: the reflection coefficient $\Gamma'(s)$ seen there is analytic in the right half $s$-plane (the network is passive and lossless) and has the same magnitude as $\Gamma$ on the $j\omega$ axis. Because the load's capacitor shunts the port, the behaviour of $\Gamma'(s)$ at high frequency is fixed by $RC$ alone, whatever the network. Integrating $\ln(1/\Gamma')$ round a contour enclosing the right half-plane (Cauchy's theorem), the $j\omega$-axis integral equals $\pi/(RC)$ minus a non-negative contribution from any zeros of $\Gamma'$ in the right half-plane, which gives the inequality. For the band form, the integrand is zero outside the band ($\abs\Gamma = 1$) and $\ln(1/\Gamma_m)$ inside.
:::

The criterion is a conservation law. The integral of the *matching quality* $\ln(1/\abs\Gamma)$ over frequency is fixed by the load's $Q$ at a given frequency, $Q_L = \omega_0RC$: writing [[#eq-bode-fano-band]] as $(\Delta\omega/\omega_0)\ln(1/\Gamma_m)\le\pi/Q_L$ shows that a high-$Q$ load is fundamentally narrowband. Demanding a perfect match ($\Gamma_m = 0$) allows zero bandwidth; demanding a good match over a wide band is impossible. Real networks with a finite number of elements fall short of the bound; a well-designed Chebyshev network of a few elements gets within a factor of two or so.

::: example How wide can an antenna be matched? {#ex-bode-fano}
A small antenna is modelled near $1\,\mathrm{GHz}$ as $R = 100\,\Omega$ in parallel with $C = 2\,\mathrm{pF}$. What is the largest bandwidth over which it can be matched to $\abs\Gamma\le0.1$? What is its $Q$?
::: solution
$\pi/(RC) = \pi/(2\times10^{-10}) = 1.571\times10^{10}\,\mathrm{rad/s}$, and $\ln(1/0.1) = 2.303$. By [[#eq-bode-fano-band]], $\Delta\omega\le6.82\times10^9\,\mathrm{rad/s}$, i.e. $\Delta f\le1.09\,\mathrm{GHz}$. The load $Q$ at $1\,\mathrm{GHz}$ is $\omega RC = 2\pi(10^9)(100)(2\times10^{-12}) = 1.26$, low, so a very wide match is possible in principle; a realistic three- or four-element network might reach half the bound. If the specification is relaxed to $\abs\Gamma\le0.33$ (VSWR $2$), $\ln3 = 1.10$ and the bound doubles to $2.3\,\mathrm{GHz}$.
:::
:::

::: quiz
A load is matched over a band $\Delta f$ with $\abs\Gamma\le0.1$ by a good multi-element network close to the Bode–Fano limit. The specification is tightened to $\abs\Gamma\le0.01$. By about what factor must the bandwidth shrink?
- [ ] $10$
- [x] $2$
- [ ] $\sqrt{10}$
- [ ] It need not shrink if more elements are used
::: solution
At the limit $\Delta\omega\ln(1/\Gamma_m)$ is constant. $\ln(1/0.1) = 2.30$ and $\ln(1/0.01) = 4.61$, so the bandwidth halves. The logarithm makes the trade generous: a tenfold better match costs only a factor of two in bandwidth. Adding elements helps approach the bound but cannot exceed it.
:::
:::

::: application Matching networks in a phone
The front end of a smartphone contains dozens of matching networks: between each power-amplifier stage, at the antenna switch, on every filter port and at the low-noise amplifiers. Because a phone covers bands from $600\,\mathrm{MHz}$ to over $6\,\mathrm{GHz}$, and the antenna impedance changes when a hand covers it, modern phones include **antenna tuners**: L- and π-networks whose capacitors are banks of switched capacitors or MEMS varactors, retuned in real time to keep the power amplifier's load near its optimum. The Bode–Fano limit is the reason a single fixed network cannot do the job over the whole range.
:::

::: history
The quarter-wave transformer is as old as transmission-line theory, and stepped lines with binomial responses were in use in radar plumbing during the Second World War. Hendrik Bode, at Bell Telephone Laboratories, derived the gain–bandwidth integral relations for networks loaded by a parallel RC in his 1945 book *Network Analysis and Feedback Amplifier Design*. Robert Fano, at MIT, generalised the result to arbitrary loads in his doctoral work and published it in 1950 in the *Journal of the Franklin Institute* as "Theoretical limitations on the broadband matching of arbitrary impedances". Optimum (Chebyshev) multisection transformers were worked out in the mid-1950s by Seymour Cohn, Robert Collin and Henry Riblet, and their tables were collected in 1964 by Matthaei, Young and Jones.
:::

## Where this leads {#sec-next}

The L-section and the stub reappear in every amplifier design of [[rf-microwave/rf-amplifiers]], where the input and output matching networks present a transistor with impedances chosen for gain, stability and noise. Coupled-resonator filters in [[rf-microwave/passive-microwave-components]] are designed with the same polynomial ideas as multisection transformers, and antennas ([[rf-microwave/antennas]]) are the loads whose bandwidth the Bode–Fano limit constrains most severely.

::: summary
- A lossless matching network transforms $Z_L$ to a prescribed impedance at $f_0$; its bandwidth is the band where $\abs{\Gamma_{\text{in}}}\le\Gamma_m$.
- An L-section has a series and a shunt element; the shunt element goes next to the load when $R_L > Z_0$. There are two solutions (low-pass and high-pass), and $Q = \sqrt{R_{\text{high}}/R_{\text{low}} - 1}$.
- Large impedance ratios mean high $Q$ and narrow bandwidth; cascading sections through intermediate resistances widens the band.
- A single-stub tuner places a shunt stub at a distance $d$ where $g = 1$; the solution with the shorter lines has the wider bandwidth.
- A quarter-wave transformer's bandwidth follows from $\abs\Gamma = [1 + 4Z_0R_L\sec^2\theta/(R_L - Z_0)^2]^{-1/2}$; multisection binomial and Chebyshev transformers are designed with the theory of small reflections, $\Gamma\approx\sum\Gamma_ne^{-2jn\theta}$.
- The Bode–Fano limit $\Delta\omega\ln(1/\Gamma_m)\le\pi/(RC)$ bounds the bandwidth of any lossless match to a reactive load.
:::

## Exercises

::: exercise The Q of a 4:1 match {level=1 check="sqrt(3)"}
What is the nodal $Q$ of an L-section matching a $200\,\Omega$ resistor to $50\,\Omega$?
::: solution
$Q = \sqrt{200/50 - 1} = \sqrt3 = 1.73$.
:::
:::

::: exercise A quarter-wave transformer to a low impedance {level=1 check="25"}
A $12.5\,\Omega$ resistive load is matched to $50\,\Omega$ with a single quarter-wave section. What is the section's characteristic impedance, in ohms?
::: solution
$Z_1 = \sqrt{50\times12.5} = 25\,\Omega$.
:::
:::

::: exercise Bode–Fano bandwidth {level=1 check="1/(2*50*5e-12*ln(5))"}
A load is a $50\,\Omega$ resistor in parallel with $5\,\mathrm{pF}$. What is the largest bandwidth, in hertz, over which it can be matched with $\abs\Gamma\le0.2$?
::: solution
$\Delta\omega\le\pi/(RC\ln5)$, so $\Delta f = \Delta\omega/(2\pi)\le1/(2RC\ln5) = 1/(2\times50\times5\times10^{-12}\times1.609) = 1.24\,\mathrm{GHz}$.
:::
:::

::: exercise A 25 Ω to 50 Ω L-section {level=2 check="25/(2*pi*1e8)"}
Design a low-pass L-section that matches a $25\,\Omega$ resistor to $50\,\Omega$ at $100\,\mathrm{MHz}$. Give the inductance (in henries) and the capacitance, and say where each goes.
::: solution
$R_L < Z_0$, so the series inductor is next to the load and the shunt capacitor at the $50\,\Omega$ input. $X = \sqrt{25\times25} = 25\,\Omega$, $L = 25/(2\pi\times10^8) = 39.8\,\mathrm{nH}$; $B = (1/50)\sqrt{25/25} = 20\,\mathrm{mS}$, $C = 0.02/(2\pi\times10^8) = 31.8\,\mathrm{pF}$. Check: $25 + j25\,\Omega$ has admittance $0.02 - j0.02\,\mathrm S$; adding $+j0.02\,\mathrm S$ leaves $0.02\,\mathrm S = 1/50\,\Omega$.
:::
:::

::: exercise A stub for a resistive load {level=2 check="atan(sqrt(2))/(2*pi)"}
A $100\,\Omega$ resistor terminates a $50\,\Omega$ line. Find the shortest distance $d$ from the load, in wavelengths, at which a shunt stub can complete a match, and the normalised susceptance the stub must cancel.
::: solution
With $X_L = 0$, [[#eq-stub-t]] gives $t = \pm\sqrt{100\times2500/50}/50 = \pm\sqrt2$. The positive root gives $d = \arctan\sqrt2/(2\pi) = 0.152\lambda$. At that point $G = 100(1 + 2)/(10^4 + 5000) = 0.02\,\mathrm S$ as required, and the normalised admittance is $y = 1 + j0.707$ (the load, $y_L = 0.5$, has rotated clockwise into the lower half). The stub must supply $-j0.707$: a short-circuited stub with $\cot\beta\ell = 0.707$, i.e. $\ell = \arctan(1.414)/(2\pi) = 0.152\lambda$.
:::
:::

::: exercise A two-section binomial transformer {level=2 check="50*2^(1/4)"}
Design a two-section binomial transformer from $50\,\Omega$ to $100\,\Omega$. Give $Z_1$ (in ohms) and $Z_2$.
::: solution
$N = 2$: $\ln(Z_1/50) = \tfrac14\ln2$ and $\ln(Z_2/Z_1) = \tfrac24\ln2$. So $Z_1 = 50\times2^{1/4} = 59.5\,\Omega$ and $Z_2 = 59.5\times2^{1/2} = 84.1\,\Omega$, symmetric about $\sqrt{5000} = 70.7\,\Omega$ ($Z_1Z_2 = Z_0R_L$).
:::
:::

::: exercise Bandwidth of a quarter-wave transformer {level=3}
Derive [[#eq-qw-gamma]] in detail, then show that near $\theta = \pi/2$ the approximation $\abs\Gamma\approx\abs{R_L - Z_0}\abs{\cos\theta}/(2\sqrt{Z_0R_L})$ holds. Use it to estimate the bandwidth for $Z_0 = 50\,\Omega$, $R_L = 100\,\Omega$, $\Gamma_m = 0.05$, and compare with the exact formula.
::: solution
Following the proof of [[#thm-qw-band]], $\Gamma = (R_L - Z_0)/(R_L + Z_0 + 2jt\sqrt{Z_0R_L})$. Near $\theta = \pi/2$, $\abs t\to\infty$, so the $2jt\sqrt{Z_0R_L}$ term dominates the denominator: $\abs\Gamma\approx\abs{R_L - Z_0}/(2\abs t\sqrt{Z_0R_L})$, and $1/\abs t = \abs{\cos\theta}/\abs{\sin\theta}\approx\abs{\cos\theta}$. For the numbers, $\abs{R_L - Z_0}/(2\sqrt{Z_0R_L}) = 50/141.4 = 0.354$, so $\cos\theta_m\approx0.05/0.354 = 0.141$, $\theta_m = 81.9^\circ$, and $\Delta f/f_0\approx2 - 4(81.9)/180 = 0.18$. The exact formula has the factor $1/\sqrt{1 - \Gamma_m^2} = 1.001$, giving $\cos\theta_m = 0.1416$ and the same $18\,\%$ to two figures. The approximation is excellent whenever $\Gamma_m$ is small.
:::
:::

::: exercise Widening the band with two L-sections {level=3}
A $5\,\Omega$ resistive source must be matched to $50\,\Omega$ at $100\,\mathrm{MHz}$. Design (a) a single low-pass L-section and (b) two cascaded low-pass L-sections through the intermediate resistance $R_i = \sqrt{5\times50}$. Give component values and compare the network $Q$ and the bandwidth for $\abs\Gamma\le0.1$.
::: hint
For an L-section from $R_{\text{low}}$ (series $L$ side) to $R_{\text{high}}$ (shunt $C$ side), $Q = \sqrt{R_{\text{high}}/R_{\text{low}} - 1}$, $\omega L = QR_{\text{low}}$ and $\omega C = Q/R_{\text{high}}$.
:::
::: solution
(a) $Q = \sqrt{10 - 1} = 3$: $\omega L = 15\,\Omega$, $L = 23.9\,\mathrm{nH}$; $\omega C = 3/50$, $C = 95.5\,\mathrm{pF}$.

(b) $R_i = 15.81\,\Omega$, and each section has $Q = \sqrt{3.162 - 1} = 1.47$. First section ($5\to15.81\,\Omega$): $\omega L_1 = 7.35\,\Omega$, $L_1 = 11.7\,\mathrm{nH}$; $\omega C_1 = 1.47/15.81$, $C_1 = 148\,\mathrm{pF}$. Second section ($15.81\to50\,\Omega$): $\omega L_2 = 23.25\,\Omega$, $L_2 = 37.0\,\mathrm{nH}$; $\omega C_2 = 1.47/50$, $C_2 = 46.8\,\mathrm{pF}$.

Sweeping the input reflection with the $5\,\Omega$ termination gives $\abs\Gamma\le0.1$ from $96.4$ to $103.5\,\mathrm{MHz}$ ($7.1\,\%$) for the single section and from $93.3$ to $108.8\,\mathrm{MHz}$ ($15.5\,\%$) for the cascade: roughly double, at the cost of two more components. More sections continue the improvement, approaching the behaviour of a tapered line.
:::
:::

::: exercise Deriving the L-section for R_L < Z_0 {level=3}
Derive [[#eq-l-low]] from first principles, and show that for a resistive load both solutions have the same $Q$. Then explain, using the Smith chart, why no L-section with the shunt element next to the load can match $R_L = 25\,\Omega$ to $50\,\Omega$.
::: solution
The derivation is in the proof of [[#thm-l-section]]: from $1/Z_0 = jB + 1/(R_L + jX')$ with $X' = X + X_L$, the real part gives $R_L/(R_L^2 + X'^2) = 1/Z_0$ and the imaginary part $B = X'/(R_L^2 + X'^2) = X'/(R_LZ_0)$. The first gives $X'^2 = R_L(Z_0 - R_L)$, so $X' = \pm\sqrt{R_L(Z_0 - R_L)}$ and $B = \pm\sqrt{(Z_0 - R_L)/R_L}/Z_0$. For a resistive load the two solutions have $\abs{X'}/R_L$ equal, hence the same $Q = \sqrt{Z_0/R_L - 1}$.

With the shunt element first, the load point ($z = 0.5$, $g = 2$) moves along the $g = 2$ circle. The final series element can reach the centre only from the $r = 1$ circle. The $g = 2$ circle has centre $-2/3$ and radius $1/3$; the $r = 1$ circle has centre $1/2$ and radius $1/2$. Their centres are $7/6$ apart, more than the sum of the radii, $5/6$, so the circles do not meet. No shunt susceptance can bring the point onto $r = 1$.
:::
:::
