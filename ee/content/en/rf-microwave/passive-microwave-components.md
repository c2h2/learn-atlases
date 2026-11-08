Open the front end of a base-station receiver or a radar and you find a small number of passive building blocks used over and over. A **power divider** splits a transmitter's output between the elements of an antenna array. A **directional coupler** samples a few per cent of the forward power for a level-control loop without being disturbed by what is reflected. A **hybrid** produces two outputs of equal amplitude in quadrature, or in antiphase, for balanced amplifiers, mixers and monopulse radars. **Resonators** set the frequency of oscillators, and **filters** made of coupled resonators keep each radio channel out of its neighbours. At microwave frequencies all of these are made from the transmission lines and waveguides of the previous chapters, and all are designed and specified by their scattering matrices.

This chapter treats each family in turn. The structural theorems of [[rf-microwave/scattering-parameters]] — symmetry for reciprocal networks, unitarity for lossless ones, and the impossibility of a matched lossless reciprocal three-port — tell us what is possible before we design anything. The main analytical tool is **even–odd mode analysis**, which reduces a symmetric four- or three-port to two simple one-ports. We design the Wilkinson divider, the branch-line hybrid and the coupled-line coupler, then define the quality factors of resonators and compute the $Q$ of lines and cavities, and finish with the insertion-loss method of filter design and its transformation from lumped prototypes to microwave structures.

## Power dividers {#sec-dividers}

The simplest divider is a **T-junction**: one line splitting into two. If it is lossless and reciprocal, [[rf-microwave/scattering-parameters#cor-three-port]] says it cannot be matched at all three ports. A $50\,\Omega$ input feeding two $100\,\Omega$ output lines is matched at the input ($100\parallel100 = 50\,\Omega$), but each output port looks back into $100\,\Omega\parallel50\,\Omega = 33.3\,\Omega$ and is badly mismatched; worse, the outputs are not isolated from each other, so a reflection at one output appears at the other. A **resistive divider** of three $Z_0/3$ resistors in a star is matched at all ports but wastes half the power and provides no isolation either ($\abs{S_{23}} = \abs{S_{21}} = \tfrac12$). The Wilkinson divider uses one resistor in a cleverer place.

::: definition The Wilkinson divider {#def-wilkinson}
The equal-split **Wilkinson power divider** connects input port 1 to output ports 2 and 3 through two quarter-wave lines of characteristic impedance $\sqrt2\,Z_0$, and connects a resistor $R = 2Z_0$ between ports 2 and 3.
:::

::: theorem S-matrix of the Wilkinson divider {#thm-wilkinson}
At the design frequency the Wilkinson divider has

$$
\mathbf S = \frac{-j}{\sqrt2}\begin{pmatrix}0 & 1 & 1\\ 1 & 0 & 0\\ 1 & 0 & 0\end{pmatrix} :
$$ {#eq-wilkinson-s}

all three ports are matched, the input power splits equally and in phase between ports 2 and 3, and ports 2 and 3 are isolated from each other.
:::

::: proof
Normalise impedances to $Z_0$. The circuit is symmetric about a plane through port 1 and the midpoint of the resistor, so drive ports 2 and 3 with sources $V_2$, $V_3$ and decompose the excitation into an **even mode** ($V_2 = V_3$) and an **odd mode** ($V_2 = -V_3$); the response to any excitation is the sum of the two. (Port 1's unit termination is split into two resistors of value $2$ in parallel, one for each half.)

*Even mode.* With equal voltages at ports 2 and 3, no current flows in the resistor, which can be removed: each half is a quarter-wave line of impedance $\sqrt2$ terminated at the port-1 end by $2$. Its input impedance at port 2 is $(\sqrt2)^2/2 = 1$, so port 2 is matched in the even mode, and the voltage at port 1 is related to that at port 2 by the line's transfer, $V_1^e = -jV_2^e\sqrt2$.

*Odd mode.* With opposite voltages, the plane of symmetry is at zero potential: the midpoint of the resistor is grounded and so is the junction at port 1. Each half is then a resistor $R/2 = 1$ to ground at port 2, in parallel with a quarter-wave line shorted at its far end, which looks like an open circuit. Port 2 sees $1$: matched again, and no odd-mode voltage reaches port 1.

Since port 2 is matched in both modes, $S_{22} = 0$, and by symmetry $S_{33} = 0$. Driving port 2 alone (equal parts of even and odd mode) produces nothing at port 3, because the even- and odd-mode voltages there cancel: $S_{32} = 0$. Looking into port 1 with ports 2 and 3 matched, each quarter-wave line transforms $1$ into $(\sqrt2)^2 = 2$, two of which in parallel give $1$: $S_{11} = 0$. The transmission follows from the even-mode voltage ratio: $S_{21} = S_{31} = -j/\sqrt2$.
:::

The resistor carries no current when the outputs are terminated in matched, identical loads, so an ideal Wilkinson divider is lossless for power travelling from port 1. It absorbs power only when the two outputs are unbalanced, which is exactly what isolation requires. The same structure combines two amplifier outputs: if one amplifier fails, half of the other's power is dissipated in the resistor rather than reflected into it.

::: example A Wilkinson divider at 2.4 GHz {#ex-wilkinson}
Design an equal-split Wilkinson divider for a $50\,\Omega$ system at $2.4\,\mathrm{GHz}$ on a microstrip substrate where a $70.7\,\Omega$ line has $\epsilon_{\text{eff}} = 3.2$, and find the band over which the return loss at port 1 and the isolation both exceed $20\,\mathrm{dB}$.
::: solution
The arms are $\sqrt2\times50 = 70.7\,\Omega$ lines, a quarter-wavelength long: $\lambda_g/4 = c/(4f\sqrt{\epsilon_{\text{eff}}}) = 3\times10^8/(4\times2.4\times10^9\times1.789) = 17.5\,\mathrm{mm}$. The resistor is $100\,\Omega$, a thin-film or $0402$ chip part placed directly across the ends of the arms (its leads must be short compared with $\lambda_g$, or the isolation suffers).

To find the bandwidth, solve the circuit at each frequency (the arms' electrical length is $\theta = 90^\circ\times f/f_0$) by nodal analysis and convert to S-parameters. The result: $\abs{S_{11}}\le0.1$ for $0.82\le f/f_0\le1.18$ and $\abs{S_{23}}\le0.1$ for $0.82\le f/f_0\le1.18$, i.e. from $1.96$ to $2.84\,\mathrm{GHz}$, a fractional bandwidth of $36\,\%$ (the output return loss stays above $20\,\mathrm{dB}$ over a much wider band). At $1.2f_0$ the transmission is still $-3.06\,\mathrm{dB}$: the split stays nearly equal far outside the band in which isolation is good. Multisection Wilkinsons, with several quarter-wave sections and resistors, widen the band as multisection transformers did in [[rf-microwave/impedance-matching]].
:::
:::

::: remark Unequal division and N-way dividers
A Wilkinson divider with output power ratio $K^2 = P_3/P_2$ uses arms of $Z_{03} = Z_0\sqrt{(1 + K^2)/K^3}$ and $Z_{02} = K^2Z_{03}$, a resistor $Z_0(K + 1/K)$, and quarter-wave transformers at the outputs to bring the output impedances back to $Z_0$. Wilkinson's original paper described an $N$-way divider with $N$ arms joined by a star of resistors, which is hard to build in planar form for $N > 2$; practical $N$-way dividers are trees of two-way dividers.
:::

## Directional couplers and hybrids {#sec-couplers}

A four-port **directional coupler** sends power entering port 1 mostly to port 2 (the **through** port), a fraction to port 3 (the **coupled** port), and ideally none to port 4 (the **isolated** port).

::: definition Coupling, directivity and isolation {#def-coupler}
With power $P_1$ entering port 1 and all ports matched, and $P_3$, $P_4$ leaving ports 3 and 4,

$$
C = 10\log_{10}\frac{P_1}{P_3} = -20\log_{10}\abs{S_{31}}, \qquad D = 10\log_{10}\frac{P_3}{P_4} = 20\log_{10}\frac{\abs{S_{31}}}{\abs{S_{41}}}, \qquad I = -20\log_{10}\abs{S_{41}} = C + D ,
$$ {#eq-coupler-defs}

are the **coupling**, **directivity** and **isolation**, all in decibels. The **insertion loss** is $-20\log_{10}\abs{S_{21}}$. A **hybrid** is a $3\,\mathrm{dB}$ coupler ($\abs{S_{21}} = \abs{S_{31}} = 1/\sqrt2$); it is a **quadrature** ($90^\circ$) hybrid if the outputs differ in phase by $90^\circ$ and a **$180^\circ$ hybrid** if by $180^\circ$.
:::

Directivity is the figure of merit that matters for measurement. A $20\,\mathrm{dB}$ coupler with $30\,\mathrm{dB}$ directivity used to measure reflected power cannot distinguish a reflection weaker than about $30\,\mathrm{dB}$ below the incident wave, because the forward wave leaks into the "reflected" port at that level. Network analysers need directivities of $40\,\mathrm{dB}$ or more, achieved by calibration ([[rf-microwave/scattering-parameters]]).

::: proposition A matched lossless reciprocal four-port is a directional coupler {#prop-directional}
If a four-port is reciprocal, lossless and matched at all ports, then (with suitable port numbering) it has two pairs of mutually isolated ports, and its S-matrix can be written, with real $\alpha$, $\beta$ and $\alpha^2 + \beta^2 = 1$, as either

$$
\mathbf S = \begin{pmatrix}0 & \alpha & j\beta & 0\\ \alpha & 0 & 0 & j\beta\\ j\beta & 0 & 0 & \alpha\\ 0 & j\beta & \alpha & 0\end{pmatrix}\ \text{(symmetric coupler)} \quad\text{or}\quad \begin{pmatrix}0 & \alpha & \beta & 0\\ \alpha & 0 & 0 & -\beta\\ \beta & 0 & 0 & \alpha\\ 0 & -\beta & \alpha & 0\end{pmatrix}\ \text{(antisymmetric)}.
$$ {#eq-coupler-s}
:::

::: proof
A sketch, following Pozar section 7.1. With all $S_{ii} = 0$ and $S_{ij} = S_{ji}$, the orthogonality of rows 1 and 2 and of rows 3 and 4 of the unitary matrix give $S_{13}^*S_{23} + S_{14}^*S_{24} = 0$ and $S_{14}^*S_{13} + S_{24}^*S_{23} = 0$. Multiplying the first by $S_{24}$, the second by $S_{13}$, and subtracting gives $S_{14}(\abs{S_{13}}^2 - \abs{S_{24}}^2) = 0$; a similar pair gives $S_{23}(\abs{S_{13}}^2 - \abs{S_{24}}^2) = 0$. Either $S_{14} = S_{23} = 0$ (ports 1, 4 and 2, 3 isolated) or $\abs{S_{13}} = \abs{S_{24}}$, which with the remaining equations leads to the same structure under a relabelling. Choosing the phase references at three of the ports then puts the matrix in one of the two forms [[#eq-coupler-s]].
:::

So it is enough to make a four-port that is matched; directivity then comes free if it is lossless and reciprocal. In practice the art is making it matched over a band.

### The branch-line hybrid

The **branch-line** (quadrature) hybrid is a square of four quarter-wave lines: two opposite sides (series arms, between ports 1–2 and 4–3) of impedance $Z_0/\sqrt2$, and the other two (shunt arms, between ports 1–4 and 2–3) of impedance $Z_0$.

::: theorem The branch-line hybrid {#thm-branch-line}
At its design frequency the branch-line hybrid has

$$
\mathbf S = \frac{-1}{\sqrt2}\begin{pmatrix}0 & j & 1 & 0\\ j & 0 & 0 & 1\\ 1 & 0 & 0 & j\\ 0 & 1 & j & 0\end{pmatrix} :
$$ {#eq-branch-line}

power entering port 1 divides equally between port 2 (phase $-90^\circ$) and port 3 (phase $180^\circ$), and port 4 is isolated.
:::

::: proof
Normalise to $Z_0$ and use the symmetry about the horizontal mid-plane between ports 1, 2 and ports 4, 3. Drive port 1 with a unit wave, split into an even mode ($\tfrac12$ at ports 1 and 4) and an odd mode ($\tfrac12$ at port 1, $-\tfrac12$ at port 4). In the even mode the mid-plane is an open circuit: each shunt arm is cut into two open-circuited $\lambda/8$ stubs, admittance $j\tan45^\circ = j$. In the odd mode it is a short: shorted $\lambda/8$ stubs, admittance $-j\cot45^\circ = -j$. Each half is then a two-port: a shunt stub ($\pm j$), a $\lambda/4$ line of impedance $1/\sqrt2$, and another shunt stub. Multiplying the ABCD matrices,

$$
\begin{pmatrix}1 & 0\\ \pm j & 1\end{pmatrix}\begin{pmatrix}0 & j/\sqrt2\\ j\sqrt2 & 0\end{pmatrix}\begin{pmatrix}1 & 0\\ \pm j & 1\end{pmatrix} = \frac{1}{\sqrt2}\begin{pmatrix}\mp1 & j\\ j & \mp1\end{pmatrix} .
$$

With [[rf-microwave/scattering-parameters#eq-s-abcd]] ($Z_0 = 1$), both modes give $\Gamma = 0$ and transmission $T_e = -(1 + j)/\sqrt2$, $T_o = (1 - j)/\sqrt2$. Then $b_1 = \tfrac12(\Gamma_e + \Gamma_o) = 0$, $b_2 = \tfrac12(T_e + T_o) = -j/\sqrt2$, $b_3 = \tfrac12(T_e - T_o) = -1/\sqrt2$, $b_4 = \tfrac12(\Gamma_e - \Gamma_o) = 0$.
:::

The branch-line hybrid is narrowband — a frequency sweep gives $\abs{S_{11}}\le0.1$ only within about $\pm5\,\%$ of the centre — because it relies on four quarter-wave lines all being exactly a quarter-wave long. Its $90^\circ$ phase difference between outputs is used in **balanced amplifiers**: two identical amplifiers between two hybrids, whose input reflections cancel at the input port and are absorbed in the isolated port's load, so the combination is well matched even if each amplifier is not. The **rat-race** or ring hybrid, a ring $1.5\lambda$ in circumference with four ports spaced $\lambda/4, \lambda/4, \lambda/4, 3\lambda/4$ apart and impedance $\sqrt2Z_0$, provides the $180^\circ$ version, with sum and difference ports used in balanced mixers and monopulse radar.

### Coupled-line couplers

Two parallel lines close enough for their fields to overlap couple to each other. A pair of identical coupled lines supports two TEM (or quasi-TEM) modes: the **even mode**, both strips at the same potential, with characteristic impedance $Z_{0e}$, and the **odd mode**, opposite potentials, with $Z_{0o} < Z_{0e}$ (the odd mode has extra capacitance between the strips).

::: theorem The quarter-wave coupled-line coupler {#thm-coupled-line}
A section of coupled lines of electrical length $\theta$, with ports 1 (input) and 2 (through) on one line, port 3 (coupled) on the other line at the *same end* as port 1, and port 4 (isolated) opposite, is matched at all ports and perfectly directional when $Z_0 = \sqrt{Z_{0e}Z_{0o}}$. Then, with the coupling coefficient $k = (Z_{0e} - Z_{0o})/(Z_{0e} + Z_{0o})$,

$$
\frac{V_3}{V_1} = \frac{jk\sin\theta}{\sqrt{1 - k^2}\cos\theta + j\sin\theta}, \qquad \frac{V_2}{V_1} = \frac{\sqrt{1 - k^2}}{\sqrt{1 - k^2}\cos\theta + j\sin\theta} .
$$ {#eq-coupled-line}

The coupling is greatest, $\abs{V_3/V_1} = k$, when the section is a quarter-wave long. Conversely, for a voltage coupling $k$,

$$
Z_{0e} = Z_0\sqrt{\frac{1 + k}{1 - k}}, \qquad Z_{0o} = Z_0\sqrt{\frac{1 - k}{1 + k}} .
$$ {#eq-z0e-z0o}
:::

::: proof
A sketch. By symmetry, the excitation at port 1 splits into even and odd modes, each of which sees an ordinary line of impedance $Z_{0e}$ or $Z_{0o}$ terminated in $Z_0$. The input impedances $Z_{\text{in}}^e$, $Z_{\text{in}}^o$ follow from the input-impedance formula, and the port-1 voltage is the sum of the mode voltages, which are set by voltage division with the source. Requiring $Z_{\text{in}} = Z_0$ at port 1 for all $\theta$ leads to $Z_{\text{in}}^eZ_{\text{in}}^o = Z_0^2$, satisfied when $Z_{0e}Z_{0o} = Z_0^2$. The coupled-port voltage is the difference of the mode voltages; substituting the input impedances and simplifying with $Z_0 = \sqrt{Z_{0e}Z_{0o}}$ gives [[#eq-coupled-line]]. At $\theta = \pi/2$, $V_3/V_1 = k$ and $V_2/V_1 = -j\sqrt{1 - k^2}$. Solving $k = (Z_{0e} - Z_{0o})/(Z_{0e} + Z_{0o})$ together with $Z_{0e}Z_{0o} = Z_0^2$ gives [[#eq-z0e-z0o]]. The full algebra is in Pozar section 7.6.
:::

The coupled wave travels *backwards*, emerging at the end of the second line nearest the input: a coupled-line coupler is a **backward-wave coupler**. Its response is periodic, with maxima at $\theta = 90^\circ, 270^\circ, \dots$, and since $\abs{V_3/V_1}$ varies as $\sin\theta$ near its maximum, for weak coupling it stays within $1\,\mathrm{dB}$ of its peak over a frequency ratio of almost two. On microstrip the even and odd modes have different effective permittivities (the odd mode has more field in air), which spoils the directivity; good directivity needs stripline, or compensation.

::: widget plot
f: 10*log10(k^2*sin(pi/2*x)^2/(1 - k^2*cos(pi/2*x)^2)); 10*log10(1 - k^2*sin(pi/2*x)^2/(1 - k^2*cos(pi/2*x)^2))
x: 0.05, 2
y: -30, 0
sliders: k=0.3162:0.05:0.95:0.001
labels: \lvert S_{31}\rvert^2\ \text{coupled (dB)}; \lvert S_{21}\rvert^2\ \text{through (dB)}
caption: Coupled and through power of an ideal coupled-line coupler against $f/f_0$, where the section is a quarter-wave long at $f_0$; $k$ is the voltage coupling coefficient (the starting value $0.316$ is a $10\,\mathrm{dB}$ coupler). The coupling peaks at $f_0$ and is within $1\,\mathrm{dB}$ of the peak from about $0.69f_0$ to $1.31f_0$. The two curves always add to $0\,\mathrm{dB}$ in linear power, since the ideal coupler is matched, lossless and isolated. Increase $k$ towards $0.707$ for a $3\,\mathrm{dB}$ coupler: notice how large $Z_{0e}/Z_{0o}$ must then be.
:::

::: example A 10 dB coupled-line coupler {#ex-coupler}
Design a $10\,\mathrm{dB}$ backward-wave coupled-line coupler for $50\,\Omega$ at $3\,\mathrm{GHz}$ in air-filled stripline, and find the coupling and directivity in decibels if the isolated port's output is $40\,\mathrm{dB}$ below the input.
::: solution
$k = 10^{-10/20} = 0.316$. From [[#eq-z0e-z0o]], $Z_{0e} = 50\sqrt{1.316/0.684} = 69.4\,\Omega$ and $Z_{0o} = 50\sqrt{0.684/1.316} = 36.0\,\Omega$; a field-solver chart for the chosen stripline geometry then gives the strip width and spacing. The section is $\lambda/4 = c/(4f) = 25\,\mathrm{mm}$ long. The through port receives $\abs{S_{21}}^2 = 1 - 0.1 = 0.9$, an insertion loss of $0.46\,\mathrm{dB}$. With $\abs{S_{41}}^2$ at $-40\,\mathrm{dB}$, the isolation is $I = 40\,\mathrm{dB}$ and by [[#eq-coupler-defs]] the directivity is $D = I - C = 30\,\mathrm{dB}$.

For a $3\,\mathrm{dB}$ coupler, $k = 0.708$ requires $Z_{0e} = 121\,\Omega$ and $Z_{0o} = 20.7\,\Omega$: the strips must be so close that edge-coupled lines cannot be made. **Lange couplers**, with interdigitated fingers connected by bond wires, solve this on microstrip.
:::
:::

::: quiz
A $20\,\mathrm{dB}$ directional coupler has a directivity of $25\,\mathrm{dB}$. With $1\,\mathrm W$ entering port 1 and all ports matched, roughly how much power leaves the isolated port?
- [ ] $10\,\mathrm{mW}$
- [ ] $3.2\,\mathrm{mW}$
- [x] $32\,\mu\mathrm W$
- [ ] Nothing, since it is directional
::: solution
The isolation is $C + D = 45\,\mathrm{dB}$, so $P_4 = 10^{-4.5}\,\mathrm W = 32\,\mu\mathrm W$. The coupled port receives $10\,\mathrm{mW}$ ($-20\,\mathrm{dB}$). A real coupler is never perfectly directional; directivity is limited by mismatches and, on microstrip, by unequal even- and odd-mode velocities.
:::
:::

## Resonators {#sec-resonators}

Near a resonance, any resonator behaves like a series or parallel RLC circuit. What characterises it is its resonant frequency and its quality factor.

::: definition Quality factors {#def-q}
The **unloaded quality factor** of a resonator is

$$
Q_0 = \omega_0\frac{\text{average energy stored}}{\text{power lost in the resonator}} .
$$

When it is coupled to an external circuit, the power lost in that circuit defines the **external** $Q_e$ in the same way, and the **loaded** $Q_L$ counts both: $1/Q_L = 1/Q_0 + 1/Q_e$. The half-power bandwidth of the loaded resonator is $\Delta f = f_0/Q_L$. The **coupling coefficient** $g = Q_0/Q_e$ distinguishes under-coupling ($g < 1$), critical coupling ($g = 1$, matched at resonance) and over-coupling ($g > 1$).
:::

For a parallel RLC, $Q_0 = \omega_0RC = R/(\omega_0L)$; for a series RLC, $Q_0 = \omega_0L/R$. These are the loci of [[rf-microwave/lines-smith-chart]]'s frequency-locus widget, where $r = 1$ is critical coupling.

### Transmission-line resonators

A short-circuited $\lambda/2$ line near the frequency where it is a half-wavelength long has input impedance $Z_{\text{in}} = Z_0\tanh(\alpha + j\beta)\ell\approx Z_0[\alpha\ell + j\pi\Delta\omega/\omega_0]$, the form of a series RLC; a short-circuited $\lambda/4$ line (or an open-circuited $\lambda/2$ line) behaves as a parallel RLC. In every case

$$
Q_0 = \frac{\beta}{2\alpha} ,
$$ {#eq-q-line}

where $\alpha$ is the line's attenuation constant: a resonator's $Q$ is set by how many wavelengths a wave travels before decaying by $e^{-\pi}$ or so. A $50\,\Omega$ microstrip with $0.2\,\mathrm{dB/cm}$ ($\alpha = 2.3\,\mathrm{Np/m}$) and $\beta = 180\,\mathrm{rad/m}$ gives $Q_0\approx40$; an air-filled coaxial line or a cavity gives thousands.

### Cavity resonators

A rectangular waveguide closed by conducting walls at $z = 0$ and $z = d$ resonates when the guide is an integer number of half-wavelengths long, $\beta d = \ell\pi$. With [[rf-microwave/waveguides#eq-fc-rect]]:

$$
f_{mn\ell} = \frac{u}{2}\sqrt{\Bigl(\frac ma\Bigr)^2 + \Bigl(\frac nb\Bigr)^2 + \Bigl(\frac\ell d\Bigr)^2} .
$$ {#eq-cavity}

The lowest mode of a cavity with $b < a < d$ is TE$_{101}$. Its conductor $Q$ follows from the perturbation method, as the guide's attenuation did; for TE$_{10\ell}$ (Pozar section 6.7),

$$
Q_c = \frac{(kad)^3b\eta}{2\pi^2R_s}\,\frac{1}{2\ell^2a^3b + 2bd^3 + \ell^2a^3d + ad^3} .
$$ {#eq-cavity-q}

::: example An X-band cavity {#ex-cavity}
Find the length $d$ of a copper WR-90 cavity ($a = 22.86\,\mathrm{mm}$, $b = 10.16\,\mathrm{mm}$) resonant in the TE$_{101}$ mode at $10.0\,\mathrm{GHz}$, and its unloaded $Q$.
::: solution
From [[#eq-cavity]] with $m = \ell = 1$, $n = 0$: $(1/d)^2 = (2f/c)^2 - (1/a)^2 = (66.71)^2 - (43.74)^2\,\mathrm{m^{-2}}$, so $1/d = 50.37\,\mathrm{m^{-1}}$ and $d = 19.85\,\mathrm{mm}$. (Equivalently, $d = \lambda_g/2$ with $\lambda_g = 39.7\,\mathrm{mm}$ from [[rf-microwave/waveguides#ex-wr90]].) With $k = 209.6\,\mathrm{rad/m}$, $R_s = 0.0261\,\Omega$ and [[#eq-cavity-q]], $Q_c\approx7800$. The half-power bandwidth would be $10\,\mathrm{GHz}/7800 = 1.3\,\mathrm{MHz}$ if the cavity were only lightly coupled. Real copper cavities reach perhaps $80$–$90\,\%$ of this because of surface roughness and joints; silver plating helps a little, and dielectric resonators or superconducting cavities do far better.
:::
:::

::: quiz
A cavity's coupling iris is enlarged so that its external $Q$ falls from $2Q_0$ to $Q_0/2$. What happens to the loaded $Q$ and to the reflection at resonance?
- [ ] $Q_L$ rises; the cavity becomes matched
- [x] $Q_L$ falls from $2Q_0/3$ to $Q_0/3$; the cavity goes from under-coupled to over-coupled, passing through a match
- [ ] $Q_L$ is unchanged, since it depends only on the walls
- [ ] $Q_L$ falls; the reflection at resonance is zero in both cases
::: solution
$1/Q_L = 1/Q_0 + 1/Q_e$ gives $Q_L = 2Q_0/3$ for $Q_e = 2Q_0$ ($g = 0.5$) and $Q_L = Q_0/3$ for $Q_e = Q_0/2$ ($g = 2$). At resonance the normalised input impedance (or admittance) of the coupled cavity is $g$ or $1/g$, so $\abs\Gamma = \abs{g - 1}/(g + 1) = 1/3$ in both cases, and zero only at $g = 1$ on the way through.
:::
:::

## Microwave filters {#sec-filters}

Filters are designed by the **insertion-loss method**: specify the power-loss ratio $P_{LR} = P_{\text{inc}}/P_{\text{load}} = 1/\abs{S_{21}}^2$ as a polynomial function of frequency that can be realised by a lossless ladder network, synthesise a lumped **low-pass prototype** with $g$-values tabulated for $R_0 = 1\,\Omega$ and $\omega_c = 1\,\mathrm{rad/s}$, then scale and transform it, and finally replace the lumped elements by microwave structures.

::: theorem Maximally flat and equal-ripple responses {#thm-filter-responses}
A **Butterworth** (maximally flat) low-pass filter of order $N$ with cutoff $\omega_c$ has

$$
P_{LR} = 1 + \Bigl(\frac{\omega}{\omega_c}\Bigr)^{2N} ,
$$ {#eq-butterworth}

so its loss at $\omega_c$ is $3\,\mathrm{dB}$ and it rises by $20N\,\mathrm{dB}$ per decade. A **Chebyshev** (equal-ripple) low-pass filter with passband ripple $L_r$ decibels has

$$
P_{LR} = 1 + \varepsilon^2T_N^2\Bigl(\frac{\omega}{\omega_c}\Bigr), \qquad \varepsilon^2 = 10^{L_r/10} - 1 ,
$$ {#eq-chebyshev}

where $T_N(x) = \cos(N\arccos x)$ for $\abs x\le1$ and $\cosh(N\operatorname{arccosh}x)$ for $\abs x > 1$. To achieve an attenuation of at least $A$ decibels at $\omega_s > \omega_c$ requires

$$
N_{\text{Butterworth}}\ge\frac{\log_{10}(10^{A/10} - 1)}{2\log_{10}(\omega_s/\omega_c)}, \qquad N_{\text{Chebyshev}}\ge\frac{\operatorname{arccosh}\sqrt{(10^{A/10} - 1)/\varepsilon^2}}{\operatorname{arccosh}(\omega_s/\omega_c)} .
$$ {#eq-filter-order}
:::

::: proof
The order formulas follow by setting $10\log_{10}P_{LR}(\omega_s) = A$ in [[#eq-butterworth]] and [[#eq-chebyshev]] and solving for $N$. That these $P_{LR}$ can be realised as lossless ladders terminated in equal resistances (for odd $N$, or for Butterworth any $N$) is the content of Darlington's insertion-loss synthesis: $P_{LR} = 1 + \abs{K(j\omega)}^2$ with a polynomial $K$ determines $\abs{S_{21}}^2$ and hence $\abs{S_{11}}^2 = 1 - \abs{S_{21}}^2$; choosing the left-half-plane zeros of $S_{11}(s)S_{11}(-s)$ gives $S_{11}(s)$, hence the input impedance, which is expanded in a continued fraction whose terms are the ladder's elements. The $g$-values in the tables are the results.
:::

The Butterworth prototype has $g_k = 2\sin[(2k - 1)\pi/(2N)]$, $k = 1,\dots,N$, with $g_{N+1} = 1$; for $N = 3$, $g = 1, 2, 1$. For a $0.5\,\mathrm{dB}$ Chebyshev of order $3$, $g = 1.5963, 1.0967, 1.5963$. In a ladder starting with a shunt element, odd $g_k$ are capacitances and even $g_k$ inductances. **Impedance and frequency scaling** to a system impedance $R_0$ and cutoff $\omega_c$ give

$$
C_k = \frac{g_k}{R_0\omega_c}, \qquad L_k = \frac{g_kR_0}{\omega_c} .
$$ {#eq-filter-scaling}

A **band-pass** filter centred on $\omega_0$ with fractional bandwidth $\Delta$ follows by replacing $\omega/\omega_c$ with $(\omega/\omega_0 - \omega_0/\omega)/\Delta$: each series inductor becomes a series LC resonant at $\omega_0$, each shunt capacitor a parallel LC.

::: widget plot
f: -10*log10(1 + x^(2*N)); -10*log10(1 + (10^(r/10) - 1)*(if(x <= 1, cos(N*acos(x)), cosh(N*ln(x + sqrt(x^2 - 1)))))^2)
x: 0, 3
y: -60, 1
sliders: N=3:1:9:1; r=0.5:0.01:3:0.01
labels: \text{Butterworth}; \text{Chebyshev}
caption: Transmission $10\log_{10}\lvert S_{21}\rvert^2$ in decibels of Butterworth and Chebyshev low-pass prototypes of order $N$ against normalised frequency $\omega/\omega_c$; $r$ is the Chebyshev passband ripple in decibels. The Chebyshev filter trades ripple in the passband for a much steeper skirt: for $N = 3$ and $0.5\,\mathrm{dB}$ ripple it gives $30.8\,\mathrm{dB}$ at $3\omega_c$ against $28.6\,\mathrm{dB}$ for the Butterworth, and the advantage grows with $N$. Count the ripples: an order-$N$ Chebyshev has $N$ extrema in its passband.
:::

::: example A Chebyshev low-pass filter for a transmitter {#ex-filter}
A $1\,\mathrm{GHz}$ transmitter needs a $50\,\Omega$ low-pass filter with at most $0.5\,\mathrm{dB}$ ripple up to $1\,\mathrm{GHz}$ and at least $30\,\mathrm{dB}$ attenuation at the third harmonic, $3\,\mathrm{GHz}$. Choose the order and type, and give lumped element values and a stepped-impedance microstrip equivalent.
::: solution
With $A = 30\,\mathrm{dB}$ at $\omega_s/\omega_c = 3$: a Butterworth needs $N\ge\log_{10}999/(2\log_{10}3) = 3.14$, so $N = 4$. A $0.5\,\mathrm{dB}$ Chebyshev, with $\varepsilon^2 = 0.122$, needs $N\ge\operatorname{arccosh}(90.5)/\operatorname{arccosh}(3) = 5.20/1.76 = 2.95$, so $N = 3$, giving $10\log_{10}[1 + 0.122\,T_3^2(3)] = 10\log_{10}(1 + 0.122\times99^2) = 30.8\,\mathrm{dB}$ ($T_3(x) = 4x^3 - 3x$). Choose the Chebyshev.

With [[#eq-filter-scaling]], $\omega_c = 2\pi\times10^9$ and $R_0 = 50\,\Omega$, a shunt-first ladder has

$$
C_1 = C_3 = \frac{1.5963}{50\times2\pi\times10^9} = 5.08\,\mathrm{pF}, \qquad L_2 = \frac{1.0967\times50}{2\pi\times10^9} = 8.73\,\mathrm{nH} .
$$

For a **stepped-impedance** version, a short length of high-impedance line $Z_h$ behaves as a series inductance and a short length of low-impedance line $Z_\ell$ as a shunt capacitance, with electrical lengths $\beta\ell = gR_0/Z_h$ for an inductor and $\beta\ell = gZ_\ell/R_0$ for a capacitor (from the $\pi$ and T equivalents of a short line). With practical microstrip values $Z_h = 120\,\Omega$ and $Z_\ell = 20\,\Omega$: the capacitor sections are $\beta\ell = 1.5963\times20/50 = 0.639\,\mathrm{rad} = 36.6^\circ$ and the inductor section $1.0967\times50/120 = 0.457\,\mathrm{rad} = 26.2^\circ$. The approximation needs $\beta\ell\lesssim45^\circ$, so it is acceptable here; the stepped-impedance filter's response departs from the prototype at higher frequencies, and its stopband is not as deep as the lumped version's, which an electromagnetic simulation would confirm and tune.
:::
:::

::: remark Richards' transformation, Kuroda identities and coupled-resonator filters
**Richards' transformation** $\Omega = \tan\beta\ell$ maps the lumped prototype exactly onto stubs: an inductor $L$ becomes a short-circuited stub of characteristic impedance $L$ and a capacitor $C$ an open stub of impedance $1/C$, all $\lambda/8$ long at the cutoff frequency. **Kuroda's identities** then convert series stubs (which cannot be built in microstrip) into shunt stubs separated by unit lines. For band-pass filters, the standard microwave realisation uses resonators coupled through **impedance or admittance inverters** — quarter-wave lines, gaps, irises or coupled-line sections — whose coupling strengths are computed from the $g$-values. The **parallel-coupled line filter**, a staircase of half-wave resonators coupled along quarter-wave lengths, is the most common planar example; waveguide filters use posts or irises between cavity resonators.
:::

::: warning Prototype filters assume lossless elements
The $g$-values give the response of lossless elements. Real resonators have finite $Q_0$, and the midband insertion loss of a band-pass filter grows as $4.34\sum_kg_k/(\Delta Q_0)$ decibels — inversely with both the fractional bandwidth $\Delta$ and the unloaded $Q$. A five-pole Butterworth band-pass filter ($\sum g_k = 6.47$) of $1\,\%$ bandwidth loses about $0.6\,\mathrm{dB}$ with cavity resonators of $Q_0 = 5000$, but $5.6\,\mathrm{dB}$ with $Q_0 = 500$; even at $10\,\%$ bandwidth, microstrip resonators with $Q_0 = 100$ cost almost $3\,\mathrm{dB}$, and the passband corners round off. Narrowband filters therefore need cavities, ceramic or dielectric resonators, or acoustic-wave resonators.
:::

::: application Filters in a phone
A smartphone has dozens of filters, almost none of them made of transmission lines: at $1$–$3\,\mathrm{GHz}$ a half-wave microstrip resonator is centimetres long and has a $Q$ of about $100$. Instead it uses **surface-acoustic-wave** (SAW) and **bulk-acoustic-wave** (BAW, FBAR) resonators, in which the energy is stored in an acoustic wave travelling about $10^5$ times slower than light. Their wavelength at $2\,\mathrm{GHz}$ is a few micrometres and their $Q$ is $1000$ or more, so a ladder of them in a chip a millimetre across makes a filter with $1$–$2\,\mathrm{dB}$ of loss and steep skirts. The design still begins from the insertion-loss prototypes of this section, with each resonator modelled by its equivalent circuit.
:::

::: history
The quarter-wave branch-line and ring hybrids were developed in the waveguide and coaxial forms during and after the Second World War; W. A. Tyrrell of Bell Laboratories described the waveguide ring ("rat-race") hybrid in 1947. Ernest Wilkinson published the divider that bears his name, as an $N$-way hybrid power divider, in 1960. Julius Lange described the interdigitated coupler in 1969. On the filter side, Stephen Butterworth introduced the maximally flat response in 1930, Wilhelm Cauer and Sidney Darlington developed insertion-loss synthesis in the 1930s, Paul Richards published his transformation in 1948 and Kuroda his identities in the 1950s, and Seymour Cohn's 1958 analysis of parallel-coupled transmission-line filters set the pattern for planar band-pass filters.
:::

## Where this leads {#sec-next}

Couplers and hybrids appear in [[rf-microwave/rf-amplifiers]] as the basis of balanced amplifiers, and power dividers feed the antenna arrays of [[rf-microwave/antennas]]. Resonators set the frequency of oscillators ([[electronics-2/oscillators]]), and the filters of this chapter separate the channels whose link budgets are computed in [[rf-microwave/wireless-links-radar]]. The polynomial view of filter responses connects to the analog and digital filter design of [[circuits-2/filters]] and [[dsp/iir-filter-design]].

::: summary
- A lossless reciprocal three-port cannot be matched at all ports; the Wilkinson divider ($\lambda/4$ arms of $\sqrt2Z_0$, a $2Z_0$ resistor) is matched, isolated and lossless for balanced outputs.
- Even–odd mode analysis reduces symmetric networks to two one-ports.
- A directional coupler is specified by coupling $C$, directivity $D$ and isolation $I = C + D$; a matched lossless reciprocal four-port is automatically directional.
- The branch-line hybrid ($Z_0/\sqrt2$ and $Z_0$ arms) gives a $3\,\mathrm{dB}$, $90^\circ$ split; a coupled-line coupler has $k = (Z_{0e} - Z_{0o})/(Z_{0e} + Z_{0o})$ with $Z_0 = \sqrt{Z_{0e}Z_{0o}}$ and couples backwards.
- Resonators are described by $Q_0$, $Q_e$ and $Q_L$ ($1/Q_L = 1/Q_0 + 1/Q_e$); a line resonator has $Q_0 = \beta/(2\alpha)$; rectangular cavities resonate at $f_{mn\ell} = \tfrac u2\sqrt{(m/a)^2 + (n/b)^2 + (\ell/d)^2}$.
- Filters are designed from Butterworth or Chebyshev prototypes ($g$-values), scaled with $C = g/(R_0\omega_c)$, $L = gR_0/\omega_c$, transformed to band-pass, and realised with stepped impedances, stubs or coupled resonators.
:::

## Exercises

::: exercise A 75 Ω Wilkinson divider {level=1 check="75*sqrt(2)"}
Give the arm impedance (in ohms) and resistor value of an equal-split Wilkinson divider for a $75\,\Omega$ cable-TV system.
::: solution
Arms $\sqrt2\times75 = 106\,\Omega$, a quarter-wavelength long; resistor $2\times75 = 150\,\Omega$.
:::
:::

::: exercise Isolation of a coupler {level=1 check="50"}
A coupler has $20\,\mathrm{dB}$ coupling and $30\,\mathrm{dB}$ directivity. What is its isolation, in decibels?
::: solution
$I = C + D = 50\,\mathrm{dB}$.
:::
:::

::: exercise Loaded Q from bandwidth {level=1 check="200"}
A resonator coupled to a measurement system has a half-power bandwidth of $5\,\mathrm{MHz}$ at $1\,\mathrm{GHz}$. What is its loaded $Q$?
::: solution
$Q_L = f_0/\Delta f = 1000/5 = 200$.
:::
:::

::: exercise Even- and odd-mode impedances for a 3 dB coupler {level=2 check="50*sqrt((1 + 10^(-3/20))/(1 - 10^(-3/20)))"}
Find $Z_{0e}$ (in ohms) and $Z_{0o}$ for a $3\,\mathrm{dB}$ coupled-line coupler in a $50\,\Omega$ system.
::: solution
$k = 10^{-3/20} = 0.708$; $Z_{0e} = 50\sqrt{1.708/0.292} = 120.9\,\Omega$ and $Z_{0o} = 50\sqrt{0.292/1.708} = 20.7\,\Omega$. The ratio of almost $6$ is beyond edge-coupled microstrip, hence the Lange coupler.
:::
:::

::: exercise Butterworth order {level=2 check="7"}
What order of Butterworth low-pass filter gives at least $40\,\mathrm{dB}$ attenuation at twice the cutoff frequency?
::: solution
$N\ge\log_{10}(10^4 - 1)/(2\log_{10}2) = 4.0/0.602 = 6.64$, so $N = 7$.
:::
:::

::: exercise A half-wave microstrip resonator {level=2 check="3e8/(2*5e9*sqrt(3))"}
An open-circuited half-wave microstrip resonator at $5\,\mathrm{GHz}$ is on a substrate with $\epsilon_{\text{eff}} = 3.0$. How long is it, in metres (take $c = 3\times10^8\,\mathrm{m/s}$; ignore end effects)? If the line's attenuation is $\alpha = 2\,\mathrm{Np/m}$, what is $Q_0$?
::: solution
$\ell = \lambda_g/2 = c/(2f\sqrt{\epsilon_{\text{eff}}}) = 3\times10^8/(2\times5\times10^9\times1.732) = 17.3\,\mathrm{mm}$. With $\beta = 2\pi/\lambda_g = 2\pi/0.0346 = 181\,\mathrm{rad/m}$, $Q_0 = \beta/(2\alpha) = 45$.
:::
:::

::: exercise Unloaded Q at critical coupling {level=2 check="800"}
A one-port cavity is critically coupled, and its measured loaded $Q$ is $400$. What is its unloaded $Q$?
::: solution
Critical coupling means $Q_e = Q_0$, so $1/Q_L = 2/Q_0$ and $Q_0 = 2Q_L = 800$.
:::
:::

::: exercise A lossless T-junction {level=3}
A lossless T-junction joins a $50\,\Omega$ input line to two $100\,\Omega$ output lines (ignore the junction's own reactance). Find its full S-matrix, with each port referred to its own line impedance, and verify that it is unitary. What fraction of power entering port 2 reaches port 3?
::: hint
With the waves normalised to each port's own $Z_0$, a junction of lines with admittances $Y_k$ has $S_{ii} = (2Y_i - \sum Y)/\sum Y$ and $S_{ij} = 2\sqrt{Y_iY_j}/\sum Y$.
:::
::: solution
The admittances are $Y_1 = 1/50 = 0.02$, $Y_2 = Y_3 = 0.01\,\mathrm S$, total $0.04\,\mathrm S$. Then $S_{11} = (0.04 - 0.04)/0.04 = 0$, $S_{22} = S_{33} = (0.02 - 0.04)/0.04 = -0.5$, $S_{21} = S_{31} = 2\sqrt{0.0002}/0.04 = 0.707$, $S_{23} = 2(0.01)/0.04 = 0.5$. So

$$
\mathbf S = \begin{pmatrix}0 & 0.707 & 0.707\\ 0.707 & -0.5 & 0.5\\ 0.707 & 0.5 & -0.5\end{pmatrix} .
$$

Each column has $\sum\abs{S_{ij}}^2 = 1$ (e.g. $0.5 + 0.25 + 0.25$), and the columns are orthogonal (e.g. columns 2 and 3: $0.5 - 0.25 - 0.25 = 0$), so it is unitary. Of power entering port 2, $25\,\%$ is reflected, $50\,\%$ goes to port 1 and $25\,\%$ to port 3: the outputs are not isolated, which is the defect the Wilkinson resistor cures.
:::
:::

::: exercise Designing a Butterworth low-pass filter {level=3}
Design a third-order Butterworth low-pass filter for a $50\,\Omega$ system with a $3\,\mathrm{dB}$ cutoff at $500\,\mathrm{MHz}$, using a shunt-capacitor-first ladder. Give element values, the attenuation at $1.5\,\mathrm{GHz}$, and the band-pass filter obtained by transforming it to a centre frequency of $2\,\mathrm{GHz}$ with $10\,\%$ fractional bandwidth (give the resonator element values for the first shunt resonator).
::: solution
The prototype is $g = 1, 2, 1$. With [[#eq-filter-scaling]], $\omega_c = 3.142\times10^9\,\mathrm{rad/s}$: $C_1 = C_3 = 1/(50\omega_c) = 6.37\,\mathrm{pF}$ and $L_2 = 2\times50/\omega_c = 31.8\,\mathrm{nH}$. At $1.5\,\mathrm{GHz}$, $\omega/\omega_c = 3$ and $P_{LR} = 1 + 3^6 = 730$, i.e. $28.6\,\mathrm{dB}$.

For the band-pass version, a prototype shunt capacitor $g$ becomes a parallel LC with $C = g/(\Delta\omega_0R_0)$ and $L = \Delta R_0/(g\omega_0)$; with $\omega_0 = 2\pi\times2\times10^9 = 1.257\times10^{10}\,\mathrm{rad/s}$, $\Delta = 0.1$, $g_1 = 1$: $C = 1/(0.1\times1.257\times10^{10}\times50) = 15.9\,\mathrm{pF}$ and $L = 0.1\times50/(1.257\times10^{10}) = 0.398\,\mathrm{nH}$, resonant at $1/\sqrt{LC} = 1.257\times10^{10}\,\mathrm{rad/s}$ as required. The series resonator from $g_2 = 2$ has $L = gR_0/(\Delta\omega_0) = 79.6\,\mathrm{nH}$ and $C = \Delta/(g\omega_0R_0) = 0.080\,\mathrm{pF}$. The extreme spread of values ($0.4\,\mathrm{nH}$ and $80\,\mathrm{nH}$) is why narrowband microwave filters are built from coupled resonators and inverters rather than directly from the transformed ladder.
:::
:::
