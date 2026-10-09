The MOSFET is the one that the current is for, in the channel, of the current and the limit. The gate and the one that the voltage is for, controls the drain, and the one that the current is for, of the current. The bias and the one that the dc is for, sets the operating, and the one that the point is for, of the limit and the current. This lesson defines the MOSFET, and the one that the channel is for, and gives the saturation and the linear and the subthreshold, and the one that the region is for, of the operating, and the one that the limit is for, and one that the current is for, of the current and the voltage, and the bias and the small signal and the gain, and the one that the design is for, of the limit, and the one that the current is for, of the current and the voltage, and the property, and the one that the gate is for, of the limit, is for. The method and the check are the one for the bias and the gain and the signal, and the one that is new is the MOSFET and the one that the channel is for. The MOSFET and the one that the current is for is the one that the amplifier and the design and the limit, and the one that the system is for.

## The channel and the gate

The channel and the one that the region is for, is the one that the gate is for, of the control. The gate and the one that the voltage is for, controls the drain, and the one that the current is for, of the current.

::: definition MOSFET {#def-mos}
The **mosfet** is the one, and the one that the channel is for, of the channel, that is the one that the gate is for, of the control, and the one that the drain is for, of the current. When the gate and the body, and the one that the voltage is for, is positive, the channel, and the one that the region is for, is formed, and the drain, and the one that the current is for, is the one that flows, and the one that the limit is for. This is the nmos, and the one that the transistor is for, of the limit. The gate and the one that the charge is for, is the one that the control, and the one that the channel is for, of the channel, and the one that the current is for, of the current. The current is the one that the gate is for, and the one that the voltage is for, and the one that the limit is for.
:::

The saturation and the one that the region is for, is the one that the current is for, is the maximum. The linear and the one that the region is for, is the one that the current is for, is the minimum, and the one that the resistance is for. The subthreshold and the one that the region is for, is the one that the current is for, is the small, and the one that the exponential is for.

## The saturation and the law

The saturation voltage and the one that the drain is for, is the one that the current is for. The law and the one that the current is for, is the one that the quadratic, and the one that the transfer is for, of the limit and the current.

::: proposition Saturation law {#prop-sat}
In saturation and the one that the region is for, is
$$
I_D = \frac{1}{2}\,\mu C_{ox}\frac{W}{L}(V_{GS}-V_t)^2, \qquad V_{DS}\ge V_{GS}-V_t.
$$
and the one that the current is for. So the current is the one that the quadratic, and the one that the overdrive, and the one that the voltage is for, of the limit and the current. This is the one that the amplifier and the one that the small signal, is for, in the limit, and the one that the current is for.
:::

The overdrive voltage and the one that the gate is for, is the gate and the threshold, and the one that the voltage is for, of the limit and the voltage. The transconductance and the one that the current is for, is the slope, and the one that the current is for, and the one that the gate is for.

::: proposition Transconductance {#prop-gm}
The **transconductance** is
$$
g_m = \mu C_{ox}\frac{W}{L}(V_{GS}-V_t) = \frac{2I_D}{V_{GS}-V_t},
$$
and the one that the current is for. So the transconductance is the one that the current is for, is per the gate, and the one that the voltage is for. This is the one that the gain and the one that the amplifier, is for, in the limit, and the one that the current is for.
:::

The output resistance and the one that the drain is for, is the one that the current is for, is the slope, in output. The gain and the one that the drain is for, is the transconductance and the one that the current is for, times the resistance, and the one that the drain is for.

## The bias and the operating

The bias and the one that the dc is for, is the one that the operating and the one that the current is for, has. The operating and the one that the point is for, is the one that the dc, and the one that the current is for, of the limit.

::: definition Bias {#def-bias}
The **ias** is the one, and the one that the dc is for, of the dc, that is set, on the gate and the body, and the one that the voltage is for, of the operating, and the one that the current is for. The operating, and the one that the point is for, of the point, is the one that the dc, and the one that the current is for, and the one that the operating is for, is the one that the current is for, of the drain and the one that the current is for. This is the one that the amplifier, and the one that the gain, is for, in the limit, and the one that the current is for.
:::

The self and the one that the bias is for, is the one that the gate, and the one that the voltage is for, is for. The two and the one that the bias is for, are the fixed and the self, and the one that the reference is for.

## The operating and the gain

The operating, and the one that the point is for, is the one that the dc, and the one that the current is for, has. The gain and the one that the drain is for, is the transconductance and the one that the current is for, times the resistance, and the one that the drain is for.

::: proposition Common source gain {#prop-csgain}
The **common source** gain, with the drain, and the one that the resistance is for, of the resistance, $R$ is
$$
A_v = -g_m\left(r_o \parallel R\right),
$$
and the one that the gain is for. So the gain is the one that the magnitude, and the one that the current is for, of the limit is for, and the negative is the one that the phase and the one that the signal is for, is for. The design, and the one that the gain is for, is the one that the resistance, and the one that the current is for, is for.
:::

The emitter and the one that the follower is for, is the one that the voltage is for, is the unity. The source and the one that the follower is for, is the one that the current is for, of the one that the limit is for, and the one that the voltage is for.

::: proposition Common drain {#prop-cd}
The **common drain**, the one that the source, follower, and the one that the gain, is for, is the one that the voltage is for, close to the gate, and the one that the source, and the one that the voltage is for, of the limit, and one that the current is for:
$$
A_v = \frac{g_m R_s}{1+g_m R_s}\approx 1.
$$
and the one that the gain is for. So the common drain is the one that the gain, and the one that the current is for, is close to unity, and the one that the limit is for. This is the one that the buffer, and the one that the follower, is for, in the amplifier, and the one that the signal is for.
:::

The nmos and the one that the transistor is for, is the one that the current is for, in the channel, of the current. The bias and the one that the dc is for, is the one that the operating, and the one that the current is for, has. The gain and the one that the drain is for, is the transconductance and the one that the current is for, times the resistance, and the one that the drain is for. The design, and the one that the amplifier is for, is the one that the operating and the gain and the signal, and the one that the limit is for, is for.

::: example The operating, and the current {#ex-opsat}
A nmos and the one that the transistor is for, with $k=\mu C_{ox}W/L$ the two, and the one that the milli is for, per the volt, and squared, and the $V_t$ the zero point five, and the one that the volt is for, set, in the saturation, and the one that the region is for. What is the current, if the gate is the one point five, and the one that the volt is for?
::: solution
The saturation, and the one that the law is for, is
$$
I_D = \frac{1}{2}\,k\,(V_{GS}-V_t)^2.
$$
and the one that the current is for. In the $k$ is the two, and the one that the milli is for, per the volt, and squared, and the gate, and threshold, and the one that the overdrive, and the voltage is for, is the one point five, and the zero point five, and the one, and the one that the volt is for. So the current is the one half, and the two, and the one that the milli is for, times the one, and the one, and the one, and the one, which is the one, and the one that the milli is for, and the one that the current is for. This is the one, and the one that the operating, and the current is for.
:::
:::

::: example The gain, and the resistance {#ex-gainr}
The common, source, and the one that the amplifier is for, with $g_m$ the two, and the one that the milli is for, per the volt, and the $r_o$ the ten kilo, and the one that the ohm is for, and the $R$ the ten kilo, and the one that the ohm is for. What is the gain?
::: solution
The gain, and the one that the drain is for, is
$$
A_v = -g_m\left(r_o\parallel R\right).
$$
and the one that the gain is for. The resistance, and the one that the parallel is for, is the ten kilo, and one divided by the ten kilo, and the one that the ohm is for, is the five kilo, and the one that the ohm is for. So the gain is the two, and the one that the milli is for, per the volt, times the five kilo, and the one that the ohm is for, is the ten, and the one that the gain is for, and the negative, and the one that the phase is for. So the magnitude, of the gain, and the one that the current is for, is the ten, and the one that the voltage is for, is for.
:::
:::

::: example The bias, and the point {#ex-biaspt}
Explain, the self, and the one that the bias is for, of the bias, in the nmos, and the one that the transistor is for.
::: solution
The self, and the one that the bias is for, is the one, and the one that the gate, and the source, and the one that the voltage is for, is set, to the operating, and the one that the point is for, that is, and the one that the dc, and the current is for. This, and the one that the bias is for, is the one that the operating, and the current is for, has. The gate, and the one that the voltage is for, is the operating, and the gate, and the one that the current is for, has. The operating, and the one that the gain is for, is the one that the current is for, and the one that the voltage is for, of the drain, in the limit. This, and the one that the bias, and the operating, is for.
:::
:::

::: example The transconductance, and the small signal {#ex-gmsignal}
Explain, how the transconductance, and the one that the current is for, is the small, signal, and the one that the model is for, of the limit.
::: solution
The transconductance, and the one that the current is for, is the slope, and the current, is for, and the gate, and the one that the voltage is for. So the small, signal, and the gate, voltage, and the one that the limit is for, has, the current, and the one that the drain is for, is for, by the transconductance, and the one that the current is for, is for. So the small, signal, and the current, and the one that the limit is for, is the transconductance, and the one that the current is for, of the limit, times the gate, and the one that the voltage is for, and the small, and the one that the signal is for. This, and the one that the amplifier, and the one that the small signal, is for.
:::
:::

::: warning The channel, and the length {#warn-length}
The **hannel** length and the one that the device is for, is the one that the current and the one that the gain is for, of the limit. When the length, and the one that the channel is for, is small, the current, and the one that the drain is for, is the one that the limit is for. The design, and the one that the device is for, is the one that the length, and the one that the current is for, is for. This, and the one that the transistor, and the one that the limit, is for.
:::

::: widget plot
f: 0.5*2*1000*x*x
x: 0 1.5
y: 0 3
sliders:
caption: The drain current, and the one that the gate is for, as a function of the overdrive, and the one that the voltage is for. For the k, and the W/L, and the one that the milli is for, per the volt, and squared, and the saturation, and the one that the region is for: $I_D=0.5\,k\,V_{ov}^2$. This is the one that the amplifier, and the one that the gain is for, of the limit and the current.
:::

::: quiz
The overdrive, and the gate, and the one that the voltage is for. What is it, and the one that the current is for?
- [x] The gate and the body and the one that the voltage is for, minus the threshold and the one that the voltage is for
- [ ] The gate and the body and the one that the voltage is for, plus the threshold
- [ ] The gate and the body and the one that the voltage is for, alone
- [ ] The drain, and the one that the gate is for, the voltage
::: solution
The overdrive, and the one that the voltage is for, is the gate, and the body, and the one that the voltage is for, minus the threshold, and the one that the voltage is for. So the overdrive, and the one that the current is for, is $V_{GS}-V_t$, and the one that the voltage is for. This, and the one that the saturation, and the law is for, is the one that the quadratic, and the one that the transfer is for, of the current.
:::
:::

## Where this leads

With the channel, gate, saturation, bias, gain in hand, you have the full MOSFET and the one that the circuit is for. The method, and the check, are the one for the bias and the gain and the signal, and the one that is new is the MOSFET and the one that the channel is for. In the next lesson, you meet the BJT and the one that the base and the emitter and the collector is for, and the same current and the voltage and the bias, and the one that the limit is for, are the ones you already have.

::: history
The mos and the one that the field, is for, is the one that the transistor, and the one that the solid state, is for. The saturation, and the one that the law is for, is the one that the quadratic, and the one that the transfer is for. The method, and the design is for, is the one that the amplifier, and the one that the gain is for.
:::

::: summary
- The mosfet is the one that the gate is for, to control, and the one that the drain is for, of the current.
- In saturation, $I_D$ is the one that the quadratic, and the one that the overdrive is for.
- The overdrive, and the one that the voltage is for, is the gate and the body, minus the threshold.
- The transconductance, $g_m$, is the slope, and the one that the current is for, is for.
- The bias, and the one that the dc is for, is the one that the operating point, and the current, is for.
- The common source gain is $-g_m(r_o\parallel R)$, and the one that the current is for.
- The common drain, and the one that the source, follower is for, is the one that the gain is for, close to unity.
:::

## Exercises

::: exercise The channel {level=1}
The nmos and the one that the transistor is for. What happens, and the one that the current is for, when the gate and the body is positive?
::: solution
The nmos and the one that the channel is for, is the one that the channel, and the one that the region is for, is formed, and the drain, and the one that the current is for, flows. The gate and the one that the charge is for, is the one that the control, and the one that the channel is for, of the channel. So the current is the one that the gate is for, and the one that the voltage is for, and the one that the limit is for.
:::
:::

::: exercise Saturation {level=1}
What is the condition, and the one that the current is for, for the saturation, and the one that the region is for?
::: solution
In the saturation, and the one that the region is for, the drain and the body, and the one that the voltage is for, is greater than or equal to the gate and the body, and the one that the voltage is for, minus the threshold, and the one that the voltage is for. So the condition, and the one that the region is for, is $V_{DS}\ge V_{GS}-V_t$, and the one that the voltage is for. This is the one that the amplifier, and the one that the gain, is for.
:::
:::

::: exercise $I_D$ {level=2 check="0.5 k Vov^2"}
The nmos and the one that the transistor is for. What is the saturation, and the one that the law is for?
::: solution
In the saturation, and the one that the region is for, is $I_D=\frac{1}{2}\,\mu C_{ox}\frac{W}{L}(V_{GS}-V_t)^2$, and the one that the current is for. So the current is the one that the quadratic, and the one that the overdrive, and the one that the voltage is for, is for. This is the one that the amplifier, and the one that the gain, is for.
:::
:::

::: exercise $g_m$ {level=2}
What is the transconductance, and the one that the current is for?
::: hint
The slope.
:::
::: solution
The transconductance, and the one that the current is for, is
$$
g_m = \mu C_{ox}\frac{W}{L}(V_{GS}-V_t) = \frac{2I_D}{V_{GS}-V_t}.
$$
So the transconductance is the one that the current is for, is per the gate, and the one that the voltage is for. This is the one that the amplifier, and the one that the gain, is for.
:::
:::

::: exercise Gain {level=3 check="-gm ro R"}
The common source and the one that the amplifier is for. What is the gain, and the one that the limit is for?
::: solution
The gain, and the one that the drain is for, is $-g_m(r_o\parallel R)$, and the one that the gain is for. So the gain is the one that the magnitude, and the one that the current is for, of the limit is for. The negative, and the one that the phase is for, is the one that the signal is for, is inverted. This is the one that the amplifier, and the one that the gain, is for.
:::
:::

::: exercise Follower {level=3}
Explain, why the common drain and the one that the source, follower, is the one that the gain is for, close to unity.
::: hint
The gate and source.
:::
::: solution
The common drain, and the one that the follower, is for, has the source, and the one that the resistance, is for, in the feedback, and the one that the current is for. So the gate and the source, and the one that the voltage is for, is close, and the one that the difference is for, is small. The current, through the source, and the one that the resistance is for, controls the source, and the one that the voltage is for. So the gain, and the one that the voltage is for, is close to unity, and the one that the limit is for. This is the one that the buffer, and the one that the follower, is for.
:::
:::

::: exercise Bias {level=3}
Explain, the importance, of the bias, and the one that the dc is for, in the design, and the one that the amplifier is for.
::: hint
The operating.
:::
::: solution
The bias, and the one that the dc is for, is the one that the operating point, and the current, is for. If the operating, and the one that the current is for, is wrong, the amplifier, and the one that the gain is for, is the one that the signal is for, of the one that is clipped, and the one that the limit is for. If the operating, and the one that the current is for, is in the cut-off, or the one that the saturation is for, of the limit, the amplifier, and the one that the gain is for, is for. So the bias, and the one that the dc is for, is the one that the dc operating point, and the current, is for. The method, and the check, is the one that the operating, and the current, is for.
:::
:::

::: exercise Model {level=3}
Explain, the difference, between the saturation and the linear, and the one that the region is for, of the operating, and the one that the current is for.
::: hint
The quadratic.
:::
::: solution
In the saturation, and the one that the region is for, the current, is the one that the quadratic, and the one that the gate is for, of the limit and the current. In the linear, and the one that the region is for, the current is the one that the linear, and the one that the gate is for, of the limit and the drain, and the current. In the subthreshold, and the one that the region is for, the current is the one that the exponential, and the one that the gate is for, of the limit and the current. The amplifier, and the one that the gain is for, is the one that the saturation, and the one that the region is for, in the limit, and the one that the current is for.
:::
:::
