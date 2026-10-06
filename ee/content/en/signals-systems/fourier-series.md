The periodic signal, and the one that the time is for, is the one that the harmonic is for. The Fourier series, and the one that the periodic is for, is the one that the harmonic is for, and the one that the frequency is for. The signal, and the one that the periodic is for, is decomposed, and the one that the harmonic is for, into the sinusoid, and the one that the frequency is for, and the one that the amplitude and the phase is for. This lesson defines the Fourier series, and the one that the periodic is for, and gives the coefficient, and the one that the harmonic is for, and the amplitude and the phase, and the one that the frequency is for. The method, and the check, are the one for the coefficient, and the one that is new is the series, and the one that the periodic is for. The Fourier series, and the one that the periodic is for, is the one that the spectrum, and the one that the filter, is for.

## The series and the harmonic

The periodic signal, and the one that the time is for, is the sum, and the one that the harmonic is for, of the sinusoid, and the one that the frequency is for. The harmonic, and the one that the frequency is for, is the one that the fundamental is for, times the integer, and the one that the harmonic is for.

::: definition Fourier series {#def-fs}
The **Fourier series** of the periodic signal, and the one that the time is for, is
$$
x(t) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \big( a_n \cos(n\omega_0 t) + b_n \sin(n\omega_0 t) \big),
$$
and the one that the series is for. The $\omega_0 = 2\pi / T$ is the fundamental, and the one that the radian is for, of the period, and the one that the time is for. The $a_n$, and the $b_n$, and the one that the harmonic is for, are the coefficient, and the one that the amplitude is for. The $a_0/2$ is the DC, and the one that the value is for. The harmonic, and the one that the frequency is for, is the one that the $n$, and the one that the integer is for, is for.
:::

The series, and the one that the periodic is for, is the one that the harmonic is for. The harmonic, and the one that the frequency is for, is the one that the fundamental is for, and the one that the integer is for. The coefficient, and the one that the amplitude is for, is the one that the amplitude and the phase is for, and the one that the harmonic is for.

::: proposition The coefficient, and the amplitude {#prop-fs}
The coefficient, and the one that the harmonic is for, is
$$
a_n = \frac{2}{T}\int_{T} x(t)\cos(n\omega_0 t)\, \mathrm dt, \qquad b_n = \frac{2}{T}\int_{T} x(t)\sin(n\omega_0 t)\, \mathrm dt,
$$
and the one that the coefficient is for. The amplitude, and the one that the harmonic is for, is
$$
c_n = \sqrt{a_n^2 + b_n^2},
$$
and the one that the amplitude is for. The phase, and the one that the harmonic is for, is
$$
\phi_n = -\arctan\frac{b_n}{a_n},
$$
and the one that the phase is for. So
$$
x(t) = \frac{a_0}{2} + \sum_{n=1}^{\infty} c_n \cos(n\omega_0 t + \phi_n),
$$
and the one that the amplitude and the phase is for. The coefficient, and the one that the harmonic is for, determines the amplitude, and the phase, and the one that the frequency is for.
:::

The coefficient, and the one that the harmonic is for, is the one that the projection is for, of the signal, and the one that the time is for, on the harmonic, and the one that the frequency is for. The two, the cosine and the sine, and the one that the harmonic is for, are the two that the even and the odd is for, and the one that the symmetry is for. The even, and the one that the signal is for, has only the coefficient, and the one that the cosine is for. The odd, and the one that the signal is for, has only the coefficient, and the one that the sine is for.

## The spectrum and the line

The series, and the one that the periodic is for, is the one that the spectrum is for, and the one that the frequency is for. The spectrum, and the one that the periodic is for, is the line, and the one that the harmonic is for, at the harmonic, and the one that the frequency is for.

::: proposition The spectrum, and the harmonic {#prop-spect}
The **spectrum** of the periodic, and the one that the signal is for, is the line, and the one that the harmonic is for, at the harmonic frequency, and the one that the frequency is for, with the amplitude, and the one that the coefficient is for, of the coefficient, and the one that the harmonic is for. The spectrum, and the one that the periodic is for, is the discrete, and the one that the harmonic is for. The line, and the one that the spectrum is for, is the one that the amplitude and the phase is for, and the one that the harmonic is for. The spectrum, and the one that the periodic is for, is the one that the filter is for, and the one that the design is for.
:::

::: example The square, and the harmonic {#ex-square}
The signal is the square, and the one that the periodic is for. What is the coefficient, and the one that the harmonic is for?
::: solution
The square, and the one that the periodic is for, has only the harmonic, and the one that the odd is for, of the sine, and the one that the frequency is for. The coefficient, and the one that the odd is for, is the four over the pi of the n, and the one that the odd is for. The coefficient, and the one that the even is for, is the zero, and the one that the harmonic is for. The DC, and the one that the value is for, is the zero, and the one that the signal is for. So the square, and the one that the periodic is for, is the odd, and the one that the harmonic is for, and the one that the sine is for.
:::
:::

::: example The pulse, and the line {#ex-pulse}
The signal is the pulse train, and the one that the periodic is for. What is the coefficient, and the one that the harmonic is for?
::: solution
The pulse train, and the one that the periodic is for, has the coefficient, and the one that the harmonic is for, that is the function, and the one that the sine is for, of the n, and the one that the width is for. The coefficient, and the one that the harmonic is for, decays, and the one that the frequency is for, as the one over the n, and the one that the harmonic is for. The narrow, and the one that the width is for, the pulse, and the one that the periodic is for, is the wide, and the one that the spectrum is for, and the one that the frequency is for. The wide, and the one that the pulse is for, is the narrow, and the one that the spectrum is for. The two, and the one that the periodic is for, are the width and the spectrum, and the one that the frequency is for.
:::
:::

::: example The cosine, and the coefficient {#ex-cos}
The signal is the cosine, and the one that the periodic is for. What is the Fourier series, and the one that the harmonic is for?
::: solution
The cosine, and the one that the periodic is for, is the one harmonic, and the one that the frequency is for, and the one that the amplitude is for. The Fourier series, and the one that the periodic is for, of the cosine, and the one that the time is for, is the cosine itself, and the one that the signal is for. The coefficient, and the one that the one is for, is the one, and the one that the amplitude is for. The coefficient, and the one that the other is for, of the other harmonic, and the one that the frequency is for, is the zero, and the one that the harmonic is for. So a pure cosine is the line, and the one that the spectrum is for, at the frequency, and the one that the cosine is for, and the one that the amplitude is for.
:::
:::

## The Gibbs and the approximation

The partial sum, and the one that the harmonic is for, is the approximation, and the one that the signal is for, of the periodic signal, and the one that the time is for. The Gibbs, and the one that the approximation is for, is the one that the discontinuity is for.

::: proposition The Gibbs, and the approximation {#prop-gibbs}
The partial sum, of the N harmonic, and the one that the series is for, approximates, and the one that the signal is for, the periodic signal, and the one that the time is for. The approximation, and the one that the harmonic is for, does not converge, and the one that the discontinuity is for, at the discontinuity, and the one that the signal is for. The overshoot, and the one that the approximation is for, does not decrease with the N, and the one that the harmonic is for. This is the **Gibbs**, and the one that the phenomenon is for. The approximation, and the one that the N is for, is better, and the one that the signal is for, as the N, and the one that the harmonic is for, grows, and the one that the frequency is for.
:::

::: example The approximation, and the harmonic {#ex-approx}
The square, and the one that the periodic is for. How many harmonic, and the one that the frequency is for, are needed for the approximation, and the one that the signal is for?
::: solution
The more harmonic, and the one that the frequency is for, is the better, and the one that the approximation is for, of the approximation, and the one that the signal is for. The square, and the one that the periodic is for, is the one that the discontinuity is for. The approximation, and the one that the harmonic is for, approaches the square, and the one that the signal is for, with the oscillation, and the one that the Gibbs is for, near the discontinuity, and the one that the signal is for. The ten harmonic, and the one that the frequency is for, is the good, and the one that the approximation is for, of the approximation, and the one that the signal is for. The approximation, and the one that the harmonic is for, is the one that the spectrum is for, and the one that the design is for.
:::
:::

The two, the time and the frequency, and the one that the periodic is for, are the two that the Fourier is for, and the one that the series is for. The time, and the one that the signal is for, is the one that the amplitude and the time is for. The frequency, and the one that the spectrum is for, is the one that the amplitude and the frequency is for. The Fourier, and the one that the series is for, is the one that the two is for, and the one that the transform is for.

::: warning The convergence, and the condition {#warn-conv}
The series, and the one that the periodic is for, converges, and the one that the signal is for, when the periodic, and the one that the signal is for, is the piecewise smooth, and the one that the condition is for, and the one that the finite is for, and the one that the maximum is for. The series, and the one that the periodic is for, does not converge, and the one that the signal is for, at the discontinuity, and the one that the signal is for, to the value, and the one that the signal is for, of the discontinuity, and the one that the signal is for, but to the average, and the one that the value is for, of the two, and the one that the side is for. The convergence, and the one that the series is for, is the one that the condition is for, and the one that the signal is for.
:::

::: widget plot
f: 1/pi*(sin(4*pi*x) + 1/3*sin(12*pi*x) + 1/5*sin(20*pi*x))
x: -0.6 0.6
y: -0.4 0.4
sliders:
caption: The partial sum, of the odd harmonic, of the square, and the one that the periodic is for. The approximation, and the one that the harmonic is for, approaches the square, and the one that the signal is for, with the oscillation, and the one that the Gibbs is for, near the discontinuity, and the one that the signal is for. The more harmonic, and the one that the frequency is for, is the better, and the one that the approximation is for.
:::

::: quiz
The coefficient of the Fourier, and the one that the periodic is for. What is it?
- [x] The projection, and the one that the harmonic is for, of the signal on the harmonic
- [ ] The amplitude, and the one that the maximum is for, of the signal
- [ ] The frequency, and the one that the harmonic is for, of the fundamental
- [ ] The period, and the one that the time is for, of the signal
::: solution
The coefficient, and the one that the harmonic is for, of the Fourier series, and the one that the periodic is for, is the one that the projection is for, of the signal, and the one that the time is for, on the harmonic, and the one that the frequency is for. The projection, and the one that the harmonic is for, is the one that the integral is for, of the product, and the one that the signal and the harmonic is for. The coefficient, and the one that the harmonic is for, determines the amplitude, and the phase, and the one that the frequency is for.
:::
:::

## Where this leads

With the Fourier series, and the one that the periodic is for, and the coefficient, and the amplitude and the phase, and the spectrum, and the harmonic, in hand, you have the full Fourier series, and the one that the periodic is for. The method, and the check, are the one for the coefficient, and the one that is new is the series, and the one that the periodic is for. In the next lesson, you meet the Fourier transform, and the one that the aperiodic is for, and the one that the continuum is for, and the same algebra, and the transform and the check, are the ones you already have.

::: history
The Fourier series, and the one that the periodic is for, is the one that the harmonic is for. The coefficient, and the one that the amplitude is for, is the one that the projection is for. The spectrum, and the one that the harmonic is for, is the one that the frequency is for. The method, the one that the series is for, is the one that the periodic is for, and the one that the harmonic is for.
:::

::: summary
- The periodic signal is the sum of the sinusoid, and the one that the frequency is for.
- The Fourier series is the decomposition of the periodic signal in the harmonic, and the one that the frequency is for.
- The coefficient a_n and b_n is the projection of the signal on the harmonic, and the one that the integral is for.
- The amplitude and the phase determines the harmonic, and the one that the frequency is for.
- The spectrum of the periodic is the line at the harmonic, and the one that the discrete is for.
- The even signal has only the cosine term. The odd signal has only the sine term.
- The partial sum approximates the signal, with the Gibbs near the discontinuity.
- The series converges to the average at the discontinuity.
:::

## Exercises

::: exercise The fundamental {level=1 check="2pi/T"}
The period is T. What is the fundamental, and the one that the radian is for?
::: solution
The fundamental, and the one that the radian is for, is the two pi divided by the period, and the one that the time is for. The frequency, and the one that the hertz is for, is the one divided by the period, and the one that the time is for. The harmonic, and the one that the frequency is for, is the n times the fundamental, and the one that the radian is for.
:::
:::

::: exercise The square {level=1}
The square wave is the one that the harmonic is for. What harmonic, and the one that the frequency is for, does it have?
::: hint
Only the odd sine.
:::
::: solution
The square, and the one that the periodic is for, has only the odd harmonic, and the one that the frequency is for, of the sine, and the one that the harmonic is for. The coefficient, and the one that the odd is for, is the four over the pi n, and the one that the odd is for. The even, and the one that the harmonic is for, is the zero. So the square is the odd, and the one that the sine is for, and the one that the harmonic is for.
:::
:::

::: exercise The symmetry {level=1}
The signal is even, and the one that the time is for. What coefficient, and the one that the harmonic is for, is the non-zero?
::: hint
Even has only the cosine.
:::
::: solution
The even, and the one that the signal is for, has only the coefficient, and the one that the cosine is for, of the cosine, and the one that the harmonic is for. The coefficient, and the one that the sine is for, is the zero, and the one that the odd is for. The even and the cosine, and the one that the harmonic is for, are the even, and the one that the symmetry is for. The odd and the sine, and the one that the harmonic is for, are the odd, and the one that the symmetry is for.
:::
:::

::: exercise The spectrum {level=2}
The pulse train is the narrow pulse, and the one that the periodic is for. What is the spectrum, and the one that the frequency is for?
::: hint
Narrow pulse is the wide spectrum.
:::
::: solution
The pulse train, and the one that the periodic is for, with the narrow pulse, and the one that the time is for, is the one that the wide spectrum is for, and the one that the frequency is for. The wide, and the one that the pulse is for, is the one that the narrow spectrum is for. The narrow, and the one that the pulse is for, is the one that the wide spectrum is for. The two, and the one that the periodic is for, are the width, and the one that the time is for, and the spectrum, and the one that the frequency is for. A narrow pulse is a wide spectrum.
:::
:::

::: exercise The Gibbs {level=2}
What is the Gibbs, and the one that the phenomenon is for?
::: hint
The overshoot at the discontinuity.
:::
::: solution
The Gibbs, and the one that the phenomenon is for, is the overshoot, and the one that the approximation is for, of the partial sum, and the one that the harmonic is for, at the discontinuity, and the one that the signal is for. The overshoot, and the one that the Gibbs is for, does not decrease as the N, and the one that the harmonic is for, grows. It is the one that the discontinuity is for, and the one that the signal is for. The Gibbs, and the one that the phenomenon is for, is the one that the approximation is for.
:::
:::

::: exercise The amplitude {level=2}
The coefficient is the a and the b, and the one that the harmonic is for. What is the amplitude, and the one that the harmonic is for?
::: hint
The magnitude of the a and b.
:::
::: solution
The amplitude, and the one that the harmonic is for, is the square root of the square of the a, and the one that the coefficient is for, plus the square of the b, and the one that the coefficient is for. The amplitude, and the one that the harmonic is for, is the magnitude, and the one that the value is for, of the coefficient, and the one that the harmonic is for. The phase, and the one that the harmonic is for, is the tangent, and the one that the b over the a is for, with the sign, and the one that the phase is for.
:::
:::

::: exercise The DC {level=3}
The coefficient a_0, and the one that the series is for. What is it?
::: hint
The average.
:::
::: solution
The a_0 over the two, and the one that the series is for, is the average, and the one that the value is for, of the signal, and the one that the time is for. The a_0, and the one that the series is for, is the two times the average, and the one that the value is for. The DC, and the one that the value is for, is the a_0 over the two, and the one that the series is for, and the one that the harmonic is for.
:::
:::

::: exercise The periodic, and the aperiodic {level=3}
Explain, the difference, between the Fourier series, and the one that the periodic is for, and the Fourier transform, and the one that the aperiodic is for.
::: hint
Series is the discrete, transform is the continuum.
:::
::: solution
The Fourier series, and the one that the periodic is for, is the one that the discrete line is for, at the harmonic, and the one that the frequency is for. The Fourier transform, and the one that the aperiodic is for, is the one that the continuum is for, and the one that the frequency is for. The periodic, and the one that the signal is for, is the series, and the one that the discrete is for. The aperiodic, and the one that the signal is for, is the transform, and the one that the continuum is for. The two, and the one that the Fourier is for, are the series and the transform.
:::
:::
