A compass needle swings when a current is switched on in a nearby wire. That observation, made by Ørsted in 1820, revealed a second kind of field, produced not by charges but by charges in motion. Magnetic fields drive every electric motor and loudspeaker, store the energy in every inductor and transformer, steer the beam in a mass spectrometer, hold the data on a hard disk and image the body in an MRI scanner whose superconducting coil produces a field of $1.5$ or $3\,\mathrm T$, tens of thousands of times the Earth's.

This chapter treats **steady** currents and the static magnetic fields they produce. The structure parallels electrostatics closely, and it pays to keep the analogy in view: the Biot–Savart law plays the part of Coulomb's law, Ampère's circuital law the part of Gauss's law, and the magnetic vector potential the part of the electric potential. But the differences matter as much. Magnetic field lines have no beginning or end, so there is no magnetic charge; the force on a moving charge is perpendicular to its velocity; and magnetic materials, especially iron, change the field by factors of thousands rather than the factors of a few typical of dielectrics. The physics of the subject is developed in the Physics Atlas ([Biot–Savart law](/learn/physics/lesson.php?c=magnetism&l=biot-savart), [magnetostatics](/learn/physics/lesson.php?c=electrodynamics&l=magnetostatics)); here we keep to engineering geometries and numbers, and use the vector tools of [[electromagnetics/vector-analysis]].

## Magnetic force and flux density

Experiment shows that a charge $Q$ moving with velocity $\mathbf v$ near currents feels a force proportional to $Q$, perpendicular to $\mathbf v$, and proportional to the component of $\mathbf v$ perpendicular to a certain direction. A single vector field describes all of this.

::: definition Magnetic flux density and the Lorentz force {#def-b}
The **magnetic flux density** $\mathbf B$ is the vector field for which the force on a charge $Q$ moving with velocity $\mathbf v$ is

$$
\mathbf F = Q\left(\mathbf E + \mathbf v\times\mathbf B\right) ,
$$ {#eq-lorentz}

the **Lorentz force**. The unit of $\mathbf B$ is the tesla, $1\,\mathrm T = 1\,\mathrm{N/(A\,m)} = 1\,\mathrm{Wb/m^2}$.
:::

Because $\mathbf v\times\mathbf B$ is perpendicular to $\mathbf v$, a magnetic field does **no work** on a moving charge: it changes the direction of motion but not the speed. A charge moving perpendicular to a uniform $\mathbf B$ therefore moves in a circle, with $QvB = mv^2/r$, so the radius is $r = mv/(QB)$ and the angular frequency $\omega_c = QB/m$ (the **cyclotron frequency**) is independent of speed.

Current in a wire is moving charge. A length $\mathrm d\mathbf l$ of wire carrying current $I$ contains moving charge with $Q\mathbf v = I\,\mathrm d\mathbf l$, so the force on it is

$$
\mathrm d\mathbf F = I\,\mathrm d\mathbf l\times\mathbf B ,
$$ {#eq-force-element}

and a straight wire of length $L$ in a uniform field perpendicular to it feels a force $BIL$, the principle of every electric motor.

Typical flux densities: the Earth's field is about $25$–$65\,\mathrm{\mu T}$ depending on latitude; a fridge magnet about $5\,\mathrm{mT}$; the air gap of a motor or the core of a transformer $1$–$2\,\mathrm T$; a neodymium magnet surface about $0.5$–$1.4\,\mathrm T$; a hospital MRI magnet $1.5$–$3\,\mathrm T$.

## The Biot–Savart law

::: theorem Biot–Savart law {#thm-biot-savart}
A steady current $I$ in a filament produces, at the point $\mathbf r$, the magnetic field intensity

$$
\mathbf H(\mathbf r) = \oint\frac{I\,\mathrm d\mathbf l'\times\mathbf a_R}{4\pi R^2}, \qquad \mathbf R = \mathbf r - \mathbf r',\quad \mathbf a_R = \frac{\mathbf R}{R},
$$ {#eq-biot-savart}

in amperes per metre, where the integral runs round the closed circuit. In vacuum $\mathbf B = \mu_0\mathbf H$ with the **permeability of free space** $\mu_0 = 4\pi\times10^{-7}\,\mathrm{H/m}$ (to about one part in $10^9$; since 2019 it is a measured constant). For distributed currents, $I\,\mathrm d\mathbf l'$ is replaced by $\mathbf K\,\mathrm dS'$ (surface current density $\mathbf K$, in $\mathrm{A/m}$) or by $\mathbf J\,\mathrm dv'$.
:::

The law is experimental, like Coulomb's. It has the same inverse-square dependence, but the cross product makes each current element produce a field that circles the element's line rather than pointing away from it: the right-hand rule, with the thumb along the current, gives the sense of the circles. Only complete circuits carry steady currents, so only the integral round a closed path has a direct physical meaning, though we often compute the contribution of one straight segment and add.

::: example A straight segment {#ex-segment}
A straight wire along the $z$-axis carries current $I$ in the $+z$ direction from $z = z_1$ to $z = z_2$. Find $\mathbf H$ at a point at distance $\rho$ from the axis in the plane $z = 0$.
::: solution
Put the field point at $(\rho, 0, 0)$. The source element is $\mathrm d\mathbf l' = \mathrm dz'\,\mathbf a_z$ at $(0,0,z')$, and $\mathbf R = \rho\,\mathbf a_\rho - z'\,\mathbf a_z$. Then $\mathrm d\mathbf l'\times\mathbf R = \rho\,\mathrm dz'\,\mathbf a_\phi$, so

$$
\mathbf H = \frac{I}{4\pi}\int_{z_1}^{z_2}\frac{\rho\,\mathrm dz'}{(\rho^2 + z'^2)^{3/2}}\,\mathbf a_\phi = \frac{I}{4\pi\rho}\left[\frac{z'}{\sqrt{\rho^2+z'^2}}\right]_{z_1}^{z_2}\mathbf a_\phi = \frac{I}{4\pi\rho}\left(\sin\alpha_2 - \sin\alpha_1\right)\mathbf a_\phi ,
$$ {#eq-segment}

where $\alpha_{1,2}$ are the angles at which the ends are seen from the field point, measured from the perpendicular ($\sin\alpha = z'/\sqrt{\rho^2+z'^2}$). For an infinitely long wire, $\alpha_1 = -90^\circ$ and $\alpha_2 = 90^\circ$:

$$
\mathbf H = \frac{I}{2\pi\rho}\,\mathbf a_\phi .
$$ {#eq-wire}
:::
:::

::: example The centre of a square loop {#ex-square}
A square loop of side $L = 10\,\mathrm{cm}$ carries $I = 5\,\mathrm A$. Find $\mathbf B$ at its centre.
::: solution
Each side is at distance $\rho = L/2$ from the centre and is seen between $\alpha = -45^\circ$ and $+45^\circ$. By [[#eq-segment]] each side contributes

$$
H_1 = \frac{I}{4\pi(L/2)}\left(\sin45^\circ + \sin45^\circ\right) = \frac{\sqrt2\,I}{2\pi L},
$$

all four in the same direction (perpendicular to the loop, by the right-hand rule). Thus $H = 4H_1 = 2\sqrt2\,I/(\pi L) = 2\sqrt2(5)/(\pi\times0.1) = 45.0\,\mathrm{A/m}$, and $B = \mu_0H = 56.6\,\mathrm{\mu T}$, about the strength of the Earth's field. For comparison, a circular loop of diameter $10\,\mathrm{cm}$ gives $I/(2a) = 50\,\mathrm{A/m}$ at its centre (see below): the square, whose corners are farther away, gives a little less.
:::
:::

### The circular loop and the Helmholtz coil

On the axis of a circular loop of radius $a$ carrying $I$, at height $z$ above its plane, every element is at distance $\sqrt{a^2+z^2}$ and contributes a field with an axial component; the radial components cancel round the loop. The result is

$$
\mathbf H = \frac{Ia^2}{2(a^2+z^2)^{3/2}}\,\mathbf a_z ,
$$ {#eq-loop}

which is $I/(2a)$ at the centre and, far away, $Ia^2/(2z^3) = m/(2\pi z^3)$ with the **magnetic dipole moment** $m = I\pi a^2$. A small loop of any shape has dipole moment $\mathbf m = IS\,\mathbf a_n$ and a far field of the same form as the electric dipole of [[electromagnetics/electrostatics]], with $p/\epsilon_0$ replaced by $\mu_0m$.

::: widget plot
f: 1/(2*(1 + (x - d/2)^2)^(3/2)) + 1/(2*(1 + (x + d/2)^2)^(3/2))
x: -2, 2
y: 0, 1
sliders: d=1:0.2:2:0.05
caption: Axial field of two coaxial loops of radius $a = 1$, each carrying the same current, separated by $d$ (in units of $a$), normalised to $I/a$. For $d$ much larger than $a$ the field dips between the coils; for small $d$ it peaks at the centre. At $d = a$ exactly (the **Helmholtz** spacing) the curve is flattest: the field is uniform to $0.2\,\%$ over the middle $40\,\%$ of the gap.
:::

::: example Designing a Helmholtz coil {#ex-helmholtz}
A Helmholtz coil, two coaxial circular coils of radius $a$ spaced by $a$, is used to calibrate magnetometers. Design one with $a = 10\,\mathrm{cm}$ and $N = 100$ turns per coil that produces $1\,\mathrm{mT}$ at its centre. How uniform is the field?
::: solution
At the centre, each coil is at $z = a/2$. By [[#eq-loop]], with $N$ turns,

$$
H = 2\cdot\frac{NIa^2}{2(a^2 + a^2/4)^{3/2}} = \frac{NI}{a}\left(\frac45\right)^{3/2} = 0.7155\,\frac{NI}{a} .
$$

The required current is

$$
I = \frac{Ba}{0.7155\,\mu_0N} = \frac{(10^{-3})(0.1)}{0.7155(1.2566\times10^{-6})(100)} = 1.11\,\mathrm A .
$$

Uniformity: the spacing $d = a$ makes the second derivative of $H$ vanish at the centre, and by symmetry the odd derivatives vanish too, so the field varies only as the fourth power of distance from the centre. Evaluating [[#eq-loop]] for both coils, at $z = 0.1a$ off-centre along the axis the field is $0.01\,\%$ below its central value and at $z = 0.2a$ it is $0.18\,\%$ below. Calibration work often adds a second, larger pair of coils to cancel the Earth's $50\,\mathrm{\mu T}$, which is $5\,\%$ of this field.
:::
:::

## Ampère's circuital law

The Biot–Savart integral always works but is often laborious. For symmetric current distributions an integral law, the magnetic analogue of Gauss's law, gives the field in a line.

::: theorem Ampère's circuital law {#thm-ampere}
For steady currents, the circulation of $\mathbf H$ round any closed path equals the current enclosed by the path:

$$
\oint_C\mathbf H\cdot\mathrm d\mathbf l = I_{\text{enc}} = \int_S\mathbf J\cdot\mathrm d\mathbf S ,
$$ {#eq-ampere}

where $S$ is any surface bounded by $C$, oriented by the right-hand rule. By Stokes's theorem ([[electromagnetics/vector-analysis#thm-stokes]]) the equivalent point form is

$$
\nabla\times\mathbf H = \mathbf J .
$$ {#eq-ampere-point}
:::

::: proof
For an infinite straight wire the field [[#eq-wire]] has circulation $\oint(I/2\pi\rho)\rho\,\mathrm d\phi = I$ round any path that encircles the wire once, since only the $\phi$-component of $\mathrm d\mathbf l$ contributes and $\phi$ advances by $2\pi$; for a path that does not encircle it, $\phi$ returns to its initial value and the circulation is zero (compare [[electromagnetics/vector-analysis#ex-stokes-wire]]). The general case follows from the Biot–Savart law: the circulation of the field of a closed circuit $C'$ round a path $C$ equals $I$ times the number of times $C$ links $C'$, a result due to Gauss (the circulation is $I/4\pi$ times the change in the solid angle subtended by $C'$, which jumps by $4\pi$ each time the path threads the circuit). A full derivation from [[#eq-biot-savart]] is in Griffiths, §5.3.
:::

As with Gauss's law, [[#eq-ampere]] always holds, but it yields $\mathbf H$ only when symmetry tells us its direction and lets us choose an **Amperian path** on which $\mathbf H$ is either tangential and constant or perpendicular. The useful cases are the infinite wire and coaxial cable (circular paths), the infinite current sheet and the long solenoid (rectangular paths), and the toroid (circular paths inside the core).

::: example A thick wire and a coaxial cable {#ex-ampere-coax}
(a) A long round conductor of radius $a$ carries current $I$ uniformly distributed over its cross-section. Find $\mathbf H$ inside and outside. (b) A coaxial cable carries $I$ on its inner conductor (radius $a$) and returns it on a thin outer conductor of radius $b$. Find $\mathbf H$ in all regions.
::: solution
By symmetry $\mathbf H = H_\phi(\rho)\,\mathbf a_\phi$; use a circle of radius $\rho$ as the Amperian path, on which $\oint\mathbf H\cdot\mathrm d\mathbf l = 2\pi\rho H_\phi$.

(a) Inside, the enclosed current is $I\rho^2/a^2$, so $H_\phi = I\rho/(2\pi a^2)$, rising linearly from zero on the axis. Outside, $I_{\text{enc}} = I$ and $H_\phi = I/(2\pi\rho)$. The field is greatest at the surface, $I/(2\pi a)$. For $I = 10\,\mathrm A$ and $a = 1\,\mathrm{mm}$ that is $1592\,\mathrm{A/m}$ ($2.0\,\mathrm{mT}$), and halfway in it is half as large.

(b) Inside the inner conductor, as in (a). Between the conductors, $I_{\text{enc}} = I$ and $H_\phi = I/(2\pi\rho)$. Outside, $I_{\text{enc}} = I - I = 0$, so $\mathbf H = \mathbf 0$. As with the electric field ([[electromagnetics/electrostatics#ex-coax]]), the magnetic field of a coaxial cable is confined between its conductors.
:::
:::

::: quiz
A long, thin-walled metal tube carries a steady current $I$ along its length, uniformly distributed round its circumference. What is the magnetic field inside the tube?
- [ ] $I/(2\pi\rho)$, as for a wire, since the current is still enclosed somewhere.
- [x] Zero.
- [ ] Uniform and directed along the axis.
- [ ] Largest on the axis.
::: solution
By symmetry $\mathbf H = H_\phi(\rho)\,\mathbf a_\phi$. A circle of radius $\rho$ inside the tube encloses no current, so $2\pi\rho H_\phi = 0$ and $\mathbf H = \mathbf 0$. (An axial field would require circulating, not axial, currents, as in a solenoid.) Outside, the tube's field is that of a wire carrying $I$ on its axis.
:::
:::

::: example The toroid {#ex-toroid}
A toroidal coil of $N$ turns is wound uniformly on a core of rectangular cross-section, inner radius $a$, outer radius $b$, height $h$. Find $\mathbf H$ inside the core and the total flux for a core of permeability $\mu$.
::: solution
By symmetry $\mathbf H = H_\phi(\rho)\,\mathbf a_\phi$. A circular path of radius $a < \rho < b$ inside the core links all $N$ turns, so $2\pi\rho H_\phi = NI$ and

$$
H_\phi = \frac{NI}{2\pi\rho} .
$$

A path inside the hole ($\rho < a$) encloses no current; a path outside ($\rho > b$) encloses $NI$ upwards and $NI$ downwards, net zero. So the field is confined to the core: an ideal toroid has no external field. The flux through one cross-section is

$$
\Phi = \int\mathbf B\cdot\mathrm d\mathbf S = \int_a^b\frac{\mu NI}{2\pi\rho}\,h\,\mathrm d\rho = \frac{\mu NIh}{2\pi}\ln\frac ba .
$$

For $N = 500$, $I = 0.2\,\mathrm A$, $a = 4\,\mathrm{cm}$, $b = 6\,\mathrm{cm}$, $h = 1\,\mathrm{cm}$, an air core gives $\Phi = 8.1\times10^{-8}\,\mathrm{Wb}$; a ferrite core with $\mu_r = 2000$ gives $1.6\times10^{-4}\,\mathrm{Wb}$, provided the core does not saturate (see below). This flux, times $N$ and divided by $I$, is the inductance of [[electromagnetics/induction-inductance]].
:::
:::

For a long **solenoid** with $n$ turns per metre, a rectangular Amperian path with one side inside and one outside gives $H = nI$ inside and (in the ideal long limit) zero outside. An infinite sheet of surface current $\mathbf K$ gives $\mathbf H = \tfrac12\mathbf K\times\mathbf a_n$ on each side, where $\mathbf a_n$ points from the sheet towards the field point, the magnetic counterpart of the charged sheet.

::: widget vectorfield
P: -y/((x - 1)^2 + y^2 + 0.02) - s*y/((x + 1)^2 + y^2 + 0.02)
Q: (x - 1)/((x - 1)^2 + y^2 + 0.02) + s*(x + 1)/((x + 1)^2 + y^2 + 0.02)
x: -3, 3
y: -2.5, 2.5
streamlines: true
sliders: s=-1:-1:1:0.1
caption: Field lines of two long parallel wires perpendicular to the page, at $x = \pm1$, the right one carrying current out of the page and the left one current $s$ times as large. With $s = -1$ (opposite currents, a two-wire line) the fields add between the wires and largely cancel outside. With $s = +1$ (parallel currents) they cancel midway and the lines encircle both wires far away. Every line is closed: there is nowhere for magnetic field lines to start or end.
:::

::: warning Ampère's law needs closed currents and the right symmetry
Like Gauss's law, [[#eq-ampere]] gives only the circulation. For a finite straight segment, a circular loop or a short solenoid, $\mathbf H$ is not constant round any convenient path, and pulling it out of the integral gives wrong answers; use Biot–Savart. Also note the right-hand rule: with the fingers of your right hand along the path, the enclosed current counts positive in the direction of your thumb. Sign errors here propagate into the sign of induced emfs later.
:::

## Magnetic flux, Gauss's law and the vector potential

The **magnetic flux** through a surface is $\Phi = \int_S\mathbf B\cdot\mathrm d\mathbf S$, measured in webers. Every field line we have drawn has been a closed loop, and that is no accident: the Biot–Savart field is a curl (see below), and the divergence of a curl is zero.

::: theorem Gauss's law for magnetism {#thm-gauss-b}
The magnetic flux out of any closed surface is zero:

$$
\oint_S\mathbf B\cdot\mathrm d\mathbf S = 0, \qquad \nabla\cdot\mathbf B = 0 .
$$ {#eq-divb}
:::

There are no magnetic charges ("monopoles"): no experiment has found one. Cutting a bar magnet in half gives two magnets, each with a north and a south pole. Since $\mathbf B$ is divergence-free, it can be written as the curl of another field (see [[electromagnetics/vector-analysis#thm-null]]).

::: definition Magnetic vector potential {#def-a}
The **magnetic vector potential** $\mathbf A$ (in $\mathrm{Wb/m}$) is a field with

$$
\mathbf B = \nabla\times\mathbf A .
$$

For currents in vacuum it can be chosen as

$$
\mathbf A(\mathbf r) = \int\frac{\mu_0\mathbf J(\mathbf r')}{4\pi\abs{\mathbf r - \mathbf r'}}\,\mathrm dv' \qquad\left(\text{or } \oint\frac{\mu_0I\,\mathrm d\mathbf l'}{4\pi R}\ \text{for a filament}\right),
$$ {#eq-a}

which satisfies $\nabla\cdot\mathbf A = 0$ and the vector Poisson equation $\nabla^2\mathbf A = -\mu_0\mathbf J$.
:::

Each Cartesian component of $\mathbf A$ is obtained from the corresponding component of $\mathbf J$ exactly as $V$ is from $\rho_v$, which is why [[#eq-a]] is often easier than Biot–Savart: $\mathbf A$ points along the currents. By Stokes's theorem the flux through a loop is the circulation of $\mathbf A$ round it, $\Phi = \oint\mathbf A\cdot\mathrm d\mathbf l$, a formula used constantly in computing inductance. Unlike $V$, $\mathbf A$ is not a potential energy per unit charge in statics; it becomes essential for time-varying fields and radiation ([[rf-microwave/antennas]]).

::: quiz
Which of the following could be a static magnetic flux density in a current-free region?
- [ ] $\mathbf B = x\,\mathbf a_x$
- [x] $\mathbf B = y\,\mathbf a_x + x\,\mathbf a_y$
- [ ] $\mathbf B = -y\,\mathbf a_x + x\,\mathbf a_y$
- [ ] $\mathbf B = x\,\mathbf a_x + y\,\mathbf a_y$
::: solution
A magnetostatic field must have $\nabla\cdot\mathbf B = 0$ everywhere, and in a current-free region also $\nabla\times\mathbf B = \mathbf 0$. $x\,\mathbf a_x$ and $x\,\mathbf a_x + y\,\mathbf a_y$ have divergence $1$ and $2$: they would need magnetic charge. $-y\,\mathbf a_x + x\,\mathbf a_y$ is divergence-free but has curl $2\,\mathbf a_z$, so it needs a current density. $y\,\mathbf a_x + x\,\mathbf a_y$ has zero divergence and zero curl: it is the field near the centre of a quadrupole magnet.
:::
:::

## Forces between currents

Two parallel wires carrying currents $I_1$ and $I_2$ a distance $d$ apart: the first produces $B = \mu_0I_1/(2\pi d)$ at the second, and by [[#eq-force-element]] the force per unit length on the second is

$$
\frac FL = \frac{\mu_0I_1I_2}{2\pi d} ,
$$ {#eq-wire-force}

attractive for parallel currents and repulsive for antiparallel ones. Until 2019 this equation defined the ampere: $2\times10^{-7}\,\mathrm{N/m}$ between two wires $1\,\mathrm m$ apart carrying $1\,\mathrm A$, which fixed $\mu_0 = 4\pi\times10^{-7}\,\mathrm{H/m}$ exactly. The ampere is now defined through the elementary charge, and $\mu_0$ is measured; it remains equal to $4\pi\times10^{-7}$ to better than one part in $10^9$.

::: example Short-circuit forces on busbars {#ex-busbar}
Two parallel busbars $10\,\mathrm{cm}$ apart in a switchboard carry the go and return currents of a circuit. In normal operation the current is $1\,\mathrm{kA}$; during a short circuit it can reach $20\,\mathrm{kA}$ (peak). Find the force per metre in both cases.
::: solution
The currents are antiparallel, so the force is repulsive. By [[#eq-wire-force]],

$$
\frac FL = \frac{(4\pi\times10^{-7})I^2}{2\pi(0.1)} = 2\times10^{-6}I^2\ \mathrm{N/m} .
$$

At $1\,\mathrm{kA}$ this is $2\,\mathrm{N/m}$, negligible. At $20\,\mathrm{kA}$ it is $800\,\mathrm{N/m}$, the weight of about $80\,\mathrm{kg}$ on every metre of bar, applied suddenly. The force grows as the square of the current, so switchgear is designed and type-tested for its rated peak withstand current, with bars braced by insulating supports at short intervals. (Treating the bars as thin filaments is reasonable when their spacing is large compared with their cross-section.)
:::
:::

## Magnetic materials

Electrons orbiting nuclei and spinning about their own axes are tiny current loops, each with a magnetic dipole moment. In most materials these moments cancel or respond only weakly to a field; in iron, nickel, cobalt and their alloys they align spontaneously over regions called **domains**, and an applied field can align the domains, increasing $\mathbf B$ by a factor of thousands.

::: definition Magnetisation and permeability {#def-magnetisation}
The **magnetisation** $\mathbf M$ is the magnetic dipole moment per unit volume, in $\mathrm{A/m}$. The magnetic field intensity in matter is defined by

$$
\mathbf B = \mu_0(\mathbf H + \mathbf M) .
$$

In a linear, isotropic material $\mathbf M = \chi_m\mathbf H$, with **magnetic susceptibility** $\chi_m$, so that $\mathbf B = \mu_0(1+\chi_m)\mathbf H = \mu_r\mu_0\mathbf H = \mu\mathbf H$ with **relative permeability** $\mu_r$.
:::

The aligned dipoles are equivalent to a bound current density $\mathbf J_b = \nabla\times\mathbf M$. With $\mathbf H$ defined this way, Ampère's law in matter reads $\nabla\times\mathbf H = \mathbf J$ with $\mathbf J$ the **free** current only: the current in the windings, which we control. This is the magnetic counterpart of the way $\mathbf D$ absorbs bound charge.

Materials fall into three groups:

- **Diamagnetic** ($\chi_m$ small and negative, about $-10^{-5}$): copper, silver, water, bismuth. The field slightly weakens.
- **Paramagnetic** ($\chi_m$ small and positive, $10^{-6}$ to $10^{-3}$): aluminium, platinum, oxygen.
- **Ferromagnetic** and **ferrimagnetic** ($\mu_r$ from about a hundred to over $10^5$, strongly non-linear): iron, silicon steel, nickel–iron alloys, ferrites.

For engineering purposes the first two groups have $\mu_r = 1$. Ferromagnets are described by their **$B$–$H$ curve**. Starting from a demagnetised state, $B$ rises steeply with $H$, then bends over as the domains align and the material **saturates** (about $1.6$–$2\,\mathrm T$ for silicon steel, $0.3$–$0.5\,\mathrm T$ for ferrites). Reducing $H$ does not retrace the curve: the material retains a **remanent** flux density $B_r$ at $H = 0$ and needs a reverse **coercive field** $H_c$ to demagnetise it. Cycling $H$ traces a **hysteresis loop** whose area is the energy lost as heat per cycle per unit volume. **Soft** materials (transformer steel, ferrite) have narrow loops and small $H_c$; **hard** materials (permanent magnets such as NdFeB, with $H_c$ around $10^6\,\mathrm{A/m}$) have wide ones.

::: widget plot
f: m*tanh((x + c)/w); m*tanh((x - c)/w)
x: -4, 4
y: -2, 2
sliders: c=0.5:0:2:0.05; w=0.6:0.2:2:0.05; m=1.6:0.5:2:0.05
labels: \text{decreasing } H; \text{increasing } H
caption: A simple model of a hysteresis loop: $B$ (in teslas) against $H$ (in arbitrary units), the upper branch traced as $H$ decreases and the lower as it increases. The slider $c$ sets the coercive field, $w$ the steepness and $m$ the saturation flux density. Set $c = 0$ to get an ideal soft material with no loss; widen the loop to model a permanent-magnet material, whose remanence (the crossing of the $B$-axis) is what makes it a magnet.
:::

### Boundary conditions

At the interface between two magnetic media, the same two arguments as for electrostatics (a pillbox and a thin loop, [[electromagnetics/conductors-dielectrics#thm-bc]]) applied to [[#eq-divb]] and [[#eq-ampere]] give

$$
B_{n1} = B_{n2}, \qquad \mathbf a_n\times(\mathbf H_1 - \mathbf H_2) = \mathbf K ,
$$ {#eq-mag-bc}

where $\mathbf K$ is a free surface current on the interface (usually zero, since real currents have finite thickness). With $\mathbf K = \mathbf 0$ the tangential $\mathbf H$ is continuous, and the field lines refract as $\tan\theta_1/\tan\theta_2 = \mu_1/\mu_2$.

::: example Field lines leaving iron {#ex-iron}
Inside a piece of iron with $\mu_r = 1000$, the flux density at the surface makes an angle of $85^\circ$ with the normal. At what angle does the field emerge into the air?
::: solution
$\tan\theta_{\text{air}} = \tan\theta_{\text{iron}}\cdot\mu_{\text{air}}/\mu_{\text{iron}} = \tan85^\circ/1000 = 11.43/1000 = 0.01143$, so $\theta_{\text{air}} = 0.65^\circ$. The field leaves the iron almost exactly perpendicular to the surface, even though inside it runs nearly parallel to the surface. This is why the surface of a high-permeability pole piece is nearly a "magnetic equipotential", and why the field in the air gap of a motor or relay is set by the shape of the iron faces.
:::
:::

The high permeability of iron also guides flux, much as copper guides current: a closed iron core carries nearly all the flux of a winding, which is the basis of the **magnetic circuit** model ($NI = \Phi\mathcal R$, with reluctance $\mathcal R = l/(\mu A)$) used to design transformers, inductors and machines in [[electric-machines/magnetic-circuits]].

::: application Hall-effect current sensors
A current sensor clamped round a cable must measure $\oint\mathbf H\cdot\mathrm d\mathbf l = I$ without breaking the circuit. A ferrite ring concentrates the field of the cable into a narrow air gap, where a Hall-effect element (a thin semiconductor slab in which the Lorentz force [[#eq-lorentz]] deflects the carriers and produces a voltage proportional to $B$) measures it. Because the ring integrates round the conductor, the reading is nearly independent of where the cable passes through it, which is Ampère's law at work. Closed-loop versions drive a compensating winding on the ring to null the gap field, so the ferrite never saturates and the compensating current is an accurate, isolated copy of the primary current.
:::

::: history
Hans Christian Ørsted announced in July 1820 that a current deflects a compass needle. Within months Jean-Baptiste Biot and Félix Savart measured the field of a long wire and found its $1/\rho$ dependence, and André-Marie Ampère, after demonstrating the forces between current-carrying wires in September 1820, developed a mathematical theory of electrodynamics published in its complete form in 1826. Carl Friedrich Gauss and Wilhelm Weber measured the Earth's field in absolute units in the 1830s. The circuital law in the form used today, $\oint\mathbf H\cdot\mathrm d\mathbf l = I$, was written by Maxwell in 1855–56. Pierre Weiss proposed the domain theory of ferromagnetism in 1907, and Heinrich Barkhausen detected the jumps of individual domains as clicks in a loudspeaker in 1919.
:::

## Where this leads

The static magnetic field is half of the picture. In [[electromagnetics/induction-inductance]] a *changing* flux induces an emf (Faraday's law), which gives inductance, magnetic energy and the forces in machines; the flux formulas of this chapter are the starting point for every inductance calculation. Ampère's law will need Maxwell's correction for time-varying fields in [[electromagnetics/maxwells-equations]]. The magnetic-circuit approximation and the $B$–$H$ curves of real steels are the tools of [[electric-machines/magnetic-circuits]] and [[electric-machines/transformers]].

::: summary
- The Lorentz force $\mathbf F = Q(\mathbf E + \mathbf v\times\mathbf B)$ defines $\mathbf B$ (in teslas); magnetic forces do no work on moving charges, and a current element feels $I\,\mathrm d\mathbf l\times\mathbf B$.
- The Biot–Savart law gives $\mathbf H$ from currents: $I/(2\pi\rho)$ round a long wire, $I/(2a)$ at the centre of a loop, $Ia^2/(2(a^2+z^2)^{3/2})$ on its axis.
- Ampère's law $\oint\mathbf H\cdot\mathrm d\mathbf l = I_{\text{enc}}$, or $\nabla\times\mathbf H = \mathbf J$, gives fields by symmetry: $nI$ in a solenoid, $NI/(2\pi\rho)$ in a toroid, nothing outside a coaxial cable.
- $\nabla\cdot\mathbf B = 0$: no magnetic charges, closed field lines, and $\mathbf B = \nabla\times\mathbf A$ with a vector potential that points along the currents.
- Parallel currents attract with force per length $\mu_0I_1I_2/(2\pi d)$; short-circuit forces scale as $I^2$.
- In matter $\mathbf B = \mu_0(\mathbf H + \mathbf M) = \mu\mathbf H$; ferromagnets have $\mu_r$ up to $10^5$, saturate, and show hysteresis.
- At interfaces $B_n$ is continuous and tangential $\mathbf H$ jumps by the surface current; field lines leave high-permeability iron almost normally.
:::

## Exercises

::: exercise A long wire {level=1 check="4*pi*1e-7*10/(2*pi*0.05)"}
A long straight wire carries $10\,\mathrm A$. Find $B$, in teslas, at $5\,\mathrm{cm}$ from it.
::: solution
$B = \mu_0I/(2\pi\rho) = (4\pi\times10^{-7})(10)/(2\pi\times0.05) = 4.0\times10^{-5}\,\mathrm T = 40\,\mathrm{\mu T}$, comparable with the Earth's field: one reason compasses mislead near cables.
:::
:::

::: exercise A solenoid {level=1 check="4*pi*1e-7*1000*2"}
A long solenoid has $1000$ turns per metre and carries $2\,\mathrm A$. Find $B$ inside, in teslas.
::: solution
$H = nI = 2000\,\mathrm{A/m}$ and $B = \mu_0H = 2.51\times10^{-3}\,\mathrm T$.
:::
:::

::: exercise Force on a conductor {level=1 check="0.3"}
A straight wire of length $0.5\,\mathrm m$ carrying $3\,\mathrm A$ lies perpendicular to a uniform field of $0.2\,\mathrm T$. Find the force on it in newtons.
::: solution
$F = BIL = (0.2)(3)(0.5) = 0.3\,\mathrm N$, perpendicular to both the wire and the field.
:::
:::

::: exercise Centre of a loop {level=2 check="4*pi*1e-7*1/(2*0.05)"}
Derive $H = I/(2a)$ at the centre of a circular loop directly from [[#eq-biot-savart]], and find $B$ in teslas for $a = 5\,\mathrm{cm}$, $I = 1\,\mathrm A$.
::: solution
Every element $\mathrm d\mathbf l'$ is perpendicular to the radius $\mathbf R$ to the centre, with $R = a$, so $\abs{\mathrm d\mathbf l'\times\mathbf a_R} = \mathrm dl'$ and all contributions point along the axis. Hence $H = I(2\pi a)/(4\pi a^2) = I/(2a)$ and $B = \mu_0I/(2a) = (4\pi\times10^{-7})/0.1 = 1.26\times10^{-5}\,\mathrm T$.
:::
:::

::: exercise An electron in a magnetic field {level=2 check="sqrt(2*9.1093837e-31*1000*1.602176634e-19)/(1.602176634e-19*1e-3)"}
An electron accelerated through $1\,\mathrm{kV}$ enters a uniform field $B = 1\,\mathrm{mT}$ perpendicular to its velocity. Find the radius of its path in metres and its cyclotron frequency in hertz. ($m_e = 9.109\times10^{-31}\,\mathrm{kg}$.)
::: solution
Its kinetic energy is $1\,\mathrm{keV} = 1.602\times10^{-16}\,\mathrm J$, so $v = \sqrt{2E/m} = 1.876\times10^7\,\mathrm{m/s}$ (the non-relativistic formula is accurate to about $0.2\,\%$ here). Then $r = mv/(eB) = (9.109\times10^{-31})(1.876\times10^7)/(1.602\times10^{-19}\times10^{-3}) = 0.107\,\mathrm m$, and $f_c = eB/(2\pi m) = 28.0\,\mathrm{MHz}$, independent of the speed.
:::
:::

::: exercise Flux in a toroid {level=2 check="2000*4*pi*1e-7*500*0.2*0.01*log(1.5)/(2*pi)"}
For the toroid of [[#ex-toroid]] with the ferrite core ($\mu_r = 2000$), verify the flux in webers. What are the largest and smallest flux densities in the core, and will a ferrite that saturates at $0.35\,\mathrm T$ saturate?
::: solution
$\Phi = \mu NIh\ln(b/a)/(2\pi) = 2000(4\pi\times10^{-7})(500)(0.2)(0.01)(0.4055)/(2\pi) = 1.62\times10^{-4}\,\mathrm{Wb}$. $B = \mu NI/(2\pi\rho)$ is largest at the inner radius: $2000(4\pi\times10^{-7})(100)/(2\pi\times0.04) = 1.0\,\mathrm T$, and $0.67\,\mathrm T$ at the outer radius. Both exceed $0.35\,\mathrm T$, so the core **would** saturate and the linear calculation is invalid: the real flux is far smaller. The current must be reduced to below about $0.07\,\mathrm A$ to keep the inner edge below $0.35\,\mathrm T$.
:::
:::

::: exercise Iron and air {level=2}
At a flat interface between air (region 1) and iron with $\mu_r = 500$ (region 2), the flux density in the air is $\mathbf B_1 = 0.5\,\mathbf a_x + 1.0\,\mathbf a_z\,\mathrm T$, with $\mathbf a_z$ normal to the interface and no surface current. Find $\mathbf B_2$ and $\mathbf H_2$.
::: solution
$B_n$ is continuous: $B_{z2} = 1.0\,\mathrm T$. Tangential $H$ is continuous: $H_{x1} = 0.5/\mu_0 = 3.98\times10^5\,\mathrm{A/m} = H_{x2}$, so $B_{x2} = 500\times0.5 = 250\,\mathrm T$. That is physically impossible: iron saturates near $2\,\mathrm T$. The calculation shows that a tangential field of $0.5\,\mathrm T$ in the air next to linear iron would imply an absurd tangential flux inside; in reality the iron saturates, or more usually the field in the air near iron is almost normal and its tangential component is tiny. With a realistic air field of, say, $\mathbf B_1 = 0.001\,\mathbf a_x + 1.0\,\mathbf a_z\,\mathrm T$, $\mathbf B_2 = 0.5\,\mathbf a_x + 1.0\,\mathbf a_z\,\mathrm T$ and $\mathbf H_2 = \mathbf B_2/(500\mu_0) = 796\,\mathbf a_x + 1592\,\mathbf a_z\,\mathrm{A/m}$.
:::
:::

::: exercise A finite solenoid {level=3}
A solenoid of radius $a$ extends along the $z$-axis from $z_1$ to $z_2$ and has $n$ turns per metre carrying $I$. Integrate [[#eq-loop]] over the turns to show that at a point $z$ on its axis

$$
H = \frac{nI}{2}\left(\cos\theta_2 - \cos\theta_1\right),
$$

where $\theta_1$ and $\theta_2$ are the angles between the $+z$ direction and the lines from the field point to the rims of the ends at $z_1$ and $z_2$. Find the ratio of the field at one end to that at the centre for a long solenoid.
::: hint
A slice of length $\mathrm dz'$ is a loop carrying $nI\,\mathrm dz'$. Substitute $z' - z = a\cot\theta$.
:::
::: solution
A slice at $z'$ contributes $\mathrm dH = nI\,\mathrm dz'\,a^2/(2(a^2 + (z'-z)^2)^{3/2})$. With $z' - z = a\cot\theta$ we have $\mathrm dz' = -a\csc^2\theta\,\mathrm d\theta$ and $a^2 + (z'-z)^2 = a^2\csc^2\theta$, so $\mathrm dH = -\tfrac12nI\sin\theta\,\mathrm d\theta$. As $z'$ runs from $z_1$ to $z_2$, $\theta$ runs from $\theta_1$ to $\theta_2$, and

$$
H = -\frac{nI}{2}\int_{\theta_1}^{\theta_2}\sin\theta\,\mathrm d\theta = \frac{nI}{2}\left(\cos\theta_2 - \cos\theta_1\right).
$$

At the centre of a long solenoid $\theta_2\to0$ and $\theta_1\to\pi$, giving $nI$. At the end $z = z_1$, $\theta_1 = \pi/2$ and $\theta_2\to0$, giving $\tfrac12nI$: the field at the end of a long solenoid is half its central value, because only the turns on one side contribute.
:::
:::

::: exercise The vector potential of a uniform field {level=3}
Show that $\mathbf A = \tfrac12\mathbf B_0\times\mathbf r$ gives the uniform field $\mathbf B_0 = B_0\,\mathbf a_z$, write it in cylindrical coordinates, and use $\Phi = \oint\mathbf A\cdot\mathrm d\mathbf l$ to find the flux through a circle of radius $a$ centred on the axis.
::: solution
$\tfrac12B_0\mathbf a_z\times(x\,\mathbf a_x + y\,\mathbf a_y + z\,\mathbf a_z) = \tfrac12B_0(-y\,\mathbf a_x + x\,\mathbf a_y)$, whose curl is $\tfrac12B_0(1 + 1)\,\mathbf a_z = B_0\,\mathbf a_z$. In cylindrical coordinates, $-y\,\mathbf a_x + x\,\mathbf a_y = \rho\,\mathbf a_\phi$, so $\mathbf A = \tfrac12B_0\rho\,\mathbf a_\phi$. Round the circle, $\oint\mathbf A\cdot\mathrm d\mathbf l = \tfrac12B_0a\cdot2\pi a = \pi a^2B_0$, which is $B_0$ times the area, as it must be. (Adding any gradient to $\mathbf A$ gives the same $\mathbf B$; this particular choice has $\nabla\cdot\mathbf A = 0$.)
:::
:::
