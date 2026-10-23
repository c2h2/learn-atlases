Every reaction we have met so far in this course runs on the thermal energy of the molecules themselves: the Boltzmann tail of collisions ([[kinetics/collision-theory]]), a barrier crossed with the help of $RT$, a transition state sampled from the equilibrium population ([[kinetics/transition-state-theory]]). Photochemistry changes the rules at their root. A molecule that absorbs a photon does not climb the ground-state barrier with borrowed heat — it is *lifted whole* onto an excited-state surface, carrying several hundred $\mathrm{kJ\,mol^{-1}}$ of electronic energy that no $\mathrm{300\ K}$ collision supply. On that surface the molecule has different bond orders, a different geometry, a different acidity, a different spin, and a different set of barriers, most of them far smaller than the ones that protect the same molecule in the dark. This is why light can drive reactions that are thermodynamically uphill, why some reactions run at the same rate at $\mathrm{200\ K}$ and $\mathrm{300\ K}$, and why a quantum of light, not a concentration, becomes the natural unit of a rate law. Photochemical kinetics is the bookkeeping of that alternative economy: how many photons are absorbed, what fraction of excited molecules does chemistry rather than emitting light back, and how fast each of the competing deactivation paths runs.

## What light changes: excitation on the femtosecond timescale

::: definition Electronic excitation and the Franck–Condon principle {#def-excitation}
An **electronic excitation** is the promotion of one electron from an occupied molecular orbital to an unoccupied one, caused by absorbing a photon of energy $h\nu$ equal to the gap between the two states. Because an electronic transition takes of order $10^{-15}\ \mathrm{s}$ while a molecular vibration takes $10^{-14}$–$10^{-13}\ \mathrm{s}$, the nuclei are effectively frozen during the event: absorption is a **vertical transition** between potential energy surfaces drawn against the *ground-state* geometry. This is the **Franck–Condon principle**. The molecule therefore arrives on the excited surface at the geometry of the ground state — usually far above the excited-state minimum — and thermalises there by **vibrational relaxation** in $10^{-13}$–$10^{-11}\ \mathrm{s}$, long before any chemistry (which needs $10^{-12}\ \mathrm{s}$ or more) can occur.
:::

The kinetic consequence is the central contrast of this lesson. A thermal reaction is a rare event selected from an equilibrium population: the rate is the attempt frequency times the Boltzmann fraction $e^{-E_\mathrm{a}/RT}$ above the ground-state barrier, and it doubles every few $\mathrm{K}$. A photochemical reaction is not selected from a tail at all — the photon *creates* the reactive population, at a rate fixed by the light intensity and essentially independent of temperature, because the excited molecule reacts on the excited-state surface where the barriers are small. A reaction with a ground-state barrier of $250\ \mathrm{kJ\,mol^{-1}}$ (the $\pi$-bond barrier of a $\mathrm{C=C}$ double bond, which is why *cis* and *trans* alkenes do not interconvert on your desk) is invisible in the dark and complete in seconds under a lamp.

And thermodynamics is not violated, only re-booked. The relevant free-energy change is no longer $\Delta G$ of the dark reaction but $\Delta G - h\nu$ per molecule: **one molecule plus one photon** can beat a $\Delta G$ far larger than the photon's thermal rivals. A $\mathrm{300\ nm}$ photon carries $399\ \mathrm{kJ\,mol^{-1}}$ of photons' worth of free energy ([[#ex-photon-energy]]), so an isomerisation that is $50\ \mathrm{kJ\,mol^{-1}}$ uphill in the dark — *trans*-stilbene to *cis*-stilbene, say — runs readily under $\mathrm{300\ nm}$ light, and the illuminated mixture settles not at the thermodynamic equilibrium but at a **photostationary state** whose composition is fixed by the absorption bands and quantum yields of the two directions, not by $\Delta G$. Light is the one reagent you can dose in einsteins and switch off at will.

::: proposition Absorbed light: Beer–Lambert in kinetic form {#prop-absorption}
A parallel beam of monochromatic light of intensity $I_0$ (energy per area per time) passing through an absorbing solution of concentration $c$ and path length $z$ obeys, in the common base-$10$ units,
$$
I(z) = I_0\,10^{-\varepsilon c z} = I_0\,10^{-A},
\qquad A = \varepsilon c z,
$$
where $\varepsilon$ is the molar absorption coefficient in $\mathrm{dm^{3}\,mol^{-1}\,cm^{-1}}$ and $A$ the absorbance. The intensity **absorbed** by a cell of length $\ell$ is therefore
$$
I_\text{abs} = I_0 - I(\ell) = I_0\left(1 - 10^{-A}\right),
$$
and in the **low-absorbance limit** ($A \ll 1$), since $10^{-A} = e^{-2.303A} \approx 1 - 2.303A$,
$$
I_\text{abs} \approx 2.303\,I_0 A = 2.303\,I_0\,\varepsilon c \ell .
$$
Only $I_\text{abs}$ counts in photochemical kinetics: transmitted photons do nothing. The natural units are the **einstein** — one mole of photons, $N_\mathrm{A} = 6.022\times10^{23}$ photons — and the **photon flux** in einstein $\mathrm{s^{-1}}$; intensities in einstein $\mathrm{s^{-1}}$ multiply quantum yields directly into molar rates.
:::

::: example The energy of a photon and of an einstein {#ex-photon-energy}
Find the energy of a photon of $\lambda = \mathrm{300\ nm}$ light and of one einstein of it, and compare with bond energies.
::: solution
$$
E = \frac{hc}{\lambda} = \frac{6.626\times10^{-34}\ \mathrm{J\,s} \times 2.998\times10^{8}\ \mathrm{m\,s^{-1}}}{300\times10^{-9}\ \mathrm{m}} = 6.62\times10^{-19}\ \mathrm{J}.
$$
One einstein is a mole of such photons:
$$
E_\mathrm{m} = 6.62\times10^{-19} \times 6.022\times10^{23} = 3.99\times10^{5}\ \mathrm{J\,mol^{-1}} = 399\ \mathrm{kJ\,mol^{-1}}.
$$
For scale: a $\mathrm{C{-}Br}$ bond costs about $293\ \mathrm{kJ\,mol^{-1}}$ to break and a $\mathrm{C=C}$ $\pi$ bond about $265\ \mathrm{kJ\,mol^{-1}}$, so a single $\mathrm{300\ nm}$ photon carries enough energy to cleave either — which is exactly why alkyl bromides photolyse and alkenes isomerise under near-UV light. Blue light at $\mathrm{436\ nm}$ carries $274\ \mathrm{kJ\,mol^{-1}}$ per einstein: still bond-breaking strength, and the reason visible-light photochemistry needs sensitiser dyes with small gaps or weak bonds. The wavelength dependence is all in $1/\lambda$: halve the wavelength, double the photon energy.
:::
:::

::: example Photon flux of a lamp {#ex-lamp-flux}
A photolysis lamp delivers $\mathrm{5.0\ W}$ of radiant power at the line $\lambda = \mathrm{313\ nm}$ into a reaction vessel. What is the photon flux in photons per second and in einstein per second?
::: solution
Energy per photon:
$$
E = \frac{hc}{\lambda} = \frac{1.986\times10^{-25}\ \mathrm{J\,m}}{313\times10^{-9}\ \mathrm{m}} = 6.35\times10^{-19}\ \mathrm{J}.
$$
Photons per second:
$$
\frac{P}{E} = \frac{5.0\ \mathrm{J\,s^{-1}}}{6.35\times10^{-19}\ \mathrm{J}} = 7.9\times10^{18}\ \mathrm{s^{-1}}.
$$
In einsteins:
$$
\frac{7.9\times10^{18}}{6.022\times10^{23}} = 1.3\times10^{-5}\ \mathrm{einstein\,s^{-1}} = 13\ \mu\mathrm{mol\,s^{-1}}.
$$
Two cautions the arithmetic hides. First, $\mathrm{5.0\ W}$ here is *radiant power at $\mathrm{313\ nm}$ absorbed by the chemistry*, not wall-plug power: a lamp rated $\mathrm{125\ W}$ may deliver only a few watts in the useful line, and the rest is heat. Second, this is the flux *arriving*; the flux *absorbed* is $I_0(1-10^{-A})$, and only that enters the rate law.
:::
:::

::: widget plot
f: 10^(-a*x)
x: 0, 4
y: 0, 1.05
sliders: a=0.5:0.1:2:0.1
labels: \text{transmitted fraction } I/I_0
caption: The Beer–Lambert decay of a beam inside an absorbing medium: the fraction of light still unabsorbed after an optical depth $A = \varepsilon c z$ (here $x$ is $A$, and the slider sets the absorbance per unit path length). The curve is exponential in base $10$: one unit of absorbance transmits a tenth, two units a hundredth. The *area between the curve and the top* is the light absorbed — which is why a quantum yield computed from the incident intensity is wrong unless $A$ is small enough that essentially everything is absorbed, or large enough that only the front of the cell reacts.
:::

::: example The low-absorbance approximation, checked {#ex-iabs-lowA}
A solution with $\varepsilon = 150\ \mathrm{dm^{3}\,mol^{-1}\,cm^{-1}}$ at the lamp wavelength has $c = 2.00\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ in a $\mathrm{1.00\ cm}$ cell. What fraction of the light is absorbed? Compare the exact expression with the limit $I_\text{abs}/I_0 \approx 2.303 A$.
::: solution
$A = \varepsilon c \ell = 150 \times 2.00\times10^{-4} \times 1.00 = 0.0300$. Exact:
$$
\frac{I_\text{abs}}{I_0} = 1 - 10^{-0.0300} = 1 - 0.9332 = 0.0667 .
$$
Approximation: $2.303 \times 0.0300 = 0.0691$, an overestimate by $3.5\ \%$. At $A = 0.10$ the same approximation errs by $12\ \%$, and at $A = 1$ it predicts $I_\text{abs} = 2.3 I_0$ — absurd. The rule of thumb: use $I_\text{abs} \approx 2.303 I_0 A$ only below $A \approx 0.05$, where it is good to a couple of per cent; it is what makes low-absorbance photochemistry first order in absorber concentration, because then the absorbed intensity is proportional to $c$.
:::
:::

## The Stark–Einstein law and the quantum yield

::: definition Quantum yield; the Stark–Einstein law {#def-quantum-yield}
The **quantum yield** $\Phi$ of a photochemical process is
$$
\Phi = \frac{\text{number of molecules reacting (or events occurring)}}{\text{number of photons absorbed}} = \frac{\text{moles of product}}{\text{einsteins absorbed}} ,
$$
a pure number. The **Stark–Einstein law of photochemical equivalence** states that light of a given frequency acts in units of $h\nu$: *one photon is absorbed by one molecule and produces one primary photochemical event*. It follows that the rate of the **primary** step is simply the absorbed photon flux, $v_\text{prim} = I_\text{abs}$, and that the primary quantum yield cannot exceed $1$. An observed $\Phi$ differs from $1$ because of what happens *after* the primary event: deactivation paths return the molecule unchanged and drive $\Phi < 1$; chain carriers and secondary chemistry multiply each absorbed photon's effect and drive $\Phi > 1$.
:::

::: example Quantum yield from moles and einsteins {#ex-phi-measure}
A solution of *cis*-stilbene is irradiated at $\mathrm{313\ nm}$ for $\mathrm{25.0\ min}$; a calibrated actinometer shows the sample absorbs $2.00\times10^{-8}\ \mathrm{einstein\,s^{-1}}$. Analysis finds $1.05\times10^{-5}\ \mathrm{mol}$ of *trans*-stilbene formed. Find $\Phi$.
::: solution
Einsteins absorbed:
$$
2.00\times10^{-8}\ \mathrm{einstein\,s^{-1}} \times 1500\ \mathrm{s} = 3.00\times10^{-5}\ \mathrm{einstein}.
$$
Quantum yield:
$$
\Phi = \frac{1.05\times10^{-5}\ \mathrm{mol}}{3.00\times10^{-5}\ \mathrm{einstein}} = 0.35 .
$$
Two molecules of *cis* isomerise for every three photons absorbed: the excited state fails to react about two times in three, losing its energy to emission, internal conversion or reverse isomerisation before it escapes the twisted geometry. Note that $\Phi$ is dimensionless only because we counted *absorbed* einsteins; using the incident flux without measuring $A$ would have produced a meaningless "yield" that changes with concentration and cell length.
:::
:::

::: warning Φ ≫ 1 does not break the Stark–Einstein law {#warn-phi-gt1}
The photochlorination of hydrogen, $\mathrm{H_2 + Cl_2 \rightarrow 2\,HCl}$, shows quantum yields up to $10^{6}$ under some conditions; the $\mathrm{H_2 + Br_2}$ chain gives tens. This is no exception to one-photon-one-event: the photon still produces exactly one primary event (one $\mathrm{Cl_2}$ cleavage, say), but that event spawns a **chain carrier** which turns over thousands of times before it dies, exactly as in [[kinetics/chain-reactions]]. $\Phi > 1$ is evidence *for* a chain mechanism, and how far above $1$ it sits is a kinetic measurement of the kinetic chain length. The genuinely deep exceptions to Stark–Einstein are of two kinds: **two-photon processes**, where a molecule needs two photons nearly simultaneously (their rates go as $I^2$, and they are negligible except under lasers), and chains like the one above, where the *primary* yield is one and the *observed* yield is chemistry after the photon. Never conclude from $\Phi = 10^{3}$ that "one photon did a thousand reactions directly"; conclude that one photon started something that ran away.
:::

## The Jablonski diagram as a kinetic scheme

::: definition The Jablonski diagram and the deactivation paths {#def-jablonski}
The **Jablonski diagram** arranges electronic states in columns by spin multiplicity — singlets $\mathrm{S_0, S_1, S_2, \ldots}$, triplet $\mathrm{T_1}$, with vibrational levels stacked inside each — and draws the transitions between them as arrows. The paths, with typical first-order rate constants:
- **absorption** $\mathrm{S_0 \rightarrow S_n}$: $10^{12}$–$10^{14}\ \mathrm{s^{-1}}$ in intensity terms, vertical (Franck–Condon);
- **vibrational relaxation** within a state: $10^{13}$–$10^{11}\ \mathrm{s^{-1}}$;
- **internal conversion (IC)**, $\mathrm{S_n \rightarrow S_{n-1}}$ between states of the *same* spin: $10^{14}$–$10^{11}\ \mathrm{s^{-1}}$;
- **fluorescence**, $\mathrm{S_1 \rightarrow S_0 + }h\nu_\mathrm{f}$: spin-allowed, $k_\mathrm{f} \sim 10^{8}$–$10^{7}\ \mathrm{s^{-1}}$, lifetimes $10^{-9}$–$10^{-7}\ \mathrm{s}$;
- **intersystem crossing (ISC)**, $\mathrm{S_1 \rightarrow T_1}$: spin-forbidden but spin–orbit-allowed, $10^{11}$–$10^{6}\ \mathrm{s^{-1}}$, enhanced by heavy atoms;
- **phosphorescence**, $\mathrm{T_1 \rightarrow S_0 + }h\nu_\mathrm{p}$: spin-forbidden, $10^{3}$–$0.1\ \mathrm{s^{-1}}$, lifetimes $10^{-3}$–$10\ \mathrm{s}$ or longer;
- **quenching** by a solute $\mathrm{Q}$: bimolecular, $k_q[\mathrm{Q}]$;
- **energy transfer** (e.g. $\mathrm{S_1}$ or $\mathrm{T_1}$ handing its energy to a neighbour) and **electron transfer** (an excited molecule is both a far better reductant and a far better oxidant than the ground state).
Because vibrational relaxation and IC are faster than fluorescence, emission almost always comes from the lowest state of the relevant multiplicity — **Kasha's rule** — which is why fluorescence spectra barely depend on the excitation wavelength.
:::

The diagram is not a mood board; it is a **kinetic scheme**. Every arrow is a first-order rate constant (or $k_q[\mathrm{Q}]$ for the bimolecular ones), the population of $\mathrm{S_1}$ decays by the sum of all of them, and every quantum yield is a branching ratio.

::: proposition Quantum yields and lifetimes from the scheme {#prop-phi-tau}
Let the excited state $\mathrm{S_1}$ depopulate by fluorescence $k_\mathrm{f}$, internal conversion $k_\mathrm{IC}$, intersystem crossing $k_\mathrm{ISC}$ and quenching $k_q[\mathrm{Q}]$, all first order or pseudo-first-order. Then
$$
\Phi_\mathrm{f} = \frac{k_\mathrm{f}}{k_\mathrm{f} + k_\mathrm{IC} + k_\mathrm{ISC} + k_q[\mathrm{Q}]},
$$
and the excited-state population decays exponentially with
$$
\frac{1}{\tau} = k_\mathrm{f} + k_\mathrm{IC} + k_\mathrm{ISC} + k_q[\mathrm{Q}],
\qquad
\frac{1}{\tau_0} = k_\mathrm{f} + k_\mathrm{IC} + k_\mathrm{ISC} \quad (\text{no quencher}),
$$
where $\tau_0$ is the **natural (radiative-corrected) lifetime**. In particular $\Phi_\mathrm{f} = k_\mathrm{f}\,\tau$: the observed lifetime *measures the denominator*, so the two together give the individual constants. The **Strickler–Berg relation** ties the radiative constant to the absorption spectrum: $k_\mathrm{f}$ grows with the cube of the transition frequency and with the intensity of the absorption band, because the same transition dipole that lets the molecule absorb a photon lets it emit one — a strongly absorbing chromophore is a fast, bright emitter, with natural lifetimes of a few $\mathrm{ns}$.
:::

::: proof Quantum yield as a branching ratio {#proof-phi}
After an infinitely short excitation pulse, let $[\mathrm{S_1}](0) = [\mathrm{S_1}]_0$ and no quencher. The population obeys
$$
\frac{\mathrm{d}[\mathrm{S_1}]}{\mathrm{d}t} = -\left(k_\mathrm{f} + k_\mathrm{IC} + k_\mathrm{ISC}\right)[\mathrm{S_1}] = -\frac{[\mathrm{S_1}]}{\tau_0},
\qquad
[\mathrm{S_1}](t) = [\mathrm{S_1}]_0\,e^{-t/\tau_0}.
$$
The total number of photons emitted is the time-integral of the fluorescence rate:
$$
N_\mathrm{f} = \int_0^\infty k_\mathrm{f}[\mathrm{S_1}]\,\mathrm{d}t
= k_\mathrm{f}[\mathrm{S_1}]_0 \int_0^\infty e^{-t/\tau_0}\,\mathrm{d}t
= k_\mathrm{f}\,\tau_0\,[\mathrm{S_1}]_0 .
$$
Dividing by the number of excited molecules, and writing $\tau_0^{-1}$ for the sum, gives $\Phi_\mathrm{f} = k_\mathrm{f}\tau_0 = k_\mathrm{f}/(k_\mathrm{f} + k_\mathrm{IC} + k_\mathrm{ISC})$. Adding a quencher appends $k_q[\mathrm{Q}]$ to every denominator at once — to the emission integral and to the decay rate alike — which is the whole content of [[#prop-stern-volmer]]. The same argument with $k_\mathrm{ISC}$ in the numerator gives the triplet yield $\Phi_\mathrm{T}$, and with a reaction constant $k_\mathrm{r}$ gives the chemical yield $\Phi_\mathrm{r} = k_\mathrm{r}\tau$; the quantum yield of any process is its rate constant times the observed lifetime.
:::

::: example Φ_f and τ from rate constants {#ex-phifrom-k}
For a fluorophore, $k_\mathrm{f} = 5.0\times10^{7}\ \mathrm{s^{-1}}$, $k_\mathrm{IC} = 1.0\times10^{7}\ \mathrm{s^{-1}}$, $k_\mathrm{ISC} = 4.0\times10^{7}\ \mathrm{s^{-1}}$. Find $\Phi_\mathrm{f}$ and $\tau_0$. A quencher at a concentration giving $k_q[\mathrm{Q}] = 2.0\times10^{7}\ \mathrm{s^{-1}}$ is added: find the new $\Phi_\mathrm{f}$ and $\tau$.
::: solution
Without quencher:
$$
\frac{1}{\tau_0} = (5.0 + 1.0 + 4.0)\times10^{7} = 1.0\times10^{8}\ \mathrm{s^{-1}}
\quad\Longrightarrow\quad
\tau_0 = 1.0\times10^{-8}\ \mathrm{s} = 10.0\ \mathrm{ns},
$$
$$
\Phi_\mathrm{f} = k_\mathrm{f}\tau_0 = 5.0\times10^{7} \times 1.0\times10^{-8} = 0.50 .
$$
With quencher the sum becomes $1.2\times10^{8}\ \mathrm{s^{-1}}$, so $\tau = 8.3\ \mathrm{ns}$ and $\Phi_\mathrm{f} = 5.0\times10^{7}\times8.3\times10^{-9} = 0.42$. The check is the theorem itself: $\Phi_\mathrm{f}/\Phi_\mathrm{f}^{(0)} = 0.42/0.50 = 0.83 = \tau/\tau_0$ — quenching cuts yield and lifetime by the *same* factor, because both are the same branching ratio.
:::
:::

::: widget odesolver
f: -y
y0: 1
t: 0, 8
exact: exp(-t)
h: 0.25
caption: The excited-state population $y = [\mathrm{S_1}]/[\mathrm{S_1}]_0$ after a short pulse, in units of the natural lifetime $\tau_0$: the exact exponential $e^{-t/\tau_0}$ against the Euler, Heun and RK4 approximations, with the step size $h$ on a slider. Every deactivation path — fluorescence, internal conversion, intersystem crossing, quenching — only changes the *slope* $1/\tau$, never the exponential shape, because each is first order. Reading $\tau$ from a decay trace is therefore always a straight-line fit of $\ln y$ against $t$, and adding a quencher just tilts the line.
:::

::: warning A large Φ_f with a short τ and a large Φ_f with a long τ are different materials {#warn-bright-lifetime}
$\Phi_\mathrm{f} = k_\mathrm{f}\tau$ is a product, and the same value can come from opposite balances. A fluorophore with $\Phi_\mathrm{f} = 0.9$ and $\tau = 1\ \mathrm{ns}$ has $k_\mathrm{f} \approx 9\times10^{8}\ \mathrm{s^{-1}}$: it is intrinsically bright, and nothing else competes. A phosphor with $\Phi_\mathrm{f} = 0.9$ and $\tau = 10\ \mathrm{ms}$ has $k_\mathrm{f} \approx 90\ \mathrm{s^{-1}}$: it emits slowly because it is *forbidden*, and it stays excited long enough for collisions, oxygen and neighbouring molecules to find it. The first is a fluorescence standard; the second is an oxygen sensor and a triplet photosensitiser, and would be useless as the other. Reporting a quantum yield without a lifetime (or vice versa) leaves the reader unable to tell which material they are being offered — and designing a photosensitiser means choosing $k_\mathrm{ISC}$ and $\tau_\mathrm{T}$, not just "a high yield".
:::

::: history
The photochemical equivalence law — one photon, one activated molecule — was proposed by Johannes Stark in 1908 and given its classical form by Albert Einstein in 1912, in one of the earliest physical applications of the quantum hypothesis; the law fixed the *primary* step, and the decades-long discovery that most absorbed photons do *not* go on to chemistry was what made the quantum yield a number to be measured rather than a constant of nature. Alexander Jablonski's diagrams of 1933 and 1935 gathered fluorescence, phosphorescence and the dark paths into the single kinetic picture still printed in every textbook, and Michael Kasha's rule of 1950 — emission from the lowest level of each multiplicity — explained why emission ignores excitation wavelength. The dark states themselves became measurable when Ronald Norrish and George Porter developed flash photolysis in the 1950s, pulsing a sample with a capacitor discharge and catching the short-lived radicals and triplets by their absorption; they shared the 1967 Nobel Prize in Chemistry with Manfred Eigen for making the fast intermediates of chemistry routine objects of kinetics.
:::

## Quenching kinetics: the Stern–Volmer equation

::: proposition The Stern–Volmer equation {#prop-stern-volmer}
A quencher $\mathrm{Q}$ deactivates the excited state by a bimolecular step with rate constant $k_q$, adding $k_q[\mathrm{Q}]$ to the decay rate. Then the fluorescence intensity $I_\mathrm{f}$ and the observed lifetime $\tau$ both obey the **Stern–Volmer equation**,
$$
\frac{I_{\mathrm{f}0}}{I_\mathrm{f}} = 1 + K_\mathrm{SV}[\mathrm{Q}],
\qquad K_\mathrm{SV} = k_q\,\tau_0 ,
$$
and, for **dynamic (collisional) quenching only**, the lifetime ratio gives the same line,
$$
\frac{\tau_0}{\tau} = 1 + k_q\tau_0[\mathrm{Q}] .
$$
$K_\mathrm{SV}$ has units $\mathrm{dm^{3}\,mol^{-1}}$; a Stern–Volmer plot of $I_{\mathrm{f}0}/I_\mathrm{f}$ against $[\mathrm{Q}]$ is a straight line of slope $k_q\tau_0$ through $1$. If intensities fall but lifetimes do not, the quenching is **static** — $\mathrm{Q}$ binds the fluorophore in the ground state, removing emitters without slowing the survivors — and the two measurements separate the mechanisms.
:::

::: proof The Stern–Volmer equation {#proof-sv}
From [[#proof-phi]], the fluorescence intensity at any quencher concentration is proportional to the quantum yield, $I_\mathrm{f} \propto \Phi_\mathrm{f} = k_\mathrm{f}\tau$, with
$$
\frac{1}{\tau} = \frac{1}{\tau_0} + k_q[\mathrm{Q}].
$$
Take the ratio of the unquenched to quenched intensity:
$$
\frac{I_{\mathrm{f}0}}{I_\mathrm{f}} = \frac{\Phi_{\mathrm{f}0}}{\Phi_\mathrm{f}}
= \frac{k_\mathrm{f}\tau_0}{k_\mathrm{f}\tau} = \frac{\tau_0}{\tau}
= \tau_0\left(\frac{1}{\tau_0} + k_q[\mathrm{Q}]\right)
= 1 + k_q\tau_0[\mathrm{Q}],
$$
where the second line used $\Phi_\mathrm{f} = k_\mathrm{f}\tau$ and the third substituted the decay rates. Both measured ratios are the same straight line with slope $K_\mathrm{SV} = k_q\tau_0$. The factorisation is the physics: $\tau_0$ says how long the excited state lives to be quenched, $k_q$ says how efficiently a collision quenches it, and their product is the sensitivity of the fluorescence to $[\mathrm{Q}]$. For static quenching the same algebra fails for $\tau$: a complexed molecule never emits and never decays, so the survivors keep $\tau = \tau_0$ while the intensity drops by the binding factor — which is exactly how the two are told apart.
:::

::: example A Stern–Volmer fit: k_q and τ₀ {#ex-sv-fit}
The fluorescence of a quinine derivative is quenched by iodide ion, giving:

| $[\mathrm{I^-}]/\mathrm{mol\,dm^{-3}}$ | 0 | 0.010 | 0.020 | 0.030 | 0.040 |
|---|---|---|---|---|---|
| $I_{\mathrm{f}0}/I_\mathrm{f}$ | 1.00 | 1.50 | 2.00 | 2.50 | 3.00 |

Independent lifetime measurements give $\tau_0 = 5.0\ \mathrm{ns}$. Find $K_\mathrm{SV}$ and $k_q$, and interpret.
::: solution
The ratios rise by $0.50$ per $0.010\ \mathrm{mol\,dm^{-3}}$: the plot is a straight line through $1.00$ with slope
$$
K_\mathrm{SV} = \frac{3.00 - 1.00}{0.040} = 50\ \mathrm{dm^{3}\,mol^{-1}} .
$$
Then
$$
k_q = \frac{K_\mathrm{SV}}{\tau_0} = \frac{50}{5.0\times10^{-9}} = 1.0\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}} .
$$
That is the diffusion-controlled ceiling: in water at $\mathrm{298\ K}$ the Smoluchowski limit $k_\text{diff} = 8RT/(3\eta) \approx 7\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ (see [[kinetics/reaction-dynamics]]), so essentially *every* collision between $\mathrm{I^-}$ and the excited molecule quenches it. The Stern–Volmer plot alone cannot say whether the fall in intensity is collisions or complex formation; the fact that the measured $\tau$ shortens with $[\mathrm{I^-}]$ by the same factor proves dynamic quenching.
:::
:::

::: widget plot
f: 1 + K*x
x: 0, 0.05
y: 0.8, 3.6
sliders: K=50:0:200:5
labels: \text{Stern--Volmer line}
caption: The Stern–Volmer line $I_{\mathrm{f}0}/I_\mathrm{f} = 1 + K_\mathrm{SV}[\mathrm{Q}]$ against quencher concentration, with $K_\mathrm{SV} = k_q\tau_0$ (in $\mathrm{dm^{3}\,mol^{-1}}$) set by the slider. The intercept is pinned at $1$ — with no quencher there is nothing to subtract — so a single straight line through the data fixes the sensitivity. A large $K_\mathrm{SV}$ can mean a fast $k_q$ or a long $\tau_0$; only the lifetime measurement tells you which, and only the comparison of the intensity line with the lifetime line tells you whether quenching is dynamic at all.
:::

::: quiz
A dye's fluorescence intensity falls to half when $0.020\ \mathrm{mol\,dm^{-3}}$ of a quencher is added, but time-resolved measurement shows the fluorescence lifetime is unchanged at $4.0\ \mathrm{ns}$. What is happening?
- [x] Static quenching: the quencher binds the dye in the ground state, removing half the emitters while the uncomplexed molecules live their normal $4.0\ \mathrm{ns}$.
- [ ] Dynamic quenching with $k_q = 2.5\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.
- [ ] The instrument is broken: intensity and lifetime always fall together.
- [ ] The quencher speeds up fluorescence, cancelling its own effect.
::: solution
Dynamic quenching must shorten the lifetime by the same factor it shortens the intensity ($\tau_0/\tau = I_{\mathrm{f}0}/I_\mathrm{f}$, see [[#proof-sv]]); an unchanged $\tau$ with a halved intensity is the signature of a ground-state complex. Also note $k_q = 2.5\times10^{10}$ would exceed the diffusion limit, itself a warning that the dynamic reading is wrong.
:::
:::

Quenching is not only a nuisance to be corrected; it is a *measurement*. Molecular oxygen is a triplet, and it quenches many fluorescent and phosphorescent states by energy transfer with near-diffusion-limited $k_q$, so the Stern–Volmer line converts a lifetime or intensity into an oxygen concentration — the basis of optical oxygen sensors in cell culture and packaging, calibrated once against gas mixtures. Fluorescence-lifetime imaging in microscopy works the other way round: it maps $\tau$ rather than intensity, because $\tau$ is immune to how much dye there is, to lamp drift, and to how much light you happen to collect, while intensity is hostage to all three. Both applications are measurement context: the chemistry they rest on is the branching algebra of [[#prop-phi-tau]].

## Photochemical rate laws and chain quantum yields

::: proposition The photochemical rate law {#prop-photo-rate}
If each absorbed photon produces product with quantum yield $\Phi$, the rate of product formation is
$$
\frac{\mathrm{d}[\mathrm{P}]}{\mathrm{d}t} = \frac{\Phi\,I_\text{abs}}{V} = \frac{\Phi\,I_0}{V}\left(1 - 10^{-\varepsilon c \ell}\right),
$$
with $I_\text{abs}$ in einstein $\mathrm{s^{-1}}$ and $V$ the illuminated volume. Two limits matter. At **low absorbance**, $\mathrm{d}[\mathrm{P}]/\mathrm{d}t \propto \Phi I_0 \varepsilon c\ell$: first order in the absorber, first order in intensity. At **high absorbance** ($A > 2$) essentially all light is gone in the first fraction of the path, the rate is zero order in concentration, proportional to $I_0$, and confined to a thin layer — which is why quantum yields are measured on dilute, well-stirred samples. Because the rate is set by $I_\text{abs}$ and not by a thermal $e^{-E_\mathrm{a}/RT}$, a primary photochemical step shows little temperature dependence: Arrhenius plots of photochemical rates are flat until secondary thermal steps take over.
:::

The classic probes of this structure are the photochemical chain reactions of hydrogen. In $\mathrm{H_2 + Br_2}$ photolysis, one absorbed photon yields on the order of ten $\mathrm{HBr}$ molecules — a modest chain. In $\mathrm{H_2 + Cl_2}$ the yield reaches $10^{4}$–$10^{6}$: the photon splits $\mathrm{Cl_2}$, and each $\mathrm{Cl\cdot}$ cycles $\mathrm{Cl\cdot + H_2 \rightarrow HCl + H\cdot}$, $\mathrm{H\cdot + Cl_2 \rightarrow HCl + Cl\cdot}$ thousands of times. When chains are long and terminate by radical–radical steps, the steady-state analysis of [[kinetics/chain-reactions]] gives a rate proportional to $I_\text{abs}^{1/2}$ rather than $I_\text{abs}$, so the *quantum yield* falls with intensity,
$$
\Phi \propto I_\text{abs}^{-1/2},
$$
because doubling the light doubles the number of chains but shortens each by $\sqrt{2}$: more starts, shorter runs. Observing $\Phi \propto I^{-1/2}$ is as good evidence for long bimolecularly-terminated chains as the rate law itself, and observing $\Phi \propto I^{+1}$ is evidence for two-photon absorption. The full machinery — initiation at $I_\text{abs}$, propagation, termination, the steady state — is exactly [[kinetics/reaction-mechanisms]] with $I_\text{abs}$ in the place of a thermal initiation rate.

**Photosensitisation** extends photochemistry to molecules that do not absorb the light. A sensitiser $\mathrm{S}$ absorbs, crosses to its triplet by ISC, and hands its triplet energy to a substrate $\mathrm{A}$ that cannot reach its own triplet directly: $\mathrm{S \rightarrow {}^1S \rightarrow {}^3S}$, then $\mathrm{{}^3S + A \rightarrow S + {}^3A}$. The chemistry is then $\mathrm{{}^3A}$'s — for alkenes, triplet addition breaks the $\pi$ bond's memory of geometry, and *cis*–*trans* mixtures scramble to a photostationary composition (benzophenone under $\mathrm{365\ nm}$ light is the textbook sensitiser). The same triplet transfer explains the most famous reaction of dissolved oxygen: ground-state $\mathrm{O_2}$ is a triplet and accepts energy to become singlet oxygen, $\mathrm{{}^3S + {}^3O_2 \rightarrow S + {}^1O_2}$, an electrophilic oxidant that adds dienes and sulfides; describing it here is enough for kinetics, and its mechanism belongs to photochemical organic chemistry. Sensitisation is also why a reaction can be driven by light the substrate does not absorb at all — the kinetic signature is that the rate follows the *sensitiser's* absorbance, not the substrate's.

## Safety: ultraviolet radiation and photostationary mixtures

::: warning Ultraviolet light is a reagent — treat it as one {#warn-uv}
Ultraviolet radiation is classified by wavelength because its hazards differ: **UVA** ($\mathrm{315}$–$\mathrm{400\ nm}$) reaches the lens and retina and drives chronic damage and skin ageing; **UVB** ($\mathrm{280}$–$\mathrm{315\ nm}$) is the erythema (sunburn) and skin-carcinogen band and is also the common photolysis band ($\mathrm{313\ nm}$ mercury line); **UVC** ($\mathrm{100}$–$\mathrm{280\ nm}$, including the $\mathrm{254\ nm}$ germicidal line) is stopped by the cornea — where it causes painful photokeratitis — and by ordinary glass, but germicidal lamps must still never be looked at, and their ozone production needs ventilation. UV lamps need shielding that passes visible light but not UV (most lamp housings are designed for this), interlocks, and the habit of never operating one without eye protection rated for the band; note that damage is *photochemical*, so it accumulates with exposure time at invisible wavelengths and gives no pain warning in the moment. And treat the sample as well as the lamp: a photostationary mixture is not a safe mixture — continuous irradiation can accumulate photoproducts far from the thermodynamic minimum (strained isomers, peroxides from oxygen, cleavage fragments), sometimes in sealed tubes; expect the photochemistry to have made *something*, analyse before concentrating, and never leave a sealed, oxygen-containing flask in sunlight.
:::

## Where this leads

The femtosecond birth of an excited state treated here as a postulate — vertical, then relaxed — is exactly what molecular beam and laser experiments now watch directly: energy disposal state by state is [[kinetics/reaction-dynamics]], which also carries the Smoluchowski diffusion limit used in the Stern–Volmer example. The chain quantum yields $\Phi \propto I^{-1/2}$ are one chapter of [[kinetics/chain-reactions]], where the steady-state treatment of radical chains is worked out in full and photochemical initiation is just $R_\mathrm{i} = I_\text{abs}$. And the excited-state surfaces of the Jablonski diagram are the multi-surface generalisation of the single ground-state saddle of [[kinetics/transition-state-theory]]: where a thermal reaction threads one transition state, an excited molecule hunts for the *conical intersections* where surfaces touch and it falls back to $\mathrm{S_0}$ — the funnel behind vision, photostability and most photochemical quantum yields below one.

::: summary
- Light excites on the femtosecond timescale (Franck–Condon): the molecule is lifted onto an excited-state surface instead of climbing the ground-state barrier, so $\Delta G > 0$ reactions run when $\Delta G - h\nu < 0$ — one molecule plus one photon.
- Only absorbed light counts: $I_\text{abs} = I_0(1 - 10^{-A})$, with $I_\text{abs} \approx 2.303 I_0 A$ below $A \approx 0.05$; intensities are booked in einsteins ($\mathrm{mol}$ photons).
- Stark–Einstein: one photon, one primary event, so the primary rate is $I_\text{abs}$ and $\Phi_\text{prim} \le 1$; observed $\Phi \ne 1$ comes from deactivation ($\Phi < 1$), chains ($\Phi \gg 1$) or two-photon steps ($\Phi \propto I$).
- The Jablonski diagram is a kinetic scheme: every path is a first-order constant, $\Phi_i = k_i\tau$ and $1/\tau = \sum k$; fluorescence is spin-allowed and fast ($10^{-9}$–$10^{-7}\ \mathrm{s}$), phosphorescence spin-forbidden and slow ($10^{-3}$–$10\ \mathrm{s}$).
- Stern–Volmer: $I_{\mathrm{f}0}/I_\mathrm{f} = \tau_0/\tau = 1 + k_q\tau_0[\mathrm{Q}]$ for dynamic quenching; intensity falling with lifetime unchanged means static quenching.
- $k_q$ is capped by diffusion at $\sim 10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ in water, so $K_\mathrm{SV}/\tau_0$ near the cap means every encounter quenches.
- $\mathrm{d}[\mathrm{P}]/\mathrm{d}t = \Phi I_\text{abs}/V$: first order in intensity at low absorbance, zero order in absorber at high; chain yields $\Phi \propto I^{-1/2}$ betray long chains.
- UV hazards are band-specific (UVA/UVB/UVC) and damage is photochemical and painless in the moment; photostationary mixtures can accumulate reactive photoproducts.
:::

## Exercises

::: exercise Photon energy at 254 nm {level=1 check="471"}
Find the energy of one einstein of $\mathrm{254\ nm}$ light. (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$E_\mathrm{m} = N_\mathrm{A}hc/\lambda = 6.022\times10^{23} \times 6.626\times10^{-34} \times 2.998\times10^{8} / 254\times10^{-9} = 4.71\times10^{5}\ \mathrm{J\,mol^{-1}} = 471\ \mathrm{kJ\,mol^{-1}}$ — enough to cleave most single bonds, which is why $\mathrm{254\ nm}$ is called a "destructive" wavelength and why germicidal lamps also make ozone in air.
:::
:::

::: exercise Photons to einsteins {level=1 check="0.5"}
A lamp beam delivers $3.01\times10^{17}$ photons per second. Express the photon flux in $\mu\mathrm{mol}$ photons $\mathrm{s^{-1}}$ (i.e. $\mu$einstein $\mathrm{s^{-1}}$).
::: solution
$\phi = 3.01\times10^{17} / 6.022\times10^{23} = 5.0\times10^{-7}\ \mathrm{einstein\,s^{-1}} = 0.50\ \mu\mathrm{einstein\,s^{-1}}$. One einstein is simply Avogadro's number of photons, so the conversion is a division by $N_\mathrm{A}$ and nothing else.
:::
:::

::: exercise Fraction absorbed {level=1 check="4.5"}
A cell of path length $\mathrm{1.00\ cm}$ holds a solution of absorbance $A = 0.0200$ at the lamp wavelength. What fraction of the incident light is absorbed? (Enter the percentage.)
::: solution
$1 - 10^{-0.0200} = 1 - 0.9550 = 0.0450$, i.e. $4.5\ \%$. The linear estimate $2.303A = 0.0461$ ($4.6\ \%$) is high by $2.3\ \%$ relative — acceptable here, and the reason low-absorbance quantum-yield work is done at $A \lesssim 0.05$.
:::
:::

::: exercise Quantum yield from an actinometry experiment {level=2 check="0.25"}
A sample absorbs $4.00\times10^{-8}\ \mathrm{einstein\,s^{-1}}$ at $\mathrm{313\ nm}$. After $\mathrm{10.0\ min}$ of irradiation, $6.0\times10^{-6}\ \mathrm{mol}$ of product has formed. Find the quantum yield.
::: solution
Einsteins absorbed: $4.00\times10^{-8} \times 600 = 2.40\times10^{-5}$. $\Phi = 6.0\times10^{-6} / 2.40\times10^{-5} = 0.25$. Two significant figures, set by the $6.0\times10^{-6}$; the answer says one product molecule per four photons absorbed, with the remaining three-quarters of excitations lost to deactivation or back-reaction.
:::
:::

::: exercise Quencher for half the fluorescence {level=2 check="0.021"}
A fluorophore has $\tau_0 = 4.0\ \mathrm{ns}$ and is dynamically quenched with $k_q = 1.2\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. What quencher concentration halves the fluorescence intensity? (Enter $[\mathrm{Q}]$ in $\mathrm{mol\,dm^{-3}}$, to two significant figures.)
::: solution
Half intensity means $I_{\mathrm{f}0}/I_\mathrm{f} = 2 = 1 + k_q\tau_0[\mathrm{Q}]$, so $[\mathrm{Q}] = 1/(k_q\tau_0) = 1/(1.2\times10^{10} \times 4.0\times10^{-9}) = 1/48 = 0.021\ \mathrm{mol\,dm^{-3}}$. Note the shortcut: the half-quenching concentration is always $1/K_\mathrm{SV}$, and here $k_q\tau_0 = 48\ \mathrm{dm^{3}\,mol^{-1}}$ sits at the diffusion limit, so every collision counts.
:::
:::

::: exercise Lifetime with a quencher {level=2 check="2.4"}
With $\tau_0 = 6.0\ \mathrm{ns}$ and $K_\mathrm{SV} = 25.0\ \mathrm{dm^{3}\,mol^{-1}}$, what is the observed fluorescence lifetime at $[\mathrm{Q}] = 0.060\ \mathrm{mol\,dm^{-3}}$? (Enter $\tau$ in ns.)
::: solution
$\tau = \tau_0/(1 + K_\mathrm{SV}[\mathrm{Q}]) = 6.0/(1 + 25.0\times0.060) = 6.0/2.5 = 2.4\ \mathrm{ns}$. The same factor $2.5$ must appear in the intensity ratio if the quenching is dynamic — that consistency check is the experimental definition of collisional quenching.
:::
:::

::: exercise From the Jablonski scheme to Stern–Volmer {level=3}
Starting from the kinetic scheme of [[#def-jablonski]] — $\mathrm{S_1}$ decaying by $k_\mathrm{f}$, $k_\mathrm{IC}$, $k_\mathrm{ISC}$ and $k_q[\mathrm{Q}]$ — derive (a) $\Phi_\mathrm{f} = k_\mathrm{f}\tau$ with $1/\tau = \sum k + k_q[\mathrm{Q}]$, and (b) the Stern–Volmer equation for the intensity. Then show that a plot of $I_{\mathrm{f}0}/I_\mathrm{f}$ against $[\mathrm{Q}]$ gives $k_q$ *only* if $\tau_0$ is known, and explain why upward-curving Stern–Volmer plots indicate both static and dynamic quenching acting together.
::: solution
(a) After a pulse, $[\mathrm{S_1}] = [\mathrm{S_1}]_0 e^{-t/\tau}$ with $1/\tau = k_\mathrm{f} + k_\mathrm{IC} + k_\mathrm{ISC} + k_q[\mathrm{Q}]$ (sum of all first-order exits). Total emission per excited molecule: $\Phi_\mathrm{f} = \int_0^\infty k_\mathrm{f}e^{-t/\tau}\mathrm{d}t / 1 = k_\mathrm{f}\tau$. (b) At $[\mathrm{Q}] = 0$, $\Phi_{\mathrm{f}0} = k_\mathrm{f}\tau_0$, so $I_{\mathrm{f}0}/I_\mathrm{f} = \tau_0/\tau = \tau_0(1/\tau_0 + k_q[\mathrm{Q}]) = 1 + k_q\tau_0[\mathrm{Q}]$. The slope is the *product* $k_q\tau_0$: two fluorophores with the same slope but different $\tau_0$ have different $k_q$, so the lifetime is not optional. For the last part, static quenching multiplies the intensity by a binding factor $1 + K_\mathrm{S}[\mathrm{Q}]$ *in addition* to the dynamic factor: $I_{\mathrm{f}0}/I_\mathrm{f} = (1 + K_\mathrm{S}[\mathrm{Q}])(1 + k_q\tau_0[\mathrm{Q}])$, a product of two lines, which curves upward; the tell-tale is that $\tau_0/\tau$ then stays *below* the intensity line, since only the dynamic part shortens the lifetime.
:::
:::

::: exercise Lamp to concentration: a full photochemical rate calculation {level=3 check="0.032"}
A photolysis lamp emits $\mathrm{8.0\ W}$ at $\mathrm{365\ nm}$, and all of it enters a $\mathrm{25.0\ cm^{3}}$ stirred cell whose solution has absorbance $A = 1.00$ at $\mathrm{365\ nm}$. The reaction $\mathrm{A \rightarrow P}$ has quantum yield $\Phi = 0.12$ at this wavelength. After $\mathrm{5.00\ min}$ of irradiation, what is the concentration of $\mathrm{P}$? (Enter it in $\mathrm{mol\,dm^{-3}}$, to two significant figures; assume $A$ stays near $1$ and the volume is the illuminated volume.)
::: solution
Photon energy: $E = hc/\lambda = 1.986\times10^{-25}/365\times10^{-9} = 5.44\times10^{-19}\ \mathrm{J}$. Photon flux: $8.0/5.44\times10^{-19} = 1.47\times10^{19}\ \mathrm{s^{-1}} = 2.44\times10^{-5}\ \mathrm{einstein\,s^{-1}}$. Absorbed fraction: $1 - 10^{-1.00} = 0.900$, so $I_\text{abs} = 2.20\times10^{-5}\ \mathrm{einstein\,s^{-1}}$. Rate: $\mathrm{d}n_\mathrm{P}/\mathrm{d}t = \Phi I_\text{abs} = 0.12 \times 2.20\times10^{-5} = 2.64\times10^{-6}\ \mathrm{mol\,s^{-1}}$. In $300\ \mathrm{s}$: $n_\mathrm{P} = 7.9\times10^{-4}\ \mathrm{mol}$, and
$$
[\mathrm{P}] = \frac{7.9\times10^{-4}}{0.0250\ \mathrm{dm^{3}}} = 0.032\ \mathrm{mol\,dm^{-3}} .
$$
The hidden assumption is the constant absorbance: $A = 1$ means the rate is nearly zero order in $\mathrm{A}$ (all light absorbed), so the constant-rate estimate is decent — but as $\mathrm{A}$ bleaches below $A \approx 0.5$ the rate falls away and the true answer drifts below $0.032$.
:::
:::
