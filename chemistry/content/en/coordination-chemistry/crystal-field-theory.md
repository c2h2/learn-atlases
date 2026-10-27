Dissolve titanium(III) chloride in dilute acid and you get a pale violet solution of $\mathrm{[Ti(H_2O)_6]^{3+}}$. Its spectrum has a single broad band centred at $20\,300\ \mathrm{cm^{-1}}$ (about $493\ \mathrm{nm}$, in the blue-green), and the eye sees the light that is left: red and violet. Titanium(III) has one $d$ electron. In a free gaseous $\mathrm{Ti^{3+}}$ ion the five $3d$ orbitals have exactly the same energy, so a $d \rightarrow d$ jump would cost nothing and there would be no visible band at all. Something in the complex must have split the $d$ orbitals by about $240\ \mathrm{kJ\,mol^{-1}}$, an energy comparable to a chemical bond.

A second puzzle points the same way. Iron(II) has six $d$ electrons. In $\mathrm{[Fe(H_2O)_6]^{2+}}$ four of them are unpaired and the salt is strongly attracted into a magnetic field; in the hexacyanidoferrate(II) ion $\mathrm{[Fe(CN)_6]^{4-}}$ (yellow prussiate of potash) all six are paired and the salt is diamagnetic. Same metal, same oxidation state, same octahedral shape, and yet the electrons are arranged differently. **Crystal field theory** explains both observations with one idea: the ligands are a negative electrostatic environment that raises some $d$ orbitals more than others. It is a deliberately crude model, treating ligands as point charges or point dipoles and ignoring covalency entirely, but it gets the *symmetry* of the splitting exactly right, and with one empirical parameter per complex it explains colours, magnetism, distortions, site preferences in minerals and the irregular thermodynamics of the first transition series. [[coordination-chemistry/ligand-field-mo]] then repairs its physics without changing its conclusions.

## The d orbitals in an octahedral field

Recall the shapes of the five $d$ orbitals ([[quantum-chemistry/hydrogen-atom]]). Three of them, $d_{xy}$, $d_{xz}$ and $d_{yz}$, have their four lobes *between* the Cartesian axes. The other two have lobes *along* the axes: $d_{x^2-y^2}$ points along $\pm x$ and $\pm y$, and $d_{z^2}$ has two large lobes along $\pm z$ and a torus in the $xy$ plane. Now put six ligands on the axes, at $\pm x$, $\pm y$, $\pm z$, as in an octahedral complex.

::: definition The crystal field model and the octahedral splitting {#def-cft}
In the **crystal field model** the metal ion is surrounded by ligands treated as negative point charges (anions) or as the negative ends of point dipoles (neutral ligands). Their electrostatic repulsion raises the energy of all metal $d$ orbitals, and raises most those orbitals whose lobes point at the ligands. In an octahedral field ($O_h$) the five $d$ orbitals split into two sets, labelled by their symmetry:

- $e_g$: $d_{z^2}$ and $d_{x^2-y^2}$, pointing at the ligands, raised;
- $t_{2g}$: $d_{xy}$, $d_{xz}$, $d_{yz}$, pointing between the ligands, lowered relative to the average.

The energy gap between them is the **octahedral field splitting** $\Delta_\mathrm{o}$ (older books write $10Dq$). It is measured from electronic spectra and quoted in $\mathrm{cm^{-1}}$; $1\ \mathrm{cm^{-1}}$ corresponds to $11.96\ \mathrm{J\,mol^{-1}}$.
:::

That $d_{z^2}$ and $d_{x^2-y^2}$ are degenerate is not obvious from their pictures, which look quite different. It is a consequence of symmetry: in $O_h$ these two orbitals transform together as the two-dimensional irreducible representation $E_g$, and the three "between the axes" orbitals as $T_{2g}$ ([[quantum-chemistry/molecular-symmetry]]). The labels are the Mulliken symbols in lower case, because they describe orbitals rather than states. The model's real achievement is the *pattern* $2 + 3$; the size of $\Delta_\mathrm{o}$ is a parameter we take from experiment.

::: proposition The barycentre rule {#prop-barycentre}
If a perturbation splits a set of degenerate orbitals without mixing them with any other orbitals, the occupancy-weighted average energy of the set is unchanged. For the octahedral splitting, measured from the average (the **barycentre**),
$$
E(e_g) = +\tfrac{3}{5}\Delta_\mathrm{o} = +6Dq, \qquad E(t_{2g}) = -\tfrac{2}{5}\Delta_\mathrm{o} = -4Dq.
$$ {#eq-barycentre}
The result holds within the crystal field model, where the ligand field adds a traceless term to the spherical average; the overall raising of all five orbitals by the spherical part is common to every arrangement and drops out.
:::

::: proof
Split the ligand potential into its spherical average plus the rest. The spherical part shifts all five $d$ orbitals equally. The non-spherical part $V'$ has zero average over the five orbitals, because the trace of $V'$ over a complete set of $d$ functions equals the integral of $V'$ over a spherical shell (Unsöld's theorem, $\sum_m |Y_{2m}|^2 = 5/4\pi$), and by construction the non-spherical part integrates to zero over the sphere. Hence the sum of the five orbital shifts is zero:
$$
2E(e_g) + 3E(t_{2g}) = 0, \qquad E(e_g) - E(t_{2g}) = \Delta_\mathrm{o}.
$$
Substituting $E(e_g) = E(t_{2g}) + \Delta_\mathrm{o}$ into the first equation gives $5E(t_{2g}) + 2\Delta_\mathrm{o} = 0$, so $E(t_{2g}) = -\tfrac{2}{5}\Delta_\mathrm{o}$ and $E(e_g) = +\tfrac{3}{5}\Delta_\mathrm{o}$. The two-orbital set must move further than the three-orbital set to keep the centre of gravity fixed, as on a lever.
:::

::: example The colour of titanium(III) {#ex-ti3}
$\mathrm{[Ti(H_2O)_6]^{3+}}$ absorbs most strongly at $\tilde\nu = 20\,300\ \mathrm{cm^{-1}}$. Assuming the band is the $t_{2g}^1 \rightarrow e_g^1$ transition, find $\Delta_\mathrm{o}$ in $\mathrm{kJ\,mol^{-1}}$, the wavelength of maximum absorption, and the energy by which the single electron is stabilised relative to the barycentre.
::: solution
For a $d^1$ ion the single electron jumps from $t_{2g}$ to $e_g$, so the transition energy is exactly $\Delta_\mathrm{o}$ (there is no electron–electron repulsion to complicate it; see [[coordination-chemistry/spectra-of-complexes]] for $d^2$ and beyond). The molar energy is
$$
E = N_\mathrm{A}hc\tilde\nu = (6.022\times10^{23}\ \mathrm{mol^{-1}})(6.626\times10^{-34}\ \mathrm{J\,s})(2.998\times10^{10}\ \mathrm{cm\,s^{-1}})(20\,300\ \mathrm{cm^{-1}}) = 2.43\times10^{5}\ \mathrm{J\,mol^{-1}},
$$
so $\Delta_\mathrm{o} = 243\ \mathrm{kJ\,mol^{-1}}$. The wavelength is $\lambda = 1/\tilde\nu = 1/(20\,300\ \mathrm{cm^{-1}}) = 4.93\times10^{-5}\ \mathrm{cm} = 493\ \mathrm{nm}$. Light around $490\ \mathrm{nm}$ is blue-green; removing it from white light leaves red and violet, which the eye combines as purple. The ground-state electron sits in $t_{2g}$, $\tfrac{2}{5}\Delta_\mathrm{o} = 97\ \mathrm{kJ\,mol^{-1}}$ below the barycentre. The band is broad and has a shoulder at lower energy: the excited state $t_{2g}^0e_g^1$ has an odd electron in a degenerate $e_g$ set and distorts (the Jahn–Teller effect at the end of this chapter), splitting the absorption into two overlapping components.
:::
:::

## Crystal field stabilisation energy and spin states

With more than one $d$ electron we fill the split orbitals following the aufbau principle and Hund's rule, but with a new choice. After three electrons have entered $t_{2g}$ (one in each orbital, spins parallel), the fourth can either go up into $e_g$, costing $\Delta_\mathrm{o}$, or pair with an electron already in $t_{2g}$, costing the extra repulsion and the lost exchange energy of a pair.

::: definition CFSE and pairing energy {#def-cfse}
The **crystal field stabilisation energy** of an octahedral $t_{2g}^a e_g^b$ configuration is its energy relative to the barycentre,
$$
\mathrm{CFSE} = \left(-\tfrac{2}{5}a + \tfrac{3}{5}b\right)\Delta_\mathrm{o}.
$$ {#eq-cfse}
The **mean pairing energy** $P$ is the energy cost of forcing one additional pair of electrons into the same orbital, compared with an arrangement that keeps them in different orbitals with parallel spins. It combines the Coulomb repulsion of two electrons in one orbital with the exchange energy lost by pairing. A configuration with the maximum number of unpaired electrons is **high spin** (weak field); one with fewer is **low spin** (strong field). Some books include the pairing term in the CFSE; here CFSE means the orbital term alone and $P$ is counted separately.
:::

For $d^1$, $d^2$, $d^3$ and $d^8$, $d^9$, $d^{10}$ there is only one way to fill the orbitals, whatever the size of $\Delta_\mathrm{o}$. The choice arises only for $d^4$ to $d^7$.

::: proposition The spin-state criterion {#prop-spin-state}
For an octahedral complex with $d^4$, $d^5$, $d^6$ or $d^7$, the low-spin configuration is the ground state when
$$
\Delta_\mathrm{o} > P,
$$
and the high-spin configuration when $\Delta_\mathrm{o} < P$. The criterion assumes one mean pairing energy for all pairs and a $\Delta_\mathrm{o}$ that does not change with spin state (in reality metal–ligand bonds are shorter in the low-spin form, which makes $\Delta_\mathrm{o}$ larger there).
:::

::: proof
Compare the two configurations for each count, writing $E = \mathrm{CFSE} + (\text{number of pairs})\,P$ and keeping only the pairs that differ.

| $d^n$ | high spin | CFSE | pairs | low spin | CFSE | pairs | $E_\mathrm{HS} - E_\mathrm{LS}$ |
|---|---|---|---|---|---|---|---|
| $d^4$ | $t_{2g}^3e_g^1$ | $-0.6\Delta_\mathrm{o}$ | 0 | $t_{2g}^4$ | $-1.6\Delta_\mathrm{o}$ | 1 | $\Delta_\mathrm{o} - P$ |
| $d^5$ | $t_{2g}^3e_g^2$ | $0$ | 0 | $t_{2g}^5$ | $-2.0\Delta_\mathrm{o}$ | 2 | $2(\Delta_\mathrm{o} - P)$ |
| $d^6$ | $t_{2g}^4e_g^2$ | $-0.4\Delta_\mathrm{o}$ | 1 | $t_{2g}^6$ | $-2.4\Delta_\mathrm{o}$ | 3 | $2(\Delta_\mathrm{o} - P)$ |
| $d^7$ | $t_{2g}^5e_g^2$ | $-0.8\Delta_\mathrm{o}$ | 2 | $t_{2g}^6e_g^1$ | $-1.8\Delta_\mathrm{o}$ | 3 | $\Delta_\mathrm{o} - P$ |

In each row, going from high to low spin moves $m$ electrons ($m = 1$ or $2$) from $e_g$ to $t_{2g}$, gaining $m\Delta_\mathrm{o}$, and creates $m$ new pairs, costing $mP$. So $E_\mathrm{HS} - E_\mathrm{LS} = m(\Delta_\mathrm{o} - P)$, which is positive (low spin lower) exactly when $\Delta_\mathrm{o} > P$.
:::

Pairing energies of free ions can be estimated from atomic spectra. Typical values (from the compilation in Huheey, Keiter and Keiter) are, in $\mathrm{cm^{-1}}$: $\mathrm{Cr^{2+}}$ 23 500, $\mathrm{Mn^{3+}}$ 28 000, $\mathrm{Mn^{2+}}$ 25 500, $\mathrm{Fe^{3+}}$ 30 000, $\mathrm{Fe^{2+}}$ 17 600, $\mathrm{Co^{3+}}$ 21 000 and $\mathrm{Co^{2+}}$ 22 500. In a complex the electron cloud expands onto the ligands and $P$ falls by 15–30 % (the nephelauxetic effect of [[coordination-chemistry/spectra-of-complexes]]), so these numbers are upper limits and the criterion is only decisive when $\Delta_\mathrm{o}$ and $P$ are well apart.

::: example Two iron(II) complexes and a cobalt(III) fluoride {#ex-spin-states}
Using $P(\mathrm{Fe^{2+}}) = 17\,600\ \mathrm{cm^{-1}}$ and $P(\mathrm{Co^{3+}}) = 21\,000\ \mathrm{cm^{-1}}$, predict the spin state, the number of unpaired electrons and the CFSE of (a) $\mathrm{[Fe(H_2O)_6]^{2+}}$ ($\Delta_\mathrm{o} = 10\,400\ \mathrm{cm^{-1}}$), (b) $\mathrm{[Fe(CN)_6]^{4-}}$ ($32\,200\ \mathrm{cm^{-1}}$), (c) $\mathrm{[Co(NH_3)_6]^{3+}}$ ($22\,900\ \mathrm{cm^{-1}}$) and (d) $\mathrm{[CoF_6]^{3-}}$ ($13\,000\ \mathrm{cm^{-1}}$).
::: solution
All four are $d^6$, so by [[#prop-spin-state]] $E_\mathrm{HS} - E_\mathrm{LS} = 2(\Delta_\mathrm{o} - P)$.

(a) $2(10\,400 - 17\,600) = -14\,400\ \mathrm{cm^{-1}}$: high spin lies lower. Configuration $t_{2g}^4e_g^2$, four unpaired electrons, CFSE $= -0.4 \times 10\,400 = -4160\ \mathrm{cm^{-1}}$ ($-49.8\ \mathrm{kJ\,mol^{-1}}$).

(b) $2(32\,200 - 17\,600) = +29\,200\ \mathrm{cm^{-1}}$: low spin, $t_{2g}^6$, no unpaired electrons, CFSE $= -2.4 \times 32\,200 = -77\,280\ \mathrm{cm^{-1}}$ ($-924\ \mathrm{kJ\,mol^{-1}}$ before the pairing cost of $2P$ is paid). This is the diamagnetic ferrocyanide of the introduction.

(c) $2(22\,900 - 21\,000) = +3800\ \mathrm{cm^{-1}}$: low spin, diamagnetic, as observed. The margin is small by this estimate, but the real $P$ in the complex is lower than the free-ion value, so the low-spin state is more secure than the numbers suggest. Almost all cobalt(III) complexes are low spin.

(d) $2(13\,000 - 21\,000) = -16\,000\ \mathrm{cm^{-1}}$: high spin, four unpaired electrons. $\mathrm{[CoF_6]^{3-}}$ is the classic exception among cobalt(III) complexes, and its paramagnetism (measured as in [[coordination-chemistry/magnetism]]) confirms it.
:::
:::

The CFSE for every octahedral $d^n$ follows from [[#eq-cfse]] and is worth tabulating, because it reappears in thermodynamics, kinetics and solid-state chemistry.

| $d^n$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| high spin, $-\mathrm{CFSE}/\Delta_\mathrm{o}$ | 0 | 0.4 | 0.8 | 1.2 | 0.6 | 0 | 0.4 | 0.8 | 1.2 | 0.6 | 0 |
| low spin, $-\mathrm{CFSE}/\Delta_\mathrm{o}$ | 0 | 0.4 | 0.8 | 1.2 | 1.6 | 2.0 | 2.4 | 1.8 | 1.2 | 0.6 | 0 |
| unpaired (HS / LS) | 0 | 1 | 2 | 3 | 4 / 2 | 5 / 1 | 4 / 0 | 3 / 1 | 2 | 1 | 0 |

::: widget plot
f: 0.4*x - ((x-3)+abs(x-3))/2 + ((x-5)+abs(x-5))/2 - ((x-8)+abs(x-8))/2; 0.4*x - ((x-6)+abs(x-6))/2
x: 0, 10
y: -0.2, 2.6
points: 0,0; 1,0.4; 2,0.8; 3,1.2; 4,0.6; 5,0; 6,0.4; 7,0.8; 8,1.2; 9,0.6; 10,0; 4,1.6; 5,2.0; 6,2.4; 7,1.8
labels: \text{high spin}; \text{low spin}
caption: The magnitude of the octahedral CFSE, $-\mathrm{CFSE}/\Delta_\mathrm{o}$, against the number of $d$ electrons $x$, from [[#eq-cfse]] (pairing energy not included). High-spin complexes give the "double hump": zero at $d^0$, $d^5$ and $d^{10}$, maxima of $1.2\Delta_\mathrm{o}$ at $d^3$ and $d^8$. Low-spin complexes rise to $2.4\Delta_\mathrm{o}$ at $d^6$, the $t_{2g}^6$ configuration of cobalt(III), rhodium(III), iridium(III) and platinum(IV), which is why those ions form such robust complexes. The two curves coincide outside $d^4$–$d^7$, where only one configuration is possible. Only the dots have meaning; the lines join them to guide the eye.
:::

::: quiz
An octahedral complex of manganese(II) has five unpaired electrons. Which statements must be true?
- [x] Its CFSE is zero.
- [ ] Its ligands are high in the spectrochemical series.
- [x] $\Delta_\mathrm{o}$ is smaller than the mean pairing energy.
- [ ] It has two electrons in the $t_{2g}$ set.
::: solution
Manganese(II) is $d^5$. Five unpaired electrons means high spin, $t_{2g}^3e_g^2$, which by [[#eq-cfse]] gives $3(-0.4) + 2(0.6) = 0$. High spin implies $\Delta_\mathrm{o} < P$ ([[#prop-spin-state]]), so the field is *weak*, and the ligands are low in the series ($\mathrm{H_2O}$, $\mathrm{F^-}$, $\mathrm{Cl^-}$). There are three electrons in $t_{2g}$, not two. Zero CFSE is why manganese(II) salts are almost colourless and why the ion has no preference between octahedral and tetrahedral sites.
:::
:::

## The spectrochemical series

Measuring $\Delta_\mathrm{o}$ for many complexes of one metal shows that ligands can be placed in an order that hardly depends on the metal. Ryutaro Tsuchida proposed it in 1938 from the positions of absorption bands of cobalt(III) complexes, and it is now called the **spectrochemical series**:
$$
\mathrm{I^-} < \mathrm{Br^-} < \mathrm{S^{2-}} < \mathrm{SCN^-}(S) < \mathrm{Cl^-} < \mathrm{NO_3^-} < \mathrm{F^-} < \mathrm{OH^-} < \mathrm{ox^{2-}} < \mathrm{H_2O} < \mathrm{NCS^-}(N) < \mathrm{CH_3CN} < \mathrm{py} < \mathrm{NH_3} < \mathrm{en} < \mathrm{bpy} < \mathrm{phen} < \mathrm{NO_2^-} < \mathrm{PPh_3} < \mathrm{CN^-} < \mathrm{CO}.
$$
Ligands at the left are **weak-field** and give small splittings and high-spin complexes; those at the right are **strong-field**. A similar ordering exists for metals at fixed ligands:
$$
\mathrm{Mn^{2+}} < \mathrm{Ni^{2+}} < \mathrm{Co^{2+}} < \mathrm{Fe^{2+}} < \mathrm{V^{2+}} < \mathrm{Fe^{3+}} < \mathrm{Cr^{3+}} < \mathrm{V^{3+}} < \mathrm{Co^{3+}} < \mathrm{Mn^{4+}} < \mathrm{Mo^{3+}} < \mathrm{Rh^{3+}} < \mathrm{Ru^{3+}} < \mathrm{Pd^{4+}} < \mathrm{Ir^{3+}} < \mathrm{Pt^{4+}}.
$$
Two trends stand out. $\Delta_\mathrm{o}$ rises with oxidation state, typically by 40–80 % from $\mathrm{M^{2+}}$ to $\mathrm{M^{3+}}$, as the ligands are pulled closer. And it rises down a group: for $\mathrm{[M(NH_3)_6]^{3+}}$ it is $22\,900$ (Co), $34\,100$ (Rh) and $41\,200\ \mathrm{cm^{-1}}$ (Ir), increases of 49 % and 21 %, because the larger $4d$ and $5d$ orbitals reach the ligands better. Since pairing energies are also *smaller* for the more diffuse $4d$ and $5d$ orbitals, essentially all complexes of the second and third transition series are low spin.

::: proposition Jørgensen's factorisation (empirical) {#prop-jorgensen}
To within about 10 %, the octahedral splitting of a complex $\mathrm{[ML_6]}$ is a product of a ligand factor $f$ and a metal factor $g$,
$$
\Delta_\mathrm{o} \approx f(\mathrm{L}) \times g(\mathrm{M}),
$$ {#eq-jorgensen}
with $f(\mathrm{H_2O}) = 1$ by definition. Representative values (C. K. Jørgensen, as tabulated by Huheey): $f$ = 0.72 ($\mathrm{Br^-}$), 0.78 ($\mathrm{Cl^-}$), 0.9 ($\mathrm{F^-}$), 1.00 ($\mathrm{H_2O}$), 1.25 ($\mathrm{NH_3}$), 1.28 (en), 1.7 ($\mathrm{CN^-}$); $g$ in $10^3\ \mathrm{cm^{-1}}$ = 8.0 ($\mathrm{Mn^{2+}}$), 8.7 ($\mathrm{Ni^{2+}}$), 9.0 ($\mathrm{Co^{2+}}$), 14.0 ($\mathrm{Fe^{3+}}$), 17.4 ($\mathrm{Cr^{3+}}$), 18.2 ($\mathrm{Co^{3+}}$), 27.0 ($\mathrm{Rh^{3+}}$), 32.0 ($\mathrm{Ir^{3+}}$), 36.0 ($\mathrm{Pt^{4+}}$). The rule is an empirical regularity for octahedral complexes with six identical ligands; it has no derivation within crystal field theory.
:::

::: example Estimating Δo before you measure it {#ex-jorgensen}
Estimate $\Delta_\mathrm{o}$ for (a) $\mathrm{[Co(NH_3)_6]^{3+}}$, (b) $\mathrm{[CrCl_6]^{3-}}$ and (c) $\mathrm{[Cr(en)_3]^{3+}}$, and compare with the measured values $22\,900$, $13\,600$ and $21\,900\ \mathrm{cm^{-1}}$. What colour is $\mathrm{[Cr(en)_3]^{3+}}$ likely to be?
::: solution
(a) $1.25 \times 18.2 \times 10^3 = 22\,750\ \mathrm{cm^{-1}}$, within 1 % of experiment. (b) $0.78 \times 17.4 \times 10^3 = 13\,570\ \mathrm{cm^{-1}}$, within 0.3 %. (c) $1.28 \times 17.4 \times 10^3 = 22\,270\ \mathrm{cm^{-1}}$, about 2 % high. For chromium(III), $d^3$, the lowest spin-allowed band is at $\Delta_\mathrm{o}$ (the reason is given in [[coordination-chemistry/spectra-of-complexes]]), so $\mathrm{[Cr(en)_3]^{3+}}$ absorbs near $1/21\,900\ \mathrm{cm^{-1}} = 457\ \mathrm{nm}$, in the blue, and should look yellow to orange; its salts are indeed yellow. By contrast $\mathrm{[CrCl_6]^{3-}}$ absorbs near $735\ \mathrm{nm}$, and chloride-rich chromium(III) species are green or violet. Colour changes of chromium(III) as ligands are exchanged are one of the most visible demonstrations of the spectrochemical series.
:::
:::

::: warning The spectrochemical series is not an electrostatic series {#warn-spectrochemical}
If ligands were point charges, anions should split the $d$ orbitals more than neutral molecules, and small, highly charged ions most of all. The series says the opposite: $\mathrm{F^-}$, $\mathrm{OH^-}$ and $\mathrm{O^{2-}}$ donors are weaker than neutral water and ammonia, iodide is the weakest ligand of all, and the strongest ligands, CO and $\mathrm{CN^-}$, have only a small dipole or charge at the donor atom. Crystal field theory cannot explain this, and you should not try to rationalise the order by charge or size. The explanation is covalent: σ donors raise $e_g$, π donors (halides, hydroxide) raise $t_{2g}$ and so *reduce* $\Delta_\mathrm{o}$, and π acceptors (CO, $\mathrm{CN^-}$, phosphines, bpy) lower $t_{2g}$ and *increase* it. This is the subject of [[coordination-chemistry/ligand-field-mo]]. Crystal field theory supplies the pattern; the ordering needs orbitals.
:::

## Tetrahedral and square-planar fields

To compare geometries we need a way of computing how much each orbital is pushed up by each ligand. The simplest consistent scheme, which reproduces the point-charge results for the symmetry and ratio of the splittings, assigns to each metal–ligand contact an energy proportional to the square of the $d$ orbital's angular amplitude in the direction of the ligand. This is the σ part of the **angular overlap model**, treated as bonding in [[coordination-chemistry/ligand-field-mo]]; here we use it only as a bookkeeping device.

::: proposition The tetrahedral splitting is four-ninths of the octahedral {#prop-tetrahedral}
Let one ligand on the $z$ axis raise $d_{z^2}$ by $e_\sigma$, and let each ligand at direction $\hat{\mathbf{n}}$ raise an orbital $d$ by $e_\sigma F_d(\hat{\mathbf{n}})^2$, where $F_d$ is the angular function of the orbital normalised to a maximum of 1. Then for the same metal, ligands and metal–ligand distance:

- octahedral: $E(e_g) = 3e_\sigma$, $E(t_{2g}) = 0$, so $\Delta_\mathrm{o} = 3e_\sigma$;
- tetrahedral: $E(t_2) = \tfrac{4}{3}e_\sigma$, $E(e) = 0$, so $\Delta_\mathrm{t} = \tfrac{4}{3}e_\sigma = \tfrac{4}{9}\Delta_\mathrm{o}$, with the order of the two sets *inverted*.

The point-charge crystal field model gives the same ratio $\Delta_\mathrm{t} = \tfrac{4}{9}\Delta_\mathrm{o}$.
:::

::: proof
The normalised angular functions are $F_{z^2} = \tfrac{1}{2}(3n_z^2 - 1)$, $F_{x^2-y^2} = \tfrac{\sqrt3}{2}(n_x^2 - n_y^2)$, $F_{xy} = \sqrt3\,n_xn_y$ and similarly for $xz$, $yz$, where $(n_x, n_y, n_z)$ is the unit vector to the ligand.

*Octahedron*, ligands at $\pm\hat x$, $\pm\hat y$, $\pm\hat z$. For $d_{z^2}$: the two axial ligands give $F = 1$ each, the four equatorial give $F = -\tfrac12$, so $E = (2 \times 1 + 4 \times \tfrac14)e_\sigma = 3e_\sigma$. For $d_{x^2-y^2}$: the four equatorial ligands give $F = \pm\tfrac{\sqrt3}{2}$ and the axial ones $0$, so $E = 4 \times \tfrac34 e_\sigma = 3e_\sigma$. For $d_{xy}$, $d_{xz}$, $d_{yz}$: every ligand lies on an axis, where two of the three components of $\hat{\mathbf n}$ vanish, so $F = 0$ and $E = 0$.

*Tetrahedron*, ligands at $(1,1,1)/\sqrt3$, $(1,-1,-1)/\sqrt3$, $(-1,1,-1)/\sqrt3$, $(-1,-1,1)/\sqrt3$. For $d_{xy}$: $n_xn_y = \pm\tfrac13$, so $F^2 = 3 \times \tfrac19 = \tfrac13$ for every ligand and $E = 4 \times \tfrac13 e_\sigma = \tfrac43 e_\sigma$; by symmetry $d_{xz}$ and $d_{yz}$ are the same. For $d_{z^2}$: $n_z^2 = \tfrac13$ gives $F = 0$; for $d_{x^2-y^2}$: $n_x^2 = n_y^2$ gives $F = 0$. So $E(t_2) = \tfrac43 e_\sigma$, $E(e) = 0$.

The ratio is $\Delta_\mathrm{t}/\Delta_\mathrm{o} = (\tfrac43 e_\sigma)/(3e_\sigma) = \tfrac49$. As a check, the total raising is $6e_\sigma$ for six ligands and $3 \times \tfrac43 e_\sigma = 4e_\sigma$ for four: each ligand contributes $e_\sigma$ in total, because $\sum_d F_d^2 = 1$ in every direction. Relative to the barycentre the tetrahedral levels are $E(e) = -\tfrac35\Delta_\mathrm{t}$ and $E(t_2) = +\tfrac25\Delta_\mathrm{t}$, the barycentre rule applied to a $2 + 3$ split with the pair below.
:::

The $g$ subscript is missing in tetrahedral labels because the tetrahedron has no centre of inversion. Because $\Delta_\mathrm{t}$ is less than half of $\Delta_\mathrm{o}$, and always smaller than the pairing energy for 3d metals, **tetrahedral complexes are essentially always high spin**. Tetrahedral CFSE values follow from the occupancies $e^at_2^b$: $\mathrm{CFSE} = (-\tfrac35 a + \tfrac25 b)\Delta_\mathrm{t}$.

::: example Normal and inverse spinels {#ex-spinels}
In a spinel $\mathrm{AB_2O_4}$, the oxide ions form a cubic close-packed array; in a **normal** spinel the $\mathrm{A^{2+}}$ ions occupy tetrahedral holes and the $\mathrm{B^{3+}}$ ions octahedral holes, and in an **inverse** spinel the tetrahedral holes hold half the $\mathrm{B^{3+}}$ ions, $\mathrm{B[AB]O_4}$. Magnetite, $\mathrm{Fe_3O_4} = \mathrm{Fe^{II}Fe^{III}_2O_4}$, is inverse, but hausmannite, $\mathrm{Mn_3O_4} = \mathrm{Mn^{II}Mn^{III}_2O_4}$, is normal. Explain this with the **octahedral site preference energy**, $\mathrm{OSPE} = \mathrm{CFSE(oct)} - \mathrm{CFSE(tet)}$, taking $\Delta_\mathrm{t} = \tfrac49\Delta_\mathrm{o}$ and high-spin ions throughout.
::: solution
Oxide is a weak-field ligand, so all ions are high spin. Work out each ion in units of its own $\Delta_\mathrm{o}$.

$\mathrm{Fe^{3+}}$ and $\mathrm{Mn^{2+}}$, both $d^5$: CFSE is zero in both sites, so OSPE $= 0$. These ions have no preference.

$\mathrm{Fe^{2+}}$, $d^6$: octahedral $t_{2g}^4e_g^2$, $-0.4\Delta_\mathrm{o}$. Tetrahedral $e^3t_2^3$, $3(-0.6) + 3(0.4) = -0.6\Delta_\mathrm{t} = -0.267\Delta_\mathrm{o}$. OSPE $= -0.4 + 0.267 = -0.133\Delta_\mathrm{o}$: a modest preference for the octahedral site.

$\mathrm{Mn^{3+}}$, $d^4$: octahedral $t_{2g}^3e_g^1$, $-0.6\Delta_\mathrm{o}$. Tetrahedral $e^2t_2^2$, $-1.2 + 0.8 = -0.4\Delta_\mathrm{t} = -0.178\Delta_\mathrm{o}$. OSPE $= -0.422\Delta_\mathrm{o}$: a strong octahedral preference.

In magnetite, $\mathrm{Fe^{3+}}$ does not care where it sits, while $\mathrm{Fe^{2+}}$ gains by being octahedral, so $\mathrm{Fe^{2+}}$ takes an octahedral hole and one $\mathrm{Fe^{3+}}$ is displaced into the tetrahedral hole: inverse, $\mathrm{Fe^{III}[Fe^{II}Fe^{III}]O_4}$. In hausmannite the $\mathrm{Mn^{3+}}$ ions have the strong preference and the $\mathrm{Mn^{2+}}$ none, so the $\mathrm{Mn^{3+}}$ ions keep both octahedral holes: normal. The electron hopping between $\mathrm{Fe^{2+}}$ and $\mathrm{Fe^{3+}}$ on neighbouring octahedral sites is also why magnetite conducts electricity so well for an oxide. The argument ignores the Madelung energy, which favours putting the more highly charged ion in the octahedral site, and works only where CFSE differences are large; spinels are a standard topic of [[materials-chemistry/crystal-structures]].
:::
:::

### Square-planar complexes from a tetragonal distortion

Square-planar complexes are best seen as octahedra from which the two $z$-axis ligands have been pulled away. As the axial ligands recede, every orbital with a $z$ component loses repulsion: $d_{z^2}$ falls a long way, and $d_{xz}$ and $d_{yz}$ fall below $d_{xy}$. In the angular-overlap bookkeeping, scale the axial interaction by a factor $s$ ($s = 1$ octahedral, $s = 0$ square planar) and allow each ligand also a weaker π interaction $e_\pi$ with the $t_{2g}$-type orbitals it faces. Then
$$
E(d_{x^2-y^2}) = 3e_\sigma,\quad E(d_{z^2}) = (1 + 2s)e_\sigma,\quad E(d_{xy}) = 4e_\pi,\quad E(d_{xz}) = E(d_{yz}) = (2 + 2s)e_\pi.
$$ {#eq-tetragonal}

::: widget plot
f: 3; 1 + 2*x; 4*p; 2*p + 2*p*x
x: 0, 1
y: -0.2, 3.4
sliders: p=0.25:0:0.6:0.05
labels: d_{x^2-y^2}; d_{z^2}; d_{xy}; d_{xz},\ d_{yz}
caption: Angular-overlap estimates of the $d$-orbital energies (in units of $e_\sigma$) from [[#eq-tetragonal]] as the two axial ligands are withdrawn, from square planar at $x = 0$ to octahedral at $x = 1$ ($x$ is the axial interaction relative to the equatorial one). The slider sets the π interaction $e_\pi/e_\sigma$, typically 0.1–0.3 for halides and nearly zero for amines. At $x = 1$ the familiar $e_g$ and $t_{2g}$ sets appear, separated by $3e_\sigma - 4e_\pi$. At $x = 0$ the $d_{x^2-y^2}$ orbital stands alone, far above the rest. A $d^8$ ion can then put all eight electrons in the four lower orbitals and leave $d_{x^2-y^2}$ empty. The model ignores mixing of $d_{z^2}$ with the metal $4s$ orbital, which in real square-planar complexes pushes $d_{z^2}$ lower still.
:::

For a $d^8$ ion the square-planar arrangement leaves the strongly antibonding $d_{x^2-y^2}$ empty, and the energy gained, of the order of $e_\sigma$, can pay for losing two metal–ligand bonds when $e_\sigma$ is large. That is why square-planar geometry is the rule for $d^8$ ions of the heavier metals (Pd(II), Pt(II), Au(III), Rh(I), Ir(I)), where splittings are large, and for nickel(II) only with strong-field ligands: $\mathrm{[Ni(CN)_4]^{2-}}$ is square planar and diamagnetic, while $\mathrm{[NiCl_4]^{2-}}$ is tetrahedral and paramagnetic with two unpaired electrons.

## The Jahn–Teller effect

Copper(II) chloride is not built from regular octahedra. In the solid each copper has four chlorides at $230\ \mathrm{pm}$ and two at $295\ \mathrm{pm}$, and almost every six-coordinate copper(II) compound shows the same pattern of four short and two long bonds. The reason is a general theorem.

::: theorem Jahn–Teller theorem {#thm-jahn-teller}
Any non-linear molecule in an orbitally degenerate electronic state is unstable with respect to some distortion of its nuclear framework that lowers its symmetry and removes the degeneracy (H. A. Jahn and E. Teller, 1937).
:::

The theorem says that a distortion exists, not how large it is or which form it takes. For octahedral complexes the important case is uneven occupation of the $e_g$ set, and the energetics can be worked out in a few lines.

::: proposition Size of a Jahn–Teller distortion {#prop-jt-size}
Let an octahedral complex elongate along $z$ by a small amount $\delta$ (axial bonds longer by $\delta$, equatorial bonds slightly shorter). To first order the $e_g$ pair splits symmetrically, $d_{z^2}$ falling by $\tfrac12 a\delta$ and $d_{x^2-y^2}$ rising by $\tfrac12 a\delta$, while the elastic energy of the framework rises as $\tfrac12 k\delta^2$. For a configuration with one more electron in the lower $e_g$ component than in the upper (for example $e_g^3$ as $d_{z^2}^2d_{x^2-y^2}^1$, or $e_g^1$ as $d_{z^2}^1$), the energy is
$$
E(\delta) = -\tfrac12 a\delta + \tfrac12 k\delta^2,
$$
which has its minimum at $\delta^* = a/2k$ with a stabilisation of $a^2/8k$. If the $e_g$ set is empty, half-full or full, the linear terms cancel and the regular octahedron is stable.
:::

::: proof
With $n_1$ electrons in $d_{z^2}$ and $n_2$ in $d_{x^2-y^2}$, the electronic energy changes by $-\tfrac12 a\delta n_1 + \tfrac12 a\delta n_2 = -\tfrac12 a\delta(n_1 - n_2)$; the centre of the $e_g$ pair does not move to first order (barycentre rule), and the $t_{2g}$ set splits by much less because its orbitals do not point at the ligands. Adding the harmonic restoring energy gives $E(\delta) = -\tfrac12 a(n_1 - n_2)\delta + \tfrac12 k\delta^2$. Setting $\dd E/\dd\delta = 0$ gives $\delta^* = a(n_1 - n_2)/2k$ and $E(\delta^*) = -a^2(n_1 - n_2)^2/8k$. For $n_1 - n_2 = 1$ this is the stated result. Since a linear term always beats a quadratic one for small enough $\delta$, *any* non-zero $n_1 - n_2$ makes the undistorted structure unstable, which is the content of [[#thm-jahn-teller]] for this case. When $n_1 = n_2$ the linear term vanishes and $\delta^* = 0$. Compression along $z$ ($\delta < 0$) with $n_1 - n_2 = -1$ gives the same energy; elongation is observed far more often, a preference that comes from higher-order (anharmonic and $4s$-mixing) terms not included here.
:::

The configurations with uneven $e_g$ occupation are $d^9$ ($t_{2g}^6e_g^3$), high-spin $d^4$ ($t_{2g}^3e_g^1$, $\mathrm{Cr^{2+}}$, $\mathrm{Mn^{3+}}$) and low-spin $d^7$ ($t_{2g}^6e_g^1$, rare). For these the distortion is large and is seen directly in crystal structures. Uneven occupation of $t_{2g}$ ($d^1$, $d^2$, low-spin $d^4$ and $d^5$, high-spin $d^6$ and $d^7$) also produces Jahn–Teller distortions in principle, but the $t_{2g}$ orbitals interact weakly with the ligands, the coefficient $a$ is small, and the effect is usually hidden by thermal motion and the asymmetry of the crystal.

::: example Copper(II) and chromium(II) {#ex-jahn-teller}
(a) Show that the elongated structure of $\mathrm{CuCl_2}$ is expected. (b) Which of $\mathrm{[Cr(H_2O)_6]^{2+}}$, $\mathrm{[Cr(H_2O)_6]^{3+}}$, $\mathrm{[Mn(H_2O)_6]^{3+}}$, $\mathrm{[Ni(H_2O)_6]^{2+}}$ and $\mathrm{[Fe(CN)_6]^{3-}}$ should show a strong Jahn–Teller distortion? (c) Why does the formation of $\mathrm{[Cu(en)_3]^{2+}}$ from $\mathrm{[Cu(en)_2(H_2O)_2]^{2+}}$ have a very small equilibrium constant?
::: solution
(a) Copper(II) is $d^9$, $t_{2g}^6e_g^3$: one hole in the $e_g$ set, $n_1 - n_2 = 1$ for the elongated arrangement $d_{z^2}^2d_{x^2-y^2}^1$. By [[#prop-jt-size]] the octahedron distorts. The four short bonds (230 pm) lie in the plane of the singly occupied $d_{x^2-y^2}$, and the two long ones (295 pm) along the axis of the doubly occupied $d_{z^2}$, which repels the axial ligands more.

(b) $\mathrm{Cr^{2+}}$ ($d^4$, aqua ligands weak field, so high spin $t_{2g}^3e_g^1$): strong. $\mathrm{Cr^{3+}}$ ($d^3$, $t_{2g}^3$): no degeneracy, regular. $\mathrm{Mn^{3+}}$ ($d^4$ high spin): strong. $\mathrm{Ni^{2+}}$ ($d^8$, $t_{2g}^6e_g^2$, one electron in each $e_g$ orbital): regular. $\mathrm{[Fe(CN)_6]^{3-}}$ (low-spin $d^5$, $t_{2g}^5$): a $t_{2g}$ degeneracy, so only a weak distortion.

(c) In $\mathrm{[Cu(en)_2(H_2O)_2]^{2+}}$ the two en ligands occupy the four short equatorial positions and the waters the long axial ones. A third en must span one equatorial and one axial site, or force a strained geometry, so its binding is weak. The stepwise formation constants of copper(II) with en, analysed in [[coordination-chemistry/complex-stability]], fall sharply at the third step for exactly this reason.
:::
:::

## Thermodynamic consequences

CFSE is a small part of the total bonding energy of a complex, typically 5–10 %, but it is the *part that changes irregularly* across a series. Properties that would otherwise vary smoothly with the steadily shrinking ionic radius therefore show the double hump of the CFSE plot. The clearest case is the enthalpy of hydration of the $\mathrm{M^{2+}}$ ions of the first series, $\mathrm{M^{2+}(g)} \rightarrow \mathrm{[M(H_2O)_6]^{2+}(aq)}$, which becomes more negative from calcium to zinc but with dips below a smooth line at $\mathrm{V^{2+}}$ ($d^3$) and $\mathrm{Ni^{2+}}$ ($d^8$), and points on the line for $\mathrm{Ca^{2+}}$, $\mathrm{Mn^{2+}}$ and $\mathrm{Zn^{2+}}$, which have zero CFSE. Lattice enthalpies of the dihalides and the $\mathrm{M^{2+}}$ ionic radii (which shrink faster than average from $d^1$ to $d^3$, because added electrons enter $t_{2g}$ orbitals that do not shield the ligands from the nuclear charge) show the same pattern.

::: example How much of the hydration enthalpy of nickel(II) is CFSE? {#ex-hydration}
Hydration enthalpies (Marcus's compilation) are about $-1841\ \mathrm{kJ\,mol^{-1}}$ for $\mathrm{Mn^{2+}}$, $-2105$ for $\mathrm{Ni^{2+}}$ and $-2046$ for $\mathrm{Zn^{2+}}$. Interpolating linearly between the zero-CFSE ions $\mathrm{Mn^{2+}}$ ($d^5$) and $\mathrm{Zn^{2+}}$ ($d^{10}$), estimate the "excess" stabilisation of $\mathrm{Ni^{2+}}$ and compare it with the CFSE calculated from $\Delta_\mathrm{o} = 8500\ \mathrm{cm^{-1}}$ for $\mathrm{[Ni(H_2O)_6]^{2+}}$.
::: solution
Nickel is three-fifths of the way from Mn ($d^5$) to Zn ($d^{10}$), so the interpolated value is
$$
-1841 + \tfrac35(-2046 + 1841) = -1841 - 123 = -1964\ \mathrm{kJ\,mol^{-1}}.
$$
The measured value is $-2105$, so the excess is $-2105 - (-1964) = -141\ \mathrm{kJ\,mol^{-1}}$. The CFSE of $d^8$ is $-1.2\Delta_\mathrm{o} = -1.2 \times 8500 = -10\,200\ \mathrm{cm^{-1}}$, which is $-10\,200 \times 0.01196 = -122\ \mathrm{kJ\,mol^{-1}}$. The agreement to about 15 % is good given that the interpolation assumes a perfectly linear background and that $\Delta_\mathrm{o}$ in the complex is not quite the quantity relevant to the hydration step. The striking fact is that a splitting read off from the colour of a solution accounts for most of the anomaly in a thermochemical cycle.
:::
:::

The same CFSE pattern underlies the **Irving–Williams series** of complex stabilities, $\mathrm{Mn^{2+}} < \mathrm{Fe^{2+}} < \mathrm{Co^{2+}} < \mathrm{Ni^{2+}} < \mathrm{Cu^{2+}} > \mathrm{Zn^{2+}}$, treated in [[coordination-chemistry/complex-stability]], where copper's lead comes from its Jahn–Teller distortion, and it explains why $d^3$ and low-spin $d^6$ ions are substitutionally inert ([[coordination-chemistry/inorganic-mechanisms]]): a dissociative transition state loses much of their large CFSE.

## Where this leads

Crystal field theory has given us the $2 + 3$ pattern, the parameter $\Delta_\mathrm{o}$, the spin-state criterion and the Jahn–Teller distortion. What it cannot do is explain the spectrochemical series or the 18-electron rule of metal carbonyls; [[coordination-chemistry/ligand-field-mo]] replaces point charges with σ- and π-bonding orbitals built by symmetry. Spectra of ions with more than one $d$ electron need the electron–electron repulsion that crystal field theory leaves out; Tanabe–Sugano diagrams combine both in [[coordination-chemistry/spectra-of-complexes]]. Spin states are measured magnetically in [[coordination-chemistry/magnetism]], which also covers spin-crossover compounds whose $\Delta_\mathrm{o}$ and $P$ are nearly equal. The same splitting patterns, with smaller splittings, appear in the solid-state oxides and gemstones of [[materials-chemistry/magnetic-optical]].

::: history
The theory began as solid-state physics. Hans Bethe's 1929 paper "Termaufspaltung in Kristallen" (*Annalen der Physik*) used group theory to show how the levels of a free ion split when it is placed in a crystal of given symmetry, and John Hasbrouck Van Vleck applied the idea to the magnetic susceptibilities of transition-metal salts in the early 1930s, culminating in his 1935 paper comparing crystal field, valence bond and molecular orbital descriptions of complexes. Chemists largely ignored this work for two decades, preferring Linus Pauling's valence-bond account of "inner" and "outer orbital" complexes. Ryutaro Tsuchida's spectrochemical series of 1938 was an empirical observation without a theory. The turning point came in 1951, when F. E. Ilse and H. Hartmann explained the visible spectrum of $\mathrm{[Ti(H_2O)_6]^{3+}}$ as a $d \rightarrow d$ transition across the crystal field splitting, and Leslie Orgel, Jørgen Bjerrum, Christian Klixbüll Jørgensen and others extended the treatment to other ions over the following years. Hermann Jahn and Edward Teller's theorem appeared in 1937, and its chemical consequences for copper(II) were worked out in the 1950s.
:::

::: summary
- Ligands raise the $d$ orbitals that point at them. In an octahedron the $e_g$ pair ($d_{z^2}$, $d_{x^2-y^2}$) lies $\Delta_\mathrm{o}$ above the $t_{2g}$ trio, at $+\tfrac35\Delta_\mathrm{o}$ and $-\tfrac25\Delta_\mathrm{o}$ from the barycentre.
- The CFSE of $t_{2g}^ae_g^b$ is $(-0.4a + 0.6b)\Delta_\mathrm{o}$. For $d^4$–$d^7$ the complex is low spin when $\Delta_\mathrm{o} > P$ and high spin when $\Delta_\mathrm{o} < P$.
- $\Delta_\mathrm{o}$ follows the empirical spectrochemical series of ligands ($\mathrm{I^-}$ weakest, CO strongest), rises with oxidation state and down a group, and is roughly $f(\mathrm{L})\,g(\mathrm{M})$; 4d and 5d complexes are low spin.
- The order of the series is not electrostatic; it needs the σ- and π-bonding picture of ligand field theory.
- A tetrahedral field inverts the pattern ($e$ below $t_2$) with $\Delta_\mathrm{t} = \tfrac49\Delta_\mathrm{o}$, so tetrahedral complexes are high spin; site preferences from CFSE explain normal and inverse spinels.
- Removing the axial ligands leaves $d_{x^2-y^2}$ high and alone, which makes $d^8$ ions with large splittings square planar.
- Uneven occupation of $e_g$ ($d^9$, high-spin $d^4$, low-spin $d^7$) causes a strong Jahn–Teller distortion, usually an elongation; CFSE explains the double hump in hydration and lattice enthalpies.
:::

## Exercises

::: exercise CFSE of chromium(III) {level=1 check="-1.2"}
Give the $d$-electron configuration of $\mathrm{[Cr(H_2O)_6]^{3+}}$ and its CFSE in units of $\Delta_\mathrm{o}$. With $\Delta_\mathrm{o} = 17\,400\ \mathrm{cm^{-1}}$, express the CFSE in $\mathrm{kJ\,mol^{-1}}$. (Enter the CFSE as a multiple of $\Delta_\mathrm{o}$.)
::: solution
Chromium(III) is $d^3$: $t_{2g}^3$, with one electron in each $t_{2g}$ orbital whatever the field strength. CFSE $= 3 \times (-0.4)\Delta_\mathrm{o} = -1.2\Delta_\mathrm{o} = -1.2 \times 17\,400 = -20\,880\ \mathrm{cm^{-1}}$, and $-20\,880 \times 0.01196 = -250\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise Unpaired electrons in manganese(II) {level=1 check="1"}
Predict the number of unpaired electrons in $\mathrm{[Mn(H_2O)_6]^{2+}}$ and in $\mathrm{[Mn(CN)_6]^{4-}}$. (Enter the number for the cyanide complex.)
::: solution
Both are manganese(II), $d^5$. Water is weak field and $P(\mathrm{Mn^{2+}})$ is large ($\approx 25\,500\ \mathrm{cm^{-1}}$), so the aqua ion is high spin, $t_{2g}^3e_g^2$, with **five** unpaired electrons. Cyanide is at the top of the spectrochemical series; $\mathrm{[Mn(CN)_6]^{4-}}$ is low spin, $t_{2g}^5$, with **one** unpaired electron.
:::
:::

::: exercise Colour from Δo {level=1 check="465"}
$\mathrm{[Cr(NH_3)_6]^{3+}}$ has $\Delta_\mathrm{o} = 21\,500\ \mathrm{cm^{-1}}$, and its lowest spin-allowed band lies at $\Delta_\mathrm{o}$. At what wavelength does it absorb, and what colour would you expect? (Enter the wavelength in nm, to three significant figures.)
::: solution
$\lambda = 1/\tilde\nu = 1/(21\,500\ \mathrm{cm^{-1}}) = 4.65\times10^{-5}\ \mathrm{cm} = 465\ \mathrm{nm}$, in the blue. The complementary colour is yellow-orange, and hexaamminechromium(III) salts are yellow.
:::
:::

::: exercise A second-row estimate {level=2 check="33750"}
Use [[#prop-jorgensen]] to estimate $\Delta_\mathrm{o}$ for $\mathrm{[Rh(NH_3)_6]^{3+}}$, and compare with the measured $34\,100\ \mathrm{cm^{-1}}$. Is the complex high or low spin? (Enter your estimate in $\mathrm{cm^{-1}}$.)
::: solution
$\Delta_\mathrm{o} \approx 1.25 \times 27.0 \times 10^3 = 33\,750\ \mathrm{cm^{-1}}$, 1 % below experiment. Rhodium(III) is $d^6$; a splitting of over $30\,000\ \mathrm{cm^{-1}}$ far exceeds any plausible pairing energy for a $4d$ ion, so the complex is low spin, $t_{2g}^6$, and diamagnetic, like essentially all rhodium(III) complexes.
:::
:::

::: exercise Tetrahedral cobalt(II) {level=2 check="-1.2"}
The blue tetrachloridocobaltate(II) ion, $\mathrm{[CoCl_4]^{2-}}$, is tetrahedral. Give its configuration, its number of unpaired electrons and its CFSE in units of $\Delta_\mathrm{t}$. If $\Delta_\mathrm{t} = 3300\ \mathrm{cm^{-1}}$, what $\Delta_\mathrm{o}$ would [[#prop-tetrahedral]] predict for an octahedral cobalt(II) chloride complex at the same distance? (Enter the CFSE as a multiple of $\Delta_\mathrm{t}$.)
::: solution
Cobalt(II) is $d^7$. In a tetrahedral field the $e$ pair lies lowest; high spin fills $e^4t_2^3$, with three unpaired electrons. CFSE $= 4(-0.6) + 3(0.4) = -1.2\Delta_\mathrm{t}$. The octahedral splitting at the same distance would be $\Delta_\mathrm{o} = \tfrac94\Delta_\mathrm{t} = 7425\ \mathrm{cm^{-1}}$, a plausible value for chloride with cobalt(II) (compare $f\,g = 0.78 \times 9.0 \times 10^3 = 7020\ \mathrm{cm^{-1}}$). The dramatic blue of $\mathrm{[CoCl_4]^{2-}}$ against the pale pink of $\mathrm{[Co(H_2O)_6]^{2+}}$ is the basis of the "humidity indicator" in cobalt-doped silica gel.
:::
:::

::: exercise Which spinel? {level=2}
Use octahedral site preference energies to predict whether (a) $\mathrm{NiFe_2O_4}$, (b) $\mathrm{Co_3O_4}$ ($\mathrm{Co^{II}Co^{III}_2O_4}$, with low-spin $\mathrm{Co^{III}}$ in octahedral sites) and (c) $\mathrm{ZnFe_2O_4}$ are normal or inverse spinels.
::: solution
(a) $\mathrm{Ni^{2+}}$, $d^8$: octahedral $-1.2\Delta_\mathrm{o}$, tetrahedral $e^4t_2^4 = -0.8\Delta_\mathrm{t} = -0.356\Delta_\mathrm{o}$; OSPE $= -0.84\Delta_\mathrm{o}$, a strong octahedral preference. $\mathrm{Fe^{3+}}$ ($d^5$) has none, so nickel ferrite is **inverse**, $\mathrm{Fe[NiFe]O_4}$. (b) Low-spin $\mathrm{Co^{3+}}$ in an octahedral site has CFSE $-2.4\Delta_\mathrm{o}$, while in a tetrahedral site it would be high spin with only $-0.6\Delta_\mathrm{t}$; its octahedral preference is overwhelming. $\mathrm{Co^{2+}}$, $d^7$ high spin, has OSPE $= -0.8\Delta_\mathrm{o} + 1.2 \times \tfrac49\Delta_\mathrm{o} = -0.27\Delta_\mathrm{o}$, much smaller (and with a smaller $\Delta_\mathrm{o}$ as well). So $\mathrm{Co^{3+}}$ keeps the octahedral holes: **normal**. (c) $\mathrm{Zn^{2+}}$ ($d^{10}$) and $\mathrm{Fe^{3+}}$ ($d^5$) both have zero CFSE everywhere; there is no crystal field argument, and the observed **normal** structure reflects the strong tetrahedral preference of $\mathrm{Zn^{2+}}$ (its covalent $sp^3$-like bonding, as in ZnO and ZnS).
:::
:::

::: exercise Jahn–Teller or not? {level=2}
For each of the following octahedral ions, state whether you expect no Jahn–Teller distortion, a weak one or a strong one: $\mathrm{[Ti(H_2O)_6]^{3+}}$, $\mathrm{[V(H_2O)_6]^{2+}}$, $\mathrm{[Fe(H_2O)_6]^{2+}}$, $\mathrm{[Co(NH_3)_6]^{3+}}$, $\mathrm{[CuF_6]^{4-}}$ (in $\mathrm{KCuF_3}$), $\mathrm{[MnF_6]^{3-}}$.
::: solution
$\mathrm{Ti^{3+}}$, $t_{2g}^1$: weak ($t_{2g}$ degeneracy). $\mathrm{V^{2+}}$, $t_{2g}^3$: none (each $t_{2g}$ orbital singly occupied, an orbitally non-degenerate ground state). $\mathrm{Fe^{2+}}$ high spin, $t_{2g}^4e_g^2$: weak (a paired electron in one of three $t_{2g}$ orbitals). $\mathrm{Co^{3+}}$ low spin, $t_{2g}^6$: none. $\mathrm{Cu^{2+}}$, $e_g^3$: strong; $\mathrm{KCuF_3}$ is the textbook example of a cooperative Jahn–Teller distortion in a perovskite. $\mathrm{Mn^{3+}}$ with fluoride, high spin $t_{2g}^3e_g^1$: strong.
:::
:::

::: exercise The optimum distortion {level=3 check="30"}
For a copper(II) complex, take the coefficients of [[#prop-jt-size]] as $a = 3.0\ \mathrm{kJ\,mol^{-1}\,pm^{-1}}$ and $k = 0.050\ \mathrm{kJ\,mol^{-1}\,pm^{-2}}$. (a) Find the elongation $\delta^*$ and the Jahn–Teller stabilisation energy. (b) Show that doubling $k$ halves $\delta^*$ and halves the stabilisation. (c) Explain why the distortion would vanish for nickel(II) with the same coefficients. (Enter $\delta^*$ in pm.)
::: hint
Write $E(\delta) = -\tfrac12 a\delta + \tfrac12 k\delta^2$ and differentiate.
:::
::: solution
(a) $\dd E/\dd\delta = -\tfrac12 a + k\delta = 0$ gives $\delta^* = a/2k = 3.0/(2 \times 0.050) = 30\ \mathrm{pm}$. Then $E(\delta^*) = -\tfrac12(3.0)(30) + \tfrac12(0.050)(30)^2 = -45 + 22.5 = -22.5\ \mathrm{kJ\,mol^{-1}}$, which equals $-a^2/8k = -9.0/0.40$. (b) With $k = 0.100$: $\delta^* = 15\ \mathrm{pm}$ and $E = -9.0/0.80 = -11.25\ \mathrm{kJ\,mol^{-1}}$: both halve, since both are proportional to $1/k$. A stiffer framework (chelating or macrocyclic ligands) suppresses the distortion. (c) Nickel(II), $e_g^2$, has one electron in each $e_g$ orbital, so $n_1 - n_2 = 0$, the linear term vanishes, and the minimum is at $\delta = 0$: the octahedron is regular. The size of the distortion found here, a few tens of picometres, matches the difference between short and long bonds in many copper(II) compounds (for $\mathrm{CuCl_2}$, $295 - 230 = 65\ \mathrm{pm}$, of which the elongation of the axial bonds is the larger part).
:::
:::

::: exercise Why is hexaaquacobalt(III) low spin? {level=3 check="13.3"}
For $\mathrm{[Co(H_2O)_6]^{3+}}$, [[#prop-jorgensen]] gives $\Delta_\mathrm{o} \approx 18\,200\ \mathrm{cm^{-1}}$, and the free-ion pairing energy of $\mathrm{Co^{3+}}$ is $21\,000\ \mathrm{cm^{-1}}$. (a) What spin state does [[#prop-spin-state]] predict with these numbers? (b) The ion is in fact low spin and diamagnetic. By what minimum percentage must the pairing energy be reduced in the complex for the criterion to agree? (c) Is such a reduction plausible? (Enter the minimum percentage reduction, to three significant figures.)
::: solution
(a) $\Delta_\mathrm{o} = 18\,200 < P = 21\,000$, so the criterion predicts high spin, $t_{2g}^4e_g^2$, with four unpaired electrons. (b) Low spin needs $P < 18\,200\ \mathrm{cm^{-1}}$, a reduction of at least $(21\,000 - 18\,200)/21\,000 = 0.133$, or **13.3 %**. (c) Yes. In a complex the metal $d$ orbitals mix with ligand orbitals and expand, which lowers interelectronic repulsion by 15–30 % for typical ligands (the nephelauxetic effect, measured by the Racah parameter in [[coordination-chemistry/spectra-of-complexes]]). The spin-state criterion with free-ion pairing energies is therefore biased towards high spin, and $\mathrm{[Co(H_2O)_6]^{3+}}$ is a borderline case where the bias matters. A second effect works the same way: low-spin $\mathrm{Co^{III}{-}O}$ bonds are shorter than high-spin ones, so the $\Delta_\mathrm{o}$ appropriate to the low-spin state is larger than the average value used here. (The ion is a powerful oxidant, $E^\circ(\mathrm{Co^{3+}/Co^{2+}}) = +1.92\ \mathrm{V}$, and oxidises water slowly.)
:::
:::
