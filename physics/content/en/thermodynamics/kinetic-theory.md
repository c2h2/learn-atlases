A thermometer and a pressure gauge do not know that a gas is made of molecules. The ideal-gas law in [[thermodynamics/temperature]] and the internal energy in [[thermodynamics/first-law]] treat the sample as a single object with a pressure, a volume and a temperature. Kinetic theory takes the other view. The gas is a vast number of molecules in motion, the pressure on a wall is the average rate at which those molecules deliver momentum, and the temperature is a measure of the mean kinetic energy of that motion. The two views have to agree wherever they overlap, and the agreement fixes the constant that connects them.

This chapter derives that agreement for a dilute gas. We obtain $P = \tfrac13 n_V m \langle v^2 \rangle$ from elastic collisions with a wall, match it to $P = n_V k_B T$, and read off $\tfrac12 m \langle v^2 \rangle = \tfrac32 k_B T$. Equipartition then says how that energy is shared when a molecule can rotate or vibrate. Maxwell's distribution says how the speeds are spread out, which is a different question from what their mean square is. The wall flux that controls effusion depends on the mean speed, not on the root mean square, and those two averages are not interchangeable.

Throughout, $k_B = 1.380649\times 10^{-23}\,\mathrm{J/K}$ is Boltzmann's constant, $N_A = 6.02214076\times 10^{23}\,\mathrm{mol^{-1}}$ is Avogadro's number, and $R = N_A k_B = 8.314462618\,\mathrm{J/(mol\cdot K)}$. The number of moles is $n$, the number of molecules is $N = n N_A$, and the number density is written $n_V = N/V$ so that it cannot be confused with $n$. Work, when it appears, follows the thermal sign of [[thermodynamics/first-law]]: $\Delta U = Q + W$ with $W$ the work done on the system. The mechanical identity $W_{\mathrm{net}} = \Delta K$ in [[mechanics/work-energy]] is a different ledger, for a single particle and the work done by the net force. Do not import its sign into a first-law problem.

## The model

The derivation needs a definite mechanical picture. We state it before any average is taken, because each later formula fails when one of these restrictions is dropped.

::: definition Kinetic model of a dilute gas {#def-model}
A **dilute gas** in the sense of this chapter is a collection of $N$ molecules, each of mass $m$, in a container of volume $V$, such that:

1. $N$ is large, and the volume of the molecules themselves is negligible beside $V$.
2. Between collisions the molecules exert no forces on one another, so the energy of the gas is purely kinetic.
3. Collisions with the walls, and with each other, are elastic.
4. In equilibrium there is no preferred direction: the gas as a whole is at rest, and the three axes are equivalent.

The **number density** is $n_V = N/V$.
:::

The first condition is what "dilute" means here. Air at ordinary pressure satisfies it well enough that the ideal-gas law is accurate to a part in a thousand; a liquid does not. The second condition is why the internal energy of an ideal gas depends only on temperature: there is no potential energy that could remember the volume. That is the microscopic reading of Joule's free-expansion result in [[thermodynamics/first-law]]. The third condition keeps the speeds from decaying; a wall that absorbed kinetic energy would cool the gas, and we are describing equilibrium, not a leak. The fourth condition excludes a wind. If the gas has a bulk velocity, the averages below are taken in the rest frame of the gas.

Nothing in the list says that every molecule has the same speed. Early versions of the argument sometimes assumed that, and the pressure formula happens to survive the assumption. The flux of molecules through a hole does not. We keep a distribution from the start and write averages explicitly.

::: definition Mean square speed {#def-mean-square}
If the molecules have speeds $v_1,\ldots,v_N$, the **mean square speed** is

$$
\langle v^2 \rangle = \frac{1}{N}\sum_{i=1}^{N} v_i^2,
$$ {#eq-mean-square}

and the **root mean square speed** is $v_{\mathrm{rms}} = \sqrt{\langle v^2 \rangle}$. The mean of the square is not the square of the mean: $\langle v^2 \rangle \neq \langle v \rangle^2$ unless every speed is the same.
:::

The same bracket denotes an average over molecules, or, equivalently, an average over the probability distribution of one molecule in a large sample. For a component, $\langle v_x^2 \rangle$ is the average of $v_x^2$ over all molecules, including those moving away from a given wall.

::: intuition Impacts, not a static push
A molecule in this model crosses the container in a straight line until it hits something. The wall feels a force only during the collisions. Between impacts the force is zero. A steady pressure is what a gauge records when the impacts are so frequent that the jerks blur into a constant force. The calculation below is the average of those jerks, not a new kind of force.
:::

## Pressure as a momentum flux

Consider a small patch of wall of area $A$, fixed in the laboratory, with its outward normal along the positive $x$-axis. A molecule that hits it with $v_x > 0$ rebounds elastically. The wall is at rest and enormously heavier than the molecule, so the molecule's kinetic energy is unchanged and the normal component of its velocity reverses: $v_x \to -v_x$. The molecule's $x$-momentum therefore changes by $-m v_x - m v_x = -2 m v_x$. By the impulse law in [[mechanics/momentum]], the impulse delivered to the wall is $+2 m v_x$, outward.

Molecules arrive continually. Let $n(v_x)\,\dd v_x$ be the number of molecules per unit volume whose $x$-velocity lies between $v_x$ and $v_x + \dd v_x$, so that $\int_{-\infty}^{\infty} n(v_x)\,\dd v_x = n_V$. In a short interval $\dd t$ the molecules with a given positive $v_x$ that strike the patch are those within a distance $v_x\,\dd t$ of it, and hence in a volume $A v_x\,\dd t$. Their number is $n(v_x)\,\dd v_x\, A v_x\,\dd t$.

::: theorem Pressure of a dilute gas {#thm-pressure}
For a gas satisfying [[#def-model]], the pressure on a wall is

$$
P = \tfrac13 n_V m \langle v^2 \rangle.
$$ {#eq-pressure}

Equivalently, $P = \tfrac13 \rho\, \langle v^2 \rangle$, where $\rho = n_V m$ is the mass density.
:::

::: proof
The momentum delivered to the patch in time $\dd t$, counting every $v_x > 0$, is

$$
\dd p = \int_{v_x > 0} (2 m v_x)\, n(v_x)\, A v_x\,\dd t\,\dd v_x.
$$

The average force on the patch is $\dd p/\dd t$, and the pressure is that force divided by $A$:

$$
P = \int_{v_x > 0} 2 m v_x^2\, n(v_x)\,\dd v_x.
$$

Equilibrium with no preferred direction means that $n(v_x)$ is an even function: as many molecules have $-v_x$ as have $v_x$. The integrand $v_x^2 n(v_x)$ is therefore even, and the positive half of the line carries half of the full integral,

$$
\int_{v_x > 0} v_x^2\, n(v_x)\,\dd v_x = \tfrac12 \int_{-\infty}^{\infty} v_x^2\, n(v_x)\,\dd v_x = \tfrac12 n_V \langle v_x^2 \rangle.
$$

The factor $2$ in the pressure integral cancels the $\tfrac12$, and

$$
P = n_V m \langle v_x^2 \rangle.
$$ {#eq-pressure-x}

That is the one-direction result: flux times momentum transfer $2 m v_x$, averaged. Isotropy, the fourth clause of [[#def-model]], equates the three axes. Since $v^2 = v_x^2 + v_y^2 + v_z^2$,

$$
\langle v^2 \rangle = \langle v_x^2 \rangle + \langle v_y^2 \rangle + \langle v_z^2 \rangle = 3\langle v_x^2 \rangle,
$$

so $\langle v_x^2 \rangle = \tfrac13 \langle v^2 \rangle$. Substituting into [[#eq-pressure-x]] gives [[#eq-pressure]]. The density form is the same equation with $\rho = n_V m$.

Intermolecular collisions do not change the result in equilibrium. A collision that deflects one molecule away from the patch is matched, on average, by a collision that deflects another molecule towards it. The distribution $n(v_x)$ already describes the gas that is actually next to the wall.
:::

The factor $\tfrac13$ is not a fudge. One third comes from using a single axis, and the $2$ in the momentum transfer is cancelled by the fact that only half the molecules are moving towards the wall. A common slip is to use $m v_x$ instead of $2 m v_x$, forgetting that reversal changes the momentum by twice the incoming value, or to average $v_x^2$ only over the molecules that hit and then forget that $\langle v_x^2 \rangle$ was defined over everyone.

The shape of the container never entered. In a cube of side $L$ the same relation follows from a round trip: a molecule hits a given face once every $2L/v_x$ and delivers $2 m v_x$ each time, so the factor $2$ cancels and the average force is $m v_x^2/L$. Dividing by the face area $L^2$ again yields [[#eq-pressure-x]]. The cube is a convenience, not a restriction.

## Temperature and kinetic energy

The ideal-gas law, written for molecules rather than moles, is $P V = N k_B T$, or $P = n_V k_B T$. It is an experimental statement about the absolute temperature, as fixed in [[thermodynamics/temperature]]. Kinetic theory has produced a second expression for the same pressure. They can hold together only if the mean kinetic energy is tied to $T$.

::: theorem Translational kinetic energy {#thm-ke}
For a dilute gas obeying [[#eq-pressure]] and the ideal-gas law $P = n_V k_B T$,

$$
\tfrac12 m \langle v^2 \rangle = \tfrac32 k_B T,
$$ {#eq-ke}

and therefore

$$
v_{\mathrm{rms}} = \sqrt{\frac{3 k_B T}{m}}.
$$ {#eq-vrms}

The translational kinetic energy of the whole sample is

$$
U_{\mathrm{trans}} = N\cdot\tfrac32 k_B T = \tfrac32 n R T.
$$ {#eq-utrans}
:::

::: proof
Equate the two formulae for $P$:

$$
\tfrac13 n_V m \langle v^2 \rangle = n_V k_B T.
$$

For $n_V \neq 0$ this is $\tfrac13 m \langle v^2 \rangle = k_B T$, and multiplying by $\tfrac32$ gives [[#eq-ke]]. The root mean square speed is the positive square root of $\langle v^2 \rangle = 3 k_B T/m$. Summing $\tfrac12 m \langle v^2 \rangle$ over $N$ molecules gives $U_{\mathrm{trans}} = \tfrac32 N k_B T$. The identity $N k_B = n R$ converts that into the molar form.
:::

Equation [[#eq-ke]] is the kinetic definition of absolute temperature for this model: $T$ is proportional to the mean translational kinetic energy per molecule, with the same value for every species of molecule at the same temperature. A hydrogen molecule and a nitrogen molecule in the same room have the same average translational energy and therefore very different typical speeds, because the masses differ. The lighter molecule is faster by $\sqrt{m_{\mathrm{heavy}}/m_{\mathrm{light}}}$.

If the gas is monatomic and the electronic degrees of freedom are frozen, translation is the whole of the internal energy. Then $U = \tfrac32 n R T$, the molar heat capacity at constant volume is $C_{V,m} = \tfrac32 R$, and $\gamma = C_{P,m}/C_{V,m} = \tfrac53$, using $C_{P,m} - C_{V,m} = R$ from [[thermodynamics/first-law]]. For any other gas, [[#eq-utrans]] is only the translational share. Rotation and vibration add further terms, which the next section counts.

Two readings are legitimate, and they should not be mixed in one sentence. This chapter takes the ideal-gas law from [[thermodynamics/temperature]] and reads [[#eq-ke]] off by comparison. Defining $T$ by [[#eq-ke]], and then deriving $P V = N k_B T$, is the route of [[statistical-mechanics/classical-gas]].

The speed of sound checks the scale of $v_{\mathrm{rms}}$. From $P = \tfrac13 \rho \langle v^2 \rangle$ and $v_{\mathrm{s}} = \sqrt{\gamma P/\rho}$ in [[oscillations/sound]],

$$
v_{\mathrm{s}}^2 = \gamma \frac{P}{\rho} = \gamma \frac{\langle v^2 \rangle}{3},
$$

so $v_{\mathrm{s}} = v_{\mathrm{rms}}\sqrt{\gamma/3}$. For $\gamma = 7/5$ the factor is $\sqrt{1.4/3} \approx 0.683$: sound is slower than the random molecular motion that has to carry it, but of the same order. The nitrogen numbers are in [[#ex-n2-speeds]].

## Equipartition

Translation gives three quadratic contributions, $\tfrac12 m v_x^2$, $\tfrac12 m v_y^2$ and $\tfrac12 m v_z^2$, and [[#eq-ke]] says that each of them averages to $\tfrac12 k_B T$. That pattern is general. It is the classical equipartition theorem, and it is the reason heat capacities come in multiples of $\tfrac12 R$ per mole.

The proof needs one integral, used again when the speed distribution is normalised. We record it separately.

::: lemma Gaussian integrals {#lem-gauss}
For any $b > 0$,

$$
\int_{-\infty}^{\infty} e^{-b q^2}\,\dd q = \sqrt{\frac{\pi}{b}},
$$ {#eq-gauss}

and

$$
\int_{-\infty}^{\infty} q^2 e^{-b q^2}\,\dd q = \tfrac12 \sqrt{\frac{\pi}{b^3}}.
$$ {#eq-gauss-q2}
:::

::: proof
Write $I(b) = \int_{-\infty}^{\infty} e^{-b x^2}\,\dd x$. Then

$$
I(b)^2 = \int_{-\infty}^{\infty}\int_{-\infty}^{\infty} e^{-b(x^2+y^2)}\,\dd x\,\dd y.
$$

In polar coordinates on the plane, $x^2 + y^2 = r^2$ and $\dd x\,\dd y = r\,\dd r\,\dd \theta$, with $\theta$ running from $0$ to $2\pi$ and $r$ from $0$ to $\infty$. The angular integral produces $2\pi$, and $\int_0^{\infty} e^{-b r^2} r\,\dd r = 1/(2b)$, so $I(b)^2 = 2\pi\cdot(1/(2b)) = \pi/b$. Hence $I(b) = \sqrt{\pi/b}$, the positive root.

Differentiate both sides with respect to $b$. For $b > 0$ the integral converges well enough that the derivative passes under the integral sign:

$$
\int_{-\infty}^{\infty} -q^2 e^{-b q^2}\,\dd q = \deriv{}{b}\left(\pi^{1/2} b^{-1/2}\right) = -\tfrac12 \sqrt{\frac{\pi}{b^3}}.
$$

Dropping the minus sign gives [[#eq-gauss-q2]].
:::

::: theorem Equipartition of one quadratic term {#thm-equipartition}
Suppose the energy of a molecule contains a term $\varepsilon = a q^2$ with $a > 0$, and that $q$ is a Cartesian momentum or a position coordinate which takes values on the whole real line. Suppose the probability density of $q$, in equilibrium at temperature $T$, is the Boltzmann weight of that term alone,

$$
p(q) = \frac{e^{-a q^2/(k_B T)}}{\int_{-\infty}^{\infty} e^{-a q^2/(k_B T)}\,\dd q}.
$$

Then the mean energy in that term is

$$
\langle a q^2 \rangle = \tfrac12 k_B T.
$$ {#eq-equipartition}
:::

::: proof
Set $b = a/(k_B T)$. The denominator is [[#eq-gauss]]. The numerator of the mean is $a$ times [[#eq-gauss-q2]], so

$$
\langle q^2 \rangle = \frac{\tfrac12 \sqrt{\pi/b^3}}{\sqrt{\pi/b}} = \frac{1}{2b} = \frac{k_B T}{2a}.
$$

Multiplying by $a$ gives $\tfrac12 k_B T$. The constant $a$ cancels: a stiffer spring or a heavier mass changes the spread of $q$ and leaves the mean energy untouched.
:::

The Boltzmann weight is an assumption at this stage, not a consequence of the wall collisions. It is the equilibrium distribution of classical statistical mechanics, derived in [[statistical-mechanics/canonical]]. What the theorem adds is the evaluation: once the weight is exponential in the energy, every quadratic term contributes the same $\tfrac12 k_B T$, independent of the coefficient in front of the square.

Count the quadratic terms in a molecule, written $f$ and called the number of degrees of freedom in this context.

Translation always contributes three, and therefore $\tfrac32 k_B T$ per molecule, in agreement with [[#eq-ke]]. A monatomic gas has $f = 3$ at ordinary temperatures. Its molar internal energy and heat capacities are

$$
U = \tfrac32 n R T, \qquad C_{V,m} = \tfrac32 R, \qquad C_{P,m} = \tfrac52 R, \qquad \gamma = \tfrac53.
$$

A diatomic molecule has, in addition, rotation. A classical rigid body would have three rotational quadratic terms, $\tfrac12 I_1\omega_1^2$ and its two partners. For a diatomic molecule one of the three principal moments is tiny: the nuclei lie on the axis, and the moment about that axis is only the moment of the electrons. The corresponding energy spacing is so large that this degree of freedom is not excited at any temperature where the molecule remains intact. The working count is two rotational terms, not three. At room temperature, where those two are fully excited and vibration is not,

$$
f = 5, \qquad U = \tfrac52 n R T, \qquad C_{V,m} = \tfrac52 R, \qquad \gamma = \tfrac75 = 1.40.
$$

Vibration of a diatomic molecule, treated as a harmonic oscillator along the bond, contributes two further quadratic terms: the kinetic energy of the relative motion and the potential energy of the stretch. When both are fully excited, $f = 7$, $C_{V,m} = \tfrac72 R$ and $\gamma = 9/7$. "Fully excited" is a classical phrase. Quantum mechanics freezes a mode when the level spacing is large compared with $k_B T$.

For nitrogen the vibrational wavenumber is $2359\,\mathrm{cm^{-1}}$. The corresponding temperature is $\theta_{\mathrm{vib}} = hc\tilde\nu/k_B$. With $h = 6.62607015\times 10^{-34}\,\mathrm{J\,s}$, $c = 2.99792458\times 10^{8}\,\mathrm{m/s}$ and $\tilde\nu = 2359\times 100\,\mathrm{m^{-1}}$,

$$
\theta_{\mathrm{vib}} = 3394\,\mathrm{K}.
$$

At $300\,\mathrm{K}$ the Boltzmann factor $e^{-\theta_{\mathrm{vib}}/T}$ is about $1.22\times 10^{-5}$. Vibration adds essentially nothing to the heat capacity of $\mathrm{N_2}$ in a room. The rotational constant of $\mathrm{N_2}$ is about $1.9987\,\mathrm{cm^{-1}}$, and the same conversion gives $\theta_{\mathrm{rot}} = 2.88\,\mathrm{K}$. Room temperature is far above that, so the two rotational terms take their full classical share. This is why the adiabats of the first-law chapter use $\gamma = 1.40$ for air and for nitrogen at ordinary temperatures, and why that value is not a law of nature at every temperature. Heat a diatomic gas enough and $\gamma$ falls towards $9/7$ as vibration switches on. The switch is gradual, and equipartition describes the two plateaus, not the curve between them.

| Gas, ordinary temperature | $f$ | $C_{V,m}$ | $\gamma$ |
|---|---|---|---|
| monatomic | $3$ | $\tfrac32 R$ | $\tfrac53$ |
| diatomic, vibration frozen | $5$ | $\tfrac52 R$ | $\tfrac75$ |
| diatomic, vibration fully on | $7$ | $\tfrac72 R$ | $\tfrac97$ |

The table is the classical count. It does not replace a measured heat capacity when the temperature sits between the plateaus.

## The distribution of speeds

Equipartition fixes $\langle v^2 \rangle$ and says nothing about how many molecules are slow. Effusion, the Doppler width of a spectral line, and the rate of a collision all ask for a distribution. Maxwell gave it in 1860.

The velocity distribution comes from the Boltzmann weight of the translational energy, $\tfrac12 m(v_x^2 + v_y^2 + v_z^2)$, together with the normalisation [[#eq-gauss]] applied once to each component. The probability of finding the velocity in a small box $\dd v_x\,\dd v_y\,\dd v_z$ is

$$
\left(\frac{m}{2\pi k_B T}\right)^{3/2} \exp\left(-\frac{m(v_x^2+v_y^2+v_z^2)}{2 k_B T}\right) \dd v_x\,\dd v_y\,\dd v_z.
$$

The exponential is the Boltzmann factor. The prefactor is what makes the three Gaussian integrals equal to one. This is a distribution over the velocity vector. A speed measurement throws away the direction. The vectors with speed between $v$ and $v + \dd v$ fill a spherical shell of radius $v$ and thickness $\dd v$, and the area of that shell is $4\pi v^2$. Multiplying by the shell's volume produces the distribution of the speed.

::: definition Maxwell speed distribution {#def-maxwell}
In equilibrium at temperature $T$, the probability that a molecule of mass $m$ has speed between $v$ and $v + \dd v$ is $f(v)\,\dd v$, where

$$
f(v) = 4\pi v^2 \left(\frac{m}{2\pi k_B T}\right)^{3/2} \exp\left(-\frac{m v^2}{2 k_B T}\right)
$$ {#eq-maxwell}

for $v \geq 0$, and $f(v) = 0$ for $v < 0$. The factor $4\pi v^2$ is the geometrical shell. The exponential is the Boltzmann factor of the kinetic energy.
:::

The most probable speed is the maximum of $f$, not the maximum of the exponential. The exponential alone would peak at $v = 0$, but the shell area vanishes there, and $f(0) = 0$. There is no volume in velocity space at the origin, so a molecule almost never has speed exactly zero even though zero is the cheapest energy.

::: proposition Three characteristic speeds {#prop-speeds}
For the distribution [[#eq-maxwell]], the most probable speed, the mean speed and the root mean square speed are

$$
v_p = \sqrt{\frac{2 k_B T}{m}}, \qquad
\langle v \rangle = \sqrt{\frac{8 k_B T}{\pi m}}, \qquad
v_{\mathrm{rms}} = \sqrt{\frac{3 k_B T}{m}}.
$$ {#eq-three-speeds}

They stand in the order $v_p < \langle v \rangle < v_{\mathrm{rms}}$.
:::

::: proof
Write $\alpha = m/(2 k_B T)$, so that $f(v) = 4\pi v^2 (\alpha/\pi)^{3/2} e^{-\alpha v^2}$ and $v_p$ is still to be found. For $v > 0$ set

$$
\deriv{}{v}\ln f = \frac{2}{v} - 2\alpha v.
$$

The derivative vanishes at $v^2 = 1/\alpha$, that is $v = \sqrt{2 k_B T/m}$. For smaller $v$ the derivative of $\ln f$ is positive, and for larger $v$ it is negative, so the stationary point is a maximum. That is $v_p$.

The mean speed is $\langle v \rangle = \int_0^{\infty} v f(v)\,\dd v$. The substitution $u = v^2$ gives $\int_0^{\infty} v^3 e^{-\alpha v^2}\,\dd v = 1/(2\alpha^2)$, and therefore

$$
\langle v \rangle = 4\pi \left(\frac{\alpha}{\pi}\right)^{3/2} \cdot \frac{1}{2\alpha^2} = \frac{2}{\sqrt{\pi\alpha}} = \sqrt{\frac{8 k_B T}{\pi m}},
$$

where the last step uses $1/\alpha = 2 k_B T/m$. The root mean square speed was already obtained in [[#eq-vrms]] from equipartition, without this distribution; computing $\int_0^{\infty} v^2 f(v)\,\dd v$ returns the same $3 k_B T/m$.

To order them, compare the squares, which are $2$, $8/\pi$ and $3$, in units of $k_B T/m$. Since $8/\pi \approx 2.546$ lies strictly between $2$ and $3$, and all three speeds are positive, $v_p < \langle v \rangle < v_{\mathrm{rms}}$. The ratios are exact:

$$
\frac{\langle v \rangle}{v_p} = \frac{2}{\sqrt{\pi}}, \qquad
\frac{v_{\mathrm{rms}}}{v_p} = \sqrt{\frac{3}{2}}, \qquad
\frac{v_{\mathrm{rms}}}{\langle v \rangle} = \sqrt{\frac{3\pi}{8}}.
$$
:::

The distribution is not symmetric about its peak. A tail stretches out to high speed, where the exponential decays but never quite cuts off. That tail pulls the mean above the peak, and it pulls the root mean square, which weights $v^2$, further still. Raising the temperature does not change the shape once speed is measured in units of $v_p$: every Maxwellian is the same curve on that scale. Changing $T$ or $m$ only changes where $v_p$ sits in metres per second.

::: widget plot
f: x^2*exp(-x^2)
x: 0, 4
caption: The shape of the speed distribution in units where the most probable speed is 1. There is nothing to slide: on this scale the shape does not depend on temperature or mass. The peak is at $x = 1$, not at the rms, which sits near $1.22$.
:::

The plotted function is $x^2 e^{-x^2}$, which is [[#eq-maxwell]] with the constant factors removed and with $x = v/v_p$. Its maximum is at $x = 1$, by the same derivative as in the proof. The mean lies at $2/\sqrt{\pi} \approx 1.128$, and $v_{\mathrm{rms}}$ at $\sqrt{3/2} \approx 1.225$.

::: quiz
For a Maxwellian gas, which statement is right?
- [ ] The pressure depends on the square of the mean speed, $\langle v \rangle^2$
- [x] The pressure depends on the mean square speed, $\langle v^2 \rangle$, and $\langle v^2 \rangle$ is larger than $\langle v \rangle^2$
- [ ] The most probable speed is the largest of $v_p$, $\langle v \rangle$ and $v_{\mathrm{rms}}$
- [ ] Replacing the distribution by a single speed $v_{\mathrm{rms}}$ leaves both the pressure and the effusion rate unchanged
::: solution
[[#eq-pressure]] uses $\langle v^2 \rangle$. [[#prop-speeds]] puts $v_p$ at the bottom of the order, not the top, and the ratio $\langle v^2 \rangle/\langle v \rangle^2 = 3\pi/8 > 1$. A single speed equal to $v_{\mathrm{rms}}$ reproduces $\langle v^2 \rangle$ and therefore the pressure, but the effusion rate depends on $\langle v \rangle$, which is smaller. The last option fails for that reason; the details are in [[#prop-effusion]].
:::
:::

## Effusion, and what a single speed gets wrong

Pressure cares about momentum, so it cares about $v_x^2$. The number of molecules striking a wall cares about how often they arrive, which is a different average.

::: proposition Effusion flux {#prop-effusion}
The number of molecules striking unit area of wall in unit time, in equilibrium, is

$$
\Phi = \tfrac14 n_V \langle v \rangle = n_V \sqrt{\frac{k_B T}{2\pi m}}.
$$ {#eq-flux}

If a small hole is cut in the wall and the outside is vacuum, $\Phi$ is the number of molecules leaving per unit area per unit time, provided the hole is small enough that the gas next to it remains in equilibrium. This escape is called **effusion**.
:::

::: proof
Repeat the counting in the proof of [[#thm-pressure]], but add up molecules rather than momentum. The number crossing unit area in unit time is

$$
\Phi = \int_{v_x > 0} v_x\, n(v_x)\,\dd v_x.
$$

For the Maxwellian, the marginal density of $v_x$ is the single Gaussian $n(v_x) = n_V \sqrt{\alpha/\pi}\, e^{-\alpha v_x^2}$ with $\alpha = m/(2 k_B T)$. Then

$$
\int_0^{\infty} v_x e^{-\alpha v_x^2}\,\dd v_x = \frac{1}{2\alpha},
$$

and $\Phi = n_V \sqrt{\alpha/\pi}\cdot(1/(2\alpha)) = n_V/(2\sqrt{\pi\alpha})$. Substituting $\alpha$ produces $n_V\sqrt{k_B T/(2\pi m)}$. Comparing with [[#eq-three-speeds]] shows that this is exactly $\tfrac14 n_V \langle v \rangle$.
:::

At fixed pressure and temperature, $n_V = P/(k_B T)$ is the same for every ideal gas. The flux then depends on the gas only through $\langle v \rangle \propto 1/\sqrt{m}$. A light gas effuses faster than a heavy gas by the square root of the mass ratio. That is Graham's law for effusion. It is not a law for a wide open tap, where the gas flows as a fluid and the speed is set by pressure differences rather than by individual molecular flights.

A model in which every molecule has the single speed $v_{\mathrm{rms}}$, with directions still random, gives the correct pressure, because the pressure asks only for $\langle v^2 \rangle$ and that model has been built to match it. The same model gives a wall flux $n_V v_{\mathrm{rms}}/4$ instead of $n_V \langle v \rangle/4$. It overestimates the effusion rate by

$$
\frac{v_{\mathrm{rms}}}{\langle v \rangle} = \sqrt{\frac{3\pi}{8}} \approx 1.085.
$$

The two averages answer two different questions, which is the point of the warning below. A mean free path has the same structure. A molecule of effective diameter $d$ presents a target area $\pi d^2$. The relevant speed is the relative speed. For a Maxwellian the mean relative speed is $\sqrt{2}\,\langle v \rangle$, because the relative velocity of two independent molecules has twice the variance of one velocity, and the mean speed scales as the square root of that variance. The mean distance travelled between collisions is therefore

$$
\lambda = \frac{1}{\sqrt{2}\,\pi d^2 n_V}.
$$ {#eq-mfp}

The $\sqrt{2}$ is the relative-speed correction. Omitting it is a common simplification; it is not the equilibrium result.

::: warning Mean square, mean of the square, and a single speed
$\langle v^2 \rangle$ is not $\langle v \rangle^2$. Pressure uses the mean square. The ratio of the two for a Maxwellian is the fixed number $3\pi/8$, not $1$. A single speed equal to $v_{\mathrm{rms}}$ reproduces the pressure, because the pressure formula never asks for anything but $\langle v^2 \rangle$. It does not reproduce the effusion rate, which is proportional to $\langle v \rangle$. Do not insert $v_{\mathrm{rms}}$ into [[#eq-flux]].
:::

::: example Speeds in nitrogen at 300 K {#ex-n2-speeds}
A nitrogen molecule has mass $m = 4.65\times 10^{-26}\,\mathrm{kg}$. Take $T = 300\,\mathrm{K}$. Find $v_{\mathrm{rms}}$, $\langle v \rangle$ and $v_p$, and compare $v_{\mathrm{rms}}$ with the speed of sound in the same gas, using $\gamma = 1.40$.
::: solution
Use [[#eq-three-speeds]] with $k_B = 1.380649\times 10^{-23}\,\mathrm{J/K}$. First

$$
\frac{3 k_B T}{m} = \frac{3\times 1.380649\times 10^{-23}\times 300}{4.65\times 10^{-26}} = 2.67222\times 10^{5}\,\mathrm{m^2/s^2},
$$

so

$$
v_{\mathrm{rms}} = \sqrt{2.67222\times 10^{5}} = 516.9\,\mathrm{m/s}.
$$

The other two speeds are fixed by the ratios in [[#prop-speeds]]:

$$
\langle v \rangle = v_{\mathrm{rms}}\sqrt{\frac{8}{3\pi}} = 476.3\,\mathrm{m/s}, \qquad
v_p = v_{\mathrm{rms}}\sqrt{\frac{2}{3}} = 422.1\,\mathrm{m/s}.
$$

The mass is given to three significant figures, and so are the reported speeds once they are rounded: $517\,\mathrm{m/s}$, $476\,\mathrm{m/s}$ and $422\,\mathrm{m/s}$. The order is the one proved above, and the gaps are not small: the rms speed is about $22\%$ above the most probable speed.

The sound speed follows from $v_{\mathrm{s}} = v_{\mathrm{rms}}\sqrt{\gamma/3}$ with $\gamma = 1.40$:

$$
v_{\mathrm{s}} = 516.9\times\sqrt{\frac{1.40}{3}} = 353\,\mathrm{m/s}.
$$

The molar mass implied by the given molecular mass is $M = m N_A = 0.0280\,\mathrm{kg/mol}$, and $\sqrt{\gamma R T/M}$ returns the same $353\,\mathrm{m/s}$. Molecular speeds of a few hundred metres per second are ordinary, not exotic, at room temperature.
:::
:::

::: example Translational and rotational energy {#ex-energy}
A sample of $2.00\,\mathrm{mol}$ of nitrogen is held at $300\,\mathrm{K}$. Find the translational kinetic energy, the rotational energy according to the room-temperature count, and the total internal energy. Repeat the internal energy for $2.00\,\mathrm{mol}$ of helium at the same temperature.
::: solution
Translation does not care which gas it is. By [[#eq-utrans]],

$$
U_{\mathrm{trans}} = \tfrac32 n R T = \tfrac32 \times 2.00 \times 8.314462618 \times 300 = 7.483\times 10^{3}\,\mathrm{J}.
$$

Nitrogen at this temperature has $f = 5$: three translational terms and two rotational terms. The rotational share is two times $\tfrac12 n R T$, that is

$$
U_{\mathrm{rot}} = n R T = 2.00\times 8.314462618\times 300 = 4.989\times 10^{3}\,\mathrm{J}.
$$

The total is $U = \tfrac52 n R T = 1.247\times 10^{4}\,\mathrm{J}$. Helium is monatomic, so rotation does not contribute and $U = U_{\mathrm{trans}} = 7.483\times 10^{3}\,\mathrm{J}$. The two samples have the same translational energy and the same temperature; the nitrogen stores an extra $4.989\times 10^{3}\,\mathrm{J}$ in rotation. Vibration is omitted in both, for the reason given under [[#thm-equipartition]]: for nitrogen, $\theta_{\mathrm{vib}}$ is thousands of kelvin.
:::
:::

::: example Mean free path in nitrogen {#ex-mfp}
Nitrogen at $T = 300\,\mathrm{K}$ and $P = 1.01325\times 10^{5}\,\mathrm{Pa}$ has the molecular mass of [[#ex-n2-speeds]]. Adopt an effective hard-sphere diameter $d = 3.70\times 10^{-10}\,\mathrm{m}$. Estimate $n_V$, the mean free path, and the mean time between collisions.
::: solution
The number density follows from $P = n_V k_B T$, not from a count of moles:

$$
n_V = \frac{P}{k_B T} = \frac{1.01325\times 10^{5}}{1.380649\times 10^{-23}\times 300} = 2.446\times 10^{25}\,\mathrm{m^{-3}}.
$$

The mean distance between a molecule and its nearest neighbours is of order $n_V^{-1/3} = 3.44\times 10^{-9}\,\mathrm{m}$, about nine diameters. The molecules are far apart compared with their size, which is the content of the first clause of [[#def-model]]. Equation [[#eq-mfp]] then gives

$$
\lambda = \frac{1}{\sqrt{2}\,\pi d^2 n_V} = 6.72\times 10^{-8}\,\mathrm{m}.
$$

The path is about $180$ diameters, and about twenty times the mean separation. A molecule travels a long way, on its own scale, between collisions. The mean speed from [[#ex-n2-speeds]] is $\langle v \rangle = 476\,\mathrm{m/s}$, so the mean time between collisions is

$$
\tau = \frac{\lambda}{\langle v \rangle} = \frac{6.72\times 10^{-8}}{476} = 1.41\times 10^{-10}\,\mathrm{s}.
$$

The collision frequency $1/\tau$ is about $7.1\times 10^{9}\,\mathrm{s^{-1}}$. The diameter was an input to the model, not a consequence of the ideal-gas law, so $\lambda$ is only as good as that input. The ideal-gas pressure does not determine $d$.
:::
:::

::: example Effusion of helium and of uranium hexafluoride {#ex-effusion}
At the same pressure and temperature, how many times faster does helium effuse than the nitrogen of [[#ex-n2-speeds]]? Take $m_{\mathrm{He}} = 6.65\times 10^{-27}\,\mathrm{kg}$ and $m_{\mathrm{N_2}} = 4.65\times 10^{-26}\,\mathrm{kg}$. Then compare one stage of effusion for the two isotopic forms of $\mathrm{UF_6}$, with molar masses $349\,\mathrm{g/mol}$ and $352\,\mathrm{g/mol}$.
::: solution
At fixed $P$ and $T$ the number densities agree, by $n_V = P/(k_B T)$. [[#eq-flux]] then says that the ratio of fluxes equals the ratio of mean speeds, which is the square root of the inverse mass ratio:

$$
\frac{\Phi_{\mathrm{He}}}{\Phi_{\mathrm{N_2}}} = \sqrt{\frac{m_{\mathrm{N_2}}}{m_{\mathrm{He}}}} = \sqrt{\frac{4.65\times 10^{-26}}{6.65\times 10^{-27}}} = \sqrt{6.99} = 2.64.
$$

Helium leaves a small hole about $2.64$ times as fast as nitrogen. The same rule applied to $\mathrm{^{235}UF_6}$ and $\mathrm{^{238}UF_6}$ gives a separation factor per stage of

$$
\sqrt{\frac{352}{349}} = 1.0043.
$$

One stage changes the isotopic ratio by less than half a percent. A practical cascade needs many stages because the masses are so close, not because Graham's law has failed. The law is about a pinhole into a vacuum. A turbulent leak does not sort molecules by $\sqrt{m}$.
:::
:::

## Where this leads

Heat engines in [[thermodynamics/heat-engines]] use $U(T)$ and $P V = n R T$, both of which now have a molecular reading, and do not need the distribution. Entropy in [[thermodynamics/entropy]] is still defined without counting states. The Boltzmann factor assumed in [[#thm-equipartition]] and [[#def-maxwell]] is derived in [[statistical-mechanics]]. The factor $\gamma$ shared with [[oscillations/sound]] is there because a sound wave is adiabatic, not because kinetic theory invented $\gamma$.

::: history Impacts, a path length, then a distribution
Daniel Bernoulli, in *Hydrodynamica* (1738), already attributed the pressure of a gas to molecular impacts and saw that it grows with the density and with the square of the speed. The argument in the form used here is later. Rudolf Clausius, in 1857, set out the pressure as a momentum transfer and introduced the mean free path, precisely so that one could talk about the distance a molecule travels between collisions. He did not write the speed distribution. James Clerk Maxwell gave that distribution in 1860, separating the most probable speed, the mean and the root mean square. Equipartition came in the same circle of ideas; its failures for the heat capacities of diatomic gases were an early sign that a purely classical count is not always right.
:::

::: summary
- In the dilute-gas model, pressure on a wall is a flux of momentum. Each elastic hit transfers $2 m v_x$, only $v_x > 0$ contributes, and isotropy converts $\langle v_x^2 \rangle$ into $\langle v^2 \rangle/3$, giving $P = \tfrac13 n_V m \langle v^2 \rangle$.
- Matched to $P = n_V k_B T$, the same formula says $\tfrac12 m \langle v^2 \rangle = \tfrac32 k_B T$ and $v_{\mathrm{rms}} = \sqrt{3 k_B T/m}$. Translational energy depends on $T$ and on the number of molecules, not on the molecular mass.
- Each classical quadratic term in the energy averages to $\tfrac12 k_B T$. Monatomic gases have $f = 3$; diatomic gases at room temperature have $f = 5$, because two rotations are excited and vibration is frozen. For $\mathrm{N_2}$, $\theta_{\mathrm{vib}} \approx 3394\,\mathrm{K}$.
- The Maxwell speed distribution is a geometrical factor $4\pi v^2$ times a Boltzmann exponential. Its peak, mean and root mean square stand in the order $v_p < \langle v \rangle < v_{\mathrm{rms}}$.
- For nitrogen at $300\,\mathrm{K}$ with $m = 4.65\times 10^{-26}\,\mathrm{kg}$, the three speeds are $422$, $476$ and $517\,\mathrm{m/s}$ to three significant figures. The sound speed is $v_{\mathrm{rms}}\sqrt{\gamma/3}$, about $353\,\mathrm{m/s}$ when $\gamma = 1.40$.
- Effusion flux is $\Phi = \tfrac14 n_V \langle v \rangle$, not $\tfrac14 n_V v_{\mathrm{rms}}$. At fixed $P$ and $T$ the rate scales as $1/\sqrt{m}$.
- $\langle v^2 \rangle \neq \langle v \rangle^2$. A single speed $v_{\mathrm{rms}}$ can be tuned to give the right pressure and still give the wrong flux, by a factor $\sqrt{3\pi/8}$.
- The mean free path in an equilibrium Maxwellian gas is $\lambda = 1/(\sqrt{2}\,\pi d^2 n_V)$. The diameter is extra information; the ideal-gas law does not determine it.
:::

## Exercises

::: exercise Doubling the temperature {#exr-double-t level=1 check="sqrt(2)"}
The rms speed of the molecules in a sample of ideal gas is measured at absolute temperature $T$. The gas is heated at fixed volume until the absolute temperature is $2T$. By what factor does $v_{\mathrm{rms}}$ increase?
::: solution
[[#eq-vrms]] says $v_{\mathrm{rms}} \propto \sqrt{T}$ at fixed molecular mass. Doubling $T$ multiplies the speed by $\sqrt{2}$. The volume is irrelevant: the rms speed does not depend on $V$ or on $n_V$. The mean speed and the most probable speed scale by the same factor, because each of them is a fixed multiple of $v_{\mathrm{rms}}$.
:::
:::

::: exercise Root mean square against the peak {#exr-ratio-speeds level=1 check="sqrt(3/2)"}
For a Maxwellian gas, find the exact ratio $v_{\mathrm{rms}}/v_p$.
::: solution
Divide the two formulae in [[#eq-three-speeds]]. The factors $\sqrt{k_B T/m}$ cancel:

$$
\frac{v_{\mathrm{rms}}}{v_p} = \sqrt{\frac{3 k_B T/m}{2 k_B T/m}} = \sqrt{\frac{3}{2}}.
$$

The ratio does not depend on the gas or the temperature. Numerically $\sqrt{3/2} \approx 1.225$, which is why the rms mark on the figure sits near $1.22$ when the peak is at $1$.
:::
:::

::: exercise Gamma for room-temperature air {#exr-gamma level=1 check="7/5"}
Air at room temperature is treated as a diatomic ideal gas with vibration frozen. Find $\gamma = C_{P,m}/C_{V,m}$.
::: solution
The count under [[#thm-equipartition]] is $f = 5$, so $C_{V,m} = \tfrac52 R$ and $C_{P,m} = C_{V,m} + R = \tfrac72 R$. Therefore

$$
\gamma = \frac{7/2}{5/2} = \frac{7}{5}.
$$

The value $1.40$ used for nitrogen adiabats is this fraction, not an independent experimental constant. It stops being right when the temperature is high enough for vibration to contribute.
:::
:::

::: exercise Heating until the rms speed doubles {#exr-temp-factor level=2 check="4"}
A sample of nitrogen is heated at fixed volume until $v_{\mathrm{rms}}$ is twice its initial value. By what factor does the absolute temperature increase?
::: solution
From [[#eq-vrms]], $T \propto v_{\mathrm{rms}}^2$. Doubling the speed multiplies $T$ by $4$. If the gas started at $300\,\mathrm{K}$, it must be brought to $1200\,\mathrm{K}$. The internal energy of a diatomic sample with $f = 5$ scales the same way, because $U \propto T$. Fixed volume matters for the pressure, which also quadruples, but not for the speed.
:::
:::

::: exercise Effusion of hydrogen and oxygen {#exr-ho-effusion level=2 check="4"}
Hydrogen and oxygen effuse through the same small hole at the same pressure and temperature. Take $M_{\mathrm{H_2}} = 2.00\,\mathrm{g/mol}$ and $M_{\mathrm{O_2}} = 32.0\,\mathrm{g/mol}$. Find $\Phi_{\mathrm{H_2}}/\Phi_{\mathrm{O_2}}$.
::: solution
Equal $P$ and $T$ mean equal $n_V$. [[#eq-flux]] then gives a flux ratio equal to the inverse square root of the mass ratio, or of the molar-mass ratio:

$$
\frac{\Phi_{\mathrm{H_2}}}{\Phi_{\mathrm{O_2}}} = \sqrt{\frac{M_{\mathrm{O_2}}}{M_{\mathrm{H_2}}}} = \sqrt{\frac{32.0}{2.00}} = \sqrt{16} = 4.
$$

Hydrogen effuses four times as fast as oxygen. The hole must be small in the sense of [[#prop-effusion]]. A large aperture lets the gas stream hydrodynamically, and this ratio does not apply.
:::
:::

::: exercise Internal energy of half a mole {#exr-half-mole level=2 check="5/4*8.314462618*300"}
Find the internal energy, in joules, of $0.500\,\mathrm{mol}$ of diatomic ideal gas at $300\,\mathrm{K}$, with vibration frozen. Use $R = 8.314462618\,\mathrm{J/(mol\cdot K)}$.
::: solution
Here $f = 5$, so $U = \tfrac52 n R T$. With $n = 0.500$,

$$
U = \tfrac52 \times 0.500 \times R \times 300 = \tfrac54 R \times 300 = \frac{5}{4}\times 8.314462618\times 300 = 3117.92\,\mathrm{J}.
$$

The checked value is the exact product $\tfrac54\times 8.314462618\times 300$. A monatomic sample of the same amount would store only three-fifths of this, because $f$ would be $3$ rather than $5$.
:::
:::

::: exercise Locating the peak of the distribution {#exr-mode level=3}
Starting from [[#eq-maxwell]], show that $f$ has a maximum at $v_p = \sqrt{2 k_B T/m}$. State why the stationary point is a maximum, and why $f(0) = 0$ does not contradict the Boltzmann factor preferring low energy.
::: hint
Work with $\ln f$ for $v > 0$. The constant prefactor, including $(m/(2\pi k_B T))^{3/2}$, does not affect the location of the maximum.
:::
::: solution
For $v > 0$ the logarithm is

$$
\ln f(v) = \ln(4\pi) + 2\ln v + \tfrac32\ln\left(\frac{m}{2\pi k_B T}\right) - \frac{m v^2}{2 k_B T}.
$$

Differentiate with respect to $v$. The constant terms drop, and

$$
\deriv{\ln f}{v} = \frac{2}{v} - \frac{m v}{k_B T}.
$$

Set the derivative equal to zero: $2/v = m v/(k_B T)$, so $v^2 = 2 k_B T/m$, and the positive root is $v_p$. The derivative is positive for $0 < v < v_p$ and negative for $v > v_p$, so $\ln f$, and therefore $f$, rises up to $v_p$ and falls after it. The stationary point is a maximum.

The Boltzmann factor $\exp(-m v^2/(2 k_B T))$ is largest at $v = 0$. The speed distribution multiplies it by the shell area $4\pi v^2$, which is zero at the origin: there is only one velocity vector with speed zero, and a whole sphere of them at any $v > 0$. The product vanishes at $v = 0$ and peaks where the growth of the shell is balanced by the decay of the exponential. Preferring low energy and peaking at $v_p$ are statements about two different functions.
:::
:::

::: exercise The single-speed overestimate {#exr-single-speed level=3 check="sqrt(3*pi/8)"}
A model replaces the Maxwell distribution by a single speed $v_{\mathrm{rms}}$, with directions still isotropic, and uses the effusion formula with that speed in place of $\langle v \rangle$. By what exact factor does this model overestimate $\Phi$, relative to [[#eq-flux]]?
::: hint
The overestimate is the ratio $v_{\mathrm{rms}}/\langle v \rangle$. Use [[#eq-three-speeds]], not a numerical speed from the nitrogen example.
:::
::: solution
The true flux is $\tfrac14 n_V \langle v \rangle$. The single-speed model, with the same number density and with every speed equal to $v_{\mathrm{rms}}$, gives $\tfrac14 n_V v_{\mathrm{rms}}$. The ratio of the model's flux to the true flux is

$$
\frac{v_{\mathrm{rms}}}{\langle v \rangle} = \sqrt{\frac{3 k_B T/m}{8 k_B T/(\pi m)}} = \sqrt{\frac{3\pi}{8}}.
$$

The pressure is not overestimated. Both the true gas and the model have the same $\langle v^2 \rangle$, namely $v_{\mathrm{rms}}^2$, so [[#eq-pressure]] returns the same $P$. The exercise is the quantitative form of the warning after [[#prop-effusion]]: one speed can be chosen to protect the pressure and still miss the flux. Numerically the factor is about $1.085$, an $8.5\%$ excess, independent of temperature and of the gas.
:::
:::
