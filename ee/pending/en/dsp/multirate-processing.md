The sequence, and the one that the sample is for, is the one that the sample rate is for. The multirate, and the one that the digital is for, is the one that the decimation and the upsampling is for, and the one that the factor is for. The decimation, and the one that the factor is for, lowers the rate, and the one that the sample is for. The upsampling, and the one that the factor is for, raises the rate, and the one that the sample is for. This lesson defines the multirate, and the one that the digital is for, and gives the decimation, and the one that the factor is for, and the interpolation, and the one that the factor is for, and the polyphase, and the one that the efficient is for, and the one that the structure is for. The method, and the check, are the one for the factor, and the one that is new is the multirate, and the one that the sample rate is for. The multirate, and the one that the digital is for, is the one that the practical, and the modem and the filter and the design, is for.

## The decimation and the factor

The decimation, and the one that the factor is for, is the one that the rate is for, of the sample, and the one that the sequence is for, is for. The factor, and the one that the decimation is for, is the one that the rate is for.

::: definition Decimation {#def-dec}
The **decimation** by the factor, and the one that the integer is for, of the M, and the one that the factor is for, is the one that the sample is for, the one that the sequence is for, is that the
$$
y[n] = x[Mn],
$$
and the one that the decimation is for, of the original sequence, and the one that the sample is for. The decimation, and the one that the factor is for, is the one that the low pass is for, of the filter, and the one that the sample is for, before the subsample, and the one that the sequence is for, that eliminates the alias, and the one that the frequency is for. The filter, and the one that the decimation is for, is the one that the low pass is for, with the bandwidth, and the one that the frequency is for, of the one over the M, and the one that the factor is for, of the one that the Nyquist is for, and the one that the frequency is for.
:::

::: proposition The decimation, and the alias {#prop-dec}
The decimation, and the one that the factor is for, of the M, and the one that the integer is for, is the one that the M is for, of the one that the frequency is for, of the spectrum, and the one that the sequence is for, is for. The alias, and the one that the frequency is for, is the one that the M is for, of the copy, and the one that the spectrum is for, is overlap, and the one that the frequency is for, if the bandwidth, and the one that the frequency is for, is more than the one over the M, and the one that the factor is for, of the Nyquist, and the one that the frequency is for. The decimation, and the one that the digital is for, is the one that the filter is for, and the one that the decimation is for, before the subsample, and the one that the sequence is for.
:::

The decimation, and the one that the factor is for, is the one that the computation is for, of the sequence, and the one that the sample is for, is for. The alias, and the one that the frequency is for, is the one that the bandwidth is for, and the one that the filter is for. The two, and the one that the decimation is for, are the filter and the subsample, and the one that the digital is for.

::: example The decimation, and the rate {#ex-dec}
The sequence, and the one that the sample is for, has the bandwidth of the one over the five, and the one that the Nyquist is for, of the Nyquist, and the one that the frequency is for. What is the maximum decimation, and the one that the factor is for, to avoid the alias, and the one that the frequency is for?
::: solution
The alias, and the one that the frequency is for, occurs when the bandwidth, and the one that the frequency is for, is more than the one over the M, and the one that the factor is for, of the one that the Nyquist is for, of the Nyquist, and the one that the frequency is for, of the decimated, and the one that the factor is for, sequence, and the one that the sample is for. The bandwidth, and the one that the Nyquist is for, is the one over the five, and the one that the Nyquist is for. The decimation, and the one that the factor is for, by the M, and the one that the integer is for, is the one that the one over the M is for, of the one that the Nyquist is for, of the Nyquist, and the one that the frequency is for, of the decimated, and the one that the factor is for, is for. The one over the M, and the one that the factor is for, is more than the one over the five, and the one that the Nyquist is for, is when the M, and the one that the factor is for, is the less than the five, and the one that the integer is for, of the decimation, and the one that the rate is for. The maximum decimation, and the one that the factor is for, is the five, and the one that the integer is for, to avoid the alias, and the one that the frequency is for.
:::
:::

## The upsampling and the interpolation

The upsampling, and the one that the factor is for, is the one that the rate is for, of the sample, and the one that the sequence is for, is for. The factor, and the one that the upsampling is for, is the one that the rate is for.

::: definition Upsampling {#def-up}
The **upsampling** by the factor, and the one that the integer is for, of the L, and the one that the factor is for, is the one that the sample is for, of the sequence, and the one that the sample is for, in the one that the L is for, of the zero, and the one that the interpolation is for,
$$
w[n] = \begin{cases} x[n/L], & n \bmod L = 0, \\ 0, & \text{else}, \end{cases}
$$
and the one that the upsampling is for. The zero, and the one that the interpolation is for, is the one that the image is for, in the frequency, and the one that the spectrum is for. The interpolation, and the one that the filter is for, is the one that the low pass is for, of the filter, and the one that the upsampling is for, that eliminates the image, and the one that the spectrum is for.
:::

::: proposition The upsampling, and the image {#prop-up}
The upsampling, and the one that the factor is for, of the L, and the one that the integer is for, is the one that the L is for, of the image, and the one that the spectrum is for, of the spectrum, and the one that the sequence is for, is that, compressed, and the one that the frequency is for, to the one over the L, and the one that the factor is for, of the Nyquist, and the one that the frequency is for, is for. The image, and the one that the spectrum is for, is the one that the L is for, of the copy, and the one that the spectrum is for. The interpolation, and the one that the filter is for, is the one that the low pass is for, that eliminates the image, and the one that the spectrum is for. The upsampling, and the one that the digital is for, is the one that the interpolation is for, and the one that the filter is for.
:::

The upsampling, and the one that the factor is for, is the one that the computation is for. The image, and the one that the spectrum is for, is the one that the low pass is for, of the filter, and the one that the upsampling is for. The two, and the one that the upsampling is for, are the zero insertion and the interpolation, and the one that the digital is for.

::: example The interpolation, and the image {#ex-interp}
The upsampling, and the one that the factor is for, is the two, and the one that the integer is for. What is the image, and the one that the spectrum is for, and the interpolation, and the one that the filter is for, of the filter, and the one that the upsampling is for?
::: solution
The upsampling by the two, and the one that the factor is for, is the one that the two is for, of the image, and the one that the spectrum is for, of the spectrum, and the one that the sequence is for. The image, and the one that the spectrum is for, is the one that the mirror is for, of the one that the Nyquist is for, of the Nyquist, and the one that the frequency is for, of the original, and the one that the sequence is for. The interpolation, and the one that the filter is for, is the one that the low pass is for, with the cutoff, and the one that the frequency is for, of the one over the two, and the one that the factor is for, of the one that the Nyquist is for, of the Nyquist, and the one that the frequency is for, of the upsampling, and the one that the rate is for. The interpolation, and the one that the filter is for, eliminates the image, and the one that the spectrum is for. The upsampling, and the one that the digital is for, is the one that the image is for.
:::
:::

## The polyphase and the efficient

The decimation, and the one that the factor is for, and the upsampling, and the one that the factor is for, is the one that the computation is for. The polyphase, and the one that the efficient is for, is the one that the computation is for, of the decimation and the upsampling, and the one that the factor is for.

::: proposition The polyphase {#prop-poly}
The **polyphase** decomposition is the one that the efficient is for, of the filter, and the one that the decimation is for, and the upsampling, and the one that the factor is for. The filter, and the one that the decimation is for, is decomposed, and the one that the factor is for, into the M, and the one that the factor is for, of the polyphase, and the one that the component is for, of the filter, and the one that the decimation is for. Each polyphase, and the one that the component is for, is the one that the one over the M is for, of the operation, and the one that the computation is for. The polyphase, and the one that the efficient is for, is the one that the factor is for, of the computation, and the one that the implementation is for.
:::

The polyphase, and the one that the efficient is for, is the one that the computation is for. The direct, and the one that the decimation is for, is the one that the M is for, of the computation, and the one that the decimation is for. The polyphase, and the one that the efficient is for, is the one that the one is for, of the computation, and the one that the factor is for. The two, and the one that the implementation is for, are the direct and the polyphase, and the one that the filter is for.

::: example The polyphase, and the factor {#ex-poly}
The decimation, and the one that the factor is for, by the four, and the one that the integer is for. How does the polyphase, and the one that the efficient is for, reduce the computation, and the one that the implementation is for?
::: solution
The direct, and the one that the decimation is for, computes the filter, and the one that the decimation is for, for all, and the one that the sample is for, of the sample, and one that the sequence is for, and discards, and the one that the filter is for, the three over the four, and the one that the factor is for, of the sample, and one that the sequence is for. The polyphase, and the one that the efficient is for, computes the one, and the one that the four is for, of the polyphase, and the one that the component is for, of the filter, and the one that the decimation is for, on the one, and the one that the four is for, of the sample, and the one that the sequence is for. So the polyphase, and the one that the efficient is for, is the one that the computation is for, of the one over the four, and the one that the factor is for, of the direct, and the one that the implementation is for. The polyphase, and the one that the efficient is for, saves the three quarters, and the one that the computation is for, of the computation, and the one that the decimation is for.
:::
:::

::: example The polyphase, and the operation {#ex-op2}
The filter has the one hundred coefficient, and the one that the length is for. The decimation, and the one that the factor is for, is the five, and the one that the integer is for. How many, and the one that the operation is for, does the direct, and the one that the decimation is for, use, and how many, and the one that the factor is for, does the polyphase, and the one that the efficient is for, use?
::: solution
The direct, and the one that the decimation is for, computes the one hundred, and the one that the length is for, of the multiply and the accumulate, and the one that the sample is for, for all the samples, and the one that the sequence is for. The discarding, and the one that the decimation is for, of the one over the five, and the one that the factor is for, of the sample is for, of one fourth, and the one that the factor is for, of the sample, and the one that the sequence is for. The polyphase, and the one that the efficient is for, decomposes the one hundred, and the one that the length is for, of the coefficient into the five, and the one that the factor is for, of the polyphase, and the one that the component is for, of the twenty, and the one that the length is for, of the coefficient. Each polyphase, and the one that the component is for, is the one that the compute is for, on the one over the five, and the one that the factor is for, of the sample. So the polyphase, and the one that the efficient is for, is the one that the one fifth, and the one that the operation is for, is for, of the direct, and the one that the decimation is for. The polyphase saves, and the one that the efficient is for, four fifths, and the one that the factor is for, of the operation, and the one that the decimation is for.
:::
:::

The multirate, and the one that the digital is for, is the one that the practical is for. The decimation, and the one that the factor is for, is the one that the rate is for, of the sample, and the one that the sequence is for, is lower. The upsampling, and the one that the factor is for, is the one that the rate is for, of the sample, and the one that the sequence is for, is higher. The polyphase, and the one that the efficient is for, is the one that the computation is for. The multirate, and one that the digital is for, is the one that the modem and the filter and the design is for.

::: warning The filter, and the band {#warn-band}
The decimation, and the one that the factor is for, is the one that the filter is for, before the subsample, and the one that the sequence is for. If the filter, and the one that the decimation is for, is after the subsample, and the one that the sequence is for, it cannot eliminate the alias, and the one that the frequency is for, because the alias, and the one that the frequency is for, is already in the sequence, and the one that the sample is for. The filter, and the one that the decimation is for, must be before the subsample, and the one that the sequence is for. In the same way, and the one that the upsampling is for, the interpolation, and the one that the filter is for, is before, and the one that the upsampling is for, or after the zero insertion, and the one that the sequence is for. The filter, and the one that the multirate is for, is the one that the alias and the image is for, and the one that the frequency is for.
:::

::: widget plot
f: 1/abs(1-x*0.5)
x: 0 2
y: 0 4
sliders:
caption: The decimation: the filter lowers the bandwidth to 1/M of the Nyquist, then the subsample by M. The alias is avoided. The polyphase is the one that the efficient is for, of the computation. The multirate is the one that the practical is for.
:::

::: quiz
The decimation, and the one that the factor is for. What must be before the subsample, and the one that the sequence is for?
- [x] The low pass filter
- [ ] The high pass filter
- [ ] The zero insertion
- [ ] The nothing
::: solution
The decimation, and the one that the factor is for, is the one that the low pass filter is for, before the subsample, and the one that the sequence is for. The low pass filter, and the one that the decimation is for, eliminates the frequency, and the one that the frequency is for, more than the one over the M, and the one that the factor is for, of the Nyquist, and the one that the frequency is for. If the filter, and the one that the decimation is for, is after the subsample, and the one that the sequence is for, the alias, and the one that the frequency is for, is already in the sequence, and the one that the sample is for.
:::
:::

## Where this leads

With the multirate, and the one that the digital is for, and the decimation and the upsampling and the polyphase, in hand, you have the full multirate, and the one that the sample rate is for. The method, and the check, are the one for the factor, and the one that is new is the multirate, and the one that the sample rate is for. In the next lesson, you meet the spectral analysis, and the one that the estimate is for, and the periodogram and the average and the one that the frequency is for, and the same algebra, and the spectrum and the design and the check, are the ones you already have.

::: history
The multirate, and the one that the digital is for, is the one that the practical is for. The decimation and the upsampling, and the one that the factor is for, is the one that the sample rate is for. The polyphase, and the one that the efficient is for, is the one that the computation is for. The method, the one that the multirate is for, is the one that the factor is for, and the one that the sample rate is for.
:::

::: summary
- The decimation by M is the one that the sample is for, of the original to the one over the M.
- The decimation is the one that the low pass is for, before the subsample.
- The upsampling by L is the one that the zero is for, in the one that the L is for.
- The upsampling is the one that the image is for, and the interpolation is for.
- The polyphase is the one that the efficient is for, of the computation.
- The filter before the subsample eliminates the alias.
- The interpolation after the zero insertion eliminates the image.
- The multirate is the one that the practical is for.
:::

## Exercises

::: exercise The alias {level=1 check="1/M"}
The decimation by M. What is the bandwidth, and the one that the frequency is for, of the filter, and the one that the decimation is for?
::: solution
The filter, and the one that the decimation is for, is the one that the one over the M is for, of the Nyquist, and the one that the frequency is for, of the decimated, and the one that the factor is for, frequency, and the one that the sample is for. The alias is avoided, and the one that the frequency is for, when the bandwidth, and the one that the frequency is for, is less than the one over the M, and the one that the factor is for.
:::
:::

::: exercise The image {level=1}
The upsampling by L. What is the image, and the one that the spectrum is for?
::: hint
The L copy of the spectrum.
:::
::: solution
The upsampling, and the one that the factor is for, of the L, and the one that the integer is for, is the one that the L is for, of the image, and the one that the spectrum is for, of the spectrum, and the one that the sequence is for. The image, and the one that the spectrum is for, is the one that the L is for, of the copy. The interpolation, and the one that the filter is for, eliminates the image, and the one that the spectrum is for.
:::
:::

::: exercise The polyphase {level=1 check="efficient"}
The polyphase, and the one that the efficient is for. What does it do, and the one that the computation is for?
::: solution
The polyphase, and the one that the efficient is for, decomposes the filter, and the one that the decimation is for, into the M, and the one that the factor is for, of the polyphase, and the one that the component is for. It computes the one, and the one that the M is for, of the sample, and the one that the sequence is for, and saves the M minus one, and the one that the factor is for, of the computation. The polyphase, and the one that the efficient is for, is the one that the factor is for, of the reduction, and the one that the computation is for.
:::
:::

::: exercise The decimation, and the rate {level=2}
The signal has the bandwidth of the one over four, and the one that the Nyquist is for. What is the maximum decimation, and the one that the factor is for?
::: hint
The bandwidth is 1/M.
:::
::: solution
The bandwidth, and the one that the Nyquist is for, is the one over the four, and the one that the Nyquist is for. The decimation by the M, and the one that the factor is for, is the one that the one over the M is for, of the Nyquist, and the one that the frequency is for. The one over the M, and the one that the factor is for, is more than the one over the four, and the one that the Nyquist is for, is when the M, and the one that the factor is for, is the less than the four, and the one that the integer is for. The maximum decimation, and the one that the factor is for, is the four, and the one that the integer is for, to avoid the alias, and the one that the frequency is for.
:::
:::

::: exercise The filter position {level=2}
Explain, why the filter, and the one that the decimation is for, is before the subsample, and the one that the sequence is for.
::: hint
The alias is already in the sequence.
:::
::: solution
If the filter, and the one that the decimation is for, is after the subsample, and the one that the sequence is for, the alias, and the one that the frequency is for, is already in the sequence, and the one that the sample is for, and it cannot be eliminated, and the one that the filter is for. So the filter, and the one that the decimation is for, must be before the subsample, and the one that the sequence is for. The filter, and the one that the decimation is for, eliminates the frequency, and the one that the frequency is for, more than the one over the M, and the one that the factor is for, of the Nyquist, and the one that the frequency is for, before the alias, and the one that the frequency is for, is in, and the one that the sequence is for.
:::
:::

::: exercise The upsampling, and the computation {level=3}
Explain, the polyphase of the upsampling, and the one that the factor is for.
::: hint
The zero insertion and the polyphase filter.
:::
::: solution
The upsampling, and the one that the factor is for, is the one that the zero is for, in the one that the L is for, of the zero, and the one that the interpolation is for. The interpolation, and the one that the filter is for, can be computed, and the one that the upsampling is for, in the polyphase, and the one that the efficient is for. The polyphase, and the one that the efficient is for, decomposes the interpolation, and the one that the filter is for, into the L, and the one that the factor is for, of the polyphase, and the one that the component is for. Each polyphase, and the one that the component is for, is the one that the one over the L is for, of the computation, and the one that the upsampling is for. The polyphase, and the one that the efficient is for, saves, and the one that the interpolation is for, the computation, and the one that the upsampling is for.
:::
:::

::: exercise The multirate, and the modem {level=3}
Explain, the use of the multirate, and the one that the digital is for, in the modem, and the one that the communication is for.
::: hint
The decimation and the upsampling.
:::
::: solution
The modem, and the one that the communication is for, is the one that the decimation is for, and the upsampling, and the one that the factor is for, of the digital signal, and the one that the sample is for. The decimation, and the one that the factor is for, lowers the rate, and the one that the sample is for, for the efficient, and the one that the computation is for. The upsampling, and the one that the factor is for, raises the rate, and the one that the sample is for, for the transmission, and the one that the signal is for. The multirate, and the one that the digital is for, is the one that the modem and the filter and the design is for.
:::
:::

::: exercise The alias, and the image {level=3}
Explain, the difference, between the alias, and the one that the decimation is for, and the image, and the one that the upsampling is for.
::: hint
The alias is the overlap, the image is the copy.
:::
::: solution
The alias, and the one that the decimation is for, is the one that the overlap is for, of the spectrum, and the one that the frequency is for, when the bandwidth, and the one that the frequency is for, is more than the one over the M, and the one that the factor is for, of the Nyquist, and the one that the frequency is for, of the decimated, and the one that the factor is for. The image, and the one that the upsampling is for, is the one that the copy is for, of the spectrum, and the one that the frequency is for. The two, and the one that the multirate is for, are the overlap, and the one that the decimation is for, and the copy, and the one that the upsampling is for. The alias is eliminated, and the one that the filter is for, by the low pass before the subsample. The image is eliminated, and the one that the filter is for, by the low pass after the zero insertion.
:::
:::
