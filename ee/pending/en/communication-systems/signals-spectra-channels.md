The signal, and the one that the wave is for, has the spectrum, and the one that the frequency is for. The bandpass, and the one that the wave is for, is the one that the carrier is for. The channel, and the one that the signal is for, has the noise, and the one that the fade is for. This lesson defines the signal, and the one that the spectrum is for, and gives the bandpass, and the one that the carrier is for, and the complex envelope, and the one that the baseband is for, and the channel, and the one that the noise is for, of the signal, and the one that the AWGN is for, and the fading, and the one that the channel is for. The method, and the check, are the one for the spectrum and the bandwidth, and the one that is new is the communication, and the one that the signal is for. The spectrum, and the one that the frequency is for, is the one that the modulation and the design, and the one that the channel is for.

## The signal and the spectrum

The signal, and the one that the time is for, of the time, and the one that the wave is for, has the spectrum, and the one that the frequency is for. The spectrum, and the one that the frequency is for, is the one that the amplitude and the phase is for, of the frequency, and the one that the signal is for.

::: definition Spectrum {#def-spec}
The **spectrum** of the signal, and the one that the waveform is for, is the Fourier, and the one that the transform is for, of the transform, and the one that the signal is for. For the bandlimited, and the one that the bandwidth is for, of the signal, and the one that the frequency is for, with the bandwidth $B$, and the one that the hertz is for, the spectrum, and the one that the frequency is for, is
$$
S(f) = \int x(t)\, e^{-j2\pi f t}\, dt,
$$
and the one that the spectrum is for. The signal, and the one that the time is for, of the time, and the one that the wave is for, is the one that the bandwidth is for, of the $B$, and the one that the hertz is for, if its spectrum, and the one that the frequency is for, is the zero, and the one that the amplitude is for, outside, and the one that the frequency is for, the $B$, and the one that the frequency is for. The bandwidth, and the one that the signal is for, is the one that the channel is for, of the limit, and the one that the frequency is for.
:::

The spectrum, and the one that the frequency is for, is the one that the frequency is for, of the signal, and the one that the wave is for. The bandwidth, and the one that the signal is for, is the one that the spectrum is for, of the limit, and the one that the frequency is for. The two, and the one that the signal is for, are the time and the frequency, and the one that the transform is for. The signal, and the one that the time is for, is the one that the time is for. The spectrum, and the one that the frequency is for, is the one that the frequency is for, of the signal.

::: proposition Nyquist {#prop-nq}
The Nyquist, and the one that the sampling is for, of the theorem is
$$
f_s \ge 2B,
$$
and the one that the sampling is for, where the $f_s$ is the sampling, and the one that the frequency is for, of the frequency, and the one that the time is for, and the $B$ is the bandwidth, and the one that the signal is for. The sampling, and the one that the rate is for, is the one that the bandlimited, and the one that the signal is for, of the signal, and the one that the frequency is for, that is possible. The bandlimited, and the one that the signal is for, of the signal, and the one that the frequency is for, can be reconstructed, and the one that the signal is for, from the sample, and the one that the time is for, of the sample, and the one that the time is for, if the sampling, and the one that the frequency is for, is above, and the one that the rate is for, the Nyquist, and the one that the frequency is for.
:::

The Nyquist, and the one that the sampling is for, is the one that the limit is for, of the sampling, and the one that the frequency is for. The bandwidth, and the one that the signal is for, is the one that the limit is for, of the frequency, and the one that the signal is for. The two, and the one that the signal is for, are the bandwidth and the sampling, and the one that the rate is for.

## The bandpass and the envelope

The bandpass, and the one that the carrier is for, is the one that the carrier is for. The complex envelope, and the one that the baseband is for, is the one that the low is for, of the bandpass, and the one that the wave is for.

::: definition Complex envelope {#def-env}
The **complex envelope** of the bandpass, and the one that the carrier is for, signal, and the one that the wave is for, is
$$
\tilde{s}(t) = s(t) + j\,\hat{s}(t),
$$
and the one that the envelope is for, where the $\hat{s}$ is the Hilbert, and the one that the transform is for, of the transform, and the one that the signal is for. It is the one that the baseband, and the one that the signal is for, of the signal, and the one that the wave is for. The bandpass, and the one that the carrier is for, is
$$
s(t) = \mathrm{Re}\left[\tilde{s}(t)\, e^{j2\pi f_c t}\right],
$$
and the one that the bandpass is for, where the $f_c$ is the carrier, and the one that the frequency is for, of the frequency, and the one that the wave is for. The envelope, and the one that the baseband is for, is the one that the slow is for, of the change, and the one that the time is for. The carrier, and the one that the wave is for, is the one that the fast is for, of the oscillation, and the one that the wave is for.
:::

The complex envelope, and the one that the baseband is for, is the one that the baseband is for, of the signal, and the one that the wave is for. The bandpass, and the one that the carrier is for, is the one that the product with the carrier is for. The two, and the one that the signal is for, are the envelope and the carrier, and the one that the wave is for. The modulation, and the one that the carrier is for, is the one that the envelope is for, of the information, and the one that the message is for.

::: example The envelope, and the baseband {#ex-env}
The message is the one, and the kilohertz is for, of the tone, and the one that the frequency is for. What is the bandwidth, and the one that the frequency is for, of the AM, and the one that the modulation is for, of the signal, and the one that the wave is for?
::: solution
The AM, and the one that the modulation is for, of the AM, and the one that the signal is for, is the message, and the one that the tone is for, modulated, and the one that the carrier is for, on the carrier, and the one that the wave is for. The message, and the one that the tone is for, has the bandwidth of the one, and the kilohertz is for, of the frequency, and the one that the tone is for. The AM, and the one that the modulation is for, of the AM, and the one that the signal is for, has the bandwidth of the two, and the kilohertz is for, of the kilohertz, and the one that the frequency is for. The two, and the one that the sideband is for, of the sideband, and the one that the frequency is for, is for. So the AM, and the one that the modulation is for, is the two, and the kilohertz is for, of the bandwidth, and the one that the frequency is for.
:::
:::

::: example The analytic, and the envelope {#ex-analytic}
The cosine has the frequency, and the one that the carrier is for, of the carrier. What is the complex envelope, and the one that the baseband is for, of the cosine, and the one that the wave is for?
::: solution
The complex envelope, and the one that the baseband is for, is the analytic, and the one that the signal is for, signal, and the one that the baseband is for, times the complex exponential, and the one that the negative is for, of the negative, and the one that the carrier is for. For the cosine, and the one that the wave is for, with the carrier, and the one that the frequency is for, the analytic, and the one that the signal is for, signal is the complex exponential, and the one that the positive is for, of the carrier, and the one that the frequency is for. So the complex envelope, and the one that the baseband is for, is the complex exponential, and the one that the carrier is for, of the carrier, and the one that the amplitude is for. The real, and the one that the cosine is for, is recovered, and the one that the time is for, by the product, and the one that the frequency is for, with the carrier, and the one that the complex is for. The envelope, and the one that the baseband is for, captures only the one that the magnitude is for, and the phase, and the one that the signal is for.
:::
:::

## The channel and the noise

The channel, and the one that the signal is for, has the noise, and the one that the signal is for. The AWGN, and the one that the Gaussian is for, is the one that the additive is for, of the noise, and the one that the signal is for. The fading, and the one that the multipath is for, is the one that the multipath is for, of the channel, and the one that the signal is for.

::: definition AWGN {#def-awgn}
The **AWGN** channel is the one that the noise, and the one that the Gaussian is for, of the Gaussian, and the one that the white is for, is for. The received, and the one that the signal is for, is
$$
r(t) = x(t) + n(t),
$$
and the one that the channel is for, where the $x$ is the transmitted, and the one that the signal is for, and the $n$ is the noise, and the one that the Gaussian is for, of the Gaussian. The noise, and the one that the Gaussian is for, is the one that the white is for, of the power spectrum, and the one that the frequency is for. The power spectrum, and the one that the Gaussian is for, is the one that the flat is for, of the frequency, and the one that the value is for. The two, and the one that the channel is for, are the signal and the noise, and the one that the AWGN is for.
:::

The AWGN, and the one that the Gaussian is for, is the one that the white is for. The fading, and the one that the multipath is for, is the one that the multipath is for. The two, and the one that the channel is for, are the additive and the multiplicative, and the one that the noise is for. The design, and the one that the channel is for, is the one that the noise is for, and the one that the limit is for.

::: proposition Fading {#prop-fade}
The **fading** is the one that the multipath, and the one that the channel is for, of the channel, and the one that the signal is for, is for. The received, and the one that the signal is for, is
$$
r(t) = h(t)\, x(t) + n(t),
$$
and the one that the fading is for, where the $h$ is the fading, and the one that the gain is for, of the gain, and the one that the channel is for, and the $n$ is the noise, and the one that the Gaussian is for. The fading, and the one that the channel is for, is the one that the random is for, of the gain, and the one that the channel is for. It is the one that the frequency is for, of the selective, and the one that the channel is for. The design, and the one that the channel is for, is the one that the fading is for, and the one that the correction is for.
:::

The fading, and the one that the channel is for, is the one that the multipath is for. The AWGN, and the one that the Gaussian is for, is the one that the additive is for. The two, and the one that the channel is for, are the additive and the selective, and the one that the noise is for. The SNR, and the one that the signal is for, is the one that the performance is for.

::: example The SNR, and the decibel {#ex-snr}
The power is the one ten to the minus, and the three, and the one that the decibel is for. The noise is the one ten to the minus, and the six, and the one that the decibel is for. What is the SNR, and the one that the signal is for, in the decibel, and the one that the ratio is for?
::: solution
The SNR, and the one that the signal is for, is the power, and the one that the ratio is for, divided by the noise, and the one that the power is for. It is the one ten to the minus, and the three, and the one that the power is for, divided by the one ten to the minus, and the six, and the one that the power is for, and the one thousand, and the one that the ratio is for. In the decibel, and the one that the ratio is for, it is the ten, and the one that the factor is for, times the log of the one thousand, and the one that the ratio is for. The log of the one thousand, and the one that the ratio is for, is the three, and the one that the value is for, so it is the thirty, and the one that the decibel is for, of the decibel, and the one that the signal is for.
:::
:::

The spectrum, and the one that the frequency is for, is the one that the bandwidth is for, of the limit, and the one that the signal is for. The bandpass, and the one that the carrier is for, is the one that the modulation is for. The channel, and the one that the signal is for, is the one that the noise is for. The three, and the one that the communication is for, are the spectrum and the channel and the limit, and the one that the design is for. The design, and the one that the communication is for, is the one that the capacity is for, and the one that the limit is for.

::: example The noise, and the power {#ex-noisepow}
The noise spectral density is the one ten to the minus, and the twelve, and the one that the power is for. The bandwidth is the one megahertz, and the one that the frequency is for. What is the noise power, and the one that the signal is for?
::: solution
The noise power, and the one that the signal is for, is the density, and the one that the spectral is for, times the bandwidth, and the one that the frequency is for. It is the one ten to the minus, and the twelve, and the one that the power is for, times the one ten to the six, and the one that the frequency is for, and the one ten to the minus, and the six, and the one that the power is for, of the microwatt, and the one that the signal is for. The more bandwidth, and the one that the frequency is for, is the more noise, and the one that the power is for. The noise power, and the one that the signal is for, is the one that the limit is for, of the SNR, and the one that the ratio is for. So the design, and the one that the channel is for, is the one that the bandwidth and the SNR is for.
:::
:::

::: warning The image, and the mirror {#warn-img}
The bandpass, and the one that the carrier is for, of the signal, and the one that the wave is for, has the image, and the one that the frequency is for, of the mirror, and the one that the frequency is for. The positive, and the one that the frequency is for, and the negative, and the one that the frequency is for, frequency, and the one that the spectrum is for, is mirror, and the one that the image is for. The real, and the one that the signal is for, signal, and the one that the time is for, has the spectrum, and the one that the frequency is for, that is symmetric, and the one that the mirror is for. The two, and the one that the spectrum is for, are the positive and the negative, and the one that the frequency is for.
:::

::: widget plot
f: 1/(1+100*(x-5)**2)
x: 4 6
y: 0 1.1
sliders:
caption: The bandpass spectrum, and the one that the frequency is for, of the signal, and the one that the wave is for. The carrier is the one that the center is for, of the frequency. The bandwidth is the one that the limit is for, of the frequency.
:::

::: quiz
The Nyquist, and the one that the sampling is for. What is it, and the one that the rate is for?
- [x] Twice the bandwidth, and the one that the frequency is for
- [ ] Half the bandwidth
- [ ] The bandwidth
- [ ] Four times the bandwidth
::: solution
The Nyquist, and the one that the sampling is for, of the rate, and the one that the frequency is for, is the two, and the one that the factor is for, of the bandwidth, and the one that the signal is for. The bandlimited, and the one that the signal is for, is the one that the reconstruct is for, from the sample, and the one that the time is for.
:::
:::

## Where this leads

With the spectrum, and the one that the frequency is for, and the bandpass and the channel and the SNR, in hand, you have the full signal, and the one that the communication is for. The method, and the check, are the one for the spectrum and the bandwidth, and the one that is new is the communication, and the one that the signal is for. In the next lesson, you meet the amplitude modulation, and the one that the carrier is for, and the sideband and the one that the efficiency is for, and the same algebra, and the limit and the design and the check, are the ones you already have.

::: history
The radio, and the one that the wave is for, is the one that the modulation is for. The spectrum, and the one that the frequency is for, is the one that the bandwidth is for. The channel, and the one that the signal is for, is the one that the noise is for. The method, the one that the communication is for, is the one that the limit is for, and the one that the design is for.
:::

::: summary
- The spectrum of the signal is the one that the frequency is for.
- The bandlimited signal is the one that the bandwidth is for.
- The Nyquist rate is the two, and the one that the factor is for, of the bandwidth.
- The complex envelope is the one that the baseband is for.
- The AM has the bandwidth of the two, and the one that the factor is for, of the message bandwidth.
- The AWGN is the one that the additive is for, of the noise.
- The fading is the one that the multipath is for, of the channel.
- The SNR is the one that the performance is for, of the signal.
:::

## Exercises

::: exercise The spectrum {level=1}
The bandlimited signal. What is its spectrum, and the one that the frequency is for, outside the bandwidth, and the one that the frequency is for?
::: solution
The bandlimited, and the one that the signal is for, has the zero, and the one that the amplitude is for, of the spectrum outside the bandwidth, and the one that the frequency is for. The bandwidth, and the one that the signal is for, is the one that the limit is for, of the frequency, and the one that the signal is for.
:::
:::

::: exercise The Nyquist {level=1 check="2B"}
The Nyquist rate, and the one that the sampling is for. What is it, and the one that the frequency is for?
::: solution
The Nyquist rate, and the one that the sampling is for, is the two, and the one that the factor is for, of the bandwidth, and the one that the frequency is for. The sampling, and the one that the rate is for, is the one that the reconstruct is for, of the signal, and the one that the time is for, that is the possible, and the one that the frequency is for.
:::
:::

::: exercise The AM {level=1 check="2B"}
The message, and the one that the tone is for, with the bandwidth of the one kilohertz, and the one that the frequency is for. What is the AM bandwidth, and the one that the frequency is for?
::: hint
The two sidebands, and the one that the frequency is for.
:::
::: solution
The AM, and the one that the modulation is for, has the two, and the one that the sideband is for, of the sideband, and the one that the frequency is for. So the bandwidth is the two, and the one that the factor is for, of the message bandwidth, and the one that the frequency is for. It is the two, and the kilohertz is for, of the kilohertz, and the one that the frequency is for.
:::
:::

::: exercise The SNR {level=2}
The power is the one and the noise is the one hundred. What is the SNR, and the one that the ratio is for?
::: hint
The ratio, and the one that the power is for.
:::
::: solution
The SNR, and the one that the signal is for, is the power, and the one that the ratio is for, divided by the noise, and the one that the power is for. It is the one, and the one that the power is for, divided by the one hundred, and the one that the power is for, and the zero point zero one, and the one that the ratio is for. In the decibel, and the one that the ratio is for, it is the minus, and the one that the decibel is for, of the twenty, and the one that the decibel is for.
:::
:::

::: exercise The fading {level=2}
Explain, the fading, and the one that the channel is for, of the channel, and the one that the signal is for.
::: hint
The multipath, and the one that the path is for.
:::
::: solution
The fading, and the one that the channel is for, is the one that the multipath, and the one that the channel is for, of the channel, and the one that the signal is for. The received, and the one that the signal is for, is the product of the fading gain, and the one that the channel is for, and the transmitted, and the one that the signal is for, and the one that the wave is for. The fading, and the one that the gain is for, is the one that the random is for, of the gain, and the one that the channel is for, and the one that the signal is for.
:::
:::

::: exercise The envelope {level=3}
The complex envelope. Why use it, and the one that the baseband is for?
::: hint
The slow change, and the one that the frequency is for.
:::
::: solution
The complex envelope, and the one that the baseband is for, is the one that the slow is for, of the change, and the one that the frequency is for. The bandpass, and the one that the wave is for, is the one that the fast is for, of the oscillation, and the one that the signal is for. The processing, and the one that the baseband is for, of the baseband, and the one that the signal is for, is the one that the sample is for, of the low rate, and the one that the frequency is for. The modulation, and the one that the carrier is for, and the detection, and the one that the channel is for, are the same as in the baseband, and the one that the signal is for, of the signal, and the one that the frequency is for.
:::
:::

::: exercise The image {level=3}
Explain, the image, and the one that the mirror is for, of the bandpass, and the one that the spectrum is for.
::: hint
The negative frequency, and the one that the spectrum is for.
:::
::: solution
The real signal, and the one that the time is for, has the spectrum, and the one that the frequency is for, that is symmetric, and the one that the mirror is for, about the zero, and the one that the frequency is for, and the one that the signal is for. The positive, and the one that the frequency is for, frequency and the negative, and the one that the frequency is for, frequency, and the one that the spectrum is for, is the mirror image, and the one that the signal is for, and the one that the frequency is for, and the one that the wave is for, and the one that the signal is for.
:::
:::

::: exercise The design {level=3}
Explain, the trade off, and the one that the communication is for, between the bandwidth, and the one that the frequency is for, and the SNR, and the one that the signal is for.
::: hint
The bandwidth and the noise, and the one that the power is for.
:::
::: solution
The capacity, and the one that the channel is for, is the product of the bandwidth, and the one that the frequency is for, and the log of the one plus the SNR, and the one that the power is for, and the one that the signal is for. The increase, and the one that the bandwidth is for, of the bandwidth is the one that the noise is for, of the noise, and the one that the power is for, and the one that the frequency is for. The trade off, and the one that the design is for, is the one that the capacity is for, and the one that the limit is for, and the one that the channel is for.
:::
:::
