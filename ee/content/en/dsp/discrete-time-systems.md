The discrete signal, and the one that the sequence is for, and the system, and the one that the sample is for. The difference equation, and the one that the discrete LTI is for, is the one that the response is for, and the one that the sequence is for. The system function, and the one that the z is for, is the one that the pole and zero is for, and the one that the design is for. This lesson defines the discrete LTI, and the one that the sample is for, and gives the difference equation, and the one that the sequence is for, and the system function, and the one that the z is for, and the structure, and the one that the implement is for. The method, and the check, are the one for the difference equation, and the one that is new is the discrete system, and the one that the design is for. The discrete LTI, and the one that the sample is for, is the one that the FIR and the IIR and the design and the structure, is for.

## The difference equation

The discrete LTI, and the one that the sample is for, is the one that the difference equation is for. The difference equation, and the one that the sequence is for, is the one that the response is for, in the sample, and the one that the time is for.

::: definition Discrete LTI {#def-dlti}
A **discrete LTI** system is the one that the linearity is for, and the **time invariant** is for, in the sample, and the one that the sequence is for. It is described, and the one that the discrete is for, by the difference equation, and the one that the sample is for,
$$
\sum_{k=0}^{M} a_k\, y[n-k] = \sum_{k=0}^{N} b_k\, x[n-k],
$$
and the one that the difference equation is for, of the output, and the one that the sequence is for, and the input, and the one that the signal is for. The $a_k$ is the coefficient of the delay, and the one that the feedback is for. The $b_k$ is the coefficient of the delay, and the one that the input is for. The difference equation, and the one that the discrete LTI is for, is the one that the impulse response is for, and the one that the system is described by.
:::

The difference equation, and the one that the discrete LTI is for, is the one that the sequence is for. The two, the feedforward and the feedback, and the one that the structure is for, are the $b_k$ of the input, and the $a_k$ of the output, and the one that the difference equation is for. The feedforward, and the one that the input is for, is the $b_k$. The feedback, and the one that the output is for, is the $a_k$. The two, and the one that the difference equation is for, are the FIR and the IIR, and the one that the system is for.

::: proposition The system function {#prop-H}
The **system function** of the discrete LTI, and the one that the z is for, is
$$
H(z) = \frac{\sum_{k=0}^{N} b_k\, z^{-k}}{\sum_{k=0}^{M} a_k\, z^{-k}},
$$
and the one that the system function is for, and the one that the z domain is for. The **zero** of the $H$, and the one that the z domain is for, is the root, and the one that the polynomial is for, of the numerator, and the one that the z is for. The **pole** of the $H$, and the one that the z domain is for, is the root, and the one that the polynomial is for, of the denominator, and the one that the z is for. The pole, and the one that the z domain is for, gives the stability, and the one that the discrete is for. The zero, and the one that the z domain is for, shapes the frequency, and the one that the response is for.
:::

The pole, and the one that the z domain is for, is the one that the stability is for. The zero, and the one that the z domain is for, is the one that the frequency is for. The two, and the one that the z domain is for, are the pole and zero, and the one that the design is for.

## The FIR and the IIR

The two, the FIR and the IIR, and the one that the discrete LTI is for, are the one that the $a_k$ is for. The FIR has the $a_k$ zero, and the one that the feedback is for. The IIR has the $a_k$ non-zero, and the one that the feedback is for.

::: proposition The FIR and the IIR {#prop-fir}
The **FIR** (finite impulse response) filter is the one that the difference equation is for, with the $a_k$ zero, and the one that the feedback is for, for the one that is more than zero, and the one that the delay is for. The system function, and the one that the FIR is for, is the one that the polynomial is for, in the z to the negative, and the one that the z domain is for, and it has no pole, and the one that the z domain is for, except at the origin, and the one that the z domain is for. The **IIR** (infinite impulse response) filter is the one that the difference equation is for, with the $a_k$ non-zero, and the one that the feedback is for. The system function, and the one that the IIR is for, is the one that the ratio is for, and it has the pole, and the one that the z domain is for, that gives the stability, and the one that the discrete is for.
:::

The FIR, and the one that the discrete LTI is for, is the one that the always stable is for. The IIR, and the one that the discrete LTI is for, is the one that the stable is for, when the pole is inside the unit circle, and the one that the z domain is for. The FIR is the one that the structure is for, and the one that the feedforward is for. The IIR is the one that the feedback is for, and the one that the pole is for.

::: example The IIR, and the pole {#ex-1st}
The difference equation is the one that the $y[n] = 0.9\,y[n-1] + x[n]$ is for. What is the system function, and the one that the z is for, and the stability, and the one that the discrete is for?
::: solution
The system function, and the one that the z is for, is the one over the one, and the one that the one is for, minus the zero point nine, and the one that the decay is for, times the z to the negative one, and the one that the delay is for. The pole, and the one that the z domain is for, is at the zero point nine, and the one that the decay is for, and the one that the z domain is for. The pole, and the one that the z domain is for, is inside the unit circle, and the one that the radius is for. So the system, and the one that the discrete is for, is the stable, and the one that the discrete is for. The DC gain, and the one that the frequency is for, is the one, and the one that the one is for, over the one, and the one that the one is for, minus the zero point nine, and the one that the decay is for, and the ten, and the one that the gain is for. The IIR, and the one that the discrete LTI is for, is the one that the feedback is for.
:::
:::

::: example The FIR, and the zero {#ex-fir}
The difference equation is the one that the moving average is for, and the length is three, and the one that the sequence is for. What is the system function, and the one that the z is for, and the zero, and the one that the z domain is for?
::: solution
The moving average, and the one that the FIR is for, is the one that the three is for. The system function, and the one that the z is for, is the one over the three, and the one that the gain is for, times the one, and the one that the one is for, plus the z to the negative one, and the one that the delay is for, plus the z to the negative two, and the one that the delay is for. The zero, and the one that the z domain is for, is the one that the root is for, of the one, and the one that the one is for, plus the z to the negative one, and the one that the delay is for, plus the z to the negative two, and the one that the delay is for. The FIR, and the one that the discrete LTI is for, has no pole, and the one that the z domain is for, except at the origin, and the one that the z domain is for. So it is the always stable, and the one that the discrete is for. The FIR, and the one that the discrete LTI is for, is the one that the structure is for.
:::
:::

## The structure and the implement

The difference equation, and the one that the discrete LTI is for, is the one that the block diagram is for. The block diagram, and the one that the structure is for, is the one that the delay and the sum and the scale is for. The implement, and the one that the structure is for, is the one that the direct and the cascade and the parallel is for.

::: proposition The structure {#prop-struct}
The **structure** of the discrete LTI, and the one that the difference equation is for, is the one that the block diagram is for, and the one that the implement is for. The **direct form I** is the one that the difference equation is for, with the delay of the input and the output, and the one that the sequence is for. The **direct form II** is the one that the delay is shared is for, and the one that the sequence is for, and it needs less, and the one that the delay is for, of the delay. The **cascade** is the one that the second order is for, section that is multiplied, and the one that the structure is for. The **parallel** is the one that the section is added is for, and the one that the structure is for. The structure, and the one that the implement is for, determines the numerical, and the one that the quantization is for, and the one that the design is for.
:::

The structure, and the one that the implement is for, is the one that the numerical is for. The direct form I, and the one that the structure is for, is the one that the delay of the input and the output is for. The direct form II, and the one that the structure is for, is the one that the delay is shared is for. The cascade, and the one that the structure is for, is the one that the second order is for. The parallel, and the one that the structure is for, is the one that the section is for. The two, and the one that the structure is for, are the cascade and the parallel, and the one that the implement is for.

::: example The cascade, and the IIR {#ex-cascade}
The IIR, and the one that the discrete LTI is for, has the pole and zero, and the one that the z domain is for. How is it implemented, and the one that the structure is for, with the cascade, and the one that the cascade is for?
::: solution
The cascade, and the one that the structure is for, is the one that the second order is for, section that is multiplied, and the one that the IIR is for. Each, and the one that the section is for, is the one that the pair is for, of the pole and zero, and the one that the z domain is for. The cascade, and the one that the structure is for, is stable, and the one that the numerical is for, when each section, and the one that the z domain is for, is stable, and the one that the pole is for. The cascade, and the one that the structure is for, is the one that the numerical is for, and the one that the design is for. The IIR, and the one that the discrete LTI is for, is implemented with the cascade, and the one that the section is for, and the one that the numerical is for.
:::
:::

::: example The low pass, and the pole {#ex-lowpass}
The first-order low pass, and the one that the IIR is for, has the coefficient alpha. What is the system function, and the one that the pole is for, of the discrete LTI that it is for?
::: solution
The first-order low pass, and the one that the IIR is for, is the one that the smoothing is for, with the coefficient alpha, and the one that the value is for. The system function, and the one that the z is for, is the alpha, and the one that the gain is for, over the one, and the one that the one is for, minus the one, and the one that the one is for, minus the alpha, and the one that the coefficient is for, times the z to the negative one, and the one that the delay is for. The pole, and the one that the z domain is for, is at the one, and the one that the one is for, minus the alpha, and the one that the coefficient is for. A small, and the one that the alpha is for, of the alpha, and the one that the coefficient is for, is the one that the more smoothing is for, and the one that the pole is for, that is nearer, and the one that the unit circle is for. The low pass, and the one that the IIR is for, is the one that the smoothing is for, and the one that the frequency is for.
:::
:::

The block diagram, and the one that the structure is for, is the one that the transfer function is for. The two, the difference equation and the system function, and the one that the discrete LTI is for, are the same, and the one that the z domain is for, and the one that the time is for. The difference equation is the one that the sample is for. The system function is the one that the z domain is for.

::: warning The stability, and the pole {#warn-stab}
The stability, and the one that the discrete is for, of the discrete LTI, and the one that the sequence is for, is the one that the pole is for. The pole, and the one that the z domain is for, must be inside the unit circle, and the one that the radius is for, that the ROC, and the one that the convergence is for, is to include the unit circle, and the one that the z domain is for. The pole, outside the unit circle, and the one that the z domain is for, makes the system the one that the unstable is for, and the one that the discrete is for. The FIR, and the one that the discrete LTI is for, has the pole, and the one that the z domain is for, at the origin, and the one that the z domain is for, and it is the always stable, and the one that the discrete is for. The stability, and the one that the discrete is for, is the one that the pole is for, and the one that the z domain is for.
:::

::: widget plot
f: 1/sqrt(1+0.81-2*0.9*cos(x))
x: -3.3 3.3
y: 0 12
sliders:
caption: The magnitude of the IIR H(z) with the pole at 0.9. The DC gain is 10. The magnitude is the one over the square root of one plus a squared minus two a cos of the omega, and the one that the pole is for. The IIR is the one that the feedback is for, and the one that the pole is for.
:::

::: quiz
The pole is outside the unit circle. Is the discrete LTI stable?
- [x] No, and the one that the unstable is for
- [ ] Yes, and the one that the stable is for
- [ ] The conditional, and the one that the frequency is for
- [ ] The marginal, and the one that the oscillation is for
::: solution
The pole, and the one that the z domain is for, outside the unit circle, and the one that the radius is for, is when the ROC, and the one that the convergence is for, does not include the unit circle, and the one that the z domain is for. So the discrete LTI, and the one that the sequence is for, is the unstable, and the one that the discrete is for. The transient, and the one that the response is for, grows, and the one that the sample is for. A stable discrete LTI, and the one that the z domain is for, has the pole, and the one that the z domain is for, inside the unit circle, and the one that the radius is for.
:::
:::

## Where this leads

With the discrete LTI, and the one that the difference equation is for, and the system function and the pole and zero and the FIR and the IIR and the structure, in hand, you have the full discrete system, and the one that the design is for. The method, and the check, are the one for the difference equation, and the one that is new is the discrete system, and the one that the design is for. In the next lesson, you meet the DFT, and the one that the finite is for, and the FFT, and the one that the efficient is for, and the same algebra, and the spectrum and the design and the check, are the ones you already have.

::: history
The discrete LTI, and the one that the difference equation is for, is the one that the digital is for. The system function, and the one that the z is for, is the one that the pole and zero is for. The FIR and the IIR, and the one that the discrete LTI is for, is the one that the design is for. The structure, and the one that the implement is for, is the one that the numerical is for.
:::

::: summary
- The discrete LTI is described by the difference equation with the delay of the input and the output.
- The system function H(z) is the ratio of the polynomial of the input and the output.
- The pole gives the stability. The zero shapes the frequency.
- The FIR has no feedback and is always stable.
- The IIR has the feedback and is stable when the pole is inside the unit circle.
- The structure is the direct form I or II or the cascade or the parallel.
- The stability of the discrete LTI is the one that the pole is for, inside the unit circle.
- The DC gain of the one pole IIR is the one over the one minus the pole.
:::

## Exercises

::: exercise The stability {level=1 check="inside"}
The pole is at which position, and the one that the z domain is for, that the discrete LTI is stable?
::: solution
The pole, and the one that the z domain is for, must be inside the unit circle, and the one that the radius is for, for the discrete LTI, and the one that the sequence is for, to be the stable, and the one that the discrete is for. The ROC, and the one that the convergence is for, must include the unit circle, and the one that the z domain is for.
:::
:::

::: exercise The FIR {level=1}
The FIR filter has the feedback and the one that the delay is for. Is it stable?
::: hint
The FIR has no pole except at the origin.
:::
::: solution
The FIR, and the one that the discrete LTI is for, has the pole, and the one that the z domain is for, at the origin, and the one that the z domain is for, and it is the always stable, and the one that the discrete is for. The feedback, and the one that the delay is for, is the one that the IIR is for. The FIR, and the one that the discrete LTI is for, has no feedback, and the one that the structure is for, and it is the one that the always stable is for.
:::
:::

::: exercise The DC gain {level=1 check="10"}
The one pole IIR has the pole at zero point nine. What is the DC gain, and the one that the frequency is for?
::: solution
The DC gain, and the one that the frequency is for, is the one, and the one that the one is for, over the one, and the one that the one is for, minus the pole, and the one that the z domain is for. The one minus the zero point nine, and the one that the pole is for, is the zero point one, and the one that the value is for. The one over the zero point one, and the one that the gain is for, is the ten, and the one that the DC gain is for. The DC gain, and the one that the IIR is for, is the ten, and the one that the frequency is for.
:::
:::

::: exercise The pole, and the IIR {level=2}
The IIR has the pole at zero point eight, and the one that the z domain is for, and the zero, and the one that the z domain is for. What is the stability, and the one that the discrete is for?
::: hint
The pole determines the stability.
:::
::: solution
The pole, at the zero point eight, and the one that the z domain is for, is inside the unit circle, and the one that the radius is for. So the IIR, and the one that the discrete LTI is for, is the stable, and the one that the discrete is for. The zero, and the one that the z domain is for, shapes the frequency, and the one that the response is for. The stability, and the one that the discrete is for, is the one that the pole is for, inside the unit circle, and the one that the z domain is for.
:::
:::

::: exercise The cascade {level=2}
Why is the cascade, and the one that the structure is for, preferred to the direct form, and the one that the IIR is for?
::: hint
The numerical, and the one that the quantization is for.
:::
::: solution
The cascade, and the one that the structure is for, breaks the IIR, and the one that the discrete LTI is for, into the second order, and the one that the section is for. The numerical, and the one that the quantization is for, of the pole and zero, and the one that the z domain is for, in the second order, and the one that the section is for, is the less sensitive, and the one that the quantization is for, than in the higher order, and the one that the section is for. So the cascade, and the one that the structure is for, is the one that the numerical is for, and the one that the design is for. The direct form, and the one that the IIR is for, is the one that the sensitive is for, to the quantization, and the one that the structure is for.
:::
:::

::: exercise The structure {level=2}
The direct form II, and the one that the structure is for. What is its advantage, and the one that the delay is for?
::: hint
It shares the delay.
:::
::: solution
The direct form II, and the one that the structure is for, shares the delay, and the one that the sequence is for, of the input and the output, and the one that the difference equation is for. It needs less, and the one that the delay is for, of the delay than the direct form I, and the one that the structure is for. The advantage, and the one that the direct form II is for, is the one that the delay is for, and the one that the implement is for. The direct form I, and the one that the structure is for, has the separate, and the one that the delay is for, of the delay of the input and the output.
:::
:::

::: exercise The zero, and the frequency {level=3}
Explain, how the zero of the H, and the one that the z domain is for, shapes the frequency response, and the one that the discrete is for.
::: hint
The zero near the unit circle cancels.
:::
::: solution
The zero of the H, and the one that the z domain is for, near the unit circle, and the one that the frequency is for, is one that the magnitude is for, and the one that the frequency is for, of the response, and the one that the discrete is for, is low, and the one that the magnitude is for, at that frequency, and the one that the omega is for. The zero, on the unit circle, and the one that the frequency is for, is the one that the notch is for, at the zero, and the one that the frequency is for. The zero, and the one that the z domain is for, shapes the frequency, and the one that the response is for, of the discrete LTI, and the one that the design is for. The design, and the one that the zero is for, places the zero, and the one that the z domain is for, to null, and the one that the frequency is for, the unwanted, and the one that the signal is for.
:::
:::

::: exercise The difference equation, and the system function {level=3}
Explain, the relation, between the difference equation, and the one that the discrete LTI is for, and the system function, and the one that the z is for.
::: hint
The transform of the difference equation.
:::
::: solution
The difference equation, and the one that the discrete LTI is for, in the sample, and the one that the sequence is for, transforms to the product, and the one that the z is for, of the polynomial, and the one that the input is for, and the polynomial, and the one that the output is for. The system function, and the one that the z is for, is the ratio, and the one that the polynomial is for, of the two, and the one that the z domain is for. The two, and the one that the discrete LTI is for, are the sample, and the one that the time is for, and the z, and the one that the domain is for. The difference equation is the one that the time is for. The system function is the one that the z domain is for.
:::
:::
