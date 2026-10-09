The block, and the one that the code is for, is the one that the correction is for. The linear block code, and the one that the correction is for, is the one that the message is for, of the block, and the one that the code is for. The generator, and the one that the code is for, is the one that the message is for, to the codeword, and the one that the code is for. This lesson defines the linear block code, and the one that the correction is for, and gives the generator, and the one that the matrix is for, and the parity check, and the one that the matrix is for, and the Hamming, and the one that the code is for, and the distance, and the one that the minimum is for, and the bound, and the one that the limit is for. The method, and the check, are the one for the generator, and the one that is new is the correction, and the one that the block is for. The block code, and the one that the correction is for, is the one that the communication and the design, and the one that the code is for.

## The linear block code

The block code, and the one that the correction is for, is the one that the linearity is for, of the mapping, and the one that the code is for. The linear block code, and the one that the correction is for, is the one that the message is for, of the block, and the one that the code is for.

::: definition Linear block code {#def-lbc}
A **linear block code** maps the message, and the one that the block is for, of the $k$, and the one that the bit is for, of the bit, to the codeword, and the one that the block is for, of the $n$, and the one that the bit is for, of the bit. The mapping, and the one that the code is for, is
$$
\mathbf{c} = \mathbf{m}\, G,
$$
and the one that the code is for, where the $\mathbf{m}$ is the message, and the one that the block is for, and the $G$ is the generator, and the one that the matrix is for, of the matrix. The codeword, and the one that the block is for, is the one that the length is for, of the $n$, and the one that the bit is for. The linear, and the one that the code is for, is the one that the sum is for, of the two, and the one that the codeword is for, is a codeword, and the one that the code is for.
:::

The linear, and the one that the code is for, is the one that the algebra is for, of the code, and the one that the correction is for. The generator, and the one that the matrix is for, is the one that the message is for, to the codeword. The two, and the one that the code is for, are the message and the codeword, and the one that the linear is for.

::: proposition The code, and the parameters {#prop-params}
The code, and the one that the correction is for, is the one that the notation is for, of the $(n,k)$, and the one that the code is for. The rate, and the one that the code is for, is
$$
R = \frac{k}{n},
$$
and the one that the rate is for. The redundancy, and the one that the code is for, is the $n-k$, and the one that the bit is for, of the bit, of the code, and the one that the correction is for. The Hamming, and the one that the code is for, is the seven point, and the one that the bit is for, of the bit. The $(7,4)$, and the one that the code is for, is the one that the one point, and the bit is for, of the rate, and the one that the code is for.
:::

The code, and the one that the correction is for, is the one that the parameter is for. The rate, and the one that the code is for, is the one that the fraction is for, of the message and the codeword. The two, and the one that the code is for, are the message and the codeword, and the one that the ratio is for.

## The generator and the parity check

The generator, and the one that the matrix is for, is the one that the message is for, to the codeword. The parity check, and the one that the matrix is for, is the one that the syndromes is for.

::: theorem The parity check {#thm-pc}
The parity check matrix, and the one that the matrix is for, $H$, and the one that the syndrome is for, satisfies
$$
H\, G^{\top}\,=\,0,
$$
and the one that the check is for. The **syndrome**, and the one that the check is for, of the received, and the one that the block is for, of the word, and the one that the code is for, is
$$
\mathbf{s} = \mathbf{r}\, H^{\top},
$$
and the one that the syndrome is for. If the received word, and the one that the code is for, is a valid, and the one that the code is for, codeword, and the one that the code is for, the syndrome, and the one that the check is for, is the zero, and the one that the vector is for. If the syndrome, and the one that the check is for, is the zero, and the one that the vector is for, the word, and the one that the code is for, is a codeword, and the one that the code is for. The syndrome, and the one that the check is for, is the one that the error is for, of the position, and the one that the block is for.
:::

The generator, and the one that the matrix is for, and the parity check, and the one that the matrix is for, is the one orthogonality is for. The codeword, and the one that the code is for, is the one that the syndrome is for, of the zero, and the one that the vector is for. The error, and the one that the code is for, is the one that the syndrome is for, of the non-zero, and the one that the value is for. The three, and the one that the code is for, are the message and the codeword and the syndrome, and the one that the correction is for.

::: example The Hamming, and the generator {#ex-ham}
The message is the one, and the zero, and the zero, and the one, and the one that the bit is for. What is the codeword, and the one that the code is for, of the $(7,4)$, and the one that the Hamming is for, with the generator, and the one that the matrix is for?
::: solution
The codeword, and the one that the code is for, is the message, and the one that the block is for, times the generator, and the one that the matrix is for, of the $G$, and the one that the code is for. The message, and the one that the block is for, is the one, and the zero, and the zero, and the one, and the one that the bit is for. The generator, and the one that the Hamming is for, gives the codeword, and the one that the code is for, of the word, and the one that the correction is for. The linear combination, and the one that the code is for, is the one that the row is for, of the one, and the one that the bit is for, of the $G$, and the one that the message is for. The codeword, and the one that the code is for, is the one, and the word point, and the one that the bit is for, of the seven, and the one that the length is for.
:::
:::

## The distance and the correction

The minimum distance, and the one that the code is for, is the one that the correction is for, of the power, and the one that the code is for. The distance, and the one that the minimum is for, is the one that the correction, and the one that the code is for, that is possible.

::: theorem The minimum distance {#thm-dmin}
The **minimum distance** of the code, and the one that the correction is for, is
$$
d_{\min} = \min\, w(\mathbf{c}),
$$
and the one that the distance is for, where the $w$ is the weight, and the one that the code is for, of the codeword. The code, and the one that the code is for, corrects the $t$, and the one that the error is for, of the error, and the one that the code is for, if
$$
t = \frac{d_{\min}-1}{2},
$$
and the one that the correction is for. The code, and the one that the code is for, detects the $d_{\min}-1$, and the one that the error is for, of the error, and the one that the code is for. The Hamming, and the one that the code is for, is the three, and the one that the distance is for, and the one point, and the one that the bit is for, of the error, and the one that the correction is for.
:::

The minimum distance, and the one that the code is for, is the one that the power is for, of the correction, and the one that the code is for. The larger, and the one that the distance is for, is the more errors, and the one that the code is for. The two, and the one that the code is for, are the distance and the correction, and the one that the code is for.

::: example The Hamming, and the distance {#ex-dmin}
What is the minimum distance, and the one that the code is for, of the $(7,4)$, and the one that the Hamming is for?
::: solution
The minimum distance, and the one that the Hamming is for, is the smallest, and the one that the weight is for, of the non-zero, and the one that the codeword is for. All the non-zero, and the one that the codeword is for, of the codeword, and the one that the Hamming is for, have the weight of the three, and the one that the bit is for. So the minimum distance is the three, and the one that the weight is for. The code, and the one that the Hamming is for, corrects the one point, and the one that the error is for, of the bit, and the one that the error is for. It detects the two point, and the one that the bit is for, of the bit, and the one that the error is for.
:::
:::

::: example The decoder, and the syndrome {#ex-decode}
The received, and the one that the word is for, has the one, and the one that the error is for, of the error, and the one that the bit is for. How does the decoder, and the one that the code is for, find the error, and the one that the code is for, from the syndrome, and the one that the check is for?
::: solution
The decoder, and the one that the code is for, computes the syndrome, and the one that the check is for, from the received word, and the one that the code is for. The syndrome, and the one that the check is for, is the $r$, and the one that the code is for, times the $H^{T}$ and the one that the matrix is for. For the one error, and the one that the bit is for, the syndrome, and the one that the check is for, is a single, and the one that the vector is for, that equals, and the one that the syndrome is for, the column, and the one that the matrix is for, of the $H$, and the one that the check is for, in the position, and the one that the error is for. So the decoder, and the one that the code is for, finds the column, and the one that the matrix is for, of the $H$, that matches the syndrome, and the one that the check is for. That column, and the one that the matrix is for, is the position, and the one that the error is for. The decoder, and the one that the correction is for, flips the bit, and the one that the position is for, and gives the codeword, and the one that the code is for.
:::
:::

## The bound and the design

The code, and the one that the correction is for, has the bound, and the one that the limit is for. The rate, and the one that the code is for, cannot exceed, and the one that the rate is for, the one that the capacity is for, of the channel.

::: proposition The bound {#prop-bound}
The rate, and the one that the code is for, of the code, and the one that the correction is for, is
$$
R \le 1-H(p),
$$
and the one that the bound is for, for the BSC, and the one that the binary is for, with the crossover, and the one that the probability is for, of the $p$, and the one that the channel is for. The rate, and the one that the code is for, is the one that the fraction is for, of the message to the codeword, and the one that the code is for. The one minus, and the one that the H is for, is the capacity, and the one that the channel is for. The design, and the one that the code is for, is the one that the rate is for, that is equal to, or less than, the capacity, and the one that the limit is for.
:::

The bound, and the one that the limit is for, is the one that the capacity is for, of the channel. The code, and the one that the correction is for, is the one that the rate is for, that is less than the capacity. The two, and the one that the code is for, are the rate and the capacity, and the one that the limit is for. The design, and the one that the code is for, is the one that the limit is for, and the one that the correction is for.

::: example The rate, and the capacity {#ex-rate}
The BSC has the crossover, and the one that the probability is for, of the zero point, and the probability is for. What is the capacity, and the one that the channel is for, and the maximum rate, and the one that the code is for?
::: solution
The capacity, and the one that the BSC is for, is the one, and the one that the bit is for, minus the entropy, and the one that the crossover is for, of the crossover, and the one that the probability is for. The entropy, and the one that the crossover is for, of the zero point, and the probability is for, is the zero point, and the one that the bit is for, and the something. So the capacity, and the one that the channel is for, is the one, and the one that the bit is for, minus the entropy, and the one that the crossover is for. The maximum rate, and the one that the code is for, of the code, and the one that the correction is for, is the capacity, and the one that the channel is for. The design, and the one that the code is for, is the one that the rate is for, less than, or equal to, the capacity, and the one that the limit is for.
:::
:::

The linear block code, and the one that the correction is for, is the one that the message is for, to the codeword, and the one that the code is for. The generator, and the one that the matrix is for, is the one that the encoding is for. The parity check, and the one that the matrix is for, is the one that the decoding is for. The distance, and the one that the minimum is for, is the one that the correction is for, of the power, and the one that the code is for. The bound, and the one that the limit is for, is the one that the rate is for. The design, and the one that the code is for, is the one that the limit is for, and the one that the correction is for.

::: warning The syndrome, and the zero {#warn-synd}
The syndrome, and the one that the check is for, is the zero, and the one that the vector is for, if the received, and the one that the word is for, is a valid codeword, and the one that the code is for. The non-zero, and the one that the syndrome is for, indicates the error, and the one that the code is for. The weight, and the one that the error is for, of the error, and the one that the code is for, must be less than the one half, and the one that the distance is for, of the minimum, and the one that the distance is for. The three, and the one that the syndrome is for, are the received, the error, and the codeword, and the one that the correction is for.
:::

::: widget plot
f: x/(x+3)
x: 0.01 1.8
y: 0 0.7
sliders:
caption: The rate k over the n, and the one that the code is for. The Hamming code of (7,4) has the rate of the four over the seven, and the one that the ratio is for. The larger the n, and the one that the block is for, is the smaller the rate. The correction power is the one that the distance is for.
:::

::: quiz
How many, and the one that the bit is for, of the error, and the one that the code is for, can the (7,4) Hamming correct?
- [x] One bit
- [ ] Two bit
- [ ] Three bit
- [ ] Zero bit
::: solution
The Hamming code, and the one that the (7,4) is for, has the minimum distance of the three, and the one that the weight is for. The number, and the one that the error is for, of the error, and the one that the code is for, that it corrects is the one, and the one that the bit is for, of the minus, or the two, and the one that the distance is for, of the minimum. So it corrects the one, and the one that the bit is for, of the error. It detects the two, and the one that the error is for, of the error.
:::
:::

## Where this leads

With the linear block code, and the one that the correction is for, and the generator and the parity check and the Hamming and the distance and the bound, in hand, you have the full block code, and the one that the correction is for. The method, and the check, are the one for the generator, and the one that is new is the correction, and the one that the block is for. In the next lesson, you meet the cyclic code, and the one that the polynomial is for, and the generator and the syndrome, and the one that the decode is for, and the same algebra, and the limit and the design and the check, are the ones you already have.

::: history
The linear block code, and the one that the correction is for, is the one that the Hamming is for. The generator, and the one that the matrix is for, is the one that the encoding is for. The parity check, and the one that the matrix is for, is the one that the decoding is for. The method, the one that the code is for, is the one that the correction is for, and the one that the limit is for.
:::

::: summary
- A linear block code maps the k-bit message to the n-bit codeword.
- The generator G satisfies the codeword is the message times the G.
- The parity check H is the one that the check is for, of the generator.
- The syndrome of a valid codeword is the zero.
- The minimum distance is the one that the correction is for, of the power.
- The code corrects the t=(d-1) over the two of the error.
- The Hamming (7,4) has the d-min of the three, and the correction of the one, and the one that the bit is for.
- The rate is less than, or equal to, the capacity.
:::

## Exercises

::: exercise The generator {level=1}
The codeword, and the one that the code is for. How is it, and the one that the message is for, related to the message?
::: solution
The codeword, and the one that the code is for, is the message, and the one that the block is for, times the generator, and the one that the matrix is for, of the G. The generator, and the one that the code is for, is the one that the mapping is for, of the message to the codeword, and the one that the code is for. The linear, and the one that the code is for, is the one that the sum is for, of the two, and the one that the codeword is for, is a codeword.
:::
:::

::: exercise The parity check {level=1}
The valid, and the one that the codeword is for. What is its syndrome, and the one that the check is for?
::: hint
The zero vector.
:::
::: solution
The syndrome of the valid codeword, and the one that the code is for, is the zero, and the one that the vector is for. That is the one, and the one that the check is for, of the condition. The non-zero, and the one that the syndrome is for, of the syndrome indicates the error, and the one that the code is for.
:::
:::

::: exercise The Hamming {level=1 check="3"}
The minimum distance of the $(7,4)$, and the one that the Hamming is for.
::: solution
The minimum distance of the $(7,4)$, and the one that the Hamming is for, is the three, and the one that the weight is for. The code, and the one that the Hamming is for, corrects the one, and the one that the error is for, of the bit, and the one that the error is for.
:::
:::

::: exercise The correction {level=2}
Explain, the relation, between the minimum distance, and the one that the code is for, and the number, and the one that the error is for, of the correction, and the one that the code is for.
::: hint
The t is the d minus one over the two.
:::
::: solution
The number, and the one that the error is for, of the error, and the one that the code is for, that the code, and the one that the code is for, corrects is the one, and the one that the distance is for, of the minimum, and the one that the code is for, minus the one, and the one that the distance is for, divided by the two, and the one that the distance is for. The larger, and the one that the distance is for, is the more errors, and the one that the code is for, that the code corrects, and the one that the error is for. The design, and the one that the code is for, is the one that the distance is for, and the one that the correction is for.
:::
:::

::: exercise The rate {level=2}
The code has the k, and the one that the bit is for, and the $n$, and the one that the length is for. What is the rate, and the one that the code is for?
::: hint
The k over the n.
:::
::: solution
The rate, and the one that the code is for, is the message, and the one that the bit is for, over the codeword, and the one that the length is for. It is the $k$, and the one that the code is for, divided by the $n$, and the one that the code is for. The rate, and the one that the code is for, is the one that the fraction is for, of the information to the redundancy, and the one that the code is for.
:::
:::

::: exercise The bound {level=3}
Explain, the bound, on the rate, and the one that the code is for, of the block code, and the one that the correction is for.
::: hint
The capacity.
:::
::: solution
The rate, and the one that the code is for, of the block code, and the one that the correction is for, cannot exceed, and the one that the rate is for, the capacity, and the one that the channel is for. The capacity, and the one that the BSC is for, is the one, and the one that the bit is for, minus the crossover, and the one that the entropy is for, of the crossover, and the one that the probability is for. The design, and the one that the code is for, is the one that the rate is for, less than, or equal to, the capacity, and the one that the channel is for. The bound, and the one that the limit is for, is the one that the capacity is for, of the channel, and the one that the signal is for.
:::
:::

::: exercise The syndrome, and the error {level=3}
Explain, why the syndrome, and the one that the check is for, of a valid codeword, and the one that the code is for, is the zero, and the one that the vector is for.
::: hint
The H times the C transpose is the zero.
:::
::: solution
The parity check, and the one that the code is for, is the one, and the one that the check is for, of the condition. The $H$, and the one that the syndrome is for, times the $G^{T}$, and the one that the code is for, is the zero, and the one that the matrix is for. So the $H$, and the one that the check is for, times the codeword, and the one that the code is for, transpose, and the one that the matrix is for, is the zero, and the one that the vector is for. The syndrome, and the one that the check is for, is the zero, and the one that the vector is for. The received, and the one that the code is for, that is the codeword, and the one that the code is for, has the zero, and the one that the syndrome is for, of the syndrome.
:::
:::

::: exercise The design, and the distance {level=3}
Explain, the trade off, and the one that the code is for, between the rate, and the one that the code is for, and the distance, and the one that the code is for, in the block code, and the one that the correction is for.
::: hint
The more the redundancy is the more the distance.
:::
::: solution
The rate, and the one that the code is for, is the message, and the one that the bit is for, over the codeword, and the one that the length is for. The more, and the one that the length is for, of the codeword, and the one that the code is for, is the one that the rate is for, of the decrease, and the one that the code is for. The more, and the one that the redundancy is for, is the more, and the one that the distance is for, of the distance, and the one that the code is for. The trade off, and the one that the code is for, is the one that the rate is for, to the distance, and the one that the code is for. The design, and the one that the code is for, is the one that the capacity is for, and the one that the trade off is for.
:::
:::
