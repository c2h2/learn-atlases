In 1970 a radio telescope on Kitt Peak, tuned to $115.271\ \mathrm{GHz}$, picked up a strong emission line from the Orion nebula. It was the $J = 1 \to 0$ transition of carbon monoxide, and within a few years CO had become the standard tracer of the cold molecular gas from which stars form. The identification needed no laboratory sample from Orion: the frequency had been measured on Earth to seven significant figures, and a molecule's rotational frequencies are so specific that a single line identifies it. The same precision makes rotational spectroscopy the most accurate method we have for the shapes of small molecules. From one line of CO you get a bond length to a thousandth of a picometre; from a handful of isotopologues of a polyatomic molecule you get every bond length and angle; from the shift of a line in an electric field you get the dipole moment.

This chapter builds on the rigid rotor solved in [[quantum-chemistry/vibration-rotation]], where the term values $F(J) = \tilde BJ(J+1)$, the selection rule $\Delta J = \pm1$ and the Boltzmann distribution over $J$ were derived for a diatomic molecule ([[quantum-chemistry/vibration-rotation#def-rotor]], [[quantum-chemistry/vibration-rotation#prop-rot-sel]]). We extend it in four directions: to polyatomic molecules, classified by their moments of inertia; to real molecules that stretch as they spin; to the intensities and Stark effect that give dipole moments; and to rotational Raman spectra, where symmetry and nuclear spin decide which lines exist at all. The general ideas — transition moments, populations, line widths — are those of [[spectroscopy/spectroscopy-principles]]. Atomic masses are from the 2020 Atomic Mass Evaluation; constants are CODATA 2018 values; molecular constants are from Huber and Herzberg's *Constants of Diatomic Molecules* and the Cologne Database for Molecular Spectroscopy (CDMS), as cited.

## Moments of inertia and the classification of rotors

A rigid molecule rotating about its centre of mass has kinetic energy $\tfrac12\boldsymbol\omega^\mathsf{T}\mathbf I\boldsymbol\omega$, where $\mathbf I$ is the inertia tensor. Every rigid body has three perpendicular **principal axes** in which $\mathbf I$ is diagonal; the rotational problem, and therefore the spectrum, is set by the three principal moments.

::: definition Principal moments of inertia and rotor types {#def-rotor-types}
For a molecule with atoms of mass $m_i$ at distance $r_{i,\perp}$ from an axis through the centre of mass, the moment of inertia about that axis is $I = \sum_i m_i r_{i,\perp}^2$. The **principal moments**, about the principal axes $a$, $b$, $c$, are labelled so that $I_a \le I_b \le I_c$, and the corresponding **rotational constants** are
$$
\tilde A = \frac{h}{8\pi^2 cI_a}, \qquad \tilde B = \frac{h}{8\pi^2 cI_b}, \qquad \tilde C = \frac{h}{8\pi^2 cI_c}
$$ {#eq-rotconst}
(in $\mathrm{cm^{-1}}$; without the factor $c$ they are frequencies, in MHz). Molecules are classified as
- **linear rotors**: $I_a = 0$, $I_b = I_c$ ($\mathrm{HCl}$, $\mathrm{CO_2}$, $\mathrm{HC{\equiv}CH}$, $\mathrm{OCS}$);
- **symmetric tops**: two equal moments. **Prolate** (cigar-shaped) if $I_a < I_b = I_c$ ($\mathrm{CH_3Cl}$, $\mathrm{CH_3C{\equiv}CH}$); **oblate** (disc-shaped) if $I_a = I_b < I_c$ ($\mathrm{BF_3}$, $\mathrm{C_6H_6}$, $\mathrm{NH_3}$);
- **spherical tops**: $I_a = I_b = I_c$ ($\mathrm{CH_4}$, $\mathrm{SF_6}$, $\mathrm{SiH_4}$);
- **asymmetric tops**: all three different ($\mathrm{H_2O}$, $\mathrm{CH_2O}$, most molecules).

Any molecule with a $C_n$ axis with $n \ge 3$ is at least a symmetric top; any molecule with more than one such axis (the cubic point groups $T_\mathrm d$, $O_\mathrm h$, $I_\mathrm h$) is a spherical top.
:::

The symmetry criterion saves calculation: $\mathrm{CH_3Cl}$ ($C_{3v}$) must be a symmetric top, and only the calculation tells you whether it is prolate or oblate. For ammonia, the three light hydrogen atoms lie far from the threefold axis while the heavy nitrogen sits on it, so the moment about the axis is the larger one and the molecule is oblate; for methyl chloride, the heavy chlorine on the axis contributes nothing to $I_a$ but a great deal to $I_b$, so the molecule is prolate.

::: example Moment of inertia of carbon dioxide {#ex-co2-inertia}
Carbon dioxide is linear and centrosymmetric with $r(\mathrm{C{=}O}) = 116.0\ \mathrm{pm}$. Find $I$ and $\tilde B$, and say what its pure rotational spectrum looks like.
::: solution
The carbon atom sits at the centre of mass and contributes nothing. Each oxygen is $116.0\ \mathrm{pm}$ from the axis:
$$
I = 2m_\mathrm{O}r^2 = 2(15.9949 \times 1.66054\times10^{-27}\ \mathrm{kg})(1.160\times10^{-10}\ \mathrm{m})^2 = 7.148\times10^{-46}\ \mathrm{kg\,m^2} ,
$$
and $\tilde B = h/8\pi^2 cI = 0.392\ \mathrm{cm^{-1}}$, close to the measured $\tilde B_0 = 0.3902\ \mathrm{cm^{-1}}$ obtained from the rotational structure of its infrared bands. But $\mathrm{CO_2}$ has **no pure rotational spectrum**: it has a centre of symmetry and therefore no permanent dipole moment, and the gross selection rule for microwave absorption is a non-zero permanent dipole. Its rotational constant is measured instead from vibration–rotation bands ([[spectroscopy/vibrational-spectroscopy]]) or from the rotational Raman effect, whose gross selection rule is different (later in this chapter).
:::
:::

## Linear molecules: line positions and centrifugal distortion

For a rigid linear rotor the levels are $F(J) = \tilde BJ(J+1)$, each $(2J+1)$-fold degenerate, and absorption with $\Delta J = +1$ gives lines at $\tilde\nu = 2\tilde B(J+1)$, a ladder of equally spaced lines $2\tilde B$ apart. Measured spectra show that the spacing very slowly *decreases* as $J$ rises. The reason is physical: a rotating molecule is pulled apart by centrifugal force, its bond lengthens, its moment of inertia grows, and its rotational energy falls below the rigid-rotor value.

::: proposition Centrifugal distortion of a diatomic rotor {#prop-cd}
For a diatomic molecule with harmonic force constant $k_\mathrm{f}$ and equilibrium bond length $r_\mathrm{e}$, the rotational term values to first order in the distortion are
$$
F(J) = \tilde BJ(J+1) - \tilde DJ^2(J+1)^2, \qquad \tilde D = \frac{4\tilde B^3}{\tilde\omega^2} ,
$$ {#eq-cd}
where $\tilde\omega = (1/2\pi c)\sqrt{k_\mathrm{f}/\mu}$ is the harmonic vibrational wavenumber (Kratzer's relation). The absorption lines $J+1 \leftarrow J$ lie at
$$
\tilde\nu(J+1\leftarrow J) = 2\tilde B(J+1) - 4\tilde D(J+1)^3 .
$$ {#eq-cd-lines}
:::

::: proof Balancing centrifugal force against the bond
Treat the molecule classically as a reduced mass $\mu$ at distance $r$ from the axis, rotating with angular momentum $L$, and attached by a spring. Its energy is $E = L^2/2\mu r^2 + \tfrac12 k_\mathrm{f}(r - r_\mathrm{e})^2$. At fixed $L$ the bond adjusts to minimise $E$: $\partial E/\partial r = -L^2/\mu r^3 + k_\mathrm{f}(r - r_\mathrm{e}) = 0$, i.e. the spring force balances the centrifugal force. For a small stretch $\delta = r - r_\mathrm{e}$ we may put $r = r_\mathrm{e}$ in the first term: $\delta = L^2/k_\mathrm{f}\mu r_\mathrm{e}^3$. Expanding $1/r^2 = (1/r_\mathrm{e}^2)(1 - 2\delta/r_\mathrm{e} + \cdots)$,
$$
E = \frac{L^2}{2\mu r_\mathrm{e}^2} - \frac{L^2\delta}{\mu r_\mathrm{e}^3} + \frac12 k_\mathrm{f}\delta^2 = \frac{L^2}{2\mu r_\mathrm{e}^2} - \frac{L^4}{2k_\mathrm{f}\mu^2r_\mathrm{e}^6} .
$$
Quantising $L^2 = \hbar^2J(J+1)$ ([[quantum-chemistry/vibration-rotation#prop-amom]]) and dividing by $hc$ gives $F(J) = \tilde BJ(J+1) - \tilde DJ^2(J+1)^2$ with $\tilde B = \hbar^2/2\mu r_\mathrm{e}^2hc$ and $\tilde D = \hbar^4/2k_\mathrm{f}\mu^2r_\mathrm{e}^6hc$. Substituting $k_\mathrm{f} = 4\pi^2c^2\tilde\omega^2\mu$ and comparing with $\tilde B^3 = \hbar^6/8\mu^3r_\mathrm{e}^6h^3c^3$ gives, after cancelling, $\tilde D = 4\tilde B^3/\tilde\omega^2$. The line positions follow from $F(J+1) - F(J)$: the rigid part gives $2\tilde B(J+1)$, and $(J+1)^2(J+2)^2 - J^2(J+1)^2 = (J+1)^2\left[(J+2)^2 - J^2\right] = 4(J+1)^3$.
:::

$\tilde D$ is tiny — about $10^{-6}$ of $\tilde B$ for a typical diatomic — but microwave frequencies are measured so precisely that it is always needed, and Kratzer's relation turns it into an estimate of the vibrational frequency from a purely rotational spectrum. Polyatomic molecules need several distortion constants, and real molecules are not rigid in another way too: they vibrate, so the measured $\tilde B_v$ in vibrational level $v$ is an average of $1/r^2$ that changes slightly with $v$, $\tilde B_v = \tilde B_\mathrm{e} - \alpha_\mathrm{e}(v + \tfrac12)$.

::: example The microwave spectrum of carbon monoxide {#ex-co-lines}
For $^{12}\mathrm{C}^{16}\mathrm{O}$ in its ground vibrational state, $B_0 = 57\,635.968\ \mathrm{MHz}$ and $D_0 = 0.1835\ \mathrm{MHz}$ (CDMS). (a) Predict the first three absorption lines. (b) Find the ground-state bond length $r_0$. (c) Test Kratzer's relation with $\tilde B_\mathrm{e} = 1.931\,28\ \mathrm{cm^{-1}}$ and $\tilde\omega_\mathrm{e} = 2169.81\ \mathrm{cm^{-1}}$ (Huber and Herzberg).
::: solution
(a) By [[#eq-cd-lines]] (in frequency units), $\nu = 2B_0(J+1) - 4D_0(J+1)^3$:
$$
\nu(1\leftarrow0) = 115\,271.936 - 0.734 = 115\,271.20\ \mathrm{MHz},\quad
\nu(2\leftarrow1) = 230\,543.87 - 5.87 = 230\,538.00\ \mathrm{MHz},\quad
\nu(3\leftarrow2) = 345\,815.81 - 19.82 = 345\,795.99\ \mathrm{MHz} .
$$
These agree with the measured lines to better than $0.01\ \mathrm{MHz}$; without the distortion term the third line would be off by $20\ \mathrm{MHz}$, two thousand times the measurement error.

(b) $\mu = (12.000 \times 15.9949)/27.9949\ \mathrm{u} = 6.85621\ \mathrm{u} = 1.13851\times10^{-26}\ \mathrm{kg}$. From $I = h/8\pi^2B_0$ with $B_0$ in Hz, $I = 1.456\,04\times10^{-46}\ \mathrm{kg\,m^2}$, and $r_0 = \sqrt{I/\mu} = 113.09\ \mathrm{pm}$. This is the ground-state average bond length (strictly, $\langle r^{-2}\rangle^{-1/2}$); the equilibrium value $r_\mathrm{e} = 112.83\ \mathrm{pm}$ from $\tilde B_\mathrm{e}$ is shorter because the anharmonic vibration in $v = 0$ samples longer distances more ([[quantum-chemistry/vibration-rotation#ex-co-bond]]).

(c) $4\tilde B_\mathrm{e}^3/\tilde\omega_\mathrm{e}^2 = 4(1.931\,28)^3/(2169.81)^2 = 6.120\times10^{-6}\ \mathrm{cm^{-1}}$, which is $6.120\times10^{-6} \times 29\,979.2\ \mathrm{MHz} = 0.1835\ \mathrm{MHz}$ — the measured $D_0$ to four figures. A diatomic molecule is, to this accuracy, a rotor on a harmonic spring.
:::
:::

### Isotopic substitution

The Born–Oppenheimer approximation makes the potential energy curve, and hence $r_\mathrm{e}$, the same for all isotopologues; only the masses change. To a good approximation, then, $\tilde B \propto 1/\mu$, and a measured line of one isotopologue predicts the lines of all others. This is how $^{13}\mathrm{CO}$, $\mathrm{C^{18}O}$ and other isotopologues are identified in interstellar spectra, and, conversely, it is what makes isotopic substitution the key to the structures of polyatomic molecules: each substitution changes the moments of inertia in a way that depends on *where* the substituted atom sits.

For a linear polyatomic molecule with $N$ atoms there are $N - 1$ bond lengths but only one moment of inertia per isotopologue, so $N - 1$ isotopologues are needed. Two routes are in use. The **$r_0$ structure** fits the bond lengths to the ground-state moments of all isotopologues as if the molecule were rigid. The **substitution ($r_\mathrm{s}$) structure** uses Kraitchman's equations, which locate each substituted atom directly from the *change* in moments of inertia; for a linear molecule the coordinate of an atom along the axis, measured from the centre of mass of the parent, is
$$
\lvert z\rvert = \sqrt{\frac{\Delta I}{\mu_\mathrm{s}}}, \qquad \mu_\mathrm{s} = \frac{M\,\Delta m}{M + \Delta m},
$$ {#eq-kraitchman}
where $M$ is the mass of the parent molecule and $\Delta m$ the change of mass. Because vibrational averaging affects the parent and the substituted molecule similarly, the errors partly cancel, and $r_\mathrm{s}$ structures are usually closer to $r_\mathrm{e}$ than $r_0$ structures.

::: example The structure of carbonyl sulfide {#ex-ocs}
The ground-state rotational constants of $^{16}\mathrm{O}^{12}\mathrm{C}^{32}\mathrm{S}$ and $^{16}\mathrm{O}^{12}\mathrm{C}^{34}\mathrm{S}$ are $B_0 = 6081.49$ and $5932.83\ \mathrm{MHz}$ (CDMS). Find (a) the two moments of inertia, (b) the distance of the sulfur atom from the centre of mass by Kraitchman's equation, and (c) the $r_0$ bond lengths.
::: solution
(a) It is convenient to work in $\mathrm{u\,pm^2}$: $I = h/8\pi^2B = 5.0538\times10^{9}\ \mathrm{u\,pm^2\,MHz}/B$. Hence $I(^{32}\mathrm{S}) = 831\,012$ and $I(^{34}\mathrm{S}) = 851\,835\ \mathrm{u\,pm^2}$; heavier sulfur, larger moment.

(b) $M = 15.9949 + 12.0000 + 31.9721 = 59.9670\ \mathrm{u}$, $\Delta m = 1.9958\ \mathrm{u}$, so $\mu_\mathrm{s} = 59.9670 \times 1.9958/61.9628 = 1.9315\ \mathrm{u}$. With $\Delta I = 20\,823\ \mathrm{u\,pm^2}$, [[#eq-kraitchman]] gives $\lvert z_\mathrm{S}\rvert = \sqrt{20\,823/1.9315}\ \mathrm{pm} = 103.8\ \mathrm{pm}$: the sulfur atom lies $103.8\ \mathrm{pm}$ from the centre of mass of the parent molecule.

(c) Place O at $z = 0$, C at $z = r_1 = r(\mathrm{CO})$, S at $z = r_1 + r_2$. For each isotopologue, $I = \sum m_iz_i^2 - (\sum m_iz_i)^2/M$. Two equations, two unknowns; solving them numerically (Newton's method converges in a few steps from $r_1 = 116$, $r_2 = 156\ \mathrm{pm}$) gives
$$
r_0(\mathrm{C{=}O}) = 116.3\ \mathrm{pm}, \qquad r_0(\mathrm{C{=}S}) = 156.0\ \mathrm{pm} .
$$
The equilibrium structure from many isotopologues and vibration–rotation constants is $r_\mathrm{e}(\mathrm{CO}) \approx 115.4$ and $r_\mathrm{e}(\mathrm{CS}) \approx 156.0\ \mathrm{pm}$. The C=O value is the more sensitive to vibrational averaging, because carbon lies near the centre of mass where small errors in $I$ translate into large errors in position — a general weakness of structures for atoms near the centre of mass, and the reason careful work quotes the type of structure ($r_\mathrm{e}$, $r_0$, $r_\mathrm{s}$) along with the numbers.
:::
:::

## Intensities: which lines are strongest

The selection rule for a linear rotor is $\Delta J = \pm1$, with the gross requirement of a permanent dipole $\mu_0$. To predict the whole spectrum we also need the strength of each line. Combining the transition moment with the populations of [[spectroscopy/spectroscopy-principles#prop-net]] gives the answer.

::: proposition Intensities of rotational absorption lines {#prop-rot-int}
For a linear molecule with dipole moment $\mu_0$, the integrated absorption coefficient of the line $J+1 \leftarrow J$ in a gas at temperature $T$ is proportional to
$$
S_J \propto \tilde\nu_J\,\mu_0^2\,(J+1)\,\mathrm{e}^{-hc\tilde BJ(J+1)/k_\mathrm{B}T}\left(1 - \mathrm{e}^{-hc\tilde\nu_J/k_\mathrm{B}T}\right), \qquad \tilde\nu_J = 2\tilde B(J+1) .
$$ {#eq-rot-int}
When $hc\tilde\nu_J \ll k_\mathrm{B}T$ this is approximately proportional to $(J+1)^3\mathrm{e}^{-hc\tilde BJ(J+1)/k_\mathrm{B}T}$, and the strongest line has lower level
$$
J_\mathrm{peak} \approx \sqrt{\frac{3k_\mathrm{B}T}{2hc\tilde B}} - 1 ,
$$ {#eq-jpeak}
higher than the most populated level, $J_\mathrm{pop} \approx \sqrt{k_\mathrm{B}T/2hc\tilde B} - \tfrac12$.
:::

::: proof
The integrated absorption of a transition is proportional to $\tilde\nu_\mathrm{fi}\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$ ([[spectroscopy/spectroscopy-principles#eq-osc-mu]]) times the population difference per state ([[spectroscopy/spectroscopy-principles#prop-net]]). For a rotor, the squared transition moment from one $M$ sublevel of $J$, summed over the sublevels of $J+1$, is the same for every $M$ and equals $\mu_0^2(J+1)/(2J+1)$ (the standard result of angular-momentum algebra; it reduces to $\mu_0^2$ for $J = 0$, where the three components of the dipole connect $J = 0$ to the three sublevels of $J = 1$, each with $\mu_0^2/3$). The population of all $2J+1$ sublevels together is $N(2J+1)\mathrm{e}^{-hc\tilde BJ(J+1)/k_\mathrm{B}T}/q$. Multiplying, the factors $2J+1$ cancel and [[#eq-rot-int]] follows, with $1 - \mathrm{e}^{-x}$ accounting for stimulated emission. For small $x$, $1 - \mathrm{e}^{-x} \approx x \propto (J+1)$, and since $\tilde\nu_J \propto J+1$ too, $S_J \propto (J+1)^3\mathrm{e}^{-\beta(J+1)^2}$ approximately, with $\beta = hc\tilde B/k_\mathrm{B}T$ (replacing $J(J+1)$ by $(J+1)^2$, which shifts only the constant factor). Setting the derivative with respect to $J+1$ to zero: $3/(J+1) = 2\beta(J+1)$, so $(J+1)^2 = 3/2\beta$, which is [[#eq-jpeak]]. The population maximum, from $\mathrm{d}[(2J+1)\mathrm{e}^{-\beta J(J+1)}]/\mathrm{d}J = 0$, is $J = \sqrt{1/2\beta} - \tfrac12$ ([[quantum-chemistry/vibration-rotation#ex-jstar]]).
:::

::: widget plot
f: (300/t)^2*sum(3.84506*(j+1)^2*exp(-2.76607*j*(j+1)/t)*(1 - exp(-5.53214*(j+1)/t))/(1 + (x - 3.84506*(j+1))^2/g^2), j, 0, 60)
x: 0, 160
sliders: t=300:10:1000:10; g=0.6:0.2:4:0.1
labels: \text{absorption (relative)}
caption: The pure rotational absorption spectrum of $^{12}\mathrm{C}^{16}\mathrm{O}$ ($\tilde B_0 = 1.9225\ \mathrm{cm^{-1}}$) from [[#eq-rot-int]], against wavenumber in $\mathrm{cm^{-1}}$. The slider `t` is the temperature in kelvin and `g` the half-width of each line in $\mathrm{cm^{-1}}$ (greatly exaggerated so that the lines are visible; the real Doppler width is about $10^{-5}\ \mathrm{cm^{-1}}$). The lines are equally spaced by $2\tilde B$; at $300\ \mathrm{K}$ the strongest is $J = 13 \leftarrow 12$ near $50\ \mathrm{cm^{-1}}$, although the most populated level is $J = 7$. Lower the temperature to $10\ \mathrm{K}$, typical of an interstellar cloud, and only the first few lines survive — which is why radio astronomers observe CO at $115$ and $230\ \mathrm{GHz}$.
:::

::: warning The strongest line is not the most populated level
A common mistake is to identify the peak of a rotational spectrum with the most populated $J$, using the formula $J_\mathrm{pop} = \sqrt{k_\mathrm{B}T/2hc\tilde B} - \tfrac12$. That formula gives the peak of the *population*, not of the *absorption*. In absorption two further factors grow with $J$: the photon frequency ($S \propto \tilde\nu$) and the population difference between the two levels, which for $hc\tilde\nu \ll k_\mathrm{B}T$ is proportional to $\tilde\nu$ as well. Together they push the strongest line to $J_\mathrm{peak} \approx \sqrt{3}\,J_\mathrm{pop}$. In vibration–rotation bands, by contrast, the photon frequency is nearly constant across the band and $1 - \mathrm{e}^{-x} = 1$, so the strongest line *does* come from about $J_\mathrm{pop}$ — the case treated in [[quantum-chemistry/vibration-rotation]]. Check which kind of spectrum you have before applying either formula.
:::

## Symmetric, spherical and asymmetric tops

### Symmetric tops

A symmetric top needs two quantum numbers: $J$, for the total angular momentum, and $K$ ($K = 0, \pm1, \ldots, \pm J$), for its component along the unique (figure) axis. The kinetic energy $J_a^2/2I_a + (J_b^2 + J_c^2)/2I_b$ for a prolate top can be written $\mathbf J^2/2I_b + J_a^2(1/2I_a - 1/2I_b)$, both terms with sharp quantum values.

::: proposition Term values and spectrum of a symmetric top {#prop-symtop}
A rigid prolate symmetric top has term values
$$
F(J, K) = \tilde BJ(J+1) + (\tilde A - \tilde B)K^2 ,
$$ {#eq-symtop}
and an oblate top the same with $\tilde C$ in place of $\tilde A$. Levels with $K \neq 0$ are doubly degenerate in $\pm K$ (besides the $(2J+1)$-fold degeneracy in $M$). Because the permanent dipole lies along the figure axis, the selection rules are $\Delta J = \pm1$ and $\Delta K = 0$, and the rigid-rotor lines fall at $\tilde\nu = 2\tilde B(J+1)$, independent of $K$ and of $\tilde A$. Centrifugal distortion, with term $-\tilde D_JJ^2(J+1)^2 - \tilde D_{JK}J(J+1)K^2 - \tilde D_KK^4$, splits each line into $J+1$ components:
$$
\tilde\nu(J+1, K \leftarrow J, K) = 2\tilde B(J+1) - 4\tilde D_J(J+1)^3 - 2\tilde D_{JK}(J+1)K^2 .
$$ {#eq-symtop-lines}
:::

::: proof
With $\hat{\mathbf J}^2$ eigenvalue $\hbar^2J(J+1)$ and $\hat J_a$ eigenvalue $K\hbar$, the energy $\hbar^2J(J+1)/2I_b + K^2\hbar^2(1/2I_a - 1/2I_b)$ divided by $hc$ gives [[#eq-symtop]] by the definitions [[#eq-rotconst]]; the energy depends on $K^2$, hence the $\pm K$ degeneracy. The dipole lies along the figure axis, so its component along that axis is unchanged by rotation about it; it cannot change the angular momentum about the axis, and $\Delta K = 0$. The rest of the transition moment behaves as for a linear rotor, giving $\Delta J = \pm1$. Then $\tilde\nu = F(J+1, K) - F(J, K) = 2\tilde B(J+1)$, the $K^2$ terms cancelling. For the distortion terms, $J^2(J+1)^2$ gives $4(J+1)^3$ as in [[#prop-cd]]; $\left[(J+1)(J+2) - J(J+1)\right]K^2 = 2(J+1)K^2$; and $K^4$ cancels. Since $\lvert K\rvert \le J$ in the lower level, $K$ takes $J+1$ distinct values of $K^2$, giving $J+1$ components.
:::

The rotational constant $\tilde A$ about the figure axis therefore cannot be measured from a pure rotational spectrum, since rotation about the axis of a dipole does not move it; it is found from perpendicular vibration–rotation bands or from Raman spectra. Methyl halides, ammonia and phosphine are the classic examples; ammonia adds the extra complication of inversion doubling, the tunnelling of nitrogen through the plane of the hydrogens, which produces the $24\ \mathrm{GHz}$ inversion lines of the ammonia maser.

### Spherical and asymmetric tops

A spherical top has $F(J) = \tilde BJ(J+1)$ with a degeneracy $(2J+1)^2$, but by symmetry it has no permanent dipole moment and therefore no pure rotational spectrum. (Centrifugal distortion of methane gives it a minute induced dipole, and a correspondingly weak spectrum observable with long path lengths — a curiosity that shows "forbidden" means "very weak".) Asymmetric tops have no closed formula for their levels: each $J$ gives $2J+1$ levels labelled $J_{K_aK_c}$ by the limiting prolate and oblate values of $K$, found by diagonalising a small matrix for each $J$. Their spectra look irregular, but they are fully predictable from $\tilde A$, $\tilde B$, $\tilde C$ and distortion constants, and modern microwave spectroscopy — using pulsed jets and chirped-pulse Fourier-transform instruments — routinely determines complete structures of molecules with twenty or more atoms, and distinguishes conformers and even enantiomers in the gas phase.

::: quiz Which molecules have a pure rotational spectrum?
Which of these molecules show a pure rotational (microwave) absorption spectrum? (Select all that apply.)
- [x] $\mathrm{H_2O}$
- [ ] $\mathrm{CH_4}$ (apart from an extremely weak distortion-induced spectrum)
- [x] $\mathrm{CH_3Cl}$
- [ ] $\mathrm{N_2}$
- [ ] $\mathrm{SF_6}$
- [x] $\mathrm{OCS}$
::: solution
The gross selection rule is a non-zero permanent electric dipole moment. Water (asymmetric top, $C_{2v}$), methyl chloride (prolate symmetric top, $C_{3v}$) and carbonyl sulfide (linear, $C_{\infty v}$) are polar. Methane and sulfur hexafluoride are spherical tops with no dipole, and $\mathrm{N_2}$ is homonuclear. All six, however, have rotational Raman spectra except the spherical tops, whose polarisability is isotropic.
:::
:::

## The Stark effect and dipole moments

An electric field $\boldsymbol{\mathcal E}$ interacts with a molecular dipole through $\hat H' = -\boldsymbol\mu\cdot\boldsymbol{\mathcal E} = -\mu_0\mathcal E\cos\theta$, where $\theta$ is the angle between the molecular axis and the field. The field breaks the spherical symmetry of free space and lifts part of the $M$ degeneracy. For a linear molecule, which has no first-order Stark effect (the expectation value of $\cos\theta$ in a rotor state is zero), the shifts are second order in $\mathcal E$, and their size depends on $\mu_0^2$ — the most accurate route to dipole moments of gas-phase molecules.

::: proposition Second-order Stark effect of a linear rotor {#prop-stark}
In a field $\mathcal E$ small enough that $\mu_0\mathcal E \ll hB$ (with $B$ the rotational constant in frequency units), the levels of a linear molecule shift by
$$
\Delta E(J, M) = \frac{\mu_0^2\mathcal E^2}{2hB}\,\frac{J(J+1) - 3M^2}{J(J+1)(2J-1)(2J+3)} \quad (J \ge 1), \qquad \Delta E(0, 0) = -\frac{\mu_0^2\mathcal E^2}{6hB} .
$$ {#eq-stark}
Levels with the same $\lvert M\rvert$ remain degenerate. In particular $\Delta E(1, 0) = +\mu_0^2\mathcal E^2/10hB$ and $\Delta E(1, \pm1) = -\mu_0^2\mathcal E^2/20hB$, so the $J = 1 \leftarrow 0$ line splits into a component ($M = 0 \leftarrow 0$, observed with the radiation polarised along the field) shifted by $+\tfrac{4}{15}\mu_0^2\mathcal E^2/h^2B$ in frequency and one ($M = \pm1 \leftarrow 0$, perpendicular polarisation) shifted by $+\tfrac{7}{60}\mu_0^2\mathcal E^2/h^2B$.
:::

::: proof The ground level
We prove the $J = 0$ result, which shows the structure of the general one. In second-order perturbation theory ([[quantum-chemistry/approximation-methods]]), $\Delta E_0 = \sum_{n\neq0}\lvert\langle n\vert\hat H'\vert 0\rangle\rvert^2/(E_0 - E_n)$. The operator $\cos\theta$ is proportional to the spherical harmonic $Y_{1,0}$, so it connects $Y_{0,0}$ only to $Y_{1,0}$: $\langle 1,0\vert\cos\theta\vert 0,0\rangle = 1/\sqrt3$. The energy gap is $E_0 - E_1 = -2hB$. Hence
$$
\Delta E(0,0) = \frac{(\mu_0\mathcal E)^2/3}{-2hB} = -\frac{\mu_0^2\mathcal E^2}{6hB} .
$$
For $J \ge 1$ the level is pushed down by $J+1$ and up by $J-1$, with matrix elements $\langle J\pm1, M\vert\cos\theta\vert J, M\rangle$ from angular-momentum algebra; collecting the two terms gives the general formula of [[#eq-stark]]. Setting $J = 1$: $M = 0$ gives $(2)/(2\cdot1\cdot5) = \tfrac15$, so $+\mu_0^2\mathcal E^2/10hB$; $M = \pm1$ gives $(2 - 3)/10 = -\tfrac1{10}$, so $-\mu_0^2\mathcal E^2/20hB$. The line shifts are the differences of the upper and lower shifts divided by $h$: $(\tfrac1{10} + \tfrac16) = \tfrac4{15}$ and $(-\tfrac1{20} + \tfrac16) = \tfrac7{60}$, in units of $\mu_0^2\mathcal E^2/h^2B$.
:::

::: example The dipole moment of carbonyl sulfide {#ex-stark}
For OCS, $B_0 = 6081.49\ \mathrm{MHz}$ and the $J = 1 \leftarrow 0$ line is at $12\,162.98\ \mathrm{MHz}$. In a Stark cell with a uniform field of $2.00\ \mathrm{kV\,cm^{-1}}$ the $M = 0 \leftarrow 0$ component moves up by $22.74\ \mathrm{MHz}$. Find the dipole moment.
::: solution
From [[#prop-stark]], $\Delta\nu = \tfrac{4}{15}\mu_0^2\mathcal E^2/h^2B$, so
$$
\mu_0 = \frac{h}{\mathcal E}\sqrt{\frac{15\,B\,\Delta\nu}{4}} = \frac{6.6261\times10^{-34}\ \mathrm{J\,s}}{2.00\times10^{5}\ \mathrm{V\,m^{-1}}}\sqrt{\frac{15 (6.08149\times10^{9}\ \mathrm{s^{-1}})(2.274\times10^{7}\ \mathrm{s^{-1}})}{4}} = 2.386\times10^{-30}\ \mathrm{C\,m} .
$$
Dividing by $1\ \mathrm{D} = 3.33564\times10^{-30}\ \mathrm{C\,m}$ gives $\mu_0 = 0.715\ \mathrm{D}$, in agreement with the accepted value of $0.7152\ \mathrm{D}$. Check the perturbation condition: $\mu_0\mathcal E/h = 2.386\times10^{-30} \times 2.00\times10^{5}/6.626\times10^{-34} = 720\ \mathrm{MHz}$, an order of magnitude below $2B = 12\,163\ \mathrm{MHz}$, so second-order theory is adequate. Because OCS has a precisely known dipole and a simple spectrum, its Stark lines are used to calibrate the field in Stark cells.
:::
:::

::: widget plot
f: -21.315*(m/0.71519)^2*x^2/6; 21.315*(m/0.71519)^2*x^2/10; -21.315*(m/0.71519)^2*x^2/20
x: 0, 5
sliders: m=0.71519:0.1:2:0.01
labels: J=0,\ M=0; J=1,\ M=0; J=1,\ M=\pm1
caption: Second-order Stark shifts (in MHz, measured from each level's zero-field energy) of the $J = 0$ and $J = 1$ levels of a linear molecule with $B = 6081.49\ \mathrm{MHz}$, against field strength in $\mathrm{kV\,cm^{-1}}$, from [[#eq-stark]]. The slider `m` is the dipole moment in debye (starting at the OCS value, $0.715\ \mathrm{D}$). The $J = 0$ level is always pushed down (it can only interact with the level above); the $J = 1$, $M = 0$ level is pushed up and $M = \pm1$ down, so the $J = 1 \leftarrow 0$ line splits into two components whose separation grows as $\mu_0^2\mathcal E^2$. Double the dipole and every shift quadruples. At high fields (beyond the range shown for larger dipoles) the parabolas fail, because $\mu_0\mathcal E$ is no longer small compared with $hB$.
:::

## Rotational Raman spectra and nuclear spin statistics

Molecules without a dipole are not lost to rotational spectroscopy. In Raman scattering ([[spectroscopy/vibrational-spectroscopy#def-raman]]) the incident light induces a dipole $\boldsymbol\mu_\mathrm{ind} = \boldsymbol\alpha\boldsymbol{\mathcal E}$, and if the polarisability $\boldsymbol\alpha$ depends on the orientation of the molecule, rotation modulates the scattered light.

::: proposition Rotational Raman selection rules and line positions {#prop-rot-raman}
A molecule has a rotational Raman spectrum if its polarisability is **anisotropic** (all molecules except spherical tops). For a linear molecule the specific selection rule is $\Delta J = 0, \pm2$. The Stokes lines ($\Delta J = +2$, the **S branch**) and anti-Stokes lines ($\Delta J = -2$) lie at
$$
\tilde\nu = \tilde\nu_0 \mp \left[F(J+2) - F(J)\right] = \tilde\nu_0 \mp \tilde B(4J + 6), \qquad J = 0, 1, 2, \ldots ,
$$ {#eq-raman-lines}
so the first line is displaced by $6\tilde B$ from the exciting line and successive lines are $4\tilde B$ apart; $\Delta J = 0$ contributes to the unshifted Rayleigh line.
:::

::: proof Classical picture, then the quantum rule
Let a linear molecule have polarisability $\alpha_\parallel$ along its axis and $\alpha_\perp$ perpendicular to it, and let it rotate with angular frequency $\omega_\mathrm{rot}$ in a plane containing the field direction, the axis making angle $\theta = \omega_\mathrm{rot}t$ with the field. The polarisability along the field is $\alpha(t) = \alpha_\perp + \Delta\alpha\cos^2\theta = \alpha_\perp + \tfrac12\Delta\alpha + \tfrac12\Delta\alpha\cos 2\omega_\mathrm{rot}t$, with $\Delta\alpha = \alpha_\parallel - \alpha_\perp$. Multiplying by the field $\mathcal E_0\cos\omega_0t$ produces induced dipoles oscillating at $\omega_0$ and $\omega_0 \pm 2\omega_\mathrm{rot}$ — twice the rotation frequency, because the polarisability ellipsoid returns to the same orientation after half a turn. The scattering vanishes if $\Delta\alpha = 0$, which is the gross selection rule. Quantum mechanically, the anisotropic part of $\boldsymbol\alpha$ transforms like $\cos^2\theta - \tfrac13$, which is proportional to $Y_{2,0}$; matrix elements $\langle J'\vert Y_{2,0}\vert J\rangle$ vanish unless $\lvert J' - J\rvert \le 2$ and $J' - J$ is even (parity), giving $\Delta J = 0, \pm2$. Finally $F(J+2) - F(J) = \tilde B\left[(J+2)(J+3) - J(J+1)\right] = \tilde B(4J + 6)$.
:::

For a homonuclear diatomic molecule something remarkable shows up in the spectrum: alternate lines have different intensities, and for some molecules every other line is missing. The cause is the Pauli principle applied to the nuclei.

::: proposition Nuclear spin statistics of homonuclear diatomics {#prop-spin-stat}
For a homonuclear diatomic molecule in a $^1\Sigma_\mathrm{g}^+$ electronic state, whose nuclei have spin $I$, the levels of even and odd $J$ have nuclear-spin statistical weights in the ratio
$$
\frac{g(\text{odd } J)}{g(\text{even } J)} = \frac{I+1}{I}\ \ \text{for half-integer } I\ (\text{fermions}), \qquad \frac{g(\text{even } J)}{g(\text{odd } J)} = \frac{I+1}{I}\ \ \text{for integer } I\ (\text{bosons}) .
$$ {#eq-spin-stat}
For $I = 0$ the levels of one parity are absent altogether. Thus $\mathrm{H_2}$ ($I = \tfrac12$) has odd : even $= 3 : 1$, $^{14}\mathrm{N_2}$ ($I = 1$) has even : odd $= 2 : 1$, and $^{12}\mathrm{C}^{16}\mathrm{O_2}$ (whose exchangeable oxygen nuclei have $I = 0$) has only even-$J$ levels.
:::

::: proof Counting symmetric and antisymmetric spin states
Exchanging the two identical nuclei must multiply the total wavefunction by $+1$ for bosons and $-1$ for fermions. For a $^1\Sigma_\mathrm{g}^+$ state the electronic and vibrational parts are unchanged by the exchange, and the rotational part $Y_{J,M}$ is multiplied by $(-1)^J$ (exchange is equivalent to inverting the internuclear vector). Two spins $I$ give $(2I+1)^2$ product states, of which $(2I+1)(I+1)$ are symmetric under exchange and $(2I+1)I$ antisymmetric (for $I = \tfrac12$: three triplet and one singlet). For fermions the total must be antisymmetric, so odd-$J$ (antisymmetric rotation) pairs with the symmetric spin functions and even-$J$ with the antisymmetric ones: $g(\text{odd})/g(\text{even}) = (I+1)/I$. For bosons the total must be symmetric, so even-$J$ pairs with the symmetric spin functions: $g(\text{even})/g(\text{odd}) = (I+1)/I$. If $I = 0$ there is only one spin function, symmetric, and only even $J$ exist for bosons. The ground state of $\mathrm{O_2}$ is $^3\Sigma_\mathrm{g}^-$, whose electronic function changes sign on exchange, so in $^{16}\mathrm{O_2}$ it is the *odd* rotational levels that survive.
:::

The two kinds of $\mathrm{H_2}$ — **ortho** (nuclear spins parallel, odd $J$) and **para** (antiparallel, even $J$) — interconvert extremely slowly without a catalyst, because the nuclear spins barely couple to anything. They behave as different substances, with different heat capacities and thermal conductivities, and para-hydrogen, made by equilibrating hydrogen over a catalyst at low temperature, is used today to enhance NMR signals by orders of magnitude.

::: example The rotational Raman spectrum of nitrogen {#ex-n2-raman}
For $^{14}\mathrm{N_2}$, $\tilde B_0 = 1.989\,58\ \mathrm{cm^{-1}}$ (Huber and Herzberg). Predict the positions of the first four Stokes lines relative to the exciting line, their intensity pattern at room temperature, and the absolute wavenumber of S(0) for a $532.0\ \mathrm{nm}$ laser.
::: solution
By [[#eq-raman-lines]], the Stokes shifts are $\tilde B(4J + 6)$: S(0) $11.94$, S(1) $19.90$, S(2) $27.85$, S(3) $35.81\ \mathrm{cm^{-1}}$, with spacing $4\tilde B = 7.96\ \mathrm{cm^{-1}}$. Nitrogen-14 has $I = 1$, a boson, so by [[#eq-spin-stat]] even-$J$ levels have weight $6$ and odd-$J$ levels $3$: S(0), S(2), … are about twice as strong as their neighbours S(1), S(3), …, superimposed on the smooth Boltzmann envelope. The laser wavenumber is $10^7/532.0 = 18\,797\ \mathrm{cm^{-1}}$, so S(0) appears at $18\,797 - 12 = 18\,785\ \mathrm{cm^{-1}}$ (at $532.3\ \mathrm{nm}$): rotational Raman lines crowd close to the laser line and need a very good filter to see. The $2 : 1$ alternation, observed by Rasetti in 1929, showed that the $^{14}\mathrm N$ nucleus is a boson — impossible if it were made of fourteen protons and seven electrons, as then believed, and one of the clues that led to the neutron.
:::
:::

::: widget plot
f: (300/t)*sum((1.5 + 0.5*cos(pi*j))*(j+1)*(j+2)/(2*j+3)*exp(-2.86257*j*(j+1)/t)/(1 + (x - 1.98958*(4*j+6))^2/0.09), j, 0, 40)
x: 0, 160
sliders: t=300:20:1000:10
labels: \text{Stokes intensity (relative)}
caption: The Stokes side of the rotational Raman spectrum of $^{14}\mathrm{N_2}$, against Raman shift in $\mathrm{cm^{-1}}$, with the temperature (K) on the slider `t`. Each line S$(J)$ is weighted by its nuclear-spin statistical weight ($6$ for even $J$, $3$ for odd $J$, here $2 : 1$), its Boltzmann factor and the Placzek–Teller factor $(J+1)(J+2)/(2J+3)$ for a $\Delta J = +2$ transition. Note the first line at $6\tilde B$, the spacing of $4\tilde B$ and the alternation of intensities; at low temperature only the first few lines remain and the alternation is obvious.
:::

## Where this leads

Rotational constants measured here are the starting point for the rotational structure of vibrational bands ([[spectroscopy/vibrational-spectroscopy]]) and of electronic bands ([[spectroscopy/electronic-spectroscopy]]), where the change of $\tilde B$ between states shows how the geometry changes on excitation. The rotational partition function $q \approx k_\mathrm{B}T/\sigma hc\tilde B$, with its symmetry number $\sigma$ that is the classical shadow of nuclear spin statistics, feeds the entropies and equilibrium constants of [[statistical-thermodynamics]]. Accurate gas-phase structures from microwave spectroscopy are the benchmarks against which computed geometries are judged in [[computational-chemistry]], and the same frequencies, catalogued in databases such as CDMS and the JPL catalogue, are the means by which more than three hundred molecules have been identified in interstellar space. Magnetic resonance, the subject of [[spectroscopy/nmr-principles]] and [[spectroscopy/epr]], is another kind of rotational spectroscopy — of angular momenta oriented in a magnetic field rather than molecules tumbling in space.

::: history
Rotational transitions of molecules were first seen indirectly, in the fine structure of infrared bands, in the 1910s and 1920s. In 1929 Franco Rasetti photographed the rotational Raman spectra of $\mathrm{N_2}$ and $\mathrm{O_2}$; the intensity alternation in nitrogen, analysed with Walter Heitler and Gerhard Herzberg in the same year, implied that the $^{14}\mathrm N$ nucleus obeys Bose statistics, a contradiction of the proton–electron model of the nucleus that was removed only by Chadwick's discovery of the neutron in 1932. Ortho- and para-hydrogen had been predicted by Werner Heisenberg and Friedrich Hund, and in 1927 David Dennison explained the anomalous heat capacity of hydrogen by treating them as two species that do not interconvert; Karl Bonhoeffer and Paul Harteck prepared nearly pure para-hydrogen in 1929. True microwave spectroscopy began in 1934, when Claud Cleeton and Neil Williams at the University of Michigan detected the absorption of ammonia near $1.25\ \mathrm{cm}$ wavelength (its inversion spectrum), and it grew rapidly after 1945 with the waveguides, klystrons and detectors developed for radar; Charles Townes and Arthur Schawlow's *Microwave Spectroscopy* (1955) summarised the field. In 1970 Robert Wilson, Keith Jefferts and Arno Penzias detected the $J = 1 \to 0$ line of CO in the Orion nebula, opening the astronomy of molecular clouds.
:::

::: summary
- Molecules are classified by their principal moments of inertia as linear, symmetric (prolate or oblate), spherical or asymmetric tops; a $C_n$ axis with $n \ge 3$ makes a symmetric top, several such axes a spherical top.
- Pure rotational absorption needs a permanent dipole; for linear and symmetric tops $\Delta J = \pm1$ (and $\Delta K = 0$), giving lines at $2\tilde B(J+1)$, so $\tilde B$ — and from it a bond length — follows from the spacing.
- Centrifugal distortion lowers the levels by $\tilde DJ^2(J+1)^2$, with $\tilde D = 4\tilde B^3/\tilde\omega^2$ for a diatomic; it shifts lines by $-4\tilde D(J+1)^3$.
- Isotopic substitution changes moments but not the potential; $N - 1$ isotopologues fix a linear $N$-atom structure, and Kraitchman's equations locate substituted atoms directly. Always state whether a structure is $r_\mathrm{e}$, $r_0$ or $r_\mathrm{s}$.
- Line intensities scale as $\tilde\nu(J+1)\mathrm{e}^{-E_J/k_\mathrm{B}T}(1 - \mathrm{e}^{-hc\tilde\nu/k_\mathrm{B}T})$; the strongest microwave line has $J \approx \sqrt{3k_\mathrm{B}T/2hc\tilde B} - 1$, above the most populated level.
- The second-order Stark effect shifts levels by amounts proportional to $\mu_0^2\mathcal E^2/hB$, giving accurate dipole moments.
- Rotational Raman spectra need an anisotropic polarisability and obey $\Delta J = 0, \pm2$: lines at $6\tilde B, 10\tilde B, \ldots$ from the exciting line; nuclear spin statistics make alternate lines of homonuclear diatomics differ in intensity, or vanish when $I = 0$.
:::

## Exercises

::: exercise Rotational constant of HCl {level=1 check="10.59"}
The equilibrium bond length of $\mathrm{H^{35}Cl}$ is $127.46\ \mathrm{pm}$. Using $m(^1\mathrm H) = 1.007\,825\ \mathrm u$ and $m(^{35}\mathrm{Cl}) = 34.968\,853\ \mathrm u$, calculate $\tilde B_\mathrm{e}$. (Enter $\tilde B_\mathrm{e}$ in $\mathrm{cm^{-1}}$ to four significant figures.)
::: solution
$\mu = (1.007\,825 \times 34.968\,853)/35.976\,678\ \mathrm u = 0.979\,593\ \mathrm u = 1.626\,65\times10^{-27}\ \mathrm{kg}$; $I = \mu r^2 = 1.626\,65\times10^{-27} \times (1.2746\times10^{-10})^2 = 2.6427\times10^{-47}\ \mathrm{kg\,m^2}$. Then $\tilde B_\mathrm{e} = h/8\pi^2cI = 6.626\times10^{-34}/(8\pi^2 \times 2.9979\times10^{10}\ \mathrm{cm\,s^{-1}} \times 2.6427\times10^{-47}) = 10.59\ \mathrm{cm^{-1}}$ (tabulated $10.593\ \mathrm{cm^{-1}}$). The rotational lines are about $21\ \mathrm{cm^{-1}}$ apart — in the far infrared rather than the microwave region, because hydrogen is so light.
:::
:::

::: exercise A line with centrifugal distortion {level=1 check="461040.8"}
Using $B_0 = 57\,635.968\ \mathrm{MHz}$ and $D_0 = 0.1835\ \mathrm{MHz}$ for $^{12}\mathrm{C}^{16}\mathrm{O}$, predict the frequency of the $J = 4 \leftarrow 3$ line. (Enter the frequency in MHz to one decimal place.)
::: solution
With $J + 1 = 4$: $\nu = 2B_0 \times 4 - 4D_0 \times 4^3 = 461\,087.744 - 46.976 = 461\,040.8\ \mathrm{MHz}$. The distortion correction, $47\ \mathrm{MHz}$, grows as $(J+1)^3$ and is ten thousand times the measurement precision.
:::
:::

::: exercise Classifying rotors {level=1}
Classify each molecule as a linear, symmetric (prolate or oblate), spherical or asymmetric top, and say whether it has a pure rotational absorption spectrum: (a) $\mathrm{HCN}$, (b) $\mathrm{BF_3}$, (c) $\mathrm{CH_2Cl_2}$, (d) $\mathrm{SiH_4}$, (e) $\mathrm{CHCl_3}$, (f) $\mathrm{C_2H_2}$.
::: solution
(a) Linear, polar: yes. (b) Oblate symmetric top ($D_{3h}$, $C_3$ axis perpendicular to the plane), non-polar: no. (c) Asymmetric top ($C_{2v}$), polar: yes. (d) Spherical top ($T_\mathrm d$), non-polar: no. (e) Symmetric top ($C_{3v}$); the three heavy chlorines lie far from the $C_3$ axis, so the moment about the axis is the largest and the molecule is oblate; polar: yes. (f) Linear and centrosymmetric ($D_{\infty h}$): no dipole, no microwave spectrum, but a rotational Raman spectrum (with intensity alternation from the two protons).
:::
:::

::: exercise An isotopologue's line {level=2 check="110.19"}
The $J = 1 \leftarrow 0$ line of $^{12}\mathrm{C}^{16}\mathrm{O}$ is at $115.2712\ \mathrm{GHz}$. Assuming $B \propto 1/\mu$ with the same bond length, predict the line of $^{13}\mathrm{C}^{16}\mathrm{O}$ ($m(^{13}\mathrm C) = 13.003\,355\ \mathrm u$). Ignore centrifugal distortion. (Enter the frequency in GHz to five significant figures.)
::: solution
$\mu(^{12}\mathrm{CO}) = 6.856\,21\ \mathrm u$ and $\mu(^{13}\mathrm{CO}) = 13.003\,355 \times 15.994\,915/28.998\,270 = 7.172\,36\ \mathrm u$. The ratio is $0.955\,91$, so $\nu = 115.2712 \times 0.955\,91 = 110.19\ \mathrm{GHz}$. The observed line is at $110.2014\ \mathrm{GHz}$; the $0.01\,\%$ discrepancy arises because $B_0$ is a vibrational average and the zero-point motion of the heavier isotopologue is smaller, so its $r_0$ is slightly shorter. Exact work therefore scales $B_\mathrm{e}$, not $B_0$.
:::
:::

::: exercise A dipole moment from a Stark shift {level=2 check="0.697"}
A linear molecule has $B_0 = 9000\ \mathrm{MHz}$. In a field of $1.50\ \mathrm{kV\,cm^{-1}}$ the $M = 0 \leftarrow 0$ component of its $J = 1 \leftarrow 0$ line is shifted by $+8.20\ \mathrm{MHz}$. (a) Find the dipole moment. (b) Where should the $M = \pm1 \leftarrow 0$ component appear? (c) Check that second-order perturbation theory is adequate. (Enter $\mu_0$ in debye to three significant figures.)
::: solution
(a) From [[#prop-stark]], $\mu_0 = (h/\mathcal E)\sqrt{15B\Delta\nu/4} = (6.6261\times10^{-34}/1.50\times10^{5})\sqrt{15(9.000\times10^{9})(8.20\times10^{6})/4}\ \mathrm{C\,m} = 2.324\times10^{-30}\ \mathrm{C\,m} = 0.697\ \mathrm{D}$. (b) The ratio of the two shifts is $(7/60)/(4/15) = 7/16$, so the perpendicular component is shifted by $\tfrac{7}{16} \times 8.20 = 3.59\ \mathrm{MHz}$. Measuring both and checking the $7 : 16$ ratio confirms the assignment of $M$ and the uniformity of the field. (c) $\mu_0\mathcal E/h = 526\ \mathrm{MHz}$, much less than $2B = 18\,000\ \mathrm{MHz}$, so the perturbation expansion converges fast.
:::
:::

::: exercise Ortho- and para-hydrogen {level=2 check="0.974"}
For $\mathrm{H_2}$ take $\tilde B = 59.32\ \mathrm{cm^{-1}}$ and rigid-rotor levels. Calculate the equilibrium ratio of ortho to para molecules at $77\ \mathrm K$ (liquid nitrogen), and state its limiting value at high temperature. (Enter the ortho : para ratio at $77\ \mathrm K$ to three significant figures.)
::: hint
Ortho levels (odd $J$) have nuclear-spin weight 3 and para levels (even $J$) weight 1, in addition to $2J+1$. At $77\ \mathrm K$, $k_\mathrm{B}T/hc = 53.5\ \mathrm{cm^{-1}}$; only the first two or three levels of each kind matter.
:::
::: solution
$k_\mathrm{B}T/hc = 0.695\,03 \times 77 = 53.52\ \mathrm{cm^{-1}}$. Para: $1 + 5\mathrm{e}^{-6\tilde B/53.52} + 9\mathrm{e}^{-20\tilde B/53.52} + \cdots = 1 + 5(1.293\times10^{-3}) + \cdots = 1.00647$. Ortho: $3\left[3\mathrm{e}^{-2\tilde B/53.52} + 7\mathrm{e}^{-12\tilde B/53.52} + \cdots\right] = 3\left[3(0.10895) + 7(1.7\times10^{-6})\right] = 0.98061$. The ratio is $0.98061/1.00647 = 0.974$, so equilibrium hydrogen at $77\ \mathrm K$ is about $51\,\%$ para. At high temperature many levels of each kind are populated, the Boltzmann sums over odd and even $J$ become equal, and the ratio tends to the spin-weight ratio $3 : 1$ ("normal" hydrogen, $25\,\%$ para). Because conversion is slow, hydrogen cooled without a catalyst keeps its $3 : 1$ ratio, and its slow conversion later releases heat — a practical problem in storing liquid hydrogen.
:::
:::

::: exercise Kratzer's relation for HCl {level=3 check="5.32"}
(a) Derive $\tilde D = 4\tilde B^3/\tilde\omega^2$ for a diatomic molecule from the balance of centrifugal and restoring forces. (b) Evaluate $\tilde D_\mathrm{e}$ for $\mathrm{H^{35}Cl}$ with $\tilde B_\mathrm{e} = 10.5934\ \mathrm{cm^{-1}}$ and $\tilde\omega_\mathrm{e} = 2990.95\ \mathrm{cm^{-1}}$, and estimate the distortion correction to the $J = 10 \leftarrow 9$ line. (Enter $\tilde D_\mathrm{e}$ in units of $10^{-4}\ \mathrm{cm^{-1}}$ to three significant figures.)
::: hint
Follow the proof of [[#prop-cd]]: minimise $L^2/2\mu r^2 + \tfrac12k_\mathrm{f}(r - r_\mathrm{e})^2$ at fixed $L$, then use $k_\mathrm{f} = 4\pi^2c^2\tilde\omega^2\mu$.
:::
::: solution
(a) As in the proof of [[#prop-cd]]: the stretch is $\delta = L^2/k_\mathrm{f}\mu r_\mathrm{e}^3$, and the energy lowering $L^4/2k_\mathrm{f}\mu^2r_\mathrm{e}^6$; with $L^2 = \hbar^2J(J+1)$, $\tilde D = \hbar^4/(2k_\mathrm{f}\mu^2r_\mathrm{e}^6hc)$. Writing $\tilde B = \hbar^2/(2\mu r_\mathrm{e}^2hc)$ and $k_\mathrm{f} = 4\pi^2c^2\tilde\omega^2\mu$, first $\tilde D = \hbar^4/(8\pi^2c^3\tilde\omega^2\mu^3r_\mathrm{e}^6h)$, and $\tilde B^3/\tilde\omega^2 = \hbar^6/(8\mu^3r_\mathrm{e}^6h^3c^3\tilde\omega^2)$. In the ratio the masses, $r_\mathrm{e}$, $c$ and $\tilde\omega$ cancel: $\tilde D\big/(\tilde B^3/\tilde\omega^2) = h^2/(\pi^2\hbar^2) = 4$.

(b) $\tilde D_\mathrm{e} = 4(10.5934)^3/(2990.95)^2 = 4(1188.79)/(8.9458\times10^{6}) = 5.32\times10^{-4}\ \mathrm{cm^{-1}}$ (observed $5.32\times10^{-4}\ \mathrm{cm^{-1}}$). For $J = 10 \leftarrow 9$, the correction is $-4\tilde D(J+1)^3 = -4(5.32\times10^{-4})(1000) = -2.13\ \mathrm{cm^{-1}}$ on a line near $2 \times 10.59 \times 10 \approx 212\ \mathrm{cm^{-1}}$ — a 1 % effect, large because HCl is light and its $\tilde B$ is big.
:::
:::

::: exercise The strongest line of carbonyl sulfide {level=3 check="38"}
(a) Show that, when $hc\tilde\nu \ll k_\mathrm{B}T$, the strongest pure rotational absorption line of a linear molecule starts from $J_\mathrm{peak} \approx \sqrt{3k_\mathrm{B}T/2hc\tilde B} - 1$. (b) For OCS, $\tilde B_0 = 0.202\,86\ \mathrm{cm^{-1}}$. Find $J_\mathrm{peak}$ at $300\ \mathrm K$, the frequency of that line, and the most populated level. (Enter $J_\mathrm{peak}$, the lower-state $J$ of the strongest line.)
::: solution
(a) From [[#eq-rot-int]] with $1 - \mathrm{e}^{-x} \approx x \propto J+1$ and $\tilde\nu \propto J+1$, $S_J \propto (J+1)^3\mathrm{e}^{-\beta J(J+1)}$ with $\beta = hc\tilde B/k_\mathrm{B}T$. Treating $J$ as continuous and approximating $J(J+1) \approx (J+1)^2$ in the exponent, $\mathrm{d}\ln S/\mathrm{d}(J+1) = 3/(J+1) - 2\beta(J+1) = 0$, so $J+1 = \sqrt{3/2\beta}$.

(b) $k_\mathrm{B}T/hc = 208.51\ \mathrm{cm^{-1}}$ at $300\ \mathrm K$, so $\sqrt{3 \times 208.51/(2 \times 0.202\,86)} = 39.27$ and $J_\mathrm{peak} \approx 38.3$, i.e. $J = 38$ (an exact evaluation of [[#eq-rot-int]] confirms $J = 38$). The line $39 \leftarrow 38$ is at $2B(J+1) = 2 \times 6081.49\ \mathrm{MHz} \times 39 = 474.4\ \mathrm{GHz}$, in the submillimetre region. The most populated level is $\sqrt{208.51/(2\times0.202\,86)} - \tfrac12 = 22.2$, i.e. $J = 22$. Heavy molecules have their strongest lines far up the ladder, at frequencies much higher than their first line.
:::
:::

::: exercise The bond length of nitrogen from its Raman spectrum {level=3 check="110.0"}
The Stokes rotational Raman spectrum of $^{14}\mathrm{N_2}$ shows lines at $11.94$, $19.90$, $27.86$ and $35.81\ \mathrm{cm^{-1}}$ from the exciting line, with intensities alternating strong, weak, strong, weak. (a) Assign the lines and determine $\tilde B_0$. (b) Find $r_0$ ($m(^{14}\mathrm N) = 14.003\,074\ \mathrm u$). (c) Explain the alternation, and predict what would change for $^{15}\mathrm{N_2}$ ($I = \tfrac12$). (Enter $r_0$ in pm to four significant figures.)
::: solution
(a) The spacing is $(35.81 - 11.94)/3 = 7.957\ \mathrm{cm^{-1}} = 4\tilde B$, and the first line at $11.94 = 6\tilde B$ confirms that it is S(0). Hence $\tilde B_0 = 1.989\ \mathrm{cm^{-1}}$ (from the spacing, $1.9892$; from S(0), $1.990$).

(b) $\mu = 7.001\,537\ \mathrm u = 1.162\,63\times10^{-26}\ \mathrm{kg}$; $I = h/8\pi^2c\tilde B = 1.4071\times10^{-46}\ \mathrm{kg\,m^2}$ for $\tilde B = 1.9892\ \mathrm{cm^{-1}}$, and $r_0 = \sqrt{I/\mu} = 110.0\ \mathrm{pm}$ (the equilibrium value is $109.77\ \mathrm{pm}$).

(c) $^{14}\mathrm N$ has $I = 1$ and is a boson, so even-$J$ levels have weight $6$ and odd-$J$ levels $3$ ([[#eq-spin-stat]]); the lines S(0), S(2) from even $J$ are twice as strong as S(1), S(3). For $^{15}\mathrm N_2$, $I = \tfrac12$, a fermion: odd-$J$ levels get weight $3$ and even-$J$ weight $1$, so the alternation reverses (now S(1), S(3) are strong) and becomes $3 : 1$. The line positions also shift, because $\tilde B$ falls by the mass ratio $14.003/15.000$.
:::
:::
