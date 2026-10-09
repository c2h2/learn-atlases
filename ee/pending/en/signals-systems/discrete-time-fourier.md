The discrete signal, and the one that the sequence is for, is the one that the spectrum is for. The discrete time Fourier transform, and the one that the sequence is for, is the one that the frequency is for, and the one that the periodic is for. The sequence, and the one that the sample is for, is decomposed, and the one that the frequency is for, into the spectrum, and the one that the periodic is for. This lesson defines the DTFT, and the one that the sequence is for, and gives the pair, and the one that the transform is for, and the property, and the one that the transform is for. The method, and the check, are the one for the pair, and the one that is new is the DTFT, and the one that the sequence is for. The DTFT, and the one that the sequence is for, is the one that the spectrum, and the filter and the digital, is for.

## The DTFT and the pair

The sequence, and the one that the sample is for, is the one that the spectrum is for, and the one that the frequency is for. The transform, and the one that the sequence is for, is the one that the frequency is for, of the sequence, and the one that the sample is for.

::: definition DTFT {#def-dtft}
The **discrete time Fourier transform** of the sequence, and the one that the sample is for, is
$$
X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x[n]\, e^{-j\omega n},
$$
and the one that the transform is for, and the one that the frequency is for. The inverse, and the one that the sample is for, is
$$
x[n] = \frac{1}{2\pi}\int_{-\pi}^{\pi} X(e^{j\omega})\, e^{j\omega n}\, \mathrm d\omega,
$$
and the one that the inverse is for, and the one that the sample is for. The DTFT, and the one that the sequence is for, is the one that the periodic is for, and the one that the range is for, from the negative pi to the pi, and the one that the frequency is for. The DTFT, and the one that the sequence is for, is the one that the periodic is for, in the frequency, and the one that the omega is for.
:::

The DTFT, and the one that the sequence is for, is the one that the periodic is for. The range, and the one that the frequency is for, is from the negative pi to the pi, and the one that the omega is for. The two, the DTFT and the Fourier, and the one that the transform is for, are the discrete and the continuous, and the one that the signal is for. The DTFT is the one that the sample is for. The Fourier is the one that the continuous is for.

::: proposition The DTFT pair, and the property {#prop-dtft}
The pair, and the one that the DTFT is for, is the one that the sample and the frequency is for. The sequence, and the one that the decay is for,
$$
a^n u[n] \;\longleftrightarrow\; \frac{1}{1 - a e^{-j\omega}}, \qquad |a| < 1,
$$
and the one that the pair is for. The impulse, and the one that the sequence is for, is the one that the one is for, in all the frequency, and the one that the omega is for. The property, and the one that the DTFT is for, is the one that the linearity is for, and the one that the shift is for, and the one that the modulation is for, and the one that the convolution is for. The DTFT, and the one that the sequence is for, has the same, and the one that the property is for, as the Fourier, and the one that the transform is for.
:::

The property, and the one that the DTFT is for, is the one that the algebra is for. The convolution, and the one that the sample is for, is the one that the product is for, in the DTFT, and the one that the frequency is for. The product, and the one that the sample is for, is the one that the convolution is for, in the DTFT, and the one that the frequency is for. The two, and the one that the DTFT is for, are the convolution and the product.

## The pair and the magnitude

The sequence, and the one that the sample is for, has the magnitude, and the one that the spectrum is for, and the phase, and the one that the frequency is for. The magnitude, and the one that the DTFT is for, is the one that the even is for. The phase, and the one that the DTFT is for, is the one that the odd is for.

::: proposition The magnitude and the phase {#prop-mag2}
The DTFT, and the one that the sequence is for, is
$$
X(e^{j\omega}) = |X(e^{j\omega})|\, e^{j\phi(\omega)},
$$
and the one that the magnitude and the phase is for. The magnitude, and the one that the DTFT is for, is the one that the even is for, and the one that the frequency is for. The phase, and the one that the DTFT is for, is the one that the odd is for, and the one that the frequency is for. The magnitude, and the one that the spectrum is for, is the one that the response is for. The phase, and the one that the spectrum is for, is the one that the delay is for.
:::

::: example The sequence, and the pair {#ex-seq}
The sequence is the one that the decay is for, with the a, and the one that the value is for. What is the DTFT, and the one that the frequency is for?
::: solution
The DTFT of the sequence, and the one that the decay is for, is the one over the one, and the one that the one is for, minus the a, and the one that the decay is for, times the exponential, and the one that the frequency is for. The magnitude, and the one that the spectrum is for, is the one over the square root of the one, and the one that the one is for, plus the square of the a, and the one that the decay is for, minus the two, and the one that the a is for, times the cos, and the one that the omega is for. When the a is the half, and the one that the decay is for, is the magnitude, and the one that the zero is for, of the omega, the one over the half, and the two, and the one that the frequency is for. The DTFT, and the one that the sequence is for, is the one that the pole is for, and the one that the one is for.
:::
:::

::: example The cosine, and the line {#ex-cos2}
The sequence is the cosine, and the one that the frequency is for. What is the DTFT, and the one that the spectrum is for?
::: solution
The DTFT of the cosine, and the one that the frequency is for, is the one that the delta is for, at the positive, and the one that the frequency is for, and the negative, and the one that the frequency is for, of the frequency, and the one that the omega is for. The cosine, and the one that the sequence is for, is the line, and the one that the spectrum is for, in the frequency, and the one that the omega is for. A periodic, and the one that the sequence is for, is the line, and the one that the discrete is for, in the spectrum, and the one that the frequency is for.
:::
:::

## The periodicity and the range

The DTFT, and the one that the sequence is for, is the one that the periodic is for. The periodicity, and the one that the DTFT is for, is the two pi, and the one that the frequency is for. The range, and the one that the DTFT is for, is the one that the negative pi is for, to the pi, and the one that the omega is for.

::: proposition The periodicity, and the range {#prop-per2}
The DTFT, and the one that the sequence is for, is the periodic, and the one that the frequency is for, in the omega, and the one that the value is for, with the period, and the one that the range is for, of the
$$
2\pi,
$$
and the one that the periodicity is for. The range, and the one that the DTFT is for, that is not redundant, and the one that the frequency is for, is the one that the negative pi is for, to the positive pi, and the one that the omega is for. The frequency, and the one that the DTFT is for, is the **digital frequency**, and the one that the omega is for, and the one that the normalization is for, and the one that the sample is for. The omega, and the one that the digital is for, is the one that the omega is for, times the sample, and the one that the time is for.
:::

The periodicity, and the one that the DTFT is for, is the two pi, and the one that the frequency is for. The digital frequency, and the one that the normalize is for, is the one that the sample is for, and the one that the time is for. The range, and the one that the DTFT is for, is the one that the negative pi is for, to the pi. The two, and the one that the DTFT is for, are the periodicity and the range, and the one that the frequency is for.

::: example The alias, and the frequency {#ex-alias}
The sequence is sampled, and the one that the frequency is for. What is the digital frequency, and the one that the omega is for, of the sequence, and the one that the sample is for?
::: solution
The digital frequency, and the one that the omega is for, is the one that the analog frequency is for, times the sample, and the one that the time is for. The range of the digital frequency, and the one that the DTFT is for, is the negative pi to the pi, and the one that the omega is for. The frequency, and the one that the analog is for, beyond the pi, and the one that the omega is for, is the one that the alias is for, and the one that the frequency is for. The alias, and the one that the digital is for, is the one that the sample is for, and the one that the frequency is for.
:::
:::

::: example The length, and the DTFT, and the sinc {#ex-len}
The sequence is the length, and the one that the finite is for, at the one. What is the DTFT, and the one that the frequency is for?
::: solution
The DTFT of the length of the one, and the one that the finite is for, is the one that the Dirichlet kernel is for, and it is the sum from zero to the M, of the minus one, and the one that the frequency is for, times the omega, and the n, and the one that the sample is for. It is the magnitude, and the one that the peak is for, at the zero, and the one that the frequency is for, of the M plus one, and the one that the length is for. The zero of the DTFT, and the one that the frequency is for, is the one that the two pi is for, times the integer, and the one that the zero is for, over the M plus one, and the one that the length is for. The finite, and the one that the sequence is for, gives the Dirichlet, and the one that the kernel is for, which is the one that the continuous is for, is the sinc, and the one that the frequency is for. Two are the two, and the one that the sequence is for, and the one that the continuous is for.
:::
:::

The DTFT, and the one that the sequence is for, is the one that the response is for. The response, and the one that the discrete LTI is for, is the DTFT, and the one that the sequence is for, of the impulse response, and the one that the sequence is for. The response, and the one that the digital is for, is the one that the design is for, and the one that the frequency is for.

::: warning The convergence, and the condition {#warn-dtft}
The DTFT, and the one that the sequence is for, exists, and the one that the frequency is for, when the sequence, and the one that the sample is for, is the absolutely summable, and the one that the condition is for,
$$
\sum_{n=-\infty}^{\infty} |x[n]| < \infty,
$$
and the one that the condition is for. If the sequence, and the one that the sample is for, is not the summable, and the one that the condition is for, is when the DTFT, and the one that the sequence is for, is the one that the delta is for, and the one that the line is for. The constant, and the one that the sequence is for, is not the summable, but the DTFT, and the one that the frequency is for, is the delta, and the one that the line is for. The convergence, and the one that the DTFT is for, is the one that the condition is for.
:::

::: widget plot
f: 1/sqrt(2-2*0.5*cos(x)+0.5*0.5)
x: -3.3 3.3
y: 0 2
sliders:
caption: The magnitude of the DTFT of the decay a to the n, and the one that the sequence is for, against the frequency, and the one that the omega is for. The magnitude is the one over the square root of one plus the square of a minus the two a cos of the omega, and the one that the decay is for. The DTFT is the periodic in the frequency, with the period the two pi, and the one that the range is for.
:::

::: quiz
The DTFT is the one that the periodic is for. What is the period, and the one that the frequency is for?
- [x] The two pi
- [ ] The pi
- [ ] The one
- [ ] The two
::: solution
The DTFT, and the one that the sequence is for, is the periodic in the frequency, and the one that the omega is for, with the period two pi, and the one that the range is for. The range that is not redundant, and the one that the DTFT is for, is the negative pi to the positive pi, and the one that the omega is for. So the period of the DTFT is two pi, and the one that the frequency is for.
:::
:::

## Where this leads

With the DTFT, and the one that the sequence is for, and the pair and the property and the periodicity and the range, in hand, you have the full DTFT, and the one that the sequence is for. The method, and the check, are the one for the pair, and the one that is new is the DTFT, and the one that the sequence is for. In the next lesson, you meet the sampling, and the one that the alias is for, and the one that the hold is for, and the same algebra, and the spectrum and the design and the check, are the ones you already have.

::: history
The DTFT, and the one that the sequence is for, is the one that the digital is for. The pair and the property, and the one that the transform is for, is the one that the frequency is for. The periodicity, and the one that the range is for, is the one that the digital frequency is for. The method, the one that the DTFT is for, is the one that the sequence is for, and the one that the frequency is for.
:::

::: summary
- The DTFT is the spectrum of the discrete sequence, and the one that the frequency is for.
- The DTFT is periodic in the frequency, with the period the two pi, and the one that the omega is for.
- The range of the DTFT is the negative pi to the positive pi, and the one that the omega is for.
- The pair of the decay is the one over the one minus the a e to the negative j omega, and the one that the decay is for.
- The impulse transforms to the one, and the one that the sequence is for.
- The magnitude is the even. The phase is the odd, and the one that the DTFT is for.
- The digital frequency is the analog frequency times the sample time, and the one that the normalize is for.
- The response of the discrete LTI is the DTFT of the impulse response.
:::

## Exercises

::: exercise The period {level=1 check="2pi"}
The DTFT is the periodic. What is the period, and the one that the frequency is for?
::: solution
The DTFT, and the one that the sequence is for, is the periodic in the frequency with the period two pi, and the one that the omega is for. The range is the negative pi to the positive pi, and the one that the DTFT is for.
:::
:::

::: exercise The pair {level=1 check="1/(1-ae)"}
The decay a to the n. What is the DTFT?
::: hint
The geometric sum.
:::
::: solution
The DTFT of the decay a to the n, and the one that the sequence is for, is the one over the one minus the a times the exponential, and the one that the negative is for, of the j omega n, and the one that the frequency is for. The convergence, and the one that the DTFT is for, is when the magnitude of the a is less than the one, and the one that the condition is for.
:::
:::

::: exercise The impulse {level=1}
The impulse of the sequence. What is the DTFT?
::: solution
The DTFT of the impulse, and the one that the sequence is for, is the one, and the one that the transform is for, in all the frequency, and the one that the omega is for. The impulse is the identity of the convolution, and the one that the property is for. The one is the identity of the product, and the one that the DTFT is for.
:::
:::

::: exercise The digital frequency {level=2}
The analog frequency of the sample. What is the digital frequency, and the one that the omega is for?
::: hint
The analog times the sample time.
:::
::: solution
The digital frequency, and the one that the omega is for, is the analog frequency, and the one that the hertz is for, times the sample time, and the one that the sample is for. The range of the digital frequency, and the one that the DTFT is for, is the negative pi to the positive pi, and the one that the omega is for. The analog frequency, and the one that the continuous is for, maps to the digital, and the one that the frequency is for.
:::
:::

::: exercise The convolution {level=2}
The convolution of the sequence in the time. What is it in the DTFT, and the one that the frequency is for?
::: hint
The product.
:::
::: solution
The convolution of the sequence in the time, and the one that the sample is for, is the product in the DTFT, and the one that the frequency is for. The product of the sequence in the time, and the one that the sample is for, is the convolution in the DTFT, and the one that the frequency is for, with the scale one over the two pi, and the one that the DTFT is for.
:::
:::

::: exercise The alias {level=3}
Explain, the alias, and the one that the digital is for.
::: hint
The frequency beyond the pi.
:::
::: solution
The alias, and the one that the digital is for, is the one that the frequency is for, beyond the pi, and the one that the omega is for, of the digital frequency, and the one that the DTFT is for. The frequency, and the one that the analog is for, beyond the half of the sample, and the one that the frequency is for, is the one that the alias is for, in the digital, and the one that the frequency is for, below the half, and the one that the frequency is for. The alias, and the one that the digital is for, is the one that the sample is for, and the one that the frequency is for.
:::
:::

::: exercise The magnitude {level=3}
Explain, why the magnitude, and the one that the DTFT is for, is the even, and the one that the frequency is for.
::: hint
The real signal.
:::
::: solution
For the real, and the one that the sequence is for, the DTFT, and the one that the frequency is for, has the conjugate, and the one that the symmetry is for. The DTFT of the negative omega, and the one that the frequency is for, is the conjugate, and the one that the one is for, of the DTFT of the positive omega, and the one that the frequency is for. So the magnitude, and the one that the DTFT is for, is the even, and the one that the frequency is for, and the phase, and the one that the DTFT is for, is the odd, and the one that the frequency is for.
:::
:::

::: exercise The DTFT, and the Fourier {level=3}
Explain, the relation, between the DTFT, and the one that the sequence is for, and the Fourier, and the one that the continuous is for.
::: hint
Both are the spectrum.
:::
::: solution
The DTFT, and the one that the sequence is for, is the spectrum of the discrete, and the one that the sample is for. The Fourier, and the one that the continuous is for, is the spectrum of the continuous, and the one that the time is for. The two, and the one that the Fourier is for, are the discrete and the continuous, and the one that the spectrum is for. The DTFT is the periodic in the frequency. The Fourier is the aperiodic, and the one that the frequency is for. The sampling, and the one that the time is for, connects the two, and the one that the later lesson is for.
:::
:::
