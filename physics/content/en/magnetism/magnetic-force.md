The electrostatic force on a charge depends on where the charge is, not on how fast it is moving. A current does something a stationary charge does not. A compass needle near a wire swings when the wire carries a current, and a current is charge in motion. The force that accounts for this is the magnetic force. It is perpendicular to the velocity of the charge it acts on, so it bends a trajectory without changing the speed. That one geometric fact produces circular orbits, helical paths, sideways forces on wires, and torques on coils.

The cross product and the right-hand rule for it are those of [[mechanics/units-vectors]]. Newton's second law is [[mechanics/newton-laws]], and the electric field is [[electrostatics/electric-field]]. In this chapter the magnetic field $\mathbf{B}$ is given. How currents produce $\mathbf{B}$ is [[magnetism/biot-savart]]. The unit of $\mathbf{B}$ is the tesla: $1\,\mathrm{T} = 1\,\mathrm{N}/(\mathrm{A\cdot m})$. A field of a tesla is a strong laboratory field. The Earth's surface field is of order $10^{-4}\,\mathrm{T}$.

## The Lorentz force

::: definition Lorentz force {#def-lorentz}
A particle of charge $q$ moving at velocity $\mathbf{v}$ in an electric field $\mathbf{E}$ and a magnetic field $\mathbf{B}$ feels the force

$$
\mathbf{F} = q\left(\mathbf{E} + \mathbf{v}\times\mathbf{B}\right).
$$ {#eq-lorentz}

The magnetic part alone has magnitude

$$
F_{\mathrm{m}} = \abs{q}\, v B \sin\theta,
$$ {#eq-lorentz-mag}

where $\theta$ is the angle between $\mathbf{v}$ and $\mathbf{B}$ when the two vectors are placed tail to tail. The direction of $\mathbf{v}\times\mathbf{B}$ is given by the right-hand rule: point the fingers of the right hand along $\mathbf{v}$ and curl them toward $\mathbf{B}$; the thumb points along $\mathbf{v}\times\mathbf{B}$. The force on a positive charge is in that direction. The force on a negative charge is opposite to it.
:::

Several cases drop out of [[#eq-lorentz-mag]] at once. A charge at rest feels no magnetic force. A charge moving parallel or antiparallel to $\mathbf{B}$ feels none either, because $\sin\theta = 0$. A neutral particle feels none. Doubling $q$, $v$ or $B$, or replacing a glancing angle by a right angle, scales the magnitude in the way the formula says, and does not by itself decide the direction. The direction is a separate step, and it is the step that goes wrong when the sign of $q$ is forgotten.

The electric and magnetic parts are not on the same footing. The electric force can point in any direction relative to $\mathbf{v}$. The magnetic force is constrained.

::: proposition Magnetic forces do no work {#prop-nowork}
Let $\mathbf{F}_{\mathrm{m}} = q\,\mathbf{v}\times\mathbf{B}$ be the magnetic force on a particle. Then $\mathbf{F}_{\mathrm{m}}\cdot\mathbf{v} = 0$ at every instant. If no other force does work, the kinetic energy and the speed of the particle are constant. The result holds for any magnetic field, uniform or not, constant or varying, provided the force law is [[#eq-lorentz]].
:::

::: proof
The scalar triple product $(\mathbf{v}\times\mathbf{B})\cdot\mathbf{v}$ vanishes because $\mathbf{v}\times\mathbf{B}$ is perpendicular to $\mathbf{v}$. Hence the instantaneous power of the magnetic force is

$$
P_{\mathrm{m}} = \mathbf{F}_{\mathrm{m}}\cdot\mathbf{v} = q(\mathbf{v}\times\mathbf{B})\cdot\mathbf{v} = 0.
$$

For a particle of constant mass the kinetic energy $K = \tfrac12 m v^2$ has derivative $\mathrm{d}K/\mathrm{d}t = m\mathbf{v}\cdot\mathbf{a}$. Newton's second law says $m\mathbf{a}$ is the total force, so $\mathrm{d}K/\mathrm{d}t = \mathbf{F}\cdot\mathbf{v}$. If the only force is magnetic, $\mathrm{d}K/\mathrm{d}t = 0$. A constant $K$ means a constant speed. The direction of $\mathbf{v}$ is not constrained by this argument, and in general it changes.
:::

An electric field, or any other force with a component along $\mathbf{v}$, can still change the speed. The magnetic field can change the direction while that happens. What it cannot do is take a share of the energy budget on its own.

::: warning Magnetic forces, wires and work
[[#prop-nowork]] says that $\mathbf{B}$ does no work on a free charge, because $\mathbf{F}_{\mathrm{m}}$ is perpendicular to $\mathbf{v}$. A magnetic field cannot speed a particle up or slow it down. It only steers it. A current-carrying wire can still be pushed along its rails, and the wire can gain kinetic energy. That does not contradict the proposition. The charges in the wire are constrained to stay inside the metal. The magnetic force on those charges is handed to the lattice by the constraint forces, and the lattice moves. The energy does not come from $\mathbf{B}$ doing work on the drifting charges. It comes from the battery, or from whatever agency keeps the current flowing when the wire moves. Do not say that $\mathbf{B}$ does work on the drifting charges.
:::

The distinction matters as soon as a motor or a rail appears. The force on the wire is real, and the mechanical work done on the wire is real. The accounting that pays for it is electromagnetic only after induction is included, which is [[magnetism/faraday]]. Until then the safe sentence is the one in the warning: the magnetic force redirects; it does not feed energy to a free particle.

A proton with $v = 3.00 \times 10^{5}\,\mathrm{m/s}$ perpendicular to $B = 0.200\,\mathrm{T}$ feels

$$
F_{\mathrm{m}} = e v B = (1.602176634 \times 10^{-19})(3.00 \times 10^{5})(0.200) = 9.61 \times 10^{-15}\,\mathrm{N}.
$$

Its weight, with $m_{\mathrm{p}} = 1.6726219 \times 10^{-27}\,\mathrm{kg}$ and $g = 9.80\,\mathrm{m/s^2}$, is $m_{\mathrm{p}} g = 1.64 \times 10^{-26}\,\mathrm{N}$. The magnetic force is larger than the weight by a factor $5.86 \times 10^{11}$. Gravity is negligible for this orbit, which is why the trajectories below are calculated from the Lorentz force alone. The speed is only $v/c = 1.00 \times 10^{-3}$ of the speed of light, with $c = 2.99792458 \times 10^{8}\,\mathrm{m/s}$, so the non-relativistic form of Newton's second law is the right mechanics.

## Circular and helical orbits

A uniform field does the cleanest steering. There is no preferred position, only a preferred direction, the direction of $\mathbf{B}$.

::: theorem Cyclotron motion {#thm-cyclotron}
A particle of charge $q$, mass $m$ and speed $v$ moves in a uniform magnetic field $\mathbf{B}$, with $\mathbf{v}$ perpendicular to $\mathbf{B}$ and with no electric field. The orbit is a circle of radius

$$
R = \frac{m v}{\abs{q}\, B},
$$ {#eq-radius}

traversed at constant speed. The angular frequency and the period are

$$
\omega = \frac{\abs{q}\, B}{m}, \qquad T = \frac{2\pi m}{\abs{q}\, B}.
$$ {#eq-cyclotron}

The angular frequency is the **cyclotron frequency**. It does not depend on $v$ or on $R$.
:::

::: proof
By [[#prop-nowork]] the speed is constant, so the acceleration is purely normal to the path. A force of constant magnitude, always perpendicular to the velocity, produces uniform circular motion: the magnetic force supplies the centripetal force required by [[mechanics/newton-laws]]. In magnitudes,

$$
\frac{m v^2}{R} = \abs{q}\, v B,
$$

because $\sin\theta = 1$. Cancel one factor of $v$, which is not zero, and solve for $R$ to obtain [[#eq-radius]]. The angular frequency is the speed divided by the radius,

$$
\omega = \frac{v}{R} = \frac{\abs{q}\, B}{m}.
$$

The period is the circumference divided by the speed, $T = 2\pi R/v = 2\pi/\omega$, which is [[#eq-cyclotron]]. The speed cancelled. A faster particle travels a larger circle in the same time.
:::

The sense of the rotation follows the right-hand rule together with the sign of $q$. Pick one point on the proposed circle, compute $\mathbf{v}\times\mathbf{B}$ there, and check that $q$ times that vector points inward. One check fixes the sense of the whole orbit. Because $\omega$ does not depend on $v$, a cyclotron can accelerate particles with a voltage at one fixed frequency while the orbit grows. That use of [[#eq-cyclotron]] stays inside the non-relativistic hypothesis of the theorem.

If the velocity is not perpendicular to $\mathbf{B}$, split it. The component parallel to the field feels no magnetic force. The component perpendicular to the field does the circling of [[#thm-cyclotron]].

::: corollary Helical motion {#cor-helix}
In a uniform field $\mathbf{B}$ with no electric field, let $v_{\parallel}$ be the component of the velocity parallel to $\mathbf{B}$ and $v_{\perp}$ the perpendicular component. Then $v_{\parallel}$ is constant, the perpendicular motion is uniform circular motion of radius $R = m v_{\perp}/(\abs{q}\, B)$ at the cyclotron frequency [[#eq-cyclotron]], and the path is a helix. The pitch, the distance travelled along $\mathbf{B}$ in one period, is

$$
p = v_{\parallel} T = \frac{2\pi m v_{\parallel}}{\abs{q}\, B}.
$$ {#eq-pitch}
:::

::: proof
Write $\mathbf{v} = \mathbf{v}_{\parallel} + \mathbf{v}_{\perp}$. Then $\mathbf{v}_{\parallel}\times\mathbf{B} = \mathbf{0}$, so the parallel component of the Lorentz force vanishes and $m\,\mathrm{d}\mathbf{v}_{\parallel}/\mathrm{d}t = \mathbf{0}$. The perpendicular component of the force is $q\mathbf{v}_{\perp}\times\mathbf{B}$, which is the force used in the proof of [[#thm-cyclotron]] with $v$ replaced by $v_{\perp}$. The parallel motion is uniform, so in one cyclotron period the particle advances a distance $v_{\parallel} T$ along the field. That distance is the pitch.
:::

A velocity exactly along $\mathbf{B}$ is a helix of radius zero, a straight line. A small perpendicular component winds a tight helix around that line. Magnetic bottles and the confinement of a charged particle along a field line are this corollary, with a field that changes slowly from place to place. The slow change is outside the uniform-field proof.

::: example A proton in a uniform field {#ex-proton}
A proton moves at $v = 3.00 \times 10^{5}\,\mathrm{m/s}$ perpendicular to a uniform field $B = 0.200\,\mathrm{T}$. Take $m_{\mathrm{p}} = 1.6726219 \times 10^{-27}\,\mathrm{kg}$ and $e = 1.602176634 \times 10^{-19}\,\mathrm{C}$. Find the orbital radius and the cyclotron frequency.
::: solution
[[#eq-radius]] and [[#eq-cyclotron]] give

$$
\begin{aligned}
R &= \frac{m_{\mathrm{p}} v}{e B}
  = \frac{(1.6726219 \times 10^{-27})(3.00 \times 10^{5})}{(1.602176634 \times 10^{-19})(0.200)}
  = 1.56595 \times 10^{-2}\,\mathrm{m}, \\
\omega &= \frac{e B}{m_{\mathrm{p}}}
  = \frac{(1.602176634 \times 10^{-19})(0.200)}{1.6726219 \times 10^{-27}}
  = 1.91577 \times 10^{7}\,\mathrm{rad/s}.
\end{aligned}
$$

To three significant figures, matching the data, $R = 1.57 \times 10^{-2}\,\mathrm{m}$ and $\omega = 1.92 \times 10^{7}\,\mathrm{rad/s}$. The period is $T = 2\pi/\omega = 3.27972 \times 10^{-7}\,\mathrm{s}$, or $3.28 \times 10^{-7}\,\mathrm{s}$ to three significant figures, and the ordinary frequency is $f = \omega/(2\pi) = 3.05 \times 10^{6}\,\mathrm{Hz}$. The kinetic energy is $\tfrac12 m_{\mathrm{p}} v^2 = 7.53 \times 10^{-17}\,\mathrm{J} = 470\,\mathrm{eV}$, using $1\,\mathrm{eV} = 1.602176634 \times 10^{-19}\,\mathrm{J}$. The orbit is a centimetre and a half across and is completed about three million times a second. The centripetal acceleration is $v^2/R = 5.75 \times 10^{12}\,\mathrm{m/s^2}$, the same factor $5.86 \times 10^{11}$ above $g$ that the force was above the weight.

The radius is proportional to $v$ and inversely proportional to $B$. Doubling the speed at fixed field doubles $R$ and leaves $\omega$ unchanged. Doubling the field at fixed speed halves $R$ and doubles $\omega$.
:::
:::

::: example A helix at thirty degrees {#ex-helix}
The same proton, with $v = 3.00 \times 10^{5}\,\mathrm{m/s}$ and $B = 0.200\,\mathrm{T}$, now has its velocity at $30^{\circ}$ to the field. Find the radius and the pitch of the helix.
::: solution
The perpendicular and parallel speeds are

$$
v_{\perp} = v\sin 30^{\circ} = 1.50 \times 10^{5}\,\mathrm{m/s}, \qquad v_{\parallel} = v\cos 30^{\circ} = 2.59808 \times 10^{5}\,\mathrm{m/s}.
$$

To three significant figures $v_{\parallel} = 2.60 \times 10^{5}\,\mathrm{m/s}$. [[#cor-helix]] gives a radius equal to half the radius of [[#ex-proton]], because $v_{\perp}$ is half of $v$ and the angle of [[#ex-proton]] was a right angle:

$$
R = \frac{m_{\mathrm{p}} v_{\perp}}{e B} = 7.82976 \times 10^{-3}\,\mathrm{m} = 7.83 \times 10^{-3}\,\mathrm{m}.
$$

The period depends only on $e$, $B$ and $m_{\mathrm{p}}$, so it is still $T = 3.27972 \times 10^{-7}\,\mathrm{s}$. The pitch is

$$
p = v_{\parallel} T = (2.59808 \times 10^{5})(3.27972 \times 10^{-7}) = 8.5210 \times 10^{-2}\,\mathrm{m},
$$

or $8.52 \times 10^{-2}\,\mathrm{m}$ to three significant figures. Each turn advances about $8.5\,\mathrm{cm}$ along the field while the proton circles at a radius of about $7.8\,\mathrm{mm}$. The cyclotron frequency is unchanged by the tilt. Only $v_{\perp}$ entered the radius, and only $v_{\parallel}$ entered the pitch.
:::
:::

::: widget parametric
fx: cos(t)
fy: sin(t)
t: 0, 2pi
caption: The curve is the orbit of a charge whose velocity is perpendicular to a uniform magnetic field: a circle, traversed at constant speed. The velocity arrow stays tangent to the path, which is the geometric content of the force being perpendicular to the velocity. The figure draws that circle; it does not contain the value of $B$. What $B$ changes, together with the mass, the charge and the speed, is the radius of the circle and how fast the point goes round it. A parallel component of velocity would stretch this circle into the helix of [[#cor-helix]], which this plot does not show.
:::

::: intuition Faster means wider, not quicker
On a circular orbit the magnetic force is $qvB$ and the required centripetal force is $mv^2/R$. A faster particle needs a stronger centripetal force, proportional to $v^2$, but the magnetic force grows only as $v$. The radius must grow in proportion to $v$ so that the two still match. The extra length of the path uses up exactly the extra speed, and the time per revolution stays put. Heavier particles and weaker fields both lengthen that time, in proportion to $m/(\abs{q} B)$.
:::

A velocity selector uses the electric and magnetic forces together. Suppose $\mathbf{E}$, $\mathbf{B}$ and the intended velocity are mutually perpendicular, with $q\mathbf{E}$ and $q\mathbf{v}\times\mathbf{B}$ opposite. The net force vanishes when $qE = \abs{q}\, v B$, so

$$
v = \frac{E}{B},
$$ {#eq-selector}

independent of the charge and of the mass. Particles of that speed go straight. Slower positive particles are deflected toward the side the electric force points; faster ones are deflected toward the side the magnetic force points. A slit downstream of the region keeps only the undeflected beam.

::: example Crossed fields {#ex-selector}
A region has a uniform electric field of magnitude $6.00 \times 10^{4}\,\mathrm{V/m}$ and a uniform magnetic field of $0.200\,\mathrm{T}$, perpendicular to each other and to the beam. What speed passes through undeflected? Compare it with the proton of [[#ex-proton]].
::: solution
[[#eq-selector]] gives $v = E/B = (6.00 \times 10^{4})/0.200 = 3.00 \times 10^{5}\,\mathrm{m/s}$. That is the speed of the proton in [[#ex-proton]]. In the selector the electric force has magnitude $eE = 9.61 \times 10^{-15}\,\mathrm{N}$, the same as $e v B$ at this speed, and the two forces are arranged to cancel. Downstream of the selector, in a region with the same $\mathbf{B}$ and with $\mathbf{E} = \mathbf{0}$, that proton would settle onto the circle of radius $1.57 \times 10^{-2}\,\mathrm{m}$ already computed. A proton at a different speed would have been removed by the slit, so the magnetic orbit that follows is not a mixture of radii.
:::
:::

::: quiz
A proton moves perpendicular to a uniform magnetic field, with no electric field. If its speed is doubled and the field is left unchanged, the orbit
- [ ] keeps the same radius and doubles its frequency
- [ ] doubles its radius and doubles its frequency
- [x] doubles its radius and keeps the same frequency
- [ ] halves its radius, because the force is stronger at higher speed
::: solution
[[#eq-radius]] is proportional to $v$, so the radius doubles. [[#eq-cyclotron]] does not contain $v$, so $\omega$ is unchanged. The magnetic force does grow in proportion to $v$, but the centripetal requirement grows in proportion to $v^2/R$, and the larger radius restores the balance at the original angular frequency. The speed itself is not changed by the field, by [[#prop-nowork]]; the doubling in the question is done by something else, before the proton enters the uniform region.
:::
:::

## The force on a current-carrying wire

A wire is a stream of charges constrained to follow the metal. Each charge feels [[#eq-lorentz]]. The wire, being what constrains them, feels the summed force.

::: theorem Force on a straight wire {#thm-wire}
A straight wire carrying current $I$ along a vector $\mathbf{L}$, from the tail of $\mathbf{L}$ to its head in the direction of the current, in a uniform magnetic field $\mathbf{B}$, feels the force

$$
\mathbf{F} = I\mathbf{L}\times\mathbf{B}.
$$ {#eq-wire}

The magnitude is $F = ILB\sin\theta$, where $\theta$ is the angle between the wire and the field. The direction is the right-hand rule applied to $I$ and $\mathbf{B}$: fingers along the current, curled toward $\mathbf{B}$, thumb along $\mathbf{F}$. More generally, for a thin wire in a field that may vary along it,

$$
\mathbf{F} = I\int \dd\mathbf{l}\times\mathbf{B},
$$ {#eq-wire-int}

with $\dd\mathbf{l}$ along the current.
:::

::: proof
Consider a small segment $\dd\mathbf{l}$ of the wire. In a time $\mathrm{d}t$ the charge that passes a point of the segment is $\mathrm{d}q = I\,\mathrm{d}t$. Those carriers have drift velocity along the wire. If the segment is the displacement the carriers travel, $\mathbf{v}_{\mathrm{d}}\,\mathrm{d}t = \dd\mathbf{l}$, then the magnetic force on $\mathrm{d}q$ is

$$
\mathrm{d}\mathbf{F} = \mathrm{d}q\, \mathbf{v}_{\mathrm{d}}\times\mathbf{B} = I\,\mathrm{d}t\, \mathbf{v}_{\mathrm{d}}\times\mathbf{B} = I\,\dd\mathbf{l}\times\mathbf{B}.
$$

That is the integrand of [[#eq-wire-int]]. The step $\mathrm{d}q\, \mathbf{v}_{\mathrm{d}} = I\,\dd\mathbf{l}$ is why the macroscopic force depends on the current and the shape of the wire, and not on the drift speed or the density of carriers separately: a slower drift with more carriers, at the same current, gives the same force. For a straight wire in a uniform field, $\mathbf{B}$ factors out of the integral and $\int\dd\mathbf{l} = \mathbf{L}$, which is [[#eq-wire]].

This $\mathbf{F}$ is the force on the wire as a mechanical object. It is transmitted from the carriers to the lattice by the forces that keep the carriers inside the metal. [[#prop-nowork]] still applies to each carrier's drift velocity. The warning of this chapter is the reason a moving wire can nevertheless have mechanical work done on it.
:::

The integral [[#eq-wire-int]] also shows that a closed loop in a uniform field feels no net force. For constant $\mathbf{B}$,

$$
\mathbf{F} = I\left(\oint \dd\mathbf{l}\right)\times\mathbf{B} = \mathbf{0},
$$

because the vector sum of the sides of any closed polygon is zero. A uniform field can twist a loop, as the next section shows, but it cannot push the loop bodily one way. A non-uniform field can do both.

::: example A wire perpendicular to the field {#ex-wire}
A straight wire of length $0.400\,\mathrm{m}$ carries $5.00\,\mathrm{A}$ in the positive $x$-direction. The uniform field is $0.200\,\mathrm{T}$ in the positive $y$-direction. Find the force on the wire.
::: solution
Here $\mathbf{L}$ and $\mathbf{B}$ are perpendicular, so $\sin\theta = 1$ and the magnitude in [[#eq-wire]] is

$$
F = ILB = (5.00)(0.400)(0.200) = 0.400\,\mathrm{N}.
$$

The direction is $\hat{\mathbf{x}}\times\hat{\mathbf{y}} = \hat{\mathbf{z}}$, so the force is $0.400\,\mathrm{N}$ in the positive $z$-direction. If the field is turned until it makes an angle of $30^{\circ}$ with the wire, the magnitude becomes $ILB\sin 30^{\circ} = 0.200\,\mathrm{N}$, and the direction is still perpendicular to the plane that contains the wire and the field, fixed by the right-hand rule rather than by the angle.
:::
:::

A wire parallel to $\mathbf{B}$ feels nothing, just as a charge moving along $\mathbf{B}$ feels nothing. That is the configuration of a lead running parallel to a uniform field in a magnet gap: the current is large and the force is zero because $\sin\theta = 0$, not because the field has been switched off.

## Torque on a loop

Net force zero does not mean nothing happens. A couple, two equal and opposite forces on different lines of action, has no net force and a nonzero torque. A current loop in a uniform field is a couple of that kind.

::: definition Magnetic moment {#def-moment}
A plane loop carrying current $I$ and enclosing a flat area $A$ has **magnetic moment**

$$
\boldsymbol{\mu} = I\mathbf{A},
$$ {#eq-moment}

where the vector $\mathbf{A}$ has magnitude $A$ and direction given by the right-hand rule: fingers curl with the current, and the thumb is the direction of $\mathbf{A}$. For a coil of $N$ tightly wound turns, $\boldsymbol{\mu} = N I \mathbf{A}$. The SI unit is $\mathrm{A\cdot m^2}$, which is the same as $\mathrm{J/T}$.
:::

The equivalence of the units is the torque law below. Torque has the unit $\mathrm{N\cdot m} = \mathrm{J}$, and $\tau = \mu B$ then forces $\mu$ to have the unit $\mathrm{J/T}$. Since $1\,\mathrm{T} = 1\,\mathrm{N}/(\mathrm{A\cdot m})$, one joule per tesla is one ampere square metre.

::: theorem Torque on a rectangular loop {#thm-torque}
A rectangular loop of sides $a$ and $b$, carrying current $I$, sits in a uniform field $\mathbf{B}$. Let $\theta$ be the angle between the magnetic moment and $\mathbf{B}$. The net force on the loop is zero, and the torque about the centre is

$$
\boldsymbol{\tau} = \boldsymbol{\mu}\times\mathbf{B},
$$ {#eq-torque}

with $\mu = Iab$. The magnitude is $\tau = \mu B\sin\theta$. For $N$ turns, $\mu = NIab$. The torque is zero when $\boldsymbol{\mu}$ is parallel or antiparallel to $\mathbf{B}$, and it is greatest when $\boldsymbol{\mu}$ is perpendicular to $\mathbf{B}$. Its sense turns $\boldsymbol{\mu}$ toward $\mathbf{B}$.
:::

::: proof
Place $\mathbf{B}$ along the positive $x$-axis and take the axis through the centre of the rectangle parallel to the sides of length $a$ as the $z$-axis. The angle $\theta$ is the angle between the normal to the loop and $\mathbf{B}$. In this arrangement the sides of length $a$ stay parallel to $z$ for every $\theta$, and $\mathbf{B}$ stays perpendicular to those sides. Each of them therefore feels a force of magnitude

$$
F = IaB,
$$

by [[#eq-wire]] with $\sin\theta_{\mathrm{wire}} = 1$. The currents in the two sides are opposite, so the forces are equal and opposite. The net force from this pair vanishes.

The forces do not share a line of action. Each acts at a perpendicular distance $(b/2)\sin\theta$ from the centre. This moment arm is $b/2$ when $\theta = 90^{\circ}$, the loop being edge-on to the field so that the two forces stand as far apart as the width allows, and it is zero when $\theta = 0$, the forces then lying in the plane of the loop along the line from the centre to each side. The two contributions add, and the magnitude of the torque is

$$
\tau = 2 \times (IaB) \times \left(\frac{b}{2}\sin\theta\right) = Iab\, B\sin\theta = \mu B\sin\theta.
$$

The sides of length $b$ carry opposite currents in a uniform field, so they too feel equal and opposite forces. Those forces are parallel to the $z$-axis: they stretch or compress the rectangle along its height, their lines of action give no torque about the centre, and they contribute nothing to the couple. The net force on the whole loop is zero.

The direction is fixed by requiring that the torque decrease the angle between $\boldsymbol{\mu}$ and $\mathbf{B}$. That is the vector $\boldsymbol{\mu}\times\mathbf{B}$: its magnitude is $\mu B\sin\theta$, and the right-hand rule about that vector rotates $\boldsymbol{\mu}$ toward $\mathbf{B}$. Alignment, $\theta = 0$, is a stable equilibrium. Antialignment, $\theta = 180^{\circ}$, is an equilibrium because $\sin\theta = 0$, and it is unstable because a small tilt produces a torque that increases the tilt.
:::

The same torque $\boldsymbol{\mu}\times\mathbf{B}$ holds for a plane loop that is not a rectangle. The proof above uses the rectangle because the forces and the moment arm can be named. The general case is the same couple written as an integral; the result is still $\boldsymbol{\mu}\times\mathbf{B}$ with $\boldsymbol{\mu} = I\mathbf{A}$, and a coil of $N$ turns multiplies it by $N$. A compass needle is a permanent moment of this kind. It points along the local field because that is where the torque vanishes and is stable.

There is an orientational potential whose slope is this torque. It has to be read with the warning of the chapter still in force.

::: corollary Orientational potential of a moment {#cor-potential}
The torque [[#eq-torque]] is reproduced by the potential energy

$$
U(\theta) = -\boldsymbol{\mu}\cdot\mathbf{B} = -\mu B\cos\theta,
$$ {#eq-upot}

in the sense that the component of torque along the axis of increasing $\theta$ is $-\mathrm{d}U/\mathrm{d}\theta$. For a loop held at constant current, the work required to turn it quasistatically from $\theta_1$ to $\theta_2$ is $U(\theta_2) - U(\theta_1)$, and that energy is exchanged with the agency that keeps the current constant. It is not work done by $\mathbf{B}$ on the drifting charges.
:::

::: proof
Differentiate [[#eq-upot]]: $\mathrm{d}U/\mathrm{d}\theta = \mu B\sin\theta$, so $-\mathrm{d}U/\mathrm{d}\theta = -\mu B\sin\theta$. With $\theta$ measured from the direction of $\mathbf{B}$, the aligning torque of [[#thm-torque]] is exactly that component: it is negative when $\sin\theta > 0$, which means it decreases $\theta$. An external agent that turns the loop quasistatically, so that the kinetic energy does not change, must apply the opposite torque $+\mu B\sin\theta$. Its work from $\theta_1$ to $\theta_2$ is

$$
W_{\mathrm{ext}} = \int_{\theta_1}^{\theta_2} \mu B\sin\theta\,\mathrm{d}\theta = \mu B(\cos\theta_1 - \cos\theta_2) = U(\theta_2) - U(\theta_1).
$$

If the current is held fixed while the loop turns in the field, the flux through the loop changes. Keeping the current fixed against the induced electric field costs energy at the battery, or returns energy to it. That exchange is the content of [[magnetism/faraday]] and is the source, or the sink, of $W_{\mathrm{ext}}$. [[#prop-nowork]] is untouched: at each instant $\mathbf{F}_{\mathrm{m}}$ on a carrier is perpendicular to the carrier's velocity, and the potential [[#eq-upot]] is a bookkeeping of the couple, not a claim that $\mathbf{B}$ has done work on those carriers.
:::

The zero of $U$ is at $\theta = 90^{\circ}$, where the moment is broadside to the field. Alignment is lower than that zero by $\mu B$. Antialignment is higher by $\mu B$. Turning a moment from alignment to antialignment, at constant current, costs $2\mu B$ of work at the external agent and the battery together.

::: example Torque on a single rectangle {#ex-torque}
A single rectangular turn has sides $0.200\,\mathrm{m}$ and $0.100\,\mathrm{m}$ and carries $5.00\,\mathrm{A}$ in a uniform field of $0.300\,\mathrm{T}$. Find the magnetic moment, the torque when the normal is perpendicular to the field, and the torque when $\theta = 60^{\circ}$. Find the work required to turn the loop quasistatically from alignment to antialignment at constant current.
::: solution
The area is $A = 0.200 \times 0.100 = 0.0200\,\mathrm{m^2}$, so $\mu = IA = 5.00 \times 0.0200 = 0.100\,\mathrm{A\cdot m^2}$. At $\theta = 90^{\circ}$, [[#eq-torque]] gives

$$
\tau = \mu B\sin 90^{\circ} = (0.100)(0.300)(1) = 0.0300\,\mathrm{N\cdot m}.
$$

At $\theta = 60^{\circ}$, $\sin 60^{\circ} = \sqrt{3}/2$, so $\tau = 0.0300 \times \sqrt{3}/2 = 0.0260\,\mathrm{N\cdot m}$ to three significant figures. The torque is smaller because the moment arm has shrunk, not because the forces on the axial sides have shrunk: those forces are still $IaB$ each. From $\theta = 0$ to $\theta = 180^{\circ}$, [[#eq-upot]] changes by

$$
\Delta U = -\mu B\cos 180^{\circ} - (-\mu B\cos 0^{\circ}) = \mu B + \mu B = 2(0.100)(0.300) = 0.0600\,\mathrm{J}.
$$

That is the work the external agent and the current source exchange in a slow half-turn. It is not a change in the kinetic energy of the carriers.
:::
:::

A motor keeps this torque turning the same way. A commutator reverses the current each half-turn, so the moment is never left to settle at alignment. The battery supplies what the shaft delivers, apart from heating in the windings. By [[#prop-nowork]] the shaft does not receive that energy from $\mathbf{B}$.

## Where this leads

Everything in this chapter treated $\mathbf{B}$ as given. A long straight wire, a loop and a solenoid produce fields that can be calculated from the current, by the Biot–Savart law and by Ampère's law, in [[magnetism/biot-savart]]. Once a conductor moves in a field, or the field through a loop changes, the charges in the conductor feel an electric force from the induced field, and the loop rule of a direct-current circuit acquires an extra term. That is [[magnetism/faraday]], and it is where the energy sentences of this chapter are completed. The force on a moving charge remains [[#eq-lorentz]] throughout.

::: history From the compass to the force on a charge
In 1820 Hans Christian Ørsted observed that a current deflects a compass needle. The observation was the first experimental link between electricity and magnetism, and it showed that a current, not a permanent magnet, could be the source of the deflection. Through the rest of the nineteenth century the force between currents, and then the force on a moving charge, was sharpened by Ampère, by Biot and Savart, and by the electron theories of the 1890s. Hendrik Lorentz's *The Theory of Electrons* of 1909 sets out the force law in the form used in this chapter. The force itself is earlier than that book. The right-hand rule is a convention tied to the cross product, not a second physical law: the opposite convention would reverse the sign of $\mathbf{B}$ everywhere and leave the forces the same.
:::

::: summary
- The Lorentz force is $\mathbf{F} = q(\mathbf{E} + \mathbf{v}\times\mathbf{B})$. The magnetic magnitude is $\abs{q} v B\sin\theta$, and the direction follows the right-hand rule together with the sign of $q$.
- The magnetic force does no work on a free charge. Speed is constant in a purely magnetic field. A wire can still gain kinetic energy, because the carriers are constrained and the battery supplies the energy.
- Perpendicular motion in a uniform field is a circle of radius $R = mv/(\abs{q} B)$, at angular frequency $\omega = \abs{q} B/m$, independent of speed.
- A parallel component of velocity is constant and stretches the circle into a helix of pitch $v_{\parallel} T$.
- Crossed uniform fields pass the single speed $v = E/B$ undeflected.
- A straight wire feels $\mathbf{F} = I\mathbf{L}\times\mathbf{B}$. A closed loop in a uniform field feels no net force.
- A plane loop has moment $\boldsymbol{\mu} = I\mathbf{A}$, or $NI\mathbf{A}$ for $N$ turns. The torque is $\boldsymbol{\mu}\times\mathbf{B}$, and $U = -\boldsymbol{\mu}\cdot\mathbf{B}$ reproduces it. The energy of a slow turn at constant current is exchanged with the current source.
:::

## Exercises

::: exercise Force on a perpendicular wire {#exr-wire level=1 check="0.7"}
A straight wire of length $0.250\,\mathrm{m}$ carries $8.00\,\mathrm{A}$ perpendicular to a uniform field of $0.350\,\mathrm{T}$. Find the magnitude of the force on the wire, in newtons.
::: solution
[[#eq-wire]] with $\sin\theta = 1$ gives $F = ILB = (8.00)(0.250)(0.350) = 0.700\,\mathrm{N}$. The direction is perpendicular to both the wire and the field, fixed by the right-hand rule once those two directions are chosen. The magnitude does not need them.
:::
:::

::: exercise The same wire at an angle {#exr-angle level=1 check="0.35"}
The wire of the previous exercise is turned until the angle between the current and the field is $30^{\circ}$. The current and the field magnitude are unchanged. Find the magnitude of the force, in newtons.
::: solution
The factor $\sin\theta$ in [[#eq-wire]] changes from $1$ to $\sin 30^{\circ} = 1/2$. The force magnitude is half of $0.700\,\mathrm{N}$, so $F = 0.350\,\mathrm{N}$. The direction is still perpendicular to the plane containing the wire and $\mathbf{B}$. It is not along the field, and it is not along the wire.
:::
:::

::: exercise Torque at right angles {#exr-tau90 level=1 check="0.04"}
A single-turn plane loop of area $0.0500\,\mathrm{m^2}$ carries $2.00\,\mathrm{A}$. A uniform field of $0.400\,\mathrm{T}$ is perpendicular to the magnetic moment. Find the magnitude of the torque, in newton metres.
::: solution
The moment has magnitude $\mu = IA = (2.00)(0.0500) = 0.100\,\mathrm{A\cdot m^2}$. At $\theta = 90^{\circ}$, [[#eq-torque]] gives $\tau = \mu B = (0.100)(0.400) = 0.0400\,\mathrm{N\cdot m}$. The net force is zero because the field is uniform. The torque is not zero, because $\theta$ is not zero.
:::
:::

::: exercise Undeflected speed {#exr-selector level=2 check="200000"}
Crossed uniform fields have $E = 4.00 \times 10^{3}\,\mathrm{V/m}$ and $B = 2.00 \times 10^{-2}\,\mathrm{T}$, both perpendicular to a beam. Find the speed, in metres per second, of the particles that pass undeflected.
::: solution
[[#eq-selector]] gives $v = E/B = (4.00 \times 10^{3})/(2.00 \times 10^{-2}) = 2.00 \times 10^{5}\,\mathrm{m/s}$. The charge and the mass do not enter. A positive particle slower than this is deflected in the direction of $\mathbf{E}$; a faster one is deflected in the direction of $\mathbf{v}\times\mathbf{B}$. The slit that defines the selector is what turns that fact into a single output speed.
:::
:::

::: exercise A coil at thirty degrees {#exr-coil level=2 check="0.02"}
A coil of $50$ turns has a rectangular area $0.100\,\mathrm{m}$ by $0.0500\,\mathrm{m}$ and carries $0.800\,\mathrm{A}$. The uniform field is $0.200\,\mathrm{T}$, and the angle between the magnetic moment and the field is $30^{\circ}$. Find the magnitude of the torque, in newton metres.
::: solution
The area of one turn is $0.100 \times 0.0500 = 5.00 \times 10^{-3}\,\mathrm{m^2}$. The moment of the coil is

$$
\mu = NIA = (50)(0.800)(5.00 \times 10^{-3}) = 0.200\,\mathrm{A\cdot m^2}.
$$

[[#eq-torque]] at $\theta = 30^{\circ}$ gives $\tau = \mu B\sin 30^{\circ} = (0.200)(0.200)(1/2) = 0.0200\,\mathrm{N\cdot m}$. At $\theta = 90^{\circ}$ the same coil would feel $0.0400\,\mathrm{N\cdot m}$. The forces on the wires have not been halved; the moment arm has.
:::
:::

::: exercise Scaling an orbit {#exr-scale level=2 check="4.71"}
A proton orbit perpendicular to a uniform field has radius $1.57\,\mathrm{cm}$. The speed is tripled and the field is left unchanged. Find the new radius, in centimetres.
::: solution
[[#eq-radius]] is proportional to $v$ at fixed mass, charge and field. Tripling $v$ triples $R$, so the new radius is $3 \times 1.57\,\mathrm{cm} = 4.71\,\mathrm{cm}$. The cyclotron frequency does not change, because [[#eq-cyclotron]] does not contain $v$. The period is the same and the circumference is three times as large, which is consistent with a speed three times as large. The given $1.57\,\mathrm{cm}$ is the radius to be scaled; the exercise does not ask for a fresh evaluation of $mv/(eB)$.
:::
:::

::: exercise Kinetic energy in a magnetic field {#exr-nowork level=3}
A particle of charge $q$ and mass $m$ moves under the Lorentz force in a magnetic field $\mathbf{B}(\mathbf{r}, t)$ that need not be uniform, with no electric field and no other forces. Prove that the kinetic energy is constant. Then explain how a conducting bar, free to slide on rails in a magnetic field and carrying a current, can gain kinetic energy without contradicting the proof.
::: hint
Compute $\mathrm{d}K/\mathrm{d}t$ from $K = \tfrac12 mv^2$ and substitute Newton's second law. For the bar, separate the force on a carrier from the force on the lattice, and name the source of the energy.
:::
::: solution
The kinetic energy of a particle of constant mass has derivative $\mathrm{d}K/\mathrm{d}t = m\mathbf{v}\cdot\mathbf{a} = \mathbf{F}\cdot\mathbf{v}$. With $\mathbf{F} = q\mathbf{v}\times\mathbf{B}$, the triple product $(\mathbf{v}\times\mathbf{B})\cdot\mathbf{v}$ is zero whatever $\mathbf{B}$ is, including a field that depends on position and time. Hence $\mathrm{d}K/\mathrm{d}t = 0$. Uniformity was never used, and neither was the circular-orbit solution. The speed is constant along the trajectory. The direction need not be.

A sliding bar is not a free particle. The carriers drift along the bar and also move with the bar if the bar moves. The magnetic force on a carrier is still perpendicular to that carrier's total velocity, so it does no work on the carrier. Part of the force is perpendicular to the drift and is delivered to the lattice through the constraint that keeps the carrier in the metal. The lattice, and therefore the bar, can gain kinetic energy from that constraint force. The energy balance is closed by the battery that maintains the current: when the bar moves, the flux through the circuit changes, an induced electric field appears, and the battery does work against it. That induced field is [[magnetism/faraday]]. Saying that $\mathbf{B}$ did work on the drifting charges would contradict the first half of this exercise, and it is not the right description of the bar either.
:::
:::

::: exercise Drift in crossed fields {#exr-drift level=3 check="300000"}
A uniform electric field $\mathbf{E}$ points along the positive $y$-axis and a uniform magnetic field $\mathbf{B}$ points along the positive $z$-axis. A particle of charge $q > 0$ and mass $m$ moves in the $xy$-plane. Show that the motion is a uniform drift at velocity $(E/B)$ in the positive $x$-direction, superimposed on circular motion at the cyclotron frequency $\omega = qB/m$. For $E = 6.00 \times 10^{4}\,\mathrm{V/m}$ and $B = 0.200\,\mathrm{T}$, find the drift speed, in metres per second.
::: hint
Write the two components of $m\mathbf{a} = q(\mathbf{E} + \mathbf{v}\times\mathbf{B})$. Set $v_x = u_x + E/B$, and show that $u_x$ and $v_y$ satisfy the harmonic equation at angular frequency $qB/m$.
:::
::: solution
With $\mathbf{E} = E\hat{\mathbf{y}}$ and $\mathbf{B} = B\hat{\mathbf{z}}$,

$$
\mathbf{v}\times\mathbf{B} = B v_y\, \hat{\mathbf{x}} - B v_x\, \hat{\mathbf{y}}.
$$

Newton's second law with the Lorentz force gives

$$
m\frac{\mathrm{d}v_x}{\mathrm{d}t} = q B v_y, \qquad m\frac{\mathrm{d}v_y}{\mathrm{d}t} = q(E - B v_x).
$$

Set $v_x = u_x + E/B$, so that $u_x$ is the part of the horizontal velocity beyond the drift. Then $\mathrm{d}v_x/\mathrm{d}t = \mathrm{d}u_x/\mathrm{d}t$, and the second equation becomes $m\,\mathrm{d}v_y/\mathrm{d}t = -q B u_x$. Differentiate the first equation and substitute:

$$
m\frac{\mathrm{d}^2 u_x}{\mathrm{d}t^2} = q B \frac{\mathrm{d}v_y}{\mathrm{d}t} = q B\left(-\frac{q B}{m} u_x\right) = -m\left(\frac{q B}{m}\right)^2 u_x.
$$

Thus $u_x$ oscillates at $\omega = qB/m$, and $v_y$ oscillates at the same frequency because $m\,\mathrm{d}v_y/\mathrm{d}t = -q B u_x$. The added constant $E/B$ is a uniform velocity in the positive $x$-direction. In the frame that drifts at that velocity the electric and magnetic forces of a charge at rest cancel, and what remains is the circular motion of [[#thm-cyclotron]]. The drift speed for the stated fields is

$$
\frac{E}{B} = \frac{6.00 \times 10^{4}}{0.200} = 3.00 \times 10^{5}\,\mathrm{m/s}.
$$

The radius of the circular part depends on how the particle was launched. The drift does not.
:::
:::
