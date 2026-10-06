The aperiodic signal, and the one that the time is for, is the one that the spectrum is for. The Fourier transform, and the one that the aperiodic is for, is the one that the continuum is for, and the one that the frequency is for. The aperiodic signal, and the one that the time is for, is decomposed, and the one that the frequency is for, into the spectrum, and the one that the continuum is for. This lesson defines the Fourier transform, and the one that the aperiodic is for, and gives the pair, and the one that the transform is for, and the property, and the one that the transform is for. The method, and the check, are the one for the pair, and the one that is new is the transform, and the one that the aperiodic is for. The Fourier transform, and the one that the aperiodic is for, is the one that the spectrum, and the filter, and the response, is for.

## The transform and the pair

The aperiodic signal, and the one that the time is for, is the one that the spectrum is for, and the one that the frequency is for. The transform, and the one that the aperiodic is for, is the one that the frequency is for, of the signal, and the one that the time is for.

::: definition Fourier transform {#def-ft}
The **Fourier transform** of the signal, and the one that the time is for, is
$$
X(\omega) = \int_{-\infty}^{\infty} x(t)\, e^{-j\omega t}\, \mathrm dt,
$$
and the one that the transform is for, and the one that the frequency is for. The inverse, and the one that the time is for, is
$$
x(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} X(\omega)\, e^{j\omega t}\, \mathrm d\omega,
$$
and the one that the inverse is for, and the one that the time is for. The transform, and the one that the aperiodic is for, is the one that the continuum is for, and the one that the frequency is for. The pair, and the one that the transform is for, is the one that the time and the frequency is for.
:::

The transform, and the one that the aperiodic is for, is the one that the projection is for, on the sinusoid, and the one that the frequency is for. The inverse, and the one that the time is for, is the one that the synthesis is for. The two, and the one that the Fourier is for, are the analysis and the synthesis, and the one that the transform is for.

::: proposition The transform pair, and the property {#prop-ft}
The pair, and the one that the transform is for, is the one that the time and the frequency is for. The exponential, and the one that the decay is for,
$$
e^{-a t}u(t) \;\longleftrightarrow\; \frac{1}{a + j\omega},
$$
and the one that the pair is for. The rectangular pulse, and the one that the width is for,
$$
\text{rect}\left(\frac{t}{W}\right) \;\longleftrightarrow\; W\,\mathrm{sinc}\left(\frac{\omega W/2}{\pi}\right),
$$
and the one that the sinc is for, and the one that the zero is for, at
$$
\omega = \frac{2\pi}{W},
$$
and the one that the zero is for. The Gaussian, and the one that the transform is for, is the one that the Gaussian is for, and the one that the self is for. The delta, and the one that the impulse is for, is the one that the one is for. The property, and the one that the transform is for, is the one that the linearity is for, and the one that the shift is for, and the one that the modulation is for, and the one that the convolution is for.
:::

The property, and the one that the transform is for, is the one that the algebra is for. The linearity, and the one that the transform is for, is the one that the sum is for. The shift, and the one that the time is for, is the one that the modulation is for. The modulation, and the one that the frequency is for, is the one that the shift is for. The convolution, and the one that the time is for, is the one that the product is for, in the transform, and the one that the frequency is for.

## The spectrum and the magnitude

The transform, and the one that the aperiodic is for, is the one that the magnitude is for, and the one that the phase is for. The magnitude, and the one that the spectrum is for, is the one that the amplitude is for, and the one that the frequency is for. The phase, and the one that the spectrum is for, is the one that the delay is for, and the one that the frequency is for.

::: proposition The magnitude, and the phase {#prop-mag}
The transform, and the one that the aperiodic is for, is the one that the magnitude is for, and the phase, and the one that the frequency is for, is
$$
X(\omega) = |X(\omega)|\, e^{j\phi(\omega)},
$$
and the one that the magnitude and the phase is for. The magnitude, and the one that the spectrum is for, is the one that the amplitude is for. The phase, and the one that the spectrum is for, is the one that the delay is for. The magnitude, and the one that the even is for, is the one that the real is for, and the one that the frequency is for. The phase, and the one that the odd is for, is the one that the imaginary is for, and the one that the frequency is for. The spectrum, and the one that the aperiodic is for, is the one that the response is for, and the one that the design is for.
:::

::: example The exponential, and the transform {#ex-exp}
The signal is the exponential, and the one that the aperiodic is for. What is the transform, and the one that the spectrum is for?
::: solution
The transform, and the one that the aperiodic is for, of the exponential, and the one that the decay is for, is the one over the a, and the one that the decay is for, plus the j, and the one that the omega is for. The magnitude, and the one that the spectrum is for, is the one over the square root of the square of the a, and the one that the value is for, plus the square of the omega, and the one that the frequency is for. The transform, and the one that the aperiodic is for, is the one that the pole is for, and the one that the later lesson is for.
:::
:::

::: example The pulse, and the sinc {#ex-pulse}
The signal is the rectangular pulse, and the one that the aperiodic is for. What is the transform, and the one that the spectrum is for?
::: solution
The transform, and the one that the aperiodic is for, of the pulse, and the one that the width is for, is the W, and the one that the width is for, times the sinc, and the one that the frequency is for. The zero, and the one that the spectrum is for, of the sinc, and the one that the zero is for, is the two pi over the W, and the one that the width is for. The width, and the one that the time is for, of the pulse, and the one that the aperiodic is for, is inversely, and the one that the relation is for, to the width, and the one that the spectrum is for, of the transform, and the one that the frequency is for. The narrow pulse is the wide spectrum, and the one that the frequency is for.
:::
:::

## The bandwidth and the response

The transform, and the one that the aperiodic is for, is the one that the bandwidth is for, and the one that the frequency is for. The bandwidth, and the one that the signal is for, is the one that the frequency is for. The response, and the one that the LTI is for, is the one that the response is for, and the one that the frequency is for.

::: proposition The bandwidth, and the response {#prop-band}
The **bandwidth** of the signal, and the one that the aperiodic is for, is the range, and the one that the frequency is for, of the frequency, and the one that the spectrum is for, that the transform, and the one that the aperiodic is for, is the non-zero, and the one that the amplitude is for. The **response** of the LTI, and the one that the system is for, is the transform, and the one that the impulse is for, of the impulse response, and the one that the system is for. The response, and the one that the LTI is for, is the one that the response is for, and the one that the frequency is for. The response, and the one that the LTI is for, is the transfer function, and the one that the s is for, and the one that the later lesson is for, at the frequency, and the one that the response is for.
:::

::: example The response, and the filter {#ex-resp}
The system is the low pass, and the one that the LTI is for. What is the response, and the one that the frequency is for?
::: solution
The response, and the one that the LTI is for, of the low pass, and the one that the frequency is for, is the magnitude, and the one that the spectrum is for, that decreases, and the one that the frequency is for, as the frequency, and the one that the signal is for, grows. The magnitude, and the one that the low is for, is the one, and the one that the pass is for. The magnitude, and the one that the high is for, is the zero, and the one that the stop is for. The response, and the one that the LTI is for, is the transfer function, and the one that the s is for, and the one that the frequency is for, and the one that the later lesson is for.
:::
:::

::: example The cosine, and the delta {#ex-cosine}
The signal is the cosine, and the one that the frequency is for. What is the transform, and the one that the spectrum is for?
::: solution
The cosine, and the one that the frequency is for, is the one that the two delta is for, at the positive, and the one that the frequency is for, and the negative, and the one that the frequency is for, of the frequency, and the one that the signal is for. The transform of the cosine, and the one that the aperiodic is for, is the pi, and the one that the constant is for, times the delta at the omega, and the one that the zero is for, plus the pi, and the one that the constant is for, times the delta at the negative omega, and the one that the zero is for. The cosine, and the one that the frequency is for, is the line in the spectrum, and the one that the spectrum is for, at the positive and the negative, and the one that the frequency is for. A periodic signal is the line, and the one that the spectrum is for, and the one that the discrete is for, and the one that the Fourier series is for.
:::
:::

The transform, and the one that the aperiodic is for, is the one that the analysis is for. The transform, and the one that the aperiodic is for, is the one that the design is for, and the one that the frequency is for. The two, the analysis and the design, and the one that the transform is for, are the one that the frequency is for, and the one that the spectrum is for.

::: warning The convergence, and the condition {#warn-abs}
The transform, and the one that the aperiodic is for, exists, and the one that the frequency is for, when the signal, and the one that the time is for, is the absolutely integrable, and the one that the condition is for,
$$
\int_{-\infty}^{\infty} |x(t)| \, \mathrm dt < \infty,
$$
and the one that the condition is for. If the signal, and the one that the time is for, is not the absolutely integrable, and the one that the condition is for, is when the transform, and the one that the aperiodic is for, is the one that the distribution is for, and the one that the delta is for. The delta, and the one that the impulse is for, is the one that the not the integrable is for, but the transform, and the one that the frequency is for, is the one, and the one that the transform is for. The convergence, and the one that the transform is for, is the one that the condition is for.
:::

::: widget plot
f: 1/sqrt(1+x*x)
x: -3 3
y: 0 1
sliders:
caption: The magnitude of the transform of the exponential, and the one that the aperiodic is for, against the frequency. The magnitude, and the one that the spectrum is for, is the one over the square root of the one plus the square of the frequency, and the one that the decay is for. The transform, and the one that the aperiodic is for, is the one that the response is for, and the one that the design is for.
:::

::: quiz
The transform of the delta, and the one that the impulse is for. What is it?
- [x] The one, in all the frequency
- [ ] The zero, in all the frequency
- [ ] The frequency, and the one that the omega is for
- [ ] The one over the frequency
::: solution
The transform of the delta, and the one that the impulse is for, is the one, and the one that the transform is for, in all the frequency, and the one that the omega is for. The delta, and the one that the impulse is for, is the identity, and the one that the convolution is for. The one, and the one that the transform is for, is the identity, and the one that the product is for. So the transform of the delta is the one, and the one that the frequency is for.
:::
:::

## Where this leads

With the Fourier transform, and the one that the aperiodic is for, and the pair, and the property, and the spectrum and the response, in hand, you have the full Fourier transform, and the one that the aperiodic is for. The method, and the check, are the one for the pair, and the one that is new is the transform, and the one that the aperiodic is for. In the next lesson, you meet the discrete time Fourier, and the one that the sequence is for, and the one that the frequency is for, and the same algebra, and the transform and the check, are the ones you already have.

::: history
The Fourier transform, and the one that the aperiodic is for, is the one that the spectrum is for. The pair, and the one that the transform is for, is the one that the time and the frequency is for. The spectrum, and the one that the aperiodic is for, is the one that the response is for. The method, the one that the transform is for, is the one that the aperiodic is for, and the one that the frequency is for.
:::

::: summary
- The Fourier transform is the spectrum of the aperiodic signal, and the one that the continuum is for.
- The transform pair is the one that the time and the frequency is for.
- The exponential transforms to the one over the a plus the j omega, and the one that the decay is for.
- The pulse transforms to the sinc, with the zero at the two pi over the width.
- The Gaussian is the one that the self is for, and the one that the transform is for.
- The delta transforms to the one, and the one that the impulse is for.
- The magnitude is the even, and the phase is the odd, and the one that the spectrum is for.
- The response of the LTI is the transform of the impulse response.
- The narrow pulse is the wide spectrum, and the one that the frequency is for.
:::

## Exercises

::: exercise The exponential {level=1 check="1/(a+jw)"}
The transform of the exponential, and the one that the decay is for. What is it?
::: solution
The transform of the exponential, and the one that the aperiodic is for, is the one over the a plus the j, and the one that the omega is for. The magnitude, and the one that the spectrum is for, is the one over the square root of the square of the a plus the square of the omega, and the one that the decay is for.
:::
:::

::: exercise The delta {level=1}
The transform of the delta, and the one that the impulse is for. What is it?
::: solution
The transform of the delta, and the one that the impulse is for, is the one, and the one that the transform is for, in all the frequency, and the one that the omega is for. The delta is the identity of the convolution, and the one that the property is for. The one is the identity of the product, and the one that the transform is for.
:::
:::

::: exercise The pulse {level=1 check="2pi/W"}
The pulse has the width W. Where is the first zero, and the one that the spectrum is for, of the transform?
::: hint
The zero of the sinc.
:::
::: solution
The transform of the pulse, and the one that the aperiodic is for, is the W times the sinc, and the one that the frequency is for. The first zero, and the one that the spectrum is for, of the sinc, and the one that the zero is for, is the two pi over the W, and the one that the width is for. The width of the pulse, and the one that the time is for, is inversely to the width of the spectrum, and the one that the frequency is for.
:::
:::

::: exercise The magnitude {level=2}
The transform is the X, and the one that the complex is for. How is it decomposed, and the one that the magnitude is for?
::: hint
Magnitude and phase.
:::
::: solution
The transform, and the one that the aperiodic is for, is decomposed, and the one that the magnitude is for, in the magnitude, and the one that the amplitude is for, and the phase, and the one that the delay is for. The magnitude, and the one that the spectrum is for, is the even, and the one that the frequency is for, of the frequency. The phase, and the one that the spectrum is for, is the odd, and the one that the frequency is for, of the frequency. The two, and the one that the transform is for, are the magnitude and the phase.
:::
:::

::: exercise The property {level=2}
The convolution in the time, and the one that the signal is for. What is it in the transform, and the one that the frequency is for?
::: hint
The product.
:::
::: solution
The convolution in the time, and the one that the signal is for, is the product in the transform, and the one that the frequency is for. The product in the time, and the one that the signal is for, is the convolution in the transform, and the one that the frequency is for, with the scale, and the one that the one is for. The two, and the one that the transform is for, are the convolution and the product.
:::
:::

::: exercise The bandwidth {level=3}
Explain, the relation, between the width, and the one that the time is for, of the signal, and the bandwidth, and the one that the frequency is for, of the spectrum.
::: hint
Narrow time is wide frequency.
:::
::: solution
The width of the signal, and the one that the time is for, is inversely, and the one that the relation is for, to the bandwidth, and the one that the frequency is for, of the spectrum. The narrow, and the one that the time is for, signal is the wide, and the one that the frequency is for, spectrum. The wide, and the one that the time is for, signal is the narrow, and the one that the frequency is for, spectrum. The two, and the one that the Fourier is for, are the time and the frequency, and the one that the transform is for.
:::
:::

::: exercise The condition {level=3}
Explain, why the delta, and the one that the impulse is for, is not the absolutely integrable, and the one that the condition is for, but has the transform, and the one that the frequency is for.
::: hint
The distribution.
:::
::: solution
The delta, and the one that the impulse is for, is not the absolutely integrable, and the one that the condition is for, of the integral, and the one that the time is for. But the delta, and the one that the impulse is for, is the one that the distribution is for, and the one that the transform is for. The transform of the delta, and the one that the frequency is for, is the one, and the one that the transform is for. The delta, and the one that the impulse is for, is treated in the distribution, and the one that the transform is for, and the one that the property is for.
:::
:::

::: exercise The modulation {level=3}
Explain, the property of the modulation, and the one that the transform is for.
::: hint
The shift of the frequency.
:::
::: solution
The modulation, and the one that the frequency is for, in the time, and the one that the signal is for, is the shift, and the one that the frequency is for, in the spectrum, and the one that the transform is for. The modulation by the cosine, and the one that the frequency is for, splits, and the one that the frequency is for, the spectrum to the two, and the one that the side is for. The modulation, and the one that the transform is for, is the one that the shift is for, and the one that the frequency is for. This is the one that the communication is for, and the one that the modulation is for.
:::
:::
