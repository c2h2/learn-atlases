The transmitter of a fibre link must turn an electrical bit stream into light: a few milliwatts, at a precisely controlled wavelength, switched on and off billions of times a second, from a device that costs a few dollars and runs for decades. Two semiconductor devices do this. The **light-emitting diode** produces incoherent light by spontaneous recombination of electrons and holes; it is cheap, robust and slow, with a broad spectrum. The **semiconductor laser** uses stimulated emission in an optical resonator; it produces a narrow, intense, coherent beam that can be modulated at tens of gigahertz. Lasers made from the same materials also read optical discs, print documents, pump fibre amplifiers, cut metal and measure distance in lidar.

[[semiconductor-devices/diodes-photonic-devices]] introduced radiative recombination in direct-gap semiconductors, the LED efficiency chain $\eta_{\text{ext}} = \eta_{\text{inj}}\eta_{\text{rad}}\eta_{\text{extr}}$ and the escape cone that limits extraction. This lesson starts one level deeper, with the three elementary processes by which light and matter exchange energy, and derives from them the spectrum and speed of LEDs, the condition for optical gain, the threshold and output of a laser, and its modulation response from the rate equations.

## Absorption, spontaneous and stimulated emission {#sec-einstein}

Consider atoms (or electron states in a solid) with a lower level 1 and an upper level 2 separated by $h\nu_0 = E_2 - E_1$, with populations $N_1$ and $N_2$ per unit volume, bathed in radiation whose energy density per unit frequency near $\nu_0$ is $\rho(\nu)$. Three processes change the populations.

::: definition Einstein coefficients {#def-einstein}
- **Absorption**: a photon is absorbed and an atom goes from 1 to 2, at the rate $B_{12}\rho(\nu_0)N_1$ per unit volume.
- **Spontaneous emission**: an atom in 2 drops to 1 and emits a photon in a random direction, with random phase, at the rate $A_{21}N_2$. The **spontaneous lifetime** is $\tau_{sp} = 1/A_{21}$.
- **Stimulated emission**: a photon passing an atom in 2 causes it to drop to 1 and emit a second photon *identical* to the first — same frequency, direction, phase and polarisation — at the rate $B_{21}\rho(\nu_0)N_2$.

$A_{21}$, $B_{12}$ and $B_{21}$ are the **Einstein coefficients**; they are properties of the transition, not of the radiation.
:::

Stimulated emission is the key to the laser: it copies photons, so a wave passing through a collection of excited atoms grows coherently. Einstein discovered it by asking what is needed for thermal equilibrium.

::: theorem Einstein relations {#thm-einstein}
For non-degenerate levels in a medium of refractive index $n$,

$$
B_{12} = B_{21}, \qquad \frac{A_{21}}{B_{21}} = \frac{8\pi hn^3\nu^3}{c^3} .
$$ {#eq-einstein}

In thermal equilibrium at temperature $T$ the ratio of stimulated to spontaneous emission rates is $B_{21}\rho/A_{21} = 1/(e^{h\nu/k_BT} - 1)$.
:::

::: proof
In equilibrium upward and downward transitions balance: $B_{12}\rho N_1 = A_{21}N_2 + B_{21}\rho N_2$, and the populations follow the Boltzmann distribution, $N_2/N_1 = e^{-h\nu/k_BT}$. Solving for $\rho$,

$$
\rho(\nu) = \frac{A_{21}/B_{21}}{(B_{12}/B_{21})e^{h\nu/k_BT} - 1} .
$$

This must agree with Planck's law for blackbody radiation in a medium of index $n$, $\rho(\nu) = (8\pi hn^3\nu^3/c^3)/(e^{h\nu/k_BT} - 1)$, at every temperature. Matching the denominators requires $B_{12} = B_{21}$, and matching the numerators gives the second relation. Then $B_{21}\rho/A_{21} = 1/(e^{h\nu/k_BT} - 1)$.
:::

At room temperature and $1550\,\mathrm{nm}$ ($h\nu = 0.80\,\mathrm{eV}$, $k_BT = 0.0259\,\mathrm{eV}$) the ratio is $e^{-31} = 3.6\times10^{-14}$: in thermal light, stimulated emission is utterly negligible, and in a medium in equilibrium absorption always beats stimulated emission because $N_1 > N_2$. A beam grows only if the populations are **inverted**, $N_2 > N_1$, which requires pumping energy in. The net rate of stimulated emission minus absorption is $B_{21}\rho(N_2 - N_1)$, and since it is driven by the beam itself, the beam intensity grows as $e^{gz}$ with a **gain coefficient** $g \propto N_2 - N_1$.

The relation $A_{21} \propto \nu^3B_{21}$ also explains why lasers become harder to build at shorter wavelengths: spontaneous emission, which wastes the inversion, grows as the cube of the frequency.

## Gain in semiconductors {#sec-gain}

In a semiconductor the "levels" are bands. Photons of energy $h\nu$ connect a state in the conduction band with a state in the valence band at the same wavevector (in a direct-gap material), and the occupation of these states is described by Fermi–Dirac functions. Under forward bias, electrons and holes are not in equilibrium with each other, and each band has its own **quasi-Fermi level**, $F_n$ for electrons and $F_p$ for holes ([[semiconductor-devices/carrier-statistics]]).

::: theorem Condition for optical gain (Bernard–Duraffourg) {#thm-bd}
A semiconductor amplifies light of photon energy $h\nu$ if and only if

$$
E_g < h\nu < F_n - F_p .
$$ {#eq-bd}

Gain therefore requires the quasi-Fermi-level separation to exceed the band gap.
:::

::: proof
Let a photon connect a conduction-band state of energy $E_2$ to a valence-band state $E_1 = E_2 - h\nu$. Stimulated emission needs the upper state full and the lower empty; absorption needs the reverse. With occupation probabilities $f_c(E_2) = 1/(1 + e^{(E_2 - F_n)/k_BT})$ and $f_v(E_1) = 1/(1 + e^{(E_1 - F_p)/k_BT})$, the net emission rate is proportional to

$$
f_c(1 - f_v) - f_v(1 - f_c) = f_c - f_v ,
$$

and $f_c > f_v$ if and only if $E_2 - F_n < E_1 - F_p$, i.e. $h\nu = E_2 - E_1 < F_n - F_p$. Photons with $h\nu < E_g$ find no pairs of states and are neither absorbed nor amplified.
:::

At low injection $F_n - F_p < E_g$ and the material absorbs at all photon energies above the gap. As the carrier density $N$ rises, the separation grows; at the **transparency density** $N_{tr}$ the material neither absorbs nor amplifies at the band edge, and above it a band of photon energies has positive gain. Near the gain peak, gain grows roughly linearly with carrier density,

$$
g(N) \approx a(N - N_{tr}) ,
$$ {#eq-gain-linear}

with **differential gain** $a$ of order $2$–$5\times10^{-16}\,\mathrm{cm^2}$ and $N_{tr} \approx 1$–$2\times10^{18}\,\mathrm{cm^{-3}}$ for bulk InGaAsP. Quantum-well active layers, a few nanometres thick, have a step-like density of states that gives a larger differential gain and a lower transparency current; strained quantum wells improve them further. Almost all modern lasers use them.

::: quiz
A GaAs layer ($E_g = 1.42\,\mathrm{eV}$) is pumped so that $F_n - F_p = 1.45\,\mathrm{eV}$. Which light does it amplify?
- [ ] All wavelengths shorter than $873\,\mathrm{nm}$
- [x] Only wavelengths between about $855$ and $873\,\mathrm{nm}$
- [ ] Only light at exactly $873\,\mathrm{nm}$
- [ ] Wavelengths longer than $873\,\mathrm{nm}$, which are not absorbed
::: solution
By [[#eq-bd]], gain needs $1.42 < h\nu < 1.45\,\mathrm{eV}$, i.e. $1.240/1.45 = 0.855\,\mathrm{\mu m} < \lambda_0 < 1.240/1.42 = 0.873\,\mathrm{\mu m}$. Photons of higher energy are still absorbed; photons below the gap pass through unaffected. Pumping harder widens the gain band towards shorter wavelengths.
:::
:::

## Light-emitting diodes {#sec-led}

An LED operates below transparency: injected carriers recombine spontaneously, and the photons escape (if they can) without being amplified.

### Spectrum

::: theorem Spectrum of spontaneous emission {#thm-led-spectrum}
For a direct-gap semiconductor with parabolic bands and non-degenerate carriers, the spontaneous emission spectrum is

$$
R_{sp}(h\nu) \propto \sqrt{h\nu - E_g}\;e^{-(h\nu - E_g)/k_BT}, \quad h\nu > E_g .
$$ {#eq-led-spectrum}

It peaks at $h\nu = E_g + \tfrac12k_BT$ and has a full width at half maximum of $1.8\,k_BT$, independent of the material. In wavelength, $\Delta\lambda \approx 1.8\,k_BT\lambda_0^2/hc$.
:::

::: proof
A photon of energy $h\nu$ comes from an electron–hole pair with the same wavevector, whose combined kinetic energy is $h\nu - E_g$. The number of such pairs per unit photon energy is the **joint density of states**, proportional to $\sqrt{h\nu - E_g}$ for parabolic bands. The probability that the upper state is full and the lower empty is, for non-degenerate carriers, proportional to the Boltzmann factor $e^{-(h\nu - E_g)/k_BT}$. Their product is [[#eq-led-spectrum]]. With $x = (h\nu - E_g)/k_BT$, $\sqrt xe^{-x}$ has its maximum where $\tfrac{1}{2x} = 1$, i.e. $x = \tfrac12$; solving $\sqrt xe^{-x} = \tfrac12\sqrt{1/2}\,e^{-1/2}$ numerically gives $x = 0.0927$ and $1.888$, a width of $1.795$. Differentiating $\lambda_0 = hc/E$ converts a width in energy to $\Delta\lambda = \lambda_0^2\Delta E/hc$.
:::

::: widget plot
f: sqrt(max(x - g, 0)/(4.3085e-5*T))*exp(-(x - g)/(8.617e-5*T) + 0.5)
x: 1.35, 1.65
y: 0, 1.05
sliders: T=300:200:400:5; g=1.42:1.35:1.5:0.005
labels: R_{sp}(h\nu)/R_{\max}
caption: The spontaneous emission spectrum [[#eq-led-spectrum]] of a direct-gap LED against photon energy in electronvolts, normalised to its peak, for temperature $T$ in kelvin and band gap $E_g$ (slider $g$; $1.42\,\mathrm{eV}$ is GaAs). The spectrum starts sharply at the gap and has a long high-energy tail. Raise $T$: the spectrum broadens in proportion ($1.8\,k_BT$ is $47\,\mathrm{meV}$ at $300\,\mathrm K$) and its peak moves away from the gap. In a real LED the gap itself also shrinks with temperature, by about $0.4\,\mathrm{meV/K}$ in GaAs, which moves the whole spectrum to longer wavelengths.
:::

The width of $1.8\,k_BT = 47\,\mathrm{meV}$ at room temperature corresponds to $27\,\mathrm{nm}$ at $850\,\mathrm{nm}$ and $90\,\mathrm{nm}$ at $1550\,\mathrm{nm}$; real LEDs, with alloy broadening and heavy doping, are somewhat wider. A coherence length of a few tens of micrometres follows ([[photonics/optical-waves#def-coherence]]), and the chromatic dispersion of [[photonics/optical-fibres]] limits LED links to a few hundred Mb/s over a few kilometres.

### Speed

An LED's light output follows the carrier density in the active layer, which responds to the current with the carrier lifetime $\tau$: $\dd N/\dd t = J/qd - N/\tau$ for an active layer of thickness $d$. For a small sinusoidal modulation of the current at angular frequency $\omega$, the light modulation is

$$
\frac{P(\omega)}{P(0)} = \frac{1}{1 + j\omega\tau} .
$$ {#eq-led-response}

The optical power falls to half its low-frequency value at $\omega\tau = \sqrt3$; but because a photodiode's electrical output power is proportional to the square of the optical modulation, the more common **electrical 3-dB bandwidth** is at $\omega\tau = 1$, $f_{3\mathrm{dB}} = 1/2\pi\tau$. With $\tau = 5\,\mathrm{ns}$, typical of lightly doped active layers, $f_{3\mathrm{dB}} = 32\,\mathrm{MHz}$. Heavy doping or high injection shortens $\tau$ to about $1\,\mathrm{ns}$ at the cost of efficiency. Lasers escape this limit because stimulated emission is much faster than spontaneous emission.

::: example An LED transmitter {#ex-led}
An $850\,\mathrm{nm}$ GaAs LED for an optical sensor link is driven at $50\,\mathrm{mA}$ and has an external quantum efficiency of $2\,\%$ into the fibre. Its carrier lifetime is $4\,\mathrm{ns}$. Find the optical power coupled into the fibre, the electrical 3-dB bandwidth and the spectral width.
::: solution
Each electron produces $\eta_{\text{ext}}$ photons into the fibre, so $P = \eta_{\text{ext}}(h\nu/q)I$. With $h\nu = 1.240/0.85 = 1.459\,\mathrm{eV}$, a perfect device would emit $(h\nu/q)I = 1.459\,\mathrm V\times0.050\,\mathrm A = 72.9\,\mathrm{mW}$, so

$$
P = 0.02\times72.9\,\mathrm{mW} = 1.46\,\mathrm{mW} \quad (1.6\,\mathrm{dBm}).
$$

The bandwidth is $f_{3\mathrm{dB}} = 1/(2\pi\times4\,\mathrm{ns}) = 40\,\mathrm{MHz}$. The spectral width is $\Delta\lambda \approx 1.8k_BT\lambda_0^2/hc = 0.0465\times0.85^2/1.240\,\mathrm{\mu m} = 27\,\mathrm{nm}$. The low coupling efficiency is the escape-cone problem made worse by the small acceptance angle of the fibre.
:::
:::

## The laser oscillator {#sec-laser}

A laser is an amplifier with feedback: a gain medium inside a resonator. In a semiconductor **Fabry–Pérot laser** the resonator is the chip itself, a waveguide a few hundred micrometres long whose cleaved end facets reflect $R = [(n - 1)/(n + 1)]^2 \approx 0.3$ of the light. The active layer is the core of a slab or channel waveguide ([[photonics/dielectric-waveguides]]); only the fraction $\Gamma$ of the mode — the **confinement factor** — overlaps the gain.

### Threshold

Light making a round trip in the cavity is amplified by the modal gain $\Gamma g$, attenuated by internal losses $\alpha_i$ (free-carrier absorption and scattering), and partly lost through the mirrors. Oscillation starts when the round trip reproduces the field exactly.

::: theorem Laser threshold and longitudinal modes {#thm-threshold}
A Fabry–Pérot laser of length $L$ with mirror reflectances $R_1$, $R_2$ oscillates when the modal gain reaches the **threshold gain**

$$
\Gamma g_{th} = \alpha_i + \alpha_m, \qquad \alpha_m = \frac{1}{2L}\ln\frac{1}{R_1R_2} ,
$$ {#eq-threshold}

where $\alpha_m$ is the **mirror loss**, and at frequencies satisfying the phase condition $2\beta L = 2\pi q$. These **longitudinal modes** are spaced by

$$
\Delta\nu = \frac{c}{2N_gL}, \qquad \Delta\lambda = \frac{\lambda_0^2}{2N_gL} ,
$$ {#eq-mode-spacing}

with $N_g$ the group index of the waveguide mode.
:::

::: proof
After one round trip the field amplitude is multiplied by $\sqrt{R_1R_2}\,e^{(\Gamma g - \alpha_i)L}e^{-j2\beta L}$ (the exponent for intensity is $(\Gamma g - \alpha_i)2L$, and amplitude takes half of it). Steady oscillation requires this factor to equal $1$. Its magnitude gives $\sqrt{R_1R_2}e^{(\Gamma g - \alpha_i)L} = 1$, i.e. $\Gamma g = \alpha_i + (1/2L)\ln(1/R_1R_2)$. Its phase gives $2\beta L = 2\pi q$. Adjacent modes differ by $\Delta\beta\,2L = 2\pi$; with $\Delta\beta = (\dd\beta/\dd\omega)\Delta\omega = (N_g/c)2\pi\Delta\nu$, $\Delta\nu = c/2N_gL$, as for the Fabry–Pérot resonator of [[photonics/optical-waves#thm-fp]].
:::

Below threshold the gain is less than the loss and the device is a (rather inefficient) LED. As the current increases, the gain rises until it reaches $g_{th}$ at the mode closest to the gain peak. There it stops: if the gain rose further, the light would grow without limit, and the stimulated emission it causes would consume the extra carriers. Above threshold the carrier density — and so the gain — is **clamped** at its threshold value, and every additional electron injected becomes a photon in the lasing mode (apart from internal losses).

::: example A 1550 nm Fabry–Pérot laser {#ex-fp-laser}
An InGaAsP laser has a cavity $L = 300\,\mathrm{\mu m}$ long, cleaved facets on a waveguide of effective index $3.5$, internal loss $\alpha_i = 20\,\mathrm{cm^{-1}}$, confinement factor $\Gamma = 0.3$ and group index $3.7$. Find the mirror loss, the threshold material gain and the longitudinal mode spacing at $1550\,\mathrm{nm}$.
::: solution
$R = (2.5/4.5)^2 = 0.309$. Then

$$
\alpha_m = \frac{1}{2\times0.03\,\mathrm{cm}}\ln\frac{1}{0.309^2} = \frac{2.349}{0.06\,\mathrm{cm}} = 39.2\,\mathrm{cm^{-1}} .
$$

The threshold material gain is $g_{th} = (\alpha_i + \alpha_m)/\Gamma = 59.2/0.3 = 197\,\mathrm{cm^{-1}}$. The mode spacing is $\Delta\lambda = (1.55\,\mathrm{\mu m})^2/(2\times3.7\times300\,\mathrm{\mu m}) = 1.08\,\mathrm{nm}$ ($135\,\mathrm{GHz}$). The gain spectrum of the material is tens of nanometres wide, so several modes near its peak have nearly the same gain, and a Fabry–Pérot laser typically oscillates in several of them at once, a spectrum $1$–$3\,\mathrm{nm}$ wide. That is what limits such lasers to short links ([[photonics/optical-fibres#ex-disp-limit]]).
:::
:::

### Rate equations

The dynamics of a semiconductor laser are captured by two coupled equations for the carrier density $N$ in the active volume $V$ and the photon density $S$ in the lasing mode.

::: definition Laser rate equations {#def-rate}

$$
\begin{aligned}
\frac{\dd N}{\dd t} &= \frac{\eta_iI}{qV} - \frac{N}{\tau_n} - v_gg(N)S, \\
\frac{\dd S}{\dd t} &= \Gamma v_gg(N)S - \frac{S}{\tau_p} + \Gamma\beta_{sp}\frac{N}{\tau_n} .
\end{aligned}
$$ {#eq-rate}

Here $\eta_i$ is the **internal (injection) efficiency**, $\tau_n$ the carrier lifetime (all recombination other than stimulated), $v_g = c/N_g$, and $\tau_p = 1/[v_g(\alpha_i + \alpha_m)]$ the **photon lifetime** in the cavity. The small **spontaneous-emission factor** $\beta_{sp}$ (about $10^{-5}$–$10^{-4}$) is the fraction of spontaneous emission that enters the lasing mode. The output power through both facets is $P = h\nu\,v_g\alpha_m\,SV/\Gamma$.
:::

Each term has a direct meaning: carriers are injected by the current, lost by spontaneous and non-radiative recombination and consumed by stimulated emission; photons are created by stimulated emission (weighted by $\Gamma$, since $S$ is averaged over the mode volume $V/\Gamma$) and lost through internal absorption and the mirrors.

::: theorem Threshold current and output power {#thm-li}
In steady state, neglecting $\beta_{sp}$, the laser has a **threshold current**

$$
I_{th} = \frac{qVN_{th}}{\eta_i\tau_n}, \qquad N_{th} = N_{tr} + \frac{\alpha_i + \alpha_m}{\Gamma a} ,
$$ {#eq-ith}

and above threshold its output power through both facets is

$$
P = \eta_d\frac{h\nu}{q}(I - I_{th}), \qquad \eta_d = \eta_i\frac{\alpha_m}{\alpha_i + \alpha_m} ,
$$ {#eq-li}

where $\eta_d$ is the **differential quantum efficiency**: the number of output photons per additional electron above threshold.
:::

::: proof
Setting $\dd S/\dd t = 0$ with $S \ne 0$ and $\beta_{sp} = 0$ gives $\Gamma v_gg(N) = 1/\tau_p$, i.e. $\Gamma g(N) = \alpha_i + \alpha_m$: the gain is clamped at threshold, and with [[#eq-gain-linear]] $N = N_{th}$. Setting $\dd N/\dd t = 0$ gives $v_gg_{th}S = \eta_iI/qV - N_{th}/\tau_n$. At threshold $S = 0$, so $I_{th} = qVN_{th}/\eta_i\tau_n$. Above it,

$$
S = \frac{\eta_i(I - I_{th})}{qVv_gg_{th}} = \frac{\Gamma\eta_i(I - I_{th})}{qVv_g(\alpha_i + \alpha_m)} .
$$

Substituting into $P = h\nu v_g\alpha_mSV/\Gamma$ gives [[#eq-li]]: of each extra electron, a fraction $\eta_i$ reaches the active layer and becomes a photon (since $N$ is clamped), and of the photons, the fraction $\alpha_m/(\alpha_i + \alpha_m)$ leaves through the mirrors rather than being absorbed.
:::

::: widget plot
f: if(x < 10*exp((T - 25)/50), 0.002*x, 0.002*10*exp((T - 25)/50) + 0.21*(1 - 0.004*(T - 25))*(x - 10*exp((T - 25)/50))); max(0.21*(x - 10), 0)
x: 0, 60
y: 0, 10
sliders: T=25:0:85:1
labels: P\ (\mathrm{mW}); \text{at } 25\,^\circ\mathrm C
caption: Light–current characteristic of a laser diode (output power per facet in milliwatts against current in milliamperes) at heatsink temperature $T$ in degrees Celsius, modelled with a threshold $I_{th} = 10\,\mathrm{mA}\times e^{(T - 25)/T_0}$ with $T_0 = 50\,\mathrm K$, a slope efficiency of $0.21\,\mathrm{W/A}$ falling slowly with temperature, and weak spontaneous emission below threshold. The orange line is the $25\,^\circ\mathrm C$ characteristic. Raise $T$ to $70\,^\circ\mathrm C$: the threshold more than doubles, and at a fixed bias current the power drops sharply — which is why transmitters regulate the power with a monitor photodiode and feedback.
:::

::: example Threshold current and slope efficiency {#ex-ith}
For the laser of [[#ex-fp-laser]], the active layer is $0.15\,\mathrm{\mu m}$ thick and $2\,\mathrm{\mu m}$ wide, $a = 2.5\times10^{-16}\,\mathrm{cm^2}$, $N_{tr} = 1.0\times10^{18}\,\mathrm{cm^{-3}}$, $\tau_n = 2\,\mathrm{ns}$ and $\eta_i = 0.8$. Find the threshold carrier density, the threshold current and the slope efficiency per facet in W/A. What current gives $5\,\mathrm{mW}$ from the front facet?
::: solution
$N_{th} = N_{tr} + g_{th}/a = 10^{18} + 197/2.5\times10^{-16} = 1.79\times10^{18}\,\mathrm{cm^{-3}}$. The active volume is $V = 0.15\times2\times300\,\mathrm{\mu m^3} = 9.0\times10^{-11}\,\mathrm{cm^3}$, so

$$
I_{th} = \frac{qVN_{th}}{\eta_i\tau_n} = \frac{1.602\times10^{-19}\times9.0\times10^{-11}\times1.79\times10^{18}}{0.8\times2\times10^{-9}} = 16\,\mathrm{mA}.
$$

$\eta_d = 0.8\times39.2/59.2 = 0.53$, split equally between the two identical facets. The slope efficiency per facet is $\tfrac12\eta_dh\nu/q = 0.5\times0.53\times0.80\,\mathrm V = 0.21\,\mathrm{W/A}$. For $5\,\mathrm{mW}$ per facet the current is $I_{th} + 5/0.21\,\mathrm{mA} = 16 + 24 = 40\,\mathrm{mA}$. Real devices coat the rear facet for high reflectance and the front for low, sending most of the light forward.
:::
:::

### Modulation response

Because the gain clamps, a laser responds to fast changes of current by an exchange of energy between the carriers and the photons. A step in current first raises $N$ above threshold, the photon density then grows rapidly, overshoots and depletes the carriers, and the two oscillate about the new steady state: **relaxation oscillations**.

::: theorem Small-signal modulation response {#thm-modulation}
Linearising [[#eq-rate]] about a steady state with photon density $S_0$ above threshold, the response of the output power to a small sinusoidal current modulation at frequency $f$ is that of a second-order system,

$$
H(f) = \frac{f_R^2}{f_R^2 - f^2 + jf\gamma/2\pi}, \qquad f_R \approx \frac{1}{2\pi}\sqrt{\frac{v_gaS_0}{\tau_p}} ,
$$ {#eq-modulation}

where $f_R$ is the **relaxation-oscillation frequency** and $\gamma$ a damping rate that grows with $S_0$. Since $S_0 \propto I - I_{th}$, $f_R \propto \sqrt{P} \propto \sqrt{I - I_{th}}$.
:::

::: proof
Write $N = N_0 + n(t)$, $S = S_0 + s(t)$, $I = I_0 + i(t)$ and keep first-order terms, with $g = g_{th} + an$. Using $\Gamma v_gg_{th} = 1/\tau_p$,

$$
\frac{\dd n}{\dd t} = \frac{\eta_ii}{qV} - \left(\frac{1}{\tau_n} + v_gaS_0\right)n - \frac{s}{\Gamma\tau_p}, \qquad \frac{\dd s}{\dd t} = \Gamma v_gaS_0\,n .
$$

(The term $\Gamma v_gg_{th}s - s/\tau_p$ cancels exactly.) Differentiating the second and substituting the first gives $\ddot s + \gamma\dot s + \omega_R^2s = \Gamma v_gaS_0\eta_ii/qV$ with $\gamma = 1/\tau_n + v_gaS_0$ and $\omega_R^2 = v_gaS_0/\tau_p$. Its transfer function from $i$ to $s$, normalised to its DC value, is $\omega_R^2/(\omega_R^2 - \omega^2 + j\omega\gamma)$, which is [[#eq-modulation]] with $\omega = 2\pi f$. (Gain compression, neglected here, adds a term proportional to $S_0$ to $\gamma$ and limits the bandwidth at high power.)
:::

::: widget plot
f: 10*log10(1/((1 - x^2)^2 + (z*x)^2)); 10*log10(1/(1 + x^2))
x: 0.05, 3
y: -20, 15
sliders: z=0.3:0.1:2:0.05
hlines: -3
labels: \lvert H\rvert^2\ \text{(laser)}\ \mathrm{dB}; \text{LED},\ f\tau\ \text{scaled}
caption: Electrical modulation response $10\log_{10}\lvert H\rvert^2$ of a laser diode against frequency in units of the relaxation-oscillation frequency $f_R$, with normalised damping $\gamma/\omega_R$ (slider $z$), compared with a single-pole LED response. With light damping the response peaks near $f_R$, crosses $-3\,\mathrm{dB}$ at about $1.55f_R$ (exactly $\sqrt{1 + \sqrt2}\,f_R$ as $z \to 0$) and then falls at $40\,\mathrm{dB}$ per decade. Increase the damping (as happens at high output power): the peak flattens and the bandwidth shrinks, to exactly $f_R$ for the maximally flat response at $z = \sqrt2$. Driving the laser harder raises $f_R$ as $\sqrt{P}$, which is how directly modulated lasers reach $25\,\mathrm{GHz}$.
:::

::: example Relaxation-oscillation frequency {#ex-fr}
For the laser of [[#ex-ith]], find the photon lifetime and the relaxation-oscillation frequency at a photon density $S_0 = 1.5\times10^{15}\,\mathrm{cm^{-3}}$, and the corresponding output power per facet. What happens to $f_R$ if the power is quadrupled?
::: solution
$v_g = c/3.7 = 8.10\times10^9\,\mathrm{cm/s}$, so $\tau_p = 1/[v_g(\alpha_i + \alpha_m)] = 1/(8.10\times10^9\times59.2) = 2.09\,\mathrm{ps}$. Then

$$
f_R = \frac{1}{2\pi}\sqrt{\frac{8.10\times10^9\times2.5\times10^{-16}\times1.5\times10^{15}}{2.09\times10^{-12}}} = \frac{3.82\times10^{10}}{2\pi} = 6.1\,\mathrm{GHz}.
$$

The output power is $P = h\nu v_g\alpha_mSV/\Gamma$, which with $h\nu = 1.28\times10^{-19}\,\mathrm J$ and $SV/\Gamma = 1.5\times10^{15}\times9\times10^{-11}/0.3 = 4.5\times10^5$ photons in the mode gives $P = 1.28\times10^{-19}\times8.10\times10^9\times39.2\times4.5\times10^5 = 18.3\,\mathrm{mW}$ in total, $9.2\,\mathrm{mW}$ per facet. Quadrupling the power doubles $f_R$ to $12\,\mathrm{GHz}$. Shorter cavities and quantum wells with larger differential gain raise $f_R$ further.
:::
:::

::: quiz
A laser operates above threshold. The current is increased by $10\,\%$. Which quantity stays (nearly) the same?
- [ ] The output power
- [ ] The photon density in the cavity
- [x] The carrier density in the active layer
- [ ] The relaxation-oscillation frequency
::: solution
Above threshold the gain, and therefore the carrier density, is clamped at its threshold value: extra carriers are converted immediately into photons by stimulated emission. The output power, photon density and $f_R \propto \sqrt{S_0}$ all increase.
:::
:::

::: warning Frequency chirp under direct modulation
Changing the current of a laser changes its carrier density during transients, and the refractive index of a semiconductor depends on the carrier density. So a directly modulated laser shifts its frequency with every bit — by several gigahertz for a $10\,\mathrm{Gb/s}$ signal — and its effective spectral width is much wider than the static linewidth. The ratio of the index change to the gain change is the **linewidth enhancement factor** (Henry's $\alpha$ factor, about $3$–$6$), which also broadens the linewidth by $1 + \alpha^2$. Chirp interacts with fibre dispersion and is the main reason why long links at $10\,\mathrm{Gb/s}$ and above use a continuously running laser followed by an external modulator.
:::

## Single-frequency and surface-emitting lasers {#sec-dfb}

A Fabry–Pérot laser oscillates on several longitudinal modes; long-distance and WDM systems need just one. The cure is to make the feedback wavelength-selective.

In a **distributed-feedback (DFB) laser**, a periodic corrugation of period $\Lambda$ is etched along the waveguide next to the active layer. Each period reflects a little light, and the reflections add in phase only near the **Bragg wavelength**

$$
\lambda_B = 2n_{\mathrm{eff}}\Lambda ,
$$ {#eq-bragg}

so only the mode closest to $\lambda_B$ reaches threshold. A **quarter-wave phase shift** in the middle of the grating places the lasing mode exactly at $\lambda_B$, and anti-reflection coatings on the facets suppress the Fabry–Pérot modes. DFB lasers have side-mode suppression ratios above $40\,\mathrm{dB}$ and linewidths of $0.1$–$10\,\mathrm{MHz}$. The grating period for $1550\,\mathrm{nm}$ with $n_{\mathrm{eff}} = 3.2$ is $242\,\mathrm{nm}$. **Distributed Bragg reflector (DBR)** lasers place the gratings in passive sections at the ends; by heating or injecting current into them, the wavelength can be tuned. Widely tunable lasers combine two gratings with different comb periods (the vernier effect) to cover the whole C band.

The **vertical-cavity surface-emitting laser (VCSEL)** turns the cavity through ninety degrees: light oscillates perpendicular to the wafer, between two **distributed Bragg mirrors** of alternating quarter-wave layers (for example GaAs and AlAs), with a few quantum wells between them. The cavity is about one wavelength long, so its longitudinal modes are hundreds of nanometres apart and only one falls within the gain spectrum. Because the gain region is only a few tens of nanometres thick, the single-pass gain is tiny, and the mirrors must reflect more than $99\,\%$ — twenty to thirty layer pairs. VCSELs have thresholds below $1\,\mathrm{mA}$, emit circular beams that couple easily into fibre, can be tested on the wafer before dicing, and are made by the million for $850\,\mathrm{nm}$ data-centre links, computer mice and the face-recognition sensors of phones.

::: example Designing a transmitter for an industrial temperature range {#ex-temperature}
A DFB laser has $I_{th} = 10\,\mathrm{mA}$ at $25\,^\circ\mathrm C$, a characteristic temperature $T_0 = 60\,\mathrm K$ (so $I_{th} \propto e^{T/T_0}$) and a slope efficiency of $0.20\,\mathrm{W/A}$ at $25\,^\circ\mathrm C$, falling by $0.5\,\%$ per kelvin. The transmitter must deliver a constant average power of $4\,\mathrm{mW}$ from $-5$ to $70\,^\circ\mathrm C$ without a cooler. Find the bias current required at the two extremes, and the wavelength drift over the range if the DFB wavelength moves by $0.09\,\mathrm{nm/K}$. Is the drift acceptable on a $100\,\mathrm{GHz}$ WDM grid?
::: solution
At $70\,^\circ\mathrm C$: $I_{th} = 10e^{45/60} = 21.2\,\mathrm{mA}$; slope $0.20(1 - 0.005\times45) = 0.155\,\mathrm{W/A}$; bias $I = 21.2 + 4/0.155 = 21.2 + 25.8 = 47\,\mathrm{mA}$. At $-5\,^\circ\mathrm C$: $I_{th} = 10e^{-30/60} = 6.1\,\mathrm{mA}$; slope $0.20(1 + 0.005\times30) = 0.23\,\mathrm{W/A}$; bias $6.1 + 17.4 = 23.5\,\mathrm{mA}$. The automatic power control loop must therefore cover a factor of two in current; the driver's modulation current must also be adjusted with temperature, since the slope falls.

The wavelength drifts by $0.09\times75 = 6.8\,\mathrm{nm}$, i.e. about $840\,\mathrm{GHz}$ at $1550\,\mathrm{nm}$ — more than eight channel spacings on a $100\,\mathrm{GHz}$ grid. Uncooled DFB lasers are fine for single-wavelength links and for **coarse WDM** with $20\,\mathrm{nm}$ spacing, but dense WDM transmitters need a thermoelectric cooler that holds the chip within a fraction of a kelvin, plus a wavelength locker.
:::
:::

::: application Lasers beyond communication
High-power diode-laser bars, arrays of broad-area emitters delivering tens of watts each at $808$–$980\,\mathrm{nm}$, pump solid-state and fibre lasers, which in turn cut and weld metals at kilowatt powers. Gallium-nitride lasers at $405\,\mathrm{nm}$ read Blu-ray discs; red AlGaInP lasers read DVDs and point at slides. Lidar for vehicles uses pulsed $905\,\mathrm{nm}$ edge emitters or VCSEL arrays, or $1550\,\mathrm{nm}$ fibre lasers, which allow higher eye-safe power. Quantum-cascade lasers, in which electrons cascade through a staircase of quantum wells rather than recombining across a gap, emit in the mid-infrared ($3$–$20\,\mathrm{\mu m}$) for gas sensing.
:::

::: history
Albert Einstein introduced stimulated emission in 1916–17 to derive Planck's law. Charles Townes, James Gordon and Herbert Zeiger built the ammonia maser in 1954, as did Nikolay Basov and Alexander Prokhorov independently; Arthur Schawlow and Townes proposed the optical maser in 1958, and Theodore Maiman operated the first laser, of ruby, in 1960. In 1962 four groups — Robert Hall's at General Electric, Marshall Nathan's at IBM, Robert Rediker's at MIT Lincoln Laboratory and Nick Holonyak at General Electric in Syracuse — demonstrated pulsed lasing in GaAs and GaAsP junctions at low temperature. Herbert Kroemer and Zhores Alferov independently proposed the double heterostructure in 1963, which confines both carriers and light; continuous operation at room temperature followed in 1970 (Alferov's group; Izuo Hayashi and Morton Panish). Alferov and Kroemer shared the 2000 Nobel Prize in Physics. Herwig Kogelnik and Charles Shank proposed distributed feedback in 1971. Kenichi Iga proposed the surface-emitting laser in 1977, and his group achieved continuous room-temperature operation in 1989.
:::

## Where this leads

The light from these sources is detected by the photodiodes of [[photonics/photodetectors]], whose noise and sensitivity are the other half of every link budget. Modulation bandwidth, chirp and linewidth determine which transmitter suits which link in [[photonics/optical-communication]], where the same principle of stimulated emission reappears in erbium-doped fibre amplifiers. The LED treated here as a transmitter is, at a much larger scale, the light source of displays and solid-state lighting; run backwards, a pn junction converts light into power in [[photonics/photovoltaics]].

::: summary
- Light and matter exchange energy by absorption, spontaneous emission and stimulated emission; Einstein's relations give $B_{12} = B_{21}$ and $A_{21}/B_{21} = 8\pi hn^3\nu^3/c^3$, and amplification needs a population inversion.
- A semiconductor has gain at photon energies between $E_g$ and $F_n - F_p$; above transparency, $g \approx a(N - N_{tr})$.
- An LED's spectrum peaks at $E_g + k_BT/2$ with width $1.8k_BT$; its modulation bandwidth is $1/2\pi\tau$, tens of MHz.
- A laser reaches threshold when $\Gamma g = \alpha_i + (1/2L)\ln(1/R_1R_2)$; Fabry–Pérot modes are spaced $\lambda_0^2/2N_gL$.
- Above threshold the carrier density is clamped and $P = \eta_d(h\nu/q)(I - I_{th})$ with $\eta_d = \eta_i\alpha_m/(\alpha_i + \alpha_m)$; the threshold rises with temperature as $e^{T/T_0}$.
- The rate equations give a second-order modulation response with relaxation-oscillation frequency $f_R \propto \sqrt{P}$, several to tens of gigahertz.
- DFB and DBR lasers select a single mode at $\lambda_B = 2n_{\mathrm{eff}}\Lambda$; VCSELs use one-wavelength cavities and $>99\,\%$ Bragg mirrors for low thresholds and cheap testing.
:::

## Exercises

::: exercise Stimulated versus spontaneous emission {level=1 check="1/(exp(1.24/0.633/0.025852)-1)"}
Find the ratio of stimulated to spontaneous emission for a transition at $633\,\mathrm{nm}$ in thermal equilibrium at $300\,\mathrm K$ ($k_BT = 0.025852\,\mathrm{eV}$).
::: solution
$h\nu = 1.240/0.633 = 1.959\,\mathrm{eV}$, so $h\nu/k_BT = 75.8$ and the ratio is $1/(e^{75.8} - 1) = 1.2\times10^{-33}$. A helium–neon laser needs a strong population inversion maintained by an electrical discharge.
:::
:::

::: exercise Mirror loss {level=1 check="1/(2*0.025)*log(1/(0.3*0.9))"}
A laser $250\,\mathrm{\mu m}$ long has a front facet with $R_1 = 0.3$ and a high-reflection coated rear facet with $R_2 = 0.9$. Find the mirror loss in $\mathrm{cm^{-1}}$.
::: solution
$\alpha_m = (1/2L)\ln(1/R_1R_2) = (1/0.05\,\mathrm{cm})\ln(1/0.27) = 20\times1.309 = 26.2\,\mathrm{cm^{-1}}$.
:::
:::

::: exercise Mode spacing {level=1 check="(1.31e-6)^2/(2*3.6*400e-6)"}
Find the longitudinal mode spacing, in metres of wavelength, of a $1310\,\mathrm{nm}$ Fabry–Pérot laser $400\,\mathrm{\mu m}$ long with group index $3.6$.
::: solution
$\Delta\lambda = \lambda_0^2/(2N_gL) = (1.31\times10^{-6})^2/(2\times3.6\times4\times10^{-4}) = 5.96\times10^{-10}\,\mathrm m = 0.60\,\mathrm{nm}$.
:::
:::

::: exercise LED spectral width {level=2 check="1.795*0.025852*(1.3e-6)^2/1.23984e-6"}
Estimate the spectral width (FWHM, in metres) of a $1300\,\mathrm{nm}$ InGaAsP LED at $300\,\mathrm K$ from [[#thm-led-spectrum]], and the chromatic delay spread it would produce in $10\,\mathrm{km}$ of fibre with $\lvert D\rvert = 3\,\mathrm{ps/(nm\cdot km)}$.
::: solution
$\Delta E = 1.795\times0.02585 = 0.0464\,\mathrm{eV}$; $\Delta\lambda = \lambda_0^2\Delta E/hc = (1.3)^2\times0.0464/1.240\,\mathrm{\mu m} = 0.0633\,\mathrm{\mu m} = 6.3\times10^{-8}\,\mathrm m$ ($63\,\mathrm{nm}$). The spread is $3\times10\times63 = 1.9\,\mathrm{ns}$: enough to limit the link to a few hundred Mb/s even at the dispersion zero, because $D$ varies over such a wide spectrum.
:::
:::

::: exercise Slope efficiency {level=2 check="0.5*0.9*30/(30+15)*1.24/1.55"}
A $1550\,\mathrm{nm}$ laser has $\alpha_i = 15\,\mathrm{cm^{-1}}$, $\alpha_m = 30\,\mathrm{cm^{-1}}$, $\eta_i = 0.9$ and identical facets. Find the slope efficiency per facet in W/A.
::: solution
$\eta_d = 0.9\times30/45 = 0.60$. Per facet, $\tfrac12\eta_dh\nu/q = 0.30\times0.800\,\mathrm V = 0.24\,\mathrm{W/A}$.
:::
:::

::: exercise A DFB grating {level=2 check="1310e-9/(2*3.22)"}
Find the first-order grating period, in metres, of a DFB laser at $1310\,\mathrm{nm}$ with $n_{\mathrm{eff}} = 3.22$. If the laser is to lase $2\,\mathrm{nm}$ longer by a change of grating period alone, by how much must $\Lambda$ change?
::: solution
$\Lambda = \lambda_B/2n_{\mathrm{eff}} = 1310/6.44 = 203.4\,\mathrm{nm} = 2.03\times10^{-7}\,\mathrm m$. Since $\lambda_B \propto \Lambda$, a $2\,\mathrm{nm}$ shift needs $\Delta\Lambda = 203.4\times2/1310 = 0.31\,\mathrm{nm}$: arrays of DFB lasers for WDM are made with periods differing by fractions of a nanometre, written by electron-beam lithography.
:::
:::

::: exercise Characteristic temperature {level=2 check="20/log(15/8)"}
A laser's threshold is $8\,\mathrm{mA}$ at $20\,^\circ\mathrm C$ and $15\,\mathrm{mA}$ at $40\,^\circ\mathrm C$. Find its characteristic temperature $T_0$ in kelvin, and predict the threshold at $80\,^\circ\mathrm C$.
::: solution
$I_2/I_1 = e^{\Delta T/T_0}$ gives $T_0 = \Delta T/\ln(I_2/I_1) = 20/\ln1.875 = 31.8\,\mathrm K$. At $80\,^\circ\mathrm C$, $I_{th} = 8e^{60/31.8} = 8\times6.6 = 53\,\mathrm{mA}$. Such a low $T_0$, caused by Auger recombination and carrier leakage, is typical of older long-wavelength lasers; AlGaInAs quantum wells reach $T_0 \approx 70$–$90\,\mathrm K$.
:::
:::

::: exercise VCSEL mirror reflectance {level=3}
A VCSEL has three $8\,\mathrm{nm}$ quantum wells with a material gain of $2000\,\mathrm{cm^{-1}}$ at threshold, and internal losses are negligible. Light crosses the wells once on each pass. (a) Find the mirror reflectance (both mirrors equal) required for threshold. (b) A Bragg mirror of $N$ pairs of GaAs ($n_H = 3.52$) and AlAs ($n_L = 2.95$) on a GaAs substrate, illuminated from GaAs, has peak reflectance $R = [(1 - b)/(1 + b)]^2$ with $b = (n_L/n_H)^{2N}$. How many pairs are needed?
::: hint
For (a) the round-trip condition is $R^2e^{2gL_g} = 1$ with $L_g$ the total well thickness.
:::
::: solution
(a) $L_g = 24\,\mathrm{nm} = 2.4\times10^{-6}\,\mathrm{cm}$, so the single-pass gain is $e^{gL_g} = e^{0.0048} = 1.0048$. Threshold needs $R = e^{-gL_g} = 0.9952$: each mirror may lose less than half a per cent per reflection. (In practice the gain is enhanced by placing the wells at a standing-wave maximum, and absorption in the mirrors forces $R > 99.5\,\%$.)

(b) We need $(1 - b)/(1 + b) = \sqrt{0.9952} = 0.99760$, so $b = (1 - 0.99760)/(1 + 0.99760) = 1.20\times10^{-3}$. With $(n_L/n_H)^2 = (2.95/3.52)^2 = 0.7024$, $N = \ln b/\ln0.7024 = 6.73/0.353 = 19.1$: twenty pairs, each $\lambda/4n$ thick ($60$ and $72\,\mathrm{nm}$ at $850\,\mathrm{nm}$). Commercial VCSELs use $20$–$35$ pairs.
:::
:::

::: exercise Turn-on delay from the rate equations {level=3}
A laser biased at zero current is switched on at $t = 0$ to a current $I > I_{th}$. Below threshold, stimulated emission is negligible. (a) Show from [[#eq-rate]] that the carrier density rises as $N(t) = (\eta_iI\tau_n/qV)(1 - e^{-t/\tau_n})$ and that lasing begins after the **turn-on delay** $t_d = \tau_n\ln[I/(I - I_{th})]$. (b) Evaluate $t_d$ for $\tau_n = 2\,\mathrm{ns}$, $I_{th} = 16\,\mathrm{mA}$ and $I = 40\,\mathrm{mA}$, and explain why lasers in digital transmitters are biased slightly above threshold rather than switched off for zeros.
::: solution
(a) With $S \approx 0$, $\dd N/\dd t = \eta_iI/qV - N/\tau_n$, whose solution from $N(0) = 0$ is the given exponential approach to $\eta_iI\tau_n/qV$. Lasing starts when $N = N_{th} = \eta_iI_{th}\tau_n/qV$, i.e. when $1 - e^{-t/\tau_n} = I_{th}/I$, giving $t_d = \tau_n\ln[I/(I - I_{th})]$.

(b) $t_d = 2\ln(40/24) = 2\times0.511 = 1.02\,\mathrm{ns}$ — ten bit periods at $10\,\mathrm{Gb/s}$, and the delay would depend on the previous bits, causing pattern-dependent jitter. Biasing at or above threshold keeps $N \approx N_{th}$ during zeros, eliminating the delay; the cost is a non-zero "off" power and a finite **extinction ratio** $P_1/P_0$, typically $10$–$15$ ($10$–$12\,\mathrm{dB}$).
:::
:::
