The position servo of the earlier chapters has a stubborn problem. With a proportional amplifier, a gain that gives a well-damped response leaves a velocity error constant of only about $40\,\mathrm{s^{-1}}$, so the shaft lags a ramp command by $2.5\,\%$ of the ramp rate per second; raising the gain to $K_v = 100\,\mathrm{s^{-1}}$ cuts the phase margin to $26^\circ$ and the response overshoots by almost $50\,\%$. One gain cannot set both the low-frequency accuracy and the damping near crossover, because both are determined by the same loop gain. A **compensator** — a small network of poles and zeros inserted in the loop — breaks that link: it shapes the loop gain differently at different frequencies.

Two shapes cover most needs. A **lead compensator** adds phase near the crossover frequency, which improves damping and allows a faster loop; it is the realisable form of derivative action. A **lag compensator** raises the gain at low frequencies without disturbing the crossover, which improves steady-state accuracy; it is the cousin of integral action. This chapter derives their properties, designs them with Bode plots and with the root locus, combines them, and builds them from op-amps. The EE application that dominates practice — the voltage loop of a switching converter, compensated with "Type II" and "Type III" networks — closes the chapter. The tools are those of [[control-systems/root-locus]] and [[control-systems/frequency-response-methods]], and the running plant is the servo $G(s) = 250\,000/[s(s + 63)(s + 200)]$ of [[control-systems/stability#ex-servo-range]].

## The lead compensator

::: definition Lead and lag compensators {#def-lead-lag}
A first-order compensator

$$
C(s) = K_c\,\frac{Ts + 1}{\alpha Ts + 1}
$$ {#eq-compensator}

has a zero at $-1/T$ and a pole at $-1/(\alpha T)$, and DC gain $K_c$. It is a **lead compensator** if $0 < \alpha < 1$ (the zero is closer to the origin than the pole) and a **lag compensator** if $\alpha > 1$ (the pole is closer). In the lag case it is common to write $\alpha = \beta$.
:::

A lead compensator's phase, $\arctan\omega T - \arctan\alpha\omega T$, is positive at every frequency, rising from zero, peaking between the zero and the pole, and falling back to zero. Its magnitude rises from $K_c$ at low frequency to $K_c/\alpha$ at high frequency — a high-pass shelf.

::: theorem Maximum phase lead {#thm-max-lead}
The lead compensator [[#eq-compensator]] with $0 < \alpha < 1$ has its maximum phase lead $\phi_m$ at the geometric mean of the zero and pole frequencies,

$$
\omega_m = \frac{1}{T\sqrt\alpha},\qquad \sin\phi_m = \frac{1 - \alpha}{1 + \alpha},\qquad \alpha = \frac{1 - \sin\phi_m}{1 + \sin\phi_m},
$$ {#eq-max-lead}

and at that frequency its magnitude is $K_c/\sqrt\alpha$, i.e. $10\log_{10}(1/\alpha)\,\mathrm{dB}$ above the DC gain.
:::

::: proof
Let $\phi(\omega) = \arctan\omega T - \arctan\alpha\omega T$. Then $\tan\phi = \dfrac{\omega T - \alpha\omega T}{1 + \alpha\omega^2T^2} = \dfrac{(1 - \alpha)x}{1 + \alpha x^2}$ with $x = \omega T$. Differentiating with respect to $x$ and setting the result to zero gives $1 + \alpha x^2 - 2\alpha x^2 = 0$, so $x = 1/\sqrt\alpha$, which is $\omega_m$. Substituting, $\tan\phi_m = (1 - \alpha)/(2\sqrt\alpha)$; the hypotenuse of the right triangle with legs $1 - \alpha$ and $2\sqrt\alpha$ is $\sqrt{(1 - \alpha)^2 + 4\alpha} = 1 + \alpha$, so $\sin\phi_m = (1 - \alpha)/(1 + \alpha)$. Solving for $\alpha$ gives the inverse. Finally $\abs{C(j\omega_m)}^2 = K_c^2\dfrac{1 + 1/\alpha}{1 + \alpha} = K_c^2/\alpha$.
:::

| $\phi_m$ | $30^\circ$ | $40^\circ$ | $50^\circ$ | $60^\circ$ | $70^\circ$ |
|---|---|---|---|---|---|
| $\alpha$ | $0.333$ | $0.217$ | $0.132$ | $0.072$ | $0.031$ |
| pole/zero ratio $1/\alpha$ | $3.0$ | $4.6$ | $7.5$ | $13.9$ | $32.2$ |
| gain at $\omega_m$ | $4.8\,\mathrm{dB}$ | $6.6\,\mathrm{dB}$ | $8.8\,\mathrm{dB}$ | $11.4\,\mathrm{dB}$ | $15.1\,\mathrm{dB}$ |

The table shows the cost of large leads: beyond about $60^\circ$ the pole must be very far above the zero, and the high-frequency gain $1/\alpha$ amplifies sensor noise and excites unmodelled resonances. When more lead is needed, two cascaded lead sections are better than one extreme one.

::: widget plot
f: atan(10^x/sqrt(a))*180/pi - atan(10^x*sqrt(a))*180/pi; 10*log10((1 + 10^(2*x)/a)/(1 + 10^(2*x)*a))
x: -2, 2
y: -5, 90
sliders: a=0.1:0.02:0.5:0.01
hlines: 0
labels: \text{phase lead (degrees)}; \text{gain above }K_c\ (\mathrm{dB})
caption: Phase (blue) and magnitude (orange) of a lead compensator against $\log_{10}(\omega/\omega_m)$, for $\alpha = a$ on the slider. The phase peaks at $\omega_m$ (the centre of the axis) at $\arcsin\frac{1 - \alpha}{1 + \alpha}$; the magnitude there is halfway, in dB, between its low- and high-frequency levels. Make $a$ small and watch the extra lead shrink while the high-frequency gain keeps climbing.
:::

### Frequency-response design of a lead compensator

The aim is to place the compensator's peak phase at the *new* crossover frequency. Because the lead also raises the gain there by $1/\sqrt\alpha$, the crossover moves up, where the plant has more lag; that is why an extra few degrees are added to the required lead.

::: algorithm Lead design with the Bode plot {#alg-lead-bode}
1. Choose the DC gain $K_c$ to meet the steady-state error specification (for example $K_v$).
2. With this gain, find the uncompensated phase margin $\mathrm{PM}_0$.
3. Required lead: $\phi_m = \mathrm{PM}_{req} - \mathrm{PM}_0 + (5^\circ\text{ to }15^\circ)$. Compute $\alpha$ from [[#eq-max-lead]].
4. Find the frequency at which $\abs{K_cG(j\omega)} = \sqrt\alpha$ (i.e. $-10\log_{10}(1/\alpha)\,\mathrm{dB}$); make it both $\omega_m$ and the new crossover. Then $T = 1/(\omega_m\sqrt\alpha)$.
5. Check the phase margin, gain margin and step response; if the margin is short, increase the allowance in step 3 and repeat.
:::

::: example A lead compensator for the servo {#ex-lead-bode}
Design a lead compensator for the servo $G(s) = 250\,000/[s(s + 63)(s + 200)]$ to give $K_v = 100\,\mathrm{s^{-1}}$ and a phase margin of about $50^\circ$.
::: solution
*Step 1.* $K_v = \lim sK_cG(s) = K_c\times250\,000/12\,600$, so $K_c = 5.04$.

*Step 2.* With $K_c = 5.04$ alone the crossover is at $65.7\,\mathrm{rad/s}$ and $\mathrm{PM}_0 = 180^\circ - 90^\circ - \arctan(65.7/63) - \arctan(65.7/200) = 25.6^\circ$. (The closed loop would overshoot by $48\,\%$.)

*Step 3.* With a $5^\circ$ allowance we would need $29.4^\circ$ of lead. Trying the algorithm with increasing allowances shows the effect of the $200\,\mathrm{rad/s}$ pole: each extra degree of lead pushes the crossover up, where that pole steals phase.

| design lead $\phi_m$ | $30^\circ$ | $45^\circ$ | $55^\circ$ | $65^\circ$ |
|---|---|---|---|---|
| achieved PM | $40^\circ$ | $47^\circ$ | $50.5^\circ$ | $52.5^\circ$ |

We take $\phi_m = 55^\circ$, $\alpha = 0.10$.

*Step 4.* $\abs{K_cG(j\omega)} = \sqrt{0.1} = 0.316$ at $\omega = 123\,\mathrm{rad/s}$, so $\omega_m = 123\,\mathrm{rad/s}$ and $T = 1/(123\sqrt{0.1}) = 25.7\,\mathrm{ms}$: a zero at $39\,\mathrm{rad/s}$ and a pole at $390\,\mathrm{rad/s}$. With rounded values,

$$
C(s) = 5.04\,\frac{s/39 + 1}{s/390 + 1}.
$$

*Step 5.* The compensated loop crosses over at $122.6\,\mathrm{rad/s}$ with $\mathrm{PM} = 50.6^\circ$ and a gain margin of $12.8\,\mathrm{dB}$ (phase crossover at $303\,\mathrm{rad/s}$). The step response overshoots by $15.0\,\%$ with $t_p = 23\,\mathrm{ms}$, $t_r = 10\,\mathrm{ms}$ and $t_s = 55\,\mathrm{ms}$. Compared with the proportional design of [[control-systems/frequency-response-methods#ex-margins]], the loop is three and a half times faster and $2.5$ times more accurate on ramps. The overshoot is larger than a $50^\circ$ margin suggests, because a closed-loop pole at $-34$ sits near the compensator zero at $-39$ and contributes a small, slow tail — a typical side effect of lead design.
:::
:::

::: widget plot
f: 20*log10(1260000/(10^x*sqrt(10^(2*x) + 3969)*sqrt(10^(2*x) + 40000))); 20*log10(1260000/(10^x*sqrt(10^(2*x) + 3969)*sqrt(10^(2*x) + 40000))) + 20*log10(sqrt(1 + (10^x/39)^2)/sqrt(1 + (10^x/390)^2)); 90 - atan(10^x/63)*180/pi - atan(10^x/200)*180/pi; 90 - atan(10^x/63)*180/pi - atan(10^x/200)*180/pi + atan(10^x/39)*180/pi - atan(10^x/390)*180/pi
x: 0.5, 3
y: -40, 100
hlines: 0
labels: \lvert K_cG\rvert\ (\mathrm{dB}); \lvert CG\rvert\ (\mathrm{dB}); 180^\circ + \angle K_cG; 180^\circ + \angle CG
caption: Bode plots of the servo loop of [[#ex-lead-bode]] against $\log_{10}\omega$, before (blue magnitude, green phase) and after (orange magnitude, purple phase) adding the lead compensator; the phase curves are shifted up by $180^\circ$, so their height where the matching magnitude curve crosses $0\,\mathrm{dB}$ is the phase margin. The lead lifts the magnitude above $39\,\mathrm{rad/s}$, moving the crossover from $66$ to $123\,\mathrm{rad/s}$ ($\log_{10} = 1.82$ to $2.09$), and its phase bump arrives just in time to raise the margin there from $26^\circ$ to $51^\circ$. Hover to read values.
:::

### Root-locus design of a lead compensator

On the root locus, a lead compensator is a zero and a pole on the negative real axis with the zero nearer the origin. Its net angle at a point above the axis is positive — it supplies the angle needed to bend the locus through a chosen point.

::: algorithm Lead design with the root locus {#alg-lead-rl}
1. Choose the desired dominant closed-loop poles $s_d$ from the transient specifications ([[control-systems/time-response]]).
2. Compute the **angle deficiency** $\phi = -180^\circ - \angle G(s_d)$ (reduced to the range $0$–$90^\circ$; if it exceeds about $60^\circ$, use two lead sections).
3. Place the compensator zero, commonly directly below $s_d$ or on a stable plant pole to cancel it, then place the pole so that $\angle(s_d + z_c) - \angle(s_d + p_c) = \phi$.
4. Choose the gain from the magnitude condition $\abs{C(s_d)G(s_d)} = 1$.
5. Check the other closed-loop poles, the error constant and the step response.
:::

::: example Placing the servo's poles at −60 ± 60j {#ex-lead-rl}
Design a lead compensator $C(s) = K\,(s + z_c)/(s + p_c)$ for the servo so that its dominant closed-loop poles are at $s_d = -60 \pm 60j$ ($\zeta = 0.707$, $t_s \approx 67\,\mathrm{ms}$).
::: solution
*Angle deficiency.* At $s_d = -60 + 60j$ the angles of the vectors from the plant poles are $135.0^\circ$ (from $0$), $87.1^\circ$ (from $-63$: the vector $3 + 60j$, angle $\arctan(60/3)$) and $23.2^\circ$ (from $-200$). So $\angle G(s_d) = -245.3^\circ$ and the compensator must supply $\phi = 65.3^\circ$.

*Zero and pole.* Cancelling the plant pole with the zero, $z_c = 63$, makes the zero's angle $87.1^\circ$, so the pole's angle must be $87.1^\circ - 65.3^\circ = 21.8^\circ$. The pole lies on the real axis at a horizontal distance $60/\tan21.8^\circ = 150$ to the left of $s_d$: $p_c = 210$.

*Gain.* After the cancellation the loop is $250\,000K/[s(s + 200)(s + 210)]$, and the magnitude condition gives

$$
250\,000K = \abs{s_d}\,\abs{s_d + 200}\,\abs{s_d + 210} = 84.85\times152.3\times161.6 = 2.088\times10^6,\qquad K = 8.35 .
$$

*Check.* The closed-loop poles are $-60 \pm 60j$, $-290$ (the sum of the closed-loop poles equals that of the open-loop poles, $-473$) and $-63$, cancelled by the zero. The step response overshoots by $4.1\,\%$ and settles in $74\,\mathrm{ms}$; the Bode margins are $\mathrm{PM} = 64^\circ$ and $\mathrm{GM} = 18\,\mathrm{dB}$. But $K_v = 2.088\times10^6/(200\times210) = 49.7\,\mathrm{s^{-1}}$, half the target of [[#ex-lead-bode]]: placing poles fixes the transient, and the error constant comes out as it comes. A lag section can raise it afterwards.
:::
:::

::: warning Cancelling plant poles
Cancelling a *stable, well-known* plant pole with a compensator zero, as above, is legitimate and common (the PI current loop of [[control-systems/pid-control#prop-current-loop]] does the same). The cancelled mode is still there: it is excited by disturbances entering at the plant input, and here a load torque would excite a response with the motor's own time constant of $16\,\mathrm{ms}$. Never cancel a pole in the right half-plane or near the imaginary axis, and remember that the cancellation is only as exact as the plant model.
:::

## The lag compensator

A lag compensator ($\alpha = \beta > 1$) has its pole nearer the origin than its zero. For lag design it is more convenient to write it in pole–zero form with unity high-frequency gain,

$$
C_{lag}(s) = \frac{s + z}{s + p},\qquad z = \beta p,
$$

whose DC gain is $z/p = \beta$ and its high-frequency gain is $1$. It multiplies the low-frequency loop gain, and therefore $K_p$, $K_v$ or $K_a$, by $\beta$, while leaving the loop almost untouched above a few times $z$.

::: proposition Phase cost of a lag compensator {#prop-lag-cost}
The lag compensator $(s + z)/(s + p)$ with $z = \beta p$ has phase $-\bigl[\arctan(\omega/p) - \arctan(\omega/z)\bigr]$. At a frequency $\omega \ge 10z$ the lag is less than

$$
\arctan\frac{\omega}{p} - \arctan\frac{\omega}{z} < \frac{z - p}{\omega} \le \frac{1}{10}\left(1 - \frac{1}{\beta}\right)\ \mathrm{rad} < 5.7^\circ .
$$
:::

::: proof
Using $\arctan u = 90^\circ - \arctan(1/u)$ for $u > 0$, the lag is $\arctan(\omega/p) - \arctan(\omega/z) = \arctan(z/\omega) - \arctan(p/\omega)$. Since $\arctan$ has slope at most $1$, this is at most $(z - p)/\omega$ (in radians). With $\omega \ge 10z$, $(z - p)/\omega \le (z - p)/(10z) = (1 - 1/\beta)/10$.
:::

So the rule is: place the lag zero a decade below the crossover frequency, and allow about $5^\circ$ of phase margin for its residual lag.

::: algorithm Lag design with the Bode plot {#alg-lag}
1. Choose a gain (or a lead compensator) that meets the transient specification with a phase margin about $5^\circ$ above the requirement. Note the crossover $\omega_c$ and the error constant $K_0$ obtained.
2. Required low-frequency boost: $\beta = K_{req}/K_0$.
3. Place the zero at $z = \omega_c/10$ and the pole at $p = z/\beta$.
4. Check the margins and simulate: the slow closed-loop pole near the lag zero adds a slowly decaying tail.
:::

::: example Raising the servo's velocity constant {#ex-lag}
Starting from a proportional design with $\mathrm{PM} = 55^\circ$, add a lag compensator to the servo to obtain $K_v = 100\,\mathrm{s^{-1}}$. Compare the step response with that of the proportional loop.
::: solution
*Step 1.* For $\mathrm{PM} = 55^\circ$ we need $\arctan(\omega_c/63) + \arctan(\omega_c/200) = 35^\circ$, giving $\omega_c = 31.0\,\mathrm{rad/s}$ and, from $\abs{L} = 1$, $K_a = 1.76$. Then $K_0 = K_v = 1.76\times250\,000/12\,600 = 34.9\,\mathrm{s^{-1}}$.

*Step 2.* $\beta = 100/34.9 = 2.86$.

*Step 3.* $z = 3.10\,\mathrm{rad/s}$, $p = 3.10/2.86 = 1.08\,\mathrm{rad/s}$, so

$$
C(s) = 1.76\,\frac{s + 3.10}{s + 1.08}.
$$

*Step 4.* The compensated loop crosses over at $31.1\,\mathrm{rad/s}$ with $\mathrm{PM} = 51.2^\circ$ and $\mathrm{GM} = 17.2\,\mathrm{dB}$, and $K_v = 100\,\mathrm{s^{-1}}$ exactly. The closed-loop poles are $-214$, $-23.6 \pm 37.2j$ (almost those of the proportional loop) and a slow real pole at $-3.29$, just to the left of the lag zero. The step response rises as before but overshoots by $19.3\,\%$ instead of $12.8\,\%$, and creeps the last few per cent with time constant $1/3.29 = 0.30\,\mathrm{s}$, so the $2\,\%$ settling time grows from $0.13\,\mathrm{s}$ to $0.37\,\mathrm{s}$. The ramp error is cut by a factor $2.86$. Lag compensation trades a slow tail for accuracy; moving the zero further below crossover shrinks the tail's amplitude but lengthens it.
:::
:::

::: quiz
A loop has $\mathrm{PM} = 50^\circ$ at $\omega_c = 100\,\mathrm{rad/s}$ and $K_v = 20\,\mathrm{s^{-1}}$. You want $K_v = 200\,\mathrm{s^{-1}}$ without changing the transient much. Which compensator?
- [ ] A lead compensator with $\alpha = 0.1$ centred at $100\,\mathrm{rad/s}$
- [x] A lag compensator with zero near $10\,\mathrm{rad/s}$ and pole near $1\,\mathrm{rad/s}$
- [ ] A lag compensator with zero at $100\,\mathrm{rad/s}$ and pole at $10\,\mathrm{rad/s}$
- [ ] A tenfold increase of the proportional gain
::: solution
The low-frequency gain must rise by $\beta = 10$ while the loop near $100\,\mathrm{rad/s}$ stays the same: a lag with its zero a decade below crossover and its pole a further decade below. Putting the lag at crossover would cost tens of degrees of phase; a tenfold gain increase would move the crossover up by a factor of about $3$ (on a $-20$ to $-40\,\mathrm{dB/dec}$ slope) and destroy the margin; a lead raises the high-frequency gain, not the low-frequency gain.
:::
:::

### Lead–lag compensation

The two compensators act in different frequency ranges, so they can be designed one after the other and cascaded: first a lead to set the crossover and phase margin, then a lag, a decade or more below the new crossover, to raise the low-frequency gain. The resulting **lead–lag compensator** has two zeros and two poles. A PID controller with a filtered derivative is a lead–lag compensator whose lag pole sits at the origin.

## Op-amp realisations

All these compensators are first-order sections, realised by an inverting op-amp stage ([[control-systems/modelling-dynamic-systems#prop-opamp]]) with RC networks. With $Z_1 = R_1\parallel C_1$ and $Z_2 = R_2\parallel C_2$,

$$
\frac{V_o}{V_i} = -\frac{Z_2}{Z_1} = -\frac{R_2}{R_1}\cdot\frac{R_1C_1s + 1}{R_2C_2s + 1},
$$ {#eq-opamp-lead}

which is [[#eq-compensator]] with $K_c = R_2/R_1$, $T = R_1C_1$ and $\alpha = R_2C_2/(R_1C_1)$: a lead if $R_1C_1 > R_2C_2$, a lag if $R_1C_1 < R_2C_2$. A second inverting stage restores the sign, or the inversion is absorbed by feeding the error into the stage's inverting input. Passive RC networks can also realise lead and lag sections, but their attenuation must be made up with gain and they are loaded by what follows them.

::: example Building the servo's lead compensator {#ex-lead-circuit}
Realise $C(s) = 5.04\,(s/39 + 1)/(s/390 + 1)$ of [[#ex-lead-bode]] with the circuit of [[#eq-opamp-lead]], using $R_1 = 100\,\mathrm{k\Omega}$ and standard component values.
::: solution
$R_2 = 5.04R_1 = 504\,\mathrm{k\Omega}$: use $510\,\mathrm{k\Omega}$ (E24), giving $K_c = 5.1$. $R_1C_1 = 1/39\,\mathrm{s} = 25.6\,\mathrm{ms}$ gives $C_1 = 256\,\mathrm{nF}$: use $270\,\mathrm{nF}$ (E12), putting the zero at $37\,\mathrm{rad/s}$. $R_2C_2 = 1/390\,\mathrm{s} = 2.56\,\mathrm{ms}$ gives $C_2 = 2.56\times10^{-3}/5.1\times10^5 = 5.0\,\mathrm{nF}$: use $5.1\,\mathrm{nF}$ (E24), putting the pole at $384\,\mathrm{rad/s}$. These changes of a few per cent alter the phase margin by under a degree. Use film (C0G or polypropylene) capacitors — the high-$\kappa$ ceramic types lose much of their capacitance with applied voltage and temperature — and check that the op-amp's own bandwidth is far above the compensator's pole.
:::
:::

## Compensating a switching converter

The voltage loop of a buck converter faces the plant of [[control-systems/modelling-dynamic-systems#ex-buck]]: a DC gain $V_{in}$, a lightly damped double pole at $f_0 = 1/(2\pi\sqrt{LC})$, and above it a magnitude falling at $40\,\mathrm{dB/decade}$ with a phase approaching $-180^\circ$. Integral action is needed for an accurate DC output, but an integrator adds another $-90^\circ$, and [[control-systems/root-locus#ex-buck-locus]] showed that integral control alone allows only a very slow loop. Converter designers use three standard error-amplifier networks:

- **Type I**: a pure integrator, $\omega_I/s$. Only for very slow loops.
- **Type II**: an integrator with one zero and one pole, $\dfrac{\omega_I}{s}\cdot\dfrac{1 + s/\omega_z}{1 + s/\omega_p}$ — a PI controller with a filter, offering up to nearly $90^\circ$ of boost relative to the integrator. Enough for current-mode control, where the plant is effectively first order, or when a large capacitor ESR zero supplies phase.
- **Type III**: an integrator with two zeros and two poles, $\dfrac{\omega_I}{s}\cdot\dfrac{(1 + s/\omega_{z1})(1 + s/\omega_{z2})}{(1 + s/\omega_{p1})(1 + s/\omega_{p2})}$ — a PID controller with a filtered derivative, or an integrator with two lead sections, offering up to nearly $180^\circ$ of boost. Needed for voltage-mode control of a converter with low-ESR ceramic capacitors.

::: example A Type III compensator for the buck converter {#ex-type3}
Design a Type III compensator for the buck converter of [[control-systems/modelling-dynamic-systems#ex-buck]] ($V_{in} = 12\,\mathrm{V}$, $f_0 = 5.03\,\mathrm{kHz}$, $Q = 3.16$, switching at $500\,\mathrm{kHz}$), with a crossover at $f_c = 50\,\mathrm{kHz}$, the two zeros at $5\,\mathrm{kHz}$ (at the resonance) and the two poles at half the switching frequency. Find $\omega_I$ and the phase and gain margins.
::: solution
At $f_c = 50\,\mathrm{kHz}$, with $f_c/f_0 = 9.935$, the plant has magnitude $12/\abs{1 - 98.70 + j\,9.935/3.162} = 12/97.75 = 0.1228$ and phase $-178.2^\circ$. The compensator's phase there is

$$
-90^\circ + 2\arctan\frac{50}{5} - 2\arctan\frac{50}{250} = -90^\circ + 168.6^\circ - 22.6^\circ = 56.0^\circ,
$$

so $\angle L = -122.2^\circ$ and $\mathrm{PM} = 57.8^\circ$. The compensator magnitude at $f_c$ must be $1/0.1228 = 8.15$; its zeros contribute $\abs{1 + j10}^2 = 101$, its poles $1/\abs{1 + j0.2}^2 = 0.962$, and the integrator $\omega_I/\omega_c$ with $\omega_c = 3.142\times10^5\,\mathrm{rad/s}$, so

$$
\omega_I = \frac{8.15\,\omega_c}{101\times0.962} = \frac{8.15\times3.142\times10^5}{97.1} = 2.64\times10^4\,\mathrm{s^{-1}}.
$$

The loop phase falls to $-180^\circ$ only at about $242\,\mathrm{kHz}$, where $\abs{L}$ is $19\,\mathrm{dB}$ below unity: $\mathrm{GM} \approx 19\,\mathrm{dB}$. In a real design one also accounts for the modulator delay (about half a switching period, costing $9^\circ$ at $50\,\mathrm{kHz}$), the ESR zero, and the change of $Q$ with load; with these, crossovers of $f_s/10$ to $f_s/5$ are typical.
:::
:::

::: application Why the 741 is a compensator too
Every frequency-compensated op-amp is a lead–lag design in disguise. The Miller capacitor of [[electronics-2/stability-compensation]] creates a dominant pole — a lag compensator with its pole at a few hertz and no zero — so that the loop gain crosses over on a $-20\,\mathrm{dB/dec}$ slope before the second pole. And the small capacitor placed across the feedback resistor of a transimpedance amplifier, to cancel the photodiode capacitance, is a lead compensator in the feedback path.
:::

::: history
Lead and lag networks were the stock in trade of the servomechanism engineers of the 1940s. The wartime *Theory of Servomechanisms* (James, Nichols and Phillips, 1947) and Gordon Brown and Donald Campbell's *Principles of Servomechanisms* (1948) presented frequency-response design with lead and lag compensators, building on Bode's work on feedback amplifiers. Evans's root-locus papers of 1948–1950 gave the $s$-plane design method. The Type II and Type III terminology for converter compensators was popularised in the 1980s by H. Dean Venable's "K factor" design method for switching power supplies.
:::

## Where this leads

Lead and lag design shape a loop with a few poles and zeros chosen by hand. The state-space methods of [[control-systems/state-space-models]] and [[control-systems/state-feedback]] place *all* the closed-loop poles at once; an observer-based state-feedback controller turns out to be a compensator whose order equals the plant's. To run any of these compensators on a microcontroller they must be discretised, which is the subject of [[control-systems/digital-control]]; the converter loops are developed further in [[power-electronics/converter-control]].

::: summary
- A compensator $K_c(Ts + 1)/(\alpha Ts + 1)$ is a lead for $\alpha < 1$ and a lag for $\alpha > 1$.
- A lead gives at most $\phi_m = \arcsin\frac{1 - \alpha}{1 + \alpha}$ at $\omega_m = 1/(T\sqrt\alpha)$, with gain $1/\sqrt\alpha$ there; beyond about $60^\circ$ use two sections.
- Bode lead design sets $K_c$ for the error constant, then centres the lead on the new crossover where $\abs{K_cG} = \sqrt\alpha$; plant poles near crossover give diminishing returns.
- Root-locus lead design supplies the angle deficiency at the desired poles; the gain follows from the magnitude condition, and the error constant must be checked.
- A lag raises the low-frequency gain by $\beta$; with its zero a decade below crossover it costs about $5^\circ$, but adds a slow closed-loop pole and a settling tail.
- Op-amp stages with $Z_1 = R_1\parallel C_1$ and $Z_2 = R_2\parallel C_2$ realise lead or lag sections; PI, PID and Type II/III networks are special cases.
- Voltage-mode buck converters need a Type III compensator: an integrator plus two zeros near the LC resonance and two poles near half the switching frequency.
:::

## Exercises

::: exercise Maximum lead {level=1 check="asin((1 - 0.2)/(1 + 0.2))*180/pi"}
A lead compensator has its zero at $100\,\mathrm{rad/s}$ and its pole at $500\,\mathrm{rad/s}$. Find its maximum phase lead in degrees and the frequency at which it occurs.
::: solution
$\alpha = 100/500 = 0.2$, so $\sin\phi_m = 0.8/1.2 = 0.667$ and $\phi_m = 41.8^\circ$, at $\omega_m = \sqrt{100\times500} = 224\,\mathrm{rad/s}$, with $7.0\,\mathrm{dB}$ of gain above the DC level.
:::
:::

::: exercise Choosing α {level=1 check="(1 - sin(45*pi/180))/(1 + sin(45*pi/180))"}
What value of $\alpha$ gives a maximum phase lead of $45^\circ$?
::: solution
$\alpha = (1 - \sin45^\circ)/(1 + \sin45^\circ) = 0.2929/1.7071 = 0.172$; the pole is $5.83$ times the zero frequency.
:::
:::

::: exercise A lag boost {level=1 check="4"}
A lag compensator $(s + 0.8)/(s + 0.2)$ is added to a type-1 loop with $K_v = 25\,\mathrm{s^{-1}}$. By what factor does it multiply $K_v$, and what is the new ramp error for a unit ramp?
::: solution
The DC gain of the lag is $0.8/0.2 = 4$, so $K_v$ becomes $100\,\mathrm{s^{-1}}$ and the ramp error falls from $0.04$ to $0.01$.
:::
:::

::: exercise Lead from the root locus {level=2}
For $G(s) = 1/[s(s + 2)]$, design a lead compensator $K(s + z)/(s + p)$ with $z = 2$ (cancelling the plant pole) that places the dominant poles at $-4 \pm 4j$. Find $p$ and $K$.
::: solution
After cancellation the loop is $K/[s(s + p)]$, whose closed-loop poles satisfy $s^2 + ps + K = 0$. For $-4 \pm 4j$: $p = 8$ and $K = 32$. Check with the angle condition: at $-4 + 4j$ the vectors from $0$ and $-8$ have angles $135^\circ$ and $45^\circ$, totalling $180^\circ$.
:::
:::

::: exercise Lag design on a first-order loop {level=2}
A type-0 loop $L(s) = 9/(0.1s + 1)$ has a steady-state step error of $10\,\%$. Design a lag compensator to reduce it to $1\,\%$ without changing the crossover appreciably.
::: solution
$K_p = 9$ gives $1/(1 + 9) = 0.1$. For $1\,\%$ we need $K_p = 99$, so $\beta = 11$. The crossover is where $9/\sqrt{1 + 0.01\omega^2} = 1$: $\omega_c = 89.4\,\mathrm{rad/s}$. Put the zero a decade below, $z = 8.9\,\mathrm{rad/s}$, and the pole at $p = z/11 = 0.81\,\mathrm{rad/s}$: $C(s) = (s + 8.9)/(s + 0.81)$, DC gain $11$. The phase margin falls from $96^\circ$ to about $90^\circ$; the response gains a slow component near $-8.9\,\mathrm{s^{-1}}$ of small amplitude.
:::
:::

::: exercise Op-amp lag values {level=2}
Realise the lag $C(s) = 11(s/8.9 + 1)/(s/0.81 + 1)$ of the previous exercise with the circuit of [[#eq-opamp-lead]] and $R_1 = 10\,\mathrm{k\Omega}$.
::: solution
$R_2 = 11R_1 = 110\,\mathrm{k\Omega}$. $R_1C_1 = 1/8.9 = 0.112\,\mathrm{s}$ gives $C_1 = 11.2\,\mathrm{\mu F}$ and $R_2C_2 = 1/0.81 = 1.23\,\mathrm{s}$ gives $C_2 = 11.2\,\mathrm{\mu F}$ — the two capacitors are equal, since $\alpha = R_2C_2/(R_1C_1) = 11 = R_2/R_1$. Such large capacitors are inconvenient; scaling the resistors up by $10$ ($100\,\mathrm{k\Omega}$ and $1.1\,\mathrm{M\Omega}$) brings them to $1.12\,\mathrm{\mu F}$, at the cost of more resistor noise and sensitivity to op-amp bias current.
:::
:::

::: exercise Two lead sections {level=2}
A loop needs $80^\circ$ of phase lead at its crossover. Compare a single lead section with two identical sections of $40^\circ$ each, in terms of the ratio of high-frequency to low-frequency gain.
::: solution
One section: $\alpha = (1 - \sin80^\circ)/(1 + \sin80^\circ) = 0.0077$, a gain ratio of $1/\alpha = 130$ ($42\,\mathrm{dB}$). Two sections: each needs $\alpha = 0.217$, a ratio of $4.6$, so $4.6^2 = 21.2$ ($26.5\,\mathrm{dB}$) in total. The cascade gives the same lead with six times less high-frequency gain, and hence much less noise amplification.
:::
:::

::: exercise A Type II compensator {level=3}
A current-mode-controlled buck converter has a control-to-output transfer function approximately $G(s) = 2/(1 + sRC)$ with $R = 1\,\Omega$ and $C = 100\,\mathrm{\mu F}$, plus a high-frequency pole at $250\,\mathrm{kHz}$ from the current loop. (a) Design a Type II compensator $\frac{\omega_I}{s}\cdot\frac{1 + s/\omega_z}{1 + s/\omega_p}$ for a crossover at $f_c = 30\,\mathrm{kHz}$, with $\omega_z$ cancelling the output pole and $\omega_p$ at $250\,\mathrm{kHz}$. (b) Find the phase margin.
::: solution
(a) The output pole is at $1/(RC) = 10^4\,\mathrm{rad/s}$ ($1.59\,\mathrm{kHz}$); set $\omega_z = 10^4\,\mathrm{rad/s}$. The loop is then $L(s) = 2\omega_I/[s(1 + s/\omega_p)^2]$ — the compensator pole and the current-loop pole, both at $\omega_p = 2\pi\times250\,\mathrm{kHz} = 1.57\times10^6\,\mathrm{rad/s}$. At $\omega_c = 2\pi\times30\,\mathrm{kHz} = 1.885\times10^5\,\mathrm{rad/s}$: $\abs{L} = 2\omega_I/[\omega_c(1 + 0.12^2)] = 1$ gives $\omega_I = 1.885\times10^5\times1.0144/2 = 9.56\times10^4\,\mathrm{s^{-1}}$.

(b) $\mathrm{PM} = 180^\circ - 90^\circ - 2\arctan(0.12) = 90^\circ - 13.7^\circ = 76.3^\circ$. Current-mode control has made the plant first order, so a Type II network suffices.
:::
:::

::: exercise The geometry of the lead pole {level=3}
(a) Show that if the lead zero of a root-locus design is placed directly below the desired pole $s_d = -\sigma + j\omega_d$, at $-\sigma$, the lead pole must be at $-p_c$ with $p_c = \sigma + \omega_d\tan\phi$, where $\phi$ is the angle deficiency. (b) Apply this to the servo of [[#ex-lead-rl]] and find $K$ and $K_v$. Compare with the design that cancels the plant pole.
::: solution
(a) A zero at $-\sigma$ contributes exactly $90^\circ$ at $s_d$. The pole must then contribute $90^\circ - \phi$, so the vector from the pole to $s_d$ makes angle $90^\circ - \phi$ with the real axis: the pole lies a horizontal distance $\omega_d/\tan(90^\circ - \phi) = \omega_d\tan\phi$ to the left of $s_d$, i.e. $p_c = \sigma + \omega_d\tan\phi$.

(b) With $\sigma = \omega_d = 60$ and $\phi = 65.3^\circ$: $p_c = 60 + 60\tan65.3^\circ = 60 + 130.7 = 190.7$, with the zero at $z_c = 60$. The gain is $250\,000K = \abs{s_d}\abs{s_d + 63}\abs{s_d + 200}\abs{s_d + 190.7}/\abs{s_d + 60} = 84.85\times60.07\times152.3\times143.8/60 = 1.86\times10^6$, so $K = 7.44$ and $K_v = 1.86\times10^6\times60/(12\,600\times190.7) = 46.5\,\mathrm{s^{-1}}$ — slightly lower than with cancellation. The plant pole at $-63$ is no longer cancelled: the closed-loop poles are $-60 \pm 60j$, $-278$ and $-55.8$, the last close to the zero at $-60$, so it has a small residue and adds only a small, slow tail.
:::
:::
