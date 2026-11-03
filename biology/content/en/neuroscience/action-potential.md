When you touch a hot stove, a signal travels from your fingertip to your spinal cord, about a metre, in a few hundredths of a second, and arrives at full strength. A wire would not do this for free: an electrical signal on a long, leaky cable fades with distance, as we shall see. Axons are worse than wires, with a salty core that conducts a million times less well than copper and a thin membrane that leaks. Yet impulses run along them without fading, because each patch of membrane regenerates the signal it receives. That regenerating signal is the **action potential**, a brief, stereotyped reversal of the membrane potential, about 100 mV in amplitude and one or a few milliseconds long, that is the common currency of long-distance signalling in nervous systems.

This chapter explains how the action potential is produced and how it travels. We start with the experiments that showed what it is, then follow Alan Hodgkin and Andrew Huxley's analysis of the squid giant axon, which separated the currents carried by Na⁺ and K⁺ and turned them into one of the most successful quantitative models in biology. We then look at the channel proteins that the model predicted, and at the cable properties of axons that determine how far and how fast the impulse spreads, including the trick of myelination. The resting potential, the Nernst equation and the equivalent circuit of the membrane are from [[neuroscience/resting-potential]].

## What an action potential looks like

Record from inside an axon and pass a brief pulse of depolarising current. A weak pulse produces a small depolarisation that dies away exponentially with the membrane time constant, as a passive RC circuit would. A stronger pulse produces a larger passive response. But once the depolarisation exceeds a **threshold**, typically 10–20 mV above rest, the membrane takes over: the potential shoots up within a fraction of a millisecond, overshoots zero to about +30 to +50 mV, falls back almost as fast, undershoots the resting potential for a few milliseconds (the **after-hyperpolarisation**), and then recovers.

Four properties define the action potential:

- **Threshold.** Depolarisations below threshold decay; those above it trigger an impulse.
- **All-or-none.** Once triggered, the impulse has an amplitude and shape that do not depend on the size of the stimulus. Stronger stimuli produce more impulses, or earlier ones, not larger ones.
- **Refractoriness.** For about a millisecond after an impulse, no stimulus however strong can trigger another (the **absolute refractory period**); for a few milliseconds more, a larger-than-usual stimulus is needed (the **relative refractory period**). This limits the maximum firing rate to several hundred impulses per second and ensures that impulses travel in one direction.
- **Propagation without decrement.** The impulse travels along the axon at constant speed and constant amplitude.

The overshoot was the first clue to the mechanism. Julius Bernstein had proposed in 1902 that excitation is a breakdown of the membrane's selectivity for K⁺, which would take the potential to zero but no further. When Hodgkin and Huxley, and Curtis and Cole, recorded inside the squid axon in 1939, they found that it overshoots to positive values. Something more than a loss of selectivity was going on.

In 1949 Hodgkin and Bernard Katz found that the overshoot depends on external Na⁺. When they replaced part of the sea water around the axon with a solution lacking Na⁺, the peak of the action potential fell, by an amount close to that predicted by the Nernst equation for Na⁺, while the resting potential hardly changed. The **sodium hypothesis** followed: at rest the membrane is mainly permeable to K⁺, and during the impulse it becomes briefly and selectively permeable to Na⁺, so the potential swings towards $E_\mathrm{Na}$. In the language of the chord-conductance equation ([[neuroscience/resting-potential#prop-chord]]), $g_\mathrm{Na}$ rises from a small fraction of $g_\mathrm{K}$ to many times it, and then falls again.

## The voltage clamp

To find out how the Na⁺ and K⁺ conductances change, Hodgkin and Huxley needed to measure them, and here they met a problem of circularity. The conductances depend on voltage, the voltage depends on the currents, and the currents depend on the conductances. During an action potential everything changes at once.

The solution was the **voltage clamp**, developed by Kenneth Cole in 1947 and George Marmont in 1949 and refined by Hodgkin, Huxley and Katz. A long wire electrode is threaded along the inside of the axon, so that the whole length under study is at the same potential (a **space clamp**). A feedback amplifier compares the membrane potential with a command voltage set by the experimenter and injects whatever current is needed to hold the two equal. When the command steps from rest to a new value, the membrane potential steps too and is held there; the current the amplifier must supply is then equal and opposite to the current flowing through the membrane's channels, at a known, fixed voltage. With the voltage fixed, the capacitive current is zero after the first few microseconds, and the measured current is purely ionic.

::: definition Voltage clamp and the ionic currents {#def-clamp}
In a **voltage-clamp** experiment the membrane potential is held at a value chosen by the experimenter and the current needed to hold it there is measured. For the squid axon, a depolarising step produces:

- an early **inward current**, peaking within about a millisecond and then declining even though the voltage is maintained, carried by Na⁺;
- a late **outward current**, rising with a delay and sigmoid time course to a plateau that is maintained for as long as the depolarisation lasts, carried by K⁺.

The decline of the Na⁺ current during maintained depolarisation is **inactivation**. The K⁺ current, which does not inactivate on this time scale, is called the **delayed rectifier**.
:::

Hodgkin and Huxley separated the two currents by changing the ions. Replacing most of the external Na⁺ with the impermeant cation choline abolished the early inward current and left the late outward one; subtracting one record from the other gave the Na⁺ current alone. Later pharmacology made this easier: **tetrodotoxin** (TTX), a toxin of pufferfish, blocks voltage-gated Na⁺ channels from the outside at nanomolar concentrations (Toshio Narahashi, John Moore and William Scott, 1964), and **tetraethylammonium** (TEA) blocks the delayed-rectifier K⁺ channels.

Dividing each current by its driving force, $I_\mathrm{Na}/(V - E_\mathrm{Na})$ and $I_\mathrm{K}/(V - E_\mathrm{K})$, gave the two conductances as functions of time at each clamped voltage. The results were clear:

- Both conductances increase with depolarisation, more steeply and faster the larger the step.
- $g_\mathrm{Na}$ rises fast (a fraction of a millisecond) and then inactivates (a millisecond or a few).
- $g_\mathrm{K}$ rises more slowly, with a sigmoid delay, and does not inactivate.
- On repolarisation, both conductances turn off; $g_\mathrm{K}$ turns off along a simple exponential, without the delay seen on depolarisation.

## The Hodgkin–Huxley model

Hodgkin and Huxley described these results with a set of equations that, they later said, were meant as an empirical description and not a commitment to any mechanism. They imagined that each conductance is controlled by hypothetical **gating particles** that move between permissive and non-permissive positions in the membrane, with rates that depend on voltage.

::: definition Gating variables {#def-gating}
A **gating variable** $x$ (one of $m$, $h$, $n$) is the fraction of gating particles of one kind in the permissive state. It obeys first-order kinetics,

$$
\deriv{x}{t} = \alpha_x(V)\,(1 - x) - \beta_x(V)\,x,
$$ {#eq-gate}

where $\alpha_x$ and $\beta_x$ are voltage-dependent opening and closing rate constants. At a fixed voltage $x$ relaxes exponentially to its **steady-state value** $x_\infty = \alpha_x/(\alpha_x + \beta_x)$ with **time constant** $\tau_x = 1/(\alpha_x + \beta_x)$.
:::

The sigmoid rise of $g_\mathrm{K}$ was fitted by assuming that four independent particles of kind $n$ must all be permissive, so that $g_\mathrm{K} = \bar g_\mathrm{K}\,n^4$; a single exponential raised to the fourth power starts slowly and then accelerates, just as the data did, while on repolarisation it falls along a near-exponential. The Na⁺ conductance needed two kinds of particle: three activating particles $m$, which open quickly on depolarisation, and one inactivating particle $h$, which closes slowly on depolarisation. Then $g_\mathrm{Na} = \bar g_\mathrm{Na}\,m^3h$.

::: proposition The Hodgkin–Huxley equations {#prop-hh}
For a space-clamped patch of membrane with capacitance $C$ per unit area, carrying an applied current $I$ per unit area,

$$
C\deriv{V}{t} = I - \bar g_\mathrm{Na}m^3h\,(V - E_\mathrm{Na}) - \bar g_\mathrm{K}n^4\,(V - E_\mathrm{K}) - g_\mathrm{L}\,(V - E_\mathrm{L}),
$$ {#eq-hh}

with $m$, $h$ and $n$ each obeying [[#eq-gate]]. For the squid axon at 6.3 °C, in the modern convention with the resting potential at −65 mV, the parameters are $C = 1\ \mu\mathrm{F\,cm^{-2}}$, $\bar g_\mathrm{Na} = 120$, $\bar g_\mathrm{K} = 36$ and $g_\mathrm{L} = 0.3$ mS cm⁻², $E_\mathrm{Na} = +50$, $E_\mathrm{K} = -77$ and $E_\mathrm{L} = -54.4$ mV, and (rates in ms⁻¹, $V$ in mV)

$$
\begin{aligned}
\alpha_m &= \frac{0.1(V + 40)}{1 - \mathrm{e}^{-(V + 40)/10}}, & \beta_m &= 4\,\mathrm{e}^{-(V + 65)/18},\\
\alpha_h &= 0.07\,\mathrm{e}^{-(V + 65)/20}, & \beta_h &= \frac{1}{1 + \mathrm{e}^{-(V + 35)/10}},\\
\alpha_n &= \frac{0.01(V + 55)}{1 - \mathrm{e}^{-(V + 55)/10}}, & \beta_n &= 0.125\,\mathrm{e}^{-(V + 65)/80}.
\end{aligned}
$$

The rate constants scale with temperature by a factor $3^{(T - 6.3)/10}$ (a $Q_{10}$ of 3). The term $g_\mathrm{L}(V - E_\mathrm{L})$ is a small voltage-independent **leak**, lumping together Cl⁻ and other minor currents.

Assumptions: the membrane is isopotential (space-clamped), the three gating processes are independent, each follows first-order kinetics, and the open channels are ohmic. The fitted functions are empirical descriptions of the squid axon's voltage-clamp data, not derived from a molecular mechanism.
:::

The power of the model is that nothing in it was fitted to an action potential. The rate functions came only from voltage-clamp records at fixed voltages. When Hodgkin and Huxley solved [[#eq-hh]] numerically, by hand on a mechanical calculator, for a free-running membrane, the action potential appeared, with its threshold, overshoot, undershoot, refractory period and all-or-none behaviour, matching the recorded impulse closely. For a propagating impulse they computed a conduction velocity of 18.8 m s⁻¹, against 21.2 m s⁻¹ measured in the same axon at 18.5 °C.

::: widget plot
f: (0.1*(x+40)/(1-exp(-(x+40)/10)))/((0.1*(x+40)/(1-exp(-(x+40)/10))) + 4*exp(-(x+65)/18)); 0.07*exp(-(x+65)/20)/(0.07*exp(-(x+65)/20) + 1/(1+exp(-(x+35)/10))); (0.01*(x+55)/(1-exp(-(x+55)/10)))/((0.01*(x+55)/(1-exp(-(x+55)/10))) + 0.125*exp(-(x+65)/80))
x: -100, 40
y: 0, 1
labels: m_\infty; h_\infty; n_\infty
vlines: -65
caption: Steady-state values of the three Hodgkin–Huxley gating variables (vertical axis) against membrane potential (horizontal axis, mV), computed from the rate functions of [[#prop-hh]]. The vertical line marks rest at −65 mV, where $m_\infty \approx 0.05$, $h_\infty \approx 0.6$ and $n_\infty \approx 0.3$. Depolarisation raises $m_\infty$ and $n_\infty$ and lowers $h_\infty$. Notice the narrow window around −60 to −50 mV where $m_\infty$ has begun to rise but $h_\infty$ has not yet fallen to zero: in that window a small steady Na⁺ current can flow.
:::

### How the action potential unfolds

The model lets us follow the action potential step by step, and each step comes from the relative speeds of $m$, $h$ and $n$. At −20 mV, for example, the time constants are $\tau_m \approx 0.38$ ms, $\tau_h \approx 1.2$ ms and $\tau_n \approx 2.3$ ms at 6.3 °C: $m$ is several times faster than the other two.

1. **Threshold and upstroke.** A depolarisation increases $m$ quickly. More Na⁺ channels open, Na⁺ flows in, and the membrane depolarises further, which opens more Na⁺ channels. This is a **positive-feedback** loop ([[animal-physiology/homeostasis]]). Threshold is the voltage at which the inward Na⁺ current, growing with depolarisation, begins to exceed the outward K⁺ and leak currents, so that the loop runs away. The potential races towards $E_\mathrm{Na}$.
2. **Peak.** The potential does not reach $E_\mathrm{Na}$, because $h$ has started to fall (inactivation) and $n$ to rise. At the peak, the inward and outward currents balance.
3. **Repolarisation.** With $h$ falling and $n$ rising, $g_\mathrm{K}$ dominates and the potential falls back towards $E_\mathrm{K}$. This is **negative feedback**: the depolarisation itself, after a delay, turns on the current that ends it.
4. **Undershoot.** $n$ closes slowly, so for a few milliseconds $g_\mathrm{K}$ is larger than at rest and the potential sits closer to $E_\mathrm{K}$ than the resting potential does.
5. **Refractory period.** Recovery from inactivation (the rise of $h$) and the closing of $n$ take a few milliseconds. Until enough Na⁺ channels have recovered and the extra $g_\mathrm{K}$ has subsided, a second stimulus cannot reach threshold.

```python
import math

# Hodgkin-Huxley model of a patch of squid axon membrane at 6.3 degC.
# V in mV (rest = -65), t in ms, currents in uA/cm^2, conductances in mS/cm^2.
g_Na, g_K, g_L = 120.0, 36.0, 0.3
E_Na, E_K, E_L = 50.0, -77.0, -54.4
C = 1.0                                   # uF/cm^2

def rates(V):
    """Opening (alpha) and closing (beta) rate constants, ms^-1, for m, h, n."""
    am = 0.1 * (V + 40) / (1 - math.exp(-(V + 40) / 10))
    bm = 4.0 * math.exp(-(V + 65) / 18)
    ah = 0.07 * math.exp(-(V + 65) / 20)
    bh = 1.0 / (1 + math.exp(-(V + 35) / 10))
    an = 0.01 * (V + 55) / (1 - math.exp(-(V + 55) / 10))
    bn = 0.125 * math.exp(-(V + 65) / 80)
    return am, bm, ah, bh, an, bn

V = -65.0
am, bm, ah, bh, an, bn = rates(V)
m, h, n = am / (am + bm), ah / (ah + bh), an / (an + bn)   # start at steady state

dt, peak, t_peak = 0.01, V, 0.0
for step in range(int(20 / dt)):                          # 20 ms
    t = step * dt
    I_stim = 20.0 if t < 1.0 else 0.0                      # 1 ms current pulse
    I_ion = (g_Na * m**3 * h * (V - E_Na) + g_K * n**4 * (V - E_K)
             + g_L * (V - E_L))
    am, bm, ah, bh, an, bn = rates(V)
    m += dt * (am * (1 - m) - bm * m)
    h += dt * (ah * (1 - h) - bh * h)
    n += dt * (an * (1 - n) - bn * n)
    V += dt * (I_stim - I_ion) / C
    if V > peak:
        peak, t_peak = V, t

print(f"peak {peak:.1f} mV at {t_peak:.2f} ms; V at 20 ms = {V:.1f} mV")
# peak 40.8 mV at 1.53 ms; V at 20 ms = -64.6 mV
```

The program uses the simplest (Euler) integration with a small step; changing the stimulus amplitude from 20 to 6 µA cm⁻² for 1 ms gives only a small passive bump, while 7 µA cm⁻² gives a full action potential, which is the all-or-none threshold in action.

::: example A gating variable at a clamped voltage {#ex-gate}
Using the rate functions of [[#prop-hh]], a squid axon membrane is stepped from −65 mV to −20 mV and held there. (a) Calculate $n_\infty$ and $\tau_n$ at −20 mV. (b) Starting from its resting value $n = 0.318$, what is $n$ after 2 ms? (c) What is $g_\mathrm{K}$ at rest and after 2 ms, and by what factor has it risen?
::: solution
(a) At $V = -20$: $\alpha_n = 0.01(35)/(1 - \mathrm{e}^{-3.5}) = 0.35/0.970 = 0.361$ ms⁻¹; $\beta_n = 0.125\,\mathrm{e}^{-45/80} = 0.125\times0.570 = 0.0712$ ms⁻¹. So $n_\infty = 0.361/0.432 = 0.835$ and $\tau_n = 1/0.432 = 2.31$ ms.

(b) $n(t) = n_\infty - (n_\infty - n_0)\,\mathrm{e}^{-t/\tau_n} = 0.835 - (0.835 - 0.318)\,\mathrm{e}^{-2/2.31} = 0.835 - 0.517\times0.420 = 0.618$.

(c) At rest $g_\mathrm{K} = 36\times0.318^4 = 36\times0.0102 = 0.37$ mS cm⁻². After 2 ms, $36\times0.618^4 = 36\times0.146 = 5.2$ mS cm⁻². $n$ has risen by a factor of 1.9, but $g_\mathrm{K}$ by a factor of 14, because of the fourth power. That steep, delayed rise is exactly what the $n^4$ formulation was designed to capture.
:::
:::

### Threshold and excitability in the phase plane

The four-variable Hodgkin–Huxley system is hard to visualise. Richard FitzHugh (1961) and, independently, Jin-ichi Nagumo and colleagues (1962) showed that its essential behaviour survives in a two-variable caricature: a fast variable $v$, playing the role of the membrane potential together with the fast $m$, and a slow recovery variable $w$, standing for Na⁺ inactivation and K⁺ activation together. In the FitzHugh–Nagumo model,

$$
\deriv{v}{t} = v - \frac{v^3}{3} - w + I, \qquad \deriv{w}{t} = 0.08\,(v + 0.7 - 0.8w),
$$

in dimensionless units. The cubic nullcline of $v$ encodes the positive feedback of Na⁺ activation; the slow linear recovery encodes the delayed negative feedback.

::: widget phaseplane
f: x - x^3/3 - y + I
g: 0.08*(x + 0.7 - 0.8*y)
x: -2.5, 2.5
y: -1, 2
sliders: I=0:0:1.5:0.05
points: -0.75, -0.62; -0.55, -0.62
caption: The FitzHugh–Nagumo model: the horizontal axis is the fast, voltage-like variable $v$ and the vertical axis the slow recovery variable $w$, with the cubic $v$-nullcline and the straight $w$-nullcline drawn. At $I = 0$ the resting state is the stable equilibrium where they cross, near $(-1.2, -0.62)$. The two trajectories start from small and slightly larger depolarisations from rest: the first returns directly (subthreshold), the second makes a long excursion around the cubic (an action potential) before returning. The threshold is the middle branch of the cubic. Now raise $I$, a sustained stimulating current: above about 0.33 the equilibrium becomes unstable and a limit cycle appears, which is repetitive firing. Above about 1.42 the oscillation stops again and the system sits at a depolarised equilibrium, the model's version of depolarisation block. Click to start other trajectories.
:::

The phase plane makes threshold, all-or-none behaviour and refractoriness geometric. Starting points to the left of the middle branch of the cubic return straight to rest; those to the right are carried around the full excursion. Immediately after an impulse the trajectory is high up on the slow variable, where no small push in $v$ can cross the threshold branch: that is the refractory period. A sustained current shifts the cubic upwards until the resting equilibrium loses stability and the system oscillates, as real neurons fire repetitively when given a maintained depolarisation.

::: example How many sodium ions enter? {#ex-sodium}
The squid axon has a diameter of 500 µm and contains 50 mmol L⁻¹ Na⁺. (a) What is the minimum Na⁺ entry, per cm² of membrane, needed to depolarise it by 100 mV during an action potential? (b) By how much does this raise the internal Na⁺ concentration? (c) Measurements with radioactive ²⁴Na⁺ give an entry of about 4 pmol cm⁻² per impulse at about 20 °C. Why is this larger than the minimum, and how many impulses could the axon conduct with its pump blocked before its internal Na⁺ rose by 10 %?
::: solution
(a) The charge needed is $Q = C_\mathrm{m}\Delta V = 10^{-6}\ \mathrm{F\,cm^{-2}}\times0.1\ \mathrm{V} = 10^{-7}$ C cm⁻². Dividing by the Faraday constant, $10^{-7}/96{,}485 = 1.0\times10^{-12}$ mol cm⁻² $= 1.0$ pmol cm⁻².

(b) A cylinder of radius $r$ has volume per unit area of membrane $\pi r^2L/(2\pi rL) = r/2 = 125\ \mu\mathrm{m} = 0.0125$ cm. The concentration rise is $1.0\times10^{-12}\ \mathrm{mol}/0.0125\ \mathrm{cm^3} = 8\times10^{-11}$ mol cm⁻³ $= 8\times10^{-8}$ mol L⁻¹, or 0.08 µmol L⁻¹, about two parts in a million of the 50 mmol L⁻¹ present.

(c) During the real impulse the Na⁺ and K⁺ conductances overlap in time, so some Na⁺ entry is cancelled by simultaneous K⁺ exit and does not contribute to charging the membrane. (Simulating [[#prop-hh]] at 18.5 °C gives about 4 pmol cm⁻², four times the minimum.) With 4 pmol cm⁻² per impulse, each impulse raises internal Na⁺ by $4\times10^{-12}/0.0125 = 3.2\times10^{-10}$ mol cm⁻³ $= 0.32$ µmol L⁻¹. A 10 % rise, 5 mmol L⁻¹, takes $5\times10^{-3}/3.2\times10^{-7} \approx 16{,}000$ impulses. This is why a giant axon with its pump poisoned can still conduct for many thousands of impulses; a thin mammalian axon, with far less volume per area, runs down much faster.
:::
:::

::: warning "The action potential is caused by the sodium pump" and "ions flood in and out"
The pump does not produce the action potential; the action potential is produced by passive flow of ions through voltage-gated channels down gradients that the pump established beforehand. Blocking the pump leaves impulses unaffected for thousands of impulses in large axons. Nor do ions "flood": as [[#ex-sodium]] shows, the concentration changes during one impulse are tiny. What changes is the conductance, and with it the voltage. A second error is to think that the potential reaches $E_\mathrm{Na}$ at the peak; it stops short, because inactivation and K⁺ activation begin before the peak.
:::

## The channels behind the equations

Hodgkin and Huxley's particles were abstractions, but they implied concrete predictions. If gating is controlled by charged particles moving in the membrane's electric field, their movement should produce a tiny current of its own. Clay Armstrong and Francisco Bezanilla detected these **gating currents** in the squid axon in 1973. And if conductance comes from discrete channels, it should change in discrete steps. Erwin Neher and Bert Sakmann's patch clamp (1976) showed exactly this: a single voltage-gated channel flickers between closed and open states, passing a current of a picoampere or so when open, and the smooth macroscopic currents of the voltage clamp are the averages of thousands of such random events.

::: definition Voltage-gated ion channels {#def-channels}
**Voltage-gated K⁺ (Kv) channels** are tetramers of four subunits, each with six membrane-spanning segments (S1–S6). Segments S5 and S6 and the loop between them, from all four subunits, line the central pore and its **selectivity filter**; segments S1–S4 of each subunit form a **voltage-sensing domain**, in which S4 carries a positively charged residue (arginine or lysine) at every third position. **Voltage-gated Na⁺ (Nav) and Ca²⁺ (Cav) channels** have the same architecture, but their four domains are joined into a single long polypeptide. Depolarisation moves the S4 segments outward, and this movement is coupled to the opening of the gate at the cytoplasmic end of the pore.
:::

The first sequence came from the Na⁺ channel of the electric organ of the electric eel, cloned by Masaharu Noda, Shosaku Numa and colleagues in 1984. The first K⁺ channel came from *Drosophila*: flies carrying *Shaker* mutations shake their legs under ether anaesthesia, and the gene was cloned in 1987 by the laboratories of Lily and Yuh Nung Jan and of Mark Tanouye. The structure of a bacterial K⁺ channel, KcsA, solved by Roderick MacKinnon's group in 1998, showed how the selectivity filter works: a ring of carbonyl oxygens spaced so as to mimic the water molecules around a dehydrated K⁺ ion, so that K⁺ can shed its water at little energetic cost while the smaller Na⁺ cannot be coordinated as well. A mammalian Kv channel structure followed in 2005.

Inactivation also has a structure. In 1973 Armstrong, Bezanilla and Eduardo Rojas showed that the protease pronase, applied inside the squid axon, abolishes Na⁺ inactivation without affecting activation: inactivation is a separate process, consistent with the separate $h$ particle, and in 1977 Armstrong and Bezanilla proposed that it is caused by a tethered particle that plugs the open channel from the inside. In *Shaker* K⁺ channels, which do inactivate, Toshinori Hoshi, William Zagotta and Richard Aldrich (1990) showed that deleting the first twenty or so amino acids of each subunit removes rapid inactivation, and that adding the peptide back to the inside restores it. This is the **ball-and-chain** mechanism: a tethered peptide swings into the open pore and plugs it. In Na⁺ channels a short cytoplasmic loop between domains III and IV, containing three hydrophobic residues (IFM), plays a similar role.

::: warning "Each Na⁺ channel has three m gates and one h gate"
The $m^3h$ and $n^4$ formulations fit the data well, and the tetrameric K⁺ channel, with four voltage sensors, gives the $n^4$ a pleasing physical counterpart. But the details do not hold literally. The voltage sensors of a channel are not fully independent, Na⁺ channel inactivation is coupled to activation rather than independent of it (a channel inactivates mainly after its sensors have moved, and often from the open state), and real channels have more states than the model has particles. The Hodgkin–Huxley model is a superb phenomenological description, and modern channel models are kinetic schemes (Markov models) with explicit closed, open and inactivated states.
:::

Squid axons use only two kinds of voltage-gated channel. Most neurons use many more. Mammals have nine Nav α-subunit genes and about forty Kv genes, plus Ca²⁺ channels, Ca²⁺-activated K⁺ channels, hyperpolarisation-activated (HCN) channels and others. Their combinations shape each neuron's firing pattern: regular, bursting, fast-spiking or adapting. Some cells generate action potentials with other ions altogether: the muscle fibres of crayfish and barnacles produce Ca²⁺ action potentials (Paul Fatt and Bernard Ginsborg, 1958; Susumu Hagiwara and colleagues in the 1960s), and the giant cells of the alga *Chara* produce slow action potentials carried by Cl⁻ efflux triggered by Ca²⁺ entry. Mammalian axons, unlike the squid axon, separate Na⁺ and K⁺ currents more cleanly in time, so that their impulses waste less Na⁺, a refinement that saves energy.

::: application Toxins and the study of channels
Many animals use toxins that target voltage-gated channels, for defence or to subdue prey: tetrodotoxin in pufferfish and some newts, saxitoxin in dinoflagellates, and a large variety of peptide toxins in cone snails, scorpions and spiders. Because they bind so specifically, these molecules became the tools with which channels were purified, counted and mapped. Local anaesthetics act by blocking Na⁺ channels from the inside, and several inherited human disorders of muscle, heart and brain are caused by mutations in channel genes. Their clinical aspects are covered in [Medicine Atlas: neuromuscular disorders](/learn/medicine/lesson.php?c=nervous-system&l=neuromuscular) and [Medicine Atlas: epilepsy](/learn/medicine/lesson.php?c=nervous-system&l=epilepsy).
:::

## Propagation along the axon

An action potential at one point of an axon depolarises the neighbouring membrane by passive current flow. Current entering at the active region flows along the inside of the axon in both directions, leaks out across the membrane ahead, and depolarises it. When that depolarisation reaches threshold, the neighbouring membrane fires, and so on. The impulse does not run backwards, because the membrane behind it is refractory.

How far does passive current spread? Treat the axon as a long cylinder, a **cable**, with resistance $r_\mathrm{i}$ per unit length along its core and a membrane with resistance $r_\mathrm{m}$ times unit length (that is, the membrane resistance of a unit length is $r_\mathrm{m}$ divided by that length) and capacitance $c_\mathrm{m}$ per unit length.

::: proposition Passive spread along a cable {#prop-cable}
For an axon or dendrite of radius $a$, with specific membrane resistance $R_\mathrm{m}$ (Ω cm²) and resistivity of the cytoplasm $R_\mathrm{i}$ (Ω cm), the per-length parameters are $r_\mathrm{m} = R_\mathrm{m}/2\pi a$ and $r_\mathrm{i} = R_\mathrm{i}/\pi a^2$. The voltage $V(x, t)$ (deviation from rest) obeys the **cable equation**

$$
\lambda^2\frac{\partial^2V}{\partial x^2} = \tau\frac{\partial V}{\partial t} + V, \qquad \lambda = \sqrt{\frac{r_\mathrm{m}}{r_\mathrm{i}}} = \sqrt{\frac{R_\mathrm{m}\,a}{2R_\mathrm{i}}}, \qquad \tau = R_\mathrm{m}C_\mathrm{m}.
$$ {#eq-cable}

In the steady state, a voltage $V_0$ held at one point of an infinitely long cable decays with distance as

$$
V(x) = V_0\,\mathrm{e}^{-\lvert x\rvert/\lambda}.
$$ {#eq-decay}

The **length constant** $\lambda$ grows with the square root of the radius. Assumptions: a uniform passive membrane (no voltage-gated channels), a uniform cylinder, and negligible resistance outside the axon.
:::

::: proof {collapsed}
Consider a short segment of length $\Delta x$. Ohm's law along the core gives $\partial V/\partial x = -r_\mathrm{i}\,i_\mathrm{i}$, where $i_\mathrm{i}$ is the axial current. Current conservation says that the axial current lost over the segment leaves through the membrane, as capacitive plus resistive current: $-\partial i_\mathrm{i}/\partial x = c_\mathrm{m}\,\partial V/\partial t + V/r_\mathrm{m}$. Differentiating the first relation and substituting, $(1/r_\mathrm{i})\,\partial^2V/\partial x^2 = c_\mathrm{m}\,\partial V/\partial t + V/r_\mathrm{m}$. Multiplying by $r_\mathrm{m}$ gives [[#eq-cable]] with $\lambda^2 = r_\mathrm{m}/r_\mathrm{i}$ and $\tau = r_\mathrm{m}c_\mathrm{m} = R_\mathrm{m}C_\mathrm{m}$. In the steady state the time derivative vanishes, leaving $\lambda^2V'' = V$, whose solution bounded at infinity is [[#eq-decay]]. Substituting the per-length parameters gives $\lambda^2 = (R_\mathrm{m}/2\pi a)/(R_\mathrm{i}/\pi a^2) = R_\mathrm{m}a/2R_\mathrm{i}$.
:::

Cable theory was worked out for the transatlantic telegraph by William Thomson (later Lord Kelvin) in 1855 and applied to nerve by Hodgkin and William Rushton, who measured the length constant of lobster axons in 1946.

::: example Length constants of an axon and a dendrite {#ex-lambda}
(a) The squid giant axon has a radius of 238 µm, $R_\mathrm{i} = 35.4\ \Omega$ cm, and a resting membrane conductance of 0.68 mS cm⁻² ($R_\mathrm{m} = 1470\ \Omega\,\mathrm{cm^2}$). Calculate $\lambda$. (b) A mammalian dendrite has a diameter of 1 µm, $R_\mathrm{m} = 20{,}000\ \Omega\,\mathrm{cm^2}$ and $R_\mathrm{i} = 150\ \Omega$ cm. Calculate $\lambda$, and the fraction of a steady synaptic depolarisation that reaches the soma 200 µm away, treating the dendrite as infinitely long.
::: solution
(a) $\lambda = \sqrt{1470\times0.0238/(2\times35.4)} = \sqrt{0.494}$ cm $= 0.70$ cm, about 7 mm.

(b) $a = 0.5\ \mu\mathrm{m} = 5\times10^{-5}$ cm, so $\lambda = \sqrt{20{,}000\times5\times10^{-5}/300} = \sqrt{3.33\times10^{-3}}$ cm $= 0.058$ cm $= 577$ µm. At 200 µm, $\mathrm{e}^{-200/577} = 0.71$, so about 70 % of a steady depolarisation reaches the soma. Brief synaptic potentials attenuate more than steady ones, because the membrane capacitance filters fast signals; and real dendrites, which branch and end, behave differently from an infinite cable. The calculation nevertheless shows why passive spread works within a dendritic tree of a few hundred micrometres but not along an axon of a metre: after 1 m, $\mathrm{e}^{-1/0.0058}$ is effectively zero. Long-distance signalling must be regenerative.
:::
:::

How fast does the impulse travel? A rigorous answer requires solving the full Hodgkin–Huxley equations on a cable, but a scaling argument gives the key result.

::: proposition Conduction velocity of unmyelinated axons {#prop-velocity}
For unmyelinated axons with the same membrane properties and cytoplasm, the conduction velocity $\theta$ is proportional to the square root of the diameter:

$$
\theta \propto \sqrt{a}.
$$

Reason: the impulse advances by a distance proportional to the length constant $\lambda \propto \sqrt{a}$ in a time set by the membrane's own kinetics and time constant, which do not depend on diameter. Assumptions: geometrically similar axons, identical channel densities and kinetics per unit area, identical $R_\mathrm{i}$ and $C_\mathrm{m}$.
:::

The square-root law explains the giant axons of squid, crayfish and earthworms, which carry escape signals: speed is bought with diameter, but expensively. To double the velocity, the axon must be four times as wide, with sixteen times the cross-sectional area. A squid giant axon of about 0.5 mm conducts at about 20 m s⁻¹ at sea temperature; a mammalian unmyelinated C-fibre of about 1 µm conducts at roughly 1 m s⁻¹ at body temperature.

### Myelin and saltatory conduction

Vertebrates found a better solution. A myelin sheath ([[neuroscience/neurons-glia#def-myelin]]) wraps the axon in many layers of membrane, which in cable terms multiplies $r_\mathrm{m}$ by the number of layers and divides $c_\mathrm{m}$ by about the same factor. Little current leaks or is spent charging the membrane under the sheath, so the passive spread from one node of Ranvier reaches the next node, 0.2–2 mm away, almost undiminished and very fast. Voltage-gated Na⁺ channels are concentrated at the nodes at densities of the order of 1000 per µm², and the impulse is regenerated only there. It appears to jump from node to node: **saltatory conduction**, from the Latin *saltare*, to leap. Ichiji Tasaki demonstrated it in single frog fibres in 1939, and Andrew Huxley and Robert Stämpfli confirmed it with current measurements in 1949.

Saltatory conduction changes the scaling law. Internode length is proportional to fibre diameter, and so, approximately, is velocity. Joseph Hursh found in 1939, in cat nerves, that conduction velocity in metres per second is about six times the outer fibre diameter in micrometres. A 10 µm fibre therefore conducts at about 60 m s⁻¹, and the largest mammalian fibres, about 20 µm, at about 120 m s⁻¹.

How thick should the sheath be? For a fibre of fixed outer diameter $D$, a thicker sheath insulates better but leaves less room for the axon, whose core resistance then rises.

::: proposition The optimal g-ratio {#prop-gratio}
Model a myelinated fibre of outer diameter $D$ and axon diameter $d = gD$. Suppose that the time to charge the next node is proportional to the product of the internode's axial resistance $r_\mathrm{i}L \propto L/d^2$ and its myelin capacitance $c L$, with $c \propto 1/\ln(D/d)$ for a thick cylindrical insulator, and that internode length $L$ is proportional to $D$. Then the velocity $\theta = L/t$ satisfies

$$
\theta \propto D\,g^2\ln\frac{1}{g},
$$ {#eq-gratio}

which, for fixed $D$, is greatest when $g = \mathrm{e}^{-1/2} \approx 0.61$.

Assumptions: conduction time dominated by the charging of the internode; nodal properties and internode length scaling as stated; myelin thick enough to be treated as a coaxial insulator. William Rushton (1951), with a somewhat different argument, reached the same optimum.
:::

::: proof
With $r_\mathrm{i} \propto 1/d^2$, $c \propto 1/\ln(1/g)$ and $L \propto D$, the charging time is $t \propto r_\mathrm{i}c L^2 \propto D^2/[d^2\ln(1/g)]$, so $\theta = L/t \propto D\,d^2\ln(1/g)/D^2 = D\,g^2\ln(1/g)$. Differentiating $f(g) = g^2\ln(1/g) = -g^2\ln g$ gives $f'(g) = -2g\ln g - g = -g(2\ln g + 1)$, which is zero when $\ln g = -1/2$. Since $f$ is zero at $g \to 0$ and at $g = 1$ and positive between, this is the maximum.
:::

::: widget plot
f: x^2*ln(1/x)/0.18394
x: 0.02, 1
y: 0, 1.1
labels: \text{relative velocity}
vlines: 0.607
caption: Relative conduction velocity of a myelinated fibre of fixed outer diameter (vertical axis, scaled so that the maximum is 1) against the g-ratio $d/D$ (horizontal axis), from [[#eq-gratio]]. The optimum lies at $g = \mathrm{e}^{-1/2} \approx 0.61$ (vertical line), but the curve is flat near its top: anywhere between about 0.45 and 0.75 gives at least 85 % of the maximum. Measured g-ratios in peripheral nerves, about 0.6–0.7, sit in this plateau; central fibres, often near 0.75–0.8, trade a little speed for less volume of myelin.
:::

The curve is flat near its maximum, so the prediction is a broad range rather than a sharp value, and measured g-ratios, about 0.6–0.7 in many peripheral nerves, fall within it. The agreement is encouraging, but a model this simple cannot explain everything: central fibres often have thinner sheaths than the optimum for speed, perhaps because myelin is metabolically and volumetrically expensive in a crowded brain.

::: example A reflex arc {#ex-reflex}
In a tendon-jerk reflex, sensory fibres of about 15 µm outer diameter carry impulses 0.8 m from a muscle to the spinal cord, and motor fibres of about 12 µm carry them 0.8 m back. Using Hursh's factor of 6 m s⁻¹ per µm, and allowing 1 ms for synaptic transmission in the cord and 1 ms at the neuromuscular junction, estimate the delay between tapping the tendon and the start of the muscle's electrical response. How much longer would it take if both pathways were unmyelinated C-fibres conducting at 1 m s⁻¹?
::: solution
Sensory velocity $6\times15 = 90$ m s⁻¹: $0.8/90 = 8.9$ ms. Motor velocity $6\times12 = 72$ m s⁻¹: $0.8/72 = 11.1$ ms. Total $8.9 + 11.1 + 1 + 1 = 22$ ms, close to the measured latencies of the knee-jerk in adult humans (around 20 ms), which also include the time for the receptors to fire. With C-fibres the two journeys would take $0.8/1 = 0.8$ s each, giving a reflex delay of about 1.6 s, useless for the rapid control of posture. The reflex circuit itself is the subject of [[neuroscience/motor-systems]].
:::
:::

::: quiz
Which change would increase the length constant of an unmyelinated axon?
- [ ] Opening more K⁺ leak channels in its membrane.
- [x] Doubling its diameter.
- [ ] Increasing its membrane capacitance.
- [ ] Increasing the resistivity of its cytoplasm.
::: solution
From [[#eq-cable]], $\lambda = \sqrt{R_\mathrm{m}a/2R_\mathrm{i}}$. Doubling the radius increases $\lambda$ by $\sqrt2$. Opening leak channels lowers $R_\mathrm{m}$ and shortens $\lambda$; a higher cytoplasmic resistivity also shortens it. Capacitance does not appear in the steady-state length constant at all; it affects the time course (through $\tau$) and slows conduction, but not the steady decay with distance.
:::
:::

### Temperature and conduction

The Hodgkin–Huxley rate constants increase threefold for each 10 °C rise in temperature. Channels open and close faster in the warm, the action potential gets briefer, and conduction speeds up, which is one reason why mammals and birds conduct impulses faster than ectotherms of the same size. Above a certain temperature, however, the action potential fails: the K⁺ conductance rises so quickly that it cuts short the Na⁺ upstroke before threshold is crossed. Cooling, conversely, slows and eventually blocks conduction, which is why cold makes your fingers clumsy.

::: history
Luigi Galvani showed in 1791 that frog nerves and muscles respond to electricity, and Emil du Bois-Reymond recorded the "negative variation" of the nerve current in the 1840s; Hermann von Helmholtz measured the speed of conduction in frog nerve in 1850, at about 30 m s⁻¹, which showed that nervous signals are not instantaneous. Edgar Adrian established the all-or-none character of impulses in single sensory fibres in the 1920s. John Zachary Young introduced the squid giant axon as an experimental preparation in 1936. Hodgkin and Huxley recorded the overshoot in 1939; Hodgkin and Katz proposed the sodium hypothesis in 1949; and Hodgkin and Huxley's five papers of 1952 in the *Journal of Physiology* presented the voltage-clamp analysis and the model. Hodgkin, Huxley and John Eccles shared the Nobel Prize in Physiology or Medicine in 1963. Tasaki (1939) and Huxley and Stämpfli (1949) established saltatory conduction. Armstrong and Bezanilla measured gating currents in 1973, Neher and Sakmann recorded single channels in 1976 (Nobel Prize 1991), Noda and Numa cloned the Na⁺ channel in 1984, and MacKinnon's group solved the K⁺ channel structure in 1998 (Nobel Prize in Chemistry 2003).
:::

## Where this leads

When an action potential reaches the terminals of an axon, it opens voltage-gated Ca²⁺ channels, and the Ca²⁺ that enters triggers the release of transmitter. That is the subject of [[neuroscience/synapses]]. The cable equation will return there too, to explain how synaptic potentials spread through dendrites and are summed at the initial segment, where the next action potential begins.

::: summary
- The action potential is a threshold, all-or-none, regenerative reversal of the membrane potential (≈ 100 mV, ≈ 1 ms), followed by an after-hyperpolarisation and a refractory period.
- The voltage clamp (Cole, Hodgkin, Huxley, Katz) separated an early, inactivating Na⁺ current from a delayed, sustained K⁺ current.
- The Hodgkin–Huxley model, $C\,\dd V/\dd t = I - \bar g_\mathrm{Na}m^3h(V - E_\mathrm{Na}) - \bar g_\mathrm{K}n^4(V - E_\mathrm{K}) - g_\mathrm{L}(V - E_\mathrm{L})$ with first-order gating, reproduces the impulse and its speed from voltage-clamp data alone.
- The upstroke is positive feedback through Na⁺ activation; repolarisation is delayed negative feedback through Na⁺ inactivation and K⁺ activation; refractoriness is the time to recover.
- Voltage-gated channels have four voltage-sensing domains with charged S4 segments around a central pore; K⁺ selectivity comes from a filter of carbonyl oxygens; inactivation is a separate, ball-and-chain or hinged-lid process.
- Passive spread decays with the length constant $\lambda = \sqrt{R_\mathrm{m}a/2R_\mathrm{i}}$ (millimetres in large axons, hundreds of micrometres in dendrites), so long-distance signals must be regenerated.
- Unmyelinated conduction velocity scales as $\sqrt{\text{diameter}}$; myelinated, saltatory conduction scales roughly linearly (≈ 6 m s⁻¹ per µm of fibre diameter in mammals), with an optimal g-ratio near 0.6.
:::

## Exercises

::: exercise The cost of one impulse {level=1 check="0.6"}
A neuron's membrane must be depolarised by 60 mV during an impulse, with $C_\mathrm{m} = 1\ \mu\mathrm{F\,cm^{-2}}$. What is the minimum Na⁺ entry in pmol cm⁻² (one significant figure)?
::: solution
$Q = 10^{-6}\times0.060 = 6\times10^{-8}$ C cm⁻²; $6\times10^{-8}/96{,}485 = 6.2\times10^{-13}$ mol cm⁻² $\approx 0.6$ pmol cm⁻².
:::
:::

::: exercise Scaling conduction velocity {level=1 check="4"}
An unmyelinated axon of diameter 4 µm conducts at 2 m s⁻¹. By what factor must its diameter be multiplied to double its conduction velocity, assuming $\theta \propto \sqrt{d}$?
::: solution
$\theta \propto \sqrt d$, so doubling $\theta$ requires $d$ to be multiplied by $2^2 = 4$, giving 16 µm.
:::
:::

::: exercise Steady state and time constant {level=1}
Using [[#def-gating]], explain why a gating variable with $\alpha = 3$ ms⁻¹ and $\beta = 1$ ms⁻¹ at some voltage reaches 0.75 of its maximum at steady state, and how long it takes to get 63 % of the way there from 0.
::: solution
$x_\infty = \alpha/(\alpha + \beta) = 3/4 = 0.75$ and $\tau = 1/(\alpha + \beta) = 0.25$ ms. Starting from 0, $x(t) = 0.75(1 - \mathrm{e}^{-t/\tau})$, which reaches 63 % of 0.75 (that is, 0.47) after one time constant, 0.25 ms.
:::
:::

::: exercise A long dendrite {level=2 check="0.42"}
For the dendrite of [[#ex-lambda]] ($\lambda = 577$ µm), what fraction of a steady depolarisation remains 500 µm from where it is applied (two decimal places)? What would the fraction be if the dendrite were 4 µm in diameter instead of 1 µm?
::: solution
$\mathrm{e}^{-500/577} = \mathrm{e}^{-0.867} = 0.42$. A fourfold larger diameter doubles $\lambda$ to 1155 µm, giving $\mathrm{e}^{-500/1155} = 0.65$.
:::
:::

::: exercise Interpreting a voltage-clamp experiment {level=2}
A squid axon is voltage-clamped and stepped from −65 mV to 0 mV. (a) Describe the current recorded in normal sea water. (b) What would you record after adding TTX? (c) After replacing external Na⁺ so that $E_\mathrm{Na}$ becomes 0 mV, but without TTX? (d) A step to +60 mV in normal sea water ($E_\mathrm{Na} = +50$ mV) gives a small early **outward** current instead of an inward one. Explain.
::: solution
(a) A brief capacitive transient, then an early inward current peaking at about half a millisecond and declining over a few milliseconds (Na⁺ activating and inactivating), followed by a delayed outward current rising sigmoidally to a maintained plateau (K⁺). (b) TTX removes the early inward current, leaving the delayed outward K⁺ current. (c) With $V = E_\mathrm{Na}$ the driving force on Na⁺ is zero, so no Na⁺ current flows even though the Na⁺ channels open; only the outward K⁺ current is seen. This was Hodgkin and Huxley's way of isolating the K⁺ current. (d) At +60 mV the membrane is more positive than $E_\mathrm{Na}$, so the driving force $V - E_\mathrm{Na}$ is positive and Na⁺ flows **out** through the open channels: the early current reverses at $E_\mathrm{Na}$, which is strong evidence that it is carried by Na⁺.
:::
:::

::: exercise Refractoriness and maximum firing rate {level=2}
A mammalian axon has an absolute refractory period of 0.8 ms and a relative refractory period lasting a further 3 ms. (a) What is the theoretical maximum firing rate? (b) Why do neurons rarely fire at this rate for long? (c) Explain, using the gating variables, why the relative refractory period exists.
::: solution
(a) At most one impulse per 0.8 ms, about 1250 s⁻¹. (b) At such rates each impulse falls in the relative refractory period of the last, needing a stronger stimulus and producing a smaller impulse; Na⁺ channels accumulate in the inactivated state, internal Na⁺ and external K⁺ accumulate, and transmitter release at the terminals depresses. Sustained rates of a few hundred per second are the practical limit, and only for specialised neurons. (c) After an impulse $h$ is low (many Na⁺ channels inactivated) and $n$ is high (extra K⁺ conductance). Both relax back over a few milliseconds. Until they have, fewer Na⁺ channels are available to open and more outward K⁺ current opposes depolarisation, so a larger stimulus is needed to reach the point at which inward current exceeds outward current.
:::
:::

::: exercise Myelinated versus unmyelinated {level=2}
A myelinated mammalian axon has an outer diameter of 2 µm; an unmyelinated one has a diameter of 2 µm and conducts at 1.4 m s⁻¹. (a) Estimate the velocity of the myelinated fibre. (b) Estimate the diameter an unmyelinated axon would need to match it. (c) Explain why, for very small diameters (below roughly 0.2–1 µm), unmyelinated axons are the better design.
::: solution
(a) $6\times2 = 12$ m s⁻¹. (b) With $\theta \propto \sqrt d$, $(12/1.4)^2 = 73$, so about $2\times73 \approx 150$ µm. (c) As the fibre shrinks, the myelin sheath takes up an increasing share of the cross-section, nodes cannot shrink in proportion, and the internodes become very short, so the advantage of saltatory conduction diminishes; below a crossover diameter, estimated theoretically by Rushton at around 1 µm and by later work at around 0.2 µm, an unmyelinated axon of the same total diameter conducts as fast or faster. That is why the thinnest axons in mammals, such as many C-fibres and the parallel fibres of the cerebellum, are unmyelinated.
:::
:::

::: exercise Temperature and the action potential {level=3 check="7.6"}
The Hodgkin–Huxley rate constants have a $Q_{10}$ of 3. (a) By what factor are all rates multiplied when a squid axon model, specified at 18.5 °C, is warmed to 37 °C (one decimal place)? (b) If the action potential at 18.5 °C lasts about 0.5 ms, roughly how long would it last at 37 °C if nothing else changed? (c) Real mammalian action potentials last about 0.3–1 ms at 37 °C. What does this suggest about mammalian channels compared with squid channels?
::: solution
(a) $3^{(37 - 18.5)/10} = 3^{1.85} = 7.6$. (b) All time scales shrink by the same factor, so about $0.5/7.6 \approx 0.07$ ms. In practice the squid model fails to fire at such temperatures, because K⁺ activation catches up with Na⁺ activation. (c) Mammalian channels are not simply squid channels run warm: their kinetics are slower at a given temperature, matched to body temperature, and their particular combination of Nav and Kv isoforms produces action potentials of a duration that works at 37 °C. The temperature dependence also shows why ectotherms acclimated to different temperatures change their channel expression.
:::
:::

::: exercise Threshold from the equations {level=3}
At the resting potential of the Hodgkin–Huxley model, the conductances are $g_\mathrm{Na} \approx 0.011$, $g_\mathrm{K} \approx 0.37$ and $g_\mathrm{L} = 0.3$ mS cm⁻². (a) Use the chord-conductance equation to check that the resting potential is about −65 mV. (b) A brief 1 ms current pulse of 6 µA cm⁻² fails to fire the model and one of 7 µA cm⁻² succeeds. Estimate the depolarisation reached at the end of each pulse, ignoring ionic currents during the pulse. (c) Explain qualitatively why threshold is not a fixed voltage but depends on how fast the membrane is depolarised.
::: solution
(a) $V = (0.011\times50 + 0.37\times(-77) + 0.3\times(-54.4))/(0.011 + 0.37 + 0.3) = (0.55 - 28.49 - 16.32)/0.681 = -44.26/0.681 = -65.0$ mV.

(b) Charge delivered $= I\times t$: 6 nC cm⁻² and 7 nC cm⁻², which on 1 µF cm⁻² give 6 and 7 mV. The threshold for a 1 ms pulse is therefore a depolarisation of about 6–7 mV from rest, to about −58 mV. (Ionic currents during the pulse reduce the real depolarisation a little.)

(c) At threshold, inward Na⁺ current must outrun outward K⁺ and leak current. A slow depolarisation gives $h$ time to fall (inactivation) and $n$ time to rise before $m$ has done much, so more depolarisation is needed, or none suffices: slowly rising currents can fail to fire a neuron at all (**accommodation**). A fast depolarisation catches $m$ ahead of $h$ and $n$. Threshold is a property of the dynamics, the boundary in the phase plane of the FitzHugh–Nagumo figure, not a fixed number on the voltage axis.
:::
:::
