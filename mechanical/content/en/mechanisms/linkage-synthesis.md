::: warning Analysis versus synthesis
Everything so far in this course has been **analysis**: given the links, find the position, the velocity, the acceleration. Synthesis runs the other way, and it is a different kind of problem. It is usually under-determined (many mechanisms do the job), frequently over-determined (too many requirements for the mechanism to satisfy exactly), and almost never has a unique answer. What follows is the standard set of tools for turning a motion specification into link lengths — together with an account of how often they leave you with a mechanism that is geometrically valid and still unusable.
:::

## What you already know

- The four-bar loop equation and the Freudenstein equation — [[mechanisms/position-analysis]]
- Transmission angle, toggle, and the $40^\circ$ rule — [[mechanisms/mechanisms-mobility]]
- Coupler curves and their sextic nature — [[mechanisms/position-analysis]]
- Chebyshev equiripple approximation from numerical methods, if you have met it

## The three synthesis problems

Mechanism synthesis is divided by what the specification asks for, and the division matters because it sets how many requirements you can satisfy.

::: definition The three problems of mechanism synthesis {#def-synthproblems}
Given a family of mechanisms, **analysis** asks what motion a given member of the family produces; **synthesis** asks which member produces a given motion. Synthesis is traditionally split three ways, and the split is not cosmetic — it is a statement about how many equations you will have.

| Problem | Specification | Equations per prescribed position |
|---|---|---|
| **Function generation** | output angle is a given function of input angle, $\theta_4 = f(\theta_2)$ | **1** |
| **Path generation, no timing** | a coupler point passes through given points, or along a given curve | **1** (two coordinates, minus the unknown crank angle) |
| **Path generation, with timing** | the same, and the mechanism must arrive at each point at a given crank angle | **2** |
| **Motion generation** (rigid-body guidance) | the coupler attains given positions *and orientations* | **2** without timing (three coordinates, minus the unknown crank angle), **3** with |

**The count matters because it fixes how many requirements can be met exactly.** A four-bar path generator has nine independent dimensions, so it can pass through at most nine untimed points, or five points with prescribed timing. A motion generator can be guided exactly through five positions without timing (Burmester's result) or three with timing. A function generator uses only five of the dimensions — the three link ratios and the two datum angles, because size, location and orientation of the frame do not change $\theta_4(\theta_2)$ — so it can match five precision points with the angle ranges fixed, three of them in closed form.
:::

**Function generation.** The mechanism's job is to make the output angle a specified function of the input angle. A pointer on a pressure gauge, a logarithmic scale on a meter, a valve lift that is a particular function of crank angle, a calculator's $y = \log x$ dial. Each precision point contributes **one** equation, because only the correspondence $\theta_2 \mapsto \theta_4$ is prescribed.

**Path generation.** A point on the coupler must pass through a set of prescribed points, or along a prescribed curve. A gripper picking items off a conveyor, a sewing-machine needle, the platform of a parallel manipulator. If the times are prescribed too, each point contributes **two** equations ($x$ and $y$); if only the geometry matters, each contributes **one**.

**Motion generation, or rigid-body guidance.** The coupler must attain a set of prescribed *positions and orientations* — not just pass a point somewhere. A robot end-effector that must present a part at a given angle, a folding car roof, a hospital bed platform. Each position contributes **three** equations (two translation, one rotation), less one for the crank angle if the timing is not prescribed.

::: example Which one is it? {#ex-classify}
A packaging machine must carry a sealed carton from an infeed at $(0, 0)$ horizontal, over a $300\ \mathrm{mm}$ obstacle, to an outfeed at $(800, 200)$ with the carton tilted $30^\circ$ so the contents settle.

The specification gives two positions, each with an orientation, so it is **motion generation**. Synthesis is done one dyad (grounded link plus its moving pivot) at a time: each dyad has four unknowns — the fixed pivot and the moving pivot, two coordinates each — and every position after the first adds one equation, that the link length stays constant. Two positions use one equation per dyad, leaving a three-parameter family of solutions for each; up to five positions can be met exactly.

Add a third prescribed position — the carton must pass a sensor at $(400, 350)$ at a given tilt — and each dyad has two equations and two free parameters. This is the classical three-position synthesis: choose the two moving pivots on the coupler, and the fixed pivots follow by construction as the centres of the circles through the three positions of each moving pivot. The two free choices per dyad are what the designer spends on transmission angle and on keeping the fixed pivots where the frame has room for them.

::: exercise Classify {#ex-synth-classify}
**Question.** A windscreen-wiper linkage is required to sweep a blade tip through $105^\circ$ of arc about a fixed pivot. Is this function generation, path generation, or motion generation?

**Answer.** Path generation — and a degenerate one. The blade tip's path is a circular arc about the wiper's output pivot, and any four-bar whose output rocker swings through the required angle produces it. The real specification is usually not the path but the *timing*: how the blade angle varies with the motor's crank angle — slowly near the ends of the sweep, where the blade reverses, and quickly across the middle — which is a function-generation requirement on $\theta_{\mathrm{blade}}(\theta_2)$.

::: solution
Specifications are often stated in terms of the visible result rather than the requirement. Taken literally, "sweep $105^\circ$" is met by any crank-rocker with a $105^\circ$ rocker swing; the customer may also mean a particular velocity profile across the sweep. Always ask what the mechanism is actually for.
:::
:::
:::

## Counting: how many points can a four-bar hit

A planar four-bar path generator, placed in the plane of the prescribed points, is described by **nine independent dimensional parameters**: the two fixed pivots (four coordinates), the crank and rocker lengths (two), and the coupler triangle — the coupler length and the position of the coupler point relative to it (three). Untimed path generation adds one unknown crank angle with every point, so each point contributes one net equation and nine points can be matched (Alt's nine-point problem). With prescribed timing the count is done on the driving dyad: each point after the first gives it two equations but only one new unknown (the coupler rotation), against four dyad unknowns, so $2(n-1) = 4 + (n-1)$ gives $n = 5$ points.

Motion generation is counted dyad by dyad: four unknowns per dyad and one equation per position after the first give five positions. Function generation uses only the five parameters that change $\theta_4(\theta_2)$ — three link ratios and two datum angles — so five precision points is the limit when the angle ranges are fixed, and seven if the two range scale factors are also left free.

| Task | Equations per point | Maximum exact points | Practical maximum |
|---|---|---|---|
| Function generation | 1 | 5 (7 with free ranges) | **3** closed-form, 5 numerical |
| Path generation, no timing | 1 | 9 | 5 |
| Path generation, with timing | 2 | 5 | 4 |
| Motion generation, no timing | 2 | 5 | 3 closed-form, 4 with Burmester curves |

The gap between the "maximum exact" and "practical" columns is the subject of most of this lesson. The theoretical maxima come from counting; the practical limits come from the fact that beyond three or four points the equations are nonlinear and badly conditioned, have many solutions, and often produce mechanisms whose transmission angle is poor or that change branch mid-cycle.

### Why three and not five for function generation {#der-three}

The Freudenstein equation is

$$K_1 \cos \theta_4 - K_2 \cos \theta_2 + K_3 = \cos(\theta_2 - \theta_4)$$

and it is **linear in $K_1, K_2, K_3$**. Each precision point $(\theta_{2j}, \theta_{4j})$ therefore contributes one *linear* equation in three unknowns, and three points give a $3 \times 3$ system that any solver handles exactly. That is why three is the number in common use.

Five points are possible if you also let the two datum angles float, giving five nonlinear equations in five unknowns, solved by Newton–Raphson with all the care that implies (see the divergence example in [[mechanisms/position-analysis]]). Seven points need the input and output angle ranges released as well; solutions exist but are often unusable, and the residual is zero only at the precision points anyway.

::: exercise Counting {#ex-synth-count}
**Question.** A four-bar coupler point must pass through a set of points on a conveyor path. How many points can it be made to pass through exactly if the crank angles at the points are free, and how many if each point must be reached at a prescribed crank angle?

**Answer.** Nine untimed points; five timed points.

::: solution
The path generator has nine dimensions. Without timing, each point gives two coordinate equations and introduces one unknown crank angle, a net of one equation per point, so nine points use up all nine dimensions. This is Alt's nine-point problem, posed in 1923; its complete numerical solution (Wampler, Morgan and Sommese, 1992) found that nine general points lie on up to $1442$ coupler curves, each traced by three cognate linkages. With timing, the driving dyad must satisfy two equations per point after the first with only one new unknown each (the coupler rotation) against its four fixed unknowns, so $2(n-1) = 4 + (n-1)$ and $n = 5$. In practice the untimed nine-point solutions are almost all unusable — branch defects, poor transmission angles, links of absurd length — which is why designers work with four or five points and an optimiser.
:::
:::

## Precision points and Chebyshev spacing

::: definition Precision points and their spacing {#def-precision}
A **precision point** is a value of the input at which the synthesised mechanism is made to reproduce the desired function *exactly*, the residual being forced to zero by construction. Between them the mechanism errs, and a large part of the design decision is where to put them.

For $n$ precision points spanning $[ x_0 , x_f ]$ the **Chebyshev spacing** places them at the roots of the Chebyshev polynomial $T_n$ mapped onto the interval,

$$
x_j = \frac{ x_0 + x_f }{ 2 } - \frac{ x_f - x_0 }{ 2 } \cos \frac{ ( 2 j - 1 ) \pi }{ 2 n } \ , \qquad j = 1 , \dots , n
$$

**They minimise the largest value over the interval of the node polynomial $\prod_j (x - x_j)$, which multiplies every interpolation-error estimate.** They stay away from the ends of the interval: for $n = 3$ on $[ 1 , 10 ]$ they are $1.603 , 5.500 , 9.397$, and for $n = 4$ they are $1.343 , 3.778 , 7.222 , 9.657$, whereas equally spaced points that include the ends sit at the boundaries $1$ and $10$. With equal spacing the node polynomial, and with it the error, is largest near the ends of the range (Runge's phenomenon in miniature); Chebyshev spacing makes its peaks equal across the interval.
:::

When you cannot match the function exactly, you choose *where* to match it exactly. The obvious choice — equally spaced points — lets the error grow towards the ends of the range, and the cure is the one used against Runge's phenomenon in polynomial interpolation.

**Chebyshev spacing.** For $n$ precision points over $[x_0, x_f]$,

$$x_j = \frac{x_0 + x_f}{2} - \frac{x_f - x_0}{2} \cos \frac{(2j - 1)\pi}{2n}, \qquad j = 1, \ldots, n$$

These are the **roots of the Chebyshev polynomial** $T_n$ mapped onto the interval — denser towards the ends than in the middle. For three points the factors are $\cos 30^\circ$, $\cos 90^\circ$, $\cos 150^\circ$, so the points sit at the midpoint and at $\pm 0.866$ of the half-range.

The justification is that Chebyshev interpolation is *nearly* minimax: the error it produces is close to the smallest achievable maximum error, and unlike equally spaced interpolation it does not concentrate the error near the ends. For a linkage the theory is only a guide, because the linkage's error is not a polynomial; the worked examples below show it helps but does not remove the end error.

::: example Three points, two ways {#ex-cheb-vs-equi}
Over $x \in [1, 10]$ the three Chebyshev points are

$$x_1 = 5.5 - 4.5 \cos 30^\circ = 1.6029, \qquad x_2 = 5.5, \qquad x_3 = 9.3971$$

against the equally spaced (interior) set $3.25, 5.5, 7.75$. The Chebyshev set leaves only $0.60$ units of the range outside each outer point instead of $2.25$, and the ends are where the interpolation error of a smooth function grows.

In the worked example below the two choices give maximum errors of $0.53\%$ and $0.71\%$ — a factor of $1.35$ — and in the square-root design exercise a factor of $2.1$. Chebyshev spacing is cheap insurance taken before spending effort on the stronger levers, which are the input and output angle ranges.

::: widget plot
f: 4*pow(x,3)-3*x
x: -1, 1
y: -1.15, 1.15
caption: The Chebyshev polynomial $T_3(x) = 4x^3 - 3x$ on $[-1, 1]$. **Its three zeros, at $x = -0.866$, $0$ and $+0.866$, are the three Chebyshev precision points**, and they lie closer to the ends of the interval than the equally spaced $-0.5, 0, +0.5$. **The curve reaches $\pm 1$ four times on the interval — at $x = -1, -0.5, +0.5, +1$ — with alternating sign.** That equal-height alternation of the extrema (equiripple) is what makes interpolation at the zeros nearly minimax, and it is why the same spacing is used for the precision points of a function generator.
:::
:::

::: exercise Four-point Chebyshev spacing {level=1 check="3.78"}
Find the four Chebyshev precision points on $x \in [ 1 , 10 ]$ and compare them with four equally spaced points including the endpoints. (Enter the second Chebyshev point $x_2$, to two decimal places.)

::: solution
The angles $\alpha_j = ( 2 j - 1 ) \pi / 8$ are $22.5^\circ$, $67.5^\circ$, $112.5^\circ$ and $157.5^\circ$, so

$$
x_j = 5.5 - 4.5 \cos \alpha_j = 1.343 \ , \ 3.778 \ , \ 7.222 \ , \ 9.657
$$

against the equally spaced $1.000 , 4.000 , 7.000 , 10.000$. **The Chebyshev set pulls the outer points inward by $0.34$ each and pushes the inner pair outward (away from the centre) by $0.22$ each.**

**Two practical notes.** First, the Chebyshev points do not include the endpoints; if the specification demands exactness at $x = 1$ and $x = 10$ you cannot also have Chebyshev spacing, and the usual compromise is to take the endpoints as two of the points and place the others where the error between them is balanced. Second, the improvement is real but modest — a factor of $1.35$ for the three-point logarithm generator of [[#ex-cheb-vs-equi]] and a factor of $2.1$ for the square-root generator of [[#ex-sqrt-design]]. **Choosing the input and output angle ranges matters far more: in the logarithm generator below it moves the maximum error by a factor of seven.**
:::
:::

## Worked example: a logarithmic function generator

**Specification.** Generate $y = \log_{10} x$ for $1 \le x \le 10$, with the input crank swinging from $50^\circ$ to $150^\circ$ and the output rocker from $135^\circ$ to $175^\circ$. The mapping is therefore

$$\theta_2 = 50 + 100 \cdot \frac{x - 1}{9}, \qquad \theta_4 = 135 + 40 \log_{10} x$$

**Step 1 — the precision points.** Three Chebyshev points on $[1, 10]$ are $x = 1.6029, 5.5, 9.3971$, giving

| $j$ | $x_j$ | $y_j = \log_{10} x_j$ | $\theta_{2j}$ | $\theta_{4j}$ |
|---|---|---|---|---|
| 1 | 1.6029 | 0.20490 | $56.699^\circ$ | $143.196^\circ$ |
| 2 | 5.5000 | 0.74036 | $100.000^\circ$ | $164.615^\circ$ |
| 3 | 9.3971 | 0.97299 | $143.301^\circ$ | $173.920^\circ$ |

**Step 2 — the linear system.** Substituting each pair into $K_1 \cos \theta_4 - K_2 \cos \theta_2 + K_3 = \cos(\theta_2 - \theta_4)$ gives three linear equations, whose solution is

$$K_1 = 1.0043, \qquad K_2 = 0.7358, \qquad K_3 = 1.2692$$

**Step 3 — the link lengths.** Set $a = 1$. Then $d = K_1 a = 1.0043$, $c = d / K_2 = 1.3648$, and

$$b = \sqrt{a^2 + c^2 + d^2 - 2ac K_3} = 0.6378$$

**Step 4 — check it.** The four lengths are $0.6378, 1.0043, 1.0000, 1.3648$; sorted, $s + l = 2.0026 < p + q = 2.0043$, so the linkage is a **Grashof** mechanism — but the shortest link is the *coupler*, which makes it a **double-rocker**: neither grounded link can turn fully. For a function generator driven through a $100^\circ$ arc that is harmless, and indeed desirable, because it means the mechanism cannot be wound past its working range.

::: example The error curve {#ex-log-error}
Evaluating the linkage's own $\theta_2 \mapsto \theta_4$ against the ideal over the whole range:

| $x$ | 1.00 | 1.60 | 3.70 | 5.50 | 7.75 | 9.40 | 10.00 |
|---|---|---|---|---|---|---|---|
| error, % of span | $+0.53$ | $0.00$ | $+0.11$ | $0.00$ | $-0.14$ | $0.00$ | $+0.12$ |

The three precision points read exactly zero, as they must. The maximum error is $0.53\%$ of the output span and it occurs at the *end of the range*, not between the points — the endpoint error is what Chebyshev spacing does not control, because Chebyshev minimises the interior error and leaves the ends free.

Repeating the whole synthesis with equally spaced points $x = 3.25, 5.5, 7.75$ gives $K_1 = 0.9971$, $K_2 = 0.7341$, $K_3 = 1.2626$ — link lengths within $1\%$ of the Chebyshev design — and a maximum error of $0.71\%$. The two mechanisms are almost the same mechanism; the Chebyshev choice buys a factor of $1.35$.

::: widget plot
f: 100*((2*atan(((2*sin(x*pi/180)+sqrt(4*sin(x*pi/180)*sin(x*pi/180)-4*(0.264937+0.264157*cos(x*pi/180))*(2.273523-1.735843*cos(x*pi/180))))/(2*(0.264937+0.264157*cos(x*pi/180)))))*180/pi-135)/40-log10(1+9*(x-50)/100))
x: 50, 150
y: -0.25, 0.6
caption: The function error of the synthesised logarithm generator, in per cent of output span, against crank angle. **The curve touches zero exactly three times, at $56.7^\circ$, $100^\circ$ and $143.3^\circ$, and its worst point is the $+0.53\%$ spike at the left-hand end.** **Between the second and third precision points it dips to $-0.14\%$.** The left-hand spike dominates because $\log_{10} x$ is most sharply curved at $x = 1$, and the first precision point, $0.60$ units in from that end, leaves that stretch uncontrolled.
:::
:::

## The accuracy–force trade-off

The design above has a problem that the error curve does not show.

::: widget plot
f: min(acos(clamp(0.14987+1.15371*cos(x*pi/180),-1,1))*180/pi,180-acos(clamp(0.14987+1.15371*cos(x*pi/180),-1,1))*180/pi)
x: 50, 150
y: 0, 92
caption: The transmission angle of the same logarithm generator. **Its minimum is $26.9^\circ$, occurring at $\theta_2 = 50^\circ$ — the same crank angle at which the function error is worst.** **It rises to $81.4^\circ$ at $\theta_2 = 90^\circ$, passes $90^\circ$ near $\theta_2 = 97^\circ$, and falls to $31.9^\circ$ at the far end.** The worst force transmission and the worst accuracy occur at the same end of the range.
:::

A $26.9^\circ$ transmission angle fails the $40^\circ$ rule of [[mechanisms/mechanisms-mobility]]. For a function generator that drives a pointer or a light stylus this is acceptable, because the torques are tiny and the loss of stiffness is a positioning error of a few arc-minutes rather than a seized joint. For anything transmitting force it is not, and the only lever you have is to re-synthesise with different angle ranges.

| $\mu_{\min}$ enforced | $\theta_2$ range | $\theta_4$ range | $b$ | $c$ | $d$ | max error |
|---|---|---|---|---|---|---|
| $\ge 25^\circ$ | $50$–$150^\circ$ | $135$–$175^\circ$ | 0.638 | 1.365 | 1.004 | **0.53 %** |
| $\ge 30^\circ$ | $45$–$150^\circ$ | $135$–$175^\circ$ | 0.690 | 1.187 | 0.881 | 2.27 % |
| $\ge 35^\circ$ | $35$–$140^\circ$ | $130$–$175^\circ$ | 0.757 | 1.001 | 0.743 | 2.84 % |
| $\ge 40^\circ$ | $30$–$140^\circ$ | $130$–$175^\circ$ | 0.805 | 0.812 | 0.608 | 3.79 % |

(All four designs use three Chebyshev precision points; $\mu_{\min}$ is the minimum transmission angle actually achieved — $26.9^\circ$, $30.1^\circ$, $35.1^\circ$ and $40.5^\circ$.) **Holding the transmission angle above the textbook $40^\circ$ costs a factor of seven in accuracy** ($3.79\ \%$ against $0.53\ \%$). The question to ask is whether the mechanism is an instrument or a force-transmitting lever. A function generator is usually an instrument, and $27^\circ$ is acceptable.

::: exercise Transmission angle of the synthesised generator {level=2 check="26.9"}
The three-point logarithm generator has $a = 1.0000$, $b = 0.6378$, $c = 1.3648$, $d = 1.0043$. Compute the transmission angle at $\theta_2 = 50^\circ$ and confirm the $\mu_{\min}$ quoted in the table. (Enter the angle in degrees.)

::: solution
The transmission angle is the angle between the coupler $b$ and the rocker $c$, and it is found from the diagonal $s = A O_4$, which the cosine rule on the input triangle gives:

$$
s^{ 2 } = a^{ 2 } + d^{ 2 } - 2 a d \cos \theta_2 = 1 + 1.00862 - 2 ( 1.0043 ) ( 0.64279 ) = 0.71752 \ \Rightarrow \ s = 0.84706
$$

and the cosine rule on the triangle $A B O_4$ then gives

$$
\cos \mu = \frac{ b^{ 2 } + c^{ 2 } - s^{ 2 } }{ 2 b c } = \frac{ 0.40679 + 1.86268 - 0.71752 }{ 2 ( 0.6378 ) ( 1.3648 ) } = \frac{ 1.55195 }{ 1.74094 } = 0.89145
$$

$$
\mu = \boxed{ 26.9^{ \circ } }
$$

**which is the minimum over the whole $50^\circ$–$150^\circ$ range and occurs at the first crank angle of the range.** The diagonal $s$ is smallest at $\theta_2 = 50^\circ$, where the input crank is most nearly folded onto the ground link, and in this linkage (with $\mu < 90^\circ$ there) the smallest diagonal gives the smallest transmission angle; at the other extreme, a large diagonal drives $\mu$ towards $180^\circ$, which is just as bad. The same crank angle is also where the function error is largest, so in this design the accuracy and the force transmission are both worst at the start of the range.
:::
:::

::: example When the trade-off is not available {#ex-force-fg}
The logarithm generator above is asked to drive a hydraulic valve spool directly from its rocker pin, and the spool needs $40\ \mathrm{N}$ of force along the pin's direction of travel over $2\ \mathrm{mm}$ of stroke.

Only the component $F_{\mathrm{coupler}} \sin \mu$ of the coupler force acts along the rocker pin's path, so at $\mu = 27^\circ$ the coupler must carry $1 / \sin 27^\circ = 2.2$ times the force it would need at $90^\circ$ — $88\ \mathrm{N}$ in the coupler for $40\ \mathrm{N}$ at the spool. The joint friction then grows in proportion to the pin loads, and it shows up as a *dead band*: the output does not move until the input has overcome the friction in every joint, and that dead band is $2.2$ times larger than at a right-angle transmission.

Re-synthesising for a better transmission angle would cost a factor of several in accuracy (see the table above). The usual fix is to keep the linkage as a low-force instrument and let it position a small pilot valve, which needs a fraction of a newton; the pilot stage then supplies the $40\ \mathrm{N}$ hydraulically.
:::

## Going to five points

The Freudenstein equation has three constants, but the function generator has five parameters. The two that the three-point method fixes in advance are the datum angles that say where $\theta = 0$ is measured from on each grounded link. Put them back as $\lambda$ on the input and $\mu$ on the output (in this section $\mu$ is a datum angle, not the transmission angle) and the equation becomes

$$K_1 \cos(\theta_4 + \mu) - K_2 \cos(\theta_2 + \lambda) + K_3 = \cos\big[(\theta_2 + \lambda) - (\theta_4 + \mu)\big]$$

which is **five unknowns and no longer linear**. Five Chebyshev precision points therefore determine it — and Newton–Raphson must be started somewhere sensible, which means at the three-point solution.

**Five-point synthesis of the same logarithm.** The Chebyshev points on $[1, 10]$ for $n = 5$ are $x = 1.2202, 2.8550, 5.5000, 8.1450, 9.7798$, and the converged solution is

$$K_1 = 1.0351, \quad K_2 = 0.7231, \quad K_3 = 1.3156, \quad \lambda = +4.246^\circ, \quad \mu = -0.107^\circ$$

giving $a = 1$, $b = 0.5950$, $c = 1.4316$, $d = 1.0351$. The residual at all five points is below $10^{-15}$, and the maximum error over the whole range is

$$0.058\% \quad \text{against} \quad 0.527\% \quad \text{for the three-point design}$$

a factor of **nine**, from two extra parameters. The transmission angle, which the objective function never mentioned, went from $26.9^\circ$ to $25.2^\circ$.

::: widget plot
f: 100*((2*atan(((2*sin(x*pi/180)+sqrt(4*sin(x*pi/180)*sin(x*pi/180)-4*(0.264937+0.264157*cos(x*pi/180))*(2.273523-1.735843*cos(x*pi/180))))/(2*(0.264937+0.264157*cos(x*pi/180)))))*180/pi-135)/40-log10(1+9*(x-50)/100)); 100*((2*atan(((2*sin((x+4.2462)*pi/180)+sqrt(4*sin((x+4.2462)*pi/180)*sin((x+4.2462)*pi/180)-4*(0.280494+0.276926*cos((x+4.2462)*pi/180))*(2.350744-1.723074*cos((x+4.2462)*pi/180))))/(2*(0.280494+0.276926*cos((x+4.2462)*pi/180)))))*180/pi+0.1070-135)/40-log10(1+9*(x-50)/100))
x: 50, 150
y: -0.6, 0.6
caption: The function error of the three-point synthesis (upper curve, peaking at $+0.53\%$) and the five-point synthesis (lower curve, largest error $-0.058\%$ near $\theta_2 = 60^\circ$), in per cent of output span against crank angle. **On this scale the five-point error is almost a flat line through zero**; it crosses zero at the five precision points and its extremes lie between $-0.058\%$ and $+0.040\%$. **The three-point curve's $+0.53\%$ spike at the left-hand end is what the two extra parameters remove.** The five-point curve's largest excursion is still at the left, where $\log_{10} x$ is most sharply curved.
:::

::: warning A zero residual is not a mechanism
The five-point solution above has residuals of $5 \times 10^{-16}$. It is also, as it happens, a perfectly usable mechanism. It need not have been: **every nonlinear synthesis returns a residual of zero when it converges, including the ones that converge on a linkage whose coupler cannot reach the next precision point.** The residual tests the algebra. Only the sweep over the whole range tests the machine.
:::

::: exercise Seven points {#ex-seven}
**Question.** Could a seven-point function synthesis be done on a plain four-bar by releasing, in addition to the two datum angles, the two angle-range scale factors?

**Answer.** In principle yes; in practice no.

::: solution
Releasing the two range factors as well as $\lambda$ and $\mu$ gives seven equations in seven unknowns, and solutions can exist. Three things go wrong. The input and output ranges become results of the synthesis rather than design choices, and the ranges that come out are rarely ones the instrument can use. The Jacobian is often nearly singular, so Newton steps are large and the answer depends on the starting point. And many of the mechanisms that come out show a branch change or a reversal inside the working range, because nothing in the equations checks for it.

The practical ceiling for four-bar function generation is five points. Beyond that, change the mechanism — a geared five-bar, a six-bar, or a cam.
:::
:::

## What a coupler curve actually is

Before using path generation it is worth knowing what kind of object you are trying to hit.

**The coupler curve of a planar four-bar is an algebraic curve of degree six — a sextic — with triple points at the two circular points at infinity.** Its properties were worked out in the 1870s by Samuel Roberts and Arthur Cayley; a curve that passes through the circular points is called *circular*, and a coupler curve passes through each of them three times (it is *tricircular*).

Two consequences that a designer can actually use.

**Bézout bounds what a coupler curve can do.** A straight line meets a sextic in at most six points unless the line is a *component* of the curve. A coupler point that passed through more than six points of a straight segment would therefore need a coupler curve that splits into a line and a quintic, which a four-bar of revolute joints does not produce. **That is the argument behind "no four-bar traces an exact straight line."** A circle meets the sextic in twelve points counted with multiplicity, but six of them are absorbed at the two triple circular points, so a coupler curve can pass through at most six finite points of a circle — except in degenerate linkages such as the parallelogram, whose coupler points trace exact circles.

**Nine points determine it.** A general plane sextic has $28$ coefficients ($27$ up to a common factor), but coupler curves form a much smaller family with only nine parameters — the nine dimensions of the path generator. Nine general points therefore pick out a finite number of coupler curves: $1442$ of them, each traced by three cognate linkages, according to the numerical solution of Alt's problem by Wampler, Morgan and Sommese (1992).

::: example Why coupler curves look like nothing else {#ex-coupler-shape}
Coupler curves of a crank-rocker take a few recurring forms: ovals, kidney and peanut shapes, curves with a cusp, and figure-of-eight curves with a double point (a *crunode*) where the coupler point passes the same place twice in one cycle. A Grashof linkage has two assembly circuits, and the two circuits trace two different coupler curves; a non-Grashof linkage has one circuit with two branches, separated by toggle positions.

A path-generation design that places precision points on both sides of a crunode, or on both circuits, gives a linkage that matches every point and still visits them in the wrong order or cannot reach some of them without being taken apart.

**The lesson is to plot the whole coupler curve before choosing precision points on it**, which is the reverse of what the synthesis procedure does.
:::

## Defects: valid geometry, broken machine

A synthesised linkage can satisfy every equation and still be unusable. Three failure modes have names.

::: definition Branch, order and monotonicity defects {#def-defects}
A synthesised mechanism may reproduce every precision point and still be a machine you cannot build. The three failure modes are independent of each other and of the residuals.

**Circuit and branch defects.** A *circuit* is a set of configurations the linkage can move through without being taken apart; a Grashof four-bar has two (the open and crossed assemblies, see [[mechanisms/position-analysis]]). A *branch* is a part of a circuit between two stationary (toggle) positions of the driving link, through which the drive cannot carry the mechanism. If two precision points are reproduced on different circuits, the mechanism would have to be disassembled and reassembled to get from one to the other; if they lie on different branches, it would have to pass a toggle that the input cannot drive it through. **Detection:** the discriminant $B'^{ 2 } - 4 A' C'$ of the position quadratic must stay positive over the whole range, and the same sign of $\pm \sqrt{ \ }$ must reproduce every precision point.

**Order defect.** The mechanism visits all the prescribed positions, but not in the prescribed sequence, or it visits one of them twice per revolution. **Detection:** plot the output against the input over the full range and read the sequence off the curve.

**Monotonicity defect.** The output reverses inside the working range. For a function generator this is fatal — the dial reads the same angle at two different inputs — and it is completely invisible in a table of precision-point residuals.

**None of the three shows up in the precision-point residuals, and an optimiser that only sums squared errors at sample points can miss a small reversal, because it adds little to the sum.** A synthesis is therefore not finished until the whole output curve has been plotted over the whole input range; the plot, not the residual, is the deliverable.
:::

All three checks take a few lines of code once the position analysis of [[mechanisms/position-analysis]] is available: evaluate the discriminant and the output angle on a fine grid of input angles, and look at the sign of the square root, the order of the precision points and the sign of $d\theta_4 / d\theta_2$.

::: example A reversal between precision points {#ex-order-defect}
Suppose a five-point synthesis for a $y = 1/x$ generator produces a linkage that hits all five points, and plotting the full range shows the output advancing, reversing through $3^\circ$ between two precision points, and then continuing.

Such a mechanism is geometrically valid, may have a good transmission angle throughout, and still cannot be used: the dial would show the same reading for two different inputs, and a machine driven by it would have to back up and re-approach. The synthesis procedure does not report this, because it only guarantees the precision points.

**The rule is that a synthesis is not finished until you have plotted the whole output curve, not just checked the residuals.**
:::

## Straight-line mechanisms

Path generation's oldest problem: make a point move in a straight line without a guide.

Both sets of figures below are computed the same way: fit a straight line to the coupler midpoint's path over a stated stretch of travel by total least squares, and report the largest perpendicular departure from it as a fraction of the length travelled. Any other convention flatters the numbers.

**Watt's parallel motion, 1784.** Two equal rockers of length $r$, pivoted at fixed points $2r$ apart along the rockers' mid-position direction and $r$ apart across it, joined by a coupler of length $r$; at mid-stroke the rockers are parallel and point in opposite directions, and the coupler is perpendicular to them. The coupler's midpoint traces a figure-of-eight whose middle portion is nearly straight. Taking the stretch symmetric about mid-stroke, the departure from the best straight line is

$$\frac{1}{2800}\ \text{over } 0.52\,r \text{ of travel } (\pm 15^\circ \text{ of rocker}), \qquad \frac{1}{440}\ \text{over } 0.80\,r\ (\pm 24^\circ), \qquad \frac{1}{160}\ \text{over } 1.0\,r\ (\pm 30^\circ)$$

**Chebyshev's straight-line linkage.** Fixed pivots a distance $d$ apart, two *crossed* rockers of length $1.25\,d$, and a coupler of length $0.5\,d$; again the coupler midpoint is the tracing point. The best departures for given lengths of travel are

$$\frac{1}{1570}\ \text{over } 0.25\,d, \qquad \frac{1}{530}\ \text{over } 0.50\,d, \qquad \frac{1}{790}\ \text{over the whole } 1.0\,d$$

Read those numbers as a designer does. **Straightness is not the figure of merit; straightness at a stated length of travel is.** Watt's linkage is extremely straight close to mid-stroke — its error is an inflection, growing roughly as the fifth power of the travel — and deteriorates quickly beyond it. Chebyshev's error oscillates about the best line instead of growing steadily, so the departure never exceeds about $0.0013\,d$ along a stroke as long as the distance between the fixed pivots. (Chebyshev's better-known *lambda* linkage is a cognate of this one and traces the same curve.)

::: widget plot
f: 100*((cos(x*pi/180)+(cos(x*pi/180)+2)/2+sqrt(1-sqrt((cos(x*pi/180)-2)*(cos(x*pi/180)-2)+(sin(x*pi/180)-1)*(sin(x*pi/180)-1))*sqrt((cos(x*pi/180)-2)*(cos(x*pi/180)-2)+(sin(x*pi/180)-1)*(sin(x*pi/180)-1))/4)*(sin(x*pi/180)-1)/sqrt((cos(x*pi/180)-2)*(cos(x*pi/180)-2)+(sin(x*pi/180)-1)*(sin(x*pi/180)-1)))/2-1)
x: -25, 25
y: -0.5, 0.5
caption: The sideways departure, in millimetres, of the midpoint of Watt's linkage with $r = 100\ \mathrm{mm}$ from the straight line through its mid-stroke position, against the rocker angle measured from mid-stroke. **The curve is flat through the middle — $0.004\ \mathrm{mm}$ at $\pm 10^\circ$, $0.03\ \mathrm{mm}$ at $\pm 15^\circ$ — and then turns away sharply, reaching $0.13$–$0.14\ \mathrm{mm}$ at $\pm 20^\circ$ and $0.37$–$0.47\ \mathrm{mm}$ at $\pm 25^\circ$.** Over that $\pm 25^\circ$ the point travels about $85\ \mathrm{mm}$ along the line, so the useful straight portion is a fraction of the linkage's size.
:::

::: exercise Straight-line design {#ex-straight}
**Question.** A testing rig must pull a specimen in a straight line for $150\ \mathrm{mm}$ while a load cell measures the force, and any lateral motion above $0.1\ \mathrm{mm}$ ruins the alignment. A designer proposes Chebyshev's straight-line linkage with $d = 400\ \mathrm{mm}$. Does it work?

**Answer.** No. The longest stroke it can give within $0.1\ \mathrm{mm}$ is about $117\ \mathrm{mm}$.

::: solution
Scale Chebyshev's proportions to $d = 400\ \mathrm{mm}$: rockers $500\ \mathrm{mm}$, coupler $200\ \mathrm{mm}$. Sweeping every stretch of the midpoint's path and fitting the best straight line to each, the longest stretch with a lateral departure of $0.1\ \mathrm{mm}$ or less is about $117\ \mathrm{mm}$, obtained over roughly $13^\circ$ of rocker rotation.

The proposed $150\ \mathrm{mm}$ needs a departure of $0.19\ \mathrm{mm}$ — about twice the allowance.

Note what the same linkage does for a shorter specimen: at $100\ \mathrm{mm}$ of travel the departure is $0.064\ \mathrm{mm}$, comfortably inside the limit. **The linkage is not hopeless; the requirement is $1.3\times$ beyond it.** That distinction decides whether the answer is a larger linkage (the departure scales with $d$, and the same sweep shows that $d \approx 590\ \mathrm{mm}$ is needed for $150\ \mathrm{mm}$ within $0.1\ \mathrm{mm}$) or a different kind of guide.

A linear bearing or a flexure guide does the job directly. Four-bar straight-line mechanisms win when the guide itself is the problem: high temperature, vacuum, sterile service, or a stroke too long for a bearing. Elsewhere a bearing is usually the better choice.
:::
:::

## Motion generation and Burmester's curves

For motion generation the requirement is that the coupler plane itself pass through prescribed positions. The classical theory is due to Burmester.

**Circle points.** Given four prescribed positions of the coupler plane, ask which points of the moving plane occupy four positions that lie on one circle. Every such point is a **circle point**, and the centre of its circle is a **centre point**. Burmester's result: *for four finitely separated positions the centre points lie on a circular cubic, the centre-point curve, which passes through the six poles $P_{12}, P_{13}, P_{14}, P_{23}, P_{24}, P_{34}$; the corresponding circle points lie on a second circular cubic, the circle-point curve.* For five positions the two families of curves intersect in at most four points (the Burmester points), so a five-position problem has zero, two or four dyads and hence at most six four-bars.

You do not need to derive this to use it. What you need is the practical consequence:

1. The real part of a cubic may consist of one piece or two. **Dyads taken from different pieces, or from widely separated parts of one piece, often give linkages with circuit or branch defects**, so each candidate must still be checked by simulation.
2. Any circle point $K$ and its centre point $k$ form a **dyad** — a grounded revolute at $k$ driving a link pinned at $K$. Two dyads make a four-bar.
3. For four positions there is a one-parameter family of dyads, so you can choose the pair that gives the best transmission angle, link lengths and pivot locations. The centre-point curve is a catalogue of mechanisms that all do the job, to be searched for the best-behaved one.

::: example Why the curves matter {#ex-burmester-practical}
A packaging arm must present a tray through four positions: horizontal at the pick, tilted $25^\circ$ over a lip, horizontal again at the place, and tilted $-15^\circ$ at the release.

Plotting the Burmester centre-point curve for these four positions gives every admissible fixed pivot. Along parts of the curve a small move of the centre point produces a large change of the corresponding circle point and link length; a dyad taken from such a region is sensitive to manufacturing tolerance, because the four positions are then met only by a delicate balance of dimensions.

The practical move is to compute, for candidate dyads along the curve, how much the four positions move for a given error in pivot location, and to choose from a region where neighbouring solutions behave alike — while also keeping the fixed pivots on the machine frame. That judgement is not in the theorem.
:::

## Cognates: three mechanisms, one curve

**The Roberts–Chebyshev theorem.** *Every coupler curve of a four-bar is generated by three different four-bar linkages*, the **cognates** (Roberts, 1875; found independently by Chebyshev in 1878). They are constructed with the **Roberts diagram**: parallelograms built on the links of the original linkage carry two more coupler triangles similar to $ABP$, all meeting at the coupler point, and the three fixed pivots of the three cognates form a triangle similar to the coupler triangle.

The practical value is considerable. The three cognates trace *identical* paths with *different* transmission angles, different input torques, and different crank ranges. If the original is a Grashof crank-rocker, one cognate is also a crank-rocker (its crank turns at the same angular velocity as the original crank) and the third is a double-rocker. When a path-generation design gives a bad transmission angle, the first thing to try is not a re-synthesis — it is the other two cognates.

::: example Using a cognate {#ex-cognate}
Suppose a sewing-machine feed mechanism is synthesised for a six-point path and gives $\mu_{\min} = 22^\circ$. The designer draws the Roberts diagram and finds the crank-rocker cognate; if that cognate has, say, $\mu_{\min} = 41^\circ$, the same coupler curve is now available with acceptable force transmission.

Nothing about the path has changed. The cognate construction is still worth the few minutes it takes in the age of numerical optimisation because it is exact and costs nothing in accuracy — though the cognate also moves the fixed pivots, which must still fit on the machine.
:::

## Optimum design when exactness is impossible

Beyond three or four points you minimise. The standard formulation is

$$\min_{\mathbf{p}} \; W = \sum_{j=1}^{n} c_j \left[ \theta_{4j}^{\mathrm{actual}}(\mathbf{p}) - \theta_{4j}^{\mathrm{ideal}} \right]^2$$

over the free parameters $\mathbf{p}$ (five for a function generator with fixed ranges, nine for a path generator), with weights $c_j$ that let you demand accuracy where the mechanism actually works and tolerate it elsewhere. Three practical notes:

- **Weight by use, not by index.** A linkage that dwells at three positions of a six-position indexing cycle should have those three weighted roughly three times the others.
- **Add the transmission angle as a penalty, not a constraint.** Solvers handle $\lambda \max(0, 40 - \mu)^2$ far better than a hard constraint, and the penalty coefficient can be annealed up.
- **Check the residual at the *endpoints* of the range, not just the sum of squares.** A design can have a beautiful RMS error and a catastrophic endpoint, exactly as the logarithm generator above does.

::: exercise Weighted against unweighted {level=2 check="0.58"}
A linkage is used $80\ \%$ of the time with $x$ between $3$ and $6$, and $10\ \%$ each at the bottom and top of its range. Two candidate designs have the following root-mean-square errors in those three bands:

| Design | $x \in [ 1 , 3 ]$ | $x \in [ 3 , 6 ]$ | $x \in [ 6 , 10 ]$ |
|---|---|---|---|
| A | $1.20\ \%$ | $0.30\ \%$ | $1.10\ \%$ |
| B | $0.40\ \%$ | $0.90\ \%$ | $0.50\ \%$ |

Which design wins on unweighted RMS, and which on a duty-weighted RMS with weights $0.1 , 0.8 , 0.1$? (Enter the winning design's duty-weighted RMS error, in per cent.)

::: solution
**Unweighted**, treating the bands as equally representative:

$$
A : \sqrt{ \frac{ 1.44 + 0.09 + 1.21 }{ 3 } } = 0.956\ \% \ , \qquad B : \sqrt{ \frac{ 0.16 + 0.81 + 0.25 }{ 3 } } = 0.638\ \%
$$

**B wins: its RMS error is a third lower.** Weighted:

$$
A : \sqrt{ 0.1 ( 1.44 ) + 0.8 ( 0.09 ) + 0.1 ( 1.21 ) } = \sqrt{ 0.337 } = \boxed{ 0.58\ \% } \ , \qquad
B : \sqrt{ 0.1 ( 0.16 ) + 0.8 ( 0.81 ) + 0.1 ( 0.25 ) } = \sqrt{ 0.689 } = 0.83\ \%
$$

**and A wins: B's weighted error is $43\ \%$ higher.** Neither design is better in any absolute sense; each is shaped by the objective function that produced it, and the objective function is a statement about the machine's duty cycle that the synthesis cannot guess.

**Three consequences for how you actually run an optimisation.** Write the weights down before you run it; weights chosen afterwards justify a design rather than optimise it. Check whether the duty is really uniform — a linkage on an indexing machine may spend most of its life near two or three positions, and a uniform weighting will sacrifice those positions to improve a brief transition. And report the weighted and unweighted numbers side by side in the design review, so that the accuracy given up on the lightly weighted parts of the range is visible.
:::
:::

## When synthesis says no: choosing the next mechanism

A failed synthesis is a specification that the four-bar family cannot meet, and the family you move to depends on *why* it failed.

| What failed | What it means | Move to |
|---|---|---|
| Error too large at three or five points | Not enough free parameters | Geared five-bar, then a six-bar (Watt or Stephenson) |
| Branch or order defect that no re-synthesis removes | The prescribed points cannot be reached in order on one branch | Six-bar, or a cam |
| Transmission angle cannot be raised above $20^\circ$ | The force path and the motion path are fighting | Change the input: put the driver on the other grounded link, or add a lever |
| Dwell required, however short | A four-bar's output is stationary only for an instant, at a limit position | Cam, a Geneva (see [[mechanisms/mechanisms-mobility]]), or a six-bar dwell linkage |
| Path must be a straight line, exactly | Bézout forbids it | Sliding pair, flexure, an exact straight-line linkage such as Peaucellier's, or accept the approximation |
| Output must reverse within a cycle without the input reversing | Needs an internal toggle | Six-bar with a second loop |

The row that catches people is the fourth. **A four-bar cannot dwell.** At each limit position of a crank-rocker the crank and coupler are collinear and the rocker's angular velocity passes through zero, so near the limit the rocker angle changes only with the *square* of the crank angle. That looks like a dwell on a plot, but it is a reversal: the output stops for an instant, moves back, and never holds still. A true dwell needs a cam, an intermittent mechanism, or a six-bar in which a dyad follows a near-circular arc of a coupler curve.

::: example The dwell that was not {#ex-dwell-not}
A designer needs an output arm to hold still for $18^\circ$ of the input cycle while a tool works on the part it carries, and, wanting to avoid a cam, uses the limit position of a crank-rocker. With $a = 1$, $b = 3$, $c = 2$, $d = 3.2$ (crank, coupler, rocker, ground) the rocker swings through $61.0^\circ$ and moves only $0.25^\circ$ over the $18^\circ$ of crank centred on its limit position; the transmission angle there is a healthy $74^\circ$.

The plot looks like a dwell; the machine does not behave like one. At a $200\ \mathrm{mm}$ working radius, $0.25^\circ$ is $200 \times 0.25 \times \pi / 180 = 0.87\ \mathrm{mm}$ of motion — first towards the limit and then back — during the interval in which the tool expects the part to be stationary. For a task that tolerates a millimetre this may be acceptable; for location to $0.1\ \mathrm{mm}$ it is not, and no choice of four-bar proportions makes the motion zero.

A cam (or a servo following a cam profile) holds the follower exactly stationary for the whole dwell. The four-bar looked cheaper because it had fewer parts, not because it did the same job.
:::

## Design exercise: a square-root generator

::: exercise Square-root function generator {#ex-sqrt-design level=3 check="1.16"}
**Specification.** A mechanical flow-totaliser must convert a differential-pressure crank angle into a totalising-wheel angle as $y = \sqrt{x}$ for $1 \le x \le 9$, with the input crank swinging $50^\circ \le \theta_2 \le 150^\circ$ and the output rocker $135^\circ \le \theta_4 \le 175^\circ$. Synthesise a three-precision-point four-bar using Chebyshev spacing, and report the maximum error as a percentage of the output span. (Enter the maximum error in per cent of output span.)

::: hint
Do not forget that the output mapping is $\theta_4 = 135 + 40(\sqrt{x}-1)/2$ and not $135 + 40\sqrt{x}$: the span of $y$ is $2$, not $3$.
:::


::: solution
The mapping is $\theta_2 = 50 + 100(x-1)/8$ and $\theta_4 = 135 + 40(\sqrt{x} - 1)/2$.

Three Chebyshev points on $[1, 9]$: $x = 5 - 4\cos 30^\circ = 1.5359$, $x = 5$, $x = 8.4641$.

| $x$ | $\sqrt{x}$ | $\theta_2$ | $\theta_4$ |
|---|---|---|---|
| 1.5359 | 1.23931 | $56.699^\circ$ | $139.786^\circ$ |
| 5.0000 | 2.23607 | $100.000^\circ$ | $159.721^\circ$ |
| 8.4641 | 2.90931 | $143.301^\circ$ | $173.186^\circ$ |

Solving the three Freudenstein equations:

$$K_1 = 0.3020, \qquad K_2 = 0.6040, \qquad K_3 = 0.6826$$

With $a = 1$: $d = 0.3020$, $c = d/K_2 = 0.5000$, $b = \sqrt{1 + c^2 + d^2 - 2acK_3} = 0.8115$.

Sorted lengths $0.3020, 0.5000, 0.8115, 1.0000$ give $s + l = 1.302 < p + q = 1.312$: Grashof, ground shortest, so a **double-crank**: both grounded links can rotate fully, so the linkage cannot lock if the input is driven beyond its working range.

Sweeping the full range, the maximum error is $\boxed{1.16\%}$ of output span, occurring at $x = 1$. The transmission angle stays above $29.6^\circ$.

With equally spaced points $x = 3, 5, 7$ the same procedure gives $K_1 = 0.2301$, $K_2 = 0.5934$, $K_3 = 0.6170$ and a maximum error of $2.45\%$ — a factor of $2.1$ worse, and again at $x = 1$.

The Chebyshev design gains here because $\sqrt{x}$ is most sharply curved near $x = 1$, where the Chebyshev set has a precision point at $x = 1.54$ while the nearest equally spaced point is at $x = 3$.
:::
:::

## Quiz

::: quiz
A four-bar function generator is synthesised using three precision points. What is the real reason the number is three?

- [ ] Three is the maximum number of points a four-bar can match exactly
- [x] The Freudenstein equation is linear in exactly three constants, so three points give a solvable linear system
- [ ] Three points are needed to define a circle
- [ ] Chebyshev polynomials of degree three are the lowest that converge

::: solution
Linearity is the reason. Five points is the counting maximum for function generation with fixed angle ranges, reachable with a nonlinear solve; three is where the problem becomes a $3 \times 3$ linear system you can write down and solve.
:::
:::

::: quiz
Chebyshev spacing of precision points mainly reduces which part of the function error?

- [ ] The error at the precision points themselves
- [x] The error between the precision points, at the price of leaving the endpoints free
- [ ] The transmission angle
- [ ] The branch defect

::: solution
The precision points are exact by construction, so spacing cannot change them. Chebyshev flattens the interior error; in the worked example the residual $0.53\%$ maximum sits at the endpoint $x = 1$, which Chebyshev spacing does not protect.
:::
:::

::: quiz
A synthesised four-bar reproduces all its precision points in order, with a good transmission angle and no branch change, and still cannot be used. What is the most likely cause?

- [ ] The Grashof condition is violated
- [ ] The coupler curve is a sextic
- [x] The output reverses direction between two precision points, so the driven machine must re-approach
- [ ] The mechanism has a passive degree of freedom

::: solution
Monotonicity is not checked by any of the classical synthesis procedures, because they only guarantee the precision points. Plot the whole output curve before you draw a single machining detail.
:::
:::

::: history
{#history-synth}
- **1784 — James Watt patents the parallel motion.** Watt's double-acting beam engine needed the top of the piston rod guided in a nearly straight line while it pushed as well as pulled, and the linkage he patented in 1784 did it with nothing but pivots. He later said he was prouder of it than of any other of his mechanical inventions.
- **1853 — Pafnuty Chebyshev.** His memoir *Théorie des mécanismes connus sous le nom de parallélogrammes* (presented in 1853 and published by the St Petersburg Academy in 1854) analysed Watt's linkage as a problem of approximation and introduced the best-uniform-approximation ideas that now carry his name; the Chebyshev spacing used in this lesson comes from the same theory. He went on to design several straight-line linkages, including the lambda linkage.
- **1875 — Samuel Roberts**, a solicitor turned mathematician and a founding member of the London Mathematical Society, showed in *On three-bar motion in plane space* (*Proceedings of the London Mathematical Society*) that every four-bar coupler curve is traced by three different linkages. Chebyshev found the same result independently three years later, and it is now called the Roberts–Chebyshev theorem.
- **1888 — Ludwig Burmester's *Lehrbuch der Kinematik*** (Leipzig), the first volume of which, on plane motion, set out the circle-point and centre-point curves and the theory of four- and five-position synthesis. Burmester had been professor of descriptive geometry at Dresden and moved to the Technische Hochschule München in 1887.
- **1923 — Hermann Alt** posed the problem of passing a four-bar coupler curve through nine prescribed points. It was solved numerically only in 1992, by Wampler, Morgan and Sommese using polynomial continuation, who reported $1442$ coupler curves (each traced by three cognates) through nine general points.
- **1954 — Ferdinand Freudenstein.** Born in Frankfurt in 1926, he left Germany with his family as a boy and took his doctorate at Columbia University in 1954. His paper *An analytical approach to the design of four-link mechanisms* (*Transactions of the ASME*, 1954) introduced the equation with constants $K_1, K_2, K_3$ that makes three-point function synthesis a linear problem, and with it the computational approach to linkage design.
- **1964 — Richard Hartenberg and Jacques Denavit, *Kinematic Synthesis of Linkages*** (McGraw-Hill), written at Northwestern University: the first modern English-language textbook of the subject, which also spread the Denavit–Hartenberg notation for spatial linkages that robotics still uses.
:::

::: summary
- **The three synthesis problems differ only in how many equations each prescribed position contributes** — one for function generation and untimed path generation, two for timed path generation and untimed motion generation, three for timed motion generation — set against the parameters available: nine for a path generator, five for a function generator.
- **Three precision points is not a theoretical limit; it is the size of the linear system.** Freudenstein's equation is linear in exactly three constants, so three points give a closed-form solution and five give a nonlinear one that Newton–Raphson solves from the three-point starting guess.
- **Chebyshev spacing beats equally spaced points by a factor of $1.35$ to $2.1$, and choosing the input and output angle ranges beats Chebyshev by a factor of seven.** Spend your effort in that order.
- **A five-point synthesis with a datum offset on both links gives $9$ times the accuracy of a three-point design** — $0.058\ \%$ against $0.53\ \%$ — from two more constants, at the price of a nonlinear solve.
- **Accuracy and force transmission trade against each other directly.** Holding $\mu \ge 40^{ \circ }$ instead of $\mu \ge 25^{ \circ }$ costs a factor of seven in accuracy, and in the logarithm generator the transmission angle and the error are both worst at the same end of the range.
- **A zero residual is not a mechanism.** Branch, order and monotonicity defects are invisible to every classical synthesis procedure, and the only detector is a plot of the whole output curve over the whole input range.
- **A coupler curve is a sextic**, so no four-bar traces an exact straight line, and only degenerate ones (such as the parallelogram) trace an exact circle. Watt's linkage is extremely straight near mid-stroke but over a short travel; Chebyshev's keeps its departure near $1/800$ of the travel over a stroke as long as its ground link.
- **Roberts' theorem gives three four-bars for every coupler curve**, and the choice among them is free — which is the one place in synthesis where you may optimise the transmission angle without touching the accuracy.
- **For four positions, Burmester's curves give a one-parameter family of dyads, not a unique answer.** Use the freedom to avoid tolerance-sensitive regions and to place the fixed pivots where the machine has room for them.
- **Weight the objective by duty, not by index.** A weighted and an unweighted optimisation of the same specification produce different mechanisms, and the better one is the one whose weights describe the machine's real duty.
- **When synthesis says no, it is usually asking for a different mechanism class rather than a better four-bar**: dwell means a cam, a Geneva or a six-bar dwell linkage, an exact straight line means a sliding pair, a flexure or an exact straight-line linkage, a monotonicity defect that resynthesis cannot remove means a six-bar, and a transmission angle below $20^{ \circ }$ means a different input arrangement rather than a different optimiser.
:::

## Further reading

- **R. S. Hartenberg and J. Denavit, *Kinematic Synthesis of Linkages*, 1964** — the classical treatment of Burmester theory and of iterative function synthesis, geometric rather than computational.
- **A. G. Erdman, G. N. Sandor and S. Kota, *Mechanism Design: An Analysis and Synthesis*, 4th ed., 2001** — the standard reference for optimum synthesis with weighted objectives and for the type-synthesis problem.
- **R. L. Norton, *Design of Machinery*, 6th ed., 2020** — the most accessible route to the three-point Freudenstein synthesis, with the straight-line mechanisms tabulated and a good treatment of cognates.
- **F. Reuleaux, *The Kinematics of Machinery*, translated by A. B. W. Kennedy, 1876** — for the displacement-pole and centrode language that Burmester's theory assumes you already know.
- [[mechanisms/position-analysis]] — the Freudenstein equation and the quadratic solution this lesson inverts.
- [[mechanisms/mechanisms-mobility]] — Gruebler, Grashof and the transmission-angle rule.
- [[mechanisms/cams]] — what you use instead when a four-bar cannot make the curve.
