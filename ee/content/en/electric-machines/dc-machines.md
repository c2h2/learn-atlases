The first practical electric motors and generators were DC machines, and for a century they were the only way to get precise, wide-range speed control: they drove rolling mills, paper machines, lifts, trams and locomotives, and the starter motor in every car is still one. Today inverter-fed AC machines have taken over most of those jobs, but the DC machine remains the clearest of all machines to understand, and it is the model that modern AC drives imitate: field-oriented control of an induction motor is, quite literally, a way of making it behave like a separately excited DC motor. Small permanent-magnet DC motors are also everywhere, in toys, windscreen wipers, cordless tools and servo mechanisms.

This chapter explains how a DC machine works and how to calculate its performance. We look at its construction and at the **commutator**, the mechanical switch that keeps the torque unidirectional. From the motional emf and Lorentz force of [[electric-machines/energy-conversion]] we derive the two machine equations, $E_a = K_a\Phi\omega_m$ and $T = K_a\Phi I_a$, and build the equivalent circuit. With it we analyse generators (including how a shunt generator excites itself), the speed–torque characteristics of shunt, separately excited and series motors, starting, and the two classical methods of speed control: armature voltage and field weakening.

## Construction and commutation

A DC machine has a stationary **field** system and a rotating **armature**. The stator carries an even number $P$ of salient **field poles**, each wound with a field coil carrying direct current (or replaced by permanent magnets). The poles produce a flux $\Phi$ per pole that crosses the air gap into the armature, a laminated iron cylinder with slots on its surface holding the **armature winding**. The armature coils are connected to the segments of the **commutator**, a cylinder of copper bars insulated from one another, and current reaches it through stationary carbon **brushes** pressing on its surface.

As the armature turns, each conductor passes alternately under north and south poles, so the emf induced in it alternates. The commutator reverses the connection of each coil to the external circuit at the instant the coil passes through the neutral zone between poles, where its emf is zero. Seen from the brushes, every conductor under a north pole always carries current in one direction, and every conductor under a south pole in the other. The commutator is therefore a **mechanical rectifier** when the machine generates, and a mechanical **inverter** when it motors: it keeps the armature current distribution fixed in space, at right angles to the field, whatever the rotor position. In the language of [[electric-machines/energy-conversion#thm-average-torque]], the stator field is DC, so the rotor currents must alternate at exactly the rotation frequency, and the commutator arranges that automatically.

The armature conductors are connected into $a$ **parallel paths** between the brushes. In a **lap** winding $a = P$; in a **wave** winding $a = 2$, whatever the number of poles. Lap windings suit low-voltage, high-current machines and wave windings high-voltage, low-current ones.

## The two machine equations

::: theorem Generated voltage {#thm-emf}
The emf between the brushes of a DC machine with $Z$ armature conductors in $a$ parallel paths, $P$ poles and flux $\Phi$ per pole, rotating at $\omega_m$ rad/s, is

$$
E_a = K_a\Phi\omega_m,\qquad K_a = \frac{ZP}{2\pi a}.
$$ {#eq-dc-emf}

In terms of speed $n$ in r/min, $E_a = \dfrac{P\Phi Zn}{60a}$.
:::

::: proof
Let the armature have radius $r$ and active length $l$. A conductor moving at peripheral speed $u = r\omega_m$ through a radial flux density $B(\theta)$ has emf $B(\theta)lr\omega_m$ by [[electric-machines/energy-conversion#thm-lorentz]]. The commutator ensures that, between the brushes, the conductors of one path all lie under poles of alternating polarity in the same sense, so their emfs add. Averaging over the pole pitch, the mean flux density under a pole is $\bar B = \Phi/(\text{pole area}) = \Phi/(2\pi rl/P)$. Each path has $Z/a$ conductors in series, so

$$
E_a = \frac Za\,\bar Blr\omega_m = \frac Za\,\frac{P\Phi}{2\pi rl}\,lr\omega_m = \frac{ZP}{2\pi a}\Phi\omega_m.
$$

With $\omega_m = 2\pi n/60$ this becomes $P\Phi Zn/(60a)$. Note that the result does not depend on the shape of $B(\theta)$, only on the total flux per pole.
:::

::: theorem Developed torque {#thm-torque}
With armature current $I_a$ flowing through the brushes, the electromagnetic torque is

$$
T_{\text{dev}} = K_a\Phi I_a,
$$ {#eq-dc-torque}

with the same constant $K_a$, and the developed power is $E_aI_a = T_{\text{dev}}\omega_m$.
:::

::: proof
Each conductor carries $I_a/a$. By $f = Bli$, a conductor at radius $r$ under flux density $B(\theta)$ feels a tangential force $B(\theta)l(I_a/a)$ and contributes torque $rB(\theta)lI_a/a$. All conductors push in the same rotational sense because the commutator reverses the current exactly as the conductor passes into a pole of opposite polarity. Summing over the $Z$ conductors, uniformly spread around the periphery, replaces $B(\theta)$ by its mean $\bar B = P\Phi/(2\pi rl)$: $T = Zr\bar BlI_a/a = ZP\Phi I_a/(2\pi a)$. Then $T\omega_m = K_a\Phi I_a\omega_m = E_aI_a$, the power balance of [[electric-machines/energy-conversion#eq-ei-fu]] for the whole armature.
:::

The two equations share a constant, and the power identity $E_aI_a = T\omega_m$ is how one checks a calculation. In SI units $K_a\Phi$ in V·s/rad is numerically equal to $K_a\Phi$ in N·m/A; a permanent-magnet motor's datasheet lists this one number as both the back-emf constant and the torque constant.

::: warning Revolutions per minute versus radians per second
Datasheets give speeds in r/min, but $E_a = K_a\Phi\omega_m$ and $T\omega_m = P$ need $\omega_m$ in rad/s: $\omega_m = 2\pi n/60$, so $1500\,\mathrm{r/min}$ is $157.1\,\mathrm{rad/s}$. If you use the ratio form, $E_{a2}/E_{a1} = (\Phi_2n_2)/(\Phi_1n_1)$, the units cancel and either is fine; mixing them in one equation gives errors of a factor of $9.55$.
:::

::: example Emf of a four-pole generator {#ex-emf}
A four-pole, lap-wound DC generator has $480$ armature conductors and a flux of $20\,\mathrm{mWb}$ per pole. Find the generated emf at $1200\,\mathrm{r/min}$, and the torque required to drive it when it delivers an armature current of $60\,\mathrm A$.
::: solution
Lap winding: $a = P = 4$, so $K_a = 480\times4/(2\pi\times4) = 76.4$. At $\omega_m = 2\pi\times1200/60 = 125.7\,\mathrm{rad/s}$,

$$
E_a = 76.4\times0.02\times125.7 = 192\,\mathrm V,
$$

or, with the r/min form, $4\times0.02\times480\times1200/(60\times4) = 192\,\mathrm V$. The electromagnetic torque at $60\,\mathrm A$ is $K_a\Phi I_a = 76.4\times0.02\times60 = 91.7\,\mathrm{N\,m}$, and the prime mover must supply this plus friction and windage. Check: $E_aI_a = 11.52\,\mathrm{kW} = 91.7\times125.7$.
:::
:::

## The equivalent circuit and field connections

The armature circuit is the generated emf $E_a$ in series with the **armature resistance** $R_a$ (winding, brushes, interpoles) and a small brush drop, usually ignored or included in $R_a$. The field winding is a separate circuit of resistance $R_f$. The flux $\Phi$ is a function of the field current $I_f$, given by the machine's **magnetisation curve**, which is measured as the **open-circuit characteristic** (OCC): $E_a$ against $I_f$ at a fixed speed, with no armature current. Because $E_a\propto\Phi\omega_m$, an OCC measured at speed $n_0$ gives the emf at any other speed by scaling, $E_a(n) = E_a(n_0)\,n/n_0$.

::: definition Field connections {#def-connections}
- **Separately excited**: the field is supplied from an independent source.
- **Shunt**: the field winding (many turns of fine wire) is connected in parallel with the armature, so $I_f = V_t/R_f$ and the line current is $I_L = I_a + I_f$ (motor) or $I_a = I_L + I_f$ (generator).
- **Series**: the field winding (few turns of heavy wire, resistance $R_s$) is in series with the armature, so $I_f = I_a$.
- **Compound**: both a shunt and a series field; **cumulative** if their mmfs add, **differential** if they oppose.
- **Permanent magnet**: the field is produced by magnets; $\Phi$ is constant.

In each case Kirchhoff's voltage law for the armature, in **motor** convention (current entering the positive terminal), reads $V_t = E_a + I_a(R_a + R_s)$; in **generator** convention $V_t = E_a - I_a(R_a + R_s)$, with $R_s = 0$ if there is no series field.
:::

::: remark Armature reaction and commutation
The armature current produces its own mmf, directed along the brush axis, at right angles to the field: **armature reaction**. It distorts the gap flux, strengthening it under one half of each pole and weakening it under the other; with saturation the net flux per pole falls, by a few percent at full load. It also shifts the magnetic neutral zone, so that coils are commutated while they still have emf, causing sparking at the brushes. Moreover, reversing the current in a coil within the brief commutation interval induces a **reactance voltage** $L\,\mathrm di/\mathrm dt$ in it. Medium and large machines therefore have narrow **interpoles** (commutating poles) between the main poles, in series with the armature, which induce a voltage that cancels the reactance voltage; machines with severe duty also have **compensating windings** in the pole faces that cancel armature reaction. In the calculations below we neglect armature reaction unless stated.
:::

## DC generators

A **separately excited generator** driven at constant speed has a terminal voltage that falls with load by the drop $I_aR_a$ (and by armature reaction). A **shunt generator** needs no external supply: it **self-excites**. Iron retains a small residual flux, so even with zero field current the rotating armature produces a few volts. These drive a small current through the shunt field; if the field is connected the right way round, its mmf reinforces the residual flux, the emf rises, the field current rises further, and the voltage builds up until it is limited by saturation.

At no load ($I_a = I_f$, negligible drop in $R_a$), the operating point satisfies both the OCC, $E_a = E(I_f)$, and the field circuit, $E_a = R_fI_f$, a straight line through the origin, the **field-resistance line**. The voltage builds up to their intersection.

::: theorem Self-excitation condition {#thm-self-excitation}
A shunt generator at a given speed builds up voltage only if (i) there is residual magnetism, (ii) the field is connected so that its mmf aids the residual flux, and (iii) the total field-circuit resistance is less than the **critical field resistance** $R_{\text{crit}}$, the slope of the linear part of the OCC near the origin. Because the OCC scales with speed, $R_{\text{crit}}$ is proportional to speed, and for a given $R_f$ there is a **critical speed** below which the machine will not excite.
:::

::: proof
During build-up the field circuit obeys $L_f\,\mathrm dI_f/\mathrm dt = E(I_f) - R_fI_f$, with $L_f$ the field inductance. The current grows as long as $E(I_f) > R_fI_f$, that is, while the OCC lies above the field-resistance line. Near the origin $E(I_f) \approx E_r + kI_f$ with residual voltage $E_r > 0$ and slope $k$. If $R_f < k$ the OCC stays above the line until saturation bends it down, and the voltage builds up to the intersection. If $R_f > k$ the line crosses the OCC at a small $I_f$ near $E_r/(R_f - k)$ and build-up stops at a few volts. If the field is reversed, its mmf opposes the residual flux and $I_f$ cancels $E_r$ instead of reinforcing it. Since $E(I_f)$ at speed $n$ is $(n/n_0)$ times its value at $n_0$, the slope $k$, and hence $R_{\text{crit}}$, is proportional to speed.
:::

::: widget plot
f: 10 + 250*x/(0.6 + x); Rf*x
x: 0, 2.5
y: 0, 300
sliders: Rf=200:50:500:5
labels: E_a(I_f)\ \text{(OCC)}; R_fI_f
caption: Voltage build-up of a shunt generator. The OCC (emf in volts against field current in amperes, at rated speed) has a residual voltage of $10\,\mathrm V$ and saturates towards $260\,\mathrm V$. The straight line is the field-resistance line for total field resistance $R_f$ in ohms. The no-load voltage is where they cross. Increase $R_f$: the voltage falls slowly at first, then collapses as $R_f$ approaches the critical value of about $417\,\Omega$, the slope of the OCC at the origin. Above it only the residual voltage remains.
:::

::: example Build-up of a shunt generator {#ex-shunt-generator}
The OCC of a shunt generator at $1200\,\mathrm{r/min}$ is well fitted by $E_a = 10 + 250I_f/(0.6 + I_f)$ volts. Find the no-load terminal voltage at $1200\,\mathrm{r/min}$ with field-circuit resistances of $120\,\Omega$ and $300\,\Omega$, the critical field resistance, and the critical speed for $R_f = 300\,\Omega$.
::: solution
Solve $10 + 250I_f/(0.6 + I_f) = R_fI_f$, a quadratic in $I_f$ (multiply by $0.6 + I_f$). For $R_f = 120\,\Omega$: $I_f = 1.598\,\mathrm A$, $V_t = 191.8\,\mathrm V$. For $R_f = 300\,\Omega$: $I_f = 0.328\,\mathrm A$, $V_t = 98.3\,\mathrm V$.

The slope of the OCC at the origin is $\mathrm dE/\mathrm dI_f = 250\times0.6/0.6^2 = 417\,\Omega$, so $R_{\text{crit}} = 417\,\Omega$ at $1200\,\mathrm{r/min}$. For $R_f = 300\,\Omega$ to be critical, the speed must make the slope $300\,\Omega$: $n_{\text{crit}} = 1200\times300/417 = 864\,\mathrm{r/min}$. Below this the generator will not build up. Note how sensitive the voltage is to $R_f$ near the critical value: the field rheostat is the generator's voltage control.
:::
:::

## DC motors and their speed–torque characteristics

For a motor with constant flux (separately excited, shunt on a constant supply, or permanent magnet), combine $V_t = E_a + I_aR_a$, $E_a = K_a\Phi\omega_m$ and $T = K_a\Phi I_a$.

::: theorem Speed–torque characteristic of a constant-flux motor {#thm-speed-torque}
A DC motor with constant flux, terminal voltage $V_t$ and armature resistance $R_a$ runs at

$$
\omega_m = \frac{V_t}{K_a\Phi} - \frac{R_a}{(K_a\Phi)^2}\,T_{\text{dev}}.
$$ {#eq-speed-torque}

The characteristic is a straight line from the no-load speed $\omega_0 = V_t/(K_a\Phi)$ to the stall torque $T_{\text{stall}} = K_a\Phi V_t/R_a$.
:::

::: proof
From $T = K_a\Phi I_a$, $I_a = T/(K_a\Phi)$. Substituting in $V_t = K_a\Phi\omega_m + I_aR_a$ and solving for $\omega_m$ gives [[#eq-speed-torque]]. At $T = 0$, $\omega_m = \omega_0$; at $\omega_m = 0$, $T = K_a\Phi V_t/R_a$.
:::

Because $R_a$ is small, the slope is small: a shunt motor's speed falls by only a few percent from no load to full load. Its **speed regulation** $(n_{\text{nl}} - n_{\text{fl}})/n_{\text{fl}}$ is typically $3$ to $8\,\%$. The stall torque, by contrast, is many times rated: connecting a stationary motor directly to its rated voltage would draw $V_t/R_a$, ten to twenty times rated current.

::: example A shunt motor on load {#ex-shunt-motor}
A $230\,\mathrm V$ shunt motor has $R_a = 0.25\,\Omega$ and a field resistance of $230\,\Omega$. At no load it runs at $1500\,\mathrm{r/min}$ and draws $3\,\mathrm A$ from the line. At full load it draws $52\,\mathrm A$. Neglecting armature reaction, find the full-load speed, the developed torque, the output torque and the efficiency, assuming the rotational losses are the same as at no load.
::: solution
The field current is $230/230 = 1\,\mathrm A$, so the armature carries $2\,\mathrm A$ at no load and $51\,\mathrm A$ at full load.

No load: $E_a = 230 - 2\times0.25 = 229.5\,\mathrm V$ at $157.1\,\mathrm{rad/s}$, so $K_a\Phi = 229.5/157.1 = 1.461\,\mathrm{V\,s}$. The developed power at no load, $229.5\times2 = 459\,\mathrm W$, is all used in rotational losses (friction, windage and core loss).

Full load: $E_a = 230 - 51\times0.25 = 217.25\,\mathrm V$. With constant flux the speed is proportional to $E_a$:

$$
n = 1500\times\frac{217.25}{229.5} = 1420\,\mathrm{r/min}\quad(148.7\,\mathrm{rad/s}).
$$

Developed torque: $T = K_a\Phi I_a = 1.461\times51 = 74.5\,\mathrm{N\,m}$. Developed power $E_aI_a = 11.08\,\mathrm{kW}$; output $11\,080 - 459 = 10.62\,\mathrm{kW}$; output torque $10\,620/148.7 = 71.4\,\mathrm{N\,m}$. Input $230\times52 = 11.96\,\mathrm{kW}$, so $\eta = 88.8\,\%$. The speed regulation is $(1500 - 1420)/1420 = 5.6\,\%$.
:::
:::

### The series motor

In a series motor the field current is the armature current. Below saturation $\Phi\propto I_a$, so write $K_a\Phi = k_sI_a$. Then $T = k_sI_a^2$, and with total resistance $R = R_a + R_s$, $V_t = k_sI_a\omega_m + I_aR$, so

$$
\omega_m = \frac{V_t}{\sqrt{k_sT}} - \frac R{k_s}.
$$ {#eq-series}

The torque rises with the **square** of the current, so the series motor delivers enormous starting torque for a given current, which made it the classic traction motor for trams, trains and car starters. Its speed rises steeply as the load falls and, in principle, without limit at no load: a series motor must never be run unloaded or connected to its load by a belt that could slip.

::: example Series motor speeds {#ex-series}
A $220\,\mathrm V$ series motor has a total resistance of $0.3\,\Omega$ and runs at $1000\,\mathrm{r/min}$ when taking $40\,\mathrm A$. Assuming a linear magnetisation curve, find the torque at $40\,\mathrm A$, and the speed and torque at $20\,\mathrm A$ and at $80\,\mathrm A$.
::: solution
At $40\,\mathrm A$: $E_a = 220 - 12 = 208\,\mathrm V$ at $104.7\,\mathrm{rad/s}$, so $k_s = E_a/(I_a\omega_m) = 208/(40\times104.7) = 0.0497\,\mathrm{H}$ (V·s/(rad·A)) and $T = k_sI_a^2 = 79.5\,\mathrm{N\,m}$.

At $20\,\mathrm A$: $E_a = 214\,\mathrm V$, $\omega_m = 214/(0.0497\times20) = 215.5\,\mathrm{rad/s} = 2058\,\mathrm{r/min}$, $T = 19.9\,\mathrm{N\,m}$.

At $80\,\mathrm A$: $E_a = 196\,\mathrm V$, $\omega_m = 49.3\,\mathrm{rad/s} = 471\,\mathrm{r/min}$, $T = 318\,\mathrm{N\,m}$ (in practice somewhat less, since the iron begins to saturate).

Halving the current quarters the torque and doubles the speed: the series motor delivers roughly constant power over a wide range, well suited to traction.
:::
:::

::: widget plot
f: 60/(2*pi)*(V - 0.25*x/(1.461*ph))/(1.461*ph); 60/(2*pi)*(V/sqrt(0.0497*x) - 0.3/0.0497)
x: 1, 160
y: 0, 3000
sliders: V=230:50:230:5; ph=1:0.4:1.2:0.01
labels: \text{shunt / separately excited}; \text{series}
caption: Speed in r/min against developed torque in N·m for the shunt motor of the shunt-motor example (flux scaled by the fraction $\phi$) and the series motor of the series-motor example, both on terminal voltage $V$. The shunt motor's line is almost flat; the series motor's speed rises steeply at light load. Lower $V$ and the shunt line moves down parallel to itself: armature-voltage control. Lower $\phi$ (field weakening) and the line rises and tilts, giving higher speed but a smaller stall torque for the same current limit.
:::

::: quiz
A separately excited motor drives a constant-torque load. Its field current is reduced so that the flux falls by $10\,\%$. Immediately after the speed has settled, the armature current is
- [ ] $10\,\%$ lower, because the back emf is lower
- [ ] unchanged, because the load torque is unchanged
- [x] about $11\,\%$ higher
- [ ] zero, because the motor accelerates
::: solution
$T = K_a\Phi I_a$ must still equal the load torque, so $I_a\propto1/\Phi$: it rises by $1/0.9 = 1.11$. The motor runs faster (the back emf must still be close to $V_t$ with less flux), and the armature works harder. Field weakening at constant torque risks overloading the armature.
:::
:::

## Starting and speed control

### Starting

At standstill $E_a = 0$, and the only limit on the armature current is $R_a$. A starter inserts resistance in series with the armature and removes it in steps as the motor accelerates and the back emf builds up. The design keeps the current between an upper limit $I_1$ (set by commutation and the supply) and a lower limit $I_2$ (to keep the accelerating torque up).

::: algorithm Design of a stepped starting resistor {#alg-starter}
For a constant-flux motor on supply $V_t$, with armature resistance $R_a$ and current limits $I_1 > I_2$:

1. The first (largest) total armature-circuit resistance is $R_1 = V_t/I_1$.
2. When the current has fallen to $I_2$, a section is cut out; at that instant the speed, and hence $E_a$, is unchanged, so $V_t - E_a = I_2R_k = I_1R_{k+1}$. The resistances therefore form a geometric sequence, $R_{k+1} = R_k\,(I_2/I_1)$.
3. Choose the number of steps $n$ so that $R_1(I_2/I_1)^n = R_a$: $n = \ln(R_1/R_a)/\ln(I_1/I_2)$. Round $n$ up and recompute $I_2 = I_1(R_a/R_1)^{1/n}$.
4. The external sections are the differences $R_k - R_{k+1}$.
:::

::: example A four-step starter {#ex-starter}
Design a starter for the shunt motor of [[#ex-shunt-motor]] ($230\,\mathrm V$, $R_a = 0.25\,\Omega$, rated armature current $51\,\mathrm A$), with the starting current limited to twice rated. Find the speeds at which the sections are cut out.
::: solution
$I_1 = 102\,\mathrm A$, so $R_1 = 230/102 = 2.255\,\Omega$. With $I_2 = 51\,\mathrm A$ (ratio $2$), $n = \ln(2.255/0.25)/\ln2 = 3.17$, so we need $4$ steps; then $I_1/I_2 = (2.255/0.25)^{1/4} = 1.733$ and $I_2 = 58.9\,\mathrm A$. The total resistances are

$$
R_1 = 2.255,\quad R_2 = 1.301,\quad R_3 = 0.751,\quad R_4 = 0.433,\quad R_5 = R_a = 0.250\,\Omega,
$$

so the external sections are $0.954$, $0.550$, $0.318$ and $0.183\,\Omega$. A section is cut out when the current has fallen to $58.9\,\mathrm A$; then $E_a = 230 - 58.9R_k$, and with $K_a\Phi = 1.461\,\mathrm{V\,s}$ the speeds are $636$, $1003$, $1214$ and $1337\,\mathrm{r/min}$. After the last step the current jumps back to $102\,\mathrm A$ and the motor accelerates to its load speed. Today the same job is done smoothly by a thyristor or transistor converter that ramps the armature voltage.
:::
:::

### Speed control

[[#eq-speed-torque]] shows three ways to change the speed at a given torque.

- **Armature voltage control.** Varying $V_t$ shifts the characteristic parallel to itself; the no-load speed is proportional to $V_t$, and the regulation stays good. With full field the motor can deliver rated torque (rated current) at any speed up to **base speed**, where $V_t$ reaches its rating: the **constant-torque region**. The variable voltage once came from a motor-generator set (the Ward Leonard system) and now from a controlled rectifier or a chopper ([[power-electronics]]).
- **Field weakening.** Above base speed, reducing $I_f$ reduces $\Phi$ and raises $\omega_0 = V_t/(K_a\Phi)$. At rated armature current the torque falls in proportion to $\Phi$ while the speed rises in proportion to $1/\Phi$, so the power $E_aI_a$ is roughly constant: the **constant-power region**. The range is limited by commutation and mechanical strength, typically to two to four times base speed.
- **Armature resistance.** Adding series resistance tilts the characteristic downwards. It is simple but wasteful: the fraction of power lost in the resistance equals the fractional speed reduction, so it is used only for short periods.

::: example Field weakening {#ex-field-weakening}
The shunt motor of [[#ex-shunt-motor]] is running at full load ($51\,\mathrm A$, $1420\,\mathrm{r/min}$) when a field rheostat reduces its flux to $80\,\%$. If the developed torque remains $74.5\,\mathrm{N\,m}$, find the new armature current and speed.
::: solution
With $K_a\Phi' = 0.8\times1.461 = 1.169\,\mathrm{V\,s}$, the armature current must rise to $I_a = 74.5/1.169 = 63.75\,\mathrm A$ (that is, $51/0.8$). Then $E_a = 230 - 63.75\times0.25 = 214.1\,\mathrm V$ and $\omega_m = 214.1/1.169 = 183.1\,\mathrm{rad/s} = 1749\,\mathrm{r/min}$. The speed rose by $23\,\%$, but the armature now carries $25\,\%$ more than its rating and would overheat: in the constant-power region the torque must be reduced as the field is weakened.
:::
:::

::: warning Loss of field
If the field circuit of a shunt motor opens while it runs, the flux drops to its residual value. The back emf collapses, the armature current rises sharply, and, if the load is light, the motor accelerates towards a dangerous speed, since $\omega_0 = V_t/(K_a\Phi)$ grows without limit as $\Phi\to0$. Field circuits are never fused, and DC drives include a field-failure trip.
:::

## Losses and efficiency

The losses of a DC machine are: armature copper loss $I_a^2R_a$ (and $I_a^2R_s$ in a series field), brush-contact loss (about $2\,\mathrm V\times I_a$), field copper loss $V_fI_f$, **rotational losses** (friction, windage and core loss in the armature, which sees an alternating flux at frequency $Pn/120$), and stray load losses. The rotational loss at a given speed and flux is measured by running the machine as an unloaded motor, as in [[#ex-shunt-motor]]. As in a transformer, efficiency is highest when the variable (current-dependent) losses equal the constant ones, by the argument of [[electric-machines/transformers#thm-max-efficiency]].

::: application Permanent-magnet DC motors
In small motors the field winding is replaced by ferrite or NdFeB magnets, removing field loss and making $K_a\Phi$ a fixed constant $k$. Such a motor is fully described by $k$, $R_a$, its armature inductance and its inertia, the textbook plant of servo control: $V = kw + iR + L\,\mathrm di/\mathrm dt$, $J\,\mathrm d\omega/\mathrm dt = ki - T_L$. This model is the starting point of motor speed and position control in [[control-systems]]. The brushes and commutator remain its weak point; replacing them with electronic switching gives the brushless DC motor of [[electric-machines/special-machines]].
:::

::: history
Hippolyte Pixii added a commutator to his hand-cranked magneto in 1832, producing pulsating DC. Thomas Davenport patented a battery-powered rotary motor in the United States in 1837, and Moritz Jacobi drove a boat on the Neva with one in 1839. In 1866–1867 Werner von Siemens, Charles Wheatstone and Samuel Alfred Varley independently described the self-exciting dynamo. Zénobe Gramme's ring-armature dynamo (1871) was the first commercially successful generator, and at the Vienna Exhibition of 1873 it was shown that one Gramme machine could drive another as a motor. Friedrich von Hefner-Alteneck's drum armature (1872) replaced the ring and is the basis of modern windings. Thomas Edison's Pearl Street station in New York began supplying DC in 1882, and Frank Sprague's constant-speed DC motors and his electric tramway at Richmond, Virginia (1888) launched electric traction. Harry Ward Leonard patented his variable-voltage speed-control system in 1891.
:::

## Where this leads

The two equations $E_a = K_a\Phi\omega_m$ and $T = K_a\Phi I_a$, with flux and current at right angles and independently controlled, are the ideal that AC drives try to reproduce. In [[electric-machines/rotating-magnetic-fields]] we see how polyphase windings produce a rotating field, and in [[electric-machines/induction-machines]] and [[electric-machines/synchronous-machines]] how torque arises from the interaction of stator and rotor fields at an angle. The brushless DC and permanent-magnet synchronous motors of [[electric-machines/special-machines]] replace the commutator with electronic switching. Controlled rectifiers and choppers that supply DC motors are designed in [[power-electronics]], and the DC motor model above is the standard plant of [[control-systems]].

::: summary
- A DC machine has a DC field on the stator and an armature whose coil currents are reversed by the commutator, so the armature mmf stays at right angles to the field at all speeds.
- $E_a = K_a\Phi\omega_m$ and $T = K_a\Phi I_a$ with $K_a = ZP/(2\pi a)$; $E_aI_a = T\omega_m$ is the power check.
- The armature circuit is $E_a$ plus $R_a$; motor: $V_t = E_a + I_aR_a$; generator: $V_t = E_a - I_aR_a$. The OCC gives $\Phi(I_f)$ and scales with speed.
- A shunt generator self-excites if there is residual flux, the field aids it, and $R_f < R_{\text{crit}}$, which is proportional to speed.
- Constant-flux motors have a straight, nearly flat speed–torque line $\omega = V/(K\Phi) - R_aT/(K\Phi)^2$; series motors have $T\propto I^2$ and a speed that rises steeply at light load.
- Starting needs series resistance (or a ramped voltage); resistor steps form a geometric sequence.
- Speed is controlled by armature voltage up to base speed (constant torque) and by field weakening above it (constant power).
:::

## Exercises

::: exercise Emf of a wave-wound machine {level=1 check="6*0.025*600*1000/(60*2)"}
A six-pole, wave-wound DC machine has $600$ armature conductors and $25\,\mathrm{mWb}$ per pole. Find its emf, in volts, at $1000\,\mathrm{r/min}$.
::: solution
Wave winding: $a = 2$. $E_a = P\Phi Zn/(60a) = 6\times0.025\times600\times1000/120 = 750\,\mathrm V$.
:::
:::

::: exercise Torque constant {level=1 check="0.12*8"}
A permanent-magnet DC motor has a back-emf constant of $0.12\,\mathrm{V\,s/rad}$. Find its developed torque, in N·m, at an armature current of $8\,\mathrm A$.
::: solution
The torque constant equals the back-emf constant in SI units: $T = 0.12\times8 = 0.96\,\mathrm{N\,m}$.
:::
:::

::: exercise No-load speed {level=1 check="24/0.12*60/(2*pi)"}
The motor of the previous exercise is supplied at $24\,\mathrm V$. Find its no-load speed in r/min, neglecting friction.
::: solution
At no load $I_a\approx0$, so $\omega_0 = V/k = 24/0.12 = 200\,\mathrm{rad/s} = 1910\,\mathrm{r/min}$.
:::
:::

::: exercise Generator terminal voltage {level=2 check="192*1100/1200 - 50*0.2"}
The generator of [[#ex-emf]] is separately excited with the same flux, has $R_a = 0.2\,\Omega$, and is driven at $1100\,\mathrm{r/min}$. Find its terminal voltage, in volts, when delivering $50\,\mathrm A$ (neglect armature reaction).
::: solution
$E_a = 192\times1100/1200 = 176\,\mathrm V$; $V_t = 176 - 50\times0.2 = 166\,\mathrm V$.
:::
:::

::: exercise Speed at a new load {level=2 check="1500*(230-30*0.25)/229.5"}
For the shunt motor of [[#ex-shunt-motor]], find the speed in r/min when the armature current is $30\,\mathrm A$.
::: solution
$E_a = 230 - 7.5 = 222.5\,\mathrm V$, so $n = 1500\times222.5/229.5 = 1454\,\mathrm{r/min}$.
:::
:::

::: exercise Resistance speed control {level=2}
The shunt motor of [[#ex-shunt-motor]] drives a constant-torque load requiring an armature current of $51\,\mathrm A$. What resistance must be added to the armature circuit to reduce the speed to $1000\,\mathrm{r/min}$, and what fraction of the armature input power is wasted in it?
::: solution
At $1000\,\mathrm{r/min}$ ($104.7\,\mathrm{rad/s}$), $E_a = 1.461\times104.7 = 153.0\,\mathrm V$. The total resistance must drop $230 - 153.0 = 77.0\,\mathrm V$ at $51\,\mathrm A$: $R = 1.510\,\Omega$, so the added resistance is $1.26\,\Omega$. It dissipates $51^2\times1.26 = 3.28\,\mathrm{kW}$ out of an armature input of $230\times51 = 11.73\,\mathrm{kW}$, that is $28\,\%$. This fraction is exactly the fractional reduction of the back emf below its value without the resistor, $(217.25 - 153.0)/230 = 28\,\%$: resistance control wastes power in proportion to the speed reduction.
:::
:::

::: exercise Series motor at constant power {level=3}
A series motor with negligible resistance and a linear magnetisation curve drives a fan whose torque is proportional to the square of speed, $T = c\,\omega^2$. Show that the speed is then proportional to $\sqrt V$, and find the factor by which the speed changes when the voltage is reduced from $220\,\mathrm V$ to $180\,\mathrm V$.
::: hint
With $R = 0$, $V = k_sI\omega$ and $T = k_sI^2$. Eliminate $I$.
:::
::: solution
From $V = k_sI\omega$, $I = V/(k_s\omega)$, so $T = k_sV^2/(k_s\omega)^2 = V^2/(k_s\omega^2)$. Equating to $c\omega^2$: $\omega^4 = V^2/(ck_s)$, so $\omega\propto\sqrt V$. The speed changes by $\sqrt{180/220} = 0.905$, a $9.5\,\%$ reduction. (With a resistance $R$ the speed falls a little further.)
:::
:::

::: exercise Critical speed and field design {level=3}
A shunt generator has the OCC of [[#ex-shunt-generator]] at $1200\,\mathrm{r/min}$. (a) What field-circuit resistance gives a no-load voltage of $220\,\mathrm V$ at $1200\,\mathrm{r/min}$? (b) If the field winding itself is $80\,\Omega$, what rheostat setting is needed? (c) What is the lowest speed at which the generator will still build up with this field resistance?
::: hint
For (a), find $I_f$ on the OCC at $220\,\mathrm V$ first.
:::
::: solution
(a) $10 + 250I_f/(0.6 + I_f) = 220$ gives $250I_f = 210(0.6 + I_f)$, so $40I_f = 126$ and $I_f = 3.15\,\mathrm A$. Then $R_f = 220/3.15 = 69.8\,\Omega$.

(b) The winding alone is $80\,\Omega$, more than required: $220\,\mathrm V$ cannot be reached at $1200\,\mathrm{r/min}$. At $80\,\Omega$ the no-load voltage is the solution of $10 + 250I_f/(0.6 + I_f) = 80I_f$: $I_f = 2.68\,\mathrm A$, $V = 214\,\mathrm V$. To get $220\,\mathrm V$ the speed must be raised slightly, or the winding redesigned with fewer turns of heavier wire.

(c) With $R_f = 80\,\Omega$ the critical speed is $1200\times80/417 = 230\,\mathrm{r/min}$. The generator builds up at any practical speed.
:::
:::

::: exercise Designing a speed-control range {level=3}
A separately excited motor has rated values $V = 440\,\mathrm V$, $I_a = 100\,\mathrm A$, base speed $1000\,\mathrm{r/min}$, $R_a = 0.2\,\Omega$. It is to drive a winder requiring constant power of $40\,\mathrm{kW}$ (developed) from $1000$ to $2500\,\mathrm{r/min}$, and constant torque below $1000\,\mathrm{r/min}$. (a) Find $K_a\Phi$ at rated field. (b) What flux fraction is needed at $2500\,\mathrm{r/min}$ with rated armature current? (c) What armature voltage gives rated torque at $300\,\mathrm{r/min}$?
::: solution
(a) $E_a = 440 - 100\times0.2 = 420\,\mathrm V$ at $104.7\,\mathrm{rad/s}$, so $K_a\Phi = 4.011\,\mathrm{V\,s}$. Developed power at rating is $420\times100 = 42\,\mathrm{kW}$ and torque $401\,\mathrm{N\,m}$; $40\,\mathrm{kW}$ is within it.

(b) At $2500\,\mathrm{r/min}$ ($261.8\,\mathrm{rad/s}$) with $V = 440\,\mathrm V$ and $I_a = 100\,\mathrm A$, $E_a = 420\,\mathrm V$ still, so $K_a\Phi = 420/261.8 = 1.604\,\mathrm{V\,s}$, a flux fraction of $0.40$. The torque is then $160\,\mathrm{N\,m}$ and the power $42\,\mathrm{kW}$, enough for the $40\,\mathrm{kW}$ requirement (a slightly lower current suffices).

(c) Rated torque at full field needs $I_a = 100\,\mathrm A$. At $300\,\mathrm{r/min}$ ($31.4\,\mathrm{rad/s}$), $E_a = 4.011\times31.4 = 126.0\,\mathrm V$, so $V = 126.0 + 20 = 146\,\mathrm V$. A $2.5{:}1$ field-weakening range is near the practical limit for a standard machine; a wider range would call for a larger motor or a gearbox change.
:::
:::
