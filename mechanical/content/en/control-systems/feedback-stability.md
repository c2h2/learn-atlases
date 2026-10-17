Feedback is the only idea in engineering that makes a machine behave in a way its parts do not: a steam engine with a flyball, a thermostat with a bimetal strip and a missile with an inertial platform all regulate themselves, and all of them can be made to oscillate by the same act of regulation. Stability is therefore not a property of the plant but of the **loop**, and the whole of classical stability theory is the study of one equation, $1 + L (s ) = 0$.

Three quantities organise the subject. The **loop gain** $L = G_C G$ is the thing that is designed and the thing that is measured. The **sensitivity function** $S = 1 / \left( 1 + L \right)$ is the price of everything: it is the factor by which feedback shrinks plant error, disturbance and drift, and by the same token the factor by which it fails to shrink them at the frequencies where $L$ is small. And the **characteristic equation** decides whether there is a loop at all — a feedback system whose $1 + L$ has a right-half-plane zero is not a slow controller but an oscillator, and no amount of good intention changes that.

::: warning Feedback cannot help where the loop gain is small, and it must not be asked to
The sensitivity function is $S = 1 / \left( 1 + L \right)$, so feedback improves things by the factor $1 + L$ and improves nothing where $\left| L \right|$ is near unity or below. At frequencies above the crossover the loop is open and the plant is on its own, which is why an unmodelled flexible mode at three times the crossover is transmitted to the output untouched, why a sensor's high-frequency noise passes straight to the actuator, and why the phrase "we will close the loop around it" is not a design. The corollary is the harder one: $S$ is **greater** than one somewhere, always, because $S$ tends to one at infinity and below one wherever the loop works, so by continuity there is a frequency at which feedback makes things actively worse than no feedback at all. That frequency is the sensitivity peak, it is where a lightly damped closed-loop mode lives, and it is where an unmodelled resonance will do its damage.
:::

## Loop gain, sensitivity and the characteristic equation

::: definition Sensitivity and complementary sensitivity {#def-sensitivity}
For a loop with forward path $G_C G = L$, a disturbance $d$ at the plant output and a measurement noise $n$ at the sensor,
$$
y = T r + S G d - T n,
\qquad
T = \frac{L}{1 + L}, \qquad
S = \frac{1}{1 + L},
\qquad S + T = 1 .
$$
$S$ is the **sensitivity**: the transfer function from command and disturbance to error, and the factor by which feedback attenuates plant-parameter error,
$$
\frac{\mathrm{d} T / T}{\mathrm{d} G / G} = \frac{1}{1 + L} = S .
$$
$T$ is the **complementary sensitivity**: the closed-loop transfer function and the path by which sensor noise reaches the output. Both are frequency functions, and $S + T = 1$ at every frequency.
:::

::: proof The sensitivity integral and the waterbed {#proof-waterbed}
Suppose the loop is stable, that $L$ has no poles in the closed right half-plane other than possibly at the origin, and that $L$ falls off faster than $1 / s$ so that $S$ tends to one at infinity. Then $\ln S$ is analytic in the open right half-plane, and the Jensen formula applied to it — the mean of $\ln \left| S \right|$ on a large imaginary-axis semicircle equals $\pi$ times the sum of its real parts at the zeros inside — gives **Bode's sensitivity integral**
$$
\int_0^{\infty} \ln \left| S \left( \mathrm{i} \omega \right) \right| \mathrm{d} \omega
= \pi \sum_{i} p_i ,
$$
where the $p_i$ are the open-loop **unstable poles**. For a stable plant the integral is zero, so
$$
\int_0^{\infty} \ln \left| S \right| \mathrm{d} \omega = 0 ,
$$
and since $\ln \left| S \right|$ is negative wherever feedback helps, it must be positive somewhere else: **attenuation bought at one frequency is paid for by amplification at another**. $\checkmark$

*Note.* Three features of the integral decide how it bites. It is an integral of the **logarithm**, so a narrow deep notch buys a wide shallow bump rather than the other way round, and the designer's freedom is in the shape and not the area. It is unweighted for a stable plant but **weighted** by $\ln \left| \left( \mathrm{i} \omega + p \right) / \left( \mathrm{i} \omega - p \right) \right|$ for each unstable pole $p$ of the plant, and that weight decays to zero once $\omega$ exceeds $p$ — so an unstable pole can only be helped over a band below its own rate, and the area that must be pushed elsewhere grows with it. And it is an integral over an **infinite** band, so if the designer's authority ends at $100\ \mathrm{rad / s}$ and the plant has a resonance at $1000$, the hump is not optional. The integral is the reason the phrase "gain and phase margin" is not enough and the sensitivity peak $M_s = \max_\omega \left| S \right|$ is quoted instead: $M_s$ is the height of the hump, and a design with $M_s$ above about $1.4$ has bought its speed with a closed-loop ringing that shows up as a $3\ \mathrm{dB}$ amplification of disturbances at the peak frequency. The companion quantity is the resonant peak $M_r$ of the closed-loop magnitude, and for the standard second-order loop $M_r = 1 / \left( 2 \zeta \sqrt{1 - \zeta^{2}} \right)$, which is the curve plotted below.
:::

::: definition The characteristic equation and the Routh test {#def-routh}
The closed loop is stable if and only if $1 + L (s ) = 0$ has no root in the closed right half-plane. Writing the characteristic polynomial as
$$
a_n s^{n} + a_{n - 1} s^{n - 1} + \cdots + a_1 s + a_0,
$$
a **necessary** condition is that all coefficients be present and of one sign. The **Routh array** is constructed by writing the coefficients in two rows and generating the rest by
$$
\begin{array}{c|ccc}
s^{n} & a_n & a_{n - 2} & a_{n - 4} \\
s^{n - 1} & a_{n - 1} & a_{n - 3} & a_{n - 5} \\
s^{n - 2} & b_1 & b_2 & \\
\vdots & & &
\end{array}
\qquad
b_1 = \frac{a_{n - 1} a_{n - 2} - a_n a_{n - 2 - 1}}{a_{n - 1}} ,
$$
and the system is stable if and only if the **first column has no sign change**; the number of sign changes is the number of right-half-plane roots.
:::

::: proof Routh's criterion for the cubic {#proof-routh}
For $p (s ) = s^{3} + a_1 s^{2} + a_2 s + a_3$ the array is
$$
\begin{array}{c|cc}
s^{3} & 1 & a_2 \\
s^{2} & a_1 & a_3 \\
s^{1} & \left( a_1 a_2 - a_3 \right) / a_1 & 0 \\
s^{0} & a_3 &
\end{array}
$$
and with $a_1 > 0$ the first column is positive if and only if $a_3 > 0$ and $a_1 a_2 > a_3$. $\checkmark$
The result has an interpretation better than the algebra. Suppose the boundary case $a_1 a_2 = a_3$ and factor
$$
s^{3} + a_1 s^{2} + a_2 s + a_1 a_2
= \left( s + a_1 \right)\left( s^{2} + a_2 \right),
$$
which has a pair of roots at $\pm \mathrm{j} \sqrt{a_2}$. The stability boundary is therefore crossed through a **pair of purely imaginary roots at $\omega = \sqrt{a_2}$**, never through a single root, and the frequency at which the loop goes unstable is determined by the coefficients and not by the gain that got it there.
:::

::: widget plot
f: x => 1/(2*x*Math.sqrt(1-x*x))
x: 0.15, 0.95
y: 0.95, 3.0
n: 300
labels: Mr
caption: Resonant peak of the closed-loop magnitude against damping ratio for the standard second-order loop. The minimum of 1.0 occurs at a damping ratio of 0.707 and the peak rises steeply on both sides, to 2.5 at a damping ratio of 0.2 and to 1.3 at 0.9. The peak is the height of the closed-loop bump, it is directly the amplification a disturbance at that frequency receives, and it is measurable from a Nyquist plot as the reciprocal of the shortest distance from the critical point to the curve, which is why it is quoted as a design target in preference to a damping ratio the designer never measured.
:::

::: example How much feedback buys {#ex-gain-error}
A plant's gain is $5 \pm 50$ per cent. It is placed in a unity loop with a controller of gain $K = 4$. Find the nominal closed-loop gain and the spread caused by the plant tolerance.
::: solution
$$
L_0 = K G_0 = 20, \qquad
T = \frac{L}{1 + L} = \frac{20}{21} = 0.952,
\qquad
S = \frac{1}{21} = 0.048 .
$$
At the low end $L = 10$, $T = 10 / 11 = 0.909$; at the high end $L = 30$, $T = 30 / 31 = 0.968$. The closed-loop gain therefore lies between $0.909$ and $0.968$, a spread of $\pm 3.1$ per cent against the plant's $\pm 50$ per cent.

*Check.* The sensitivity prediction gives $\Delta T / T = S \times \Delta G / G = 0.048 \times 0.50 = 2.4$ per cent against the exact $3.1$ per cent; the difference is the second-order term, which is the right size at $S \times 0.5 = 0.024$. $\checkmark$

*Sanity.* Fifty per cent of plant uncertainty for three per cent of closed-loop uncertainty is what twenty of loop gain buys, and the arithmetic generalises exactly: to hold a closed-loop gain to one per cent needs a loop gain of ninety-nine at the frequencies that matter. That single sentence is most of the design specification in industry, and it is why precision machines have high-gain amplifiers and precision processes have cascade loops — but also why the loop gain cannot simply be raised, because the same $L$ that shrinks $S$ drags the crossover up into the plant's resonances, where $S$ is no longer small. The trade is not a matter of taste; it is the integral of the previous proof.
:::
:::

::: example The Routh range {#ex-routh3}
A plant $G = 1 / \left[ s \left( s + 1 \right)\left( s + 5 \right) \right]$ is controlled by a proportional gain $K$. Find the range of $K$ for stability and the frequency of the marginal oscillation.
::: solution
$$
s^{3} + 6 s^{2} + 5 s + K = 0,
\qquad
a_1 a_2 > a_3 \;\Longrightarrow\; 6 \times 5 > K ,
$$
so the loop is stable for $0 < K < 30$. At $K = 30$ the auxiliary polynomial from the $s^{2}$ row is
$$
6 s^{2} + 30 = 0 \quad\Longrightarrow\quad s = \pm 2.236\ \mathrm{j},
$$
so the marginal oscillation is at $2.24\ \mathrm{rad / s}$, a period of $2.8\ \mathrm{s}$.

*Check.* Substituting $s = \mathrm{j} \omega$ into $1 + K / \left[ s \left( s + 1 \right)\left( s + 5 \right) \right] = 0$ requires the imaginary part of $\left( \mathrm{j} \omega + 1 \right)\left( \mathrm{j} \omega + 5 \right) \mathrm{j} \omega$ to vanish, giving $\omega^{2} = 5$ and then $K = 6 \times 5 = 30$ $\checkmark$

*Sanity.* The frequency of marginal stability is set by the **plant's** poles and not by the gain, which is why the oscillation observed when a loop is pushed to instability is a diagnostic of the plant: an engineer who watches a loop break into oscillation and counts the period has measured $\omega_{pc}$ and can compute the ultimate gain from the amplitude alone. This is exactly what **Ziegler and Nichols**' 1942 tuning rule exploits, and it is the reason the rule needs no model of the plant at all — push the loop to sustained oscillation, read off the ultimate gain $K_u$ and period $P_u$, and set the controller from those two numbers.
:::
:::

::: example Integral action can destabilise a stable plant {#ex-integral-destab}
A plant $G = 1 / \left[ \left( s + 1 \right)\left( s + 2 \right) \right]$ is stable and easy to control with proportional action. Find the integral gain at which proportional-plus-integral control becomes unstable.
::: solution
With $C = K / s$,
$$
1 + \frac{K}{s \left( s + 1 \right)\left( s + 2 \right)} = 0
\quad\Longrightarrow\quad
s^{3} + 3 s^{2} + 2 s + K = 0 ,
$$
$$
a_1 a_2 > a_3 \;\Longrightarrow\; 3 \times 2 > K
\quad\Longrightarrow\quad
K < 6,
$$
with marginal oscillation at $\omega = \sqrt{a_2} = 1.41\ \mathrm{rad / s}$.

*Sanity.* The plant is stable for every proportional gain and unstable for a sufficiently large integral gain, which is the single most useful fact in practical tuning and the explanation for a great deal of industrial suffering: integral action is added to remove an offset, the loop goes into a slow oscillation, the integral is turned down until the oscillation stops, and the offset is still there because the integral time is now too long. The arithmetic says exactly what to expect — the integral gain may be raised only to two-thirds of the value that oscillates, and the oscillation frequency tells you the period the integral time must be long compared with, which is why the rule of thumb is an integral time of at least the oscillation period, $4.4\ \mathrm{s}$ here.
:::
:::

::: example An unstable plant {#ex-inverted}
An inverted pendulum has the linearised model $G = 1 / \left( s^{2} - 1 \right)$. Show that proportional feedback cannot stabilise it and that proportional-plus-derivative can.
::: solution
**Proportional.** $s^{2} - 1 + K = s^{2} + \left( K - 1 \right)$ has no $s$ term, so the necessary condition fails for every $K$: the roots are real for $K < 1$ and on the imaginary axis for $K > 1$. The system is at best marginally stable, and marginally stable with a **repeated** root at the origin when $K = 1$, which is instability in all but name.
**Proportional plus derivative.** With $C = K_p + K_d s$,
$$
s^{2} + K_d s + \left( K_p - 1 \right) = 0
\quad\Longrightarrow\quad
K_d > 0, \quad K_p > 1 ,
$$
which is a two-sided inequality with room in it, so the loop is stabilisable and can be placed anywhere in the left half-plane.

*Sanity.* The mechanism is worth naming precisely, because it recurs everywhere from maglev to grid frequency control: proportional feedback supplies a force proportional to **position**, and an unstable plant needs a force proportional to **velocity** to remove energy from the unstable mode. Derivative feedback supplies it, and the derivative is therefore not a refinement but a necessity. The same argument in the frequency domain is that an unstable plant contributes two right-half-plane poles and $180^{\circ}$ of phase at low frequency, so the loop must recover phase before the crossover — which is what a derivative, a lead network or a state estimator does, and what no amount of plain gain can.
:::
:::

::: example A loop with dead time {#ex-deadtime}
A temperature loop has $G = e^{- 15 s} / \left( 60 s + 1 \right)$. Find the ultimate gain and period, and tune a proportional-plus-integral controller.
::: solution
The phase crosses $- 180^{\circ}$ when $\arctan \left( 60 \omega \right) + 15 \omega = \pi$, giving
$$
\omega_{pc} = 0.114\ \mathrm{rad / s}, \qquad
P_u = \frac{2 \pi}{\omega_{pc}} = 55\ \mathrm{s}.
$$
At that frequency $\left| G \right| = 1 / \sqrt{1 + \left( 60 \omega_{pc} \right)^{2}} = 0.144$, so
$$
K_u = \frac{1}{\left| G \right|} = 6.9 .
$$
**Ziegler-Nichols** proportional-plus-integral settings:
$$
K_c = 0.45 K_u = 3.1, \qquad
T_i = \frac{P_u}{1.2} = 46\ \mathrm{s}.
$$
*Check.* The alternative formula $K_c = 0.9 \tau / \left( K \theta \right) = 0.9 \times 60 / 15 = 3.6$ with $T_i = 3.33 \theta = 50\ \mathrm{s}$ agrees within fifteen per cent, which is the accuracy these rules actually have. $\checkmark$

*Sanity.* The dead time of fifteen seconds against a time constant of sixty is what limits the loop: with no dead time the ultimate gain would be infinite, because a first-order plant cannot contribute $180^{\circ}$, and the whole of the achievable gain is created by the delay. The ratio $\theta / \tau = 0.25$ is the number to remember, and the practical consequence is that the closed-loop time constant cannot be pushed much below the dead time — here about $20\ \mathrm{s}$ against a process that takes $60\ \mathrm{s}$ to settle on its own. A process engineer who can halve the dead time by moving the sensor has done more than any control engineer can do with the controller.
:::
:::

::: example Design {#ex-design-loop}
A reflow oven must hold $180\,^{\circ}\mathrm{C}$ to $\pm 2\ \mathrm{K}$ against a $\pm 20$ per cent change in the board's heat load. The heater-to-air transfer function is $G = 0.8\, e^{- 8 s} / \left( 45 s + 1 \right)$ and the thermocouple adds a further $5\ \mathrm{s}$ of lag. Design the loop.
::: solution
**Lump the lags.** The sensor lag is a first-order lag and the heater's transport is a delay; combining them into an effective delay of $8 + 5 / 3 = 9.7\ \mathrm{s}$ is the standard and slightly optimistic treatment, so take $\theta = 12\ \mathrm{s}$, $\tau = 45\ \mathrm{s}$, $K = 0.8$:
$$
\frac{\theta}{\tau} = 0.27, \qquad
\omega_{pc} = 0.144\ \mathrm{rad / s}, \qquad
K_u = 8.2, \qquad
P_u = 44\ \mathrm{s}.
$$
**Requirement.** A $\pm 2\ \mathrm{K}$ error against a $\pm 20$ per cent load change means a disturbance sensitivity $\left| S \right| G_d \le 2\ \mathrm{K}$. The load enters as a heat-loss term worth about $- 1.5\ \mathrm{K}$ per per cent of board loading, so $20$ per cent is $30\ \mathrm{K}$, and
$$
\left| S \right| \le \frac{2}{30} = 0.067
\quad\Longrightarrow\quad
\left| L \right| \ge 14
\quad\text{over the disturbance band} .
$$
**Design.** Ziegler-Nichols gives $K_c = 0.45 K_u = 3.7$ and $T_i = P_u / 1.2 = 36\ \mathrm{s}$; detuning the proportional term by thirty per cent for margin leaves $K_c = 2.6$, $T_i = 40\ \mathrm{s}$. The crossover then falls at $0.045\ \mathrm{rad / s}$, where the twelve-second delay contributes $31^{\circ}$ of phase lag, and the loop gain exceeds the required $14$ only below $0.0037\ \mathrm{rad / s}$ — periods longer than half an hour.

*Design comment.* The specification is a **disturbance-rejection** specification over a band, not a setpoint-tracking specification, and that distinction changes the design: the integral time must be long compared with the disturbance's own timescale so that the loop gain is high where the disturbance has energy, and the crossover must stay a factor of three below the delay's corner at $1 / \theta = 0.083\ \mathrm{rad / s}$. Those two requirements leave a narrow window, and the design sits in it — but the arithmetic has just shown that load changes faster than half an hour are only partly rejected, so a step change in board loading will produce a transient well outside $\pm 2\ \mathrm{K}$ before the integral pulls it back. That is the real limitation, and it is not fixable by tuning. the real fix on an oven of this kind is a **feedforward** path from the board-loading signal, which is measurable and large, so that the feedback loop only has to mop up the residue — and the arithmetic of the previous lesson applies, namely that the feedforward must invert a plant with a delay and therefore cannot be perfect, only much better than nothing.
:::
:::

::: history
The question of when a feedback system is stable was first posed by **James Clerk Maxwell** in his 1868 paper *"On governors"*, which examined the characteristic equation of a flyball governor and observed that stability requires the roots of a polynomial to have negative real parts — the first stability criterion, though incomplete, since Maxwell did not know how to decide the question in general. **Edward Routh** supplied the answer in 1876 in a paper to the Philosophical Transactions, and **Adolf Hurwitz** gave the equivalent determinant form in 1895; **A. Liénard** and **M. H. Chipart**'s 1914 reformulation is the version most textbooks print. **Lyapunov**'s 1892 Kharkov thesis put stability on its modern footing but was unread in the West for sixty years. The frequency-domain answer is **Harry Nyquist**'s 1932 Bell System Technical Journal paper, which turned the question into a geometric winding test on a plotted curve and made stability something an engineer could see; **Hendrik Bode**'s 1945 *Network Analysis and Feedback Amplifier Design* gave the integral relations, including the waterbed theorem of the first proof, in a form engineers could use, and **Bode**'s relations between magnitude and phase made the sensitivity trade quantitative. The **sensitivity integral** in its modern weighted form is due to **Bode**, to **McFarlane** and to **Zames** in the 1960s, and the language of the sensitivity peak $M_s$ as a design target rather than a diagnostic belongs to the robust-control literature of the 1980s, in particular to **Doyle** and **Stein**'s work on what a design's margins actually mean.
:::

::: quiz
A loop's sensitivity function satisfies $\left| S \right| < 1$ over a wide band. What does Bode's sensitivity integral say about the rest of the frequency range?
- [ ] Nothing, because the integral applies only to unstable plants
- [x] $\left| S \right|$ must exceed one somewhere, by an area that balances the attenuation
- [ ] $\left| S \right|$ must return to one and stay there
- [ ] The loop gain must be raised at high frequency
::: solution
For a stable plant the integral of $\ln \left| S \right|$ over all frequency is exactly zero, so the negative area where feedback helps is balanced by positive area where feedback hurts. The designer chooses where the hump goes but not whether there is one. This is why a loop made fast at low frequency necessarily becomes transparent to disturbances and noise at high frequency, and why the sensitivity peak $M_s$ — the height of the hump — is a design target rather than an accident.
:::
:::

## Where this leads

The loop gain and its crossover are constructed graphically in [[control-systems/root-locus]] and read from Bode and Nyquist plots in [[control-systems/frequency-response]], the steady-state consequences of the sensitivity function are the error constants of [[control-systems/time-response]], the integral action whose destabilising effect is computed above is tuned in [[control-systems/pid-control]], and the resonances that limit the crossover are those of [[vibrations/harmonic-excitation]] and [[vibrations/two-degrees-of-freedom]].

::: summary
- Stability is a property of the loop, not of the plant, and is decided by the roots of $1 + L(s) = 0$.
- The sensitivity function $S = 1 / (1 + L)$ is the single number that says how much feedback is buying: plant error, disturbance and drift are all shrunk by $S$.
- $S + T = 1$ at every frequency and the sensitivity integral forces amplification somewhere, so feedback is a reallocation of performance across frequency and never a creation of it.
- The Routh array decides stability from the coefficients alone, and its boundary case factors into a real pole times a pure imaginary pair — loops go unstable through oscillation, at a frequency the plant sets.
- Integral action can destabilise a plant that is stable under proportional control, and the oscillation period it produces tells you the integral time to use.
- An unstable plant needs derivative or state feedback because proportional action supplies no damping; no gain alone can stabilise a double right-half-plane pole.
:::

## Exercises

::: exercise Sensitivity {level=1 check="0.1"}
What is the sensitivity of a loop with a loop gain of $9$?
::: solution
$1 / \left( 1 + 9 \right) = 0.1$.
:::
:::

::: exercise Sum {level=1 check="1"}
What is $S (s ) + T (s )$ at every frequency?
::: solution
One.
:::
:::

::: exercise Necessary condition {level=1 check="0"}
What is wrong with $s^{3} + 2 s^{2} + 4$ as a characteristic polynomial?
::: solution
The $s$ term is missing, so the necessary condition fails and there is a right-half-plane root.
:::
:::

::: exercise Cubic {level=1 check="12"}
For $s^{3} + 4 s^{2} + 3 s + K$, what is the largest value of $K$ for stability?
::: solution
$a_1 a_2 > a_3$ gives $4 \times 3 > K$, so the marginal value is $K = 12$.
:::
:::

::: exercise Sensitivity {level=2}
A loop has a DC loop gain of $200$. Find the steady offset for a plant whose gain is ten per cent low, and the loop gain needed for a $0.5$ per cent closed-loop gain error.
::: solution
$$
e \approx \frac{1}{1 + 200} \times 0.10 = 5.0 \times 10^{- 4}, \qquad
L = \frac{1}{0.005} - 1 = 199 .
$$
*Sanity.* A DC loop gain of two hundred is a large but ordinary number for a temperature or level loop and gives a tenth-of-a-per-cent insensitivity to the plant's own gain error. The catch is that the loop gain of two hundred must exist at the frequencies where the error matters, which for a slowly varying offset means at DC and below — and this is exactly what integral action provides, at the cost of the phase lag that makes the loop slow. The trade between the DC loop gain and the crossover frequency is the whole of the PID designer's life.
:::
:::

::: exercise Routh {level=2}
Find the range of $K$ for which $s^{4} + 3 s^{3} + 3 s^{2} + 2 s + K$ is stable.
::: solution
The array's first column is $1$, $3$, $\left( 3 \times 3 - 1 \times 2 \right) / 3 = 7 / 3$, $\left( \tfrac{7}{3} \times 2 - 3 K \right) / \tfrac{7}{3} = 2 - 9 K / 7$, and $K$, so stability requires
$$
K > 0, \qquad 2 - \frac{9 K}{7} > 0
\quad\Longrightarrow\quad
0 < K < 1.56 .
$$
At $K = 14 / 9$ the auxiliary polynomial from the $s^{2}$ row is $\frac{7}{3} s^{2} + \frac{14}{9} = 0$, giving $\omega = 0.816\ \mathrm{rad / s}$.
*Sanity.* A fourth-order array takes two minutes to build and gives an exact answer, which is why the test survived into the digital age for checking designs by hand. Its limitation is that it answers only the stability question and not the quality question — a system can pass the test with a pair of roots a tenth from the axis and be useless — which is why the margins of the next lesson are what designers actually specify.
:::
:::

::: exercise Destabilisation {level=2}
A plant $1 / \left[ s \left( s + 2 \right) \right]$ is controlled by $K / s$. Find the range of $K$ and the marginal frequency.
::: solution
$$
s^{2} + 2 s + K = 0
\quad\Longrightarrow\quad
K > 0 \text{ for stability, with no upper bound,}
$$
and the loop is stable for every positive $K$, with $\omega_n = \sqrt{K}$ and $\zeta = 1 / \sqrt{K}$.
*Sanity.* Here integral action cannot destabilise the loop, because the closed loop is only second order — but it destroys the damping as the gain rises, and a designer who turns up the integral gain to remove an offset gets an increasingly oscillatory response and concludes that integral action "makes the loop ring". That is exactly what it does here, and the fix is not less integral action but derivative action or a cascade loop, because the damping ratio of a second-order loop with a fixed plant is fixed by the same knob that sets its speed.
:::
:::

::: exercise Marginal frequency {level=3}
For the plant of Example 2 with a **derivative** term, $C = K \left( 1 + T_d s \right)$, show that the loop can be stabilised for gains above $30$ and find the range of $T_d$ that does so.
::: solution
$$
s^{3} + 6 s^{2} + \left( 5 + K T_d \right) s + K = 0
\quad\Longrightarrow\quad
6 \left( 5 + K T_d \right) > K
\quad\Longrightarrow\quad
T_d > \frac{K - 30}{6 K} .
$$
For $K = 100$ this requires $T_d > 0.117\ \mathrm{s}$, and for $K = 30$ any positive $T_d$ works.
*Sanity.* The derivative has extended the stabilising gain range without limit, which is the derivative term's entire contribution to stability: it adds a term to the $s$ coefficient, and the $s$ coefficient is the one that appears in the damping. The catch, which the arithmetic hides, is that a derivative amplifies noise at high frequency without bound, so the real controller has a filtered derivative and the filter rolls the phase lead back off again above about ten times the crossover — which is why derivative action helps a slow process and does nothing for a fast one.
:::
:::

::: exercise Integral {level=3}
For the plant of Example 3, find the proportional-plus-integral settings that give $\zeta = 0.7$ and check them against the stability limit.
::: solution
With $C = K_c \left( 1 + 1 / T_i s \right)$,
$$
s^{3} + 3 s^{2} + \left( 2 + K_c \right) s + \frac{K_c}{T_i} = 0 .
$$
Matching $s^{3} + 3 s^{2} + \left( 2 + K_c \right) s + K_c / T_i$ to $\left( s + p \right)\left( s^{2} + 1.4 s + 1 \right) = s^{3} + \left( p + 1.4 \right) s^{2} + \left( 1.4 p + 1 \right) s + p$ gives
$$
p = 1.6, \qquad K_c = 1.4 p + 1 - 2 = 1.24, \qquad
T_i = \frac{K_c}{p} = 0.775\ \mathrm{s}.
$$
*Sanity.* The integral gain $K_c / T_i = 1.6$ is a quarter of the stability limit of $6$, which is the usual margin, and the third closed-loop pole at $- 1.6$ sits close to the plant's own pole at $- 2$ — not a coincidence, since the integral action has largely cancelled one of the plant's lags. The design is only as good as that cancellation, which is why model-based pole placement is out of favour in process control: a plant whose pole moves ten per cent moves the closed-loop poles with it, and the Ziegler-Nichols settings of the previous example, though cruder on paper, are far less sensitive to the model being wrong.
:::
:::

::: exercise Derivation {level=3}
Show that the resonant peak of the standard second-order closed-loop magnitude is $M_r = 1 / \left( 2 \zeta \sqrt{1 - \zeta^{2}} \right)$, and evaluate it for $\zeta = 0.5$ and $\zeta = 0.707$.
::: solution
With $T = \omega_n^{2} / \left( s^{2} + 2 \zeta \omega_n s + \omega_n^{2} \right)$,
$$
\left| T \left( \mathrm{i} \omega \right) \right|^{2}
= \frac{\omega_n^{4}}{\left( \omega_n^{2} - \omega^{2} \right)^{2} + 4 \zeta^{2} \omega_n^{2} \omega^{2}} ,
$$
whose denominator, written in $x = \omega^{2} / \omega_n^{2}$, is $\omega_n^{4} \left[ \left( 1 - x \right)^{2} + 4 \zeta^{2} x \right]$. Minimising the bracket,
$$
\frac{\mathrm{d}}{\mathrm{d}x} \left[ \left( 1 - x \right)^{2} + 4 \zeta^{2} x \right] = - 2 \left( 1 - x \right) + 4 \zeta^{2} = 0
\quad\Longrightarrow\quad
x = 1 - 2 \zeta^{2},
$$
which is a positive frequency only for $\zeta < 1 / \sqrt 2$. Substituting,
$$
M_r = \frac{1}{2 \zeta \sqrt{1 - \zeta^{2}}}
\quad\Longrightarrow\quad
M_r = 1.15 \ \left( \zeta = 0.5 \right), \qquad
M_r = 1.00 \ \left( \zeta = 0.707 \right) . \quad \checkmark
$$
*Sanity.* Two facts fall out. The peak exists only below $\zeta = 1 / \sqrt{2}$, so a design damped above seventy per cent has no resonance to worry about and no bump in its magnitude plot — which is the reason $\zeta = 0.7$ is called "optimal" in so many textbooks, being simultaneously the maximally flat magnitude response and the boundary of resonant behaviour. And $M_r$ is the reciprocal of the shortest distance from the critical point to the Nyquist plot, which is why a designer can read it off a measured frequency response without any model at all, and why it is the quality figure most often quoted on a plant commissioning report.
:::
:::
