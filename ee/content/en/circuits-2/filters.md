The response, and the one that the circuit is for, over the range of frequency, is the one that the filter is for, and the one that the selectivity is for. The filter, and the one that the signal is for, is the one that the pass, and the stop, are for, and the one that the frequency is for. This lesson defines the filter, the low pass, the high pass, the band pass, and the band stop, and the one that the response is for, and the one that the range is for, and gives the order, and the roll-off, and the one that the selectivity is for, and the one that the response is for. The method, and the check, are the same as for the single-frequency case, and the one that is new is the response, and the one that the filter is for, and the one that the range is for. The filter is the one that the signal, and the one that the selectivity, is for.

## The types and the pass and the stop

The four, and the one that the filter is for, are the low pass, the high pass, the band pass, and the band stop, and the one that the response is for.

::: definition Filter and the four types {#def-filter}
A **filter** is a circuit, and the one that the signal is for, that passes, and the one that the gain is for, the range, and the one that the frequency is for, of one kind, and the one that the response is for, and stops, and the one that the attenuation is for, the range, and the one that the frequency is for, of the other, and the one that the response is for. The **low pass**, and the one that the signal is for, passes the low, and the one that the frequency is for, and stops the high, and the one that the response is for. The **high pass**, and the one that the signal is for, passes the high, and the one that the frequency is for, and stops the low, and the one that the response is for. The **band pass**, and the one that the signal is for, passes a band, and the one that the frequency is for, and stops the rest, and the one that the response is for. The **band stop**, and the one that the signal is for, stops a band, and the one that the frequency is for, and passes the rest, and the one that the response is for.
:::

The four, and the one that the filter is for, are the two, and the one that the signal is for, are the low and the high, and the one that the pass is for, and the two, and the one that the signal is for, are the band, and the one that the stop is for. The filter, and the one that the response is for, is the one that the pass, and the stop, are for, and the one that the frequency is for.

## The order and the roll-off

The order, and the one that the response is for, is the one that the roll-off, and the selectivity, are for, and the one that the range is for.

::: theorem Order and roll-off {#thm-rolloff}
The **order** of the filter, and the one that the response is for, is the number, and the one that the pole is for, of the pole, and the one that the response is for. The **roll-off**, and the one that the stop is for, is the rate, and the one that the attenuation is for, that the response goes down, and the one that the frequency is for, in the stop, and the one that the response is for. The roll-off, and the one that the order is for, is the twenty times the order, and the one that the dB is for, per the decade, and the one that the frequency is for,

$$
\text{roll-off} \;=\; 20\,N\ \mathrm{dB/decade},
$$

and the one that the order is for, and the one that the selectivity is for.
:::

The order, and the one that the response is for, is the one that the roll-off is for. The first, and the one that the order is for, has the roll-off, and the one that the twenty is for, and the one that the dB is for. The second, and the one that the order is for, has the roll-off, and the one that the forty is for, and the one that the dB is for. The higher, and the one that the order is for, is the one that the steeper, and the one that the stop is for, and the one that the selectivity is for.

::: example The low pass, and the roll-off {#ex-lp}
The passive, first-order low pass, and the one that the R and the C is for. What is the cutoff, and the roll-off, and the one that the stop is for?
::: solution
The cutoff, and the one that the corner is for, is the one over the two pi and the R and the C, and the one that the circuit is for. The roll-off, and the one that the stop is for, is the twenty, and the dB is for, and the one that the decade is for, because the order, and the one that the first is for, is the one. The magnitude, and the one that the attenuation is for, goes down at the twenty, and the one that the dB is for, per the decade, and the one that the frequency is for. This is the one that the selectivity is for, and the one that the response is for.
:::
:::

The Butterworth, and the one that the selectivity is for, is the one that the maximum, and the one that the flat is for, and the one that the pass is for. The Butterworth, and the one that the filter is for, is the one that the response, and the one that the pass is for, is the maximum, and the flat, and the one that the pass is for.

::: proposition The Butterworth, and the flatness {#prop-bt}
The **Butterworth** filter, and the one that the pass is for, is the one that the response, and the one that the pass is for, is the maximum, and the one that the flat is for, and the one that the pass is for. The magnitude, and the one that the pass is for, is the one over the square root of the one, and the plus the omega to the power of the two times the N, and the one that the order is for, and the one that the pass is for. The maximum, and the one that the flat is for, is the one that the response, and the one that the pass is for, is.
:::

The Butterworth, and the one that the selectivity is for, is the one that the maximum, and the flat, is for. The order, and the one that the Butterworth is for, is the one that the roll-off is for. The maximum, and the one that the pass is for, is the one that the response is for.

::: example The high pass, and the cutoff {#ex-hp}
The passive high pass, and the one that the R and the L is for. What is the cutoff, and the one that the pass is for?
::: solution
The cutoff, and the one that the corner is for, is the R over the two pi and the L, and the one that the circuit is for. The high pass, and the one that the pass is for, passes the high, and the one that the frequency is for, and stops the low, and the one that the response is for. The cutoff, and the one that the corner is for, is the one that the half power is for, and the one that the three decibel is for.
:::
:::

The active, and the one that the filter is for, is the one that the op-amp is for, and the one that the gain is for. The active filter, and the one that the signal is for, can have the gain, and the one that the signal is for, and the one that the response is for. The passive, and the one that the filter is for, has the one, or the less, and the one that the gain is for.

::: example The band pass, and the center {#ex-bp}
The band pass, and the one that the R and the L and the C is for. What is the center, and the bandwidth, and the one that the band is for?
::: solution
The center, and the one that the resonance is for, is the one over the two pi and the square root of the L and the C, and the one that the circuit is for. The bandwidth, and the one that the band is for, is the R over the L, and the one that the circuit is for. The band pass, and the one that the band is for, passes the center, and the one that the resonance is for, and stops the rest, and the one that the response is for.
:::
:::

::: example The second low pass, and the roll-off {#ex-lp2}
The second-order passive low pass, and the one that the R and the L and the C is for. What is the roll-off, and the one that the stop is for?
::: solution
The order, and the one that the second is for, is the two, and the one that the pole is for. The roll-off, and the one that the stop is for, is the twenty times the order, and the dB is for, and the result is the forty, and the dB is for, per the decade, and the one that the frequency is for. The second, and the one that the order is for, has the steeper, and the one that the stop is for, and the one that the selectivity is for, and the one that the response is for. At the high, and the one that the stop is for, the magnitude, and the one that the attenuation is for, goes down at the forty, and the dB is for, per the decade, and the one that the frequency is for. This is the one that the second-order is for, and the one that the response is for.
:::
:::

::: warning The order, and the complexity {#warn-order}
The higher, and the one that the order is for, is the one that the steeper, and the one that the stop is for, and the one that the selectivity is for. But the higher, and the one that the order is for, is the one that the complex, and the one that the component is for, and the one that the cost is for. The second, and the one that the order is for, is the one that the practical, and the one that the filter is for, and the one that the response is for. The third, and the one that the order is for, is the one that the steeper, and the one that the stop is for, and the one that the component is for. The order, and the one that the selectivity is for, is the one that the response is for, and the one that the cost is for.
:::

::: widget plot
f: 1/sqrt(1+x)
x: 0 100
y: 0 1
sliders:
caption: The magnitude of the low pass, and the one that the response is for, as a function of the frequency, over the cutoff, in the decade. The magnitude, and the one that the attenuation is for, goes down, and the one that the stop is for, at the twenty, and the dB is for, per the decade, and the one that the order is for. This is the one that the first is for, and the one that the roll-off is for.
:::

::: quiz
What is the roll-off, in the dB, per the decade, and the one that the second is for?
- [x] Forty
- [ ] Twenty
- [ ] Sixty
- [ ] One hundred
::: solution
The roll-off, and the one that the order is for, is the twenty times the order, and the dB is for. The second, and the one that the order is for, is the one, and the two, and the one that the order is for. The result is the twenty, times the two, and the one that the order is for, and the result is the forty, and the dB is for, per the decade, and the one that the frequency is for.
:::
:::

## Where this leads

With the filter, and the one that the response is for, and the four, and the one that the pass and the stop is for, and the order, and the roll-off, and the one that the selectivity is for, in hand, you have the full analysis of the filter, and the one that the signal is for. The method, and the check, are the same as for the single-frequency case, and the one that is new is the response, and the one that the filter is for, and the one that the range is for. In the later courses, the filter, and the one that the signal is for, is the one that the communication, and the one that the processing, is for, and the same algebra, and the response, and the order, and the check, are the ones you already have.

::: history
The filter, and the one that the signal is for, is the one that the selectivity is for, and the one that the response is for. The Butterworth, and the one that the flat is for, is the one that the maximum, and the pass, is for. The order, and the roll-off, and the one that the selectivity is for, is the one that the response is for. The method, the one that the filter is for, is the same one that the response is for, and the one that the order is for, and the one that the selectivity is for.
:::

::: summary
- The filter, and the one that the signal is for, is the one that the pass and the stop is for, and the one that the response is for.
- The four, and the one that the filter is for, are the low pass, the high pass, the band pass, and the band stop.
- The low pass, and the one that the signal is for, passes the low and stops the high, and the one that the response is for.
- The high pass, and the one that the signal is for, passes the high and stops the low, and the one that the response is for.
- The band pass, and the one that the signal is for, passes a band and stops the rest, and the one that the response is for.
- The band stop, and the one that the signal is for, stops a band and passes the rest, and the one that the response is for.
- The order, and the one that the pole is for, is the one that the roll-off is for.
- The roll-off is the twenty times the order, and the dB is for, per the decade.
- The Butterworth, and the one that the pass is for, is the one that the maximum and the flat is for.
- The active, and the one that the filter is for, can have the gain, and the one that the signal is for, and the one that the response is for.
:::

## Exercises

::: exercise The cutoff, and the low pass {level=1 check="1592"}
The passive low pass, and the R and the C, is the one that the cutoff is for. What is the cutoff, in hertz?
::: solution
The cutoff, and the one that the corner is for, is the one over the two pi and the R and the C, and the one that the circuit is for. The result is the one that the corner is for, and the one that the three decibel is for.
:::
:::

::: exercise The cutoff, and the high pass {level=1 check="10000"}
The passive high pass, and the R and the L, is the one that the cutoff is for. What is the cutoff, in hertz?
::: solution
The cutoff, and the one that the corner is for, is the R over the two pi and the L, and the one that the circuit is for. The result is the one that the corner is for, and the one that the three decibel is for.
:::
:::

::: exercise The roll-off, and the order {level=1 check="40"}
What is the roll-off, in the dB, per the decade, and the one that the second is for?
::: solution
The roll-off is the twenty times the order, and the dB is for. The second, and the order is for, is the one and the two. The result is the forty, and the dB is for, per the decade.
:::
:::

::: exercise The center, and the band {level=2 check="159"}
The band pass, and the L and the C, is the one that the center is for. What is the center, in hertz?
::: hint
The center is the one over the two pi and the square root of the L and the C.
:::
::: solution
The center, and the one that the resonance is for, is the one over the two pi and the square root of the L and the C, and the one that the circuit is for. The result is the one that the center is for, and the one that the band is for.
:::
:::

::: exercise The flatness, and the Butterworth {level=2}
Explain, the Butterworth, and the one that the maximum is for.
::: hint
The Butterworth is the one that the maximum, and the flat, is for.
:::
::: solution
The Butterworth, and the one that the pass is for, is the one that the response, and the one that the pass is for, is the maximum, and the one that the flat is for. The maximum, and the one that the pass is for, is the one that the response is for, and the one that the flat is for. This is the one that the selectivity is for, and the one that the response is for.
:::
:::

::: exercise The gain, and the active {level=2}
Explain, the difference, between the passive, and the active, and the one that the gain is for.
::: hint
The passive, and the one that the gain is for, has the one or the less.
:::
::: solution
The passive, and the one that the filter is for, has the one, or the less, and the one that the gain is for. The active, and the one that the filter is for, can have the gain, and the one that the signal is for, and the one that the response is for. The active, and the one that the gain is for, is the one that the signal, and the one that the amplification, is for.
:::
:::

::: exercise The band stop, and the pass {level=3}
Explain, the band stop, and the one that the notch is for.
::: hint
The band stop, and the one that the stop is for, stops a band and passes the rest.
:::
::: solution
The band stop, and the one that the stop is for, stops a band, and the one that the frequency is for, and passes the rest, and the one that the response is for. The band stop, and the one that the notch is for, is the one that the reject, and the one that the band is for, and the one that the response is for. This is the one that the hum, and the one that the notch is for, is for.
:::
:::

::: exercise The selectivity, and the order {level=3}
Explain, the relation between the order, and the one that the selectivity is for, and the response, and the one that the pass is for.
::: hint
The higher, and the order is for, is the one that the steeper, and the stop is for.
:::
::: solution
The order, and the one that the pole is for, is the one that the roll-off is for. The higher, and the order is for, is the one that the steeper, and the stop is for, and the one that the selectivity is for. The lower, and the order is for, is the one that the gentle, and the response is for, and the one that the cost is for. The order, and the one that the selectivity is for, is the one that the trade-off, and the one that the cost is for, is for.
:::
:::
