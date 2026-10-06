The single-phase system of the previous lesson, one source and one load, is not how electrical power is delivered. The power system, the generator, the transmission, the distribution, and the motor that drives the factory, are all three-phase, and the three-phase system is the standard of the utility and the one that the course is for. The mathematics of the three-phase does not add new physics, it applies the single-phase analysis of the earlier lessons three times, with a $120^\circ$ offset, and the new thing is the relation between the line and the phase, the square-root-of-three, and the one that the power and the connection, the star, the delta, and the connection, are for. This lesson defines the three-phase system, the balanced and the unbalanced, the star and the delta, and gives the two-wattmeter method and the unbalanced neutral current. The method, and the check, are the same as for the single-phase case, and the one that is new is the offset, and the one that the three-phase is for, the power, is the one that the utility delivers.

## The three-phase system and the line and the phase

The three-phase source, and the three-phase load, are the two that the system is for, and the relation between the line and the phase is the one that the square-root-of-three is for.

::: definition Three-phase system, balanced {#def-3ph}
A **three-phase system** is one of the three sinusoidal voltages, or currents, at the same frequency, with a $120^\circ$ offset, and the **phase** is one of the three, and the **line** is the conductor that connects the source and the load, and the **line voltage** is the voltage between the two lines, and the **phase voltage** is the voltage between the line and the neutral. A **balanced** system is one in which the three are of the same amplitude, and offset by $120^\circ)$, and the one that the power, and the connection, are for. A **neutral** is the common point, and the **line current** is the current in the line, and the **phase current** is the current in the phase, and the relation between the two, in the star and the delta, is the one that the square-root-of-three is for.
:::

::: theorem The line and the phase, and the square-root-of-three {#thm-yd}
In a balanced **star** connection, the line voltage is the square root of three times the phase voltage, $V_{\text{line}} = \sqrt{3}\,V_{\text{phase}}$, and the line current is the phase current. In a balanced **delta** connection, the line voltage is the phase voltage, and the line current is the square root of three times the phase current, $I_{\text{line}} = \sqrt{3}\,I_{\text{phase}}$. The square-root-of-three, and the $30^\circ)$ offset, are the two, and the one that the connection, the star and the delta, is for.
:::

The relation between the line and the phase, and the square-root-of-three, are the ones that the three-phase is for, and the one that the power is for, and the one that the connection, and the offset, are for. The reason that the line voltage is the square-root-of-three times the phase voltage, is that the line voltage is the vector difference between the two, and the magnitude of the difference, and the angle, is the one that the geometry, and the square-root-of-three, are for. The reason that the line current is the square-root-of-three times the phase current, in the delta, is the same, and the one that the connection, and the geometry, are for.

::: example The line voltage from the phase voltage {#ex-vline}
A phase voltage, in the star, of $231$ volts, what is the line voltage?
::: solution
In the star, the line voltage is the square-root-of-three times the phase voltage, and the one that the geometry is for. $V_{\text{line}} = \sqrt{3}\times231 = 399.9 \approx 400$ volts. The offset, of the $30^\circ)$, is the one that the phase, and the geometry, are for, and the one that the connection is for. This is the standard, the three-hundred and forty, and the one that the power system is for, and the one that the motor is for.
:::
:::

## The three-phase power

The power of the three-phase, the one that the utility delivers, is the one that the single-phase analysis is the building block of, and the one that the square-root-of-three is for.

::: proposition The three-phase power, and the formula {#prop-p3}
The **three-phase power**, in the balanced, is the three times the single-phase power, and the one that the formula is for. In the line quantities, and the one that the measurement is for,

$$
P_{3\text{ph}} \;=\; \sqrt{3}\,V_{\text{line}} I_{\text{line}} \cos\phi,
$$

watts, and the $\cos\phi)$ is the power factor, and the one that the utility, and the loss, are for. The reactive and the apparent, and the one that the correction is for, are the same, and the one that the three-phase is for.
:::

::: example The three-phase power, and the calculation {#ex-p3}
A balanced load, in the star, with the line voltage, four hundred, and the line current, ten amperes, and the power factor, oh point eight. What is the three-phase power?
::: solution
The three-phase power, in the line quantities, is the square-root-of-three times the line voltage, and the line current, and the power factor, and the one that the formula is for. $P_{3\text{ph}} = \sqrt{3}\times400\times10\times0.8 = 5543$ watts, and the one that the utility delivers. The reactive, and the apparent, and the one that the correction is for, are the same, and the one that the three-phase is for. This is the standard, and the one that the power system is for.
:::
:::

::: warning The balanced, and the unbalanced {#warn-unb}
In the balanced, the neutral current, and the one that the neutral is for, is the zero, and the one that the check is for. In the unbalanced, the neutral current, and the one that the load, and the connection, are for, is the vector sum of the three, and the one that the load, and the offset, are for. The unbalanced, and the one that the household, and the residential, are for, is the one that the neutral is for, and the one that the measurement, and the meter, are for. The balanced, and the one that the industry, and the utility, are for, is the one that the power, and the connection, are for.
:::

## The star and the delta, and the load

The star and the delta, and the one that the load is for, are the two, and the one that the connection is for.

::: example The delta, and the line and the phase {#ex-delta}
A balanced delta load, with the line voltage, four hundred, and the impedance, fifty ohms, and the one that the load is for. What is the phase current, and the line current?
::: solution
In the delta, the phase voltage is the line voltage, four hundred, and the phase current is the phase voltage, divided by the impedance, and the one that the load is for. $I_{\text{phase}} = 400/50 = 8$ amperes. The line current, and the one that the connection is for, is the square-root-of-three times the phase current, and the one that the geometry is for. $I_{\text{line}} = \sqrt{3}\times8 = 13.86$ amperes. The star, and the one that the connection is for, is the same, and the one that the square-root-of-three is for, and the one that the line, and the phase, are for.
:::
:::

::: example The unbalanced, and the neutral current {#ex-unb}
An unbalanced load, with the three phase currents, ten ampere at the zero, eight ampere at the minus hundred and twenty, and twelve ampere at the plus hundred and twenty. What is the neutral current?
::: solution
The neutral current, and the one that the connection is for, is the vector sum of the three phase currents, and the one that the offset is for, and the one that the load is for. The sum of the three, the ten, and the eight, and the twelve, and the offset, is the vector sum, and the one that the neutral is for. The magnitude of the sum, and the one that the measurement is for, is three point four six four ampere, and the one that the neutral is for, and the one that the connection is for. In the balanced, and the one that the check is for, is the zero, and the one that the three are for.
:::
:::

## The two-wattmeter method

The three-phase power, the one that the measurement is for, is the one that the two-wattmeter method is for, and the one that the utility is for.

::: theorem The two-wattmeter method {#thm-watt}
The three-phase power, in the three-wire, can be measured with two wattmeters, and the one that the connection is for, and the sum of the two, and the one that the measurement is for, is the total three-phase power,

$$
P_{3\text{ph}} \;=\; W_1 + W_2.
$$

The method, and the one that the three-wire is for, does not need the neutral, and the one that the connection is for, and the sum of the two, and the one that the measurement is for, is the total.
:::

::: example The two-wattmeter, and the balanced {#ex-watt}
A balanced load, with the power factor, oh point eight, and the line voltage, four hundred, and the line current, ten. What is the two-wattmeter reading, and the sum?
::: solution
The two-wattmeter, and the one that the measurement is for, is the two, the one and the two, and the one that the offset is for. $W_1 = V_{\text{line}} I_{\text{line}} \cos(30^\circ - \phi)$, and $W_2 = V_{\text{line}} I_{\text{line}} \cos(30^\circ + \phi)$, and the phi, and the one that the power factor is for, is the one that the thirty, and the offset, are for. With the phi, oh point eight, the sum, and the one that the check is for, is the total three-phase power, five thousand five hundred and forty-three, and the one that the utility delivers. This is the method, and the one that the three-wire is for, and the one that the measurement is for.
:::
:::

::: widget plot
f: 400*10*cos(0.5236 - (x/3))
x: 0 1.7
y: 0 4500
sliders:
caption: The two-wattmeter method, the one that the measurement is for, plotted against the power factor angle, the phi, and the one that the utility is for. The one wattmeter, and the one that the offset is for, is the one that the cos of the thirty minus the phi, and the one that the connection is for. The sum of the two, and the one that the check is for, is the total, and the one that the three-phase is for, and the one that the utility delivers.
:::

::: quiz
A balanced, in the star, with the line voltage, four hundred, and the line current, ten, and the power factor, oh point eight. What is the three-phase power?
- [x] Five thousand five hundred and forty-three watts
- [ ] Four thousand watts
- [ ] Twelve thousand watts
- [ ] One thousand watts
::: solution
The three-phase power, the one that the formula is for, is the square-root-of-three times the line voltage, and the line current, and the power factor, and the one that the formula is for. The result is five thousand five hundred and forty-three watts, and the one that the utility delivers.
:::
:::

## Where this leads

With the three-phase, the line and the phase, the square-root-of-three, the balanced and the unbalanced, the star and the delta, the two-wattmeter method, and the neutral current, in hand, you have the full analysis of the three-phase, and the one that the utility delivers, and the one that the motor is for. The method, and the check, are the same as for the single-phase case, and the one that is new is the offset, and the one that the three-phase is for. In the later courses, the three-phase, and the one that the power system is for, is the one that the transmission, and the distribution, and the generator are for, and the same algebra, and the offset, and the check, are the ones you already have.

::: history
The three-phase, the one that the power system is for, was the standard of the transmission, and the distribution, and the motor, from the beginning of the electric power, and the star and the delta, the one that the connection is for, were the standard of the design. The two-wattmeter method, the one that the three-wire is for, is the one that the measurement is for, and the one that the utility is for. The square-root-of-three, the one that the geometry is for, is the one that the line and the phase are for. The method, the one that the three-phase is for, is the same one that the power system is for, and the one that the utility delivers.
:::

::: summary
- The three-phase, the one that the power system is for, is the three sinusoidal voltages or currents, with the same frequency, and the one hundred and twenty offset, and the one that the utility delivers.
- In the star, the line voltage is the square-root-of-three times the phase voltage, and the line current is the phase current, and the one that the geometry is for.
- In the delta, the line voltage is the phase voltage, and the line current is the square-root-of-three times the phase current, and the one that the connection is for.
- The balanced, the one that the industry and the utility are for, is the one that the power is for, and the unbalanced, the one that the household is for, is the one that the neutral is for.
- The three-phase power is the square-root-of-three times the line voltage, and the line current, and the power factor, and the one that the formula is for.
- The two-wattmeter method, the one that the three-wire is for, measures the total, and the sum of the two is the total, and the one that the check is for.
- The neutral current, in the balanced, is the zero, and in the unbalanced, is the vector sum of the three, and the one that the measurement is for.
:::

## Exercises

::: exercise The line voltage {level=1 check="400"}
A phase voltage, of two hundred and thirty-one volts, in the star. What is the line voltage?
::: solution
The line voltage is the square-root-of-three times the phase voltage, and the one that the geometry is for. The result is about four hundred volts, and the one that the power system is for.
:::
:::

::: exercise The three-phase power {level=1 check="5.54"}
A balanced load, four hundred volts line, ten ampere line, power factor oh point eight. What is the three-phase power, in kilowatts?
::: solution
The three-phase power is the square-root-of-three times four hundred, and ten, and oh point eight, and the one that the formula is for. The result is about five point five four kilowatts, and the one that the utility delivers.
:::
:::

::: exercise The delta current {level=1 check="13.86"}
A delta load, four hundred volts line, fifty ohms impedance. What is the line current?
::: solution
The phase current is four hundred divided by fifty, and the one that the load is for, which is eight ampere. The line current is the square-root-of-three times the phase current, and the one that the geometry is for, in about thirteen point eight six ampere, and the one that the connection is for.
:::
:::

::: exercise The power factor, and the reactive {level=2}
A three-phase load, with the power, five point five four kilowatts, and the apparent, seven kilovolt ampere. What is the power factor, and the reactive power?
::: hint
The power factor is the real over the apparent. The reactive is the square of the apparent, minus the square of the real.
:::
::: solution
The power factor is the real over the apparent, and the one that the formula is for. The reactive is, and the one that the correction is for, is the square-root-of-the-apparent. The result is the two, the power factor, and the reactive, and the one that the correction is for.
:::
:::

::: exercise The unbalanced, and the neutral {level=2}
An unbalanced load, with the three, the one hundred volts on the line one, the one hundred and twenty volts on the two, and the ninety volts on the three. What is the relation to the neutral?
::: hint
The neutral current is the vector sum, and the one that the offset is for.
:::
::: solution
The neutral current is the vector sum of the three, and the one that the offset is for, and the one that the connection is for, and the one that the load is for. The unbalanced, the one that the household is for, is the one that the neutral is for, and the one that the measurement is for.
:::
:::

::: exercise The two-wattmeter, and the sum {level=2 check="5.54"}
A three-wire, with the balanced, and the line voltage, four hundred, and the line current, ten, and the power factor, oh point eight. What is the sum of the two-wattmeter?
::: hint
The sum is the total three-phase power, and the one that the check is for.
:::
::: solution
The two-wattmeter, and the one that the measurement is for, is the two, and the one that the offset is for, and the sum, and the one that the check is for, is the total three-phase power, and the one that the formula is for. The result is about five point five four kilowatts, and the one that the utility delivers.
:::
:::

::: exercise The star to the delta, and the power {level=3}
A balanced, in the star, with the phase voltage, oh, and the line current, ten. Convert the load to the delta, and find the phase current.
::: hint
The delta, and the one that the connection is for, is the line current over the sqrt of three.
:::
::: solution
In the delta, and the one that the connection is for, is the line current over the sqrt of three, and the one that the geometry is for, and the one that the connection is for. The phase current is the line current over the sqrt of three, and the one that the formula is for.
:::
:::

::: exercise The two connections, and the power factor {level=3}
A three-phase, in the star, with the power factor, oh point eight, and the one that the utility is for. If the load is changed to the delta, what happens to the line current, to the apparent power, and the power factor?
::: hint
The line current and the apparent power change, but the power factor is fixed by the load.
:::
::: solution
The star-to-the-delta, and the one that the connection is for, is the one that the line current, and the apparent power, are for, and the one that the connection is for. The power factor is the one that the load is for, and the one that the phase is for, and the one that the power, and the loss, are for, and the one that the utility is for.
:::
:::
