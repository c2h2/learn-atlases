The transformer, the device that changes the voltage and the current of one circuit to the voltage and the current of another, is the one that the power system is for, and the one that the interface is for. The mathematics of the transformer does not add new physics, it applies the inductor and the mutual inductance, the two elements that the magnetic coupling is for, and the one that the ideal transformer is for, to the single-phase and the three-phase analysis of the earlier lessons. The new thing, and the one that the coupling is for, is the mutual inductance, the inductance that one coil, in the field, induces in the other, and the one that the transformer is for, and the one that the dot, and the offset, are for. This lesson defines the mutual inductance, the coupling, the dot, and the ideal transformer, gives the impedance transformation, the one that the matching is for, and the non-ideal, the leakage, and the magnetizing, and the one that the loss is for. The method, and the check, are the same as for the single-phase case, and the one that is new is the coupling, and the one that the transformer is for.

## Mutual inductance and the dot

The two coils, and the one that the field links, are the two that the coupling is for, and the mutual inductance, and the one that the dot is for, is the one that the induced is for.

::: definition Mutual inductance and the dot {#def-mut}
The **mutual inductance** $M$ is the inductance that the current, in one coil, induces, in the other, and it is measured, and the one that the field is for, is the flux, and the one that the coupling is for. The **dot convention** is the one that the polarity is for, and the one that the induced, and the offset, are for. A current, entering the dot of one coil, induces a voltage, in the other, that is positive, at the dot of the other, and the one that the offset is for, and the one that the coupling is for. The **coupling coefficient** $k$ is the fraction of the flux, that links the two, and the one that the ideal, and the one that the non-ideal, are for.
:::

::: theorem The coupled inductor, and the voltage {#thm-coupled}
The voltage, in the coil one, is the self, and the mutual, and the one that the dot is for,

$$
v_1 \;=\; L_1 \frac{\mathrm di_1}{\mathrm dt} + M\frac{\mathrm di_2}{\mathrm dt},
$$

and the coil two, and the one that the offset is for, is the same, and the one that the dot is for. The sign, and the one that the mutual is for, is the one that the dot is for, and the one that the offset is for. This is the one that the coupling is for, and the one that the transformer is for.
:::

The mutual inductance, and the one that the coupling is for, is bounded, by the coupling coefficient, and the one that the ideal, and the non-ideal, are for. The coupling coefficient, and the one that the ideal is for, is the one, and the one that the non-ideal, and the leakage, are for, is less than the one, and the one that the loss is for. The mutual inductance, and the one that the field is for, is the geometric mean of the two self, and the one that the coupling, and the fraction, are for.

::: example The mutual, and the induced voltage {#ex-mut}
Two coils, with the self, and the coupling, and the one that the field is for. If the current, in the one, changes at ten ampere, per second, and the mutual, and the one that the field is for, and the coupling, and the one that the offset is for. What is the voltage, in the other?
::: solution
The induced voltage, in the other, is the mutual, and the one that the field is for, times the rate of change of the current, in the one, and the one that the dot is for. The result is the mutual, and the one that the coupling is for, times ten, and the one that the offset is for, and the one that the dot is for. The sign, and the one that the dot is for, is the one that the current, and the offset, are for, and the one that the coupling is for.
:::
:::

## The ideal transformer

The ideal transformer, the one that the power is for, is the one that the loss is for, and the one that the turn, and the ratio, are for.

::: theorem Ideal transformer, and the turn ratio {#thm-xfmr}
The ideal transformer, in the turn, and the ratio, and the one that the power is for, has no loss, and no leakage, and no magnetizing, and the one that the turn is for. The voltage, and the current, and the one that the ratio is for, are the two,

$$
\frac{V_1}{V_2} \;=\; \frac{N_1}{N_2} \;=\; n, \qquad \frac{I_1}{I_2} \;=\; \frac{N_2}{N_1} \;=\; \frac{1}{n},
$$

and the power, and the one that the conservation is for, is the same, and the one that the ideal is for, in the one, and the two. The **turns ratio** $n$ is the one that the step up, and the step down, are for, and the one that the power, and the loss, are for.
:::

::: proposition Impedance transformation {#prop-zt}
The ideal transformer transforms the impedance, and the one that the load is for, by the square of the turn, and the one that the matching is for. The impedance, and the one that the one is for, that the source sees, is the square of the turn, times the impedance, and the one that the load is for,

$$
Z_1 \;=\; n^2\,Z_2.
$$

The transformation, and the one that the matching is for, is the one that the power, and the loss, are for, and the one that the interface is for.
:::

The impedance transformation, and the one that the matching is for, is the one that the maximum power, and the interface, are for. The square of the turn, and the one that the ratio is for, is the one that the matching is for, and the one that the power, and the loss, are for. This is the one that the audio is for, and the one that the radio is for, and the one that the interface, and the matching, are for.

::: example The ideal, and the transform {#ex-xfmr}
The ideal, twenty hundred, to the ten hundred, and the one that the ratio is for, steps down, the voltage, and the one that the power is for. If the primary, and the one that the load is for, is two hundred and forty, and the current, and the one that the power is for, is the two and the one. What is the voltage, and the current, in the secondary, and the one that the load is for?
::: solution
The turn, and the ratio, and the one that the step down is for, is the two to the one, and the one that the voltage is for. The voltage, in the secondary, and the one that the load is for, is the voltage, and the turn, and the one that the ratio is for, and the result is the two hundred and forty, divided by the two, and the one that the power is for, and the result is one hundred and twenty, and the one that the load is for. The current, in the primary, and the one that the conservation is for, is the current, in the secondary, and the one that the turn is for, and the result is the five, times the one, and the two, and the one that the ratio is for, and the result is the two and the five, and the one that the load is for. The power, and the one that the conservation is for, is the same, and the one that the ideal is for, and the one that the two hundred forty, and the two and the five, and the one that the load is for, is the same as the one hundred and twenty, and the five, and the one that the power is for.
:::
:::

## The non-ideal, and the reflected

The non-ideal, and the one that the loss is for, is the one that the leakage, and the magnetizing, are for, and the one that the matching, and the loss, are for.

::: warning The non-ideal, and the loss {#warn-nonideal}
The ideal, and the one that the turn is for, is the one that the loss is for, and the one that the magnetizing is for. The non-ideal, and the one that the real is for, is the one that the leakage, and the resistance, and the magnetizing, and the core loss, are for. The leakage, and the one that the frequency is for, is the one that the loss is for, and the magnetizing, and the one that the field is for, is the one that the current is for. The non-ideal, and the one that the model is for, is the one that the loss, and the heating, are for, and the one that the design is for.
:::

::: example The reflected, and the matching {#ex-reflect}
The source, and the one that the matching is for, has the impedance, and the one that the maximum power is for. The transformer, and the one that the ratio is for, steps the impedance, and the one that the matching is for. What is the impedance, and the one that the source is for, that the one sees?
::: solution
The reflected, and the one that the matching is for, is the square of the turn, and the impedance, in the one, and the load is for. The result is the square of the turn, and the one that the ratio is for, times the impedance, and the one that the load is for. This is the one that the matching is for, and the one that the maximum power is for, and the one that the interface is for, and the one that the audio and the radio is for.
:::
:::

::: widget plot
f: n*x
x: 0 4
y: 0 16
sliders: n
caption: The impedance transformation, and the one that the matching is for, plotted against the impedance, in the secondary. The line, and the one that the matching is for, is the square of the turn, and the load is for, and the one that the interface is for. The one that the matching is for is the one that the maximum power is for, and the one that the power and the loss are for.
:::

::: quiz
The turn ratio of the ideal is two, one, and the voltage in the primary is one hundred and twenty. What is the voltage in the secondary?
- [x] Sixty
- [ ] One hundred and twenty
- [ ] Two hundred and forty
- [ ] Thirty
::: solution
The turn ratio is two to one, and the step down is the one that the turn is for. The voltage, in the secondary, is the voltage, in the primary, divided by the turn, and the one that the ratio is for. The result is the one hundred and twenty, divided by the two, and the one that the power is for, and the result is sixty, and the one that the load is for.
:::
:::

::: example The coupling coefficient {#ex-k}
Two inductors, with the self, and the one that the field is for, and the mutual. What is the coupling coefficient, and the one that the ideal is for?
::: solution
The coupling coefficient, and the one that the coupling is for, is the mutual, and the one that the field is for, divided by the geometric mean of the two self, and the one that the ideal is for. The result is the mutual, divided by the square root of the product of the two self, and the one that the coupling is for. In the ideal, the one that the loss is for, the coupling is the one, and the one that the mutual is for. In the non-ideal, the one that the leakage is for, the coupling is less than the one, and the one that the loss is for, and the one that the model is for.
:::
:::

## Where this leads

With the mutual, and the coupling, and the dot, and the ideal, and the non-ideal, and the reflected, in hand, you have the full analysis of the transformer, and the one that the power is for, and the one that the interface is for. The method, and the check, are the same as for the single-phase case, and the one that is new is the coupling, and the one that the transformer is for. In the later courses, the transformer, and the one that the power is for, is the one that the distribution, and the interface, and the matching, are for, and the same algebra, and the coupling, and the check, are the ones you already have.

::: history
The transformer, and the one that the coupling is for, is the one that the power is for, and the one that the interface is for. The ideal, and the non-ideal, and the reflected, and the matching, are the ones that the power system is for, and the one that the interface is for. The dot, and the offset, and the one that the coupling is for, is the one that the design is for. The method, the one that the transformer is for, is the same one that the single-phase is for, and the one that the coupling is for, and the one that the matching is for.
:::

::: summary
- The mutual inductance, and the coupling, and the field, are the ones that the transformer is for, and the one that the offset is for.
- The dot, and the one that the polarity is for, is the one that the induced, and the offset, are for.
- The ideal transformer, and the one that the turn is for, has no loss, and no leakage, and no magnetizing, and the one that the power is for.
- The turn ratio, the one that the step is for, is the one that the voltage and the current is for, and the one that the power is for.
- The impedance transformation, the square of the turn, is the one that the matching is for, and the one that the maximum power is for.
- The non-ideal, the leakage, the magnetizing, and the core loss, are the ones that the loss is for, and the one that the design is for.
- The method, and the check, are the same as for the single-phase case, and the one that is new is the coupling, and the one that the transformer is for.
:::

## Exercises

::: exercise The step down {level=1 check="60"}
The turn ratio is two, one, and the voltage in the primary is one hundred and twenty. What is the voltage in the secondary?
::: solution
The voltage in the secondary is the voltage, in the primary, divided by the turn ratio, and the one that the ratio is for. The result is the one hundred and twenty, divided by the two, and the one that the power is for, and the result is sixty, and the one that the load is for.
:::
:::

::: exercise The current transform {level=1 check="2.5"}
The turn ratio is two, one, and the current in the secondary is five. What is the current in the primary?
::: solution
The current in the primary is the current, in the secondary, divided by the turn ratio, and the one that the conservation is for. The result is the five, divided by the two, and the one that the power is for, and the result is the two and the five, and the one that the load is for.
:::
:::

::: exercise The power {level=1 check="600"}
The primary is one hundred and twenty, and the current is the five. What is the power?
::: solution
The power is the voltage, and the current, and the one that the conservation is for. The result is the one hundred and twenty, and the five, and the one that the power is for, and the result is six hundred, and the one that the load is for, and the one that the ideal is for.
:::
:::

::: exercise The impedance transform {level=2 check="40"}
The turn ratio is two, and the impedance, in the secondary, is ten. What is the impedance, and the one that the source is for?
::: hint
The square of the turn, times the impedance.
:::
::: solution
The impedance, and the one that the matching is for, is the square of the turn, and the impedance, in the secondary. The result is the square of the two, and the ten, and the one that the matching is for, and the result is forty, and the one that the source is for.
:::
:::

::: exercise The matching {level=2}
The source, and the one that the matching is for, is the impedance, and the load, and the one that the maximum power is for. What is the turn ratio, that the one sees the other?
::: hint
The square of the turn, is the ratio of the impedance.
:::
::: solution
The square of the turn ratio is the ratio of the impedance, and the one that the matching is for. The turn ratio is the square root of the ratio, and the one that the matching is for. This is the one that the maximum power is for, and the one that the interface is for, and the one that the power and the loss are for.
:::
:::

::: exercise The mutual, and the bound {level=3}
The two self, and the coupling, and the one that the ideal is for. What is the bound, on the mutual?
::: hint
The coupling, and the fraction, is less than the one, and the one that the non-ideal is for.
:::
::: solution
The mutual is bounded by the geometric mean of the two self, and the one that the ideal is for, and the one that the coupling is for. The coupling coefficient is less than the one, and the one that the non-ideal is for, and the one that the leakage is for. The bound is the geometric mean, and the one that the ideal is for.
:::
:::

::: exercise The non-ideal, and the leakage {level=3}
Explain, the leakage, and the one that the loss is for, and the one that the frequency is for.
::: hint
The leakage, and the one that the field is for, is the one that does not link, and the one that the other is for.
:::
::: solution
The leakage is the flux, that does not link, the other coil, and the one that the field is for. It is the one that the frequency is for, and the one that the loss is for, and the one that the non-ideal is for. The ideal has no leakage, and the one that the loss is for. The non-ideal, the one that the model is for, has the leakage, and the magnetizing, and the core loss, and the one that the loss is for, and the one that the design is for.
:::
:::

::: exercise The reflected, and the maximum {level=3 check="5"}
The mutual, and the one that the field is for, is the one that the reflected is for. What is the one that the source sees?
::: hint
The square of the frequency, times the square of the mutual, divided by the impedance, in the secondary.
:::
::: solution
The reflected impedance, and the one that the matching is for, is the square of the frequency, times the square of the mutual, divided by the impedance, in the secondary. This is the one that the source is for, and the one that the loss is for, and the one that the interface is for.
:::
:::
