A geostationary television satellite $36\,000\,\mathrm{km}$ above the equator radiates about $100\,\mathrm W$ per channel. By the time that signal reaches a $60\,\mathrm{cm}$ dish on a balcony it has been attenuated by more than $200\,\mathrm{dB}$, a factor of $10^{20}$, and the power collected is around a picowatt. Yet the picture is perfect, because the received power is still well above the noise generated in the dish's own low-noise block and picked up from the sky. A weather radar does something harder still: its pulse travels to a raindrop and back, and the echo it detects is weaker by the fourth power of the distance. Whether such systems work is decided by arithmetic — the **link budget** — that brings together everything in this course: antenna gains and apertures, propagation, matching and mismatch losses, amplifier gain and noise.

This chapter assembles that arithmetic. We derive the Friis transmission equation for a free-space link from the effective aperture of [[rf-microwave/antennas]], include polarisation and impedance mismatch, and look briefly at what happens near the ground. We then express receiver noise as a **noise temperature**, combine it with the noise an antenna collects from its surroundings into a **system noise temperature**, and write the link budget as a carrier-to-noise-density ratio. Finally we derive the **radar equation**, see why radar range grows only as the fourth root of transmitter power, and design a modern automotive FMCW radar. The statistical side of wireless channels — fading, diversity, OFDM — is the subject of [[communication-systems/wireless-communication]], whose Friis equation and link-budget definitions this chapter develops from the RF side.

## Free-space links {#sec-friis}

Consider a transmitter that delivers $P_t$ to an antenna of gain $G_t$, and a receiving antenna of gain $G_r$ at a distance $d$ in its far field, in free space.

::: theorem Friis transmission equation {#thm-friis}
The power delivered to a matched receiver is

$$
P_r = P_tG_tG_r\Bigl(\frac{\lambda}{4\pi d}\Bigr)^2 .
$$ {#eq-friis}

In decibels, $P_r = P_t + G_t + G_r - L_{\text{fs}}$, with the **free-space path loss**

$$
L_{\text{fs}} = 20\log_{10}\frac{4\pi d}{\lambda} = 20\log_{10}d_{\mathrm{km}} + 20\log_{10}f_{\mathrm{MHz}} + 32.44\ \mathrm{dB} .
$$ {#eq-fspl}

Including impedance mismatch at both antennas and a polarisation mismatch between their unit polarisation vectors $\hat{\boldsymbol\rho}_t$ and $\hat{\boldsymbol\rho}_r$,

$$
P_r = P_tG_tG_r\Bigl(\frac{\lambda}{4\pi d}\Bigr)^2\bigl(1 - \abs{\Gamma_t}^2\bigr)\bigl(1 - \abs{\Gamma_r}^2\bigr)\abs{\hat{\boldsymbol\rho}_t\cdot\hat{\boldsymbol\rho}_r^*}^2 .
$$ {#eq-friis-full}
:::

::: proof
An isotropic antenna radiating $P_t$ would produce the power density $P_t/(4\pi d^2)$ at distance $d$; the transmitting antenna's gain multiplies it by $G_t$ in the direction of the receiver. The receiving antenna collects $S\,A_e$ with $A_e = \lambda^2G_r/(4\pi)$ from [[rf-microwave/antennas#thm-aperture]]:

$$
P_r = \frac{P_tG_t}{4\pi d^2}\cdot\frac{\lambda^2G_r}{4\pi} ,
$$

which is [[#eq-friis]]. For [[#eq-fspl]], substitute $\lambda = c/f$ with $d$ in kilometres and $f$ in megahertz: $20\log_{10}(4\pi\times10^3\times10^6/c) = 32.44$. The mismatch factors are the fractions of incident power accepted at each port ([[rf-microwave/lines-smith-chart#thm-conjugate]]); the polarisation factor is the fraction of the incident wave's power in the polarisation the receiving antenna responds to, $\cos^2$ of the angle between two linear polarisations.
:::

The $\lambda^2$ in the path loss is a property of the *receiving antenna*, not of space: for fixed gains, a higher frequency means a smaller effective aperture. For fixed antenna *areas*, $G_tG_r\lambda^2\propto A_tA_r/\lambda^2$ and the received power rises with frequency, which is why high-capacity point-to-point links and satellites use high frequencies with dishes.

::: warning Gain and loss in decibels: use one convention per line
Link budgets mix powers in dBm or dBW, gains in dBi, losses in dB, and noise in dBm/Hz or dBK. Every term should carry its unit, losses should be written with a minus sign in a single column, and dBm and dBW differ by $30$. A frequent mistake is adding the path loss with the wrong sign, or using $10\log_{10}$ on a voltage ratio such as a field strength.
:::

::: example A microwave backhaul link {#ex-backhaul}
A $6\,\mathrm{GHz}$ point-to-point link spans $40\,\mathrm{km}$ with $38\,\mathrm{dBi}$ dishes at each end, $1\,\mathrm W$ transmit power and $2\,\mathrm{dB}$ of waveguide loss at each end. The receiver has a $28\,\mathrm{MHz}$ bandwidth and a $5\,\mathrm{dB}$ noise figure. Find the received power, the SNR and the fade margin if the modem needs an SNR of $25\,\mathrm{dB}$.
::: solution
$\lambda = 0.05\,\mathrm m$ and $L_{\text{fs}} = 20\log_{10}(4\pi\times4\times10^4/0.05) = 140.0\,\mathrm{dB}$. The budget:

| item | value |
|---|---|
| transmit power | $+30.0\,\mathrm{dBm}$ |
| transmit feeder loss | $-2.0\,\mathrm{dB}$ |
| transmit antenna gain | $+38.0\,\mathrm{dBi}$ |
| free-space path loss | $-140.0\,\mathrm{dB}$ |
| receive antenna gain | $+38.0\,\mathrm{dBi}$ |
| receive feeder loss | $-2.0\,\mathrm{dB}$ |
| **received power** | $-38.0\,\mathrm{dBm}$ |

The noise power referred to the receiver input is $kT_0BF$, i.e. $-174\,\mathrm{dBm/Hz} + 10\log_{10}(2.8\times10^7) + 5 = -174 + 74.5 + 5 = -94.5\,\mathrm{dBm}$. The SNR is $56.5\,\mathrm{dB}$ and the fade margin is $56.5 - 25 = 31.5\,\mathrm{dB}$. That margin is not extravagant: at $6\,\mathrm{GHz}$ over $40\,\mathrm{km}$, multipath from atmospheric layering can cause deep fades for a small fraction of the time, and links are engineered for availabilities of $99.99\,\%$ or better.
:::
:::

### Near the ground

Real links are not in free space. If the direct path passes close to the ground or to obstacles, a reflected wave interferes with the direct one. The reflected wave travels a slightly longer path, and at grazing incidence the ground's reflection coefficient is close to $-1$ ([[electromagnetics/reflection-refraction]]). For antenna heights $h_t$, $h_r$ and $d\gg h_t, h_r$, the path difference is $2h_th_r/d$, and the **two-ray model** gives

$$
P_r = P_tG_tG_r\Bigl(\frac{\lambda}{4\pi d}\Bigr)^2\cdot4\sin^2\Bigl(\frac{2\pi h_th_r}{\lambda d}\Bigr)\approx P_tG_tG_r\frac{h_t^2h_r^2}{d^4}\quad(d\gg4h_th_r/\lambda) .
$$ {#eq-two-ray}

Close in, the received power oscillates about the free-space value between $+6\,\mathrm{dB}$ and deep nulls; beyond the **breakpoint** distance $4h_th_r/\lambda$ it falls as $d^{-4}$, $40\,\mathrm{dB}$ per decade, independent of frequency. Clearing the direct path requires keeping obstacles out of the first **Fresnel zone**, the ellipsoid within which path differences are below $\lambda/2$; at a point $d_1$ from one end and $d_2$ from the other its radius is $r_1 = \sqrt{\lambda d_1d_2/(d_1 + d_2)}$.

::: widget plot
f: -20*log10(4*pi*10^x*f/0.3); -20*log10(4*pi*10^x*f/0.3) + 10*log10(4*sin(2*pi*h*g*f/(0.3*10^x))^2)
x: 1, 5
y: -170, -30
sliders: f=0.9:0.1:6:0.1; h=30:2:100:1; g=1.5:1:10:0.1
labels: \text{free space}; \text{two-ray (ground reflection)}
caption: Path gain $P_r/(P_tG_tG_r)$ in decibels against $\log_{10}$ of the distance in metres (so $x = 3$ is $1\,\mathrm{km}$), for frequency $f$ in gigahertz and antenna heights $h$ and $g$ in metres. The free-space line falls $20\,\mathrm{dB}$ per decade. The two-ray curve oscillates about it at short range and, beyond the breakpoint $4hg/\lambda$ (about $540\,\mathrm m$ for the starting values), falls at $40\,\mathrm{dB}$ per decade. Raise the antennas and the breakpoint moves out: height is the cheapest way to extend a ground link.
:::

Other effects add loss: atmospheric absorption by oxygen (peaks near $60\,\mathrm{GHz}$) and water vapour ($22$ and $183\,\mathrm{GHz}$), rain attenuation above about $10\,\mathrm{GHz}$ (several decibels per kilometre in heavy rain at $30\,\mathrm{GHz}$), and diffraction and scattering in cities, modelled empirically by the log-distance and shadowing models of [[communication-systems/wireless-communication]].

## Noise temperature {#sec-noise-temp}

At microwave frequencies the noise powers involved are so small, and the sources so varied (the receiver, the cables, the ground, the sky), that it is convenient to describe every noise source by an equivalent temperature. A resistor at temperature $T$ delivers the available noise power $kTB$ to a matched load ([[electronics-2/electronic-noise]]), with $k = 1.381\times10^{-23}\,\mathrm{J/K}$; $kT_0$ at $T_0 = 290\,\mathrm K$ is $-174\,\mathrm{dBm/Hz}$.

::: definition Equivalent noise temperature {#def-noise-temperature}
The **equivalent noise temperature** $T_e$ of a two-port is the temperature of a matched source resistor that, connected to a noiseless copy of the two-port, would produce the same output noise as the real two-port with a noiseless source. It is related to the noise figure by

$$
T_e = (F - 1)T_0, \qquad F = 1 + \frac{T_e}{T_0} .
$$ {#eq-te}

The **antenna noise temperature** $T_A$ is the temperature of a matched resistor that would deliver the same noise power as the antenna; it is the average of the brightness temperature of the antenna's surroundings, weighted by its pattern.
:::

A noise figure of $3\,\mathrm{dB}$ is $T_e = 289\,\mathrm K$; a good LNA with $F = 0.5\,\mathrm{dB}$ has $T_e = 35\,\mathrm K$, and the temperature scale distinguishes such low-noise devices far better than decibels of noise figure. An antenna pointing at clear sky at a few gigahertz sees $T_A$ of $10$–$50\,\mathrm K$ (cosmic background, the atmosphere, and the ground in its side lobes); one pointing at the ground, or at the Sun, sees hundreds or thousands of kelvin.

::: theorem Cascade and lossy components {#thm-cascade-t}
A cascade of two-ports with gains $G_1, G_2, \dots$ and noise temperatures $T_1, T_2, \dots$ has

$$
T_e = T_1 + \frac{T_2}{G_1} + \frac{T_3}{G_1G_2} + \cdots .
$$ {#eq-cascade-t}

A matched passive component with loss $L$ ($G = 1/L$) at physical temperature $T_p$ has $T_e = (L - 1)T_p$. The **system noise temperature** referred to the antenna terminals is $T_{\text{sys}} = T_A + T_e$, and the noise power in bandwidth $B$ is $kT_{\text{sys}}B$.
:::

::: proof
Refer every source to the input. The first stage contributes $kT_1B$ at its own input. The second stage's noise, $kT_2B$ referred to its input, appears at the first stage's input divided by $G_1$; and so on. Summing gives [[#eq-cascade-t]], which is Friis's noise formula with $F_n = 1 + T_n/T_0$. For the lossy component, place it between a matched source at $T_p$ and a matched load in thermal equilibrium: the output noise must be $kT_pB$, since everything is at the same temperature. The source's noise contributes $kT_pB/L$, so the component itself must contribute $kT_pB(1 - 1/L)$ at its output, which referred to its input is $kT_pB(L - 1)$: $T_e = (L - 1)T_p$.
:::

The second result explains why every decibel of loss in front of the LNA is so costly: it adds $(L - 1)T_p$ of noise *and* multiplies the noise of everything after it by $L$.

::: example System noise temperature of a satellite ground terminal {#ex-tsys}
A receiving dish has $T_A = 30\,\mathrm K$. A waveguide feed with $0.3\,\mathrm{dB}$ loss at $290\,\mathrm K$ connects it to an LNA with $T_e = 40\,\mathrm K$ and $50\,\mathrm{dB}$ gain, followed by a receiver with an $8\,\mathrm{dB}$ noise figure. Find $T_{\text{sys}}$ at the antenna terminals and the figure of merit $G/T$ for the $41.4\,\mathrm{dBi}$ dish of [[rf-microwave/antennas#ex-dish]].
::: solution
The feed: $L = 10^{0.03} = 1.0715$, $T_{\text{feed}} = 0.0715\times290 = 20.7\,\mathrm K$. The receiver: $T_{\text{rx}} = (10^{0.8} - 1)\times290 = 1540\,\mathrm K$. By [[#eq-cascade-t]], with the feed as the first stage ($G_1 = 1/L$),

$$
T_e = 20.7 + 1.0715\times40 + \frac{1.0715\times1540}{10^5} = 20.7 + 42.9 + 0.02 = 63.6\,\mathrm K, \qquad T_{\text{sys}} = 30 + 63.6 = 93.6\,\mathrm K .
$$

The LNA's high gain makes the noisy receiver irrelevant, but the feed loss nearly doubles the noise contributed before the LNA. Then

$$
\frac GT = 41.4 - 10\log_{10}93.6 = 41.4 - 19.7 = 21.7\,\mathrm{dB/K} .
$$

Mounting the LNA directly at the feed horn (as the "low-noise block" of every satellite dish does) would remove the feed loss: $T_{\text{sys}}\approx30 + 40 = 70\,\mathrm K$ and $G/T = 23.0\,\mathrm{dB/K}$, a $1.3\,\mathrm{dB}$ improvement from moving one component.
:::
:::

::: quiz
A receiver has a $2\,\mathrm{dB}$ cable between the antenna and an LNA with $T_e = 50\,\mathrm K$. Roughly what is the noise temperature of the cable–LNA combination, at $290\,\mathrm K$ ambient?
- [ ] $52\,\mathrm K$
- [ ] $130\,\mathrm K$
- [x] $250\,\mathrm K$
- [ ] $580\,\mathrm K$
::: solution
$L = 10^{0.2} = 1.585$, so the cable contributes $(0.585)(290) = 170\,\mathrm K$, and the LNA's $50\,\mathrm K$ is multiplied by $L$ to $79\,\mathrm K$: $T_e = 249\,\mathrm K$, five times the LNA alone. Equivalently the noise figure has risen from $0.7\,\mathrm{dB}$ to $2.7\,\mathrm{dB}$ — the cable's loss adds directly, plus a little.
:::
:::

## The link budget {#sec-budget}

Combining the Friis equation with the system noise temperature gives the quantity that determines the performance of any digital link: the ratio of received carrier power to noise power spectral density.

::: theorem Carrier-to-noise-density ratio {#thm-cn0}
For a link with transmitter EIRP $= P_tG_t$, path loss $L_p$ (free-space plus any extra losses), and receiving figure of merit $G_r/T_{\text{sys}}$,

$$
\frac{C}{N_0} = \frac{\mathrm{EIRP}\cdot(G_r/T_{\text{sys}})}{L_p\,k}, \qquad \Bigl(\frac{C}{N_0}\Bigr)_{\mathrm{dB\text{-}Hz}} = \mathrm{EIRP}_{\mathrm{dBW}} - L_p + \Bigl(\frac GT\Bigr)_{\mathrm{dB/K}} + 228.6 .
$$ {#eq-cn0}

The carrier-to-noise ratio in bandwidth $B$ is $C/N = (C/N_0)/B$, and for a bit rate $R_b$ the energy per bit to noise density ratio is $E_b/N_0 = (C/N_0)/R_b$.
:::

::: proof
$C = \mathrm{EIRP}\cdot G_r/L_p$ by [[#eq-friis]] with $L_p = (4\pi d/\lambda)^2$ times other losses, and $N_0 = kT_{\text{sys}}$ by [[#thm-cascade-t]]. Dividing, and using $10\log_{10}k = -228.6\,\mathrm{dBW/(K\,Hz)}$, gives [[#eq-cn0]]. $E_b/N_0 = CT_b/N_0$ with $T_b = 1/R_b$.
:::

The receiving station enters only through $G/T$, which is why satellite earth stations are specified by that one number, and $E_b/N_0$ is the link's input to the error-rate curves of [[communication-systems/digital-modulation]].

::: example A direct-broadcast satellite downlink {#ex-dbs}
A geostationary satellite has an EIRP of $52\,\mathrm{dBW}$ per transponder at $12\,\mathrm{GHz}$. The slant range to a receiver is $38\,000\,\mathrm{km}$, atmospheric and pointing losses total $1\,\mathrm{dB}$, and the receiving terminal is that of [[#ex-tsys]] ($G/T = 21.7\,\mathrm{dB/K}$). Find $C/N_0$ and the $C/N$ in a $27\,\mathrm{MHz}$ transponder bandwidth.
::: solution
$L_{\text{fs}} = 20\log_{10}(4\pi\times3.8\times10^7/0.025) = 205.6\,\mathrm{dB}$. By [[#eq-cn0]],

$$
\frac{C}{N_0} = 52 - 205.6 - 1 + 21.7 + 228.6 = 95.7\,\mathrm{dB\text{-}Hz}, \qquad \frac CN = 95.7 - 10\log_{10}(2.7\times10^7) = 95.7 - 74.3 = 21.4\,\mathrm{dB} .
$$

A DVB-S2 signal with 8PSK and rate-$3/4$ coding needs about $8\,\mathrm{dB}$, leaving over $13\,\mathrm{dB}$ for rain fade. In heavy rain at $12\,\mathrm{GHz}$ the path loss can rise by $5$–$10\,\mathrm{dB}$ *and* the sky noise temperature rises towards $290\,\mathrm K$ (a lossy atmosphere radiates, by [[#thm-cascade-t]]), so the margin shrinks from both sides; at $20$–$30\,\mathrm{GHz}$ adaptive coding and modulation is essential.
:::
:::

## Radar {#sec-radar}

A **radar** transmits a signal, detects the echo from a target, and measures the delay (range), the Doppler shift (radial velocity) and the direction of arrival. Unlike a communication link, the signal travels out and back, and the target is not an antenna but a scatterer.

::: definition Radar cross-section {#def-rcs}
The **radar cross-section** (RCS) $\sigma$ of a target is the area that, intercepting the incident power density $S_i$ and re-radiating it isotropically, would produce the scattered power density actually observed at the radar:

$$
\sigma = \lim_{R\to\infty}4\pi R^2\frac{S_s}{S_i}\quad(\mathrm m^2) .
$$

It depends on the target's size, shape, material, aspect and the frequency; it is often quoted in dBsm (decibels relative to $1\,\mathrm m^2$).
:::

Typical values at microwave frequencies: a small drone $0.01\,\mathrm m^2$, a person $1\,\mathrm m^2$, a car $10$–$100\,\mathrm m^2$, a large airliner $10$–$100\,\mathrm m^2$, a ship thousands of square metres. A conducting sphere of radius $a\gg\lambda$ has $\sigma = \pi a^2$, its geometric cross-section; a flat plate seen face-on has $\sigma = 4\pi A^2/\lambda^2$, enormous because it reflects like a mirror; stealth design shapes targets to scatter away from the radar.

::: theorem The radar equation {#thm-radar}
A monostatic radar (one antenna of gain $G$ for transmit and receive) transmitting peak power $P_t$ at wavelength $\lambda$ receives from a target of RCS $\sigma$ at range $R$ the power

$$
P_r = \frac{P_tG^2\lambda^2\sigma}{(4\pi)^3R^4} .
$$ {#eq-radar}

If detection requires a signal-to-noise ratio $\mathrm{SNR}_{\min}$ in a receiver of noise figure $F$ and bandwidth $B$, with system losses $L$, the maximum range is

$$
R_{\max} = \left[\frac{P_tG^2\lambda^2\sigma}{(4\pi)^3kT_0BFL\cdot\mathrm{SNR}_{\min}}\right]^{1/4} .
$$ {#eq-rmax}
:::

::: proof
The power density at the target is $S_i = P_tG/(4\pi R^2)$. The target scatters $\sigma S_i$ as if isotropically, so the density back at the radar is $\sigma S_i/(4\pi R^2)$. The antenna collects it with effective aperture $A_e = G\lambda^2/(4\pi)$:

$$
P_r = \frac{P_tG}{4\pi R^2}\cdot\frac{\sigma}{4\pi R^2}\cdot\frac{G\lambda^2}{4\pi} ,
$$

which is [[#eq-radar]]. Setting $P_r/(kT_0BFL) = \mathrm{SNR}_{\min}$ (the noise referred to the input, taking $T_A\approx T_0$ for simplicity) and solving for $R$ gives [[#eq-rmax]].
:::

The fourth root is the radar designer's burden: doubling the range needs sixteen times the power, or four times the antenna gain. The matched-filter receiver of [[communication-systems/optimal-detection]] makes the SNR depend on the pulse energy rather than its peak power, which is why radars transmit long coded pulses and compress them (**pulse compression**), and integrating $n$ pulses coherently multiplies the SNR by $n$.

::: example Range of a surveillance radar {#ex-radar-range}
An S-band radar at $3\,\mathrm{GHz}$ has $P_t = 1\,\mathrm{MW}$ peak, an antenna gain of $35\,\mathrm{dBi}$, a receiver bandwidth of $1\,\mathrm{MHz}$, a noise figure of $3\,\mathrm{dB}$ and $6\,\mathrm{dB}$ of system losses. It needs $13\,\mathrm{dB}$ SNR for reliable detection. Find the maximum range for a $1\,\mathrm m^2$ target on a single pulse, and with $10$ pulses integrated coherently.
::: solution
$\lambda = 0.1\,\mathrm m$, $G = 3162$, $kT_0B = 4.0\times10^{-15}\,\mathrm W$, $F = 2$, $L = 4$, $\mathrm{SNR}_{\min} = 20$. By [[#eq-rmax]],

$$
R_{\max}^4 = \frac{10^6\times3162^2\times0.01\times1}{1984\times4.0\times10^{-15}\times2\times4\times20} = 7.9\times10^{19}\,\mathrm m^4, \qquad R_{\max} = 94\,\mathrm{km} .
$$

Integrating $10$ pulses coherently raises the SNR tenfold, which is equivalent to dividing $\mathrm{SNR}_{\min}$ by $10$; the range grows by $10^{1/4} = 1.78$, to $168\,\mathrm{km}$. A target of $0.01\,\mathrm m^2$ (a small drone) would be seen only at $94/\sqrt{10} = 30\,\mathrm{km}$ on a single pulse.
:::
:::

::: widget plot
f: 10*log10(P*1e3*10^7*0.01*s/((4*pi)^3*1.381e-23*290*1e6*10^0.9*(x*1000)^4))
x: 10, 300
y: -10, 40
sliders: P=1000:10:5000:10; s=1:0.01:100:0.01
hlines: 13
labels: \text{SNR (dB), single pulse}
caption: Single-pulse SNR against range in kilometres for the radar of [[#ex-radar-range]] ($35\,\mathrm{dBi}$, $3\,\mathrm{GHz}$, $1\,\mathrm{MHz}$, $F\cdot L = 9\,\mathrm{dB}$), with peak power $P$ in kilowatts and target cross-section $s$ in square metres. The SNR falls $40\,\mathrm{dB}$ per decade of range; the horizontal line is the $13\,\mathrm{dB}$ detection threshold, crossed at $94\,\mathrm{km}$ for $1\,\mathrm{MW}$ and $1\,\mathrm m^2$. Multiply the power by $16$ (it will not quite fit on the slider) and the crossing only doubles; multiply $s$ by $100$ and the range rises by $\sqrt{10}$.
:::

### Range, Doppler and FMCW radar

A pulse of duration $\tau$ resolves two targets if their echoes do not overlap: the **range resolution** is $\Delta R = c\tau/2 = c/(2B)$ for a pulse of bandwidth $B\approx1/\tau$ (or after pulse compression, of whatever bandwidth the coded pulse occupies). The **unambiguous range** for pulse repetition frequency $f_r$ is $c/(2f_r)$. A target moving with radial velocity $v_r$ shifts the echo by the **Doppler frequency**

$$
f_d = \frac{2v_r}{\lambda} ,
$$ {#eq-doppler}

positive for approaching targets; the factor $2$ is because the path length changes at $2v_r$.

**Frequency-modulated continuous-wave** (FMCW) radar transmits a linear chirp sweeping a bandwidth $B$ in a time $T_c$, mixes the echo with the transmitted signal, and measures the **beat frequency** $f_b = 2RS/c$, where $S = B/T_c$ is the chirp slope. Range resolution is again $c/(2B)$. Successive chirps reveal the Doppler shift through the phase change of the beat signal from chirp to chirp; with $N$ chirps the velocity resolution is $\lambda/(2NT_c)$ and the maximum unambiguous velocity $\lambda/(4T_c)$.

::: example Designing a 77 GHz automotive radar {#ex-fmcw}
An automotive radar at $77\,\mathrm{GHz}$ must resolve targets $15\,\mathrm{cm}$ apart in range, see out to $100\,\mathrm m$, and measure velocities up to $\pm19\,\mathrm{m/s}$ relative to the car with a resolution of $0.3\,\mathrm{m/s}$. Choose the chirp bandwidth, duration and number of chirps, and find the beat frequency at $100\,\mathrm m$ and the Doppler shift at $30\,\mathrm{m/s}$.
::: solution
**Bandwidth.** $\Delta R = c/(2B) = 0.15\,\mathrm m$ gives $B = 3\times10^8/0.3 = 1\,\mathrm{GHz}$, within the $76$–$81\,\mathrm{GHz}$ band.

**Chirp duration.** $\lambda = c/f = 3.90\,\mathrm{mm}$. The maximum unambiguous velocity $\lambda/(4T_c) = 19.5\,\mathrm{m/s}$ requires $T_c = 3.9\times10^{-3}/(4\times19.5) = 50\,\mu\mathrm s$. The chirp slope is $S = 10^9/(5\times10^{-5}) = 2\times10^{13}\,\mathrm{Hz/s}$, i.e. $20\,\mathrm{MHz/\mu s}$.

**Beat frequency.** At $R = 100\,\mathrm m$, $f_b = 2RS/c = 2\times100\times2\times10^{13}/(3\times10^8) = 13.3\,\mathrm{MHz}$, so the intermediate-frequency chain and analog-to-digital converter must handle about $15\,\mathrm{MHz}$, far less than the $1\,\mathrm{GHz}$ sweep: this is the great economy of FMCW.

**Number of chirps.** The velocity resolution $\lambda/(2NT_c) = 0.3\,\mathrm{m/s}$ gives $N = 3.9\times10^{-3}/(2\times0.3\times5\times10^{-5}) = 130$; a power of two, $N = 128$, gives $0.30\,\mathrm{m/s}$ in a frame of $6.4\,\mathrm{ms}$.

**Doppler.** At $30\,\mathrm{m/s}$, $f_d = 2\times30/3.9\times10^{-3} = 15.4\,\mathrm{kHz}$ — beyond the unambiguous $\pm19.5\,\mathrm{m/s}$ of this design, so it would alias; real radars interleave chirps of different durations to resolve such ambiguities.
:::
:::

::: quiz
A radar's transmitter power is doubled and nothing else changes. By how much does the maximum detection range increase?
- [ ] By $100\,\%$
- [ ] By $41\,\%$
- [x] By $19\,\%$
- [ ] By $3\,\mathrm{dB}$
::: solution
$R_{\max}\propto P_t^{1/4}$, so it increases by $2^{1/4} = 1.19$. A one-way link's range would grow by $\sqrt2 = 1.41$ under the same change (free-space, $P_r\propto1/d^2$).
:::
:::

::: application Radio astronomy and deep-space links
The extreme cases of link budgets are found in radio astronomy and deep-space communication. NASA's Deep Space Network uses $70\,\mathrm m$ dishes with cryogenically cooled amplifiers, giving system noise temperatures of about $20\,\mathrm K$ at $8.4\,\mathrm{GHz}$ and $G/T$ above $60\,\mathrm{dB/K}$. With that, the Voyager spacecraft's $20\,\mathrm W$ transmitter and $3.7\,\mathrm m$ dish, more than $20$ billion kilometres away, still deliver about $160$ bits per second, at received powers of the order of $10^{-18}\,\mathrm W$. Each term of [[#eq-cn0]] has been pushed to its limit: the biggest practical antennas, the lowest noise, error-correcting codes close to the Shannon limit, and very low data rates.
:::

::: history
Heinrich Hertz noticed in 1886–88 that metal objects reflect radio waves, and Christian Hülsmeyer patented a "telemobiloscope" for detecting ships in 1904. Practical radar came in the 1930s in several countries at once; in Britain, Robert Watson-Watt and Arnold Wilkins detected an aircraft at Daventry in February 1935, and the Chain Home network was operating by 1938. The cavity magnetron of 1940 made microwave radar possible, and the wartime MIT Radiation Laboratory produced most of its theory, including the radar equation in its modern form. Harald Friis of Bell Laboratories published his transmission formula in 1946, and his 1944 paper on the noise figure of radio receivers had already given the cascade formula. Arno Penzias and Robert Wilson, measuring the noise temperature of a horn antenna at Bell Laboratories in 1964–65, found an unexplained excess of about $3.5\,\mathrm K$ in every direction: the cosmic microwave background, which sets the lowest antenna temperature possible.
:::

## Where this leads {#sec-next}

This chapter closes the course by putting its components into systems. The SNR and $E_b/N_0$ computed here are the inputs to the modulation and detection theory of [[communication-systems/digital-modulation]] and [[communication-systems/optimal-detection]], and multipath and fading, which free-space and two-ray models ignore, are treated statistically in [[communication-systems/wireless-communication]]. The detection of radar echoes in noise is a hypothesis test ([[random-signals]]), and the spectral analysis of FMCW beat signals is the FFT processing of [[dsp]]. Optical links obey the same Friis arithmetic with apertures of millimetres and wavelengths of micrometres ([[photonics]]).

::: summary
- Friis: $P_r = P_tG_tG_r(\lambda/4\pi d)^2$, free-space path loss $20\log_{10}(4\pi d/\lambda)$; include mismatch $(1 - \abs\Gamma^2)$ and polarisation factors.
- Near the ground the two-ray model gives $d^{-4}$ beyond the breakpoint $4h_th_r/\lambda$; keep the first Fresnel zone clear.
- Noise is expressed as temperature: $T_e = (F - 1)T_0$; a lossy component at $T_p$ has $T_e = (L - 1)T_p$; cascades add as $T_1 + T_2/G_1 + \cdots$; $T_{\text{sys}} = T_A + T_e$.
- Link budget: $C/N_0 = \mathrm{EIRP} - L_p + G/T + 228.6$ (dB-Hz); the receiver enters only through $G/T$.
- Radar equation: $P_r = P_tG^2\lambda^2\sigma/((4\pi)^3R^4)$, so $R_{\max}\propto P_t^{1/4}$; integration and pulse compression raise the SNR.
- Range resolution $c/(2B)$, Doppler $2v_r/\lambda$; FMCW radar measures range by beat frequency $2RS/c$ and velocity over many chirps.
:::

## Exercises

::: exercise Path loss at 2.4 GHz {level=1 check="20*log10(4*pi*100*2.4e9/3e8)"}
Find the free-space path loss, in decibels, over $100\,\mathrm m$ at $2.4\,\mathrm{GHz}$ (take $c = 3\times10^8\,\mathrm{m/s}$).
::: solution
$L = 20\log_{10}(4\pi\times100/0.125) = 20\log_{10}(10\,053) = 80.0\,\mathrm{dB}$. By the formula, $20\log_{10}0.1 + 20\log_{10}2400 + 32.44 = -20 + 67.6 + 32.44 = 80.0\,\mathrm{dB}$.
:::
:::

::: exercise Noise temperature from noise figure {level=1 check="290*(10^0.3 - 1)"}
What is the equivalent noise temperature, in kelvin, of an amplifier with a $3\,\mathrm{dB}$ noise figure?
::: solution
$T_e = 290(10^{0.3} - 1) = 290\times0.995 = 289\,\mathrm K$.
:::
:::

::: exercise Doppler shift {level=1 check="2*20/(3e8/24e9)"}
A $24\,\mathrm{GHz}$ traffic radar observes a car approaching at $20\,\mathrm{m/s}$. Find the Doppler shift in hertz.
::: solution
$\lambda = 12.5\,\mathrm{mm}$ and $f_d = 2\times20/0.0125 = 3.2\,\mathrm{kHz}$.
:::
:::

::: exercise Received power {level=2 check="40 + 20 + 10 - 20*log10(4*pi*1e4*1e10/3e8)"}
A $10\,\mathrm W$ transmitter with a $20\,\mathrm{dBi}$ antenna sends to a $10\,\mathrm{dBi}$ antenna $10\,\mathrm{km}$ away at $10\,\mathrm{GHz}$. Find the received power in dBm.
::: solution
$P_t = 40\,\mathrm{dBm}$; $L_{\text{fs}} = 20\log_{10}(4\pi\times10^4/0.03) = 132.4\,\mathrm{dB}$; $P_r = 40 + 20 + 10 - 132.4 = -62.4\,\mathrm{dBm}$.
:::
:::

::: exercise A lossy cable's noise temperature {level=2 check="290*(10^0.1 - 1)"}
A matched cable with $1\,\mathrm{dB}$ loss at $290\,\mathrm K$ precedes a receiver. What noise temperature, in kelvin, does the cable alone contribute at its input?
::: solution
$T_e = (L - 1)T_p = (10^{0.1} - 1)\times290 = 0.259\times290 = 75\,\mathrm K$. Its noise figure is exactly $1\,\mathrm{dB}$, the same as its loss — true for any matched passive component at $T_0$.
:::
:::

::: exercise Clearing the Fresnel zone {level=2 check="sqrt(0.05*20e3*20e3/40e3)"}
What is the radius, in metres, of the first Fresnel zone at the midpoint of the $40\,\mathrm{km}$, $6\,\mathrm{GHz}$ link of [[#ex-backhaul]]?
::: solution
$r_1 = \sqrt{\lambda d_1d_2/d} = \sqrt{0.05\times2\times10^4\times2\times10^4/(4\times10^4)} = \sqrt{500} = 22.4\,\mathrm m$. Planners usually require at least $60\,\%$ of it clear of terrain and trees, allowing for the Earth's curvature (a bulge of $d_1d_2/(2kR_E)\approx24\,\mathrm m$ at the midpoint of a $40\,\mathrm{km}$ path with the standard $k = 4/3$ effective-Earth-radius model).
:::
:::

::: exercise Pulse radar timing {level=2 check="3e8/(2*1000)"}
A pulse radar has a pulse repetition frequency of $1\,\mathrm{kHz}$ and a pulse length of $1\,\mu\mathrm s$. Find its unambiguous range (in metres) and its range resolution. What bandwidth would a compressed pulse need for $1.5\,\mathrm m$ resolution?
::: solution
Unambiguous range $c/(2f_r) = 3\times10^8/2000 = 150\,\mathrm{km}$; resolution $c\tau/2 = 150\,\mathrm m$. For $1.5\,\mathrm m$, $B = c/(2\Delta R) = 100\,\mathrm{MHz}$, achieved by a chirped pulse still $1\,\mu\mathrm s$ long (time–bandwidth product $100$), which keeps the pulse energy high.
:::
:::

::: exercise Choosing a dish for a satellite link {level=3}
A low-Earth-orbit satellite at $1000\,\mathrm{km}$ range transmits $10\,\mathrm{Mbit/s}$ at $8\,\mathrm{GHz}$ with an EIRP of $10\,\mathrm{dBW}$. The ground station has $T_{\text{sys}} = 150\,\mathrm K$, the modem needs $E_b/N_0 = 6\,\mathrm{dB}$, and a $5\,\mathrm{dB}$ margin is required for atmospheric and pointing losses at low elevation. Find the smallest dish diameter with aperture efficiency $0.6$.
::: solution
$\lambda = 37.5\,\mathrm{mm}$ and $L_{\text{fs}} = 20\log_{10}(4\pi\times10^6/0.0375) = 170.5\,\mathrm{dB}$. Required $C/N_0 = E_b/N_0 + 10\log_{10}R_b + \text{margin} = 6 + 70 + 5 = 81\,\mathrm{dB\text{-}Hz}$. From [[#eq-cn0]], $G/T = 81 - 10 + 170.5 - 228.6 = 12.9\,\mathrm{dB/K}$, so $G = 12.9 + 10\log_{10}150 = 12.9 + 21.8 = 34.7\,\mathrm{dBi}$, i.e. $G = 2950$. With $G = 0.6(\pi D/\lambda)^2$, $D = (\lambda/\pi)\sqrt{2950/0.6} = (0.0375/\pi)(70.1) = 0.84\,\mathrm m$. A $1\,\mathrm m$ dish would be chosen; it must track the satellite across the sky, since its beamwidth ($70\lambda/D\approx2.6^\circ$) is small compared with the satellite's motion.
:::
:::

::: exercise The noise temperature of an attenuating atmosphere {level=3}
Use [[#thm-cascade-t]] to show that an antenna looking at cold space ($T\approx3\,\mathrm K$) through a layer of rain with attenuation $A$ decibels at physical temperature $T_p = 275\,\mathrm K$ sees $T_A = 3/L + T_p(1 - 1/L)$, where $L = 10^{A/10}$. Evaluate for $A = 0$, $3$ and $10\,\mathrm{dB}$, and find the total degradation of $C/N_0$ for the $3\,\mathrm{dB}$ case when the clear-sky $T_{\text{sys}}$ is $93.6\,\mathrm K$ with $T_A = 30\,\mathrm K$.
::: solution
The rain is a lossy two-port between the "source" (space at $3\,\mathrm K$) and the antenna. The output noise temperature of a source at $T_s$ through a loss $L$ at $T_p$ is $T_s/L + T_p(1 - 1/L)$: the source noise attenuated, plus the medium's own emission ($T_e = (L - 1)T_p$ referred to the input, i.e. $(1 - 1/L)T_p$ at the output). For $A = 0$: $3\,\mathrm K$ (plus the clear-sky contributions omitted here). For $3\,\mathrm{dB}$ ($L = 2$): $1.5 + 137.5 = 139\,\mathrm K$. For $10\,\mathrm{dB}$: $0.3 + 247.5 = 248\,\mathrm K$. In the $3\,\mathrm{dB}$ case, if the rain adds $139 - 3 = 136\,\mathrm K$ to the clear-sky antenna temperature (pessimistically ignoring that some clear-sky contribution is also attenuated), $T_{\text{sys}}$ rises from $93.6$ to about $230\,\mathrm K$, a $3.9\,\mathrm{dB}$ increase in noise, on top of the $3\,\mathrm{dB}$ signal loss: $C/N_0$ falls by about $6.9\,\mathrm{dB}$. A low-noise receiving system suffers more from rain noise than a noisy one, because its clear-sky $T_{\text{sys}}$ is smaller.
:::
:::
