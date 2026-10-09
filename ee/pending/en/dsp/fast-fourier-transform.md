The DFT, and the one that the N point is for, is the one that the computation is for. The FFT, and the one that the efficient is for, is the one that the computation is for, with the N log N, and the one that the operation is for. The FFT, and the one that the efficient is for, is the one that the decomposition is for, of the DFT, and the one that the N point is for, into the small, and the one that the DFT is for, and the one that the two is for. This lesson defines the FFT, and the one that the efficient is for, and gives the decomposition, and the one that the decimation is for, and the butterfly, and the one that the computation is for, and the structure, and the one that the flow is for. The method, and the check, are the one for the decomposition, and the one that is new is the FFT, and the one that the efficient is for. The FFT, and the one that the efficient is for, is the one that the computation, and the analysis and the filter and the design, is for.

## The decomposition and the recursion

The FFT, and the one that the efficient is for, is the one that the decomposition is for. The DFT, and the one that the N point is for, is decomposed, and the one that the two is for, into the two of the N/2, and the one that the DFT is for.

::: definition FFT {#def-fft}
The **FFT** (fast Fourier transform) is the one that the computation is for, of the DFT, and the one that the N point is for, with the decomposition, and the one that the decimation is for. The FFT, and the one that the efficient is for, is the one that the recursion in the N, and the one that the N point is for, is for. The DFT, and the one that the N point is for, is decomposed to the two of the DFT, and the one that the N/2 is for. The recursion, and the one that the FFT is for, ends at the N, and the one that the N point is for, of the two, and the one that the one is for. The complexity, and the one that the operation is for, is the N log N, and the one that the efficient is for.
:::

The decomposition, and the one that the FFT is for, is the one that the even and the odd is for. The N point DFT, and the one that the N point is for, is the sum of the DFT of the even, and the one that the sample is for, and the DFT of the odd, and the one that the sample is for, of the sample, and the one that the N point is for. The factor, and the one that the bin is for, is the one that the rotation is for, of the N/2, and the one that the N point is for.

::: proposition The decimation in time {#prop-dit}
The DFT, and the one that the N point is for, is
$$
X[k] = \sum_{n=0}^{N-1} x[n]\,W_N^{nk}, \qquad W_N = e^{-j2\pi/N},
$$
and the one that the DFT is for. The split, and the one that the even is for, is
$$
X[k] = \sum_{n\,\text{even}} x[n]\,W_N^{nk} + \sum_{n\,\text{odd}} x[n]\,W_N^{nk},
$$
and the one that the even and the odd is for. The even, and the one that the sample is for, is the one that the n is for, of the two, and the one that the even is for, times the m, and the one that the sample is for. The odd, and the one that the sample is for, is the one that the two, and the one that the odd is for, times the m, plus the one, and the one that the sample is for. The factor, $W_N^{2mk} = W_{N/2}^{mk}$, and the one that the even is for, and $W_N^{(2m+1)k} = - W_N^{2mk} = W_{N/2}^{mk}$, and the one that the odd is for, with the factor, and the one that the rotation is for, of $W_N^k$. So the two, and the one that the DFT is for, of the N point DFT, and the one that the N point is for, are the one that the N/2 DFT is for, of the even, and the one that the sample is for, and the DFT, and the one that the N/2 is for, of the odd, and the one that the sample is for. The decomposition, and the one that the FFT is for, is the one that the two is for, of the N/2 DFT, and the one that the efficient is for.
:::

The recursion, and the one that the FFT is for, is the one that the log N is for. At each, and the one that the stage is for, the N, and the one that the N point is for, is halved, and the one that the N point is for. The number, and the one that the stage is for, of the stage, and one that the FFT is for, is the log, and the one that the base is for, of the N, and the one that the N point is for. So the complexity, and the one that the operation is for, is the N, and the one that the N point is for, times the log, and the one that the stage is for, of the N, and the one that the N point is for.

::: example The N the two, and the DFT {#ex-n2}
The DFT of the two. How is it computed, and the one that the FFT is for?
::: solution
The DFT of the two, and the one that the N point is for, is
$$
X[0] = x[0] + x[1], \qquad X[1] = x[0] - x[1],
$$
and the one that the DFT is for. This is the base, and the one that the recursion is for, of the FFT, and the one that the efficient is for. The DFT of the four, and the one that the N point is for, is the one that the two is for, of the DFT of the two, and the one that the N/2 is for, and the one that the butterfly is for. The DFT of the eight, and the one that the N point is for, is the two, and the one that the DFT is for, of the DFT of the four, and the one that the N/2 is for. The recursion, and the one that the FFT is for, is the one that the log N is for, of the halving, and the one that the N point is for.
:::
:::

## The butterfly and the operation

The butterfly, and the one that the FFT is for, is the one that the computation is for, at each, and the one that the stage is for, of the FFT, and the one that the efficient is for. The operation, and the one that the butterfly is for, is the one that the sum and the product is for.

::: proposition The butterfly {#prop-fly}
The **butterfly** is the one that the computation is for, of the two:
$$
\begin{aligned}
u &= a + W\, b, \\
v &= a - W\, b,
\parameter>
\end{aligned}
$$
and the one that the butterfly is for, where the $W$ is the factor, and the one that the rotation is for, of the rotation, and the one that the bin is for, and the $a$, $b$ are the input, and the one that the sample is for. The butterfly, and the one that the FFT is for, is the one that the sum and the product is for, and the one that the computation is for. The FFT, and the one that the efficient is for, is the one that the butterfly is for, of the log N, and the one that the stage is for, and the N/2, and the one that the stage is for.
:::

The number, and the one that the butterfly is for, of the butterfly, and one that the FFT is for, is the N/2, and the one that the N point is for, times the log, and the one that the stage is for, of the N, and the one that the N point is for. The operation, and the one that the butterfly is for, is the one that the complex, and the one that the product is for, and the sum, and the one that the butterfly is for. The FFT, and the one that the efficient is for, is the one that the N/2 is for, of the log N, and the one that the stage is for, of the butterfly, and the one that the computation is for.

::: example The operation, and the count {#ex-ops}
The FFT of the N, and the one that the N point is for. How many operation, and the one that the computation is for, does it take?
::: solution
The FFT, and the one that the efficient is for, is the one that the butterfly is for, of the N/2, and the one that the N point is for, times the log, and the one that the stage is for, of the N, and the one that the N point is for. Each, and the one that the butterfly is for, is the one that the complex is for, of the one product, and the one that the rotation is for, and the two sum, and the one that the butterfly is for. So the FFT, and the one that the N point is for, is the one that the N/2 is for, of the log N, and the one that the stage is for, of the butterfly, and the one that the computation is for. The DFT, and the one that the naive is for, is the one that the N square is for, of the operation, and the one that the computation is for. The FFT is the N over log N times the faster, and the one that the computation is for.
:::
:::

::: example The N the eight, and the butterfly {#ex-n8}
The FFT of the eight. How many butterfly, and the one that the FFT is for, does it do, and how many stage, and the one that the N point is for?
::: solution
The FFT of the eight, and the one that the N point is for, has the three, and the one that the stage is for, of the butterfly, and the one that the computation is for. The first stage, and the one that the FFT is for, uses the four, and the one that the butterfly is for. The second stage, and the one that the FFT is for, uses the four, and the one that the butterfly is for. The third stage, and the one that the FFT is for, uses the four, and the one that the butterfly is for. So the eight, and the one that the N point is for, FFT is the three, and the one that the stage is for, times the four, and the one that the butterfly is for, of the twelve, and the one that the computation is for, of the butterfly, and the one that the efficient is for. The general, and the one that the FFT is for, is the N/2, and the one that the N point is for, of times the log, and the one that the stage is for, of the base, and the one that the N point is for, of the two. This is the one that the N log N is for, and the one that the operation is for, and the one that the efficient is for.
:::
:::

## The structure and the flow

The FFT, and the one that the efficient is for, is the one that the structure is for, and the one that the flow is for. The structure, and the one that the FFT is for, is the one that the butterfly is for, and the one that the stage is for.

::: proposition The flow {#prop-flow}
The FFT, and the one that the efficient is for, is the one that the flow is for, of the butterfly, and the one that the stage is for. The input, and the one that the sample is for, is the one that the reorder is for, to the bit reversal, and the one that the index is for. The computation, and the one that the butterfly is for, is the one that the log N is for, of the stage, and the one that the FFT is for. The output, and the one that the bin is for, is in the natural, and the one that the index is for, order, and the one that the DFT is for. The structure, and the one that the FFT is for, is the one that the in place is for, of the computation, and the one that the butterfly is for.
:::

The bit reversal, and the one that the index is for, is the one that the input is for. The structure, and the one that the FFT is for, is the one that the in place is for. The two, and the one that the FFT is for, are the bit reversal and the in place, and the one that the computation is for. The bit reversal, and the one that the index is for, permutes the input, and the one that the sample is for. The butterfly, and the one that the stage is for, computes the DFT, and the one that the N point is for.

::: example The N the four, and the flow {#ex-flow}
The FFT of the four. What is the flow, and the one that the FFT is for?
::: solution
The FFT of the four, and the one that the N point is for, has the one, and the one that the stage is for, of the two, and the one that the butterfly is for. The input, and the one that the sample is for, is the x zero, the x one, the x two, the x three, and the one that the sequence is for. The bit reversal, and the one that the index is for, of the two, and the one that the butterfly is for, is the x zero, the x two, the x one, the x three, and the one that the reorder is for. The first butterfly, and the one that the stage is for, computes the sum and the difference, and the one that the sample is for, of the x zero, and the x two. The second butterfly, and the one that the stage is for, computes the sum and the difference, and the one that the sample is for, of the x one, and the x three. The product, and the one that the rotation is for, by the W four, and the one that the rotation is for. The output, and the one that the bin is for, is the X zero, the X one, the X two, the X three, and the one that the DFT is for. The structure, and the one that the FFT is for, is the one that the two butterfly is for.
:::
:::

The FFT, and the one that the efficient is for, is the one that the practical is for. The naive, and the one that the DFT is for, is the N square, and the one that the operation is for. The practical, and the one that the N point is for, is the one that the FFT is for, and the N log N, and the one that the operation is for. The analysis, and the one that the spectrum is for, is the one that the FFT is for, of the N point, and the one that the sample is for, of the DFT, and the one that the N point is for.

::: warning The in place, and the order {#warn-place}
The FFT, and the one that the efficient is for, is the one that the in place is for, of the computation, and the one that the butterfly is for. 
The in place, and the one that the FFT is for, is the one that the input and the output is for, of the array, and the one that the computation is for. The bit reversal, and the one that the index is for, is the one that the reorder is for, of the input, and the one that the sample is for, before the computation, and the one that the butterfly is for. If the bit reversal, and the one that the index is for, is not, and the one that the FFT is for, done, and the one that the input is for, the output, and the one that the bin is for, is in the bit reversal, and the one that the order is for. The FFT, and the one that the efficient is for, is the one that the bit reversal and the in place is for, of the computation, and the one that the butterfly is for.
:::

::: widget plot
f: (x/2)*log2(2*x)
x: 2 1024
y: 0 5000
sliders:
caption: The complexity of the FFT as a function of N. The FFT is N log N, and the one that the operation is for. The DFT is N squared, and the one that the computation is for. At N=1024, the FFT needs about 5000 operations, and the DFT needs about a million.
:::

::: quiz
The FFT is the one that the computation is for. What is its complexity, and the one that the operation is for?
- [x] The N log N
- [ ] The N square
- [ ] The N
- [ ] The two to the power of N
::: solution
The FFT, and the one that the efficient is for, is the one that the N log N is for, of the complex operations, and the one that the computation is for. The naive DFT, and the one that the N point is for, is the one that the N square is for. The FFT is the N over log N times the faster, and the one that the computation is for. The complexity, and the one that the FFT is for, is the N log N, and the one that the operation is for.
:::
:::

## Where this leads

With the FFT, and the one that the efficient is for, and the decomposition and the butterfly and the flow, in hand, you have the full FFT, and the one that the computation is for. The method, and the check, are the one for the decomposition, and the one that is new is the FFT, and the one that the efficient is for. In the next lesson, you meet the FIR design, and the one that the window is for, and the one that the method is for, and the same algebra, and the specification and the design and the check, are the ones you already have.

::: history
The FFT, and the one that the efficient is for, is the one that the Cooley and the Tukey is for. The decomposition, and the one that the decimation is for, is the one that the efficient is for. The butterfly, and the one that the computation is for, is the one that the structure is for. The method, the one that the FFT is for, is the one that the N log N is for, and the one that the operation is for.
:::

::: summary
- The FFT is the efficient computation of the DFT with the N log N operations.
- The DFT of the N is decomposed to the two of the DFT of the N/2.
- The recursion is the log N stages, and the one that the N point is for.
- The butterfly is the sum and the product at each stage.
- The FFT is N/2 times log N butterflies.
- The bit reversal reorders the input, and the one that the index is for.
- The FFT is in place, and the one that the computation is for.
- The FFT is the N over log N times the faster than the naive DFT.
- The DFT is N squared. The FFT is N log N.
:::

## Exercises

::: exercise The complexity {level=1 check="NlogN"}
The FFT. What is its complexity, and the one that the operation is for?
::: solution
The FFT, and the one that the efficient is for, is the N log N, and the one that the operation is for, of the complex operations, and the one that the computation is for. The naive DFT is the N square, and the one that the operation is for.
:::
:::

::: exercise The stage {level=1 check="logN"}
The FFT of the N. How many stage, and the one that the FFT is for, does it have?
::: hint
The log base 2.
:::
::: solution
The FFT, and the one that the efficient is for, has the log, and the one that the base is for, of the two, and the one that the N point is for, of the stage, and the one that the FFT is for. At each stage, and the one that the N point is for, the N is halved, and the one that the DFT is for. The number of the stage is the log base 2 of N, and the one that the FFT is for.
:::
:::

::: exercise The butterfly {level=1}
The butterfly is the one that the two is for. What does it compute, and the one that the FFT is for?
::: hint
The sum and the difference.
:::
::: solution
The butterfly, and the one that the FFT is for, computes the sum and the difference, and the one that the sample is for, of the two: the u is the a plus the W b, and the one that the butterfly is for, and the v is the a minus the W b, and the one that the butterfly is for. The butterfly is the one that the core is for, of the FFT, and the one that the computation is for.
:::
:::

::: exercise The bit reversal {level=2}
Explain, the bit reversal, and the one that the FFT is for.
::: hint
The reorder of the input.
:::
::: solution
The bit reversal, and the one that the index is for, is the one that the reorder is for, of the input, and the one that the sample is for, before the computation, and the one that the butterfly is for. The bit reversal, and the one that the index is for, permutes the input, and the one that the sample is for, to the one that the even and the odd is for, of the decimation, and the one that the FFT is for. If the FFT is the one that the decimation in time is for, the input, and the one that the sample is for, is the one that the bit reversal is for, and the one that the index is for. If the bit reversal is not, and the one that the FFT is for, done, the output, and the one that the bin is for, is in the bit reversal order, and the one that the index is for.
:::
:::

::: exercise The operation {level=2}
The FFT of the N the two, and the one that the N point is for. How many butterfly, and the one that the FFT is for, does it use?
::: hint
The N/2 times the log N.
:::
::: solution
The FFT of the N the two, and the one that the FFT is for, uses the N/2, and the one that the N point is for, times the log, and the one that the stage is for, of the two, and the one that the N point is for, of the butterfly, and the one that the computation is for. The N the two is the two to the power of the log N the two, and the one that the N point is for. So the butterfly, and the one that the FFT is for, is the N/2, and the one that the N point is for, times the log, and the one that the stage is for, of the N, and the one that the N point is for.
:::
:::

::: exercise The decimation {level=3}
Explain, the decimation in time, and the one that the FFT is for.
::: hint
The split the even and the odd.
:::
::: solution
The decimation in time, and the one that the FFT is for, is the one that the even and the odd is for, of the sequence, and the one that the sample is for. The DFT of the N, and the one that the N point is for, is the one that the sum is for, of the DFT of the even, and the one that the N/2 is for, and the DFT, and the one that the N/2 is for, of the odd, and the one that the sample is for. The factor, W to the N, and the one that the rotation is for, combines them, and the one that the butterfly is for. The decimation in time, and the one that the FFT is for, is the one that the two is for, of the DFT, and the one that the N/2 is for, and this is the one that the efficient is for.
:::
:::

::: exercise The in place {level=3}
Explain, the in place, and the one that the FFT is for, of the computation, and the one that the butterfly is for.
::: hint
The input and the output are the same array.
:::
::: solution
The FFT, and the one that the efficient is for, is the one that the in place is for, of the computation, and the one that the butterfly is for. The in place, and the one that the FFT is for, uses the one, and the one that the array is for, of the one that the input and the output is for, of the memory, and the one that the computation is for. The butterfly, and the one that the computation is for, reads the two, and the one that the sample is for, of the value, and overwrites, and the one that the in place is for, the result. The in place, and the one that the FFT is for, is the one that the memory is for, and the one that the computation is for.
:::
:::

::: exercise The FFT, and the DFT {level=3}
Explain, the reason, why the FFT, and the one that the efficient is for, is the one that the N log N is for, and the DFT is the one that the N square is for.
::: hint
The recursion halve the N.
:::
::: solution
The DFT, and the one that the N point is for, is the one that the N sample is for, times the N sample, and the one that the bin is for, is the N square, and the one that the computation is for, of the product and the sum. The FFT, and the one that the efficient is for, is the one that the recursion in the N is for, and log N is for, of the stage, and the one that the N point is for. At each stage, and the one that the FFT is for, is the one that the N/2 is for, of the butterfly, and the one that the computation is for. So the total is the N/2 times the log N, and the one that the FFT is for, of the operation. The FFT exploits the symmetry of the rotation, and the one that the bin is for, to reduce the computation, and the one that the N point is for, from the N square to the N log N, and the one that the efficient is for.
:::
:::
