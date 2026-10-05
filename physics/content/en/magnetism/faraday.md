A steady current produces a steady magnetic field, and a steady magnetic field does not, in return, produce a current. Faraday's question was sharper than a simple reversal of [[magnetism/biot-savart]]. He asked whether a *changing* magnetic field could drive a current in a circuit that contained no battery. It can. The current lasts only while the magnetic environment of the circuit is changing, and its direction is fixed by a rule that protects the energy account.

This chapter states that rule as Faraday's law, reads the minus sign as Lenz's law, and derives the motional emf in a rod sliding on rails twice: once from the Lorentz force on charges in the rod, and once from the rate of change of flux. The two derivations agree. The same flux rule then supplies the electric field that curls around a changing magnetic field even where there is no wire at all. That field is not conservative, which is why a potential of the sort built in [[electrostatics/potential]] cannot describe it, and why the loop rule of [[electrostatics/dc-circuits]] needs an extra term.

## Magnetic flux

The quantity that changes is not $\vec{B}$ at a single point. It is the flux of $\vec{B}$ through a surface.

::: definition Magnetic flux {#def-flux}
The magnetic flux through a surface $S$ is

$$
\Phi_B = \int_S \vec{B}\cdot\dd\vec{A}.
$$ {#eq-flux}

The vector $\dd\vec{A}$ is normal to the surface, with magnitude equal to the area of the patch. Its sign is chosen by the right-hand rule from the sense in which we agree to walk around the boundary of $S$: fingers walking that way, thumb along the positive normal. The SI unit of flux is the weber, $1\,\mathrm{Wb} = 1\,\mathrm{T\,m^2}$.
:::

For a uniform field and a flat surface of area $A$ whose normal makes an angle $\theta$ with $\vec{B}$,

$$
\Phi_B = BA\cos\theta.
$$ {#eq-flux-uniform}

The flux is largest when $\vec{B}$ is along the normal and zero when $\vec{B}$ lies in the surface. Reversing the normal reverses the sign of $\Phi_B$. That sign is not decorative. Faraday's law equates a signed rate of change of flux to a signed emf around the same boundary, and the two signs are locked together by the same right-hand rule. If you flip the normal and also flip the positive sense of the walk around the boundary, both sides of the law change sign and the physics is unchanged.

A closed surface is a special case. Field lines of $\vec{B}$ do not end, so every line that enters a closed surface leaves it. The net flux through any closed surface is zero. We used that fact for the solenoid in [[magnetism/biot-savart]], and it remains available here: you cannot trap a net outward flux of $\vec{B}$ inside a balloon. What you can do is change the flux through an *open* surface, by moving the boundary, by changing $\vec{B}$, or by turning the surface relative to $\vec{B}$. Induction is about that change.

If both the magnitude of a uniform perpendicular field and the area of a flat circuit are changing, the product rule applies to [[#eq-flux-uniform]] with $\cos\theta = 1$:

$$
\deriv{\Phi_B}{t} = B\deriv{A}{t} + A\deriv{B}{t}.
$$ {#eq-product}

Neither term is optional when both are present. A rod that slides so as to enlarge a circuit, while the applied field is itself falling, has an emf equal to the sum of the two contributions, with their signs.

## Faraday's law

The emf around a closed curve $C$ is the work per unit charge done by the force that pushes charges along $C$. If $\vec{F}$ is the force on a charge $q$,

$$
\mathcal{E} = \oint_C \frac{\vec{F}}{q}\cdot\dd\vec{l}.
$$ {#eq-emf-def}

For a stationary wire the force is $q\vec{E}$ and the emf is the circulation of $\vec{E}$. For a wire moving in a magnetic field the magnetic part of the Lorentz force contributes as well. In either case, if the curve is a conducting loop of resistance $R$, the induced current is $I = \mathcal{E}/R$, with $R$ the total resistance of the path. This is Ohm's law from [[electrostatics/current]] applied to the induced emf. It assumes the resistance is the only opposition. A coil with significant self-inductance needs the extra term developed in [[magnetism/inductance]]; we leave that term out until the chapter on inductance, except for one remark on the total charge below.

::: theorem Faraday's law {#thm-faraday}
Let $C$ be a closed curve, the boundary of a surface $S$, with the positive sense of $C$ and the positive normal on $S$ tied together by the right-hand rule. Then

$$
\mathcal{E} = \oint_C \frac{\vec{F}}{q}\cdot\dd\vec{l} = -\deriv{\Phi_B}{t},
$$ {#eq-faraday}

where $\Phi_B$ is the magnetic flux through $S$. Over a finite interval the average emf is

$$
\mathcal{E}_{\mathrm{avg}} = -\frac{\Delta\Phi_B}{\Delta t}.
$$ {#eq-faraday-avg}
:::

The law is the experimental content of induction, not a theorem deduced from Coulomb's law. What we prove in this chapter is that, for a rod sliding on stationary rails in a static field, the Lorentz force gives the same emf as [[#eq-faraday]]. The general case, including a stationary loop in a time-dependent field, is taken as the law. The minus sign is part of the law. It is not inserted afterwards for bookkeeping. Its reading is Lenz's law, in the next section.

One consequence is used often enough to be stated on its own. It says that the total charge which passes around a resistive loop depends on how much the flux changes, not on how quickly.

::: proposition Charge driven around a resistive loop {#prop-charge}
Suppose a single loop of resistance $R$ has its flux changed by $\Delta\Phi_B$, and the current is zero both before and after the change. The charge that passes any cross-section of the loop during the change has magnitude

$$
\abs{\Delta Q} = \frac{\abs{\Delta\Phi_B}}{R}.
$$ {#eq-charge}

The result does not depend on $\Delta t$.
:::

::: proof
While the current is flowing, $I = \mathcal{E}/R$ if self-inductance is neglected, and $\mathcal{E} = -\dd\Phi_B/\dd t$, so

$$
I\,\dd t = -\frac{1}{R}\,\dd\Phi_B.
$$

Integrate through the change. The charge that passes is $\Delta Q = \int I\,\dd t$, and the right-hand side is $-\Delta\Phi_B/R$. The duration cancels. The magnitude statement is [[#eq-charge]].

If the loop has self-inductance $L$ and the circuit equation is $\mathcal{E} = RI + L\,\dd I/\dd t$, integrate anyway:

$$
\int\mathcal{E}\,\dd t = R\Delta Q + L\,\Delta I.
$$

The left-hand side is still $-\Delta\Phi_B$. Whenever the current starts at zero and ends at zero, $\Delta I = 0$, and $\Delta Q = -\Delta\Phi_B/R$ survives the inductance. The inductance changes the duration and the peak current. It does not change the total charge, under that start-and-end condition. A current that is left running after the flux has settled is a different problem, and then the $L\,\Delta I$ term remains.
:::

::: example A field switched off {#ex-collapse}
A loop of area $0.0300\,\mathrm{m^2}$ sits in a uniform field perpendicular to its plane. The field drops from $0.500\,\mathrm{T}$ to zero in $0.200\,\mathrm{s}$. The resistance of the loop is $0.250\,\Omega$. Find the average magnitude of the induced emf, the average current, and the charge that passes around the loop.
::: solution
Take the initial normal along $\vec{B}$, so the initial flux is positive:

$$
\Phi_i = BA = (0.500)(0.0300) = 0.0150\,\mathrm{Wb}, \qquad \Phi_f = 0.
$$

The change is $\Delta\Phi_B = -0.0150\,\mathrm{Wb}$. [[#eq-faraday-avg]] gives

$$
\mathcal{E}_{\mathrm{avg}} = -\frac{-0.0150}{0.200} = +0.0750\,\mathrm{V}
$$

in the positive sense fixed by that normal, and the average magnitude is $0.0750\,\mathrm{V}$. The average current has magnitude

$$
I_{\mathrm{avg}} = \frac{0.0750}{0.250} = 0.300\,\mathrm{A}.
$$

The charge follows from [[#eq-charge]], or from $I_{\mathrm{avg}}\Delta t$:

$$
\abs{\Delta Q} = \frac{\abs{\Delta\Phi_B}}{R} = \frac{0.0150}{0.250} = 0.0600\,\mathrm{C},
$$

and equally $0.300\times 0.200 = 0.0600\,\mathrm{C}$. The time interval cancels in the charge, which is the content of [[#prop-charge]]. Had the same flux change occupied $0.0200\,\mathrm{s}$ instead of $0.200\,\mathrm{s}$, the average emf and the average current would each have been ten times larger, and the charge would have been the same $0.0600\,\mathrm{C}$, inductance aside.

The direction follows the sign we already chose, or Lenz's law. Flux along the positive normal is decreasing, so the induced current tries to maintain it. The induced current's own field, given by the right-hand grip of [[magnetism/biot-savart]], points along the positive normal. The current walks around the boundary in the positive sense.
:::
:::

## Lenz's law

The minus sign in [[#eq-faraday]] is a physical rule, not a convention one is free to drop.

::: proposition Lenz's law {#prop-lenz}
The induced current in a closed circuit flows in the direction that opposes the *change* in flux through the circuit. If the flux through the positive normal is increasing, the induced current produces its own magnetic field against that normal. If the flux is decreasing, the induced current produces its own field along that normal, trying to maintain the flux. The current opposes the change, not the field.
:::

::: proof
The statement is the minus sign of [[#eq-faraday]] read with the right-hand rule. Choose the positive normal. Then $\Phi_B > 0$ when $\vec{B}$ has a component along that normal. If $\Phi_B$ is increasing, $\dd\Phi_B/\dd t > 0$ and $\mathcal{E} < 0$, so the induced current is opposite to the positive walk around the boundary. The right-hand grip on that opposite walk produces a field against the positive normal, which opposes the increase. If $\Phi_B$ is decreasing, $\dd\Phi_B/\dd t < 0$ and $\mathcal{E} > 0$, and the induced field lies along the positive normal, opposing the decrease.

The same sign is required by energy. Suppose, contrary to the law, that the induced current *aided* the change. A small increase of flux would induce a current whose own field increased the flux further, which would induce more current, with no source supplying the growing magnetic energy and the Joule heat. The observed sign prevents that. When you push a magnet towards a loop, the induced current repels the magnet, and the work your hand does against that repulsion is the energy that appears as heat in the loop. If the magnet is leaving and the flux is falling, the induced current attracts the magnet, so you must pull to remove it, and again you do positive work.
:::

A sentence worth fixing in place: Lenz's law does not say that the induced current always opposes the field. A decreasing field is opposed by an induced current whose field is in the *same* direction as the applied field. Opposing the change means supporting a field that is trying to disappear, and opposing a field that is trying to grow. The two situations give opposite currents.

::: example A decreasing field into the page {#ex-lenz}
A loop lies in the plane of the page. A uniform field points into the page and is decreasing in magnitude. Which way does the induced current walk?
::: solution
Take the positive normal into the page, along the field, so $\Phi_B > 0$ and decreasing. By [[#prop-lenz]] the induced current must itself produce a field into the page, in order to oppose the decrease. The right-hand grip with the thumb into the page is clockwise on the page. The induced current is clockwise.

If instead the into-the-page field were increasing, the induced current would be anticlockwise, producing a field out of the page. The applied field has the same direction in both stories. The currents are opposite because the changes are opposite. A rule that said "the induced current always opposes the field" would get one of these two cases wrong.
:::
:::

The same reading applies to a bar magnet and a loop, without writing a formula. Field lines emerge from the north face of a magnet, the face the right-hand grip would assign to a loop whose field points that way. As the north face approaches a loop, the flux through the loop in the direction away from the magnet increases. The induced current makes the near face of the loop a north face as well, and like faces repel, which opposes the approach. As the magnet leaves, the flux decreases, the near face of the loop becomes a south face, and the attraction opposes the departure. The force is always such that the agent moving the magnet does positive work while a current is flowing.

## Motional emf

A rod moving through a static magnetic field is the case we can derive, rather than postulate. The flux is changing only because the area of the circuit is changing. The charges in the rod are moving, so the magnetic part of the Lorentz force pushes them along the rod.

Set the geometry with coordinates, so that the page language and the vectors agree. The rails lie in the $xy$-plane, running parallel to the $x$-axis, a distance $L$ apart in the $y$-direction. The rod is parallel to the $y$-axis, at position $x$, and moves with velocity $\vec{v} = v\hat{x}$ with $v > 0$, so the area $A = xL$ of the circuit is increasing. The uniform field is $\vec{B} = -B\hat{z}$ with $B > 0$: into the page if we look down from the positive $z$-axis, with $x$ to the right and $y$ up. The rails and the connector at the left are at rest.

::: theorem Motional emf of a rod on rails {#thm-motional}
In the geometry just stated, with $\vec{B}$, the rod and $\vec{v}$ mutually perpendicular, the emf around the circuit has magnitude

$$
\mathcal{E} = BLv.
$$ {#eq-motional}

The induced current, if the circuit is closed, is anticlockwise when viewed from the positive $z$-axis. The same magnitude and sense follow from [[#eq-faraday]].
:::

::: proof
Consider a charge $q > 0$ in the rod. Its velocity is $\vec{v} = v\hat{x}$ to the accuracy that the drift speed along the rod is negligible compared with $v$. The magnetic force is $q\vec{v}\times\vec{B}$. With $\vec{B} = -B\hat{z}$,

$$
\hat{x}\times(-\hat{z}) = \hat{y},
$$

because $\hat{x}\times\hat{z} = -\hat{y}$. Thus $\vec{v}\times\vec{B} = vB\hat{y}$, and positive charges are driven towards $+y$, up the rod.

In open circuit, charge separates until the electric field $\vec{E}$ of that separation balances the magnetic force: $qE = qvB$, so $E = vB$ along the rod, from the upper end towards the lower end. The potential difference between the ends, which is the emf available to an external circuit, is

$$
\mathcal{E} = EL = BLv.
$$

In a closed circuit of resistance $R$ the current is $I = BLv/R$, and the electric field of the separated charge does not quite cancel $vB$. The net force per charge along the rod, integrated, is still the emf $BLv$. The rails are at rest, so the magnetic force on charges in the rails vanishes at this order. The emf is seated in the moving rod. The stationary parts of the circuit merely let the current close.

Now read the same result from the flux. Take the positive normal in the $-z$ direction, along $\vec{B}$, so $\Phi_B = B\cdot xL = BLx$ and

$$
\deriv{\Phi_B}{t} = BL\deriv{x}{t} = BLv.
$$

[[#eq-faraday]] gives $\mathcal{E} = -BLv$ in the positive sense belonging to that normal. The positive sense, thumb into the page, is clockwise as seen from $+z$. A negative emf is therefore anticlockwise. Positive charges are driven up the rod, which is the anticlockwise walk: up the rod on the right, back along the upper rail, down the connector, and out along the lower rail. This is the same current the Lorentz force produced. The magnitude agrees with [[#eq-motional]].

The magnetic force on the current-carrying rod opposes the motion. The current in the rod is in the $+y$ direction, of magnitude $I$, so the force on the rod is $I\vec{L}\times\vec{B}$ with $\vec{L} = L\hat{y}$:

$$
\hat{y}\times(-\hat{z}) = -\hat{x}, \qquad \vec{F}_{\mathrm{mag}} = -ILB\,\hat{x}.
$$

To keep $v$ constant an external agent must apply $+ILB\,\hat{x}$. The mechanical power it supplies is

$$
P = ILBv = I(BLv) = I\mathcal{E} = I^2 R,
$$ {#eq-power}

since $\mathcal{E} = IR$ for the closed resistive circuit. The power in equals the Joule heating. Lenz's law is the statement that $\vec{F}_{\mathrm{mag}}$ points against $\vec{v}$ rather than along it. If it pointed along $\vec{v}$, the rod would accelerate itself and the heating would be free.
:::

There is a subtlety in the energy account that the power balance does not by itself resolve. The magnetic force on a charge is perpendicular to the charge's *total* velocity, so it does no work on the charge. The resolution is a split of that velocity into the motion of the rod and the drift along the rod. The part $q(\vec{v}_{\mathrm{rod}}\times\vec{B})$ does positive work on the drift. The magnetic force associated with the drift velocity does negative work against the motion of the rod, of equal magnitude, because $q(\vec{v}_{\mathrm{total}}\times\vec{B})\cdot\vec{v}_{\mathrm{total}} = 0$. The external agent, pushing the rod against $\vec{F}_{\mathrm{mag}}$, supplies the energy. The field redirects it into the circuit. It does not create it.

A rigid loop translated in a uniform static field has no emf, even though each side may have a motional contribution. The flux through the loop is not changing, opposite sides give opposite contributions, and they cancel. [[#eq-faraday]] and the Lorentz force agree again: induction tracks the change in flux, not the mere presence of motion or of $\vec{B}$.

::: example The rod at three metres per second {#ex-rails}
In the rail geometry, $B = 0.400\,\mathrm{T}$, $L = 0.200\,\mathrm{m}$ and $v = 3.00\,\mathrm{m/s}$, mutually perpendicular. Find the emf.
::: solution
[[#eq-motional]] gives

$$
\mathcal{E} = BLv = (0.400)(0.200)(3.00) = 0.240\,\mathrm{V}.
$$

The product $0.400\times 0.200 = 0.0800$, and $0.0800\times 3.00 = 0.240$, exact at the precision of the data. With the field into the page and the area increasing, the induced current is anticlockwise, by the proof of [[#thm-motional]]. If the rod is slid the other way, $v$ changes sign, the area decreases, and both the Lorentz force and Lenz's law reverse the emf.
:::
:::

::: example Holding the speed constant {#ex-rails-power}
The rod of [[#ex-rails]] closes a circuit of resistance $R = 0.480\,\Omega$. Find the current, the external force required to keep $v$ constant, and the mechanical power.
::: solution
The emf is $0.240\,\mathrm{V}$, so

$$
I = \frac{0.240}{0.480} = 0.500\,\mathrm{A}.
$$

The opposing magnetic force has magnitude

$$
F = ILB = (0.500)(0.200)(0.400) = 0.0400\,\mathrm{N},
$$

directed against $\vec{v}$. The external force that cancels it has magnitude $0.0400\,\mathrm{N}$ in the direction of $\vec{v}$. The power is

$$
P = Fv = (0.0400)(3.00) = 0.120\,\mathrm{W}.
$$

The Joule heating is $I^2 R = (0.500)^2(0.480) = 0.250\times 0.480 = 0.120\,\mathrm{W}$. The two agree, which is [[#eq-power]]. If the agent stops pushing, the magnetic force decelerates the rod, the speed and the current fall together, and the kinetic energy already in the rod is what supplies the remaining heat.
:::
:::

## The induced electric field

A rod on rails uses a magnetic force on moving charges. A stationary loop around a solenoid uses neither motion nor a magnetic force on the charges in the wire: $\vec{B}$ at the wire may be almost zero, as it is outside an ideal solenoid, and the charges are at rest until the current starts. What pushes them is an electric field that the changing magnetic field produces in the space around it.

For a stationary curve, [[#eq-faraday]] reads

$$
\oint_C \vec{E}\cdot\dd\vec{l} = -\deriv{\Phi_B}{t}.
$$ {#eq-curl-e}

The left-hand side is the circulation of $\vec{E}$. In electrostatics that circulation is zero on every closed curve, and $\vec{E}$ is the gradient of a potential. Here the circulation equals minus the rate of change of flux. Whenever that rate is not zero, $\vec{E}$ is not a conservative field. There is no single-valued function $V$ with $\vec{E} = -\nabla V$ throughout a region that contains the curve $C$. You may still define a potential on a cut plane that does not go all the way around $C$, and the line integral of $\vec{E}$ from one side of the cut to the other equals the emf. You may not assign one potential to each point and use it on a loop that encircles the changing flux.

This is why Kirchhoff's loop rule, in the form "the sum of potential changes around a closed circuit is zero", does not survive unchanged. The electrostatic piece of the field still derives from a potential, and the resistor and capacitor terms are unchanged. The circulation [[#eq-curl-e]] has to be inserted by hand as an emf. The junction rule is untouched, because it is charge conservation, not a statement about potentials. The warning in [[electrostatics/dc-circuits]] points here.

::: warning A potential that will not close
The induced electric field around a changing $\vec{B}$ is not conservative. You cannot describe it by a single-valued potential. Kirchhoff's loop rule needs an extra emf term equal to $-\dd\Phi_B/\dd t$. Lenz's law does not say that the induced current always opposes the field. It opposes the change in flux. A falling field is met by an induced current whose own field points the same way as the applied field.
:::

The field of a long solenoid is symmetric enough that [[#eq-curl-e]] can be solved for $\vec{E}$, just as Ampère's law was solved for $\vec{B}$.

::: proposition Induced electric field of a solenoid {#prop-solenoid-e}
A long solenoid of radius $R$ has a uniform interior field $\vec{B}(t)$ along its axis and negligible exterior field. By symmetry the induced electric field is azimuthal, circles the axis, and depends only on the perpendicular distance $r$ from the axis. Its magnitude is

$$
E = \frac{r}{2}\abs{\deriv{B}{t}} \qquad (r \le R)
$$ {#eq-induced-inside}

inside, and

$$
E = \frac{R^2}{2r}\abs{\deriv{B}{t}} \qquad (r \ge R)
$$ {#eq-induced-outside}

outside. The sense is Lenz's law: if $\vec{B}$ is increasing along the positive axis, $\vec{E}$ drives a current that would produce $\vec{B}$ along the negative axis.
:::

::: proof
Consider a circle of radius $r$ centred on the axis. Symmetry makes $E$ constant and tangent on that circle, so the circulation has magnitude $2\pi r E$. The positive sense of the circle is the right-hand sense about the positive axis.

Inside the solenoid the flux through the circle is $\Phi_B = B\cdot\pi r^2$, because the interior field is uniform and the exterior formula is not in play. Then

$$
2\pi r E_{\mathrm{signed}} = -\pi r^2\deriv{B}{t},
$$

where the signed field is positive when it points in the positive sense of the circle. Hence $E_{\mathrm{signed}} = -(r/2)\,\dd B/\dd t$, and the magnitude is [[#eq-induced-inside]]. If $B$ is increasing, $E_{\mathrm{signed}}$ is negative: the induced field is against the positive grip, and a current it drives produces a negative axial field, opposing the increase.

Outside, the flux through the circle of radius $r > R$ is not $B\pi r^2$. The field is negligible outside the winding, so the flux is only the flux through the solenoid's own cross-section, $\Phi_B = B\cdot\pi R^2$. Then

$$
2\pi r E_{\mathrm{signed}} = -\pi R^2\deriv{B}{t},
$$

and the magnitude is [[#eq-induced-outside]]. At $r = R$ the two formulae agree, both giving $(R/2)\abs{\dd B/\dd t}$. Outside, $E$ falls as $1/r$.

The direction is the same sense at every $r$. Lenz's law does not reverse at the wall of the solenoid. It is fixed by the sign of $\dd B/\dd t$, which is a property of the whole core.
:::

A loop of wire placed around the solenoid, inside or outside, simply samples this field. The emf around a circular turn of radius $r$ is $2\pi r E$, which equals $\pi r^2\abs{\dd B/\dd t}$ inside and $\pi R^2\abs{\dd B/\dd t}$ outside. Outside, a larger loop does not collect more emf: the extra path length is exactly cancelled by the $1/r$ fall of $E$, and the flux the loop encloses has stopped growing once the loop clears the winding.

::: example Inside and outside a rising solenoid field {#ex-induced-e}
A long solenoid of radius $R = 0.0400\,\mathrm{m}$ has an interior field increasing at $\dd B/\dd t = 15.0\,\mathrm{T/s}$. Find the magnitude of the induced electric field at $r = 0.0200\,\mathrm{m}$, at $r = 0.0400\,\mathrm{m}$ and at $r = 0.0800\,\mathrm{m}$.
::: solution
Inside, at $r = 0.0200\,\mathrm{m}$, [[#eq-induced-inside]] gives

$$
E = \frac{0.0200}{2}\times 15.0 = 0.150\,\mathrm{N/C}.
$$

At the wall, $r = R = 0.0400\,\mathrm{m}$,

$$
E = \frac{0.0400}{2}\times 15.0 = 0.300\,\mathrm{N/C}.
$$

Outside, at $r = 0.0800\,\mathrm{m}$, [[#eq-induced-outside]] gives

$$
E = \frac{(0.0400)^2}{2\times 0.0800}\times 15.0 = \frac{0.00160}{0.160}\times 15.0 = 0.0100\times 15.0 = 0.150\,\mathrm{N/C}.
$$

The field at twice the solenoid radius equals the field at half the radius, for these particular numbers, because $r_{\mathrm{in}} r_{\mathrm{out}} = R^2$. The emf around the circle at $r = 0.0800\,\mathrm{m}$ is $2\pi r E = 2\pi(0.0800)(0.150) = 0.0754\,\mathrm{V}$, and the emf around a circle that hugs the winding is $2\pi(0.0400)(0.300) = 0.0754\,\mathrm{V}$ as well. Both equal $\pi R^2\,\dd B/\dd t = \pi(0.00160)(15.0) = 0.0754\,\mathrm{V}$. A turn wound on the outside of this solenoid picks up the same emf as a turn wound on the winding itself. A turn of radius $0.0200\,\mathrm{m}$ inside the core picks up less, $\pi r^2\,\dd B/\dd t = \pi(0.000400)(15.0) = 0.0188\,\mathrm{V}$, because it encloses less flux.
:::
:::

The numerical values $0.0754$ and $0.0188$ use $\pi = 3.1416$. They are $0.0240\pi$ and $0.00600\pi$ exactly, from $\pi R^2\,\dd B/\dd t = \pi\times 0.00160\times 15.0 = 0.0240\pi$ and $\pi r^2\,\dd B/\dd t = \pi\times 0.000400\times 15.0 = 0.00600\pi$.

## Coils that rotate, and fluxes that oscillate

A generator is a coil whose flux is changed by rotation rather than by a change in $B$. Let a coil of $N$ turns, each of area $A$, sit in a uniform field $\vec{B}$. The normal to the coil makes an angle with $\vec{B}$ that grows as $\omega t$ if the coil turns at constant angular speed $\omega$ about a diameter perpendicular to $\vec{B}$. Choosing $t = 0$ at the moment of maximum flux,

$$
\Phi_B = NBA\cos(\omega t).
$$

Differentiate. [[#eq-faraday]] gives

$$
\mathcal{E} = NBA\omega\sin(\omega t).
$$ {#eq-generator}

The emf is largest when the flux is zero, at the moment the coil is edge-on to $\vec{B}$ and $\sin(\omega t) = \pm 1$, and the emf is zero when the flux is at a peak and its slope vanishes. The maximum magnitude is $NBA\omega$. The same phase relation holds for any flux that oscillates cosinusoidally. If $\Phi_B = \Phi_0\cos(\omega t)$, then

$$
\mathcal{E} = \Phi_0\omega\sin(\omega t),
$$ {#eq-ac}

and the emf amplitude is $\Phi_0\omega$, a quarter cycle ahead of the flux in the sense that the sine peaks when the cosine crosses zero.

::: widget plot
f: cos(x)
x: 0, 2pi
caption: A flux that varies as $\cos(\omega t)$ induces an emf proportional to $\sin(\omega t)$, a quarter cycle out of phase. The figure shows the flux; the slope is the story of Faraday's law. The slope is zero at each peak and steepest where the curve crosses zero.
:::

Read the figure as $\Phi_B$ against $\omega t$. From $x = 0$ to the first crossing at $x = \pi/2$ the slope goes from zero to its most negative value. The induced emf, being minus that slope, goes from zero to its positive peak. Nothing on the figure slides. The qualitative fact is the quarter-cycle shift, which [[#eq-ac]] makes quantitative.

::: example A cosine flux {#ex-ac}
The flux through a coil is $\Phi_B = 0.0200\cos(100 t)\,\mathrm{Wb}$, with $t$ in seconds and the argument of the cosine in radians. Find the emf as a function of time, and its maximum magnitude.
::: solution
Here $\Phi_0 = 0.0200\,\mathrm{Wb}$ and $\omega = 100\,\mathrm{rad/s}$. [[#eq-ac]] gives

$$
\mathcal{E} = (0.0200)(100)\sin(100 t) = 2.00\sin(100 t)\,\mathrm{V}.
$$

The maximum magnitude is $2.00\,\mathrm{V}$. At $t = 0$ the flux is at its positive peak and the emf is zero. At $t = \pi/200\,\mathrm{s}$, the argument is $\pi/2$, the flux is zero and the emf is $+2.00\,\mathrm{V}$. The period of both oscillations is $2\pi/100 = 0.0628\,\mathrm{s}$. The current in a resistive load of resistance $R$ would be $\mathcal{E}/R$, in phase with the emf and a quarter cycle out of phase with the flux. A load that includes inductance or capacitance shifts the current relative to the emf; that is the subject of alternating-current circuits, not of this calculation.
:::
:::

::: example A rotating coil {#ex-generator}
A coil of $N = 25$ turns, each of area $A = 0.0200\,\mathrm{m^2}$, rotates at $\omega = 50.0\,\mathrm{rad/s}$ in a uniform field $B = 0.400\,\mathrm{T}$, about a diameter perpendicular to $\vec{B}$. Find the maximum emf, and the emf at the instant the normal is aligned with $\vec{B}$.
::: solution
[[#eq-generator]] has amplitude

$$
\mathcal{E}_{\max} = NBA\omega = (25)(0.400)(0.0200)(50.0).
$$

First $25\times 0.400 = 10.0$, then $10.0\times 0.0200 = 0.200$, then $0.200\times 50.0 = 10.0$. The maximum emf is $10.0\,\mathrm{V}$. At the instant the normal is aligned with $\vec{B}$, the flux is at its extreme, $\cos(\omega t) = \pm 1$ and $\sin(\omega t) = 0$, so $\mathcal{E} = 0$. A quarter turn later the coil is edge-on, the flux is passing through zero, and the emf has magnitude $10.0\,\mathrm{V}$. The sign at that instant is fixed by Lenz's law once you know whether the flux is passing from positive to negative or the other way.
:::
:::

## Eddy currents

A bulk piece of metal is a circuit in many directions at once. A changing flux through any imaginary loop drawn inside the metal drives a current around that loop, by the same law that drives a current around a wire. These eddy currents close inside the material. They have no insulating path that would force them to travel down a wire and through a single resistor.

Two consequences follow from Lenz's law and from $I^2 R$ heating, without a further formula. The currents dissipate energy. An induction cooker heats a pan by driving eddy currents in the base with an alternating field; the pan is the resistor. A transformer core, if it were a solid block, would heat the same way, which is why cores are built from insulated laminations stacked so that the large loops are cut into thin sheets. The available area for each eddy loop is then small, the emf around it is small, and the heating drops sharply.

The currents also exert forces. A magnet falling down a copper tube induces currents in the wall of the tube whose field opposes the motion, and the magnet reaches a terminal speed when the magnetic drag balances its weight. A conducting plate entering the gap of a magnet is repelled from the gap while the flux through it is rising, and dragged back while the flux is falling, so the plate is braked on the way in and on the way out. The force disappears when the motion stops, because a static field does not keep an eddy current running. It also disappears, for a given motion, if the plate is slotted so that the current paths are interrupted.

No single resistance describes a general eddy-current pattern, so we do not quote a universal $BLv$ formula for them. When the conductor is a well-defined circuit, the earlier sections apply. When it is a lump of metal, the qualitative rules are Lenz's law for the direction of the force and Joule heating for the energy.

## Two mechanisms, one emf

The rod on rails and the loop around the solenoid look like different phenomena if you insist on one inertial frame and on a split between "electric" and "magnetic". In the rail problem, as we set it, $\vec{B}$ is static and the force on a charge in the rod is magnetic. In the solenoid problem the loop is static and the force is electric, from [[#eq-curl-e]]. The flux rule covers both without asking which description you are in.

A change of frame mixes the two. The laboratory in which the rails are at rest and $\vec{B}$ is static is not the laboratory in which the rod is at rest. The fact that one law, [[#eq-faraday]], covers both descriptions is part of what a relativistic theory of the field has to arrange. The course on [[relativity]] is where that rearrangement is taken up. Nothing in the calculations of this chapter requires it: you choose a frame, you compute $\dd\Phi_B/\dd t$ in that frame, and you take the emf from [[#eq-faraday]], checking the motional case against the Lorentz force when the conductors move and $\vec{B}$ does not.

::: history Faraday's iron ring
On 29 August 1831 Michael Faraday obtained the first successful induction, with two coils wound on an iron ring. He connected one coil to a battery. At the moment of connection, and again at the moment of disconnection, a galvanometer on the second coil deflected. A steady current in the first coil produced nothing in the second. The effect lived in the change. Faraday spent the following months showing that moving a magnet relative to a coil, and moving a coil relative to a magnet, belonged to the same family. The law in the flux form [[#eq-faraday]], with the line integral of the electric field on the left-hand side, was sharpened later by Franz Ernst Neumann and by James Clerk Maxwell. The minus sign, read as Lenz's law, is what keeps the energy account honest.
:::

::: summary
- Magnetic flux is $\Phi_B = \int\vec{B}\cdot\dd\vec{A}$, and for a uniform field through a flat area it is $BA\cos\theta$. The sign of the normal is tied to the positive sense of the boundary.
- Faraday's law says the emf around the boundary is $-\dd\Phi_B/\dd t$. The average emf over a finite change is $-\Delta\Phi_B/\Delta t$.
- Lenz's law is the minus sign: the induced current opposes the change in flux, not the field itself. A decreasing field is supported, not opposed, by the induced current's own field.
- The charge that passes around a loop of resistance $R$ is $\abs{\Delta\Phi_B}/R$ when the current starts and ends at zero, whether or not the change is rapid.
- A rod of length $L$ moving at speed $v$ on rails, with $\vec{B}$, $L$ and $\vec{v}$ mutually perpendicular, has motional emf $BLv$. The Lorentz force and the flux rule agree, and the mechanical power needed to hold $v$ constant equals $I^2 R$.
- A changing $\vec{B}$ induces an electric field with nonzero circulation. That field is not conservative and cannot be described by a single-valued potential. Outside a long solenoid $E = (R^2/(2r))\abs{\dd B/\dd t}$; inside, $E = (r/2)\abs{\dd B/\dd t}$.
- A flux $\Phi_0\cos(\omega t)$ induces an emf $\Phi_0\omega\sin(\omega t)$, a quarter cycle out of phase. A coil of $N$ turns and area $A$ rotating in a uniform field has maximum emf $NBA\omega$.
- Eddy currents in a bulk conductor dissipate heat and oppose the motion that causes them. Laminations and slots interrupt the paths.
:::

## Exercises

::: exercise Average emf from a rising field {#exr-avg level=1 check="0.08"}
A loop of area $0.0400\,\mathrm{m^2}$ is perpendicular to a uniform field. The field rises from $0.200\,\mathrm{T}$ to $0.800\,\mathrm{T}$ in $0.300\,\mathrm{s}$. Find the magnitude of the average induced emf.
::: solution
The flux change has magnitude

$$
\abs{\Delta\Phi_B} = (0.800 - 0.200)(0.0400) = (0.600)(0.0400) = 0.0240\,\mathrm{Wb}.
$$

[[#eq-faraday-avg]] gives the magnitude

$$
\abs{\mathcal{E}_{\mathrm{avg}}} = \frac{0.0240}{0.300} = 0.0800\,\mathrm{V}.
$$

The field is increasing, so the induced current produces a field against the applied field. The magnitude does not require that direction.
:::
:::

::: exercise A slower rod {#exr-rod level=1 check="0.2"}
A rod of length $L = 0.400\,\mathrm{m}$ slides on rails at $v = 2.00\,\mathrm{m/s}$ in a uniform field $B = 0.250\,\mathrm{T}$. The field, the rod and the velocity are mutually perpendicular. Find the emf.
::: solution
[[#eq-motional]] gives

$$
\mathcal{E} = BLv = (0.250)(0.400)(2.00) = 0.200\,\mathrm{V}.
$$

The product $0.250\times 0.400 = 0.100$, and $0.100\times 2.00 = 0.200$. The sense of the current, once the rails are closed, is fixed by Lenz's law from the sign of $\dd A/\dd t$, as in [[#thm-motional]].
:::
:::

::: exercise Charge from a flux change {#exr-charge level=1 check="0.3"}
The flux through a single loop changes by $0.0360\,\mathrm{Wb}$. The resistance of the loop is $0.120\,\Omega$, and the current is zero before and after the change. Find the magnitude of the charge that passes around the loop.
::: solution
[[#eq-charge]] gives

$$
\abs{\Delta Q} = \frac{0.0360}{0.120} = 0.300\,\mathrm{C}.
$$

The duration of the change is not given and is not needed. A self-inductance would not alter this charge under the stated start-and-end condition, by the argument in [[#prop-charge]].
:::
:::

::: exercise Power to keep a rod moving {#exr-power level=2 check="0.6"}
A rod of length $L = 0.300\,\mathrm{m}$ slides at constant speed $v = 4.00\,\mathrm{m/s}$ on rails in a uniform perpendicular field $B = 0.500\,\mathrm{T}$. The circuit resistance is $R = 0.600\,\Omega$. Find the mechanical power required to hold the speed constant.
::: hint
Compute the emf, then the current, then either $I^2 R$ or $Fv$ with $F = ILB$.
:::
::: solution
The emf is

$$
\mathcal{E} = BLv = (0.500)(0.300)(4.00) = 0.600\,\mathrm{V}.
$$

The current is $I = 0.600/0.600 = 1.00\,\mathrm{A}$. The Joule heating, which equals the mechanical power by [[#eq-power]], is

$$
P = I^2 R = (1.00)^2(0.600) = 0.600\,\mathrm{W}.
$$

As a check, $F = ILB = (1.00)(0.300)(0.500) = 0.150\,\mathrm{N}$ and $Fv = (0.150)(4.00) = 0.600\,\mathrm{W}$.
:::
:::

::: exercise Electric field outside a solenoid {#exr-outside level=2 check="0.1"}
A long solenoid of radius $R = 0.0500\,\mathrm{m}$ has $\abs{\dd B/\dd t} = 12.0\,\mathrm{T/s}$. Find the magnitude of the induced electric field at $r = 0.150\,\mathrm{m}$ from the axis.
::: solution
The point is outside the winding, so [[#eq-induced-outside]] applies:

$$
E = \frac{R^2}{2r}\abs{\deriv{B}{t}} = \frac{(0.0500)^2}{2\times 0.150}\times 12.0 = \frac{0.00250}{0.300}\times 12.0.
$$

The fraction is $0.008333$, and $0.008333\times 12.0 = 0.100\,\mathrm{N/C}$. Exactly, $0.00250/0.300 = 1/120$, and $12.0/120 = 0.100$. The interior formula $(r/2)\abs{\dd B/\dd t}$ would have given a much larger and incorrect field, because it assumes the flux is $B\pi r^2$ rather than $B\pi R^2$.
:::
:::

::: exercise Amplitude of a sinusoidal emf {#exr-sine level=2 check="2"}
The flux through a loop is $\Phi_B = 0.0500\cos(40.0\, t)\,\mathrm{Wb}$, with $t$ in seconds. Find the maximum magnitude of the induced emf.
::: solution
Compare with [[#eq-ac]]. Here $\Phi_0 = 0.0500\,\mathrm{Wb}$ and $\omega = 40.0\,\mathrm{rad/s}$, so

$$
\mathcal{E}_{\max} = \Phi_0\omega = (0.0500)(40.0) = 2.00\,\mathrm{V}.
$$

The emf is $2.00\sin(40.0\, t)\,\mathrm{V}$. It is zero at the instants when the flux is $\pm 0.0500\,\mathrm{Wb}$.
:::
:::

::: exercise Area and field both changing {#exr-product level=3 check="0.215"}
A circuit perpendicular to a uniform field has area $A = 0.0500\,\mathrm{m^2}$ at the instant of interest, and the area is increasing at $\dd A/\dd t = 0.600\,\mathrm{m^2/s}$ because a rod is moving. At that same instant $B = 0.400\,\mathrm{T}$ and $\dd B/\dd t = -0.500\,\mathrm{T/s}$, with $B$ taken positive along the positive normal. Find the magnitude of the emf.
::: hint
Use the product rule [[#eq-product]]. The two contributions have opposite effects on the flux; subtract their magnitudes.
:::
::: solution
With the normal along the positive field,

$$
\deriv{\Phi_B}{t} = B\deriv{A}{t} + A\deriv{B}{t} = (0.400)(0.600) + (0.0500)(-0.500).
$$

The first term is $0.240\,\mathrm{Wb/s}$ and the second is $-0.0250\,\mathrm{Wb/s}$, so

$$
\deriv{\Phi_B}{t} = 0.215\,\mathrm{Wb/s}.
$$

The emf is $-0.215\,\mathrm{V}$ in the positive sense, and its magnitude is $0.215\,\mathrm{V}$. The growing area is winning: the flux is still increasing, so the induced current opposes the increase, even though $B$ itself is falling. Had $\abs{A\,\dd B/\dd t}$ exceeded $B\,\dd A/\dd t$, the flux would have been decreasing and the current would have reversed. Omitting either term, or adding the magnitudes when the derivatives have opposite signs, is the error this layout is meant to catch.
:::
:::

::: exercise Matching an interior field to an exterior one {#exr-match level=3 check="0.16"}
A long solenoid has radius $R = 0.0400\,\mathrm{m}$. The induced electric field at radius $r_{\mathrm{in}} = 0.0100\,\mathrm{m}$, inside the core, has the same magnitude as the induced electric field at some radius $r_{\mathrm{out}}$ outside the winding. Find $r_{\mathrm{out}}$. The rate $\dd B/\dd t$ is not zero, and it is the same in both expressions.
::: hint
Set [[#eq-induced-inside]] equal to [[#eq-induced-outside]] and cancel $\abs{\dd B/\dd t}$.
:::
::: solution
Equate the magnitudes:

$$
\frac{r_{\mathrm{in}}}{2}\abs{\deriv{B}{t}} = \frac{R^2}{2 r_{\mathrm{out}}}\abs{\deriv{B}{t}}.
$$

Cancel the common factors, which are not zero:

$$
r_{\mathrm{in}}\, r_{\mathrm{out}} = R^2, \qquad r_{\mathrm{out}} = \frac{R^2}{r_{\mathrm{in}}} = \frac{(0.0400)^2}{0.0100} = \frac{0.00160}{0.0100} = 0.160\,\mathrm{m}.
$$

The exterior point is four solenoid radii out. This is the same relation that made the fields equal at $0.0200\,\mathrm{m}$ and $0.0800\,\mathrm{m}$ in [[#ex-induced-e]], where the product of the two radii was again $R^2$. The result does not depend on how fast $B$ is changing, provided it is changing.
:::
:::

::: quiz
The flux through a loop varies as $\cos(\omega t)$. At the instant the flux is at its positive maximum, the induced emf is
- [ ] also at its positive maximum, because a large flux means a large emf
- [x] instantaneously zero, because the slope of the flux is zero, and the emf tracks minus that slope
- [ ] equal to the flux divided by the resistance of the loop, because Ohm's law converts flux into current
- [ ] opposite to the applied field, whether the flux is about to decrease or about to increase
::: solution
[[#eq-ac]] and the figure in the widget are the same statement. A cosine has zero derivative at its peaks, so $-\dd\Phi_B/\dd t$ vanishes there, and it is largest where the cosine crosses zero. Ohm's law converts emf into current, not flux into current. The direction of the induced current depends on whether the flux is rising or falling through that instant; at the exact peak the emf is zero and the question of direction is idle. A quarter period later the flux is zero and the emf has its maximum magnitude.
:::
:::
