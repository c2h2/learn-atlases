A charge at rest fills the space around it with an electric field. [[electrostatics/coulomb]] gives the force between two point charges, and [[electrostatics/electric-field]] turns that force into a field you can draw. Computing the field of anything larger than a point, by adding up every contribution, is an integral with a direction attached to each piece. For a sphere, a long straight wire or a flat sheet the integral can be done, but the symmetry is doing most of the work and the coordinates are doing the rest. Gauss's law is that symmetry, written as a statement about the flux of $\mathbf{E}$ through a closed surface. The law is equivalent to Coulomb's law for charges at rest. Used in the right direction, it returns the field without an integration over the source.

The equivalence runs both ways, and the two directions must not be blurred. From Coulomb's law we will prove the flux law, first for a point charge at the centre of a sphere, where the $r^2$ in the denominator cancels the area, and then for a general closed surface. From the flux law, together with a symmetry argument that says what $\mathbf{E}$ is allowed to look like, we will recover the field of a uniform ball, a spherical shell, an infinite line and an infinite sheet, and the field just outside a conductor. Throughout, the charges are at rest in vacuum. The constants are

$$
k = \frac{1}{4\pi\eps_0} = 8.9875517923\times 10^{9}\,\mathrm{N\,m^2/C^2}, \qquad \eps_0 = 8.854187817\times 10^{-12}\,\mathrm{C^2/(N\,m^2)}.
$$

These two given values agree to about one part in $10^{9}$, well past any digit kept below. Where a formula is written with $k$ we evaluate it with $k$; where it is written with $\eps_0$ we evaluate it with $\eps_0$.

## Electric flux

Field lines are a picture. Flux is the corresponding number: how much of the field crosses a chosen surface. Take a flat patch of area $A$ and a uniform field $\mathbf{E}$. Only the component perpendicular to the patch crosses it. If $\theta$ is the angle between $\mathbf{E}$ and the normal you have chosen, that component is $E\cos\theta$.

::: definition Electric flux {#def-flux}
The **electric flux** through a surface $S$ is

$$
\Phi_E = \int_S \mathbf{E}\cdot\dd\mathbf{A},
$$ {#eq-flux}

where $\dd\mathbf{A} = \hat{\mathbf{n}}\,\dd A$ and $\hat{\mathbf{n}}$ is a chosen unit normal. For a closed surface the normal is the outward one, and the integral is written $\oint$. The SI unit is the newton metre squared per coulomb, $\mathrm{N\,m^2/C}$, which is the same as a volt metre.
:::

If $\mathbf{E}$ is uniform and the surface is flat, [[#eq-flux]] collapses to $\Phi_E = EA\cos\theta$. Parallel to the surface, $\theta = 90^\circ$ and the flux is zero: the field runs along the patch and does not cross it. Antiparallel to the normal, $\cos\theta$ is negative and so is the flux. Negative flux is not a negative field. It means the field points against the normal you chose.

A uniform field of magnitude $250\,\mathrm{N/C}$ crosses a flat rectangle of area $0.0400\,\mathrm{m^2}$. The angle between the field and the normal is $60^\circ$, so $\cos 60^\circ = 1/2$ and

$$
\Phi_E = (250)(0.0400)\left(\tfrac12\right) = 5.00\,\mathrm{N\,m^2/C}.
$$

Turn the rectangle edge-on to the field and the same numbers give zero. Nothing about $\mathbf{E}$ has changed. Flux is a statement about a field and a surface together.

On a curved surface, or in a field that varies, cut the surface into patches small enough that each one is nearly flat and $\mathbf{E}$ is nearly constant on it. [[#eq-flux]] adds $\mathbf{E}\cdot\dd\mathbf{A}$ over the patches. For a closed surface, point $\hat{\mathbf{n}}$ outward. A positive charge inside then gives positive flux, and a negative charge gives negative flux. Flux is not the field strength: a large weak field through a large area can match a strong field through a small area. That trade is the inverse-square law, and it is the next calculation.

::: intuition Flux counts crossings, with a sign
Imagine a small positive test charge carried by the field. On a closed surface, each exit along the outward normal contributes positively and each entry contributes negatively. If as many lines enter as leave, the net flux is zero even though the field on the surface is not. A uniform field through a closed box is the model case: whatever enters one face leaves through another, and the total is zero. Gauss's law will say that this happens precisely when the box encloses no charge.
:::

## Gauss's law

::: theorem Gauss's law in vacuum {#thm-gauss}
Let $S$ be any closed surface in vacuum, and let $Q_{\mathrm{encl}}$ be the total charge in the interior of $S$. If every charge is at rest, the outward flux of the electric field through $S$ is

$$
\oint_S \mathbf{E}\cdot\dd\mathbf{A} = \frac{Q_{\mathrm{encl}}}{\eps_0}.
$$ {#eq-gauss}

Charges outside $S$ contribute nothing to the flux. They do contribute to $\mathbf{E}$ at points of $S$.
:::

::: proof
The proof starts from Coulomb's law and uses superposition. It is enough to treat point charges, because a smooth distribution is a limit of point charges.

Place a single point charge $q$ at the centre of a sphere of radius $r$. Coulomb's law gives a field of magnitude $E = \abs{q}/(4\pi\eps_0 r^2)$, radial, outward if $q > 0$. On the sphere, $\mathbf{E}$ is parallel to the outward area element and constant in magnitude, so

$$
\oint \mathbf{E}\cdot\dd\mathbf{A} = E\cdot 4\pi r^2 = \frac{1}{4\pi\eps_0}\frac{q}{r^2}\cdot 4\pi r^2 = \frac{q}{\eps_0}.
$$

The $r^2$ in the area cancels the $r^2$ in the denominator. The flux is $q/\eps_0$ for a sphere of any radius. That cancellation is the inverse-square law written as a conservation statement: the same bundle of field lines crosses every sphere centred on the charge.

Now let the surface be an arbitrary closed surface, still with $q$ inside, and assume first that every ray from $q$ meets the surface exactly once. A narrow cone of solid angle $\dd\Omega$ from the charge cuts out a patch of area $\dd A$. If $\theta$ is the angle between the outward normal and the radius drawn from the charge, the relation between patch and cone is $\dd A\cos\theta = r^2\,\dd\Omega$. The flux through the patch is

$$
\mathbf{E}\cdot\dd\mathbf{A} = \frac{1}{4\pi\eps_0}\frac{q}{r^2}\cos\theta\,\dd A = \frac{q}{4\pi\eps_0}\,\dd\Omega.
$$

The $r^2$ cancels again, so the flux through the patch depends on the cone and not on where the surface sits along the cone. Integrating over all directions, the full solid angle about a point is $4\pi$, and

$$
\oint \mathbf{E}\cdot\dd\mathbf{A} = \frac{q}{4\pi\eps_0}\cdot 4\pi = \frac{q}{\eps_0}.
$$

If the surface is folded, so that some rays meet it several times, each exit contributes a positive $\dd\Omega$ and each entry a negative one. An interior point has one more exit than entry along every ray, and the signed solid angles still total $4\pi$. The flux remains $q/\eps_0$.

If instead $q$ lies outside $S$, every ray that meets the surface does so an even number of times, entering and leaving. Each pair subtends the same $\abs{\dd\Omega}$ with opposite signs of $\mathbf{E}\cdot\dd\mathbf{A}$, and the pairs cancel. The net flux is zero.

For several point charges the field is the vector sum of the individual fields, and the flux of a sum is the sum of the fluxes. Interior charges contribute their own $q_i/\eps_0$. Exterior charges contribute zero. Therefore the flux equals $Q_{\mathrm{encl}}/\eps_0$. A continuous distribution is included by cutting it into small pieces and passing to the limit: $Q_{\mathrm{encl}}$ is the integral of $\rho\,\dd V$ over the interior, plus any surface charge on the interior side of $S$.
:::

The argument used Coulomb's law at every step, so for charges at rest [[#thm-gauss]] and Coulomb's law are the same statement. The converse needs symmetry. A point charge is unchanged by any rotation about itself, so $\mathbf{E}$ is radial and its magnitude depends only on $r$. [[#eq-gauss]] on a sphere of radius $r$ then says $E\cdot 4\pi r^2 = q/\eps_0$, which is Coulomb's law. One direction computes a flux from a known field. The other computes a field from a known flux, and it needs an independent reason to take $E$ outside the integral.

The equivalence uses charges at rest. In the later Maxwell theory the flux of $\mathbf{E}$ through a closed surface is still $Q_{\mathrm{encl}}/\eps_0$ when charges move, while the field of a moving charge is not the instantaneous Coulomb field. That extension is not used below. The divergence theorem, in [[math-methods/integral-theorems]], rewrites the flux as a volume integral, and [[#eq-gauss]] becomes $\divg\mathbf{E} = \rho/\eps_0$ where the field is smooth. The calculations in this chapter use the integral form.

## What symmetry must supply

[[#eq-gauss]] is one scalar equation. The unknown $\mathbf{E}$ is a vector function. One equation cannot produce that function unless symmetry has already reduced it to a single unknown number, constant on the surface you chose.

Three patterns cover the standard problems.

- **Spherical.** The source depends only on the distance from one point. Then $\mathbf{E}$ is radial, and its magnitude depends only on $r$. A concentric sphere is the Gaussian surface. $E$ comes out of the integral, the area is $4\pi r^2$, and $E = Q_{\mathrm{encl}}/(4\pi\eps_0 r^2)$.
- **Cylindrical.** The source is an infinite straight line, or an infinite cylinder, uniform along its length and around its axis. Then $\mathbf{E}$ is perpendicular to the axis, and its magnitude depends only on the perpendicular distance. A coaxial cylinder has flux only through its curved wall.
- **Planar.** The source is an infinite flat sheet, uniform. Then $\mathbf{E}$ is perpendicular to the sheet, and its magnitude depends only on the distance from the sheet. A pillbox straddling the sheet has flux only through its two ends.

If the charge distribution has none of these symmetries, Gauss's law is still true and still useless for finding $E$. A cube around a single off-centre charge has flux $q/\eps_0$, and the field on the faces varies from point to point. You cannot divide the flux by the area of the cube and call the quotient the field. The same warning applies to a dipole, and we will come back to it.

The Gaussian surface is yours to choose. It is not a physical boundary. Choose it so that symmetry makes $\mathbf{E}\cdot\hat{\mathbf{n}}$ constant, or zero, on each piece.

## Spherical charge distributions

The gravitational shell theorem in [[mechanics/gravitation]] has an electrical twin, and the proof is the flux argument rather than a direct integration.

::: theorem Field of a spherical charge distribution {#thm-sphere}
Let the charge density be spherically symmetric about a point $O$, and write $Q(r)$ for the charge inside radius $r$. The field is radial. Its magnitude at distance $r$ from $O$ is

$$
E(r) = \frac{1}{4\pi\eps_0}\frac{Q(r)}{r^2},
$$ {#eq-sphere-out}

directed outward if $Q(r) > 0$. In particular:

- Outside a sphere of total charge $Q$ and radius $R$, whether the charge is spread through the volume, spread on the surface, or arranged in any other spherical way, $E = kQ/r^2$ for $r \ge R$, as if the whole charge sat at the centre.
- Inside a thin shell of radius $R$ carrying charge $Q$ uniformly, $Q(r) = 0$ for $r < R$, so $E = 0$.
- Inside a ball of radius $R$ carrying charge $Q$ with uniform density, $Q(r) = Q\, r^3/R^3$, and

$$
E(r) = \frac{1}{4\pi\eps_0}\frac{Q r}{R^3} \qquad (r \le R).
$$ {#eq-sphere-in}
:::

::: proof
Spherical symmetry forces $\mathbf{E}$ to be radial and of constant magnitude on any sphere centred at $O$. There is no preferred transverse direction, and there is no preferred direction that would let a tangential component survive. Apply [[#eq-gauss]] to the sphere of radius $r$:

$$
E(r)\cdot 4\pi r^2 = \frac{Q(r)}{\eps_0},
$$

which is [[#eq-sphere-out]]. The sign convention is that $E(r) > 0$ means outward.

For a thin shell, a Gaussian sphere with $r < R$ lies entirely in the hollow interior and encloses no charge, so $E = 0$ there. A Gaussian sphere with $r > R$ encloses $Q$, so the exterior field is $kQ/r^2$.

For a uniform ball the density is the constant $\rho = Q\big/\bigl(\tfrac{4}{3}\pi R^3\bigr)$. The charge inside radius $r \le R$ is density times volume,

$$
Q(r) = \rho\cdot\tfrac{4}{3}\pi r^3 = Q\frac{r^3}{R^3}.
$$

Substitute into [[#eq-sphere-out]] and simplify to obtain [[#eq-sphere-in]]. At $r = R$ the interior and exterior expressions agree: both give $kQ/R^2$. The field of a volume distribution is continuous at the surface. The field of a thin shell is not: it is zero just inside and $kQ/R^2$ just outside.
:::

The zero inside a shell is a cancellation, not an absence of contributions. Every patch produces a field; [[#thm-gauss]] is why the patches add to nothing. Dent the shell, or move off centre, and the flux through an interior surface is still zero when it encloses no charge, but $E$ need not vanish, because the symmetry that took $E$ out of the integral has gone. [[#eq-sphere-in]] grows linearly with $r$. At the centre every direction is equivalent, so $\mathbf{E}$ has nowhere to point. Halfway out, the enclosed charge is one eighth of $Q$ and the Gaussian area is one quarter of the full sphere's area, so the field is half the surface field.

::: example A uniformly charged ball {#ex-ball}
A sphere of radius $R = 0.100\,\mathrm{m}$ carries a total charge $Q = 4.00\,\mathrm{nC}$ spread uniformly through its volume. Find the electric field magnitude at $r = 0.0500\,\mathrm{m}$, at the surface, and at $r = 0.200\,\mathrm{m}$.
::: solution
Outside, and on the surface, [[#eq-sphere-out]] applies with the whole charge. With $kQ = (8.9875517923\times 10^{9})(4.00\times 10^{-9}) = 35.95020717\,\mathrm{N\,m^2/C}$,

$$
\begin{aligned}
E(R) &= \frac{kQ}{R^2} = \frac{35.95020717}{0.0100} = 3595.02\,\mathrm{N/C}, \\
E(0.200\,\mathrm{m}) &= \frac{kQ}{(0.200)^2} = \frac{35.95020717}{0.0400} = 898.755\,\mathrm{N/C}.
\end{aligned}
$$

At the interior point the enclosed charge is not $Q$. The fraction of the volume inside $r = R/2$ is $(1/2)^3 = 1/8$, so $Q_{\mathrm{encl}} = 5.00\times 10^{-10}\,\mathrm{C}$. [[#eq-sphere-in]] gives

$$
E(0.0500\,\mathrm{m}) = \frac{kQ r}{R^3} = \frac{35.95020717\times 0.0500}{0.00100} = 1797.51\,\mathrm{N/C}.
$$

To three significant figures, which is what $4.00\,\mathrm{nC}$ and the three lengths support, the fields are $1.80\times 10^{3}\,\mathrm{N/C}$ inside, $3.60\times 10^{3}\,\mathrm{N/C}$ at the surface and $899\,\mathrm{N/C}$ at $0.200\,\mathrm{m}$. The direction is radially outward at each of these points.

For these two radii the interior field is exactly twice the field at $0.200\,\mathrm{m}$: the outer point is at $2R$, so its field is $E(R)/4$, while $r = R/2$ gives $E(R)/2$. The flux through the Gaussian sphere at $0.0500\,\mathrm{m}$ is $Q_{\mathrm{encl}}/\eps_0 = 56.47\,\mathrm{N\,m^2/C}$, and dividing by $4\pi r^2$ returns the same $1.798\times 10^{3}\,\mathrm{N/C}$.
:::
:::

## An infinite line

::: proposition Field of an infinite line charge {#prop-line}
An infinite straight line carrying a uniform charge $\lambda$ per unit length produces a field perpendicular to the line. At perpendicular distance $r$ the magnitude is

$$
E = \frac{\lambda}{2\pi\eps_0 r} = \frac{2k\lambda}{r},
$$ {#eq-line}

directed away from the line if $\lambda > 0$.
:::

::: proof
The source is unchanged by translation along the line, by rotation about the line, and by reflection through any plane perpendicular to the line. The field can therefore have no component along the line and no component around it, and its magnitude can depend only on the perpendicular distance $r$.

Take a Gaussian cylinder of radius $r$ and finite length $L$, coaxial with the line. On the curved wall $\mathbf{E}$ is perpendicular to the wall and constant, so the flux is $E\cdot 2\pi r L$. On each end the outward normal is parallel to the line while $\mathbf{E}$ is perpendicular to the line, so $\mathbf{E}\cdot\dd\mathbf{A} = 0$. The enclosed charge is $\lambda L$. [[#eq-gauss]] reads

$$
E\cdot 2\pi r L = \frac{\lambda L}{\eps_0}.
$$

Cancel $L$, which is arbitrary, and solve to obtain [[#eq-line]]. The length $L$ had to cancel: the infinite line has no preferred origin along itself, so the field cannot know how long a cylinder was drawn.
:::

The same formula holds outside any infinitely long uniform cylinder, with $\lambda$ the charge per unit length of the whole cylinder. Inside a hollow cylindrical shell, $E = 0$. Inside a uniform solid cylinder of radius $R$, $E = (\lambda r)/(2\pi\eps_0 R^2)$. A laboratory wire is not infinite: use [[#eq-line]] only at a perpendicular distance small compared with the length, and not too near either end.

::: example Field beside a charged wire {#ex-line}
A long straight wire carries $\lambda = 2.00\,\mathrm{nC/m}$. Find the field magnitude $5.00\,\mathrm{cm}$ from the wire.
::: solution
The distance is small compared with any ordinary length of wire, so [[#eq-line]] applies. Substitute $r = 0.0500\,\mathrm{m}$:

$$
E = \frac{2k\lambda}{r} = \frac{2(8.9875517923\times 10^{9})(2.00\times 10^{-9})}{0.0500} = 719.004\,\mathrm{N/C}.
$$

To three significant figures the field is $719\,\mathrm{N/C}$, directed away from the wire if $\lambda > 0$. Doubling the distance halves the field, a slower fall than $1/r^2$, because charge remains off to either side as you move away.
:::
:::

## An infinite sheet

::: proposition Field of an infinite sheet {#prop-sheet}
An infinite plane sheet carrying a uniform charge $\sigma$ per unit area produces a field perpendicular to the sheet. On either side the magnitude is

$$
E = \frac{\sigma}{2\eps_0},
$$ {#eq-sheet}

independent of the distance from the sheet, and directed away from the sheet on both sides if $\sigma > 0$.
:::

::: proof
Translation and rotation in the plane leave the source unchanged, so $\mathbf{E}$ is perpendicular to the sheet and its magnitude depends only on the distance from the sheet. Reflection through the sheet sends one side to the other. For $\sigma > 0$ the field points away from the sheet on both sides: the normal component flips when you cross the sheet, and the magnitudes at equal distances match.

Draw a Gaussian pillbox that crosses the sheet, with end caps of area $A$ parallel to the sheet and at equal distances on the two sides. On the curved side wall the outward normal is parallel to the sheet while $\mathbf{E}$ is perpendicular to it, so the side flux vanishes. Each cap contributes $E A$, with the same $E$ because the caps sit at equal distances, and both contributions are outward. The enclosed charge is $\sigma A$. [[#eq-gauss]] reads

$$
2EA = \frac{\sigma A}{\eps_0},
$$

so $E = \sigma/(2\eps_0)$. The distance of the caps never entered, so the magnitude, which symmetry allowed to depend on distance, is a constant. The same pillbox applies outside a thick slab: $\sigma$ is then the charge per unit area of the whole slab.
:::

Each cap is a place where symmetry already makes $\mathbf{E}$ uniform and perpendicular, so $E$ may leave the integral. The algebra then forces that value to be independent of how far apart the caps are. Far from the sheet each piece of charge is weaker, but a wider portion of the sheet contributes, and for an inverse-square field the two effects cancel. A finite plate keeps the cancellation only near the middle, at distances small compared with its width. Near an edge [[#eq-sheet]] does not apply.

::: example Field of a charged nonconducting sheet {#ex-sheet}
A large nonconducting sheet carries $\sigma = 8.00\,\mathrm{nC/m^2}$. Find the field magnitude on either side, far from the edges.
::: solution
[[#eq-sheet]] is the idealisation of that region:

$$
E = \frac{\sigma}{2\eps_0} = \frac{8.00\times 10^{-9}}{2\times 8.854187817\times 10^{-12}} = 451.764\,\mathrm{N/C}.
$$

To three significant figures, $E = 452\,\mathrm{N/C}$, pointing away from the sheet on both sides. A point charge with the same $8.00\,\mathrm{nC}$ would have a field of this size only at one particular distance, and the field would fall if you stepped back. The sheet does not give you that option. The factor $2$ in the denominator is the signature of a sheet that has field on both sides. A conducting surface, treated in the next section, has field on one side only, and the $2$ is absent.
:::
:::

::: widget plot
f: 1/x^2
x: 0.2, 3
caption: The curve is the shape of a point-charge field, falling as 1/r². A uniform infinite sheet is not on the plot: Gauss's law makes its field a horizontal line, the same at every distance. Change the window if you want to see how fast 1/x² drops, and keep that horizontal line in mind as the comparison.
:::

::: quiz
A point charge sits at the centre of a cubic Gaussian surface. Which statement is correct?
- [ ] The flux is zero, because the field on opposite faces cancels.
- [ ] The field has the same magnitude at every point of the cube, so the flux equals that magnitude times the surface area.
- [x] The flux equals $q/\eps_0$, but the field is not constant on a face, so the flux alone does not give the magnitude of $\mathbf{E}$.
- [ ] Gauss's law applies only to spheres, so it says nothing about the cube.
::: solution
[[#thm-gauss]] applies to every closed surface. The cube encloses $q$, so the outward flux is $q/\eps_0$ whatever the shape. Symmetry of a cube about its centre does make the six faces equivalent, and each then carries flux $q/(6\eps_0)$. It does not make $E$ constant on a face: the corners of a face are farther from the charge than the middle of the face. You may not divide $q/(6\eps_0)$ by the area of a face and call the result $E$. The opposite-faces story would cancel the flux only if the charge were absent, or if the field were uniform, as it is for an empty box in a uniform field.
:::
:::

## Conductors in electrostatics

A conductor contains charges that are free to move. In electrostatics they have finished moving. That single sentence fixes the field inside the material, the place where excess charge can sit, and the field immediately outside.

::: theorem Electrostatics of a conductor {#thm-conductor}
In electrostatic equilibrium, in vacuum:

- $\mathbf{E} = \mathbf{0}$ at every point inside the conducting material.
- Any excess charge resides on the surfaces of the conductor.
- Just outside the surface, $\mathbf{E}$ is perpendicular to the surface and has magnitude

$$
E = \frac{\sigma}{\eps_0},
$$ {#eq-conductor}

pointing outward if the local surface charge density $\sigma$ is positive.
:::

::: proof
If $\mathbf{E}$ were nonzero at a point inside the material, a free charge there would feel a force $q\mathbf{E}$ and would accelerate. Equilibrium means that has stopped, so $\mathbf{E} = \mathbf{0}$ throughout the material. The conclusion is about the material, not about a hollow cavity carved out of it. A cavity is not made of conductor.

To locate the excess charge, draw any Gaussian surface that lies entirely inside the material and encloses whatever interior region you are asking about. On that surface $\mathbf{E} = \mathbf{0}$, so the flux is zero, so $Q_{\mathrm{encl}} = 0$ by [[#eq-gauss]]. No net charge can sit in the bulk, and no net charge can sit on the wall of an empty cavity either: a Gaussian surface embedded in the material and wrapped around the cavity encloses zero. Excess charge is pushed to the outer surface. If a cavity does contain a charge $q$, the same Gaussian surface requires the total charge on the cavity wall to be $-q$, and the outer surface then carries the rest.

For the field just outside, draw a pillbox with one cap of area $A$ just outside the surface, the other cap just inside the material, and sides short enough that their flux is negligible. The inner cap contributes nothing, because $\mathbf{E} = \mathbf{0}$ there. The outer cap, if it is small enough that $\sigma$ and $\mathbf{E}$ are nearly uniform on it, contributes $E_{\perp} A$. The enclosed charge is $\sigma A$. [[#eq-gauss]] gives $E_{\perp} = \sigma/\eps_0$.

The parallel component vanishes for a different reason. The static field has zero circulation around every closed loop; the proof from Coulomb's law is in [[electrostatics/potential]], and we use only the conclusion here. Run a thin rectangular loop with one long side just outside the surface, parallel to it, and the return side inside the material. The inside contribution is zero. The ends are vanishingly short. Zero circulation then forces the parallel component just outside to be zero. The field is perpendicular, and [[#eq-conductor]] is its magnitude.
:::

Compare [[#eq-conductor]] with [[#eq-sheet]]. A nonconducting sheet produces $\sigma/(2\eps_0)$ on each side; a conducting surface produces $\sigma/\eps_0$ on the outside and nothing inside. A local patch behaves like a sheet and contributes $\sigma/(2\eps_0)$ to either side. The rest of the conductor's charges add another $\sigma/(2\eps_0)$ just outside and cancel the patch just inside. The jump in the normal component is $\sigma/\eps_0$ in both problems. The factor of two is about how many sides carry a field, not about a disagreement in the flux law.

::: corollary Charge and field of a cavity {#cor-cavity}
Let a conductor in electrostatic equilibrium contain a cavity. If the cavity holds no charge, the total charge on the cavity wall is zero. If in addition the static field has zero circulation, then $\mathbf{E} = \mathbf{0}$ throughout that empty cavity. If instead the cavity holds a point charge $q$, the wall carries total charge $-q$.
:::

::: proof
The statement about the wall charge was proved with the Gaussian surface in [[#thm-conductor]]. For the field in an empty cavity, suppose a field line ran from a point $A$ on the wall to a point $B$ on the wall. Along that line, travelling with the field, $\int_A^B \mathbf{E}\cdot\dd\mathbf{l} > 0$. The path from $B$ back to $A$ through the conducting material contributes nothing, because $\mathbf{E} = \mathbf{0}$ there. The closed loop would have a nonzero circulation. A static Coulomb field does not allow that, so no such field line exists and $\mathbf{E} = \mathbf{0}$ in the cavity. The spherical shell of [[#thm-sphere]] is the case in which symmetry gives the same conclusion with no appeal to circulation: the empty interior of a uniform shell has $E = 0$ by Gauss's law alone.
:::

Put $q$ at the centre of a neutral spherical shell and the regions separate cleanly. The cavity field, away from the charge, is $kq/r^2$. The field in the metal is zero, the wall holds $-q$, and the outer surface holds $+q$, so the exterior field is the point-charge field of $q$.

::: example A point charge inside a neutral shell {#ex-cavity}
A neutral spherical conducting shell has inner radius $a = 3.00\,\mathrm{cm}$ and outer radius $b = 5.00\,\mathrm{cm}$. A point charge $q = +4.00\,\mathrm{nC}$ is placed at the centre. Find the field at $r = 2.00\,\mathrm{cm}$, inside the metal, just outside the outer surface, and at $r = 10.0\,\mathrm{cm}$. Find the charge and the surface density on each surface.
::: solution
The cavity is not empty, so the zero-field result for an empty shell does not apply inside it. For $r < a$ the Gaussian sphere encloses only $q$, and symmetry makes the field radial, so

$$
E(0.0200\,\mathrm{m}) = \frac{kq}{(0.0200)^2} = \frac{(8.9875517923\times 10^{9})(4.00\times 10^{-9})}{4.00\times 10^{-4}} = 8.98755\times 10^{4}\,\mathrm{N/C}.
$$

To three significant figures, $8.99\times 10^{4}\,\mathrm{N/C}$, radially outward.

Inside the metal, $a < r < b$, [[#thm-conductor]] gives $\mathbf{E} = \mathbf{0}$. The Gaussian surface embedded in the metal encloses zero net charge, so the inner surface carries $-q = -4.00\,\mathrm{nC}$. The shell is neutral, so the outer surface carries $+4.00\,\mathrm{nC}$. The densities, charge divided by the spherical areas $4\pi a^2$ and $4\pi b^2$, are

$$
\sigma_a = -3.537\times 10^{-7}\,\mathrm{C/m^2}, \qquad \sigma_b = 1.273\times 10^{-7}\,\mathrm{C/m^2}.
$$

Just outside the outer surface, and anywhere beyond it, the enclosed charge is $q$, so the field is the point-charge field of $q$:

$$
\begin{aligned}
E(b) &= \frac{kq}{b^2} = 1.43801\times 10^{4}\,\mathrm{N/C}, \\
E(0.100\,\mathrm{m}) &= \frac{kq}{(0.100)^2} = 3595.02\,\mathrm{N/C}.
\end{aligned}
$$

To three significant figures, $1.44\times 10^{4}\,\mathrm{N/C}$ at the outer surface and $3.60\times 10^{3}\,\mathrm{N/C}$ at $10.0\,\mathrm{cm}$. [[#eq-conductor]] reproduces the outer-surface value, since $\sigma_b/\eps_0 = 1.438\times 10^{4}\,\mathrm{N/C}$, and it does not give the field in the cavity.
:::
:::

::: warning Flux fixes the enclosed charge, not the field
The flux through a closed surface depends on $Q_{\mathrm{encl}}$ and on nothing else. The field on that surface depends on every charge in the problem, inside or outside. Setting the flux equal to $Q_{\mathrm{encl}}/\eps_0$ is always legitimate in vacuum. Taking $E$ outside the integral is legitimate only when symmetry has already made $\mathbf{E}$ constant in magnitude on each piece of the surface and either perpendicular to that piece or parallel to it.

A cube drawn around an electric dipole is the standard counter-example. The dipole's total charge is zero, so [[#eq-gauss]] says the flux is zero. The field on the faces is not zero. It leaves through some parts of the surface and enters through others, and the signed contributions cancel. Zero flux is not the same sentence as zero field. Dividing zero flux by the area of the cube and concluding that $E = 0$ is the mistake the symmetry test is there to prevent.
:::

::: history
Carl Friedrich Gauss developed the relation between the flux of a field and the source enclosed by a surface around 1835, in the course of his work on inverse-square attraction. The argument was not printed then. It appeared in 1867, in his collected works, after his death. The statement used in this chapter is the integral law in vacuum, [[#eq-gauss]]. The same geometry, for gravity, is older: Newton's shell theorem already says that a spherical shell exerts no force inside and acts as a point mass outside. Gauss's step was to make the flux the primary object, so that one argument covers electricity and gravitation together. The differential form $\divg\mathbf{E} = \rho/\eps_0$ is a later packaging of the same law, once the divergence theorem was in common use.
:::

## Where this leads

[[electrostatics/potential]] integrates these fields to a scalar. A conductor, already a region of vanishing field, is therefore an equipotential. Capacitance is two such surfaces held at a fixed potential difference, and the parallel-plate field is [[#eq-conductor]].

::: summary
- Electric flux is $\Phi_E = \int \mathbf{E}\cdot\dd\mathbf{A}$. For a closed surface the normal points outward, and outward flux is positive ([[#def-flux]], [[#eq-flux]]).
- In vacuum, for charges at rest, the outward flux through any closed surface equals $Q_{\mathrm{encl}}/\eps_0$ ([[#thm-gauss]], [[#eq-gauss]]). This is equivalent to Coulomb's law. Exterior charges contribute to $\mathbf{E}$ and not to the flux.
- Symmetry must reduce $\mathbf{E}$ to a single constant on the Gaussian surface before the flux law can be solved for that constant. Without symmetry the law is true and does not give $E$.
- A spherical charge distribution produces $E = kQ(r)/r^2$. Outside, it acts as a point charge. A uniform shell has $E = 0$ inside. A uniform ball has $E = kQr/R^3$ inside ([[#thm-sphere]]).
- An infinite line produces $E = \lambda/(2\pi\eps_0 r)$. An infinite nonconducting sheet produces $E = \sigma/(2\eps_0)$ on each side, independent of distance ([[#eq-line]], [[#eq-sheet]]).
- Inside the material of a conductor in equilibrium, $\mathbf{E} = \mathbf{0}$, so excess charge sits on the surfaces. Just outside, $E = \sigma/\eps_0$, perpendicular to the surface ([[#thm-conductor]]).
- A cavity wall carries total charge $-q$ if the cavity contains $q$, and zero if it does not. An empty cavity in electrostatics has $\mathbf{E} = \mathbf{0}$. A cube around a dipole has zero flux and a nonzero field.
:::

## Exercises

::: exercise Flux of a few nanocoulombs {level=1 check="4e-9/8.854187817e-12"}
A closed surface encloses a total charge $4.00\,\mathrm{nC}$. There are other charges outside the surface. Find the outward electric flux through the surface, in $\mathrm{N\,m^2/C}$.
::: solution
[[#eq-gauss]] uses the enclosed charge only. The exterior charges change the field from point to point on the surface and do not change the flux:

$$
\Phi_E = \frac{Q_{\mathrm{encl}}}{\eps_0} = \frac{4.00\times 10^{-9}}{8.854187817\times 10^{-12}} = 451.764\,\mathrm{N\,m^2/C}.
$$

To three significant figures the flux is $452\,\mathrm{N\,m^2/C}$, outward. The shape of the surface was never needed.
:::
:::

::: exercise Field of a line, a little farther out {level=1 check="2*8.9875517923e9*5e-9/0.1"}
An infinite line carries $\lambda = 5.00\,\mathrm{nC/m}$. Find the field magnitude at perpendicular distance $r = 0.100\,\mathrm{m}$, in $\mathrm{N/C}$.
::: solution
[[#eq-line]] gives

$$
E = \frac{2k\lambda}{r} = \frac{2(8.9875517923\times 10^{9})(5.00\times 10^{-9})}{0.100} = 898.755\,\mathrm{N/C}.
$$

To three significant figures, $E = 899\,\mathrm{N/C}$, directed away from the line.
:::
:::

::: exercise The same sheet, on a conductor {level=1 check="8e-9/8.854187817e-12"}
A conducting surface in electrostatic equilibrium carries a local surface density $\sigma = 8.00\,\mathrm{nC/m^2}$. Find the field magnitude just outside the surface, in $\mathrm{N/C}$.
::: solution
[[#eq-conductor]] applies, not the nonconducting-sheet formula. The field inside the material is zero, and just outside

$$
E = \frac{\sigma}{\eps_0} = \frac{8.00\times 10^{-9}}{8.854187817\times 10^{-12}} = 903.527\,\mathrm{N/C}.
$$

To three significant figures, $E = 904\,\mathrm{N/C}$, perpendicular to the surface and outward. [[#ex-sheet]] used the same value of $\sigma$ on a nonconducting sheet and found half of this, $451.8\,\mathrm{N/C}$, because that sheet has a field on both sides. The densities match; the geometries do not.
:::
:::

::: exercise Where the interior field matches the outer one {level=2 check="0.1^3/0.2^2"}
The ball of [[#ex-ball]] has radius $R = 0.100\,\mathrm{m}$ and uniform charge. At $r = 0.200\,\mathrm{m}$ the field has some magnitude. At what interior radius, in metres, does the field have that same magnitude?
::: hint
Set $kQr/R^3$ equal to $kQ/(0.200)^2$ and cancel $kQ$. The charge and Coulomb's constant are irrelevant once the two radii are fixed.
:::
::: solution
For $r \le R$, [[#eq-sphere-in]] gives $E = kQr/R^3$. At $0.200\,\mathrm{m}$, which is outside, $E = kQ/(0.200)^2$. Equating them,

$$
\frac{r}{R^3} = \frac{1}{(0.200)^2}, \qquad r = \frac{R^3}{(0.200)^2} = \frac{(0.100)^3}{0.0400} = 0.0250\,\mathrm{m}.
$$

The radius is $2.50\,\mathrm{cm}$. It lies inside the ball, so the interior formula was the right one to use. At this radius the enclosed fraction of the charge is $(0.0250/0.100)^3 = 1/64$, and the Gaussian area is smaller than the area at $0.200\,\mathrm{m}$ by the same factor $(0.0250/0.200)^2 = 1/64$, so the fields match. In [[#ex-ball]] the field at $0.0500\,\mathrm{m}$ was twice the field at $0.200\,\mathrm{m}$, not equal to it; equality needs a smaller interior radius.
:::
:::

::: exercise Two infinite sheets of opposite charge {level=2 check="5e-9/8.854187817e-12"}
Two infinite nonconducting sheets are parallel. One carries $\sigma = +5.00\,\mathrm{nC/m^2}$ and the other carries $-\sigma$. Find the field magnitude in the region between them, in $\mathrm{N/C}$.
::: hint
Superpose [[#eq-sheet]] for each sheet. Between the sheets the two fields point the same way; outside they point opposite ways.
:::
::: solution
Each sheet produces a field of magnitude $\sigma/(2\eps_0)$, pointing away from the positive sheet on both of its sides and towards the negative sheet on both of its sides.

Between the sheets those two directions agree: away from the positive sheet is towards the negative sheet. The magnitudes add:

$$
E_{\mathrm{between}} = \frac{\sigma}{2\eps_0} + \frac{\sigma}{2\eps_0} = \frac{\sigma}{\eps_0} = \frac{5.00\times 10^{-9}}{8.854187817\times 10^{-12}} = 564.705\,\mathrm{N/C}.
$$

To three significant figures, $E = 565\,\mathrm{N/C}$, from the positive sheet towards the negative sheet. Outside either sheet the two contributions cancel, so the field is zero. The same $\sigma/\eps_0$ is what [[#eq-conductor]] gives for conducting plates carrying $\sigma$.
:::
:::

::: exercise Just outside a charged metal sphere {level=2 check="8.9875517923e9*2e-9/0.05^2"}
An isolated solid metal sphere of radius $R = 5.00\,\mathrm{cm}$ carries a total charge $Q = 2.00\,\mathrm{nC}$. Find the field magnitude just outside the surface, in $\mathrm{N/C}$.
::: hint
In equilibrium the excess charge is on the surface and the field outside a spherical conductor is the point-charge field. [[#eq-conductor]] is a second route to the same number, once $\sigma = Q/(4\pi R^2)$ is known.
:::
::: solution
The field inside the metal is zero, and there is no cavity. Outside, spherical symmetry and [[#thm-sphere]] give the point-charge field of the total charge. Just outside the surface,

$$
E = \frac{kQ}{R^2} = \frac{(8.9875517923\times 10^{9})(2.00\times 10^{-9})}{(0.0500)^2} = 7190.04\,\mathrm{N/C}.
$$

To three significant figures, $E = 7.19\times 10^{3}\,\mathrm{N/C}$, radially outward. The surface density is $\sigma = Q/(4\pi R^2) = 6.366\times 10^{-8}\,\mathrm{C/m^2}$, and $\sigma/\eps_0$ reproduces $7190\,\mathrm{N/C}$. Inside the metal, including at the centre, $\mathbf{E} = \mathbf{0}$.
:::
:::

::: exercise A density that grows with radius {level=3 check="1.5e-6*0.05^2/(4*8.854187817e-12*0.1)"}
A ball of radius $R = 0.100\,\mathrm{m}$ carries a spherically symmetric density $\rho(r) = \rho_0\, r/R$ with $\rho_0 = 1.50\times 10^{-6}\,\mathrm{C/m^3}$, for $r \le R$, and no charge outside. Derive the field magnitude for $r \le R$, and evaluate it at $r = 0.0500\,\mathrm{m}$, in $\mathrm{N/C}$.
::: hint
The enclosed charge is the integral of $\rho\, 4\pi s^2\,\dd s$ from the centre out to $r$, not $\rho(r)$ times the volume. Then apply [[#eq-sphere-out]].
:::
::: solution
Spherical symmetry still gives $E(r) = Q(r)/(4\pi\eps_0 r^2)$, with $Q(r)$ the charge inside radius $r$. For $r \le R$,

$$
Q(r) = \int_0^r \rho_0\frac{s}{R}\, 4\pi s^2\,\dd s = \frac{4\pi\rho_0}{R}\int_0^r s^3\,\dd s = \frac{4\pi\rho_0}{R}\cdot\frac{r^4}{4} = \frac{\pi\rho_0\, r^4}{R}.
$$

Then

$$
E(r) = \frac{1}{4\pi\eps_0 r^2}\cdot\frac{\pi\rho_0 r^4}{R} = \frac{\rho_0 r^2}{4\eps_0 R}.
$$

The field grows as $r^2$, because the density itself grows with $r$. At $r = 0.0500\,\mathrm{m}$,

$$
E = \frac{(1.50\times 10^{-6})(0.0500)^2}{4(8.854187817\times 10^{-12})(0.100)} = 1058.82\,\mathrm{N/C}.
$$

To three significant figures, $E = 1.06\times 10^{3}\,\mathrm{N/C}$, radially outward. The whole ball holds $Q = \pi\rho_0 R^3 = 4.712\times 10^{-9}\,\mathrm{C}$, and outside the field is $kQ/r^2$.
:::
:::

::: exercise Field in a coaxial gap {level=3 check="2*8.9875517923e9*4e-9/0.004"}
A long coaxial cable has an inner conducting cylinder of radius $a = 2.00\,\mathrm{mm}$ carrying charge per unit length $\lambda = +4.00\,\mathrm{nC/m}$, and a thin outer conducting sheath of radius $b = 8.00\,\mathrm{mm}$ carrying $-\lambda$. Derive the field in the three regions $r < a$, $a < r < b$ and $r > b$, and evaluate the magnitude in the gap at $r = 4.00\,\mathrm{mm}$, in $\mathrm{N/C}$.
::: hint
Use a Gaussian cylinder of length $L$ in each region. The sheath is thin and conducting, so its charge sits on it as a cylindrical sheet of $-\lambda$ per unit length. The inner charge sits on the surface $r = a$.
:::
::: solution
Cylindrical symmetry makes $\mathbf{E}$ radial and constant on a coaxial cylinder. The flux through a Gaussian cylinder of radius $r$ and length $L$ is $E\cdot 2\pi r L$, with no flux through the ends, as in the proof of [[#prop-line]].

For $r < a$ the Gaussian surface lies inside the conducting material, or inside the hollow of a conducting cylinder whose charge is on $r = a$. Either way it encloses no charge, so $E = 0$.

For $a < r < b$ the enclosed charge is $\lambda L$. Then $E\cdot 2\pi r L = \lambda L/\eps_0$, so

$$
E = \frac{\lambda}{2\pi\eps_0 r} = \frac{2k\lambda}{r}.
$$

For $r > b$ the enclosed charge per unit length is $\lambda + (-\lambda) = 0$, so $E = 0$. The outer conductor shields the exterior: a Gaussian surface outside sees equal and opposite charges.

At $r = 4.00\,\mathrm{mm} = 0.00400\,\mathrm{m}$, which is in the gap,

$$
E = \frac{2(8.9875517923\times 10^{9})(4.00\times 10^{-9})}{0.00400} = 1.79751\times 10^{4}\,\mathrm{N/C}.
$$

To three significant figures, $E = 1.80\times 10^{4}\,\mathrm{N/C}$, directed outward from the axis. The field falls as $1/r$ across the gap and drops to zero outside the sheath.
:::
:::
