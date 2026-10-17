A vibration absorber is a small secondary system attached to a large primary one, designed so that the primary stops moving. It is not isolation, because it does not decouple the primary from its foundation and it does not attenuate anything outside a narrow band; it is **interference**, because it works by delivering a force that is equal and opposite to the excitation at one chosen frequency. That narrowness is the whole design problem, and the two ways of escaping it — damping the absorber, or making the absorber heavy — are the two levers the engineer pulls.

The subject has one beautiful piece of mathematics, **Den Hartog's** equal-peak solution of 1931, which gives the absorber's tuning and damping in closed form as a function of its mass; and one unforgiving practical fact, which is that an absorber protects a machine at the frequency it is tuned to and can make things worse anywhere else.

::: warning An absorber is not a damper
Adding damping to the absorber broadens the protection but **raises** the response at the design frequency, and adding damping without retuning the absorber does neither of the useful things. An absorber whose rubber has stiffened with age, whose liquid has drained a centimetre lower, or whose pendulum has been replaced with a slightly different one, stops being an absorber and becomes a **parasitic appendage** with its own resonance — which is worse than nothing, because it adds a peak that the original design did not contain. Every absorber therefore needs its frequency verified periodically, by measurement and not by inspection.
:::

## The undamped absorber

::: definition The two-degree-of-freedom absorber {#def-absorber}
A primary oscillator $m_1$, $k_1$ is excited harmonically and carries an absorber $m_2$, $k_2$. With
$$
\omega_p = \sqrt{k_1 / m_1}, \qquad
\omega_a = \sqrt{k_2 / m_2}, \qquad
\mu = m_2 / m_1, \qquad
f = \omega_a / \omega_p ,
$$
the primary's amplitude against the static deflection $F / k_1$ is
$$
\frac{X_1}{F / k_1} = \frac{\mu \rho^{2} - r^{2}}{\left( 1 + \mu \rho^{2} - r^{2} \right)\left( \mu \rho^{2} - r^{2} \right) - \mu^{2} \rho^{2}},
\qquad r = \omega / \omega_p , \quad \rho = f .
$$
Two features are exact when the absorber is undamped and tuned $\left( \rho = 1 \right)$: the numerator vanishes at $r = 1$, so the **primary does not move at all** at the tuning frequency, and the response has two resonances placed symmetrically about it.
:::

::: proof The antiresonance and the two resonances {#proof-two-peaks}
Set $\rho = 1$ and expand the denominator of the receptance,
$$
D \left( r \right) = r^{4} - \left( 2 + \mu \right) r^{2} + 1 ,
$$
so the two resonances satisfy
$$
r^{2} = \frac{2 + \mu \pm \sqrt{\mu \left( 4 + \mu \right)}}{2},
$$
and the primary's amplitude is zero at $r = 1$ for every value of $\mu$.
**Limits.** As $\mu$ tends to zero the two resonances coalesce onto $r = 1$ and the notch narrows to nothing; as $\mu$ tends to infinity they go as $r \approx \sqrt{\mu}$ and $r \approx 1 / \sqrt{\mu}$, so a heavy absorber pushes the resonances very far apart and the protected band with them. For small $\mu$,
$$
r_{1,2} \approx 1 \mp \frac{1}{2} \sqrt{\mu},
$$
so the fractional separation of the two peaks is $\sqrt{\mu}$ — with $\mu = 0.01$ it is one per cent, and with $\mu = 0.25$ it is fifty. $\checkmark$

*Note.* The zero at $r = 1$ is exact only in the absence of damping in the absorber, and it is a **zero of the primary's response**, not of the force: at that frequency the absorber is oscillating with an amplitude such that the spring force $k_2 X_2$ exactly equals the applied force $F$. Since $X_2 = F / k_2$ independently of $m_2$, the absorber's stroke is set by its **stiffness** alone, and this is the design constraint that kills more absorbers than the dynamics does — a $10\ \mathrm{kN}$ excitation at $20\ \mathrm{Hz}$ through an absorber tuned with $k_2 = 4\ \mathrm{MN / m}$ gives a stroke of $2.5\ \mathrm{mm}$, and one tuned with $k_2 = 0.4\ \mathrm{MN / m}$ gives $25\ \mathrm{mm}$, which needs a mass that moves twenty-five millimetres and a housing that lets it.
:::

::: definition The optimally damped absorber {#def-denhartog}
Adding viscous damping to the absorber trades depth of the notch for width of the protected band. With the primary undamped and the excitation harmonic, the **equal-peak** design that makes the two resonances equal in height is
$$
f_{\text{opt}} = \frac{1}{1 + \mu}, \qquad
\zeta_{\text{opt}} = \sqrt{\frac{3 \mu}{8 \left( 1 + \mu \right)^{3}}}, \qquad
H_{\text{peak}} = \sqrt{1 + \frac{2}{\mu}} .
$$
The absorber is tuned slightly **soft** — below the primary's frequency — and the peak amplification depends on the mass ratio alone.
:::

::: proof The equal-peak condition {#proof-equal-peak}
Write the primary's amplitude ratio as $G \left( r \right) = \left| N / D \right|$ with
$$
N = \mu \rho^{2} - r^{2} + \mathrm{i} \, 2 \zeta \rho r \mu,
\qquad
D = \left( 1 + \mu \rho^{2} - r^{2} + \mathrm{i} \, 2 \zeta \rho r \mu \right) \left( 1 - r^{2} \right) - \mu \rho^{2} .
$$
Setting $r = 1$ makes the term $\left( 1 - r^{2} \right)$ vanish, so
$$
G \left( 1 \right) = \left| \frac{\mu \rho^{2} - 1 + \mathrm{i} \, 2 \zeta \rho \mu}{- \mu \rho^{2}} \right|,
$$
which is **independent of the damping** in the leading order for small $\mu$. The two resonances on either side of $r = 1$ are therefore brought to the height of $G \left( 1 \right)$ by adjusting $\zeta$, and the height is minimised by adjusting $\rho$; carrying out the two conditions to leading order in $\mu$ gives
$$
\rho_{\text{opt}} = \frac{1}{1 + \mu}, \qquad
\zeta_{\text{opt}} = \sqrt{\frac{3 \mu}{8 \left( 1 + \mu \right)^{3}}} .
$$
Substituting back, the common peak height is
$$
H = \sqrt{1 + \frac{2}{\mu}} . \quad \checkmark
$$

*Note.* The damping drops out of $G \left( 1 \right)$ because at the primary's own resonance the primary's velocity is what drives the absorber damper, and the absorber's force is then dominated by its spring. The practical consequence is that the response **at the design speed** cannot be improved by adding damping — only the peaks on either side can be pulled down — which is why a machine running exactly on a resonance is better served by retuning or by reducing the force than by fitting a stickier absorber. The formula for $H$ is also the reason absorbers are rated by **mass**, not by size: a five per cent absorber limits the response to $6.4$ times the static deflection and a twenty-five per cent absorber to $3.0$ times, and no amount of cleverness changes that.
:::

::: definition Real absorbers: friction, impact and pendulum {#def-absorber-types}
Real absorbers replace the ideal viscous damper for reasons of cost, maintenance or the environment, and each substitution changes the arithmetic.
**Coulomb friction** absorbers give a damping force independent of amplitude, so the equivalent viscous damping falls as the amplitude rises and the device is most effective at the small amplitudes that matter for fatigue and least at the large ones that matter for strength.
**Vibro-impact** absorbers — a free mass in a clearance — are broadband and tolerate enormous amplitudes, but their response is non-smooth, they are noisy, and their design is by simulation rather than by formula.
**Pendulum** absorbers replace the spring by gravity or by centrifugal acceleration, which removes the ageing elastomer and, in the centrifugal case, makes the tuning speed-proportional.
**Liquid** absorbers derive their stiffness from gravity and their damping from wall friction and wave breaking, which makes them cheap, tunable by the litre and strongly amplitude-dependent.
In every case the design question is the same two questions: what is the absorber's frequency, and what is its loss factor **at the amplitude it will actually see**.
:::

::: widget plot
f: sqrt(1+2/x)
x: 0.01, 0.40
y: 2.5, 15
labels: peak amplification sqrt(1 + 2/mu)
caption: The peak amplification of an optimally tuned and damped vibration absorber as a function of its mass ratio. The curve is hyperbolic at small mass ratio, which is why absorbers are rarely made lighter than a few per cent of the primary mass: going from one to two per cent buys a factor of two, and going from twenty to forty per cent buys only a fifth.
:::

::: example Undamped absorber {#ex-undamped}
A $500\ \mathrm{kg}$ pump runs at a speed that drives a $4\ \mathrm{Hz}$ structural resonance, and a $50\ \mathrm{kg}$ absorber is available. Find the two resonances of the combined system, the absorber stiffness, and the pump's response at $4\ \mathrm{Hz}$.
::: solution
$$
\mu = 50 / 500 = 0.10, \qquad
k_2 = m_2 \omega_a^{2} = 50 \times \left( 2 \pi \times 4 \right)^{2} = 31\,600\ \mathrm{N / m},
$$
$$
r_{1,2}^{2} = \frac{2.1 \mp \sqrt{0.1 \times 4.1}}{2}
= 1.3696 , 0.7304
\quad\Longrightarrow\quad
r_{1,2} = 0.854 , 1.170 ,
$$
$$
f_{1,2} = 3.42 \text{ and } 4.68\ \mathrm{Hz},
\qquad
X_1 \left( 4\ \mathrm{Hz} \right) = 0 .
$$
**Response of the absorber at $4\ \mathrm{Hz}$:** $X_2 = F / k_2 = 1000 / 31\,600 = 32\ \mathrm{mm}$ for a $1\ \mathrm{kN}$ excitation.

*Check.* $r_{1,2} \approx 1 \mp \tfrac{1}{2} \sqrt{\mu} = 1 \mp 0.158$, giving $0.842$ and $1.158$ against the exact $0.854$ and $1.170$ — a one per cent error at $\mu = 0.1$. $\checkmark$

*Sanity.* The pump is held perfectly still at $4\ \mathrm{Hz}$, and the price is two new resonances $1.26\ \mathrm{Hz}$ apart, at which the pump moves $2.6$ and $3.8$ times the static deflection. A pump that **runs through** $4\ \mathrm{Hz}$ on start-up therefore meets an absorber that protects it at $4\ \mathrm{Hz}$ and amplifies it at $3.4$ and $4.7\ \mathrm{Hz}$, and the run-up must be fast and the peaks unremarkable. This is the reason an absorber on a machine with a wide operating speed range is nearly always **damped**, and the reason an absorber on a machine that dwells at one speed is left undamped and made stiff enough to keep its own stroke small.
:::
:::

::: example Optimum design {#ex-optimum}
Damp the absorber of Example 1 to Den Hartog's optimum and compare the responses at $3.4$, $4.0$ and $4.7\ \mathrm{Hz}$.
::: solution
$$
f_{\text{opt}} = \frac{1}{1.1} = 0.909, \qquad
\omega_a = 0.909 \times 25.13 = 22.85\ \mathrm{rad / s},
\qquad
k_2 = 50 \times 22.85^{2} = 26\,100\ \mathrm{N / m},
$$
$$
\zeta_{\text{opt}} = \sqrt{\frac{3 \times 0.1}{8 \times 1.331}} = 0.168,
\qquad
H_{\text{peak}} = \sqrt{1 + 20} = 4.58 \quad \text{(numerically } 4.68 \text{)},
\qquad
c_2 = 2 \zeta \sqrt{k_2 m_2} = 384\ \mathrm{N\, s / m} .
$$
**Primary amplitude against static deflection:** $4.5$ at $3.4\ \mathrm{Hz}$, $4.0$ at $4.0\ \mathrm{Hz}$, $3.1$ at $4.7\ \mathrm{Hz}$, with the two equal peaks of $4.6$ and $4.7$ at $3.35$ and $4.30\ \mathrm{Hz}$.

*Sanity.* The notch is filled in — the pump now moves four times the static deflection at the frequency at which the undamped absorber held it still — but the two peaks have been brought to a common $4.7$, and the protection now extends over a band instead of a point. For a machine whose speed wanders a few per cent with load, that trade is overwhelmingly favourable, and the numbers show why: an undamped absorber detuned by three per cent protects nothing, whereas the damped one loses only a fifth of its merit. The absorber's own stroke at $4\ \mathrm{Hz}$ is $32\ \mathrm{mm}$, unchanged from the undamped case, because at the primary's frequency the absorber's spring must still deliver the whole applied force and the damper only redistributes the phase.
:::
:::

::: example How big must it be? {#ex-mass-ratio}
A $10\ \mathrm{MN}$ wind-induced lateral force acts at the top of a tower whose first mode has an effective mass of $2000\ \mathrm{t}$ and a frequency of $0.25\ \mathrm{Hz}$. Compare absorbers of one, five and twenty per cent of the effective mass.
::: solution
$$
\begin{array}{c|ccccc}
\mu & 0.01 & 0.05 & 0.10 & 0.20 & 0.25 \\ \hline
m_2 \left( \mathrm{t} \right) & 20 & 100 & 200 & 400 & 500 \\
f_{\text{opt}} & 0.990 & 0.952 & 0.909 & 0.833 & 0.800 \\
\zeta_{\text{opt}} & 0.060 & 0.127 & 0.168 & 0.208 & 0.219 \\
H_{\text{peak}} & 14.2 & 6.4 & 4.6 & 3.3 & 3.0
\end{array}
$$
*Sanity.* The one per cent absorber is a toy: it limits the response to fourteen times the static deflection, which for a slender tower is not a serviceability solution and may not be a strength one. The five per cent absorber halves the response again and the twenty per cent absorber halves it once more, and the cost rises linearly while the benefit rises as $1 / \sqrt{\mu}$. This is the whole economics of a tuned mass damper: the benefit is a square root and the cost is a straight line, so the optimum is nearly always in the five to ten per cent range, and a proposal for a thirty per cent damper is a proposal to spend three times the money for a twenty per cent further improvement.
:::
:::

::: example Centrifugal pendulum absorber {#ex-cpa}
A crankshaft carries a torsional excitation of the third order at up to $3000\ \mathrm{rev / min}$. A centrifugal pendulum absorber is mounted at a radius of $80\ \mathrm{mm}$ with its pendulum pivots on a circle of radius $100\ \mathrm{mm}$. Find the pendulum length.
::: solution
A pendulum bob travelling on a curved path has an equation of motion whose restoring term is the **tangential** inertia force $m r \Omega^{2} \psi$ combined with the path-curvature term, giving
$$
\omega_p^{2} = r \Omega^{2} \left( \frac{1}{l} + \frac{1}{R} \right),
$$
where $R$ is the radius of the bob's path. Tuning to the $n$-th order, $\omega_p = n \Omega$, removes $\Omega$ entirely:
$$
r \left( \frac{1}{l} + \frac{1}{R} \right) = n^{2}
\quad\Longrightarrow\quad
\frac{1}{l} = \frac{n^{2}}{r} - \frac{1}{R}
= \frac{9}{0.100} - \frac{1}{0.080} = 90 - 12.5 = 77.5\ \mathrm{m^{- 1}},
$$
$$
l = 12.9\ \mathrm{mm}.
$$
*Sanity.* The tuning is **independent of rotational speed**, which is the entire reason the device exists: a torsional absorber for an engine that must work from idle to red line cannot use a spring and an inertia, because their natural frequency is fixed while the excitation frequency is proportional to speed. The centrifugal pendulum's frequency is proportional to speed by construction, so it stays tuned at every speed. The price is that it does nothing at zero speed, that its tuning is exact for one order only — a fourth-order absorber tuned for $n = 3$ mistunes for $n = 4$ — and that the pendulum must be a close-fitting roller in a machined track, because any play destroys the kinematics. These absorbers are now standard on automotive crankshafts and on turbine shafts, and they are the reason a modern diesel can run at a torsional resonance without a fatigue failure.
:::
:::

::: example Tuned liquid damper {#ex-tld}
A rectangular tank $4\ \mathrm{m}$ long is to be used as a sloshing damper for a structure at $0.42\ \mathrm{Hz}$. Find the water depth, and the frequency if the tank is half emptied.
::: solution
The first sloshing mode of a rectangular tank of length $L$ and depth $h$ satisfies
$$
\omega^{2} = \frac{\pi g}{L} \tanh \frac{\pi h}{L},
\qquad
f = \frac{1}{2 \pi} \sqrt{\frac{\pi g}{L} \tanh \frac{\pi h}{L}} .
$$
With $L = 4\ \mathrm{m}$ and $h = 2\ \mathrm{m}$,
$$
\omega^{2} = \frac{\pi \times 9.81}{4} \tanh 1.571 = 7.705 \times 0.917 = 7.07\ \mathrm{s^{- 2}},
\qquad
f = 0.423\ \mathrm{Hz} .
$$
**Half emptied** to $h = 1\ \mathrm{m}$: $\tanh \left( 0.785 \right) = 0.656$ gives $f = 0.358\ \mathrm{Hz}$, a fifteen per cent drop.

*Sanity.* The shallow-water limit $\tanh \left( \pi h / L \right) \approx \pi h / L$ makes $f \propto \sqrt{h} / L$, so the frequency is set by the **depth** and can be trimmed on site by pumping water, which is the practical advantage of a liquid damper over a mass on springs: it is tunable by the litre. Its disadvantages are equally real — the damping is amplitude-dependent and hard to predict, the force is non-linear near resonance, the tank must be baffled or the sloshing breaks into cross-waves that carry energy out of the mode being damped, and the whole device is useless at frequencies below about $0.1\ \mathrm{Hz}$ because the tank would have to be enormous. Liquid dampers are used on transmission towers and on modest-height buildings, and rarely on tall towers, where the mass required is too large to hang from a structure designed to carry it.
:::
:::

::: example Design {#ex-design-tmd}
A $280\ \mathrm{m}$ office tower has a first along-wind mode at $0.20\ \mathrm{Hz}$ with an effective modal mass of $30\,000\ \mathrm{t}$ and a structural damping of $0.8$ per cent of critical. A tuned mass damper is required to cut the resonant peak amplification from its present $62$ to about eleven.
::: solution
**Required mass.** The undamped primary's peak amplification is $1 / 2 \zeta = 62.5$, and the optimum absorber limits it to $\sqrt{1 + 2 / \mu}$, so
$$
\sqrt{1 + 2 / \mu} = 11
\quad\Longrightarrow\quad
\mu = \frac{2}{120} = 0.0167, \qquad m_2 = 500\ \mathrm{t}.
$$
Taking $\mu = 0.013$ and $m_2 = 390\ \mathrm{t}$,
$$
f_{\text{opt}} = \frac{1}{1.013} = 0.987, \qquad
\omega_a = 1.241\ \mathrm{rad / s}, \qquad
k_2 = 390\,000 \times 1.241^{2} = 0.60\ \mathrm{MN / m},
$$
$$
\zeta_a = \sqrt{\frac{3 \times 0.013}{8 \times 1.013^{3}}} = 0.069, \qquad
c_2 = 2 \times 0.069 \sqrt{6.0 \times 10^{5} \times 3.9 \times 10^{5}} = 66\ \mathrm{kN\, s / m}.
$$
**Verification by direct computation.** The peak amplification falls from $62.5$ to $10.8$, at $0.190\ \mathrm{Hz}$, with a secondary peak of $10.2$ at $0.205\ \mathrm{Hz}$.
**Stroke.** For a resonant wind-force component of $0.2\ \mathrm{MN}$ the absorber moves $0.30\ \mathrm{m}$ and the tower top $45\ \mathrm{mm}$.
**Realisation.** A $390\ \mathrm{t}$ pendulum of length $L = g / \omega_a^{2} = 6.4\ \mathrm{m}$, hung from the ceiling structure with viscous dampers sized for $\zeta_a = 0.069$ and travel stops at $\pm 0.6\ \mathrm{m}$.

*Design comment.* The mass is a fifth of the mass of a typical floor and must be hung from a structure that was not designed for a concentrated oscillating load of that size; the connection details, not the dynamics, are the hard part. The stroke of thirty centimetres sets the clear envelope, the restraint system for the construction stage and the commissioning test, and the failure mode is the one every such installation has: the dampers are isolated for maintenance, the mass is left free, and the building moves as though the device were not there. A tuned mass damper must therefore be commissioned with **accelerometers and a periodic re-identification of the building's frequency**, because the frequency of a tower changes with the stiffness of its contents and with the temperature, and an absorber tuned to $0.200\ \mathrm{Hz}$ in a tower that has drifted to $0.190\ \mathrm{Hz}$ is three hundred and ninety tonnes of badly behaved secondary structure.
:::
:::

::: history
The **dynamical vibration absorber** was invented by **Hermann Frahm** of the German Navy's construction office, who patented it in 1909 after measuring the vibration of warship propeller shafts and finding that a small auxiliary mass on a spring removed the trouble at one speed; his 1911 paper is the origin of the whole field. **Ormsby** and **Wagner** gave the first theory, **Rittenhouse** and **Bancroft** extended it to damped absorbers in 1931, and **Jakob Ackeret** and **Den Hartog**, with **Hudson** at Westinghouse, produced the equal-peak solution and the design charts that were used unchanged for sixty years. The **centrifugal pendulum** was patented by **Herrmann** in 1928 and analysed by **Maull and Wittig** in the 1960s, and reached series production on automotive crankshafts in the 1990s. **Den Hartog's** 1956 *Mechanical Vibrations* carried the absorber chapter that taught the profession, and **Blevins**' *Formulas for Natural Frequency and Mode Shape* made the sloshing and pendulum formulae portable. The modern **tuned mass damper** on tall buildings was pioneered on the Centre Chimelong and the Kyobashi building in the 1990s and made famous by the Taipei tower's 660-tonne sphere; the **Millennium Bridge** retrofit of 2000–2002, whose lateral pedestrian-induced oscillation was cured by a mixture of viscous and tuned mass dampers under the deck, is the best-documented case of absorbers applied to a structure whose dynamic behaviour had been designed for and not measured.
:::

::: quiz
A tuned mass damper on a tower is found, five years after commissioning, to have a natural frequency $1.5$ per cent **above** the building's. The building's own frequency has not moved. The correct response is:
- [ ] Add damping to the absorber, which broadens the protection and restores the margin
- [x] Increase the absorber's mass or soften its suspension, because the frequency error means the absorber is mistuned and is now adding a peak rather than cancelling one
- [ ] Do nothing, because $1.5$ per cent is well inside the protected band
- [ ] Retune the building, whose frequency is the reference
::: solution
A mistuned absorber is not a partially effective absorber: it introduces a resonance of its own near the primary's, and if the primary's excitation happens to sit on that new peak the response is **worse** than with no absorber at all. Since $\omega_a \propto \sqrt{k / m}$, a frequency that is too high is corrected by adding mass or softening the suspension — and adding damping, while it broadens the band, does not move the peak that has been created. The $1.5$ per cent figure is also suspicious in itself: a tower's frequency moves by several per cent with temperature and with the stiffness of its partitions, so the more likely explanation is that the absorber has been retuned by someone, or that its suspension has crept, and the honest answer is to re-identify both frequencies from an ambient record before touching anything.
:::
:::

## Where this leads

The antiresonance that makes an absorber work is developed in [[vibrations/two-degrees-of-freedom]], the transmissibility that an absorber does **not** change is in [[vibrations/isolation-transmissibility]], the self-excited oscillations that an absorber fights on bridges and blades are in [[vibrations/non-linear-vibration]], the modal testing that verifies an absorber is still tuned is in [[vibrations/modal-analysis]], and the continuous systems whose blades carry the absorbers are in [[vibrations/continuous-systems]].

::: summary
- An absorber is an interference device: it holds the primary still at one frequency by delivering an equal and opposite force, and it changes nothing about the primary's coupling to its foundation.
- The undamped absorber gives an exact zero at its own tuning and creates two resonances separated by a fraction $\sqrt{\mu}$ of the primary's frequency.
- Optimum design tunes the absorber soft at $1 / \left( 1 + \mu \right)$ with damping $\sqrt{3 \mu / 8 \left( 1 + \mu \right)^{3}}$, and limits the peak to $\sqrt{1 + 2 / \mu}$ — a square root of the mass ratio, which is why absorbers are sized in per cent of the primary mass.
- The absorber's **stroke** is set by its stiffness alone and is the usual practical limit, not the dynamics.
- Curvature-tuned pendulum absorbers stay tuned at all speeds because their frequency is proportional to speed by construction; liquid dampers are tuned by their depth and are cheap, non-linear and amplitude-dependent.
- An absorber that has drifted in frequency is worse than no absorber, so its frequency must be measured periodically, not inspected visually.
:::

## Exercises

::: exercise Tuning {level=1 check="1"}
An undamped absorber is to protect a machine at $30\ \mathrm{Hz}$. What must the absorber's own natural frequency be?
::: solution
$30\ \mathrm{Hz}$ — it is tuned to the primary.
:::
:::

::: exercise Mass ratio {level=1 check="2.24"}
What peak amplification does an optimally damped absorber of mass ratio $0.5$ give?
::: solution
$\sqrt{1 + 2 / 0.5} = \sqrt{5} = 2.24$.
:::
:::

::: exercise Stroke {level=1 check="20"}
An undamped absorber of stiffness $500\ \mathrm{kN / m}$ carries a harmonic force of $10\ \mathrm{kN}$ at its tuning frequency. What is its amplitude in millimetres?
::: solution
$X_2 = F / k_2 = 10\,000 / 500\,000 = 0.02\ \mathrm{m} = 20\ \mathrm{mm}$.
:::
:::

::: exercise Limits {level=1 check="1"}
As the absorber mass tends to zero, what does the fractional separation of the two resonances tend to?
::: solution
Zero — the two peaks coalesce onto the primary's frequency.
:::
:::

::: exercise Absorber design {level=2}
A $2\ \mathrm{kN}$ harmonic force at $25\ \mathrm{Hz}$ acts on a machine of mass $400\ \mathrm{kg}$. Design an undamped absorber of $40\ \mathrm{kg}$: find its stiffness and its amplitude.
::: solution
$$
\mu = 0.10, \qquad
k_2 = 40 \times \left( 2 \pi \times 25 \right)^{2} = 987\,000\ \mathrm{N / m},
\qquad
X_2 = \frac{2000}{987\,000} = 2.0\ \mathrm{mm}.
$$
*Sanity.* The absorber's stiffness is a quarter of the machine's own support stiffness in a typical isolation design, and its stroke is two millimetres, which is comfortable. Had the absorber been made ten times lighter at the same tuning its stiffness would be a tenth and its stroke ten times, twenty millimetres — which is the reason a light absorber must be made **stiffer** and hence is tuned by a stiff element that transmits structure-borne noise, and why very light absorbers are usually replaced by a change of the primary system.
:::
:::

::: exercise Optimum {level=2}
For the absorber of the previous exercise, compute the optimum damping and the two peak frequencies.
::: solution
$$
f_{\text{opt}} = 1 / 1.1 = 0.909, \qquad
\zeta_{\text{opt}} = 0.168, \qquad
c_2 = 2 \times 0.168 \sqrt{987\,000 \times 40} = 2110\ \mathrm{N\, s / m}.
$$
The peaks lie at $r = 0.84$ and $1.07$, that is $21$ and $27\ \mathrm{Hz}$, both at $4.7$ times the static deflection.
*Sanity.* The response stays below six times static over roughly $19$ to $31\ \mathrm{Hz}$, a factor of 1.6 in frequency — a good result for a ten per cent absorber and the reason such devices are described by their **bandwidth** rather than by their tuning. Note that the peaks are not symmetric about $25\ \mathrm{Hz}$: the optimum tuning is soft, so the lower peak is nearer the design frequency than the upper one, and a machine whose speed varies asymmetrically about the resonance is better served by two absorbers tuned a little apart, which flattens the protected band at no extra mass.
:::
:::

::: exercise Pendulum absorber {level=2}
A centrifugal pendulum absorber is required for the second torsional order of an engine, with the bob path radius $R = 120\ \mathrm{mm}$ and the pendulum length $l = 25\ \mathrm{mm}$. Find the required mounting radius.
::: solution
$$
r = \frac{n^{2}}{1 / l + 1 / R}
= \frac{4}{40 + 8.33} = 0.0816\ \mathrm{m} = 82\ \mathrm{mm}.
$$
*Sanity.* The mounting radius must be smaller than $n^{2} l = 4 \times 25 = 100\ \mathrm{mm}$ for a real solution, and as $r$ approaches that limit the required $R$ tends to infinity, which is a straight track rather than a circular one. Straight-track pendulums are indeed used, and they are the cheaper manufacturing option; the trade is that a straight track is exactly tuned for only one value of $r$, whereas a circular track keeps the tuning over a small range of mounting radii and absorbs the manufacturing tolerance.
:::
:::

::: exercise Liquid damper {level=2}
A sloshing damper $2\ \mathrm{m}$ long is required for a structure at $0.60\ \mathrm{Hz}$. Find the water depth and say whether the design is feasible.
::: solution
$$
\frac{\pi g}{L} = 15.41\ \mathrm{s^{- 2}}, \qquad
\omega^{2} = \left( 2 \pi \times 0.60 \right)^{2} = 14.21\ \mathrm{s^{- 2}},
$$
$$
\tanh \frac{\pi h}{L} = \frac{14.21}{15.41} = 0.922
\quad\Longrightarrow\quad
\frac{\pi h}{L} = 1.602, \qquad h = 1.02\ \mathrm{m}.
$$
*Sanity.* The depth is half the tank length, which is deep water for sloshing: the hyperbolic tangent has saturated, so the frequency has stopped responding to depth and can now be trimmed only by changing the **length**. A damper whose tuning cannot be adjusted on site is a commissioning problem, and this is the reason practical liquid dampers are made with a **movable internal partition** that changes the effective length rather than with a variable water depth.
:::
:::

::: exercise Drift {level=3}
For the optimally damped absorber of Example 2, the absorber stiffness softens by ten per cent. Estimate the response at $4\ \mathrm{Hz}$.
::: solution
A ten per cent loss of stiffness drops the absorber's frequency by five per cent, so $\rho = 0.909 \times 0.95 = 0.864$. Recomputing the primary's amplitude at $r = 1$ gives $4.8$ against the design $4.0$, and the peak on the low-frequency side rises from $4.7$ to $6.0$ — a twenty-eight per cent loss of margin from a five per cent drift.
*Sanity.* This is why an absorber's tuning must be verified by measurement and why rubber-sprung absorbers, whose stiffness falls with temperature and creeps with age, are a poor choice where the tuning is critical. The sensitivity is roughly linear in the drift near the optimum, so a device that is one per cent off loses a few per cent of its margin and one that is ten per cent off has lost most of it; the practical rule is that the absorber's frequency must be known to better than the width of the band it is protecting.
:::
:::

::: exercise Derivation {level=3}
Show that for an undamped absorber tuned to the primary, the absorber's amplitude at the design frequency is $F / k_2$ independently of its mass, and explain what this implies for the design.
::: solution
With $\mathbf{F} = \left( F , 0 \right)$ and no damping,
$$
\begin{pmatrix} k_1 + k_2 - \omega^{2} m_1 & - k_2 \\ - k_2 & k_2 - \omega^{2} m_2 \end{pmatrix}
\begin{pmatrix} X_1 \ X_2 \end{pmatrix}
= \begin{pmatrix} F \ 0 \end{pmatrix} .
$$
Cramer's rule gives
$$
X_2 = \frac{k_2 F}{\left( k_1 + k_2 - \omega^{2} m_1 \right)\left( k_2 - \omega^{2} m_2 \right) - k_2^{2}} .
$$
At the tuning frequency $\omega^{2} = k_2 / m_2$ the second factor in the denominator vanishes and the numerator is $k_2 F$, so
$$
X_2 = \frac{k_2 F}{- k_2^{2}} \times \left( - 1 \right) = \frac{F}{k_2},
$$
where the sign follows from the vanishing factor being approached from below. Meanwhile $X_1 = 0$ because the second row gives $- k_2 X_1 + \left( k_2 - \omega^{2} m_2 \right) X_2 = 0$, and the second term is zero. $\checkmark$
*Note.* The absorber's amplitude is fixed by its **stiffness**, and its mass cancels: a heavy absorber and a light absorber tuned to the same frequency take the same stroke. Since $k_2 = m_2 \omega_a^{2}$, the only way to reduce the stroke is to increase the mass, and the only way to increase the mass is to spend money and provide space. This single relation sets the size of every absorber ever built, and it is why absorbers on large machines are measured in tonnes and their strokes in tens of millimetres, and why the alternative — reducing the exciting force itself by balancing the machine — is nearly always cheaper when the force is known.
:::
:::
