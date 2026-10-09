The message, and the one that the source is for, is the one that the surprise is for. The information is the one that the surprise is for, and the one that the probability is for. The entropy is the one that the average is for, of the surprise, and the one that the source is for. This lesson defines the information, and the one that the surprise is for, and gives the entropy, and the one that the source is for, and the mutual information, and the one that the channel is for, and the property, and the one that the limit is for. The method, and the check, are the one for the entropy, and the one that is new is the information, and the one that the surprise is for. The entropy, and the one that the source is for, is the one that the compression and the capacity and the design, is for.

## The information and the surprise

The symbol, and the one that the source is for, has the information, and the one that the surprise is for. The information, and the one that the symbol is for, is the one that the probability is for, and the one that the surprise is for.

::: definition Information {#def-info}
The **information** of a symbol, and the one that the source is for, of probability $p$, is
$$
I = -\log_2 p,
$$
and the one that the information is for, and the one that the bit is for. The information, and the one that the symbol is for, is the one that the surprise is for, and the one that the probability is for. The probability, and the one that the source is for, is the one that the surprise is for, of the symbol, and the one that the message is for. The information, and the one that the symbol is for, is the one that the bit is for, and the one that the unit is for.
:::

::: proposition The entropy {#prop-ent}
The **entropy** of the source, and the one that the symbol is for, is
$$
H = -\sum_{i} p_i \log_2 p_i,
$$
and the one that the entropy is for, and the one that the bit is for. The entropy, and the one that the source is for, is the one that the average is for, of the information, and the one that the symbol is for, of the symbol, and the one that the message is for. The entropy, and the one that the source is for, is the one that the bit is for, of the symbol, and the one that the message is for. The entropy, and the one that the source is for, is the one that the limit is for, of the compression, and the one that the source is for, and the one that the code is for.
:::

The entropy, and the one that the source is for, is the one that the limit is for, of the compression, and the one that the source is for. The code, and the one that the compression is for, compresses the message, and the one that the source is for, to the entropy, and the one that the limit is for. The two, and the one that the source is for, are the message and the entropy, and the one that the compression is for.

::: example The fair, and the entropy {#ex-fair}
The symbol has the two, and the one that the source is for, of the equiprobable, and the one that the symbol is for. What is the entropy, and the one that the source is for?
::: solution
The entropy, and the one that the source is for, of the two, and the one that the equiprobable is for, of the symbol, and the one that the probability is for, of the one half, and the one that the probability is for, is the two, and the one that the bit is for, of the minus, and the one that the log is for, of the one half, and the one that the probability is for. The minus one half, and the one that the log is for, of the one half, and the one that the probability is for, is the minus one half, and the one that the bit is for, of the minus one, and the one that the log is for, and the one half, and the one that the bit is for. So the entropy, and the one that the source is for, is the one, and the one that the bit is for, of the symbol, and the one that the message is for. The fair, and the one that the symbol is for, is the one that the maximum is for, of the surprise, and the one that the probability is for.
:::
:::

## The mutual information and the channel

The channel, and the one that the signal is for, connects the source, and the one that the message is for, to the destination, and the one that the message is for. The mutual information, and the one that the channel is for, is the one that the information is for, of the source, and the one that the message is for, at the destination, and the one that the message is for.

::: definition Mutual information {#def-mut}
The **mutual information** between the source, and the one that the symbol is for, and the channel, and the one that the signal is for, is
$$
I(X;Y) = \sum_{x,y} p(x,y)\,\log_2 \frac{p(x,y)}{p(x)\,p(y)},
$$
and the one that the mutual information is for. The mutual information, and the one that the channel is for, is the one that the information is for, that the channel, and the one that the signal is for, transmits, and the one that the message is for. The mutual information, and the one that the channel is for, is the one that the bit is for, of the symbol, and the one that the message is for. The mutual information, and the one that the channel is for, is the one that the limit is for, of the communication, and the one that the channel is for.
:::

::: proposition The capacity {#prop-cap}
The **capacity** of the channel, and the one that the signal is for, is
$$
C = \max_{p(x)}\, I(X;Y),
$$
and the one that the capacity is for, and the one that the bit is for. The capacity, and the one that the channel is for, is the one that the maximum is for, of the mutual information, and the one that the channel is for, over the input, and the one that the distribution is for, of the distribution, and the one that the source is for. The capacity, and the one that the channel is for, is the one that the rate is for, of the communication, and the one that the channel is for, that is possible, and the one that the limit is for. The capacity, and the one that the channel is for, is the one that the Shannon is for, of the limit, and the one that the communication is for.
:::

The capacity, and the one that the channel is for, is the one that the limit is for, of the communication, and the one that the signal is for. The code, and the one that the channel is for, approaches the capacity, and the one that the limit is for. The two, and the one that the channel is for, are the communication and the capacity, and the one that the code is for.

::: example The binary, and the capacity {#ex-bsc}
The binary channel has the crossover, and the one that the error is for, of the one over the ten, and the one that the probability is for. What is the capacity, and the one that the channel is for?
::: solution
The capacity, and the one that the BSC is for, is the one, and the one that the bit is for, minus the entropy, and the one that the crossover is for, of the crossover, and the one that the probability is for. The entropy, and the one that the one over the ten is for, of the one over the ten, and the one that the probability is for, is the zero point, and the one that the bit is for, and the four, and the one that the digit is for, and the six, and the one that the digit is for, and the nine, and the one that the digit is for. So the capacity, and the one that the channel is for, is the one, and the one that the bit is for, minus the zero point, and the one that the bit is for, and the four, and the one that the digit is for, and the six, and the one that the digit is for, and the nine, and the one that the digit is for, and the zero point, and the one that the bit is for, and the five, and the one that the digit is for, and the three, and the one that the digit is for, and the one, and the one that the bit is for, of the symbol. The binary channel, and the one that the crossover is for, is the one that the zero point, and the one that the bit is for, and the five, and the one that the digit is for, and the three, and the one that the digit is for, of the capacity.
:::
:::

::: example The biased, and the surprise {#ex-biased}
The symbol, and the one that the source is for, is the one point nine, and the one that the probability is for, of the one, and the one that the event is for. What is the entropy, and the one that the source is for?
::: solution
The entropy, and the one that the source is for, of the one point nine, and the one that the probability is for, of the one, and the one that the event is for, and the zero point one, and the one that the probability is for, of the other, and the one that the event is for, is the minus, and the one that the log is for, of the one point nine, and the one that the probability is for, times the one point nine, and the one that the probability is for, plus the minus, and the one that the log is for, of the zero point one, and the one that the probability is for, times the zero point one, and the one that the probability is for. It is the zero point, and the one that the bit is for, and the four, and the one that the digit is for, and the six, and the one that the digit is for, and the nine, and the one that the digit is for. The biased, and the one that the source is for, has the one that the less is for, than the fair, and the one that the symbol is for, of the surprise. The less, and the one that the surprise is for, the more, and the one that the probability is for, of the one event, and the one that the symbol is for.
:::
:::

## The property and the limit

The entropy, and the one that the source is for, has the property, and the one that the limit is for. The property, and the one that the information is for, is the one that the maximum and the minimum is for.

::: proposition The entropy property {#prop-entp}
The entropy, and the one that the source is for, of the N, and the one that the symbol is for, of the equiprobable, and the one that the symbol is for, symbol, and the one that the probability is for, is
$$
H = \log_2 N,
$$
and the one that the maximum is for, of the entropy, and the one that the source is for. The entropy, and the one that the source is for, is the zero, and the one that the bit is for, when the symbol, and the one that the probability is for, is certain, and the one that the one is for. The entropy, and the one that the source is for, is the one that the maximum is for, of the surprise, and the one that the probability is for, of the equiprobable, and the one that the symbol is for. The mutual information, and the one that the channel is for, is the zero, and the one that the bit is for, when the source, and the one that the one is for, and the channel, and the one that the signal is for, is independent, and the one that the symbol is for.
:::

The entropy, and the one that the source is for, is the one that the maximum is for. The capacity, and the one that the channel is for, is the one that the limit is for. The two, and the one that the information is for, are the maximum and the limit, and the one that the communication is for. The entropy sets the compression, and the one that the source is for. The capacity sets the transmission, and the one that the channel is for.

::: example The die, and the bits {#ex-die}
The die has the six, and the one that the symbol is for, of the face, and the one that the probability is for. What is the entropy, and the one that the source is for?
::: solution
The entropy, and the one that the source is for, of the six, and the one that the equiprobable is for, of the face, and the one that the probability is for, is the log, and the one that the base is for, of the six, and the one that the symbol is for, of the base, and the one that the bit is for, of the two. The log of the six, and the one that the base is for, of the base, and the one that the bit is for, of the two, is the two point, and the one that the digit is for, and the five, and the one that the digit is for, and the eight, and the one that the digit is for, and the five, and the one that the digit is for, of the bit, and the one that the symbol is for. So the die, and the one that the source is for, is the two point, and the one that the digit is for, and the five, and the one that the digit is for, and the eight, and the one that the digit is for, and the five, and the one that the digit is for, of the bit, and the one that the symbol is for, of the face, and the one that the probability is for.
:::
:::

The entropy, and the one that the source is for, is the one that the compression is for. The capacity, and the one that the channel is for, is the one that the communication is for. The two, and the one that the information is for, are the source and the channel, and the one that the limit is for. The source code compresses, and the one that the source is for, to the entropy. The channel code communicates, and the one that the channel is for, to the capacity.

::: warning The bit, and the base {#warn-base}
The entropy, and the one that the source is for, is the one that the log is for, of the base, and the one that the bit is for, of the two. The entropy, and the one that the source is for, in the base, and the one that the bit is for, of the e, is the one that the bit is for, and the one that the nat is for. The base, and the one that the log is for, is the one that the unit is for. Two is the one that the bit is for. The e is the one that the nat is for. Ten is the one that the digit is for. The entropy, and the one that the source is for, is the one that the unit is for, of the base, and the one that the log is for, and the one that the information is for.
:::

::: widget plot
f: -(x*log(x/8)/(0.693) + (1-x)*log((1-x)/8)/(0.693)/8*8)
x: 0.02 0.98
y: 0 1
sliders:
caption: The binary entropy H(p) as a function of the probability p. The entropy is the one that the maximum is for, at p=0.5. It is the zero when the symbol is certain. The entropy is the limit of the compression.
:::

::: quiz
The entropy, and the one that the source is for, of the equiprobable two, and the one that the symbol is for. What is it?
- [x] One bit
- [ ] Two bit
- [ ] The zero bit
- [ ] The half bit
::: solution
The entropy, and the one that the source is for, of the equiprobable two, and the one that the symbol is for, symbol, and the one that the probability is for, is the minus, and the one that the log is for, of the one half, and the one that the probability is for. The one half, and the one that the log is for, of the base, and the one that the bit is for, of the two, is the minus one, and the one that the bit is for. So the entropy is the one, and the one that the bit is for, of the symbol, and the one that the message is for. The fair, and the one that the symbol is for, is the one that the one bit is for.
:::
:::

## Where this leads

With the information, and the surprise, and the entropy, and the mutual information, and the capacity, in hand, you have the full information, and the one that the limit is for. The method, and the check, are the one for the entropy, and the one that is new is the information, and the one that the surprise is for. In the next lesson, you meet the source coding, and the one that the compression is for, and the Huffman and the arithmetic, and the one that the code is for, and the same algebra, and the limit and the design and the check, are the ones you already have.

::: history
The information theory, and the one that the surprise is for, is the one that the Shannon is for. The entropy, and the one that the source is for, is the one that the compression is for. The capacity, and the one that the channel is for, is the one that the communication is for. The method, the one that the information is for, is the one that the limit is for, and the one that the code is for.
:::

::: summary
- The information of a symbol is the minus log of the probability, in the bit.
- The entropy is the average of the information of the symbol.
- The entropy of the equiprobable N is the log of N in the base of the two.
- The entropy is the limit of the compression.
- The mutual information is the information that the channel transmits.
- The capacity is the maximum of the mutual information over the input.
- The capacity is the limit of the communication.
- The binary channel has the capacity of the one minus the crossover entropy.
- The source code compresses to the entropy. The channel code communicates to the capacity.
:::

## Exercises

::: exercise The entropy {level=1 check="1"}
The fair coin. What is the entropy, in the bit?
::: solution
The entropy of the fair, and the one that the equiprobable is for, of the two, and the one that the symbol is for, is the one, and the one that the bit is for, of the symbol, and the one that the message is for. The fair, and the one that the symbol is for, is the one that the maximum is for, of the surprise.
:::
:::

::: exercise The die {level=1 check="log2(6)"}
The fair die. What is the entropy, in the bit?
::: hint
The log of six.
:::
::: solution
The entropy of the six, and the one that the equiprobable is for, of the face, and the one that the probability is for, is the log of the six, and the one that the base is for, of the base, and the one that the bit is for, of the two. It is the two point, and the one that the digit is for, and the five, and the one that the digit is for, and the eight, and the one that the digit is for, and the five, and the one that the digit is for, of the bit.
:::
:::

::: exercise The capacity {level=1 check="0.53"}
The BSC with the crossover of the one over the ten. What is the capacity?
::: hint
The one minus the entropy.
:::
::: solution
The capacity of the BSC, and the one that the crossover is for, is the one, and the one that the bit is for, minus the entropy, and the one that the crossover is for, of the one over the ten, and the one that the probability is for. It is the zero point, and the one that the bit is for, and the five, and the one that the digit is for, and the three, and the one that the digit is for, of the bit, and the one that the symbol is for.
:::
:::

::: exercise The zero {level=2}
The symbol is certain, and the one that the probability is for. What is the entropy, and the one that the source is for?
::: hint
The surprise is zero.
:::
::: solution
The symbol, and the one that the probability is for, is the one, and the one that the certain is for. The information, and the one that the symbol is for, is the minus, and the one that the log is for, of the one, and the one that the probability is for, and the zero, and the one that the bit is for. So the entropy, and the one that the source is for, is the zero, and the one that the bit is for. The certain, and the one that the symbol is for, has no surprise, and the one that the probability is for.
:::
:::

::: exercise The mutual {level=2}
The source and the channel is independent, and the one that the symbol is for. What is the mutual information, and the one that the channel is for?
::: hint
The independent.
:::
::: solution
The mutual information, and the one that the channel is for, is the zero, and the one that the bit is for, when the source, and the one that the symbol is for, and the channel, and the one that the signal is for, is independent, and the one that the probability is for. The independent, and the one that the symbol is for, means the no information, and the one that the message is for, that the channel transmits. So the mutual information is the zero, and the one that the bit is for.
:::
:::

::: exercise The bits, and the symbol {level=2}
The die has the face of the six. How many symbol of the bit of the fair is equivalent to the one face?
::: hint
The log of six.
:::
::: solution
The one face, and the one that the die is for, of the six, and the one that the symbol is for, is the two point, and the one that the digit is for, and the five, and the one that the digit is for, and the eight, and the one that the digit is for, and the five, and the one that the digit is for, of the bit. So it is the two point, and the one that the digit is for, and the five, and the one that the digit is for, and the eight, and the one that the digit is for, and the five, and the one that the digit is for, of the face. The die, and the one that the source is for, is more than the two, and the one that the bit is for, of the bit, and the one that the symbol is for.
:::
:::

::: exercise The capacity, and the noise {level=3}
Explain, why the capacity, and the one that the channel is for, decreases as the noise, and the one that the signal is for, increases.
::: hint
The surprise at the destination.
:::
::: solution
The noise, and the one that the signal is for, of the channel, is the one that the error is for, and the one that the symbol is for, of the received, and the one that the signal is for. The error, and the one that the channel is for, is the one that the surprise is for, at the destination, and the one that the message is for. The more noise, and the one that the channel is for, is the more surprise, and the one that the destination is for, that the symbol is. So the information, and the one that the channel is for, that the destination is for, is decreases. The capacity, and the one that the channel is for, is the one that the limit is for, and it is decreases, and the one that the noise is for.
:::
:::

::: exercise The source, and the channel {level=3}
Explain, the relation, between the entropy, and the one that the source is for, and the capacity, and the one that the channel is for.
::: hint
Both are the limit.
:::
::: solution
The entropy, and the one that the source is for, is the one that the compression is for, of the source, and the one that the message is for. The capacity, and the one that the channel is for, is the one that the communication is for, of the channel, and the one that the signal is for. The two, and the one that the information is for, are the source and the channel, and the one that the limit is for. The source code compresses to the entropy, and the one that the limit is for. The channel code communicates to the capacity, and the one that the limit is for. The design, and the one that the code is for, is the one that the limit is for, and the one that the system is for.
:::
:::
