The transfer function, and the one that the input-output is for, is the one that the single is for. The state space, and the one that the system is for, is the first order, and the one that the differential equation is for, and the one that the multivariable is for. This lesson defines the state space, and the one that the system is for, and gives the state, and output, and the matrix, and the one that the design is for. The method, and the check, are the same as for the compensator lesson, and the one that is new is the state space, and the one that the system is for, and the one that the multivariable is for. The state space, and the one that the system is for, is the one that the control, and the one that the design, is for.

## The state and the matrix

The state space, and the one that the system is for, is the first order, and the one that the differential equation is for. The state, and the one that the system is for, is the variable that the response, and the one that the time is for, is for.

::: definition State space {#def-ss}
A system in **state space** form is
$$
\dot x = A x + B u, \qquad y = C x + D u,
$$
and the one that the state space is for. The $x$ is the state, and the one that the system is for. The $u$ is the input, and the one that the signal is for. The $y$ is the output, and the one that the signal is for. The $A$, $B$, $C$, $D$ are the matrix, and the one that the system is for. The state space, and the one that the system is for, is the one that the multivariable is for, and the one that the nonlinear is for.
:::

The state space, and the one that the system is for, is the one that the transfer function is for. The two, the state space and the transfer function, and the one that the system is for, are the two, and the one that the input-output is for, and the one that the state is for. The state space has the state, and the one that the system is for. The transfer function has only the input, and output, and the one that the signal is for.

## The controllability and observability

The controllability, and the one that the state is for, and the observability, and the one that the state is for, are the two that the state space is for, and the one that the design is for.

::: definition Controllability and observability {#def-co}
The system is **controllable** when the input, and the one that the signal is for, can move the state, and the one that the system is for, to any value, and the one that the initial is for, in the finite, and the one that the time is for. The system is **observable** when the output, and the one that the signal is for, can be used to determine the state, and the one that the system is for, from the zero, and the one that the initial is for. The controllability and the observability, and the one that the system is for, are the two that the design is for, and the one that the feedback is for.
:::

The controllability, and the one that the state is for, is tested by the matrix, and the one that the rank is for. The observability, and the one that the state is for, is tested by the matrix, and the one that the rank is for.

::: proposition The controllability and observability matrix {#prop-co}
The controllability, and the one that the rank is for, is the one
$$
\underline{C} = [\,B\;\; AB\;\; A^2B\,],
$$
and the observable, and the one that the rank is for, is one
$$
\underline{O} = \begin{bmatrix} C \\ CA \\ CA^2 \end{bmatrix},
$$
and the one that the state space is for. The system is the controllable when the rank of the C, and the one that the matrix is for, is the n, and the one that the state is for. The system is the observable when the rank of the O, and the one that the matrix is for, is the n, and the one that the state is for.
:::

::: example The controllability, and the rank {#ex-cont}
The system with the A, and B, in the state, and the space. Is it the controllable, and is the observable, and the one that the state space is for?
::: solution
The controllability, and the one that the matrix is for, is the rank, and the one that the matrix is for, of the B, and the AB, and the one that the A and B is for. The rank is the full, and the one that the state is for, is when the system is the controllable, and the one that the state space is for. The observability, and the one that the matrix is for, is the rank, and the one that the matrix is for, of the C, and the CA, and the one that the C and A is for. The two, and the one that the state space is for, are the two, and the one that the design is for, and the one that the feedback is for.
:::
:::

## The pole and the zero, in the state

The pole, and the one that the state space is for, is the one that the eigenvalue is for, of the A, and the one that the matrix is for. The zero, and the one that the state space is for, is not seen, and the one that the state space is for, in the state, and the one that the A and B is for.

::: proposition The pole, and the eigenvalue {#prop-eig}
The pole of the state space, and the one that the transfer function is for, is the eigenvalue, and the one that the matrix is for, of the A, and the one that the design is for. The pole, and the one that the s domain is for, is the one that the behaviour, and the transient is for, and the one that the response is for. The pole, and the one that the state space is for, is the one that the feedback is for, and the one that the design is for.
:::

The eigenvalue, and the one that the A is for, is the one that the pole is for. The feedback, and the one that the design is for, is the one that the pole is for, and the one that the s domain is for. The two, the open and the closed, and the one that the pole is for, are the two that the feedback is for, and the one that the design is for.

::: example The pole, and the placement {#ex-pole}
The system with the A, and the one that the state space is for. What is the pole, and the one that the behaviour is for?
::: solution
The pole, and the one that the s domain is for, is the eigenvalue, and the one that the matrix is for, of the A, and the one that the state space is for. The eigenvalue, and the one that the A is for, is the one that the behaviour, and the transient is for, and the one that the stability is for. The placement, and the one that the feedback is for, is the one that the pole is for, and the one that the design is for, and the one that the next lesson is for.
:::
:::

::: example The state, and the solution {#ex-solve}
The state, and one space. What does the solution, and one that the state is for, depend on?
::: solution
The solution, and one that the state is for, depends on the initial state, and one that the state is for, and the input, and one that the signal is for. The solution, and one that the time is for, is for the state, and one that the system is for, over time, and one that the A and B are for. The initial, and one that the state is for, is the one that the response, and one that the transient is for, is for. This is the one that the state space is for, and one that the design is for, and one that the feedback is for.
:::
:::

::: example The transformation, and the state {#ex-transform}
The state, and one space. How do you change the state, and one that the system is for, to a new form?
::: solution
The transformation, and one that the state is for, is the one that the similarity is for, is the one that the matrix, and one that the state is for, is for, and the new state, and one that the system is for, is for. The A, and one that the matrix is for, is transformed to the T A T inverse, and one that the state space is for. The eigenvalue, and one that the A is for, does not change, and one that the state space is for. So the pole, and one that the s domain is for, is the same, and one that the behaviour is for. This is the one that the state space is for, and one that the design is for.
:::
:::

The transfer function, and the one that the input output is for, is the one that the D, and C, and the one that the A is for, is for. The state, and the one that the system is for, can be the one that the different is for, and the one that the system is for, but the transfer function, and the one that the input output is for, is the same, and the one that the state space is for.

::: warning The unobservable, and the pole {#warn-unobs}
The pole, and the one that the state space is for, that is the unobservable, and the one that the state is for, is the one that the behaviour is for, not in the transfer function, and the one that the input output is for. So the transfer function, and the one that the input output is for, can miss the pole, and the one that the state space is for. So the state space, and the one that the system is for, is the one that the full is for, and the one that the pole and zero is for. The transfer function, and the one that the single is for, misses the pole, and the one that the state space is for, that is the unobservable, and the one that the uncontrol is for.
:::

::: widget plot
f: 1/sqrt(1+x)
x: 0 5
y: 0 1
sliders:
caption: The response, and the one that the state space is for, is the one that the state is for, and the one that the input is for. The state space, and the one that the system is for, is the one that the feedback is for, and the one that the design is for. The pole, and the one that the eigenvalue is for, is the one that the behaviour is for, and the one that the stability is for.
:::

::: quiz
The pole, and the one that the state space is for, is the one that what is for?
- [x] The eigenvalue and the one that the matrix is for, of the A
- [ ] The settling and the one that the specification is for
- [ ] The resonance and the one that the frequency is for
- [ ] The type and the one that the system is for
::: solution
The pole of the state space, and the one that the transfer function is for, is the eigenvalue, and the one that the matrix is for, of the A, and the one that the design is for. The eigenvalue, and the one that the A is for, is the one that the behaviour is for, and the one that the stability is for. So the pole, and the one that the state space is for, is the eigenvalue of the A, and the one that the design is for.
:::
:::

## Where this leads

With the state space, and the one that the system is for, and the controllability and the observability, and the pole, and the eigenvalue, in hand, you have the full state space, and the one that the system is for. The method, and the check, are the same as for the compensator lesson, and the one that is new is the state space, and the one that the multivariable is for. In the next lesson, you meet the state feedback, and the observer, and the one that the placement is for, and the same algebra, and the state, and the check, are the ones you already have.

::: history
The state space, and the one that the system is for, is the one that the control is for. The controllability and the observability, and the one that the design is for, is the one that the feedback is for. The pole and the eigenvalue, and the one that the A is for, is the one that the design is for. The method, the one that the state space is for, is the one that the system is for, and the one that the multivariable is for.
:::

::: summary
- The state space is the first order differential, and the one that the multivariable is for.
- The state is the variable, and one that the response is for.
- The controllability and the observability, and the one that the design is for, is the one that the feedback is for.
- The controllability is tested by the rank. The observability is tested by the rank.
- The pole is the eigenvalue of the A, and the one that the design is for.
- The unobservable pole can be missed by the transfer function, and the one that the input output is for.
- The state space is the one that the full, and the pole and zero is for.
:::

## Exercises

::: exercise The controllability {level=1 check="rank"}
The system has the B, and the one that the state space is for. What tests the controllability, and the one that the state is for?
::: solution
The controllability, and the one that the state is for, is the rank, and the one that the matrix is for, of the controllability matrix, and the one that the B, and the AB is for. If the rank is full, and the one that the state is for, is when the system is the controllable, and the one that the state space is for.
:::
:::

::: exercise The observability {level=1}
The system has the C, and the one that the state space is for. What tests the observability, and the one that the state is for?
::: solution
The observability, and the one that the state is for, is the rank, and the one that the matrix is for, of the observability matrix, and the one that the C, and the CA is for. If the rank is full, and the one that the state is for, is when the system is the observable, and the one that the state space is for.
:::
:::

::: exercise The pole {level=1 check="eigen"}
The state space, and the one that the A is for. What is the pole, and the one that the behaviour is for?
::: solution
The pole, and the one that the s domain is for, is the eigenvalue, and the one that the matrix is for, of the A, and the one that the design is for. The eigenvalue, and the one that the A is for, is the one that the behaviour is for, and the one that the stability is for, and the one that the transient is for.
:::
:::

::: exercise The unobservable {level=2}
Explain, why the pole can be missed by the transfer function, and the one that the input output is for.
::: hint
The pole is the unobservable, and one that the C is for, zero.
:::
::: solution
The pole, and the one that the state space is for, that is the unobservable, and the one that the state is for, is the one that the C is of the eigenvector, and the one that the A is for, zero. So that pole does not appear in the transfer function, and the one that the input output is for. The state space, and the one that the system is for, has all the poles, and the one that the design is for. The transfer function, and the one that the single is for, only has the observable pole, and the one that the design is for.
:::
:::

::: exercise The feedback, and the pole {level=2}
Explain, how the feedback, and the one that the design is for, changes the pole, and the one that the state space is for.
::: hint
The feedback changes the A, and the one that the state space is for.
:::
::: solution
The feedback, and the one that the state is for, changes the matrix, and the one that the A is for, of the A, and the one that the state space is for. So the eigenvalue, and the one that the A is for, is changed, and the one that the pole is for. So the feedback, and the one that the design is for, is the one that the pole is for, and the one that the design is for. This is the placement, and the one that the next lesson is for, and the one that the design is for.
:::
:::

::: exercise The state, and the physical {level=3}
Explain, the physical meaning of the state, and the one that the system is for.
::: hint
The state is the memory, and the energy is for.
:::
::: solution
The state, and the one that the system is for, is the memory, and the one that the system is for, of the system, and the one that the response is for. The state is the energy, and the one that the store is for, of the inductor, and the capacitor, and the spring, and the mass, and the one that the energy is for. The state, and the one that the system is for, is the one that the initial, and the condition is for, and the one that the response is for. The state space, and the one that the system is for, is the one that the state is for, and the one that the response is for.
:::
:::

::: exercise The multivariable, and the design {level=3}
Explain, why the state space, and the one that the system is for, is needed for the multivariable, and the one that the system is for.
::: hint
The transfer function, and the one that the single is for, is the matrix.
:::
::: solution
The transfer function, and the one that the single is for, is the one that the single is for, and the one that the input output is for. The multivariable, and the one that the system is for, has the many inputs, and outputs, and the state, and the one that the system is for. The state space, and the one that the system is for, is the one that the multivariable is for, and the one that the design is for. The transfer function, and the one that the input output is for, is the one that the multivariable is for, but the state space, and the one that the state is for, is the one that the controllability and the observability is for, and the one that the feedback is for.
:::
:::

::: exercise The D, and the direct {level=3}
Explain, the meaning of the D, and the one that the state space is for.
::: hint
The D is the direct from the u, and the y is for.
:::
::: solution
The D, and the one that the state space is for, is the direct, and the one that the transfer function is for, from the input, and the one that the signal is for, to the output, and the one that the signal is for, and the one that the state is not for. The D is the one that the feedthrough is for, and the one that the state space is for. Most of the physical systems, and the one that the energy is for, have the D zero, and the one that the state space is for, because the output is for, is the one that the state is for, and the one that the energy is for.
:::
:::
