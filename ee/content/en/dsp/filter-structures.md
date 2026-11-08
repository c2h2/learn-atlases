A filter designed in [[dsp/fir-filter-design]] or [[dsp/iir-filter-design]] is a transfer function, a ratio of two polynomials in $z^{-1}$. A processor needs more: an ordered list of multiplications, additions and memory updates — a **structure** — and a number format for every coefficient and every intermediate value. Mathematically equivalent structures are not equivalent in practice. A sixth-order low-pass filter computed directly from its expanded denominator can turn into an oscillator when its coefficients are rounded to $16$ bits, while the same filter split into three second-order sections works with $8$-bit coefficients. A recursive filter whose input is silent can go on producing a small tone for ever. And the rounding of every product injects noise whose level depends on the structure.

This chapter develops the standard structures — direct forms, transposed forms, cascade and parallel connections of second-order sections, and lattices — and then the three effects of finite word length: **coefficient quantisation**, which moves poles and zeros; **round-off noise**, which adds a noise floor; and **overflow and limit cycles**, the non-linear effects that scaling and careful rounding must prevent. Throughout we use the difference equations and system functions of [[dsp/discrete-time-systems]], and the result from [[random-signals/random-signals-lti]] that white noise of variance $\sigma^2$ through a filter $h$ produces output variance $\sigma^2\sum_nh^2[n]$.

## Block diagrams and the direct forms {#sec-direct}

A structure is drawn as a **signal-flow graph** or block diagram with three elements: adders, multipliers by constants, and unit delays $z^{-1}$ (memory registers). The number of multipliers sets the arithmetic cost; the number of delays sets the memory.

Consider the general IIR filter

$$
H(z) = \frac{\sum_{k=0}^{M}b_kz^{-k}}{1 + \sum_{k=1}^{N}a_kz^{-k}},\qquad y[n] = \sum_{k=0}^{M}b_kx[n - k] - \sum_{k=1}^{N}a_ky[n - k].
$$ {#eq-general}

(Note the sign convention: the denominator is written $1 + \sum a_kz^{-k}$, as in most software.)

::: definition Direct forms {#def-direct-forms}
- **Direct form I** computes [[#eq-general]] literally: a delay line of past inputs feeding the $b_k$ (the zeros), followed by a delay line of past outputs feeding the $-a_k$ (the poles). It uses $M + N$ delays.
- **Direct form II** reverses the order, poles first: with the intermediate signal $w[n] = x[n] - \sum_{k=1}^{N}a_kw[n - k]$, the output is $y[n] = \sum_{k=0}^{M}b_kw[n - k]$. Both sections need the same delayed values of $w$, so one delay line of $\max(M, N)$ registers suffices. It is **canonic**: it uses the minimum number of delays.
- The **transposed** form of a structure is obtained by reversing the direction of every branch, replacing branch points by adders and adders by branch points, and exchanging input and output.
:::

::: theorem Transposition theorem {#thm-transposition}
A single-input single-output signal-flow graph and its transpose have the same transfer function.
:::

::: proof {collapsed}
By Mason's gain formula the transfer function of a flow graph is a sum over forward paths $P_k\Delta_k/\Delta$, where $\Delta$ depends only on the loops and their non-touching combinations, and $\Delta_k$ on the loops not touching path $k$. Reversing every branch maps each forward path from input to output onto a forward path from the new input (the old output) to the new output, with the same product of gains, and each loop onto a loop with the same gain; touching relations are unchanged. Hence every term of Mason's formula is the same. (A proof without Mason's formula uses Tellegen's theorem for flow graphs; see Oppenheim and Schafer, §6.4.)
:::

The **transposed direct form II** is the structure most software libraries use for second-order sections:

$$
\begin{aligned}
y[n] &= b_0x[n] + s_1[n - 1],\\
s_1[n] &= b_1x[n] - a_1y[n] + s_2[n - 1],\\
s_2[n] &= b_2x[n] - a_2y[n].
\end{aligned}
$$ {#eq-tdf2}

It has two state variables, five multiplications and four additions per sample. Its practical advantage in fixed point is that the input is multiplied directly by the $b_k$ and the sums are accumulated in the state registers, which avoids the large internal signal $w[n]$ of direct form II at the input of a high-gain pole section.

For FIR filters ($a_k = 0$), direct form is the **tapped delay line** or transversal filter $y[n] = \sum_kh[k]x[n - k]$, and its transpose is a chain of adders fed by the products $h[k]x[n]$. A linear-phase filter with $h[k] = h[M - k]$ can be **folded**: add $x[n - k] + x[n - M + k]$ before multiplying, so that a filter of $M + 1$ taps costs only $\lceil (M + 1)/2\rceil$ multiplications. That is the factor of two quoted in [[dsp/iir-filter-design#ex-elliptic-design]].

## Cascade and parallel forms {#sec-cascade-parallel}

High-order filters are almost never computed in direct form. Factoring the numerator and denominator into real first- and second-order factors gives the **cascade** (series) form

$$
H(z) = G\prod_{i=1}^{L}\frac{1 + \beta_{1i}z^{-1} + \beta_{2i}z^{-2}}{1 + \alpha_{1i}z^{-1} + \alpha_{2i}z^{-2}},
$$ {#eq-cascade}

each factor a **second-order section** (SOS, or **biquad**) computed by [[#eq-tdf2]], one feeding the next. Expanding instead in partial fractions gives the **parallel** form

$$
H(z) = C + \sum_{i=1}^{L}\frac{\gamma_{0i} + \gamma_{1i}z^{-1}}{1 + \alpha_{1i}z^{-1} + \alpha_{2i}z^{-2}},
$$ {#eq-parallel}

in which the sections all see the input and their outputs are added. Both use about $2N$ delays and between $4N/2$ and $5N/2$ multiplications. Each complex-conjugate pair of poles (and each pair of zeros) is now set by two coefficients of its own, so rounding one coefficient affects only one pair. Choices remain in the cascade form: which zeros to pair with which poles, and in what order to place the sections. The usual rules, from Jackson's analysis, are to pair each pole pair with the zero pair nearest to it (so that each section's gain stays moderate) and to order the sections by pole radius, with the high-$Q$ sections either last (to minimise the peak signal levels before them) or first (to minimise the noise they amplify), depending on whether overflow or noise is the binding constraint.

::: example A parallel realisation {#ex-parallel}
Realise $H(z) = \dfrac{1}{(1 - 0.8z^{-1})(1 - 0.5z^{-1})}$ in direct form II, in cascade and in parallel, and count the multiplications.
::: solution
**Direct form II.** Expanding, $H(z) = 1/(1 - 1.3z^{-1} + 0.4z^{-2})$: $w[n] = x[n] + 1.3w[n - 1] - 0.4w[n - 2]$, $y[n] = w[n]$. Two multiplications, two delays.

**Cascade.** $y_1[n] = x[n] + 0.8y_1[n - 1]$ followed by $y[n] = y_1[n] + 0.5y[n - 1]$. Two multiplications, two delays.

**Parallel.** With poles $p_1 = 0.8$, $p_2 = 0.5$, the partial-fraction coefficients are $A_1 = p_1/(p_1 - p_2) = 0.8/0.3 = 8/3$ and $A_2 = p_2/(p_2 - p_1) = -5/3$, so

$$
H(z) = \frac{8/3}{1 - 0.8z^{-1}} - \frac{5/3}{1 - 0.5z^{-1}} .
$$

Check at $z = 1$: $\frac{8/3}{0.2} - \frac{5/3}{0.5} = 13.33 - 3.33 = 10$, and $1/(0.2\times0.5) = 10$. Four multiplications (two poles and two output weights), two delays. The parallel form costs more here, but its two sections can run simultaneously on parallel hardware, and the output is the sum of two independent first-order responses $\frac83(0.8)^n - \frac53(0.5)^n$.
:::
:::

## Lattice structures {#sec-lattice}

A third family of structures is built from identical two-multiplier stages. Their coefficients are **reflection coefficients**, which have a direct physical meaning in models of acoustic tubes and transmission lines and give an immediate stability test.

::: definition FIR lattice {#def-lattice}
An $N$-stage **FIR lattice** has signals $f_m[n]$ (forward) and $g_m[n]$ (backward) with $f_0[n] = g_0[n] = x[n]$ and, for $m = 1, \dots, N$,

$$
f_m[n] = f_{m-1}[n] + k_mg_{m-1}[n - 1],\qquad g_m[n] = k_mf_{m-1}[n] + g_{m-1}[n - 1],
$$ {#eq-lattice}

with output $y[n] = f_N[n]$. The numbers $k_1, \dots, k_N$ are the **reflection coefficients**.
:::

Writing $A_m(z) = F_m(z)/X(z)$ and $B_m(z) = G_m(z)/X(z)$, [[#eq-lattice]] becomes $A_m(z) = A_{m-1}(z) + k_mz^{-1}B_{m-1}(z)$ and $B_m(z) = k_mA_{m-1}(z) + z^{-1}B_{m-1}(z)$. By induction from $A_0 = B_0 = 1$, $B_m(z) = z^{-m}A_m(z^{-1})$: the backward polynomial is the forward one with its coefficients reversed. So

$$
A_m(z) = A_{m-1}(z) + k_mz^{-m}A_{m-1}(z^{-1}),
$$ {#eq-step-up}

the **step-up recursion** that builds the FIR filter $A_N(z) = 1 + \sum_ka_kz^{-k}$ from the $k_m$. Its last coefficient is $a_N = k_N$. Inverting it gives the **step-down recursion**

$$
A_{m-1}(z) = \frac{A_m(z) - k_mz^{-m}A_m(z^{-1})}{1 - k_m^2},\qquad k_m = \text{last coefficient of }A_m ,
$$ {#eq-step-down}

valid while $\lvert k_m\rvert \ne 1$. These are the same recursions as the Levinson–Durbin algorithm for the normal equations of linear prediction ([[random-signals/optimal-filtering]]).

::: theorem Stability from reflection coefficients {#thm-lattice-stability}
The polynomial $A_N(z)$ has all its zeros strictly inside the unit circle if and only if $\lvert k_m\rvert < 1$ for $m = 1, \dots, N$. Consequently the all-pole filter $1/A_N(z)$, which can be realised as a lattice with the same coefficients run in the opposite direction, is stable if and only if every reflection coefficient has magnitude less than one.
:::

::: proof {collapsed}
Suppose $A_{m-1}$ has all zeros inside the circle, and write $A_m(z) = A_{m-1}(z)\big(1 + k_mR(z)\big)$ with $R(z) = z^{-m}A_{m-1}(z^{-1})/A_{m-1}(z)$. $R$ is an all-pass function of the kind in [[dsp/discrete-time-systems#thm-allpass]] times $z^{-1}$: it is analytic for $\lvert z\rvert \ge 1$ (its poles are the zeros of $A_{m-1}$), has $\lvert R\rvert = 1$ on the circle and $\lvert R\rvert < 1$ outside it. If $\lvert k_m\rvert < 1$ then $\lvert k_mR(z)\rvert < 1$ for $\lvert z\rvert \ge 1$, so $1 + k_mR \ne 0$ there and $A_m$ has no zeros on or outside the circle. Conversely, $\lvert k_m\rvert = \lvert a_m\rvert$ is the product of the magnitudes of the zeros of $A_m$, which is less than one if all zeros are inside; then $A_{m-1}$, obtained by [[#eq-step-down]], again has all zeros inside (the argument above run backwards), and induction completes the proof.
:::

The test needs no root-finding: run the step-down recursion on the denominator and check $\lvert k_m\rvert < 1$ at every step. A lattice whose coefficients are rounded stays stable as long as each rounded $\lvert k_m\rvert$ stays below one, a robustness the direct form lacks.

::: example Reflection coefficients {#ex-lattice}
Find the reflection coefficients of $A(z) = 1 + 0.6z^{-1} + 0.2z^{-2}$, and use the step-down test to decide whether $1/(1 - 0.9z^{-1} + 0.64z^{-2} - 0.576z^{-3})$ is stable.
::: solution
For the second-order polynomial, $k_2 = a_2 = 0.2$. Step down: $A_1(z) = \big[(1 + 0.6z^{-1} + 0.2z^{-2}) - 0.2(0.2 + 0.6z^{-1} + z^{-2})\big]/(1 - 0.04) = (0.96 + 0.48z^{-1})/0.96 = 1 + 0.5z^{-1}$, so $k_1 = 0.5$. In general, for second order $k_2 = a_2$ and $k_1 = a_1/(1 + a_2)$.

For the third-order denominator, $k_3 = -0.576$. Stepping down with [[#eq-step-down]], the reversed polynomial has coefficients $(-0.576, 0.64, -0.9, 1)$, and

$$
A_2:\quad \frac{(1 - 0.3318,\ -0.9 + 0.576\times0.64,\ 0.64 - 0.576\times0.9)}{1 - 0.576^2} = \frac{(0.6682,\ -0.5314,\ 0.1216)}{0.6682} = (1,\ -0.7952,\ 0.1820).
$$

So $k_2 = 0.1820$ and, by the second-order rule, $k_1 = -0.7952/1.1820 = -0.6728$. All three have magnitude below one, so the filter is stable. Indeed $1 - 0.9z^{-1} + 0.64z^{-2} - 0.576z^{-3} = (1 - 0.9z^{-1})(1 + 0.64z^{-2})$, with poles $0.9$ and $\pm j0.8$.
:::
:::

::: quiz
The step-down recursion applied to a denominator gives $k_1 = 0.3$, $k_2 = -0.95$, $k_3 = 1.02$. What can you conclude?
- [ ] The filter is stable because most coefficients are below one
- [x] The filter is unstable: $\lvert k_3\rvert > 1$, so at least one pole lies outside the unit circle
- [ ] Nothing, unless the poles are computed
- [ ] The filter is stable but has a limit cycle
::: solution
By [[#thm-lattice-stability]], stability requires every $\lvert k_m\rvert < 1$. Here $\lvert k_3\rvert = \lvert a_3\rvert = 1.02$ is the product of the pole magnitudes, so at least one exceeds $1$.
:::
:::

## Number formats and coefficient quantisation {#sec-coefficients}

Fixed-point DSPs represent numbers as **two's-complement fractions**: a $B$-bit word $b_0.b_1b_2\dots b_{B-1}$ means $-b_0 + \sum_{i=1}^{B-1}b_i2^{-i}$, covering $[-1, 1 - 2^{-(B-1)}]$ in steps of $\Delta = 2^{-(B-1)}$. The 16-bit format is called **Q15**. Coefficients larger than one are stored with some integer bits (for example Q2.13 covers $[-4, 4)$), or the section is rearranged so that they fit. Floating point postpones but does not abolish these issues; the analysis below applies to its mantissa.

Rounding each coefficient to the nearest multiple of $\Delta$ changes it by at most $\Delta/2$ and changes the filter. FIR zeros and IIR zeros move a little; IIR **poles** can move a lot.

::: theorem Pole sensitivity of the direct form {#thm-pole-sensitivity}
Let $A(z) = 1 + \sum_{k=1}^{N}a_kz^{-k} = \prod_{j=1}^{N}(1 - p_jz^{-1})$ have distinct poles. Then

$$
\frac{\partial p_i}{\partial a_k} = -\frac{p_i^{\,N-k}}{\prod_{j\ne i}(p_i - p_j)} .
$$ {#eq-sensitivity}
:::

::: proof
Multiply by $z^N$: $P(z) = z^N + \sum_ka_kz^{N-k} = \prod_j(z - p_j)$. The pole $p_i$ satisfies $P(p_i) = 0$ identically as $a_k$ varies, so differentiating with respect to $a_k$ gives $\pdv{P}{a_k}(p_i) + P'(p_i)\pdv{p_i}{a_k} = 0$. Here $\pdv{P}{a_k}(p_i) = p_i^{N-k}$, and from the product form $P'(p_i) = \prod_{j\ne i}(p_i - p_j)$.
:::

The denominator is the product of the distances from $p_i$ to all the other poles. A sharp or narrowband filter has its poles **clustered** — all near $z = 1$ for a narrow low-pass filter — so these distances are small, and their product, raised to the $N - 1$ power, is tiny. High-order direct forms are therefore hopelessly sensitive. In a second-order section the product has a single factor, the distance between a conjugate pair, and the sensitivity is modest.

::: example Direct form against cascade {#ex-quantise}
A sixth-order Butterworth low-pass filter has cut-off $0.05\pi$. Its denominator is $1 - 5.3932z^{-1} + 12.1474z^{-2} - 14.6238z^{-3} + 9.9230z^{-4} - 3.5981z^{-5} + 0.5446z^{-6}$, with poles of radius $0.9603$, $0.8949$ and $0.8586$. Compare rounding the direct-form coefficients and the three biquad coefficients to $16$ fractional bits.
::: solution
**Sensitivity.** For the outermost pole $p = 0.9493 + j0.1452$, the product of distances to the other five poles is $1.59\times10^{-4}$. With every coefficient in error by up to $\Delta/2 = 2^{-17} = 7.6\times10^{-6}$, [[#eq-sensitivity]] bounds the movement by $\sum_k\lvert p\rvert^{6-k}\times7.6\times10^{-6}/1.59\times10^{-4} = 0.26$ — far larger than the pole's distance $0.04$ from the unit circle.

**Direct form.** Rounding the $a_k$ to multiples of $2^{-16}$ (they need four integer bits as well, so these are $21$-bit words) and finding the roots gives a pole at $z = 1.000$: the filter has become an integrator, marginally unstable, with infinite DC gain. With $18$ fractional bits the outermost poles sit at radius $0.9714$ instead of $0.9603$, still a badly distorted response.

**Cascade.** The three sections are $1 - 1.7161z^{-1} + 0.7375z^{-2}$, $1 - 1.7786z^{-1} + 0.8008z^{-2}$ and $1 - 1.8985z^{-1} + 0.9222z^{-2}$. Rounded to only $8$ fractional bits ($\Delta = 0.0039$), their poles have radii $0.8592$, $0.8949$ and $0.9601$, within $0.0006$ of the exact values. The cascade with $8$-bit fractions is better than the direct form with $18$.
:::
:::

Even the second-order direct form has a structural weakness. Its coefficients are $\alpha_1 = -2r\cos\theta$ and $\alpha_2 = r^2$, so the realisable poles lie where $r\cos\theta$ is a multiple of $\Delta/2$ and $r^2$ a multiple of $\Delta$: vertical lines and circles. Near $z = 1$, where $\cos\theta \approx 1 - \theta^2/2$, the vertical lines bunch together in $\cos\theta$ but spread out in $\theta$; the smallest non-zero angle at $r \approx 1$ is about $\sqrt{\Delta}$, so a narrow low-pass resonance cannot be placed accurately. The **coupled form** (Gold–Rader) uses the four multipliers $r\cos\theta$ and $r\sin\theta$ in the state update

$$
\begin{bmatrix}s_1[n]\\ s_2[n]\end{bmatrix} = \begin{bmatrix}r\cos\theta & -r\sin\theta\\ r\sin\theta & r\cos\theta\end{bmatrix}\begin{bmatrix}s_1[n - 1]\\ s_2[n - 1]\end{bmatrix} + \begin{bmatrix}1\\0\end{bmatrix}x[n],
$$

whose possible poles form a uniform square grid. It costs twice the multiplications and is used for oscillators and very-low-frequency resonators.

::: widget plot
f: 20*log10(1/sqrt((1 - 2*r*cos(q)*cos(x) + r^2*cos(2*x))^2 + (2*r*cos(q)*sin(x) - r^2*sin(2*x))^2)); 20*log10(1/sqrt((1 - round(2*r*cos(q)*2^b)/2^b*cos(x) + round(r^2*2^b)/2^b*cos(2*x))^2 + (round(2*r*cos(q)*2^b)/2^b*sin(x) - round(r^2*2^b)/2^b*sin(2*x))^2))
x: 0, 0.6
y: -10, 70
sliders: b=8:3:16:1; r=0.98:0.9:0.999:0.001; q=0.15:0.02:0.5:0.001
labels: \text{exact}; \text{coefficients rounded to } b \text{ fractional bits}
caption: Magnitude in decibels near its peak of the resonator $1/(1 - 2r\cos\theta\,z^{-1} + r^2z^{-2})$ with exact coefficients (blue) and with both coefficients rounded to $b$ fractional bits (orange); $q$ is the pole angle $\theta$. At $b = 8$ the peak moves only slightly. Reduce $b$ to $5$ or $6$, or move $r$ towards $0.999$ and $q$ towards $0.02$: the rounded resonance jumps to a different frequency and height, or the peak grows without bound as the rounded pole reaches the unit circle. Increase $b$ until the curves coincide: that is the word length the section needs.
:::

## Round-off noise {#sec-roundoff}

Each product of a $B$-bit coefficient and a $B$-bit signal has $2B - 1$ significant bits. Storing it back in a $B$-bit register means rounding, an error that is a deterministic function of the signal but, for busy signals, behaves like noise.

::: definition Additive model of round-off {#def-roundoff-model}
In the **additive noise model**, each rounding to step $\Delta$ is replaced by the addition of a random sequence $e[n]$ that is white, uncorrelated with the signal and with the other error sources, and uniformly distributed on $[-\Delta/2, \Delta/2]$, so that

$$
\E\{e[n]\} = 0,\qquad \sigma_e^2 = \frac{\Delta^2}{12} .
$$ {#eq-roundoff-var}

Truncation (discarding bits) instead of rounding gives the same variance and a mean of $-\Delta/2$.
:::

The model is accurate when the signal is large compared with $\Delta$ and changes by many steps from sample to sample; it fails for constant or slowly varying inputs, which is where limit cycles appear (next section). With it, the output noise of a structure follows from [[random-signals/random-signals-lti]]: if a noise source enters at a node from which the transfer function to the output is $h_e[n]$, it contributes

$$
\sigma_y^2 = \sigma_e^2\sum_{n=0}^{\infty}h_e^2[n] = \frac{\sigma_e^2}{2\pi}\int_{-\pi}^{\pi}\lvert H_e(e^{j\omega})\rvert^2\,\dd\omega ,
$$ {#eq-noise-gain}

and the contributions of independent sources add. The sum $\sum h_e^2$ is the **noise gain** of that node. Many DSPs accumulate the products of a section in a double-length accumulator and round only once, when the sum is stored; then each section has a single noise source.

For a first-order section $y[n] = ay[n - 1] + x[n]$ with one rounding at the adder, $h_e[n] = a^nu[n]$ and the noise gain is $\sum a^{2n} = 1/(1 - a^2)$. For a second-order all-pole section $1/(1 + \alpha_1z^{-1} + \alpha_2z^{-2})$ a residue calculation gives

$$
\sum_{n}h_e^2[n] = \frac{1 + \alpha_2}{(1 - \alpha_2)\big((1 + \alpha_2)^2 - \alpha_1^2\big)} ,
$$ {#eq-noise-gain-2}

which for poles at $re^{\pm j\theta}$ grows like $1/\big((1 - r)\sin^2\theta\big)$ as $r \to 1$: narrowband and low-frequency poles amplify their own round-off noise strongly.

::: widget plot
f: 10*log10(1/(1 - x^2)); 10*log10((1 + x^2)/((1 - x^2)*((1 + x^2)^2 - 4*x^2*cos(q)^2)))
x: 0, 0.995
y: 0, 70
sliders: q=0.5:0.02:1.57:0.01
labels: \text{first order, pole at } r; \text{second order, poles at } re^{\pm j\theta}
caption: Noise gain $\sum h_e^2[n]$ in decibels of a round-off source at the input of a first-order section (blue) and of a second-order all-pole section with poles at radius $r$ (horizontal axis) and angle $\theta = q$ (orange). Every $6\,\mathrm{dB}$ of noise gain costs one bit of word length. Move $q$ down towards $0.05$: a low-frequency resonance at $r = 0.99$ amplifies round-off noise by more than $60\,\mathrm{dB}$, ten bits lost — one reason audio filters with very low cut-offs are computed with double-precision accumulators or special structures.
:::

::: example Noise of a first-order smoother {#ex-noise-first}
The smoother $y[n] = 0.99y[n - 1] + 0.01x[n]$ runs in Q15 with one rounding per sample. Find the RMS output noise in units of the least significant bit.
::: solution
The rounding occurs where the sum is stored, at the input of the recursion, so $h_e[n] = 0.99^nu[n]$ and the noise gain is $1/(1 - 0.99^2) = 1/0.0199 = 50.25$. With $\sigma_e^2 = \Delta^2/12$, the output noise variance is $50.25\Delta^2/12 = 4.19\Delta^2$, an RMS value of $2.05\Delta$: about two LSBs, or one bit lost. The pole near $z = 1$ that makes the filter a good smoother also makes it a good integrator of its own errors.
:::
:::

::: quiz
A processor rounds every product of a five-multiplier biquad separately instead of accumulating in double length and rounding once. By roughly how much does the round-off noise power at the output change?
- [ ] It is unchanged: the same coefficients are used
- [x] It rises about fivefold (about $7\,\mathrm{dB}$), since five independent sources of variance $\Delta^2/12$ replace one
- [ ] It doubles
- [ ] It falls, because each rounding error is smaller
::: solution
In transposed direct form II every product is added into $y$ or into a state register, and all of these nodes reach the output through the recursion $1/A(z)$ (delayed by zero, one or two samples), so each of the five independent sources sees the same noise gain $\sum h_e^2$ with $H_e = 1/A$. Variances of independent sources add, so the noise power is about five times larger: $10\log_{10}5 = 7\,\mathrm{dB}$, a little over one bit. That is why DSPs have wide accumulators.
:::
:::

## Overflow, scaling and limit cycles {#sec-overflow}

A fractional register cannot hold a value outside $[-1, 1)$. In two's-complement arithmetic an overflowing sum **wraps around** — $0.75 + 0.5$ becomes $-0.75$ — and a single wrap inside a recursive filter can start a large-scale oscillation. Two defences are used together: **scaling**, which keeps signals in range, and **saturation arithmetic**, which clips instead of wrapping when overflow nevertheless occurs. (Intermediate overflow in a sum is harmless in two's complement provided the final result is in range.)

::: theorem Scaling bounds {#thm-scaling}
Let $h_v[n]$ be the impulse response from the input to an internal node $v$. If $\lvert x[n]\rvert \le 1$ for all $n$, then

$$
\lvert v[n]\rvert \le \sum_{k=0}^{\infty}\lvert h_v[k]\rvert = \lVert h_v\rVert_1 ,
$$ {#eq-l1}

and the bound is attained for some input. For a sinusoidal input of unit amplitude the steady-state peak is $\max_\omega\lvert H_v(e^{j\omega})\rvert = \lVert H_v\rVert_\infty \le \lVert h_v\rVert_1$.
:::

::: proof
$\lvert v[n]\rvert = \lvert\sum_kh_v[k]x[n - k]\rvert \le \sum_k\lvert h_v[k]\rvert\lvert x[n - k]\rvert \le \lVert h_v\rVert_1$. Equality holds for $x[n - k] = \operatorname{sign}(h_v[k])$ at the chosen $n$. For $x[n] = \cos(\omega_0n)$ the steady-state output is $\lvert H_v(e^{j\omega_0})\rvert\cos(\omega_0n + \phi)$, and $\lvert H_v(e^{j\omega})\rvert \le \sum\lvert h_v[k]\rvert$.
:::

Scaling the input (or each section) by $1/\lVert h_v\rVert_1$ guarantees no overflow but is pessimistic; scaling by $1/\lVert H_v\rVert_\infty$ prevents overflow for sinusoids; scaling by the **$L_2$ norm** $(\sum h_v^2)^{1/2}$ keeps random signals in range most of the time. Each factor of two of scaling loses $6\,\mathrm{dB}$ of signal-to-noise ratio, so scaling and noise are a single trade-off: the art of filter implementation is to place gains and order the sections so that every internal node is used close to full scale.

::: example Choosing a word length {#ex-word-length}
The smoother of [[#ex-noise-first]] is to process a full-scale sinusoid at low frequency with a signal-to-round-off-noise ratio of at least $80\,\mathrm{dB}$. Check that it cannot overflow, and choose the word length $B$.
::: solution
**Scaling.** From the input to the output, $h[n] = 0.01\times0.99^n$, so $\lVert h\rVert_1 = 0.01/(1 - 0.99) = 1$: the output never exceeds the input bound, and the internal sum is the output. No extra scaling is needed. (Had the filter been written $y[n] = 0.99y[n - 1] + x[n]$, the DC gain and the $L_1$ norm would be $100$, and the input would need to be scaled down by $2^{-7}$, costing $7$ bits.)

**Noise.** The signal power is $\tfrac12$ (unit amplitude). The noise power is $50.25\,\Delta^2/12$ with $\Delta = 2^{-(B-1)}$. We need

$$
\frac{0.5}{50.25\,\Delta^2/12} \ge 10^8 \iff \Delta^2 \le \frac{6}{50.25\times10^8} = 1.194\times10^{-9} \iff \Delta \le 3.46\times10^{-5},
$$

so $B - 1 \ge \log_2(1/3.46\times10^{-5}) = 14.8$, i.e. $B = 16$. With Q15 the ratio is $10\log_{10}\big(0.5\times12\times2^{30}/50.25\big) = 81.1\,\mathrm{dB}$, meeting the requirement with $1.1\,\mathrm{dB}$ to spare; the coefficient $0.99$ is represented as $32\,440/32\,768 = 0.98999$, a negligible change.
:::
:::

### Limit cycles

The additive noise model assumes a busy signal. When the input becomes zero or constant, the rounding inside a recursion is a deterministic non-linearity and can sustain a periodic output, a **zero-input limit cycle**. Take $y[n] = Q[a\,y[n - 1]]$ with $Q$ rounding to the nearest integer (in units of $\Delta$) and $\lvert a\rvert < 1$. Once $\lvert y\rvert$ is so small that $\lvert ay - y\rvert \le \tfrac12$, rounding returns $y$ unchanged: the output sticks. This happens for $\lvert y\rvert \le \dfrac{0.5}{1 - \lvert a\rvert}$, the **dead band**. For $a = 0.9$, starting from $y = 10$, the output runs $9, 8, 7, 6, 5, 5, 5, \dots$ and never decays; for $a = -0.9$ it runs $-9, 8, -7, 6, -5, 5, -5, \dots$, an oscillation at the Nyquist frequency with amplitude five LSBs. Second-order sections have analogous dead-band limit cycles at frequencies near the pole angle; and wrap-around overflow can cause **large-scale** limit cycles of full-scale amplitude, which saturation arithmetic prevents.

::: warning Silence is not the same as zero
A limit cycle is only a few LSBs, but it is a pure tone, and the ear finds tones in silence much more objectionable than noise of the same power. In a 16-bit audio filter with poles near $z = 1$, the dead band of a low-frequency section can be tens of LSBs. Remedies are magnitude truncation (rounding towards zero, which makes the error reduce $\lvert y\rvert$ and kills zero-input limit cycles in first- and second-order sections), adding a small random **dither** before rounding, error feedback, longer accumulators, or structures proved free of limit cycles (some state-space and wave digital filters). FIR filters, having no feedback, cannot limit-cycle.
:::

::: application Biquads everywhere
Look inside an audio codec chip, a hearing aid or a mobile phone's audio DSP and you will find banks of biquads in transposed direct form II, typically with $24$- or $32$-bit coefficients and $40$- to $56$-bit accumulators, cascaded to build equalisers, crossovers and tone controls. Software libraries take the same approach: SciPy's `sosfilt`, MATLAB's `sosfilt` and the CMSIS-DSP library for ARM microcontrollers all realise IIR filters as cascades of second-order sections, and their design functions return the section coefficients directly rather than the expanded polynomials. Lattice structures appear in speech coders, where the reflection coefficients of a vocal-tract model are transmitted, quantised and checked for stability simply by testing $\lvert k_m\rvert < 1$.
:::

::: history
Finite-word-length effects were studied as soon as digital filters were built in the 1960s. James Kaiser described the sensitivity of high-order direct-form filters to coefficient rounding in 1965–66, the result that made the cascade of second-order sections standard. Bernard Gold and Charles Rader's *Digital Processing of Signals* (1969), written at MIT Lincoln Laboratory, gave the coupled form and the noise analysis of recursive filters, and Leland Jackson (1970) analysed round-off noise and the ordering and pairing of cascade sections. Limit cycles were analysed by Jackson, by Parker and Hess (1971) and by Ebert, Mazo and Taylor (1969), who studied overflow oscillations. The lattice filter came from speech research: Fumitada Itakura and Shuzo Saito introduced the PARCOR (partial correlation) lattice in 1969–72, and Augustine Gray and John Markel developed lattice digital filter structures in 1973–75. Alfred Fettweis's wave digital filters (1971) imitated passive ladders to inherit their low sensitivity.
:::

## Where this leads

The structures here carry over to the decimators and interpolators of [[dsp/multirate-processing]], where the polyphase decomposition is itself a structure that avoids computing samples that will be discarded. The noise-gain formula [[#eq-noise-gain]] returns in the noise shaping of sigma–delta converters ([[electronics-2/data-converters]]), and the lattice and Levinson recursion in the autoregressive spectral estimates of [[dsp/spectral-analysis]]. Implementations on real processors — fixed-point formats, accumulators and saturation in C — are in [[embedded-systems]].

::: summary
- A structure is an ordered computation of adders, multipliers and delays; equivalent structures differ in cost, memory and, above all, behaviour with finite word length.
- Direct form II is canonic in delays; transposition preserves the transfer function, and transposed direct form II is the usual biquad. Symmetric FIR filters can be folded to halve the multiplications.
- High-order IIR filters are realised as cascades or parallel sums of second-order sections, because the pole sensitivity $\partial p_i/\partial a_k$ of the direct form is divided by the product of distances between poles, which is tiny for clustered poles.
- Lattice structures use reflection coefficients; $\lvert k_m\rvert < 1$ for all $m$ is equivalent to stability, tested by the step-down recursion.
- Round-off is modelled as white noise of variance $\Delta^2/12$ per rounding; its output power is the noise gain $\sum h_e^2[n]$, large for poles near the unit circle.
- Scaling by the $L_1$, $L_\infty$ or $L_2$ norm prevents overflow at the cost of signal-to-noise ratio; saturation arithmetic contains overflow that still occurs.
- Rounding inside a recursion can sustain zero-input limit cycles within a dead band of about $0.5/(1 - \lvert a\rvert)$ LSBs; magnitude truncation, dither or FIR filters avoid them.
:::

## Exercises

::: exercise Counting operations {level=1 check="51"}
A linear-phase FIR filter has $101$ taps. How many multiplications per output sample does the folded direct form need? (The unfolded form needs $101$.)
::: solution
The filter is symmetric with $M = 100$: pair $x[n - k]$ with $x[n - 100 + k]$ for $k = 0, \dots, 49$ and keep the middle tap $k = 50$ alone. That is $50 + 1 = 51$ multiplications (and still $100$ additions).
:::
:::

::: exercise Q15 representation {level=1 check="-26214"}
Which integer is stored in a 16-bit Q15 register for the coefficient $-0.8$ (rounding to the nearest step)? What value does it actually represent?
::: solution
$\Delta = 2^{-15}$, and $-0.8\times32\,768 = -26\,214.4$, which rounds to $-26\,214$. It represents $-26\,214/32\,768 = -0.799988$, an error of $1.2\times10^{-5}$.
:::
:::

::: exercise Second-order reflection coefficients {level=1}
Find the reflection coefficients of $A(z) = 1 - 1.6z^{-1} + 0.8z^{-2}$ and decide whether $1/A(z)$ is stable. Confirm by finding the poles.
::: solution
$k_2 = a_2 = 0.8$ and $k_1 = a_1/(1 + a_2) = -1.6/1.8 = -0.889$. Both have magnitude below one, so the filter is stable. The poles are $0.8 \pm j0.4$, of radius $\sqrt{0.8} = 0.894$.
:::
:::

::: exercise Noise gain of a resonator {level=2 check="(1 + 0.81)/((1 - 0.81)*((1 + 0.81)^2 - 0))"}
Use [[#eq-noise-gain-2]] to find the noise gain of a second-order all-pole section with poles at $\pm j0.9$, and express it in bits.
::: solution
Poles $\pm j0.9$ give $(1 - j0.9z^{-1})(1 + j0.9z^{-1}) = 1 + 0.81z^{-2}$: $\alpha_1 = 0$, $\alpha_2 = 0.81$. Then the noise gain is $1.81/(0.19\times1.81^2) = 1/(0.19\times1.81) = 2.908$, i.e. $4.6\,\mathrm{dB}$, about $0.8$ bits ($\tfrac12\log_2 2.908 = 0.77$). Check directly: $h_e[n] = (-0.81)^{n/2}$ for even $n$ and $0$ for odd $n$, so $\sum h_e^2 = \sum_m0.81^{2m} = 1/(1 - 0.6561) = 2.908$.
:::
:::

::: exercise Dead band {level=2 check="10"}
A first-order recursion $y[n] = Q[0.95\,y[n - 1]]$ rounds to the nearest integer. Up to what magnitude can a zero-input limit cycle persist? Enter the bound in LSBs.
::: solution
The output sticks when $\lvert 0.95y - y\rvert \le 0.5$, i.e. $\lvert y\rvert \le 0.5/0.05 = 10$. Starting at $y = 20$: $19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 10, \dots$ ($0.95\times10 = 9.5$ rounds to $10$ with round-half-away-from-zero).
:::
:::

::: exercise L1 scaling of a resonator input {level=2}
The section $1/(1 - 2r\cos\theta\,z^{-1} + r^2z^{-2})$ has $h[n] = r^n\sin((n + 1)\theta)/\sin\theta$. Show that $\lVert h\rVert_1 \le 1/\big((1 - r)\sin\theta\big)$, and evaluate the bound and $\lVert H\rVert_\infty$ for $r = 0.95$, $\theta = \pi/2$.
::: solution
$\lvert h[n]\rvert \le r^n/\sin\theta$, so $\sum\lvert h\rvert \le 1/((1 - r)\sin\theta)$. For $r = 0.95$, $\theta = \pi/2$: the section is $1/(1 + 0.9025z^{-2})$, $h[n] = 0.95^n\sin((n + 1)\pi/2)$ is non-zero only for even $n$, and $\lVert h\rVert_1 = \sum_m0.9025^m = 10.26$, below the bound $20$. The peak gain is at $\omega = \pi/2$, $z^{-2} = -1$: $\lVert H\rVert_\infty = 1/(1 - 0.9025) = 10.26$. (Here the two coincide because the impulse response has constant sign pattern matched by a sinusoid at $\pi/2$.) The input must be scaled by about $1/10.26$, i.e. by $2^{-4}$, costing four bits.
:::
:::

::: exercise Transposed direct form {level=2}
Show by eliminating $s_1$ and $s_2$ from [[#eq-tdf2]] that the transposed direct form II realises $H(z) = (b_0 + b_1z^{-1} + b_2z^{-2})/(1 + a_1z^{-1} + a_2z^{-2})$.
::: solution
Take $z$-transforms: $S_2 = b_2X - a_2Y$, $S_1 = b_1X - a_1Y + z^{-1}S_2$, $Y = b_0X + z^{-1}S_1$. Substituting, $Y = b_0X + z^{-1}(b_1X - a_1Y) + z^{-2}(b_2X - a_2Y)$, so $Y(1 + a_1z^{-1} + a_2z^{-2}) = X(b_0 + b_1z^{-1} + b_2z^{-2})$. This is an instance of [[#thm-transposition]].
:::
:::

::: exercise Pole sensitivity of a second-order section {level=3}
Use [[#eq-sensitivity]] to find $\partial p/\partial\alpha_1$ and $\partial p/\partial\alpha_2$ for the pole $p = re^{j\theta}$ of $1 + \alpha_1z^{-1} + \alpha_2z^{-2}$. Explain why low-frequency poles ($\theta \to 0$) are sensitive, and estimate the error in $\theta$ caused by an error $10^{-4}$ in $\alpha_1$ for $r = 0.99$, $\theta = 0.02$.
::: hint
The other pole is $p^* = re^{-j\theta}$, so $p - p^* = 2jr\sin\theta$.
:::
::: solution
With $N = 2$: $\partial p/\partial\alpha_1 = -p/(p - p^*) = -re^{j\theta}/(2jr\sin\theta) = je^{j\theta}/(2\sin\theta)$ and $\partial p/\partial\alpha_2 = -1/(p - p^*) = j/(2r\sin\theta)$. Both grow like $1/\sin\theta$: as the two poles approach each other on the real axis, the section behaves like a cluster of two poles. The component of $\mathrm{d}p$ along the circle is $r\,\mathrm{d}\theta = \operatorname{Re}\{e^{-j\theta}\,\mathrm{d}p/j\}$; from $\partial p/\partial\alpha_1$ this is $\mathrm{d}\alpha_1/(2\sin\theta)$, so $\mathrm{d}\theta = \mathrm{d}\alpha_1/(2r\sin\theta) = 10^{-4}/(2\times0.99\times0.0200) = 2.5\times10^{-3}$ — a $13\%$ error in the angle $0.02$. A $16$-bit coefficient is barely adequate for such a resonance; the coupled form, whose coefficient $r\sin\theta$ sets the angle directly, is much better.
:::
:::

::: exercise A cascade design with word lengths {level=3}
The seventh-order elliptic filter of [[dsp/iir-filter-design#ex-elliptic-design]] has denominator sections $1 - 0.7539z^{-1}$, $1 - 1.4626z^{-1} + 0.6721z^{-2}$, $1 - 1.3958z^{-1} + 0.8424z^{-2}$ and $1 - 1.3785z^{-1} + 0.9571z^{-2}$. Order the sections for minimum overflow risk, and estimate, using [[#eq-noise-gain-2]], the noise gain of the last section's own round-off source. Which section dominates the round-off noise?
::: solution
The sections in increasing pole radius are: first-order ($0.754$), then $\sqrt{0.6721} = 0.820$, $\sqrt{0.8424} = 0.918$ and $\sqrt{0.9571} = 0.978$. To keep peaks small before the end, place the high-$Q$ section ($r = 0.978$) last, so that its large resonant gain acts on a signal already filtered by the others (each section paired with its nearest zeros so that its passband gain is moderate). For the last section, $\alpha_1 = -1.3785$, $\alpha_2 = 0.9571$: $(1 + \alpha_2) = 1.9571$, $(1 - \alpha_2) = 0.0429$, $(1 + \alpha_2)^2 - \alpha_1^2 = 3.8302 - 1.9003 = 1.9299$, so the noise gain is $1.9571/(0.0429\times1.9299) = 23.6$, about $13.7\,\mathrm{dB}$ or $2.3$ bits. The noise injected at the earlier sections is shaped by every later section, including this one, so the high-$Q$ section dominates both its own noise and the amplification of the others' noise. The alternative ordering (high-$Q$ first) reduces the noise but raises the overflow risk; which is chosen depends on the signal statistics, and in practice both are checked by simulation.
:::
:::
