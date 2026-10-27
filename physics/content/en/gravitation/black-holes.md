In April 2019 the Event Horizon Telescope collaboration released a picture of a bright, lopsided ring of radio emission $42$ microarcseconds across, around a dark centre, at the heart of the galaxy M87. In May 2022 it released a similar picture of Sagittarius A*, the dark object at the centre of the Milky Way. Both pictures show, to within the precision of the measurement, what the Schwarzschild geometry of [[gravitation/schwarzschild]] predicts for light passing close to a mass that lies entirely inside its own Schwarzschild radius. Such an object is a **black hole**.

The previous chapter used the Schwarzschild metric outside stars and planets, where $r_s$ lies deep inside the matter. Here all the mass is inside $r_s$, and the questions change. What happens at $r = r_s$, where the metric seems to blow up? What does a falling observer experience, and what does a distant observer see? Is there anything at $r = 0$? This chapter answers these at Hartle's level: radial infall in two kinds of time, the difference between a coordinate singularity and a physical one, coordinates that cross the horizon, the shadow, rotating black holes in outline, and Hawking's discovery that black holes are not quite black.

We keep the notation of [[gravitation/schwarzschild]]: $r_s = 2GM/c^2$, and $r$ is the areal radius.

## Falling in {#infall}

The simplest motion is a radial plunge, $\ell = 0$. Take a particle that falls from rest far away, so $e = 1$. The radial equation of [[gravitation/schwarzschild]] reduces to

$$
\Bigl(\deriv{r}{\tau}\Bigr)^2 = c^2e^2 - \Bigl(1 - \frac{r_s}{r}\Bigr)c^2 = \frac{c^2r_s}{r} = \frac{2GM}{r},
$$ {#eq-plunge}

which has exactly the Newtonian form $v^2 = 2GM/r$ for free fall from infinity, with proper time in place of Newtonian time and areal radius in place of distance.

::: theorem Two clocks for the same fall {#thm-infall}
For a particle falling radially from rest at infinity in the Schwarzschild geometry:

1. The proper time it takes to fall from $r_0$ to $r$, with $0 \le r < r_0$, is

$$
\tau = \frac{2}{3c\sqrt{r_s}}\bigl(r_0^{3/2} - r^{3/2}\bigr),
$$ {#eq-tau-fall}

finite, and nothing special happens at $r = r_s$.

2. The Schwarzschild coordinate time $t$ tends to $+\infty$ as $r \to r_s$ from outside: near the horizon,

$$
t \approx -\frac{r_s}{c}\ln\Bigl(\frac{r - r_s}{r_s}\Bigr) + \text{const}.
$$ {#eq-t-fall}
:::

::: proof
For (1), take the negative root of [[#eq-plunge]], since $r$ decreases: $\dd r/\dd\tau = -c\sqrt{r_s/r}$. Then

$$
\tau = \int_r^{r_0}\frac{\sqrt{r'}}{c\sqrt{r_s}}\,\dd r' = \frac{2}{3c\sqrt{r_s}}\bigl(r_0^{3/2} - r^{3/2}\bigr).
$$

The integrand is finite and continuous for all $r' \ge 0$, so the integral is finite for every $r < r_0$, including $r \le r_s$.

For (2), the conserved energy with $e = 1$ gives $\dd t/\dd\tau = (1 - r_s/r)^{-1}$. Dividing by $\dd r/\dd\tau$,

$$
\deriv{t}{r} = -\frac{1}{c}\sqrt{\frac{r}{r_s}}\,\frac{1}{1 - r_s/r} = -\frac{1}{c}\sqrt{\frac{r}{r_s}}\,\frac{r}{r - r_s}.
$$

As $r \to r_s^+$ the first two factors tend to $1/c$ and $r_s$, so $\dd t/\dd r \approx -(r_s/c)/(r - r_s)$. Integrating gives [[#eq-t-fall]], which diverges logarithmically: the particle never reaches $r_s$ at any finite value of $t$.
:::

The two statements are not in conflict. The falling particle's own clock records a finite, uneventful crossing. The coordinate $t$ is the time of a distant static clock, and the infinite value of $t$ at the crossing means only that the distant observer never *sees* the crossing. Light emitted by the particle just before it reaches $r_s$ takes longer and longer to climb out, and arrives more and more redshifted.

::: example Falling into a ten-solar-mass black hole {#ex-fall-time}
A probe falls radially from rest at infinity into a black hole of $10\,M_\odot$. How much proper time does it take to fall from $r = 10r_s$ to the horizon, and from the horizon to $r = 0$?
::: solution
For $10\,M_\odot$, $r_s = 29.53\,\mathrm{km}$ and $r_s/c = 9.851\times 10^{-5}\,\mathrm{s}$. Write [[#eq-tau-fall]] in units of $r_s$:

$$
\tau = \frac{2}{3}\frac{r_s}{c}\Bigl[\Bigl(\frac{r_0}{r_s}\Bigr)^{3/2} - \Bigl(\frac{r}{r_s}\Bigr)^{3/2}\Bigr].
$$

From $10r_s$ to $r_s$, the bracket is $10^{3/2} - 1 = 30.62$, so $\tau = \tfrac23\times 30.62\times 9.851\times 10^{-5}\,\mathrm{s} = 2.01\,\mathrm{ms}$. From $r_s$ to $0$, the bracket is $1$, so $\tau = \tfrac23\times 9.851\times 10^{-5}\,\mathrm{s} = 65.7\,\mu\mathrm{s}$. The whole journey from $300\,\mathrm{km}$ takes about two milliseconds of the probe's time. A distant observer watching its signals sees them slow down and fade, on a time scale of the same order as $r_s/c$, and never sees the crossing.
:::
:::

### Infinite redshift

A static emitter at radius $r$ sends light to a distant receiver with redshift

$$
1 + z = \Bigl(1 - \frac{r_s}{r}\Bigr)^{-1/2},
$$

from [[gravitation/schwarzschild]]. As $r \to r_s$ this diverges. Near the horizon a static observer must fire a rocket of enormous thrust to stay put, and the light she emits arrives at infinity with arbitrarily low frequency. For the infalling probe there is also a Doppler shift, since it moves away from the distant observer, but the conclusion is the same: the received light dims and reddens exponentially. Near the horizon $r - r_s$ shrinks like $e^{-ct/r_s}$ by [[#eq-t-fall]], so the gravitational factor $(1 - r_s/r)^{-1/2}$ grows like $e^{ct/(2r_s)}$. For a stellar-mass black hole the e-folding time is a fraction of a millisecond, and the probe disappears from view almost at once.

::: widget plot
f: 1/sqrt(1 - 1/x) - 1; 1/(2*x)
x: 1.01, 6
y: 0, 3
labels: exact redshift z of a static emitter; weak-field estimate r_s/(2r)
caption: Redshift $z$ of light from a static emitter at radius $r = x\,r_s$, received far away. At $x = 1.5$, the photon sphere, $z = 0.73$. Move towards the left edge: the exact curve rises without bound as the emitter approaches the horizon, while the weak-field estimate stays finite and is already wrong by a factor of two at $x = 2$. Beyond $x \approx 5$ the two curves are hard to tell apart; for neutron stars, at $x \approx 3$, the difference matters.
:::

## The horizon and the singularity {#horizon}

The metric component $g_{rr} = (1 - r_s/r)^{-1}$ is infinite at $r = r_s$, and $g_{tt}$ vanishes there. Yet the falling particle notices nothing. The resolution is that metric components depend on coordinates. A bad choice of coordinates can make a perfectly smooth geometry look singular, as polar coordinates make the origin of the plane look singular: the metric $\dd r^2 + r^2\dd\phi^2$ has a vanishing component at $r = 0$, where nothing is wrong with the plane.

To decide whether a place in spacetime is really singular, look at quantities that do not depend on coordinates. The simplest measure of the tidal field is the **Kretschmann scalar**, a sum of squares of the components of the Riemann curvature tensor. For the Schwarzschild metric it is

$$
K = \frac{12\,r_s^2}{r^6} = \frac{48\,G^2M^2}{c^4r^6}.
$$ {#eq-kretschmann}

We quote this; computing it needs the full curvature tensor, as in Carroll (2004), §5.7. It is finite at $r = r_s$ and infinite at $r = 0$.

::: definition Coordinate and curvature singularities {#def-singularity}
A **coordinate singularity** is a place where the components of the metric in some coordinate system are singular, but where a change of coordinates gives a regular metric and every curvature invariant is finite. A **curvature singularity** is a place where a curvature invariant such as $K$ diverges, so that no change of coordinates can remove it. In the Schwarzschild geometry, $r = r_s$ is a coordinate singularity and $r = 0$ is a curvature singularity.
:::

Tidal accelerations are also coordinate-independent: they are what a freely falling observer measures with a ruler. For radial separation $L$, the Newtonian tidal formula of [[gravitation/equivalence]], $\Delta a = 2GML/r^3$, turns out to be exact in the falling observer's frame for the Schwarzschild metric, with $r$ the areal radius.

::: example Spaghettification {#ex-tidal}
Compare the tidal stretching of a $2.0\,\mathrm{m}$ astronaut, oriented radially, as she crosses the horizon of a $10\,M_\odot$ black hole and the horizon of Sagittarius A*, of $4.3\times 10^{6}\,M_\odot$.
::: solution
At the horizon, $r = r_s = 2GM/c^2$, so

$$
\Delta a = \frac{2GML}{r_s^3} = \frac{2GML\,c^6}{8G^3M^3} = \frac{Lc^6}{4G^2M^2}.
$$

The tidal acceleration at the horizon falls as $1/M^2$. For $10\,M_\odot$, with $GM = 1.327\times 10^{21}\,\mathrm{m^3/s^2}$,

$$
\Delta a = \frac{2.0\times(2.998\times 10^8)^6}{4\times(1.327\times 10^{21})^2} = 2.1\times 10^{8}\,\mathrm{m/s^2},
$$

twenty million times $g$. The astronaut is pulled apart long before she reaches the horizon. For Sagittarius A* the mass is $4.3\times 10^{5}$ times larger, so the tidal acceleration is $(4.3\times 10^5)^2 = 1.8\times 10^{11}$ times smaller: $1.1\times 10^{-3}\,\mathrm{m/s^2}$, about $10^{-4}\,g$. She crosses the horizon of a supermassive black hole without noticing anything locally. Tides become fatal only well inside, as $r \to 0$, where $\Delta a \propto r^{-3}$ grows without bound.
:::
:::

### Crossing the horizon

The Schwarzschild time coordinate is the problem: it runs to infinity at the horizon. Replace it by a coordinate adapted to ingoing light. Radial light rays satisfy $\dd s^2 = 0$ with $\dd\theta = \dd\phi = 0$, so $c\,\dd t = \pm\dd r/(1 - r_s/r)$. Define the **tortoise coordinate**

$$
r_* = r + r_s\ln\Bigl\lvert\frac{r}{r_s} - 1\Bigr\rvert, \qquad \deriv{r_*}{r} = \frac{1}{1 - r_s/r},
$$

which runs to $-\infty$ at the horizon, and the **ingoing Eddington–Finkelstein coordinate** $v = ct + r_*$. An ingoing radial light ray has $v$ constant.

::: proposition The ingoing Eddington–Finkelstein form {#prop-ef}
In the coordinates $(v, r, \theta, \phi)$ the Schwarzschild metric becomes

$$
\dd s^2 = -\Bigl(1 - \frac{r_s}{r}\Bigr)\dd v^2 + 2\,\dd v\,\dd r + r^2\bigl(\dd\theta^2 + \sin^2\theta\,\dd\phi^2\bigr),
$$ {#eq-ef}

whose components are finite at $r = r_s$, and which is valid for all $r > 0$.
:::

::: proof
Write $f = 1 - r_s/r$. From $v = ct + r_*$, $c\,\dd t = \dd v - \dd r/f$. Substituting into the $t$–$r$ part of [[gravitation/schwarzschild#eq-schwarzschild]],

$$
-f\Bigl(\dd v - \frac{\dd r}{f}\Bigr)^2 + \frac{\dd r^2}{f} = -f\,\dd v^2 + 2\,\dd v\,\dd r - \frac{\dd r^2}{f} + \frac{\dd r^2}{f} = -f\,\dd v^2 + 2\,\dd v\,\dd r.
$$

The singular terms in $\dd r^2/f$ cancel. The remaining components, $-f$ and $1$, are finite for every $r > 0$, and the determinant of the $v$–$r$ block is $-1$, never zero, so the metric is non-degenerate at $r = r_s$. The coordinate transformation was derived for $r > r_s$; the new form extends smoothly to $r < r_s$, and that extension is what the falling particle explores.
:::

::: theorem No escape from inside the horizon {#thm-trapped}
In the region $0 < r < r_s$ of the metric [[#eq-ef]], every future-directed timelike or null worldline has $r$ strictly decreasing.
:::

::: proof
We take the time orientation from outside the horizon, where $v$ increases along the worldline of every static observer, and extend it continuously across $r = r_s$. In the coordinates $(v, r, \theta, \phi)$ the future-directed timelike and null displacements then have $\dd v \ge 0$, and the only one with $\dd v = 0$ is along the ingoing radial light ray, on which $\dd r < 0$.

Suppose first $\dd v > 0$. For a timelike or null displacement, $\dd s^2 \le 0$, so by [[#eq-ef]]

$$
2\,\dd v\,\dd r \le f\,\dd v^2 - r^2\bigl(\dd\theta^2 + \sin^2\theta\,\dd\phi^2\bigr) \le f\,\dd v^2.
$$

Inside the horizon $f = 1 - r_s/r < 0$, so the right-hand side is negative. Dividing by $2\,\dd v > 0$ gives $\dd r < 0$. If instead $\dd v = 0$, the displacement is the ingoing light ray, and again $\dd r < 0$.
:::

The picture is easiest with light cones. For outgoing radial light, setting $\dd s^2 = 0$ and $\dd v \neq 0$ in [[#eq-ef]] gives $\dd r/\dd v = f/2$. Outside the horizon this is positive and outgoing light escapes. At $r = r_s$ it is zero: "outgoing" light stays at the horizon forever. Inside, it is negative: even light aimed outwards moves inwards. The future light cones tip over as one goes in, and inside the horizon the whole future cone points towards $r = 0$. The singularity is not a place in space that one might steer around; inside the horizon it lies in every future, as inevitably as tomorrow.

::: definition Event horizon {#def-horizon}
The **event horizon** of a black hole is the boundary of the region of spacetime from which no future-directed timelike or null worldline can reach arbitrarily large distances. For the Schwarzschild metric it is the surface $r = r_s$, a null surface generated by the outgoing light rays that stay at $r = r_s$.
:::

::: warning The horizon is not a surface of infinite force
It is tempting to say that "gravity becomes infinite at the horizon". Nothing measurable by a falling observer is infinite there: the tidal acceleration is $c^6L/(4G^2M^2)$, finite and small for a large black hole, and the falling clock ticks normally. What diverges is the thrust needed to *hover* at fixed $r$, and the redshift seen by a distant observer. Both describe the relation between the horizon and distant static observers. The horizon is a global property of the spacetime: a falling observer cannot tell, locally, when she crosses it.
:::

::: quiz
An astronaut has fallen inside the horizon of a large Schwarzschild black hole. She fires her rocket as hard as she can directly outwards. Which statement is correct?
- [ ] If the rocket is strong enough she can return to the horizon and hover there.
- [ ] She can escape, but only by moving faster than light.
- [x] She will reach $r = 0$ whatever she does, within a proper time of at most $\pi GM/c^3$ after crossing.
- [ ] She can stay at constant $r$ indefinitely if she uses the rocket carefully.
::: solution
By [[#thm-trapped]], inside the horizon every future-directed timelike worldline has $r$ decreasing, so hovering and returning are impossible. Moving faster than light would not help either, since even outgoing light moves inwards. The remaining proper time is at most $\pi GM/c^3$, a bound attained only by the free geodesic that starts from rest at the horizon (see the exercises). A well-judged outward burn can bring her a little closer to that bound than passive free fall from infinity, which gives $\tfrac23 r_s/c = 0.42\,\pi GM/c^3$; a longer or harder burn shortens her time.
:::
:::

::: remark The full Schwarzschild spacetime
The ingoing coordinates cover the exterior and the interior into which things fall. Outgoing Eddington–Finkelstein coordinates, built on $u = ct - r_*$, cover the exterior together with a different region, a **white hole**, out of which things can only emerge. Martin Kruskal and George Szekeres showed in 1960 that the vacuum solution, extended as far as geodesics allow, contains both, together with a second exterior region joined to ours by a wormhole that pinches off too quickly for anything to cross. None of this extra structure is present for a black hole formed by collapse: the star's interior, which is not vacuum, replaces the white hole and the second exterior.
:::

## Seeing a black hole {#seeing}

A black hole itself emits nothing that a distant observer can detect classically. What we see is the light from matter around it, bent by the geometry. Two radii from [[gravitation/schwarzschild]] control the appearance.

- The **photon sphere**, at $r = 3GM/c^2 = 1.5\,r_s$, where light can orbit on unstable circular orbits.
- The **critical impact parameter** $b_c = 3\sqrt3\,GM/c^2 \approx 2.60\,r_s$. Light coming in from infinity with $b < b_c$ crosses the horizon; light with $b > b_c$ turns round and escapes.

Run the rays backwards from a distant telescope. Any ray that leaves the telescope pointed within angle $b_c/D$ of a black hole at distance $D$ ends on the horizon, and carries no light from behind. The black hole therefore casts a dark **shadow** of angular diameter $2b_c/D$ against bright surroundings, larger than the horizon by the factor $3\sqrt3/2 = 2.6$. Rays just outside the shadow have circled the photon sphere one or more times before reaching us, and pile up into a thin bright **photon ring**.

::: example The shadow of M87* {#ex-eht}
The black hole in the galaxy M87 has mass $6.5\times 10^{9}\,M_\odot$ and is $16.8\,\mathrm{Mpc}$ away, with $1\,\mathrm{pc} = 3.0857\times 10^{16}\,\mathrm{m}$. Predict the angular diameter of its shadow in microarcseconds, treating it as a Schwarzschild black hole.
::: solution
The gravitational radius is $GM/c^2 = 6.5\times 10^{9}\times 1476.6\,\mathrm{m} = 9.598\times 10^{12}\,\mathrm{m}$, about $64\,\mathrm{au}$. The shadow diameter is

$$
2b_c = 2\times 3\sqrt3\times 9.598\times 10^{12}\,\mathrm{m} = 9.975\times 10^{13}\,\mathrm{m}.
$$

The distance is $D = 16.8\times 10^{6}\times 3.0857\times 10^{16} = 5.184\times 10^{23}\,\mathrm{m}$, so the angle is

$$
\theta = \frac{2b_c}{D} = 1.924\times 10^{-10}\,\mathrm{rad} = 1.924\times 10^{-10}\times 2.0626\times 10^{11}\,\mu\mathrm{as} = 39.7\,\mu\mathrm{as}.
$$

The Event Horizon Telescope, an Earth-sized interferometer observing at $1.3\,\mathrm{mm}$, measured a ring diameter of $42 \pm 3\,\mu\mathrm{as}$ in data taken in April 2017 and published in April 2019. The bright emission lies slightly outside the shadow's edge, so the agreement is as good as the uncertainty in the mass. Run backwards, the measurement gave a mass of $6.5 \pm 0.7\times 10^{9}\,M_\odot$. For Sagittarius A*, with $4.3\times 10^{6}\,M_\odot$ at $8.28\,\mathrm{kpc}$, the same calculation gives $53\,\mu\mathrm{as}$; the ring published in May 2022 is $51.8 \pm 2.3\,\mu\mathrm{as}$. The two black holes differ in mass by a factor of $1500$ and in distance by a factor of $2000$, and appear almost the same size.
:::
:::

::: quiz
Order, from smallest to largest, the horizon radius $r_s$, the photon-sphere radius, the ISCO radius and the radius $b_c$ of the shadow, for a Schwarzschild black hole.
- [ ] $r_s$, ISCO, photon sphere, $b_c$
- [x] $r_s$, photon sphere, $b_c$, ISCO
- [ ] $r_s$, $b_c$, photon sphere, ISCO
- [ ] photon sphere, $r_s$, $b_c$, ISCO
::: solution
In units of $GM/c^2$ the four are $2$, $3$, $3\sqrt3 = 5.20$ and $6$. The shadow is larger than the photon sphere because $b_c$ is an impact parameter, measured far away, and light that grazes the photon sphere was aimed from a distance $b_c$ off centre; the bending makes the sphere look bigger than it is. The shadow is still slightly smaller than the ISCO, which is why emission from the inner disc appears just outside the dark region.
:::
:::

### Weighing Sagittarius A*

Long before any image, the mass of the Galactic Centre black hole had been measured by watching stars orbit it. Two groups, led by Reinhard Genzel in Germany and Andrea Ghez in California, used infrared adaptive optics from the early 1990s to follow stars within a light-day or so of Sagittarius A*. They shared half the 2020 Nobel Prize in Physics for it, the other half going to Roger Penrose for proving that black-hole formation is a robust consequence of general relativity.

::: example The mass from the orbit of S2 {#ex-s2-mass}
The star S2 has an orbital period of $16.05$ years and an angular semi-major axis of $0.1255''$, and the Galactic Centre is $8.25\,\mathrm{kpc}$ away. Find the mass of Sagittarius A* in solar masses, and its Schwarzschild radius in astronomical units.
::: solution
At distance $D$ in parsecs, an angle of one arcsecond spans $D$ astronomical units, by the definition of the parsec. So

$$
a = 0.1255\times 8250\,\mathrm{au} = 1035\,\mathrm{au}.
$$

Kepler's third law of [[analytical-mechanics/central-forces]], in units of astronomical units, years and solar masses, is $M + m_{S2} = a^3/P^2$. The star's mass, about $14\,M_\odot$, is negligible. Hence

$$
M = \frac{1035^3}{16.05^2}\,M_\odot = \frac{1.109\times 10^{9}}{257.6}\,M_\odot = 4.31\times 10^{6}\,M_\odot.
$$

The Schwarzschild radius is $4.31\times 10^{6}\times 2.953\,\mathrm{km} = 1.27\times 10^{7}\,\mathrm{km} = 0.085\,\mathrm{au}$, smaller than Mercury's orbit. At pericentre S2 comes within $120\,\mathrm{au}$, so four million solar masses are confined within a region a few times smaller than the solar system. No cluster of stars, neutron stars or stellar-mass black holes could be packed so densely and survive, which is why the dark mass is taken to be a single black hole. The mass is uncertain mainly through $D$: since $M \propto a^3 \propto D^3$, a $1\%$ error in the distance gives a $3\%$ error in the mass.
:::
:::

## Where black holes come from {#formation}

Birkhoff's theorem says that the exterior of a spherical star is Schwarzschild whatever the star is doing. If a star collapses inside its own Schwarzschild radius, the exterior is the black-hole geometry of this chapter. J. Robert Oppenheimer and Hartland Snyder worked out the simplest case in 1939: a uniform ball of pressureless dust collapses to $r = 0$ in a finite proper time of order $GM/c^3$ multiplied by $(R_0/r_s)^{3/2}$, where $R_0$ is its initial radius, and to outside observers its surface appears to freeze at $r_s$ and fade.

Pressure can halt collapse, but only up to a point. A white dwarf is held up by the degeneracy pressure of electrons, and a neutron star by that of neutrons and by nuclear forces. Each has a maximum mass, about $1.4\,M_\odot$ for white dwarfs and somewhere between $2$ and $3\,M_\odot$ for neutron stars, beyond which no static equilibrium exists. [[gravitation/stars]] derives the first and explains why general relativity makes the second unavoidable. A stellar core heavier than the neutron-star limit becomes a black hole. Observed X-ray binaries contain dark companions from about $5$ to about $20\,M_\odot$, and gravitational-wave detectors have found black holes from a few to more than a hundred solar masses.

The supermassive black holes in galactic centres, from $10^{6}$ to $10^{10}\,M_\odot$, cannot be single collapsed stars. They grew by accretion and mergers, and how they grew so large so early, within the first billion years after the Big Bang, is an active question.

## Rotating black holes {#kerr}

Real stars rotate, and angular momentum is conserved in collapse, so astrophysical black holes spin. The exact solution for a rotating black hole was found by Roy Kerr in 1963. It has two parameters: the mass $M$ and the angular momentum $J$, conveniently written as a length $a = J/(Mc)$. We do not write the metric; its main features are these.

- The event horizon is at $r_+ = GM/c^2 + \sqrt{(GM/c^2)^2 - a^2}$, in Boyer–Lindquist coordinates that reduce to Schwarzschild coordinates when $a = 0$. A horizon exists only for $a \le GM/c^2$. The dimensionless spin $\chi = ac^2/(GM)$ therefore lies between $0$ and $1$. At $\chi = 1$, an **extremal** black hole, the horizon is at $GM/c^2$, half the Schwarzschild value.
- Outside the horizon is the **ergosphere**, where no observer can remain at rest relative to distant stars: spacetime itself is dragged round with the hole. Energy can be extracted from the rotation there, by the Penrose process, or by magnetic fields threading the horizon, which is the leading model for the jets of quasars.
- The ISCO moves inwards for orbits that co-rotate with the hole, from $6GM/c^2$ at $\chi = 0$ to $GM/c^2$ as $\chi \to 1$, and outwards to $9GM/c^2$ for counter-rotating orbits. The efficiency of accretion rises accordingly, from $5.7\%$ to $42\%$ of the rest energy.

::: widget plot
f: 1 + sqrt(1 - x^2); 3 + sqrt(3*x^2 + (1 + cbrt(1 - x^2)*(cbrt(1 + x) + cbrt(1 - x)))^2) - sqrt((2 - cbrt(1 - x^2)*(cbrt(1 + x) + cbrt(1 - x)))*(4 + cbrt(1 - x^2)*(cbrt(1 + x) + cbrt(1 - x)) + 2*sqrt(3*x^2 + (1 + cbrt(1 - x^2)*(cbrt(1 + x) + cbrt(1 - x)))^2))); 3 + sqrt(3*x^2 + (1 + cbrt(1 - x^2)*(cbrt(1 + x) + cbrt(1 - x)))^2) + sqrt((2 - cbrt(1 - x^2)*(cbrt(1 + x) + cbrt(1 - x)))*(4 + cbrt(1 - x^2)*(cbrt(1 + x) + cbrt(1 - x)) + 2*sqrt(3*x^2 + (1 + cbrt(1 - x^2)*(cbrt(1 + x) + cbrt(1 - x)))^2)))
x: 0, 1
y: 0, 9.5
labels: horizon r₊; ISCO, co-rotating orbits; ISCO, counter-rotating orbits
caption: Radii in units of $GM/c^2$ against the dimensionless spin $\chi$ of a Kerr black hole (Bardeen, Press and Teukolsky's formula for the ISCO). At $\chi = 0$ the curves start at the Schwarzschild values $2$ and $6$. Move right: the horizon shrinks towards $1$, while the co-rotating ISCO falls steeply, to $2.3$ at $\chi = 0.9$ and to $1$ at $\chi = 1$. Counter-rotating orbits move out to $9$. Fitting the inner edge of an accretion disc to these curves is one way astronomers estimate black-hole spins.
:::

::: theorem The no-hair theorem {#thm-no-hair}
A stationary black hole in general relativity, in vacuum or with electromagnetic fields only, is completely described by its mass $M$, angular momentum $J$ and electric charge $Q$. Its exterior is the Kerr–Newman metric with those three parameters.
:::

We do not prove this; the proof combines work of Werner Israel (1967), Brandon Carter (1971), Stephen Hawking (1972) and David Robinson (1975), with technical assumptions discussed in Chruściel, Lopes Costa and Heusler, *Living Reviews in Relativity* 15 (2012). Astrophysical black holes are electrically neutral to excellent approximation, because any charge would be neutralised by surrounding plasma, so in practice two numbers, $M$ and $J$, describe the spacetime outside every black hole once it has settled down. Everything else about the matter that formed it, its composition and shape and magnetic field, is radiated away or swallowed. Gravitational-wave observations of the ringdown after a merger, in [[gravitation/gravitational-waves]], test this.

## Hawking radiation {#hawking}

Classically a black hole only absorbs. In 1974 Stephen Hawking applied quantum field theory on the curved background of a collapsing star and found that a distant observer sees the black hole emit thermal radiation at a temperature

$$
T_H = \frac{\hbar c^3}{8\pi GMk_B}.
$$ {#eq-hawking}

The derivation is far beyond this course (Carroll, 2004, ch. 9, gives an outline). A heuristic, not a derivation: quantum fluctuations near the horizon produce pairs of particles; one member falls in with negative energy as measured from infinity, which is possible only because inside the horizon the Schwarzschild $t$ direction is spacelike, and the other escapes. The typical wavelength of the escaping radiation is a few times the horizon size, so $k_BT \sim \hbar c/r_s$, which is [[#eq-hawking]] up to a numerical factor $1/(4\pi)$.

::: example The temperature of a solar-mass black hole {#ex-hawking}
Compute $T_H$ for $M = 1\,M_\odot = 1.988\,\times 10^{30}\,\mathrm{kg}$, with $\hbar = 1.054572\times 10^{-34}\,\mathrm{J\,s}$ and $k_B = 1.380649\times 10^{-23}\,\mathrm{J/K}$. Compare with the temperature of the cosmic microwave background, $2.7255\,\mathrm{K}$.
::: solution
Substituting into [[#eq-hawking]],

$$
T_H = \frac{1.054572\times 10^{-34}\times(2.99792\times 10^{8})^3}{8\pi\times 6.67430\times 10^{-11}\times 1.98841\times 10^{30}\times 1.380649\times 10^{-23}}\,\mathrm{K}.
$$

The numerator is $1.054572\times 10^{-34}\times 2.6944\times 10^{25} = 2.8414\times 10^{-9}$, and the denominator is $8\pi\times 6.6743\times 10^{-11}\times 1.98841\times 10^{30}\times 1.380649\times 10^{-23} = 4.6050\times 10^{-2}$. So

$$
T_H = 6.17\times 10^{-8}\,\mathrm{K}.
$$

That is sixty nanokelvin, about $4\times 10^{7}$ times colder than the microwave background. A solar-mass black hole today absorbs far more radiation from the background than it emits, and grows. Since $T_H \propto 1/M$, larger black holes are colder still. Only black holes lighter than about $4.5\times 10^{22}\,\mathrm{kg}$, less than the mass of the Moon, are hotter than the background. None are known.
:::
:::

Hawking's result completed an analogy that had looked like a coincidence. Hawking had proved in 1971 that the total area of black-hole horizons never decreases in classical processes, and Jacob Bekenstein had argued in 1972–73 that a black hole must have an entropy proportional to its area. With the temperature fixed, the first law of thermodynamics $\dd E = T\,\dd S$ applied to $E = Mc^2$ gives the **Bekenstein–Hawking entropy**

$$
S = \frac{k_Bc^3A}{4G\hbar}, \qquad A = 4\pi r_s^2.
$$

For a solar-mass black hole $S/k_B \approx 10^{77}$, about $10^{19}$ times the entropy of the Sun. The relation between this entropy and quantum states of the geometry is one of the main open problems of theoretical physics. A black hole radiating only into empty space would evaporate, with lifetime about $5120\pi G^2M^3/(\hbar c^4)$ for photon emission alone, which is $2\times 10^{67}$ years for $1\,M_\odot$.

::: history From dark stars to images
John Michell in 1783 and Pierre-Simon Laplace in 1796 noted that a star dense enough would have an escape speed exceeding the speed of light, and would be dark. Karl Schwarzschild's solution of 1916 contained the horizon, but for decades it was regarded as an artefact. In 1939 J. Robert Oppenheimer and Hartland Snyder showed that a collapsing ball of pressureless dust crosses $r_s$ in finite proper time while appearing to freeze from outside. Arthur Eddington in 1924 and David Finkelstein in 1958 found coordinates regular at the horizon, and Finkelstein first interpreted the surface as a one-way membrane. Roy Kerr found the rotating solution in 1963, and John Wheeler popularised the name "black hole" in 1967.

The first strong candidate, the X-ray binary Cygnus X-1, was identified in the early 1970s. Roger Penrose's singularity theorem of 1965 showed that singularities form generically, not only in exactly spherical collapse. Stephen Hawking predicted black-hole radiation in 1974. The Event Horizon Telescope published its image of M87* on 10 April 2019 and of Sagittarius A* on 12 May 2022.
:::

## Where this leads {#leads}

When two black holes orbit each other, the Schwarzschild ISCO and photon sphere become the end of an inspiral, a violent merger and a ringdown to a single Kerr black hole. [[gravitation/gravitational-waves]] shows how the waveform encodes the masses. How stars become black holes, and why some become neutron stars instead, is the subject of [[gravitation/stars]]. And the thermodynamics of horizons reappears in [[gravitation/cosmology]], where the expanding universe has a horizon of its own. For the statistical-mechanics background to entropy and temperature, see [[statistical-mechanics/canonical]].

::: summary
- A particle falling from rest at infinity has $(\dd r/\dd\tau)^2 = 2GM/r$ exactly. It crosses $r_s$ and reaches $r = 0$ in finite proper time, while the Schwarzschild time $t$ diverges logarithmically: distant observers never see the crossing, only a signal that reddens and fades exponentially.
- $r = r_s$ is a coordinate singularity: curvature invariants such as $K = 12r_s^2/r^6$ are finite there, and Eddington–Finkelstein coordinates make the metric regular. $r = 0$ is a curvature singularity.
- Inside the horizon every future-directed worldline has $r$ decreasing; the event horizon is the boundary of the region from which no signal escapes to infinity.
- Tidal acceleration at the horizon is $c^6L/(4G^2M^2)$: lethal for stellar-mass holes, negligible for supermassive ones.
- A black hole casts a shadow of diameter $2b_c = 6\sqrt3\,GM/c^2$; the EHT rings of M87* ($42\,\mu\mathrm{as}$) and Sgr A* ($52\,\mu\mathrm{as}$) match this. The orbit of S2 gives Sgr A* a mass of $4.3\times 10^{6}\,M_\odot$.
- Rotating (Kerr) black holes are described by $M$ and $J$ alone; spin moves the co-rotating ISCO from $6$ to $1\,GM/c^2$ and raises the accretion efficiency to $42\%$.
- Quantum mechanics gives black holes a temperature $T_H = \hbar c^3/(8\pi GMk_B)$, $6.2\times 10^{-8}\,\mathrm{K}$ for one solar mass, and an entropy proportional to the horizon area.
:::

## Exercises {#exercises}

::: exercise The size of Sagittarius A* {level=1 check="0.0849"}
Find the Schwarzschild radius of a black hole of $4.30\times 10^{6}\,M_\odot$, in astronomical units.
::: solution
The Sun's Schwarzschild radius is $2.9533\,\mathrm{km}$, so

$$
r_s = 4.30\times 10^{6}\times 2.9533\,\mathrm{km} = 1.270\times 10^{7}\,\mathrm{km}.
$$

Dividing by $1\,\mathrm{au} = 1.496\times 10^{8}\,\mathrm{km}$ gives $r_s = 0.0849\,\mathrm{au}$, about a fifth of the radius of Mercury's orbit.
:::
:::

::: exercise Ten solar masses, in nanokelvin {level=1 check="6.17"}
Using the result of [[#ex-hawking]], find the Hawking temperature of a $10\,M_\odot$ black hole, in nanokelvin.
::: solution
$T_H \propto 1/M$, so

$$
T_H = \frac{6.17\times 10^{-8}\,\mathrm{K}}{10} = 6.17\times 10^{-9}\,\mathrm{K} = 6.17\,\mathrm{nK}.
$$
:::
:::

::: exercise Light from the photon sphere {level=1 check="0.732"}
A static source hovers at $r = 1.5\,r_s$. Find the redshift $z$ of its light received far away.
::: solution
With $r_s/r = 2/3$,

$$
1 + z = \Bigl(1 - \frac23\Bigr)^{-1/2} = \sqrt3 = 1.732,
$$

so $z = 0.732$. Exactly, $z = \sqrt3 - 1$.
:::
:::

::: exercise A black hole as hot as the sky {level=2 check="4.50e22"}
Find the mass, in kilograms, of a black hole whose Hawking temperature equals the present CMB temperature, $2.7255\,\mathrm{K}$.
::: solution
Solve [[#eq-hawking]] for $M$:

$$
M = \frac{\hbar c^3}{8\pi Gk_BT} = \frac{2.8414\times 10^{-9}}{8\pi\times 6.6743\times 10^{-11}\times 1.380649\times 10^{-23}\times 2.7255}\,\mathrm{kg}.
$$

The denominator is $6.312\times 10^{-32}$, so $M = 4.50\times 10^{22}\,\mathrm{kg}$, about $60\%$ of the Moon's mass. Its Schwarzschild radius would be $6.7\times 10^{-5}\,\mathrm{m}$, a fifteenth of a millimetre.
:::
:::

::: exercise Surviving the horizon {level=2 check="1.45e4"}
An astronaut can tolerate a radial tidal acceleration of $98\,\mathrm{m/s^2}$ (ten $g$) between her head and feet, $2.0\,\mathrm{m}$ apart. What is the smallest black-hole mass, in solar masses, whose horizon she can cross without exceeding this?
::: solution
From [[#ex-tidal]], the tidal acceleration at the horizon is $\Delta a = Lc^6/(4G^2M^2)$. Setting $\Delta a = 98\,\mathrm{m/s^2}$ and solving,

$$
M = \sqrt{\frac{Lc^6}{4G^2\,\Delta a}} = \frac{c^3}{G}\sqrt{\frac{L}{4\,\Delta a}} = \frac{2.6944\times 10^{25}}{6.6743\times 10^{-11}}\sqrt{\frac{2.0}{392}}\,\mathrm{kg}.
$$

The square root is $0.07143$, so $M = 4.037\times 10^{35}\times 0.07143\,\mathrm{kg} = 2.884\times 10^{34}\,\mathrm{kg}$. Dividing by $1.988\times 10^{30}\,\mathrm{kg}$ gives $1.45\times 10^{4}\,M_\odot$. An intermediate-mass black hole of fifteen thousand solar masses, or any supermassive one, can be entered intact.
:::
:::

::: exercise The last minute inside Sagittarius A* {level=2 check="28.2"}
A probe falls from rest at infinity into Sagittarius A* ($4.30\times 10^{6}\,M_\odot$). Using [[#eq-tau-fall]], find in seconds the proper time from the horizon to $r = 0$.
::: solution
From [[#eq-tau-fall]] with $r_0 = r_s$ and $r = 0$, $\tau = \tfrac23\,r_s/c$. The Schwarzschild radius is $1.270\times 10^{10}\,\mathrm{m}$, so $r_s/c = 42.36\,\mathrm{s}$ and

$$
\tau = \tfrac23\times 42.36\,\mathrm{s} = 28.2\,\mathrm{s}.
$$

The proper time scales with $M$. For $10\,M_\odot$ it was $66\,\mu\mathrm{s}$.
:::
:::

::: exercise The horizon of a spinning hole {level=2 check="1.436"}
A Kerr black hole has dimensionless spin $\chi = 0.9$. Find its horizon radius $r_+$ in units of $GM/c^2$, and compare it with the Schwarzschild value.
::: solution
With $a = \chi GM/c^2$, the horizon is at

$$
r_+ = \frac{GM}{c^2}\Bigl(1 + \sqrt{1 - \chi^2}\Bigr) = \frac{GM}{c^2}\bigl(1 + \sqrt{0.19}\bigr) = 1.436\,\frac{GM}{c^2}.
$$

The Schwarzschild horizon is at $2GM/c^2$, so spin $0.9$ shrinks the horizon radius by $28\%$, and the co-rotating ISCO, read off the figure, moves from $6$ to $2.32\,GM/c^2$.
:::
:::

::: exercise The longest wait {level=3}
Prove that every timelike worldline that enters the horizon of a Schwarzschild black hole reaches $r = 0$ within proper time at most $\pi GM/c^3$ after crossing, and that this bound is attained by the geodesic that falls from rest at $r = r_s$.
::: hint
Inside the horizon use Schwarzschild coordinates again; there $r$ is a timelike coordinate. Show $c^2\dd\tau^2 \le \dd r^2/(r_s/r - 1)$.
:::
::: solution
For $r < r_s$ the Schwarzschild form of the metric is still valid as a description of the interior region, with $f = 1 - r_s/r < 0$. Write $\lvert f\rvert = r_s/r - 1 > 0$. Then

$$
\dd s^2 = \lvert f\rvert\,c^2\dd t^2 - \frac{\dd r^2}{\lvert f\rvert} + r^2\dd\Omega^2.
$$

For a timelike worldline, $c^2\dd\tau^2 = -\dd s^2$, so

$$
c^2\dd\tau^2 = \frac{\dd r^2}{\lvert f\rvert} - \lvert f\rvert c^2\dd t^2 - r^2\dd\Omega^2 \le \frac{\dd r^2}{\lvert f\rvert}.
$$

By [[#thm-trapped]], $r$ decreases monotonically, so we may use $r$ as the parameter along the worldline, and

$$
\tau \le \frac1c\int_0^{r_s}\frac{\dd r}{\sqrt{r_s/r - 1}} = \frac1c\int_0^{r_s}\sqrt{\frac{r}{r_s - r}}\,\dd r.
$$

Substitute $r = r_s\sin^2\alpha$, $\dd r = 2r_s\sin\alpha\cos\alpha\,\dd\alpha$, so the integrand becomes $(\sin\alpha/\cos\alpha)\cdot 2r_s\sin\alpha\cos\alpha = 2r_s\sin^2\alpha$:

$$
\tau \le \frac{2r_s}{c}\int_0^{\pi/2}\sin^2\alpha\,\dd\alpha = \frac{2r_s}{c}\cdot\frac{\pi}{4} = \frac{\pi r_s}{2c} = \frac{\pi GM}{c^3}.
$$

Equality requires $\dd t = 0$ and $\dd\Omega = 0$ all the way. A radial geodesic with $e = 0$ has $\dd t/\dd\tau = e/f = 0$, and its radial equation is $(\dd r/\dd\tau)^2 = c^2(r_s/r - 1)$, which vanishes at $r = r_s$: it is the geodesic that starts from rest at the horizon, the limit of geodesics dropped from just outside. It attains the bound. For $10\,M_\odot$ the bound is $155\,\mu\mathrm{s}$; for Sagittarius A*, about $67\,\mathrm{s}$.
:::
:::

::: exercise The area theorem limits the energy radiated {level=3 check="0.293"}
Two non-rotating black holes, each of mass $M$, merge into a single non-rotating black hole of mass $M_f$. Assume Hawking's area theorem: the horizon area of the final hole is at least the sum of the initial areas. Prove that the fraction of the initial rest energy that can be radiated is at most $1 - 1/\sqrt2$, and evaluate it.
::: solution
A Schwarzschild horizon has area $A = 4\pi r_s^2 = 16\pi G^2M^2/c^4$, proportional to $M^2$. The area theorem says

$$
M_f^2 \ge M^2 + M^2 = 2M^2, \qquad M_f \ge \sqrt2\,M.
$$

The energy radiated is $(2M - M_f)c^2$, so the radiated fraction of the initial rest energy $2Mc^2$ satisfies

$$
\frac{2M - M_f}{2M} \le 1 - \frac{\sqrt2}{2} = 1 - \frac{1}{\sqrt2} = 0.293.
$$

The bound is far from attained in practice. In GW150914 the two black holes, of about $36$ and $29\,M_\odot$, merged into one of about $62\,M_\odot$, radiating about $3\,M_\odot c^2$, roughly $5\%$; the final hole also spins rapidly, with $\chi \approx 0.7$, which stores area without storing as much mass.
:::
:::
