::: warning The ratio is exact. Everything else is approximate.
A belt drive's ratio drifts with slip, a chain's oscillates by $\pm 2\%$ at the chordal pitch every link, and a friction drive's depends on the load. **A gear train's ratio is an exact ratio of two integers, and it is exact at every instant, not on average.** That single property is why every machine that must know where something is — a clock, a dividing head, a lead screw, a robot wrist, an aircraft control unit — is geared rather than belted, and it is also the source of the subject's central frustration:

**the set of ratios a gear train can produce is a countable, lumpy, integer-valued set, and the ratio you want is almost never in it.**

Everything in the first half of this lesson is a consequence of that. Everything in the second half is a consequence of the second great idea — that if you let the axes move, you gain a degree of freedom and can put an arbitrarily large ratio inside an arbitrarily small diameter, at the price of a torque reaction that has to be held by something, and of an efficiency that can collapse to nothing if you choose the wrong member to hold.
:::

## What you already know

- **Base pitch equality** — from [[mechanisms/gears]], two gears mesh if and only if $\pi m_1 \cos \phi_1 = \pi m_2 \cos \phi_2$, which is what forces every wheel in a train to share a module and a pressure angle.
- **The instant centre and the pitch point** — Kennedy's theorem in [[mechanisms/velocity-analysis]] is what makes the gear ratio a property of geometry rather than of load.
- **Equivalent inertia** — $J_{\mathrm{eq}} = J / i^{2}$ from [[mechanisms/acceleration-analysis]], which is the reason a servo motor can move a tonne and the reason there is an optimum ratio.
- **Contact and bending strength** — $p_0$ and $\sigma_F$ from [[mechanisms/gears]], which decide the face width of every wheel in the train and which do *not* improve in proportion to the number of stages.
- **The Gruebler count** — $M = 3(N-1) - 2J_1$ from [[mechanisms/mechanisms-mobility]], which is how you will discover that an epicyclic train has two degrees of freedom and therefore needs two drivers, not one.

## Simple trains, compound trains, and the idler that does nothing

::: definition Train value {#def-trainvalue}
For a train of gears $1, 2, 3, \ldots$ in which each wheel meshes with the next, the **train value** is

$$
e = \frac{\omega_{\mathrm{last}}}{\omega_{\mathrm{first}}} = \prod_{\text{meshes}} \left( - \frac{N_{\mathrm{driving}}}{N_{\mathrm{driven}}} \right)
$$

In a **simple train** every wheel is on its own shaft and carries only one gear; the value is the product of the individual mesh ratios and the sign alternates with every mesh. In a **compound train** two or more wheels are keyed together on the same shaft and share a speed; the value becomes

$$
\boxed{ \; e = (- 1)^{k} \, \frac{ \textstyle\prod N_{\text{driving}} }{ \textstyle\prod N_{\text{driven}} } \; }
$$

where $k$ is the number of external meshes. **An internal (ring) mesh does not reverse the direction and does not contribute a minus sign.**
:::

::: exercise Derivation: why an idler changes nothing but the sign {#deriv-idler level=3}
::: solution
Insert a gear of $N_i$ teeth between a driver of $N_1$ and a driven of $N_2$. It is driven by 1 and drives 2, so it appears once in the denominator and once in the numerator,

$$
e = \left( - \frac{N_1}{N_i} \right) \left( - \frac{N_i}{N_2} \right) = + \frac{N_1}{N_2}
$$

and the $N_i$ cancels identically. **The idler is therefore not a speed-changing element at all; it is a direction-changing element and a centre-distance-filling element, and its tooth count is a free variable that you should spend on something you actually need** — usually on making the tooth counts coprime (below), and occasionally on reaching a centre distance that a housing already dictates.

What the idler *does* cost is real. It adds a mesh, and a mesh is $1.5\%$ of the power, a pair of bearings, an oil feed, a length of shaft and a natural frequency. It also puts the idler's own teeth into a 1:1 wear pairing with whichever gears it touches if the counts are not chosen carefully. **The reason "an idler doesn't matter" is such a common exam answer and such an expensive industrial mistake is that the first sentence is true and the second is not.**
:::
:::

::: warning Hunting tooth counts
If a pinion of $N_1$ teeth drives a wheel of $N_2$ teeth and $d = \gcd ( N_1 , N_2 ) > 1$, then pinion tooth 1 meets only the $N_2 / d$ wheel teeth whose numbers are congruent to 1 modulo $d$ — and never any others. A $17 / 102$ pair has $d = 17$, so **each pinion tooth meets only six of the wheel's teeth, and each wheel tooth meets only one pinion tooth, forever.**

The consequences are all bad and all slow. Any manufacturing error in a tooth is repeated at the same place every $N_2/d$ wheel revolutions instead of being spread. Any material inclusion is loaded at the same contact every cycle. A worn tooth stays worn and wears its partner into a matching hollow, and the pair develops a periodic excitation at exactly the wheel's own frequency, which is the signature a vibration analyst uses to identify it. **The rule is to make adjacent tooth counts coprime, or at least to make their ratio have a large common multiple — a "hunting" tooth count — so that the contact pattern walks slowly around both gears.** $19 / 100$ instead of $17 / 102$ costs nothing and fixes all of it.

The exception is deliberate: **a "hunting worm" is a worm whose tooth count shares no factor with the wheel at all, and a deliberately non-hunting pair is used when you *want* a replaceable gear to wear in a matching pattern** — which is why some machinery specifies a "set" of gears that must be replaced together, and why the drawing says so.
:::

## Integer arithmetic: which ratios exist

::: example Two stages for a $23.4 : 1$ reducer {#ex-234}
A conveyor drive needs exactly $23.4 : 1$ from a two-stage compound train, with no stage above $7 : 1$ and no gear above 100 teeth.

**Answer.** $23.4 = 117 / 5$. A workable split is $5.400 \times 4.333$, i.e.

$$
\frac{81}{15} \times \frac{65}{15} = 5.400 \times 4.3333 = 23.400 \quad \text{exactly}
$$

::: solution
The arithmetic is a factor hunt. $117 / 5 = a c / b d$ requires $ac = 117 k$ and $bd = 5 k$ for some integer $k$, and you need both $b$ and $d$ at least 17 to avoid undercutting at $20^{\circ}$ without profile shift. Trying $k = 45$ gives $b d = 225 = 15 \times 15$ and $ac = 5265 = 81 \times 65$, which is the answer above — **and it fails the undercutting test**, because both pinions have 15 teeth.

Trying $k = 90$ gives $bd = 450 = 25 \times 18$ but forces $ac = 10\,530$, whose factor pairs are $90 \times 117$ and larger — over the 100-tooth ceiling. Trying $k = 135$ gives $bd = 675 = 27 \times 25$ and $ac = 15\,795 = 81 \times 195$ — worse still. **There is no two-stage solution with all four counts between 17 and 100.** The real answers are:

| Option | Tooth counts | Comment |
|---|---|---|
| Accept profile shift | $81 / 15 \times 65 / 15$ with $x = +0.15$ on both pinions | Cheapest; exact ratio, two shifted pinions, no standard catalogue parts |
| Add a stage | $4.500 \times 5.200 \times 1.003$ — in practice $54 / 12 \times 78 / 15 \times 100 / 99$ | One extra mesh, 1.5% of the power, one more seal and one more natural frequency |
| Replace one stage with a planetary | $i = 5.400$ planetary plus $4.333$ helical | Smallest and lightest; the planetary stage is designed in [[#ex-wind]] |
| Relax the specification | $23.333 = (70 / 20) \times (100 / 15)$ | $0.29\%$ error; the two 15-tooth pinions need only $x = +0.12$ |

**The lesson is not the arithmetic, it is the last row.** $23.333 = (70 / 20) \times (100 / 15)$ is exact, uses only legal tooth counts, and is $0.29\ \%$ away from what was asked. **A ratio specified to three significant figures is a ratio specified without a reason**; ask what the machine does with the number, and if the answer is "sets a belt speed to within a few per cent", take the $0.29\ \%$. **The cheapest fix for an integer-arithmetic problem is nearly always to relax the specification, and the most expensive is to add a stage.**
:::
:::

::: example The ratio that cannot be made: $\sqrt{2}$ {#ex-sqrt2}
A mechanism needs exactly $\sqrt 2 = 1.41421356\ldots$ from gears. Find the best available.

**Answer.** None exists. $\sqrt 2$ is irrational and a gear ratio is rational, so the error can never be zero. The question is only how small it can be made with how many gears.

::: solution
The **continued fraction** of $\sqrt 2$ is $1 + 1 / ( 2 + 1 / ( 2 + \cdots ) )$, whose convergents are

$$
\frac{1}{1} , \quad \frac{3}{2} , \quad \frac{7}{5} , \quad \frac{17}{12} , \quad \frac{41}{29} , \quad \frac{99}{70} , \quad \frac{239}{169} , \ldots
$$

and each convergent is the best rational approximation available with a denominator that small. **$\mathbf{99 / 70}$ is the best single pair of gears under 100 teeth**, with an error of $5.1 \times 10^{- 5}$, or $0.0036\ \%$.

Two stages change the picture completely. Because the errors of two stages multiply rather than add, a compound train can be far more accurate than either of its stages:

$$
\frac{58}{57} \times \frac{82}{59} = 1.414 \, 213 \, 50 \quad \Rightarrow \quad \text{error } 6.3 \times 10^{- 8} \ \ ( 0.000 \, 006 \, 3 \, \% )
$$

**six hundred times better than the best single pair, using gears no bigger.** The reason is that $58 / 57$ and $82 / 59$ are each nearly 1 and each nearly $\sqrt [4]{2}$-corrective; **a compound train whose stages are each close to unity is an error-correcting device**, and this is the standard trick for the $\sqrt 2$ needed in a logarithmic spiral cam or a differential indexer. What it costs is that $57$ and $59$ are consecutive odd numbers with no common factor to anything, so the gears are individually large for the torque they carry, and the whole assembly is four gears and two shafts where one pair would have done if you had been honest about the tolerance.
:::
:::

::: exercise Hunting tooth count {level=1 check="6"}
A $17$-tooth pinion drives a $102$-tooth wheel. How many distinct wheel teeth does a given pinion tooth ever contact?

::: solution
$\gcd ( 17 , 102 ) = 17$, and the number of wheel teeth visited by any one pinion tooth is

$$
\frac{ N_2 }{ \gcd ( N_1 , N_2 ) } = \frac{ 102 }{ 17 } = \boxed{ 6 }
$$

**and the reverse is worse: each of those six wheel teeth is struck by exactly one pinion tooth and by no other, for the life of the gearbox.** Change the wheel to 100 teeth and the ratio moves from 6.000 to 5.882 — a $2\ \%$ error — while the visited count jumps from 6 to 100, because 19 and 100 (or 17 and 100) are coprime. **This is the cheapest reliability improvement in gear-train design and it is the one most often left on the table, because it never appears in a strength calculation.**
:::
:::

## Epicyclic trains: what changes when an axis moves

::: definition The Willis equation {#def-willis}
An **epicyclic** (planetary) train has at least one wheel whose axis moves. Give the moving frame — the **carrier** or **arm** — an angular velocity $\omega_c$, and every wheel's absolute velocity becomes $\omega_i - \omega_c$ in that frame. **In the carrier frame the train is an ordinary fixed-axis train**, so its train value $e_0$ is the simple product of the mesh ratios, and

$$
\boxed{ \; e_0 = \frac{ \omega_{\mathrm{last}} - \omega_c }{ \omega_{\mathrm{first}} - \omega_c } \;} \qquad \text{(the **Willis equation**, 1849)}
$$

For the elementary single-ring planetary with sun $s$, planet $p$ and ring $r$, the sun-to-ring train value in the carrier frame is $e_0 = - N_r / N_s$ (one external and one internal mesh, so the sign is negative), giving the form every designer memorises:

$$
\omega_s + \alpha \omega_r = ( 1 + \alpha ) \, \omega_c \ , \qquad \boxed{ \; \alpha = \frac{ N_r }{ N_s } \; } \quad \text{(the **planetary form factor**)}
$$

**One equation, three unknown angular velocities.** Any two fix the third, and the third member of the set is the reaction: it carries torque without necessarily carrying power, and which member you choose to hold is the single most consequential decision in the design.
:::

::: exercise Derivation: the tabular (superposition) method {#deriv-tabular level=3}
::: solution
The Willis equation is a statement of linearity, and the tabular method is linearity executed as arithmetic. Write two rows and add.

| | Arm $c$ | Sun $s$ | Planet $p$ | Ring $r$ |
|---|---|---|---|---|
| (1) Lock the whole assembly, rotate once | $+1$ | $+1$ | $+1$ | $+1$ |
| (2) Hold the arm, rotate the sun by $+x$ | $0$ | $+x$ | $- x \, N_s / N_p$ | $- x \, N_s / N_r$ |
| Sum | $1$ | $1 + x$ | $1 - x N_s / N_p$ | $1 - x N_s / N_r$ |

Row (1) is a rigid-body rotation, which is a solution of the equations of the constrained system. Row (2) is a fixed-axis train solution with the arm held. **Their sum is a solution because the governing relations — the rolling constraints — are linear in angular velocity.** Now impose the actual boundary conditions and solve for $x$.

The method generalises to any epicyclic, however complicated: **lock, solve the fixed-axis train, add, apply the constraints.** Its one trap is the sign in row (2), and the way to avoid the trap is to count internal meshes — an odd number makes $e_0$ negative, an even number makes it positive — rather than trying to visualise the rotation.
:::
:::

::: example Elementary planetary, ring fixed {#ex-epi1}
$N_s = 20$, $N_p = 30$, $N_r = 80$. The ring is fixed and the sun turns at $1000\ \mathrm{rev / min}$. Find the carrier speed, the planet's own spin, and the torque ratio.

**Answer.** $\omega_c = 200\ \mathrm{rev / min}$, planet spin $- 400\ \mathrm{rev / min}$ absolute, $T_c / T_s = 5$.

::: solution
$\alpha = 80 / 20 = 4$, and $\omega_s + \alpha \omega_r = ( 1 + \alpha ) \omega_c$ with $\omega_r = 0$ gives

$$
\omega_c = \frac{ \omega_s }{ 1 + \alpha } = \frac{ 1000 }{ 5 } = 200\ \mathrm{rev / min} \quad \text{(same direction as the sun)}
$$

By the table with $N_s / N_r = 1 / 4$, ring-fixed means $1 - x / 4 = 0$, $x = 4$, so the sun row reads $1 + 4 = 5$ against the arm's $1$ — the same $5 : 1$ — and the planet row reads $1 - 4 \times ( 20 / 30 ) = 1 - 2.667 = - 1.667$ times the arm speed:

$$
\omega_p = - 1.667 \times 200 = - 333.3\ \mathrm{rev / min}
$$

**The planet spins backwards at $333\ \mathrm{rev / min}$ while the carrier carries it forwards at $200$** — its absolute motion is a retrograde roll, which is exactly what rolling without slipping on a fixed internal ring requires. Checking against the ring: $1 - 4 \times ( 20 / 80 ) = 0$ ✓.

For the torque, the three member torques must satisfy $T_s + T_r + T_c = 0$ and do no net work in the lossless case. The constraint $\omega_s + \alpha \omega_r - ( 1 + \alpha ) \omega_c = 0$ makes the torque vector proportional to its normal:

$$
T_s : T_r : T_c = 1 : \alpha : - ( 1 + \alpha ) = 1 : 4 : - 5
$$

**so the carrier delivers five times the sun's torque, and the fixed ring reacts four times the sun's torque into the housing without transmitting a watt.** That reaction is the whole structural content of a planetary gearbox: the housing must be a closed frame around the ring, and the four-times-torque ring is why planetary rings are shrunk into a housing rather than bolted to a flange.
:::
:::

::: widget plot
title: The four configurations of one planetary set
f: 1+x; (1+x)/x; x/(1+x); 1/(1+x)
x: 1, 10
y: 0, 11
labels: \text{sun in, carrier out, ring fixed}; \text{ring in, carrier out, sun fixed}; \text{carrier in, ring out, sun fixed}; \text{carrier in, sun out, ring fixed}
caption: Speed ratio $\omega_{\mathrm{in}} / \omega_{\mathrm{out}}$ against the form factor $\alpha = N_r / N_s$ for the four single-reaction-member arrangements of the same gear set. **The same three gears give $1 + \alpha$ or $1 / ( 1 + \alpha )$ or $\alpha / ( 1 + \alpha )$ depending only on which member is held and which way the power goes** — which is the entire operating principle of a three-speed automatic transmission, and of the overdrive unit that used to bolt behind a manual gearbox. Note that only the first curve exceeds 1: **a simple planetary cannot be made into a large speed reducer in the reverse direction, and the ratio $1 + \alpha$ is the ceiling for the set.**
:::

::: exercise Epicyclic with both members driven {level=2 check="14"}
The $20 / 30 / 80$ set above has its ring turning at $+ 400\ \mathrm{rev / min}$ and its sun at $- 100\ \mathrm{rev / min}$. What is the carrier speed?

::: solution
$$
\omega_c = \frac{ \omega_s + \alpha \omega_r }{ 1 + \alpha } = \frac{ - 100 + 4 \times 400 }{ 5 } = \frac{ 1500 }{ 5 } = \boxed{ + 300\ \mathrm{rev / min} }
$$

**and this is a differential, not a gear train.** The set now has two inputs and one output, which is what the mobility count predicted: five links (frame, sun, carrier, ring, planet), four revolute pairs and two gear pairs give $M = 3 ( 5 - 1 ) - 2 ( 4 ) - 1 ( 2 ) = 2$, and it will accept any pair of inputs without argument. **That is its power and its danger.** A fixed-member planetary has one number on the nameplate; a differential has a two-dimensional map, and a control system that does not know which corner of the map it is in will drive the machine into the wrong one.
:::
:::

## Torque, reaction and where the power actually goes

::: definition Circulating power {#def-circulating}
In a simple planetary with one member held, the held member carries torque but no power, and the **loss is the basic train's loss evaluated at the carrier-fixed relative velocities**. Writing $\eta_0$ for the carrier-fixed (ordinary train) efficiency, the loss over the whole set is

$$
P_{\mathrm{loss}} = ( 1 - \eta_0 ) \times \left| P_{\text{through the carrier-fixed train}} \right| = ( 1 - \eta_0 ) \, \left| T_s ( \omega_s - \omega_c ) \right|
$$

and the efficiency is that loss divided by the **actual input power**. The quantity to watch is the ratio of the two,

$$
\boxed{ \; \text{loss fraction} = ( 1 - \eta_0 ) \times \frac{ \left| \omega_{\mathrm{rel}} \right| }{ \left| \omega_{\mathrm{in}} \right| } \times \frac{ T_{\text{mesh}} }{ T_{\mathrm{in}} } \; }
$$

**which contains a ratio of relative speed to input speed, and that ratio can be made arbitrarily large.** When it is, the machine is said to have **circulating power**: more power is passing from one member to another internally than the machine is transmitting from outside, and the losses scale with the internal flow rather than with the duty.
:::

::: example The efficiency of the four configurations {#ex-eff4}
For the $\alpha = 4$ set of [[#ex-epi1]] with $\eta_0 = 0.98$ per carrier-fixed mesh pair:

| Configuration | Ratio $i$ | Loss fraction | $\eta$ |
|---|---|---|---|
| Sun in, carrier out, ring held | 5.000 | $0.02 \times \frac{4}{5} = 0.0160$ | 0.9840 |
| Carrier in, sun out, ring held | 0.200 | $0.0160$ | 0.9840 |
| Ring in, carrier out, sun held | 1.250 | $0.02 \times \frac{1}{5} = 0.0040$ | 0.9960 |
| Carrier in, ring out, sun held | 0.800 | $0.0040$ | 0.9960 |

**Answer.** Holding the **sun** is four times better than holding the **ring**, at every ratio.

::: solution
Work one out in full. Ring held, sun input at $\omega_s$: then $\omega_c = \omega_s / 5$ and the carrier-fixed sun-planet relative speed is $\omega_s - \omega_c = 0.8 \, \omega_s$, while the ring-planet relative speed is $0 - \omega_c = - 0.2 \, \omega_s$. The carrier-fixed train carries $T_s ( \omega_s - \omega_c ) = 0.8 \, T_s \omega_s$ and the actual input is $T_s \omega_s$, so the loss is $0.02 \times 0.8$ of the input and $\eta = 0.984$.

Now hold the sun and drive the ring at $\omega_r$: $\omega_c = \alpha \omega_r / ( 1 + \alpha ) = 0.8 \, \omega_r$, and the carrier-fixed ring speed is $\omega_r - \omega_c = 0.2 \, \omega_r$. The carrier-fixed train now carries only $0.2 \, T_r \omega_r$ against an input of $T_r \omega_r$, so the loss is $0.02 \times 0.2$ and $\eta = 0.996$.

**The physical reason is worth stating plainly: the loss happens where the teeth are sliding past each other, and the teeth slide at the *relative* speed.** Hold the member whose relative speed is smallest and you have built the efficient machine. **Hold the ring, whose relative speed is $\omega_c$ — a large fraction of everything — and you have built the inefficient one.** For a $1 : 1$ ratio comparison this is a rounding error; for the variator of the next example it is the difference between a transmission and a heater.
:::
:::

## The recirculating-power trap

Everything above is benign: the losses are a couple of per cent and the efficiency table is a shopping list of choices. The trap appears the moment **two** members are driven, because then the internal power flows stop being bounded by the external ones.

::: example A variator whose efficiency collapses {#ex-variator}
The $\alpha = 4$ set of [[#ex-epi1]] has its ring driven at $100\ \mathrm{rev / min}$ and its sun driven by a second, controlled source. Tabulate the efficiency against sun speed, taking $\eta_0 = 0.98$.

**Answer.**

| Sun $\omega_s$ | Carrier $\omega_c$ | Ring input | Sun power | Carrier output | Loss | $\eta$ |
|---|---|---|---|---|---|---|
| $- 450$ | $0$ | $450$ | $- 450$ | $0$ | $9.0$ | $- 0.02$ |
| $- 440$ | $1.82$ | $450$ | $- 440$ | $10.0$ | $8.84$ | $0.003$ |
| $- 400$ | $9.09$ | $450$ | $- 400$ | $50.0$ | $8.18$ | $0.093$ |
| $- 300$ | $27.3$ | $450$ | $- 300$ | $150.0$ | $6.55$ | $0.319$ |
| $- 200$ | $45.5$ | $450$ | $- 200$ | $250.0$ | $4.91$ | $0.545$ |
| $- 100$ | $63.6$ | $450$ | $- 100$ | $350.0$ | $3.27$ | $0.771$ |
| $0$ | $81.8$ | $450$ | $0$ | $450.0$ | $1.64$ | $0.996$ |

*(All powers in units of $\lambda = 1$, the torque scale factor of [[#ex-epi1]].)*

::: solution
The recipe is always the same three steps. **One:** get the kinematics from Willis, $\omega_c = ( \omega_s + \alpha \omega_r ) / ( 1 + \alpha )$. **Two:** get the torques from the constraint normal, $T_s : T_r : T_c = 1 : \alpha : - ( 1 + \alpha )$, so $T_r = 4 \lambda$ and $T_c = - 5 \lambda$. **Three:** compute the loss in the carrier frame, where the sun-planet relative speed is $\omega_s - \omega_c$ and the ring-planet relative speed is $\omega_r - \omega_c$, and where the two member powers are equal and opposite by construction:

$$
P_{\mathrm{loss}} = ( 1 - \eta_0 ) \left| T_s ( \omega_s - \omega_c ) \right| = 0.02 \times 1 \times | \omega_s - \omega_c |
$$

At $\omega_s = - 440$: $\omega_c = 1.82$, so the loss is $0.02 \times 441.8 = 8.84$ against a useful output of $10.0$. **The machine is $0.3\ \%$ efficient.** Push the sun to $- 450$ and the carrier stops while the loss is still $9.0$ units — the device has become a **power loop**: $450$ units flow in at the ring, $450$ units flow back out at the sun, $9$ units are destroyed as heat in the teeth, and nothing at all leaves the machine as work.

**Read the table's structure, not its numbers.** The useful output at the carrier is $5 \lambda \omega_c$, and $\omega_c$ is proportional to $\omega_s + 400$ — the difference between two large, nearly equal numbers. **The loss depends on the relative speed at the mesh, which stays large.** Any epicyclic used to obtain a small speed from two large ones is dividing by a small number, and the efficiency is what that division costs. The general rule:

$$
\boxed{ \; \eta \rightarrow 0 \ \text{as} \ | i - i_{\mathrm{lock}} | \rightarrow 0 \quad \text{at fixed} \ \alpha \; }
$$

**and the same algebra in reverse says that a differential drive whose two paths differ only slightly in ratio is a machine you can stall by asking it for a ratio too close to its locked-up value.** This is not exotic: it is why the old hydrostatic-mechanical variators, why some wind-turbine differential drives, and why one particular 1960s continuously variable transmission all had a "forbidden band" in the middle of their ratio range that the control system was not allowed to enter.
:::
:::

::: widget plot
title: Efficiency of an epicyclic variator against sun speed
f: ((x+450)-0.02*abs(x-(x+450)/5.5))/450
x: -500, 0
y: -0.1, 1.05
caption: The $\alpha = 4$ set, ring driven at $100\ \mathrm{rev / min}$, sun driven by a controlled second source. **Efficiency is 100% at $\omega_s = \omega_r$, where nothing meshes, and falls to zero at $\omega_s = - 450$, where the carrier is stalled and the whole of the ring's power is being pushed back out through the sun.** Between those two points the curve is nearly linear, which is the signature of a machine whose loss is nearly constant while its output is nearly zero. **Every epicyclic variator, every hydrostatic split-path transmission and every dual-path wind-turbine drive has a curve like this, and the design question is always whether the operating range stays far enough to the right of it.**
:::

## Planetary design: three conditions, and only the first is obvious

::: theorem The assembly, adjacency and phase conditions {#thm-assembly}
A multi-planet planetary with $n_p$ identical planets cannot in general be put in. It can be assembled if and only if three independent conditions hold.

**1. Assembly (the tooth condition).** With the sun and ring concentric and the planets equally spaced, the ring's internal teeth must line up with the sun's at every planet position. Since $Z_r + Z_s$ is the number of tooth pitches spanned by the diameter, the requirement is

$$
\boxed{ \; \frac{ Z_s + Z_r }{ n_p } = \text{an integer} \; }
$$

**2. Adjacency (the size condition).** Neighbouring planets must not overlap. With $Z_p = ( Z_r - Z_s ) / 2$, the geometry of the triangle sun-centre–planet-centre gives

$$
\boxed{ \; \sin \frac{ \pi }{ n_p } > \frac{ Z_p }{ Z_s + Z_p } \; } \qquad \Longleftrightarrow \qquad \frac{ Z_p }{ Z_s } < \frac{ \sin ( \pi / n_p ) }{ 1 - \sin ( \pi / n_p ) }
$$

**3. Phase (the angular condition).** Even when the teeth meet and the planets fit, the *angular* position of each planet's teeth must be right, or one planet will be sitting on a tooth instead of in a gap. Writing $\gamma_i = ( Z_s + Z_r ) \theta_i / Z_r$ for the $i$-th planet, where $\theta_i$ is its angular position, the requirement is that all $\gamma_i$ have the same fractional part. **For equally spaced planets this is a condition on the tooth counts modulo $n_p$, and it is the condition most often violated in student designs because it is the only one that is not visible in a sketch.**
:::

::: widget plot
title: Largest planet a ring will accept, against planet count
f: sin(pi/x)/(1-sin(pi/x))
x: 3, 8
y: 0, 4
caption: The adjacency limit $Z_p / Z_s < \sin ( \pi / n_p ) / [ 1 - \sin ( \pi / n_p ) ]$. **With three planets the planet may be six times the sun; with six planets it may not be as big as the sun.** This is the reason high-ratio, high-torque planetary stages use three or four planets and not six: the temptation to add planets is a temptation to make each planet smaller, and smaller planets at the same sun diameter means a smaller sun, and a smaller sun at the same torque means a higher $W_t$ per millimetre of face width — which is exactly the quantity that sets both the bending stress and the pitting pressure. **Six planets can easily carry less total torque than four.**
:::

::: example Proportioning a $5.5 : 1$ planetary stage {#ex-proportion}
Design the tooth counts for a single planetary stage of ratio $5.5 : 1$ with four planets, sun and ring unshifted at $20^{\circ}$, and all counts at or below 125.

**Answer.** $Z_s = 24$, $Z_p = 42$, $Z_r = 108$, $n_p = 4$.

::: solution
Ratio first: $i = 1 + \alpha = 1 + Z_r / Z_s = 5.5$, so $Z_r = 4.5 \, Z_s$. **The ratio therefore fixes the ratio of two integers and nothing else** — an infinity of solutions, all filtered by the three conditions.

Geometry: $Z_p = ( Z_r - Z_s ) / 2 = 1.75 \, Z_s$, so $Z_s$ must be a multiple of 4 for $Z_p$ to be an integer. Try $Z_s = 20$: $Z_r = 90$, $Z_p = 35$. Assembly: $( 20 + 90 ) / 4 = 27.5$ — **fails**. Try $Z_s = 24$: $Z_r = 108$, $Z_p = 42$.

$$
\text{Assembly: } \frac{ 24 + 108 }{ 4 } = 33 \checkmark \qquad \text{Adjacency: } \sin 45^{\circ} = 0.7071 > \frac{ 42 }{ 24 + 42 } = 0.6364 \ \checkmark
$$

Phase: $\gamma = ( Z_s + Z_r ) \theta / Z_r = 132 \times 90^{\circ} / 108 = 110^{\circ}$, whose fractional part in units of a tooth pitch ($360 / 108 = 3.333^{\circ}$) is $110 / 3.333 = 33.0$ exactly — **so the phase condition is satisfied for free here, because the assembly condition happened to make $\gamma$ an integer.** That is not general, and when it fails the fix is to make one planet's angular position deliberately wrong by a whole tooth pitch, which means drilling the carrier's planet-pin holes on a bolt circle that is not equally spaced. **Every carrier with an odd planet count or an awkward tooth ratio has one hole that looks like a machining mistake and is not.**

**Note what the design did not have any choice about.** The ratio fixed $Z_r / Z_s$; the integer requirement fixed $Z_s$ to a multiple of 4; the assembly condition then picked between the multiples; and the adjacency condition ruled out $Z_s = 32$ and above for four planets. **Four constraints, one degree of freedom, and the answer was $24 / 42 / 108$ or nothing.** This is why planetary tooth counts look arbitrary on a drawing and are in fact the least arbitrary numbers on it.
:::
:::

::: exercise Can four planets go in? {level=2 check="1"}
A planetary has $Z_s = 20$, $Z_p = 40$, $Z_r = 100$. Test the assembly and adjacency conditions for four planets, and state the ratio.

::: solution
$$
\text{Assembly: } \frac{ 20 + 100 }{ 4 } = 30 \ \checkmark \qquad \text{Adjacency: } \sin 45^{\circ} = 0.7071 > \frac{ 40 }{ 20 + 40 } = 0.6667 \ \checkmark
$$

**Both are satisfied, with $6\ \%$ of clearance on the adjacency check — the planets fit, and the ratio is $i = 1 + 100 / 20 = \boxed{ 6 }$.** But look at how little room is left. The adjacency margin is $0.7071 - 0.6667 = 0.0404$ in sine, which corresponds to a planet-tip clearance of about $1.2\ \mathrm{mm}$ at a $100\ \mathrm{mm}$ ring pitch radius — **and the planet must also clear the ring's tooth tips, the carrier's shoulder, the sun's shoulder and the oil feed that has to reach the sun-planet mesh.** A design that passes the adjacency test with $6\ \%$ margin is a design in which the planet bearing has to be a needle roller with no inner race, because there is no room for anything else. **The adjacency condition is a geometric minimum; the lubrication and bearing layout are what actually set the planet size, and they are always less forgiving than the sine.**
:::
:::

## Load sharing: why four planets do not carry four times

::: definition Load distribution factor {#def-loadshare}
If $n_p$ planets shared the load perfectly, each would carry $T / n_p$ and the stage would carry $n_p$ times the capacity of one mesh. They do not. The **load distribution factor** $K_\gamma$ of AGMA 6102 is defined by

$$
P_{\max} = \frac{ P_{\text{total}} }{ n_p } \, K_\gamma \qquad \Rightarrow \qquad \text{capacity} \propto \frac{ n_p }{ K_\gamma }
$$

and its recommended values for a well-made, properly floating stage are:

| Planets $n_p$ | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|
| $K_\gamma$ (good design) | 1.05 | 1.07 | 1.10 | 1.12 | 1.15 |
| $K_\gamma$ (rigid, poorly made) | 1.25 | 1.50 | 1.80 | 2.20 | 2.60 |
| Net capacity $n_p / K_\gamma$ (good) | 1.90 | 2.80 | 3.64 | 4.46 | 5.22 |
| Net capacity (bad) | 1.60 | 2.00 | 2.22 | 2.27 | 2.31 |

::: solution
**Read the last two rows.** A good four-planet stage carries 3.64 times one mesh, not four; a bad one carries 2.22 times, which is **less than a good two-planet stage.** And the bad-design row saturates: past four planets, adding more buys nothing at all, because the load has already found its path and the extra planets are idle passengers.

The physical reason is that the planets can only share load if they all take up the same position, and they cannot, because the carrier's pin holes are bored to $\pm 0.02\ \mathrm{mm}$, the sun and ring are positioned to $\pm 0.03\ \mathrm{mm}$, and the mesh stiffness is $20\ \mathrm{N / \mu m}$ per millimetre of face width — so a $0.03\ \mathrm{mm}$ position error is $60\ \mathrm{N / \mu m \times mm}$ of load imbalance per millimetre of width, which is tens of per cent of the working load. **The remedies are all versions of the same idea: make the load paths compliant enough that elastic deformation equalises them, or make one member able to float.** In order of effectiveness: **axially floating ring gear** (the ring is free to move along its axis by a fraction of a tooth depth, so it finds its own best position — this alone recovers most of the ideal), **torsionally soft carrier** (a deliberately thin-walled carrier plate whose twist is large compared with the tooth spacing error), **spherical planet bearings** that let each planet tilt, and **gear crowning** that tolerates the misalignment the imbalance produces. **A stage with a floating ring and a soft carrier reaches $K_\gamma = 1.05$ at six planets. A stage with a rigid ring and a stiff carrier reaches $K_\gamma = 2.5$ at four and the designer spends the rest of his life explaining why the gearbox is rated at a third of what the teeth could take.**
:::
:::

## Choosing the ratio: inertia, speed and the ceiling

::: example Servo axis: the optimum ratio and why you will not use it {#ex-inertia}
A rotary table carries $0.40\ \mathrm{kg \cdot m^2}$ of fixturing and parts. The motor is a $3\ \mathrm{kW}$ AC servo with $J_m = 2.0 \times 10^{-4}\ \mathrm{kg \cdot m^2}$ and $19\ \mathrm{N \cdot m}$ of peak torque, and its speed ceiling is $3000\ \mathrm{rev / min}$. What ratio maximises the table's acceleration, and what ratio will the design use?

**Answer.** $\boxed{i_{\mathrm{opt}} = 44.7}$ for acceleration; the design uses $i \approx 20$.

::: solution
Reflect the load to the motor and differentiate: the load-side acceleration produced by a motor torque $T_m$ through a ratio $i$ is

$$
\alpha_L = \frac{ T_m \, i }{ J_m i^{2} + J_L }
$$

which is maximised where its derivative vanishes, i.e. at $J_m i^{2} = J_L$,

$$
i_{\mathrm{opt}} = \sqrt{ \frac{ J_L }{ J_m } } = \sqrt{ \frac{ 0.40 }{ 2.0 \times 10^{- 4 } } } = \sqrt{ 2000 } = 44.7 \ , \qquad \alpha_L = \frac{ 19 \times 44.7 }{ 0.40 + 0.40 } = 1062\ \mathrm{rad / s^2}
$$

::: widget plot
title: Load acceleration against gear ratio, for one motor and one load
f: 19*x/(0.0002*x*x+0.4)
x: 1, 120
y: 0, 1100
caption: $\alpha_L = T_m i / ( J_m i^2 + J_L )$ for the servo above. **The curve is remarkably flat near the peak** — $i = 30$ gives $983\ \mathrm{rad / s^2}$ and $i = 60$ gives $1018$, both within $8\ \%$ of the optimum — **and it falls off a cliff on the low-ratio side**, where $i = 10$ yields only $452$. **This asymmetry is the practical content of the inertia-matching rule: getting the ratio too low is a serious loss, getting it too high is a mild one, and the "optimum" is the middle of a wide plateau.** So the rule should be read as "keep $i$ within a factor of two of $\sqrt{ J_L / J_m }$", not as a target to be hit.
:::

**Why the design will not use 44.7.** At $i = 44.7$ the table's maximum speed of, say, $60\ \mathrm{rev / min}$ demands $2680\ \mathrm{rev / min}$ from the motor — inside the ceiling, but only just, and the peak-torque speed is what actually limits a positioning axis. More importantly:

1. **The gearbox has inertia of its own.** A three-stage train at $i = 45$ contributes a further $15$–$25\ \%$ of $J_m i^2$ at the motor flange, which pulls the true optimum down by $7$–$12\ \%$ and makes the flat plateau even flatter.
2. **The plateau is flat, the backlash is not.** Reflected backlash at the load is $j_{\mathrm{out}} = j_{\mathrm{in}} \times i$; at $i = 45$ with $8$ arc-min of lost motion per stage and three stages, the table has $24 \times 45 / 60 = 18$ arc-min of dead band, which for a $500\ \mathrm{mm}$-diameter table is $1.3\ \mathrm{mm}$ at the rim. **Positioning accuracy, not acceleration, is what sets the ratio in most servo axes.**
3. **The plateau is flat and the price is not.** Each additional stage costs $1.5\ \%$ of the power, one seal, one natural frequency and one set of teeth to go wrong.

**The honest statement of the rule is: choose $i$ to be within a factor of two of $\sqrt{ J_L / J_m }$, then choose it as small as the speed and accuracy requirements allow.**
:::
:::

## The differential: a gear train with two answers

::: example Open differential, one wheel on ice {#ex-diff}
A front axle with a $1.6\ \mathrm{m}$ track turns a $12\ \mathrm{m}$-radius corner at $14\ \mathrm{m / s}$ on dry tarmac. Wheel radius $0.31\ \mathrm{m}$. Find the two wheel speeds and the speed at which the differential's spider gears spin. Then: on ice, with $\mu_{\mathrm{ice}} = 0.10$, $\mu_{\mathrm{dry}} = 0.90$ and $4000\ \mathrm{N}$ on each driven wheel, what fraction of a $3000\ \mathrm{N \cdot m}$ axle torque reaches the road?

**Answer.** $442.5$ and $420.1\ \mathrm{rev / min}$, spider at $11.2\ \mathrm{rev / min}$ relative; and **$8.3\ \%$** of the torque reaches the road.

::: solution
The kinematics are pure geometry. The two wheels travel arcs in the ratio of their radii,

$$
\frac{ \omega_{\mathrm{in}} }{ \omega_{\mathrm{out} } } = \frac{ R - t / 2 }{ R + t / 2 } = \frac{ 11.2 }{ 11.8 } = 0.9492
$$

and the open differential's defining property is that its carrier speed is the **mean** of the two half-shaft speeds — the $2:1$ spider relation $\omega_L + \omega_R = 2\omega_c$, which is exactly the $\alpha = 1$ case of the Willis equation. With $\omega_{\mathrm{mean}} = V/r = 45.16\ \mathrm{rad/s} = 431.3\ \mathrm{rev/min}$, the two conditions $(\omega_{\mathrm{in}} + \omega_{\mathrm{out}})/2 = 431.3$ and $\omega_{\mathrm{in}}/\omega_{\mathrm{out}} = 11.2/11.8$ give

$$
\omega_{\mathrm{out}} = 431.3 \times \frac{ 2 \times 11.8 }{ 11.2 + 11.8 } = 442.5\ \mathrm{rev/min} \ , \qquad
\omega_{\mathrm{in}} = 431.3 \times \frac{ 2 \times 11.2 }{ 23.0 } = 420.1\ \mathrm{rev/min}
$$

and the spider's speed relative to its carrier is $\left( 442.5 - 420.1 \right) / 2 = 11.2\ \mathrm{rev/min}$ on each side.
**The differential is doing almost nothing in steady cornering — a $5.1\ \%$ speed difference — and that is the whole point: an open differential is a machine that spends its life nearly locked-up, which is why its efficiency is $98$–$99\ \%$ and why nobody notices it is there until it is needed.**

**Now the ice.** An open differential splits torque equally, always, because the spider gears have no way to react a torque difference — the torque split is a *kinematic* consequence of $\alpha = 1$, not a tunable parameter. So both wheels get $1500\ \mathrm{N \cdot m}$, the ice wheel breaks traction at

$$
T_{\mathrm{ice}} = \mu_{\mathrm{ice}} W r = 0.10 \times 4000 \times 0.31 = 124\ \mathrm{N \cdot m}
$$

and the total tractive torque collapses to $2 \times 124 = 248\ \mathrm{N \cdot m}$ out of $3000$ available — **$8.3\ \%$.** The dry wheel, which could have taken $1116\ \mathrm{N \cdot m}$, is deliberately given only $124$.

| Differential | Torque to the pair | Fraction of axle torque |
|---|---|---|
| Open (torque bias 1:1) | $248\ \mathrm{N \cdot m}$ | $8.3\ \%$ |
| Limited-slip, bias 3.5:1 | $124 + 3.5 \times 124 = 558\ \mathrm{N \cdot m}$ | $18.6\ \%$ |
| Locked (100 %) | $( 0.1 + 0.9 ) \times 4000 \times 0.31 = 1240\ \mathrm{N \cdot m}$ | $41.3\ \%$ |

**and the last row is why a locked differential is illegal to use on dry roads:** with both wheels at full grip the locked axle forces them to turn at the same speed, which in a corner means one of them must slip at $3.5\ \%$ continuously, and that is a tyre-eating, steering-knocking, axle-winding state that the driveline's stored torsional energy pays for in one shock. **The whole art of the limited-slip unit is to be the third row when it is needed and the first row when it is not, and every version of it — clutch pack, gear-coupled, Torsen, viscous — is a different way of making torque bias depend on speed difference rather than on nothing at all.**
:::
:::

## When one stage must do the work of three

::: definition Special epicyclics {#def-special}
Two families trade the ordinary planetary's robustness for a ratio that would otherwise need several stages.

**Harmonic (strain-wave) drive.** A thin-walled flexible cup with $Z_f$ external teeth is deformed into an ellipse by a wave generator and meshes at the two ends of the major axis with a rigid circular spline of $Z_c$ internal teeth and with a rigid output. Because the flexspline is *internal* to the circular spline and has two fewer teeth, one revolution of the wave generator advances it by two tooth pitches:

$$
i = - \frac{ Z_f }{ Z_c - Z_f } = - \frac{ Z_f }{ 2 } \qquad \Rightarrow \qquad Z_f = 198 , \ Z_c = 200 \ \Longrightarrow \ i = - 99
$$

**Zero backlash by construction** (the flexspline is elastically preloaded against the spline), essentially infinite positional repeatability, and a torsional stiffness of $5$–$15\ \mathrm{N \cdot m / arcmin}$. The costs: the flexspline is a **fatigue component**, rated against roughly $10^{8}$ flexure cycles, which at a continuous $100\ \mathrm{rev / min}$ input is **under two years**; efficiency $0.75$–$0.85$; a hysteresis loss of $0.05$–$0.15\ \mathrm{N \cdot m}$ that is independent of torque and dominates the efficiency at light load; and no shock tolerance whatever.

**Cycloidal (pin-wheel) drive.** A disc with $Z_r - 2$ rollers rolls inside $Z_r$ fixed pins, driven through an eccentric. Ratio $i = Z_r / ( Z_r - Z_{\mathrm{disc}} )$, typically $9$–$119$ in one stage, with **all teeth in contact simultaneously** — the load-sharing factor is $K_\gamma \approx 1.01$, the best of any gear family, because the contact pattern is forced by the geometry rather than equalised by compliance. Torsional stiffness is several times a planetary's at the same size, life is $30\,000$–$100\,000$ hours, efficiency is $0.90$–$0.95$. The costs are a **rectification-like velocity ripple** at the roller-passing frequency (which is why a cycloidal axis needs a fine-resolution encoder on the output, not the motor), expensive ground eccentric rollers, and a price per unit torque two to four times a planetary's.
:::

| Family | Ratio / stage | $\eta$ | $K_\gamma$ | Backlash | Life | Relative cost |
|---|---|---|---|---|---|---|
| Involute spur / helical | $\le 7$ | 0.985 | 1.00 | 8–20 arc-min | $10^{9}$ cycles | 1.0 |
| Planetary (3–4 planets) | $\le 8$ | 0.984 | 1.05–1.15 | 5–15 arc-min | $10^{9}$ cycles | 1.5 |
| Cycloidal | $\le 119$ | 0.92 | 1.01 | $< 1$ arc-min | $3 \times 10^{4}$–$10^{5}\ \mathrm{h}$ | 3.0 |
| Harmonic | $\le 200$ | 0.80 | 1.00 | 0 | $10^{8}$ cycles | 4.0 |
| Worm, self-locking | $\le 60$ | 0.40–0.77 | n/a | 15–40 arc-min | wear-limited | 1.2 |

::: exercise Harmonic drive life {level=2 check="1.9"}
A harmonic drive has $Z_f = 198$ flexspline teeth and $Z_c = 200$ circular-spline teeth. State the ratio, and estimate the continuous life at a $100\ \mathrm{rev / min}$ input if the flexspline is rated for $10^{8}$ flexure cycles.

::: solution
$$
i = - \frac{ Z_f }{ Z_c - Z_f } = - \frac{ 198 }{ 2 } = - 99
$$

**and the life is the number that decides the application.** The flexspline completes one full bending cycle for every revolution of the wave generator, so at $100\ \mathrm{rev / min}$ it consumes $100$ of its $10^{8}$ cycles every minute:

$$
\frac{ 10^{8} \ \text{cycles} }{ 100 \ \mathrm{rev / min} } = 1.0 \times 10^{6} \ \mathrm{min} = 16{,}700 \ \mathrm{h} = \boxed{ 1.9 \ \text{years of continuous running} }
$$

**This single division is why harmonic drives are in robot wrists, telescope drives and antenna mounts, and are not in conveyor drives and wind turbines.** They are the only gear family whose life is set by cycles of elastic bending rather than by contact fatigue — and bending cycles are consumed by *time*, not by *load*, so a harmonic drive idling unloaded all night is wearing out at exactly the same rate as one doing work. **Contact-fatigue gears can be saved by a duty cycle; a flexure cannot.**
:::
:::

## Design: a $100 : 1$ gearbox for a $1.5\ \mathrm{MW}$ wind turbine {#sec-winddesign}

::: example Proportioning the three stages {#ex-wind}
A $1.5\ \mathrm{MW}$ turbine runs its rotor at $15.0\ \mathrm{rev / min}$ and its generator at $1500\ \mathrm{rev / min}$. Total ratio $100 : 1$. Proportion the stages, find the torques, the ring reactions and the heat the lubrication system must remove.

**Answer.** Planetary–planetary–helical at $5.500 \times 4.600 \times 3.952 = 99.995$; rotor shaft $955\ \mathrm{kN \cdot m}$; largest ring reaction $781\ \mathrm{kN \cdot m}$; heat $69\ \mathrm{kW}$.

::: solution
**Stage ratios.** Two planetary stages plus one helical, chosen so that each stage's tooth counts survive the three conditions of [[#thm-assembly]]:

| Stage | Type | $Z_s$ | $Z_p$ | $Z_r$ | $n_p$ | Ratio | $\eta$ |
|---|---|---|---|---|---|---|---|
| 1 | Planetary, ring held | 24 | 42 | 108 | 4 | 5.500 | 0.9836 |
| 2 | Planetary, ring held | 20 | 26 | 72 | 4 | 4.600 | 0.9844 |
| 3 | Helical, $83 / 21$ | — | — | — | — | 3.952 | 0.9850 |
| | | | | | **Total** | **99.995** | **0.9537** |

Check stage 1: $( 24 + 108 ) / 4 = 33$ integer ✓; $\sin 45^{\circ} = 0.7071 > 42 / 66 = 0.6364$ ✓. Stage 2: $( 20 + 72 ) / 4 = 23$ ✓; $0.7071 > 26 / 46 = 0.5652$ ✓. **Both stages are carrier-in, sun-out, ring-held — a speed *increaser*, which is what a turbine needs, and which the first curve of [[#ex-eff4]] shows is the efficient direction for that arrangement.**

**Torque flow.** Rotor torque $= 1.5 \times 10^{6} / ( 15.0 \times 2\pi / 60 ) = 954.9\ \mathrm{kN \cdot m}$:

| Member | Speed | Torque | Note |
|---|---|---|---|
| Rotor shaft = stage-1 carrier | 15.0 | $954.9\ \mathrm{kN \cdot m}$ | 4 arms, so $239\ \mathrm{kN \cdot m}$ per planet pin |
| Stage-1 ring (held) | 0 | $781.3\ \mathrm{kN \cdot m}$ | **reacted into the housing, transmitting nothing** |
| Stage-1 sun = stage-2 carrier | 82.5 | $170.8\ \mathrm{kN \cdot m}$ | |
| Stage-2 ring (held) | 0 | $133.7\ \mathrm{kN \cdot m}$ | |
| Stage-2 sun = stage-3 pinion | 379.5 | $36.5\ \mathrm{kN \cdot m}$ | |
| Generator | 1499.9 | $9.11\ \mathrm{kN \cdot m}$ | $1.431\ \mathrm{MW}$ out of $1.500$ |

**The housing carries $781\ \mathrm{kN \cdot m}$ that never appears at any shaft.** That is the structural content of the design: the ring is shrunk into a nodular-iron housing whose job is to be a closed torque frame, and the whole casting is sized by this reaction rather than by the weight it supports.

**Teeth.** Stage 1 at module $m = 16\ \mathrm{mm}$: sun pitch radius $0.016 \times 24 / 2 = 0.192\ \mathrm{m}$, so the sun-planet mesh carries $170.8 \times 10^{3} / 0.192 = 889\ \mathrm{kN}$ in total, $222\ \mathrm{kN}$ per planet. Lewis at $\sigma_{\mathrm{allow}} = 850\ \mathrm{MPa}$ and $Y = 0.40$:

$$
b = \frac{ W_t }{ \sigma_{\mathrm{allow}} \, m \, Y } \times K_\gamma = \frac{ 222 \times 10^{3} }{ 850 \times 10^{6} \times 0.016 \times 0.40 } \times 1.10 = 45\ \mathrm{mm}
$$

**and the design uses $b = 70\ \mathrm{mm}$, because pitting, not bending, governs** — the same conclusion [[mechanisms/gears]] reached for the $55\ \mathrm{kW}$ industrial gearbox, at two thousand times the torque. Ring pitch diameter $0.016 \times 108 = 1.73\ \mathrm{m}$, which is what a $1.5\ \mathrm{MW}$ first stage actually is.

**Heat.** $1.500 \times ( 1 - 0.9537 ) = 69\ \mathrm{kW}$ of heat in a gearbox weighing about $3\ \mathrm{t}$ — enough to require $120$–$150\ \mathrm{l / min}$ of filtered, cooled oil and a $90\ \mathrm{kW}$ water cooler with the turbine's own cooling loop. **The lubrication system is not an accessory to a wind-turbine gearbox; it is the subsystem whose failure mode — a blocked filter, a pump seal, a cooler fouled by a maize field — is the failure mode of the turbine.**

**Why not one stage?** $i = 100$ needs $\alpha = 99$, so $Z_p = ( 99 - 1 ) Z_s / 2 = 49 \, Z_s$ and the adjacency condition demands

$$
\sin \frac{ \pi }{ n_p } > \frac{ 49 Z_s }{ Z_s + 49 Z_s } = 0.980 \quad \Longrightarrow \quad n_p < 2.29
$$

**so a single $100 : 1$ planetary stage can have only two planets.** Its load-sharing factor would be $K_\gamma = 1.05$ — respectable — but it would have no redundancy, an unbalanced two-arm carrier, planets too large to allow more than two, and a ring of $99 \times 17 = 1683$ teeth. **The adjacency condition, not the strength and not the size, is what forces the wind-turbine gearbox to be three stages.**
:::
:::

::: exercise Why three stages and not two {level=3 check="2"}
Could the $1.5\ \mathrm{MW}$ gearbox above be built as two planetary stages of $10 : 1$ each? Test the adjacency condition for $\alpha = 9$ with three and with four planets, and state the largest number of planets that will go in.

::: solution
With $\alpha = 9$: $Z_p = ( 9 - 1 ) Z_s / 2 = 4 Z_s$, so

$$
\frac{ Z_p }{ Z_s + Z_p } = \frac{ 4 }{ 5 } = 0.800 \quad \Rightarrow \quad \sin \frac{ \pi }{ n_p } > 0.800 \ \Rightarrow \ \frac{ \pi }{ n_p } > 0.9273\ \mathrm{rad} \ \Rightarrow \ n_p < 3.39
$$

$$
n_p = 3 : \ \sin 60^{\circ} = 0.8660 > 0.800 \ \checkmark \qquad n_p = 4 : \ \sin 45^{\circ} = 0.7071 < 0.800 \ \times
$$

**so $\boxed{ 3 }$ planets is the maximum, and the two-stage alternative is not impossible — it is just worse.** Three planets gives $K_\gamma = 1.07$ against the four-planet design's $1.10$, so the load sharing is if anything better; what you lose is that **all of the $955\ \mathrm{kN \cdot m}$ now passes through three planet pins instead of four, so each pin carries $318$ rather than $239\ \mathrm{kN \cdot m}$, and the planet bearings — which are the actual life-limited component in a wind-turbine planetary — are being asked for $33\ \%$ more $L_{10}$ life at the same diameter.** The second thing you lose is the redundancy: at $\alpha = 9$ the ring reaction is $9 / 10$ of the carrier torque, so a single $10 : 1$ stage holds $859\ \mathrm{kN \cdot m}$ in one ring instead of $781$ in one and $134$ in another, and the housing becomes a single casting sized by one enormous reaction. **Two stages is cheaper and worse; three stages is what the adjacency condition and the bearing life arrive at.**
:::
:::

::: quiz Idlers and tooth counts {#quiz-idler}
A compound train's first stage is $19 / 95$ and its second is $17 / 95$. Which statement is true?

- [ ] Both stages are equally good, because both pinions are prime
- [x] The first stage is the bad one: $95 = 5 \times 19$, so $\gcd = 19$ and each wheel tooth is struck by exactly one pinion tooth for the life of the gearbox
- [ ] The second is worse, because $17$ does not divide $95$
- [ ] Neither matters, because the contact pattern always walks around both gears

::: solution
**The first stage is the bad one.** $\gcd ( 19 , 95 ) = 19$, so each of the wheel's 95 teeth is visited by exactly $95 / 19 = 5$ pinion teeth — and, worse, **each wheel tooth is struck by exactly one pinion tooth and by no other, forever.** $\gcd ( 17 , 95 ) = 1$, so the second stage hunts: pinion tooth 1 walks through all 95 wheel teeth before it returns home, and every tooth pair meets once in 95 revolutions of the wheel.

**The point of the question is that you cannot tell by looking, and primality is no help.** $19$ is prime and $19 / 95$ is the worst pairing available, because $95$ happens to be a multiple of it; $17$ is prime and $17 / 95$ is perfect. **The test is $\gcd ( N_1 , N_2 ) = 1$ and nothing else.** Changing the first wheel from 95 to 96 teeth moves the ratio by $1.05\ \%$ and takes the visited count from 5 to 95 — **the cheapest reliability improvement available in gear-train design, and the one that never appears in a strength calculation.**
:::
:::

::: quiz Recirculating power {#quiz-circ}
An epicyclic with $\alpha = 6$ has its ring driven at $+ 600\ \mathrm{rev / min}$ by a $3600\lambda$-unit source and its sun driven at $- 3000\ \mathrm{rev / min}$ by a second source, where $\lambda$ is the torque scale factor $T_s : T_r : T_c = 1 : 6 : - 7$. What is the carrier speed, and roughly what is the efficiency?

- [x] $+ 86\ \mathrm{rev / min}$ and about $8\ \%$ — the useful output is small because it is the difference of two large numbers, while the loss is not
- [ ] $+ 86\ \mathrm{rev / min}$ and about $98\ \%$, because efficiency is a property of the meshes and not of the speeds
- [ ] $- 343\ \mathrm{rev / min}$ and about $98\ \%$
- [ ] The arrangement is impossible: a planetary cannot have two inputs

::: solution
**$+ 86\ \mathrm{rev / min}$ and about $8\ \%$.** Willis gives $\omega_c = ( \omega_s + \alpha \omega_r ) / ( 1 + \alpha ) = ( - 3000 + 3600 ) / 7 = + 85.7$. The power balance is

$$
P_{\mathrm{ring}} = 6 \lambda \times 600 = 3600 \lambda \quad \text{in}, \qquad
P_{\mathrm{sun}} = 1 \lambda \times ( - 3000 ) = - 3000 \lambda \quad \text{out of the sun}, \qquad
P_c = - 7 \lambda \times 85.7 = 600 \lambda \ \text{out}
$$

and the loss, evaluated in the carrier frame, is $0.02 \times | \omega_s - \omega_c | = 0.02 \times 3086 = 61.7 \lambda$. Against a total external input of $6600 \lambda$ the efficiency is $\left( 600 - 61.7 \right) / 6600 = 8.2\ \%$.

**Option 2 is the tempting wrong answer, and it is wrong for a reason worth stating exactly: $\eta_0$ is a property of the meshes, but the *loss* is $\eta_0$ times the relative velocity at the mesh, and the relative velocity is set by the designer's choice of which member to hold and how fast to turn the others.** Push the sun to $- 3600\ \mathrm{rev / min}$ and the carrier stops dead: the ring's $3600 \lambda$ is delivered straight back out at the sun, $72 \lambda$ is destroyed as heat, and the machine transmits nothing at all. **That is a stall, and every split-path transmission has one somewhere in its map — the design question is whether the control system is allowed to steer into it.**
:::
:::


::: exercise What a rigid ring costs {level=2 check="0.61"}
A four-planet stage is designed with an axially floating ring gear and achieves $K_\gamma = 1.10$. A purchasing change substitutes a rigidly located ring and the same drawing gives $K_\gamma = 1.80$. By what factor must the stage's torque rating be reduced?

::: solution
Capacity goes as $n_p / K_\gamma$, and $n_p$ has not changed, so

$$
\frac{ T_{\mathrm{rigid}} }{ T_{\mathrm{floating}} } = \frac{ K_{\gamma, \mathrm{floating}} }{ K_{\gamma, \mathrm{rigid}} } = \frac{ 1.10 }{ 1.80 } = \boxed{ 0.61 }
$$

**a $39\ \%$ cut in torque rating, bought by a drawing change that removed one sliding fit and one clearance.** The mechanism is worth being explicit about, because it is the reason the floating ring is not an optional refinement. With a rigid ring, the four planets must each be positioned to a small fraction of a tooth thickness by the carrier's pin holes and the ring's bore at the same time; a $0.03\ \mathrm{mm}$ composite error at a mesh stiffness of $20\ \mathrm{N / \mu m}$ per millimetre of face width puts tens of per cent of the working load onto the luckiest planet. **A floating ring removes that constraint entirely: the ring slides along its axis until its own teeth are carrying uniformly, and the tolerance stack-up disappears from the load path.** The cost is a spline or a crown-tooth location, a seal that must tolerate the float, and an assembly instruction that says "do not tighten the ring retaining plate until the gears are meshed" — which is exactly the instruction that gets ignored, and the resulting gearbox is a $0.61$ machine wearing a $1.00$ nameplate.
:::
:::

## Where this leads

- **Efficiency is a map, not a number.** The variator curve of [[#ex-variator]] is the same shape for every split-path transmission, and the machines that failed — the hydrostatic-mechanical CVTs of the 1970s, the differential-fed belt drives of the 1980s — failed because a control system was allowed to park in the flat part of the curve. The design deliverable is the map with a forbidden region drawn on it, not a nameplate percentage.
- **The next layer up is the control system.** A planetary with two driven members is a differential, and a differential with one member driven by a machine rather than braked is a *power-split device* — which is the reason a hybrid-electric car has no gearbox at all, and the reason its engine can run at one speed while the wheels run at another. That is the subject of [[control-systems]] applied to a drivetrain.
- **Elasticity is what makes the arithmetic work.** Load sharing, crowning, floating rings and torsionally soft carriers are all the same trick: letting deformation do what the tolerance stack cannot. The quantitative version lives in [[materials-science/mechanical-properties]] and in [[vibrations/two-degrees-of-freedom]], where the mesh stiffness of $20\ \mathrm{N / \mu m}$ per millimetre reappears as the spring in the classic three-mass torsional model that decides whether a gearbox's first torsional natural frequency sits under a gear-mesh frequency.
- **Tooth form is a separate subject and a separate failure mode.** Everything here treats a gear as a ratio. [[mechanisms/gears]] treats it as a contact, and the two views disagree about which stage in the wind-turbine gearbox of [[#ex-wind]] will fail first — the arithmetic says none of them, the pitting calculation says stage 3, and the field data say the planet bearings.
- **The integer problem does not go away; it becomes a design-space search.** When the ratio is one constraint among twenty — noise, mass, efficiency, packaging, commonality with a sibling product — the answer comes from enumerating legal tooth counts on a computer, which is exactly what the planetary searches behind every commercial gearbox reduce to.

::: history
| Year | Event |
|---|---|
| 1657, 1680s | **Robert Hooke** builds watches on epicyclic trains and uses the planetary arrangement as a working model of the solar system — the reason the small wheels are still called *planets* and the frame an *arm*. |
| 1695 | **Philippe de La Hire** gives the first mathematical treatment of epicyclic gear trains, written for clockmakers; the theory of the subject exists for sixty years before its engineering does. |
| 1804 | **Joseph-Marie Jacquard** patents a differential for his loom, to wind two threads at unequal rates — the first industrial use of a two-input gear train, and a mechanism that predates the motor car by ninety years. |
| 1827 | **Cornélis and Jean-Joseph Merens** of The Hague patent the road-vehicle differential after a celebrated dispute with Christiaan Beyeren over who thought of it first; the question is still open. |
| 1841, 1849 | **Robert Willis**, *Principes de la cinématique* (1841) and *The Principles of Mechanism* (1849), reduces every epicyclic train to one linear relation between three angular velocities, coins the word *kinematics*, and gives the superposition argument that is still taught as the "tabular method". |
| 1939 | **General Motors Hydra-Matic**, fitted to the Oldsmobile Custom Cruiser, becomes the first mass-produced fully automatic transmission: four speeds from three planetary sets and a band, at $3.685 / 2.068 / 1.000 / 0.700$, with the ratios obtained by holding a different member of the same gear set each time. |
| 1957, granted 1963 | **C.F. Musin's** US patent 3,095,752 describes the strain-wave drive: two teeth of difference between a flexible cup and a rigid spline, and a ratio of $- 99$ in one stage with zero backlash. The flexspline's fatigue life becomes a design constraint that no gear had ever had before. |
| 1958–63 | **AGMA 218 and 6102** publish load distribution factors for multi-planet stages, converting load sharing from a matter of shop practice into a number that can be put into a rating equation — and making the difference between $K_\gamma = 1.05$ and $K_\gamma = 2.5$ a contractual one. |
:::

::: summary Key takeaways
- **A gear ratio is an exact ratio of two integers.** That is the whole reason gears are used, and the whole reason gear-train design is a problem in number theory before it is one in strength.
- **An idler changes only the sign and the centre distance.** Its tooth count cancels identically out of the train value; its mesh, bearings, seal, loss and natural frequency do not cancel.
- **Make adjacent tooth counts coprime.** $\gcd ( N_1 , N_2 ) = 1$ is the test; primality of either count is not. A non-hunting pair wears a periodic pattern and reports it as a vibration at the wheel's own frequency.
- **Willis: $\omega_s + \alpha \omega_r = ( 1 + \alpha ) \omega_c$.** One linear equation in three velocities; the tabular method is its superposition form and works on any epicyclic however complicated.
- **The torques are $1 : \alpha : - ( 1 + \alpha )$, and the held member carries torque without power.** In a wind-turbine gearbox the biggest torque in the machine never reaches a shaft.
- **Efficiency depends on which member you hold**, because the loss is proportional to the *relative* velocity at the mesh. Holding the sun instead of the ring is worth a factor of four in loss at $\alpha = 4$.
- **Two driven members means recirculating power.** As the required ratio approaches the locked-up value, the useful output becomes the difference of two large numbers while the loss stays large, and the efficiency goes to zero and then negative. Every split-path transmission has this stall somewhere in its map.
- **Three conditions decide a planetary: assembly, adjacency, phase.** $( Z_s + Z_r ) / n_p$ integer, $\sin ( \pi / n_p ) > Z_p / ( Z_s + Z_p )$, and matching tooth phase. **The adjacency condition, not the strength, is what forces a $100 : 1$ wind-turbine gearbox to be three stages** — at $\alpha = 99$ it permits only two planets.
- **Planets do not share load unless you let them.** Capacity goes as $n_p / K_\gamma$; a floating ring buys $K_\gamma = 1.05$–$1.10$ and a rigid ring costs you $39\ \%$ of the rating.
- **Choose the ratio within a factor of two of $\sqrt{ J_L / J_m }$, then choose it as small as speed and accuracy allow.** The acceleration plateau is wide; the reflected backlash is proportional to $i$ and is not.
:::

## Further reading

- **R. Willis**, *The Principles of Mechanism, Manufactures and Arts* (London, 1841; 2nd ed. 1849) — the epicyclic relation, the classification of mechanisms, and the origin of the word *kinematics*. Read the chapters on "momental force" to see the subject being founded.
- **J.J. Uicker, G.R. Pennock & J.E. Shigley**, *Theory of Machines and Mechanisms*, 5th ed. (Oxford University Press, 2015) — the cleanest treatment of the tabular method and of the difference between train value and ratio, with the gear-train chapter that most courses assign.
- **R.C. Norton**, *Design of Machinery*, 6th ed. (McGraw-Hill, 2020) — planetary examples worked the way a designer works them, and the best available figures for load distribution factors and their dependence on the floating arrangement.
- **F.L. Litvin & A. Fuentes**, *Gear Geometry and Applied Theory*, 2nd ed. (Cambridge University Press, 2004) — the theory of tooth forms, profile shift and the ground-finish geometry that makes $K_\gamma$ achievable at all.
- **D.P. Tennent**, *Gearless Drives* (Cambridge University Press, 1993) — the variator and the recirculating-power problem, treated as a mechanism-design subject rather than a control one.
- **AGMA 6102-F19**, *Principles of Relations for Calculating the Tooth Loading of Parallel Axis Gear Drives* — where the $K_\gamma$ figures come from, what they assume, and how far they can be trusted outside the range of the tests behind them.
- **C.F. Musin**, "Flexible shaft transmission," US Patent 3,095,752 (granted 3 December 1963) — four pages that created the harmonic drive, and a model example of a patent worth reading as engineering rather than as prior art.
