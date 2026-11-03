Connect a signal generator to an oscilloscope with $20\,\mathrm m$ of coaxial cable and send a fast step down it. If the far end is left open, the scope at the near end shows the step, then nothing for $200\,\mathrm{ns}$, then a second step of the same size arriving back: the signal has travelled to the open end and been reflected. Terminate the far end with a $50\,\Omega$ resistor and the echo disappears. Replace the resistor with a short circuit and the echo comes back inverted, cancelling the step. No lumped circuit of resistors, capacitors and inductors behaves like this. The cable is a **transmission line**: a structure that guides an electromagnetic wave, and along which voltage and current are waves too.

Every high-speed digital interconnect, every RF and microwave circuit, every antenna feed, every cable-TV and Ethernet cable and every long power line is a transmission line. This chapter develops the theory from a distributed-circuit model whose parameters are the capacitance, inductance, resistance and conductance per unit length computed in earlier chapters. The telegrapher's equations lead to the wave solutions, the characteristic impedance and the propagation constant. Terminating the line gives the reflection coefficient, standing waves and the input-impedance formula, whose graphical form is the **Smith chart**. Finally we follow pulses in the time domain with bounce diagrams, which is how signal-integrity engineers think about reflections on circuit boards. The plane-wave concepts of [[electromagnetics/plane-waves]] and [[electromagnetics/reflection-refraction]] reappear here almost word for word, and phasors are those of [[circuits-2/sinusoids-phasors]].

## The distributed model

A **TEM transmission line** consists of two (or more) parallel conductors separated by a dielectric: a coaxial cable, a twin-lead or twisted pair, a microstrip trace over a ground plane, a stripline buried between two planes. Its fields are transverse to the direction of propagation, and in each cross-section they have the shape of the static fields of [[electromagnetics/conductors-dielectrics]] and [[electromagnetics/magnetostatics]]: the electric field of two conductors at different potentials and the magnetic field of equal and opposite currents. That makes it possible to describe the line by four parameters per unit length.

::: definition Line parameters {#def-line-params}
A uniform two-conductor line is characterised by

- $R'$ ($\Omega/\mathrm m$): series resistance of both conductors per unit length;
- $L'$ ($\mathrm{H/m}$): series inductance per unit length, from the magnetic flux between the conductors;
- $G'$ ($\mathrm{S/m}$): shunt conductance per unit length, from losses in the dielectric;
- $C'$ ($\mathrm{F/m}$): shunt capacitance per unit length between the conductors.

A short section of length $\Delta z$ is modelled as a series resistance $R'\Delta z$ and inductance $L'\Delta z$ followed by a shunt conductance $G'\Delta z$ and capacitance $C'\Delta z$.
:::

For common geometries (conductor radii $a$, $b$ or wire radius $a$ and spacing $D$, dielectric $\epsilon$, $\mu$, conductor surface resistance $R_s$ from [[electromagnetics/plane-waves#def-skin-depth]]):

| parameter | coaxial | two-wire ($D\gg a$) | parallel plate (width $w$, spacing $d$) |
|---|---|---|---|
| $L'$ | $\dfrac{\mu}{2\pi}\ln\dfrac ba$ | $\dfrac\mu\pi\ln\dfrac Da$ | $\dfrac{\mu d}{w}$ |
| $C'$ | $\dfrac{2\pi\epsilon}{\ln(b/a)}$ | $\dfrac{\pi\epsilon}{\ln(D/a)}$ | $\dfrac{\epsilon w}{d}$ |
| $R'$ (high frequency) | $\dfrac{R_s}{2\pi}\left(\dfrac1a + \dfrac1b\right)$ | $\dfrac{R_s}{\pi a}$ | $\dfrac{2R_s}{w}$ |
| $G'$ | $\dfrac{\sigma}{\epsilon}C'$ or $\omega C'\tan\delta$ | same | same |

The inductances and capacitances were derived in [[electromagnetics/induction-inductance]] and [[electromagnetics/conductors-dielectrics]]; $R'$ follows from current flowing in a skin depth on the facing surfaces, and $G'$ from [[electromagnetics/conductors-dielectrics#eq-rc]]. In every case $L'C' = \mu\epsilon$, a general property of TEM lines in a uniform dielectric.

### The telegrapher's equations

Apply Kirchhoff's laws to the section of length $\Delta z$ between $z$ and $z + \Delta z$, with voltage $v(z,t)$ between the conductors and current $i(z,t)$ in the upper conductor (returning in the lower). KVL round the section and KCL at its output node give

$$
v(z,t) - v(z+\Delta z,t) = R'\Delta z\,i + L'\Delta z\,\frac{\partial i}{\partial t}, \qquad i(z,t) - i(z+\Delta z,t) = G'\Delta z\,v + C'\Delta z\,\frac{\partial v}{\partial t} .
$$

Dividing by $\Delta z$ and letting $\Delta z\to0$:

::: theorem Telegrapher's equations {#thm-telegrapher}
$$
-\frac{\partial v}{\partial z} = R'i + L'\frac{\partial i}{\partial t}, \qquad -\frac{\partial i}{\partial z} = G'v + C'\frac{\partial v}{\partial t} .
$$ {#eq-telegrapher}

In phasor form, with $v = \mathrm{Re}[V(z)e^{j\omega t}]$ and $i = \mathrm{Re}[I(z)e^{j\omega t}]$,

$$
-\frac{\mathrm dV}{\mathrm dz} = (R' + j\omega L')I, \qquad -\frac{\mathrm dI}{\mathrm dz} = (G' + j\omega C')V .
$$ {#eq-telegrapher-phasor}
:::

The derivation uses KVL on a section only $\Delta z$ long, which is legitimate because the section is electrically small however high the frequency. The same equations follow rigorously from Maxwell's equations for the TEM mode of the line.

## Waves on the line

Differentiating the first phasor equation and substituting the second gives

$$
\frac{\mathrm d^2V}{\mathrm dz^2} = \gamma^2V, \qquad \gamma = \alpha + j\beta = \sqrt{(R' + j\omega L')(G' + j\omega C')} ,
$$ {#eq-gamma-line}

with solution $V(z) = V_0^+e^{-\gamma z} + V_0^-e^{+\gamma z}$: a forward wave and a backward wave. The current follows from the first telegrapher equation, $I = -\frac{1}{R'+j\omega L'}\frac{\mathrm dV}{\mathrm dz}$.

::: definition Characteristic impedance and propagation constant {#def-z0}
The general solution on a uniform line is

$$
V(z) = V_0^+e^{-\gamma z} + V_0^-e^{\gamma z}, \qquad I(z) = \frac{V_0^+}{Z_0}e^{-\gamma z} - \frac{V_0^-}{Z_0}e^{\gamma z} ,
$$ {#eq-line-solution}

where the **characteristic impedance** is

$$
Z_0 = \sqrt{\frac{R' + j\omega L'}{G' + j\omega C'}} ,
$$

the ratio of voltage to current in either travelling wave alone. For a **lossless** line ($R' = G' = 0$), $\gamma = j\beta$ with $\beta = \omega\sqrt{L'C'}$, the phase velocity is $u_p = 1/\sqrt{L'C'}$, and $Z_0 = \sqrt{L'/C'}$ is real.
:::

The minus sign in the backward current says that a backward wave carries current in the $-z$ direction for positive voltage: the same sign flip as for $\mathbf H$ in a reflected plane wave. $Z_0$ is not a resistance that dissipates power; it is the impedance a wave "sees" as it travels, and a line of any length terminated in $Z_0$ looks like a resistor $Z_0$ at its input. The analogy with plane waves is exact: $V\leftrightarrow E$, $I\leftrightarrow H$, $Z_0\leftrightarrow\eta$, and for a lossless TEM line $u_p = 1/\sqrt{\mu\epsilon}$, the speed of a plane wave in the dielectric.

In the time domain, the lossless telegrapher's equations combine into the wave equation $\partial^2v/\partial z^2 = L'C'\,\partial^2v/\partial t^2$, with d'Alembert solution $v = v^+(t - z/u_p) + v^-(t + z/u_p)$ and $i = [v^+ - v^-]/Z_0$: pulses of any shape travel without distortion.

::: example A coaxial cable {#ex-rg58-line}
The RG-58 cable of [[electromagnetics/induction-inductance#ex-coax-l]] has $L' = 0.237\,\mathrm{\mu H/m}$ and $C' = 105\,\mathrm{pF/m}$, inner radius $0.45\,\mathrm{mm}$, outer $1.475\,\mathrm{mm}$, copper conductors and polyethylene with $\tan\delta = 2\times10^{-4}$. Find $Z_0$, $u_p$, the delay per metre, and the attenuation at $100\,\mathrm{MHz}$ from conductor and dielectric losses.
::: solution
$Z_0 = \sqrt{L'/C'} = 47.5\,\Omega$, $u_p = 1/\sqrt{L'C'} = 2.00\times10^8\,\mathrm{m/s}$ ($0.67c$, the **velocity factor** of a polyethylene cable), and the delay is $5.0\,\mathrm{ns/m}$, so the $20\,\mathrm m$ cable of the introduction has a round trip of $200\,\mathrm{ns}$.

For a low-loss line ($R'\ll\omega L'$, $G'\ll\omega C'$) the binomial expansion of [[#eq-gamma-line]] gives

$$
\alpha\approx\frac{R'}{2Z_0} + \frac{G'Z_0}{2} .
$$ {#eq-alpha-line}

At $100\,\mathrm{MHz}$, $R_s = \sqrt{\pi f\mu_0/\sigma} = 2.61\,\mathrm{m\Omega}$ and

$$
R' = \frac{R_s}{2\pi}\left(\frac{1}{0.45\times10^{-3}} + \frac{1}{1.475\times10^{-3}}\right) = 1.20\,\Omega/\mathrm m, \qquad \alpha_c = \frac{1.20}{2(47.5)} = 0.0127\,\mathrm{Np/m}.
$$

For the dielectric, $G' = \omega C'\tan\delta = 1.32\times10^{-5}\,\mathrm{S/m}$ and $\alpha_d = G'Z_0/2 = 3.1\times10^{-4}\,\mathrm{Np/m}$. The total, $0.0130\,\mathrm{Np/m}$, is $0.113\,\mathrm{dB/m}$ or $11\,\mathrm{dB}$ per $100\,\mathrm m$, almost all of it conductor loss. Datasheets for RG-58 quote around $15$–$17\,\mathrm{dB/100\,m}$ at this frequency: the braided outer conductor and stranded inner conductor have more loss than smooth solid copper. Conductor loss grows as $\sqrt f$ and dielectric loss as $f$, so dielectric loss eventually dominates at microwave frequencies.
:::
:::

::: remark The distortionless line
For a lossy line, $\alpha$ and the phase velocity $\omega/\beta$ generally depend on frequency, so pulses spread and change shape. Oliver Heaviside noticed in 1887 that if $R'/L' = G'/C'$, then $\gamma = \sqrt{R'G'} + j\omega\sqrt{L'C'}$ exactly: the attenuation is independent of frequency and the velocity is constant. Such a **distortionless** line attenuates a signal without distorting it. Real telephone cables had $R'/L'\gg G'/C'$, and the cure, adding series inductance by inserting **loading coils** every couple of kilometres, made long-distance telephony possible from about 1900 until digital transmission replaced it.
:::

### Microstrip

On circuit boards the usual line is a **microstrip**: a copper trace of width $w$ on a dielectric substrate of thickness $h$ and permittivity $\epsilon_r$, over a ground plane. Part of the field is in the substrate and part in the air above, so the mode is only quasi-TEM, and it behaves as if the line were filled with a uniform medium of **effective permittivity** $\epsilon_{\text{eff}}$ between $1$ and $\epsilon_r$. Closed-form fits to field-solver results are standard; for $w/h\ge1$ (Hammerstad and Jensen, simplified),

$$
\epsilon_{\text{eff}} = \frac{\epsilon_r + 1}{2} + \frac{\epsilon_r - 1}{2}\left(1 + \frac{12h}{w}\right)^{-1/2}, \qquad
Z_0 = \frac{120\pi}{\sqrt{\epsilon_{\text{eff}}}\left[w/h + 1.393 + 0.667\ln(w/h + 1.444)\right]}\ \Omega ,
$$ {#eq-microstrip}

accurate to about $1\,\%$ for thin copper. Wider traces have lower $Z_0$, since $C'$ rises and $L'$ falls.

::: example Designing a 50 Ω microstrip {#ex-microstrip-design}
Find the trace width for a $50\,\Omega$ microstrip on FR-4 with $\epsilon_r = 4.4$ and $h = 1.6\,\mathrm{mm}$, and the length of a quarter-wavelength section at $2\,\mathrm{GHz}$.
::: solution
Solve [[#eq-microstrip]] for $w/h$ by iteration. At $w/h = 1.9$: $\epsilon_{\text{eff}} = 2.7 + 1.7(1 + 6.316)^{-1/2} = 3.329$ and $Z_0 = 376.7/(1.8245\times[1.9 + 1.393 + 0.667\ln3.344]) = 50.4\,\Omega$. At $w/h = 2.0$, $Z_0 = 48.9\,\Omega$. Interpolating (or bisecting) gives $w/h = 1.93$, $\epsilon_{\text{eff}} = 3.33$, so $w = 1.93\times1.6 = 3.08\,\mathrm{mm}$.

The guided wavelength at $2\,\mathrm{GHz}$ is $\lambda = c/(f\sqrt{\epsilon_{\text{eff}}}) = 0.15/1.826 = 82.1\,\mathrm{mm}$, so a quarter-wave section is $20.5\,\mathrm{mm}$ long. In practice the laminate's $\epsilon_r$ varies by several per cent between batches and with frequency, so designers use the manufacturer's value at the operating frequency and check with a field solver; on thin multilayer boards ($h\approx0.1$–$0.2\,\mathrm{mm}$) the same $50\,\Omega$ needs traces of a few tenths of a millimetre.
:::
:::

## Terminated lines

Now connect a load impedance $Z_L$ at the end of a line. It is convenient to put the load at $z = 0$ and the line at $z < 0$, and to measure distance back from the load as $\ell = -z$. We treat the lossless line; for a lossy one replace $j\beta$ by $\gamma$.

::: theorem Reflection at a load {#thm-load-reflection}
At a load $Z_L$ terminating a line of characteristic impedance $Z_0$, the ratio of the reflected to the incident voltage wave is

$$
\Gamma_L = \frac{V_0^-}{V_0^+} = \frac{Z_L - Z_0}{Z_L + Z_0} .
$$ {#eq-gamma-load}

At distance $\ell$ from the load the reflection coefficient is $\Gamma(\ell) = \Gamma_Le^{-2j\beta\ell}$, and the voltage and current are

$$
V = V_0^+e^{j\beta\ell}\left(1 + \Gamma_Le^{-2j\beta\ell}\right), \qquad I = \frac{V_0^+}{Z_0}e^{j\beta\ell}\left(1 - \Gamma_Le^{-2j\beta\ell}\right).
$$
:::

::: proof
At $z = 0$ the line voltage and current must satisfy the load's law, $V(0) = Z_LI(0)$. From [[#eq-line-solution]] at $z = 0$: $V_0^+ + V_0^- = (Z_L/Z_0)(V_0^+ - V_0^-)$. Solving for $V_0^-/V_0^+$ gives [[#eq-gamma-load]]. Substituting $z = -\ell$ in [[#eq-line-solution]] and factoring out $V_0^+e^{j\beta\ell}$ gives the expressions for $V$ and $I$; the ratio of the backward to the forward term at that point is $\Gamma_Le^{-2j\beta\ell}$.
:::

The formula is the same as for plane waves at normal incidence ([[electromagnetics/reflection-refraction#thm-normal]]) with $\eta_2\to Z_L$ and $\eta_1\to Z_0$. Its key cases:

- **Matched load**, $Z_L = Z_0$: $\Gamma_L = 0$, no reflection, a pure travelling wave.
- **Short circuit**, $Z_L = 0$: $\Gamma_L = -1$.
- **Open circuit**, $Z_L\to\infty$: $\Gamma_L = +1$.
- **Purely reactive load**: $\abs{\Gamma_L} = 1$; all power is reflected, with a phase shift.
- Any passive load has $\abs{\Gamma_L}\le1$.

The standing-wave pattern, $\abs{V(\ell)} = \abs{V_0^+}\abs{1 + \Gamma_Le^{-2j\beta\ell}}$, has maxima $\abs{V_0^+}(1 + \abs{\Gamma_L})$ and minima $\abs{V_0^+}(1 - \abs{\Gamma_L})$ a quarter-wavelength apart, and the **voltage standing-wave ratio** (VSWR) is $s = (1 + \abs{\Gamma_L})/(1 - \abs{\Gamma_L})$, exactly as in [[electromagnetics/reflection-refraction#def-swr]].

::: widget plot
f: sqrt(1 + g^2 + 2*g*cos(4*pi*x + p)); 1 + g; 1 - g
x: -1, 0
y: 0, 2.1
sliders: g=0.447:0:1:0.001; p=0.4636:-3.1416:3.1416:0.01
labels: \lvert V\rvert/\lvert V_0^+\rvert; 1+\lvert\Gamma_L\rvert; 1-\lvert\Gamma_L\rvert
caption: Voltage standing-wave pattern on a lossless line, position in wavelengths with the load at $0$, for a load reflection coefficient $\Gamma_L = g\,e^{jp}$. The starting values ($g = 0.447$, $p = 0.464\,\mathrm{rad} = 26.6^\circ$) are those of the $100 + j50\,\Omega$ load of [[#ex-zin]]. The pattern repeats every half-wavelength. Change $p$: the pattern slides along the line, so the position of a minimum measures the phase of $\Gamma_L$, and the ratio of maximum to minimum measures its magnitude. Set $g = 0$ for a matched line and $g = 1$ for a short ($p = \pi$) or open ($p = 0$).
:::

### Power and mismatch

The time-average power carried towards the load is the incident power minus the reflected power:

$$
P_L = \frac{\abs{V_0^+}^2}{2Z_0}\left(1 - \abs{\Gamma_L}^2\right) .
$$ {#eq-power-line}

Engineers describe a mismatch on a logarithmic scale by the **return loss** $\mathrm{RL} = -20\log_{10}\abs{\Gamma_L}$ (in decibels; large is good) and the **mismatch loss** $-10\log_{10}(1 - \abs{\Gamma_L}^2)$. A return loss of $20\,\mathrm{dB}$ ($\abs\Gamma = 0.1$, VSWR $1.22$) is a typical specification for an RF port; it costs only $0.04\,\mathrm{dB}$ of transmitted power.

### Input impedance

The ratio $V/I$ at distance $\ell$ from the load is the impedance looking into the line there, the impedance a source connected at that point would see.

::: theorem Input impedance of a terminated line {#thm-zin}
A lossless line of characteristic impedance $Z_0$ and length $\ell$, terminated in $Z_L$, has input impedance

$$
Z_{\text{in}} = Z_0\,\frac{Z_L + jZ_0\tan\beta\ell}{Z_0 + jZ_L\tan\beta\ell} = Z_0\,\frac{1 + \Gamma_Le^{-2j\beta\ell}}{1 - \Gamma_Le^{-2j\beta\ell}} .
$$ {#eq-zin}

For a lossy line, $\tan\beta\ell$ is replaced by $\tanh\gamma\ell$ and $j$ is absorbed: $Z_{\text{in}} = Z_0\,(Z_L + Z_0\tanh\gamma\ell)/(Z_0 + Z_L\tanh\gamma\ell)$.
:::

::: proof
The second form is the ratio of $V$ and $I$ in [[#thm-load-reflection]]. For the first, write $e^{\pm j\beta\ell} = \cos\beta\ell \pm j\sin\beta\ell$ in $V = V_0^+e^{j\beta\ell} + V_0^-e^{-j\beta\ell}$ and $Z_0I = V_0^+e^{j\beta\ell} - V_0^-e^{-j\beta\ell}$, substitute $V_0^- = \Gamma_LV_0^+$ with $\Gamma_L = (Z_L - Z_0)/(Z_L + Z_0)$, multiply numerator and denominator by $(Z_L + Z_0)$ and divide both by $\cos\beta\ell$:

$$
\frac{V}{I} = Z_0\frac{(Z_L + Z_0)e^{j\beta\ell} + (Z_L - Z_0)e^{-j\beta\ell}}{(Z_L + Z_0)e^{j\beta\ell} - (Z_L - Z_0)e^{-j\beta\ell}} = Z_0\frac{2Z_L\cos\beta\ell + 2jZ_0\sin\beta\ell}{2Z_0\cos\beta\ell + 2jZ_L\sin\beta\ell},
$$

which is [[#eq-zin]].
:::

The input impedance repeats every half-wavelength ($\beta\ell = \pi$), and several lengths give simple, important results:

- **Half-wave line**, $\ell = \lambda/2$: $Z_{\text{in}} = Z_L$. The line is transparent at that frequency.
- **Quarter-wave line**, $\ell = \lambda/4$: $Z_{\text{in}} = Z_0^2/Z_L$. It inverts the load impedance: a short becomes an open and vice versa.
- **Shorted line** ($Z_L = 0$): $Z_{\text{in}} = jZ_0\tan\beta\ell$, a pure reactance, inductive for $\ell < \lambda/4$.
- **Open line** ($Z_L\to\infty$): $Z_{\text{in}} = -jZ_0\cot\beta\ell$, capacitive for $\ell < \lambda/4$.

Short sections of shorted or open line, called **stubs**, are therefore used as inductors and capacitors at microwave frequencies, where lumped components are too lossy or too parasitic, and a quarter-wave shorted stub, which presents an open circuit at its design frequency, is used as a support that does not disturb the line.

::: widget plot
f: tan(2*pi*x); -1/tan(2*pi*x)
x: 0, 1
y: -5, 5
labels: X_{\text{in}}/Z_0\ \text{(short)}; X_{\text{in}}/Z_0\ \text{(open)}
vlines: 0.25; 0.5; 0.75
caption: Normalised input reactance of a shorted and of an open-circuited lossless line against length in wavelengths. A short stub shorter than $\lambda/4$ is inductive, an open stub capacitive; at $\lambda/4$ they swap, and the shorted line looks like an open circuit (a parallel resonance), the open line like a short (a series resonance). Everything repeats every $\lambda/2$. Real stubs have loss, which turns the infinite peaks into large but finite resistances.
:::

::: example Input impedance of a mismatched load {#ex-zin}
A $50\,\Omega$ lossless line is terminated in $Z_L = 100 + j50\,\Omega$. Find $\Gamma_L$, the VSWR, the return loss, the input impedance of a $0.1\lambda$ length, and the power delivered to the load if the incident wave has $V_0^+ = 10\,\mathrm V$ peak.
::: solution
$$
\Gamma_L = \frac{100 + j50 - 50}{100 + j50 + 50} = \frac{50 + j50}{150 + j50} = 0.4 + j0.2 = 0.447\angle26.6^\circ .
$$

The VSWR is $s = 1.447/0.553 = 2.62$ and the return loss is $-20\log_{10}0.447 = 7.0\,\mathrm{dB}$, a poor match. With $\beta\ell = 2\pi(0.1) = 36^\circ$, $\tan\beta\ell = 0.7265$, and

$$
Z_{\text{in}} = 50\,\frac{100 + j50 + j50(0.7265)}{50 + j(100 + j50)(0.7265)} = 50\,\frac{100 + j86.3}{13.68 + j72.65} = 69.9 - j55.7\,\Omega .
$$

An inductive load looks capacitive a tenth of a wavelength away: the line transforms impedances, and a reading of impedance at the input of a cable is meaningless unless the cable is accounted for (network analysers are calibrated at the end of the test cable for this reason). The delivered power is $P_L = (10^2/(2\times50))(1 - 0.2) = 0.80\,\mathrm W$, of the $1.0\,\mathrm W$ incident.
:::
:::

### Quarter-wave matching

A quarter-wave section of characteristic impedance $Z_1$ between a line $Z_0$ and a resistive load $R_L$ presents $Z_1^2/R_L$ at its input. Choosing

$$
Z_1 = \sqrt{Z_0R_L}
$$ {#eq-qw}

makes this equal to $Z_0$: the **quarter-wave transformer**, the line analogue of the anti-reflection coating of [[electromagnetics/reflection-refraction#ex-ar-coating]]. It matches exactly at one frequency and approximately over a band that is wider when $R_L/Z_0$ is closer to $1$; several cascaded sections widen the band further. A complex load is first moved to a resistive point on the line (a voltage maximum or minimum, where $Z_{\text{in}}$ is $sZ_0$ or $Z_0/s$) and matched there, or matched with stubs and lumped elements using the methods of [[rf-microwave/impedance-matching]].

::: example Matching a resistive load {#ex-qw-design}
A $100\,\Omega$ antenna must be fed from a $50\,\Omega$ microstrip at $2\,\mathrm{GHz}$ on the FR-4 board of [[#ex-microstrip-design]]. Design a quarter-wave transformer, and find the VSWR on the $50\,\Omega$ line without it.
::: solution
$Z_1 = \sqrt{50\times100} = 70.7\,\Omega$. Solving [[#eq-microstrip]] for $70.7\,\Omega$ on this substrate gives a narrower trace, $w/h\approx1.0$ ($w\approx1.6\,\mathrm{mm}$), with $\epsilon_{\text{eff}}\approx3.2$, so the quarter-wave length is about $c/(4f\sqrt{3.2}) = 21\,\mathrm{mm}$ (slightly longer than on the $50\,\Omega$ line because less of the field is in the substrate). Without the transformer, $\Gamma_L = 50/150 = 1/3$ and the VSWR is $(4/3)/(2/3) = 2.0$, with $11\,\%$ of the power reflected; with it, the reflection is zero at $2\,\mathrm{GHz}$ and stays below $\abs\Gamma = 0.1$ over roughly $\pm18\,\%$ of the centre frequency.
:::
:::

::: quiz
A $50\,\Omega$ line exactly a quarter-wavelength long is terminated in a short circuit. What impedance does it present at its input?
- [ ] $0\,\Omega$
- [ ] $50\,\Omega$
- [x] An open circuit
- [ ] $j50\,\Omega$
::: solution
A quarter-wave line gives $Z_{\text{in}} = Z_0^2/Z_L$, which tends to infinity as $Z_L\to0$. Equivalently, $jZ_0\tan(\pi/2)\to\infty$. The short at the load is a voltage node, and a quarter-wavelength back the voltage is a maximum and the current zero.
:::
:::

## The Smith chart

The input-impedance formula is tedious to evaluate by hand, and its structure is hidden in the tangents. The second form of [[#eq-zin]] reveals it: moving along a lossless line just rotates the reflection coefficient, $\Gamma(\ell) = \Gamma_Le^{-2j\beta\ell}$, and impedance is a fixed function of $\Gamma$. Normalise all impedances to the line, $z = Z/Z_0 = r + jx$; then

$$
\Gamma = \frac{z - 1}{z + 1}, \qquad z = \frac{1 + \Gamma}{1 - \Gamma} .
$$ {#eq-z-gamma}

::: definition The Smith chart {#def-smith}
The **Smith chart** is the complex $\Gamma$-plane, inside the unit circle $\abs\Gamma\le1$, overlaid with the images under [[#eq-z-gamma]] of the lines of constant normalised resistance $r$ and constant normalised reactance $x$. The constant-$r$ lines become circles centred at $\bigl(r/(1+r), 0\bigr)$ with radius $1/(1+r)$; the constant-$x$ lines become arcs of circles centred at $(1, 1/x)$ with radius $1/\abs x$.
:::

Every passive impedance is a point inside the unit circle. The centre is the matched point $z = 1$; the left end of the horizontal axis is the short circuit ($\Gamma = -1$) and the right end the open circuit ($\Gamma = +1$); the upper half is inductive and the lower half capacitive. Moving a distance $\ell$ **towards the generator** rotates the point clockwise by $2\beta\ell$ round the centre, a full turn per half-wavelength; circles about the centre are circles of constant $\abs\Gamma$, hence constant VSWR, which can be read where the circle crosses the right-hand horizontal axis ($r = s$ there). Admittances are found by rotating half a turn, since $\Gamma\to-\Gamma$ turns $z$ into $1/z$, which is why the chart is equally useful for shunt elements.

::: widget complexmap
f: (z - 1)/(z + 1)
mode: grid
x: 0, 5
y: -5, 5
caption: The Smith chart as a conformal map. The left panel is the right half of the normalised impedance plane, $z = r + jx$ with $r\ge0$; the right panel is its image $\Gamma = (z-1)/(z+1)$. Vertical grid lines ($r$ = const) become the circles that all touch at $\Gamma = 1$; horizontal lines ($x$ = const) become arcs through the same point. Drag the cross in the left panel: the point $z = 2 + j1$ (the load of [[#ex-zin]]) maps to $\Gamma = 0.4 + j0.2$. The right angles of the grid are preserved, because the map is conformal.
:::

::: example Reading the Smith chart {#ex-smith}
Use the chart's construction to repeat [[#ex-zin]]: $z_L = 2 + j1$ on a $50\,\Omega$ line, $\ell = 0.1\lambda$.
::: solution
The load point is where the $r = 2$ circle meets the $x = 1$ arc, at $\Gamma_L = 0.4 + j0.2$, radius $0.447$ from the centre. Moving $0.1\lambda$ towards the generator rotates it clockwise by $2\beta\ell = 72^\circ$, from $26.6^\circ$ to $-45.4^\circ$: $\Gamma = 0.447\angle-45.4^\circ = 0.314 - j0.318$. The chart's grid there reads $z\approx1.40 - j1.11$, i.e. $Z_{\text{in}} = 70 - j56\,\Omega$, agreeing with the calculation. The circle through the load crosses the positive real axis at $r = 2.62$, which is the VSWR. The voltage maximum is where the circle crosses the right-hand axis, $26.6^\circ/720^\circ\times\lambda = 0.037\lambda$ from the load towards the generator.
:::
:::

The Smith chart is the standard display of every vector network analyser and the working space for matching-network design; it is developed fully, with stubs and lumped-element matching, in [[rf-microwave/lines-smith-chart]] and [[rf-microwave/impedance-matching]].

## Transients on lines

Digital signals are steps, not sinusoids, and the time-domain view is more natural for them. Consider a lossless line of characteristic impedance $Z_0$ and one-way delay $T = \ell/u_p$, driven at $t = 0$ by a step source of voltage $V_S$ with internal resistance $R_S$, and terminated in a resistor $R_L$.

::: algorithm Bounce diagram for a resistively terminated line {#alg-bounce}
1. At $t = 0$ the line looks like a resistance $Z_0$ (no reflection has returned yet), so the first wave launched is $V_1 = V_S\,Z_0/(R_S + Z_0)$.
2. Compute the reflection coefficients at the load and the source, $\Gamma_L = (R_L - Z_0)/(R_L + Z_0)$ and $\Gamma_S = (R_S - Z_0)/(R_S + Z_0)$.
3. Draw a zigzag of waves on a distance–time diagram: $V_1$ reaches the load at $T$ and launches $\Gamma_LV_1$ backwards; that reaches the source at $2T$ and launches $\Gamma_S\Gamma_LV_1$ forwards; and so on.
4. The voltage at any point and time is the sum of all waves that have passed it. Currents follow with $i = v^+/Z_0$ for forward waves and $-v^-/Z_0$ for backward ones.
5. As $t\to\infty$ the sum converges to the DC value $V_SR_L/(R_S + R_L)$, which is a check.
:::

::: example Ringing on a circuit-board trace {#ex-bounce}
A CMOS driver, modelled as a $5\,\mathrm V$ step source with $R_S = 10\,\Omega$ output resistance, drives a $50\,\Omega$ trace with $T = 2\,\mathrm{ns}$ one-way delay into a CMOS input (an open circuit). Find the voltage at the receiver for the first $12\,\mathrm{ns}$. Then design a series termination that removes the ringing.
::: solution
The first wave is $V_1 = 5\times50/60 = 4.167\,\mathrm V$. With $\Gamma_L = +1$ and $\Gamma_S = (10 - 50)/60 = -0.667$, the waves arriving at the load are $V_1$, $\Gamma_S\Gamma_LV_1 = -2.778\,\mathrm V$, $(\Gamma_S\Gamma_L)^2V_1 = 1.852\,\mathrm V$, … and each doubles on arrival (incident plus its reflection, since $1 + \Gamma_L = 2$). The receiver voltage therefore steps at $t = 2, 6, 10, \dots\,\mathrm{ns}$:

| $t$ ($\mathrm{ns}$) | $0$–$2$ | $2$–$6$ | $6$–$10$ | $10$–$14$ | $14$–$18$ | $\to\infty$ |
|---|---|---|---|---|---|---|
| $v_L$ ($\mathrm V$) | $0$ | $8.33$ | $2.78$ | $6.48$ | $4.01$ | $5.00$ |

The input sees $8.33\,\mathrm V$, far above its supply rail, and then dips to $2.78\,\mathrm V$, which may be read as a logic zero: the ringing can cause false switching and stresses the input protection diodes (which in reality clamp the overshoot near $5.5\,\mathrm V$).

**Series termination.** Add a resistor $R$ in series with the driver so that $R_S + R = Z_0$, i.e. $R = 40\,\Omega$. Then $\Gamma_S = 0$ and $V_1 = 5\times50/100 = 2.5\,\mathrm V$. This half-amplitude wave doubles at the open load to exactly $5\,\mathrm V$ at $t = 2\,\mathrm{ns}$, and the reflected $2.5\,\mathrm V$ wave is absorbed at the source. The receiver sees a clean step; the near end of the line sits at half voltage for $2T = 4\,\mathrm{ns}$, which is why series termination suits point-to-point links with the receiver at the far end. A parallel $50\,\Omega$ termination at the receiver also works, but draws DC current.
:::
:::

::: widget plot
f: sum(5*50/(Rs + 50)*(1 + g)*(g*(Rs - 50)/(Rs + 50))^k*heaviside(x - (2k + 1)*2), k, 0, 30); 5*(1 + g)/((1 + g) + (Rs/50)*(1 - g))
x: 0, 40
y: -1, 10
sliders: Rs=10:0:200:1; g=1:-1:1:0.01
labels: v_L(t)\ (\mathrm V); \text{DC value}
caption: Receiver voltage against time (ns) for a $5\,\mathrm V$ step driving a $50\,\Omega$ line with $2\,\mathrm{ns}$ delay, from a source resistance $R_S$ into a load with reflection coefficient $g = \Gamma_L$ (the starting value $g = 1$ is an open circuit, as in [[#ex-bounce]]; $g = 0$ is a matched $50\,\Omega$ load, $g = -1$ a short). With $R_S < 50\,\Omega$ the voltage rings about its final value; with $R_S > 50\,\Omega$ it climbs in steps (both reflection coefficients positive). Set $R_S = 50$ for a single clean step, or $g = 0$ for a matched load: either termination removes the ringing.
:::

::: warning Characteristic impedance is not a resistance you can measure with an ohmmeter
A $50\,\Omega$ cable, open at the far end, reads as an open circuit on an ohmmeter (DC) and as a capacitor on a low-frequency meter. $Z_0$ governs only the ratio of voltage to current in a travelling wave, so it appears only on time scales shorter than the round-trip delay, or at frequencies where the line is a significant fraction of a wavelength. Conversely, a line whose delay is much shorter than the signal's rise time ([[electromagnetics/maxwells-equations#ex-lumped]]) behaves as a lumped capacitance and inductance, and terminating it in $Z_0$ is unnecessary.
:::

::: application Time-domain reflectometry
A time-domain reflectometer (TDR) launches a fast step into a cable or a circuit-board trace and records the reflected voltage against time. Each reflection's sign and size give the local impedance through $\Gamma = (Z - Z_0)/(Z + Z_0)$, and its delay gives the distance, at $u_p/2$ per unit of round-trip time. Cable companies use TDRs to find breaks and water ingress in buried cables kilometres long; signal-integrity engineers use them, with rise times of tens of picoseconds, to see the impedance of each via, connector and trace segment on a high-speed board, millimetre by millimetre.
:::

::: history
The theory of transmission lines grew out of the first submarine telegraph cables. William Thomson (later Lord Kelvin) analysed the Atlantic cable in 1854–55 as a distributed resistance and capacitance, predicting that pulses would spread diffusively and limit the signalling speed; the failure of the first Atlantic cable in 1858 and the success of the 1866 cable were early lessons in line engineering. Oliver Heaviside added inductance and leakage in the 1870s and 1880s, wrote the telegrapher's equations in their modern form, and in 1887 showed that a line with $R'/L' = G'/C'$ is distortionless. Michael Pupin and George Campbell put loading coils into practice around 1900. Phillip Smith of Bell Telephone Laboratories published his chart in *Electronics* in January 1939 (and it was preceded by a similar chart by Mizuhashi in Japan, published in 1937). The microstrip line was introduced in 1952 by D. D. Grieg and H. F. Engelmann at the Federal Telecommunication Laboratories of ITT.
:::

## Where this leads

Transmission-line theory is the gateway to radio-frequency and microwave engineering. [[rf-microwave/lines-smith-chart]] and [[rf-microwave/impedance-matching]] develop the Smith chart, stub matching and broadband matching networks; [[rf-microwave/scattering-parameters]] describes multi-port networks by incident and reflected waves, generalising $\Gamma$; and [[rf-microwave/waveguides]] treats hollow metal pipes, which guide waves without a centre conductor and have no TEM mode. On circuit boards, [[digital-ic/interconnect]] applies the same reflections and terminations to on-chip wires, and long power lines are modelled with the same distributed parameters in [[power-systems/line-models]].

::: summary
- A transmission line is described by $R'$, $L'$, $G'$, $C'$ per unit length; the telegrapher's equations $-\partial v/\partial z = R'i + L'\partial i/\partial t$, $-\partial i/\partial z = G'v + C'\partial v/\partial t$ follow from KVL and KCL on a short section.
- Voltage and current are forward and backward waves with propagation constant $\gamma = \sqrt{(R'+j\omega L')(G'+j\omega C')}$ and characteristic impedance $Z_0 = \sqrt{(R'+j\omega L')/(G'+j\omega C')}$; lossless: $Z_0 = \sqrt{L'/C'}$, $u_p = 1/\sqrt{L'C'} = 1/\sqrt{\mu\epsilon}$. Low-loss: $\alpha\approx R'/(2Z_0) + G'Z_0/2$.
- A load reflects $\Gamma_L = (Z_L - Z_0)/(Z_L + Z_0)$; the VSWR is $(1 + \abs{\Gamma_L})/(1 - \abs{\Gamma_L})$, the delivered power $\abs{V_0^+}^2(1 - \abs{\Gamma_L}^2)/(2Z_0)$ and the return loss $-20\log_{10}\abs{\Gamma_L}$.
- Input impedance: $Z_{\text{in}} = Z_0(Z_L + jZ_0\tan\beta\ell)/(Z_0 + jZ_L\tan\beta\ell)$. Half-wave lines repeat the load, quarter-wave lines invert it ($Z_0^2/Z_L$), and shorted or open stubs are reactances.
- A quarter-wave transformer $Z_1 = \sqrt{Z_0R_L}$ matches a resistive load at one frequency.
- The Smith chart plots $\Gamma$ with the grid of $z = (1 + \Gamma)/(1 - \Gamma)$; moving towards the generator rotates the point clockwise, one turn per $\lambda/2$.
- Step transients bounce between source and load with coefficients $\Gamma_S$ and $\Gamma_L$; matching either end ($R_S = Z_0$ series termination, or $R_L = Z_0$) removes ringing.
:::

## Exercises

::: exercise Characteristic impedance {level=1 check="50"}
A lossless line has $L' = 0.25\,\mathrm{\mu H/m}$ and $C' = 100\,\mathrm{pF/m}$. Find $Z_0$ in ohms and the phase velocity.
::: solution
$Z_0 = \sqrt{0.25\times10^{-6}/10^{-10}} = \sqrt{2500} = 50\,\Omega$ and $u_p = 1/\sqrt{2.5\times10^{-17}} = 2.0\times10^8\,\mathrm{m/s}$.
:::
:::

::: exercise A 75 Ω load {level=1 check="0.2"}
A $50\,\Omega$ line is terminated in $75\,\Omega$. Find the reflection coefficient and the VSWR.
::: solution
$\Gamma_L = (75 - 50)/(75 + 50) = 0.2$ and $s = 1.2/0.8 = 1.5$.
:::
:::

::: exercise A quarter-wave transformer {level=1 check="100"}
What characteristic impedance, in ohms, must a quarter-wave section have to match a $200\,\Omega$ load to a $50\,\Omega$ line?
::: solution
$Z_1 = \sqrt{50\times200} = 100\,\Omega$.
:::
:::

::: exercise An eighth-wave short {level=2 check="50"}
A $50\,\Omega$ line of length $\lambda/8$ is short-circuited at the far end. Find its input reactance, in ohms. What lumped inductance does it replace at $1\,\mathrm{GHz}$?
::: solution
$Z_{\text{in}} = jZ_0\tan(\pi/4) = j50\,\Omega$, an inductive reactance of $50\,\Omega$, equivalent to $L = 50/(2\pi\times10^9) = 7.96\,\mathrm{nH}$ at $1\,\mathrm{GHz}$ (but only near that frequency, since the reactance of the stub does not grow linearly with $\omega$).
:::
:::

::: exercise Delivered power {level=2 check="100/(2*50)*(1 - 0.2^2)"}
An incident wave of $10\,\mathrm V$ peak on a $50\,\Omega$ line meets a load with $\Gamma_L = 0.2$. Find the power delivered to the load, in watts.
::: solution
$P_L = (100/100)(1 - 0.04) = 0.96\,\mathrm W$; $4\,\%$ of the incident $1\,\mathrm W$ is reflected.
:::
:::

::: exercise Return loss {level=2 check="-20*log10(0.2)"}
Express the mismatch of the previous exercise as a return loss and a mismatch loss, in decibels.
::: solution
$\mathrm{RL} = -20\log_{10}0.2 = 14.0\,\mathrm{dB}$; mismatch loss $= -10\log_{10}0.96 = 0.18\,\mathrm{dB}$.
:::
:::

::: exercise Finding a fault by TDR {level=3 check="100"}
A TDR drives a $50\,\Omega$ cable ($u_p = 2\times10^8\,\mathrm{m/s}$) from a $1\,\mathrm V$ step source with $50\,\Omega$ internal resistance. The voltage at the instrument's port jumps to $0.500\,\mathrm V$ at $t = 0$ and then, at $t = 10\,\mathrm{ns}$, rises to $0.667\,\mathrm V$, where it stays. The cable continues beyond the discontinuity, which is a resistive load at the end of the cable. Find the load resistance, in ohms, and its distance from the instrument. What would a drop to $0.333\,\mathrm V$ have meant?
::: hint
The launched wave is $0.5\,\mathrm V$; the reflected wave is the change in port voltage when it returns (the source is matched, so it is not re-reflected).
:::
::: solution
The launched wave is $V_1 = 1\times50/(50 + 50) = 0.5\,\mathrm V$. The returning wave is $0.667 - 0.5 = 0.167\,\mathrm V$, so $\Gamma_L = 0.167/0.5 = 1/3$ and $R_L = Z_0(1 + \Gamma_L)/(1 - \Gamma_L) = 50\times(4/3)/(2/3) = 100\,\Omega$. As a check, the final voltage should be the DC divider value $1\times100/150 = 0.667\,\mathrm V$, as observed. The round trip of $10\,\mathrm{ns}$ means a distance of $u_pt/2 = (2\times10^8)(5\times10^{-9}) = 1.0\,\mathrm m$. A drop to $0.333\,\mathrm V$ would mean a returning wave of $-0.167\,\mathrm V$, $\Gamma_L = -1/3$ and $R_L = 25\,\Omega$, a partial short.
:::
:::

::: exercise Deriving the quarter-wave and half-wave rules {level=3}
From [[#eq-zin]], show that $Z_{\text{in}} = Z_0^2/Z_L$ for $\ell = \lambda/4$ and $Z_{\text{in}} = Z_L$ for $\ell = \lambda/2$. Then show that for a load $Z_L = R_L$ with $R_L > Z_0$, the input impedance at the first voltage maximum is $sZ_0$ and at the first minimum $Z_0/s$.
::: solution
For $\ell = \lambda/4$, $\beta\ell = \pi/2$ and $\tan\beta\ell\to\infty$; dividing numerator and denominator of [[#eq-zin]] by $\tan\beta\ell$ gives $Z_0(jZ_0)/(jZ_L) = Z_0^2/Z_L$. For $\ell = \lambda/2$, $\tan\beta\ell = 0$ and $Z_{\text{in}} = Z_0Z_L/Z_0 = Z_L$. For a real $R_L > Z_0$, $\Gamma_L = (R_L - Z_0)/(R_L + Z_0)$ is real and positive, so the voltage is a maximum at the load itself, where $Z_{\text{in}} = R_L$; from $s = (1 + \Gamma_L)/(1 - \Gamma_L) = R_L/Z_0$ this is $sZ_0$. A quarter-wavelength back is the first minimum, where by the quarter-wave rule $Z_{\text{in}} = Z_0^2/R_L = Z_0/s$. In general, at any voltage maximum $\Gamma(\ell)$ is real and positive and $z = (1 + \abs\Gamma)/(1 - \abs\Gamma) = s$; at a minimum it is real and negative and $z = 1/s$.
:::
:::

::: exercise Bounce diagram with both ends mismatched {level=3}
A $10\,\mathrm V$ step source with $R_S = 150\,\Omega$ drives a $50\,\Omega$ line of delay $T$ terminated in $R_L = 25\,\Omega$. Find the load voltage after the first three arrivals and its final value. Is the response monotonic?
::: solution
$V_1 = 10\times50/200 = 2.5\,\mathrm V$, $\Gamma_L = (25 - 50)/75 = -1/3$, $\Gamma_S = (150 - 50)/200 = 1/2$, so $\Gamma_S\Gamma_L = -1/6$. Each arrival contributes $(1 + \Gamma_L) = 2/3$ of its incident wave to the load voltage: at $T$, $v_L = 2.5\times2/3 = 1.667\,\mathrm V$; at $3T$, add $(-1/6)(1.667) = -0.278$, giving $1.389\,\mathrm V$; at $5T$, add $(1/36)(1.667) = 0.046$, giving $1.435\,\mathrm V$. The final value is $10\times25/(150 + 25) = 1.429\,\mathrm V$. Because $\Gamma_S\Gamma_L < 0$ the response alternates about the final value (a small overshoot then undershoot), but it is not a ringing problem: the steps shrink by a factor of six each round trip.
:::
:::
