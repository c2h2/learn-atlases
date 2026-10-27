The Boltzmann distribution of [[statistical-thermodynamics/boltzmann-distribution]] ended with a normalising sum, $q = \sum_i e^{-\beta\varepsilon_i}$, that looked like a piece of bookkeeping. It is much more than that. Every thermodynamic property of a perfect gas — its energy, heat capacity, entropy, pressure, chemical potential and the equilibrium constants of its reactions — can be computed from $q$ and its derivatives with respect to temperature and volume. To know the partition function is to know the thermodynamics; to compute it, you need only the energy levels, which spectroscopy measures and quantum mechanics predicts.

This lesson builds the molecular partition function piece by piece. We first learn to read it as the number of thermally accessible states, then show that it factorises into contributions from translation, rotation, vibration and electronic excitation, and evaluate each with the model systems of [[quantum-chemistry/model-systems]] and [[quantum-chemistry/vibration-rotation]]. Along the way we meet the characteristic temperatures that tell us at a glance whether a motion is "frozen", partly excited or classical, the symmetry number that corrects the rotational sum, and the nuclear-spin statistics that make hydrogen exist as two different gases. At the end you will be able to compute, from a few spectroscopic constants, a number such as "a nitrogen molecule at room temperature and 1 bar has about $3\times10^{8}$ thermally accessible states" — and know what it means.

## What the partition function measures

::: definition The molecular partition function {#def-q}
For a molecule with states $i$ of energy $\varepsilon_i$ (measured from the ground state), or levels $j$ of energy $\varepsilon_j$ and degeneracy $g_j$, the **molecular partition function** at temperature $T$ is
$$
q = \sum_{\text{states } i} e^{-\beta\varepsilon_i} = \sum_{\text{levels } j} g_j\,e^{-\beta\varepsilon_j}, \qquad \beta = \frac{1}{k_\mathrm{B}T} .
$$ {#eq-q}
It is a dimensionless, pure number, and it depends on the temperature and — through the energy levels — on the volume and the molecular constants.
:::

The partition function is an indicator of the **number of thermally accessible states**. A state with $\varepsilon_i \ll k_\mathrm{B}T$ contributes almost exactly 1 to the sum; a state with $\varepsilon_i \gg k_\mathrm{B}T$ contributes almost nothing. So $q$ counts, with a smooth weighting, the states that lie within a few $k_\mathrm{B}T$ of the ground state. Two limits make this precise:
$$
\lim_{T\to0} q = g_0, \qquad \lim_{T\to\infty} q = \text{total number of states}.
$$
At absolute zero only the ground level is accessible (and if it is non-degenerate, $q = 1$); at infinite temperature every state is equally accessible and $q$ counts them all — infinitely many for most real molecules.

Two exactly solvable cases show the idea working.

::: proposition Partition functions of a two-level system and a uniform ladder {#prop-ladder}
(a) For a molecule with two non-degenerate states at $0$ and $\varepsilon$,
$$
q = 1 + e^{-\beta\varepsilon} ,
$$
which rises from 1 at $T = 0$ to 2 as $T\to\infty$.

(b) For an infinite ladder of non-degenerate, equally spaced levels $0, \varepsilon, 2\varepsilon, \ldots$,
$$
q = \frac{1}{1 - e^{-\beta\varepsilon}} ,
$$ {#eq-ladder}
which rises from 1 at $T = 0$ and grows without limit, approaching $k_\mathrm{B}T/\varepsilon$ when $k_\mathrm{B}T \gg \varepsilon$.
:::

::: proof
(a) is the definition with two terms. For (b), $q = \sum_{v=0}^{\infty}x^{v}$ with $x = e^{-\beta\varepsilon} < 1$, a geometric series with sum $1/(1-x)$. When $\beta\varepsilon \ll 1$, $1 - e^{-\beta\varepsilon} \approx \beta\varepsilon$, so $q \approx 1/\beta\varepsilon = k_\mathrm{B}T/\varepsilon$: the number of accessible rungs is the thermal energy divided by the rung spacing, exactly as the "number of accessible states" picture suggests.
:::

A warning about the zero of energy is in order before we go further, because it causes endless confusion.

::: warning The partition function depends on where you put the zero of energy {#warn-zero}
If every energy is shifted by a constant, $\varepsilon_i \to \varepsilon_i + \varepsilon_0$, the partition function is multiplied by $e^{-\beta\varepsilon_0}$. Populations (ratios) are unaffected, but the *value* of $q$ is not, and nor are quantities such as the internal energy computed from it. In this course we measure every molecular energy from the **lowest state** of the molecule, so that each $q \ge 1$ and $q\to g_0$ as $T\to0$. For a harmonic vibration this means measuring from the zero-point level, not from the bottom of the potential well; tables that use the other convention include an extra factor $e^{-\beta hc\tilde\nu/2}$. When we come to equilibrium constants ([[statistical-thermodynamics/equilibrium-from-molecules]]) the different zeros of different molecules are reinstated explicitly through the reaction energy $\Delta_\mathrm{r}E_0$; forgetting either the convention or the correction gives answers wrong by many orders of magnitude.
:::

## Factorisation into modes

A molecule's energy is, to an excellent approximation, a sum of independent contributions: the kinetic energy of its centre of mass, the energy of rotation, of vibration and of electronic excitation. Such separability is never exact (rotation stretches bonds; vibration changes the moment of inertia) but the coupling terms are small, and their neglect is the standard approximation of the subject.

::: proposition Factorisation of the partition function {#prop-factor}
If the energy of every state is a sum of independent contributions,
$$
\varepsilon_{i} = \varepsilon^\mathrm{T}_{a} + \varepsilon^\mathrm{R}_{b} + \varepsilon^\mathrm{V}_{c} + \varepsilon^\mathrm{E}_{d},
$$
with each index running over its own set of states independently of the others, then the partition function is a product,
$$
q = q^\mathrm{T}\,q^\mathrm{R}\,q^\mathrm{V}\,q^\mathrm{E} .
$$ {#eq-factor}
The same holds within a mode: a polyatomic molecule with independent normal modes has $q^\mathrm{V} = \prod_k q^\mathrm{V}_k$.
:::

::: proof
Sum over all combinations of the independent indices:
$$
q = \sum_{a,b,c,d} e^{-\beta(\varepsilon^\mathrm{T}_a + \varepsilon^\mathrm{R}_b + \varepsilon^\mathrm{V}_c + \varepsilon^\mathrm{E}_d)}
= \sum_{a}e^{-\beta\varepsilon^\mathrm{T}_a}\sum_{b}e^{-\beta\varepsilon^\mathrm{R}_b}\sum_{c}e^{-\beta\varepsilon^\mathrm{V}_c}\sum_{d}e^{-\beta\varepsilon^\mathrm{E}_d},
$$
because the exponential of a sum is the product of exponentials and the multiple sum of a product of factors, each depending on a different index, is the product of the single sums. The step requires that the allowed values of each index do not depend on the others — exactly the meaning of "independent".
:::

Factorisation turns one impossible sum into four easy ones. Logarithms of partition functions — which is how they enter thermodynamics — become sums: $\ln q = \ln q^\mathrm{T} + \ln q^\mathrm{R} + \ln q^\mathrm{V} + \ln q^\mathrm{E}$, and so the energy, entropy and heat capacity are sums of translational, rotational, vibrational and electronic contributions ([[statistical-thermodynamics/thermodynamic-functions]]).

## Translation

The translational energy levels of a molecule of mass $m$ in a cubic box of side $L$ are those of the three-dimensional particle in a box, $\varepsilon = (n_x^{2} + n_y^{2} + n_z^{2})h^{2}/8mL^{2}$ with $n_x, n_y, n_z = 1, 2, \ldots$ ([[quantum-chemistry/model-systems]]). The motions along the three axes are independent, so by [[#prop-factor]] $q^\mathrm{T} = q_xq_yq_z$.

::: proposition The translational partition function {#prop-qt}
For a molecule of mass $m$ in a container of volume $V$ at temperature $T$,
$$
q^\mathrm{T} = \frac{V}{\Lambda^{3}}, \qquad \Lambda = \frac{h}{(2\pi mk_\mathrm{B}T)^{1/2}} ,
$$ {#eq-qt}
where $\Lambda$ is the **thermal wavelength**. The result holds whenever $\Lambda \ll L$, which is the case for every molecule in any container of laboratory size.
:::

::: proof
For one dimension, measuring energies from the lowest level $n = 1$ (the difference is utterly negligible), $\varepsilon_n = (n^{2} - 1)\varepsilon$ with $\varepsilon = h^{2}/8mL^{2}$. Then
$$
q_x = \sum_{n=1}^{\infty}e^{-(n^{2}-1)\beta\varepsilon} \approx \int_{0}^{\infty}e^{-n^{2}\beta\varepsilon}\,\mathrm{d}n = \frac{1}{2}\left(\frac{\pi}{\beta\varepsilon}\right)^{1/2} .
$$
The replacement of the sum by an integral is justified because $\beta\varepsilon$ is fantastically small — for an argon atom in a $1\ \mathrm{cm}$ box at room temperature, $\beta\varepsilon \approx 2\times10^{-18}$ — so the terms change imperceptibly from one $n$ to the next, and the shift of the lower limit from 1 to 0 changes the sum by about one part in $10^{9}$. Substituting $\varepsilon$:
$$
q_x = \frac{1}{2}\left(\frac{8\pi mL^{2}}{\beta h^{2}}\right)^{1/2} = \left(\frac{2\pi m k_\mathrm{B}T}{h^{2}}\right)^{1/2}L = \frac{L}{\Lambda} .
$$
Multiplying the three identical factors gives $q^\mathrm{T} = L^{3}/\Lambda^{3} = V/\Lambda^{3}$. The result depends only on the volume, not on the shape of the box, as a more careful treatment confirms.
:::

The thermal wavelength is, up to a factor of order one, the de Broglie wavelength of a molecule with the typical thermal momentum $(mk_\mathrm{B}T)^{1/2}$. The translational partition function therefore counts how many cubes of side $\Lambda$ — how many "quantum cells" — fit into the container. Because $\Lambda$ is tiny, that number is huge.

::: example The translational partition function of argon {#ex-argon}
Calculate $\Lambda$ and $q^\mathrm{T}$ for an argon atom ($M = 39.948\ \mathrm{g\,mol^{-1}}$) at $298.15\ \mathrm{K}$ in a volume equal to the molar volume of a perfect gas at $1\ \mathrm{bar}$, $V_\mathrm{m} = RT/p^\circ$.
::: solution
The mass is $m = 39.948\times1.660\,54\times10^{-27}\ \mathrm{kg} = 6.6335\times10^{-26}\ \mathrm{kg}$. Then
$$
\Lambda = \frac{6.626\,07\times10^{-34}\ \mathrm{J\,s}}{\left(2\pi\times6.6335\times10^{-26}\ \mathrm{kg}\times1.380\,65\times10^{-23}\ \mathrm{J\,K^{-1}}\times298.15\ \mathrm{K}\right)^{1/2}} = 1.600\times10^{-11}\ \mathrm{m} = 16.0\ \mathrm{pm}.
$$
The molar volume is $V_\mathrm{m} = 8.3145\times298.15/10^{5} = 2.4790\times10^{-2}\ \mathrm{m^{3}}$, so
$$
q^\mathrm{T} = \frac{V_\mathrm{m}}{\Lambda^{3}} = \frac{2.4790\times10^{-2}\ \mathrm{m^{3}}}{(1.600\times10^{-11}\ \mathrm{m})^{3}} = 6.06\times10^{30} .
$$
There are about $6\times10^{30}$ accessible translational states for each atom — some $10^{7}$ times more than there are atoms ($N_\mathrm{A} = 6.0\times10^{23}$) in that volume. This ratio, $q^\mathrm{T}/N \gg 1$, is what makes the gas "classical": the chance that two atoms want the same state is negligible, a condition we examine closely in [[statistical-thermodynamics/canonical-ensemble]] and [[statistical-thermodynamics/quantum-statistics]].
:::
:::

## Rotation

For a linear rigid rotor the levels are $\varepsilon_J = hcBJ(J+1)$ with degeneracy $2J+1$, $J = 0, 1, 2, \ldots$, where $B$ is the rotational constant in wavenumbers ([[quantum-chemistry/vibration-rotation]]). The natural temperature scale is the **rotational temperature**
$$
\theta_\mathrm{R} = \frac{hcB}{k_\mathrm{B}} ,
$$
and the partition function $q^\mathrm{R} = \sum_J(2J+1)e^{-\theta_\mathrm{R}J(J+1)/T}$ depends only on $T/\theta_\mathrm{R}$. For most molecules $\theta_\mathrm{R}$ is a few kelvin ($2.87\ \mathrm{K}$ for $\mathrm{N_2}$, $15.2\ \mathrm{K}$ for $\mathrm{HCl}$), so at ordinary temperatures many levels are populated and the sum can be replaced by an integral. Hydrogen, with $\theta_\mathrm{R} \approx 85\ \mathrm{K}$, is the exception.

::: proposition The rotational partition function {#prop-qr}
At temperatures $T \gg \theta_\mathrm{R}$, a linear molecule has
$$
q^\mathrm{R} = \frac{k_\mathrm{B}T}{\sigma hcB} = \frac{T}{\sigma\theta_\mathrm{R}} ,
$$ {#eq-qr}
where the **symmetry number** $\sigma$ is 1 for a heteronuclear molecule ($\mathrm{HCl}$, $\mathrm{CO}$, $\mathrm{N_2O}$) and 2 for a homonuclear or centrosymmetric one ($\mathrm{N_2}$, $\mathrm{O_2}$, $\mathrm{CO_2}$, $\mathrm{HC{\equiv}CH}$). The first correction is $q^\mathrm{R} = (T/\theta_\mathrm{R} + \tfrac{1}{3} + \cdots)/\sigma$. A nonlinear molecule with rotational constants $A$, $B$, $C$ has, in the same limit,
$$
q^\mathrm{R} = \frac{1}{\sigma}\left(\frac{k_\mathrm{B}T}{hc}\right)^{3/2}\left(\frac{\pi}{ABC}\right)^{1/2} ,
$$ {#eq-qr-nl}
with $\sigma$ the number of indistinguishable orientations reachable by proper rotation (the order of the rotational subgroup of the point group): 2 for $\mathrm{H_2O}$, 3 for $\mathrm{NH_3}$, 12 for $\mathrm{CH_4}$ and 12 for $\mathrm{C_6H_6}$.
:::

::: proof
For the linear heteronuclear case, put $x = J(J+1)$, so that $\mathrm{d}x = (2J+1)\,\mathrm{d}J$, and replace the sum by an integral (legitimate when $\theta_\mathrm{R}/T \ll 1$, because successive terms then differ little):
$$
q^\mathrm{R} \approx \int_{0}^{\infty}(2J+1)e^{-\theta_\mathrm{R}J(J+1)/T}\,\mathrm{d}J = \int_{0}^{\infty}e^{-\theta_\mathrm{R}x/T}\,\mathrm{d}x = \frac{T}{\theta_\mathrm{R}} .
$$
The Euler–Maclaurin formula, which estimates the difference between a sum and its integral, adds $\tfrac{1}{3} + \theta_\mathrm{R}/15T + \cdots$. For a homonuclear molecule the Pauli principle (applied to the nuclei, see below) allows only half of the rotational levels for any given nuclear-spin state; at high temperature this halves the sum, giving the factor $1/\sigma$ with $\sigma = 2$. Classically, $\sigma$ corrects for counting as distinct the orientations that differ only by interchanging identical nuclei. The nonlinear formula follows from the same integral over the classical rotational energy with three moments of inertia; we state it without the longer derivation (see McQuarrie, *Statistical Mechanics*, ch. 8).
:::

::: widget plot
f: sum((2*j + 1)*exp(-j*(j + 1)/x), j, 0, 40); x + 1/3; x
x: 0.05, 5
y: 0, 6
labels: \text{exact sum}; T/\theta_\mathrm{R} + 1/3; T/\theta_\mathrm{R}
caption: The rotational partition function of a heteronuclear linear rotor against $x = T/\theta_\mathrm{R}$: the exact sum over $J$ (first curve), the high-temperature formula of [[#prop-qr]] with its first correction, and the bare formula $T/\theta_\mathrm{R}$. At low $x$ the exact sum tends to 1 (only $J = 0$ is populated) while the approximations fail completely; already at $x = 2$ the corrected formula is accurate to $0.2\,\%$. At room temperature $x$ is 20 for HCl and about 100 for $\mathrm{N_2}$ or CO, far off the right-hand edge of this plot.
:::

::: example Rotational partition functions of HCl, N₂ and H₂O {#ex-rot}
Using $B(\mathrm{HCl}) = 10.59\ \mathrm{cm^{-1}}$, $B(\mathrm{N_2}) = 1.998\ \mathrm{cm^{-1}}$ and, for $\mathrm{H_2O}$, $A = 27.88$, $B = 14.51$, $C = 9.28\ \mathrm{cm^{-1}}$, evaluate $q^\mathrm{R}$ at $298.15\ \mathrm{K}$. For HCl compare the high-temperature formula with the exact sum.
::: solution
At $298.15\ \mathrm{K}$, $k_\mathrm{B}T/hc = T/c_2 = 298.15/1.438\,78 = 207.22\ \mathrm{cm^{-1}}$.

*HCl* ($\sigma = 1$): $q^\mathrm{R} = 207.22/10.59 = 19.57$; with the $\tfrac{1}{3}$ correction, $19.90$. Summing $(2J+1)e^{-hcBJ(J+1)/k_\mathrm{B}T}$ term by term (30 terms suffice) gives $19.90$. The bare formula is low by $1.7\,\%$ even here, because $\theta_\mathrm{R} = 15.2\ \mathrm{K}$ is not negligible.

*N₂* ($\sigma = 2$): $q^\mathrm{R} = 207.22/(2\times1.998) = 51.9$.

*H₂O* ($\sigma = 2$, $C_{2v}$ has two proper rotations, $E$ and $C_2$):
$$
q^\mathrm{R} = \frac{1}{2}(207.22)^{3/2}\left(\frac{\pi}{27.88\times14.51\times9.28}\right)^{1/2} = \frac{1}{2}\times2983\times0.02893 = 43.1 .
$$
Each molecule has a few tens of accessible rotational states at room temperature — vastly fewer than its $10^{30}$ translational states, but enough that rotation is fully classical, which is why rotation contributes its full equipartition value to the heat capacity ([[statistical-thermodynamics/thermodynamic-functions]]).
:::
:::

### Nuclear spin and the two kinds of hydrogen

The symmetry number hides some beautiful physics. The two protons of $\mathrm{H_2}$ are identical fermions, so the total wavefunction must change sign when they are exchanged. Exchange of the nuclei multiplies the rotational wavefunction by $(-1)^{J}$; the nuclear-spin functions are either symmetric (three **ortho** states, total spin $I = 1$) or antisymmetric (one **para** state, $I = 0$). To keep the total antisymmetric, ortho-hydrogen must have odd $J$ and para-hydrogen even $J$. The nuclear-spin–rotation partition function is therefore
$$
q^\mathrm{R,ns} = \underbrace{\sum_{J\ \text{even}}(2J+1)e^{-\theta_\mathrm{R}J(J+1)/T}}_{\text{para}} \;+\; 3\underbrace{\sum_{J\ \text{odd}}(2J+1)e^{-\theta_\mathrm{R}J(J+1)/T}}_{\text{ortho}} .
$$
At high temperature each sum is half the full rotational sum, so $q^\mathrm{R,ns} \to 4\times\tfrac{1}{2}(T/\theta_\mathrm{R})$ = (nuclear-spin degeneracy $2^{2}$)×$T/\sigma\theta_\mathrm{R}$ with $\sigma = 2$: this is where the symmetry number comes from. The ortho : para ratio tends to $3 : 1$.

::: widget plot
f: 3*sum((4*j + 3)*exp(-th*(2*j + 1)*(2*j + 2)/x), j, 0, 25)/sum((4*j + 1)*exp(-th*(2*j)*(2*j + 1)/x), j, 0, 25); 3
x: 10, 400
y: 0, 3.5
sliders: th=85.3:20:100:0.1
labels: \text{ortho : para at equilibrium}; 3
caption: The equilibrium ratio of ortho- to para-hydrogen against temperature $T$ (in K), from the two sums above with $\theta_\mathrm{R} = 85.3\ \mathrm{K}$ for $\mathrm{H_2}$ (slider `th`). The ratio approaches $3$ only above about $250\ \mathrm{K}$; at $77\ \mathrm{K}$ (liquid nitrogen) it is close to $1$, and at $20\ \mathrm{K}$ (liquid hydrogen) equilibrium hydrogen is almost pure para. Set `th` to $43.0\ \mathrm{K}$ for $\mathrm{D_2}$ — but note that deuterons are bosons with $I = 1$, so for $\mathrm{D_2}$ the roles are swapped (six ortho states with even $J$, three para with odd $J$) and this formula does not apply without change.
:::

::: example Ortho- and para-hydrogen at liquid-nitrogen temperature {#ex-orthopara}
Taking $\theta_\mathrm{R} = 85.3\ \mathrm{K}$ for $\mathrm{H_2}$, estimate the equilibrium fraction of para-hydrogen at $77\ \mathrm{K}$, keeping the first three terms of each sum. Why does ordinary hydrogen, cooled to $77\ \mathrm{K}$ in a clean vessel, not reach this composition?
::: solution
With $\theta_\mathrm{R}/T = 85.3/77 = 1.108$, the para sum is
$$
1 + 5e^{-6\times1.108} + 9e^{-20\times1.108} = 1 + 5\times1.30\times10^{-3} + 9\times2.4\times10^{-10} = 1.0065,
$$
and the ortho sum (times 3) is
$$
3\left(3e^{-2\times1.108} + 7e^{-12\times1.108} + 11e^{-30\times1.108}\right) = 3\left(0.3269 + 1.2\times10^{-5} + \cdots\right) = 0.981 .
$$
The para fraction is $1.0065/(1.0065 + 0.981) = 0.506$, about one half (the full sums give the same to three figures). But ortho–para conversion requires flipping a nuclear spin, which neither collisions nor radiation do efficiently: uncatalysed, hydrogen keeps its room-temperature $3 : 1$ composition for days or weeks. A paramagnetic catalyst (hydrous iron(III) oxide, activated charcoal) establishes equilibrium. The distinction matters industrially: liquid hydrogen must be converted to para before storage, because the heat released by slow ortho→para conversion ($\approx 1.06\ \mathrm{kJ\,mol^{-1}}$, more than the enthalpy of vaporisation of $0.90\ \mathrm{kJ\,mol^{-1}}$) would boil it away.
:::
:::

## Vibration

A harmonic vibration of wavenumber $\tilde\nu$ has levels $hc\tilde\nu(v + \tfrac{1}{2})$, $v = 0, 1, 2, \ldots$, all non-degenerate. Measured from the zero-point level, they form exactly the uniform ladder of [[#prop-ladder]](b). We define the **vibrational temperature** $\theta_\mathrm{V} = hc\tilde\nu/k_\mathrm{B}$.

::: proposition The vibrational partition function {#prop-qv}
A harmonic oscillator of wavenumber $\tilde\nu$, with energies measured from its zero-point level, has
$$
q^\mathrm{V} = \frac{1}{1 - e^{-hc\tilde\nu/k_\mathrm{B}T}} = \frac{1}{1 - e^{-\theta_\mathrm{V}/T}} ,
$$ {#eq-qv}
tending to 1 for $T \ll \theta_\mathrm{V}$ and to $T/\theta_\mathrm{V}$ for $T \gg \theta_\mathrm{V}$. A polyatomic molecule with normal-mode wavenumbers $\tilde\nu_k$ (each degenerate mode listed as often as its degeneracy) has $q^\mathrm{V} = \prod_k (1 - e^{-\theta_{\mathrm{V},k}/T})^{-1}$.
:::

::: proof
This is [[#eq-ladder]] with $\varepsilon = hc\tilde\nu$; the limits are those of [[#prop-ladder]]. For a polyatomic molecule the normal modes are independent in the harmonic approximation and [[#prop-factor]] gives the product.
:::

Vibrational temperatures are high: $3393\ \mathrm{K}$ for $\mathrm{N_2}$, $4303\ \mathrm{K}$ for HCl, $805\ \mathrm{K}$ for $\mathrm{Cl_2}$ and $309\ \mathrm{K}$ for $\mathrm{I_2}$. So at room temperature $q^\mathrm{V}$ is very close to 1 for most stretching vibrations (only the ground state is accessible), but noticeably larger for heavy diatomics and for the low-frequency bending and torsional modes of polyatomics. Real vibrations are anharmonic; the correction to $q^\mathrm{V}$ is usually below $1\,\%$ at room temperature but grows at high temperature, where it matters for combustion chemistry.

::: example The vibrational partition function of carbon dioxide {#ex-co2}
The normal modes of $\mathrm{CO_2}$ are the symmetric stretch ($1388.2\ \mathrm{cm^{-1}}$), the doubly degenerate bend ($667.4\ \mathrm{cm^{-1}}$) and the antisymmetric stretch ($2349.2\ \mathrm{cm^{-1}}$). Calculate $q^\mathrm{V}$ at $298.15\ \mathrm{K}$ and $1000\ \mathrm{K}$, and say which mode dominates.
::: solution
A linear triatomic has $3N - 5 = 4$ vibrational modes, so the bend is counted twice in the product of [[#prop-qv]]. At $298.15\ \mathrm{K}$ the four factors $1/(1 - e^{-c_2\tilde\nu/T})$ are
$$
1.0012\ (\text{sym. stretch}),\quad 1.0416\ (\text{bend}),\quad 1.0416\ (\text{bend}),\quad 1.000\,012\ (\text{antisym. stretch}),
$$
so $q^\mathrm{V} = 1.0012\times1.0416^{2}\times1.000\,012 = 1.086$. At $1000\ \mathrm{K}$ they are $1.157$, $1.620$, $1.620$ and $1.035$, giving $q^\mathrm{V} = 3.14$. The low-frequency bend dominates at both temperatures: its degeneracy doubles its effect, and its vibrational temperature ($960\ \mathrm{K}$) is less than half that of the symmetric stretch. The same is true of most polyatomic molecules — bends, torsions and skeletal deformations below $\sim 600\ \mathrm{cm^{-1}}$ carry nearly all the vibrational partition function at room temperature, and for floppy molecules an internal rotation (the methyl torsion of ethane, the ring puckering of cyclopentane) must be treated as a hindered rotor rather than a harmonic oscillator, because its levels are too close together and too anharmonic for [[#eq-qv]].
:::
:::

::: widget plot
f: 1/(1 - exp(-1/x)); x; x + 1/2
x: 0.05, 3
y: 0, 4
labels: q^\mathrm{V}; T/\theta_\mathrm{V}; T/\theta_\mathrm{V} + 1/2
caption: The vibrational partition function [[#eq-qv]] against $x = T/\theta_\mathrm{V}$, compared with the classical limit $T/\theta_\mathrm{V}$ and the improved form $T/\theta_\mathrm{V} + \tfrac{1}{2}$. Below $x \approx 0.2$ the oscillator is frozen in its ground state and $q^\mathrm{V} \approx 1$; above $x \approx 1$ the curve runs parallel to the classical line. Room temperature is $x = 0.09$ for $\mathrm{N_2}$ and $x = 0.97$ for $\mathrm{I_2}$.
:::

## Electronic states

Electronic excitation energies are usually several electronvolts — tens of thousands of kelvin — so at ordinary temperatures only the ground electronic level is populated and $q^\mathrm{E} = g_0$, its degeneracy. For a closed-shell molecule $g_0 = 1$; for $\mathrm{O_2}$, whose ground term is $^{3}\Sigma_\mathrm{g}^{-}$, $g_0 = 3$; for an atom in a term $^{2S+1}L_J$, $g = 2J + 1$ (so $g = 4$ for the $^{2}\mathrm{P}_{3/2}$ ground level of iodine and chlorine atoms, and $g = 2$ for the $^{2}\mathrm{S}_{1/2}$ hydrogen atom). The exceptions are molecules and atoms with low-lying excited levels, typically from spin–orbit splitting, where $q^\mathrm{E}$ must be summed explicitly.

::: example The electronic partition function of NO {#ex-no}
Nitric oxide has a $^{2}\Pi_{1/2}$ ground level and a $^{2}\Pi_{3/2}$ level only $121.1\ \mathrm{cm^{-1}}$ above it; each is doubly degenerate, and all other electronic states are far higher. Calculate $q^\mathrm{E}$ and the fraction of molecules in the upper level at $100\ \mathrm{K}$ and $298.15\ \mathrm{K}$.
::: solution
$q^\mathrm{E} = 2 + 2e^{-c_2\tilde\nu/T}$ with $c_2\tilde\nu = 1.438\,78\times121.1 = 174.2\ \mathrm{K}$.

At $100\ \mathrm{K}$: $e^{-1.742} = 0.1752$, so $q^\mathrm{E} = 2 + 0.350 = 2.35$, and the upper fraction is $0.350/2.350 = 0.149$.

At $298.15\ \mathrm{K}$: $e^{-0.5844} = 0.5574$, so $q^\mathrm{E} = 2 + 1.115 = 3.11$, and the upper fraction is $1.115/3.115 = 0.358$.

As $T\to\infty$ the value approaches 4 and the fraction $\tfrac{1}{2}$. Because the population of the upper level changes markedly between $100$ and $300\ \mathrm{K}$, NO has an anomalous electronic contribution to its heat capacity in this range — a Schottky peak that we compute in [[statistical-thermodynamics/thermodynamic-functions]].
:::
:::

::: quiz
Which of the following molecules has the *largest* vibrational partition function at $298\ \mathrm{K}$ (each treated as a harmonic diatomic)?
- [ ] $\mathrm{H_2}$, $\tilde\nu = 4401\ \mathrm{cm^{-1}}$
- [ ] $\mathrm{N_2}$, $\tilde\nu = 2359\ \mathrm{cm^{-1}}$
- [ ] $\mathrm{Cl_2}$, $\tilde\nu = 560\ \mathrm{cm^{-1}}$
- [x] $\mathrm{I_2}$, $\tilde\nu = 214.5\ \mathrm{cm^{-1}}$
::: solution
$q^\mathrm{V} = 1/(1 - e^{-\theta_\mathrm{V}/T})$ decreases monotonically with $\theta_\mathrm{V} = hc\tilde\nu/k_\mathrm{B}$, so the lowest wavenumber wins: $q^\mathrm{V}(\mathrm{I_2}) = 1.55$, against $1.07$ for $\mathrm{Cl_2}$ and $1.000\,01$ for $\mathrm{N_2}$. Heavy atoms and weak bonds give low vibrational wavenumbers ($\tilde\nu \propto (k_\mathrm{f}/\mu)^{1/2}$) and hence many thermally accessible vibrational states.
:::
:::

## The whole molecule

::: example How many states does a nitrogen molecule have? {#ex-n2}
Calculate the overall molecular partition function of $\mathrm{N_2}$ ($M = 28.014\ \mathrm{g\,mol^{-1}}$, $B = 1.998\ \mathrm{cm^{-1}}$, $\tilde\nu = 2358.6\ \mathrm{cm^{-1}}$, ground term $^{1}\Sigma_\mathrm{g}^{+}$) at $298.15\ \mathrm{K}$, taking for the volume the volume per molecule of the perfect gas at $1\ \mathrm{bar}$, $V = k_\mathrm{B}T/p^\circ$.
::: solution
*Translation.* $m = 28.014\times1.660\,54\times10^{-27} = 4.6518\times10^{-26}\ \mathrm{kg}$, so $\Lambda = h/(2\pi mk_\mathrm{B}T)^{1/2} = 1.910\times10^{-11}\ \mathrm{m}$. With $V = k_\mathrm{B}T/p^\circ = 4.116\times10^{-26}\ \mathrm{m^{3}}$,
$$
q^\mathrm{T} = \frac{4.116\times10^{-26}}{(1.910\times10^{-11})^{3}} = 5.91\times10^{6} .
$$
*Rotation.* $q^\mathrm{R} = 207.22/(2\times1.998) = 51.9$ (from [[#ex-rot]]).

*Vibration.* $\theta_\mathrm{V} = 1.438\,78\times2358.6 = 3393\ \mathrm{K}$, so $q^\mathrm{V} = 1/(1 - e^{-11.38}) = 1.000\,011$.

*Electronic.* The ground term is non-degenerate and the first excited state lies above $6\ \mathrm{eV}$: $q^\mathrm{E} = 1$.

By [[#eq-factor]],
$$
q = 5.91\times10^{6}\times51.9\times1.000\,011\times1 = 3.06\times10^{8} .
$$
Of the roughly $3\times10^{8}$ accessible states, translation supplies almost all; rotation multiplies them by about 50; vibration and electronic excitation contribute nothing at room temperature. This hierarchy — translation ≫ rotation ≫ vibration ≥ electronic — holds for almost every small molecule and organises every calculation in the rest of the course. (The value of $q^\mathrm{T}$ here is per molecule in its share of the volume; the molar quantity $q^\circ_\mathrm{m}/N_\mathrm{A}$ used for equilibrium constants is exactly this number, as we shall see.)
:::
:::

::: application Where the numbers come from
The spectroscopic constants used in this lesson ($B$, $\tilde\nu$, term energies) are of the kind tabulated by Huber and Herzberg, *Constants of Diatomic Molecules* (1979), and reproduced in the NIST Chemistry WebBook; values for polyatomics come from rotational and vibrational spectroscopy ([[spectroscopy/rotational-spectroscopy]], [[spectroscopy/vibrational-spectroscopy]]) or, increasingly, from quantum-chemical calculations ([[computational-chemistry/potential-energy-surfaces]]). Thermochemical tables such as JANAF are computed from exactly these partition functions, with anharmonic and centrifugal corrections, and are more accurate than any direct calorimetric measurement for small gas-phase molecules.
:::

::: history
The German name *Zustandssumme*, \"sum over states\", is the origin of the symbol $Z$ still used for partition functions; the English name "partition function" is due to Charles Galton Darwin and Ralph Fowler, whose 1922 papers treated the "partition of energy" among the states of molecules and whose method was the basis of Fowler's *Statistical Mechanics* (1929). The translational sum had been evaluated in effect by Otto Sackur and Hugo Tetrode in 1912, when they obtained the absolute entropy of a monatomic gas ([[statistical-thermodynamics/canonical-ensemble]]). The role of nuclear spin was uncovered by Werner Heisenberg and Friedrich Hund in 1927, who explained the alternating intensities in band spectra of homonuclear molecules; David Dennison showed in the same year that the anomalous low-temperature heat capacity of hydrogen could be explained only if ortho- and para-hydrogen do not interconvert on the timescale of the measurement. Karl Friedrich Bonhoeffer and Paul Harteck prepared nearly pure para-hydrogen in 1929 by catalytic conversion on charcoal at low temperature, confirming the prediction.
:::

## Where this leads

With the four factors in hand we can compute thermodynamic functions: the next lesson ([[statistical-thermodynamics/thermodynamic-functions]]) obtains the internal energy and heat capacity from $\partial\ln q/\partial\beta$ and finds that each mode contributes a characteristic, temperature-dependent share — a share that becomes the equipartition value when the mode is classical. The translational factor $V/\Lambda^{3}$ and its comparison with $N$ decide when the molecules may be treated as independent classical particles ([[statistical-thermodynamics/canonical-ensemble]]), and when quantum statistics must replace Boltzmann counting ([[statistical-thermodynamics/quantum-statistics]]). The ratio of partition functions of products and reactants becomes the equilibrium constant ([[statistical-thermodynamics/equilibrium-from-molecules]]) and, for a transition state, the rate constant ([[statistical-thermodynamics/statistical-rate-theory]]).

::: summary
- The molecular partition function $q = \sum_j g_je^{-\varepsilon_j/k_\mathrm{B}T}$ indicates the number of thermally accessible states; it tends to $g_0$ as $T\to0$ and grows with temperature.
- Energies are measured from the lowest state; shifting the zero multiplies $q$ by $e^{-\beta\varepsilon_0}$ and must be accounted for in equilibrium calculations.
- For independent modes $q = q^\mathrm{T}q^\mathrm{R}q^\mathrm{V}q^\mathrm{E}$, so $\ln q$ and all thermodynamic functions are sums of contributions.
- Translation: $q^\mathrm{T} = V/\Lambda^{3}$ with thermal wavelength $\Lambda = h/(2\pi mk_\mathrm{B}T)^{1/2}$ ($16\ \mathrm{pm}$ for Ar at $298\ \mathrm{K}$); $q^\mathrm{T}$ is of order $10^{30}$ per mole-volume.
- Rotation: $q^\mathrm{R} = T/\sigma\theta_\mathrm{R}$ for linear molecules at $T \gg \theta_\mathrm{R} = hcB/k_\mathrm{B}$; the symmetry number $\sigma$ reflects nuclear-spin statistics, which also produce ortho- and para-hydrogen.
- Vibration: $q^\mathrm{V} = 1/(1 - e^{-\theta_\mathrm{V}/T})$ from the zero-point level; most stretches are frozen at room temperature ($q^\mathrm{V} \approx 1$), heavy and floppy modes are not.
- Electronic: usually $q^\mathrm{E} = g_0$, but low-lying levels (NO, halogen atoms) must be summed.
:::

## Exercises

::: exercise Thermal wavelength of hydrogen {level=1 check="71.0"}
Calculate the thermal wavelength of an $\mathrm{H_2}$ molecule ($M = 2.016\ \mathrm{g\,mol^{-1}}$) at $300\ \mathrm{K}$. (Enter $\Lambda$ in pm.)
::: solution
$m = 2.016\times1.660\,54\times10^{-27} = 3.3477\times10^{-27}\ \mathrm{kg}$; $(2\pi mk_\mathrm{B}T)^{1/2} = (2\pi\times3.3477\times10^{-27}\times1.380\,65\times10^{-23}\times300)^{1/2} = 9.334\times10^{-24}\ \mathrm{kg\,m\,s^{-1}}$, so $\Lambda = 6.626\times10^{-34}/9.334\times10^{-24} = 7.10\times10^{-11}\ \mathrm{m} = 71.0\ \mathrm{pm}$. Lighter molecules have longer thermal wavelengths: $\Lambda \propto m^{-1/2}T^{-1/2}$.
:::
:::

::: exercise Rotational partition function of CO {level=1 check="107"}
Evaluate $q^\mathrm{R}$ for $^{12}\mathrm{C}^{16}\mathrm{O}$ ($B = 1.931\ \mathrm{cm^{-1}}$) at $298.15\ \mathrm{K}$ using the high-temperature formula. (Enter $q^\mathrm{R}$.)
::: solution
$q^\mathrm{R} = k_\mathrm{B}T/\sigma hcB = 207.22/(1\times1.931) = 107$. CO is heteronuclear ($\sigma = 1$), so it has about twice as many accessible rotational states as $\mathrm{N_2}$, whose $B$ is almost the same but whose $\sigma = 2$.
:::
:::

::: exercise Symmetry numbers {level=1 check="12"}
Give the rotational symmetry numbers of $\mathrm{CO_2}$, $\mathrm{NH_3}$, $\mathrm{CH_4}$ and $\mathrm{SF_6}$, and justify each from the point group. (Enter the symmetry number of $\mathrm{CH_4}$.)
::: solution
$\sigma$ is the number of proper rotations (including the identity) in the point group ([[quantum-chemistry/molecular-symmetry]]). $\mathrm{CO_2}$ ($D_{\infty h}$): $\sigma = 2$, as for any centrosymmetric linear molecule. $\mathrm{NH_3}$ ($C_{3v}$): $E$, $2C_3$, so $\sigma = 3$. $\mathrm{CH_4}$ ($T_d$): the rotational subgroup $T$ has $E$, $8C_3$, $3C_2$, so $\sigma = 12$. $\mathrm{SF_6}$ ($O_h$): the subgroup $O$ has $E$, $8C_3$, $6C_4$, $3C_2$, $6C_2'$, so $\sigma = 24$.
:::
:::

::: exercise Vibrational partition function of Cl₂ at 500 K {level=2 check="1.25"}
Calculate $q^\mathrm{V}$ for $\mathrm{Cl_2}$ ($\tilde\nu = 559.7\ \mathrm{cm^{-1}}$) at $500\ \mathrm{K}$, with energies measured from the zero-point level, and find the fraction of molecules in $v = 0$. (Enter $q^\mathrm{V}$.)
::: solution
$\theta_\mathrm{V} = 1.438\,78\times559.7 = 805.3\ \mathrm{K}$, so $e^{-\theta_\mathrm{V}/T} = e^{-1.6106} = 0.1998$ and $q^\mathrm{V} = 1/(1 - 0.1998) = 1.25$. The fraction in $v = 0$ is $1/q^\mathrm{V} = 0.800$: one chlorine molecule in five is vibrationally excited at $500\ \mathrm{K}$.
:::
:::

::: exercise Electronic partition function at higher temperature {level=2 check="3.41"}
Using the data of [[#ex-no]], calculate the electronic partition function of NO at $500\ \mathrm{K}$. (Enter $q^\mathrm{E}$.)
::: solution
$q^\mathrm{E} = 2 + 2e^{-174.2/500} = 2 + 2e^{-0.3485} = 2 + 2\times0.7057 = 3.41$. The upper fraction is $1.411/3.411 = 0.414$, approaching the high-temperature limit of $\tfrac{1}{2}$.
:::
:::

::: exercise Rotational partition function of methane {level=2 check="36.7"}
Methane is a spherical rotor with $A = B = C = 5.241\ \mathrm{cm^{-1}}$. Evaluate $q^\mathrm{R}$ at $298.15\ \mathrm{K}$. (Enter $q^\mathrm{R}$.)
::: solution
With [[#eq-qr-nl]] and $\sigma = 12$,
$$
q^\mathrm{R} = \frac{1}{12}\left(\frac{207.22}{5.241}\right)^{3/2}\pi^{1/2} = \frac{1}{12}\times(39.54)^{3/2}\times1.7725 = \frac{1}{12}\times248.6\times1.7725 = 36.7 .
$$
Without the symmetry number one would overcount the rotational states twelvefold, an error of $R\ln 12 = 20.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$ in the entropy.
:::
:::

::: exercise The high-temperature expansion of $q^\mathrm{R}$ {level=3 check="6.905"}
The Euler–Maclaurin formula states that $\sum_{n=0}^{\infty}f(n) = \int_0^\infty f(x)\,\mathrm{d}x + \tfrac{1}{2}f(0) - \tfrac{1}{12}f'(0) + \tfrac{1}{720}f'''(0) - \cdots$ for a smooth function that vanishes, with its derivatives, at infinity. Apply it to $f(J) = (2J+1)e^{-aJ(J+1)}$ with $a = \theta_\mathrm{R}/T$ to show that $q^\mathrm{R} = 1/a + \tfrac{1}{3} + a/15 + \cdots$. Then evaluate this expansion for HCl ($\theta_\mathrm{R} = 15.24\ \mathrm{K}$) at $100\ \mathrm{K}$. (Enter $q^\mathrm{R}$ to four significant figures.)
::: hint
Expand $f(J)$ in powers of $J$ for the derivatives at $J = 0$: $f(J) = (1 + 2J)(1 - aJ - aJ^{2} + \tfrac{1}{2}a^{2}J^{2} + \cdots)$.
:::
::: solution
The integral is $1/a$ (from [[#prop-qr]]). $f(0) = 1$. Expanding, $f(J) = 1 + (2 - a)J + (\tfrac{1}{2}a^{2} - 3a)J^{2} + (\ldots)J^{3}$, so $f'(0) = 2 - a$; the $J^{3}$ coefficient is $-2a + 2a^{2} - \tfrac{1}{6}a^{3}$ (from $2J\times(-aJ^{2} + \tfrac{1}{2}a^{2}J^{2})$ plus the $J^{3}$ terms $a^{2}J^{3} - \tfrac{1}{6}a^{3}J^{3}$ of the exponential), giving $f'''(0) = 6(-2a + O(a^{2}))$. Hence
$$
q^\mathrm{R} = \frac{1}{a} + \frac{1}{2} - \frac{2 - a}{12} + \frac{6(-2a)}{720} + O(a^{2}) = \frac{1}{a} + \frac{1}{3} + \frac{a}{12} - \frac{a}{60} = \frac{1}{a} + \frac{1}{3} + \frac{a}{15} + \cdots .
$$
For HCl at $100\ \mathrm{K}$, $a = 15.24/100 = 0.1524$: $q^\mathrm{R} = 6.5617 + 0.3333 + 0.0102 = 6.905$. Summing the series directly gives $6.9055$ — the three-term expansion is good to one part in $10^{4}$ even though only seven or eight levels are populated.
:::
:::

::: exercise Para-hydrogen at 50 K {level=3 check="0.77"}
Using $\theta_\mathrm{R} = 85.3\ \mathrm{K}$ and the nuclear-spin statistics of $\mathrm{H_2}$, compute the equilibrium fraction of para-hydrogen at $50\ \mathrm{K}$. Explain why the molar heat capacity of hydrogen measured on a sample cooled quickly from room temperature differs from that of equilibrium hydrogen. (Enter the para fraction.)
::: solution
With $\theta_\mathrm{R}/T = 1.706$: para sum $= 1 + 5e^{-6\times1.706} + 9e^{-20\times1.706} = 1 + 5\times3.58\times10^{-5} + \cdots = 1.000\,18$; ortho sum $= 3(3e^{-2\times1.706} + 7e^{-12\times1.706} + \cdots) = 3(3\times0.03296 + 9\times10^{-9}) = 0.2966$. The para fraction is $1.000\,18/(1.000\,18 + 0.2966) = 0.771$. A sample cooled quickly keeps its high-temperature $3 : 1$ ortho : para ratio, because ortho–para conversion is slow without a catalyst; it behaves as a non-equilibrium *mixture* of two gases, three-quarters ortho (odd $J$ only) and one-quarter para (even $J$ only), each with its own rotational heat capacity. Equilibrium hydrogen, by contrast, converts between the two as the temperature changes, adding a large conversion contribution. Dennison's 1927 explanation of the measured heat capacity required precisely this "frozen" mixture.
:::
:::
