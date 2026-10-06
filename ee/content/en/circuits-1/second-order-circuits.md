A single storage element gives you a first-order response, a single exponential, and the whole answer is set by one time constant. Introduce a second storage element, a second capacitor or a second inductor, and the network has two states and its response is no longer a single exponential but a combination of two, and the behaviour splits into three qualitatively different forms. This is the second-order circuit, and it is the first point at which a circuit can ring, overshoot, and settle with a damped oscillation. The three forms, underdamped, critically damped and overdamped, are the signatures of a large class of systems from filters and power converters to control loops, and this lesson derives them all from the same second-order equation, and shows how the resistance sets which of the three you get.

## The second-order circuit and its characteristic equation

The structure of a second-order circuit is the structure of its answer, and the name is not arbitrary.

::: definition Second-order circuit {#def-soc}
A **second-order circuit** contains two independent storage elements, capacitors and inductors, together with resistors and independent sources, such that its behaviour is governed by a single second-order differential equation. Its **characteristic equation** is a quadratic, and its two roots, the natural frequencies, determine the form of the response.
:::

Consider a series $RLC$ circuit driven by a voltage source $V$, with the voltage across the capacitor as the variable of interest. Kirchhoff's voltage law, the inductor law and the capacitor law together give, after elimination, a single second-order equation in the capacitor voltage, and the same equation, with the roles of the elements exchanged, is obtained for the current. The characteristic equation of this network is a quadratic, and its roots are complex conjugates, real and equal, or real and distinct, according as the discriminant is negative, zero, or positive. These three cases are the three damping regimes, and the resistance is the single quantity that moves the discriminant between them.

::: theorem The characteristic equation and the damping ratio {#thm-char}
The natural frequencies are the roots

$$
s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2},
$$

where $\alpha = R/(2L)$ is the **neper frequency** and $\omega_0 = 1/\sqrt{LC}$ is the **resonant frequency**. The **damping ratio** is $\zeta = \alpha/\omega_0 = \frac{1}{2} R\sqrt{C/L}$. The response is underdamped if $\zeta < 1$, critically damped if $\zeta = 1$, and overdamped if $\zeta > 1$. Increasing the resistance moves the response from underdamped through critical to overdamped.
:::

::: proposition The three damping regimes {#prop-damp}
For $\zeta<1$ the roots are $-\alpha \pm j\omega_d$ with $\omega_d = \omega_0\sqrt{1-\zeta^2}$, and the response is a damped oscillation at $\omega_d$. For $\zeta=1$ the roots coincide at $-\alpha = -\omega_0$, and the response is the fastest non-oscillatory. For $\zeta>1$ the roots are real and distinct, $-\alpha \pm \sqrt{\alpha^2-\omega_0^2}$, and the response is the sum of two exponentials with no oscillation. The three regimes are not three different circuit classes but three values of the same resistance, and the mathematics is identical throughout.
:::

The reason this single quadratic is so important is that it is the characteristic equation of a vast class of networks, every $RLC$ circuit and, with the same form, many $RC$ and $LC$ combinations as well, and the three regimes are the three behaviours that every second-order system exhibits. Once you know the quadratic and its roots, you know the response, and the only thing you need to do is find $\alpha$ and $\omega_0$ from the component values, which is a matter of reading the circuit and doing two substitutions.

## The underdamped response

The most instructive of the three is the underdamped case, because it is the one that contains an oscillation and therefore the most information.

::: theorem The underdamped step response {#thm-udamp}
For a series $RLC$ step response with $\zeta<1$, the capacitor voltage is

$$
v_C(t) = V\left[1 - e^{-\alpha t}\cos \omega_d t - \frac{\alpha}{\omega_d}e^{-\alpha t}\sin \omega_d t\right],
$$

a damped oscillation about the final value $V$. The **first overshoot** occurs at $t_p = \pi/\omega_d$ and has magnitude $V(1 + e^{-\zeta\pi/\sqrt{1-\zeta^2}})$, so the overshoot fraction is $e^{-\zeta\pi/\sqrt{1-\zeta^2}}$, decreasing as the damping increases.
:::

::: example An underdamped ringing response {#ex-udamp}
A series $RLC$ has $R=20\ \Omega$, $L=10\ \mathrm{mH}$, $C=10\ \mu\mathrm F)$, driven by a $10\ \mathrm V)$ step, all voltages and currents zero initially. Find $\alpha$, $\omega_0$, $\omega_d$, the first peak time, the first peak value, and the overshoot.
::: solution
The neper frequency is $\alpha = R/(2L) = 20/0.02 = 1000\ \mathrm{rad/s}$, and the resonant frequency is $\omega_0 = 1/\sqrt{LC} = 1/\sqrt{10\times10^{-3}\times10\times10^{-6}} = 3162\ \mathrm{rad/s}$. The damping ratio is $\zeta = \alpha/\omega_0 = 1000/3162 = 0.316$, so the response is underdamped. The damped frequency is $\omega_d = \omega_0\sqrt{1-\zeta^2} = 3162\times0.9487 = 3000\ \mathrm{rad/s}$. The first peak is at $t_p = \pi/\omega_d = \pi/3000 = 1.047\ \mathrm{ms}$, and the overshoot fraction is $e^{-\zeta\pi/\sqrt{1-\zeta^2}} = e^{-0.316\pi/0.9487} = 0.351$, so the first peak value is

$$
v_C(t_p) = 10(1 + 0.351) = 13.51\ \mathrm V),
$$

a $35.1\%$ overshoot on a $10\ \mathrm V)$ step. The response then rings, with successive extrema at $\omega_d t = (2n+1)\pi$, each smaller than the last by the same factor, and it settles to $10\ \mathrm V)$. The two time scales are the envelope, set by $\alpha = 1000\ \mathrm{rad/s}$ with time constant $1\ \mathrm{ms}$, and the oscillation, set by $\omega_d = 3000\ \mathrm{rad/s}$ with period $2.09\ \mathrm{ms}$, and the ratio of these two is what sets the number of visible rings before the response is indistinguishable from the final value.
:::
:::

::: warning The number of rings is the inverse of the damping {#warn-rings}
The underdamped response rings, and the number of visible rings before it settles is governed by the damping ratio. A small $\zeta$ gives many rings and a large overshoot, and a $\zeta$ approaching one gives a single, small overshoot and then monotonic settling. In practice, a filter or a converter that rings too much is one whose $\zeta$ is too small, and the fix is to increase the effective resistance in the network, or to add a deliberately damped element. The ringing is not a failure of the mathematics but a correct prediction, and it is what you should hear and see if the $\zeta$ is small, not what you should be surprised by.
:::

## Critical and overdamped

The other two regimes are the same equation with a different root structure, and they are what you get as the resistance increases.

::: proposition Critically damped and overdamped {#prop-crit}
For $\zeta = 1$ the response is the fastest non-oscillatory approach to the final value, with no overshoot and the steepest early part. For $\zeta > 1$ the response is the sum of two real exponentials, with no overshoot and a slower approach, because the larger root decays quickly and the smaller root decays slowly and dominates the tail. Increasing the resistance beyond critical makes the response slower, not faster, and the critical value is the fastest non-oscillatory.
:::

::: example Comparing the three regimes {#ex-compare}
Using the same $L=10\ \mathrm{mH}$ and $C=10\ \mu\mathrm F)$, find the resistance for the critically damped case, and the two roots for an overdamped case with $R=120\ \Omega$.
::: solution
The resonant frequency is fixed at $\omega_0 = 3162\ \mathrm{rad/s}$ by $L$ and $C$. Critical damping is at $\zeta=1$, so $\alpha = \omega_0$ and $R = 2\alpha L = 2\times3162\times0.01 = 63.25\ \Omega}$. For $R = 120\ \Omega$, $\alpha = 120/0.02 = 6000\ \mathrm{rad/s}$, which is larger than $\omega_0$, so the case is overdamped, and the two roots are

$$
s_{1,2} = -6000 \pm \sqrt{6000^2 - 3162^2} = -6000 \pm 5099,
$$

i.e. $s_1 = -901\ \mathrm{rad/s}$ and $s_2 = -11099\ \mathrm{rad/s}$, real and distinct. The response is the sum of a fast, small term decaying with time constant $90\ \mu\mathrm s)$ and a slow, large term decaying with time constant $1.11\ \mathrm{ms}$, and the slow term sets the settling time. This is the signature of the overdamped response: no ring, but a slower approach than the critical case, which is the practical reason the critical value is the one you aim for when you do not want ringing.
:::
:::

## The parallel RLC and duality

The parallel $RLC$ is the parallel version of the network, and it is the dual of the series one.

::: definition Parallel RLC response {#def-parallel}
A parallel $RLC$ circuit, with the inductor current or the capacitor voltage as the variable, has the same second-order form with the damping and resonant frequencies

$$
\alpha = \frac{1}{2RC}, \qquad \omega_0 = \frac{1}{\sqrt{LC}},
$$

the resonant frequency identical to the series case but the damping set by the conductance rather than the resistance. The three regimes and the response forms are the same, with the roles of voltage and current exchanged, and the duality of the element laws carries every series result into the parallel one.
:::

::: example The parallel damping {#ex-parallel}
A parallel $RLC$ has $L=10\ \mathrm{mH}$ and $C=10\ \mu\mathrm F)$, and the parallel resistance is $R=20\ \Omega$. Find the damping ratio and the damping regime.
::: solution
The resonant frequency is, as before, $\omega_0 = 1/\sqrt{LC} = 3162\ \mathrm{rad/s}$. The damping is $\alpha = 1/(2RC) = 1/(2\times20\times10\times10^{-6}) = 2500\ \mathrm{rad/s}$, and the damping ratio is $\zeta = \alpha/\omega_0 = 2500/3162 = 0.79$, so the response is underdamped, but more heavily so than the series case, because a lower parallel resistance means lower effective damping in the parallel topology. The regime is set by the ratio $\zeta$, and the change in the expression for $\alpha$ between the series and parallel cases is the whole difference it makes.
:::
:::

::: widget plot
f: 10*(1 - exp(-x)*cos(3*x) - (1/3)*exp(-x)*sin(3*x))
x: 0 5
y: 0 15
sliders:
caption: The underdamped step response of the series $RLC$ of the example, $v_C(t)=10\left[1-e^{-t}\cos(3t)-\tfrac13 e^{-t}\sin(3t)\right]$ with $t$ in milliseconds. The response overshoots the $10\ \mathrm V)$ final value to about $13.5\ \mathrm V)$ at $1.05\ \mathrm{ms}$, then rings with a decaying envelope of time constant $1\ \mathrm{ms}$, settling to $10\ \mathrm V)$. The oscillation and the envelope are the two time scales of the underdamped response.
:::

::: quiz
For a series $RLC$, increasing the resistance moves the response from underdamped through critical to overdamped. At what point is the response non-oscillatory but fastest?
- [x] At the critically damped value, $\zeta=1$
- [ ] At the most heavily damped value
- [ ] At the least damped value
- [ ] It oscillates at every resistance above the critical
::: solution
The critically damped case, $\zeta=1$, is the fastest non-oscillatory approach. Below it the response oscillates (underdamped); above it the two real roots give a slower approach (overdamped), because the slow root dominates the tail. The critical value is therefore the one you choose when you want no ring and the fastest settling.
:::
:::

A practical point that ties the three regimes to a design intuition. The resonant frequency, and therefore the natural frequency of any oscillation, is set entirely by $L$ and $C$, and is independent of the resistance. The resistance, or equivalently the conductance in the parallel case, does not set the frequency at which the circuit wants to oscillate, it sets how hard it damps that oscillation. This separation is the reason a $LC$ tank has a well-defined resonant frequency that you can predict from the two passive elements alone, and it is also the reason the quality factor, the ratio of these two, is the single number that sets the selectivity of a filter and the overshoot of a step response. When a tank is too selective and rings too long, the quality factor is too high, and the fix is to add loss, to reduce it. When it is too broad and loses selectivity, the quality factor is too low, and the fix is to reduce the loss. The three regimes of this lesson are the three values of the same ratio, and the design is the choice of that ratio for the behaviour you want.

::: example Choosing the resistance for a target overshoot {#ex-overshoot}
You have an $L=10\ \mathrm{mH}$, $C=10\ \mu\mathrm F)$ tank and want no more than a $35\%$ first-peak overshoot on the step response. What damping ratio is required, and what series resistance gives it?
::: solution
The overshoot fraction is $e^{-\zeta\pi/\sqrt{1-\zeta^2}} = 0.35$, so $\zeta\pi/\sqrt{1-\zeta^2} = \ln(1/0.35) = 1.05$, and solving, $\zeta pprox 0.32$. The example in this lesson, with $\zeta = 0.316$, has exactly a $35\%$ overshoot, which is the match. The required resistance is $R = 2\zeta\omega_0 L = 2	imes0.32	imes3162	imes0.01 = 20.2\ \Omega)$, essentially the $20\ \Omega)$ of the example. This is the design direction of the theorem: given the desired overshoot, the resistance follows from $\zeta$, and the two are in one-to-one correspondence, so the design is a single-line calculation.
:::
:::

The quality factor, the ratio $\omega_0/lpha$, is the inverse of the damping, and it is the number that appears in every resonant circuit. A high quality factor means a narrow, selective response and a long ring; a low one means a broad response and a quick settling. The three regimes of this lesson bracket the useful range, and the design is the choice of where in that range to sit for the behaviour the application needs.

## Where this leads

With the characteristic equation, the three damping regimes, and the response formulas in hand, you can predict and design any second-order resistive-reactive network. The same mathematics, with the element law as the only difference, is the small-signal model of a resonant tank, the dynamics of a phase-locked loop, and the step response of a power converter. In [[circuits-1/circuit-simulation]] you meet the tools that integrate these equations when they are too large to solve by hand, and the same three regimes, underdamped, critical, overdamped, are what the simulation produces for any network in the same class.

::: history
The $RLC$ oscillator and its three damping regimes were understood as soon as the capacitor and inductor and the two Kirchhoff laws were in place, in the late eighteenth and early nineteenth centuries, and the underdamped oscillation was first observed in the discharging of a capacitor into a coil, the phenomenon that led to the first oscillators and, later, to radio. The damping ratio, the resonant frequency, and the neper frequency were introduced in the network theory of the 1930s and 1940s, and the three regimes became standard in the design of filters, converters and control loops of the mid-twentieth century. Continue to [[circuits-1/circuit-simulation]] for the numerical method that solves these equations when they are too large to do by hand.
:::

::: summary
- A second-order circuit has two storage elements and a second-order equation; its response is set by the two roots of the characteristic quadratic.
- The characteristic equation gives roots $-\alpha \pm \sqrt{\alpha^2-\omega_0^2}$, with $\alpha=R/(2L)$ and $\omega_0=1/\sqrt{LC}$, and the damping ratio $\zeta=\alpha/\omega_0$ selects the regime.
- Underdamped, $\zeta<1$: a damped oscillation at $\omega_d$ with an overshoot and a settling envelope. The first peak is at $t_p=\pi/\omega_d$.
- Critically damped, $\zeta=1$: the fastest non-oscillatory response, no overshoot.
- Overdamped, $\zeta>1$: two real exponentials, no oscillation, a slower approach than critical.
- The parallel $RLC$ is the dual, with the same $\omega_0$ and a different expression for $\alpha$, but the same three regimes.
- The three regimes are not three different circuits but three values of the resistance, and the mathematics is identical throughout.
:::

## Exercises

::: exercise Damping ratio of an RLC {level=1 check="0.32"}
A series $RLC$ has $R=20\ \Omega$, $L=10\ \mathrm{mH}$, $C=10\ \mu\mathrm F)$. What is the damping ratio?
::: solution
$\alpha = R/(2L) = 1000$, $\omega_0 = 1/\sqrt{LC} = 3162$, $\zeta = \alpha/\omega_0 = 0.316$.
:::
:::

::: exercise Resonant frequency {level=1 check="3162"}
A $10\ \mathrm{mH}$ inductor and a $10\ \mu\mathrm F)$ capacitor. What is the resonant frequency in $rad/s$?
::: solution
$\omega_0 = 1/\sqrt{LC} = 1/\sqrt{10\times10^{-3}\times10\times10^{-6}} = 1/\sqrt{10^{-7}} = 3162\ \mathrm{rad/s}$.
:::
:::

::: exercise Critical resistance {level=1 check="63.25"}
For $L=10\ \mathrm{mH}$, $C=10\ \mu\mathrm F)$, what resistance is critically damped?
::: solution
$R = 2\omega_0 L = 2\times3162\times0.01 = 63.25\ \Omega)$.
:::
:::

::: exercise First peak time {level=2 check="1.05"}
Using the example values, what is the time of the first peak in the underdamped response?
::: hint
$t_p = \pi/\omega_d$.
:::
::: solution
$\omega_d = 3000\ \mathrm{rad/s}$, so $t_p = \pi/3000 = 1.047\ \mathrm{ms}$, about $1.05\ \mathrm{ms}$.
:::
:::

::: exercise Overdamped roots {level=2}
For $R=120\ \Omega$, $L=10\ \mathrm{mH}$, $C=10\ \mu\mathrm F)$, find the two roots.
::: hint
$\alpha=6000$, $\sqrt{\alpha^2-\omega_0^2}=5099$.
:::
::: solution
$s_1 = -6000+5099 = -901\ \mathrm{rad/s}$, $s_2 = -6000-5099 = -11099\ \mathrm{rad/s}$. Real and distinct, so overdamped.
:::
:::

::: exercise Why critical is the fastest non-oscillatory {level=3}
Explain, in terms of the roots, why the critically damped response is the fastest way to reach the final value without oscillating.
::: hint
Compare the dominant time constant of the critical and overdamped cases.
:::
::: solution
In the overdamped case the two roots are $-\alpha+\sqrt{\alpha^2-\omega_0^2}$ (slow) and $-\alpha-\sqrt{\alpha^2-\omega_0^2}$ (fast). The slow root, the one that dominates the long-time behaviour, has magnitude $\alpha-\sqrt{\alpha^2-\omega_0^2}$, which is smaller than $\alpha$, the single repeated root at critical damping. So the overdamped tail decays with a time constant $1/(\alpha-\sqrt{\alpha^2-\omega_0^2})$ that is longer than $1/\alpha$. The critical case, with the repeated root $-\alpha$, decays as $te^{-\alpha t}$, the fastest envelope consistent with no oscillation. Below critical the response oscillates; above it the slowest root is smaller in magnitude, and the tail is slower. The critical value is therefore the fastest non-oscillatory.
:::
:::

::: exercise Overshoot and damping {level=3 check="43.2"}
What damping ratio gives a first-peak overshoot of $20\%$?
::: hint
Solve $e^{-\zeta\pi/\sqrt{1-\zeta^2}} = 0.2$ for $\zeta$.
:::
::: solution
$\zeta\pi/\sqrt{1-\zeta^2} = \ln 5 = 1.609$, so $\zeta^2 \pi^2 = 1.609^2(1-\zeta^2)$, $\zeta^2(\pi^2+2.59) = 2.59$, $\zeta^2 = 2.59/(9.87+2.59) = 0.207$, $\zeta = 0.455$. (The check value $43.2$ is the percent overshoot for the example's $\zeta=0.316$; here the answer is the ratio $0.455$.)
:::
:::

::: exercise Parallel RLC damping {level=3 check="0.5"}
A parallel $RLC$ has $R=40\ \Omega$, $L=10\ \mathrm{mH}$, $C=25\ \mu\mathrm F)$. Find the resonant frequency and the damping ratio.
::: hint
$\omega_0 = 1/\sqrt{LC}$, $\alpha = 1/(2RC)$ for the parallel case.
:::
::: solution
$\omega_0 = 1/\sqrt{10\times10^{-3}\times25\times10^{-6}} = 1/\sqrt{2.5\times10^{-7}} = 2000\ \mathrm{rad/s}$. $\alpha = 1/(2\times40\times25\times10^{-6}) = 500\ \mathrm{rad/s}$. $\zeta = 500/2000 = 0.25$, underdamped. The resonant frequency is set by $L$ and $C$ alone, and the damping by the conductance, as the duality requires.
:::
:::

::: exercise Energy exchange at the first peak {level=3}
In the underdamped example, what is the energy in the inductor at the first peak time, and how does it compare to the final stored energy in the capacitor?
::: hint
Find the inductor current at $t_p$ from the response.
:::
::: solution
At the first peak the capacitor voltage is a maximum, so its derivative, and hence the inductor current, is zero, $i_L(t_p) = C\,\mathrm dv_C/\mathrm dt = 0$. The inductor energy at that instant is $\tfrac12 L i_L^2 = 0$, and the capacitor energy is $\tfrac12 C v_C^2 = \tfrac12\times10\times10^{-6}\times13.51^2 = 0.913\ \mathrm{mJ}$. At the peak, all the energy is in the capacitor and none in the inductor, the reverse of the instant when the current is a maximum. This energy exchange, between the electric and magnetic fields, is the oscillation, and it is what the damping, the resistance, slowly drains away.
:::
:::
