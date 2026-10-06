The controller, and the one that the feedback is for, is the one that the gain is for. The compensator, and the one that the design is for, is the one that the zero is for, and the pole is for, and the one that the specification is for. This lesson defines the compensator, and the one that the design is for, and gives the lead, and the one that the phase is for, and the lag, and the one that the steady is for, and the one that the design is for. The method, and the check, are the same as for the PID lesson, and the one that is new is the compensator, and the one that the design is for, and the one that the specification is for. The compensator, and the one that the design is for, is the one that the control, and the one that the behaviour, is for.

## The compensator and the zero

The compensator, and the one that the design is for, is the one that the pole and zero is for, and the one that the transfer function is for. The lead, and the one that the phase is for, and the lag, and the one that the steady is for, are the two, and the one that the compensator is for.

::: definition Compensator {#def-comp}
A **compensator** is a controller, and the one that the design is for, that has the zero, and the one that the s domain is for, and the pole, and the one that the s domain is for, and the one that the transfer function is for. The **lead** compensator has the zero, and the one that the s domain is for, to the left, and the one that the pole is for, of the pole, and the one that the s domain is for. The **lag** compensator has the pole, and the one that the s domain is for, to the left, and the one that the zero is for, of the zero, and the one that the s domain is for. The compensator, and the one that the design is for, is the one that the specification is for, and the one that the behaviour is for.
:::

The lead, and the one that the phase is for, is the one that the phase is for, and the one that the margin is for. The lag, and the one that the steady is for, is the one that the gain is for, and the one that the steady error is for.

::: proposition The lead compensator {#prop-lead}
The **lead** compensator, and the one that the phase is for, adds the positive, and the one that the phase is for, phase, and the one that the frequency is for, of the response, and the one that the behaviour is for. The lead, and the one that the design is for, increases the phase margin, and the one that the specification is for, and the one that the stability is for. The lead, and the one that the response is for, is the one that the overshoot is for, and the one that the settling is for. The lead, and the one that the design is for, is the one that the transient is for, and the one that the specification is for.
:::

::: example The lead, and the phase {#ex-lead}
The system, and the one that the phase margin is for, is small, and the one that the specification is for. How does the lead, and the one that the compensator is for, change the phase margin, and the one that the stability is for?
::: solution
The lead, and the one that the phase is for, adds the positive, and the one that the phase is for, phase, and the one that the frequency is for, at the frequency, and the one that the gain is for, crossing, and the one that the margin is for. So the phase margin, and the one that the specification is for, is the one that the larger is for, and the one that the stability is for. The lead, and the one that the design is for, is the one that the phase margin is for, and the one that the behaviour is for.
:::
:::

## The lag, and the steady error

The lag, and the one that the steady is for, is the one that the gain is for, and the one that the steady error is for. The lag, and the one that the compensator is for, is the one that the low, and the one that the frequency is for, is for.

::: proposition The lag compensator {#prop-lag}
The **lag** compensator, and the one that the steady is for, increases the gain, and the one that the low is for, at the low, and the one that the frequency is for, of the frequency response, and the one that the behaviour is for. The lag, and the one that the design is for, decreases the steady error, and the one that the reference is for, and the one that the specification is for. The lag, and the one that the response is for, is the one that the steady is for, and the one that the error is for. The lag, and the one that the design is for, is the one that the steady error is for, and the one that the specification is for.
:::

::: example The lag, and the steady error {#ex-lag}
The system, and the one that the steady error is for, is large, and the one that the specification is for. How does the lag, and the one that the compensator is for, change the steady error, and the one that the reference is for?
::: solution
The lag, and the one that the steady is for, increases the gain, and the one that the low is for, at the low, and the one that the frequency is for. So the steady error, and the one that the reference is for, is the one that the smaller is for, and the one that the specification is for. The lag, and the one that the design is for, is the one that the steady error is for, and the one that the behaviour is for. But the lag, and the one that the transient is for, is the one that the slower is for, and the one that the settling is for, and the one that the response is for.
:::
:::

## The design, and the specification

The design, and the one that the compensator is for, is the one that the specification is for, and the one that the behaviour is for. The design, and the one that the lead is for, and the lag, and the one that the compensator is for, is the one that the transient, and the steady, is for.

::: proposition Design by the specification {#prop-design}
The design, and the one that the compensator is for, is the choice, and the one that the specification is for, of the lead, and the one that the transient is for, for the settling, and the overshoot, and the one that the behaviour is for, and the lag, and the one that the steady is for, for the steady error, and the one that the reference is for. The design, and the one that the specification is for, is the one that the root and the frequency is for, and the one that the margin is for. The design, and the one that the compensator is for, is the one that the transient, and the steady, is for, and the one that the specification is for.
:::

::: example The design, and the phase {#ex-dsign}
The specification has the settling, and the reference is for. How is the compensator, and the one that the design is for, designed, and the one that the behaviour is for?
::: solution
The design, and the one that the specification is for, is the one that the specification is for. Choose the lead, and the one that the transient is for, for the settling, and the overshoot, and the one that the behaviour is for. Then choose the lag, and the one that the steady is for, for the steady error, and the one that the reference is for. The design, and the one that the margin is for, is checked from the gain, and phase margin, and the one that the frequency is for. The design, and the one that the specification is for, is the one that the transient, and the steady, is for.
:::
:::

::: example The lead and the lag, and the combination {#ex-comb}
The specification, and the one that the settling is for, needs the lead and the steady error, and the one that the lag is for. How is the combination, and the one that the compensator is for, designed?
::: solution
The combination, and the one that the compensator is for, is the lead, and the one that the transient is for, for the settling, and the overshoot, and the one that the behaviour is for, and the lag, and the one that the steady is for, for the steady error, and the one that the reference is for. The lag is the one that the far is for, from the crossing, and the one that the frequency is for, and the one that the phase is for, is not changed. The combination, and the one that the specification is for, is the one that the settling and steady error is for, and the one that the design is for. The design is the one that the specification is for, and the one that the behaviour is for.
:::
:::

The two, the lead and the lag, and the one that the compensator is for, are the one that the transient, and the steady, is for. The lead is the one that the transient is for, and the lag is the one that the steady is for. The two are the two, and the one that the design is for, and the one that the specification is for.

::: warning The lag, and the phase {#warn-phase}
The lag, and the one that the steady is for, is the one that the phase is for, at the frequency, and the one that the gain is for, crossing, and the one that the margin is for. So the lag, and the one that the design is for, must be the one that the far is for, from the crossing, and the one that the frequency is for, so that the phase, and the one that the margin is for, is not changed, and the one that the stability is for. The lag, and the one that the design is for, is the one that the phase is for, and the one that the specification is for.
:::

::: widget plot
f: 1/sqrt(1+(x-1)*2)
x: 0.5 3
y: 0 1.5
sliders:
caption: The phase, and the one that the degree is for, of the lead, and the one that the compensator is for, against the frequency, and the one that the log is for. The lead, and the one that the design is for, is the one that the phase is for, and the one that the margin is for. The compensator, and the one that the specification is for, is the one that the stability is for, and the one that the design is for.
:::

::: quiz
The lead, and the one that the compensator is for. What does the lead increase, and the one that the design is for?
- [x] The phase margin, and the one that the specification is for
- [ ] The steady error, and the one that the reference is for
- [ ] The resonant, and the one that the frequency is for
- [ ] The settling, and the one that the behaviour is for
::: solution
The lead, and the one that the phase is for, adds the positive, and the one that the phase is for, phase, and the one that the frequency is for. So the lead, and the one that the design is for, increases the phase margin, and the one that the specification is for. The lead, and the one that the transient is for, is the one that the overshoot and the settling is for, and the one that the design is for.
:::
:::

## Where this leads

With the compensator, and the one that the design is for, and the lead, and the lag, and the design, in hand, you have the full compensator, and the one that the specification is for. The method, and the check, are the same as for the PID lesson, and the one that is new is the compensator, and the one that the design is for. In the next lesson, you meet the state space, and the one that the system is for, and the one that the design is for, and the same algebra, and the pole and zero, and the design and the check, are the ones you already have.

::: history
The compensator, and the one that the design is for, is the one that the control is for. The lead, and the one that the phase is for, is the one that the transient is for. The lag, and the one that the steady is for, is the one that the steady error is for. The method, the one that the compensator is for, is the one that the design is for, and the one that the specification is for.
:::

::: summary
- The compensator is the one that the pole and zero is for, and the one that the design is for.
- The lead increases the phase margin, and the one that the stability is for. It is the one that the transient is for.
- The lag decreases the steady error, and the one that the reference is for. It is the one that the steady is for.
- The design is the choice of the lead for the transient, and the lag for the steady.
- The design is by the root locus, and the frequency, and the one that the design is for.
- The lag is the one that the far is for, from the crossing, and the one that the phase is for.
- The lead and the lag, and the one that the compensator is for, are the two that the transient and the steady is for.
:::

## Exercises

::: exercise The zero, and the lead {level=1 check="zero"}
The lead, and the one that the compensator is for. Where is the zero, and the one that the s domain is for, to the pole, and the one that the s domain is for?
::: solution
The lead, and the one that the phase is for, has the zero, and the one that the s domain is for, to the right, and the one that the pole is for, of the pole, and the one that the s domain is for. The zero, and the one that the phase is for, is the one that the positive is for, and the one that the phase is for. The lead, and the one that the design is for, is the one that the phase is for, and the one that the margin is for.
:::
:::

::: exercise The pole, and the lag {level=1 check="pole"}
The lag, and the one that the compensator is for. Where is the pole, and the one that the s domain is for, to the zero, and the one that the s domain is for?
::: solution
The lag, and the one that the steady is for, has the pole, and the one that the s domain is for, to the left, and the one that the zero is for, of the zero, and the one that the s domain is for. The pole, and the one that the gain is for, at the low, and the one that the frequency is for, is the one that the gain is for, and the one that the steady is for. The lag, and the one that the design is for, is the one that the steady error is for, and the one that the specification is for.
:::
:::

::: exercise The lead, and the margin {level=1}
The lead, and the one that the compensator is for. What is the effect, on the phase margin, and the one that the specification is for?
::: solution
The lead, and the one that the phase is for, adds the positive, and the one that the phase is for, phase, and the one that the frequency is for. So the lead, and the one that the design is for, increases the phase margin, and the one that the specification is for. The lead, and the one that the transient is for, is the one that the stability is for, and the one that the design is for.
:::
:::

::: exercise The lag, and the error {level=2}
Explain, why the lag, and the one that the compensator is for, decreases the steady error, and the one that the reference is for.
::: hint
The lag increases the gain, and the one that the low is for.
:::
::: solution
The lag, and the one that the steady is for, increases the gain, and the one that the low is for, at the low, and the one that the frequency is for, of the frequency response, and the one that the behaviour is for. The steady error, and the one that the reference is for, is the one that the gain is for, and the one that the DC is for. So the lag, and the one that the design is for, decreases the steady error, and the one that the specification is for. The lag, and the one that the steady is for, is the one that the steady error is for.
:::
:::

::: exercise The design {level=2}
The specification is the settling, and the steady error is for. How is the design, and the one that the compensator is for, found, and the one that the behaviour is for?
::: hint
The lead for the settling, the lag for the steady error.
:::
::: solution
The design, and the one that the specification is for, is the one that the specification is for. Choose the lead, and the one that the transient is for, for the settling, and the overshoot, and the one that the behaviour is for. Then choose the lag, and the one that the steady is for, for the steady error, and the one that the reference is for. The design, and the one that the margin is for, is checked from the gain, and phase margin, and the one that the frequency is for.
:::
:::

::: exercise The phase, and the crossing {level=3}
Explain, why the lag, and the one that the compensator is for, must be the one that the far is for, from the crossing, and the one that the frequency is for.
::: hint
The lag changes the phase, and the one that the degree is for.
:::
::: solution
The lag, and the one that the steady is for, is the one that the negative is for, at the frequency, and the one that the phase is for, and the one that the gain is for, crossing, and the one that the margin is for. So the lag, and the one that the design is for, must be the one that the far is for, from the crossing, and the one that the frequency is for, so that the phase, and the one that the margin is for, is not changed, and the one that the stability is for. The lag, and the one that the design is for, is the one that the phase is for, and the one that the specification is for.
:::
:::

::: exercise The two, and the specification {level=3}
Explain, how the lead and the lag, and the one that the compensator is for, meet the specification, and the one that the behaviour is for.
::: hint
The lead for the transient, the lag for the steady.
:::
::: solution
The lead, and the one that the transient is for, meets the settling, and the overshoot, and the rise, and the one that the transient is for. The lag, and the one that the steady is for, meets the steady error, and the one that the steady is for. The two, and the one that the compensator is for, are the one that the specification is for, and the one that the behaviour is for. The lead and the lag, and the one that the design is for, are the two that the specification is for, and the one that the design is for.
:::
:::

::: exercise The compensator, and the PID {level=3}
Explain, the relation, between the compensator, and the one that the design is for, and the PID, and the one that the controller is for.
::: hint
The PID is a form, and the one that the transfer function is for, of the compensator.
:::
::: solution
The PID, and the one that the controller is for, is a special form, and the one that the transfer function is for, of the compensator, and the one that the design is for. The compensator, and the one that the design is for, is the zero, and the one that the s domain is for, and the pole, and the one that the s domain is for. The PID, and the one that the controller is for, has the zero, and the one that the derivative is for, and the pole, and the one that the integral is for, at the origin, and the one that the s domain is for. The two are the two, and the one that the design is for, and the one that the specification is for.
:::
:::
