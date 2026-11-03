Look at the schematic of almost any analog integrated circuit — an operational amplifier, a comparator, a voltage regulator, the analog front end of a sensor chip — and you will find surprisingly few resistors and a great many transistors with their gates (or bases) tied together in rows. These rows are **current mirrors**: circuits that take one reference current and reproduce it, scaled by a ratio of transistor sizes, wherever it is needed. They set the bias of every stage on the chip, they serve as the high-resistance loads that give integrated amplifiers their gain, and they convert currents from one signal path into another.

There are good reasons for this style. On a chip, a resistor of $100\,\mathrm{k\Omega}$ occupies far more area than a transistor and has an absolute tolerance of perhaps $\pm20\,\%$, while two transistors placed side by side can be matched to a fraction of a per cent. A transistor in saturation is a current source with a very high incremental resistance $r_o$ but needs only a few hundred millivolts across it, whereas a resistor with the same incremental resistance would need a large voltage drop. This chapter develops the basic MOSFET and BJT mirrors from the models of [[electronics-1/mosfet-circuits]] and [[electronics-1/bjt-circuits]], analyses their errors, improves them with the cascode idea of [[electronics-1/multistage-amplifiers]], and uses them as active loads for the amplifiers of [[electronics-1/single-stage-amplifiers]].

## What makes a good current source

An ideal current source delivers a fixed current whatever the voltage across it. A real one is characterised by three numbers.

::: definition Characteristics of a current source {#def-current-source}
A practical **current source** (or sink) is described by
- its **output current** $I_O$ and its accuracy relative to the intended value;
- its **output resistance** $R_O = (\partial i_O/\partial v_O)^{-1}$, which models it, for small signals, as an ideal source in parallel with $R_O$;
- its **compliance** or **headroom**: the range of output voltage $v_O$ over which it behaves as a current source (for a transistor, the range in which it stays in saturation or in the active mode).
:::

A single MOSFET with a fixed $V_{GS}$ is already a current source: in saturation it delivers $\tfrac12k_nV_{OV}^2(1 + \lambda v_{DS})$, with output resistance $r_o$ and compliance $v_{DS} \ge V_{OV}$. The difficulty, as in [[electronics-1/mosfet-circuits]], is to produce the right $V_{GS}$ when $V_{th}$ and $k_n$ are not known accurately. The current mirror solves it with a second transistor that *measures* the right $V_{GS}$.

## The basic current mirror

Force a reference current $I_{\text{REF}}$ into the drain of a transistor $M_1$ whose gate is connected to its drain — a **diode-connected** transistor. Since $V_{GD} = 0$, $M_1$ is always in saturation, and its gate–source voltage settles at whatever value makes its drain current equal $I_{\text{REF}}$. Connect the gate of a second transistor $M_2$, with its source also grounded, to the same node. $M_2$ has the same $V_{GS}$ and, if it is in saturation and matched to $M_1$, the same current.

::: theorem The MOSFET current mirror {#thm-mos-mirror}
Let $M_1$ (diode-connected, carrying $I_{\text{REF}}$) and $M_2$ share $V_{GS}$, have the same $V_{th}$, $k_n'$ and $\lambda$, and aspect ratios $(W/L)_1$, $(W/L)_2$. If $M_2$ is in saturation, its drain current is

$$
I_O = I_{\text{REF}}\,\frac{(W/L)_2}{(W/L)_1}\,\frac{1 + \lambda V_{DS2}}{1 + \lambda V_{GS}},
$$ {#eq-mos-mirror}

the output resistance is $R_O = r_{o2} = 1/(\lambda I_O)$, and the compliance is $V_O \ge V_{OV} = V_{GS} - V_{th}$.
:::

::: proof
Both transistors are in saturation with the same $V_{GS}$, so by [[electronics-1/mosfet-circuits#thm-square-law]]

$$
\frac{I_O}{I_{\text{REF}}} = \frac{\tfrac12k_n'(W/L)_2V_{OV}^2(1 + \lambda V_{DS2})}{\tfrac12k_n'(W/L)_1V_{OV}^2(1 + \lambda V_{DS1})},
$$

and $V_{DS1} = V_{GS}$ because $M_1$ is diode-connected. The common factors $k_n'$ and $V_{OV}^2$ cancel — which is the whole point: the output current does not depend on $V_{th}$ or $k_n'$, only on the geometry. The output resistance follows from differentiating $I_O$ with respect to $V_{DS2}$, and the compliance is the saturation condition of $M_2$.
:::

The mirror copies the current *exactly* only if $V_{DS2} = V_{GS}$. Otherwise there is a **systematic error** of approximately $\lambda(V_{DS2} - V_{GS})$, which can be several per cent. In integrated circuits the ratio is set by using several identical **unit transistors** in parallel — two unit devices for $M_1$ and six for $M_2$ give a ratio of exactly $3$ — rather than by changing $W$, because unit devices match better, with their edges and stresses identical.

::: example Generating and mirroring a bias current {#ex-mirror}
In a process with $V_{th} = 0.5\,\mathrm{V}$ and $\lambda = 0.1\,\mathrm{V^{-1}}$, a diode-connected $M_1$ with $k_n = 2\,\mathrm{mA/V^2}$ is fed from $V_{DD} = 3.3\,\mathrm{V}$ through a resistor $R$. (a) Find $R$ for $I_{\text{REF}} = 100\,\mathrm{\mu A}$ (ignore $\lambda$ here). (b) $M_2$ has five times the aspect ratio of $M_1$. Find its current when $V_{DS2} = 1.5\,\mathrm{V}$, its output resistance and its compliance.
::: solution
(a) $V_{OV} = \sqrt{2I_{\text{REF}}/k_n} = \sqrt{2\times10^{-4}/(2\times10^{-3})} = 0.316\,\mathrm{V}$, so $V_{GS} = 0.816\,\mathrm{V}$ and $R = (3.3 - 0.816)/10^{-4} = 24.8\,\mathrm{k\Omega}$.

(b) By [[#eq-mos-mirror]],

$$
I_O = 100\,\mathrm{\mu A}\times5\times\frac{1 + 0.1\times1.5}{1 + 0.1\times0.816} = 500\times\frac{1.150}{1.0816} = 532\,\mathrm{\mu A},
$$

$6.3\,\%$ above the nominal $500\,\mathrm{\mu A}$. The output resistance is $r_{o2} = 1/(0.1\times0.53\,\mathrm{mA}) \approx 19\,\mathrm{k\Omega}$ (often quoted with the nominal current as $1/(\lambda I_O) = 20\,\mathrm{k\Omega}$), and the output must stay above $V_{OV} = 0.32\,\mathrm{V}$. Note that $R$ depends on $V_{th}$ and $k_n$ and on the supply, so $I_{\text{REF}}$ itself is only as accurate as the resistor and the supply; a mirror copies a current accurately but does not create an accurate one.
:::
:::

::: widget plot
f: if(x < Vov, (2x/Vov - (x/Vov)^2), 1)*(1 + lam*x)/(1 + lam*(Vov + 0.5)); 1
x: 0, 3
y: 0, 1.4
sliders: Vov=0.3:0.1:0.8:0.01; lam=0.1:0:0.3:0.01
labels: I_O/I_{\text{REF}}; \text{ideal}
caption: Output characteristic of a 1:1 MOSFET mirror, $I_O/I_{\text{REF}}$ against the output voltage $V_O$ (volts), with $V_{th} = 0.5\,\mathrm{V}$, overdrive $V_{OV}$ and channel-length modulation $\lambda$ (V⁻¹). Below $V_O = V_{OV}$ the output transistor is in triode and the current collapses; above it the current rises with slope $1/r_o$ and equals $I_{\text{REF}}$ only where $V_O = V_{GS}$. Increase $V_{OV}$: the compliance worsens. Increase $\lambda$ (shorter channel): the output resistance falls.
:::

### The BJT mirror

The bipolar version is identical in structure: $Q_1$ is diode-connected (base tied to collector), and $Q_2$ shares its $V_{BE}$. Because $I_C = I_Se^{V_{BE}/V_T}$ and $I_S$ is proportional to the emitter area, the current ratio is the area ratio. But now the base currents of both transistors must be supplied by the reference, which introduces an error proportional to $1/\beta$.

::: proposition The BJT current mirror {#prop-bjt-mirror}
For a BJT mirror with emitter-area ratio $m = A_{E2}/A_{E1}$, current gain $\beta$, and the Early effect neglected,

$$
I_O = \frac{m\,I_{\text{REF}}}{1 + (1 + m)/\beta}.
$$ {#eq-bjt-mirror}

For $m = 1$ the error is $2/\beta$. The output resistance is $r_{o2} = V_A/I_O$ and the compliance is $V_O \ge V_{CE,\text{sat}} \approx 0.2$–$0.3\,\mathrm{V}$.
:::

::: proof
Let $I_{C1} = I_C$; then $I_{C2} = mI_C$ because $Q_2$ has $m$ times the area at the same $V_{BE}$. KCL at the collector of $Q_1$: the reference current supplies $I_{C1}$ and both base currents, $I_{\text{REF}} = I_C + I_C/\beta + mI_C/\beta = I_C(1 + (1 + m)/\beta)$. Hence $I_O = mI_C = mI_{\text{REF}}/(1 + (1 + m)/\beta)$.
:::

The base-current error is reduced by the **β-helper**: insert an emitter follower $Q_3$ whose base is at the collector of $Q_1$ and whose emitter drives the joined bases. The reference now supplies only $Q_3$'s base current, $(1 + m)I_C/[\beta(\beta + 1)]$, and the error for $m = 1$ falls to about $2/\beta^2$ — from $2\,\%$ to $0.02\,\%$ for $\beta = 100$. The price is one extra $V_{BE}$ of input voltage.

::: quiz
A 1:1 BJT mirror with $\beta = 50$ drives, from the same reference transistor, four identical output transistors. What is each output current as a fraction of $I_{\text{REF}}$?
- [ ] $0.96$
- [x] $0.909$
- [ ] $0.98$
- [ ] $1$, since all transistors are identical
::: solution
Five transistors share the base node, so the reference supplies $I_C$ plus five base currents: $I_{\text{REF}} = I_C(1 + 5/50) = 1.1I_C$, and each output is $I_C = I_{\text{REF}}/1.1 = 0.909I_{\text{REF}}$. Fanning out a BJT mirror to many outputs makes the base-current error worse, which is why the β-helper is common in multi-output bias networks.
:::
:::

### Random mismatch

Even with $V_{DS2} = V_{GS}$, two nominally identical transistors are never exactly equal. Their thresholds differ by a random $\Delta V_{th}$ and their $k_n$ by a random fraction $\Delta k/k$, both scaling inversely with the square root of the gate area (Pelgrom's law). For a MOSFET mirror, differentiating $I = \tfrac12kV_{OV}^2$ at fixed $V_{GS}$ gives

$$
\frac{\Delta I_O}{I_O} = \frac{\Delta k}{k} - \frac{2\,\Delta V_{th}}{V_{OV}}.
$$ {#eq-mismatch}

The threshold term is usually dominant, and it is inversely proportional to the overdrive. A $5\,\mathrm{mV}$ threshold mismatch gives a $5\,\%$ current error at $V_{OV} = 0.2\,\mathrm{V}$ but only $2\,\%$ at $V_{OV} = 0.5\,\mathrm{V}$. Mirror transistors are therefore biased at *larger* overdrive than amplifying transistors — exactly the opposite of what gives the most $g_m$ per unit current — and made large in area. For BJTs, the mismatch of $V_{BE}$ is typically well below a millivolt and produces $\Delta I/I = \Delta V_{BE}/V_T$; bipolar mirrors match better, which is one reason precision analog circuits still use them.

## Improved current mirrors

The basic mirror's output resistance, $r_o$, may be only tens of kilohms in a short-channel process, and its systematic error depends on $V_{DS2}$. Both problems are cured by holding the drain of $M_2$ at a fixed voltage — that is, by cascoding it.

### The cascode mirror

Stack a cascode transistor $M_4$ on top of $M_2$, and generate its gate voltage with a second diode-connected transistor $M_3$ stacked on $M_1$ in the reference branch. Then the drain of $M_2$ sits at $V_{GS1} + V_{GS3} - V_{GS4} = V_{GS1}$ (if $M_3$ and $M_4$ match), exactly equal to $V_{DS1}$, so the systematic $\lambda$ error disappears, and the output resistance is that of a cascode ([[electronics-1/multistage-amplifiers#thm-cascode]]):

$$
R_O \approx g_{m4}r_{o4}\,r_{o2}.
$$ {#eq-cascode-mirror}

The cost is compliance. The output transistor $M_4$ has its gate at $2V_{GS} = 2V_{th} + 2V_{OV}$ and stays in saturation only for $V_O \ge V_{G4} - V_{th} = V_{th} + 2V_{OV}$. With $V_{th} = 0.5\,\mathrm{V}$ and $V_{OV} = 0.2\,\mathrm{V}$ that is $0.9\,\mathrm{V}$, compared with $0.2\,\mathrm{V}$ for the basic mirror — a serious loss on a $1.2\,\mathrm{V}$ supply. Generating the cascode gate voltage separately, at $V_{th} + 2V_{OV}$ instead of $2V_{th} + 2V_{OV}$, recovers $V_{th}$ of headroom; this **low-voltage** or **wide-swing** cascode mirror, with minimum output voltage $2V_{OV}$, is the standard in modern CMOS.

### The Wilson mirror

The **Wilson mirror** uses feedback instead. In the BJT version, the reference current flows into a node that joins the collector of $Q_1$ to the base of the output transistor $Q_3$. The emitter of $Q_3$ feeds a diode-connected $Q_2$, which shares its base with $Q_1$, and the output is the collector of $Q_3$. If the output current tries to rise, the current in $Q_2$ rises, so does the mirrored current in $Q_1$, and $Q_1$ pulls down the base of $Q_3$, opposing the change. The result, derived in [[#exr-wilson]], is a base-current error of only about $2/\beta^2$ and an output resistance of about $\beta r_o/2$. MOSFET Wilson mirrors are used too, usually with a fourth transistor to equalise drain voltages.

### The Widlar current source

Sometimes we need a *small* current — a few microamperes — and a basic mirror would need a large resistor to generate it. Bob Widlar's solution is to put a resistor $R_E$ in the emitter of the output transistor of a BJT mirror.

::: theorem The Widlar current source {#thm-widlar}
In a Widlar source (matched BJTs, $\beta \gg 1$), with reference current $I_{\text{REF}}$ in the diode-connected $Q_1$ and a resistor $R_E$ in the emitter of $Q_2$, the output current $I_O$ satisfies

$$
I_OR_E = V_T\ln\frac{I_{\text{REF}}}{I_O}.
$$ {#eq-widlar}

Its output resistance is approximately $r_{o2}\bigl[1 + g_{m2}(R_E\parallel r_{\pi2})\bigr]$.
:::

::: proof
The two bases are joined and $Q_1$'s emitter is grounded, so KVL around the base–emitter loop gives $V_{BE1} = V_{BE2} + I_OR_E$ (taking $I_{E2} \approx I_O$). With $V_{BE} = V_T\ln(I_C/I_S)$ for each transistor, $V_{BE1} - V_{BE2} = V_T\ln(I_{\text{REF}}/I_O)$. The output resistance is that of a BJT with emitter degeneration, as in the BJT cascode of [[electronics-1/multistage-amplifiers]].
:::

The equation is transcendental in $I_O$, but the design problem — given $I_{\text{REF}}$ and $I_O$, find $R_E$ — is explicit.

::: example Designing a Widlar source {#ex-widlar}
From a $5\,\mathrm{V}$ supply, produce $I_O = 10\,\mathrm{\mu A}$ using a Widlar source with $I_{\text{REF}} = 1\,\mathrm{mA}$. Compare the total resistance with that of a basic mirror. Find the output resistance for $\beta = 100$ and $V_A = 100\,\mathrm{V}$.
::: solution
By [[#eq-widlar]], $R_E = (V_T/I_O)\ln(I_{\text{REF}}/I_O) = (0.026/10^{-5})\ln100 = 2600\times4.605 = 11.97\,\mathrm{k\Omega}$. The reference resistor is $(5 - 0.7)/1\,\mathrm{mA} = 4.3\,\mathrm{k\Omega}$, for a total of about $16.3\,\mathrm{k\Omega}$. A basic mirror at $10\,\mathrm{\mu A}$ would need $(5 - 0.7)/10\,\mathrm{\mu A} = 430\,\mathrm{k\Omega}$ — over twenty-five times the resistor area.

At $10\,\mathrm{\mu A}$: $g_{m2} = 0.385\,\mathrm{mS}$, $r_{\pi2} = 260\,\mathrm{k\Omega}$, $r_{o2} = 10\,\mathrm{M\Omega}$. Then $R_E\parallel r_{\pi2} = 11.4\,\mathrm{k\Omega}$ and $R_O = 10\,\mathrm{M\Omega}\times(1 + 0.385\times11.4) = 54\,\mathrm{M\Omega}$. The emitter resistor also improves the output resistance five-fold.
:::
:::

::: widget plot
f: 1000*0.026*ln(Iref/x)/x
x: 1, 100
y: 0, 60
sliders: Iref=1000:200:5000:10
labels: R_E\ (\mathrm{k\Omega})
caption: Widlar source: the emitter resistor $R_E$ (kΩ) needed for an output current $I_O$ (μA, horizontal axis) from a reference $I_{\text{REF}}$ (μA, slider). Read the graph backwards to find $I_O$ for a given $R_E$. The required resistance grows roughly as $1/I_O$, but much more slowly than the $V_{CC}/I_O$ a plain resistor would need; and $I_O$ depends only logarithmically on $I_{\text{REF}}$, so the source also rejects supply variations well.
:::

::: warning Mirrors need headroom and a start
A mirror is a current source only while its output transistor is saturated (MOSFET) or active (BJT). Connected to a node that rises too close to the rail, or falls below the compliance voltage, it silently becomes a resistor and the circuit's bias collapses. Simulate or calculate the voltage at every mirror output over the full signal swing. A second trap is that some self-biased reference circuits (for example supply-independent references in which two mirrors feed each other) have two stable states, one with zero current; they need a **start-up circuit** to leave it.
:::

## Current sources as active loads

The gain of a CS stage with a resistive load is $-g_mR_D = -2V_{R_D}/V_{OV}$ ([[electronics-1/mosfet-circuits#eq-cs-gain]]): high gain needs a large DC drop across $R_D$. Replace $R_D$ by a PMOS current source — a PMOS mirror output — and the DC drop needed is only the source's compliance, while its incremental resistance $r_{op}$ is large. The **active load** makes the gain

$$
A_v = -g_{m1}(r_{o1}\parallel r_{o2}),
$$ {#eq-active-load}

half the intrinsic gain if the two output resistances are equal.

::: example An actively loaded CS stage {#ex-active-load}
An NMOS CS stage biased at $I_D = 100\,\mathrm{\mu A}$ with $V_{OV} = 0.2\,\mathrm{V}$ is loaded by a PMOS mirror; both transistors have $\lambda = 0.1\,\mathrm{V^{-1}}$. Find the gain, and the resistor and DC drop that would give the same gain with a resistive load.
::: solution
$g_{m1} = 2\times0.1/0.2 = 1\,\mathrm{mS}$ and $r_{o1} = r_{o2} = 1/(0.1\times10^{-4}) = 100\,\mathrm{k\Omega}$. By [[#eq-active-load]], $A_v = -10^{-3}\times50\,\mathrm{k\Omega} = -50$. A resistive load would need $R_D\parallel r_{o1} = 50\,\mathrm{k\Omega}$, i.e. $R_D = 100\,\mathrm{k\Omega}$, with a DC drop of $100\,\mathrm{\mu A}\times100\,\mathrm{k\Omega} = 10\,\mathrm{V}$ — impossible on a $1.8\,\mathrm{V}$ supply. The active load gives the same gain with perhaps $0.3\,\mathrm{V}$ across it.
:::
:::

The catch is that the output DC voltage of an actively loaded stage is undefined at the level of our simple model: it is the voltage at which the NMOS current (set by $V_{GS1}$) exactly equals the PMOS current (set by its mirror), and since both are almost flat, a tiny mismatch moves the output from one rail to the other. In practice an actively loaded stage is always placed inside a feedback loop, or used differentially with common-mode feedback, which sets its DC level ([[electronics-1/differential-amplifiers]], [[electronics-2/operational-amplifier-design]]).

::: quiz
In [[#ex-active-load]] the PMOS mirror is replaced by a PMOS cascode current source with output resistance $5\,\mathrm{M\Omega}$. What is the new gain approximately?
- [ ] $-5000$
- [x] $-98$
- [ ] $-50$
- [ ] $-2500$
::: solution
The output node now sees $r_{o1}\parallel5\,\mathrm{M\Omega} = 100\parallel5000\,\mathrm{k\Omega} = 98\,\mathrm{k\Omega}$, so $A_v = -1\,\mathrm{mS}\times98\,\mathrm{k\Omega} = -98$. The gain is limited by the smaller of the two resistances at the output, now $r_{o1}$. To approach $-2500$ both the amplifying transistor and the load must be cascoded, as in [[electronics-1/multistage-amplifiers#ex-cascode]].
:::
:::

## Biasing an integrated circuit

A chip typically has one **master reference**, a current set by a resistor (often off-chip for accuracy), by a bandgap voltage across a resistor, or by a supply-independent self-biased loop. From it, a network of NMOS and PMOS mirrors distributes scaled copies to every stage: NMOS mirrors **sink** current from nodes, PMOS mirrors **source** current into them, and a PMOS mirror driven by an NMOS mirror output converts a sink into a source. Because each mirror ratio is a ratio of unit-transistor counts, the whole bias network scales with the master current. Many designs deliberately make the master current proportional to absolute temperature (PTAT), so that $g_m = I_C/V_T$ of the bipolar transistors stays constant with temperature, or use a **constant-$g_m$** bias circuit in CMOS that makes $g_m$ proportional to the conductance of a resistor.

::: example Planning a bias network {#ex-bias-network}
A chip has a master reference current of $10\,\mathrm{\mu A}$ flowing into a diode-connected NMOS unit transistor $M_R$. Using only NMOS and PMOS mirrors made of unit transistors, provide (a) a $40\,\mathrm{\mu A}$ sink for the tail of a differential pair, (b) a $20\,\mathrm{\mu A}$ source for a level shifter, and (c) a $100\,\mathrm{\mu A}$ source for an output stage. Specify the number of units in each transistor and the total supply current of the bias network.
::: solution
(a) An NMOS output transistor sharing the gate of $M_R$ with **4 units** sinks $40\,\mathrm{\mu A}$.

(b), (c) Sources must be PMOS. Make an NMOS output of **2 units**, sinking $20\,\mathrm{\mu A}$ from a diode-connected PMOS $M_P$ of **1 unit** (PMOS units are sized separately, for example wider to give a similar overdrive). PMOS outputs sharing the gate of $M_P$ then source $20\,\mathrm{\mu A}$ with **1 unit** and $100\,\mathrm{\mu A}$ with **5 units**.

**Supply current.** The useful currents total $40 + 20 + 100 = 160\,\mathrm{\mu A}$; the overhead is the reference itself ($10\,\mathrm{\mu A}$) and the $20\,\mathrm{\mu A}$ in the NMOS–PMOS link, $30\,\mathrm{\mu A}$ in all, so $190\,\mathrm{\mu A}$ flows from the supply. A smaller link current (one NMOS unit and a PMOS diode of one unit giving $10\,\mathrm{\mu A}$, with PMOS outputs of 2 and 10 units) would save $10\,\mathrm{\mu A}$ at the cost of a larger mirror ratio, which amplifies the mismatch and noise of the diode transistor. Each output is accurate only to the extent that its $V_{DS}$ is close to that of its diode transistor; where it is not, cascoded outputs are used.
:::
:::

::: application Current-steering DACs
A current mirror with many binary-weighted outputs — $1$, $2$, $4$, …, $2^{N-1}$ unit transistors — and a switch on each output that steers its current either to the output or to a dummy node is a **current-steering digital-to-analogue converter**. Its linearity is set by the mismatch of [[#eq-mismatch]], which is why the unit transistors are large, biased at high overdrive and laid out in common-centroid arrays. As of 2026 such DACs reach 14–16 bits at sampling rates of several gigasamples per second and are the standard transmit DACs in wireless base stations ([[electronics-2/data-converters]]).
:::

::: history
The current mirror appeared with the earliest monolithic analog circuits. Bob Widlar used diode-connected transistors and the emitter-degenerated source that bears his name in Fairchild's μA702 and μA709 operational amplifiers of 1964–1965, and described the technique in a 1965 paper on design methods for monolithic operational amplifiers. George Wilson, at Tektronix, published his three-transistor mirror in 1968. The importance of mismatch for analog CMOS was quantified by Marcel Pelgrom and colleagues at Philips in their 1989 paper, which showed that the standard deviation of the threshold difference between two transistors scales as one over the square root of the gate area.
:::

## Where this leads

Mirrors are everywhere in the rest of electronics. The differential pair of [[electronics-1/differential-amplifiers]] is biased by a mirror tail current and uses a mirror as an active load that converts its differential output into a single-ended one. The folded-cascode and two-stage operational amplifiers of [[electronics-2/operational-amplifier-design]] are built from mirrors, cascodes and differential pairs and little else. Current-steering DACs, bandgap references and the bias networks of every analog chip ([[electronics-2/data-converters]]) are mirror circuits; and the noise of mirror transistors is often a large part of an amplifier's noise ([[electronics-2/electronic-noise]]).

::: summary
- A current source is characterised by its current, its output resistance and its compliance (the voltage range over which it works).
- The basic MOSFET mirror copies a reference current scaled by $(W/L)_2/(W/L)_1$, independently of $V_{th}$ and $k_n'$; it has output resistance $r_o$, compliance $V_{OV}$, and a systematic error $\approx\lambda(V_{DS2} - V_{GS})$.
- The BJT mirror scales by the emitter-area ratio $m$ with a base-current error $(1 + m)/\beta$, reduced to about $2/\beta^2$ by a β-helper or a Wilson mirror.
- Random mismatch gives $\Delta I/I \approx \Delta k/k - 2\Delta V_{th}/V_{OV}$, so mirrors use large devices at large overdrive.
- Cascode mirrors raise the output resistance to $\approx g_mr_o^2$ at the cost of compliance ($V_{th} + 2V_{OV}$, or $2V_{OV}$ in the wide-swing version).
- The Widlar source, $I_OR_E = V_T\ln(I_{\text{REF}}/I_O)$, makes small currents with small resistors.
- A current-source (active) load gives a CS stage the gain $-g_m(r_{o1}\parallel r_{o2})$ without a large DC drop, but its output DC level must be set by feedback.
:::

## Exercises

::: exercise A scaled mirror {level=1 check="8e-5"}
An NMOS mirror has $(W/L)_2 = 4(W/L)_1$ and $I_{\text{REF}} = 20\,\mathrm{\mu A}$. Ignoring channel-length modulation, find $I_O$ in amperes.
::: solution
$I_O = 4\times20 = 80\,\mathrm{\mu A}$.
:::
:::

::: exercise Base-current error {level=1 check="1/(1+2/50)"}
A 1:1 BJT mirror has $\beta = 50$. Find $I_O/I_{\text{REF}}$.
::: solution
By [[#eq-bjt-mirror]] with $m = 1$, $I_O/I_{\text{REF}} = 1/(1 + 2/50) = 0.962$.
:::
:::

::: exercise Output resistance {level=1 check="250e3"}
A BJT mirror output transistor with $V_A = 50\,\mathrm{V}$ carries $0.2\,\mathrm{mA}$. Find its output resistance in ohms.
::: solution
$R_O = r_o = V_A/I_O = 50/0.2\times10^{-3} = 250\,\mathrm{k\Omega}$.
:::
:::

::: exercise Sizing the reference resistor {level=2 check="(1.8-0.6-sqrt(0.1))/50e-6"}
A diode-connected NMOS with $k_n = 1\,\mathrm{mA/V^2}$ and $V_{th} = 0.6\,\mathrm{V}$ is fed from $V_{DD} = 1.8\,\mathrm{V}$ through $R$. Find $R$, in ohms, for $I_{\text{REF}} = 50\,\mathrm{\mu A}$.
::: solution
$V_{OV} = \sqrt{2\times50\times10^{-6}/10^{-3}} = 0.316\,\mathrm{V}$, $V_{GS} = 0.916\,\mathrm{V}$, $R = (1.8 - 0.916)/50\,\mathrm{\mu A} = 17.7\,\mathrm{k\Omega}$.
:::
:::

::: exercise Analysing a Widlar source {level=2 check="1.7448e-5"}
A Widlar source has $I_{\text{REF}} = 0.5\,\mathrm{mA}$ and $R_E = 5\,\mathrm{k\Omega}$. Find $I_O$ in amperes by iteration ($V_T = 26\,\mathrm{mV}$).
::: hint
Iterate $I_O \leftarrow (V_T/R_E)\ln(I_{\text{REF}}/I_O)$, starting from $10\,\mathrm{\mu A}$.
:::
::: solution
Starting from $10\,\mathrm{\mu A}$: $I_O = (0.026/5000)\ln50 = 20.3\,\mathrm{\mu A}$; then $(5.2\,\mathrm{\mu A})\ln(24.6) = 16.7\,\mathrm{\mu A}$; then $17.7$, $17.4$, $17.45\,\mathrm{\mu A}$, converging on $I_O = 17.4\,\mathrm{\mu A}$ (check: $17.45\,\mathrm{\mu A}\times5\,\mathrm{k\Omega} = 87.2\,\mathrm{mV} = 0.026\ln(500/17.45)$). The iteration converges because the logarithm changes slowly; Newton's method would converge faster.
:::
:::

::: exercise Gain with an active load {level=2 check="-2e-3*(50e3*40e3/90e3)"}
A CS stage with $g_m = 2\,\mathrm{mS}$ and $r_{on} = 50\,\mathrm{k\Omega}$ is loaded by a PMOS current source with $r_{op} = 40\,\mathrm{k\Omega}$. Find the voltage gain.
::: solution
$A_v = -g_m(r_{on}\parallel r_{op}) = -2\times10^{-3}\times22.2\,\mathrm{k\Omega} = -44.4$.
:::
:::

::: exercise A multi-output BJT mirror {level=2 check="1e-3/1.05"}
A BJT reference transistor ($I_{\text{REF}} = 1\,\mathrm{mA}$, $\beta = 100$) drives four identical output transistors, all 1:1, without a β-helper. Find each output current in amperes. What would it be with a β-helper?
::: solution
Five base currents: $I_{\text{REF}} = I_C(1 + 5/100)$, so $I_O = 1/1.05 = 0.952\,\mathrm{mA}$. With a β-helper, the reference supplies only $5I_C/(\beta(\beta + 1))$: $I_O = 1/(1 + 5/10\,100) = 0.9995\,\mathrm{mA}$.
:::
:::

::: exercise Output resistance and compliance of the cascode mirror {level=3}
For the cascode mirror, show that the output resistance is $r_{o2} + r_{o4} + g_{m4}r_{o4}r_{o2}$ and that the minimum output voltage is $V_{th} + 2V_{OV}$ when $M_3$ and $M_4$ are matched to $M_1$ and $M_2$. Evaluate both for $g_m = 1\,\mathrm{mS}$, $r_o = 100\,\mathrm{k\Omega}$, $V_{th} = 0.5\,\mathrm{V}$ and $V_{OV} = 0.2\,\mathrm{V}$.
::: solution
For small signals the gates of $M_2$ and $M_4$ are at fixed voltages (they are driven only by the reference branch), so the output looks into the drain of $M_4$ with $r_{o2}$ in its source: by the degeneration result of [[electronics-1/small-signal-amplifiers#exr-rout-degen]], $R_O = r_{o2} + r_{o4} + g_{m4}r_{o4}r_{o2}$. Numerically $R_O = 100 + 100 + 10^{-3}\times10^{5}\times10^{5}\,\Omega = 10.2\,\mathrm{M\Omega}$. For the compliance, the gate of $M_4$ is at $V_{GS1} + V_{GS3} = 2(V_{th} + V_{OV})$; $M_4$ is saturated when $V_O \ge V_{G4} - V_{th} = V_{th} + 2V_{OV} = 0.9\,\mathrm{V}$. (Its source sits at $V_{G4} - V_{GS4} = V_{th} + V_{OV}$, which also keeps $M_2$ saturated with a margin of $V_{th}$, the headroom wasted in this simple version.)
:::
:::

::: exercise Mismatch {level=3 check="0.02 + 2*0.003/0.25"}
Two mirror transistors biased at $V_{OV} = 0.25\,\mathrm{V}$ have a $2\,\%$ mismatch in $k_n$ and a $3\,\mathrm{mV}$ mismatch in $V_{th}$, in the directions that add. Derive [[#eq-mismatch]] and find the worst-case fractional current error.
::: solution
With $I = \tfrac12k(V_{GS} - V_{th})^2$ and $V_{GS}$ fixed, $\mathrm{d}I = \tfrac12V_{OV}^2\,\mathrm{d}k - kV_{OV}\,\mathrm{d}V_{th}$, so $\mathrm{d}I/I = \mathrm{d}k/k - 2\,\mathrm{d}V_{th}/V_{OV}$. Worst case: $0.02 + 2\times0.003/0.25 = 0.02 + 0.024 = 0.044$, a $4.4\,\%$ error. Doubling the overdrive to $0.5\,\mathrm{V}$ would reduce the threshold term to $1.2\,\%$; quadrupling the gate area would halve both terms.
:::
:::

::: exercise The Wilson mirror {#exr-wilson level=3}
In a BJT Wilson mirror, $I_{\text{REF}}$ flows into the node joining the collector of $Q_1$ and the base of $Q_3$; $Q_3$'s emitter connects to the collector of $Q_2$, which is diode-connected and shares its base with $Q_1$; both $Q_1$ and $Q_2$ have grounded emitters, and the output is $Q_3$'s collector. All transistors are matched with current gain $\beta$. Show that

$$
\frac{I_O}{I_{\text{REF}}} = 1 - \frac{2}{\beta^2 + 2\beta + 2}.
$$
::: hint
Let $I_{C1} = I_{C2} = I$. The emitter current of $Q_3$ supplies $I$ plus the two base currents of $Q_1$ and $Q_2$.
:::
::: solution
$Q_1$ and $Q_2$ share $V_{BE}$, so $I_{C1} = I_{C2} = I$. The emitter current of $Q_3$ is $I_{E3} = I + 2I/\beta = I(\beta + 2)/\beta$, so $I_O = I_{C3} = \frac{\beta}{\beta + 1}I_{E3} = I\frac{\beta + 2}{\beta + 1}$, and $I_{B3} = I_{E3}/(\beta + 1) = I\frac{\beta + 2}{\beta(\beta + 1)}$. KCL at the input node: $I_{\text{REF}} = I_{C1} + I_{B3} = I\left(1 + \frac{\beta + 2}{\beta(\beta + 1)}\right) = I\frac{\beta^2 + 2\beta + 2}{\beta(\beta + 1)}$. Dividing,

$$
\frac{I_O}{I_{\text{REF}}} = \frac{\beta(\beta + 2)}{\beta^2 + 2\beta + 2} = 1 - \frac{2}{\beta^2 + 2\beta + 2}.
$$

For $\beta = 100$ the error is $2/10\,202 = 0.02\,\%$, a hundred times smaller than the basic mirror's $2\,\%$.
:::
:::
