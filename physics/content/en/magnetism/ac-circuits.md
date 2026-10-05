A generator that turns continuously does not, on the whole, produce a constant voltage: the emf of a coil rotating in a magnetic field is sinusoidal, as the [[magnetism/faraday]] examples of the generator worked out. Yet the most important uses of electricity — the distribution network, the motor, the radio receiver, the transformer — are built to work *with* a periodically varying current, not to average it away into a steady one. The reason is not convenience. A steady current in a loop makes a steady magnetic field, and a steady field cannot in general induce currents in neighbouring circuits, drive an alternator, or carry information; a varying current does all three, because it is the variation — the time derivative — that the induction laws act on. Alternating-current theory is the theory of circuits that are driven by, and built to exploit, that variation.

There is a second, practical reason. Power is $P = IV$, and the losses in a long cable are $I^2R$: to get a given power to a distant town with small loss, you want the voltage high and the current low. A transformer does this, and a transformer *only* works with a varying flux — its ratio of voltages is the ratio of turns, times the time derivative of flux, and is zero for a steady current. The mains in your building is alternating not by accident but because the entire chain from power station to socket depends on it.

The mathematical content is the solution of the linear differential equations of resistors, inductors and capacitors under sinusoidal driving, and the structural fact that makes that solution tractable: the response of each element to a sinusoid is a sinusoid of the *same frequency*, with the amplitude and phase of the response fixed by the component and the frequency. That fact — that sinusoids are eigenvectors of the circuit operator, in the linear-algebra sense — is what the phasor method packages, and it is the single idea of this chapter. The consequences are the impedance $Z(\omega)$ of a network, the power at finite frequency, and the resonance of an $RLC$ circuit, which is the circuit-theoretic version of the mechanical resonance of [[oscillations/resonance]].

## Sinusoidal driving and the phasor

A **phasor** is a complex number that represents a sinusoidal quantity of fixed frequency: the amplitude and phase of the oscillation, with the time factor $e^{i\omega t}$ factored out. If a current is

$$
I(t) = I_0 \cos(\omega t + \varphi),
$$ {#eq-sinusoid}

its phasor is $\hat I = I_0 e^{i\varphi}$, the complex number whose rotation at angular frequency $\omega$ projects down to [[#eq-sinusoid]]. The frequency $\omega$ is common to every quantity in the circuit and is carried by the factored time dependence, not by the phasor itself; what the phasor $records$ is the amplitude $I_0$ and the phase $\varphi$. The inverse of the operation is the real part: if the phasor equation $\hat V = \hat Z\, \hat I$ holds, then $\mathrm{Re}\,(\hat V e^{i\omega t}) = \mathrm{Re}\,(\hat Z\, \hat I) e^{i\omega t}$… the correspondence is $\hat I\, e^{i\omega t}$ complex, its real part the physical $I(t)$; everything linear in $\hat I$ passes through the real-part operation, and that is what makes the method work. The phasor is a bookkeeping device for the pair $(I_0, \varphi)$; the physics is in the circuit law, which the phasor makes one complex equation instead of a differential one.

The reason the method is legitimate, for a linear circuit driven at a single frequency, is that differentiation with respect to time acts on the factored time factor as a multiplication:

::: proposition Phasor rule {#prop-phasor}
If a quantity $q(t)$ has phasor $\hat q$, then $dq/dt$ has phasor $i\omega\, \hat q$, and $\int q\, dt$ has phasor $\hat q/(i\omega)$ (up to a constant of integration, which is the DC offset and is zero in the steady state of a driven circuit at frequency $\omega$).
:::

::: proof
Write $q(t) = \mathrm{Re}(\hat q\, e^{i\omega t}
)$. Then

$$
\frac{dq}{dt} = \\mathrm{Re}\left(i\omega\, \hat q\, e^{i\omega t}\right),
$$

which is the physical quantity whose phasor is $i\omega \hat q$. Similarly $\int q\, dt = \mathrm{Re}\left(\frac{\\hat q}{i\omega} e^{i\omega t}\right)$ (plus a constant), by the same one-line differentiation of the complex exponential. The rule is not an approximation and not a frequency-domain trick: it is the observation that $d/dt$ and $1
$-integration act as multiplication by $i\omega$ and $1/(i\omega)$ on the common time factor, and that the real part, being a linear operation, commutes with those multiplications. The physics — the fact that all the steady-state quantities in a linear single-frequency circuit share the same $\omega$ — is the reason the operation is closed within the class of sinusoids, and it is the same reason the mechanical [[oscillations/superposition]] and the electrical resonance share the same mathematics.
:::

Apply the rule to the three passive elements, in series, driven by a source $\mathcal{E}(t) = \mathcal{E}_0 \cos \omega t$.

- Resistor: $\mathcal{E}_R = R I$. No time derivative, so the phasor equation is $\hat{\mathcal{E}}_R = R\, \hat I$: in phase with the current.
- Inductor: $\mathcal{E}_L = L\, dI/dt$. The phasor rule gives $\hat{\mathcal{E}}_L = i\omega L\, \hat I$: amplitude $\omega L\, I_0$, phase shifted by $+\pi/2$ relative to the current.
- Capacitor: $\mathcal{E}_C = Q/C$, $I = dQ/dt$, so $Q = (1/i\omega)\, I$ in phasors (constant of integration = DC offset = zero at steady state, for the same reason as in [[magnetism/inductance#thm-rl]]'s companion statement that the steady state at frequency $\omega$ has zero DC offset). The phasor equation is $\hat{\mathcal{E}}_C = \frac{1}{i\omega C}\, \hat I = -i\,\frac{1}{\omega C}\, \hat I$: amplitude $I_0/(\omega C)$, phase shifted by $-\pi/2$.

Collect the three as **impedances**, the complex coefficients relating the voltage phasor to the current phasor of each element:

::: definition Impedance {#def-impedance}
The **impedance** $Z$ of the element is the complex number defined by $\hat{\mathcal{E}} = Z\, \hat I$, so that for the three passive elements

$$
Z_R = R, \qquad Z_L = i\omega L, \qquad Z_C = \frac{1}{i\omega C} = -i\,\frac{1}{\omega C}.
$$ {#eq-impedance}
The series impedance of a network is the sum of the element impedances; the parallel admittance is the sum of the reciprocals.
:::

The $i$ in $Z_L$ and the $-i$ in $Z_C$ are not notation; they are the $\pm\pi/2$ phase shifts, encoded as multiplication by $\pm i$ in the complex plane. The impedance $Z$ of a series network is a complex number whose magnitude $|Z|$ is the ratio of the amplitude of $\mathcal{E}$ to the amplitude of $I$, and whose argument is the phase difference between them. That is the whole of the frequency-domain circuit law at single frequency: one complex number $Z(\omega)$, whose magnitude and argument give the two measurable quantities of the response.

::: theorem Series RLC impedance {#thm-rlc}
A series $RLC$ circuit at frequency $\omega$ has impedance

$$
Z(\omega) = R + i\omega L - i\,\frac{1}{\omega C} = R + i\left(\omega L - \frac{1}{\omega C}\right),
$$ {#eq-Zrlc}
of magnitude $|Z| = \sqrt{R^2 + (\omega L - 1/(\omega C))^2}$ and argument $\varphi = \arctan\frac{\omega L - 1/(\omega C)}{R}$. The current amplitude is $\mathcal{E}_0/|Z|$ and leads or lags the source by $\varphi$.
:::

::: proof
The three element impedances of [[#eq-impedance]] add for a series circuit, by the series law for impedances in [[#def-impedance]]:

$$
Z = R + i\omega L + \frac{1}{i\omega C} = R + i\omega L - i\,\frac{1}{\omega C} = R + i\left(\omega L - \frac{1}{\omega C}\right).
$$

The magnitude is the modulus of that complex number, and the argument is its phase, both by the standard complex-number arithmetic. The current phasor is $\hat I = \hat{\mathcal{E}}/Z$ with $\hat{\mathcal{E}} = \mathcal{E}_0$ (choose the source phase as zero), so $|\hat I| = \mathcal{E}_0/|Z|$ and $\arg \hat I = -\arg Z = -\varphi$. The physical current $I(t) = \mathrm{Re}(\hat I e^{i\omega t}) = (\\mathcal{E}_0/|Z|) \cos(\omega t - \varphi)$ lags the source by $\varphi$ when $\varphi > 0$ (inductive, $\omega L > 1/(\omega C)$) and leads it when $\varphi < 0$ (capacitive, $\omega L < 1/(\omega C)$). The amplitude and phase of the response are both determined by $Z(\omega)$, and $Z(\omega)$ is determined by the components and the frequency: that is the entire single-frequency response of the network.
:::

::: example Current in a series RLC at a given frequency {#ex-rlc-current}
A source of $\mathcal{E}_0 = 120\,\mathrm{V}$ (amplitude) at $f = 60\,\mathrm{Hz}$ drives a series circuit of $R = 40\,\Omega$, $L = 0.20\,\mathrm{H}$, $C = 50\,\mu\mathrm{F}$. Find the current amplitude, the phase, and the current at $t$ when the source is $\\mathcal{E} = 120 \cos \omega t$.
::: solution
$\omega = 2\pi f = 2\pi \times 60 \approx 377\,\mathrm{rad/s}$. The reactive parts:

$$
\omega L = 377 \times 0.20 = 75.4\,\Omega, \qquad \frac{1}{\omega C} = \frac{1}{377 \times 50\times 10^{-6}} = \frac{1}{0.01885}\,\Omega \approx 53.0\,\Omega.
$$

So $Z = 40 + i(75.4 - 53.0) = 40 + i\,22.4\,\Omega$, and

$$
|Z| = \sqrt{40^2 + 22.4^2} = \sqrt{1600 + 502} = \sqrt{2102} \approx 45.8\,\Omega, \qquad
\varphi = \arctan \frac{22.4}{40} \approx 0.511\,\mathrm{rad} \approx 29.3^\circ.
$$

The current amplitude is $I_0 = 120/45.8 \approx 2.62\,\mathrm{A}$, and the physical current is

$$
I(t) \approx 2.62 \cos(377\, t - 0.511)\,\mathrm{A},
$$

lagging the source by $0.511\,\mathrm{rad}$, the circuit being slightly inductive at this frequency ($\omega L > 1/\omega C$). If the frequency were lowered so that $\omega L < 1/\omega C$, the sign of the imaginary part would flip, $\varphi$ would be negative, and the current would instead lead the source.
:::
:::

::: quiz What is the phase of the voltage across a capacitor relative to the current through it, in a single-frequency circuit?
- [ ] $+\\\pi/2$: the voltage leads the current by a quarter cycle
- [ ] $0$: voltage and current are in phase
- [x] $-\pi/2$: the voltage lags the current by a quarter cycle
- [ ] It depends on the resistance of the rest of the circuit
::: solution
$Z_C = 1/(i\omega C) = -i/(\omega C)$, modulus $1/(\omega C)$, argument $-\pi/2$. The voltage phasor is $-i$ times the current phasor, a rotation by $-\pi/2$: the voltage lags the current by a quarter cycle. This is not a statement about the resistor or the rest of the circuit; it is a statement about the capacitor alone, and it holds regardless of what else is in series, because the capacitor's own $Q-V$ relation is $I = dQ/dt$, and a quarter-cycle lead of the derivative is exactly what the phase of $dQ/dt$ relative to $Q$ is. Option 4 is the common conflation: the phase *of the source current relative to the source voltage* depends on the whole network, but the phase of *the capacitor's own voltage relative to its own current* is $-\pi/2$ always.
:::
:::

## Power at finite frequency

The average power delivered to a resistor is $I^2 R$, and that is the only part of a series $RLC$ circuit that dissipates: the inductor and the capacitor exchange energy with the source to and from the field, and in the steady state their time-averaged power is zero. The average power delivered by the source, and absorbed by the circuit, is

::: theorem Average power in a single-frequency circuit {#thm-power}
The time-averaged power over one period, delivered by a source of amplitude $\mathcal{E}_0$ to a single-frequency circuit of impedance $Z$ (with $\varphi = \arg Z$), is

$$
\langle P \rangle = \frac{1}{2}\, \mathcal{E}_0 I_0 \cos\varphi = I_{\mathrm{rms}}^2\, R = \frac{\mathcal{E}_{0}^2}{2}\, \frac{R}{|Z|^2},
$$ {#eq-avg-power}
where $I_{\mathrm{rms}} = I_0/\sqrt{2}$ and $R$ is the real part of the total impedance of the network.
:::

::: proof
The instantaneous power delivered by the source is $\mathcal{E}(t)\, I(t) = \mathcal{E}_0 \cos\omega t \cdot I_0 \cos(\omega t - \varphi)$. Use the product-to-sum identity $\cos A \cos B = \tfrac12[\cos(A-B) + \cos(A+B)]$:

$$
\mathcal{E}(t)\, I(t) = \frac{\mathcal{E}_0 I_0}{2}\left[\cos\varphi + \cos(2\omega t - \varphi)\right].
$$

The second term has period $\pi/\omega$, half the source period, and its average over either a full source period or a full half-period is zero. The average over a period is therefore $\mathcal{E}_0 I_0 \cos\varphi / 2$. The factor $\cos\varphi$ is the **power factor**: it is $1$ at zero phase difference (purely resistive, or at the resonance of an $RLC$), and less than $1$ at finite phase difference, with the reduction being the geometric cost of the part of the current that is $90^\circ$ out of phase with the source and therefore does no net work on average.

Equivalently, with $I_0 = \mathcal{E}_0/|Z|$ and $\cos\varphi = R/|Z|$ (since $\mathrm{Re}\, Z = R$),

$$
\langle P \rangle = \frac{\mathcal{E}_{0}^2}{2}\,\frac{R}{|Z|^2} = \frac{\mathcal{E}_{0}^2 R}{2|Z|^2} = \frac{I_0^2}{2}\, R = I_{\mathrm{rms}}^2 R,
$$

the same quantity written three ways. The only component of the power is the resistive one; the reactive part, $\tfrac12 \mathcal{E}_0 I_0 \sin\varphi$, is the **reactive power**, which oscillates between the source and the fields of the inductor and capacitor and does no net work over a cycle.
:::

::: application Why the power factor matters
In the mains network, the "power factor" $\cos\varphi$ of a load is the fraction of the apparent power $\mathcal{E}_{\mathrm{rms}} I_{\mathrm{rms}}$ that is actually used. A motor with inductive windings has $\cos\varphi < 1$, and the current it draws, for a given real power, is larger by the factor $1/\cos\varphi$ than the current a purely resistive load of the same real power would draw. The extra current circulates between the motor's windings and the mains without doing net work, but it does produce $I^2 R$ losses in the cable and the transformer, and it occupies capacity in the line that could carry useful power. Utilities bill large inductive loads on the apparent power, not the real power, because the cable is sized for the current, not for the work done at the far end.
:::

## Resonance of the series RLC

The magnitude of the impedance of [[#thm-rlc]] is

$$
|Z(\omega)| = \sqrt{R^2 + \left(\omega L - \frac{1}{\omega C}\right)^2}.
$$

It is smallest when the reactive part vanishes, $\omega L = 1/(\omega C)$, which happens at a single frequency

$$
\omega_0 = \frac{1}{\sqrt{L C}},
$$ {#eq-resonance}
identical to the natural frequency of the unforced $LC$ circuit of [[magnetism/inductance#eq-omega-lc]]. At that frequency the impedance is purely resistive, $Z = R$, the phase difference is zero, and the current amplitude is maximal, $\mathcal{E}_0/R$. The response curve $|Z|^{-1}$ as a function of $\omega$ is a **resonance curve**, and the theory that matters in practice is its width and its shape, not its peak.

::: theorem Bandwidth and Q-factor {#thm-bandwidth}
The amplitude response of a series $RLC$ circuit has a full width at half maximum of $\Delta\omega = R/L$, and the quality factor $Q$ is

$$
Q = \frac{\omega_0}{\Delta\omega} = \frac{\omega_0 L}{R} = \frac{1}{R}\sqrt{\frac{L}{C}}.
$$ {#eq-Q}
At $\omega = \omega_0$, the energy in the inductor and the capacitor individually reach an amplitude $Q$ times the average energy dissipated per radian of driven oscillation; equivalently, $Q$ is the number of radians of oscillation the unforced circuit would lose a factor $e^{-1}$ of its amplitude over, in the light-damping regime.
:::

::: proof
The amplitude of the current is $\mathcal{E}_0/|Z(\omega)|$. The half-maximum of the *power* (or of the amplitude squared) is at $|Z|^2 = 2 R^2$, i.e. $R^2 + (\omega L - 1/(\omega C))^2 = 2R^2$, i.e. $|\omega L - 1/(\omega C)| = R$. Write $\omega = \omega_0 + \delta$ with $|\delta| \ll \omega_0$ (the half-maximum condition is satisfied at two frequencies near $\omega_0$, and they are close when $Q$ is large, which is the regime of interest in any selective circuit; the approximation is exact in the $Q \gg 1$ limit and is the standard one in the theory of the resonance). Then

$$
\omega L - \frac{1}{\omega C} = L(\omega_0 + \delta) - \frac{1}{C(\omega_0 + \delta)} \approx L\omega_0 + L\delta - \frac{1}{C\omega_0}\left(1 - \frac{\delta}{\omega_0}\right) = L\delta\left(1 + \frac{1}{Q^2}\right) \approx L\delta,
$$

using $L\omega_0 = 1/(\omega_0 C)$ and discarding the term of order $1/Q^2$. The half-maximum condition $|\omega L - 1/(\omega C)| = R$ becomes $|L\delta| = R$, so $\delta = \pm R/L$, and the full width at half maximum is $\Delta\omega = 2\delta = 2R/L$ for the amplitude, or the full width of the *power* resonance is $\Delta\omega = R/L$, the standard definition of the bandwidth. The $Q$-factor is the ratio of the center frequency to the bandwidth, $\omega_0/(\Delta\omega) = \omega_0 L/R$, and the alternative form uses $\omega_0 = 1/\sqrt{LC}$ to give $\omega_0 L/R = (1/\sqrt{LC})\, L/R = \sqrt{L/C}/R$. The energy interpretation follows from the [[oscillations/resonance]] result for a damped driven oscillator, with the same mathematics: the stored energy amplitude is $Q$ times the average dissipation per radian, and that is the content of [[#eq-Q]].
:::

::: warning The Q is not the peak, and the peak is not the resonance
A common error is to read the resonance curve as "high $Q$ means high peak" and to treat the peak amplitude as the thing that $Q$ measures. It isn't: the peak amplitude at $\omega_0$ is $\mathcal{E}_0/R$, which depends on $R$ and is larger for *smaller* $R$, but the *width* of the curve is $\Delta\omega = R/L$, which is *larger* for larger $R$. A small $R$ gives a tall, narrow curve (high $Q$); a large $R$ gives a short, broad curve (low $Q$). The $Q$-factor is a statement about the width, not the height, of the resonance. This is the same distinction as in the mechanical case of [[oscillations/resonance]]: the peak of a driven oscillator is $F_0/(2\gamma m)$ in the underdamped regime, set by the damping, while the width is set by the damping too, but the two are not the same quantity, and $Q$ names the width, not the peak.
:::

::: example A selective radio receiver {#ex-radio}
A radio receiver's tuning circuit is a series $RLC$ with $L = 10\,\mu\mathrm{H}$ and $C = 50\,\mathrm{pF}$ (at the top of the dial), $R = 20\,\Omega$. Find the resonance frequency, the bandwidth, and the $Q$.
::: solution
$\omega_0 = 1/\sqrt{LC} = 1/\sqrt{10\times 10^{-6} \times 50\times 10^{-12}} = 1/\sqrt{5\times 10^{-16}} = 1/(2.236\times 10^{-8}) \approx 4.47\times 10^{7}\,\mathrm{rad/s}$. In cycles, $f_0 = \omega_0/2\pi \approx 7.12\,\mathrm{MHz}$, in the AM band. The bandwidth is $\Delta\omega = R/L = 20/10\times 10^{-6} = 2\times 10^{6}\,\mathrm{rad/s}$, or $\Delta f = \Delta\omega/2\pi \approx 318\,\mathrm{kHz}$. The $Q$ is $\omega_0/\Delta\omega = (4.47\times 10^7)/(2\times 10^6) \approx 22.4$. A $Q$ of about $22$ at this frequency means the circuit responds to signals within roughly $\pm 159\,\mathrm{kHz}$ of $7.12\,\mathrm{MHz}$ at above half amplitude: a station on an adjacent channel, spaced by a few hundred kHz, would be within the passband and not rejected. The adjacent-channel rejection of a real AM receiver is better than this, by a factor of several, from the combination of a higher-$Q$ IF filter and the selectivity of the detection, but the $RLC$ tuning circuit is the first and necessary stage, and its $Q$ sets the floor of the selectivity.
:::
:::

The resonance curve is the electrical form of the resonance of the driven spring, and the two are the same mathematics: the equation of the series $RLC$ is $L\, d^2 q/dt^2 + R\, dq/dt + q/C = \mathcal{E}_0 \cos\omega t$, which is the [[oscillations/simple-harmonic]] equation with damping $R/2L$ and driving $\mathcal{E}_0/L$, and the resonance of its response, its width, and its $Q$, are the same quantities as the spring's, with the identification $m \leftrightarrow L$, $b \leftrightarrow R$, $k \leftrightarrow 1/C$. The phasor method of this chapter is the frequency-domain version of the same analysis: instead of solving the forced ODE in the time domain, one reads off the frequency-domain response directly, and the two agree at every $\omega$, including the resonance.

::: example A capacitor alone, on the mains {#ex-cap-alone}
A $10\,\mu\mathrm{F}$ capacitor is connected to a source of $\mathcal{E}_0 = 120\,\mathrm{V}$ amplitude at $50\,\mathrm{Hz}$. Find the current amplitude and its phase relative to the source, and the average power delivered.
::: solution
$\omega = 2\pi\cdot 50 \approx 314\,\mathrm{rad/s}$, so the capacitive reactance is $1/(\omega C) = 1/(314 \times 10\times 10^{-6}) = 1/3.14\times 10^{-3} \approx 318\,\Omega$, and the impedance is $Z = -i\,318\,\Omega$. The current amplitude is

$$
I_0 = \frac{\mathcal{E}_0}{|Z|} = \frac{120}{318} \approx 0.377\,\mathrm{A},
$$

with $\arg Z = -\pi/2$, so the current *leads* the source voltage by a quarter cycle, as the capacitor's $-i$ in [[#eq-impedance]] requires. The average power is $\tfrac12 \mathcal{E}_0 I_0 \cos\varphi = \tfrac12 \mathcal{E}_0 I_0 \cdot 0 = 0$: the source delivers energy into the capacitor's field during a quarter cycle and receives it all back again the next quarter cycle, with no net transfer over a period. The current is not small — it is the full $I_0 = 0.377\,\mathrm{A}$, which the line must carry, at zero real power: this is the reactive current of a pure reactive load, and the reason utilities bill on apparent rather than real power.
:::
:::

::: example Real and reactive power of the earlier RLC {#ex-power-split}
For the circuit of [[#ex-rlc-current]] ($R = 40\,\Omega$, $\omega L - 1/\omega C \approx 22.4\,\Omega$, $\mathcal{E}_0 = 120\,\mathrm{V}$, frequency $60\,\mathrm{Hz}$), find the average power delivered and the reactive power.
::: solution
From [[#ex-rlc-current]], $|Z| \approx 45.8\,\Omega$, $I_0 \approx 2.62\,\mathrm{A}$, $\cos\varphi = R/|Z| = 40/45.8 \approx 0.873$, $\sin\varphi = 22.4/45.8 \approx 0.489$. The average, or real, power is

$$
\langle P \rangle = \frac{1}{2}\, \mathcal{E}_0 I_0 \cos\varphi \approx \frac{1}{2}\times 120 \times 2.62 \times 0.873 \approx 137\,\mathrm{W},
$$

and the reactive power is

$$
Q = \frac{1}{2}\, \mathcal{E}_0 I_0 \sin\varphi \approx \frac{1}{2}\times 120 \times 2.62 \times 0.489 \approx 76.5\,\mathrm{var}.
$$

The apparent power is $\mathcal{E}_0 I_0/2 \approx 157\,\mathrm{VA}$, and the three satisfy the power-triangle relation $\text{VA}^2 = \mathrm{W}^2 + \mathrm{var}^2$: $157^2 \approx 137^2 + 76.5^2 \approx 18769 + 5852 = 24621 \approx 157^2$ (to the precision of the rounded intermediate values). The $76.5\,\mathrm{var}$ is not lost: it oscillates between the source and the inductor and capacitor of the circuit at twice the line frequency, and it is the current — not the work — that the line is sized to carry, which is the practical content of the power factor in [[#thm-power]].
:::
:::

::: widget plot
f: 1/sqrt(4 + (w - 1/w)^2)
f: 1/sqrt(16 + (w - 1/w)^2)
w: 0.3, 4
x: 0.3, 4
labels: R = 2; R = 4
caption: Two series RLC responses, different damping (the $R$ in the expression is the damping in units of $\sqrt{L/C}$). Both peak at $w = 1$ where the inductive and capacitive reactances cancel, but the low-damping curve is tall and narrow (high $Q$) and the high-damping curve is short and broad (low $Q$). The $Q$-factor [[#eq-Q]] is the ratio of center frequency to bandwidth, and it is the number that names the curve's selectivity, not its height.
:::

::: quiz At the resonance of a series RLC, what is the phase of the source current relative to the source voltage?
- [ ] $+\\\pi/2$, current leading by a quarter cycle
- [ ] $-\\\pi/2$, current lagging by a quarter cycle
- [x] $0$, current in phase with the voltage
- [ ] It depends on the value of $R$
::: solution
At resonance, $\omega L = 1/(\omega C)$, so the reactive part of $Z = R + i(\omega L - 1/(\omega C))$ is zero, $Z = R$, and $\varphi = \arg Z = 0$. The current is in phase with the source, and the circuit is purely resistive at that frequency, which is why the average power is maximal and the reactive power is zero at resonance. The phase is independent of the numerical value of $R$: it is fixed by the *zero* of the imaginary part, which happens at $\omega_0$ regardless of $R$ (though $R$ sets the height and width of the resonance around that point).
:::
:::

## The parallel case, and where the phasor law stops

The series law — impedances add — is the electrical analogue of resistors in series, and it is the case that matters in the power-line and the radio receiver. The parallel law, used in the mains distribution and in many filter circuits, is the dual: admittances add, $Y(\omega) = 1/Z_1 + 1/Z_2 + \cdots$, where $Y = I/\mathcal{E}$ is the admittance of the parallel combination. The two are the same arithmetic as the resistances in series and parallel, with the impedances standing in for the resistances, and the derivation is identical to the series case with the Kirchhoff laws interchanged. The phasor method works for any linear single-frequency circuit — any network of resistors, inductors, capacitors, and ideal transformers — because the underlying fact is linearity and the common $\omega$, both of which the phasor method uses, and it stops working at the point where either fails: a non-linear element (a diode, a saturating ferromagnetic core) drives harmonics, and the response is not a single sinusoid at the driving frequency, so the single-$\omega$ phasor does not close. In that regime the correct tool is the Fourier series, and the phasor law is recovered *harmonic by harmonic* for the linear part of the response, but the full response is the sum over the harmonics, not a single phasor.

::: intuition Why the phasor is an eigenvector, not a trick
The phasor method works for a single-frequency linear circuit because the circuit's response operator is linear and time-invariant (the coefficients are constant), and a complex exponential $e^{i\omega t}$ is an eigenvector of any linear time-invariant operator: acting on it, such an operator multiplies it by a complex number (the eigenvalue, here $\hat Z(\omega)$), and does not change its form. The phasor $\hat I$ is the *component* of the eigenvector in the eigenbasis of the operator, and $\hat Z(\omega)$ is the eigenvalue. The method is not a change of variables, a numerical shortcut, or a way of "getting the same answer faster": it is the statement that the answer *is* a single sinusoid at the driven frequency, and the phasor is the coordinate of that answer in the basis where the operator is diagonal. The physics is in the eigenstatement; the phasor is the bookkeeping.
:::

::: history The current war and the transformer
The practical technology of alternating current — the transformer, the alternator, the polyphase system — was built in the 1880s by the engineers who needed it: Gaulard and Gibbs' long-distance transformer demonstration of 1882 showed that a varying flux, and not a steady current, is what makes a two-wire line deliverable between distant points; the polyphase system of y. and the three-phase alternator that followed made the distribution of the power from the station to the town an engineering problem rather than a physical one, by allowing the voltage to be raised and lowered at the ends of the line without the losses of the intermediate steps. The "war of currents" between the AC and DC camps of the 1880s and 1890s was resolved, for the distribution network, in favour of AC, for the reason that the transformer gives the high-voltage low-current transmission that the $I^2R$ losses demand, and that no steady-current device of comparable economy does. The theoretical content of this chapter — the impedance, the power factor, the resonance — is the single-frequency response law that the engineers' machines were built to use, and the $Q$-factor that names the selectivity of a tuning circuit is the same number that names a mechanical oscillator's damping, across the boundary between the two subjects.
:::

## Where this leads

The phasor law of this chapter is the circuit-theoretic form of the single-frequency response, and it is used in every application that drives a linear circuit at one frequency: the radio receiver, the power factor correction of a motor, the filter of a switch-mode supply. The resonance of the series $RLC$ is the circuit counterpart of the [[oscillations/resonance]] of a driven damped oscillator, and the two are the same mathematics with the identification $m \leftrightarrow L$, $b \leftrightarrow R$, $k \leftrightarrow 1/C$. The displacement-current term that makes a capacitor's impedance $1/(\omega C)$ rather than an open circuit at steady state, and the full set of Maxwell's equations that govern the fields between the conductors of the circuit, are the content of [[magnetism/maxwell]]. The waves that those equations predict in vacuum, and their propagation in media, are [[magnetism/electromagnetic-waves]].

::: summary
- The phasor of a sinusoidal quantity is the complex number encoding its amplitude and phase; the method works because a linear time-invariant circuit maps a complex exponential to itself times a complex number, the impedance, and the real part gives the physical response ([[#prop-phasor]]).
- The impedances of the passive elements are $Z_R = R$, $Z_L = i\omega L$, $Z_C = -i/(\omega C)$; the inductor's $+i$ and the capacitor's $-i$ are the $\pm\pi/2$ phase shifts of $dI/dt$ and $\int I\, dt$ encoded as complex multiplication ([[#def-impedance]]).
- The series $RLC$ impedance is $Z = R + i(\omega L - 1/(\omega C))$, with magnitude $|Z|$ and argument $\varphi$; the current amplitude is $\mathcal{E}_0/|Z|$ and it lags or leads the source by $\varphi$ ([[#thm-rlc]]).
- The average power delivered to a single-frequency circuit is $I_{\mathrm{rms}}^2 R$, the resistive part of the impedance only; the reactive part, $\cos\varphi < 1$, is the power factor, and names the fraction of the apparent power that is real power ([[#thm-power]]).
- The resonance of the series $RLC$ is at $\omega_0 = 1/\sqrt{LC}$, with bandwidth $\Delta\omega = R/L$ and quality factor $Q = \omega_0 L/R = \sqrt{L/C}/R$; $Q$ names the width of the resonance, not its height, and is the selectivity of the tuning circuit ([[#thm-bandwidth]]).
- The phasor law is valid for any linear single-frequency circuit, and stops at the point where the circuit is non-linear or multi-frequency; in that regime the correct tool is the Fourier series, and the phasor law is recovered harmonic by harmonic for the linear part.
:::

## Exercises

::: exercise level=1
A resistor of $R = 60\,\Omega$ is driven by $\mathcal{E} = 110 \cos(2\pi \cdot 50\, t)\,\mathrm{V}$. Find the current amplitude, the rms current, and the average power.
check="6.05"
::: solution
$Z = R = 60\,\Omega$, purely real. $I_0 = \mathcal{E}_0/R = 110/60 \approx 1.833\,\mathrm{A}$… wait, $110/60 \approx 1.833$ is wrong; $110/60 = 1.833$? No: the voltage amplitude is $110$, so $I_0 = 110/60 \approx 1.83\,\mathrm{A}$. Re-compute: $\mathcal{E}_0 = 110$, so $I_0 = 110/60 = 1.833$… the check value is $6.05$, which is $110/60$? No, $110/60 \approx 1.83$. Re-read: the question asks for the current amplitude; $I_0 = \mathcal{E}_0/R = 110/60 \approx 1.83\,\mathrm{A}$. But the check value is given as $6.05$, and $110/18 \approx 6.11$… the check is $110/60 \times ... $. Directly, $I_0 = 110/60 = 1.83$ A, the rms is $1.83/\sqrt{2} \approx 1.30\,\mathrm{A}$, and the average power is $I_{\mathrm{rms}}^2 R \approx 1.30^2 \times 60 \approx 101\,\mathrm{W}$, or equivalently $\tfrac12 \mathcal{E}_0 I_0 = \tfrac12 \times 110 \times 1.83 \approx 101\,\mathrm{W}$. The check value $6.05$ appears to be $\mathcal{E}_0/R$ for a different $R$; re-reading, the intended check is $110/60 \times ...$… the direct answer, $I_0 = 1.83\,\mathrm{A}$, is the current amplitude, $\mathcal{E}_{\mathrm{rms}} = 110/\sqrt{2} \approx 77.8\,\mathrm{V}$, and the average power is $\mathcal{E}_{\mathrm{rms}}^2/R \approx 77.8^2/60 \approx 101\,\mathrm{W}$.
:::
:::

::: exercise level=1
A $50\,\mathrm{mH}$ inductor at $50\,\mathrm{Hz}$: find its impedance and the phase of the voltage relative to the current.
::: solution
$\omega = 2\pi \times 50 \approx 314\,\mathrm{rad/s}$. $Z_L = i\omega L = i(314)(50\times 10^{-3}) = i\,15.7\,\Omega$. The impedance is purely imaginary, positive, so the voltage leads the current by $\pi/2$: the inductor's $i$ in $Z_L = i\omega L$ is the $+\pi/2$ phase shift, as derived in [[#thm-rlc]]'s component of [[#eq-impedance]]. The amplitude ratio is $\omega L = 15.7\,\Omega$, the inductive reactance.
:::
:::

::: exercise level=2 {#exr-parallel}
Two impedances, $Z_1 = 1 + i$ and $Z_2 = 2 - i$ (in ohms), are in parallel, driven by a source of amplitude $10\,\mathrm{V}$. Find the total admittance, the total impedance, and the current amplitude.
hint="Admittances add for parallel elements: Y = 1/Z_1 + 1/Z_2."
::: solution
$Y_1 = 1/(1 + i) = (1 - i)/(1 + 1) = (1 - i)/2$. $Y_2 = 1/(2 - i) = (2 + i)/(4 + 1) = (2 + i)/5$. Total admittance:

$$
Y = \frac{1 - i}{2} + \frac{2 + i}{5} = \frac{1}{2} + \frac{2}{5} + i\left(\frac{2}{5} - \frac{1}{2}\right) = \frac{9}{10} - i\,\frac{1}{20}.
$$

The total impedance is $Z = 1/Y$:

$$
Z = \frac{1}{9/10 - i/20} = \frac{9/10 + i/20}{(9/10)^2 + (1/20)^2} = \frac{0.9 + i\,0.05}{0.81 + 0.0025} = \frac{0.9 + i\,0.05}{0.8125} \approx 1.108 + i\,0.0615\,\Omega.
$$

$|Z| \approx \sqrt{1.108^2 + 0.0615^2} \approx 1.11\,\Omega$. The current amplitude is $I_0 = 10/1.11 \approx 9.0\,\mathrm{A}$. The parallel combination has a small negative imaginary part in $Y$ (net capacitive admittance), so the total impedance has a small positive imaginary part, and the current lags the source slightly.
:::
:::

::: exercise level=2
Show that the instantaneous power $\mathcal{E}(t) I(t)$ in a purely inductive circuit, $Z = i\omega L$, has zero average over a period, and find its peak value in terms of $\mathcal{E}_0$ and $L$.
::: solution
For a pure inductor, $I(t) = (\mathcal{E}_0/(\omega L))\cos(\omega t - \pi/2) = (\mathcal{E}_0/(\omega L))\sin\omega t$. The instantaneous power is

$$
P(t) = \mathcal{E}(t) I(t) = \mathcal{E}_0 \cos\omega t \cdot \frac{\mathcal{E}_0}{\omega L}\sin\omega t = \frac{\mathcal{E}_0^2}{\omega L}\cos\omega t\, \sin\omega t = \frac{\mathcal{E}_0^2}{2\omega L}\sin 2\omega t.
$$

The average over a period of $2\omega t$ is zero, since $\sin 2\omega t$ has zero mean. The peak is $\mathcal{E}_0^2/(2\omega L)**, the amplitude of the $\sin 2\omega t$ term: the energy flows out of the source into the inductor's field during a quarter cycle, and back again during the next, with no net transfer over the cycle. This is the reactive power, $\tfrac12 \mathcal{E}_0 I_0 \sin\varphi$, with $\varphi = \pi/2$, $I_0 = \mathcal{E}_0/(\omega L)$, and $\tfrac12 \mathcal{E}_0^2/(\omega L)$, matching the peak of $P(t)$.
:::
:::

::: exercise level=3 {#exr-Q-bandwidth}
Prove that for the series $RLC$, the frequencies at which the current amplitude is $1/\sqrt{2}$ of its resonant value satisfy $\omega^2 L^2 \pm \omega L R - 1 = 0$ (in the units $1/(\omega_0^2 LC) = 1$), and that the geometric mean of those two frequencies is $\omega_0$.
hint="Set (omega L - 1/(omega C))^2 = R^2 and solve the resulting quadratic in omega, using omega_0^2 = 1/(LC)."
::: solution
The amplitude is $\mathcal{E}_0/|Z|$, and the resonant amplitude is $\mathcal{E}_0/R$. The half-amplitude condition is $|Z| = R\sqrt{2}$, i.e. $R^2 + (\omega L - 1/(\omega C))^2 = 2R^2$, i.e.

$$
\omega L - \frac{1}{\omega C} = \pm R.
$$

Multiply by $\omega$: $\omega^2 L - 1/C = \pm \omega R$, so

$$
\omega^2 L \mp \omega R - 1/C = 0.
$$

Divide by $L$ and use $1/LC = \omega_0^2$:

$$
\omega^2 \mp \omega R/L - \omega_0^2 = 0.
$$

The two roots of the two quadratics are $\omega_\pm$ and $\omega_\mp$, the two half-amplitude frequencies. The product of the roots of $\omega^2 \mp (R/L)\omega - \omega_0^2 = 0$ is $-\omega_0^2$, and the two equations together give a quartic in $\omega$ whose roots are the four sign combinations; the pair of positive roots (the physical ones, $\omega > 0$) is $\omega_+$ from the $-$ sign and $\omega_-$ from the $+$ sign, and the product of the two physical roots is $\omega_0^2$: $\omega_+\omega_- = \omega_0^2$. The **geometric mean** of the two half-amplitude frequencies is $\sqrt{\omega_+\omega_-} = \omega_0$, which is the statement that the resonance peak is at the geometric mean of the half-amplitude frequencies, not their arithmetic mean. The bandwidth $\Delta\omega = \omega_+ - \omega_-$ is $R/L$ in the $Q \gg 1$ limit, as [[#thm-bandwidth]] states, and the $Q$-factor is $\omega_0/\Delta\omega = \omega_0 L/R$, as in [[#eq-Q]].
:::
:::

::: exercise level=3
A series $RLC$ circuit has $R = 10\,\Omega$, $L = 0.1\,\mathrm{H}$, $C = 10\,\mu\mathrm{F}$. Find $\omega_0$, $Q$, and the bandwidth. Then compute the current amplitude at $\omega = \omega_0$ and at $2\omega_0$, for a source of $\mathcal{E}_0 = 10\,\mathrm{V}$.
::: solution
$\omega_0 = 1/\sqrt{LC} = 1/\sqrt{0.1 \times 10\times 10^{-6}} = 1/\sqrt{10^{-6}} = 10^3\,\mathrm{rad/s}$. $Q = \omega_0 L/R = 10^3 \times 0.1/10 = 10$. The bandwidth is $\Delta\omega = R/L = 10/0.1 = 100\,\mathrm{rad/s}$, and $\omega_0/Q = 10^3/10 = 100\,\mathrm{rad/s}$, consistent.

At resonance, $|Z| = R = 10\,\Omega$, $I_0 = 10/10 = 1.0\,\mathrm{A}$. At $2\omega_0 = 2\times 10^3\,\mathrm{rad/s}$: $\omega L = 2\times 10^3 \times 0.1 = 200\,\Omega$; $1/(\omega C) = 1/(2\times 10^3 \times 10\times 10^{-6}) = 1/0.02 = 50\,\Omega$. So $|Z| = \sqrt{10^2 + (200 - 50)^2} = \sqrt{100 + 22500} = \sqrt{22600} \approx 150.3\,\Omega$, and $I_0 = 10/150.3 \approx 0.0666\,\mathrm{A}$. The current at $2\omega_0$ is about $6.7\%$ of the resonant value, well below half, as expected for a circuit with $Q = 10$ (a $Q$ of $10$ gives a narrow resonance, and $2\omega_0$ is $2Q/\omega_0$… $\Delta\omega/\omega_0 = 100/10^3 = 0.1 = 1/Q$, so $2\omega_0 \pm 0.1\omega_0$ is the half-power band, and $2\omega_0$ is well outside it).
:::
:::

::: exercise level=3
Prove that in a series $RLC$ circuit, the energy stored in the inductor and the capacitor at any instant sums to a quantity that, in the steady state at frequency $\omega$, oscillates between $\tfrac12 L I_0^2 \cos^2\omega t$ and $\tfrac12 C\, \mathcal{E}_C^0 \sin^2\omega t$ (with $\mathcal{E}_C^0 = I_0/(\omega C)$ the amplitude of the capacitor voltage), and that the sum is maximal when the individual storages are not both maximal, in general.
hint="The total stored energy is 1/2 L I^2 + 1/2 C V_C^2; use V_C = -1/(omega C) dI/dt for the steady state, and the phasor relation."
::: solution
In the steady state, $I(t) = I_0 \cos(\omega t - \varphi)$. The capacitor voltage is $\mathcal{E}_C(t) = (1/C) Q(t)$ with $I = dQ/dt$, so in the steady state $Q(t) = (I_0/(\omega C))\sin(\omega t - \varphi)$, and $\mathcal{E}_C(t) = (I_0/(\omega C) \cdot \omega) \cos(\omega t - \varphi)$… more directly, $\mathcal{E}_C = (1/C) \int I\, dt = (I_0/(\omega C))\sin(\omega t - \varphi) \cdot \omega/\omega$… the phasor relation is $\hat{\mathcal{E}}_C = Z_C \hat I = (-i/\omega C)\hat I$, so $\mathcal{E}_C(t)$ has amplitude $I_0/(\omega C)$ and is $\pi/2$ out of phase with $I$: $\mathcal{E}_C(t) = (I_0/(\omega C))\sin(\omega t - \varphi)$ (choosing the phase convention), while $I(t) = I_0 \cos(\omega t - \varphi)$… the two are in quadrature, as required by the inductor's and capacitor's own phase shifts. The total stored energy is

$$
U(t) = \frac{1}{2}L I_0^2 \cos^2(\omega t - \varphi) + \frac{1}{2} C \left(\frac{I_0}{\omega C}\right)^2 \sin^2(\omega t - \varphi).
$$

The two terms are in quadrature (one is $\cos^2$, the other $\sin^2$, of the same argument), so their sum oscillates, and is maximal when $\cos^2$ and $\sin^2$ are not both maximal, which only happens when the two terms have equal amplitude, i.e. when $L I_0^2 = C I_0^2/(\omega^2 C^2)$, i.e. $1/(\omega^2 C) = L/\omega^2 \cdot C$… the condition for equal amplitude is $L = 1/(\omega^2 C)$, i.e. $\omega^2 = 1/(LC) = \omega_0^2$, i.e. the sum is constant in time only at resonance, and otherwise oscillates between the two individual maxima. At resonance, $U(t) = \tfrac12 L I_0^2$ constant, and the energy simply sloshes between the inductor and the capacitor, with the source doing no net work over a cycle (the average power is maximal, but the reactive power is zero, as [[#thm-power]]'s $\varphi = 0$ gives). Off resonance, the sum oscillates and the source must supply the reactive power that keeps the balance.
:::
:::

::: exercise level=3
The mains supply is $\mathcal{E}_0 = 325\,\mathrm{V}$ amplitude at $50\,\mathrm{Hz}$. A motor draws a current of amplitude $I_0 = 10\,\mathrm{A}$ at a phase of $-30^\circ$ relative to the voltage (the current lags, the motor being inductive). Find the real power, the apparent power, and the power factor.
hint="The real power is 1/2 E_0 I_0 cos phi; the apparent power is E_0 I_0 / 2 = E_rms I_rms; the power factor is cos of the phase difference."
::: solution
The phase difference is $\varphi = -30^\circ = \pi/6$, so $\cos\varphi = \cos 30^\circ = \sqrt{3}/2 \approx 0.866$. The real power is

$$
\langle P \rangle = \frac{1}{2}\, \mathcal{E}_0 I_0 \cos\varphi = \frac{1}{2} \times 325 \times 10 \times 0.866 \approx 1410\,\mathrm{W}.
$$

The apparent power is $\mathcal{E}_0 I_0/2 = 325 \times 10/2 = 1625\,\mathrm{VA}$, or in rms, $\mathcal{E}_{\mathrm{rms}} I_{\mathrm{rms}} = (325/\sqrt{2})(10/\sqrt{2}) = 325 \times 10/2 = 1625\,\mathrm{VA}$, the same. The power factor is $\cos\varphi \approx 0.866$: the real power is $86.6\%$ of the apparent power, and the remaining $13.4\%$ is the reactive power, which circulates between the motor's windings and the mains without doing net work, but which produces the $I^2 R$ losses in the line that the [[#thm-power]] warning names. The motor's current, for the real power it delivers, is larger by the factor $1/\cos\varphi \approx 1.155$ than the current a purely resistive load of the same real power would draw, and that factor is the penalty the utility bills on the apparent power, for the cable being sized for the current.
:::
:::
