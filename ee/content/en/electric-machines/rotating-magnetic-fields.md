In 1888 Galileo Ferraris and Nikola Tesla independently published the same remarkable observation: if two or three fixed coils, set at angles to one another, carry alternating currents displaced in time by the right phase angles, the magnetic field they produce together does not merely pulse, it **rotates**, steadily and at constant strength, as if a magnet were spinning inside them. No moving part is needed to make it turn. That rotating field is the reason three-phase power exists, and it is the working principle of the induction motors that drive most of the world's industry and of the synchronous generators that produce most of its electricity.

This chapter develops the common theory of AC machines, before the induction and synchronous machines are treated separately. We first describe the magnetomotive force of a single coil in the air gap and its fundamental space harmonic, introducing **electrical angle** for machines with many poles. We then see how real windings are distributed over many slots and short-pitched, and define the **winding factor** that measures the price of doing so and the harmonics it removes. The central result, the **rotating magnetic field** of a balanced polyphase winding, follows by trigonometry. Finally we derive the **induced voltage** in a winding swept by a rotating field and the **torque** between stator and rotor fields, the two equations from which every AC machine model is built. The three-phase circuits come from [[circuits-2/three-phase-circuits]] and the energy method from [[electric-machines/energy-conversion]].

## The air-gap mmf of a coil

An AC machine has a cylindrical stator of laminated iron, slotted on its inner surface, and a cylindrical rotor separated from it by a small, uniform air gap $g$ (a fraction of a millimetre to a few centimetres). Because the iron is so much more permeable than the gap, almost all the mmf of the windings is used to drive flux across the gap twice: once outwards and once back. The gap is where the field matters.

Consider first a single coil of $N_c$ turns carrying current $i$, with its two sides in diametrically opposite slots, a **full-pitch** coil in a two-pole machine. Measure angle $\theta$ around the gap from the coil's magnetic axis. By Ampère's law, any closed path that crosses the gap twice, at $\theta$ and at $\theta + \pi$, encloses the coil's full current $N_ci$; by symmetry the two crossings take half each. The mmf across the gap is therefore a rectangular wave, $+N_ci/2$ over the half of the gap where the flux leaves the rotor and $-N_ci/2$ over the other half.

That square wave has many space harmonics, but only the fundamental matters for most purposes: the stator is designed so that the harmonics are small, and they produce little useful torque.

::: theorem Fundamental mmf of a full-pitch coil {#thm-coil-mmf}
The rectangular gap mmf of a full-pitch coil of $N_c$ turns carrying current $i$ in a two-pole machine has the Fourier series

$$
\mathcal F(\theta) = \frac4\pi\frac{N_ci}{2}\left(\cos\theta - \frac13\cos3\theta + \frac15\cos5\theta - \cdots\right),
$$ {#eq-coil-series}

so its fundamental is a sinusoid in space, $\mathcal F_1 = \dfrac4\pi\dfrac{N_ci}2\cos\theta$, with its peak on the coil axis, $4/\pi \approx 1.27$ times the height of the rectangle.
:::

::: proof
The wave is even in $\theta$ and has half-wave symmetry, equal to $+A = N_ci/2$ for $\abs\theta < \pi/2$ and $-A$ for $\pi/2 < \abs\theta < \pi$. Its cosine coefficients are $a_h = \frac2\pi\int_0^\pi\mathcal F(\theta)\cos h\theta\,\mathrm d\theta = \frac{2A}\pi\Bigl[\int_0^{\pi/2}\cos h\theta\,\mathrm d\theta - \int_{\pi/2}^{\pi}\cos h\theta\,\mathrm d\theta\Bigr] = \frac{4A}{\pi h}\sin\frac{h\pi}2$. These vanish for even $h$ and equal $\pm4A/(\pi h)$ for odd $h$, with alternating signs. (This is the square wave of [Fourier series](/learn/maths/) shifted by a quarter period.)
:::

### Electrical and mechanical angles

A machine may have any even number $P$ of poles. Its winding then repeats every pair of poles, so the gap mmf and flux pattern repeat $P/2$ times around the periphery. It is convenient to measure angles in **electrical radians**, in which one pole pair spans $2\pi$:

$$
\theta_e = \frac P2\,\theta_m,\qquad \omega_e = \frac P2\,\omega_m.
$$ {#eq-electrical-angle}

In electrical angle a $P$-pole machine looks exactly like a two-pole machine, and every result can be derived for two poles and then translated. A **pole pitch**, the distance between adjacent north and south poles, is always $\pi$ electrical radians ($180^\circ$ electrical).

::: warning Electrical and mechanical degrees
Slot angles, coil pitches, phase displacements of windings and load angles are all stated in **electrical** degrees. Speeds, shaft angles and torque calculations in $T = P/\omega_m$ use **mechanical** units. A four-pole machine whose rotor turns by $30^\circ$ mechanical has moved its field by $60^\circ$ electrical. When a result looks wrong by a factor of $2$, $3$ or $P/2$, this is usually why.
:::

## Distributed and short-pitched windings

A real stator winding is not one coil per phase. Each phase has many coils, spread over several adjacent slots under each pole (a **distributed** winding), and the coils often span less than a full pole pitch (a **short-pitched** or **chorded** winding). Spreading the winding uses the whole stator surface, improves cooling and, more importantly, makes the gap mmf and the induced voltage much closer to sinusoidal. The price is that the coil voltages (and mmfs) no longer add in phase.

Let a machine have $S$ slots, $P$ poles and $m$ phases. The number of slots per pole per phase is $q = S/(Pm)$ and the slot pitch in electrical angle is $\gamma = P\pi/S$.

::: definition Winding factors {#def-winding-factor}
For a winding with $q$ slots per pole per phase, slot pitch $\gamma$ (electrical) and coils spanning a fraction $\rho$ of a pole pitch, the **distribution factor**, **pitch factor** and **winding factor** for the $h$-th space harmonic are

$$
k_{d,h} = \frac{\sin(hq\gamma/2)}{q\sin(h\gamma/2)},\qquad k_{p,h} = \sin\left(h\rho\frac\pi2\right),\qquad k_{w,h} = k_{d,h}k_{p,h}.
$$ {#eq-winding-factors}

A phase winding with $N_{\text{ph}}$ turns in series then behaves, for the $h$-th harmonic, like a concentrated full-pitch winding of $k_{w,h}N_{\text{ph}}$ turns. For the fundamental ($h = 1$) we write simply $k_w$; it typically lies between $0.85$ and $0.96$.
:::

::: theorem Derivation of the winding factors {#thm-winding-factors}
(i) The $q$ coils of a phase group under one pole, in adjacent slots displaced by $\gamma$, produce voltages (or fundamental mmfs) of equal magnitude displaced in phase by $\gamma$; their sum is $k_d$ times the arithmetic sum. (ii) A coil whose sides are $\rho\pi$ apart links $k_p$ times the fundamental flux linked by a full-pitch coil. For the $h$-th harmonic, angles are multiplied by $h$.
:::

::: proof
(i) Represent the $q$ coil voltages as phasors of length $E_c$ at angles $0, \gamma, 2\gamma, \ldots, (q - 1)\gamma$. They are chords of a regular polygon inscribed in a circle of radius $R$, each subtending $\gamma$ at the centre, so $E_c = 2R\sin(\gamma/2)$. Their sum is the chord subtending $q\gamma$, of length $2R\sin(q\gamma/2)$. The ratio of the phasor sum to the arithmetic sum $qE_c$ is $\sin(q\gamma/2)/(q\sin(\gamma/2))$. For the $h$-th harmonic the electrical angles are $h$ times larger.

(ii) In a two-pole picture let the fundamental flux density be $B(\theta) = B_p\cos\theta$. A coil with sides at $\pm\rho\pi/2$ links the flux $\int_{-\rho\pi/2}^{\rho\pi/2}B_p\cos\theta\,lr\,\mathrm d\theta = 2B_plr\sin(\rho\pi/2)$, whereas a full-pitch coil ($\rho = 1$) links $2B_plr$. The ratio is $\sin(\rho\pi/2)$. For the $h$-th harmonic, $B\propto\cos h\theta$ and the ratio becomes $\sin(h\rho\pi/2)$. By reciprocity the same factors apply to the mmf the coils produce.
:::

::: example Winding factors of a 36-slot, four-pole stator {#ex-winding-factors}
A three-phase, four-pole stator has $36$ slots and a double-layer winding whose coils span $7$ slots. Find the fundamental winding factor and those for the $5$th and $7$th harmonics.
::: solution
$q = 36/(4\times3) = 3$ and $\gamma = 4\times180^\circ/36 = 20^\circ$ electrical. A pole pitch is $9$ slots, so $\rho = 7/9$, a coil span of $140^\circ$ electrical.

Fundamental: $k_d = \sin30^\circ/(3\sin10^\circ) = 0.5/0.5209 = 0.960$; $k_p = \sin70^\circ = 0.940$; $k_w = 0.902$.

Fifth: $k_{d5} = \sin150^\circ/(3\sin50^\circ) = 0.218$, $k_{p5} = \sin350^\circ = -0.174$, $\abs{k_{w5}} = 0.038$.

Seventh: $k_{d7} = \sin210^\circ/(3\sin70^\circ) = -0.177$, $k_{p7} = \sin490^\circ = 0.766$, $\abs{k_{w7}} = 0.136$.

Compared with a concentrated full-pitch coil (all factors $1$), the fundamental is reduced by only $10\,\%$, but the $5$th harmonic by a factor of $26$ and the $7$th by $7$. Combined with the $1/h$ of [[#eq-coil-series]], the $5$th harmonic mmf is under $1\,\%$ of the fundamental.
:::
:::

::: example Choosing the coil pitch {#ex-pitch-design}
A large three-phase stator has $q = 4$ slots per pole per phase, so $12$ slots per pole. The coil span can be $9$, $10$, $11$ or $12$ slots. Choose the span that minimises the larger of the $5$th and $7$th harmonic pitch factors, and state the cost in fundamental.
::: solution
With $\rho = s/12$, $k_{p,h} = \sin(h\rho\pi/2)$:

| span $s$ | $\rho$ | $k_{p1}$ | $\abs{k_{p5}}$ | $\abs{k_{p7}}$ |
|---|---|---|---|---|
| $12$ | $1$ | $1.000$ | $1.000$ | $1.000$ |
| $11$ | $11/12$ | $0.991$ | $0.793$ | $0.609$ |
| $10$ | $5/6$ | $0.966$ | $0.259$ | $0.259$ |
| $9$ | $3/4$ | $0.924$ | $0.383$ | $0.924$ |

The $5/6$ pitch (span $10$ slots) gives $\abs{k_{p5}} = \abs{k_{p7}} = 0.259$, the best compromise, for a loss of only $3.4\,\%$ of fundamental. A pitch of exactly $4/5$ would eliminate the $5$th and $6/7$ the $7$th, but neither is available with $12$ slots per pole, and each leaves the other harmonic large. With $k_d = 0.958$, $k_{d5} = 0.205$, $k_{d7} = 0.158$ for $q = 4$, $\gamma = 15^\circ$, the overall factors are $k_w = 0.925$, $\abs{k_{w5}} = 0.053$, $\abs{k_{w7}} = 0.041$. The $5/6$ pitch is the most common choice in practice. Triplen harmonics ($3$rd, $9$th) need no treatment in the mmf because they cancel between the phases of a balanced three-phase winding, as the next section shows.
:::
:::

For a distributed phase winding of $N_{\text{ph}}$ series turns on $P$ poles, the turns per pole are $N_{\text{ph}}/P$, and applying [[#thm-coil-mmf]] with the winding factor gives the fundamental mmf

$$
\mathcal F_{a1}(\theta_e, t) = \frac4\pi\frac{k_wN_{\text{ph}}}{P}\,i_a(t)\cos\theta_e,
$$ {#eq-phase-mmf}

a sinusoid in space whose amplitude follows the current in time. A single phase therefore produces a **pulsating** field, stationary in space, whose strength oscillates at the supply frequency.

## The rotating magnetic field

Now take three such phase windings, $a$, $b$ and $c$, with their axes displaced by $120^\circ$ electrical around the gap, and feed them with balanced three-phase currents $i_a = I_m\cos\omega t$, $i_b = I_m\cos(\omega t - 120^\circ)$, $i_c = I_m\cos(\omega t + 120^\circ)$.

::: theorem The rotating magnetic field {#thm-rotating-field}
The resultant fundamental mmf of a balanced three-phase winding carrying balanced three-phase currents of peak $I_m$ and angular frequency $\omega$ is

$$
\mathcal F(\theta_e, t) = \frac32F_{\max}\cos(\theta_e - \omega t),\qquad F_{\max} = \frac4\pi\frac{k_wN_{\text{ph}}}{P}I_m.
$$ {#eq-rotating-field}

It is a sinusoidal wave of constant amplitude, $\tfrac32$ times the peak of one phase, travelling around the gap at $\omega$ electrical radians per second, that is at the **synchronous speed**

$$
\omega_s = \frac2P\,\omega\ \ \mathrm{rad/s},\qquad n_s = \frac{120f}{P}\ \ \mathrm{r/min}.
$$ {#eq-synchronous-speed}

Reversing the phase sequence (interchanging any two supply lines) reverses the direction of rotation. In general, $m$ windings displaced by $2\pi/m$ and fed by balanced $m$-phase currents give amplitude $\tfrac m2F_{\max}$.
:::

::: proof
Add the three phase mmfs [[#eq-phase-mmf]], each centred on its own axis:

$$
\mathcal F = F_{\max}\bigl[\cos\omega t\cos\theta_e + \cos(\omega t - 120^\circ)\cos(\theta_e - 120^\circ) + \cos(\omega t + 120^\circ)\cos(\theta_e + 120^\circ)\bigr].
$$

Use $\cos A\cos B = \tfrac12[\cos(B - A) + \cos(A + B)]$ term by term. In the first product $A = \omega t$, $B = \theta_e$, giving $\tfrac12\cos(\theta_e - \omega t) + \tfrac12\cos(\theta_e + \omega t)$. In the second, $B - A = \theta_e - \omega t$ and $A + B = \theta_e + \omega t - 240^\circ$; in the third, $B - A = \theta_e - \omega t$ and $A + B = \theta_e + \omega t + 240^\circ$. The three "difference" terms are identical and add to $\tfrac32\cos(\theta_e - \omega t)$. The three "sum" terms are cosines of $\theta_e + \omega t$, $\theta_e + \omega t - 240^\circ$ and $\theta_e + \omega t + 240^\circ$: three equal phasors $120^\circ$ apart, which sum to zero. Hence $\mathcal F = \tfrac32F_{\max}\cos(\theta_e - \omega t)$.

The peak is where $\theta_e = \omega t$, which advances at $\omega$ electrical rad/s, or $\omega_s = (2/P)\omega$ mechanical by [[#eq-electrical-angle]]; in r/min, $n_s = 60\omega_s/(2\pi) = 120f/P$. Interchanging $b$ and $c$ changes the currents' phase angles to $\mp120^\circ$ while the axes stay at $\pm120^\circ$, so now the "sum" terms add and the "difference" terms cancel, leaving $\tfrac32F_{\max}\cos(\theta_e + \omega t)$, which rotates backwards. For $m$ phases the same argument gives $m$ difference terms that add and $m$ sum terms that cancel.
:::

::: widget plot
f: cos(x)*cos(w) + cos(x - 2*pi/3)*cos(w - 2*pi/3) + cos(x + 2*pi/3)*cos(w + 2*pi/3); cos(x)*cos(w); cos(x - 2*pi/3)*cos(w - 2*pi/3); cos(x + 2*pi/3)*cos(w + 2*pi/3)
x: 0, 2pi
y: -1.8, 1.8
piticks: true
sliders: w=0:0:6.283:0.02
labels: \mathcal F_a + \mathcal F_b + \mathcal F_c; \mathcal F_a; \mathcal F_b; \mathcal F_c
caption: Gap mmf around the air gap (horizontal axis: electrical angle $\theta_e$) for a balanced three-phase winding, in units of the peak mmf of one phase. Drag the time slider $\omega t$. Each phase's mmf only pulses up and down on its own axis, but their sum is a sinusoid of constant height $1.5$ whose peak moves steadily to the right, reaching $\theta_e = \omega t$. One electrical cycle of the currents moves the wave through one pole pair.
:::

The rotating field can also be pictured as a **space vector**. Represent the fundamental mmf wave by a vector pointing to its positive peak, with length equal to the peak value. Each phase contributes a vector along its own axis whose length is proportional to its current; the resultant is their vector sum. For balanced currents its tip traces a circle at constant speed. If the currents are unbalanced, it traces an ellipse: the field is then the sum of a forward-rotating and a weaker backward-rotating wave, which in a motor produces a braking torque and extra heating.

::: widget parametric
fx: cos(t) - 0.5*mb*cos(t - 2*pi/3) - 0.5*mc*cos(t + 2*pi/3)
fy: 0.866*mb*cos(t - 2*pi/3) - 0.866*mc*cos(t + 2*pi/3)
t: 0, 2pi
x: -2, 2
y: -2, 2
sliders: mb=1:0:1.5:0.05; mc=1:0:1.5:0.05
caption: Locus of the tip of the mmf space vector over one cycle, with phase $a$ at unit current and phases $b$ and $c$ at relative amplitudes $m_b$ and $m_c$. With $m_b = m_c = 1$ the locus is a circle of radius $1.5$ traced at constant speed: a pure rotating field. Make the currents unequal and the circle becomes an ellipse (forward and backward rotating components). Set $m_b = m_c = 0$, a single phase, and the locus collapses to a straight line: a pulsating field, which is the sum of two equal waves rotating in opposite directions.
:::

::: remark A single-phase field is two rotating fields
The pulsating mmf of one phase can be written $F_{\max}\cos\omega t\cos\theta_e = \tfrac12F_{\max}\cos(\theta_e - \omega t) + \tfrac12F_{\max}\cos(\theta_e + \omega t)$: two waves of half the amplitude rotating in opposite directions. This is why a single-phase induction motor has no starting torque (the two waves pull equally in opposite directions at standstill) but runs once started in either direction, and why it needs an auxiliary winding with a phase-shifted current to start. With two windings in space quadrature carrying currents in time quadrature, the backward waves cancel and the field rotates, exactly as in Ferraris's original two-phase experiment.
:::

::: example Synchronous speeds and the magnetising current {#ex-sync-speed}
(a) List the synchronous speeds of $2$-, $4$-, $6$- and $8$-pole machines on $50\,\mathrm{Hz}$ and $60\,\mathrm{Hz}$. (b) The four-pole stator of [[#ex-winding-factors]] has $N_{\text{ph}} = 84$ series turns per phase and an air gap of $0.5\,\mathrm{mm}$ (neglect the iron and slotting). What rms phase current is needed to produce a rotating gap flux density of peak $0.9\,\mathrm T$?
::: solution
(a) $n_s = 120f/P$:

| poles | $2$ | $4$ | $6$ | $8$ |
|---|---|---|---|---|
| $50\,\mathrm{Hz}$ | $3000$ | $1500$ | $1000$ | $750$ |
| $60\,\mathrm{Hz}$ | $3600$ | $1800$ | $1200$ | $900$ |

(b) The gap mmf per pole needed is $\mathcal F = B_pg/\mu_0 = 0.9\times5\times10^{-4}/(4\pi\times10^{-7}) = 358\,\mathrm A$. By [[#eq-rotating-field]], $\tfrac32\cdot\tfrac4\pi\cdot\tfrac{k_wN_{\text{ph}}}{P}\cdot\sqrt2I = 358$, so

$$
I = \frac{358}{1.5\times1.273\times(0.902\times84/4)\times1.414} = 7.0\,\mathrm A\ \text{rms}.
$$

This **magnetising current** flows whenever the machine is energised. Because of the air gap it is a much larger fraction of rated current in an induction motor (typically $25$ to $50\,\%$) than in a transformer ($1$ to $5\,\%$), which is why induction motors run at a poorer power factor, especially at light load.
:::
:::

## Induced voltage

When the rotating field sweeps past a winding, or a winding is carried past a stationary field, the winding's flux linkage varies sinusoidally and an emf is induced. The calculation is the same in both cases, because only the relative motion matters.

::: theorem Emf of an AC winding {#thm-ac-emf}
Let a sinusoidally distributed gap flux density of peak $B_p$ rotate relative to a phase winding at $\omega$ electrical rad/s, in a machine of bore diameter $D$, axial length $l$ and $P$ poles. The **flux per pole** is

$$
\Phi_p = \frac{2B_pDl}{P},
$$ {#eq-flux-per-pole}

and the rms emf induced in a phase winding of $N_{\text{ph}}$ series turns with winding factor $k_w$ is

$$
E_{\text{ph}} = \frac{2\pi}{\sqrt2}fk_wN_{\text{ph}}\Phi_p = 4.44\,fk_wN_{\text{ph}}\Phi_p,\qquad f = \frac{\omega}{2\pi} = \frac{Pn}{120}.
$$ {#eq-ac-emf}
:::

::: proof
The area of one pole on the bore surface is $\pi Dl/P$, and the average of a half sine wave is $2/\pi$ of its peak, so $\Phi_p = (2/\pi)B_p(\pi Dl/P) = 2B_pDl/P$. A concentrated full-pitch coil of one turn links $\Phi_p\cos\omega t$ as the wave passes (maximum when the pole is centred on the coil). A phase of $N_{\text{ph}}$ turns links, by [[#thm-winding-factors]], $\lambda = k_wN_{\text{ph}}\Phi_p\cos\omega t$. The emf $-\mathrm d\lambda/\mathrm dt$ has amplitude $\omega k_wN_{\text{ph}}\Phi_p$ and rms value $2\pi fk_wN_{\text{ph}}\Phi_p/\sqrt2$. The electrical frequency is the number of pole pairs passing per second, $(P/2)(n/60) = Pn/120$.
:::

This is the transformer emf equation of [[electric-machines/magnetic-circuits#thm-emf]] with two changes: the turns are reduced by the winding factor, and the flux is the flux per pole of a moving field. The frequency equation $f = Pn/120$ is the reason synchronous generators driven by steam turbines (two-pole, $3000$ or $3600\,\mathrm{r/min}$) look so different from those driven by slow water turbines (forty or more poles, $150$ to $300\,\mathrm{r/min}$).

::: example Designing the turns of a stator winding {#ex-turns}
The four-pole machine of [[#ex-winding-factors]] has bore $D = 0.20\,\mathrm m$ and length $l = 0.15\,\mathrm m$, and is to operate at $B_p = 0.9\,\mathrm T$ on $400\,\mathrm V$ (line), $50\,\mathrm{Hz}$, star-connected. Each phase consists of $12$ coils in series. How many turns per coil are needed?
::: solution
The phase voltage is $400/\sqrt3 = 231\,\mathrm V$. The flux per pole is $\Phi_p = 2\times0.9\times0.20\times0.15/4 = 13.5\,\mathrm{mWb}$. Neglecting the stator impedance drop, [[#eq-ac-emf]] requires

$$
N_{\text{ph}} = \frac{231}{4.44\times50\times0.902\times0.0135} = 85.4.
$$

With $12$ coils per phase, $85.4/12 = 7.1$ turns per coil; we take $7$, giving $N_{\text{ph}} = 84$ and $E_{\text{ph}} = 4.44\times50\times0.902\times84\times0.0135 = 227\,\mathrm V$ at $0.9\,\mathrm T$. To get the full $231\,\mathrm V$ the flux density rises to $0.915\,\mathrm T$, which is acceptable. Turns can only be integers, so designers adjust the stack length or the flux density to suit.
:::
:::

::: quiz
A generator's rotor field is unchanged, but it is driven $10\,\%$ faster. Its open-circuit voltage and frequency change by
- [ ] voltage $+10\,\%$, frequency unchanged
- [x] voltage $+10\,\%$, frequency $+10\,\%$
- [ ] voltage $+21\,\%$, frequency $+10\,\%$
- [ ] voltage unchanged, frequency $+10\,\%$
::: solution
$f = Pn/120$ rises by $10\,\%$, and $E = 4.44fk_wN_{\text{ph}}\Phi_p$ with $\Phi_p$ fixed by the rotor field rises by the same $10\,\%$. The ratio $E/f$ (volts per hertz) is fixed by the flux, which is why variable-frequency drives keep $V/f$ constant to keep the flux constant.
:::
:::

## Torque from interacting fields

In an AC machine both stator and rotor carry currents, and each produces a sinusoidal mmf wave in the gap. When both rotate at the same speed they are stationary relative to each other, and the machine produces steady torque that tries to align them, just as two bar magnets do.

::: theorem Torque of two mmf waves {#thm-torque-waves}
Let the stator and rotor produce sinusoidal gap mmf waves of peaks $F_s$ and $F_r$, displaced by the electrical angle $\delta_{sr}$, in a machine with a smooth, uniform gap $g$, bore $D$, length $l$ and $P$ poles, the iron being ideal. The electromagnetic torque is

$$
T = -\frac P2\,\frac{\pi\mu_0Dl}{2g}\,F_sF_r\sin\delta_{sr}.
$$ {#eq-torque-mmf}

Equivalently, in terms of the resultant gap flux per pole $\Phi_{sr}$ and the angle $\delta_r$ between the resultant mmf and the rotor mmf,

$$
T = -\frac\pi2\left(\frac P2\right)^2\Phi_{sr}F_r\sin\delta_r.
$$ {#eq-torque-flux}
:::

::: proof
The resultant mmf is $F_{sr}\cos(\theta_e - \varphi)$ with $F_{sr}^2 = F_s^2 + F_r^2 + 2F_sF_r\cos\delta_{sr}$ (the law of cosines for the two space vectors). In the gap, $H = \mathcal F/g$ radially, and the co-energy (equal to the energy, the iron being linear and ideal) is

$$
W' = \frac{\mu_0}2\int_{\text{gap}}H^2\,\mathrm dV = \frac{\mu_0}{2g^2}\int_0^{2\pi}F_{sr}^2\cos^2\!\Bigl(\frac P2\theta_m - \varphi\Bigr)\,g\,l\frac D2\,\mathrm d\theta_m = \frac{\mu_0\pi Dl}{4g}F_{sr}^2,
$$

since the average of $\cos^2$ is $\tfrac12$ over the $2\pi$ of mechanical angle. Changing the rotor's mechanical position by $\mathrm d\theta_m$ changes $\delta_{sr}$ by $(P/2)\mathrm d\theta_m$ at constant currents, so by [[electric-machines/energy-conversion#thm-force-coenergy]]

$$
T = \frac{\partial W'}{\partial\theta_m} = \frac P2\frac{\partial W'}{\partial\delta_{sr}} = \frac P2\,\frac{\mu_0\pi Dl}{4g}\,(-2F_sF_r\sin\delta_{sr}),
$$

which is [[#eq-torque-mmf]]. For the second form, the triangle of mmf vectors gives $F_s\sin\delta_{sr} = F_{sr}\sin\delta_r$, and the peak resultant flux density is $B_{sr} = \mu_0F_{sr}/g$, so by [[#eq-flux-per-pole]] $\mu_0F_{sr}/g = P\Phi_{sr}/(2Dl)$. Substituting, $T = -(P/2)(\pi Dl/2)(P\Phi_{sr}/(2Dl))F_r\sin\delta_r$, which simplifies to [[#eq-torque-flux]].
:::

The minus sign says the torque acts to reduce the angle between the fields. Three conclusions shape all AC machine design.

1. Steady torque requires stator and rotor fields **rotating at the same speed**; otherwise $\delta$ varies and the torque averages to zero. This is the field version of [[electric-machines/energy-conversion#thm-average-torque]].
2. In normal operation the resultant flux $\Phi_{sr}$ is fixed by the supply voltage through [[#eq-ac-emf]], and the iron limits it. The torque is then proportional to the rotor mmf and to the sine of its angle to the resultant field: torque is controlled through the rotor current and the angle.
3. For a given gap flux density and current loading, the torque is proportional to $D^2l$, the **rotor volume**.

### Sizing a machine from its torque

The third point makes the rough sizing of a machine possible before any detailed design. The tangential force per unit area of rotor surface, the **air-gap shear stress** $\sigma$, depends on the product of the gap flux density and the current per unit length of periphery, both limited by saturation and by cooling. It is remarkably similar across machines of a given type and cooling method: roughly $5$ to $15\,\mathrm{kPa}$ for small totally enclosed motors, $15$ to $30\,\mathrm{kPa}$ for large industrial motors, and up to $100\,\mathrm{kPa}$ for large liquid-cooled generators. The torque is the shear stress times the rotor surface area times the radius:

$$
T = \sigma\,(\pi Dl)\,\frac D2 = \frac\pi2\sigma D^2l.
$$ {#eq-shear}

::: example Rotor size of an 11 kW motor {#ex-sizing}
Estimate the rotor diameter and length of an $11\,\mathrm{kW}$, four-pole, $50\,\mathrm{Hz}$ induction motor running at $1460\,\mathrm{r/min}$, if the air-gap shear stress is $25\,\mathrm{kPa}$ and the length equals the diameter.
::: solution
The rated torque is $T = 11\,000/(1460\times2\pi/60) = 71.9\,\mathrm{N\,m}$. By [[#eq-shear]],

$$
D^2l = \frac{2T}{\pi\sigma} = \frac{2\times71.9}{\pi\times25\,000} = 1.83\times10^{-3}\,\mathrm{m^3}.
$$

With $l = D$, $D = (1.83\times10^{-3})^{1/3} = 0.122\,\mathrm m$. A rotor about $12\,\mathrm{cm}$ in diameter and $12\,\mathrm{cm}$ long is indeed typical of such a motor (frame size about IEC 160). The same output at $3000\,\mathrm{r/min}$ needs only half the torque and therefore half the rotor volume: this is why high-speed machines are smaller, and why electric vehicles use motors spinning at $10\,000$ to $20\,000\,\mathrm{r/min}$ behind a reduction gear.
:::
:::

As a cross-check of [[#eq-torque-flux]], the machine of [[#ex-turns]] with $\Phi_{sr} = 13.5\,\mathrm{mWb}$, a rotor mmf of $F_r = 1500\,\mathrm{A}$ peak per pole and $\delta_r = 80^\circ$ develops $T = (\pi/2)(2)^2(0.0135)(1500)\sin80^\circ = 125\,\mathrm{N\,m}$, a shear stress of $2T/(\pi D^2l) = 13\,\mathrm{kPa}$, inside the expected range.

::: history
François Arago showed in 1824 that a spinning copper disc drags a suspended magnet round with it ("Arago's rotations"), an effect Faraday explained by induction in 1831; it is the principle of the induction motor run backwards. Walter Baily demonstrated in 1879 that a field rotated by switching DC currents in successive coils could turn a copper disc. Galileo Ferraris built a two-phase rotating-field motor in 1885 and published his analysis in March 1888; Nikola Tesla filed his polyphase patents in late 1887 and lectured on them to the American Institute of Electrical Engineers in May 1888. Mikhail Dolivo-Dobrovolsky, working at AEG, introduced the three-phase system with distributed windings and the squirrel-cage rotor in 1889, and three-phase transmission was demonstrated over $175\,\mathrm{km}$ from Lauffen to Frankfurt in 1891. The analysis of windings by distribution and pitch factors was developed in the 1890s and 1900s as AC machines were designed for the new power systems.
:::

## Where this leads

The two results of this chapter, the induced voltage $E = 4.44fk_wN_{\text{ph}}\Phi_p$ and the torque of two synchronously rotating waves, are the foundations of the next two chapters. In [[electric-machines/induction-machines]] the rotor turns slightly slower than the field, the relative motion induces rotor currents at slip frequency, and their mmf rotates at exactly synchronous speed relative to the stator, so the conditions for torque are met at any speed. In [[electric-machines/synchronous-machines]] the rotor carries DC and must turn at exactly synchronous speed; the load angle $\delta$ becomes the variable that sets the power. Brushless permanent-magnet motors in [[electric-machines/special-machines]] use the same windings with a magnet rotor. The space-vector picture of the rotating field leads directly to the $dq$ transformation and field-oriented control used in modern drives ([[power-electronics]]).

::: summary
- The gap mmf of a full-pitch coil is a rectangular wave whose fundamental has peak $(4/\pi)(N_ci/2)$; machines with $P$ poles are analysed in electrical angle $\theta_e = (P/2)\theta_m$.
- Distributed, short-pitched windings have winding factor $k_w = k_dk_p$, with $k_d = \sin(q\gamma/2)/(q\sin(\gamma/2))$ and $k_p = \sin(\rho\pi/2)$; they cost a few percent of fundamental and strongly suppress harmonics (a $5/6$ pitch is the usual compromise).
- A single phase produces a pulsating field; three windings $120^\circ$ apart carrying balanced currents produce a constant-amplitude field $\tfrac32F_{\max}\cos(\theta_e - \omega t)$ rotating at $n_s = 120f/P$. Swapping two lines reverses it; unbalance adds a backward field.
- The emf of a phase is $E = 4.44fk_wN_{\text{ph}}\Phi_p$ with $\Phi_p = 2B_pDl/P$ and $f = Pn/120$.
- Torque between stator and rotor waves is $-(P/2)(\pi\mu_0Dl/2g)F_sF_r\sin\delta_{sr}$; it is steady only if the waves rotate together, and it scales with rotor volume, $T = (\pi/2)\sigma D^2l$.
:::

## Exercises

::: exercise Synchronous speed {level=1 check="120*60/10"}
Find the synchronous speed, in r/min, of a ten-pole machine on a $60\,\mathrm{Hz}$ supply.
::: solution
$n_s = 120\times60/10 = 720\,\mathrm{r/min}$.
:::
:::

::: exercise Pole number from speed {level=1 check="12"}
A hydro generator delivers $50\,\mathrm{Hz}$ at $500\,\mathrm{r/min}$. How many poles does it have?
::: solution
$P = 120f/n = 120\times50/500 = 12$.
:::
:::

::: exercise Distribution factor {level=1 check="sin(2*pi/12)/(2*sin(pi/12))"}
Find the distribution factor of a winding with $q = 2$ slots per pole per phase and a slot pitch of $30^\circ$ electrical.
::: solution
$k_d = \sin(2\times15^\circ)/(2\sin15^\circ) = 0.5/0.5176 = 0.966$.
:::
:::

::: exercise Generator emf {level=2 check="4.44*50*0.92*120*0.05"}
A three-phase, $50\,\mathrm{Hz}$ synchronous generator has $120$ series turns per phase, a winding factor of $0.92$ and a flux per pole of $50\,\mathrm{mWb}$. Find the rms phase emf in volts, and the line voltage if it is star-connected.
::: solution
$E_{\text{ph}} = 4.44\times50\times0.92\times120\times0.05 = 1225\,\mathrm V$; line voltage $\sqrt3\times1225 = 2122\,\mathrm V$.
:::
:::

::: exercise Flux per pole {level=2 check="2*0.8*0.5*0.4/6"}
A six-pole machine has a bore diameter of $0.5\,\mathrm m$, a core length of $0.4\,\mathrm m$ and a sinusoidal gap flux density of peak $0.8\,\mathrm T$. Find the flux per pole in webers.
::: solution
$\Phi_p = 2B_pDl/P = 2\times0.8\times0.5\times0.4/6 = 0.0533\,\mathrm{Wb}$.
:::
:::

::: exercise Two-phase rotating field {level=2}
Two identical windings have axes $90^\circ$ electrical apart and carry $i_a = I_m\cos\omega t$ and $i_b = I_m\sin\omega t$. Show that the resultant fundamental mmf rotates with constant amplitude $F_{\max}$, and find its direction. What happens if $i_b = I_m\sin(\omega t + \epsilon)$ with a small phase error $\epsilon$?
::: solution
$\mathcal F = F_{\max}[\cos\omega t\cos\theta_e + \sin\omega t\sin\theta_e] = F_{\max}\cos(\theta_e - \omega t)$: constant amplitude $F_{\max}$ (that is $\tfrac m2F_{\max}$ with $m = 2$), rotating towards the axis of winding $b$. With a phase error, $\sin(\omega t + \epsilon)\sin\theta_e$ contributes $\tfrac12[\cos(\theta_e - \omega t - \epsilon) - \cos(\theta_e + \omega t + \epsilon)]$, and the backward terms no longer cancel: there is a backward wave of amplitude $F_{\max}\abs{\sin(\epsilon/2)}$, and the forward wave is reduced to $F_{\max}\cos(\epsilon/2)$. This is the situation in a capacitor-run single-phase motor away from its design point.
:::
:::

::: exercise Third harmonics in a three-phase winding {level=3}
Show that the third space harmonic of the mmf, $\mathcal F_3\propto i\cos3\theta_e$ for each phase, cancels in a balanced three-phase winding, and that the fifth harmonic rotates **backwards** at one fifth of synchronous speed while the seventh rotates forwards at one seventh.
::: hint
The third-harmonic axis of phase $b$ is at $3\times120^\circ = 360^\circ$. For the fifth, use the same product-to-sum identity as in [[#thm-rotating-field]] with $\cos5(\theta_e - 120^\circ)$.
:::
::: solution
Third: $\cos3(\theta_e \mp 120^\circ) = \cos3\theta_e$, so the sum is $\cos3\theta_e[\cos\omega t + \cos(\omega t - 120^\circ) + \cos(\omega t + 120^\circ)] = 0$. Fifth: phase $b$ contributes $\cos(\omega t - 120^\circ)\cos(5\theta_e - 600^\circ) = \cos(\omega t - 120^\circ)\cos(5\theta_e - 240^\circ)$. The difference term has argument $5\theta_e - \omega t - 120^\circ$, and the sum term $5\theta_e + \omega t - 360^\circ = 5\theta_e + \omega t$. The sum terms of the three phases are all $\cos(5\theta_e + \omega t)$ and add to $\tfrac32\cos(5\theta_e + \omega t)$, while the difference terms are $120^\circ$ apart and cancel. The fifth harmonic is a wave $\cos(5\theta_e + \omega t)$, whose peak moves at $\mathrm d\theta_e/\mathrm dt = -\omega/5$: backwards at one fifth of synchronous speed. For the seventh, $7\times120^\circ = 840^\circ \equiv 120^\circ$ and the difference terms add, giving $\cos(7\theta_e - \omega t)$, forwards at $\omega/7$. These harmonic fields produce parasitic torques ("cusps" in the torque–speed curve) in induction motors, which is one reason for short pitching.
:::
:::

::: exercise Design for a target voltage {level=3}
A two-pole, $50\,\mathrm{Hz}$ turbo-generator is to produce $11\,\mathrm{kV}$ line (star) with a gap flux density of peak $1.0\,\mathrm T$. Its bore is $1.0\,\mathrm m$ and its active length $4.0\,\mathrm m$; the stator has $48$ slots with a two-layer winding whose coils span $20$ slots (the pole pitch is $24$ slots). (a) Find $q$, $\gamma$ and $k_w$. (b) Find the series turns per phase needed. (c) With one turn per coil (large generators use single-turn bar windings), how many parallel paths would give the nearest integer number of series turns, and what voltage results?
::: hint
A two-layer winding with $48$ slots has $48$ coils, $16$ per phase.
:::
::: solution
(a) $q = 48/(2\times3) = 8$, $\gamma = 2\times180^\circ/48 = 7.5^\circ$; $k_d = \sin30^\circ/(8\sin3.75^\circ) = 0.5/0.5232 = 0.956$; $\rho = 20/24$, $k_p = \sin75^\circ = 0.966$; $k_w = 0.923$.

(b) $\Phi_p = 2\times1.0\times1.0\times4.0/2 = 4.0\,\mathrm{Wb}$. $E_{\text{ph}} = 11\,000/\sqrt3 = 6351\,\mathrm V$, so $N_{\text{ph}} = 6351/(4.44\times50\times0.923\times4.0) = 7.75$ turns.

(c) Each phase has $16$ single-turn coils. With all in series, $N_{\text{ph}} = 16$, far too many; with two parallel paths, $N_{\text{ph}} = 8$, giving $E_{\text{ph}} = 4.44\times50\times0.923\times8\times4.0 = 6557\,\mathrm V$, a line voltage of $11.36\,\mathrm{kV}$. The designer would then lower the flux density slightly (to $0.97\,\mathrm T$) or shorten the core to reach exactly $11\,\mathrm{kV}$. Large turbo-generators indeed have only a handful of turns per phase, made of massive water-cooled bars, because their flux per pole is huge.
:::
:::
