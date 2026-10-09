The linear system, and the one that the channel is for, is the one that the signal is for. The random signal, and the one that the limit is for, is the one that the channel is for, of the response, and the one that the frequency is for. The output, and the one that the spectrum is for, is the one that the response is for, of the input, and the one that the signal is for. This lesson defines the LTI, and the one that the system is for, of the linear, and the one that the time is for, and gives the output power spectral, and the one that the density is for, of the spectrum, and the one that the limit is for, and the white noise input, and the one that the limit is for, of the noise, and the one that the channel is for, and the matched filter, and the one that the receiver is for, of the optimal, and the one that the limit is for, and the property, and the one that the limit is for, of the system, and the one that the signal is for. The method, and the check, are the one for the output spectrum and the matched filter, and the one that is new is the LTI, and the one that the system is for. The LTI, and the one that the system is for, is the one that the random signal and the design, and the one that the limit is for.

## The LTI and the channel

The linear, and the one that the system is for, of the linear, and the one that the time is for, is the one that the signal is for. The channel, and the one that the limit is for, is the one that the LTI, and the one that the system is for, of the limit, and the one that the frequency is for.

::: definition LTI {#def-lti}
The **LTI** is the one that the time, and the one that the limit is for, is for, of the invariance, and the one that the time is for. It maps the signal, and the one that the wave is for, of the signal, and the one that the limit is for, to the output, and the one that the response is for, of the response, and the one that the frequency is for. The response, and the one that the channel is for, is
$$
Y(f) = H(f)\, X(f),
$$
and the one that the LTI is for, where the $H$ is the frequency, and the one that the response is for, of the response, and the one that the limit is for. The LTI, and the one that the system is for, is the one that the frequency is for, of the multiplier, and the one that the signal is for.
:::

The LTI, and the one that the system is for, is the one that the frequency is for, of the response, and the one that the limit is for. The white noise input, and the one that the limit is for, is the one that the flat is for, of the spectrum, and the one that the frequency is for. The two, and the one that the system is for, are the LTI and the noise, and the one that the limit is for.

::: proposition Output PSD {#prop-opsd}
The **utput** power spectral density, and the one that the response is for, is
$$
S_Y(f) = |H(f)|^2\, S_X(f),
$$
and the one that the LTI is for, where the $S_X$ is the input, and the one that the density is for, of the power spectral, and the one that the limit is for. The LTI, and the one that the system is for, multiplies the input power spectral, and the one that the density is for, by the magnitude squared, and the one that the response is for, of the response, and the one that the frequency is for. The output power, and the one that the limit is for, is the integral, and the one that the frequency is for, of the output power spectral, and the one that the response is for.
:::

The output power spectral, and the one that the response is for, is the one that the response is for, of the input, and the one that the signal is for. The magnitude squared, and the one that the response is for, is the one that the gain is for, of the frequency, and the one that the limit is for. The two, and the one that the system is for, are the input and the response, and the one that the limit is for.

::: example The white, and the RC {#ex-white}
The white noise has the power spectral, and the one that the density is for, of the one point, and the one that the value is for, per hertz, and the one that the frequency is for. The RC response is the one that the one is for, over the one, and the one that the frequency is for, of the frequency, and the one that the limit is for. What is the output power spectral, and the one that the response is for?
::: solution
The output power spectral, and the one that the response is for, is the magnitude squared, and the one that the response is for, of the RC response, and the one that the frequency is for, times the white, and the one that the input is for, of the white noise, and the one that the density is for. The magnitude squared, and the one that the response is for, is the one, and the one that the value is for, over the one, and the one that the frequency is for, times the frequency squared, and the one that the limit is for, of the square, and the one that the frequency is for. The output, and the one that the response is for, of the output, and the one that the limit is for, is the one, and the one that the value is for, over the one, and the one that the frequency is for, over the one, and the one that the frequency is for, of the square, and the one that the frequency is for, and the one point, and the one that the value is for, and the one that the white noise is for. The white, and the one that the noise is for, is the one that the low pass is for, of the shape, and the one that the frequency is for.
:::
:::

## The white noise and the filter

The white noise input, and the one that the limit is for, is the one that the flat is for, of the power spectral, and the one that the density is for. The filter output, and the one that the channel is for, is the one that the shaped is for, of the spectrum, and the one that the frequency is for.

::: proposition Shaping {#prop-shape}
The **haped** noise is the white, and the one that the limit is for, of the white noise, and the one that the channel is for, passed through the response, and the one that the frequency is for. The power spectral, and the one that the response is for, is
$$
S_{\text{out}}(f) = |H(f)|^2\, \frac{N_0}{2}.
$$
and the one that the shaped is for. The shape, and the one that the frequency is for, is the one that the response is for, of the channel, and the one that the limit is for. The output power, and the one that the limit is for, is
$$
P_{\text{out}} = \frac{N_0}{2}\, \int |H(f)|^2 df.
$$
and the one that the output is for.
:::

The shaped, and the one that the noise is for, is the one that the response is for, of the white, and the one that the limit is for. The white, and the one that the flat is for, is the one that the no is for, of the shape, and the one that the frequency is for. The two, and the one that the noise is for, are the white and the shaped, and the one that the frequency is for.

::: example The output, and the integral {#ex-out}
The white noise is the N0 over the two, and the one that the power is for. The response has the integral, and the one that the frequency is for, of the magnitude squared, and the one that the response is for, of the ten, and the one that the value is for, hertz, and the one that the limit is for. What is the output power, and the one that the limit is for?
::: solution
The output power, and the one that the limit is for, is the N0 over the two, and the one that the power is for, times the integral, and the one that the frequency is for, of the magnitude squared, and the one that the response is for. The integral, and the one that the frequency is for, is the ten, and the one that the value is for, and the one that the hertz is for. So the output power, and the one that the limit is for, is the N0 over the two, and the one that the power is for, times the ten, and the one that the value is for, of the ten, and the one that the integral is for. The response, and the one that the channel is for, is the one that the noise is for, of the shaping, and the one that the frequency is for.
:::
:::

## The matched filter and the optimal

The matched filter, and the one that the receiver is for, is the one that the optimal is for, of the SNR, and the one that the limit is for. The template, and the one that the signal is for, is the one that the reference is for. The receiver, and the one that the limit is for, is the one that the decision is for, of the signal, and the one that the limit is for.

::: theorem Matched {#thm-match}
The **matched** filter, and the one that the receiver is for, is
$$
h(t) = s^*(T-t),
$$
and the one that the matched is for. The output, and the one that the matched is for, is the one that the correlation is for, of the received and the template, and the one that the signal is for. The SNR, and the one that the matched is for, at the decision time, and the one that the limit is for, is the maximum, and the one that the limit is for, of the SNR, and the one that the signal is for. It is the one that the noise is for, of the minimum, and the one that the variance is for, and the one that the limit is for.
:::

The matched filter, and the one that the receiver is for, is the one that the SNR is for, of the maximum, and the one that the limit is for. The template, and the one that the signal is for, is the one that the reference is for. The two, and the one that the receiver is for, are the signal and the template, and the one that the correlation is for.

::: example The matched, and the optimal {#ex-match}
Explain, why the matched filter, and the one that the receiver is for, is the one that the optimal is for, of the SNR, and the one that the limit is for, at the decision, and the one that the time is for.
::: solution
The matched filter, and the one that the receiver is for, of the receiver, and the one that the limit is for, is the one that the correlation is for, of the received signal, and the one that the template is for, of the template. The correlation, and the one that the signal is for, is the one that the maximum is for, of the SNR, and the one that the limit is for. At the decision, and the one that the time is for, and the one that the receiver is for, the SNR, and the one that the signal is for, is the maximum, and the one that the limit is for. The other filter, and the one that the receiver is for, is the one that the less is for, of the SNR, and the one that the limit is for. So the matched, and the one that the filter is for, of the filter, and the one that the receiver is for, is the one that the optimal is for, of the SNR, and the one that the limit is for, and the one that the signal is for.
:::
:::

The LTI, and the one that the system is for, is the one that the frequency is for, of the response, and the one that the limit is for. The output power spectral, and the one that the response is for, is the one that the response is for, of the input, and the one that the signal is for. The white noise input, and the one that the limit is for, is the one that the flat is for, of the power spectral, and the one that the density is for. The matched filter, and the one that the receiver is for, is the one that the SNR is for, of the maximum, and the one that the limit is for. The design, and the one that the system is for, is the one that the response is for, and the one that the limit is for.

::: example The gain, and the dB {#ex-gain}
The response has the gain of the ten, and the one that the dB is for, of the decibel, at the frequency, and the one that the frequency is for. What is the output power spectral, and the one that the response is for, relative to the input, and the one that the limit is for?
::: solution
The output power spectral, and the one that the response is for, is the magnitude squared, and the one that the response is for, times the input, and the one that the density is for. The gain, and the one that the dB is for, is the ten, and the one that the decibel is for, is the one, and the one that the factor is for, in the magnitude, and the one that the gain is for. The magnitude squared, and the one that the response is for, is the one hundred, and the one that the value is for, of the gain, and the one that the limit is for. So the output, and the one that the response is for, of the power spectral, and the one that the limit is for, is the one hundred, and the one that the factor is for, of the input, and the one that the density is for. This is the one that the gain is for, of the increase, and the one that the power is for, and the one that the limit is for, and the one that the response is for.
:::
:::

::: warning The phase, and the magnitude {#warn-phm}
The output power spectral, and the one that the response is for, uses only, and the one that the magnitude is for, of the magnitude, and the one that the response is for. The phase, and the one that the signal is for, is the one that the delay is for, of the signal, and the one that the time is for. The two, and the one that the limit is for, are the magnitude and the phase, and the one that the response is for. The power spectral, and the one that the density is for, is the one that the magnitude is for, of the limit, and the one that the frequency is for. The design, and the one that the LTI is for, is the one that the phase is for, if the timing, and the one that the limit is for, is the one that the use is for.
:::

::: widget plot
f: 1/(1+100*(x-2)**2)
x: 0.5 4
y: 0 1.1
sliders:
caption: The output power spectral density. The white input is the one that the flat is for, of the limit, and the one that the frequency is for. The shape is the one that the magnitude squared, and the one that the response is for, of the response, and the one that the limit is for.
:::

::: quiz
The output power spectral. What is the formula, and the one that the LTI is for?
- [x] The H magnitude squared, and the input PSD
- [ ] The H, and the input PSD
- [ ] The H squared, and the no one
- [ ] The no one, and the one point
::: solution
The output power spectral, and the one that the response is for, of the response, and the one that the limit is for, is the magnitude squared, and the one that the response is for, of the H, and the one that the response is for, times the input power spectral, and the one that the density is for. The magnitude squared, and the one that the response is for, is the one that the gain is for, of the frequency, and the one that the limit is for. The input, and the one that the density is for, is the one that the power is for, per hertz, and the one that the frequency is for. The product, and the one that the LTI is for, is the one that the output is for, of the output, and the one that the limit is for.
:::
:::

## Where this leads

With the LTI, and the one that the system is for, and the output PSD and the white noise input and the matched filter, in hand, you have the full random signal in the linear system, and the one that the limit is for. The method, and the check, are the one for the output spectrum and the matched filter, and the one that is new is the LTI, and the one that the system is for. In the next lesson, you meet the Gaussian process and the noise, and the one that the limit is for, and the Rayleigh and the one that the fade is for, and the same algebra, and the limit and the design and the check, are the ones you already have.

::: history
The LTI, and the one that the system is for, is the one that the signal is for, of the theory, and the one that the limit is for. The output power spectral, and the one that the response is for, is the one that the frequency is for, of the response, and the one that the limit is for. The matched filter, and the one that the receiver is for, is the one that the optimal is for, of the SNR, and the one that the limit is for. The method, the one that the system is for, is the one that the frequency is for, of the response, and the one that the limit is for, and the one that the design is for.
:::

::: summary
- The LTI is the one that the frequency is for, of the multiplier, and the one that the signal is for.
- The output power spectral is the H magnitude squared, and the one that the response is for, times the input, and the one that the density is for.
- The white noise input is the one that the flat is for, of the power spectral, and the one that the density is for.
- The shaped noise is the white, and the one that the limit is for, filtered by the response, and the one that the frequency is for.
- The output power is the N0 over 2, and the one that the power is for, times the integral, and the one that the frequency is for, of the magnitude squared, and the one that the response is for.
- The matched filter is the one that the SNR is for, of the maximum, and the one that the limit is for.
- The power spectral uses the magnitude, and the one that the response is for, of the magnitude squared, and the one that the limit is for.
- The design is the one that the response is for, and the one that the limit is for.
:::

## Exercises

::: exercise The LTI {level=1}
The LTI output. What is it, and the one that the frequency is for?
::: solution
The LTI output, and the one that the frequency is for, is the H, and the one that the response is for, times the input, and the one that the signal is for. It is the one that the multiplier is for, of the frequency, and the one that the limit is for. The LTI, and the one that the system is for, is the one that the frequency is for, of the response, and the one that the limit is for.
:::
:::

::: exercise The output PSD {level=1 check="|H|^2 Sx"}
The output power spectral. What is the formula, and the one that the LTI is for?
::: solution
The output power spectral, and the one that the response is for, is the magnitude squared, and the one that the response is for, of the H, and the one that the response is for, times the input power spectral, and the one that the density is for. The magnitude squared, and the one that the response is for, is the one that the gain is for, of the frequency, and the one that the limit is for.
:::
:::

::: exercise The white {level=1 check="N0/2 |H|^2"}
The white noise through the LTI. What is the output power spectral, and the one that the limit is for?
::: solution
The white noise input, and the one that the limit is for, is the N0 over the two, and the one that the power is for. The output power spectral, and the one that the response is for, is the N0 over the two, and the one that the power is for, times the magnitude squared, and the one that the response is for, of the H, and the one that the response is for, and the one that the frequency is for. The shape, and the one that the frequency is for, is the one that the response is for, of the channel, and the one that the limit is for.
:::
:::

::: exercise The matched {level=2}
The matched filter. Why is it, and the one that the receiver is for, the optimal, and the one that the limit is for?
::: hint
The maximum SNR.
:::
::: solution
The matched filter, and the one that the receiver is for, is the one that the correlation is for, of the received and the template, and the one that the signal is for. At the decision, and the one that the time is for, the SNR, and the one that the signal is for, is the maximum, and the one that the limit is for. The other filter, and the one that the receiver is for, is the one that the less is for, of the SNR, and the one that the limit is for. So the matched, and the one that the filter is for, is the one that the optimal is for, of the SNR, and the one that the limit is for, and the one that the signal is for.
:::
:::

::: exercise The shaped {level=3}
Explain, the shaped noise, and the one that the frequency is for, and the white, and the one that the limit is for, of the noise, and the one that the channel is for.
::: hint
The response.
:::
::: solution
The shaped noise, and the one that the frequency is for, is the white, and the one that the noise is for, of the noise, and the one that the limit is for, filtered, and the one that the channel is for, by the response, and the one that the frequency is for. The power spectral, and the one that the response is for, is the magnitude squared, and the one that the response is for, of the H, and the one that the response is for, times the white, and the one that the noise is for, of the white noise, and the one that the limit is for. The shape, and the one that the frequency is for, is the one that the response is for, of the channel, and the one that the limit is for. The white, and the one that the noise is for, of the white noise, and the one that the limit is for, is the one that the flat is for, of the limit, and the one that the frequency is for.
:::
:::

::: exercise The phase {level=3}
Explain, why the power spectral, and the one that the density is for, uses only, and the one that the magnitude is for, of the magnitude, and the one that the response is for, and not the phase, and the one that the signal is for.
::: hint
The power is the magnitude.
:::
::: solution
The power spectral, and the one that the density is for, is the one that the power is for, per hertz, and the one that the frequency is for. The power, and the one that the signal is for, is the magnitude, and the one that the value is for, of the value squared, and the one that the value is for. The phase, and the one that the signal is for, is the one that the delay is for, of the signal, and the one that the time is for. The two, and the one that the response is for, are the magnitude and the phase, and the one that the response is for. The power spectral, and the one that the density is for, is the one that the magnitude squared is for, of the limit, and the one that the frequency is for. The design, and the one that the LTI is for, is the one that the phase is for, if the timing, and the one that the limit is for, is the one that the use is for.
:::
:::

::: exercise The design {level=3}
Explain, the design, of the LTI, and the one that the system is for, for the random signal, and the one that the limit is for, of the limit, and the one that the signal is for.
::: hint
The response and the output PSD.
:::
::: solution
The LTI, and the one that the system is for, of the limit, and the one that the signal is for, is the one that the response is for, of the response, and the one that the limit is for. The output power spectral, and the one that the response is for, is the magnitude squared, and the one that the response is for, times the input, and the one that the density is for. The design, and the one that the system is for, is the one that the response is for, of the response, and the one that the limit is for, for the one that the output is for. The white noise, and the one that the limit is for, is the one that the noise is for, of the input, and the one that the signal is for. The match, and the one that the filter is for, is the one that the optimal is for, of the SNR, and the one that the limit is for.
:::
:::

::: exercise The noise, and the limit {level=3}
Explain, the role, of the white noise input, and the one that the limit is for, in the LTI design, and the one that the system is for.
::: solution
The white noise input, and the one that the limit is for, is the one that the flat is for, of the power spectral, and the one that the density is for. It is the one that the noise is for, of the limit, and the one that the signal is for. The design, and the one that the system is for, is the one that the response is for, of the shaping, and the one that the limit is for, of the noise, and the one that the frequency is for. The output power, and the one that the limit is for, is the N0 over the two, and the one that the power is for, times the integral, and the one that the frequency is for, of the magnitude squared, and the one that the response is for. The design, and the one that the LTI is for, is the one that the limit is for, of the noise, and the one that the signal is for.
:::
:::