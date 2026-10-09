The discrete signal, and the one that the sequence is for, is the one that the transform is for, and the one that the pole is for. The z transform, and the one that the sequence is for, generalises the DTFT, and the one that the frequency is for, to the pole, and the one that the stability is for, and the one that the transient is for. The sequence, and the one that the sample is for, is transformed, and the one that the z is for, to the rational, and the one that the function is for, and the one that the pole and zero is for. This lesson defines the z, and the one that the discrete is for, and gives the pole and zero, and the one that the stability is for, and the ROC, and the one that the convergence is for, and the property, and the one that the sample is for. The method, and the check, are the one for the pole and zero, and the one that is new is the z, and the one that the discrete is for. The z, and the one that the sequence is for, is the one that the stability, and the transient, and the response, and the digital and the control, is for.

## The z and the pole

The z, and the one that the sequence is for, is the one that the transform is for, of the sequence, and the one that the sample is for. The pole, and the one that the z domain is for, is the one that the stability is for, and the one that the transient is for.

::: definition z-transform {#def-z}
The **z-transform** of the sequence, and the one that the sample is for, is
$$
X(z) = \sum_{n=-\infty}^{\infty} x[n]\, z^{-n},
$$
and the one that the transform is for, and the one that the z is for. The $z$ is the one that the **complex variable** is for, and the one that the z domain is for. The **pole** of the $X$, and the one that the z domain is for, is the one that the value of the z is for, and the one that the pole is for, at which the $X$ is the infinite, and the one that the pole is for. The **zero** of the $X$, and the one that the z domain is for, is the one that the value of the z is for, and the one that the zero is for, at which the $X$ is the zero, and the one that the zero is for. The z, and the one that the discrete is for, is the one that the DTFT is for, with the z, and the one that the complex is for, at the e, and the one that the frequency is for, to the j and the omega, and the one that the frequency is for.
:::

The pole, and the one that the z domain is for, is the one that the transient is for. The pole, and the one that the z domain is for, gives the mode, and the one that the response is for, of the sequence, and the one that the sample is for. The zero, and the one that the z domain is for, shapes the frequency, and the one that the response is for. The two, and the one that the z domain is for, are the pole and zero, and the one that the system function is for.

::: proposition The pair, and the pole {#prop-zpole}
The pair, and the one that the z is for, is the one that the sample and the z is for. The decay, and the one that the sequence is for,
$$
a^n u[n] \;\;\longleftrightarrow\;\; \frac{1}{1 - a z^{-1}} = \frac{z}{z-a},
$$
and the one that the pair is for, with the pole, and the one that the z domain is for, at the a, and the one that the decay is for. The step, and the one that the sequence is for,
$$
u[n] \;\;\longleftrightarrow\;\; \frac{z}{z-1},
$$
and the one that the pole is for, is at the one, and the one that the z domain is for. The impulse, and the one that the sequence is for, is the one, and the one that the pole is for, in all the z, and the one that the z domain is for. The pole, and the one that the z domain is for, is the one that the mode is for, of the response, and the one that the transient is for.
:::

The pole, and the one that the z domain is for, gives the natural mode, and the one that the response is for, of the discrete system, and the one that the LTI is for. The zero, and the one that the z domain is for, shapes the frequency, and the one that the response is for. The two, and the one that the z domain is for, are the pole and the zero, and the one that the system function is for.

## The ROC and the stability

The z, and the one that the sequence is for, is the one that the ROC is for, and the one that the convergence is for. The stability, and the one that the z domain is for, is the one that the ROC is for.

::: proposition The ROC, and the stability {#prop-zroc}
The **ROC** is the one that the range is for, in the plane of the z, and the one that the complex is for, where the z integral, and the one that the sum is for, converges, and the one that the one is for. The ROC, and the one that the z domain is for, is the one that the annulus is for, inside, or outside, of the radius, and the one that the one is for. The discrete system is **stable** (BIBO) when the ROC, and the one that the convergence is for, includes the unit circle, and the one that the z domain is for. The stability, and the one that the z domain is for, is the one that the pole is for, and the one that the stability is for.
:::

The ROC, and the one that the z domain is for, is the one that the convergence is for. The stability, and the one that the z domain is for, is the one that the ROC is for. The pole, and the one that the z domain is for, is the boundary, and the one that the ROC is for. The unit circle, and the one that the z domain is for, is the one that the frequency is for, and the one that the DTFT is for. The two, and the one that the z domain is for, are the pole and the ROC, and the one that the stability is for.

::: example The pole, and the stability {#ex-zstab}
The system function has the pole, at the zero point, and the one that the z domain is for, of the unit circle, and the one that the z domain is for. Is the system stable, and the one that the discrete is for?
::: solution
The stability, and the one that the z domain is for, is the one that the pole is for. The pole, and the one that the z domain is for, inside the unit circle, and the one that the radius is for, is when the system, and the one that the discrete is for, is the stable, and the one that the behaviour is for. The pole, and the one that the z domain is for, outside the unit circle, and the one that the radius is for, is when the system is the unstable, and the one that the z domain is for. A stable discrete system, and the one that the z domain is for, has the pole inside the unit circle, and the one that the one is for, of the radius, and the one that the z domain is for.
:::
:::

::: example The pair, and the transient {#ex-ztrans}
The pole, at the a, and the one that the z domain is for. What is the transient, and the one that the sequence is for, of the response, and the one that the system is for?
::: solution
The pole, and the one that the z domain is for, gives the mode, and the one that the transient is for, of the response, and the one that the sample is for. The pole, inside the unit circle, and the one that the z domain is for, gives the decay, and the one that the exponential is for, of the transient, and the one that the time is for. The pole, outside the unit circle, and the one that the z domain is for, gives the grow, and the one that the exponential is for, of the transient, and the one that the time is for. The pole, on the unit circle, and the one that the z domain is for, gives the oscillation, and the one that the sustained is for, of the transient, and the one that the time is for. The magnitude, and the one that the pole is for, gives the decay, or the grow, and the one that the rate is for. The angle, and the one that the pole is for, gives the frequency, and the one that the oscillation is for.
:::
:::

## The property and the response

The z, and the one that the sequence is for, has the property, and the one that the sample is for. The response, and the one that the discrete LTI is for, is the one that the z is for, of the input, and the one that the sequence is for, and the system function, and the one that the system is for, is for.

::: proposition The property, and the response {#prop-zprop}
The property, and the one that the z is for, is the one that the sample and the z is for. The delay, and the one that the sample is for, is
$$
x[n-n_0] \;\;\longleftrightarrow\;\; z^{-n_0}X(z),
$$
and the one that the delay is for. The difference, and the one that the sample is for, is
$$
x[n]-x[n-1] \;\;\longleftrightarrow\;\; (1-z^{-1})X(z),
$$
and the one that the difference is for. The convolution, and the one that the sample is for, is the product, and the one that the z is for. The response of the discrete LTI, and the one that the sequence is for, is the product, and the one that the z is for, of the transform, and the one that the input is for, and the system function, and the one that the system is for,
$$
Y(z) = H(z)\,X(z),
$$
and the one that the response is for. The system function, and the one that the discrete LTI is for, is the one that the pole and zero is for, and the one that the z domain is for.
:::

The response, and the one that the discrete LTI is for, in the z, and the one that the domain is for, has the partial fraction, and the one that the pole is for. The partial fraction, and the one that the response is for, separates the natural, and the one that the transient is for, and the forced, and the one that the steady is for, of the response, and the one that the sequence is for. The natural, and the one that the transient is for, is the one that the pole of the system function, and the one that the system is for, is for. The forced, and the one that the steady is for, is the one that the pole of the input, and the one that the sequence is for, is for.

::: example The system, and the response {#ex-zresp}
The system function has the pole and zero, and the one that the z domain is for. The input, and the one that the sequence is for, has the pole, and the one that the z domain is for. What is the response, and the one that the discrete is for?
::: solution
The response, and the one that the discrete LTI is for, is the product, and the one that the z is for, of the input, and the one that the sequence is for, and the system function, and the one that the system is for. The partial fraction, and the one that the response is for, separates the term, and the one that the pole is for. The inverse Laplace, and the one that the z is for, is the one that the sequence is for, of the response, and the one that the time is for. The response, and the one that the discrete is for, is the decay of the transient, and the one that the pole is for, if the pole is inside the unit circle, and the one that the z domain is for. The response, and the one that the discrete is for, is the one that the stable is for, if the pole is inside, and the one that the unit circle is for.
:::
:::

::: example The delay, and the system {#ex-delay}
The system, and the one that the discrete is for, delays the input, by the two sample, and the one that the time is for. What is the system function, and the one that the z domain is for?
::: solution
The delay, and the one that the discrete is for, is the one that the shift is for, in the sample, and the one that the sequence is for. The transform, and the one that the z is for, of the delay, and the one that the system is for, is the z to the negative two, and the one that the delay is for. The system function, and the one that the discrete is for, is the z to the negative two, and the one that the z domain is for. The system function, and the one that the delay is for, has no zero, and the one that the pole is for, except at the origin, and the one that the z domain is for, and it has the all pass, and the one that the magnitude is for, of the magnitude. The delay, and the one that the discrete is for, is the one that the phase is for, and the one that the frequency is for, of the one that the linear is for. The delay, and the one that the sample is for, is the one that the system is for, and the one that the design is for.
:::
:::

The DTFT is the one that the z is for, at the unit circle, and the one that the frequency is for. The z is the one that the complex is for, over the plane, and the one that the transient is for. The two, and the one that the transform is for, are the frequency and the stability, and the one that the response is for.

::: warning The ROC, and the sided {#warn-roc3}
The ROC, and the one that the z domain is for, does not include the pole, and the one that the z domain is for. The pole, and the one that the z domain is for, is the boundary, and the one that the ROC is for. The ROC, outside the outer pole, and the one that the z domain is for, is the one that the sequence is the right sided is for. The ROC, inside the inner pole, and the one that the z domain is for, is the one that the sequence is the left sided is for. The same pole and zero, and the one that the z domain is for, with the different, and the one that the ROC is for, of the ROC is the one that the different, and the one that the sequence is for, is for. The ROC, and the one that the convergence is for, determines the sidedness, and the one that the sequence is for.
:::

::: widget plot
f: 1/sqrt(1+x*x)
x: -1.5 1.5
y: 0 2
sliders:
labels: [[1, "unit circle", 1, 0], [2, "pole", 0.5, 0]]
caption: The H(z) in the complex z plane. The pole is the one that the singularity is for, of the rational. The unit circle is the one that the frequency is for. The ROC is the one that the region is for, where the sequence is the one that the transform is for, is for. The stability is the one that the pole is for, inside the unit circle, and the one that the z domain is for.
:::

::: quiz
The pole is outside the unit circle, and the one that the radius is for. Is the discrete system stable?
- [x] No, and the one that the unstable is for
- [ ] Yes, and the one that the stable is for
- [ ] The marginal, and the one that the oscillation is for
- [ ] The condition, and the one that the frequency is for
::: solution
The pole, and the one that the z domain is for, outside the unit circle, and the one that the radius is for, is when the ROC, and the one that the convergence is for, does not include the unit circle, and the one that the z domain is for. So the discrete system, and the one that the sequence is for, is the unstable, and the one that the behaviour is for. The transient, and the one that the response is for, grows, and the one that the sample is for. A stable discrete system, and the one that the z domain is for, has the pole inside the unit circle, and the one that the radius is for.
:::
:::

## Where this leads

With the z, and the one that the discrete is for, and the pole and zero and the ROC and the property and the response, in hand, you have the full z, and the one that the sequence is for. The method, and the check, are the one for the pole and zero, and the one that is new is the z, and the one that the discrete is for. With this lesson, the signals and systems course, and the one that the time and the frequency is for, and the transform, and the pole and zero and the stability and the response and the design and the check, are the ones that the circuit and the control and the communication and the digital is for, is complete.

::: history
The z, and the one that the discrete is for, is the one that the digital and the control is for. The pole and zero, and the one that the z domain is for, is the one that the stability and the transient is for. The ROC, and the one that the convergence is for, is the one that the stability is for. The method, the one that the z is for, is the one that the discrete is for, and the one that the pole and zero is for.
:::

::: summary
- The z-transform generalises the DTFT to the complex z.
- The pole gives the mode of the transient response. The zero shapes the frequency.
- The decay a to the n transforms to 1/(1-a z to the negative 1), pole at a.
- The step transforms to z/(z-1), pole at 1.
- The ROC is the region where the sum converges.
- The discrete system is stable when the ROC includes the unit circle.
- The stable pole is inside the unit circle.
- The response in the z is the product of the input transform and the system function.
- The DTFT is the z on the unit circle.
- The Laplace is to the z as the Fourier is to the DTFT.
:::

## Exercises

::: exercise The pole {level=1 check="a"}
The pair one over one minus a z to the negative one. Where is the pole?
::: solution
The pole, and the one that the z domain is for, of the one over one minus a z to the negative one, and the one that the pair is for, is at the z, and the one that the z domain is for, equal to the a, and the one that the decay is for. The pole, and the one that the z domain is for, is at the one that the radius is for, of the a, and the one that the decay is for.
:::
:::

::: exercise The stability {level=1}
The pole is inside the unit circle. Is the discrete system stable?
::: solution
The pole, and the one that the z domain is for, inside the unit circle, and the one that the radius is for, is when the ROC, and the one that the convergence is for, includes the unit circle, and the one that the z domain is for. So the discrete system, and the one that the sequence is for, is the stable, and the one that the behaviour is for. The transient, and the one that the response is for, decays, and the one that the sample is for.
:::
:::

::: exercise The step {level=1 check="z/(z-1)"}
The transform of the step. What is it?
::: solution
The transform of the step, and the one that the sequence is for, is the z over the z minus the one, and the one that the z domain is for. The pole, and the one that the z domain is for, is at the one, and the one that the origin is for, on the unit circle, and the one that the radius is for. The step, and the one that the sequence is for, has the pole, and the one that the z domain is for, on the unit circle, and the one that the one is for.
:::
:::

::: exercise The transient {level=2}
The pole is at the zero point, and the one that the radius is for, of the unit circle. What is the transient, and the one that the response is for, of the system, and the one that the discrete is for?
::: hint
Inside the unit circle decays.
:::
::: solution
The pole, and the one that the z domain is for, at the zero point of the radius, and the one that the unit circle is for, is inside the unit circle, and the one that the z domain is for. The transient, and the one that the response is for, decays, and the one that the exponential is for, of the zero point to the n, and the one that the sample is for. The system, and the one that the discrete is for, is the stable, and the one that the behaviour is for. The magnitude, and the one that the pole is for, gives the decay, and the one that the rate is for.
:::
:::

::: exercise The unit circle {level=2}
Explain, the relation, between the z, and the one that the discrete is for, and the DTFT, and the one that the frequency is for.
::: hint
The DTFT is the z on the unit circle.
:::
::: solution
The DTFT, and the one that the sequence is for, is the one that the z is for, at the z, and the one that the unit circle is for, equal to the e, and the one that the frequency is for, to the j and the omega, and the one that the frequency is for, and the one that the z domain is for. The DTFT, and the one that the frequency is for, is the z, and the one that the transform is for, on the unit circle, and the one that the radius is for, of the plane of the z, and the one that the complex is for. The two, and the one that the transform is for, are the z and the DTFT, and the one that the response is for.
:::
:::

::: exercise The response {level=2}
The response of the discrete LTI. How is it found, and the one that the input is for?
::: hint
The product of the input transform and the system function.
:::
::: solution
The response, and the one that the discrete LTI is for, in the z, and the one that the domain is for, is the product, and the one that the z is for, of the transform, and the one that the input is for, and the system function, and the one that the system is for. The product, and the one that the z is for, is the one that the convolution is for, in the sample, and the one that the sequence is for. The response, and the one that the discrete is for, is the one that the design is for.
:::
:::

::: exercise The Laplace, and the z {level=3}
Explain, the relation, between the Laplace, and the one that the s is for, and the z, and the one that the discrete is for.
::: hint
The sampling of the s.
:::
::: solution
The z, and the one that the discrete is for, is the one that the sampling is for, of the Laplace, and the one that the s is for. The plane of the s, and the one that the continuous is for, maps to the plane of the z, and the one that the discrete is for. The left half, and the one that the s domain is for, of the plane of the s, and the one that the stable is for, maps to the inside, and the one that the unit circle is for, of the plane of the z, and the one that the stable is for. The continuous, and the one that the s is for, is the one that the stable is for, and the one that the s domain is for. The discrete, and the one that the z is for, is the one that the stable is for, and the one that the z domain is for. The two, and the one that the transform is for, are the s and the z, and the one that the response is for.
:::
:::

::: exercise The ROC, and the sided {level=3}
Explain, the relation, between the ROC, of the z, and the one that the convergence is for, and the sidedness, of the sequence, and the one that the sample is for.
::: hint
Outside the outer pole is the right sided.
:::
::: solution
The ROC, and the one that the z domain is for, outside the outer pole, and the one that the z domain is for, is the one that the sequence is the right sided is for. The ROC, and the one that the z domain is for, inside the inner pole, and the one that the z domain is for, is the one that the sequence is the left sided is for. The same pole and zero, and the one that the z domain is for, with the different, and the one that the ROC is for, of the ROC is the one that the different, and the one that the sequence is for, is for. The ROC, and the one that the convergence is for, determines the sidedness, and the one that the sequence is for, of the sequence.
:::
:::
