A piece of charcoal from an archaeological hearth can be dated to within a few centuries by counting the decays of a single rare isotope it contains; a hospital can order a vial of technetium-99m on a Monday morning knowing it will have decayed almost away by Friday; and the Sun has shone for four and a half billion years by fusing hydrogen into helium at its centre. All three facts rest on the same strange property of atomic nuclei: certain combinations of protons and neutrons are not stable, and they decay by their own clock — a clock no chemist, no furnace and no pressure can stop or hurry. Nuclear chemistry is the chemistry of that clock and of the enormous energies it keeps.

The scale of the energies is what makes the nucleus different in kind from the electron cloud. Burning a kilogram of coal releases about $2.4\times10^{7}\ \mathrm{J}$; fissioning a kilogram of uranium-235 releases about $8\times10^{13}\ \mathrm{J}$, three and a half million times more, because the forces inside the nucleus are nuclear, not electrostatic, and the mass changes they produce are finally large enough to weigh. Everything in this chapter — the decay laws, the binding-energy curve, reactors and radiocarbon dates — follows from two ideas: that nuclei are held together by an energy that shows up as a measurable mass defect, and that radioactive decay is a first-order process of the kind you met in [[general-chemistry-2/rates-intro]], only governed by nuclear rather than chemical physics.

## The chart of the nuclides

::: definition Nuclides, isotopes and isobars {#def-nuclide}
A **nuclide** is a nuclear species specified by its proton number $Z$ (the element) and its neutron number $N$; its **nucleon number** or mass number is $A = Z + N$, and we write it as ${}^{A}_{\ Z}\mathrm{X}$, so uranium-238 is ${}^{238}_{\ 92}\mathrm{U}$. **Isotopes** are nuclides with the same $Z$ and different $N$ ($^{12}\mathrm{C}$, $^{13}\mathrm{C}$, $^{14}\mathrm{C}$); **isobars** have the same $A$ and different $Z$ ($^{14}\mathrm{C}$ and $^{14}\mathrm{N}$); **isotones** have the same $N$. Chemical behaviour is fixed almost entirely by $Z$ and the electrons, so isotopes of one element are chemically nearly identical — which is exactly why a radioactive isotope can be used as a tracer for a stable one.
:::

::: proposition The band of stability {#prop-band}
Of the roughly three thousand known nuclides, only about two hundred and fifty are stable. Plotted as $N$ against $Z$ they fall along a narrow **band of stability**: for light nuclides the band follows $N \approx Z$, but it bends above that line, reaching $N/Z \approx 1.5$ near bismuth ($Z = 83$), because the growing Coulomb repulsion between the protons demands extra neutrons — which contribute attraction but no repulsion — to hold the nucleus together. No nuclide with $Z > 83$ is stable, and no nuclide with $Z > 92$ (uranium) occurs in significant quantity in nature. Nuclides above the band are neutron-rich and decay by $\beta^-$ emission; those below it are proton-rich and decay by $\beta^+$ emission or electron capture; the heaviest of all eject $\alpha$ particles.
:::

The band is an empirical pattern — it is summarised, not derived, at this level; its ultimate explanation is the quantum mechanics of the nuclear force. Notice what it already tells you: the elements of everyday life (C, N, O, Fe) sit on the $N \approx Z$ line or close to it, while every naturally radioactive nuclide — uranium, radium, potassium-40 — sits far from it, and its position tells you, qualitatively, how it will die.

::: quiz
Why does the band of stability bend towards neutron excess as $Z$ grows?
- [x] Protons repel one another electrically across the whole nucleus, while the attractive nuclear force is short-ranged, so extra neutrons add attraction without adding repulsion.
- [ ] Neutrons become lighter than protons at high $Z$, so nature prefers them.
- [ ] The strong force changes sign above $Z = 20$.
- [ ] Heavy nuclei need neutrons to increase the number of electron shells.
::: solution
The Coulomb energy of the proton gas grows roughly as $Z^2$ and acts over all distances, whereas each nucleon only attracts its nearest neighbours through the short-range nuclear force. Adding neutrons therefore dilutes the electrical repulsion per unit of nuclear attraction, and the stable ratio $N/Z$ climbs from $1$ to about $1.5$.
:::
:::

## The modes of radioactive decay

::: definition The decay modes {#def-decay-modes}
**Alpha decay** ejects a helium-4 nucleus: ${}^{A}_{\ Z}\mathrm{X} \rightarrow {}^{A-4}_{\ Z-2}\mathrm{Y} + {}^{4}_{2}\mathrm{He}$. **Beta-minus decay** converts a neutron into a proton, ejecting an electron and an antineutrino: $\mathrm{n} \rightarrow \mathrm{p} + \mathrm{e}^- + \bar{\nu}_\mathrm{e}$, so $Z$ rises by one at constant $A$. **Beta-plus decay** converts a proton into a positron and a neutrino, lowering $Z$ by one; **electron capture** does the same by absorbing an inner electron, $\mathrm{p} + \mathrm{e}^- \rightarrow \mathrm{n} + \nu_\mathrm{e}$. **Gamma emission** ejects a high-energy photon from an excited nuclear state and changes neither $Z$ nor $A$; it usually follows another decay that left the daughter excited. The neutrino (or antineutrino) is emitted because energy, momentum and angular momentum are observed not to balance without it.
:::

::: proposition Conservation of nucleon number and charge {#prop-conservation}
In every nuclear equation the total nucleon number $A$ and the total charge number $Z$ balance on the two sides (charge balance is exact once the electron's $Z = -1$ is counted). This bookkeeping identifies the daughter nuclide from the parent and the radiation, and it is the whole of the arithmetic of nuclear equations: an $\alpha$ emission lowers $A$ by $4$ and $Z$ by $2$; a $\beta^-$ emission raises $Z$ by $1$ at constant $A$; a $\beta^+$ emission or electron capture lowers $Z$ by $1$.
:::

::: example Balancing an alpha decay {#ex-balance-alpha}
Write the equation for the $\alpha$ decay of ${}^{238}_{\ 92}\mathrm{U}$, and then determine how many $\alpha$ and $\beta^-$ decays connect ${}^{238}_{\ 92}\mathrm{U}$ to the stable ${}^{206}_{\ 82}\mathrm{Pb}$ at the end of its series.
::: solution
An $\alpha$ particle is ${}^{4}_{2}\mathrm{He}$, so the daughter has $A = 238 - 4 = 234$ and $Z = 92 - 2 = 90$, the element thorium:
$$
{}^{238}_{\ 92}\mathrm{U} \rightarrow {}^{234}_{\ 90}\mathrm{Th} + {}^{4}_{2}\mathrm{He}.
$$
For the whole series, let there be $n_\alpha$ alpha and $n_\beta$ beta-minus decays. Nucleon number gives $238 - 4n_\alpha = 206$, hence $n_\alpha = 8$. Charge then gives $92 - 2\times 8 + n_\beta = 82$, hence $n_\beta = 6$. The uranium series is thus eight $\alpha$ and six $\beta^-$ decays — a fact you can read off a chart of the nuclides without memorising the chain.
:::
:::

::: warning Nuclear rates are not chemical rates {#warn-unchanging}
The decay constant $\lambda$ of a nuclide is fixed by the nucleus and is, to first order, completely unaffected by temperature, pressure, particle size or chemical bonding. Heating a gram of $^{226}\mathrm{Ra}$ a thousand kelvin, dissolving it in acid or pressing it into a metal does not measurably change its half-life — the exact opposite of everything you learned about rate constants in [[general-chemistry-2/rates-intro]], where a $10\ \mathrm{K}$ rise can double the rate. The reason is energy scale: chemical environments perturb nuclear energy levels by electronvolts or less, while decays involve megaelectronvolts. (The one honest exception is electron capture, whose rate depends slightly on the electron density at the nucleus and can shift by a few tenths of a per cent between chemical states.) This invariance is precisely what makes nuclear clocks usable as clocks.
:::

## The law of radioactive decay

::: definition Activity {#def-activity}
The **activity** $A_\mathrm{act}$ of a radioactive sample is its number of decays per unit time,
$$
A_\mathrm{act} = -\frac{\mathrm{d}N}{\mathrm{d}t} = \lambda N,
$$
where $N$ is the number of radioactive nuclei and $\lambda$ the **decay constant**. The SI unit is the **becquerel** ($\mathrm{Bq} = 1\ \mathrm{s^{-1}}$); the older **curie** is $3.7\times10^{10}\ \mathrm{Bq}$, the activity of one gram of radium. Because $N$ is enormous, even "tiny" activities represent nuclei decaying one at a time at random, uncorrelated instants.
:::

::: proposition The decay law {#prop-decay-law}
Radioactive decay is a first-order process: the number of nuclei remaining after time $t$ is
$$
N = N_0\,\mathrm{e}^{-\lambda t},
$$
the half-life is $t_{1/2} = \dfrac{\ln 2}{\lambda}$, independent of how much material you start with, and the mean lifetime is $\tau = 1/\lambda$. The activity falls with the same exponential, $A_\mathrm{act} = \lambda N_0\,\mathrm{e}^{-\lambda t}$.
:::

::: proof
The defining assumption is that each nucleus has the same constant probability $\lambda\,\mathrm{d}t$ of decaying in the next $\mathrm{d}t$, whatever its age and whatever its neighbours are doing (nuclei do not "wear out"). Then the expected number of decays in $\mathrm{d}t$ is proportional to the number present, $-\mathrm{d}N = \lambda N\,\mathrm{d}t$. Separating variables and integrating from $N_0$ at $t = 0$ to $N$ at $t$,
$$
\int_{N_0}^{N} \frac{\mathrm{d}N}{N} = -\lambda \int_0^t \mathrm{d}t
\quad\Longrightarrow\quad
\ln\frac{N}{N_0} = -\lambda t,
$$
which is the decay law. Setting $N/N_0 = \tfrac12$ gives $t_{1/2} = \ln 2/\lambda$; the factor $\ln 2$ is the same one that appears in the first-order integrated rate law of [[general-chemistry-2/rates-intro]] because the mathematics is identical. The mean lifetime follows from $\tau = \int_0^\infty t\,\lambda\,\mathrm{e}^{-\lambda t}\,\mathrm{d}t = 1/\lambda$.
:::

::: widget plot
f: 0.5^(x/h)
x: 0, 40000
y: 0, 1.05
sliders: h=5730:1000:10000:100
labels: \text{fraction of nuclei remaining}
caption: The decay law in the form $N/N_0 = (1/2)^{x/h}$, where the slider $h$ is the half-life in years and $x$ the elapsed time. Drag $h$ to $5730$ (carbon-14) and read off that after $17\,190$ years — three half-lives — one eighth of the original $^{14}\mathrm{C}$ remains. The curve is the same exponential you plotted for first-order reactions; only the clock is nuclear.
:::

::: example The activity of a gram of uranium {#ex-activity-gram}
Find the activity of $1.00\ \mathrm{g}$ of pure ${}^{238}\mathrm{U}$ ($t_{1/2} = 4.47\times10^{9}\ \mathrm{y}$).
::: solution
The number of atoms is
$$
N = \frac{1.00\ \mathrm{g}}{238.05\ \mathrm{g\,mol^{-1}}} \times 6.022\times10^{23}\ \mathrm{mol^{-1}} = 2.53\times10^{21},
$$
and the decay constant, converted to seconds, is
$$
\lambda = \frac{\ln 2}{4.47\times10^{9}\ \mathrm{y} \times 3.156\times10^{7}\ \mathrm{s\,y^{-1}}} = 4.92\times10^{-18}\ \mathrm{s^{-1}}.
$$
Therefore $A_\mathrm{act} = \lambda N = 1.24\times10^{4}\ \mathrm{s^{-1}} = 1.24\times10^{4}\ \mathrm{Bq}$: twelve thousand decays every second from a single gram, and each decay is the first step of the series that ends at lead-206. A long half-life means a *low* activity per gram — the same number of atoms of a day-lived isotope would be millions of times more active.
:::
:::

::: example Why medical isotopes are short-lived {#ex-tc99m}
Technetium-99m ($t_{1/2} = 6.01\ \mathrm{h}$) is the workhorse of diagnostic nuclear medicine. What fraction of a prepared dose remains after $24.0\ \mathrm{h}$, and why is a half-life of hours — not days, not years — what a tracer needs?
::: solution
$$
\frac{N}{N_0} = \left(\frac{1}{2}\right)^{24.0/6.01} = \left(\frac{1}{2}\right)^{3.99} = 0.063,
$$
six per cent. The choice of half-life is a trade-off: long enough that the dose survives preparation, transport and the imaging scan, short enough that the patient's total radiation exposure decays away within a day. Iodine-131 ($t_{1/2} = 8.02\ \mathrm{d}$) sits at the other end of the medical range because a therapy isotope must deliver its dose over days inside the thyroid. The decay constant of $^{99m}\mathrm{Tc}$ is $\lambda = \ln 2 / 6.01\ \mathrm{h} = 0.115\ \mathrm{h^{-1}}$.
:::
:::

::: warning Half-lives are statistical, not promises {#warn-halflife}
"After two half-lives nothing is left" is wrong twice over. First, the exponential never reaches zero: after $n$ half-lives a fraction $2^{-n}$ remains, so after ten half-lives one nucleus in a thousand of the original population is still there. Second, the law counts *expectations*: with a handful of atoms the actual number remaining fluctuates binomially, and a single nucleus either decays in the next half-life or it does not — the half-life is not a countdown timer attached to each atom. For macroscopic samples the relative fluctuation is of order $1/\sqrt{N}$, utterly negligible; for the small samples of modern single-atom mass spectrometry it is the whole subject.
:::

::: example Radiocarbon dating {#ex-c14}
Charcoal from a hearth contains $79.5\%$ of the $^{14}\mathrm{C}$ activity of modern carbon. Date the charcoal, and estimate how a $\pm 3\%$ uncertainty in the measured fraction propagates into the age.
::: solution
Living carbon carries about $0.23\ \mathrm{Bq}$ of $^{14}\mathrm{C}$ per gram of carbon, maintained by cosmic-ray production in the atmosphere; when the tree dies, the supply stops and the isotope decays with $t_{1/2} = 5730\ \mathrm{y}$, $\lambda = 1.21\times10^{-4}\ \mathrm{y^{-1}}$. From $N/N_0 = \mathrm{e}^{-\lambda t}$,
$$
t = \frac{1}{\lambda}\ln\frac{N_0}{N} = \frac{\ln(1/0.795)}{1.21\times10^{-4}\ \mathrm{y^{-1}}} = 1.90\times10^{3}\ \mathrm{y}.
$$
Differentiating $t = -\lambda^{-1}\ln(N/N_0)$ gives $|\delta t| = \delta f/(\lambda f) = 0.03/(1.21\times10^{-4}\times 0.795) \approx 310\ \mathrm{y}$: a $3\%$ counting error is worth about three centuries. The method's assumptions — a constant atmospheric $^{14}\mathrm{C}$ level, a closed sample, no exchange with groundwater — are why dates are calibrated against tree rings, and why the useful range ends near $5\times10^{4}$ years, where less than $0.2\%$ of the original activity remains. Potassium-argon ($t_{1/2} = 1.25\times10^{9}\ \mathrm{y}$ for $^{40}\mathrm{K}$) and the uranium–lead clocks extend the same first-order arithmetic to rocks and to the age of the Earth itself.
:::
:::

::: widget newton
f: 0.5^(x/5730) - 0.795
x0: 2000
caption: Newton's method solving the radiocarbon equation $(1/2)^{t/5730} = 0.795$ of the worked example: the root is the age $t \approx 1.9\times10^{3}$ years. The same iteration handles any "solve for $t$" decay problem, including the layered ones where production and decay occur together.
:::

## Binding energy: why iron is the summit

::: proposition Mass defect and binding energy {#prop-mass-defect}
The mass of a nucleus is *less* than the sum of the masses of its $Z$ protons and $N$ neutrons. The difference, the **mass defect** $\Delta m$, corresponds through $E = \Delta m\,c^2$ to the **binding energy** $E_\mathrm{B}$ — the energy you must supply to pull the nucleus apart into free nucleons. With $1\ \mathrm{u} = 1.66054\times10^{-27}\ \mathrm{kg}$ and $c = 2.998\times10^{8}\ \mathrm{m\,s^{-1}}$, one unified mass unit is worth $1\ \mathrm{u}\,c^2 = 931.5\ \mathrm{MeV}$. The **binding energy per nucleon** $E_\mathrm{B}/A$ rises steeply from hydrogen to a broad maximum of about $8.8\ \mathrm{MeV}$ near iron-56, then falls gently to about $7.6\ \mathrm{MeV}$ at uranium-238. Both ends of the curve are sources of energy: heavy nuclei release energy by splitting toward the maximum (fission), light nuclei by fusing toward it (fusion), and iron-peak nuclei — the ash of both processes — release energy by nothing at all.
:::

::: example The binding energy of the alpha particle {#ex-he4}
Using $m({}^{1}\mathrm{H}) = 1.00783\ \mathrm{u}$, $m_\mathrm{n} = 1.00866\ \mathrm{u}$ and $m({}^{4}\mathrm{He}) = 4.00260\ \mathrm{u}$, find the binding energy of ${}^{4}\mathrm{He}$ and the energy equivalent in joules per mole of helium.
::: solution
The mass defect is
$$
\Delta m = 2(1.00783) + 2(1.00866) - 4.00260 = 0.03038\ \mathrm{u},
$$
so
$$
E_\mathrm{B} = 0.03038\ \mathrm{u} \times 931.5\ \mathrm{MeV\,u^{-1}} = 28.30\ \mathrm{MeV},
$$
or $7.07\ \mathrm{MeV}$ per nucleon — anomalously high for so light a nucleus, which is why the $\alpha$ particle is the projectile of choice for heavy-element decay. In chemical units, $28.30\ \mathrm{MeV}$ per nucleus is $28.30\times10^{6} \times 1.602\times10^{-19}\ \mathrm{J} \times 6.022\times10^{23}\ \mathrm{mol^{-1}} \approx 2.7\times10^{9}\ \mathrm{kJ\,mol^{-1}}$: a million times a strong chemical bond, per mole.
:::
:::

::: widget plot
f: 15.75 - 17.8*x^(-1/3) - 0.711*(x/(2+0.015*x^(2/3)))*((x/(2+0.015*x^(2/3)))-1)*x^(-4/3) - 23.7*(x-2*(x/(2+0.015*x^(2/3))))^2/x^2
x: 1, 250
y: 0, 10
points: 4, 7.07; 56, 8.79; 235, 7.59
labels: \text{liquid-drop fit to } B/A
caption: The curve of binding energy per nucleon, drawn as a liquid-drop (semi-empirical mass) fit with the proton number of the most stable isobar at each $A$; the marked points are the measured values for ${}^{4}\mathrm{He}$, ${}^{56}\mathrm{Fe}$ and ${}^{235}\mathrm{U}$. The fit reproduces the maximum near iron and the slow decline to uranium, but underbinds the lightest nuclei — the very light end is dominated by shell effects the smooth formula misses. Fission moves a uranium nucleus from $7.6$ to about $8.5\ \mathrm{MeV}$ per nucleon; deuterium–tritium fusion moves nucleons from about $1.1$ to $7.1$; both slide downhill on this curve, and the difference in height is the energy released.
:::

::: example Fission and fusion, in joules {#ex-fission-fusion}
Fission of one ${}^{235}\mathrm{U}$ nucleus releases about $200\ \mathrm{MeV}$. Find the energy per kilogram of uranium-235 and compare it with the $2.4\times10^{7}\ \mathrm{J\,kg^{-1}}$ of coal. Then find the energy per nucleon of the fusion reaction ${}^{2}\mathrm{H} + {}^{3}\mathrm{H} \rightarrow {}^{4}\mathrm{He} + {}^{1}\mathrm{n}$ using $m({}^{2}\mathrm{H}) = 2.01410\ \mathrm{u}$ and $m({}^{3}\mathrm{H}) = 3.01605\ \mathrm{u}$, and compare it with fission per nucleon.
::: solution
Two hundred MeV is $200 \times 1.602\times10^{-13}\ \mathrm{J} = 3.20\times10^{-11}\ \mathrm{J}$ per nucleus. One kilogram contains $1000/235.04 \times 6.022\times10^{23} = 2.56\times10^{24}$ nuclei, so
$$
E = 3.20\times10^{-11}\ \mathrm{J} \times 2.56\times10^{24} = 8.2\times10^{13}\ \mathrm{J\,kg^{-1}},
$$
about $3.4\times10^{6}$ times the energy of coal — which is why a reactor the size of a coal plant's conveyor belt runs on fuel the size of its shovel. For fusion, the mass defect is
$$
\Delta m = 2.01410 + 3.01605 - 4.00260 - 1.00866 = 0.01889\ \mathrm{u},
$$
giving $Q = 0.01889 \times 931.5 = 17.6\ \mathrm{MeV}$ per reaction. Spread over the five participating nucleons that is $3.5\ \mathrm{MeV}$ per nucleon, four times fission's $200/235 = 0.85\ \mathrm{MeV}$ per nucleon. Fusion wins per kilogram because it starts so far down the binding-energy curve; the engineering difficulty is that the Coulomb barrier demands temperatures of $10^{8}\ \mathrm{K}$.
:::
:::

## The nucleus in society

**Fission reactors** sustain a controlled chain reaction: each fission of ${}^{235}\mathrm{U}$ releases two or three neutrons, at least one of which must cause another fission for the reaction to be self-sustaining. A **moderator** (light water, heavy water or graphite) slows the neutrons, because slow neutrons fission ${}^{235}\mathrm{U}$ far more readily, and **control rods** of neutron-absorbing material (boron, cadmium, hafnium) adjust the multiplication factor to exactly one. The heat, not the fission itself, is what the plant sells: it drives steam turbines exactly as a coal furnace does, which is why the reactor is a heat source with a nuclear heart. The waste problem is real and dated: spent fuel contains fission products with half-lives of decades (caesium-137, strontium-90) and minor actinides with half-lives of millennia, and as of 2026 the only licensed deep geological repository for civilian spent fuel is at Olkiluoto in Finland, licensed in 2023.

**Fusion** powers the Sun (the proton–proton chain) and is the subject of enormous research effort; deuterium is effectively unlimited in sea water, and fusion makes no long-lived actinide waste, but confining a $10^{8}\ \mathrm{K}$ plasma economically remains unsolved at the level of net electricity.

::: warning Irradiation is not contamination {#warn-irradiation}
Passing an object or a food through $\gamma$ radiation deposits energy and kills microbes; it does not make the object radioactive, because the photons and neutrons of a properly designed irradiator or radiotherapy beam do not transmute its nuclei in any significant amount. Confusing the *source* of radiation with *contamination* by radioactive material is the root of most public fear of nuclear technology: a contaminated object carries the unstable atoms themselves and must be decontaminated, while an irradiated one carries nothing. Equally, "radiation" is not one hazard: a sheet of paper stops $\alpha$ particles but an $\alpha$ emitter *inside* the body — inhaled or swallowed — is far more damaging than the same activity outside, because the short range concentrates the energy in a few cell layers.
:::

Radiation dose is measured in layers. **Activity** (becquerel) counts decays; the **absorbed dose** (gray, $\mathrm{Gy} = 1\ \mathrm{J\,kg^{-1}}$) counts energy deposited per kilogram; the **effective dose** (sievert, $\mathrm{Sv}$) weights the absorbed dose by radiation type — $\alpha$ radiation does about twenty times the biological damage of $\gamma$ per gray — and by tissue. At the level of hazard categories: high acute doses cause deterministic injury (radiation sickness) whose severity grows with dose above a threshold, while low doses carry a stochastic risk — a raised probability of cancer and heritable effects years later, assumed in radiation protection to grow with dose with no threshold. For honest perspective, natural background — mostly radon from the ground, plus cosmic rays and the $^{40}\mathrm{K}$ inside your own body — delivers about $2.4\ \mathrm{mSv}$ per year on average worldwide, and the safety system is built on the principle **ALARA**: keep doses *a*s *l*ow *a*s *r*easonably *a*chievable by limiting time near sources, maximising distance (intensity falls as $1/r^2$), and interposing shielding (paper for $\alpha$, plastic or glass for $\beta$, centimetres of lead or metres of concrete for $\gamma$, and never lead shielding for pure $\beta$ emitters of high energy, where bremsstrahlung X-rays are produced).

::: history
Radioactivity was discovered in 1896 by Henri Becquerel (Becquerel), who found that uranium salts fogged photographic plates through black paper — an atomic property, unrelated to chemical state or to light. Marie and Pierre Curie (Curie) isolated polonium and radium from tonnes of pitchblende in 1898 and coined the word "radioactive". Ernest Rutherford (Rutherford) and Frederick Soddy (Soddy) showed in 1902–1903 that emission transforms one element into another and introduced the half-life; Rutherford had already named the $\alpha$ and $\beta$ rays. James Chadwick (Chadwick)'s neutron in 1932 supplied both the missing nuclear constituent and, being uncharged, the ideal projectile for transmutation — Enrico Fermi (Fermi)'s group bombarded most of the periodic table with it in 1934. In 1938 Otto Hahn (Hahn) and Fritz Strassmann (Strassmann) found barium among uranium's neutron-bombardment products, and Lise Meitner (Meitner) and Otto Frisch (Frisch) interpreted it as the splitting of the nucleus, naming fission after the division of a cell. George Gamow (Gamow), and independently Ronald Gurney and Edward Condon, explained $\alpha$ decay in 1928 as quantum tunnelling — the first triumph of wave mechanics inside the nucleus, and the link to [[quantum-chemistry/quantum-foundations]]; the shape of the binding-energy curve was accounted for in 1935 by the liquid-drop semi-empirical mass formula of Carl Friedrich von Weizsäcker (Weizsäcker).
:::

## Where this leads

Decay kinetics are first-order kinetics with a nuclear clock — the integrated laws, half-lives and exponential plots of [[general-chemistry-2/rates-intro]] apply unchanged. The mass–energy relation reappears in [[general-chemistry-2/entropy-free-energy]] as the reminder that energy and mass balance are the same ledger; isotope masses and the mole arithmetic of this chapter build on [[general-chemistry-1/atoms-and-moles]]; $\alpha$ decay is tunnelling, worked out in [[quantum-chemistry/quantum-foundations]]; and the natural radioactivity that dominates everyone's radiation dose — radon, $^{40}\mathrm{K}$, cosmic rays — is part of [[environmental-chemistry/earth-system-chemistry]].

::: summary
- A nuclide is defined by $Z$ and $N$; stable nuclides lie on a narrow band that bends to neutron excess ($N/Z \approx 1.5$) at high $Z$, and nothing with $Z > 83$ is stable.
- Decay modes: $\alpha$ lowers $A$ by 4 and $Z$ by 2; $\beta^-$ raises $Z$ by 1; $\beta^+$ and electron capture lower $Z$ by 1; $\gamma$ changes neither — balance $A$ and $Z$ and the equation writes itself.
- Decay is first order: $N = N_0 e^{-\lambda t}$, $t_{1/2} = \ln 2/\lambda$, activity $A = \lambda N$; the half-life is fixed by the nucleus and not by chemistry, temperature or pressure.
- Radiometric dating is the decay law read backwards; radiocarbon reaches about $5\times10^{4}$ years, uranium–lead and potassium–argon the age of the Earth.
- Binding energy per nucleon peaks near iron-56 at $8.8\ \mathrm{MeV}$; fission of heavy nuclei and fusion of light ones both move up the curve, releasing $0.85$ and up to $3.5\ \mathrm{MeV}$ per nucleon respectively.
- A kilogram of uranium-235 carries $8\times10^{13}\ \mathrm{J}$, millions of times chemical fuel; reactors are heat engines whose fuel is a controlled chain reaction, and the waste is a millennia-scale engineering problem.
- Dose is activity, then energy (gray), then weighted risk (sievert); natural background dwarfs most artificial sources, and protection rests on time, distance, shielding and ALARA.
:::

## Exercises

::: exercise Completing a nuclear equation {level=1}
${}^{234}_{\ 90}\mathrm{Th}$ decays by $\beta^-$ emission. Write the equation and identify the daughter.
::: solution
$\beta^-$ emission raises $Z$ by one at constant $A$:
$$
{}^{234}_{\ 90}\mathrm{Th} \rightarrow {}^{234}_{\ 91}\mathrm{Pa} + {}^{0}_{-1}\mathrm{e} + \bar{\nu}_\mathrm{e}.
$$
The daughter is protactinium-234. (The antineutrino carries away spin and part of the energy but neither $A$ nor $Z$.)
:::
:::

::: exercise Fraction remaining {level=1 check="12.5"}
Iodine-131 has $t_{1/2} = 8.02\ \mathrm{d}$. What fraction of a sample remains after $24.06\ \mathrm{d}$? (Enter the percentage.)
::: solution
$24.06/8.02 = 3.00$ half-lives, so the fraction is $(1/2)^3 = 0.125$, i.e. $12.5\%$.
:::
:::

::: exercise Decay constant {level=1 check="0.115"}
Technetium-99m has $t_{1/2} = 6.01\ \mathrm{h}$. Find its decay constant. (Enter $\lambda$ in $\mathrm{h^{-1}}$.)
::: solution
$\lambda = \ln 2 / t_{1/2} = 0.693/6.01 = 0.115\ \mathrm{h^{-1}}$.
:::
:::

::: exercise Activity of a gram {level=2 check="12400"}
Find the activity of $1.00\ \mathrm{g}$ of ${}^{238}\mathrm{U}$ ($t_{1/2} = 4.47\times10^{9}\ \mathrm{y}$). (Enter the activity in Bq.)
::: solution
$N = 6.022\times10^{23}/238.05 = 2.53\times10^{21}$ atoms and $\lambda = \ln 2/(4.47\times10^{9}\times3.156\times10^{7}\ \mathrm{s}) = 4.92\times10^{-18}\ \mathrm{s^{-1}}$, so $A = \lambda N = 1.24\times10^{4}\ \mathrm{Bq}$. Long half-life, modest activity — activity per gram is inversely proportional to half-life at fixed molar amount.
:::
:::

::: exercise Counting a decay series {level=2 check="8"}
How many $\alpha$ decays occur in the series ${}^{235}_{\ 92}\mathrm{U} \rightarrow {}^{207}_{\ 82}\mathrm{Pb}$? (Enter the number of $\alpha$ particles.)
::: solution
Nucleon number: $235 - 207 = 28 = 4n_\alpha$, so $n_\alpha = 8$. Charge then requires $92 - 16 + n_\beta = 82$, so $n_\beta = 6$ $\beta^-$ decays as well — but only the eight $\alpha$ particles were asked for.
:::
:::

::: exercise A radiocarbon date {level=2 check="1900"}
A wooden artefact shows $79.5\%$ of the modern $^{14}\mathrm{C}$ activity. Date it. (Enter the age in years; take $t_{1/2} = 5730\ \mathrm{y}$.)
::: solution
$t = \lambda^{-1}\ln(N_0/N) = (5730/\ln 2)\times\ln(1/0.795) = 8258\times0.2295 = 1.90\times10^{3}\ \mathrm{y}$.
:::
:::

::: exercise Binding energy of the alpha particle {level=3 check="7.07"}
Using $m({}^{1}\mathrm{H}) = 1.00783\ \mathrm{u}$, $m_\mathrm{n} = 1.00866\ \mathrm{u}$, $m({}^{4}\mathrm{He}) = 4.00260\ \mathrm{u}$ and $1\ \mathrm{u}\,c^2 = 931.5\ \mathrm{MeV}$, find the binding energy per nucleon of ${}^{4}\mathrm{He}$. (Enter the answer in MeV per nucleon.)
::: solution
$\Delta m = 2(1.00783) + 2(1.00866) - 4.00260 = 0.03038\ \mathrm{u}$; $E_\mathrm{B} = 0.03038\times931.5 = 28.30\ \mathrm{MeV}$; per nucleon $28.30/4 = 7.07\ \mathrm{MeV}$. High for a light nucleus — the doubly magic $\alpha$ particle is unusually tightly bound, which is why it is emitted whole.
:::
:::

::: exercise Fission fuel {level=3 check="8.2"}
Fission of one ${}^{235}\mathrm{U}$ nucleus releases $200\ \mathrm{MeV}$. Find the energy released per kilogram of uranium-235. (Enter the answer in units of $10^{13}\ \mathrm{J\,kg^{-1}}$.)
::: solution
Per nucleus, $200\ \mathrm{MeV} = 3.20\times10^{-11}\ \mathrm{J}$; per kilogram, $N = (1000/235.04)\times6.022\times10^{23} = 2.56\times10^{24}$ nuclei, so $E = 8.2\times10^{13}\ \mathrm{J\,kg^{-1}}$. Against coal's $2.4\times10^{7}\ \mathrm{J\,kg^{-1}}$ that is a factor of $3.4\times10^{6}$: the whole difference between a fuel that is mined in trains and one that is carried in a pocket.
:::
:::

::: exercise Fusion versus fission, per nucleon {level=3 check="17.6"}
For ${}^{2}\mathrm{H} + {}^{3}\mathrm{H} \rightarrow {}^{4}\mathrm{He} + {}^{1}\mathrm{n}$, with $m({}^{2}\mathrm{H}) = 2.01410\ \mathrm{u}$, $m({}^{3}\mathrm{H}) = 3.01605\ \mathrm{u}$, $m({}^{4}\mathrm{He}) = 4.00260\ \mathrm{u}$, $m_\mathrm{n} = 1.00866\ \mathrm{u}$, find the energy released per reaction. (Enter the answer in MeV.) Compare the energy per nucleon with fission's $0.85\ \mathrm{MeV}$ per nucleon.
::: solution
$\Delta m = (2.01410 + 3.01605) - (4.00260 + 1.00866) = 0.01889\ \mathrm{u}$, so $Q = 0.01889\times931.5 = 17.6\ \mathrm{MeV}$. Over five nucleons this is $3.5\ \mathrm{MeV}$ per nucleon, four times fission's $0.85$: fusion starts much lower on the binding-energy curve, so each nucleon falls further. The catch is the Coulomb barrier — fusion needs the centre of a star, or its equivalent, to get started.
:::
:::
