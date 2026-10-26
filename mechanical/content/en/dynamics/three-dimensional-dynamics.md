Three-dimensional dynamics differs from plane dynamics in one respect and one only: the angular momentum $\mathbf{H}$ is **not** parallel to the angular velocity $\boldsymbol{\omega}$. Everything strange in this subject — a spinning wheel that refuses to fall, a rotor that walks itself off a bed, a ship that yaws when it pitches — follows from that single non-alignment, and the whole apparatus of inertia tensors, principal axes and Euler's equations exists to keep track of the angle between the two vectors.

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
\mathbf{I}_O = \begin{pmatrix} I_{xx} & - I_{xy} & - I_{xz} \\ - I_{xy} & I_{yy} & - I_{yz} \\ - I_{xz} & - I_{yz} & I_{zz} \end{pmatrix},
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
= \begin{vmatrix} \mathbf{e}_1 & \mathbf{e}_2 & \mathbf{e}_3 \\ \omega_1 & \omega_2 & \omega_3 \\ I_1 \omega_1 & I_2 \omega_2 & I_3 \omega_3 \end{vmatrix}
= \left( \left( I_3 - I_2 \right) \omega_2 \omega_3, \ \left( I_1 - I_3 \right) \omega_3 \omega_1, \ \left( I_2 - I_1 \right) \omega_1 \omega_2 \right) .
$$
Equating components gives Euler's equations. $\checkmark$

*Note.* The body frame must be attached to the body for the tensor to be constant, and it must be a principal frame for $\mathbf{H}$ to be diagonal in it. The equations are valid about a fixed point or about the **mass centre** — the transport term that appears for any other point is exactly the one excluded in [[dynamics/rigid-body-kinetics]].
:::

::: proof Steady precession of a top {#proof-top}
Take a symmetric top with its point at the fixed origin, its axis at angle $\theta$ to the vertical and precessing steadily at $\Omega$ about the vertical. Its angular velocity is $\boldsymbol{\omega} = \Omega \mathbf{k} + \dot{\psi} \mathbf{e}_3$, with $\dot{\psi}$ the spin relative to the precessing plane, and we write $\omega_s = \dot{\psi} + \Omega \cos \theta$ for the total spin component along the axis. Splitting $\Omega \mathbf{k} = \Omega \cos \theta \, \mathbf{e}_3 + \Omega \sin \theta \, \mathbf{e}_\perp$, where $\mathbf{e}_\perp$ is the unit vector perpendicular to the axis in the vertical plane containing it, the angular momentum about the point is
$$
\mathbf{H} = I_t \Omega \sin \theta \, \mathbf{e}_\perp + I_s \omega_s \mathbf{e}_3 ,
$$
with $I_t$ the transverse moment about the point. In a steady precession the vertical component of $\mathbf{H}$ is constant, and only the **horizontal** component changes; since $\mathbf{e}_3$ has horizontal component $\sin \theta$ and $\mathbf{e}_\perp$ has horizontal component $- \cos \theta$, its magnitude is
$$
H_h = I_s \omega_s \sin \theta - I_t \Omega \sin \theta \cos \theta ,
$$
and it rotates at $\Omega$, so
$$
\left| \dot{\mathbf{H}} \right| = \Omega H_h
= \Omega \sin \theta \left( I_s \omega_s - I_t \Omega \cos \theta \right) .
$$
The moment of the weight about the point is $m g \ell \sin \theta$, and equating the two and dividing through by $\sin \theta$ gives the quadratic
$$
I_t \Omega^{2} \cos \theta - I_s \omega_s \Omega + m g \ell = 0 .
$$
For a fast spin, $I_s^{2} \omega_s^{2} \gg 4 I_t m g \ell \cos \theta$, the small root is
$$
\Omega \approx \frac{m g \ell}{I_s \omega_s} ,
$$
and the other root, from balancing the first two terms, is $\Omega \approx I_s \omega_s / I_t \cos \theta$, the **fast** precession. $\checkmark$

*Note.* The slow precession is inversely proportional to the spin, so a top slowing down under friction precesses **faster** and faster until $I_s^{2} \omega_s^{2}$ falls below $4 I_t m g \ell \cos \theta$, the steady solution ceases to exist and it topples; the fast precession is independent of gravity, and it is what you see if you flick a top's axis sharply.
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

*Sanity.* The couple is proportional to the **spin**, so a rotor that is not spinning produces none, and it reverses when the spin reverses: the direction of the response is set by the right-hand rule applied twice, and reversing a machine's direction of rotation reverses every gyroscopic load on its mounts.
:::
:::

::: widget plot
f: 1.962/(0.245*x)
x: 20, 400
y: 0, 0.45
labels: \text{precession rate } \Omega \ \left( \mathrm{rad/s} \right)
caption: Steady precession rate of the held bicycle wheel of the example below against its spin speed $\omega_s$ in radians per second, from $\Omega = m g r / I_s \omega_s$. The curve is a rectangular hyperbola: doubling the spin halves the precession rate, and as the spin tends to zero the formula predicts an infinite precession rate, which is the mathematical signal that the fast-spin approximation has broken down — at low spin the axle droops and nutates visibly instead of precessing smoothly.
:::

## Steady precession

::: theorem Steady precession of a spinning top {#thm-top}
A symmetric top of mass $m$, spin $\omega_s$ about its own axis and centre of mass at distance $\ell$ from a fixed point, precessing steadily at rate $\Omega$ with its axis at angle $\theta$ to the vertical, satisfies
$$
I_s \omega_s \Omega \sin \theta = m g \ell \sin \theta
\quad\Longrightarrow\quad
\Omega = \frac{m g \ell}{I_s \omega_s}
$$
for the **slow** precession, valid when $I_s^{2} \omega_s^{2} \gg 4 I_t m g \ell \cos \theta$, with $I_t$ the transverse moment of inertia about the fixed point. The full quadratic in $\Omega$ also admits a fast precession
$$
\Omega_{\text{fast}} \approx \frac{I_s \omega_s}{I_t \cos \theta},
$$
which is rarely observed because friction in the point kills it within a few turns.
:::

::: example Held bicycle wheel {#ex-held-wheel}
A bicycle wheel of mass $2\ \mathrm{kg}$, with all its mass effectively at a $350\ \mathrm{mm}$ radius, spins at $3000\ \mathrm{rpm}$ and is held by one end of its axle, horizontal, with the wheel's centre $100\ \mathrm{mm}$ from the hand. Find the precession rate, and the initial angular acceleration with which the axle droops if the wheel is not spinning.
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
\alpha = \frac{m g r}{I_O} = \frac{2 \times 9.81 \times 0.1}{\tfrac{1}{2} \times 2 \times 0.35^{2} + 2 \times 0.1^{2}}
= \frac{1.962}{0.1425} = 13.8\ \mathrm{rad / s^{2}},
$$
using the moment of inertia of the rim about a **diameter**, $\tfrac{1}{2} m R^{2}$, plus the parallel-axis term. After $0.1\ \mathrm{s}$ it is already drooping at $1.38\ \mathrm{rad / s}$ — over fifty times the steady precession rate.

*Sanity.* The spinning wheel precesses at a degree and a half a second, which is slow enough to be uncanny and is the entire demonstration. The direction is the part everyone gets wrong. The weight's moment about the hand is horizontal and perpendicular to the axle, and the angular momentum vector, which lies along the axle, swings towards it: if the wheel spins anticlockwise as seen looking at it from outside, back along the axle towards the hand, the axle precesses anticlockwise as seen from above, and reversing the spin reverses it. The momentum vector always chases the applied couple.
:::
:::

::: example Angular momentum is not along angular velocity {#ex-H-not-omega}
Two point masses, $3\ \mathrm{kg}$ at $\left( 0.2, 0.1, 0 \right)$ and $2\ \mathrm{kg}$ at $\left( 0, 0.15, 0.25 \right)$ in metres, are rigidly joined and rotated at $\boldsymbol{\omega} = \left( 2, 3, 1 \right)\ \mathrm{rad / s}$ about the origin. Find $\mathbf{H}$ and the angle between $\mathbf{H}$ and $\boldsymbol{\omega}$.
::: solution
Building the tensor from $\mathbf{I} = \sum m \left( r^{2} \mathbf{1} - \mathbf{r} \mathbf{r}^{\mathrm{T}} \right)$,
$$
\mathbf{I} = \begin{pmatrix} 0.200 & - 0.060 & 0 \\ - 0.060 & 0.245 & - 0.075 \\ 0 & - 0.075 & 0.195 \end{pmatrix} \mathrm{kg\,m^{2}} ,
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

*Sanity.* Twenty-two degrees between the momentum and the axis, from a body of just two masses. If the body is kept turning steadily about this fixed axis, the component of $\mathbf{H}$ perpendicular to $\boldsymbol{\omega}$, of magnitude $\sqrt{0.584^{2} - 0.543^{2}} = 0.216\ \mathrm{kg\,m^{2} / s}$, rotates with the body at $\omega = 3.74\ \mathrm{rad / s}$, so it demands a moment of $3.74 \times 0.216 = 0.81\ \mathrm{N\,m}$ from the bearings — and that moment scales as $\omega^{2}$, so at $100$ times this speed the same two masses would need about $8100\ \mathrm{N\,m}$. The products of inertia are what a dynamic balancing machine is measuring.
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
already well down from the resonant peak: above the critical speed the shaft deflects on the opposite side from the mass centre, so the mass centre is pulled towards the bearing axis, and as the speed rises further the deflection tends to the eccentricity itself — the rotor ends up spinning about its own mass centre.

*Sanity.* Five millimetres of deflection on a $0.5\ \mathrm{mm}$ eccentricity is a factor of ten, and it is the reason a machine must be run **through** its critical speed quickly rather than rested on it — a rule that surprises no one who has watched a washing machine walk itself across a floor at the speed where the drum's whirling is worst. The more important number is the one above the critical: at $1.5$ times the critical the deflection is $1.8$ times the eccentricity and falls towards $1.0$ times it as the speed rises, so the mass centre ends up nearly on the bearing axis. Flexible rotors — those running above one or more criticals — must also be balanced with their bending mode shapes in mind, which is why large turbine-generator sets are balanced at operating speed.
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
A slender steel shaft carries a thin $2\ \mathrm{kg}$ disc of $500\ \mathrm{mm}$ diameter whose plane is tilted $5^{\circ}$ from perpendicular to the shaft, with its centre exactly on the axis, between bearings $300\ \mathrm{mm}$ apart, running at $3000\ \mathrm{rpm}$. Find the bearing forces.
::: solution
The mass centre is on the axis, so there is **no** static unbalance and a static balance passes it. For a thin disc of radius $R$ the polar and diametral moments are $\tfrac{1}{2} m R^{2}$ and $\tfrac{1}{4} m R^{2}$, so $\Delta I = \tfrac{1}{4} m R^{2} = 0.03125\ \mathrm{kg\,m^{2}}$, and the product of inertia about the shaft axes is
$$
I_{xz} = \Delta I \sin \alpha \cos \alpha
= 0.03125 \times 0.0868 = 2.71 \times 10^{- 3}\ \mathrm{kg\,m^{2}},
$$
and the rotating couple is
$$
M = I_{xz} \omega^{2} = 2.71 \times 10^{- 3} \times 314.2^{2} = 268\ \mathrm{N\,m},
$$
$$
\text{force per bearing} = \frac{268}{0.3} = 893\ \mathrm{N} = 46\, m g .
$$
*Check.* A $10\ \mathrm{kg}$ rotor with a $2\ \mathrm{mm}$ static eccentricity at the same speed gives $m e \omega^{2} = 10 \times 0.002 \times 98\,700 = 1974\ \mathrm{N}$, so the two effects are of the same order — but the couple version is invisible to a static balance. $\checkmark$

*Sanity.* Forty-six times the weight, from a tilt of five degrees. That is the whole of **dynamic** balancing, and it is why a car road wheel is balanced on a machine that spins it rather than on a bubble level, why a turbine rotor is balanced in two planes, and why the balance quality of a part is specified as a **grade** — ISO $1940$ G-values such as G6.3 for a pump impeller or fan and G40 for a car wheel — which is an allowable product $e \omega$ in millimetres per second rather than a mass.
:::
:::

::: example Ship's turbine {#ex-ship-turbine}
A ship's turbine rotor, mounted fore-and-aft, has a mass of $8\ \mathrm{t}$, a radius of gyration of $0.5\ \mathrm{m}$ and runs at $3000\ \mathrm{rpm}$, turning clockwise viewed from astern. If the ship pitches, its bow rising through $10^{\circ}$ in $8\ \mathrm{s}$, find the mean gyroscopic couple and its effect.
::: solution
$$
I_s = 8000 \times 0.5^{2} = 2000\ \mathrm{kg\,m^{2}}, \qquad
\omega_s = 314.2\ \mathrm{rad / s},
$$
$$
\Omega = \frac{10 \times \pi / 180}{8} = 0.0218\ \mathrm{rad / s},
\qquad
M = I_s \omega_s \Omega = 2000 \times 314.2 \times 0.0218 = 13.7\ \mathrm{kN\,m} .
$$
**Direction.** Clockwise viewed from astern means the spin angular momentum points **forwards**. As the bow rises the pitch rotation vector points to **port**, which swings the forward-pointing momentum vector **downwards**; the rotor needs a couple about the downward vertical, and it reacts on the ship with the opposite couple, about the upward vertical, which turns the **bow to port**. When the bow falls the yaw reverses — the ship yaws as it pitches.

*Sanity.* Rolling, about the fore-and-aft axis, is parallel to the spin and produces no gyroscopic couple on this rotor, which is one reason large rotors are mounted fore-and-aft: rolling is usually the largest angular motion of a ship. The standard remedy for the remaining pitch and yaw couples is to use two rotors turning in **opposite** directions, which cancels them — the same trick a contra-rotating propeller uses.
:::
:::

::: warning Steady precession is an approximation, and the exact motion is a polhode
A torque-free asymmetric body does not in general rotate about a fixed axis at all: $\mathbf{H}$ stays fixed in space while $\boldsymbol{\omega}$ traces a **polhode** on the body's inertia ellipsoid, and Poinsot's construction rolls that ellipsoid on a fixed plane perpendicular to $\mathbf{H}$, the point of contact tracing the **herpolhode**. Steady precession is the special solution in which $\boldsymbol{\omega}$, $\mathbf{H}$ and the symmetry axis are coplanar and the geometry is constant. Rotation about the **middle** principal axis is unstable — the intermediate-axis or "tennis racket" theorem — so a body spun about that axis periodically flips over, as the cosmonaut Vladimir Dzhanibekov saw with a spinning wing nut aboard Salyut 7 in 1985. Rotation about the axis of **minimum** inertia is stable for a rigid body but becomes unstable once internal energy dissipation is allowed, as Explorer 1 showed in 1958, which is why a spin-stabilised spacecraft is designed so that its spin axis is its axis of **maximum** inertia.
:::

::: history
The equations of rigid-body rotation are Euler's, in a memoir presented to the Berlin Academy in 1758 and published in 1765, and the geometric picture of the inertia ellipsoid, the polhode and the herpolhode is Poinsot's of 1834, which replaced the algebra with a rolling construction that still gives the subject its intuition. The **tennis racket theorem** — the instability of rotation about the intermediate axis — follows from Euler's equations and is made plain by Poinsot's geometry; its best-known demonstration is Dzhanibekov's spinning wing nut on Salyut 7 in 1985. The **gyroscope** as an instrument, and its name, are Foucault's of 1852, built to demonstrate the Earth's rotation; the first practical **gyrocompass** was Hermann Anschütz-Kaempfe's of 1908, followed by Elmer Sperry's in 1911, and Max Schuler's analysis of 1923 showed how to make such instruments insensitive to the ship's accelerations. The **critical speed** of a shaft, the lateral resonance that unbalance excites, was first analysed by Rankine in 1869, whose model suggested that running above it was impossible; de Laval's steam turbines ran supercritically in the 1880s, Föppl explained why in 1895, and Jeffcott's rotor model of 1919 is the basis of the analysis above. The **balance-grade** system of ISO 1940, first published in 1973, expresses the old craft rule "balance it well enough for the speed it runs at" as an allowable product of eccentricity and angular velocity.
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
A static balance detects only the position of the **mass centre**. If the rotor's principal axis is inclined to the shaft — a disc mounted a degree out of square, or a long rotor with equal and opposite unbalances at its two ends — then the mass centre stays on the axis while the products of inertia do not vanish, and the running rotor applies a **rotating couple** to its bearings. The magnitude is $\left( I_z - I_x \right) \omega^{2} \sin \alpha \cos \alpha$, which for a modest disc at five degrees and $3000\ \mathrm{rpm}$ was over forty times the rotor's weight in [[#ex-rotor-unbalance]]. Only a two-plane dynamic balance, done with the rotor turning, can find it, which is why a rotor specification names a balance **grade** and the **number of correction planes**, not just "balanced".
:::
:::

## Exercises

::: exercise Gyroscopic couple {level=1 check="1.885"}
For the disc of [[#ex-gimbal]], what couple (in N m) is required if the spin is doubled and the precession rate halved?
::: solution
$M = I_s \omega_s \Omega$ is unchanged: $0.12 \times 314.2 \times 0.05 = 1.885\ \mathrm{N\,m}$.
:::
:::

::: exercise Precession {level=1 check="0.051"}
For the wheel of [[#ex-held-wheel]], what is the precession rate (in rad/s) if the spin is $1500\ \mathrm{rpm}$ instead of $3000$?
::: solution
$\Omega$ doubles: $0.051\ \mathrm{rad / s}$, or $2.9^{\circ} / \mathrm{s}$.
:::
:::

::: exercise Principal axes {level=1 check="0.0217"}
A uniform rectangular block of sides $a, b, c$ has zero products of inertia about axes through its centre parallel to its edges. State why, and give the three principal moments for a $2\ \mathrm{kg}$ block of $100 \times 200 \times 300\ \mathrm{mm}$; enter the largest, in $\mathrm{kg\,m^{2}}$.
::: solution
Each pair of these axes lies in a plane of symmetry of the block, so every product $\int x y \, \mathrm{d} m$ cancels between mirror-image elements. The principal moments are
$$
I_a = \tfrac{1}{12} m \left( b^{2} + c^{2} \right) = \tfrac{1}{12} \times 2 \left( 0.04 + 0.09 \right) = 0.0217\ \mathrm{kg\,m^{2}},
$$
and similarly $\tfrac{1}{6} \left( 0.01 + 0.09 \right) = 0.0167$ and $\tfrac{1}{6} \left( 0.01 + 0.04 \right) = 0.0083\ \mathrm{kg\,m^{2}}$; the largest is $0.0217\ \mathrm{kg\,m^{2}}$.
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
*Sanity.* A static balance finds nothing, because the wheel's mass centre is on the axis; the whole load comes from the products of inertia. It is why precision grinders balance the wheel together with its flanges, mounted as it will run, and why a wheel must be mounted square on its flanges.
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
Relative to the body, the transverse components of $\boldsymbol{\omega}$ therefore circle at the **same rate** as the spin component $\omega_3$, so the ratio is $1$; as seen from inertial space the axis precesses about $\mathbf{H}$ at $H / I_1 = 2 \omega_3 / \cos \beta = 2.03\, \omega_3$.
*Sanity.* The factor $I_1 / I_3$ in the tangent relation is what makes the cone angles different on the two sides of the momentum vector, and it is the reason a spin-stabilised satellite is designed so that $I_3 > I_1$: real spacecraft dissipate internal energy, through flexing structures and sloshing propellant, and with dissipation only a spin about the axis of **maximum** inertia is stable. A spin about the axis of least inertia slowly opens into a tumble, as Explorer 1 demonstrated in 1958.
:::
:::

::: exercise Gyroscopic effect on a vehicle {level=2}
A motorcycle's road wheel has $I_s = 0.6\ \mathrm{kg\,m^{2}}$ and runs at $60\ \mathrm{km / h}$ on a $600\ \mathrm{mm}$ diameter wheel. Find the gyroscopic couple (in N m) when the rider rounds a $20\ \mathrm{m}$ radius left-hand bend, and say which way it tends to roll the machine.
::: solution
$$
\omega_s = \frac{60 / 3.6}{0.3} = 55.6\ \mathrm{rad / s}, \qquad
\Omega = \frac{v}{R} = \frac{16.67}{20} = 0.833\ \mathrm{rad / s},
$$
$$
M = 0.6 \times 55.6 \times 0.833 = 27.8\ \mathrm{N\,m}.
$$
**Direction.** A wheel rolling forwards has its angular momentum pointing to the rider's **left**. Yawing left swings that vector **backwards**, so the wheel needs a couple about the backward-pointing axis — a couple rolling it to the left — and it reacts on the forks with the opposite couple, tending to roll the machine to the **right**, out of the bend. The rider must therefore lean slightly further into the bend than the balance of weight and centrifugal effect alone would require.
*Sanity.* For a $250\ \mathrm{kg}$ machine and rider with the mass centre $0.6\ \mathrm{m}$ up, the centrifugal roll moment is $250 \times 13.9 \times 0.6 \approx 2080\ \mathrm{N\,m}$, so the front wheel's $27.8\ \mathrm{N\,m}$ adds only a fraction of a degree of lean; the rear wheel and the engine's rotating parts add more of the same kind.
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

*Design comment.* The answer is the point. A gyroscopic couple requires the spin axis and the precession axis to be **inclined** to one another; pitching about an athwartships axis produces no gyroscopic effect on a rotor whose axis is also athwartships, and the full $I_s \omega_s \Omega = 25.7\ \mathrm{N\,m}$ on the same rotor mounted fore-and-aft. The athwartships motor is, however, fully exposed to **rolling**, and a roll at the same rate would give the same $25.7\ \mathrm{N\,m}$, about a vertical axis, alternating at the roll frequency. For this machine that is trivial compared with its weight of $2.5\ \mathrm{kN}$, so nothing needs changing beyond checking the mounts for the alternating load; for a large rotor the choice is to orient its axis so that the ship's largest angular motion — usually roll — is about the spin axis, which means mounting it fore-and-aft.
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

**Correction.** Two masses $m_c$ at radius $\rho$, in planes a distance $g$ either side of the disc along the shaft and $180^{\circ}$ apart, both lying in the plane that contains the shaft axis and the disc normal, produce rotating forces $m_c \rho \omega^{2}$ that form a rotating couple $2 m_c \rho g \, \omega^{2}$ in that plane, with no net force. Placing them on the sides that oppose the disc's couple and setting
$$
2 m_c \rho g = I_t \sin \alpha \cos \alpha
$$
cancels it exactly at every speed. For the rotor of [[#ex-rotor-unbalance]], $I_t \sin \alpha \cos \alpha = 2.71 \times 10^{- 3}\ \mathrm{kg\,m^{2}}$, so with $\rho = 100\ \mathrm{mm}$ and $g = 150\ \mathrm{mm}$,
$$
m_c = \frac{2.71 \times 10^{- 3}}{2 \times 0.1 \times 0.15} = 0.090\ \mathrm{kg} = 90\ \mathrm{g}
$$
in each of two planes.

*Comment.* Note what the correction does **not** require: no mass is removed from the disc, and the mass centre stays exactly where it was. That is the reason a two-plane balance machine spins the rotor — it measures the two rotating bearing **forces**, whose sum reflects the static unbalance and whose difference reflects the couple, and it can therefore separate them. A single-plane balance cannot, which is why single-plane balancing is accepted only for narrow, disc-like rotors mounted accurately square, whose couple unbalance is small compared with their static unbalance.
:::
:::
