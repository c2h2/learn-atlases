Almost every structure in engineering has a natural frequency, and almost every machine has an exciting one. Vibration is what happens when the two meet, and the whole subject rests on a single act of idealisation: replacing the continuous, distributed, infinitely-many-degree-of-freedom object in front of you by a mass, a spring and a dashpot. That idealisation is not a convenience — it is usually good to a few per cent for the first mode, which is the one that matters, and it is the reason a first-year calculation predicts the resonance of a real machine well enough to design around it.

Three numbers describe a simple oscillator: its mass, its stiffness and its damping. Of these, stiffness is the one engineers control by design, mass is the one they control by weight saving, and damping is the one they usually cannot predict and must measure. The natural frequency $\omega_n = \sqrt{k / m}$ is the most quoted formula in dynamics and the most misapplied, because getting $k$ and $m$ right for a real object — as opposed to a textbook block on a spring — requires knowing how stiffness and inertia **add**, and in particular that a distributed beam carries a fraction of its own mass into the lumped model, not all of it.

::: warning A system's natural frequency is a property of the system, not of the disturbance
The natural frequency does not depend on the amplitude, the shape or even the presence of the excitation; it is fixed by the mass and stiffness distribution alone. A structure struck gently, struck hard, or not struck at all has the same natural frequencies, and the only question is which of them the disturbance **excites** and how strongly. The corollary catches out a great deal of plant: a machine that "has a resonance at $47\ \mathrm{Hz}$" has one at $47\ \mathrm{Hz}$ whether or not it is running, and changing the speed merely moves the excitation across it. Adding mass lowers the frequency, adding stiffness raises it, and damping changes the **height** of the peak without moving it far — which is why "fit a damper" is the wrong first response to a resonance and "move the frequency" is usually the right one.
:::

## The lumped model

::: definition Single-degree-of-freedom model {#def-sdof}
A system with **one degree of freedom** needs one coordinate to describe its configuration. Its linearised model is
$$
m \ddot{x} + c \dot{x} + k x = F (t),
$$
with natural frequency, circular frequency and period
$$
\omega_n = \sqrt{\frac{k}{m}}, \qquad
f_n = \frac{1}{2 \pi} \sqrt{\frac{k}{m}}, \qquad
\tau = 2 \pi \sqrt{\frac{m}{k}} .
$$
Equivalent stiffnesses and masses combine as
$$
k_{\text{parallel}} = \sum k_i, \qquad
\frac{1}{k_{\text{series}}} = \sum \frac{1}{k_i}, \qquad
m_{\text{eq}} = \sum m_i \left( \frac{v_i}{\dot{x}} \right)^{2} + \sum I_i \left( \frac{\omega_i}{\dot{x}} \right)^{2} ,
$$
the last being obtained by equating the kinetic energy of the real system to $\tfrac{1}{2} m_{\text{eq}} \dot{x}^{2}$. A translational and a rotational system about a pivot are the same equation with $m \to I_O$, $k \to k_\theta$, $x \to \theta$.
:::

::: proof Equivalent systems by energy {#proof-equiv}
Suppose the whole configuration follows from one coordinate $x$. The kinetic energy of the real system is
$$
T = \tfrac{1}{2} \sum_i m_i v_i^{2} + \tfrac{1}{2} \sum_j I_j \omega_j^{2} .
$$
For a **linear** kinematic chain each velocity is proportional to $\dot{x}$, say $v_i = \alpha_i \dot{x}$ and $\omega_j = \beta_j \dot{x}$, where the $\alpha_i, \beta_j$ are pure numbers fixed by the geometry. Then
$$
T = \tfrac{1}{2} \left[ \sum_i m_i \alpha_i^{2} + \sum_j I_j \beta_j^{2} \right] \dot{x}^{2}
= \tfrac{1}{2} m_{\text{eq}} \dot{x}^{2},
$$
which identifies $m_{\text{eq}}$. Doing the same for the strain energy $V = \tfrac{1}{2} k_{\text{eq}} x^{2}$ identifies $k_{\text{eq}}$, and substituting both into $\omega_n = \sqrt{k_{\text{eq}} / m_{\text{eq}}}$ gives the frequency of the idealised model. $\checkmark$

*Note.* The proof requires the velocity ratios to be **constant**, which is true for levers at small angles, for links in translation and for pure rotations about fixed pivots. It is not true for a slider-crank, whose ratios depend on the crank angle: such a system has a **variable** equivalent mass, and its free vibration is not simple harmonic.
:::

::: example Cantilever with a tip mass {#ex-cantilever}
A steel cantilever $500\ \mathrm{mm}$ long, $25\ \mathrm{mm}$ wide and $6\ \mathrm{mm}$ thick carries a $5\ \mathrm{kg}$ mass at its free end. Find the natural frequency, and the error made by neglecting the beam's own mass.
::: solution
**Stiffness.** With $I = b t^{3} / 12 = 4.5 \times 10^{- 10}\ \mathrm{m^{4}}$,
$$
k = \frac{3 E I}{L^{3}} = \frac{3 \times 200 \times 10^{9} \times 4.5 \times 10^{- 10}}{0.5^{3}}
= 2160\ \mathrm{N / m}.
$$
**Neglecting the beam.**
$$
f_n = \frac{1}{2 \pi} \sqrt{\frac{2160}{5}} = 3.31\ \mathrm{Hz}.
$$
**Including the beam.** A uniform beam in its first mode carries the fraction $33 / 140$ of its own mass into the tip, and its mass is
$$
m_b = 7850 \times 0.025 \times 0.006 \times 0.5 = 0.589\ \mathrm{kg},
\qquad m_{\text{eff}} = \frac{33}{140} \times 0.589 = 0.139\ \mathrm{kg},
$$
$$
f_n = \frac{1}{2 \pi} \sqrt{\frac{2160}{5.139}} = 3.26\ \mathrm{Hz}.
$$
The error is $1.4$ per cent.

*Check.* The static deflection under the $5\ \mathrm{kg}$ load is $W / k = 49.05 / 2160 = 22.7\ \mathrm{mm}$, and $f_n = \left( 2 \pi \right)^{- 1} \sqrt{g / \delta_{\text{st}}} = 3.31\ \mathrm{Hz}$ $\checkmark$

*Sanity.* The beam's mass is $12$ per cent of the tip mass but contributes only $2.8$ per cent to the equivalent mass, because most of the beam is near the root where it barely moves. That is the whole content of the $33 / 140$, and it is why a leaf spring, a vehicle wishbone or a robot arm is lightened at the **tip** rather than at the root: moving mass towards a node costs almost nothing in frequency, and moving it towards the antinode costs everything. Halving the tip mass here raises the frequency by $40$ per cent; halving the beam's mass raises it by $0.7$ per cent.
:::
:::

::: widget plot
f: sqrt(2160/(x+0.139))/(2*pi)
x: 0, 20
y: 0, 21
labels: \text{natural frequency } f_n \ \left( \mathrm{Hz} \right)
caption: Natural frequency of the cantilever of Example 1 against the tip mass $x$ in kilograms, including the beam's effective mass of $0.139\ \mathrm{kg}$. The curve is a $1 / \sqrt{m}$ hyperbola, steep at small masses and flat at large ones — which is the reason adding ballast to a structure is a **poor** way to detune it once it is already heavy, and an extremely effective one when it is light. As $x \to 0$ the curve tends to $19.9\ \mathrm{Hz}$, the lumped-model estimate of the bare cantilever's first mode, which means a tip mass of $5\ \mathrm{kg}$ has already dropped the frequency by a factor of six: heavy attachments on light structures are the commonest cause of an unexpected resonance in plant, and the fix is to stiffen rather than to add mass.
:::

::: example Lever-scaled spring and mass {#ex-lever-sdof}
A bell-crank lever of negligible mass has arms of $400\ \mathrm{mm}$ and $150\ \mathrm{mm}$ at right angles. A spring of $50\ \mathrm{kN / m}$ is attached to the short arm and a $25\ \mathrm{kg}$ mass to the long one. Find the natural frequency.
::: solution
Everything must be referred to **one** coordinate. Taking the long arm's deflection $x$, the spring moves by $x \times 150 / 400$, so
$$
k_{\text{eq}} = k \left( \frac{b}{a} \right)^{2}
= 50\,000 \times \left( \frac{0.15}{0.40} \right)^{2} = 7031\ \mathrm{N / m},
\qquad
\omega_n = \sqrt{\frac{7031}{25}} = 16.8\ \mathrm{rad / s} = 2.67\ \mathrm{Hz}.
$$
*Check.* The static deflection under the mass, referred to the long arm, is $m g / k_{\text{eq}} = 245 / 7031 = 34.9\ \mathrm{mm}$, and $\left( 2 \pi \right)^{- 1} \sqrt{9.81 / 0.0349} = 2.67\ \mathrm{Hz}$ $\checkmark$

*Sanity.* The stiffness is scaled by the **square** of the lever ratio, because the spring moves less and the force it delivers is multiplied by the same ratio — the two effects multiply. This is the same arithmetic as the reflected inertia of a gear ratio in [[dynamics/rigid-body-kinetics]], and it is why a governor, a valve gear or a spring-loaded safety valve can be made to feel soft or hard by moving a pin hole: a $2 : 1$ lever change alters the frequency by a factor of two without changing the spring, the mass or the weight of anything. It is also the reason a car's rear anti-roll bar rate at the axle is not the bar's own torsional rate, and why the numbers quoted in a suspension supplier's catalogue are always stated "at the wheel".
:::
:::

## The static-deflection shortcut

::: theorem Frequency from static deflection {#thm-static-defl}
For any system whose restoring force is a linear spring and whose inertia acts in one direction,
$$
\omega_n = \sqrt{\frac{g}{\delta_{\text{st}}}}, \qquad
f_n = \frac{1}{2 \pi} \sqrt{\frac{g}{\delta_{\text{st}}}}, \qquad
\tau = 2 \pi \sqrt{\frac{\delta_{\text{st}}}{g}},
$$
where $\delta_{\text{st}}$ is the static deflection produced by the weight of the vibrating mass acting in the direction of vibration.
:::

::: proof The static-deflection form {#proof-static-defl}
At equilibrium the spring force balances the weight,
$$
k \delta_{\text{st}} = m g \quad\Longrightarrow\quad
\frac{k}{m} = \frac{g}{\delta_{\text{st}}} .
$$
Substituting into $\omega_n = \sqrt{k / m}$ gives the result. $\checkmark$

*Note.* The deflection must be measured or computed **in the direction of vibration** and under the **whole** vibrating weight. For a building in lateral sway, $\delta_{\text{st}}$ is the lateral deflection under the seismic weight — which is why the familiar rule $f_n \approx 15.8 / \sqrt{\delta_{\text{st}}}\ \mathrm{Hz}$, with $\delta_{\text{st}}$ in millimetres, is not an empirical rule but this identity with $g$ put in.
:::

::: example Building period {#ex-building}
A five-storey frame sways $100\ \mathrm{mm}$ laterally under a lateral load equal to its own weight. Estimate its fundamental period.
::: solution
$$
\tau = 2 \pi \sqrt{\frac{\delta_{\text{st}}}{g}}
= 2 \pi \sqrt{\frac{0.100}{9.81}} = 0.634\ \mathrm{s},
\qquad f_n = 1.58\ \mathrm{Hz}.
$$
*Sanity.* A period of $0.63\ \mathrm{s}$ puts the building squarely in the range where mid-rise buildings are damaged in earthquakes, because most damaging ground motion has a strong component between $0.3$ and $1.0\ \mathrm{s}$. Long-period buildings are, in turn, vulnerable to the long-period motion of large distant earthquakes, especially on soft soil: in the 1985 Michoacán earthquake, centred about $350\ \mathrm{km}$ from Mexico City, the lake-bed clay amplified motion with a period of about $2\ \mathrm{s}$, and the worst damage was to buildings of roughly $6$ to $15$ storeys whose periods were close to it, while low buildings were much less affected. And it is why a base-isolated building is deliberately given a period of $2$ to $3\ \mathrm{s}$ — moving the frequency **below** the damaging band rather than trying to strengthen against it.
:::
:::

## Torsional and rotational systems

::: example Torsional vibration of a shaft {#ex-torsional}
A disc of polar inertia $0.05\ \mathrm{kg\,m^{2}}$ is fixed at the middle of a steel shaft $30\ \mathrm{mm}$ in diameter and $800\ \mathrm{mm}$ long between rigid bearings. Find the torsional natural frequency.
::: solution
$$
J = \frac{\pi d^{4}}{32} = \frac{\pi \times 0.03^{4}}{32} = 7.95 \times 10^{- 8}\ \mathrm{m^{4}},
$$
and the disc sees **two** shaft halves in parallel, each of length $0.4\ \mathrm{m}$,
$$
k_\theta = 2 \times \frac{G J}{0.4}
= 2 \times \frac{80 \times 10^{9} \times 7.95 \times 10^{- 8}}{0.4}
= 31\,810\ \mathrm{N\,m / rad},
$$
$$
\omega_n = \sqrt{\frac{31\,810}{0.05}} = 798\ \mathrm{rad / s}
= 127\ \mathrm{Hz}.
$$
*Check.* A single $0.4\ \mathrm{m}$ shaft would give $15\,900\ \mathrm{N\,m / rad}$ and $89.8\ \mathrm{Hz}$; putting the disc in the middle doubles the stiffness and multiplies the frequency by $\sqrt{2}$. $\checkmark$

*Sanity.* One hundred and twenty-seven hertz is above the excitation range of most machinery, which is why torsional resonance is often forgotten — until a reciprocating engine or a large slow-speed diesel is involved. There the torsional modes of the crankshaft, at frequencies set by the **masses of the flywheel and the damper** rather than by the shaft, can coincide with a firing-order harmonic, and the resulting alternating torque is what breaks crankshafts at the fillet radius. That is why every large reciprocating engine has a torsional vibration damper on the nose of the crank, sized from a Holzer calculation of exactly this kind, and why a ship's engine is tested for torsional stress with a strain gauge on the crank before it is ever handed over.
:::
:::

::: example Rocking cylinder {#ex-rocking}
A solid cylinder of radius $100\ \mathrm{mm}$ rolls without slipping on the inside of a fixed cylindrical surface of radius $500\ \mathrm{mm}$. Find its natural frequency for small oscillations.
::: solution
From [[dynamics/rigid-body-energy-momentum]] the equation of motion is
$$
\ddot{\theta} + \frac{2 g}{3 \left( R - r \right)} \sin \theta = 0
\quad\Longrightarrow\quad
\omega_n = \sqrt{\frac{2 g}{3 \left( R - r \right)}}
= \sqrt{\frac{2 \times 9.81}{3 \times 0.4}} = 4.04\ \mathrm{rad / s},
$$
$$
f_n = 0.643\ \mathrm{Hz}, \qquad \tau = 1.55\ \mathrm{s}.
$$
*Sanity.* The frequency is that of a simple pendulum of length $1.5 \left( R - r \right) = 0.6\ \mathrm{m}$, the extra half-length being the price of the rotation. Note that the cylinder's **own radius has vanished** from the answer, because both the path and the spin scale with $R - r$; but its **shape** has not, since the $\tfrac{2}{3}$ becomes $\tfrac{5}{7}$ for a sphere and $\tfrac{1}{2}$ for a hoop. This is the cleanest available illustration of the general rule that a natural frequency depends on the **distribution** of mass and not on its amount.
:::
:::

## Rayleigh's method

::: proposition Rayleigh's quotient {#prop-rayleigh}
For a conservative system vibrating in a mode, the peak kinetic and strain energies are equal. Assuming a deflection shape $y (x)$ gives the **Rayleigh quotient**
$$
\omega^{2} = \frac{\int_0^L E I \left( y^{\prime \prime} \right)^{2} \mathrm{d} x}
{\int_0^L m \, y^{2} \mathrm{d} x + \sum_i m_i y \left( x_i \right)^{2}} ,
$$
which is an **upper bound** on the true fundamental frequency, and is exact when the assumed shape is the true mode. The bound is remarkably good: any reasonable shape gives the first frequency to within a per cent or two, because the quotient is stationary at the true mode and the error is second-order in the shape error.
:::

::: example Rayleigh estimate for a uniform cantilever {#ex-rayleigh}
Estimate the first natural frequency of the cantilever of Example 1 with no tip mass, using the static deflection curve of a tip-loaded beam as the assumed shape.
::: solution
Take $y = 3 L x^{2} - x^{3}$, which satisfies the geometric boundary conditions at the root and the force boundary condition at the tip. Then
$$
\int_0^L \left( y^{\prime \prime} \right)^{2} \mathrm{d} x = 1.50\ \mathrm{m^{5}}, \qquad
\int_0^L y^{2} \mathrm{d} x = 7.366 \times 10^{- 3}\ \mathrm{m^{9}},
$$
and with $m = 1.1775\ \mathrm{kg / m}$,
$$
\omega^{2} = \frac{90 \times 1.50}{1.1775 \times 7.366 \times 10^{- 3}} = 15\,560\ \mathrm{s^{- 2}},
\qquad
f_n = 19.86\ \mathrm{Hz}.
$$
The exact value, $\left( 1.875^{2} / 2 \pi \right) \sqrt{E I / m L^{4}}$, is $19.57\ \mathrm{Hz}$, an error of $+ 1.5$ per cent.

*Check.* Rayleigh's quotient is always an over-estimate, and it is: $19.86 > 19.57$. A **rigid-body** shape — a straight line pivoted at the root — is not admissible: it violates the zero-slope condition at the root, and since $y^{\prime \prime} = 0$ it stores no bending energy, so the quotient gives zero. The assumed shape must satisfy the geometric boundary conditions for the bound to hold. $\checkmark$

*Sanity.* One and a half per cent from a shape guessed in one line. This is why Rayleigh's method is the working engineer's tool rather than an academic curiosity: it turns "what is the frequency of this thing?" into an integral that can be done by hand, and it tells you in which direction the error lies. The companion **Dunkerley** estimate, which adds the compliances of the parts and gives a **lower** bound, brackets the answer from the other side, and the two together usually enclose the true frequency within a few per cent without any computer.
:::
:::

::: history
The mathematics of vibration begins with d'Alembert's wave equation of 1747 and Daniel Bernoulli's superposition of harmonics for the vibrating string (1753). Lord Rayleigh's *Theory of Sound* (1877–1878) systematised the energy methods behind the quotient used above. Engineering results followed the problems of machines: **Dunkerley**'s 1894 paper on the whirling and vibration of shafts gave a hand formula that bounds the first frequency from below; **Holzer**'s tabular method for the torsional vibration of multi-rotor shafts appeared in 1921; and **Campbell**'s 1924 study of turbine-disc vibration at General Electric introduced the frequency-against-speed diagram that bears his name. **Den Hartog**'s *Mechanical Vibrations* (1934) collected these methods into the textbook form still used today.
:::

## Where this leads

The free response and the definition of damping are in [[vibrations/free-vibration]], the response to harmonic forcing and the resonance peak in [[vibrations/harmonic-excitation]], and the multi-degree-of-freedom generalisation of everything above is in [[vibrations/modal-analysis]]. The continuous-system treatment of the beam in Example 6 is in [[vibrations/continuous-systems]], and the rotating-machinery application of Example 4 is in [[machine-design/shafts]].

::: summary
- A linear single-degree-of-freedom model has $\omega_n = \sqrt{k / m}$, and equivalent masses and stiffnesses are found by equating energies, not forces.
- A distributed member contributes a **fraction** of its own mass — $33 / 140$ of a cantilever, $1 / 2$ of a spring in axial motion — because the fraction is the square of the velocity ratio.
- The static-deflection shortcut $\omega_n = \sqrt{g / \delta_{\text{st}}}$ is the same formula and is the fastest estimate available.
- Rotational systems are identical with $m \to I$, $k \to k_\theta$; a shaft is $G J / L$ and two halves in parallel double it.
- Rayleigh's quotient gives an upper bound on the first frequency and is good to a per cent or two from a hand-drawn shape.
- Natural frequencies depend on the **distribution** of mass and stiffness, never on the excitation; the disturbance only selects which one you hear.
:::

::: quiz
A machine's natural frequency is measured at $40\ \mathrm{Hz}$ when running empty. Doubling the mass of everything that vibrates, and leaving the stiffness unchanged, gives a natural frequency of:
- [ ] $40\ \mathrm{Hz}$, because the natural frequency depends only on stiffness
- [ ] $80\ \mathrm{Hz}$
- [x] $28.3\ \mathrm{Hz}$
- [ ] $20\ \mathrm{Hz}$
::: solution
$\omega_n = \sqrt{k / m}$, so doubling the mass divides the frequency by $\sqrt{2}$: $40 / 1.414 = 28.3\ \mathrm{Hz}$. The square root is the reason mass is such an inefficient way to move a frequency: halving a frequency needs **four times** the mass, which is why adding ballast to a structure is a last resort and why the practical options are to stiffen it, to move the excitation, or to add damping and accept the amplitude. It is also why the empty-to-loaded frequency shift is such a sensitive diagnostic: a machine whose frequency drops from $40$ to $35\ \mathrm{Hz}$ when a $20\ \mathrm{kg}$ fixture is bolted on has, whether the designer knew it or not, an equivalent vibrating mass of $20 / \left( \left( 40 / 35 \right)^{2} - 1 \right) = 65\ \mathrm{kg}$, and that number is often the first honest measurement of what is actually moving.
:::
:::

## Exercises

::: exercise Equivalent stiffness {level=1 check="0.551"}
Two springs of $200\ \mathrm{N / m}$ and $300\ \mathrm{N / m}$ are joined in series and carry $10\ \mathrm{kg}$. Find the natural frequency in hertz.
::: solution
$k = \left( 1 / 200 + 1 / 300 \right)^{- 1} = 120\ \mathrm{N / m}$,
$$
f_n = \frac{1}{2 \pi} \sqrt{\frac{120}{10}} = 0.551\ \mathrm{Hz}.
$$
*Note.* The answer to enter is $0.551\ \mathrm{Hz}$.
:::
:::

::: exercise Static deflection {level=1 check="0.634"}
A machine element deflects $100\ \mathrm{mm}$ under its own weight. Find its natural period of vertical vibration.
::: solution
$\tau = 2 \pi \sqrt{0.1 / 9.81} = 0.634\ \mathrm{s}$.
:::
:::

::: exercise Equivalent mass {level=1 check="0.236"}
What fraction of a uniform cantilever's own mass appears at its tip in the lumped model, and what fraction of a uniform spring's mass appears at its end in axial motion?
::: solution
$33 / 140 = 0.236$ for the cantilever in bending and $1 / 2$ for the spring in axial motion.
*Note.* The answer to enter is the cantilever fraction, $0.236$.
:::
:::

::: exercise Torsional {level=2}
A motor armature of inertia $0.8\ \mathrm{kg\,m^{2}}$ is coupled to a compressor of inertia $3.2\ \mathrm{kg\,m^{2}}$ by a shaft $60\ \mathrm{mm}$ in diameter and $1.5\ \mathrm{m}$ long. Find the torsional natural frequency, taking $G = 80\ \mathrm{GPa}$.
::: solution
$$
J = \frac{\pi \times 0.06^{4}}{32} = 1.272 \times 10^{- 6}\ \mathrm{m^{4}}, \qquad
k_\theta = \frac{80 \times 10^{9} \times 1.272 \times 10^{- 6}}{1.5} = 67\,860\ \mathrm{N\,m / rad},
$$
and the two inertias act as a two-rotor system with the node dividing the shaft, giving an equivalent inertia
$$
\frac{1}{I_{\text{eq}}} = \frac{1}{0.8} + \frac{1}{3.2} \quad\Longrightarrow\quad I_{\text{eq}} = 0.64\ \mathrm{kg\,m^{2}},
$$
$$
\omega_n = \sqrt{\frac{67\,860}{0.64}} = 326\ \mathrm{rad / s} = 51.8\ \mathrm{Hz}.
$$
*Sanity.* Fifty-two hertz is a dangerous number for a reciprocating compressor: running at $1500\ \mathrm{rpm}$ ($25\ \mathrm{Hz}$) it has a second-order excitation at $50\ \mathrm{Hz}$, within $4$ per cent. That is why such machines carry a torsional damper and why the shaft is often made **larger** rather than longer, since $k_\theta$ goes as $d^{4}$ and a $20$ per cent increase in diameter raises the frequency by $44$ per cent at almost no cost in weight or space.
:::
:::

::: exercise Compound system {level=2}
A uniform rigid bar of mass $m$ and length $L$ is pivoted at one end, carries a spring $k$ at $0.7 L$ from the pivot and a lumped mass $m / 2$ at the free end. Find the natural frequency for small rotations.
::: solution
$$
I_O = \frac{m L^{2}}{3} + \frac{m}{2} L^{2} = \frac{7 m L^{2}}{6}, \qquad
k_\theta = k \left( 0.7 L \right)^{2} + \frac{m g}{2} L ,
$$
where the second term is the pendulum stiffness of the end mass. Hence
$$
\omega_n = \sqrt{\frac{k_\theta}{I_O}}
= \sqrt{\frac{0.49 k L^{2} + 0.5 m g L}{7 m L^{2} / 6}} .
$$
For $m = 6\ \mathrm{kg}$, $L = 0.8\ \mathrm{m}$, $k = 2000\ \mathrm{N / m}$:
$$
\omega_n = \sqrt{\frac{0.49 \times 2000 \times 0.64 + 0.5 \times 6 \times 9.81 \times 0.8}{7 \times 6 \times 0.64 / 6}}
= \sqrt{\frac{627.2 + 23.54}{4.48}} = 12.0\ \mathrm{rad / s}.
$$
*Sanity.* The gravity term contributes $3.6$ per cent of the stiffness — negligible here, but it would be dominant if the spring were soft, and it changes sign if the mass sits **above** the pivot, in which case the system can go statically unstable and the "natural frequency" becomes imaginary. That is the inverted-pendulum case, and it is why an unstable structure is said to have a negative stiffness rather than a negative frequency.
:::
:::

::: exercise Rayleigh {level=2}
Estimate the first natural frequency of a uniform beam simply supported at both ends, using a sine half-wave as the assumed shape, and compare with the exact value.
::: solution
With $y = \sin \left( \pi x / L \right)$,
$$
\int_0^L \left( y^{\prime \prime} \right)^{2} \mathrm{d} x = \frac{\pi^{4}}{2 L^{3}}, \qquad
\int_0^L y^{2} \mathrm{d} x = \frac{L}{2},
\qquad
\omega = \pi^{2} \sqrt{\frac{E I}{m L^{4}}} ,
$$
which **is** the exact answer, because the sine is the true mode. For a beam $4\ \mathrm{m}$ long with $E I = 2.1 \times 10^{7}\ \mathrm{N\,m^{2}}$ and $m = 100\ \mathrm{kg / m}$,
$$
\omega = 9.870 \times \sqrt{\frac{2.1 \times 10^{7}}{100 \times 256}} = 283\ \mathrm{rad / s}
= 45.0\ \mathrm{Hz}.
$$
*Sanity.* The sine happens to be exact for the simply supported beam because it satisfies **both** the geometric and the force boundary conditions — which is not true for any other end condition, and is why the simply supported case is the only one worked in textbooks. For a fixed-ended beam the same sine shape, which violates the zero-slope condition, gives a frequency **below** the true value, and the student who has not noticed this concludes that Rayleigh's bound can be violated.
:::
:::

::: exercise Design {level=3}
A $12\ \mathrm{kg}$ instrument must be mounted on a panel that vibrates at $100\ \mathrm{Hz}$ with an amplitude of $0.1\ \mathrm{mm}$. The instrument may experience no more than $0.01\ \mathrm{mm}$. Design the mount, and state what the damping does.
::: solution
**Required transmissibility.** $T = 0.01 / 0.1 = 0.10$.
**Frequency ratio.** With negligible damping $T = 1 / \left( r^{2} - 1 \right)$, so
$$
r^{2} - 1 = 10 \quad\Longrightarrow\quad r = 3.32,
\qquad f_n \le \frac{100}{3.32} = 30.2\ \mathrm{Hz}.
$$
**Stiffness.**
$$
k = m \omega_n^{2} = 12 \times \left( 2 \pi \times 30.2 \right)^{2} = 4.31 \times 10^{5}\ \mathrm{N / m},
$$
**Static deflection.**
$$
\delta_{\text{st}} = \frac{g}{\omega_n^{2}} = \frac{9.81}{35\,900} = 0.27\ \mathrm{mm}.
$$
**Effect of damping.** At $r = 3.32$ with $\zeta = 0.05$,
$$
T = \frac{\sqrt{1 + \left( 2 \zeta r \right)^{2}}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}}
= \frac{1.054}{10.0} = 0.105 ,
$$
and with $\zeta = 0.2$ it rises to $0.165$ — the damping **spoils** the isolation, raising the transmitted amplitude by about $57$ per cent at this frequency ratio.

*Design comment.* The requirement is a static deflection of **at least** $0.27\ \mathrm{mm}$, i.e. a total stiffness of at most $431\ \mathrm{kN / m}$ — four elastomer mounts of about $108\ \mathrm{kN / m}$ each. That is easy to meet, and a designer would go softer, say $f_n \approx 15\ \mathrm{Hz}$ ($\delta_{\text{st}} \approx 1.1\ \mathrm{mm}$), for margin: rubber stiffens at high frequency, and the panel frequency may vary. The damping result is the more important lesson and is general: above $r = \sqrt{2}$ damping always reduces the isolation, so a good isolation mount is **lightly** damped, and the damper is fitted not to improve the isolation but to control the resonance when the machine runs **through** the mount's natural frequency at start-up. That is the whole design trade in one sentence, and it is why a rubber mount's loss factor is specified as a range rather than a value, and why an air mount — which has almost no damping at all and needs an external damper — isolates far better than any rubber pad at the same frequency.
:::
:::

::: exercise Derivation {level=3}
Derive the equivalent mass and stiffness of a uniform cantilever carrying a tip mass, using the static deflection curve, and show that the beam contributes $33 / 140$ of its own mass. Hence obtain the frequency of a cantilever with no tip mass and compare with the exact result.
::: solution
**Shape.** For a tip-loaded cantilever,
$$
y (x) = \frac{\delta}{2 L^{3}} \left( 3 L x^{2} - x^{3} \right), \qquad
y (L) = \delta,
$$
so the velocity at $x$ is $\dot{y} = \dot{\delta} \left( 3 L x^{2} - x^{3} \right) / \left( 2 L^{3} \right)$.
**Kinetic energy.**
$$
T = \tfrac{1}{2} \int_0^L m \dot{y}^{2} \mathrm{d} x
= \tfrac{1}{2} m \dot{\delta}^{2} \int_0^L \frac{\left( 3 L x^{2} - x^{3} \right)^{2}}{4 L^{6}} \mathrm{d} x ,
$$
and
$$
\int_0^L \left( 3 L x^{2} - x^{3} \right)^{2} \mathrm{d} x
= \int_0^L \left( 9 L^{2} x^{4} - 6 L x^{5} + x^{6} \right) \mathrm{d} x
= \left( \frac{9}{5} - 1 + \frac{1}{7} \right) L^{7} = \frac{33}{35} L^{7} ,
$$
so
$$
T = \tfrac{1}{2} \left( \frac{33}{140} m L \right) \dot{\delta}^{2}
\quad\Longrightarrow\quad
m_{\text{eff}} = \frac{33}{140} m L = 0.236 \times \text{total mass}.
$$
**Strain energy.** With $k = 3 E I / L^{3}$ the tip-loaded beam stores $V = \tfrac{1}{2} k \delta^{2}$ exactly, so
$$
\omega^{2} = \frac{k}{M + 33 m L / 140} .
$$
**No tip mass.** With $M = 0$,
$$
\omega = \sqrt{\frac{3 E I}{0.2357 \, m L^{4}}} = 3.568 \sqrt{\frac{E I}{m L^{4}}},
$$
against the exact $3.516 \sqrt{E I / \left( m L^{4} \right)}$ — an error of $+ 1.5$ per cent, and in the correct direction for a Rayleigh estimate.

*Comment.* The $33 / 140$ is not a universal constant: it is the value for the **static tip-load shape** used as the assumed mode. Using the true first mode shape instead of the static curve changes the fraction from $0.236$ to $0.250$, about $6$ per cent — the effective mass is a property of the assumed shape, not of the beam, which is why a beam with a heavy tip mass has a different effective-mass fraction from a light one. The engineer's rule of thumb, "a quarter of the beam's mass at the tip", is right to within about $6$ per cent for any practical case and is worth more than the exact fraction misremembered.
:::
:::
