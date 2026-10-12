A fold is a record of a force, and the force can be recovered from it. That is the ambition of structural geology, and it rests on a distinction that is worth making precisely at the outset. A force is applied to a body; a stress is applied to a *surface inside* a body, and it depends on the orientation of that surface. The same state of stress can produce a shear of fifty megapascals on one plane and nothing at all on another, and it is the pattern of shear over all orientations that decides whether a rock fractures, and in which direction. Almost everything in this chapter follows from taking that dependence seriously.

Rocks in the crust are not strong. The stresses required to deform them are tens of megapascals, an order of magnitude less than the crushing strength of a cylinder of the same rock in a laboratory, because geology has millions of years and water in its pores. The consequence is that the crust keeps a record of stresses that are small enough to be produced by the weight of rock and by the drag of a convecting mantle, and large enough to be read out of the rocks themselves.

## Traction and the stress tensor

::: definition Traction and stress {#def-traction}
The **traction** $\mathbf{T}^{(\mathbf{n})}$ on an internal surface with unit normal $\mathbf{n}$ is the force per unit area transmitted across it. The **stress** at a point is the linear map that takes a normal direction to the traction on the surface with that normal, and in a chosen coordinate system it is the second-rank tensor
$$
\boldsymbol{\sigma} = \begin{pmatrix} \sigma_{xx} & \sigma_{xy} & \sigma_{xz} \\ \sigma_{yx} & \sigma_{yy} & \sigma_{yz} \\ \sigma_{zx} & \sigma_{zy} & \sigma_{zz} \end{pmatrix},
\qquad
T_i^{(\mathbf{n})} = \sigma_{ij} n_j .
$$
The diagonal terms are **normal stresses** and the off-diagonal terms **shear stresses**; the first index names the plane and the second the direction, so $\sigma_{xz}$ is the $x$-directed traction on the plane whose normal is $z$.
:::

::: proposition The stress tensor is symmetric {#prop-symmetric}
In the absence of body couples, $\sigma_{ij} = \sigma_{ji}$. A stress state at a point is therefore specified by six independent numbers, not nine, and there always exists an orthogonal set of three directions on which the traction is purely normal.
:::

::: proof
Balance the torques on a rectangular element of sides $\mathrm{d}x$, $\mathrm{d}y$, $\mathrm{d}z$ about a vertical axis. The couple from the shears on the two faces normal to $x$ has moment arm $\mathrm{d}y$ and force $\sigma_{xy}\,\mathrm{d}y\,\mathrm{d}z$, giving a torque $\sigma_{xy}\,\mathrm{d}x\,\mathrm{d}y\,\mathrm{d}z$; the couple from the shears on the faces normal to $y$ is $\sigma_{yx}\,\mathrm{d}x\,\mathrm{d}y\,\mathrm{d}z$ in the opposite sense. Equilibrium requires the two to be equal, so $\sigma_{xy} = \sigma_{yx}$, and cyclically for the other pairs. The volume factor cancels, which is why the result holds at a point and is independent of the size of the element.

For the second statement, a real symmetric matrix has real eigenvalues and mutually orthogonal eigenvectors: the quadratic form $\mathbf{n}\cdot\boldsymbol{\sigma}\mathbf{n}$ on the unit sphere attains a maximum, and at that maximum the traction must be parallel to $\mathbf{n}$, for otherwise a rotation of $\mathbf{n}$ towards the tangential part of the traction would increase the normal component. The eigenvector so obtained is a **principal direction**; restricting $\boldsymbol{\sigma}$ to the plane normal to it gives a symmetric $2\times2$ map with two further orthogonal eigenvectors. The three eigenvalues are the **principal stresses** $\sigma_1 \geq \sigma_2 \geq \sigma_3$, and in that basis the tensor is diagonal and every shear stress vanishes.
:::

::: definition Principal stresses, mean stress and deviatoric stress {#def-principal}
The **mean stress** (or lithostatic pressure with the sign convention of geology) is
$$
\sigma_m = \tfrac13(\sigma_1 + \sigma_2 + \sigma_3),
$$
and the **deviatoric stress** is $\mathbf{s} = \boldsymbol{\sigma} - \sigma_m\mathbf{I}$. The **differential stress** is $\Delta\sigma = \sigma_1 - \sigma_3$. The two parts do completely different jobs: the mean stress changes a rock's volume and closes its cracks, and the deviatoric stress changes its shape and is the only part that can cause yielding or faulting. The second invariant of the deviator,
$$
J_2 = \tfrac12 s_{ij}s_{ij} = \tfrac16\left[(\sigma_1-\sigma_2)^2 + (\sigma_2-\sigma_3)^2 + (\sigma_3-\sigma_1)^2\right],
$$
is the scalar measure of deviatoric stress used in flow laws, and $\sqrt{J_2}$ is proportional to the octahedral shear stress.
:::

::: example The stress in the crust beneath a flat plain {#ex-lithostatic}
Take a crust of density $\rho = 2700\ \mathrm{kg\,m^{-3}}$. Find the vertical stress at 5 km depth and at 30 km, and state what the horizontal stresses must be if the region is under no tectonic load.
::: solution
The vertical stress is the weight of the overburden,
$$
\sigma_v = \rho g z = 2700\times9.81\times5000 = 1.32\times10^{8}\ \mathrm{Pa} = 132\ \mathrm{MPa},
$$
and $793\ \mathrm{MPa}$ at 30 km. A useful number to memorise is $\rho g = 26.5\ \mathrm{MPa\,km^{-1}}$ for crustal rock and $32\ \mathrm{MPa\,km^{-1}}$ for peridotite; and $100\ \mathrm{MPa} = 1\ \mathrm{kbar}$, so the crustal column weighs about $0.27\ \mathrm{kbar}$ per kilometre.

With no topography and no tectonic load the horizontal stresses need not equal the vertical one. Elastic coupling to the surrounding crust gives
$$
\sigma_H = \frac{\nu}{1-\nu}\,\sigma_v = 0.38\,\sigma_v
$$
for Poisson's ratio $\nu = 0.28$, so $\sigma_H \approx 50\ \mathrm{MPa}$ at 5 km. In the real upper crust the horizontal stress is almost always larger than this, and commonly larger than the vertical, because of tectonic compression; the three possible orderings of $\sigma_1$, $\sigma_2$, $\sigma_3$ are the subject of Anderson's theory below.
:::
:::

## Mohr circles

::: theorem Mohr's construction {#thm-mohr}
For a two-dimensional stress state with principal stresses $\sigma_1$ and $\sigma_3$, the normal and shear tractions on a plane whose normal makes an angle $\theta$ with the $\sigma_1$ direction are
$$
\sigma_n = \frac{\sigma_1+\sigma_3}{2} + \frac{\sigma_1-\sigma_3}{2}\cos 2\theta,
\qquad
\tau = \frac{\sigma_1-\sigma_3}{2}\sin 2\theta .
$$
As $\theta$ varies the point $(\sigma_n, \tau)$ lies on a **circle** of radius $(\sigma_1-\sigma_3)/2$ centred at $((\sigma_1+\sigma_3)/2,\,0)$, and the angle on the circle is twice the physical angle.
:::

::: proof
Resolve the traction on the plane. The principal tractions $\sigma_1$ and $\sigma_3$ act on planes perpendicular to one another; the plane of interest has normal $\mathbf{n} = (\cos\theta, \sin\theta)$ in the principal basis, so the traction is $\mathbf{T} = (\sigma_1\cos\theta, \sigma_3\sin\theta)$. Its normal component is $\sigma_n = \mathbf{T}\cdot\mathbf{n} = \sigma_1\cos^2\theta + \sigma_3\sin^2\theta$, and its tangential component is $\tau = |\mathbf{T} - \sigma_n\mathbf{n}| = (\sigma_1-\sigma_3)\sin\theta\cos\theta$. Applying the double-angle identities $\cos^2\theta = (1+\cos2\theta)/2$, $\sin^2\theta = (1-\cos2\theta)/2$ and $\sin\theta\cos\theta = \tfrac12\sin2\theta$ gives the two expressions. Eliminating $\theta$ by $(\sigma_n - \bar\sigma)^2 + \tau^2 = R^2$ with $\bar\sigma = (\sigma_1+\sigma_3)/2$ and $R = (\sigma_1-\sigma_3)/2$ is the equation of a circle.
:::

::: example The maximum shear stress {#ex-maxshear}
A rock is deformed under $\sigma_1 = 200\ \mathrm{MPa}$ and $\sigma_3 = 60\ \mathrm{MPa}$. Find the maximum shear stress and its plane, and the normal stress on that plane.
::: solution
The Mohr circle has centre $(200+60)/2 = 130\ \mathrm{MPa}$ and radius $(200-60)/2 = 70\ \mathrm{MPa}$. The maximum shear stress is the radius, $\tau_{\max} = 70\ \mathrm{MPa}$, on planes at $\theta = 45^\circ$ to $\sigma_1$, and the normal stress there is the centre value, $130\ \mathrm{MPa}$.

Two corollaries that matter for faulting. First, the maximum shear stress is set by the **differential** stress alone and not by the mean stress: adding 100 MPa of pressure to both principal stresses moves the circle to the right without changing its size, and therefore without changing the shear on any plane. Second, the normal stress on the maximum-shear plane does change, and since friction is proportional to normal stress, the plane of maximum shear is *not* the plane that fails first. That single observation is the reason faults do not form at $45^\circ$ to $\sigma_1$.
:::
:::

::: widget parametric
fx: 130 + 70*cos(t)
fy: 70*sin(t)
t: 0, 2pi
x: 40, 220
y: -80, 80
equal: true
caption: The Mohr circle for the stress state of [[#ex-maxshear]], with $\sigma_1 = 200\ \mathrm{MPa}$ and $\sigma_3 = 60\ \mathrm{MPa}$. The point at the right end of the horizontal axis is the plane on which $\sigma_1$ acts (zero shear), the left end is the $\sigma_3$ plane, and the top of the circle is the plane of maximum shear, $70\ \mathrm{MPa}$ at a normal stress of $130\ \mathrm{MPa}$. Read angles as halves: moving through an angle $2\theta$ around the circle corresponds to rotating the plane by $\theta$ in the rock, which is why the construction gives the $2\theta$ in the formulae and why a fault at $30^\circ$ to $\sigma_1$ appears at $60^\circ$ on the circle.
:::

## Failure: Mohr–Coulomb and Byerlee

::: definition The Mohr–Coulomb failure criterion {#def-mohrcoulomb}
A rock fails in shear when the shear traction on a plane reaches
$$
\tau = \tau_0 + \mu\,\sigma_n = \tau_0 + \sigma_n\tan\varphi ,
$$
where $\tau_0$ is the **cohesive strength** and $\varphi$ the **angle of internal friction**. In a Mohr diagram the criterion is a straight line through $(\,-\tau_0/\tan\varphi,\,0)$ at an angle $\varphi$ to the horizontal axis, and failure begins when the Mohr circle first touches it. The orientation of the failure plane follows from the geometry: the fault makes an angle
$$
\theta = 45^\circ - \frac{\varphi}{2}
$$
with the $\sigma_1$ direction, so two conjugate faults enclose an angle of $2\theta = 90^\circ - \varphi$.
:::

::: example The angle of a fault {#ex-fault-angle}
Cohesionless rock has $\mu = \tan\varphi = 0.68$. At what angle to $\sigma_1$ does it fault, and what is the ratio $\sigma_1/\sigma_3$ at failure?
::: solution
$\varphi = \arctan 0.68 = 34.2^\circ$, so
$$
\theta = 45^\circ - 17.1^\circ = 27.9^\circ ,
$$
and conjugate faults enclose $56^\circ$, or $124^\circ$ measured across the other pair. The stress ratio comes from the circle that is tangent to the failure line:
$$
\frac{\sigma_1}{\sigma_3} = \frac{1+\sin\varphi}{1-\sin\varphi} = \frac{1+0.562}{1-0.562} = 3.57 .
$$
Both numbers are the working stock-in-trade of fault analysis. Natural faults are observed at $25$–$30^\circ$ to $\sigma_1$ and conjugate sets at about $60^\circ$, which is the direct field confirmation of $\mu \approx 0.6$–$0.7$; and the stress ratio says that in a cohesionless crust a fault forms when the maximum principal stress is three and a half times the minimum, which is a severe constraint on what the stress field can be.

The general frictional law measured by Byerlee for a great many rocks is
$$
\tau = 50 + 0.6\,\sigma_n\ \mathrm{MPa} \quad (\sigma_n > 200\ \mathrm{MPa}), \qquad \tau = 0.85\,\sigma_n \quad (\sigma_n < 200\ \mathrm{MPa}),
$$
and its near-universality is why fault mechanics works at all: the coefficient of friction of the crust is, to within twenty per cent, the same everywhere.
:::
:::

::: definition Effective stress {#def-effective-stress}
Pore fluid carries part of the normal load, so the stress that closes a fracture and controls friction is the **effective normal stress**
$$
\sigma_n^{\mathrm{eff}} = \sigma_n - P_p ,
$$
where $P_p$ is the pore-fluid pressure. Failure then occurs when $\tau = \tau_0 + \mu(\sigma_n - P_p)$, and a rise in pore pressure of $\Delta P$ moves the Mohr circle to the left by $\Delta P$ without changing its radius — that is, it can cause failure without any change in the applied stress at all.
:::

::: example Can a fault be reactivated by fluid pressure? {#ex-overpressure}
A thrust fault at 5 km depth has $\sigma_1 = \sigma_H = 240\ \mathrm{MPa}$ and $\sigma_3 = \sigma_v = 132\ \mathrm{MPa}$, and is cohesionless with $\mu = 0.75$. Is it stable under hydrostatic pore pressure, and what pore pressure would reactivate it?
::: solution
The friction angle is $\varphi = \arctan 0.75 = 36.9^\circ$, so $\sin\varphi = 0.600$ and the critical effective stress ratio is
$$
\left(\frac{\sigma_1'}{\sigma_3'}\right)_\text{crit} = \frac{1.600}{0.400} = 4.00 .
$$
Hydrostatic pressure at 5 km is $\rho_w g z = 1000\times9.81\times5000 = 49\ \mathrm{MPa}$, giving $\sigma_1' = 191$ and $\sigma_3' = 83\ \mathrm{MPa}$ and a ratio of $2.31$. That is well below 4.00, so the fault is **locked**.

Reactivation needs $\sigma_1' = 4.00\,\sigma_3'$ with both principal stresses reduced by the same $P_p$:
$$
240 - P_p = 4.00\,(132 - P_p)
\quad\Longrightarrow\quad
240 - P_p = 528 - 4.00P_p
\quad\Longrightarrow\quad
3.00P_p = 288
\quad\Longrightarrow\quad
P_p = 96\ \mathrm{MPa}.
$$
That is $96/132 = 0.73$ of the lithostatic load — nearly twice hydrostatic, and a state that geologists write $\lambda = 0.73$. The conclusion is the one that matters for thrust belts: a crust in compression at moderate depth is **stably locked unless the fluids are overpressured**, and the recurrence of great thrust earthquakes is therefore regulated by how fast pore pressure rebuilds after each event, not by how fast the plates converge. The same arithmetic run backwards explains why a fault can be reactivated by drilling, by injection, or by the drainage of a reservoir, with no change in the tectonic stress whatsoever.
:::
:::

::: warning The strength of the lithosphere is much less than friction predicts
Byerlee's law, integrated over a crust in which the vertical stress is the overburden, predicts that the differential stress supporting a mountain belt or a flexural bulge should reach several hundred megapascals in cold crust and thousands in the lithospheric mantle. The observations refuse. The elastic thickness of the oceanic lithosphere, measured from the bending of plates at trenches, will not support more than about $10^{13}\ \mathrm{N\,m^{-1}}$ of force per unit width, which corresponds to a depth-averaged differential stress of some $10$–$30\ \mathrm{MPa}$; the topography of the Mid-Atlantic Ridge requires a similarly small stress; and the focal mechanisms of earthquakes give differential stresses of tens of megapascals. The discrepancy is the "strength paradox of the lithosphere". The resolutions that survive are that the crust is weaker than Byerlee's law measured on clean laboratory samples — because of overpressure, because of phyllosilicates and talc on mature faults, and because friction rate-strengthens and the lithosphere creeps — and that the mantle degrades by power-law creep at stresses far below its dry frictional strength. The practical consequence for a structural geologist is that a stress estimate of a few tens of megapascals from a microstructure is not a failure of the method; it is the right answer.
:::

::: quiz
A rock has $\sigma_1 = 300\ \mathrm{MPa}$ and $\sigma_3 = 100\ \mathrm{MPa}$. Both principal stresses are then increased by 200 MPa. What happens to the tendency of the rock to fault?
- [ ] It becomes much more likely to fault, because the stress is larger.
- [x] It becomes less likely, because the higher normal stress raises the frictional strength while the shear stress is unchanged.
- [ ] Nothing changes, because only the differential stress matters.
- [ ] It becomes more likely, because the mean stress drives the Mohr circle to the right.
::: solution
Adding the same amount to both principal stresses translates the Mohr circle to the right without changing its radius, so the shear stress on every plane is unchanged. The failure envelope, however, rises with normal stress, so the circle moves further below it and the rock becomes **more stable**. This is why deep crustal rocks are harder to fault than shallow ones, why the same differential stress fails a shallow rock and not a deep one, and why the Mohr circle must always be drawn against the failure line rather than on its own.
:::
:::

## Anderson's theory of faulting

::: definition Faulting regimes {#def-anderson}
Assume that the principal stresses are vertical and horizontal, which is true to first order where the surface is flat and there are no shear tractions on it. Then the three possible orderings of the principal stresses give the three faulting styles, with the **stress ratio**
$$
R = \frac{\sigma_2 - \sigma_3}{\sigma_1 - \sigma_3}
$$
measuring where $\sigma_2$ lies between the other two.

| Regime | Ordering | $\sigma_1$ direction | Fault type | $R$ |
|---|---|---|---|---|
| Normal | $\sigma_v > \sigma_H > \sigma_h$ | vertical | normal, dipping $\sim$60° | 0–1 |
| Strike-slip | $\sigma_H > \sigma_v > \sigma_h$ | horizontal, $\sigma_2$ vertical | strike-slip | 0 or 1 |
| Thrust | $\sigma_H > \sigma_h > \sigma_v$ | horizontal | thrust, dipping $\sim$30° | 0–1 |
:::

::: example What made this fault? {#ex-regime}
A fault dips $62^\circ$ and slickensides rake $8^\circ$ down-dip. The regional stress field has $\sigma_v = 90\ \mathrm{MPa}$, $\sigma_H = 130\ \mathrm{MPa}$ and $\sigma_h = 45\ \mathrm{MPa}$. Classify the fault and predict its strike relative to $\sigma_H$.
::: solution
The ordering is $\sigma_H > \sigma_v > \sigma_h$, so $\sigma_1$ is horizontal and $\sigma_2$ is vertical: a **strike-slip** regime, and the shallow down-dip rake of $8^\circ$ on a $62^\circ$-dipping plane is consistent with predominantly horizontal slip.

The failure plane contains $\sigma_2$, which is vertical, so the fault is vertical and its strike is the horizontal line within it. That line makes the faulting angle of $28^\circ$ with $\sigma_1$, so the **strike lies $28^\circ$ from the $\sigma_H$ direction**. The conjugate set strikes $28^\circ$ the other way, the two strikes enclose $56^\circ$, and the acute bisector of the pair is the $\sigma_H$ direction. This is the standard way of recovering a palaeostress direction from a fault population, and it is why slickenside data are reduced to a right–inverse-pair diagram before being interpreted.

The stress ratio, with $\sigma_1 = 130$, $\sigma_2 = 90$ and $\sigma_3 = 45\ \mathrm{MPa}$, is
$$
R = \frac{\sigma_2-\sigma_3}{\sigma_1-\sigma_3} = \frac{90-45}{130-45} = 0.53 .
$$
An intermediate value of $R$ says that $\sigma_2$ is well separated from both $\sigma_1$ and $\sigma_3$, which is what makes the slip nearly pure strike-slip and the fault orientations well clustered — and it is why stress inversions are stable at $R$ near 0 or 1 and unstable near $\tfrac12$, where the two conjugate solutions become hard to distinguish.
:::
:::

::: widget plot
f: (1+sin(x*pi/180))/(1-sin(x*pi/180))
x: 15, 45
y: 1, 10
hlines: 3.5
vlines: 34
labels: \text{failure stress ratio}
caption: The ratio $\sigma_1/\sigma_3$ required for frictional failure as a function of the angle of internal friction $\varphi$. The relation is strongly non-linear: at the Byerlee value of $\varphi \approx 34^\circ$ the crust fails at a stress ratio of about 3.5, but a friction angle of $15^\circ$ — which is what talc-rich gouge and overpressured smectite give — drops the requirement to under 2. The curve is the reason weak-fault models of the crust matter: halving the friction angle does not halve the stress needed to move a fault, it reduces it by a factor of nearly two in the ratio and by much more in absolute terms.
:::

::: history
The mechanics begins with Charles-Augustin de Coulomb (Coulomb), whose 1773 memo on the thrusts exerted by soil on retaining walls contains the failure criterion in all but the modern notation, and with Christian Otto Mohr (Mohr), whose graphical construction of 1900 turned the same algebra into the circle that every structural geologist draws by hand. William J. Sollas and, decisively, Ernest Martin Anderson (Anderson) brought it into geology: Anderson's 1905 *Philosophical Magazine* paper on the theory of faulting deduced from the assumption that a principal stress is vertical that normal, reverse and strike-slip faults record three different stress fields, and then predicted the geometry of each — a piece of reasoning that preceded the First World War and has not needed amendment. The British school of Walter Bucher, Hans Cloos and, above all, Hans Heinrich Jeffreys (Jeffreys), whose *Earthquakes and Waves* and *Aspects of Mechanics* set the standard for treating the Earth as a mechanical problem, made stress analysis respectable; and August Adolph Heim (Heim), in *Geomechanik* of 1932, attempted nothing less than a mechanics of the whole Alpine orogen. The experimental foundation came in the 1950s and 1960s from the triaxial machines of Paterson at Canberra, Griggs at Santa Barbara, and Handin and Heard at Los Alamos, which produced the Byerlee friction law of 1967 and the flow laws for olivine and quartzite that made rheology quantitative. King Hubbert's (Hubbert) insight of 1951 that pore pressure, not total stress, controls failure — arrived at while explaining why oil-field faults slip at stresses far below the strength of the rock — is the single idea in this chapter with the most practical consequences, and it underlies the mechanics of every petroleum trap, injected brine and induced earthquake.
:::

## Where this leads

Strain, the consequence of stress, is the next chapter, [[structural-geology/strain]]; the rheologies that connect the two are in [[structural-geology/rheology]]; faults and folds are the geometries that follow, in [[structural-geology/fractures-faults]] and [[structural-geology/folds]]; and the stresses that drive them are generated by the processes in [[geophysics/flexure]] and [[geophysics/heat-flow]].

::: summary
- Stress is a linear map from surface orientation to traction; it is a symmetric tensor with six independent components and three orthogonal principal directions.
- Only the deviatoric part of the stress can cause yielding; the mean stress changes volume and, through friction, the strength.
- Mohr's circle carries the whole two-dimensional stress state, with the physical angle halved on the circle, and the maximum shear stress is half the differential stress.
- Frictional failure follows $\tau = \tau_0 + \mu\sigma_n$, giving faults at $30^\circ$ to $\sigma_1$ and a failure stress ratio of about 3.5.
- Pore pressure enters by subtracting from the normal stress, so a fault can be made to slip without any change in the applied stress.
- The three orderings of the vertical and horizontal principal stresses give normal, strike-slip and thrust faulting (Anderson's theory).
- The observed strength of the lithosphere is far below Byerlee's law integrated over a dry crust, and structural geology works at the lower value.
:::

## Exercises

::: exercise Units {level=1 check="27"}
Take $\rho = 2700\ \mathrm{kg\,m^{-3}}$. What is the lithostatic pressure gradient in $\mathrm{MPa\,km^{-1}}$?
::: solution
$\rho g = 2700\times9.81 = 2.65\times10^{4}\ \mathrm{kN\,m^{-3}}$, i.e. $26.5\ \mathrm{MPa}$ per kilometre, about $27$. With $1\ \mathrm{kbar} = 100\ \mathrm{MPa}$ this is $0.27\ \mathrm{kbar\,km^{-1}}$, which is why the rule of thumb "1 kbar per 4 km" is good to ten per cent in the crust and "1 kbar per 3 km" in the mantle.
:::
:::

::: exercise Independent components {level=1 check="6"}
How many independent components does the stress tensor have, and why?
::: solution
Six. Symmetry from the balance of angular momentum reduces nine to six: three normal stresses and three independent shears.
:::
:::

::: exercise Mohr circle {level=1 check="80"}
For $\sigma_1 = 250\ \mathrm{MPa}$ and $\sigma_3 = 90\ \mathrm{MPa}$, what is the maximum shear stress?
::: solution
$\tau_{\max} = (250-90)/2 = 80\ \mathrm{MPa}$, on planes at $45^\circ$ to $\sigma_1$, with a normal stress of $(250+90)/2 = 170\ \mathrm{MPa}$.
:::
:::

::: exercise Fault angle {level=1 check="30"}
For a rock with a friction angle of $30^\circ$, at what angle to $\sigma_1$ does it fault?
::: solution
$\theta = 45^\circ - \varphi/2 = 45^\circ - 15^\circ = 30^\circ$. Conjugate faults then enclose $60^\circ$ and $120^\circ$, and the $\sigma_1$ direction bisects the acute angle.
:::
:::

::: exercise Stress ratio {level=2 check="2.8"}
What is $\sigma_1/\sigma_3$ at failure for a friction angle of $28^\circ$?
::: solution
$(1+\sin28^\circ)/(1-\sin28^\circ) = (1+0.469)/(1-0.469) = 1.469/0.531 = 2.77$, about $2.8$. A friction angle of $28^\circ$ corresponds to $\mu = 0.53$, at the low end of Byerlee's range, and the required stress ratio is appreciably below the 3.6 needed at $\varphi = 34^\circ$.
:::
:::

::: exercise Regime {level=2}
At a depth of 3 km the measured horizontal stresses are $\sigma_H = 85\ \mathrm{MPa}$ and $\sigma_h = 60\ \mathrm{MPa}$, and the vertical stress is $81\ \mathrm{MPa}$. Classify the faulting regime and compute $R$.
::: solution
The ordering is $\sigma_H > \sigma_v > \sigma_h$, so $\sigma_1$ is horizontal and $\sigma_2$ is vertical: **strike-slip**. $R = (81-60)/(85-60) = 21/25 = 0.84$. The value of $R$ near one means $\sigma_2$ is close to $\sigma_1$, so the fault population will be poorly constrained in orientation and the stress inversion will be unstable — a common and easily overlooked problem in strike-slip terrains, and the reason a stress inversion needs both fault orientations and slip senses.
:::
:::

::: exercise Pore pressure {level=2 check="18"}
A normal fault at 10 km depth has $\sigma_v = 270\ \mathrm{MPa}$ and $\sigma_H = 90\ \mathrm{MPa}$. What pore pressure brings the effective stress ratio to the failure value for $\varphi = 34^\circ$? Give your answer in MPa.
::: solution
Failure requires $\sigma_v' / \sigma_H' = 3.57$:
$$
270 - P_p = 3.57(90 - P_p)
\quad\Longrightarrow\quad
270 - P_p = 321 - 3.57P_p
\quad\Longrightarrow\quad
2.57P_p = 51
\quad\Longrightarrow\quad
P_p = 20\ \mathrm{MPa}.
$$
Hydrostatic pressure at 10 km is about $98\ \mathrm{MPa}$, so the fault is already far past failure under any realistic fluid pressure, and the assumed stress field is not compatible with a frictionally-equilibrated crust. The exercise is a good illustration of the constraint that friction places on stress: in the upper crust the differential stress cannot exceed roughly three times the minimum principal stress, and a proposed stress field that violates this has to be wrong. Inverted, the argument gives the maximum horizontal stress in a normal-faulting region — which is how the stress around a borehole is constrained from the breakouts drilled into it.
:::
:::

::: exercise Deviatoric stress {level=2 check="57"}
For $\sigma_1 = 200$, $\sigma_2 = 140$, $\sigma_3 = 60\ \mathrm{MPa}$, compute the octahedral shear stress $\tau_\text{oct} = \tfrac13\sqrt{(\sigma_1-\sigma_2)^2+(\sigma_2-\sigma_3)^2+(\sigma_3-\sigma_1)^2}$.
::: solution
Differences: $60$, $80$, $140$; squares $3600 + 6400 + 19600 = 29600$; square root $172$; so $\tau_\text{oct} = 172/3 = 57\ \mathrm{MPa}$. The mean stress is $(200+140+60)/3 = 133\ \mathrm{MPa}$ and the maximum shear stress is $(200-60)/2 = 70\ \mathrm{MPa}$, a different and larger quantity: the octahedral shear stress is resolved over eight equally oriented planes and is always the smaller. Flow laws for minerals are written in terms of $\sqrt{J_2} = \tfrac{1}{\sqrt2}\sqrt{s_{ij}s_{ij}}$, which for this stress state is $59\ \mathrm{MPa}$.
:::
:::

::: exercise Topographic stress {level=2 check="79"}
By how much does the horizontal stress beneath a 3-km-high plateau exceed that in the adjacent plain, taking $\rho = 2700\ \mathrm{kg\,m^{-3}}$?
::: solution
The load is $\rho g h = 2700\times9.81\times3000 = 7.9\times10^{7}\ \mathrm{Pa} = 79\ \mathrm{MPa}$. That is comparable with the whole frictional strength of a kilometre of crust, which is why mountain belts are bounded by major thrust systems and why the horizontal stress in the crust beneath a plateau is dominated by the topography rather than by plate motions. It is also why the isostatic argument of [[geophysics/gravity-isostasy]] and the stress argument of this chapter are the same argument conducted over different volumes.
:::
:::

::: exercise Conjugate faults {level=3}
A limestone contains two conjugate sets of normal faults striking $020^\circ$ and $070^\circ$, both dipping steeply, with slickensides showing normal oblique slip. Determine the trend of $\sigma_H$ and explain why the answer is ambiguous, and what would resolve it.
::: solution
For conjugate faults the $\sigma_1$ direction bisects the angle between the two fault planes, and $\sigma_3$ bisects the other angle. The two strikes enclose $50^\circ$, so the bisectors trend $045^\circ$ and $135^\circ$. Because the faults are normal and steeply dipping, $\sigma_1$ is vertical and $\sigma_3$ is horizontal, so $\sigma_h$ trends $045^\circ$ or $135^\circ$ and $\sigma_H$, perpendicular to it, trends the other.

The ambiguity is the classic one: geometry alone cannot tell which of the two bisectors is $\sigma_3$ and which is $\sigma_1$, because both choices give the same pair of fault planes. It is resolved by the **slip sense on each set relative to the other** — the acute-bisector rule requires that the two faults slip so as to shorten the rock across the obtuse bisector — and, in practice, by an independent constraint on the direction of extension: the trend of a syn-rift depocentre, the stretching lineation in a core complex, the strike of a dyke swarm, or the orientation of a Quaternary fault whose sense is known from trenching.
:::
:::

::: exercise The weight of a fault {level=3}
A vertical normal fault with a rupture area of $70\ \mathrm{km^2}$ slips by $1\ \mathrm{m}$. The effective normal stress on the fault is $100\ \mathrm{MPa}$ and $\mu = 0.6$. Find the work done against friction, and compare it with the seismic energy radiated by the magnitude 6.8 earthquake this rupture represents.
::: solution
The shear stress carried by the fault is $\tau = 0.6\times100 = 60\ \mathrm{MPa}$, so the frictional work is
$$
W = \tau\, A\, d = 6\times10^{7}\times7\times10^{10}\times1 = 4\times10^{18}\ \mathrm{J}.
$$
A magnitude 6.8 earthquake radiates about $10^{15}\ \mathrm{J}$, four thousand times less. The difference is not an error and it is not a puzzle: the absolute shear stress on a fault is large and almost entirely spent on heat and on the quasi-static straining of the surrounding rock, and only the **stress drop** — the change in shear stress across the fault, typically 1–10 MPa — is available to be radiated. Taking $\Delta\tau = 3\ \mathrm{MPa}$, the released strain energy is
$$
E \approx \frac{\Delta\tau\, A\, d}{2} = \frac{3\times10^{6}\times7\times10^{10}\times1}{2} = 1\times10^{17}\ \mathrm{J},
$$
of which the observed $10^{15}\ \mathrm{J}$ is a **radiation efficiency** of about one per cent. The rest goes into frictional heating of the fault zone, which is why some fault rocks record temperature rises of hundreds of degrees in seconds, and into the fracture energy of the slipping surface.

The structural lesson is the one that governs every stress estimate in this subject: the quantity that a fault records is the absolute shear stress it carried, of order tens of megapascals, while the quantity an earthquake records is the change in it, of order one megapascal. The two differ by an order of magnitude and are not interchangeable.
:::
:::
