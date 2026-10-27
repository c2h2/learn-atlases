Put a tube of ethanol into a strong magnet, irradiate it with radio waves near $400\ \mathrm{MHz}$, and the sample answers with three groups of signals: one for the $\mathrm{CH_3}$ protons, one for the $\mathrm{CH_2}$ protons and one for the $\mathrm{OH}$ proton, each at a slightly different frequency, and the first two split into a neat triplet and quartet. Nothing in that experiment touches the electrons directly, yet it reports on them in exquisite detail — how much electron density surrounds each nucleus, which nuclei are joined through bonds, how fast groups rotate or exchange. That is **nuclear magnetic resonance** (NMR), the single most informative technique in structural chemistry. This lesson builds it from the ground up: nuclear spin in a magnetic field, why the signal is so weak and how pulses and Fourier transformation rescue it, the chemical shift, spin–spin coupling and the shapes of multiplets, relaxation, and the effect of chemical exchange. The companion lesson [[spectroscopy/nmr-structure]] then uses these principles to read real spectra.

The general framework — energy levels, populations, selection rules and line widths — was laid down in [[spectroscopy/spectroscopy-principles]]. NMR is in one sense the simplest application of it: a two-level system whose splitting we choose by choosing the magnet. In another sense it is the subtlest, because the energy gaps are so small that the populations are almost equal, the levels live for seconds, and the whole experiment is best described not as photons being absorbed but as a magnetisation vector being tipped and watched as it precesses.

## Nuclear spin in a magnetic field

Many nuclei carry an intrinsic angular momentum, the **nuclear spin**, and with it a magnetic moment. The rules for spin angular momentum are those of [[quantum-chemistry/many-electron-atoms]] for the electron: the magnitude is $\hbar\sqrt{I(I+1)}$ and the component along any chosen axis takes $2I+1$ values $m_I\hbar$, $m_I = -I, -I+1, \ldots, +I$.

::: definition Nuclear spin and magnetic moment {#def-nuclear-spin}
A nucleus with **spin quantum number** $I$ has spin angular momentum $\hat{\mathbf{I}}\hbar$ and magnetic moment
$$
\hat{\boldsymbol{\mu}} = \gamma\hbar\,\hat{\mathbf{I}}, \qquad \mu_z = \gamma\hbar\,m_I ,
$$ {#eq-moment}
where $\gamma$ is the **magnetogyric (gyromagnetic) ratio**, a constant of each isotope (positive for $^{1}\mathrm{H}$ and $^{13}\mathrm{C}$, negative for $^{15}\mathrm{N}$ and $^{29}\mathrm{Si}$). The spin $I$ follows from the numbers of protons and neutrons: nuclei with even mass number and even atomic number have $I = 0$ ($^{12}\mathrm{C}$, $^{16}\mathrm{O}$, $^{32}\mathrm{S}$) and are NMR-silent; odd mass number gives half-integral $I$ ($^{1}\mathrm{H}$, $^{13}\mathrm{C}$, $^{15}\mathrm{N}$, $^{19}\mathrm{F}$, $^{31}\mathrm{P}$ all have $I = \tfrac12$; $^{11}\mathrm{B}$ has $\tfrac32$, $^{17}\mathrm{O}$ has $\tfrac52$); even mass number with odd atomic number gives integral $I$ ($^{2}\mathrm{H}$ and $^{14}\mathrm{N}$ have $I = 1$).
:::

Nuclei with $I > \tfrac12$ have a non-spherical charge distribution — an **electric quadrupole moment** — that couples to electric field gradients in the molecule and usually relaxes them so fast that their lines are broad. This is why organic chemistry runs on spin-½ nuclei, and why the $^{14}\mathrm{N}$ ($I = 1$, $99.6\,\%$ abundant) next to an $\mathrm{N{-}H}$ proton often broadens that proton's signal instead of splitting it cleanly.

The values used in this lesson come from two standard sources: the proton magnetogyric ratio $\gamma(^{1}\mathrm{H}) = 2.675\,221\,874\times10^{8}\ \mathrm{s^{-1}\,T^{-1}}$ (CODATA 2018), and the other magnetogyric ratios and natural abundances from the IUPAC recommendations on NMR nomenclature (Harris *et al.*, *Pure Appl. Chem.* 2001): $\gamma(^{13}\mathrm{C}) = 6.728\times10^{7}$, $\gamma(^{19}\mathrm{F}) = 25.18\times10^{7}$, $\gamma(^{31}\mathrm{P}) = 10.84\times10^{7}$ and $\gamma(^{15}\mathrm{N}) = -2.713\times10^{7}\ \mathrm{s^{-1}\,T^{-1}}$, with abundances $99.99\,\%$ ($^{1}\mathrm{H}$), $1.07\,\%$ ($^{13}\mathrm{C}$), $100\,\%$ ($^{19}\mathrm{F}$, $^{31}\mathrm{P}$) and $0.37\,\%$ ($^{15}\mathrm{N}$).

::: proposition Zeeman levels and the resonance condition {#prop-larmor}
In a static magnetic field $B_0$ along $z$, a nucleus of spin $I$ has $2I+1$ equally spaced **Zeeman levels**
$$
E_{m_I} = -\mu_z B_0 = -\gamma\hbar B_0\,m_I .
$$ {#eq-zeeman}
Magnetic-dipole transitions obey $\Delta m_I = \pm 1$, so every allowed transition has the same energy $\Delta E = \gamma\hbar B_0$, absorbed at the **Larmor frequency**
$$
\nu_0 = \frac{\gamma B_0}{2\pi}, \qquad \omega_0 = \gamma B_0 .
$$ {#eq-larmor}
For a spin-½ nucleus with $\gamma > 0$ the lower level is $m_I = +\tfrac12$ (called $\alpha$, moment parallel to the field) and the upper is $m_I = -\tfrac12$ ($\beta$).
:::

::: proof
The energy of a magnetic moment in a field is $-\boldsymbol{\mu}\cdot\mathbf{B}$; with $\mathbf{B} = B_0\hat{\mathbf{z}}$ the Hamiltonian is $\hat H = -\gamma\hbar B_0\hat I_z$, whose eigenstates are those of $\hat I_z$ with eigenvalues $m_I$, giving [[#eq-zeeman]]. The radiofrequency field couples through the operator $-\gamma\hbar B_1\hat I_x\cos\omega t$; since $\hat I_x = \tfrac12(\hat I_+ + \hat I_-)$ and the raising and lowering operators change $m_I$ by exactly one unit, the only non-zero matrix elements connect $m_I$ and $m_I \pm 1$. Adjacent levels differ in energy by $\gamma\hbar B_0$, so $h\nu = \gamma\hbar B_0$, i.e. $\nu_0 = \gamma B_0/2\pi$. Classically the same frequency appears as the rate of **Larmor precession**: the torque $\boldsymbol{\mu}\times\mathbf{B}$ on a moment carrying angular momentum $\boldsymbol{\mu}/\gamma$ makes it sweep a cone about $\mathbf{B}$ at angular velocity $\omega_0 = \gamma B_0$, the same result without quantum mechanics.
:::

Spectrometers are named after the proton Larmor frequency of their magnet: a "$400\ \mathrm{MHz}$" instrument has $B_0 \approx 9.40\ \mathrm{T}$, a "$600\ \mathrm{MHz}$" one $14.1\ \mathrm{T}$. Each isotope resonates at its own frequency in the same magnet, in proportion to $\gamma$, so the spectrometer is tuned separately for each nucleus and the spectra of different nuclei never overlap.

::: example Larmor frequencies and the size of the quantum {#ex-larmor}
For $B_0 = 9.40\ \mathrm{T}$, find the Larmor frequencies of $^{1}\mathrm{H}$ and $^{13}\mathrm{C}$, and the molar energy of the proton transition.
::: solution
From [[#eq-larmor]],
$$
\nu_0(^{1}\mathrm{H}) = \frac{2.6752\times10^{8}\ \mathrm{s^{-1}\,T^{-1}} \times 9.40\ \mathrm{T}}{2\pi} = 4.002\times10^{8}\ \mathrm{Hz} = 400.2\ \mathrm{MHz},
$$
and $\nu_0(^{13}\mathrm{C}) = 6.728\times10^{7} \times 9.40/2\pi = 100.7\ \mathrm{MHz}$ — about a quarter of the proton value, the ratio $\gamma_\mathrm{C}/\gamma_\mathrm{H} = 0.2515$. The proton quantum is
$$
N_\mathrm{A}h\nu_0 = 6.022\times10^{23}\ \mathrm{mol^{-1}} \times 6.626\times10^{-34}\ \mathrm{J\,s} \times 4.00\times10^{8}\ \mathrm{s^{-1}} = 0.160\ \mathrm{J\,mol^{-1}} .
$$
That is a few millionths of a typical vibrational quantum and $1.6\times10^{4}$ times smaller than $RT$ at room temperature ($2.48\ \mathrm{kJ\,mol^{-1}}$). Radiofrequency photons are so feeble that NMR is a technique of near-equal populations, as the next result makes precise.
:::
:::

## Populations, sensitivity and the vector model

::: proposition The Boltzmann population difference {#prop-boltzmann}
For an ensemble of $N$ spin-½ nuclei in thermal equilibrium at temperature $T$, with $h\nu_0 \ll k_\mathrm{B}T$,
$$
\frac{N_\alpha - N_\beta}{N} = \tanh\frac{h\nu_0}{2k_\mathrm{B}T} \approx \frac{h\nu_0}{2k_\mathrm{B}T} = \frac{\gamma\hbar B_0}{2k_\mathrm{B}T} .
$$ {#eq-excess}
The net absorption, and the equilibrium **bulk magnetisation** $M_0 = \tfrac12(N_\alpha - N_\beta)\gamma\hbar$ per volume of sample, are proportional to this small excess.
:::

::: proof
By the Boltzmann distribution, $N_\beta/N_\alpha = \mathrm{e}^{-\Delta E/k_\mathrm{B}T}$ with $\Delta E = h\nu_0$. Writing $x = \Delta E/2k_\mathrm{B}T$, $N_\alpha \propto \mathrm{e}^{x}$ and $N_\beta \propto \mathrm{e}^{-x}$, so $(N_\alpha - N_\beta)/(N_\alpha + N_\beta) = (\mathrm{e}^{x} - \mathrm{e}^{-x})/(\mathrm{e}^{x} + \mathrm{e}^{-x}) = \tanh x \approx x$ for $x \ll 1$. Absorption ($\alpha \to \beta$) and stimulated emission ($\beta \to \alpha$) have equal probability per spin, so only the excess $N_\alpha - N_\beta$ yields net absorption; each spin in $\alpha$ contributes $+\tfrac12\gamma\hbar$ to $M_z$ and each in $\beta$ contributes $-\tfrac12\gamma\hbar$, giving $M_0$.
:::

At $400\ \mathrm{MHz}$ and $298\ \mathrm{K}$, $h\nu_0/2k_\mathrm{B}T = 3.22\times10^{-5}$: of every million protons, about 32 more point "with" the field than against it, and the other 999 968 cancel each other's signals in pairs. Raising the field helps linearly. So does lowering the temperature, which is why cryogenically cooled probes (cooling the receiver coil and preamplifier, not the sample) give a three- to four-fold gain in signal-to-noise.

The sensitivity of a nucleus depends on $\gamma$ three times over: the population excess is proportional to $\gamma$, the magnetic moment of each excess spin is proportional to $\gamma$, and the voltage it induces in the receiver coil is proportional to its precession frequency, again $\propto \gamma$. Hence the **receptivity** defined by IUPAC,
$$
D \propto |\gamma|^{3}\,I(I+1)\,x_\mathrm{nat},
$$ {#eq-receptivity}
where $x_\mathrm{nat}$ is the natural abundance. Relative to $^{1}\mathrm{H}$ (set to 1) the receptivities are $0.834$ for $^{19}\mathrm{F}$, $0.0665$ for $^{31}\mathrm{P}$, $1.70\times10^{-4}$ for $^{13}\mathrm{C}$ and $3.84\times10^{-6}$ for $^{15}\mathrm{N}$ — figures that explain the order in which chemists learn NMR, proton first and carbon second.

::: example How hard is natural-abundance carbon-13? {#ex-receptivity}
Use [[#eq-receptivity]] to confirm the receptivity of $^{13}\mathrm{C}$ relative to $^{1}\mathrm{H}$, and estimate how many more scans a $^{13}\mathrm{C}$ spectrum would need to match the signal-to-noise ratio of a single-scan $^{1}\mathrm{H}$ spectrum on the same sample, ignoring all enhancements.
::: solution
Both nuclei have $I = \tfrac12$, so $I(I+1)$ cancels. Then
$$
\frac{D(^{13}\mathrm{C})}{D(^{1}\mathrm{H})} = \left(\frac{6.728}{26.752}\right)^{3} \times \frac{1.07}{99.99} = (0.2515)^{3} \times 0.0107 = 0.0159 \times 0.0107 = 1.70\times10^{-4} .
$$
Signal-to-noise grows only as the square root of the number of scans (shown below, [[#prop-signal-averaging]]), so matching a factor $1/(1.70\times10^{-4})$ in signal would take $(1/1.70\times10^{-4})^{2} = 3.5\times10^{7}$ scans — over a year at one scan per second. Routine $^{13}\mathrm{C}$ spectra are possible only because of three tricks: Fourier-transform acquisition of the whole spectrum in every scan, decoupling of the protons (which collapses each carbon multiplet into one line), and the nuclear Overhauser enhancement from the irradiated protons (up to a factor $1 + \gamma_\mathrm{H}/2\gamma_\mathrm{C} = 2.99$), together with larger samples and concentrations than proton work needs.
:::
:::

### The vector model and the rotating frame

Because the population excess is tiny and the spins do not interact strongly with one another, a sample behaves to a very good approximation like one macroscopic magnetisation vector $\mathbf{M}$ that obeys the classical equation of motion $\mathrm{d}\mathbf{M}/\mathrm{d}t = \gamma\,\mathbf{M}\times\mathbf{B}$. At equilibrium $\mathbf{M} = M_0\hat{\mathbf{z}}$ points along the field and nothing moves. To see a signal we must tip $\mathbf{M}$ away from $z$; it then precesses about $B_0$ at $\nu_0$, and its rotating transverse component induces an oscillating voltage in a coil wound round the sample.

The tipping is done by a short pulse of radiofrequency field $B_1$ (typically $10^{-4}$–$10^{-3}\ \mathrm{T}$) at a frequency close to $\nu_0$, applied perpendicular to $B_0$. The motion looks complicated in the laboratory, but becomes simple in a **rotating frame** that turns about $z$ at the radiofrequency. In that frame the large field $B_0$ is replaced by the small residual $B_0 - \omega_\mathrm{rf}/\gamma$, which vanishes on resonance, and $B_1$ is a static field along, say, $x$. The magnetisation therefore simply rotates about $x$ at the **nutation frequency** $\gamma B_1$, and a pulse of duration $t_\mathrm{p}$ turns it through the **flip angle**
$$
\theta = \gamma B_1 t_\mathrm{p} .
$$ {#eq-flip}
A **90° pulse** ($\theta = \pi/2$) lays $\mathbf{M}$ in the $xy$ plane, giving the largest transverse magnetisation and so the largest signal; a **180° pulse** ($\theta = \pi$) inverts it to $-z$, giving no signal but an inverted population — the starting point of the inversion-recovery and spin-echo experiments below. In quantum language a 90° pulse equalises the populations of $\alpha$ and $\beta$ and creates coherence between them; a 180° pulse swaps the populations.

::: example The length of a 90° pulse {#ex-pulse}
A proton 90° pulse on a $400\ \mathrm{MHz}$ spectrometer lasts $10.0\ \mathrm{\mu s}$. Find the strength of $B_1$ and the nutation frequency, and compare $B_1$ with $B_0$.
::: solution
From [[#eq-flip]] with $\theta = \pi/2$,
$$
B_1 = \frac{\pi/2}{\gamma t_\mathrm{p}} = \frac{1.5708}{2.6752\times10^{8}\ \mathrm{s^{-1}\,T^{-1}} \times 1.00\times10^{-5}\ \mathrm{s}} = 5.87\times10^{-4}\ \mathrm{T}.
$$
A 90° turn takes a quarter of a nutation period, so the nutation frequency is $\gamma B_1/2\pi = 1/(4t_\mathrm{p}) = 25.0\ \mathrm{kHz}$. $B_1$ is about $6\times10^{-5}$ of $B_0 = 9.40\ \mathrm{T}$, yet on resonance it alone determines the motion in the rotating frame — the essence of resonance. A useful corollary: a pulse of length $t_\mathrm{p}$ excites a band of frequencies of width of order $1/t_\mathrm{p} \approx 10^{5}\ \mathrm{Hz}$, comfortably covering the whole proton spectrum ($12\ \mathrm{ppm} \approx 4.8\ \mathrm{kHz}$ at this field). One short pulse excites every proton at once.
:::
:::

## Pulses, the FID and Fourier transformation

After a 90° pulse every proton in the sample precesses at its own frequency, and the coil records the sum of all their oscillations. Because the transverse magnetisation also decays (relaxation, discussed below), the recorded signal is a set of superposed damped cosines: the **free induction decay** (FID). The spectrum — signal intensity against frequency — is its Fourier transform.

::: widget plot
f: exp(-x/t)*cos(2*pi*v*x); exp(-x/t); -exp(-x/t)
x: 0, 2
y: -1.1, 1.1
sliders: t=0.4:0.05:2:0.05; v=8:1:20:1
labels: \text{FID}; \text{envelope } \mathrm{e}^{-t/T_2}; \text{envelope}
caption: A single-line free induction decay, $\cos(2\pi\nu t)\,\mathrm{e}^{-t/T_2}$, with time $t$ in seconds on the horizontal axis. The slider `v` sets the offset frequency in hertz (the oscillation recorded after the spectrometer has subtracted its reference frequency) and `t` sets the decay time $T_2$ in seconds. Faster decay (smaller `t`) means a broader line in the spectrum, since the Fourier transform of the envelope is a Lorentzian of full width $1/\pi T_2$ ([[#prop-linewidth]]); counting oscillations per second recovers the frequency, which is what the Fourier transform does for every line at once.
:::

Fourier-transform (FT) NMR replaced the older continuous-wave method, in which the field or frequency was swept slowly through each resonance in turn. The gain is the **multiplex** (Fellgett) advantage: an FID of a few seconds contains information on every frequency in the spectrum, whereas a sweep spends almost all its time on empty baseline. Three practical relations govern the acquisition:

- The **spectral width** $SW$ (the frequency range recorded) is set by the sampling rate: with quadrature detection, complex points taken every $\Delta t$ cover $SW = 1/\Delta t$. A signal outside this window is not lost but **folded** (aliased) back into it at a wrong frequency.
- The **digital resolution** is $1/t_\mathrm{acq}$, the reciprocal of the acquisition time. To separate two lines $0.3\ \mathrm{Hz}$ apart you must record for at least about $3\ \mathrm{s}$; an FID truncated before it has decayed produces "sinc wiggles" at the base of each line.
- Repeating the experiment and adding the FIDs improves the signal-to-noise ratio, but slowly.

::: proposition Signal averaging {#prop-signal-averaging}
If $n$ FIDs are co-added, the coherent signal grows as $n$ while random noise grows as $\sqrt{n}$, so
$$
\frac{S}{N} \propto \sqrt{n} .
$$ {#eq-sn}
This holds when the noise of successive scans is uncorrelated with zero mean and the sample is unchanged between scans.
:::

::: proof
Let each scan give signal $s$ plus noise $\varepsilon_i$ with mean zero and variance $\sigma^{2}$, independent between scans. The sum of $n$ scans has signal $ns$ and noise of variance $\sum_i \sigma^{2} = n\sigma^{2}$ (variances of independent variables add), so noise amplitude $\sigma\sqrt{n}$. The ratio is $ns/\sigma\sqrt{n} = \sqrt{n}\,(s/\sigma)$. This is the same statistics that governs the standard error of a mean in [[analytical-chemistry/statistics-calibration]].
:::

The square root is harsh: doubling $S/N$ costs four times the time, and a factor 10 costs a factor 100. The time per scan is set by relaxation, since the magnetisation must largely return to $z$ before the next pulse — which is why relaxation, far from being a nuisance detail, sets the pace of every NMR experiment.

::: example Planning an acquisition {#ex-acquisition}
A proton spectrum is recorded at $400\ \mathrm{MHz}$ over $0$–$12\ \mathrm{ppm}$ with an acquisition time of $3.0\ \mathrm{s}$. (a) What spectral width in hertz, and how many complex data points, are needed? (b) What is the digital resolution? (c) After 16 scans a weak signal has $S/N = 5$. How many scans give $S/N = 20$?
::: solution
(a) $12\ \mathrm{ppm}$ of $400\ \mathrm{MHz}$ is $12\times10^{-6} \times 4.00\times10^{8}\ \mathrm{Hz} = 4800\ \mathrm{Hz}$. With quadrature detection the dwell time is $1/SW = 208\ \mathrm{\mu s}$, so in $3.0\ \mathrm{s}$ we collect $SW \times t_\mathrm{acq} = 4800 \times 3.0 = 14\,400$ complex points.
(b) Digital resolution $1/t_\mathrm{acq} = 1/3.0\ \mathrm{s} = 0.33\ \mathrm{Hz}$ — fine enough for proton couplings, which are rarely smaller than about $0.5\ \mathrm{Hz}$.
(c) $S/N$ must grow by a factor 4, so by [[#eq-sn]] $n$ must grow by $4^{2} = 16$: $16 \times 16 = 256$ scans. At about $5\ \mathrm{s}$ per scan that is some 21 minutes rather than 80 seconds.
:::
:::

## The chemical shift

If all protons in a molecule resonated at exactly $\gamma B_0/2\pi$, NMR would be a way of counting hydrogen atoms and nothing more. They do not, because the field felt by a nucleus is not the applied field. The applied field drives circulations of the electrons around the nucleus, and these induced currents produce a small field of their own, proportional to $B_0$ and, for a closed-shell molecule, mostly opposed to it. The nucleus is **shielded**: it feels
$$
B_\mathrm{loc} = (1 - \sigma)\,B_0, \qquad \nu = \frac{\gamma B_0}{2\pi}(1 - \sigma),
$$ {#eq-shielding}
where the **shielding constant** $\sigma$ is a property of the electronic environment, of order $10^{-5}$ for protons and $10^{-4}$ for carbon. Because $\sigma$ is so small and $B_0$ cannot be known to one part in $10^{8}$, absolute frequencies are useless; we measure frequencies relative to a reference compound in the same sample.

::: definition The chemical shift {#def-shift}
The **chemical shift** of a resonance at frequency $\nu$ is
$$
\delta = \frac{\nu - \nu_\mathrm{ref}}{\nu_\mathrm{ref}} \times 10^{6} \ \ \text{(in ppm)} \;\approx\; (\sigma_\mathrm{ref} - \sigma)\times10^{6},
$$ {#eq-shift}
where $\nu_\mathrm{ref}$ is the frequency of the reference. For $^{1}\mathrm{H}$, $^{13}\mathrm{C}$ and $^{29}\mathrm{Si}$ the reference is tetramethylsilane (TMS, $\mathrm{Si(CH_3)_4}$, $\delta = 0$); in water, a water-soluble silane such as DSS is used. Larger $\delta$ means less shielding, a higher resonance frequency, and by convention lies to the *left* of the spectrum ("downfield", a name left over from field-swept instruments).
:::

The definition divides by the spectrometer frequency precisely so that $\delta$ is **independent of the field**: both $\nu - \nu_\mathrm{ref}$ and $\nu_\mathrm{ref}$ are proportional to $B_0$. A methyl group at $\delta = 1.22$ is at $1.22$ on every instrument in the world, whereas its separation from TMS in hertz is $73\ \mathrm{Hz}$ at $60\ \mathrm{MHz}$ and $488\ \mathrm{Hz}$ at $400\ \mathrm{MHz}$. TMS is a good reference because its twelve equivalent protons give one sharp line, it is chemically inert, volatile, and more shielded than almost all organic protons (silicon is less electronegative than carbon).

::: example Hertz and ppm {#ex-shift}
On a spectrometer whose proton reference frequency is $400.000\ \mathrm{MHz}$, the $\mathrm{CH_2}$ quartet of ethanol (in $\mathrm{CDCl_3}$) is centred $1476\ \mathrm{Hz}$ above TMS. Find $\delta$, and the separation from TMS in hertz on a $600.000\ \mathrm{MHz}$ instrument.
::: solution
From [[#eq-shift]],
$$
\delta = \frac{1476\ \mathrm{Hz}}{400.000\times10^{6}\ \mathrm{Hz}} \times 10^{6} = 3.69\ \mathrm{ppm}.
$$
A shift in ppm is converted back to hertz by multiplying by the spectrometer frequency in MHz, so at $600\ \mathrm{MHz}$ the line sits $3.69 \times 600.000 = 2214\ \mathrm{Hz}$ above TMS. The chemical shift is unchanged; the spread of the spectrum in hertz grows with the field, which is the main reason for buying a bigger magnet. (The value $3.69$ agrees with the tabulated spectrum of ethanol in the SDBS database; shift values quoted in this lesson are from SDBS and the tables of Pretsch, Bühlmann and Badertscher.)
:::
:::

### Where shielding comes from

The shielding constant has several contributions, and a qualitative feel for each is what lets you predict shifts.

- **Local diamagnetic shielding.** The field drives a circulation of the electron cloud of the atom itself, opposing $B_0$ at the nucleus (Lamb's term). The more electron density around the proton, the larger $\sigma$ and the smaller $\delta$. Electronegative neighbours withdraw density and **deshield**: $\mathrm{CH_3}$ resonates near $\delta$ 0.9 in an alkane, 2.1 next to a carbonyl, 3.4 in methanol's $\mathrm{CH_3O}$ and 4.3 in nitromethane.
- **Local paramagnetic contribution.** In atoms with low-lying excited states the field mixes excited states into the ground state and induces currents that *reinforce* $B_0$. It is negligible for hydrogen (only s orbitals nearby) but dominates the shifts of carbon, nitrogen, fluorine and phosphorus — which is why $^{13}\mathrm{C}$ shifts span about $220\ \mathrm{ppm}$ and correlate with low-energy $n\to\pi^{*}$ and $\pi\to\pi^{*}$ excitations (carbonyl carbons near $\delta$ 200).
- **Neighbouring-group anisotropy.** A nearby bond or group with an anisotropic magnetic susceptibility produces a field that shields in some directions and deshields in others. The $\pi$ electrons of a carbonyl group deshield an aldehyde proton (near $\delta$ 9.5–10); the cylindrical $\pi$ cloud of a $\mathrm{C{\equiv}C}$ bond shields an alkyne proton lying on its axis, which therefore appears at only about $\delta$ 1.9 rather than at the alkene value near 5–6.
- **Ring currents.** In an aromatic ring the field induces a circulation of the delocalised $\pi$ electrons around the whole ring. Its field opposes $B_0$ inside the ring and above and below it, but reinforces $B_0$ outside, at the edge where the protons are: benzene's protons resonate at $\delta$ 7.3 instead of near 5.7. [18]Annulene shows the effect in both directions, with outer protons near $\delta$ 9.3 and the inner protons near $-3$ — the classic magnetic criterion of aromaticity from [[organic-2/aromaticity]].
- **Hydrogen bonding and exchange.** Protons on oxygen and nitrogen have shifts that move with concentration, temperature and solvent, because hydrogen bonding deshields and the proton exchanges between sites.

::: warning Upfield, downfield and "higher field" {#warn-upfield}
"Downfield" means larger $\delta$, less shielding and *higher frequency* — not a stronger magnet. The terms come from continuous-wave instruments, where a fixed frequency was used and the field swept: a deshielded nucleus came into resonance at *lower* applied field. In a modern Fourier-transform instrument the field is fixed and nothing is swept, so the safest language is "higher or lower $\delta$" or "higher or lower frequency". Equally, "a $400\ \mathrm{MHz}$ spectrum" describes the spectrometer, not the resonance frequency of carbon or phosphorus in it ($100.6$ and $162.1\ \mathrm{MHz}$). And never quote a shift in hertz without the field: hertz offsets are field-dependent, ppm are not.
:::

## Spin–spin coupling

Look again at ethanol: the $\mathrm{CH_3}$ signal is a triplet and the $\mathrm{CH_2}$ signal a quartet, with the same line separation of $7.0\ \mathrm{Hz}$ in both and on every spectrometer. The splitting is caused by **scalar** or **spin–spin coupling** (also called $J$ coupling) between the magnetic nuclei: the spin state of one proton slightly polarises the bonding electrons, and that polarisation is felt by the other nucleus. The interaction is transmitted *through bonds*, not through space (the direct dipolar coupling through space averages to zero in an isotropic liquid because molecules tumble rapidly), and its energy is
$$
E_J = hJ\,m_{I,1}\,m_{I,2}
$$ {#eq-j}
for two spins in the weak-coupling limit, with $J$ the **coupling constant** in hertz. Because it is a property of the molecule's electronic structure and not of the field, $J$ is the same at every $B_0$: shifts in hertz scale with the field, couplings do not.

Coupling constants are labelled by the number of bonds between the nuclei: $^{1}J_\mathrm{CH} \approx 125\ \mathrm{Hz}$ for an $\mathrm{sp^3}$ carbon, $160\ \mathrm{Hz}$ for $\mathrm{sp^2}$ and $250\ \mathrm{Hz}$ for $\mathrm{sp}$ (roughly $500\ \mathrm{Hz}$ times the s character); geminal $^{2}J_\mathrm{HH}$ is typically $-10$ to $-15\ \mathrm{Hz}$ on an $\mathrm{sp^3}$ carbon; vicinal $^{3}J_\mathrm{HH}$ is about $7\ \mathrm{Hz}$ in a freely rotating ethyl group and depends on the dihedral angle through the Karplus relation that [[spectroscopy/nmr-structure]] puts to work; couplings over four or more bonds are usually below $3\ \mathrm{Hz}$. The sign of $J$ matters for theory and for some advanced experiments, but in first-order spectra only $|J|$ is seen.

::: proposition First-order multiplets: the n + 1 rule {#prop-multiplet}
Suppose a nucleus A (or a group of equivalent nuclei A) is coupled with the same constant $J$ to $n$ equivalent spin-½ nuclei X, and $|\nu_\mathrm{A} - \nu_\mathrm{X}| \gg |J|$. Then the A resonance is split into $n + 1$ lines spaced by $J$, centred on $\nu_\mathrm{A}$, with intensities in the ratio of the binomial coefficients $\binom{n}{k}$, $k = 0, 1, \ldots, n$ (Pascal's triangle: $1{:}1$, $1{:}2{:}1$, $1{:}3{:}3{:}1$, $1{:}4{:}6{:}4{:}1$). Couplings between the equivalent A nuclei themselves produce no splitting. For coupling to $n$ equivalent nuclei of spin $I$, the A signal has $2nI + 1$ lines. If A couples to several inequivalent groups with different constants, the splittings are applied in succession (a coupling tree).
:::

::: proof
In the weak-coupling limit each X nucleus is either $\alpha$ ($m = +\tfrac12$) or $\beta$ ($m = -\tfrac12$), and by [[#eq-j]] it shifts the A transition by $\pm\tfrac12 J$, independently of the others. With $k$ of the $n$ X spins in $\beta$, the total $M_\mathrm{X} = \tfrac12(n - 2k)$ takes $n + 1$ values, spaced by 1, so the A line appears at $\nu_\mathrm{A} + J M_\mathrm{X}$: $n+1$ lines spaced by $J$. Since the X populations are almost exactly equal (the excess of [[#prop-boltzmann]] is $\sim10^{-5}$), every one of the $2^{n}$ X spin configurations is equally likely, and the number with $k$ spins $\beta$ is $\binom{n}{k}$ — the line intensities. For spin $I$, $M_\mathrm{X}$ runs in unit steps from $-nI$ to $+nI$, giving $2nI + 1$ values. That equivalent nuclei do not split each other follows from the full quantum treatment: for a group of nuclei with identical shifts and couplings the coupling term commutes with the total spin, and transitions within that group occur at a single frequency independent of $J$.
:::

::: example Ethanol's ethyl group {#ex-ethyl}
In dry ethanol in $\mathrm{CDCl_3}$ the $\mathrm{CH_3}$ protons are at $\delta$ 1.22 and the $\mathrm{CH_2}$ protons at $\delta$ 3.69, with $^{3}J = 7.0\ \mathrm{Hz}$. Predict both multiplets, and check that the spectrum is first-order at $60\ \mathrm{MHz}$ and at $400\ \mathrm{MHz}$. Why is the $\mathrm{CH_2}$ usually a simple quartet rather than a quartet of doublets?
::: solution
The $\mathrm{CH_3}$ protons see two equivalent $\mathrm{CH_2}$ protons: $n = 2$, a $1{:}2{:}1$ triplet with lines $7.0\ \mathrm{Hz}$ apart. The $\mathrm{CH_2}$ protons see three $\mathrm{CH_3}$ protons: a $1{:}3{:}3{:}1$ quartet. The integrals are in the ratio $3{:}2$. The shift difference is $3.69 - 1.22 = 2.47\ \mathrm{ppm}$, i.e. $2.47 \times 60 = 148\ \mathrm{Hz}$ at $60\ \mathrm{MHz}$ and $988\ \mathrm{Hz}$ at $400\ \mathrm{MHz}$, so $\Delta\nu/J = 21$ and $141$: first-order at both fields, with only a slight leaning of the multiplets towards each other at the lower field. The $\mathrm{OH}$ proton also has a $^{3}J$ coupling of about $5\ \mathrm{Hz}$ to the $\mathrm{CH_2}$ protons, but in ordinary samples traces of acid or water catalyse intermolecular exchange of the hydroxyl proton many times faster than $J$; the $\mathrm{CH_2}$ protons then see only the average spin state of the $\mathrm{OH}$ position and the coupling disappears (see [[#prop-coalescence]]). In very pure, dry ethanol, or in DMSO-$d_6$ which slows exchange by hydrogen bonding, the $\mathrm{OH}$ appears as a triplet and the $\mathrm{CH_2}$ as a doublet of quartets.
:::
:::

::: quiz Counting lines
How many lines does the methine $\mathrm{CH}$ proton of 2-bromopropane, $\mathrm{(CH_3)_2CHBr}$, show in a first-order spectrum, and what is the intensity ratio of its outermost to its central line?
- [ ] A quartet; $1{:}3$
- [ ] A doublet of quartets; $1{:}1$
- [x] A septet; $1{:}20$
- [ ] A heptet of doublets; $1{:}6$
::: solution
The six methyl protons are equivalent (free rotation, and the two methyl groups are exchanged by the mirror plane), so $n = 6$ gives $n + 1 = 7$ lines with binomial intensities $1{:}6{:}15{:}20{:}15{:}6{:}1$; the outermost lines are only $1/20$ as tall as the central one, which is why the outer lines of a septet are easy to overlook in a noisy spectrum. The methyl signal is a doublet ($n = 1$). The bromine isotopes have quadrupolar nuclei that relax so quickly that they do not split the proton signals.
:::
:::

### When the n + 1 rule fails: second-order spectra

The rule assumes $\Delta\nu \gg J$. When the shift difference in hertz becomes comparable with $J$ the two spins' states mix, and the spectrum becomes **second-order**. For two spin-½ nuclei the cases are labelled with letters close together in the alphabet for nuclei close in shift: **AX** ($\Delta\nu/J \gtrsim 10$: two clean doublets), **AB** ($\Delta\nu/J$ of order 1: four lines with distorted intensities), and **A₂** (identical shifts: a single line, the coupling invisible). The AB pattern can be solved exactly. With $D = \sqrt{\Delta\nu^{2} + J^{2}}$, the four lines lie at $\pm\tfrac12(D + J)$ and $\pm\tfrac12(D - J)$ from the centre, with the outer pair having intensity proportional to $1 - J/D$ and the inner pair $1 + J/D$. The doublets "lean" towards each other — the **roof effect** — and the chemical shifts are no longer at the doublet centres but at $\pm\tfrac12\Delta\nu$, the intensity-weighted positions.

::: widget plot
f: (1-c/sqrt(d^2+c^2))*(0.25/((x-(sqrt(d^2+c^2)+c)/2)^2+0.25)+0.25/((x+(sqrt(d^2+c^2)+c)/2)^2+0.25))+(1+c/sqrt(d^2+c^2))*(0.25/((x-(sqrt(d^2+c^2)-c)/2)^2+0.25)+0.25/((x+(sqrt(d^2+c^2)-c)/2)^2+0.25))
x: -45, 45
y: 0, 4.2
sliders: d=40:0:80:1; c=8:1:20:0.5
labels: \text{AB spectrum}
caption: The exact spectrum of two coupled spin-½ nuclei, with frequency in hertz measured from the centre of the pattern, Lorentzian lines of half-width $0.5\ \mathrm{Hz}$, shift difference $\Delta\nu$ (`d`) and coupling constant $J$ (`c`) on the sliders. With $\Delta\nu/J \approx 10$ you see an AX spectrum of two nearly equal doublets. Reduce `d` and the inner lines grow at the expense of the outer ones — the roof effect — until at $\Delta\nu = 0$ (an A₂ system) the outer lines vanish and the inner pair merges into one line: equivalent nuclei show no splitting. The line spacing within each doublet stays exactly $J$ throughout.
:::

::: example Roofing at two fields {#ex-roof}
Two aromatic protons on adjacent carbons differ in shift by $0.10\ \mathrm{ppm}$ and have $^{3}J = 8.0\ \mathrm{Hz}$. Find $\Delta\nu/J$ and the intensity ratio of an inner to an outer line at $60\ \mathrm{MHz}$ and at $600\ \mathrm{MHz}$.
::: solution
At $60\ \mathrm{MHz}$, $\Delta\nu = 0.10 \times 60 = 6.0\ \mathrm{Hz}$ and $\Delta\nu/J = 0.75$: strongly second-order. Then $D = \sqrt{6.0^{2} + 8.0^{2}} = 10.0\ \mathrm{Hz}$ and
$$
\frac{I_\mathrm{inner}}{I_\mathrm{outer}} = \frac{1 + J/D}{1 - J/D} = \frac{1.8}{0.2} = 9.0 .
$$
The outer lines are barely visible and the pattern looks like a slightly split singlet. At $600\ \mathrm{MHz}$, $\Delta\nu = 60\ \mathrm{Hz}$, $\Delta\nu/J = 7.5$, $D = 60.5\ \mathrm{Hz}$ and the ratio is $1.132/0.868 = 1.30$: two clearly separated doublets with mild roofing, close to first-order. Higher field simplifies spectra because $\Delta\nu$ grows with $B_0$ while $J$ does not.
:::
:::

### Chemical and magnetic equivalence

The $n + 1$ rule counts *equivalent* neighbours, so it matters exactly what "equivalent" means.

::: definition Chemical and magnetic equivalence {#def-equivalence}
Nuclei are **chemically equivalent** (isochronous) if they are interchanged by a symmetry operation of the molecule or by a process fast on the NMR timescale (such as rotation about a single bond); they then have the same chemical shift. A set of chemically equivalent nuclei is **magnetically equivalent** if, in addition, each member has the same coupling constant to every nucleus outside the set. Only magnetically equivalent nuclei behave as the "$n$ equivalent nuclei" of [[#prop-multiplet]] and show no splitting among themselves.
:::

The classic counter-example is 1,1-difluoroethene, $\mathrm{H_2C{=}CF_2}$: the two protons are related by symmetry and so are chemically equivalent, but each proton is *cis* to one fluorine and *trans* to the other, with different couplings ($^{3}J_{cis} \ne {}^{3}J_{trans}$). They are magnetically inequivalent, and the spectrum is an AA′XX′ pattern of many lines rather than a simple triplet. A *para*-disubstituted benzene with two different substituents is the everyday example: what looks at first glance like "two doublets" is really an AA′BB′ or AA′XX′ multiplet. The protons of a $\mathrm{CH_3}$ group, by contrast, are magnetically equivalent because fast rotation averages their couplings to every other nucleus. A related subtlety — **diastereotopic** protons, such as the two $\mathrm{CH_2}$ protons next to a stereocentre, which no symmetry operation interchanges and which therefore differ in shift — is treated with examples in [[spectroscopy/nmr-structure]].

## Relaxation

After a pulse the spins do not stay tipped: the magnetisation returns to its equilibrium value $M_0$ along $z$, and the transverse magnetisation dies away. Felix Bloch described both processes with two time constants.

::: definition Longitudinal and transverse relaxation {#def-relaxation}
**Longitudinal (spin–lattice) relaxation** restores the population difference and the $z$ magnetisation, $\mathrm{d}M_z/\mathrm{d}t = -(M_z - M_0)/T_1$; it requires energy exchange with the surroundings ("the lattice"), driven by fluctuating local fields — mainly dipolar fields of neighbouring nuclei modulated by molecular tumbling — with components near $\nu_0$. **Transverse (spin–spin) relaxation** destroys the phase coherence of the precessing spins, $\mathrm{d}M_{xy}/\mathrm{d}t = -M_{xy}/T_2$, and needs no energy exchange. Always $T_2 \le 2T_1$; for small molecules in non-viscous solution $T_1 \approx T_2$, typically $0.5$–$10\ \mathrm{s}$ for protons, while large, slowly tumbling molecules and solids have $T_2 \ll T_1$.
:::

$T_1$ sets how often you may repeat a scan: after a 90° pulse, waiting $5T_1$ restores $99.3\,\%$ of $M_0$. $T_2$ sets the width of the line, because a signal that decays faster contains a wider range of frequencies.

::: proposition Line width and T₂ {#prop-linewidth}
An FID $\mathrm{e}^{\mathrm{i}2\pi\nu_0 t}\,\mathrm{e}^{-t/T_2}$ ($t \ge 0$) Fourier-transforms into a **Lorentzian** absorption line
$$
A(\nu) \propto \frac{T_2}{1 + 4\pi^{2}T_2^{2}(\nu - \nu_0)^{2}}, \qquad \Delta\nu_{1/2} = \frac{1}{\pi T_2},
$$ {#eq-linewidth}
where $\Delta\nu_{1/2}$ is the full width at half maximum. In practice the observed width corresponds to an effective $T_2^{*} < T_2$ that includes the spread of frequencies caused by an inhomogeneous field across the sample.
:::

::: proof
Integrate: $\int_0^{\infty} \mathrm{e}^{-t/T_2}\,\mathrm{e}^{\mathrm{i}2\pi(\nu_0 - \nu)t}\,\mathrm{d}t = \dfrac{1}{1/T_2 - \mathrm{i}2\pi(\nu_0 - \nu)}$. Multiplying numerator and denominator by the complex conjugate, the real part (the absorption mode) is $\dfrac{1/T_2}{1/T_2^{2} + 4\pi^{2}(\nu - \nu_0)^{2}} = \dfrac{T_2}{1 + 4\pi^{2}T_2^{2}(\nu - \nu_0)^{2}}$. Its maximum $T_2$ is at $\nu = \nu_0$; it falls to half the maximum when $4\pi^{2}T_2^{2}(\nu - \nu_0)^{2} = 1$, i.e. at $\nu - \nu_0 = \pm 1/2\pi T_2$. The full width is twice this, $1/\pi T_2$. The same relation is the lifetime broadening of [[spectroscopy/spectroscopy-principles]] in NMR guise.
:::

### Measuring T₁ and T₂: inversion recovery and the spin echo

**Inversion recovery** measures $T_1$. A 180° pulse inverts the magnetisation to $M_z = -M_0$; after a delay $\tau$ a 90° pulse reads out how much has recovered. Solving the Bloch equation with $M_z(0) = -M_0$ gives
$$
M_z(\tau) = M_0\left(1 - 2\,\mathrm{e}^{-\tau/T_1}\right),
$$ {#eq-ir}
so the signal starts inverted, passes through zero at $\tau_\mathrm{null} = T_1\ln 2$, and grows back to $+M_0$. Recording spectra for a series of $\tau$ and fitting [[#eq-ir]] (or simply finding the null) gives $T_1$ for every resolved line at once.

::: widget plot
f: 1-2*exp(-x/t); 1-exp(-x/t)
x: 0, 10
y: -1.05, 1.05
sliders: t=1.5:0.2:5:0.1
labels: \text{inversion recovery } M_z/M_0; \text{saturation recovery } M_z/M_0
hlines: 0
caption: Recovery of the longitudinal magnetisation $M_z/M_0$ against delay $\tau$ in seconds, for the relaxation time $T_1$ (`t`, in seconds) set by the slider. After a 180° pulse (first curve) $M_z$ climbs from $-M_0$ and crosses zero at $\tau = T_1\ln 2 = 0.693\,T_1$; after a 90° pulse or saturation (second curve) it starts from zero. Both reach $99\,\%$ of equilibrium only after about $5T_1$, which is why the relaxation delay between scans, not the pulse or the acquisition, usually dominates the time an NMR experiment takes — and why quantitative integration needs delays of several $T_1$.
:::

The **spin echo**, discovered by Erwin Hahn, separates true $T_2$ from field inhomogeneity. After a 90° pulse the spins in different parts of the sample precess at slightly different rates and fan out in the $xy$ plane, so the FID decays with $T_2^{*}$. A 180° pulse at time $\tau$ flips the fan over, so that the faster spins now trail the slower ones; at $2\tau$ they all coincide again and an **echo** forms. Dephasing due to static inhomogeneity is refocused perfectly; dephasing due to genuine, random spin–spin processes is not, so the echo amplitude decays as $\mathrm{e}^{-2\tau/T_2}$. Echoes also refocus chemical-shift differences while leaving homonuclear couplings active, a trick at the heart of many multipulse experiments and of magnetic resonance imaging.

::: example T₁ from an inversion-recovery null, and a line width {#ex-relax}
In an inversion-recovery experiment the methyl signal of a small molecule passes through zero at $\tau = 0.40\ \mathrm{s}$. (a) What is $T_1$? (b) How long should the relaxation delay be for spectra in which this signal integrates quantitatively? (c) If $T_2 = T_1$, what is its natural line width?
::: solution
(a) From [[#eq-ir]], $M_z = 0$ when $\mathrm{e}^{-\tau/T_1} = \tfrac12$, so $T_1 = \tau_\mathrm{null}/\ln 2 = 0.40/0.6931 = 0.58\ \mathrm{s}$.
(b) Allowing $5T_1 = 2.9\ \mathrm{s}$ between 90° pulses restores $1 - \mathrm{e}^{-5} = 99.3\,\%$ of $M_0$; for quantitative work the delay must be set by the *slowest*-relaxing signal you wish to integrate, often a quaternary carbon or an isolated proton with $T_1$ of several seconds.
(c) By [[#eq-linewidth]], $\Delta\nu_{1/2} = 1/(\pi \times 0.577\ \mathrm{s}) = 0.55\ \mathrm{Hz}$. Measured widths are usually larger (often $0.5$–$1\ \mathrm{Hz}$) because of residual field inhomogeneity, i.e. $T_2^{*} < T_2$; shimming the magnet is the art of making $T_2^{*}$ approach $T_2$.
:::
:::

### The nuclear Overhauser effect

Relaxation also couples spins to one another. If one set of nuclei S is saturated by continuous irradiation, the populations of a nearby nucleus I that relaxes through dipolar interaction with S are disturbed, and the intensity of the I signal changes: this is the **nuclear Overhauser effect** (NOE). For small molecules tumbling rapidly, the maximum fractional enhancement is $\eta_\mathrm{max} = \gamma_\mathrm{S}/2\gamma_\mathrm{I}$, which is $+0.5$ for two protons and $+1.99$ for $^{13}\mathrm{C}$ observed while protons are irradiated (the gain used in [[#ex-receptivity]]). Because the dipolar interaction falls off as $r^{-6}$, homonuclear NOEs are observable only between nuclei closer than about $5\ \mathrm{\AA}$ — *through space*, not through bonds — which makes NOE difference spectra and two-dimensional NOESY the standard tools for relative stereochemistry and for protein structures, as [[spectroscopy/nmr-structure]] shows.

## Chemical exchange and the NMR timescale

A nucleus that jumps between two environments with different shifts — the two methyl groups of an amide during rotation about the $\mathrm{C{-}N}$ bond, axial and equatorial protons of a ring-flipping cyclohexane, the $\mathrm{OH}$ proton of ethanol moving between molecules — gives a spectrum that depends on how the jump rate compares with the frequency difference. If exchange is slow ($k \ll \Delta\nu$) two separate lines appear; if fast ($k \gg \Delta\nu$), one sharp line at the population-weighted average shift; in between, the lines broaden, move together and merge. "Fast" and "slow" are measured against $\Delta\nu$ in hertz: with shift differences of $10$–$10^{3}\ \mathrm{Hz}$, NMR is sensitive to processes with rate constants of about $1$–$10^{4}\ \mathrm{s^{-1}}$, a window into conformational and fluxional chemistry that no other technique offers so directly.

::: proposition Coalescence of two equally populated sites {#prop-coalescence}
For exchange between two equally populated sites separated by $\Delta\nu$ (in hertz), with first-order rate constant $k$ for each forward jump and with natural line widths negligible compared with $\Delta\nu$, the two lines merge into a single flat-topped line — **coalescence** — when
$$
k_\mathrm{c} = \frac{\pi\,\Delta\nu}{\sqrt{2}} \approx 2.22\,\Delta\nu .
$$ {#eq-coalescence}
Combined with the Eyring equation $k = (k_\mathrm{B}T/h)\,\mathrm{e}^{-\Delta G^{\ddagger}/RT}$ at the coalescence temperature $T_\mathrm{c}$, this gives the free energy of activation, $\Delta G^{\ddagger} = RT_\mathrm{c}\ln\!\left(k_\mathrm{B}T_\mathrm{c}/hk_\mathrm{c}\right)$.
:::

::: proof Sketch from the exchange line shape
Solving the Bloch equations modified for exchange (the McConnell equations) for two equally populated sites at $\nu_\mathrm{c} \pm \tfrac12\Delta\nu$ gives, with $\tau = 1/2k$ and $u = \nu - \nu_\mathrm{c}$, the line shape
$$
g(u) \propto \frac{\tau\,\Delta\nu^{2}}{u^{2} + 4\pi^{2}\tau^{2}\left(u^{2} - \tfrac14\Delta\nu^{2}\right)^{2}} .
$$
Near the centre the denominator expands as $4\pi^{2}\tau^{2}\left(\tfrac14\Delta\nu^{2}\right)^{2} + u^{2}\left(1 - 2\pi^{2}\tau^{2}\Delta\nu^{2}\right) + O(u^{4})$. If the coefficient of $u^{2}$ is negative, $g$ has a dip at $u = 0$ (two peaks); if positive, a maximum (one peak). The boundary, where the centre is flat, is $2\pi^{2}\tau^{2}\Delta\nu^{2} = 1$, i.e. $\tau = 1/(\sqrt{2}\,\pi\Delta\nu)$, and so $k_\mathrm{c} = 1/2\tau = \pi\Delta\nu/\sqrt{2}$. The Eyring form assumes a transmission coefficient of one, as in [[kinetics/transition-state-theory]].
:::

::: example The rotational barrier of an amide {#ex-coalescence}
The two $\mathrm{N{-}CH_3}$ signals of an $N,N$-dimethylamide are $0.10\ \mathrm{ppm}$ apart at $300\ \mathrm{MHz}$ and coalesce at $350\ \mathrm{K}$ (illustrative values typical of such amides). Estimate the rate constant at coalescence and the free energy of activation for rotation about the $\mathrm{C{-}N}$ bond.
::: solution
$\Delta\nu = 0.10 \times 300 = 30\ \mathrm{Hz}$, so by [[#eq-coalescence]] $k_\mathrm{c} = \pi \times 30/\sqrt{2} = 66.6\ \mathrm{s^{-1}}$. Then
$$
\Delta G^{\ddagger} = RT_\mathrm{c}\ln\frac{k_\mathrm{B}T_\mathrm{c}}{hk_\mathrm{c}}
= 8.314 \times 350 \times \ln\frac{1.3806\times10^{-23} \times 350}{6.626\times10^{-34} \times 66.6}\ \mathrm{J\,mol^{-1}}
= 2910 \times \ln(1.095\times10^{11}) = 74.0\ \mathrm{kJ\,mol^{-1}} .
$$
A barrier this high reflects the partial double-bond character of the amide $\mathrm{C{-}N}$ bond (the resonance of [[organic-2/carboxylic-derivatives]]); a simple single-bond rotation, with a barrier near $12\ \mathrm{kJ\,mol^{-1}}$, would be far into the fast-exchange limit at any accessible temperature. Note that $\Delta G^{\ddagger}$ depends only logarithmically on $k_\mathrm{c}$, so even a $20\,\%$ error in $\Delta\nu$ shifts the barrier by only about $0.5\ \mathrm{kJ\,mol^{-1}}$; the temperature is the critical measurement. Because $\Delta\nu$ in hertz grows with the field, the same amide coalesces at a *higher* temperature on a higher-field instrument — "fast on the NMR timescale" depends on the spectrometer.
:::
:::

::: remark Safety around NMR magnets {#rem-safety}
Superconducting NMR magnets are always on. Their stray field can stop or reprogram cardiac pacemakers and other implanted devices, so people with such devices must stay outside the marked $0.5\ \mathrm{mT}$ (5 gauss) line; ferromagnetic objects — gas cylinders, tools, chairs — can be pulled into the magnet with lethal force and must never be brought near; and magnetic-stripe cards and mechanical watches are damaged. The magnets are cooled by liquid helium inside a liquid-nitrogen jacket: refilling requires training, cryogenic gloves and face protection, and a **quench** (sudden loss of superconductivity) boils off hundreds of litres of helium, which can displace the air in a small room — hence oxygen monitors and ventilation in NMR laboratories. Samples are usually small and benign, but deuterated solvents such as $\mathrm{CDCl_3}$ carry the same hazards as their protonated forms and are handled in a fume cupboard. As with all laboratory work, use of the instruments requires induction, supervision and a risk assessment.
:::

## Where this leads

Everything a chemist reads from a routine spectrum — shifts, integrals, multiplicities, couplings — rests on this lesson, and [[spectroscopy/nmr-structure]] turns it into a method for determining structures, including two-dimensional experiments (COSY, HSQC, HMBC, NOESY) that are built from the pulses, delays and coherences introduced here. The same physics with an electron instead of a nucleus, $\gamma$ larger by a factor of about 658 and microwave instead of radiofrequency, is [[spectroscopy/epr]]; hyperfine coupling there is the analogue of $J$ coupling here. Fourier methods and signal averaging recur in infrared spectroscopy ([[spectroscopy/vibrational-spectroscopy]]), and the combination of NMR, infrared and mass spectra in practice is the subject of [[spectroscopy/structure-problems]]. Dynamic NMR connects to the barriers and rate constants of [[kinetics/transition-state-theory]]; NOE-derived distances underpin protein structures in [[biochemistry/amino-acids-proteins]]; and the spin echo and relaxation-time contrast, with field gradients added for spatial encoding, are the basis of medical magnetic resonance imaging.

::: history
Isidor Rabi observed nuclear magnetic resonance in molecular beams in 1938 (Nobel Prize in Physics 1944). In 1946 two groups independently detected it in bulk matter: Edward Purcell, Henry Torrey and Robert Pound in solid paraffin, and Felix Bloch, William Hansen and Martin Packard in water; Bloch and Purcell shared the 1952 Nobel Prize in Physics. Nicolaas Bloembergen, Purcell and Pound's 1948 theory of relaxation explained $T_1$ and $T_2$ through molecular motion. The chemical shift was found in 1950 (by Warren Proctor and Fu Chun Yu for nitrogen in ammonium nitrate, and by W. C. Dickinson for fluorine), Erwin Hahn reported the spin echo in 1950, and in 1951 James Arnold, S. S. Dharmatti and Packard resolved the three proton signals of ethanol, the spectrum that opened this lesson. Spin–spin coupling was identified in 1951 by Herbert Gutowsky, David McCall and Charles Slichter and by Hahn and Donald Maxwell; George Tiers proposed TMS as the reference in 1958. Richard Ernst and Weston Anderson introduced pulsed Fourier-transform NMR in 1966, the basis of all modern instruments; Ernst received the 1991 Nobel Prize in Chemistry for this and for two-dimensional NMR, and Kurt Wüthrich shared the 2002 prize for protein structures by NMR. Paul Lauterbur's 1973 paper on imaging with field gradients and Peter Mansfield's development of fast imaging earned the 2003 Nobel Prize in Physiology or Medicine.
:::

::: summary
- Nuclei with $I \ne 0$ have magnetic moments $\mu_z = \gamma\hbar m_I$; in a field $B_0$ their $2I+1$ Zeeman levels are spaced by $\gamma\hbar B_0$, and with $\Delta m_I = \pm1$ they absorb at the Larmor frequency $\nu_0 = \gamma B_0/2\pi$ ($400\ \mathrm{MHz}$ for $^{1}\mathrm{H}$ at $9.40\ \mathrm{T}$).
- The population excess is only $h\nu_0/2k_\mathrm{B}T \approx 3\times10^{-5}$ at $400\ \mathrm{MHz}$; receptivity scales as $|\gamma|^{3}I(I+1)$ times abundance, putting $^{13}\mathrm{C}$ at $1.70\times10^{-4}$ of $^{1}\mathrm{H}$.
- Pulses tip the bulk magnetisation by $\theta = \gamma B_1 t_\mathrm{p}$; the FID after a 90° pulse is Fourier-transformed into the spectrum, digital resolution is $1/t_\mathrm{acq}$, and $S/N$ grows as $\sqrt{n}$ with the number of scans.
- Electrons shield nuclei, $\nu = \gamma B_0(1-\sigma)/2\pi$; the chemical shift $\delta = (\nu - \nu_\mathrm{ref})/\nu_\mathrm{ref}\times10^{6}$ relative to TMS is field-independent, and is set by electron density, paramagnetic terms, group anisotropy and ring currents.
- Through-bond scalar coupling $J$ (in Hz, field-independent) splits a signal coupled to $n$ equivalent spin-½ nuclei into $n+1$ lines with binomial intensities, provided $\Delta\nu \gg J$; otherwise second-order effects such as AB roofing appear, and only magnetically equivalent nuclei count as equivalent.
- $T_1$ restores $M_z$ (inversion-recovery null at $T_1\ln2$) and limits the repetition rate; $T_2$ destroys transverse coherence and sets the Lorentzian line width $1/\pi T_2$; the spin echo removes inhomogeneous dephasing; the NOE reports through-space proximity within about $5\ \mathrm{\AA}$.
- Exchange between two sites gives separate lines when slow and an averaged line when fast, coalescing at $k_\mathrm{c} = \pi\Delta\nu/\sqrt{2}$, from which the Eyring equation yields barriers.
:::

## Exercises

::: exercise A carbon-13 frequency {level=1 check="150.90"}
A spectrometer's proton frequency is exactly $600.000\ \mathrm{MHz}$. At what frequency does $^{13}\mathrm{C}$ resonate in the same magnet? Use $\gamma(^{1}\mathrm{H}) = 26.752\times10^{7}$ and $\gamma(^{13}\mathrm{C}) = 6.7283\times10^{7}\ \mathrm{s^{-1}\,T^{-1}}$. (Enter the frequency in MHz.)
::: solution
Both nuclei feel the same $B_0$, so by [[#eq-larmor]] their frequencies are in the ratio of their magnetogyric ratios: $\nu(^{13}\mathrm{C}) = 600.000 \times 6.7283/26.752 = 150.90\ \mathrm{MHz}$. (Shielding changes this by at most a few parts in $10^{4}$, the chemical-shift range.)
:::
:::

::: exercise From ppm to hertz {level=1 check="1500"}
A singlet appears at $\delta$ 2.50 in a spectrum recorded at $600.0\ \mathrm{MHz}$. How far from the TMS signal is it in hertz? (Enter the separation in Hz.)
::: solution
By [[#eq-shift]], $\nu - \nu_\mathrm{ref} = \delta \times 10^{-6} \times \nu_\mathrm{ref} = 2.50\times10^{-6} \times 600.0\times10^{6}\ \mathrm{Hz} = 1500\ \mathrm{Hz}$. On a $300\ \mathrm{MHz}$ instrument the same signal would be $750\ \mathrm{Hz}$ from TMS, but still at $\delta$ 2.50.
:::
:::

::: exercise Multiplicity of a methine proton {level=1 check="7"}
How many lines does the $\mathrm{CH}$ proton of an isopropyl group, $\mathrm{(CH_3)_2CH{-}}$, attached to a carbon that carries no protons, show in a first-order spectrum? Give the intensity pattern. (Enter the number of lines.)
::: solution
The methine proton couples to six equivalent methyl protons with the same $^{3}J$, so by [[#prop-multiplet]] it is split into $6 + 1 = 7$ lines — a septet — with intensities $\binom{6}{k} = 1{:}6{:}15{:}20{:}15{:}6{:}1$. The methyl protons appear as a 6H doublet.
:::
:::

::: exercise The population excess at 600 MHz {level=2 check="48.3"}
Calculate the fractional population excess $(N_\alpha - N_\beta)/N$ of protons on a $600\ \mathrm{MHz}$ spectrometer at $298\ \mathrm{K}$. (Enter it in parts per million.)
::: solution
By [[#eq-excess]], $(N_\alpha - N_\beta)/N \approx h\nu_0/2k_\mathrm{B}T = 6.62607\times10^{-34} \times 6.000\times10^{8}/(2 \times 1.380649\times10^{-23} \times 298) = 4.83\times10^{-5}$, i.e. $48.3$ parts per million. The approximation $\tanh x \approx x$ is exact to one part in $10^{9}$ here. Even at the highest commercial fields (about $28\ \mathrm{T}$, $1.2\ \mathrm{GHz}$) the excess stays below $10^{-4}$.
:::
:::

::: exercise Line width from T₂ {level=2 check="0.637"}
A proton has $T_2 = 0.50\ \mathrm{s}$. What is the full width at half height of its line, assuming a perfectly homogeneous field? (Enter the width in Hz.)
::: solution
By [[#eq-linewidth]], $\Delta\nu_{1/2} = 1/\pi T_2 = 1/(\pi \times 0.50\ \mathrm{s}) = 0.637\ \mathrm{Hz}$. To resolve a line this narrow the acquisition time must be at least about $1/0.637 \approx 1.6\ \mathrm{s}$, and the field homogeneity over the sample must be better than about $1.6$ parts in $10^{9}$ at $400\ \mathrm{MHz}$.
:::
:::

::: exercise An inversion-recovery null {level=2 check="0.721"}
In an inversion-recovery experiment a signal disappears for a delay $\tau = 0.50\ \mathrm{s}$. What is its $T_1$? (Enter $T_1$ in s.)
::: solution
From [[#eq-ir]], $1 - 2\mathrm{e}^{-\tau/T_1} = 0$ gives $\tau = T_1\ln 2$, so $T_1 = 0.50/0.6931 = 0.721\ \mathrm{s}$. A quick check: at $\tau = T_1$ the signal would be $1 - 2/\mathrm{e} = +0.26$ of $M_0$, already positive, consistent with the null at $0.69\,T_1$.
:::
:::

::: exercise Roofing in an AB system {level=2 check="2.62"}
Two coupled protons have $\Delta\nu = 20.0\ \mathrm{Hz}$ and $J = 10.0\ \mathrm{Hz}$. Find the positions of the four AB lines relative to the centre and the ratio of the intensity of an inner line to that of an outer line. (Enter the intensity ratio.)
::: hint
Use $D = \sqrt{\Delta\nu^{2} + J^{2}}$; the lines are at $\pm\tfrac12(D \pm J)$ with intensities $1 \mp J/D$.
:::
::: solution
$D = \sqrt{20.0^{2} + 10.0^{2}} = 22.36\ \mathrm{Hz}$. The outer lines are at $\pm\tfrac12(D + J) = \pm 16.18\ \mathrm{Hz}$ and the inner at $\pm\tfrac12(D - J) = \pm 6.18\ \mathrm{Hz}$; within each doublet the spacing is $16.18 - 6.18 = 10.0\ \mathrm{Hz} = J$, as it must be. The intensity ratio is $(1 + J/D)/(1 - J/D) = 1.447/0.553 = 2.62$. The doublet centres are at $\pm 11.18\ \mathrm{Hz}$, but the true shifts are at $\pm\tfrac12\Delta\nu = \pm 10.0\ \mathrm{Hz}$: reading shifts from doublet centres in a roofed spectrum overestimates $\Delta\nu$ by $\sqrt{\Delta\nu^{2} + J^{2}} - \Delta\nu$.
:::
:::

::: exercise Scans needed for a dilute sample {level=2 check="256"}
A proton spectrum of a dilute sample shows $S/N = 25$ after 16 scans. How many scans are needed for $S/N = 100$, other conditions unchanged? (Enter the number of scans.)
::: solution
By [[#prop-signal-averaging]], $S/N \propto \sqrt{n}$; a four-fold increase needs $n$ to increase sixteen-fold, so $16 \times 16 = 256$ scans. Doubling the concentration would achieve the same as quadrupling the number of scans, which is why sample preparation is often the cheapest route to sensitivity.
:::
:::

::: exercise A barrier from coalescence {level=3 check="67.7"}
On a $400\ \mathrm{MHz}$ instrument, two equally populated signals separated by $0.15\ \mathrm{ppm}$ coalesce at $330\ \mathrm{K}$. Estimate $\Delta G^{\ddagger}$ for the exchange process. At what temperature would you expect coalescence on a $100\ \mathrm{MHz}$ instrument, assuming $\Delta G^{\ddagger}$ is independent of temperature? (Enter $\Delta G^{\ddagger}$ in kJ mol⁻¹.)
::: hint
Find $\Delta\nu$ in hertz first; at the lower field $k_\mathrm{c}$ is four times smaller, and you must solve the Eyring expression for $T_\mathrm{c}$ iteratively.
:::
::: solution
$\Delta\nu = 0.15 \times 400 = 60\ \mathrm{Hz}$, so $k_\mathrm{c} = \pi \times 60/\sqrt{2} = 133.3\ \mathrm{s^{-1}}$. By [[#prop-coalescence]],
$$
\Delta G^{\ddagger} = 8.314 \times 330 \times \ln\frac{1.3806\times10^{-23} \times 330}{6.626\times10^{-34} \times 133.3}\ \mathrm{J\,mol^{-1}} = 2744 \times \ln(5.16\times10^{10}) = 67.7\ \mathrm{kJ\,mol^{-1}} .
$$
At $100\ \mathrm{MHz}$, $\Delta\nu = 15\ \mathrm{Hz}$ and $k_\mathrm{c} = 33.3\ \mathrm{s^{-1}}$. We need $T$ such that $RT\ln(k_\mathrm{B}T/hk_\mathrm{c}) = 67.7\ \mathrm{kJ\,mol^{-1}}$. Try $T = 315\ \mathrm{K}$: $8.314 \times 315 \times \ln(1.97\times10^{11}) = 2619 \times 26.01 = 68.1\ \mathrm{kJ\,mol^{-1}}$, slightly high; $T = 313\ \mathrm{K}$ gives $67.7\ \mathrm{kJ\,mol^{-1}}$. So coalescence occurs near $313\ \mathrm{K}$, about $17\ \mathrm{K}$ lower than at $400\ \mathrm{MHz}$: the smaller frequency separation is averaged by a slower exchange.
:::
:::

::: exercise Deriving the Lorentzian and its width {level=3}
(a) Show that the absorption-mode Fourier transform of $s(t) = \mathrm{e}^{-t/T_2}\cos(2\pi\nu_0 t)$ for $t \ge 0$ is, near $\nu_0$, a Lorentzian of full width $1/\pi T_2$. (b) Show that the area under the Lorentzian is independent of $T_2$, and explain why this means that integrals, not peak heights, measure the number of nuclei. (c) If field inhomogeneity contributes an extra $0.5\ \mathrm{Hz}$ to every line width, what is the observed width of a line with $T_2 = 2.0\ \mathrm{s}$?
::: solution
(a) Write $\cos(2\pi\nu_0 t) = \tfrac12(\mathrm{e}^{\mathrm{i}2\pi\nu_0 t} + \mathrm{e}^{-\mathrm{i}2\pi\nu_0 t})$. Near $\nu = +\nu_0$ the second term contributes a line at $-\nu_0$, far away, which can be ignored. The first term gives, as in the proof of [[#prop-linewidth]], $\tfrac12\int_0^{\infty}\mathrm{e}^{-t/T_2}\mathrm{e}^{-\mathrm{i}2\pi(\nu - \nu_0)t}\,\mathrm{d}t = \tfrac12\,\dfrac{1}{1/T_2 + \mathrm{i}2\pi(\nu - \nu_0)}$, whose real part is $\tfrac12 T_2/[1 + 4\pi^{2}T_2^{2}(\nu - \nu_0)^{2}]$. It is maximal at $\nu_0$ and halves at $|\nu - \nu_0| = 1/2\pi T_2$, so the full width at half maximum is $1/\pi T_2$.
(b) With $x = 2\pi T_2(\nu - \nu_0)$, $\int_{-\infty}^{\infty}\dfrac{T_2\,\mathrm{d}\nu}{1 + 4\pi^{2}T_2^{2}(\nu - \nu_0)^{2}} = \dfrac{1}{2\pi}\int_{-\infty}^{\infty}\dfrac{\mathrm{d}x}{1 + x^{2}} = \dfrac{1}{2\pi}\cdot\pi = \tfrac12$, independent of $T_2$. (Equivalently, the area of a spectrum equals the FID at $t = 0$, which is fixed by $M_0$ alone.) A broad line is lower but no smaller, so the area — the integral — is proportional to the number of nuclei whatever their relaxation, provided full relaxation between scans; peak heights are not.
(c) The natural width is $1/(\pi \times 2.0) = 0.16\ \mathrm{Hz}$; adding the inhomogeneous contribution gives about $0.66\ \mathrm{Hz}$, corresponding to $T_2^{*} = 1/(\pi \times 0.66) = 0.48\ \mathrm{s}$. In most small-molecule spectra the magnet, not the molecule, sets the line width.
:::
:::

::: exercise Receptivities compared {level=3 check="391"}
Using [[#eq-receptivity]] with $\gamma(^{31}\mathrm{P}) = 10.839\times10^{7}$, $\gamma(^{13}\mathrm{C}) = 6.7283\times10^{7}\ \mathrm{s^{-1}\,T^{-1}}$ and natural abundances $100\,\%$ and $1.07\,\%$, how many times more receptive is $^{31}\mathrm{P}$ than $^{13}\mathrm{C}$? Hence explain why $^{31}\mathrm{P}$ NMR is routine for phosphines and phosphates, and estimate how many times more scans a $^{13}\mathrm{C}$ spectrum would need for equal $S/N$ on equimolar P and C sites. (Enter the receptivity ratio.)
::: solution
Both have $I = \tfrac12$. The ratio is $(10.839/6.7283)^{3} \times (100/1.07) = (1.6110)^{3} \times 93.46 = 4.181 \times 93.46 = 391$. Phosphorus-31 is fully abundant and has a magnetogyric ratio about $40\,\%$ of the proton's, so a $^{31}\mathrm{P}$ spectrum of a phosphine ligand or a nucleotide takes seconds to minutes; its wide shift range (several hundred ppm) and large couplings to protons, carbon and metals make it a superb probe of phosphorus environments in coordination and biological chemistry. For equal $S/N$, the $^{13}\mathrm{C}$ experiment would need $391^{2} \approx 1.5\times10^{5}$ times as many scans before enhancements such as the NOE — in practice the gap is narrowed by NOE and decoupling, but carbon spectra remain the slowest routine experiment.
:::
:::
