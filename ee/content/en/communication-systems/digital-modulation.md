A Wi-Fi access point close to your laptop sends $10$ bits on every subcarrier symbol by choosing one of $1024$ combinations of amplitude and phase; a GPS satellite $20\,000\,\mathrm{km}$ away sends one bit at a time by flipping the phase of its carrier between two values. Both are **digital modulation**: a carrier at a frequency the channel passes — a radio band, an optical wavelength, a slot on a cable — is varied in amplitude, phase or frequency according to symbols drawn from a finite set. The analog methods of [[communication-systems/amplitude-modulation]] and [[communication-systems/angle-modulation]] reappear, but with a crucial difference: the receiver no longer has to reproduce a waveform, only to decide which of $M$ known signals was sent.

That difference makes geometry the natural language. Each of the $M$ possible signals is a point in a space of a few dimensions, its distance from the origin measures its energy, and its distance from the other points measures how hard it is to confuse with them. This lesson builds that **signal space**, describes the standard modulations — amplitude-shift keying, phase-shift keying, quadrature amplitude modulation and frequency-shift keying — as **constellations** in it, and compares them by the two currencies of the course: bandwidth (how many bits per second each hertz carries) and power (how much energy per bit buys a given separation between points). The error probabilities that make the power comparison exact are derived in [[communication-systems/optimal-detection]]; here we prepare everything they need.

## Signal space {#sec-signal-space}

During one symbol period $0 \le t < T$ the transmitter sends one of $M$ finite-energy waveforms $s_1(t), \dots, s_M(t)$. These waveforms rarely need all the dimensions of function space. QPSK, for example, uses four waveforms that are all combinations of just two: a cosine and a sine at the carrier frequency.

::: definition Signal space and constellation {#def-signal-space}
Let $\phi_1(t), \dots, \phi_N(t)$ be **orthonormal** functions on $[0, T)$:

$$
\int_0^T\phi_i(t)\,\phi_j(t)\,\dd t = \begin{cases}1, & i = j,\\ 0, & i \ne j.\end{cases}
$$ {#eq-orthonormal}

If every signal is a linear combination $s_m(t) = \sum_{i=1}^Ns_{mi}\phi_i(t)$, the coefficients

$$
s_{mi} = \int_0^Ts_m(t)\,\phi_i(t)\,\dd t
$$ {#eq-coefficients}

form the **signal vector** $\mathbf s_m = (s_{m1}, \dots, s_{mN})$. The set of $M$ signal vectors is the **constellation**, and $N$ is the dimension of the signal set.
:::

The point of the definition is that waveform quantities become vector quantities.

::: theorem Energy and distance in signal space {#thm-signal-geometry}
For signals in the span of an orthonormal basis,

$$
\int_0^Ts_m(t)s_k(t)\,\dd t = \mathbf s_m\cdot\mathbf s_k, \qquad E_m = \int_0^Ts_m^2(t)\,\dd t = \lVert\mathbf s_m\rVert^2, \qquad \int_0^T\big(s_m(t) - s_k(t)\big)^2\dd t = \lVert\mathbf s_m - \mathbf s_k\rVert^2 .
$$ {#eq-geometry}

Moreover, any set of $M$ finite-energy signals can be represented in this way with $N \le M$ basis functions, constructed by the Gram–Schmidt procedure.
:::

::: proof
Expanding, $\int s_ms_k\,\dd t = \sum_i\sum_js_{mi}s_{kj}\int\phi_i\phi_j\,\dd t = \sum_is_{mi}s_{ki}$ by [[#eq-orthonormal]]. The energy is the case $k = m$, and the squared distance is the energy of $s_m - s_k$, whose vector is $\mathbf s_m - \mathbf s_k$. For the construction, take $\phi_1 = s_1/\sqrt{E_1}$. For each subsequent signal $s_m$, subtract its projections onto the basis functions found so far, $g_m = s_m - \sum_i\big(\int s_m\phi_i\big)\phi_i$; if $g_m \ne 0$, normalise it to obtain a new basis function. Each $g_m$ is orthogonal to the earlier $\phi_i$ by construction, and at most one function is added per signal, so $N \le M$. This is the same algorithm as for vectors in [linear algebra](/learn/maths/).
:::

The **average symbol energy** is $E_s = \frac1M\sum_m\lVert\mathbf s_m\rVert^2$ (equally likely symbols), and the **energy per bit** is $E_b = E_s/\log_2M$. The **minimum distance** $d_{\min} = \min_{m \ne k}\lVert\mathbf s_m - \mathbf s_k\rVert$ will control the error probability. A good constellation has large $d_{\min}$ for a given $E_b$.

::: example Gram–Schmidt for three baseband pulses {#ex-gram-schmidt}
Three signals on $0 \le t < T$ are: $s_1(t) = A$ throughout; $s_2(t) = A$ for $t < T/2$ and $-A$ for $t \ge T/2$; $s_3(t) = A$ for $t < T/2$ and $0$ after. Find an orthonormal basis, the signal vectors, the average energy and the minimum distance.
::: solution
$E_1 = A^2T$, so $\phi_1 = s_1/\sqrt{E_1}$, which is $1/\sqrt T$ on $[0, T)$. Next, $\int s_2\phi_1\,\dd t = \frac{1}{\sqrt T}(A\frac T2 - A\frac T2) = 0$: $s_2$ is already orthogonal to $\phi_1$, so $\phi_2 = s_2/\sqrt{A^2T}$, which is $\pm1/\sqrt T$ on the two halves. Finally $s_3 = \frac12(s_1 + s_2)$, so its residual after projection is zero and no third function is needed: $N = 2 < M = 3$.

The vectors are $\mathbf s_1 = (A\sqrt T, 0)$, $\mathbf s_2 = (0, A\sqrt T)$ and $\mathbf s_3 = (A\sqrt T/2, A\sqrt T/2)$. The energies are $A^2T$, $A^2T$ and $A^2T/2$, averaging $\frac56A^2T$. The distances are $\lVert\mathbf s_1 - \mathbf s_2\rVert^2 = 2A^2T$ and $\lVert\mathbf s_1 - \mathbf s_3\rVert^2 = \lVert\mathbf s_2 - \mathbf s_3\rVert^2 = A^2T/2$, so $d_{\min} = A\sqrt{T/2}$. Check directly: $s_1 - s_3$ is $A$ on the second half only, with energy $A^2T/2$.
:::
:::

### The passband basis

Most modulations in this lesson use the same two-dimensional basis:

$$
\phi_1(t) = \sqrt{\frac2T}\cos(2\pi f_ct), \qquad \phi_2(t) = -\sqrt{\frac2T}\sin(2\pi f_ct), \qquad 0 \le t < T .
$$ {#eq-passband-basis}

These are orthonormal when $f_cT$ is an integer, and very nearly so whenever $f_cT \gg 1$: $\int_0^T\frac2T\cos^2(2\pi f_ct)\,\dd t = 1 + \frac{\sin(4\pi f_cT)}{4\pi f_cT}$ and $\int_0^T\phi_1\phi_2\,\dd t = -\frac{1 - \cos(4\pi f_cT)}{4\pi f_cT}$, both within $1/(2\pi f_cT)$ of the ideal. A signal with vector $(s_1, s_2)$ is

$$
s(t) = \sqrt{\frac2T}\big[s_1\cos(2\pi f_ct) - s_2\sin(2\pi f_ct)\big] = \operatorname{Re}\Big\{\sqrt{\frac2T}\,(s_1 + js_2)\,e^{j2\pi f_ct}\Big\} ,
$$ {#eq-iq}

so the two coordinates are exactly the **in-phase** and **quadrature** components of [[communication-systems/signals-spectra-channels]], and the point $s_1 + js_2$ in the complex plane is the signal's complex envelope (up to the constant $\sqrt{2/T}$). A constellation diagram is a picture of the possible complex envelopes.

## Amplitude- and phase-shift keying {#sec-ask-psk}

::: definition ASK, BPSK and M-PSK {#def-psk}
With the basis [[#eq-passband-basis]]:

- **On–off keying** (OOK), the simplest **amplitude-shift keying**, sends $s_1(t) = \sqrt{2E/T}\cos(2\pi f_ct)$ for a $1$ and nothing for a $0$: the points $\sqrt E$ and $0$ on the $\phi_1$ axis.
- **Binary phase-shift keying** (BPSK) sends $\pm\sqrt{2E_b/T}\cos(2\pi f_ct)$: the points $\pm\sqrt{E_b}$, antipodal on one axis. Equivalently the carrier phase is $0$ or $\pi$.
- **$M$-ary phase-shift keying** (M-PSK) sends $s_m(t) = \sqrt{2E_s/T}\cos(2\pi f_ct + \theta_m)$ with $\theta_m = 2\pi m/M$ (often offset by $\pi/M$): $M$ points equally spaced on a circle of radius $\sqrt{E_s}$,

$$
\mathbf s_m = \sqrt{E_s}\,(\cos\theta_m, \sin\theta_m), \qquad d_{\min} = 2\sqrt{E_s}\sin\frac{\pi}{M} .
$$ {#eq-psk}

**QPSK** is 4-PSK, usually with $\theta_m = \pi/4 + m\pi/2$, the points $(\pm\sqrt{E_s/2}, \pm\sqrt{E_s/2})$.
:::

The minimum distance follows from the chord between neighbouring points on the circle, which subtend an angle $2\pi/M$ at the centre. All PSK signals have constant envelope, which matters for power amplifiers: they can be driven into compression without distorting the information.

QPSK deserves a second look. Its four points are $(\pm a, \pm a)$ with $a = \sqrt{E_s/2}$, so its in-phase and quadrature coordinates are chosen *independently*, each as a BPSK symbol. QPSK is two BPSK signals on orthogonal carriers, $\cos$ and $\sin$, sharing one band. Each carries one bit with energy $a^2 = E_s/2 = E_b$, so QPSK sends twice the bits of BPSK in the same bandwidth with the same energy per bit and the same distance per bit: $d_{\min} = 2a = 2\sqrt{E_b}$, exactly BPSK's $d_{\min}$.

::: definition Gray coding {#def-gray}
A **Gray mapping** assigns bit patterns to constellation points so that points at minimum distance differ in exactly one bit. For 8-PSK, for instance, the points around the circle carry $000, 001, 011, 010, 110, 111, 101, 100$.
:::

The most likely error in noise is to a nearest neighbour, so with Gray mapping most symbol errors cause a single bit error, and the bit error rate is close to the symbol error rate divided by $\log_2M$.

::: quiz
On–off keying and BPSK are compared at the same *average* energy per bit $E_b$. How does the minimum distance of OOK compare with that of BPSK?
- [ ] The same, since both are one-dimensional binary schemes
- [x] $d_{\min}^2$ is half as large ($3\,\mathrm{dB}$ worse)
- [ ] $d_{\min}^2$ is a quarter as large ($6\,\mathrm{dB}$ worse)
- [ ] $d_{\min}^2$ is twice as large, since OOK puts all its energy in one symbol
::: solution
OOK's points are $0$ and $\sqrt{E_1}$, with average energy $E_b = E_1/2$, so $d^2 = E_1 = 2E_b$. BPSK's points $\pm\sqrt{E_b}$ have $d^2 = 4E_b$. OOK wastes half its energy on the mean (the centre of the constellation is not at the origin), exactly like the DC line of unipolar NRZ in [[communication-systems/baseband-transmission]]. Measured by *peak* energy, OOK is $6\,\mathrm{dB}$ worse.
:::
:::

::: example Bandwidth of a QPSK link {#ex-qpsk-bandwidth}
A satellite link sends $10\,\mathrm{Mbit/s}$ with root-raised-cosine pulses of roll-off $\alpha = 0.35$. Find the occupied bandwidth with BPSK and with QPSK, and the spectral efficiency of each.
::: solution
A passband linear modulation shifts the baseband spectrum of the complex envelope to $\pm f_c$, so its bandwidth is twice the baseband bandwidth: $B = (1 + \alpha)R_s$ (theorem [[#thm-passband-psd]] below).

BPSK: $R_s = R_b = 10\,\mathrm{Mbaud}$, so $B = 1.35 \times 10 = 13.5\,\mathrm{MHz}$ and $\eta = 10/13.5 = 0.74\,\mathrm{bit/s/Hz}$.

QPSK: $R_s = R_b/2 = 5\,\mathrm{Mbaud}$, so $B = 1.35 \times 5 = 6.75\,\mathrm{MHz}$ and $\eta = 1.48\,\mathrm{bit/s/Hz}$. Half the bandwidth for the same $E_b$ and the same $d_{\min}$: this is why QPSK, not BPSK, is the workhorse of satellite communication.
:::
:::

## Quadrature amplitude modulation {#sec-qam}

PSK spreads its points around a circle, and as $M$ grows they crowd together: $d_{\min} \approx 2\pi\sqrt{E_s}/M$. The plane offers more room if the points also vary in amplitude. **Quadrature amplitude modulation** places them on a grid.

::: definition Square QAM {#def-qam}
**Square $M$-QAM** ($M = 4, 16, 64, 256, \dots$) chooses each coordinate independently from the $\sqrt M$-level PAM alphabet $\{\pm\frac d2, \pm\frac{3d}{2}, \dots, \pm\frac{(\sqrt M - 1)d}{2}\}$, so that the constellation is a $\sqrt M \times \sqrt M$ square grid with spacing $d = d_{\min}$. The transmitted signal is

$$
s(t) = \sqrt{\frac2T}\big[a_I\cos(2\pi f_ct) - a_Q\sin(2\pi f_ct)\big] ,
$$ {#eq-qam}

with $a_I$ and $a_Q$ the two coordinates. Non-square sizes (32-QAM, 128-QAM) use "cross" constellations.
:::

::: theorem Energy and distance of square QAM {#thm-qam-energy}
For equally likely points, square $M$-QAM with spacing $d$ has average symbol energy

$$
E_s = \frac{(M - 1)\,d^2}{6} ,
$$ {#eq-qam-energy}

and therefore

$$
\frac{d_{\min}^2}{E_b} = \frac{6\log_2M}{M - 1} .
$$ {#eq-qam-dmin}
:::

::: proof
Each coordinate is uniform over $L = \sqrt M$ levels $(2i - 1 - L)d/2$, $i = 1, \dots, L$. Its mean square is

$$
\frac{d^2}{4L}\sum_{i=1}^{L}(2i - 1 - L)^2 = \frac{d^2}{4}\cdot\frac{L^2 - 1}{3} = \frac{(L^2 - 1)d^2}{12},
$$

using the sum of squares of the $L$ odd-spaced values $-(L - 1), \dots, L - 1$, which is $L(L^2 - 1)/3$. The two coordinates are independent and have the same mean square, so $E_s = 2(L^2 - 1)d^2/12 = (M - 1)d^2/6$. Dividing $d^2$ by $E_b = E_s/\log_2M$ gives [[#eq-qam-dmin]].
:::

For QPSK ($M = 4$) the formula gives $d^2/E_b = 4$, as found above. For 16-QAM it gives $1.6$, a loss of $10\log_{10}(4/1.6) = 4.0\,\mathrm{dB}$ relative to QPSK; for 64-QAM $0.571$ ($8.5\,\mathrm{dB}$); for 256-QAM $0.188$ ($13.3\,\mathrm{dB}$). For large $M$ each quadrupling of $M$ (two more bits per symbol) costs about $6\,\mathrm{dB}$ — the same $6\,\mathrm{dB}$ per bit per dimension as quantisation in [[communication-systems/pulse-code-modulation]], for the same reason: the grid's spacing halves when the number of levels per dimension doubles.

Compare 16-PSK: $d^2/E_b = 4 \times 4\sin^2(\pi/16) = 0.609$, $4.2\,\mathrm{dB}$ worse than 16-QAM. Beyond eight points, QAM is better than PSK at every size, which is why every high-rate system uses it.

::: example Choosing a constellation for a wireless link {#ex-qam-design}
A $20\,\mathrm{MHz}$ channel must carry $80\,\mathrm{Mbit/s}$ with root-raised-cosine pulses, $\alpha = 0.25$. (a) What is the highest symbol rate the channel allows, and how many bits per symbol are needed? (b) Choose a square QAM constellation and find the actual symbol rate and occupied bandwidth. (c) How much more $E_b$ does it need than QPSK for the same $d_{\min}$? (d) Find its peak-to-average power ratio.
::: solution
(a) $B = (1 + \alpha)R_s \le 20\,\mathrm{MHz}$ gives $R_s \le 16\,\mathrm{Mbaud}$. Then $\log_2M \ge 80/16 = 5$ bits per symbol.

(b) The smallest square constellation with at least $5$ bits is 64-QAM ($6$ bits). Then $R_s = 80/6 = 13.33\,\mathrm{Mbaud}$ and $B = 1.25 \times 13.33 = 16.7\,\mathrm{MHz}$, inside the channel. (A 32-point cross constellation would just fit at exactly $16\,\mathrm{Mbaud}$ and $20\,\mathrm{MHz}$, with no margin.)

(c) $10\log_{10}(4/0.571) = 8.5\,\mathrm{dB}$ more $E_b$ for the same $d_{\min}$.

(d) With $d = 2$ the levels are $\pm1, \pm3, \pm5, \pm7$; $E_s = 63 \times 4/6 = 42$, and the corner point $(7, 7)$ has energy $98$. The peak-to-average power ratio is $98/42 = 2.33$, or $3.7\,\mathrm{dB}$: the power amplifier must be backed off by about this much (more, after pulse shaping) to avoid distorting the outer points, unlike PSK.
:::
:::

::: quiz
A 16-QAM signal and a QPSK signal are received with the same average power and the same symbol rate. Compared with QPSK, the 16-QAM signal carries
- [ ] twice the bit rate with the same minimum distance
- [x] twice the bit rate with a minimum distance $\sqrt{5}$ times smaller
- [ ] four times the bit rate with a minimum distance four times smaller
- [ ] the same bit rate with a larger minimum distance
::: solution
16-QAM carries $4$ bits per symbol against QPSK's $2$, so twice the bit rate. At equal $E_s$, QPSK has $d^2 = 2E_s$ (from $E_s = 3d^2/6$), and 16-QAM has $d^2 = 6E_s/15 = 0.4E_s$. The ratio of squared distances is $5$, so the distance is $\sqrt5 = 2.24$ times smaller ($7\,\mathrm{dB}$ at equal symbol energy, or $4\,\mathrm{dB}$ at equal bit energy).
:::
:::

## Frequency-shift keying and orthogonal signals {#sec-fsk}

PSK and QAM put more bits into the same two dimensions. **Frequency-shift keying** goes the other way: each of its $M$ signals uses its own dimension.

::: definition M-ary FSK {#def-fsk}
**$M$-ary frequency-shift keying** sends, for symbol $m = 1, \dots, M$,

$$
s_m(t) = \sqrt{\frac{2E_s}{T}}\cos\big(2\pi(f_c + m\,\Delta f)t\big), \qquad 0 \le t < T ,
$$ {#eq-fsk}

where $\Delta f$ is the **tone spacing**. Binary FSK ($M = 2$) has the two tones $f_c + \Delta f$ and $f_c + 2\Delta f$, often written as $f_c \pm \Delta f/2$ about their centre.
:::

::: theorem Orthogonality of FSK tones {#thm-fsk-orthogonal}
For $f_cT \gg 1$, the normalised correlation of two FSK tones separated by $\Delta f$ is

$$
\rho = \frac{1}{E_s}\int_0^Ts_m(t)s_k(t)\,\dd t \approx \frac{\sin(2\pi\Delta f_{mk}T)}{2\pi\Delta f_{mk}T}, \qquad \Delta f_{mk} = (m - k)\Delta f .
$$ {#eq-fsk-rho}

The tones are orthogonal when $\Delta f$ is a multiple of $1/(2T)$, which is the minimum spacing for **coherent** detection (receiver knows the carrier phase). If each tone has an unknown phase, orthogonality for every phase requires a spacing that is a multiple of $1/T$, the minimum for **noncoherent** detection.
:::

::: proof
Using $\cos A\cos B = \frac12[\cos(A - B) + \cos(A + B)]$:

$$
\frac{2}{T}\int_0^T\cos(2\pi f_1t)\cos(2\pi f_2t)\,\dd t = \frac{\sin(2\pi(f_1 - f_2)T)}{2\pi(f_1 - f_2)T} + \frac{\sin(2\pi(f_1 + f_2)T)}{2\pi(f_1 + f_2)T} .
$$

The second term is at most $1/(2\pi(f_1 + f_2)T)$, negligible when $f_cT \gg 1$. The first vanishes when $2(f_1 - f_2)T$ is a nonzero integer. If the second tone has an arbitrary phase $\psi$, the correlation becomes $\frac1T\int_0^T\cos(2\pi(f_1 - f_2)t - \psi)\,\dd t$ (again dropping the sum-frequency term), and this vanishes for every $\psi$ only if both $\int\cos(2\pi\Delta ft)$ and $\int\sin(2\pi\Delta ft)$ over $[0, T)$ vanish, which requires $\Delta fT$ to be a nonzero integer.
:::

::: widget plot
f: sin(2*pi*x)/(2*pi*x); abs(sin(pi*x)/(pi*x))
x: 0.01, 3
y: -0.3, 1.05
labels: \rho\ \text{(coherent)}; \lvert\rho\rvert\ \text{(unknown phase)}
caption: Correlation between two FSK tones against their spacing $\Delta f$ in units of the symbol rate $1/T$. With known phase (blue) the tones are orthogonal at every multiple of $\Delta fT = 0.5$, and slightly *negatively* correlated near $0.7$, which puts the two signals a little farther apart than orthogonal ones. With unknown phase (orange: the largest correlation over all phase differences) orthogonality needs $\Delta fT = 1, 2, \dots$, twice the spacing. Hover near $\Delta fT = 0.833$, the spacing of the old Bell 202 modem.
:::

Orthogonal signals have $\lVert\mathbf s_m - \mathbf s_k\rVert^2 = 2E_s$ for every pair, so $d_{\min}^2/E_b = 2\log_2M$: it *grows* with $M$. Orthogonal signalling buys power efficiency with bandwidth, since $M$ tones spaced $1/(2T)$ apart occupy about $M/(2T)$ hertz, and its spectral efficiency $\eta \approx 2\log_2M/M$ falls as $M$ grows. It is the mirror image of QAM.

::: example The Bell 202 modem {#ex-bell202}
The Bell 202 modem (still used for caller-ID and some industrial links) sends $1200\,\mathrm{bit/s}$ by binary FSK with tones at $1200\,\mathrm{Hz}$ and $2200\,\mathrm{Hz}$. (a) Find the correlation of the two tones over one bit. (b) Compare the squared distance with that of orthogonal BFSK and of BPSK at the same $E_b$. (c) Which spacing would make the tones orthogonal for noncoherent detection?
::: solution
(a) $\Delta fT = 1000/1200 = 0.833$, so $\rho = \sin(2\pi \times 0.833)/(2\pi \times 0.833) = -0.866/5.236 = -0.165$. (Here $f_cT$ is only about $1.4$, so the neglected sum-frequency term is not tiny; the estimate is indicative.)

(b) For two signals of energy $E_b$ with correlation $\rho$, $d^2 = \lVert\mathbf s_1\rVert^2 + \lVert\mathbf s_2\rVert^2 - 2\mathbf s_1\cdot\mathbf s_2 = 2E_b(1 - \rho) = 2.33E_b$. Orthogonal BFSK has $2E_b$, so this is $0.66\,\mathrm{dB}$ better; BPSK has $4E_b$, which is $2.3\,\mathrm{dB}$ better still. The best possible binary FSK spacing, $\Delta fT = 0.715$ with $\rho = -0.217$, gains $0.85\,\mathrm{dB}$ over orthogonal.

(c) Multiples of $1/T = 1200\,\mathrm{Hz}$, for example $1200$ and $2400\,\mathrm{Hz}$. In practice Bell 202 receivers are noncoherent (a discriminator or a pair of filters with envelope detectors), so the tones are not exactly orthogonal and a little performance is lost; at $1200\,\mathrm{bit/s}$ over a telephone line this was an acceptable price for a very simple receiver.
:::
:::

::: application Minimum-shift keying and GSM
Binary FSK with the minimum coherent spacing $\Delta f = 1/(2T)$ and a phase that is kept continuous from bit to bit is **minimum-shift keying** (MSK). It can be viewed as offset QPSK with half-sinusoid pulses, it has a constant envelope and no phase jumps, and its spectrum falls off as $1/f^4$ instead of the $1/f^2$ of PSK with rectangular pulses. Smoothing the frequency transitions with a Gaussian filter gives **GMSK**, the modulation of the GSM cellular system (bandwidth–time product $BT = 0.3$, $270.8\,\mathrm{kbit/s}$ in a $200\,\mathrm{kHz}$ channel), chosen because its constant envelope allowed efficient, cheap handset amplifiers.
:::

## Spectra and bandwidth efficiency {#sec-spectra}

A linearly modulated passband signal (ASK, PSK, QAM) is a baseband PAM signal of complex symbols placed on a carrier:

$$
s(t) = \operatorname{Re}\Big\{\tilde s(t)e^{j2\pi f_ct}\Big\}, \qquad \tilde s(t) = \sum_k c_k\,p(t - kT), \quad c_k = a_{I,k} + ja_{Q,k} .
$$ {#eq-linear-mod}

::: theorem Power spectrum of linear modulation {#thm-passband-psd}
If the complex symbols $c_k$ are uncorrelated with zero mean and $\E\lvert c_k\rvert^2 = \sigma_c^2$, the complex envelope has PSD $S_{\tilde s}(f) = \frac{\sigma_c^2}{T}\lvert P(f)\rvert^2$, and the passband signal has

$$
S_s(f) = \frac14\big[S_{\tilde s}(f - f_c) + S_{\tilde s}(-f - f_c)\big] .
$$ {#eq-passband-psd}

The occupied bandwidth is therefore twice the baseband bandwidth of $p(t)$: $B = (1 + \alpha)R_s$ for raised-cosine shaping, and the first-null bandwidth is $2R_s$ for rectangular pulses. The **spectral efficiency** is

$$
\eta = \frac{R_b}{B} = \frac{\log_2M}{1 + \alpha}\ \mathrm{bit/s/Hz} .
$$ {#eq-eta}
:::

::: proof
The complex envelope is a PAM signal with complex symbols, and the argument of [[communication-systems/baseband-transmission#thm-pam-psd]] goes through with $\E[c_kc_{k+m}^*]$ in place of $R_a(m)$, giving $\sigma_c^2\lvert P\rvert^2/T$. For a bandpass signal with complex envelope $\tilde s$ in the convention $s = \operatorname{Re}\{\tilde se^{j2\pi f_ct}\}$, the PSD is $\frac14$ of the envelope's PSD shifted to $+f_c$, plus its mirror image at $-f_c$ ([[communication-systems/signals-spectra-channels#thm-bandpass-spectrum]] applied to power spectra). A baseband spectrum occupying $\lvert f\rvert \le (1 + \alpha)/(2T)$ becomes a band of width $(1 + \alpha)/T$ around $f_c$. With $R_b = R_s\log_2M$ the efficiency follows.
:::

So a passband system needs twice the bandwidth of a real baseband system at the same symbol rate, but it carries two real dimensions (I and Q) per symbol, so the efficiency per dimension is unchanged. With $\alpha = 0.25$: BPSK $0.8$, QPSK $1.6$, 16-QAM $3.2$, 64-QAM $4.8$, 256-QAM $6.4\,\mathrm{bit/s/Hz}$. Orthogonal FSK, needing about $M/(2T)$ hertz, achieves $2\log_2M/M$: $1$ for $M = 2$ and $4$, $0.75$ for $8$, $0.5$ for $16$.

::: warning Symbol energy, bit energy and SNR
Three different "signal-to-noise ratios" are in use: $E_b/N_0$ (energy per bit over noise density), $E_s/N_0 = (E_b/N_0)\log_2M$, and the SNR $S/N = (E_s/T)/(N_0B)$, which depends on the bandwidth definition. They differ by $10\log_{10}\log_2M$ (for example $6\,\mathrm{dB}$ for 16-QAM) and by $10\log_{10}(BT)$. Comparisons between modulations of different $M$ are fair only in $E_b/N_0$; link budgets usually give $S/N$ or $C/N_0$, and you must convert. Always write the subscript.
:::

## The power–bandwidth trade-off {#sec-tradeoff}

We now have two numbers for each modulation: the bandwidth efficiency $\eta$, and the power efficiency $d_{\min}^2/E_b$. The table collects them.

| modulation | $\eta$ ($\alpha = 0$) | $d_{\min}^2/E_b$ | loss vs BPSK |
|---|---|---|---|
| BPSK | $1$ | $4$ | $0\,\mathrm{dB}$ |
| QPSK | $2$ | $4$ | $0\,\mathrm{dB}$ |
| 8-PSK | $3$ | $1.76$ | $3.6\,\mathrm{dB}$ |
| 16-QAM | $4$ | $1.60$ | $4.0\,\mathrm{dB}$ |
| 16-PSK | $4$ | $0.61$ | $8.2\,\mathrm{dB}$ |
| 64-QAM | $6$ | $0.571$ | $8.5\,\mathrm{dB}$ |
| 256-QAM | $8$ | $0.188$ | $13.3\,\mathrm{dB}$ |
| 4-FSK (orthogonal) | $1$ | $4$ | $0\,\mathrm{dB}$ |
| 16-FSK (orthogonal) | $0.5$ | $8$ | $-3.0\,\mathrm{dB}$ (gain) |

Shannon's capacity theorem sets the boundary. A system transmitting at $R_b$ in bandwidth $B$ with received power $P = E_bR_b$ can be reliable only if $R_b \le C = B\log_2(1 + P/(N_0B))$. Writing $\eta = R_b/B$ and $P/(N_0B) = \eta E_b/N_0$, this is $\eta \le \log_2(1 + \eta E_b/N_0)$, or

$$
\frac{E_b}{N_0} \ge \frac{2^\eta - 1}{\eta} .
$$ {#eq-shannon-bound}

As $\eta \to 0$ the bound tends to $\ln2$, i.e. $-1.59\,\mathrm{dB}$, the absolute minimum energy per bit for reliable communication in white Gaussian noise.

::: widget plot
f: 10*log10((2^x - 1)/x)
x: 0.1, 9
y: -3, 24
points: 1, 9.6; 2, 9.6; 3, 13.0; 4, 13.4; 4, 17.4; 6, 17.8; 8, 22.5; 1, 9.9; 0.75, 8.4; 0.5, 7.4; 1, 12.6
labels: \text{Shannon limit } (2^\eta - 1)/\eta
caption: The power–bandwidth plane: spectral efficiency $\eta$ (bit/s/Hz, horizontal) against the $E_b/N_0$ in decibels (vertical) needed for a bit error rate of $10^{-5}$ without coding. The curve is the Shannon limit: no system can operate below it. Points, from left: 16-, 8- and 4-FSK and coherent binary FSK; BPSK at $(1, 9.6)$; QPSK $(2, 9.6)$; 8-PSK $(3, 13.0)$; 16-QAM $(4, 13.4)$ and 16-PSK $(4, 17.4)$; 64-QAM $(6, 17.8)$; 256-QAM $(8, 22.5)$. Moving right costs power; moving down costs bandwidth. Every uncoded system is between about $7.5$ and $10\,\mathrm{dB}$ from the limit at $10^{-5}$, the gap that error-correcting codes close.
:::

The plane makes the engineering choices visible. A deep-space probe has bandwidth to spare and very little power: it works at the left, with low-rate codes and (historically) orthogonal signalling. A cable modem or microwave backhaul link has a high SNR and a narrow licensed channel: it works at the right with 256-QAM or more. A cellular system adapts, moving along the plane from QPSK at the edge of a cell to 256-QAM near the base station as the received SNR changes.

::: remark Differential and noncoherent modulation
Coherent PSK and QAM receivers must know the carrier phase, which a phase-locked loop recovers from the received signal (with a $\pi$ or $\pi/2$ ambiguity for symmetric constellations). **Differential PSK** avoids both problems by encoding information in the *change* of phase from one symbol to the next: the receiver compares each symbol with the previous one, and a constant unknown phase cancels. DPSK costs about $1\,\mathrm{dB}$ at practical error rates for binary signalling and more for larger $M$. Noncoherent FSK with envelope detectors needs no phase reference at all; [[communication-systems/optimal-detection]] computes the cost.
:::

## Where this leads

The constellations of this lesson become concrete error probabilities in [[communication-systems/optimal-detection]], which shows that the optimal receiver projects the received signal onto the basis functions and picks the nearest constellation point, so that $d_{\min}$ and $E_b/N_0$ determine everything through the $Q$-function. [[communication-systems/wireless-communication]] places QAM on the subcarriers of OFDM and adapts the constellation to a fading channel. Closing the gap to the Shannon limit is the subject of [[information-theory/channel-capacity]] and the coding chapters that follow it, and the radio hardware that generates and amplifies these signals is in [[rf-microwave]].

::: history
Telegraphy was already on–off keying, and frequency-shift keying was used for radioteletype in the 1930s and for the first telephone-line modems: the Bell 103 of 1962 sent $300\,\mathrm{bit/s}$ by FSK, and the Bell 202 sent $1200\,\mathrm{bit/s}$. Phase modulation and four-phase differential PSK followed in the Bell 201 data sets in the early 1960s. The geometric view of signals as points in a space, with error probability governed by distances, was developed by Vladimir Kotelnikov in his 1947 doctoral thesis on the "potential noise immunity" of signals and by Claude Shannon in 1949, and was made standard teaching by John Wozencraft and Irwin Jacobs's textbook *Principles of Communication Engineering* (1965). QAM modems with ever larger constellations raised telephone-line rates from $9600\,\mathrm{bit/s}$ (ITU V.29 and V.32, the latter adopted in 1984 and using trellis-coded QAM based on Gottfried Ungerboeck's 1982 work) to $33.6\,\mathrm{kbit/s}$ with V.34 in the mid-1990s. GMSK was adopted for GSM in the late 1980s.
:::

::: summary
- Signals are vectors in an orthonormal basis: energy is squared length, and the distance between waveforms is the distance between their vectors; Gram–Schmidt finds a basis of dimension $N \le M$.
- The passband basis $\sqrt{2/T}\cos$, $-\sqrt{2/T}\sin$ makes a constellation point the complex envelope $s_1 + js_2$.
- BPSK and QPSK have $d_{\min}^2 = 4E_b$; QPSK sends twice the bits in the same bandwidth. M-PSK has $d_{\min} = 2\sqrt{E_s}\sin(\pi/M)$.
- Square QAM has $E_s = (M - 1)d^2/6$ and $d_{\min}^2/E_b = 6\log_2M/(M - 1)$: about $6\,\mathrm{dB}$ more power per extra two bits per symbol, and better than PSK for $M \ge 16$.
- FSK tones are orthogonal for coherent detection at spacings of $1/(2T)$, and for noncoherent detection at $1/T$; orthogonal signalling gains power efficiency and loses bandwidth efficiency as $M$ grows.
- Linear modulation with raised-cosine pulses occupies $B = (1 + \alpha)R_s$ and achieves $\eta = \log_2M/(1 + \alpha)$.
- The Shannon bound $E_b/N_0 \ge (2^\eta - 1)/\eta$ (at least $-1.59\,\mathrm{dB}$) is the frontier of the power–bandwidth plane; uncoded modulations sit $7.5$ to $10\,\mathrm{dB}$ from it at $P_b = 10^{-5}$.
:::

## Exercises

::: exercise BPSK bandwidth {level=1 check="3e6"}
A BPSK signal carries $2\,\mathrm{Mbit/s}$ with raised-cosine shaping, $\alpha = 0.5$. Find the occupied bandwidth in hertz.
::: solution
$R_s = 2\,\mathrm{Mbaud}$ and $B = (1 + \alpha)R_s = 3\,\mathrm{MHz}$.
:::
:::

::: exercise 16-QAM energy {level=1 check="10"}
The coordinates of a 16-QAM constellation take the values $\pm1$ and $\pm3$. Find the average symbol energy (in the same units squared) and $d_{\min}$.
::: solution
$d = 2$ and [[#eq-qam-energy]] gives $E_s = 15 \times 4/6 = 10$. Directly: each coordinate has mean square $(1 + 9)/2 = 5$, and there are two. $d_{\min} = 2$.
:::
:::

::: exercise 8-PSK distance {level=1 check="2*sin(pi/8)"}
Find $d_{\min}$ for 8-PSK with $E_s = 1$.
::: solution
$d_{\min} = 2\sqrt{E_s}\sin(\pi/8) = 2 \times 0.3827 = 0.765$.
:::
:::

::: exercise Spectral efficiency of 64-QAM {level=2 check="5"}
Find the spectral efficiency in bit/s/Hz of 64-QAM with root-raised-cosine pulses of roll-off $0.2$, and the bit rate in a $10\,\mathrm{MHz}$ channel.
::: solution
$\eta = 6/1.2 = 5\,\mathrm{bit/s/Hz}$, so $50\,\mathrm{Mbit/s}$ in $10\,\mathrm{MHz}$ ($R_s = 8.33\,\mathrm{Mbaud}$).
:::
:::

::: exercise FSK tone spacing {level=2 check="4800"}
A binary FSK system runs at $9600\,\mathrm{baud}$. Find the minimum tone spacing in hertz for orthogonal coherent detection, and for noncoherent detection.
::: solution
Coherent: $1/(2T) = 4800\,\mathrm{Hz}$. Noncoherent: $1/T = 9600\,\mathrm{Hz}$.
:::
:::

::: exercise PSK versus QAM {level=2 check="10*log10(1.6/(16*sin(pi/16)^2))"}
How many decibels more $E_b$ does 16-PSK need than 16-QAM for the same $d_{\min}$?
::: solution
16-PSK: $d^2/E_b = 4\log_216\sin^2(\pi/16) = 16 \times 0.03806 = 0.609$. 16-QAM: $1.6$. The ratio is $2.63$, i.e. $4.2\,\mathrm{dB}$.
:::
:::

::: exercise Peak-to-average ratio of 16-QAM {level=2 check="10*log10(1.8)"}
Find the peak-to-average power ratio, in decibels, of the 16-QAM constellation (before pulse shaping). Why does it matter for a transmitter?
::: solution
With levels $\pm1, \pm3$, the corner points have energy $9 + 9 = 18$ and the average is $10$. The ratio is $1.8$, i.e. $2.55\,\mathrm{dB}$. A power amplifier must handle the peaks without compressing them, so it runs at an average power at least $2.55\,\mathrm{dB}$ below its saturation level (more once pulse shaping adds overshoots), lowering its efficiency. PSK constellations have a ratio of $0\,\mathrm{dB}$.
:::
:::

::: exercise QAM asymptotics {level=3}
(a) Starting from [[#thm-qam-energy]], show that for large $M$ every quadrupling of $M$ reduces $d_{\min}^2/E_b$ by a factor approaching $4\cdot\frac{\log_2M}{\log_2M + 2}$, and evaluate the loss in decibels from 64- to 256-QAM and from 1024- to 4096-QAM. (b) At fixed $E_s$, by how many decibels does $d_{\min}^2$ fall per quadrupling, for large $M$? Relate your answer to the $6\,\mathrm{dB}$-per-bit rule for quantisers.
::: solution
(a) The ratio of $d^2/E_b$ for $M$ and $4M$ is $\frac{6\log_2M/(M - 1)}{6(\log_2M + 2)/(4M - 1)} = \frac{\log_2M}{\log_2M + 2}\cdot\frac{4M - 1}{M - 1} \to 4\frac{\log_2M}{\log_2M + 2}$. From 64 to 256: $d^2/E_b$ falls from $36/63 = 0.5714$ to $48/255 = 0.1882$, a ratio of $3.04$, i.e. $4.8\,\mathrm{dB}$. From 1024 to 4096: $d^2/E_b = 60/1023 = 0.05865$ and $72/4095 = 0.01758$, ratio $3.34$, i.e. $5.2\,\mathrm{dB}$; it approaches $6\,\mathrm{dB}$ only slowly, because the two extra bits per symbol also share the symbol energy, so $E_b$ falls by the factor $\log_2M/(\log_2M + 2)$ at fixed $E_s$.

(b) At fixed $E_s$, $d^2 = 6E_s/(M - 1)$, so quadrupling $M$ divides $d^2$ by almost exactly $4$: $6.0\,\mathrm{dB}$. Doubling the number of levels per dimension halves the spacing, as doubling the levels of a quantiser halves its step and costs $6\,\mathrm{dB}$ of SQNR; in QAM the extra bit per dimension costs $6\,\mathrm{dB}$ of $E_s/N_0$.
:::
:::

::: exercise The best binary FSK spacing {level=3}
For coherent binary FSK with $f_cT \gg 1$, the squared distance between the two signals is $2E_b(1 - \rho)$ with $\rho$ given by [[#eq-fsk-rho]]. (a) Show that the spacing minimising $\rho$ satisfies $\tan(2\pi x) = 2\pi x$ with $x = \Delta fT$, and find it numerically. (b) Find the gain over orthogonal BFSK in decibels. (c) Explain why no binary signal set can beat BPSK's $d^2 = 4E_b$, and how far the best FSK falls short.
::: hint
Differentiate $\sin u/u$ with respect to $u = 2\pi x$.
:::
::: solution
(a) $\frac{\dd}{\dd u}\frac{\sin u}{u} = \frac{u\cos u - \sin u}{u^2} = 0$ gives $\tan u = u$. The first nonzero root is $u = 4.4934$, so $x = 0.7151$, where $\rho = \sin(4.4934)/4.4934 = -0.2172$.

(b) $d^2 = 2E_b \times 1.2172$, a gain of $10\log_{10}1.2172 = 0.85\,\mathrm{dB}$ over orthogonal signals.

(c) For two signals of energy $E_b$, $d^2 = 2E_b(1 - \rho)$ and $\rho \ge -1$, so $d^2 \le 4E_b$, with equality only for $\rho = -1$, i.e. $s_2 = -s_1$: antipodal signals (BPSK). The best FSK has $d^2 = 2.43E_b$, $2.15\,\mathrm{dB}$ short of BPSK.
:::
:::
