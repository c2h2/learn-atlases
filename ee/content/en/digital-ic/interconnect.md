In the early days of integrated circuits a wire was an ideal connection: its delay was negligible next to the gates it joined. That stopped being true in the 1990s. Every process generation since has made transistors faster, but has made the wires connecting them narrower, so that their resistance per unit length rises while their capacitance per unit length stays about the same. Today a signal crossing a few millimetres of a chip on its lowest metal layers would take many clock cycles without help, and the wires — more than ten levels of them, totalling kilometres per square centimetre — set the delay of critical paths, much of the dynamic power, and the area of large designs.

This chapter treats interconnect as a circuit element. We start from the geometry of a wire to find its **resistance**, **capacitance** and, for wide global wires, **inductance**. A wire with distributed resistance and capacitance is a diffusion line, not a simple RC, and we derive its delay. The **Elmore delay** then gives a simple, provable estimate for any tree of resistors and capacitors, which we use to analyse a gate driving a wire. For long wires the remedy is to insert **repeaters**, and we find their optimal number and size. We close with **crosstalk**: coupling between neighbouring wires, which injects noise and makes delay depend on what the neighbours are doing. The metallisation process is described in [[digital-ic/cmos-fabrication]] and the gate delay model in [[digital-ic/cmos-inverter]]; transmission-line theory, which takes over when inductance dominates, is in [[electromagnetics/transmission-lines]].

## Resistance

A wire of length $L$, width $w$ and thickness $t$, made of a conductor of resistivity $\rho$, has resistance

$$
R = \frac{\rho L}{wt} = R_\square\,\frac{L}{w}, \qquad R_\square = \frac{\rho}{t}.
$$ {#eq-wire-r}

::: definition Sheet resistance {#def-sheet}
The **sheet resistance** $R_\square = \rho/t$ of a conducting layer of uniform thickness $t$ is the resistance of any square piece of it, measured between opposite edges; it is quoted in ohms per square ($\Omega/\square$). A wire of length $L$ and width $w$ on that layer contains $L/w$ squares and has resistance $R_\square L/w$.
:::

The resistance of a square is independent of its size: doubling the side doubles the length but also the width. Sheet resistance is the natural unit for layout, where the thickness is fixed by the process and the designer chooses only lengths and widths.

Bulk copper has $\rho = 1.7\,\mu\Omega\cdot\mathrm{cm}$, but nanometre-scale copper wires are much worse, for three reasons. The barrier and liner layers needed to stop copper diffusing into the dielectric (a few nanometres of tantalum nitride and tantalum, or cobalt) are poor conductors and occupy a growing fraction of the cross-section. Electrons scatter from the wire's surfaces and from grain boundaries, whose spacing shrinks with the wire width, once the dimensions approach copper's electron mean free path of about $40\,\mathrm{nm}$. And the cross-section shrinks quadratically with feature size. As of 2026 the effective resistivity of the narrowest copper lines is several times the bulk value, and the lowest levels of leading processes use or are moving to metals such as cobalt, ruthenium and molybdenum, whose shorter mean free paths and thinner barriers make them competitive at those widths.

::: example Resistance of local and global wires {#ex-wire-r}
Find the resistance per micrometre of (a) a lower-level wire $50\,\mathrm{nm}$ wide and $100\,\mathrm{nm}$ thick with effective resistivity $4\,\mu\Omega\cdot\mathrm{cm}$; (b) an intermediate wire $100\,\mathrm{nm}$ wide and $200\,\mathrm{nm}$ thick at $3\,\mu\Omega\cdot\mathrm{cm}$; (c) a top-level global wire $1\,\mathrm{\mu m}$ wide and $2\,\mathrm{\mu m}$ thick at $2\,\mu\Omega\cdot\mathrm{cm}$. What is the resistance of $1\,\mathrm{mm}$ of each, compared with a unit inverter's $10\,\mathrm{k\Omega}$?
::: solution
With $\rho$ in $\Omega\cdot\mathrm m$ ($1\,\mu\Omega\cdot\mathrm{cm} = 10^{-8}\,\Omega\cdot\mathrm m$), [[#eq-wire-r]] gives per micrometre:

(a) $r = 4\times10^{-8}\times10^{-6}/(50\times10^{-9}\times100\times10^{-9}) = 8\,\Omega/\mathrm{\mu m}$; $R_\square = 4\times10^{-8}/10^{-7} = 0.4\,\Omega/\square$.

(b) $r = 3\times10^{-8}\times10^{-6}/(10^{-7}\times2\times10^{-7}) = 1.5\,\Omega/\mathrm{\mu m}$.

(c) $r = 2\times10^{-8}\times10^{-6}/(10^{-6}\times2\times10^{-6}) = 0.01\,\Omega/\mathrm{\mu m}$.

Over $1\,\mathrm{mm}$: $8\,\mathrm{k\Omega}$, $1.5\,\mathrm{k\Omega}$ and $10\,\Omega$. A millimetre of the lowest metal has nearly the resistance of a minimum transistor. This is why long connections are routed on the upper levels, whose resistance is hundreds of times lower, and why the lowest levels are used only for connections within and between neighbouring cells.
:::
:::

Contacts and vias add series resistance too, typically from a few ohms for large upper-level vias to tens or a hundred ohms for the smallest contacts; a signal climbing from a transistor to a top-level wire passes through a dozen of them. Designers use multiple vias in parallel on critical and high-current nets, which also guards against a single defective via.

## Capacitance

A wire's capacitance has three parts: a parallel-plate component to the layers above and below, a **fringing** component from the field lines that leave its sidewalls and top corners and end on the layers above and below, and a **coupling** component to its neighbours on the same layer. For a wire of width $w$ and thickness $t$ at height $h$ above and below conducting planes, with neighbours at spacing $s$ on both sides, in a dielectric of relative permittivity $\varepsilon_r$, a first estimate per unit length is

$$
c_g \approx 2\varepsilon_r\varepsilon_0\frac{w}{h}, \qquad c_c \approx \varepsilon_r\varepsilon_0\frac{t}{s} \quad\text{(to each neighbour)},
$$ {#eq-wire-c}

plus fringing terms of comparable size that depend on the ratios $t/h$ and $w/h$ but not on the absolute scale. Field solvers or empirical formulas give the full result; tools extract the capacitance of every net from the layout.

::: proposition Wire capacitance per unit length does not scale {#prop-c-const}
If all the cross-sectional dimensions of a wire and its surroundings — $w$, $t$, $s$, $h$ — are scaled by the same factor, its capacitance per unit length is unchanged. Its resistance per unit length increases as the square of the scaling factor.
:::

::: proof
Capacitance per unit length of a two-dimensional cross-section depends only on the shape of the conductors and the permittivity: each term in [[#eq-wire-c]], and the fringing corrections, is $\varepsilon$ times a dimensionless ratio of lengths, which is invariant under uniform scaling. (Formally, scaling all coordinates by $1/\kappa$ leaves Laplace's equation and the boundary conditions unchanged, and the charge per unit length for given voltages is unchanged.) The resistance per unit length $\rho/(wt)$ grows as $\kappa^2$ when $w$ and $t$ shrink by $\kappa$, even without the resistivity increase described above.
:::

This is the root of the interconnect problem. For a minimum-pitch wire in a dielectric with $\varepsilon_r \approx 3$, the capacitance has stayed around $0.15$–$0.2\,\mathrm{fF/\mu m}$ for twenty years, while its resistance per unit length has risen by orders of magnitude. Process engineers fight back by lowering $\varepsilon_r$ — fluorinated glass ($3.6$) in the late 1990s, carbon-doped oxides ($2.7$–$3$) from the 2000s, porous dielectrics ($2.2$–$2.5$), and **air gaps** between closely spaced lines in some levels since the mid-2010s — and by making wires taller than they are wide (aspect ratios of about $2$), which reduces resistance but increases coupling.

::: example Capacitance of a dense wire {#ex-wire-c}
A lower-level wire has $w = s = 50\,\mathrm{nm}$, $t = 100\,\mathrm{nm}$ and $h = 100\,\mathrm{nm}$ to the levels above and below, in a dielectric with $\varepsilon_r = 2.7$. Estimate $c_g$ and the total coupling capacitance to both neighbours, per micrometre, from [[#eq-wire-c]]. What fraction of the total is coupling?
::: solution
$\varepsilon_r\varepsilon_0 = 2.7\times8.854\times10^{-12} = 2.39\times10^{-11}\,\mathrm{F/m}$, i.e. $0.0239\,\mathrm{fF/\mu m}$. Then

$$
c_g = 2\times0.0239\times\frac{50}{100} = 0.024\,\mathrm{fF/\mu m}, \qquad 2c_c = 2\times0.0239\times\frac{100}{50} = 0.096\,\mathrm{fF/\mu m}.
$$

The sum is $0.12\,\mathrm{fF/\mu m}$, and fringing fields add roughly a further $30$–$50\,\%$, giving the $0.15$–$0.2\,\mathrm{fF/\mu m}$ quoted above. Coupling is about $80\,\%$ of the parallel-plate and coupling total: in dense layers a wire's capacitance is mostly to its neighbours, which matters for crosstalk, below.
:::
:::

## Inductance

A wire also has inductance, and a long wide wire on the top metal layers, with a fast-rising signal and a distant return path, behaves partly as a transmission line. Inductance matters only when the inductive reactance is comparable with the resistance at the frequencies contained in the signal edges, and when the wire is long enough for the propagation delay to be comparable with the edge time.

::: proposition When inductance matters {#prop-inductance}
A wire with resistance, inductance and capacitance per unit length $r$, $l$ and $c$, driven with a signal of rise time $t_r$, shows significant inductive effects (overshoot, ringing, a delay set by propagation rather than diffusion) only if its length $L$ satisfies

$$
\frac{t_r}{2\sqrt{lc}} < L < \frac{2}{r}\sqrt{\frac{l}{c}}.
$$ {#eq-l-window}

The lower bound says that the round-trip time of flight must exceed the rise time; the upper bound says that the total resistance must not exceed about twice the characteristic impedance $Z_0 = \sqrt{l/c}$, beyond which the line is overdamped.
:::

A sketch: the line is a distributed RLC network ([[electromagnetics/transmission-lines]]), whose characteristic impedance is $\sqrt{l/c}$ when $r$ is small and whose signals travel at $1/\sqrt{lc}$. Its attenuation over length $L$ is about $e^{-rL/2Z_0}$; when $rL > 2Z_0$ the wave is attenuated by more than $1/e$ before reaching the end and the response becomes the RC diffusion described next. A full analysis is in Ismail and Friedman's work on on-chip inductance (2000) and in Rabaey's chapter on interconnect.

::: example Is inductance important? {#ex-inductance}
A top-level global wire has $r = 0.01\,\Omega/\mathrm{\mu m}$, $c = 0.2\,\mathrm{fF/\mu m}$ and, with a return path a few micrometres away, $l = 0.5\,\mathrm{pH/\mu m}$. The driver produces rise times of $20\,\mathrm{ps}$. For what range of lengths should inductance be considered? Repeat for the lower-level wire of [[#ex-wire-r]] ($r = 8\,\Omega/\mathrm{\mu m}$) with the same $l$ and $c$.
::: solution
$Z_0 = \sqrt{0.5\times10^{-12}/0.2\times10^{-15}} = \sqrt{2500} = 50\,\Omega$, and $\sqrt{lc} = \sqrt{10^{-28}} = 10^{-14}\,\mathrm{s/\mu m}$ (a velocity of $10^8\,\mathrm{m/s}$, a third of the speed of light). The window [[#eq-l-window]] is

$$
\frac{20\times10^{-12}}{2\times10^{-14}} = 1000\,\mathrm{\mu m} < L < \frac{2}{0.01}\times50 = 10\,000\,\mathrm{\mu m}.
$$

Global wires between $1$ and $10\,\mathrm{mm}$ long — exactly the clock spines and buses of a large chip — can show inductive behaviour. For the lower-level wire, the upper bound is $2\times50/8 = 12.5\,\mathrm{\mu m}$, far below the lower bound: the window is empty, and such wires are always RC lines. Inductance is also important in the package and power-delivery network, where $L\,\mathrm di/\mathrm dt$ noise on the supply rails is a major design concern.
:::
:::

## The distributed RC line

For all but the widest wires, the RC model applies. A wire cannot be treated as a single resistor and capacitor, because its resistance and capacitance are spread along its length: the far end charges through all the resistance, the near end through little of it.

::: theorem Diffusion equation of an RC line {#thm-diffusion}
A uniform wire with resistance $r$ and capacitance $c$ per unit length, and negligible inductance, has a voltage $V(x, t)$ satisfying

$$
rc\,\frac{\partial V}{\partial t} = \frac{\partial^2 V}{\partial x^2}.
$$ {#eq-diffusion}

For a line of length $L$ driven by an ideal voltage step at $x = 0$ and open at $x = L$, the far-end voltage reaches $50\,\%$ of the step at

$$
t_{50} \approx 0.38\,rcL^2 .
$$ {#eq-t50-distributed}
:::

::: proof
Consider a short segment $\mathrm dx$, with resistance $r\,\mathrm dx$ and capacitance $c\,\mathrm dx$ to ground. Ohm's law across the resistance gives $V(x + \mathrm dx) - V(x) = -I(x)\,r\,\mathrm dx$, so $\partial V/\partial x = -rI$. Charge conservation at the capacitance gives $I(x) - I(x + \mathrm dx) = c\,\mathrm dx\,\partial V/\partial t$, so $\partial I/\partial x = -c\,\partial V/\partial t$. Differentiating the first relation with respect to $x$ and substituting the second gives [[#eq-diffusion]]. This is the heat equation with diffusivity $1/(rc)$, and with boundary conditions $V(0, t) = V_{DD}$ and $\partial V/\partial x = 0$ at $x = L$ (no current leaves the open end) it can be solved by separation of variables as a Fourier series (see the heat equation in [Partial differential equations](/learn/maths/lesson.php?c=pde&l=heat-equation) in Maths Atlas):

$$
\frac{V(L, t)}{V_{DD}} = 1 - \frac{4}{\pi}\sum_{m=0}^{\infty}\frac{(-1)^m}{2m + 1}\exp\!\left[-\frac{(2m + 1)^2\pi^2 t}{4rcL^2}\right].
$$

Evaluating the series numerically, the far end passes $0.5$ at $t = 0.38\,rcL^2$.
:::

Two consequences stand out. The delay grows as the **square** of the length, so doubling a wire quadruples its delay. And the distributed delay $0.38\,rcL^2 = 0.38\,RC$ (with $R = rL$, $C = cL$ the total resistance and capacitance) is smaller than the $0.69\,RC$ of a lumped RC circuit with the same totals, because the capacitance near the driver charges through only part of the resistance.

::: widget heat
equation: heat
f: 1
L: 2
k: 1
boundary: dirichlet
caption: The diffusion equation [[#eq-diffusion]] in dimensionless units ($rc = 1$). A wire of length $2$, precharged to $1$, has both ends suddenly grounded. By symmetry no current crosses the midpoint, so each half behaves exactly like a wire of length $\ell = 1$ discharged by an ideal driver at one end and open at the other, with the midpoint playing the role of the far end. Run the animation and watch the midpoint: it falls to $0.5$ at $t \approx 0.38$, as [[#eq-t50-distributed]] predicts for $rc\ell^2 = 1$. The profile rounds off into a single sine arch, the slowest Fourier mode, which sets the tail of the response.
:::

## The Elmore delay

Real nets are not single uniform lines: a driver feeds a wire that branches to several gates, with vias, different layers and loads along the way. A closed-form solution is hopeless, but one number — the first moment of the impulse response — can be computed for any RC tree by inspection.

::: definition Elmore delay {#def-elmore}
For a linear network whose output $v_i(t)$ responds to a unit step input with a monotonic rise from $0$ to $1$, the **Elmore delay** at node $i$ is the mean of the impulse response $h_i(t) = \mathrm dv_i/\mathrm dt$:

$$
T_{D,i} = \int_0^\infty t\,h_i(t)\,\mathrm dt = \int_0^\infty \bigl[1 - v_i(t)\bigr]\,\mathrm dt .
$$ {#eq-elmore-def}
:::

The two forms are equal by integration by parts, since $1 - v_i(t)$ tends to zero faster than $1/t$.

::: theorem Elmore delay of an RC tree {#thm-elmore}
In an RC tree — a network of resistors with no loops, driven at its root by a step source, with a grounded capacitor $C_k$ at each node $k$ — the Elmore delay at node $i$ is

$$
T_{D,i} = \sum_k R_{ik}\,C_k ,
$$ {#eq-elmore}

where $R_{ik}$ is the resistance of the portion of the path from the root to node $i$ that is shared with the path from the root to node $k$.
:::

::: proof
Let the source step from $0$ to $1$ at $t = 0$. Because the network is a tree, the current through any resistor equals the sum of the capacitor currents $C_k\,\mathrm dv_k/\mathrm dt$ of all nodes $k$ downstream of it. The voltage dropped along the path from the root to node $i$ is therefore

$$
1 - v_i(t) = \sum_{\text{resistors } j \text{ on path to } i} R_j\sum_{k \text{ downstream of } j}C_k\frac{\mathrm dv_k}{\mathrm dt} = \sum_k R_{ik}C_k\frac{\mathrm dv_k}{\mathrm dt},
$$

where in the second step we collected, for each capacitor $k$, the resistors on the path to $i$ that carry its current — exactly those on the common part of the paths to $i$ and to $k$, whose total is $R_{ik}$. Integrating from $0$ to $\infty$, with every $v_k$ rising from $0$ to $1$,

$$
\int_0^\infty\bigl[1 - v_i(t)\bigr]\mathrm dt = \sum_k R_{ik}C_k\bigl[v_k(\infty) - v_k(0)\bigr] = \sum_k R_{ik}C_k ,
$$

which is [[#eq-elmore]] by [[#eq-elmore-def]].
:::

In words: **each capacitor contributes its capacitance times the resistance it shares with the path to the output**. For a single lumped RC, the Elmore delay is $RC$ and the true $50\,\%$ delay is $0.69\,RC$. For a distributed line, treated as the limit of many small segments, [[#eq-elmore]] becomes $\int_0^L(rx)(c\,\mathrm dx) = rcL^2/2$, against the exact $0.38\,rcL^2$. Elmore's delay is the mean of the impulse response, not its median, and Rubinstein, Penfield and Horowitz showed in 1983 that it bounds the true response from above in RC trees; later work proved that it is always an upper bound on the $50\,\%$ delay of the step response. In practice designers use $0.69$ times each lumped term and $0.38$ for distributed wires, or simply use the Elmore value as a slightly pessimistic estimate.

::: example Elmore delay of a branching net {#ex-elmore-tree}
A driver with output resistance $R_1 = 1\,\mathrm{k\Omega}$ drives node 1, which has $C_1 = 10\,\mathrm{fF}$. From node 1, a branch of resistance $R_2 = 2\,\mathrm{k\Omega}$ leads to node 2 with $C_2 = 5\,\mathrm{fF}$, and another of resistance $R_3 = 4\,\mathrm{k\Omega}$ leads to node 3 with $C_3 = 8\,\mathrm{fF}$. Find the Elmore delays at nodes 2 and 3 and estimate the $50\,\%$ delays.
::: solution
For node 2: capacitor $C_1$ shares $R_1$ with the path to node 2; $C_2$ shares $R_1 + R_2$; $C_3$ shares only $R_1$ (its path leaves at node 1). So

$$
T_{D,2} = R_1C_1 + (R_1 + R_2)C_2 + R_1C_3 = R_1(C_1 + C_2 + C_3) + R_2C_2 = 1\,\mathrm{k\Omega}\times23\,\mathrm{fF} + 2\,\mathrm{k\Omega}\times5\,\mathrm{fF} = 23 + 10 = 33\,\mathrm{ps}.
$$

For node 3: $T_{D,3} = R_1(C_1 + C_2 + C_3) + R_3C_3 = 23 + 32 = 55\,\mathrm{ps}$.

Since the network is essentially lumped, the $50\,\%$ delays are about $0.69$ times these: $23\,\mathrm{ps}$ and $38\,\mathrm{ps}$. Note that $C_3$ slows node 2 (through $R_1$) even though it is on a different branch: everything the driver must charge contributes through the shared resistance.
:::
:::

### A gate driving a wire

The most common case is a gate with effective resistance $R_d$ and output diffusion capacitance $C_p$, driving a uniform wire of total resistance $R_w = rL$ and capacitance $C_w = cL$ into a load capacitance $C_L$ at the far end. Using $0.69$ for lumped products and $0.38$ for the distributed wire term,

$$
t_d = 0.69\,R_d\,(C_p + C_w + C_L) + R_w\,(0.38\,C_w + 0.69\,C_L).
$$ {#eq-driver-wire}

The first term is the driver charging everything; the second is the wire's own resistance charging its capacitance and the load. No matter how strong the driver, the second term remains, and it grows as $L^2$.

::: example A strong driver and a long wire {#ex-driver-wire}
In the reference process, an inverter $64$ times unit size ($R_d = 10\,\mathrm{k\Omega}/64 = 156\,\Omega$, $C_p = 19.2\,\mathrm{fF}$) drives $1\,\mathrm{mm}$ of intermediate wire ($r = 1.5\,\Omega/\mathrm{\mu m}$, $c = 0.2\,\mathrm{fF/\mu m}$) into a load of $20\,\mathrm{fF}$. Find the delay and the share due to the wire's resistance. What happens if the wire is $2\,\mathrm{mm}$ long?
::: solution
$R_w = 1.5\,\mathrm{k\Omega}$ and $C_w = 200\,\mathrm{fF}$. By [[#eq-driver-wire]],

$$
t_d = 0.69\times156\times(19.2 + 200 + 20)\,\mathrm{fF} + 1500\times(0.38\times200 + 0.69\times20)\,\mathrm{fF} = 25.8 + 134.7 = 160\,\mathrm{ps}.
$$

The wire's own resistance accounts for $84\,\%$ of the delay; a still larger driver would barely help. At $2\,\mathrm{mm}$, $R_w = 3\,\mathrm{k\Omega}$ and $C_w = 400\,\mathrm{fF}$: $t_d = 0.69\times156\times439\,\mathrm{fF} + 3000\times(152 + 13.8)\,\mathrm{fF} = 47 + 497 = 545\,\mathrm{ps}$, $3.4$ times longer for twice the length. This is the quadratic growth that repeaters remove.
:::
:::

::: quiz
A wire's length is doubled while its width and the driver are unchanged. If the delay is dominated by the wire's distributed RC, by what factor does the delay change?
- [ ] $\sqrt2$
- [ ] $2$
- [x] $4$
- [ ] $8$
::: solution
Both the wire's resistance and its capacitance double, so their product, and the distributed delay $0.38\,rcL^2$, quadruple.
:::
:::

## Repeaters

Cutting a long wire into $k$ segments and driving each with its own buffer, or **repeater**, turns one delay proportional to $L^2$ into $k$ delays proportional to $(L/k)^2$, plus the delays of the $k$ repeaters. For large $L$ this is a large saving, and there is an optimum number and size of repeaters.

::: theorem Optimal repeater insertion {#thm-repeaters}
A wire of length $L$ with $r$ and $c$ per unit length is driven by $k$ identical inverters of size $h$ (output resistance $R/h$, input capacitance $hC_0$, output diffusion capacitance $hpC_0$, where $R$, $C_0$ and $p$ are those of the unit inverter), each driving a segment of length $L/k$ into the next repeater. Using the delay model [[#eq-driver-wire]], the total delay is minimised by

$$
h_{opt} = \sqrt{\frac{Rc}{rC_0}}, \qquad k_{opt} = L\sqrt{\frac{0.38\,rc}{0.69\,RC_0(1 + p)}},
$$ {#eq-repeater-opt}

and the minimum delay is proportional to the length:

$$
t_{min} = L\sqrt{RC_0\,rc}\;\Bigl[2\sqrt{0.69\times0.38\,(1 + p)} + 1.38\Bigr].
$$ {#eq-repeater-delay}
:::

::: proof
Each segment of length $\ell = L/k$ is driven by a repeater of resistance $R/h$ and loaded by its own diffusion capacitance, the wire segment and the next repeater's input. By [[#eq-driver-wire]] its delay is

$$
t_{seg} = 0.69\frac{R}{h}\bigl(hpC_0 + c\ell + hC_0\bigr) + r\ell\,\bigl(0.38\,c\ell + 0.69\,hC_0\bigr).
$$

Multiplying by $k$ and using $k\ell = L$, the total is

$$
t = 0.69\,RC_0(1 + p)\,k + 0.69\frac{RcL}{h} + 0.38\frac{rcL^2}{k} + 0.69\,rC_0L\,h .
$$

The terms in $h$ are $0.69L(Rc/h + rC_0h)$, minimised where $Rc/h^2 = rC_0$, giving $h_{opt}$. The terms in $k$ are $0.69RC_0(1 + p)k + 0.38rcL^2/k$, minimised where $0.69RC_0(1 + p) = 0.38rcL^2/k^2$, giving $k_{opt}$. At the optimum each pair of terms equals twice the geometric mean of its members: $2\sqrt{0.69\times0.38\,(1 + p)RC_0rc}\,L$ for the $k$-terms and $2\times0.69\sqrt{RC_0rc}\,L$ for the $h$-terms. Adding them gives [[#eq-repeater-delay]].
:::

With $p = 1$ the bracket in [[#eq-repeater-delay]] is $2.83$. The optimal delay per unit length, $2.83\sqrt{RC_0rc}$, is the geometric mean of a gate's intrinsic time constant $RC_0$ and the wire's $rc$ — a fundamental figure of merit for a process's wires. As with buffer chains, the optimum is flat: using repeaters somewhat smaller and further apart than optimal costs little delay and saves much power and area.

::: example Repeating a 5 mm wire {#ex-repeaters}
In the reference process ($R = 10\,\mathrm{k\Omega}$, $C_0 = 0.3\,\mathrm{fF}$, $p = 1$), a $5\,\mathrm{mm}$ intermediate-level wire has $r = 1.5\,\Omega/\mathrm{\mu m}$ and $c = 0.2\,\mathrm{fF/\mu m}$. (a) What is the wire's intrinsic distributed delay $0.38\,rcL^2$? (b) Find the optimal repeater size, number and spacing, and the minimum delay. (c) How much slower is the line with $20$ repeaters of the same size instead of the optimal number?
::: solution
(a) $0.38\times1.5\times0.2\times10^{-15}\times(5000)^2 = 2.85\,\mathrm{ns}$ — the delay even with an infinitely strong driver.

(b) By [[#eq-repeater-opt]], $h_{opt} = \sqrt{10^4\times0.2\times10^{-15}/(1.5\times0.3\times10^{-15})} = \sqrt{4444} = 66.7$ times unit size, and

$$
k_{opt} = 5000\sqrt{\frac{0.38\times1.5\times0.2\times10^{-15}}{0.69\times10^4\times0.3\times10^{-15}\times2}} = 5000\times5.25\times10^{-3} = 26.2,
$$

i.e. about $26$ repeaters spaced $190\,\mathrm{\mu m}$ apart. By [[#eq-repeater-delay]], $t_{min} = 5000\times\sqrt{10^4\times0.3\times10^{-15}\times1.5\times0.2\times10^{-15}}\times2.83 = 5000\times3\times10^{-14}\times2.83 = 424\,\mathrm{ps}$ — about $85\,\mathrm{ps/mm}$, seven times faster than (a).

(c) Substituting $k = 20$ and $h = 66.7$ into the total-delay expression of the proof gives $432\,\mathrm{ps}$, only $2\,\%$ more, with $24\,\%$ fewer repeaters.
:::
:::

::: widget plot
f: 76*r*x^2; 69.3*sqrt(r)*x
x: 0, 10
y: 0, 3000
sliders: r=1.5:0.2:10:0.1
labels: \text{unrepeated, } 0.38\,rcL^2; \text{optimally repeated}
caption: Delay in picoseconds against wire length in millimetres for a wire with $c = 0.2\,\mathrm{fF/\mu m}$ and resistance $r$ in $\Omega/\mathrm{\mu m}$, in the reference process. Without repeaters the delay grows as $L^2$ (and this curve assumes an ideal driver); with optimal repeaters it is linear, from [[#eq-repeater-delay]]. At $r = 1.5$ the curves cross near $0.75\,\mathrm{mm}$: beyond that, repeaters pay, and at $5\,\mathrm{mm}$ they are seven times faster ([[#ex-repeaters]]). Raise $r$ to $8$ (a lowest-level wire): both delays rise, and the crossover moves to about $0.3\,\mathrm{mm}$ — such layers are useless for long signals.
:::

::: warning Repeaters are not free
A chip with many long wires needs a great many repeaters: in large designs they number in the hundreds of thousands to millions. Each one occupies placement area, and must be connected down from the upper metal levels through the whole via stack to the transistors and back up, which consumes routing resources on every intermediate level. Their input and diffusion capacitance add to the switched capacitance of the wire — at the optimum, the repeaters' capacitance is comparable with the wire's — and they leak. Designers therefore use repeaters smaller and sparser than the delay optimum on all but the most critical wires, and plan the floor plan so that long wires are few.
:::

## Crosstalk

Neighbouring wires are coupled by their mutual capacitance $C_c$, which in dense layers is the larger part of each wire's capacitance ([[#ex-wire-c]]). When an **aggressor** wire switches, it injects current into its neighbour, the **victim**. Two effects follow.

::: proposition Coupled noise on a floating victim {#prop-crosstalk}
A victim node that is not driven (for example a dynamic node or a precharged bit line), with capacitance $C_g$ to ground and coupling capacitance $C_c$ to an aggressor that swings by $\Delta V_a$, changes by

$$
\Delta V_v = \frac{C_c}{C_g + C_c}\,\Delta V_a .
$$ {#eq-crosstalk}

If the victim is driven by a gate of resistance $R_v$, the disturbance is smaller and decays with time constant $R_v(C_g + C_c)$; it approaches [[#eq-crosstalk]] when the aggressor's rise time is much shorter than that time constant.
:::

::: proof
For a floating victim, the coupling and ground capacitances form a capacitive divider between the aggressor and ground: charge conservation on the isolated victim node gives $C_c(\Delta V_v - \Delta V_a) + C_g\Delta V_v = 0$, which is [[#eq-crosstalk]]. A driver connected to the victim removes the injected charge through $R_v$, so the victim's deviation relaxes towards zero with the time constant of $R_v$ and the total capacitance; if the aggressor switches much faster than that, the driver has no time to act and the divider result holds at the peak.
:::

The second effect is on **delay**. If the victim itself is switching, the current that its driver must supply to the coupling capacitance depends on what the aggressor does at the same time. If the aggressor is quiet, the voltage across $C_c$ changes by the victim's swing $V_{DD}$; if the aggressor switches in the same direction, by $0$; in the opposite direction, by $2V_{DD}$. The victim's effective capacitance is therefore

$$
C_{eff} = C_g + k\,C_c, \qquad k \in \{0, 1, 2\},
$$ {#eq-miller}

and its delay can vary over a wide range depending on its neighbours' data. The factor $k$ is the **Miller coupling factor**; static timing tools account for it by computing worst-case "aligned" aggressor switching for every critical net.

::: example Crosstalk noise and delay variation {#ex-crosstalk}
A $200\,\mathrm{\mu m}$ victim wire has $c_g = 0.06\,\mathrm{fF/\mu m}$ to ground and $c_c = 0.07\,\mathrm{fF/\mu m}$ to each of its two neighbours. (a) The victim is a floating precharged node at $V_{DD} = 1\,\mathrm V$. Find the noise if one neighbour falls by $1\,\mathrm V$, and if both do. (b) The victim is driven and switching. Find the range of its effective capacitance, relative to the case with quiet neighbours.
::: solution
(a) With one aggressor switching, the other neighbour is quiet and acts as ground, so the victim sees $C_c = 0.07\times200 = 14\,\mathrm{fF}$ to the aggressor and $C_g + C_c = 12 + 14 = 26\,\mathrm{fF}$ to quiet nodes. By [[#eq-crosstalk]], $\Delta V = 14/40 = 0.35\,\mathrm V$. With both aggressors falling, $\Delta V = 28/40 = 0.70\,\mathrm V$: a precharged node at $1\,\mathrm V$ would be pulled to $0.3\,\mathrm V$ and read as a zero. Floating nodes must be shielded.

(b) Quiet neighbours: $C_{eff} = 12 + 28 = 40\,\mathrm{fF}$. Both switching in the same direction: $12\,\mathrm{fF}$ ($0.3$ times). Both switching opposite: $12 + 2\times28 = 68\,\mathrm{fF}$ ($1.7$ times). The wire's delay can vary by a factor of almost six with its neighbours' data.
:::
:::

Designers control crosstalk by **spacing** critical wires further apart (coupling falls roughly as $1/s$), by **shielding** them with grounded wires on either side (which converts coupling to ground capacitance), by placing repeaters so that the coupled lengths of any two neighbours are short and staggered, and, for buses, by encoding data so that adjacent bits rarely switch in opposite directions. Differential signalling, as in SRAM bit lines and clock distribution, makes the noise common-mode.

::: quiz
A critical net is routed between two wires whose signals are uncorrelated with it. Which change reduces the *worst-case* delay of the critical net the most?
- [ ] doubling its driver's width only
- [x] replacing its neighbours by grounded shield wires
- [ ] moving it to a layer with the same pitch but lower resistance, keeping its neighbours
- [ ] making its neighbours switch faster
::: solution
With grounded shields, the coupling capacitance becomes ordinary ground capacitance ($k = 1$ always), so the worst case $C_g + 2C_c$ falls to $C_g + C_c$. Doubling the driver helps only the driver term of [[#eq-driver-wire]]; a lower-resistance layer helps the wire term but leaves the factor-of-$1.7$ Miller penalty; faster aggressors make crosstalk worse, not better.
:::
:::

## Design and practice

As of 2026, a leading logic process has fifteen or more metal levels on the front of the wafer, with the tightest pitches, around $20$–$30\,\mathrm{nm}$, on the lowest levels (made with EUV lithography, sometimes double-patterned) and progressively wider and thicker levels above, up to a few micrometres for the top levels used for power distribution and the longest signals. Processes with **backside power delivery** move the power network to dedicated levels behind the transistors, which frees the front-side levels for signals and reduces supply droop. The hierarchy is used deliberately: short local connections on dense lower levels, medium-length connections on intermediate levels, and repeated global wires on the top levels; routing tools assign nets to layers according to their length and criticality.

Several system-level consequences follow from this chapter. Signals crossing a large chip take several clock cycles, so architectures are designed with **latency-tolerant** communication: pipelined wires with flip-flops along the way, and networks-on-chip that route packets between blocks. Wires consume a large share of dynamic power, so designers reduce **swing** on long buses (signals of a few hundred millivolts, restored by sense amplifiers) and keep data local. And the reliability of narrow wires is limited by **electromigration**, the gradual displacement of metal atoms by the electron current, which sets maximum current densities (of the order of $1$–$10\,\mathrm{mA/\mu m^2}$ for copper, depending on temperature and lifetime target) that power and clock wires must respect.

::: application Network-on-chip links
Many-core processors and large AI accelerators connect their cores, caches and memory controllers with a network-on-chip: a grid of routers joined by wide links a few millimetres long. Each link is a bundle of repeated wires on the upper metal levels, pipelined with a flip-flop every millimetre or two so that one hop takes one clock cycle. The repeater analysis of [[#thm-repeaters]] gives the delay per millimetre, about $85\,\mathrm{ps}$ in our example, and with it the distance a signal can travel per cycle; the link power, $\alpha C_wV^2f$ per wire, is one of the main costs of moving data across the chip.
:::

::: history
William Elmore introduced his delay estimate in 1948 while analysing wideband valve amplifiers, as the first moment of the impulse response. Jorge Rubinstein, Paul Penfield and Mark Horowitz applied it to RC trees in MOS circuits in 1983 and derived bounds on the true response, making it the standard delay metric of timing tools; Penfield and Rubinstein's work was motivated by the long polysilicon and diffusion wires of nMOS chips. H. B. Bakoglu and James Meindl analysed optimal repeater insertion in 1985. IBM announced copper interconnect in 1997, and low-k dielectrics followed in the early 2000s; Intel introduced air gaps in its 14 nm process in 2014 and cobalt for the lowest levels in its 10 nm process. Backside power delivery entered production with Intel's 18A process in 2025.
:::

## Where this leads

The clock networks of [[digital-ic/sequential-circuits-clocking]] are the largest and most carefully designed interconnect on a chip, and their skew comes in part from the RC effects analysed here. Wire capacitance is usually the largest term in the switched capacitance of [[digital-ic/power-dissipation]], and the long word lines and bit lines of [[digital-ic/memory-arrays]] are RC lines whose delay limits the size of each sub-array. On a larger scale, chip-to-chip links, package traces and printed-circuit boards are transmission lines, treated in [[electromagnetics/transmission-lines]].

::: summary
- Wire resistance is $\rho L/(wt) = R_\square L/w$; narrow copper wires have effective resistivities several times the bulk value because of barriers and surface and grain-boundary scattering.
- Capacitance per unit length is about $0.15$–$0.2\,\mathrm{fF/\mu m}$ and does not change under uniform scaling, while resistance per unit length grows as the square of the scaling factor; in dense layers coupling to neighbours dominates.
- Inductance matters only for wide global wires with fast edges, when $t_r/(2\sqrt{lc}) < L < (2/r)\sqrt{l/c}$.
- An RC wire obeys the diffusion equation $rc\,\partial V/\partial t = \partial^2V/\partial x^2$; its $50\,\%$ delay is $0.38\,rcL^2$, quadratic in length.
- The Elmore delay of an RC tree is $\sum_kR_{ik}C_k$, each capacitor times the resistance it shares with the path to the output; it is the mean of the impulse response and an upper bound on the $50\,\%$ delay.
- Optimal repeaters of size $\sqrt{Rc/(rC_0)}$, spaced so that the repeater and wire delays balance, make delay linear in length: $t = 2.83\,L\sqrt{RC_0\,rc}$ for $p = 1$.
- Coupling injects noise $C_c/(C_g + C_c)$ of the aggressor swing into floating victims and makes delay depend on neighbours through the Miller factor $0$–$2$.
:::

## Exercises

::: exercise Sheet resistance {level=1 check="0.05*500/0.2"}
A layer has sheet resistance $0.05\,\Omega/\square$. Find the resistance in ohms of a wire $500\,\mathrm{\mu m}$ long and $0.2\,\mathrm{\mu m}$ wide on it.
::: solution
The wire has $500/0.2 = 2500$ squares, so $R = 0.05\times2500 = 125\,\Omega$, by [[#def-sheet]].
:::
:::

::: exercise Elmore delay of a ladder {level=1 check="1e3*4e-15*(1 + 2 + 3 + 4)"}
A four-section RC ladder has a resistance of $1\,\mathrm{k\Omega}$ and a capacitance of $4\,\mathrm{fF}$ in each section, driven by an ideal step at one end. Find the Elmore delay at the far end in seconds.
::: solution
The capacitor at the $k$-th node shares $k$ resistors with the path to the far end, so $T_D = RC(1 + 2 + 3 + 4) = 10RC = 10\times10^3\times4\times10^{-15} = 40\,\mathrm{ps}$. For $n$ sections the sum is $n(n + 1)/2\cdot RC$, which tends to $rcL^2/2$ as $n\to\infty$ — the same structure as the transmission-gate chain of [[digital-ic/static-cmos-logic]].
:::
:::

::: exercise Distributed delay {level=1 check="0.38*8*0.2e-15*100^2"}
Find the $50\,\%$ delay in seconds of $100\,\mathrm{\mu m}$ of the lowest-level wire of [[#ex-wire-r]] ($r = 8\,\Omega/\mathrm{\mu m}$, $c = 0.2\,\mathrm{fF/\mu m}$), driven by an ideal source.
::: solution
$t_{50} = 0.38\times8\times0.2\times10^{-15}\times10^4 = 6.1\,\mathrm{ps}$, by [[#eq-t50-distributed]]. Comparable with a gate delay already at $100\,\mathrm{\mu m}$.
:::
:::

::: exercise Driver and wire {level=2 check="0.69*2500*(2.4e-15 + 100e-15 + 10e-15) + 500*(0.38*100e-15 + 0.69*10e-15)"}
A driver with $R_d = 2.5\,\mathrm{k\Omega}$ and output diffusion capacitance $C_p = 2.4\,\mathrm{fF}$ drives $500\,\mathrm{\mu m}$ of wire with $r = 1\,\Omega/\mathrm{\mu m}$ and $c = 0.2\,\mathrm{fF/\mu m}$ into a $10\,\mathrm{fF}$ load. Find the delay in seconds.
::: solution
$R_w = 500\,\Omega$, $C_w = 100\,\mathrm{fF}$. By [[#eq-driver-wire]], $t_d = 0.69\times2500\times112.4\,\mathrm{fF} + 500\times(38 + 6.9)\,\mathrm{fF} = 193.9 + 22.5 = 216\,\mathrm{ps}$. Here the driver dominates; a larger driver would help much more than a better wire.
:::
:::

::: exercise Elmore with a side branch {level=2}
A driver of resistance $2\,\mathrm{k\Omega}$ feeds a node A ($5\,\mathrm{fF}$). From A, a wire of $1\,\mathrm{k\Omega}$ leads to node B ($10\,\mathrm{fF}$), and another of $3\,\mathrm{k\Omega}$ leads to node C ($2\,\mathrm{fF}$). Find the Elmore delays at B and C. If node C's load is increased to $20\,\mathrm{fF}$, by how much does the delay at B increase, and why?
::: solution
The total capacitance is $17\,\mathrm{fF}$. $T_B = 2\,\mathrm{k\Omega}\times17 + 1\,\mathrm{k\Omega}\times10 = 34 + 10 = 44\,\mathrm{ps}$; $T_C = 34 + 3\times2 = 40\,\mathrm{ps}$. With $C_C = 20\,\mathrm{fF}$, the total becomes $35\,\mathrm{fF}$: $T_B = 70 + 10 = 80\,\mathrm{ps}$, an increase of $36\,\mathrm{ps}$ = $2\,\mathrm{k\Omega}\times18\,\mathrm{fF}$, because the extra load is charged through the shared driver resistance. ($T_C$ becomes $70 + 60 = 130\,\mathrm{ps}$.)
:::
:::

::: exercise Repeaters on a top-level wire {level=2}
Repeat [[#ex-repeaters]] for a $10\,\mathrm{mm}$ top-level wire with $r = 0.05\,\Omega/\mathrm{\mu m}$ and $c = 0.2\,\mathrm{fF/\mu m}$ (ignore inductance). Give the repeater size, spacing and the delay per millimetre.
::: solution
$h_{opt} = \sqrt{10^4\times0.2/(0.05\times0.3)} = \sqrt{133\,333} = 365$; $k_{opt} = 10\,000\times\sqrt{0.38\times0.05\times0.2\times10^{-15}/(0.69\times10^4\times0.3\times10^{-15}\times2)} = 10\,000\times9.58\times10^{-4} = 9.6$, so about $10$ repeaters $1\,\mathrm{mm}$ apart. The delay is $2.83\times\sqrt{10^4\times0.3\times10^{-15}\times0.05\times0.2\times10^{-15}}\times10\,000 = 2.83\times5.48\times10^{-15}\times10^4 = 155\,\mathrm{ps}$, i.e. $15.5\,\mathrm{ps/mm}$ — five times faster per millimetre than the intermediate wire, because $\sqrt{r}$ is $5.5$ times smaller.
:::
:::

::: exercise Shielding versus spacing {level=2}
A victim wire has $c_g = 0.05\,\mathrm{fF/\mu m}$ and $c_c = 0.08\,\mathrm{fF/\mu m}$ to each neighbour at minimum spacing; doubling the spacing halves $c_c$ (to $0.04$) and raises $c_g$ to $0.07$. Compare the worst-case effective capacitance per micrometre ($k = 2$ on both sides) for (a) minimum spacing, (b) double spacing, (c) minimum spacing with grounded shields on both sides.
::: solution
(a) $0.05 + 2\times2\times0.08 = 0.37\,\mathrm{fF/\mu m}$. (b) $0.07 + 4\times0.04 = 0.23\,\mathrm{fF/\mu m}$. (c) Shields are quiet, so $k = 1$: $0.05 + 2\times0.08 = 0.21\,\mathrm{fF/\mu m}$. Both remedies use about the same routing area (a shield occupies the track that doubled spacing would leave empty); shielding gives slightly lower and, more importantly, data-independent capacitance.
:::
:::

::: exercise Elmore delay of a distributed line {level=3}
(a) Show from [[#thm-elmore]] that a uniform line of length $L$ driven by an ideal step has Elmore delay $rcL^2/2$ at its far end and $rc(Lx - x^2/2)$ at position $x$. (b) Add a driver resistance $R_d$ at the near end and a load $C_L$ at the far end, and show that the far-end Elmore delay is $R_d(cL + C_L) + rL(cL/2 + C_L)$. Compare with [[#eq-driver-wire]].
::: hint
Divide the line into $n$ segments of length $L/n$ and let $n\to\infty$; the shared resistance between positions $x$ and $y$ is $r\min(x, y)$.
:::
::: solution
(a) The capacitance $c\,\mathrm dy$ at position $y$ shares the resistance $r\min(x, y)$ with the path to $x$. So $T_D(x) = \int_0^L r\min(x, y)\,c\,\mathrm dy = rc\left[\int_0^x y\,\mathrm dy + \int_x^L x\,\mathrm dy\right] = rc\left[\tfrac{x^2}2 + x(L - x)\right] = rc(Lx - x^2/2)$. At $x = L$ this is $rcL^2/2$.

(b) The driver resistance is shared by every capacitor: $R_d(cL + C_L)$. The load at the far end shares the whole wire resistance: $rLC_L$. The wire capacitance contributes $rcL^2/2$ by (a). The sum is $R_d(cL + C_L) + rL(cL/2 + C_L)$. [[#eq-driver-wire]] is the same expression with each lumped term multiplied by $0.69$ and the distributed term $rcL^2/2$ replaced by $0.38\,rcL^2$, i.e. the Elmore value converted to a $50\,\%$ delay ($0.69$ for exponential, $0.76$ for the distributed term).
:::
:::

::: exercise Designing a repeated bus under a power limit {level=3}
A $64$-bit bus runs $4\,\mathrm{mm}$ on an intermediate level ($r = 1.5\,\Omega/\mathrm{\mu m}$, $c = 0.2\,\mathrm{fF/\mu m}$) in the reference process. (a) With optimal repeaters, find the delay, the number and size of repeaters per bit and the total repeater input-plus-diffusion capacitance per bit, compared with the wire capacitance. (b) To save power, the designer uses repeaters of half the optimal size, at the optimal spacing. Estimate the new delay and the reduction in total switched capacitance. (c) At $1\,\mathrm V$, $2\,\mathrm{GHz}$ and an activity factor of $0.15$, what is the bus power in each case?
::: solution
(a) $h = 66.7$ and $k = 4000\times5.25\times10^{-3} = 21$ repeaters per bit, $190\,\mathrm{\mu m}$ apart; $t = 4\times85 = 339\,\mathrm{ps}$. Each repeater has input plus diffusion capacitance $2\times66.7\times0.3 = 40\,\mathrm{fF}$, so $21\times40 = 840\,\mathrm{fF}$ per bit, against $800\,\mathrm{fF}$ of wire: the repeaters double the switched capacitance.

(b) With $h = 33.3$, $k = 21$, the total delay expression of the proof gives: $0.69RC_0(1 + p)k = 0.69\times10^4\times0.3\times10^{-15}\times2\times21 = 86.9\,\mathrm{ps}$ (unchanged); $0.69RcL/h = 0.69\times10^4\times0.2\times10^{-15}\times4000/33.3 = 165.6\,\mathrm{ps}$; $0.38rcL^2/k = 0.38\times1.5\times0.2\times10^{-15}\times1.6\times10^7/21 = 86.9\,\mathrm{ps}$; $0.69rC_0Lh = 0.69\times1.5\times0.3\times10^{-15}\times4000\times33.3 = 41.4\,\mathrm{ps}$; total $381\,\mathrm{ps}$, $12\,\%$ slower. The repeater capacitance halves to $420\,\mathrm{fF}$, so the total switched capacitance falls from $1640$ to $1220\,\mathrm{fF}$ per bit, $26\,\%$ less.

(c) $P = 64\alpha CV^2f$: optimal, $64\times0.15\times1.64\times10^{-12}\times1\times2\times10^9 = 31.5\,\mathrm{mW}$; half-size, $23.4\,\mathrm{mW}$. A $12\,\%$ delay penalty buys a $26\,\%$ power saving — the typical trade made on all but the most critical buses.
:::
:::
