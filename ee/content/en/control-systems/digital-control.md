Almost every controller built today is a program. The current loop of a motor drive runs in a timer interrupt on a microcontroller every $50\,\mathrm{\mu s}$; the voltage loop of a server power supply runs on a digital signal controller at the switching frequency; the attitude loop of a drone runs at $1\,\mathrm{kHz}$. A program cannot watch a signal continuously. It samples the error with an analog-to-digital converter, computes a new control value from a difference equation, and writes it to a PWM unit or a DAC, which holds it until the next sample. The loop is a **sampled-data system**: a continuous plant wrapped in a discrete-time controller.

Sampling changes the loop in three ways. The hold that turns numbers back into a signal adds a delay of half a sample period, and the computation usually adds another; delay costs phase margin, as [[control-systems/frequency-response-methods]] showed. The controller must be expressed as a difference equation, either by translating a continuous design (**emulation**) or by designing directly in the $z$-plane. And the arithmetic is finite: ADC resolution, fixed-point coefficients and saturation all leave their mark. This chapter models the sampled loop with the $z$-transform of [[signals-systems/z-transform]], derives the exact discrete model of a plant driven through a zero-order hold, compares the standard discretisations, and turns a compensator from [[control-systems/compensator-design]] into a few lines of C. Sampling and aliasing are treated in [[signals-systems/sampling]]; interrupts and fixed-point arithmetic in [[embedded-systems/embedded-programming]].

## The sampled-data loop

A digital loop has four parts besides the plant: an anti-aliasing filter and ADC that sample the measured output every $T$ seconds, the processor that computes $u[k]$ from the error samples $e[k]$, and a **hold** that converts $u[k]$ to a continuous signal. Almost every hold in practice is a **zero-order hold** (ZOH): the output is held constant at $u[k]$ for $kT \le t < (k + 1)T$, which is what a DAC register or a PWM compare register does.

::: definition Zero-order hold {#def-zoh}
A **zero-order hold** with period $T$ converts the sequence $u[k]$ into the staircase $u(t) = u[k]$ for $kT \le t < (k + 1)T$. Its response to a unit impulse sample is a rectangular pulse of width $T$, so its transfer function is

$$
H_{ZOH}(s) = \frac{1 - e^{-sT}}{s}.
$$ {#eq-zoh}
:::

::: theorem The ZOH as a half-sample delay {#thm-zoh-delay}
The frequency response of the zero-order hold, normalised by $T$, is

$$
\frac{H_{ZOH}(j\omega)}{T} = \frac{\sin(\omega T/2)}{\omega T/2}\,e^{-j\omega T/2}:
$$ {#eq-zoh-freq}

a gain that falls slowly from $1$ (to $0.64$ at half the sampling frequency) and a pure delay of $T/2$. At a crossover frequency $\omega_c$ the hold therefore costs $\omega_cT/2$ radians of phase margin.
:::

::: proof
$1 - e^{-j\omega T} = e^{-j\omega T/2}\bigl(e^{j\omega T/2} - e^{-j\omega T/2}\bigr) = 2j\sin(\omega T/2)\,e^{-j\omega T/2}$. Dividing by $j\omega$ gives $T\,\frac{\sin(\omega T/2)}{\omega T/2}e^{-j\omega T/2}$. At $\omega = \pi/T$ the sinc factor is $2/\pi = 0.64$.
:::

Intuitively, the staircase follows the sampled signal with an average lag of half a step. Most implementations add a second delay: the ADC samples at the start of the period, the code computes, and the new value is loaded into the PWM at the *start of the next period*, a full sample later. The total effective delay is then about $1.5T$.

::: widget plot
f: sin(x); sin(t*floor(x/t)); sin(x - t/2)
x: 0, 12.6
y: -1.3, 1.3
sliders: t=0.6:0.1:2:0.05
labels: \text{signal}; \text{ZOH output}; \text{signal delayed by }T/2
caption: A sinusoid (blue), the staircase produced by sampling it every $t$ time units and holding each sample (orange), and the sinusoid delayed by half a sample period (green). The staircase follows the delayed curve on average: the zero-order hold behaves like a delay of $T/2$. Increase $t$ (slower sampling) and the lag, measured as a fraction of a cycle, grows in proportion.
:::

::: example The delay budget of a digital current loop {#ex-delay-budget}
The $1\,\mathrm{kHz}$ current loop of [[control-systems/pid-control#ex-current-loop]] is implemented on a microcontroller that samples and updates the PWM at $20\,\mathrm{kHz}$, with the new duty cycle applied one period after the sample. How much phase margin does sampling cost?
::: solution
$T = 50\,\mathrm{\mu s}$, and the effective delay is about $1.5T = 75\,\mathrm{\mu s}$ (half a period for the hold, one for the computation). At $\omega_c = 2\pi\times1000 = 6283\,\mathrm{rad/s}$ this costs $\omega_c\times75\times10^{-6} = 0.471\,\mathrm{rad} = 27^\circ$, reducing the $90^\circ$ of the continuous design to $63^\circ$. With a crossover at $2\,\mathrm{kHz}$ the loss would be $54^\circ$. This is why digital current loops are seldom faster than about a twentieth of the sampling frequency, and why some drives sample in the middle of the PWM period and update at once ("single-update with short latency") to cut the delay towards $T/2$.
:::
:::

How fast should a loop be sampled? A common rule is a sampling frequency $10$ to $30$ times the closed-loop bandwidth: slower sampling costs too much phase and produces visible steps in the response; much faster sampling gains little and makes the controller coefficients awkward (see below). The anti-aliasing filter must remove noise above half the sampling frequency, but it adds lag of its own, so it is placed well above the crossover.

## Discrete models of the plant

Between two samples the plant is driven by a constant input. That makes it possible to compute the plant's state at the next sample exactly, without any approximation.

::: theorem ZOH-equivalent model {#thm-zoh-equivalent}
If the continuous plant $\dot x = Ax + Bu$, $y = Cx$ is driven through a zero-order hold of period $T$, its states at the sampling instants obey exactly

$$
x[k + 1] = \Phi x[k] + \Gamma u[k],\qquad \Phi = e^{AT},\quad \Gamma = \int_0^Te^{A\tau}\,\dd\tau\,B,\qquad y[k] = Cx[k].
$$ {#eq-zoh-ss}

Equivalently, the discrete transfer function from $u[k]$ to $y[k]$ is

$$
G(z) = (1 - z^{-1})\,\mathcal Z\left\{\frac{G(s)}{s}\right\},
$$ {#eq-zoh-tf}

where $\mathcal Z\{G(s)/s\}$ is the $z$-transform of the samples of the plant's step response. Each pole $p$ of $G(s)$ becomes a pole $e^{pT}$ of $G(z)$.
:::

::: proof
By [[control-systems/state-space-models#thm-state-solution]] with initial time $kT$ and constant input $u[k]$,

$$
x((k + 1)T) = e^{AT}x(kT) + \int_{kT}^{(k+1)T}e^{A((k+1)T - \tau)}\,\dd\tau\,Bu[k],
$$

and the substitution $\sigma = (k + 1)T - \tau$ turns the integral into $\int_0^Te^{A\sigma}\,\dd\sigma\,B$. For the transfer function: the input staircase is a sum of steps, $u(t) = \sum_k u[k]\bigl(\epsilon(t - kT) - \epsilon(t - (k+1)T)\bigr)$ with $\epsilon$ the unit step. By linearity the sampled output is the sum of correspondingly shifted and differenced sampled step responses, which in the $z$-domain is $(1 - z^{-1})$ times the $z$-transform of the sampled step response times $U(z)$. The eigenvalues of $e^{AT}$ are $e^{\lambda T}$ for the eigenvalues $\lambda$ of $A$.
:::

The pole mapping $z = e^{sT}$ is the bridge between the planes ([[signals-systems/z-transform]]): the left half of the $s$-plane maps into the unit disc, the imaginary axis onto the unit circle, a pole at $-\sigma$ to a real pole at $e^{-\sigma T}$, and a damped pair to a pair at radius $e^{-\zeta\omega_nT}$ and angle $\pm\omega_dT$. A sampled loop is stable when all its closed-loop poles lie strictly inside the unit circle. Zeros do not map so simply: the ZOH equivalent usually has zeros that the continuous plant does not, and for plants with three or more excess poles some of them lie outside the unit circle at fast sampling rates.

::: widget complexmap
f: exp(z*t)
mode: grid
x: -3, 0.5
y: -3.1, 3.1
sliders: t=1:0.2:2:0.05
caption: The map $z = e^{sT}$ from the $s$-plane (a grid of lines of constant real part and constant imaginary part) to the $z$-plane, with the sample period $t$ on the slider (in units where the plotted $s$-plane region is $-3 \le \sigma \le 0.5$, $\lvert\omega\rvert \le 3.1$). Vertical lines (constant decay rate) become circles; horizontal lines (constant frequency) become rays from the origin. The imaginary axis wraps onto the unit circle, and the strip $\lvert\omega\rvert < \pi/T$ already covers the whole $z$-plane — frequencies above half the sampling rate fold back, which is aliasing seen in the pole positions.
:::

::: example The sampled current-loop plant {#ex-zoh-rl}
Find the ZOH-equivalent of the armature circuit $I(s)/V(s) = 1/(Ls + R)$ with $R = 2\,\Omega$, $L = 1\,\mathrm{mH}$, sampled at $T = 50\,\mathrm{\mu s}$.
::: solution
In state form $\dot i = -(R/L)i + v/L$, so $\Phi = e^{-RT/L} = e^{-0.1} = 0.9048$ and $\Gamma = \int_0^Te^{-R\tau/L}\,\dd\tau/L = (1 - e^{-RT/L})/R = 0.04758\,\mathrm{A/V}$. Hence

$$
i[k + 1] = 0.9048\,i[k] + 0.04758\,v[k],\qquad G(z) = \frac{0.04758}{z - 0.9048}.
$$

The DC gain is $0.04758/(1 - 0.9048) = 0.5\,\mathrm{A/V} = 1/R$, as it must be: the ZOH equivalent is exact at the samples and in particular in steady state.
:::
:::

### Stability in the z-plane

For low orders, stability can be checked from the coefficients, as the Routh array does in continuous time. For the second-order polynomial $z^2 + a_1z + a_0$, both roots lie inside the unit circle if and only if

$$
\abs{a_0} < 1,\qquad 1 + a_1 + a_0 > 0,\qquad 1 - a_1 + a_0 > 0,
$$ {#eq-jury2}

the simplest case of the **Jury criterion**. (The product of the roots is $a_0$; the other two conditions say the polynomial is positive at $z = 1$ and $z = -1$, so no real root has escaped through either end.)

::: example Sampling a position servo {#ex-sampled-servo}
The servo plant $G(s) = 1250/[s(s + 63)]$ of [[control-systems/time-response#ex-servo]] is controlled by a digital proportional controller $K_a$ with a ZOH. Its ZOH equivalent is

$$
G(z) = \frac{b_1z + b_0}{(z - 1)(z - e^{-63T})},\quad b_1 = \frac{1250}{63^2}\bigl(63T - 1 + e^{-63T}\bigr),\quad b_0 = \frac{1250}{63^2}\bigl(1 - e^{-63T} - 63Te^{-63T}\bigr).
$$

Find the range of stable $K_a$ and the overshoot with $K_a = 2.27$ (the $10\,\%$ design for continuous control) at sampling periods of $10$, $5$ and $1\,\mathrm{ms}$.
::: solution
The characteristic polynomial is $(z - 1)(z - e^{-63T}) + K_a(b_1z + b_0) = z^2 + \bigl(K_ab_1 - 1 - e^{-63T}\bigr)z + \bigl(e^{-63T} + K_ab_0\bigr)$. For $T = 10\,\mathrm{ms}$: $e^{-0.63} = 0.5326$, $b_1 = 0.05121$, $b_0 = 0.04153$. The condition $\abs{a_0} < 1$ gives $K_a < (1 - 0.5326)/0.04153 = 11.25$; the condition at $z = -1$ gives the much weaker $K_a < 317$, and the condition at $z = 1$ holds for every $K_a > 0$. Simulating the difference equation for each period:

| $T$ | maximum stable $K_a$ | overshoot with $K_a = 2.27$ |
|---|---|---|
| continuous | $\infty$ | $10.0\,\%$ |
| $1\,\mathrm{ms}$ | $102$ | $10.8\,\%$ |
| $5\,\mathrm{ms}$ | $21.3$ | $14.7\,\%$ |
| $10\,\mathrm{ms}$ | $11.3$ | $21.1\,\%$ |

The continuous loop is stable for every gain; sampling makes the stable range finite, and slow sampling degrades the damping. The closed-loop bandwidth here is about $60\,\mathrm{rad/s}$ ($10\,\mathrm{Hz}$), so $T = 10\,\mathrm{ms}$ is a sampling frequency only ten times the bandwidth, the bottom of the recommended range — and the overshoot doubles.
:::
:::

## Discretising a continuous controller

The most common route to a digital controller is **emulation**: design $C(s)$ by the continuous methods of earlier chapters, then approximate it by a discrete $C(z)$. Each standard method replaces $s$ by a function of $z$ obtained from a rule for numerical integration.

::: definition Discretisation rules {#def-discretisation}
With sampling period $T$:

- **forward Euler**: $s \leftarrow \dfrac{z - 1}{T}$;
- **backward Euler**: $s \leftarrow \dfrac{z - 1}{Tz}$;
- **Tustin (bilinear, trapezoidal)**: $s \leftarrow \dfrac{2}{T}\,\dfrac{z - 1}{z + 1}$;
- **matched pole–zero**: map each pole and zero by $z = e^{sT}$ and match the DC gain.
:::

They come from integrating $\dot x = v$ over one sample: forward Euler uses $v[k]$, backward Euler $v[k+1]$ and Tustin their average, so $x[k+1] - x[k] = \tfrac T2(v[k+1] + v[k])$, i.e. $\frac{X}{V} = \frac T2\frac{z + 1}{z - 1}$, the reciprocal of the Tustin substitution. Forward Euler can map a stable continuous pole outside the unit circle if $T$ is large; backward Euler and Tustin never do.

::: theorem Properties of the Tustin transformation {#thm-tustin}
The Tustin substitution maps the open left half of the $s$-plane onto the open unit disc and the imaginary axis onto the unit circle, so it preserves stability. A continuous frequency $\omega_a$ appears in the discrete design at the frequency $\omega_d$ given by

$$
\omega_a = \frac{2}{T}\tan\frac{\omega_dT}{2}.
$$ {#eq-warping}

For $\omega_dT \ll 1$, $\omega_d \approx \omega_a$; the whole axis $0 \le \omega_a < \infty$ is compressed into $0 \le \omega_d < \pi/T$ (**frequency warping**). A chosen critical frequency $\omega_0$ is preserved exactly by **prewarping**: design the continuous controller with $\omega_0$ replaced by $\frac2T\tan\frac{\omega_0T}{2}$.
:::

::: proof
Inverting $s = \frac2T\frac{z - 1}{z + 1}$ gives $z = \frac{1 + sT/2}{1 - sT/2}$. For $s = \sigma + j\omega$, $\abs z^2 = \frac{(1 + \sigma T/2)^2 + (\omega T/2)^2}{(1 - \sigma T/2)^2 + (\omega T/2)^2}$, which is less than $1$ exactly when $\sigma < 0$ and equal to $1$ when $\sigma = 0$. On the unit circle, $z = e^{j\omega_dT}$ gives $\frac{z - 1}{z + 1} = \frac{e^{j\omega_dT/2} - e^{-j\omega_dT/2}}{e^{j\omega_dT/2} + e^{-j\omega_dT/2}} = j\tan\frac{\omega_dT}{2}$, so the continuous controller is evaluated at $s = j\frac2T\tan\frac{\omega_dT}{2}$, which is [[#eq-warping]].
:::

::: example A digital lead compensator {#ex-tustin-lead}
Discretise the lead compensator $C(s) = 5.04\,(s/39 + 1)/(s/390 + 1)$ of [[control-systems/compensator-design#ex-lead-bode]] with Tustin's method at $T = 1\,\mathrm{ms}$, write its difference equation, and find the phase margin of the sampled loop.
::: solution
With $s = 2000\,(z - 1)/(z + 1)$:

$$
C(z) = 5.04\,\frac{\frac{2000}{39}(z - 1) + (z + 1)}{\frac{2000}{390}(z - 1) + (z + 1)} = 5.04\,\frac{52.28z - 50.28}{6.128z - 4.128} = \frac{43.00 - 41.35z^{-1}}{1 - 0.6736z^{-1}}.
$$

(Check: the DC gain $C(1) = 1.65/0.3264 = 5.04$.) The difference equation is

$$
u[k] = 0.6736\,u[k-1] + 43.00\,e[k] - 41.35\,e[k-1].
$$

Evaluating the ZOH-equivalent plant and $C(z)$ on the unit circle, the sampled loop crosses over at $122.7\,\mathrm{rad/s}$, as before, with a phase margin of $47.2^\circ$ instead of $50.6^\circ$: the loss is the hold's $\omega_cT/2 = 3.5^\circ$. If the output is applied one sample late, a further $\omega_cT = 7.0^\circ$ is lost and the margin falls to $40.2^\circ$. Warping is negligible here ($\omega_cT = 0.12$). A designer who knows the delay in advance designs the continuous compensator with $e^{-1.5sT}$ included in the plant, or adds a little extra lead.
:::
:::

::: warning Do not forget the hold when emulating
Emulation discretises the controller but the loop still contains the zero-order hold and any computational delay. A continuous design with $45^\circ$ of phase margin, discretised perfectly, has less than $45^\circ$ once sampled. Either include the delay $e^{-sT/2}$ (or $e^{-1.5sT}$) in the plant during design, or verify the final margins with the exact discrete model [[#eq-zoh-tf]]. The loss is negligible only when sampling is fast compared with crossover.
:::

### A digital PI controller in code

The PI current controller of [[control-systems/pid-control#ex-current-loop]] ($K_p = 6.28\,\mathrm{V/A}$, $K_i = 1.26\times10^4\,\mathrm{V/(A\,s)}$), discretised with a backward-Euler integrator at $T = 50\,\mathrm{\mu s}$, becomes a handful of lines executed in the PWM interrupt. The integrator gain per sample is $K_iT = 0.628\,\mathrm{V/A}$.

```c
/* PI current controller, called every 50 us from the PWM interrupt. */
#define KP      6.28f       /* V/A                    */
#define KI_T    0.628f      /* Ki * T, V/A per sample */
#define V_MAX   12.0f       /* bridge voltage limit   */

static float integ = 0.0f;  /* integrator state, V    */

float current_pi(float i_ref, float i_meas)
{
    float e = i_ref - i_meas;
    float v = KP * e + integ + KI_T * e;   /* unsaturated output */
    float u = v;
    if (u >  V_MAX) u =  V_MAX;
    if (u < -V_MAX) u = -V_MAX;
    if (u == v)                            /* clamp: integrate only   */
        integ += KI_T * e;                 /* when not saturated      */
    return u;                              /* written to PWM next period */
}
```

The anti-windup is the clamping rule of [[control-systems/pid-control#alg-antiwindup]]. On a processor without floating point the same code is written in fixed point (Q15 or Q31 formats, [[embedded-systems/embedded-programming#def-qformat]]), with care over the integrator, as the next section explains.

## Implementation effects

A discrete controller that is correct on paper can still misbehave in silicon.

**Quantisation of signals.** An ADC of $N$ bits over a range $V_{FS}$ resolves $V_{FS}/2^N$; the controller cannot correct errors smaller than this, and an integrator combined with a quantised measurement can settle into a small **limit cycle**, hunting between adjacent codes. Likewise a PWM with a counter of $M$ steps per period quantises the duty cycle to $1/M$. In digital power supplies the DPWM resolution must be finer than the ADC resolution referred to the output, or the output voltage limit-cycles.

**Quantisation of coefficients.** Sampling fast makes every pole $e^{pT}$ crowd towards $z = 1$, and the controller's coefficients become differences of nearly equal numbers. A lag pole at $1\,\mathrm{rad/s}$ sampled at $10\,\mathrm{kHz}$ lies at $z = 0.9999$, and in Q15 arithmetic (resolution $2^{-15} = 3.05\times10^{-5}$) it can only be represented to within a third of its distance from $1$. Remedies are higher precision for such coefficients, the "delta" form that works with $z - 1$ directly, or a lower sampling rate for slow loops (**multirate control**).

**Integrator resolution.** An integrator that adds $K_iTe[k]$ each sample loses every increment smaller than its resolution. With $K_iT$ small and $e$ small, the product may round to zero and integral action silently disappears. Keep the integrator accumulator in a wider format than the output (Q31, or $32$-bit integers with a scaling shift).

**Timing.** The theory assumes exact periodic sampling and a fixed delay. Jitter in the interrupt latency, or a computation time that varies with the code path, is equivalent to noise on the time axis. Sample from a hardware trigger synchronised to the PWM, compute in a fixed-length path, and update at a fixed point in the period.

::: application Digital control of switched-mode power supplies
Digital controllers for DC–DC converters sample the output voltage once per switching period, synchronised so that the switching ripple does not alias into the measurement (sampling at the same point of every period sees the same ripple value, a constant). Their compensators are Type III designs emulated with Tustin's method or designed directly in the $z$-plane, implemented as second- or third-order difference equations in hardware state machines rather than software, because a $1\,\mathrm{MHz}$ loop leaves only a microsecond per update. Peak current-mode control, an analog technique, has a sampled-data explanation: the inner current loop is a discrete system whose pole leaves the unit circle when the duty cycle exceeds $50\,\%$, which slope compensation prevents ([[power-electronics/converter-control]]).
:::

::: quiz
A loop crossing over at $500\,\mathrm{Hz}$ is sampled at $10\,\mathrm{kHz}$, and the controller output is applied one sample after the measurement. Approximately how much phase margin does sampling cost?
- [ ] $0.9^\circ$
- [ ] $9^\circ$
- [x] $27^\circ$
- [ ] $54^\circ$
::: solution
The effective delay is $1.5T = 150\,\mathrm{\mu s}$. At $\omega_c = 2\pi\times500 = 3142\,\mathrm{rad/s}$ the lag is $3142\times1.5\times10^{-4} = 0.471\,\mathrm{rad} = 27^\circ$: $9^\circ$ from the hold and $18^\circ$ from the computational delay. Sampling at only $20$ times the crossover frequency is expensive when the output is delayed a full period.
:::
:::

::: history
Sampled-data control began with radar tracking systems in the Second World War, where the antenna position was measured once per scan. Witold Hurewicz analysed such systems in the *Theory of Servomechanisms* volume of the MIT Radiation Laboratory series (1947) with what amounted to the $z$-transform. John Ragazzini and Lotfi Zadeh named and systematised it in "The analysis of sampled-data systems" (1952), and Eliahu Jury, Ragazzini's student at Columbia, developed the stability test and much of the theory in the 1950s. Direct digital control of industrial processes by computer began around 1962 (Imperial Chemical Industries' Ferranti Argus installation), and the microprocessor made digital control universal from the late 1970s.
:::

## Where this leads

Digital control closes the course: every loop designed in earlier chapters can now be built on a microcontroller. The discrete-time systems theory behind it is developed further in [[dsp/discrete-time-systems]] and the design of digital filters, which are controllers' cousins, in [[dsp/iir-filter-design]]. Real-time scheduling of control tasks is in [[embedded-systems/real-time-systems]], and the digital current and voltage loops of converters and drives in [[power-electronics/converter-control]]. Franklin, Powell and Workman's *Digital Control of Dynamic Systems* covers direct $z$-plane design, discrete observers and quantisation in depth.

::: summary
- A sampled loop has an ADC, a difference equation and a zero-order hold; the hold acts as a delay of $T/2$, and a one-sample computational delay adds $T$ more.
- Delay costs phase margin $\omega_c\times$ delay; sample at $10$–$30$ times the closed-loop bandwidth.
- The ZOH equivalent $x[k+1] = e^{AT}x[k] + \int_0^Te^{A\tau}\dd\tau\,Bu[k]$, or $G(z) = (1 - z^{-1})\mathcal Z\{G(s)/s\}$, is exact at the samples; poles map as $z = e^{pT}$.
- Discrete loops are stable when all closed-loop poles are inside the unit circle; for $z^2 + a_1z + a_0$, $\abs{a_0} < 1$ and $1 \pm a_1 + a_0 > 0$. Sampling makes stable gain ranges finite.
- Emulation replaces $s$ by an integration rule; Tustin preserves stability and warps frequencies as $\omega_a = \frac2T\tan\frac{\omega_dT}{2}$, corrected by prewarping.
- A controller becomes a difference equation of a few multiply–adds; include anti-windup and verify margins with the hold and delay included.
- Finite word length quantises signals, coefficients and integrator increments; poles crowd near $z = 1$ at fast sampling.
:::

## Exercises

::: exercise Mapping a pole {level=1 check="exp(-0.1)"}
A continuous pole at $s = -100 + 200j\,\mathrm{s^{-1}}$ is sampled with $T = 1\,\mathrm{ms}$. Find the magnitude of the corresponding $z$-plane pole.
::: solution
$z = e^{sT} = e^{-0.1}e^{j0.2}$: magnitude $0.905$, angle $0.2\,\mathrm{rad} = 11.5^\circ$.
:::
:::

::: exercise Phase of the hold {level=1 check="2*pi*500*1e-4/2*180/pi"}
A zero-order hold with $T = 0.1\,\mathrm{ms}$ is in a loop crossing over at $500\,\mathrm{Hz}$. How much phase (in degrees) does the hold contribute at crossover?
::: solution
$\omega_cT/2 = 2\pi\times500\times10^{-4}/2 = 0.157\,\mathrm{rad} = 9.0^\circ$ of lag.
:::
:::

::: exercise A discrete integrator {level=1}
Discretise the integrator $K/s$ with forward Euler, backward Euler and Tustin, and give each as a difference equation.
::: solution
Forward: $KT/(z - 1)$, $u[k] = u[k-1] + KTe[k-1]$. Backward: $KTz/(z - 1)$, $u[k] = u[k-1] + KTe[k]$. Tustin: $\frac{KT}{2}\frac{z + 1}{z - 1}$, $u[k] = u[k-1] + \frac{KT}{2}(e[k] + e[k-1])$.
:::
:::

::: exercise ZOH of a first-order plant {level=2}
Show that the ZOH equivalent of $G(s) = K/(\tau s + 1)$ is $G(z) = K(1 - a)/(z - a)$ with $a = e^{-T/\tau}$, and evaluate it for the heater $2/(50s + 1)$ sampled every $1\,\mathrm{s}$.
::: solution
In state form $\dot x = -x/\tau + (K/\tau)u$: $\Phi = e^{-T/\tau} = a$ and $\Gamma = \int_0^Te^{-\sigma/\tau}\dd\sigma\,K/\tau = K(1 - a)$. So $x[k+1] = ax[k] + K(1 - a)u[k]$, i.e. $G(z) = K(1 - a)/(z - a)$. For the heater, $a = e^{-0.02} = 0.9802$ and $G(z) = 0.0396/(z - 0.9802)$, with DC gain $2$.
:::
:::

::: exercise Jury test {level=2}
Is $z^2 - 1.2z + 0.5$ stable? Find its roots to confirm.
::: solution
$\abs{a_0} = 0.5 < 1$, $1 - 1.2 + 0.5 = 0.3 > 0$, $1 + 1.2 + 0.5 = 2.7 > 0$: stable. The roots are $0.6 \pm 0.37j$, of magnitude $\sqrt{0.5} = 0.707$.
:::
:::

::: exercise Prewarping a notch {level=2}
A notch filter at $2\,\mathrm{kHz}$ (to suppress a mechanical resonance) is designed in continuous time and discretised with Tustin's method at $10\,\mathrm{kHz}$ sampling. (a) Where does the notch land? (b) At what frequency should the continuous notch be designed so that the digital notch lands at $2\,\mathrm{kHz}$?
::: solution
(a) From [[#eq-warping]], $\omega_d = \frac2T\arctan\frac{\omega_aT}{2}$ with $\omega_aT/2 = 2\pi\times2000\times10^{-4}/2 = 0.628$: $\omega_d = 2\times10^4\times0.561 = 1.122\times10^4\,\mathrm{rad/s}$, i.e. $1786\,\mathrm{Hz}$ — $11\,\%$ low, enough to miss a sharp resonance. (b) Prewarp: $\omega_a = \frac2T\tan(0.628) = 1.453\times10^4\,\mathrm{rad/s}$, i.e. design the notch at $2313\,\mathrm{Hz}$.
:::
:::

::: exercise A deadbeat controller {level=2}
For the sampled current-loop plant $G(z) = 0.04758/(z - 0.9048)$ of [[#ex-zoh-rl]], a proportional controller $K$ gives the closed-loop pole $0.9048 - 0.04758K$. Find $K$ for a pole at $z = 0$ (deadbeat), the resulting response, and the steady-state error. Why is deadbeat control rarely used in power electronics?
::: solution
$K = 0.9048/0.04758 = 19.0\,\mathrm{V/A}$. The closed loop is $T(z) = 0.904/z$: the current reaches its final value in one sample, but that value is $0.904$ of the reference (proportional control of a type-0 plant), so a reference gain or integral action is needed. Deadbeat control demands the largest possible voltage on every step — here $19\,\mathrm{V}$ per ampere of error, beyond a $12\,\mathrm{V}$ bridge for any error above $0.6\,\mathrm{A}$ — and its performance depends on exact knowledge of $L$ and of the delay, so it saturates and becomes sensitive to parameter errors.
:::
:::

::: exercise Stable range of a sampled loop {level=3}
For the sampled servo of [[#ex-sampled-servo]], use the approximations $b_0 \approx 625T^2$ and $1 - e^{-63T} \approx 63T$, valid for small $T$, to show that the maximum stable gain is approximately $K_{a,max} \approx 0.1/T$ (with $T$ in seconds), and compare with the table.
::: solution
The binding condition is $a_0 = e^{-63T} + K_ab_0 < 1$, i.e. $K_a < (1 - e^{-63T})/b_0$. For small $T$, expanding $e^{-x} = 1 - x + x^2/2 - x^3/6$ with $x = 63T$: $1 - e^{-x} - xe^{-x} \approx x^2/2 - x^3/3$, so $b_0 \approx \frac{1250}{63^2}\cdot\frac{(63T)^2}{2} = 625T^2$ and $1 - e^{-63T} \approx 63T$. Hence $K_{a,max} \approx 63T/(625T^2) = 0.1008/T$. For $T = 1\,\mathrm{ms}$ this gives $101$ (table: $102$); for $5\,\mathrm{ms}$, $20.2$ (table: $21.3$); for $10\,\mathrm{ms}$, $10.1$ (table: $11.3$). The stable gain range shrinks in proportion to the sampling period, and becomes infinite only in the continuous limit.
:::
:::

::: exercise A vanishing integrator {level=3}
A slow temperature loop is sampled at $1\,\mathrm{kHz}$ with a PI controller whose integral gain is $K_i = 0.02\,\mathrm{s^{-1}}$ (in normalised units where errors and outputs are fractions of full scale). The integrator is stored in Q15 format. (a) What is the smallest error that changes the integrator at all? (b) What happens in practice, and how is it fixed?
::: solution
(a) Each sample adds $K_iTe = 2\times10^{-5}e$. Q15 resolves $2^{-15} = 3.05\times10^{-5}$; with rounding, an increment smaller than half of that, $1.53\times10^{-5}$, is lost, so the integrator changes only if $\abs e > 0.76$ — three-quarters of full scale. (b) For all practical errors the integrator never moves: the loop behaves as a proportional controller and settles with a steady-state error, though the design says it should not. The fix is a wider accumulator (Q31 resolves $4.7\times10^{-10}$), or running the integrator at a lower rate with a larger $K_iT$ per update.
:::
:::
