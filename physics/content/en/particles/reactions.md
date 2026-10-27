In 1919 Ernest Rutherford let alpha particles from a radioactive source pass through nitrogen gas and saw scintillations from particles that travelled much further than the alphas could: protons. He had transmuted nitrogen into oxygen, the first nuclear reaction made on purpose. Every later question in nuclear physics, from the structure of the nucleus to the energy of the stars, has been answered by colliding a projectile with a target and asking two things: is the reaction allowed by energy conservation, and how likely is it?

The first question is answered by the **Q-value**, the rest energy released, which comes straight from the binding-energy bookkeeping of [[particles/nuclear-structure]]. The second is answered by the **cross-section**, an effective target area that encodes all the dynamics: the Coulomb barrier that keeps positively charged nuclei apart, the resonances of the compound nucleus, the slow-neutron capture that has no barrier at all. This chapter develops both, and then applies them to the two reactions that release nuclear energy on a large scale: fission of heavy nuclei and fusion of light ones. We treat them at the level of energetics, enough to see why about $200\,\mathrm{MeV}$ is released per fission and why the Sun can shine for ten billion years.

We use the decay Q-values and the tunnelling factor of [[particles/decay]], the relativistic energy–momentum relation of [[relativity/velocity-energy]] and [[relativity/four-vectors]], and the Maxwell–Boltzmann distribution of [[thermodynamics/kinetic-theory]]. Masses are atomic masses from AME2020, with $1\,\mathrm{u} = 931.494\,\mathrm{MeV}/c^2$, and $e^2/4\pi\varepsilon_0 = 1.440\,\mathrm{MeV\,fm}$.

## Q-values and thresholds {#qvalue}

A two-body reaction is written

$$
a + X \to Y + b \qquad\text{or}\qquad X(a, b)Y ,
$$

where $a$ is the projectile, $X$ the target (usually at rest in the laboratory), $Y$ the residual nucleus and $b$ the light ejectile. Rutherford's reaction was ${}^{14}\mathrm{N}(\alpha, p){}^{17}\mathrm{O}$. Charge and the number of nucleons are conserved in every nuclear reaction at these energies, so the subscripts and superscripts must balance.

::: definition Q-value of a reaction {#def-qreaction}
The **Q-value** of $X(a, b)Y$ is

$$
Q = \bigl[m_a + m_X - m_Y - m_b\bigr]c^2 = K_Y + K_b - K_a - K_X ,
$$ {#eq-q}

the excess of initial over final rest energy, equal by energy conservation to the gain in kinetic energy. The reaction is **exothermic** if $Q > 0$ and **endothermic** if $Q < 0$. Atomic masses may be used, because the electrons balance when charge does.
:::

An exothermic reaction can proceed with the projectile at rest, as far as energy is concerned (whether it does so is a question of barriers and cross-sections). An endothermic one needs a projectile kinetic energy of at least $\lvert Q\rvert$, and in fact more, because momentum conservation forbids the products from being at rest in the laboratory: some of the projectile's energy must go into motion of the centre of mass.

::: theorem Threshold energy {#thm-threshold}
For an endothermic reaction $a + X \to$ (final particles of total mass $M_f$) on a target at rest, the smallest projectile kinetic energy for which the reaction is possible is

$$
K_\mathrm{th} = \frac{(M_f^2 - (m_a + m_X)^2)c^2}{2m_X} = -Q\,\frac{m_a + m_X + M_f}{2m_X}.
$$ {#eq-threshold}

When $\lvert Q\rvert \ll m_X c^2$, this is $K_\mathrm{th} \approx -Q\,(1 + m_a/m_X)$.
:::

::: proof
The invariant mass squared of the initial state, $s = (E_\mathrm{tot}^2 - p_\mathrm{tot}^2c^2)$, is the same in every frame ([[relativity/four-vectors]]). In the laboratory, with projectile energy $E_a = K_a + m_ac^2$ and the target at rest,

$$
s = (E_a + m_Xc^2)^2 - p_a^2c^2 = m_a^2c^4 + m_X^2c^4 + 2E_am_Xc^2 .
$$

In the centre-of-mass frame the final particles can at best all be at rest, so the smallest possible $s$ for the final state is $M_f^2c^4$. The reaction is possible if and only if $s \ge M_f^2c^4$. At threshold, $2E_am_Xc^2 = (M_f^2 - m_a^2 - m_X^2)c^4$, so

$$
K_\mathrm{th} = E_a - m_ac^2 = \frac{(M_f^2 - m_a^2 - m_X^2 - 2m_am_X)c^2}{2m_X} = \frac{(M_f^2 - (m_a + m_X)^2)c^2}{2m_X} .
$$

Factorising the difference of squares with $-Q = (M_f - m_a - m_X)c^2$ gives the second form, and for $M_f \approx m_a + m_X$ the factor $(m_a + m_X + M_f)/2m_X \approx (m_a + m_X)/m_X$.
:::

The same formula governs particle production at accelerators, where $\lvert Q\rvert$ is not small compared with the masses; [[particles/accelerators]] uses it to compare fixed-target machines with colliders.

::: example Rutherford's transmutation {#ex-rutherford}
Find the Q-value and the threshold energy of ${}^{14}\mathrm{N}(\alpha, p){}^{17}\mathrm{O}$. Atomic masses: ${}^{14}\mathrm{N}$ $14.003074$, ${}^4\mathrm{He}$ $4.002603$, ${}^{17}\mathrm{O}$ $16.999132$, ${}^1\mathrm{H}$ $1.007825\,\mathrm{u}$.
::: solution
By [[#eq-q]],

$$
Q = (14.003074 + 4.002603 - 16.999132 - 1.007825)(931.494)\,\mathrm{MeV} = (-0.001280)(931.494) = -1.192\,\mathrm{MeV}.
$$

The reaction is endothermic. The non-relativistic form of [[#eq-threshold]] gives

$$
K_\mathrm{th} = 1.192 \times \left(1 + \frac{4.0026}{14.0031}\right) = 1.192 \times 1.2858 = 1.533\,\mathrm{MeV},
$$

and the exact form agrees to four figures. Rutherford's alpha particles from ${}^{214}\mathrm{Po}$ had $7.7\,\mathrm{MeV}$, comfortably above threshold. The limiting factor was not energy but the Coulomb barrier, which for $\alpha + {}^{14}\mathrm{N}$ is about $4\,\mathrm{MeV}$ by [[#eq-barrier]], and the small cross-section: about one alpha in a million produced a proton.
:::
:::

## Cross-sections {#cross-sections}

Energy conservation says whether a reaction can happen. The cross-section says how often it does.

::: definition Cross-section {#def-sigma}
A beam of $\dot N_a$ particles per second, spread uniformly over an area larger than the target, strikes a thin target containing $n_t$ target nuclei per unit area of its face. If $\dot N_R$ reactions occur per second, the **cross-section** is

$$
\sigma = \frac{\dot N_R}{\dot N_a\, n_t}.
$$ {#eq-sigma}

It has dimensions of area. The nuclear unit is the **barn**, $1\,\mathrm{b} = 10^{-28}\,\mathrm{m}^2 = 100\,\mathrm{fm}^2$. If the target is instead immersed in a uniform flux $\Phi$ (particles per unit area per unit time), each target nucleus reacts at the rate $\sigma\Phi$.
:::

The picture is a target nucleus presenting an area $\sigma$ to the beam: a projectile that enters that area reacts, one that misses does not. "Thin" means the nuclei do not shadow one another, $n_t\sigma \ll 1$. A barn is roughly the geometric area of a heavy nucleus, $\pi(7\,\mathrm{fm})^2 = 1.5\,\mathrm{b}$, which is how the name, "as big as a barn", arose among American physicists in 1942. Measured cross-sections range from thousands of barns (slow-neutron capture by some nuclei) to $10^{-20}\,\mathrm{b}$ (neutrino interactions), so the geometric picture is only a mnemonic.

A thick target attenuates the beam. In a slab containing $n$ nuclei per unit volume, a beam that has reached depth $x$ loses $\dd I = -I n\sigma\,\dd x$ in the next layer, so

$$
I(x) = I_0 e^{-n\sigma x}, \qquad \ell = \frac{1}{n\sigma},
$$ {#eq-attenuation}

where $\ell$ is the **mean free path**. This is the same exponential as the decay law, with depth in place of time.

The **differential cross-section** $\dd\sigma/\dd\Omega$ counts only the ejectiles entering a small solid angle $\dd\Omega$ in a given direction; integrated over all directions it gives $\sigma$. Rutherford scattering of charged particles, derived from the Coulomb orbit in [[analytical-mechanics/central-forces]], is the classic example:

$$
\frac{\dd\sigma}{\dd\Omega} = \left(\frac{zZe^2}{4\pi\varepsilon_0\,4K}\right)^2 \frac{1}{\sin^4(\theta/2)} .
$$

Its total cross-section is infinite, because the Coulomb force has infinite range; only the differential form is meaningful.

::: example Neutron activation of gold {#ex-activation}
A gold foil of mass $1.00\,\mathrm{mg}$ is placed in a thermal-neutron flux $\Phi = 1.0\times10^{16}\,\mathrm{m^{-2}\,s^{-1}}$. The capture cross-section of ${}^{197}\mathrm{Au}$ for thermal neutrons is $98.7\,\mathrm{b}$, and the product ${}^{198}\mathrm{Au}$ has $t_{1/2} = 2.694\,\mathrm{d}$. Find the rate of production and the activity after one day of irradiation.
::: solution
The foil contains $N = (1.00\times10^{-3}/196.97)\times 6.022\times10^{23} = 3.057\times10^{18}$ nuclei. Each captures at the rate $\sigma\Phi = 98.7\times10^{-28} \times 1.0\times10^{16} = 9.87\times10^{-11}\,\mathrm{s}^{-1}$, so the production rate is

$$
R = N\sigma\Phi = 3.02\times10^{8}\,\mathrm{s}^{-1}.
$$

(The foil is thin to neutrons: $N\sigma\Phi$ is a tiny fraction of $N$ per second, and burn-up is negligible.) The number of ${}^{198}\mathrm{Au}$ nuclei obeys $\dot N_{198} = R - \lambda N_{198}$, a chain with a constant source, so $N_{198} = (R/\lambda)(1 - e^{-\lambda t})$ and the activity is

$$
\mathcal{A}(t) = R\left(1 - e^{-\lambda t}\right).
$$

With $\lambda t = \ln 2 \times 1/2.694 = 0.2573$, $1 - e^{-0.2573} = 0.2269$, and $\mathcal{A} = 6.8\times10^7\,\mathrm{Bq}$. Irradiating for ever would give at most the **saturation activity** $R = 3.0\times10^8\,\mathrm{Bq}$; irradiating for more than a few half-lives is wasted. Activation analysis runs this calculation backwards: from the measured activity it infers how many gold atoms a sample contains.
:::
:::

### Barriers, resonances and slow neutrons

Three features dominate the energy dependence of nuclear cross-sections.

**The Coulomb barrier.** Two nuclei of charges $Z_1e$ and $Z_2e$ begin to feel the strong force when their surfaces touch, at a separation $R_1 + R_2$. The electrostatic energy at that point is

$$
V_C = \frac{Z_1Z_2e^2}{4\pi\varepsilon_0(R_1 + R_2)}, \qquad R_i = R_0A_i^{1/3},
$$ {#eq-barrier}

with $R_0$ about $1.2$ to $1.4\,\mathrm{fm}$ for this purpose. For $\alpha + {}^{14}\mathrm{N}$ with $R_0 = 1.2\,\mathrm{fm}$ it is $2 \times 7 \times 1.440/(1.2(1.587 + 2.410)) = 4.2\,\mathrm{MeV}$; for $\alpha + {}^{197}\mathrm{Au}$ it is $26\,\mathrm{MeV}$, which is why Geiger and Marsden's $5$–$8\,\mathrm{MeV}$ alphas scattered from gold exactly as from a point charge. Below the barrier, charged-particle reactions proceed only by tunnelling, with the Gamow factor of [[particles/decay]], and the cross-section falls exponentially as the energy drops.

**Resonances.** Many reactions proceed through a **compound nucleus**, as Niels Bohr proposed in 1936: the projectile is absorbed, its energy is shared among all the nucleons, and the system lives long enough to "forget" how it was formed before it decays. When the projectile energy matches a quasi-bound level of the compound nucleus, the cross-section shows a sharp peak described by the **Breit–Wigner** formula (Gregory Breit and Eugene Wigner, 1936):

$$
\sigma(E) = \frac{\pi}{k^2}\, g\, \frac{\Gamma_a\Gamma_b}{(E - E_R)^2 + \Gamma^2/4},
$$ {#eq-bw}

where $k$ is the wave number of relative motion, $g$ a spin factor, $E_R$ the resonance energy, $\Gamma$ the total width of the level (its lifetime is $\hbar/\Gamma$), and $\Gamma_a$, $\Gamma_b$ the partial widths for the entrance and exit channels. The peak has full width $\Gamma$ at half maximum. The same formula describes particle resonances in [[particles/standard-model]], such as the $Z$ boson.

::: widget plot
f: (G^2/4)/((x - E)^2 + G^2/4)
x: 0, 10
y: 0, 1.1
sliders: E=5:1:9:0.1; G=0.5:0.05:3:0.05
labels: Breit–Wigner line shape, normalised to 1 at the peak
caption: The energy dependence of [[#eq-bw]] with $\pi g\Gamma_a\Gamma_b/k^2$ held fixed and the peak scaled to 1; the horizontal axis is energy in arbitrary units. The figure opens with $E_R = 5$ and $\Gamma = 0.5$. Shrink $\Gamma$ and the line becomes tall and narrow, the signature of a long-lived state; widen it and it melts into the background. Notice that the half-height points always sit at $E_R \pm \Gamma/2$, so the width can be read off the curve and converted to a lifetime with $\tau = \hbar/\Gamma$.
:::

**Slow neutrons.** A neutron feels no Coulomb barrier, so it can be captured however slowly it moves. At low energies, far from resonances, the capture cross-section varies as $1/v$: the time the neutron spends near the nucleus is proportional to $1/v$, and in [[#eq-bw]] the factor $\pi/k^2 \propto 1/v^2$ is multiplied by an entrance width $\Gamma_a \propto v$. Slowing neutrons down, by collisions with light nuclei in a **moderator** such as water or graphite, therefore makes capture and neutron-induced fission far more likely. Fermi's group in Rome discovered this in 1934, when they found that paraffin wax around the source increased the induced activity a hundredfold.

::: quiz
Why do proton-induced reactions on heavy nuclei need beams of several MeV, while neutron-induced reactions on the same nuclei are often most likely at energies below $1\,\mathrm{eV}$?
- [ ] Protons are heavier than neutrons.
- [x] The proton must overcome or tunnel through the Coulomb barrier, the neutron sees none, and slow neutrons have a capture cross-section that grows like $1/v$.
- [ ] Neutrons are absorbed only by the weak interaction, which is strongest at low energy.
- [ ] The Q-values of proton-induced reactions are always negative.
::: solution
The proton and neutron masses differ by $0.14\%$, which is irrelevant here. The proton carries charge, so it faces a barrier of order $10\,\mathrm{MeV}$ on a heavy nucleus, and below that its cross-section is suppressed by the Gamow factor. The neutron is captured by the strong force, with no barrier, and the $1/v$ law makes slower neutrons more likely to react. Q-values have nothing to do with the projectile's charge.
:::
:::

## Fission {#fission}

At the end of 1938 Otto Hahn and Fritz Strassmann, in Berlin, found barium among the products of uranium bombarded with neutrons. Barium has $Z = 56$, roughly half of uranium's 92. Lise Meitner, who had left Germany that summer, and her nephew Otto Frisch interpreted the result over Christmas 1938 and published it in February 1939: the uranium nucleus had split in two, like a liquid drop that elongates and divides, releasing about $200\,\mathrm{MeV}$. Frisch called it **fission**.

### Why heavy nuclei can split

The binding-energy curve already answers the energetic question. A nucleus with $A = 236$ has $B/A \approx 7.6\,\mathrm{MeV}$; two fragments with $A \approx 118$ have $B/A \approx 8.5\,\mathrm{MeV}$. Every nucleon gains about $0.9\,\mathrm{MeV}$, and $236 \times 0.9 \approx 210\,\mathrm{MeV}$ is released.

::: example One fission channel {#ex-fission}
One of the many ways ${}^{235}\mathrm{U}$ splits after absorbing a slow neutron is

$$
n + {}^{235}\mathrm{U} \to {}^{141}\mathrm{Ba} + {}^{92}\mathrm{Kr} + 3n .
$$

Using atomic masses ${}^{235}\mathrm{U}$ $235.043930$, ${}^{141}\mathrm{Ba}$ $140.914403$, ${}^{92}\mathrm{Kr}$ $91.926173$ and $m_n = 1.008665\,\mathrm{u}$, find $Q$. Compare it with the Coulomb energy of the two fragments touching as spheres.
::: solution
The initial mass is $235.043930 + 1.008665 = 236.052595\,\mathrm{u}$; the final mass is $140.914403 + 91.926173 + 3(1.008665) = 235.866571\,\mathrm{u}$. So

$$
Q = 0.186024 \times 931.494 = 173.3\,\mathrm{MeV}.
$$

The electrons balance: $92$ on each side. If the fragments start as touching spheres with $R_0 = 1.2\,\mathrm{fm}$, their centres are $1.2(141^{1/3} + 92^{1/3}) = 1.2(5.205 + 4.514) = 11.66\,\mathrm{fm}$ apart, and their Coulomb energy is

$$
V_C = \frac{56 \times 36 \times 1.440}{11.66}\,\mathrm{MeV} = 249\,\mathrm{MeV}.
$$

That is more than the energy available, so the fragments cannot actually start as touching spheres: at scission they are elongated and further apart. But the comparison shows where the energy goes. The fragments are pushed apart by their mutual repulsion, and most of the release appears as their kinetic energy, about $170\,\mathrm{MeV}$. The fragments are also far from the valley of stability (${}^{141}\mathrm{Ba}$ has $N/Z = 1.52$, while stable barium isotopes have at most $1.46$), so they beta-decay afterwards, releasing more energy over seconds to years.
:::
:::

The total release in thermal-neutron fission of ${}^{235}\mathrm{U}$, averaged over all channels, is about $200\,\mathrm{MeV}$, shared approximately as follows: about $170\,\mathrm{MeV}$ of fragment kinetic energy, $5\,\mathrm{MeV}$ carried by an average of $2.4$ prompt neutrons, $7\,\mathrm{MeV}$ of prompt gamma rays, and, from the later beta decays of the fragments, roughly $8\,\mathrm{MeV}$ of electron energy, $7\,\mathrm{MeV}$ of gamma rays and $10\,\mathrm{MeV}$ of antineutrinos, which escape. A kilogram of ${}^{235}\mathrm{U}$ contains $2.56\times10^{24}$ nuclei, so complete fission would release

$$
2.56\times10^{24} \times 200\,\mathrm{MeV} \times 1.602\times10^{-13}\,\mathrm{J/MeV} = 8.2\times10^{13}\,\mathrm{J},
$$

about three million times the chemical energy of a kilogram of coal ($\approx 3\times10^7\,\mathrm{J}$). The factor reflects the ratio of MeV to eV energy scales noted in [[particles/nuclear-structure]].

### The fission barrier

If heavy nuclei gain so much by splitting, why does ${}^{238}\mathrm{U}$ survive for billions of years? Because, as for alpha decay, a barrier stands in the way. As a spherical drop deforms, its surface area grows, which costs energy, while its protons move apart, which releases Coulomb energy. For small deformations the surface wins.

::: proposition Liquid-drop stability against fission {#prop-fissility}
Deform a uniformly charged liquid drop of fixed volume into a spheroid with semi-axes $R(1 + \varepsilon)$ and $R(1 + \varepsilon)^{-1/2}$. To second order in $\varepsilon$, the surface and Coulomb energies become

$$
E_S = E_S^{(0)}\left(1 + \tfrac25\varepsilon^2\right), \qquad E_C = E_C^{(0)}\left(1 - \tfrac15\varepsilon^2\right).
$$

Hence the sphere is stable against small deformations if and only if $E_C^{(0)} < 2E_S^{(0)}$, which with the mass-formula terms becomes

$$
\frac{Z^2}{A} < \frac{2a_S}{a_C} \approx 47 .
$$ {#eq-fissility}
:::

::: proof
The two expansions are standard results of the geometry of spheroids, derived by Bohr and Wheeler (1939); see Krane §13.2 for the calculation. Granting them, the change in energy is

$$
\Delta E = \frac{\varepsilon^2}{5}\left(2E_S^{(0)} - E_C^{(0)}\right),
$$

which is positive, so the sphere sits at a minimum, exactly when $2E_S^{(0)} > E_C^{(0)}$. With $E_S^{(0)} = a_SA^{2/3}$ and $E_C^{(0)} \approx a_CZ^2A^{-1/3}$, the condition $a_CZ^2A^{-1/3} < 2a_SA^{2/3}$ is $Z^2/A < 2a_S/a_C = 2 \times 16.8/0.72 = 46.7$.
:::

For ${}^{238}\mathrm{U}$, $Z^2/A = 35.6$, well below 47. The nucleus sits in a shallow minimum, and a barrier of about $6\,\mathrm{MeV}$ separates it from the scission configuration. Spontaneous fission happens only by tunnelling through that barrier and is rare: for ${}^{238}\mathrm{U}$ the spontaneous-fission branch is about $5\times10^{-7}$ of decays. As $Z^2/A$ increases the barrier shrinks, which is one reason the heaviest elements are so short-lived.

Induced fission works by bringing the compound nucleus above the barrier. When ${}^{235}\mathrm{U}$ absorbs a neutron of negligible kinetic energy, the compound nucleus ${}^{236}\mathrm{U}$ is formed with excitation energy equal to the neutron separation energy of ${}^{236}\mathrm{U}$, $6.55\,\mathrm{MeV}$, above its fission barrier of roughly $6\,\mathrm{MeV}$, so it splits readily. When ${}^{238}\mathrm{U}$ absorbs a slow neutron, ${}^{239}\mathrm{U}$ is formed with only $4.81\,\mathrm{MeV}$, below its barrier, and it usually just emits a gamma ray. The difference of $1.7\,\mathrm{MeV}$ is the pairing term of the mass formula: ${}^{236}\mathrm{U}$ is even–even and binds its last neutron extra tightly, ${}^{239}\mathrm{U}$ is even–odd and does not. Nuclides that fission with slow neutrons, such as ${}^{233}\mathrm{U}$, ${}^{235}\mathrm{U}$ and ${}^{239}\mathrm{Pu}$, are called **fissile**.

::: remark Chain reactions
Each fission releases on average more than two neutrons, so a fission can cause further fissions. A nuclear power reactor maintains a steady chain in which, on average, exactly one neutron from each fission causes another; the timescale is controlled by the small fraction (about $0.65\%$ for ${}^{235}\mathrm{U}$) of neutrons that are emitted with delays of seconds by fission fragments. The first such self-sustaining reaction was achieved by Fermi's group in Chicago on 2 December 1942. The engineering of reactors belongs to a course on nuclear engineering and is beyond this chapter.
:::

## Fusion {#fusion}

At the other end of the binding-energy curve, joining light nuclei moves up the steep rise and releases energy. The most important reaction for the laboratory is

$$
{}^2\mathrm{H} + {}^3\mathrm{H} \to {}^4\mathrm{He} + n, \qquad Q = 17.59\,\mathrm{MeV},
$$

which has the largest cross-section of the light-nucleus reactions at accessible energies, peaking near $64\,\mathrm{keV}$ centre-of-mass energy at about $5\,\mathrm{b}$. The problem is the Coulomb barrier, about $0.4\,\mathrm{MeV}$ for $d + t$ by [[#eq-barrier]]. Fusion happens only if the nuclei are hot enough that the high-energy tail of their thermal distribution tunnels through it at a useful rate.

### The Gamow peak

In a gas at temperature $T$, the fraction of pairs with relative energy near $E$ is proportional to $e^{-E/kT}$, which falls with $E$, while the tunnelling probability $e^{-2G}$ rises steeply with $E$. For energies far below the barrier, the thick-barrier form of the Gamow factor in [[particles/decay]] gives $2G \approx \sqrt{E_G/E}$, with the **Gamow energy**

$$
E_G = 2\mu c^2\left(\pi\alpha Z_1Z_2\right)^2 .
$$ {#eq-gamow-energy}

The reaction rate is proportional to the integral of the product $e^{-E/kT}e^{-\sqrt{E_G/E}}$ (times a slowly varying factor), and the product is sharply peaked.

::: proposition The Gamow peak {#prop-gamow-peak}
The function $f(E) = \exp\bigl(-E/kT - \sqrt{E_G/E}\bigr)$ has a single maximum, at

$$
E_0 = \left(\frac{E_G (kT)^2}{4}\right)^{1/3},
$$ {#eq-gamow-peak}

where its value is $e^{-3E_0/kT}$.
:::

::: proof
Maximise the exponent $g(E) = -E/kT - E_G^{1/2}E^{-1/2}$. Its derivative $g'(E) = -1/kT + \tfrac12 E_G^{1/2}E^{-3/2}$ is positive for small $E$, negative for large $E$, and decreasing throughout, so it has one zero, where $E^{3/2} = \tfrac12 E_G^{1/2}kT$; squaring gives $E_0^3 = E_G(kT)^2/4$. At that point $\sqrt{E_G/E_0} = 2E_0/kT$ (from $E_0^{3/2} = \tfrac12 E_G^{1/2}kT$), so $g(E_0) = -E_0/kT - 2E_0/kT = -3E_0/kT$.
:::

::: widget plot
f: exp(-x/T - sqrt(493/x) + 3 (493 T^2/4)^(1/3)/T); exp(-x/T); exp(-sqrt(493/x) + sqrt(493/30))
x: 0.2, 30
y: 0, 1.1
sliders: T=1.35:0.5:3:0.05
labels: product, scaled to 1 at its peak; Maxwell–Boltzmann factor; tunnelling factor, scaled to 1 at 30 keV
caption: Energy $E$ in keV on the horizontal axis, for the proton–proton reaction ($E_G = 493\,\mathrm{keV}$) at temperature $kT$ in keV (slider). The figure opens at $kT = 1.35\,\mathrm{keV}$, the centre of the Sun. The falling curve is $e^{-E/kT}$, the rising one is the tunnelling factor, and their product, rescaled because it is really about $10^{-6}$, peaks near $E_0 = 6\,\mathrm{keV}$: four to five times $kT$, and far below the $600\,\mathrm{keV}$ Coulomb barrier. Raise $kT$ and watch the peak move to higher energy and broaden, as $E_0 \propto T^{2/3}$ predicts.
:::

::: quiz
If the temperature of a plasma is doubled, how does the energy $E_0$ of the Gamow peak change, and what happens to the height of the peak?
- [ ] $E_0$ doubles, and the height is unchanged.
- [x] $E_0$ grows by $2^{2/3} \approx 1.59$, and the height $e^{-3E_0/kT}$ rises steeply, because $E_0/kT$ falls by $2^{-1/3}$.
- [ ] $E_0$ is fixed by the Coulomb barrier and does not change.
- [ ] $E_0$ falls, because faster particles tunnel less.
::: solution
From [[#eq-gamow-peak]], $E_0 \propto T^{2/3}$, so doubling $T$ multiplies it by $2^{2/3} = 1.587$. The ratio $E_0/kT \propto T^{-1/3}$ falls by $2^{-1/3} = 0.794$, and since $3E_0/kT$ is about 13.5 for the pp reaction in the Sun, the peak height $e^{-3E_0/kT}$ grows by about $e^{2.8} \approx 16$. This steep temperature dependence is why stellar cores are so well thermostatted: a slight heating greatly increases the reaction rate, the core expands and cools.
:::
:::

### The Sun's energy budget

Hans Bethe showed in 1939 how the Sun converts hydrogen to helium. In stars of the Sun's mass the main route is the **proton–proton chain**, whose principal branch (pp I) is

$$
\begin{aligned}
p + p &\to {}^2\mathrm{H} + e^+ + \nu_e \quad (\text{twice}), \\
{}^2\mathrm{H} + p &\to {}^3\mathrm{He} + \gamma \quad (\text{twice}), \\
{}^3\mathrm{He} + {}^3\mathrm{He} &\to {}^4\mathrm{He} + 2p .
\end{aligned}
$$

The net effect is $4p + 2e^- \to {}^4\mathrm{He} + 2\nu_e$, once the two positrons have annihilated with electrons. With atomic masses this is $4\,m({}^1\mathrm{H}) \to m({}^4\mathrm{He})$, and

$$
Q = \bigl[4(1.007825) - 4.002603\bigr](931.494)\,\mathrm{MeV} = 26.73\,\mathrm{MeV}.
$$

The two neutrinos carry away on average about $0.53\,\mathrm{MeV}$ in this branch, so about $26.2\,\mathrm{MeV}$ heats the Sun. The first step converts a proton into a neutron and is therefore a weak interaction. Its cross-section is so small that a proton at the Sun's centre waits about $10^{10}$ years on average before taking part, and that slowness is why the Sun lasts so long. In heavier stars the **CNO cycle**, in which carbon, nitrogen and oxygen act as catalysts, dominates; Bethe proposed it in the same 1939 paper.

::: example Neutrinos from the Sun {#ex-sun}
The Sun's luminosity is $L_\odot = 3.828\times10^{26}\,\mathrm{W}$ (IAU nominal value). Assuming all of it comes from the pp chain with $26.2\,\mathrm{MeV}$ deposited per helium nucleus, find the number of helium nuclei made per second, the rate at which hydrogen is consumed, and the flux of solar neutrinos at the Earth, $1.496\times10^{11}\,\mathrm{m}$ away.
::: solution
Each conversion deposits $26.2 \times 1.602\times10^{-13} = 4.20\times10^{-12}\,\mathrm{J}$, so the rate is

$$
\dot N_\mathrm{He} = \frac{3.828\times10^{26}}{4.20\times10^{-12}} = 9.1\times10^{37}\,\mathrm{s}^{-1}.
$$

Four hydrogen atoms, $4 \times 1.674\times10^{-27}\,\mathrm{kg}$, are used each time, so the Sun burns $6.1\times10^{11}\,\mathrm{kg}$ of hydrogen per second. Two neutrinos are emitted per helium nucleus, $1.82\times10^{38}\,\mathrm{s}^{-1}$ in all, spread over a sphere of radius $1\,\mathrm{AU}$:

$$
\Phi_\nu = \frac{1.82\times10^{38}}{4\pi(1.496\times10^{11})^2}\,\mathrm{m^{-2}\,s^{-1}} = 6.5\times10^{14}\,\mathrm{m^{-2}\,s^{-1}}.
$$

About $6.5\times10^{10}$ solar neutrinos cross every square centimetre of the Earth each second. Raymond Davis's chlorine experiment, from the late 1960s, detected only about a third of the expected flux of the high-energy neutrinos from a side branch; the "solar neutrino problem" was resolved by neutrino oscillation ([[particles/standard-model]]), confirmed by the Sudbury Neutrino Observatory in 2001–02.
:::
:::

Is that enough fuel? About $10\%$ of the Sun's mass, the hydrogen in its core, is burned on the main sequence, and $0.7\%$ of the burned mass is converted to energy. The lifetime is then

$$
t \approx \frac{0.1 \times 0.007 \times M_\odot c^2}{L_\odot} = \frac{0.1 \times 0.007 \times 1.99\times10^{30} \times 9.0\times10^{16}}{3.83\times10^{26}}\,\mathrm{s} \approx 3\times10^{17}\,\mathrm{s} \approx 10^{10}\,\mathrm{yr},
$$

consistent with the Sun's present age of $4.6\times10^9\,\mathrm{yr}$, and vastly longer than the $3\times10^7\,\mathrm{yr}$ that gravitational contraction alone could supply. The structure of the Sun and other stars is treated in [[gravitation/stars]].

### Controlled fusion and the Lawson criterion

On Earth the pressure of a stellar core is unavailable, so a fusion plasma must be much hotter, $kT \approx 10$ to $20\,\mathrm{keV}$ (more than $10^8\,\mathrm{K}$), and must be confined, by magnetic fields in a tokamak or by its own inertia in a laser-imploded pellet. A plasma loses energy on a characteristic **energy confinement time** $\tau_E$. John Lawson showed in 1955 (published 1957) that a net energy gain requires the product of the ion density $n$ and $\tau_E$ to exceed a threshold that depends on temperature. In its modern "triple-product" form for ignition of a D–T plasma, in which the alpha particles alone keep the plasma hot,

$$
n\,T\,\tau_E \gtrsim 3\times10^{21}\,\mathrm{keV\,s\,m^{-3}},
$$ {#eq-lawson}

with the optimum near $kT \approx 15\,\mathrm{keV}$. At that temperature, $n\tau_E \gtrsim 2\times10^{20}\,\mathrm{s\,m^{-3}}$. A tokamak achieves it with $n \approx 10^{20}\,\mathrm{m^{-3}}$ for a few seconds; an inertial-confinement pellet with $n \approx 10^{31}\,\mathrm{m^{-3}}$ for well under a nanosecond. On 5 December 2022 the National Ignition Facility in California produced $3.15\,\mathrm{MJ}$ of fusion energy from $2.05\,\mathrm{MJ}$ of laser light delivered to the target, the first laboratory fusion experiment to release more energy than it absorbed, though far less than the electrical energy the lasers consumed.

::: warning Q-value is not the energy you can use
The $17.59\,\mathrm{MeV}$ of D–T fusion is shared between the alpha particle ($3.5\,\mathrm{MeV}$) and the neutron ($14.1\,\mathrm{MeV}$), in the inverse ratio of their masses, by momentum conservation. Only the alpha heats a magnetically confined plasma; the neutron escapes. Similarly, about $10\,\mathrm{MeV}$ of the $200\,\mathrm{MeV}$ per fission leaves as antineutrinos, and $0.5\,\mathrm{MeV}$ of the Sun's $26.7\,\mathrm{MeV}$ per helium nucleus leaves as neutrinos. Always ask where each product deposits its energy before quoting an energy yield.
:::

::: history From transmutation to fission and fusion
Rutherford reported the transmutation of nitrogen in 1919, and Patrick Blackett photographed the reaction in a cloud chamber in 1925, showing that the alpha particle is absorbed. John Cockcroft and Ernest Walton split lithium with accelerated protons in 1932, the first reaction induced by artificially accelerated particles and an early check of $E = mc^2$. Chadwick's neutron (1932) gave physicists an uncharged projectile, and Fermi's group in Rome (1934) showed that slow neutrons are especially effective. Hahn and Strassmann identified barium from uranium in December 1938, and Meitner and Frisch explained it as fission in early 1939; Bohr and John Wheeler published the liquid-drop theory of fission the same year. Arthur Eddington had argued in 1920 that the Sun might be powered by turning hydrogen into helium; Bethe worked out the proton–proton chain (with Charles Critchfield) and the CNO cycle in 1938–39.
:::

## Where this leads {#leads}

The instruments that produce projectiles and detect reaction products are the subject of [[particles/accelerators]], where the threshold formula [[#eq-threshold]] reappears in the comparison of fixed-target machines and colliders. Cross-sections, resonances and widths are the basic language of particle physics, where the Breit–Wigner shape of the $Z$ boson measures the number of neutrino species ([[particles/standard-model]]). Stellar nucleosynthesis beyond helium, and the end states of stars, are in [[gravitation/stars]]. The Chemistry Atlas lesson [Nuclear chemistry](/learn/chemistry/lesson.php?c=general-chemistry-2&l=nuclear-chemistry) covers nuclear equations and applications from a chemist's point of view.

::: summary
- The Q-value of $X(a,b)Y$ is $[m_a + m_X - m_Y - m_b]c^2$, computed with atomic masses. Endothermic reactions have a threshold $K_\mathrm{th} = (M_f^2 - (m_a + m_X)^2)c^2/2m_X \approx -Q(1 + m_a/m_X)$.
- The cross-section $\sigma$ is the reaction rate per incident particle per target nucleus per unit area. $1\,\mathrm{b} = 10^{-28}\,\mathrm{m}^2$. A beam is attenuated as $e^{-n\sigma x}$.
- Charged particles face the Coulomb barrier $Z_1Z_2e^2/4\pi\varepsilon_0(R_1 + R_2)$; below it they react only by tunnelling. Neutrons face no barrier, and slow-neutron capture follows $\sigma \propto 1/v$.
- Compound-nucleus resonances have the Breit–Wigner shape, with full width $\Gamma = \hbar/\tau$.
- Fission of ${}^{235}\mathrm{U}$ releases about $200\,\mathrm{MeV}$, mostly as fragment kinetic energy. The liquid drop is stable against small deformations when $Z^2/A < 2a_S/a_C \approx 47$; slow-neutron fission of ${}^{235}\mathrm{U}$ works because the compound nucleus is formed above its barrier.
- Fusion rates in a plasma are set by the Gamow peak $E_0 = (E_G(kT)^2/4)^{1/3}$, a few times $kT$.
- The pp chain turns $4p$ into ${}^4\mathrm{He}$ with $Q = 26.73\,\mathrm{MeV}$; the Sun's luminosity requires $9\times10^{37}$ conversions per second and sends $6.5\times10^{14}$ neutrinos per $\mathrm{m}^2$ per second to the Earth.
- Controlled D–T fusion needs $kT \approx 10$–$20\,\mathrm{keV}$ and, for ignition, $nT\tau_E \gtrsim 3\times10^{21}\,\mathrm{keV\,s\,m^{-3}}$ (Lawson criterion).
:::

## Exercises {#exercises}

::: exercise The D–T reaction {level=1 check="17.59"}
Using atomic masses ${}^2\mathrm{H}$ $2.0141018$, ${}^3\mathrm{H}$ $3.0160493$, ${}^4\mathrm{He}$ $4.0026033$ and $m_n = 1.0086649\,\mathrm{u}$, find $Q$ for ${}^2\mathrm{H} + {}^3\mathrm{H} \to {}^4\mathrm{He} + n$, in MeV.
::: solution
$Q = (2.0141018 + 3.0160493 - 4.0026033 - 1.0086649)(931.494) = 0.0188829 \times 931.494 = 17.59\,\mathrm{MeV}$. The electrons balance: two on each side, since the neutron carries none and helium has two.
:::
:::

::: exercise Alphas on gold {level=1 check="25.6"}
Find the Coulomb barrier [[#eq-barrier]] for an alpha particle and a ${}^{197}\mathrm{Au}$ nucleus, in MeV, with $R_0 = 1.2\,\mathrm{fm}$.
::: solution
$R_1 + R_2 = 1.2(4^{1/3} + 197^{1/3}) = 1.2(1.587 + 5.819) = 8.887\,\mathrm{fm}$, and $V_C = 2 \times 79 \times 1.440/8.887 = 25.6\,\mathrm{MeV}$. Alpha particles from natural sources, at $4$ to $9\,\mathrm{MeV}$, never get close enough to a gold nucleus to feel the strong force, which is why Geiger and Marsden saw pure Rutherford scattering.
:::
:::

::: exercise The Sun loses mass {level=1 check="4.26e9"}
At what rate, in kilograms per second, does the Sun lose rest mass by radiating $L_\odot = 3.828\times10^{26}\,\mathrm{W}$? (Ignore the neutrinos and the solar wind.)
::: solution
$\dot m = L_\odot/c^2 = 3.828\times10^{26}/(2.998\times10^8)^2 = 4.26\times10^9\,\mathrm{kg/s}$, about four million tonnes per second. Over $4.6\times10^9\,\mathrm{yr}$ that is $6\times10^{26}\,\mathrm{kg}$, $0.03\%$ of the Sun's mass.
:::
:::

::: exercise A beam on a thin target {level=2 check="0.30"}
A $1.00\,\mu\mathrm{A}$ beam of protons strikes a thin target containing $2.0\times10^{22}$ target nuclei per square metre of its face. The products of one reaction are counted, with every one detected, at $3.74\times10^{6}$ per second. Find the cross-section in barns.
::: solution
The beam delivers $\dot N_a = 1.00\times10^{-6}\,\mathrm{C/s}/1.602\times10^{-19}\,\mathrm{C} = 6.24\times10^{12}$ protons per second. By [[#eq-sigma]],

$$
\sigma = \frac{3.74\times10^{6}}{6.24\times10^{12} \times 2.0\times10^{22}}\,\mathrm{m}^2 = 3.0\times10^{-29}\,\mathrm{m}^2 = 0.30\,\mathrm{b}.
$$

The target is thin in the required sense: $n_t\sigma = 2.0\times10^{22} \times 3.0\times10^{-29} = 6\times10^{-7}$, so only one proton in about two million reacts, and the nuclei do not shadow one another.
:::
:::

::: exercise Threshold for pion photoproduction {level=2 check="144.7"}
Find the minimum photon energy, in MeV, for $\gamma + p \to p + \pi^0$ on a proton at rest, using $m_pc^2 = 938.272\,\mathrm{MeV}$ and $m_{\pi^0}c^2 = 134.977\,\mathrm{MeV}$ (PDG 2024).
::: solution
Apply [[#thm-threshold]] with $m_a = 0$, $m_X = m_p$ and $M_f = m_p + m_\pi$:

$$
E_\mathrm{th} = \frac{(m_p + m_\pi)^2 - m_p^2}{2m_p}c^2 = \frac{m_\pi(m_\pi + 2m_p)}{2m_p}c^2 = \frac{134.977 \times 2011.521}{1876.544}\,\mathrm{MeV} = 144.7\,\mathrm{MeV}.
$$

That exceeds the pion rest energy by $10\,\mathrm{MeV}$, the kinetic energy of the centre of mass at threshold. The non-relativistic approximation $-Q(1 + m_a/m_X) = m_\pi c^2 = 135.0\,\mathrm{MeV}$ fails because $\lvert Q\rvert/m_Xc^2 = 0.14$ is not small.
:::
:::

::: exercise Solar neutrinos {level=2 check="6.4e14"}
Repeat the neutrino-flux calculation of [[#ex-sun]], but suppose that all of $Q = 26.73\,\mathrm{MeV}$ were deposited in the Sun per helium nucleus. What would the flux at the Earth be, in $\mathrm{m^{-2}\,s^{-1}}$, to two significant figures, and why does the answer hardly change?
::: solution
$\dot N_\mathrm{He} = 3.828\times10^{26}/(26.73 \times 1.602\times10^{-13}) = 8.94\times10^{37}\,\mathrm{s}^{-1}$, giving $1.79\times10^{38}$ neutrinos per second and a flux

$$
\Phi_\nu = \frac{1.79\times10^{38}}{4\pi(1.496\times10^{11})^2}\,\mathrm{m^{-2}\,s^{-1}} = 6.4\times10^{14}\,\mathrm{m^{-2}\,s^{-1}},
$$

against $6.5\times10^{14}$ in [[#ex-sun]]. The neutrinos carry only $2\%$ of the energy, so the assumption changes the answer by $2\%$. The flux is fixed by the luminosity divided by the energy per conversion, with two neutrinos per helium nucleus in every branch of the chain, and is insensitive to the details.
:::
:::

::: exercise The fissility of a liquid drop {level=3}
Starting from the two expansions in [[#prop-fissility]], show that the energy of a deformed drop is $E(\varepsilon) = E(0) + \tfrac15\varepsilon^2(2E_S^{(0)} - E_C^{(0)})$. Then evaluate $x = E_C^{(0)}/2E_S^{(0)}$ (the **fissility parameter**) for ${}^{238}\mathrm{U}$ with Krane's coefficients, using $Z(Z-1)$ in the Coulomb energy, and for a hypothetical nucleus with $Z = 114$, $A = 298$. Comment on what happens as $x \to 1$.
::: hint
$E_S^{(0)} = a_SA^{2/3}$ and $E_C^{(0)} = a_CZ(Z-1)A^{-1/3}$, so $x = a_CZ(Z-1)/(2a_SA)$.
:::
::: solution
Adding the expansions,

$$
E_S + E_C = E_S^{(0)} + E_C^{(0)} + \frac{2}{5}\varepsilon^2 E_S^{(0)} - \frac{1}{5}\varepsilon^2E_C^{(0)} = E(0) + \frac{\varepsilon^2}{5}\left(2E_S^{(0)} - E_C^{(0)}\right),
$$

since the other terms of the mass formula do not depend on shape at fixed volume. The curvature is positive if and only if $x < 1$.

For ${}^{238}\mathrm{U}$: $x = 0.72 \times 92 \times 91/(2 \times 16.8 \times 238) = 6027.8/7996.8 = 0.754$. For $Z = 114$, $A = 298$: $x = 0.72 \times 114 \times 113/(2 \times 16.8 \times 298) = 9275.0/10012.8 = 0.926$.

As $x \to 1$ the restoring curvature vanishes and the liquid-drop barrier shrinks to nothing; beyond $x = 1$ the drop is unstable and would fission instantly. Superheavy nuclei near $Z = 114$ exist at all, with half-lives of seconds, only because shell effects (not in the liquid drop) add a barrier of several MeV.
:::
:::

::: exercise The Gamow peak in the Sun {level=3}
(a) For the $p + p$ reaction, evaluate [[#eq-gamow-energy]] with $\mu = m_p/2$ and show that $E_G = 493\,\mathrm{keV}$. (b) At the Sun's central temperature $1.57\times10^7\,\mathrm{K}$, find $kT$ and $E_0$. (c) Show that the Gaussian approximation to the peak has full width at $1/e$ of $\Delta = 4\sqrt{E_0kT/3}$, and evaluate it.
::: hint
For (c), expand the exponent $g(E)$ of [[#prop-gamow-peak]] to second order about $E_0$ and show $g''(E_0) = -3/(2E_0kT)$.
:::
::: solution
(a) With $\mu c^2 = 938.272/2 = 469.136\,\mathrm{MeV}$ and $Z_1 = Z_2 = 1$, $E_G = 2 \times 469.136 \times (\pi/137.036)^2\,\mathrm{MeV} = 938.272 \times 5.2557\times10^{-4}\,\mathrm{MeV} = 0.4931\,\mathrm{MeV} = 493\,\mathrm{keV}$.

(b) $kT = 8.617\times10^{-5}\,\mathrm{eV/K} \times 1.57\times10^7\,\mathrm{K} = 1.353\,\mathrm{keV}$. Then $E_0 = (493.1 \times 1.353^2/4)^{1/3}\,\mathrm{keV} = (225.7)^{1/3}\,\mathrm{keV} = 6.09\,\mathrm{keV}$.

(c) $g'(E) = -1/kT + \tfrac12E_G^{1/2}E^{-3/2}$, so $g''(E) = -\tfrac34E_G^{1/2}E^{-5/2}$. At $E_0$, $E_G^{1/2} = 2E_0^{3/2}/kT$, so $g''(E_0) = -\tfrac34 \cdot 2E_0^{3/2}E_0^{-5/2}/kT = -3/(2E_0kT)$. Then $f \approx f(E_0)\exp[-\tfrac{3}{4E_0kT}(E - E_0)^2]$, which falls to $1/e$ of its peak at $\lvert E - E_0\rvert = \sqrt{4E_0kT/3}$, a full width of $\Delta = 2\sqrt{4E_0kT/3} = 4\sqrt{E_0kT/3}$. Numerically $\Delta = 4\sqrt{6.09 \times 1.353/3} = 4 \times 1.657 = 6.6\,\mathrm{keV}$. Reactions in the solar core happen in a window from about $3$ to $10\,\mathrm{keV}$, all far below the barrier.
:::
:::
