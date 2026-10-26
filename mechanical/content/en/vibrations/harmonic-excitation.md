Harmonic excitation is the reference case of dynamics: every periodic force decomposes into harmonics by Fourier's theorem, every random excitation is a sum of narrowband ones, and every measurement of a structure's behaviour is done with a sinusoid. Learn the response to one frequency and you have learned the response to all of them, because the answer is a single curve — the **magnification factor** against frequency ratio — that every engineer should be able to sketch from memory.

That curve has one feature that dominates engineering practice: at resonance the amplitude is $1 / \left( 2 \zeta \right)$ times the static deflection, so a structure at one per cent damping responds **fifty times** more to a resonant force than the same force applied steadily. Everything else in this lesson — the phase reversal above resonance, the isolation region, the behaviour of a rotating unbalance, the design of a vibrometer — is a consequence of reading that curve carefully.

::: definition Forced response and the magnification factor {#def-magnification}
For $m \ddot{x} + c \dot{x} + k x = F_0 \sin \omega t$ the steady-state response is $x = X \sin \left( \omega t - \phi \right)$ with
$$
\frac{X}{X_{\text{st}}} = M (r) = \frac{1}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}},
\qquad
\tan \phi = \frac{2 \zeta r}{1 - r^{2}},
\qquad r = \frac{\omega}{\omega_n},
$$
where $X_{\text{st}} = F_0 / k$ is the static deflection under the force amplitude. The three asymptotes are
$$
r \ll 1 :\ M \to 1 \quad \text{(spring controls)} ; \qquad
r = 1 :\ M = \frac{1}{2 \zeta} ; \qquad
r \gg 1 :\ M \to \frac{1}{r^{2}} \quad \text{(mass controls)} .
$$
The response **peak** is at $r = \sqrt{1 - 2 \zeta^{2}}$, slightly below resonance, and the phase passes through exactly $90^{\circ}$ at $r = 1$ whatever the damping.
:::

::: proof The steady-state amplitude {#proof-magnification}
Seek a particular solution $x = X \sin \left( \omega t - \phi \right)$. Substituting,
$$
m \left( - \omega^{2} X \sin \psi \right)
+ c \omega X \cos \psi
+ k X \sin \psi
= F_0 \sin \left( \psi + \phi \right)
= F_0 \left( \sin \psi \cos \phi + \cos \psi \sin \phi \right)
$$
with $\psi = \omega t - \phi$. Equating the coefficients of $\sin \psi$ and $\cos \psi$,
$$
\left( k - m \omega^{2} \right) X = F_0 \cos \phi, \qquad
c \omega X = F_0 \sin \phi .
$$
Squaring and adding to eliminate $\phi$,
$$
X^{2} \left[ \left( k - m \omega^{2} \right)^{2} + c^{2} \omega^{2} \right] = F_0^{2} .
$$
Dividing through by $k^{2}$ and using $\omega_n^{2} = k / m$, $2 \zeta = c / \sqrt{k m}$,
$$
X = \frac{F_0 / k}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} .
$$
Dividing the two equations gives $\tan \phi = c \omega / \left( k - m \omega^{2} \right) = 2 \zeta r / \left( 1 - r^{2} \right)$, and at $r = 1$ the denominator of the tangent vanishes so $\phi = 90^{\circ}$ exactly. $\checkmark$

*Note.* The $90^{\circ}$ phase is the practical definition of resonance and the only one that works when the damping is large enough to hide the peak: at $\phi = 90^{\circ}$ the force is exactly in phase with the **velocity**, so it does maximum work per cycle, and this remains true even when the amplitude peak has been smeared away by a heavy damper or by a second nearby mode.
:::

::: theorem Half-power bandwidth {#thm-half-power}
The two frequencies at which the response falls to $1 / \sqrt{2}$ of its peak value — the **half-power points**, where the stored energy is half — bracket the resonance with a width proportional to the damping:
$$
\zeta = \frac{\omega_2 - \omega_1}{2 \omega_n} \approx \frac{\omega_2 - \omega_1}{\omega_1 + \omega_2},
$$
the second form being the one used in the laboratory because it needs no knowledge of the natural frequency, only of the two measured half-power points.
:::

::: proof The half-power bandwidth {#proof-half-power}
The half-power points satisfy $M = M_{\max} / \sqrt{2}$, and for light damping $M_{\max} \approx 1 / \left( 2 \zeta \right)$, so
$$
\frac{1}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}}
= \frac{1}{2 \zeta \sqrt{2}}
$$
The exact condition is $\left( 1 - r^{2} \right)^{2} + 4 \zeta^{2} r^{2} = 1 / \left( 4 \zeta^{2} \right)$; writing $u = r^{2}$,
$$
u^{2} + \left( 4 \zeta^{2} - 2 \right) u + 1 - \frac{1}{4 \zeta^{2}} = 0
\quad\Longrightarrow\quad
u = 1 - 2 \zeta^{2} \pm 2 \zeta \sqrt{1 + \zeta^{2}} .
$$
For $\zeta \ll 1$, $\sqrt{u} \approx 1 \pm \zeta$, so $r_2 - r_1 \approx 2 \zeta$ and
$$
\zeta \approx \frac{r_2 - r_1}{2} = \frac{\omega_2 - \omega_1}{2 \omega_n} .
$$
Retaining the exact roots gives $\zeta = \left( r_2 - r_1 \right) / 2$ with $r_{1,2} = \sqrt{1 - 2 \zeta^{2} \mp 2 \zeta \sqrt{1 + \zeta^{2}}}$, which inverts numerically without approximation. $\checkmark$

*Note.* The name comes from the fact that the stored energy is proportional to the **square** of the amplitude, so half the amplitude-squared — half the power at resonance — occurs at $1 / \sqrt{2} = 0.707$ of the peak amplitude. The method is the standard way of measuring damping on a shaker, and it is preferred to the logarithmic decrement for lightly damped structures because it does not require a long free-decay record.
:::

::: example Machine on resonance {#ex-machine-resonance}
A $100\ \mathrm{kg}$ machine on mounts of total stiffness $200\ \mathrm{kN / m}$ is subjected to a harmonic force of $500\ \mathrm{N}$ amplitude. The damping ratio is $0.05$. Find the amplitude at resonance, at one and a half times resonance, and the force transmitted at resonance.
::: solution
$$
\omega_n = \sqrt{\frac{200\,000}{100}} = 44.7\ \mathrm{rad / s} = 7.12\ \mathrm{Hz},
\qquad X_{\text{st}} = \frac{500}{200\,000} = 2.5\ \mathrm{mm},
$$
$$
r = 1 : \quad X = \frac{2.5}{2 \times 0.05} = 25.0\ \mathrm{mm},
\qquad
r = 1.5 : \quad M = \frac{1}{\sqrt{1.25^{2} + 0.15^{2}}} = 0.794, \quad X = 1.99\ \mathrm{mm}.
$$
**Transmitted force at resonance.** The spring and damper forces are $90^{\circ}$ out of phase and add in quadrature,
$$
F_T = X \sqrt{k^{2} + \left( c \omega \right)^{2}}
= 0.025 \sqrt{200\,000^{2} + \left( 447.2 \times 44.7 \right)^{2}}
= 5025\ \mathrm{N},
$$
ten times the applied force, as the magnification factor requires.

*Check.* At resonance the transmitted force must equal the applied force times $1 / \left( 2 \zeta \right) = 10$: $500 \times 10 = 5000\ \mathrm{N}$ $\checkmark$

*Sanity.* Twenty-five millimetres is a visible, violent motion from a force of half a kilonewton — about the weight of a person. That is what resonance means, and it is why the run-up of a machine through its resonance is the moment of highest risk: the machine is designed for the operating speed, which is chosen to be well away from $7.12\ \mathrm{Hz}$, but it must **pass through** $7.12\ \mathrm{Hz}$ on the way, and a $25\ \mathrm{mm}$ deflection may exceed the travel of the mounts, the clearance to pipework or the flatness of a coupled shaft. The standard remedies are a run-up rate fast enough that the amplitude does not build up to its steady value, or a **sufficient** damping that reduces the peak, or a temporary restraint.
:::
:::

::: widget plot
f: 1/sqrt((1-x^2)^2+(2*0.05*x)^2)
x: 0, 3
y: 0, 10
labels: \text{magnification factor } M
caption: Magnification factor against frequency ratio for a damping ratio of $0.05$, showing the peak of $1 / \left( 2 \zeta \right) = 10$ just below $r = 1$ and the $1 / r^{2}$ tail beyond it. Two features are worth memorising from this curve. The first is how **narrow** the danger is: at twice the natural frequency the response is a third of the static deflection, so a machine running at three times its natural frequency is essentially isolated, and the whole design problem is the passage through the peak. The second is that the curve for $r > 1$ is nearly the same for every damping value — the damping barely changes the isolation, which is why an isolation design is a frequency-ratio design and not a damping design.
:::

## Rotating unbalance

::: proposition Rotating unbalance {#prop-unbalance-response}
For a machine of total mass $m$ carrying an eccentric mass $m_e$ at radius $e$, the excitation is $m_e e \omega^{2}$ and the amplitude is
$$
\frac{X}{\left( m_e e / m \right)} = \frac{r^{2}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} ,
$$
which tends to the **constant** value $m_e e / m$ at high speed, independent of stiffness and of speed. The peak at resonance is
$$
X_{\text{res}} \approx \frac{m_e e}{m} \times \frac{1}{2 \zeta \sqrt{1 - \zeta^{2}}} .
$$
Two consequences dominate rotating-machinery practice: above the critical speed the vibration is set by the unbalance and **not** by the machine's stiffness, so stiffening the machine does nothing; and the vibration of a machine running well above its critical speed is a direct measure of its residual unbalance.
:::

::: example Balancing a rotor {#ex-rotor-response}
A $200\ \mathrm{kg}$ pump rotor has a residual unbalance of $0.02\ \mathrm{kg\,m}$, runs at $1500\ \mathrm{rpm}$, and sits on a support of stiffness $500\ \mathrm{kN / m}$ with $\zeta = 0.1$. Find the vibration amplitude at operating speed and at resonance, and the same amplitude at $3000\ \mathrm{rpm}$.
::: solution
$$
\omega_n = \sqrt{\frac{500\,000}{200}} = 50\ \mathrm{rad / s} = 477\ \mathrm{rpm},
\qquad \omega = 157.1\ \mathrm{rad / s}, \qquad r = 3.142,
$$
$$
\frac{m_e e}{m} = \frac{0.02}{200} = 1.0 \times 10^{- 4}\ \mathrm{m} = 0.10\ \mathrm{mm},
$$
$$
\frac{X}{m_e e / m} = \frac{3.142^{2}}{\sqrt{\left( 1 - 9.87 \right)^{2} + \left( 0.628 \right)^{2}}}
= \frac{9.87}{8.90} = 1.109,
\qquad X = 0.111\ \mathrm{mm}.
$$
**At resonance.** $X = 0.10 / \left( 2 \times 0.1 \right) = 0.50\ \mathrm{mm}$.
**At $3000\ \mathrm{rpm}$** $\left( r = 6.28 \right)$: $X / \left( m_e e / m \right) = 1.025$, so $X = 0.103\ \mathrm{mm}$.

*Check.* The two high-speed answers, $0.111$ and $0.103\ \mathrm{mm}$, are both within ten per cent of the asymptote $m_e e / m = 0.10\ \mathrm{mm}$ $\checkmark$

*Sanity.* Doubling the speed from $1500$ to $3000\ \mathrm{rpm}$ barely changes the vibration, which is the signature of a machine running well above its critical speed and the reason a vibration spectrum of such a machine is a **balance certificate**: the amplitude itself is the mass-centre eccentricity $m_e e / m$, and multiplied by the mass it gives the residual unbalance directly. It is also why a machine whose running speed is above its first critical must be taken through that critical **quickly** at start-up, and why the amplitude at resonance — half a millimetre here, five times the running value — is the number that decides whether the machine can be started at all. The $477\ \mathrm{rpm}$ critical of a $200\ \mathrm{kg}$ rotor on $500\ \mathrm{kN / m}$ is low; real pump supports are much stiffer, and the design aim is to put the first critical at least twenty-five per cent above the maximum continuous speed.
:::
:::

::: example Instrument on a vibrating floor {#ex-base-excitation}
A $20\ \mathrm{kg}$ instrument with a mount natural frequency of $8\ \mathrm{Hz}$ and $\zeta = 0.05$ sits on a floor vibrating at $25\ \mathrm{Hz}$ with an amplitude of $0.2\ \mathrm{mm}$. Find the amplitude of the instrument relative to the ground, and the amplitude if the mount is softened to $2\ \mathrm{Hz}$.
::: solution
For **base** excitation the transmissibility is
$$
\frac{X}{Y} = \sqrt{\frac{1 + \left( 2 \zeta r \right)^{2}}{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} .
$$
**At $8\ \mathrm{Hz}$.** $r = 25 / 8 = 3.125$,
$$
\frac{X}{Y} = \frac{\sqrt{1 + 0.0977}}{\sqrt{76.83 + 0.0977}} = \frac{1.048}{8.77} = 0.119,
\qquad X = 0.024\ \mathrm{mm}.
$$
**At $2\ \mathrm{Hz}$.** $r = 12.5$, $X / Y = 0.0103$, so $X = 0.0021\ \mathrm{mm}$ — an improvement of about twelve times for a mount one quarter the frequency.
**But check the resonance.** If the floor also vibrates at $8\ \mathrm{Hz}$, then at $r = 1$,
$$
\frac{X}{Y} = \frac{\sqrt{1 + 0.01}}{0.1} = 10.0,
$$
and the same mount **amplifies** a $0.02\ \mathrm{mm}$ component at $8\ \mathrm{Hz}$ into $0.2\ \mathrm{mm}$ at the instrument.

*Sanity.* The soft mount is unambiguously better at $25\ \mathrm{Hz}$ and unambiguously dangerous if the floor has energy near $2\ \mathrm{Hz}$ — which floors do, since a building floor is typically $4$ to $8\ \mathrm{Hz}$ and its supporting structure and any nearby rotating plant can easily produce a $2\ \mathrm{Hz}$ component. This is why an isolation design is never done from the excitation amplitude alone: the **spectrum** of the floor must be measured, and the mount's natural frequency placed in a gap in it. The $1 / r^{2}$ asymptote also explains why precision laboratories put their optical tables on $1\ \mathrm{Hz}$ or lower pendulum isolators, and why such tables are useless next to a lift shaft or a reciprocating compressor.
:::
:::

## Vibration measurement

::: example Vibrometer and accelerometer {#ex-seismic-instrument}
A seismic instrument has a $0.5\ \mathrm{kg}$ seismic mass, a stiffness of $200\ \mathrm{N / m}$ and $\zeta = 0.7$. Find the frequency above which it reads displacement correctly, and the same instrument's usefulness as an accelerometer at $100\ \mathrm{Hz}$ natural frequency.
::: solution
**As a vibrometer.** The relative motion of the mass and the case is
$$
\frac{Z}{Y} = \frac{r^{2}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} \to 1
\quad \text{as } r \to \infty,
$$
with $\omega_n = \sqrt{200 / 0.5} = 20\ \mathrm{rad / s} = 3.18\ \mathrm{Hz}$. At $40\ \mathrm{Hz}$, $r = 12.57$ and
$$
\frac{Z}{Y} = \frac{158.0}{\sqrt{157.0^{2} + 17.6^{2}}} = 1.0001 ,
$$
so the instrument reads base displacement to $0.01$ per cent. The practical lower limit, at one per cent error, is about $8\ \mathrm{Hz}$ — two and a half times the natural frequency.
**As an accelerometer.** With $f_n = 100\ \mathrm{Hz}$ and $\zeta = 0.7$, at $20\ \mathrm{Hz}$ ($r = 0.2$) the ratio $Z / Y$ is
$$
\frac{r^{2}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}}
= \frac{0.0400}{\sqrt{0.9216 + 0.0784}} = 0.0400 ,
$$
against the ideal $r^{2} = 0.0400$ (relative motion proportional to base acceleration): an error below $0.1$ per cent in the flat region. At $r = 1$ the reading is $1 / \left( 2 \zeta \right) = 0.71$ of the ideal, with no resonant peak at all, whereas an undamped instrument's response there would be unbounded.

*Sanity.* The same physical device reads **displacement** when its natural frequency is far **below** the measured frequency and **acceleration** when it is far **above**. That is not a trick of design but of the transfer function, and it is why a modern accelerometer is described by its natural frequency and its damping rather than by its mass and stiffness: the piezoelectric element replaces the spring's force with a charge, but the $m / k / c$ model still sets the usable band. The damping of $0.7$ is chosen to flatten the response and to kill the ringing that would otherwise smear a shock into a decaying oscillation.
:::
:::

::: example Whirling of a shaft {#ex-whirl}
A centrifuge bowl of mass $60\ \mathrm{kg}$ is carried at the middle of a shaft whose lateral stiffness is $1.2\ \mathrm{MN / m}$, with $\zeta = 0.03$ and an unbalance of $5\ \mathrm{g\,mm}$. Find the critical speed, the deflection at it, and the deflection at $1500\ \mathrm{rpm}$.
::: solution
$$
\omega_n = \sqrt{\frac{1.2 \times 10^{6}}{60}} = 141.4\ \mathrm{rad / s}
= 1350\ \mathrm{rpm},
\qquad \frac{m_e e}{m} = \frac{5 \times 10^{- 6}}{60} = 8.33 \times 10^{- 8}\ \mathrm{m},
$$
$$
X_{\text{res}} = \frac{8.33 \times 10^{- 8}}{2 \times 0.03} = 1.39\ \mu \mathrm{m},
\qquad
r = \frac{157.1}{141.4} = 1.111 : \quad
\frac{X}{m_e e / m} = \frac{1.234}{\sqrt{0.0549 + 0.0044}} = 5.07,
$$
$$
X = 0.42\ \mu \mathrm{m}.
$$
*Sanity.* Sub-micrometre deflections, because the unbalance of a good centrifuge rotor is a few gram-millimetres. But the **critical speed of $1350\ \mathrm{rpm}$** is the number that decides the machine: a centrifuge that runs at $1500\ \mathrm{rpm}$ has only an eleven per cent margin, and the run-up through $1350$ produces a deflection of $1.4\ \mu \mathrm{m}$ — small in absolute terms, but at a bearing clearance of twenty micrometres the run-up excursion is a significant fraction of the gap. This is why precision rotors are designed with the operating speed either well **below** the first critical, as a rigid rotor, or well **above** it, as a flexible rotor with a balancing quality good enough that the deflection above the critical is acceptable, and why the choice is made before any other dimension is fixed.
:::
:::

::: example Design {#ex-design-vibration-limit}
A $25\ \mathrm{kg}$ pump running at $2900\ \mathrm{rpm}$ must meet vibration severity zone B of ISO 10816, an RMS velocity of $4.5\ \mathrm{mm / s}$. The first critical is at $900\ \mathrm{rpm}$. Find the allowable displacement amplitude and the corresponding balance grade.
::: solution
$$
\omega = \frac{2900 \times 2 \pi}{60} = 303.7\ \mathrm{rad / s},
\qquad
X = \frac{v_{\text{rms}} \sqrt{2}}{\omega} = \frac{4.5 \times 1.414}{303.7}
= 21.0\ \mu \mathrm{m} \text{ peak},
$$
and since the running speed is $3.2$ times the critical, $X \approx m_e e / m$, so
$$
m_e e = 25 \times 21.0 \times 10^{- 6} = 5.24 \times 10^{- 4}\ \mathrm{kg\,m}
= 524\ \mathrm{g\,mm}.
$$
**Balance grade.** The permissible eccentricity is
$$
e_{\text{per}} = \frac{U}{m} = \frac{524}{25} = 21\ \mu \mathrm{m},
\qquad
G = e_{\text{per}} \omega = 21 \times 10^{- 6} \times 303.7 = 6.4\ \mathrm{mm / s},
$$
which is grade **G6.3** of ISO 1940 — the grade specified for short rigid rotors such as armature rotors and small pumps.

*Design comment.* The chain of reasoning is worth spelling out because it is how the balance specification is actually generated: a vibration **severity** limit on the machine becomes a displacement limit at the running speed, which becomes a **residual unbalance** limit through the mass, which becomes a **balance grade** that the workshop can work to. Note that the whole argument depends on running well above the critical, where $X = m_e e / m$; a machine running **at** the critical would need its unbalance divided by $1 / \left( 2 \zeta \right)$ to meet the same limit, which for $\zeta = 0.05$ is ten times tighter. This is why the balance grade of a rotor is meaningless without its operating speed and its critical speed, and why ISO 1940 specifies the grade as a **velocity** $G$ rather than as a mass: the grade is the vibration it would produce, and it is the only sensible way to specify a thing whose whole purpose is to limit vibration.
:::
:::

::: history
The **magnification factor** and its phase companion were worked out for the forced oscillator by the vibration theorists of the late nineteenth century, with Rayleigh giving the steady-state solution and the resonance definition in the *Theory of Sound*; the **half-power bandwidth** method is a twentieth-century laboratory convention, formalised in the electrical-engineering literature of the 1930s where the $Q$ of a resonant circuit was already standard. The **whirling speed** of a shaft was analysed by Rankine in 1869, whose model suggested that a shaft could not run stably above it. De Laval's steam turbines of the 1880s nevertheless ran above their critical speed; Föppl explained why in 1895, and **Jeffcott**'s 1919 paper gave the simple disc-on-a-shaft model, with the self-centring of the rotor above the critical, that is still used in this lesson. The **seismic instrument** principle, that the relative motion of a damped mass reads displacement above the natural frequency and acceleration below it, grew out of seismograph design from the late nineteenth century. The **balance grade** system of ISO 1940 dates from 1973, and the **vibration severity** zones, which turn a judgement of how badly a machine is shaking into a measured RMS velocity, appeared in ISO 2372 (1974) and continued in ISO 10816 and its successor ISO 20816.
:::

## Where this leads

The free response and the measurement of damping by ring-down are in [[vibrations/free-vibration]], the use of the isolation region of this lesson's curve in [[vibrations/isolation-transmissibility]], the response to non-harmonic forcing in [[vibrations/general-excitation]], and the rotating-machinery application in [[machine-design/shafts]]. The Fourier decomposition that makes the harmonic case the general one is developed in [[vibrations/general-excitation]].

::: summary
- The magnification factor $M (r) = \left[ \left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2} \right]^{- 1 / 2}$ gives the amplitude at any frequency, with $M = 1 / \left( 2 \zeta \right)$ at resonance.
- The phase passes through $90^{\circ}$ at $r = 1$ whatever the damping, and this is the practical definition of resonance.
- The half-power bandwidth gives $\zeta = \left( r_2 - r_1 \right) / 2$ from a forced-vibration sweep.
- A rotating unbalance gives $X \to m_e e / m$ at high speed: the amplitude is set by the unbalance and the mass, and **not** by the stiffness.
- A seismic instrument reads displacement above its natural frequency and acceleration below it; damping of $0.7$ flattens both.
- A vibration severity limit converts, through the running speed and the mass, into a balance grade.
:::

::: quiz
A machine runs at $3600\ \mathrm{rpm}$ and its vibration amplitude is measured as $0.05\ \mathrm{mm}$. The speed is reduced to $1800\ \mathrm{rpm}$ and the amplitude is unchanged at $0.05\ \mathrm{mm}$. The most likely explanation is that the machine is:
- [ ] Operating exactly at its critical speed at both speeds
- [ ] Being excited by an electrical fault at a constant amplitude
- [x] Running well above its first critical speed, where the amplitude equals $m_e e / m$ and is independent of speed
- [ ] Being excited by a constant-force disturbance
::: solution
For a rotating unbalance the high-speed asymptote is $X \to m_e e / m$, a constant independent of speed, of stiffness and of damping. Observing a **flat** amplitude against speed is therefore the classic signature of a flexible rotor running above its critical, and it lets the engineer read the residual unbalance straight off the vibration: $m_e e = m X$. Had the excitation been a constant force rather than a rotating unbalance, the amplitude in the mass-controlled region would have gone as $1 / r^{2}$ and halving the speed would have quadrupled it — which is the diagnostic test, and the reason a coast-down spectrum is worth more than a single running measurement. This is also why a machine balanced to a fixed displacement limit at one speed can fail the same limit at another, and why balance grades are specified in millimetres per second rather than in micrometres.
:::
:::

## Exercises

::: exercise Magnification {level=1 check="5"}
Find the magnification factor at resonance for a damping ratio of $0.1$.
::: solution
$M = 1 / \left( 2 \zeta \right) = 5$.
:::
:::

::: exercise Frequency ratio {level=1 check="0.25"}
For a machine running at twice its natural frequency, what is the magnification factor at negligible damping?
::: solution
$M \to 1 / r^{2} = 0.25$.
:::
:::

::: exercise Bandwidth {level=1 check="0.02"}
A resonance sweep gives half-power points at $49.0$ and $51.0\ \mathrm{Hz}$. Find the damping ratio.
::: solution
$\zeta = \left( 51.0 - 49.0 \right) / \left( 51.0 + 49.0 \right) = 0.02$.
:::
:::

::: exercise Run-up {level=2}
For the machine of Example 1, find the amplitude and the transmitted force at $r = 1.05$ and at $r = 3$, and comment on the run-up.
::: solution
$$
r = 1.05 : \quad M = \frac{1}{\sqrt{0.1025^{2} + 0.105^{2}}} = 6.81, \quad X = 17.0\ \mathrm{mm},
\quad F_T = 3430\ \mathrm{N},
$$
$$
r = 3 : \quad M = \frac{1}{\sqrt{8^{2} + 0.3^{2}}} = 0.125, \quad X = 0.31\ \mathrm{mm},
\quad F_T = 65\ \mathrm{N}.
$$
*Sanity.* At three times resonance the transmitted force is one eighth of the applied force, so the machine is self-isolating at its running speed if the speed was chosen that way. The dangerous band is narrow — from $r = 0.95$ to $r = 1.05$ the amplitude exceeds seventeen millimetres — which is why the run-up is specified as a **rate**: passing the resonance in two or three cycles rather than fifty reduces the actual amplitude well below the steady value, and the transient analysis for this is in [[vibrations/general-excitation]].
:::
:::

::: exercise Unbalance {level=2}
A $60\ \mathrm{kg}$ rotor with $20\ \mathrm{g\,mm}$ of residual unbalance runs at $6000\ \mathrm{rpm}$ on a support of $2\ \mathrm{MN / m}$ with $\zeta = 0.05$. Find the amplitude and the speed of the first critical.
::: solution
$$
\omega_n = \sqrt{\frac{2 \times 10^{6}}{60}} = 182.6\ \mathrm{rad / s} = 1743\ \mathrm{rpm},
\qquad r = \frac{628.3}{182.6} = 3.441,
$$
$$
\frac{X}{m_e e / m} = \frac{11.84}{\sqrt{117.5 + 0.118}} = 1.092,
\qquad
X = 1.092 \times \frac{2 \times 10^{- 5}}{60} = 0.36\ \mu \mathrm{m}.
$$
*Sanity.* A third of a micrometre — a well-balanced rotor. Note that the amplitude at $6000\ \mathrm{rpm}$ is only nine per cent above the asymptote $m_e e / m$, so the machine is effectively in the mass-controlled region and its vibration is a balance measurement rather than a dynamics problem.
:::
:::

::: exercise Phase {level=2}
At what frequency ratio does the phase lag reach $135^{\circ}$ for $\zeta = 0.05$, and what is the magnification there?
::: solution
In the second quadrant $\tan \phi$ is negative, so $1 - r^{2} < 0$ and
$$
\frac{2 \zeta r}{1 - r^{2}} = - 1
\quad\Longrightarrow\quad
r^{2} - 0.1 r - 1 = 0
\quad\Longrightarrow\quad
r = \frac{0.1 + \sqrt{0.01 + 4}}{2} = 1.051 ,
$$
$$
M = \frac{1}{\sqrt{0.1050^{2} + 0.1051^{2}}} = 6.73 .
$$
*Sanity.* The phase reaches $135^{\circ}$ only five per cent above resonance, which is the awkward fact about the phase curve: it climbs from $80^{\circ}$ to $100^{\circ}$ within a few per cent of frequency at low damping and then flattens slowly towards $180^{\circ}$, so phase is a **poor** frequency reference near resonance at low damping and an excellent one only in the narrow sense that $90^{\circ}$ exactly locates the undamped natural frequency. In practice phase is used to identify **mode shape** — whether two measurement points move together or in opposition — rather than frequency, and a modal analyst reads the phase plot before the magnitude plot for exactly that reason.
:::
:::

::: exercise Design {level=3}
A $400\ \mathrm{kg}$ press runs at $240$ strokes per minute with a harmonic vertical force of $40\ \mathrm{kN}$ amplitude. The foundation is to be designed so that the amplitude does not exceed $3\ \mathrm{mm}$ and the force transmitted to the ground does not exceed $10\ \mathrm{kN}$. Propose a design.
::: solution
**Operating frequency.** $\omega = 240 \times 2 \pi / 60 = 25.13\ \mathrm{rad / s}$.
**Frequency ratio from the force limit.** With $\zeta = 0.1$ and $F_T / F_0 = 10 / 40 = 0.25$,
$$
\sqrt{\frac{1 + \left( 0.2 r \right)^{2}}{\left( 1 - r^{2} \right)^{2} + \left( 0.2 r \right)^{2}}} = 0.25
\quad\Longrightarrow\quad r = 2.32 .
$$
**Static deflection.** This fixes the natural frequency and therefore the deflection,
$$
\omega_n = \frac{25.13}{2.32} = 10.83\ \mathrm{rad / s},
\qquad
\delta_{\text{st}} = \frac{g}{\omega_n^{2}} = \frac{9.81}{117.3} = 84\ \mathrm{mm}.
$$
**Amplitude — the hard floor.** In the isolation region $X \to F_0 / \left( m \omega^{2} \right)$, which is **independent of the stiffness**, so
$$
X_{\min} = \frac{40\,000}{400 \times 25.13^{2}} = 158\ \mathrm{mm},
$$
and the $3\ \mathrm{mm}$ limit cannot be met at any stiffness. The mass required is
$$
m \ge \frac{F_0}{\omega^{2} X} = \frac{40\,000}{631.7 \times 0.003} = 21\,100\ \mathrm{kg}.
$$
**Proposed design.** Take a $25\ \mathrm{t}$ inertia block, giving $X_{\min} = 2.5\ \mathrm{mm}$, and mounts of
$$
k = m \omega_n^{2} = 25\,000 \times 117.3 = 2.93 \times 10^{6}\ \mathrm{N / m}
$$
for the $84\ \mathrm{mm}$ static deflection. The resulting amplitude is
$$
X = \frac{M F_0}{k} = \frac{0.227 \times 40\,000}{2.93 \times 10^{6}} = 3.1\ \mathrm{mm},
$$
with $M = 0.227$ at $r = 2.32$, $\zeta = 0.1$ (the magnification, not the transmissibility $0.25$). This is marginally over, so take $30\ \mathrm{t}$: $X = 2.6\ \mathrm{mm}$, $k = 3.52\ \mathrm{MN / m}$, and the transmitted force is $10\ \mathrm{kN}$ as required.

*Design comment.* Three things in this solution are worth carrying away. First, the **amplitude** requirement is a mass requirement and the **force** requirement is a frequency-ratio requirement; no choice of stiffness satisfies both, because in the isolation region the amplitude is $F_0 / m \omega^{2}$ and does not care about $k$. Second, the static deflection is fixed by the frequency ratio alone — $\delta_{\text{st}} = g r^{2} / \omega^{2}$ — so demanding twenty-five per cent transmission at four hertz **means** accepting eighty-four millimetres of settle, and that number, not the stiffness, is what decides the mount type. Third, eighty-four millimetres under a thirty-tonne block is about $0.29\ \mathrm{MN}$ of load on $84\ \mathrm{mm}$ of travel, which is a steel-spring or air-mount problem rather than a rubber one, and the block must be heavy enough that its own rocking and pitching modes stay well above four hertz. This is why large presses, hammers and shears sit on blocks of concrete weighing ten to fifty times the machine, and why the foundation is designed as a rigid body whose own natural frequencies are checked against the excitation before the mounts are chosen.
:::
:::

::: exercise Derivation {level=3}
Show that the force transmitted to the support of a harmonically excited system is
$$
\frac{F_T}{F_0} = \sqrt{\frac{1 + \left( 2 \zeta r \right)^{2}}{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} ,
$$
deduce the transmissibility of a machine running at four times its natural frequency with $\zeta = 0.1$, and show that damping is harmful above $r = \sqrt{2}$.
::: solution
**Transmissibility.** The support reacts through the spring and damper in parallel,
$$
F_T = k x + c \dot{x},
$$
whose amplitude, with $x = X \sin \left( \omega t - \phi \right)$, is $X \sqrt{k^{2} + \left( c \omega \right)^{2}}$. Substituting $X$ from the magnification factor,
$$
\frac{F_T}{F_0}
= \frac{\sqrt{k^{2} + c^{2} \omega^{2}}}{\sqrt{\left( k - m \omega^{2} \right)^{2} + c^{2} \omega^{2}}}
= \frac{\sqrt{1 + \left( c \omega / k \right)^{2}}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( c \omega / k \right)^{2}}}
= \sqrt{\frac{1 + \left( 2 \zeta r \right)^{2}}{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} . \quad \checkmark
$$
**At $r = 4$, $\zeta = 0.1$.**
$$
\frac{F_T}{F_0} = \frac{\sqrt{1 + 0.64}}{\sqrt{225 + 0.64}} = \frac{1.281}{15.02} = 0.0853 ,
$$
against $0.0667$ for an undamped mount — the damping has made the isolation **worse** by a quarter.
**The $\sqrt{2}$ boundary.** Writing $T^{2} = \left( 1 + 4 \zeta^{2} r^{2} \right) / \left[ \left( 1 - r^{2} \right)^{2} + 4 \zeta^{2} r^{2} \right]$ and setting $T = 1$ gives
$$
1 + 4 \zeta^{2} r^{2} = \left( 1 - r^{2} \right)^{2} + 4 \zeta^{2} r^{2}
\quad\Longrightarrow\quad
\left( 1 - r^{2} \right)^{2} = 1
\quad\Longrightarrow\quad r = \sqrt{2} .
$$
For $r < \sqrt{2}$ the transmissibility exceeds unity whatever the damping; for $r > \sqrt{2}$ it is less than unity, and increasing the damping **increases** it.

*Comment.* The $\sqrt{2}$ line is the single most-quoted result in vibration isolation and the most misunderstood: it says nothing about how much isolation you get, only about whether you get any. The design number is the frequency ratio, and the damping is fitted for the run-up through resonance, where it is essential, and then minimised everywhere else — which is why a serious isolation system uses a **viscous damper with a low loss factor** or an active system that damps only near resonance.
:::
:::
