More transistors are made each year than any other manufactured object in history — a single phone processor contains well over ten billion of them — and essentially all of them are **metal–oxide–semiconductor field-effect transistors** (MOSFETs). The MOSFET won because it is a nearly perfect switch for digital logic: its gate draws no DC current, an n-channel and a p-channel device can be paired so that a logic gate draws power only when it switches (CMOS), and, above all, it can be shrunk. For four decades every reduction of its dimensions made it faster, cheaper and more frugal at the same time.

A MOSFET is a MOS capacitor ([[semiconductor-devices/mos-capacitor]]) with two heavily doped regions, the **source** and **drain**, on either side of the gate. When the gate voltage exceeds the threshold, the inversion layer at the surface forms a conducting **channel** between them; a drain voltage then drives a current through it. This chapter derives the long-channel current–voltage characteristics using the **gradual-channel approximation**, adds the **body effect** and **channel-length modulation**, examines conduction **below threshold**, which sets the leakage of every chip, and then turns to what happens when the channel becomes short: **velocity saturation**, **short-channel effects** and the physics and history of **scaling**, up to the FinFETs and gate-all-around transistors in production as of 2026. MOSFET circuits are the subject of [[electronics-1/mosfet-circuits]] and [[digital-ic]].

## Structure and operation

An **n-channel MOSFET** (nMOS) is built in a p-type body (substrate or well) with acceptor concentration $N_A$. The gate, of length $L$ (source to drain) and width $W$, sits on an oxide of capacitance $C_{ox}$ per unit area. The $\mathrm{n^+}$ source and drain form pn junctions with the body, which are kept at zero or reverse bias. We measure all voltages from the source: gate–source $V_{GS}$, drain–source $V_{DS}$, and source–body $V_{SB} \ge 0$. A **p-channel MOSFET** (pMOS) is the mirror image, in an n-type well, with all voltages and currents reversed; its hole mobility is two to three times lower, so it must be wider to carry the same current.

With $V_{GS}$ below the threshold voltage $V_{th}$, the source and drain are two back-to-back pn junctions and almost no current flows: the transistor is **off**. With $V_{GS} > V_{th}$, an inversion layer of electrons connects them. The $\mathrm{n^+}$ source supplies electrons to it directly, so unlike in the isolated MOS capacitor the inversion layer forms in picoseconds. A positive $V_{DS}$ then draws electrons from source to drain: the transistor is **on**, and the gate voltage controls how much charge is available to carry current.

## Long-channel current–voltage characteristics

### The gradual-channel approximation

Let $y$ run along the channel from the source ($y = 0$) to the drain ($y = L$), and let $V(y)$ be the potential of the channel (strictly, of the electron quasi-Fermi level) relative to the source, rising from $0$ to $V_{DS}$. The inversion layer at position $y$ is a MOS capacitor whose "substrate" is at potential $V(y)$ rather than $0$. If the channel potential varies slowly along $y$ compared with the vertical variation set by the gate — that is, if the field along the channel is much smaller than the field across the oxide — each slice of the channel can be treated as a one-dimensional MOS capacitor. This is the **gradual-channel approximation**, valid when $L$ is much greater than the oxide thickness and depletion width.

::: theorem Long-channel MOSFET current (square law) {#thm-square-law}
Under the gradual-channel approximation, with constant mobility $\mu_n$, and neglecting the variation of depletion charge along the channel, the drain current of an n-channel MOSFET is

$$
I_D = \mu_nC_{ox}\frac{W}{L}\left[(V_{GS} - V_{th})V_{DS} - \frac{V_{DS}^2}{2}\right] \qquad (0 \le V_{DS} \le V_{GS} - V_{th}),
$$ {#eq-triode}

$$
I_D = \frac{\mu_nC_{ox}}{2}\frac{W}{L}(V_{GS} - V_{th})^2 \qquad (V_{DS} \ge V_{GS} - V_{th}),
$$ {#eq-saturation}

and $I_D = 0$ for $V_{GS} \le V_{th}$. The first region is the **triode** (or linear) region; the second is **saturation**, which begins at $V_{DS,\text{sat}} = V_{GS} - V_{th}$.
:::

::: proof
At position $y$ the gate-to-channel voltage is $V_{GS} - V(y)$, so by [[semiconductor-devices/mos-capacitor#eq-qinv]] the inversion charge per unit area is

$$
Q_{inv}(y) = -C_{ox}\left[V_{GS} - V(y) - V_{th}\right].
$$

Electrons drift along $y$ in the field $-\mathrm dV/\mathrm dy$ with velocity $\mu_n\,\mathrm dV/\mathrm dy$ towards the drain; since the inversion layer is very thin, the current crossing a slice of the channel is the charge per unit length times the velocity. Taking $I_D$ positive into the drain,

$$
I_D = -WQ_{inv}(y)\,\mu_n\frac{\mathrm dV}{\mathrm dy} = W\mu_nC_{ox}\left[V_{GS} - V_{th} - V(y)\right]\frac{\mathrm dV}{\mathrm dy}.
$$

In steady state $I_D$ is the same at every $y$ (current is continuous and no current flows into the gate), so we may integrate both sides from source to drain:

$$
I_DL = W\mu_nC_{ox}\int_0^{V_{DS}}\left[V_{GS} - V_{th} - V\right]\mathrm dV = W\mu_nC_{ox}\left[(V_{GS} - V_{th})V_{DS} - \tfrac12V_{DS}^2\right],
$$

which is [[#eq-triode]]. This expression reaches its maximum at $V_{DS} = V_{GS} - V_{th}$, where $Q_{inv}(L) = 0$: the channel is **pinched off** at the drain end. Increasing $V_{DS}$ further does not increase the current in this model: the extra voltage is dropped across a short depleted region between the pinch-off point and the drain, through which electrons arriving from the channel are swept by the strong field, just as carriers are swept through the collector junction of a bipolar transistor. Substituting $V_{DS} = V_{GS} - V_{th}$ into [[#eq-triode]] gives [[#eq-saturation]].
:::

For small $V_{DS}$ the quadratic term is negligible and the channel behaves as a resistor, $R_{on} = 1/[\mu_nC_{ox}(W/L)(V_{GS} - V_{th})]$, controlled by the gate: this is how a MOSFET is used as an analogue switch or a power switch. In saturation the current depends only on $V_{GS}$, and the device is a voltage-controlled current source: this is how it is used as an amplifier. The quantity $V_{ov} = V_{GS} - V_{th}$ is the **overdrive** voltage, and $k_n' = \mu_nC_{ox}$ is the **process transconductance parameter**.

::: warning The channel mobility is not the bulk mobility
The electrons in the inversion layer move within a nanometre or two of the oxide interface and are scattered by surface roughness and by the strong vertical field, as well as by phonons and Coulomb scattering. The **effective mobility** in a silicon nMOS channel is typically $200$–$500\,\mathrm{cm^2/(V\,s)}$, well below the bulk value of $1360$ from [[semiconductor-devices/carrier-transport]], and it decreases as the gate voltage (and hence the vertical field) increases. Using the bulk mobility in [[#thm-square-law]] overestimates currents by a factor of three or more. Strained silicon, introduced at the 90 nm generation, raises the channel mobility by bending the bands.
:::

::: example Currents of a long-channel nMOS {#ex-square-law}
An nMOS transistor has $W = 10\,\mathrm{\mu m}$, $L = 1\,\mathrm{\mu m}$, $t_{ox} = 10\,\mathrm{nm}$, $\mu_n = 400\,\mathrm{cm^2/(V\,s)}$ and $V_{th} = 0.5\,\mathrm V$. With $V_{GS} = 1.5\,\mathrm V$, find (a) the current at $V_{DS} = 0.1\,\mathrm V$ and the on-resistance, (b) $V_{DS,\text{sat}}$ and the saturation current, (c) the transconductance $g_m = \partial I_D/\partial V_{GS}$ in saturation.
::: solution
$C_{ox} = 3.45\times10^{-7}\,\mathrm{F/cm^2}$, so $\mu_nC_{ox}W/L = 400\times3.45\times10^{-7}\times10 = 1.38\times10^{-3}\,\mathrm{A/V^2}$, and $V_{ov} = 1.0\,\mathrm V$.

(a) $I_D = 1.38\times10^{-3}[1.0\times0.1 - 0.005] = 1.31\times10^{-4}\,\mathrm A = 131\,\mathrm{\mu A}$. For small $V_{DS}$, $R_{on} = 1/(1.38\times10^{-3}\times1.0) = 724\,\Omega$.

(b) $V_{DS,\text{sat}} = 1.0\,\mathrm V$ and $I_{D,\text{sat}} = \tfrac12(1.38\times10^{-3})(1.0)^2 = 0.69\,\mathrm{mA}$.

(c) $g_m = \mu_nC_{ox}(W/L)V_{ov} = 1.38\,\mathrm{mS}$, equivalently $2I_D/V_{ov} = 2(0.69)/1.0 = 1.38\,\mathrm{mS}$. A bipolar transistor at the same current would have $g_m = I_C/V_T = 0.69/0.02585 = 26.7\,\mathrm{mS}$, nineteen times more: the MOSFET's square law is a much weaker dependence than the BJT's exponential, unless the MOSFET is operated near threshold.
:::
:::

::: widget plot
f: 1.381*if(x < 0.5, 0.5*x - x^2/2, 0.125)*(1 + l*x); 1.381*if(x < 1, x - x^2/2, 0.5)*(1 + l*x); 1.381*if(x < 1.5, 1.5*x - x^2/2, 1.125)*(1 + l*x); 1.381*x^2/2
x: 0, 3
y: 0, 2.2
sliders: l=0.05:0:0.2:0.005
labels: V_{GS} = 1.0\,\mathrm V; 1.5\,\mathrm V; 2.0\,\mathrm V; V_{DS} = V_{ov}
caption: Output characteristics, $I_D$ in milliamperes against $V_{DS}$ in volts, of the transistor of the example ($\mu_nC_{ox}W/L = 1.38\,\mathrm{mA/V^2}$, $V_{th} = 0.5\,\mathrm V$) for three gate voltages, with channel-length modulation $\lambda = l$ in $\mathrm{V^{-1}}$. The parabola $I_D = \tfrac12k(V_{DS})^2$ through the knees separates triode (left) from saturation (right). Notice that the saturation currents rise as the square of the overdrive: $0.17$, $0.69$ and $1.55\,\mathrm{mA}$ for overdrives of $0.5$, $1$ and $1.5\,\mathrm V$. Set $l = 0$: the ideal square law with perfectly flat saturation.
:::

### The body effect

If the source is raised above the body ($V_{SB} > 0$), the channel must invert a surface whose potential relative to the body is now $2\phi_F + V_{SB}$, and the depletion region under the channel is wider. The gate must support more depletion charge, so the threshold rises.

::: proposition Body effect {#prop-body}
With source–body voltage $V_{SB} \ge 0$,

$$
V_{th} = V_{th0} + \gamma\left(\sqrt{2\phi_F + V_{SB}} - \sqrt{2\phi_F}\right), \qquad \gamma = \frac{\sqrt{2q\varepsilon_sN_A}}{C_{ox}},
$$ {#eq-body}

where $V_{th0}$ is the threshold at $V_{SB} = 0$ from [[semiconductor-devices/mos-capacitor#thm-vth]] and $\gamma$ is the **body-effect coefficient** (in $\mathrm{V^{1/2}}$).
:::

::: proof
At threshold the surface potential relative to the body is $2\phi_F + V_{SB}$, because the inversion layer is connected to the source and must be inverted relative to the source's electron quasi-Fermi level. The depletion charge is then $-\sqrt{2q\varepsilon_sN_A(2\phi_F + V_{SB})}$. Measured from the source, the gate voltage required is $V_{FB} + 2\phi_F + \sqrt{2q\varepsilon_sN_A(2\phi_F + V_{SB})}/C_{ox}$ (the $V_{SB}$ in the surface potential is cancelled by measuring $V_G$ from the source rather than from the body). Subtracting the value at $V_{SB} = 0$ gives [[#eq-body]].
:::

::: example Threshold shift in a stacked transistor {#ex-body}
In a NAND gate, the upper nMOS transistor of a two-transistor stack has its source at about $1\,\mathrm V$ above the grounded body during switching. For $N_A = 10^{17}\,\mathrm{cm^{-3}}$ and $t_{ox} = 10\,\mathrm{nm}$, find $\gamma$ and the threshold increase for $V_{SB} = 1$ and $2\,\mathrm V$.
::: solution
$\gamma = \sqrt{2(1.602\times10^{-19})(1.036\times10^{-12})(10^{17})}/3.45\times10^{-7} = 1.822\times10^{-7}/3.45\times10^{-7} = 0.528\,\mathrm{V^{1/2}}$, and $2\phi_F = 0.833\,\mathrm V$. For $V_{SB} = 1\,\mathrm V$: $\Delta V_{th} = 0.528(\sqrt{1.833} - \sqrt{0.833}) = 0.528(1.354 - 0.913) = 0.233\,\mathrm V$. For $2\,\mathrm V$: $0.528(\sqrt{2.833} - 0.913) = 0.528(1.683 - 0.913) = 0.407\,\mathrm V$. The increase is sublinear in $V_{SB}$. It slows stacked gates, and in analogue circuits it makes the source follower's gain less than one. Lighter body doping or thinner oxide reduces $\gamma$; transistors on thin silicon-on-insulator films nearly eliminate it.
:::
:::

### Channel-length modulation

In saturation, increasing $V_{DS}$ moves the pinch-off point towards the source: the depleted region near the drain lengthens by $\Delta L$, and the effective channel length becomes $L - \Delta L$. Since $I_D \propto 1/L$, the current rises slightly with $V_{DS}$. This is the MOSFET analogue of the Early effect ([[semiconductor-devices/bipolar-transistors#prop-early]]) and is modelled empirically as

$$
I_D = \frac{\mu_nC_{ox}}{2}\frac{W}{L}(V_{GS} - V_{th})^2(1 + \lambda V_{DS}),
$$ {#eq-clm}

with $\lambda$ roughly inversely proportional to $L$. The small-signal output resistance is $r_o \approx 1/(\lambda I_D)$; for the transistor of [[#ex-square-law]] with $\lambda = 0.05\,\mathrm{V^{-1}}$, $r_o = 1/(0.05\times0.69\times10^{-3}) = 29\,\mathrm{k\Omega}$. The intrinsic gain $g_mr_o = 2/(\lambda V_{ov})$ is $40$ here — much less than a BJT's $V_A/V_T$, which is why analogue MOS design relies on cascodes and long channels.

::: quiz
An nMOS transistor in saturation carries $200\,\mathrm{\mu A}$. Its gate voltage is increased so that the overdrive doubles, with $V_{DS}$ large enough to stay in saturation. What is the new current in the square-law model?
- [ ] $400\,\mathrm{\mu A}$
- [x] $800\,\mathrm{\mu A}$
- [ ] $283\,\mathrm{\mu A}$
- [ ] $200\,\mathrm{\mu A}$, because the current is saturated
::: solution
$I_D \propto V_{ov}^2$ in saturation, so doubling $V_{ov}$ multiplies the current by four: $800\,\mathrm{\mu A}$. "Saturation" refers to the current's (near) independence of $V_{DS}$, not of $V_{GS}$.
:::
:::

## Below threshold

The square law predicts zero current for $V_{GS} < V_{th}$, but a real transistor conducts below threshold, and that **subthreshold** current is the off-state leakage of every CMOS chip. Below threshold the surface is in weak inversion: the electron concentration at the surface, $n_s \propto e^{\psi_s/V_T}$, is small but not zero. There is almost no field along the channel, because the surface potential is set by the gate and is nearly the same at both ends, but $n_s$ is higher at the source end than at the drain end (where the drain's reverse bias pulls the quasi-Fermi level down by $V_{DS}$). The current is therefore **diffusion**, like the collector current of a bipolar transistor, and it depends exponentially on the surface potential.

The gate does not control $\psi_s$ perfectly. A change $\mathrm dV_{GS}$ is divided between the oxide capacitance and the depletion capacitance $C_d = \varepsilon_s/W_d$ (a capacitive divider), so $\mathrm d\psi_s/\mathrm dV_{GS} = C_{ox}/(C_{ox} + C_d) = 1/n$.

::: theorem Subthreshold current {#thm-subthreshold}
Below threshold, in a long-channel MOSFET,

$$
I_D = I_0\,e^{(V_{GS} - V_{th})/nV_T}\left(1 - e^{-V_{DS}/V_T}\right), \qquad n = 1 + \frac{C_d}{C_{ox}},
$$ {#eq-subthreshold}

where $I_0$ is of order $\mu_nC_{ox}(W/L)V_T^2$ (the current at threshold). The **subthreshold swing**, the gate-voltage change for a decade of current, is

$$
S = \left(\frac{\mathrm d\log_{10}I_D}{\mathrm dV_{GS}}\right)^{-1} = nV_T\ln10 = 59.5\,\mathrm{mV/decade}\times n \quad\text{at } 300\,\mathrm K.
$$ {#eq-swing}
:::

A sketch of the derivation: the diffusion current along the channel is $qWD_n\,[n_s(0) - n_s(L)]\,x_{inv}/L$, where $x_{inv}$ is the effective thickness of the weak-inversion layer; the surface concentration at the source is $n_s(0) \propto e^{\psi_s/V_T}$ and at the drain $n_s(L) = n_s(0)e^{-V_{DS}/V_T}$, and $\psi_s$ changes with $V_{GS}$ at the rate $1/n$. The full derivation (Taur and Ning, chapter 3) gives the prefactor. The factor $(1 - e^{-V_{DS}/V_T})$ makes the current independent of $V_{DS}$ once $V_{DS}$ exceeds a few $V_T$.

The limit $n = 1$, $S = 60\,\mathrm{mV/dec}$ at room temperature, is reached only if the gate controls the surface perfectly ($C_d \ll C_{ox}$). It is a **fundamental limit for any transistor that works by thermionic injection over a barrier**, because the Boltzmann tail of the carrier distribution falls by a factor of ten for every $V_T\ln10$ of barrier height. It is why supply voltages could not keep falling: to switch from off to on with a ratio $I_{on}/I_{off} = 10^{5}$ needs at least $5\times60 = 300\,\mathrm{mV}$ of gate swing below threshold, plus overdrive above it.

::: example Subthreshold swing and leakage {#ex-subthreshold}
For the MOS structure of [[semiconductor-devices/mos-capacitor#ex-vth-ideal]] ($N_A = 10^{17}\,\mathrm{cm^{-3}}$, $t_{ox} = 10\,\mathrm{nm}$), evaluate $n$ and $S$, using the depletion capacitance at threshold. If the threshold is set to $0.3\,\mathrm V$, by what factor is the current at $V_{GS} = 0$ smaller than at $V_{GS} = V_{th}$? What threshold would a design with $S = 70\,\mathrm{mV/dec}$ need for an off-current six decades below the threshold current?
::: solution
At threshold $W_d = W_{d,\max} = 0.104\,\mathrm{\mu m}$, so $C_d = \varepsilon_s/W_{d,\max} = 9.98\times10^{-8}\,\mathrm{F/cm^2}$ and

$$
n = 1 + \frac{9.98\times10^{-8}}{3.45\times10^{-7}} = 1.289, \qquad S = 1.289\times59.5 = 76.7\,\mathrm{mV/dec}.
$$

With $V_{th} = 0.3\,\mathrm V$, the gate is $0.3\,\mathrm V$ below threshold at $V_{GS} = 0$: $0.3/0.0767 = 3.9$ decades, a factor of $1/8100$. For six decades with $S = 70\,\mathrm{mV/dec}$, $V_{th} \ge 6\times0.070 = 0.42\,\mathrm V$. These numbers show the squeeze of low-voltage design: a $0.7\,\mathrm V$ supply with $V_{th} = 0.42\,\mathrm V$ leaves only $0.28\,\mathrm V$ of overdrive. A thinner oxide (larger $C_{ox}$, smaller $n$) or a gate wrapped round a thin channel, which suppresses $C_d$, both bring $S$ towards $60\,\mathrm{mV/dec}$.
:::
:::

::: widget plot
f: log10(2*n*1.381e-3*0.02585^2*ln(1 + exp((x - h)/(2*n*0.02585)))^2); log10(1.381e-3/(2*n)*max(x - h, 0)^2)
x: 0, 1.5
y: -13, -2
sliders: n=1.3:1:2:0.01; h=0.5:0.2:0.8:0.01
labels: \text{smooth model}; \text{square law}
caption: Transfer characteristic $\log_{10}I_D$ (amperes) against $V_{GS}$ (volts) in saturation, for $\mu_nC_{ox}W/L = 1.38\,\mathrm{mA/V^2}$, threshold $V_{th} = h$ and slope factor $n$, using the interpolation $I_D = 2n\mu_nC_{ox}(W/L)V_T^2\ln^2[1 + e^{(V_{GS} - V_{th})/2nV_T}]$, which is exponential below threshold and quadratic above (with the slope factor included). Below threshold the curve is a straight line with slope $1/S$; at $n = 1.3$ it falls one decade per $77\,\mathrm{mV}$. Lower $n$ towards $1$ (better gate control): the off-current at $V_{GS} = 0$ falls by orders of magnitude. Raise $h$: less leakage, but less on-current at a given supply.
:::

## Short channels

The square law assumes a long channel. As $L$ shrinks, two things change: the field along the channel becomes strong enough to saturate the carrier velocity, and the drain's field reaches far enough into the channel to compete with the gate for control of the surface.

### Velocity saturation

At fields above about $10^4\,\mathrm{V/cm}$ the electron velocity saturates near $v_{\text{sat}} \approx 10^{7}\,\mathrm{cm/s}$ ([[semiconductor-devices/carrier-transport]]). In a channel only $30\,\mathrm{nm}$ long, $1\,\mathrm V$ corresponds to an average field of $3\times10^{5}\,\mathrm{V/cm}$, and velocity saturation dominates. Using the velocity law $v = \mu\mathcal E/(1 + \mathcal E/\mathcal E_{\text{sat}})$ in the derivation of [[#thm-square-law]] (with $\mathcal E_{\text{sat}} = 2v_{\text{sat}}/\mu$ chosen so that the model saturates at the right velocity) gives the **velocity-saturated saturation current**

$$
I_{D,\text{sat}} = WC_{ox}v_{\text{sat}}\frac{(V_{GS} - V_{th})^2}{(V_{GS} - V_{th}) + \mathcal E_{\text{sat}}L}.
$$ {#eq-vsat}

For $\mathcal E_{\text{sat}}L \gg V_{ov}$ (long channel) this reduces to the square law; for $\mathcal E_{\text{sat}}L \ll V_{ov}$ (very short channel) it becomes

$$
I_{D,\text{sat}} \to WC_{ox}v_{\text{sat}}(V_{GS} - V_{th}),
$$ {#eq-vsat-limit}

the inversion charge at the source, $C_{ox}V_{ov}$ per unit area, moving at the saturated velocity. The current is now **linear** in the overdrive and independent of $L$: shortening the channel no longer increases the current. The transconductance saturates at $WC_{ox}v_{\text{sat}}$.

::: example On-current of a short-channel nMOS {#ex-vsat}
A short-channel nMOS has $L = 30\,\mathrm{nm}$, an equivalent oxide thickness of $1\,\mathrm{nm}$ ($C_{ox} = 3.45\times10^{-6}\,\mathrm{F/cm^2}$), effective mobility $250\,\mathrm{cm^2/(V\,s)}$ and $v_{\text{sat}} = 10^{7}\,\mathrm{cm/s}$. Find the saturation current per micrometre of width at an overdrive of $0.5\,\mathrm V$ and compare with the square law and the velocity-saturation limit.
::: solution
$\mathcal E_{\text{sat}} = 2v_{\text{sat}}/\mu = 2\times10^{7}/250 = 8\times10^{4}\,\mathrm{V/cm}$, so $\mathcal E_{\text{sat}}L = 8\times10^{4}\times30\times10^{-7} = 0.24\,\mathrm V$. With $W = 1\,\mathrm{\mu m} = 10^{-4}\,\mathrm{cm}$, by [[#eq-vsat]],

$$
I_{D,\text{sat}} = (10^{-4})(3.45\times10^{-6})(10^{7})\frac{0.25}{0.5 + 0.24}\,\mathrm A = 3.45\times10^{-3}\times0.338 = 1.17\,\mathrm{mA}.
$$

The square law would give $\tfrac12(250)(3.45\times10^{-6})(10^{-4}/3\times10^{-6})(0.25) = 3.6\,\mathrm{mA}$, three times too much; the limit [[#eq-vsat-limit]] is $3.45\times10^{-3}\times0.5 = 1.73\,\mathrm{mA}$. The real figure for a transistor of this kind is near $1\,\mathrm{mA/\mu m}$, lower still because of source and drain series resistance — and somewhat raised by **velocity overshoot**, since electrons crossing a very short channel do not have time to reach the steady-state saturated velocity and briefly move faster.
:::
:::

::: widget plot
f: 1e3*1e-4*3.453e-6*1e7*x^2/(x + 8e4*L*1e-7); 1e3*250*3.453e-6*1e-4/(L*1e-7)*x^2/2; 1e3*1e-4*3.453e-6*1e7*x
x: 0, 1
y: 0, 3
sliders: L=30:10:500:5
labels: \text{velocity-saturated}; \text{square law}; WC_{ox}v_{sat}V_{ov}
caption: Saturation current per micrometre of width (mA/µm) against overdrive $V_{ov}$ (volts) for the transistor of the example with channel length $L$ (slider, nm): the velocity-saturation model [[#eq-vsat]], the long-channel square law and the short-channel limit. At $L = 500\,\mathrm{nm}$ the square law is still a fair description at low overdrive. Shorten the channel to $30\,\mathrm{nm}$: the square law overshoots wildly, and the true current approaches the straight line — linear in $V_{ov}$ and no longer improving with shorter $L$.
:::

### Short-channel effects

In a long transistor the gate alone controls the barrier that electrons must cross at the source end of the channel. In a short one, the depletion regions of the source and drain junctions extend under a significant fraction of the gate, and the drain's field penetrates to the source end. Several **short-channel effects** follow.

- **Threshold roll-off.** Part of the depletion charge under the gate is supported by the source and drain junctions rather than by the gate, so less gate voltage is needed: $V_{th}$ decreases as $L$ decreases.
- **Drain-induced barrier lowering (DIBL).** The drain voltage lowers the source-end barrier, so $V_{th}$ falls as $V_{DS}$ rises. It is quoted in $\mathrm{mV/V}$; well-designed short devices have DIBL below about $50$–$100\,\mathrm{mV/V}$. In the subthreshold region DIBL multiplies the off-current at full $V_{DS}$ by $10^{\text{DIBL}\times V_{DS}/S}$.
- **Punch-through.** In the extreme, the source and drain depletion regions merge below the surface and current flows deep in the body, out of the gate's control.
- **Degraded subthreshold swing**, since the drain and body capacitances compete with the gate capacitance.
- **Hot-carrier degradation.** Electrons accelerated in the high field near the drain gain enough energy to be injected into the oxide or to create interface traps, shifting the threshold over the transistor's life; **lightly doped drain** extensions were introduced in the 1980s to reduce the peak field.

The severity of these effects is governed by how the channel length compares with a **natural length** (or scale length) $\lambda$ over which the gate's control decays into the drain's. For a planar transistor, $\lambda \approx \sqrt{(\varepsilon_s/\varepsilon_{ox})t_{ox}W_d}$ to within a factor of order one; for a thin-body transistor, $W_d$ is replaced by the silicon thickness, and for a gate that surrounds the channel, $\lambda$ is smaller still. Short-channel effects are tolerable when $L$ exceeds roughly five to ten times $\lambda$. Thin oxides, shallow junctions, heavy channel doping and — since 2011 — three-dimensional gates are all ways of keeping $\lambda$ small.

## Scaling

In 1974 Robert Dennard and his colleagues at IBM showed how to shrink a MOSFET while preserving its behaviour: reduce all dimensions ($L$, $W$, $t_{ox}$, junction depth) **and** all voltages by the same factor $\kappa > 1$, and increase the doping by $\kappa$. Then every field in the device stays the same, and so does the shape of the depletion regions.

::: proposition Constant-field (Dennard) scaling {#prop-dennard}
Scaling dimensions and voltages by $1/\kappa$ and doping by $\kappa$ gives, for a long-channel or velocity-saturated device alike,

| quantity | scales as |
|---|---|
| dimensions $L, W, t_{ox}$; voltages $V_{DD}, V_{th}$ | $1/\kappa$ |
| doping $N_A$, $C_{ox}$ | $\kappa$ |
| current $I_D$, capacitance $C = C_{ox}WL$ | $1/\kappa$ |
| gate delay $CV/I$ | $1/\kappa$ |
| power per transistor $VI$ | $1/\kappa^2$ |
| transistor density | $\kappa^2$ |
| power density | $1$ |
| switching energy $CV^2$ | $1/\kappa^3$ |
:::

::: proof
$C_{ox} = \varepsilon_{ox}/t_{ox}$ scales as $\kappa$. In the square law, $I_D \propto \mu C_{ox}(W/L)V^2 \propto \kappa\cdot1\cdot\kappa^{-2} = \kappa^{-1}$; with velocity saturation, $I_D \propto WC_{ox}v_{\text{sat}}V \propto \kappa^{-1}\kappa\kappa^{-1} = \kappa^{-1}$ as well. The gate capacitance $C_{ox}WL \propto \kappa\kappa^{-2} = \kappa^{-1}$. The delay $CV/I \propto \kappa^{-1}\kappa^{-1}/\kappa^{-1} = \kappa^{-1}$. Power $VI \propto \kappa^{-2}$, and since the area per transistor scales as $\kappa^{-2}$, the power per unit area is constant. The depletion widths $\sqrt{\varepsilon V/(qN)} \propto \sqrt{\kappa^{-1}/\kappa} = \kappa^{-1}$ scale like the other dimensions, so the device geometry is a faithful miniature.
:::

With $\kappa = \sqrt2 \approx 1.4$ per generation, each generation doubled the density, made circuits about $30\,\%$ faster and cut the energy per switching event by about $65\,\%$, at constant power density. This is the engine behind **Moore's law**, the doubling of transistors per chip about every two years.

Dennard scaling ended in the mid-2000s, for a reason built into [[#thm-subthreshold]]: the threshold voltage cannot be scaled indefinitely, because the subthreshold swing does not scale (it is fixed by $kT/q$), and lowering $V_{th}$ by $60$–$80\,\mathrm{mV}$ multiplies the leakage by ten. Supply voltages therefore stalled around $0.7$–$1\,\mathrm V$, power density rose, and clock frequencies stopped increasing around $3$–$4\,\mathrm{GHz}$. Gate-oxide tunnelling stopped the thinning of SiO$_2$ at about $1.2\,\mathrm{nm}$, solved by high-k metal gates ([[semiconductor-devices/mos-capacitor]]). Since then improvements have come from new materials and structures rather than from uniform shrinking:

- **Strained silicon** (2003, 90 nm generation): stress from SiGe source/drain regions or nitride layers raises channel mobility.
- **High-k metal gate** (2007, 45 nm).
- **FinFET** (Intel 22 nm, 2011; others at 16/14 nm, 2014–2015): the channel is a thin vertical fin of silicon with the gate wrapped over three sides. The thin fin shrinks the natural length, restoring subthreshold swings near $65$–$70\,\mathrm{mV/dec}$ and allowing lightly doped channels.
- **Gate-all-around (GAA) nanosheets** (Samsung 3 nm, 2022; TSMC N2 and Intel 18A, entering volume production in late 2025): the channel is a stack of thin horizontal sheets, each surrounded completely by the gate, giving still better electrostatic control and a width that can be tuned by the sheet width.

As of 2026, the "node names" of leading processes (3 nm, 2 nm, 18A) no longer correspond to any physical dimension: the gate lengths are around $12$–$20\,\mathrm{nm}$ and the contacted gate pitch around $45$–$50\,\mathrm{nm}$. Density still increases, through tighter pitches, fewer fins per device, and design–technology co-optimisation; stacking n- and p-type transistors on top of each other (**complementary FET**, CFET) and supplying power from the back of the wafer are the next steps under development.

::: application The MOSFET as a power switch
At the other extreme of size, power MOSFETs switch tens of amperes at hundreds of volts in motor drives, chargers and converters. They are vertical devices: current flows from the source at the top through a short channel and then down through a lightly doped **drift region** to the drain at the back of the die, so that the blocking voltage is held by the drift region (as in the $100\,\mathrm V$ junction designed in [[semiconductor-devices/pn-junction]]) while the channel stays short. Their key figure of merit is the specific on-resistance $R_{on}A$, which for silicon grows roughly as $BV^{2.5}$ because a higher breakdown voltage requires a thicker and more lightly doped drift layer. Wide-gap materials, with ten times the critical field, break this trade-off: SiC MOSFETs dominate electric-vehicle inverters at $650$–$1200\,\mathrm V$, and GaN high-electron-mobility transistors are used in compact chargers and data-centre power supplies. These are treated in [[power-electronics]].
:::

::: example Sizing a transistor for an amplifier {#ex-design}
An amplifier stage in the long-channel process of [[#ex-square-law]] ($\mu_nC_{ox} = 138\,\mathrm{\mu A/V^2}$) must provide $g_m = 1\,\mathrm{mS}$ at a drain current of $100\,\mathrm{\mu A}$. Find the required overdrive and $W/L$. If $L = 1\,\mathrm{\mu m}$ and $\lambda = 0.05\,\mathrm{V^{-1}}$, what is the intrinsic gain?
::: solution
In saturation $g_m = 2I_D/V_{ov}$, so $V_{ov} = 2I_D/g_m = 2(100\times10^{-6})/10^{-3} = 0.2\,\mathrm V$. From [[#eq-saturation]],

$$
\frac{W}{L} = \frac{2I_D}{\mu_nC_{ox}V_{ov}^2} = \frac{2(100\times10^{-6})}{(138\times10^{-6})(0.04)} = 36.2,
$$

so $W = 36\,\mathrm{\mu m}$ for $L = 1\,\mathrm{\mu m}$. The intrinsic gain is $g_mr_o = g_m/(\lambda I_D) = 10^{-3}/(0.05\times10^{-4}) = 200$. A low overdrive gives high $g_m/I_D$ (here $10\,\mathrm{V^{-1}}$, compared with $38.7\,\mathrm{V^{-1}}$ for a BJT), but at $0.2\,\mathrm V$ the transistor is close to the boundary with subthreshold operation, where the square law becomes inaccurate (with $n = 1.3$ the exponential law caps $g_m/I_D$ at $1/(nV_T) \approx 30\,\mathrm{V^{-1}}$); analogue designers therefore size transistors with $g_m/I_D$ charts from simulation rather than with the square law alone.
:::
:::

::: history
Julius Lilienfeld patented the field-effect principle in 1926, but working devices had to wait for a clean silicon–oxide interface. Mohamed Atalla and Dawon Kahng built the first silicon MOSFET at Bell Laboratories in 1959 and presented it in 1960. Frank Wanlass at Fairchild invented CMOS in 1963 (with C. T. Sah), and RCA produced the first CMOS integrated circuits in the late 1960s. Gordon Moore observed in 1965 that the number of components per chip was doubling every year, revising the rate to every two years in 1975. Robert Dennard invented the one-transistor DRAM cell in 1967 and, with Fritz Gaensslen, Hwa-Nien Yu, Leo Rideout, Ernest Bassous and Andre LeBlanc, published the constant-field scaling rules in 1974. The FinFET was developed by Chenming Hu, Tsu-Jae King Liu and Jeffrey Bokor at Berkeley in the late 1990s and entered production at Intel's 22 nm generation in 2011; gate-all-around nanosheet transistors entered volume production in 2022–2025.
:::

## Where this leads

The long-channel equations and their small-signal forms ($g_m$, $r_o$, gate and junction capacitances) are the basis of [[electronics-1/mosfet-circuits]], [[electronics-1/small-signal-amplifiers]], [[electronics-1/current-mirrors]] and [[electronics-1/differential-amplifiers]]. In digital design, the on-current, gate capacitance and subthreshold leakage of this chapter set the delay and power of the CMOS inverter ([[digital-ic/cmos-inverter]]) and of all static logic ([[digital-ic/static-cmos-logic]]), and the leakage and scaling limits reappear in [[digital-ic/power-dissipation]]. Fabrication — implantation, oxidation, high-k deposition and the FinFET and nanosheet flows — is the subject of [[digital-ic/cmos-fabrication]]. Power MOSFETs and wide-gap devices are developed in [[power-electronics]].

::: summary
- A MOSFET's current is the inversion charge $-C_{ox}(V_{GS} - V_{th} - V(y))$ moving along the channel; the gradual-channel approximation gives $I_D = \mu_nC_{ox}(W/L)[(V_{GS} - V_{th})V_{DS} - V_{DS}^2/2]$ in triode and $\tfrac12\mu_nC_{ox}(W/L)(V_{GS} - V_{th})^2$ in saturation, beyond pinch-off at $V_{DS} = V_{GS} - V_{th}$.
- Effective channel mobility is much lower than bulk mobility and falls with vertical field.
- A source–body voltage raises the threshold by $\gamma(\sqrt{2\phi_F + V_{SB}} - \sqrt{2\phi_F})$ with $\gamma = \sqrt{2q\varepsilon_sN_A}/C_{ox}$; channel-length modulation gives $r_o \approx 1/(\lambda I_D)$.
- Below threshold the current is diffusion and varies as $e^{(V_{GS} - V_{th})/nV_T}$; the subthreshold swing $S = nV_T\ln10 \ge 60\,\mathrm{mV/decade}$ at room temperature sets the minimum threshold for a given leakage.
- In short channels velocity saturation makes $I_{D,\text{sat}} \to WC_{ox}v_{\text{sat}}(V_{GS} - V_{th})$, linear in overdrive and independent of $L$.
- Short-channel effects — threshold roll-off, DIBL, punch-through, degraded swing — appear when $L$ is not much larger than the natural length set by oxide thickness and depletion or body thickness.
- Dennard scaling keeps fields constant while improving speed, density and energy; it ended because $V_{th}$ and the swing do not scale; FinFETs and gate-all-around nanosheets restored gate control.
:::

## Exercises

::: exercise Saturation current {level=1 check="0.5*200e-4*(3.9*8.854e-12/5e-9)*20*0.4^2"}
An nMOS transistor has $\mu_n = 200\,\mathrm{cm^2/(V\,s)}$, $t_{ox} = 5\,\mathrm{nm}$, $W/L = 20$ and $V_{th} = 0.4\,\mathrm V$. Find the saturation current in amperes at $V_{GS} = 0.8\,\mathrm V$, in the square-law model.
::: solution
$C_{ox} = 6.91\times10^{-7}\,\mathrm{F/cm^2}$, $\mu_nC_{ox} = 1.38\times10^{-4}\,\mathrm{A/V^2}$, so $I_D = \tfrac12(1.38\times10^{-4})(20)(0.4)^2 = 2.21\times10^{-4}\,\mathrm A = 221\,\mathrm{\mu A}$.
:::
:::

::: exercise On-resistance {level=1 check="1/(400e-4*3.453e-3*50*1.0)"}
A transistor used as a switch has $\mu_nC_{ox} = 138\,\mathrm{\mu A/V^2}$ ($\mu_n = 400\,\mathrm{cm^2/(V\,s)}$, $t_{ox} = 10\,\mathrm{nm}$), $W/L = 50$ and $V_{GS} - V_{th} = 1.0\,\mathrm V$. Find its small-$V_{DS}$ on-resistance in ohms.
::: solution
$R_{on} = 1/[\mu_nC_{ox}(W/L)V_{ov}] = 1/(1.38\times10^{-4}\times50\times1.0) = 145\,\Omega$.
:::
:::

::: exercise Subthreshold swing {level=1 check="(1+0.25)*0.02585*log(10)"}
A transistor has $C_d/C_{ox} = 0.25$ below threshold. Find its subthreshold swing in volts per decade at $300\,\mathrm K$, and the swing at $77\,\mathrm K$ (liquid nitrogen) assuming the ratio is unchanged.
::: solution
$S = 1.25\times0.02585\times2.3026 = 0.0744\,\mathrm{V/dec} = 74\,\mathrm{mV/dec}$. At $77\,\mathrm K$, $V_T = 6.64\,\mathrm{mV}$ and $S = 1.25\times6.64\times2.3026 = 19\,\mathrm{mV/dec}$. Cooling sharpens the switch, which is one attraction of cryogenic CMOS for quantum-computer control electronics.
:::
:::

::: exercise Body effect {level=2 check="0.4*(sqrt(0.8+1.2)-sqrt(0.8))"}
A process has $\gamma = 0.4\,\mathrm{V^{1/2}}$ and $2\phi_F = 0.8\,\mathrm V$. Find the threshold increase in volts for $V_{SB} = 1.2\,\mathrm V$.
::: solution
$\Delta V_{th} = 0.4(\sqrt{2.0} - \sqrt{0.8}) = 0.4(1.414 - 0.894) = 0.208\,\mathrm V$.
:::
:::

::: exercise Triode or saturation? {level=2}
For the transistor of [[#ex-square-law]] with $V_{GS} = 1.2\,\mathrm V$, find $I_D$ at $V_{DS} = 0.3\,\mathrm V$ and at $V_{DS} = 1.0\,\mathrm V$, ignoring channel-length modulation.
::: solution
$V_{ov} = 0.7\,\mathrm V$. At $V_{DS} = 0.3\,\mathrm V < V_{ov}$ the device is in triode: $I_D = 1.38\times10^{-3}[0.7\times0.3 - 0.045] = 1.38\times10^{-3}\times0.165 = 228\,\mathrm{\mu A}$. At $V_{DS} = 1.0\,\mathrm V > V_{ov}$ it is saturated: $I_D = \tfrac12(1.38\times10^{-3})(0.49) = 338\,\mathrm{\mu A}$.
:::
:::

::: exercise Leakage of a billion transistors {level=2 check="1e9*1e-7*10^(-0.35/0.075)*0.7"}
A chip contains $10^{9}$ transistors that are off, each $0.1\,\mathrm{\mu m}$ wide, with a current at threshold of $1\,\mathrm{\mu A/\mu m}$ (so $10^{-7}\,\mathrm A$ each), $V_{th} = 0.35\,\mathrm V$ and $S = 75\,\mathrm{mV/dec}$. Estimate the static leakage power in watts at $V_{DD} = 0.7\,\mathrm V$. What is it if $V_{th}$ is reduced to $0.25\,\mathrm V$?
::: solution
Each off transistor leaks $10^{-7}\times10^{-0.35/0.075} = 10^{-7}\times10^{-4.67} = 2.15\times10^{-12}\,\mathrm A$. The total is $2.15\times10^{-3}\,\mathrm A$ and the power $0.7\times2.15\times10^{-3} = 1.5\,\mathrm{mW}$. With $V_{th} = 0.25\,\mathrm V$ the leakage rises by $10^{0.1/0.075} = 21.5$, to $32\,\mathrm{mW}$. (Real chips also leak through gates, junctions and DIBL, and their transistors are heated, so actual figures are higher; leakage is a major fraction of the power of mobile processors.)
:::
:::

::: exercise Velocity-saturated transconductance {level=2}
Show from [[#eq-vsat]] that the saturation transconductance is $g_m = WC_{ox}v_{\text{sat}}\frac{V_{ov}(V_{ov} + 2\mathcal E_{\text{sat}}L)}{(V_{ov} + \mathcal E_{\text{sat}}L)^2}$ and that it approaches $WC_{ox}v_{\text{sat}}$ for very short channels. Evaluate it per micrometre of width for the transistor of [[#ex-vsat]].
::: solution
Differentiating $V_{ov}^2/(V_{ov} + a)$ with $a = \mathcal E_{\text{sat}}L$: $[2V_{ov}(V_{ov} + a) - V_{ov}^2]/(V_{ov} + a)^2 = V_{ov}(V_{ov} + 2a)/(V_{ov} + a)^2$. For $a \to 0$ this tends to $1$, giving $g_m \to WC_{ox}v_{\text{sat}}$. Numerically, $WC_{ox}v_{\text{sat}} = 3.45\,\mathrm{mS}$ per micrometre and the factor is $0.5(0.98)/(0.74)^2 = 0.895$, so $g_m = 3.09\,\mathrm{mS/\mu m}$.
:::
:::

::: exercise Pinch-off and the channel potential {level=3}
For a long-channel transistor in triode, show that the channel potential satisfies $V(y) = V_{ov} - \sqrt{V_{ov}^2 - (y/L)(2V_{ov}V_{DS} - V_{DS}^2)}$, and that at the onset of saturation ($V_{DS} = V_{ov}$) the lateral field $\mathrm dV/\mathrm dy$ becomes infinite at the drain. What does this say about the validity of the gradual-channel approximation near pinch-off?
::: hint
Integrate the current equation from $0$ to $y$ instead of from $0$ to $L$, and use the known $I_D$.
:::
::: solution
Integrating $I_D\,\mathrm dy = W\mu_nC_{ox}(V_{ov} - V)\,\mathrm dV$ from the source to $y$ gives $I_Dy = W\mu_nC_{ox}(V_{ov}V - V^2/2)$. Dividing by the same relation over the whole channel, $y/L = (2V_{ov}V - V^2)/(2V_{ov}V_{DS} - V_{DS}^2)$, a quadratic in $V$ whose root with $V \le V_{ov}$ is the stated expression. Differentiating, $\mathrm dV/\mathrm dy = I_D/[W\mu_nC_{ox}(V_{ov} - V)]$, which diverges where $V \to V_{ov}$, i.e. at the drain when $V_{DS} = V_{ov}$. The inversion charge vanishes there, so a finite current would need infinite velocity. In reality the lateral field becomes comparable with the vertical field, the gradual-channel approximation fails, carriers move at $v_{\text{sat}}$ through a short high-field region, and the current is carried by a small but finite charge — this is the region whose length change gives channel-length modulation.
:::
:::

::: exercise A constant-field scaling step {level=3}
A transistor with $L = 1\,\mathrm{\mu m}$, $t_{ox} = 20\,\mathrm{nm}$, $N_A = 2\times10^{16}\,\mathrm{cm^{-3}}$, $V_{DD} = 5\,\mathrm V$ and $V_{th} = 0.8\,\mathrm V$ is scaled by $\kappa = 5$. (a) Give the new $L$, $t_{ox}$, $N_A$, $V_{DD}$ and $V_{th}$. (b) By what factors do the gate delay, the power per transistor and the energy per switching event change? (c) Using [[#eq-swing]], explain quantitatively why the new threshold voltage could not in practice be used without a large increase in leakage, taking $S = 80\,\mathrm{mV/dec}$ for both devices.
::: solution
(a) $L = 0.2\,\mathrm{\mu m}$, $t_{ox} = 4\,\mathrm{nm}$, $N_A = 10^{17}\,\mathrm{cm^{-3}}$, $V_{DD} = 1\,\mathrm V$, $V_{th} = 0.16\,\mathrm V$.

(b) Delay $\times1/5$; power per transistor $\times1/25$; switching energy $CV^2$ $\times1/125$; power density unchanged.

(c) The original device had its threshold $0.8\,\mathrm V$ above $V_{GS} = 0$, i.e. $0.8/0.08 = 10$ decades of subthreshold suppression. The scaled device has only $0.16/0.08 = 2$ decades: its off-current is $10^{8}$ times larger relative to its threshold current. Because the swing is fixed by $kT/q$ and cannot be scaled by $\kappa$, thresholds in practice stayed near $0.2$–$0.4\,\mathrm V$, so supply voltages could not fall proportionally either; this is exactly the breakdown of Dennard scaling described in the text. (Other parameters, such as the built-in potentials, also fail to scale, since they are set by $E_g$ and $kT$.)
:::
:::
