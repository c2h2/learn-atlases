A power system must decide, continuously, how much each generator should produce. Two questions are involved, on very different time scales. The **economic** question, answered every five to fifteen minutes and planned a day ahead, is how to share the forecast demand among the available units so that the total cost of fuel is as small as possible, given each unit's limits and the losses in the network. The **control** question, answered every second, is how to keep generation equal to the actual demand, which never quite matches the forecast: any imbalance shows up immediately as a change in frequency, because the difference between mechanical input and electrical output goes into or comes out of the kinetic energy of every rotating machine in the system.

This chapter treats both. We model generators by their fuel-cost curves, derive the **equal incremental cost** rule for economic dispatch by Lagrange multipliers, add generator limits and transmission losses, and sketch the larger **unit commitment** problem of deciding which units to run at all. We then turn to frequency: the **governor droop** characteristic that shares load changes among generators within seconds, the **load–frequency** model of a control area, and **automatic generation control** (AGC), which restores frequency and scheduled tie-line flows by integral control and, at the same time, implements the economic dispatch. The swing equation of [[power-systems/power-system-stability]] supplies the dynamics, and the power-flow model of [[power-systems/power-flow]] the network. Lagrange multipliers are reviewed in [Maths Atlas](/learn/maths/).

## Generator cost curves

A thermal unit's fuel input, measured in GJ/h, rises with its output $P$ in MW. Multiplied by the fuel price, it gives the **cost curve** $C(P)$ in currency per hour. Measured curves are well approximated by a quadratic over the operating range.

::: definition Cost function and incremental cost {#def-incremental-cost}
The operating cost of unit $i$ is modelled as
$$
C_i(P_i) = a_i + b_iP_i + c_iP_i^2,\qquad P_{i,\min}\le P_i\le P_{i,\max},
$$ {#eq-cost}
with $a_i$ the no-load cost and $c_i > 0$, so that $C_i$ is convex. The **incremental cost** is the derivative
$$
\mathrm{IC}_i = \frac{\mathrm dC_i}{\mathrm dP_i} = b_i + 2c_iP_i,
$$
the cost of producing one more MWh at output $P_i$. The **heat rate**, fuel input per unit of output (GJ/MWh), is lowest near full load: large modern units are the most efficient when fully loaded.
:::

Hydro, wind and solar units have essentially zero fuel cost and are dispatched differently: hydro by the value of its stored water over a season, wind and solar by their availability. Economic dispatch concerns the thermal units that balance the remainder.

## Economic dispatch without losses

Suppose $N$ units supply a total demand $P_D$, and network losses are ignored.

::: theorem Equal incremental cost {#thm-equal-ic}
The dispatch that minimises the total cost $C_T = \sum_iC_i(P_i)$ subject to $\sum_iP_i = P_D$, with convex cost functions and no unit at a limit, is the one in which all units operate at the same incremental cost:
$$
\frac{\mathrm dC_1}{\mathrm dP_1} = \frac{\mathrm dC_2}{\mathrm dP_2} = \cdots = \frac{\mathrm dC_N}{\mathrm dP_N} = \lambda.
$$ {#eq-equal-ic}
With limits, the optimum has $\mathrm{IC}_i = \lambda$ for units between their limits, $\mathrm{IC}_i\le\lambda$ for units at $P_{i,\max}$, and $\mathrm{IC}_i\ge\lambda$ for units at $P_{i,\min}$. The multiplier $\lambda$ is the **system incremental cost** (the **system lambda**): the cost of supplying one more MW of demand.
:::

::: proof
Form the Lagrangian $\mathcal L = \sum_iC_i(P_i) + \lambda\bigl(P_D - \sum_iP_i\bigr)$. At a constrained minimum with no unit at a limit, $\partial\mathcal L/\partial P_i = \mathrm dC_i/\mathrm dP_i - \lambda = 0$ for every $i$, which is [[#eq-equal-ic]]; since the $C_i$ are convex and the constraint linear, this stationary point is the global minimum. Intuitively: if two units had different incremental costs, shifting a small $\Delta P$ from the dearer to the cheaper would reduce the total cost while keeping the total output, so the dispatch could not have been optimal.

With limits, the Karush–Kuhn–Tucker conditions add multipliers $\mu_i^{\pm}\ge0$ for the bounds, giving $\mathrm dC_i/\mathrm dP_i = \lambda - \mu_i^+ + \mu_i^-$, with $\mu_i^+ > 0$ only if $P_i = P_{i,\max}$ and $\mu_i^- > 0$ only if $P_i = P_{i,\min}$. Hence a unit at its maximum has $\mathrm{IC}_i = \lambda - \mu_i^+\le\lambda$ (it is cheap, and would produce more if it could), and a unit at its minimum has $\mathrm{IC}_i\ge\lambda$.
:::

For quadratic costs, equal incremental cost gives each unit's output explicitly in terms of $\lambda$:
$$
P_i = \frac{\lambda - b_i}{2c_i},\qquad \sum_i\frac{\lambda - b_i}{2c_i} = P_D\quad\Longrightarrow\quad\lambda = \frac{P_D + \sum_ib_i/(2c_i)}{\sum_i1/(2c_i)}.
$$ {#eq-lambda}

::: algorithm Lambda iteration {#alg-lambda}
1. Guess $\lambda$ (for example the average of the units' incremental costs at mid-range).
2. For each unit compute $P_i = (\lambda - b_i)/(2c_i)$ and clip it to $[P_{i,\min}, P_{i,\max}]$.
3. If $\sum_iP_i < P_D$, raise $\lambda$; if greater, lower it (bisection on $\lambda$ always converges, since $\sum_iP_i$ is non-decreasing in $\lambda$).
4. Stop when $\abs{\sum_iP_i - P_D}$ is below the tolerance.
:::

::: widget contour
f: 5.3*x + 0.004*x^2 + 5.5*y + 0.006*y^2
x: 0, 650
y: 0, 650
levels: 16
constraint: x + y - 650
point: 300, 350
caption: Level curves of the total variable cost of two units, $x = P_1$ and $y = P_2$ in MW, with the demand constraint $P_1 + P_2 = 650\,\mathrm{MW}$. The figure marks where a level curve touches the constraint line, the point where $\nabla C_T$ is parallel to $\nabla(P_1 + P_2) = (1, 1)$, i.e. $\mathrm{IC}_1 = \mathrm{IC}_2$. Drag the point along the line: the cost is least at $(400, 250)$, where both incremental costs equal $8.5$ per MWh. Elsewhere the gradient has unequal components and a shift of output along the line lowers the cost.
:::

::: example Dispatching three units {#ex-three-units}
Three units have cost functions (in \$/h, $P$ in MW)
$$
C_1 = 500 + 5.3P_1 + 0.004P_1^2,\quad C_2 = 400 + 5.5P_2 + 0.006P_2^2,\quad C_3 = 200 + 5.8P_3 + 0.009P_3^2,
$$
with limits $200\le P_1\le450$, $150\le P_2\le350$, $100\le P_3\le225\,\mathrm{MW}$. Find the economic dispatch for a demand of (a) $800\,\mathrm{MW}$ and (b) $975\,\mathrm{MW}$.
::: solution
The coefficients $1/(2c_i)$ are $125$, $83.33$ and $55.56$, and $b_i/(2c_i)$ are $662.5$, $458.3$ and $322.2$.

(a) From [[#eq-lambda]], $\lambda = (800 + 1443.1)/263.9 = 8.50\,\$/\mathrm{MWh}$, giving $P_1 = (8.5 - 5.3)/0.008 = 400$, $P_2 = (8.5 - 5.5)/0.012 = 250$, $P_3 = (8.5 - 5.8)/0.018 = 150\,\mathrm{MW}$, all within limits. Total cost $6682.5\,\$/\mathrm h$. (Splitting the load equally, $266.7\,\mathrm{MW}$ each, would cost $6877.8\,\$/\mathrm h$, about $3\,\%$ more.)

(b) Without limits, $\lambda = 9.163$ and $P_1 = 482.9\,\mathrm{MW}$, above its maximum. Fix $P_1 = 450$ and dispatch the remaining $525\,\mathrm{MW}$ between units 2 and 3: $\lambda = (525 + 458.3 + 322.2)/(83.33 + 55.56) = 9.40$, so $P_2 = 325$, $P_3 = 200\,\mathrm{MW}$. Check the KKT condition for unit 1: $\mathrm{IC}_1 = 5.3 + 0.008\times450 = 8.9 < 9.40$, so it is correctly held at its maximum. Total cost $8236.3\,\$/\mathrm h$. The system lambda rose from $9.16$ to $9.40$ because the cheapest unit can no longer help.
:::
:::

::: quiz
At the economic dispatch of [[#ex-three-units]](a), demand rises by $1\,\mathrm{MW}$. Approximately how much does the hourly cost rise?
- [ ] $5.3\,\$/\mathrm h$, the cheapest unit's linear coefficient
- [x] $8.5\,\$/\mathrm h$, the system lambda
- [ ] $6682.5/800 = 8.35\,\$/\mathrm h$, the average cost
- [ ] Nothing, because the dispatch is optimal
::: solution
The Lagrange multiplier is the sensitivity of the optimal cost to the constraint: $\mathrm dC_T^*/\mathrm dP_D = \lambda = 8.5\,\$/\mathrm{MWh}$. The marginal cost is higher than the average cost because incremental costs rise with output. In electricity markets, $\lambda$ at each node is the price (the **locational marginal price**).
:::
:::

## Dispatch with transmission losses

Generators far from the load incur larger losses in delivering their power, so an extra MW from them is worth less than an extra MW from a unit near the load. The losses can be expressed approximately as a quadratic function of the generator outputs, the **B-coefficient** (Kron) loss formula,
$$
P_L = \sum_i\sum_jP_iB_{ij}P_j + \sum_iB_{0i}P_i + B_{00},
$$ {#eq-b-loss}
whose coefficients are fitted from power-flow solutions around the typical operating point. The power balance becomes $\sum_iP_i = P_D + P_L$.

::: theorem Coordination equations {#thm-coordination}
Minimising $\sum_iC_i(P_i)$ subject to $\sum_iP_i - P_L(P_1,\dots,P_N) = P_D$ requires, for units between their limits,
$$
\frac{\mathrm dC_i}{\mathrm dP_i}\,L_i = \lambda,\qquad L_i = \frac1{1 - \partial P_L/\partial P_i},
$$ {#eq-coordination}
where $L_i$ is the **penalty factor** of unit $i$ and $\partial P_L/\partial P_i$ its **incremental transmission loss**.
:::

::: proof
With $\mathcal L = \sum_iC_i + \lambda\bigl(P_D + P_L - \sum_iP_i\bigr)$, the stationarity conditions are $\mathrm dC_i/\mathrm dP_i + \lambda(\partial P_L/\partial P_i - 1) = 0$, i.e. $\mathrm dC_i/\mathrm dP_i = \lambda(1 - \partial P_L/\partial P_i)$, which is [[#eq-coordination]].
:::

A unit whose extra output increases losses ($\partial P_L/\partial P_i > 0$, $L_i > 1$) must be run at a *lower* incremental cost than the others: its delivered megawatt is more expensive. For quadratic costs and a diagonal $B$, $\partial P_L/\partial P_i = 2B_{ii}P_i$ and [[#eq-coordination]] gives $P_i = (\lambda - b_i)/(2(c_i + \lambda B_{ii}))$, which is solved by iterating on $\lambda$ as before, now with the losses recomputed at each step.

::: example Dispatch of a remote unit {#ex-losses}
Two units supply $300\,\mathrm{MW}$: $C_1 = 200 + 7P_1 + 0.008P_1^2$ and $C_2 = 180 + 6.3P_2 + 0.009P_2^2$ (\$/h). Unit 1 is remote, unit 2 is at the load, and the losses are $P_L = 0.0005P_1^2\,\mathrm{MW}$. Find the optimal dispatch, the losses and the penalty factors, and compare the cost with the dispatch that ignores losses in choosing the outputs (equal incremental costs) but still supplies them.
::: solution
With $B_{11} = 0.0005$, $B_{22} = 0$: $P_1 = (\lambda - 7)/(2(0.008 + 0.0005\lambda))$, $P_2 = (\lambda - 6.3)/0.018$. Iterating on $\lambda$ until $P_1 + P_2 - 0.0005P_1^2 = 300$ gives $\lambda = 9.834\,\$/\mathrm{MWh}$, $P_1 = 109.7\,\mathrm{MW}$, $P_2 = 196.3\,\mathrm{MW}$, $P_L = 6.02\,\mathrm{MW}$. Penalty factors: $L_1 = 1/(1 - 2\times0.0005\times109.7) = 1.123$, $L_2 = 1$. Check: $\mathrm{IC}_1L_1 = (7 + 0.016\times109.7)\times1.123 = 8.755\times1.123 = 9.834 = \mathrm{IC}_2$. Cost: $2827.8\,\$/\mathrm h$.

Ignoring the losses in the dispatch rule (equal incremental costs, scaled up until the delivered power is $300\,\mathrm{MW}$) gives $P_1 = 143.7$, $P_2 = 166.6\,\mathrm{MW}$, losses $10.3\,\mathrm{MW}$ and a cost of $2850.7\,\$/\mathrm h$: $\$22.9$ per hour, $0.8\,\%$, more. Running the remote unit less and the local one more saves more in losses than it costs in fuel.
:::
:::

::: application Unit commitment
Economic dispatch assumes we know which units are running. Deciding which units to start and stop over the next day or week is the **unit commitment** problem. Units have start-up costs (a cold coal unit may cost tens of thousands of dollars and many hours to start), minimum up and down times, ramp-rate limits, and the system needs **spinning reserve** (unloaded capacity on running units, at least the largest single unit) to cover a sudden loss of generation. Unit commitment is a mixed-integer optimisation; it was once solved by priority lists, dynamic programming and Lagrangian relaxation, and is now solved by mixed-integer linear programming in every major electricity market, with economic dispatch (and a DC power-flow model of the network, [[power-systems/power-flow]]) embedded in it.
:::

## Frequency control

Economic dispatch decides the planned outputs. In real time, demand deviates from the plan, and the frequency tells us by how much.

### Governor droop

If every generator held its speed exactly constant (**isochronous** control), they would fight each other over who takes a load change. Instead each governor is given a **droop** characteristic: the output rises as frequency falls.

::: definition Speed droop {#def-droop}
A governor with **droop** (speed regulation) $R$ changes the unit's mechanical power in steady state according to
$$
\Delta P_m = \Delta P_{\text{ref}} - \frac{\Delta f}{R},
$$ {#eq-droop}
with $\Delta f$ in per unit of rated frequency and $\Delta P_m$ in per unit of the unit's rating. A droop of $R = 0.05$ ($5\,\%$, typical) means that a $5\,\%$ fall in frequency moves the unit from no load to full load. $\Delta P_{\text{ref}}$ is the **load reference** (set point), adjusted by AGC.
:::

Loads also respond to frequency: motor loads draw less power at lower speed. This **load damping** is expressed as $\Delta P_{\text{load}} = \Delta P_L + D\,\Delta f$, where $\Delta P_L$ is the frequency-independent change in demand and $D$ is typically $1$ to $2$ (percent change in load per percent change in frequency).

::: theorem Steady-state frequency deviation {#thm-frequency-deviation}
In an isolated system with $N$ governed units of droops $R_i$ (each on the system base) and load damping $D$, a step change $\Delta P_L$ in demand with fixed set points produces the steady-state frequency deviation
$$
\Delta f_{ss} = -\frac{\Delta P_L}{\beta},\qquad \beta = \sum_i\frac1{R_i} + D,
$$ {#eq-df-ss}
where $\beta$ is the **frequency response characteristic** (in pu MW per pu Hz). Unit $i$ picks up $\Delta P_{mi} = -\Delta f_{ss}/R_i$, i.e. in inverse proportion to its droop.
:::

::: proof
In steady state the frequency is constant, so by the swing equation of [[power-systems/power-system-stability]] (summed over all machines) total mechanical power equals total electrical load: $\sum_i\Delta P_{mi} = \Delta P_L + D\Delta f$. With fixed set points, [[#eq-droop]] gives $\Delta P_{mi} = -\Delta f/R_i$. Substituting, $-\Delta f\sum_i1/R_i = \Delta P_L + D\Delta f$, so $\Delta f = -\Delta P_L/(\sum_i1/R_i + D)$.
:::

A unit's droop on its own rating must be converted to the system base: $R_{i,\text{sys}} = R_i\,S_b/S_i$. Units with the same percentage droop then share a load change in proportion to their ratings, which is why a common droop setting is used.

### The dynamics of a control area

Summing the swing equations of all machines in an area, and expressing the rate of change of speed as frequency, gives the area's frequency dynamics:
$$
2H\frac{\mathrm d\Delta f}{\mathrm dt} = \sum_i\Delta P_{mi} - \Delta P_L - D\Delta f,
$$ {#eq-area-dynamics}
with $H$ the total inertia constant on the system base. Immediately after a sudden loss of generation or increase of load $\Delta P_L$, before governors respond, the **rate of change of frequency** (RoCoF) is $-\Delta P_L/(2H)$ per unit per second. Governors and turbines respond within seconds (steam turbines with time constants of a fraction of a second to several seconds through their reheaters, hydro turbines more slowly and initially in the wrong direction), so frequency falls to a minimum, the **nadir**, before recovering to the droop-determined $\Delta f_{ss}$.

::: widget plot
f: -50*dP/(1/R + D)*(1 - exp(-(1/R + D)*x/(2*H))); -50*dP*x/(2*H)
x: 0, 5
y: -0.6, 0
sliders: dP=0.05:0.01:0.1:0.005; R=0.05:0.03:0.1:0.005; H=5:1:9:0.5; D=1:0:2:0.1
labels: \Delta f(t)\ \text{(Hz)}; \text{initial slope (RoCoF)}
caption: Frequency deviation in Hz of a $50\,\mathrm{Hz}$ system after losing generation $\mathrm{dP}$ (pu of system load), with total inertia $H$ (s), droop $R$ and load damping $D$, in the idealised case where governors respond instantly. The settled deviation is $-50\,\mathrm{dP}/(1/R + D)$ and the initial slope is $-50\,\mathrm{dP}/(2H)$. Halve $H$, as happens when synchronous generators are displaced by inverter-based plant: the settled value is unchanged but frequency falls twice as fast. Real turbines respond with lags of seconds, so the actual curve dips below the settled value (the nadir) before recovering.
:::

::: example Losing a large unit {#ex-loss-of-unit}
A $50\,\mathrm{Hz}$ system serves $20\,\mathrm{GW}$ of load. All generators have $5\,\%$ droop (on a system base of $20\,\mathrm{GW}$, assuming the online capacity equals the load), the total inertia is $H = 5\,\mathrm s$ on that base, and $D = 1$. A $1\,\mathrm{GW}$ unit trips. Find the initial rate of change of frequency, the steady-state frequency before AGC acts, and the time constant of the idealised response.
::: solution
$\Delta P_L = 1/20 = 0.05\,\mathrm{pu}$ (a loss of generation acts like an increase of load). RoCoF $= -0.05/(2\times5) = -0.005\,\mathrm{pu/s} = -0.25\,\mathrm{Hz/s}$. $\beta = 1/0.05 + 1 = 21$, so $\Delta f_{ss} = -0.05/21 = -0.00238\,\mathrm{pu} = -0.119\,\mathrm{Hz}$; the frequency settles at $49.88\,\mathrm{Hz}$. The remaining generators pick up $0.00238/0.05 = 0.0476\,\mathrm{pu} = 952\,\mathrm{MW}$, and the load drops by $D\times0.00238 = 48\,\mathrm{MW}$, which together make up the lost $1000\,\mathrm{MW}$. With instantaneous governors, [[#eq-area-dynamics]] is first order with time constant $2H/\beta = 0.48\,\mathrm s$; real turbine lags make the nadir deeper, perhaps $-0.3$ to $-0.5\,\mathrm{Hz}$, which is why grid codes specify how fast reserves must respond.
:::
:::

::: warning Signs and bases in frequency control
A loss of generation is a *positive* $\Delta P_L$ in [[#eq-df-ss]]. Droops are quoted in percent on each unit's own rating; before adding $1/R_i$ terms, convert them to a common base. Also distinguish the frequency response characteristic $\beta$ (pu MW/pu Hz, or MW/Hz when multiplied by $S_b/f_0$) from the droop $R$ (its units are the inverse). Mixing pu and Hz is the commonest error: $\Delta f$ in hertz is $f_0$ times the per-unit value.
:::

### Interconnected areas and AGC

A large interconnection consists of several **control areas**, each responsible for balancing its own load, joined by tie lines. After a disturbance, all areas share the same steady frequency, and primary (droop) response from every area helps, so power flows over the ties from the healthy areas into the one that caused the problem.

::: theorem Two-area steady-state response {#thm-two-area}
Two areas with frequency response characteristics $\beta_1$ and $\beta_2$ (MW/Hz) are connected by a tie line. A load increase $\Delta P_{L2}$ in area 2, with set points fixed, produces
$$
\Delta f = -\frac{\Delta P_{L2}}{\beta_1 + \beta_2},\qquad \Delta P_{12} = \frac{\beta_1}{\beta_1 + \beta_2}\Delta P_{L2},
$$ {#eq-two-area}
where $\Delta P_{12}$ is the change in tie-line flow from area 1 to area 2.
:::

::: proof
In steady state both areas have the same $\Delta f$. Area 1's generation rises by $-\beta_1\Delta f$ (droop plus load damping) and all of it is exported: $\Delta P_{12} = -\beta_1\Delta f$. Area 2's response is $-\beta_2\Delta f$, and its balance is $-\beta_2\Delta f + \Delta P_{12} = \Delta P_{L2}$. Adding, $-(\beta_1 + \beta_2)\Delta f = \Delta P_{L2}$, which gives both results.
:::

Primary control stabilises the frequency but leaves it low and the tie flows off schedule. **Automatic generation control** (secondary control) corrects both. Each area computes its **area control error**
$$
\mathrm{ACE}_i = \Delta P_{\text{tie},i} + B_i\Delta f,
$$ {#eq-ace}
where $\Delta P_{\text{tie},i}$ is the net export above schedule and $B_i$, the **frequency bias**, is set close to $\beta_i$. AGC adjusts the set points $\Delta P_{\text{ref}}$ of the area's units by integral control, $\Delta P_{\text{ref}} = -K_I\int\mathrm{ACE}\,\mathrm dt$, allocating the change among units by their economic participation factors. In steady state an integrator forces its input to zero, so $\mathrm{ACE}_i = 0$ in every area, which (for the two-area case, with $B_i = \beta_i$) means $\Delta f = 0$ and $\Delta P_{\text{tie}} = 0$: each area ends up covering its own load change.

::: example Two areas and the area control error {#ex-two-area}
Area 1 ($20\,\mathrm{GW}$) and area 2 ($10\,\mathrm{GW}$), both at $50\,\mathrm{Hz}$ with $5\,\%$ droop and $D = 1$ on their own load base, are interconnected. Area 2's load rises by $500\,\mathrm{MW}$. Find the steady-state frequency deviation and tie-flow change before AGC acts, and each area's ACE (with $B_i = \beta_i$).
::: solution
$\beta_i$ in MW/Hz: $(1/0.05 + 1)\times S_i/f_0$, so $\beta_1 = 21\times20\,000/50 = 8400\,\mathrm{MW/Hz}$ and $\beta_2 = 4200\,\mathrm{MW/Hz}$. By [[#eq-two-area]], $\Delta f = -500/12\,600 = -0.0397\,\mathrm{Hz}$ and $\Delta P_{12} = 8400\times0.0397 = 333\,\mathrm{MW}$: two thirds of the extra load is supplied, for now, by area 1. ACE: area 1 exports $333\,\mathrm{MW}$ above schedule, so $\mathrm{ACE}_1 = 333 + 8400\times(-0.0397) = 0$; area 2 imports $333\,\mathrm{MW}$, so $\mathrm{ACE}_2 = -333 + 4200\times(-0.0397) = -500\,\mathrm{MW}$. Only area 2's AGC acts, raising its generation by $500\,\mathrm{MW}$, after which frequency and tie flow return to schedule and area 1's units return to their economic set points. This **non-interaction** is the point of tie-line bias control.
:::
:::

::: history
Economic dispatch by equal incremental cost was practised from the 1930s, with "slide-rule" methods and, from the 1950s, analogue computers that solved the coordination equations. E. E. George published a loss formula in 1943, and Gabriel Kron and later Leon K. Kirchmayer (whose books *Economic Operation of Power Systems*, 1958, and *Economic Control of Interconnected Systems*, 1959, became standards) developed the B-coefficient method. Tie-line bias control was developed in North America from the 1930s onwards, notably by Nathan Cohn of Leeds & Northrup, who set out its theory in his 1966 book *Control of Generation and Power Flow on Interconnected Systems*. Digital AGC replaced analogue control from the 1960s, and since the 1990s market-clearing engines have taken over economic dispatch and unit commitment in liberalised electricity systems.
:::

## Where this leads

The DC power flow of [[power-systems/power-flow]] combined with economic dispatch gives the **DC optimal power flow** used to clear electricity markets and price congestion, and the full AC optimal power flow adds voltages and reactive power. Frequency stability after large disturbances depends on the inertia and reserves discussed here; as synchronous machines are displaced by inverter-based wind and solar, system inertia falls and **fast frequency response** from batteries and converters becomes necessary, one of the smart-grid themes of [[power-systems/protection-smart-grid]]. The control loops here are classic integral control; their dynamics, with turbine and governor lags, are analysed with the methods of [[control-systems]].

::: summary
- Thermal unit costs are convex, $C_i = a_i + b_iP_i + c_iP_i^2$; the incremental cost $\mathrm dC_i/\mathrm dP_i$ is what matters for dispatch.
- Lossless economic dispatch equalises incremental costs at the system lambda $\lambda$; units at limits satisfy the KKT inequalities; $\lambda$ is the marginal cost of demand.
- With losses, $\mathrm{IC}_i\,L_i = \lambda$ with penalty factor $L_i = 1/(1 - \partial P_L/\partial P_i)$: remote units are run less.
- Governor droop $R$ (typically $5\,\%$) shares load changes; the steady frequency deviation is $\Delta f = -\Delta P_L/(\sum1/R_i + D)$, and the initial RoCoF is $-\Delta P_L/(2H)$.
- Interconnected areas share primary response; AGC drives the area control error $\Delta P_{\text{tie}} + B\Delta f$ to zero by integral control, restoring frequency and tie schedules and implementing economic dispatch.
:::

## Exercises

::: exercise System lambda {level=1 check="(500+5/(2*0.005)+6/(2*0.01))/(1/(2*0.005)+1/(2*0.01))"}
Two units have $C_1 = 5P_1 + 0.005P_1^2$ and $C_2 = 6P_2 + 0.01P_2^2$ (\$/h). Find $\lambda$ in \$/MWh for a demand of $500\,\mathrm{MW}$, ignoring limits and losses.
::: solution
$1/(2c_i) = 100$ and $50$; $b_i/(2c_i) = 500$ and $300$. $\lambda = (500 + 800)/150 = 8.667\,\$/\mathrm{MWh}$, with $P_1 = 366.7$ and $P_2 = 133.3\,\mathrm{MW}$.
:::
:::

::: exercise Droop sharing {level=1 check="300*(1/0.04)/(1/0.04+1/0.05)"}
Two equal-sized units with droops of $4\,\%$ and $5\,\%$ (on the same base) share a load increase of $300\,\mathrm{MW}$, load damping neglected. How many MW does the $4\,\%$ unit pick up?
::: solution
Shares are proportional to $1/R$: $25$ and $20$. The $4\,\%$ unit takes $300\times25/45 = 166.7\,\mathrm{MW}$ and the other $133.3\,\mathrm{MW}$.
:::
:::

::: exercise Rate of change of frequency {level=1 check="-0.02*60/(2*4)"}
A $60\,\mathrm{Hz}$ system with $H = 4\,\mathrm s$ loses generation equal to $2\,\%$ of its load. Find the initial RoCoF in Hz/s.
::: solution
RoCoF $= -\Delta P/(2H)\times f_0 = -0.02/8\times60 = -0.15\,\mathrm{Hz/s}$.
:::
:::

::: exercise Penalty factor {level=2 check="1/(1-2*0.0002*250)"}
A unit's incremental transmission loss is $\partial P_L/\partial P_1 = 2B_{11}P_1$ with $B_{11} = 0.0002\,\mathrm{MW^{-1}}$. Find its penalty factor at $P_1 = 250\,\mathrm{MW}$, and its required incremental cost when $\lambda = 10\,\$/\mathrm{MWh}$.
::: solution
$\partial P_L/\partial P_1 = 0.1$, $L_1 = 1/0.9 = 1.111$, so $\mathrm{IC}_1 = \lambda/L_1 = 9.0\,\$/\mathrm{MWh}$.
:::
:::

::: exercise A unit at its minimum {level=2 check="5.5+0.012*300"}
Units 2 and 3 of [[#ex-three-units]] alone must supply $400\,\mathrm{MW}$, and unit 3 is forced to run at its minimum of $100\,\mathrm{MW}$ for voltage support. Find $\lambda$ (the incremental cost of unit 2) in \$/MWh.
::: solution
Unit 2 supplies $300\,\mathrm{MW}$, so $\lambda = \mathrm{IC}_2 = 5.5 + 0.012\times300 = 9.10\,\$/\mathrm{MWh}$. Unit 3's incremental cost is $5.8 + 0.018\times100 = 7.6 < 9.10$; with a free choice it would run more, so the constraint costs money.
:::
:::

::: exercise Frequency after a load step {level=2 check="-50*0.03/(0.5/0.05+0.5/0.04+1.5)"}
A $50\,\mathrm{Hz}$ system has half its capacity on $5\,\%$-droop units and half on $4\,\%$-droop units (droops on their own bases, each half rated at half the system base), and $D = 1.5$. Find the steady frequency deviation in Hz after a $3\,\%$ load increase.
::: solution
On the system base, $\sum1/R_i = 0.5/0.05 + 0.5/0.04 = 10 + 12.5 = 22.5$; $\beta = 24$. $\Delta f = -0.03/24 = -0.00125\,\mathrm{pu} = -0.0625\,\mathrm{Hz}$.
:::
:::

::: exercise Tie-line flow after an outage {level=2 check="6000*800/(6000+3000)"}
Two areas with $\beta_1 = 6000\,\mathrm{MW/Hz}$ and $\beta_2 = 3000\,\mathrm{MW/Hz}$ are connected. An $800\,\mathrm{MW}$ unit trips in area 2. Find the change in tie flow from area 1 to area 2 in MW before AGC acts.
::: solution
$\Delta P_{12} = 800\times6000/9000 = 533\,\mathrm{MW}$, with $\Delta f = -800/9000 = -0.089\,\mathrm{Hz}$.
:::
:::

::: exercise Optimality of equal incremental cost for two units {level=3}
For two units with costs $C_i = a_i + b_iP_i + c_iP_i^2$ and $P_1 + P_2 = P_D$, substitute $P_2 = P_D - P_1$ and minimise directly. Show that the optimum satisfies $\mathrm{IC}_1 = \mathrm{IC}_2$, and that the extra cost of a dispatch deviating by $\Delta$ from the optimum is $(c_1 + c_2)\Delta^2$.
::: solution
$C_T(P_1) = C_1(P_1) + C_2(P_D - P_1)$. $\mathrm dC_T/\mathrm dP_1 = \mathrm{IC}_1 - \mathrm{IC}_2 = 0$ at the optimum $P_1^*$. Since $C_T$ is quadratic with second derivative $2c_1 + 2c_2$, $C_T(P_1^* + \Delta) = C_T(P_1^*) + (c_1 + c_2)\Delta^2$ exactly. For units 1 and 2 of [[#ex-three-units]], a $50\,\mathrm{MW}$ error costs $0.010\times2500 = 25\,\$/\mathrm h$: the cost surface is flat near the optimum, so modest errors cost little, but they accumulate over a year ($219\,000\,\$$).
:::
:::

::: exercise Designing an AGC frequency bias {level=3}
In the two-area system of [[#ex-two-area]], area 1 sets its bias wrongly to $B_1 = 0.5\beta_1$. Find $\mathrm{ACE}_1$ immediately after primary control settles following the $500\,\mathrm{MW}$ load step in area 2, and explain what area 1's AGC will do and why it is undesirable.
::: hint
Use the $\Delta f$ and $\Delta P_{12}$ of [[#ex-two-area]].
:::
::: solution
$\mathrm{ACE}_1 = 333 + 4200\times(-0.0397) = 333 - 167 = +167\,\mathrm{MW}$. A positive ACE means "over-generating", so area 1's AGC will *reduce* its generation, withdrawing primary support while frequency is still low and making area 2 recover alone with a deeper and longer frequency deviation. Eventually, when area 2's AGC has restored the balance, $\Delta f = 0$ and $\Delta P_{12} = 0$ and both ACEs are zero again, so the final state is correct, but the transient interaction is worse. Setting $B_i$ close to $\beta_i$ (in practice slightly above it) makes each area respond only to its own disturbances.
:::
:::
