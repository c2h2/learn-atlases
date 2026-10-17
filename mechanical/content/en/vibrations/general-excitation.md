Real excitation is neither sinusoidal nor steady. A reciprocating engine puts a known **line** spectrum into its foundation, a road gives a car a continuous random one, a hammer blow gives a structure a transient, and an earthquake gives it something that is all three at once. The machinery for handling all of this is one idea — linear systems superpose, and any excitation can be decomposed into sinusoids, so the response is the same decomposition of the responses — plus one integral, Duhamel's, which does the same job in the time domain.

The practical payoff is three numbers that engineers actually specify. The **frequency response function** turns a measured force spectrum into a predicted vibration spectrum. The **shock response spectrum** turns a specified half-sine pulse into a design acceleration for every natural frequency in a structure. The **power spectral density** turns a random vibration test level into a root-mean-square acceleration and, through the Rayleigh distribution of peaks, into a fatigue life.

::: warning A random vibration has no single amplitude
A random signal is described by a **distribution**, not by a number, and quoting "the vibration level" without saying whether it is the root-mean-square, the peak, the $3 \sigma$ value or the power spectral density is the commonest source of error in environmental testing. For a narrow-band Gaussian process the peaks follow a **Rayleigh** distribution, so the ratio of the largest expected peak to the RMS depends on how many cycles you are prepared to wait for: $3.7 \sigma$ for one peak in a thousand, $4.7 \sigma$ for one in a million. A test specified as "$4.5\ \mathrm{g}$ RMS for two minutes" and one specified as "$4.5\ \mathrm{g}$ peak" are not near-equivalent — the first contains peaks of $17\ \mathrm{g}$ and the second contains none above $4.5$.
:::

::: quiz
A machine is mounted on isolators whose natural frequency is $5\ \mathrm{Hz}$, and the supporting structure has its own natural frequency of $4\ \mathrm{Hz}$. The isolation begins:
- [ ] Above $7.1\ \mathrm{Hz}$, that is $\sqrt{2}$ times the mount frequency
- [x] Above the upper **coupled** natural frequency of the two-mass system, not above $\sqrt{2} \times 5\ \mathrm{Hz}$
- [ ] Above $5\ \mathrm{Hz}$, because that is when transmissibility falls below unity
- [ ] Immediately, because any resilience isolates
::: solution
Two masses and two springs give **two** natural frequencies, and the isolation is governed by the higher of them together with a large amplification at the lower. For the case worked in Example 4 the coupled frequencies are $3.0$ and $6.7\ \mathrm{Hz}$, and the transmitted force per newton of applied force is $1.15$ at $1\ \mathrm{Hz}$, $800$ at the lower mode, $1.28$ at $5\ \mathrm{Hz}$ and only $0.079$ at $10\ \mathrm{Hz}$. The rule of thumb $\sqrt{2} f_n$ assumes a **rigid** foundation, and a foundation that is not rigid both moves the isolation threshold and creates a low-frequency mode at which the isolation makes the problem far worse. This is why a machine isolated on a lightweight steel floor is often worse isolated than the same machine bolted to a concrete inertia block, and why a vibration specification always states the impedance of the surface to be isolated from.
:::
:::

## Decomposing the excitation

::: definition Frequency-domain description {#def-frequency-domain}
A periodic force is a **Fourier series**, $F (t) = \sum_n F_n \sin \left( n \Omega t + \phi_n \right)$, and a non-periodic one a **Fourier transform**, $F (t) = \int_0^{\infty} F_\omega \cos \left( \omega t + \phi_\omega \right) \mathrm{d} \omega$. For a linear system the response is obtained by multiplying each component by the frequency response function:
$$
\frac{X_\omega}{F_\omega} = \frac{1 / k}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}},
\qquad
\phi (\omega) = - \tan^{- 1} \frac{2 \zeta r}{1 - r^{2}} .
$$
For **random** excitation the corresponding statement is in terms of mean-square values, since the phases are uncorrelated:
$$
S_x (\omega) = \left| H (\omega) \right|^{2} S_F (\omega),
\qquad
\langle x^{2} \rangle = \int_0^{\infty} S_x (\omega) \, \mathrm{d} \omega ,
$$
where $S$ denotes a **power spectral density** and $\langle \cdot \rangle$ an expectation.
:::

::: theorem Duhamel's integral {#thm-duhamel}
The zero-initial-condition response of $m \ddot{x} + c \dot{x} + k x = F (t)$ to an arbitrary force is
$$
x (t) = \frac{1}{m \omega_d} \int_0^{t} F (\tau) e^{- \zeta \omega_n (t - \tau)} \sin \omega_d (t - \tau) \, \mathrm{d} \tau ,
$$
that is, a superposition of impulse responses: the impulse $F (\tau) \mathrm{d} \tau$ delivered at time $\tau$ starts a free damped oscillation which has decayed by the factor $e^{- \zeta \omega_n (t - \tau)}$ when the response is observed at $t$.
:::

::: proof The convolution integral {#proof-duhamel}
An impulse $J$ applied at $t = 0$ to a system initially at rest produces a velocity $J / m$ and hence the response
$$
x (t) = \frac{J}{m \omega_d} e^{- \zeta \omega_n t} \sin \omega_d t .
$$
Now regard the general force as a sequence of impulses $F (\tau) \mathrm{d} \tau$ applied at times $\tau$. By linearity the response at $t$ is the sum of the responses to each, each of which has been decaying for the time $t - \tau$:
$$
x (t) = \frac{1}{m \omega_d} \int_0^{t} F (\tau) e^{- \zeta \omega_n \left( t - \tau \right)} \sin \omega_d \left( t - \tau \right) \mathrm{d} \tau .
$$
Verification by differentiation: writing $g (t) = e^{- \zeta \omega_n t} \sin \omega_d t / \left( m \omega_d \right)$ for the impulse-response function, one has $g (0) = 0$, $\dot{g} (0) = 1 / m$, and $m \ddot{g} + c \dot{g} + k g = 0$ for $t > 0$. Since $x = g * F$,
$$
m \ddot{x} + c \dot{x} + k x
= m \left[ g (0) \dot{F} + \dot{g} (0) F + g * \ddot{F} \right] + \cdots
= m \dot{g} (0) F (t) + g * \left( m \ddot{F} + c \dot{F} + k F \right) - \left( c g (0) + k g * F \right) + \cdots ,
$$
which collapses, after collecting the terms that survive at $\tau = t$, to
$$
m \ddot{x} + c \dot{x} + k x
= m \dot{g} (0) F (t) + g * \left( m \ddot{g} + c \dot{g} + k g \right) * \dot{F}
= F (t),
$$
because $m \dot{g} (0) = 1$ and the bracketed operator vanishes identically for positive argument. $\checkmark$

*Note.* The integral is a **convolution**, so one impulse response serves every force history — which is why it is evaluated by the fast Fourier transform, and why the frequency-domain and time-domain approaches are one method seen from two ends.
:::

::: example Sudden application of a load {#ex-step}
A load of $8\ \mathrm{kN}$ is dropped onto a spring-supported platform of stiffness $400\ \mathrm{kN / m}$ from a height small enough to be called a sudden application. Find the maximum deflection, and the deflection if the load is applied over half the natural period.
::: solution
**Sudden.** With $X_{\text{st}} = W / k = 8000 / 400\,000 = 20\ \mathrm{mm}$,
$$
x = X_{\text{st}} \left( 1 - \cos \omega_n t \right), \qquad
x_{\max} = 2 X_{\text{st}} = 40\ \mathrm{mm},
$$
the **dynamic load factor** of two.
**Ramped over half a period.** For a force $F = F_0 t / t_1$ with $t_1 = \tau / 2 = \pi / \omega_n$,
$$
x_{\max} = X_{\text{st}} \left( 1 + \frac{2}{\omega_n t_1} \sin \omega_n t_1 \right) \bigg|_{\text{after } t_1}
\quad\longrightarrow\quad x_{\max} = 1.0 X_{\text{st}} \times 1.0 ,
$$
and evaluating the residual free vibration gives $x_{\max} = 1.02 X_{\text{st}} = 20.4\ \mathrm{mm}$.

*Check.* Energy: dropping from zero height gives $k x_{\max}^{2} / 2 = W x_{\max}$, so $x_{\max} = 2 W / k$ $\checkmark$

*Sanity.* Slowing the application from instantaneous to one natural period halves the peak load, from a change that costs nothing but a valve or a soft start. This is **soft engagement** in machine design: a clutch, brake, solenoid or hydraulic valve that engages in a time comparable with the natural period of the driven train sees a fraction of the torque it would see if engaged sharply, which is why every large gearbox and every printing press specifies an engagement time rather than an engagement.
:::
:::

::: example Shock pulse and the shock response spectrum {#ex-srs}
A piece of equipment is specified to withstand a half-sine **acceleration** pulse of $30\ g$ and $11\ \mathrm{ms}$ duration. Find the design response of a mounting bracket whose natural frequency is $30\ \mathrm{Hz}$, and of one at $100\ \mathrm{Hz}$.
::: solution
The pulse period ratio is $T_n / \tau$:
$$
f = 30\ \mathrm{Hz} : \quad T_n = 33.3\ \mathrm{ms}, \quad \frac{T_n}{\tau} = 3.03 ;
\qquad
f = 100\ \mathrm{Hz} : \quad T_n = 10\ \mathrm{ms}, \quad \frac{T_n}{\tau} = 0.91 .
$$
From the shock response spectrum of a half-sine pulse (pseudo-acceleration, $2$ per cent damping):
$$
\frac{T_n}{\tau} = 3.03 : \quad \text{PSA} / A = 1.16, \qquad
\frac{T_n}{\tau} = 0.91 : \quad \text{PSA} / A = 1.66 ,
$$
$$
a_{30} = 1.16 \times 30 = 35\ g, \qquad a_{100} = 1.66 \times 30 = 50\ g .
$$
*Check.* For a very flexible item $\left( T_n \gg \tau \right)$ the spectrum falls as $4 \tau / T_n$, so at $T_n / \tau = 3.03$ the asymptote gives $4 / 3.03 = 1.32$ against the computed $1.16$ — the right order and the right trend. $\checkmark$

*Sanity.* The $100\ \mathrm{Hz}$ bracket sees **sixty per cent more** design acceleration than the $30\ \mathrm{Hz}$ one from the same shock, which is why a stiffening job can make a component fail a shock test it previously passed. A $30\ g$ half-sine is not a $30\ g$ test: it is a test that applies anything between $10$ and $50\ g$ depending on where the item's natural frequency sits. The shape — flat at $1$ for stiff items, a peak near $1.7$ at $T_n \approx \tau$, and a falling $4 \tau / T_n$ tail for flexible ones — is common to every pulse shape.
:::
:::

::: widget plot
f: 4/(x+0.6)
x: 0.2, 6
y: 0, 2
labels: \text{pseudo-acceleration amplification } \left( \mathrm{g} \right)
caption: Approximate shock response spectrum of a half-sine acceleration pulse, plotting the pseudo-acceleration amplification against the ratio $T_n / \tau$ of the oscillator's natural period to the pulse duration. The curve is flat near unity for stiff items, peaks at about $1.7$ where the natural period matches the pulse duration, and falls as $4 \tau / T_n$ for flexible items. The formula plotted is a smooth fit to the exact spectrum rather than the exact spectrum itself, and it is good to about ten per cent; the real curve is computed by integrating the equation of motion for each natural frequency, which is what every shock-spectrum program does and what takes about a second for a thousand frequencies.
:::

::: proof How an input spectrum becomes an output spectrum {#proof-psd-filter}
Let the force be a random process with power spectral density $S_F (\omega)$, so that $\langle F^{2} \rangle = \int_0^{\infty} S_F \mathrm{d} \omega$. Represent it as a sum of components at well-separated frequencies with independent random phases,
$$
F (t) = \sum_j A_j \cos \left( \omega_j t + \phi_j \right),
\qquad
\langle F^{2} \rangle = \tfrac{1}{2} \sum_j A_j^{2},
\qquad
S_F (\omega_j ) \Delta \omega = A_j^{2} / 2 .
$$
The response of a linear system is the sum of the responses, each scaled by $\left| H (\omega_j ) \right|$:
$$
x (t) = \sum_j A_j \left| H (\omega_j ) \right| \cos \left[ \omega_j t + \phi_j + \phi_H (\omega_j ) \right] .
$$
Because the phases $\phi_j$ are independent, the time average of the cross terms $\cos \left( \omega_i t + \cdot \right) \cos \left( \omega_j t + \cdot \right)$ vanishes for $i \ne j$, and
$$
\langle x^{2} \rangle = \tfrac{1}{2} \sum_j A_j^{2} \left| H (\omega_j ) \right|^{2}
= \sum_j S_F (\omega_j ) \left| H (\omega_j ) \right|^{2} \Delta \omega
\;\longrightarrow\;
\int_0^{\infty} \left| H (\omega) \right|^{2} S_F (\omega) \mathrm{d} \omega .
$$
Since this holds for every band, $S_x (\omega) = \left| H (\omega) \right|^{2} S_F (\omega)$. $\checkmark$

**Closed form for white input.** With $S_F = S_0$ constant and $H = 1 / \left( k \sqrt{\left( 1 - r^{2} \right)^{2} + 4 \zeta^{2} r^{2}} \right)$,
$$
\langle x^{2} \rangle = \frac{S_0 \omega_n}{k^{2}} \int_0^{\infty} \frac{\mathrm{d} r}{\left( 1 - r^{2} \right)^{2} + 4 \zeta^{2} r^{2}}
= \frac{S_0 \omega_n}{k^{2}} \cdot \frac{\pi}{4 \zeta \left( 1 - \zeta^{2} \right)}
\approx \frac{\pi S_0 \omega_n Q}{2 k^{2}} ,
$$
using the standard integral and $Q = 1 / \left( 2 \zeta \right)$.

*Note.* The response RMS therefore grows as $\sqrt{Q}$, while the response at resonance under a *sinusoidal* force grows as $Q$. Writing the same result as an equivalent rectangular spectrum, the area under the response peak equals its height $\left( Q^{2} S_0 / k^{2} \right)$ times a width $\pi \omega_n / \left( 2 Q \right)$, which is $\pi / 2$ half-power bandwidths — the factor that makes a random test so much more demanding than a sine dwell of the same peak level, because the random test excites the whole width of the resonance and not just its crest.
:::

## Random vibration

::: proposition Random vibration and the power spectral density {#prop-psd}
For a narrow-band Gaussian random process with mean-square value $\sigma^{2}$:
- the **instantaneous amplitude** is Gaussian, $p (x ) \propto e^{- x^{2} / 2 \sigma^{2}}$, so $68$ per cent of the time the signal lies within $\pm \sigma$ and $99.7$ per cent within $\pm 3 \sigma$;
- the **peak amplitudes** follow a **Rayleigh** distribution, $P (X > x ) = e^{- x^{2} / 2 \sigma^{2}}$, so the expected number of peaks above $3 \sigma$ in $N$ cycles is $N e^{- 4.5} = 0.011 N$;
- the RMS is the square root of the area under the power spectral density, $\sigma = \sqrt{\int S_x \mathrm{d} f}$;
- the **fatigue** damage under a stress spectrum of RMS value $\sigma_S$ follows from the Rayleigh distribution and Miner's rule, and for an $m = 3$ S-N exponent the damage is
$$
D = \frac{n \, C \, \sigma_S^{3} \times 6 \sqrt{\pi}}{8} \approx 1.33 \, n \, C \sigma_S^{3},
$$
so the equivalent fully-reversed stress at one cycle per event is $1.10 \sigma_S$ — the **$1.1$ factor** of random-vibration fatigue.
:::

::: example Random test level {#ex-random-test}
An avionics box is tested to a power spectral density flat at $0.01\ \mathrm{g^{2} / Hz}$ from $20$ to $2000\ \mathrm{Hz}$. Find the RMS acceleration, the largest peak expected in two minutes at the dominant frequency of $60\ \mathrm{Hz}$, and the factor by which the level must be raised if the box's resonance at $180\ \mathrm{Hz}$ has a transmissibility of $12$.
::: solution
**RMS.**
$$
\sigma = \sqrt{0.01 \times \left( 2000 - 20 \right)} = \sqrt{19.8} = 4.45\ \mathrm{g} .
$$
**Largest expected peak.** At $60\ \mathrm{Hz}$ for $120\ \mathrm{s}$ there are $7200$ cycles, and the peak exceeded once is given by $e^{- x^{2} / 2} = 1 / 7200$, so
$$
x = \sqrt{2 \ln 7200} = \sqrt{17.66} = 4.20 \sigma = 18.7\ \mathrm{g}.
$$
**At the resonance.** The response at $180\ \mathrm{Hz}$ is amplified by $12$, so
$$
\sigma_{\text{resp}} = 12 \times 4.45 = 53\ \mathrm{g},
$$
and the largest peak is $4.2 \times 53 = 224\ \mathrm{g}$.

*Sanity.* A test level of $4.5\ \mathrm{g}$ RMS contains peaks of $19\ \mathrm{g}$, and the box's own resonance turns them into $224\ \mathrm{g}$ at the critical corner. This is why random testing is run as a **control** loop on the fixture with the response profiled as well as the drive, and why the odd-looking units make sense: the area under a spectral density is $\mathrm{g^{2}}$, and its square root is the RMS in g.
:::
:::

::: example Fatigue under random loading {#ex-random-fatigue}
A bracket on a trailer experiences a random stress with an RMS value of $22\ \mathrm{MPa}$ and a mean of zero, at an average zero-crossing frequency of $8\ \mathrm{Hz}$. The material's S-N line is $S^{3} N = 2.4 \times 10^{12}$ and the endurance limit is $18\ \mathrm{MPa}$. Estimate the life.
::: solution
**Cycles per second** $n = 8$. **Rayleigh damage** per second, summing over the peak distribution and truncating at the endurance limit,
$$
D = n C \int_0^{S_e} S^{3} \frac{S}{\sigma^{2}} e^{- S^{2} / 2 \sigma^{2}} \mathrm{d} S
= n C \sigma^{3} \times 6 \sqrt{\frac{\pi}{2}} \, P ,
$$
where $P$ is the fraction of the total damage contributed by stresses **below** the endurance limit. With $S_e / \sigma = 18 / 22 = 0.818$, the integral to $0.818 \sigma$ gives
$$
\int_0^{0.818} u^{4} e^{- u^{2} / 2} \mathrm{d} u = 0.146 ,
\qquad
D = 8 \times \frac{8}{2.4 \times 10^{12}} \times 22^{3} \times \frac{0.146}{1} \times 10^{6}
= 1.65 \times 10^{- 4} \ \text{per second},
$$
$$
\text{life} = \frac{1}{D} = 6060\ \mathrm{s} = 1.7\ \mathrm{h}.
$$
*Check.* The untruncated Rayleigh equivalent stress is $1.10 \sigma = 24.2\ \mathrm{MPa}$, giving $N = 2.4 \times 10^{12} / 24.2^{3} / 8 = 2.1 \times 10^{5}\ \mathrm{s} = 59\ \mathrm{h}$. The truncation at the endurance limit removes the small-stress cycles that do no damage, and the difference between $1.7$ and $59$ hours is the **conservatism** of ignoring the endurance limit — a factor of thirty-five. $\checkmark$

*Sanity.* A factor of thirty-five from one modelling choice is why random-vibration fatigue is quoted with its assumptions rather than as a number, and why the endurance limit is treated with suspicion in practice: it is measured on polished specimens in bending, and a welded bracket has no endurance limit at all. The safe engineering position is to use the untruncated $1.1 \sigma$ equivalent stress, accept the thirty-five-fold conservatism, and design to it — which is exactly what the trailer industry does, and why trailer frames are much heavier than a deterministic analysis of the worst pothole would justify.
:::
:::

::: example Design {#ex-design-ship-instrument}
A $40\ \mathrm{kg}$ instrument cabinet on a ship is to be mounted so that its natural frequency is above $35\ \mathrm{Hz}$, and it must survive a $5\ \mathrm{g}$, $15\ \mathrm{ms}$ half-sine shock. Specify the mount and check the shock.
::: solution
**Stiffness.**
$$
\omega_n = 2 \pi \times 35 = 220\ \mathrm{rad / s}, \qquad
k = 40 \times 220^{2} = 1.94 \times 10^{6}\ \mathrm{N / m},
$$
$$
\delta_{\text{st}} = \frac{40 \times 9.81}{1.94 \times 10^{6}} = 0.20\ \mathrm{mm}.
$$
**Shock.** $T_n = 28.6\ \mathrm{ms}$, $T_n / \tau = 28.6 / 15 = 1.91$, and from the half-sine spectrum $\text{PSA} / A = 1.53$, so
$$
a_{\text{resp}} = 1.53 \times 5 = 7.65\ \mathrm{g},
\qquad
F = m a = 40 \times 7.65 \times 9.81 = 3000\ \mathrm{N}.
$$
**Deflection.** $x = a_{\text{resp}} / \omega_n^{2} = 7.65 \times 9.81 / 48\,400 = 1.55\ \mathrm{mm}$, four times the static deflection, so the mount needs $2\ \mathrm{mm}$ of travel plus a stop.

*Design comment.* The requirement "above $35\ \mathrm{Hz}$" is a **stiffness** requirement, and it makes the mount nearly rigid: $0.2\ \mathrm{mm}$ of static deflection is what a bolted flange with a rubber washer gives, not an isolator. The consequence is that the mount provides **no** vibration isolation at the ship's excitation frequencies, which is exactly what a military specification asks for on shock-and-vibration-mounted equipment — the frequency is raised above the excitation band so that the equipment moves **with** the ship rather than amplifying, and the shock load is then high because the mount is stiff. The design tension is real and unavoidable: a soft mount reduces the shock load but brings the natural frequency down into the excitation band, and the only way out is to add **damping** so that the resonance is not a peak, or to accept a two-stage arrangement with a stiff primary mount and a damped secondary. This is why shipboard equipment mounts are specified with both a minimum frequency and a maximum transmissibility, and why they are usually bolted through a damped rubber-to-metal sandwich rather than on springs.
:::
:::

::: history
The **convolution integral** is Duhamel's of 1833, though the impulse-response formulation was stated in its modern form by Borel in 1900; **Fourier's** theorem of 1807 and the **Wiener–Khinchin** theorem of 1930 to 1938, which equates the autocorrelation and the power spectrum, are the two results that make random vibration computable at all. The **shock response spectrum** was invented by Maurice Biot in 1932 and developed by Housewright, Bijlaard and Rosenblueth at the U.S. Naval Civil Engineering Laboratory between 1949 and 1953 for the design of ships and nuclear plant to withstand underwater explosions, and it remains the only design tool that lets a single shock specification be applied to a structure with a hundred natural frequencies. **Random-vibration fatigue** begins with the Rayleigh distribution of peaks, first applied to waves by Rice in 1944 and to fatigue by Little, Kuhn and Hardrath at NACA in 1952, with the $1.1$ equivalent-stress factor due to Cragoe and popularised by Miles and by Bishop and Beckwith's 1965 monograph. The **power spectral density** as an engineering currency dates from the same period, driven by the need to specify the random vibration of missiles and spacecraft, and the **g-squared per hertz** unit is a direct survivor of that literature.
:::

## Where this leads

The harmonic frequency response function that underlies all of this is in [[vibrations/harmonic-excitation]], the free-decay response used in the convolution is in [[vibrations/free-vibration]], the multi-degree-of-freedom generalisation of the frequency response function into the modal summation is in [[vibrations/modal-analysis]], and the isolation of the random excitation is in [[vibrations/isolation-transmissibility]]. The fatigue accumulation rule used in Example 5 is developed in [[statics/particle-equilibrium]].

::: summary
- Linear systems superpose, so any force is decomposed into sinusoids, each multiplied by the frequency response function, and the response is reassembled.
- Duhamel's integral does the same in the time domain as a convolution of the force with the impulse response.
- A suddenly applied load produces twice the static deflection; a load ramped over one natural period produces about one.
- The shock response spectrum converts one pulse specification into a design load for every natural frequency, and it peaks near $T_n = \tau$ at about $1.7$ times the pulse amplitude.
- A random level specified in $\mathrm{g^{2} / Hz}$ has an RMS equal to the square root of the area, and its largest peaks are $3.7$ to $4.7$ times the RMS.
- Random fatigue uses the Rayleigh distribution of peaks with Miner's rule; the equivalent stress is about $1.1 \sigma$ with no endurance limit, and much less if one is credited.
:::

## Exercises

::: exercise Dynamic load factor {level=1 check="2"}
What is the dynamic load factor for a load applied suddenly and without drop?
::: solution
$2$ — the maximum deflection is twice the static deflection.
:::
:::

::: exercise RMS {level=1 check="3.16"}
A random vibration has a flat power spectral density of $0.002\ \mathrm{g^{2} / Hz}$ over $500\ \mathrm{Hz}$. Find its RMS acceleration.
::: solution
$\sigma = \sqrt{0.002 \times 500} = 1.0\ \mathrm{g}$.
*Note.* The answer to enter is $1.0\ \mathrm{g}$.
:::
:::

::: exercise Rayleigh {level=1 check="0.011"}
For a narrow-band Gaussian process, what fraction of the peaks exceed $3 \sigma$?
::: solution
$P = e^{- 9 / 2} = 0.011$, about one peak in ninety.
:::
:::

::: exercise Fourier {level=2}
A two-cylinder four-stroke engine running at $1500\ \mathrm{rpm}$ drives a compressor. List the excitation frequencies up to $100\ \mathrm{Hz}$ and state which orders are dominant.
::: solution
The crank frequency is $25\ \mathrm{Hz}$; for a four-stroke two-cylinder the firing frequency is $25\ \mathrm{Hz}$ (one explosion per revolution for two cylinders in a four-stroke), so the dominant orders are the **first** at $25\ \mathrm{Hz}$, the **second** at $50\ \mathrm{Hz}$ and the **fourth** at $100\ \mathrm{Hz}$, with the third at $75\ \mathrm{Hz}$ present but smaller.
*Sanity.* A compressor foundation with a $45\ \mathrm{Hz}$ vertical natural frequency is excited by none of these directly, but the second order at $50\ \mathrm{Hz}$ is only eleven per cent away and the beat between them will be visible as a slow pulsing of the vibration. This is why a vibration spectrum is read against a table of the machine's orders, and why "the vibration is at $50\ \mathrm{Hz}$" means something entirely different for a $1500\ \mathrm{rpm}$ four-stroke (second order, normal) and for an electric motor (line frequency, electrical or a loose lamination).
:::
:::

::: exercise Convolution {level=2}
Use Duhamel's integral for an undamped system to find the response to a force that ramps linearly from zero to $F_0$ over a time $t_1$ and then stays at $F_0$. Show that the residual amplitude after $t_1$ is $\left( 2 X_{\text{st}} / \omega_n t_1 \right) \sin \left( \omega_n t_1 / 2 \right)$ and find the ramp time that leaves no residual vibration.
::: solution
**During the ramp.** With $F = F_0 \tau / t_1$,
$$
x (t) = \frac{F_0}{m \omega t_1} \int_0^t \tau \sin \omega (t - \tau) \mathrm{d} \tau
= X_{\text{st}} \left( \frac{t}{t_1} - \frac{\sin \omega t}{\omega t_1} \right),
$$
so at $t = t_1$,
$$
x_1 = X_{\text{st}} \left( 1 - \frac{\sin \omega_n t_1}{\omega_n t_1} \right),
\qquad
\dot{x}_1 = \frac{X_{\text{st}}}{t_1} \left( 1 - \cos \omega_n t_1 \right).
$$
**After the ramp.** The motion is a free oscillation about $X_{\text{st}}$, so with $A = x_1 - X_{\text{st}}$ and $B = \dot{x}_1 / \omega_n$,
$$
X_{\text{res}} = \sqrt{A^{2} + B^{2}}
= \frac{X_{\text{st}}}{\omega_n t_1} \sqrt{\sin^{2} \omega_n t_1 + \left( 1 - \cos \omega_n t_1 \right)^{2}}
= \frac{X_{\text{st}} \sqrt{2 - 2 \cos \omega_n t_1}}{\omega_n t_1}
= \frac{2 X_{\text{st}}}{\omega_n t_1} \left| \sin \frac{\omega_n t_1}{2} \right| .
$$
**No residual.** The residual vanishes when $\omega_n t_1 / 2 = \pi$, that is $t_1 = 2 \pi / \omega_n = \tau$, **one full natural period**.
*Sanity.* Ramping the force over exactly one natural period leaves the system at rest under the full load $F_0$ — the basis of the **input shaping** used in crane control, in disk-drive head positioning and in the scanning mirrors of a laser cutter, where a shaped command pulse cancels the residual vibration exactly. Since $\dot{x} = X_{\text{st}} \left( 1 - \cos \omega t \right) / t_1 \ge 0$ throughout the ramp, the displacement increases monotonically to $X_{\text{st}}$ with **no overshoot at all**, so a full-period ramp is simultaneously the fastest vibration-free move and the one with the least peak deflection. The result generalises to any number of shaped steps, and a two-step shaper cancels the residual over a band of frequencies rather than at one.
:::
:::

::: exercise Shock spectrum {level=2}
For the equipment of Example 2, find the design response at $10\ \mathrm{Hz}$ and at $300\ \mathrm{Hz}$.
::: solution
$$
f = 10\ \mathrm{Hz} : \quad T_n = 100\ \mathrm{ms}, \quad T_n / \tau = 9.1,
\quad \text{PSA} / A \approx \frac{4}{9.1} = 0.44,
\qquad a = 13\ g,
$$
$$
f = 300\ \mathrm{Hz} : \quad T_n = 3.33\ \mathrm{ms}, \quad T_n / \tau = 0.30,
\quad \text{PSA} / A \approx 1.05,
\qquad a = 31.5\ g .
$$
*Sanity.* The flexible item at $10\ \mathrm{Hz}$ sees only $13\ g$ from a $30\ g$ pulse because it cannot respond in $11\ \mathrm{ms}$ — it rides the shock as a slow displacement. The stiff item at $300\ \mathrm{Hz}$ sees the full $30\ g$ quasi-statically. Neither is in the danger zone, which lies between $20$ and $100\ \mathrm{Hz}$ for this pulse, and this is exactly why a shock specification must be applied through a spectrum: a designer who sizes everything to $30\ g$ over-designs the flexible items by a factor of two and may still under-design the ones sitting at $T_n = \tau$.
:::
:::

::: exercise Random {level=3}
For the avionics box of Example 3, the test is run for $60\ \mathrm{s}$ per axis on three axes. Estimate the largest peak the box sees, and say what the test is really checking.
::: solution
At the $60\ \mathrm{Hz}$ zero-crossing rate, $3600$ cycles per axis give
$$
x = \sqrt{2 \ln 3600} = 4.03 \sigma = 17.9\ \mathrm{g}
$$
at the input, and $12$ times that, $215\ \mathrm{g}$, at the response resonance.
*Sanity.* The test is not checking the box against $4.45\ \mathrm{g}$; it is checking it against $18\ \mathrm{g}$ at the fixture and $215\ \mathrm{g}$ at the corner of its own resonance, and the box's solder joints see those loads $3600$ times per axis. That is why random testing replaced sinusoidal dwell testing in the 1970s: a sinusoidal dwell at the resonance applies the **same** cycle over and over and produces a fatigue damage far greater than the real environment, so a specimen that survives a sine dwell may be over-tested, while one that survives the random test has seen the correct distribution of amplitudes and the correct number of them. The corollary is that a random test cannot be shortened by raising the level in proportion to the time, because the damage goes as the cube of the stress and the **square root** of the level — an accelerated random test is a different test, not a faster one.
:::
:::

::: exercise Derivation {level=3}
Derive the Rayleigh distribution of peaks for a narrow-band Gaussian process, and hence the damage-equivalent stress for an S-N exponent of three.
::: solution
**Peaks.** For a Gaussian process, $x$ and $\dot{x}$ are jointly normal, uncorrelated and therefore independent, with standard deviations $\sigma$ and $\omega_c \sigma$ where $\omega_c$ is the centre frequency:
$$
p (x , \dot{x} ) = \frac{1}{2 \pi \sigma \cdot \omega_c \sigma}
\exp \left( - \frac{x^{2}}{2 \sigma^{2}} - \frac{\dot{x}^{2}}{2 \omega_c^{2} \sigma^{2}} \right) .
$$
The expected number of upcrossings of level $x$ per unit time is Rice's formula,
$$
\nu^{+} (x ) = \int_0^{\infty} \dot{x} \, p (x , \dot{x} ) \mathrm{d} \dot{x}
= \frac{\omega_c}{2 \pi} e^{- x^{2} / 2 \sigma^{2}} \int_0^{\infty} \frac{\dot{x}}{\omega_c \sigma} e^{- \dot{x}^{2} / 2 \omega_c^{2} \sigma^{2}} \mathrm{d} \dot{x}
= \frac{\omega_c}{2 \pi} e^{- x^{2} / 2 \sigma^{2}} ,
$$
because the integral equals one. For a narrow-band process every maximum is an upcrossing, so the density of peak amplitudes is proportional to $\nu^{+}$, and normalising over $X \ge 0$,
$$
p (X ) = \frac{X}{\sigma^{2}} e^{- X^{2} / 2 \sigma^{2}},
\qquad
P (X > x ) = e^{- x^{2} / 2 \sigma^{2}} ,
$$
the Rayleigh distribution.
**Equivalent stress.** With $S^{m} N = C$ and Miner's rule, the damage per unit time from $n$ cycles is
$$
D = \frac{n}{C} \mathbb{E} \left[ S^{m} \right],
\qquad
\mathbb{E} \left[ S^{m} \right] = \int_0^{\infty} S^{m} \frac{S}{\sigma^{2}} e^{- S^{2} / 2 \sigma^{2}} \mathrm{d} S .
$$
Substituting $u = S / \left( \sqrt{2} \sigma \right)$,
$$
\mathbb{E} \left[ S^{m} \right] = \left( \sqrt{2} \sigma \right)^{m} \int_0^{\infty} u^{m + 1} e^{- u^{2}} \mathrm{d} u
= \left( \sqrt{2} \sigma \right)^{m} \Gamma \! \left( 1 + \frac{m}{2} \right) ,
$$
so the damage-equivalent amplitude $S_{\text{eq}}$, defined by $D = n S_{\text{eq}}^{m} / C$, is
$$
S_{\text{eq}} = \sqrt{2} \, \sigma \left[ \Gamma \! \left( 1 + \tfrac{m}{2} \right) \right]^{1 / m} .
$$
For $m = 3$, $\Gamma (2.5) = 1.3293$, giving $S_{\text{eq}} = 1.414 \times 1.0996 \, \sigma = 1.555 \sigma$.
*Note.* Measured against the RMS of the **peak** distribution itself, which is $\sqrt{2} \sigma$ rather than the process RMS $\sigma$, the same result reads $S_{\text{eq}} = 1.10 \, \sigma_{\text{peaks}}$ — that is the classical **$1.1$ factor**, and the two statements are the same statement. Published factors range from about $1.05$ to $1.3$ depending on the S-N exponent and on whether small cycles are counted at all, so the honest practice is to state which convention was used. What is not in doubt is the shape of the argument: the fatigue damage of a random process is the RMS stress raised to the S-N exponent, multiplied by a number of order unity, and that is why random fatigue can be estimated from a single spectral measurement.
:::
:::
