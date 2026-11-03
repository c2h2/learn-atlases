Until the early 2000s, each new generation of chips ran faster than the last, and nobody needed to ask whether it could afford to. Then clock frequencies stalled at a few gigahertz, not because transistors stopped getting faster but because the chips could not be cooled: a high-end processor already dissipated around $100\,\mathrm W$ from a couple of square centimetres, a power density several times that of a hotplate. Since then, digital design has been **power-limited**. A phone's processor must stay within a few watts to keep the case comfortable and the battery alive; a data-centre accelerator draws several hundred watts per package, and the electricity and cooling of the building are a large part of its cost of ownership. As of 2026 large parts of a chip cannot all run at full speed at once, and performance per watt is the figure of merit that drives architecture, circuits and process alike.

This chapter accounts for where the power goes and how designers reduce it. A CMOS gate dissipates power in three ways: by charging and discharging capacitance (**dynamic** power), by the brief current that flows from supply to ground while both transistors conduct during a transition (**short-circuit** power), and by current that flows even when nothing switches (**leakage**). We derive each, then turn to the most powerful knob, the supply voltage, and to the circuit techniques — clock gating, power gating, multiple thresholds — that every modern chip uses. The device physics of leakage is in [[semiconductor-devices/mosfets]] and the inverter model in [[digital-ic/cmos-inverter]].

## Dynamic power

When the output of a CMOS gate rises, its pMOS network connects the load capacitance $C_L$ to the supply and charges it to $V_{DD}$; when it falls, the nMOS network discharges it to ground. Each pair of transitions draws charge $C_LV_{DD}$ from the supply.

::: theorem Switching energy {#thm-switching-energy}
A capacitance $C_L$ charged from $0$ to $V_{DD}$ through any resistive network from a supply $V_{DD}$, and later discharged to ground, draws energy $E = C_LV_{DD}^2$ from the supply. Half of it, $\tfrac12C_LV_{DD}^2$, is dissipated in the pull-up network during charging; the other half is stored on the capacitor and dissipated in the pull-down network during discharging. The result is independent of the resistances and of how fast the transitions are.
:::

::: proof
During charging the supply delivers current $i(t) = C_L\,\mathrm dv_{out}/\mathrm dt$ at voltage $V_{DD}$, so it supplies

$$
E_{supply} = \int_0^\infty V_{DD}\,i(t)\,\mathrm dt = V_{DD}C_L\int_0^{V_{DD}}\mathrm dv_{out} = C_LV_{DD}^2 .
$$

The energy stored on the capacitor at the end is $\int_0^\infty v_{out}i\,\mathrm dt = C_L\int_0^{V_{DD}}v\,\mathrm dv = \tfrac12C_LV_{DD}^2$. The difference, $\tfrac12C_LV_{DD}^2$, is dissipated in the pull-up network. During discharging the supply delivers nothing (the pull-up is off), and the stored $\tfrac12C_LV_{DD}^2$ is dissipated in the pull-down network. Only the end voltages entered the integrals, so the result does not depend on the resistances or the waveform.
:::

The independence from resistance is striking: making transistors weaker does not save energy per transition, it only spreads the same dissipation over a longer time. Energy can only be saved by switching less capacitance, switching it less often, or switching it through a smaller voltage.

::: definition Activity factor {#def-activity}
The **activity factor** $\alpha$ of a node is the average number of $0\to1$ transitions it makes per clock cycle. A clock signal has $\alpha = 1$; a data signal that is equally likely to be $0$ or $1$ in each cycle, independently of the previous cycle, has $\alpha = \tfrac14$.
:::

::: corollary Dynamic power {#cor-dynamic-power}
A circuit whose nodes have capacitances $C_i$ and activity factors $\alpha_i$, clocked at frequency $f$ from supply $V_{DD}$, dissipates dynamic power

$$
P_{dyn} = \Bigl(\sum_i\alpha_iC_i\Bigr)V_{DD}^2f = \alpha C_{tot}V_{DD}^2f ,
$$ {#eq-pdyn}

where $\alpha C_{tot}$ is the **effective switched capacitance**.
:::

::: proof
Each $0\to1$ transition of node $i$, together with the $1\to0$ transition that must eventually follow, draws $C_iV_{DD}^2$ from the supply by [[#thm-switching-energy]]. Node $i$ makes $\alpha_if$ such transitions per second on average; summing over nodes gives [[#eq-pdyn]].
:::

The quadratic dependence on $V_{DD}$ makes the supply voltage the most effective single lever on power. The frequency enters linearly, but in practice the supply and frequency are linked, because a lower supply makes gates slower; we return to this below.

::: example Power of a processor core {#ex-core-power}
A processor core has a total node capacitance of $5\,\mathrm{nF}$ and an average activity factor of $0.1$. Find its dynamic power at $3\,\mathrm{GHz}$ and $0.75\,\mathrm V$. If the operating system lowers the frequency to $2\,\mathrm{GHz}$, which allows the supply to be reduced to $0.6\,\mathrm V$, what is the new power, and by what fraction did the energy per cycle fall?
::: solution
By [[#eq-pdyn]], $P = 0.1\times5\times10^{-9}\times0.75^2\times3\times10^9 = 0.84\,\mathrm W$. At the lower operating point, $P = 0.1\times5\times10^{-9}\times0.36\times2\times10^9 = 0.36\,\mathrm W$, a $57\,\%$ reduction for a $33\,\%$ loss of speed. The energy per cycle, $\alpha C_{tot}V_{DD}^2$, fell from $0.28\,\mathrm{nJ}$ to $0.18\,\mathrm{nJ}$, by $36\,\%$ — the factor $(0.6/0.75)^2$. The work gets done more slowly but with less energy, which is what a battery cares about.
:::
:::

### Estimating activity factors

The activity factor of a node depends on the data, and is measured in simulation of realistic workloads. For estimates, assume that the inputs of a gate are statistically independent from input to input and from cycle to cycle. If the output is $1$ with probability $P_1$, a $0\to1$ transition requires a $0$ in one cycle and a $1$ in the next, so

$$
\alpha = P_0P_1 = P_1(1 - P_1).
$$ {#eq-activity}

For a NAND2 with independent inputs that are each $1$ with probability $\tfrac12$, the output is $0$ only when both inputs are $1$: $P_0 = \tfrac14$, $P_1 = \tfrac34$, and $\alpha = \tfrac{3}{16}$. A NOR2 has the same activity, an XOR2 has $P_1 = \tfrac12$ and $\alpha = \tfrac14$. A NOR4 has $P_1 = \tfrac{1}{16}$ and $\alpha = \tfrac{15}{256} \approx 0.06$: wide AND and OR functions rarely switch. A dynamic gate is different: its output is precharged every cycle, so its activity is the probability that it evaluates to $0$ — $\tfrac{15}{16}$ for a dynamic NOR4, sixteen times that of the static gate. This is one reason dynamic logic is power-hungry ([[digital-ic/dynamic-logic]]).

Real signals are correlated, and gates also make **glitches**: spurious transitions caused by inputs arriving at different times, which can account for a significant fraction of the dynamic power in deep arithmetic logic. Balancing path delays and inserting registers reduce glitching.

::: quiz
A static NOR2 gate's inputs come from two independent random signals with $P(1) = \tfrac12$. What is its activity factor, and how does it change if the gate is replaced by a dynamic (precharged) NOR2?
- [ ] $\tfrac14$ in both cases
- [x] $\tfrac3{16}$ static; $\tfrac34$ dynamic
- [ ] $\tfrac34$ static; $\tfrac3{16}$ dynamic
- [ ] $\tfrac1{16}$ static; $\tfrac14$ dynamic
::: solution
The static NOR2 output is $1$ only when both inputs are $0$: $P_1 = \tfrac14$, so $\alpha = \tfrac14\times\tfrac34 = \tfrac3{16}$. The dynamic gate's output node is precharged high every cycle and discharged whenever at least one input is $1$, probability $\tfrac34$; each discharge is followed by a $0\to1$ precharge, so $\alpha = \tfrac34$, four times as much.
:::
:::

## Short-circuit power

During an input transition there is an interval in which both the nMOS and the pMOS of an inverter conduct, and a **short-circuit current** flows directly from $V_{DD}$ to ground without charging the load.

::: theorem Short-circuit power of an unloaded inverter {#thm-short-circuit}
A symmetric long-channel inverter ($k_n = k_p = \beta$, $V_{th,n} = \lvert V_{th,p}\rvert = V_{th}$, $V_{DD} > 2V_{th}$), with no load capacitance, driven by an input that ramps linearly between $0$ and $V_{DD}$ in a time $\tau_{in}$ on each edge, at a clock period $T$ with one rising and one falling input transition per period, dissipates

$$
P_{sc} = \frac{\beta}{12}\,(V_{DD} - 2V_{th})^3\,\frac{\tau_{in}}{T}.
$$ {#eq-psc}
:::

::: proof
Consider a rising input, $V_{in}(t) = V_{DD}t/\tau_{in}$. Current flows while $V_{th} < V_{in} < V_{DD} - V_{th}$. With no load, the output stays near $V_{DD}$ while the nMOS is weaker and near $0$ afterwards, so the conducting transistor that limits the current is always the one in saturation: for $V_{in} < V_{DD}/2$ the current is the nMOS saturation current $\tfrac\beta2(V_{in} - V_{th})^2$, and by symmetry the second half of the interval contributes equally. The charge passed from supply to ground is

$$
Q = 2\int_{t_1}^{\tau_{in}/2}\frac\beta2\left(\frac{V_{DD}t}{\tau_{in}} - V_{th}\right)^2\mathrm dt = \beta\frac{\tau_{in}}{V_{DD}}\int_0^{V_{DD}/2 - V_{th}}u^2\,\mathrm du = \frac{\beta\tau_{in}}{24\,V_{DD}}(V_{DD} - 2V_{th})^3,
$$

with $t_1 = \tau_{in}V_{th}/V_{DD}$ and $u = V_{DD}t/\tau_{in} - V_{th}$. The energy drawn is $V_{DD}Q$ per input transition; two transitions per period give $P_{sc} = 2V_{DD}Q/T$, which is [[#eq-psc]].
:::

This is Veendrick's 1984 result. It is a worst case, because a load capacitance slows the output, keeping the drain–source voltage of the turning-off transistor small and reducing the current. Short-circuit power is small when input and output transition times are comparable — typically below $10\,\%$ of dynamic power — which is one more reason to size gates so that all slopes are similar (the logical-effort sizing of [[digital-ic/static-cmos-logic]] does this naturally). And it vanishes when $V_{DD} < 2V_{th}$, because then the two transistors are never on together.

::: example How large is short-circuit power? {#ex-psc}
A symmetric inverter with $\beta = 200\,\mathrm{\mu A/V^2}$, $V_{DD} = 1.0\,\mathrm V$ and $V_{th} = 0.3\,\mathrm V$ sees input transitions of $20\,\mathrm{ps}$ at a clock period of $500\,\mathrm{ps}$, toggling every cycle. Find the worst-case short-circuit power, and compare with the dynamic power of the same inverter driving $1.5\,\mathrm{fF}$ with $\alpha = 1$.
::: solution
By [[#eq-psc]], $P_{sc} = (200\times10^{-6}/12)(0.4)^3(20/500) = 1.67\times10^{-5}\times0.064\times0.04 = 43\,\mathrm{nW}$. The dynamic power is $C V_{DD}^2f = 1.5\times10^{-15}\times1\times2\times10^9 = 3\,\mu\mathrm W$. Even the unloaded worst case is under $1.5\,\%$ of the dynamic power. With slow inputs — a weak gate driving a long wire, say $\tau_{in} = 200\,\mathrm{ps}$ — it would be ten times larger.
:::
:::

## Leakage

A transistor that is "off" still conducts. Several mechanisms contribute, and together they make up the **static** or **leakage** power, drawn whenever the circuit is powered, whether it switches or not.

- **Subthreshold conduction.** The diffusion current of [[semiconductor-devices/mosfets]], $I_{off} \propto 10^{(V_{GS} - V_{th})/S}$ at $V_{GS} = 0$, where $S$ is the subthreshold swing (at least $60\,\mathrm{mV/decade}$ at room temperature). It is increased by **drain-induced barrier lowering** (DIBL), which lowers $V_{th}$ by $\eta V_{DS}$, with $\eta$ typically $0.05$–$0.1$. This is usually the dominant mechanism.
- **Gate leakage.** Tunnelling through thin gate dielectrics; large for silicon dioxide below about $1.5\,\mathrm{nm}$, and much reduced by high-k dielectrics since 2007.
- **Junction leakage** and **gate-induced drain leakage** (GIDL): reverse-biased junction currents and band-to-band tunnelling in the high-field region where the gate overlaps the drain, important for heavily doped junctions and when the gate is driven below the source.

Leakage rises steeply with temperature: the subthreshold swing is proportional to $T$, and the threshold voltage falls with temperature by roughly $0.5$–$1\,\mathrm{mV/K}$. A chip's leakage at $100\,^\circ\mathrm C$ is often an order of magnitude larger than at room temperature, and since leakage heats the chip, which raises leakage further, thermal runaway is possible if cooling is inadequate.

### The stack effect

Two off transistors in series leak far less than one. Consider two series nMOS transistors, both with gates at $0$, between an output at $V_{DD}$ and ground. The small leakage current charges the intermediate node to a voltage $V_x$ of a few thermal voltages. The upper transistor then has $V_{GS} = -V_x$ (its gate is below its source), a reduced $V_{DS} = V_{DD} - V_x$ (less DIBL) and a raised threshold from the body effect; all three reduce its leakage.

::: proposition Stack effect {#prop-stack}
Model the subthreshold current of each transistor as $I = I_0\,10^{(V_{GS} - V_{th} + \eta V_{DS})/S}\bigl(1 - e^{-V_{DS}/V_T}\bigr)$, neglecting the body effect. In a stack of two off transistors with $V_{DD}$ across it, if the intermediate voltage $V_x$ is several $V_T$, then

$$
V_x \approx \frac{\eta V_{DD}}{1 + 2\eta}, \qquad \frac{I_{stack}}{I_{single}} \approx 10^{-\eta(V_{DD} - V_x)/S}.
$$ {#eq-stack}
:::

::: proof
The same current flows through both transistors. The lower one has $V_{GS} = 0$ and $V_{DS} = V_x$; the upper one has $V_{GS} = -V_x$ and $V_{DS} = V_{DD} - V_x$. With $V_x \gg V_T$, the factors $(1 - e^{-V_{DS}/V_T})$ are close to $1$, and equating exponents gives $\eta V_x = -V_x + \eta(V_{DD} - V_x)$, so $V_x = \eta V_{DD}/(1 + 2\eta)$. The stack current equals the lower transistor's current, $I_0\,10^{(-V_{th} + \eta V_x)/S}$, while a single off transistor with $V_{DD}$ across it carries $I_0\,10^{(-V_{th} + \eta V_{DD})/S}$. Their ratio is [[#eq-stack]].
:::

With $\eta = 0.1$, $S = 80\,\mathrm{mV/dec}$ and $V_{DD} = 1\,\mathrm V$, $V_x = 83\,\mathrm{mV}$ (about $3V_T$, so the approximation is fair) and the ratio is $10^{-1.15} = 0.071$: the stack leaks fourteen times less. Solving the full equations numerically gives $V_x = 84\,\mathrm{mV}$ and a ratio of $0.069$. Including the body effect reduces it further. NAND gates with all inputs low, and deliberately inserted series "stack" transistors in idle circuits, exploit this effect; so does the choice of the input vector applied to a block before it goes idle.

::: example Leakage at temperature {#ex-leak-temp}
A transistor has $V_{th} = 0.3\,\mathrm V$ and $S = 80\,\mathrm{mV/dec}$ at $25\,^\circ\mathrm C$. Assume $S \propto T$ and that $V_{th}$ falls by $0.5\,\mathrm{mV/K}$. By what factor does its subthreshold off-current at $V_{GS} = 0$ increase between $25\,^\circ\mathrm C$ and $100\,^\circ\mathrm C$, ignoring changes in the prefactor $I_0$?
::: solution
At $100\,^\circ\mathrm C = 373\,\mathrm K$: $S = 80\times373.15/298.15 = 100.1\,\mathrm{mV/dec}$ and $V_{th} = 0.3 - 75\times0.0005 = 0.2625\,\mathrm V$. The off-current is proportional to $10^{-V_{th}/S}$: $10^{-0.3/0.08} = 10^{-3.75}$ at $25\,^\circ\mathrm C$ and $10^{-0.2625/0.1001} = 10^{-2.62}$ at $100\,^\circ\mathrm C$. The ratio is $10^{1.13} = 13$. (The prefactor, proportional to $T^2$ and to the mobility, adds a little more.) Leakage specifications are therefore always given at the hot corner.
:::
:::

## Energy, delay and the supply voltage

Lowering $V_{DD}$ reduces the energy per operation quadratically, but it also reduces the transistors' drive current and so increases delay. To quantify the trade, we need a delay model valid over a range of supply voltages.

::: definition Alpha-power law {#def-alpha-power}
In the **alpha-power law** of Sakurai and Newton, the saturation current of a short-channel MOSFET is modelled as

$$
I_{Dsat} = K\,(V_{GS} - V_{th})^{\alpha},
$$ {#eq-alpha-power}

with $1 \le \alpha \le 2$: $\alpha = 2$ recovers the long-channel square law and $\alpha \to 1$ the velocity-saturated limit. Modern transistors have $\alpha \approx 1.2$–$1.5$. The delay of a gate driving capacitance $C$ is then proportional to $CV_{DD}/(V_{DD} - V_{th})^{\alpha}$.
:::

Above threshold, therefore, frequency rises roughly linearly with $V_{DD} - V_{th}$ while energy rises as $V_{DD}^2$; power, the product of energy per cycle and frequency, rises roughly as the cube of the supply when the frequency is set as high as the supply allows. This cubic dependence is what makes **dynamic voltage and frequency scaling** (DVFS) so effective: running a task at $70\,\%$ of maximum frequency and the correspondingly lower voltage can cut power by more than half.

::: widget plot
f: (x - 0.3)^a/x/((0.7)^a); x^2*(x - 0.3)^a/x/((0.7)^a); x^2
x: 0.35, 1.2
y: 0, 1.6
sliders: a=1.3:1:2:0.05
labels: f/f_{1\,\mathrm V}; P/P_{1\,\mathrm V}; E_{op}/E_{1\,\mathrm V}
caption: Normalised maximum frequency, dynamic power and energy per operation against the supply voltage in volts, from the alpha-power law with $V_{th} = 0.3\,\mathrm V$ and exponent $\alpha = a$, all relative to their values at $1\,\mathrm V$. Halving the frequency (find where the first curve is $0.5$) needs only about $0.56\,\mathrm V$ and cuts power to under a fifth. Set $a = 2$ (long-channel transistors): frequency falls faster with voltage and the trade is less favourable.
:::

::: example Parallelism for low power {#ex-parallel}
A datapath runs at frequency $f$ from $V_{DD} = 1.0\,\mathrm V$, with $V_{th} = 0.3\,\mathrm V$ and $\alpha = 1.3$. It is duplicated: two copies each process alternate data at $f/2$, so each copy may be twice as slow. Multiplexers and wiring raise the total switched capacitance to $2.2$ times that of one copy. Find the supply voltage at which the parallel version just meets timing and the ratio of its power to the original.
::: solution
The delay is proportional to $V/(V - 0.3)^{1.3}$, which at $1\,\mathrm V$ is $1/0.7^{1.3} = 1.590$. We need $V/(V - 0.3)^{1.3} = 2\times1.590 = 3.18$; solving numerically (by bisection) gives $V = 0.565\,\mathrm V$. The power ratio is

$$
\frac{P_{par}}{P_{orig}} = \frac{2.2\,C\,(0.565)^2\,(f/2)}{C\,(1.0)^2\,f} = 2.2\times0.319\times0.5 = 0.35.
$$

The parallel design does the same work for about a third of the power, at the cost of more than twice the area. This argument, made by Chandrakasan, Sheng and Brodersen in 1992, is the basis of the many-core and wide-datapath designs that replaced ever-faster single cores.
:::
:::

### Energy–delay trade-offs and the minimum-energy point

The **power–delay product** (PDP), the energy per operation, is a measure of efficiency at a given speed, and the **energy–delay product** (EDP) weighs energy and speed equally. Above threshold, EDP is minimised at a supply of a few times $V_{th}$. If speed does not matter — sensors, implants, some IoT nodes — energy per operation alone counts. Dynamic energy keeps falling as $V_{DD}^2$ all the way down, but below threshold the delay grows exponentially, and leakage, which flows during the whole of each slow operation, contributes energy $I_{leak}V_{DD}t_{op}$ that eventually rises. There is a **minimum-energy point**, typically at $0.25$–$0.4\,\mathrm V$.

::: example The minimum-energy point {#ex-mep}
Model a circuit's energy per operation as $E = C_{eff}V_{DD}^2\left(1 + w\dfrac{I_{off}}{I_{on}(V_{DD})}\right)$, where the second term is the leakage energy during an operation whose duration is proportional to $C_{eff}V_{DD}/I_{on}$, and $w$ (a few hundred to a few thousand) measures how many gates leak for each one that switches, times the logic depth. With $w = 1000$ and the smooth MOSFET model $I \propto \ln^2[1 + e^{(V_{GS} - V_{th})/2nV_T}]$ of [[semiconductor-devices/mosfets]] ($V_{th} = 0.3\,\mathrm V$, $n = 1.3$), find the minimum-energy supply and the energy saving compared with $1\,\mathrm V$.
::: solution
At $1\,\mathrm V$, $I_{off}/I_{on} = 1.2\times10^{-6}$, so leakage energy is negligible: $E \approx C_{eff}$ (in units of $C_{eff}\times1\,\mathrm V^2$). As $V_{DD}$ falls, the first factor shrinks as $V_{DD}^2$ while $I_{on}$ falls, slowly above threshold and exponentially below it. Evaluating $E$ on a fine grid of $V_{DD}$ shows a minimum at $V_{DD} \approx 0.28\,\mathrm V$, just below threshold, where $E = 0.11\,C_{eff}$ — about nine times less than at $1\,\mathrm V$. The circuit is then thousands of times slower than at $1\,\mathrm V$. Larger $w$ (more leaking gates, deeper logic) moves the minimum up and makes it shallower.
:::
:::

::: widget plot
f: x^2*(1 + w*ln(1 + exp(-0.3/(2*1.3*0.02585)))^2/ln(1 + exp((x - 0.3)/(2*1.3*0.02585)))^2); x^2; x^2*w*ln(1 + exp(-0.3/(2*1.3*0.02585)))^2/ln(1 + exp((x - 0.3)/(2*1.3*0.02585)))^2
x: 0.1, 1
y: 0, 0.6
sliders: w=1000:10:10000:10
labels: E_{total}; E_{dyn}; E_{leak}
caption: Energy per operation (relative to the dynamic energy at $1\,\mathrm V$) against the supply voltage in volts, using the model of [[#ex-mep]] with leakage weight $w$. Dynamic energy falls as $V_{DD}^2$; leakage energy rises steeply below threshold ($0.3\,\mathrm V$) because each operation takes exponentially longer. Their sum has a minimum near $0.28\,\mathrm V$ for $w = 1000$. Increase $w$ to $10\,000$ (a large, mostly idle circuit): the minimum moves up to about $0.39\,\mathrm V$ and the possible saving shrinks.
:::

::: warning Power and energy are not the same thing
Halving the clock frequency halves the dynamic *power* but does not change the *energy* per operation $\alpha CV_{DD}^2$; the task takes twice as long, and if leakage is significant, the total energy for the task actually rises. Only lowering the voltage (or the switched capacitance) saves energy. For a battery, energy is what matters; for the cooling system, power. State which one a technique reduces — and beware of "race to idle" arguments, which say that running fast and then shutting down can save energy only when the shut-down state removes leakage, too.
:::

## Low-power design techniques

### Clock gating

Registers that are not going to change still dissipate power if their clock toggles: the clock input of every flip-flop, and the clock buffers that drive them, switch with $\alpha = 1$. **Clock gating** stops the clock to a block of registers when their enable is off. An **integrated clock-gating cell** combines a latch, which holds the enable stable while the clock is high so that the gated clock cannot glitch, with an AND gate. Synthesis tools insert gating automatically wherever a register's next state is a multiplexer that selects its current value. Clock gating typically reduces dynamic power by $20$–$40\,\%$ and is used in virtually every chip; it is applied hierarchically, from individual register banks up to whole cores.

### Power gating

Clock gating stops switching but not leakage. **Power gating** disconnects an idle block from its supply through a **sleep transistor**: a wide, high-threshold transistor between the block and the ground (a **footer**, nMOS) or the supply (a **header**, pMOS). When the block is active, the sleep transistor is on and the block runs from a "virtual" rail slightly offset from the real one; when it is idle, the sleep transistor is off and, being a high-threshold device, leaks very little.

::: example Sizing a footer switch {#ex-sleep}
A logic block draws a peak current of $50\,\mathrm{mA}$ from $1.0\,\mathrm V$ when active and has $5\,\mathrm{mA}$ of leakage when idle. It is to be power-gated with a high-threshold nMOS footer whose on-resistance in the linear region is $0.5\,\mathrm{k\Omega\cdot\mu m}$ and whose off-state leakage is $1\,\mathrm{nA/\mu m}$. The virtual ground may rise by at most $30\,\mathrm{mV}$. Find the footer width, the leakage in sleep mode, and the saving.
::: solution
The allowed resistance is $R \le 30\,\mathrm{mV}/50\,\mathrm{mA} = 0.6\,\Omega$, so the width must be $W \ge 0.5\times10^3/0.6 = 833\,\mathrm{\mu m}$. In practice it is split into many smaller switches distributed across the block. In sleep mode the footer leaks $833\times1\,\mathrm{nA} = 0.83\,\mu\mathrm A$, against $5\,\mathrm{mA}$ ungated: a reduction by a factor of $6000$. The costs are the footer's area, the $30\,\mathrm{mV}$ ($3\,\%$) loss of supply voltage, which slows the active block by a few per cent, the energy needed to recharge the block's internal capacitance on wake-up, and a wake-up time of nanoseconds to microseconds during which the inrush current must be limited to avoid disturbing neighbouring blocks.
:::
:::

Power gating loses the state of the block's registers. Blocks either save their state to memory before sleeping, or use **retention registers** whose small "balloon" latch is powered from an always-on supply. Because waking up costs energy, a block should be gated only if it will stay idle long enough for the leakage saved to exceed the wake-up energy — the **break-even time**, typically microseconds.

### Multiple thresholds and body bias

Most paths in a design are not critical. Processes offer several **threshold-voltage flavours** of each transistor, typically spanning about $100$–$200\,\mathrm{mV}$; each step in $V_{th}$ of one subthreshold swing changes leakage by a factor of ten and drive current by perhaps $10$–$20\,\%$. Synthesis tools build critical paths from fast, leaky low-threshold cells and everything else from slow, frugal high-threshold cells, often cutting leakage by a large factor for a negligible loss of speed. **Body biasing** shifts thresholds after manufacture: reverse body bias raises $V_{th}$ to cut standby leakage, forward bias lowers it to recover speed, which is particularly effective in fully depleted silicon-on-insulator processes with a back gate.

### Voltage islands and DVFS

A chip is divided into **voltage domains** that can run at different supplies: memories often need a higher voltage than logic for stability, and each processor core can have its own voltage and frequency set by the operating system according to demand. Level shifters convert signals crossing between domains. Fine-grained DVFS, with on-chip regulators that change voltage in microseconds, is standard in mobile and server processors.

::: quiz
Which technique reduces the *leakage* of an idle block by the largest factor?
- [ ] clock gating the block
- [ ] lowering its clock frequency
- [x] power gating it with a high-threshold sleep transistor
- [ ] using low-threshold cells on its critical paths
::: solution
Clock gating and lower frequency reduce switching, not leakage. Low-threshold cells increase leakage. A high-threshold sleep transistor in series with the whole block makes the block's leakage path pass through a transistor that leaks orders of magnitude less, reducing idle leakage by factors of hundreds to thousands, as in [[#ex-sleep]].
:::
:::

## Design and practice

The power budget of a chip is planned from the start. Architects estimate power from activity in workload simulations; designers check that every block meets its share; and the package, cooling system and voltage regulators are designed for the resulting worst case. Several consequences of the physics in this chapter shape modern chips:

- **Dark silicon.** Because the power density of a fully active chip would exceed what can be cooled, a large fraction of a modern chip is idle at any moment. Architects exploit this by including **specialised** accelerators — for video, cryptography, neural networks — that are much more energy-efficient than general-purpose cores for their task and are powered only when needed.
- **Thermal management.** On-die temperature sensors and power controllers throttle frequency and voltage when the chip approaches its temperature limit, and allow short bursts above the sustained power ("turbo").
- **Memory and data movement.** Moving a bit across a chip on a wire, or to off-chip DRAM, costs far more energy than an arithmetic operation on it, by factors of ten to a thousand. Much of the energy of modern computing is spent on data movement, which is why caches, near-memory computing and the interconnect techniques of [[digital-ic/interconnect]] are central to energy efficiency.
- **Near-threshold operation.** Many low-power processors run near threshold ($0.4$–$0.6\,\mathrm V$) for their best energy efficiency, accepting lower speed and greater sensitivity to variation.

As of 2026, leading mobile processors operate their cores from about $0.5$ to $1\,\mathrm V$ under DVFS, and high-end server processors and accelerators dissipate from a few hundred watts to over a kilowatt per package, with liquid cooling increasingly common in data centres.

::: application Power in a smartphone processor
A phone's system-on-chip contains several CPU cores of two or three different designs (large, fast, high-power cores and small, efficient ones), a GPU, a neural-network accelerator, image and video processors, modems and memory controllers. Each is in its own voltage and power domain. The operating system migrates tasks between core types and sets each domain's voltage and frequency many times per second; most blocks are clock-gated most of the time and power-gated whenever they are idle for longer than their break-even time. The result is that the chip can burst to many watts for a few seconds but averages well under a watt in typical use.
:::

::: history
The quadratic dependence of CMOS switching energy on voltage was understood from the beginning, and CMOS's near-zero standby power was the reason it first found a market in watches and calculators in the 1970s. Harry Veendrick of Philips analysed short-circuit dissipation in 1984. Takayasu Sakurai and Richard Newton introduced the alpha-power law in 1990. Anantha Chandrakasan, Samuel Sheng and Robert Brodersen's 1992 paper on low-power CMOS design showed how parallelism and voltage scaling could reduce power by large factors and launched low-power design as a field. Multi-threshold CMOS with high-threshold sleep transistors was proposed by Shin'ichiro Mutoh and colleagues at NTT in 1995. Dynamic voltage and frequency scaling reached laptop processors in 2000, with Intel's SpeedStep and Transmeta's LongRun. After Dennard scaling ended in the mid-2000s, power became the main constraint on performance; the term "dark silicon" was popularised by Hadi Esmaeilzadeh and colleagues' 2011 study of its consequences for multicore scaling.
:::

## Where this leads

Clock power, the largest single item in many designs, is the subject of the clock-distribution part of [[digital-ic/sequential-circuits-clocking]]. Leakage and supply-voltage limits are especially severe in SRAM, whose cells must hold data at the lowest possible voltage; [[digital-ic/memory-arrays]] takes up the story. The voltage regulators that supply and scale the chip's rails are power converters of the kind designed in [[power-electronics/dc-dc-converters]], and the architectural side of energy efficiency — parallelism, caches and accelerators — is developed in [[computer-architecture/parallel-architectures]].

::: summary
- Charging and discharging a capacitance $C$ draws $CV_{DD}^2$ from the supply, independent of resistance; dynamic power is $\alpha C_{tot}V_{DD}^2f$ with activity factor $\alpha$.
- For independent random inputs $\alpha = P_1(1 - P_1)$; static NAND2/NOR2 have $\alpha = 3/16$, dynamic gates much more because they precharge every cycle.
- Short-circuit power of an unloaded inverter is $(\beta/12)(V_{DD} - 2V_{th})^3\tau_{in}/T$; it is small when slopes are matched and vanishes for $V_{DD} < 2V_{th}$.
- Leakage is dominated by subthreshold conduction, increased by DIBL and temperature; two off transistors in series leak an order of magnitude less (the stack effect).
- With the alpha-power law, frequency rises roughly linearly with $V_{DD} - V_{th}$ while power rises roughly as $V_{DD}^3$; parallelism at lower voltage saves power, and energy per operation has a minimum near threshold.
- Clock gating removes unnecessary switching, power gating with high-threshold sleep transistors removes idle leakage, multiple thresholds trade leakage for speed path by path, and DVFS matches voltage and frequency to demand.
:::

## Exercises

::: exercise Energy per transition {level=1 check="10e-15*0.8^2"}
A node of $10\,\mathrm{fF}$ is charged to $0.8\,\mathrm V$ and discharged once. How much energy, in joules, is drawn from the supply?
::: solution
$E = CV_{DD}^2 = 10\times10^{-15}\times0.64 = 6.4\,\mathrm{fJ}$, by [[#thm-switching-energy]]; half is dissipated on charging and half on discharging.
:::
:::

::: exercise Activity of a gate chain {level=1 check="7/64"}
A NAND2 gate with independent random inputs ($P_1 = \tfrac12$) drives one input of a NOR2 gate whose other input is an independent random signal with $P_1 = \tfrac12$. Find the activity factor of the NOR2 output.
::: solution
The NAND2 output has $P_1 = \tfrac34$. The NOR2 output is $1$ only if both its inputs are $0$: $P_1 = \tfrac14\times\tfrac12 = \tfrac18$. By [[#eq-activity]], $\alpha = \tfrac18\times\tfrac78 = \tfrac{7}{64} = 0.11$.
:::
:::

::: exercise Chip power {level=1 check="0.15*2e-9*0.8^2*2.5e9"}
A chip has $2\,\mathrm{nF}$ of switched node capacitance with an average activity of $0.15$, running at $2.5\,\mathrm{GHz}$ from $0.8\,\mathrm V$. Find its dynamic power in watts.
::: solution
$P = 0.15\times2\times10^{-9}\times0.64\times2.5\times10^9 = 0.48\,\mathrm W$.
:::
:::

::: exercise Short-circuit power at low voltage {level=2}
For the inverter of [[#ex-psc]], find the short-circuit power at $V_{DD} = 0.8\,\mathrm V$ and at $V_{DD} = 0.6\,\mathrm V$, with the same slopes and frequency. What fraction of the $1\,\mathrm V$ value remains in each case?
::: solution
At $0.8\,\mathrm V$, $(V_{DD} - 2V_{th})^3 = 0.2^3 = 0.008$, so $P_{sc} = 1.67\times10^{-5}\times0.008\times0.04 = 5.3\,\mathrm{nW}$, $12.5\,\%$ of the $1\,\mathrm V$ value ($0.008/0.064$). At $0.6\,\mathrm V = 2V_{th}$ it is zero: the two transistors never conduct together.
:::
:::

::: exercise Stack effect with weaker DIBL {level=2 check="10^(-0.05*(1 - 0.05/1.1)/0.08)"}
Repeat the stack-effect estimate of [[#prop-stack]] for $\eta = 0.05$, $S = 80\,\mathrm{mV/dec}$ and $V_{DD} = 1\,\mathrm V$. Find $V_x$ and the ratio $I_{stack}/I_{single}$ (as a fraction). Is the approximation $V_x \gg V_T$ justified?
::: solution
$V_x = 0.05/1.1 = 45\,\mathrm{mV}$ and the ratio is $10^{-0.05\times0.955/0.08} = 10^{-0.597} = 0.25$. $V_x$ is only $1.8V_T$, so the factor $1 - e^{-V_x/V_T} = 0.83$ for the lower transistor is not negligible; including it raises $V_x$ slightly and lowers the current a little more. With less DIBL the stack effect is weaker (a factor of four instead of fourteen) — but the body effect, neglected here, adds to it.
:::
:::

::: exercise DVFS {level=2}
Using the alpha-power law with $V_{th} = 0.3\,\mathrm V$ and $\alpha = 1.3$, find the supply voltage at which a circuit that runs at $f_0$ at $1\,\mathrm V$ runs at $0.7f_0$, and the ratio of its dynamic power and energy per operation to those at $1\,\mathrm V$.
::: hint
Solve $(V - 0.3)^{1.3}/V = 0.7\times0.7^{1.3}$ numerically.
:::
::: solution
We need $(V - 0.3)^{1.3}/V = 0.7\times0.7^{1.3} = 0.7\times0.629 = 0.440$. At $V = 0.75\,\mathrm V$ the left side is $0.354/0.75 = 0.472$, too high; at $V = 0.70\,\mathrm V$ it is $0.304/0.70 = 0.434$, slightly low; bisecting further gives $V = 0.708\,\mathrm V$. The energy per operation scales as $V^2$: $0.708^2 = 0.50$ of the $1\,\mathrm V$ value; the power as $V^2f$: $0.50\times0.7 = 0.35$. A $30\,\%$ slowdown saves $65\,\%$ of the power.
:::
:::

::: exercise Break-even time for power gating {level=2 check="50e-12/(5e-3*1.0)"}
Waking a power-gated block costs $50\,\mathrm{pJ}$ (recharging its internal nodes and the switch control), and the block leaks $5\,\mathrm{mA}$ at $1.0\,\mathrm V$ when idle but not gated. What is the minimum idle time, in seconds, for which gating saves energy (ignoring the gated leakage)?
::: solution
Gating saves $P_{leak}t = 5\,\mathrm{mW}\times t$ and costs $50\,\mathrm{pJ}$, so it pays if $t > 50\times10^{-12}/5\times10^{-3} = 10\,\mathrm{ns}$. Real break-even times are longer, because the wake-up energy also includes restoring state and the energy of the control and retention circuitry, and because the block may need to be woken early.
:::
:::

::: exercise Short-circuit charge with a ramp {level=3}
Generalise [[#thm-short-circuit]] to an inverter with $k_n \ne k_p$ and unequal thresholds. Show that the short-circuit charge per input transition is

$$
Q = \frac{\tau_{in}}{3V_{DD}}\left[\frac{k_n}{2}(V_M - V_{th,n})^3 + \frac{k_p}{2}(V_{DD} - \lvert V_{th,p}\rvert - V_M)^3\right],
$$

where $V_M$ is the switching threshold of [[digital-ic/cmos-inverter#eq-vm]], and check that it reduces to the symmetric result.
::: solution
With no load, the current while the input rises from $V_{th,n}$ to $V_M$ is limited by the saturated nMOS, $\tfrac{k_n}2(V_{in} - V_{th,n})^2$; from $V_M$ to $V_{DD} - \lvert V_{th,p}\rvert$ it is limited by the saturated pMOS, $\tfrac{k_p}2(V_{DD} - V_{in} - \lvert V_{th,p}\rvert)^2$ (at $V_M$ the two are equal). With $\mathrm dt = (\tau_{in}/V_{DD})\,\mathrm dV_{in}$,

$$
Q = \frac{\tau_{in}}{V_{DD}}\left[\int_{V_{th,n}}^{V_M}\frac{k_n}2(v - V_{th,n})^2\mathrm dv + \int_{V_M}^{V_{DD} - \lvert V_{th,p}\rvert}\frac{k_p}2(V_{DD} - \lvert V_{th,p}\rvert - v)^2\mathrm dv\right],
$$

and each integral gives one third of the cube of its range, as stated. In the symmetric case $V_M = V_{DD}/2$ and both terms equal $\tfrac\beta2(V_{DD}/2 - V_{th})^3$, so $Q = \frac{\tau_{in}}{3V_{DD}}\beta\frac{(V_{DD} - 2V_{th})^3}{8} = \frac{\beta\tau_{in}(V_{DD} - 2V_{th})^3}{24V_{DD}}$, as in the proof of [[#thm-short-circuit]].
:::
:::

::: exercise Choosing thresholds for a block {level=3}
A block has $10^6$ gates. In a low-threshold (LVT) library each gate leaks $20\,\mathrm{nA}$ and the critical path meets timing with $10\,\%$ slack; a high-threshold (HVT) library has $15\,\%$ slower gates that leak $2\,\mathrm{nA}$. Suppose $5\,\%$ of the gates lie on paths with less than $15\,\%$ slack and must remain LVT, and the rest can be HVT. The supply is $0.8\,\mathrm V$. (a) Find the block's leakage power with all-LVT and mixed libraries. (b) The block's dynamic power is $200\,\mathrm{mW}$. What fraction of the total power does the mixed design save?
::: solution
(a) All-LVT: $10^6\times20\,\mathrm{nA}\times0.8\,\mathrm V = 16\,\mathrm{mW}$. Mixed: $5\times10^4\times20\,\mathrm{nA} + 9.5\times10^5\times2\,\mathrm{nA} = 1.0 + 1.9 = 2.9\,\mathrm{mA}$, i.e. $2.32\,\mathrm{mW}$. (b) Total power falls from $216$ to $202.3\,\mathrm{mW}$, a $6.3\,\%$ saving overall — but an $86\,\%$ cut in leakage, which dominates when the block is idle but powered. At high temperature, where leakage is ten times larger, the saving rises to about $40\,\%$ of the total. (HVT gates also have slightly lower input capacitance, which reduces dynamic power a little further.)
:::
:::
