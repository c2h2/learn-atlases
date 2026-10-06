The feedback, and the one that the design is for, is the one that the pole is for, and the one that the state space is for. The state feedback, and the one that the design is for, is the one that the pole placement is for, and the one that the observer is for. This lesson defines the state feedback, and the one that the design is for, and gives the placement, and the one that the pole is for, and the observer, and the one that the state is for. The method, and the check, are the same as for the state space lesson, and the one that is new is the placement, and the observer, and the one that the design is for. The state feedback, and the one that the design is for, is the one that the control, and the one that the behaviour, is for.

## The state feedback, and the gain

The state feedback, and the one that the design is for, is the one that the state is for, and the one that the gain is for. The gain, and the one that the feedback is for, is the one that the pole is for, and the one that the s domain is for.

::: definition State feedback {#def-fb}
The **state feedback** is the control, and the one that the feedback is for,
$$
u = -K x + r,
$$
and the one that the state feedback is for. The $K$ is the gain, and the one that the feedback is for. The $r$ is the reference, and the one that the signal is for. The state feedback, and the one that the design is for, is the one that the pole is for, and the one that the closed loop is for. The state feedback, and the one that the placement is for, is the one that the design is for, and the one that the specification is for.
:::

The feedback, and the one that the state is for, changes the A, and the one that the matrix is for, of the closed loop, and the one that the state space is for. The gain, and the one that the feedback is for, is the one that the A is for, and the one that the design is for.

::: proposition The closed loop A {#prop-closedA}
With the state feedback, and the one that the gain is for, is the closed loop A, and the one that the matrix is for, is
$$
A_{cl} = A - B K,
$$
and the one that the state space is for. The pole, and the one that the closed loop is for, is the eigenvalue, and the one that the matrix is for, of the A, and the B, and the K, and the one that the design is for. The placement, and the one that the feedback is for, is the choice, and the one that the design is for, of the K, and the one that the gain is for, so that the pole, and the one that the s domain is for, is at the specification, and the one that the behaviour is for.
:::

::: example The placement, and the gain {#ex-place}
The system has the A, and B, and the one that the state space is for. What is the gain K, and the one that the feedback is for, that places the pole, and the one that the s domain is for?
::: solution
The placement, and the one that the design is for, is the choice, and the one that the gain is for, of the K, and the one that the feedback is for. The closed loop A, and the one that the matrix is for, is the A, and the B, and the K. Set the eigenvalue, and the one that the matrix is for, of the A, and the B, and the K, equal to the specification, and the one that the behaviour is for. Solve for the K, and the one that the gain is for. The placement, and the one that the design is for, is the one that the pole is for, and the one that the specification is for.
:::
:::

The placement, and the one that the design is for, is possible when the system, and the one that the state space is for, is controllable, and the one that the state is for. The controllability, and the one that the state is for, is the one that the placement is for, and the one that the design is for.

::: example The Ackermann, and the formula {#ex-ack}
The placement, and the one that the design is for, by the formula, and the one that the Ackermann is for. How is the K, and the one that the gain is for, found?
::: solution
The formula, and the one that the Ackermann is for, finds the K, and the one that the gain is for, from the specification, and the one that the pole is for. The formula, and the one that the Ackermann is for, is the one that the controllability is for, and the one that the state space is for, and the one that the characteristic is for, and the one that the polynomial is for. The formula, and the one that the Ackermann is for, is the one that the gain is for, and the one that the placement is for, and the one that the design is for.
:::
:::

## The observer, and the estimate

The observer, and the one that the state is for, is the one that the estimate is for, and the one that the state is for. The observer, and the one that the design is for, is the one that the state is for, and the one that the measurement is not for.

::: definition Observer {#def-obs}
The **observer** is
$$
\dot{\hat{x}} = A \hat{x} + B u + L (y - C \hat{x}),
$$
and the one that the observer is for. The $\hat{x}$ is the estimate, and the one that the state is for. The $L$ is the gain, and the one that the observer is for. The observer, and the one that the design is for, is the one that the state is for, when the state, and the one that the system is for, is not measured, and the one that the system is for. The observer, and the one that the estimate is for, approaches the state, and the one that the system is for, when the system, and the one that the state space is for, is observable, and the one that the state is for.
:::

The observer, and the one that the design is for, is the one that the estimate is for, and the one that the state is for. The gain, and the one that the observer is for, is the one that the estimate is for, and the one that the convergence is for.

::: proposition The observer, and the gain {#prop-obs}
The error, and the one that the state is for, of the observer, and the one that the estimate is for, is
$$
\dot e = (A - L C) e,
$$
and the one that the observer is for. The error, and the one that the state is for, approaches the zero, and the one that the estimate is for, when the pole, and the one that the A and L and C is for, is at the left, and the one that the plane is for. The observer, and the one that the design is for, is the one that the estimate is for, and the one that the convergence is for, and the one that the specification is for.
:::

::: example The observer, and the convergence {#ex-obs}
The observer, and the one that the estimate is for. How fast does the estimate, and the one that the state is for, approach the state, and the one that the system is for?
::: solution
The convergence, and the one that the estimate is for, is the one that the pole is for, of the A, and the L, and the C, and the one that the state space is for. The convergence, and the one that the specification is for, is the one that the design is for, and the one that the observer is for. The gain, and the one that the observer is for, is the one that the convergence is for, and the one that the estimate is for. The observer, and the one that the design is for, is the one that the convergence is for, and the one that the specification is for.
:::
:::

## The separation, and the design

The separation, and the one that the control is for, is the one that the placement and the observer is for, independently, and one that the design is for.

::: theorem The separation principle {#thm-sep}
The placement, and the one that the pole is for, and the observer, and the one that the design is for, can be designed independently, and one that the control is for, and one that the specification is for. The closed loop, and the one that the pole is for, is the one that the placement is for, and the one that the observer is for, and one that the separation is for. The separation principle, and the one that the design is for, is the one that the control is for, and one that the state space is for.
:::

::: example The deadbeat, and the convergence {#ex-deadbeat}
The placement with and the number of the state. Can the pole be the zero, and the one that the convergence is for, in one?
::: solution
The deadbeat, and the one that the design is for, is the one that the pole is for, and the one that the s domain is for, is the zero, and the one that the convergence is for. The state, and the one that the system is for, is the zero, and the one that the convergence is for, in the finite, and the one that the step is for. This is the one that the deadbeat is for, and the one that the design is for, and the one that the state is for. The deadbeat, and the one that the feedback is for, is the one that the gain is large for, and the one that the noise is for, and the one that the specification is for.
:::
:::

The separation, and the one that the design is for, is the one that the control is for. The two, the placement and the observer, and the one that the design is for, are the two that are independently designed, and one that the separation is for. The placement is for the closed loop, and the observer is for the estimate, and one that the design is for.

::: warning The estimate, and the noise {#warn-noise}
The observer, and the one that the estimate is for, is the one that the noise is for, and one that the measurement is for. A fast observer, and the one that the convergence is for, is the one that the gain is large for, and one that the observer is for. So the observer, and the one that the design is for, is the one that the noise is for, and one that the measurement is for. The observer, and the one that the design is for, is the one that the convergence is for, and one that the specification is for.
:::

::: widget plot
f: exp(-x)
x: 0 5
y: 0 1
sliders:
caption: The error and the one that the state is for, of the observer, and the one that the estimate is for, over time, and one that the convergence is for. The convergence, and the one that the design is for, is the one that the gain is for, and one that the observer is for. The observer, and the one that the design is for, is the one that the estimate is for, and one that the specification is for.
:::

::: quiz
The separation principle and the one that the design is for. What does it say?
- [x] The placement and the observer are designed independently
- [ ] The placement and the observer are designed together
- [ ] The observer is not needed
- [ ] The placement is not needed
::: solution
The separation principle, and the one that the design is for, is the one that the placement and the observer is for independently, and one that the control is for. The closed loop, and the one that the pole is for, is the one that the placement and the observer is for, and one that the separation is for. So the design, and the one that the specification is for, is the one that the separation is for, and one that the design is for.
:::
:::

## Where this leads

With the state feedback, and the placement, and the observer, and the separation principle, in hand, you have the full state feedback, and the one that the design is for. The method, and the check, are the same as for the state space lesson, and the one that is new is the placement, and the observer, and the one that the design is for. In the next lesson, you meet the digital control, and the one that the sample is for, and the same algebra, and the state, and the check, are the ones you already have.

::: history
The state feedback, and the one that the design is for, is the one that the control is for. The placement, and the one that the pole is for, is the one that the design is for. The observer, and the one that the estimate is for, is the one that the state is for. The method, the one that the state feedback is for, is the one that the design is for, and the one that the specification is for.
:::

::: summary
- State feedback is the control that uses the state, and the one that the feedback is for.
- The gain K, and the one that the feedback is for, is the one that the pole is for, and the one that the placement is for.
- The placement is the one that the pole is for, and the one that the specification is for.
- The observer estimates the state, and the one that the design is for, when the state is not measured.
- The convergence of the observer is the one that the pole is for, of the A, L, C.
- The separation principle says that the placement and the observer can be designed independently.
- The observer is the one that the noise is for, and the one that the measurement is for.
:::

## Exercises

::: exercise The closed loop A {level=1 check="A-BK"}
With state feedback, what is the closed loop A, and the one that the matrix is for?
::: solution
The closed loop A, and the one that the matrix is for, is the A, and the B, and the K, and the one that the state space is for. The gain K, and the one that the feedback is for, is the one that the pole is for, and the one that the placement is for.
:::
:::

::: exercise The placement {level=1 check="K"}
The placement, and the one that the design is for, uses what, and the one that the feedback is for?
::: solution
The placement, and the one that the design is for, uses the gain K, and the one that the feedback is for, to place the pole, and the one that the s domain is for, at the specification, and the one that the behaviour is for. The gain K, and the one that the feedback is for, is the one that the pole is for, and the one that the design is for.
:::
:::

::: exercise The observer {level=1 check="L"}
The observer uses what, and the one that the estimate is for?
::: solution
The observer uses the gain L, and the one that the observer is for, and one that the estimate is for, to make the estimate, and the one that the state is for, converge to the state, and the one that the system is for. The gain L, and the one that the observer is for, is the one that the convergence is for, and one that the estimate is for.
:::
:::

::: exercise The separation {level=2}
Explain the separation principle, and the one that the design is for.
::: hint
Placement and observer are independent.
:::
::: solution
The separation principle, and the one that the design is for, says that the placement, and the one that the pole is for, and the observer, and the one that the estimate is for, can be designed independently, and one that the control is for. The closed loop, and the one that the pole is for, is the one that the placement and the observer is for, and one that the separation is for. The design, and the one that the specification is for, is the one that the separation is for, and one that the design is for.
:::
:::

::: exercise The observer, and the convergence {level=2}
The observer, and the one that the estimate is for. What determines the convergence, and the one that the estimate is for?
::: hint
The pole of the A minus L C.
:::
::: solution
The convergence, and the one that the estimate is for, is the one that the pole is for, of the A, and the L, and the C, and the one that the state space is for. The gain L, and the one that the observer is for, is the one that the convergence is for, and one that the estimate is for. The observer, and the one that the design is for, is the one that the convergence is for, and one that the specification is for.
:::
:::

::: exercise The controllability, and the placement {level=2}
Explain, why the placement, and the one that the design is for, needs the controllability, and the one that the state is for.
::: hint
The placement moves the pole.
:::
::: solution
The placement, and the one that the design is for, moves the pole, and the one that the closed loop is for, with the gain K, and the one that the feedback is for. The gain K, and the one that the feedback is for, acts on the state, and the one that the system is for, that the input, and the one that the signal is for, influences. If the state, and the one that the system is for, is not controllable, and the one that the state is for, is when the input does not influence, and one that the state is for. So the placement, and the one that the design is for, is the one that the controllability is for, and one that the state is for.
:::
:::

::: exercise The observer, and the gain {level=3}
Explain, the tradeoff with the observer gain, and the one that the design is for.
::: hint
The fast observer and the noise.
:::
::: solution
The fast observer, and the one that the convergence is for, is the one that the large gain is for, and one that the observer is for. The large gain, and the one that the observer is for, is the one that the noise is amplified for, and one that the measurement is for. So the observer gain, and the one that the design is for, is the one that the convergence is for, and the one that the noise is for, and one that the estimate is for. The design, and the one that the specification is for, is the one that the tradeoff is for, and one that the observer is for.
:::
:::

::: exercise The state feedback, and the output feedback {level=3}
Explain, the difference between the state feedback, and the one that the design is for, and the output feedback, and the one that the design is for.
::: hint
The state feedback measures all the state. The output feedback only the output.
:::
::: solution
The state feedback, and the one that the design is for, measures all the state, and the one that the system is for. The output feedback, and the one that the design is for, only measures the output, and the one that the signal is for. So the output feedback, and the one that the design is for, is the one that the observer is for, to estimate the state, and the one that the design is for. The state feedback, and the one that the state is for, is the one that the full is for, and one that the placement is for. The output feedback, and the one that the output is for, is the one that the observer is for, and one that the estimate is for.
:::
:::
