No single transistor stage does everything an amplifier must do. A common-source stage has gain but cannot drive a low-resistance load; a follower can drive the load but has no voltage gain; a common-gate stage has a low input resistance that would load most sources. The solution is to connect stages in series, each doing the job it is good at: an input stage chosen to suit the source, one or more gain stages, and an output stage chosen to suit the load. A typical operational amplifier has three such stages; a radio receiver chain may have a dozen.

Connecting stages is not just multiplication of gains, because each stage loads the one before it and is driven by the output resistance of the one before it. In this chapter we learn to account for that interaction with the amplifier models of [[electronics-1/small-signal-amplifiers]], to couple stages at DC, and then meet the two most important *compound* stages — combinations of two transistors that behave like a single, much better transistor: the **cascode**, which multiplies output resistance and gain, and the **Darlington pair**, which multiplies current gain. We end with the design of amplifier chains. The single-stage results of [[electronics-1/single-stage-amplifiers]] are used throughout.

## Cascading amplifier stages

Represent each stage $k$ by its voltage-amplifier model: input resistance $R_{\text{in},k}$, open-circuit gain $A_{vo,k}$ and output resistance $R_{\text{out},k}$ ([[electronics-1/small-signal-amplifiers#def-amp-model]]). Connect the output of stage $k$ to the input of stage $k+1$. Stage $k$ then sees the load $R_{\text{in},k+1}$, and stage $k+1$ is driven by a source of resistance $R_{\text{out},k}$.

::: theorem Gain of a cascade of unilateral stages {#thm-cascade}
For $n$ unilateral stages driven by a source with resistance $R_{\text{sig}}$ and loaded by $R_L$, with $R_{\text{out},0} = R_{\text{sig}}$ and $R_{\text{in},n+1} = R_L$,

$$
G_v = \frac{v_o}{v_{\text{sig}}} = \prod_{k=1}^{n}\left(\frac{R_{\text{in},k}}{R_{\text{out},k-1} + R_{\text{in},k}}\,A_{vo,k}\right)\cdot\frac{R_L}{R_{\text{out},n} + R_L}.
$$ {#eq-cascade}

Equivalently, the gain is the product of the **loaded** stage gains $A_k = v_{o,k}/v_{i,k}$ (each computed with the next stage's input resistance as its load) times the input divider $R_{\text{in},1}/(R_{\text{sig}} + R_{\text{in},1})$. In decibels the stage gains add.
:::

::: proof
At each interface the Thévenin equivalent of stage $k$'s output, $A_{vo,k}v_{i,k}$ in series with $R_{\text{out},k}$, drives $R_{\text{in},k+1}$, so $v_{i,k+1} = A_{vo,k}v_{i,k}\,R_{\text{in},k+1}/(R_{\text{out},k} + R_{\text{in},k+1})$. Because the stages are unilateral, $R_{\text{in},k+1}$ does not depend on what follows. Multiplying these relations for $k = 1,\dots,n$ and the input divider $v_{i,1} = v_{\text{sig}}R_{\text{in},1}/(R_{\text{sig}} + R_{\text{in},1})$ gives [[#eq-cascade]]. Regrouping the factors pairs each $A_{vo,k}$ with the divider at its output, which is the loaded gain.
:::

The theorem says that a good interface has $R_{\text{in},k+1} \gg R_{\text{out},k}$ for voltage signals. When this fails, the cascade gain can be far below the product of the open-circuit gains. Note also what "unilateral" excludes: if a stage's input resistance depends on its load, as for the emitter follower and the common-gate stage, we must work backwards from the load, computing each input resistance with the actual load attached. That is what we do in practice: **analyse from the output towards the input** for input resistances, and from the input towards the output for gains.

::: example A three-stage amplifier {#ex-three-stage}
A source with $R_{\text{sig}} = 100\,\mathrm{k\Omega}$ drives a CS stage ($g_{m1} = 2\,\mathrm{mS}$, $r_{o1} = 100\,\mathrm{k\Omega}$, $R_{D1} = 10\,\mathrm{k\Omega}$, gate bias resistance $1\,\mathrm{M\Omega}$), which drives a CE stage ($\beta = 100$, $I_{C2} = 0.5\,\mathrm{mA}$, $R_{C2} = 10\,\mathrm{k\Omega}$, bias resistors $R_{B2} = 50\,\mathrm{k\Omega}$, emitter bypassed), which drives an emitter follower ($I_{E3} = 5\,\mathrm{mA}$, $R_{E3} = 1\,\mathrm{k\Omega}$) into a $1\,\mathrm{k\Omega}$ load. All couplings are capacitive. Neglect $r_o$ of the BJTs. Find the overall gain.
::: solution
Work from the load backwards.

**Stage 3.** $r_{e3} = 26/5 = 5.2\,\Omega$; the emitter sees $R_L' = 1\,\mathrm{k\Omega}\parallel1\,\mathrm{k\Omega} = 500\,\Omega$. Input resistance $R_{\text{in}3} = 101\times(5.2 + 500) = 51.0\,\mathrm{k\Omega}$; gain from base to output $A_3 = 500/505.2 = 0.990$.

**Stage 2.** $g_{m2} = 0.5/26 = 19.2\,\mathrm{mS}$, $r_{\pi2} = 100/0.0192 = 5.2\,\mathrm{k\Omega}$, $R_{\text{in}2} = 50\parallel5.2 = 4.71\,\mathrm{k\Omega}$. Loaded gain $A_2 = -g_{m2}(R_{C2}\parallel R_{\text{in}3}) = -0.0192\times8.36\,\mathrm{k\Omega} = -160.8$.

**Stage 1.** Loaded gain $A_1 = -g_{m1}(r_{o1}\parallel R_{D1}\parallel R_{\text{in}2}) = -0.002\times(100\parallel10\parallel4.71)\,\mathrm{k\Omega} = -0.002\times3.10\,\mathrm{k\Omega} = -6.21$.

**Input.** $R_{\text{in}1} = 1\,\mathrm{M\Omega}$, so the input divider is $1000/1100 = 0.909$.

**Total.** $G_v = 0.909\times(-6.21)\times(-160.8)\times0.990 = 898\,\mathrm{V/V}$, or $59.1\,\mathrm{dB}$ (non-inverting, since there are two inverting stages). The open-circuit gains of the first two stages, $-18.2$ and $-192$, would multiply to about $3500$: loading at the CS–CE interface costs a factor of three, because the CE input resistance ($4.7\,\mathrm{k\Omega}$) is smaller than the CS output resistance ($9.1\,\mathrm{k\Omega}$). Without the follower, the $1\,\mathrm{k\Omega}$ load would appear directly in parallel with $R_{C2}$ and the second stage's gain would drop to about $-17$.
:::
:::

::: widget plot
f: A1*A2*x/(x + R1); A1*A2
x: 0, 50
y: 0, 4000
sliders: A1=18:5:50:1; A2=192:50:300:1; R1=9.1:1:20:0.1
labels: \lvert A_1A_2\rvert\ \text{loaded}; \lvert A_{vo1}A_{vo2}\rvert
caption: Two-stage gain against the input resistance of the second stage $R_{\text{in}2}$ (kΩ), for open-circuit gains $A_{vo1}$, $A_{vo2}$ and first-stage output resistance $R_{\text{out}1}$ (kΩ); the defaults approximate the first two stages of [[#ex-three-stage]]. The loaded gain reaches half the unloaded product when $R_{\text{in}2} = R_{\text{out}1}$ and approaches the product only when $R_{\text{in}2}$ is many times larger.
:::

::: quiz
You may place a source follower either between the two stages of a CS–CS cascade or after the second stage, which drives a $1\,\mathrm{k\Omega}$ load. Each CS stage has $R_{\text{out}} = 10\,\mathrm{k\Omega}$; the CS gate draws no current. Where does the follower help most?
- [ ] Between the stages, because the second CS stage loads the first.
- [x] After the second stage, because a gate is no load at all, while $1\,\mathrm{k\Omega}$ on a $10\,\mathrm{k\Omega}$ output loses a factor of eleven.
- [ ] It makes no difference where it goes.
- [ ] Before the first stage, because followers always go at the input.
::: solution
A MOSFET gate has infinite input resistance, so the CS–CS interface loses nothing and a follower there would only cost its own gain of slightly under one. At the output, the divider $1/(1 + 10)$ would cost $21\,\mathrm{dB}$; a follower with $R_{\text{out}} = 1/g_m$ of, say, $100\,\Omega$ reduces the loss to $0.8\,\mathrm{dB}$. Buffers belong where $R_{\text{in},k+1}$ is not much larger than $R_{\text{out},k}$ ([[#thm-cascade]]).
:::
:::

## Coupling between stages

In a discrete amplifier each stage can be biased independently and connected to the next through a **coupling capacitor**, which blocks DC and passes the signal. This is simple to design, but the capacitors set a lower cut-off frequency ([[electronics-1/amplifier-frequency-response]]), they cannot pass DC signals such as those from a thermocouple or a strain gauge, and capacitors large enough for audio frequencies (microfarads) cannot be built on a chip. Integrated amplifiers are therefore **direct-coupled**: the DC output of one stage is the DC input of the next, and the stages must be designed together.

Direct coupling creates a **level-shifting** problem. The output of a CS or CE stage sits several volts above the input of the next stage would like, and an NPN gain stage cannot be followed directly by another NPN gain stage without running out of supply voltage after a few stages. Solutions include followers (each shifts the level down by $V_{BE}$ or $V_{GS}$), complementary stages (an NPN stage followed by a PNP stage, which wants its input near the positive rail), Zener or diode level shifters, and the differential pairs of [[electronics-1/differential-amplifiers]], which reject the common DC level.

::: example A direct-coupled CE–follower pair {#ex-direct}
A CE stage's collector sits at $V_{C1} = 6.0\,\mathrm{V}$ on a $12\,\mathrm{V}$ supply and is connected directly to the base of an emitter follower, whose emitter resistor goes to ground. Find the DC output voltage and the emitter resistor for $I_{E2} = 2\,\mathrm{mA}$. What is the effect of the follower's base current on the first stage?
::: solution
The follower's emitter sits one $V_{BE}$ below its base: $V_O = 6.0 - 0.7 = 5.3\,\mathrm{V}$, so $R_{E2} = 5.3/2\,\mathrm{mA} = 2.65\,\mathrm{k\Omega}$ (use $2.7\,\mathrm{k\Omega}$). The follower draws $I_{B2} = 2\,\mathrm{mA}/101 \approx 20\,\mathrm{\mu A}$ from the first stage's collector node; if $R_{C1}$ is, say, $10\,\mathrm{k\Omega}$, this lowers $V_{C1}$ by $0.2\,\mathrm{V}$, which must be included in the bias design. The output carries a DC level of $5.3\,\mathrm{V}$; a capacitor or a further level shift is needed if the load must sit at $0\,\mathrm{V}$. Its temperature drift ($-2\,\mathrm{mV/K}$ from $V_{BE2}$, plus any drift of $V_{C1}$, passed on with unity gain) adds directly to the output: in direct-coupled amplifiers, DC drift is amplified just like signal.
:::
:::

::: warning DC drift is a signal too
In a direct-coupled amplifier, a change of a few millivolts in the bias of the first stage — from temperature, ageing or supply variation — is amplified by the full gain of the chain. With a gain of $1000$, a $2\,\mathrm{mV}$ drift of an input $V_{BE}$ moves the output by $2\,\mathrm{V}$ and may saturate it. This is why the first stage of a DC amplifier is almost always a differential pair, whose output depends on the *difference* of two matched $V_{BE}$ or $V_{GS}$ values, so that their common drift cancels ([[electronics-1/differential-amplifiers]]), and why overall negative feedback ([[electronics-2/feedback]]) is used to fix the operating point.
:::

## The cascode

The gain of a CS stage with an ideal current-source load is the intrinsic gain $g_mr_o$, which may be only $20$–$50$ in a modern process. To do better we need a higher output resistance. Recall from [[electronics-1/small-signal-amplifiers#exr-rout-degen]] that a resistance $R_S$ in the source multiplies the resistance seen into the drain by about $1 + g_mR_S$. The **cascode** uses a *second transistor* as that degeneration — and a transistor's $r_o$ is a large resistance that costs no DC voltage beyond what the transistor needs to stay in saturation.

In a MOSFET cascode, the input transistor $M_1$ is a CS stage with its source grounded and its gate driven by $v_i$. Its drain connects to the source of $M_2$, whose gate is held at a DC bias voltage $V_{\text{bias}}$ (a signal ground). The output is taken from the drain of $M_2$, which is loaded by a resistor or current source. $M_1$ is a CS stage, $M_2$ a CG stage: the cascode is a CS stage followed by a current buffer.

::: theorem Output resistance and gain of the cascode {#thm-cascode}
For a MOSFET cascode with small-signal parameters $g_{m1}, r_{o1}$ and $g_{m2}, r_{o2}$ (body effect neglected), the resistance looking into the drain of $M_2$ is

$$
R_{\text{out,casc}} = r_{o1} + r_{o2} + g_{m2}r_{o2}r_{o1} \approx g_{m2}r_{o2}\,r_{o1},
$$ {#eq-cascode-rout}

and with a load resistance $R_L$ at the output the voltage gain is approximately

$$
A_v \approx -g_{m1}\bigl(R_{\text{out,casc}}\parallel R_L\bigr).
$$ {#eq-cascode-gain}

With an ideal current-source load, $\abs{A_v} \approx g_{m1}r_{o1}\,g_{m2}r_{o2}$, the square of the intrinsic gain.
:::

::: proof
**Output resistance.** With $v_i = 0$, $M_1$ is just a resistance $r_{o1}$ from the source of $M_2$ to ground. The resistance seen into the drain of a transistor with source resistance $R_S = r_{o1}$ and grounded gate is, by the test-source calculation of [[electronics-1/small-signal-amplifiers#exr-rout-degen]], $R_S + r_{o2} + g_{m2}r_{o2}R_S$, which is [[#eq-cascode-rout]].

**Gain.** The output node sees $R_{\text{out,casc}}$ in parallel with $R_L$. The short-circuit output current — the current that $M_2$ delivers into an output held at signal ground — is almost exactly $g_{m1}v_i$: $M_1$ produces it, and $M_2$, whose source presents a resistance of only about $1/g_{m2}$ (much less than $r_{o1}$), passes almost all of it to the output. So the cascode is a transconductance $G_m \approx g_{m1}$ with output resistance $R_{\text{out,casc}}$, and $A_v = -G_m(R_{\text{out,casc}}\parallel R_L)$. A more exact calculation gives $G_m = g_{m1}\,\frac{1 + g_{m2}r_{o2}}{1 + g_{m2}r_{o2} + r_{o2}/r_{o1}}$, within a few per cent of $g_{m1}$.
:::

::: example What the cascode buys {#ex-cascode}
All transistors have $g_m = 2\,\mathrm{mS}$ and $r_o = 50\,\mathrm{k\Omega}$. Compare the gain of (a) a CS stage with an ideal current-source load, (b) a CS stage loaded by a simple transistor current source (output resistance $r_o$), (c) a cascode with the same simple load, (d) a cascode with an equally good cascode current-source load.
::: solution
The intrinsic gain is $g_mr_o = 100$, and by [[#eq-cascode-rout]] the cascode output resistance is $50 + 50 + 2\times50\times50\,\mathrm{k\Omega} = 5.1\,\mathrm{M\Omega}$.

(a) $A_v = -g_mr_o = -100$.

(b) $A_v = -g_m(r_o\parallel r_o) = -2\times10^{-3}\times25\,\mathrm{k\Omega} = -50$.

(c) $A_v = -g_m(5.1\,\mathrm{M\Omega}\parallel50\,\mathrm{k\Omega}) = -2\times10^{-3}\times49.5\,\mathrm{k\Omega} = -99$. The cascode's high output resistance is wasted on a load of only $50\,\mathrm{k\Omega}$.

(d) $A_v = -g_m(5.1\parallel5.1\,\mathrm{M\Omega}) = -2\times10^{-3}\times2.55\,\mathrm{M\Omega} = -5100$.

A cascode is worth having only if its load is also high-resistance. That is why **telescopic** and **folded-cascode** operational amplifiers use cascode current sources as loads ([[electronics-1/current-mirrors]], [[electronics-2/operational-amplifier-design]]).
:::
:::

::: widget plot
f: gm*1e-3/(10^(-x) + 1/(ro*1e3)); gm*1e-3/(10^(-x) + 1/(gm*1e-3*(ro*1e3)^2 + 2*ro*1e3))
x: 3, 8
y: 0, 6000
sliders: gm=2:0.5:5:0.1; ro=50:10:100:1
labels: \text{CS}; \text{cascode}
caption: Magnitude of the voltage gain against the load resistance, plotted as $\log_{10}(R_L/\Omega)$ from $1\,\mathrm{k\Omega}$ to $100\,\mathrm{M\Omega}$, for a CS stage and a cascode built from transistors with transconductance $g_m$ (mS) and output resistance $r_o$ (kΩ). For loads below $r_o$ the two are identical; the cascode's advantage appears only for loads in the megohm range, where the CS stage saturates at $g_mr_o$ and the cascode climbs towards $(g_mr_o)^2$.
:::

### Why else cascode?

The cascode has two further virtues. First, the drain of $M_1$ sits at the source of $M_2$, whose voltage barely moves (the gain from the input to that node is only about $-g_{m1}/g_{m2} \approx -1$). This eliminates the **Miller effect** that limits the bandwidth of a CS stage, as we shall see in [[electronics-1/amplifier-frequency-response]]; the cascode was in fact invented for this reason, for vacuum-tube radio receivers. Second, it isolates the output from the input, which improves reverse isolation in radio-frequency amplifiers.

Its cost is **headroom**: two transistors in series must both stay in saturation, so the output cannot swing below about $V_{OV1} + V_{OV2}$ above ground (with $V_{\text{bias}}$ set just high enough to keep $M_1$ saturated). On a $1\,\mathrm{V}$ supply that is a serious limitation, and low-voltage designs often use other gain-boosting techniques.

The BJT cascode works the same way, with one difference: looking into the collector of $Q_2$ the degenerating resistance is $r_{o1}\parallel r_{\pi2}$, not $r_{o1}$, because the base current of $Q_2$ provides another path. The output resistance becomes $r_{o2}\bigl[1 + g_{m2}(r_{o1}\parallel r_{\pi2})\bigr] \approx \beta r_{o2}$ when $r_{\pi2} \ll r_{o1}$: the BJT cascode's output resistance is limited to about $\beta r_o$, however many transistors are stacked.

::: quiz
Why does stacking a third transistor on a BJT cascode (a "triple cascode") not raise the output resistance much beyond $\beta r_o$?
- [ ] Because three transistors cannot all be in the active mode.
- [x] Because the base current of the top transistor returns to ground through its base bias, so its degenerating resistance is limited by $r_\pi$ whatever is stacked beneath it.
- [ ] Because $r_o$ of the top transistor is reduced by the extra transistors.
- [ ] It does: each extra transistor multiplies the output resistance by $g_mr_o$.
::: solution
The output resistance of the top transistor is about $r_o[1 + g_m(R_E\parallel r_\pi)]$, where $R_E$ is the resistance below its emitter. However large $R_E$ becomes, $R_E\parallel r_\pi < r_\pi$, so the multiplier is at most $1 + g_mr_\pi = 1 + \beta$. Physically, a fraction $1/\beta$ of the output current change leaks out through the base. MOSFETs, with no gate current, have no such limit.
:::
:::

## The Darlington pair

In a **Darlington pair** the emitter of $Q_1$ drives the base of $Q_2$, and the two collectors are joined. The combination has three terminals and behaves like a single BJT with a very large current gain.

::: proposition Darlington pair {#prop-darlington}
For a Darlington pair with current gains $\beta_1$, $\beta_2$, the composite current gain, the voltage between the composite base and emitter, and the composite input resistance are

$$
\beta_D = \beta_1\beta_2 + \beta_1 + \beta_2 \approx \beta_1\beta_2, \qquad V_{BE,D} = V_{BE1} + V_{BE2} \approx 1.4\,\mathrm{V}, \qquad r_{\pi,D} = r_{\pi1} + (\beta_1 + 1)r_{\pi2} \approx 2\beta_1r_{\pi2}.
$$ {#eq-darlington}

$Q_1$ runs at a bias current about $\beta_2$ times smaller than $Q_2$.
:::

::: proof
The base current $i_B$ of $Q_1$ gives $i_{E1} = (\beta_1 + 1)i_B$, which is the base current of $Q_2$, so $i_{C2} = \beta_2(\beta_1 + 1)i_B$. The composite collector current is $i_{C1} + i_{C2} = \beta_1i_B + \beta_2(\beta_1 + 1)i_B$, so $\beta_D = \beta_1 + \beta_2 + \beta_1\beta_2$. For the input resistance, $r_{\pi2}$ in the emitter of $Q_1$ is reflected into its base multiplied by $\beta_1 + 1$, and $r_{\pi1}$ adds in series. Since $I_{C1} \approx I_{C2}/\beta_2$, $r_{\pi1} = \beta_1V_T/I_{C1} \approx \beta_1\beta_2V_T/I_{C2} = \beta_1r_{\pi2}$, which gives the final approximation.
:::

The Darlington's main use is as an emitter follower with a very large input resistance or a very small reflected source resistance — in output stages, in power transistors sold as single Darlington packages with $\beta$ of $1000$ or more, and in sensor interfaces. Its drawbacks are the doubled $V_{BE}$, a saturation voltage of at least $V_{CE,\text{sat}} + V_{BE} \approx 0.9\,\mathrm{V}$ (because $Q_2$'s collector–emitter voltage cannot fall below $Q_1$'s $V_{CE}$ plus $Q_2$'s $V_{BE}$), and slow turn-off, since $Q_2$'s base charge can only leave through $Q_1$ (a resistor from $Q_2$'s base to the emitter helps). The **Sziklai** or complementary-feedback pair, an NPN driving a PNP, gives similar current gain with only one $V_{BE}$ drop.

::: example A Darlington follower into a loudspeaker {#ex-darlington}
A signal source with $R_{\text{sig}} = 10\,\mathrm{k\Omega}$ must drive an $8\,\Omega$ loudspeaker. Compare a single emitter follower biased at $10\,\mathrm{mA}$ ($\beta = 100$) with a Darlington follower with $Q_2$ at $10\,\mathrm{mA}$ ($\beta_1 = \beta_2 = 100$), each loaded only by the speaker. (A real output stage would be push–pull, but the resistance transformation is the point here.)
::: solution
**Single follower.** $r_e = 2.6\,\Omega$, so by [[electronics-1/single-stage-amplifiers#prop-ef]] $R_{\text{out}} = 2.6 + 10\,000/101 = 101.6\,\Omega$ and $G_v = 8/(8 + 101.6) = 0.073$.

**Darlington.** $r_{e2} = 2.6\,\Omega$; $Q_1$ carries $I_{E1} = 10/101 = 0.099\,\mathrm{mA}$, so $r_{e1} = 262.6\,\Omega$. Seen from the emitter of $Q_1$ the source resistance is $r_{e1} + 10\,000/101 = 361.6\,\Omega$, and seen from the emitter of $Q_2$ this is divided again by $101$:

$$
R_{\text{out}} = r_{e2} + \frac{r_{e1} + R_{\text{sig}}/101}{101} = 2.6 + \frac{361.6}{101} = 6.18\,\Omega,
$$

so $G_v = 8/(8 + 6.18) = 0.56$, almost eight times better. The input resistance is $101\bigl(262.6 + 101\times(2.6 + 8)\bigr) = 135\,\mathrm{k\Omega}$, compared with $101\times10.6\,\Omega = 1.07\,\mathrm{k\Omega}$ for the single follower.
:::
:::

## Designing amplifier chains

The examples suggest a general approach to designing a multistage amplifier from a specification of overall gain, source and load.

::: algorithm Planning a multistage amplifier {#alg-chain}
1. **Input stage** — match the source. High-resistance source: CS, source follower or degenerated CE (high $R_{\text{in}}$). Low-resistance source ($50\,\Omega$ cable): CG or CB, or a CE with emitter degeneration designed for the required $R_{\text{in}}$.
2. **Output stage** — match the load. Low-resistance load: emitter or source follower (Darlington if the preceding stage has high output resistance), sized for the required current swing. High-resistance load: the last gain stage can drive it directly.
3. **Gain stages** — supply the remaining gain. Allocate it so that no stage needs more than its configuration can give with margin (degenerated stages at $5$–$20$ each, cascodes or active loads for more), and insert a buffer wherever $R_{\text{in},k+1}$ would not be much larger than $R_{\text{out},k}$.
4. **Verify** with [[#thm-cascade]], working from the load backwards, and check the DC levels and swing limits of every stage.
:::

::: example A 20 dB buffer amplifier {#ex-chain-design}
Design a two-stage MOSFET amplifier with a gain of at least $10$ ($20\,\mathrm{dB}$) from a $50\,\mathrm{k\Omega}$ source to a $1\,\mathrm{k\Omega}$ load. The transistors can be biased at $V_{OV} = 0.4\,\mathrm{V}$; ignore $r_o$ and the body effect.
::: solution
**Topology.** The source resistance is high, so the input must have high $R_{\text{in}}$: a CS stage, which also provides the gain. The load is low, so the output is a source follower; the follower's gate draws no current, so it does not load the CS stage. With gate bias resistors of $1\,\mathrm{M\Omega}$, the input divider is $1000/1050 = 0.952$.

**Follower.** Choose its output resistance at most $100\,\Omega$, costing $1000/1100 = 0.909$ at the output: $g_{m2} \ge 10\,\mathrm{mS}$, so $I_{D2} = g_{m2}V_{OV}/2 = 2\,\mathrm{mA}$. This bias also allows a negative swing of about $2\,\mathrm{mA}\times(R_{S2}\parallel R_L)$ — with a $2\,\mathrm{k\Omega}$ source resistor, $1.3\,\mathrm{V}$ — enough for a $1\,\mathrm{V}$ peak output.

**Gain stage.** We need $\abs{A_1} \ge 10/(0.952\times0.909) = 11.6$. With $I_{D1} = 0.5\,\mathrm{mA}$, $g_{m1} = 2\times0.5/0.4 = 2.5\,\mathrm{mS}$, and $R_{D1} = 5.6\,\mathrm{k\Omega}$ gives $A_1 = -14$, leaving margin for transistor variation (or, for a gain independent of $g_m$, a degenerated stage with $R_{D1}/(R_{S1} + 1/g_{m1}) \approx 12$, e.g. $R_{S1} = 470\,\Omega$ with $R_{D1} = 10\,\mathrm{k\Omega}$ gives $11.5$ — slightly short — and with $R_{D1} = 11\,\mathrm{k\Omega}$ gives $12.6$).

**Verify.** $G_v = 0.952\times(-14)\times0.909 = -12.1$, that is $21.7\,\mathrm{dB}$, meeting the specification.
:::
:::

::: application Inside a classic operational amplifier
The venerable μA741 (1968), still a teaching example in 2026, is a three-stage design that follows [[#alg-chain]] exactly: an input differential stage of emitter followers driving common-base transistors (a CC–CB combination giving high input resistance and convenient level shifting), a high-gain CE stage with an active load preceded by an emitter follower (a Darlington-like CC–CE combination that keeps the first stage lightly loaded), and a push–pull emitter-follower output stage. Its open-loop gain of about $200\,000$ comes almost entirely from the first two stages; the output stage has a gain just below one.
:::

::: history
The cascode was introduced by Frederick Hunt and Roger Hickman in 1939, in a paper on vacuum-tube voltage regulators; the name is a contraction of "cascade to cathode". Its use to reduce input capacitance and noise in radio and radar receivers followed during the Second World War, and Henry Wallman and colleagues at the MIT Radiation Laboratory analysed the cascode amplifier in 1948. Sidney Darlington of Bell Labs filed his patent on compound transistors in 1952 (granted 1953); it covered two or three transistors on a single substrate, an early step towards integration. George Sziklai of RCA described the complementary pair in the 1950s.
:::

## Where this leads

The cascode reappears as the high-output-resistance current source of [[electronics-1/current-mirrors]] and as the bandwidth-saving stage of [[electronics-1/amplifier-frequency-response]]. Direct-coupled cascades with a differential input stage are the operational amplifiers of [[electronics-2/operational-amplifier-design]], whose output stages, including Darlington and Sziklai pairs in push–pull, are treated in [[electronics-2/output-stages]]. With many stages, the stability of an amplifier under feedback becomes the central issue ([[electronics-2/stability-compensation]]).

::: summary
- The gain of a cascade is the product of the loaded stage gains times the input and output dividers; in decibels the stage gains add.
- Loading matters: a stage with $R_{\text{in}}$ not much larger than the preceding $R_{\text{out}}$ costs gain. Compute input resistances from the load backwards.
- Direct coupling passes DC but requires level shifting and amplifies drift; capacitive coupling is simpler but sets a low-frequency limit.
- The cascode (CS + CG) has output resistance $\approx g_{m2}r_{o2}r_{o1}$ and, with a high-resistance load, gain up to $(g_mr_o)^2$; it also removes the Miller effect. It costs headroom, and the BJT version is limited to about $\beta r_o$.
- The Darlington pair has $\beta_D \approx \beta_1\beta_2$ and $V_{BE} \approx 1.4\,\mathrm{V}$; as a follower it divides the source resistance by about $\beta^2$.
- Plan a chain from both ends: input stage for the source, output stage for the load, gain stages in between, buffers where loading would hurt.
:::

## Exercises

::: exercise Gains in decibels {level=1 check="10^(45/20)"}
Three stages have loaded gains of $20\,\mathrm{dB}$, $26\,\mathrm{dB}$ and $-1\,\mathrm{dB}$. Find the overall voltage gain as a ratio.
::: solution
$20 + 26 - 1 = 45\,\mathrm{dB}$, i.e. $10^{45/20} = 178$.
:::
:::

::: exercise Darlington current gain {level=1 check="9800"}
A Darlington pair has $\beta_1 = 80$ and $\beta_2 = 120$. Find its exact composite current gain.
::: solution
$\beta_D = \beta_1\beta_2 + \beta_1 + \beta_2 = 9600 + 80 + 120 = 9800$.
:::
:::

::: exercise Cascode output resistance {level=1 check="1.02e7"}
Find the output resistance, in ohms, of a MOSFET cascode with $g_m = 1\,\mathrm{mS}$ and $r_o = 100\,\mathrm{k\Omega}$ for both transistors.
::: solution
By [[#eq-cascode-rout]], $R_{\text{out}} = 100 + 100 + 10^{-3}\times10^5\times10^5\times10^{-3}\,\mathrm{k\Omega} = 200\,\mathrm{k\Omega} + 10\,\mathrm{M\Omega} = 10.2\,\mathrm{M\Omega}$.
:::
:::

::: exercise Loading between two stages {level=2 check="-40*5/15*(-20)*2/4"}
Stage 1 has $A_{vo1} = -40$ and $R_{\text{out}1} = 10\,\mathrm{k\Omega}$ (its input is driven by an ideal source); stage 2 has $R_{\text{in}2} = 5\,\mathrm{k\Omega}$, $A_{vo2} = -20$ and $R_{\text{out}2} = 2\,\mathrm{k\Omega}$; the load is $2\,\mathrm{k\Omega}$. Find the overall gain.
::: solution
$G_v = (-40)\frac{5}{15}(-20)\frac{2}{4} = 133.3$. The unloaded product would be $800$; loading costs a factor of six.
:::
:::

::: exercise BJT cascode output resistance {level=2 check="1e5*(1+(1e-3/0.026)*(1/(1/1e5+1/2600)))"}
A BJT cascode has both transistors at $I_C = 1\,\mathrm{mA}$ with $\beta = 100$ and $r_o = 100\,\mathrm{k\Omega}$. Find its output resistance, in ohms, using $R_{\text{out}} = r_{o2}[1 + g_{m2}(r_{o1}\parallel r_{\pi2})]$, and compare with $\beta r_o$.
::: solution
$g_m = 38.5\,\mathrm{mS}$, $r_\pi = 2.6\,\mathrm{k\Omega}$, $r_{o1}\parallel r_{\pi2} = 2.53\,\mathrm{k\Omega}$, so $R_{\text{out}} = 100\,\mathrm{k\Omega}\times(1 + 97.5) = 9.85\,\mathrm{M\Omega}$, close to $\beta r_o = 10\,\mathrm{M\Omega}$.
:::
:::

::: exercise A level-shifting follower {level=2 check="2650"}
A CE stage's collector is at $6\,\mathrm{V}$ and drives the base of an emitter follower directly. What emitter resistor to ground, in ohms, gives a follower current of $2\,\mathrm{mA}$? Ignore the follower's base current.
::: solution
$V_E = 6 - 0.7 = 5.3\,\mathrm{V}$, so $R_E = 5.3/0.002 = 2650\,\Omega$.
:::
:::

::: exercise Darlington input resistance {level=2 check="101*2626 + 101*2626"}
In a Darlington pair with $\beta_1 = \beta_2 = 100$, $Q_2$ is biased at $I_{E2} = 1\,\mathrm{mA}$. Taking $V_T = 26\,\mathrm{mV}$, find the small-signal resistance $r_{\pi,D}$ looking into the composite base with the composite emitter grounded, in ohms.
::: solution
$Q_2$: $r_{e2} = 26\,\Omega$ and $r_{\pi2} = 101\times26 = 2626\,\Omega$. $Q_1$ carries $I_{E1} = 1\,\mathrm{mA}/101 = 9.90\,\mathrm{\mu A}$, so $r_{e1} = 2626\,\Omega$ and $r_{\pi1} = 101\times2626 = 265\,\mathrm{k\Omega}$. By [[#eq-darlington]], $r_{\pi,D} = r_{\pi1} + (\beta_1 + 1)r_{\pi2} = 265 + 265 = 530\,\mathrm{k\Omega}$, about $2\beta_1r_{\pi2}$ as predicted — two hundred times the $r_\pi$ of a single transistor at the same output current.
:::
:::

::: exercise Gain of a cascode, derived {level=3}
For a MOSFET cascode driving an ideal current-source load, show by writing node equations at the internal node $X$ (drain of $M_1$, source of $M_2$) and the output, with $v_i$ applied to the gate of $M_1$, that

$$
A_v = -g_{m1}r_{o1}\,(1 + g_{m2}r_{o2})\ \ (\text{exactly, body effect neglected}).
$$

Evaluate it for $g_m = 2\,\mathrm{mS}$, $r_o = 50\,\mathrm{k\Omega}$ and compare with $(g_mr_o)^2$.
::: hint
With an ideal current-source load, no signal current flows in the output branch, so the drain current of $M_2$ and therefore of $M_1$ is zero.
:::
::: solution
The load is an ideal current source, so the signal current through $M_2$ and $M_1$ is zero. For $M_1$: $0 = g_{m1}v_i + v_x/r_{o1}$, so $v_x = -g_{m1}r_{o1}v_i$. For $M_2$, with $v_{gs2} = -v_x$: $0 = g_{m2}(-v_x) + (v_o - v_x)/r_{o2}$, so $v_o = v_x(1 + g_{m2}r_{o2})$. Combining, $A_v = -g_{m1}r_{o1}(1 + g_{m2}r_{o2})$. With the numbers, $A_v = -100\times101 = -10\,100$, against $(g_mr_o)^2 = 10\,000$ and the estimate $-g_{m1}R_{\text{out}} = -10\,200$ of [[#ex-cascode]]: all within $1\,\%$.
:::
:::

::: exercise Ordering the stages {level=3 check="-20.83"}
A CE stage ($R_{\text{in}} = 2.6\,\mathrm{k\Omega}$, $A_{vo} = -150$, $R_{\text{out}} = 5\,\mathrm{k\Omega}$) and an emitter follower ($\beta = 100$, $r_e = 26\,\Omega$, no bias resistors) are to amplify a $50\,\mathrm{k\Omega}$ source into a $1\,\mathrm{k\Omega}$ load. Compute the overall gain for the order follower–CE and for CE–follower, and enter the larger in magnitude (with sign).
::: hint
For the follower, use $G = R_L'/(R_L' + r_e + R_{\text{s}}/(\beta+1))$ with $R_{\text{s}}$ the Thévenin resistance driving its base, which already includes its input divider.
:::
::: solution
**Follower first.** The follower is driven by $50\,\mathrm{k\Omega}$ and loaded by $2.6\,\mathrm{k\Omega}$: its gain from the source is $2600/(2600 + 26 + 50\,000/101) = 2600/3121 = 0.833$. The CE stage then gives $-150\times1/(1 + 5) = -25$ into the load. Total $-20.8$.

**CE first.** Input divider $2.6/52.6 = 0.0494$; the follower is driven by the CE stage's Thévenin equivalent ($-150v_i$ behind $5\,\mathrm{k\Omega}$) and gives $1000/(1000 + 26 + 5000/101) = 0.930$. Total $0.0494\times(-150)\times0.930 = -6.89$.

Putting the follower first wins by a factor of three, because the worst mismatch in the chain is at the input ($50\,\mathrm{k\Omega}$ into $2.6\,\mathrm{k\Omega}$), and the follower fixes it. Best of all would be followers at both ends.
:::
:::

::: exercise Designing for 60 dB {level=3}
Using MOSFET stages with $g_m = 2\,\mathrm{mS}$ (at the bias of your choice) and $r_o = 50\,\mathrm{k\Omega}$, and resistive loads of at most $20\,\mathrm{k\Omega}$, plan a direct-coupled amplifier with a gain of $1000$ from a $1\,\mathrm{M\Omega}$ source into a $2\,\mathrm{k\Omega}$ load. How many gain stages are needed, and where do followers go?
::: solution
A CS stage with $R_D = 20\,\mathrm{k\Omega}$ gives $\abs{A} = g_m(R_D\parallel r_o) = 2\times10^{-3}\times14.3\,\mathrm{k\Omega} = 28.6$ when it drives a gate, which draws no current. The output needs a follower, because $14.3\,\mathrm{k\Omega}$ driving $2\,\mathrm{k\Omega}$ would lose a factor of eight; biased for $g_m = 10\,\mathrm{mS}$, its $R_{\text{out}} = 100\,\Omega$ costs only $2/2.1 = 0.95$. Two gain stages then give $28.6^2\times0.95 = 777$, short of $1000$, so a third gain stage is needed; with three, the gain would be about $22\,000$, so the third (or each) stage is degenerated to bring the total to $1000$ — for example a third stage with gain $1.3$, or three equal stages of $10.2$ each, which is the better choice because degeneration also improves linearity and makes the gain predictable. The input is the first CS gate: with no bias resistors (direct coupling), the $1\,\mathrm{M\Omega}$ source costs nothing. Since each CS stage's DC output sits several volts above its input, the stages must alternate NMOS and PMOS or include level shifts, and the DC operating point of the whole chain should be stabilised by overall feedback.
:::
:::
