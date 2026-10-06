The aperiodic signal, and the one that the time is for, is the one that the transform is for, and the one that the pole is for. The Laplace transform, and the one that the s is for, generalises the Fourier, and the one that the transform is for, to the pole, and the one that the transient is for, and the one that the stability is for. The signal, and the one that the time is for, is transformed, and the one that the s is for, to the rational, and the one that the function is for, and the one that the pole and zero is for. This lesson defines the Laplace, and the one that the s is for, and gives the pole and zero, and the one that the stability is for, and the region, and the one that the convergence is for, and the property, and the one that the time is for. The method, and the check, are the one for the pole and the zero, and the one that is new is the Laplace, and the one that the s is for. The Laplace, and the one that the s is for, is the one that the stability, and the transient, and the response, and the circuit and the control, is for.

## The Laplace and the pole

The Laplace, and the one that the s is for, is the one that the transform is for, of the signal, and the one that the time is for. The pole, and the one that the s domain is for, is the one that the behaviour is for, and the one that the transient is for.

::: definition Laplace transform {#def-lap}
The **Laplace transform** of the signal, and the one that the time is for, is
$$
X(s) = \int_{0^-}^{\infty} x(t)\, e^{-s t}\, \mathrm dt, \qquad s = \sigma + j\omega,
$$
and the one that the transform is for, and the one that the s is for. The $s$ is the **complex frequency**, and the one that the s domain is for. The **pole** of the $X$, and the one that the s domain is for, is the one that the value of the s is for, and the one that the pole is for, at which the $X$ is the infinite, and the one that the pole is for. The **zero** of the $X$, and the one that the s domain is for, is the one that the value of the s is for, and the one that the zero is for, at which the $X$ is the zero, and the one that the zero is for. The Laplace, and the one that the s is for, is the one that the Fourier is for, with the s, and the one that the complex is for, at the j, and the one that the omega is for.
:::

The pole, and the one that the s domain is for, is the one that the transient is for. The pole, and the one that the behaviour is for, gives the mode, and the one that the response is for, of the signal, and the one that the time is for. The zero, and the one that the s domain is for, is the one that the frequency is for, and the one that the shape is for. The two, and the one that the s domain is for, are the pole and the zero, and the one that the transfer function is for.

::: proposition The pair, and the pole {#prop-pole}
The pair, and the one that the Laplace is for, is the one that the time and the s is for. The exponential decay, and the one that the time is for,
$$
e^{-a t}u(t) \;\;\longleftrightarrow\;\; \frac{1}{s+a},
$$
and the one that the pair is for, with the pole, and the one that the s domain is for, at the negative a, and the one that the negative is for. The step, and the one that the time is for,
$$
u(t) \;\;\longleftrightarrow\;\; \frac{1}{s},
$$
and the one that the pole is for, is at the origin, and the one that the s domain is for. The sin, and the one that the time is for,
$$
\sin(\omega_0 t)\,u(t) \;\;\longleftrightarrow\;\; \frac{\omega_0}{s^2 + \omega_0^2},
$$
and the one that the pole is for, is at the j, and the one that the omega is for. The pole, and the one that the s domain is for, is the one that the mode is for, of the response, and the one that the transient is for.
:::

The pole, and the one that the s domain is for, gives the natural mode, and the one that the response is for, of the system, and the one that the LTI is for. The zero, and the one that the s domain is for, shapes the frequency, and the one that the response is for. The two, and the one that the transform is for, are the pole and the zero, and the one that the transfer function is for.

## The ROC and the stability

The Laplace, and the one that the s is for, is the one that the ROC is for, and the one that the convergence is for. The stability, and the one that the s domain is for, is the one that the ROC is for.

::: proposition The ROC, and the stability {#prop-roc}
The **ROC** (region of convergence) is the one that the range is for, in the plane of the s, and the one that the complex is for, where the Laplace integral, and the one that the s is for, converges, and the one that the one is for. The ROC, and the one that the s domain is for, is the one that the half plane is for, to the right, or the left, of the vertical line, and the one that the real is for. The system is **stable** (BIBO) when the ROC, and the one that the convergence is for, includes the imaginary axis, and the one that the s domain is for. The stability, and the one that the s domain is for, is the one that the pole is for, and the one that the stability is for.
:::

The ROC, and the one that the s domain is for, is the one that the convergence is for. The stability, and the one that the s domain is for, is the one that the ROC is for. The pole, and the one that the s domain is for, is the one that the boundary is for, of the ROC, and the one that the convergence is for. The two, and the one that the s domain is for, are the pole and the ROC, and the one that the stability is for.

::: example The pole, and the stability {#ex-stab}
The transfer function, and the one that the s is for, has the pole, and the one that the s domain is for. Is the system stable, and the one that the behaviour is for?
::: solution
The stability, and the one that the s domain is for, is the one that the pole is for. The pole, and the one that the left is for, of the plane of the s, and the one that the negative is for, is on the real part, and the one that the negative is for, is when the system is stable, and the one that the s domain is for. The pole, and the one that the right is for, of the plane of the s, and the one that the positive is for, is when the system is unstable, and the one that the s domain is for. The stability, and the one that the s domain is for, is the one that the pole is for, and the one that the s domain is for.
:::
:::

::: example The pair, and the transient {#ex-trans}
The pole, in the plane of the s. What is the transient of the signal, and the one that the time is for, of the response, and the one that the system is for?
::: solution
The pole, and the one that the s domain is for, gives the mode, and the one that the transient is for, of the response, and the one that the time is for. The real, and the one that the negative is for, pole gives the decay, and the one that the exponential is for, of the transient, and the one that the time is for. The real, and the one that the positive is for, pole gives the grow, and the one that the exponential is for, of the transient, and the one that the time is for. The complex, and the one that the pair is for, pole gives the oscillation, and the one that the damped is for, of the transient, and the one that the time is for. The real part, and the one that the pole is for, gives the decay, and the one that the rate is for. The imaginary part, and the one that the pole is for, gives the frequency, and the one that the oscillation is for.
:::
:::

## The property and the response

The Laplace, and the one that the s is for, has the property, and the one that the time is for. The response, and the one that the LTI is for, is the one that the Laplace is for, of the input, and the one that the signal is for, and the transfer function, and the one that the s is for, is for.

::: proposition The property, and the response {#prop-prop}
The property, and the one that the Laplace is for, is the one that the time and the s is for. The delay, and the one that the time is for, is
$$
x(t-t_0)u(t-t_0) \;\;\longleftrightarrow\;\; e^{-s t_0}X(s),
$$
and the one that the delay is for. The differentiation, and the one that the time is for, is
$$
\frac{\mathrm d x}{\mathrm dt} \;\;\longleftrightarrow\;\; sX(s) - x(0^-),
$$
and the one that the differentiation is for. The convolution, and the one that the time is for, is the product, and the one that the s is for. The response of the LTI, and the one that the system is for, is the product, and the one that the s is for, of the transform, and the one that the input is for, and the transfer function, and the one that the system is for,
$$
Y(s) = H(s)\,X(s),
$$
and the one that the response is for. The transfer function, and the one that the LTI is for, is the one that the pole and zero is for.
:::

The response, and the one that the LTI is for, in the s, and the one that the domain is for, has the partial fraction, and the one that the pole is for. The partial fraction, and the one that the response is for, separates the natural, and the one that the transient is for, and the forced, and the one that the steady is for, of the response, and the one that the time is for. The natural, and the one that the transient is for, is the one that the pole of the transfer function, and the one that the system is for, is for. The forced, and the one that the steady is for, is the one that the pole of the input, and the one that the signal is for, is for.

::: example The response, and the partial {#ex-partial}
The input is the step, and the one that the signal is for. The system has the pole, and the one that the s domain is for. What is the response, and the one that the time is for?
::: solution
The response, and the one that the LTI is for, is the product, and the one that the s is for, of the transform of the input, and the one that the step is for, and the transfer function, and the one that the system is for. The step, and the one that the signal is for, is the one over the s, and the one that the s domain is for. The partial fraction, and the one that the response is for, separates the term, and the one that the pole is for. The inverse, and the one that the time is for, gives the response, and the one that the time is for, is the transient, and the one that the exponential is for, decaying, and the one that the pole is for. The response, and the one that the LTI is for, is the one that the stable is for, if the pole is on the left, and the one that the s domain is for.
:::
:::

::: example The second order, and the pole {#ex-2nd}
The transfer function is the standard second order, and the one that the system is for. What are the pole, and the one that the transient is for, of the response, and the one that the system is for?
::: solution
The standard second order, and the one that the transfer function is for, has the pole, and the one that the s domain is for, at the negative zeta and the omega n, plus or minus the j, and the one that the omega is for, times the omega n, and the square root of one minus the square of the zeta, and the one that the damping is for. The real part, and the one that the pole is for, is the negative zeta and the omega n, and the one that the decay is for. The imaginary part, and the one that the pole is for, is the omega n, and the one that the omega is for, times the square root of one minus the square of the zeta, and the one that the damping is for. The transient, and the one that the response is for, is the underdamped, and the one that the oscillation is for, when the zeta, and the one that the damping is for, is less than one, and the one that the zeta is for. The pole, and the one that the s domain is for, gives the settling, and the one that the decay is for, and the overshoot, and the one that the transient is for. The design, and the one that the zeta is for, chooses the zeta and the omega n, and the one that the specification is for.
:::
:::

The Fourier is the one that the s is for, at the j and the omega, and the one that the steady is for. The Laplace is the one that the s is for, over the plane, and the one that the transient is for. The Laplace has the ROC, and the one that the convergence is for. The two, and the one that the transform is for, are the steady and the transient, and the one that the response is for.

::: warning The ROC, and the pole {#warn-roc2}
The ROC, and the one that the s domain is for, does not include the pole, and the one that the s domain is for. The pole, and the one that the s domain is for, is the boundary, and the one that the ROC is for. The stability, and the one that the s domain is for, is the one that the ROC is for, includes the imaginary axis, and the one that the s domain is for. If the ROC, and the one that the convergence is for, is to the right of the pole, and the one that the s domain is for, is when the signal is the one that the right sided is for. If the ROC, and the one that the convergence is for, is to the left of the pole, and the one that the s domain is for, is when the signal is the one that the left sided is for. The same pole and zero, and the one that the s domain is for, with the different, and the one that the ROC is for, of the ROC is the one that the different, and the one that the signal is for, is for.
:::

::: widget plot
f: 1/sqrt(1+(x-0.5)^2)
x: -2 3
y: 0 2
sliders:
labels: [[1, "pole", 0.5, 1]]
caption: The transfer function in the plane of the s. The pole is the one that the singularity is for, of the rational. The zero is the one that the numerator is for. The ROC is the one that the convergence is for. The stability is the one that the pole is for, on the left, and the one that the s domain is for.
:::

::: quiz
The pole is on the right of the plane of the s, and the one that the positive is for. Is the system stable?
- [x] No, and the one that the unstable is for
- [ ] Yes, and the one that the stable is for
- [ ] The marginal, and the one that the oscillation is for
- [ ] The condition, and the one that the frequency is for
::: solution
The pole, and the one that the right is for, of the plane of the s, and the one that the positive is for, is when the ROC, and the one that the convergence is for, does not include the imaginary axis, and the one that the s domain is for. So the system, and the one that the LTI is for, is the unstable, and the one that the behaviour is for. The transient, and the one that the response is for, grows, and the one that the exponential is for. A stable system, and the one that the s domain is for, has the pole on the left, and the one that the negative is for, of the plane of the s.
:::
:::

## Where this leads

With the Laplace, and the one that the s is for, and the pole and zero and the ROC and the property and the response, in hand, you have the full Laplace, and the one that the s is for. The method, and the check, are the one for the pole and zero, and the one that is new is the Laplace, and the one that the s is for. In the next lesson, you meet the z, and the one that the discrete is for, and the one that the sample is for, and the same algebra, and the pole and the response and the design and the check, are the ones you already have.

::: history
The Laplace, and the one that the s is for, is the one that the circuit and the control is for. The pole and the zero, and the one that the s domain is for, is the one that the stability and the transient is for. The ROC, and the one that the convergence is for, is the one that the stability is for. The method, the one that the Laplace is for, is the one that the s domain is for, and the one that the pole and zero is for.
:::

::: summary
- The Laplace transform generalises the Fourier to the complex frequency s.
- The pole gives the mode of the transient response, the zero shapes the frequency.
- The exponential decay transforms to 1/(s+a), pole at -a.
- The ROC is the region where the integral converges.
- The system is stable when the ROC includes the imaginary axis.
- The stable pole is on the left of the plane of the s.
- The response in the s is the product of the input transform and the transfer function.
- The partial fraction separates the natural (pole) and the forced (input pole).
- The Fourier is the Laplace at s = j omega.
:::

## Exercises

::: exercise The pole {level=1 check="-a"}
The pair 1/(s+a). Where is the pole?
::: solution
The pole, and the one that the s domain is for, of the one over the s plus a, and the one that the pair is for, is at the s, and the one that the negative is for, equal to the negative a, and the one that the s domain is for. The pole, and the one that the s domain is for, is on the negative real axis, and the one that the stability is for.
:::
:::

::: exercise The stability {level=1}
The pole is on the left of the plane of the s. Is the system stable?
::: solution
The pole, and the one that the left is for, of the plane of the s, and the one that the negative is for, is when the ROC, and the one that the convergence is for, includes the imaginary axis, and the one that the s domain is for. So the system, and the one that the LTI is for, is the stable, and the one that the behaviour is for. The transient, and the one that the response is for, decays, and the one that the time is for.
:::
:::

::: exercise The transient {level=1}
The complex pole, and the one that the pair is for. What is the mode, and the one that the transient is for?
::: solution
The complex, and the one that the pair is for, pole gives the oscillation, and the one that the damped is for, of the transient, and the one that the time is for. The real part, and the one that the pole is for, gives the decay, and the one that the rate is for. The imaginary part, and the one that the pole is for, gives the frequency, and the one that the oscillation is for. The transient, and the one that the response is for, is the damped, and the one that the oscillation is for, sinusoid, and the one that the time is for.
:::
:::

::: exercise The step, and the pole {level=2}
The step is the one over the s. Where is the pole, and the one that the s domain is for?
::: hint
At the origin.
:::
::: solution
The step, and the one that the time is for, is the one over the s, and the one that the s domain is for. The pole, and the one that the s domain is for, is at the origin, and the one that the s domain is for, that is the zero of the s, and the one that the negative is for. The step, and the one that the signal is for, has the pole, and the one that the s domain is for, at the origin, and the one that the imaginary is for.
:::
:::

::: exercise The response, and the product {level=2}
The response of the LTI in the s. How is it found, and the one that the input is for?
::: hint
The product of the input transform and the transfer function.
:::
::: solution
The response of the LTI, in the s, and the one that the domain is for, is the product, and the one that the s is for, of the transform, and the one that the input is for, and the transfer function, and the one that the LTI is for. The product, in the s, and the one that the response is for, is the one that the convolution is for, in the time, and the one that the signal is for. The response, and the one that the LTI is for, is the one that the design is for.
:::
:::

::: exercise The partial {level=2}
The response has the pole of the system, and the pole of the input. What does the partial fraction separate, and the one that the response is for?
::: hint
The natural and the forced.
:::
::: solution
The partial fraction, and the one that the response is for, separates the term, and the one that the pole is for. The term, and the one that the pole of the transfer function is for, is the natural, and the one that the transient is for, of the response, and the one that the system is for. The term, and the one that the pole of the input is for, is the forced, and the one that the steady is for, of the response, and the one that the input is for. The partial fraction, and the one that the response is for, separates the natural and the forced, and the one that the time is for.
:::
:::

::: exercise The ROC, and the sided {level=3}
Explain, the relation, between the ROC, and the one that the convergence is for, and the sidedness, and the one that the signal is for, of the signal.
::: hint
The right of the pole is the right sided.
:::
::: solution
The ROC, to the right of the pole, and the one that the s domain is for, is the one that the signal is the right sided is for. The ROC, to the left of the pole, and the one that the s domain is for, is the one that the signal is the left sided is for. The same pole and zero, and the one that the s domain is for, with the different, and the one that the ROC is for, of the ROC, is the one that the different, and the one that the signal is for, is for. The ROC, and the one that the convergence is for, determines the sidedness, and the one that the signal is for, of the signal.
:::
:::

::: exercise The Laplace, and the Fourier {level=3}
Explain, the relation, between the Laplace, and the one that the s is for, and the Fourier, and the one that the transform is for.
::: hint
The Fourier is the Laplace at s=jw.
:::
::: solution
The Fourier transform, and the one that the frequency is for, is the one that the Laplace is for, at the s, and the one that the negative is for, equal to the j, and the one that the omega is for, and the one that the frequency is for. The Laplace, and the one that the s is for, is the generalisation of the Fourier, and the one that the transform is for, to the plane, and the one that the s is for. The Fourier is the one that the imaginary axis is for, of the Laplace, and the one that the s domain is for. The two, and the one that the transform is for, are the Laplace and the Fourier, and the one that the response is for.
:::
:::
