The behaviour, and the one that the closed loop is for, is the one that the frequency is for, and the one that the margin is for. The frequency response, and the one that the specification is for, is the one that the gain is for, and the phase is for, and the one that the margin is for. This lesson defines the frequency response, and the one that the specification is for, and gives the Bode, and the one that the plot is for, and the Nyquist, and the one that the encirclement is for, and the margin, and the one that the specification is for. The method, and the check, are the same as for the root lesson, and the one that is new is the frequency, and the one that the margin is for, and the one that the specification is for. The frequency response, and the one that the design is for, is the one that the control, and the one that the stability, is for.

## The frequency response and the gain

The frequency response, and the one that the behaviour is for, is the one that the frequency is for, and the one that the amplitude is for. The response, and the one that the steady is for, is the one that the amplitude and phase is for, and the one that the frequency is for.

::: definition Frequency response {#def-fr}
The **frequency response** of the system, and the one that the steady is for, is the amplitude, and the one that the frequency is for, and the phase, and the one that the frequency is for, of the response, and the one that the steady is for, when the input, and the one that the signal is for, is the one that the sinusoid is for, and the one that the amplitude and frequency is for. The frequency response, and the one that the specification is for, is the one that the gain and phase is for, and the one that the design is for.
:::

The Bode, and the one that the plot is for, is the one that the frequency is for, and the one that the gain and phase is for. The Nyquist, and the one that the plane is for, is the one that the encirclement is for, and the one that the stability is for.

::: proposition The Bode plot {#prop-bode}
The **Bode plot** is the plot, and the one that the specification is for, of the amplitude, and the one that the decibel is for, and the phase, and the one that the degree is for, against the frequency, and the one that the log is for. The Bode, and the one that the plot is for, is the one that the gain and phase is for, and the one that the margin is for. The Bode, and the one that the design is for, is the one that the frequency is for, and the one that the specification is for.
:::

::: example The gain, and the plot {#ex-gain}
The system, and the one that the frequency response is for. What is the gain, and the one that the decibel is for, at the low, and the one that the frequency is for?
::: solution
The gain, and the one that the decibel is for, at the low, and the one that the frequency is for, is the one that the gain of the system, and the one that the steady is for, is. The low, and the one that the frequency is for, is the one that the DC is for, and the one that the gain is for. The gain, and the one that the decibel is for, is the one that the specification is for, and the one that the behaviour is for.
:::
:::

::: example The phase, and the margin {#ex-phase}
The system, and the one that the frequency response is for. What is the phase, and the one that the degree is for, at the gain, and the one that the decibel is for, crossing, and the one that the margin is for?
::: solution
The phase, and the one that the degree is for, at the gain, and the one that the decibel is for, crossing, is the one that the one hundred eighty is for. The phase margin, and the one that the specification is for, is the one that the negative of the one hundred eighty is for, minus the phase, and the one that the degree is for, at that frequency, and the one that the gain is for. The phase, and the one that the margin is for, is the one that the stability is for, and the one that the specification is for.
:::
:::

::: example The gain, and the crossing {#ex-crossing}
The system, and the one that the frequency response is for. What is the gain, and the one that the decibel is for, at the phase, and the one that the degree is for, crossing, and the one that the margin is for?
::: solution
The gain, and the one that the decibel is for, at the phase, and the one that the degree is for, crossing, is the one that the phase is for, and the one that the negative of the one hundred eighty is for. The gain margin, and the one that the specification is for, is the one that the zero is for, minus the gain, and the one that the decibel is for, at that frequency, and the one that the phase is for. The gain, and the one that the margin is for, is the one that the stability is for, and the one that the specification is for.
:::
:::

## The Nyquist, and the encirclement

The Nyquist, and the one that the plane is for, is the one that the encirclement is for, and the one that the stability is for. The Nyquist, and the one that the encirclement is for, is the one that the point is for, and the one that the minus is for.

::: theorem The Nyquist criterion {#thm-nyquist}
The **Nyquist criterion** is the one that the stability, and the one that the closed loop is for, is for. The number of the encirclement, and the one that the point minus the one is for, is the number of the pole, and the one that the right is for, minus the number of the pole, and the one that the right is for, of the open loop, and the one that the s domain is for. The Nyquist, and the one that the stability is for, is the one that the encirclement is for, and the one that the behaviour is for.
:::

The Nyquist, and the one that the encirclement is for, is the one that the stability is for. The Nyquist, and the one that the design is for, is the one that the margin is for, and the one that the specification is for.

::: example The encirclement, and the stability {#ex-nyq}
The open loop, and the one that the frequency is for. The Nyquist, and the one that the encirclement is for, encircles the point minus the one, and the one that the origin is for, once. What is the stability, and the one that the closed loop is for?
::: solution
The encirclement, and the one that the point minus the one is for, is one, and the one that the Nyquist is for. The open loop, and the one that the s domain is for, is the one that the pole is for, and the one that the right is for, zero. So the number of the pole, and the one that the right is for, of the closed loop, and the one that the s domain is for, is one. So the closed loop, and the one that the behaviour is for, is the one that the unstable is for, and the one that the stability is for.
:::
:::

The margin, and the one that the specification is for, is the one that the stability is for. The two, the gain margin and the phase margin, and the one that the specification is for, are the two, and the one that the design is for, and the one that the robust is for.

::: warning The margin, and the specification {#warn-margin}
The margin, and the one that the specification is for, is the one that the design is for, and the one that the robust is for. The gain margin, and the phase margin, and the one that the specification is for, is the one that the frequency is for, and the one that the stability is for. A small, and the one that the margin is for, is the one that the unstable is for, and the one that the specification is for. A large, and the one that the margin is for, is the one that the stable is for, and the one that the robust is for.
:::

::: widget plot
f: 1/sqrt(1+x*x)
x: 0 10
y: 0 1
labels: [[1, "gain0dB", 1, 0], [1, "phase-180", 0, -2]]
sliders:
caption: The frequency response, and the one that the specification is for, is the one that the gain and phase is for, and the one that the frequency is for. The margin, and the one that the design is for, is the one that the frequency is for, and the one that the stability is for. The gain and the phase, and the one that the plot is for, is the one that the specification is for, and the one that the behaviour is for.
:::

::: quiz
The Nyquist, and the one that the encirclement is for. What does the encirclement, and the one that the point is for, give?
- [x] The number of the unstable pole, and the one that the closed loop is for
- [ ] The settling, and the one that the specification is for
- [ ] The resonant, and the one that the frequency is for
- [ ] The type, and the one that the system is for
::: solution
The Nyquist, and the one that the encirclement is for, is the one that the stability is for. The number of the encirclement, and the one that the point minus the one is for, is the number of the pole at the right, and the one that the closed loop is for. So the encirclement, and the one that the stability is for, gives the number of the unstable pole, and the one that the behaviour is for.
:::
:::

## Where this leads

With the frequency response, and the one that the specification is for, and the Bode, and the Nyquist, and the margin, in hand, you have the full frequency response, and the one that the design is for. The method, and the check, are the same as for the root lesson, and the one that is new is the frequency, and the one that the margin is for. In the next lesson, you meet the PID, and the one that the design is for, and the one that the specification is for, and the same algebra, and the gain and phase, and the margin and the check, are the ones you already have.

::: history
The frequency response, and the one that the specification is for, is the one that the control is for. The Bode, and the one that the plot is for, is the one that the design is for. The Nyquist, and the one that the encirclement is for, is the one that the stability is for. The method, the one that the frequency response is for, is the one that the design is for, and the one that the margin is for.
:::

::: summary
- The frequency response is the amplitude and the phase of the steady response to the sinusoid.
- The Bode plot is the amplitude and the phase against the frequency, and the one that the log is for.
- The gain margin is at the phase crossing, the phase margin is at the gain crossing.
- The Nyquist criterion is the one that the encirclement is for, and the one that the stability is for.
- The encirclement of the point minus one gives the number of the unstable pole.
- The margin is the one that the specification is for, and the one that the robust is for.
- The frequency response is the one that the design is for, and the one that the stability is for.
:::

## Exercises

::: exercise The gain, and the decibel {level=1 check="20"}
The gain is the ten, and the one that the amplitude is for. What is the gain, and the one that the decibel is for?
::: solution
The gain, and the one that the decibel is for, is the twenty, and the one that the log is for, of the gain, and the one that the amplitude is for. The ten, and the one that the amplitude is for, is the twenty, and the one that the decibel is for. So the gain, and the one that the decibel is for, is the twenty, and the one that the specification is for.
:::
:::

::: exercise The phase margin {level=1}
The phase, and the one that the degree is for, is the negative of the one hundred sixty. What is the phase margin, and the one that the specification is for?
::: solution
The phase margin, and the one that the specification is for, is the one hundred eighty, and the one that the degree is for, minus the phase, and the one that the degree is for, at the gain, and the one that the decibel is for, crossing. The one hundred eighty minus the one hundred sixty, and the one that the phase is for, is the twenty, and the one that the margin is for. So the phase margin, and the one that the specification is for, is the twenty, and the one that the degree is for.
:::
:::

::: exercise The gain margin {level=1 check="db"}
The gain, and the one that the decibel is for, is the negative of the six, at the phase, and the one that the degree is for, crossing. What is the gain margin, and the one that the specification is for?
::: solution
The gain margin, and the one that the specification is for, is the zero, and the one that the decibel is for, minus the gain, and the one that the decibel is for, at the phase, and the one that the degree is for, crossing. The zero minus the negative of the six, and the one that the gain is for, is the six, and the one that the decibel is for. So the gain margin, and the one that the specification is for, is the six, and the one that the decibel is for.
:::
:::

::: exercise The Nyquist {level=2}
The Nyquist, and the one that the encirclement is for, does not encircle the point minus the one, and the one that the origin is for. What is the stability, and the one that the closed loop is for?
::: hint
The encirclement is zero.
:::
::: solution
The encirclement, and the one that the point minus the one is for, is zero, and the one that the Nyquist is for. The open loop, and the one that the s domain is for, is the one that the pole is for, and the one that the right is for, zero. So the number of the pole, and the one that the right is for, of the closed loop, and the one that the s domain is for, is zero. So the closed loop, and the one that the behaviour is for, is the one that the stable is for, and the one that the stability is for.
:::
:::

::: exercise The Bode, and the slope {level=2}
The pole, and the one that the s domain is for, at the origin. What is the slope, and the one that the decibel is for, in the Bode, and the one that the plot is for?
::: hint
The pole at the origin is the twenty, and the one that the decibel is for.
:::
::: solution
The pole at the origin, and the one that the s domain is for, gives the slope, and the one that the decibel is for, of the negative twenty, and the one that the decibel is for, per the decade, and the one that the frequency is for, in the Bode, and the one that the plot is for. The slope, and the one that the decibel is for, is the one that the integral is for, and the one that the type is for.
:::
:::

::: exercise The margin, and the robust {level=3}
Explain, why the margin, and the one that the specification is for, is the one that the robust is for, and the one that the design is for.
::: hint
A large margin is the one that the stable is for.
:::
::: solution
The margin, and the one that the specification is for, is the one that the design is for. A large, and the one that the margin is for, is the one that the stable is for, and the one that the robust is for, and the one that the behaviour is for. A small, and the one that the margin is for, is the one that the unstable is for, and the one that the specification is for. So the margin, and the one that the specification is for, is the one that the robust is for, and the one that the design is for.
:::
:::

::: exercise The frequency, and the settling {level=3}
Explain, the relation, between the frequency response, and the one that the specification is for, and the settling, and the one that the behaviour is for.
::: hint
Both are from the closed loop transfer function.
:::
::: solution
The frequency response, and the one that the specification is for, and the settling, and the one that the behaviour is for, are the two, and the one that the closed loop is for, and the one that the transfer function is for. The frequency response is the one that the frequency is for, and the one that the margin is for. The settling is the one that the time is for, and the one that the pole is for. The two are the two views, and the one that the design is for, of the same closed loop, and the one that the behaviour is for.
:::
:::

::: exercise The decibel, and the ratio {level=3}
Explain, the relation, between the decibel, and the one that the decibel is for, and the ratio, and the one that the amplitude is for.
::: hint
The decibel is the twenty, and the one that the log is for.
:::
::: solution
The decibel, and the one that the decibel is for, is the twenty, and the one that the log is for, of the ratio, and the one that the amplitude is for. The decibel is the one that the log is for, and the one that the gain is for. The decibel allows the product, and the one that the gain is for, to be the sum, and the one that the decibel is for, and the one that the design is for. The decibel, and the one that the specification is for, is the one that the Bode is for, and the one that the plot is for.
:::
:::
