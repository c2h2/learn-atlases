Electricity is generated at $10$ to $25\,\mathrm{kV}$, transmitted at $110$ to $765\,\mathrm{kV}$, distributed at $10$ to $33\,\mathrm{kV}$ and used at $230$ or $120\,\mathrm{V}$. Between each pair of levels sits a **transformer**. A typical kilowatt-hour passes through four or five of them on its way to you, and the reason the world's grids are AC rather than DC is, more than anything else, that the transformer makes changing voltage cheap, silent and astonishingly efficient: large units lose less than half a percent of the power they carry. Transformers also isolate circuits from one another, match impedances and measure currents and voltages in substations.

In [[circuits-2/magnetically-coupled-circuits]] the transformer appeared as a pair of coupled inductors and, in the limit, as the ideal transformer. This chapter builds the engineering model from the magnetic circuit of [[electric-machines/magnetic-circuits]]. We derive the ideal transformer from the core, add the four imperfections of a real one to obtain its **equivalent circuit**, and show how two simple tests measure every element. With the model we compute **voltage regulation** and **efficiency**, the two figures by which transformers are specified and bought, and derive the condition for maximum efficiency. We finish with the per-unit system, the autotransformer and three-phase transformers.

## From the core to the ideal transformer

A single-phase transformer has two windings, the **primary** with $N_1$ turns and the **secondary** with $N_2$ turns, on a common laminated core. In a **core-type** construction each winding surrounds one limb of a rectangular core; in a **shell-type** construction both are wound on the centre limb of a three-limb core, which surrounds them. In both, the low-voltage winding is usually placed next to the core and the high-voltage winding outside it, and the two are interleaved closely to minimise leakage.

::: theorem Ideal transformer {#thm-ideal}
Suppose (i) all the flux $\phi$ is confined to the core and links every turn of both windings, (ii) the winding resistances are zero, (iii) the core has infinite permeability and no losses. With the dot convention, $v_1$ and $v_2$ positive at the dotted terminals, $i_1$ entering the primary dot and $i_2$ leaving the secondary dot,

$$
\frac{v_1}{v_2} = \frac{N_1}{N_2} = a, \qquad \frac{i_1}{i_2} = \frac{N_2}{N_1} = \frac1a,
$$ {#eq-ideal}

where $a$ is the **turns ratio**. Instantaneous power is conserved, $v_1i_1 = v_2i_2$, and an impedance $Z_L$ on the secondary appears at the primary as $Z_L' = a^2Z_L$.
:::

::: proof
By (i) and (ii), Faraday's law gives $v_1 = N_1\,\mathrm d\phi/\mathrm dt$ and $v_2 = N_2\,\mathrm d\phi/\mathrm dt$, so $v_1/v_2 = N_1/N_2$ at every instant. Apply the mmf law of [[electric-machines/magnetic-circuits#thm-magnetic-circuit]] around the core: $N_1i_1 - N_2i_2 = \mathcal R\phi$, the minus sign because $i_2$ leaves the dot and so its mmf opposes that of $i_1$. By (iii) $\mathcal R = 0$, so $N_1i_1 = N_2i_2$. Multiplying the two ratios, $v_1i_1 = v_2i_2$. Finally, $Z_L' = \mathbf V_1/\mathbf I_1 = (a\mathbf V_2)/(\mathbf I_2/a) = a^2Z_L$.
:::

Note that in this chapter, following the machines literature, $a = N_1/N_2$ is the primary-to-secondary ratio; [[circuits-2/magnetically-coupled-circuits]] used $n = N_2/N_1 = 1/a$. A **step-down** transformer has $a > 1$.

The important physical point is the one made by the emf equation, [[electric-machines/magnetic-circuits#thm-emf]]: the primary voltage fixes the flux, $\Phi_{\max} = V_1/(4.44fN_1)$, **independently of the load**. When the secondary delivers current, its mmf would reduce the flux; the primary instantly draws an extra current whose mmf cancels it. That balancing current is the load current reflected through the turns ratio.

## The equivalent circuit of a real transformer

A real transformer departs from each assumption of [[#thm-ideal]]:

- **Winding resistance.** Each winding has resistance, $R_1$ and $R_2$, which causes the **copper loss** $I_1^2R_1 + I_2^2R_2$.
- **Leakage flux.** Some flux produced by each winding closes through the air and the other winding's space instead of linking both. Since its path is mostly air, it is proportional to the current and is represented by **leakage reactances** $X_1$ and $X_2$ in series with the windings.
- **Finite permeability.** A finite core reluctance needs a net mmf $N_1i_m = \mathcal R\phi$, so the primary draws a **magnetising current** $i_m$ even at no load. It lags the voltage by $90^\circ$ and is represented by a **magnetising reactance** $X_m$ across the ideal primary.
- **Core loss.** Hysteresis and eddy currents dissipate power that depends on the flux, and so on the voltage, but not on the load. They are represented by a **core-loss resistance** $R_c$ in parallel with $X_m$. Its current $i_c$ is in phase with the voltage.

The sum $\mathbf I_\phi = \mathbf I_c + \mathbf I_m$ is the **exciting current**, typically $1$ to $5\,\%$ of rated current in power transformers.

::: definition Equivalent circuit referred to the primary {#def-equivalent}
The **exact equivalent circuit** of a single-phase transformer, referred to the primary, consists of $R_1 + jX_1$ in series from the primary terminal to an internal node; the shunt branch $R_c\parallel jX_m$ from that node to the return; and the secondary impedance **referred to the primary**, $R_2' + jX_2' = a^2(R_2 + jX_2)$, in series from the node to the referred secondary terminal, where the voltage is $\mathbf V_2' = a\mathbf V_2$ and the current $\mathbf I_2' = \mathbf I_2/a$. A load $Z_L$ is referred as $Z_L' = a^2Z_L$. Referring to the secondary instead divides every primary impedance by $a^2$, voltages by $a$, and multiplies currents by $a$.
:::

Referral moves the ideal transformer out of the circuit. It is legitimate because an impedance $Z$ on one side of an ideal transformer behaves at the terminals exactly as $a^2Z$ on the other ([[#thm-ideal]]), and the referred quantities preserve all powers: $I_2'^2R_2' = (I_2/a)^2a^2R_2 = I_2^2R_2$.

Because the exciting current is so small, the voltage drop it causes in $R_1 + jX_1$ is negligible, and the shunt branch can be moved to the primary terminals. The series elements then combine into the **equivalent resistance and reactance**

$$
R_{\text{eq}} = R_1 + a^2R_2, \qquad X_{\text{eq}} = X_1 + a^2X_2.
$$ {#eq-req}

This **approximate equivalent circuit** is the one used in almost all calculations; for regulation and fault studies the shunt branch is often dropped entirely.

::: remark The magnetising current is not sinusoidal
Because the core is nonlinear, a sinusoidal flux requires a non-sinusoidal magnetising current, peaked at the flux maxima and rich in the third harmonic. The equivalent circuit treats it as an equivalent sinusoid with the same rms value. In three-phase banks the third harmonics of the three phases are in phase with one another, which is one reason for the delta windings discussed below. When a transformer is switched on at a voltage zero, the flux can rise towards twice its normal peak, deep into saturation, and the **inrush current** may reach ten times rated current for a few cycles. Protective relays must be designed not to trip on it.
:::

## Measuring the parameters: open- and short-circuit tests

Two tests, each needing only a voltmeter, an ammeter and a wattmeter, determine the approximate equivalent circuit.

::: algorithm Open-circuit and short-circuit tests {#alg-tests}
**Open-circuit (no-load) test.** Apply rated voltage $V_{\text{oc}}$ at rated frequency to one winding (usually the low-voltage one, for convenience) with the other open. Measure $I_{\text{oc}}$ and $P_{\text{oc}}$. The current is the exciting current and $P_{\text{oc}}$ is the core loss (copper loss is negligible). Then, referred to the side of the test,

$$
G_c = \frac{P_{\text{oc}}}{V_{\text{oc}}^2},\qquad \abs{Y_\phi} = \frac{I_{\text{oc}}}{V_{\text{oc}}},\qquad B_m = \sqrt{\abs{Y_\phi}^2 - G_c^2},\qquad R_c = \frac1{G_c},\ X_m = \frac1{B_m}.
$$

**Short-circuit test.** Short one winding (usually the low-voltage one) and raise the voltage on the other until rated current flows; this needs only a few percent of rated voltage. Measure $V_{\text{sc}}$, $I_{\text{sc}}$ and $P_{\text{sc}}$. At this low voltage the flux and core loss are negligible, so $P_{\text{sc}}$ is the full-load copper loss. Referred to the side of the test,

$$
\abs{Z_{\text{eq}}} = \frac{V_{\text{sc}}}{I_{\text{sc}}},\qquad R_{\text{eq}} = \frac{P_{\text{sc}}}{I_{\text{sc}}^2},\qquad X_{\text{eq}} = \sqrt{\abs{Z_{\text{eq}}}^2 - R_{\text{eq}}^2}.
$$
:::

The tests separate the two kinds of loss neatly: core loss depends on voltage and is measured at full voltage and no current; copper loss depends on current and is measured at full current and almost no voltage. Neither test needs the transformer to deliver its rated power, which for a $500\,\mathrm{MVA}$ unit would be impossible in a factory.

::: example Parameters from test data {#ex-tests}
A single-phase $50\,\mathrm{kVA}$, $2400/240\,\mathrm V$, $50\,\mathrm{Hz}$ transformer gives the following results.

| test | side | voltage | current | power |
|---|---|---|---|---|
| open circuit | LV | $240\,\mathrm V$ | $5.0\,\mathrm A$ | $180\,\mathrm W$ |
| short circuit | HV | $72\,\mathrm V$ | $20.83\,\mathrm A$ | $600\,\mathrm W$ |

Find the approximate equivalent circuit referred to the high-voltage side.
::: solution
**Open circuit** (on the LV side): $G_c = 180/240^2 = 3.125\times10^{-3}\,\mathrm S$, $\abs{Y_\phi} = 5/240 = 2.083\times10^{-2}\,\mathrm S$, so $B_m = \sqrt{(2.083\times10^{-2})^2 - (3.125\times10^{-3})^2} = 2.060\times10^{-2}\,\mathrm S$. Thus $R_c = 320\,\Omega$ and $X_m = 48.5\,\Omega$ on the LV side. With $a = 10$, on the HV side they are multiplied by $a^2 = 100$: $R_c = 32.0\,\mathrm{k\Omega}$, $X_m = 4.85\,\mathrm{k\Omega}$. The no-load power factor is $180/(240\times5) = 0.15$: the exciting current is mostly magnetising.

**Short circuit** (on the HV side; rated HV current is $50\,000/2400 = 20.83\,\mathrm A$): $\abs{Z_{\text{eq}}} = 72/20.83 = 3.456\,\Omega$, $R_{\text{eq}} = 600/20.83^2 = 1.382\,\Omega$, $X_{\text{eq}} = \sqrt{3.456^2 - 1.382^2} = 3.167\,\Omega$, already on the HV side.

The exciting current is $5/208.3 = 2.4\,\%$ of the LV rated current, and the short-circuit voltage is $72/2400 = 3\,\%$ of rated: both typical of a distribution transformer.
:::
:::

::: warning Refer everything to one side
Every number in the equivalent circuit belongs to one side. In [[#ex-tests]] the open-circuit data, taken on the LV side, had to be multiplied by $a^2$ before combining them with the short-circuit data, taken on the HV side. Mixing sides gives errors of a factor of $100$ that are easy to miss. Write "(HV)" or "(LV)" next to every impedance until it becomes a habit, and remember that referral multiplies impedances by $a^2$ but voltages only by $a$.
:::

## The per-unit system

Transformer impedances look very different on the two sides: $3.456\,\Omega$ on the HV side of [[#ex-tests]] is $0.03456\,\Omega$ on the LV side. Engineers avoid this by expressing every quantity as a fraction of a base value.

::: definition Per-unit quantities {#def-per-unit}
Choose a base apparent power $S_b$ (usually the rating) and a base voltage $V_b$ on each side (usually the rated voltages, so that $V_{b1}/V_{b2} = a$). The base current and impedance on each side are $I_b = S_b/V_b$ and $Z_b = V_b^2/S_b$. The **per-unit** (pu) value of any quantity is its actual value divided by its base. A transformer impedance then has the **same per-unit value** referred to either side, and the ideal transformer disappears from per-unit diagrams.
:::

In [[#ex-tests]], $Z_{b,\text{HV}} = 2400^2/50\,000 = 115.2\,\Omega$, so $Z_{\text{eq}} = (1.382 + j3.167)/115.2 = 0.0120 + j0.0275\,\mathrm{pu}$, magnitude $0.030\,\mathrm{pu}$. On the LV side the base is $1.152\,\Omega$ and $0.03456\,\Omega$ gives the same $0.030\,\mathrm{pu}$. Per-unit impedances of power transformers fall in a narrow range, typically $0.04$ to $0.15\,\mathrm{pu}$ of reactance for large units, which makes errors easy to spot. The magnitude of the per-unit impedance equals the short-circuit test voltage as a fraction of rated voltage, and its reciprocal is the fault current in per unit with a stiff source: a $3\,\%$ impedance transformer delivers about $33$ times rated current into a bolted short. The per-unit method is developed fully in [[power-systems]].

## Voltage regulation

When load is applied, the secondary voltage falls (or, with a leading load, may rise) because of the drop in the series impedance.

::: definition Voltage regulation {#def-regulation}
The **voltage regulation** of a transformer at a given load is the change in secondary voltage from no load to that load, at constant primary voltage, as a fraction of the full-load value:

$$
\mathrm{VR} = \frac{V_{2,\text{nl}} - V_{2,\text{fl}}}{V_{2,\text{fl}}}\times100\,\%.
$$

With the series impedance referred to the primary and the shunt branch neglected, the primary voltage needed to supply rated $\mathbf V_2'$ and current $\mathbf I_2'$ is $\mathbf V_1 = \mathbf V_2' + (R_{\text{eq}} + jX_{\text{eq}})\mathbf I_2'$, and $\mathrm{VR} = (V_1 - V_2')/V_2'$.
:::

::: theorem Approximate regulation formula {#thm-regulation}
For a load current $\mathbf I_2' = I\angle -\theta$ (lagging by $\theta$; $\theta < 0$ for a leading load) at secondary voltage $V_2'$, and a series impedance with $IR_{\text{eq}}, IX_{\text{eq}} \ll V_2'$,

$$
\mathrm{VR} \approx \frac{I\left(R_{\text{eq}}\cos\theta + X_{\text{eq}}\sin\theta\right)}{V_2'} = r\cos\theta + x\sin\theta,
$$ {#eq-reg-approx}

where $r$ and $x$ are the per-unit resistance and reactance at rated current. The regulation is greatest when the load angle equals the impedance angle, and it becomes negative for sufficiently leading loads.
:::

::: proof
Take $\mathbf V_2' = V_2'\angle 0^\circ$ as reference. Then $(R + jX)I(\cos\theta - j\sin\theta) = I(R\cos\theta + X\sin\theta) + jI(X\cos\theta - R\sin\theta)$, so

$$
\mathbf V_1 = \bigl[V_2' + I(R\cos\theta + X\sin\theta)\bigr] + jI(X\cos\theta - R\sin\theta).
$$

The imaginary part is small and enters $\abs{\mathbf V_1}$ only to second order: $\abs{\mathbf V_1} = \sqrt{(V_2' + \Delta_1)^2 + \Delta_2^2} \approx V_2' + \Delta_1 + \Delta_2^2/(2V_2')$. Dropping the last term and dividing by $V_2'$ gives [[#eq-reg-approx]]. Its derivative with respect to $\theta$ is $-r\sin\theta + x\cos\theta$, zero at $\tan\theta = x/r$, the impedance angle; and $r\cos\theta + x\sin\theta < 0$ when $\tan\theta < -r/x$.
:::

::: example Regulation at three power factors {#ex-regulation}
For the transformer of [[#ex-tests]], find the voltage regulation at full load and rated secondary voltage for power factors (a) $0.8$ lagging, (b) $1$, (c) $0.8$ leading.
::: solution
Referred to the HV side, $V_2' = 2400\angle 0^\circ\,\mathrm V$ and $I = 20.83\,\mathrm A$.

(a) $\mathbf I_2' = 20.83\angle -36.87^\circ\,\mathrm A$, and
$\mathbf V_1 = 2400 + (20.83\angle -36.87^\circ)(1.382 + j3.167) = 2400 + 62.6 + j35.5 = 2462.9\angle 0.83^\circ\,\mathrm V$, so $\mathrm{VR} = 62.9/2400 = 2.62\,\%$. The approximate formula gives $0.012\times0.8 + 0.0275\times0.6 = 2.61\,\%$.

(b) $\mathbf V_1 = 2400 + 20.83(1.382 + j3.167) = 2428.8 + j66.0 = 2429.7\angle 1.56^\circ\,\mathrm V$, $\mathrm{VR} = 1.24\,\%$ (approximately $1.20\,\%$; the quadrature term matters a little more here).

(c) $\mathbf I_2' = 20.83\angle +36.87^\circ\,\mathrm A$ gives $\abs{\mathbf V_1} = 2384.5\,\mathrm V$ and $\mathrm{VR} = -0.65\,\%$: the secondary voltage **rises** on load, because the leading current flowing through the leakage reactance produces a voltage that adds to the source.
:::
:::

::: widget plot
f: 100*(sqrt((1 + r*cos(x*pi/180) + q*sin(x*pi/180))^2 + (q*cos(x*pi/180) - r*sin(x*pi/180))^2) - 1)
x: -90, 90
y: -6, 8
sliders: r=0.012:0.002:0.05:0.001; q=0.0275:0.01:0.12:0.0025
hlines: 0
caption: Exact voltage regulation in percent at rated current, against the load power-factor angle $\theta$ in degrees (positive = lagging, negative = leading), for a series impedance of $r + jq$ per unit. The defaults are the transformer of the regulation example. Notice that the maximum occurs where $\theta$ equals the impedance angle $\arctan(q/r)$, that the regulation crosses zero for a leading load, and that raising the reactance $q$ (as in a large transformer designed to limit fault current) makes regulation much more sensitive to the power factor.
:::

## Losses and efficiency

The efficiency of a transformer is $\eta = P_{\text{out}}/(P_{\text{out}} + P_{\text{loss}})$. Its losses are of two kinds: the **core loss** $P_c$, practically constant at constant voltage and frequency, and the **copper loss**, proportional to the square of the load current. Let $x = I_2/I_{2,\text{rated}}$ be the fraction of full load and $P_{\text{cu,fl}}$ the full-load copper loss measured in the short-circuit test. At rated voltage and power factor $\cos\theta$,

$$
\eta(x) = \frac{xS_{\text{rated}}\cos\theta}{xS_{\text{rated}}\cos\theta + P_c + x^2P_{\text{cu,fl}}}.
$$ {#eq-efficiency}

::: theorem Condition for maximum efficiency {#thm-max-efficiency}
At a fixed power factor, the efficiency [[#eq-efficiency]] is greatest at the load fraction

$$
x_{\max} = \sqrt{\frac{P_c}{P_{\text{cu,fl}}}},
$$

that is, when the copper loss equals the core loss.
:::

::: proof
Maximising $\eta$ is the same as minimising the loss per unit output, $P_{\text{loss}}/P_{\text{out}} = (P_c + x^2P_{\text{cu,fl}})/(xS\cos\theta) = \bigl(P_c/x + xP_{\text{cu,fl}}\bigr)/(S\cos\theta)$. Its derivative with respect to $x$ is $(-P_c/x^2 + P_{\text{cu,fl}})/(S\cos\theta)$, which is zero at $x^2P_{\text{cu,fl}} = P_c$, and the second derivative $2P_c/x^3$ is positive, so this is a minimum of the loss ratio.
:::

The power factor does not change where the maximum occurs, only its height: at lower power factors the same losses accompany less real power.

::: example Efficiency of the 50 kVA transformer {#ex-efficiency}
Using the test results of [[#ex-tests]], find the efficiency at full load and $0.8$ power factor, and the load and value of maximum efficiency at the same power factor.
::: solution
$P_c = 180\,\mathrm W$ and $P_{\text{cu,fl}} = 600\,\mathrm W$. At full load,

$$
\eta = \frac{40\,000}{40\,000 + 180 + 600} = 98.09\,\%.
$$

The maximum occurs at $x_{\max} = \sqrt{180/600} = 0.548$, that is at $27.4\,\mathrm{kVA}$, where the copper loss is $0.3\times600 = 180\,\mathrm W$:

$$
\eta_{\max} = \frac{0.548\times40\,000}{0.548\times40\,000 + 360} = 98.38\,\%.
$$

The efficiency curve is very flat: at half load it is $98.38\,\%$ as well (to four figures), and it stays above $98\,\%$ from about $28\,\%$ to $108\,\%$ load.
:::
:::

::: widget plot
f: 100*x*50000*pf/(x*50000*pf + Pc + x^2*Pcu)
x: 0.02, 1.5
y: 90, 100
sliders: Pc=180:20:1000:10; Pcu=600:100:2000:10; pf=0.8:0.3:1:0.05
caption: Efficiency in percent of a $50\,\mathrm{kVA}$ transformer against the load fraction $x$, with core loss $P_c$ and full-load copper loss $P_{\text{cu}}$ in watts. The peak is always where $x^2P_{\text{cu}} = P_c$. Raise $P_c$ and the peak moves to heavier loads while light-load efficiency collapses; lower the power factor and the whole curve drops but its peak stays at the same $x$. A transformer that spends most of its life lightly loaded should have a small core loss.
:::

### Designing for the load cycle

A distribution transformer is energised all day but loaded only part of the time, so its core loss runs for $24$ hours while its copper loss follows the load. The relevant figure is the **energy efficiency** (or **all-day efficiency**), the ratio of energy delivered to energy supplied over a day.

::: example Choosing the loss split for a distribution transformer {#ex-design-losses}
A utility buys $100\,\mathrm{kVA}$ distribution transformers. For a given amount of active material, a manufacturer can trade core loss against copper loss (more turns lower the flux density and core loss but lengthen the winding), and its designs satisfy approximately $P_cP_{\text{cu,fl}} = 3.6\times10^5\,\mathrm{W^2}$. The daily load cycle at unity power factor is $8\,\mathrm h$ at $10\,\%$, $10\,\mathrm h$ at $40\,\%$ and $6\,\mathrm h$ at $80\,\%$ of rating. Choose $P_c$ to minimise the daily energy loss, and compare with the designs $P_c = 240\,\mathrm W$ and $P_c = 500\,\mathrm W$.
::: solution
With $h_k$ hours at load fraction $x_k$, the daily energy loss is

$$
E_{\text{loss}} = 24P_c + P_{\text{cu,fl}}\sum_kh_kx_k^2 = 24P_c + \frac{K}{P_c}\sum_kh_kx_k^2,\qquad K = 3.6\times10^5\,\mathrm{W^2}.
$$

Here $\sum h_kx_k^2 = 8(0.01) + 10(0.16) + 6(0.64) = 5.52\,\mathrm h$. Setting $\mathrm dE_{\text{loss}}/\mathrm dP_c = 24 - K(5.52)/P_c^2 = 0$ gives

$$
P_c = \sqrt{\frac{3.6\times10^5\times5.52}{24}} = 288\,\mathrm W,\qquad P_{\text{cu,fl}} = \frac{K}{P_c} = 1251\,\mathrm W.
$$

The optimum makes the daily **energy** of core loss equal to that of copper loss ($24\times288 = 6.9\,\mathrm{kWh}$ each), the energy analogue of [[#thm-max-efficiency]]; it corresponds to maximum power efficiency at the rms load fraction, $\sqrt{5.52/24} = 0.48$.

The energy delivered is $(8\times0.1 + 10\times0.4 + 6\times0.8)\times100 = 960\,\mathrm{kWh}$. The daily losses are $13.81\,\mathrm{kWh}$ for the optimum, $14.04\,\mathrm{kWh}$ for $P_c = 240\,\mathrm W$ and $15.97\,\mathrm{kWh}$ for $P_c = 500\,\mathrm W$, giving energy efficiencies of $98.58\,\%$, $98.56\,\%$ and $98.36\,\%$. The optimum is shallow, but over a $30$-year life a difference of $2\,\mathrm{kWh}$ a day is about $22\,\mathrm{MWh}$ per transformer, multiplied by the many thousands a utility owns. This is why utilities evaluate tenders by capitalising losses, putting a price on each watt of core and copper loss.
:::
:::

::: quiz
The open-circuit test of a transformer is performed at rated voltage but at $10\,\%$ below rated frequency. Compared with a test at rated frequency, the measured power will be
- [ ] the same, because the voltage is the same
- [x] higher, because the peak flux density is higher
- [ ] lower, because core losses fall with frequency
- [ ] zero, because the secondary is open
::: solution
At constant voltage, $\Phi_{\max}\propto V/f$ rises by about $11\,\%$. Eddy loss is $\propto f^2B_{\max}^2 \propto V^2$, so it is unchanged; hysteresis loss is $\propto fB_{\max}^{\,n} \propto V^nf^{1-n}$ with $n > 1$, so it increases. The net effect is a higher reading. The magnetising current rises even more, since the core moves towards saturation. Tests must be performed at rated voltage **and** frequency.
:::
:::

## Autotransformers

If the two windings of a transformer are connected in series, the result is an **autotransformer**: a single winding with a tap, sharing part of the winding between input and output. It sacrifices isolation but gains a great deal in rating.

::: theorem Rating of an autotransformer {#thm-auto}
A two-winding transformer with winding voltages $V_{\text{com}}$ (the common winding, $N_C$ turns) and $V_{\text{se}}$ (the series winding, $N_{SE}$ turns) and rating $S_W$ is connected as a step-up autotransformer with low-voltage terminals across the common winding and high-voltage terminals across both in series aiding, so $V_H = V_{\text{com}} + V_{\text{se}}$ and $V_L = V_{\text{com}}$. With each winding at its rated current, the autotransformer carries

$$
S_{\text{auto}} = S_W\frac{V_H}{V_H - V_L} = S_W\left(1 + \frac{N_C}{N_{SE}}\right).
$$
:::

::: proof
The series winding carries the high-side line current $I_H$, which at rating is $S_W/V_{\text{se}}$. The power through the autotransformer is $S_{\text{auto}} = V_HI_H = (V_{\text{com}} + V_{\text{se}})S_W/V_{\text{se}} = S_W(1 + V_{\text{com}}/V_{\text{se}})$. Ampère-turn balance gives the common-winding current $I_C = I_L - I_H$ with $N_CI_C = N_{SE}I_H$, so the common winding carries $V_{\text{com}}I_C = V_{\text{com}}I_HN_{SE}/N_C = V_{\text{se}}I_H = S_W$, exactly its rating. Only $S_W$ is transferred magnetically; the rest, $V_LI_H$, passes by direct conduction.
:::

::: example A 2400/240 V transformer as an autotransformer {#ex-auto}
The $50\,\mathrm{kVA}$, $2400/240\,\mathrm V$ transformer of [[#ex-tests]] is connected as a $2400/2640\,\mathrm V$ step-up autotransformer. Find its rating and its full-load efficiency at $0.8$ power factor.
::: solution
Here $V_L = V_{\text{com}} = 2400\,\mathrm V$ and $V_{\text{se}} = 240\,\mathrm V$. The series winding's rated current is $50\,000/240 = 208.3\,\mathrm A$, so $S_{\text{auto}} = 2640\times208.3 = 550\,\mathrm{kVA}$, eleven times the two-winding rating. Each winding carries its rated current at rated voltage, so the losses are unchanged, $180 + 600 = 780\,\mathrm W$, and

$$
\eta = \frac{550\,000\times0.8}{550\,000\times0.8 + 780} = 99.82\,\%.
$$

The per-unit series impedance is also eleven times smaller on the new base, which means much better regulation but also a much larger fault current. Autotransformers are used where the voltage ratio is close to one (for example $400/275\,\mathrm{kV}$ grid interconnectors) and in variable-voltage laboratory supplies.
:::
:::

## Three-phase transformers

Three-phase power is transformed either by a **bank** of three single-phase transformers or by a **three-phase transformer** with all six windings on one three-limb core. The three-limb core is cheaper and lighter, because in a balanced system the three limb fluxes sum to zero and need no common return path. Each side may be connected in wye (Y) or delta ($\Delta$), giving four basic connections:

| connection | line-voltage ratio | phase shift | typical use |
|---|---|---|---|
| Y–Y | $a$ | $0^\circ$ | rarely used alone: needs a tertiary delta or solid neutrals to handle third harmonics and unbalance |
| Y–$\Delta$ | $\sqrt3\,a$ | $30^\circ$ | step-down at the end of transmission lines |
| $\Delta$–Y | $a/\sqrt3$ | $30^\circ$ | generator step-up; distribution, giving a four-wire secondary with neutral |
| $\Delta$–$\Delta$ | $a$ | $0^\circ$ | industrial; can run as open delta at $58\,\%$ rating if one unit fails |

Here $a$ is the turns ratio of each phase winding. In a wye winding the phase winding carries the line voltage divided by $\sqrt3$; in a delta winding it carries the full line voltage but only $1/\sqrt3$ of the line current. Because a line voltage on the wye side is the difference of two phase voltages, which are each in phase with a delta-side line voltage, the Y–$\Delta$ and $\Delta$–Y connections shift the line voltages by $30^\circ$. By convention (the IEEE standard in North America and vector group Dyn11 in IEC practice), the low-voltage side lags or leads by $30^\circ$ in a defined way; transformers can be paralleled only if their phase shifts agree.

For balanced operation the analysis is done on a per-phase **wye equivalent**, exactly as in [[circuits-2/three-phase-circuits]]: a delta winding is replaced by an equivalent wye with the same line voltages, and the phase shift is noted separately.

::: example A delta–wye distribution bank {#ex-three-phase}
Three single-phase $50\,\mathrm{kVA}$, $2400/240\,\mathrm V$ transformers are connected $\Delta$–Y, the $2400\,\mathrm V$ windings in delta. (a) What are the line voltages and the rating of the bank? (b) The bank supplies a balanced load of $120\,\mathrm{kW}$ at $0.85$ power factor lagging. Find the line currents on both sides and the current in each HV winding.
::: solution
(a) The HV line voltage equals the winding voltage, $2400\,\mathrm V$. On the LV side the windings form a wye, so the line voltage is $\sqrt3\times240 = 415.7\,\mathrm V$, the familiar four-wire $240/415\,\mathrm V$ system. The bank is rated $3\times50 = 150\,\mathrm{kVA}$.

(b) The load's apparent power is $120/0.85 = 141.2\,\mathrm{kVA}$, within the rating. LV line current (equal to the winding current in wye): $I_L = 141\,200/(\sqrt3\times415.7) = 196.1\,\mathrm A$. HV line current: $141\,200/(\sqrt3\times2400) = 33.96\,\mathrm A$. HV winding current (in delta): $33.96/\sqrt3 = 19.61\,\mathrm A$, which checks with the winding ratio, $196.1/10 = 19.61\,\mathrm A$. Each winding carries $2400\times19.61 = 47.1\,\mathrm{kVA}$, a third of the load.
:::
:::

::: quiz
Three identical single-phase $6.6\,\mathrm{kV}/400\,\mathrm{V}$ transformers are connected Y–$\Delta$ (HV in wye). The HV side is connected to an $11.43\,\mathrm{kV}$ line. What is the LV line voltage?
- [ ] $693\,\mathrm V$
- [x] $400\,\mathrm V$
- [ ] $231\,\mathrm V$
- [ ] $133\,\mathrm V$
::: solution
Each HV winding sits between line and neutral and receives $11\,430/\sqrt3 = 6600\,\mathrm V$, its rating. Each LV winding then produces $400\,\mathrm V$, and in delta the winding voltage is the line voltage: $400\,\mathrm V$. The line-voltage ratio is $11\,430/400 = \sqrt3\,a$, as in the table.
:::
:::

::: application Instrument transformers
Protective relays and meters cannot be connected directly to a $400\,\mathrm{kV}$ line carrying $2000\,\mathrm A$. **Voltage transformers** step the voltage down to $110\,\mathrm V$ and **current transformers** (CTs) step the current down to $1$ or $5\,\mathrm A$. A CT has a primary of one turn (the line conductor itself) and a secondary of many turns, and it is operated almost short-circuited by its low-impedance burden. Its secondary must never be opened under load: the full primary mmf would then magnetise the core, driving it deep into saturation and inducing dangerously high voltage peaks in the many-turn secondary.
:::

::: history
Michael Faraday's induction ring of 29 August 1831 was the first transformer. Induction coils for producing high voltages from batteries followed in the 1830s to 1850s. Lucien Gaulard and John Dixon Gibbs demonstrated open-core "secondary generators" for AC lighting in London in 1883 and in Turin in 1884. In 1885 Károly Zipernowsky, Ottó Bláthy and Miksa Déri of the Ganz works in Budapest patented closed-core transformers connected in parallel to a constant-voltage supply, the arrangement used ever since, and Bláthy is credited with the word "transformer". William Stanley built the first complete American AC system with transformers at Great Barrington, Massachusetts, in March 1886 for George Westinghouse. Mikhail Dolivo-Dobrovolsky developed the three-phase transformer at AEG around 1889–1891.
:::

## Where this leads

The transformer's equivalent circuit is the template for the rest of the course: the induction motor of [[electric-machines/induction-machines]] is a transformer with a rotating, short-circuited secondary, and its equivalent circuit is the one above with the load resistor depending on speed. In [[power-systems]] transformers appear as per-unit series reactances with off-nominal taps and phase shifts, and their leakage reactance limits fault currents. High-frequency transformers for switch-mode supplies, designed with the core-loss and winding considerations of this chapter but at hundreds of kilohertz, are the subject of [[power-electronics]]. Next, [[electric-machines/energy-conversion]] turns from transformers, which store and pass on magnetic energy, to devices that convert it into mechanical work.

::: summary
- An ideal transformer has $v_1/v_2 = N_1/N_2 = a$ and $i_1/i_2 = 1/a$, conserves power and refers impedances by $a^2$. The primary voltage fixes the core flux regardless of load.
- The real transformer adds winding resistances and leakage reactances in series and a magnetising reactance and core-loss resistance in shunt; with the shunt branch moved to the terminals the series elements combine into $R_{\text{eq}} + jX_{\text{eq}}$.
- The open-circuit test (rated voltage) measures the shunt branch and core loss; the short-circuit test (rated current) measures the series impedance and full-load copper loss.
- Per-unit impedances are the same on both sides of a transformer, typically a few percent; the per-unit impedance equals the short-circuit test voltage fraction.
- Regulation is approximately $r\cos\theta + x\sin\theta$: largest for lagging loads, negative for sufficiently leading ones.
- Efficiency is maximum when copper loss equals core loss; for a varying load the daily energy losses are minimised when core-loss energy equals copper-loss energy.
- Autotransformers carry $(1 + N_C/N_{SE})$ times the two-winding rating; three-phase Y–$\Delta$ connections shift line voltages by $30^\circ$.
:::

## Exercises

::: exercise Turns ratio and currents {level=1 check="10e3/230"}
A $10\,\mathrm{kVA}$, $11\,000/230\,\mathrm V$ single-phase transformer is fully loaded. Find the secondary current in amperes.
::: solution
$I_2 = S/V_2 = 10\,000/230 = 43.5\,\mathrm A$. The primary current is $10\,000/11\,000 = 0.909\,\mathrm A$ and the turns ratio is $a = 47.8$.
:::
:::

::: exercise Referring an impedance {level=1 check="0.005*(2400/240)^2"}
The LV winding of a $2400/240\,\mathrm V$ transformer has a resistance $R_2 = 0.005\,\Omega$. What is $R_2$ referred to the HV side, in ohms?
::: solution
$R_2' = a^2R_2 = 100\times0.005 = 0.5\,\Omega$.
:::
:::

::: exercise Base impedance {level=1 check="(11e3)^2/500e3"}
Find the base impedance, in ohms, of the HV side of a $500\,\mathrm{kVA}$, $11/0.415\,\mathrm{kV}$ transformer, taking its rating and rated voltage as bases (single-phase rating and line voltage, as is conventional for three-phase per-unit work).
::: solution
$Z_b = V_b^2/S_b = (11\,000)^2/500\,000 = 242\,\Omega$.
:::
:::

::: exercise Open-circuit test {level=2 check="120^2/40"}
A $120/480\,\mathrm V$, $5\,\mathrm{kVA}$ transformer draws $1.0\,\mathrm A$ and $40\,\mathrm W$ at $120\,\mathrm V$ in an open-circuit test on its LV side. Find $R_c$ and $X_m$ on the LV side. Give $R_c$ in ohms.
::: solution
$G_c = 40/120^2 = 2.78\times10^{-3}\,\mathrm S$, so $R_c = 360\,\Omega$. $\abs{Y} = 1/120 = 8.33\times10^{-3}\,\mathrm S$, $B_m = \sqrt{8.33^2 - 2.78^2}\times10^{-3} = 7.86\times10^{-3}\,\mathrm S$, so $X_m = 127\,\Omega$.
:::
:::

::: exercise Efficiency at half load {level=2 check="0.5*50000*0.9/(0.5*50000*0.9 + 180 + 0.25*600)"}
For the transformer of [[#ex-tests]], find the efficiency at half load and $0.9$ power factor lagging, as a fraction.
::: solution
$P_{\text{out}} = 0.5\times50\,000\times0.9 = 22.5\,\mathrm{kW}$; losses $180 + 0.25\times600 = 330\,\mathrm W$; $\eta = 22\,500/22\,830 = 0.9855$.
:::
:::

::: exercise Primary voltage on load {level=2 check="245.51"}
The transformer of [[#ex-tests]] is to supply its rated current at $240\,\mathrm V$ and $0.9$ power factor lagging. Using the series impedance referred to the LV side ($0.01382 + j0.03167\,\Omega$), find the required primary voltage referred to the LV side, in volts. (Take $\sin\theta = 0.4359$.)
::: solution
$\mathbf I_2 = 208.3\angle -25.84^\circ = 187.5 - j90.8\,\mathrm A$. The drop is $(0.01382 + j0.03167)(187.5 - j90.8) = 2.59 + 2.88 + j(5.94 - 1.26) = 5.47 + j4.68\,\mathrm V$. So $\mathbf V_1' = 245.5 + j4.68$, magnitude $245.5\,\mathrm V$ ($2455\,\mathrm V$ on the HV side), and the regulation is $2.30\,\%$; the approximate formula gives $0.012\times0.9 + 0.0275\times0.436 = 2.28\,\%$.
:::
:::

::: exercise Maximum efficiency from two measurements {level=3}
A $200\,\mathrm{kVA}$ transformer has an efficiency of $98.0\,\%$ at full load and $98.3\,\%$ at half load, both at unity power factor. Find its core loss and full-load copper loss, and the load at which its efficiency is maximum.
::: hint
Write the losses at each load as $P_{\text{out}}(1/\eta - 1)$, then solve two linear equations for $P_c$ and $P_{\text{cu,fl}}$.
:::
::: solution
Full load: losses $= 200\,000(1/0.98 - 1) = 4082\,\mathrm W = P_c + P_{\text{cu}}$. Half load: $100\,000(1/0.983 - 1) = 1729\,\mathrm W = P_c + P_{\text{cu}}/4$. Subtracting, $0.75P_{\text{cu}} = 2353$, so $P_{\text{cu}} = 3137\,\mathrm W$ and $P_c = 945\,\mathrm W$. Maximum efficiency at $x = \sqrt{945/3137} = 0.549$, about $110\,\mathrm{kVA}$, where $\eta = 109\,800/(109\,800 + 1890) = 98.31\,\%$. The half-load point was already very close to the maximum.
:::
:::

::: exercise Design for a regulation limit {level=3}
A $1\,\mathrm{MVA}$ transformer is to have a per-unit resistance of $0.01$. The specification requires the full-load regulation not to exceed $4\,\%$ at any lagging power factor down to $0.8$, and requires the per-unit reactance to be as large as possible (to limit fault current). Find the largest permissible per-unit reactance, using the approximate formula, and the resulting short-circuit current with a stiff supply.
::: hint
Over the range $0.8 \le \cos\theta \le 1$ lagging, find where $r\cos\theta + x\sin\theta$ is largest for the reactances of interest.
:::
::: solution
For $x$ larger than about $0.0075$, the impedance angle $\arctan(x/0.01)$ exceeds $36.87^\circ$, so over the allowed range the regulation increases with $\theta$ and is worst at $\cos\theta = 0.8$: $0.01\times0.8 + 0.6x \le 0.04$, giving $x \le 0.0533$. Check with the exact formula: $\sqrt{(1 + 0.008 + 0.032)^2 + (0.0427 - 0.006)^2} - 1 = 4.06\,\%$, slightly above the limit, so take $x = 0.052$ (exact $3.98\,\%$). The impedance is $\abs{0.01 + j0.052} = 0.053\,\mathrm{pu}$, and the bolted-fault current is $1/0.053 = 18.9$ times rated current. The design is a compromise: a higher reactance would limit fault current further but break the regulation limit.
:::
:::

::: exercise A delta–wye bank and its phase shift {level=3}
Three single-phase transformers rated $11\,000/230\,\mathrm V$ are connected $\Delta$–Y and fed from an $11\,\mathrm{kV}$, $50\,\mathrm{Hz}$ system with phase sequence abc. The primary $a$-phase winding is connected between HV lines A and B, and it is magnetically coupled to the secondary winding between terminal a and neutral. Taking $\mathbf V_{AB} = 11\,000\angle 0^\circ\,\mathrm V$, find $\mathbf V_{an}$ and $\mathbf V_{ab}$, and hence the phase shift between corresponding HV and LV line voltages.
::: solution
The winding coupled to $AB$ has voltage in phase with $\mathbf V_{AB}$: $\mathbf V_{an} = 230\angle 0^\circ\,\mathrm V$. Similarly $\mathbf V_{bn} = 230\angle -120^\circ\,\mathrm V$ (coupled to $\mathbf V_{BC}$). Then $\mathbf V_{ab} = \mathbf V_{an} - \mathbf V_{bn} = 230(1 - \angle -120^\circ) = 230\sqrt3\angle 30^\circ = 398.4\angle 30^\circ\,\mathrm V$. The LV line voltage leads the corresponding HV line voltage by $30^\circ$ and the line-voltage ratio is $11\,000/398.4 = 27.6 = a/\sqrt3$. Reconnecting the windings in the other order (or reversing the sequence) gives a lag of $30^\circ$ instead, which is why the vector group must be specified and matched before transformers are paralleled.
:::
:::
