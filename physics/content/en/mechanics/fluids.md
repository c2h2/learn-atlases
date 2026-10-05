A fluid does not hold a fixed shape. Water poured from a jug takes the shape of the glass, and air fills the room it is released into. What a fluid at rest can sustain is a pressure, a push normal to every surface it touches. That pressure varies with depth, because each layer holds up the weight of the fluid above it. Once the fluid moves, mass is conserved in a pipe, so a narrowing forces the fluid to speed up, and the work done by pressure pays for the extra kinetic energy.

This chapter treats a fluid at rest, and a steady flow that is incompressible and non-viscous. Hydrostatics gives the law of depth and Archimedes' principle. Steady flow gives continuity and Bernoulli's equation, and from the latter the speed at which a tank empties through a small hole. Viscosity and the equations of a deformable continuum are left to [[continuum]]. The mechanics used here is Newton's second law, from [[mechanics/newton-laws]], and the work–energy theorem, from [[mechanics/work-energy]].

Throughout, take $g = 9.80\,\mathrm{m/s^2}$ for the weight of a fluid near the Earth. Fresh water has density $1.000\times 10^{3}\,\mathrm{kg/m^3}$. These are the numbers in every numerical example unless a problem names a different liquid.

## Density and pressure

Two definitions fix the language. Both are local: they describe what happens in a small piece of fluid, not a property of a whole lake.

::: definition Density {#def-density}
The **density** of a fluid at a point is the mass per unit volume there. If a small region around the point has volume $\Delta V$ and contains mass $\Delta m$, then

$$
\rho = \lim_{\Delta V \to 0}\frac{\Delta m}{\Delta V},
$$

provided the limit exists. In a homogeneous fluid the limit is the ordinary ratio $\rho = m/V$ of the whole sample.
:::

Mercury is about fourteen times as dense as this, so a mercury barometer is a short tube and a water barometer is a long one.

::: definition Pressure {#def-pressure}
**Pressure** is the normal force per unit area exerted across a surface in the fluid. If a small flat element of area $\Delta A$ feels a force of magnitude $\Delta F_{\perp}$ perpendicular to itself, then

$$
p = \lim_{\Delta A \to 0}\frac{\Delta F_{\perp}}{\Delta A}.
$$

The SI unit is the pascal, $1\,\mathrm{Pa} = 1\,\mathrm{N/m^2}$.
:::

A fluid at rest cannot sustain a shear: layers pulling sideways on each other would accelerate. The argument below shows that the magnitude of the normal force depends only on the area, not on which way the surface faces.

::: theorem Isotropy of pressure {#thm-pascal}
In a fluid at rest, the pressure at a given point is independent of the orientation of the surface on which it is measured. The force on a small flat element of area $\mathrm{d}A$ has magnitude $p\,\mathrm{d}A$ and is directed along the normal to the element. Pascal's name is attached to this fact and to its consequence that an extra pressure applied to an enclosed fluid is transmitted through it.
:::

::: proof
Consider a small right triangular prism inside the fluid. In cross-section the triangle has a hypotenuse of length $c$ inclined at an angle $\theta$ to the horizontal, so the horizontal side has length $c\cos\theta$ and the vertical side has length $c\sin\theta$. Let the prism extend a distance $L$ perpendicular to this cross-section. Write $p_s$, $p_h$ and $p_v$ for the pressures on the slanted face, the horizontal face and the vertical face.

The areas are $cL$ on the slant, $cL\cos\theta$ on the horizontal face, and $cL\sin\theta$ on the vertical face. Because the fluid is at rest, the vector sum of all forces on the prism vanishes, and so does the sum in each direction separately.

Horizontally, the weight does not contribute. The outward normal to the slanted face is tilted by $\theta$ from the vertical, so the force on that face, magnitude $p_s\, cL$, has a horizontal component $p_s\, cL\sin\theta$. It balances the force $p_v\, cL\sin\theta$ on the vertical face:

$$
p_v\, cL\sin\theta = p_s\, cL\sin\theta.
$$

For $\theta$ not equal to zero or a straight angle, $cL\sin\theta$ cancels and $p_v = p_s$. The pressure on the vertical face equals the pressure on the slanted face.

Vertically, the same resolution contributes $p_s\, cL\cos\theta$ from the slanted face, the horizontal face contributes $p_h\, cL\cos\theta$, and the weight $\rho g$ times the volume $\tfrac{1}{2}(c\cos\theta)(c\sin\theta)L$ also acts. Dividing the vertical balance through by the area scale $cL$, the pressure terms stay finite while the weight contribution is proportional to $c$. Now shrink the prism, keeping its angles fixed, so that $c \to 0$ and $L \to 0$. The weight per unit area tends to zero, and the vertical balance reduces to $p_h = p_s$.

Thus $p_h = p_v = p_s$. The angle $\theta$ was arbitrary, so the pressure at the point does not depend on the direction of the normal. A direction-dependent pressure would leave a vanishingly small prism with a finite net force per unit area, and the fluid would not stay at rest.
:::

Pressure is therefore a function of position alone. On a curved wall one still integrates $p\,\mathrm{d}A$, each contribution along the local normal. An extra pressure applied to an enclosed liquid at rest is transmitted undiminished, because the differences between points are fixed by the weights of the columns, which have not changed.

## Hydrostatic equilibrium

A fluid at rest under gravity cannot have the same pressure at every height. The pressure on the lower face of a slab must exceed the pressure on the upper face by enough to cancel the slab's weight. The coordinate $z$ points vertically upward.

::: theorem Hydrostatic pressure {#thm-hydrostatic}
In a fluid at rest in a uniform gravitational field of magnitude $g$, with $z$ upward,

$$
\deriv{p}{z} = -\rho g.
$$ {#eq-hydro}

If the density is constant, the pressure at depth $h$ below a free surface on which the pressure is $p_0$ is

$$
p = p_0 + \rho g h.
$$ {#eq-depth}
:::

::: proof
Isolate a vertical column of fluid of horizontal cross-section $A$, between heights $z$ and $z + \dd z$. The pressure on the bottom face pushes up with force $p(z)\, A$. The pressure on the top face pushes down with force $p(z + \dd z)\, A$. The weight $mg$ acts downward. For a thin slice the mass is $\rho A\,\dd z$, whether or not $\rho$ varies with height, so the weight is $\rho g A\,\dd z$, evaluated at the slice.

Horizontal forces from the surrounding fluid cancel by symmetry, or equivalently by [[#thm-pascal]] applied to the vertical sides. Vertical equilibrium then requires

$$
p(z)\, A = p(z + \dd z)\, A + \rho g A\,\dd z.
$$

Cancel $A$, rearrange, and divide by $\dd z$:

$$
\frac{p(z + \dd z) - p(z)}{\dd z} = -\rho g.
$$

The left-hand side tends to $\deriv{p}{z}$ as $\dd z \to 0$, which is [[#eq-hydro]]. Pressure falls as one goes upward.

If $\rho$ is constant, integrate from a height $z$ up to a reference height $z_0$:

$$
\int_{p(z)}^{p(z_0)}\dd p = -\rho g\int_z^{z_0}\dd z',
$$

so $p(z_0) - p(z) = -\rho g\,(z_0 - z)$, or

$$
p(z) = p(z_0) + \rho g\,(z_0 - z).
$$

Let the reference be the free surface, where $p(z_0) = p_0$, and let $h = z_0 - z$ be the depth of the point below that surface. Then $p = p_0 + \rho g h$.
:::

At a given depth the pressure is the same in a narrow tube and in a lake, when both are open to the same surface pressure and filled with the same fluid. The volume of the container does not enter.

The pressure $p_0$ on an open surface is atmospheric pressure, about $1.013\times 10^{5}\,\mathrm{Pa}$ at sea level. Instruments and divers often report the excess over the atmosphere rather than the full amount.

::: example Gauge and absolute pressure at two metres {#ex-depth}
Fresh water of density $\rho = 1.000\times 10^{3}\,\mathrm{kg/m^3}$ stands at a depth of $2.00\,\mathrm{m}$ in an open tank. Find the gauge pressure at that depth, and the absolute pressure.
::: solution
[[#eq-depth]] with the atmospheric part removed is the gauge pressure:

$$
p_{\mathrm{gauge}} = \rho g h = (1.000\times 10^{3})(9.80)(2.00) = 1.960\times 10^{4}\,\mathrm{Pa}.
$$

The arithmetic is $1000\times 9.80 = 9.80\times 10^{3}$, and times $2.00$ is $1.960\times 10^{4}$. The absolute pressure includes the atmosphere pushing on the free surface,

$$
p_{\mathrm{abs}} = p_{\mathrm{atm}} + \rho g h \approx 1.013\times 10^{5} + 1.960\times 10^{4} = 1.209\times 10^{5}\,\mathrm{Pa}.
$$

Gauge pressure is the excess over the local atmosphere; absolute pressure includes it. The two differ by $p_{\mathrm{atm}}$ and must not be substituted for one another.
:::
:::

The same column of water that produces $1.960\times 10^{4}\,\mathrm{Pa}$ over two metres would produce one atmosphere, $1.013\times 10^{5}\,\mathrm{Pa}$, over a height

$$
h_{\mathrm{atm}} = \frac{1.013\times 10^{5}}{(1.000\times 10^{3})(9.80)} = 10.3\,\mathrm{m}.
$$

If the density varies with height, [[#eq-hydro]] still holds and [[#eq-depth]] does not. For water at ordinary depths the constant-density law is the right tool.

## Buoyancy

Pressure increases with depth, so the force on the bottom of a submerged body exceeds the force on the top. The difference is an upward **buoyant force**.

Consider first a solid cylinder of height $H$ and cross-sectional area $A$, fully submerged, with its axis vertical, in a fluid of constant density $\rho$. Let the pressure at the level of the top face be $p_{\mathrm{top}}$. By [[#eq-depth]] the pressure on the bottom face is greater by $\rho g H$:

$$
p_{\mathrm{bottom}} = p_{\mathrm{top}} + \rho g H.
$$

The vertical force on the top face is downward and equals $p_{\mathrm{top}} A$. The vertical force on the bottom face is upward and equals $p_{\mathrm{bottom}} A$. Horizontal forces on the curved wall cancel in opposite pairs. The net force from the fluid is therefore upward and has magnitude

$$
F_b = (p_{\mathrm{top}} + \rho g H)A - p_{\mathrm{top}} A = \rho g (A H).
$$

The volume of the cylinder is $AH$, so $\rho\, AH$ is the mass of fluid that would occupy the same region, and $\rho g\, AH$ is the weight of that fluid. The buoyant force equals the weight of the displaced fluid. The top pressure cancelled: the result does not depend on how deep the cylinder sits, only on its volume and on the density of the fluid.

The cylinder was a convenience. The same balance holds for a body of any shape, and for a body that is only partly under the surface.

::: theorem Archimedes' principle {#thm-archimedes}
A body wholly or partly immersed in a fluid at rest experiences a buoyant force equal to the weight of the fluid displaced by the body. The force is upward, along the line of action through the centre of mass of the displaced fluid. A body floating in equilibrium displaces a weight of fluid equal to its own weight.
:::

::: proof
Replace the submerged part of the body, in imagination, by fluid of the same kind as the surrounding fluid. Call that imaginary portion the displaced fluid; its volume is the volume of the body that lies below the free surface. This portion, were it really fluid, would be at rest along with everything around it. The forces on it are its weight, acting downward, and the pressure forces from the neighbouring fluid, acting over its boundary.

Those pressure forces are completely determined by the pressure in the surrounding fluid. They do not depend on what material lies inside the boundary. Their resultant must cancel the weight of the displaced fluid, because that fluid is in equilibrium. The resultant is therefore upward and equal to the weight of the displaced fluid.

The real body presents the same boundary to the same fluid, so it feels the same pressure forces and the same resultant. That resultant is the buoyant force. If the body is only partly submerged, the displaced volume is the submerged volume, and the argument is unchanged: the imaginary fluid fills only the region below the free surface.

For a floating body in equilibrium the total force vanishes, so the body displaces a weight of fluid equal to its own weight.
:::

The floating condition determines how much of the body sits under the surface. Let the body have volume $V$ and density $\rho_b$, and let the fluid have density $\rho$. If a fraction $f$ of the volume is submerged, the displaced weight is $\rho (f V) g$ and the body's weight is $\rho_b V g$. Equilibrium requires $\rho f = \rho_b$, so

$$
f = \frac{\rho_b}{\rho},
$$

provided this fraction is at most $1$. If $\rho_b < \rho$ the body floats with that fraction submerged. If $\rho_b > \rho$, even full submersion displaces less than the body's weight, and the body sinks. Density decides, not the total weight.

::: example A wooden block in water {#ex-wood}
Wood of density $600\,\mathrm{kg/m^3}$ floats in fresh water. What fraction of its volume is submerged?
::: solution
Water has density $1.000\times 10^{3}\,\mathrm{kg/m^3}$. The floating fraction is the ratio of densities:

$$
f = \frac{600}{1.000\times 10^{3}} = 0.600.
$$

So $60.0\%$ of the volume is submerged. A deeper push displaces more than the block's weight, and the block rises back.
:::
:::

A steel ship floats by the same principle. Steel is denser than water, and a solid piece of it sinks, but the ship displaces the volume enclosed by the submerged hull, including the air inside, and that displaced water weighs as much as the ship. Flood the hold and the displaced volume shrinks towards the volume of the steel; the buoyant force falls and the ship sinks.

::: quiz
A rowing boat sits in a swimming pool, and a dense iron anchor lies in the bottom of the boat. The anchor is thrown overboard and sinks. What happens to the water level of the pool?
- [ ] It rises, because the anchor is now in the water.
- [ ] It stays the same, because the anchor's weight has not changed.
- [x] It falls, because the anchor displaces less water when sunk than it did while riding in the boat.
- [ ] It falls only if the anchor is hollow.
::: solution
In the boat the anchor is part of a floating system, so it causes a displaced volume $m/\rho_{\mathrm{water}}$. Sunk, it displaces only its own volume $m/\rho_{\mathrm{iron}}$. Iron is denser than water, so the pool's displaced volume falls.
:::
:::

## Steady flow: continuity and Bernoulli

A flow is **steady** when the velocity at each fixed point does not change with time, even though a given particle may speed up as it travels. A **streamline** is a curve tangent to the velocity. In a steady flow the particles travel along streamlines.

::: theorem Continuity {#thm-continuity}
In a steady flow of an incompressible fluid through a tube, the volume flux is the same at every cross-section. If $A$ is the cross-sectional area and $v$ is the speed of the fluid normal to that cross-section, then

$$
A_1 v_1 = A_2 v_2.
$$ {#eq-continuity}
:::

Incompressible means that a given mass keeps a fixed volume, so the density is constant along the flow. Water in ordinary pipes does. Air does not, once the speed is an appreciable fraction of the speed of sound, and [[#eq-continuity]] then needs a further check.

::: proof
Consider the fluid that, in a short time $\Delta t$, crosses a section of area $A_1$ where the speed is $v_1$. The fluid just upstream moves a distance $v_1\Delta t$, so the volume that enters is $A_1 v_1\Delta t$. At a second section the volume that leaves in the same time is $A_2 v_2\Delta t$.

In a steady incompressible flow the volume stored between the two sections does not change, so volume in equals volume out:

$$
A_1 v_1\Delta t = A_2 v_2\Delta t.
$$

Cancel $\Delta t$. The volume per unit time, $Av$, is the same at every section of the tube. Where the pipe narrows, $A$ falls and $v$ rises in the same proportion.
:::

::: example A pipe that narrows {#ex-pipe}
A pipe of circular cross-section narrows from a diameter of $4.00\,\mathrm{cm}$ to a diameter of $2.00\,\mathrm{cm}$. Water flows at $1.00\,\mathrm{m/s}$ in the wide section. Find the speed in the narrow section.
::: solution
Area scales with the square of the diameter. The ratio of diameters is $4.00/2.00 = 2$, so the ratio of areas is

$$
\frac{A_1}{A_2} = 2^2 = 4.
$$

Continuity requires $A_1 v_1 = A_2 v_2$, hence

$$
v_2 = v_1\frac{A_1}{A_2} = (1.00)(4) = 4.00\,\mathrm{m/s}.
$$

:::
:::

The change of speed is paid for by pressure, and by gravity if the tube rises or falls. The balance is Bernoulli's equation, under the hypotheses stated with it.

::: theorem Bernoulli's equation {#thm-bernoulli}
Along a streamline in a steady flow of an incompressible, non-viscous fluid, in a uniform gravitational field and with no pump, fan or turbine doing work on the fluid between the two stations,

$$
p + \frac{1}{2}\rho v^2 + \rho g h = \text{constant}.
$$ {#eq-bernoulli}

Here $h$ is the height of the streamline, measured upward.
:::

::: proof
Follow a narrow stream-tube from a station $1$ to a station $2$. In a time $\Delta t$ a volume $\Delta V = A_1 v_1\Delta t$ enters at station $1$. By [[#thm-continuity]] the volume that leaves at station $2$ in the same time is the same $\Delta V$, and because the density is constant the mass that enters equals the mass that leaves: $\Delta m = \rho\,\Delta V$.

The fluid behind the entrance pushes the stream-tube forward. The force is $p_1 A_1$ and the displacement is $v_1\Delta t$, so the work done on the fluid in the tube is $p_1 A_1 v_1\Delta t = p_1\Delta V$. At the exit the fluid in the tube pushes the fluid ahead of it, doing work $p_2\Delta V$ on that downstream fluid, which means the work done *on* the contents of the tube at the exit is $-p_2\Delta V$. No other work is done: viscosity is absent, so there is no drag along the wall, and there is no pump. The net work on the fluid that occupies the tube during $\Delta t$ is

$$
W = (p_1 - p_2)\,\Delta V.
$$

In steady flow the energy stored between the two stations does not change with time. The effect of the interval $\Delta t$ is to remove a mass $\Delta m$ at station $1$, carrying kinetic energy $\tfrac{1}{2}(\rho\Delta V) v_1^2$ and gravitational potential energy $(\rho\Delta V) g h_1$, and to add an equal mass at station $2$ with kinetic energy $\tfrac{1}{2}(\rho\Delta V) v_2^2$ and potential energy $(\rho\Delta V) g h_2$. The work–energy theorem, in the form used in [[mechanics/work-energy]], equates the net work done on the fluid to its gain in mechanical energy:

$$
(p_1 - p_2)\,\Delta V = \frac{1}{2}\rho\Delta V\,(v_2^2 - v_1^2) + \rho\Delta V\, g (h_2 - h_1).
$$

Divide through by $\Delta V$ and rearrange every term belonging to station $1$ onto the left and every term belonging to station $2$ onto the right:

$$
p_1 + \frac{1}{2}\rho v_1^2 + \rho g h_1 = p_2 + \frac{1}{2}\rho v_2^2 + \rho g h_2.
$$

The common value is constant along the streamline. A neighbouring streamline may carry a different constant, because the derivation never compared two tubes.
:::

On a horizontal streamline, $p + \tfrac{1}{2}\rho v^2$ is constant, so the faster fluid has the lower pressure. This is the opposite of a common guess, that a narrowing squeezes the fluid and raises the pressure. The higher pressure is upstream, where it pushes the fluid into the narrowing and pays for the extra speed.

::: example Pressure in the narrow section {#ex-venturi}
Return to the pipe of [[#ex-pipe]]: water, $\rho = 1.000\times 10^{3}\,\mathrm{kg/m^3}$, speeds $v_1 = 1.00\,\mathrm{m/s}$ and $v_2 = 4.00\,\mathrm{m/s}$, and no change of height. Find $p_2 - p_1$.
::: solution
[[#eq-bernoulli]] at equal heights reduces to $p_1 + \tfrac{1}{2}\rho v_1^2 = p_2 + \tfrac{1}{2}\rho v_2^2$, so

$$
p_2 - p_1 = \frac{1}{2}\rho (v_1^2 - v_2^2) = \frac{1}{2}(1.000\times 10^{3})\bigl(1.00^2 - 4.00^2\bigr).
$$

The difference of squares is $1 - 16 = -15$, and half of $1000$ is $500$, so

$$
p_2 - p_1 = 500\times (-15) = -7.50\times 10^{3}\,\mathrm{Pa}.
$$

The narrow, fast section is at the lower pressure, by $7.50\,\mathrm{kPa}$.
:::
:::

::: intuition Pressure as a store of speed
Along a level streamline, $p$ and $\tfrac{1}{2}\rho v^2$ share a fixed budget. Speeding the fluid up spends pressure, and slowing it down pays pressure back. A pump adds to the budget, and viscosity spends some of it as heat.
:::

## Efflux from a tank

A tank open to the air, with a small hole at depth $d$ below the free surface, uses both flow theorems at once. The surface is nearly at rest and at atmospheric pressure. The jet, once clear of the wall, is also at atmospheric pressure, and lower by $d$.

::: corollary Torricelli's law {#cor-torricelli}
A tank is open to the atmosphere, and a small hole is opened at depth $d$ below the free surface. If the surface itself is almost at rest, the speed of the escaping liquid is

$$
v = \sqrt{2 g d},
$$ {#eq-torricelli}

independent of the density of the liquid.
:::

::: proof
Apply [[#eq-bernoulli]] between a point on the free surface and a point in the jet just outside the hole. At the surface, $p_1 = p_{\mathrm{atm}}$, $v_1 \approx 0$ and we may take the height to be $h_1 = d$ above the hole. At the jet, $p_2 = p_{\mathrm{atm}}$, the speed is $v$, and $h_2 = 0$. Then

$$
p_{\mathrm{atm}} + 0 + \rho g d = p_{\mathrm{atm}} + \frac{1}{2}\rho v^2 + 0.
$$

The atmospheric terms cancel, and so does $\rho$, provided $\rho \neq 0$:

$$
g d = \frac{1}{2} v^2, \qquad v = \sqrt{2 g d}.
$$

The result is identical to the speed a body acquires in falling freely through a height $d$ from rest, which is the work–energy result of [[mechanics/work-energy]]. The liquid at the hole has traded the potential energy of the surface for kinetic energy, with the pressure doing no net work because it takes the same value at both ends.
:::

The density cancels because a denser liquid is harder to accelerate and is pushed by a proportionally larger pressure difference $\rho g d$.

::: example A hole at a depth of $1.20\,\mathrm{m}$ {#ex-torricelli}
Find the efflux speed from a small hole $1.20\,\mathrm{m}$ below the free surface of an open tank.
::: solution
[[#eq-torricelli]] with $g = 9.80\,\mathrm{m/s^2}$ gives

$$
v = \sqrt{2 \times 9.80 \times 1.20} = \sqrt{23.52} = 4.8497\,\mathrm{m/s}.
$$

To three significant figures, $v = 4.85\,\mathrm{m/s}$. The density was not required. If the hole is not small, the surface drops and the approximation fails; an exercise makes the correction.
:::
:::

::: widget hydro
H: 2
d: 1.2
rho: 1000
caption: The tank is filled to H = 2 m and the hole is a depth d = 1.2 m below the surface. Compare the pressure readout with ρ g d and the exit speed with sqrt(2 g d).
:::

The figure uses $g = 9.80\,\mathrm{m/s^2}$. At the preset, $\rho g d = (1000)(9.80)(1.2) = 1.176\times 10^{4}\,\mathrm{Pa}$ and the efflux speed is $4.85\,\mathrm{m/s}$. The fill height $H$ does not enter either formula. As the tank drains, $d$ falls and so does $v$.

::: warning Where Bernoulli's equation does not apply
[[#eq-bernoulli]] does not cross a pump, a propeller, or a length of pipe in which viscosity dissipates a noticeable amount of energy. The sum $p + \tfrac{1}{2}\rho v^2 + \rho g h$ then changes from one station to the other. Continuity still holds for incompressible flow in those cases: it counts volume, not energy, and the pressure drop is larger than Bernoulli's equation predicts.

Gauge pressure and absolute pressure must not be mixed inside one application. If both ends are open to the same atmosphere, the atmospheric terms cancel and gauge pressures may be used on both sides. Using absolute pressure at one end and gauge pressure at the other inserts a spurious atmosphere of order $10^{5}\,\mathrm{Pa}$.
:::

::: history
Archimedes, in *On Floating Bodies*, written about 250 BC, proved that a floating body displaces its own weight of fluid, and that a submerged body is buoyed by the weight of the fluid it displaces.

Evangelista Torricelli in 1643 invented the mercury barometer: a glass tube, closed at one end, filled with mercury and upended in a dish, stands with a column whose height measures the pressure of the air. The same investigation produced the law of efflux, that the speed from a hole matches the speed of a body fallen through the depth of the hole. Blaise Pascal organised the Puy de Dôme experiment in 1648, in which his brother-in-law Florin Périer carried a barometer up the mountain and found that it read lower at the summit than at the base. The atmosphere has weight, and [[#eq-hydro]] describes it.

Daniel Bernoulli's *Hydrodynamica* (1738) related the pressure in a moving fluid to its speed. The streamline equation in this chapter is the later, sharper form of that idea: steady, incompressible, non-viscous, and with no pump, so that the constant really is constant.
:::

## Where this leads

[[continuum]] puts viscosity back in and arrives at the Navier–Stokes equation. Bernoulli's equation is what that equation gives along a streamline when the viscosity is zero and the flow is steady, and $\deriv{p}{z} = -\rho g$ is the equilibrium case. The derivations above are the mechanics of [[mechanics/newton-laws]] and [[mechanics/work-energy]]: a free-body diagram of a slice, and a work–energy balance on the fluid that enters one end of a stream-tube and leaves the other.

::: summary
- Density is mass per unit volume. Pressure is the normal force per unit area. In a fluid at rest the pressure at a point does not depend on the orientation of the surface ([[#thm-pascal]]).
- Vertical equilibrium of a slice gives $\deriv{p}{z} = -\rho g$. For constant density, $p = p_0 + \rho g h$ with $h$ the depth. Gauge pressure omits the atmosphere; absolute pressure includes it.
- At a depth of $2.00\,\mathrm{m}$ in fresh water the gauge pressure is $1.960\times 10^{4}\,\mathrm{Pa}$. One atmosphere of water is a column about $10.3\,\mathrm{m}$ tall.
- The buoyant force equals the weight of the displaced fluid, whether or not the body is fully submerged. A floating body displaces its own weight. Wood of density $600\,\mathrm{kg/m^3}$ floats with $60\%$ of its volume submerged; a steel ship floats because the displaced volume includes the air inside the hull.
- Steady incompressible flow conserves volume flux: $A_1 v_1 = A_2 v_2$. Halving the diameter of a circular pipe multiplies the speed by four.
- Along a streamline, if the flow is steady, incompressible and non-viscous and no machine does work, $p + \tfrac{1}{2}\rho v^2 + \rho g h$ is constant. At fixed height the faster section has the lower pressure.
- A small hole at depth $d$ in an open tank discharges at $\sqrt{2gd}$, independent of density, the same speed a free fall through $d$ would give. The formula fails when the hole is not small enough for the surface to stay almost at rest.
:::

## Exercises

::: exercise Gauge pressure at eight metres {level=1 check="1000*9.8*8"}
Find the gauge pressure at a depth of $8.00\,\mathrm{m}$ in fresh water of density $1.000\times 10^{3}\,\mathrm{kg/m^3}$. Take $g = 9.80\,\mathrm{m/s^2}$.
::: solution
[[#eq-depth]], measured from the atmosphere, gives the gauge pressure directly:

$$
p_{\mathrm{gauge}} = \rho g h = (1.000\times 10^{3})(9.80)(8.00) = 7.840\times 10^{4}\,\mathrm{Pa}.
$$

Adding atmospheric pressure, about $1.013\times 10^{5}\,\mathrm{Pa}$, would give the absolute pressure, which is not what the question asks for.
:::
:::

::: exercise A threefold reduction in diameter {level=1 check="0.4*(6/2)^2"}
Water flows at $0.400\,\mathrm{m/s}$ in a circular pipe of diameter $6.00\,\mathrm{cm}$. The pipe narrows to a diameter of $2.00\,\mathrm{cm}$. Find the speed in the narrow section.
::: solution
The ratio of diameters is $6.00/2.00 = 3$, so the ratio of areas is $3^2 = 9$. Continuity, [[#eq-continuity]], requires the speed to rise by that factor:

$$
v_2 = 0.400 \times 9 = 3.60\,\mathrm{m/s}.
$$

Equivalently, $v_2 = v_1 (d_1/d_2)^2$.
:::
:::

::: exercise Efflux from five metres down {level=1 check="sqrt(2*9.8*5)"}
An open tank has a small hole $5.00\,\mathrm{m}$ below the free surface. Find the ideal efflux speed. Take $g = 9.80\,\mathrm{m/s^2}$.
::: solution
Torricelli's law, [[#eq-torricelli]], gives

$$
v = \sqrt{2 g d} = \sqrt{2\times 9.80\times 5.00} = \sqrt{98} = 9.89949\,\mathrm{m/s}.
$$

To three significant figures, $v = 9.90\,\mathrm{m/s}$. The density does not appear. The same number is the speed gained in a free fall through $5.00\,\mathrm{m}$.
:::
:::

::: exercise A denser timber {level=2 check="850/1000"}
A block of timber of density $850\,\mathrm{kg/m^3}$ floats in fresh water of density $1.000\times 10^{3}\,\mathrm{kg/m^3}$. What fraction of its volume is submerged?
::: solution
In floating equilibrium the weight of the timber equals the weight of the water it displaces. If a fraction $f$ of the volume $V$ is under water,

$$
(850)\, V g = (1.000\times 10^{3})\,(f V)\, g.
$$

Cancel $V g$:

$$
f = \frac{850}{1000} = 0.850.
$$

The block rides lower than the wood of [[#ex-wood]]. A density above $1000\,\mathrm{kg/m^3}$ would leave no fraction $f \le 1$ able to balance the weight, and the block would sink.
:::
:::

::: exercise A pressure difference from two speeds {level=2 check="0.5*1000*(1.2^2-3.6^2)"}
Water flows horizontally, without friction, at $1.20\,\mathrm{m/s}$ in a wide section of pipe and at $3.60\,\mathrm{m/s}$ in a narrow section. Find $p_{\mathrm{narrow}} - p_{\mathrm{wide}}$. Take $\rho = 1.000\times 10^{3}\,\mathrm{kg/m^3}$.
::: solution
Heights cancel in [[#eq-bernoulli]], leaving

$$
p_n - p_w = \frac{1}{2}\rho\bigl(v_w^2 - v_n^2\bigr) = \frac{1}{2}(1000)\bigl(1.20^2 - 3.60^2\bigr).
$$

The squares are $1.44$ and $12.96$, so the difference of squares is $-11.52$. Half of $1000$ times that difference is

$$
p_n - p_w = 500\times (-11.52) = -5.760\times 10^{3}\,\mathrm{Pa}.
$$

The narrow section is at the lower pressure. The sign is negative because the question asks for narrow minus wide.
:::
:::

::: exercise Where the jet lands {level=2 check="2*sqrt(0.5*1.5)"}
A tank is filled to a height $H = 2.00\,\mathrm{m}$ above the floor. A small hole is opened in the wall at depth $d = 0.500\,\mathrm{m}$ below the free surface, so the hole is $1.50\,\mathrm{m}$ above the floor. The jet comes out horizontally. How far from the wall does it strike the floor? Take $g = 9.80\,\mathrm{m/s^2}$, and assume the surface is almost at rest.
::: hint
The horizontal speed is the Torricelli speed at depth $d$. The time to fall a height $H - d$ from rest, vertically, is the usual free-fall time. The range is the product, and $g$ cancels.
:::
::: solution
The efflux speed is $v = \sqrt{2 g d}$, horizontal. The vertical motion after the jet leaves the wall is free fall through a height $y = H - d = 1.50\,\mathrm{m}$, starting with zero vertical speed, so the time of flight satisfies $y = \tfrac{1}{2} g t^2$ and $t = \sqrt{2y/g}$. The horizontal range is

$$
R = v t = \sqrt{2 g d}\cdot\sqrt{\frac{2y}{g}} = 2\sqrt{d\, y} = 2\sqrt{(0.500)(1.50)} = 2\sqrt{0.750} = 1.73205\,\mathrm{m}.
$$

Neither the density nor $g$ survives in the product: a stronger field speeds the jet and shortens the fall by compensating factors. Air resistance is neglected.
:::
:::

::: exercise A hole that is not small {level=3 check="sqrt(2*9.8*2/(1-0.2^2))"}
A tank has a free surface of area $A$ and a hole of area $a$ at depth $d$ below the surface. Both the surface and the jet are open to the same atmosphere. Let the surface descend at speed $v_s$ and the jet leave at speed $v$. Use continuity and Bernoulli's equation to show that

$$
v = \sqrt{\frac{2 g d}{1 - (a/A)^2}},
$$

provided $a < A$. Then take $a/A = 0.200$ and $d = 2.00\,\mathrm{m}$, and compute $v$. Take $g = 9.80\,\mathrm{m/s^2}$.
::: hint
Continuity gives $A v_s = a v$, because the volume leaving the surface in a short time equals the volume leaving the hole. Bernoulli's equation between the surface and the jet still has atmospheric pressure at both ends, but $v_s$ is no longer zero.
:::
::: solution
In a time $\Delta t$ the surface drops a distance $v_s\Delta t$, so the volume lost from the tank is $A v_s\Delta t$. The same volume leaves through the hole as $a v\Delta t$. For an incompressible liquid these are equal:

$$
A v_s = a v, \qquad v_s = \frac{a}{A} v.
$$

Apply [[#eq-bernoulli]] between the surface and the jet. The pressures are both atmospheric, and the surface is a height $d$ above the hole:

$$
p_{\mathrm{atm}} + \frac{1}{2}\rho v_s^2 + \rho g d = p_{\mathrm{atm}} + \frac{1}{2}\rho v^2.
$$

Cancel $p_{\mathrm{atm}}$ and $\rho$, and substitute $v_s$:

$$
g d = \frac{1}{2}\left(v^2 - v_s^2\right) = \frac{1}{2} v^2\left(1 - \left(\frac{a}{A}\right)^2\right).
$$

Solving for the jet speed,

$$
v = \sqrt{\frac{2 g d}{1 - (a/A)^2}}.
$$

If $a \ll A$ the formula returns to Torricelli's law, and the derivation needs $a < A$ so that the quantity under the square root is positive. For $a/A = 0.200$ and $d = 2.00\,\mathrm{m}$,

$$
v = \sqrt{\frac{2\times 9.80\times 2.00}{1 - 0.200^2}} = \sqrt{\frac{39.2}{0.960}} = \sqrt{40.8333} = 6.38931\,\mathrm{m/s}.
$$

The pure Torricelli speed at the same depth is $\sqrt{39.2} = 6.261\,\mathrm{m/s}$. The finite hole raises the speed by about two percent, because the surface is already moving.
:::
:::

::: exercise The depth that throws the jet farthest {level=3}
A tank is filled to a height $H$ above a horizontal floor, and a small hole is drilled in the vertical wall at a depth $d$ below the free surface, with $0 < d < H$. The jet emerges horizontally and strikes the floor. Show that the horizontal distance from the wall to the landing point is

$$
R = 2\sqrt{d\,(H - d)},
$$

and that the greatest reachable distance is $R = H$, attained when the hole is halfway down, at $d = H/2$. For a tank with $H = 1.80\,\mathrm{m}$, state that greatest distance and the depth at which it occurs.
::: hint
The time to fall a height $H - d$ is $\sqrt{2(H-d)/g}$, and the horizontal speed is $\sqrt{2gd}$. Multiply, and simplify, before differentiating with respect to $d$. The product $d(H-d)$ is a quadratic opening downwards.
:::
::: solution
The efflux speed is $v = \sqrt{2gd}$, horizontal, by [[#cor-torricelli]], the hole being small. The jet must still fall a height $y = H - d$ to reach the floor. Starting with no vertical velocity,

$$
H - d = \frac{1}{2} g t^2, \qquad t = \sqrt{\frac{2(H - d)}{g}}.
$$

The range is the horizontal distance travelled at constant speed $v$ during that time:

$$
R = vt = \sqrt{2gd}\cdot\sqrt{\frac{2(H-d)}{g}} = 2\sqrt{d(H-d)}.
$$

The factor $g$ cancels, as it did in the numerical range problem. To maximise $R$ it is enough to maximise the quantity under the square root, $f(d) = d(H - d) = Hd - d^2$, since the square root is an increasing function. Then

$$
\deriv{f}{d} = H - 2d.
$$

The derivative vanishes at $d = H/2$, and the second derivative $-2$ is negative, so this critical point is a maximum. At that depth

$$
R = 2\sqrt{\frac{H}{2}\cdot\frac{H}{2}} = 2\cdot\frac{H}{2} = H.
$$

At $d = 0$ the jet has no speed, and at $d = H$ it has no height left to fall, so $R = 0$ at both ends. For $H = 1.80\,\mathrm{m}$ the greatest range is $1.80\,\mathrm{m}$, at depth $d = 0.900\,\mathrm{m}$.
:::
:::
