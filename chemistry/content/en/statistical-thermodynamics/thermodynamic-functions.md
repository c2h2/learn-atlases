The molar heat capacity at constant pressure of carbon dioxide at $298\ \mathrm{K}$ is $37.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (NIST-JANAF tables). Classical physics, which grants each molecule $\tfrac{1}{2}k_\mathrm{B}T$ of energy for every way in which it can store energy quadratically, predicts $62.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$; the "rigid molecule" picture of introductory chemistry predicts $29.1$. Neither is right, and the true value lies awkwardly between them. Explaining such numbers — and predicting them, to within the accuracy of calorimetry, from four vibrational wavenumbers read off an infrared spectrum — was one of the first triumphs of quantum statistical mechanics and is the main business of this lesson.

We now cash in the partition function of [[statistical-thermodynamics/partition-function]]. From $q$ and its temperature derivative we obtain the mean energy of a molecule, the internal energy and heat capacity of a gas, and the entropy, each as a sum of translational, rotational, vibrational and electronic contributions. We prove the classical equipartition theorem and see exactly when and why it fails, and we connect Boltzmann's $S = k_\mathrm{B}\ln W$ with the calorimetric entropy of [[thermodynamics/second-law]], including the curious case of crystals that keep some entropy at absolute zero. Throughout, the system is a collection of $N$ independent molecules; the general framework for interacting systems follows in [[statistical-thermodynamics/canonical-ensemble]].

## The internal energy

The total energy of $N$ molecules distributed according to the Boltzmann distribution is $E = \sum_i n_i\varepsilon_i = (N/q)\sum_i\varepsilon_ie^{-\beta\varepsilon_i}$. The sum in this expression is, up to sign, the derivative of $q$ with respect to $\beta$, which gives the central formula of the subject.

::: proposition Internal energy from the partition function {#prop-u}
For $N$ independent molecules with molecular partition function $q$,
$$
U - U(0) = N\langle\varepsilon\rangle = -N\left(\frac{\partial\ln q}{\partial\beta}\right)_{V} = Nk_\mathrm{B}T^{2}\left(\frac{\partial\ln q}{\partial T}\right)_{V} ,
$$ {#eq-u}
where $U(0)$ is the internal energy at $T = 0$ (all molecules in their ground states, the zero of the molecular energies) and $\langle\varepsilon\rangle$ is the mean energy of one molecule. The derivative is at constant volume because the energy levels depend on $V$ (the translational levels through the box size).
:::

::: proof
The mean molecular energy is the population-weighted average,
$$
\langle\varepsilon\rangle = \sum_i\varepsilon_i\frac{e^{-\beta\varepsilon_i}}{q} = -\frac{1}{q}\sum_i\frac{\partial}{\partial\beta}e^{-\beta\varepsilon_i} = -\frac{1}{q}\left(\frac{\partial q}{\partial\beta}\right)_{V} = -\left(\frac{\partial\ln q}{\partial\beta}\right)_{V} ,
$$
where differentiation inside the sum is allowed at fixed $V$ because the $\varepsilon_i$ do not depend on $\beta$. The energy of $N$ molecules, measured from their common ground state, is $N\langle\varepsilon\rangle$; adding the ground-state energy gives $U = U(0) + N\langle\varepsilon\rangle$. Finally, since $\beta = 1/k_\mathrm{B}T$, $\mathrm{d}\beta = -\mathrm{d}T/k_\mathrm{B}T^{2}$, so $-\partial/\partial\beta = k_\mathrm{B}T^{2}\,\partial/\partial T$.
:::

Because $\ln q$ is a sum over modes, so is $U - U(0)$. Each contribution follows from the corresponding partition function.

**Translation.** $q^\mathrm{T} = V/\Lambda^{3} \propto VT^{3/2}$, so $\ln q^\mathrm{T} = \tfrac{3}{2}\ln T + \text{const}$ and $U^\mathrm{T} = Nk_\mathrm{B}T^{2}\times\tfrac{3}{2}T^{-1} = \tfrac{3}{2}Nk_\mathrm{B}T$ — the kinetic-theory result, now derived rather than assumed.

**Rotation** (linear molecule, $T \gg \theta_\mathrm{R}$). $q^\mathrm{R} = T/\sigma\theta_\mathrm{R}$, so $U^\mathrm{R} = Nk_\mathrm{B}T$; for a nonlinear molecule $q^\mathrm{R} \propto T^{3/2}$ and $U^\mathrm{R} = \tfrac{3}{2}Nk_\mathrm{B}T$.

**Vibration.** From $q^\mathrm{V} = (1 - e^{-\beta hc\tilde\nu})^{-1}$, $\ln q^\mathrm{V} = -\ln(1 - e^{-\beta hc\tilde\nu})$ and
$$
U^\mathrm{V} = -N\frac{\partial\ln q^\mathrm{V}}{\partial\beta} = N\frac{hc\tilde\nu\,e^{-\beta hc\tilde\nu}}{1 - e^{-\beta hc\tilde\nu}} = \frac{Nhc\tilde\nu}{e^{\beta hc\tilde\nu} - 1} = Nk_\mathrm{B}\frac{\theta_\mathrm{V}}{e^{\theta_\mathrm{V}/T} - 1} .
$$ {#eq-uv}
At low temperature $U^\mathrm{V} \approx Nhc\tilde\nu\,e^{-\theta_\mathrm{V}/T}$, exponentially small: the oscillator is frozen. At high temperature $e^{\theta_\mathrm{V}/T} - 1 \approx \theta_\mathrm{V}/T$ and $U^\mathrm{V} \to Nk_\mathrm{B}T$.

**Electronic.** For a two-level system with degeneracies $g_0$, $g_1$ and gap $\varepsilon$, $q^\mathrm{E} = g_0 + g_1e^{-\beta\varepsilon}$ and $U^\mathrm{E} = N\varepsilon g_1e^{-\beta\varepsilon}/(g_0 + g_1e^{-\beta\varepsilon})$: the gap times the fraction of molecules excited.

::: example The vibrational energy of iodine {#ex-iodine-u}
Calculate the molar vibrational energy $U^\mathrm{V}_\mathrm{m}$ of $\mathrm{I_2}$ ($\tilde\nu = 214.5\ \mathrm{cm^{-1}}$) at $298.15\ \mathrm{K}$ and compare it with the classical value and with the zero-point energy.
::: solution
$\theta_\mathrm{V} = 1.438\,78\times214.5 = 308.6\ \mathrm{K}$, so $\theta_\mathrm{V}/T = 1.0351$ and $e^{1.0351} - 1 = 1.8155$. From [[#eq-uv]] per mole,
$$
U^\mathrm{V}_\mathrm{m} = R\,\frac{\theta_\mathrm{V}}{e^{\theta_\mathrm{V}/T} - 1} = 8.3145\times\frac{308.6}{1.8155}\ \mathrm{J\,mol^{-1}} = 1.413\ \mathrm{kJ\,mol^{-1}} .
$$
The classical value is $RT = 2.479\ \mathrm{kJ\,mol^{-1}}$, so the vibration holds $57\,\%$ of its classical share even for this very low-frequency mode. The molar zero-point energy, $\tfrac{1}{2}N_\mathrm{A}hc\tilde\nu = \tfrac{1}{2}R\theta_\mathrm{V} = 1.283\ \mathrm{kJ\,mol^{-1}}$, is not included in $U - U(0)$: it is part of $U(0)$, present even at $T = 0$, and it does not contribute to the heat capacity.
:::
:::

## Heat capacity

::: proposition Heat capacity at constant volume {#prop-cv}
$$
C_V = \left(\frac{\partial U}{\partial T}\right)_{V} = -k_\mathrm{B}\beta^{2}\left(\frac{\partial U}{\partial\beta}\right)_{V} .
$$
For a harmonic vibration of vibrational temperature $\theta_\mathrm{V}$,
$$
C^\mathrm{V}_{V,\mathrm{m}} = R\,f_\mathrm{E}\!\left(\frac{\theta_\mathrm{V}}{T}\right), \qquad f_\mathrm{E}(x) = \frac{x^{2}e^{x}}{(e^{x} - 1)^{2}},
$$ {#eq-einstein}
where $f_\mathrm{E}$, the **Einstein function**, rises from 0 at low temperature to 1 at high temperature. For a two-level system with degeneracies $g_0$, $g_1$ and gap $\varepsilon$,
$$
C_{V,\mathrm{m}} = R\left(\frac{\varepsilon}{k_\mathrm{B}T}\right)^{2}\frac{(g_1/g_0)\,e^{-\varepsilon/k_\mathrm{B}T}}{\left(1 + (g_1/g_0)\,e^{-\varepsilon/k_\mathrm{B}T}\right)^{2}} ,
$$ {#eq-schottky}
which vanishes at both low and high temperature and passes through a maximum, the **Schottky anomaly**.
:::

::: proof
The first statement is the definition with $\mathrm{d}\beta/\mathrm{d}T = -k_\mathrm{B}\beta^{2}$. For the vibration, differentiate [[#eq-uv]] (per mole) with respect to $\beta$, writing $\varepsilon = hc\tilde\nu$:
$$
\frac{\partial U^\mathrm{V}_\mathrm{m}}{\partial\beta} = -N_\mathrm{A}\frac{\varepsilon^{2}e^{\beta\varepsilon}}{(e^{\beta\varepsilon} - 1)^{2}} ,
\qquad\text{so}\qquad
C^\mathrm{V}_{V,\mathrm{m}} = N_\mathrm{A}k_\mathrm{B}\frac{(\beta\varepsilon)^{2}e^{\beta\varepsilon}}{(e^{\beta\varepsilon} - 1)^{2}} = R f_\mathrm{E}(\beta\varepsilon),
$$
and $\beta\varepsilon = \theta_\mathrm{V}/T$. For small $x$, $e^{x} - 1 \approx x(1 + x/2)$ and $f_\mathrm{E} \to 1$; for large $x$, $f_\mathrm{E} \approx x^{2}e^{-x} \to 0$. For the two-level system write $r = g_1/g_0$, so that $U_\mathrm{m} = N_\mathrm{A}\varepsilon\,re^{-\beta\varepsilon}/(1 + re^{-\beta\varepsilon}) = N_\mathrm{A}\varepsilon/(r^{-1}e^{\beta\varepsilon} + 1)$. Then
$$
\frac{\partial U_\mathrm{m}}{\partial\beta} = -N_\mathrm{A}\varepsilon^{2}\frac{r^{-1}e^{\beta\varepsilon}}{(r^{-1}e^{\beta\varepsilon} + 1)^{2}} = -N_\mathrm{A}\varepsilon^{2}\frac{re^{-\beta\varepsilon}}{(1 + re^{-\beta\varepsilon})^{2}} ,
$$
and multiplying by $-k_\mathrm{B}\beta^{2}$ gives [[#eq-schottky]].
:::

::: widget plot
f: (1/x)^2*exp(1/x)/(exp(1/x) - 1)^2; (1/x)^2*g*exp(-1/x)/(1 + g*exp(-1/x))^2
x: 0.02, 3
y: 0, 1.1
sliders: g=1:1:5:1
labels: \text{harmonic oscillator } C/Nk_\mathrm{B}; \text{two-level system } C/Nk_\mathrm{B}
hlines: 1
caption: Heat capacities per molecule, in units of $k_\mathrm{B}$, against the reduced temperature $x = k_\mathrm{B}T/\varepsilon$, where $\varepsilon$ is the vibrational quantum $hc\tilde\nu$ (first curve, the Einstein function [[#eq-einstein]]) or the gap of a two-level system with degeneracy ratio $g = g_1/g_0$ (second curve, [[#eq-schottky]]). The oscillator's heat capacity rises to the classical value 1 and stays there, because its ladder of levels never ends; the two-level system's rises and *falls* again, because once both levels are nearly equally populated, extra heat has nowhere to go. Increasing $g$ moves the Schottky peak to lower temperature and makes it taller.
:::

A heat capacity is large when a small change in temperature produces a large change in the populations, and that happens when $k_\mathrm{B}T$ is comparable with the energy gaps. This is the key to reading heat-capacity curves: the onset of a contribution reveals a gap. The **Schottky anomaly** of [[#eq-schottky]] is observed in paramagnetic salts (Zeeman-split levels at millikelvin to kelvin temperatures, the basis of adiabatic demagnetisation), in rare-earth compounds with crystal-field-split ground levels, and in molecules such as NO.

::: example The electronic heat capacity of NO {#ex-no-cv}
The $^{2}\Pi_{1/2}$ and $^{2}\Pi_{3/2}$ levels of NO are both doubly degenerate and are separated by $121.1\ \mathrm{cm^{-1}}$ ([[statistical-thermodynamics/partition-function]]). At what temperature is the electronic contribution to $C_{V,\mathrm{m}}$ largest, and what is its value? What is the contribution at $298\ \mathrm{K}$?
::: solution
Here $g_1/g_0 = 1$ and $\varepsilon/k_\mathrm{B} = 1.438\,78\times121.1 = 174.2\ \mathrm{K}$. With $y = \varepsilon/k_\mathrm{B}T$, [[#eq-schottky]] becomes $C/R = y^{2}e^{y}/(1 + e^{y})^{2}$. Setting its derivative with respect to $y$ to zero gives the transcendental equation $y\tanh(y/2) = 2$, whose root (by Newton's method, or numerically) is $y = 2.399$. Hence
$$
T_\text{max} = \frac{174.2\ \mathrm{K}}{2.399} = 72.6\ \mathrm{K}, \qquad
C_\text{max} = 0.439R = 3.65\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
At $298\ \mathrm{K}$, $y = 0.5844$ and $C/R = 0.3415\times1.794/(2.794)^{2} = 0.0785$, i.e. $0.65\ \mathrm{J\,K^{-1}\,mol^{-1}}$ — small, but it must be included in any accurate calculation of the heat capacity of NO, which therefore exceeds that of $\mathrm{N_2}$ or $\mathrm{O_2}$ at low temperatures by more than vibration can explain.
:::
:::

## The equipartition theorem

The high-temperature limits we have met — $\tfrac{3}{2}k_\mathrm{B}T$ for translation, $k_\mathrm{B}T$ for the rotation of a linear molecule, $k_\mathrm{B}T$ for a vibration — follow a pattern that classical physics had recognised long before quantum mechanics.

::: theorem The equipartition theorem {#thm-equipartition}
In a classical system at thermal equilibrium, every term in the energy that is quadratic in one coordinate or momentum, $\varepsilon = a\xi^{2}$ with $\xi$ ranging over $(-\infty, \infty)$, contributes $\tfrac{1}{2}k_\mathrm{B}T$ to the mean energy of each molecule and $\tfrac{1}{2}R$ to the molar heat capacity. It applies to a mode of motion when $k_\mathrm{B}T$ is much greater than the spacing of that mode's quantised levels.
:::

::: proof
Classically the states of the mode are labelled by the continuous variable $\xi$, and the Boltzmann average becomes an integral:
$$
\langle a\xi^{2}\rangle = \frac{\int_{-\infty}^{\infty}a\xi^{2}e^{-\beta a\xi^{2}}\,\mathrm{d}\xi}{\int_{-\infty}^{\infty}e^{-\beta a\xi^{2}}\,\mathrm{d}\xi} = -\frac{\partial}{\partial\beta}\ln\int_{-\infty}^{\infty}e^{-\beta a\xi^{2}}\,\mathrm{d}\xi = -\frac{\partial}{\partial\beta}\ln\left(\frac{\pi}{\beta a}\right)^{1/2} = \frac{1}{2\beta} = \tfrac{1}{2}k_\mathrm{B}T .
$$
The coefficient $a$ has cancelled, so the result is the same for every quadratic term, whatever the mass, force constant or moment of inertia. Other variables of the energy integrate out as constant factors in numerator and denominator, provided the energy is a *sum* of terms in separate variables. The integral replaces a sum over quantum states; this is legitimate only when many states lie within $k_\mathrm{B}T$, i.e. when $T$ greatly exceeds the characteristic temperature of the mode ($\theta_\mathrm{R}$ or $\theta_\mathrm{V}$).
:::

Counting quadratic terms: translation has three ($p_x^{2}/2m$, $p_y^{2}/2m$, $p_z^{2}/2m$); rotation of a linear molecule two (two perpendicular axes, each with $J^{2}/2I$), of a nonlinear molecule three; each vibration *two* — a kinetic and a potential term, $p^{2}/2\mu + \tfrac{1}{2}k_\mathrm{f}x^{2}$ — so a fully excited vibration contributes $k_\mathrm{B}T$, not $\tfrac{1}{2}k_\mathrm{B}T$. For a molecule of $N_\text{at}$ atoms with $3N_\text{at} - 5$ (linear) or $3N_\text{at} - 6$ (nonlinear) vibrations, the classical heat capacity is therefore
$$
C_{V,\mathrm{m}}^\text{classical} = \tfrac{3}{2}R + \begin{cases}R + (3N_\text{at} - 5)R & \text{linear}\\ \tfrac{3}{2}R + (3N_\text{at} - 6)R & \text{nonlinear.}\end{cases}
$$

::: warning Equipartition is a high-temperature result {#warn-equipartition}
It is tempting to count quadratic terms and declare $C_{V,\mathrm{m}} = \tfrac{7}{2}R$ for every diatomic gas. That is the *classical* value, reached only when $T \gg \theta_\mathrm{V}$ — above $10\,000\ \mathrm{K}$ for $\mathrm{N_2}$, where the molecule has long since dissociated. At room temperature the stretches of light diatomics are frozen and $C_{V,\mathrm{m}} \approx \tfrac{5}{2}R$; for $\mathrm{H_2}$ below about $80\ \mathrm{K}$ even the rotation freezes and $C_{V,\mathrm{m}} \to \tfrac{3}{2}R$. It was precisely this failure — the "missing" heat capacity of diatomic gases, which Maxwell in 1875 called the greatest difficulty facing the molecular theory — that classical physics could not explain. The equipartition theorem also requires the energy to be *quadratic*: an anharmonic vibration, a hindered internal rotation or a particle in a gravitational field ($\varepsilon = mgz$, linear in $z$) each contribute something different.
:::

::: widget plot
f: 2.5 + (t/x)^2*exp(t/x)/(exp(t/x) - 1)^2; 2.5; 3.5
x: 20, 6000
y: 1, 4
sliders: t=3393:300:5000:1
labels: C_{V,\mathrm{m}}/R; \text{rigid rotor } 5/2; \text{classical } 7/2
caption: The molar heat capacity $C_{V,\mathrm{m}}/R$ of a diatomic perfect gas against $T$ (in K), with rotation treated as classical ($T \gg \theta_\mathrm{R}$) and one harmonic vibration of vibrational temperature $\theta_\mathrm{V}$ (slider `t`, in K). The starting value is for $\mathrm{N_2}$ ($3393\ \mathrm{K}$); try $805\ \mathrm{K}$ for $\mathrm{Cl_2}$ and $309\ \mathrm{K}$ for $\mathrm{I_2}$. The vibrational contribution switches on around $T \approx 0.2\theta_\mathrm{V}$ and reaches $90\,\%$ of its classical value only at $T \approx 1.4\theta_\mathrm{V}$. (Below a few times $\theta_\mathrm{R}$ — off the left of the plot for all but $\mathrm{H_2}$ — the rotational contribution would also fall.)
:::

::: example The heat capacity of carbon dioxide {#ex-co2-cv}
Using the normal-mode wavenumbers of $\mathrm{CO_2}$ ($1388.2$, $667.4$ (×2) and $2349.2\ \mathrm{cm^{-1}}$), calculate $C_{V,\mathrm{m}}$ and $C_{p,\mathrm{m}}$ at $298.15\ \mathrm{K}$ and compare them with the classical prediction and with the tabulated value $C_{p,\mathrm{m}} = 37.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$.
::: solution
Translation and rotation (linear, $\theta_\mathrm{R} = 0.56\ \mathrm{K}$) are classical: $\tfrac{3}{2}R + R = \tfrac{5}{2}R$. For each vibration compute $x = c_2\tilde\nu/T$ and $f_\mathrm{E}(x)$:

| mode | $\tilde\nu/\mathrm{cm^{-1}}$ | $x$ | $f_\mathrm{E}(x)$ |
|---|---|---|---|
| symmetric stretch | 1388.2 | 6.699 | 0.0554 |
| bend (×2) | 667.4 | 3.221 | 0.4493 each |
| antisymmetric stretch | 2349.2 | 11.337 | 0.0015 |

The vibrational sum is $0.0554 + 2\times0.4493 + 0.0015 = 0.9556$, so
$$
C_{V,\mathrm{m}} = (2.5 + 0.9556)R = 3.456\times8.3145 = 28.7\ \mathrm{J\,K^{-1}\,mol^{-1}},
\qquad C_{p,\mathrm{m}} = C_{V,\mathrm{m}} + R = 37.0\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
This agrees with the tabulated $37.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$ to $0.2\,\%$. The classical value, $C_{V,\mathrm{m}} = \tfrac{5}{2}R + 4R = 6.5R = 54.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (so $C_{p,\mathrm{m}} = 62.4$), is wildly too high, and the rigid-molecule value $C_{p,\mathrm{m}} = \tfrac{7}{2}R = 29.1$ too low: the two bends are about half excited, the stretches hardly at all. The bending modes are also the ones that absorb Earth's thermal infrared radiation near $15\ \mu\mathrm{m}$ ([[environmental-chemistry/greenhouse-gases]]).
:::
:::

### Enthalpy and the thermal functions of thermochemical tables

For a perfect gas $pV = Nk_\mathrm{B}T$, so the enthalpy follows from the internal energy at once: $H - H(0) = U - U(0) + Nk_\mathrm{B}T$, and per mole $H_\mathrm{m} - H_\mathrm{m}(0) = U_\mathrm{m} - U_\mathrm{m}(0) + RT$. Thermochemical tables (JANAF, NIST) list precisely this "enthalpy function" $H^\circ(T) - H^\circ(0)$, computed from partition functions, because it is what converts a reaction energy at $T = 0$ into a reaction enthalpy at $T$ ([[statistical-thermodynamics/equilibrium-from-molecules]]) and what Kirchhoff's law integrates ([[thermodynamics/heat-capacity-adiabatic]]).

::: example The enthalpy function of nitrogen {#ex-n2-h}
Calculate $H^\circ_\mathrm{m}(298.15\ \mathrm{K}) - H^\circ_\mathrm{m}(0)$ for $\mathrm{N_2}$ ($\theta_\mathrm{R} = 2.875\ \mathrm{K}$, $\theta_\mathrm{V} = 3393\ \mathrm{K}$), and compare with the tabulated $8.670\ \mathrm{kJ\,mol^{-1}}$.
::: solution
Translation contributes $\tfrac{3}{2}RT$ and the $pV$ term $RT$: together $\tfrac{5}{2}RT = 6.197\ \mathrm{kJ\,mol^{-1}}$. Rotation contributes $RT$ to leading order; the next term of the high-temperature expansion, from $q^\mathrm{R} = (T/\theta_\mathrm{R} + \tfrac{1}{3} + \cdots)/\sigma$, lowers it by $\tfrac{1}{3}R\theta_\mathrm{R} = 8.0\ \mathrm{J\,mol^{-1}}$, giving $U^\mathrm{R}_\mathrm{m} = 2.479 - 0.008 = 2.471\ \mathrm{kJ\,mol^{-1}}$. Vibration contributes $R\theta_\mathrm{V}/(e^{\theta_\mathrm{V}/T} - 1) = 8.3145\times3393\times1.14\times10^{-5} = 0.32\ \mathrm{J\,mol^{-1}}$, utterly negligible. In total,
$$
H^\circ_\mathrm{m}(298.15\ \mathrm{K}) - H^\circ_\mathrm{m}(0) = 6.197 + 2.471 + 0.000 = 8.669\ \mathrm{kJ\,mol^{-1}},
$$
in agreement with the tabulated value to the last digit. The rigid-rotor value $\tfrac{7}{2}RT = 8.677\ \mathrm{kJ\,mol^{-1}}$ is already within $0.1\,\%$: for a diatomic gas at room temperature, $\tfrac{7}{2}RT$ is the whole story.
:::
:::

### Rotation at low temperature

Rotation is classical for almost every molecule at almost every temperature, because rotational temperatures are a few kelvin. The exceptions are the hydrogen molecules, with $\theta_\mathrm{R}$ between $43\ \mathrm{K}$ ($\mathrm{D_2}$) and $85\ \mathrm{K}$ ($\mathrm{H_2}$), and for them the full sum must be used. The heat capacity is most easily obtained from the *fluctuation form* of [[#prop-cv]]: since $U - U(0) = N\langle\varepsilon\rangle$, differentiating $\langle\varepsilon\rangle = \sum_ig_i\varepsilon_ie^{-\beta\varepsilon_i}/q$ with respect to $\beta$ gives
$$
C_V = Nk_\mathrm{B}\beta^{2}\left(\langle\varepsilon^{2}\rangle - \langle\varepsilon\rangle^{2}\right) ,
$$ {#eq-cv-fluct}
the variance of the molecular energy in units of $(k_\mathrm{B}T)^{2}$. (We shall meet the same relation for the energy of a whole system in [[statistical-thermodynamics/canonical-ensemble]].)

::: widget plot
f: (sum((2*j + 1)*(j*(j + 1)/x)^2*exp(-j*(j + 1)/x), j, 0, 30)/sum((2*j + 1)*exp(-j*(j + 1)/x), j, 0, 30)) - (sum((2*j + 1)*(j*(j + 1)/x)*exp(-j*(j + 1)/x), j, 0, 30)/sum((2*j + 1)*exp(-j*(j + 1)/x), j, 0, 30))^2; 1
x: 0.05, 4
y: 0, 1.2
labels: C^\mathrm{R}_{V,\mathrm{m}}/R; \text{classical value } 1
caption: The rotational heat capacity of a heteronuclear linear rotor, $C^\mathrm{R}_{V,\mathrm{m}}/R$, against $x = T/\theta_\mathrm{R}$, computed from [[#eq-cv-fluct]] with the exact sums over $J$. Rotation is frozen below $x \approx 0.3$, switches on steeply, *overshoots* the classical value $R$ (by about $10\,\%$, near $x = 0.81$) and then settles to $R$ from above. The overshoot is a small Schottky-like peak from the $J = 0 \rightarrow 1$ excitation. For every molecule except the hydrogens, $x > 10$ at all temperatures at which the substance is a gas, and the curve is flat at 1.
:::

::: example The rotational heat capacity of HD {#ex-hd-cv}
Hydrogen deuteride has $B = 45.655\ \mathrm{cm^{-1}}$ and, being heteronuclear, no nuclear-spin restrictions on its rotational levels. Calculate its rotational heat capacity at $30\ \mathrm{K}$ and at $53\ \mathrm{K}$.
::: solution
$\theta_\mathrm{R} = 1.438\,78\times45.655 = 65.69\ \mathrm{K}$. At $30\ \mathrm{K}$, $\theta_\mathrm{R}/T = 2.190$, and the Boltzmann factors $(2J+1)e^{-2.190J(J+1)}$ of the first levels are $1$, $3\times0.012\,53 = 0.0376$ and $5\times1.97\times10^{-6} = 9.8\times10^{-6}$. In units of $k_\mathrm{B}T$ the level energies are $0$, $4.380$ and $13.14$, so
$$
\langle\varepsilon\rangle/k_\mathrm{B}T = \frac{0.0376\times4.380 + 9.8\times10^{-6}\times13.14}{1.0376} = 0.1588, \qquad
\langle\varepsilon^{2}\rangle/(k_\mathrm{B}T)^{2} = \frac{0.0376\times19.18 + 9.8\times10^{-6}\times172.7}{1.0376} = 0.6967,
$$
and [[#eq-cv-fluct]] gives $C^\mathrm{R}_{V,\mathrm{m}}/R = 0.6967 - 0.1588^{2} = 0.671$, i.e. $5.6\ \mathrm{J\,K^{-1}\,mol^{-1}}$ — two thirds of the classical value, although only $3.6\,\%$ of the molecules are rotating. At $53\ \mathrm{K}$ ($x = 0.81$) the same calculation with more terms gives $C^\mathrm{R}_{V,\mathrm{m}}/R = 1.098$, the maximum of the curve in the figure: the gas momentarily has *more* rotational heat capacity than equipartition allows. For $\mathrm{H_2}$ itself the picture is complicated by ortho–para statistics ([[statistical-thermodynamics/partition-function]]), and it was the failure of every simple model to fit its heat capacity that led Dennison to the frozen ortho–para mixture.
:::
:::

## Entropy

The internal energy tells us how much energy the molecules have; the entropy tells us how many ways they have of holding it. Boltzmann's formula $S = k_\mathrm{B}\ln W$, applied to the dominant configuration of [[statistical-thermodynamics/boltzmann-distribution]], expresses the entropy through the partition function.

::: definition The statistical entropy {#def-boltzmann-entropy}
The **statistical entropy** of an isolated system is
$$
S = k_\mathrm{B}\ln W ,
$$
where $W$ is the weight of the most probable configuration (equivalently, for large $N$, the total number of microstates consistent with the macroscopic constraints: the two differ by a factor whose logarithm is negligible beside $\ln W$).
:::

Two properties show that this is the right definition. It is *additive*: for two independent systems $W = W_\mathrm{A}W_\mathrm{B}$ and $S = S_\mathrm{A} + S_\mathrm{B}$, as an extensive thermodynamic quantity must be. And it *increases* in spontaneous change: an isolated system left to itself moves to the configuration of greatest $W$, as the second law requires. What remains is to show that it is the same function as the thermodynamic entropy, $\mathrm{d}S = \mathrm{d}q_\text{rev}/T$ — which the next proposition implies, since it reproduces the thermodynamic relation $(\partial S/\partial U)_V = 1/T$.

::: proposition Entropy from the partition function (distinguishable molecules) {#prop-s}
For $N$ independent, distinguishable molecules (for example, molecules or atoms localised at the sites of a crystal),
$$
S = \frac{U - U(0)}{T} + Nk_\mathrm{B}\ln q .
$$ {#eq-s}
Consequently $(\partial S/\partial U)_{V,N} = 1/T$, in agreement with the thermodynamic definition of temperature.
:::

::: proof
From the proof of the Boltzmann distribution, with Stirling's approximation, $\ln W = N\ln N - \sum_i n_i\ln n_i = -\sum_i n_i\ln(n_i/N)$. For the Boltzmann populations, $\ln(n_i/N) = -\beta\varepsilon_i - \ln q$, so
$$
\ln W = \sum_i n_i(\beta\varepsilon_i + \ln q) = \beta\sum_i n_i\varepsilon_i + N\ln q = \beta\,(U - U(0)) + N\ln q .
$$
Multiplying by $k_\mathrm{B}$ gives [[#eq-s]], since $k_\mathrm{B}\beta = 1/T$. For the derivative, regard $S$ as a function of $\beta$ at fixed $V$ and $N$:
$$
\mathrm{d}S = k_\mathrm{B}\left[(U - U(0))\,\mathrm{d}\beta + \beta\,\mathrm{d}U + N\frac{\partial\ln q}{\partial\beta}\mathrm{d}\beta\right] = k_\mathrm{B}\beta\,\mathrm{d}U ,
$$
because $N\,\partial\ln q/\partial\beta = -(U - U(0))$ by [[#prop-u]]. Hence $(\partial S/\partial U)_{V,N} = k_\mathrm{B}\beta = 1/T$. A change of $U$ at constant volume is heat transferred reversibly, so $\mathrm{d}S = \mathrm{d}q_\text{rev}/T$: the statistical and thermodynamic entropies agree (up to an additive constant, which the third law sets to zero).
:::

For a *gas*, the molecules are not distinguishable, and the count of microstates must be divided by $N!$. The consequence, derived in [[statistical-thermodynamics/canonical-ensemble]], is that $Nk_\mathrm{B}\ln q$ is replaced by $Nk_\mathrm{B}\ln(q/N) + Nk_\mathrm{B}$. The correction belongs to the translational motion, which is what makes molecules of a gas exchangeable; the *internal* contributions — rotational, vibrational, electronic — are given by [[#eq-s]] as it stands, with $q$ the internal partition function.

::: proposition Rotational, vibrational and two-level entropies {#prop-s-modes}
Per mole, and with energies measured from the ground state,
$$
S^\mathrm{R}_\mathrm{m} = R\left[1 + \ln\frac{T}{\sigma\theta_\mathrm{R}}\right]\quad(\text{linear}, T \gg \theta_\mathrm{R}),
\qquad
S^\mathrm{V}_\mathrm{m} = R\left[\frac{x}{e^{x} - 1} - \ln(1 - e^{-x})\right],\quad x = \frac{\theta_\mathrm{V}}{T},
$$
and for a two-level system with $g_0 = g_1 = 1$, $S_\mathrm{m} = R\left[\ln(1 + e^{-y}) + y\,e^{-y}/(1 + e^{-y})\right]$ with $y = \varepsilon/k_\mathrm{B}T$, which rises from 0 to $R\ln 2$.
:::

::: proof
Each follows from [[#eq-s]] per mole, $S_\mathrm{m} = U_\mathrm{m}/T + R\ln q$. Rotation: $U^\mathrm{R}_\mathrm{m} = RT$ and $q^\mathrm{R} = T/\sigma\theta_\mathrm{R}$. Vibration: $U^\mathrm{V}_\mathrm{m}/T = R\,x/(e^{x} - 1)$ from [[#eq-uv]] and $\ln q^\mathrm{V} = -\ln(1 - e^{-x})$. Two-level: $U_\mathrm{m}/T = R\,y\,e^{-y}/(1 + e^{-y})$ and $\ln q = \ln(1 + e^{-y})$; as $y\to0$, the first term tends to $\ln 2$ and the second to 0.
:::

::: example Vibrational and rotational entropies {#ex-s-modes}
Calculate (a) the vibrational entropy of $\mathrm{I_2}$ and (b) the rotational entropy of $\mathrm{N_2}$, both per mole at $298.15\ \mathrm{K}$.
::: solution
(a) For $\mathrm{I_2}$, $x = 1.0351$ (as in [[#ex-iodine-u]]): $x/(e^{x} - 1) = 1.0351/1.8155 = 0.5702$ and $-\ln(1 - e^{-x}) = -\ln(0.6448) = 0.4388$. So
$$
S^\mathrm{V}_\mathrm{m} = 8.3145\times(0.5702 + 0.4388) = 8.39\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
(b) For $\mathrm{N_2}$, $T/\sigma\theta_\mathrm{R} = q^\mathrm{R} = 51.86$ ([[statistical-thermodynamics/partition-function]]), so
$$
S^\mathrm{R}_\mathrm{m} = 8.3145\times(1 + \ln 51.86) = 8.3145\times4.949 = 41.1\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
The vibration of $\mathrm{N_2}$ contributes only $1.2\times10^{-3}\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Adding the translational entropy ($150.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$ at $1\ \mathrm{bar}$, from the Sackur–Tetrode equation of the next lesson) gives $S^\circ_\mathrm{m}(\mathrm{N_2}) = 191.5\ \mathrm{J\,K^{-1}\,mol^{-1}}$, matching the tabulated $191.6$.
:::
:::

::: quiz
A crystal contains $N$ independent paramagnetic ions, each with two spin states split by a small magnetic field. As the temperature is raised from very low values to very high values, how does the magnetic contribution to the molar entropy change?
- [ ] It increases without limit, like the vibrational entropy.
- [x] It rises from 0 to $R\ln 2$ and stays there.
- [ ] It rises to a maximum and then falls back to 0, like the heat capacity.
- [ ] It is always $R\ln 2$, independent of temperature.
::: solution
By [[#prop-s-modes]], the two-level entropy rises from 0 (all ions in the lower state, $W = 1$) to $R\ln 2$ (both states equally likely, $W = 2^{N}$). It cannot exceed $R\ln 2$ because there are only two states per ion, and it does not fall, because entropy is a monotonic function of temperature ($C_V \ge 0$). The *heat capacity*, the slope $T\,\mathrm{d}S/\mathrm{d}T$, is what rises and falls — the Schottky anomaly. Adiabatic demagnetisation exploits exactly this entropy: magnetising at low $T$ removes the $R\ln 2$, and demagnetising adiabatically then cools the crystal.
:::
:::

### The third law and residual entropy

At $T = 0$ every molecule is in its ground state and $W = g_0^{N}$, so $S(0) = Nk_\mathrm{B}\ln g_0$; for a perfect crystal with a non-degenerate ground state, $S(0) = 0$ — the statistical content of the third law ([[thermodynamics/second-law]]). Comparison of entropies computed from spectroscopic data (*statistical* or *spectroscopic* entropies, as in [[#ex-s-modes]]) with entropies measured by integrating $C_p/T$ from near absolute zero (*calorimetric* entropies) is a stringent test. For most substances they agree within experimental error. For a few, the statistical entropy is larger, and the difference is the **residual entropy**: disorder frozen into the crystal at low temperature.

::: example The residual entropy of carbon monoxide {#ex-residual}
The CO molecule has a very small dipole moment, and in the crystal each molecule can lie as CO or OC with almost the same energy. If the orientations are frozen in randomly as the crystal is cooled, what residual molar entropy results? Compare with the observed discrepancy of about $4.6\ \mathrm{J\,K^{-1}\,mol^{-1}}$ between the statistical and calorimetric entropies (Clayton and Giauque, 1932), and with the residual entropy of ice.
::: solution
If each of the $N_\mathrm{A}$ molecules independently takes one of two orientations, $W = 2^{N_\mathrm{A}}$ and
$$
S_\mathrm{m}(0) = k_\mathrm{B}\ln 2^{N_\mathrm{A}} = R\ln 2 = 5.76\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
The observed $4.6\ \mathrm{J\,K^{-1}\,mol^{-1}}$ is somewhat smaller, implying that the disorder is not quite complete (some partial ordering occurs before the orientations freeze). Ice is subtler: each oxygen has two near and two far hydrogens, and Pauling (1935) showed that the "ice rules" leave about $(3/2)^{N_\mathrm{A}}$ arrangements per mole, so $S_\mathrm{m}(0) = R\ln\tfrac{3}{2} = 3.37\ \mathrm{J\,K^{-1}\,mol^{-1}}$, in excellent agreement with Giauque and Stout's measured $3.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (1936). These residual entropies are not failures of the third law: the crystals are not in internal equilibrium at low temperature, and a truly equilibrated, ordered crystal would have $S(0) = 0$.
:::
:::

::: history
The failure of equipartition for diatomic gases troubled Maxwell (1875) and Boltzmann, who suggested that some motions were somehow not "communicating" with the others. The resolution came from quantum theory: Albert Einstein's 1907 paper on the heat capacity of solids ([[statistical-thermodynamics/quantum-statistics]]) introduced the function $f_\mathrm{E}$ of [[#eq-einstein]] and showed that a quantised oscillator loses its heat capacity at low temperature. Arnold Eucken measured in 1912 the fall of the rotational heat capacity of hydrogen to $\tfrac{3}{2}R$ below $100\ \mathrm{K}$, which no classical model could explain. Walter Schottky analysed the heat capacity of systems with a few low-lying levels in 1922. The comparison of statistical and calorimetric entropies was made systematic by William Giauque and his students at Berkeley in the 1920s and 1930s; Giauque received the 1949 Nobel Prize in Chemistry for his work on the properties of substances at extremely low temperatures, including the development of adiabatic demagnetisation.
:::

## Where this leads

The formulas $U - U(0) = -N\,\partial\ln q/\partial\beta$ and $S = (U - U(0))/T + Nk_\mathrm{B}\ln q$ are the special cases, for independent molecules, of general relations derived for any system from the canonical partition function in [[statistical-thermodynamics/canonical-ensemble]]. There the entropy of a gas is completed with the indistinguishability correction (the Sackur–Tetrode equation), and the Helmholtz and Gibbs energies follow. The Gibbs energy expressed through $q$ is the starting point for equilibrium constants ([[statistical-thermodynamics/equilibrium-from-molecules]]). The Einstein function reappears, generalised to a spectrum of frequencies, in the Debye theory of solids ([[statistical-thermodynamics/quantum-statistics]]), and the heat capacities computed here are those used in Kirchhoff's law ([[thermodynamics/heat-capacity-adiabatic]]).

::: summary
- The internal energy of independent molecules is $U - U(0) = -N(\partial\ln q/\partial\beta)_V = Nk_\mathrm{B}T^{2}(\partial\ln q/\partial T)_V$; $U(0)$ includes the zero-point energy.
- Contributions per molecule: $\tfrac{3}{2}k_\mathrm{B}T$ (translation), $k_\mathrm{B}T$ (linear rotation), $hc\tilde\nu/(e^{\theta_\mathrm{V}/T} - 1)$ (harmonic vibration).
- $C_V = (\partial U/\partial T)_V$; a vibration contributes $Rf_\mathrm{E}(\theta_\mathrm{V}/T)$, the Einstein function; a two-level system gives a Schottky peak that rises and falls.
- Equipartition: each quadratic term contributes $\tfrac{1}{2}k_\mathrm{B}T$ — but only for modes with $T \gg \theta$; frozen modes contribute nothing, which explains $C_{p,\mathrm{m}}(\mathrm{CO_2}) = 37.1$ rather than $62.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$.
- $S = k_\mathrm{B}\ln W$; for distinguishable molecules $S = (U - U(0))/T + Nk_\mathrm{B}\ln q$, which satisfies $(\partial S/\partial U)_V = 1/T$.
- Internal entropies: $S^\mathrm{R}_\mathrm{m} = R[1 + \ln(T/\sigma\theta_\mathrm{R})]$, $S^\mathrm{V}_\mathrm{m} = R[x/(e^{x}-1) - \ln(1 - e^{-x})]$; a two-level system saturates at $R\ln 2$.
- $S(0) = Nk_\mathrm{B}\ln g_0$; residual entropies (CO, $\approx R\ln 2$; ice, $R\ln\tfrac{3}{2}$) record disorder frozen into crystals.
:::

## Exercises

::: exercise Translational energy of a mole of gas {level=1 check="3.72"}
Calculate the translational contribution to the molar internal energy of a perfect gas at $298.15\ \mathrm{K}$. (Enter $U^\mathrm{T}_\mathrm{m}$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$U^\mathrm{T}_\mathrm{m} = \tfrac{3}{2}RT = 1.5\times8.3145\times298.15\ \mathrm{J\,mol^{-1}} = 3718\ \mathrm{J\,mol^{-1}} = 3.72\ \mathrm{kJ\,mol^{-1}}$. It is independent of the mass of the molecule: a mole of hydrogen and a mole of xenon have the same translational energy at the same temperature.
:::
:::

::: exercise Classical heat capacities {level=1 check="3"}
Use the equipartition theorem to predict $C_{V,\mathrm{m}}/R$ for (a) argon, (b) rigid $\mathrm{H_2O}$ (vibrations frozen), (c) $\mathrm{H_2O}$ with all vibrations fully excited. (Enter the value for (b).)
::: solution
(a) Translation only: $\tfrac{3}{2}$. (b) Translation $\tfrac{3}{2}$ + nonlinear rotation $\tfrac{3}{2}$ = $3$. (c) Add $3N_\text{at} - 6 = 3$ vibrations, each contributing $1$: $C_{V,\mathrm{m}}/R = 6$. The real value at room temperature is close to (b), $3.04$, because the lowest vibration of water (the bend, $1595\ \mathrm{cm^{-1}}$, $\theta_\mathrm{V} = 2295\ \mathrm{K}$) is nearly frozen.
:::
:::

::: exercise Vibrational heat capacity of chlorine {level=1 check="6.73"}
Calculate the vibrational contribution to $C_{V,\mathrm{m}}$ of $\mathrm{Cl_2}$ ($\theta_\mathrm{V} = 805.3\ \mathrm{K}$) at $500\ \mathrm{K}$. (Enter it in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: solution
$x = 805.3/500 = 1.6106$; $e^{x} = 5.006$; $f_\mathrm{E} = x^{2}e^{x}/(e^{x} - 1)^{2} = 2.594\times5.006/(4.006)^{2} = 0.809$. So $C^\mathrm{V}_{V,\mathrm{m}} = 0.809\times8.3145 = 6.73\ \mathrm{J\,K^{-1}\,mol^{-1}}$, $81\,\%$ of the classical value $R$.
:::
:::

::: exercise Mean vibrational quantum number {level=2 check="0.551"}
For a harmonic oscillator the mean vibrational quantum number is $\langle v\rangle = (U - U(0))/Nhc\tilde\nu$. Show that $\langle v\rangle = 1/(e^{\theta_\mathrm{V}/T} - 1)$ and evaluate it for $\mathrm{I_2}$ at $298.15\ \mathrm{K}$. (Enter $\langle v\rangle$.)
::: solution
Dividing [[#eq-uv]] by $Nhc\tilde\nu$ gives $\langle v\rangle = 1/(e^{\theta_\mathrm{V}/T} - 1)$, the Bose–Einstein form we meet again in [[statistical-thermodynamics/quantum-statistics]] (vibrational quanta are bosons). For $\mathrm{I_2}$, $e^{1.0351} - 1 = 1.8155$ and $\langle v\rangle = 0.551$. Check from populations: $\sum_v v(1-x)x^{v} = x/(1-x) = 0.3552/0.6448 = 0.551$.
:::
:::

::: exercise A Schottky peak {level=2 check="2.40"}
A paramagnetic ion has a non-degenerate ground level and a non-degenerate excited level at energy $\varepsilon$. Show that the maximum of the heat capacity occurs where $y = \varepsilon/k_\mathrm{B}T$ satisfies $y\tanh(y/2) = 2$, and solve for $y$. (Enter $y$ to three significant figures.)
::: hint
Write $C/R = y^{2}e^{y}/(1+e^{y})^{2} = (y/2)^{2}/\cosh^{2}(y/2)$, then differentiate with respect to $y$.
:::
::: solution
Since $e^{y}/(1+e^{y})^{2} = 1/(e^{-y/2} + e^{y/2})^{2} = 1/(4\cosh^{2}(y/2))$, $C/R = u^{2}/\cosh^{2}u$ with $u = y/2$. Then $\mathrm{d}(C/R)/\mathrm{d}u = 2u/\cosh^{2}u - 2u^{2}\sinh u/\cosh^{3}u = (2u/\cosh^{2}u)(1 - u\tanh u)$, which vanishes when $u\tanh u = 1$, i.e. $(y/2)\tanh(y/2) = 1$, or $y\tanh(y/2) = 2$. Newton's method from $y = 2$: $f(y) = y\tanh(y/2) - 2$, $f(2) = -0.477$, $f'(2) = \tanh 1 + 1/\cosh^{2}1 = 1.181$, giving $y = 2.404$; one more iteration gives $y = 2.399$, i.e. $2.40$. The maximum heat capacity is $C/R = (1.200)^{2}/\cosh^{2}(1.200) = 0.439$.
:::
:::

::: exercise The heat capacity of steam {level=2 check="3.03"}
The fundamental wavenumbers of $\mathrm{H_2O}$ are $3657$, $1595$ and $3756\ \mathrm{cm^{-1}}$. Calculate $C_{V,\mathrm{m}}/R$ for water vapour at $298.15\ \mathrm{K}$ (treat it as a perfect gas). (Enter $C_{V,\mathrm{m}}/R$.)
::: solution
Translation and rotation: $\tfrac{3}{2} + \tfrac{3}{2} = 3$. Vibrations: $x = c_2\tilde\nu/T = 17.65$, $7.697$, $18.13$, giving $f_\mathrm{E} = 6.7\times10^{-6}$, $0.0269$, $4.4\times10^{-6}$. Total $C_{V,\mathrm{m}}/R = 3.027$, i.e. $3.03$; the tabulated $C_{p,\mathrm{m}} = 33.6\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for the ideal gas corresponds to $C_{V,\mathrm{m}}/R = 33.6/8.3145 - 1 = 3.04$, the small difference coming from anharmonicity and rotation–vibration coupling. Only the bend contributes, and only $3\,\%$ of its classical share.
:::
:::

::: exercise Entropy in terms of probabilities {level=3}
Show that for $N$ distinguishable molecules with Boltzmann populations $p_i = n_i/N$, the entropy [[#eq-s]] can be written as $S = -Nk_\mathrm{B}\sum_ip_i\ln p_i$. Use this form to show that the entropy per molecule of a system with $g$ equally populated states is $k_\mathrm{B}\ln g$, and that it is the maximum possible for $g$ states.
::: solution
$\ln p_i = -\beta\varepsilon_i - \ln q$, so $-\sum_ip_i\ln p_i = \beta\sum_ip_i\varepsilon_i + \ln q\sum_ip_i = \beta\langle\varepsilon\rangle + \ln q$. Multiplying by $Nk_\mathrm{B}$ gives $N\langle\varepsilon\rangle/T + Nk_\mathrm{B}\ln q = (U - U(0))/T + Nk_\mathrm{B}\ln q$, which is [[#eq-s]]. If $p_i = 1/g$ for $g$ states, $-\sum p_i\ln p_i = -g\times(1/g)\ln(1/g) = \ln g$. To show that this is the maximum, maximise $-\sum_ip_i\ln p_i$ subject to $\sum_ip_i = 1$ with a Lagrange multiplier $\lambda$: $-\ln p_i - 1 + \lambda = 0$ gives $p_i$ equal for all $i$, and the second derivative $-1/p_i < 0$ confirms a maximum. The form $-\sum p\ln p$ is Gibbs's entropy, and the same expression (with $k_\mathrm{B}$ replaced by $1/\ln 2$) is Shannon's information entropy.
:::
:::

::: exercise Statistical entropy of hydrogen chloride {level=3 check="186.7"}
The standard molar translational entropy of HCl ($M = 36.46\ \mathrm{g\,mol^{-1}}$) at $298.15\ \mathrm{K}$ and $1\ \mathrm{bar}$ is $153.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (from the Sackur–Tetrode equation of [[statistical-thermodynamics/canonical-ensemble]]). Add the rotational and vibrational contributions ($B = 10.59\ \mathrm{cm^{-1}}$, $\tilde\nu = 2990.9\ \mathrm{cm^{-1}}$), using the exact rotational sum $q^\mathrm{R} = 19.90$ and $U^\mathrm{R}_\mathrm{m} = RT$, and compare with the tabulated $S^\circ_\mathrm{m} = 186.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$. (Enter your $S^\circ_\mathrm{m}$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: solution
Rotation: $S^\mathrm{R}_\mathrm{m} = U^\mathrm{R}_\mathrm{m}/T + R\ln q^\mathrm{R} = R(1 + \ln 19.90) = 8.3145\times(1 + 2.9907) = 33.18\ \mathrm{J\,K^{-1}\,mol^{-1}}$. (Strictly, $U^\mathrm{R}_\mathrm{m}$ from the exact sum, $RT^{2}\,\mathrm{d}\ln q^\mathrm{R}/\mathrm{d}T$, is $0.983RT$ at this temperature, because $q^\mathrm{R} \approx T/\theta_\mathrm{R} + \tfrac{1}{3}$ grows slightly more slowly than $T$; using it gives $S^\mathrm{R}_\mathrm{m} = 33.04$.) Vibration: $x = 4303/298.15 = 14.43$, so $S^\mathrm{V}_\mathrm{m} \approx R(x + 1)e^{-x} = 8.3145\times15.43\times5.4\times10^{-7} = 7\times10^{-5}\ \mathrm{J\,K^{-1}\,mol^{-1}}$, negligible. Electronic: the ground state $^{1}\Sigma^{+}$ is non-degenerate. Total:
$$
S^\circ_\mathrm{m} = 153.7 + 33.0 + 0.0 = 186.7\ \mathrm{J\,K^{-1}\,mol^{-1}}
$$
with the exact rotational energy (or $186.9$ with $U^\mathrm{R}_\mathrm{m} = RT$) — within $0.1\,\%$ of the tabulated $186.9$. The small residual comes from the non-rigid rotor and isotopic ($\mathrm{H^{37}Cl}$) contributions.
:::
:::
