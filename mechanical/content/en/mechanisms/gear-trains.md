---
id: mechanisms/gear-trains
title: "Gear Trains, Epicyclics and Planetary Gears"
summary: "Train value and integer arithmetic, hunting tooth counts, the tabular method for epicyclics, torque split, recirculating power, and the three conditions that decide whether a planetary can be assembled at all."
translated: false
tags: ["gear trains", "epicyclic", "planetary", "Willis equation", "load sharing", "recirculating power"]
---

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
