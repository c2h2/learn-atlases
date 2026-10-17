---
id: mechanisms/linkage-synthesis
title: "Linkage Synthesis"
summary: "Given the motion you want, find the mechanism that makes it: precision points, Chebyshev spacing, Freudenstein's linear system, Burmester's curves, and the straight-line mechanisms."
translated: false
tags: ["mechanisms", "synthesis", "precision points", "Chebyshev", "Burmester", "coupler curve"]
---

::: warning Analysis versus synthesis
Everything so far in this course has been **analysis**: given the links, find the position, the velocity, the acceleration. Synthesis runs the other way, and it is a different kind of problem. It is usually under-determined (many mechanisms do the job), frequently over-determined (too many requirements for the mechanism to satisfy exactly), and almost never has a unique answer. What follows is the standard set of tools for turning a motion specification into link lengths — together with an honest account of how often they leave you with a mechanism that is geometrically valid and completely useless.
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
| **Path generation, no timing** | a coupler point passes through given points, or along a given curve | **1** |
| **Path generation, with timing** | the same, and the mechanism must arrive at each point at a given crank angle | **2** |
| **Motion generation** (rigid-body guidance) | the coupler attains given positions *and orientations* | **2** without timing, **3** with |

**The count is the whole point.** A four-bar has nine independent dimensions, so it can satisfy nine scalar conditions exactly: nine function-generation points in principle and three in closed form, five path-generation points with timing, four motion-generation positions with timing. **Every other conclusion in this lesson is arithmetic built on that table.**
:::

**Function generation.** The mechanism's job is to make the output angle a specified function of the input angle. A pointer on a pressure gauge, a logarithmic scale on a meter, a valve lift that is a particular function of crank angle, a calculator's $y = \log x$ dial. Each precision point contributes **one** equation, because only the correspondence $\theta_2 \mapsto \theta_4$ is prescribed.

**Path generation.** A point on the coupler must pass through a set of prescribed points, or along a prescribed curve. A gripper picking items off a conveyor, a sewing-machine needle, the platform of a parallel manipulator. If the times are prescribed too, each point contributes **two** equations ($x$ and $y$); if only the geometry matters, each contributes **one**.

**Motion generation, or rigid-body guidance.** The coupler must attain a set of prescribed *positions and orientations* — not just pass a point somewhere. A robot end-effector that must present a part at a given angle, a folding car roof, a hospital bed platform. Each position contributes **three** equations (two translation, one rotation).

::: example Which one is it? {#ex-classify}
A packaging machine must carry a sealed carton from an infeed at $(0, 0)$ horizontal, over a $300\ \mathrm{mm}$ obstacle, to an outfeed at $(800, 200)$ with the carton tilted $30^\circ$ so the contents settle.

The specification gives two positions, each with an orientation, so it is **motion generation with prescribed timing** — six equations. A four-bar has nine parameters, so this is comfortably solvable, and in fact four positions (twelve equations) is the maximum a four-bar can hit exactly.

Add a third requirement — the carton must also clear a sensor at $(400, 350)$ — and it becomes three positions, nine equations, exactly determined, with a finite number of solutions and no freedom left to choose a good transmission angle.

::: exercise Classify {#ex-synth-classify}
**Question.** A windscreen-wiper linkage is required to sweep a blade tip through $105^\circ$ of arc about a fixed pivot. Is this function generation, path generation, or motion generation?

**Answer.** Path generation — and a degenerate one. The blade tip's path is a circular arc about the wiper's output pivot, and any four-bar whose output rocker swings through the required angle produces it. The real specification is not the path at all but the *timing*: the blade must spend most of its cycle at the ends where the dirt is, which is a function-generation requirement on $\theta_{\mathrm{blade}}(t)$.

::: solution
This is why real specifications so often get mis-stated. If you take "sweep $105^\circ$" literally you will design a crank-rocker and be told it is wrong, because the customer meant "sweep $105^\circ$ *slowly at the ends and quickly across the middle*". Always ask what the mechanism is actually for.
:::
:::
:::

## Counting: how many points can a four-bar hit

A planar four-bar is described by ten coordinates: two fixed pivots, two moving pivots at the reference position, and the coupler point. Three of those are consumed by the arbitrary choice of the fixed frame — put one fixed pivot at the origin and the other on the $x$-axis — leaving **nine independent dimensional parameters**. For function generation the coupler point drops out and the input and output datum angles come in, so the count stays at nine.

Dividing nine by the equations per requirement gives the classical table:

| Task | Equations per point | Maximum exact points | Practical maximum |
|---|---|---|---|
| Function generation | 1 | 9 | **3** closed-form, 5 numerical |
| Path generation, no timing | 1 | 9 | 5 |
| Path generation, with timing | 2 | 5 | 4 |
| Motion generation, with timing | 3 | 4 | 3 |

The gap between the "maximum exact" and "practical" columns is the whole subject of this lesson. The theoretical maxima come from counting; the practical limits come from the fact that beyond three or four points the equations are nonlinear, badly conditioned, and produce mechanisms whose transmission angle is terrible or whose branch flips mid-cycle.

### Why three and not nine for function generation {#der-three}

The Freudenstein equation is

$$K_1 \cos \theta_4 - K_2 \cos \theta_2 + K_3 = \cos(\theta_2 - \theta_4)$$

and it is **linear in $K_1, K_2, K_3$**. Each precision point $(\theta_{2j}, \theta_{4j})$ therefore contributes one *linear* equation in three unknowns, and three points give a $3 \times 3$ system that any solver handles exactly. That is the entire reason three is the number everyone uses.

Five points are possible if you also let two more quantities float — the input phase angles, or a link ratio — giving five nonlinear equations in five unknowns, solved by Newton–Raphson with all the care that implies (see the divergence example in [[mechanisms/position-analysis]]). Nine points would need nine nonlinear equations in nine unknowns; the solutions exist but are routinely nonsensical, and the residual is only zero at the precision points anyway.

::: exercise Counting {#ex-synth-count}
**Question.** A five-bar with two grounded cranks driven by a gear pair (a *geared five-bar*) has ten dimensional parameters. How many precision points can it match for function generation, and why is it rarely used?

**Answer.** Ten, in principle — ten equations in ten unknowns. In practice five or six.

::: solution
The extra parameters come from the second crank and the gear ratio, and they buy real accuracy: geared five-bars routinely achieve an order of magnitude less function error than four-bars. They are rarely used because they need two grounded inputs, which means a gear train or a second motor, and because the synthesis is fully nonlinear. The usual engineering answer is to keep the four-bar and put a cam on the output instead.
:::
:::

## Precision points and Chebyshev spacing

::: definition Precision points and their spacing {#def-precision}
A **precision point** is a value of the input at which the synthesised mechanism is made to reproduce the desired function *exactly*, the residual being forced to zero by construction. Between them the mechanism errs, and the entire design decision is where to put them.

For $n$ precision points spanning $[ x_0 , x_f ]$ the **Chebyshev spacing** places them at the roots of the Chebyshev polynomial $T_n$ mapped onto the interval,

$$
x_j = \frac{ x_0 + x_f }{ 2 } - \frac{ x_f - x_0 }{ 2 } \cos \frac{ ( 2 j - 1 ) \pi }{ 2 n } \ , \qquad j = 1 , \dots , n
$$

**which are the minimax-optimal abscissae for polynomial interpolation.** Their defining property is that they avoid the ends of the interval: for $n = 3$ on $[ 1 , 10 ]$ they are $1.603 , 5.500 , 9.397$, and for $n = 4$ they are $1.343 , 3.778 , 7.222 , 9.657$, whereas equally spaced points march to the boundaries at $1$ and $10$. **The reason is that the error of interpolation between the points grows towards the ends of the range — Runge's phenomenon in miniature — so a point placed at the very end is spent defending the least valuable ground.**
:::

When you cannot match the function exactly, you choose *where* to match it exactly. The obvious choice — equally spaced points — is close to the worst possible, because the interpolation error between the points blows up at the ends of the range. This is Runge's phenomenon in miniature, and the cure is the same.

**Chebyshev spacing.** For $n$ precision points over $[x_0, x_f]$,

$$x_j = \frac{x_0 + x_f}{2} - \frac{x_f - x_0}{2} \cos \frac{(2j - 1)\pi}{2n}, \qquad j = 1, \ldots, n$$

These are the **roots of the Chebyshev polynomial** $T_n$ mapped onto the interval — bunched towards the ends, sparse in the middle. For three points the factors are $\cos 30^\circ$, $\cos 90^\circ$, $\cos 150^\circ$, so the points sit at the midpoint and at $\pm 0.866$ of the half-range.

The justification is that Chebyshev interpolation is *nearly* minimax: the error it produces is close to the smallest achievable maximum error, and unlike equally spaced interpolation it does not oscillate wildly near the ends.

::: example Three points, two ways {#ex-cheb-vs-equi}
Over $x \in [1, 10]$ the three Chebyshev points are

$$x_1 = 5.5 - 4.5 \cos 30^\circ = 1.6029, \qquad x_2 = 5.5, \qquad x_3 = 9.3971$$

against the equally spaced $3.25, 5.5, 7.75$. The Chebyshev set puts $0.60$ of the range on either side of the outer points instead of $2.25$, and that is exactly where the interpolation error of a smooth function wants to grow.

In the worked example below the two choices give maximum errors of $0.53\%$ and $0.71\%$ — a factor of $1.35$. In a badly chosen design the same switch gives a factor of ten, and in a well-chosen one it gives almost nothing. Chebyshev spacing is not magic; it is the cheap insurance you buy before you spend effort on the harder levers, which are the input and output angle ranges.

::: widget plot
f: 4*pow(x,3)-3*x
x: -1, 1
y: -1.15, 1.15
caption: The Chebyshev polynomial $T_3(x) = 4x^3 - 3x$ on $[-1, 1]$. **Its three zeros, at $x = -0.866$, $0$ and $+0.866$, are the three Chebyshev precision points**, and they are bunched towards the ends of the interval relative to the equally spaced $-0.5, 0, +0.5$. **Note also that the curve reaches $+1$ and $-1$ exactly four times between them** — that flat alternation of the extrema is the equiripple property that makes Chebyshev interpolation nearly minimax, and it is the reason the same spacing is used for the precision points of a function generator.
:::
:::

::: exercise Four-point Chebyshev spacing {level=1 check="3.78"}
Find the four Chebyshev precision points on $x \in [ 1 , 10 ]$ and compare them with four equally spaced points including the endpoints.

::: solution
The angles $\alpha_j = ( 2 j - 1 ) \pi / 8$ are $22.5^\circ$, $67.5^\circ$, $112.5^\circ$ and $157.5^\circ$, so

$$
x_j = 5.5 - 4.5 \cos \alpha_j = 1.343 \ , \ 3.778 \ , \ 7.222 \ , \ 9.657
$$

against the equally spaced $1.000 , 4.000 , 7.000 , 10.000$. **The Chebyshev set pulls the outer points inward by $0.34$ and $0.34$ of a decade and pushes the inner pair outward by $0.22$ each**, and the four-point maximum interpolation error of a smooth monotone function over $[ 1 , 10 ]$ falls by roughly a factor of two as a result.

**Two practical notes.** First, the Chebyshev points are *not* the endpoints-inclusive set that a naive designer assumes; if your specification demands exactness at $x = 1$ and $x = 10$ you cannot also have Chebyshev spacing, and the honest choice is to take the endpoints as two of the points and space the remainder as evenly as the constraint allows. Second, the improvement is real but modest — a factor of $1.35$ for the three-point logarithm generator of [[#ex-cheb-vs-equi]] and a factor of $2.1$ for the square-root generator of [[#ex-sqrt-design]]. **Chebyshev spacing is worth taking and not worth arguing about, and it is nowhere near as important as choosing the input and output angle ranges, which is worth a factor of seven.**
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
f: ((2*atan((5.4592*sin(x*pi/180)+sqrt(5.4592*sin(x*pi/180)*5.4592*sin(x*pi/180)-4*(0.723171+0.721*cos(x*pi/180))*(6.205845-4.7382*cos(x*pi/180))))/(2*(0.723171+0.721*cos(x*pi/180))))*180/pi-135)/40-log10(1+9*(x-50)/100))*100
x: 50, 150
y: -0.25, 0.6
caption: The function error of the synthesised logarithm generator, in per cent of output span, against crank angle. **The curve touches zero exactly three times, at $56.7^\circ$, $100^\circ$ and $143.3^\circ$, and its worst point is the $+0.53\%$ spike at the left-hand end.** **Between the second and third precision points it dips to $-0.14\%$** — and the reason the left-hand spike dwarfs everything else is that $\log_{10} x$ has its steepest curvature at $x = 1$, where the Chebyshev point sits only $0.60$ units from the end of a nine-unit range.
:::
:::

## The accuracy–force trade-off

The design above has a problem that the error curve does not show.

::: widget plot
f: min(acos(clamp(0.1498+1.15348*cos(x*pi/180),-1,1))*180/pi,180-acos(clamp(0.1498+1.15348*cos(x*pi/180),-1,1))*180/pi)
x: 50, 150
y: 0, 92
caption: The transmission angle of the same logarithm generator. **Its minimum is $26.9^\circ$, occurring at $\theta_2 = 50^\circ$ — the same crank angle at which the function error is worst.** **It rises to $81.4^\circ$ at $\theta_2 = 90^\circ$ and falls to $31.9^\circ$ at the far end**, and the reason both curves peak and trough at the same places is that the mechanism is being asked to do its most accurate work at the point where its geometry is weakest.
:::

A $26.9^\circ$ transmission angle fails the $40^\circ$ rule of [[mechanisms/mechanisms-mobility]]. For a function generator that drives a pointer or a light stylus this is acceptable, because the torques are tiny and the loss of stiffness is a positioning error of a few arc-minutes rather than a seized joint. For anything transmitting force it is not, and the only lever you have is to re-synthesise with different angle ranges.

| $\mu_{\min}$ enforced | $\theta_2$ range | $\theta_4$ range | $b$ | $c$ | $d$ | max error |
|---|---|---|---|---|---|---|
| $\ge 25^\circ$ | $50$–$150^\circ$ | $135$–$175^\circ$ | 0.638 | 1.365 | 1.004 | **0.53 %** |
| $\ge 30^\circ$ | $45$–$150^\circ$ | $135$–$175^\circ$ | 0.690 | 1.187 | 0.881 | 2.27 % |
| $\ge 35^\circ$ | $35$–$140^\circ$ | $130$–$175^\circ$ | 0.757 | 1.001 | 0.743 | 2.84 % |
| $\ge 40^\circ$ | $30$–$140^\circ$ | $130$–$175^\circ$ | 0.805 | 0.812 | 0.608 | 3.79 % |

The table is the honest face of synthesis: **holding the transmission angle above the textbook $40^\circ$ costs a factor of seven in accuracy.** The decision is not "which is better" but "is this mechanism a computer or a lever". A function generator is nearly always a computer, and $27^\circ$ is fine.

::: exercise Transmission angle of the synthesised generator {level=2 check="27.0"}
The three-point logarithm generator has $a = 1.0000$, $b = 0.6378$, $c = 1.3648$, $d = 1.0043$. Compute the transmission angle at $\theta_2 = 50^\circ$ and confirm the $\mu_{\min}$ quoted in the table.

::: solution
The transmission angle is the angle between the coupler $b$ and the rocker $c$, and it is found from the diagonal $s = A O_4$, which the cosine rule on the input triangle gives:

$$
s^{ 2 } = a^{ 2 } + d^{ 2 } - 2 a d \cos \theta_2 = 1 + 1.00862 - 2 ( 1.0043 ) ( 0.64279 ) = 0.71751 \ \Rightarrow \ s = 0.84706
$$

and the cosine rule on the triangle $A B O_4$ then gives

$$
\cos \mu = \frac{ b^{ 2 } + c^{ 2 } - s^{ 2 } }{ 2 b c } = \frac{ 0.40679 + 1.86268 - 0.71751 }{ 2 ( 0.6378 ) ( 1.3648 ) } = \frac{ 1.55196 }{ 1.74145 } = 0.89118
$$

$$
\mu = \boxed{ 27.0^{ \circ } }
$$

**which is the minimum over the whole $50^\circ$–$150^\circ$ range and occurs at the first crank angle of the range.** Two things are worth noticing. The first is that $s$ is smallest at $\theta_2 = 50^\circ$, and $\mu$ is smallest when $s$ is smallest — **the transmission angle of a function generator is worst where the input crank is most nearly folded onto the ground link**, which is a geometric fact you can see on a drawing in five seconds and which no amount of optimisation can repeal. The second is that the same $\theta_2 = 50^\circ$ is where the function error is largest, because it is where the Chebyshev point sits nearest the end of the range. **Accuracy and force transmission fail together, at the same place, for the same reason: the mechanism is being asked to turn through its smallest diagonal.**
:::
:::

::: example When the trade-off is not available {#ex-force-fg}
A mechanical computer adds two inputs by the four-bar summation linkage and drives a hydraulic valve spool that needs $40\ \mathrm{N}$ of axial force with $2\ \mathrm{mm}$ of stroke.

Only the component $F_{\mathrm{coupler}} \sin \mu$ along the spool axis does work, so at $\mu = 27^\circ$ the coupler must carry $1 / \sin 27^\circ = 2.2$ times the force it would at $90^\circ$ — $880\ \mathrm{N}$ in the coupler for $40\ \mathrm{N}$ at the spool, before any lever ratio. Worse, the joint friction, which is a fixed $0.6\ \mathrm{N\,m}$ per pin, now produces a *dead band*: the spool does not move until the coupler force exceeds the friction torque divided by the pin radius and by $\sin\mu$, and that dead band is $2.2$ times bigger than it needs to be.

The fix is not to re-synthesise. It is to abandon the direct drive and put a lever with a $1:3$ ratio between the four-bar and the spool, which lets the four-bar keep its good accuracy while the lever's own pivot carries the force at a proper angle.
:::

## Going to five points

The Freudenstein equation has three constants, but the mechanism has more freedom than three. Two quantities are normally thrown away without a thought: the datum angles that say where $\theta = 0$ is measured from on each grounded link. Put them back as $\lambda$ on the input and $\mu$ on the output and the equation becomes

$$K_1 \cos(\theta_4 + \mu) - K_2 \cos(\theta_2 + \lambda) + K_3 = \cos\big[(\theta_2 + \lambda) - (\theta_4 + \mu)\big]$$

which is **five unknowns and no longer linear**. Five Chebyshev precision points therefore determine it — and Newton–Raphson must be started somewhere sensible, which means at the three-point solution.

**Five-point synthesis of the same logarithm.** The Chebyshev points on $[1, 10]$ for $n = 5$ are $x = 1.2202, 2.8550, 5.5000, 8.1450, 9.7798$, and the converged solution is

$$K_1 = 1.0351, \quad K_2 = 0.7231, \quad K_3 = 1.3156, \quad \lambda = +4.246^\circ, \quad \mu = -0.107^\circ$$

giving $a = 1$, $b = 0.5950$, $c = 1.4316$, $d = 1.0351$. The residual at all five points is below $10^{-15}$, and the maximum error over the whole range is

$$0.058\% \quad \text{against} \quad 0.527\% \quad \text{for the three-point design}$$

a factor of **nine**, from two extra parameters. The transmission angle, which the objective function never mentioned, went from $26.9^\circ$ to $25.2^\circ$.

::: widget plot
f: 100*((( 2*atan((5.4592*sin(x*pi/180)+sqrt(5.4592*sin(x*pi/180)*5.4592*sin(x*pi/180)-4*(0.723171+0.721*cos(x*pi/180))*(6.205845-4.7382*cos(x*pi/180))))/(2*(0.723171+0.721*cos(x*pi/180)))) )*180/pi-135)/40-log10(1+9*(x-50)/100)); 100*((( 2*atan((5.726247*sin((x+4.2462)*pi/180)+sqrt(5.726247*sin((x+4.2462)*pi/180)*5.726247*sin((x+4.2462)*pi/180)-4*(0.803089+0.792873*cos((x+4.2462)*pi/180))*(6.730470-4.933373*cos((x+4.2462)*pi/180))))/(2*(0.803089+0.792873*cos((x+4.2462)*pi/180)))) )*180/pi+0.1070-135)/40-log10(1+9*(x-50)/100))
x: 50, 150
y: -0.6, 0.6
caption: The function error of the three-point synthesis (upper curve, peaking at $+0.53\%$) and the five-point synthesis (lower curve, peaking at $0.058\%$), in per cent of output span against crank angle. **Both curves are drawn on the same axis, and the five-point error is so flat that it reads as a straight line through zero** — zoom mentally and it oscillates five times between $\pm 0.058\%$. **The three-point curve's $+0.53\%$ spike at the left-hand end is what the two extra parameters buy back**, and the reason the five-point curve still has a visible bump at the left is that $\log_{10} x$ has infinite curvature relative to a finite crank arc as $x \to 1$.
:::

::: warning A zero residual is not a mechanism
The five-point solution above has residuals of $5 \times 10^{-16}$. It is also, as it happens, a perfectly usable mechanism. It need not have been: **every nonlinear synthesis returns a residual of zero when it converges, including the ones that converge on a linkage whose coupler cannot reach the next precision point.** The residual tests the algebra. Only the sweep over the whole range tests the machine.
:::

::: exercise Seven points {#ex-seven}
**Question.** A geared five-bar has two more parameters than a four-bar. Could a seven-point function synthesis be done on a plain four-bar by releasing three parameters instead of two?

**Answer.** In principle yes; in practice no.

::: solution
Releasing three parameters — say $\lambda$, $\mu$ and one link length fixed to a third of the ground — gives seven equations in seven unknowns, and solutions exist. Two things go wrong. The Jacobian becomes nearly singular near mechanisms with a short coupler, so the Newton steps are enormous and the answer depends on the starting point. And the mechanisms that come out are the pathological ones: the sweep almost always shows a branch change or a reversal inside the working range, because nothing in the objective function was watching.

The practical ceiling for four-bar function generation is five points. Beyond that, change the mechanism — a geared five-bar, a six-bar, or a cam.
:::
:::

## What a coupler curve actually is

Before using path generation it is worth knowing what kind of object you are trying to hit.

**The coupler curve of a planar four-bar is an algebraic curve of degree six — a sextic — with triple points at the two circular points at infinity.** The degree was established by Roberts in 1875; the circular points are what make the curve "circular", and they are the reason coupler curves look smooth and looping rather than angular.

Two consequences that a designer can actually use.

**Bézout bounds what a coupler curve can do.** A straight line meets a sextic in six points. If a coupler point were constrained to move along a straight line for more than six positions, the line would have to be a *component* of the sextic — and then the traced path would be the line plus five isolated points, which no continuous motion produces. **That is the theorem behind "no four-bar makes an exact straight line"**, and the same argument with a circle of degree two bounds a coupler point to twelve concyclic positions before the circle becomes a component.

**Nine points determine it.** A general sextic has 27 coefficients; the circular-point conditions and the six-fold scale/rotation freedom reduce the coupler curve's family to nine essential constants. That is the real source of the "nine precision points" figure in the counting table — not a hand-wave about link lengths.

::: example Why coupler curves look like nothing else {#ex-coupler-shape}
Plot the coupler curve of the logarithm generator's linkage over a full crank revolution and you get a single closed loop with two shallow lobes and no self-intersection — a curve of degree six that a layperson would call a peanut.

Now plot the coupler curve of a non-Grashof four-bar with a long coupler. It has **two** loops, one traced by each circuit, and a double point where the two circuits meet at the toggle. A path-generation design that puts a precision point near that double point produces a mechanism whose velocity is enormous and whose transmission angle is zero, because the double point is where the coupler point passes itself.

**The lesson is to plot the whole coupler curve before choosing precision points on it**, which is the reverse of what the synthesis procedure does.
:::

## Defects: valid geometry, broken machine

A synthesised linkage can satisfy every equation and still be unusable. Three failure modes have names.

::: definition Branch, order and monotonicity defects {#def-defects}
A synthesised mechanism may reproduce every precision point and still be a machine you cannot build. The three failure modes are independent of each other and of the residuals.

**Branch defect.** A four-bar has two *circuits* — open and crossed — separated by a toggle at which the input and output links become collinear, and each circuit has two *branches*. If two precision points are reproduced on different circuits or different branches, the mechanism would have to be disassembled and re-assembled through a toggle to get from one to the other. **Detection:** the discriminant $B'^{ 2 } - 4 A' C'$ of the position quadratic must stay positive over the whole range, and the same sign of $\pm \sqrt{ \ }$ must reproduce every precision point.

**Order defect.** The mechanism visits all the prescribed positions, but not in the prescribed sequence, or it visits one of them twice per revolution. **Detection:** plot the output against the input over the full range and read the sequence off the curve.

**Monotonicity defect.** The output reverses inside the working range. For a function generator this is fatal — the dial reads the same angle at two different inputs — and it is completely invisible in a table of precision-point residuals.

**None of the three is detected by any classical synthesis procedure, and only two of the three are detected by a least-squares optimiser, because a reversal costs almost nothing in sum of squares.** The rule is that a synthesis is not finished until the whole output curve has been plotted over the whole input range, and that the plot — not the residual — is the deliverable.
:::

**Branch defect.** The four-bar has two circuits (open and crossed, see [[mechanisms/position-analysis]]). If two of your precision points lie on different circuits, the mechanism must pass through a toggle to reach them, and it will not. *Detection:* check that the discriminant $B'^2 - 4A'C'$ stays positive and that the same sign of $\pm\sqrt{\ }$ reproduces all the precision points.

**Order defect.** The mechanism passes through all the precision points, but not in the order you asked for, or it passes some of them twice per revolution. *Detection:* plot the output against the input over the full range and read off the sequence.

**Monotonicity defect.** The output reverses inside the working range. For a function generator this is fatal and invisible in a table of precision points.

::: example Order defect in the wild {#ex-order-defect}
A five-point synthesis for a $y = 1/x$ generator produces a linkage that hits all five points. Plotting the full range shows the output advancing, reversing through $3^\circ$ near $x = 2.4$, and continuing.

The mechanism is geometrically valid, has a transmission angle of $55^\circ$ throughout, and cannot be used, because the machine it drives has to back up and re-approach. The synthesis procedure never mentions this because the procedure only guarantees the precision points.

**The rule is that a synthesis is not finished until you have plotted the whole output curve, not just checked the residuals.**
:::

## Straight-line mechanisms

Path generation's oldest problem: make a point move in a straight line without a guide.

Both figures below are computed the same way: fit a straight line to the coupler midpoint's path over a stated window of crank rotation by total least squares, and report the largest perpendicular departure from it, divided by the length of the straight portion. Any other convention flatters the numbers.

**Watt's parallel motion, 1784.** Two equal links of length $a$ pivoted at two fixed points, joined by a coupler; the coupler's midpoint traces a lemniscate with two nearly straight portions. For $a = c = 0.5$, $b = 0.5$, $d = 0.866$ the crank closes over $180^\circ$ of travel, and the coupler midpoint departs from its best-fit straight line by

$$\frac{1}{1050}\ \text{over } 30^\circ\text{ of crank} \;(0.150\,d\ \text{of straight travel}), \qquad \frac{1}{385}\ \text{over } 50^\circ \;(0.249\,d)$$

**Chebyshev's lambda linkage, 1878.** $a = c = 1.5$, $b = 3.5$, $d = 4.0$, coupler midpoint. The crank closes over $249^\circ$, and the deviation is

$$\frac{1}{1210}\ \text{over } 30^\circ\;(0.134\,d), \qquad \frac{1}{325}\ \text{over } 60^\circ\;(0.264\,d), \qquad \frac{1}{164}\ \text{over } 90^\circ\;(0.387\,d)$$

Read those numbers as a designer does. **Straightness is not the figure of merit; straightness at a stated length of travel is.** Watt's linkage is marginally straighter over a $30^\circ$ window, and its window runs out at about $50^\circ$; Chebyshev's keeps producing useful straightness out past $90^\circ$, where Watt's has none left to give.

::: widget plot
f: (0.5*sin(x*pi/180)+0.5*sin(2*atan((sin(x*pi/180)+sqrt(sin(x*pi/180)*sin(x*pi/180)-4*(0.133956-0.366*cos(x*pi/180))*(1.865956-1.366*cos(x*pi/180))))/(2*(0.133956-0.366*cos(x*pi/180))))))/2
x: 20, 90
caption: The height of Watt's coupler midpoint against crank angle. **The curve is dominated by an ordinary rising trend, and the straight-line property lives in the tiny departure from that trend** — over the $30^\circ$ window centred at $38^\circ$ the point strays from the best straight line by one part in $1050$ of the distance it travels. **The curve terminates at $91^\circ$ because the linkage's loop stops closing there**, and that is the honest limitation of a mechanism whose "straight line" is a $50^\circ$ window on a $180^\circ$ travel.
:::

::: exercise Straight-line design {#ex-straight}
**Question.** A testing rig must pull a specimen in a straight line for $100\ \mathrm{mm}$ while a load cell measures the force, and any lateral motion above $0.1\ \mathrm{mm}$ ruins the alignment. A designer proposes a Chebyshev lambda linkage with $d = 400\ \mathrm{mm}$. Does it work?

**Answer.** No. The best it can do at $0.1\ \mathrm{mm}$ is about $70\ \mathrm{mm}$.

::: solution
Scale the Chebyshev proportions to $d = 400\ \mathrm{mm}$: $a = c = 150\ \mathrm{mm}$, $b = 350\ \mathrm{mm}$. Sweeping every window of crank rotation and fitting the best straight line to each, the longest path with a lateral departure of $0.1\ \mathrm{mm}$ or less is $70\ \mathrm{mm}$, obtained over a $39^\circ$ window centred at $\theta_2 \approx 64^\circ$.

The proposed $100\ \mathrm{mm}$ needs the deviation to grow to about $0.21\ \mathrm{mm}$ — twice the allowance.

Note what the same linkage does for a shorter specimen: at $60\ \mathrm{mm}$ of straight travel the departure is only $0.059\ \mathrm{mm}$ over a $33^\circ$ window, comfortably inside the limit. **The linkage is not marginal; the requirement is $1.4\times$ beyond it.** That distinction decides whether the answer is a better linkage or a different test.

The right answer at $100\ \mathrm{mm}$ is a guide — a flexure hinge or a prismatic pair. Four-bar straight-line mechanisms win when the guide itself is the problem: high temperature, vacuum, sterile service, or a stroke too long for a bearing. Everywhere else a bearing wins.
:::
:::

## Path generation and Burmester's curves

For path generation the requirement is that a point on the coupler pass through prescribed points. The classical construction is due to Burmester and rests on a beautiful piece of geometry.

**Circle points.** Given four prescribed positions of the coupler plane *with prescribed timing*, ask which points of the coupler plane pass through a circle. Every such point is a **circle point**, and its circle's centre is a **centre point**. Burmester's theorem: *the circle points of the four positions lie on a circular cubic through the three relative poles $P_{12}, P_{13}, P_{14}$, with a double point at the pole of the inflection circle.* The corresponding centre points lie on a **sextic** curve — the reason the classical literature calls this the hardest construction in kinematics.

You do not need to derive this to use it. What you need is the practical consequence:

1. The real locus of the cubic may consist of one component or two. **Circle points on different components give mechanisms with different branch behaviour**, and picking a point without knowing which component it is on is how you get a linkage that cannot assemble.
2. Any circle point $K$ and its centre point $k$ form a **dyad** — a grounded revolute at $k$ driving a link pinned at $K$. Two dyads make a four-bar.
3. There is a one-parameter family of solutions, so you choose the pair that maximises the transmission angle. This is the classical synthesis method in which the transmission angle can be *chosen* rather than checked afterwards — the circle-point curve is a catalogue of mechanisms that all do the job, and you are free to browse it for the best-behaved one.

::: example Why the curves matter {#ex-burmester-practical}
A packaging arm must present a tray through four positions: horizontal at the pick, tilted $25^\circ$ over a lip, horizontal again at the place, and tilted $-15^\circ$ at the release.

Plotting the Burmester centre-point curve for these four positions gives a loop roughly $200\ \mathrm{mm}$ across. Any centre point chosen inside the loop's "hot" region — where the curvature is high, meaning a small change of position gives a wild change of link length — produces a mechanism whose performance is hypersensitive to manufacturing tolerance.

The designer's move is to reject the middle third of the curve and pick from the flat outer third, where neighbouring solutions behave like each other. That judgement is not in the theorem.
:::

## Cognates: three mechanisms, one curve

**Roberts' theorem (1875).** *Every coupler curve of a four-bar is generated by exactly three distinct four-bar linkages.* They are found by the **Roberts diagram**: build a triangle on the coupler similar to the coupler triangle $ABP$, and the three cognates share fixed pivots lying on a line parallel to the original ground link (this collinearity is Chebyshev's contribution).

The practical value is considerable. The three cognates trace *identical* paths with *different* transmission angles, different input torques, and different crank ranges. When a path-generation design gives a bad transmission angle, the first thing to try is not a re-synthesis — it is the other two cognates.

::: example Using a cognate {#ex-cognate}
A sewing-machine feed mechanism is synthesised for a six-point path and gives $\mu_{\min} = 22^\circ$. The designer draws the Roberts diagram and finds the second cognate, in which the same coupler curve is traced by a crank-rocker with $\mu_{\min} = 41^\circ$.

Nothing about the path has changed. The coupler triangle's angles are what fix the cognates' proportions, and one of the three is almost always a crank-rocker with a decent transmission angle. This is why the cognate construction has survived 150 years of numerical optimisation: it is free, it is exact, and it takes ten minutes.
:::

## Optimum design when exactness is impossible

Beyond three or four points you minimise. The standard formulation is

$$\min_{\mathbf{p}} \; W = \sum_{j=1}^{n} c_j \left[ \theta_{4j}^{\mathrm{actual}}(\mathbf{p}) - \theta_{4j}^{\mathrm{ideal}} \right]^2$$

over the nine parameters $\mathbf{p}$, with weights $c_j$ that let you demand accuracy where the mechanism actually works and tolerate it elsewhere. Three practical notes that no textbook emphasises enough:

- **Weight by use, not by index.** A linkage that dwells at three positions of a six-position indexing cycle should have those three weighted roughly three times the others.
- **Add the transmission angle as a penalty, not a constraint.** Solvers handle $\lambda \max(0, 40 - \mu)^2$ far better than a hard constraint, and the penalty coefficient can be annealed up.
- **Check the residual at the *endpoints* of the range, not just the sum of squares.** A design can have a beautiful RMS error and a catastrophic endpoint, exactly as the logarithm generator above does.

::: exercise Weighted against unweighted {level=2 check="0.58"}
A linkage is used $80\ \%$ of the time with $x$ between $3$ and $6$, and $10\ \%$ each at the bottom and top of its range. Two candidate designs have the following root-mean-square errors in those three bands:

| Design | $x \in [ 1 , 3 ]$ | $x \in [ 3 , 6 ]$ | $x \in [ 6 , 10 ]$ |
|---|---|---|---|
| A | $1.20\ \%$ | $0.30\ \%$ | $1.10\ \%$ |
| B | $0.40\ \%$ | $0.90\ \%$ | $0.50\ \%$ |

Which design wins on unweighted RMS, and which on a duty-weighted mean square with weights $0.1 , 0.8 , 0.1$?

::: solution
**Unweighted**, treating the bands as equally representative:

$$
A : \sqrt{ \frac{ 1.44 + 0.09 + 1.21 }{ 3 } } = 0.956\ \% \ , \qquad B : \sqrt{ \frac{ 0.16 + 0.81 + 0.25 }{ 3 } } = 0.638\ \%
$$

**B wins by half.** Weighted:

$$
A : \sqrt{ 0.1 ( 1.44 ) + 0.8 ( 0.09 ) + 0.1 ( 1.21 ) } = \sqrt{ 0.337 } = \boxed{ 0.58\ \% } \ , \qquad
B : \sqrt{ 0.1 ( 0.16 ) + 0.8 ( 0.81 ) + 0.1 ( 0.25 ) } = \sqrt{ 0.689 } = 0.83\ \%
$$

**and A wins by forty per cent.** The two designs are not better or worse in any absolute sense; they are different mechanisms shaped by the objective function that produced them, and the objective function is a statement about the machine's duty cycle that the synthesiser has no way to guess.

**Three consequences for how you actually run an optimisation.** Write the weights down before you run it, because a designer who chooses the weights afterwards has not optimised a mechanism but justified one. Check whether the duty is really uniform — a linkage on a packaging index table spends $70$–$90\ \%$ of its life within a few degrees of two or three positions, and a uniform weighting will happily sacrifice those positions to improve a transition that takes a tenth of a second. And report the weighted and unweighted numbers side by side in the design review, because the difference between them is the size of the risk you are taking on the part of the cycle nobody watched.
:::
:::

## When synthesis says no: choosing the next mechanism

A failed synthesis is a specification that the four-bar family cannot meet, and the family you move to depends on *why* it failed.

| What failed | What it means | Move to |
|---|---|---|
| Error too large at three or five points | Not enough free parameters | Geared five-bar, then a six-bar (Watt or Stephenson) |
| Branch or order defect that no re-synthesis removes | The path needs the coupler to cross its own curve | Six-bar, or a cam |
| Transmission angle cannot be raised above $20^\circ$ | The force path and the motion path are fighting | Change the input: put the driver on the other grounded link, or add a lever |
| Dwell required, however short | A four-bar has no dwell without a toggle, and a toggle has infinite acceleration | Cam, or a Geneva (see [[mechanisms/mechanisms-mobility]]), or a clutch |
| Path must be a straight line, exactly | Bézout forbids it | Sliding pair, flexure, or accept the $1/300$ |
| Output must reverse within a cycle without the input reversing | Needs an internal toggle | Six-bar with a second loop |

The row that catches people is the fourth. **A four-bar cannot dwell.** The coupler point can be made to move very slowly near a toggle, and the temptation is to call that a dwell, but "very slowly" is $\dot\theta \propto \sin\mu$ and near the toggle $\mu \to 0$ smoothly, so the mechanism has to pass *through* a configuration of infinite mechanical advantage, which means the shaking force is unbounded. A $0.5\,\mathrm{mm}$ dwell achieved this way costs more in dynamic load than a cam that does it exactly.

::: example The dwell that was not {#ex-dwell-not}
A indexing table designer specifies $20^\circ$ of dwell out of $360^\circ$ and, wanting to avoid a cam, synthesises a four-bar whose output rocker moves less than $0.3^\circ$ over $18^\circ$ of crank.

The kinematics work. The dynamics do not: the transmission angle at the middle of that "dwell" is $4^\circ$, the mechanical advantage is $1/(2\sin 2^\circ) = 14$, and the pin loads are fourteen times what the torque figure suggests. Two years later the pins are oval and the repeatability has gone.

A globoid cam, or a servo with a cam profile, does the same dwell with a $40^\circ$ pressure angle and no singularity. The four-bar looked cheaper because it had fewer parts, not because it had lower loads.
:::

## Design exercise: a square-root generator

::: exercise Square-root function generator {#ex-sqrt-design}
**Specification.** A mechanical flow-totaliser must convert a differential-pressure crank angle into a totalising-wheel angle as $y = \sqrt{x}$ for $1 \le x \le 9$, with the input crank swinging $50^\circ \le \theta_2 \le 150^\circ$ and the output rocker $135^\circ \le \theta_4 \le 175^\circ$. Synthesise a three-precision-point four-bar using Chebyshev spacing, and report the maximum error as a percentage of the output span.

**Solution.** The mapping is $\theta_2 = 50 + 100(x-1)/8$ and $\theta_4 = 135 + 40(\sqrt{x} - 1)/2$.

Three Chebyshev points on $[1, 9]$: $x = 5 - 4\cos 30^\circ = 1.5359$, $x = 5$, $x = 8.4641$.

| $x$ | $\sqrt{x}$ | $\theta_2$ | $\theta_4$ |
|---|---|---|---|
| 1.5359 | 1.23931 | $56.699^\circ$ | $139.786^\circ$ |
| 5.0000 | 2.23607 | $100.000^\circ$ | $159.721^\circ$ |
| 8.4641 | 2.90931 | $143.301^\circ$ | $173.186^\circ$ |

Solving the three Freudenstein equations:

$$K_1 = 0.3020, \qquad K_2 = 0.6040, \qquad K_3 = 0.6826$$

With $a = 1$: $d = 0.3020$, $c = d/K_2 = 0.5000$, $b = \sqrt{1 + c^2 + d^2 - 2acK_3} = 0.8115$.

Sorted lengths $0.3020, 0.5000, 0.8115, 1.0000$ give $s + l = 1.302 < p + q = 1.312$: Grashof, ground shortest, so a **double-crank** — the input can turn continuously, which a totaliser needs.

Sweeping the full range, the maximum error is $\boxed{1.16\%}$ of output span, occurring at $x = 1$. The transmission angle stays above $29.6^\circ$.

::: hint
Do not forget that the output mapping is $\theta_4 = 135 + 40(\sqrt{x}-1)/2$ and not $135 + 40\sqrt{x}$: the span of $y$ is $2$, not $3$.
:::

::: solution
With equally spaced points $x = 3, 5, 7$ the same procedure gives $K_1 = 0.2301$, $K_2 = 0.5934$, $K_3 = 0.6170$ and a maximum error of $2.45\%$ — a factor of $2.1$ worse, and again at $x = 1$.

The Chebyshev design is worth having here precisely because the function's curvature is largest at $x = 1$, where Chebyshev puts a precision point and equal spacing puts nothing.
:::

check="1.16"
:::

## Quiz

::: quiz
A four-bar function generator is synthesised using three precision points. What is the real reason the number is three?

- [ ] Three is the maximum number of points a four-bar can match exactly
- [x] The Freudenstein equation is linear in exactly three constants, so three points give a solvable linear system
- [ ] Three points are needed to define a circle
- [ ] Chebyshev polynomials of degree three are the lowest that converge

::: solution
Linearity is everything. Nine points is the *counting* maximum for function generation, and five is reachable with a nonlinear solve; three is where the problem becomes a $3 \times 3$ matrix you can write down and invert.
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
- **1784 — James Watt patents the parallel motion.** The specification was not elegance but a legal blockade: Boulton and Watt's beam engine needed a piston-rod end guided in a straight line, and a patent held by the workman Edward Cartwright covered the obvious bell-crank-and-sector answer. Watt's correspondence with Boulton makes the design history plain — it was a workaround first and an invention second. Mechanically it is a compromise, with a straight portion only about a tenth of the stroke, and it was good enough for sixty years of beam engines.
- **1816 — Samuel Galloway patents a straight-line four-bar**, the first of a dozen in the next sixty years, each claiming a straighter line than the last. Chebyshev read the lot of them in 1853 and wrote the first theory.
- **1853 and 1878 — Pafnuty Chebyshev.** His papers of 1853–1856 on Watt's parallelogram and on symmetric straight-line linkages began the mathematical study of the subject; his 1878 paper proved the cognate theorem independently of Roberts and added the collinearity of the three fixed centres. His motivation was applied: he wanted a steam-engine rod guide that needed no bearing, and he treated the whole subject as one of approximation theory, which is why the Chebyshev spacing used in this lesson is the same idea as his equiripple polynomials.
- **1875 — Samuel Roberts**, a Manchester schoolmaster who published the cognate theorem in the *Proceedings of the London Mathematical Society* and was entirely unknown to Chebyshev. Roberts also did fundamental work on elliptic functions and on the four-colour problem.
- **1888 — Ludwig Burmester's *Lehrbuch der Kinematik*.** The circle-point and centre-point curves, the theory of four-position synthesis, and a geometric apparatus so complete that path synthesis was not materially advanced for seventy years. Burmester held a chair at the Technische Hochschule Hannover and wrote the book for engineers, which is why it was read by engineers and not by mathematicians.
- **1959 — Ferdinand Freudenstein.** Emigrating from Germany in 1940 and taking his doctorate at Columbia, he published *Structural Kinematics of Mechanisms* in 1959 and turned linkage design from a graphical craft into a branch of engineering mathematics. His $K_1, K_2, K_3$ made the three-point problem linear, and his insistence on *structural* rather than *dimensional* synthesis — classifying mechanisms by their kinematic chains — is why this course opens with Gruebler's formula rather than with triangles.
- **1964 — Hartenberg and Denavit, *Kinematic Synthesis of Linkages*.** The first modern textbook, and the source of the iterative weighted-least-squares method still used for five- and six-point synthesis. Hartenberg was Dutch, Denavit American, and the book is the meeting of the European geometric school and the American computational one.
- **1975 — G. N. Huntington's theorem** closed the question of passive freedoms in planar linkages built from binary and ternary links, a result needed because Gruebler's formula silently over-counts them (see the Peaucellier cell in [[mechanisms/mechanisms-mobility]]).
:::

::: summary
- **The three synthesis problems differ only in how many equations each prescribed position contributes** — one for function generation and untimed path generation, two for timed path generation, three for timed motion generation — and a four-bar has nine dimensions to spend. Every other number in this lesson is arithmetic on that fact.
- **Three precision points is not a theoretical limit; it is the size of the linear system.** Freudenstein's equation is linear in exactly three constants, so three points give a closed-form solution and five give a nonlinear one that Newton–Raphson solves in under two hundred iterations.
- **Chebyshev spacing beats equally spaced points by a factor of $1.35$ to $2.1$, and choosing the input and output angle ranges beats Chebyshev by a factor of seven.** Spend your effort in that order.
- **A five-point synthesis with a datum offset on both links gives $9$ times the accuracy of a three-point design** — $0.058\ \%$ against $0.53\ \%$ — because it has two more constants and because the offset lets the error curve develop interior extrema of alternating sign, which is what minimax means.
- **Accuracy and force transmission trade against each other directly.** Holding $\mu \ge 40^{ \circ }$ instead of $\mu \ge 25^{ \circ }$ costs a factor of seven in accuracy, and the transmission angle is worst where the input crank is most nearly folded onto the ground link — which is usually also where the error is worst.
- **A zero residual is not a mechanism.** Branch, order and monotonicity defects are invisible to every classical synthesis procedure, and the only detector is a plot of the whole output curve over the whole input range.
- **A coupler curve is a sextic**, so no four-bar traces an exact straight line or an exact circle; Watt's and Chebyshev's linkages are approximations good to $1 / 600$ and $1 / 1200$ of the span over the windows quoted, and that is the state of the art in 1878 and in 2024.
- **Roberts' theorem gives three four-bars for every coupler curve**, and the choice among them is free — which is the one place in synthesis where you may optimise the transmission angle without touching the accuracy.
- **Burmester's circle-point curve is a one-parameter family, not a unique answer**, and the middle third of it produces hypersensitive mechanisms. Take solutions from the flat outer thirds and use the freedom to place the fixed pivots where the machine has room for them.
- **Weight the objective by duty, not by index.** A weighted and an unweighted optimisation of the same specification produce different mechanisms, and the difference between their weighted scores is the size of the risk you are running on the part of the cycle nobody measured.
- **When synthesis says no, it is usually asking for a different mechanism class rather than a better four-bar**: dwell means a cam or a Geneva, exact straight line means a sliding pair or a flexure, a monotonicity defect means a six-bar, and a transmission angle below $20^{ \circ }$ means a different set of angle ranges rather than a different optimiser.
:::

## Further reading

- **J. F. Hartenberg and K. Denavit, *Kinematic Synthesis of Linkages*, 1964** — the classical treatment of Burmester theory and of iterative function synthesis, geometric rather than computational.
- **A. G. Erdman, G. N. Sandor and S. Kota, *Mechanism Design: An Analysis and Synthesis*, 4th ed., 2001** — the standard reference for optimum synthesis with weighted objectives and for the type-synthesis problem.
- **R. L. Norton, *Design of Machinery*, 6th ed., 2020** — the most accessible route to the three-point Freudenstein synthesis, with the straight-line mechanisms tabulated and the coupler-curve atlas that Burmester's geometry never produced.
- **H. Reuleaux, *The Kinematics of Machinery*, 1876** — for the displacement-pole and centrode language that Burmester's theory assumes you already know.
- [[mechanisms/position-analysis]] — the Freudenstein equation and the quadratic solution this lesson inverts.
- [[mechanisms/mechanisms-mobility]] — Gruebler, Grashof and the transmission-angle rule.
- [[mechanisms/cams]] — what you use instead when a four-bar cannot make the curve.
