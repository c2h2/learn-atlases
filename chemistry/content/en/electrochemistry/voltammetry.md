Sweep the potential of a small platinum disc from $0$ to $+0.6\ \mathrm{V}$ and back in a millimolar solution of ferrocene in acetonitrile, and the current traces a duck-shaped loop: a peak on the way out, as ferrocene is oxidised to ferrocenium, and a mirror-image peak on the way back, as the ferrocenium formed is reduced again. The two peaks are $59\ \mathrm{mV}$ apart, their heights grow with the square root of the sweep rate, and their midpoint is the formal potential of the couple. In half a minute, and with a millilitre of solution, the cyclic voltammogram has told you the redox potential, the number of electrons, the diffusion coefficient, that the electron transfer is fast and that the product is stable. Change the molecule and the shape changes — peaks separate when electron transfer is slow, the return peak vanishes when the product decomposes — and each change has a quantitative interpretation.

Every such interpretation rests on two ingredients: the electrode kinetics of [[electrochemistry/electrode-kinetics]], which relates the current to the *surface* concentrations, and **mass transport**, which relates the surface concentrations to the bulk. This chapter supplies the second ingredient and combines the two. We start with the three modes of transport and why supporting electrolyte removes one of them; treat steady-state transport at rotating discs and microelectrodes, where the mathematics is simple and the current–potential curve has a closed form; and then turn to linear-sweep and cyclic voltammetry, the most widely used electrochemical technique. The potential-step (Cottrell) experiment and the analytical pulse and stripping methods are treated in [[analytical-chemistry/electroanalytical]]; we use the Cottrell result from there without repeating its derivation.

## Three modes of mass transport

::: definition Diffusion, migration and convection {#def-transport-modes}
A dissolved species $i$ reaches an electrode by **diffusion** (down its concentration gradient), **migration** (charged species moving in the electric field) and **convection** (carried by bulk motion of the solution, natural or forced). In one dimension the flux, in $\mathrm{mol\,m^{-2}\,s^{-1}}$, is given by the **Nernst–Planck equation**
$$
J_i(x) = -D_i\frac{\partial c_i}{\partial x} - \frac{z_iF}{RT}D_ic_i\frac{\partial\phi}{\partial x} + c_iv_x(x),
$$ {#eq-nernst-planck}
where $D_i$ is the diffusion coefficient, $\phi$ the electric potential and $v_x$ the solution velocity normal to the electrode. The migration term uses the mobility $u_i = |z_i|FD_i/RT$ of the Nernst–Einstein relation ([[electrochemistry/conductivity#prop-mobility]]).
:::

Migration is the awkward term, because the field depends on the current and on every ion in solution. The remedy is to add a large excess (typically $0.1$–$1\ \mathrm{mol\,dm^{-3}}$) of an inert **supporting electrolyte** such as $\mathrm{KCl}$, $\mathrm{KNO_3}$ or, in organic solvents, $\mathrm{NBu_4PF_6}$. The supporting ions then carry almost all of the current through the solution: the fraction carried by the analyte is its transport number, which becomes tiny. The supporting electrolyte also lowers the solution resistance and compresses the diffuse double layer to within a nanometre of the electrode ([[electrochemistry/double-layer]]).

::: example How much does supporting electrolyte suppress migration? {#ex-migration}
Estimate the transport number of $\mathrm{Cd^{2+}}$ in $1.0\ \mathrm{mmol\,dm^{-3}}$ $\mathrm{CdCl_2}$ (a) alone and (b) with $0.10\ \mathrm{mol\,dm^{-3}}$ KCl, using limiting ionic conductivities ($\mathrm{mS\,m^2\,mol^{-1}}$): $\mathrm{Cd^{2+}}$ $10.8$, $\mathrm{K^+}$ $7.35$, $\mathrm{Cl^-}$ $7.63$.
::: solution
The current carried by each ion is proportional to $c_i\lambda_i$ (with $\lambda_i$ per mole of ion, which already includes $|z_i|$ twice: $\lambda = z^2F^2D/RT$). (a) $t(\mathrm{Cd^{2+}}) = (0.001\times10.8)/(0.001\times10.8 + 0.002\times7.63) = 0.0108/0.0261 = 0.41$. (b) Adding $0.10\ \mathrm{mol\,dm^{-3}}$ KCl adds $0.10\times7.35 + 0.10\times7.63 = 1.498$ to the denominator: $t(\mathrm{Cd^{2+}}) = 0.0108/1.524 = 0.0071$. With supporting electrolyte less than $1\,\%$ of the current through the bulk solution is carried by cadmium ions, so the cadmium reaching the electrode arrives essentially by diffusion (and convection) alone. Without it, $41\,\%$ of the current would be migration, and the measured current would be correspondingly larger and much harder to interpret.
:::
:::

With migration suppressed and the solution still, only diffusion remains, governed by Fick's second law, $\partial c/\partial t = D\,\partial^2c/\partial x^2$ for a planar electrode. After a potential step that drives the surface concentration to zero, its solution gives the Cottrell current $i = nFAc\sqrt{D/\pi t}$ ([[analytical-chemistry/electroanalytical#prop-cottrell]]), which decays as $t^{-1/2}$ because the depleted region grows as $\sqrt{\pi Dt}$ — about $56\ \mu\mathrm{m}$ after one second for $D = 1\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$. A planar electrode in still solution therefore never reaches a steady state; to get one, you must either stir in a controlled way or make the electrode small.

## Steady-state transport: the diffusion layer

A useful idealisation, due to Nernst (1904), is the **diffusion layer**: in a stirred solution, the concentration is uniform beyond a distance $\delta$ from the electrode, and within that layer transport is by diffusion with a linear concentration profile. The flux of O to the surface is then $D_\mathrm{O}(c_\mathrm{O}^* - c_\mathrm{O}(0))/\delta$, and the current reaches its maximum, the **limiting current**, when $c_\mathrm{O}(0) = 0$:
$$
|i_\mathrm{l}| = nFAm_\mathrm{O}c_\mathrm{O}^*, \qquad m_\mathrm{O} = \frac{D_\mathrm{O}}{\delta},
$$
where $m$ is the **mass-transfer coefficient** (in $\mathrm{cm\,s^{-1}}$, the same units as $k^\circ$ — the comparison $k^\circ/m$ will decide whether a wave is reversible). For a reduction current $i$ (magnitude), the surface concentrations follow from the fluxes: $c_\mathrm{O}(0)/c_\mathrm{O}^* = 1 - i/i_\mathrm{l}$, and, if R is initially absent, $c_\mathrm{R}(0) = (m_\mathrm{O}/m_\mathrm{R})\,c_\mathrm{O}^*\,i/i_\mathrm{l}$.

::: proposition The steady-state voltammetric wave {#prop-wave}
For $\mathrm{O} + n\mathrm{e^-} \rightleftharpoons \mathrm{R}$ with only O present in the bulk, under steady-state mass transport with coefficients $m_\mathrm{O}$, $m_\mathrm{R}$:

(1) If electron transfer is **reversible** (Nernstian at the surface),
$$
E = E_{1/2} + \frac{RT}{nF}\ln\frac{i_\mathrm{l} - i}{i}, \qquad E_{1/2} = E^{\circ\prime} + \frac{RT}{nF}\ln\frac{m_\mathrm{R}}{m_\mathrm{O}},
$$ {#eq-wave}
a sigmoid whose half-wave potential is independent of concentration and close to $E^{\circ\prime}$.
(2) For a one-electron step with Butler–Volmer kinetics and $m_\mathrm{O} = m_\mathrm{R} = m$,
$$
\frac{i}{i_\mathrm{l}} = \frac{1}{1 + \mathrm{e}^{\theta} + (m/k^\circ)\,\mathrm{e}^{\alpha\theta}}, \qquad \theta = f(E - E^{\circ\prime}) .
$$ {#eq-qr-wave}
:::

::: proof
(1) A Nernstian surface means $E = E^{\circ\prime} + (RT/nF)\ln[c_\mathrm{O}(0)/c_\mathrm{R}(0)]$. Substituting the surface concentrations above, $c_\mathrm{O}(0)/c_\mathrm{R}(0) = (m_\mathrm{R}/m_\mathrm{O})(i_\mathrm{l} - i)/i$, and separating the logarithm gives [[#eq-wave]]. At $i = i_\mathrm{l}/2$ the logarithm of the current ratio vanishes and $E = E_{1/2}$.

(2) The net reduction rate per unit area is $k_\mathrm{red}c_\mathrm{O}(0) - k_\mathrm{ox}c_\mathrm{R}(0)$, and at steady state it equals the transport flux $i/nFA = mc_\mathrm{O}^*(i/i_\mathrm{l})$. Writing $x = i/i_\mathrm{l}$, with $c_\mathrm{O}(0) = c_\mathrm{O}^*(1 - x)$ and $c_\mathrm{R}(0) = c_\mathrm{O}^*x$:
$$
mx = k_\mathrm{red}(1 - x) - k_\mathrm{ox}x \quad\Rightarrow\quad x = \frac{k_\mathrm{red}}{m + k_\mathrm{red} + k_\mathrm{ox}} = \frac{1}{1 + m/k_\mathrm{red} + k_\mathrm{ox}/k_\mathrm{red}} .
$$
With [[electrochemistry/electrode-kinetics#prop-rate-constants]], $k_\mathrm{ox}/k_\mathrm{red} = \mathrm{e}^{\theta}$ and $m/k_\mathrm{red} = (m/k^\circ)\mathrm{e}^{\alpha\theta}$, giving [[#eq-qr-wave]]. When $k^\circ \gg m$ the last term is negligible near $E^{\circ\prime}$ and the reversible wave (with $n = 1$, $m_\mathrm{O} = m_\mathrm{R}$) is recovered.
:::

The reversible wave has a fixed shape: $E_{1/4} - E_{3/4} = (RT/nF)\ln 9 = 56.5/n\ \mathrm{mV}$ at $25\,^\circ\mathrm{C}$ (the Tomeš criterion), and a plot of $E$ against $\log[(i_\mathrm{l} - i)/i]$ has slope $59.2/n\ \mathrm{mV}$. A wave that is broader than this and shifted negative of $E^{\circ\prime}$ signals slow electron transfer; in the limit $k^\circ \ll m$ its foot is a Tafel line.

::: widget plot
f: 1/(1 + exp(38.92*x) + 10^(-lk)*exp(al*38.92*x)); 1/(1 + exp(38.92*x))
x: -0.8, 0.3
y: 0, 1.05
sliders: lk=0:-4:3:0.1; al=0.5:0.3:0.7:0.01
labels: \text{quasi-reversible}; \text{reversible}
caption: Steady-state reduction waves [[#eq-qr-wave]]: normalised current $i/i_\mathrm{l}$ against $E - E^{\circ\prime}$ in volts ($x$), for a one-electron couple at $25\,^\circ\mathrm{C}$, with $\mathrm{lk} = \log_{10}(k^\circ/m)$. At $\mathrm{lk} = 2$ or more, the wave coincides with the reversible sigmoid centred on $E^{\circ\prime}$. At $\mathrm{lk} = 0$ ($k^\circ = m$) it is already shifted and broadened; at $\mathrm{lk} = -3$ it lies hundreds of millivolts negative, and its shape is set by $\alpha$, not by the Nernst equation. Because $m$ can be changed experimentally (rotation rate, electrode radius), the same couple can be moved from reversible to irreversible — the basic strategy for measuring fast rate constants.
:::

### The rotating disc electrode

The diffusion layer becomes an exact concept at a **rotating disc electrode** (RDE): a disc set flush in an insulating cylinder that spins about its axis. The rotation pumps solution towards the disc and flings it outward, and Theodore von Kármán's 1921 solution of the fluid flow, used by Veniamin Levich in 1942 to solve the convective-diffusion problem, shows that the diffusion layer has the same thickness over the whole disc — a "uniformly accessible" surface.

::: proposition The Levich and Koutecký–Levich equations {#prop-levich}
At a rotating disc of area $A$ rotating at angular velocity $\omega$ (in $\mathrm{rad\,s^{-1}}$) in a solution of kinematic viscosity $\nu$, the diffusion layer has thickness $\delta = 1.61\,D^{1/3}\omega^{-1/2}\nu^{1/6}$ and the limiting current is
$$
|i_\mathrm{l}| = 0.620\,nFAD^{2/3}\omega^{1/2}\nu^{-1/6}c^* .
$$ {#eq-levich}
If electron transfer is not fast, the current at any potential satisfies the **Koutecký–Levich equation**
$$
\frac{1}{i} = \frac{1}{i_\mathrm{k}} + \frac{1}{i_\mathrm{l}} = \frac{1}{i_\mathrm{k}} + \frac{1}{B\,\omega^{1/2}}, \qquad B = 0.620\,nFAD^{2/3}\nu^{-1/6}c^*,
$$ {#eq-kl}
where $i_\mathrm{k} = nFAk_\mathrm{f}(E)c^*$ is the kinetic current, the current that would flow at that potential if mass transport were infinitely fast.
:::

::: proof
The hydrodynamic part — the velocity profile of von Kármán and the solution of the convective-diffusion equation near the disc, which yields the numerical factors $1.61$ and $0.620 = 1/1.61$ — we take from Levich. Granting $\delta$, the Nernst diffusion-layer model gives $|i_\mathrm{l}| = nFAD c^*/\delta = nFAc^*D^{2/3}\omega^{1/2}\nu^{-1/6}/1.61$, which is [[#eq-levich]].

For the Koutecký–Levich form, consider an irreversible reduction (back reaction negligible) with forward rate constant $k_\mathrm{f}$. At steady state the reaction rate at the surface equals the transport flux:
$$
\frac{i}{nFA} = k_\mathrm{f}c(0) = m\left(c^* - c(0)\right) .
$$
Eliminate $c(0)$: from the second equality $c(0) = mc^*/(m + k_\mathrm{f})$, so $i/nFA = k_\mathrm{f}mc^*/(k_\mathrm{f} + m)$. Inverting, $nFAc^*/i = 1/k_\mathrm{f} + 1/m$, i.e. $1/i = 1/i_\mathrm{k} + 1/i_\mathrm{l}$ with $i_\mathrm{k} = nFAk_\mathrm{f}c^*$ and $i_\mathrm{l} = nFAmc^*$. Kinetics and transport act as resistances in series.
:::

::: example A Levich current {#ex-levich}
A platinum RDE of radius $2.50\ \mathrm{mm}$ rotates at $1600\ \mathrm{rpm}$ in an aqueous solution of $2.0\ \mathrm{mmol\,dm^{-3}}$ $\mathrm{K_3Fe(CN)_6}$ in $1\ \mathrm{mol\,dm^{-3}}$ KCl ($D = 7.2\times10^{-6}\ \mathrm{cm^2\,s^{-1}}$, $\nu = 0.010\ \mathrm{cm^2\,s^{-1}}$). Find the diffusion-layer thickness and the limiting current for the one-electron reduction.
::: solution
$A = \pi(0.250\ \mathrm{cm})^2 = 0.196\ \mathrm{cm^2}$; $\omega = 1600\times2\pi/60 = 167.6\ \mathrm{rad\,s^{-1}}$; $c^* = 2.0\times10^{-6}\ \mathrm{mol\,cm^{-3}}$. Then
$$
\delta = 1.61\times(7.2\times10^{-6})^{1/3}\times(167.6)^{-1/2}\times(0.010)^{1/6}\ \mathrm{cm} = 1.11\times10^{-3}\ \mathrm{cm} = 11\ \mu\mathrm{m},
$$
$$
|i_\mathrm{l}| = 0.620\times96\,485\times0.196\times(7.2\times10^{-6})^{2/3}\times(167.6)^{1/2}\times(0.010)^{-1/6}\times2.0\times10^{-6}\ \mathrm{A} = 2.44\times10^{-4}\ \mathrm{A},
$$
$0.24\ \mathrm{mA}$. The diffusion layer is five times thinner than after one second of unstirred diffusion, and stays that thin indefinitely, so the current is steady and large. Doubling the rotation rate raises the current by $\sqrt{2}$; a plot of $i_\mathrm{l}$ against $\omega^{1/2}$ that is straight and passes through the origin proves the current is transport-controlled.
:::
:::

::: example Kinetic current of oxygen reduction from a Koutecký–Levich plot {#ex-kl}
At a fixed potential, an RDE of area $0.196\ \mathrm{cm^2}$ in $\mathrm{O_2}$-saturated alkaline solution ($c^* = 1.2\ \mathrm{mmol\,dm^{-3}}$, $D = 1.9\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$, $\nu = 0.010\ \mathrm{cm^2\,s^{-1}}$) gives currents of $0.437$, $0.591$, $0.717$ and $0.822\ \mathrm{mA}$ at $400$, $900$, $1600$ and $2500\ \mathrm{rpm}$. Find the kinetic current, the number of electrons per $\mathrm{O_2}$, and the rate constant.
::: solution
Compute $\omega^{-1/2}$ (with $\omega$ in $\mathrm{rad\,s^{-1}}$: $41.9$, $94.2$, $167.6$, $261.8$) and $1/i$:

| $\omega^{-1/2}/\mathrm{s^{1/2}}$ | $0.1545$ | $0.1030$ | $0.0773$ | $0.0618$ |
|---|---|---|---|---|
| $(1/i)/\mathrm{mA^{-1}}$ | $2.290$ | $1.693$ | $1.395$ | $1.216$ |

A least-squares line has slope $11.58\ \mathrm{mA^{-1}\,s^{-1/2}}$ and intercept $0.500\ \mathrm{mA^{-1}}$ (try it in the figure below). The intercept gives $i_\mathrm{k} = 2.00\ \mathrm{mA}$. The slope is $1/B$, so $B = 0.0864\ \mathrm{mA\,s^{1/2}}$, and
$$
n = \frac{B}{0.620\,FAD^{2/3}\nu^{-1/6}c^*} = \frac{8.64\times10^{-5}}{0.620\times96\,485\times0.196\times(1.9\times10^{-5})^{2/3}\times(0.010)^{-1/6}\times1.2\times10^{-6}} = 4.0 .
$$
Four electrons per $\mathrm{O_2}$: the catalyst reduces oxygen all the way to water (or hydroxide) rather than stopping at peroxide ($n = 2$) — the key question for fuel-cell cathodes ([[electrochemistry/fuel-cells-electrolysis]]). The rate constant is $k_\mathrm{f} = i_\mathrm{k}/nFAc^* = 2.00\times10^{-3}/(4\times96\,485\times0.196\times1.2\times10^{-6}) = 0.022\ \mathrm{cm\,s^{-1}}$.
:::
:::

::: widget regression
points: 0.1545,2.290; 0.1030,1.693; 0.0773,1.395; 0.0618,1.216
degree: 1
x: 0, 0.18
y: 0, 2.6
caption: The Koutecký–Levich plot of [[#ex-kl]]: $1/i$ in $\mathrm{mA^{-1}}$ against $\omega^{-1/2}$ in $\mathrm{s^{1/2}}$. The intercept is $1/i_\mathrm{k}$ (infinite rotation rate) and the slope $1/B$ contains $n$ and $D$. Drag points to imitate noisy data: because the intercept is an extrapolation beyond the fastest rotation rate, small errors at high rotation rates move it a great deal, and a kinetic current much larger than the limiting current cannot be measured reliably this way.
:::

### Microelectrodes

Shrink an electrode to a radius $r_0$ of a few micrometres and diffusion becomes radial: molecules arrive from a hemisphere of solution rather than a column, and the depletion layer stops growing once it is a few radii thick. For a hemispherical electrode, the solution of the spherical diffusion equation after a step to the limiting potential is
$$
i(t) = nFADc^*\left(\frac{1}{\sqrt{\pi Dt}} + \frac{1}{r_0}\right), \qquad A = 2\pi r_0^2 ,
$$
a Cottrell term plus a constant; at long times $i_\mathrm{ss} = 2\pi nFDc^*r_0$. For the more practical **microdisc** (an inlaid disc of radius $r_0$) the steady-state current is $i_\mathrm{ss} = 4nFDc^*r_0$ (Saito, 1968). Steady state is reached when $\sqrt{\pi Dt} \gg r_0$, i.e. for $t \gg r_0^2/\pi D$.

::: example A microdisc {#ex-microdisc}
A platinum microdisc of radius $5.0\ \mu\mathrm{m}$ oxidises a species ($n = 1$, $D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$) at $1.0\ \mathrm{mmol\,dm^{-3}}$. Find the steady-state current and the time scale for reaching it.
::: solution
$$
i_\mathrm{ss} = 4nFDc^*r_0 = 4\times96\,485\times1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}\times1.0\times10^{-6}\ \mathrm{mol\,cm^{-3}}\times5.0\times10^{-4}\ \mathrm{cm} = 1.9\times10^{-9}\ \mathrm{A},
$$
about $2\ \mathrm{nA}$. The characteristic time is $r_0^2/\pi D = (5.0\times10^{-4})^2/(\pi\times1.0\times10^{-5})\ \mathrm{s} = 8\ \mathrm{ms}$, so after a fraction of a second the current is steady. The small current has three advantages: the ohmic drop $iR_\mathrm{u}$ is tiny, so microelectrodes work in resistive media (organic solvents with little electrolyte, even frozen solutions); the double-layer capacitance is tiny, so time constants are microseconds and very fast sweeps are possible; and the mass-transfer coefficient $m = 4D/\pi r_0 = 25\times10^{-3}\ \mathrm{cm\,s^{-1}}$ is large and can be raised further by shrinking the disc, which is how rate constants of $1\ \mathrm{cm\,s^{-1}}$ and more have been measured. Microelectrodes inserted into brain tissue use these properties to follow neurotransmitter release in real time.
:::
:::

::: widget plot
f: 96485*2*pi*r^2*1e-8*D*1e-5*1e-6*(1/sqrt(pi*D*1e-5*x) + 1/(r*1e-4))*1e9; 96485*2*pi*r*1e-4*D*1e-5*1e-6*1e9
x: 0.001, 1
y: 0, 15
sliders: r=5:1:25:0.5; D=1:0.5:2:0.1
labels: \text{hemisphere } i(t); \text{steady state}
caption: Current in nA against time in seconds after a potential step at a hemispherical microelectrode of radius $r$ (in $\mu\mathrm{m}$), for $c^* = 1\ \mathrm{mmol\,dm^{-3}}$, $n = 1$ and $D$ in units of $10^{-5}\ \mathrm{cm^2\,s^{-1}}$. At short times the current follows the planar Cottrell decay; once the depletion layer is larger than the electrode it levels off at the steady-state value $2\pi nFDc^*r$. Increase $r$ and the transition is delayed (it scales as $r^2/D$) — a millimetre electrode would take minutes, longer than natural convection allows.
:::

## Linear-sweep and cyclic voltammetry

In **linear-sweep voltammetry** the potential is changed linearly with time from a value where nothing happens, $E(t) = E_\mathrm{i} - vt$ for a reduction, at a **scan rate** $v$ (typically $0.01$–$1\ \mathrm{V\,s^{-1}}$, up to $10^{6}\ \mathrm{V\,s^{-1}}$ at microelectrodes). In **cyclic voltammetry** (CV) the sweep is reversed at a switching potential and the potential returns to its start. Consider a reversible reduction in still solution. As the potential approaches $E^{\circ\prime}$, the Nernst equation demands a falling ratio $c_\mathrm{O}(0)/c_\mathrm{R}(0)$, and current flows. The current is proportional to the concentration gradient at the surface. At first the gradient steepens as $c_\mathrm{O}(0)$ falls; but once $c_\mathrm{O}(0)$ is near zero the depletion layer continues to grow as in a Cottrell experiment and the gradient — and the current — decline. The current therefore passes through a **peak**. On reversal, the R accumulated near the electrode is reoxidised, giving a peak of opposite sign.

::: proposition Peak current and peak separation for a reversible couple {#prop-randles}
For a reversible $n$-electron reduction at a planar electrode in still solution with only O initially present, at $25\,^\circ\mathrm{C}$:
$$
i_\mathrm{p} = 0.4463\,nFAc^*\left(\frac{nFvD}{RT}\right)^{1/2} = (2.69\times10^{5})\,n^{3/2}AD^{1/2}v^{1/2}c^* ,
$$ {#eq-randles}
(the **Randles–Ševčík equation**, with $A$ in $\mathrm{cm^2}$, $D$ in $\mathrm{cm^2\,s^{-1}}$, $v$ in $\mathrm{V\,s^{-1}}$, $c^*$ in $\mathrm{mol\,cm^{-3}}$ and $i_\mathrm{p}$ in A). The peak lies at $E_\mathrm{p} = E_{1/2} - 1.109RT/nF$ ($28.5/n\ \mathrm{mV}$ negative of $E_{1/2}$), independent of $v$, and in a cyclic voltammogram the anodic and cathodic peaks are separated by
$$
\Delta E_\mathrm{p} = E_\mathrm{p,a} - E_\mathrm{p,c} \approx \frac{2.22RT}{nF} = \frac{57}{n}\ \mathrm{mV}
$$ {#eq-dep}
with $i_\mathrm{p,a}/i_\mathrm{p,c} = 1$ (currents measured from the extrapolated baseline) and $E^{\circ\prime} \approx (E_\mathrm{p,a} + E_\mathrm{p,c})/2$ when $D_\mathrm{O} \approx D_\mathrm{R}$.
:::

::: proof
The numerical constants come from solving Fick's second law with the Nernstian boundary condition $c_\mathrm{O}(0,t)/c_\mathrm{R}(0,t) = \exp[nf(E_\mathrm{i} - vt - E^{\circ\prime})]$; the solution is an integral equation that Randles (1948) and Ševčík (1948) solved approximately and Nicholson and Shain (1964) numerically. The *form* of [[#eq-randles]], however, follows from dimensional analysis. The only time scale in the problem is the time to sweep through the wave, $\tau = RT/(nFv)$, the time for the potential to change by $RT/nF$. The depletion layer at the peak has grown for a time of order $\tau$, so its thickness is of order $\sqrt{D\tau}$, and the current is of order $nFADc^*/\sqrt{D\tau} = nFAc^*\sqrt{D/\tau} = nFAc^*\sqrt{nFvD/RT}$. The full solution supplies the dimensionless factor, $0.4463$. Because the problem has no other parameters, the dimensionless current is a universal function of $nf(E - E_{1/2})$; its maximum therefore lies at a fixed value of $nf(E - E_{1/2})$, which is why $E_\mathrm{p}$ does not depend on $v$, and the reverse peak follows from the same universal function, giving the fixed separation [[#eq-dep]] (whose exact value depends slightly on the switching potential, tending to $2.218RT/nF$ for switching far past the peak).
:::

The proportionality $i_\mathrm{p} \propto v^{1/2}$ distinguishes a diffusing reactant from one adsorbed on the electrode, for which the whole surface layer is converted as the sweep passes and $i_\mathrm{p} \propto v$ (the current is the charge of the layer divided by the time to sweep through the wave). The capacitive background is also proportional to $v$ ([[electrochemistry/double-layer#def-charging]]), so at high scan rates it grows relative to a diffusion signal.

::: example Diagnosing a cyclic voltammogram {#ex-cv}
A CV of $1.0\ \mathrm{mmol\,dm^{-3}}$ of an organometallic complex in acetonitrile at a $3.0\ \mathrm{mm}$ disc ($A = 0.0707\ \mathrm{cm^2}$) at $0.10\ \mathrm{V\,s^{-1}}$ shows $E_\mathrm{p,c} = -1.245\ \mathrm{V}$, $E_\mathrm{p,a} = -1.185\ \mathrm{V}$ (both against ferrocene), $i_\mathrm{p,c} = 21.2\ \mu\mathrm{A}$ and $i_\mathrm{p,a}/i_\mathrm{p,c} = 0.99$; the peak current at $0.40\ \mathrm{V\,s^{-1}}$ is $42.5\ \mu\mathrm{A}$ and the peak potentials do not move. Interpret, and find $D$.
::: solution
$\Delta E_\mathrm{p} = 60\ \mathrm{mV}$, close to $57\ \mathrm{mV}$ for $n = 1$ (the small excess is typical of uncompensated resistance); peak potentials independent of $v$, current ratio unity: a reversible one-electron reduction with a stable product. Quadrupling $v$ doubles $i_\mathrm{p}$ ($42.5/21.2 = 2.00$): diffusion control, not adsorption. The formal potential is $E^{\circ\prime} \approx (-1.245 - 1.185)/2 = -1.215\ \mathrm{V}$ vs ferrocene. From [[#eq-randles]] with $n = 1$:
$$
D = \left(\frac{i_\mathrm{p}}{2.69\times10^{5}\,Av^{1/2}c^*}\right)^2 = \left(\frac{21.2\times10^{-6}}{2.69\times10^{5}\times0.0707\times\sqrt{0.10}\times1.0\times10^{-6}}\right)^2\ \mathrm{cm^2\,s^{-1}} = 1.24\times10^{-5}\ \mathrm{cm^2\,s^{-1}},
$$
a typical value for a molecule of this size in acetonitrile, whose low viscosity makes diffusion faster than in water.
:::
:::

### Slow electron transfer and following reactions

If $k^\circ$ is not large compared with the rate at which the sweep demands conversion, the surface concentrations lag behind the Nernst equation and the peaks separate further. Nicholson (1965) showed that the shape depends on the single dimensionless parameter
$$
\psi = \frac{k^\circ}{\sqrt{\pi Df_nv}}, \qquad f_n = \frac{nF}{RT}
$$
(for $D_\mathrm{O} = D_\mathrm{R} = D$ and $\alpha \approx 0.5$). For $\psi \gtrsim 10$ the system appears reversible ($\Delta E_\mathrm{p} \approx 57$–$61\ \mathrm{mV}$ for $n = 1$); for $\psi = 1$, $\Delta E_\mathrm{p} \approx 84\ \mathrm{mV}$; for $\psi = 0.5$, $105\ \mathrm{mV}$; for $\psi = 0.1$, $212\ \mathrm{mV}$. Measuring $\Delta E_\mathrm{p}$ as a function of $v$ and reading $\psi$ from Nicholson's table gives $k^\circ$. In the fully irreversible limit, the peak potential shifts by $-1.15RT/\alpha F$ per decade of scan rate ($-59\ \mathrm{mV}$ for $\alpha = 0.5$ at $25\,^\circ\mathrm{C}$), the peak broadens, and the return peak may not appear within the potential window at all.

::: quiz
At a scan rate of $0.50\ \mathrm{V\,s^{-1}}$ a one-electron couple ($D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$, $25\,^\circ\mathrm{C}$) shows $\Delta E_\mathrm{p} = 72\ \mathrm{mV}$, corresponding to Nicholson's $\psi = 2$. What is $k^\circ$?
- [ ] $2.0\ \mathrm{cm\,s^{-1}}$
- [x] about $0.05\ \mathrm{cm\,s^{-1}}$
- [ ] about $0.025\ \mathrm{cm\,s^{-1}}$
- [ ] It cannot be found from one scan rate
::: solution
$\sqrt{\pi Df_nv} = \sqrt{\pi\times1.0\times10^{-5}\times38.92\times0.50}\ \mathrm{cm\,s^{-1}} = 0.0247\ \mathrm{cm\,s^{-1}}$, so $k^\circ = \psi\times0.0247 = 0.049\ \mathrm{cm\,s^{-1}}$. One scan rate suffices in principle, though a series of rates, each giving the same $k^\circ$, is the proper check that the peak separation is kinetic and not caused by uncompensated resistance.
:::
:::

::: warning Uncompensated resistance looks like slow kinetics {#warn-ir}
The potentiostat controls the potential between the working and reference electrodes, but the solution resistance $R_\mathrm{u}$ between the reference tip and the working electrode adds an error $iR_\mathrm{u}$ to the true interfacial potential. Because $i_\mathrm{p}$ grows with $\sqrt{v}$, the ohmic shift of each peak grows too, and the peaks separate with increasing scan rate — exactly the signature of slow electron transfer. With $R_\mathrm{u} = 500\ \Omega$ (typical of acetonitrile with $0.1\ \mathrm{mol\,dm^{-3}}$ electrolyte at a millimetre-sized electrode) and $i_\mathrm{p} = 20\ \mu\mathrm{A}$, each peak shifts by $10\ \mathrm{mV}$ and $\Delta E_\mathrm{p}$ grows by $20\ \mathrm{mV}$ — enough to make a fast couple look quasi-reversible. Use positive-feedback compensation, smaller electrodes or lower concentrations, and test with an internal standard of known fast kinetics such as ferrocene. Do not infer slow kinetics from $\Delta E_\mathrm{p}$ until $iR_\mathrm{u}$ has been ruled out.
:::

Chemical reactions coupled to the electron transfer leave their own signatures, and their classification by letters — E for an electron transfer, C for a homogeneous chemical step — is the standard language of mechanistic electrochemistry. In an **EC** mechanism the product R decomposes with rate constant $k$; when $k\tau \gg 1$ (decomposition fast compared with the time $RT/Fv$) the return peak disappears and the forward peak shifts positive by about $30\ \mathrm{mV}$ per decade of $k/v$, and speeding up the scan until the return peak reappears gives $k$. In an **ECE** mechanism the product of the chemical step is itself electroactive at the applied potential, so the forward peak current grows above the one-electron value. A **catalytic (EC′)** mechanism, in which R reacts with a substrate to regenerate O, turns the peak into an S-shaped catalytic wave whose plateau measures the catalytic rate constant — the method of choice for evaluating molecular catalysts for $\mathrm{CO_2}$ reduction and hydrogen evolution. All these cases are now analysed by digital simulation, fitting the full current–potential–time behaviour rather than single features.

::: algorithm Interpreting a cyclic voltammogram {#alg-cv}
1. Record a background CV of electrolyte alone and an internal standard (e.g. ferrocene) to fix the potential scale and check $R_\mathrm{u}$.
2. Measure $i_\mathrm{p}$ at several scan rates. Linear in $v^{1/2}$ through the origin: diffusing species. Linear in $v$: adsorbed species.
3. Measure $\Delta E_\mathrm{p}$ and its dependence on $v$. About $57/n\ \mathrm{mV}$ and constant: reversible; take $n$ from $\Delta E_\mathrm{p}$ (or from $i_\mathrm{p}$ with known $D$) and $E^{\circ\prime}$ from the midpoint. Increasing with $v$ after $iR_\mathrm{u}$ correction: quasi-reversible; obtain $k^\circ$ from Nicholson's $\psi$.
4. Measure $i_\mathrm{p,a}/i_\mathrm{p,c}$ (from the proper baseline). Less than one and rising towards one at faster scans: a following chemical reaction (EC); estimate its rate from the scan rate at which the ratio recovers.
5. Confirm the proposed mechanism by simulating the whole voltammogram at several scan rates and concentrations.
:::

::: history From the dropping mercury electrode to cyclic voltammetry {#hist-voltammetry}
Walther Nernst introduced the diffusion layer in 1904, and Frederick Cottrell solved the potential-step problem in 1903. Jaroslav Heyrovský's invention of polarography with the dropping mercury electrode in 1922, whose continually renewed surface gave reproducible currents, made current–potential curves a routine analytical tool and earned him the 1959 Nobel Prize in Chemistry; Dionýz Ilkovič's 1934 equation gave the diffusion current at the growing drop. John Randles and Augustin Ševčík independently derived the linear-sweep peak current in 1948. Veniamin Levich solved convective diffusion at the rotating disc in 1942, and Jaroslav Koutecký and Levich added kinetics in the 1950s. Richard Nicholson and Irving Shain's 1964 paper in *Analytical Chemistry* gave the theory of stationary-electrode voltammetry for reversible, irreversible and coupled-chemical cases and made cyclic voltammetry the standard method for studying redox mechanisms; Nicholson's 1965 working curve for $k^\circ$ followed. Microelectrodes were developed from the late 1970s, notably by Martin Fleischmann and Mark Wightman.
:::

## Where this leads

The tools of this chapter run through the rest of the course. Rotating-disc and Koutecký–Levich measurements are the standard tests of oxygen-reduction and hydrogen-evolution catalysts ([[electrochemistry/fuel-cells-electrolysis]]); cyclic voltammetry measures the potential windows of battery electrolytes and the insertion potentials of electrode materials, and diffusion limitations in the electrolyte and inside particles set the rate capability of batteries ([[electrochemistry/batteries]]); polarisation curves with mass-transport plateaus — the oxygen-diffusion limit is the classic one — decide corrosion rates in aerated water ([[electrochemistry/corrosion]]). In analysis, pulse methods, stripping voltammetry and amperometric sensors build directly on these ideas ([[analytical-chemistry/electroanalytical]]). The same CV language is used across molecular chemistry: redox potentials of metal complexes ([[coordination-chemistry/coordination-compounds]]) and frontier-orbital energies of organic semiconductors are routinely read from voltammograms.

::: summary
- Species reach an electrode by diffusion, migration and convection (Nernst–Planck); an excess of supporting electrolyte suppresses migration by making the analyte's transport number tiny.
- In the diffusion-layer model the limiting current is $nFAmc^*$ with $m = D/\delta$; the reversible steady-state wave is $E = E_{1/2} + (RT/nF)\ln[(i_\mathrm{l} - i)/i]$, and the ratio $k^\circ/m$ decides whether a wave is reversible.
- At a rotating disc, $\delta = 1.61D^{1/3}\omega^{-1/2}\nu^{1/6}$ and $i_\mathrm{l} = 0.620nFAD^{2/3}\omega^{1/2}\nu^{-1/6}c^*$ (Levich); $1/i = 1/i_\mathrm{k} + 1/i_\mathrm{l}$ (Koutecký–Levich) separates kinetics from transport and gives $n$.
- Microelectrodes reach a steady state, $i_\mathrm{ss} = 4nFDc^*r_0$ for a disc, in times of order $r_0^2/D$, with small ohmic drop and capacitance.
- For a reversible couple in CV, $i_\mathrm{p} = 0.4463nFAc^*(nFvD/RT)^{1/2} \propto v^{1/2}$, $\Delta E_\mathrm{p} \approx 57/n\ \mathrm{mV}$, $E^{\circ\prime}$ at the midpoint; adsorbed species give $i_\mathrm{p} \propto v$.
- Slow electron transfer widens $\Delta E_\mathrm{p}$ with scan rate (Nicholson's $\psi$ gives $k^\circ$), but uncompensated resistance does the same; following chemical reactions (EC, ECE, EC′) change the return peak and the current and are analysed by simulation.
:::

## Exercises

::: exercise A Randles–Ševčík peak {level=1 check="19.0"}
Find the peak current for a reversible one-electron reduction at a $3.0\ \mathrm{mm}$ disc ($A = 0.0707\ \mathrm{cm^2}$) with $c^* = 1.0\ \mathrm{mmol\,dm^{-3}}$, $D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$ and $v = 0.10\ \mathrm{V\,s^{-1}}$ at $25\,^\circ\mathrm{C}$. (Enter $i_\mathrm{p}$ in $\mu\mathrm{A}$.)
::: solution
$i_\mathrm{p} = 2.69\times10^{5}\times1\times0.0707\times(1.0\times10^{-5})^{1/2}\times(0.10)^{1/2}\times1.0\times10^{-6}\ \mathrm{A} = 2.69\times10^{5}\times0.0707\times3.162\times10^{-3}\times0.3162\times10^{-6} = 1.90\times10^{-5}\ \mathrm{A} = 19.0\ \mu\mathrm{A}$.
:::
:::

::: exercise Peak separation for two electrons {level=1 check="28.5"}
What peak separation is expected at $25\,^\circ\mathrm{C}$ for a reversible two-electron couple, assuming both electrons are transferred at the same potential? (Enter $\Delta E_\mathrm{p}$ in mV.)
::: solution
$\Delta E_\mathrm{p} = 2.218RT/nF = 2.218\times25.69/2\ \mathrm{mV} = 28.5\ \mathrm{mV}$. In practice two-electron couples often show larger separations, because the two electrons are transferred in separate steps at different potentials, and the voltammogram then reflects the spacing of the two formal potentials.
:::
:::

::: exercise Steady state at a microdisc {level=1 check="7.72"}
Find the steady-state limiting current at a microdisc of radius $10\ \mu\mathrm{m}$ for a one-electron reaction of a species at $2.0\ \mathrm{mmol\,dm^{-3}}$ with $D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$. (Enter $i_\mathrm{ss}$ in nA.)
::: solution
$i_\mathrm{ss} = 4nFDc^*r_0 = 4\times96\,485\times1.0\times10^{-5}\times2.0\times10^{-6}\times1.0\times10^{-3}\ \mathrm{A} = 7.72\times10^{-9}\ \mathrm{A} = 7.72\ \mathrm{nA}$, with $r_0 = 1.0\times10^{-3}\ \mathrm{cm}$. The current is proportional to the radius, not the area: halve the radius and the current halves while the current *density* doubles.
:::
:::

::: exercise A diffusion coefficient from the Levich equation {level=2 check="1.08"}
An RDE of area $0.196\ \mathrm{cm^2}$ at $900\ \mathrm{rpm}$ gives a limiting current of $0.120\ \mathrm{mA}$ for a one-electron reduction of a species at $1.0\ \mathrm{mmol\,dm^{-3}}$ in water ($\nu = 0.010\ \mathrm{cm^2\,s^{-1}}$). Find $D$. (Enter $D$ in $10^{-5}\ \mathrm{cm^2\,s^{-1}}$.)
::: solution
$\omega = 900\times2\pi/60 = 94.25\ \mathrm{rad\,s^{-1}}$. From [[#eq-levich]],
$$
D^{2/3} = \frac{i_\mathrm{l}}{0.620\,nFA\,\omega^{1/2}\nu^{-1/6}c^*} = \frac{1.20\times10^{-4}}{0.620\times96\,485\times0.196\times9.708\times2.154\times1.0\times10^{-6}} = 4.89\times10^{-4},
$$
so $D = (4.89\times10^{-4})^{3/2} = 1.08\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$. The $2/3$ power makes $D$ sensitive to errors in $i$: a $3\,\%$ error in current gives $4.5\,\%$ in $D$.
:::
:::

::: exercise Scan-rate dependence {level=2 check="40"}
A diffusion-controlled reversible couple gives $i_\mathrm{p} = 10\ \mu\mathrm{A}$ at $0.050\ \mathrm{V\,s^{-1}}$ and $20\ \mu\mathrm{A}$ at $0.20\ \mathrm{V\,s^{-1}}$. Predict $i_\mathrm{p}$ at $0.80\ \mathrm{V\,s^{-1}}$, and the value you would expect at $0.80\ \mathrm{V\,s^{-1}}$ if the species were instead adsorbed with $i_\mathrm{p} = 10\ \mu\mathrm{A}$ at $0.050\ \mathrm{V\,s^{-1}}$. (Enter the diffusion-controlled $i_\mathrm{p}$ in $\mu\mathrm{A}$.)
::: solution
$i_\mathrm{p} \propto v^{1/2}$: from $0.050$ to $0.80\ \mathrm{V\,s^{-1}}$ is a factor of $16$ in $v$, $4$ in $i_\mathrm{p}$: $40\ \mu\mathrm{A}$. The data given already fit this law ($\times4$ in $v$, $\times2$ in $i_\mathrm{p}$). An adsorbed species would scale with $v$: $160\ \mu\mathrm{A}$. A plot of $\log i_\mathrm{p}$ against $\log v$ with slope $0.5$ or $1$ distinguishes the cases at a glance; intermediate slopes indicate mixed behaviour.
:::
:::

::: exercise The Tomeš criterion {level=2 check="56.5"}
Show from [[#eq-wave]] that for a reversible steady-state wave $E_{1/4} - E_{3/4} = (RT/nF)\ln 9$, and evaluate it for $n = 1$ at $25\,^\circ\mathrm{C}$. (Enter it in mV.)
::: solution
At $i = i_\mathrm{l}/4$, $(i_\mathrm{l} - i)/i = 3$; at $i = 3i_\mathrm{l}/4$, it is $1/3$. So $E_{1/4} - E_{3/4} = (RT/nF)[\ln3 - \ln(1/3)] = (RT/nF)\ln9 = 25.69\times2.197\ \mathrm{mV} = 56.5\ \mathrm{mV}$ for $n = 1$. A measured value of $57\ \mathrm{mV}$ indicates a reversible one-electron wave; $28\ \mathrm{mV}$ a reversible two-electron wave; a value well above $56.5/n$ indicates slow kinetics.
:::
:::

::: exercise A rate constant from peak separation {level=3 check="0.0350"}
A one-electron couple with $D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$ shows, after correction for uncompensated resistance, $\Delta E_\mathrm{p} = 84\ \mathrm{mV}$ at $1.00\ \mathrm{V\,s^{-1}}$ and $25\,^\circ\mathrm{C}$. Using Nicholson's value $\psi = 1$ for this separation, find $k^\circ$. At what scan rate would $\Delta E_\mathrm{p}$ reach $212\ \mathrm{mV}$ ($\psi = 0.1$)? (Enter $k^\circ$ in $\mathrm{cm\,s^{-1}}$.)
::: hint
$\psi \propto v^{-1/2}$ at fixed $k^\circ$ and $D$.
:::
::: solution
$k^\circ = \psi\sqrt{\pi Dfv} = 1\times\sqrt{\pi\times1.0\times10^{-5}\times38.92\times1.00}\ \mathrm{cm\,s^{-1}} = 0.0350\ \mathrm{cm\,s^{-1}}$. To reduce $\psi$ tenfold, $v$ must increase a hundredfold, to $100\ \mathrm{V\,s^{-1}}$ — feasible only at a microelectrode, where both $iR_\mathrm{u}$ and the charging current remain manageable. Couples faster than about $1\ \mathrm{cm\,s^{-1}}$ need sweeps of thousands of volts per second or steady-state methods with very small electrodes.
:::
:::

::: exercise Koutecký–Levich analysis {level=3 check="2.0"}
Derive the Koutecký–Levich equation for an irreversible reduction with rate constant $k_\mathrm{f}$ at a rotating disc. For the oxygen-reduction data of [[#ex-kl]], suppose a different catalyst gives the same slope but an intercept of $1.00\ \mathrm{mA^{-1}}$. What are its $n$ and kinetic current, and by what factor is it less active than the first? (Enter the factor.)
::: solution
At steady state the reaction rate equals the transport flux: $i/nFA = k_\mathrm{f}c(0) = m(c^* - c(0))$; eliminating $c(0)$ gives $1/i = 1/(nFAk_\mathrm{f}c^*) + 1/(nFAmc^*)$, with $m = D/\delta \propto \omega^{1/2}$. The same slope means the same $B$, hence the same $n = 4$ (with the same $D$, $\nu$, $c^*$). The intercept gives $i_\mathrm{k} = 1/1.00 = 1.00\ \mathrm{mA}$, half the $2.00\ \mathrm{mA}$ of the first catalyst, so it is $2.0$ times less active at this potential (its $k_\mathrm{f}$ is $0.011\ \mathrm{cm\,s^{-1}}$). Comparing catalysts by $i_\mathrm{k}$ at a fixed potential, normalised to the electrochemically active surface area, is the convention in fuel-cell research; comparing raw currents at one rotation rate would understate the difference because transport limitation compresses it.
:::
:::

::: exercise Hemispherical diffusion {level=3 check="12.1"}
Show that the steady-state concentration around a hemispherical electrode of radius $r_0$ held at the limiting potential is $c(r) = c^*(1 - r_0/r)$, and hence that $i_\mathrm{ss} = 2\pi nFDc^*r_0$. Evaluate it for $r_0 = 10\ \mu\mathrm{m}$, $n = 1$, $D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$ and $c^* = 2.0\ \mathrm{mmol\,dm^{-3}}$. (Enter $i_\mathrm{ss}$ in nA.)
::: hint
In spherical symmetry the steady diffusion equation is $\frac{1}{r^2}\frac{\mathrm{d}}{\mathrm{d}r}\left(r^2\frac{\mathrm{d}c}{\mathrm{d}r}\right) = 0$.
:::
::: solution
Integrating once, $r^2\,\mathrm{d}c/\mathrm{d}r = $ constant $= a$; again, $c = b - a/r$. The conditions $c(\infty) = c^*$ and $c(r_0) = 0$ give $b = c^*$ and $a = c^*r_0$, so $c = c^*(1 - r_0/r)$. The flux at the surface is $D(\mathrm{d}c/\mathrm{d}r)_{r_0} = Dc^*/r_0$, and over the area $2\pi r_0^2$ of the hemisphere the current is $i_\mathrm{ss} = nF\times2\pi r_0^2\times Dc^*/r_0 = 2\pi nFDc^*r_0$. Numerically, $2\pi\times96\,485\times1.0\times10^{-5}\times2.0\times10^{-6}\times1.0\times10^{-3}\ \mathrm{A} = 1.21\times10^{-8}\ \mathrm{A} = 12.1\ \mathrm{nA}$. The inlaid disc of the same radius gives $4/2\pi = 0.64$ times this ($7.7\ \mathrm{nA}$, as in the earlier exercise), because the insulating plane blocks part of the solution. The concentration recovers as $1/r$ — half its bulk value at twice the radius — which is why microelectrodes sample only a tiny volume around themselves.
:::
:::
