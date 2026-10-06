The convolution, and the one that the code is for, is the one that the memory is for. The convolutional code, and the one that the correction is for, is the one that the memory is for, of the encoder, and the one that the code is for. The memory, and the one that the encoder is for, is the one that the past is for, of the input, and the one that the bit is for. This lesson defines the convolutional code, and the one that the code is for, and gives the encoder, and the one that the memory is for, and the trellis, and the one that the graph is for, and the Viterbi, and the one that the decoding is for, and the free distance, and the one that the limit is for, and the bound, and the one that the performance is for. The method, and the check, are the one for the encoder, and the one that is new is the memory, and the one that the code is for. The convolutional code, and the one that the correction is for, is the one that the communication and the design, and the one that the code is for.

## The convolutional code and the memory

The convolutional code, and the one that the correction is for, is the one that the memory is for. The memory, and the one that the encoder is for, is the one that the past is for, of the input, and the one that the bit is for.

::: definition Convolutional code {#def-conv}
The **convolutional code** is the one that the encoder, and the one that the memory is for, of the delay, and the one that the element is for, is for. It maps the bit, and the one that the input is for, of the input, and the one that the message is for, to the symbol, and the one that the output is for, of the output, and the one that the code is for, with the memory, and the one that the past is for, of the input, and the one that the bit is for. The convolution, and the one that the code is for, is
$$
c_t = \sum_{k} g_k\, u_{t-k},
$$
and the one that the convolution is for, where the $g_k$ is the tap, and the one that the generator is for, and the $u_{t-k}$ is the input, and the one that the bit is for, at the earlier, and the one that the time is for, of the time, and the one that the bit is for. The memory, and the one that the encoder is for, is the one that the finite is for, of the delay, and the one that the element is for.
:::

The convolutional, and the one that the code is for, is the one that the memory is for. The block, and the one that the code is for, is the one that the stateless is for. The two, and the one that the code is for, are the convolutional and the block, and the one that the correction is for. The convolutional, and the one that the memory is for, is the one that the past is for. The block, and the one that the correction is for, is the one that the instantaneous is for.

::: proposition The code, and the rate {#prop-convrate}
The convolutional code, and the one that the correction is for, is the one that the notation is for, of the $(n,k,K)$, and the one that the code is for. The $k$ is the input, and the one that the bit is for, of the bit. The $n$ is the output, and the one that the symbol is for, of the symbol. The $K$ is the constraint, and the one that the length is for, of the length. The rate, and the one that the code is for, is
$$
R = \frac{k}{n},
$$
and the one that the rate is for. The constraint length, and the one that the code is for, is the one that the memory is for, of the encoder, and the one that the code is for. The number, and the one that the state is for, of the state, and the one that the trellis is for, of the trellis, and the one that the graph is for, is the two, and the one that the power is for, of the two, to the $K-1$, and the one that the length is for.
:::

The rate, and the one that the code is for, is the one that the fraction is for, of the input to the output, and the one that the bit is for. The constraint, and the one that the length is for, is the one that the memory is for, of the delay, and the one that the element is for. The state, and the one that the trellis is for, is the one that the past is for, of the input. The three, and the one that the code is for, are the input and the output and the memory, and the one that the convolution is for.

## The encoder and the tap

The encoder, and the one that the memory is for, is the one that the tap is for. The tap, and the one that the generator is for, is the one that the polynomial is for, of the generator, and the one that the code is for.

::: theorem The encoder {#thm-enc}
The encoder, and the one that the convolution is for, of the $(2,1,2)$, and the one that the code is for, has the two, and the one that the output is for, of the output, and the one that the symbol is for. The first, and the one that the output is for, is
$$
c_1 = u_t + u_{t-1} + u_{t-2},
$$
and the one that the convolution is for. The second, and the one that the output is for, is
$$
c_2 = u_t + u_{t-1},
$$
and the one that the convolution is for. The tap, and the one that the generator is for, is the one that the generator, and the one that the polynomial is for, of the polynomial. The encoder, and the one that the memory is for, is the one that the shift, and the one that the register is for, of the register, and the one that the memory is for.
:::

The encoder, and the one that the convolution is for, is the one that the memory is for, of the delay. The tap, and the one that the generator is for, is the one that the polynomial is for. The output, and the one that the symbol is for, is the one that the convolution is for, of the input and the memory. The two, and the one that the code is for, are the first, and the second, and the one that the output is for.

::: example The encoder, and the output {#ex-enc}
The input is the one, and the zero, and the one, and the one that the bit is for. What is the output, and the one that the code is for, of the $(2,1,2)$, and the one that the code is for, with the tap, and the one that the generator is for, of the one one one, and the one one zero?
::: solution
At the first, and the one that the time is for, the input is the one, and the one that the bit is for. The memory is the zero, and the one that the bit is for. The first output, and the one that the symbol is for, is the one, and the zero, and the zero, and the one that is the bit is for, that is the one. The second output, and the one that the symbol is for, is the one, and the zero, and the one is the bit is for, that is the one. So the first, and the one that the symbol is for, is the output, and the one that the code is for, of the one one, and the one that the bit is for. In the following, and the one that the time is for, the output, and the one that the symbol is for, is the zero, and the one, and the zero, and the one point, and the one that the bit is for, of the symbol, and the one that the code is for. So the input of the one, and the zero, and the one is for, gives the output, and the one that the code is for, of the one one, and the zero one, and the one point, and the one that the bit is for.
:::
:::

## The trellis and the Viterbi

The trellis, and the one that the graph is for, is the one that the state is for, of the encoder, and the one that the memory is for. The Viterbi, and the one that the decoding is for, is the one that the path is for, over the trellis, and the one that the graph is for.

::: theorem The Viterbi {#thm-vit}
The **Viterbi** decoder, and the one that the convolution is for, of the convolutional code, and the one that the correction is for, finds the path, and the one that the trellis is for, over the trellis, and the one that the graph is for, that is the closest, and the one that the distance is for, to the received, and the one that the sequence is for, of the sequence. The method, and the one that the Viterbi is for, is the one that the state, and the one that the time is for, of the state, and the one that the graph is for. At each, and the one that the time is for, of the time, and the one that the bit is for, it keeps, and the one that the Viterbi is for, the best, and the one that the metric is for, of the path, to each state, and the one that the graph is for. The metric, and the one that the path is for, is the one that the distance is for, of the received, and the one that the sequence is for, and the path, and the one that the trellis is for. The Viterbi, and the one that the decoding is for, is the one that the maximum, and the one that the likelihood is for, of the likelihood, and the one that the path is for.
:::

The trellis, and the one that the graph is for, is the one that the state is for, of the memory, and the one that the encoder is for. The branch, and the one that the graph is for, is the one that the code is for, of the input and the output. The Viterbi, and the one that the decoding is for, is the one that the path is for. The three, and the one that the decoding is for, are the trellis and the branch and the path, and the one that the Viterbi is for.

::: example The Viterbi, and the path {#ex-vit}
The code has the four, and the one that the state is for, of the state, and the one that the trellis is for. What is the Viterbi, and the one that the decoding is for, doing, at each, and the one that the state is for?
::: solution
At each, and the one that the state is for, of the state, and the one that the trellis is for, the Viterbi, and the one that the decoding is for, keeps the best path, and the one that the metric is for, to that state, and the one that the graph is for. The metric, and the one that the path is for, is the one that the distance is for, of the received and the path, and the one that the sequence is for. From each, and the one that the state is for, there are the two, and the one that the branch is for, of the branch, and the one that the code is for. The Viterbi, and the one that the decoding is for, chooses the branch, and the one that the graph is for, that has the better, and the one that the metric is for, of the metric, and the one that the path is for. The result, and the one that the decoding is for, is the path, and the one that the trellis is for, that is the closest, and the one that the distance is for, to the received, and the one that the sequence is for.
:::
:::

::: example The soft, and the metric {#ex-soft}
The received, and the one that the symbol is for, has the soft value, and the one that the number is for. How does the Viterbi, and the one that the decoding is for, use the soft, and the one that the value is for, of the value, and the one that the decoding is for, and the gain, and the one that the performance is for?
::: solution
The hard, and the one that the decision is for, of the metric, and the one that the decoding is for, counts the number, and the one that the bit is for, of the bit, and the one that the symbol is for. The soft, and the one that the metric is for, of the metric, and the one that the decoding is for, uses the value, and the one that the number is for, of the value. The soft, and the one that the metric is for, is the square, and the one that the distance is for, of the distance, from the received, and the one that the symbol is for, and the path, and the one that the trellis is for. The soft decision, and the one that the decoding is for, weights the error, and the one that the symbol is for, by how far it is, and the one that the value is for, from the code, and the one that the symbol is for. This gives the gain, and the one that the performance is for, of the one point to the two, and the one point, and the one that the decibel is for, over the hard, and the one that the decision is for, of the decision. The gain, and the one that the soft is for, is the one that the soft is for, and the one that the metric is for.
:::
:::

## The free distance and the performance

The free distance, and the one that the code is for, is the one that the performance is for, of the convolutional, and the one that the code is for. The bound, and the one that the limit is for, is the one that the error is for, of the probability, and the one that the channel is for.

::: proposition The free distance {#prop-dfree}
The **free distance** $d_{\text{free}}$, and the one that the code is for, is the smallest, and the one that the weight is for, of the non-zero, and the one that the path is for. It is the one that the error is for, of the performance, and the one that the code is for. The bound, and the one that the limit is for, of the probability, and the one that the error is for, of the bit, and the one that the channel is for, is
$$
p_e \lesssim A_{d_{\text{free}}}\, 2^{-d_{\text{free}}\, \mathrm{SNR}},
$$
and the one that the bound is for. The larger, and the one that the distance is for, of the free distance, and the one that the code is for, is the better, and the one that the performance is for. The design, and the one that the code is for, is the one that the free distance is for, that is the large, and the one that the value is for.
:::

The free distance, and the one that the code is for, is the one that the performance is for. The bound, and the one that the limit is for, is the one that the exponential is for, in the SNR, and the one that the power is for, of the signal. The two, and the one that the code is for, are the distance and the SNR, and the one that the performance is for. The larger, and the one that the distance is for, is the more, and the one that the exponential is for, of the suppression, and the one that the error is for.

::: example The free distance, and the performance {#ex-dfree}
The code has the free distance, and the one that the limit is for, of the five, and the one that the weight is for. How does the performance, and the one that the error is for, scale, and the one that the limit is for, with the SNR, and the one that the power is for?
::: solution
The bound, and the one that the limit is for, of the probability, and the one that the error is for, is the exponential, and the one that the decay is for, of the minus, and the one that the SNR is for, of the SNR, and the one that the power is for, times the free distance, and the one that the code is for. When the free distance, and the one that the code is for, is the five, and the one that the value is for, the bound, and the one that the limit is for, is the exponential, and the one that the decay is for, of the five, and the one that the distance is for, times the SNR, and the one that the power is for. So the bit, and the one that the error is for, rate decays, and the one that the limit is for, as the exponential, and the one that the decay is for, of the five, and the one that the SNR is for. This is the one that the superior is for, to the block code, and the one that the correction is for, at the low, and the one that the SNR is for.
:::
:::

The convolutional, and the one that the code is for, is the one that the memory is for. The block, and the one that the correction is for, is the one that the stateless is for. The Viterbi, and the one that the decoding is for, is the one that the optimal is for, of the convolutional, and the one that the code is for. The free distance, and the one that the code is for, is the one that the performance is for. The design, and the one that the code is for, is the one that the distance is for, and the one that the limit is for.

::: warning The delay, and the latency {#warn-lat}
The convolutional code, and the one that the code is for, has the delay, and the one that the memory is for, of the memory, and the one that the encoder is for. The Viterbi, and the one that the decoding is for, needs the future, and the one that the symbol is for, to decide, and the one that the path is for. So the decoding, and the one that the code is for, has the latency, and the one that the delay is for, of the delay, and the one that the system is for. The block, and the one that the code is for, has the block, and the one that the delay is for, of the delay, and the one that the code is for. The two, and the one that the latency is for, are the convolutional and the block, and the one that the delay is for.
:::

::: widget plot
f: exp(-8*x/10)
x: 0 6
y: 0 1.3
sliders:
caption: The bound on the bit error rate versus the SNR for a code with free distance. The larger the free distance and the one that the code is for, is the steeper and the one that the decay is for. This is the superior to the block code and the one that the correction is for.
:::

::: quiz
The Viterbi decoder. What does it find, and the one that the path is for?
- [x] The best path, and the one that the metric is for
- [ ] The no path
- [ ] The random path
- [ ] The the first path
::: solution
The Viterbi, and the one that the decoding is for, finds the path, and the one that the trellis is for, over the trellis, and the one that the graph is for, that has the best, and the one that the metric is for, of the metric. The metric, and the one that the path is for, is the one that the distance is for, of the received, and the one that the sequence is for, and the path, and the one that the trellis is for. The Viterbi, and the one that the decoding is for, is the one that the maximum, and the one that the likelihood is for, of the likelihood, and the one that the path is for.
:::
:::

## Where this leads

With the convolutional code, and the one that the memory is for, and the encoder and the trellis and the Viterbi and the free distance, in hand, you have the full convolutional, and the one that the correction is for. The method, and the check, are the one for the encoder, and the one that is new is the memory, and the one that the code is for. In the next lesson, you meet the modern code, and the one that the channel is for, of the LDPC and the turbo and the code, and the one that the limit is for, and the same algebra, and the limit and the design and the check, are the ones you already have.

::: history
The convolutional code, and the one that the memory is for, is the one that the convolution is for. The Viterbi, and the one that the decoding is for, is the one that the optimal is for. The free distance, and the one that the code is for, is the one that the performance is for. The method, the one that the code is for, is the one that the memory is for, and the one that the correction is for.
:::

::: summary
- The convolutional code has the memory, and the one that the encoder is for.
- The rate is the k over the n, and the one that the fraction is for.
- The constraint length K is the one that the memory is for.
- The number of states is the two to the K minus one, and the one that the power is for.
- The Viterbi finds the best path, and the one that the trellis is for.
- The free distance is the one that the performance is for.
- The bound is the exponential, and the one that the SNR is for, in the SNR, and the one that the power is for.
- The convolutional is better than the block, and the one that the correction is for, at the low, and the one that the SNR is for.
:::

## Exercises

::: exercise The rate {level=1 check="1/2"}
The convolutional, and the one that the code is for, of the two output, and the one that the symbol is for, and the one input, and the one that the bit is for. What is the rate, and the one that the code is for?
::: solution
The rate, and the one that the code is for, is the input, and the one that the bit is for, over the output, and the one that the symbol is for. It is the one, and the one that the bit is for, divided by the two, and the one that the symbol is for. So the rate is the one over the two, and the one that the fraction is for. The two, and the one that the output is for, is the one that the symbol is for, per the one, and the one that the bit is for, of the input.
:::
:::

::: exercise The state {level=1}
The code has the constraint length, and the one that the code is for, of the three. How many, and the one that the state is for, of the state, and the one that the trellis is for?
::: hint
The two to the K minus one.
:::
::: solution
The number, and the one that the state is for, of the state, and the one that the trellis is for, is the two, to the $K-1$, and the one that the power is for. When the $K$ is the three, and the one that the length is for, the state, and the one that the graph is for, is the two, to the two, and the one that the power is for, that is the four, and the one that the value is for. So the trellis, and the one that the graph is for, has the four, and the one that the state is for, of the state, and the one that the graph is for.
:::
:::

::: exercise The Viterbi {level=1}
The Viterbi. What does it find, and the one that the path is for?
::: solution
The Viterbi, and the one that the decoding is for, finds the path, and the one that the trellis is for, that has the best, and the one that the metric is for, of the metric. The metric, and the one that the path is for, is the one that the distance is for, of the received and the path. It is the one that the maximum, and the one that the likelihood is for, of the likelihood, and the one that the path is for.
:::
:::

::: exercise The free distance {level=2}
Explain, the free distance, and the one that the code is for, of the convolutional, and the one that the correction is for.
::: hint
The minimum non-zero weight.
:::
::: solution
The free distance, and the one that the code is for, is the smallest, and the one that the weight is for, of the non-zero, and the one that the path is for, over the trellis, and the one that the graph is for. It is the one, and the one that the code is for, of the code, and the one that the convolution is for. The larger, and the one that the distance is for, is the better, and the one that the performance is for. It is the one that the error is for, of the probability, and the one that the channel is for, is for.
:::
:::

::: exercise The bound {level=2}
Explain, the bound, of the probability, and the one that the error is for, of the convolutional, and the one that the correction is for, code.
::: hint
The exponential in the SNR.
:::
::: solution
The bound, and the one that the limit is for, of the probability, and the one that the error is for, is the exponential, and the one that the decay is for, of the minus, times the free distance, and the one that the code is for, times the SNR, and the one that the power is for. The larger, and the one that the distance is for, is the steeper, and the one that the decay is for, of the bound. This is the one that the performance is for.
:::
:::

::: exercise The memory, and the state {level=3}
Explain, why the number, and the one that the state is for, of the state, and the one that the trellis is for, is the two, to the $K$ minus the one, and the one point, and the one that the power is for.
::: hint
The past is the K minus one.
:::
::: solution
The memory, and the one that the encoder is for, is the one that the past is for, of the input, and the one that the bit is for. The state, and the one that the trellis is for, is the one that the past is for, of the input, and the one that the bit is for. The past, and the one that the input is for, is the $K-1$, and the one that the length is for, of the bit, and the one that the memory is for. Each, and the one that the bit is for, is the two, and the one that the value is for, and the symbol. So the state, and the one that the graph is for, is the two, to the $K-1$, and the one that the power is for. This is the one that the memory is for, of the encoder.
:::
:::

::: exercise The block, and the convolutional {level=3}
Explain, the difference, between the block code, and the one that the correction is for, and the convolutional, and the one that the code is for.
::: hint
The memory.
:::
::: solution
The block, and the one that the code is for, is the one that the stateless is for. It has the no memory, and the one that the encoder is for. The convolutional, and the one that the code is for, is the one that the memory is for. It has the memory, and the one that the encoder is for, of the delay. The state, and the one that the trellis is for, is the one that the memory is for. The decoding, and the one that the code is for, is the one that the Viterbi is for, for the convolutional, and the one that the code is for, and the syndrome, and the one that the check is for, for the block, and the one that the code is for. The convolutional, and the one that the correction is for, is the one that the superior is for, at the low, and the one that the SNR is for.
:::
:::

::: exercise The design, and the limit {level=3}
Explain, the relation, between the free distance, and the one that the code is for, and the design, and the one that the code is for, of the convolutional, and the one that the correction is for.
::: hint
The free distance is the larger, the better.
:::
::: solution
The free distance, and the one that the code is for, is the one that the performance is for. The larger, and the one that the distance is for, is the better, and the one that the performance is for. The design, and the one that the code is for, is the one that the free distance is for, that is the large, and the one that the value is for. But the large, and the one that the distance is for, is the one that the delay is for, of the memory, and the one that the encoder is for. So the design, and the one that the code is for, is the one that the trade off is for, of the distance and the memory, and the one that the latency is for.
:::
:::
