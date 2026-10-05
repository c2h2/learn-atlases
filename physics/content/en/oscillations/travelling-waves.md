A flick at the end of a rope sends a kink towards the other hand. The hand that flicked has already stopped by the time the kink arrives, and the rope as a whole has not slid along its length. What travelled was a shape. Each bit of rope moved, mostly sideways, and then returned to where it was. The same distinction, between the motion of a disturbance and the motion of the material, is the whole of this chapter. Sound in air, a wave on a string, and a pulse in a long spring are different media carrying the same kind of object.

The oscillator of [[oscillations/simple-harmonic]] is one degree of freedom. A rope is many, tied together by tension. Disturb one and its neighbour follows, late. The lateness is a travel time, and the travel time per distance is the reciprocal of a speed. We start from the kinematics of a moving shape, find the partial differential equation that such shapes satisfy, and only then specialise to a uniform string under tension. Newton's second law, as in [[mechanics/newton-laws]], is what fixes the speed. Energy bookkeeping, as in [[mechanics/work-energy]], is what fixes the power the wave carries. Superposition of two such waves, and the standing patterns they make, is [[oscillations/superposition]].

Two modelling hypotheses run underneath every formula that mentions a string. The string is perfectly flexible, so it supports tension and not bending moments, and slopes are small, so the motion is transverse and the tension stays near its equilibrium value. A stiff rod violates the first. Both limits are named again where the formulae stop applying.

## A profile that travels

Let the equilibrium string lie along the $x$-axis, and let $y(x,t)$ be the transverse displacement of the bit of string whose equilibrium position is $x$. A rigid shape moving to the right at constant speed $v > 0$ is a function of the single combination $x - vt$.

::: definition Travelling profile {#def-profile}
Let $f$ be a twice differentiable function of one variable, and let $v$ be a positive constant. The waveform

$$
y(x,t) = f(x - vt)
$$ {#eq-right}

is a **right-going travelling wave** of speed $v$. The waveform

$$
y(x,t) = g(x + vt)
$$ {#eq-left}

is a **left-going travelling wave** of speed $v$. In either case the **profile** is the graph of $f$, or of $g$, and the **wave speed** is $v$.
:::

The argument $x - vt$ is constant for an observer who moves so that $\mathrm{d}x/\mathrm{d}t = v$. That observer sees a fixed value of $f$, hence a fixed height. A crest, a zero, or any labelled feature of the profile travels towards increasing $x$ at speed $v$. For [[#eq-left]] the observer who keeps $x + vt$ constant has $\mathrm{d}x/\mathrm{d}t = -v$, so the feature travels towards decreasing $x$. Nothing in the definition says that the material points move at speed $v$. A material point keeps its own $x$ and changes only $y$, unless the wave is longitudinal, a case we return to only to name it.

::: theorem Travelling profiles satisfy the wave equation {#thm-profile}
Let $v > 0$ be constant and let $f$ be twice differentiable. Then $y = f(x - vt)$ satisfies

$$
\frac{\partial^2 y}{\partial x^2} = \frac{1}{v^2}\frac{\partial^2 y}{\partial t^2}
$$ {#eq-wave}

at every $(x,t)$ where the derivatives exist. The same equation is satisfied by $y = g(x + vt)$ and, by linearity, by a sum of one right-going profile and one left-going profile.
:::

::: proof
Set $\xi = x - vt$ and $y = f(\xi)$. The chain rule gives

$$
\pdv{y}{x} = f'(\xi), \qquad \frac{\partial^2 y}{\partial x^2} = f''(\xi),
$$

and

$$
\pdv{y}{t} = -v f'(\xi), \qquad \frac{\partial^2 y}{\partial t^2} = v^2 f''(\xi).
$$

Eliminating $f''(\xi)$ produces [[#eq-wave]]. For a left-going profile set $\eta = x + vt$. Then $\partial y/\partial t = v g'(\eta)$ and $\partial^2 y/\partial t^2 = v^2 g''(\eta)$, while $\partial^2 y/\partial x^2 = g''(\eta)$, so the same relation holds. If $y_1$ and $y_2$ each satisfy [[#eq-wave]], so does $c_1 y_1 + c_2 y_2$, because every derivative in the equation is linear and $v$ is the same constant for both. A sum of a right-going profile and a left-going profile is therefore a solution.
:::

The equation does not care about the shape of $f$. A smooth hump, a kink that has been rounded enough to be twice differentiable, and a sinusoid are solutions on the same footing, provided they move at the same speed $v$ without distorting. That common speed is what it means for the wave to be non-dispersive. If the speed depended on the width of the hump, a general $f$ would not keep its shape, and a single $f(x - vt)$ would not be the right description. The ideal string derived below is non-dispersive. A stiff rod is not.

::: example A hump travelling at eight metres per second {#ex-pulse}
A long string carries the transverse displacement

$$
y(x,t) = \frac{0.040}{1 + (x - 8.0\, t)^2},
$$

with $y$ and $x$ in metres and $t$ in seconds. Identify the direction and the speed. Find the position of the crest at $t = 2.50\,\mathrm{s}$, and the greatest slope on the profile. Say whether the small-slope hypothesis is comfortable for this pulse.
::: solution
The displacement depends on $x$ and $t$ only through $\xi = x - 8.0\, t$, so [[#def-profile]] says the pulse travels towards increasing $x$ at $v = 8.0\,\mathrm{m/s}$. The crest is the maximum of $f(\xi) = 0.040/(1 + \xi^2)$, which sits at $\xi = 0$. At $t = 2.50\,\mathrm{s}$ the crest is at $x = 8.0\times 2.50 = 20.0\,\mathrm{m}$.

The slope at fixed $t$ is $f'(\xi)$. Differentiating by the quotient rule,

$$
f'(\xi) = 0.040\cdot\frac{-2\xi}{(1 + \xi^2)^2}.
$$

To maximise the absolute value, maximise $h(\xi) = \xi/(1 + \xi^2)^2$ for $\xi > 0$ and double it through the factor $2$. The numerator of $h'$ has the factor $1 - 3\xi^2$, so the positive critical point is $\xi = 1/\sqrt{3}$. There

$$
h\left(\frac{1}{\sqrt{3}}\right) = \frac{1/\sqrt{3}}{(1 + 1/3)^2} = \frac{1/\sqrt{3}}{16/9} = \frac{9}{16\sqrt{3}} = \frac{3\sqrt{3}}{16}.
$$

Hence the greatest absolute slope is

$$
\abs{f'}_{\max} = 0.040\cdot 2\cdot\frac{3\sqrt{3}}{16} = 0.040\cdot\frac{3\sqrt{3}}{8} = 0.0260.
$$

A slope of $0.026$ radians, about $1.5^\circ$, is much smaller than one radian. The small-slope model of the next sections is comfortable for this pulse: the geometric approximations made there are errors of order $(0.026)^2$, a few parts in ten thousand. [[#thm-profile]] already guarantees that the pulse satisfies [[#eq-wave]] with this $v$, whether or not a string is what carries it. The string is what will tell us that $8.0\,\mathrm{m/s}$ has to equal $\sqrt{\tau/\mu}$.
:::
:::

## The wave equation

[[#eq-wave]] is linear, second order, and constant-coefficient. It is worth naming, and worth solving in general, because the travelling profiles are not merely examples. On the infinite line they exhaust the twice differentiable solutions.

::: definition Wave equation {#def-wave}
Let $v > 0$ be a constant. A twice differentiable function $y(x,t)$ satisfies the **one-dimensional wave equation** of speed $v$ when

$$
\frac{\partial^2 y}{\partial x^2} = \frac{1}{v^2}\frac{\partial^2 y}{\partial t^2}
$$

throughout the region of the $(x,t)$ plane under discussion. A **harmonic wave** is the special case, treated below, in which the profile is sinusoidal.
:::

The equation is the same statement as $\partial^2 y/\partial t^2 = v^2\,\partial^2 y/\partial x^2$. Both forms appear in print. We keep [[#eq-wave]] as the reference form because the syllabus comparison with a travelling profile is written that way. The speed $v$ is a property of the medium, not of a particular solution. Two profiles of different shapes that ride on the same medium share it.

::: theorem d'Alembert's general solution {#thm-dalembert}
Let $v > 0$ and let $y(x,t)$ be twice continuously differentiable for all real $x$ and for $t$ in an open interval. Then $y$ satisfies [[#eq-wave]] if and only if there exist twice differentiable functions $f$ and $g$ of one variable such that

$$
y(x,t) = f(x - vt) + g(x + vt).
$$ {#eq-general}
:::

::: proof
[[#thm-profile]] already shows that every function of this form satisfies the wave equation. The converse is a change of coordinates. Set $\xi = x - vt$ and $\eta = x + vt$. The map $(x,t)\mapsto(\xi,\eta)$ is linear and invertible, with $x = (\xi + \eta)/2$ and $t = (\eta - \xi)/(2v)$. Write $y$ as a function of $\xi$ and $\eta$. The chain rule gives

$$
\pdv{y}{x} = \pdv{y}{\xi} + \pdv{y}{\eta},
$$

and, because the mixed second partial derivatives of a $C^2$ function are equal,

$$
\frac{\partial^2 y}{\partial x^2} = \frac{\partial^2 y}{\partial\xi^2} + 2\frac{\partial^2 y}{\partial\xi\,\partial\eta} + \frac{\partial^2 y}{\partial\eta^2}.
$$

In time,

$$
\pdv{y}{t} = -v\pdv{y}{\xi} + v\pdv{y}{\eta}.
$$

Differentiating again, and using $\partial/\partial t = -v\,\partial/\partial\xi + v\,\partial/\partial\eta$, produces

$$
\frac{\partial^2 y}{\partial t^2} = v^2\left(\frac{\partial^2 y}{\partial\xi^2} - 2\frac{\partial^2 y}{\partial\xi\,\partial\eta} + \frac{\partial^2 y}{\partial\eta^2}\right).
$$

Impose [[#eq-wave]]. The pure second derivatives cancel and what remains is

$$
4\frac{\partial^2 y}{\partial\xi\,\partial\eta} = 0.
$$

Thus $\partial y/\partial\xi$ is independent of $\eta$: it is some function $A(\xi)$ only. Integrating with respect to $\xi$ gives $y = f(\xi) + g(\eta)$, where $f' = A$ and the "constant" of integration may still depend on $\eta$. Restoring the original variables yields [[#eq-general]].
:::

The hypotheses matter. Twice continuous differentiability was used so that the mixed partials commute and the chain rule applies in the classical sense. An infinite line was used so that $\xi$ and $\eta$ range freely. A string of finite length, with ends held fixed, is the same partial differential equation on a strip, with boundary conditions that pick out discrete shapes. That problem is [[oscillations/superposition]]. A plucked guitar string is not a contradiction of [[#thm-dalembert]]: the reflections at the ends can be represented as further left- and right-going pieces, and the idealisation of an infinite line is what we drop.

Given the initial displacement and the initial transverse velocity, $f$ and $g$ are determined.

::: corollary Initial-value problem on the infinite line {#cor-ivp}
Suppose $y$ satisfies the hypotheses of [[#thm-dalembert]], and suppose the initial data

$$
y(x,0) = \phi(x), \qquad \pdv{y}{t}(x,0) = \psi(x)
$$

are prescribed, with $\phi$ twice differentiable and $\psi$ differentiable. Then for every $x$ and every later $t$ in the interval of existence,

$$
y(x,t) = \frac{\phi(x - vt) + \phi(x + vt)}{2} + \frac{1}{2v}\int_{x - vt}^{x + vt}\psi(s)\,\dd s.
$$ {#eq-ivp}
:::

::: proof
By [[#thm-dalembert]], $y = f(x - vt) + g(x + vt)$. At $t = 0$,

$$
f(x) + g(x) = \phi(x).
$$

Differentiate in $t$ and then set $t = 0$:

$$
-v f'(x) + v g'(x) = \psi(x),
$$

so $g'(x) - f'(x) = \psi(x)/v$. Integrate from $0$ to $x$:

$$
g(x) - f(x) = \frac{1}{v}\int_0^x \psi(s)\,\dd s + g(0) - f(0).
$$

Add this identity to $f + g = \phi$, and subtract it. The constants $f(0)$ and $g(0)$ can be arranged so that they are consistent with $\phi(0) = f(0) + g(0)$; they cancel in the combination that follows, and one finds

$$
\begin{aligned}
f(x) &= \frac{1}{2}\phi(x) - \frac{1}{2v}\int_0^x\psi(s)\,\dd s + C,\\
g(x) &= \frac{1}{2}\phi(x) + \frac{1}{2v}\int_0^x\psi(s)\,\dd s - C,
\end{aligned}
$$

with a constant $C$. Now evaluate $f(x - vt) + g(x + vt)$. The constants cancel, and the two integrals combine into a single integral from $x - vt$ to $x + vt$:

$$
y(x,t) = \frac{\phi(x - vt) + \phi(x + vt)}{2} + \frac{1}{2v}\int_{x - vt}^{x + vt}\psi(s)\,\dd s,
$$

which is [[#eq-ivp]].
:::

If the string is released from rest, $\psi = 0$ and the formula collapses to the average of the initial profile sampled at $x - vt$ and at $x + vt$. The initial hump splits into two copies of half the height, one running each way. That is the content of the next example.

::: example A triangular hump released from rest {#ex-split}
An infinite string has wave speed $v = 4.00\,\mathrm{m/s}$. At $t = 0$ the transverse velocity is zero and the displacement is $\phi(x) = 0.030\,(1 - \abs{x}/2)$ for $\abs{x}\le 2.00\,\mathrm{m}$, and $\phi(x) = 0$ otherwise, with $\phi$ in metres. Find $y(2.00, 0.50)$ and describe the shape at that instant.
::: solution
The initial velocity vanishes, so [[#eq-ivp]] reduces to

$$
y(x,t) = \frac{\phi(x - 4.00\, t) + \phi(x + 4.00\, t)}{2}.
$$

At $x = 2.00\,\mathrm{m}$ and $t = 0.50\,\mathrm{s}$ the sample points are $x - vt = 0$ and $x + vt = 4.00\,\mathrm{m}$. The first lies at the peak of $\phi$, so $\phi(0) = 0.030\,\mathrm{m}$. The second lies outside the initial support, so $\phi(4.00) = 0$. Therefore

$$
y(2.00, 0.50) = \frac{0.030 + 0}{2} = 0.0150\,\mathrm{m}.
$$

At this instant the right-going half-hump occupies $0 \le x \le 4.00\,\mathrm{m}$, because the original support $\abs{x}\le 2$ has been translated by $vt = 2.00\,\mathrm{m}$, and the left-going half-hump occupies $-4.00 \le x \le 0$. They meet at $x = 0$ with height zero in the sense that each copy contributes nothing at the other's outer end; at $x = 0$ both sample points are at $\abs{\xi} = 2$, where $\phi = 0$, so the centre of the string has just returned to equilibrium. Each travelling copy has height $0.0150\,\mathrm{m}$, half the original peak, which is why the value at the crest of the right-going copy is $0.0150\,\mathrm{m}$ rather than $0.030\,\mathrm{m}$.
:::
:::

The corners of $\phi$ are not twice differentiable, so this initial shape sits slightly outside [[#cor-ivp]]. The corners still travel at speed $v$, and the straight segments satisfy the wave equation. When a calculation below needs a second derivative, the profile is sinusoidal.

::: quiz
A transverse wave on a long string has the form $y = f(x - vt)$ with $v > 0$. Which description is right?
- [ ] The profile travels towards decreasing $x$, and each particle of the string drifts towards decreasing $x$ at speed $v$.
- [x] The profile travels towards increasing $x$ at speed $v$, while each particle of the string oscillates transversely and does not travel with the profile.
- [ ] The profile is at rest, and $v$ is the greatest speed of a particle of the string.
- [ ] The formula describes a standing wave, because $x$ and $t$ both appear.
::: solution
By [[#def-profile]], constant phase of a right-going wave means $x - vt$ is constant, so the labelled features of $f$ move towards increasing $x$ at speed $v$. A particle of the string is a fixed $x$. It changes $y$ only. Its speed is $\abs{\partial y/\partial t}$, which for a harmonic wave is at most $\omega A$ and is not $v$. A standing wave needs both a right-going and a left-going profile, which is the subject of [[oscillations/superposition]].
:::
:::

## Harmonic waves

The profiles that come back in every later chapter are the sinusoidal ones. They are the normal modes of a finite string, the carriers of a definite frequency, and the waves whose power we can average in closed form.

::: definition Harmonic travelling wave {#def-harmonic}
A **harmonic travelling wave** of amplitude $A > 0$, angular wave number $k > 0$ and angular frequency $\omega > 0$, travelling towards increasing $x$, is

$$
y(x,t) = A\cos(kx - \omega t).
$$ {#eq-harmonic}

The **wavelength** $\lambda$ is the spatial period, the **frequency** $f$ is the reciprocal of the temporal period $T$, and the quantities are tied to $k$ and $\omega$ by

$$
k = \frac{2\pi}{\lambda}, \qquad \omega = \frac{2\pi}{T} = 2\pi f.
$$ {#eq-kw}

The **phase speed** is the speed at which a crest travels. A phase shift $\varphi$ may be added inside the cosine without changing $A$, $k$ or $\omega$; it records the choice of origin.
:::

Compare [[#eq-harmonic]] with [[#eq-right]]. The cosine depends on $x$ and $t$ through $k(x - (\omega/k) t)$, so the profile is sinusoidal and the wave speed is $\omega/k$, provided that ratio equals the $v$ of the medium. The conditions that make a harmonic wave fit [[#eq-wave]] are the dispersion relations of a non-dispersive medium.

::: proposition Dispersion relations for a non-dispersive medium {#prop-dispersion}
The harmonic wave [[#eq-harmonic]] satisfies [[#eq-wave]] with speed $v$ if and only if

$$
\omega = vk, \qquad v = \lambda f, \qquad k = \frac{2\pi}{\lambda}.
$$ {#eq-dispersion}

The phase speed is $\omega/k$. It is a property of the wave and, in this non-dispersive case, it equals the speed already appearing in [[#eq-wave]]. It is not the velocity of a particle of the medium.
:::

::: proof
For $y = A\cos(kx - \omega t)$,

$$
\frac{\partial^2 y}{\partial x^2} = -k^2 y, \qquad \frac{\partial^2 y}{\partial t^2} = -\omega^2 y,
$$

away from the instants where one prefers to differentiate before using $y$ itself; the same identities hold with $y$ replaced by the cosine. Substitution into [[#eq-wave]] gives $-k^2 y = (1/v^2)(-\omega^2 y)$ for all $(x,t)$, hence $\omega^2 = v^2 k^2$. With the sign convention $k > 0$, $\omega > 0$ and $v > 0$ this is $\omega = vk$. The relations $k = 2\pi/\lambda$ and $\omega = 2\pi f$ are [[#eq-kw]], and dividing them produces $v = \omega/k = \lambda f$.

A crest is a point where $kx - \omega t$ equals a fixed multiple of $2\pi$. Differentiating that constraint in $t$ gives $k\,\mathrm{d}x/\mathrm{d}t - \omega = 0$, so the crest moves at $\mathrm{d}x/\mathrm{d}t = \omega/k$. A particle of the medium sits at fixed $x$, and its transverse velocity is $\partial y/\partial t = \omega A\sin(kx - \omega t)$, whose greatest absolute value is $\omega A$. Nothing has set $\omega A$ equal to $v$.
:::

The particle velocity and the phase speed answer different questions. The phase speed says when the crest arrives. The particle velocity says how fast the string is moving sideways as the crest passes. In every ordinary string wave $\omega A$ is much smaller than $v$, because $\omega A/v = kA$ and $kA$ is the greatest slope. The small-slope hypothesis is precisely $\omega A \ll v$.

::: example Reading a harmonic formula {#ex-read}
A transverse wave on a long string is

$$
y(x,t) = 0.025\cos(4\pi x - 20\pi t),
$$

with $y$ and $x$ in metres and $t$ in seconds. Find the amplitude, the wavelength, the frequency, the phase speed and the direction of travel. Find also the greatest transverse speed of a particle of the string.
::: solution
Match the formula with [[#eq-harmonic]]. The amplitude is $A = 0.025\,\mathrm{m}$. The wave number is $k = 4\pi\,\mathrm{rad/m}$ and the angular frequency is $\omega = 20\pi\,\mathrm{rad/s}$. [[#eq-kw]] gives

$$
\lambda = \frac{2\pi}{k} = \frac{2\pi}{4\pi} = 0.500\,\mathrm{m}, \qquad f = \frac{\omega}{2\pi} = \frac{20\pi}{2\pi} = 10.0\,\mathrm{Hz}.
$$

The phase speed is

$$
v = \frac{\omega}{k} = \frac{20\pi}{4\pi} = 5.00\,\mathrm{m/s},
$$

and since the phase is $kx - \omega t$ the wave travels towards increasing $x$. As a check, $\lambda f = 0.500\times 10.0 = 5.00\,\mathrm{m/s}$.

The transverse velocity of a particle is $\partial y/\partial t = 0.025\cdot 20\pi\sin(4\pi x - 20\pi t)$. Its greatest absolute value is

$$
\omega A = 20\pi\times 0.025 = 0.500\pi = 1.57\,\mathrm{m/s}.
$$

That is less than the phase speed $5.00\,\mathrm{m/s}$. The greatest slope is $kA = 4\pi\times 0.025 = 0.314$, about $18^\circ$, near the edge of the small-slope model used for power below. The kinematic reading of $A$, $\lambda$, $f$ and $v$ did not need that model.
:::
:::

## Waves on a string

The speed $v$ has so far been a parameter. For a uniform string stretched by a tension $\tau$, with linear density $\mu$, Newton's second law on a short element fixes $v = \sqrt{\tau/\mu}$. The argument is local, and the small-slope hypothesis is the step that keeps the motion transverse and the tension constant.

Consider the element whose equilibrium position runs from $x$ to $x + \dd x$. Its mass is $\mu\,\dd x$. Let $\theta(x,t)$ be the angle that the tangent makes with the $x$-axis, so

$$
\tan\theta = \pdv{y}{x}.
$$

The small-slope hypothesis is $\abs{\partial y/\partial x}\ll 1$ everywhere, which forces $\abs{\theta}\ll 1$ in radians. Then $\sin\theta \approx \tan\theta \approx \theta \approx \partial y/\partial x$ and $\cos\theta \approx 1$, with fractional errors of order $\theta^2$.

The tension pulls at each end of the element, tangent to the string, with magnitude $\tau$. We take $\tau$ to be the equilibrium tension. The extra length of a sloping element, relative to $\dd x$, is $\bigl(\sqrt{1 + (\partial y/\partial x)^2} - 1\bigr)\dd x \approx \tfrac12 (\partial y/\partial x)^2\,\dd x$, which is second order in the slope. To the order we are keeping, the string is not stretched beyond its equilibrium extension, and $\tau$ does not vary along the element.

At the right-hand end the outward tangent contributes $\tau\cos\theta$ horizontally and $\tau\sin\theta$ transversely. At the left-hand end the inward tangent contributes the opposites, evaluated at the left-hand angle. The net horizontal force is $\tau\cos\theta(x+\dd x) - \tau\cos\theta(x)$. Since $\cos\theta$ differs from $1$ only by a second-order quantity, that difference is negligible and the element has no longitudinal acceleration at this order. The motion stays transverse.

The net transverse force is

$$
\tau\sin\theta(x+\dd x) - \tau\sin\theta(x) \approx \tau\pdv{}{x}\!\left(\pdv{y}{x}\right)\dd x = \tau\frac{\partial^2 y}{\partial x^2}\,\dd x.
$$

Newton's second law on the mass $\mu\,\dd x$ then reads

$$
\mu\,\dd x\,\frac{\partial^2 y}{\partial t^2} = \tau\frac{\partial^2 y}{\partial x^2}\,\dd x.
$$

Cancel $\dd x$, which is not zero, and rearrange:

$$
\frac{\partial^2 y}{\partial x^2} = \frac{\mu}{\tau}\frac{\partial^2 y}{\partial t^2}.
$$

This is [[#eq-wave]] with $1/v^2 = \mu/\tau$.

::: theorem Wave speed on a uniform string {#thm-string}
Consider a uniform flexible string of linear density $\mu > 0$ under tension $\tau > 0$. Assume the slope satisfies $\abs{\partial y/\partial x}\ll 1$, so that the tension may be treated as the constant equilibrium tension and the motion as transverse. Then small transverse disturbances travel at speed

$$
v = \sqrt{\frac{\tau}{\mu}},
$$ {#eq-speed}

and $y$ satisfies the wave equation [[#eq-wave]] with that speed.
:::

::: proof
The paragraph above is the argument. In one line: the net transverse force on an element of length $\dd x$ is $\tau(\partial^2 y/\partial x^2)\,\dd x$ when the slope is small, the mass is $\mu\,\dd x$, and Newton's second law equates $\mu\,\partial^2 y/\partial t^2$ to $\tau\,\partial^2 y/\partial x^2$. Comparison with [[#eq-wave]] gives $v^2 = \tau/\mu$. The positive root is the speed. Direction is carried by the choice of $f(x - vt)$ or $g(x + vt)$, not by the sign of $v$.
:::

Heavier string, smaller speed; tighter string, greater speed. The amplitude does not appear while the slope remains small, so a tall wave and a short one of the same shape travel together. That fails if the string resists bending, or if the second-order stretch changes the tension.

::: example A string under sixteen newtons {#ex-string}
A uniform string has linear density $\mu = 0.00400\,\mathrm{kg/m}$ and is held at tension $\tau = 16.0\,\mathrm{N}$. A harmonic travelling wave of amplitude $A = 5.00\,\mathrm{mm}$ and frequency $f = 40.0\,\mathrm{Hz}$ runs along it. Find the wave speed, the angular frequency, the wavelength, the wave number, the greatest slope, and the greatest transverse speed of a particle. Check the small-slope hypothesis.
::: solution
[[#eq-speed]] gives

$$
v = \sqrt{\frac{\tau}{\mu}} = \sqrt{\frac{16.0}{0.00400}} = \sqrt{4000} = 63.24555\ldots\,\mathrm{m/s}.
$$

To three significant figures, $v = 63.2\,\mathrm{m/s}$. The frequency is $40.0\,\mathrm{Hz}$, so the angular frequency is exact in terms of $\pi$:

$$
\omega = 2\pi f = 80\pi = 251.327\ldots\,\mathrm{rad/s},
$$

or $251\,\mathrm{rad/s}$ to three significant figures. The wavelength and the wave number are

$$
\lambda = \frac{v}{f} = \frac{\sqrt{4000}}{40.0} = 1.58114\ldots\,\mathrm{m}, \qquad k = \frac{\omega}{v} = \frac{80\pi}{\sqrt{4000}} = 3.97384\ldots\,\mathrm{rad/m}.
$$

To three significant figures, $\lambda = 1.58\,\mathrm{m}$ and $k = 3.97\,\mathrm{rad/m}$. Using the rounded speed $63.2\,\mathrm{m/s}$ in $k = 2\pi f/v$ produces $3.98\,\mathrm{rad/m}$ if one rounds $63.2$ too early and then rounds again; the consistent three-significant-figure value of the exact quotient is $3.97\,\mathrm{rad/m}$.

The amplitude is $A = 5.00\times 10^{-3}\,\mathrm{m}$. The greatest slope and the greatest particle speed are

$$
kA = 0.01987, \qquad \omega A = 1.2566\ldots\,\mathrm{m/s}.
$$

To three significant figures the particle speed reaches $1.26\,\mathrm{m/s}$, about fifty times smaller than the wave speed $63.2\,\mathrm{m/s}$. The greatest slope is $0.0199$, just under $1.2^\circ$. The small-slope hypothesis is in good shape, and $v = \sqrt{\tau/\mu}$ is the right speed to use. The average power carried by this wave is computed in [[#ex-energy]], once the power formula is in hand.
:::
:::

The figure shows a right-going harmonic wave in a choice of units where the wave number is $2$ and the angular frequency is $3$.

::: widget wave
A: 1
B: 0
k: 2
w: 3
caption: With B = 0 only a right-going wave is drawn. The phase speed is w/k = 1.5 in the figure's units: a crest moves one and a half length-units per time-unit. Change k and w separately and watch that speed; it is not the up-and-down speed of a point on the curve. Raise B towards A and the profile stops travelling. Equal amplitudes are a standing wave, taken up in the next chapter, and they carry no net power.
:::

## Energy and power

A travelling wave carries energy past a station even though the string itself does not flow past that station. The carrier is the tension doing work on the downstream side of the station.

Fix a point $x$ and consider the power delivered to the string on the right of that point by the string on the left. The left-hand portion pulls on the right-hand portion with a force of magnitude $\tau$ directed along the tangent towards the left. The transverse component of that force is $-\tau\sin\theta \approx -\tau\,\partial y/\partial x$ under the small-slope hypothesis: a positive slope means the left-hand portion pulls the right-hand portion downwards. The transverse velocity of the material at the station is $\partial y/\partial t$. The power delivered across the station, force times velocity, is therefore

$$
P = -\tau\pdv{y}{x}\pdv{y}{t}.
$$ {#eq-power-inst}

The sign convention is that $P > 0$ when energy flows towards increasing $x$.

::: proposition Power of a travelling wave on a string {#prop-power}
Assume the small-slope string of [[#thm-string]], with tension $\tau$ and linear density $\mu$, and write $v = \sqrt{\tau/\mu}$.

For a right-going profile $y = f(x - vt)$, the instantaneous power across any station is

$$
P = \tau v\left(f'(x - vt)\right)^2 \ge 0.
$$

For a left-going profile $y = g(x + vt)$, the power is $-\tau v (g')^2 \le 0$.

For the harmonic wave $y = A\cos(kx - \omega t)$ with $\omega = vk$, the average of $P$ over one period is

$$
\langle P\rangle = \tfrac12\mu v\omega^2 A^2.
$$ {#eq-power-avg}

Equivalently $\langle P\rangle = \tfrac12\tau k\omega A^2$. The average energy per unit length on this wave is $\tfrac12\mu\omega^2 A^2$, and the average power equals that linear density times $v$.
:::

::: proof
For $y = f(x - vt)$ one has $\partial y/\partial x = f'$ and $\partial y/\partial t = -v f'$. Insert these into [[#eq-power-inst]]:

$$
P = -\tau(f')(-v f') = \tau v (f')^2,
$$

which is non-negative. Energy flows to the right, with the wave. For $y = g(x + vt)$ the derivatives are $\partial y/\partial x = g'$ and $\partial y/\partial t = v g'$, so $P = -\tau v (g')^2 \le 0$. Energy flows to the left, again with the wave.

Now take $y = A\cos(kx - \omega t)$ with $\omega = vk$. Then

$$
\pdv{y}{x} = -kA\sin(kx - \omega t), \qquad \pdv{y}{t} = \omega A\sin(kx - \omega t),
$$

and [[#eq-power-inst]] becomes

$$
P = \tau k\omega A^2\sin^2(kx - \omega t).
$$

The average of $\sin^2$ over a period is $\tfrac12$, so $\langle P\rangle = \tfrac12\tau k\omega A^2$. Replace $\tau$ by $\mu v^2$ and $k$ by $\omega/v$:

$$
\langle P\rangle = \tfrac12(\mu v^2)\left(\frac{\omega}{v}\right)\omega A^2 = \tfrac12\mu v\omega^2 A^2,
$$

which is [[#eq-power-avg]].

It remains to match this with the energy sitting on the string. The kinetic energy of an element is $\tfrac12(\mu\,\dd x)(\partial y/\partial t)^2$. The potential energy is the work done in stretching the element against the tension. The extra length is approximately $\tfrac12(\partial y/\partial x)^2\,\dd x$, so the stored energy is $\tfrac12\tau(\partial y/\partial x)^2\,\dd x$. On the harmonic wave,

$$
\mu\left(\pdv{y}{t}\right)^2 = \mu\omega^2 A^2\sin^2(kx - \omega t), \qquad \tau\left(\pdv{y}{x}\right)^2 = \tau k^2 A^2\sin^2(kx - \omega t).
$$

These are equal because $\tau k^2 = \mu v^2 k^2 = \mu\omega^2$. Instantaneously, and not merely on average, the kinetic energy density and the potential energy density are equal. Each averages to $\tfrac14\mu\omega^2 A^2$, because the average of $\sin^2$ is $\tfrac12$ and each density already carries a factor $\tfrac12$ from the energy definitions. The total average energy per unit length is therefore

$$
\langle u\rangle = \tfrac12\mu\omega^2 A^2.
$$

Multiplying by the wave speed recovers $\langle P\rangle = \langle u\rangle v$. The energy travels at the wave speed. Over one wavelength the average stored energy is $\langle u\rangle\lambda$, and in one period that packet moves forward by one wavelength, delivering average power $\langle u\rangle\lambda/T = \langle u\rangle v$.
:::

The equality of kinetic and potential densities used $\omega = vk$ and $\tau = \mu v^2$. It is a property of a single harmonic wave on a uniform string, not of an arbitrary motion. A standing wave, treated in one paragraph of the warning below, stores energy and does not transport it.

::: example Power on the sixteen-newton string {#ex-energy}
Continue [[#ex-string]]: $\mu = 0.00400\,\mathrm{kg/m}$, $\tau = 16.0\,\mathrm{N}$, $A = 5.00\,\mathrm{mm}$, $f = 40.0\,\mathrm{Hz}$, and $v = \sqrt{4000}\,\mathrm{m/s}$. Find the average power, the average energy per metre, the average energy in one wavelength, and the time required to deliver $1.00\,\mathrm{J}$ past a station.
::: solution
Use $\omega = 80\pi\,\mathrm{rad/s}$, $A = 5.00\times 10^{-3}\,\mathrm{m}$ and $v = \sqrt{4000}$. [[#eq-power-avg]] gives

$$
\begin{aligned}
\langle P\rangle
&= \tfrac12\mu v\omega^2 A^2
= \tfrac12\times 0.00400\times\sqrt{4000}\times (80\pi)^2\times (5.00\times 10^{-3})^2\\
&= 0.19975\,\mathrm{W}.
\end{aligned}
$$

To three significant figures, $\langle P\rangle = 0.200\,\mathrm{W}$. The same number comes from $\tfrac12\tau k\omega A^2$ with $k = \omega/v$, which is a useful check that $\tau = \mu v^2$ has been kept consistent. The instantaneous power oscillates between $0$ and $2\langle P\rangle = 0.399\,\mathrm{W}$, because it carries $\sin^2$ and the average of $\sin^2$ is half its peak.

The average energy per unit length is

$$
\langle u\rangle = \tfrac12\mu\omega^2 A^2 = \frac{\langle P\rangle}{v} = 3.16\times 10^{-3}\,\mathrm{J/m}.
$$

One wavelength is $\lambda = v/f = 1.581\,\mathrm{m}$, so the average energy in one wavelength is $\langle u\rangle\lambda = 4.99\times 10^{-3}\,\mathrm{J}$. The time required to deliver $1.00\,\mathrm{J}$ at the average rate is

$$
t = \frac{1.00}{\langle P\rangle} = 5.01\,\mathrm{s},
$$

about two hundred cycles at $40.0\,\mathrm{Hz}$. The wave speed is $63.2\,\mathrm{m/s}$, so in those $5.01\,\mathrm{s}$ the energy that passes the station was spread over roughly $317\,\mathrm{m}$ of string, and $317\times 3.16\times 10^{-3} \approx 1.00\,\mathrm{J}$. The arithmetic closes.
:::
:::

Do not replace $\omega$ by $f$ inside [[#eq-power-avg]]. The angular frequency is $\omega = 2\pi f$, and the equivalent form is $\langle P\rangle = 2\pi^2\mu v f^2 A^2$.

::: warning Where the power formula does not apply
The average [[#eq-power-avg]] belongs to a single harmonic travelling wave on a uniform flexible string, in the small-slope regime where $v = \sqrt{\tau/\mu}$ is meaningful. It is not a universal expression for "wave power".

A standing wave transports no net energy. The sum of a right-going and a left-going harmonic wave of equal amplitude,

$$
y = A\cos(kx - \omega t) + A\cos(kx + \omega t) = 2A\cos(kx)\cos(\omega t),
$$

has

$$
\pdv{y}{x} = -2Ak\sin(kx)\cos(\omega t), \qquad \pdv{y}{t} = -2A\omega\cos(kx)\sin(\omega t).
$$

The instantaneous power [[#eq-power-inst]] is then proportional to $\sin(2kx)\sin(2\omega t)$. The average of $\sin(2\omega t)$ over a period is zero at every $x$. Energy sloshes between neighbouring quarter-wavelengths, and the average flux across any station vanishes. Using [[#eq-power-avg]] on a standing wave invents a transport that is not there. The factor $\tfrac12\mu v\omega^2 A^2$ with $A$ read off as the standing-wave amplitude $2A$ is a second, separate mistake.

Do not use $v = \sqrt{\tau/\mu}$ for a stiff rod. A rod or a thick bar resists bending. In the Euler–Bernoulli model the bending contribution adds a term proportional to $\partial^4 y/\partial x^4$ to the transverse force balance, and a harmonic wave then satisfies a dispersion relation of the form $\omega^2 = (\tau/\mu)k^2 + (EI/\mu)k^4$, where $EI$ measures the bending stiffness. The phase speed $\omega/k$ depends on $k$. A narrow pulse, which is a packet of many wave numbers, does not keep its shape, and no single $\sqrt{\tau/\mu}$ describes it. The ideal-string speed is the limit of that relation in which the bending term is negligible, either because $EI$ is small or because the wavelength is long enough that $k^2 EI/\tau$ is small. Quoting $\sqrt{\tau/\mu}$ for a metal rod in flexure ignores the term that usually dominates.
:::

## Where this leads

[[oscillations/superposition]] adds two of these waves. Equal amplitudes in opposite directions stand; nearly equal frequencies beat. The normal modes of a string of length $L$ fixed at both ends are harmonic waves folded by reflection into standing shapes with $\lambda_n = 2L/n$, and the speed in those frequencies is still [[#eq-speed]]. Sound replaces $\sqrt{\tau/\mu}$ by a different expression, in [[oscillations/sound]], but $f(x - vt)$, the harmonic wave and $\lambda f$ stay as they are here.

The driven oscillator of [[oscillations/resonance]] is the one-degree-of-freedom cousin. A hand at $x = 0$ driven through $y(0,t) = A\cos(\omega t)$ launches a right-going harmonic wave with $k = \omega/v$. On a long string the amplitude is fixed by the hand. Resonance reappears when the string is finite and $\omega$ hits a standing mode.

::: history d'Alembert's string of 1747
In 1747 Jean le Rond d'Alembert derived the partial differential equation of a taut vibrating string and showed that its general solution is an arbitrary right-going profile plus an arbitrary left-going profile. The paper was submitted to the Berlin Academy. That is the origin of [[#eq-wave]] and of [[#eq-general]]. Euler was willing to admit rougher initial shapes than d'Alembert allowed, and Daniel Bernoulli preferred a sum of sinusoidal modes. That argument is taken up in [[oscillations/superposition]]. On the ideal string a fixed shape travelling at constant speed is half of every solution.
:::

::: summary
- A profile $y = f(x - vt)$ travels towards increasing $x$ at speed $v$ without changing shape. A profile $y = g(x + vt)$ travels towards decreasing $x$. The material points of a transverse wave do not travel at speed $v$.
- Both profiles satisfy the wave equation $\partial^2 y/\partial x^2 = (1/v^2)\,\partial^2 y/\partial t^2$. On the infinite line every twice continuously differentiable solution is a sum of one profile of each kind.
- The initial displacement $\phi$ and the initial transverse velocity $\psi$ fix the motion by d'Alembert's formula [[#eq-ivp]]. Released from rest, a hump splits into two half-height copies.
- A harmonic wave $y = A\cos(kx - \omega t)$ has $\omega = vk$, $v = \lambda f$ and $k = 2\pi/\lambda$. The phase speed is $\omega/k$. The greatest particle speed is $\omega A$, and the greatest slope is $kA$.
- On a uniform flexible string with small slope, Newton's second law on an element gives $v = \sqrt{\tau/\mu}$. The formula is not for a stiff rod, whose phase speed depends on wavelength.
- The power crossing a station is $P = -\tau(\partial y/\partial x)(\partial y/\partial t)$. For one harmonic travelling wave the average is $\tfrac12\mu v\omega^2 A^2$. Kinetic and potential energy densities match, and the energy travels at speed $v$.
- A standing wave of equal and opposite harmonic components has zero average power. The travelling-wave formula does not apply to it.
:::

## Exercises

::: exercise Speed from tension and density {#exr-speed level=1 check="30"}
A uniform string has linear density $\mu = 0.0100\,\mathrm{kg/m}$ and is under tension $\tau = 9.00\,\mathrm{N}$. Assume the small-slope regime of [[#thm-string]]. Find the wave speed in $\mathrm{m/s}$.
::: solution
[[#eq-speed]] gives

$$
v = \sqrt{\frac{\tau}{\mu}} = \sqrt{\frac{9.00}{0.0100}} = \sqrt{900} = 30.0\,\mathrm{m/s}.
$$

The speed is $30.0\,\mathrm{m/s}$. The amplitude was not needed. In this regime a change of amplitude does not change $v$.
:::
:::

::: exercise Wavelength from speed and frequency {#exr-lambda level=1 check="4"}
A travelling wave has speed $v = 20.0\,\mathrm{m/s}$ and frequency $f = 5.00\,\mathrm{Hz}$. Find the wavelength in metres.
::: solution
[[#eq-dispersion]] gives $\lambda f = v$, so

$$
\lambda = \frac{v}{f} = \frac{20.0}{5.00} = 4.00\,\mathrm{m}.
$$

The wavelength is $4.00\,\mathrm{m}$. The corresponding wave number is $2\pi/\lambda = \pi/2\,\mathrm{rad/m}$, which was not required.
:::
:::

::: exercise Phase speed from the arguments of the cosine {#exr-phase level=1 check="5"}
A transverse displacement, in metres, is $y = 0.020\cos(3.0\, x - 15 t)$ with $x$ in metres and $t$ in seconds. Find the phase speed in $\mathrm{m/s}$, taking the positive value in the direction of travel.
::: solution
Match $k = 3.0\,\mathrm{rad/m}$ and $\omega = 15\,\mathrm{rad/s}$ with [[#eq-harmonic]]. The phase is $kx - \omega t$, so the wave travels towards increasing $x$ at

$$
v = \frac{\omega}{k} = \frac{15}{3.0} = 5.0\,\mathrm{m/s}.
$$

The amplitude $0.020\,\mathrm{m}$ does not enter the phase speed. The greatest particle speed is a different quantity, $\omega A = 15\times 0.020 = 0.30\,\mathrm{m/s}$, much smaller than $5.0\,\mathrm{m/s}$. The phase speed asked for is $5.0\,\mathrm{m/s}$.
:::
:::

::: exercise Average power of a slow harmonic wave {#exr-power level=2 check="0.004"}
A harmonic travelling wave on a uniform string has $\mu = 0.0200\,\mathrm{kg/m}$, wave speed $v = 10.0\,\mathrm{m/s}$, angular frequency $\omega = 20.0\,\mathrm{rad/s}$ and amplitude $A = 0.0100\,\mathrm{m}$. The small-slope hypotheses of [[#prop-power]] hold. Find the average power in watts.
::: solution
[[#eq-power-avg]] gives

$$
\begin{aligned}
\langle P\rangle
&= \tfrac12\mu v\omega^2 A^2
= \tfrac12\times 0.0200\times 10.0\times 20.0^2\times 0.0100^2\\
&= \tfrac12\times 0.200\times 400\times 1.00\times 10^{-4}
= 0.00400\,\mathrm{W}.
\end{aligned}
$$

The average power is $0.00400\,\mathrm{W}$. As a check on the slope, $k = \omega/v = 2.00\,\mathrm{rad/m}$ and $kA = 0.0200$, which is small enough for the formula's hypotheses. The tension implied by the data is $\tau = \mu v^2 = 2.00\,\mathrm{N}$, and $\tfrac12\tau k\omega A^2$ returns the same $0.00400\,\mathrm{W}$.
:::
:::

::: exercise Greatest transverse speed {#exr-particle level=2 check="1"}
A harmonic wave on a string has angular frequency $\omega = 50.0\,\mathrm{rad/s}$ and amplitude $A = 0.0200\,\mathrm{m}$. Find the greatest transverse speed of a particle of the string, in $\mathrm{m/s}$.
::: hint
The particle speed is $\partial y/\partial t$, not the phase speed. Its amplitude is $\omega A$.
:::
::: solution
For $y = A\cos(kx - \omega t)$ the transverse velocity is $\partial y/\partial t = \omega A\sin(kx - \omega t)$. The greatest absolute value is

$$
\omega A = 50.0\times 0.0200 = 1.00\,\mathrm{m/s}.
$$

The answer is $1.00\,\mathrm{m/s}$. The wave number was not given, so the phase speed cannot be found from these data, and it is not the quantity asked for.
:::
:::

::: exercise Tension required for a given travel time {#exr-tension level=2 check="10"}
A uniform string has linear density $\mu = 0.00400\,\mathrm{kg/m}$. A transverse pulse is to travel $2.00\,\mathrm{m}$ along it in $0.0400\,\mathrm{s}$. Assume the small-slope regime. Find the tension required, in newtons.
::: solution
The pulse speed must be

$$
v = \frac{2.00}{0.0400} = 50.0\,\mathrm{m/s}.
$$

[[#eq-speed]] rearranges to $\tau = \mu v^2$:

$$
\tau = 0.00400\times 50.0^2 = 0.00400\times 2500 = 10.0\,\mathrm{N}.
$$

The tension is $10.0\,\mathrm{N}$. The shape of the pulse does not appear, provided the slope stays small and the string stays uniform, because every profile then shares this speed.
:::
:::

::: exercise Power read from a cosine {#exr-readpower level=3 check="0.0576"}
A uniform string of linear density $\mu = 0.00500\,\mathrm{kg/m}$ carries the travelling wave

$$
y = 0.030\cos(2.5\, x - 40 t),
$$

with $y$ and $x$ in metres, $t$ in seconds, and the cosine's argument in radians. Assume the string is flexible and the slope is small enough for [[#thm-string]] and [[#prop-power]]. Find the average power in watts.
::: hint
Read $k$ and $\omega$ from the cosine, deduce $v = \omega/k$, check that $kA$ is modest, and only then use [[#eq-power-avg]].
:::
::: solution
The form matches [[#eq-harmonic]] with $A = 0.030\,\mathrm{m}$, $k = 2.5\,\mathrm{rad/m}$ and $\omega = 40\,\mathrm{rad/s}$, travelling towards increasing $x$. The phase speed is

$$
v = \frac{\omega}{k} = \frac{40}{2.5} = 16\,\mathrm{m/s}.
$$

The greatest slope is $kA = 2.5\times 0.030 = 0.075$, about $4^\circ$, small enough that the ideal-string power formula is a reasonable model. The tension consistent with this speed is $\tau = \mu v^2 = 0.00500\times 256 = 1.28\,\mathrm{N}$. The average power is

$$
\begin{aligned}
\langle P\rangle
&= \tfrac12\mu v\omega^2 A^2
= \tfrac12\times 0.00500\times 16\times 1600\times 0.000900\\
&= \tfrac12\times 0.0800\times 1.44
= 0.0576\,\mathrm{W}.
\end{aligned}
$$

The equivalent expression $\tfrac12\tau k\omega A^2 = \tfrac12\times 1.28\times 2.5\times 40\times 0.000900 = 0.0576\,\mathrm{W}$ agrees. The average power is $0.0576\,\mathrm{W}$.
:::
:::

::: exercise Direction of the energy flow {#exr-flow level=3}
Prove that on the small-slope string of [[#thm-string]], a right-going profile $y = f(x - vt)$ sends non-negative power towards increasing $x$, and a left-going profile sends non-positive power. Then take the standing wave $y = 2A\cos(kx)\cos(\omega t)$ with $\omega = vk$ and $v = \sqrt{\tau/\mu}$, and prove that the average power across every station is zero. Explain in one sentence why [[#eq-power-avg]], applied with amplitude $2A$, would be the wrong description of this standing wave.
::: hint
Start from $P = -\tau(\partial y/\partial x)(\partial y/\partial t)$. For the standing wave, average $\sin(2\omega t)$ over a period before you do anything else.
:::
::: solution
Under the small-slope hypothesis the power delivered to the downstream side of a station is [[#eq-power-inst]], $P = -\tau(\partial y/\partial x)(\partial y/\partial t)$.

If $y = f(x - vt)$, then $\partial y/\partial x = f'$ and $\partial y/\partial t = -v f'$, so

$$
P = -\tau(f')(-v f') = \tau v (f')^2.
$$

The tension, the speed and the square are all non-negative, so $P \ge 0$. Energy flows towards increasing $x$, which is the direction the profile travels. If $y = g(x + vt)$, then $\partial y/\partial x = g'$ and $\partial y/\partial t = v g'$, so $P = -\tau v (g')^2 \le 0$. Energy flows towards decreasing $x$.

For the standing wave, expand the derivatives:

$$
\pdv{y}{x} = -2Ak\sin(kx)\cos(\omega t), \qquad \pdv{y}{t} = -2A\omega\cos(kx)\sin(\omega t).
$$

Their product is $4A^2 k\omega\sin(kx)\cos(kx)\sin(\omega t)\cos(\omega t)$, and therefore

$$
P = -\tau\cdot 4A^2 k\omega\cdot\tfrac12\sin(2kx)\cdot\tfrac12\sin(2\omega t) = -\tau A^2 k\omega\sin(2kx)\sin(2\omega t).
$$

At any fixed $x$ the factor $\sin(2kx)$ is a constant. The average of $\sin(2\omega t)$ over a period $T = 2\pi/\omega$ is zero. Hence $\langle P\rangle = 0$ at every station. The same conclusion is [[#prop-power]] applied to each travelling half and added: the right-going wave of amplitude $A$ carries $+\tfrac12\mu v\omega^2 A^2$ on average, the left-going wave of amplitude $A$ carries the opposite, and the sum vanishes. There is no leftover cross term in the average.

[[#eq-power-avg]] with the amplitude replaced by $2A$ would report $2\mu v\omega^2 A^2$, a positive transport. That formula was derived for a single travelling harmonic wave. The standing wave is not one, and the cross terms between the two directions cancel the net flux. Applying the travelling-wave formula here invents a flow of energy down the string that the average of $P$ does not contain.
:::
:::
