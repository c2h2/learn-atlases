The frequency, and the response, and the one that the filter is for, are the one that the single frequency, and the range is for, and the one that the phasor is for. The Laplace, and the one that the circuit is for, is the one that the general is for, and the one that the response, and the frequency, and the time, are for, and the one that the transform is for. This lesson defines the Laplace transform, and the one that the circuit is for, gives the value, and the one that the s domain is for, of the element, and the one that the R and the L and the C is for, and the one that the analysis, and the response, is for. The Laplace, and the one that the transform is for, generalizes the phasor, and the one that the frequency is for, to the complex frequency, and the one that the response, and the transient, are for. The method, and the check, are the same as for the frequency case, and the one that is new is the transform, and the one that the response, and the transient, are for.

## The transform and the s domain

The Laplace, and the one that the circuit is for, is the one that the transform is for, and the one that the response, and the transient, are for.

::: definition Laplace transform {#def-lap}
The **Laplace transform** of a function, and the one that the time is for, is the integral, and the one that the range is for, of the function, times the negative of the s, and the one that the complex is for, times the time, over the time, and the one that the range is for, from the zero, and the one that the initial is for, to the infinity, and the one that the range is for,

$$
\mathbf{X}(s) \;=\; \int_0^\infty x(t)\,e^{-st}\,\mathrm dt, \qquad s \;=\; \sigma + j\omega,
$$

and the one that the transform is for. The **s**, and the one that the complex is for, is the complex frequency, and the one that the response and the transient are for, and the one that the pole is for. The inverse, and the one that the time is for, is the one that the transform is recovered from, and the one that the response is for.
:::

The s, and the one that the complex is for, is the generalization, and the one that the frequency is for, of the j omega, and the one that the phasor is for. The phasor, and the one that the frequency is for, is the one that the s, and the one that the imaginary is for, is on the axis, and the one that the response is for. The Laplace, and the one that the transform is for, is the one that the s, and the one that the plane is for, is over the range, and the one that the response, and the transient, are for.

::: theorem The element in the s domain {#thm-s}
The resistor, inductor, and capacitor, in the s domain, and the one that the transform is for, have the s equivalents,

$$
Z_R = R, \qquad Z_L = sL, \qquad Z_C = \frac{1}{sC},
$$

and the one that the transform is for. The phasor, and the one that the frequency is for, is the one that the s, and the one that the imaginary is for, is the j omega, and the one that the frequency is for. The s domain, and the one that the transform is for, is the one that the algebra, and the response, and the transient, are for.
:::

The s domain, and the one that the transform is for, turns the differential, and the one that the time is for, into the algebraic, and the one that the s is for, and the one that the response is for. The method, and the one that the circuit is for, is the same as for the node and the mesh, and the one that the resistive is for, with the s equivalents, and the one that the transform is for.

## The response and the inverse

The response, and the one that the s domain is for, is the one that the inverse is for, and the one that the time is for.

::: proposition Partial fractions and the inverse {#prop-pf}
The response, in the s domain, and the one that the rational is for, is decomposed, and the one that the term is for, into the partial fraction, and the one that the pole is for, and the one that the term is for, and the inverse, and the one that the time is for, of each is the exponential, and the one that the time is for, and the one that the coefficient is for,

$$
\frac{1}{s(s+a)} \;=\; \frac{1}{a}\left(\frac{1}{s} - \frac{1}{s+a}\right) \quad\Rightarrow\quad \frac{1}{a}\left(1 - e^{-a t}\right).
$$

The partial fraction, and the one that the pole is for, is the one that the answer is for, and the one that the time is for.
:::

::: example The step response, in the s domain {#ex-step}
The low pass, and the one that the R and the C is for, is the one that the response is for. What is the step response, and the one that the time is for?
::: solution
The transfer function, and the one that the s domain is for, is the one over the one plus the s and the R and the C, and the one that the circuit is for. The step, and the one that the input is for, is the one over the s, and the one that the transform is for. The output, and the one that the response is for, is the one over the s, and the one plus the s and the R and the C, and the one that the circuit is for. The partial fraction, and the one that the pole is for, is the one over the s, minus the one over the s plus the one over the R and the C, and the one that the circuit is for. The inverse, and the one that the time is for, is the one minus the negative of the one over the R and the C, times the t, and the one that the time is for. This is the one that the step response is for, and the one that the transient is for.
:::
:::

::: example The RL, and the response {#ex-rl}
The RL, and the one that the step is for, is the one that the response is for. What is the current, and the one that the time is for?
::: solution
The current, in the s domain, and the one that the transform is for, is the voltage over the s, and the R plus the s and the L, and the one that the circuit is for. The partial fraction, and the one that the pole is for, is the one over the R, times the one over the s, minus the one over the s plus the R over the L, and the one that the circuit is for. The inverse, and the one that the time is for, is the one over the R, times the one minus the negative of the R over the L, times the t, and the one that the time is for. This is the one that the step response is for, and the one that the transient is for.
:::
:::

## The pole and the zero

The pole, and the one that the s domain is for, is the one that the stability, and the response, is for, and the one that the transient is for.

::: definition Poles and zeros {#def-pz}
The **pole** of the transfer function, and the one that the s domain is for, is the value of the s, and the one that the complex is for, that the denominator, and the one that the pole is for, goes to the zero, and the one that the pole is for. The **zero** is the value of the s, and the one that the complex is for, that the numerator, and the one that the zero is for, goes to the zero, and the one that the zero is for. The pole, and the one that the transient is for, is the one that the exponential, and the one that the decay is for, and the one that the time is for, is for. The zero, and the one that the response is for, is the one that the frequency, and the one that the phase is for, and the one that the response is for, is for.
:::

The pole, and the one that the transient is for, is the one that the stability is for. The pole, and the one that the left is for, on the axis, and the one that the negative is for, is the one that the stable is for, and the one that the decay is for. The pole, and the one that the right is for, on the axis, and the one that the positive is for, is the one that the unstable is for, and the one that the grow is for. The position, and the one that the pole is for, is the one that the decay, and the transient, is for.

::: example The pole, and the stability {#ex-pole}
The transfer function, and the one that the s domain is for, is the one over the s plus the two. What is the pole, and the one that the stability is for, and the time, and the one that the transient is for?
::: solution
The pole, and the one that the s domain is for, is the s, and the one that the negative is for, and the two, and the one that the axis is for. The pole, and the one that the left is for, is the one that the stable is for, and the one that the decay is for. The response, and the one that the time is for, is the negative of the two, times the t, and the one that the time is for, and the one that the decay is for. The time constant, and the one that the transient is for, is the one over the two, and the one that the time is for.
:::
:::

The relationship, and the one that the phasor is for, between the Laplace and the phasor, and the one that the frequency is for, is the one that the s, and the one that the imaginary is for, is the j omega, and the one that the frequency is for. The phasor, and the one that the frequency is for, is the one that the Laplace is on the axis, and the one that the response is for, and the one that the transient is not for, and the one that the time is for. The Laplace, and the one that the transform is for, is the one that the response, and the transient, are for, and the one that the time is for.

::: example The RL, and the pole {#ex-rlpole}
The RL, and the one that the s domain is for, is the one that the response is for. What is the pole, and the one that the transient is for, and the decay, and the one that the time is for?
::: solution
The current, in the s domain, and the one that the transform is for, is the one over the s, and the R over the L, and the one that the circuit is for. The pole, and the one that the s domain is for, is the R over the L, on the negative, and the one that the axis is for. The response, and the one that the time is for, is the one minus the negative of the R over the L, and the t, and the one that the time is for. The decay, and the one that the transient is for, is the time constant, and the one that the one over the R over the L is for, and the one that the time is for. This is the one that the first-order is for, and the one that the transient is for.
:::
:::

::: warning The s domain, and the initial {#warn-ic}
The Laplace, and the one that the transform is for, is the one that the initial, and the one that the condition is for, is included in the transform, and the one that the response is for. The frequency, and the one that the phasor is for, is the one that the steady is for, and the one that the transient is not for. The Laplace, and the one that the transform is for, is the one that the initial, and the transient, are included, and the one that the response is for. The initial, and the one that the condition is for, is the one that the response, and the transient, is for.
:::

::: widget plot
f: 1-exp(-x)
x: 0 4
y: 0 1
sliders:
caption: The step response, and the one that the transient is for, and the one that the time is for. The response, and the one that the s domain is for, approaches the one, and the one that the steady is for, with the decay, and the one that the time is for, and the one that the pole is for. This is the one that the Laplace is for, and the one that the response is for.
:::

::: quiz
The pole of the response, and the two, and the one that the s domain is for, is what, in the s plane, and the one that the complex is for?
- [x] Minus the two on the real axis
- [ ] Plus the two on the real axis
- [ ] The two on the imaginary axis
- [ ] The origin
::: solution
The pole, and the one that the s domain is for, is the value of the s, and the one that the complex is for, that the denominator goes to the zero. The s plus the two, and the one that the s domain is for, goes to the zero when s is the minus the two, and the one that the axis is for. So the pole is the minus the two, on the real axis, and the one that the s plane is for, and the one that the stability is for.
:::
:::

## Where this leads

With the Laplace, and the one that the transform is for, and the s domain, and the one that the element is for, and the response, and the inverse, and the pole and the zero, in hand, you have the full analysis, and the one that the response and the transient is for. The method, and the check, are the same as for the frequency case, and the one that is new is the transform, and the one that the response and the transient is for. In the later courses, the Laplace, and the one that the transform is for, is the one that the control and the signal is for, and the same algebra, and the transform, and the pole and the zero, and the check, are the ones you already have.

::: history
The Laplace transform, and the one that the circuit is for, is the one that the response and the transient is for, and the one that the transform is for. The pole and the zero, and the one that the s domain is for, is the one that the stability is for. The s domain, and the one that the element is for, is the one that the analysis is for. The method, the one that the transform is for, is the one that the response is for, and the one that the transient is for.
:::

::: summary
- The Laplace transform, and the one that the time is for, is the integral, and the one that the range is for, of the function, times the negative of the s, and the one that the complex is for, and the one that the response is for.
- The s, and the one that the complex is for, is the complex frequency, and the one that the response and the transient is for, and the one that the pole is for.
- The element, in the s domain, is the R, and the s and the L, and the one over the s and the C, and the one that the transform is for.
- The s domain, and the one that the transform is for, turns the differential, and the one that the time is for, into the algebraic, and the one that the s is for.
- The partial fraction, and the one that the pole is for, is the one that the response is for, and the one that the time is for.
- The pole, and the one that the transient is for, is the one that the stability is for. The pole, and the one that the left is for, is the one that the stable is for.
- The zero, and the one that the response is for, is the one that the frequency and the phase is for.
- The phasor, and the one that the frequency is for, is the one that the s, and the one that the imaginary is for, is for, and the one that the transient is not for.
:::

## Exercises

::: exercise The s element {level=1 check="sL"}
The inductor, in the s domain, and the one that the transform is for. What is it?
::: solution
The inductor, in the s domain, is the s and the L, and the one that the transform is for. The phasor, and the one that the frequency is for, is the j omega and the L, and the one that the frequency is for.
:::
:::

::: exercise The s element, the capacitor {level=1 check="1/sC"}
The capacitor, in the s domain, and the one that the transform is for. What is it?
::: solution
The capacitor, in the s domain, is the one over the s and the C, and the one that the transform is for. The phasor, and the one that the frequency is for, is the one over the j omega and the C, and the one that the frequency is for.
:::
:::

::: exercise The step response {level=2 check="1-e"}
The response, and the one that the s domain is for, is the one over the s, and the one plus the s. What is the time, and the one that the transient is for?
::: hint
The partial fraction is the one over the s, minus the one over the s plus the one.
:::
::: solution
The partial fraction, and the one that the pole is for, is the one over the s, minus the one over the s plus the one, and the one that the response is for. The inverse, and the one that the time is for, is the one minus the negative of the one, times the t, and the one that the time is for. This is the step response, and the one that the transient is for.
:::
:::

::: exercise The pole {level=2 check="-2"}
The transfer function, and the one that the s domain is for, is the one over the s plus the two. What is the pole?
::: solution
The pole, and the one that the s domain is for, is the minus the two, and the one that the axis is for. The response, and the one that the time is for, is the negative of the two, times the t, and the one that the time is for.
:::
:::

::: exercise The stability {level=2}
The pole, and the one that the right is for, on the axis. Is the response, and the one that the transient is for, stable?
::: hint
The pole, and the one that the left is for, is the one that the stable is for.
:::
::: solution
The pole, and the one that the right is for, is the one that the unstable is for. The response, and the one that the transient is for, is the growth, and the one that the time is for, and the one that the positive is for. The pole, and the one that the left is for, is the one that the stable, and the decay, is for.
:::
:::

::: exercise The partial fraction {level=3}
Decompose, and the one that the s domain is for, is the one over the s, and the s plus the five.
::: hint
The coefficient is the one, and the one that the pole is for.
:::
::: solution
The partial fraction, and the one that the pole is for, is the one over the five, times the one over the s, minus the one over the s plus the five, and the one that the s domain is for. The inverse, and the one that the time is for, is the one over the five, times the one minus the negative of the five, times the t, and the one that the time is for.
:::
:::

::: exercise The phasor, and the s {level=3}
Explain, the relation, between the phasor, and the one that the frequency is for, and the s, and the one that the complex is for.
::: hint
The phasor, and the one that the frequency is for, is the one that the s, and the one that the imaginary is for, is for.
:::
::: solution
The s, and the one that the complex is for, is the complex frequency, and the one that the response and the transient is for. The phasor, and the one that the frequency is for, is the one that the s, and the one that the imaginary is for, is the j omega, and the one that the frequency is for. The phasor, and the one that the frequency is for, is the one that the Laplace is for, on the axis, and the one that the response is for, but the one that the transient is not for.
:::
:::

::: exercise The initial, and the s {level=3}
Explain, why the Laplace, and the one that the transform is for, includes the initial, and the one that the condition is for.
::: hint
The integral, and the one that the range is for, is from the zero, and the one that the initial is for.
:::
::: solution
The Laplace, and the one that the transform is for, is the one that the initial, and the one that the condition is for, is included, and the one that the transform is for. The frequency, and the one that the phasor is for, is the one that the steady is for, and the one that the transient is not for. The Laplace, and the one that the response is for, is the one that the initial and the transient is for, and the one that the response is for.
:::
:::
