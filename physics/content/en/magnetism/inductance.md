A coil does not only produce a magnetic field. When its own current changes, that field changes, and Faraday’s law returns an emf in the coil that produced the field. The effect is called self-induction. It is why the current in a relay rises on its own clock rather than jumping to $\mathcal{E}/R$, why a switch opening an inductive circuit can throw a spark, and why a magnetic field is a place where energy can be stored.

The number that measures the effect, for a linear coil, is the self-inductance $L$. Mutual inductance is the same idea between two circuits: a changing current in one induces an emf in the other. Both coefficients are geometric, fixed once the shape of the windings and the medium are fixed, and both enter circuit equations as voltages proportional to $\dd I/\dd t$.

This chapter defines those coefficients, computes $L$ for a long solenoid, and derives the stored energy $U = \tfrac{1}{2} L I^2$ from the power that has to be supplied to build the current. We then show that, for the ideal solenoid, the same energy is the integral of $B^2/(2\mu_0)$ over the interior. The series $RL$ circuit is solved from the loop rule, and the ideal $LC$ circuit is solved as the bridge to alternating current. Faraday’s law itself is [[magnetism/faraday]]. The solenoid field $B = \mu_0 n I$ is taken from [[magnetism/biot-savart]]. The loop rule is the one used in [[electrostatics/dc-circuits]], and the electric energy $Q^2/(2C)$ is the partner of $\tfrac{1}{2} L I^2$ from [[electrostatics/capacitance]].

One sign convention is kept throughout. The induced emf in the positive sense of a circuit is $-\dd\Lambda/\dd t$, where $\Lambda$ is the flux linkage in the sense fixed by the right-hand rule. The potential drop in the direction of the positive current, across a constant inductance, is $L\,\dd I/\dd t$. Those two statements are the same fact. Using both a minus sign in the loop equation and a drop of $-L\,\dd I/\dd t$ counts Lenz’s law twice.

## Self-inductance {#self}

Choose a positive sense around a coil, and take the positive normal to each turn by the right-hand rule. Let $\Phi_1$ be the magnetic flux of $\mathbf{B}$ through one turn. If the coil has $N$ turns and each carries essentially the same flux, the **flux linkage** is $\Lambda = N\Phi_1$. When the turns are not equivalent one adds the fluxes turn by turn; the symbol $\Lambda$ still means that sum. Linkage has the unit weber, as a single flux does. It is not a new kind of quantity, only a bookkeeping device for windings in series.

::: definition Self-inductance {#def-self}
Suppose the coil carries current $I$ in the positive sense, the medium is linear, and there is no permanent magnet. Then $\Lambda$ is proportional to $I$. The **self-inductance** $L$ is the constant of proportionality,

$$
L = \frac{\Lambda}{I},
$$ {#eq-L}

so that $\Lambda = L I$. The SI unit is the henry: $1\,\mathrm{H} = 1\,\mathrm{Wb/A} = 1\,\mathrm{V\,s/A}$.
:::

Linearity is the hypothesis that lets $L$ be independent of $I$. A coil on an iron core, driven far enough for the iron to saturate, does not have one inductance: $\Lambda/I$ changes as $I$ changes. A coil that threads the field of a permanent magnet has a linkage even at $I = 0$, so the ratio $\Lambda/I$ is not the right object at all. Both failures are taken up again in the warning after the energy calculation. Until then every $L$ in this chapter is a constant.

The definition does not by itself say what voltage appears at the terminals. That comes from Faraday’s law, one turn at a time.

::: theorem Self-induced emf {#thm-emf}
If the self-inductance $L$ is constant, the induced emf in the positive sense of the coil is

$$
\mathcal{E} = -\frac{\dd\Lambda}{\dd t} = -L\deriv{I}{t}.
$$ {#eq-emf}

In the passive sign convention the potential drop in the direction of the positive current is $v_L = L\,\dd I/\dd t$.
:::

::: proof
Faraday’s law, in the sign fixed in [[magnetism/faraday]], says that the emf around one turn, taken in the positive sense, is $-\dd\Phi_1/\dd t$. The $N$ turns are in series, so their emfs add:

$$
\mathcal{E} = -N\deriv{\Phi_1}{t} = -\deriv{\Lambda}{t}.
$$

By [[#def-self]], $\Lambda = L I$ with $L$ constant, and the product rule contributes nothing from $\dd L/\dd t$. Therefore $\mathcal{E} = -L\,\dd I/\dd t$.

The induced electric field pushes current in the positive sense when $\mathcal{E}$ is positive. The terminal voltage measured in that same direction, from the end one enters to the end one leaves while following the current, is the negative of that emf: the inductor is a load, not a source, when the current is increasing. Hence $v_L = -\mathcal{E} = L\,\dd I/\dd t$.
:::

Read [[#eq-emf]] as a statement about the change, not about the current. A steady current, however large, has $\dd I/\dd t = 0$ and no self-induced emf. A decreasing current has $\dd I/\dd t < 0$, so $\mathcal{E}$ is positive in the sense of the current: the induced emf tries to keep the current going. That is Lenz’s law applied to the circuit’s own field. The field of a positive current is in the positive normal direction, so an increasing positive current produces an increasing positive flux, and the induced emf must be negative in order to oppose the increase.

::: intuition Inertia of the current
Flux linkage plays the role that momentum plays for a particle, and $L$ plays the role of mass. The relation $v_L = L\,\dd I/\dd t$ is Newton’s second law in electrical symbols: a voltage is required to change the current, just as a force is required to change a velocity. The energy $\tfrac{1}{2} L I^2$ derived below is the partner of $\tfrac{1}{2} m v^2$. The analogy stops at the carrier of the energy. A particle’s kinetic energy travels with the particle. The magnetic energy is in the field, spread through the region where $\mathbf{B}$ is not zero, which need not be inside the wire.
:::

The lumped inductor of a circuit diagram is this object with its internal geometry forgotten. Two terminals, one number $L$, and the rule $v_L = L\,\dd I/\dd t$. Modelling a real coil that way is legitimate when the magnetic field is confined to the winding, the capacitance between turns is negligible at the frequencies in use, and the resistance has been drawn as a separate resistor. A long straight wire has a small inductance too. It is not zero. For the circuits in this chapter the intentional coil dominates, and we treat $L$ as the inductance drawn on the diagram.

## The long solenoid {#solenoid}

A long straight solenoid is the geometry in which $L$ can be computed from the field we already know. Take $n$ turns per metre, wound uniformly, length $\ell$ much larger than the diameter, cross-sectional area $A$, in vacuum or in a linear medium whose permeability is $\mu_0$. Ampère’s law, applied to a rectangular loop that runs inside the solenoid and closes outside, gives

$$
B = \mu_0 n I
$$

inside, parallel to the axis, and a field that is neglected outside. The direction is the right-hand rule: fingers along the current, thumb along $\mathbf{B}$. The derivation of that field is in [[magnetism/biot-savart]]. What is new here is the flux, and from the flux the inductance.

::: theorem Inductance of a long solenoid {#thm-solenoid}
Under the hypotheses just stated,

$$
L = \mu_0 n^2 A \ell.
$$ {#eq-solenoid}
:::

::: proof
The interior field is uniform and perpendicular to the cross-section, so the flux through one turn is $\Phi_1 = B A = \mu_0 n I A$. The total number of turns is $N = n\ell$, and every turn is assigned this same flux because the end correction has been neglected. The linkage is

$$
\Lambda = N\Phi_1 = n\ell \cdot \mu_0 n I A = \mu_0 n^2 A \ell\, I.
$$

[[#def-self]] then divides by $I$. The current cancels, which is the linearity we assumed when we wrote $B$ proportional to $I$, and $L = \mu_0 n^2 A \ell$.
:::

The formula rewards turns more than it rewards length. Doubling $n$, at fixed length and area, multiplies $L$ by four: twice the turns, and twice the field each turn threads. Doubling $\ell$ at fixed $n$ only doubles $L$, because the new length adds turns but does not strengthen $B$. Doubling the area doubles $L$, since each turn catches twice the flux and the interior field of an ideal solenoid does not depend on the radius.

The idealisation is visible in the proof. A laboratory solenoid has a field that frays near the ends and a small field outside. [[#eq-solenoid]] is the leading term for a coil whose length is many diameters. We do not attach a correction factor. When a number is required, the ideal formula is the one that matches the hypotheses, and the hypotheses should be said in the same sentence as the number.

::: example Solenoid, energy and time constant {#ex-solenoid}
A long solenoid has $n = 2000\,\mathrm{m^{-1}}$, cross-sectional area $A = 4.00\times 10^{-4}\,\mathrm{m^2}$ and length $\ell = 0.300\,\mathrm{m}$. Find $L$. The winding then carries $I = 2.00\,\mathrm{A}$. Find the stored energy. The coil is connected to a resistor $R = 10.0\,\Omega$ with no other resistance in the loop. Find the inductive time constant.
::: solution
[[#eq-solenoid]] with $\mu_0 = 4\pi\times 10^{-7}\,\mathrm{H/m}$ gives

$$
\begin{aligned}
L &= (4\pi\times 10^{-7})(2000)^2(4.00\times 10^{-4})(0.300) \\
&= 1.920\pi\times 10^{-4} \\
&= 6.03186\times 10^{-4}\,\mathrm{H}.
\end{aligned}
$$

To three significant figures, $L = 6.03\times 10^{-4}\,\mathrm{H}$. The inputs $A$, $\ell$ and the current below are quoted to three figures; $n = 2000\,\mathrm{m^{-1}}$ is read the same way. The unrounded product is kept for one further step so that the energy is not rounded twice.

The area corresponds to a diameter of $2.26\,\mathrm{cm}$, and the length is $13.3$ diameters. That is long enough for the ideal formula to be the right model in this problem, and not long enough to pretend the end correction is zero in a precision experiment. We report the ideal $L$.

At $I = 2.00\,\mathrm{A}$ the energy of [[#thm-energy]] below is

$$
U = \frac{1}{2} L I^2 = \frac{1}{2}(6.03186\times 10^{-4})(2.00)^2 = 1.20637\times 10^{-3}\,\mathrm{J},
$$

which is $1.21\times 10^{-3}\,\mathrm{J}$ to three significant figures. The same arithmetic is the linkage: $N = n\ell = 600$ turns, $B = \mu_0 n I = 5.02655\times 10^{-3}\,\mathrm{T}$, and $\Lambda = N B A = 1.20637\times 10^{-3}\,\mathrm{Wb}$. Then $L = \Lambda/I$ recovers $6.03186\times 10^{-4}\,\mathrm{H}$. Nothing new has been assumed. It is a check that the flux and the energy are using one and the same $L$.

With $R = 10.0\,\Omega$ the time constant of [[#eq-tau]] is

$$
\tau = \frac{L}{R} = \frac{6.03186\times 10^{-4}}{10.0} = 6.03186\times 10^{-5}\,\mathrm{s},
$$

or $6.03\times 10^{-5}\,\mathrm{s}$ to three significant figures. A current in this loop grows, or decays, on a scale of about $60\,\mu\mathrm{s}$. That is the content of the number. It is not yet the current at a particular instant; that needs the solution in [[#rl]].
:::
:::

## Energy in the magnetic field {#energy}

Building a current in an inductor takes work. The agent that does the work is whatever maintains the voltage across the terminals: a battery, a charged capacitor, or the rest of a circuit. The magnetic field holds what was spent, and returns it when the current falls.

::: theorem Energy stored in an inductor {#thm-energy}
Let $L$ be constant, and let the current increase from $0$ to a final value $I$ so slowly that radiation is negligible. The energy stored is

$$
U = \frac{1}{2} L I^2.
$$ {#eq-energy}

If the current later runs from $I_1$ to $I_2$ at the same constant $L$, the change in stored energy is $\tfrac{1}{2} L I_2^2 - \tfrac{1}{2} L I_1^2$.
:::

::: proof
While the current is $I'$ and is changing at $\dd I'/\dd t$, the potential drop in the direction of the current is $v_L = L\,\dd I'/\dd t$ by [[#thm-emf]]. The power delivered to the inductor by the agent that pushes the current through that drop is

$$
P = v_L I' = L I'\deriv{I'}{t}.
$$

In a time $\dd t$ the energy delivered is $P\,\dd t = L I'\,\dd I'$. Integrate from a start at zero current up to the final current $I$:

$$
U = \int_0^{I} L I'\,\dd I' = \frac{1}{2} L I^2,
$$

where pulling $L$ out of the integral is the step that fails if $L$ depends on the current. The same integral between $I_1$ and $I_2$ is the difference of the two values of $\tfrac{1}{2} L I^2$. The quasistatic hypothesis is what lets us ignore energy carried away by electromagnetic waves while the current is changing. For the circuits in this chapter the change is slow on the scale of the light-travel time across the coil, and the stored energy is the whole story.
:::

The factor $\tfrac{1}{2}$ has the same origin as the factor $\tfrac{1}{2}$ in $\tfrac{1}{2} Q^2/C$. Early in the process the current is small, so the power $L I\,\dd I/\dd t$ is small. Charging at the final current all the way would cost $L I^2$, which is twice the true cost. The integral of a ramp is the area of a triangle.

[[#eq-energy]] is a circuit expression. It knows about the field only through $L$. There is a field expression, $B^2/(2\mu_0)$ per unit volume in vacuum, and the two agree when both can be evaluated. We can evaluate both for the ideal solenoid. That is the calculation the warning below says must actually be done before the two formulae are treated as one.

::: proposition Solenoid energy and the field integral {#prop-density}
For the ideal long solenoid of [[#thm-solenoid]], with vacuum permeability $\mu_0$,

$$
\int \frac{B^2}{2\mu_0}\,\dd V = \frac{1}{2} L I^2,
$$ {#eq-density}

where the integral extends over the interior volume $A\ell$ and the exterior contribution has been neglected together with the exterior field.
:::

::: proof
Inside, $B = \mu_0 n I$ is uniform, so

$$
\frac{B^2}{2\mu_0} = \frac{\mu_0^2 n^2 I^2}{2\mu_0} = \frac{1}{2}\mu_0 n^2 I^2.
$$

The interior volume is $A\ell$. Multiplying,

$$
\int \frac{B^2}{2\mu_0}\,\dd V = \frac{1}{2}\mu_0 n^2 I^2 \cdot A\ell = \frac{1}{2}\bigl(\mu_0 n^2 A\ell\bigr) I^2 = \frac{1}{2} L I^2,
$$

the last step by [[#eq-solenoid]]. For the numbers of [[#ex-solenoid]], $B = 5.02655\times 10^{-3}\,\mathrm{T}$ and $B^2/(2\mu_0) = 10.053\,\mathrm{J/m^3}$. The volume is $A\ell = 1.20\times 10^{-4}\,\mathrm{m^3}$, and the product is $1.20637\times 10^{-3}\,\mathrm{J}$, the same value as $\tfrac{1}{2} L I^2$.
:::

The proposition is a check, not a derivation of the density formula from nothing. We assumed $B^2/(2\mu_0)$ and showed that its integral reproduces the circuit energy for this one geometry. In free space, for a general linear arrangement of steady currents, the same density does integrate to $\tfrac{1}{2} L I^2$ for a single circuit, and to the mutual expression of the next section for two circuits. The general argument rewrites the field energy as $\tfrac{1}{2}\int \mathbf{J}\cdot\mathbf{A}\,\dd V$ and reads off $L$. It belongs with the vector potential, not with the circuit theory of this chapter. [[magnetism/maxwell]] is where the field laws are assembled; a later electrodynamics course is where the general energy identity is proved. Until that proof has been given, $\tfrac{1}{2} L I^2$ and $\int B^2/(2\mu_0)\,\dd V$ are two quantities that we have shown to be equal for the ideal solenoid, and that we do not silently equate for a shape we have not integrated.

::: warning Linearity, permanent magnets, and the energy integral
$L = \Lambda/I$ assumes a linear medium and no permanent magnet. If a magnet threads the coil, $\Lambda$ is not zero at zero current, and the ratio $\Lambda/I$ blows up as $I$ approaches $0$ even though the coil is a perfectly ordinary winding. The useful object is then the incremental inductance $\dd\Lambda/\dd I$, and the energy is $\int I\,\dd\Lambda$, not $\tfrac{1}{2}(\Lambda/I) I^2$.

Separately, $\tfrac{1}{2} L I^2$ is not the integral of $B^2/(2\mu_0)$ until the two have been shown to agree. [[#prop-density]] is that demonstration for the ideal solenoid. Copying the density formula onto a toroid, a short coil, or a circuit with an iron core, without a fresh integral and without replacing $\mu_0$ by the proper permeability, is a different calculation. Iron stores energy in the magnetised material as well as in the field, and the circuit expression $\int I\,\dd\Lambda$ remains the one that follows from the terminal voltage.
:::

::: quiz
A coil of constant inductance carries a steady positive current. The current then begins to decrease. Which statement about the self-induced emf is right?
- [ ] The emf is zero, because an emf requires a current, and the current is still positive.
- [ ] The emf opposes the current, so it is negative in the sense of the current for as long as the current is positive.
- [x] The emf opposes the change. While the current is decreasing the emf is positive in the sense of the current, trying to maintain it.
- [ ] The emf equals $L I$, with the sign of the current.
::: solution
[[#eq-emf]] depends on $\dd I/\dd t$, not on $I$. A steady current has no self-induced emf. When the current decreases, $\dd I/\dd t$ is negative, so $-L\,\dd I/\dd t$ is positive in the sense of the current. Lenz’s law opposes the change in flux. It does not oppose the current as such, and it does not prefer one sign of $I$. The quantity $L I$ is a flux linkage, not an emf. An emf has the unit volt; $L I$ has the unit weber.
:::
:::

## Mutual inductance {#mutual}

Two circuits share the same phenomenon as soon as the flux of one threads the other. A transformer, an ignition coil, and the pair of windings on Faraday’s iron ring of 29 August 1831 are mutual inductors. The coefficient has a symmetry that is not obvious from the circuit diagram: the emf in circuit 1 per unit $\dd I_2/\dd t$ equals the emf in circuit 2 per unit $\dd I_1/\dd t$.

::: definition Mutual inductance {#def-mutual}
Fix a positive sense on each of two circuits. Let $\Lambda_1$ be the flux linkage of circuit 1 and $\Lambda_2$ that of circuit 2, each in its positive sense. In a linear medium with no permanent magnet the linkages are homogeneous linear functions of the two currents. We write

$$
\Lambda_1 = L_1 I_1 + M I_2, \qquad \Lambda_2 = M I_1 + L_2 I_2.
$$ {#eq-linkages}

$L_1$ and $L_2$ are the self-inductances. The common coefficient $M$ is the **mutual inductance**. The induced emfs in the positive senses are $\mathcal{E}_1 = -\dd\Lambda_1/\dd t$ and $\mathcal{E}_2 = -\dd\Lambda_2/\dd t$. In particular, if $I_1$ is held fixed,

$$
\mathcal{E}_1 = -M\deriv{I_2}{t},
$$ {#eq-mutual-emf}

and if $I_2$ is held fixed, $\mathcal{E}_2 = -M\,\dd I_1/\dd t$.
:::

The sign of $M$ is not a property of the wires alone. It records whether the positive sense on circuit 2 agrees with the field produced by a positive current in circuit 1. Reverse one arrow on the diagram and $M$ changes sign. The magnitude is geometric. A convenient positive choice is to take both positive senses so that $M > 0$ when the fluxes add, and to keep that choice for the rest of the problem.

[[#def-mutual]] writes a single $M$ in both linkages. That is a theorem, not a definition of two independent numbers. The definition that does not prejudge the result introduces $M_{12}$ by $\Lambda_1 = L_1 I_1 + M_{12} I_2$ and $M_{21}$ by $\Lambda_2 = L_2 I_2 + M_{21} I_1$. The content of the next result is $M_{12} = M_{21}$.

::: theorem Reciprocity of mutual inductance {#thm-reciprocity}
For two circuits in a linear medium, with no permanent magnet, and with changes slow enough that the magnetic energy is a function of the instantaneous currents alone,

$$
M_{12} = M_{21}.
$$

The stored energy with the common value $M$ is

$$
U = \frac{1}{2} L_1 I_1^2 + \frac{1}{2} L_2 I_2^2 + M I_1 I_2.
$$ {#eq-mutual-energy}
:::

::: proof
The final energy must not depend on the order in which the currents are established, because under the hypotheses the magnetostatic energy is fixed by the final currents.

First raise $I_1$ from $0$ to its final value while $I_2$ is held at $0$. Circuit 2 carries no current, so the emf induced in it does no work. The work done on circuit 1 is the self-inductance integral of [[#thm-energy]], equal to $\tfrac{1}{2} L_1 I_1^2$.

Then hold $I_1$ fixed and raise $I_2$ from $0$ to its final value. The agent that drives circuit 2 does work $\tfrac{1}{2} L_2 I_2^2$ against the self-induced drop. Meanwhile circuit 1 feels $\mathcal{E}_1 = -M_{12}\,\dd I_2/\dd t$. Holding $I_1$ fixed means cancelling that emf with a source voltage $+M_{12}\,\dd I_2/\dd t$. The power drawn from that source is $I_1 M_{12}\,\dd I_2/\dd t$, and the energy drawn while $I_2$ rises is

$$
\int_0^{I_2} M_{12} I_1\,\dd I_2' = M_{12} I_1 I_2.
$$

The total energy after this order of switching is $\tfrac{1}{2} L_1 I_1^2 + \tfrac{1}{2} L_2 I_2^2 + M_{12} I_1 I_2$.

Repeat in the other order. The cross term is then $M_{21} I_2 I_1$, and the self terms are the same. The totals agree for every pair of final currents only if $M_{12} = M_{21}$. Call the common value $M$. The energy is [[#eq-mutual-energy]].
:::

The cross term can be negative. If $M$ is negative, or if the currents have opposite signs while $M$ is positive, the fields partly cancel and the energy is less than the sum of the two self-energies. It cannot become negative for a passive pair of coils. The quadratic form $\tfrac{1}{2} L_1 I_1^2 + \tfrac{1}{2} L_2 I_2^2 + M I_1 I_2$ is non-negative for all real currents if and only if $L_1 \ge 0$, $L_2 \ge 0$ and $M^2 \le L_1 L_2$. The last inequality is the bound on the coupling. The exercise at the end of the chapter asks for that short argument from the energy. The ratio $k = M/\sqrt{L_1 L_2}$ is the **coupling coefficient**, and the bound is $\abs{k} \le 1$. Perfect coupling, $\abs{k} = 1$, is the ideal transformer’s limit: every field line of one winding threads the other. Real windings on a shared iron core come close. Two loops far apart have $\abs{k}$ near zero, and $M$ near zero with them.

A long solenoid and a short secondary wound over its middle are the geometry in which $M$ is as easy as $L$.

::: example Mutual inductance of a short secondary {#ex-mutual}
A long primary solenoid has $n_1 = 1000\,\mathrm{m^{-1}}$. A secondary of $N_2 = 400$ turns is wound at its centre, closely enough that each secondary turn has the primary’s interior area $A = 5.00\times 10^{-4}\,\mathrm{m^2}$. The secondary is short compared with the primary, so the field across it is the uniform interior field. Find $M$. If the primary current increases at $25.0\,\mathrm{A/s}$ and the secondary is open, find the emf in the secondary.
::: solution
The primary field is $B_1 = \mu_0 n_1 I_1$. Each secondary turn catches flux $B_1 A$, and the secondary linkage due to the primary is $\Lambda_2 = N_2 B_1 A = \mu_0 n_1 N_2 A\, I_1$. There is no $I_2$ in this term. Comparing with [[#eq-linkages]],

$$
M = \mu_0 n_1 N_2 A = (4\pi\times 10^{-7})(1000)(400)(5.00\times 10^{-4}) = 8\pi\times 10^{-5}\,\mathrm{H} = 2.513\times 10^{-4}\,\mathrm{H}.
$$

To three significant figures, $M = 2.51\times 10^{-4}\,\mathrm{H}$. The same formula is $\mu_0 n_1 n_2 A \ell_2$ if one prefers a turn density $n_2$ on a secondary of length $\ell_2$ with $N_2 = n_2 \ell_2$.

The secondary is open, so $I_2 = 0$ and it stays zero. [[#eq-mutual-emf]] is not the emf we want on the secondary; that equation was the emf on circuit 1. The emf on the open secondary is

$$
\mathcal{E}_2 = -M\deriv{I_1}{t}.
$$

With $\dd I_1/\dd t = 25.0\,\mathrm{A/s}$,

$$
\abs{\mathcal{E}_2} = (2.513\times 10^{-4})(25.0) = 6.283\times 10^{-3}\,\mathrm{V},
$$

or $6.28\,\mathrm{mV}$ to three significant figures. The sign is fixed once the positive senses are drawn. The magnitude is what an open-circuit voltmeter reads. Reciprocity says that if instead the secondary carried a changing current and the primary were open, the primary emf per unit $\dd I_2/\dd t$ would be this same $M$. The primary has many more turns and a different self-inductance, and none of that disturbs the equality of the two mutual coefficients.
:::
:::

::: application The spark when a switch opens
Henry’s observation, discussed in the historical note, is the large $\dd I/\dd t$ at the moment a current is interrupted. While the contacts separate, the current is forced toward zero in a short time, $\dd I/\dd t$ is large and negative, and $\mathcal{E} = -L\,\dd I/\dd t$ is a large emf in the direction that tries to keep the current going. The voltage appears across the opening gap and can sustain an arc. The ideal equation $v_L = L\,\dd I/\dd t$ does not by itself predict the arc voltage, because the duration of the interruption is set by the plasma in the gap, not by $L$. What the inductance does fix is the time integral: $\int v_L\,\dd t = -L\,\Delta I$. Quenching the current $I$ removes linkage $L I$, and the volt-second area across the switch has to account for it. A diode or a capacitor placed across the coil gives that integral a path that is not an arc.
:::

## The series RL circuit {#rl}

Put a resistor $R$, an inductor $L$ and a constant source $\mathcal{E}$ in a single loop, and close the switch at $t = 0$ with the current still zero. The current cannot jump. A jump would make $\dd I/\dd t$ infinite and, by [[#thm-emf]], would require an infinite voltage, which a finite source does not supply. The current rises on the time scale $L/R$ toward the value the resistor alone would have allowed.

::: theorem Current in a charging RL circuit {#thm-rl}
In a series loop of constant $\mathcal{E}$, $R$ and $L$, with $I(0) = 0$,

$$
I(t) = \frac{\mathcal{E}}{R}\left(1 - e^{-(R/L) t}\right), \qquad t \ge 0.
$$ {#eq-rl}

The **time constant** is

$$
\tau = \frac{L}{R}.
$$ {#eq-tau}

Equivalently, $I(t) = I_\infty\bigl(1 - e^{-t/\tau}\bigr)$ with $I_\infty = \mathcal{E}/R$.
:::

::: proof
Traverse the loop in the positive sense, which is the sense of the current we are about to find. The source contributes a rise $\mathcal{E}$. The resistor contributes a drop $I R$. The inductor contributes a drop $L\,\dd I/\dd t$. The loop rule says the rises equal the drops:

$$
\mathcal{E} = I R + L\deriv{I}{t}.
$$ {#eq-rl-ode}

Rearrange to the standard linear equation

$$
\deriv{I}{t} + \frac{R}{L} I = \frac{\mathcal{E}}{L}.
$$

The integrating factor is $e^{(R/L) t}$. Multiplying through,

$$
\deriv{}{t}\left(I\, e^{(R/L) t}\right) = \frac{\mathcal{E}}{L}\, e^{(R/L) t}.
$$

Integrate from $0$ to $t$. The initial condition $I(0) = 0$ removes the lower limit on the left, and

$$
I(t)\, e^{(R/L) t} - 0 = \frac{\mathcal{E}}{R}\left(e^{(R/L) t} - 1\right).
$$

Divide by the integrating factor:

$$
I(t) = \frac{\mathcal{E}}{R}\left(1 - e^{-(R/L) t}\right).
$$

The combination $L/R$ is the constant $\tau$ in the exponent, because $(R/L) t = t/\tau$. As $t\to\infty$ the exponential vanishes and $I\to \mathcal{E}/R$, the steady current of a resistor on a constant source. The inductor has become a perfect conductor for steady current, which matches $\dd I/\dd t = 0$ in [[#eq-emf]].
:::

At $t = \tau$ the factor $1 - e^{-1}$ equals $0.632$, so the current has reached about $63\%$ of its final value. At $t = 5\tau$ it has reached $1 - e^{-5} = 0.993$, which is the final value for any purpose that does not need the last percent. The voltage across the resistor is $I R$, rising with the current. The voltage across the inductor is the remainder,

$$
v_L = L\deriv{I}{t} = \mathcal{E}\, e^{-t/\tau},
$$

largest at the switching instant, when $v_L(0) = \mathcal{E}$ and $I$ is still zero, and gone in the steady state. The two voltages add to $\mathcal{E}$ at every instant, which is [[#eq-rl-ode]] rearranged. That sum is a useful check on arithmetic.

::: corollary Discharge through a resistor {#cor-decay}
If the source is removed at an instant when the current is $I_0$, and the inductor is left in series with $R$, then for $t \ge 0$ measured from that instant

$$
I(t) = I_0\, e^{-(R/L) t} = I_0\, e^{-t/\tau}.
$$ {#eq-decay}
:::

::: proof
The loop rule is [[#eq-rl-ode]] with $\mathcal{E} = 0$, so $\dd I/\dd t = -(R/L) I$. The solutions are exponential. The condition $I(0) = I_0$ fixes the coefficient and gives [[#eq-decay]]. The stored energy $\tfrac{1}{2} L I_0^2$ leaves the field and is dissipated in the resistor. There is no remaining source to supply a steady current.
:::

::: widget plot
f: 1-exp(-x)
x: 0, 5
caption: Current in a series RL circuit after the switch closes, in units of the time constant. The vertical axis is I/I∞ = 1 − exp(−t/τ) and the horizontal axis is t/τ. The curve passes through 0 at the switching instant and through 1 − 1/e ≈ 0.63 at one time constant. By x = 5 it is within one percent of its final value. There is no slider: the shape is the same for every R and L once time is measured in units of τ = L/R.
:::

The figure is the whole content of [[#eq-rl]] once the axes have been scaled. Changing $R$ or $L$ changes $\tau$ and changes $I_\infty$, and it does not change the picture in these units. A measured current that is still near zero long after $\tau$, or that jumps at $t = 0$, is not this circuit.

The energy accounts close. Multiply [[#eq-rl-ode]] by $I$:

$$
\mathcal{E} I = I^2 R + L I\deriv{I}{t} = I^2 R + \deriv{}{t}\left(\frac{1}{2} L I^2\right).
$$

The source power splits, at each instant, into heat in the resistor and growth of the field energy. Integrated from the switch-on up to any later time $t$,

$$
\int_0^{t} \mathcal{E} I\,\dd t' = \int_0^{t} I^2 R\,\dd t' + \frac{1}{2} L I(t)^2,
$$ {#eq-balance}

because $I(0) = 0$. Nothing in that identity requires the explicit solution. The solution lets us evaluate the three terms.

::: example Rise of current on a known time constant {#ex-rl}
A series circuit has $\mathcal{E} = 12.0\,\mathrm{V}$, $R = 30.0\,\Omega$ and $L = 0.150\,\mathrm{H}$. The switch closes at $t = 0$ with $I = 0$. Find $\tau$, the final current, the current and the two voltages at $t = \tau$, and the split of energy up to that instant between the resistor and the inductor.
::: solution
The time constant and the final current are

$$
\tau = \frac{L}{R} = \frac{0.150}{30.0} = 5.00\times 10^{-3}\,\mathrm{s}, \qquad I_\infty = \frac{12.0}{30.0} = 0.400\,\mathrm{A}.
$$

At $t = \tau$, [[#eq-rl]] gives

$$
I(\tau) = 0.400\bigl(1 - e^{-1}\bigr) = 0.400\times 0.632121 = 0.2528\,\mathrm{A}.
$$

The resistor voltage is $I R = 7.585\,\mathrm{V}$. The inductor voltage is $\mathcal{E}\, e^{-1} = 4.415\,\mathrm{V}$. They add to $12.00\,\mathrm{V}$, which is the source. To three significant figures the current is $0.253\,\mathrm{A}$ and the voltages are $7.59\,\mathrm{V}$ and $4.41\,\mathrm{V}$; the extra digit is kept here so that the check against $12.0\,\mathrm{V}$ is not spoiled by rounding.

The field energy at that instant is

$$
U(\tau) = \frac{1}{2}(0.150)(0.2528)^2 = 4.795\times 10^{-3}\,\mathrm{J}.
$$

The final field energy, after many time constants, is $\tfrac{1}{2}(0.150)(0.400)^2 = 1.20\times 10^{-2}\,\mathrm{J}$. At one time constant the field holds $(1 - e^{-1})^2 = 0.3996$ of its final energy, about $40\%$, not $63\%$. Energy tracks $I^2$, and $0.632^2$ is not $0.632$.

For the heat, scale $u = t/\tau$. Then

$$
\int_0^{\tau} I^2 R\,\dd t = R I_\infty^2 \tau \int_0^{1} \bigl(1 - e^{-u}\bigr)^2\,\dd u.
$$

The definite integral equals $2e^{-1} - \tfrac{1}{2}e^{-2} - \tfrac{1}{2} = 0.16809$. The prefactor is $30.0\times(0.400)^2\times 5.00\times 10^{-3} = 2.40\times 10^{-2}\,\mathrm{J}$. The heat is $4.034\times 10^{-3}\,\mathrm{J}$. The source has supplied

$$
\int_0^{\tau} \mathcal{E} I\,\dd t = \mathcal{E} I_\infty \tau \int_0^{1}\bigl(1 - e^{-u}\bigr)\,\dd u = (2.40\times 10^{-2})\, e^{-1} = 8.829\times 10^{-3}\,\mathrm{J}.
$$

Heat plus field energy is $4.034\times 10^{-3} + 4.795\times 10^{-3} = 8.829\times 10^{-3}\,\mathrm{J}$, which matches the source. [[#eq-balance]] holds for this numerical split and not only as a formal identity. Up to one time constant, slightly more than half of the energy drawn from the battery is in the field, and the rest has already heated the resistor. Waiting forever changes the comparison, because the battery then continues to supply $I_\infty^2 R$ for all later time while the field energy stays at $1.20\times 10^{-2}\,\mathrm{J}$.
:::
:::

## The LC circuit {#lc}

Replace the resistor and the battery by a capacitor. The loop then contains only $L$ and $C$. Current charges the capacitor, the capacitor voltage pushes back, the current reverses, and the energy moves from the magnetic field to the electric field and back. With no resistor there is nowhere for the energy to leave. The motion is the electrical copy of a mass on a spring.

::: theorem Ideal LC oscillation {#thm-lc}
Let a capacitor $C$ and an inductor $L$, both constant, form a loop with negligible resistance. Let $Q$ be the charge on the capacitor plate toward which the positive current flows, so that $I = \dd Q/\dd t$. Then

$$
\deriv{^2 Q}{t^2} + \frac{1}{LC} Q = 0.
$$ {#eq-lc}

The general solution is $Q(t) = A\cos\omega t + B\sin\omega t$ with

$$
\omega = \frac{1}{\sqrt{LC}}.
$$ {#eq-omega-lc}

The quantity

$$
U = \frac{1}{2} L I^2 + \frac{Q^2}{2C}
$$

is constant.
:::

::: proof
The inductor drop in the direction of $I$ is $L\,\dd I/\dd t$. The capacitor drop in that same direction is $Q/C$, because $Q$ was defined as the charge on the plate the current is running toward, which is the plate at the higher potential when $Q > 0$. There is no source and no resistor. The loop rule is

$$
L\deriv{I}{t} + \frac{Q}{C} = 0.
$$

Substitute $I = \dd Q/\dd t$:

$$
L\deriv{^2 Q}{t^2} + \frac{Q}{C} = 0,
$$

which is [[#eq-lc]]. This is the simple-harmonic equation. The functions whose second derivative is a negative constant times themselves are the sines and cosines of $\omega t$ with $\omega^2 = 1/(LC)$, and $\omega$ is taken positive, which is [[#eq-omega-lc]]. The two constants $A$ and $B$ are fixed by the initial charge and the initial current.

Differentiate the proposed energy. With $I = \dd Q/\dd t$,

$$
\deriv{U}{t} = L I\deriv{I}{t} + \frac{Q}{C}\deriv{Q}{t} = I\left(L\deriv{I}{t} + \frac{Q}{C}\right) = 0,
$$

by the loop rule. A derivative that vanishes identically is a constant of the motion. At an instant when the current is zero the energy is entirely in the capacitor. At an instant when the charge is zero it is entirely in the inductor. The oscillation trades one for the other at angular frequency $\omega$.
:::

The period is $T = 2\pi\sqrt{LC}$. A nonzero resistance adds a term $R\,\dd Q/\dd t$ to the loop rule and the oscillation decays. That damped circuit, driven by an alternating source, is the subject of [[magnetism/ac-circuits]]. The angular frequency [[#eq-omega-lc]] survives there as the resonance frequency.

::: example Energy moving between L and C {#ex-lc}
An inductor $L = 80.0\,\mathrm{mH}$ is connected across a capacitor $C = 2.00\,\mu\mathrm{F}$. At $t = 0$ the capacitor charge is $Q_0 = 50.0\,\mu\mathrm{C}$ and the current is zero. Find the angular frequency, the frequency in hertz, the period, the constant energy, and the greatest current.
::: solution
[[#eq-omega-lc]] gives

$$
\omega = \frac{1}{\sqrt{(0.0800)(2.00\times 10^{-6})}} = \frac{1}{\sqrt{1.60\times 10^{-7}}} = 2.50\times 10^{3}\,\mathrm{rad/s},
$$

since $(4.00\times 10^{-4})^2 = 1.60\times 10^{-7}$. The frequency and the period are

$$
f = \frac{\omega}{2\pi} = 397.9\,\mathrm{Hz}, \qquad T = \frac{2\pi}{\omega} = 2.513\times 10^{-3}\,\mathrm{s}.
$$

To three significant figures, $f = 398\,\mathrm{Hz}$ and $T = 2.51\,\mathrm{ms}$.

The initial current is zero, so [[#thm-lc]] says $Q(t) = Q_0\cos\omega t$. The energy is entirely electric at $t = 0$:

$$
U = \frac{Q_0^2}{2C} = \frac{(5.00\times 10^{-5})^2}{2\times 2.00\times 10^{-6}} = 6.25\times 10^{-4}\,\mathrm{J}.
$$

It stays at that value. When $Q = 0$ the whole of $U$ is $\tfrac{1}{2} L I_{\max}^2$, so

$$
I_{\max} = \sqrt{\frac{2U}{L}} = \sqrt{\frac{1.25\times 10^{-3}}{0.0800}} = \sqrt{0.015625} = 0.125\,\mathrm{A}.
$$

Differentiating the charge gives the same number: $I = \dd Q/\dd t = -\omega Q_0\sin\omega t$, and $\omega Q_0 = (2.50\times 10^{3})(5.00\times 10^{-5}) = 0.125\,\mathrm{A}$. The minus sign says that a positive initial charge begins to decrease, so the initial current, in the sense that would increase $Q$, is negative. The greatest magnitude is $0.125\,\mathrm{A}$.
:::
:::

## Where this leads {#leads}

[[magnetism/ac-circuits]] drives the series combination of $R$, $L$ and $C$ with an alternating source. The $LC$ resonance of [[#eq-omega-lc]] becomes the frequency at which the current is largest, and the $RL$ transient of [[#eq-rl]] becomes the short-lived part of the solution that dies before the steady oscillation is all that remains. Impedance is the language in which $L\,\dd I/\dd t$ and the capacitor voltage are added to $IR$ when every voltage is sinusoidal.

[[magnetism/maxwell]] asks what is happening in the space around the wires. The identity in [[#prop-density]] is the first hint that the energy credited to $L$ is really in the field. The displacement current and the wave equation are what that hint grows into. A transformer, treated properly, is two coupled inductors with a large $\abs{k}$, not a new law.

The mechanical analogy remains useful and remains incomplete. Mass resembles $L$, the spring constant resembles $1/C$, and friction resembles $R$. [[oscillations/simple-harmonic]] and [[oscillations/resonance]] are the same differential equations with different nouns. What they do not contain is the sign of a mutual inductance, or the requirement that $M^2$ cannot exceed $L_1 L_2$.

::: history Henry, Faraday, and the name of the coefficient
On 29 August 1831 Michael Faraday, with two windings on an iron ring, found that a changing current in one circuit induces a current in the other. That is mutual induction. The law is stated in [[magnetism/faraday]]. Self-induction is the same law with both roles played by one circuit.

Joseph Henry published the self-induction effect in 1832, in the American Journal of Science, under the title “On the Production of Currents and Sparks of Electricity from Magnetism”. A long coiled conductor, carrying current from a battery, produced a spark at the moment the circuit was broken; a short wire in the same conditions did not. He attributed the spark to the reaction of the long wire on itself. The SI unit of inductance is named for that work. No sentence of his paper is quoted here.

Maxwell’s Treatise on Electricity and Magnetism (1873) placed the coefficient of self-induction inside a field theory and made it part of the systematic description of circuits. The word inductance itself is later. Oliver Heaviside, in the 1880s, introduced it as the name of that coefficient, alongside capacitance and impedance. Henry found the phenomenon. Maxwell built it into the theory. Heaviside gave it the name used in this chapter. The circuit formulae above are the undergraduate form of that development, not a transcript of any one of the three papers.
:::

::: summary
- For a linear coil with no permanent magnet, the flux linkage is $\Lambda = L I$, and $L$ is the self-inductance in henry.
- The induced emf in the positive sense is $\mathcal{E} = -L\,\dd I/\dd t$. The potential drop in the direction of the current is $v_L = L\,\dd I/\dd t$. Do not insert both minus signs.
- A long solenoid in vacuum has $L = \mu_0 n^2 A \ell$. Doubling the turn density multiplies $L$ by four.
- Building a current from zero stores $U = \tfrac{1}{2} L I^2$. For the ideal solenoid this equals the integral of $B^2/(2\mu_0)$ over the interior, and that agreement has to be shown, not assumed.
- Mutual inductance satisfies $\mathcal{E}_1 = -M\,\dd I_2/\dd t$ and $M_{12} = M_{21}$. The energy is $\tfrac{1}{2} L_1 I_1^2 + \tfrac{1}{2} L_2 I_2^2 + M I_1 I_2$, and $\abs{M} \le \sqrt{L_1 L_2}$.
- A series $RL$ circuit switched onto a constant source at $I = 0$ rises as $I = (\mathcal{E}/R)(1 - e^{-t/\tau})$ with $\tau = L/R$. Discharge from $I_0$ is $I_0 e^{-t/\tau}$.
- At each instant $\mathcal{E} I = I^2 R + \dd(\tfrac{1}{2} L I^2)/\dd t$. The source pays for heat and for the field.
- An ideal $LC$ loop oscillates at $\omega = 1/\sqrt{LC}$, and $\tfrac{1}{2} L I^2 + Q^2/(2C)$ is constant. Resistance and an alternating source are the next chapter.
:::

## Exercises {#exercises}

::: exercise Inductance of a longer solenoid {level=1 check="4*pi*1e-7*1500^2*2.5e-4*0.8"}
A long solenoid has $n = 1500\,\mathrm{m^{-1}}$, cross-sectional area $A = 2.50\times 10^{-4}\,\mathrm{m^2}$ and length $\ell = 0.800\,\mathrm{m}$. Find $L$ in henry. An exact expression is accepted.
::: solution
[[#eq-solenoid]] applies directly. The medium is the vacuum of the formula, and the solenoid is long by the problem’s statement.

$$
L = \mu_0 n^2 A \ell = (4\pi\times 10^{-7})(1500)^2(2.50\times 10^{-4})(0.800).
$$

First, $1500^2 = 2.25\times 10^{6}$. Then $2.25\times 10^{6}\times 2.50\times 10^{-4} = 562.5$, and $562.5\times 0.800 = 450$. Finally

$$
L = 450\times 4\pi\times 10^{-7} = 1.80\pi\times 10^{-4} = 5.655\times 10^{-4}\,\mathrm{H}.
$$

To three significant figures, $L = 5.65\times 10^{-4}\,\mathrm{H}$. The exact value is the product written in the first line. The current does not appear. Self-inductance, under the linear hypothesis, is a property of the winding and the medium, not of the current that happens to be flowing.
:::
:::

::: exercise Energy in a known inductor {level=1 check="0.5*0.25*0.8^2"}
An inductor of $L = 0.250\,\mathrm{H}$ carries a steady current $I = 0.800\,\mathrm{A}$. Find the stored energy in joule.
::: solution
[[#eq-energy]] with a constant $L$ gives

$$
U = \frac{1}{2} L I^2 = \frac{1}{2}(0.250)(0.800)^2 = \frac{1}{2}(0.250)(0.640) = 0.0800\,\mathrm{J}.
$$

The current is steady, so the self-induced emf is zero and no power is entering the inductor. The energy was stored while the current was being established, and it remains in the field for as long as the current remains. Switching the current off, by the discharge of [[#cor-decay]] or by any other path, returns that $0.0800\,\mathrm{J}$ to the circuit.
:::
:::

::: exercise Time constant {level=1 check="0.15/30"}
A series $RL$ circuit has $L = 0.150\,\mathrm{H}$ and $R = 30.0\,\Omega$. Find the time constant $\tau$ in seconds.
::: solution
[[#eq-tau]] is the ratio that appears in the exponent of [[#eq-rl]] and of [[#eq-decay]]:

$$
\tau = \frac{L}{R} = \frac{0.150}{30.0} = 5.00\times 10^{-3}\,\mathrm{s}.
$$

No source voltage is required. The time constant is fixed by $L$ and $R$ even though the final current $\mathcal{E}/R$ is not. After one time constant a charging current has reached $1 - e^{-1}$ of its final value, and a discharging current has fallen to $e^{-1}$ of its initial value. Both statements use this same $\tau$.
:::
:::

::: exercise Time to half the final current {level=2 check="0.005*ln(2)"}
The circuit of the previous exercise is connected to a constant source at $t = 0$ with $I(0) = 0$. The time constant is $5.00\,\mathrm{ms}$. Find the time, in seconds, at which the current reaches half of its final value.
::: hint
:::
Set $1 - e^{-t/\tau} = 1/2$ and solve for $t$. The source voltage cancels out of the ratio $I/I_\infty$.
::: solution
By [[#thm-rl]],

$$
\frac{I(t)}{I_\infty} = 1 - e^{-t/\tau}.
$$

Half the final current means the left side equals $1/2$:

$$
e^{-t/\tau} = \frac{1}{2}, \qquad \frac{t}{\tau} = \ln 2, \qquad t = \tau\ln 2.
$$

With $\tau = 5.00\times 10^{-3}\,\mathrm{s}$,

$$
t = (5.00\times 10^{-3})\ln 2 = 3.466\times 10^{-3}\,\mathrm{s}.
$$

To three significant figures, $t = 3.47\,\mathrm{ms}$. The result is a little shorter than one time constant, because $1 - e^{-1} = 0.632$ is already more than half. The voltage of the source and the value of the final current never enter. Any constant $\mathcal{E}$ gives the same $t$ for a given $\tau$.
:::
:::

::: exercise Average emf while a current is quenched {level=2 check="0.004*3/0.002"}
An inductor $L = 4.00\,\mathrm{mH}$ carries $3.00\,\mathrm{A}$. The current is brought uniformly to zero in $2.00\,\mathrm{ms}$. Find the magnitude of the average induced emf during that interval, in volts.
::: solution
[[#eq-emf]] at each instant is $\mathcal{E} = -L\,\dd I/\dd t$. Over a finite interval the average of $\dd I/\dd t$ is $\Delta I/\Delta t$, so the average emf is $-L\,\Delta I/\Delta t$. Here $\Delta I = 0 - 3.00 = -3.00\,\mathrm{A}$ and $\Delta t = 2.00\times 10^{-3}\,\mathrm{s}$:

$$
\abs{\mathcal{E}_{\mathrm{avg}}} = L\frac{\abs{\Delta I}}{\Delta t} = (4.00\times 10^{-3})\frac{3.00}{2.00\times 10^{-3}} = 6.00\,\mathrm{V}.
$$

Uniform decrease was used when the average of the derivative was replaced by the ratio of the changes. A current that lingered near $3.00\,\mathrm{A}$ and then collapsed in the last instant would have the same $\Delta I$ and the same average emf, but a much larger peak. The average fixes only the volt-second area, $L\abs{\Delta I} = 1.20\times 10^{-2}\,\mathrm{V\,s}$. The initial stored energy is a different quantity, $\tfrac{1}{2}(4.00\times 10^{-3})(3.00)^2 = 1.80\times 10^{-2}\,\mathrm{J}$, and is not required for the emf.
:::
:::

::: exercise Emf in an open secondary {level=2 check="4*pi*1e-7*1000*400*5e-4*25"}
Use the coils of [[#ex-mutual]]: $n_1 = 1000\,\mathrm{m^{-1}}$, $N_2 = 400$, $A = 5.00\times 10^{-4}\,\mathrm{m^2}$. The primary current rises at a constant $25.0\,\mathrm{A/s}$ and the secondary is open. Find the magnitude of the secondary emf in volts.
::: solution
From the worked example, or by the same one-line argument,

$$
M = \mu_0 n_1 N_2 A = (4\pi\times 10^{-7})(1000)(400)(5.00\times 10^{-4}) = 2.513\times 10^{-4}\,\mathrm{H}.
$$

The secondary current is zero, so there is no self-induced contribution on the secondary. The magnitude of the mutual emf is

$$
\abs{\mathcal{E}_2} = M\left\lvert\deriv{I_1}{t}\right\rvert = (2.513\times 10^{-4})(25.0) = 6.283\times 10^{-3}\,\mathrm{V}.
$$

The exact value is $M$ times $25.0$, with $M = \mu_0 n_1 N_2 A$. Three significant figures give $6.28\times 10^{-3}\,\mathrm{V}$. Opening the secondary is what makes this a pure mutual-inductance measurement: a closed secondary would carry an induced current, and that current would contribute its own flux.
:::
:::

::: exercise The coupling bound {level=3}
Assume $L_1 > 0$ and $L_2 > 0$, and assume the stored energy

$$
U = \frac{1}{2} L_1 I_1^2 + \frac{1}{2} L_2 I_2^2 + M I_1 I_2
$$

is non-negative for every real pair $(I_1, I_2)$. Prove that $M^2 \le L_1 L_2$. Define the coupling coefficient $k = M/\sqrt{L_1 L_2}$ and conclude that $\abs{k} \le 1$.
::: hint
:::
The energy is a quadratic form in the two currents. Complete the square in $I_1$, or require the discriminant of $U$ as a quadratic in the ratio $I_1/I_2$ to have the sign that keeps $U$ from crossing zero. A single cleverly chosen ratio is enough.
::: solution
Fix an arbitrary current $I_2$ and regard $U$ as a quadratic in $I_1$. If $I_2 = 0$, then $U = \tfrac{1}{2} L_1 I_1^2 \ge 0$ for every $I_1$, which we already used $L_1 > 0$ to guarantee. Now take $I_2 \ne 0$ and set $x = I_1/I_2$. Then

$$
U = I_2^2\left(\frac{1}{2} L_1 x^2 + M x + \frac{1}{2} L_2\right).
$$

The factor $I_2^2$ is positive, so the quadratic in $x$ must be non-negative for every real $x$. A quadratic $\tfrac{1}{2} L_1 x^2 + M x + \tfrac{1}{2} L_2$ with positive leading coefficient stays non-negative for all $x$ if and only if its discriminant is not positive:

$$
M^2 - 4\cdot\frac{1}{2} L_1\cdot\frac{1}{2} L_2 \le 0,
$$

that is, $M^2 - L_1 L_2 \le 0$, or $M^2 \le L_1 L_2$. Dividing by the positive number $L_1 L_2$ gives $k^2 \le 1$, hence $\abs{k} \le 1$.

Equality is reachable. If $M = \sqrt{L_1 L_2}$, the choice $x = -M/L_1$ makes the quadratic zero, so there is a ratio of currents for which the two fields store no energy. That is perfect coupling with opposing senses. If instead $\abs{M}$ exceeded $\sqrt{L_1 L_2}$, that same algebra would produce a negative $U$ for some currents, which a passive linear pair of coils cannot do. The bound is sharp, and it is a restriction on geometry, not an extra circuit element.
:::
:::

::: exercise Inductance of a coaxial cable {level=3 check="(4*pi*1e-7)*5/(2*pi)*ln(4)"}
A coaxial cable is idealised as follows. The inner conductor is a thin cylindrical shell of radius $a$, carrying current $I$ uniformly around its circumference. The return current $-I$ is a thin cylindrical shell of radius $b > a$. Between the shells there is vacuum, and outside the outer shell the field is zero. Using Ampère’s law, derive $L$ for a length $\ell$. Then show that $\int B^2/(2\mu_0)\,\dd V$ over the region between the shells equals $\tfrac{1}{2} L I^2$. Evaluate $L$ in henry for $a = 2.00\,\mathrm{mm}$, $b = 8.00\,\mathrm{mm}$ and $\ell = 5.00\,\mathrm{m}$.
::: hint
:::
For $a < r < b$ the enclosed current is $I$, so $B = \mu_0 I/(2\pi r)$. The flux through a longitudinal rectangle of length $\ell$ between the shells is the linkage of the go-and-return. Internal inductance is absent because the current has been placed on the surfaces.
::: solution
Ampère’s law on a circle of radius $r$ centred on the axis gives $B\cdot 2\pi r = \mu_0 I_{\mathrm{enc}}$. For $r < a$ the circle encloses no current, so $B = 0$. For $a < r < b$ the circle encloses $I$, so

$$
B = \frac{\mu_0 I}{2\pi r},
$$

azimuthal, with the right-hand sense of the inner current. For $r > b$ the enclosed current is $I - I = 0$, so $B = 0$.

The flux linkage for length $\ell$ is the flux of this $\mathbf{B}$ through a rectangular surface that runs from $r = a$ to $r = b$ and a distance $\ell$ along the cable. $\mathbf{B}$ is perpendicular to that rectangle. Therefore

$$
\Lambda = \int_a^{b} B\,\ell\,\dd r = \frac{\mu_0 I \ell}{2\pi}\int_a^{b}\frac{\dd r}{r} = \frac{\mu_0 I \ell}{2\pi}\ln\frac{b}{a}.
$$

The go-and-return is a single loop, so this flux is the whole linkage. [[#def-self]] gives

$$
L = \frac{\Lambda}{I} = \frac{\mu_0 \ell}{2\pi}\ln\frac{b}{a}.
$$

For the energy integral only $a < r < b$ contributes. In a cylindrical shell of radius $r$, thickness $\dd r$ and length $\ell$ the volume is $2\pi r\,\ell\,\dd r$, and

$$
\int \frac{B^2}{2\mu_0}\,\dd V = \int_a^{b} \frac{1}{2\mu_0}\left(\frac{\mu_0 I}{2\pi r}\right)^2 2\pi r \ell\,\dd r = \int_a^{b} \frac{\mu_0 I^2 \ell}{4\pi r}\,\dd r = \frac{\mu_0 I^2 \ell}{4\pi}\ln\frac{b}{a}.
$$

The right-hand side is $\tfrac{1}{2} L I^2$ with the $L$ just obtained. The circuit energy and the field integral agree for this geometry, as they did for the solenoid in [[#prop-density]], by a direct computation rather than by an appeal to the general theorem.

With $b/a = 4$ and $\ell = 5.00\,\mathrm{m}$,

$$
L = \frac{(4\pi\times 10^{-7})(5.00)}{2\pi}\ln 4 = (1.00\times 10^{-6})\ln 4 = 1.386\times 10^{-6}\,\mathrm{H}.
$$

To three significant figures, $L = 1.39\times 10^{-6}\,\mathrm{H}$. A solid inner wire with the current spread through its cross-section would add the internal inductance $\mu_0 \ell/(8\pi)$, which this surface-current idealisation leaves out. The exercise asked for the external inductance, and that is the value above.
:::
:::
