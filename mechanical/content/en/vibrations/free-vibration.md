Free vibration is the system talking about itself, and it is the only test that can be done with no force cell, no shaker and no instrument on the excitation side: hit the structure, record the ring-down, and read the natural frequency and the damping off the trace. Every damping figure quoted in engineering ultimately comes from a free-vibration test of some kind, and every natural frequency in a manufacturer's catalogue was checked against one.

The equation
$$
m \ddot{x} + c \dot{x} + k x = 0
$$
has three regimes separated by one number, the **damping ratio** $\zeta = c / c_c$, and the practical fact that governs the subject is that almost all engineering structures sit at $\zeta$ between $0.001$ and $0.05$ — steel, concrete, a machine frame, a wing — while anything deliberately fitted with a damper sits between $0.15$ and $0.4$. The first range is where the amplitude is set by a damping you cannot calculate and must measure; the second is where you have chosen it and the response is predictable.

::: warning Damping cannot be predicted, only measured
There is no theory that gives the damping ratio of a bolted frame, a welded assembly or a concrete floor to better than a factor of two, because the loss comes from **micro-slip at joints**, and the slip depends on the contact pressure, the amplitude and the history of the surfaces. Every handbook table of "typical damping ratios" — steel $0.01$, welded $0.025$, bolted $0.03$, concrete $0.05$, wood $0.015$ — is a summary of measurements on structures that were not yours. The corollary is that damping is the one parameter a designer should **specify a test for** rather than assume: assuming $2$ per cent for a structure that actually has $0.4$ per cent is a factor-of-five error in resonant stress, since the resonant amplitude is inversely proportional to $\zeta$, and structures have failed because a bolted joint that was $0.01$ when new had become $0.003$ after a season of fretting loosened it.
:::

## The viscous response

::: definition Damping ratio and the three regimes {#def-damping-ratio}
With $c_c = 2 m \omega_n = 2 \sqrt{k m}$ the **critical damping** and $\zeta = c / c_c$ the **damping ratio**, the free response of $m \ddot{x} + c \dot{x} + k x = 0$ is:
- **Underdamped** $\left( \zeta < 1 \right)$:
$$
x = X_0 e^{- \zeta \omega_n t} \cos \left( \omega_d t - \psi \right), \qquad
\omega_d = \omega_n \sqrt{1 - \zeta^{2}} ;
$$
- **Critically damped** $\left( \zeta = 1 \right)$: $x = \left( A + B t \right) e^{- \omega_n t}$, the fastest return with no overshoot;
- **Overdamped** $\left( \zeta > 1 \right)$: a sum of two decaying exponentials, slower than critical.
The **time constant** of the envelope is $1 / \zeta \omega_n$, and the amplitude falls to $1 / e$ in one time constant, to $1$ per cent in $4.6 / \zeta \omega_n$.
:::

::: theorem Logarithmic decrement {#thm-log-decrement}
The ratio of two successive peaks of an underdamped free response is constant and gives the damping directly:
$$
\delta = \ln \frac{x_1}{x_2} = \frac{2 \pi \zeta}{\sqrt{1 - \zeta^{2}}}
\approx 2 \pi \zeta \quad \left( \zeta < 0.1 \right),
\qquad
\zeta = \frac{1}{\sqrt{1 + \left( \frac{\pi}{\delta} \right)^{2}}} .
$$
More generally, over $n$ cycles $\delta = \left( 1 / n \right) \ln \left( x_1 / x_{n + 1} \right)$, which is the form used in practice because it averages the noise.
:::

::: proof The logarithmic decrement {#proof-log-decrement}
The envelope of the underdamped response is $X_0 e^{- \zeta \omega_n t}$, and successive peaks occur at times separated by the **damped** period $\tau_d = 2 \pi / \omega_d$. Taking two peaks at $t$ and $t + \tau_d$, the cosine factors are equal because the argument differs by exactly $2 \pi$, so
$$
\frac{x_1}{x_2} = \frac{X_0 e^{- \zeta \omega_n t}}{X_0 e^{- \zeta \omega_n \left( t + \tau_d \right)}}
= e^{\zeta \omega_n \tau_d}
= e^{\zeta \omega_n \cdot 2 \pi / \left( \omega_n \sqrt{1 - \zeta^{2}} \right)}
= e^{2 \pi \zeta / \sqrt{1 - \zeta^{2}}} .
$$
Taking logarithms gives $\delta$, and inverting,
$$
\delta^{2} \left( 1 - \zeta^{2} \right) = 4 \pi^{2} \zeta^{2}
\quad\Longrightarrow\quad
\zeta = \frac{\delta}{\sqrt{4 \pi^{2} + \delta^{2}}}
= \frac{1}{\sqrt{1 + \left( \pi / \delta \right)^{2}}} . \qquad \checkmark
$$
*Note.* The result is independent of the mass, the stiffness and the amplitude, which is why the decrement is the standard industrial measure of damping: it works on a full-size structure with no instrumentation beyond an accelerometer and no knowledge of the mass. It fails when the damping is not viscous, when two modes are close enough to beat, or when the record is too short to contain several cycles.
:::

::: example Damping from a ring-down {#ex-ringdown}
A machine foundation is struck with a hammer and its free decay is recorded. Two successive positive peaks are $180$ and $100\ \mu \mathrm{m}$. Find the damping ratio, and the number of cycles for the amplitude to fall to $1\ \mu \mathrm{m}$.
::: solution
$$
\delta = \ln \frac{180}{100} = 0.5878, \qquad
\zeta = \frac{0.5878}{\sqrt{4 \pi^{2} + 0.5878^{2}}} = 0.0931 ,
$$
so about $9.3$ per cent of critical — high for a bare foundation and typical of one resting on soil.
**Cycles to $1\ \mu \mathrm{m}$.** The amplitude ratio required is $180 / 1 = 180$, so
$$
n = \frac{\ln 180}{\delta} = \frac{5.193}{0.5878} = 8.8 \text{ cycles}.
$$
*Check.* The peaks decay as $e^{- \delta n} = e^{- 0.5878 n}$, and $e^{- 0.5878 \times 8.83} = 0.0056 = 1 / 180$ $\checkmark$

*Sanity.* Nine per cent of critical is enormous by structural standards — a welded steel frame would be $0.01$ — and it tells you the soil is doing the damping, which is exactly what a foundation wants and exactly what a precision measurement table does not. Note also how few cycles it takes: nine cycles to about half a per cent of the initial amplitude. A record that short is a trap, because a single bad peak ruins the decrement, which is why the standard practice is to measure over as many cycles as the record contains and to use the **slope of $\ln x$ against cycle number** rather than a single ratio.
:::
:::

::: widget plot
f: 180*exp(-0.5878*x)
x: 0, 10
y: 0, 190
labels: \text{peak amplitude } X \ \left( \mu\mathrm{m} \right)
caption: Peak amplitude of the ring-down of Example 1 against cycle number, the exponential envelope $180\,e^{-\delta n}$ (with $\delta \approx 2\pi\zeta$) of the $9.3$ per cent-damped foundation. The curve is drawn through the peaks only; the actual record oscillates about it, and the practical measurement is the slope of the **logarithm** of this curve, which is a straight line of slope $- \delta$ and is far less sensitive to a badly picked peak than any single ratio. Note how steeply the trace falls: at this damping the whole transient is over in under ten cycles, which is why a damped structure is easy to characterise and an undamped one — a large welded structure at half a per cent, where the same decay takes some $165$ cycles and the record must be long enough to see it — is not.
:::

::: proof Energy decay and the decrement {#proof-energy-decay}
The only force doing work in free vibration is the damper, so
$$
\frac{\mathrm{d} E}{\mathrm{d} t} = - c \dot{x}^{2} .
$$
Averaging over a cycle of $x = X \sin \omega_n t$, with $\langle \dot{x}^{2} \rangle = \omega_n^{2} X^{2} / 2$ and $E = \tfrac{1}{2} k X^{2}$,
$$
\left\langle \frac{\mathrm{d} E}{\mathrm{d} t} \right\rangle
= - c \omega_n^{2} \frac{X^{2}}{2}
= - \frac{c \omega_n^{2}}{k} E
= - 2 \zeta \omega_n E ,
$$
so the **energy** decays as $e^{- 2 \zeta \omega_n t}$ and the **amplitude**, being proportional to $\sqrt{E}$, as $e^{- \zeta \omega_n t}$ — which is the envelope of the exact solution, obtained here without solving the differential equation. $\checkmark$

*Note.* This is the most useful derivation in the subject, because it works for **any** damping law: replace $c \dot{x}^{2}$ by the actual power dissipated, average it, and read off the decay. It is also the reason the amplitude rather than the energy is what an accelerometer records, and why a $6\ \mathrm{dB}$ drop in the recorded **signal amplitude** ($20 \log_{10}$ of the ratio) corresponds to a halving of the amplitude, while the energy falls to a quarter.
:::

## Other damping models

::: proposition Coulomb, structural and hysteretic damping {#prop-damping-models}
- **Coulomb (dry friction) damping.** The amplitude decays **linearly**, by $4 \Delta$ per cycle with $\Delta = F_f / k$, and the motion stops dead within a finite number of cycles rather than asymptotically:
$$
X_n = X_0 - \frac{4 n F_f}{k}, \qquad
N_{\text{cycles}} = \frac{k X_0}{4 F_f} .
$$
The frequency is **unchanged** by Coulomb damping; only the amplitude decays.
- **Structural (hysteretic) damping.** The energy lost per cycle is proportional to the square of the amplitude and independent of frequency, $\Delta W = \psi \times \tfrac{1}{2} k X^{2}$, with the **loss factor** $\eta$ connected to the viscous ratio by $\eta = 2 \zeta$, so that the fractional energy loss per cycle is $\Delta W / W = 2 \pi \eta = 4 \pi \zeta$ and the **quality factor** is $Q = 1 / \eta = 1 / \left( 2 \zeta \right)$.
- **Equivalent viscous damping.** Any damping mechanism can be replaced at one frequency and one amplitude by a viscous damper dissipating the same energy per cycle, giving $\zeta_{\text{eq}} = \Delta W / \left( 2 \pi k X^{2} \right)$; for Coulomb damping this gives $\zeta_{\text{eq}} = 2 F_f / \left( \pi k X \right)$, which **depends on amplitude** — friction damps small motions proportionally harder than large ones.
:::

::: example Block with dry friction {#ex-coulomb}
A $5\ \mathrm{kg}$ block on a rough surface, $\mu = 0.1$, is attached to two springs of total stiffness $2000\ \mathrm{N / m}$ and released from $50\ \mathrm{mm}$. Find the decay and the time until the block stops.
::: solution
$$
\omega_n = \sqrt{\frac{2000}{5}} = 20\ \mathrm{rad / s}, \qquad
\tau = 0.314\ \mathrm{s}, \qquad
F_f = \mu m g = 0.1 \times 5 \times 9.81 = 4.905\ \mathrm{N},
$$
$$
\text{drop per half-cycle} = \frac{2 F_f}{k} = \frac{2 \times 4.905}{2000} = 4.91\ \mathrm{mm},
\qquad
\text{drop per cycle} = 9.81\ \mathrm{mm},
$$
$$
N \approx \frac{50}{9.81} = 5.10 \text{ cycles}.
$$
More exactly, the peaks after successive half-cycles are $50$, $45.1$, $40.2$, …, $10.8$, $5.9\ \mathrm{mm}$, and the tenth half-cycle ends at $0.95\ \mathrm{mm}$, inside the band $\left| x \right| \le F_f / k = 2.45\ \mathrm{mm}$ where the spring can no longer overcome friction. The block therefore stops after $10$ half-cycles ($5$ cycles), at $t = 10 \times 0.157 = 1.57\ \mathrm{s}$, $0.95\ \mathrm{mm}$ from the origin.
*Check.* The equivalent viscous ratio at the initial amplitude is
$$
\zeta_{\text{eq}} = \frac{2 F_f}{\pi k X_0} = \frac{2 \times 4.905}{\pi \times 2000 \times 0.05} = 0.0312 ,
$$
and it grows in inverse proportion to the amplitude — at the last peak, $5.9\ \mathrm{mm}$, it is **8.5 times larger** — which is why the linear Coulomb decay reaches zero in finite time while the equivalent-viscous exponential never does. $\checkmark$

*Sanity.* Five cycles and one and a half seconds, against the twenty or thirty cycles a viscous system of the same initial damping would take. The practical importance is that friction **kills small oscillations** outright, removing the last few per cent of ringing that a viscous damper only attenuates. It is also why a structure with loose bolted joints rings down with a **straight-line** envelope at small amplitudes rather than an exponential, and why a ring-down record that looks linear on a linear plot is the signature of joint slip rather than of a measurement error.
:::
:::

::: example Car suspension {#ex-car-suspension}
A car corner carries a sprung mass of $350\ \mathrm{kg}$ on a spring of $23.3\ \mathrm{kN / m}$ with a damper of $1716\ \mathrm{N\,s / m}$. Find the ride frequency, the damping ratio and the damped period.
::: solution
$$
\omega_n = \sqrt{\frac{23\,300}{350}} = 8.16\ \mathrm{rad / s}
= 1.30\ \mathrm{Hz}, \qquad
\delta_{\text{st}} = \frac{350 \times 9.81}{23\,300} = 147\ \mathrm{mm},
$$
$$
c_c = 2 m \omega_n = 2 \times 350 \times 8.16 = 5711\ \mathrm{N\,s / m}, \qquad
\zeta = \frac{1716}{5711} = 0.300 ,
$$
$$
\omega_d = 8.16 \sqrt{1 - 0.09} = 7.78\ \mathrm{rad / s}, \qquad
\tau_d = 0.807\ \mathrm{s}.
$$
*Sanity.* A $1.3\ \mathrm{Hz}$ ride frequency is the accepted compromise — the human body is most uncomfortable between $4$ and $8\ \mathrm{Hz}$, where the internal organs resonate, so the whole design aim is to keep the car's motion **below** that band. The damping ratio of $0.30$ is the standard "one-third of critical" of road vehicle practice, and it is a compromise of a different kind: at $\zeta = 0.3$ the transmissibility at $r = 1$ is $1.9$, against $3.5$ at $\zeta = 0.15$ and an unbounded peak with no damper, but the isolation above $\sqrt{2}$ times the natural frequency is measurably worse than at $\zeta = 0.15$. Doubling the damper to $\zeta = 0.6$ would control the body on a smooth road but would transmit more of the high-frequency road input to the passengers, which is why modern cars use **asymmetric** dampers — firmer in rebound than in compression, often with a progressive valve — rather than one number.
:::
:::

## Torsional free vibration

::: example Torsional ring-down {#ex-torsional-free}
A torsional pendulum consists of a disc of polar inertia $0.4\ \mathrm{kg\,m^{2}}$ on a steel shaft $20\ \mathrm{mm}$ in diameter and $600\ \mathrm{mm}$ long. The disc is twisted $10^{\circ}$ and released, and the amplitude after $20$ cycles is $2^{\circ}$. Find the period and the damping ratio.
::: solution
$$
J = \frac{\pi \times 0.02^{4}}{32} = 1.571 \times 10^{- 8}\ \mathrm{m^{4}}, \qquad
k_\theta = \frac{G J}{L} = \frac{80 \times 10^{9} \times 1.571 \times 10^{- 8}}{0.6}
= 2094\ \mathrm{N\,m / rad},
$$
$$
\tau = 2 \pi \sqrt{\frac{I}{k_\theta}} = 2 \pi \sqrt{\frac{0.4}{2094}} = 0.0868\ \mathrm{s} \quad \left( 11.5\ \mathrm{Hz} \right),
$$
$$
\delta = \frac{1}{20} \ln \frac{10}{2} = 0.0805, \qquad
\zeta = \frac{0.0805}{\sqrt{4 \pi^{2} + 0.0805^{2}}} = 0.0128 .
$$
*Check.* One point two eight per cent of critical is typical of a clean steel shaft in air with no external damper, where the only losses are material hysteresis and the bearing drag. $\checkmark$

*Sanity.* At $11.5\ \mathrm{Hz}$ the twenty cycles take under two seconds, so this arrangement is a convenient laboratory damping test, and the $1.3$ per cent is the number that makes torsional **material** damping interesting: at one per cent the resonant amplification is fifty, so a crankshaft's torsional stress at a firing-order resonance is fifty times its static value, and the small differences between one material and another — nodular versus grey cast iron, forged versus cast steel — translate directly into fatigue life. That is why large crankshafts are checked by **torsional vibration measurement** on the running engine as well as by calculation.
:::
:::

::: example Design {#ex-design-damping}
A $400\ \mathrm{kg}$ test rig is to be supported on four isolators with a target natural frequency of $8\ \mathrm{Hz}$ and a damping ratio of $0.15$. Specify the stiffness and the damping coefficient, and check the response to a step of $5\ \mathrm{mm}$ in the support.
::: solution
$$
\omega_n = 2 \pi \times 8 = 50.27\ \mathrm{rad / s}, \qquad
k_{\text{total}} = m \omega_n^{2} = 400 \times 2527 = 1.011 \times 10^{6}\ \mathrm{N / m},
$$
$$
k_{\text{per mount}} = 253\ \mathrm{kN / m}, \qquad
c_{\text{total}} = 2 \zeta m \omega_n = 2 \times 0.15 \times 400 \times 50.27 = 6033\ \mathrm{N\,s / m},
$$
$$
c_{\text{per mount}} = 1508\ \mathrm{N\,s / m}.
$$
**Static deflection.** $\delta_{\text{st}} = g / \omega_n^{2} = 9.81 / 2527 = 3.9\ \mathrm{mm}$.
**Step response.** A support step of $Y$ gives the mass a maximum displacement
$$
\frac{x_{\max}}{Y} = 1 + e^{- \pi \zeta / \sqrt{1 - \zeta^{2}}} = 1 + e^{- 0.477} = 1.62,
$$
so a $5\ \mathrm{mm}$ support step produces $8.1\ \mathrm{mm}$ of travel and the mounts must have at least that much available stroke plus a bump-stop allowance.

*Design comment.* Three millimetres nine of static deflection at $8\ \mathrm{Hz}$ is the number that decides the mount type: a rubber-metal isolator gives it easily, but a natural-rubber mount typically has a loss factor of $0.1$ to $0.2$ ($\zeta \approx 0.05$ to $0.1$), so $\zeta = 0.15$ needs a high-damping compound or a separate damper; a coil-spring or air mount has much less damping of its own. The step-response figure is the one that gets missed: a rig on isolators is a structure with a soft, tall support system, and if it is dropped onto its base or if the floor slab settles during grouting, the mass travels $1.6$ times the support movement and can go straight through the mount's static deflection into the bump stop. Every isolator specification should therefore state the **available stroke** and the **restraint** needed for handling, and rigs are routinely shipped with the isolators clamped or replaced by temporary rigid spacers so that the transport shock goes into the frame, not into the isolation.
:::
:::

::: example Q factor {#ex-q-factor}
A resonant structure loses half its vibration **amplitude** in fourteen cycles. Find its damping ratio, its loss factor, its quality factor and its fractional energy loss per cycle.
::: solution
$$
\delta = \frac{\ln 2}{14} = 0.04950, \qquad
\zeta = \frac{0.04950}{\sqrt{4 \pi^{2} + 0.04950^{2}}} = 0.00788 ,
$$
$$
\eta = 2 \zeta = 0.0158, \qquad
Q = \frac{1}{2 \zeta} = 63.5, \qquad
\frac{\Delta W}{W} = 1 - e^{- 4 \pi \zeta} = 0.094 .
$$
*Check.* Fourteen cycles at an energy loss of $9.4$ per cent per cycle leaves $0.906^{14} = 0.25$ of the energy, and $\sqrt{0.25} = 0.5$ of the amplitude $\checkmark$

*Sanity.* A quality factor of sixty-three is typical of a **lightly damped** welded structure; a quartz resonator or a precision-instrument suspension, by contrast, has $Q$ of ten thousand or more. The number that matters to a designer is $1 / \left( 2 \zeta \right) = 63.5$: that is the resonant amplification, and it means a force that would deflect the structure $1\ \mathrm{mm}$ statically deflects it $64\ \mathrm{mm}$ at resonance. Reading the same number as a **bandwidth** — the resonance is wide if $Q$ is low — is why $Q$ is quoted in acoustics, in electrical filters and in laser cavities, where the same physics appears as the width of a peak rather than the decay of a ring-down.
:::
:::

::: history
The **logarithmic decrement** predates the engineering subject; Rayleigh's *Theory of Sound* (1877–1878) uses it to infer damping from observed decays. **Coulomb**'s law of dry friction comes from his prize memoir on friction of 1781 (published 1785), and Den Hartog's 1931 paper on forced vibration with combined Coulomb and viscous friction, followed by his 1934 textbook *Mechanical Vibrations*, made the equivalent-viscous treatment standard. **Structural (hysteretic) damping**, a loss of a fixed fraction of strain energy per cycle independent of frequency, is written as a complex stiffness $k \left( 1 + i \eta \right)$; the model is convenient for harmonic analysis but does not describe a causal mechanism in the time domain, so it is used with care in transient analysis. Today the damping of materials is measured by standard tests such as the vibrating-beam method of ASTM E756, and that of structures by free decay or by the half-power bandwidth of measured resonances.
:::

## Where this leads

The forced response, the resonance peak and the half-power bandwidth method are in [[vibrations/harmonic-excitation]], the isolation and transmissibility consequences of the design example are in [[vibrations/isolation-transmissibility]], and the measurement of several modes from one ring-down is in [[vibrations/modal-analysis]]. The rotating-machinery case of Example 4 is in [[machine-design/shafts]].

::: summary
- The free response is set by one number, $\zeta = c / 2 \sqrt{k m}$; almost all structures lie between $0.001$ and $0.05$, and deliberately damped machines between $0.15$ and $0.4$.
- The logarithmic decrement gives $\zeta$ from two peaks with no knowledge of mass or stiffness, and is the industrial standard.
- Coulomb damping decays the amplitude **linearly** and stops in finite time; its equivalent viscous ratio depends on amplitude.
- Structural damping loses a fixed fraction of the strain energy per cycle, and is written as a complex stiffness $k \left( 1 + i \eta \right)$.
- Damping cannot be predicted for a built-up structure; it must be measured, and the resonant amplitude is inversely proportional to it.
- A step in the support produces $1 + e^{- \pi \zeta / \sqrt{1 - \zeta^{2}}}$ times the step in the mass, a factor of $1.6$ at $\zeta = 0.15$.
:::

::: quiz
A free-decay record of a structure shows that each peak is $96$ per cent of the one before it. The damping ratio is closest to:
- [ ] $0.004$
- [x] $0.0065$
- [ ] $0.04$
- [ ] $0.096$
::: solution
$\delta = \ln \left( 1 / 0.96 \right) = 0.0408$, and for small damping $\zeta \approx \delta / 2 \pi = 0.0065$. The trap in this question is treating the $96$ per cent as the damping ratio itself, or as a percentage loss of **energy** rather than of amplitude: the energy loss per cycle is $1 - 0.96^{2} = 7.8$ per cent, which is the specific damping capacity $\psi \approx 4 \pi \zeta$ and would give nearly the same answer, but the amplitude figure $0.96$ is neither $\zeta$ nor $\psi$. The other trap is the size of the number: six and a half tenths of a per cent sounds like nothing, and it means the resonant amplitude is $1 / \left( 2 \zeta \right) = 77$ times the static deflection. Structures at this level of damping are not marginally dangerous at resonance, they are catastrophically dangerous, and the whole of the design problem is to keep the excitation frequency away from the natural frequency rather than to hope the damping will save you.
:::
:::

## Exercises

::: exercise Damping ratio {level=1 check="0.0317"}
Two successive peaks of a free decay are in the ratio $1.22$. Find the damping ratio.
::: solution
$\delta = \ln 1.22 = 0.1989$,
$$
\zeta = \frac{0.1989}{\sqrt{4 \pi^{2} + 0.1989^{2}}} = 0.0317 .
$$
:::
:::

::: exercise Time constant {level=1 check="0.2"}
A system has $\omega_n = 20\ \mathrm{rad / s}$ and $\zeta = 0.25$. Find the time for the envelope to fall to $1 / e$ of its initial value.
::: solution
The time constant is $1 / \zeta \omega_n = 1 / 5 = 0.20\ \mathrm{s}$.
*Note.* The answer to enter is $0.20\ \mathrm{s}$.
:::
:::

::: exercise Critical damping {level=1 check="5711"}
Find the critical damping coefficient of a $350\ \mathrm{kg}$ mass on a spring of $23.3\ \mathrm{kN / m}$.
::: solution
$c_c = 2 \sqrt{k m} = 2 \sqrt{23\,300 \times 350} = 5711\ \mathrm{N\,s / m}$.
*Note.* The answer to enter is $5711\ \mathrm{N\,s / m}$.
:::
:::

::: exercise Number of cycles {level=2}
A system at $\zeta = 0.02$ is released and allowed to ring down. How many cycles does it take for the amplitude to fall to one per cent?
::: solution
$$
n = \frac{\ln 100}{2 \pi \zeta} = \frac{4.605}{2 \pi \times 0.02} = 37 \text{ cycles}.
$$
*Sanity.* Thirty-seven cycles is a long record, and at half a per cent it would be one hundred and fifty. This is the practical difficulty of measuring low damping: the record must be long, the amplifier must not drift, and the amplitude must stay large enough that the damping is not amplitude-dependent. It is why the **half-power bandwidth** method, which measures damping from the **width of the resonance peak** in forced vibration rather than from a decay, is preferred for lightly damped structures.
:::
:::

::: exercise Coulomb {level=2}
For the block of Example 2, what is the amplitude after three complete cycles, and what is the equivalent viscous damping ratio at that amplitude?
::: solution
$$
X_3 = 50 - 3 \times 9.81 = 20.6\ \mathrm{mm},
\qquad
\zeta_{\text{eq}} = \frac{2 F_f}{\pi k X_3} = \frac{2 \times 4.905}{\pi \times 2000 \times 0.0206} = 0.0758 .
$$
*Sanity.* The equivalent ratio has grown from $0.031$ to $0.076$ as the amplitude fell — friction damps proportionally harder as the motion gets smaller, which is exactly what you want in an instrument pointer and exactly what makes a lightly-loaded bolted joint damp more than a heavily-loaded one.
:::
:::

::: exercise Overdamped {level=2}
A door closer is required to return a door of moment of inertia $3\ \mathrm{kg\,m^{2}}$ with a torsional stiffness of $25\ \mathrm{N\,m / rad}$ in the shortest time without overshoot. Find the required damping coefficient and the time for the door to reach two per cent of its initial angle.
::: solution
Critical damping is required:
$$
c_c = 2 \sqrt{I k_\theta} = 2 \sqrt{3 \times 25} = 17.32\ \mathrm{N\,m\,s / rad},
\qquad \omega_n = \sqrt{\frac{25}{3}} = 2.887\ \mathrm{rad / s}.
$$
With $x = \theta_0 \left( 1 + \omega_n t \right) e^{- \omega_n t}$, solving $\left( 1 + u \right) e^{- u} = 0.02$ gives $u = 5.83$, so
$$
t = \frac{5.83}{2.887} = 2.02\ \mathrm{s}.
$$
*Sanity.* Two seconds is a brisk door; a fire-door closer is usually set nearer four seconds, which is done by making the closer **non-linear** — a small orifice that dominates at low velocity — rather than by increasing $c$, since a linear damper large enough to give four seconds would be so far overdamped that the door would crawl shut. Note also that critical damping is the fastest **linear** return but not the fastest possible: an open-loop optimal control would slam the door shut with a bang, which is precisely what a closer exists to prevent.
:::
:::

::: exercise Design {level=3}
A $2\ \mathrm{t}$ machine operating at $1500\ \mathrm{rpm}$ is to be isolated so that only five per cent of the disturbing force reaches the foundation. The measured damping ratio of the mount you have chosen is $0.2$. Find the required natural frequency and static deflection, and comment on whether the mount is suitable.
::: solution
**Frequency ratio.** With $\zeta = 0.2$ and $T = 0.05$,
$$
T = \frac{\sqrt{1 + \left( 2 \zeta r \right)^{2}}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}} = 0.05
\quad\Longrightarrow\quad r = 8.45 .
$$
**Natural frequency.** The operating frequency is $1500 / 60 = 25\ \mathrm{Hz}$, so
$$
f_n = \frac{25}{8.45} = 2.96\ \mathrm{Hz}, \qquad
\delta_{\text{st}} = \frac{g}{\left( 2 \pi f_n \right)^{2}} = \frac{9.81}{345.5} = 28.4\ \mathrm{mm}.
$$
**Comment.** Twenty-eight millimetres of static deflection is far beyond a plain rubber pad, which tops out near $5\ \mathrm{mm}$ before it creeps, and needs a moulded spring isolator, a wire-rope mount or an air spring. The damping of $0.2$ is what makes this specification so hard: with $\zeta = 0$ the same transmissibility needs only $r = 4.58$ and a static deflection of $8.3\ \mathrm{mm}$, so the damping has more than **tripled** the required deflection. The reason is that at large frequency ratio the transmissibility tends to $2 \zeta / r$, not to $1 / r^{2}$ — the damper force, which grows with $\zeta$, becomes the dominant transmitted force long before the spring term dies away. The design must also check the **starting transient**, when the machine runs through $f_n$ and the dynamic magnification is about $1 / \left( 2 \zeta \right) = 2.5$ — which is why every isolated machine needs travel restraints and a soft-start that runs through the resonance quickly.
:::
:::

::: exercise Derivation {level=3}
Show that the energy dissipated per cycle by a viscous damper is $\pi c \omega X^{2}$, deduce the equivalent viscous damping ratio of a Coulomb damper, and show that the free response of a Coulomb-damped system consists of half-cycles of constant frequency whose amplitudes decrease arithmetically.
::: solution
**Energy.** Over one cycle of $x = X \sin \omega t$,
$$
\Delta W = \oint c \dot{x} \, \mathrm{d} x
= \int_0^{\tau} c \dot{x}^{2} \, \mathrm{d} t
= c \omega^{2} X^{2} \int_0^{\tau} \cos^{2} \omega t \, \mathrm{d} t
= \pi c \omega X^{2} .
$$
A viscous damper with ratio $\zeta$ therefore dissipates $\Delta W = 2 \pi \zeta k X^{2}$ per cycle, which inverts to $\zeta = \Delta W / \left( 2 \pi k X^{2} \right)$ and, for $\Delta W = \pi c \omega X^{2}$ with $\omega = \omega_n$, recovers $\zeta = c / c_c$.
**Coulomb equivalence.** A dry friction force $F_f$ dissipates $4 F_f X$ per cycle (constant force, four strokes of length $X$), so
$$
\zeta_{\text{eq}} = \frac{\Delta W}{2 \pi k X^{2}} = \frac{4 F_f X}{2 \pi k X^{2}} = \frac{2 F_f}{\pi k X} .
$$
**Half-cycle solution.** While the block moves in the $+ x$ direction the equation is
$$
m \ddot{x} + k x = - F_f ,
$$
whose solution about the shifted centre $x = - F_f / k$ is simple harmonic at the **unchanged** frequency $\omega_n$. The block reverses when the velocity vanishes, and by the symmetry of the half-cycle about the shifted centre the reversal points are symmetric about $- F_f / k$, so consecutive turning points on the same side differ by $4 F_f / k$ per full cycle. Motion ceases when the spring force at a turning point can no longer overcome friction, that is when
$$
k \left| X_n \right| \le F_f ,
$$
which happens after $N = \left\lceil \left( k X_0 - F_f \right) / 4 F_f \right\rceil$ cycles, and the block comes to rest **not at the origin** but at whatever position it reached when the spring force fell below the static friction.

*Comment.* That last clause is the whole practical content: a friction-damped system does not return to zero, and the residual offset can be as much as $F_f / k$ — the **static displacement** of the friction force. In a structure with joint friction this appears as a permanent set after a large-amplitude event, and it is one of the diagnostic signatures of a loose connection: a frame that has been shaken and does not return to its original alignment.
:::
:::
