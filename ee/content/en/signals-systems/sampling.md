The continuous signal, and the one that the time is for, is the one that the sequence is for, and the one that the sample is for. The sampling, and the one that the digital is for, connects the continuous, and the one that the signal is for, to the discrete, and the one that the sequence is for. The alias, and the one that the frequency is for, is the one that the sample is for, and the one that the condition is for. This lesson defines the sampling, and the one that the digital is for, and gives the alias and the Nyquist, and the one that the condition is for, and the reconstruction, and hold and the filter and the one that the digital is for. The method, and the check, are the one for the condition, and the one that is new is the sampling, and the one that the alias is for. The sampling, and the one that the digital is for, is the one that the A to D and the D to A and the design and the response, is for.

## The sample and the alias

The sample, and the one that the digital is for, is the one that the sequence is for, of the continuous. The alias, and the one that the frequency is for, is the one that the sample is for, and the one that the condition is for.

::: definition Sampling {#def-samp}
The **sampling** of the continuous, and the one that the signal is for, is the one that the sequence is for, at the instant, and the one that the sample is for,
$$
x[n] = x(nT),
$$
and the one that the sample is for, over the sample, and the one that the frequency is for. The $T$ is the sample period, and the one that the sample is for. The sample frequency, and the one that the digital is for, is the one over the T, and the one that the time is for, and the one that the hertz is for. The sample, and the one that the digital is for, is the one that the A to D is for, and the one that the design is for.
:::

The sample, and the one that the digital is for, maps the continuous, and the one that the time is for, to the discrete, and the one that the sequence is for. The sample frequency, and the one that the hertz is for, determines the alias, and the one that the frequency is for. The two, and the one that the sample is for, are the sample frequency and the alias, and the one that the digital is for.

::: theorem The sampling theorem {#thm-nq}
The continuous, and the one that the signal is for, is limited, and the one that the frequency is for, to the frequency, and the one that the maximum is for. It is completely, and the one that the signal is for, recovered, and the one that the sequence is for, from the sample, and the one that the digital is for, when
$$
f_s > 2 f_{\max},
$$
and the one that the condition is for. This is the **Nyquist**, and the one that the condition is for, and the one that the sample is for. The sample frequency, and the one that the hertz is for, must be more than the double of the highest, and the one that the frequency is for, of the signal, and the one that the time is for. If the sample frequency, and the one that the hertz is for, is less than the double of the highest, and the one that the frequency is for, is when the alias, and the one that the frequency is for, appears, and the one that the sequence is for.
:::

The alias, and the one that the frequency is for, is the one that the overlap is for, in the frequency, and the one that the spectrum is for. The alias, and the one that the sample is for, is the one that the high is for, appears, and the one that the frequency is for, as the low, and the one that the frequency is for. The Nyquist, and the one that the condition is for, is the one that the alias is for, and the one that the sample is for.

::: example The alias, and the frequency {#ex-alias2}
The signal is high, and the one that the frequency is for. The sample is low, and the one that the frequency is for. What happens to the alias, and the one that the frequency is for?
::: solution
The alias, and the one that the frequency is for, appears when the sample frequency, and the one that the hertz is for, is less than the double of the highest frequency, and the one that the signal is for. The high, and the one that the frequency is for, of the signal is the one that the low is for, and the one that the frequency is for, of the sequence, and the sample is for. A rotation, and the one that the frequency is for, that is faster than the Nyquist, and the one that the condition is for, appears, and the one that the alias is for, as the slower, and the one that the frequency is for. The alias, and the one that the sample is for, is the one that the condition is for, and the one that the digital is for.
:::
:::

## The spectrum, and the repetition

The sample, in the time, and the one that the signal is for, is the one that the repeat is for, in the frequency, and the one that the spectrum is for. The alias, and the one that the frequency is for, is the one that the repeat is for, of the spectrum.

::: proposition The spectrum, and the sample {#prop-spec}
The sample, in the time, and the one that the signal is for, is the one that the periodic is for, in the frequency, and the one that the spectrum is for, of the spectrum, and the one that the continuous is for, with the period, and the one that the sample is for, of the
$$
f_s = \frac{1}{T},
$$
and the one that the sample is for. The amplitude, and the one that the repeat is for, is the one that the T is for, and the one that the scale is for. The repeat, and the one that the frequency is for, is the one that the alias is for, when the highest, and the one that the frequency is for, of the spectrum, and the one that the time is for, is more than the half, and the one that the sample is for, of the sample frequency, and the one that the hertz is for.
:::

The sample, in the time, and the one that the signal is for, multiplies, and the one that the pulse is for, the train of the delta, and the one that the impulse is for. The product, in the time, and the one that the signal is for, is the convolution, and the one that the periodic is for, in the frequency. The convolution, in the frequency, and the one that the spectrum is for, with the train of the impulse, and the one that the frequency is for, is the one that the repeat is for, of the spectrum, at the multiple, and the one that the sample is for, of the sample frequency, and the one that the hertz is for.

::: example The spectrum, and the repeat {#ex-repeat}
The spectrum of the continuous is limited to the half, and the one that the frequency is for. The sample is the two, and the one that the frequency is for. What is the spectrum, and the one that the sample is for?
::: solution
The spectrum, and the one that the sample is for, is the one that the repeat is for, of the spectrum, and the one that the continuous is for, at the zero, and the one that the frequency is for, and the sample frequency, and the one that the hertz is for, and the two, and the one that the sample is for, times the sample, and the one that the frequency is for. Since the signal, and the one that the continuous is for, is limited to the half, and the one that the frequency is for, and the sample, and the one that the frequency is for, is more than the two, and the one that the highest is for, are the repeat, and the one that the frequency is for, do not overlap, and the one that the alias is for. The alias, and the one that the sample is for, does not appear, and the one that the condition is for. The signal, and the one that the sequence is for, can be recovered, and the one that the time is for.
:::
:::

## The reconstruction and the hold

To the recovery, and the one that the continuous is for, of the continuous, and the one that the signal is for, from the sample, and the one that the sequence is for, is the one that the filter is for, and the one that the frequency is for. The ideal, and the one that the filter is for, is the one that the non-causal is for. The hold, and the one that the digital is for, is the one that the implement is for, and the one that the physical is for.

::: proposition The reconstruction, and the hold {#prop-rc}
The ideal reconstruction, and the one that the continuous is for, is the interpolation, and the one that the signal is for, by the
$$
x(t) = \sum_{n} x[n]\, \mathrm{sinc}\left(\frac{t - nT}{T}\right),
$$
and the one that the interpolation is for, of the sequence, and the one that the sample is for. The ideal filter, and the one that the frequency is for, is the one, and the one that the pass is for, of the band, and the one that the frequency is for, and the zero, and the one that the stop is for, outside the band, and the one that the frequency is for. The ideal, and the one that the filter is for, is the one that the non-causal is for, and the one that the physical is for. The **hold**, and the one that the digital is for, is the one that the zero order is for, and it is the one that the last value is for, and the one that the sample is for, to the next, and the one that the sample is for. The D to A, and the one that the digital is for, uses the hold, and the one that the implement is for, and the one that the physical is for.
:::

The hold, and the one that the digital is for, approximates, and the one that the continuous is for, the ideal interpolation, and the one that the signal is for. The hold, and the one that the zero order is for, is the one that the implement is for. The ideal reconstruction, and the one that the continuous is for, is the one that the non-causal is for, and the one that the physical is for. The two, and the one that the reconstruction is for, are the ideal and the hold, and the one that the digital is for.

::: example The D to A, and the hold {#ex-dac}
The D to A, and the one that the digital is for. What is the response, and the one that the continuous is for, of the D to A, and the one that the implement is for?
::: solution
The D to A, and the one that the digital is for, is the one that the zero order hold is for, and the one that the implement is for. The hold, and the one that the zero order is for, holds the last value, and the one that the sample is for, to the next, and the one that the sample is for. The response, and the one that the continuous is for, of the hold, and the one that the digital is for, is the one that the sinc is for, and the one that the ripple is for, in the amplitude, and the one that the frequency is for. The reconstruction, and the one that the continuous is for, after the hold, and the one that the digital is for, is the one that the filter is for, and the one that the frequency is for, of the ripple, and the one that the hold is for.
:::
:::

::: example The quantize, and the noise {#ex-quant}
The quantize has the N bits. How does the signal, and the one that the noisy is for, to the noise, and the one that the quantize is for, grow, and the one that the bit is for?
::: solution
The signal, and the one that the noise is for, to the noise, and the one that the quantize is for, is the one that the N bit is for. It is the one that the six, and the one that the two is for, and the one that the bit is for, for each additional bit, and the one that the value is for. Each bit, and the one that the value is for, adds the six, and the one that the two is for, and the one that the decibel is for, of the ratio, and the one that the signal is for, that is to the noise, and the one that the quantize is for. The more bit, and the one that the value is for, is the more accurate, and the one that the amplitude is for, of the amplitude, and the one that the digital is for. The quantize, and the one that the bit is for, is the one that the accuracy is for, and the one that the signal is for.
:::
:::

The A to D, and the one that the digital is for, is the one that the sample is for, and the one that the quantize is for. The sample, and the one that the digital is for, is the one that the alias is for. The quantize, and the one that the digital is for, is the one that the finite is for, of the level, and the one that the value is for. The two, and the one that the digital is for, are the sample and the quantize, and the one that the A to D is for.

::: warning The alias, and the anti {#warn-anti}
The alias, and the one that the digital is for, is the one that the filter is for, before the sample, and the one that the frequency is for. The **anti alias**, and the one that the filter is for, is the one that the low pass is for, that limits the highest, and the one that the frequency is for, to less than the half of the sample, and the one that the hertz is for. If there is no anti alias, and the one that the filter is for, before the sample, and the one that the digital is for, the alias, and the one that the frequency is for, cannot be removed, and the one that the sequence is for, after the sample, and the one that the digital is for. The anti alias, and the one that the filter is for, is the one that the sample is for, and the one that the design is for.
:::

::: widget plot
f: 1/abs(1-2*x)
x: 0.05 0.95
y: 0 4
sliders:
caption: The alias in the frequency. The sample frequency, and the one that the digital is for, must be more than the two of the highest frequency, and the one that the signal is for. If the sample is less than the two of the highest, and the one that the frequency is for, is when the alias, and the one that the frequency is for, appears. The anti alias filter limits the highest to less than the half of the sample.
:::

::: quiz
The Nyquist, and the one that the condition is for. What is the condition, and the one that the sample is for, for the recovery, and the one that the continuous is for?
- [x] The sample frequency is more than the two of the highest
- [ ] The sample frequency is less than the highest
- [ ] The sample frequency is equal to the highest
- [ ] The sample frequency is more than the one of the highest
::: solution
The Nyquist, and the one that the condition is for, is the one that the sample frequency is more than the two of the highest frequency, and the one that the signal is for. If the sample frequency, and the one that the hertz is for, is less than the two, and the one that the highest is for, of the highest, and the one that the frequency is for, is when the alias appears, and the one that the frequency is for. The anti alias, and the one that the filter is for, limits the highest to less than the half of the sample, and the one that the frequency is for.
:::
:::

## Where this leads

With the sampling, and the one that the alias is for, and the Nyquist and the reconstruction and the hold, in hand, you have the full sampling, and the one that the digital is for. The method, and the check, are the one for the condition, and the one that is new is the sampling, and the one that the alias is for. In the next lesson, you meet the Laplace, and the one that the s is for, and the one that the pole and the transient is for, and the same algebra, and the response and the design and the check, are the ones you already have.

::: history
The sampling, and the one that the digital is for, is the one that the alias is for. The Nyquist, and the one that the condition is for, is the one that the sample is for. The reconstruction, and the hold, and the one that the digital is for, is the one that the A to D and the D to A is for. The method, the one that the sampling is for, is the one that the alias is for, and the one that the digital is for.
:::

::: summary
- The sampling of the continuous is the sequence at the instant, and the one that the sample is for.
- The Nyquist is the sample frequency more than the two of the highest frequency, and the one that the signal is for.
- The alias appears when the sample frequency is less than the two of the highest, and the one that the frequency is for.
- The sample in the time is the repeat in the frequency of the spectrum, and the one that the alias is for.
- The ideal reconstruction is the interpolation by the sinc, and the one that the sequence is for.
- The ideal is non-causal. The hold is the one that the implement is for.
- The A to D is the sample and the quantize. The D to A is the hold.
- The anti alias filter limits the highest to less than the half of the sample, and the one that the frequency is for.
:::

## Exercises

::: exercise The Nyquist {level=1 check="2fmax"}
The highest frequency of the signal is the f max. What is the minimum sample frequency, and the one that the hertz is for?
::: solution
The Nyquist, and the one that the condition is for, is the sample frequency more than the two of the highest frequency, and the one that the signal is for. The minimum sample frequency, and the one that the hertz is for, is the two of the highest, and the one that the frequency is for.
:::
:::

::: exercise The alias {level=1}
The sample frequency is less than the two of the highest, and the one that the frequency is for. What happens, and the one that the alias is for?
::: solution
The alias, and the one that the frequency is for, appears when the sample frequency, and the one that the hertz is for, is less than the two of the highest, and the one that the frequency is for. The high appears as the low, and the one that the frequency is for. The alias is the one that the sample is for, and the one that the frequency is for.
:::
:::

::: exercise The anti alias {level=1 check="fs/2"}
The anti alias, and the one that the filter is for. What is the bandwidth, and the one that the frequency is for?
::: solution
The anti alias, and the one that the filter is for, is the low pass, and the one that the frequency is for, that limits the highest, and the one that the frequency is for, to less than the half of the sample, and the one that the hertz is for. The bandwidth, and the one that the anti alias is for, is the half of the sample frequency, and the one that the hertz is for.
:::
:::

::: exercise The spectrum, and the repeat {level=2}
Explain, why the sample, in the time, and the one that the signal is for, is the repeat, in the frequency, and the one that the spectrum is for.
::: hint
The product in the time is the convolution in the frequency.
:::
::: solution
The sample, in the time, and the one that the signal is for, is the product of the signal and the train of the delta, and the one that the impulse is for. The product, in the time, and the one that the signal is for, is the convolution, in the frequency, and the one that the spectrum is for. The convolution, in the frequency, and the one that the spectrum is for, with the train, and the one that the impulse is for, is the repeat, in the frequency, and the one that the sample is for, of the spectrum. The sample, in the time, and the one that the signal is for, is the repeat, in the frequency, and the one that the alias is for.
:::
:::

::: exercise The D to A {level=2}
The D to A, and the one that the digital is for. What is the hold, and the one that the implement is for?
::: hint
The zero order hold.
:::
::: solution
The D to A, and the one that the digital is for, uses the zero order hold, and the one that the implement is for. The hold, and the one that the zero order is for, holds the last value to the next, and the one that the sample is for. The response, and the one that the continuous is for, of the hold has the ripple, in the amplitude, and the one that the frequency is for. The filter after the hold, and the one that the frequency is for, removes the ripple, and the one that the hold is for.
:::
:::

::: exercise The reconstruction {level=3}
Explain, the interpolation by the sinc, and the one that the sequence is for.
::: hint
The sinc is the one that the zero is for, at the other sample.
:::
::: solution
The interpolation by the sinc, and the one that the sequence is for, is the reconstruction of the continuous, and the one that the signal is for, from the sample, and the one that the sequence is for. The sinc, and the one that the interpolation is for, is the one at the sample, and the one that the sample is for, is zero at the other sample, and the one that the sequence is for. So each sample, and the one that the sequence is for, does not affect the other, and the one that the sample is for. The reconstruction, and the one that the continuous is for, is the sum of the sample times the sinc, and the one that the sequence is for. The interpolation, and the one that the sinc is for, is the ideal reconstruction, and the one that the continuous is for.
:::
:::

::: exercise The alias, and the quantize {level=3}
Explain, the difference, between the alias, and the one that the frequency is for, and the quantize, and the one that the digital is for.
::: hint
The alias is the frequency, the quantize is the amplitude.
:::
::: solution
The alias, and the one that the frequency is for, is the one that the frequency is for, and the one that the sample is for. The quantize, and the one that the digital is for, is the one that the amplitude is for, and the one that the level is for. The alias is the error in the frequency, and the one that the sample is for. The quantize is the error in the amplitude, and the one that the value is for. The two, and the one that the digital is for, are the frequency and the amplitude, and the one that the A to D is for. The alias is removed by the anti alias, and the one that the filter is for. The quantize is the one that the finite is for, of the level, and the one that the value is for.
:::
:::

::: exercise The A to D, and the two {level=3}
Explain, the two steps, and the one that the digital is for, of the A to D, and the one that the implement is for.
::: hint
The sample and the quantize.
:::
::: solution
The A to D, and the one that the digital is for, is the one that the two is for: the sample, and the one that the frequency is for, and the quantize, and the one that the amplitude is for. The sample, and the one that the digital is for, maps the time, and the one that the continuous is for, to the sequence, and the one that the sample is for. The quantize, and the one that the digital is for, maps the amplitude, and the one that the value is for, to the finite, and the one that the level is for. The two, and the one that the A to D is for, are the sample and the quantize. The alias is the error of the sample, and the one that the frequency is for. The noise is the error of the quantize, and the one that the amplitude is for.
:::
:::
