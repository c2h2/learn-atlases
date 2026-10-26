::: warning The ratio is exact. Everything else is approximate.
A belt drive's ratio drifts with slip, a chain's oscillates by up to a few per cent at the chordal-action frequency on a small sprocket, and a friction drive's depends on the load. **A gear train's ratio is an exact ratio of two integers, and it is exact at every instant, not on average.** That single property is why every machine that must know where something is — a clock, a dividing head, a lead screw, a robot wrist, an aircraft control unit — is geared rather than belted, and it is also the source of the subject's central frustration:

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

The consequences are all bad and all slow. Any manufacturing error in a tooth meets the same partner every $N_1/d$ wheel revolutions instead of being spread over all of them. Any material inclusion is loaded at the same contact every cycle. A worn tooth stays worn and wears its partner into a matching hollow, and the pair develops a periodic excitation at exactly the wheel's own frequency, which is the signature a vibration analyst uses to identify it. **The rule is to make adjacent tooth counts coprime, or at least to make their ratio have a large common multiple — a "hunting" tooth count — so that the contact pattern walks slowly around both gears.** $17 / 101$ or $17 / 103$ instead of $17 / 102$ moves the ratio by 1% and fixes all of it.

The exception is deliberate: **a non-hunting pair is sometimes accepted when the gears are lapped or run in as a matched set**, which is why some machinery specifies gear sets that must be replaced together, and why the drawing says so.
:::

## Integer arithmetic: which ratios exist

::: example Two stages for a $23.4 : 1$ reducer {#ex-234}
A conveyor drive needs exactly $23.4 : 1$ from a two-stage compound train, with no stage above $7 : 1$, no gear above 100 teeth and no pinion below 17 teeth (the unshifted $20^{\circ}$ undercutting limit).

**Answer.** No exact two-stage solution exists. $\frac{81}{15} \times \frac{65}{15} = 23.400$ is exact but needs two 15-tooth pinions; $\frac{88}{19} \times \frac{96}{19} = 23.4017$ is within $0.007\ \%$ with legal counts.

::: solution
The arithmetic is a factor hunt. $23.4 = 117 / 5$, and $a c / ( b d ) = 117 / 5$ requires $ac = 117 k$ and $bd = 5 k$ for some integer $k$. Trying $k = 45$ gives $b d = 225 = 15 \times 15$ and $ac = 5265 = 81 \times 65$:

$$
\frac{81}{15} \times \frac{65}{15} = 5.400 \times 4.3333 = 23.400 \quad \text{exactly}
$$

**and it fails the undercutting test**, because both pinions have 15 teeth. Every larger $k$ that keeps $b, d \ge 17$ pushes $a$ or $c$ above 100 or a stage above $7 : 1$; an exhaustive search over all $b, d \in [ 17 , 100 ]$ confirms that **there is no exact two-stage solution with all four counts between 17 and 100.** The real answers are:

| Option | Tooth counts | Comment |
|---|---|---|
| Accept profile shift | $81 / 15 \times 65 / 15$ with $x \ge +0.12$ on both pinions | Exact ratio; two shifted pinions, no standard catalogue parts |
| Add a stage | $69 / 25 \times 66 / 23 \times 65 / 22 = 2.76 \times 2.870 \times 2.955 = 23.400$ | Exact, all pairs coprime; one extra mesh, 1.5% of the power, one more seal and one more natural frequency |
| Replace one stage with a planetary | $i = 5.500$ planetary of [[#ex-proportion]] plus a $4.2545$ helical stage | Smallest and lightest; the helical stage still has to hit $4.2545$ with integers |
| Relax the specification | $( 88 / 19 ) \times ( 96 / 19 ) = 23.4017$ | $0.007\ \%$ error; legal, coprime tooth counts |

**The lesson is not the arithmetic, it is the last row.** $( 88 / 19 ) \times ( 96 / 19 )$ uses only legal tooth counts, every pair hunts, and it is $0.007\ \%$ away from what was asked. **A ratio specified to three significant figures is a ratio specified without a reason**; ask what the machine does with the number, and if the answer is "sets a belt speed to within a few per cent", take the $0.007\ \%$. **The cheapest fix for an integer-arithmetic problem is nearly always to relax the specification, and the most expensive is to add a stage.**
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

and each convergent is the best rational approximation available with a denominator that small. **$99 / 70$ is the best single pair of gears under 100 teeth**, with an error of $7.2 \times 10^{- 5}$, or $0.0051\ \%$.

Two stages change the picture completely. Four tooth counts can form vastly more distinct ratios than two, so a compound train can come far closer than any single pair:

$$
\frac{58}{57} \times \frac{82}{59} = \frac{4756}{3363} = 1.414 \, 213 \, 50 \quad \Rightarrow \quad \text{error } 6.3 \times 10^{- 8} \ \ ( 0.000 \, 004 \, 4 \, \% )
$$

**more than a thousand times better than the best single pair, using gears no bigger.** The reason is combinatorial: with four counts under 100 there are millions of candidate products $a c / ( b d )$ and only a few thousand fractions $a / b$, so the products fill the number line far more densely. This is the standard way to approximate an irrational ratio — $\pi$ in a dividing head, a lunar month in a clock — and the search is done by computer. What it costs is two more gears and a shaft where one pair might have done if the tolerance had been stated honestly.
:::
:::

::: exercise Hunting tooth count {level=1 check="6"}
A $17$-tooth pinion drives a $102$-tooth wheel. How many distinct wheel teeth does a given pinion tooth ever contact?

::: solution
$\gcd ( 17 , 102 ) = 17$, and the number of wheel teeth visited by any one pinion tooth is

$$
\frac{ N_2 }{ \gcd ( N_1 , N_2 ) } = \frac{ 102 }{ 17 } = \boxed{ 6 }
$$

**and the reverse is worse: each of those six wheel teeth is struck by exactly one pinion tooth and by no other, for the life of the gearbox.** Change the wheel to 101 teeth and the ratio moves from 6.000 to 5.941 — a $1\ \%$ change — while the visited count jumps from 6 to 101, because 17 and 101 are coprime. **This is the cheapest reliability improvement in gear-train design and it is the one most often left on the table, because it never appears in a strength calculation.**
:::
:::

## Epicyclic trains: what changes when an axis moves

::: definition The Willis equation {#def-willis}
An **epicyclic** (planetary) train has at least one wheel whose axis moves. Give the moving frame — the **carrier** or **arm** — an angular velocity $\omega_c$, and every wheel's absolute velocity becomes $\omega_i - \omega_c$ in that frame. **In the carrier frame the train is an ordinary fixed-axis train**, so its train value $e_0$ is the simple product of the mesh ratios, and

$$
\boxed{ \; e_0 = \frac{ \omega_{\mathrm{last}} - \omega_c }{ \omega_{\mathrm{first}} - \omega_c } \;} \qquad \text{(the Willis equation)}
$$

For the elementary single-ring planetary with sun $s$, planet $p$ and ring $r$, the sun-to-ring train value in the carrier frame is $e_0 = - N_s / N_r$ (one external and one internal mesh, so the sign is negative), giving the form every designer memorises:

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

The method generalises to any epicyclic, however complicated: **lock, solve the fixed-axis train, add, apply the constraints.** Its one trap is the sign in row (2), and the way to avoid the trap is to count external meshes — an odd number makes $e_0$ negative, an even number makes it positive (internal meshes do not reverse) — rather than trying to visualise the rotation.
:::
:::

::: example Elementary planetary, ring fixed {#ex-epi1}
$N_s = 20$, $N_p = 30$, $N_r = 80$. The ring is fixed and the sun turns at $1000\ \mathrm{rev / min}$. Find the carrier speed, the planet's own spin, and the torque ratio.

**Answer.** $\omega_c = 200\ \mathrm{rev / min}$, planet absolute speed $- 333.3\ \mathrm{rev / min}$, $T_c / T_s = 5$.

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
caption: Speed ratio $\omega_{\mathrm{in}} / \omega_{\mathrm{out}}$ against the form factor $\alpha = N_r / N_s$ for the four single-reaction-member arrangements of the same gear set. **The same three gears give $1 + \alpha$, $( 1 + \alpha ) / \alpha$, $\alpha / ( 1 + \alpha )$ or $1 / ( 1 + \alpha )$ depending only on which member is held and which way the power goes** (holding the carrier gives the two reversing ratios $- \alpha$ and $- 1 / \alpha$) — which is the operating principle of the planetary automatic transmission, and of the overdrive unit that used to bolt behind a manual gearbox. Only the first two curves are reductions, and $( 1 + \alpha ) / \alpha$ never exceeds 2: **with a fixed member, $1 + \alpha$ is the largest reduction one simple planetary set can give.**
:::

::: exercise Epicyclic with both members driven {level=2 check="300"}
The $20 / 30 / 80$ set above has its ring turning at $+ 400\ \mathrm{rev / min}$ and its sun at $- 100\ \mathrm{rev / min}$. What is the carrier speed, in rev/min?

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

**Answer.** Holding the **sun** gives a quarter of the loss of holding the **ring** (but a much smaller ratio).

::: solution
Work one out in full. Ring held, sun input at $\omega_s$: then $\omega_c = \omega_s / 5$ and the carrier-fixed sun-planet relative speed is $\omega_s - \omega_c = 0.8 \, \omega_s$, while the ring-planet relative speed is $0 - \omega_c = - 0.2 \, \omega_s$. The carrier-fixed train carries $T_s ( \omega_s - \omega_c ) = 0.8 \, T_s \omega_s$ and the actual input is $T_s \omega_s$, so the loss is $0.02 \times 0.8$ of the input and $\eta = 0.984$.

Now hold the sun and drive the ring at $\omega_r$: $\omega_c = \alpha \omega_r / ( 1 + \alpha ) = 0.8 \, \omega_r$, and the carrier-fixed ring speed is $\omega_r - \omega_c = 0.2 \, \omega_r$. The carrier-fixed train now carries only $0.2 \, T_r \omega_r$ against an input of $T_r \omega_r$, so the loss is $0.02 \times 0.2$ and $\eta = 0.996$.

**The physical reason is worth stating plainly: the loss happens in the meshes, and the meshes only see the power that flows through them in the carrier frame.** With the ring held, that carrier-frame power is $\alpha / ( 1 + \alpha ) = 0.8$ of the throughput; with the sun held it is only $1 / ( 1 + \alpha ) = 0.2$ of it, and the rest of the power is carried round by the rotation of the whole assembly, which costs nothing. **Hold the member that makes the carrier-frame power small and you have built the efficient machine.** The table also shows the price: the sun-held ratios are the small ones, $1.25$ and $0.8$, while the useful reduction $1 + \alpha$ needs the ring held. For two-member drives the same accounting is the difference between a transmission and a heater, as the next example shows.
:::
:::

## The recirculating-power trap

Everything above is benign: the losses are a couple of per cent and the efficiency table is a shopping list of choices. The trap appears the moment **two** members are driven, because then the internal power flows stop being bounded by the external ones.

::: example A variator whose efficiency collapses {#ex-variator}
The $\alpha = 4$ set of [[#ex-epi1]] has its ring driven at $100\ \mathrm{rev / min}$ and its sun driven by a second, controlled source that is geared back to the same prime mover, so that power taken out at the sun is returned to the input. The carrier is the output. Tabulate the efficiency against sun speed, taking $\eta_0 = 0.98$.

**Answer.**

| Sun $\omega_s$ | Carrier $\omega_c$ | Ring power in | Sun power | Carrier output | Loss | $\eta$ |
|---|---|---|---|---|---|---|
| $+ 100$ | $100$ | $400$ | $+ 100$ | $500$ | $0$ | $1.000$ |
| $0$ | $80$ | $400$ | $0$ | $400$ | $1.6$ | $0.996$ |
| $- 100$ | $60$ | $400$ | $- 100$ | $300$ | $3.2$ | $0.989$ |
| $- 200$ | $40$ | $400$ | $- 200$ | $200$ | $4.8$ | $0.976$ |
| $- 300$ | $20$ | $400$ | $- 300$ | $100$ | $6.4$ | $0.936$ |
| $- 350$ | $10$ | $400$ | $- 350$ | $50$ | $7.2$ | $0.856$ |
| $- 390$ | $2$ | $400$ | $- 390$ | $10$ | $7.8$ | $0.216$ |
| $- 400$ | $0$ | $400$ | $- 400$ | $0$ | $8.0$ | — |

*(Speeds in rev/min; powers in units of $\lambda \times 1\ \mathrm{rev / min}$, with $\lambda = T_s$ the torque scale factor of [[#ex-epi1]].)*

::: solution
The recipe is always the same three steps. **One:** get the kinematics from Willis, $\omega_c = ( \omega_s + \alpha \omega_r ) / ( 1 + \alpha )$. **Two:** get the torques from the constraint normal, $T_s : T_r : T_c = 1 : \alpha : - ( 1 + \alpha )$, so $T_s = \lambda$, $T_r = 4 \lambda$ and $T_c = - 5 \lambda$; the ring power is $4 \lambda \times 100 = 400 \lambda$, the sun power is $\lambda \omega_s$ (negative means power leaving at the sun), and the carrier output is $5 \lambda \omega_c$. **Three:** compute the loss in the carrier frame, where the sun turns at $\omega_s - \omega_c$:

$$
P_{\mathrm{loss}} = ( 1 - \eta_0 ) \left| T_s ( \omega_s - \omega_c ) \right| = 0.02 \, \lambda \, | \omega_s - \omega_c | , \qquad \eta = 1 - \frac{ P_{\mathrm{loss}} }{ 5 \lambda \omega_c }
$$

where $5 \lambda \omega_c = 400 \lambda + \lambda \omega_s$ is the net power drawn from the prime mover. At $\omega_s = - 390$: $\omega_c = 2$, so the loss is $0.02 \times 392 = 7.8$ against a useful output of $10$. **The machine is $22\ \%$ efficient.** Push the sun to $- 400$ and the carrier stops while the loss is still $8.0$ units — the device has become a **power loop**: $400$ units flow in at the ring, $400$ units flow back out at the sun, $8$ units are destroyed as heat in the teeth, and nothing at all leaves the machine as work.

**Read the table's structure, not its numbers.** The useful output at the carrier is $5 \lambda \omega_c = \lambda ( \omega_s + 400 )$ — the difference between two large, nearly equal numbers. **The loss depends on the relative speed at the mesh, which stays large.** Any epicyclic used to obtain a small speed from two large ones is dividing by a small number, and the efficiency is what that division costs:

$$
\boxed{ \; \eta \rightarrow 0 \ \text{(and then negative) as} \ \omega_{\mathrm{out}} \rightarrow 0 \ \text{with the input speeds, and hence the mesh speeds, held large} \; }
$$

**The same algebra says that a split-path drive asked for an output speed close to its stall point is a machine that circulates power instead of transmitting it.** This is why power-split transmissions — hydrostatic-mechanical tractor drives, hybrid-car power-split units, differential-drive wind-turbine concepts — are designed so that the normal operating range stays well away from the stall, and why their efficiency is quoted as a map rather than a single number.
:::
:::

::: widget plot
title: Efficiency of an epicyclic variator against sun speed
f: 1-0.02*abs(x-(x+400)/5)/(x+400)
x: -390, 100
y: 0, 1.05
caption: The $\alpha = 4$ set, ring driven at $100\ \mathrm{rev / min}$, sun driven by a controlled second source, carrier as output. **Efficiency is 100% at $\omega_s = \omega_r$, where the set turns as a rigid body and nothing meshes, and falls towards zero as $\omega_s \to - 400$, where the carrier stalls and the whole of the ring's power is pushed back out through the sun.** The loss changes only slowly along the curve; it is the output that vanishes. **Every power-split transmission has a curve like this somewhere in its map, and the design question is always whether the operating range stays far enough to the right of it.**
:::

## Planetary design: three conditions, and only the first is obvious

::: theorem The coaxiality, assembly and adjacency conditions {#thm-assembly}
A planetary with $n_p$ identical, equally spaced planets, all gears unshifted and of one module $m$, can be built if and only if three conditions hold.

**1. Coaxiality (the size condition).** The sun–planet and planet–ring centre distances must be equal, $m ( Z_s + Z_p ) / 2 = m ( Z_r - Z_p ) / 2$, so

$$
\boxed{ \; Z_r = Z_s + 2 Z_p \; }
$$

**2. Assembly (the tooth condition).** With the first planet in mesh, the sun and ring are locked in angle; turning the carrier by $2 \pi / n_p$ to bring the next planet position round must leave the sun and ring teeth in the same relative phase. That requires

$$
\boxed{ \; \frac{ Z_s + Z_r }{ n_p } = \text{an integer} \; }
$$

**3. Adjacency (the neighbour condition).** Neighbouring planets must not touch. The planet centres sit on a circle of radius $a = m ( Z_s + Z_p ) / 2$, so adjacent centres are $2 a \sin ( \pi / n_p )$ apart, and this must exceed the planet tip diameter $m ( Z_p + 2 )$:

$$
\boxed{ \; ( Z_s + Z_p ) \sin \frac{ \pi }{ n_p } > Z_p + 2 \; } \qquad \xrightarrow{\ Z \text{ large} \ } \qquad \frac{ Z_p }{ Z_s } < \frac{ \sin ( \pi / n_p ) }{ 1 - \sin ( \pi / n_p ) }
$$
:::

::: proof
Condition 1 is the requirement that sun, carrier and ring share one axis. For condition 2, insert the first planet at a fixed place in the housing, hold the ring, and turn the carrier through $\theta = 2 \pi / n_p$, carrying that planet away. By Willis the sun turns through $( 1 + Z_r / Z_s ) \theta$. The ring has not moved, so a second planet can be dropped into the vacated place if and only if the sun's teeth there are back in their original phase, i.e. the sun has turned through a whole number of its pitches $2 \pi / Z_s$: $( 1 + Z_r / Z_s ) ( 2 \pi / n_p ) \times Z_s / 2 \pi = ( Z_s + Z_r ) / n_p$ must be an integer. Repeating the step inserts every planet. Condition 3 is the chord of the planet-centre circle compared with the planet's outside diameter; dropping the "+2" (the addenda) gives the pitch-circle form, which is the limit for large tooth counts. A real design also needs clearance for the carrier, bearings and oil feed on top of the tip clearance.
:::

When condition 2 fails for equal spacing, the planets can still go in at *unequal* angles $\theta_k$ chosen so that $( Z_s + Z_r ) \theta_k / 2 \pi$ is an integer for every $k$; the carrier is then drilled with slightly uneven pin spacing. That works kinematically but unbalances the carrier and the planet loads, so equal spacing is preferred.

::: widget plot
title: Largest planet a ring will accept, against planet count
f: sin(pi/x)/(1-sin(pi/x))
x: 3, 8
y: 0, 7
caption: The pitch-circle adjacency limit $Z_p / Z_s < \sin ( \pi / n_p ) / [ 1 - \sin ( \pi / n_p ) ]$ (the tip clearance makes the real limit slightly tighter). **With three planets the planet may be about six times the sun; with six planets it must be smaller than the sun.** Since the ring-held ratio is $1 + \alpha = 2 + 2 Z_p / Z_s$, this caps the stage ratio at about $14.9$ for three planets, $6.8$ for four and $4.0$ for six. This is why high-ratio planetary stages use three or four planets and low-ratio, high-torque stages can use five to seven: the number of planets and the stage ratio cannot be chosen independently.
:::

::: example Proportioning a $5.5 : 1$ planetary stage {#ex-proportion}
Design the tooth counts for a single planetary stage of ratio $5.5 : 1$ with four planets, sun and ring unshifted at $20^{\circ}$, and all counts at or below 125.

**Answer.** $Z_s = 24$, $Z_p = 42$, $Z_r = 108$, $n_p = 4$.

::: solution
Ratio first: $i = 1 + \alpha = 1 + Z_r / Z_s = 5.5$, so $Z_r = 4.5 \, Z_s$. **The ratio therefore fixes the ratio of two integers and nothing else** — an infinity of solutions, all filtered by the three conditions.

Coaxiality: $Z_p = ( Z_r - Z_s ) / 2 = 1.75 \, Z_s$, so $Z_s$ must be a multiple of 4 for $Z_p$ to be an integer, and $Z_r = 4.5 \, Z_s \le 125$ caps it at $Z_s \le 27$. With the sun at least 17 teeth to avoid undercutting, the candidates are $Z_s = 20$ and $Z_s = 24$. Try $Z_s = 20$: $Z_r = 90$, $Z_p = 35$. Assembly: $( 20 + 90 ) / 4 = 27.5$ — **fails**. Try $Z_s = 24$: $Z_r = 108$, $Z_p = 42$.

$$
\text{Assembly: } \frac{ 24 + 108 }{ 4 } = 33 \checkmark \qquad \text{Adjacency: } ( 24 + 42 ) \sin 45^{\circ} = 46.67 > 42 + 2 = 44 \ \checkmark
$$

The planet tips clear each other by $2.67$ modules — about $8\ \mathrm{mm}$ at module 3, enough room for the carrier webs between them.

**Note what the design did not have any choice about.** The ratio fixed $Z_r / Z_s$; coaxiality forced $Z_s$ to a multiple of 4; the tooth-count ceiling and the undercut limit left two candidates; and the assembly condition removed one of them. Adjacency, at this ratio, is satisfied by every sun above 10 teeth, because the pitch-circle ratio $Z_p / ( Z_s + Z_p ) = 0.636$ does not depend on $Z_s$. **Several constraints, one free integer, and the answer was $24 / 42 / 108$ or nothing.** This is why planetary tooth counts look arbitrary on a drawing and are in fact the least arbitrary numbers on it.
:::
:::

::: exercise Can four planets go in? {level=2 check="6"}
A planetary has $Z_s = 20$, $Z_p = 40$, $Z_r = 100$. Test the coaxiality, assembly and adjacency conditions for four planets, and state the ring-held ratio.

::: solution
$$
\text{Coaxiality: } 20 + 2 \times 40 = 100 \ \checkmark \qquad \text{Assembly: } \frac{ 20 + 100 }{ 4 } = 30 \ \checkmark \qquad \text{Adjacency: } 60 \sin 45^{\circ} = 42.43 > 40 + 2 = 42 \ \checkmark
$$

**All three are satisfied — the planets fit, and the ratio is $i = 1 + 100 / 20 = \boxed{ 6 }$.** But look at how little room is left. The planet tips clear each other by $0.43$ of a module: at module 2 (ring pitch radius $100\ \mathrm{mm}$) that is $0.85\ \mathrm{mm}$, **and the carrier webs that hold the planet pins have to pass between the planets as well.** A design that passes the adjacency test by less than a module has no room for carrier webs between the planets, and in practice needs fewer planets or a smaller planet. **The adjacency condition is a geometric minimum; the carrier, bearing and lubrication layout are what actually set the planet size, and they are always less forgiving.**
:::
:::

## Load sharing: why four planets do not carry four times

::: definition Load distribution factor {#def-loadshare}
If $n_p$ planets shared the load perfectly, each would carry $T / n_p$ and the stage would carry $n_p$ times the capacity of one mesh. They do not. The **mesh load factor** $K_\gamma$ (the symbol used in ISO 6336 and in the AGMA epicyclic-drive standards) is defined by

$$
P_{\max} = \frac{ P_{\text{total}} }{ n_p } \, K_\gamma \qquad \Rightarrow \qquad \text{capacity} \propto \frac{ n_p }{ K_\gamma }
$$

and representative values, for a well-made stage with a floating member and for a rigid, poorly made one, are:

| Planets $n_p$ | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|
| $K_\gamma$ (good design) | 1.05 | 1.07 | 1.10 | 1.12 | 1.15 |
| $K_\gamma$ (rigid, poorly made) | 1.25 | 1.50 | 1.80 | 2.20 | 2.60 |
| Net capacity $n_p / K_\gamma$ (good) | 1.90 | 2.80 | 3.64 | 4.46 | 5.22 |
| Net capacity (bad) | 1.60 | 2.00 | 2.22 | 2.27 | 2.31 |

::: solution
**Read the last two rows.** A good four-planet stage carries 3.64 times one mesh, not four; a bad one carries 2.22 times, which is **less than a good two-planet stage.** And the bad-design row saturates: past four planets, adding more buys nothing at all, because the load has already found its path and the extra planets are idle passengers.

The physical reason is that the planets can only share load if they all take up the same position, and they cannot, because the carrier's pin holes are bored to $\pm 0.02\ \mathrm{mm}$, the sun and ring are positioned to $\pm 0.03\ \mathrm{mm}$, and the mesh stiffness is $20\ \mathrm{N / \mu m}$ per millimetre of face width — so a $0.03\ \mathrm{mm}$ position error is $30\ \mu\mathrm{m} \times 20\ \mathrm{N / ( \mu m \cdot mm )} = 600\ \mathrm{N}$ of load imbalance per millimetre of face width — $42\ \mathrm{kN}$ over a $70\ \mathrm{mm}$ face, a large fraction of the working load. **The remedies are all versions of the same idea: make the load paths compliant enough that elastic deformation equalises them, or make one member able to float.** In order of effectiveness: **a floating sun or ring gear** (mounted through a gear coupling so that it can move radially by a few tenths of a millimetre and centre itself among the planets — this alone recovers most of the ideal), **torsionally soft carrier** (a deliberately thin-walled carrier plate whose twist is large compared with the tooth spacing error), **spherical planet bearings** that let each planet tilt, and **gear crowning** that tolerates the misalignment the imbalance produces. **A rigid four-planet stage at $K_\gamma = 1.80$ is rated at $1 / 1.80 = 56\ \%$ of what its teeth could carry with perfect sharing.**
:::
:::

## Choosing the ratio: inertia, speed and the ceiling

::: example Servo axis: the optimum ratio and why you will not use it {#ex-inertia}
A rotary table carries $0.40\ \mathrm{kg \cdot m^2}$ of fixturing and parts. The motor is a $3\ \mathrm{kW}$ AC servo with $J_m = 2.0 \times 10^{-4}\ \mathrm{kg \cdot m^2}$ and $19\ \mathrm{N \cdot m}$ of peak torque, and its speed ceiling is $3000\ \mathrm{rev / min}$. The table must index at up to $150\ \mathrm{rev / min}$. What ratio maximises the table's acceleration, and what ratio will the design use?

**Answer.** $\boxed{i_{\mathrm{opt}} = 44.7}$ for acceleration; the design uses $i = 20$, the largest ratio the speed requirement allows, at $75\ \%$ of the optimum acceleration.

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

**Why the design will not use 44.7.** At $i = 44.7$ the table's required $150\ \mathrm{rev / min}$ would demand $6700\ \mathrm{rev / min}$ from a $3000\ \mathrm{rev / min}$ motor. The speed ceiling caps the ratio at $3000 / 150 = 20$, where

$$
\alpha_L = \frac{ 19 \times 20 }{ 2.0 \times 10^{- 4} \times 400 + 0.40 } = \frac{ 380 }{ 0.48 } = 792\ \mathrm{rad / s^2}
$$

— $75\ \%$ of the optimum, because $i = 20$ lies on the steep low-ratio side of the curve. Two further effects push the same way:

1. **The gearbox has inertia of its own.** A multi-stage train adds, at the motor flange, typically $15$–$25\ \%$ of $J_m$; that pulls the true optimum down by $1 - 1 / \sqrt{1.15}$ to $1 - 1 / \sqrt{1.25}$, i.e. $7$–$11\ \%$.
2. **More ratio usually means more stages.** Each additional stage costs about $1.5\ \%$ of the power, one more seal, one more natural frequency and one more set of teeth whose backlash adds to the lost motion at the table.

**The honest statement of the rule is: start from $\sqrt{ J_L / J_m }$, then let the load's top speed (which caps $i$) and the stage count (which grows with $i$) decide; the acceleration plateau is wide enough that they usually can.**
:::
:::

## The differential: a gear train with two answers

::: example Open differential, one wheel on ice {#ex-diff}
A front axle with a $1.6\ \mathrm{m}$ track turns a $12\ \mathrm{m}$-radius corner at $14\ \mathrm{m / s}$ on dry tarmac. Wheel radius $0.31\ \mathrm{m}$. Find the two wheel speeds and the speed of each side gear relative to the differential carrier. Then: on ice, with $\mu_{\mathrm{ice}} = 0.10$, $\mu_{\mathrm{dry}} = 0.90$ and $4000\ \mathrm{N}$ on each driven wheel, what fraction of a $3000\ \mathrm{N \cdot m}$ axle torque reaches the road?

**Answer.** $442.5$ and $420.0\ \mathrm{rev / min}$, side gears at $\pm 11.25\ \mathrm{rev / min}$ relative to the carrier; and **$8.3\ \%$** of the torque reaches the road.

::: solution
The kinematics are pure geometry. The two wheels travel arcs in the ratio of their radii,

$$
\frac{ \omega_{\mathrm{in}} }{ \omega_{\mathrm{out} } } = \frac{ R - t / 2 }{ R + t / 2 } = \frac{ 11.2 }{ 11.8 } = 0.9492
$$

and the open differential's defining property is that its carrier speed is the **mean** of the two half-shaft speeds — the $2:1$ spider relation $\omega_L + \omega_R = 2\omega_c$, which is exactly the $\alpha = 1$ case of the Willis equation. With $\omega_{\mathrm{mean}} = V/r = 45.16\ \mathrm{rad/s} = 431.3\ \mathrm{rev/min}$, the two conditions $(\omega_{\mathrm{in}} + \omega_{\mathrm{out}})/2 = 431.3$ and $\omega_{\mathrm{in}}/\omega_{\mathrm{out}} = 11.2/11.8$ give

$$
\omega_{\mathrm{out}} = 431.3 \times \frac{ 2 \times 11.8 }{ 11.2 + 11.8 } = 442.5\ \mathrm{rev/min} \ , \qquad
\omega_{\mathrm{in}} = 431.3 \times \frac{ 2 \times 11.2 }{ 23.0 } = 420.0\ \mathrm{rev/min}
$$

and each side gear turns relative to the carrier at $\left( 442.5 - 420.0 \right) / 2 = 11.25\ \mathrm{rev/min}$, in opposite directions; the spider (pinion) gears spin at that speed times the side-gear-to-spider tooth ratio.
**The differential is doing almost nothing in steady cornering — a $5.1\ \%$ speed difference — and that is the whole point: an open differential is a machine that spends its life nearly locked-up, which is why its efficiency is $98$–$99\ \%$ and why nobody notices it is there until it is needed.**

**Now the ice.** An open differential splits torque equally, always, because the spider gears have no way to react a torque difference — the equal split follows from the symmetry of the spider gears ($\alpha = 1$, torques $1 : 1 : - 2$), not from a tunable parameter. So both wheels get $1500\ \mathrm{N \cdot m}$, the ice wheel breaks traction at

$$
T_{\mathrm{ice}} = \mu_{\mathrm{ice}} W r = 0.10 \times 4000 \times 0.31 = 124\ \mathrm{N \cdot m}
$$

and the total tractive torque collapses to $2 \times 124 = 248\ \mathrm{N \cdot m}$ out of $3000$ available — **$8.3\ \%$.** The dry wheel, which could have taken $1116\ \mathrm{N \cdot m}$, is deliberately given only $124$.

| Differential | Torque to the pair | Fraction of axle torque |
|---|---|---|
| Open (torque bias 1:1) | $248\ \mathrm{N \cdot m}$ | $8.3\ \%$ |
| Limited-slip, bias 3.5:1 | $124 + 3.5 \times 124 = 558\ \mathrm{N \cdot m}$ | $18.6\ \%$ |
| Locked (100 %) | $( 0.1 + 0.9 ) \times 4000 \times 0.31 = 1240\ \mathrm{N \cdot m}$ | $41.3\ \%$ |

**and the last row is why a locking differential is engaged only at low speed or off-road:** with both wheels at full grip the locked axle forces them to turn at the same speed, which in this corner means the tyres must scrub away a $5\ \%$ speed difference continuously — a tyre-wearing, steering-fighting, axle-winding state. **The whole art of the limited-slip unit is to be the third row when it is needed and the first row when it is not, and every version of it — clutch pack, gear-coupled, Torsen, viscous — is a different way of making torque bias depend on speed difference rather than on nothing at all.**
:::
:::

## When one stage must do the work of three

::: definition Special epicyclics {#def-special}
Two families trade the ordinary planetary's robustness for a ratio that would otherwise need several stages.

**Harmonic (strain-wave) drive.** A thin-walled flexible cup (the **flexspline**) with $Z_f$ external teeth is deformed into an ellipse by a **wave generator** and meshes, at the two ends of the major axis, with a rigid **circular spline** of $Z_c$ internal teeth. With the circular spline fixed and the flexspline as output, the flexspline has two fewer teeth, so one revolution of the wave generator shifts it back by two tooth pitches:

$$
i = - \frac{ Z_f }{ Z_c - Z_f } = - \frac{ Z_f }{ 2 } \qquad \Rightarrow \qquad Z_f = 198 , \ Z_c = 200 \ \Longrightarrow \ i = - 99
$$

**Near-zero backlash** (the flexspline is elastically preloaded into the spline), very good repeatability, and ratios of about $30$ to $320$ in one stage. The costs: the flexspline is a **fatigue component** — every point on it is bent through **two** full cycles per wave-generator revolution, because the ellipse has two lobes, and the bending strain is set by the ellipse, so it is present even with no load; efficiency is typically $0.7$–$0.9$ and falls at light load and low temperature; and the torsional stiffness is lower than that of a planetary of the same size.

**Cycloidal drive.** A lobed disc with $Z_d = Z_p - 1$ lobes rolls inside a ring of $Z_p$ fixed pins, driven by an eccentric on the input shaft; its slow wobbling rotation is taken off through pins in holes in the disc. The ratio is

$$
i = - \frac{ Z_d }{ Z_p - Z_d } = - ( Z_p - 1 )
$$

typically from about $6$ to $119$ in one stage, with **many lobes in contact at once** (in theory about half of them share the load), which gives high shock-load capacity and stiffness. The costs are a small torque and velocity ripple at the lobe-passing frequency, accurately ground discs, pins and eccentric bearings, and a price per unit torque well above a planetary's.
:::

| Family | Ratio / stage | Typical $\eta$ | Backlash |
|---|---|---|---|
| Involute spur / helical | $\le 7$ | 0.97–0.99 | 8–20 arc-min |
| Planetary (3–4 planets) | $\le 8$ | 0.97–0.99 | 5–15 arc-min |
| Cycloidal | $\approx 6$–$119$ | 0.85–0.93 | $< 1$ arc-min (precision types) |
| Harmonic | $\approx 30$–$320$ | 0.70–0.90 | $< 1$ arc-min |
| Worm | $\le 100$ | 0.40–0.90 | 15–40 arc-min |

::: exercise Harmonic drive life {level=2 check="0.95"}
A harmonic drive has $Z_f = 198$ flexspline teeth and $Z_c = 200$ circular-spline teeth. State the ratio, and estimate the continuous life, in years, at a $100\ \mathrm{rev / min}$ input if the design allows $10^{8}$ flexure cycles of the flexspline.

::: solution
$$
i = - \frac{ Z_f }{ Z_c - Z_f } = - \frac{ 198 }{ 2 } = - 99
$$

**and the life is the number that decides the application.** The elliptical wave generator has two lobes, so every point of the flexspline goes through two full bending cycles per input revolution, $200$ cycles per minute at $100\ \mathrm{rev / min}$:

$$
\frac{ 10^{8} \ \text{cycles} }{ 2 \times 100 \ \mathrm{cycles / min} } = 5.0 \times 10^{5} \ \mathrm{min} = 8\,330 \ \mathrm{h} = \boxed{ 0.95 \ \text{years of continuous running} }
$$

**This is why harmonic drives are in robot joints, telescope and antenna drives — intermittent, high-precision duty — and not in conveyor drives and wind turbines.** Unlike a contact-fatigue gear, the flexspline's bending stress is imposed by the wave generator's shape whether or not it carries torque; load adds to it, but an unloaded drive running continuously is still using up flexure cycles. In practice manufacturers rate life mainly by the wave-generator bearing, but the arithmetic — life in cycles divided by cycles per minute — is the same.
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
| 2 | Planetary, ring held | 20 | 26 | 72 | 4 | 4.600 | 0.9843 |
| 3 | Helical, $83 / 21$ | — | — | — | — | 3.952 | 0.9850 |
| | | | | | **Total** | **99.995** | **0.9537** |

Check stage 1: $24 + 2 \times 42 = 108$ ✓; $( 24 + 108 ) / 4 = 33$ integer ✓; $66 \sin 45^{\circ} = 46.7 > 44$ ✓. Stage 2: $20 + 2 \times 26 = 72$ ✓; $( 20 + 72 ) / 4 = 23$ ✓; $46 \sin 45^{\circ} = 32.5 > 28$ ✓. **Both stages are carrier-in, sun-out, ring-held — a speed *increaser*, which is what a turbine needs.** By [[#ex-eff4]] this is the less efficient way to hold the set ($\eta = 1 - 0.02 \, \alpha / ( 1 + \alpha )$), but it is the only fixed-member arrangement that gives the large ratio $1 + \alpha$.

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

**and the design uses $b = 70\ \mathrm{mm}$, because pitting, not bending, governs** — the same conclusion [[mechanisms/gears]] reached for the $55\ \mathrm{kW}$ industrial gearbox, at more than a thousand times its input torque. Ring pitch diameter $0.016 \times 108 = 1.73\ \mathrm{m}$, which is what a $1.5\ \mathrm{MW}$ first stage actually is.

**Heat.** $1.500 \times ( 1 - 0.9537 ) = 69\ \mathrm{kW}$ of heat — far more than the casing can shed by natural convection, so the gearbox needs forced, filtered oil circulation and an oil cooler. **The lubrication system is not an accessory to a wind-turbine gearbox; it is the subsystem whose failure mode — a blocked filter, a pump seal, a cooler fouled by a maize field — is the failure mode of the turbine.**

**Why not one stage?** $i = 100$ needs $\alpha = 99$, so $Z_p = ( 99 - 1 ) Z_s / 2 = 49 \, Z_s$ and the adjacency condition demands

$$
\sin \frac{ \pi }{ n_p } > \frac{ 49 Z_s }{ Z_s + 49 Z_s } = 0.980 \quad \Longrightarrow \quad n_p < 2.29
$$

**so a single $100 : 1$ planetary stage can have only two planets**, each 49 times the size of the sun, inside a ring of $99 \times 17 = 1683$ teeth if the sun has 17. **The adjacency condition, before strength or size is even considered, is what forces the wind-turbine gearbox to have more than one stage.**
:::
:::

::: exercise Why three stages and not two {level=3 check="3"}
Could the $1.5\ \mathrm{MW}$ gearbox above be built as two planetary stages of $10 : 1$ each? Test the (pitch-circle) adjacency condition for $\alpha = 9$ with three and with four planets, and state the largest number of planets that will go in.

::: solution
With $\alpha = 9$: $Z_p = ( 9 - 1 ) Z_s / 2 = 4 Z_s$, so

$$
\frac{ Z_p }{ Z_s + Z_p } = \frac{ 4 }{ 5 } = 0.800 \quad \Rightarrow \quad \sin \frac{ \pi }{ n_p } > 0.800 \ \Rightarrow \ \frac{ \pi }{ n_p } > 0.9273\ \mathrm{rad} \ \Rightarrow \ n_p < 3.39
$$

$$
n_p = 3 : \ \sin 60^{\circ} = 0.8660 > 0.800 \ \checkmark \qquad n_p = 4 : \ \sin 45^{\circ} = 0.7071 < 0.800 \ \times
$$

**so $\boxed{ 3 }$ planets is the maximum (the tip-clearance form, $5 Z_s \sin 60^{\circ} > 4 Z_s + 2$, also passes for any $Z_s \ge 7$), and the two-stage alternative is not impossible — it is just worse.** Three planets gives $K_\gamma = 1.07$ against the four-planet design's $1.10$, so the load sharing is if anything better; what you lose is that **the $955\ \mathrm{kN \cdot m}$ now passes through three planets instead of four, so each carries $318$ rather than $239\ \mathrm{kN \cdot m}$ of the carrier torque — $33\ \%$ more load on each planet bearing, and since rolling-bearing life goes as $\text{load}^{-10/3}$, a life $( 4 / 3 )^{10/3} \approx 2.6$ times shorter at the same bearing size.** Planet bearings are a life-limiting component in wind-turbine gearboxes, so that is a serious penalty. The ring reaction also grows: at $\alpha = 9$ it is $9 / 10$ of the carrier torque, $859\ \mathrm{kN \cdot m}$ in one ring instead of $781$. **Two stages is possible but worse; the three-stage layout is what adjacency and bearing life arrive at.**
:::
:::

::: quiz Idlers and tooth counts {#quiz-idler}
A compound train's first stage is $19 / 95$ and its second is $17 / 95$. Which statement is true?

- [ ] Both stages are equally good, because both pinions are prime
- [x] The first stage is the bad one: $95 = 5 \times 19$, so $\gcd = 19$ and each wheel tooth is struck by exactly one pinion tooth for the life of the gearbox
- [ ] The second is worse, because $17$ does not divide $95$
- [ ] Neither matters, because the contact pattern always walks around both gears

::: solution
**The first stage is the bad one.** $\gcd ( 19 , 95 ) = 19$, so each pinion tooth only ever meets $95 / 19 = 5$ of the wheel's teeth — and, worse, **each wheel tooth is struck by exactly $19 / 19 = 1$ pinion tooth and by no other, forever.** $\gcd ( 17 , 95 ) = 1$, so the second stage hunts: pinion tooth 1 walks through all 95 wheel teeth before it returns home, and every tooth pair meets once every $17 \times 95 = 1615$ meshes, i.e. once in 17 revolutions of the wheel.

**The point of the question is that you cannot tell by looking, and primality is no help.** $19$ is prime and $19 / 95$ is the worst pairing available, because $95$ happens to be a multiple of it; $17$ is prime and $17 / 95$ is perfect. **The test is $\gcd ( N_1 , N_2 ) = 1$ and nothing else.** Changing the first wheel from 95 to 96 teeth moves the ratio by $1.05\ \%$ and takes the visited count from 5 to 96 — **the cheapest reliability improvement available in gear-train design, and the one that never appears in a strength calculation.**
:::
:::

::: quiz Recirculating power {#quiz-circ}
An epicyclic with $\alpha = 6$ has its ring driven at $+ 600\ \mathrm{rev / min}$ and its sun driven at $- 3500\ \mathrm{rev / min}$ by a second source geared back to the same prime mover; the carrier is the output. The torques are $T_s : T_r : T_c = \lambda : 6 \lambda : - 7 \lambda$ and $\eta_0 = 0.98$. What is the carrier speed, and roughly what is the efficiency?

- [x] $+ 14.3\ \mathrm{rev / min}$ and about $30\ \%$ — the useful output is small because it is the difference of two large numbers, while the loss is not
- [ ] $+ 14.3\ \mathrm{rev / min}$ and about $98\ \%$, because efficiency is a property of the meshes and not of the speeds
- [ ] $- 1014\ \mathrm{rev / min}$ and about $98\ \%$
- [ ] The arrangement is impossible: a planetary cannot have two inputs

::: solution
**$+ 14.3\ \mathrm{rev / min}$ and about $30\ \%$.** Willis gives $\omega_c = ( \omega_s + \alpha \omega_r ) / ( 1 + \alpha ) = ( - 3500 + 3600 ) / 7 = + 14.3$. The power balance is

$$
P_{\mathrm{ring}} = 6 \lambda \times 600 = 3600 \lambda \quad \text{in}, \qquad
P_{\mathrm{sun}} = \lambda \times ( - 3500 ) = - 3500 \lambda \quad \text{returned}, \qquad
P_c = 7 \lambda \times 14.3 = 100 \lambda \ \text{out}
$$

and the loss, evaluated in the carrier frame, is $0.02 \times | \omega_s - \omega_c | \lambda = 0.02 \times 3514 \lambda = 70.3 \lambda$. Against a net input of $3600 \lambda - 3500 \lambda = 100 \lambda$ the efficiency is $1 - 70.3 / 100 = 30\ \%$. (The third option uses the wrong sign for the ring term.)

**Option 2 is the tempting wrong answer, and it is wrong for a reason worth stating exactly: $\eta_0$ is a property of the meshes, but the *loss* is $( 1 - \eta_0 )$ times the power flowing through the meshes in the carrier frame, and that is set by the relative speeds, which the designer chooses.** Push the sun to $- 3600\ \mathrm{rev / min}$ and the carrier stops dead: the ring's $3600 \lambda$ is delivered straight back out at the sun, $72 \lambda$ is destroyed as heat, and the machine transmits nothing at all. **That is a stall, and every split-path transmission has one somewhere in its map — the design question is whether the control system is allowed to steer into it.**
:::
:::

::: exercise What a rigid ring costs {level=2 check="0.61"}
A four-planet stage is designed with a floating ring gear and achieves $K_\gamma = 1.10$. A purchasing change substitutes a rigidly located ring and the same drawing gives $K_\gamma = 1.80$. By what factor must the stage's torque rating be reduced?

::: solution
Capacity goes as $n_p / K_\gamma$, and $n_p$ has not changed, so

$$
\frac{ T_{\mathrm{rigid}} }{ T_{\mathrm{floating}} } = \frac{ K_{\gamma, \mathrm{floating}} }{ K_{\gamma, \mathrm{rigid}} } = \frac{ 1.10 }{ 1.80 } = \boxed{ 0.61 }
$$

**a $39\ \%$ cut in torque rating, bought by a drawing change that removed one coupling and one clearance.** The mechanism is worth being explicit about, because it is the reason the floating ring is not an optional refinement. With a rigid ring, the four planets must each be positioned to a small fraction of a tooth thickness by the carrier's pin holes and the ring's bore at the same time; a $0.03\ \mathrm{mm}$ composite error at a mesh stiffness of $20\ \mathrm{N / \mu m}$ per millimetre of face width puts tens of per cent of the working load onto the luckiest planet. **A floating ring largely removes that constraint: it shifts radially until the planet loads balance, and most of the tolerance stack-up disappears from the load path.** The cost is a gear-coupling or crowned-spline mounting and a seal arrangement that tolerates the float — and if the float is lost in a later build, the gearbox becomes a $0.61$ machine wearing a $1.00$ nameplate.
:::
:::

## Where this leads

- **Efficiency is a map, not a number.** The variator curve of [[#ex-variator]] has the same shape for every split-path transmission: the loss stays roughly constant while the output falls to zero at the stall. The design deliverable is the map with a forbidden region drawn on it, not a nameplate percentage.
- **The next layer up is the control system.** A planetary with two driven members is a differential, and a differential with one member driven by a machine rather than braked is a *power-split device* — which is how a power-split hybrid car lets its engine run at one speed while the wheels run at another, with no conventional gearbox. Controlling which corner of the map such a machine is in is the subject of [[control-systems/feedback-stability]] applied to a drivetrain.
- **Elasticity is what makes the arithmetic work.** Load sharing, crowning, floating rings and torsionally soft carriers are all the same trick: letting deformation do what the tolerance stack cannot. The quantitative version lives in [[materials-science/mechanical-properties]] and in [[vibrations/two-degrees-of-freedom]], where the mesh stiffness of $20\ \mathrm{N / \mu m}$ per millimetre reappears as the spring in the torsional models that decide whether a gearbox's torsional natural frequencies sit near a gear-mesh frequency.
- **Tooth form is a separate subject and a separate failure mode.** Everything here treats a gear as a ratio. [[mechanisms/gears]] treats it as a contact, and in a real wind-turbine gearbox the components that most often limit life — the planet bearings and the tooth flanks — are found by contact and bearing calculations, not by the ratio arithmetic.
- **The integer problem does not go away; it becomes a design-space search.** When the ratio is one constraint among twenty — noise, mass, efficiency, packaging, commonality with a sibling product — the answer comes from enumerating legal tooth counts on a computer, exactly as the searches in [[#ex-234]] were done.

::: history
| Year | Event |
|---|---|
| c. 100 BC | The **Antikythera mechanism**, a Greek astronomical calculator recovered from a shipwreck in 1901, uses gear trains — including a pin-and-slot coupling between two gears on offset axes carried on a rotating gear — to model the varying speed of the Moon. |
| 14th century | **Richard of Wallingford**, abbot of St Albans, describes epicyclic gearing for his astronomical clock. |
| 1720 | **Joseph Williamson** uses a differential gear in an equation clock — the first securely documented use of a differential. |
| 1781 | **James Watt** patents the **sun-and-planet gear**, devised by his employee William Murdoch, to turn the beam engine's reciprocating motion into rotation without infringing James Pickard's crank patent. |
| 1827 | **Onésiphore Pecqueur** of the Conservatoire des Arts et Métiers, Paris, includes a differential on the driven axle in his patent for a steam vehicle. |
| 1841 | **Robert Willis**, *Principles of Mechanism* (London), treats mechanisms by the relative motion of their parts and gives the relative-velocity analysis of epicyclic trains on which the Willis equation and tabular method rest; second edition 1870. |
| 1939 | General Motors puts the **Hydra-Matic** into production for Oldsmobile's 1940 models: a fully automatic four-speed transmission with a fluid coupling and three planetary gear sets, ratios $3.82 / 2.63 / 1.45 / 1.00$, obtained by holding and coupling different members of the sets. |
| 1959 | **C. Walton Musser**'s US patent 2,906,143 (granted 29 September 1959) discloses strain-wave gearing — a flexible gear with fewer teeth than the rigid ring it meshes with, deflected by a rotating wave generator; United Shoe Machinery brought it to market as the harmonic drive. |
:::

::: summary Key takeaways
- **A gear ratio is an exact ratio of two integers.** That is the whole reason gears are used, and the whole reason gear-train design is a problem in number theory before it is one in strength.
- **An idler changes only the sign and the centre distance.** Its tooth count cancels identically out of the train value; its mesh, bearings, seal, loss and natural frequency do not cancel.
- **Make adjacent tooth counts coprime.** $\gcd ( N_1 , N_2 ) = 1$ is the test; primality of either count is not. In a non-hunting pair each tooth meets only a few partners and wears a periodic pattern into them.
- **Willis: $\omega_s + \alpha \omega_r = ( 1 + \alpha ) \omega_c$**, with $\alpha = N_r / N_s$. One linear equation in three velocities; the tabular method is its superposition form and works on any epicyclic however complicated.
- **The torques are $1 : \alpha : - ( 1 + \alpha )$, and the held member carries torque without power.** In a wind-turbine gearbox the first-stage ring reaction, $781\ \mathrm{kN \cdot m}$ in the example, never reaches a shaft.
- **Efficiency depends on which member you hold**, because the loss is set by the power flowing through the meshes in the carrier frame. At $\alpha = 4$, holding the sun gives a quarter of the loss of holding the ring — but also a much smaller ratio.
- **Two driven members means recirculating power.** As the output speed approaches the stall, the useful output becomes the difference of two large numbers while the loss stays large, and the efficiency goes to zero and then negative.
- **Three conditions decide a planetary: coaxiality, assembly, adjacency.** $Z_r = Z_s + 2 Z_p$, $( Z_s + Z_r ) / n_p$ integer, and $( Z_s + Z_p ) \sin ( \pi / n_p ) > Z_p + 2$. **Adjacency alone forbids a single $100 : 1$ planetary stage** — at $\alpha = 99$ it permits only two planets.
- **Planets do not share load unless you let them.** Capacity goes as $n_p / K_\gamma$; a floating member brings $K_\gamma$ down to about $1.05$–$1.15$, and a rigid ring at $K_\gamma = 1.8$ costs $39\ \%$ of the rating of a floating one at $1.1$.
- **Start the ratio at $\sqrt{ J_L / J_m }$, then let the load's top speed and the stage count decide.** The acceleration plateau is wide, so the optimum is rarely the binding constraint.
:::

## Further reading

- **R. Willis**, *Principles of Mechanism* (London: John W. Parker, 1841; 2nd ed. Longmans, Green, 1870) — the founding text of kinematics of machinery in English, including the relative-velocity treatment of epicyclic trains.
- **J.J. Uicker, G.R. Pennock & J.E. Shigley**, *Theory of Machines and Mechanisms*, 5th ed. (Oxford University Press) — a clear treatment of the tabular method and of train value, with the gear-train chapter that most courses assign.
- **R.L. Norton**, *Design of Machinery*, 6th ed. (McGraw-Hill, 2020) — gear trains and planetary trains worked the way a designer works them, including tooth-count selection.
- **F.L. Litvin & A. Fuentes**, *Gear Geometry and Applied Theory*, 2nd ed. (Cambridge University Press, 2004) — the theory of tooth forms, profile shift and the geometry of planetary and other gear drives.
- **ISO 6336** (*Calculation of load capacity of spur and helical gears*) — the rating method in which the mesh load factor $K_\gamma$ and the other load factors appear; the gear-specific epicyclic standards build on it.
- **C.W. Musser**, "Strain wave gearing," US Patent 2,906,143 (29 September 1959) — the patent that introduced the harmonic drive, short and readable as engineering.
