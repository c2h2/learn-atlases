A thunderclap arrives after the flash, a pipe organ holds a definite pitch, and a horn on an approaching train sounds sharper than the same horn standing still. All three are properties of a longitudinal wave in a material medium. The disturbance is a small displacement of the air along the direction the wave travels, together with a small excess of pressure. The wave equation is the one already used for a string in [[oscillations/travelling-waves]], and the addition of two such waves is the superposition of [[oscillations/superposition]]. What is new is the speed, fixed by the elasticity of the gas, the logarithmic scale on which loudness is reported, the pattern of nodes in a pipe, and the shift in pitch when the source or the listener moves.

Throughout, take the gas constant to be $R = 8.314462618\,\mathrm{J\,mol^{-1}\,K^{-1}}$. The speed derived below is the speed relative to the air, in still air. Wind is a separate motion of the medium and is not included. Frequencies in the examples are ordinary audible frequencies, far below any frequency at which a single cycle would have time to exchange heat with its surroundings, so the compressions are adiabatic. That hypothesis is stated again where the bulk modulus is chosen, because it is the step on which Newton's value and Laplace's value part company.

## The speed of sound

Consider a column of fluid of equilibrium density $\rho$ and equilibrium pressure $P$, in a tube of cross-sectional area $A$, or in an open fluid where a plane wave plays the same role. Let $s(x, t)$ be the longitudinal displacement of the fluid particle whose equilibrium position is $x$. A slice that occupies $x$ to $x + \dd x$ in equilibrium has thickness $\dd x$ and volume $A\,\dd x$. After the displacement, the left face is at $x + s(x, t)$ and the right face is at $x + \dd x + s(x + \dd x, t)$, so the new thickness is

$$
\dd x + \frac{\partial s}{\partial x}\,\dd x.
$$

The fractional change in volume of the slice is therefore $\partial s/\partial x$. Stretching, $\partial s/\partial x > 0$, is a rarefaction.

::: definition Bulk modulus {#def-bulk}
The **bulk modulus** $B$ of a fluid is the extra pressure needed to produce a fractional decrease in volume,

$$
B = -\frac{\Delta P}{\Delta V/V},
$$ {#eq-bulk}

the derivative being taken along the thermodynamic path the compression actually follows. $B$ has the units of pressure. It is positive: squeezing a fluid raises its pressure.
:::

For a sound wave the excess pressure, written $\Delta P$ and often called the acoustic pressure, is the first-order change associated with $\partial s/\partial x$. From [[#eq-bulk]],

$$
\Delta P = -B\frac{\partial s}{\partial x}.
$$ {#eq-acoustic}

The minus sign says that a compression, $\partial s/\partial x < 0$, raises the pressure.

::: theorem Speed of a longitudinal wave in a fluid {#thm-speed}
In a fluid of equilibrium density $\rho$ and bulk modulus $B$, a plane longitudinal wave of small amplitude travels at

$$
v = \sqrt{\frac{B}{\rho}}.
$$ {#eq-speed}
:::

::: proof
The pressure on the left face of the slice pushes the fluid in the positive $x$ direction; the pressure on the right face pushes it backwards. With equilibrium pressure $P$ and excess $\Delta P$, the net force in the positive direction is

$$
F = A\bigl(P + \Delta P(x)\bigr) - A\bigl(P + \Delta P(x + \dd x)\bigr) = -A\frac{\partial\Delta P}{\partial x}\,\dd x.
$$

The mass of the slice, to first order in the amplitude, is the equilibrium mass $\rho A\,\dd x$. Newton's second law, from [[mechanics/newton-laws]], then reads

$$
\rho A\,\dd x\,\frac{\partial^2 s}{\partial t^2} = -A\frac{\partial\Delta P}{\partial x}\,\dd x,
$$

so $\partial^2 s/\partial t^2 = -(1/\rho)\,\partial\Delta P/\partial x$. Substitute [[#eq-acoustic]]. If $B$ is constant on the scale of the wave,

$$
\frac{\partial\Delta P}{\partial x} = -B\frac{\partial^2 s}{\partial x^2},
$$

and therefore

$$
\frac{\partial^2 s}{\partial t^2} = \frac{B}{\rho}\frac{\partial^2 s}{\partial x^2}.
$$

This is the wave equation with $v^2 = B/\rho$. The derivation uses a small amplitude twice: the excess pressure is linear in $\partial s/\partial x$, and the density multiplying the acceleration is the equilibrium density. Viscosity and heat flow during a single cycle are omitted. Both are small for ordinary sound in air, which is why a clap still carries across a room, but they are why a sound eventually dies.
:::

The formula is only as good as the $B$ one puts into it. Two paths through the same gas give two moduli.

::: lemma Isothermal and adiabatic bulk moduli of an ideal gas {#lem-moduli}
For an ideal gas compressed isothermally, $B = P$. For a reversible adiabatic compression, $B = \gamma P$, where $\gamma = C_P/C_V$ is the ratio of heat capacities.
:::

::: proof
Isothermal means $PV$ is constant for a fixed amount of gas, so $P\,\dd V + V\,\dd P = 0$ and $\dd P = -P\,\dd V/V$. Then

$$
B = -\frac{\dd P}{\dd V/V} = P.
$$

Reversible and adiabatic means $PV^{\gamma}$ is constant. Differentiating the logarithm, $\dd P/P + \gamma\,\dd V/V = 0$, so $\dd P = -\gamma P\,\dd V/V$ and

$$
B = -\frac{\dd P}{\dd V/V} = \gamma P.
$$

The factor $\gamma$ is the whole of the difference between the two paths. For dry air near room temperature, $\gamma = 1.40$.
:::

Which path does a sound wave follow? A compressed parcel of air is hotter than its neighbours. If the oscillation were infinitely slow, heat would leak away and the temperature would stay uniform: the isothermal modulus. Ordinary sound is not slow in that sense. The time for heat to diffuse across a wavelength is long compared with the period, so the parcel keeps its extra energy for the duration of the compression. The path is adiabatic, Laplace's choice rather than Newton's, and the speed is $\sqrt{\gamma P/\rho}$.

The ideal-gas law converts this into a function of temperature. For $n$ moles, $PV = nRT$. The mass is $nM$, where $M$ is the molar mass in kilograms per mole, so the density is

$$
\rho = \frac{nM}{V} = \frac{MP}{RT}.
$$

Hence $P/\rho = RT/M$.

::: theorem Speed of sound in an ideal gas {#thm-ideal}
In an ideal gas of molar mass $M$ and heat-capacity ratio $\gamma$, the adiabatic speed of sound is

$$
v = \sqrt{\frac{\gamma P}{\rho}} = \sqrt{\frac{\gamma RT}{M}}.
$$ {#eq-ideal}

$T$ is the absolute temperature. $M$ is in $\mathrm{kg/mol}$, not $\mathrm{g/mol}$.
:::

::: proof
[[#thm-speed]] with the adiabatic modulus $B = \gamma P$ from [[#lem-moduli]] gives $v = \sqrt{\gamma P/\rho}$. The ideal-gas density $\rho = MP/(RT)$ then gives $P/\rho = RT/M$, and the second form follows. The isothermal alternative would omit $\gamma$ under the square root. It is the same derivation with the wrong modulus, and it is low by exactly $\sqrt{\gamma}$.
:::

A change of temperature changes the speed only through the square root. Differentiating [[#eq-ideal]] at fixed $\gamma$ and $M$,

$$
\frac{\dd v}{\dd T} = \frac{v}{2T}.
$$

Near room temperature that is a little over half a metre per second for each kelvin, which is computed in the example. It is large enough that "the" speed of sound in air is not a universal constant, and small enough that a one-degree uncertainty does not move the answer by tens of metres per second.

::: example Dry air at $293\,\mathrm{K}$ {#ex-air}
For dry air take $\gamma = 1.40$ and $M = 0.02896\,\mathrm{kg/mol}$, at $T = 293\,\mathrm{K}$. Compute the adiabatic speed, Newton's isothermal speed, and their ratio. Also compute the speed at $0^\circ\mathrm{C}$ with the same $\gamma$ and $M$, and the change of speed per kelvin at $293\,\mathrm{K}$.
::: solution
First the combination that sits under the adiabatic square root:

$$
\frac{\gamma RT}{M} = \frac{1.40\times 8.314462618\times 293}{0.02896} = 1.177690803\times 10^{5}\,\mathrm{m^2/s^2}.
$$

The square root is

$$
v = \sqrt{1.177690803\times 10^{5}} = 343.175\,\mathrm{m/s},
$$

which is $343.2\,\mathrm{m/s}$ to four figures, and $343\,\mathrm{m/s}$ to three figures. The three-figure reading matches the precision of $\gamma = 1.40$ and of $T = 293\,\mathrm{K}$. Newton's isothermal value drops $\gamma$:

$$
\sqrt{\frac{RT}{M}} = \sqrt{\frac{8.314462618\times 293}{0.02896}} = 290.04\,\mathrm{m/s},
$$

which is $290.0\,\mathrm{m/s}$ to four figures. The ratio of the two speeds is $\sqrt{\gamma} = \sqrt{1.40} = 1.1832$, and $290.04\times 1.1832$ rounds to $343.2\,\mathrm{m/s}$. Multiplying the already rounded values $290.0$ and $1.183$ does not. The isothermal number is low; the repair is the factor $\gamma$ inside the modulus, not an adjustment to $R$.

At $T = 273.15\,\mathrm{K}$, the same formula gives

$$
v = \sqrt{\frac{1.40\times 8.314462618\times 273.15}{0.02896}} = 331.3\,\mathrm{m/s}.
$$

The slope at $293\,\mathrm{K}$ is

$$
\frac{v}{2T} = \frac{343.175}{2\times 293} = 0.586\,\mathrm{m\,s^{-1}\,K^{-1}}.
$$

One kelvin changes the speed by about $0.6\,\mathrm{m/s}$. A quoted $344\,\mathrm{m/s}$ comes from a slightly different $M$ or $T$; it is not this square root. Problems below that need a speed state the value they use.

As a check, take $P = 1.01325\times 10^{5}\,\mathrm{Pa}$. Then $B = \gamma P = 1.41855\times 10^{5}\,\mathrm{Pa}$ and

$$
\rho = \frac{MP}{RT} = \frac{0.02896\times 1.01325\times 10^{5}}{8.314462618\times 293} = 1.2045\,\mathrm{kg/m^3}.
$$

Then $\sqrt{B/\rho} = \sqrt{1.41855\times 10^{5}/1.2045} = 343.2\,\mathrm{m/s}$, the same speed. Using $M = 28.96$ instead of $0.02896$ would divide this speed by $\sqrt{1000}$ and produce $10.85\,\mathrm{m/s}$, which is not a speed of sound in air. The molar mass in [[#eq-ideal]] is in $\mathrm{kg/mol}$.
:::
:::

::: intuition Why the parcel stays adiabatic
Conduction needs both a temperature gradient and time. A mid-range period is a millisecond or less, too short for heat to cross a wavelength, so each parcel runs with $Q \approx 0$. The isothermal modulus is the right one for a gas squeezed slowly in a conducting cylinder, and the wrong one here. The repair is $\gamma$, not a different wave equation.
:::

## Intensity and the decibel

A travelling sound wave carries energy. The **intensity** $I$ is the average power crossing a unit area perpendicular to the direction of travel, in watts per square metre. For a harmonic travelling wave the analogue of the string formula in [[oscillations/travelling-waves]] is

$$
I = \frac{1}{2}\rho v\omega^2 s_0^2 = \frac{(\Delta P_0)^2}{2\rho v},
$$ {#eq-intensity}

where $s_0$ is the displacement amplitude and $\Delta P_0 = \rho v\omega s_0$ is the pressure amplitude. The two forms agree because $B = \rho v^2$ and $\Delta P_0 = B k s_0$ with $k = \omega/v$. We use them when a displacement or a pressure is given. Loudness comparisons more often start from $I$ itself.

::: definition Sound intensity level {#def-level}
The **sound intensity level** in decibels is

$$
\beta = 10\log_{10}\frac{I}{I_0}, \qquad I_0 = 10^{-12}\,\mathrm{W/m^2}.
$$ {#eq-db}

$I_0$ is a fixed reference, close to the threshold of hearing for a young listener at a mid-range frequency. It is not a property of the wave. $\beta$ is a pure number dressed with the unit decibel. A larger $I$ gives a larger $\beta$, and $I = I_0$ gives $\beta = 0$, which is not the absence of a wave.
:::

::: corollary A factor of ten is ten decibels {#cor-ten}
If the intensity is multiplied by $10$ and the reference $I_0$ is held fixed, the level rises by $10\,\mathrm{dB}$:

$$
\beta(10I) = \beta(I) + 10.
$$
:::

::: proof
By [[#eq-db]],

$$
\beta(10I) = 10\log_{10}\frac{10I}{I_0} = 10\log_{10}\frac{I}{I_0} + 10\log_{10} 10 = \beta(I) + 10,
$$

since $\log_{10} 10 = 1$. Repeating the step, a factor of $10^{n}$ is $10n$ decibels. In particular a factor of $10^{2}$ is $20\,\mathrm{dB}$, and a factor of $10^{-1}$ is $-10\,\mathrm{dB}$.
:::

A factor of two is not a factor of ten. Two equal incoherent intensities give a combined intensity $2I$, and

$$
10\log_{10} 2 = 3.010,
$$

so the level rises by $3.01\,\mathrm{dB}$, about $3\,\mathrm{dB}$ in the usual shorthand. It does not double. Seventy decibels and another seventy decibels, added as incoherent intensities, make $73.0\,\mathrm{dB}$, not $140\,\mathrm{dB}$. The logarithm is the reason. Coherent sources are a different addition: the amplitudes add, as in [[oscillations/superposition]], and two equal in-phase amplitudes give four times the intensity, which is $10\log_{10} 4 = 6.02\,\mathrm{dB}$. Quoting $+3\,\mathrm{dB}$ for that pair would be the incoherent rule applied to a coherent problem.

::: proposition Inverse square law {#prop-sphere}
A point source radiates average power $P$ uniformly in all directions into a medium that does not absorb. The intensity on a sphere of radius $r$ centred on the source is

$$
I(r) = \frac{P}{4\pi r^2}.
$$ {#eq-sphere}
:::

::: proof
In the steady state the average power through any closed surface around the source equals $P$: nothing is absorbed, and energy is not accumulating. Symmetry makes $I$ constant on a sphere, so $P = I\times 4\pi r^2$, which is [[#eq-sphere]]. Doubling $r$ divides $I$ by four and changes the level by $10\log_{10}(1/4) = -6.02\,\mathrm{dB}$. A directional source, a reflecting room, or absorption along the path takes the problem outside this idealisation.
:::

::: example Seventy decibels, and a small loudspeaker {#ex-db}
An intensity $I = 1.00\times 10^{-5}\,\mathrm{W/m^2}$ falls on an ear. Find the level. Separately, a small source radiates $P = 1.00\times 10^{-3}\,\mathrm{W}$ uniformly, with no absorption. Find the intensity and the level at $r = 2.00\,\mathrm{m}$.
::: solution
For the first figure, [[#eq-db]] gives

$$
\beta = 10\log_{10}\frac{1.00\times 10^{-5}}{1.00\times 10^{-12}} = 10\log_{10}(10^{7}) = 10\times 7 = 70.0\,\mathrm{dB}.
$$

A factor of $10^{7}$ in intensity is exactly $70\,\mathrm{dB}$. The same arithmetic run backwards says that $70.0\,\mathrm{dB}$ means $I = 10^{-5}\,\mathrm{W/m^2}$ and nothing else: the level determines the intensity only because $I_0$ has been agreed.

For the source, [[#eq-sphere]] gives

$$
I = \frac{1.00\times 10^{-3}}{4\pi(2.00)^{2}} = \frac{1.00\times 10^{-3}}{16\pi} = 1.989\times 10^{-5}\,\mathrm{W/m^2}.
$$

The level is

$$
\beta = 10\log_{10}\frac{1.989\times 10^{-5}}{10^{-12}} = 10\log_{10}(1.989\times 10^{7}) = 73.0\,\mathrm{dB}
$$

to three significant figures ($72.99\,\mathrm{dB}$ before that rounding). The intensity is about twice $10^{-5}\,\mathrm{W/m^2}$, and $10\log_{10} 2 = 3.01$, so the level sits about $3\,\mathrm{dB}$ above the $70.0\,\mathrm{dB}$ benchmark.
:::
:::

::: widget plot
f: sin(x); sin(1.1*x)
x: 0, 80
caption: The two curves are sin(x) and sin(1.1 x), tones whose frequencies differ by a tenth. Watch them slip out of step. Where they lie together their sum is loud, and where they oppose each other the sum is quiet. That slow envelope is the beat from the previous chapter; the plot shows the two tones whose sum produces it. Stretching the upper limit past 80 shows the next slip.
:::

## Standing sound waves in a pipe

A pipe forces boundary conditions on the air, just as the ends of a string force conditions on the transverse displacement. The quantity that vanishes or not is the longitudinal displacement $s$ of the air, or equivalently the excess pressure, and the two do not vanish in the same places.

From [[#eq-acoustic]], $\Delta P = -B\,\partial s/\partial x$. In a standing wave the displacement and the excess pressure are therefore a quarter of a cycle apart in space. A displacement node, where $s = 0$ for all time, is a pressure antinode: the air is pressed against a barrier it cannot cross, and $\partial s/\partial x$ is largest there. A displacement antinode, where the air moves most freely, has $\partial s/\partial x = 0$ and is a pressure node.

At a **closed end** the air cannot move longitudinally. The displacement has a node. The excess pressure has an antinode.

At an **open end** the pressure is held at the ambient pressure of the room, to a good approximation, so the excess pressure has a node and the displacement has an antinode. The approximation ignores the fact that the air just outside the pipe is not an infinite quiet reservoir: a small end correction, of the order of the pipe radius, lengthens the effective air column. The formulae below do not include that correction. They describe the ideal open end.

::: theorem Frequencies of an ideal pipe {#thm-pipe}
Let the speed of sound be $v$ and the length of the pipe be $L$.

For a pipe open at both ends, the standing-wave frequencies are the same series as for a string fixed at both ends,

$$
f_n = \frac{n v}{2L}, \qquad n = 1, 2, 3, \ldots
$$ {#eq-open}

For a pipe closed at one end and open at the other,

$$
f_n = \frac{(2n - 1)\, v}{4L}, \qquad n = 1, 2, 3, \ldots
$$ {#eq-closed}

Only the odd multiples of the fundamental $v/(4L)$ occur. The next frequency above the fundamental is three times it, not twice it.
:::

::: proof
Open at both ends. Place the pipe on $0 \le x \le L$, and take a displacement standing wave $s = s_0\cos(kx)\cos(\omega t)$ with $\omega = vk$. Then

$$
\frac{\partial s}{\partial x} = -k s_0\sin(kx)\cos(\omega t),
$$

so $\Delta P$ vanishes at $x = 0$ for every $t$. That is a pressure node, the open-end condition. At $x = L$ the same condition requires $\sin(kL) = 0$, so $kL = n\pi$ for $n = 1, 2, 3, \ldots$. Hence $\lambda_n = 2L/n$ and $f_n = v/\lambda_n = nv/(2L)$. Displacement antinodes stand at both ends, because $\cos(kx)$ is $\pm 1$ there. The length holds an integer number of half-wavelengths. The pattern of *lengths* matches the fixed string of [[oscillations/superposition]], even though the string has displacement nodes at its ends and the open pipe has displacement antinodes: node-to-node and antinode-to-antinode are both $\lambda/2$.

Closed at $x = 0$ and open at $x = L$. The displacement must vanish at the closed end, so $s = s_0\sin(kx)\cos(\omega t)$. Then $\partial s/\partial x = k s_0\cos(kx)\cos(\omega t)$, and the open-end condition $\partial s/\partial x = 0$ at $x = L$ requires $\cos(kL) = 0$. Hence

$$
kL = \frac{\pi}{2} + n'\pi = \frac{(2n' + 1)\pi}{2}, \qquad n' = 0, 1, 2, \ldots
$$

Relabel $n = n' + 1$, so $n = 1, 2, 3, \ldots$ and $kL = (2n - 1)\pi/2$. Then $\lambda = 4L/(2n - 1)$ and

$$
f_n = \frac{v}{\lambda} = \frac{(2n - 1)\, v}{4L}.
$$

The fundamental, $n = 1$, is a quarter-wavelength in the pipe: $L = \lambda/4$. The next mode, $n = 2$, has $L = 3\lambda/4$ and frequency $3v/(4L) = 3f_1$. There is no mode at $2f_1$. A half-wavelength pattern would put the same boundary condition at both ends, and a closed end and an open end are not the same condition.
:::

::: example A half-metre pipe at the computed air speed {#ex-pipe}
Take $v = 343.2\,\mathrm{m/s}$, the four-figure adiabatic speed of [[#ex-air]], and a pipe of length $L = 0.500\,\mathrm{m}$. Find the first three frequencies of the pipe open at both ends, and the first three frequencies of the pipe closed at one end.
::: solution
Open at both ends, [[#eq-open]] gives

$$
f_1 = \frac{343.2}{2\times 0.500} = 343.2\,\mathrm{Hz}, \qquad f_2 = 686.4\,\mathrm{Hz}, \qquad f_3 = 1029.6\,\mathrm{Hz}.
$$

Every integer multiple of $343.2\,\mathrm{Hz}$ is present. Closed at one end, [[#eq-closed]] gives

$$
f_1 = \frac{343.2}{4\times 0.500} = 171.6\,\mathrm{Hz},
$$

and then only the odd multiples:

$$
f_2 = 3\times 171.6 = 514.8\,\mathrm{Hz}, \qquad f_3 = 5\times 171.6 = 858.0\,\mathrm{Hz}.
$$

The closed pipe sounds a fundamental an octave below the open pipe of the same length, because $v/(4L)$ is half of $v/(2L)$, and it skips every even multiple. The second frequency is $514.8\,\mathrm{Hz}$, not $343.2\,\mathrm{Hz}$. A real open end shifts these numbers by a fraction of the radius; the ideal values are the ones the boundary conditions of [[#thm-pipe]] produce, and they are the ones to use unless an end correction has been measured or supplied.
:::
:::

::: quiz
A pipe closed at one end has fundamental frequency $100\,\mathrm{Hz}$. The next frequency it supports is
- [ ] $200\,\mathrm{Hz}$, because every resonant object has a full harmonic series
- [x] $300\,\mathrm{Hz}$, the next odd multiple of the fundamental
- [ ] $150\,\mathrm{Hz}$, halfway to the first overtone of an open pipe
- [ ] $400\,\mathrm{Hz}$, two octaves above the fundamental
::: solution
[[#eq-closed]] allows $f$, $3f$, $5f$, and no even multiples. With $f = 100\,\mathrm{Hz}$ the next entry is $300\,\mathrm{Hz}$. The series $100$, $200$, $300$ belongs to [[#eq-open]], or to a string fixed at both ends. Closing one end removes the even members and halves the fundamental relative to an open pipe of the same length. The number $150\,\mathrm{Hz}$ is not a member of either series.
:::
:::

## The Doppler effect

The speed in [[#eq-ideal]] is the speed of the wave relative to the air. A listener moving through the air, or a source moving through the air, meets a different number of wavefronts each second. The effect is named for Christian Doppler. It is a fact about waves in a medium, and the medium's rest frame is the frame in which $v$ is defined.

Take the source and the observer on one straight line. Write $v_s$ for the speed of the source relative to the air and $v_o$ for the speed of the observer relative to the air. The sign convention of this chapter is the one in which both symbols are positive when the motion closes the gap: $v_s$ positive means the source moves towards the observer, and $v_o$ positive means the observer moves towards the source. A recession is the same formula with that speed reversed in sign.

::: theorem Doppler shift for sound {#thm-doppler}
A source of frequency $f$ and an observer move on the line joining them, through still air in which the speed of sound is $v$. When the source moves towards the observer at speed $v_s$ and the observer moves towards the source at speed $v_o$, the frequency heard is

$$
f' = f\,\frac{v + v_o}{v - v_s},
$$ {#eq-doppler}

provided $v_s < v$ and $v + v_o > 0$, so that wavefronts still reach the observer and the source has not outrun its own sound. If either party recedes, the corresponding speed changes sign in [[#eq-doppler]].
:::

::: proof
Two effects multiply, and they are different effects.

First let the source be at rest in the air and the observer move towards it at $v_o$. The source still lays down wavelength $\lambda = v/f$, because the air is undisturbed and the source is not chasing the wavefronts. The observer, moving towards the oncoming wavefronts, closes the gap at speed $v + v_o$ relative to those wavefronts. The frequency heard is that closing speed divided by the wavelength,

$$
f' = \frac{v + v_o}{\lambda} = f\,\frac{v + v_o}{v}.
$$

If the observer moves away, the closing speed is $v - v_o$ instead, provided $v_o < v$. An observer who outruns the wave, $v_o > v$ while receding, meets no further wavefronts from that source.

Next let the observer be at rest and the source move towards the observer at $v_s < v$. In one period $T = 1/f$ the source emits one cycle and also travels a distance $v_s T$ towards the observer. The wavefront emitted at the start of that period has travelled $vT$ through the air. The spatial gap between consecutive wavefronts, on the side towards the observer, is therefore shortened:

$$
\lambda' = vT - v_s T = \frac{v - v_s}{f}.
$$

The observer is at rest in the air, so the wavefronts pass at speed $v$, and

$$
f' = \frac{v}{\lambda'} = f\,\frac{v}{v - v_s}.
$$

If the source recedes, it moves away from the wavefronts it has already emitted, the gap becomes $(v + v_s)/f$, and the denominator of the frequency gains a plus sign. As $v_s$ approaches $v$ from below on an approach, $\lambda'$ shrinks towards zero and $f'$ grows without a finite limit. At $v_s \ge v$ the source keeps up with, or overtakes, its own forward wavefronts. The orderly train of cycles assumed here does not form in front of the source; a shock wave does. [[#eq-doppler]] is not a recipe for that regime.

Both motions at once: the moving source sets the wavelength $\lambda' = (v - v_s)/f$ in the air, and the moving observer meets wavefronts of that wavelength at closing speed $v + v_o$. Therefore

$$
f' = \frac{v + v_o}{\lambda'} = f\,\frac{v + v_o}{v - v_s},
$$

which is [[#eq-doppler]]. Each speed appears in only one place. Swapping them, or replacing the formula by a single relative speed $(v + v_o + v_s)$, gets the physics wrong: motion of the source changes the wavelength, motion of the observer changes the rate of meeting an existing wavelength, and those are not the same operation. The air, not the line between source and observer, is the reference for $v$, $v_s$ and $v_o$.
:::

| Motion, speeds positive | Frequency heard |
|---|---|
| Source approaches at $v_s$, observer at rest | $f\, v/(v - v_s)$ |
| Source recedes at $v_s$, observer at rest | $f\, v/(v + v_s)$ |
| Observer approaches at $v_o$, source at rest | $f\, (v + v_o)/v$ |
| Observer recedes at $v_o$, source at rest | $f\, (v - v_o)/v$ |

The combined approach multiplies the first factor by the third and recovers [[#eq-doppler]].

::: example A source approaching at $30\,\mathrm{m/s}$ {#ex-doppler}
A source emits $f = 500\,\mathrm{Hz}$. The speed of sound in the air is $v = 340\,\mathrm{m/s}$. The source moves towards an observer at rest in the air, at $v_s = 30\,\mathrm{m/s}$. Find the frequency heard. Then find the frequency if, instead, the source recedes at the same speed.
::: solution
The observer is at rest, so $v_o = 0$, and the source approaches, so [[#eq-doppler]] is

$$
f' = 500\times\frac{340}{340 - 30} = 500\times\frac{340}{310} = 500\times\frac{34}{31} = \frac{17000}{31} = 548.4\,\mathrm{Hz}.
$$

To the nearest hertz this is $548\,\mathrm{Hz}$. The pitch rises. The wavelength in front of the source is $(340 - 30)/500 = 0.620\,\mathrm{m}$, shorter than the rest wavelength $340/500 = 0.680\,\mathrm{m}$, and the observer, standing in the air, converts that shorter wavelength at speed $340\,\mathrm{m/s}$ into the higher frequency. $548.4/500 = 1.097$, the same factor $340/310$.

If the source recedes at $30\,\mathrm{m/s}$, the sign in the denominator flips:

$$
f' = 500\times\frac{340}{340 + 30} = 500\times\frac{340}{370} = 459.5\,\mathrm{Hz}.
$$

To the nearest hertz this is $459\,\mathrm{Hz}$. The downward shift is not equal to the upward one: the mean of $548.4$ and $459.5$ is $503.9\,\mathrm{Hz}$, not $500\,\mathrm{Hz}$. Putting the $30\,\mathrm{m/s}$ in the observer's slot instead, $500\times(340 + 30)/340 = 544\,\mathrm{Hz}$, answers a different experiment.
:::
:::

::: warning Sound is not light, and decibels are not a linear scale
[[#eq-doppler]] uses a material medium with a definite speed $v$ relative to that medium. Light in vacuum has no such medium. The relativistic Doppler shift for light is a different formula, built from time dilation and the invariance of $c$, and it must not be obtained by writing $c$ in place of $v$ in [[#eq-doppler]]. The signs are part of the statement. If the source recedes, $v - v_s$ in the denominator becomes $v + v_s$; leaving the approach formula in place for a departing source gives a pitch that goes the wrong way.

Decibels are logarithms. Two incoherent equal sources raise the level by $10\log_{10} 2 = 3.01\,\mathrm{dB}$, about $3\,\mathrm{dB}$, not by a doubling of the reading. Seventy decibels from each of two incoherent machines is about $73\,\mathrm{dB}$ together, not $140\,\mathrm{dB}$. And $0\,\mathrm{dB}$ means $I = I_0$, not $I = 0$: the logarithm in [[#eq-db]] is not defined at zero intensity.
:::

::: history Laplace's factor, and a trumpet on a train
Newton, in the *Principia* (1687), took the speed of sound to be $\sqrt{P/\rho}$, the isothermal value of [[#thm-speed]]. The number falls short of the speed measured in air. The repair is not a different wave equation. In 1816 Laplace replaced the isothermal bulk modulus by the adiabatic modulus $\gamma P$, which is [[#lem-moduli]], and the square root then sits where measured speeds sit. The physical reason, that a sound wave does not have time to exchange heat, is the one given above.

The frequency shift is later. In 1842 Christian Doppler argued that motion of a source or of an observer changes the received frequency, for the coloured light of double stars as well as for sound. Buys Ballot tested the acoustic prediction in 1845 with trumpeters on a moving train: the pitch rose on approach and fell as the train receded, as [[#eq-doppler]] requires. The same formula does not become a formula for light by renaming the wave.
:::

## Where this leads

The open pipe shares its frequency list with the fixed string of [[oscillations/superposition]], but the end conditions are opposite: antinode against node. Beats and coherent addition are already proved there; the decibel is only the logarithm of the resulting intensity. [[#eq-doppler]] does not carry over to light in [[optics]], and it stops being a linear wavetrain once the source reaches $v$.

::: summary
- A longitudinal wave in a fluid travels at $v = \sqrt{B/\rho}$. The derivation is Newton's second law on a thin slice, with the excess pressure tied to the compression by the bulk modulus.
- For an ideal gas the isothermal modulus is $P$ and the adiabatic modulus is $\gamma P$. Ordinary sound is adiabatic, so $v = \sqrt{\gamma P/\rho} = \sqrt{\gamma RT/M}$, with $M$ in $\mathrm{kg/mol}$ and $T$ in kelvin.
- With $\gamma = 1.40$, $M = 0.02896\,\mathrm{kg/mol}$ and $T = 293\,\mathrm{K}$, the speed is $343.2\,\mathrm{m/s}$. Newton's isothermal value is $290.0\,\mathrm{m/s}$, low by $\sqrt{1.40} = 1.183$.
- Intensity is average power per area. The level is $\beta = 10\log_{10}(I/I_0)$ with $I_0 = 10^{-12}\,\mathrm{W/m^2}$. A factor of ten in $I$ is $+10\,\mathrm{dB}$. A factor of two is $+3.01\,\mathrm{dB}$.
- In free space without absorption, $I = P/(4\pi r^2)$. Doubling the distance costs $6.02\,\mathrm{dB}$.
- A closed end is a displacement node and a pressure antinode. An open end is a pressure node and a displacement antinode. Open pipes sound $nv/(2L)$. Pipes closed at one end sound only the odd multiples of $v/(4L)$.
- For sound, $f' = f(v + v_o)/(v - v_s)$ when both speeds point so as to close the gap. Recession flips the corresponding sign. The formula is not the Doppler formula for light, and it stops applying when the source reaches $v$.
- An approach at $30\,\mathrm{m/s}$ with $v = 340\,\mathrm{m/s}$ and $f = 500\,\mathrm{Hz}$ raises the pitch to $548.4\,\mathrm{Hz}$. The receding source at the same speed gives $459.5\,\mathrm{Hz}$, not a shift of equal size.
:::

## Exercises {#exercises}

::: exercise Level of a faint intensity {level=1 check="40"}
A wave has intensity $I = 1.00\times 10^{-8}\,\mathrm{W/m^2}$. Find the sound intensity level in decibels.
::: solution
[[#eq-db]] with this intensity is

$$
\beta = 10\log_{10}\frac{1.00\times 10^{-8}}{1.00\times 10^{-12}} = 10\log_{10}(10^{4}) = 40.0\,\mathrm{dB}.
$$

The exponent $4$ became the tens of decibels, which is [[#cor-ten]] applied four times to $I_0$. The answer is not $10^{-8}$ itself, and it is not $80$: a factor of $10^{8}$ would be $80\,\mathrm{dB}$, but the ratio to $I_0$ is $10^{4}$, not $10^{8}$.
:::
:::

::: exercise Fundamental of an open pipe {level=1 check="200"}
A pipe of length $0.860\,\mathrm{m}$ is open at both ends. The speed of sound is $344\,\mathrm{m/s}$, given for this exercise. Find the fundamental frequency in hertz.
::: solution
[[#eq-open]] with $n = 1$ gives

$$
f_1 = \frac{v}{2L} = \frac{344}{2\times 0.860} = \frac{344}{1.72} = 200\,\mathrm{Hz}.
$$

The wavelength is $2L = 1.72\,\mathrm{m}$, and $v/\lambda = 344/1.72 = 200\,\mathrm{Hz}$ is the same result. The speed $344\,\mathrm{m/s}$ was stated in the question. It is not the square root computed in [[#ex-air]], which was $343.2\,\mathrm{m/s}$. The second harmonic, not required, is $400\,\mathrm{Hz}$.
:::
:::

::: exercise Fundamental of a closed pipe {level=1 check="100"}
The pipe of the previous exercise, length $0.860\,\mathrm{m}$, is now closed at one end and left open at the other. The speed is again $344\,\mathrm{m/s}$. Find the fundamental frequency in hertz.
::: solution
[[#eq-closed]] with $n = 1$ gives a quarter-wave fundamental,

$$
f_1 = \frac{v}{4L} = \frac{344}{4\times 0.860} = \frac{344}{3.44} = 100\,\mathrm{Hz}.
$$

Closing one end halves the fundamental, from $200\,\mathrm{Hz}$ to $100\,\mathrm{Hz}$, because the pipe now holds $\lambda/4$ rather than $\lambda/2$. The next frequency the closed pipe supports is $300\,\mathrm{Hz}$, not $200\,\mathrm{Hz}$. That distinction is [[#thm-pipe]], and it is the subject of a later exercise.
:::
:::

::: exercise An observer walking towards the source {level=2 check="500*(340+20)/340"}
A stationary source emits $500\,\mathrm{Hz}$. The speed of sound is $340\,\mathrm{m/s}$. An observer moves straight towards the source at $20\,\mathrm{m/s}$ through still air. Find the frequency heard, in hertz.
::: solution
The source is at rest, so $v_s = 0$. The observer moves towards the source, so $v_o = 20\,\mathrm{m/s}$ enters with a plus sign in the numerator of [[#eq-doppler]]:

$$
f' = 500\times\frac{340 + 20}{340} = 500\times\frac{360}{340} = 529.4\,\mathrm{Hz}.
$$

The exact value of that arithmetic is $500\times 360/340 = 9000/17 = 529.41\,\mathrm{Hz}$. The wavelength is unchanged, because the source is at rest in the air: $\lambda = 340/500 = 0.680\,\mathrm{m}$. The observer simply meets wavefronts at $360\,\mathrm{m/s}$ instead of $340\,\mathrm{m/s}$, and $360/0.680 = 529.4\,\mathrm{Hz}$. Using the source formula $500\times 340/(340 - 20) = 531.3\,\mathrm{Hz}$ would describe a moving source and a still observer, which is a different experiment and a different number.
:::
:::

::: exercise Two incoherent machines {level=2 check="70+10*log10(2)"}
Two incoherent machines each produce a sound intensity level of $70.0\,\mathrm{dB}$ at the same point. Find the level when both run together, in decibels.
::: solution
Incoherent intensities add. Each machine at $70.0\,\mathrm{dB}$ has intensity $I = 10^{-5}\,\mathrm{W/m^2}$, from the reverse of the calculation in [[#ex-db]]. Together,

$$
I_{\mathrm{tot}} = 2.00\times 10^{-5}\,\mathrm{W/m^2}.
$$

The level is

$$
\beta = 10\log_{10}\frac{2.00\times 10^{-5}}{10^{-12}} = 10\log_{10}(2.00\times 10^{7}) = 70 + 10\log_{10} 2 = 73.01\,\mathrm{dB}.
$$

The numerical value of $10\log_{10} 2$ is $3.010$, so $\beta = 73.01\,\mathrm{dB}$. Doubling the decibel reading would give $140\,\mathrm{dB}$, which is $10^{14}$ times $I_0$ and $10^{7}$ times the intensity of one machine. That is not what two machines do. Coherent addition is not what this exercise asks either: if the machines were coherent and in phase, the amplitudes would add, the intensity would quadruple, and the rise would be $6.02\,\mathrm{dB}$ rather than $3.01\,\mathrm{dB}$.
:::
:::

::: exercise The frequency a closed pipe does not have {level=2 check="300"}
A pipe of length $0.860\,\mathrm{m}$, closed at one end, is filled with air in which the speed of sound is $344\,\mathrm{m/s}$. A list of its first three resonant frequencies is offered as $100\,\mathrm{Hz}$, $200\,\mathrm{Hz}$ and $300\,\mathrm{Hz}$. Which of these, if any, is the second frequency the pipe actually supports? Give that frequency in hertz, and say what is wrong with the list.
::: solution
The fundamental is $v/(4L) = 344/(4\times 0.860) = 100\,\mathrm{Hz}$, so the first entry is right. [[#eq-closed]] then gives

$$
f_2 = 3\times 100 = 300\,\mathrm{Hz}, \qquad f_3 = 5\times 100 = 500\,\mathrm{Hz}.
$$

The second frequency actually supported is $300\,\mathrm{Hz}$. The offered list has replaced the odd series $100$, $300$, $500$ by the consecutive series $100$, $200$, $300$. The frequency $200\,\mathrm{Hz}$ would require $L = \lambda/2$ with a displacement node at both ends, or a displacement antinode at both ends. A closed end and an open end cannot play that role at once: one demands a displacement node and the other a displacement antinode, and the shortest pattern that satisfies both is $\lambda/4$, after which the next is $3\lambda/4$. Twice the fundamental is the signature of the wrong boundary condition.
:::
:::

::: exercise From the modulus to the temperature formula {level=3}
Starting from $v = \sqrt{B/\rho}$, derive $v = \sqrt{\gamma RT/M}$ for a reversible adiabatic sound wave in an ideal gas. State the thermodynamic path that produces $B = \gamma P$, and explain in physical terms why the isothermal path $B = P$ is the wrong one for ordinary sound. Do not assume [[#eq-ideal]] as a starting point; the speed formula in terms of $B$ may be used as known.
::: hint
Take logarithms of $PV^{\gamma} = \mathrm{constant}$ before differentiating. The ideal-gas law is needed only to replace $P/\rho$ by $RT/M$. Keep $M$ in $\mathrm{kg/mol}$.
:::
::: solution
The reversible adiabatic condition on a fixed mass of ideal gas is $PV^{\gamma} = \mathrm{constant}$. Taking logarithms, $\ln P + \gamma\ln V$ is constant, so

$$
\frac{\dd P}{P} + \gamma\frac{\dd V}{V} = 0, \qquad \dd P = -\gamma P\frac{\dd V}{V}.
$$

The bulk modulus along that path is

$$
B = -\frac{\dd P}{\dd V/V} = \gamma P.
$$

Therefore

$$
v = \sqrt{\frac{B}{\rho}} = \sqrt{\frac{\gamma P}{\rho}}.
$$

For an ideal gas, $PV = nRT$ and the density is $\rho = nM/V$, so $\rho = MP/(RT)$ and $P/\rho = RT/M$. Substitution produces

$$
v = \sqrt{\frac{\gamma RT}{M}}.
$$

$T$ must be the absolute temperature, because that is the temperature in $PV = nRT$. $M$ must be the molar mass in the same mass unit used to make $\rho$ a mass density; with $R$ in $\mathrm{J\,mol^{-1}\,K^{-1}}$, $M$ is in $\mathrm{kg/mol}$.

The isothermal path sets $PV$ constant and gives $B = P$, without $\gamma$. It assumes the gas exchanges heat fast enough to hold its temperature fixed. A sound wave does not: the period is short compared with the time for heat to diffuse across a wavelength, so the compression stays adiabatic. The isothermal speed is low by exactly $\sqrt{\gamma}$.
:::
:::

::: exercise Both moving, and the receding source {level=3}
Derive the heard frequency when the source moves towards the observer at speed $v_s$ and the observer moves towards the source at speed $v_o$, starting from the separate effects of a moving source and of a moving observer. Then change only the source motion to a recession at speed $v_s$, and write the new formula. State the inequality on $v_s$ that the derivation uses, and what physical picture fails when the inequality is violated.
::: hint
Let the source fix the wavelength in the air first. Then let the observer meet that wavelength at the appropriate closing speed. Do not add $v_s$ and $v_o$ into a single relative velocity.
:::
::: solution
While the source moves towards the observer at $v_s$, it travels $v_s T$ in one period $T = 1/f$ of emission, and the forward wavefront travels $vT$ through the air. The wavelength laid down in the air on the observer's side is

$$
\lambda' = (v - v_s)T = \frac{v - v_s}{f}.
$$

This step uses $v_s < v$. Otherwise $\lambda'$ is not a positive gap in front of the source. The observer, moving towards the source at $v_o$, approaches those wavefronts at speed $v + v_o$ relative to the air's wave speed $v$. The frequency heard is the closing speed divided by the wavelength the source has set:

$$
f' = \frac{v + v_o}{\lambda'} = f\,\frac{v + v_o}{v - v_s}.
$$

That is [[#eq-doppler]]. The source entered only by changing $\lambda$, and the observer entered only by changing the rate at which a fixed $\lambda$ is met. Adding the two speeds into one Galilean relative velocity, and then using either the source rule or the observer rule alone, drops one of those mechanisms.

If instead the source recedes at speed $v_s$, the source moves away from the wavefronts already emitted. The gap becomes $\lambda' = (v + v_s)/f$. The observer is unchanged, still closing at $v + v_o$ if we keep the observer moving towards the place where the sound is coming from. Then

$$
f' = f\,\frac{v + v_o}{v + v_s}.
$$

Recession of the source changes the sign in front of $v_s$ and nowhere else. The approach step used $v_s < v$ so that $\lambda'$ stays positive. When $v_s \ge v$ the source keeps pace with or overtakes its own forward sound, no orderly wavetrain of that form exists, and [[#eq-doppler]] does not apply.
:::
:::
