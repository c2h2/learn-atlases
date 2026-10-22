Run your eye across the periodic table and count: four-fifths of the elements are metals. Their properties are a list of things the localised bonds of [[bonding-structure/covalent-lewis]] were never built to do. Copper is drawn into kilometres of wire for electrical grids — it conducts, and it *flows* without breaking. Mercury conducts electricity at room temperature while being a *liquid*. Iron glows white in a forge and still holds its shape; sodium, by contrast, melts at $98\ \mathrm{^\circ C}$ in a gentle flame, yet both conduct. And metals shine: a freshly cut surface of sodium or iron mirrors the room, which no arrangement of localised two-electron bonds explains, since localised electrons absorb visible light only at the specific energies of molecular transitions. Conductivity, malleability, lustre, and the sheer *range* of melting points from caesium ($28\ \mathrm{^\circ C}$) to tungsten ($3422\ \mathrm{^\circ C}$) all demand a model in which the valence electrons are not localised between pairs of atoms at all, but belong to the specimen. The oldest such model — the **electron sea**, positive ions marinating in a gas of shared electrons — is a fine first sentence and a poor last one: it cannot say why diamond is an insulator while graphite conducts, why sodium conducts with one electron per atom while diamond "should" conduct with four, or why a crystal of pure, perfect periodicity does not scatter its electrons at all. The correct language is band theory: the molecular orbitals of [[bonding-structure/molecular-orbitals]], let run to Avogadro's number.

## Bands: molecular orbitals of a giant molecule

Take the LCAO machinery of [[bonding-structure/molecular-orbitals]] to its logical extreme. Two H atoms give two MOs; three give three; a thousand give a thousand. For a macroscopic crystal, $N \sim 10^{22}$ atoms per centimetre cube each contribute their valence orbitals, and $N$ orbitals make $N$ molecular orbitals — but now the spacing between adjacent levels is of order $10^{-22}\ \mathrm{eV}$, immeasurably small. The discrete levels blur into a **band**.

::: definition Energy bands {#def-band}
An **energy band** is the quasi-continuous set of molecular orbitals formed when $N$ atoms combine $N$ atomic orbitals of one kind: $N$ MOs so closely spaced (level spacing $\sim 1/N$ of the band width, utterly negligible for $N \sim 10^{23}$) that the electrons populate it as if it were a continuum. The **width** of the band — a few electronvolts for typical valence bands — measures how strongly the orbitals overlap: wider for diffuse orbitals and close-packed structures, narrower for tight, localised ones. Inner **core levels**, whose orbitals barely overlap between neighbours, stay sharp: they remain essentially atomic, which is exactly why core-electron spectroscopies still see "carbon $1s$" and "oxygen $1s$" lines in solids. Each band holds $2N$ electrons, two per orbital with opposite spins.
:::

Because each atom typically owns several valence orbitals, each kind of atomic orbital generates its own band — a $3s$ band, three overlapping $3p$ bands — and the whole story of who conducts and who does not is a matter of *how many electrons each band holds and how the bands are filled*.

::: proposition Band filling and conductivity {#prop-band-filling}
Whether a solid conducts at ordinary temperatures is decided by the filling of its bands (conditions: a pure, stoichiometric crystal, temperatures well below those that melt it):

- **Partially filled band $\Rightarrow$ conductor.** An electric field works by nudging electrons into neighbouring, nearly empty states of slightly different momentum. A partially filled band has those states available at arbitrarily small energy cost. Sodium is the type case: its $3s$ band holds $2N$ electrons and contains $N$ — exactly half full.
- **Filled band separated from the next by a large gap $\Rightarrow$ insulator.** Diamond: four valence orbitals per C ($2s + 3 \times 2p$) give bands of total capacity $4N$ electrons, and carbon supplies exactly $4N$ — the bonding (valence) band is *exactly full*, the antibonding (conduction) band empty, separated by a gap of $5.5\ \mathrm{eV}$ (standard tabulated data). No field can nudge anything.
- **Filled band with a small gap $\Rightarrow$ semiconductor.** Thermal energy promotes a small but exponentially growing fraction of electrons across the gap, leaving mobile holes behind. Silicon: $E_\mathrm{g} = 1.1\ \mathrm{eV}$; germanium $0.67\ \mathrm{eV}$; gallium arsenide $1.4\ \mathrm{eV}$ (standard tabulated data at $300\ \mathrm{K}$).
- **Band overlap can metalise an "even" element.** Magnesium's $3s$ band is exactly full ($2N$ electrons) — but in the solid the empty $3p$ band overlaps it energetically, so the two share electrons and the combined system has empty states available. Magnesium conducts; "even number of electrons" is not the criterion, *available states* are.
:::

The filling rules deserve a derivation, not an assertion — including the count that makes all alkali metals conductors and would make all alkaline earths insulators if bands did not overlap.

::: proof Counting states, and the activation law of the intrinsic semiconductor {#proof-band-counting}
**(i) Capacity.** $N$ atoms contribute $N$ atomic orbitals of a given kind; LCAO gives exactly $N$ molecular orbitals (orbital conservation, [[bonding-structure/molecular-orbitals#prop-mo-rules]]); Pauli's principle puts two electrons (opposite spins) in each. One band therefore holds $2N$ electrons. Alkali metals have one valence electron per atom: the $s$ band is half full, and every alkali metal is a conductor — lithium through caesium, no exceptions. Alkaline earths have two: the $s$ band would be exactly full and the solid should be an insulator — and *would* be, if the next band ($p$-like) sat above it. In the real metals the $s$ and $p$ bands overlap, so the two-band system holds $2N$ electrons in $4N$ states: partially filled overall, conducting. The same logic classifies everything: group 14 in the diamond structure has four orbitals and four electrons per atom — a full valence band and a gap, so insulator or semiconductor.

**(ii) The activation law.** In an intrinsic (pure) semiconductor, conduction needs an electron in the upper band, which costs at least the gap $E_\mathrm{g} = E_\mathrm{c} - E_\mathrm{v}$. A Boltzmann statistical argument fixes the number. The population of any state of energy $E$ above the Fermi level falls like $e^{-(E - E_\mathrm{F})/k_\mathrm{B}T}$ (the Fermi–Dirac occupation, [[#def-fermi-dirac]] below, in its high-energy tail), so the electron and hole densities are
$$
n \propto e^{-(E_\mathrm{c} - E_\mathrm{F})/k_\mathrm{B}T}, \qquad p \propto e^{-(E_\mathrm{F} - E_\mathrm{v})/k_\mathrm{B}T}.
$$
Electrons and holes are created in pairs, so $n = p$ and their product is independent of the (unknowable, unimportant) position of $E_\mathrm{F}$:
$$
n^2 = np \propto e^{-(E_\mathrm{c} - E_\mathrm{v})/k_\mathrm{B}T} = e^{-E_\mathrm{g}/k_\mathrm{B}T}
\qquad\Longrightarrow\qquad
n \propto e^{-E_\mathrm{g}/2k_\mathrm{B}T}.
$$
Since conductivity goes as $\sigma \propto n$, a plot of $\ln\sigma$ against $1/T$ is a straight line of slope $-E_\mathrm{g}/2k_\mathrm{B}$ — the standard experimental route to band gaps. For silicon, $E_\mathrm{g}/2k_\mathrm{B} = 0.55\ \mathrm{eV} / 8.617\times10^{-5}\ \mathrm{eV\,K^{-1}} = 6383\ \mathrm{K}$, so at $300\ \mathrm{K}$ the carrier population carries the factor $e^{-6383/300} = e^{-21.3} = 5.7\times10^{-10}$: tiny, which is why pure silicon is a poor conductor — and exponentially *sensitive*, which is why it makes such a good thermistor and such a good transistor once doped.
:::

::: widget plot
f: exp(-6383/x)
x: 250, 450
labels: \text{relative } n_\mathrm{i}(T)
caption: The intrinsic carrier density of silicon predicted by the activation law of [[#proof-band-counting]], $n_\mathrm{i} \propto e^{-E_\mathrm{g}/2k_\mathrm{B}T}$ with $E_\mathrm{g}/2k_\mathrm{B} = 6383\ \mathrm{K}$ (arbitrary units). Do not read the slope — read the *curvature*: this is an exponential, not a ramp. Between $300$ and $330\ \mathrm{K}$ the curve climbs by a factor of $6.9$ ([[#ex-si-ratio]]); between $300$ and $350\ \mathrm{K}$ by more than two orders of magnitude for a wider-gap ceramic. That steepness is why a semiconductor's resistance is a thermometer, why devices must be thermally managed, and why the straight line of $\ln\sigma$ against $1/T$ is how experimentalists actually measure band gaps.
:::

::: definition The Fermi–Dirac distribution {#def-fermi-dirac}
The probability that a one-electron state of energy $E$ is occupied in a system of fermions at temperature $T$ is the **Fermi–Dirac distribution**
$$
f(E) = \frac{1}{e^{(E - E_\mathrm{F})/k_\mathrm{B}T} + 1},
$$
where $E_\mathrm{F}$, the **Fermi energy** (or Fermi level), is the energy at which $f = \tfrac12$ — for a metal, essentially the energy of the highest occupied state at $\mathrm{300\ K}$. At $T = 0$ the distribution is a step: all states below $E_\mathrm{F}$ filled, all above empty. At ordinary temperatures the step smears over a window of a few $k_\mathrm{B}T \approx 0.03\ \mathrm{eV}$ — against a Fermi energy of several electronvolts. Only electrons inside that window have empty states within reach, which is the quiet reason metals conduct as they do and why their electrons add almost nothing to the heat capacity.
:::

::: widget plot
f: 1/(exp((x-5.5)/(0.0259*a))+1)
x: 4.5, 6.5
y: -0.1, 1.1
sliders: a=1:0.5:4
labels: \text{occupation } f(E)
caption: The Fermi–Dirac occupation $f(E) = 1/(e^{(E-E_\mathrm{F})/k_\mathrm{B}T} + 1)$ with $E_\mathrm{F} = 5.5\ \mathrm{eV}$ and the slider $a$ multiplying $k_\mathrm{B}T$ at $300\ \mathrm{K}$ ($0.0259\ \mathrm{eV}$): $a = 1$ is room temperature, $a = 4$ is about $1200\ \mathrm{K}$. At low temperature the curve is a step: everything below $E_\mathrm{F}$ occupied, everything above empty. Slide $a$ up and watch the step smear over a window of a few $k_\mathrm{B}T$. In a metal at $300\ \mathrm{K}$ only electrons in that thin shell near $E_\mathrm{F}$ — a window of a few $k_\mathrm{B}T$ out of a Fermi energy of several electronvolts — have empty states to move into and can respond to a field; the deep sea below is frozen by Pauli. This is why metals conduct *and* why their electrons contribute so little to the heat capacity.
:::

## The consequences, read off the filling

::: example Sodium, magnesium, aluminium: three neighbours, three fillings {#ex-na-mg-al}
Na ($3s^1$), Mg ($3s^2$), Al ($3s^2 3p^1$) are neighbours in period 3. Account for their conductivity, and for the fact that their conductivities rise across the row (at $298\ \mathrm{K}$: $2.1$, $2.3$, $3.5 \times 10^{7}\ \mathrm{S\,m^{-1}}$, standard tabulated data).
::: solution
**Na:** one valence electron per atom fills the $3s$ band half way ($N$ electrons in $2N$ states) — textbook conductor, [[#prop-band-filling]]. **Mg:** two electrons exactly fill the $3s$ band — but the empty $3p$ band overlaps it, so the $2N$ electrons spread over $4N$ states of the combined $s$–$p$ manifold: partially filled, conducting. **Al:** three electrons over $4N$ $s$–$p$ states, likewise partially filled. The rising conductivity across the row follows the rising number of electrons delivered to the partially filled manifold — more carriers per atom — moderated by scattering, which is why the increase is a factor of 1.7, not 3. The lesson of Mg is the one students most often get wrong: it conducts *because of band overlap*, not because "the $3s^2$ electrons are delocalised" as if a full band were a gas.
:::
:::

::: example Down group 14: insulator to metal in five rows {#ex-group14}
Carbon (diamond) is an insulator ($E_\mathrm{g} = 5.5\ \mathrm{eV}$), silicon ($1.1\ \mathrm{eV}$) and germanium ($0.67\ \mathrm{eV}$) are semiconductors, grey tin ($\alpha$-Sn) is a zero-gap semimetal, and lead is a metal. Explain the trend.
::: solution
All five adopt (or derive from) the diamond structure, with four bonding and four antibonding bands per atom, capacity $4N$ filled by $4N$ valence electrons — the question is only the size of the gap between the two sets. Going down the column the valence orbitals ($2s,2p \to 6s,6p$) become steadily more diffuse, overlap between neighbours strengthens, and the bands *widen*. Bonding and antibonding bands that are separated when narrow begin to overlap as they widen, and the gap collapses: $5.5 \to 1.1 \to 0.67 \to 0\ \mathrm{eV}$ (grey tin is a semimetal — a vanishing gap with a touch of band overlap) and finally negative-overlap in lead, a true metal. The same physics in miniature explains why applying pressure to any of them metallises it: squeezing atoms together widens the bands and closes the gap. Chemistry's most familiar column is, read correctly, a continuous film of an insulator becoming a metal.
:::
:::

::: example How fast does silicon's conductivity rise with temperature? {#ex-si-ratio}
Using the activation law of [[#proof-band-counting]], compute the ratio of the conductivity of intrinsic silicon at $330\ \mathrm{K}$ to that at $300\ \mathrm{K}$, taking $E_\mathrm{g} = 1.1\ \mathrm{eV}$ and $k_\mathrm{B} = 8.617\times10^{-5}\ \mathrm{eV\,K^{-1}}$.
::: solution
$$
\frac{\sigma(330)}{\sigma(300)}
= \exp\!\left[ -\frac{E_\mathrm{g}}{2k_\mathrm{B}}\left(\frac{1}{330} - \frac{1}{300}\right) \right]
= \exp\!\left[ -6383 \times (-3.030\times10^{-4}) \right]
= e^{1.934} = 6.9 .
$$
Thirty kelvin — a warm afternoon against a cool one — multiplies the conductivity by nearly seven. Setting the exponent to $\ln 2$ gives a doubling interval of about $10\ \mathrm{K}$ near room temperature, the rule of thumb behind every silicon thermistor. Compare copper over the same $30\ \mathrm{K}$: its resistivity rises by a mere $12\ \%$ (next example). The two slopes in $1/T$ — one gently negative, one steeply positive — are the signature that separates the two families of conductor, and the reason [[#ex-resistivity-trends]] matters in every thermometer.
:::
:::

::: example Why a thermistor's resistance falls while copper's rises {#ex-resistivity-trends}
The resistivity of copper near room temperature follows $\rho(T) = \rho_0\left[1 + \alpha (T - T_0)\right]$ with $\alpha \approx 3.9\times10^{-3}\ \mathrm{K^{-1}}$ (standard tabulated data). Explain, from the band picture, why copper's resistance *rises* with temperature while a metal-oxide thermistor's *falls*.
::: solution
Conductivity is (carrier density) $\times$ (mobility), and the two families live on opposite factors. **Copper:** its carrier density is fixed — the half-full band is set by the electron count, and $k_\mathrm{B}T \approx 0.026\ \mathrm{eV}$ cannot change it — but hotter lattices vibrate more, scattering the electrons sooner (phonons shorten the mean free path). Mobility falls, so $\rho$ rises, linearly to good approximation: over $300 \to 330\ \mathrm{K}$, $\rho$ grows by $3.9\times10^{-3} \times 30 = 12\ \%$. **Thermistor (semiconductor):** mobility also falls with temperature, but it is dwarfed by the exponential explosion of carrier density, $n \propto e^{-E_\mathrm{g}/2k_\mathrm{B}T}$: across $30\ \mathrm{K}$ the carriers multiply by several-fold ([[#ex-si-ratio]]) while mobility drops by tens of percent. Density wins, $\sigma$ rises, $R$ falls — a *negative temperature coefficient*. A copper wire and a thermistor warmed by the same lamp move in opposite directions because one is changing how *easily* its electrons move and the other is changing *how many* there are.
:::
:::

::: quiz
Magnesium has the configuration $3s^2$ — two valence electrons per atom, exactly enough to fill the $3s$ band. Why is magnesium nevertheless a good conductor?
- [x] The empty $3p$ band overlaps the full $3s$ band, so the combined manifold is only half full and has empty states available.
- [ ] The $3s$ electrons are delocalised, and delocalised electrons always conduct.
- [ ] Magnesium atoms ionise at room temperature, and the ions carry the current.
- [ ] The $3s$ band is actually full only at absolute zero, so any heating frees the electrons.
::: solution
Band overlap: $2N$ electrons shared between the $2N$ states of the $3s$ band and the $2N$ states of the overlapping $3p$ band leave the combined system partially filled ([[#prop-band-filling]], [[#ex-na-mg-al]]). Option 2 is the electron-sea slogan, and it is precisely the wrong kind of answer: a *completely full* band, however delocalised its electrons, conducts nothing — there is nowhere for a full band to push. Option 3 confuses ionic conduction (electrolytes) with metallic; option 4 mistakes a band gap for a thermal activation problem that band overlap has already solved.
:::
:::

## Doping: exponential power from one atom in ten million

::: definition n-type and p-type semiconductors {#def-doping}
**Doping** is the deliberate addition of a few impurity atoms that supply carriers far more cheaply than thermal excitation across the gap. Replace a few silicon atoms ($4$ valence electrons) by phosphorus ($5$): four of phosphorus's electrons make the local bonds and the fifth is bound only loosely to its parent ion, creating a **donor** level $0.045\ \mathrm{eV}$ below the conduction-band edge (standard tabulated data) — a hydrogen-like state stretched over many lattice spacings and weakened by silicon's high permittivity. At room temperature ($k_\mathrm{B}T = 0.026\ \mathrm{eV}$) essentially every donor is ionised, each donating a mobile electron: **n-type**, conduction by negative carriers. Substitute boron ($3$ electrons) instead and its empty **acceptor** level, about $0.045\ \mathrm{eV}$ above the valence-band edge, captures electrons from the valence band, leaving mobile holes: **p-type**. One part in $10^6$–$10^8$ of dopant raises the carrier density by six to eight orders of magnitude — and a $p$-$n$ junction, where the two types meet, conducts preferentially in one direction.
:::

That arithmetic — a dopant level $0.045\ \mathrm{eV}$ deep against a gap of $1.1\ \mathrm{eV}$ — is the reason semiconductor physics is a technology and not a curiosity: the carrier density of a device is set by *lithography and dosing*, not by temperature and luck. In December 1947, at the Bell Telephone Laboratories, John Bardeen and Walter Brattain demonstrated a point-contact germanium amplifier, and William Shockley's junction theory made the device — the **transistor** — into an engineering element; the three shared the 1956 Nobel Prize in Physics. Every transistor since, and the billion or more on a single chip, are band theory applied: bands, gaps, donors, acceptors, junctions. The electron sea could never have been switched.

## The transition metals: d bands do the heavy lifting

Main-group metals conduct; transition metals conduct *and* hold. Their bonding adds a second, narrower set of bands from the partially filled $(n-1)d$ orbitals, which overlap the broad $s$–$p$ bands. The $d$ orbitals are compact enough to stay reasonably localised — giving strong, directional, *cohesive* bonding — yet extended enough to form bands, and the bond order logic of [[bonding-structure/molecular-orbitals]] applies with a twist: the $d$ bands hold ten electrons per atom, and filling them from empty toward half-full *raises* cohesion, because bonding $d$ states fill while antibonding ones stay empty. Cohesive energies and melting points therefore climb across the early transition series to a maximum near group 6 — chromium $1907\ \mathrm{^\circ C}$, molybdenum $2623\ \mathrm{^\circ C}$, tungsten $3422\ \mathrm{^\circ C}$, the highest melting point of any metal (standard tabulated data) — and fall again as the antibonding $d$ states begin to fill. The same $d$ bands explain colour in a family of elements everyone calls silvery: copper and gold look the way they do because their filled $d$ bands sit a few electronvolts below the Fermi level, and blue light is absorbed by promoting $d$ electrons into empty states above it (gold's absorption edge is shifted from the ultraviolet into the blue by the relativistic contraction of its $6s$ orbital — one honest sentence on a deep topic). Lustre itself is simpler: the partially filled band reflects any photon below the plasma energy, which for most metals is in the ultraviolet — hence mirrors.

::: warning The electron sea is not the model — three things it cannot say {#warn-electron-sea}
Say "electron sea" once and then retire it. It cannot (i) **distinguish diamond from graphite**: both are carbon with localised-looking bonds, and only band filling plus gap — four electrons in $4N$ states, gap $5.5\ \mathrm{eV}$ for diamond, half-filled $\pi$ bands for graphite — says why one insulates and one conducts (nor why grey tin is a semimetal, [[#ex-group14]]); (ii) **explain why pure metals conduct so well**: a *perfectly periodic* lattice does not scatter Bloch electrons at all — resistance comes from vibrations and defects, not from electrons bumping into ions like marbles, and the mean free path in clean copper at room temperature is tens of nanometres, hundreds of atomic spacings; (iii) **keep two energies apart**: the *band gap* (energy to promote an electron from valence to conduction band, Si $1.1\ \mathrm{eV}$) is not the *work function* (energy to remove an electron from the solid to vacuum, e.g. caesium $\sim 2.1\ \mathrm{eV}$, copper $\sim 4.7\ \mathrm{eV}$) — one is an internal step, the other an escape fee, and confusing them corrupts every photoelectric-effect calculation. Finally, "partially filled band" is not "electrons roam freely like a gas": the carriers are Bloch waves spread over the whole crystal, and only the thin shell near $E_\mathrm{F}$ can move at all (see [[#def-fermi-dirac]]).
:::

::: history
Paul Drude's 1900 electron theory of metals treated the valence electrons as a classical gas — the first "electron sea", and, with its wrong heat capacity, the most instructive failure of the model. The repair came with quantum statistics: Wolfgang Pauli's exclusion principle (1925) told electrons to stack, and Arnold Sommerfeld's 1928 reformulation applied Fermi–Dirac statistics to the metal electron gas, showing that only the electrons near the Fermi energy participate in conduction and in heat capacity — a result that survives unchanged in every solid-state text. In the same year, in his doctoral thesis in Munich, Felix Bloch solved the problem properly: electron waves in a perfectly periodic lattice propagate without scattering, and their allowed energies split into bands separated by gaps — the origin of the band structure this lesson is built on; Alan Herries Wilson's papers of 1931 then used band filling to classify solids as metals, semiconductors and insulators, exactly the scheme above. The practical harvest came in December 1947 at the Bell Telephone Laboratories, where John Bardeen and Walter Brattain built the first transistor and William Shockley's theory generalised it — a device whose very possibility, switching current by raising and lowering a barrier between doped bands, was invisible to the electron sea and obvious to band theory.
:::

## Where this leads

The bands live on a lattice: the structures, packings and unit cells that set the geometry of this lesson are [[bonding-structure/solid-structures]], and their diffraction is [[materials-chemistry/diffraction]]. The band model itself — Brillouin zones, direct and indirect gaps, effective masses, the Fermi surface — is developed in [[materials-chemistry/electronic-structure-solids]], with the crystallography of [[materials-chemistry/crystal-structures]] as its language. And the bridge back is the one built in [[bonding-structure/molecular-orbitals]]: a band is nothing but the MO diagram of a molecule the size of a spoon. Ionic and covalent bonding, meanwhile, are the two limits this lesson's band picture interpolates between — full gaps and shared bands are the same axis, as [[bonding-structure/ionic-bonding]] and [[bonding-structure/covalent-lewis]] prepare.

::: summary
- A band is the quasi-continuum of $N$ molecular orbitals formed from $N$ atomic orbitals; it holds $2N$ electrons, and its width measures orbital overlap.
- Conductors have partially filled bands (Na: $N$ electrons in a $2N$-state $3s$ band); insulators have full bands behind a large gap (diamond, $5.5\ \mathrm{eV}$); semiconductors have small gaps (Si $1.1$, Ge $0.67$, GaAs $1.4\ \mathrm{eV}$).
- Band *overlap* metalises "full-band" elements: Mg conducts because $3s$ and $3p$ bands merge, not because its electrons are free.
- Intrinsic carrier density follows $n \propto e^{-E_\mathrm{g}/2k_\mathrm{B}T}$: silicon's conductivity rises about sevenfold from $300$ to $330\ \mathrm{K}$, doubling every $\sim 10\ \mathrm{K}$.
- Metals and semiconductors have opposite temperature coefficients because heating scatters carriers (mobility down) in both but *creates* them (density up, exponentially) only in the semiconductor.
- Doping puts donor or acceptor levels $\sim 0.045\ \mathrm{eV}$ from a band edge: n-type (P in Si) and p-type (B in Si) are the raw material of the transistor (Bell Labs, 1947).
- Transition-metal cohesion, the group-6 melting-point maximum (W, $3422\ \mathrm{^\circ C}$) and the colours of Cu and Au come from partially filled $d$ bands overlapping the $s$–$p$ bands.
:::

## Exercises

::: exercise Classify by band filling {level=1}
Decide whether each is a conductor, semiconductor or insulator, and justify from the band filling: (a) caesium; (b) sulfur (each S atom contributes two half-filled $3p$ orbitals to $\mathrm{S_8}$ rings, a full valence band with a gap of about $2.6\ \mathrm{eV}$); (c) diamond; (d) GaAs (average four valence electrons per atom, like Si); (e) potassium.
::: solution
(a) Conductor: one $6s$ electron per atom in a $2N$-state band — half full. (b) Insulator: the $\mathrm{S_8}$-ring bonding forms full bands with a $2.6\ \mathrm{eV}$ gap — too large for ordinary thermal population. (c) Insulator: $4N$ electrons exactly fill the $4N$-state valence band, gap $5.5\ \mathrm{eV}$. (d) Semiconductor: III–V average is $3+5 = 8$ electrons per two atoms $= 4$ per atom, isoelectronic with Si, gap $1.4\ \mathrm{eV}$. (e) Conductor: half-filled $4s$ band, like all alkali metals — [[#prop-band-filling]].
:::
:::

::: exercise Counting a full band {level=1 check="4"}
A synthetic diamond crystal contains $1.00\ \mathrm{mol}$ of carbon atoms. Its valence band (the four $sp^3$-bonding bands) is exactly full. How many moles of electrons does the valence band hold? (Enter the number of moles.)
::: solution
The $4N$ valence orbitals of the crystal split into a bonding set of $4N$ states (the valence band) and an antibonding set of $4N$ states (the conduction band). Carbon supplies four electrons per atom, so the valence band holds $4N = 4.00\ \mathrm{mol}$ of electrons for $1.00\ \mathrm{mol}$ of carbon, and the conduction band is empty — the exactly-full-band insulator of [[#prop-band-filling]].
:::
:::

::: exercise The odd-electron theorem {level=1}
Explain why every elemental solid whose primitive cell contains an *odd* number of electrons must be a conductor, and use the argument to classify rubidium; then explain why white phosphorus (molecular $\mathrm{P_4}$, full bands, gap about $2.6\ \mathrm{eV}$) escapes the conclusion.
::: solution
Bands come in capacities of $2N$ electrons: an even number of electrons per cell *can* fill an integer number of bands exactly, but an odd number cannot — $2N$-state bands fill in pairs, so an odd count leaves the top band partially filled, with empty states available at arbitrarily small energy: a metal. Rubidium ($4s^1$, one electron per cell) is therefore a conductor by counting alone. White phosphorus evades the theorem because its electrons are locked into the full localised bonds of the $\mathrm{P_4}$ molecule — full bands, gap, insulator. The theorem reads "odd $\Rightarrow$ metal", never "even $\Rightarrow$ metal", and the escape of $\mathrm{P_4}$ proves that band filling, not electron counting, is the criterion.
:::
:::

::: exercise Germanium by the same slope {level=2 check="3.2"}
Compute the ratio of the intrinsic conductivity of germanium ($E_\mathrm{g} = 0.67\ \mathrm{eV}$) at $330\ \mathrm{K}$ to that at $300\ \mathrm{K}$, using $n \propto e^{-E_\mathrm{g}/2k_\mathrm{B}T}$ and $k_\mathrm{B} = 8.617\times10^{-5}\ \mathrm{eV\,K^{-1}}$. (Enter the ratio.) Why is germanium the worse choice for a high-temperature rectifier?
::: solution
Exponent $= \frac{0.67}{2 \times 8.617\times10^{-5}} \times \left(\frac{1}{300} - \frac{1}{330}\right) = 3887 \times 3.030\times10^{-4} = 1.178$, so the ratio is $e^{1.178} = 3.2$. The smaller gap also means a far larger *absolute* intrinsic carrier density at any temperature: germanium's own doping-free carriers swamp device junctions at temperatures where silicon still behaves, which is why silicon, not germanium, won power electronics.
:::
:::

::: exercise Why tungsten is the filament {level=2}
Tungsten melts at $3422\ \mathrm{^\circ C}$, the highest of all metals; its neighbour rhenium is close, osmium and iridium lower, and caesium melts at $28\ \mathrm{^\circ C}$. Explain the group-6 maximum and tungsten's role in it from the band/d-band picture, and say why the maximum falls where it does.
::: solution
Cohesion in transition metals comes largely from the narrow $d$ bands: with ten $d$ states per atom, filling them from empty raises bond order as long as electrons enter *bonding* $d$ states, and lowers it once *antibonding* $d$ states begin to fill. Bond order peaks at half-filling — group 6, $d^5$ — and so do cohesive energy and melting point: Cr, Mo, W climb the group ($1907$, $2623$, $3422\ \mathrm{^\circ C}$) because $5d$ orbitals overlap better than $4d$ better than $3d$, and W sits at the summit of both effects. Past group 6 the antibonding states fill and cohesion falls toward the noble metals. Caesium, a single $6s$ electron in a broad, half-filled band with no $d$ help, is the other extreme: weakly cohesive, melting below body temperature. Tungsten filaments work because $3422\ \mathrm{^\circ C}$ of bond strength lets the wire run white-hot ($\sim 3000\ \mathrm{K}$) without melting — bond order, literally, at your service.
:::
:::

::: exercise Tin pest, band-theory edition {level=2}
White ($\beta$) tin is a metal; grey ($\alpha$) tin, stable below $13.2\ \mathrm{^\circ C}$, is a zero-gap semimetal with the diamond structure. Tin objects left in cold cathedrals crumble to grey powder ("tin pest"). Using the group-14 trend of [[#ex-group14]], explain (a) why $\alpha$-Sn is not an insulator like diamond, and (b) why the transformation to the denser white form happens under pressure or with warming.
::: solution
(a) $\alpha$-Sn has the diamond structure — $4N$ electrons in $4N$ valence states — so the question is only the gap, and for the diffuse $5s/5p$ orbitals of tin the widened bonding and antibonding bands just touch: gap $0$, a semimetal with a small density of carriers, poor but real conduction. (b) The two forms are nearly equal in energy because the competition is between opening a gap (lowering electronic energy, the grey semimetal) and packing densely (lowering volume energy, the white metal); the gap of $\alpha$-Sn is so small that the electronic prize is tiny. Warming above $13.2\ \mathrm{^\circ C}$ favours the metallic white form, and so does pressure, which favours the denser structure and simultaneously widens the bands — pressure is the general metallising agent. Old tin organ pipes in unheated cathedrals crumbled precisely because the cold made grey tin the stable form; the transformation, once seeded, crept through the metal. A phase boundary run by a closing gap: band theory, in dust form.
:::
:::

::: exercise Derive the capacity, then break a semiconductor {level=3}
(a) Derive from orbital conservation and the Pauli principle the capacity of a band, and state the number of states generated by $N$ atoms of group 14 in the diamond structure and the total capacity of the resulting bands. (b) Estimate the minimum photon energy that can create an electron–hole pair in silicon ($E_\mathrm{g} = 1.1\ \mathrm{eV}$), and explain why pure silicon is transparent to infrared light of wavelength $2.0\ \mu\mathrm{m}$ but opaque to visible green light ($2.35\ \mathrm{eV}$).
::: solution
(a) $N$ atoms $\times$ four valence orbitals ($s, p_x, p_y, p_z$) give $4N$ molecular orbitals — four bands — with a total capacity of $8N$ electrons; they split into a bonding set of $4N$ states (filled by the $4N$ valence electrons) and an antibonding set of $4N$ states (empty). (b) The minimum photon energy is the gap, $1.1\ \mathrm{eV}$; the corresponding wavelength is $\lambda = hc/E = (1240\ \mathrm{eV\,nm})/(1.1\ \mathrm{eV}) \approx 1100\ \mathrm{nm} = 1.1\ \mu\mathrm{m}$. Photons at $2.0\ \mu\mathrm{m}$ carry $0.62\ \mathrm{eV} < E_\mathrm{g}$: no band-to-band absorption is possible (pure, defect-free silicon has nothing else in the visible/near-IR to absorb), so the infrared passes through — silicon is the standard near-IR optical material. Green photons at $2.35\ \mathrm{eV} > E_\mathrm{g}$ are absorbed in creating electron–hole pairs, so visible light is attenuated within a thin surface layer. Transparency as a band-gap measurement: the material is a filter whose cut-on is its own gap.
:::
:::

::: exercise Thermistor design {level=3 check="63"}
A metal-oxide thermistor is made from a ceramic semiconductor with $E_\mathrm{g} = 1.5\ \mathrm{eV}$. By what factor does its conductivity change between $300\ \mathrm{K}$ and $350\ \mathrm{K}$? Use $n \propto e^{-E_\mathrm{g}/2k_\mathrm{B}T}$, $k_\mathrm{B} = 8.617\times10^{-5}\ \mathrm{eV\,K^{-1}}$, and ignore the mobility change. (Enter the ratio $\sigma(350)/\sigma(300)$, to the nearest integer.)
::: solution
Exponent $= \frac{1.5}{2 \times 8.617\times10^{-5}}\left(\frac{1}{300} - \frac{1}{350}\right) = 8704 \times 4.762\times10^{-4} = 4.145$, so $\sigma(350)/\sigma(300) = e^{4.145} = 63$. A fifty-degree change moves the resistance by nearly two orders of magnitude — which is exactly why thermistors are sensitive thermometers and, unmanaged, run away: more current $\to$ more heat $\to$ more current. Copper, over the same interval, changes by $1 + 3.9\times10^{-3} \times 50 \approx 1.2$ — the exponential against the linear, one more time.
:::
:::
