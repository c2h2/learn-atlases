By now you can solve resistive, first-order and second-order networks by hand, and for single-element or two-element cases that is the right tool. A network with ten elements, a non-linear element, a switch that moves in time, or a tolerance on every part, is far too large to carry in your head, and the answer is not to derive it but to let a machine integrate it. Circuit simulation is the art of getting a correct numerical answer from the same equations you derived by hand, and it is, as the name suggests, the computation of the behaviour of the network. This lesson explains what a simulator actually does, the matrix it forms, the time integrator it uses, and the numerical mistakes, convergence errors, and artifacts that a wrong assumption on any of those three will produce, and gives you the discipline to check a simulated result against a hand one and to know when the number is the physics and when it is the method.

## What a simulator does, and does not

It is worth being precise about the division of labour, because it decides what you are responsible for and what the machine is.

::: definition Circuit simulation {#def-sim}
**Circuit simulation** is the numerical computation of the voltages and currents of a described network, as a function of time or frequency, by solving the network's own equations. It does not replace the network's laws, it computes them. The simulator takes a description of the network, forms the governing equations, and solves them with a numerical method of its own, and the quality of the answer is set by the description, the equations, and the method, not by the skill of anyone else.
:::

The description of the network, a list of the elements and their connections, is the **netlist**, and it is the one thing you supply. Everything else, the matrix, the integrator, the bookkeeping, is the simulator's, and it is there to free you from the algebra, not to free you from the physics. The single most important habit in simulation, and the one this lesson drills, is to check the simulated result against a hand computation of a reduced version of the same network, because a simulator that runs without erroring can still give a wrong answer, if the netlist is wrong, the step size is wrong, or a convergence error has crept in silently.

::: warning A wrong netlist does not error, it just answers {#warn-netlist}
Most simulated results that turn out to be wrong are wrong because the netlist is wrong, a node number repeated, a value off by a factor of ten, a missing element, and the simulator, which does not know what the answer should be, happily reports the result of the network you actually described, which is not the one you meant. This is the simulation analogue of the hand-analysis sign error, except that it is far easier to miss, because the number looks plausible and the machine gave it to you. The only defence is the hand check on a reduced subnetwork, and it is cheap, so do it.
:::

## The matrix: modified nodal analysis

The equation that a simulator builds is the same one you could build by hand, and knowing its shape is the single best preparation for debugging a simulation.

::: definition Modified nodal analysis {#def-mna}
**Modified nodal analysis** (MNA) augments nodal analysis with an explicit equation for each element whose current is not a function of voltage alone, a capacitor, an inductor, an op-amp, a current source, by adding a current variable for that element. The result is one matrix equation in the combined vector of node voltages and the selected branch currents, and the matrix, the **stamp** of each element, is added one at a time to a growing system. This is the standard form of the DC, and the per-step AC and transient, equations that every general-purpose simulator solves.
:::

::: theorem From netlist to matrix {#thm-mna}
A simulator reads the netlist, stamps each element into a matrix at its own nodes and current variables, assembles the full system, and solves it. For a DC operating point it solves a single linear system. For a transient it solves the same, with the integrator replacing the element impedances by their time-stepped forms, at every step, advancing the state from one time to the next. The number of simultaneous equations is the number of unknowns, the node voltages plus the added currents, and the matrix is the same for every element type, differing only in the stamp.
:::

The reason this matters to you is that the shape of the matrix is what you will be looking at, or the symptoms of its ill-conditioning, whenever a simulation does not converge. A netlist with a short across a capacitor, an inductor in parallel with a current source, or a loop of pure inductors, produces a singular or nearly singular matrix, and the simulator either fails to converge or converges to a wrong result, and the matrix is where the failure lives. Knowing that the matrix is built one stamp at a time, and that a problematic element makes its own stamp the problem, is what lets you find the culprit by turning elements off, one at a time, until the matrix converges, which is the standard debugging procedure.

::: example A netlist and its DC solution {#ex-mna}
Describe a network of a $10\ \mathrm V)$ voltage source in series with a $10\ \mathrm{k\Omega}$ resistor, feeding a node that also drives a $1\ \mathrm{mA}$ current source to ground, and give the node voltage by a hand MNA.
::: solution
Label the node as node 1, and ground as 0. The resistor from the source to node 1 carries $(10 - v_1)/10\ \mathrm{k}$, and the current source takes $1\ \mathrm{mA}$ out of node 1. Kirchhoff's current law at node 1 is

$$
\frac{10 - v_1}{10\ \mathrm{k}\Omega} = 1\ \mathrm{mA},
$$

so $10 - v_1 = 10\ \mathrm V}$ and $v_1 = 0\ \mathrm V)$. This is the DC operating point, and a simulator solving the same MNA for this netlist gives the same $0\ \mathrm V)$. The point of the example is not the arithmetic but the correspondence: the hand equation and the matrix equation are the same equation, one written by you at one node, one stamped by the simulator into a matrix, and agreeing is the sign that both the netlist and the method are right.
:::
:::

## The time integrator

A transient is a system of first-order differential equations, and a simulator advances it one step at a time by replacing the derivative with a formula, the time integrator. The choice of this formula is the single biggest determinant of the accuracy of the transient result, and it is the one place a correct netlist can still give a wrong answer.

::: proposition Explicit versus implicit, and the two standard methods {#prop-int}
The **explicit Euler** method, $x_{n+1} = x_n + h\,f(x_n)$, is first order, unconditionally simple, but inaccurate and only conditionally stable for the step size $h$. The **trapezoidal** method, $x_{n+1} = x_n + \frac{h}{2}\left(f(x_n)+f(x_{n+1})\right)$, is second order and unconditionally stable for the linear problems that dominate circuit analysis, at the cost of solving a small implicit system at each step. A simulator defaults to one of these, or allows you to choose, and the difference in accuracy, for the same number of steps, is large.
:::

::: example Euler versus trapezoidal on an RC step {#ex-int}
An $RC$ network with $R=10\ \mathrm{k\Omega}$, $C=1\ \mu\mathrm F)$, $\tau=10\ \mathrm{ms}$, driven by a $10\ \mathrm V)$ step, is integrated from $0$ to $20\ \mathrm{ms}$ with $100$ steps of $0.2\ \mathrm{ms}$. Compare the explicit Euler result with the trapezoidal one, against the exact $10(1-e^{-t/\tau})$.
::: solution
The exact value at $20\ \mathrm{ms}$ is $10(1-e^{-2}) = 8.647\ \mathrm V)$. The explicit Euler, advancing $v_{n+1}=v_n + (h/C)(10-v_n)/R$, gives $8.674\ \mathrm V)$, a $0.31\%$ error. The implicit trapezoidal, solving $v_{n+1} = \dfrac{v_n(1-h) + h\cdot10}{1+h}$ with $h=1/(RC)\cdot h\cdot\dfrac{1}{2}=0.01$, gives $8.647\ \mathrm V)$, a $0.001\%$ error. The trapezoidal, at the same number of steps, is three orders of magnitude more accurate, and this is the practical reason a simulator defaults to an implicit method and why the explicit Euler, though faster, is the one to suspect first when a transient looks a little too damped or too fast.
:::
:::

::: widget plot
f: 10*(1-exp(-x))
x: 0 20
y: 0 10
sliders:
caption: The exact response of the $RC$ network, $v(t)=10(1-e^{-t/\tau})$ with $\tau=10\ \mathrm{ms}$ and $t$ in milliseconds. The exponential is the ground truth against which the time integrators are compared. A poorly chosen step size, or an explicit Euler at a large step, will overshoot or lag this curve, and the gap between the simulation and this curve is the integration error, which you control by choosing the step size and the method.
:::

## Stiffness, step size, and convergence

The integrator is not free of constraint. The step size must be chosen with respect to the fastest time constant in the network, and if it is not, the result is wrong even if every element and value is right.

::: proposition Step size relative to the fastest time constant {#prop-step}
The explicit integrators are stable only for a step size below a bound set by the smallest time constant in the network, and the implicit integrators, though unconditionally stable, are accurate only for a step size small relative to it. A useful working rule is to keep the step size at most one fiftieth to one hundredth of the smallest time constant you care about, and to let the simulator's adaptive step control shrink the step wherever the response changes quickly. Ignoring this, by using a fixed step that is too large for the network's fastest mode, gives a result that is stable-looking but inaccurate, the simulation analogue of an alias.
:::

A further source of error is the convergence of the non-linear solve at each step, which a device with a diode or a transistor requires, because the element's operating point is itself unknown. The simulator solves a non-linear equation at each step, and if the initial guess is poor the iteration can wander, oscillate, or settle at a wrong root. The standard remedies, a better initial guess, a smaller step, a different non-linear method, and a check of the operating point against a hand computation, are all available to you, and the one you reach for first should be the operating point, because a wrong DC operating point is the most likely cause of a transient that looks wrong.

::: example Step size from a time constant {#ex-step}
A network's fastest time constant is $10\ \mu\mathrm s)$. What step size, at one fiftieth, would a working rule suggest for an explicit method?
::: solution
At one fiftieth of $10\ \mu\mathrm s)$ the step size is $10\ \mu\mathrm s)/50 = 0.2\ \mu\mathrm s)$. At one hundredth it is $0.1\ \mu\mathrm s)$. The rule is a bound on the step from below, and it is the single number to check before you trust a transient, because a step that is too large for the fastest mode will make even a perfect netlist give a result that is only approximately right.
:::
:::

::: warning Stiffness and the wrong integrator {#warn-stiff}
A network with two very different time constants, say a fast $1\ \mathrm nH)$ inductor and a slow $10\ \mathrm s)$ capacitor, is **stiff**, and the explicit integrators are unstable unless the step is tiny, set by the fast constant, which makes the run take a number of steps proportional to the ratio of the two time constants, a number that can be a billion or more. The implicit integrators handle stiffness at the same cost as non-stiff, and this is the practical reason a general-purpose simulator uses an implicit method by default. If a stiff network runs slowly, or runs but gives a noisy result, the stiffness is the cause, and the fix is the implicit method, not a smaller step.
:::

## Monte Carlo and sensitivity

A design that works in the ideal but fails for a real part is where simulation earns its keep, because the variation of the parts is itself a circuit to be solved.

::: definition Monte Carlo and sensitivity {#def-mc}
A **Monte Carlo** analysis solves the network many times, each time with the part values drawn from their distributions of tolerance, and reports the statistics, the mean, the standard deviation, the extremes, of the output. A **sensitivity** analysis reports, for each part, the partial derivative of the output with respect to that part, the amount by which the output changes per change in the part, at the nominal value. The two are complementary, and together they tell you which parts matter and how the design should be robustified.
:::

::: example Tolerance on a divider {#ex-mc}
A $10\ \mathrm V)$ divider, $R_1 = 1\ \mathrm{k\Omega}$ and $R_2 = 1\ \mathrm{k\Omega}$, is driven, and the output is $v = 10\,R_2/(R_1+R_2)$. If $R_2$ is a part with a $\pm 5\%$ tolerance, what is the range of the output?
::: solution
The output is a function of $R_2$, increasing in it. At the extremes, $R_2 = 0.95\ \mathrm{k\Omega}$ gives $v = 10\times0.95/(1+0.95) = 4.87\ \mathrm V)$, and $R_2 = 1.05\ \mathrm{k\Omega}$ gives $v = 10\times1.05/(1+1.05) = 5.12\ \mathrm V)$. So a $\pm 5\%$ part tolerance produces an output in the range $4.87$ to $5.12\ \mathrm V)$, a variation of about $\pm 2.4\%$ on a $5\ \mathrm V)$ nominal. This is the design consequence you cannot see in a single ideal simulation, and it is why the tolerance analysis is part of the design, not a separate add-on. The Monte Carlo, with the parts drawn from their true distributions, gives the same range, and the probability that the output is within any band, which is the number a specification actually asks for.
:::
:::

::: quiz
A simulator gives a transient that is slightly more damped than your hand computation. The netlist checks out. What is the most likely cause, and what is the first thing to try?
- [x] The step size is too large for the network's fastest mode, or the integrator is inaccurate, so try a smaller step or an implicit method
- [ ] The power supply value is wrong
- [ ] The resistor values are in the wrong order
- [ ] It is a hardware fault in the simulator
::: solution
A result that is stable-looking but slightly off, with a correct netlist, is the signature of a too-large step size or an inaccurate integrator, and the first thing to try is a smaller step, or a switch to the implicit, higher-order method. The other options, a source value, a resistor value, a hardware fault, are all possible but less likely given that the netlist checks out and the result is only slightly off, not wrong by a factor.
:::
:::

## Where this leads

With the matrix, the integrator, the step-size rule and the tolerance analysis in hand, you now know what a simulator is doing, and you are equipped to trust a result, to find a wrong one, and to fix the netlist, the step size, or the operating point, according to the symptom. These are the same tools, in a richer form, in the frequency-domain analysis and the converter design of the later courses, and the discipline of checking a hand result against the simulation, and of knowing which part of the answer is the network and which part is the method, is the single most transferable skill in the course. In [[circuits-1/second-order-circuits]] you already met the response that the simulation is here to compute, and in the later electronics courses you will meet the non-linear and the mixed-signal nets that push the same MNA to its limits.

::: history
The practice of numerical circuit analysis, and the specific matrix form known as modified nodal analysis, emerged in the 1950s and 1960s as the circuit simulator, in its modern form, took shape. The name **SPICE**, the Simulation Program with Integration Circuits, was given to the first general-purpose simulator, developed in the 1960s and 1970s, and its descendants, the various commercial and open-source simulators, are the workhorses of electronic design today. The time integrators, the explicit and the implicit methods, and the treatment of stiffness, are the numerical-ordinary-differential-equations content of the solver, and the Monte Carlo and the sensitivity analysis are the statistical additions of the design flow. Continue in the later courses to meet the same tools, in the frequency domain and in the converter design, where the matrix you have just learned to read is the object of the design.
:::

::: summary
- Circuit simulation computes the network's own equations numerically. The netlist, the matrix, and the integrator, are the three things that must be right, and checking the hand result against the simulation is the discipline that keeps them so.
- MNA augments nodal analysis with current variables for the non-voltage-driven elements, and the simulator stamps each element into a matrix and solves the result, at the DC point and at every transient step.
- The time integrator, explicit Euler or implicit trapezoidal, sets the accuracy of the transient, and the trapezoidal, at the same number of steps, is far more accurate for the linear problems of circuit analysis.
- The step size must be small relative to the smallest time constant, and an implicit, or adaptive, integrator is required for the stiff networks that have widely separated time constants.
- A wrong netlist, a missing element, a value off by a factor of ten, does not error, it gives a wrong answer, and the only defence is the hand check on a reduced subnetwork.
- Monte Carlo and sensitivity turn the tolerance of the parts into the tolerance of the output, which is a design number, not an afterthought.
:::

## Exercises

::: exercise Netlist to a single node {level=1 check="5"}
A $1\ \mathrm mA}$ current source feeds a node that is connected to ground through $5\ \mathrm{k\Omega}$. What is the DC voltage of the node?
::: solution
$v = iR = 1\ \mathrm{mA}\times5\ \mathrm{k\Omega} = 5\ \mathrm V)$, by KCL and Ohm's law. The same is the result of a single-node MNA.
:::
:::

::: exercise Two resistors, one node {level=1 check="6.67"}
A $10\ \mathrm V)$ source drives a node through $10\ \mathrm{k\Omega}$, and the node is grounded through $20\ \mathrm{k\Omega}$. What is the node voltage?
::: solution
This is a divider: $v = 10\times20/(10+20) = 6.67\ \mathrm V)$, and it is the DC operating point that an MNA would solve.
:::
:::

::: exercise Explicit Euler on a first-order step {level=2}
A first-order system, $x' = (10 - x)/\tau$ with $\tau = 1$, is stepped from $0$ to a target of $10$ and integrated with explicit Euler for one step of size $h = 0.1$. What is the result, and the exact value after $0.1$?
::: hint
Euler: $x_1 = x_0 + h(10 - x_0)$; exact: $x = 10(1 - e^{-h})$.
:::
::: solution
Euler gives $x_1 = 0 + 0.1\times(10-0) = 1.0$. The exact is $10(1-e^{-0.1}) = 10\times0.0952 = 0.952$. The Euler over-shoots the exact by about $5\%$ in one step, the first-order error, which accumulates over the run. This is the practical reason the explicit method is the one to suspect for a slightly-off transient.
:::
:::

::: exercise Trapezoidal on the same step {level=2 check="0.952"}
Use the implicit trapezoidal on the same system, $\tau=1$, one step of $0.1$. What is the result, and how does it compare to the Euler?
::: hint
Solve $x_1 = (x_0 + h\cdot 10/(2\tau)) / (1 + h/(2\tau))$ from the trapezoidal form.
:::
::: solution
With $h/(2\tau) = 0.05$, the trapezoidal gives $x_1 = (0 + 0.05\times10)/(1+0.05) = 0.5/1.05 = 0.476$. The exact is $0.952$. Hmm, this is the response of $x'=(10-x)$; re-deriving, the trapezoidal for $x' = (10-x)$ is $x_1 = x_0 + \frac{h}{2}\left[(10-x_0)+(10-x_1)\right]$, so $x_1(1+h/2) = x_0(1-h/2) + 10h$, and $x_1 = (0 + 0.1\times10)/(1+0.05) = 0.952$. This is essentially exact, the second-order accuracy of the trapezoidal, versus the Euler's $1.0$. The method, not the machine, is what separates them.
:::
:::

::: exercise Step size from a time constant {level=3 check="0.1"}
Your network's smallest time constant is $1\ \mathrm{ms}$. What step size, at one hundredth, would you use for an explicit, non-adaptive, method?
::: hint
One hundredth of the smallest time constant.
:::
::: solution
$1\ \mathrm{ms}/100 = 0.01\ \mathrm{ms} = 10\ \mu\mathrm s)$. The rule is a bound on the step from below, and it is the number to check before trusting the transient.
:::
:::

::: exercise Monte Carlo on a gain stage {level=3 check="0.022"}
A voltage divider, $R_1 = 1\ \mathrm k\Omega$, $R_2 = 1\ \mathrm k\Omega$, $10\ \mathrm V)$, and both resistors have a $\pm 5\%$ independent tolerance. What is the worst-case range of the output?
::: hint
The output is $10\,R_2/(R_1+R_2)$; find the extremes by the corner values.
:::
::: solution
The output is maximised when $R_2$ is large and $R_1$ small: $R_2 = 1.05$, $R_1 = 0.95$, giving $10\times1.05/(0.95+1.05) = 10\times1.05/2 = 5.25\ \mathrm V)$. It is minimised when $R_2$ is small and $R_1$ large: $R_2 = 0.95$, $R_1 = 1.05$, giving $10\times0.95/2.1 = 4.52\ \mathrm V)$. So the worst-case output range is $4.52$ to $5.25\ \mathrm V)$, a variation of about $\pm 15\%$ on the nominal $5\ \mathrm V)$, larger than the single-part case because both parts can move in the wrong direction at once. This is the reason a two-part divider is less robust than one where only the output sets the range, and it is the kind of number a tolerance analysis is for.
:::
:::

::: exercise Convergence on a non-linear netlist {level=3}
A netlist with a diode does not converge at a particular step, and the operating point is found to be $5\ \mathrm mV}$ below the diode threshold, in the off state. What is the likely cause, and what is the first try?
::: hint
The diode is at the threshold; the non-linear solve is sensitive to the initial guess.
:::
::: solution
A diode near its threshold has a very steep, non-linear, current-voltage relation, and the non-linear solve can wander if the initial guess is on the wrong side. The first try is to improve the initial guess, by setting the diode voltage closer to the expected, or to take a smaller step, so that the operating point moves less in a single step, or to use a non-linear method that is more robust near the threshold. The operating point check, that the diode is $5\ \mathrm mV)$ below threshold, is what tells you the solve is sensitive, and it is the sign that the problem is the non-linear solve, not the netlist.
:::
:::

::: exercise Stiff network and slow run {level=3}
A converter has both a $1\ \mathrm nH)$ inductor and a $10\ \mathrm s)$ capacitor, and an explicit transient run takes a very long time. What is the name of the problem, and what is the practical remedy?
::: hint
The two time constants differ by a factor of about a billion.
:::
::: solution
This is **stiffness**: the fast constant, about $1\ \mathrm nH)$ scale, forces the explicit step to be tiny, so the run takes a number of steps proportional to the ratio of the two time constants, which is very large. The remedy is an implicit, or an adaptive, integrator, which is unconditionally stable for the linear part and can take a step set by the slow constant while still resolving the fast one, so the run time is independent of the stiffness. This is the reason a general-purpose simulator defaults to an implicit method, and it is what you should use the moment a stiff network runs slowly.
:::
:::
