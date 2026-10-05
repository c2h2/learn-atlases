A tuning fork at $440\,\mathrm{Hz}$ and a second fork a few hertz sharp, sounded together, do not produce a steady tone. The loudness swells and fades several times a second. A guitar string, plucked once, holds a definite pitch instead of a wash of noise, and a fingertip touched lightly at the middle kills that pitch and leaves a higher one. Both observations are the same fact about linear waves: when two disturbances occupy one medium, the displacement is the sum of the displacements each would have produced alone. Nothing in the linear equation generates a new frequency. What changes is the pattern — an envelope in time, or a set of nodes frozen in space.

The travelling wave $f(x - vt)$ and the wave equation it satisfies are the subject of [[oscillations/travelling-waves]]. This chapter stays with that equation and asks what happens when more than one solution is present. The answers are beats, standing waves, and the normal modes of a string fixed at both ends. Sound, in [[oscillations/sound]], uses the same addition for pipes, loudness and the Doppler shift. Throughout, the medium is uniform, the amplitude is small enough that the wave speed does not depend on the displacement, and $v$ means that speed.

## Adding solutions

The one-dimensional wave equation on a uniform medium is

$$
\frac{\partial^2 y}{\partial x^2} = \frac{1}{v^2}\frac{\partial^2 y}{\partial t^2}.
$$ {#eq-wave}

Every derivative in [[#eq-wave]] is linear, and $v$ is a constant. That is the whole reason solutions may be added.

::: definition Principle of superposition {#def-superposition}
Let $y_1(x,t)$ and $y_2(x,t)$ be displacements that each satisfy [[#eq-wave]] with the same speed $v$. The **principle of superposition** says that every linear combination

$$
y = c_1 y_1 + c_2 y_2,
$$

with $c_1$ and $c_2$ constant, is again a solution. The same statement extends to any finite sum, and, when the convergence is good enough to allow term-by-term differentiation, to an infinite sum.
:::

::: theorem Linearity of the wave equation {#thm-linear}
If $y_1$ and $y_2$ satisfy [[#eq-wave]] and $c_1$, $c_2$ are constants, then $y = c_1 y_1 + c_2 y_2$ satisfies [[#eq-wave]].
:::

::: proof
Differentiation is linear, and it does not care whether the variable is $x$ or $t$. For the combination $y$,

$$
\frac{\partial^2 y}{\partial x^2} = c_1\frac{\partial^2 y_1}{\partial x^2} + c_2\frac{\partial^2 y_2}{\partial x^2},
$$

and the same identity holds with $t$ in place of $x$. Because each of $y_1$ and $y_2$ satisfies [[#eq-wave]],

$$
\begin{aligned}
\frac{\partial^2 y}{\partial x^2}
&= c_1\frac{1}{v^2}\frac{\partial^2 y_1}{\partial t^2} + c_2\frac{1}{v^2}\frac{\partial^2 y_2}{\partial t^2}
= \frac{1}{v^2}\frac{\partial^2 y}{\partial t^2}.
\end{aligned}
$$

The cross terms that a nonlinear equation would produce — a square of a first derivative, a product $y\,\partial y/\partial x$ — are absent. Their absence is the proof. The argument uses one and the same $v$ for both waves. Two media with two speeds are two problems, not one superposition.
:::

The hypothesis under [[#eq-wave]] is the small-slope hypothesis of [[oscillations/travelling-waves]]: the restoring force stays proportional to the displacement. Superposition is that linearity, not an extra law. When the slope is large the equation acquires nonlinear terms, and two pulses do not pass through each other unchanged.

::: intuition The medium does not keep a list of causes
At each point and each instant the medium has one displacement, one transverse velocity and one slope. It has no memory of which wave "owns" that displacement. A linear restoring mechanism responds to the total, and the response to a sum is the sum of the responses. Once the waves have separated again, each travels as it did before the overlap, because there was never an interaction term to change either profile.
:::

::: example Two pulses that pass through each other {#ex-pulses}
A right-going pulse on a long string has peak displacement $+2.00\,\mathrm{cm}$. A left-going pulse has peak displacement $+3.00\,\mathrm{cm}$. Their shapes are such that, at one instant, the two peaks sit on the same point of the string. What is the displacement of that point at that instant, and what are the two peak displacements after the pulses have separated? Repeat the question if the left-going peak is $-3.00\,\mathrm{cm}$ instead.
::: solution
Superposition adds displacements, including their signs. At the instant the peaks coincide the displacement is

$$
2.00 + 3.00 = 5.00\,\mathrm{cm}.
$$

After the pulses separate, each is again a solution on its own. The right-going peak is still $+2.00\,\mathrm{cm}$ and the left-going peak is still $+3.00\,\mathrm{cm}$. The overlap was not a collision that exchanged amplitudes.

If the left-going peak is $-3.00\,\mathrm{cm}$, the same instant gives

$$
2.00 + (-3.00) = -1.00\,\mathrm{cm}.
$$

Partial cancellation is still ordinary addition. Afterwards the peaks are $+2.00\,\mathrm{cm}$ and $-3.00\,\mathrm{cm}$, unchanged. One photograph cannot separate a single pulse from two pulses that happen to overlap.
:::
:::

## Beats

Two harmonic oscillations of equal amplitude and nearly equal frequency, added at one place, are the cleanest use of [[#def-superposition]]. Think of two tuning forks at the ear, or of two travelling waves of the same amplitude evaluated at a fixed $x$. The sum is not a third sinusoid at a new frequency. It is a rapid oscillation whose amplitude slowly grows and shrinks.

The trigonometric step is the sum-to-product identity, which we record before using it. For any angles $\alpha$ and $\beta$,

$$
\begin{aligned}
\cos\alpha &= \cos\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2} - \sin\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2},\\
\cos\beta &= \cos\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2} + \sin\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2}.
\end{aligned}
$$

Adding these two expansions cancels the sine terms:

$$
\cos\alpha + \cos\beta = 2\cos\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}.
$$ {#eq-sum}

Subtracting them cancels the cosine terms:

$$
\cos\alpha - \cos\beta = -2\sin\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2}.
$$ {#eq-diff}

Both identities are exact. They are the engine of this chapter.

::: theorem Beat waveform {#thm-beats}
Let two oscillations of equal amplitude $A > 0$ and angular frequencies $\omega_1$ and $\omega_2$ be added at one point,

$$
y(t) = A\cos(\omega_1 t) + A\cos(\omega_2 t).
$$

Then

$$
y(t) = 2A\cos\left(\frac{\Delta\omega}{2}\, t\right)\cos(\omega_{\mathrm{av}} t),
$$ {#eq-beat-wave}

where $\Delta\omega = \omega_1 - \omega_2$ and $\omega_{\mathrm{av}} = (\omega_1 + \omega_2)/2$. The rapid factor oscillates at the average frequency. The slow factor $\cos(\Delta\omega\, t/2)$ is an envelope.
:::

::: proof
Apply [[#eq-sum]] with $\alpha = \omega_1 t$ and $\beta = \omega_2 t$. The half-sum of the angles is $\omega_{\mathrm{av}} t$ and the half-difference is $(\Delta\omega/2)\, t$, which is [[#eq-beat-wave]]. Nothing in the algebra assumes that $\omega_1$ is close to $\omega_2$. The name "envelope" is useful when $|\Delta\omega|$ is much smaller than $\omega_{\mathrm{av}}$, because then many rapid cycles fit inside one slow rise and fall, and the ear can separate the two time scales. The identity itself is exact for any pair of frequencies.
:::

The envelope $\cos(\Delta\omega\, t/2)$ has angular frequency $|\Delta\omega|/2$, so the frequency of that cosine — from one positive peak to the next positive peak — is $|f_1 - f_2|/2$. Loudness does not follow the signed cosine. A negative peak of the cosine is as loud as a positive peak: the ear, and any instrument that responds to intensity, follows the absolute value. And $|\cos\theta|$ repeats twice as often as $\cos\theta$, because $|\cos(\theta+\pi)| = |\cos\theta|$.

::: definition Beat frequency {#def-beat}
The **beat frequency** of two equal-amplitude tones of frequencies $f_1$ and $f_2$ is the number of loud peaks per unit time,

$$
f_{\mathrm{beat}} = \abs{f_1 - f_2}.
$$ {#eq-beat}

Equivalently, successive maxima of $\abs{\cos(\Delta\omega\, t/2)}$ are separated by $1/f_{\mathrm{beat}}$.
:::

::: proof
Set $\theta = \abs{\Delta\omega}\, t/2$. Then $|\cos\theta|$ has period $\pi$ in the variable $\theta$, since shifting $\theta$ by $\pi$ changes the sign of the cosine and the absolute value removes it. The corresponding period in $t$ solves $\abs{\Delta\omega}\,\Delta t/2 = \pi$, so

$$
\Delta t = \frac{2\pi}{\abs{\Delta\omega}} = \frac{1}{\abs{f_1 - f_2}}.
$$

Here $\omega = 2\pi f$ was used, so $\abs{\Delta\omega} = 2\pi\abs{f_1 - f_2}$. One loud peak per interval $\Delta t$ means [[#eq-beat]]. The signed cosine $\cos(\Delta\omega\, t/2)$ itself peaks only half as often. Quoting $|f_1 - f_2|/2$ as the beat frequency confuses the frequency of the signed factor with the frequency of its absolute value. The waveform does change sign from one loud peak to the next, but a change of sign is not a new pitch.
:::

The frequencies actually present in [[#eq-beat-wave]] are $f_1$ and $f_2$, or equivalently the average and the slow modulation. There is no third harmonic oscillator at $f_{\mathrm{beat}}$ hiding in the linear theory. A spectrum analyser that resolves $f_1$ and $f_2$ shows two lines. The throb is the way those two lines interfere in time.

::: example Two tuning forks {#ex-beats}
Forks of $440\,\mathrm{Hz}$ and $444\,\mathrm{Hz}$ are struck together, with equal amplitude, in phase at $t = 0$. Find the beat frequency, the time between successive loud peaks, the time of the first silence, the frequency of the rapid oscillation, and the number of rapid cycles in one beat.
::: solution
By [[#eq-beat]],

$$
f_{\mathrm{beat}} = \abs{444 - 440} = 4\,\mathrm{Hz}.
$$

Successive loud peaks are $1/4 = 0.250\,\mathrm{s}$ apart. The average frequency is

$$
f_{\mathrm{av}} = \frac{440 + 444}{2} = 442\,\mathrm{Hz},
$$

and that is the frequency of the rapid factor $\cos(\omega_{\mathrm{av}} t)$. At $t = 0$ the envelope $\cos(\Delta\omega\, t/2)$ equals $1$, so the forks start loud. The envelope next vanishes when $\abs{\Delta\omega}\, t/2 = \pi/2$. With $\abs{\Delta\omega} = 2\pi\times 4$,

$$
t = \frac{\pi}{\abs{\Delta\omega}} = \frac{1}{2\times 4} = 0.125\,\mathrm{s}.
$$

That first silence is halfway to the next loud peak, as it must be. In one beat period of $0.250\,\mathrm{s}$ the rapid oscillation completes

$$
442\times 0.250 = 110.5
$$

cycles. The half cycle is the sign change of the carrier from one loud peak to the next. The pitch one hears is near $442\,\mathrm{Hz}$, not $4\,\mathrm{Hz}$: four beats per second is a rhythm imposed on that pitch, not a tone in the sub-bass. A piano tuner uses the rhythm. When the beats slow down and stop, the two frequencies have met.
:::
:::

::: quiz
Two pure tones of $440\,\mathrm{Hz}$ and $444\,\mathrm{Hz}$ and equal amplitude sound together. What do you hear?
- [ ] A new pure tone at $4\,\mathrm{Hz}$, and nothing else
- [ ] A new pure tone at $2\,\mathrm{Hz}$, because the envelope cosine oscillates at half the difference
- [x] A tone near $442\,\mathrm{Hz}$ whose loudness rises and falls $4$ times a second
- [ ] A pure tone at $884\,\mathrm{Hz}$, the sum of the two frequencies
::: solution
[[#eq-beat-wave]] is a product, not a single cosine at the difference frequency. The rapid factor sits at the average, $442\,\mathrm{Hz}$. The loudness follows $\abs{\cos(\Delta\omega\, t/2)}$, which peaks $4$ times a second, not twice. The sum $884\,\mathrm{Hz}$ would be a nonlinear mixing product. It is not produced by adding two solutions of [[#eq-wave]]. A listener can tap a foot to the $4\,\mathrm{Hz}$ rhythm, but the pitch of the note is the average.
:::
:::

## Standing waves

Now let the two waves travel in opposite directions, with equal amplitude, equal frequency and equal wavelength. Their sum does not travel. It stands.

::: theorem Standing wave from a counter-propagating pair {#thm-standing}
The sum of two harmonic waves of equal amplitude travelling in opposite directions is

$$
A\cos(kx - \omega t) + A\cos(kx + \omega t) = 2A\cos(kx)\cos(\omega t),
$$ {#eq-standing}

provided $\omega$ and $k$ are the same in both waves. The waveform in space, $\cos(kx)$, does not move. Only the overall scale $\cos(\omega t)$ changes with time.
:::

::: proof
Apply [[#eq-sum]] with $\alpha = kx - \omega t$ and $\beta = kx + \omega t$. The half-sum is $kx$ and the half-difference is $-\omega t$. Cosine is even, so $\cos(-\omega t) = \cos(\omega t)$, and the product is [[#eq-standing]]. The step is algebraic and uses equal amplitudes in an essential way. If the amplitudes differed, a travelling piece would remain: the larger wave would not be fully cancelled by its partner, and the pattern would drift.
:::

The spatial factor $\cos(kx)$ is zero at certain fixed points, for every $t$. Those points never move.

::: definition Nodes and antinodes {#def-node}
A **node** of a standing wave is a point where the displacement is zero at all times. An **antinode** is a point where the amplitude of the oscillation is greatest. For [[#eq-standing]], the nodes are the zeros of $\cos(kx)$ and the antinodes are the extrema of $\cos(kx)$.
:::

The zeros of $\cos(kx)$ lie at

$$
kx = \frac{\pi}{2} + n\pi, \qquad n = 0, \pm 1, \pm 2, \ldots
$$ {#eq-nodes}

so

$$
x_n = \frac{(2n+1)\pi}{2k} = (2n+1)\frac{\lambda}{4},
$$

where $\lambda = 2\pi/k$. Adjacent nodes are separated by $\lambda/2$. Antinodes lie where $\cos(kx) = \pm 1$, that is $kx = n\pi$, halfway between the nodes. At a node the medium is permanently at rest. Halfway from one node to the next, the medium oscillates with amplitude $2A$.

One feature of [[#eq-standing]] is easy to miss. At $x = 0$, $\cos(0) = 1$, so the origin is an antinode, not a node. This particular pair of travelling waves describes a point that is free to move at $x = 0$. A string held fixed at $x = 0$ needs a different relative sign, taken up in the next section. The node formula [[#eq-nodes]] belongs to the cosine pattern written in [[#eq-standing]], not automatically to every standing wave in the chapter.

::: example A standing wave with stated $k$ and $\omega$ {#ex-pair}
Two waves on a long string are

$$
y_1 = 0.0200\cos(3.00\, x - 15.0\, t), \qquad y_2 = 0.0200\cos(3.00\, x + 15.0\, t),
$$

with $y$ and $x$ in metres, $t$ in seconds, $k$ in $\mathrm{rad/m}$ and $\omega$ in $\mathrm{rad/s}$. Write the sum, find the phase speed of each travelling wave, the wavelength, the position of the node closest to the origin on the positive $x$-axis, and the distance between adjacent nodes.
::: solution
The amplitudes, $k$ and $\omega$ match, so [[#eq-standing]] applies:

$$
y = 0.0400\cos(3.00\, x)\cos(15.0\, t)\ \mathrm{m}.
$$

The amplitude of the standing wave, at an antinode, is $0.0400\,\mathrm{m}$, twice either travelling amplitude. Each travelling wave has phase speed

$$
v = \frac{\omega}{k} = \frac{15.0}{3.00} = 5.00\,\mathrm{m/s}.
$$

The wavelength is

$$
\lambda = \frac{2\pi}{k} = \frac{2\pi}{3.00} = 2.094\,\mathrm{m}.
$$

The node condition [[#eq-nodes]] with $n = 0$ and $k = 3.00\,\mathrm{rad/m}$ gives the smallest positive node:

$$
x = \frac{\pi}{2k} = \frac{\pi}{6.00} = 0.5236\,\mathrm{m}.
$$

Adjacent nodes are $\lambda/2$ apart,

$$
\frac{\lambda}{2} = \frac{\pi}{k} = \frac{\pi}{3.00} = 1.047\,\mathrm{m}.
$$

The antinodes are at $x = n\pi/k = n\times 1.047\,\mathrm{m}$, including the origin. A point at $x = 0.5236\,\mathrm{m}$ stays at $y = 0$ for every $t$. A point at the origin oscillates between $-0.0400\,\mathrm{m}$ and $+0.0400\,\mathrm{m}$.
:::
:::

::: widget wave
A: 1
B: 1
k: 2
w: 3
caption: A is the right-going amplitude and B the left-going one. With A = B the crests do not travel and the nodes stay fixed: equal amplitudes make a standing wave. Set B to 0 and the same wave travels. The ratio w/k is the phase speed of each travelling piece, here 3/2 in the figure's units; changing w and k together, at fixed ratio, changes the wavelength without changing that speed.
:::

## Reflection and the fixed string

A wave on a finite string has to satisfy the ends as well as [[#eq-wave]]. The ends decide the sign of the reflected wave and the values of $k$ that fit.

Consider a pulse incident on an end at $x = 0$. The end is a boundary condition for all time, so we imagine a reflected pulse such that the sum obeys the end.

At a **fixed end** the displacement is zero for all time. The reflected pulse must arrive upside down, with the opposite displacement, so that the incident and reflected pulses cancel at the end. In the harmonic case the same statement is a change of sign: if the incident wave contributes $A\cos(-\omega t)$ at $x = 0$, the reflected wave must contribute $-A\cos(\omega t)$ there. Using [[#eq-diff]],

$$
\begin{aligned}
y &= A\cos(kx - \omega t) - A\cos(kx + \omega t) \\
&= 2A\sin(kx)\sin(\omega t).
\end{aligned}
$$ {#eq-fixed-form}

(The half-sum of the angles is $kx$ and the half-difference is $-\omega t$; the minus sign in [[#eq-diff]] together with $\sin(-\omega t) = -\sin(\omega t)$ produces the product of sines.) At $x = 0$, $\sin(0) = 0$, so the end stays put. The inversion is not an extra rule glued on after superposition. It is the choice of reflected wave that makes superposition obey the end.

At a **free end** the transverse force vanishes. For the small-slope string that means the slope vanishes, $\partial y/\partial x = 0$ at the end. The reflected pulse is then upright, not inverted, and the end itself is an antinode. The cosine pattern [[#eq-standing]] is the harmonic version: slope $-2Ak\sin(kx)\cos(\omega t)$ is zero at $x = 0$. A free end does not invert the pulse.

::: example Reflection of a single pulse {#ex-reflect}
A pulse of peak displacement $+2.00\,\mathrm{cm}$ travels towards an end. Describe the reflected peak, and the displacement of the end while the incident and reflected peaks overlap, for a fixed end and for a free end.
::: solution
At a fixed end the reflected peak is inverted, so its displacement is $-2.00\,\mathrm{cm}$. While the two peaks overlap at the end they cancel: the end is held at $0$, which is $2.00 + (-2.00)$. Away from the end, during the overlap, the string carries both shapes at once and the displacement is the sum, point by point. After the reflection only the inverted pulse remains, travelling back.

At a free end the reflected peak is upright, $+2.00\,\mathrm{cm}$. When the two peaks overlap at the end the displacement there is $2.00 + 2.00 = 4.00\,\mathrm{cm}$. The end swings out to twice the incident height and then the upright reflected pulse departs. The doubling is superposition at an antinode, the same factor $2$ that turns $A$ into $2A$ in [[#eq-standing]]. It is not a gain of energy from nowhere: the peak is twice as high only while both pulses are on top of each other, and each travelling pulse separately still has height $2.00\,\mathrm{cm}$.
:::
:::

A string of length $L$ fixed at both $x = 0$ and $x = L$ needs a node at each end. Starting from [[#eq-fixed-form]], $\sin(kx)$ already vanishes at $x = 0$. It vanishes at $x = L$ for every $t$ if and only if $\sin(kL) = 0$, hence $kL = n\pi$ for an integer $n$. The choice $n = 0$ makes $y$ identically zero. Negative $n$ reproduces the same shapes as positive $n$, up to a sign that can be absorbed into the amplitude. The distinct modes are $n = 1, 2, 3, \ldots$.

The time factor in [[#eq-fixed-form]] is the special case of a sine in time. Shifting the origin of time, or superposing the cosine-in-time partner allowed by linearity, gives two constants per mode. The spatial factor is what the ends fix.

::: theorem Normal modes of a string fixed at both ends {#thm-modes}
On a uniform string of length $L$ fixed at $x = 0$ and at $x = L$, with wave speed $v$, every normal mode may be written

$$
y_n(x,t) = \sin\left(\frac{n\pi x}{L}\right)\bigl(A_n\cos\omega_n t + B_n\sin\omega_n t\bigr),
$$ {#eq-mode}

where $n = 1, 2, 3, \ldots$, the wave number and angular frequency are

$$
k_n = \frac{n\pi}{L}, \qquad \omega_n = v k_n = \frac{n\pi v}{L},
$$

and the wavelength and frequency are

$$
\lambda_n = \frac{2L}{n}, \qquad f_n = \frac{n v}{2L}.
$$ {#eq-fn}

The integer $n$ is the number of half-wavelengths on the string. A general motion obeying the ends is a sum of these modes, with constants $A_n$ and $B_n$ fixed by the initial displacement and velocity.
:::

::: proof
The function $\sin(k x)\,(A\cos\omega t + B\sin\omega t)$ satisfies [[#eq-wave]] whenever $\omega = v k$, because each of $\sin(kx)\cos(\omega t)$ and $\sin(kx)\sin(\omega t)$ is a sum of opposite travelling waves, as in the derivation of [[#eq-fixed-form]], or by substituting directly into [[#eq-wave]]. The condition $y(0, t) = 0$ is already built into $\sin(0)$. The condition $y(L, t) = 0$ for all $t$ forces $\sin(kL) = 0$, so $kL = n\pi$ with $n$ a non-zero integer. Taking $n > 0$ and $\omega_n = v k_n > 0$ gives the list above. Then

$$
\lambda_n = \frac{2\pi}{k_n} = \frac{2L}{n}, \qquad f_n = \frac{\omega_n}{2\pi} = \frac{n v}{2L}.
$$

The mode $n$ has nodes at $x = 0, L/n, 2L/n, \ldots, L$: $n + 1$ nodes counting the ends, and $n - 1$ interior nodes. A general motion is a sum of these modes. The coefficients are the Fourier sine coefficients of the initial data; completeness is not re-proved here. What the boundary-value argument does prove is that a single harmonic motion fitting both ends must be one of these $n$. A frequency such as $1.5\, v/(2L)$ cannot keep both ends fixed.
:::

The fundamental is $n = 1$: half a wavelength on the string, $\lambda_1 = 2L$, no interior node, frequency $f_1 = v/(2L)$. The second harmonic, $n = 2$, has $\lambda_2 = L$ and one interior node, at the midpoint. Musicians call $f_2$ the octave of $f_1$. Because $f_n = n f_1$, the whole set is an integer harmonic series. That is special to the uniform string with two fixed ends. It is not a property of every vibrating object.

::: example The modes of a string of length $0.800\,\mathrm{m}$ {#ex-string}
A uniform string is fixed at $x = 0$ and at $x = L = 0.800\,\mathrm{m}$. Waves travel on it at $v = 240\,\mathrm{m/s}$. Find the fundamental frequency and the second harmonic, the corresponding wavelengths, and the positions of the nodes and antinodes of the second harmonic.
::: solution
[[#eq-fn]] with $n = 1$ gives

$$
f_1 = \frac{v}{2L} = \frac{240}{2\times 0.800} = \frac{240}{1.60} = 150\,\mathrm{Hz}.
$$

The second harmonic is $n = 2$,

$$
f_2 = 2 f_1 = 300\,\mathrm{Hz}.
$$

(The third, for later use, is $f_3 = 450\,\mathrm{Hz}$.) The wavelengths are

$$
\lambda_1 = 2L = 1.60\,\mathrm{m}, \qquad \lambda_2 = L = 0.800\,\mathrm{m}.
$$

For $n = 2$ the nodes fall at $x = 0$, $x = L/2 = 0.400\,\mathrm{m}$ and $x = L = 0.800\,\mathrm{m}$. The antinodes are midway between consecutive nodes, at $x = 0.200\,\mathrm{m}$ and $x = 0.600\,\mathrm{m}$. A finger placed lightly at $x = 0.400\,\mathrm{m}$ forces a node there. The fundamental cannot live with that extra node, so it is silenced, while the second harmonic, which already has a node at the midpoint, survives. That is the ordinary touch-harmonic on a stringed instrument. The round trip from one end to the other and back takes $2L/v = 1.60/240 = 6.67\times 10^{-3}\,\mathrm{s}$, and the reciprocal of that time is $150\,\mathrm{Hz}$, the fundamental: one "there and back" per cycle is $\lambda_1 = 2L$.
:::
:::

## Coherent addition, and energy that does not travel

Two oscillations of the *same* frequency add as amplitudes, with a phase. Let

$$
y = A_1\cos(\omega t) + A_2\cos(\omega t + \phi).
$$

Expanding the second cosine and collecting $\cos(\omega t)$ and $\sin(\omega t)$ gives a single oscillation at the same $\omega$, with amplitude $A$ fixed by

$$
A^2 = A_1^2 + A_2^2 + 2 A_1 A_2\cos\phi.
$$ {#eq-amp}

The cross term is the interference term. It is positive when the waves are in phase and negative when they are out of phase. For equal amplitudes the identity [[#eq-sum]] is shorter: $A_1 = A_2 = A_0$ gives $A = 2 A_0\abs{\cos(\phi/2)}$.

Intensity, for a travelling harmonic wave of fixed frequency on a given medium, is proportional to the square of the amplitude. The average power of a harmonic wave on a string, $\tfrac12\mu v\omega^2 A^2$ from [[oscillations/travelling-waves]], is the standard instance. Squaring [[#eq-amp]] is therefore not the same operation as adding the two intensities. The cross term survives whenever $\phi$ is steady.

Waves with a steady phase difference are called **coherent**. Two forks driven from one electrical source, or two parts of a single wavefront, are coherent. Waves whose relative phase wanders unpredictably — two independent instruments, two unrelated noise sources — are **incoherent**. Over a long average, $\cos\phi$ spends as much time positive as negative, the cross term drops out, and the intensities add. Adding intensities is the incoherent rule. It is the wrong rule for two coherent waves.

::: example Equal amplitudes and a phase of $\pi/3$ {#ex-phase}
Two coherent waves of equal amplitude $0.0300\,\mathrm{m}$ and equal frequency differ in phase by $\pi/3$. Find the amplitude of the sum. Compare the intensity of the sum with the intensity of one wave alone, and with the intensity one would get by adding intensities.
::: solution
With equal amplitudes, $A = 2 A_0\abs{\cos(\phi/2)}$ and $\phi/2 = \pi/6$, so $\cos(\phi/2) = \sqrt{3}/2$ and

$$
A = 2\times 0.0300\times\frac{\sqrt{3}}{2} = 0.0300\sqrt{3} = 0.0520\,\mathrm{m}.
$$

The intensity scales as $A^2$, so the ratio to a single wave is

$$
\left(\frac{A}{A_0}\right)^2 = 3.
$$

The sum is three times as intense as one wave, not twice. Adding the intensities would have given a factor $2$ and no dependence on $\phi$. That answer is what an incoherent pair would do, after averaging. Here $\phi$ is fixed at $\pi/3$, the cross term $2 A_0^2\cos(\pi/3) = A_0^2$ is present, and

$$
A^2 = A_0^2 + A_0^2 + A_0^2 = 3 A_0^2
$$

agrees. If the phase had been $\pi$, the same formula would have given $A = 0$: complete destructive interference, which adding intensities cannot produce.
:::
:::

A standing wave is the coherent sum of two opposite travelling waves. Its energy does not flow along the string on average.

::: proposition No energy crosses a node {#prop-node-energy}
At a node of a standing wave the transverse velocity is zero at every instant, so the power delivered across that point is zero. Energy in one loop, between two consecutive nodes, stays in that loop.
:::

::: proof
By [[#def-node]] the displacement at a node is identically zero, so its time derivative, the transverse velocity, is identically zero. Instantaneous power across a point of the string is the transverse force at that point times the transverse velocity of that point. The product is zero when the velocity is zero, whatever the force is doing. Hence no energy flows past the node, in either direction, at any time. Each segment between nodes exchanges kinetic and potential energy internally as it swings, and the total energy of a free undamped mode is constant, but the exchange does not cross the node. This is why a standing wave is not a carrier of net power, while a single travelling wave is. The average-power formula of [[oscillations/travelling-waves]] must not be applied to [[#eq-standing]] as if the standing wave were a single travelling wave of amplitude $2A$.
:::

::: warning Beats are an envelope, and intensities add only when the phase wanders
The linear theory does not contain a source at frequency $\abs{f_1 - f_2}$. That number is how often the envelope of [[#eq-beat-wave]] reaches a loud peak. Reporting a new spectral line at the beat frequency, or at half of it, invents a tone the sum does not have. The second mistake is to add intensities of coherent waves. Intensities add for incoherent waves, after the cross term has averaged away. Two coherent waves are added as displacements, and the intensity is computed from the total amplitude. Depending on $\phi$, the result may be anything from complete cancellation to $(A_1 + A_2)^2$.
:::

::: remark The cosine pattern is not the fixed string
[[#eq-standing]] has an antinode at $x = 0$. The fixed-string modes of [[#thm-modes]] have a node there, and the spatial factor is a sine, as in [[#eq-fixed-form]]. A cosine pattern on a string fixed at the origin does not meet the end condition.
:::

::: history Bernoulli's modes, and the argument with d'Alembert and Euler
In 1753 Daniel Bernoulli argued, from the way a musical string sounds several harmonics at once, that its general motion is a superposition of normal modes. The wave equation itself was already in hand: d'Alembert had derived it in 1747 and written the general solution as a right-going profile plus a left-going profile. Euler, in the same dispute, was willing to allow initial shapes with corners, of the kind a pluck produces. d'Alembert and Euler both resisted Bernoulli's claim that every such shape is a sum of smooth sinusoidal modes. The objection was mathematical, not musical: the analysis then available did not show that the sines were complete, or that the series could represent a corner.

Bernoulli did not settle that question. Fourier's *Théorie analytique de la chaleur* (1822) shows how to compute the sine coefficients, and convergence proofs came later still. Once a motion is expanded in the modes of [[#thm-modes]], each coefficient evolves at its own frequency, and the heard pitch is organised by $f_1, 2f_1, 3f_1, \ldots$.
:::

## Where this leads

[[oscillations/sound]] takes the same standing-wave arithmetic into air. A closed end of a pipe is a displacement node, like the fixed end of the string, and an open end is a displacement antinode, like the free end. Beats reappear as the throb of two nearly equal notes. The coherent sum [[#eq-amp]] is also the starting point of interference in [[optics]]: amplitudes add when the phase is steady, and the intensity is the square of the total. The word returns in [[quantum-1]] for a different linear equation; the algebra of adding solutions is similar, and the meaning of the thing added is not.

::: summary
- [[#eq-wave]] is linear, so a sum of solutions with the same $v$ is a solution. Superposition fails when the amplitude is large enough to make the equation nonlinear.
- Two equal tones give [[#eq-beat-wave]]. The beat frequency is $\abs{f_1 - f_2}$, the rate of loud peaks of the absolute envelope, not a new spectral line and not half the difference.
- Equal opposite travelling waves sum to [[#eq-standing]]. Nodes lie where $kx = \pi/2 + n\pi$, spaced by $\lambda/2$. That cosine pattern has an antinode at $x = 0$.
- A fixed end inverts the reflected pulse; a free end does not. Inversion is the choice that keeps the end at rest.
- A string fixed at $0$ and $L$ oscillates in modes $\lambda_n = 2L/n$ and $f_n = nv/(2L)$, with spatial factor $\sin(n\pi x/L)$. The set $n = 1, 2, 3, \ldots$ is a complete harmonic series.
- Coherent waves add as displacements, and the cross term $2 A_1 A_2\cos\phi$ remains. Incoherent waves, phase-averaged, add as intensities.
- No energy flows across a node. A standing wave does not transport net power along the medium.
:::

## Exercises {#exercises}

::: exercise Beat frequency of two forks {level=1 check="4"}
Two forks sound at $512\,\mathrm{Hz}$ and $516\,\mathrm{Hz}$ with equal amplitude. Find the beat frequency in hertz.
::: solution
[[#eq-beat]] depends only on the absolute difference:

$$
f_{\mathrm{beat}} = \abs{516 - 512} = 4\,\mathrm{Hz}.
$$

The average pitch is $514\,\mathrm{Hz}$, and the loudness peaks four times a second. The answer is not $2\,\mathrm{Hz}$. That half-difference is the frequency of the signed cosine $\cos(\Delta\omega\, t/2)$ before the absolute value is taken.
:::
:::

::: exercise Fundamental of a shorter string {level=1 check="250"}
A string of length $0.650\,\mathrm{m}$ is fixed at both ends. The wave speed is $325\,\mathrm{m/s}$. Find the fundamental frequency in hertz.
::: solution
The fundamental is [[#eq-fn]] with $n = 1$:

$$
f_1 = \frac{v}{2L} = \frac{325}{2\times 0.650} = \frac{325}{1.30} = 250\,\mathrm{Hz}.
$$

The wavelength of this mode is $2L = 1.30\,\mathrm{m}$, and $f_1 = v/\lambda_1$ recovers $325/1.30 = 250\,\mathrm{Hz}$. The second harmonic, not asked for, would be $500\,\mathrm{Hz}$.
:::
:::

::: exercise Wavelength of the third harmonic {level=1 check="1.6/3"}
A string is fixed at both ends and has length $L = 0.800\,\mathrm{m}$. Find the wavelength of the third harmonic, in metres.
::: solution
[[#eq-fn]] gives $\lambda_n = 2L/n$. For $n = 3$,

$$
\lambda_3 = \frac{2\times 0.800}{3} = \frac{1.60}{3} = 0.533\,\mathrm{m}.
$$

Three half-wavelengths fit on the string: $3\times(\lambda_3/2) = 3\times 0.800/3 = 0.800\,\mathrm{m} = L$. The frequency is three times the fundamental, but the question asked for the wavelength, which is a third of $\lambda_1 = 1.60\,\mathrm{m}$, not three times it. Raising $n$ shortens the wavelength.
:::
:::

::: exercise The mode with two interior nodes {level=2 check="450"}
The string of [[#ex-string]] has $L = 0.800\,\mathrm{m}$ and $v = 240\,\mathrm{m/s}$. Which harmonic has exactly two interior nodes, and what is its frequency in hertz?
::: solution
Mode $n$ has $n - 1$ interior nodes. Two interior nodes means $n - 1 = 2$, so $n = 3$. Counting the ends, this mode has nodes at $0$, $L/3$, $2L/3$ and $L$, four nodes in all, of which the middle two are interior. The frequency is

$$
f_3 = \frac{3 v}{2L} = 3\times 150 = 450\,\mathrm{Hz},
$$

using $f_1 = 150\,\mathrm{Hz}$ from [[#ex-string]], or directly $3\times 240/(1.60) = 720/1.60 = 450\,\mathrm{Hz}$. The interior nodes are at $0.800/3 = 0.267\,\mathrm{m}$ and $0.533\,\mathrm{m}$. A touch at either of those points leaves this mode free to sound and suppresses modes that do not have a node there.
:::
:::

::: exercise Resultant of two phased oscillations {level=2 check="0.03*sqrt(3)"}
Two coherent oscillations have equal amplitude $0.0300\,\mathrm{m}$, the same frequency, and a phase difference of $\pi/3$. Find the amplitude of the resultant, in metres.
::: solution
Equal amplitudes reduce [[#eq-amp]] to $A = 2 A_0\abs{\cos(\phi/2)}$. With $\phi = \pi/3$,

$$
A = 2\times 0.0300\times\cos\frac{\pi}{6} = 0.0600\times\frac{\sqrt{3}}{2} = 0.0300\sqrt{3} = 0.0520\,\mathrm{m}.
$$

The same number follows from $A^2 = 2 A_0^2(1 + \cos\phi) = 2 A_0^2(1 + 1/2) = 3 A_0^2$. Adding the amplitudes to get $0.0600\,\mathrm{m}$ would be right only for $\phi = 0$. Adding them in quadrature to get $0.0300\sqrt{2}\,\mathrm{m}$ would be right only for $\phi = \pi/2$. The phase decides.
:::
:::

::: exercise Raising the pitch by raising the tension {level=2 check="(6/5)^2"}
A string fixed at both ends has fundamental frequency $150\,\mathrm{Hz}$. The length and the linear density stay fixed, and the tension is changed. By what numerical factor must the tension be multiplied so that the fundamental becomes $180\,\mathrm{Hz}$?
::: solution
The wave speed on a string satisfies $v = \sqrt{\tau/\mu}$, as derived in [[oscillations/travelling-waves]], and $f_1 = v/(2L)$. With $L$ and $\mu$ fixed, $f_1$ is proportional to $\sqrt{\tau}$. Therefore

$$
\frac{\tau_2}{\tau_1} = \left(\frac{f_2}{f_1}\right)^2 = \left(\frac{180}{150}\right)^2 = \left(\frac{6}{5}\right)^2 = 1.44.
$$

The tension must rise by a factor $1.44$, not by $180/150 = 1.20$. The square is the step that gets omitted. Doubling the tension, for comparison, would multiply the frequency by $\sqrt{2}$, not by $2$. The hypothesis that $\mu$ and $L$ stay fixed matters: stretching a wire far enough to raise the tension also changes its length and its mass per length, and the pure square-root rule then ceases to be the whole story. The exercise does not ask for that correction.
:::
:::

::: exercise Why the beat rate is not half the difference {level=3}
Prove that if $y = A\cos(\omega_1 t) + A\cos(\omega_2 t)$ with $A > 0$, the quantity $y$ is loud — in the sense that the absolute value of the slow factor is at a maximum — exactly $\abs{f_1 - f_2}$ times per unit time, and not half that often. State where the factor of two comes from. Illustrate the two candidate rates with $f_1 = 440\,\mathrm{Hz}$ and $f_2 = 444\,\mathrm{Hz}$.
::: hint
Write the product form first. Then compare the period of $\cos(\Delta\omega\, t/2)$ with the period of its absolute value.
:::
::: solution
The sum-to-product identity [[#eq-sum]] gives [[#eq-beat-wave]],

$$
y(t) = 2A\cos\left(\frac{\Delta\omega}{2}\, t\right)\cos(\omega_{\mathrm{av}} t),
$$

with $\Delta\omega = \omega_1 - \omega_2$ and $\omega_{\mathrm{av}} = (\omega_1 + \omega_2)/2$. The rapid factor is the pitch. The slow factor $E(t) = \cos(\Delta\omega\, t/2)$ multiplies the whole rapid oscillation, so the instantaneous amplitude scale is $2A\abs{E(t)}$. Loud peaks occur at the maxima of $\abs{E}$, not merely at the maxima of $E$.

Let $\Omega = \abs{\Delta\omega}/2$, so $E(t) = \cos(\Omega t)$ up to a sign that depends on which frequency is larger and does not affect absolute values. The function $\cos(\Omega t)$ has period $2\pi/\Omega$: its positive peaks are that far apart, and the frequency of those positive peaks is $\Omega/(2\pi) = \abs{f_1 - f_2}/2$. Between two positive peaks there is a negative peak, at which $\abs{E}$ is again $1$. The function $\abs{\cos(\Omega t)}$ therefore has period $\pi/\Omega$, half as long. Its frequency is

$$
\frac{\Omega}{\pi} = \frac{\abs{\Delta\omega}}{2\pi} = \abs{f_1 - f_2}.
$$

The factor of two is the two peaks, one positive and one negative, in each full cycle of the signed cosine. Intensity depends on the square of the displacement scale and is equally large at both.

For $440\,\mathrm{Hz}$ and $444\,\mathrm{Hz}$ the half-difference is $2\,\mathrm{Hz}$ and the beat frequency is $4\,\mathrm{Hz}$. Loud peaks are $0.250\,\mathrm{s}$ apart, not $0.500\,\mathrm{s}$ apart. A listener counting throbs counts four per second.
:::
:::

::: exercise From a fixed end to the allowed wavelengths {level=3}
A right-going harmonic wave $A\cos(kx - \omega t)$ reflects from a fixed end at $x = 0$. Take the reflected wave to be $-A\cos(kx + \omega t)$, with the same $k$ and the same $\omega = vk$. Show that the sum vanishes at $x = 0$ for every $t$, rewrite the sum as a product, and then impose a second fixed end at $x = L$. Conclude that the allowed wavelengths are $2L/n$ for positive integers $n$, and write the corresponding frequencies.
::: hint
Use [[#eq-diff]] for the product form. The second end has to be at rest for every $t$, not merely at one instant, so the spatial factor itself must vanish at $x = L$.
:::
::: solution
At $x = 0$ the sum is

$$
A\cos(-\omega t) - A\cos(\omega t) = A\cos(\omega t) - A\cos(\omega t) = 0,
$$

for every $t$. The end is a node. For general $x$, [[#eq-diff]] with $\alpha = kx - \omega t$ and $\beta = kx + \omega t$ gives

$$
\cos\alpha - \cos\beta = -2\sin(kx)\sin(-\omega t) = 2\sin(kx)\sin(\omega t),
$$

so

$$
y = 2A\sin(kx)\sin(\omega t).
$$

(The same spatial conclusion holds if a cosine in time is used instead: any time factor multiplies $\sin(kx)$.) Now impose $y(L, t) = 0$ for all $t$. The time factor $\sin(\omega t)$ is not always zero, and $A$ is not zero, so $\sin(kL) = 0$. Hence $kL = n\pi$ for a positive integer $n$, the negative integers repeating the same modes. Then

$$
\lambda = \frac{2\pi}{k} = \frac{2L}{n}, \qquad f = \frac{v}{\lambda} = \frac{n v}{2L},
$$

which is [[#eq-fn]]. The step that would be wrong is to set the displacement to zero at $x = L$ at a single moment, by choosing a special $t$, and to call that a boundary condition. A fixed end is fixed at every moment, so the spatial factor carries the condition, and $k$ is quantised.
:::
:::
