The behaviour, and the one that the system is for, of the closed loop is the one that the stability is for, and the one that the feedback is for. The stability, and the one that the behaviour is for, is the one that the response is for, and the one that the specification is for. This lesson defines the stability, and the one that the behaviour is for, and gives the Routh, and the one that the Hurwitz is for, and the margin, and the one that the specification is for, and the one that the feedback is for. The method, and the check, are the same as for the time lesson, and the one that is new is the stability, and the one that the behaviour is for, and the one that the specification is for. The stability, and the one that the behaviour is for, is the one that the control, and the one that the design, is for.

## The stability and the margin

The stability, and the one that the behaviour is for, is the one that the pole is for, and the one that the response is for. The margin, and the one that the specification is for, is the one that the stability is for, and the one that the behaviour is for.

::: definition Stability {#def-stab}
The **stability** of the closed loop, and the one that the behaviour is for, is the one that the pole is for, and the one that the response is for. The closed loop, and the one that the behaviour is for, is **stable** when the pole, and the one that the s domain is for, is at the left, and the one that the real is for, and the one that the plane is for. The closed loop, and the one that the behaviour is for, is **unstable** when the pole, and the one that the s domain is for, is at the right, and the one that the real is for, and the one that the plane is for.
:::

The margin, and the one that the specification is for, is the one that the stability is for. The margin, and the one that the behaviour is for, is the one that the response is for, and the one that the specification is for. The two, and the one that the stability is for, are the response, and the one that the specification is for.

::: proposition The Routh criterion {#prop-routh}
The **Routh criterion**, and the one that the stability is for, is the one that the polynomial is for, and the one that the s domain is for. The Routh, and the one that the Hurwitz is for, is the one that the coefficient, and the one that the stability is for, is for. The Routh, and the one that the table is for, is the one that the sign, and the one that the change is for, is for. The Routh, and the one that the stability is for, is the one that the pole, and the one that the plane is for, is for, by the table, and the one that the coefficient is for.
:::

::: example The Routh, and the stability {#ex-routh}
The polynomial, with the coefficient, and the one that the s domain is for. What is the stability, and the one that the behaviour is for?
::: solution
The Routh, and the one that the table is for, is constructed, and the one that the coefficient is for, from the coefficient, and the one that the polynomial is for. The sign, and the one that the change is for, is the one that the stability is for, and the one that the behaviour is for. The sign changes two, and the one that the table is for, and the result is the two, and the one that the pole is for, at the right, and the one that the plane is for. So the closed loop, and the one that the behaviour is for, is the one that the unstable is for.
:::
:::

::: example The Routh, and the margin {#ex-margin}
The polynomial, with the coefficient, and the one that the s domain is for. What is the margin, and the one that the specification is for?
::: solution
The Routh, and the one that the table is for, is constructed, and the one that the coefficient is for. The margin, and the one that the specification is for, is the one that the coefficient, and the one that the stability is for, is for. The margin, and the one that the behaviour is for, is the one that the stability is for, and the one that the specification is for.
:::
:::

The gain margin, and the one that the specification is for, is the one that the stability is for, and the one that the frequency is for. The phase margin, and the one that the specification is for, is the one that the stability is for, and the one that the frequency is for.

::: example The gain, and the margin {#ex-gainm}
The open loop, and the one that the frequency is for. When is the gain, and the one that the margin is for, at the critical, and the one that the stability is for?
::: solution
The gain margin, and the one that the specification is for, is at the frequency, and the one that the phase is for, where the phase is the negative, and the one that the one hundred eighty is for. The gain, and the one that the margin is for, is the one that the stability is for, and the one that the specification is for. The gain margin, and the one that the behaviour is for, is the one that the stability is for, and the one that the frequency is for.
:::
:::

::: example The Nyquist, and the encirclement {#ex-nyq}
The open loop, and the one that the frequency is for. How is the stability, and the one that the closed loop is for, determined?
::: solution
The Nyquist, and the one that the encirclement is for, is the one that the encirclement, and the one that the point is for, of the open loop, and the one that the frequency is for, is for. The encirclement, and the one that the point minus the one, and the one that the origin is for, is the number of the pole, and the one that the right is for, and the one that the closed loop is for. So the Nyquist, and the one that the stability is for, is the one that the encirclement is for, and the one that the behaviour is for. A stable open loop, and the one that the frequency is for, is the one that the encirclement is zero is for, and the stability, and the one that the closed loop is for.
:::
:::

## The feedback, and the stability

The feedback, and the one that the behaviour is for, is the one that the stability is for, and the one that the specification is for. The feedback, and the one that the gain is for, is the one that the stability is for, and the one that the behaviour is for.

::: proposition Feedback can destabilise {#prop-destab}
The feedback, and the one that the gain is for, can make the stable, and the one that the open loop is for, to be the unstable, and the one that the closed loop is for. The feedback, and the one that the specification is for, is the one that the stability is for, and the one that the behaviour is for. The gain, and the one that the closed loop is for, is the one that the stability is for, and the one that the specification is for.
:::

The feedback, and the one that the behaviour is for, is the one that the design is for. The gain, and the one that the closed loop is for, is the one that the stability is for, and the one that the specification is for. The two, and the one that the feedback is for, are the gain, and the one that the stability is for.

::: warning The right half, and the pole {#warn-rhp}
The pole, and the one that the right is for, in the plane, and the one that the real is for, is the one that the unstable is for, and the one that the grow is for. The closed loop, and the one that the behaviour is for, is the one that the unstable is for, and the one that the specification is for. The margin, and the one that the specification is for, is the one that the stability is for, and the one that the feedback is for.
:::

::: widget plot
f: 1/(1+x*x)
x: 0 4
y: 0 1
sliders:
caption: The closed loop, and the one that the behaviour is for, as a function of the gain, and the one that the feedback is for. The stability, and the one that the specification is for, is the one that the gain, and the one that the margin is for, is for. The feedback, and the one that the behaviour is for, is the one that the stability is for, and the one that the specification is for.
:::

::: quiz
The Routh table, and the one that the sign is for. What does the sign, and the one that the change is for, give?
- [x] The number of the pole, and the one that the right is for
- [ ] The number of the zero, and the one that the s domain is for
- [ ] The settling, and the one that the specification is for
- [ ] The resonant, and the one that the frequency is for
::: solution
The Routh, and the one that the table is for, is the one that the sign is for, and the one that the change is for. The sign, and the one that the change is for, is the number of the pole, and the one that the right is for, and the one that the plane is for. So the Routh, and the one that the stability is for, gives the number of the unstable pole, and the one that the behaviour is for.
:::
:::

## Where this leads

With the stability, and the one that the behaviour is for, and the Routh, and the Hurwitz, and the margin, and the feedback, in hand, you have the full stability, and the one that the behaviour is for. The method, and the check, are the same as for the time lesson, and the one that is new is the stability, and the one that the specification is for. In the next lesson, you meet the root locus, and the one that the design is for, and the one that the gain is for, and the same algebra, and the pole and zero, and the check, are the ones you already have.

::: history
The stability, and the one that the behaviour is for, is the one that the control is for. The Routh, and the one that the Hurwitz is for, is the one that the stability is for. The margin, and the one that the specification is for, is the one that the feedback is for. The method, the one that the stability is for, is the one that the behaviour is for, and the one that the specification is for.
:::

::: summary
- The stability, and the one that the behaviour is for, is the one that the pole is for.
- The closed loop is stable when the pole is at the left of the plane.
- The Routh criterion, and the one that the stability is for, is the one that the sign and the change is for.
- The sign change, and the one that the table is for, is the number of the unstable pole.
- The margin, and the one that the specification is for, is the one that the stability is for.
- The gain margin, and the phase margin, and the one that the specification is for, is the one that the frequency is for.
- The feedback, and the one that the gain is for, can make the stable to be the unstable.
- The pole at the right of the plane is the one that the unstable is for.
:::

## Exercises

::: exercise The Routh {level=1 check="2"}
The Routh table has two sign changes and the one that the coefficient is for. How many pole are at the right, and the one that the plane is for?
::: solution
The sign change, and the one that the table is for, is the number of the pole at the right, and the one that the plane is for. So the two sign change, and the one that the Routh is for, is the two pole at the right, and the one that the unstable is for.
:::
:::

::: exercise The stability {level=1}
The pole is at the negative, and the one that the real is for. Is the closed loop stable, and the one that the behaviour is for?
::: solution
The pole at the left, and the one that the real is for, is the one that the stable is for, and the one that the decay is for. So the closed loop, and the one that the behaviour is for, is the one that the stable is for.
:::
:::

::: exercise The gain margin {level=1 check="phase180"}
The gain margin is at the frequency where the phase is what, and the one that the specification is for?
::: solution
The gain margin, and the one that the specification is for, is at the frequency, and the one that the phase is for, where the phase is the negative, and the one that the one hundred eighty is for. The gain, and the one that the margin is for, is the one that the stability is for, and the one that the specification is for.
:::
:::

::: exercise The Routh, and the coefficient {level=2}
Explain, how the Routh, and the one that the table is for, is constructed, from the coefficient, and the one that the polynomial is for.
::: hint
The Routh is the one that the coefficient is for, row by row.
:::
::: solution
The Routh, and the one that the table is for, is constructed row by row, and the one that the coefficient is for, from the coefficient of the polynomial, and the one that the s domain is for. The first two rows are the odd and the even, and the one that the coefficient is for. The next rows are computed, and the one that the Routh is for, from the previous two. The sign change, and the one that the table is for, gives the number of the unstable pole, and the one that the behaviour is for.
:::
:::

::: exercise The feedback, and the gain {level=2}
Explain, why the feedback, and the one that the gain is for, can make the stable to be the unstable, and the one that the behaviour is for.
::: hint
The feedback changes the pole, and the one that the s domain is for.
:::
::: solution
The feedback, and the one that the gain is for, changes the closed loop, and the one that the pole is for, and the one that the s domain is for. The gain, and the one that the closed loop is for, is the one that the pole is for. The gain can make the pole, and the one that the left is for, to be the pole, and the one that the right is for, and the one that the unstable is for. So the feedback, and the one that the stability is for, is the one that the gain is for, and the one that the behaviour is for.
:::
:::

::: exercise The margin, and the specification {level=3}
Explain, the relation, between the margin, and the one that the specification is for, and the stability, and the one that the behaviour is for.
::: hint
The margin is the one that the specification is for.
:::
::: solution
The margin, and the one that the specification is for, is the one that the stability is for, and the one that the behaviour is for. The margin is the specification, and the one that the design is for, and the one that the gain is for. The margin, and the one that the frequency is for, is the one that the stability is for, and the one that the feedback is for. A large margin, and the one that the specification is for, is the one that the stable is for, and the one that the robust is for.
:::
:::

::: exercise The right half, and the response {level=3}
Explain, why the pole at the right, and the one that the plane is for, is the one that the grow is for, and the one that the unstable is for.
::: hint
The pole gives the exponential, and the one that the time is for.
:::
::: solution
The pole at the right, and the one that the real is for, gives the exponential, and the one that the grow is for, and the one that the time is for. So the response, and the one that the time is for, grows, and the one that the time is for, and the one that the gain is for. So the closed loop, and the one that the behaviour is for, is the one that the unstable is for, and the one that the response is for.
:::
:::

::: exercise The Routh, and the special, and the row {level=3}
Explain, the special case, and the one that the row is for, of the Routh, and the one that the table is for.
::: hint
The row of zero, and the one that the table is for.
:::
::: solution
The Routh, and the one that the table is for, has the special case, and the one that the row is for, of the row of zero, and the one that the table is for, which is the one that the auxiliary is for, and the one that the polynomial is for. The row of zero, and the one that the table is for, is the one that the pole on the imaginary, and the one that the axis is for, is for, and the one that the marginal is for. The special case, and the one that the Routh is for, is the one that the imaginary, and the one that the axis is for, is for.
:::
:::
