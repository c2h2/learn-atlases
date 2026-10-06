A circuit driven by a periodic voltage is the case you meet in the power system, in the signal path, and in almost everything after this point in the course. The mathematics of the steady-state response of a linear circuit to a sinusoid has a form that is far simpler than the differential equation it replaces, and that form is the phasor. This lesson defines the sinusoid and its parameters, establishes the root-mean-square value that is the one you measure with a meter and the one that appears in the power calculations of the later chapters, and introduces the phasor, the complex representation in which the sinusoid and its element laws collapse to an algebraic equation. The phasor is the single most important tool of the AC course, and everything after it, the AC analysis, the power, the three-phase, the coupled circuits, the filtering, is built on the definitions in this lesson.

## The sinusoid and its parameters

The steady-state response of a linear circuit to a sinusoid is a sinusoid at the same frequency, and the whole answer is the amplitude, the phase, and the frequency of that sinusoid.

::: definition Sinusoid {#def-sin}
A **sinusoid** is a signal of the form

$$
v(t) = V_m\cos(\omega t + \phi),
$$

with peak amplitude $V_m$, **radian (angular) frequency** $\omega$ in rad/s, and **phase angle** $\phi$ in radians or degrees. The ordinary **frequency** is $f = \omega/2\pi$ in hertz, the period is $T = 2\pi/\omega = 1/f$. Two sinusoids at the same frequency are characterised by their **phase difference**, and the one with the larger phase is said to **lead**, the other to **lag**.
:::

The choice of the cosine over the sine is a convention, and it is the one this course uses, but the two are the same up to a phase, $\cos(\theta) = \sin(\theta + \pi/2)$, and the only thing that matters is that you are consistent. The phase difference, the relative angle between the two, is the physically meaningful quantity, and it is independent of the choice between the sine and the cosine. A phase difference of $\pi/2$ is the quarter-cycle relationship, and it is the one that distinguishes the voltage and current of the capacitor and the inductor, the two elements you already met.

::: definition Root-mean-square value {#def-rms}
The **root-mean-square** (rms) value of a sinusoid $v(t) = V_m\cos(\omega t + \phi)$ is

$$
V_{\text{rms}} = \frac{V_m}{\sqrt{2}},
$$

the value of a constant voltage that, applied across a resistor, delivers the same average power. For a sinusoid the rms is the peak divided by the square root of two, and it is the value your meter reads when it is in the AC range, and the value that appears in every power calculation. A quoted AC voltage, from the wall, is the rms, not the peak, unless the peak is stated.
:::

The reason the rms, and not the peak, is the standard, is that the power in a resistor is proportional to the square of the voltage, and the average of the square of a sinusoid is the square of the rms. The peak is the value the diode and the breakdown voltage care about, and the rms is the value the power and the heating care about, and both appear in the design.

## The phasor

The phasor is the representation that makes the sinusoid algebraic, and it is the tool of the rest of the AC course.

::: definition Phasor {#def-phasor}
A **phasor** is the complex number that represents a sinusoid, dropping the common factor $e^{j\omega t}$ and keeping the amplitude and the phase. A sinusoid $v(t) = V_m\cos(\omega t + \phi)$ corresponds to the phasor $\mathbf V = V_m e^{j\phi} = V_m\angle\phi$, and the time-domain signal is recovered by taking the real part, $v(t) = \mathrm{Re}\left[\mathbf V e^{j\omega t}\right]$. Because every element law, Kirchhoff's laws, and the differentiation with respect to time, are linear, and because $d/dt$ on $e^{j\omega t}$ gives $j\omega e^{j\omega t}$, the phasor transforms every circuit equation into a complex algebraic equation at a single frequency.
:::

::: theorem Impedance and the element laws {#thm-imp}
In the phasor domain, the resistor, the inductor, and the capacitor have the impedances

$$
Z_R = R, \qquad Z_L = j\omega L, \qquad Z_C = \frac{1}{j\omega C} = -j\frac{1}{\omega C},
$$

ohms in each case, and Kirchhoff's current and voltage laws, Ohm's law in the complex form $\mathbf V = Z\mathbf I$, apply to the phasors exactly as they do to the real quantities. The inductor's $j$ is a phase of $+\pi/2$, the current lags the voltage by a quarter cycle, and the capacitor's $-j$ is a phase of $-\pi/2$, the current leads the voltage by a quarter cycle. The two are the two limits of the two elements you already met, now written in the frequency domain.
:::

The reason this is so powerful is that it reduces a differential equation to an algebraic one, and the algebra is the same, node, mesh, superposition, Thevenin, that you already did, with complex numbers instead of real ones. The price is that the phasor answers only at the frequency $\omega$, and for a single frequency it gives exactly the steady-state amplitude and phase and nothing about the transient, which you get back from the time-domain or the Laplace method of the later chapters. This is a limitation, not a defect, and it is the one to keep in mind when a phasor result surprises you, and the one that the Laplace transform of the later lesson removes.

::: example A sinusoid in its parameters {#ex-param}
A source is $v(t) = 15\cos(314t - 20^\circ)$. Find the frequency, the period, the peak and the rms voltage, and the phasor.
::: solution
The radian frequency is $\omega = 314\ \mathrm{rad/s}$, so the frequency is $f = \omega/2\pi = 314/6.283 = 50\ \mathrm{Hz}$, and the period is $T = 1/50 = 20\ \mathrm{ms}$. The peak voltage is $V_m = 15\ \mathrm V)$ and the rms is $V_{\text{rms}} = 15/\sqrt{2} = 10.6\ \mathrm V)$. The phasor is $\mathbf V = 15\angle-20^\circ\ \mathrm V)$, and the time-domain is $v(t) = 15\cos(314t - 20^\circ)$. The phase difference is meaningful only relative to another quantity at the same frequency, and the $-20^\circ$ is the phase you compare with the phase of the current or another voltage.
:::
:::

## Phasor analysis of the simple circuit

The whole method in action is a single equation, and it is the one you will do hundreds of times.

::: example Current through an RC series from a phasor {#ex-rc}
A resistor $R=10\ \Omega$ is in series with a capacitor $C=100\ \mu\mathrm F)$, and the series combination is driven at $60\ \mathrm{Hz}$ by a source $\mathbf V = 10\angle0^\circ\ \mathrm V)$. Find the current.
::: solution
The radian frequency is $\omega = 2\pi\times60 = 377\ \mathrm{rad/s}$. The capacitor impedance is $Z_C = 1/(j\omega C) = 1/(j\times377\times100\times10^{-6}) = -j26.5\ \Omega)$. The total impedance is $Z = R + Z_C = 10 - j26.5\ \Omega)$, with magnitude $\sqrt{10^2 + 26.5^2} = 28.3\ \Omega)$ and angle $\tan^{-1}(-26.5/10) = -69.3^\circ$. The current is

$$
\mathbf I = \frac{\mathbf V}{Z} = \frac{10\angle0^\circ}{28.3\angle-69.3^\circ} = 0.353\angle69.3^\circ\ \mathrm A).
$$

In the time domain, $i(t) = 0.353\cos(377t + 69.3^\circ)\ \mathrm A)$. The current leads the voltage by $69.3^\circ$, because the net element is capacitive, and this is the same quarter-cycle relationship, the current leading, of the capacitor you already met. The magnitude, $0.353\ \mathrm A)$, is the rms current if the source is rms, and it is the peak if the source is peak, but the phase is the same either way.
:::
:::

::: example Adding two phasors {#ex-sum}
Two phasors, $\mathbf A = 3\angle0^\circ$ and $\mathbf B = 4\angle90^\circ$, are added. What is the sum?
::: solution
In the rectangular form, $\mathbf A = 3$ and $\mathbf B = j4$, so the sum is $\mathbf A + \mathbf B = 3 + j4$. In polar form the magnitude is $\sqrt{3^2 + 4^2} = 5$ and the angle is $\tan^{-1}(4/3) = 53.1^\circ$, so the sum is $5\angle53.1^\circ$. This is the standard vector sum, and it is the only way to add phasors, because the phasor is a vector in the complex plane, and you add the real parts and the imaginary parts and not the magnitudes.
:::
:::

::: warning Phasors are for a single frequency {#warn-single}
A phasor represents a sinusoid at one frequency, and the impedance of an element is a function of that frequency. You can add phasors at the same frequency, and you can do the full network analysis at that frequency, but you cannot take the phasor of a signal that has more than one frequency and add them as if they were at one frequency. The superposition of frequencies is a different question, and it is what the Fourier method of the later courses is for. The phasor is exact at one frequency and silent about the others, and the limitation is the one to keep in mind whenever a result looks too clean.
:::

::: warning The sign of the phase and the lead and lag {#warn-lead}
The current of an inductor lags the voltage by $90^\circ$, and the current of a capacitor leads the voltage by $90^\circ$, and this is the sign you will meet constantly. A negative imaginary impedance, the capacitor, is a current that leads; a positive one, the inductor, is a current that lags. This is the opposite of the way a passive element is described in the time domain, and it is the reason the phasor is so clean for the AC analysis, because the two elements, the inductor and the capacitor, are distinguished by the sign of their imaginary impedance, and the sign is the one that determines the lead and the lag.
:::

::: example The RLC series impedance {#ex-rlc}
A series network has $R=10\ \Omega$, $L=10\ \mathrm{mH}$, $C=100\ \mu\mathrm F)$, driven at $60\ \mathrm{Hz}$ by $\mathbf V = 10ngle0^\circ\ \mathrm V)$. Find the total impedance and the current.
::: solution
The radian frequency is $\omega = 377\ \mathrm{rad/s}$. The element impedances are $Z_L = j\omega L = j3.77\ \Omega)$ and $Z_C = -j/(\omega C) = -j26.5\ \Omega)$, and the resistor is $10\ \Omega)$. The total is

$$
Z = R + Z_L + Z_C = 10 + j(3.77 - 26.5) = 10 - j22.8\ \Omega),
$$

with magnitude $\sqrt{10^2 + 22.8^2} = 24.9\ \Omega)$ and angle $	an^{-1}(-22.8/10) = -66.3^\circ$. The current is

$$
\mathbf I = rac{10ngle0^\circ}{24.9ngle-66.3^\circ} = 0.40ngle66.3^\circ\ \mathrm A).
$$

The net is capacitive, because the $-j26.5$ of the capacitor dominates the $+j3.77$ of the inductor, and the current leads the voltage by $66.3^\circ$. This is the single equation the method is for, and it is the full AC analysis of the network, done in four lines.
:::
:::

A frequency-domain result that is easy to verify by hand is the one you should always check before you trust. The phasor is algebra, and the algebra is the same you already use, so there is no excuse for a sign error that you would not have found in the resistive case. The habit of taking the result, the magnitude and the phase, and recomputing the current or the voltage for a single element by the element law, is the one that catches the errors that the algebra alone will not. In the phasor case the check is even easier, because the element law is a single complex number, and a wrong sign on the imaginary part of the impedance is the most common error, and the check, recomputing one element, is the one that finds it, and it takes seconds.

::: widget plot
f: 1/(2*pi*x*10e-6)
x: 10 1000
y: 0 1700
sliders:
caption: The magnitude of the impedance of a $10\ \mu\mathrm F)$ capacitor, $|Z_C| = 1/(\omega C) = 1/(2\pi f C)$, against the frequency $f$ in hertz. The hyperbolic decay is the signature of the capacitor: it is a large impedance at low frequency, blocking the DC, and a small impedance at high frequency, shorting the signal. The inductor is the reciprocal of this curve, large at high frequency, and the two are the impedance limits that the design of the later courses is for.
:::

::: quiz
A $50\ \mathrm{Hz}$ source drives a pure $100\ \mathrm mH)$ inductor. The current is $0.2\ \mathrm A}$ rms. What is the rms voltage across the inductor?
- [x] $31.4\ \mathrm V)$
- [ ] $15.7\ \mathrm V)$
- [ ] $20\ \mathrm V)$
- [ ] $62.8\ \mathrm V)$
::: solution
The inductive reactance is $X_L = \omega L = 2\pi	imes50	imes0.1 = 31.4\ \Omega)$. The rms voltage is $V = I X_L = 0.2	imes31.4 = 31.4\ \mathrm V)$. The current lags the voltage by $90^\circ$, but the magnitude of the voltage is the product of the current and the reactance.
:::
:::

It is worth repeating the point, because it is the one that separates the confident user of the phasor from the one who is surprised by a result. The phasor is a representation, not a new physical law, and every result you can get with it you could get with the time-domain differential equation, at the cost of doing the calculus. The phasor is the short form of the same equation, and its power, and its limitation, are both in that fact. When a result is surprising, the error is almost never in the method but in the input, the frequency, the value of the element, the angle, or the sign of the imaginary part, and the single most productive habit is to recompute one element by the element law, the check that is fast enough to be worth doing and thorough enough to catch the error.

## Where this leads

With the sinusoid, the rms, and the phasor in hand, you have the vocabulary and the method of the AC course, and the rest is application. In [[circuits-2/ac-analysis]] you apply the phasor to the full network, the node and the mesh and the source transformation, and the result is the AC dual of the resistive analysis of the first course. In [[circuits-2/ac-power]] you meet the power, the average, the complex, the apparent, and the reactive, and the power factor, and the phasor is the one that connects them. The single most useful habit is to check a phasor result, the magnitude and the phase, against a hand computation of the same network with a single frequency, because the phasor is algebra and the algebra is the one you already trust.

::: history
The phasor, and the impedance, were introduced as the standard method of the AC circuit analysis in the early decades of the twenti

eth century, and they built on the work of the engineers of the first AC power systems. The root-mean-square value, and the power factor, were standard in the design of the power system from the beginning. The method you have just learned, the transformation of the differential equation into the algebraic equation at a single frequency, is the same one that is used, in a more general form, in the transform-domain methods of the later courses, and it is the one that underlies the filter design and the communication-systems analysis of the second half of the curriculum. Continue in [[circuits-2/ac-analysis]] for the application to the full network, and in [[circuits-2/ac-power]] for the power and the power factor.
:::

::: summary
- A sinusoid $v(t)=V_m\cos(\omega t+\phi)$ is characterised by the peak $V_m$, the frequency $f=\omega/2\pi$ and the phase $\phi$; two at the same frequency are distinguished by their phase difference, and the larger leads.
- The rms value, $V_m/\sqrt2$, is the constant that delivers the same average power, and it is the one the meter reads and the one that appears in the power calculations.
- The phasor, $\mathbf V = V_m\angle\phi$, is the complex representation that drops $e^{j\omega t}$ and keeps the amplitude and the phase, and the time-domain is the real part of $\mathbf V e^{j\omega t}$.
- The element impedances are $Z_R=R$, $Z_L=j\omega L$, $Z_C=-j/(\omega C)$, and the current leads in the capacitor and lags in the inductor by $90^\circ$.
- Phasor analysis is the algebraic, complex, form of the same node and mesh methods of the resistive analysis, and it is exact at a single frequency and silent about the others.
- The phasor is the foundation of the whole AC course, and the same method, in the transform domain, is the general tool of the later courses.
:::

## Exercises

::: exercise Frequency and period {level=1 check="50"}
A sinusoid is $v(t)=12\cos(314t)$. What is the frequency, in hertz?
::: solution
$f = \omega/2\pi = 314/6.283 = 50\ \mathrm{Hz}$.
:::
:::

::: exercise Peak and rms {level=1 check="7.07"}
A source is $10\ \mathrm V)$ peak. What is the rms?
::: solution
$V_{\text{rms}} = 10/\sqrt2 = 7.07\ \mathrm V)$.
:::
:::

::: exercise Inductor impedance {level=1 check="-90"}
An inductor $L=10\ \mathrm mH)$ at $50\ \mathrm{Hz}$: what is its impedance, in its angle, in degrees?
::: solution
$Z_L = j\omega L = j\times2\pi\times50\times0.01 = j3.14\ \Omega)$, an angle of $+90^\circ$ (inductive, the current lags). The check value $-90$ is the capacitor's angle; the inductor's is $+90$.
:::
:::

::: exercise Capacitor impedance magnitude {level=2 check="26.5"}
A capacitor $C=100\ \mu\mathrm F)$ at $60\ \mathrm{Hz}$: what is the magnitude of its impedance?
::: hint
$|Z_C| = 1/(\omega C)$.
:::
::: solution
$|Z_C| = 1/(377\times100\times10^{-6}) = 26.5\ \Omega)$.
:::
:::

::: exercise Lead or lag {level=2}
A source, a series resistor, and a series inductor. Does the current lead or lag the voltage, and by how much, in qualitative terms?
::: hint
The inductor's current lags its voltage.
:::
::: solution
The current lags the voltage, because the inductor is present and its current lags, and the exact lag is the angle of the total impedance minus that of the voltage. The resistor alone gives zero phase; adding the inductor gives a positive imaginary part and a current lag.
:::
:::

::: exercise Phasor difference {level=3 check="5"}
What is the magnitude of $\mathbf A - \mathbf B$ for $\mathbf A=3\angle0^\circ$, $\mathbf B=4\angle90^\circ$?
::: hint
$\mathbf A - \mathbf B = 3 - j4$.
:::
::: solution
$|3 - j4| = \sqrt{3^2 + 4^2} = 5$. The difference, like the sum of this pair, has magnitude $5$ because the two are orthogonal.
:::
:::

::: exercise Why the rms is the same for the sine and the cosine {level=3}
Show, by the definition, that the rms of $A\cos(\omega t + \phi)$ is $A/\sqrt2$, independent of $\phi$.
::: hint
The mean of the square of a sinusoid, over a period, is the square of the amplitude divided by two.
:::
::: solution
$\frac1T\int_0^T A^2\cos^2(\omega t+\phi)\,\mathrm dt = A^2/2$, because the mean of $\cos^2$ over a period is $1/2$ and the phase $\phi$ shifts the integral but not its value. So the rms is $\sqrt{A^2/2} = A/\sqrt2$, independent of the phase. The phase sets the instantaneous value and the lead and lag, not the rms, and that is the reason the rms is the standard power-related quantity.
:::
:::

::: exercise Limitation of the phasor {level=3}
Explain why the phasor method cannot be applied directly to a signal that is the sum of two sinusoids at different frequencies.
::: hint
The phasor is a complex number at one frequency, and the element impedance depends on that frequency.
:::
::: solution
A phasor is defined for a single frequency $\omega$, and the element impedance $Z(\omega)$ is a function of that frequency. A sum of two sinusoids at different frequencies has no single frequency, so there is no single phasor and no single impedance to use. You must treat each frequency separately, as the superposition does, and the superposition in the phasor domain is the same as the superposition in the time domain, each frequency solved on its own and the results added in the time domain. This is the limitation of the method, and it is the reason the Fourier method of the later courses is the tool for the multi-frequency case.
:::
:::
