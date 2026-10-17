Three-dimensional dynamics differs from plane dynamics in one respect and one only: the angular momentum $\mathbf{H}$ is **not** parallel to the angular velocity $\boldsymbol{\omega}$. Everything strange in this subject — a spinning wheel that refuses to fall, a rotor that walks itself off a bed, a ship that yaws when it rolls, a bullet that yaws instead of pitching — follows from that single non-alignment, and the whole apparatus of inertia tensors, principal axes and Euler's equations exists to keep track of the angle between the two vectors.

The practical reason to care is that rotating machinery is the most common source of vibration in engineering, and the two failure modes it produces — the rotating force of a statically unbalanced rotor and the rotating couple of a dynamically unbalanced one — are pure consequences of $\mathbf{H}$ not being along $\boldsymbol{\omega}$. A rotor can be perfectly balanced sitting still and destroy its bearings at speed, and the calculation that predicts it is four lines long.

::: warning $\mathbf{H} = I \boldsymbol{\omega}$ is a scalar equation only about a principal axis
In three dimensions $\mathbf{H} = \mathbf{I} \boldsymbol{\omega}$ is a matrix product, and the off-diagonal **products of inertia** $I_{xy}, I_{yz}, I_{zx}$ are generally non-zero. Writing $H_z = I_z \omega_z$ and ignoring the rest is legitimate only when the axis is a principal axis, or when the body is axisymmetric and spinning about its axis. The products of inertia of a body with no obvious symmetry are not small corrections to be neglected: they are the entire cause of bearing loads in an unbalanced rotor, and they can be enormous while the corresponding imbalance in mass is a fraction of a millimetre.
:::

## Angular velocity, momentum and the inertia tensor

::: definition The inertia tensor {#def-inertia-tensor}
For a rigid body, the angular momentum about a point $O$ is
$$
\mathbf{H}_O = \int \mathbf{r} \times \left( \boldsymbol{\omega} \times \mathbf{r} \right) \mathrm{d} m
= \mathbf{I}_O \, \boldsymbol{\omega} ,
$$
with the **inertia tensor**
$$
\mathbf{I}_O = \begin{pmatrix} I_{xx} & - I_{xy} & - I_{xz} \ - I_{xy} & I_{yy} & - I_{yz} \ - I_{xz} & - I_{yz} & I_{zz} \end{pmatrix},
\qquad I_{xx} = \int \left( y^{2} + z^{2} \right) \mathrm{d} m,
\qquad I_{xy} = \int x y \, \mathrm{d} m .
$$
The tensor is symmetric, so it always has three mutually perpendicular **principal axes**, about which the products vanish and $\mathbf{H}$ is parallel to $\boldsymbol{\omega}$. The corresponding principal moments $I_1, I_2, I_3$ are the roots of the characteristic cubic, and for a body with a plane of symmetry that plane's normal is automatically a principal axis.
:::

::: theorem Euler's equations {#thm-euler-eqns}
About a fixed point $O$, or about the mass centre $G$, referred to a frame rotating with the body and aligned with the principal axes,
$$
\begin{aligned}
M_1 &= I_1 \dot{\omega}_1 + \left( I_3 - I_2 \right) \omega_2 \omega_3, \\
M_2 &= I_2 \dot{\omega}_2 + \left( I_1 - I_3 \right) \omega_3 \omega_1, \\
M_3 &= I_3 \dot{\omega}_3 + \left( I_2 - I_1 \right) \omega_1 \omega_2 .
\end{aligned}
$$
The nonlinear terms are the **gyroscopic** terms; they are the whole difference from plane dynamics, and they vanish when two principal moments are equal (an axisymmetric body) or when the body rotates about a single principal axis.
:::

::: proof Euler's equations from the transport theorem {#proof-euler}
The moment equation in an inertial frame is $\mathbf{M}_O = \left( \dot{\mathbf{H}}_O \right)_{\text{inertial}}$. For any vector expressed in a frame rotating at $\boldsymbol{\omega}$,
$$
\left( \dot{\mathbf{H}} \right)_{\text{inertial}}
= \left( \dot{\mathbf{H}} \right)_{\text{body}} + \boldsymbol{\omega} \times \mathbf{H} .
$$
In the principal frame $\mathbf{H} = \left( I_1 \omega_1, I_2 \omega_2, I_3 \omega_3 \right)$, so the body-frame derivative is $\left( I_1 \dot{\omega}_1, I_2 \dot{\omega}_2, I_3 \dot{\omega}_3 \right)$ and
$$
\boldsymbol{\omega} \times \mathbf{H}
= \begin{vmatrix} \mathbf{e}_1 & \mathbf{e}_2 & \mathbf{e}_3 \ \omega_1 & \omega_2 & \omega_3 \ I_1 \omega_1 & I_2 \omega_2 & I_3 \omega_3 \end{vmatrix}
= \left( \left( I_3 - I_2 \right) \omega_2 \omega_3, \ \left( I_1 - I_3 \right) \omega_3 \omega_1, \ \left( I_2 - I_1 \right) \omega_1 \omega_2 \right) .
$$
Equating components gives Euler's equations. $\checkmark$

*Note.* The body frame must be attached to the body for the tensor to be constant, and it must be a principal frame for $\mathbf{H}$ to be diagonal in it. The equations are valid about a fixed point or about the **mass centre** — the transport term that appears for any other point is exactly the one excluded in [[dynamics/rigid-body-kinetics]].
:::

::: proof Steady precession of a top {#proof-top}
Take a symmetric top with its point at the fixed origin, its axis at angle $\theta$ to the vertical and precessing steadily at $\Omega$ about the vertical. Its angular velocity is $\boldsymbol{\omega} = \Omega \mathbf{k} + \omega_s \mathbf{e}_3$, and its angular momentum about the point is
$$
\mathbf{H} = I_t \Omega \sin \theta \, \mathbf{e}_\perp + I_s \left( \omega_s + \Omega \cos \theta \right) \mathbf{e}_3 ,
$$
where $\mathbf{e}_\perp$ is the horizontal unit vector perpendicular to the precession plane. Only the component of $\mathbf{H}$ **perpendicular to the vertical** contributes to $\dot{\mathbf{H}}$, since the vertical component is constant in a steady precession; its magnitude is
$$
H_h = I_s \left( \omega_s + \Omega \cos \theta \right) \sin \theta ,
$$
and it rotates at $\Omega$, so
$$
\left| \dot{\mathbf{H}} \right| = \Omega H_h
= \Omega I_s \left( \omega_s + \Omega \cos \theta \right) \sin \theta .
$$
The moment of the weight about the point is $m g \ell \sin \theta$, and equating the two and dividing through by $\sin \theta$ gives the quadratic
$$
I_s \Omega^{2} \cos \theta - I_s \omega_s \Omega + m g \ell = 0 .
$$
When the second term dominates the first — that is when $I_s \omega_s \gg m g \ell / \Omega$, the fast-spin case — the root is
$$
\Omega \approx \frac{m g \ell}{I_s \omega_s} ,
$$
and the other root, from balancing the first two terms, is $\Omega \approx I_s \omega_s / I_t \cos \theta$, the **fast** precession. $\checkmark$

*Note.* The slow precession is inversely proportional to the spin, so a top slowing down under friction precesses **faster** and faster until the steady solution ceases to exist and it topples; the fast precession is independent of gravity and of $\theta$, and it is what you see if you flick a top's axis sharply.
:::

::: example Gyroscopic couple on a gimbal {#ex-gimbal}
A disc of mass $12\ \mathrm{kg}$ and radius of gyration $100\ \mathrm{mm}$ spins at $1500\ \mathrm{rpm}$ in a gimbal. Find the couple required to precess it at $0.1\ \mathrm{rad / s}$.
::: solution
$$
I_s = m k^{2} = 12 \times 0.01 = 0.12\ \mathrm{kg\,m^{2}}, \qquad
\omega_s = \frac{2 \pi \times 1500}{60} = 157.1\ \mathrm{rad / s},
$$
$$
M = I_s \omega_s \Omega = 0.12 \times 157.1 \times 0.1 = 1.885\ \mathrm{N\,m} .
$$
*Check.* The angular momentum is $H = 18.85\ \mathrm{N\,m\,s}$ and it is being swung round at $0.1\ \mathrm{rad / s}$, so its rate of change is $1.885\ \mathrm{N\,m}$ $\checkmark$

*Sanity.* The couple is proportional to the **spin**, so a gyro that is not spinning has none — which is the reason a bicycle is hard to balance when moving slowly and impossible to steer by leaning at walking pace. It is also why a gyroscope compass on a ship must be spun up to a precise speed, and why the couple reverses when the spin reverses: the direction of the response is set by the right-hand rule applied twice, and a machine whose spin direction is not marked on the nameplate will do the opposite of what the designer intended.
:::
:::

::: widget plot
f: 1.962/(0.02*x)
x: 20, 400
y: 0, 1.1
labels: \text{precession rate } \Omega \ \left( \mathrm{rad/s} \right)
caption: Steady precession rate of the held wheel of Example 2 against its spin speed $\omega_s$ in radians per second, from $\Omega = m g r / I_s \omega_s$. The curve is a rectangular hyperbola: doubling the spin halves the rate at which the axle droops, and as the spin tends to zero the formula predicts an infinite precession rate, which is the mathematical signal that the assumption of steady precession has broken down. Below about $100\ \mathrm{rpm}$ the wheel simply falls, and the transition between the two regimes — steady precession and tumbling fall — is one of the few places in elementary dynamics where a genuinely nonlinear bifurcation appears.
:::

## Steady precession

::: theorem Steady precession of a spinning top {#thm-top}
A symmetric top of mass $m$, spin $\omega_s$ about its own axis and centre of mass at distance $\ell$ from a fixed point, precessing steadily at rate $\Omega$ with its axis at angle $\theta$ to the vertical, satisfies
$$
I_s \omega_s \Omega \sin \theta = m g \ell \sin \theta
\quad\Longrightarrow\quad
\Omega = \frac{m g \ell}{I_s \omega_s}
$$
for the **slow** precession, valid when $I_s \omega_s \gg m g \ell / \Omega$. The full quadratic in $\Omega$ also admits a fast precession
$$
\Omega_{\text{fast}} \approx \frac{I_s \omega_s}{I_t \cos \theta},
$$
which is rarely observed because friction in the point kills it within a few turns.
:::

::: example Held bicycle wheel {#ex-held-wheel}
A bicycle wheel of mass $2\ \mathrm{kg}$, with all its mass effectively at a $350\ \mathrm{mm}$ radius, spins at $3000\ \mathrm{rpm}$ and is held at one end of its $200\ \mathrm{mm}$ axle, the other end being $100\ \mathrm{mm}$ from the hand. Find the precession rate, and the rate at which the axle droops if the wheel is not spinning.
::: solution
$$
I_s = 2 \times 0.35^{2} = 0.245\ \mathrm{kg\,m^{2}}, \qquad
\omega_s = 314.2\ \mathrm{rad / s}, \qquad H = 77.0\ \mathrm{N\,m\,s},
$$
$$
\Omega = \frac{m g r}{H} = \frac{2 \times 9.81 \times 0.1}{77.0}
= 0.0255\ \mathrm{rad / s} = 1.46^{\circ} / \mathrm{s} .
$$
**Not spinning.** With no angular momentum the wheel is a simple physical pendulum released from horizontal, and its initial angular acceleration is
$$
\alpha = \frac{m g r}{I_O} = \frac{2 \times 9.81 \times 0.1}{0.245 + 2 \times 0.01}
= \frac{1.962}{0.265} = 7.40\ \mathrm{rad / s^{2}},
$$
which after $0.1\ \mathrm{s}$ has already given it $0.74\ \mathrm{rad / s}$ of drooping — thirty times the steady precession rate.

*Sanity.* The spinning wheel precesses at a degree and a half a second, which is slow enough to be uncanny and is the entire demonstration. The direction is the part everyone gets wrong: viewed from above with the wheel spinning anticlockwise and the unsupported end free, the axle swings **towards** the observer on the near side, and reversing the spin reverses it. The rule is that $\boldsymbol{\omega} \times \mathbf{H}$ points the way the momentum vector is being dragged, and the momentum vector always chases the applied couple.
:::
:::

::: example Angular momentum is not along angular velocity {#ex-H-not-omega}
Two point masses, $3\ \mathrm{kg}$ at $\left( 0.2, 0.1, 0 \right)$ and $2\ \mathrm{kg}$ at $\left( 0, 0.15, 0.25 \right)$ in metres, are rigidly joined and rotated at $\boldsymbol{\omega} = \left( 2, 3, 1 \right)\ \mathrm{rad / s}$ about the origin. Find $\mathbf{H}$ and the angle between $\mathbf{H}$ and $\boldsymbol{\omega}$.
::: solution
Building the tensor from $\mathbf{I} = \sum m \left( r^{2} \mathbf{1} - \mathbf{r} \mathbf{r}^{\mathrm{T}} \right)$,
$$
\mathbf{I} = \begin{pmatrix} 0.200 & - 0.060 & 0 \ - 0.060 & 0.245 & - 0.075 \ 0 & - 0.075 & 0.195 \end{pmatrix} \mathrm{kg\,m^{2}} ,
$$
$$
\mathbf{H} = \mathbf{I} \boldsymbol{\omega}
= \left( 0.400 - 0.180, \ - 0.120 + 0.735 - 0.075, \ - 0.225 + 0.195 \right)
= \left( 0.220, \ 0.540, \ - 0.030 \right) \mathrm{kg\,m^{2} / s} .
$$
The angle between the two vectors is
$$
\cos^{- 1} \frac{\mathbf{H} \cdot \boldsymbol{\omega}}{\left| \mathbf{H} \right| \left| \boldsymbol{\omega} \right|}
= \cos^{- 1} \frac{0.440 + 1.620 - 0.030}{0.584 \times 3.742}
= 21.7^{\circ} .
$$
*Check.* $\mathbf{H}$ is **not** a scalar multiple of $\boldsymbol{\omega}$ — the ratio of components $0.220 / 2 = 0.110$, $0.540 / 3 = 0.180$, $- 0.030 / 1 = - 0.030$ are all different, and three different numbers is the whole proof. $\checkmark$

*Sanity.* Twenty-two degrees between the momentum and the axis, from a body made of two masses that a workman would call "roughly symmetric". The transverse component of $\mathbf{H}$, of magnitude $0.55\ \mathrm{kg\,m^{2} / s}$, rotates with the body at $\omega = 3.74\ \mathrm{rad / s}$, so it demands a moment of $2.06\ \mathrm{N\,m}$ from the bearings — and that moment scales as $\omega^{2}$, so at $100$ times this speed the same two masses would need $20\,600\ \mathrm{N\,m}$. Two point masses are a poor model of a real rotor only in degree: an electric armature with two slots, a two-cylinder crankshaft or a welding flywheel all have exactly this structure, and the products of inertia are what the balance machine is measuring even when the operator calls it "balance".
:::
:::

::: example Critical speed {#ex-critical-speed}
A $20\ \mathrm{kg}$ rotor sits at the middle of a shaft whose lateral stiffness is $2\ \mathrm{MN / m}$, with an eccentricity of $0.5\ \mathrm{mm}$ and an effective damping ratio of $0.05$. Find the critical speed and the deflection at it and at $1.5$ times it.
::: solution
$$
\omega_n = \sqrt{\frac{k}{m}} = \sqrt{\frac{2 \times 10^{6}}{20}} = 316\ \mathrm{rad / s}
= 3020\ \mathrm{rpm},
$$
and at resonance the deflection is
$$
\delta_{\text{res}} = \frac{e}{2 \zeta} = \frac{0.5}{0.1} = 5.0\ \mathrm{mm}.
$$
At $r = \omega / \omega_n = 1.5$,
$$
\delta = \frac{e r^{2}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}}
= \frac{0.5 \times 2.25}{\sqrt{1.5625 + 0.0225}} = 0.89\ \mathrm{mm},
$$
which is **less** than the eccentricity: above the critical speed the rotor's centre is on the opposite side of the axis from its mass centre and the shaft is nearly straight.

*Sanity.* Five millimetres of deflection on a $0.5\ \mathrm{mm}$ eccentricity is a factor of ten, and it is the reason a machine must be run **through** its critical speed quickly rather than rested on it — a rule that surprises no one who has watched a washing machine walk itself across a floor at the speed where the drum's whirling is worst. The more important number is the one above the critical: at $1.5$ times the critical the deflection is $1.8$ times the eccentricity and falling as $1 / r^{2}$, which is why a flexible rotor — one running well above its first critical — is balanced at operating speed rather than at rest, and why a turboalternator set is balanced in the field with the machine at full speed, where the mode shapes that matter are actually excited.
:::
:::

## Rotating machinery: unbalance and gyroscopic effects

::: proposition Unbalance and bearing forces {#prop-unbalance}
A rotor whose mass centre is offset by $e$ from the rotation axis generates a rotating force
$$
F = m e \omega^{2}
$$
on its bearings, at the running speed. A rotor whose **principal axis** is inclined to the rotation axis by $\alpha$, even with its mass centre exactly on the axis, generates a rotating **couple**
$$
M = \left( I_z - I_x \right) \omega^{2} \sin \alpha \cos \alpha \approx \Delta I \, \omega^{2} \alpha ,
$$
which no amount of static balancing will remove. For a slender rod of mass $m$ and length $L$ mounted at $\alpha$ to its shaft, the product of inertia is $m L^{2} \sin \alpha \cos \alpha / 12$. **Dynamic balancing** — two correction planes — is required to remove both, and one plane suffices only for a thin disc.
:::

::: example Dynamically unbalanced rotor {#ex-rotor-unbalance}
A slender steel shaft carries a $2\ \mathrm{kg}$ disc of $500\ \mathrm{mm}$ diameter mounted at $5^{\circ}$ to the shaft axis, with its centre exactly on the axis, between bearings $300\ \mathrm{mm}$ apart, running at $3000\ \mathrm{rpm}$. Find the bearing forces.
::: solution
The mass centre is on the axis, so there is **no** static unbalance and the machine-shop balance job passes. The product of inertia is
$$
I_{xz} = \frac{m L^{2} \sin \alpha \cos \alpha}{12}
= \frac{2 \times 0.5^{2} \times 0.0872}{12} = 3.62 \times 10^{- 3}\ \mathrm{kg\,m^{2}},
$$
and the rotating couple is
$$
M = I_{xz} \omega^{2} = 3.62 \times 10^{- 3} \times 314.2^{2} = 357\ \mathrm{N\,m},
$$
$$
\text{force per bearing} = \frac{357}{0.3} = 1190\ \mathrm{N} = 61\, m g .
$$
*Check.* A $10\ \mathrm{kg}$ rotor with a $2\ \mathrm{mm}$ static eccentricity at the same speed gives $m e \omega^{2} = 10 \times 0.002 \times 98\,700 = 1974\ \mathrm{N}$, so the two effects are of the same order — but the couple version is invisible to a static balance. $\checkmark$

*Sanity.* Sixty-one times the weight, from a tilt of five degrees that a workman would call a good fit. That is the whole of **dynamic** balancing, and it is why a car road wheel is balanced on a machine that spins it rather than on a bubble level, why a turbine rotor is balanced in two planes at the shop and again on site, and why the balance quality of a part is specified as a **grade** — ISO $1940$ G-values such as G6.3 for a turbine impeller or G40 for a car wheel — which is an allowable $e \omega$ in millimetres per second rather than a mass. The grade is a vibration-velocity limit in disguise, and it is the reason a wheel that is "balanced" on a two-plane machine at the tyre shop can still shake a car at $120\ \mathrm{km / h}$ if the brake disc and hub are then bolted on in a different clock position.
:::
:::

::: example Ship's turbine {#ex-ship-turbine}
A ship's turbine rotor has a mass of $8\ \mathrm{t}$, a radius of gyration of $1.5\ \mathrm{m}$ and runs at $6000\ \mathrm{rpm}$, turning clockwise viewed from astern. If the ship rolls $10^{\circ}$ in $8\ \mathrm{s}$, find the gyroscopic couple and its effect.
::: solution
$$
I_s = 8000 \times 1.5^{2} = 18\,000\ \mathrm{kg\,m^{2}}, \qquad
\omega_s = 628.3\ \mathrm{rad / s},
$$
$$
\Omega = \frac{10 \times \pi / 180}{8} = 0.0218\ \mathrm{rad / s},
\qquad
M = I_s \omega_s \Omega = 18\,000 \times 628.3 \times 0.0218 = 247\ \mathrm{kN\,m} .
$$
**Direction.** The spin angular momentum points **forwards**. Rolling to starboard swings that vector to starboard, and the required change of momentum is directed to port, so the couple applied **to the ship** by the rotor turns its **bow to starboard** — the ship yaws as it rolls.

*Sanity.* A quarter of a meganewton-metre of yawing couple, applied with no steering input whatever, once every roll period. On a fast destroyer with light steering and a big turbine this was a genuine design problem in the 1920s: it added to the roll-induced weather helm, it made the compass swing, and it fed energy into the yaw mode at the roll frequency, which on a ship whose yaw natural period happened to match the roll period meant a violent coupled motion. The standard remedy is to split the machinery into two rotors turning in **opposite** directions, which cancels the couple at the cost of a slightly more complicated gearbox — the same trick every twin-rotor helicopter and every contra-rotating propeller uses, and the reason a twin-engine aircraft's engines turn outwards rather than inwards, so that a single-engine failure's yaw is opposed rather than helped.
:::
:::

::: warning Steady precession is an approximation, and the exact motion is a polhode
A torque-free asymmetric body does not rotate about a fixed axis at all: $\boldsymbol{\omega}$ traces a **polhode** on the inertia ellipsoid while $\mathbf{H}$ stays fixed in space, and the body's axis traces a **herpolhode** cone. Steady precession is the special solution in which $\boldsymbol{\omega}$, $\mathbf{H}$ and the symmetry axis are coplanar and the geometry is constant. Rotation about the **middle** principal axis is unstable — the intermediate-axis or "tennis racket" theorem — so a body spun about that axis tumbles over, and this is not a curiosity: it is why the 1985 Kosmos 1844 satellite, whose propellant tanks left it with an intermediate-axis spin, began tumbling end over end and could not be recovered, and why a spacecraft designed for spin stabilisation is deliberately balanced so that its spin axis is its axis of **maximum** inertia.
:::

::: history
The equations of rigid-body rotation are Euler's, in the Berlin memoirs of 1758, and the geometric picture of the inertia ellipsoid and the polhode is Poinsot's of 1834, which replaced the algebra with the rolling-cone construction that still gives the subject its intuition. The **tennis racket theorem** — the instability of rotation about the intermediate axis — is implicit in Euler and was first stated clearly in the nineteenth century; its experimental demonstration in orbit came with the Kosmos 1844 tumble of 1985, accidentally the clearest video evidence of it ever made. The **gyroscope** as an instrument is Foucault's of 1852, built to demonstrate the Earth's rotation, and the **gyrocompass** of Schuler and of Elmer Sperry around 1904 to 1908; the theory of the **critical speed** of a shaft, which is the lateral resonance that unbalance excites, is Rankine's of 1869 and was famously pronounced impossible by Greenhill and then measured by Stodola and by Föppl at the turn of the century. The modern **balance-grade** system, ISO 1940, dates from 1973 and expresses the old craft rule "balance it well enough for the speed it runs at" as an allowable product of eccentricity and angular velocity.
:::

## Where this leads

The planar special case is [[dynamics/rigid-body-kinetics]] and the energy and momentum methods are in [[dynamics/rigid-body-energy-momentum]]. The lateral vibration of an unbalanced rotor and the critical speed are in [[vibrations/continuous-systems]], the balancing machines and correction-plane calculations are in [[machine-design/shafts]], and the attitude dynamics of spacecraft, where the torque-free motion of this lesson is the everyday case rather than the curiosity, is beyond the scope of this atlas.

::: summary
- In three dimensions $\mathbf{H} = \mathbf{I} \boldsymbol{\omega}$ is a tensor product, and $\mathbf{H}$ is parallel to $\boldsymbol{\omega}$ only about a principal axis.
- Euler's equations add the gyroscopic terms $\left( I_3 - I_2 \right) \omega_2 \omega_3$ to the plane equations; they vanish for an axisymmetric body spinning about its axis.
- A gyroscopic couple is $I_s \omega_s \Omega$: proportional to the spin, to the precession rate, and reversing with the spin.
- Steady precession of a top is $\Omega = m g \ell / I_s \omega_s$, and it fails when the spin is too slow.
- Static unbalance gives a rotating force $m e \omega^{2}$; **dynamic** unbalance gives a rotating couple $\Delta I \omega^{2} \sin \alpha \cos \alpha$ that a static balance cannot see.
- Rotation about the intermediate principal axis is unstable, and a torque-free asymmetric body traces a polhode rather than spinning steadily.
:::

::: quiz
A rotor is found to be perfectly balanced on a **static** (single-plane) bubble balance: its mass centre lies exactly on the rotation axis. It is then run up to speed and the bearings are destroyed within minutes. The most likely cause is:
- [ ] The balance was calibrated wrongly, because a true static balance guarantees dynamic balance
- [ ] The bearings were undersized for the rotor's weight
- [x] A couple unbalance: the rotor's principal axis is inclined to the shaft, which a static balance cannot detect
- [ ] Thermal growth of the shaft, which lowers the critical speed
::: solution
A static balance detects only the position of the **mass centre**. If the rotor's principal axis is inclined to the shaft — a disc mounted a degree out of square, a long rotor with a slight bend, a fan blade that has lost a piece of leading-edge erosion shield symmetrically at two stations — then the mass centre stays on the axis while the products of inertia do not vanish, and the running rotor applies a **rotating couple** to its bearings. The magnitude is $\left( I_z - I_x \right) \omega^{2} \sin \alpha \cos \alpha$, which for a modest disc at five degrees and $3000\ \mathrm{rpm}$ was sixty times the rotor's weight in Example 5. Only a two-plane dynamic balance, done with the rotor turning, can find it. This is the single most common balancing error in industry, and it is why the specification for any rotor above about $1000\ \mathrm{rpm}$ or with a length-to-diameter ratio above about half names a balance **grade** and a **number of planes**, not just "balanced".
:::
:::

## Exercises

::: exercise Gyroscopic couple {level=1 check="1.885"}
For the disc of Example 1, what couple is required if the spin is doubled and the precession rate halved?
::: solution
$M = I_s \omega_s \Omega$ is unchanged: $0.12 \times 314.2 \times 0.05 = 1.885\ \mathrm{N\,m}$.
:::
:::

::: exercise Precession {level=1 check="0.051"}
For the wheel of Example 2, what is the precession rate if the spin is $1500\ \mathrm{rpm}$ instead of $3000$?
::: solution
$\Omega$ doubles: $0.051\ \mathrm{rad / s}$, or $2.9^{\circ} / \mathrm{s}$.
:::
:::

::: exercise Principal axes {level=1 check="0.0217"}
A rectangular block of sides $a, b, c$ has products of inertia zero about axes along its edges. State why, and give the three principal moments for a $2\ \mathrm{kg}$ block of $100 \times 200 \times 300\ \mathrm{mm}$.
::: solution
The edges are along the planes of symmetry, so the products vanish. The principal moments are
$$
I_a = \tfrac{1}{12} m \left( b^{2} + c^{2} \right) = \tfrac{1}{12} \times 2 \left( 0.04 + 0.09 \right) = 0.0217\ \mathrm{kg\,m^{2}},
$$
and similarly $0.0167$ and $0.0100\ \mathrm{kg\,m^{2}}$.
*Note.* The answer to enter is the **largest** principal moment, $0.0217\ \mathrm{kg\,m^{2}}$.
:::
:::

::: exercise Unbalance {level=2}
A $15\ \mathrm{kg}$ grinding wheel $400\ \mathrm{mm}$ in diameter is mounted with its face $1^{\circ}$ out of square on a $2\ \mathrm{kW}$ spindle running at $2800\ \mathrm{rpm}$, bearings $250\ \mathrm{mm}$ apart. Estimate the bearing force due to the couple unbalance and say whether a static balance would have found it.
::: solution
Treating the wheel as a thin disc of thickness $40\ \mathrm{mm}$,
$$
I_z - I_x \approx \tfrac{1}{4} m r^{2} = 0.25 \times 15 \times 0.04 = 0.15\ \mathrm{kg\,m^{2}},
$$
$$
M = \left( I_z - I_x \right) \omega^{2} \sin \alpha \cos \alpha
= 0.15 \times 293.2^{2} \times 0.01745 = 225\ \mathrm{N\,m},
$$
$$
\text{per bearing} = \frac{225}{0.25} = 900\ \mathrm{N} = 6.1\, m g .
$$
*Sanity.* A static balance finds nothing, because the wheel's mass centre is on the axis; the whole load comes from the products of inertia. This is the classic grinding-wheel failure, and it is why precision grinders balance the wheel **on the spindle**, in two planes, with the flanges and the guard fitted — the guard alone is several kilograms of unsymmetric mass, and a wheel balanced off the machine and then remounted one spline tooth out is a machine that will never hold size.
:::
:::

::: exercise Euler's equations {level=2}
A symmetric satellite has $I_3 = 2 I_1$ and is set spinning with its angular velocity at $20^{\circ}$ to its symmetry axis, with no applied torque. Find the angle between $\boldsymbol{\omega}$ and the symmetry axis, and the ratio of the body's wobble rate to its spin rate.
::: solution
With no torque, Euler's second equation gives $\dot{\omega}_2 = \left( I_1 - I_3 \right) \omega_3 \omega_1 / I_2$, so the transverse components rotate at the **body precession** rate
$$
\lambda = \frac{I_3 - I_1}{I_1} \omega_3 = \omega_3 \quad \left( \text{since } I_3 = 2 I_1 \right) .
$$
The angle between $\boldsymbol{\omega}$ and the axis is constant at $20^{\circ}$, and the axis sweeps a cone of semi-angle $\beta$ about $\mathbf{H}$ given by
$$
\tan \beta = \frac{I_1}{I_3} \tan 20^{\circ} = 0.5 \times 0.364 = 0.182
\quad\Longrightarrow\quad
\beta = 10.3^{\circ} .
$$
The wobble therefore appears at the **same rate** as the spin, and twice the spin rate as seen from inertial space.
*Sanity.* The factor $I_1 / I_3$ in the tangent relation is what makes the cone angles different on the two sides of the momentum vector, and it is the reason a spin-stabilised satellite must be balanced so that $I_3 > I_1$: if the spin axis is the axis of **least** inertia the motion is unstable and the satellite tumbles. Real spin satellites dissipate internal energy and drift towards the maximum-inertia spin anyway, which is why the early Syncom and Nimbus spacecraft had to be deliberately spun up about the right axis and why fuel sloshing in a tank has destroyed the attitude of more than one.
:::
:::

::: exercise Gyroscopic effect on a vehicle {level=2}
A motorcycle's road wheel has $I_s = 0.6\ \mathrm{kg\,m^{2}}$ and runs at $60\ \mathrm{km / h}$ on a $600\ \mathrm{mm}$ diameter wheel. Find the gyroscopic couple when the rider turns a $20\ \mathrm{m}$ radius left-hand bend, and say which way the front forks are pushed.
::: solution
$$
\omega_s = \frac{60 / 3.6}{0.3} = 55.6\ \mathrm{rad / s}, \qquad
\Omega = \frac{v}{R} = \frac{16.67}{20} = 0.833\ \mathrm{rad / s},
$$
$$
M = 0.6 \times 55.6 \times 0.833 = 27.8\ \mathrm{N\,m}.
$$
**Direction.** The wheel's angular momentum points to the rider's **left**. Yawing left swings that vector forward, so the required change of momentum is downward at the front, and the reaction lifts the **left** side of the front end and pushes the bars to the right — the front wheel stands up slightly in a left-hand bend.
*Sanity.* Twenty-eight newton-metres on the handlebars of a machine whose rider applies perhaps $50\ \mathrm{N\,m}$ is more than half the steering effort, and it is one of the two reasons a fast motorcycle is stable in a bend and vague at walking pace; the other is the trail geometry. The same couple is why a motorcycle with a heavy front brake disc and a light frame feels like it wants to stand up under hard braking while leaned over, and why the effect is worse on a machine with a large front brake disc than on an otherwise identical one with a small disc.
:::
:::

::: exercise Design {level=3}
A $50\ \mathrm{kW}$ electric motor armature has a mass of $250\ \mathrm{kg}$, a radius of gyration about its spin axis of $250\ \mathrm{mm}$ and runs at $1500\ \mathrm{rpm}$. It is mounted with its axis **athwartships** in a ship that pitches $6^{\circ}$ in $10\ \mathrm{s}$. Find the gyroscopic couple on the motor mounts, say what it does to them, and specify what you would change.
::: solution
$$
I_s = 250 \times 0.25^{2} = 15.63\ \mathrm{kg\,m^{2}}, \qquad
\omega_s = 157.1\ \mathrm{rad / s}, \qquad
\Omega = \frac{6 \times \pi / 180}{10} = 0.01047\ \mathrm{rad / s},
$$
$$
M = 15.63 \times 157.1 \times 0.01047 = 25.7\ \mathrm{N\,m}.
$$
**Direction.** With the spin axis athwartships and the pitch rotation about the same athwartships axis, the spin vector and the precession vector are **parallel**, so $\boldsymbol{\omega} \times \mathbf{H} = 0$ and the gyroscopic couple is **zero**.

*Design comment.* The answer is the point. A gyroscopic couple requires the spin axis and the precession axis to be **inclined** to one another; pitching about an athwartships axis produces no gyroscopic effect on a rotor whose axis is also athwartships, and produces the full couple on one whose axis is fore-and-aft. So the design decision is not "reduce the couple" but "align the two axes", and it is why a ship's main turbine is always mounted **fore-and-aft** — the axis about which the ship pitches and yaws most is athwartships, and putting the largest rotor's spin axis along it makes the scalar product vanish for the roll and leaves only the much smaller yaw component. Reversing the layout, as this exercise's wording invites, gives $25.7\ \mathrm{N\,m}$, which for this machine is trivial; scale it to a $40\ \mathrm{MW}$ turbine at $3600\ \mathrm{rpm}$ with $I_s = 2 \times 10^{5}\ \mathrm{kg\,m^{2}}$ and the same pitch rate gives $2 \times 10^{5} \times 377 \times 0.01047 = 790\ \mathrm{kN\,m}$, which is enough to walk a foundation plate apart. The mount design then follows: the couple is applied about the **vertical** axis for a fore-and-aft rotor in a pitching ship, so it is the fore-and-aft chocks and the thrust block that carry it, and the fatigue check is made at the roll-and-pitch combination frequency rather than at either alone.
:::
:::

::: exercise Derivation {level=3}
Derive the rotating couple $M = \left( I_z - I_x \right) \omega^{2} \sin \alpha \cos \alpha$ for a thin disc of thickness small compared with its diameter, mounted with its normal at angle $\alpha$ to the rotation axis $z$, and show that two correction masses in two planes can cancel it.
::: solution
**Angular momentum.** Take principal axes at the disc centre with $3$ along the disc normal, so $I_1 = I_2 = I_t$ and $I_3 = I_p = 2 I_t$ for a thin disc. The rotation axis $z$ makes angle $\alpha$ with axis $3$, so in the principal frame
$$
\boldsymbol{\omega} = \omega \left( \sin \alpha, \ 0, \ \cos \alpha \right), \qquad
\mathbf{H} = I_t \omega \left( \sin \alpha, \ 0, \ 2 \cos \alpha \right) .
$$
Resolve $\mathbf{H}$ along and across $z$:
$$
H_z = \mathbf{H} \cdot \hat{\mathbf{z}} = I_t \omega \left( \sin^{2} \alpha + 2 \cos^{2} \alpha \right),
\qquad
H_\perp = I_t \omega \sin \alpha \cos \alpha .
$$
The transverse component $H_\perp$ rotates with the shaft at $\omega$, so its rate of change is $\omega H_\perp$, and the moment required is
$$
M = \omega H_\perp = I_t \omega^{2} \sin \alpha \cos \alpha .
$$
Since $I_p - I_t = I_t$, this is $\left( I_z - I_x \right) \omega^{2} \sin \alpha \cos \alpha$ as stated, and for a general body the coefficient is the difference of the two relevant principal moments. $\checkmark$

**Correction.** Two masses $m_c$ at radius $\rho$ in planes at $\pm g$ from the disc, one at angle $0$ and the other at $180^{\circ}$, give a couple unbalance
$$
C = 2 m_c \rho g \sin \phi
$$
where $\phi$ is their angular position relative to the tilt direction. Choosing $\phi = 90^{\circ}$ puts the correction couple in the right plane, and setting
$$
2 m_c \rho g = I_t \sin \alpha \cos \alpha
$$
cancels it exactly. For the rotor of Example 5, $I_t \sin \alpha \cos \alpha = 3.62 \times 10^{- 3}\ \mathrm{kg\,m^{2}}$, so with $\rho = 100\ \mathrm{mm}$ and $g = 150\ \mathrm{mm}$,
$$
m_c = \frac{3.62 \times 10^{- 3}}{2 \times 0.1 \times 0.15} = 0.121\ \mathrm{kg} = 121\ \mathrm{g}
$$
in each of two planes.

*Comment.* Note what the correction does **not** require: no mass is removed from the disc, and the mass centre stays exactly where it was. That is the reason a two-plane balance machine spins the rotor — it measures the two bearing **forces**, one of which is the static unbalance and the other the couple, and it can therefore separate them. A single-plane machine cannot, which is why single-plane balancing is legitimate only for a thin disc, where $I_p - I_t$ is small and $\alpha$ is unavoidably small too.
:::
:::
