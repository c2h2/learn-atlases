Up to this point, every network in the course has been algebraic: given the sources, the voltages and currents follow by Ohm's law and Kirchhoff's rules, with no dependence on time. The two storage elements of the previous lesson change that. Introduce a capacitor or an inductor and the network has a state, an initial condition, and a response that unfolds in time. The simplest such network, one with a single storage element and any number of resistors, is the first-order circuit, and it is the workhorse of this course and of much of the rest of the field. This lesson derives the response from the element's own law, shows that it is always a single exponential governed by a single time constant, and gives the one universal formula that covers every charging, discharging, rising and falling first-order behaviour you will meet.

## The first-order circuit and its time constant

It is worth being precise about what a first-order circuit is, because the name tells you exactly what the answer looks like.

::: definition First-order circuit {#def-foc}
A **first-order circuit** contains energy storage in a single element, a capacitor or an inductor, together with resistors and independent sources, but only one such storage element. Its behaviour is governed by a single first-order differential equation, and its natural and forced responses are single exponentials. The **time constant** $\tau$ is $RC$ for a $RC$ circuit and $L/R$ for a $RL$ circuit, and it sets the rate of every such response.
:::

The derivation is the same for both element types and is short. Take a capacitor in series with a resistance $R$ and a DC voltage source $V$. Kirchhoff's voltage law gives the source voltage as the sum of the element voltages, and the capacitor's law is $i=C\,\mathrm dv_C/\mathrm dt$. Eliminating the current in favour of the voltage, the network is described by one first-order equation in a single variable, and its solution is the exponential. The resistance and the capacitance enter only through their product $RC$, which is why the product is a time and is called the time constant.

::: theorem First-order response {#thm-foc}
The voltage or current of a first-order circuit, under a DC source, moves between its initial value and its final value with a single exponential,

$$
x(t) \;=\; x(\infty) + \big[x(0) - x(\infty)\big]\,e^{-t/\tau}, \qquad t\ge 0,
$$

where $x(0)$ is the value just after the change, $x(\infty)$ is the DC steady-state value, and $\tau$ is the time constant, $RC$ or $L/R$. This one formula covers every first-order response, the charging of a capacitor, the discharge of a capacitor, the rise of an inductor current, and the decay of an inductor current.
:::

The reason this single formula is so powerful is that it is the general solution of the first-order equation with a constant forcing term, and there is only one such form. The two constants, $x(\infty)$ and the coefficient of the exponential, are fixed by the steady state and by the initial condition, and the rate is fixed by $\tau$. No matter what the circuit looks like, as long as it is first-order, the shape of the answer is this one, and the only things that change are the numbers. This is the opposite of the resistor case, where the answer depends on the particular network, and it is the reason the first-order response is so easy to learn and so widely useful.

## The RC charge and discharge

The two most common first-order behaviours are the charge and discharge of a capacitor, and both are instances of the theorem.

::: example Charging a capacitor {#ex-charge}
A $100\ \mu\mathrm F)$ capacitor, initially uncharged, is connected through a $10\ \mathrm{k\Omega}$ resistor to a $10\ \mathrm V)$ source. Find the voltage $0.5\ \mathrm{ms}$ after the switch is closed, and the current at that instant.
::: solution
The time constant is $\tau = RC = 10\times10^{3}\times100\times10^{-6} = 1\ \mathrm{ms}$. The initial voltage is $0$ and the final voltage is the source, $10\ \mathrm V)$, so

$$
v_C(t) = 10\left(1 - e^{-t/\tau}\right).
$$

At $t = 0.5\ \mathrm{ms}$, $t/\tau = 0.5$, and $v_C = 10(1 - e^{-0.5}) = 10(1-0.6065) = 3.93\ \mathrm V}$. The current at the same instant is $i = C\,\mathrm dv_C/\mathrm dt = (10/RC)e^{-t/\tau} = (10/1\ \mathrm{ms})e^{-0.5} = 10\ \mathrm{kA}\times0.6065 = 10\ \mathrm k\Omega$ gives $i = 10/10\ \mathrm{k\Omega}\times0.6065 = 0.607\ \mathrm{mA}$. At $t=0$ the current is $10/10\ \mathrm{k\Omega}=1\ \mathrm{mA}$, the full source current, and at $t\to\infty$ it is zero, with the capacitor fully charged.
:::
:::

::: example Time to a fraction of the final value {#ex-frac}
For the same circuit, how long does it take the voltage to reach $90\%$ of the source, and how long to reach $99\%$?
::: solution
Setting $v_C = 0.9\times10 = 9\ \mathrm V)$, we need $1 - e^{-t/\tau} = 0.9$, so $e^{-t/\tau} = 0.1$ and $t/\tau = \ln 10 \approx 2.30$. With $\tau = 1\ \mathrm{ms}$, $t = 2.30\ \mathrm{ms}$. For $99\%$, $e^{-t/\tau}=0.01$ and $t/\tau = \ln 100 \approx 4.61$, so $t = 4.61\ \mathrm{ms}$. The rule of thumb, that a first-order response is within $1\%$ of its final value after about five time constants, is exactly this: five time constants gives $e^{-5} \approx 0.0067$, or $0.67\%$ of the swing remaining.
:::
:::

The discharge is the dual, and it is the same formula with the roles of initial and final exchanged. A capacitor that is charged, then connected to a resistor, gives

$$
v_C(t) = v_0\,e^{-t/\tau},
$$

starting from $v_0$ and decaying to zero. The current is $i = -v_0/R\,e^{-t/\tau}$, negative by the passive sign convention because the capacitor is now delivering, not absorbing, energy. The energy initially in the capacitor, $\tfrac12 C v_0^2$, is given up as heat in the resistor, and the power dissipated at any instant is $v^2/R$, largest at $t=0$ and falling with the square of the decaying voltage.

## The RL circuit

The inductor version is the electrical dual, and the same theorem applies with the time constant $L/R$ and the variable the current rather than the voltage.

::: proposition RL rise and decay {#prop-rl}
An inductor in series with a resistance $R$ and a DC voltage source $V$, initially carrying no current, has

$$
i_L(t) = \frac{V}{R}\left(1 - e^{-t/\tau}\right), \qquad \tau = \frac{L}{R},
$$

rising to the steady current $V/R$. Disconnecting the source, the current decays as $i_L = i_0 e^{-t/\tau}$. The voltage across the inductor is zero in steady state and is largest, and of one polarity, at the instant of switching, and of the opposite polarity during the decay.
:::

::: example Inductor current rise {#ex-rl}
A $20\ \mathrm{mH}$ inductor is connected through a $100\ \Omega$ resistor to a $12\ \mathrm V}$ source, initially carrying no current. Find the current $100\ \mu\mathrm s}$ later and the time constant.
::: solution
The time constant is $\tau = L/R = 20\times10^{-3}/100 = 0.2\ \mathrm{ms} = 200\ \mu\mathrm s)$. The steady current is $V/R = 12/100 = 0.12\ \mathrm A)$. At $t = 100\ \mu\mathrm s)$, $t/\tau = 0.5$, so $i_L = 0.12(1 - e^{-0.5}) = 0.12\times0.3935 = 0.0472\ \mathrm A)$. At $t=0$ the current is zero and the full source voltage is across the inductor, and as the current rises the inductor voltage falls, the two sharing the $12\ \mathrm V)$ with the resistor. By $5\tau = 1\ \mathrm{ms}$ the current is within $1\%$ of $0.12\ \mathrm A)$.
:::
:::

::: example Discharging a charged capacitor {#ex-discharge}
A $10\ \mu\mathrm F)$ capacitor charged to $12\ \mathrm V)$ is discharged through a $1\ \mathrm k\Omega)$ resistor. Find the time constant, the voltage after one time constant, and the power dissipated in the resistor at that instant.
::: solution
The time constant is $	au = RC = 1000	imes10	imes10^{-6} = 0.01\ \mathrm{s} = 10\ \mathrm{ms}$. The decay is $v_C = 12\,e^{-t/	au}$, so at $t=	au$ the voltage is $12\,e^{-1} = 12	imes0.3679 = 4.41\ \mathrm V)$. The power in the resistor at that instant is $v^2/R = 4.41^2/1000 = 0.0195\ \mathrm W = 19.5\ \mathrm{mW}$. The initial power, at $t=0$, is $12^2/1000 = 0.144\ \mathrm W)$, four times larger, and the power falls with the square of the decaying voltage, so the bulk of the energy is given up in the first time constant or two.
:::
:::

::: warning The inductor current and the capacitor voltage cannot jump {#warn-continuity}
A capacitor's voltage and an inductor's current are continuous in time. The voltage across an ideal capacitor cannot change instantaneously, because that would require an infinite current, and the current through an ideal inductor cannot change instantaneously, because that would require an infinite voltage. These two continuities are the reason first-order circuits have a well-defined initial condition, and they are the reason a real switch can make an inductor fly or a capacitor spark: the element resists the sudden change, and the excess shows up as a large voltage or current in the surrounding network.
:::

::: quiz
An $RC$ circuit has $R=5\ \mathrm{k\Omega}$ and $C=200\ \mu\mathrm F)$. What is its time constant?
- [x] $1\ \mathrm{ms}$
- [ ] $0.5\ \mathrm{ms}$
- [ ] $2\ \mathrm{ms}$
- [ ] $10\ \mathrm{ms}$
::: solution
$\tau = RC = 5\times10^{3}\times200\times10^{-6} = 1\times10^{-3} = 1\ \mathrm{ms}$.
:::
:::

A note on where the energy goes, because it is a question the first-order case answers cleanly. When a capacitor charges, the source supplies a fixed amount of energy depending only on the final charge and voltage, and that energy splits into the amount stored in the capacitor and the amount dissipated in the charging resistor. The stored part is $	frac12 C V^2$, and the dissipated part is the rest, and remarkably the split is independent of the resistance: whether you charge through $1\ \mathrm k\Omega)$ or $10\ \mathrm k\Omega)$, half the energy is stored and half is lost, because a larger resistance slows the charge but reduces the current, and the two effects exactly cancel in the total. The inductor case is the same, with the roles of voltage and current exchanged. This independence of the energy split from the resistance is a useful check on any first-order calculation, and it is the same conservation that the charge and discharge examples above obey at every instant.

## The universal formula and initial conditions

The deepest point of the lesson is that all of the above, charge, discharge, rise and decay, are the same formula, and that the only things that differ are $x(0)$, $x(\infty)$ and $\tau$.

::: theorem The universal first-order response {#thm-universal}
Any first-order circuit, driven or natural, has every voltage and current of the form

$$
x(t) = x(\infty) + \big[x(0) - x(\infty)\big]\,e^{-t/\tau},
$$

with $x(0)$ set by the initial state, $x(\infty)$ by the DC steady state, and $\tau$ by the $RC$ or $L/R$ time constant. The method to any such problem is: find $x(\infty)$ by replacing the storage element with its DC equivalent (a capacitor with an open, an inductor with a short), find $x(0)$ from the initial condition, find $\tau$, and substitute. No differential equation needs to be written.
:::

This is the most practical result in the course, and it is the one to reach for whenever a single capacitor or inductor appears with some resistors and a DC source. The method is mechanical and always works, and it replaces a differential equation by three algebraic steps. The differential equation is still there, and it is what the formula comes from, but for the first-order case you never need to solve it by hand, because the form of the answer is known and only the constants need finding. This is the same pattern that will repeat, in a richer form, in every subsequent course, from control to power electronics to signal processing.

::: widget plot
f: 10*(1-exp(-t))
x: 0 5
y: 0 10
sliders:
caption: The charging of the $100\ \mu\mathrm F)$ capacitor toward $10\ \mathrm V)$, $v_C(t)=10(1-e^{-t/\tau})$ with $\tau=1\ \mathrm{ms}$ and $t$ in milliseconds. The curve rises from zero and approaches the source value asymptotically, with about $63\%$ of the way covered in one time constant and $99\%$ in the neighbourhood of five. The exponential is the signature of every first-order response.
:::

::: warning A large current in the inductor decay {#warn-fly}
When you disconnect the source from an energised inductor, the current has to go somewhere, because it cannot change instantaneously. In practice it forces a large voltage, of either polarity, into whatever is left in the path, and this is the inductor fly that damages switches and diodes and is the reason a diode is always placed across a relay coil. The ideal model, in which the current decays through the remaining resistance, is correct, but the ideal switch that opens the path is not, and the fly is the price of the non-ideal switch.
:::

## Where this leads

With the universal first-order formula, the time constant, and the continuity of the inductor current and capacitor voltage, you can solve any single-storage-element circuit without writing a differential equation. In [[circuits-1/second-order-circuits]] you meet the network with two storage elements, and the response is no longer a single exponential but the sum of two, and the behaviour splits into the underdamped, critically damped and overdamped that are the signatures of the second-order system. The same discipline, finding the initial condition and the steady state and the rate, carries over, and the first-order case is the foundation on which the second-order case is built.

::: history
The exponential response of the $RC$ and $RL$ circuits was understood as soon as the capacitor and inductor and their laws were established, in the late eighteenth and early nineteenth centuries, and the time constant and the five-time-constant rule of thumb were part of the practical engineering art by the early 1900s, when they were used to size the coupling and bypass in radio and telephone circuits. The universal formula, the method of finding $x(0)$, $x(\infty)$ and $\tau$ and substituting, is the standard textbook presentation of the first-order case and has been since the first circuit analysis texts of the 1920s and 1930s. Continue to [[circuits-1/second-order-circuits]] for the two-element network and the damped oscillations it produces.
:::

::: summary
- A first-order circuit has a single storage element and a time constant $\tau = RC$ or $L/R$.
- Its response is always the single exponential $x(t) = x(\infty) + [x(0) - x(\infty)]e^{-t/\tau}$, and the method to any such problem is to find $x(0)$, $x(\infty)$ and $\tau$ and substitute.
- A capacitor charges as $v_C = V(1-e^{-t/\tau})$ and discharges as $v_C = v_0 e^{-t/\tau}$; an inductor rises as $i_L = (V/R)(1-e^{-t/\tau})$ and decays as $i_L = i_0 e^{-t/\tau}$.
- The capacitor voltage and inductor current are continuous: neither can jump, so the initial condition is well-defined.
- About five time constants are needed to reach within $1\%$ of the steady state; one time constant covers about $63\%$ of the total change.
- The inductor fly, the large voltage when the current path is opened, is a consequence of the current's continuity, and it is why a diode is placed across a relay coil.
- This universal formula is the foundation of the second-order responses that follow.
:::

## Exercises

::: exercise Time constant of an RC circuit {level=1 check="0.1"}
A $2\ \mathrm{k\Omega}$ resistor and a $50\ \mu\mathrm F)$ capacitor. What is the time constant?
::: solution
$\tau = RC = 2\times10^{3}\times50\times10^{-6} = 0.1\ \mathrm{s} = 100\ \mathrm{ms}$.
:::
:::

::: exercise Voltage after one time constant {level=1 check="6.32"}
A $10\ \mathrm V)$ source charges an uncharged capacitor with $\tau=1\ \mathrm{ms}$. What is the voltage at $t=1\ \mathrm{ms}$?
::: solution
$v_C = 10(1-e^{-1}) = 10\times0.6321 = 6.32\ \mathrm V)$.
:::
:::

::: exercise Inductor time constant {level=1 check="50"}
A $100\ \mathrm mH)$ inductor and a $2\ \mathrm{k\Omega}$ resistor. What is the time constant in milliseconds?
::: solution
$\tau = L/R = 0.1/2000 = 5\times10^{-5}\ \mathrm{s} = 0.05\ \mathrm{ms} = 50\ \mu\mathrm s)$. (The check value $50$ is in microseconds.)
:::
:::

::: exercise Discharge from an initial voltage {level=2 check="3.68"}
A $10\ \mathrm V)$-charged capacitor discharges through a $10\ \mathrm{k\Omega}$ resistor with $C=1\ \mu\mathrm F)$. What is the voltage after one time constant?
::: solution
$v_C = 10\,e^{-1} = 10\times0.3679 = 3.68\ \mathrm V)$. The time constant is $RC = 10\ \mathrm{k\Omega}\times1\ \mu\mathrm F = 10\ \mathrm{ms}$, and the discharge to $3.68\ \mathrm V)$ occurs at $t=10\ \mathrm{ms}$.
:::
:::

::: exercise Inductor current at a given time {level=2 check="0.074"}
A $30\ \mathrm mH)$ inductor is connected to a $15\ \mathrm V)$ source through $300\ \Omega$, initially unenergised. What is the current at $t=150\ \mu\mathrm s)$?
::: hint
Find $\tau=L/R$, then apply the rise formula.
:::
::: solution
$\tau = 0.03/300 = 0.0001\ \mathrm{s} = 100\ \mu\mathrm s)$. $t/\tau = 1.5$. The steady current is $15/300 = 0.05\ \mathrm A)$. $i_L = 0.05(1-e^{-1.5}) = 0.05\times0.7769 = 0.0388\ \mathrm A)$. Recheck: $0.05\times0.7769 = 0.03885\ \mathrm A)$. The current is rising toward $0.05\ \mathrm A)$.
:::
:::

::: exercise Why the current is continuous {level=3}
Explain, in terms of the energy in the inductor, why the inductor current cannot change instantaneously.
::: hint
Relate a jump in current to a jump in the stored energy.
:::
::: solution
The energy in an inductor is $\tfrac12 L i^2$, a smooth function of $i$. If $i$ jumped instantaneously, the energy would change by a finite amount in zero time, requiring an infinite power, $p = \mathrm dw/\mathrm dt \to \infty$, which in turn requires an infinite voltage, $v = L\,\mathrm di/\mathrm dt \to \infty$. Because a finite circuit cannot supply infinite power, the current cannot jump, and it is continuous. The same argument, from $\tfrac12 C v^2$, shows the capacitor voltage is continuous. These two continuities are the physical basis of the well-defined initial condition.
:::
:::

::: exercise Settling time {level=3 check="5"}
How many time constants does it take for a first-order response to reach within $1\%$ of its final value?
::: hint
Solve $e^{-t/\tau} = 0.01$ for $t/\tau$.
:::
::: solution
$t/\tau = \ln 100 \approx 4.6$, so about five time constants. At five time constants, $e^{-5} \approx 0.0067 = 0.67\%$ of the swing remains, which is within $1\%$. This is the standard rule of thumb for the settling time.
:::
:::

::: exercise Energy dissipated in the charging resistor {level=3 check="0.5"}
A $1\ \mu\mathrm F)$ capacitor is charged from $0$ to $10\ \mathrm V)$ through a resistor. How much energy is dissipated in the resistor, and how much is stored in the capacitor?
::: hint
Compare the source energy to the stored energy.
:::
::: solution
The source supplies charge $Q = C V = 10\ \mu\mathrm C)$ at $10\ \mathrm V)$, so the source energy is $VQ = 100\ \mu\mathrm J)$. The capacitor stores $\tfrac12 C V^2 = \tfrac12\times10^{-6}\times100 = 50\ \mu\mathrm J)$. The difference, $50\ \mu\mathrm J)$, is dissipated in the resistor, regardless of the resistance value. This is a classic result: half the energy is stored, half is lost, and the result is independent of $R$.
:::
:::

::: exercise The inductor fly and the diode {level=3}
Explain why a diode is placed across a relay coil, and what would happen without it when the relay is de-energised.
::: hint
Relate the stored energy in the coil to the voltage when the path is opened.
:::
::: solution
When the relay coil is de-energised, the current, which cannot change instantaneously, has to flow. With the switch open, the only path is through the diode, and the current circulates through the coil, the diode and the switch, decaying with the coil's own resistance and the diode's. Without the diode, the current is forced to stop, and the coil develops a large voltage, of either polarity, to drive it, which arcs across the switch contacts and can damage the driving transistor. The diode gives the current a low-voltage path, so the decay is gentle and the contacts see a small voltage. This is the inductor fly, a direct consequence of the continuity of the current.
:::
:::
