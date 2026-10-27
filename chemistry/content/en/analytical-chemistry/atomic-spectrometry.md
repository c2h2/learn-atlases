Drinking-water regulations list limits for some twenty elements — arsenic, cadmium, chromium, copper, lead, mercury, nickel, selenium, uranium and more — at concentrations from milligrams down to fractions of a microgram per litre. A water laboratory analyses hundreds of samples a day for all of them, each result traceable and with a stated uncertainty. No titration or colour reaction could do that. The work is done by **atomic spectrometry**: the sample is broken down into free atoms (or atomic ions) at high temperature, and the atoms are detected by the light they absorb or emit at wavelengths unique to each element, or by their mass. Because atomic lines are narrow and characteristic, these methods are highly selective; because the sample is destroyed into atoms, they measure the total element regardless of its chemical form.

This chapter covers the main techniques: **atomic absorption spectrometry** (AAS) with flame and graphite-furnace atomisers, **inductively coupled plasma optical emission spectrometry** (ICP-OES) and **inductively coupled plasma mass spectrometry** (ICP-MS). We derive the Boltzmann population of excited states, which explains why absorption and emission behave so differently with temperature; the Doppler width of atomic lines, which explains why atomic absorption needs a line source; and the ionisation equilibrium behind one of the classic interferences. The general theory of atomic spectra (term symbols, selection rules) is in [[quantum-chemistry/many-electron-atoms]]; the calibration methods — standard addition and internal standards above all — are those of [[analytical-chemistry/statistics-calibration]], and the absorbance arithmetic is that of [[analytical-chemistry/molecular-spectrometry]].

## Atoms, lines and temperature

A free atom has discrete electronic energy levels, so it absorbs and emits at sharp wavelengths. The sodium D lines at $589.0$ and $589.6\ \mathrm{nm}$ (transitions between the $3s$ ground state and the two $3p$ levels), the copper line at $324.8\ \mathrm{nm}$, the lead line at $283.3\ \mathrm{nm}$ and the zinc line at $213.9\ \mathrm{nm}$ are typical analytical lines. In a flame or plasma the lines have widths of a few picometres ($10^{-3}$–$10^{-2}\ \mathrm{nm}$) — a thousand times narrower than the bands of molecules in solution — which is why spectral overlap between elements is the exception rather than the rule.

Getting from a solution to free atoms is the hard part. A **nebuliser** turns the solution into a fine aerosol; in the flame or plasma the droplets lose their solvent (desolvation), the dry particles vaporise, the molecules dissociate into atoms (atomisation), and some atoms ionise. Each step can be incomplete, and incompleteness that depends on the sample's matrix is the root of most interferences.

::: proposition Population of excited states {#prop-boltzmann}
In a flame or plasma in local thermal equilibrium at temperature $T$, the ratio of the number of atoms in an excited state $j$ to the number in the ground state $0$ is
$$
\frac{N_j}{N_0} = \frac{g_j}{g_0}\exp\!\left(-\frac{\Delta E}{k_\mathrm{B}T}\right),
$$ {#eq-boltzmann}
where $g$ are the statistical weights (degeneracies, $2J + 1$ for a level of total angular momentum $J$) and $\Delta E = hc/\lambda$ is the energy of the transition at wavelength $\lambda$.
:::

::: proof
In thermal equilibrium the probability that an atom is in a particular quantum state of energy $E$ is proportional to $e^{-E/k_\mathrm{B}T}$ (the Boltzmann distribution, [[statistical-thermodynamics/boltzmann-distribution]]). A level of degeneracy $g$ consists of $g$ states of the same energy, so the population of the level is proportional to $g\,e^{-E/k_\mathrm{B}T}$. Taking the ratio for levels $j$ and $0$ cancels the normalising partition function and leaves [[#eq-boltzmann]]. Local thermal equilibrium (collisions fast enough to keep the populations at their Boltzmann values) is a good approximation in atmospheric-pressure flames and a reasonable one in the analytical zone of an argon plasma.
:::

::: example How many sodium atoms are excited? {#ex-boltzmann}
For the sodium $589.0\ \mathrm{nm}$ line ($3s\ {}^2\mathrm{S}_{1/2}\rightarrow3p\ {}^2\mathrm{P}_{3/2}$, so $g_0 = 2$, $g_j = 4$), find $N_j/N_0$ at $2500\ \mathrm{K}$ (an air–acetylene flame) and at $6000\ \mathrm{K}$ (the analytical zone of a plasma). By what percentage does the excited population change if the flame temperature rises by $10\ \mathrm{K}$?
::: solution
$\Delta E = hc/\lambda = (6.626\times10^{-34}\times2.998\times10^{8})/(589.0\times10^{-9}) = 3.373\times10^{-19}\ \mathrm{J}$ ($2.105\ \mathrm{eV}$). Then
$$
\begin{aligned}
T = 2500\ \mathrm{K}:&\quad \frac{N_j}{N_0} = 2\exp\!\left(-\frac{3.373\times10^{-19}}{1.381\times10^{-23}\times2500}\right) = 2e^{-9.77} = 1.14\times10^{-4},\\
T = 6000\ \mathrm{K}:&\quad \frac{N_j}{N_0} = 2e^{-4.07} = 0.034 .
\end{aligned}
$$
In the flame only about one atom in nine thousand is excited, even for this low-lying level. Differentiating $\ln(N_j/N_0)$ with respect to $T$ gives $\Delta E/(k_\mathrm{B}T^2) = 3.9\times10^{-3}\ \mathrm{K^{-1}}$ at $2500\ \mathrm{K}$, so a $10\ \mathrm{K}$ rise increases the excited population — and the emission — by about $3.9\ \%$, while the ground-state population, $N_0 \approx N$, is essentially unchanged.
:::
:::

This example contains the central contrast of the field. **Emission** intensity is proportional to $N_j$, which is a tiny and strongly temperature-dependent fraction; **absorption** depends on $N_0$, which is almost all of the atoms and nearly independent of temperature. Flame emission therefore works well only for easily excited elements (the alkali metals, whose flame photometry is still used for sodium and potassium), and needs very stable flames. A plasma at $6000$–$8000\ \mathrm{K}$ excites almost all elements, which is why ICP *emission* displaced flame emission, while in flames *absorption* became the method of choice.

::: widget plot
f: 3*exp(-6.626e-34*2.998e8/(L*1e-9*1.381e-23*x))
x: 1500, 10000
y: 0, 0.1
sliders: L=589:190:900:1
labels: N_j/N_0
caption: The Boltzmann ratio [[#eq-boltzmann]] against temperature $T$ (in kelvin) for a resonance line of wavelength $L$ (in nm, slider), with $g_j/g_0 = 3$ (as for the singlet $\mathrm{S}\rightarrow\mathrm{P}$ lines of the alkaline-earth and zinc-group elements). At flame temperatures (2000–3000 K) the ratio is tiny for every line; at plasma temperatures it rises steeply. Slide the wavelength down to $214\ \mathrm{nm}$ (zinc) and the curve hardly lifts off the axis even at $6000\ \mathrm{K}$ ($N_j/N_0 \approx 4\times10^{-5}$): short-wavelength lines need the hottest sources for emission, but are measured comfortably by absorption.
:::

## Atomic absorption spectrometry

In AAS, light at the analytical line passes through the atom cloud and the absorbance is measured; as for molecules, $A = \log_{10}(P_0/P)$ is proportional to the number density of ground-state atoms over a working range.

The light source is the key to the method, and the reason is the width of atomic lines. A monochromator with a bandwidth of $0.2\ \mathrm{nm}$ passes a band a hundred times wider than the absorption line. If we used a continuum source, the atoms would remove only a sliver of the light passed by the slit, and the absorbance would be tiny and non-linear (the polychromatic deviation of [[analytical-chemistry/molecular-spectrometry]] in extreme form). Alan Walsh's solution, in 1955, was to use as the source a lamp that emits the element's own lines, narrower than the absorption lines: the **hollow-cathode lamp**, whose cathode is made of the element of interest and whose low-pressure discharge produces lines even narrower than those of the flame. The monochromator then only has to isolate one line of the lamp from its neighbours.

::: proposition Doppler width of an atomic line {#prop-doppler}
Atoms of mass $m$ in a gas at temperature $T$ move with a Maxwell distribution of velocities, and each absorbs or emits at a wavelength shifted by the Doppler effect. The resulting line profile is Gaussian with full width at half maximum
$$
\Delta\lambda_\mathrm{D} = \frac{\lambda}{c}\sqrt{\frac{8k_\mathrm{B}T\ln2}{m}} .
$$ {#eq-doppler}
:::

::: proof
The component $v_x$ of the velocity along the line of sight has the Maxwell distribution $f(v_x) \propto \exp(-mv_x^2/2k_\mathrm{B}T)$, a Gaussian with variance $\sigma_v^2 = k_\mathrm{B}T/m$. An atom moving with $v_x \ll c$ interacts with light at a wavelength shifted by $\delta\lambda = \lambda v_x/c$, so the line profile in $\delta\lambda$ is Gaussian with standard deviation $\sigma_\lambda = (\lambda/c)\sqrt{k_\mathrm{B}T/m}$. A Gaussian has its half maximum where $\exp(-\delta\lambda^2/2\sigma_\lambda^2) = \tfrac12$, i.e. $\delta\lambda = \sigma_\lambda\sqrt{2\ln2}$, so the full width is $2\sqrt{2\ln2}\,\sigma_\lambda$, which is [[#eq-doppler]] after bringing the factors under the square root: $(2\sqrt{2\ln2})^2 = 8\ln2$.
:::

For sodium at $589\ \mathrm{nm}$ and $2500\ \mathrm{K}$, [[#eq-doppler]] gives $\Delta\lambda_\mathrm{D} = 4.4\ \mathrm{pm}$; for lead at $283.3\ \mathrm{nm}$ it is $0.70\ \mathrm{pm}$, because lead is heavier and the line is at shorter wavelength ([[#exr-doppler]]). Collisions with flame gases add a comparable **pressure (Lorentz) broadening**, so flame absorption lines are a few picometres wide. Hollow-cathode lamps operate at a few hundred pascals and a few hundred kelvin, so their lines are narrower still.

::: widget plot
f: exp(-4*ln(2)*(x/(589*sqrt(8*1.381e-23*T*ln(2)/(M*1.6605e-27))/2.998e8*1000))^2); heaviside(100 - abs(x))*0.5
x: -150, 150
y: 0, 1.1
sliders: T=2500:300:8000:100; M=23:1:240:1
labels: \text{Doppler-broadened line (shape)}; \text{monochromator bandpass } 0.2\ \mathrm{nm}
caption: The Gaussian Doppler profile [[#eq-doppler]] of an atomic line near $589\ \mathrm{nm}$, normalised to unit height, against the offset from the line centre in picometres ($x$); sliders set the temperature $T$ (K) and the atomic mass $M$ (in daltons). The flat-topped band, $200\ \mathrm{pm}$ wide, is the bandpass of a typical monochromator, drawn at half height for clarity. Even in a hot plasma and for the lightest atoms the line occupies a small fraction of the bandpass; a continuum source would therefore lose almost all its sensitivity, and AAS needs a line source — or, in modern high-resolution continuum-source instruments, a double echelle spectrometer with picometre resolution.
:::

### Flames and furnaces

**Flame AAS** aspirates the solution continuously into a slot burner, giving a flame $5$–$10\ \mathrm{cm}$ long along the light path. The air–acetylene flame (about $2400$–$2600\ \mathrm{K}$) suits most elements; the hotter nitrous oxide–acetylene flame (about $2900$–$3100\ \mathrm{K}$) is needed for elements that form refractory oxides, such as aluminium, silicon, titanium and vanadium. Flame AAS is fast (seconds per element), precise ($0.5$–$1\ \%$) and cheap, with detection limits of roughly $1$–$100\ \mu\mathrm{g\,dm^{-3}}$ for most elements. Its weakness is efficiency: most of the aspirated solution goes to waste, and each atom spends only milliseconds in the light path.

**Graphite-furnace AAS** (electrothermal AAS) puts $10$–$50\ \mu\mathrm{l}$ of sample into a small graphite tube in the light path and heats it electrically in a programme: **drying** (about $100$–$150\ ^\circ\mathrm{C}$) removes solvent; **pyrolysis** (ashing, a few hundred to over a thousand degrees) destroys organic matter and volatilises as much matrix as possible without losing the analyte; **atomisation** (up to $2000$–$2700\ ^\circ\mathrm{C}$ within a second or so) releases a cloud of atoms that stays in the tube for about a second; a final **clean-out** step burns off residues. Because the entire sample is atomised into a small volume and retained there, detection limits are about a hundred to a thousand times lower than in a flame — sub-$\mu\mathrm{g\,dm^{-3}}$ for many elements. The price is a slower measurement (a few minutes per element), poorer precision and more severe interferences, which are tamed by **matrix modifiers** (palladium and magnesium nitrates, ammonium phosphate) that stabilise the analyte during pyrolysis, by platform atomisation in a uniformly heated tube, and by measuring the integrated (peak-area) absorbance.

::: definition Characteristic concentration and characteristic mass {#def-characteristic}
The sensitivity of an AAS method is expressed by the **characteristic concentration** $c_0$ (flame), the analyte concentration that gives an absorbance of $0.0044$ (that is, $1\ \%$ absorption, since $-\log_{10}0.99 = 0.0044$), or, for a furnace, the **characteristic mass** $m_0$, the mass of analyte that gives an integrated absorbance of $0.0044\ \mathrm{s}$. Within the linear range, $c = c_0A/0.0044$ and $m = m_0A_\mathrm{int}/0.0044\ \mathrm{s}$. Characteristic values describe sensitivity, not detection limit, which also depends on the noise ([[analytical-chemistry/statistics-calibration#prop-detection]]).
:::

::: example Lead by graphite furnace {#ex-gfaas}
The characteristic mass of lead on a furnace instrument is $m_0 = 12\ \mathrm{pg}$. A $20\ \mu\mathrm{l}$ injection of a digested blood sample (diluted tenfold before injection) gives an integrated absorbance of $0.110\ \mathrm{s}$ after blank correction. Find the lead concentration in the injected solution and in the blood.
::: solution
The mass of lead in the furnace is
$$
m = m_0\frac{A_\mathrm{int}}{0.0044\ \mathrm{s}} = 12\ \mathrm{pg}\times\frac{0.110}{0.0044} = 300\ \mathrm{pg}.
$$
In $20\ \mu\mathrm{l}$, that is $300\ \mathrm{pg}/20\ \mu\mathrm{l} = 15\ \mathrm{pg\,\mu l^{-1}} = 15\ \mu\mathrm{g\,dm^{-3}}$. The blood, diluted tenfold, contained $150\ \mu\mathrm{g\,dm^{-3}}$. In practice the result would come from a calibration (preferably matrix-matched, or by standard addition), with the characteristic mass used only to check that the instrument is performing as specified — a furnace whose $m_0$ has drifted by more than about $20\ \%$ needs attention.
:::
:::

### Interferences in atomic absorption

Interferences fall into two groups.

**Spectral interferences** arise when something other than the analyte absorbs or scatters at the analytical wavelength. Direct overlap of two atomic lines is rare. Much more common is **background absorption** by molecules and **scattering** by particles in the atom cloud, especially in furnaces with salty or organic matrices. **Background correction** is therefore standard. A deuterium lamp, whose continuum is barely absorbed by the narrow atomic line but fully absorbed by the broad background, measures the background and allows it to be subtracted. **Zeeman** correction applies a magnetic field to the atomiser that splits the atomic line so that the atoms no longer absorb the lamp line in one polarisation, while the background absorbs both; it corrects structured background more reliably.

**Non-spectral interferences** change the number of free atoms produced from a given concentration.

- **Chemical interferences**: the analyte forms a compound that is not fully atomised. Phosphate, sulfate, aluminate and silicate suppress calcium in an air–acetylene flame by forming refractory calcium salts. Remedies: a **releasing agent** (lanthanum or strontium, which binds the phosphate preferentially), a **protecting agent** (EDTA, which binds the calcium in a volatile form), or the hotter nitrous oxide–acetylene flame.
- **Ionisation interference**: in hot flames, easily ionised elements lose a fraction of their atoms to ions, which do not absorb at the atomic line. Since the degree of ionisation depends on the concentration of free electrons, the presence of another easily ionised element changes the signal. The remedy is an **ionisation suppressor** ([[#ex-ionisation]]).
- **Physical (transport) interferences**: differences in viscosity, surface tension or dissolved solids change the rate of nebulisation; they are corrected by matrix matching, standard addition or an internal standard.

The ionisation equilibrium $\mathrm{M} \rightleftharpoons \mathrm{M^+} + \mathrm{e^-}$ is described by the **Saha equation**, the gas-phase equilibrium constant for ionisation derived by statistical mechanics:
$$
\frac{n_{\mathrm{M^+}}n_\mathrm{e}}{n_\mathrm{M}} = 2\frac{g_{\mathrm{M^+}}}{g_\mathrm{M}}\left(\frac{2\pi m_\mathrm{e}k_\mathrm{B}T}{h^2}\right)^{3/2}\exp\!\left(-\frac{E_\mathrm{i}}{k_\mathrm{B}T}\right),
$$ {#eq-saha}
with number densities $n$, ionisation energy $E_\mathrm{i}$ and the electron mass $m_\mathrm{e}$. The right-hand side depends only on the element and the temperature; the fraction ionised, $n_{\mathrm{M^+}}/(n_\mathrm{M} + n_{\mathrm{M^+}})$, then depends on $n_\mathrm{e}$, which is set by *all* the easily ionised elements present.

::: widget plot
f: 1/(1 + 10^x/(4.829e21*0.5*T^1.5*exp(-Ei*11604.5/T)))
x: 14, 20
y: 0, 1
sliders: Ei=5.14:3.8:7:0.01; T=2500:2000:3200:10
labels: \text{fraction of atoms ionised}
caption: The fraction of an element present as ions in a flame, from the Saha equation [[#eq-saha]] with $g_{\mathrm{M^+}}/g_\mathrm{M} = 1/2$ (as for the alkali metals), against $\log_{10}$ of the electron number density $n_\mathrm{e}$ in $\mathrm{m^{-3}}$ ($x$). Sliders set the ionisation energy $E_\mathrm{i}$ (eV; sodium $5.14$, potassium $4.34$, caesium $3.89$) and the flame temperature (K). The curve falls as $n_\mathrm{e}$ rises: adding a large excess of an easily ionised element, which floods the flame with electrons, pushes the analyte's ionisation equilibrium back towards neutral atoms. This model is a guide to trends; real flames are not in perfect equilibrium.
:::

::: example Suppressing the ionisation of sodium {#ex-ionisation}
In a model calculation for an air–acetylene flame at $2500\ \mathrm{K}$, the right-hand side of [[#eq-saha]] for sodium is $1.3\times10^{16}\ \mathrm{m^{-3}}$. Find the fraction of sodium ionised when $n_\mathrm{e} = 1.0\times10^{16}\ \mathrm{m^{-3}}$, and when a potassium salt added in large excess raises $n_\mathrm{e}$ to $1.0\times10^{18}\ \mathrm{m^{-3}}$. Why does this improve the analysis?
::: solution
With $S = 1.3\times10^{16}$, $n_{\mathrm{Na^+}}/n_\mathrm{Na} = S/n_\mathrm{e}$, so the fraction ionised is $(S/n_\mathrm{e})/(1 + S/n_\mathrm{e}) = S/(S + n_\mathrm{e})$:
$$
n_\mathrm{e} = 1.0\times10^{16}:\ \frac{1.3}{1.3 + 1.0} = 0.57; \qquad n_\mathrm{e} = 1.0\times10^{18}:\ \frac{1.3\times10^{16}}{1.01\times10^{18}} = 0.013 .
$$
Without the suppressor, more than half the sodium is lost to ions, and — worse — the fraction lost depends on how much of other easily ionised elements each sample contains, so samples and standards behave differently. With excess potassium in *both* standards and samples, ionisation of sodium falls to about $1\ \%$ and, more importantly, becomes the same in every solution. (The numbers here illustrate the trend; actual degrees of ionisation in flames depend on the flame, the height of observation and departures from equilibrium.)
:::
:::

## Inductively coupled plasma emission

An **inductively coupled plasma** is an argon discharge sustained at atmospheric pressure inside a quartz torch by a radio-frequency field (typically $27$ or $40\ \mathrm{MHz}$, $1$–$1.5\ \mathrm{kW}$) from a water-cooled induction coil. Electrons accelerated by the oscillating field ionise argon atoms, and the plasma reaches $6000$–$10\,000\ \mathrm{K}$. The sample aerosol is carried by a central argon flow through a channel in the doughnut-shaped plasma, where it spends a few milliseconds at about $5000$–$7000\ \mathrm{K}$ — long enough and hot enough to atomise almost everything and to excite (and largely ionise) most elements.

In **ICP-OES** the emitted light is dispersed by a high-resolution spectrometer, usually an echelle grating with a two-dimensional solid-state detector that records hundreds of lines at once. Its advantages follow from the physics: the high temperature removes most chemical interferences; the plasma is **optically thin** (emitted light is not reabsorbed), so calibrations are linear over four to six orders of magnitude; and all elements are measured simultaneously. Detection limits are typically $0.1$–$10\ \mu\mathrm{g\,dm^{-3}}$. The plasma can be viewed side-on (**radial**, fewer matrix effects) or end-on (**axial**, longer path, lower detection limits).

The price of hot, multi-line sources is **spectral interference**: an ICP excites thousands of lines of iron, cerium, uranium and other line-rich elements, and the argon itself emits. Each element has several possible lines, and the analyst chooses those free from overlap for the matrix in hand, applies background correction at points beside the line, and uses inter-element correction factors where overlap cannot be avoided. Non-spectral effects (changes in nebulisation, plasma loading by high-salt samples) are corrected with an **internal standard** such as yttrium or scandium added to every solution ([[#exr-icp-internal]]).

::: warning A clean spectrum is not a correct result {#warn-atomic}
Atomic methods are so selective that it is easy to assume that a clean, well-shaped line or peak must belong to the analyte and must be correct. Neither follows. In ICP-MS, a perfectly shaped peak at $m/z = 75$ in a chloride-rich sample may be largely $^{40}\mathrm{Ar}^{35}\mathrm{Cl}^+$ rather than arsenic; in ICP-OES, a small line of a matrix element can sit under the analyte line; in AAS, background absorption looks exactly like atomic absorption unless corrected. And a correct signal can still give a wrong result if the sample was not completely digested (refractory silicates, oxides), if the analyte was lost during pyrolysis or digestion (mercury, arsenic, selenium are volatile), or if the standards differ in acid and salt content from the samples. Check with a certified reference material of similar matrix, spike recoveries, and a second line or isotope.
:::

## Inductively coupled plasma mass spectrometry

The ICP is an excellent source of **ions**: most elements are more than $90\ \%$ singly ionised in the plasma, because the ionisation energy of argon ($15.76\ \mathrm{eV}$) exceeds that of almost every other element. In **ICP-MS** the ions are drawn from the atmospheric-pressure plasma through a sampler cone and a skimmer cone (orifices of about $1\ \mathrm{mm}$) into a vacuum, focused by ion lenses, separated by mass-to-charge ratio — usually with a **quadrupole** mass filter, which passes one $m/z$ at a time with unit resolution — and counted. Detection limits are in the range $0.1$–$10\ \mathrm{ng\,dm^{-3}}$ for most elements (parts per trillion), the linear range covers eight to ten orders of magnitude, and isotopes are measured individually, which allows **isotope dilution** — the most accurate calibration of all ([[analytical-chemistry/hyphenated-methods]]).

ICP-MS has its own interferences.

- **Isobaric interferences**: isotopes of different elements with the same nominal mass ($^{58}\mathrm{Fe}$ and $^{58}\mathrm{Ni}$, $^{204}\mathrm{Hg}$ and $^{204}\mathrm{Pb}$). Avoided by choosing another isotope, or corrected mathematically from another isotope of the interfering element.
- **Polyatomic interferences**: molecular ions formed from argon, the solvent and the matrix, such as $^{40}\mathrm{Ar}^{16}\mathrm{O}^+$ on $^{56}\mathrm{Fe}^+$, $^{40}\mathrm{Ar}_2^+$ on $^{80}\mathrm{Se}^+$, $^{40}\mathrm{Ar}^{35}\mathrm{Cl}^+$ on $^{75}\mathrm{As}^+$ and $^{35}\mathrm{Cl}^{16}\mathrm{O}^+$ on $^{51}\mathrm{V}^+$. They are removed in a **collision/reaction cell** before the quadrupole: in helium collision mode with kinetic energy discrimination, larger polyatomic ions lose more energy in collisions than atomic ions of the same mass and are rejected by an energy barrier; reactive gases (hydrogen, ammonia, oxygen) convert either the interferent or the analyte to a different mass. **High-resolution** (sector-field) instruments separate the interferent from the analyte by their slightly different exact masses.
- **Doubly charged ions**: elements with low second ionisation energies (barium, the rare earths) form some $\mathrm{M^{2+}}$, which appears at half the mass ($^{138}\mathrm{Ba}^{2+}$ at $m/z = 69$, on $^{69}\mathrm{Ga}^+$).
- **Matrix effects**: high concentrations of dissolved solids deposit on the cones and suppress ionisation and transmission (heavier ions are favoured over lighter ones, by space-charge effects in the ion beam). Samples are therefore kept below about $0.2\ \%$ total dissolved solids and internal standards spanning the mass range are used.

::: example Resolving arsenic from argon chloride {#ex-resolution}
The exact masses are $^{75}\mathrm{As}$ $74.92160$, $^{40}\mathrm{Ar}$ $39.96238$ and $^{35}\mathrm{Cl}$ $34.96885\ \mathrm{u}$. What mass resolution $R = m/\Delta m$ is needed to separate $^{75}\mathrm{As}^+$ from $^{40}\mathrm{Ar}^{35}\mathrm{Cl}^+$? Can a quadrupole do it?
::: solution
$m(^{40}\mathrm{Ar}^{35}\mathrm{Cl}) = 39.96238 + 34.96885 = 74.93123\ \mathrm{u}$ (the electron mass cancels in the difference). $\Delta m = 74.93123 - 74.92160 = 0.00963\ \mathrm{u}$, and
$$
R = \frac{m}{\Delta m} = \frac{74.92}{0.00963} \approx 7.8\times10^{3} .
$$
A quadrupole has unit resolution ($R \approx m$, about $75$ here) and cannot separate them; a sector-field instrument in its medium-resolution mode ($R \approx 4000$) cannot either, and its high-resolution mode ($R \approx 10\,000$) can, at a considerable cost in sensitivity. In practice the interference is removed in a collision/reaction cell — for example by helium kinetic energy discrimination, or by reacting $\mathrm{As^+}$ with oxygen to form $\mathrm{AsO^+}$ at $m/z = 91$, away from the interference.
:::
:::

::: quiz
A laboratory needs to determine $25$ elements, from sodium at tens of $\mathrm{mg\,dm^{-3}}$ to cadmium and lead at below $1\ \mu\mathrm{g\,dm^{-3}}$, in a few hundred river-water samples a week. Which technique is the best single choice?
- [ ] Flame AAS, because it is cheap and precise.
- [ ] Graphite-furnace AAS, because it has the lowest detection limits of the AAS methods.
- [x] ICP-MS (possibly alongside ICP-OES for the major elements), because it is multi-element, fast and reaches sub-$\mu\mathrm{g\,dm^{-3}}$ levels.
- [ ] Flame emission photometry, because river water contains mostly alkali metals.
::: solution
Flame AAS measures one element at a time and cannot reach sub-$\mu\mathrm{g\,dm^{-3}}$ cadmium. Furnace AAS can, but at a few minutes per element per sample, $25$ elements for hundreds of samples is impractical. ICP-MS measures all of them in a few minutes per sample with ample sensitivity; very high concentrations of the major elements may be diluted or measured by ICP-OES, whose linear range at high concentration is convenient. Flame photometry handles only a few easily excited elements.
:::
:::

## Comparing the techniques

| | flame AAS | furnace AAS | ICP-OES | ICP-MS |
|---|---|---|---|---|
| typical detection limits | $1$–$100\ \mu\mathrm{g\,dm^{-3}}$ | $0.01$–$1\ \mu\mathrm{g\,dm^{-3}}$ | $0.1$–$10\ \mu\mathrm{g\,dm^{-3}}$ | $0.0001$–$0.01\ \mu\mathrm{g\,dm^{-3}}$ |
| elements per run | one | one (a few) | many, simultaneous | many, rapid sequential |
| linear range (decades) | 2–3 | 2–3 | 4–6 | 8–10 |
| main interferences | chemical, ionisation | background, matrix | spectral overlap | polyatomic, isobaric, matrix |
| relative cost | low | moderate | high | highest |

The figures are typical orders of magnitude, not specifications; they vary by element and instrument. A further technique, **atomic fluorescence**, is used with hydride generation or cold-vapour generation for arsenic, selenium and mercury, which are converted chemically into volatile hydrides or mercury vapour, separated from the matrix and measured with very low detection limits. The hazards of these methods are those of high-voltage and radio-frequency equipment, compressed gases (acetylene in particular, which must be used from properly regulated cylinders with flashback arrestors), ultraviolet radiation from flames and plasmas, toxic fumes from the burner (extraction above the atomiser is required), and the concentrated acids used in digestion.

## Where this leads

Sample digestion for atomic methods — microwave-assisted acid digestion, fusion, and the risks of loss and contamination at trace levels — was discussed in [[analytical-chemistry/analytical-process]]. Coupling an ICP-MS to a chromatograph to separate the chemical forms of an element (arsenobetaine from arsenite in seafood, methylmercury from inorganic mercury) is **speciation analysis**, one of the hyphenated methods of [[analytical-chemistry/hyphenated-methods]], which also develops isotope dilution. Organic mass spectrometry, with its very different ion sources, is in [[spectroscopy/mass-spectrometry]]. Trace metals in waters, soils and air are the subject of [[environmental-chemistry/environmental-monitoring]].

::: history
Robert Bunsen and Gustav Kirchhoff founded spectrochemical analysis with their flame studies of 1859–61, in which they discovered caesium (1860) and rubidium (1861) by their spectral lines. Alan Walsh, at the CSIRO in Melbourne, conceived atomic absorption spectrometry with a hollow-cathode source and published it in *Spectrochimica Acta* in 1955; Boris L'vov developed the graphite furnace in Leningrad from the late 1950s, and Walter Slavin's group popularised the stabilised-temperature platform furnace in the early 1980s. Stanley Greenfield in Birmingham (1964) and Velmer Fassel and Richard Wendt in Ames (1965) independently introduced the inductively coupled plasma as an emission source. Robert Houk, Fassel and co-workers demonstrated ICP mass spectrometry in 1980, building on Alan Gray's plasma-source mass spectrometry work in the United Kingdom, and the first commercial instruments appeared in 1983.
:::

::: summary
- Atomic methods convert the sample to free atoms or ions; their narrow, characteristic lines make them selective, and they measure total element.
- The Boltzmann ratio $N_j/N_0 = (g_j/g_0)e^{-\Delta E/k_\mathrm{B}T}$ is tiny in flames and strongly temperature-dependent: absorption (ground state) suits flames; emission needs a plasma.
- Doppler widths are picometres, $\Delta\lambda_\mathrm{D} = (\lambda/c)\sqrt{8k_\mathrm{B}T\ln2/m}$, so AAS needs a line source (hollow-cathode lamp) or a very high-resolution spectrometer.
- Flame AAS is fast and precise; the graphite furnace atomises the whole sample and lowers detection limits a hundred- to thousandfold, with more interferences, tamed by modifiers and background correction.
- Chemical interferences are cured by releasing or protecting agents or hotter flames; ionisation interference (Saha equilibrium) by an excess of an easily ionised element.
- ICP-OES gives simultaneous multi-element analysis with wide linear range but rich spectra; ICP-MS reaches $\mathrm{ng\,dm^{-3}}$ levels and isotopes, with polyatomic interferences removed in collision/reaction cells.
- Clean signals are not proof of correct results: verify with CRMs, recoveries and alternative lines or isotopes.
:::

## Exercises

::: exercise Characteristic concentration {level=1 check="0.049"}
A $2.00\ \mathrm{mg\,dm^{-3}}$ copper standard gives an absorbance of $0.180$ in flame AAS. Find the characteristic concentration. (Enter $c_0$ in $\mathrm{mg\,dm^{-3}}$.)
::: solution
$c_0 = 0.0044\times2.00/0.180 = 0.049\ \mathrm{mg\,dm^{-3}}$. A solution of $0.049\ \mathrm{mg\,dm^{-3}}$ copper absorbs $1\ \%$ of the lamp light. Characteristic concentrations listed by manufacturers are used to check that an instrument is working properly.
:::
:::

::: exercise Furnace arithmetic {level=1 check="7.5"}
With $m_0 = 12\ \mathrm{pg}$ for lead, a $20\ \mu\mathrm{l}$ injection gives $A_\mathrm{int} = 0.0550\ \mathrm{s}$. Find the lead concentration in the injected solution. (Enter it in $\mu\mathrm{g\,dm^{-3}}$.)
::: solution
$m = 12\times0.0550/0.0044 = 150\ \mathrm{pg}$; $150\ \mathrm{pg}/20\ \mu\mathrm{l} = 7.5\ \mu\mathrm{g\,dm^{-3}}$.
:::
:::

::: exercise Resolving iron from argon oxide {level=1 check="2500"}
The exact masses of $^{56}\mathrm{Fe}$ and $^{40}\mathrm{Ar}^{16}\mathrm{O}$ are $55.93494$ and $55.95730\ \mathrm{u}$. What resolution $m/\Delta m$ separates them? (Enter $R$ to two significant figures.)
::: solution
$\Delta m = 0.02236\ \mathrm{u}$; $R = 55.935/0.02236 = 2.5\times10^3$. A sector-field instrument in medium resolution ($R \approx 4000$) separates them; a quadrupole does not, so iron is measured in collision or reaction mode, or on $^{57}\mathrm{Fe}$ (abundance $2.1\ \%$) where $^{40}\mathrm{Ar}^{16}\mathrm{O}^1\mathrm{H}^+$ interferes instead.
:::
:::

::: exercise Excitation of zinc {level=2 check="4.05"}
For the zinc resonance line at $213.857\ \mathrm{nm}$ ($g_j/g_0 = 3$), find $N_j/N_0$ at $6000\ \mathrm{K}$. (Enter the ratio in units of $10^{-5}$.)
::: solution
$\Delta E = hc/\lambda = 9.289\times10^{-19}\ \mathrm{J}$ ($5.80\ \mathrm{eV}$); $\Delta E/k_\mathrm{B}T = 9.289\times10^{-19}/(1.381\times10^{-23}\times6000) = 11.21$; $N_j/N_0 = 3e^{-11.21} = 4.05\times10^{-5}$. At $2500\ \mathrm{K}$ the ratio would be $6\times10^{-12}$: zinc is measured by flame absorption or plasma emission, never by flame emission.
:::
:::

::: exercise The temperature sensitivity of emission {level=2 check="3.9"}
Using [[#eq-boltzmann]], derive the fractional change in $N_j$ per kelvin, and evaluate the percentage change in sodium $589.0\ \mathrm{nm}$ emission for a $10\ \mathrm{K}$ rise at $2500\ \mathrm{K}$. (Enter the percentage.)
::: solution
$\dd\ln N_j/\dd T = \Delta E/(k_\mathrm{B}T^2)$ (with $N_0 \approx N$ constant). With $\Delta E/k_\mathrm{B} = 2.105\ \mathrm{eV}\times11\,604.5\ \mathrm{K\,eV^{-1}} = 24\,430\ \mathrm{K}$: $24\,430/2500^2 = 3.91\times10^{-3}\ \mathrm{K^{-1}}$, i.e. $3.9\ \%$ per $10\ \mathrm{K}$. A flame emission method needs flame temperature stable to about a kelvin for $0.4\ \%$ precision — demanding, which is one reason AAS displaced flame emission for most elements.
:::
:::

::: exercise An internal standard in ICP-OES {#exr-icp-internal level=2 check="0.939"}
A standard containing $1.00\ \mathrm{mg\,dm^{-3}}$ manganese and the yttrium internal standard gives intensities $1520$ (Mn) and $10\,200$ (Y). A sample containing the same yttrium concentration gives $1210$ (Mn) and $8650$ (Y). Find the manganese concentration, and explain what the fall in the yttrium signal indicates. (Enter Mn in $\mathrm{mg\,dm^{-3}}$.)
::: solution
Ratios: standard $1520/10\,200 = 0.1490$; sample $1210/8650 = 0.1399$. $c(\mathrm{Mn}) = 1.00\times0.1399/0.1490 = 0.939\ \mathrm{mg\,dm^{-3}}$. Without the internal standard one would have reported $1210/1520 = 0.796$, $15\ \%$ low. The $15\ \%$ fall in the yttrium signal shows that the sample matrix (higher viscosity or salt content) reduced nebulisation or plasma excitation; the internal standard corrects for this provided Mn and Y are affected equally, which is best ensured by choosing lines of similar excitation energy.
:::
:::

::: exercise Doppler width of a lead line {#exr-doppler level=3 check="0.70"}
Derive [[#eq-doppler]] from the Maxwell distribution and evaluate the Doppler width of the lead $283.3\ \mathrm{nm}$ line at $2500\ \mathrm{K}$ ($M = 207.2\ \mathrm{g\,mol^{-1}}$). Compare it with the bandwidth of a typical AAS monochromator ($0.2$–$0.7\ \mathrm{nm}$). (Enter $\Delta\lambda_\mathrm{D}$ in pm.)
::: solution
The derivation is the proof of [[#prop-doppler]]. With $m = 207.2\times1.6605\times10^{-27} = 3.441\times10^{-25}\ \mathrm{kg}$:
$$
\sqrt{\frac{8k_\mathrm{B}T\ln2}{m}} = \sqrt{\frac{8\times1.381\times10^{-23}\times2500\times0.6931}{3.441\times10^{-25}}} = 746\ \mathrm{m\,s^{-1}},
$$
so $\Delta\lambda_\mathrm{D} = 283.3\ \mathrm{nm}\times746/2.998\times10^8 = 7.05\times10^{-4}\ \mathrm{nm} = 0.70\ \mathrm{pm}$. The monochromator bandwidth is about $300$–$1000$ times larger; only a line source can match the absorption line.
:::
:::

::: exercise The ionisation suppressor {level=3 check="0.013"}
Using the model of [[#ex-ionisation]] ($S = 1.3\times10^{16}\ \mathrm{m^{-3}}$ for sodium), show that the fraction ionised is $S/(S + n_\mathrm{e})$. If a sample contains enough of an easily ionised matrix element to raise $n_\mathrm{e}$ from $1.0\times10^{16}$ to $3.0\times10^{16}\ \mathrm{m^{-3}}$, by what factor does the sodium atomic absorption signal change? Then find the fraction ionised when an excess of caesium fixes $n_\mathrm{e}$ at $1.0\times10^{18}\ \mathrm{m^{-3}}$. (Enter that fraction.)
::: hint
The absorption signal is proportional to the fraction of sodium present as neutral atoms, $n_\mathrm{e}/(S + n_\mathrm{e})$.
:::
::: solution
From [[#eq-saha]], $n_{\mathrm{Na^+}}/n_{\mathrm{Na}} = S/n_\mathrm{e}$; the fraction ionised is $(S/n_\mathrm{e})/(1 + S/n_\mathrm{e}) = S/(S + n_\mathrm{e})$. Neutral fraction: $1.0/2.3 = 0.435$ at $n_\mathrm{e} = 1.0\times10^{16}$ and $3.0/4.3 = 0.698$ at $3.0\times10^{16}$, so the signal *rises* by a factor of $1.60$ in the sample relative to the standards — a $60\ \%$ positive error. With caesium in excess in all solutions, the fraction ionised is $1.3\times10^{16}/1.013\times10^{18} = 0.013$, and a modest change in the sample's own contribution to $n_\mathrm{e}$ barely matters.
:::
:::
