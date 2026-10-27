Drop a hammer and a feather on the Moon and they land together. Apollo 15 astronaut David Scott did exactly that in 1971, on live television. On Earth the feather lags only because of the air. Take the air away and every body, whatever it is made of and however heavy it is, falls with the same acceleration at the same place. No other force behaves like this. In an electric field a proton and an electron accelerate in opposite directions, and a neutron does not accelerate at all. Gravity treats all matter alike.

Einstein took this one fact seriously enough to rebuild the theory of gravitation on it. If all bodies fall alike, then an observer falling with them cannot detect the gravity by watching them: everything nearby floats. Gravity can be switched off, locally, by falling. And if it can be switched off by a choice of frame, it is less like a force and more like a property of the frames themselves, that is, of spacetime. This chapter follows that idea as far as it goes without the field equations. It already predicts that clocks lower in a gravitational field run slow, that light is redshifted climbing out of a field, and that light falls. It ends with the first appearance of a metric that is not the Minkowski metric, and with the statement that free fall is motion along a path of extremal proper time.

You need Newtonian gravitation from [[mechanics/gravitation]], and the spacetime interval and proper time from [[relativity/four-vectors]] and [[relativity/spacetime]]. Constants are CODATA 2018 values: $G = 6.67430\times 10^{-11}\,\mathrm{m^3\,kg^{-1}\,s^{-2}}$ and $c = 2.99792458\times 10^{8}\,\mathrm{m/s}$. For the Earth and the Sun we use the measured products $GM_\oplus = 3.986004\times 10^{14}\,\mathrm{m^3/s^2}$ and $GM_\odot = 1.327124\times 10^{20}\,\mathrm{m^3/s^2}$, which are known far more precisely than $G$ or either mass separately.

## Inertial and gravitational mass {#masses}

Newton's second law and Newton's law of gravitation both contain a mass, and nothing in either law says it is the same mass. The second law contains the resistance of a body to being accelerated. The law of gravitation contains the strength with which a body is pulled by, and pulls on, other bodies. These are logically different properties, in the same way that electric charge is a different property from inertia.

::: definition Inertial and gravitational mass {#def-masses}
The **inertial mass** $m_I$ of a body is the coefficient in Newton's second law, $\mathbf F = m_I\mathbf a$. Its **passive gravitational mass** $m_G$ is the coefficient in the force exerted on it by a gravitational field $\mathbf g$:

$$
\mathbf F = m_G\,\mathbf g, \qquad \mathbf g = -\nabla\Phi,
$$

where $\Phi$ is the Newtonian gravitational potential. For two bodies $A$ and $B$ at the same place, the **Eötvös parameter** is

$$
\eta(A,B) = 2\,\frac{\abs{a_A - a_B}}{a_A + a_B},
$$ {#eq-eta}

the fractional difference of their free-fall accelerations.
:::

Combining the two laws, a body in a field $\mathbf g$ accelerates at

$$
\mathbf a = \frac{m_G}{m_I}\,\mathbf g.
$$ {#eq-ratio}

If the ratio $m_G/m_I$ were different for gold and for aluminium, they would fall at different rates, and $\eta$ would measure the difference of the ratios. Every experiment so far finds $\eta$ consistent with zero. Choosing units so that the common ratio is $1$, we may then write $m_G = m_I = m$, and the mass cancels from [[#eq-ratio]]: $\mathbf a = \mathbf g$.

The experimental record is long. Galileo's inclined planes and pendulums, around 1600, showed equality to perhaps a percent. Newton compared pendulums with bobs of different materials and reported, in the *Principia* of 1687, agreement to about one part in a thousand. Friedrich Bessel improved this in 1832. Loránd Eötvös, with a torsion balance, reached roughly one part in $10^8$ in 1889. His later work with Desiderius Pekár and Jenő Fekete, carried out from 1906 to 1909 and published in 1922, reached a few parts in $10^9$.

Eötvös used a torsion balance: two masses of different composition on a beam hung from a fibre. Gravity acts on $m_G$, while the centrifugal effect of the Earth's rotation acts on $m_I$, so unequal ratios would twist the beam. Modern rotating torsion balances, notably the Eöt-Wash group's in Seattle, reached about $10^{-13}$ by 2008, and lunar laser ranging tests the Earth and Moon falling towards the Sun at a similar level.

The present record is from space. The MICROSCOPE satellite, launched in 2016, carried two concentric cylinders, one of a platinum alloy and one of a titanium alloy, held electrostatically in free fall around the Earth. Any difference in their accelerations would show up as a difference in the electrostatic forces needed to keep them centred. The final analysis, published in *Physical Review Letters* in 2022, gave

$$
\eta(\mathrm{Ti},\mathrm{Pt}) = (-1.5 \pm 2.3_{\text{stat}} \pm 1.5_{\text{syst}})\times 10^{-15},
$$

consistent with zero at a precision of about $3\times 10^{-15}$. Gravitational and inertial mass agree to fifteen decimal places, for materials with very different ratios of protons to neutrons and very different nuclear binding energies.

::: remark Binding energy falls too
About one percent of a platinum nucleus's mass is (negative) binding energy, a slightly different fraction from titanium's. That they still fall alike to $10^{-15}$ means that binding, electrostatic and internal kinetic energy all gravitate in proportion to their inertia. Gravity couples to energy, which is why in general relativity the source of gravity is energy and momentum.
:::

## The equivalence principle {#principle}

Universality of free fall has a striking consequence, which Einstein realised in 1907. Consider a laboratory in a uniform gravitational field and a laboratory far from all masses but accelerating uniformly.

::: theorem Uniform gravity is equivalent to acceleration {#thm-uniform}
Let a set of particles move in a uniform, constant gravitational field $\mathbf g$ under additional forces $\mathbf F_k$ that depend only on relative positions and velocities, and suppose $m_G = m_I$ for every particle. Describe the motion in a frame whose origin falls freely, with acceleration $\mathbf g$. Then in the falling frame the particles obey Newton's second law with the forces $\mathbf F_k$ alone, as if there were no gravitational field. Conversely, a frame with acceleration $-\mathbf g$ relative to an inertial frame in field-free space is indistinguishable, by mechanical experiments, from a frame at rest in a field $\mathbf g$.
:::

::: proof
In the original frame particle $k$ obeys

$$
m_k\ddot{\mathbf x}_k = m_k\mathbf g + \mathbf F_k,
$$

with the same $m_k$ on both sides by hypothesis. The falling frame has coordinates

$$
\mathbf x'_k = \mathbf x_k - \tfrac12\mathbf g t^2,
$$

so $\ddot{\mathbf x}'_k = \ddot{\mathbf x}_k - \mathbf g$. Substituting,

$$
m_k\ddot{\mathbf x}'_k = m_k\ddot{\mathbf x}_k - m_k\mathbf g = \mathbf F_k.
$$

Relative positions and velocities are the same in both frames, because the shift $\tfrac12\mathbf g t^2$ is the same for all particles, so the $\mathbf F_k$ have the same form in the primed variables. The gravitational term has disappeared. The converse is the same calculation read backwards: starting from $m_k\ddot{\mathbf x}'_k = \mathbf F_k$ in field-free space and moving to a frame accelerating at $-\mathbf g$ creates a term $m_k\mathbf g$ on the right, which looks exactly like a uniform gravitational field acting on every particle in proportion to its inertial mass. If $m_G$ and $m_I$ differed, the cancellation would fail, and the two situations could be told apart.
:::

The theorem is elementary, and it says nothing about light, clocks or electromagnetism. Einstein's step was to postulate that it holds for *all* of physics.

::: definition Weak and Einstein equivalence principles {#def-ep}
The **weak equivalence principle** states that the trajectory of a freely falling test body depends only on its initial position and velocity, not on its composition or structure. Equivalently, $m_G/m_I$ is the same for all bodies.

The **Einstein equivalence principle** states, in addition, that in a sufficiently small freely falling laboratory, over a sufficiently short time, the outcome of every non-gravitational experiment is the same as in an inertial frame of special relativity, independent of where and when the laboratory is and of its velocity.
:::

::: definition Local inertial frame {#def-lif}
A **local inertial frame** at an event is a freely falling, non-rotating frame with its origin at that event, in which, within a region small enough that variations of the gravitational field across it can be neglected, the laws of physics take their special-relativistic form.
:::

The weak principle is what the Eötvös experiments test. The Einstein principle is far stronger: Maxwell's equations, atomic and nuclear physics all look special-relativistic to a falling observer.

The words *sufficiently small* are essential, because a real field is not uniform. Two particles released side by side above the Earth fall towards the centre along converging lines. Two particles released one above the other fall with slightly different accelerations, because the lower one is closer. A freely falling observer cannot remove these relative accelerations by any choice of frame. They are **tidal accelerations**, and they are the part of gravity that is real in every frame.

::: theorem Tidal accelerations {#thm-tidal}
Let a spherical body of mass $M$ produce the field $\mathbf g = -GM\hat{\mathbf r}/r^2$. Consider a freely falling frame whose origin is at distance $r$ from the centre, with the $z$-axis pointing radially outwards. To first order in the displacement $\boldsymbol\xi = (x, y, z)$ from the origin, a free particle has relative acceleration

$$
\ddot x = -\frac{GM}{r^3}\,x, \qquad \ddot y = -\frac{GM}{r^3}\,y, \qquad \ddot z = +\frac{2GM}{r^3}\,z.
$$ {#eq-tidal}
:::

::: proof
The particle at $\mathbf r + \boldsymbol\xi$ and the origin at $\mathbf r$ both fall freely, so the relative acceleration is the difference of the fields,

$$
\ddot{\boldsymbol\xi} = \mathbf g(\mathbf r + \boldsymbol\xi) - \mathbf g(\mathbf r) \approx (\boldsymbol\xi\cdot\nabla)\,\mathbf g = -\nabla(\boldsymbol\xi\cdot\nabla\Phi),
$$

with $\Phi = -GM/r$. In components, $\ddot\xi_i = -\sum_j(\partial_i\partial_j\Phi)\,\xi_j$. Put the origin on the $z$-axis at distance $r$. Then $\Phi = -GM(X^2+Y^2+Z^2)^{-1/2}$ in coordinates centred on the body, and the second derivatives at $(0, 0, r)$ are

$$
\partial_X^2\Phi = \partial_Y^2\Phi = \frac{GM}{r^3}, \qquad \partial_Z^2\Phi = -\frac{2GM}{r^3},
$$

with all mixed derivatives zero there. Indeed $\partial_X\Phi = GMX/R^3$ with $R = (X^2+Y^2+Z^2)^{1/2}$, so $\partial_X^2\Phi = GM/R^3 - 3GMX^2/R^5$, which is $GM/r^3$ at $X = 0$, $R = r$. Similarly $\partial_Z^2\Phi = GM/R^3 - 3GMZ^2/R^5 = -2GM/r^3$ at $Z = R = r$, and $\partial_X\partial_Z\Phi = -3GMXZ/R^5 = 0$ at $X = 0$. Substituting gives [[#eq-tidal]].
:::

The pattern stretches along the radial direction and squeezes across it. It is why the Moon raises two ocean bulges on the Earth, one on each side. And the tidal accelerations fall off as $1/r^3$, faster than the field itself, which is why a small enough laboratory can always be made to look inertial.

::: example Tides across an astronaut {#ex-astronaut}
An astronaut $2.0\,\mathrm{m}$ tall floats in a space station orbiting at $r = 6.771\times 10^{6}\,\mathrm{m}$ from the Earth's centre, aligned radially. What is the relative acceleration of her head and feet? Compare with $g$.
::: solution
The station and everyone in it fall freely, so the uniform part of the field is invisible inside. What remains is the tidal term. Along the radial direction [[#eq-tidal]] gives

$$
\ddot z = \frac{2GM_\oplus}{r^3}\,z = \frac{2\times 3.986\times 10^{14}\times 2.0}{(6.771\times 10^{6})^3}\,\mathrm{m/s^2} = 5.1\times 10^{-6}\,\mathrm{m/s^2}.
$$

That is about $5\times 10^{-7}$ of $g$. The head and feet are pulled apart, very gently. A two-metre laboratory in low orbit is inertial to about one part in two million of surface gravity, which is why "weightlessness" is an excellent approximation and why it is still only an approximation. Near a stellar-mass black hole the same formula gives tidal accelerations that would tear the astronaut apart, as [[gravitation/black-holes]] will show.
:::
:::

::: intuition Gravity as geometry
In flat space two straight lines that start parallel stay parallel. On a sphere, two great circles that start parallel at the equator converge at the poles, not because anything pushes them but because of curvature. Two freely falling particles that start side by side converge, as [[#eq-tidal]] says, and nothing in their own frame is pushing them either. Einstein's proposal is that this is the same phenomenon: free particles follow the straightest possible paths in a curved spacetime, and tidal accelerations measure its curvature. The uniform part of $\mathbf g$ is an artefact of using a frame that is not falling; the tidal part cannot be transformed away, just as the curvature of a sphere cannot be removed by choosing coordinates.
:::

::: quiz
A sealed, windowless laboratory is either at rest on the Earth's surface or in a rocket in deep space accelerating at $9.80\,\mathrm{m/s^2}$. Which measurement, made with good enough instruments, can in principle distinguish the two?
- [ ] The time a dropped ball takes to fall $1\,\mathrm{m}$.
- [ ] Whether a dropped gold ball and a dropped aluminium ball hit the floor together.
- [x] Whether two balls dropped side by side, far apart, converge slightly as they fall.
- [ ] The frequency shift of light sent from the ceiling to the floor.
::: solution
On the Earth the balls fall towards the centre, along lines that converge: that is the transverse tidal term in [[#eq-tidal]]. In the rocket all dropped objects move on parallel lines. The other three measurements give identical results in both laboratories. The fall time is set by $g$ alone. Gold and aluminium fall together in both by the weak equivalence principle. The frequency shift is exactly the one derived in the next section from the rocket picture, and the equivalence principle says it is the same on the Earth.
:::
:::

## Gravitational redshift {#redshift}

The equivalence principle predicts something that Newtonian gravity says nothing about: gravity affects clocks. The argument uses only the Doppler effect in an accelerating rocket.

::: theorem Gravitational redshift in a uniform field {#thm-redshift}
In a uniform gravitational field $g$, light of frequency $\nu_{\mathrm{em}}$ emitted upwards from a height $0$ is received at height $h$ with frequency $\nu_{\mathrm{rec}}$, where, to first order in $gh/c^2$,

$$
\frac{\nu_{\mathrm{rec}}}{\nu_{\mathrm{em}}} = 1 - \frac{gh}{c^2}.
$$ {#eq-redshift-uniform}

More generally, for a static weak field with potential $\Phi$ and $\abs{\Phi}/c^2 \ll 1$, light passing from an emitter at potential $\Phi_{\mathrm{em}}$ to a receiver at $\Phi_{\mathrm{rec}}$, both at rest, has

$$
\frac{\nu_{\mathrm{rec}}}{\nu_{\mathrm{em}}} = 1 - \frac{\Phi_{\mathrm{rec}} - \Phi_{\mathrm{em}}}{c^2}.
$$ {#eq-redshift}
:::

::: proof
By the Einstein equivalence principle, replace the laboratory at rest in the field by a rocket in field-free space with upward acceleration $g$. Work in the inertial frame in which the rocket is momentarily at rest at the instant $t = 0$ of emission from the floor. Light reaches the ceiling, a height $h$ above, after a time $t = h/c$ to first order. During that time the ceiling has acquired an upward speed

$$
v = g t = \frac{gh}{c}
$$

relative to the frame in which the light was emitted. The receiver is moving away from the source, along the direction of the light, so it sees a first-order Doppler shift

$$
\nu_{\mathrm{rec}} = \nu_{\mathrm{em}}\Bigl(1 - \frac{v}{c}\Bigr) = \nu_{\mathrm{em}}\Bigl(1 - \frac{gh}{c^2}\Bigr).
$$

The equivalence principle says that the same shift occurs in the laboratory at rest in the field, which is [[#eq-redshift-uniform]]. Corrections from the change of $h$ during the flight, from relativistic Doppler terms and from the time dilation of the rocket are all of second order in $gh/c^2$.

For a non-uniform static field, divide the path into short vertical steps $\dd h$, each small enough that the field is uniform across it. Across each step the fractional shift is $\dd\nu/\nu = -g\,\dd h/c^2 = -\dd\Phi/c^2$, since $g = \dd\Phi/\dd h$ for a static potential. Integrating, $\ln(\nu_{\mathrm{rec}}/\nu_{\mathrm{em}}) = -(\Phi_{\mathrm{rec}} - \Phi_{\mathrm{em}})/c^2$, and to first order this is [[#eq-redshift]]. Horizontal steps contribute nothing, because the potential does not change along them, and the result depends only on the end points.
:::

Light climbing out of a potential well loses frequency: it is **redshifted**. Light falling in is **blueshifted**. The energy argument gives the same answer in one line, if you allow a photon of energy $h\nu$ to have gravitational mass $h\nu/c^2$: climbing a height $h$ costs energy $(h\nu/c^2)gh$, so $\Delta\nu/\nu = -gh/c^2$. The exercise [[#exr-perpetual]] makes that argument airtight without assuming anything about photon mass.

### Clocks in a gravitational field

The redshift is not a property of light. It is a property of time. In a static field nothing changes from one moment to the next, so the number of wave crests emitted by the lower clock in one of its seconds must all arrive at the upper clock: crests cannot pile up in the space between. If the upper clock counts fewer crests per second of its own, it is because its seconds are longer, compared with the lower clock's, than the lower clock's seconds are. Each clock ticks at its own natural rate as measured locally, but the lower clock, viewed from above, runs slow.

::: definition Gravitational time dilation {#def-time-dilation}
In a static weak gravitational field, a clock at rest at potential $\Phi$ ticks off proper time $\tau$ at the rate

$$
\deriv{\tau}{t} = 1 + \frac{\Phi}{c^2},
$$ {#eq-clock-rate}

where $t$ is the time kept by a reference clock at rest where $\Phi = 0$ (far away, for an isolated body). A clock moving at speed $v \ll c$ has, to the same order, $\dd\tau/\dd t = 1 + \Phi/c^2 - v^2/(2c^2)$.
:::

The velocity term is the special-relativistic time dilation of [[relativity/time-and-length]] to first order, since $\sqrt{1 - v^2/c^2} \approx 1 - v^2/(2c^2)$. On the Earth $GM_\oplus/(R_\oplus c^2) = 7.0\times 10^{-10}$, and optical atomic clocks now detect the rate difference between two clocks whose heights differ by a few centimetres.

::: example The Pound–Rebka experiment {#ex-pound-rebka}
In 1959 Robert Pound and Glen Rebka sent $14.4\,\mathrm{keV}$ gamma rays from iron-57 down the $22.5\,\mathrm{m}$ tower of the Jefferson Laboratory at Harvard. What fractional frequency shift did they expect? How did they measure something so small?
::: solution
With $g = 9.80\,\mathrm{m/s^2}$ and $h = 22.5\,\mathrm{m}$, [[#eq-redshift-uniform]] gives

$$
\frac{\abs{\Delta\nu}}{\nu} = \frac{gh}{c^2} = \frac{9.80\times 22.5}{(2.998\times 10^{8})^2} = 2.45\times 10^{-15}.
$$

For light going down the shift is a blueshift. Pound and Rebka alternated between sending the rays up and sending them down, so the difference they measured was twice this, $4.9\times 10^{-15}$.

Such precision is possible because of the Mössbauer effect: in a crystal, the iron-57 nucleus emits and absorbs without recoil, so the line width is set by the nuclear lifetime and is about $3\times 10^{-13}$ of the frequency. A shift of $1\%$ of the line width is then a few parts in $10^{15}$. The absorber was moved slowly on a loudspeaker cone, and the Doppler velocity that restored maximum absorption, $v = (2.45\times 10^{-15})c = 0.73\,\mu\mathrm{m/s}$, measured the shift. The result, published in 1960, was $1.05 \pm 0.10$ times the prediction; Pound and Joseph Snider reached $1\%$ in 1964.
:::
:::

::: example The GPS clock correction {#ex-gps}
GPS satellites orbit at semi-major axis $a = 2.656175\times 10^{7}\,\mathrm{m}$ in nearly circular orbits. Taking a ground clock at $R_\oplus = 6.371\times 10^{6}\,\mathrm{m}$ and ignoring the Earth's rotation, find how much faster a satellite clock runs per day than a ground clock, in microseconds.
::: solution
Use [[#def-time-dilation]] with $\Phi = -GM_\oplus/r$. The ground clock is at rest, and the satellite moves at the circular speed $v^2 = GM_\oplus/a$ from [[mechanics/gravitation]]. The fractional rate difference is

$$
\frac{\Delta(\dd\tau)}{\dd t} = \Bigl(-\frac{GM_\oplus}{ac^2} - \frac{GM_\oplus}{2ac^2}\Bigr) - \Bigl(-\frac{GM_\oplus}{R_\oplus c^2}\Bigr) = \frac{GM_\oplus}{c^2}\Bigl(\frac{1}{R_\oplus} - \frac{3}{2a}\Bigr).
$$

Take the terms one at a time. The common factor is $GM_\oplus/c^2 = 4.435\times 10^{-3}\,\mathrm{m}$. The gravitational part is

$$
\frac{GM_\oplus}{c^2}\Bigl(\frac1{R_\oplus} - \frac1a\Bigr) = 4.435\times 10^{-3}\,(1.5696 - 0.3765)\times 10^{-7} = 5.292\times 10^{-10},
$$

which over a day of $86\,400\,\mathrm{s}$ is $+45.7\,\mu\mathrm{s}$: the satellite clock sits higher in the potential and gains. The velocity part is

$$
-\frac{GM_\oplus}{2ac^2} = -8.35\times 10^{-11},
$$

which is $-7.2\,\mu\mathrm{s}$ per day: the moving clock loses. The net gain is

$$
45.7 - 7.2 = 38.5\,\mu\mathrm{s}\ \text{per day}.
$$

That is a fractional rate of $4.46\times 10^{-10}$. The satellite clocks are therefore built to run slow on the ground: their nominal $10.23\,\mathrm{MHz}$ is set to $10.229\,999\,995\,43\,\mathrm{MHz}$, a fractional offset of $4.465\times 10^{-10}$, which also absorbs the small effect of the ground clock's rotation with the Earth. Positions come from light travel times, so an uncorrected clock error of $38.5\,\mu\mathrm{s}$ would grow into a ranging error of about $c\times 38.5\,\mu\mathrm{s} \approx 11.5\,\mathrm{km}$ after one day.
:::
:::

The figure plots the two contributions and their sum for any circular orbit.

::: widget plot
f: 60.15*(1 - 1/x); -30.07/x; 60.15*(1 - 1.5/x)
x: 1, 10
y: -35, 62
labels: gravitational (higher is faster); velocity (moving is slower); net, relative to a ground clock
caption: Microseconds gained per day by a clock in a circular orbit of radius $r = x R_\oplus$, compared with a clock on a non-rotating Earth. The gravitational term grows towards $60\,\mu\mathrm{s}$ per day far away; the velocity term is largest close in. Read off the net curve at $x = 1.06$, the International Space Station: the clock loses about $25\,\mu\mathrm{s}$ per day. The net curve crosses zero at $x = 1.5$, an altitude of about $3190\,\mathrm{km}$. At $x = 4.17$, GPS, it gains $38.5\,\mu\mathrm{s}$ per day.
:::

::: warning The redshift is not a Doppler shift of moving sources
In the Pound–Rebka experiment and in [[#eq-redshift]], both emitter and receiver are at rest. Nothing is moving, and the frequency still changes. The Doppler shift appeared only in the accelerating-rocket model, as a device for computing the answer. Do not try to explain the gravitational redshift by saying that "the photon slows down": its locally measured speed is $c$ at both ends. What differs is the rate at which the two clocks tick, compared along the path of the light.
:::

## Light falls {#light}

Shine a horizontal beam across an accelerating rocket. In the inertial frame the light goes straight. In the rocket, the floor rises while the light crosses, so the beam curves down towards the floor along a parabola, exactly like a thrown ball moving at speed $c$. By the equivalence principle, light in a laboratory at rest on the Earth must also fall. Across a $2.0\,\mathrm{m}$ laboratory the drop is $gL^2/(2c^2) = 2\times 10^{-16}\,\mathrm{m}$, far below anything measurable. The effect is detectable only for light passing a star.

::: example Light passing the Sun, by the equivalence principle alone {#ex-half-deflection}
Treat a light ray grazing the Sun, at impact parameter $b = R_\odot = 6.957\times 10^{8}\,\mathrm{m}$, as a Newtonian particle moving at speed $c$ that feels the Sun's gravitational acceleration. Find the deflection angle in arcseconds.
::: solution
The ray travels along the line $x = b$ with $y$ running from $-\infty$ to $\infty$, nearly undeflected. The transverse component of the acceleration towards the Sun is

$$
g_\perp = \frac{GM_\odot}{b^2 + y^2}\,\frac{b}{\sqrt{b^2+y^2}}.
$$

With $\dd y = c\,\dd t$, the total transverse velocity acquired is

$$
\Delta v_\perp = \int_{-\infty}^{\infty} g_\perp\,\frac{\dd y}{c} = \frac{GM_\odot b}{c}\int_{-\infty}^{\infty}\frac{\dd y}{(b^2+y^2)^{3/2}} = \frac{GM_\odot b}{c}\cdot\frac{2}{b^2} = \frac{2GM_\odot}{bc}.
$$

The deflection angle is $\delta = \Delta v_\perp/c$:

$$
\delta = \frac{2GM_\odot}{bc^2} = \frac{2\times 1.327\times 10^{20}}{6.957\times 10^{8}\times(2.998\times 10^{8})^2} = 4.245\times 10^{-6}\,\mathrm{rad}.
$$

One radian is $206\,265$ arcseconds, so $\delta = 0.876''$. Einstein obtained essentially this, $0.83''$ with the constants then available, in 1911. General relativity gives exactly twice the value: $1.75''$. The extra half comes from the curvature of space, which the equivalence principle cannot see, because it only tells us what happens in a freely falling frame over a short time. [[gravitation/schwarzschild]] derives the full result.
:::
:::

::: widget plot
f: 0.876/x; 1.751/x
x: 1, 20
y: 0, 1.9
labels: equivalence principle alone (Einstein 1911); general relativity (Einstein 1915)
caption: Deflection of starlight by the Sun, in arcseconds, against impact parameter $b$ in solar radii. Both predictions fall off as $1/b$. Move along to $x = 2$: a star seen two solar radii from the Sun's centre is shifted by $0.88''$ according to general relativity, and that is the range in which the eclipse plates of 1919 were measured. The factor of two between the curves is what Eddington's expeditions were designed to decide.
:::

## Metric and geodesics {#metric}

The equivalence principle has told us two things: clocks at different potentials run at different rates, and in a small falling laboratory special relativity holds. Both statements fit into one object, the **metric**, which generalises the interval of [[relativity/four-vectors]].

In special relativity, in inertial coordinates, the interval between neighbouring events is

$$
\dd s^2 = -c^2\,\dd t^2 + \dd x^2 + \dd y^2 + \dd z^2,
$$

and for a timelike separation the proper time is $\dd\tau^2 = -\dd s^2/c^2$. In a gravitational field there are no global inertial frames. We can still use coordinates $(t, x, y, z)$ covering the whole region, but the interval between neighbouring events, as measured by local rods and clocks, is then a more general quadratic form.

::: definition Metric and the weak-field line element {#def-metric}
A **metric** assigns to each pair of neighbouring events, with coordinate separations $\dd x^\mu$, the interval

$$
\dd s^2 = \sum_{\mu,\nu=0}^{3} g_{\mu\nu}(x)\,\dd x^\mu\,\dd x^\nu,
$$

where $x^0 = ct$ and the coefficients $g_{\mu\nu} = g_{\nu\mu}$ are functions of position. For a static, weak gravitational field with Newtonian potential $\Phi$, $\abs{\Phi} \ll c^2$, general relativity gives the line element

$$
\dd s^2 = -\Bigl(1 + \frac{2\Phi}{c^2}\Bigr)c^2\,\dd t^2 + \Bigl(1 - \frac{2\Phi}{c^2}\Bigr)\bigl(\dd x^2 + \dd y^2 + \dd z^2\bigr).
$$ {#eq-weak-metric}
:::

The time–time coefficient can be read off from what we already know. A clock at rest has $\dd x = \dd y = \dd z = 0$, so

$$
\dd\tau = \sqrt{1 + \frac{2\Phi}{c^2}}\;\dd t \approx \Bigl(1 + \frac{\Phi}{c^2}\Bigr)\dd t,
$$

which is [[#eq-clock-rate]]. The space–space coefficient cannot be deduced from the equivalence principle. It comes from Einstein's field equations, and we quote it, as Hartle does. It matters only for fast particles: for a body moving at speed $v$, the spatial terms contribute at order $(\Phi/c^2)(v^2/c^2)$, negligible for planets but comparable to the time–time term for light. It is the source of the missing half in [[#ex-half-deflection]].

Now the question is what replaces Newton's first law. In special relativity, a free particle moves on a straight worldline, and among all timelike worldlines between two events the straight one has the *longest* proper time. This is the twin paradox: the twin who stays inertial ages most. The equivalence principle suggests that the same characterisation works in curved spacetime.

::: definition Geodesic {#def-geodesic}
A timelike **geodesic** between two events is a worldline that makes the proper time

$$
\tau[\text{path}] = \frac1c\int\sqrt{-\sum_{\mu\nu} g_{\mu\nu}\,\dd x^\mu\,\dd x^\nu}
$$

stationary under all small variations of the worldline that keep the end events fixed. The **principle of extremal proper time** states that a freely falling test particle moves on a timelike geodesic. Light moves on a **null geodesic**, a worldline with $\dd s^2 = 0$ that is a limit of timelike geodesics.
:::

There is no force of gravity in this description. The particle simply does what free particles do, and the gravitational field is entirely in the $g_{\mu\nu}$. The next theorem checks that this reproduces Newton.

::: theorem The Newtonian limit {#thm-newton-limit}
For a particle moving with speed $v \ll c$ in the static weak-field metric [[#eq-weak-metric]], the principle of extremal proper time gives, to leading order, Newton's equation of motion

$$
\ddot{\mathbf x} = -\nabla\Phi.
$$
:::

::: proof
Parametrise the worldline by coordinate time $t$ and write $\mathbf v = \dd\mathbf x/\dd t$. From [[#eq-weak-metric]],

$$
\dd\tau = \dd t\,\sqrt{\Bigl(1 + \frac{2\Phi}{c^2}\Bigr) - \Bigl(1 - \frac{2\Phi}{c^2}\Bigr)\frac{v^2}{c^2}}.
$$

Both $\Phi/c^2$ and $v^2/c^2$ are small. Keep terms of first order in them; the cross term $\Phi v^2/c^4$ is second order and is dropped. Then $\sqrt{1 + \epsilon} \approx 1 + \epsilon/2$ gives

$$
\tau \approx \int\Bigl(1 + \frac{\Phi}{c^2} - \frac{v^2}{2c^2}\Bigr)\dd t = (t_2 - t_1) - \frac{1}{c^2}\int\Bigl(\frac12 v^2 - \Phi(\mathbf x)\Bigr)\dd t.
$$

The end events are fixed, so $t_2 - t_1$ is fixed, and making $\tau$ stationary is the same as making the integral

$$
S = \int\Bigl(\tfrac12 v^2 - \Phi(\mathbf x)\Bigr)\dd t
$$

stationary. That is Hamilton's principle for the Lagrangian $L = \tfrac12 v^2 - \Phi$ per unit mass, from [[analytical-mechanics/lagrangian]]. Its Euler–Lagrange equations,

$$
\frac{\dd}{\dd t}\frac{\partial L}{\partial \dot x_i} = \frac{\partial L}{\partial x_i},
$$

give $\ddot x_i = -\partial_i\Phi$, which is Newton's law. Because $\tau = (t_2 - t_1) - S/c^2$, a minimum of $S$ is a maximum of $\tau$: free fall maximises proper time over short paths. The space–space part of the metric entered only in the dropped term, so the Newtonian limit tests only $g_{00}$.
:::

::: example A ball thrown upwards ages most {#ex-ball-ages}
A ball is thrown vertically upward on the Earth and caught at the same point $2.00\,\mathrm{s}$ later. Compare its proper time with that of a clock at rest at the throwing point, and explain the sign.
::: solution
Take the throw point as $h = 0$ and use $\Phi = gh$ near the surface, with $g = 9.80\,\mathrm{m/s^2}$. The ball's height and speed are $h = v_0 t - \tfrac12 g t^2$ and $v = v_0 - gt$, with $v_0 = g\times 1.00\,\mathrm{s} = 9.80\,\mathrm{m/s}$. From the proof of [[#thm-newton-limit]], the excess of the ball's proper time over the clock's is

$$
\Delta\tau = \frac{1}{c^2}\int_0^{2.00\,\mathrm{s}}\Bigl(gh - \tfrac12 v^2\Bigr)\dd t.
$$

Using $T = 2.00\,\mathrm{s}$ and $v_0 = gT/2$, the two integrals are

$$
\int_0^T gh\,\dd t = g\Bigl(\frac{v_0T^2}{2} - \frac{gT^3}{6}\Bigr) = \frac{g^2T^3}{12}, \qquad \int_0^T \tfrac12 v^2\,\dd t = \frac{g^2T^3}{24}.
$$

Hence

$$
\Delta\tau = \frac{g^2T^3}{24c^2} = \frac{9.80^2\times 8.00}{24\times(2.998\times 10^8)^2}\,\mathrm{s} = 3.6\times 10^{-16}\,\mathrm{s}.
$$

The ball ages slightly more than the clock that stayed behind: it gains by climbing to where clocks run fast and loses by moving, and the free-fall path balances the two so as to maximise the total. This is the gravitational version of the twin paradox.
:::
:::

::: history From Galileo's tower to MICROSCOPE
The universality of free fall is usually traced to Galileo Galilei, whose experiments with inclined planes and pendulums, described in the *Discourses on Two New Sciences* (1638), led him to state that in the absence of air all bodies would fall at the same rate; the story of the Leaning Tower of Pisa comes from his pupil Vincenzo Viviani and may not describe an actual experiment. Loránd Eötvös published a torsion-balance result in 1889 and, with Pekár and Fekete, the much more extensive measurements that appeared in 1922, three years after his death.

Albert Einstein's review article of 1907 in the *Jahrbuch der Radioaktivität und Elektronik* introduced the equivalence of a uniform field and an accelerated frame, and derived from it the gravitational redshift and time dilation; he later called the realisation that a falling observer feels no weight "the happiest thought of my life". In 1911 he computed the deflection of light from the equivalence principle alone and obtained half of the value he would find with the full theory in 1915. Robert Vessot's Gravity Probe A rocket of 1976 confirmed it to about $10^{-4}$ with a hydrogen maser. The MICROSCOPE mission published its final bound on $\eta$ in 2022.
:::

## Where this leads {#leads}

The weak-field metric [[#eq-weak-metric]] is the approximation, for $\abs{\Phi} \ll c^2$, of the exact Schwarzschild metric outside a spherical mass. In [[gravitation/schwarzschild]] the same principle of extremal proper time gives orbits that do not close, which is the precession of Mercury, and null geodesics that bend by the full $1.75''$. In [[gravitation/black-holes]] the redshift of [[#eq-redshift]] grows without bound near the horizon, and the tidal accelerations of [[#thm-tidal]] reappear in vacuum as the waves of [[gravitation/gravitational-waves]]. And the redshift of light from distant galaxies in [[gravitation/cosmology]] is a cousin of the gravitational redshift, produced by the expansion of space between emitter and receiver.

::: summary
- Inertial and gravitational mass are logically distinct; experiment shows their ratio is universal, with the Eötvös parameter $\eta$ consistent with zero at about $3\times 10^{-15}$ (MICROSCOPE, 2022).
- A uniform gravitational field is removed by going to a freely falling frame. The Einstein equivalence principle extends this to all of physics: in a small falling laboratory, special relativity holds.
- What cannot be removed are tidal accelerations, $+2GMz/r^3$ radially and $-GMx/r^3$ transversely; they fall as $1/r^3$ and are the signature of spacetime curvature.
- Light climbing through a potential difference $\Delta\Phi$ is redshifted by $\Delta\nu/\nu = -\Delta\Phi/c^2$, and a static clock at potential $\Phi$ runs at the rate $1 + \Phi/c^2$.
- Pound and Rebka measured $gh/c^2 = 2.45\times 10^{-15}$ over $22.5\,\mathrm{m}$; GPS clocks gain a net $38.5\,\mu\mathrm{s}$ per day ($+45.7$ gravitational, $-7.2$ velocity) and are offset before launch.
- The equivalence principle alone predicts a solar light deflection of $0.88''$; general relativity predicts twice that, $1.75''$, because space is curved too.
- Gravity is encoded in a metric $g_{\mu\nu}$; free particles follow geodesics, worldlines of extremal (locally maximal) proper time. For slow motion in the weak-field metric this reduces to Newton's law.
:::

## Exercises {#exercises}

::: exercise The Pound–Rebka shift {level=1 check="2.45e-15"}
Find the fractional frequency shift $gh/c^2$ for light travelling once up a tower of height $h = 22.5\,\mathrm{m}$, with $g = 9.80\,\mathrm{m/s^2}$. State whether light arriving at the top is shifted to higher or lower frequency.
::: solution
From [[#eq-redshift-uniform]],

$$
\frac{gh}{c^2} = \frac{9.80\times 22.5}{(2.99792458\times 10^{8})^2} = \frac{220.5}{8.988\times 10^{16}} = 2.45\times 10^{-15}.
$$

Light arriving at the top has climbed to a higher potential, so its frequency is lower: it is redshifted by $2.45\times 10^{-15}$ of its frequency.
:::
:::

::: exercise Uncorrected GPS {level=1 check="11.5"}
If the net relativistic rate offset of $38.5\,\mu\mathrm{s}$ per day for GPS satellite clocks were not corrected, by roughly how many kilometres would a range computed from light travel time drift in one day?
::: solution
A range is $c$ times a travel time, so a timing error $\Delta t$ becomes a range error $c\,\Delta t$:

$$
c\,\Delta t = 2.998\times 10^{8}\,\mathrm{m/s}\times 38.5\times 10^{-6}\,\mathrm{s} = 1.15\times 10^{4}\,\mathrm{m} = 11.5\,\mathrm{km}.
$$

The real position error depends on how the errors of the several satellites combine, but the order of magnitude, kilometres per day, makes the system useless without the correction.
:::
:::

::: exercise An Eötvös parameter {level=1 check="3.1e-10"}
Two balls of different materials released together are found to fall at $9.80\,\mathrm{m/s^2}$, with accelerations that differ by $3.0\times 10^{-9}\,\mathrm{m/s^2}$. Find the Eötvös parameter $\eta$.
::: solution
From [[#eq-eta]], with $a_A + a_B \approx 2\times 9.80\,\mathrm{m/s^2}$,

$$
\eta = 2\,\frac{3.0\times 10^{-9}}{19.6} = 3.1\times 10^{-10}.
$$

Such a difference would already be about a hundred thousand times larger than the bound set by MICROSCOPE.
:::
:::

::: exercise A year on Everest {level=2 check="30.4"}
A clock is kept for one Julian year ($3.15576\times 10^{7}\,\mathrm{s}$) on the summit of Mount Everest, $8849\,\mathrm{m}$ above sea level. Treating $g = 9.80\,\mathrm{m/s^2}$ as uniform over that height, by how many microseconds does it gain on an identical clock at sea level?
::: solution
The fractional rate difference is $gh/c^2$ by [[#eq-clock-rate]] with $\Delta\Phi = gh$:

$$
\frac{gh}{c^2} = \frac{9.80\times 8849}{8.988\times 10^{16}} = 9.649\times 10^{-13}.
$$

Over one year,

$$
\Delta\tau = 9.649\times 10^{-13}\times 3.15576\times 10^{7}\,\mathrm{s} = 3.045\times 10^{-5}\,\mathrm{s} = 30.4\,\mu\mathrm{s}.
$$

The higher clock gains. The decrease of $g$ with height changes the answer by about $0.3\%$, below the precision quoted. Optical clocks resolve height differences a million times smaller than this.
:::
:::

::: exercise The space station clock {level=2 check="-24.5"}
The International Space Station orbits at an altitude of about $420\,\mathrm{km}$, in a nearly circular orbit. With $R_\oplus = 6371\,\mathrm{km}$ and ignoring the Earth's rotation, find the net number of microseconds per day by which a clock on the station runs ahead of a ground clock. (A negative answer means it falls behind.)
::: solution
Use the result of [[#ex-gps]], with $r = 6.791\times 10^{6}\,\mathrm{m}$ in place of $a$:

$$
\frac{\Delta(\dd\tau)}{\dd t} = \frac{GM_\oplus}{c^2}\Bigl(\frac{1}{R_\oplus} - \frac{3}{2r}\Bigr) = 4.435\times 10^{-3}\Bigl(\frac{1}{6.371\times 10^{6}} - \frac{1.5}{6.791\times 10^{6}}\Bigr).
$$

The bracket is $(1.5696 - 2.2088)\times 10^{-7} = -6.392\times 10^{-8}\,\mathrm{m^{-1}}$, so the fractional rate is $-2.835\times 10^{-10}$. Multiplying by $86\,400\,\mathrm{s}$ gives $-2.45\times 10^{-5}\,\mathrm{s}$, that is $-24.5\,\mu\mathrm{s}$ per day. In low orbit the velocity term wins: the station clock falls behind. An astronaut who spends six months on board ages about $4.5\,\mathrm{ms}$ less than she would have on the ground.
:::
:::

::: exercise The redshift of Sirius B {level=2 check="77.1"}
The white dwarf Sirius B has mass $1.018\,M_\odot$ and radius $0.0084\,R_\odot$, with $R_\odot = 6.957\times 10^{8}\,\mathrm{m}$. Light from its surface is redshifted on its way to us. Express the fractional redshift as the equivalent Doppler velocity $c\,\abs{\Delta\nu}/\nu$, in kilometres per second.
::: hint
Light reaches us essentially at $\Phi = 0$. Use [[#eq-redshift]] with $\Phi_{\mathrm{em}} = -GM/R$; the field is still weak.
:::
::: solution
The radius is $R = 0.0084\times 6.957\times 10^{8} = 5.844\times 10^{6}\,\mathrm{m}$, comparable to the Earth's. From [[#eq-redshift]],

$$
\frac{\abs{\Delta\nu}}{\nu} = \frac{GM}{Rc^2} = \frac{1.018\times 1.327\times 10^{20}}{5.844\times 10^{6}\times 8.988\times 10^{16}} = 2.572\times 10^{-4}.
$$

This is still much less than $1$, so the weak-field formula is adequate. Multiplying by $c$,

$$
c\,\frac{\abs{\Delta\nu}}{\nu} = 2.572\times 10^{-4}\times 2.998\times 10^{5}\,\mathrm{km/s} = 77.1\,\mathrm{km/s}.
$$

Measurements with the Hubble Space Telescope give about $80\,\mathrm{km/s}$, consistent with this within the uncertainties of the mass and radius. The degenerate electron gas that holds Sirius B up is the subject of [[statistical-mechanics/bose-fermi]] and [[gravitation/stars]].
:::
:::

::: exercise No perpetual motion {level=3 #exr-perpetual}
A device at the bottom of a tower of height $h$ in a uniform field $g$ converts a mass $m$ entirely into a photon of energy $E_{\mathrm{em}} = mc^2$, which is sent to the top. There it is converted back into mass, which is lowered to the bottom, doing work on the way. Show that if the photon arrives at the top with the same energy it had at the bottom, the cycle produces net work from nothing. Deduce that energy conservation requires $E_{\mathrm{rec}}/E_{\mathrm{em}} = 1 - gh/c^2$ to first order, and hence [[#eq-redshift-uniform]] with $E = h\nu$.
::: hint
At the top the received energy $E_{\mathrm{rec}}$ becomes a mass $E_{\mathrm{rec}}/c^2$. Lowering it releases work $(E_{\mathrm{rec}}/c^2)gh$.
:::
::: solution
At the top the photon's energy $E_{\mathrm{rec}}$ is converted into a rest mass $m' = E_{\mathrm{rec}}/c^2$, which we lower to the bottom. Lowering a mass $m'$ through height $h$ in the uniform field releases work $W = m'gh$ to whatever lowers it. At the bottom the mass is converted to a photon again, with energy $m'c^2 = E_{\mathrm{rec}}$, and the apparatus is back in its original state provided $E_{\mathrm{rec}} = E_{\mathrm{em}}$.

Suppose the photon did not change energy, $E_{\mathrm{rec}} = E_{\mathrm{em}} = mc^2$. Then after one cycle the apparatus is in exactly its initial state, and we have extracted work $W = mgh > 0$. Repeating the cycle extracts unlimited energy from nothing, contradicting conservation of energy.

Energy is conserved only if the photon loses on the way up exactly the work released on the way down. Over one cycle the change in energy stored in the apparatus is $E_{\mathrm{rec}} - E_{\mathrm{em}}$, and the work given out is $(E_{\mathrm{rec}}/c^2)gh$, so conservation requires

$$
E_{\mathrm{em}} - E_{\mathrm{rec}} = \frac{E_{\mathrm{rec}}}{c^2}\,gh, \qquad \text{that is}\qquad \frac{E_{\mathrm{rec}}}{E_{\mathrm{em}}} = \frac{1}{1 + gh/c^2} = 1 - \frac{gh}{c^2} + O\Bigl(\frac{g^2h^2}{c^4}\Bigr).
$$

With $E = h\nu$ for a photon (Planck's constant here, not the height), the frequency ratio is the energy ratio, which is [[#eq-redshift-uniform]]. The argument, due in this form to Einstein (1911) and later sharpened by Bondi, shows that the gravitational redshift is required by energy conservation together with $E = mc^2$ and the universality of free fall for the lowered mass.
:::
:::

::: exercise The tidal field has zero trace {level=3}
Show that in the tidal accelerations [[#eq-tidal]] the three coefficients add to zero. Then prove the general statement: for any static Newtonian potential, the matrix $T_{ij} = \partial_i\partial_j\Phi$ that gives the tidal acceleration $\ddot\xi_i = -\sum_j T_{ij}\xi_j$ has trace $4\pi G\rho$, where $\rho$ is the local mass density. Deduce that in vacuum a small sphere of free particles changes shape but, to first order in time, not volume.
::: solution
The coefficients of $x$, $y$, $z$ in [[#eq-tidal]] are $-GM/r^3$, $-GM/r^3$ and $+2GM/r^3$, whose sum is zero.

In general the trace of $T_{ij}$ is $\sum_i\partial_i^2\Phi = \nabla^2\Phi$. The Newtonian field equation, Poisson's equation, is $\nabla^2\Phi = 4\pi G\rho$, which follows from Gauss's law for gravity in [[mechanics/gravitation]]. Hence $\tr T = 4\pi G\rho$, and in vacuum $\tr T = 0$.

For the volume, consider a small sphere of particles released at rest relative to the falling origin, with displacements $\xi_i(0)$ and $\dot\xi_i(0) = 0$. Then to second order in time $\xi_i(t) = \xi_i(0) - \tfrac12 t^2\sum_j T_{ij}\xi_j(0)$. The map $\boldsymbol\xi(0) \mapsto \boldsymbol\xi(t)$ is linear with matrix $I - \tfrac12 t^2 T$, so volumes are multiplied by

$$
\det\bigl(I - \tfrac12 t^2 T\bigr) = 1 - \tfrac12 t^2\tr T + O(t^4).
$$

In vacuum $\tr T = 0$, so the volume is unchanged at this order while the sphere is stretched into an ellipsoid: longer radially, narrower transversely. Inside matter, $\tr T = 4\pi G\rho > 0$ and the volume shrinks. In general relativity this statement survives with $\rho$ replaced by a combination of energy density and pressure; it is one way of writing Einstein's field equation, and it is why a gravitational wave, travelling through vacuum, squeezes in one direction exactly as it stretches in the perpendicular one.
:::
:::
