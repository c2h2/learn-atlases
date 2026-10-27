Every other method in this course asks a molecule how it responds to light or to a magnetic field. Mass spectrometry asks a blunter question — *how heavy are you?* — and answers it with astonishing precision. Turn a molecule into an ion, accelerate it, and the way it moves through electric and magnetic fields depends on one number only, its mass-to-charge ratio $m/z$. Weigh the ion to one part in a million and you know its molecular formula; break it apart and weigh the pieces and you learn how its atoms are connected; read the small satellite peaks one or two mass units above the main one and you can count its carbon, chlorine, bromine and sulfur atoms without any other information. The method needs less than a nanogram of sample, couples directly to chromatography, and runs from hydrogen to intact viruses. This lesson builds the subject from four questions: how neutral molecules become ions, how ions are separated by $m/z$, what the isotope pattern of an ion tells you, and why ions break where they do.

Mass spectrometry is not, strictly, spectroscopy — no photon is absorbed or emitted, and there are no selection rules in the sense of [[spectroscopy/spectroscopy-principles]]. It earns its place here because, together with NMR and infrared, it is one of the three methods by which unknown structures are actually solved, and the molecular formula it supplies is the first line of every structure problem in [[spectroscopy/structure-problems]].

## Weighing ions: masses, m/z and resolution

A mass spectrometer has three parts: an **ion source**, which turns sample molecules into gas-phase ions; a **mass analyser**, which sorts the ions by $m/z$; and a **detector**, which counts them. The whole instrument (or at least the analyser) runs under high vacuum, $10^{-4}$ to $10^{-9}\ \mathrm{Pa}$ depending on the analyser, so that an ion travels to the detector without colliding with gas molecules. The output, the **mass spectrum**, is a plot of ion abundance against $m/z$, conventionally normalised so that the tallest peak — the **base peak** — is $100\,\%$.

Before any instrument, we need to be exact about what "mass" means, because chemistry uses three different numbers and mass spectrometry uses all of them.

::: definition Masses, m/z, mass accuracy and resolving power {#def-masses}
For an ion of mass $m$ (in unified atomic mass units, $\mathrm{u}$, also called daltons, $\mathrm{Da}$) carrying $z$ elementary charges:

- the **mass-to-charge ratio** $m/z$ is the dimensionless number the spectrometer measures, written in italics; for a singly charged ion it equals the ion mass in $\mathrm{u}$;
- the **nominal mass** is the sum of the integer mass numbers of the most abundant isotope of each element ($^{1}\mathrm{H} = 1$, $^{12}\mathrm{C} = 12$, $^{16}\mathrm{O} = 16$ …);
- the **monoisotopic mass** is the exact mass of the ion built from the most abundant isotope of each element, using the measured isotopic masses ($^{1}\mathrm{H} = 1.007\,825\,03\ \mathrm{u}$, $^{12}\mathrm{C} = 12$ exactly …);
- the **average mass** (the molar mass of general chemistry, in $\mathrm{g\,mol^{-1}}$) is weighted over the natural isotopic composition;
- the **mass error** of a measurement is $(m_\mathrm{meas} - m_\mathrm{theo})/m_\mathrm{theo}$, quoted in parts per million ($\mathrm{ppm}$);
- the **resolving power** is $R = m/\Delta m$, where $\Delta m$ is the full width of a peak at half its maximum height (FWHM); two peaks of similar height at $m$ and $m + \Delta m$ are just separated when $R \ge m/\Delta m$.
:::

The isotopic masses used throughout this lesson are those of the Atomic Mass Evaluation AME2020 (Wang et al., *Chinese Physics C* **45**, 030003, 2021), and isotopic abundances are the IUPAC (CIAAW) representative values: $^{13}\mathrm{C}$ $1.07\,\%$, $^{2}\mathrm{H}$ $0.0115\,\%$, $^{15}\mathrm{N}$ $0.364\,\%$, $^{18}\mathrm{O}$ $0.205\,\%$, $^{34}\mathrm{S}$ $4.25\,\%$, $^{37}\mathrm{Cl}$ $24.24\,\%$, $^{81}\mathrm{Br}$ $49.31\,\%$. The electron mass is $m_\mathrm{e} = 0.000\,548\,58\ \mathrm{u}$ and the proton mass $1.007\,276\ \mathrm{u}$ (CODATA 2018).

Why do exact masses differ from integers at all? Because the mass of a nucleus is the mass of its protons and neutrons *minus* its binding energy divided by $c^{2}$. By definition $^{12}\mathrm{C}$ has mass exactly $12\ \mathrm{u}$; hydrogen, whose nucleus has no binding energy, is heavier than one-twelfth of carbon ($1.007\,83$), while $^{16}\mathrm{O}$ ($15.994\,91$) and $^{35}\mathrm{Cl}$ ($34.968\,85$) are slightly lighter than their mass numbers. Each element thus carries a characteristic **mass defect**, and a molecular formula carries the sum of them. That small decimal tail is the fingerprint high-resolution mass spectrometry reads.

::: example Three molecules of nominal mass 28 {#ex-mass-28}
Carbon monoxide, dinitrogen and ethene all have nominal mass 28. Calculate their monoisotopic masses, and find the resolving power needed to separate $\mathrm{CO}$ from $\mathrm{N_2}$ and $\mathrm{N_2}$ from $\mathrm{C_2H_4}$.
::: solution
With $^{12}\mathrm{C} = 12.000\,000$, $^{16}\mathrm{O} = 15.994\,915$, $^{14}\mathrm{N} = 14.003\,074$ and $^{1}\mathrm{H} = 1.007\,825$:
$$
\begin{aligned}
m(\mathrm{CO}) &= 12.000\,000 + 15.994\,915 = 27.994\,915\ \mathrm{u},\\
m(\mathrm{N_2}) &= 2 \times 14.003\,074 = 28.006\,148\ \mathrm{u},\\
m(\mathrm{C_2H_4}) &= 24.000\,000 + 4 \times 1.007\,825 = 28.031\,300\ \mathrm{u}.
\end{aligned}
$$
The $\mathrm{CO}/\mathrm{N_2}$ pair differs by $\Delta m = 0.011\,233\ \mathrm{u}$, so $R = 28/0.011\,233 = 2.49\times10^{3}$; the $\mathrm{N_2}/\mathrm{C_2H_4}$ pair differs by $0.025\,152\ \mathrm{u}$, needing only $R = 1.11\times10^{3}$. A routine quadrupole ($R$ of order $10^{3}$ at best, unit resolution) cannot tell $\mathrm{CO}$ from $\mathrm{N_2}$ — a real nuisance in residual-gas analysis — while any high-resolution instrument separates all three easily. Notice the pattern: hydrogen-rich ions have positive mass defects, oxygen-rich ones negative.
:::
:::

## Making ions

The ion source decides almost everything about what a spectrum looks like. "Hard" sources deposit a lot of energy and fragment the molecule — good for structure, bad if you want to see the intact molecule; "soft" sources make intact ions of large, fragile or involatile molecules. A modern laboratory uses both.

### Electron ionisation

In **electron ionisation** (EI) the vapour of the sample crosses a beam of electrons accelerated through $70\ \mathrm{V}$. An electron passing close to a molecule ejects one of its electrons:
$$
\mathrm{M} + \mathrm{e^-} \rightarrow \mathrm{M^{+\bullet}} + 2\,\mathrm{e^-}
$$
The product is the **molecular ion** $\mathrm{M^{+\bullet}}$, a radical cation: it has lost one electron, so it carries both a positive charge and an unpaired electron. The electron removed is the most loosely held one — a non-bonding lone pair on O, N or a halogen, then a $\pi$ electron, then a $\sigma$ electron — and the site of the resulting charge and radical is the starting point for predicting fragmentation.

Why $70\ \mathrm{eV}$? Organic molecules have ionisation energies of about $8$–$11\ \mathrm{eV}$ (benzene $9.24\ \mathrm{eV}$, NIST Chemistry WebBook), so $70\ \mathrm{eV}$ ($6754\ \mathrm{kJ\,mol^{-1}}$) is far more than enough. At this energy the electron's de Broglie wavelength, $\lambda = h/\sqrt{2m_\mathrm{e}E} = 0.147\ \mathrm{nm}$, is comparable to bond lengths and the ionisation cross-section is near its broad maximum, so the ion yield is insensitive to small drifts in the electron energy. That is what makes EI spectra reproducible between instruments and allows libraries of hundreds of thousands of reference spectra (the NIST/EPA/NIH library is the standard) to be searched by computer. The price is that the molecular ion is left with several electronvolts of internal energy, typically enough to break a bond within microseconds: for some compounds — tertiary alcohols, highly branched alkanes — the molecular ion is weak or absent altogether.

### Chemical ionisation

**Chemical ionisation** (CI) is EI made gentle. A reagent gas (methane, isobutane or ammonia) at about $100\ \mathrm{Pa}$ is ionised instead of the sample; its ions react with each other to form strong gas-phase acids such as $\mathrm{CH_5^+}$, which then protonate the analyte:
$$
\mathrm{CH_5^+} + \mathrm{M} \rightarrow [\mathrm{M+H}]^+ + \mathrm{CH_4}
$$
The protonated molecule $[\mathrm{M+H}]^+$ is an **even-electron** ion with little excess energy — the exothermicity of proton transfer, set by the difference in proton affinities, is a few electronvolts at most and can be tuned by choice of reagent — so it survives to the detector. A CI spectrum is usually dominated by a peak one unit above the molecular mass, which is exactly what you need when the EI spectrum shows no molecular ion.

### Electrospray ionisation

EI and CI need a vapour. Peptides, proteins, nucleic acids, sugars and salts have no useful vapour pressure, and until the late 1980s they were essentially out of reach. **Electrospray ionisation** (ESI) solved the problem by making ions directly from solution. The solution, typically in water–methanol or water–acetonitrile with a little methanoic acid, is pumped through a fine metal capillary held at $2$–$5\ \mathrm{kV}$; the field pulls the liquid into a cone that emits a spray of charged droplets. As solvent evaporates, each droplet shrinks until the repulsion of its charges overcomes surface tension and it splits into smaller droplets; repeated fission and evaporation finally release desolvated ions into the gas phase. In positive mode the ions are $[\mathrm{M+H}]^+$, adducts such as $[\mathrm{M+Na}]^+$ and $[\mathrm{M+NH_4}]^+$, and — for a molecule with many basic sites — **multiply protonated ions** $[\mathrm{M}+z\mathrm{H}]^{z+}$; in negative mode, $[\mathrm{M-H}]^-$.

ESI is the softest common ionisation method: ions arrive essentially intact, even non-covalent protein complexes. Because it works from a flowing liquid, it is the natural partner of liquid chromatography (LC–MS), discussed in [[analytical-chemistry/hyphenated-methods]]. Multiple charging has a remarkable consequence: a $17\,\mathrm{kDa}$ protein carrying 17 protons appears near $m/z$ 1000, within the range of an ordinary analyser.

### MALDI

In **matrix-assisted laser desorption/ionisation** (MALDI) the analyte is mixed with a large excess of a small, strongly UV-absorbing organic acid (the matrix, for example 2,5-dihydroxybenzoic acid or α-cyano-4-hydroxycinnamic acid) and dried on a metal plate. A pulsed ultraviolet laser — a nitrogen laser at $337\ \mathrm{nm}$ or a frequency-tripled Nd:YAG laser at $355\ \mathrm{nm}$ — vaporises a tiny volume of the matrix, which carries the analyte into the gas phase and protonates it. MALDI makes mostly singly charged ions, $[\mathrm{M+H}]^+$, which makes its spectra simpler than ESI spectra; because it produces ions in short pulses, it pairs naturally with time-of-flight analysers. It is the workhorse for polymers, peptide mass fingerprints and, in clinical microbiology, the identification of bacteria from their protein profiles.

::: warning The molecular ion is not always the highest-mass peak {#warn-molecular-ion}
Two opposite mistakes are common. First, assuming that the peak of highest $m/z$ in an EI spectrum is the molecular ion: it may be an isotope peak ($\mathrm{M+2}$ of a chlorine compound is higher in mass than $\mathrm{M}$), and for fragile molecules the true $\mathrm{M^{+\bullet}}$ may be absent, so the highest significant peak is a fragment. Check that the losses from it to the next peaks are chemically sensible: a loss of $4$–$14$ or $21$–$25$ mass units from a supposed molecular ion is almost never possible, so the peak is not $\mathrm{M^{+\bullet}}$. Second, forgetting that soft ionisation does not give $\mathrm{M}$ itself: ESI and CI give $[\mathrm{M+H}]^+$ (one unit heavier), $[\mathrm{M+Na}]^+$ (22 units heavier than $[\mathrm{M+H}]^+$) or $[\mathrm{M-H}]^-$, and reading $[\mathrm{M+H}]^+$ as $\mathrm{M}$ breaks the nitrogen rule and every formula calculation that follows.
:::

## Sorting ions: mass analysers

All analysers exploit the same physics. An ion of charge $ze$ accelerated through a potential difference $U$ acquires kinetic energy $zeU$, and its motion in any subsequent field depends on $m$ and $z$ only through the ratio $m/z$. The analysers differ in how they convert $m/z$ into something measurable — a position, a transmission window, a time or a frequency.

**The magnetic sector.** An ion of speed $v$ in a magnetic field $B$ perpendicular to its path follows a circle of radius $r$ with $zevB = mv^{2}/r$. Combining with $\tfrac12 mv^{2} = zeU$ gives
$$
\frac{m}{z} = \frac{e\,B^{2}r^{2}}{2U},
$$ {#eq-sector}
so with the radius fixed by slits, scanning $B$ brings ions of successive $m/z$ to the detector. For $m/z$ 100 accelerated through $8\ \mathrm{kV}$ on a $0.30\ \mathrm{m}$ radius the field is $0.43\ \mathrm{T}$. Combined with an electrostatic sector that focuses ions of slightly different energies (*double focusing*), magnetic sectors reach $R \approx 10^{4}$–$10^{5}$ and were for decades the instruments of exact-mass measurement.

**The quadrupole.** Four parallel rods carry a combination of a constant voltage and a radiofrequency voltage. For given voltages only ions in a narrow $m/z$ window have stable trajectories through the rods (the stability conditions are solutions of the Mathieu equation); all others spiral into the rods. Scanning the voltages at a fixed ratio sweeps the window across the mass range. Quadrupoles are compact, fast and cheap, with unit resolution ($R$ of order $10^{3}$ at $m/z$ 1000), and are the standard detector for gas chromatography and for quantitative triple-quadrupole work.

**The time-of-flight analyser.** All ions are given the same kinetic energy and allowed to drift down a field-free tube; the light ones arrive first.

::: proposition Flight time and resolving power of a TOF analyser {#prop-tof}
An ion of mass $m$ and charge $ze$ accelerated from rest through potential difference $U$ and then drifting a distance $L$ in a field-free region arrives after
$$
t = L\sqrt{\frac{m}{2zeU}}, \qquad\text{so}\qquad \frac{m}{z} = \frac{2eU}{L^{2}}\,t^{2},
$$ {#eq-tof}
and the mass resolving power is related to the time resolution by
$$
R = \frac{m}{\Delta m} = \frac{t}{2\,\Delta t}.
$$ {#eq-tof-r}
The result assumes all ions start from the same place with negligible initial kinetic energy; real instruments correct for the spread of starting energies with delayed extraction and an ion mirror (reflectron).
:::

::: proof
Energy conservation gives $\tfrac12 mv^{2} = zeU$, so $v = \sqrt{2zeU/m}$, and the drift time is $t = L/v = L\sqrt{m/2zeU}$ (the short time spent in the acceleration region is neglected or absorbed into a calibration constant). Squaring, $m/z = (2eU/L^{2})\,t^{2}$. Differentiating $m \propto t^{2}$ gives $\mathrm{d}m/m = 2\,\mathrm{d}t/t$; identifying the peak widths $\Delta m$ and $\Delta t$ with these differentials, $m/\Delta m = t/2\Delta t$.
:::

A TOF analyser has, in principle, no upper mass limit — every ion eventually arrives — and it records a complete spectrum for every pulse, thousands of times per second. Modern reflectron instruments reach $R$ of a few $10^{4}$.

**Fourier-transform analysers.** In a **Fourier-transform ion cyclotron resonance** (FT-ICR) cell, ions in a strong superconducting magnet circle at the cyclotron frequency $f_\mathrm{c} = zeB/2\pi m$, independent of their speed. A radiofrequency pulse sets ions of all $m/z$ circling coherently; their image current on detection plates is recorded as a decaying signal and Fourier-transformed into a frequency spectrum and hence an $m/z$ spectrum — exactly the transient-to-spectrum step of pulsed NMR in [[spectroscopy/nmr-principles]]. In the **Orbitrap** (Alexander Makarov, 2000) ions orbit a spindle-shaped central electrode inside a barrel-shaped outer one and oscillate along its axis with frequency $\omega = \sqrt{kz/m}$ ($k$ a field constant), again detected as an image current and Fourier-transformed. Because frequencies can be measured very precisely over long transients, these instruments reach $R$ of $10^{5}$ to beyond $10^{6}$ with errors below $1$–$2\ \mathrm{ppm}$.

::: example Flight times in a linear TOF {#ex-tof}
Singly charged ions are accelerated through $20.0\ \mathrm{kV}$ and drift $1.50\ \mathrm{m}$. Find the flight times of ions of $m/z$ 100 and 500, the time separation of $m/z$ 500 and 501, and the resolving power if the peaks are $5.0\ \mathrm{ns}$ wide (FWHM).
::: solution
With $m = (m/z)\times 1.660\,539\times10^{-27}\ \mathrm{kg}$ and $e = 1.602\,177\times10^{-19}\ \mathrm{C}$ (CODATA), equation [[#eq-tof]] gives for $m/z$ 500
$$
t = 1.50\ \mathrm{m} \times \sqrt{\frac{500 \times 1.660\,539\times10^{-27}\ \mathrm{kg}}{2 \times 1.602\,177\times10^{-19}\ \mathrm{C} \times 2.00\times10^{4}\ \mathrm{V}}} = 17.07\ \mathrm{\mu s},
$$
and for $m/z$ 100, $t = 17.07/\sqrt{5} = 7.64\ \mathrm{\mu s}$. For $m/z$ 501 the time is $17.09\ \mathrm{\mu s}$: the two arrive only $17.1\ \mathrm{ns}$ apart, because $t \propto \sqrt{m}$ compresses high masses together ($\Delta t \approx t\,\Delta m/2m$). With $5.0\ \mathrm{ns}$ peaks, equation [[#eq-tof-r]] gives
$$
R = \frac{17.07\ \mathrm{\mu s}}{2 \times 0.0050\ \mathrm{\mu s}} = 1.7\times10^{3},
$$
enough for unit resolution at $m/z$ 500 but not for exact masses. The detector electronics must time arrivals to nanoseconds — which is why TOF instruments became practical only with fast digitisers.
:::
:::

## Isotope patterns

Look closely at any mass spectrum and every peak has company: smaller peaks one, two and more units higher. They are not fragments. They are the same ion containing one or more heavier isotopes — $^{13}\mathrm{C}$ in place of $^{12}\mathrm{C}$, $^{37}\mathrm{Cl}$ in place of $^{35}\mathrm{Cl}$ — and their intensities follow from probability theory alone.

::: proposition Binomial isotope patterns {#prop-isotope}
Suppose an ion contains $n$ atoms of an element with two isotopes, the heavier (two units heavier for Cl, Br; one unit for C) with fractional abundance $p$, and that isotopes are distributed independently of position. The probability that exactly $k$ of the $n$ atoms are the heavy isotope is
$$
P(k) = \binom{n}{k}p^{k}(1-p)^{n-k}, \qquad k = 0, 1, \ldots, n,
$$ {#eq-binomial}
so the intensity ratio of the first two peaks of the cluster is $P(1)/P(0) = np/(1-p)$. For several elements the cluster is the convolution of the individual patterns (a multinomial distribution). In particular:

- carbon: $\mathrm{M+1}$ relative to $\mathrm{M}$ is $n_\mathrm{C} \times 1.08\,\%$, the "$1.1\,\%$ per carbon" rule;
- one chlorine gives $\mathrm{M} : \mathrm{M+2} = 100 : 32$ (about $3 : 1$), one bromine $100 : 97$ (about $1 : 1$);
- one sulfur adds about $4.5\,\%$ at $\mathrm{M+2}$ (from $^{34}\mathrm{S}$) and $0.8\,\%$ at $\mathrm{M+1}$.
:::

::: proof
Each of the $n$ atoms is independently heavy with probability $p$ and light with probability $1 - p$; a particular arrangement with $k$ heavy atoms therefore has probability $p^{k}(1-p)^{n-k}$, and there are $\binom{n}{k}$ ways to choose which $k$ atoms are heavy, giving equation [[#eq-binomial]]. The ratio $P(1)/P(0) = n p (1-p)^{n-1}/(1-p)^{n} = np/(1-p)$. With CIAAW abundances: carbon, $p = 0.0107$, gives $p/(1-p) = 0.0108$ per atom; chlorine, $p = 0.2424$, gives $0.2424/0.7576 = 0.320$; bromine, $p = 0.4931$, gives $0.4931/0.5069 = 0.973$; sulfur gives $0.0425/0.9499 = 0.0447$ at $\mathrm{M+2}$. When an ion contains two independent elements, the probability of a total mass increment is the sum over all ways of splitting it between the two — the convolution — which is the multinomial distribution.
:::

For two halogen atoms the binomial expansion gives the familiar clusters. Two chlorines: $(0.7576 + 0.2424)^{2}$ expands to $\mathrm{M} : \mathrm{M+2} : \mathrm{M+4} = 100 : 64 : 10$, about $9 : 6 : 1$. Two bromines: $51 : 100 : 49$, about $1 : 2 : 1$. One chlorine and one bromine: $(0.7576 + 0.2424)(0.5069 + 0.4931)$ gives $77 : 100 : 24$, about $3 : 4 : 1$. Three chlorines: $100 : 96 : 31 : 3$. These clusters are so distinctive that a glance identifies the halogen count.

::: widget distribution
dist: binomial
params: n=2, p=0.2424
caption: The chlorine isotope cluster as a binomial distribution: the bar at $k$ is the probability that $k$ of the $n$ chlorine atoms are $^{37}\mathrm{Cl}$, i.e. the relative height of the $\mathrm{M}+2k$ peak. With $n = 2$ and $p = 0.2424$ the bars stand in the ratio $100 : 64 : 10$. Change $n$ to 1, 3 or 4 to see the clusters of $\mathrm{CH_3Cl}$, $\mathrm{CHCl_3}$ and $\mathrm{CCl_4}$; set $p = 0.4931$ for bromine and watch the pattern become the symmetric $1 : 2 : 1$ of the binomial coefficients.
:::

Carbon behaves differently because $p$ is small and $n$ can be large. For a small molecule the $\mathrm{M+1}$ peak is a few per cent of $\mathrm{M}$ and the $\mathrm{M+2}$ contribution from two $^{13}\mathrm{C}$ atoms is tiny ($0.18\,\%$ for six carbons). But the mean number of $^{13}\mathrm{C}$ atoms is $np$, and for $n \approx 93$ it reaches one: beyond that, the all-$^{12}\mathrm{C}$ monoisotopic peak is no longer the tallest. For a protein with several hundred carbons the monoisotopic peak is a small shoulder on a broad envelope, and one reports the average mass instead.

::: widget distribution
dist: binomial
params: n=50, p=0.0107
caption: The $^{13}\mathrm{C}$ envelope: probability that $k$ of $n$ carbon atoms are $^{13}\mathrm{C}$, i.e. the relative heights of the $\mathrm{M}, \mathrm{M+1}, \mathrm{M+2}, \ldots$ peaks contributed by carbon. With $n = 50$ the $\mathrm{M+1}$ peak is already $54\,\%$ of $\mathrm{M}$. Increase $n$ beyond about 93 and $\mathrm{M+1}$ overtakes $\mathrm{M}$; for large molecules the distribution approaches a normal curve (switch on the normal approximation), which is why the isotope envelope of a protein looks like a smooth hump centred on the average mass.
:::

::: example Chlorobenzene and bromoethane {#ex-halogen-patterns}
Predict the molecular-ion clusters of chlorobenzene $\mathrm{C_6H_5Cl}$ and bromoethane $\mathrm{C_2H_5Br}$ in an EI spectrum: the $m/z$ of the monoisotopic peak and the relative heights of $\mathrm{M+1}$ and $\mathrm{M+2}$.
::: solution
Chlorobenzene: nominal mass $6(12) + 5(1) + 35 = 112$. The $\mathrm{M+1}$ peak comes mainly from carbon, $6 \times 1.08\,\% = 6.5\,\%$ (the five hydrogens add only $0.06\,\%$); the $\mathrm{M+2}$ peak comes from $^{37}\mathrm{Cl}$, $0.2424/0.7576 = 32.0\,\%$. So the spectrum shows $m/z$ 112 ($100$), 113 ($6.5$), 114 ($32$) and a small 115 (the $^{13}\mathrm{C}$ partner of 114, about $2\,\%$). The monoisotopic neutral mass is $6(12) + 5(1.007\,825) + 34.968\,853 = 112.0080\ \mathrm{u}$.

Bromoethane: nominal mass $24 + 5 + 79 = 108$. $\mathrm{M+1} = 2 \times 1.08\,\% = 2.2\,\%$, and $\mathrm{M+2}$ from $^{81}\mathrm{Br}$ is $97\,\%$ of $\mathrm{M}$: two almost equal peaks at $m/z$ 108 and 110, the bromine signature. Its base peak, however, is at $m/z$ 29, $\mathrm{C_2H_5^+}$, formed by loss of $\mathrm{Br^\bullet}$ — and that fragment, having lost the bromine, has *no* $\mathrm{M+2}$ partner. Following which peaks keep the halogen cluster and which lose it tells you which fragments contain the halogen.
:::
:::

## What the molecular ion tells you

Once the molecular ion is identified, two simple counting rules extract structural information from its mass before any fragment is examined.

::: proposition The nitrogen rule and rings plus double bonds {#prop-nitrogen-rule}
For a compound containing only C, H, N, O, S, P, Si and the halogens:

1. **Nitrogen rule.** The nominal molecular mass is odd if and only if the molecule contains an odd number of nitrogen atoms.
2. **Rings plus double bonds.** For a formula $\mathrm{C}_c\mathrm{H}_h\mathrm{N}_n\mathrm{O}_o\mathrm{X}_x$ (X = halogen), the number of rings plus $\pi$ bonds is
$$
\mathrm{RDB} = c - \frac{h + x}{2} + \frac{n}{2} + 1,
$$ {#eq-rdb}
the degree of unsaturation of [[organic-1/organic-structures]]; oxygen and sulfur (in their divalent states) do not appear. For an ion, an integer RDB means an odd-electron ion ($\mathrm{M^{+\bullet}}$), and a half-integer value an even-electron ion ($[\mathrm{M+H}]^+$, fragment cations): add $\tfrac12$ to recover the RDB of the neutral molecule from $[\mathrm{M+H}]^+$.

Both rules assume normal valences (C 4, N 3, O 2, H and halogens 1); they fail for ions with unusual valence or for quaternary ammonium salts.
:::

::: proof
**Nitrogen rule.** Among the common elements, those with even nominal mass have even valence ($^{12}\mathrm{C}$: 4, $^{16}\mathrm{O}$: 2, $^{32}\mathrm{S}$: 2, $^{28}\mathrm{Si}$: 4) and those with odd nominal mass have odd valence ($^{1}\mathrm{H}$, $^{19}\mathrm{F}$, $^{35}\mathrm{Cl}$, $^{79}\mathrm{Br}$, $^{127}\mathrm{I}$: 1; $^{31}\mathrm{P}$: 3) — with nitrogen the single exception, mass 14 but valence 3. In a closed-shell molecule the sum of all valences is even (each bond uses two valences), so the number of odd-valence atoms is even. If no N is present, odd-valence atoms are exactly odd-mass atoms, an even number of them, so the total mass is even. Each N atom contributes even mass but odd valence, so it changes the count of odd-valence atoms by one without changing the mass parity; an odd number of N forces an odd number of odd-mass atoms and hence odd total mass.

**RDB.** A saturated acyclic molecule of $c$ carbons has $2c + 2$ hydrogens; each monovalent substituent X takes a hydrogen's place; each nitrogen (trivalent) in the chain adds one extra hydrogen; divalent O and S insert into a chain without changing the hydrogen count. Each ring or $\pi$ bond removes two hydrogens. Hence $2\,\mathrm{RDB} = (2c + 2 + n) - (h + x)$, which rearranges to equation [[#eq-rdb]]. Protonation adds one hydrogen and no bond, lowering the formula value by $\tfrac12$.
:::

The two rules immediately constrain an unknown. A molecular ion at $m/z$ 135 must contain an odd number of nitrogen atoms; an ion at $m/z$ 136 contains none or an even number. A formula with $\mathrm{RDB} \ge 4$ invites a benzene ring (three $\pi$ bonds and one ring). And a computed RDB that is negative or has the wrong integer/half-integer character for the ion type rules a candidate formula out at once, as the next section shows.

::: quiz Reading a halogen cluster
An EI spectrum shows a molecular-ion cluster at $m/z$ 84, 86 and 88 with relative intensities $100 : 64 : 10$, and the $\mathrm{M+1}$ peak at 85 is about $1\,\%$ of $m/z$ 84. Which molecule is it?
- [ ] Bromomethane, $\mathrm{CH_3Br}$
- [x] Dichloromethane, $\mathrm{CH_2Cl_2}$
- [ ] Chlorocyclopentane, $\mathrm{C_5H_9Cl}$
- [ ] Dibromomethane, $\mathrm{CH_2Br_2}$
::: solution
A three-peak cluster spaced by two units in the ratio $100 : 64 : 10$ ($9 : 6 : 1$) is the signature of two chlorine atoms; the small $\mathrm{M+1}$ ($1.1\,\%$) means one carbon. $\mathrm{CH_2Cl_2}$ has nominal mass $12 + 2 + 70 = 84$. Bromomethane would show two equal peaks at 94 and 96; dibromomethane a $1 : 2 : 1$ cluster at 172, 174, 176; chlorocyclopentane ($m/z$ 104) a $3 : 1$ pair with a $5.4\,\%$ $\mathrm{M+1}$.
:::
:::

## Molecular formulae from exact masses

At unit resolution, $\mathrm{CO}$, $\mathrm{N_2}$ and $\mathrm{C_2H_4}$ are the same ion. At high resolution each formula has its own exact mass, and a measurement good to a few ppm narrows the candidates for a small molecule to one or a handful. This is now the standard way of establishing a molecular formula: journals accept a high-resolution mass within $5\ \mathrm{ppm}$ (better, on modern instruments) in place of a combustion analysis.

One subtlety is easily forgotten. The spectrometer measures the mass of the *ion*. A cation formed by removing an electron is lighter than the neutral molecule by $m_\mathrm{e} = 0.000\,549\ \mathrm{u}$; a protonated molecule $[\mathrm{M+H}]^+$ is heavier than $\mathrm{M}$ by the mass of a proton, $1.007\,276\ \mathrm{u}$, not that of a hydrogen atom, $1.007\,825\ \mathrm{u}$. At $m/z$ 200 the electron is $2.7\ \mathrm{ppm}$ — comparable to the measurement error of a good instrument, and therefore not negligible.

::: algorithm Assigning a molecular formula from an accurate mass {#alg-formula}
1. Decide what ion was measured ($\mathrm{M^{+\bullet}}$ from EI; $[\mathrm{M+H}]^+$, $[\mathrm{M+Na}]^+$ or $[\mathrm{M-H}]^-$ from ESI) from the ionisation method and any adduct spacings.
2. Choose the elements allowed (C, H, N, O are typical; add S, P, halogens if the isotope pattern or the chemistry suggests them) and an error window appropriate to the instrument (e.g. $\pm 5\ \mathrm{ppm}$).
3. Enumerate all formulae whose *ion* mass — the sum of isotopic masses, minus $m_\mathrm{e}$ for each positive charge (plus $m_\mathrm{e}$ for each negative charge) — lies within the window.
4. Reject candidates with negative RDB, or whose RDB has the wrong character for the ion (integer for odd-electron, half-integer for even-electron ions), or which break the nitrogen rule for the ion type.
5. Compare the predicted isotope pattern ($\mathrm{M+1}$, $\mathrm{M+2}$) with the observed one; this often decides between survivors.
6. Accept the formula only if it is also consistent with NMR (hydrogen and carbon counts) and the chemistry of the sample.
:::

::: example An ESI ion at m/z 195.0880 {#ex-hrms-caffeine}
A white solid extracted from tea leaves gives, by positive-mode ESI on an Orbitrap, an intense ion at $m/z$ 195.0880 with an $\mathrm{M+1}$ peak $10\,\%$ of its height. Find its molecular formula, allowing C, H, N and O and a $\pm 5\ \mathrm{ppm}$ window.
::: solution
Step 1: ESI gives $[\mathrm{M+H}]^+$, an even-electron cation of nominal mass 195; the neutral then has $M = 194$, even, so it contains zero or an even number of nitrogens (the nitrogen rule for $[\mathrm{M+H}]^+$ is inverted: an odd $m/z$ means an even N count).

Step 3: a search of all $\mathrm{C}_c\mathrm{H}_h\mathrm{N}_n\mathrm{O}_o$ cations with $c \le 15$, $n, o \le 6$ within $\pm 10\ \mathrm{ppm}$ finds exactly three:

| ion formula | ion mass / u | error / ppm | RDB |
|---|---|---|---|
| $\mathrm{C_8H_{11}N_4O_2^+}$ | $195.087\,65$ | $+1.8$ | $5.5$ |
| $\mathrm{C_{10}H_{13}NO_3^+}$ | $195.088\,99$ | $-5.1$ | $5.0$ |
| $\mathrm{C_7H_{15}O_6^+}$ | $195.086\,31$ | $+8.6$ | $0.5$ |

For the first, the ion mass is $8(12) + 11(1.007\,825) + 4(14.003\,074) + 2(15.994\,915) - 0.000\,549 = 195.087\,65\ \mathrm{u}$, and the error $(195.0880 - 195.087\,65)/195.087\,65 = +1.8\ \mathrm{ppm}$.

Step 4: only the first lies inside $\pm 5\ \mathrm{ppm}$. The second is also excluded chemically: its RDB is an integer, so it would be an odd-electron radical cation, not a protonated molecule, and it has one nitrogen, breaking the nitrogen rule for $[\mathrm{M+H}]^+$ at odd $m/z$. Step 5: $\mathrm{C_8H_{11}N_4O_2^+}$ predicts $\mathrm{M+1}$ of $10.3\,\%$ ($8 \times 1.08\,\%$ for C, $4 \times 0.37\,\%$ for N, plus small H and O terms), matching the observation. The neutral is $\mathrm{C_8H_{10}N_4O_2}$ with $\mathrm{RDB} = 5.5 + 0.5 = 6$ — caffeine, whose purine skeleton has two rings and four double bonds.
:::
:::

::: example The electron matters {#ex-electron-mass}
An EI spectrum measured at high resolution shows a peak at $m/z$ 28.0307. Which of $\mathrm{CO^{+\bullet}}$, $\mathrm{N_2^{+\bullet}}$ and $\mathrm{C_2H_4^{+\bullet}}$ is it, and what error results if the electron mass is forgotten?
::: solution
The ion masses are the neutral masses of [[#ex-mass-28]] minus $0.000\,549\ \mathrm{u}$: $\mathrm{CO^{+\bullet}}$ $27.994\,366$, $\mathrm{N_2^{+\bullet}}$ $28.005\,599$, $\mathrm{C_2H_4^{+\bullet}}$ $28.030\,752$. Only ethene is close: the error is $(28.0307 - 28.030\,752)/28.030\,752 = -1.8\ \mathrm{ppm}$. Using the neutral mass $28.031\,300$ instead gives $-21\ \mathrm{ppm}$ — an apparently poor measurement that would fail a $5\ \mathrm{ppm}$ criterion. The other two candidates miss by about $900$ and $1300\ \mathrm{ppm}$ and are excluded either way. Forgetting the electron always shifts the error by $m_\mathrm{e}/m$, $19.6\ \mathrm{ppm}$ here and $2.7\ \mathrm{ppm}$ at $m/z$ 200.
:::
:::

## Multiply charged ions and charge-state deconvolution

An ESI spectrum of a protein does not show one peak but a whole series — a bell-shaped envelope of peaks, each a different number of protons on the same molecule. For a molecule of mass $M$ carrying $z$ protons,
$$
\left(\frac{m}{z}\right)_z = \frac{M + z\,m_\mathrm{p}}{z},
$$ {#eq-esi}
with $m_\mathrm{p} = 1.007\,28\ \mathrm{u}$. Successive peaks differ by one proton and one charge. If two adjacent peaks appear at $m_1$ (charge $z$) and $m_2 < m_1$ (charge $z + 1$), then $z m_1 - z m_\mathrm{p} = (z+1)(m_2 - m_\mathrm{p})$, which solves to
$$
z = \frac{m_2 - m_\mathrm{p}}{m_1 - m_2}, \qquad M = z\,(m_1 - m_\mathrm{p}).
$$ {#eq-deconv}
Every pair of neighbours gives an independent estimate of $M$, and averaging over the series — **deconvolution**, done by software for real spectra — gives the mass of a $20\ \mathrm{kDa}$ protein to about $1\ \mathrm{Da}$. On a high-resolution instrument there is a second route: the isotope peaks within one charge state are spaced by $1/z$ in $m/z$, so their spacing reads $z$ directly.

::: widget plot
f: (m + x*1.00728)/x
x: 8, 30
sliders: m=16951.5:2000:60000:0.5
labels: m/z \text{ of } [\mathrm{M}+z\mathrm{H}]^{z+}
caption: Position of the ESI peak $[\mathrm{M}+z\mathrm{H}]^{z+}$ against the charge $z$ (horizontal axis) for a molecule of mass $M$ set by the slider (default $16\,951.5\ \mathrm{Da}$, the average mass of horse-heart apomyoglobin). Only integer $z$ give real peaks. The curve shows why multiple charging is so useful — a protein of $60\ \mathrm{kDa}$ still appears below $m/z$ 3000 once it carries 20 or more protons — and why adjacent peaks crowd together at high charge, where the spacing $(m/z)_z - (m/z)_{z+1} \approx M/z^{2}$ shrinks.
:::

::: example Deconvolving a protein spectrum {#ex-esi-protein}
The ESI spectrum of a small protein shows a series of peaks including two neighbours at $m/z$ 998.15 and 942.76. Find the charge states and the protein's mass.
::: solution
Take $m_1 = 998.15$ and $m_2 = 942.76$. Equation [[#eq-deconv]]:
$$
z = \frac{942.76 - 1.007}{998.15 - 942.76} = \frac{941.75}{55.39} = 17.00,
$$
so the peak at 998.15 is $[\mathrm{M+17H}]^{17+}$ and the one at 942.76 is $[\mathrm{M+18H}]^{18+}$. The charge must be an integer, and getting $17.00$ is itself a check on the assignment. Then
$$
M = 17 \times (998.15 - 1.007) = 16\,951.4\ \mathrm{Da},
$$
and from the other peak $18 \times (942.76 - 1.007) = 16\,951.6\ \mathrm{Da}$; the mean, $16\,951.5\ \mathrm{Da}$, agrees with the average mass of horse-heart apomyoglobin (the protein without its haem). Because the isotope envelope of a molecule with about 770 carbon atoms is broad, this is an *average* mass, not a monoisotopic one. The peptide and protein chemistry behind such measurements is in [[biochemistry/amino-acids-proteins]].
:::
:::

## Why ions break: fragmentation

A molecular ion formed by EI carries several electronvolts of internal energy and falls apart along the pathways that produce the most stable products fastest. Fragmentation is not random: in a radical cation the charge and the unpaired electron sit at a definite site (usually where the electron was removed — a heteroatom lone pair or a $\pi$ system), and cleavages start from that site. Two general principles govern which products dominate.

**Product stability (Stevenson's rule).** When a bond breaks in a radical cation, one fragment leaves as a neutral radical and the other keeps the charge; the charge stays preferentially with the fragment of lower ionisation energy. Stabilised cations — acylium $\mathrm{R{-}C{\equiv}O^+}$, oxonium and iminium ions, allylic, benzylic and tertiary carbocations, tropylium $\mathrm{C_7H_7^+}$ — therefore dominate spectra.

**The even-electron rule** (empirical). Odd-electron ions ($\mathrm{M^{+\bullet}}$) may lose either a radical or a neutral molecule, but even-electron ions (fragment cations, $[\mathrm{M+H}]^+$) usually lose only neutral closed-shell molecules — $\mathrm{H_2O}$, $\mathrm{CO}$, $\mathrm{C_2H_4}$ — because losing a radical would make a less stable odd-electron ion from a stable even-electron one.

::: definition Principal fragmentation reactions of radical cations {#def-fragmentation}
- **α-Cleavage** (radical-site initiated): the bond between the carbon bearing the heteroatom (or carbonyl carbon) and its neighbour breaks homolytically; one electron of the bond pairs with the unpaired electron on the heteroatom to form a new $\pi$ bond, and the neighbouring group leaves as a radical. For ketones this gives acylium ions $\mathrm{R{-}C{\equiv}O^+}$; for amines, iminium ions $\mathrm{R_2C{=}NR_2^+}$; for ethers and alcohols, oxonium ions. The larger alkyl radical is usually lost preferentially.
- **Inductive cleavage** (charge-site initiated, heterolytic): an electronegative atom pulls the bonding pair of an adjacent bond towards itself, so the bond breaks with the charge moving to the alkyl fragment — for example $\mathrm{C_2H_5Br^{+\bullet}} \rightarrow \mathrm{C_2H_5^+} + \mathrm{Br^\bullet}$.
- **McLafferty rearrangement**: in a radical cation containing $\mathrm{C{=}O}$ (or $\mathrm{C{=}N}$, $\mathrm{C{=}C}$) with a hydrogen on the γ-carbon, the γ-hydrogen is transferred to the oxygen through a six-membered transition state, and the bond between the α- and β-carbons breaks, expelling an alkene and leaving an enol radical cation. The ion has *even* nominal mass for a nitrogen-free compound, a useful signature.
:::

The McLafferty rearrangement deserves a step-by-step description, since there is no curly-arrow figure yet. Consider the molecular ion of butanal, $\mathrm{CH_3CH_2CH_2CHO^{+\bullet}}$, with the radical and the charge on the carbonyl oxygen. The chain can coil so that the carbonyl oxygen sits next to a hydrogen on the γ-carbon (the terminal $\mathrm{CH_3}$). (1) The unpaired electron on oxygen pairs with one electron from the γ C–H bond, so that the hydrogen atom moves to oxygen and forms an O–H bond, leaving an unpaired electron on the γ-carbon. (2) That electron pairs with one electron of the α–β C–C bond, forming a new $\pi$ bond between the β- and γ-carbons. (3) The other electron of the α–β bond moves to the α-carbon and combines with the old $\mathrm{C{=}O}$ $\pi$ system to make the enol. The products are ethene ($\mathrm{CH_2{=}CH_2}$, the β- and γ-carbons, neutral, 28 u) and the enol radical cation $\mathrm{CH_2{=}CH{-}OH^{+\bullet}}$ at $m/z$ 44. Every aldehyde, ketone, ester and acid with a γ-hydrogen shows a McLafferty ion: $m/z$ 44 for aldehydes $\mathrm{RCH_2CH_2CH_2CHO}$, 58 for methyl ketones, 60 for carboxylic acids and 74 for methyl esters.

::: example Telling 2-pentanone from 3-pentanone {#ex-pentanones}
Pentan-2-one $\mathrm{CH_3COCH_2CH_2CH_3}$ and pentan-3-one $\mathrm{CH_3CH_2COCH_2CH_3}$ both have $\mathrm{M^{+\bullet}}$ at $m/z$ 86. Predict the principal fragments of each and say how the spectra distinguish them.
::: solution
Ionisation removes an oxygen lone-pair electron in both. **Pentan-2-one.** α-Cleavage can break either bond to the carbonyl carbon. Loss of the propyl radical ($43\ \mathrm{u}$) gives the acetyl cation $\mathrm{CH_3CO^+}$ at $m/z$ 43 (the base peak); loss of the methyl radical ($15\ \mathrm{u}$) gives $\mathrm{C_3H_7CO^+}$ at $m/z$ 71, less intense because the methyl radical is the less stable leaving group. The propyl chain has hydrogens on its γ-carbon (counting from the carbonyl: $\mathrm{C3} = \alpha$, $\mathrm{C4} = \beta$, $\mathrm{C5} = \gamma$), so the McLafferty rearrangement expels ethene and gives the enol radical cation $\mathrm{CH_2{=}C(OH)CH_3^{+\bullet}}$ at $m/z$ $86 - 28 = 58$.

**Pentan-3-one.** The molecule is symmetric, so both α-cleavages lose an ethyl radical ($29\ \mathrm{u}$) and give the propanoyl cation $\mathrm{C_2H_5CO^+}$ at $m/z$ 57 (base peak); the ethyl cation $\mathrm{C_2H_5^+}$ appears at $m/z$ 29 (from the competing charge distribution and loss of CO from 57). Each ethyl group has only α- and β-carbons, so there is **no γ-hydrogen and no McLafferty peak** at 58.

The diagnostic peaks are therefore 43, 71 and 58 for the 2-isomer against 57 and 29 for the 3-isomer — two isomers that are identical in mass are told apart in one glance.
:::
:::

Some ions appear so often that they are worth memorising. Alkylbenzenes give $m/z$ 91, $\mathrm{C_7H_7^+}$: benzylic cleavage first gives the benzyl cation, which rearranges to the seven-membered aromatic **tropylium** ion (six $\pi$ electrons, $4n + 2$ with $n = 1$), and this in turn loses ethyne to give $m/z$ 65. Aromatic compounds show $m/z$ 77 ($\mathrm{C_6H_5^+}$) and 51. Saturated hydrocarbon chains give clusters 14 units apart ($m/z$ 43, 57, 71, 85 …, the $\mathrm{C}_n\mathrm{H}_{2n+1}^+$ series), with branching points marked by enhanced cleavage to form secondary or tertiary cations.

Equally useful are the **neutral losses**, read as gaps between the molecular ion and the first fragments:

| loss / u | usual identity | suggests |
|---|---|---|
| 1 | $\mathrm{H^\bullet}$ | aldehydes, amines (M − 1) |
| 15 | $\mathrm{CH_3^\bullet}$ | methyl group, often α to a heteroatom |
| 18 | $\mathrm{H_2O}$ | alcohols, some acids and aldehydes |
| 28 | $\mathrm{CO}$ or $\mathrm{C_2H_4}$ | phenols, quinones, acylium ions; McLafferty, ethyl esters |
| 29 | $\mathrm{C_2H_5^\bullet}$ or $\mathrm{CHO^\bullet}$ | ethyl group; aldehydes |
| 31 | $\mathrm{CH_3O^\bullet}$ | methyl esters, methyl ethers |
| 35 / 36 | $\mathrm{Cl^\bullet}$ / $\mathrm{HCl}$ | chlorides (check the isotope cluster) |
| 42 | $\mathrm{CH_2{=}C{=}O}$ | acetates, acetamides |
| 44 | $\mathrm{CO_2}$ | carboxylic acids, esters, anhydrides |
| 45 | $\mathrm{C_2H_5O^\bullet}$ or $\mathrm{CO_2H^\bullet}$ | ethyl esters, carboxylic acids |

::: warning Fragment rules are rules of thumb {#warn-fragmentation}
α-Cleavage, McLafferty and the even-electron rule are empirical tendencies, not laws: hydrogen rearrangements, ring expansions (benzyl to tropylium) and skeletal scrambling are common, and the intensity of a given fragment depends on the instrument and the internal-energy distribution. Do not try to "prove" a structure from fragments alone, and never assume a fragment's structure from its mass — $m/z$ 43 may be $\mathrm{CH_3CO^+}$ or $\mathrm{C_3H_7^+}$, distinguishable only by exact mass ($43.0178$ against $43.0542$). Use fragments to test a structure proposed from the formula, NMR and infrared, and use library matching for EI spectra of known compounds.
:::

## Tandem mass spectrometry

Soft ionisation gives intact ions but few fragments — which is good for the formula and bad for structure. **Tandem mass spectrometry** (MS/MS) recovers the structure: a first analyser selects a single precursor ion (say $[\mathrm{M+H}]^+$), the ion is activated — usually by collisions with argon or nitrogen in a collision cell (**collision-induced dissociation**, CID) — and a second analyser records its product ions. Because every product comes from the chosen precursor, the spectrum is free of interference from other compounds. Triple quadrupoles (quadrupole – collision cell – quadrupole) set to watch one precursor → product transition are the most sensitive and selective quantitative instruments known, used for drug metabolites, pesticide residues and clinical analytes at picogram levels. Quadrupole–TOF and quadrupole–Orbitrap hybrids record product ions at high resolution, and in proteomics the fragmentation of protonated peptides along the backbone amide bonds gives series of ions (named b and y ions) whose mass differences spell out the amino-acid sequence.

**Safety.** Mass spectrometers combine high vacuum, high voltages (kilovolts on ESI capillaries and acceleration stages), superconducting magnets (FT-ICR: strong fringe fields, a hazard to people with pacemakers and to loose ferromagnetic objects) and, in MALDI, ultraviolet lasers. ESI sources nebulise flammable organic solvents, and exhausts must be vented. These hazards are managed by interlocks and training; work on any instrument needs local induction and a risk assessment, and the samples themselves are handled according to their own hazard classification.

## Where this leads

The molecular formula from an accurate mass, the halogen and sulfur count from the isotope cluster, and the functional groups suggested by fragmentation are the opening moves of every structure determination. [[spectroscopy/vibrational-spectroscopy]] identifies the functional groups, [[spectroscopy/nmr-structure]] supplies the hydrogen and carbon framework, and [[spectroscopy/structure-problems]] puts the three methods together on real unknowns. In analytical practice the spectrometer is almost always coupled to a separation: gas chromatography with EI, liquid chromatography with ESI, both treated in [[analytical-chemistry/chromatography]] and [[analytical-chemistry/hyphenated-methods]]. The Fourier-transform analysers share their mathematics — a decaying transient turned into a spectrum — with pulsed NMR in [[spectroscopy/nmr-principles]], and the radical cations that EI makes are the same open-shell species that [[spectroscopy/epr]] detects directly.

::: history
J. J. Thomson separated positive rays by their mass-to-charge ratio in electric and magnetic fields and in 1913 found that neon gave two parabolas, at masses 20 and 22 — the first evidence of stable isotopes. Arthur Dempster built a magnetic-sector instrument with electron-impact ionisation in 1918, and Francis Aston's mass spectrograph (1919) revealed isotopes of many elements and the departures of their masses from whole numbers, earning him the 1922 Nobel Prize in Chemistry. Wolfgang Paul and Helmut Steinwedel described the quadrupole mass filter in 1953 (Paul shared the 1989 Nobel Prize in Physics); William Wiley and Ian McLaren published the two-stage time-of-flight design in 1955; Fred McLafferty described the rearrangement that bears his name in the late 1950s; Burnaby Munson and Frank Field introduced chemical ionisation in 1966; and Melvin Comisarow and Alan Marshall demonstrated Fourier-transform ion cyclotron resonance in 1974. Soft ionisation of large molecules arrived in the late 1980s — electrospray of proteins by John Fenn's group and laser desorption by Koichi Tanaka, who shared the 2002 Nobel Prize in Chemistry, and MALDI by Michael Karas and Franz Hillenkamp (1985–1988) — and Alexander Makarov's Orbitrap was published in 2000.
:::

::: summary
- A mass spectrometer ionises, sorts ions by $m/z$ and counts them; nominal, monoisotopic and average masses are different numbers, and resolving power $R = m/\Delta m$ decides whether neighbouring ions are separated ($\mathrm{CO}/\mathrm{N_2}$ needs $R \approx 2500$).
- EI at $70\ \mathrm{eV}$ makes radical cations $\mathrm{M^{+\bullet}}$ and reproducible fragment patterns; CI, ESI and MALDI are soft, making $[\mathrm{M+H}]^+$ and, in ESI, multiply charged ions $[\mathrm{M}+z\mathrm{H}]^{z+}$.
- Analysers convert $m/z$ into position (magnetic sector), stability (quadrupole), time ($t = L\sqrt{m/2zeU}$, $R = t/2\Delta t$) or frequency (FT-ICR, Orbitrap; $R$ up to $10^{6}$).
- Isotope clusters are binomial: $\mathrm{M+1} \approx 1.1\,\%$ per carbon, $\mathrm{Cl}$ $3:1$, $\mathrm{Br}$ $1:1$, $\mathrm{Cl_2}$ $9:6:1$, $\mathrm{Br_2}$ $1:2:1$, $\mathrm{ClBr}$ $3:4:1$, S $4.5\,\%$ at $\mathrm{M+2}$.
- The nitrogen rule (odd mass ⇔ odd number of N) and $\mathrm{RDB} = c - (h+x)/2 + n/2 + 1$ constrain the formula; integer RDB marks odd-electron ions.
- Exact masses within a few ppm fix molecular formulae; use ion masses (subtract $m_\mathrm{e}$ for cations, add $m_\mathrm{p}$ for protonation), then filter by RDB, nitrogen rule and isotope pattern.
- ESI charge series deconvolve as $z = (m_2 - m_\mathrm{p})/(m_1 - m_2)$, $M = z(m_1 - m_\mathrm{p})$.
- Fragmentation favours stable ions: α-cleavage to acylium, iminium and oxonium ions, inductive cleavage, the McLafferty rearrangement (γ-H; $m/z$ 44, 58, 60, 74), tropylium $m/z$ 91, and the even-electron rule; MS/MS isolates a precursor and fragments it on purpose.
:::

## Exercises

::: exercise Rings plus double bonds of caffeine {level=1 check="6"}
Calculate the number of rings plus double bonds in caffeine, $\mathrm{C_8H_{10}N_4O_2}$. (Enter the RDB.)
::: solution
Equation [[#eq-rdb]]: $\mathrm{RDB} = 8 - 10/2 + 4/2 + 1 = 8 - 5 + 2 + 1 = 6$. Caffeine has two fused rings (the purine skeleton) and four double bonds (two $\mathrm{C{=}O}$, one $\mathrm{C{=}C}$, one $\mathrm{C{=}N}$). The integer value is right for a neutral closed-shell molecule; its $[\mathrm{M+H}]^+$ ion gives $5.5$, as in [[#ex-hrms-caffeine]].
:::
:::

::: exercise A monoisotopic mass {level=1 check="46.0419"}
Calculate the monoisotopic mass of neutral ethanol, $\mathrm{C_2H_6O}$, using the AME2020 isotopic masses quoted in the lesson. (Enter it in u to four decimal places.)
::: solution
$m = 2(12.000\,000) + 6(1.007\,825\,03) + 15.994\,914\,62 = 24 + 6.046\,950 + 15.994\,915 = 46.041\,865\ \mathrm{u}$, i.e. $46.0419\ \mathrm{u}$. Its average (molar) mass is $46.07\ \mathrm{g\,mol^{-1}}$: the difference comes from the heavy isotopes included in the average, and it is the monoisotopic value that a high-resolution spectrum measures. The EI molecular ion $\mathrm{C_2H_6O^{+\bullet}}$ is $0.000\,549\ \mathrm{u}$ lighter.
:::
:::

::: exercise The dibromomethane cluster {level=1 check="1.95"}
Using the CIAAW abundance of $^{81}\mathrm{Br}$ ($49.31\,\%$), calculate the ratio of the $\mathrm{M+2}$ to the $\mathrm{M}$ peak for $\mathrm{CH_2Br_2}$, ignoring carbon and hydrogen isotopes. (Enter the ratio to three significant figures.)
::: solution
With $n = 2$, $p = 0.4931$ in equation [[#eq-binomial]], $P(1)/P(0) = 2p/(1-p) = 2 \times 0.4931/0.5069 = 1.945$, i.e. $1.95$. The full cluster is $P(0) : P(1) : P(2) = 0.257 : 0.500 : 0.243$, so the $\mathrm{M+2}$ peak ($m/z$ 174) is the tallest, flanked by $m/z$ 172 and 176 of nearly equal height — the $1 : 2 : 1$ signature of two bromines.
:::
:::

::: exercise A mass error {level=2 check="2.4"}
The EI molecular ion of chlorobenzene ($^{12}\mathrm{C_6}{}^{1}\mathrm{H_5}{}^{35}\mathrm{Cl}^{+\bullet}$) is measured at $m/z$ 112.0077. Calculate the mass error, correctly allowing for the electron. (Enter it in ppm to one decimal place, with its sign.)
::: solution
Neutral monoisotopic mass: $6(12) + 5(1.007\,825\,03) + 34.968\,852\,7 = 112.007\,978\ \mathrm{u}$; ion mass $112.007\,978 - 0.000\,549 = 112.007\,429\ \mathrm{u}$. Error $= (112.0077 - 112.007\,429)/112.007\,429 \times 10^{6} = +2.4\ \mathrm{ppm}$. Without the electron correction the error would appear as $-2.5\ \mathrm{ppm}$: here both would pass a $5\ \mathrm{ppm}$ test, but the sign and size of systematic errors are only meaningful with the correction.
:::
:::

::: exercise The M+1 peak of decane {level=2 check="11.1"}
Calculate the height of the $\mathrm{M+1}$ peak of decane, $\mathrm{C_{10}H_{22}}$, as a percentage of $\mathrm{M}$, including both $^{13}\mathrm{C}$ ($1.07\,\%$) and $^{2}\mathrm{H}$ ($0.0115\,\%$). (Enter the percentage to three significant figures.)
::: solution
To first order the contributions add: carbon $10 \times 0.0107/0.9893 = 0.1082$ and hydrogen $22 \times 0.000\,115/0.999\,885 = 0.002\,53$, total $0.1107$, i.e. $11.1\,\%$. Reversing the argument estimates the carbon count of an unknown: $\mathrm{M+1}/\mathrm{M} \div 1.1\,\%$, here $\approx 10$. The estimate is only as good as the intensity measurement, and it fails if the $\mathrm{M+1}$ peak is enhanced by $[\mathrm{M+H}]^+$ formed by self-protonation in the source.
:::
:::

::: exercise Reading a charge state {level=2 check="20"}
Two adjacent peaks in the ESI spectrum of a protein appear at $m/z$ 893.19 and 848.58. What is the charge of the ion at $m/z$ 848.58? (Enter $z$.)
::: hint
The lower-$m/z$ peak of a pair carries one more proton than the higher one; use equation [[#eq-deconv]].
:::
::: solution
With $m_1 = 893.19$, $m_2 = 848.58$, the charge of the higher-$m/z$ peak is $z = (848.58 - 1.007)/(893.19 - 848.58) = 847.57/44.61 = 19.00$, so 893.19 is $[\mathrm{M+19H}]^{19+}$ and 848.58 is $[\mathrm{M+20H}]^{20+}$: the answer is $z = 20$. The mass is $19 \times (893.19 - 1.007) = 16\,951.5\ \mathrm{Da}$ — the same apomyoglobin as in [[#ex-esi-protein]], seen in two further charge states.
:::
:::

::: exercise Time resolution in a TOF {level=3 check="17.1"}
In the TOF analyser of [[#ex-tof]] ($U = 20.0\ \mathrm{kV}$, $L = 1.50\ \mathrm{m}$), how far apart in time do singly charged ions of $m/z$ 500 and 501 arrive? (Enter $\Delta t$ in ns to three significant figures.) What peak width would be needed to resolve $m/z$ 5000 from 5001?
::: solution
$t(500) = 17.073\ \mathrm{\mu s}$ and $t(501) = 17.090\ \mathrm{\mu s}$ from equation [[#eq-tof]], so $\Delta t = 0.0171\ \mathrm{\mu s} = 17.1\ \mathrm{ns}$ (equivalently $\Delta t \approx t\,\Delta m/2m = 17.07\ \mathrm{\mu s}/1000$). At $m/z$ 5000, $t = 17.073\sqrt{10} = 54.0\ \mathrm{\mu s}$ and $\Delta t = t/(2 \times 5000) = 5.4\ \mathrm{ns}$, so the peaks must be narrower than about $5\ \mathrm{ns}$ — only achievable with a reflectron to correct the spread of initial ion energies, and the reason linear TOF instruments give broad peaks for large ions.
:::
:::

::: exercise Resolving CO from N₂ {level=3 check="2490"}
A residual-gas analyser must separate $\mathrm{CO^{+\bullet}}$ from $\mathrm{N_2^{+\bullet}}$ at $m/z$ 28. Using the monoisotopic masses, what resolving power $m/\Delta m$ (FWHM) is required? (Enter $R$ to three significant figures.) Would separating $^{13}\mathrm{CH_4^{+\bullet}}$ from $^{12}\mathrm{CH_3D}^{+\bullet}$ at $m/z$ 17 be easier or harder?
::: solution
$\Delta m = 28.006\,148 - 27.994\,915 = 0.011\,233\ \mathrm{u}$; $R = 28.0/0.011\,233 = 2.49\times10^{3}$, i.e. $2490$ (electron corrections cancel in the difference). For the methane isotopologues, $m(^{13}\mathrm{C}) - m(^{12}\mathrm{C}) = 1.003\,355$ while $m(\mathrm{D}) - m(\mathrm{H}) = 1.006\,277\ \mathrm{u}$, so $\Delta m = 0.002\,922\ \mathrm{u}$ and $R = 17/0.002\,922 \approx 5.8\times10^{3}$: harder, beyond a quadrupole but routine for a sector, Orbitrap or FT-ICR — and important in isotope geochemistry, where such "isotopologue" peaks are measured to study the origin of methane.
:::
:::

::: exercise A methyl ester {level=3 check="74"}
Methyl hexanoate, $\mathrm{CH_3(CH_2)_4CO_2CH_3}$ ($M = 130$), shows an intense even-mass peak in its EI spectrum from a McLafferty rearrangement. Describe the electron movements and give the $m/z$ of the ion. (Enter the $m/z$.) Predict also the $m/z$ of the α-cleavage ion formed by loss of $\mathrm{CH_3O^\bullet}$.
::: hint
Count carbons from the carbonyl: α, β, γ. Which neutral alkene is expelled?
:::
::: solution
Ionisation removes a lone-pair electron from the carbonyl oxygen. The chain coils so that this oxygen meets a hydrogen on the γ-carbon (C4 of the hexanoyl chain). The oxygen radical takes one electron of the γ C–H bond and the hydrogen atom moves to oxygen; the unpaired electron left on the γ-carbon pairs with one electron of the α–β bond to make a $\pi$ bond between the β- and γ-carbons; the other electron of the α–β bond moves to the α-carbon, giving the enol. The neutral lost is but-1-ene, $\mathrm{CH_2{=}CHCH_2CH_3}$ ($56\ \mathrm{u}$), and the ion is $\mathrm{CH_2{=}C(OH)OCH_3^{+\bullet}}$ at $m/z$ $130 - 56 = 74$ (exact mass $74.0362$). It is even-mass, as a McLafferty ion of a nitrogen-free compound must be, and it is the base peak in the spectra of most fatty-acid methyl esters. α-Cleavage with loss of $\mathrm{CH_3O^\bullet}$ ($31\ \mathrm{u}$) gives the acylium ion $\mathrm{C_5H_{11}CO^+}$ at $m/z$ 99.
:::
:::

::: exercise Deriving the analyser equations {level=3}
(a) Derive equation [[#eq-sector]] for a magnetic sector and show that, at fixed $B$ and $r$, a mass scan by varying the accelerating voltage $U$ requires $U \propto 1/(m/z)$. (b) Show that for the FT-ICR cyclotron frequency $f_\mathrm{c} = zeB/2\pi m$, the relative frequency resolution equals the mass resolving power, $f/\Delta f = m/\Delta m$, and compute $f_\mathrm{c}$ for $m/z$ 500 in a $7.0\ \mathrm{T}$ magnet. (c) Why does the resolving power of an FT instrument increase with the length of the recorded transient?
::: solution
(a) The magnetic force $zevB$ supplies the centripetal force $mv^{2}/r$, so $v = zeBr/m$; the kinetic energy from acceleration is $\tfrac12 mv^{2} = zeU$. Substituting, $\tfrac12 m (zeBr/m)^{2} = zeU$, i.e. $z e B^{2}r^{2}/(2m) = U$, which rearranges to $m/z = eB^{2}r^{2}/2U$. At fixed $B$ and $r$, $U = eB^{2}r^{2}/(2\,m/z) \propto 1/(m/z)$; voltage scanning is fast but changes the ion energy and hence the source's transmission, which is why sectors are usually scanned in $B$.

(b) $f_\mathrm{c} \propto 1/m$, so $\mathrm{d}f/f = -\mathrm{d}m/m$ and, in magnitude, $f/\Delta f = m/\Delta m$. Numerically,
$$
f_\mathrm{c} = \frac{1.602\,177\times10^{-19}\ \mathrm{C} \times 7.0\ \mathrm{T}}{2\pi \times 500 \times 1.660\,539\times10^{-27}\ \mathrm{kg}} = 2.15\times10^{5}\ \mathrm{Hz} = 215\ \mathrm{kHz}.
$$

(c) A signal recorded for a time $T$ has, after Fourier transformation, a line width of order $1/T$ (the time–frequency uncertainty of [[spectroscopy/spectroscopy-principles]]). For $T = 1\ \mathrm{s}$, $\Delta f \approx 1\ \mathrm{Hz}$ and $f/\Delta f \approx 2\times10^{5}$ at $m/z$ 500; a longer transient — limited by collisions with residual gas, hence the need for ultra-high vacuum — gives proportionally higher resolving power. The same reasoning sets the resolution of an NMR spectrum by its acquisition time.
:::
:::
