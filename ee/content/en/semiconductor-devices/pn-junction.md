Join a piece of p-type silicon to a piece of n-type silicon — in practice, dope one region of a single crystal with acceptors and the neighbouring region with donors — and something remarkable happens: the structure conducts current freely in one direction and hardly at all in the other. Apply $0.6\,\mathrm V$ one way and a milliampere flows; apply $10\,\mathrm V$ the other way and the current is a few picoamperes. That is a rectifier, the device that turns AC into DC in every power supply. But the pn junction is much more than a rectifier. It is the light-emitting element of an LED, the light-detecting element of a camera pixel and a solar cell, a voltage-controlled capacitor in a radio tuner, a voltage reference when it breaks down, and the building block of the bipolar transistor and of the source and drain of every MOSFET.

This chapter develops the theory of the **abrupt pn junction** from the tools of the first three chapters. We first find the junction in equilibrium: why a **depletion region** empty of mobile carriers forms at the boundary, and why a **built-in potential** appears across it. The **depletion approximation** then gives the field, potential and width of that region by straightforward integration of Poisson's equation. Under bias, we derive the **law of the junction** and solve the minority-carrier diffusion equation on each side to obtain Shockley's **ideal diode equation**. We finish with the capacitances of the junction and with **breakdown** at large reverse voltage. Departures from the ideal equation in real diodes are the subject of [[semiconductor-devices/diodes-photonic-devices]]; the diode as a circuit element is used in [[electronics-1/diode-circuits]].

## The junction in equilibrium

Imagine for a moment that the two halves could be brought together suddenly. The p side is full of holes ($p \approx N_A$) and the n side of electrons ($n \approx N_D$). Holes diffuse from p to n, electrons from n to p, and near the boundary they recombine. Each hole that leaves the p side uncovers a fixed, negatively charged acceptor ion; each electron that leaves the n side uncovers a positive donor ion. A layer of negative charge forms on the p side and of positive charge on the n side, and the field between them points from n to p — exactly the direction that pushes holes back to the p side and electrons back to the n side. Diffusion continues until the drift caused by this field exactly balances it, for each carrier separately. The result is a **space-charge region** or **depletion region**, nearly empty of mobile carriers, with a potential step across it.

The equilibrium band diagram follows from one rule from [[semiconductor-devices/carrier-statistics]]: **the Fermi level is flat in equilibrium**. Far from the junction on the p side, $E_F$ lies $kT\ln(N_A/n_i)$ below $E_i$; far on the n side, $kT\ln(N_D/n_i)$ above. To keep $E_F$ flat, the bands must bend down from the p side to the n side by the sum of these two amounts.

::: theorem Built-in potential {#thm-vbi}
The electrostatic potential difference between the neutral n and p regions of a non-degenerate pn junction in equilibrium is

$$
V_{bi} = \frac{kT}{q}\ln\frac{N_AN_D}{n_i^2}.
$$ {#eq-vbi}

The n side is at the higher potential, and the bands on the n side are lower by $qV_{bi}$.
:::

::: proof
In the neutral p region, $p = N_A = n_ie^{(E_i - E_F)/kT}$, so $E_i^{(p)} - E_F = kT\ln(N_A/n_i)$. In the neutral n region, $E_F - E_i^{(n)} = kT\ln(N_D/n_i)$. The Fermi level is the same on both sides, so

$$
qV_{bi} = E_i^{(p)} - E_i^{(n)} = kT\ln\frac{N_A}{n_i} + kT\ln\frac{N_D}{n_i} = kT\ln\frac{N_AN_D}{n_i^2}.
$$

The electron potential energy is lower on the n side, so the electrostatic potential is higher there.
:::

Because $N_AN_D/n_i^2$ is a huge number whose logarithm changes slowly, $V_{bi}$ for silicon lies between about $0.6$ and $1.0\,\mathrm V$ for all practical dopings, always less than $E_g/q = 1.12\,\mathrm V$ (when both sides are non-degenerate).

::: warning The built-in voltage cannot be measured with a voltmeter
A voltmeter connected across an unbiased diode reads zero. The built-in potential is real — it is the step in electrostatic potential inside the crystal — but the metal contacts at the two ends have their own contact potentials, which exactly cancel it around the loop. If they did not, an unbiased diode would deliver power indefinitely, violating the second law of thermodynamics. The built-in potential shows up in measurements only indirectly, for example through the junction capacitance or the open-circuit voltage of an illuminated junction.
:::

## The depletion approximation

To find the width of the depletion region and the field inside it we must solve Poisson's equation,

$$
\frac{\mathrm d^2\psi}{\mathrm dx^2} = -\frac{\mathrm d\mathcal E}{\mathrm dx} = -\frac{\rho}{\varepsilon_s}, \qquad \rho = q(p - n + N_D - N_A),
$$ {#eq-poisson}

where $\varepsilon_s = 11.7\varepsilon_0 = 1.036\times10^{-12}\,\mathrm{F/cm}$ is the permittivity of silicon. The difficulty is that $n$ and $p$ themselves depend exponentially on $\psi$. The depletion approximation cuts through it.

::: definition Depletion approximation {#def-depletion}
For an abrupt junction at $x = 0$ with $N_A$ on the p side ($x < 0$) and $N_D$ on the n side ($x > 0$), assume that (i) in the region $-x_p < x < x_n$ the mobile carriers are negligible compared with the dopant ions, so $\rho = -qN_A$ for $-x_p < x < 0$ and $\rho = +qN_D$ for $0 < x < x_n$; and (ii) outside it the material is neutral, $\rho = 0$ and $\mathcal E = 0$. The total width is $W = x_n + x_p$.
:::

The approximation is good because the carrier concentrations fall exponentially with potential: a potential change of only $0.1\,\mathrm V$ (about $4kT/q$) reduces the majority concentration by a factor of $50$. The transition between full depletion and neutrality therefore takes place over a few **Debye lengths**, $L_D = \sqrt{\varepsilon_skT/(q^2N)}$, which is $41\,\mathrm{nm}$ at $N = 10^{16}\,\mathrm{cm^{-3}}$, compared with depletion widths of hundreds of nanometres.

::: theorem Electrostatics of the abrupt junction {#thm-depletion}
Under the depletion approximation, with an applied voltage $V_A$ (positive for **forward bias**, p side positive), the total potential across the depletion region is $V_{bi} - V_A$ and

$$
N_Ax_p = N_Dx_n,
$$ {#eq-charge-balance}

$$
W = x_n + x_p = \sqrt{\frac{2\varepsilon_s(V_{bi} - V_A)}{q}\left(\frac{1}{N_A} + \frac{1}{N_D}\right)},
$$ {#eq-w}

$$
x_n = W\frac{N_A}{N_A + N_D}, \qquad x_p = W\frac{N_D}{N_A + N_D}, \qquad \abs{\mathcal E_{\max}} = \frac{qN_Dx_n}{\varepsilon_s} = \frac{2(V_{bi} - V_A)}{W}.
$$ {#eq-emax}

The field is triangular, peaking at the metallurgical junction, and the potential is made of two parabolic arcs.
:::

::: proof
On the p side of the depletion region, $\mathrm d\mathcal E/\mathrm dx = -qN_A/\varepsilon_s$ with $\mathcal E(-x_p) = 0$, so $\mathcal E = -\frac{qN_A}{\varepsilon_s}(x + x_p)$. On the n side, $\mathrm d\mathcal E/\mathrm dx = qN_D/\varepsilon_s$ with $\mathcal E(x_n) = 0$, so $\mathcal E = -\frac{qN_D}{\varepsilon_s}(x_n - x)$. (The field is negative, i.e. it points from n to p.) No surface charge sits at $x = 0$, so $\mathcal E$ is continuous there: $N_Ax_p = N_Dx_n$, which is charge neutrality of the depletion region as a whole. The potential difference is minus the integral of the field, which is the area of the triangle:

$$
V_{bi} - V_A = \tfrac12\abs{\mathcal E_{\max}}W = \frac{q}{2\varepsilon_s}\left(N_Ax_p^2 + N_Dx_n^2\right).
$$

Substituting $x_n = WN_A/(N_A + N_D)$ and $x_p = WN_D/(N_A + N_D)$, which follow from [[#eq-charge-balance]], gives $N_Ax_p^2 + N_Dx_n^2 = W^2N_AN_D/(N_A + N_D)$, and solving for $W$ gives [[#eq-w]]. Why is the voltage across the depletion region $V_{bi} - V_A$? The neutral regions carry only small currents, so almost no voltage drops across them, and the applied voltage appears across the depletion region, reducing the step when the p side is made positive.
:::

Three facts follow at once and should be memorised. **The depletion region extends mostly into the lightly doped side**: by [[#eq-charge-balance]] the widths are in inverse ratio to the dopings. In a **one-sided** junction such as a $\mathrm{p^+n}$ junction ($N_A \gg N_D$), $W \approx x_n \approx \sqrt{2\varepsilon_s(V_{bi} - V_A)/(qN_D)}$, set entirely by the light side. **Reverse bias widens the region** as $\sqrt{V_{bi} - V_A}$, and forward bias narrows it. And **the peak field grows** as $\sqrt{V_{bi} - V_A}$, which leads eventually to breakdown.

::: example An abrupt junction in equilibrium and under reverse bias {#ex-junction}
A silicon junction has $N_A = 10^{17}\,\mathrm{cm^{-3}}$ and $N_D = 10^{16}\,\mathrm{cm^{-3}}$. At $300\,\mathrm K$, find $V_{bi}$, and $W$, $x_n$, $x_p$, $\abs{\mathcal E_{\max}}$ at zero bias and at $V_A = -5\,\mathrm V$.
::: solution
By [[#eq-vbi]],

$$
V_{bi} = 0.02585\ln\frac{10^{17}\times10^{16}}{10^{20}} = 0.02585\ln(10^{13}) = 0.774\,\mathrm V.
$$

With $2\varepsilon_s/q = 2(1.036\times10^{-12})/(1.602\times10^{-19}) = 1.293\times10^{7}\,\mathrm{V^{-1}cm^{-1}}$ and $1/N_A + 1/N_D = 1.1\times10^{-16}\,\mathrm{cm^3}$,

$$
W(0) = \sqrt{1.293\times10^{7}\times0.774\times1.1\times10^{-16}}\,\mathrm{cm} = 3.32\times10^{-5}\,\mathrm{cm} = 0.332\,\mathrm{\mu m}.
$$

Then $x_n = W\times\frac{10}{11} = 0.302\,\mathrm{\mu m}$, $x_p = W/11 = 0.030\,\mathrm{\mu m}$, and $\abs{\mathcal E_{\max}} = 2V_{bi}/W = 2(0.774)/(3.32\times10^{-5}) = 4.66\times10^{4}\,\mathrm{V/cm}$.

At $V_A = -5\,\mathrm V$ the potential across the region is $5.774\,\mathrm V$, so every length scales by $\sqrt{5.774/0.774} = 2.73$: $W = 0.906\,\mathrm{\mu m}$, $x_n = 0.824\,\mathrm{\mu m}$, $x_p = 0.082\,\mathrm{\mu m}$, and $\abs{\mathcal E_{\max}} = 2(5.774)/(0.906\times10^{-4}) = 1.27\times10^{5}\,\mathrm{V/cm}$. Nine-tenths of the depletion region lies in the lightly doped n side.
:::
:::

::: widget plot
f: if(x < 0, max(0, (10^A/6.466e6)*(x*1e-4 + sqrt(1.293e7*(0.02585*ln(10^(A+D)/1e20) - V)*(10^(-A) + 10^(-D)))/(1 + 10^(A-D)))), max(0, (10^D/6.466e6)*(sqrt(1.293e7*(0.02585*ln(10^(A+D)/1e20) - V)*(10^(-A) + 10^(-D)))/(1 + 10^(D-A)) - x*1e-4)))/1e5; (10^A/1.293e7)*max(0, x*1e-4 + sqrt(1.293e7*(0.02585*ln(10^(A+D)/1e20) - V)*(10^(-A) + 10^(-D)))/(1 + 10^(A-D)))^2*if(x < 0, 1, 0) + if(x < 0, 0, 0.02585*ln(10^(A+D)/1e20) - V - (10^D/1.293e7)*max(0, sqrt(1.293e7*(0.02585*ln(10^(A+D)/1e20) - V)*(10^(-A) + 10^(-D)))/(1 + 10^(D-A)) - x*1e-4)^2)
x: -1.5, 1.5
y: 0, 6
sliders: A=17:15:19:0.1; D=16:15:19:0.1; V=0:-5:0.6:0.05
labels: \lvert\mathcal E\rvert\ (10^5\,\mathrm{V/cm}); \psi\ (\mathrm V)
caption: Depletion-approximation field magnitude (in units of $10^5\,\mathrm{V/cm}$) and electrostatic potential (in volts, zero in the neutral p region) against position in micrometres, for $N_A = 10^{A}$ and $N_D = 10^{D}\,\mathrm{cm^{-3}}$ and applied voltage $V$. The junction is at $x = 0$, p side on the left. Start with $A = 17$, $D = 16$: the depletion region reaches ten times further into the n side. Make $V$ negative: the region widens and the peak field rises, both as $\sqrt{V_{bi} - V}$. Set $A = D$: the picture becomes symmetric.
:::

## Current under bias

Under bias the junction is no longer in equilibrium, and the balance between drift and diffusion is upset. Forward bias lowers the barrier from $V_{bi}$ to $V_{bi} - V_A$: the diffusion of majority carriers across the junction, which depends exponentially on the barrier height, increases enormously while drift hardly changes, and a large current flows. Reverse bias raises the barrier: majority-carrier diffusion is shut off and only the tiny drift current of minority carriers that wander into the depletion region remains. That asymmetry is the rectifier. To make it quantitative we need a boundary condition for the minority carriers at the edges of the depletion region.

::: theorem Law of the junction {#thm-law-junction}
Under low-level injection, if the quasi-Fermi levels are flat across the depletion region, the minority-carrier concentrations at its edges are

$$
p_n(x_n) = p_{n0}\,e^{V_A/V_T}, \qquad n_p(-x_p) = n_{p0}\,e^{V_A/V_T},
$$ {#eq-law-junction}

where $p_{n0} = n_i^2/N_D$ and $n_{p0} = n_i^2/N_A$ are the equilibrium minority concentrations and $V_T = kT/q$. Equivalently, $np = n_i^2e^{V_A/V_T}$ throughout the depletion region.
:::

::: proof
Inside the depletion region the drift and diffusion components of each current are individually enormous — of order $qD n_i\cdot$(something huge)$/W$ — and nearly cancel; the net current is a tiny difference between them. By [[semiconductor-devices/carrier-transport#eq-j-quasi]], $J_p = \mu_pp\,\mathrm dF_p/\mathrm dx$, so a finite current through a region with large $p$ needs only a negligible slope of $F_p$; the same holds for $F_n$. We therefore take both quasi-Fermi levels as constant across the depletion region. At the far ends, in the neutral regions, $F_p$ coincides with the p-side Fermi level and $F_n$ with the n-side one, and the applied voltage separates them: $F_n - F_p = qV_A$. Then by [[semiconductor-devices/carrier-transport#eq-quasi-fermi]], $np = n_i^2e^{(F_n - F_p)/kT} = n_i^2e^{V_A/V_T}$ everywhere in the depletion region. At $x = x_n$, under low-level injection $n = N_D$, so $p_n(x_n) = (n_i^2/N_D)e^{V_A/V_T}$; similarly at $-x_p$.
:::

Forward bias of $0.6\,\mathrm V$ multiplies the minority concentration at the edge by $e^{0.6/0.02585} = 1.2\times10^{10}$. Reverse bias of more than a few $V_T$ drives it essentially to zero.

### The ideal diode equation

::: theorem Ideal diode equation (Shockley) {#thm-diode}
Assume (i) an abrupt junction with uniformly doped neutral regions much longer than the diffusion lengths, (ii) the depletion approximation, (iii) low-level injection, and (iv) no generation or recombination inside the depletion region. Then the current through a junction of area $A$ is

$$
I = I_0\left(e^{V_A/V_T} - 1\right), \qquad I_0 = qAn_i^2\left(\frac{D_p}{N_DL_p} + \frac{D_n}{N_AL_n}\right),
$$ {#eq-diode}

where $L_p = \sqrt{D_p\tau_p}$ and $L_n = \sqrt{D_n\tau_n}$ are the minority-carrier diffusion lengths in the n and p regions. $I_0$ is the **saturation current**.
:::

::: proof
In the neutral n region ($x > x_n$) the excess holes obey the steady-state minority-carrier diffusion equation [[semiconductor-devices/carrier-transport#cor-mcde]] with $G_L = 0$. With $x' = x - x_n$ and $\Delta p \to 0$ deep in the long region, $\Delta p(x') = \Delta p(0)e^{-x'/L_p}$, and from [[#eq-law-junction]], $\Delta p(0) = p_{n0}(e^{V_A/V_T} - 1)$. The hole current at the edge is pure diffusion:

$$
J_p(x_n) = -qD_p\frac{\mathrm d\Delta p}{\mathrm dx'}\Big|_0 = \frac{qD_p}{L_p}p_{n0}\left(e^{V_A/V_T} - 1\right).
$$

By the same argument on the p side, the electron current at $-x_p$ is $J_n(-x_p) = \frac{qD_n}{L_n}n_{p0}(e^{V_A/V_T} - 1)$, flowing in the $+x$ direction as well. With no recombination in the depletion region, $J_n$ and $J_p$ are each constant across it, so at any plane in the depletion region the total current density is $J = J_n(-x_p) + J_p(x_n)$. The total current is the same at every plane in steady state, so this is the diode current. Multiplying by $A$ and inserting $p_{n0} = n_i^2/N_D$ and $n_{p0} = n_i^2/N_A$ gives [[#eq-diode]].
:::

Every factor in $I_0$ has a meaning. The $n_i^2$ makes it extremely sensitive to the band gap and temperature. The dopings in the denominators show that the current is carried mostly by injection **into the lightly doped side**: in a $\mathrm{p^+n}$ diode, holes injected into the n region carry nearly all the current. Deep in the neutral regions the current is carried by majority carriers drifting in a small field; between, the minority-carrier diffusion current converts gradually into majority-carrier current as the minority carriers recombine.

::: remark Short diodes
In many modern diodes the neutral region is much shorter than the diffusion length, ending at an ohmic contact at distance $W_n$ from the depletion edge where $\Delta p = 0$. The solution is then linear rather than exponential (as the last figure of [[semiconductor-devices/carrier-transport]] showed), and $L_p$ in [[#eq-diode]] is replaced by $W_n$. The current is larger, and the stored charge much smaller, which makes short diodes faster.
:::

::: example Saturation current and forward voltage {#ex-diode}
The junction of [[#ex-junction]] ($N_A = 10^{17}$, $N_D = 10^{16}\,\mathrm{cm^{-3}}$) has area $1\,\mathrm{mm^2}$ and minority lifetimes $\tau_n = \tau_p = 1\,\mathrm{\mu s}$; both neutral regions are long. Find $I_0$, the fraction of current carried by holes, the voltage at which $I = 1\,\mathrm{mA}$, and check low-level injection there.
::: solution
The minority carriers are electrons in the p region ($10^{17}$, $\mu_n = 801\,\mathrm{cm^2/(V\,s)}$) and holes in the n region ($10^{16}$, $\mu_p = 406$). So $D_n = 0.02585\times801.3 = 20.7\,\mathrm{cm^2/s}$, $D_p = 10.5\,\mathrm{cm^2/s}$, $L_n = \sqrt{20.7\times10^{-6}} = 45.5\,\mathrm{\mu m}$, $L_p = 32.4\,\mathrm{\mu m}$. The two terms:

$$
\frac{qn_i^2D_p}{N_DL_p} = \frac{(1.602\times10^{-19})(10^{20})(10.5)}{(10^{16})(3.24\times10^{-3})} = 5.19\times10^{-12}\,\mathrm{A/cm^2}, \qquad \frac{qn_i^2D_n}{N_AL_n} = 0.73\times10^{-12}\,\mathrm{A/cm^2}.
$$

With $A = 10^{-2}\,\mathrm{cm^2}$, $I_0 = 10^{-2}(5.92\times10^{-12}) = 5.9\times10^{-14}\,\mathrm A$, and holes carry $5.19/5.92 = 88\,\%$ of the current. For $I = 1\,\mathrm{mA}$,

$$
V_A = V_T\ln\left(\frac{I}{I_0} + 1\right) = 0.02585\ln(1.69\times10^{10}) = 0.609\,\mathrm V.
$$

At this bias $p_n(x_n) = 10^{4}e^{0.609/0.02585} = 1.7\times10^{14}\,\mathrm{cm^{-3}}$, less than $2\,\%$ of $N_D$: low-level injection holds. (A diode of $0.01\,\mathrm{mm^2}$ would need $0.73\,\mathrm V$ for the same current, and there $p_n(x_n)$ would be about $60\,\%$ of $N_D$ — high injection, outside the ideal model.)
:::
:::

::: widget plot
f: log10(abs(1e-14*(T/300)^3*exp(-12996*(1/T - 1/300))*(exp(x/(8.617e-5*T)) - 1))); log10(1e-3)
x: -0.3, 0.8
y: -18, 0
sliders: T=300:250:400:5
labels: \log_{10}\lvert I\rvert\ (\mathrm A); 1\,\mathrm{mA}
caption: The ideal diode characteristic on a logarithmic scale, $\log_{10}\lvert I\rvert$ against $V_A$ in volts, for $I_0 = 10^{-14}\,\mathrm A$ at $300\,\mathrm K$ scaled with temperature as $n_i^2 \propto T^3e^{-E_g/kT}$. In forward bias the line rises one decade every $59.5\,\mathrm{mV}$; in reverse bias the current saturates at $I_0$. Find where the curve crosses $1\,\mathrm{mA}$, then raise $T$ by $25\,\mathrm K$: $I_0$ grows by a factor of about $36$ and the crossing moves about $45\,\mathrm{mV}$ to the left, close to $-2\,\mathrm{mV/K}$.
:::

::: quiz
A $\mathrm{p^+n}$ diode is redesigned with the n-side doping increased tenfold, everything else (including lifetimes and mobilities) unchanged. What happens to the saturation current?
- [ ] It increases tenfold.
- [x] It decreases roughly tenfold, because it is dominated by holes injected into the n side and $p_{n0} = n_i^2/N_D$.
- [ ] It is unchanged, because $N_A$ is much larger.
- [ ] It decreases by $\sqrt{10}$, because the depletion width falls by $\sqrt{10}$.
::: solution
In a $\mathrm{p^+n}$ diode the term $D_p/(N_DL_p)$ dominates $I_0$. Increasing $N_D$ tenfold reduces the equilibrium minority-hole concentration, and hence the injected hole current, tenfold. (In reality $\mu_p$, and so $D_p$, would also fall somewhat.) The depletion width does not enter the ideal equation at all.
:::
:::

### Temperature dependence

At fixed current, $V_A = V_T\ln(I/I_0)$, and $I_0 \propto n_i^2 \propto T^3e^{-E_g/kT}$ (ignoring the weak temperature dependence of $D/L$). Differentiating,

$$
\frac{\mathrm dV_A}{\mathrm dT}\Big|_I = -\frac{E_g/q + 3V_T - V_A}{T}.
$$ {#eq-dvdt}

For the diode of [[#ex-diode]] at $1\,\mathrm{mA}$ this is $-(1.12 + 0.078 - 0.609)/300 = -1.96\,\mathrm{mV/K}$. The forward voltage of a silicon diode falls by about $2\,\mathrm{mV}$ per kelvin — a handy thermometer, used in nearly every on-chip temperature sensor, and the reason why bipolar transistors can suffer thermal runaway.

## Junction capacitance

A reverse-biased junction stores charge: $+qN_Dx_nA$ on the n side and an equal negative charge on the p side, separated by the depletion region. When the voltage changes, the depletion edges move and the stored charge changes, so the junction behaves as a capacitor.

::: theorem Depletion capacitance {#thm-cj}
The small-signal **depletion (junction) capacitance** of an abrupt junction is

$$
C_j = \frac{\mathrm dQ}{\mathrm d(-V_A)} = \frac{\varepsilon_sA}{W} = \frac{C_{j0}}{\sqrt{1 - V_A/V_{bi}}}, \qquad C_{j0} = A\sqrt{\frac{q\varepsilon_s}{2V_{bi}}\frac{N_AN_D}{N_A + N_D}}.
$$ {#eq-cj}
:::

::: proof
The charge per unit area on the n side is $Q/A = qN_Dx_n = q\frac{N_AN_D}{N_A + N_D}W$. With $N_{\text{eff}} = N_AN_D/(N_A + N_D)$, [[#eq-w]] reads $W = \sqrt{2\varepsilon_s(V_{bi} - V_A)/(qN_{\text{eff}})}$, so $Q = A\sqrt{2q\varepsilon_sN_{\text{eff}}(V_{bi} - V_A)}$. Differentiating with respect to $-V_A$ gives $C_j = A\sqrt{q\varepsilon_sN_{\text{eff}}/(2(V_{bi} - V_A))}$, which equals $\varepsilon_sA/W$ and the stated form.
:::

The result $\varepsilon_sA/W$ is that of a parallel-plate capacitor whose plate separation is the depletion width — natural, since a small change of voltage adds or removes charge only at the two edges. For the junction of [[#ex-junction]], $C_j/A = \varepsilon_s/W = 1.036\times10^{-12}/3.32\times10^{-5} = 31\,\mathrm{nF/cm^2}$ at zero bias, falling to $11.4\,\mathrm{nF/cm^2}$ at $-5\,\mathrm V$. A diode designed to exploit this voltage-dependent capacitance is a **varactor**, used in voltage-controlled oscillators and electronic tuners.

For a one-sided junction, $C_j = A\sqrt{q\varepsilon_sN/(2(V_{bi} - V_A))}$, so

$$
\frac{1}{C_j^2} = \frac{2(V_{bi} - V_A)}{q\varepsilon_sNA^2}:
$$ {#eq-cv}

a plot of $1/C_j^2$ against $V_A$ is a straight line whose slope gives the doping $N$ of the lightly doped side and whose intercept on the voltage axis gives $V_{bi}$. This **C–V profiling** is the standard way to measure doping.

::: example Doping from a C–V measurement {#ex-cv}
A $\mathrm{p^+n}$ diode of area $10^{-3}\,\mathrm{cm^2}$ has $C = 21.8\,\mathrm{pF}$ at zero bias and $9.23\,\mathrm{pF}$ at $V_A = -4\,\mathrm V$. Find $N_D$ and $V_{bi}$.
::: solution
$1/C^2 = 2.104\times10^{21}\,\mathrm{F^{-2}}$ at $0\,\mathrm V$ and $1.174\times10^{22}\,\mathrm{F^{-2}}$ at $-4\,\mathrm V$ — computed from the measured values to four figures. The slope is

$$
\frac{\mathrm d(1/C^2)}{\mathrm dV_A} = \frac{1.174\times10^{22} - 2.104\times10^{21}}{-4 - 0} = -2.41\times10^{21}\,\mathrm{F^{-2}V^{-1}}.
$$

From [[#eq-cv]] the slope is $-2/(q\varepsilon_sN_DA^2)$, so

$$
N_D = \frac{2}{q\varepsilon_sA^2\times2.41\times10^{21}} = \frac{2}{(1.602\times10^{-19})(1.036\times10^{-12})(10^{-6})(2.41\times10^{21})} = 5.0\times10^{15}\,\mathrm{cm^{-3}}.
$$

The line reaches $1/C^2 = 0$ at $V_A = 2.104\times10^{21}/2.41\times10^{21} = 0.87\,\mathrm V = V_{bi}$, consistent with $0.02585\ln(N_AN_D/n_i^2)$ for $N_A \approx 10^{19}\,\mathrm{cm^{-3}}$.
:::
:::

### Diffusion capacitance

Under forward bias a second, usually larger, capacitance appears. The injected minority carriers form a stored charge in the neutral regions — for the n side of a long diode, $Q_p = qA\int_0^\infty\Delta p\,\mathrm dx' = qA\Delta p(0)L_p$. Comparing with $I_p = qAD_p\Delta p(0)/L_p$ gives the **charge-control relation** $Q_p = \tau_pI_p$: the stored charge is the current times the lifetime, because in steady state every hole injected must eventually recombine. Since $I_p \propto e^{V_A/V_T}$, changing the voltage changes the stored charge, giving a **diffusion capacitance**

$$
C_d = \frac{\mathrm dQ_p}{\mathrm dV_A} = \frac{\tau_pI_p}{V_T}.
$$ {#eq-cd}

For the diode of [[#ex-diode]] at $1\,\mathrm{mA}$, $C_d = (10^{-6})(0.88\times10^{-3})/0.02585 = 34\,\mathrm{nF}$, enormous compared with its depletion capacitance at the same bias (about $0.7\,\mathrm{nF}$, since $W$ has shrunk to $0.15\,\mathrm{\mu m}$). A full small-signal analysis of a long diode gives half this value at low frequency, because not all the stored charge can follow the voltage; for a short diode, $\tau_p$ is replaced by the much smaller transit time $W_n^2/2D_p$. The stored charge must be removed before a diode can block a reverse voltage, which causes the **reverse-recovery** transient of switching diodes discussed in [[semiconductor-devices/diodes-photonic-devices]].

## Breakdown

The reverse current of an ideal diode saturates at $-I_0$ however large the reverse voltage. In reality, at a certain **breakdown voltage** $V_{BR}$ the reverse current rises abruptly. The breakdown is not destructive in itself — **Zener diodes** are designed to operate there as voltage references — provided the power dissipated is limited.

Two mechanisms are responsible.

- **Avalanche multiplication.** In a strong field, an electron or hole crossing the depletion region gains enough energy between collisions to break a covalent bond, creating a new electron–hole pair (**impact ionisation**). The new carriers are accelerated too and create further pairs. When each carrier entering the region produces, on average, one more pair before leaving, the multiplication factor diverges and the current runs away. In silicon this happens when the peak field reaches a **critical field** $\mathcal E_{\text{crit}}$ of about $3\times10^{5}$ to $6\times10^{5}\,\mathrm{V/cm}$, increasing slowly with doping.
- **Zener (tunnelling) breakdown.** In heavily doped junctions the depletion region is so thin (under about $10\,\mathrm{nm}$) that electrons in the valence band on the p side can tunnel straight through the gap into empty conduction-band states on the n side. This dominates for breakdown voltages below about $4.5\,\mathrm V$ (about $4E_g/q$).

For a one-sided abrupt junction, setting $\abs{\mathcal E_{\max}} = \mathcal E_{\text{crit}}$ in [[#eq-emax]] with $V_{bi} \ll \abs{V_A}$ gives

$$
V_{BR} \approx \frac{\varepsilon_s\mathcal E_{\text{crit}}^2}{2qN},
$$ {#eq-vbr}

where $N$ is the doping of the lightly doped side. Breakdown voltage is inversely proportional to the doping: high-voltage devices need lightly doped, wide regions.

The two mechanisms can be told apart by their temperature dependence. Avalanche breakdown voltage **rises** with temperature, because stronger lattice vibrations scatter carriers more often and they need a stronger field to gain the ionisation energy. Zener breakdown voltage **falls** with temperature, because the band gap shrinks. Commercial "Zener" diodes near $5$–$6\,\mathrm V$ combine both and have nearly zero temperature coefficient, which is why $5.6\,\mathrm V$ diodes are favoured as references.

::: example Designing a junction for 100 V {#ex-breakdown}
A $\mathrm{p^+n}$ diode must block $100\,\mathrm V$. Taking $\mathcal E_{\text{crit}} = 3.5\times10^{5}\,\mathrm{V/cm}$ for the expected doping range, find the maximum n-side doping and the minimum thickness of the n region if the depletion region must not reach the $\mathrm{n^+}$ substrate before breakdown.
::: solution
From [[#eq-vbr]]

$$
N_D \le \frac{\varepsilon_s\mathcal E_{\text{crit}}^2}{2qV_{BR}} = \frac{(1.036\times10^{-12})(3.5\times10^{5})^2}{2(1.602\times10^{-19})(100)} = 3.96\times10^{15}\,\mathrm{cm^{-3}}.
$$

At breakdown the depletion width is $W = 2V_{BR}/\mathcal E_{\text{crit}} = 200/(3.5\times10^{5})\,\mathrm{cm} = 5.7\,\mathrm{\mu m}$ (the triangle of field with height $\mathcal E_{\text{crit}}$ and area $V_{BR}$). So we choose, for example, $N_D = 3\times10^{15}\,\mathrm{cm^{-3}}$ for margin and an n layer at least about $8\,\mathrm{\mu m}$ thick (the lower doping widens the region at $100\,\mathrm V$ to $\sqrt{2\varepsilon_s\times100/(qN_D)} = 6.6\,\mathrm{\mu m}$). The price is series resistance: this lightly doped layer is what makes high-voltage diodes and power MOSFETs resistive when they conduct, a trade-off treated in [[power-electronics]].
:::
:::

::: application Where junctions break down first
Real junctions are made by diffusion or implantation through a window in a mask, so the junction is curved at the edges of the window. The field is concentrated at the curved edges, like charge on a pointed conductor, and breakdown occurs there at a voltage well below the planar value [[#eq-vbr]]. Power devices therefore use **guard rings**, **field plates** and **junction-termination extensions** to spread the field at the edges; a good termination recovers $80$–$95\,\%$ of the ideal planar breakdown voltage.
:::

::: history
Russell Ohl at Bell Laboratories discovered the pn junction in February 1940, in a silicon rod in which impurities had segregated during freezing; the rod produced half a volt when illuminated, and Ohl and his colleagues named the two regions p-type and n-type. William Shockley's theory of the pn junction, published in the Bell System Technical Journal in July 1949 as "The theory of p-n junctions in semiconductors and p-n junction transistors", introduced the minority-carrier injection picture and derived the ideal diode equation. Clarence Zener proposed interband tunnelling as a mechanism of dielectric breakdown in 1934, and Kenneth McKay and Kenneth McAfee at Bell Laboratories showed in 1953 that most silicon junction breakdown is in fact avalanche multiplication; the name "Zener diode" stuck regardless. The C–V method of measuring doping profiles was developed in the late 1950s and early 1960s.
:::

## Where this leads

The ideal diode equation is the starting point for real diodes. In [[semiconductor-devices/diodes-photonic-devices]] we add recombination and generation in the depletion region, high injection and series resistance; meet metal–semiconductor junctions, which rectify with majority carriers alone; and turn the junction into LEDs, photodiodes and solar cells. Two junctions back to back with a thin region between them form the bipolar transistor of [[semiconductor-devices/bipolar-transistors]], where the law of the junction and the short-diode solution give the collector current. The depletion-region electrostatics of this chapter reappear almost unchanged in the MOS capacitor ([[semiconductor-devices/mos-capacitor]]), and the source and drain junctions of MOSFETs contribute capacitance and leakage in [[semiconductor-devices/mosfets]]. As a circuit element, the diode is analysed in [[electronics-1/diode-circuits]].

::: summary
- In equilibrium a depletion region forms at a pn junction, with built-in potential $V_{bi} = V_T\ln(N_AN_D/n_i^2)$, typically $0.6$–$1.0\,\mathrm V$ in silicon.
- In the depletion approximation the field is triangular and the potential parabolic; $W = \sqrt{2\varepsilon_s(V_{bi} - V_A)(1/N_A + 1/N_D)/q}$, and the depletion region lies mostly in the lightly doped side.
- The law of the junction, $np = n_i^2e^{V_A/V_T}$ at the depletion edges, sets the injected minority concentrations.
- Solving the minority-carrier diffusion equation on each side gives $I = I_0(e^{V_A/V_T} - 1)$ with $I_0 = qAn_i^2[D_p/(N_DL_p) + D_n/(N_AL_n)]$; current is injected mostly into the lightly doped side.
- At fixed current the forward voltage falls by about $2\,\mathrm{mV/K}$; the current rises a decade every $60\,\mathrm{mV}$.
- The depletion capacitance is $\varepsilon_sA/W \propto (V_{bi} - V_A)^{-1/2}$, and $1/C^2$ against $V$ gives the doping; forward bias adds a diffusion capacitance $\tau I/V_T$.
- Reverse breakdown occurs by avalanche (field near $3$–$6\times10^5\,\mathrm{V/cm}$, $V_{BR} \propto 1/N$, positive temperature coefficient) or by tunnelling in heavily doped junctions (below about $5\,\mathrm V$, negative coefficient).
:::

## Exercises

::: exercise Built-in potential {level=1 check="0.02585*log(1e18*1e15/1e20)"}
Find $V_{bi}$, in volts, for a silicon junction with $N_A = 10^{18}$ and $N_D = 10^{15}\,\mathrm{cm^{-3}}$ at $300\,\mathrm K$.
::: solution
$V_{bi} = 0.02585\ln(10^{33}/10^{20}) = 0.02585\times29.93 = 0.774\,\mathrm V$. The same as [[#ex-junction]], since the product $N_AN_D$ is the same.
:::
:::

::: exercise One-sided depletion width {level=1 check="sqrt(2*11.7*8.854e-12*(0.774+10)/(1.602e-19*1e21))"}
For the junction of the previous exercise at $V_A = -10\,\mathrm V$, find the depletion width in metres, treating it as one-sided ($V_{bi} = 0.774\,\mathrm V$).
::: solution
$W \approx \sqrt{2\varepsilon_s(V_{bi} - V_A)/(qN_D)} = \sqrt{2(1.036\times10^{-12})(10.774)/(1.602\times10^{-19}\times10^{15})}\,\mathrm{cm} = 3.73\times10^{-4}\,\mathrm{cm} = 3.73\times10^{-6}\,\mathrm m$. (In SI: $\varepsilon_s = 1.036\times10^{-10}\,\mathrm{F/m}$ and $N_D = 10^{21}\,\mathrm{m^{-3}}$ give the same.) The p side takes only $W\times10^{-3}$, $3.7\,\mathrm{nm}$.
:::
:::

::: exercise Current at a given voltage {level=1 check="1e-14*(exp(0.65/0.02585)-1)"}
A diode has $I_0 = 10^{-14}\,\mathrm A$. Find the current, in amperes, at $V_A = 0.65\,\mathrm V$ and $300\,\mathrm K$. By how much must $V_A$ rise to multiply the current by $10$?
::: solution
$I = 10^{-14}(e^{25.14} - 1) = 10^{-14}\times8.3\times10^{10} = 0.83\,\mathrm{mA}$. A tenfold increase needs $\Delta V = V_T\ln10 = 59.5\,\mathrm{mV}$.
:::
:::

::: exercise Peak field and breakdown {level=2}
For a $\mathrm{p^+n}$ junction with $N_D = 10^{16}\,\mathrm{cm^{-3}}$, estimate the avalanche breakdown voltage taking $\mathcal E_{\text{crit}} = 4\times10^{5}\,\mathrm{V/cm}$. Repeat for $N_D = 10^{15}\,\mathrm{cm^{-3}}$ with $\mathcal E_{\text{crit}} = 3\times10^{5}\,\mathrm{V/cm}$.
::: solution
$V_{BR} = \varepsilon_s\mathcal E_{\text{crit}}^2/(2qN_D)$: for $10^{16}$, $(1.036\times10^{-12})(1.6\times10^{11})/(2\times1.602\times10^{-19}\times10^{16}) = 52\,\mathrm V$; for $10^{15}$, $(1.036\times10^{-12})(9\times10^{10})/(3.204\times10^{-4}) = 291\,\mathrm V$. Measured values for planar silicon junctions are about $55$ and $300\,\mathrm V$. A tenfold reduction in doping raises the breakdown voltage by more than tenfold, because the critical field also falls slightly at lower doping.
:::
:::

::: exercise A varactor tuning range {level=2 check="sqrt((0.8+8)/(0.8+1))"}
A one-sided abrupt-junction varactor with $V_{bi} = 0.8\,\mathrm V$ is biased between $-1\,\mathrm V$ and $-8\,\mathrm V$. It resonates with a fixed inductor. Find the ratio $C_{\max}/C_{\min}$ (enter this) and the ratio of the highest to lowest resonant frequency.
::: solution
$C \propto (V_{bi} - V_A)^{-1/2}$, so $C_{\max}/C_{\min} = \sqrt{8.8/1.8} = 2.21$. Since $f \propto 1/\sqrt{LC}$, $f_{\max}/f_{\min} = \sqrt{2.21} = 1.49$. Hyperabrupt doping profiles, in which the doping falls away from the junction, give $C \propto (V_{bi} - V_A)^{-n}$ with $n$ up to about $2$, and much wider tuning ranges.
:::
:::

::: exercise Hole and electron currents in a symmetric junction {level=2}
In a junction with $N_A = N_D$, the n side has $D_p = 12\,\mathrm{cm^2/s}$, $\tau_p = 1\,\mathrm{\mu s}$, and the p side has $D_n = 30\,\mathrm{cm^2/s}$, $\tau_n = 1\,\mathrm{\mu s}$. What fraction of the current is carried by electrons injected into the p side? What does this tell you about the design of the emitter of an npn transistor?
::: solution
With equal dopings the ratio of the two terms is $\frac{D_n/L_n}{D_p/L_p} = \sqrt{\frac{D_n\tau_p}{D_p\tau_n}} = \sqrt{30/12} = 1.58$, so electrons carry $1.58/2.58 = 61\,\%$. To make injection one-sided — as a transistor emitter must, injecting electrons into the base but few holes back into the emitter — the emitter must be much more heavily doped than the base. The ratio of dopings dominates the ratio of $D/L$, which is the subject of emitter efficiency in [[semiconductor-devices/bipolar-transistors]].
:::
:::

::: exercise Temperature coefficient of the saturation current {level=2 check="(350/300)^3*exp(-1.12/8.617e-5*(1/350-1/300))"}
Assuming $I_0 \propto T^3e^{-E_g/kT}$ with $E_g = 1.12\,\mathrm{eV}$, by what factor does $I_0$ increase between $300$ and $350\,\mathrm K$?
::: solution
$(350/300)^3\exp[-12\,997(1/350 - 1/300)] = 1.588\times e^{6.189} = 1.588\times487.6 = 774$. The reverse leakage of an ideal diode rises almost a thousandfold over $50\,\mathrm K$.
:::
:::

::: exercise The short diode {level=3}
A $\mathrm{p^+n}$ diode has an n region of width $W_n = 2\,\mathrm{\mu m}$ between the depletion edge and an ohmic contact, with $N_D = 10^{16}\,\mathrm{cm^{-3}}$, $D_p = 10.5\,\mathrm{cm^2/s}$ and $L_p = 32.4\,\mathrm{\mu m}$. (a) Derive the hole current, showing that $L_p$ is replaced by $W_n$ when $W_n \ll L_p$. (b) Find the ratio of its saturation current density to that of a long diode. (c) Find the stored hole charge as a function of current, and the corresponding effective time constant.
::: hint
With $\Delta p(W_n) = 0$, the solution is $\Delta p(0)\sinh[(W_n - x')/L_p]/\sinh(W_n/L_p)$. For $W_n \ll L_p$ it is a straight line.
:::
::: solution
(a) $J_p = -qD_p\,\mathrm d\Delta p/\mathrm dx'|_0 = \frac{qD_p\Delta p(0)}{L_p}\coth\frac{W_n}{L_p}$, with $\Delta p(0) = p_{n0}(e^{V_A/V_T} - 1)$. For $W_n \ll L_p$, $\coth(W_n/L_p) \approx L_p/W_n$, giving $J_p = \frac{qD_pn_i^2}{N_DW_n}(e^{V_A/V_T} - 1)$.

(b) The ratio is $\coth(2/32.4) = \coth(0.0617) = 16.2 \approx L_p/W_n$. The short diode passes $16$ times the current at the same voltage, i.e. reaches the same current at $V_T\ln16.2 = 72\,\mathrm{mV}$ less forward voltage.

(c) The profile is linear: $Q_p = qA\cdot\tfrac12\Delta p(0)W_n$, while $I_p = qAD_p\Delta p(0)/W_n$, so $Q_p = \frac{W_n^2}{2D_p}I_p$. The **transit time** $W_n^2/2D_p = (2\times10^{-4})^2/21 = 1.9\,\mathrm{ns}$ replaces the lifetime $\tau_p = L_p^2/D_p = 1\,\mathrm{\mu s}$: the stored charge, and with it the diffusion capacitance and the reverse-recovery time, are about $500$ times smaller. Short diodes are fast diodes.
:::
:::

::: exercise Linearly graded junction {level=3}
In a junction made by diffusion, the net doping near the metallurgical junction is approximately linear, $N_D - N_A = ax$. (a) Using the depletion approximation with a symmetric region $-W/2 < x < W/2$, show that $W = \left[\frac{12\varepsilon_s(V_{bi} - V_A)}{qa}\right]^{1/3}$. (b) Show that $C_j \propto (V_{bi} - V_A)^{-1/3}$. (c) Evaluate $W$ for $a = 10^{20}\,\mathrm{cm^{-4}}$ and $V_{bi} - V_A = 5\,\mathrm V$.
::: solution
(a) $\mathrm d\mathcal E/\mathrm dx = qax/\varepsilon_s$, with $\mathcal E(\pm W/2) = 0$, gives $\mathcal E = \frac{qa}{2\varepsilon_s}(x^2 - W^2/4)$, which is negative inside, with peak magnitude $qaW^2/(8\varepsilon_s)$ at $x = 0$. The potential drop is $-\int\mathcal E\,\mathrm dx = \frac{qa}{2\varepsilon_s}\left[\frac{W^2}{4}W - \frac{2}{3}\frac{W^3}{8}\right] = \frac{qaW^3}{12\varepsilon_s}$. Setting this equal to $V_{bi} - V_A$ gives the result.

(b) $C_j = \varepsilon_sA/W$ (the same parallel-plate argument holds), so $C_j \propto (V_{bi} - V_A)^{-1/3}$. A plot of $1/C^3$ against $V$ is linear for graded junctions, which distinguishes them from abrupt ones in C–V data.

(c) $W = [12(1.036\times10^{-12})(5)/(1.602\times10^{-19}\times10^{20})]^{1/3} = (3.88\times10^{-12})^{1/3}\,\mathrm{cm} = 1.57\times10^{-4}\,\mathrm{cm} = 1.57\,\mathrm{\mu m}$.
:::
:::
