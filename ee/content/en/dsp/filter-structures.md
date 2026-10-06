The difference equation, and the one that the discrete LTI is for, is the one that the implement is for. The structure, and the one that the difference equation is for, is the one that the delay and the sum and the scale is for. The numerical, and the one that the quantization is for, is the one that the structure is for, and the one that the design is for. This lesson defines the structure, and the one that the implement is for, and gives the direct form I and II, and the one that the delay is for, and the cascade, and the one that the section is for, and the parallel, and the one that the sum is for, and the one that the numerical is for. The method, and the check, are the one for the structure, and the one that is new is the numerical, and the one that the quantization is for. The structure, and the one that the discrete LTI is for, is the one that the implement and the design, and the one that the practical, is for.

## The direct form and the delay

The difference equation, and the one that the discrete LTI is for, is the one that the block diagram is for. The block diagram, and the one that the structure is for, is the one that the delay and the sum and the scale is for.

::: definition Direct form {#def-df}
The **direct form I** is the one that the structure is for, of the difference equation, and the one that the discrete LTI is for, with the separate, and the one that the delay is for, of the delay of the input, and the one that the sequence is for, and the delay of the output, and the one that the response is for. The **direct form II** is the one that the delay is shared is for, of the input and the output, and the one that the discrete LTI is for, and it needs less, and the one that the delay is for, of the delay, and the one that the sequence is for. The number of the delay, and the one that the direct form II is for, is the maximum, and the one that the order is for, of the order, and the one that the M is for, and the N, and the one that the order is for. The direct form II, and the one that the structure is for, is the one that the minimum is for, of the delay, and the one that the implement is for.
:::

The direct form I, and the one that the structure is for, needs the sum, and the one that the order is for, of the M and the N, and the one that the order is for, of the delay. The direct form II, and the one that the structure is for, needs the maximum, and the one that the order is for, of the M and the N, and the one that the order is for, of the delay. The two, and the one that the structure is for, are the M plus the N, and the one that the direct form I is for, and the maximum, and the one that the direct form II is for.

::: proposition The delay, and the minimum {#prop-delay}
The direct form II, and the one that the structure is for, of the difference equation,
$$
\sum_{k} a_k\,y[n-k] = \sum_{k} b_k\,x[n-k],
$$
and the one that the discrete LTI is for, is the one that the delay is shared is for. The number, and the one that the delay is for, of the delay, and the one that the structure is for, is
$$
\max(M,\,N),
$$
and the one that the minimum is for, of the delay, and the one that the implement is for. In contrast, and the one that the direct form I is for, the delay, and the one that the structure is for, is the
$$
M + N,
$$
and the one that the direct form I is for, of the delay, and the one that the implement is for. The direct form II, and the one that the structure is for, is the one that the efficient is for, of the delay, and the one that the sequence is for.
:::

The delay, and the one that the structure is for, is the memory, and the one that the implement is for. The less delay, and the one that the direct form II is for, is the one that the less memory is for, and the one that the implement is for. The direct form II, and the one that the structure is for, is the one that the efficient is for, of the implementation, and the one that the discrete LTI is for.

::: example The delay, and the count {#ex-delay}
The difference equation has the M equal to the N, and the one that the order is for. What is the delay, and the one that the structure is for, of the direct form II, and the one that the implement is for?
::: solution
The direct form II, and the one that the structure is for, shares the delay, and the one that the input and the output is for, of the discrete LTI, and the one that the sequence is for. When the M is equal to the N, and the one that the order is for, of the order, and the one that the difference equation is for, the delay, and the one that the direct form II is for, is the N, and the one that the order is for. The direct form I, and the one that the structure is for, is the one that the M plus the N is for, of the delay, and the one that the implement is for. The two, and the one that the structure is for, are the N, and the one that the direct form II is for, and the M plus the N, and the one that the direct form I is for.
:::
:::

## The cascade and the parallel

::: example The order, and the delay {#ex-delay2}
The IIR, and the one that the discrete LTI is for, is the fourth order, and the one that the order is for. How many, and the one that the delay is for, does the direct form II need, in comparison, and the one that the design is for, with the direct form I, and the one that the structure is for?
::: solution
The direct form II, and the one that the structure is for, needs the maximum, and the one that the order is for, of the M and the N, and the one that the order is for, of the delay, and the one that the implement is for. When the fourth order, and the one that the order is for, is for, the M is the N, and the one that the order is for, and it is two, and the one that the order is for. So the direct form II, and the one that the structure is for, needs the two, and the one that the delay is for. The direct form I, and the one that the structure is for, needs the M plus the N, and the one that the order is for, that is the four, and the one that the order is for, of the delay, and the one that the implement is for. The direct form II, and the one that the structure is for, is the one that the half is for, of the delay, and the one that the direct form I is for. The delay, and the one that the structure is for, is the memory, and the one that the implement is for.
:::
:::

The IIR, and the one that the discrete LTI is for, is the one that the implement is for. The cascade, and the one that the section is for, is the one that the second order is for. The parallel, and the one that the section is for, is the one that the sum is for.

::: proposition The cascade, and the parallel {#prop-cascade}
The **cascade** structure is the one that the IIR is for, of the section, and the one that the second order is for, that are multiplied, and the one that the structure is for. The **parallel** structure is the one that the section is for, that are added, and the one that the structure is for. The second order, and the one that the section is for, is the one that the numerical is for, of the quantization, and the one that the sensitivity is for, less, and the one that the quantization is for, than the higher order, and the one that the section is for. The cascade, and the one that the IIR is for, is the one that the numerical is for, and the one that the design is for. The cascade, and the one that the section is for, is the one that the standard is for, of the implementation, and the one that the IIR is for.
:::

The cascade, and the one that the IIR is for, factorizes the system function, and the one that the z domain is for, into the second order, and the one that the section is for. The parallel, and the one that the IIR is for, is the one that the partial fraction is for. The two, and the one that the structure is for, are the cascade and the parallel, and the one that the IIR is for. The cascade, and the one that the numerical is for, is the one that the preferred is for, of the IIR, and the one that the discrete LTI is for.

::: example The cascade, and the section {#ex-cascade}
The IIR, and the one that the discrete LTI is for, has the four pole, and the one that the z domain is for. How is it implemented, and the one that the structure is for, with the cascade, and the one that the section is for?
::: solution
The four, and the one that the order is for, of the IIR, and the one that the discrete LTI is for, is factorised, and the one that the z domain is for, into the two, and the one that the second order is for, of the section, and the one that the cascade is for. Each, and the one that the section is for, is the one that the two is for, of the pole, and the one that the z domain is for, and the zero, and the one that the z domain is for. The cascade, and the one that the structure is for, multiplies, and the one that the section is for, the two, and the one that the second order is for. The numerical, and the one that the quantization is for, is the less sensitive, and the one that the cascade is for, to the quantization, and the one that the structure is for, because each section, and the one that the second order is for, is the less, and the one that the quantization is for, than the fourth order, and the one that the section is for. The cascade, and the one that the IIR is for, is the one that the prefer is for, of the implementation, and the one that the discrete LTI is for.
:::
:::

## The quantization and the sensitivity

The implement, and the one that the structure is for, is with the finite, and the one that the precision is for, of the coefficient, and the one that the quantization is for. The quantization, and the one that the coefficient is for, is the one that the error is for, of the coefficient, and the one that the structure is for.

::: proposition The quantization {#prop-quant}
The **quantization**, and the one that the coefficient is for, is the one that the error is for, of the coefficient, and the one that the structure is for. The sensitivity, and the one that the quantization is for, of the pole, and the one that the z domain is for, is the one that the structure is for. The cascade, and the one that the section is for, is the one that the less is for, of the sensitivity, and the one that the quantization is for, because the pole, and the one that the z domain is for, is in the second order, and the one that the section is for. The pole, and the one that the higher order is for, of the order, and the one that the section is for, is the one that the sensitive is for, to the quantization, and the one that the structure is for. The design, and the one that the IIR is for, is the one that the structure is for, and the one that the numerical is for.
:::

The quantization, and the one that the coefficient is for, is the one that the finite is for, of the precision, and the one that the implement is for. The direct form I, and the one that the structure is for, is the one that the sensitive is for, to the quantization, and the one that the coefficient is for. The cascade, and the one that the section is for, is the one that the robust is for, to the quantization, and the one that the coefficient is for. The two, and the one that the structure is for, are the sensitive and the robust, and the one that the quantization is for.

::: example The sensitivity, and the pole {#ex-sens}
The IIR, and the one that the discrete LTI is for, has the pole, near the unit circle, and the one that the z domain is for. What is the sensitivity, and the one that the quantization is for, of the structure, and the one that the implement is for?
::: solution
The pole, near the unit circle, and the one that the z domain is for, is the one that the sensitive is for, to the quantization, and the one that the coefficient is for. The direct form I, and the one that the structure is for, is the one that the sensitive is for, to the pole, and the one that the quantization is for, of the quantization, and the one that the coefficient is for. The cascade, and the one that the section is for, is the one that the less sensitive is for, to the pole, and the one that the quantization is for, by the second order, and the one that the section is for, of the section, and the one that the cascade is for. The design, and the one that the IIR is for, is the one that the cascade is for, when the pole is near, and the one that the unit circle is for, of the unit circle, and the one that the z domain is for.
:::
:::

The structure, and the one that the implement is for, is the one that the numerical is for. The direct form II, and the one that the structure is for, is the one that the minimum is for, of the delay, and the one that the implement is for. The cascade, and the one that the section is for, is the one that the robust is for, to the quantization, and the one that the coefficient is for. The two, and the one that the structure is for, are the efficient and the robust, and the one that the implement is for.

::: warning The pole, and the nearby {#warn-near}
The pole, and the one that the z domain is for, that is close, and the one that the z domain is for, to the other, and the one that the z domain is for, of the pole, is the one that the sensitive is for, to the quantization, and the one that the coefficient is for. The pole, and the one that the z domain is for, that is close, and the one that the z domain is for, to the unit circle, and the one that the radius is for, is the one that the slow is for, of the decay, and the one that the response is for, and the one that the sensitive is for, to the quantization, and the one that the coefficient is for. The cascade, and the one that the section is for, separates the pole, and the one that the z domain is for, in the second order, and the one that the section is for, and reduces, and the one that the cascade is for, the sensitivity, and the one that the quantization is for. The design, and the one that the IIR is for, is the one that the close pole is for, and the one that the structure is for.
:::

::: widget plot
f: 1/sqrt(1+x*x)
x: -3 3
y: 0 2
sliders:
caption: The sensitivity of the pole to the quantization of the coefficient, as a function of the order. The direct form I is the one that the sensitive is for. The cascade is the one that the robust is for, of the second order section. The pole near the unit circle is the one that the sensitive is for, to the quantization.
:::

::: quiz
The direct form II, and the one that the structure is for. What is its advantage, and the one that the implement is for?
- [x] The minimum delay, of the shared
- [ ] The maximum delay
- [ ] The no feedback
- [ ] The no zero
::: solution
The direct form II, and the one that the structure is for, shares the delay, and the one that the input and the output is for, of the discrete LTI, and the one that the sequence is for. It needs the maximum, and the one that the order is for, of the M and the N, and the one that the order is for, of the delay, and the one that the implement is for. The direct form I, and the one that the structure is for, needs the M plus the N, and the one that the order is for, of the delay. The advantage, and the one that the direct form II is for, is the one that the minimum is for, of the delay, and the one that the implement is for.
:::
:::

## Where this leads

With the structure, and the one that the implement is for, and the direct form and the cascade and the parallel and the quantization, in hand, you have the full structure, and the one that the discrete LTI is for. The method, and the check, are the one for the structure, and the one that is new is the numerical, and the one that the quantization is for. In the next lesson, you meet the multirate, and the one that the decimation is for, and the upsampling, and the one that the factor is for, and the same algebra, and the band and the design and the check, are the ones you already have.

::: history
The structure, and the one that the implement is for, is the one that the numerical is for. The direct form II, and the one that the delay is for, is the one that the minimum is for. The cascade, and the one that the section is for, is the one that the robust is for. The method, the one that the structure is for, is the one that the implement is for, and the one that the design is for.
:::

::: summary
- The direct form I has the separate delay of the input and the output.
- The direct form II shares the delay and needs the minimum, and the one that the order is for, of the delay.
- The cascade factorizes the IIR into the second order section.
- The parallel is the one that the partial fraction is for.
- The quantization is the one that the error is for, of the coefficient.
- The cascade is the one that the robust is for, to the quantization.
- The pole near the unit circle is the one that the sensitive is for, to the quantization.
- The design chooses the structure according to the numerical and the specification.
:::

## Exercises

::: exercise The delay {level=1 check="max(M,N)"}
The direct form II, and the one that the structure is for. How many delay, and the one that the implement is for, does it need?
::: solution
The direct form II, and the one that the structure is for, needs the maximum, and the one that the order is for, of the M and the N, and the one that the order is for, of the delay, and the one that the implement is for. The direct form I, and the one that the structure is for, needs the M plus the N, and the one that the order is for.
:::
:::

::: exercise The cascade {level=1}
The IIR, and the one that the discrete LTI is for. What is the cascade, and the one that the structure is for?
::: hint
The second order section.
:::
::: solution
The cascade, and the one that the structure is for, factorizes the IIR, and the one that the z domain is for, into the second order, and the one that the section is for, of the section, and the one that the cascade is for. Each, and the one that the section is for, is the one that the two is for, of the pole. The cascade, and the one that the IIR is for, is the one that the robust is for, to the quantization, and the one that the coefficient is for. The cascade and the section, and the one that the structure is for, are the standard, and the one that the IIR is for, of the implementation.
:::
:::

::: exercise The robust {level=1 check="robust"}
Which structure, and the one that the IIR is for, is the one that the robust is for, to the quantization, and the one that the coefficient is for?
::: solution
The cascade, and the one that the section is for, is the one that the robust is for, to the quantization, and the one that the coefficient is for. The second order, and the one that the section is for, is the less, and the one that the sensitive is for, than the higher order, and the one that the section is for. The direct form I, and the one that the structure is for, is the one that the sensitive is for, of the quantization, and the one that the coefficient is for.
:::
:::

::: exercise The sensitivity {level=2}
Explain, why the pole, near the unit circle, and the one that the z domain is for, is the one that the sensitive is for, to the quantization, and the one that the coefficient is for.
::: hint
The derivative of the pole.
:::
::: solution
The pole, near the unit circle, and the one that the z domain is for, is the one that the slow is for, of the decay, and the one that the response is for. The derivative, and the one that the pole is for, of the pole to the coefficient, and the one that the quantization is for, is the one that the large is for, when the pole is close, and the one that the z domain is for, to the other, and the one that the z domain is for, of the pole. The small, and the one that the change is for, of the coefficient, and the one that the quantization is for, gives the large, and the one that the change is for, of the pole, and the one that the z domain is for. So the pole, near the unit circle, and the one that the z domain is for, is the one that the sensitive is for, to the quantization, and the one that the coefficient is for.
:::
:::

::: exercise The parallel {level=2}
Explain, the parallel, and the one that the IIR is for, of the structure, and the one that the implement is for.
::: hint
The partial fraction.
:::
::: solution
The parallel, and the one that the IIR is for, is the one that the partial fraction is for, of the system function, and the one that the z domain is for. Each, and the one that the section is for, is the one that the first order is for, or the second order, and the one that the section is for. The parallel, and the one that the structure is for, adds, and the one that the section is for, the section, and the one that the IIR is for. The parallel, and the one that the IIR is for, is the alternative, and the one that the structure is for, to the cascade, and the one that the section is for, and the one that the implement is for.
:::
:::

::: exercise The direct form II, and the transposed {level=3}
Explain, the transposed form, and the one that the structure is for, of the direct form, and the one that the IIR is for.
::: hint
The transpose of the graph.
:::
::: solution
The transposed form, and the one that the structure is for, is the one that the transpose is for, of the signal flow graph, and the one that the IIR is for. It has the same, and the one that the delay is for, of the delay as the direct form II, and the one that the structure is for. The direct form II transposed, and the one that the structure is for, is the one that the numerical is for, and the one that the sensitivity is for, is different. The design, and the one that the IIR is for, chooses the one that the best is for, of the numerical, and the one that the structure is for, of the sensitivity, and the one that the quantization is for.
:::
:::

::: exercise The structure, and the design {level=3}
Explain, how the design, and the one that the IIR is for, chooses the structure, and the one that the implement is for.
::: hint
The numerical and the specification.
:::
::: solution
The design, and the one that the IIR is for, chooses the structure, and the one that the implement is for, according to the numerical, and the one that the quantization is for, and the specification, and the one that the response is for. The cascade, and the one that the section is for, is the one that the robust is for, to the quantization, and the one that the coefficient is for. The direct form II, and the one that the structure is for, is the one that the minimum is for, of the delay, and the one that the implement is for. The design, and the one that the IIR is for, is the one that the numerical and the specification is for, and the one that the structure is for.
:::
:::

::: exercise The quantization, and the rounding {level=3}
Explain, the effect of the rounding, of the coefficient, and the one that the quantization is for, on the response, and the one that the discrete LTI is for.
::: hint
The pole and the zero move.
:::
::: solution
The rounding, and the one that the coefficient is for, of the coefficient, and the one that the quantization is for, is the one that the move is for, of the pole, and the one that the z domain is for, and the zero, and the one that the z domain is for. The pole, and the one that the z domain is for, that is moved, and the one that the response is for, changes, and the one that the quantization is for, the frequency, and the one that the response is for, and the gain, and the one that the discrete LTI is for. The sensitivity, and the one that the quantization is for, is the one that the structure is for. The cascade, and the one that the section is for, is the one that the robust is for, to the rounding, and the one that the coefficient is for, of the rounding, and the one that the quantization is for.
:::
:::
