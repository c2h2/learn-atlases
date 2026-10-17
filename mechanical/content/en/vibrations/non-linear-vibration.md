Everything so far rests on superposition, and superposition is an approximation. Real springs stiffen when stretched far, clearances open and close, friction reverses, drag goes as the square of velocity, and a structure's stiffness changes with the load it carries. Once the equation is non-linear, four things that cannot happen in a linear system become routine: the natural frequency depends on the **amplitude**, the response is **multi-valued** and jumps, an oscillation can **sustain itself** with no external force at all, and the motion can become **chaotic**, deterministic but unpredictable beyond a few periods.

None of this is exotic: a guitar string goes sharp as you pluck it hard, a car's bounce frequency changes with the number of passengers, a bridge oscillates in wind with no wind-induced frequency at all, and a machine tool with a clearance in its drive rumbles at half the spindle speed. The tools that make these predictable without a simulation are the energy integral, harmonic balance and averaging.

::: warning Linear intuition fails in four specific ways
**(1)** The natural frequency changes with amplitude, so a "resonance" is a **curve** in amplitude–frequency space rather than a point. **(2)** For one forcing frequency there may be **three** steady amplitudes, two of them stable, and the system jumps between them with hysteresis. **(3)** A system can oscillate with no forcing at all, at an amplitude set by the non-linearity and not by the initial condition — a **limit cycle**. **(4)** A deterministic system can depend **sensitively** on initial conditions, so that two runs differing by one part in a million separate exponentially.
:::

## Amplitude-dependent frequency

::: definition The Duffing oscillator {#def-duffing}
The canonical non-linear oscillator is $m \ddot{x} + c \dot{x} + k x + \alpha x^{3} = F \cos \Omega t$, with $\alpha > 0$ for a **hardening** spring (a taut string, a deflected beam, a compressed mount) and $\alpha < 0$ for a **softening** one (a buckled column, a magnet suspension, a pre-loaded rubber mount). Writing $\omega_0^{2} = k / m$ and $\beta = \alpha / m$, the **backbone curve** — the free-oscillation frequency at amplitude $A$ — is, by harmonic balance,
$$
\omega^{2} (A) = \omega_0^{2} + \tfrac{3}{4} \beta A^{2},
\qquad
T (A) = T_0 \left( 1 + \tfrac{3}{8} \frac{\beta A^{2}}{\omega_0^{2}} \right)^{- 1} .
$$
The cubic term also generates a small **third harmonic**, worked in the exercises.
:::

::: proof The period of a conservative non-linear oscillator {#proof-nonlinear-period}
For $m \ddot{x} + \mathrm{d} V / \mathrm{d} x = 0$ the energy integral gives $m \dot{x}^{2} / 2 + V (x ) = V (A )$ at the turning point $x = A$, so
$$
T = 2 \sqrt{2 m} \int_0^{A} \frac{\mathrm{d} x}{\sqrt{V (A ) - V (x )}} .
$$
For $V = k x^{2} / 2 + \alpha x^{4} / 4$, substituting $x = A \sin \theta$ and integrating,
$$
T = \frac{2 T_0}{\pi} \int_0^{\pi / 2} \frac{\mathrm{d} \theta}{\sqrt{1 + \frac{\alpha A^{2}}{2 k} \sin^{2} \theta}} ,
$$
an elliptic integral. Expanding for small $\alpha A^{2} / k$,
$$
T = T_0 \left( 1 - \frac{3 \alpha A^{2}}{8 k} + \cdots \right),
$$
so a hardening spring has a **shorter** period at larger amplitude, and the fractional change is $3 \alpha A^{2} / \left( 8 k \right)$ — the same coefficient as harmonic balance gives, which is the check that the approximation is doing the right thing. $\checkmark$

*Note.* For the simple pendulum the same integral gives $T = \dfrac{2 T_0}{\pi} K \left( \sin^{2} \dfrac{\theta_0}{2} \right)$ and $T = T_0 \left( 1 + \theta_0^{2} / 16 + \cdots \right)$: the pendulum is **softening**.
:::

::: widget plot
f: 1/(1+0.375*x*x)
x: 0, 2
y: 0.5, 1.1
labels: T / T_0
caption: Free-oscillation period of a hardening Duffing oscillator against amplitude, for $\beta / \omega_0^{2} = 1$, from the expansion $T / T_0 = 1 - 3 \beta A^{2} / \left( 8 \omega_0^{2} \right)$. A hardening system's resonance bends to the right, and the bending is visible in a swept test long before the jump itself.
:::

::: example Clock pendulum {#ex-pendulum-period}
A grandfather clock's pendulum is $1.0\ \mathrm{m}$ long and swings with a semi-amplitude of $6^{\circ}$. Find the period error against the small-angle value, and the error if the amplitude doubles in a gust of wind.
::: solution
With $\theta_0 = 6^{\circ} = 0.1047\ \mathrm{rad}$,
$$
\frac{\Delta T}{T} = \frac{\theta_0^{2}}{16} = \frac{0.01097}{16} = 6.9 \times 10^{- 4},
$$
a gain of $59\ \mathrm{s}$ per day. Doubling the amplitude to $12^{\circ}$ quadruples the error to $2.8 \times 10^{- 3}$, or $240\ \mathrm{s}$ per day.

*Check.* The exact elliptic-integral value at $6^{\circ}$ is $T / T_0 = 1.000685$ against the expansion's $1.000686$. $\checkmark$

*Sanity.* A quarter of a day per day from a doubling of swing — which is why the **escapement**'s job is not merely to replace the lost energy but to make the amplitude nearly independent of the driving torque. The dead-beat escapement and the gravity escapement of Big Ben exist for this reason alone, decoupling the impulse from the amplitude and holding the rate to a few hundredths of a second per day over a range of drive.
:::
:::

## Multi-valued response and the jump

::: theorem The jump phenomenon {#thm-jump}
For a hardening Duffing oscillator driven at $\Omega$, the steady-state amplitude satisfies
$$
\left[ \left( \omega_0^{2} - \Omega^{2} \right) A + \tfrac{3}{4} \beta A^{3} \right]^{2} + \left( 2 \zeta \omega_0 \Omega A \right)^{2} = \left( F / m \right)^{2} .
$$
This is cubic in $A^{2}$, so over a band of driving frequencies **three** amplitudes are possible and the middle one is unstable. Sweeping **up** the response follows the low branch and jumps **up** at the upper fold; sweeping **down** it follows the high branch and jumps **down** at a lower frequency. The band between the folds is a **hysteresis** region, wider for larger force and lighter damping.
:::

::: example Jump and hysteresis {#ex-jump}
For $\ddot{x} + 0.1 \dot{x} + x + 0.3 x^{3} = 0.3 \cos \Omega t$, find the jump-up and jump-down frequencies and the amplitudes on either side of each jump.
::: solution
Solving the cubic in $A^{2}$ across the sweep gives three real roots for $1.222 < \Omega < 1.418$:

- **Sweep up.** The low branch reaches $A = 0.30$ at $\Omega = 1.418$ and jumps to $A = 2.11$.
- **Sweep down.** The high branch reaches $A = 1.67$ at $\Omega = 1.222$ and jumps to $A = 0.88$.

The linear-system resonance amplitude would be $F / \left( 2 \zeta \right) = 3.0$, so the hardening term has pushed the peak off resonance and cut it by thirty per cent.

*Check.* The backbone curve gives $\Omega = \sqrt{1 + 0.225 A^{2}} = 1.275$ at $A = 1.67$, which lies inside the hysteresis band as it must. $\checkmark$

*Sanity.* A jump from $A = 1.67$ to $A = 0.88$ is a factor of four in stress, occurring in a fraction of a cycle as the frequency is swept down by less than twenty per cent. Running **up** through a non-linear resonance and coasting **down** through it are therefore different experiences: a machine run above a resonance and then slowed stays on the high branch far below its linear natural frequency and then suddenly goes quiet — the classic signature of a softening mount or a loosening bolt, and one usually misdiagnosed.
:::
:::

## Self-excited oscillation

::: definition Limit cycle and negative damping {#def-limit-cycle}
Where damping is negative the amplitude grows and where it is positive it decays; if the damping **changes sign** with amplitude the system settles on a **limit cycle** whose amplitude is fixed by the system and not by the initial condition. The canonical example is the van der Pol equation
$$
\ddot{x} - \mu \left( 1 - x^{2} \right) \dot{x} + x = 0 ,
$$
whose limit-cycle amplitude averaging gives as $2$ for every $\mu > 0$. Physical self-excitation appears as **flutter**, **brake squeal**, **machine-tool chatter**, the **singing** of a bridge or a pipe, a bowed violin string, and the wind-induced vibration of a chimney or a transmission line.
:::

::: proof Limit-cycle amplitude by averaging {#proof-van-der-pol}
Seek a solution $x = a \cos \left( t + \phi \right)$ of $\ddot{x} + x = \mu \left( 1 - x^{2} \right) \dot{x}$ with slowly varying $a$ and $\phi$. The energy of the linear part is $E = \left( \dot{x}^{2} + x^{2} \right) / 2 = a^{2} / 2$, and its rate of change is exactly the power fed by the non-linear damping,
$$
\frac{\mathrm{d} E}{\mathrm{d} t} = \dot{x} \left( \ddot{x} + x \right) = \mu \left( 1 - x^{2} \right) \dot{x}^{2} .
$$
Substituting the leading-order solution $x = a \cos \psi$, $\dot{x} = - a \sin \psi$ and averaging over one cycle with $\overline{\sin^{2} \psi} = 1 / 2$ and $\overline{\sin^{2} \psi \cos^{2} \psi} = 1 / 8$,
$$
\overline{ \left( 1 - a^{2} \cos^{2} \psi \right) a^{2} \sin^{2} \psi }
= a^{2} \left( \frac{1}{2} - \frac{a^{2}}{8} \right),
\qquad
\dot{E} = \mu a^{2} \left( \frac{1}{2} - \frac{a^{2}}{8} \right) .
$$
Since $\dot{E} = a \dot{a}$,
$$
\dot{a} = \frac{\mu a}{2} \left( 1 - \frac{a^{2}}{4} \right),
$$
which has a stable fixed point at $a = 2$ for every $\mu > 0$, and $\dot{a} > 0$ below it and $\dot{a} < 0$ above it. $\checkmark$

*Note.* The amplitude is set by the **non-linearity**, not by the initial condition. In resonance the amplitude is proportional to the forcing and disappears when the forcing does; in self-excitation it is a **property of the system**, and the forcing need only be enough to push the damping negative.
:::

::: example Flutter onset {#ex-flutter}
A wind-tunnel model wing has a bending frequency of $12\ \mathrm{Hz}$ and a damping ratio of $2$ per cent in still air. The aerodynamic damping is $\zeta_\text{aero} = - 0.004 \left( V / 30 \right)^{2}$. Find the flutter speed, and the amplitude doubling time at ten per cent above it.
::: solution
Flutter begins when the total damping vanishes:
$$
0.02 - 0.004 \left( \frac{V}{30} \right)^{2} = 0
\quad\Longrightarrow\quad
V = 30 \sqrt{5} = 67\ \mathrm{m / s}.
$$
**Ten per cent over.** At $V = 73.8\ \mathrm{m / s}$,
$$
\zeta = 0.02 - 0.004 \times 6.05 = - 0.0042,
\qquad
\text{growth rate} = \left| \zeta \right| \omega_n = 0.0042 \times 2 \pi \times 12 = 0.317\ \mathrm{s^{- 1}},
$$
$$
\text{doubling time} = \frac{\ln 2}{0.317} = 2.2\ \mathrm{s} = 26\ \text{cycles}.
$$
*Sanity.* A classical flutter test cannot wait for the amplitude to "blow up", because at one per cent over the speed the doubling time is $260$ seconds, during which the model is at risk and the tunnel is hot; the standard procedure is instead to excite a **free decay** at each speed, measure the logarithmic decrement, and extrapolate the damping to zero — the same straight-line extrapolation that gives a fatigue limit, and one that yields the flutter speed from data taken entirely **below** it. The amplitude limit that stops a real wing destroying itself comes from aerodynamic stall or structural yielding and produces a **limit-cycle oscillation** whose amplitude grows as the square root of the excess speed above the flutter point, which is the signature a flutter engineer looks for in the tunnel.
:::
:::

## Parametric excitation and chaos

::: definition Parametric excitation {#def-parametric}
When a system **parameter** varies in time rather than a force being applied, the equation becomes $\ddot{x} + \omega_0^{2} \left( 1 + m \cos \Omega t \right) x = 0$, Mathieu's equation, whose solution is stable in some $\left( \Omega , m \right)$ regions and unstable in others. The instability tongues open at $\Omega = 2 \omega_0 / n$, and the **principal** tongue, by far the widest, is at $\Omega = 2 \omega_0$ with a half-width $m \omega_0 / 2$. The mechanism is that the parameter is varied twice per cycle, at the moments of greatest displacement, so work is done on the system once per half cycle with the correct sign every time.
:::

::: example Child on a swing {#ex-swing}
A child on a $2.5\ \mathrm{m}$ swing pumps by standing and crouching. Find the frequency of pumping, the phase at which it must be done, and the width of the pumping-frequency band over which the swing still grows.
::: solution
$$
\omega_0 = \sqrt{\frac{9.81}{2.5}} = 1.981\ \mathrm{rad / s}, \qquad
f_0 = 0.315\ \mathrm{Hz}, \qquad
f_{\text{pump}} = 2 f_0 = 0.63\ \mathrm{Hz}.
$$
**Phase.** The child must **stand** near the **lowest point**, where the tension is greatest and the work $\int T \, \mathrm{d} l$ is largest, and crouch at the extremes where the tension is least. Standing at the wrong phase removes exactly as much energy as standing at the right phase adds.
**Band.** Taking $m \approx 0.2$ for the fractional length change, the principal tongue extends $\pm m \omega_0 / 4$ in $\Omega / 2$, so
$$
\Delta f = \frac{m f_0}{2} = 0.032\ \mathrm{Hz},
$$
a band of $\pm 5$ per cent around $0.63\ \mathrm{Hz}$.

*Sanity.* A swing is a parametric oscillator with a $\pm 5$ per cent capture band, which is why a child learns to pump **at** the swing's own frequency and cannot pump effectively at any other. The same mechanism makes a walking person a parametric exciter of a footbridge's vertical mode at **twice** its frequency, which is why "break step" is a frequency instruction and not a force one.
:::
:::

::: example Stabilising the inverted pendulum {#ex-inverted-pendulum}
A pendulum is to be stabilised upside down by vibrating its pivot vertically at ten times its natural frequency. Find the required ratio of the pivot acceleration amplitude to $g$, and the corresponding stroke.
::: solution
The high-frequency criterion is
$$
\frac{A \Omega^{2}}{g} > \sqrt{2} \, \frac{\Omega}{\omega_0} = \sqrt{2} \times 10 = 14.1 ,
$$
and an exact Floquet analysis of the monodromy matrix gives $14.3$. The pivot acceleration amplitude must therefore be $14.3\ g$, and the stroke is
$$
A = \frac{14.3 g}{\Omega^{2}} = \frac{14.3 g}{100 \omega_0^{2}} = 0.143 \frac{g}{\omega_0^{2}} = 0.143 l_{\text{eq}} .
$$
For a $0.3\ \mathrm{m}$ pendulum, $\omega_0 = 5.72\ \mathrm{rad / s}$, $\Omega = 57.2\ \mathrm{rad / s} = 9.1\ \mathrm{Hz}$, and $A = 14.3 \times 9.81 / 57.2^{2} = 43\ \mathrm{mm}$.

*Check.* The effective gravity is $g_{\text{eff}} = g \left[ 1 - \tfrac{1}{2} \left( A \Omega^{2} / g \right)^{2} \left( \omega_0 / \Omega \right)^{2} \right]$, which vanishes at $A \Omega^{2} / g = \sqrt{2} \Omega / \omega_0$ exactly, confirming the criterion. $\checkmark$

*Sanity.* A $43\ \mathrm{mm}$ stroke at $9.1\ \mathrm{Hz}$ is a violent shaking for a $300\ \mathrm{mm}$ pendulum, and that is why the Kapitza pendulum is a laboratory curiosity rather than a control strategy: the required acceleration grows **linearly** with the drive frequency while the stroke only falls as its square, so the two effects nearly cancel and the machine needed is large at every frequency. Real inverted-pendulum stabilisation — rockets, Segways, the Saturn V — uses **feedback**, which costs nothing in amplitude.
:::
:::

::: example Chaos {#ex-chaos}
The driven pendulum $\ddot{x} + 0.5 \dot{x} + \sin x = 0.667 \cos \left( 2 t / 3 \right)$ is the standard chaotic case. Starting from $x = 0$, $\dot{x} = 0$ and from $x = 10^{- 6}$, $\dot{x} = 0$, find how long the two solutions remain close.
::: solution
Integrating both, the solutions separate as $\left| \Delta x \right| \sim 10^{- 6} e^{\lambda t}$ with a largest **Lyapunov exponent** of
$$
\lambda \approx 0.06 \ \text{per unit time},
$$
so the separation reaches order unity when
$$
t = \frac{\ln \left( 10^{6} \right)}{0.06} = 230 \ \text{time units} = 55 \ \text{drive periods}.
$$
*Sanity.* Fifty-five periods of predictability and then none — not a numerical artefact but a property of the equations, since the same Lyapunov exponent is measured on a real magnet-and-pendulum apparatus. The consequences are that a chaotic system cannot be **forecast** beyond a horizon set by the initial-condition accuracy and $1 / \lambda$, that control must be closed-loop, and that a simulation of a gear train with clearance can give a **different** answer on every run, which is not a bug. The practical rule is to stop asking "what is the response?" and ask "what is the **attractor**?" — the range of amplitudes the system visits, which is reproducible even when the time history is not.
:::
:::

::: example Design {#ex-design-absorber}
A machine frame shows a hardening non-linearity with $\beta / \omega_0^{2} = 0.8\ \mathrm{m^{- 2}}$ at $40\ \mathrm{Hz}$, and the operating speed is fixed at $46\ \mathrm{Hz}$. The vibration must be kept below $0.2\ \mathrm{mm}$. Decide whether a linear tuned absorber is safe.
::: solution
**Backbone.** The resonance frequency at amplitude $A$ is $f (A ) = 40 \sqrt{1 + 0.6 A^{2}}$, which is $40.0\ \mathrm{Hz}$ at $A = 0.2\ \mathrm{mm}$ and $40.96\ \mathrm{Hz}$ at $2\ \mathrm{mm}$. The operating speed of $46\ \mathrm{Hz}$ is $1.15$ times the small-amplitude resonance and $1.12$ times the resonance at $2\ \mathrm{mm}$.
**Where the jump is.** The jump-down fold for $\zeta = 0.02$ and a resonant amplitude of $5\ \mathrm{mm}$ lies near $\Omega / \omega_0 = 0.85$, well below the operating point, so the machine sits on the **low** branch and the response is
$$
x \approx \frac{X_{\text{st}}}{\Omega^{2} / \omega_0^{2} - 1 - 0.6 A^{2}} \approx \frac{0.05}{1.32 - 1} = 0.16\ \mathrm{mm}.
$$
where $X_{\text{st}} = 0.05\ \mathrm{mm}$ is the static deflection under the exciting force.
**Absorber.** A linear absorber tuned to $46\ \mathrm{Hz}$ adds a second mode; if the primary amplitude ever grew enough for its own resonance to reach $46\ \mathrm{Hz}$, the absorber would be tuned to the **wrong** frequency and could make the response worse.

*Design comment.* The margin is $0.16$ against $0.2\ \mathrm{mm}$, and it exists only because the operating point is above the resonance and the non-linearity is mild. A linear absorber is **not** safe here, because an absorber works by creating two modes and the non-linearity moves the primary mode through them; the remedies are a **non-linear** absorber, a **vibration neutralizer**, or simply more damping, which bounds the response over a range of frequency rather than tuning a notch. Absorber design assumes linearity, and a machine whose resonance shifts by more than the absorber's bandwidth — typically two or three per cent — cannot be treated with one.
:::
:::

::: history
The **amplitude-dependent period** was known to Huygens in 1673, who designed the cycloidal cheeks to correct it; the exact elliptic-integral expression is due to Legendre and to Gauss, whose arithmetic-geometric mean evaluates it to machine precision in a handful of iterations. The **jump phenomenon** was observed by Rieder in 1789 and by Helmholtz, explained by **Duffing** in 1918 from tuning-fork experiments, and made rigorous only in the 1950s. **Van der Pol's** equation of 1926 came from the triode oscillator, and the **method of averaging** used to solve it goes back to Poincaré's *Méthodes nouvelles* of 1892, put on a rigorous footing by **Krylov** and **Bogoliubov** in 1937. **Mathieu's** equation of 1868 and **Floquet's** theory of 1883 give the stability chart drawn by **Strutt** in 1931, and the **Kapitza pendulum** appeared in a 1951 *Nature* letter of twenty lines. **Chaos** begins with Poincaré's 1890 memoir on the three-body problem, was forgotten, and was rediscovered by **Lorenz** in 1963 and by **Feigenbaum** in 1978 with his constant $4.015$; **Gollub** and **Swinney**'s pendulum experiments of 1975 are the direct ancestor of Example 8.
:::

::: quiz
A structure tested by sweeping a shaker **up** through a resonance and then **down** through it will usually show:
- [ ] The same response curve in both directions, because the system is deterministic
- [x] A different response in each direction, with a jump and a hysteresis band
- [ ] A higher peak on the up-sweep only, because the shaker is accelerating
- [ ] No difference unless the damping is exactly zero
::: solution
A **non-linear** structure has a response curve that bends with amplitude, so over a band of frequencies three amplitudes are possible and the system occupies different ones depending on where it came from. The up-sweep and down-sweep traces differ, and the difference is the diagnostic: a perfectly linear structure gives identical traces, and any hysteresis in a vibration test is evidence of a non-linearity — a crack, a slack joint, a lifting support, a buckled panel or a contact that is opening and closing. This is why "sweep up and down and compare" is a standard acceptance test for a structure that is supposed to be linear, and why a mismatch between the two traces on a flight article sends it back for inspection rather than for a re-analysis.
:::
:::

## Where this leads

The linear frequency response that all of this departs from is in [[vibrations/harmonic-excitation]], the free oscillation whose period becomes amplitude-dependent is in [[vibrations/free-vibration]], the multi-degree-of-freedom modal picture that a non-linear system destroys is in [[vibrations/modal-analysis]], and the random excitation that a non-linear system filters in ways a linear one cannot is in [[vibrations/general-excitation]]. The stability idea behind self-excitation reappears as divergence and flutter in [[mechanics-of-materials/buckling]].

::: summary
- A non-linear restoring force makes the natural frequency depend on amplitude: $\omega^{2} = \omega_0^{2} + 3 \beta A^{2} / 4$ for a cubic spring, with hardening raising and softening lowering it.
- The forced response of a non-linear system is multi-valued over a band of frequencies, and the amplitude **jumps** at the folds with hysteresis between the up-sweep and the down-sweep.
- Where damping changes sign with amplitude the system settles on a **limit cycle** whose amplitude is a property of the system, not of the initial condition; this is flutter, chatter, squeal and song.
- Parametric excitation destabilises at $\Omega = 2 \omega_0 / n$, the principal tongue being at twice the natural frequency and half as wide in relative terms as a direct-resonance peak.
- A driven damped non-linear oscillator can be chaotic, with a Lyapunov exponent that sets a hard forecast horizon; the reproducible object is the attractor, not the time history.
- Absorbers, tuned dampers and the whole linear design vocabulary assume superposition, and fail quietly when the resonance moves by more than their bandwidth.
:::

## Exercises

::: exercise Hardening {level=1 check="0.03"}
A Duffing oscillator has $\beta / \omega_0^{2} = 0.5\ \mathrm{m^{- 2}}$. By what fraction does its period fall at an amplitude of $0.4\ \mathrm{m}$?
::: solution
$\Delta T / T = 3 \beta A^{2} / \left( 8 \omega_0^{2} \right) = 3 \times 0.5 \times 0.16 / 8 = 0.03$.
:::
:::

::: exercise Pendulum {level=1 check="0.017"}
By what fraction is the period of a pendulum increased at a semi-amplitude of $30^{\circ}$?
::: solution
$\theta_0 = 0.5236\ \mathrm{rad}$, $\theta_0^{2} / 16 = 0.0171$, about $1.7$ per cent.
:::
:::

::: exercise Limit cycle {level=1 check="2"}
What is the limit-cycle amplitude of $\ddot{x} - \mu \left( 1 - x^{2} \right) \dot{x} + x = 0$?
::: solution
$2$, for every value of $\mu$.
:::
:::

::: exercise Parametric {level=1 check="2"}
At what multiple of its natural frequency must a pendulum be driven parametrically for the principal instability?
::: solution
$2$ — twice the natural frequency.
:::
:::

::: exercise Backbone {level=2}
A steel beam clamped at one end has a first natural frequency of $25\ \mathrm{Hz}$ at small amplitude and a hardening coefficient such that the frequency rises by $10$ per cent at a tip amplitude of $2.5\ \mathrm{mm}$. Find the amplitude at which a $30\ \mathrm{Hz}$ drive is exactly on resonance, and say whether the response there is stable.
::: solution
$$
c = \frac{1.1^{2} - 1}{0.0025^{2}} = \frac{0.21}{6.25 \times 10^{- 6}} = 33\,600\ \mathrm{m^{- 2}},
\qquad
25 \sqrt{1 + c A^{2}} = 30 \;\Longrightarrow\; 1 + c A^{2} = 1.44 ,
$$
$$
A = \sqrt{0.44 / 33\,600} = 3.6\ \mathrm{mm}.
$$
*Sanity.* The drive at $30\ \mathrm{Hz}$ is on resonance at exactly the amplitude at which the beam's own frequency reaches $30\ \mathrm{Hz}$, and the response there is **stable** only if the sweep reached it from above. Sweeping up from $25\ \mathrm{Hz}$ the response follows the low branch and jumps up before it; sweeping down from $35\ \mathrm{Hz}$ it rides the high branch through $30\ \mathrm{Hz}$ and can reach a very large amplitude. This is the reason a **sweep-down** test is the standard for finding the maximum response of a non-linear structure, and why a specification that says "sweep up at $1\ \mathrm{oct / min}$" can miss a resonance that a sweep-down finds at twice the amplitude.
:::
:::

::: exercise Averaging {level=2}
For a self-excited oscillator with $\dot{a} = \mu a \left( 1 - a^{2} / 4 \right)$, find the time for the amplitude to grow from $0.1$ to $1.9$ when $\mu = 0.05\ \mathrm{s^{- 1}}$, and the growth rate near the limit cycle.
::: solution
Separating variables,
$$
t = \frac{1}{\mu} \int_{0.1}^{1.9} \frac{\mathrm{d} a}{a \left( 1 - a^{2} / 4 \right)}
= \frac{2}{\mu} \left[ \ln \frac{a}{\sqrt{4 - a^{2}}} \right]_{0.1}^{1.9}
= \frac{2}{0.05} \left( 1.113 + 2.995 \right) = 164\ \mathrm{s}.
$$
Near $a = 2$, writing $a = 2 + \epsilon$ gives $\dot{\epsilon} = - 2 \mu \epsilon$, so the approach to the limit cycle has a time constant $1 / \left( 2 \mu \right) = 10\ \mathrm{s}$, half the exponential growth time of the early stage.
*Sanity.* Two minutes from a small amplitude to nearly the full limit cycle at $\mu = 0.05$: for flutter this is a growth rate of one part in ten per second, which is fast enough to be noticed on a wind-tunnel trace and slow enough that the decay-rate extrapolation method works. The fact that both rates are set by the single parameter $\mu$ is a general property of a supercritical Hopf bifurcation, and is the reason the **damping extrapolation** used in flutter testing is reliable.
:::
:::

::: exercise Mathieu {level=2}
For $\ddot{x} + \omega_0^{2} \left( 1 + m \cos \Omega t \right) x = 0$ with $m = 0.1$, find the band of $\Omega$ over which the principal parametric resonance is unstable, for $\omega_0 = 20\ \mathrm{rad / s}$.
::: solution
Writing the equation in the standard Mathieu form with $z = \Omega t / 2$ gives $a = 4 \omega_0^{2} / \Omega^{2}$ and $q = - 2 m \omega_0^{2} / \Omega^{2}$, and the principal boundaries are $a = 1 \pm q$. Eliminating,
$$
\Omega = 2 \omega_0 \sqrt{1 \pm m / 2} ,
$$
so
$$
\Omega = 40 \sqrt{1 \pm 0.05} = 40 \left( 1 \pm 0.025 \right) = 39.0 \text{ to } 41.0\ \mathrm{rad / s}.
$$
*Sanity.* A two-and-a-half per cent band on either side, against the two per cent half-width a direct resonance of the same modulation depth would give — parametric excitation is not intrinsically stronger, but it is **selective**, because it does not excite the neighbouring modes at all. This is why a parametrically driven MEMS gyroscope is so much more sensitive than a force-driven one, and why the same mechanism makes a chain of hanging beads, whose tension is modulated at the drive frequency, transmit only a narrow band.
:::
:::

::: exercise Jump {level=3}
For the oscillator of Example 3, halve the forcing amplitude and recompute the hysteresis band. What does the result say about the sensitivity of the jump to the excitation level?
::: solution
With $F = 0.15$ instead of $0.3$, the three-root region shrinks to $1.136 < \Omega < 1.174$. Sweeping **up**, the low branch reaches $A = 0.42$ at $\Omega = 1.174$ and jumps; sweeping **down**, the high branch reaches $A = 1.22$ at $\Omega = 1.136$ and falls to $A = 0.72$.
*Sanity.* Halving the force cuts the hysteresis band from $0.20$ wide to $0.038$ wide — a factor of five — and moves the whole phenomenon from $1.22$-$1.42$ to $1.14$-$1.17$, much closer to the linear resonance. The jump itself does not disappear: it is present at every excitation level and only its position and width move, so a low-level shaker test on a structure with a freeplay or a slack joint will still show the hysteresis and can be used to **locate** the non-linearity. The practical consequence is that the jump is **not** an artefact of over-testing: it is present at every excitation level and only its position moves, so a low-level shaker test on a structure with a freeplay or a slack joint will show the hysteresis and can be used to locate the non-linearity. Conversely, a structure tested only at low level will show a **narrower** band than the flight or service condition — here five times narrower for half the force — and a design justified on the low-level test may be wrong at the high one. This is why non-linear structures are characterised over the full amplitude range rather than at one level, and why the sweep rate matters: a fast sweep does not give the system time to reach the fold, and the jump appears at a higher frequency than it should.
:::
:::

::: exercise Derivation {level=3}
Derive the backbone curve $\omega^{2} = \omega_0^{2} + 3 \beta A^{2} / 4$ by the method of harmonic balance, and obtain the amplitude of the third harmonic that the approximation neglects.
::: solution
**First harmonic.** Substitute $x = A \cos \omega t + x_3$ into $\ddot{x} + \omega_0^{2} x + \beta x^{3} = 0$ and use
$$
\cos^{3} \psi = \tfrac{3}{4} \cos \psi + \tfrac{1}{4} \cos 3 \psi .
$$
Balancing the fundamental,
$$
- \omega^{2} A + \omega_0^{2} A + \tfrac{3}{4} \beta A^{3} = 0
\quad\Longrightarrow\quad
\omega^{2} = \omega_0^{2} + \tfrac{3}{4} \beta A^{2} .
$$
**Third harmonic.** Balancing the $\cos 3 \omega t$ terms, with $x_3$ small,
$$
- 9 \omega^{2} x_3 + \omega_0^{2} x_3 + \tfrac{1}{4} \beta A^{3} = 0
\quad\Longrightarrow\quad
x_3 = \frac{\beta A^{3} / 4}{9 \omega^{2} - \omega_0^{2}} \approx \frac{\beta A^{3}}{32 \omega_0^{2}} .
$$
*Check.* The ratio $x_3 / A = \beta A^{2} / \left( 32 \omega_0^{2} \right)$, which for the $\beta / \omega_0^{2} = 1$ and $A = 1$ of the widget is $0.031$ — three per cent, justifying the neglect. $\checkmark$
*Note.* The third harmonic is not always negligible: at $3 \omega \approx \omega_0$ the denominator vanishes and the system shows a **superharmonic resonance** at one third of its natural frequency, in which the third harmonic dominates and the waveform becomes strongly non-sinusoidal. Superharmonics at $\omega_0 / 2$ and $\omega_0 / 3$ are a routine signature of a cracked shaft or a loose joint in a vibration spectrum, and they are the reason a spectrum is read for its **harmonics** and not only for its fundamental.
:::
:::
