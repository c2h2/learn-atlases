The Lorentz transformation of [[relativity/postulates]] tells you what two inertial frames assign to the same event. Two further questions are immediate. First: if a particle has velocity $\mathbf{u}$ in $S$, what velocity does $S'$ assign to it? The Galilean answer $u' = u - v$ was one of the cleanest theorems of mechanics; it is not the right one here, and the replacement has consequences for anything that flies. Second: if $p = mv$ and $T = \tfrac12 mv^2$ are read off the same transformation that gives $u' = u - v$, then momentum and kinetic energy cannot both be conserved in every inertial frame. The fix is not to abandon conservation — it is to rebuild the definitions so that the *conservation laws* are the things the postulate of relativity demands to be invariant, in exactly the way the Galilean transformation used to guarantee invariance of accelerations and Newton's second law.

This chapter does both. The velocity law comes out of the Lorentz transformation in the same three-line differentiation that produced it in [[relativity/postulates#ex-galilean-check]] preview; the Doppler shift is a corollary applied to light. The energy and momentum take a little more thought, because the requirement is not "make a formula" but "make a conservation law whose form is unchanged by a change of inertial frame." The result — $p = \gamma m v$, $T = mc^2(\gamma - 1)$, $E = \gamma mc^2$, $E^2 = p^2 c^2 + m^2 c^4$ — is the content of the chapter, and the mass–energy relation $E_0 = mc^2$ follows as the rest term of it rather than as a separate miracle.

## Velocity transformation

::: theorem Velocity transformation {#thm-velocity2}
Let $S'$ move at speed $v$ in the $+x$ direction relative to $S$, in standard configuration. A particle with velocity components $(u_x, u_y, u_z)$ in $S$ has in $S'$

$$
u'_x = \frac{u_x - v}{1 - \dfrac{v u_x}{c^2}}, \qquad u'_y = \frac{u_y}{\gamma\left(1 - \dfrac{v u_x}{c^2}\right)}, \qquad u'_z = \frac{u_z}{\gamma\left(1 - \dfrac{v u_x}{c^2}\right)}.
$$ {#eq-velocity}
:::

::: proof
Velocity is $d\mathbf{x}'/dt'$: the derivative of the transformed coordinate, over the transformed time. This is not optional — $t'$ is not $t$, and the ratio $dx'/dt'$ is not $dx'/dt$. Differentiate both Lorentz equations of [[relativity/postulates#eq-lorentz2]] with respect to the *untransformed* time $t$, the parameter along the particle's worldline:

$$
\frac{dx'}{dt} = \gamma\left(\frac{dx}{dt} - v\right) = \gamma(u_x - v), \qquad \frac{dt'}{dt} = \gamma\left(1 - \frac{v}{c^2}\frac{dx}{dt}\right) = \gamma\left(1 - \frac{v u_x}{c^2}\right).
$$

The transverse coordinates are unchanged, $y' = y$, so $dy'/dt = u_y$. Now take ratios:

$$
u'_x = \frac{dx'}{dt'} = \frac{\gamma(u_x - v)}{\gamma(1 - vu_x/c^2)} = \frac{u_x - v}{1 - vu_x/c^2},
$$

For the transverse component, $dy' = dy$ but the denominator is still $dt'$:

$$
u'_y = \frac{dy'}{dt'} = \frac{dy/dt}{dt'/dt} = \frac{u_y}{\gamma(1 - vu_x/c^2)},
$$

and $u'_z$ identically. The transverse velocity is smaller than the naive value $u_y$ *in the moving frame for the same event-pair*, with two effects multiplying: the $\gamma$ in the denominator, and the $(1 - vu_x/c^2)$ factor. Both vanish as $v/c \to 0$, leaving $u' = \mathbf{u} - \mathbf{v}$ recovered exactly, as [[relativity/galilean#thm-velocity]] demands in the low-speed limit. The inverse is the same formula with $v \to -v$ and primed/unprimed swapped.
:::

The collinear case, [[#eq-velocity]] with $u_y = u_z = 0$, is the composition law:

::: corollary Einstein velocity addition {#cor-addition}
$$
u' = \frac{u - v}{1 - uv/c^2}, \qquad u = \frac{u' + v}{1 + u'v/c^2}.
$$ {#eq-addition}
The sum of two speeds each less than $c$ is less than $c$; the sum of $c$ and anything sub-c is $c$.
:::

::: proof
The first equation is already in [[#eq-velocity]]. For the second, solve $u'(1 - uv/c^2) = u - v$ for $u$: expanding gives $u' - u' u v/c^2 = u - v$, so $u' + v = u(1 + u' v/c^2)$, and dividing,

$$
u = \frac{u' + v}{1 + u'v/c^2}.
$$

For the bounds, let $0 \le u < c$ and $0 \le v < c$. Then

$$
u' = \frac{u - v}{1 - uv/c^2}.
$$

If $u \le v$ the numerator is non-positive and $u'$ has the sensible sign. If $u > v$, both numerator and denominator are positive, and

$$
c - u' = c - \frac{u - v}{1 - uv/c^2} = \frac{c(1 - uv/c^2) - (u - v)}{1 - uv/c^2} = \frac{c - \frac{cu v}{c^2} - u + v}{1 - uv/c^2} = \frac{(c - u)(1 + v/c)\,c/c}{1 - uv/c^2}\cdot \frac{1}{c}\cdot c.
$$

More cleanly, multiply the numerator of the difference by $c$:

$$
c(1 - uv/c^2) - (u - v) = c - \frac{uv}{c} - u + v = \left(c - u\right) + \left(v - \frac{uv}{c}\right) = (c - u) + v\left(1 - \frac{u}{c}\right) > 0,
$$

since $u < c$ and $v \ge 0$. Hence $u' < c$. For $u = c$: $u' = (c - v)/(1 - v/c) = c(c - v)/(c - v) = c$. A light ray composed with a sub-light boost is still a light ray, as [[relativity/postulates#ax-light]] requires. The composition is commutative in the sense that the two-step result does not depend on the order of the frames, because a two-frame relative velocity is a single relative velocity; the map $u \mapsto u'$ with fixed $v$ is its own inverse under $v \to -v$, as the proof of the second formula shows.
:::

::: widget boost
v: 0.5
u: 0.5
caption: The blue curve is the Galilean sum $u + v$ and the red is the Einstein composition with one particle held at fixed $u$ as $v$ varies. Note both stay below $1$ in $c$-units when each does individually, and that they agree to within $1\%$ below $0.5c$ — the relativistic correction is not a small effect only at $0.99c$; it is present at every $v > 0$, just swamped by the sum it corrects.
:::

::: quiz If a spaceship moves at $0.9c$ relative to Earth and fires a probe at $0.9c$ relative to itself, in the same direction, how fast is the probe relative to Earth?
- [ ] $1.8c$, so the probe outruns light and relativity is violated
- [x] $\dfrac{0.9c + 0.9c}{1 + 0.9^2} \approx 0.994c$, below $c$
- [ ] $0.9c$, because velocity relative to different frames is absolute
- [ ] It depends on the probe's acceleration history
::: solution
Use [[#eq-addition]] with $u' = 0.9c$ (probe relative to ship) and $v = 0.9c$ (ship relative to Earth): $u = (1.8c)/(1 + 0.81) = 1.8/1.81 \, c \approx 0.9945c$. Below $c$, above $0.9c$, and insensitive to the order of composition because a two-frame relative velocity is a single relative velocity ([[#cor-addition]]). The first option is the Galilean sum; the third denies that velocity is frame-dependent; the fourth is wrong because the composition depends only on the relative velocities, not on how they were achieved.
:::
:::

::: warning The transverse component: do not drop the $\gamma$
The $x$ component of [[#eq-velocity]] looks like the one-dimensional formula from [[relativity/postulates]], and students often carry that formula over to the $y$ and $z$ components as well: $u'_y = u_y - 0$ (since "there's no boost in $y$"). That is the mistake. The $y$ velocity in $S'$ is $dy'/dt'$, and $dt'$ is *not* $dt$ for an event-pair separated in $x$. The correct factor is $\gamma(1 - vu_x/c^2)$, not $1$. For a particle that moves purely in $y$ in $S$ ($u_x = 0$), this reduces to $u'_y = u_y/\gamma$, a genuine *change* in the transverse speed, not just a relabelling. The $\gamma$ in the denominator is the same reason a moving length contracts in the direction of motion: it comes from $dt' \ne dt$, and it is in every component of the velocity transformation, not just the boosted one.
:::

## The relativistic Doppler shift

Light from a moving source: what frequency does the observer receive? The answer is not "the Galilean Doppler formula with $u_{\text{sound}}$ replaced by $c$," because that formula uses the *medium's* frame to define the source's and observer's speeds, and there is no preferred frame in vacuum. The honest derivation uses the Lorentz transformation on the wavefronts themselves.

::: theorem Relativistic Doppler shift (collinear) {#thm-doppler}
A source emitting at frequency $f_0$ in its own rest frame moves at speed $v$ relative to the observer, receding. The received frequency is

$$
f = f_0\,\sqrt{\frac{1 - v/c}{1 + v/c}}.
$$ {#eq-doppler}
For approach, $v \to -v$: $f = f_0\sqrt{(1 + v/c)/(1 - v/c)} > f_0$.
:::

::: proof
Work in the observer's frame $S$ throughout: the source moves in $+x$ at speed $v$, the observer is fixed at $x = L > 0$, ahead of the source, which starts at the origin at $t = 0$. The source emits crests of its own wave in *its own* frame $S'$ at period $T_0 = 1/f_0$; the two emission events are therefore $T_0$ apart in $S'$-time, and the Lorentz transformation tells us the corresponding $S$-coordinates.

The two emission events are $E_1 = (x', t') = (0, 0)$ and $E_2 = (0, T_0)$ in $S'$. Transform to the observer's frame $S$ (where $S'$ recedes at $v$):

$$
t_1 = 0, \qquad x_1 = 0; \qquad t_2 = \gamma T_0, \qquad x_2 = 0.
$$

(The source sits at the origin of its own frame $S'$, so $x' = 0$ for both events, and the inverse Lorentz law $x = \gamma(x' + vt')$ gives $x_2 = \gamma v T_0$, $t_2 = \gamma T_0$: the source has moved $v\gamma T_0$ in time $\gamma T_0$ in $S$, at speed $v$, as expected.)

The first crest is emitted at $E_1$ and travels at $c$: its worldline in $S$ is $x = c t$. It is received at the observer. The observer is fixed in $S$ — say at $x = 0$ — but the crest was emitted at $x = 0$ at $t = 0$ and travels *outward*; the observer must be somewhere else. Set the observer at $x = -L$ in $S$ (behind the receding source, source moving in $+x$). Crest 1 reaches $x = -L$… it travels in $+x$, away from $x = -L$. Set the observer ahead, at $x = +L$: crest 1 (moving $+x$ from $x = 0$) reaches $x = L$ at $t_{1,\text{recv}} = L/c$.

Crest 2 is emitted from $x_2 = v\gamma T_0$ at $t_2 = \gamma T_0$, also moving $+x$ at $c$: $x = v\gamma T_0 + c(t - \gamma T_0)$. Reaches $x = L$ at $t_{2,\text{recv}}$: $L = v\gamma T_0 + c(t_{2,\text{recv}} - \gamma T_0)$, so $t_{2,\text{recv}} = \gamma T_0 + (L - v\gamma T_0)/c = L/c + \gamma T_0(1 - v/c)$.

The received period in $S$ is the difference:

$$
T_{\text{recv}} = t_{2,\text{recv}} - t_{1,\text{recv}} = \gamma T_0(1 - v/c) = T_0\,\frac{1 - v/c}{\sqrt{1 - v^2/c^2}} = T_0\,\sqrt{\frac{1 - v/c}{1 + v/c}},
$$

where the last step uses $1 - v^2/c^2 = (1 - v/c)(1 + v/c)$. The received frequency is the reciprocal: $f = f_0 \sqrt{(1 + v/c)/(1 - v/c)}$.

Note the geometry: the source recedes *away from* the observer, and a crest emitted later is emitted from a point farther from the observer, so the later crest covers more ground to be received at the observer's position *behind* the source. In the configuration above the observer is ahead, and the same algebra with the source moving toward decreasing $x$ (or the observer behind) inverts the sign in the $(1 - v/c)$ factor, giving the stated receding-source formula [[#eq-doppler]], $f = f_0\sqrt{(1 - v/c)/(1 + v/c)} < f_0$, and the approaching-source formula with $v$ replaced by $-v$. The two effects are not separate: the $\gamma$ factor is time dilation of the source's clock in $S$, and the $(1 \pm v/c)$ factor is the changing geometry — the second crest is emitted from a point a distance $v\gamma T_0$ closer to, or farther from, the observer. Their product is the full relativistic Doppler factor; neither is optional.
:::

::: example Redshift of a receding quasar {#ex-quasar}
A quasar recedes at $v = 0.5c$. A spectral line at $f_0 = 1.0 \times 10^{15}\,\mathrm{Hz}$ in the quasar's rest frame is observed. Find the observed frequency and the redshift $z = (f_0 - f)/f$.
::: solution
$\beta = v/c = 0.5$. The receding-source formula [[#eq-doppler]] gives

$$
f = f_0 \sqrt{\frac{1 - 0.5}{1 + 0.5}} = f_0 \sqrt{\frac{0.5}{1.5}} = f_0 \sqrt{1/3} \approx 0.577\,f_0 = 5.77\times 10^{14}\,\mathrm{Hz}.
$$

The redshift is $z = (f_0 - f)/f = f_0/f - 1 = \sqrt{3} - 1 \approx 0.732$. A redshift of $0.73$ is large by astronomical standards: at $z \approx 0.73$ the universe's expansion, not a local peculiar velocity, is the usual driver, but the formula for the *special-relativistic* Doppler shift is the right one for a source with a genuine peculiar velocity of $0.5c$, such as the jets in active galactic nuclei.
:::
:::

## Rebuilding momentum and energy

The postulate of relativity demands that the *form* of the physical laws is the same in every inertial frame. Conservation of momentum, as a law of the form "the total before equals the total after," is one of those laws. If $p = mv$ is used and $v$ transforms by [[#eq-velocity]] rather than by the Galilean subtraction, then a collision that conserves $p = mv$ in one frame will not, in general, conserve it in another. The requirement is not *that* momentum be conserved — it is *how* momentum is defined so that the conservation law is covariant.

::: theorem Relativistic momentum {#def-momentum}
The momentum of a particle of invariant mass $m$ (the mass measured in the particle's own rest frame) moving at speed $v$ is

$$
p = \gamma m v = \frac{m v}{\sqrt{1 - v^2/c^2}}.
$$ {#eq-p-rel}
:::

::: proof
The argument is a symmetry argument about an elastic head-on collision, not a derivation from a force law. Two identical particles of mass $m$ approach each other at speed $u$ in the frame $S$ in which the collision is symmetric (equal and opposite initial velocities), collide elastically, and leave symmetrically. In $S$ the total initial momentum is zero; conservation (a law stated in $S$) gives total final momentum zero.

Now view the same collision from $S'$, moving at speed $v$ relative to $S$. In $S'$ the two particles no longer have equal and opposite speeds: the velocity transformation [[#thm-velocity2]] applied to $+u$ and $-u$ gives $u'_1 = (u - v)/(1 - uv/c^2)$ and $u'_2 = (-u - v)/(1 + uv/c^2)$, which are not negatives of each other. If momentum were $mv$, the total in $S'$ before and after would not cancel by the same symmetry that made it cancel in $S$, and conservation in $S$ would not imply conservation in $S'$. The factor that makes the total cancel in *every* frame is the same $\gamma(v)$ that appears in the transformation of the time component: define $p = \gamma(v) m v$. Then in $S'$, using the velocity transformation and the identity $\gamma(u') = \gamma(u)\gamma(v)(1 - uv/c^2)$ (which follows directly from the definitions, since $\gamma(u)^{-2} = 1 - u^2/c^2$ and the transformation of the $t$ component gives the same factor), the momenta of the two particles transform in exactly the way that makes their sum in $S'$ equal to the Lorentz-transformed sum in $S$, which is zero. The conservation law is therefore covariant.

Concretely, the two-particle system's total four-momentum (a quantity that will be made precise in [[relativity/four-vectors]]) is a four-vector, and its conservation is a four-dimensional statement that reduces to the three-momentum conservation of any single frame. The three-momentum component of that four-vector is $p = \gamma m v$. The argument from collision symmetry is the *physical* reason $\gamma(v)$ must multiply $mv$, not an arbitrary choice: no other function of $v$ makes the two-frame conservation agree, up to an overall scale fixed by requiring $p \to mv$ as $v \to 0$.
:::

The kinetic energy follows from work. A force $F$ acting on the particle does work $dW = F\,dx$; the work–energy theorem, which is a frame-independent statement about the energy transferred, gives $T = \int F\,dx = \int v\,dp$.

::: theorem Relativistic kinetic and total energy {#thm-energy}
The kinetic energy of a relativistic particle of invariant mass $m$ and speed $v$ is

$$
T = mc^2(\gamma - 1), \qquad \gamma = \frac{1}{\sqrt{1 - v^2/c^2}}.
$$ {#eq-T}
The **total energy** is $E = T + mc^2 = \gamma mc^2$, of which $E_0 = mc^2$ is the **rest energy**. The invariant relation between energy and momentum is

$$
E^2 = p^2 c^2 + m^2 c^4.
$$ {#eq-Emass}
:::

::: proof
Start from $T = \int_0^v v'\, dp$, with $p = \gamma(v') m v'$, so

$$
dp = dm\,v' \frac{d\gamma}{dv'} + \gamma m\, dv' = m\,v'\,\frac{d\gamma}{dv'} + \gamma m\, dv',
$$

where $\dfrac{d\gamma}{dv'} = \dfrac{v'}{c^2}(1 - v'^2/c^2)^{-3/2} = \dfrac{v'}{c^2}\gamma^3$. Then

$$
T = \int_0^v \left[ m v'^2 \frac{v'}{c^2}\gamma^3 + \gamma m v' \right] dv' = m\int_0^v \left[\gamma v' + \frac{v'^3}{c^2}\gamma^3\right]dv'.
$$

Combine under a common factor: $\gamma v' + (v'^2/c^2)\gamma^3 v' = \gamma v'(1 + v'^2/c^2\,\gamma^2)$. Use $\gamma^2 = 1/(1 - v'^2/c^2)$ so $1 + v'^2/c^2\,\gamma^2 = 1 + v'^2/c^2 \cdot 1/(1 - v'^2/c^2) = (1 - v'^2/c^2 + v'^2/c^2)/(1 - v'^2/c^2) = \gamma^2$. Hence the integrand is $\gamma v'\cdot \gamma^2 = \gamma^3 v'$, and

$$
T = m\int_0^v \gamma^3 v'\, dv' = m\int_0^v \frac{v'\,dv'}{(1 - v'^2/c^2)^{3/2}}.
$$

Substitute $w = 1 - v'^2/c^2$, $dw = -2v'\,dv'/c^2$, $v'\,dv' = -c^2\,dw/2$; at $v' = 0$, $w = 1$; at $v' = v$, $w = 1 - v^2/c^2 = 1/\gamma^2$:

$$
T = \frac{mc^2}{2}\int_{1/\gamma^2}^{1} w^{-3/2}\, dw = \frac{mc^2}{2}\left[-2 w^{-1/2}\right]_{1/\gamma^2}^{1} = mc^2\left(\gamma - 1\right).
$$

The total energy is $E = T + mc^2 = \gamma mc^2$. For the invariant relation, compute $E^2 - p^2 c^2$ directly:

$$
E^2 - p^2 c^2 = \gamma^2 m^2 c^4 - \gamma^2 m^2 v^2 c^2 = \gamma^2 m^2 c^2 (c^2 - v^2).
$$

Now $\gamma^2 = 1/(1 - v^2/c^2) = c^2/(c^2 - v^2)$, so the prefactor simplifies exactly:

$$
\gamma^2 c^2 (c^2 - v^2) = \frac{c^2}{c^2 - v^2} \cdot c^2 (c^2 - v^2) = c^4,
$$

and therefore $E^2 - p^2 c^2 = m^2 c^4$, i.e. [[#eq-Emass]]. The mass $m$ in this formula is the *invariant* mass: it is the same in every frame, and the quantity under the square root is a Lorentz invariant (a component of the four-momentum squared, in the language of [[relativity/four-vectors]]).
:::

::: example Electron at $0.98c$: relativistic vs non-relativistic {#ex-electron}
An electron ($mc^2 = 0.511\,\mathrm{MeV}$) is accelerated to $v = 0.98c$. Find its total energy, kinetic energy, and momentum. Compare the kinetic energy to the non-relativistic $\tfrac12 mv^2$.
::: solution
$\beta = 0.98$, $\gamma = 1/\sqrt{1 - 0.98^2} = 1/\sqrt{1 - 0.9604} = 1/\sqrt{0.0396} = 1/0.1990 \approx 5.025$.

$$
E = \gamma m c^2 = 5.025 \times 0.511\,\mathrm{MeV} \approx 2.568\,\mathrm{MeV},
$$

$$
T = E - mc^2 = 2.568 - 0.511 = 2.057\,\mathrm{MeV},
$$

$$
pc = \gamma (mc^2)\beta = 5.025 \times 0.511\times 0.98\,\mathrm{MeV} \approx 2.52\,\mathrm{MeV}, \qquad p \approx 2.52\,\mathrm{MeV}/c.
$$

The non-relativistic estimate is $\tfrac12 m v^2 = \tfrac12 (mc^2)(v^2/c^2) = \tfrac12 \times 0.511 \times 0.9604\,\mathrm{MeV} \approx 0.245\,\mathrm{MeV}$, which is about $12\%$ of the true $T = 2.057\,\mathrm{MeV}$. The error is not a small correction; using $p = mv$ here would understate the momentum by the factor $\gamma \approx 5$, which is the entire difference between "the electron turns in this radius" and "the electron turns in a radius five times larger" in a magnetic field.
:::
:::

::: example Electron–positron annihilation {#ex-annihilation}
An electron and a positron, each of rest energy $0.511\,\mathrm{MeV}$, meet head-on with equal and opposite momenta of magnitude $p = 1.00\,\mathrm{MeV}/c$ and annihilate into two photons. Find the photon energies and the angle between them.
::: solution
Total invariant four-momentum of the pair: $E_{\text{tot}} = 2 \times \sqrt{(0.511)^2 + 1.00^2}\,\mathrm{MeV} = 2 \times \sqrt{0.261 + 1.00}\,\mathrm{MeV} = 2\times\sqrt{1.261}\,\mathrm{MeV} \approx 2\times 1.123\,\mathrm{MeV} = 2.246\,\mathrm{MeV}$. Total momentum is zero (equal and opposite). The two photons have zero total momentum only if their momenta are equal and opposite, i.e. they are back-to-back, angle $\pi$. Each carries half the total energy: $E_\gamma = E_{\text{tot}}/2 \approx 1.123\,\mathrm{MeV}$. (For photons, $E = pc$, so $p_\gamma = E_\gamma/c \approx 1.123\,\mathrm{MeV}/c$, and $|\mathbf{p}_1 + \mathbf{p}_2| = 0$ requires back-to-back emission.) The rest energies $2 \times 0.511 = 1.022\,\mathrm{MeV}$ account for the photon energies only in the limit of zero initial kinetic energy; here the extra $2.246 - 1.022 = 1.224\,\mathrm{MeV}$ is the kinetic energy of the two massive particles, all of it ending in the photons. This is the conservation law in action: for the back-to-back two-photon state, $E_{\text{tot}}^2 - p_{\text{tot}}^2 c^2 = E_{\text{tot}}^2$ (since $p_{\text{tot}} = 0$), so its invariant mass is $E_{\text{tot}}/c^2 \approx 2.246\,\mathrm{MeV}/c^2$, equal to the invariant mass of the initial pair, as [[#eq-Emass]] requires on both sides of the collision.
:::
:::

::: example Proton at $1.00\,\mathrm{GeV}/c$ {#ex-proton}
A proton ($mc^2 \approx 938\,\mathrm{MeV}$) has momentum $p = 1.00\,\mathrm{GeV}/c = 1000\,\mathrm{MeV}/c$. Find its speed, total energy, and kinetic energy.
::: solution
Use [[#eq-Emass]]: $E = \sqrt{p^2 c^2 + m^2 c^4} = \sqrt{1000^2 + 938^2}\,\mathrm{MeV} = \sqrt{1{,}000{,}000 + 879{,}844}\,\mathrm{MeV} = \sqrt{1{,}879{,}844}\,\mathrm{MeV} \approx 1371\,\mathrm{MeV}$. So $E \approx 1.371\,\mathrm{GeV}$ and $T = E - mc^2 \approx 1371 - 938 = 433\,\mathrm{MeV}$.

For the speed: $\beta = pc/E = 1000/1371 \approx 0.729$, so $v \approx 0.73c$. Check $\gamma = E/(mc^2) = 1371/938 \approx 1.462$; then $\beta = \sqrt{1 - 1/\gamma^2} = \sqrt{1 - 1/2.137} = \sqrt{1 - 0.468} = \sqrt{0.532} \approx 0.729$. Consistent. The non-relativistic estimate of the speed from $p = mv$ would give $v = p/m = (1000\,\mathrm{MeV}/c)/(938\,\mathrm{MeV}/c^2) \cdot c = 1.066c$, above light — the error is not subtle, and it is the same $\gamma$ factor of [[#def-momentum]] showing up in the wrong direction: ignoring $\gamma$ in $p$ overestimates $v$ for a given $p$.
:::
:::

::: example Low-speed limit: where the old formulas come back {#ex-lowlimit}
Expand $T = mc^2(\gamma - 1)$ for $v \ll c$ and show that $E = mc^2 + \tfrac12 mv^2 + \tfrac{3}{8}mv^4/c^2 + \cdots$, identifying the Newtonian term.
::: solution
Expand $\gamma = (1 - \beta^2)^{-1/2}$ in powers of $\beta^2$:

$$
\gamma = 1 + \frac{\beta^2}{2} + \frac{3\beta^4}{8} + O(\beta^6).
$$

Then

$$
T = mc^2(\gamma - 1) = mc^2\left[\frac{\beta^2}{2} + \frac{3\beta^4}{8} + \cdots\right] = \frac{1}{2}mv^2 + \frac{3}{8}\frac{mv^4}{c^2} + \cdots,
$$

and

$$
E = mc^2 + \frac{1}{2}mv^2 + \frac{3}{8}\frac{mv^4}{c^2} + \cdots.
$$

The rest energy $mc^2$ is a constant offset present in every frame; the kinetic energy is the $v$-dependent part, whose leading term is the Newtonian $\tfrac12 mv^2$. The Newtonian formula is not *wrong*; it is the first term in a series whose next term is $O(v^4/c^2)$ relative to the first, a fraction $v^2/(4c^2)$ of it… specifically the ratio of the second term to the first is $(3/8)(v^2/c^2)$, which for $v = 0.1c$ is $(3/8)(0.01) = 0.00375$, or $0.4\%$: the non-relativistic formula is good to within about half a percent at one-tenth of light speed, and the error grows as $v^4/c^2$, not as $v/c$.
:::
:::

::: warning $mc^2$ is the rest energy, not the total energy
The formula $E = mc^2$ is the *rest* term, $E_0 = mc^2$, of the total energy $E = \gamma mc^2$. Writing "the energy is $mc^2$" for a moving particle drops the $\gamma$ and understates the energy by a factor that is $1$ at rest and $\gamma$ at speed $v$. Conversely, "the kinetic energy is $\gamma mc^2$" overstates it by the rest term $mc^2$, which is always present but does not contribute to the work–energy accounting unless the mass itself changes (a particle that is created, annihilated, or changes internal state). Both errors are the same: forgetting which piece of $E = \gamma mc^2$ is the "energy" and which is the "rest energy." The bookkeeping that keeps them separate is what makes $E^2 = p^2c^2 + m^2c^4$ work: the invariant $m$ is the invariant, and $E$ and $p$ are the frame-dependent pieces.
:::

::: quiz A particle has $\gamma = 2$. What is its speed, as a fraction of $c$?
- [ ] $0.5c$
- [x] $\sqrt{3}/2\,c \approx 0.866c$
- [ ] $0.707c$
- [ ] $2c$, since $\gamma = 1/v$
::: solution
$\gamma = 1/\sqrt{1 - v^2/c^2} = 2$ gives $1 - v^2/c^2 = 1/4$, so $v^2/c^2 = 3/4$ and $v = \sqrt{3}/2\, c \approx 0.866c$. The first option inverts the relation; the third is $\gamma = \sqrt{2}$; the fourth confuses $\gamma$ with a reciprocal.
:::
:::

::: quiz What is the speed of a photon, and what is its rest mass, in the language of this chapter?
- [ ] $v = c$ and $m > 0$, with $E = \gamma mc^2$ for $\gamma \to \infty$
- [x] $v = c$ and $m = 0$, with $E = pc$ and no rest energy term
- [ ] $v = c$ and $m = 0$, but $E = mc^2 = 0$ for any non-zero $p$
- [ ] $v < c$ always, since a photon has a well-defined rest frame
::: solution
For a photon $m = 0$, so the rest energy $mc^2 = 0$ and the total energy is $E = pc$ from [[#eq-Emass]] with $m = 0$. It moves at $c$ in every inertial frame, as [[relativity/postulates#ax-light]] requires, and has no rest frame (a rest frame would be one in which $v = 0$, which is not $c$). Option 1's "$\gamma \to \infty$" for $m > 0$ would require $v \to c$ with $m$ fixed, which is a massive particle approaching light speed, not a photon; a photon has $m = 0$ exactly, not $m$ small.
:::
:::

## Worked applications and common pitfalls

The two formulas that do most of the work in applications are [[#eq-Emass]] and [[#eq-addition]]. The invariant relation lets you compute an unknown energy or momentum from the other two of $\{E, p, m\}$ without ever writing down $v$; the addition law lets you compose relative velocities without the $\gamma$ factor being dropped in the transverse components.

::: warning The $\gamma$ in the transverse velocity, revisited
A recurring error, now in the energy context: for a particle with $p_y \ne 0$ and $p_x = 0$ in $S$, a frame $S'$ moving in $x$ sees $p'_y = p_y / \gamma$, not $p_y$. The transverse *velocity* $u'_y = u_y/\gamma$ (from [[#thm-velocity2]], $u_x = 0$) and the transverse *momentum* $p'_y = \gamma(u') m u'_y$ are both scaled, but by different factors because $\gamma(u') \ne \gamma(u)$. The invariant $E^2 - p^2 c^2 = m^2 c^4$ is the check: it must hold in both frames, and it does only if $E$, $p_x$, $p_y$ all transform together as a four-vector, not $p_y$ alone. The four-vector structure is the subject of [[relativity/four-vectors]]; the warning here is that treating the three-momentum as three independent scalars, each transforming by its own rule, is the mistake that breaks the invariant.
:::

::: application Where the rest energy shows up
Nuclear binding energy, the $Q$-value of a reaction, the energy released by matter–antimatter annihilation, the source of the Sun's luminosity: in each case the relevant quantity is the *difference* of rest energies between initial and final states, $\Delta E_0 = (m_{\text{initial}} - m_{\text{final}})c^2$. The rest energy of each individual particle is a constant offset that cancels in a closed system; what is physically accessible is the *change* in the system's invariant mass. The Sun's rest mass decreases by about $4$ million tonnes per second, the mass equivalent of the $3.8\times 10^{26}\,\mathrm{W}$ it radiates. The formula is not "mass turns into energy"; it is "the invariant mass of the system is smaller after the reaction than before, and the difference, times $c^2$, is the energy carried away by the products."
:::

::: history From $E = mc^2$ to the annihilation
Einstein's 1905 paper "Does the Inertia of a Body Depend Upon Its Energy Content?" derived $L = A(\gamma - 1)$ (his $L$ being the kinetic energy, $A$ a constant depending only on the body and the unit system) and argued that if a body emits energy $L$ as radiation its mass decreases by $L/c^2$, independent of the nature of the emission. The proportionality $E_0 = mc^2$ for the rest energy followed, and the identification of $mc^2$ as the rest energy, as distinct from the total $\gamma mc^2$, crystallised in the work of Planck, Hasenöhrl and others over the following decade. The first direct experimental confirmation of matter–antimatter annihilation into photons came with the discovery of the positron by Anderson in 1932, and the back-to-back annihilation photons of [[#ex-annihilation]] have been a standard tool in medical imaging (PET scans) since the 1970s: the two $511\,\mathrm{keV}$ photons, emitted back-to-back from a near-rest positron–electron annihilation, are detected in coincidence by a ring of detectors, and the line of response pins the annihilation point.
:::

## Where this leads

The four-vector structure behind [[#eq-Emass]] — the invariant mass shell, the conservation law as a four-dimensional statement, and the clean handling of collisions without writing down a specific frame — is [[relativity/four-vectors]]. The Minkowski diagram and light-cone structure, which is the geometric version of the invariant $c^2 t^2 - x^2$ that underlies everything in this chapter, is [[relativity/spacetime]]. The velocity transformation of [[#thm-velocity2]] and the Doppler formula of [[#thm-doppler]] are the tools used in any problem that involves two or more frames and a light signal.

::: summary
- The velocity transformation [[#eq-velocity]] is the Lorentz transformation applied to velocities; the collinear case is the Einstein addition law [[#eq-addition]], whose sum of two sub-$c$ speeds is sub-$c$ and whose composition with $c$ gives $c$.
- The relativistic Doppler shift [[#eq-doppler]] is not the Galilean Doppler formula with $c$ substituted; it is the Lorentz transformation applied to the emission and observation events of successive wavefronts, and it contains both time dilation and the changing geometry in a single factor.
- Relativistic momentum $p = \gamma m v$ is forced by the requirement that momentum conservation be covariant across frames; no other function of $v$ makes the symmetry argument of two identical colliding particles close in every frame.
- The kinetic energy $T = mc^2(\gamma - 1)$ is the work integral $\int v\,dp$ with $p = \gamma mv$; the total energy is $E = \gamma mc^2 = T + mc^2$.
- The invariant $E^2 = p^2 c^2 + m^2 c^4$ is the frame-independent content of energy–momentum; $mc^2$ is the rest energy, a constant offset that does not contribute to work–energy accounting unless the system's invariant mass changes.
- In the $v/c \to 0$ limit, all three formulas — $p$, $T$, and the additive structure of $E$ — reduce exactly to their Newtonian forms, with the correction terms of order $v^4/c^2$ (not $v^2/c^2$) relative to the leading term.
:::

## Exercises

::: exercise level=1
A muon has $\gamma = 10$. Find its speed as a fraction of $c$, and its total energy if its rest energy is $105.7\,\mathrm{MeV}$.
check="0.995"
::: solution
$\gamma = 10$ gives $1 - v^2/c^2 = 1/100 = 0.01$, so $v^2/c^2 = 0.99$ and $v = \sqrt{0.99}\,c \approx 0.995c$. The total energy is $E = \gamma mc^2 = 10 \times 105.7\,\mathrm{MeV} = 1057\,\mathrm{MeV}$. The kinetic energy is $T = E - mc^2 = 1057 - 105.7 = 951\,\mathrm{MeV}$. The check value is $v/c \approx 0.995$.
:::
:::

::: exercise level=1
Two rockets, $A$ and $B$, move in the same direction in Earth's frame at $0.6c$ and $0.8c$ respectively. Find the speed of $A$ as measured by $B$.
::: solution
Use [[#eq-addition]] with $u' = 0.6c$ (A relative to Earth, as the "inner" velocity) and $v = 0.8c$ (B relative to Earth): $u = (u' + v)/(1 + u'v/c^2)$ is the speed of $A$ relative to $B$… carefully: the formula gives the speed of the object (A) in the frame where it was measured "inner," in terms of the frame's motion. Set $u' = 0.6c$ as A's speed in Earth's frame and $v = 0.8c$ as B's speed relative to Earth; the speed of A relative to B is $(u' - v)/(1 - u'v/c^2)$… the sign depends on which frame is moving. B moves at $0.8c$ relative to Earth; A moves at $0.6c$ relative to Earth, same direction. In B's frame, Earth moves at $-0.8c$, and A's speed in B's frame is

$$
u_{A|B} = \frac{u_A - u_B}{1 - u_A u_B/c^2} = \frac{0.6c - 0.8c}{1 - 0.6 \times 0.8} = \frac{-0.2c}{1 - 0.48} = \frac{-0.2c}{0.52} \approx -0.385c.
$$

The minus sign means A moves in the $-x$ direction as seen by B (B is ahead and faster, so A is behind and receding in the $-x$ direction in B's frame). The magnitude is $\approx 0.385c$.
:::
:::

::: exercise level=2 {#exr-doppler-app}
A galaxy recedes at $v = 0.12c$. A hydrogen line at $f_0 = 4.57\times 10^{14}\,\mathrm{Hz}$ in the galaxy's rest frame is observed. Find the observed frequency and the redshift $z$.
::: solution
$\beta = 0.12$. The receding-source formula [[#eq-doppler]]:

$$
f = f_0 \sqrt{\frac{1 - 0.12}{1 + 0.12}} = f_0 \sqrt{\frac{0.88}{1.12}} = f_0 \sqrt{0.7857} \approx f_0 \times 0.8864 \approx 4.05\times 10^{14}\,\mathrm{Hz}.
$$

The redshift $z = (f_0 - f)/f = f_0/f - 1 = 1/\sqrt{0.7857} - 1 \approx 1.128 - 1 = 0.128$. (The non-relativistic Doppler estimate at $0.12c$ would be $z \approx 0.12$, close but not equal; the relativistic correction is at the percent level at this speed and grows quickly at higher $v$.)
:::
:::

::: exercise level=2
An electron is accelerated through a potential difference of $100\,\mathrm{kV}$, gaining kinetic energy $T = 100\,\mathrm{keV}$. Find its speed, its momentum, and its total energy. Compare the speed to the non-relativistic estimate.
::: solution
The electron's rest energy is $mc^2 = 0.511\,\mathrm{MeV} = 511\,\mathrm{keV}$. The total energy is $E = T + mc^2 = 100 + 511 = 611\,\mathrm{keV}$. So $\gamma = E/(mc^2) = 611/511 \approx 1.196$. Then $\beta = \sqrt{1 - 1/\gamma^2} = \sqrt{1 - 1/1.430} = \sqrt{1 - 0.699} = \sqrt{0.301} \approx 0.549$, so $v \approx 0.55c$.

The momentum: $pc = \gamma (mc^2)\beta = 1.196 \times 511 \times 0.549\,\mathrm{keV} \approx 336\,\mathrm{keV}$, so $p \approx 0.336\,\mathrm{MeV}/c$.

The non-relativistic estimate of the speed from $T = \tfrac12 mv^2$ is $v = \sqrt{2T/m} = \sqrt{2 \times 100/511}\,c = \sqrt{0.391}\,c \approx 0.625c$, which overstates the true speed by about $14\%$. The error is not catastrophic at $100\,\mathrm{keV}$, but it is well above the precision of any measurement that uses the speed to infer a time-of-flight, and it compounds quadratically in any calculation that uses $v$ to infer a distance or a radius of curvature.
:::
:::

::: exercise level=3 {#exr-four-mom}
Derive the invariant relation $E^2 = p^2c^2 + m^2c^4$ directly from $E = \gamma mc^2$ and $p = \gamma mv$, without using the intermediate relation $\gamma^2 = 1/(1 - v^2/c^2) \cdot c^2/(c^2-v^2)$.
hint="Compute E^2 - p^2 c^2, factor out gamma^2 m^2, and use the definition of gamma, not an identity for gamma^2."
::: solution
Start from the definitions:

$$
E^2 - p^2 c^2 = \gamma^2 m^2 c^4 - \gamma^2 m^2 v^2 c^2 = \gamma^2 m^2 c^2 (c^2 - v^2).
$$

Now substitute the definition $\gamma = 1/\sqrt{1 - v^2/c^2}$ directly:

$$
\gamma^2 c^2 (c^2 - v^2) = \frac{c^2 (c^2 - v^2)}{1 - v^2/c^2} = \frac{c^2 (c^2 - v^2)}{(c^2 - v^2)/c^2} = \frac{c^2 (c^2 - v^2) \cdot c^2}{c^2 - v^2} = c^4.
$$

The cancellation is exact: the $(c^2 - v^2)$ in the numerator and the $(c^2 - v^2)/c^2$ in the denominator (which is $1 - v^2/c^2$) are the same quantity, and the ratio is $c^2$, leaving $c^2 \cdot c^2 = c^4$. Hence $E^2 - p^2 c^2 = m^2 c^4$, the stated relation, with no appeal to any identity for $\gamma^2$ beyond its definition.
:::
:::

::: exercise level=3
Two particles of equal rest mass $m$ approach each other head-on, each with kinetic energy $T$. They collide inelastically and stick, forming a single composite particle. Find the rest mass $M$ of the composite in terms of $m$ and $T$, and show that $M > 2m$ for $T > 0$.
hint="Total momentum is zero, so the composite is at rest in the lab frame. Its rest energy is the total initial energy, which is 2(mc^2 + T)."
::: solution
Total initial momentum is zero (equal and opposite). Total initial energy is

$$
E_{\text{tot}} = 2(T + mc^2).
$$

The composite, at rest in the lab frame (its momentum is zero, being the sum of two equal and opposite momenta), has rest energy equal to the total energy, so

$$
Mc^2 = E_{\text{tot}} = 2(T + mc^2), \qquad M = 2m + \frac{2T}{c^2}.
$$

So $M - 2m = 2T/c^2 > 0$ for $T > 0$: the composite is heavier than the sum of its parts, and the "extra" rest mass $2T/c^2$ is the kinetic energy of the two incoming particles, now locked in the composite as internal energy (heat, deformation, excitation, whatever the inelastic mechanism provides). This is the invariant-mass content of $E^2 - p^2c^2 = m^2c^4$: the system's invariant mass is not the sum of the rest masses of its parts; it is the total energy in the centre-of-momentum frame divided by $c^2$, which includes the internal kinetic energy.
:::
:::

::: exercise level=3
A particle of rest mass $m$ is at rest and decays into two particles of rest masses $m_1$ and $m_2$ ($m > m_1 + m_2$). Find the energies $E_1$ and $E_2$ of the decay products in the rest frame of the parent, and hence their momenta.
hint="Two-body decay at rest: the two products must be back-to-back. Use momentum conservation to relate E_1 and E_2, then energy conservation to fix them."
::: solution
In the parent's rest frame, total momentum is zero, so the two products have equal and opposite momenta: $|\mathbf{p}_1| = |\mathbf{p}_2| = p$. Total energy is $mc^2 = E_1 + E_2$. Use [[#eq-Emass]] for each: $E_1^2 = p^2 c^2 + m_1^2 c^4$ and $E_2^2 = p^2 c^2 + m_2^2 c^4$.

Subtract the two: $E_1^2 - E_2^2 = (m_1^2 - m_2^2)c^4$, so $(E_1 - E_2)(E_1 + E_2) = (m_1^2 - m_2^2)c^4$, and since $E_1 + E_2 = mc^2$,

$$
E_1 - E_2 = \frac{(m_1^2 - m_2^2)c^4}{mc^2} = \frac{m_1^2 - m_2^2}{m}c^2.
$$

Together with $E_1 + E_2 = mc^2$, solve for $E_1$:

$$
2E_1 = mc^2 + \frac{m_1^2 - m_2^2}{m}c^2 = \frac{m^2 + m_1^2 - m_2^2}{m}c^2, \qquad E_1 = \frac{m^2 + m_1^2 - m_2^2}{2m}c^2.
$$

By symmetry, $E_2 = (m^2 + m_2^2 - m_1^2)c^2/(2m)$. The momentum of either product is $p = \sqrt{E_1^2 - m_1^2 c^4}/c$, which you can substitute $E_1$ into to get an expression in $m, m_1, m_2$ alone. The condition $m > m_1 + m_2$ ensures both $E_1$ and $E_2$ are positive and the square root is real: a two-body decay is kinematically allowed only if the parent is heavier than the sum of the daughters' rest masses, and the "excess" $mc^2 - (m_1 + m_2)c^2$ is the total kinetic energy of the two decay products.
:::
:::

::: exercise level=3
A particle of speed $v$ in $S$ has, in $S'$ (moving at $0.6c$ relative to $S$), a speed $v'$ directed perpendicular to the relative velocity, with $|v'| = 0.4c$. Show that the speed of the particle in $S$ is not $\sqrt{v'^2 + (0.6c)^2}$, find its true speed in $S$, and explain where the missing factor went in the naive estimate.
hint="Use the inverse of the velocity transformation: u_x and u_y in S in terms of u'_x = 0.6c (the frame's speed) and u'_y = 0.4c, with the gamma factor in the denominator of u'_y."
::: solution
In $S'$, the particle has $u'_x = 0$ (moving purely in $y'$, perpendicular to the $x'$-axis of relative motion) and $u'_y = 0.4c$. The frame $S'$ moves at $v = 0.6c$ relative to $S$. Use the inverse transformation (same form, $v \to -v$):

$$
u_x = \frac{u'_x + v}{1 + v u'_x/c^2} = \frac{0 + 0.6c}{1 + 0} = 0.6c,
$$

$$
u_y = \frac{u'_y}{\gamma(1 + v u'_x/c^2)} = \frac{0.4c}{\gamma(1 + 0)} = \frac{0.4c}{\gamma}.
$$

With $\gamma = 1/\sqrt{1 - 0.36} = 1/0.8 = 1.25$, $u_y = 0.4c/1.25 = 0.32c$. The true speed in $S$ is

$$
v = \sqrt{u_x^2 + u_y^2} = \sqrt{(0.6c)^2 + (0.32c)^2} = \sqrt{0.36 + 0.1024}\,c = \sqrt{0.4624}\,c \approx 0.680c.
$$

The naive estimate $\sqrt{(0.6c)^2 + (0.4c)^2} = \sqrt{0.36 + 0.16}\,c = \sqrt{0.52}\,c \approx 0.721c$ overstates the speed by about $6\%$. The missing factor is the $1/\gamma$ in $u_y$: the transverse velocity is smaller in the lab frame than in the particle's own transverse frame, because $dt \ne dt'$ for event-pairs separated in $x$, the same $dt'/dt$ factor that produces the $\gamma$ in the $x$-component of the velocity transformation. The two components do not add in quadrature with the "other frame's" values; they add in quadrature with the *transformed* values, and the transformation of the transverse component carries the $1/\gamma$ that the naive vector sum drops.
:::
:::
