The controller, and the one that the feedback is for, is the one that the gain is for, and the one that the specification is for. The PID, and the one that the controller is for, is the one that the proportional, and the integral, and the derivative is for, and the one that the design is for. This lesson defines the PID, and the one that the controller is for, and gives the effect, and the one that the specification is for, of the proportional, the integral, and the derivative, on the response, and the one that the behaviour is for. The method, and the check, are the same as for the frequency lesson, and the one that is new is the PID, and the one that the design is for, and the one that the specification is for. The PID, and the one that the controller is for, is the one that the control, and the one that the behaviour, is for.

## The PID and the transfer function

The PID, and the one that the controller is for, is the one that the three terms are for, and the one that the design is for. The transfer function, and the one that the s domain is for, is the one that the proportional, and the integral, and the derivative is for.

::: definition PID controller {#def-pid}
The **PID controller** has the transfer function, and the one that the s domain is for,
$$
C(s) = K_p + \frac{K_i}{s} + K_d s,
$$
and the one that the controller is for. The $K_p$ is the proportional, and the one that the gain is for. The $K_i$ is the integral, and the one that the steady is for. The $K_d$ is the derivative, and the one that the transient is for. The PID, and the one that the controller is for, is the one that the design is for, and the one that the specification is for.
:::

The proportional, and the one that the gain is for, is the one that the response is for, and the one that the behaviour is for. The integral, and the one that the steady is for, is the one that the steady error is for, and the one that the specification is for. The derivative, and the one that the transient is for, is the one that the transient is for, and the one that the behaviour is for.

## The proportional, and the gain

The proportional, and the one that the gain is for, is the one that the response is for, and the one that the steady error is for.

::: proposition The proportional effect {#prop-proportional}
The proportional, and the one that the gain is for, increases the response, and the one that the transient is for, and the one that the settling is for. The proportional, and the one that the specification is for, increases the steady error, and the one that the behaviour is for, is the one that the error is for, as the gain, and the one that the proportional is for, goes to the zero, and the one that the specification is for. The proportional, and the one that the design is for, is the one that the speed is for, and the one that the response is for.
:::

::: example The proportional, and the settling {#ex-proportional}
The system, and the one that the controller is for. How does the proportional, and the one that the gain is for, change the settling, and the one that the behaviour is for?
::: solution
The proportional, and the one that the gain is for, increases the closed loop, and the one that the pole is for, and the one that the real is for, and the one that the s domain is for. So the settling, and the one that the behaviour is for, is the one that the faster is for, and the one that the response is for. The proportional, and the one that the specification is for, is the one that the speed is for, and the one that the design is for. But the proportional, and the one that the gain is for, cannot make the steady error, and the one that the specification is for, zero, and the one that the behaviour is for.
:::
:::

## The integral, and the steady error

The integral, and the one that the steady is for, is the one that the steady error is for, and the one that the specification is for. The integral, and the one that the controller is for, is the one that the type is for, and the one that the system is for.

::: proposition The integral effect {#prop-integral}
The integral, and the one that the steady is for, increases the type, and the one that the system is for, of the closed loop, and the one that the s domain is for. So the integral, and the one that the specification is for, makes the steady error, and the one that the reference is for, zero, and the one that the step is for. The integral, and the one that the design is for, is the one that the steady error is for, and the one that the specification is for. But the integral, and the one that the transient is for, adds the pole, and the one that the origin is for, and the one that the stability is for, and the one that the behaviour is for.
:::

::: example The integral, and the steady error {#ex-integral}
The system, and the one that the type is for, is the zero, and the one that the steady error is for. How does the integral, and the one that the controller is for, change the steady error, and the one that the specification is for?
::: solution
The integral, and the one that the controller is for, adds the pole, and the one that the origin is for, to the closed loop, and the one that the s domain is for. So the type, and the one that the system is for, is increased by one, and the one that the integral is for. So the steady error, and the one that the step is for, is the one that the zero is for, and the one that the specification is for. The integral, and the one that the design is for, is the one that the steady error is for, and the one that the behaviour is for.
:::
:::

## The derivative, and the transient

The derivative, and the one that the transient is for, is the one that the transient is for, and the one that the behaviour is for. The derivative, and the one that the controller is for, is the one that the damping is for, and the one that the response is for.

::: proposition The derivative effect {#prop-derivative}
The derivative, and the one that the transient is for, adds the zero, and the one that the s domain is for, to the closed loop, and the one that the behaviour is for. The derivative, and the one that the design is for, is the one that the damping is for, and the one that the overshoot is for. The derivative, and the one that the specification is for, reduces the overshoot, and the one that the settling is for. But the derivative, and the one that the frequency is for, is the one that the noise is for, and the one that the high is for.
:::

::: example The derivative, and the overshoot {#ex-derivative}
The system, and the one that the overshoot is for, is large, and the one that the specification is for. How does the derivative, and the one that the controller is for, change the overshoot, and the one that the behaviour is for?
::: solution
The derivative, and the one that the controller is for, adds the zero, and the one that the s domain is for, to the closed loop, and the one that the behaviour is for. The zero, and the one that the damping is for, increases the damping, and the one that the response is for, of the closed loop, and the one that the s domain is for. So the overshoot, and the one that the specification is for, is the one that the smaller is for, and the one that the behaviour is for. The derivative, and the one that the design is for, is the one that the overshoot is for, and the one that the settling is for.
:::
:::

::: example The tuning, and the formula {#ex-zn}
The tuning, and the one that the PID is for, by the formula, and the one that the rule is for. What is the formula, and the one that the gain is for?
::: solution
The tuning, and the one that the rule is for, for example the formula, and the one that the rule is for, finds the gain, and the one that the oscillation is for, that gives the sustained oscillation, and the one that the response is for, of the closed loop, and the one that the behaviour is for. The Kp, and the one that the gain is for, is the one that the formula is for, of the gain, and the one that the oscillation is for, the time, and the one that the oscillation is for, and the one that the response is for. The Ki, and the one that the steady is for, and the Kd, and the one that the transient is for, are the one that the formula is for, and the one that the oscillation is for. The tuning, and the one that the design is for, is the one that the rule is for, and the one that the specification is for.
:::
:::

## The tuning, and the specification

The tuning, and the one that the PID is for, is the one that the specification is for, and the one that the design is for. The tuning, and the one that the gain is for, is the one that the proportional, and the integral, and the derivative is for.

::: proposition Tuning by the specification {#prop-tuning}
The tuning, and the one that the PID is for, is the choice, and the one that the design is for, of the $K_p$, and the $K_i$, and the $K_d$, so that the closed loop, and the one that the behaviour is for, meets the settling, and the overshoot, and the steady error, and the one that the specification is for. The tuning, and the one that the design is for, is the one that the specification is for, and the one that the behaviour is for. The tuning, and the one that the root is for, and the frequency, and the one that the margin is for, is the method, and the one that the design is for, for the tuning, and the one that the specification is for.
:::

The tuning, and the one that the design is for, is the one that the specification is for. The two, the root and the frequency, and the one that the design is for, are the method, and the one that the tuning is for, for the tuning, and the one that the PID is for.

::: warning The derivative, and the kick {#warn-kick}
The derivative, and the one that the transient is for, on the reference, and the one that the signal is for, gives the derivative, and the one that the large is for, of a change, and the one that the step is for, in the reference, and the one that the signal is for. This is called the derivative, and the one that the kick is for, and the one that the derivative is for. The derivative, and the one that the action is for, on the error, and the one that the feedback is for, avoids the kick, and the one that the reference is for. The derivative, and the one that the design is for, is the one that the kick is for, and the one that the specification is for.
:::

::: widget plot
f: 1-exp(-x)
x: 0 5
y: 0 1
sliders:
caption: The closed loop, and the one that the behaviour is for, with the proportional, and the gain is for, and the one that the response is for. The proportional, and the one that the design is for, is the one that the speed is for, and the one that the settling is for. The integral, and the one that the steady is for, is the one that the steady error is for, and the one that the specification is for.
:::

::: quiz
The integral, and the one that the controller is for. What is the effect on the steady error?
- [x] Decreases to zero, and the one that the step is for
- [ ] Increases, and the one that the step is for
- [ ] No change, and the one that the step is for
- [ ] The resonant, and the one that the frequency is for
::: solution
The integral, and the one that the controller is for, adds the pole, and the one that the origin is for, to the closed loop, and the one that the s domain is for. So the type, and the one that the system is for, is increased, and the one that the integral is for. So the steady error, and the one that the step is for, is the one that the zero is for, and the one that the specification is for. The integral, and the one that the design is for, is the one that the steady error is for, and the one that the behaviour is for.
:::
:::

## Where this leads

With the PID, and the one that the controller is for, and the proportional, the integral, and the derivative, and the tuning, in hand, you have the full PID, and the one that the design is for. The method, and the check, are the same as for the frequency lesson, and the one that is new is the PID, and the one that the design is for. In the next lesson, you meet the compensator, and the one that the design is for, and the one that the specification is for, and the same algebra, and the gain and phase, and the tuning and the check, are the ones you already have.

::: history
The PID, and the one that the controller is for, is the one that the control is for. The proportional, the integral, and the derivative, and the one that the design is for, is the one that the specification is for. The tuning, and the one that the design is for, is the one that the behaviour is for. The method, the one that the PID is for, is the one that the design is for, and the one that the specification is for.
:::

::: summary
- The PID is the sum, and the one that the transfer function is for, of the proportional, and the integral, and the derivative.
- The proportional increases the speed, and the one that the settling is for. It cannot eliminate the steady error.
- The integral increases the type, and the one that the system is for. It makes the steady error zero, and the one that the step is for.
- The derivative adds the damping, and the one that the response is for. It reduces the overshoot, and the one that the settling is for.
- The tuning is the choice of the Kp, Ki, Kd, and the one that the specification is for.
- The tuning is by the root locus, and the frequency, and the one that the design is for.
- The derivative on the reference gives the kick, and the one that the derivative is for. The derivative on the error avoids the kick.
:::

## Exercises

::: exercise The proportional {level=1 check="Kp"}
The proportional gain is the one that the gain is for. What is the effect, and the one that the settling is for?
::: solution
The proportional, and the one that the gain is for, increases the closed loop, and the one that the pole is for. So the settling is the one that the faster is for, and the one that the response is for. The proportional, and the one that the design is for, is the one that the speed is for, and the one that the settling is for.
:::
:::

::: exercise The integral {level=1 check="Ki"}
The integral gain is the one that the steady is for. What is the effect, and the one that the steady error is for?
::: solution
The integral, and the one that the steady is for, adds the pole, and the one that the origin is for. So the type, and the one that the system is for, is increased. So the steady error is the one that the zero is for, and the one that the step is for. The integral, and the one that the design is for, is the one that the steady error is for.
:::
:::

::: exercise The derivative {level=1 check="Kd"}
The derivative gain is the one that the transient is for. What is the effect, and the one that the overshoot is for?
::: solution
The derivative, and the one that the transient is for, adds the damping, and the one that the response is for. So the overshoot is the one that the smaller is for, and the one that the behaviour is for. The derivative, and the one that the design is for, is the one that the overshoot is for, and the one that the settling is for.
:::
:::

::: exercise The steady error {level=2}
Explain, why the integral, and the one that the controller is for, makes the steady error zero, and the one that the step is for.
::: hint
The integral adds an integrator, and the one that the type is for.
:::
::: solution
The integral, and the one that the controller is for, adds the pole, and the one that the origin is for, to the open loop, and the one that the s domain is for. So the type, and the one that the system is for, is increased by one, and the one that the integral is for. For the type that is one or more, and the one that the system is for, the steady error, and the one that the step is for, is the one that the zero is for. The integral, and the one that the design is for, is the one that the steady error is for, and the one that the specification is for.
:::
:::

::: exercise The kick {level=2}
Explain, the derivative kick, and the one that the transient is for. How do you avoid it, and the one that the design is for?
::: hint
The derivative on the reference gives the kick.
:::
::: solution
The derivative, and the one that the reference is for, on the reference, and the one that the signal is for, gives the derivative, and the one that the large is for, of a change, and the one that the step is for. So the control, and the one that the output is for, has a large, and the one that the kick is for, change. The derivative, and the one that the action is for, on the error, and the one that the feedback is for, avoids the kick, and the one that the reference is for. So the derivative, and the one that the design is for, is on the error, and the one that the specification is for.
:::
:::

::: exercise The tuning {level=3}
Explain, how the tuning, and the one that the PID is for, is found, using the root locus, and the one that the design is for.
::: hint
Choose the pole, and the one that the settling is for. Find the gain.
:::
::: solution
The tuning, and the one that the PID is for, is the choice of the Kp, Ki, Kd. Using the root locus, and the one that the design is for, choose the closed loop pole, and the one that the s domain is for, that gives the settling, and the overshoot, and the specification, and the one that the behaviour is for. Then find the gain, and the one that the feedback is for, from the magnitude condition, and the one that the locus is for. The tuning, and the one that the design is for, is the one that the specification is for, and the one that the behaviour is for.
:::
:::

::: exercise The derivative, and the frequency {level=3}
Explain, why the derivative, and the one that the transient is for, amplifies the noise, and the one that the high is for.
::: hint
The derivative is the s, and the one that the s domain is for. In the frequency and the high, and the one that the s domain is for, the s is the j, and the one that the omega is for.
:::
::: solution
The derivative, and the one that the transfer function is for, is the s, and the one that the s domain is for. In the frequency, and the one that the response is for, the s, and the one that the s domain is for, is the j, and the one that the omega is for, and the one that the frequency is for. So the derivative, and the one that the frequency is for, is the one that the omega is for. In the high, and the one that the frequency is for, the omega, and the one that the frequency is for, is large, and the one that the derivative is for. So the derivative, and the one that the noise is for, amplifies the high, and the one that the frequency is for, and the one that the noise is for. The derivative, and the one that the design is for, is the one that the noise is for, and the one that the specification is for.
:::
:::

::: exercise The PID, and the compensator {level=3}
Explain, the relation, between the PID, and the one that the controller is for, and the compensator, and the one that the design is for.
::: hint
The PID is a special form, and the one that the compensator is for.
:::
::: solution
The PID, and the one that the controller is for, is a special form, and the one that the transfer function is for, of the compensator, and the one that the design is for. The compensator, and the one that the design is for, is the zero, and the one that the s domain is for, and the pole, and the one that the s domain is for. The PID, and the one that the controller is for, is the zero, and the one that the derivative is for, and the pole, and the one that the integral is for. The two are the two, and the one that the design is for, and the one that the specification is for.
:::
:::
