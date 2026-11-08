A relay clicks shut, a solenoid valve opens, a loudspeaker cone moves, a turbine-generator turns $500\,\mathrm{MW}$ of steam power into electricity. Each of these devices converts energy between an electrical circuit and a mechanical system, and in each the conversion happens through a magnetic field. The field acts as a reservoir: the electrical side pours energy into it, the mechanical side draws energy out of it, and the force or torque on the moving part is fixed by how the stored energy changes when the part moves.

This chapter turns that idea into a method. We set up the energy balance of an electromechanical system and isolate a lossless **coupling field**. From its stored energy, and from a closely related quantity called **co-energy**, we derive the force and torque on any magnetic device by the principle of virtual work, without ever computing the forces on individual currents. We apply the method to electromagnets and to singly excited rotating systems, which produce **reluctance torque**, and to doubly excited systems, whose mutual torque is the basis of every rotating machine; the conditions under which such a machine produces average torque turn out to be the conditions for synchronous and induction machines. We also look at the simplest machine of all, a conductor moving in a field, which links force and motional emf directly. The magnetic-circuit tools come from [[electric-machines/magnetic-circuits]], and the energy of a magnetic field from [[electromagnetics/induction-inductance]].

## The energy balance

Consider a device with one electrical terminal pair and one mechanical degree of freedom, such as the position $x$ of a plunger. Conservation of energy, over any interval of time, reads

$$
\underbrace{\mathrm dW_{\text{elec}}}_{\text{electrical input}} = \underbrace{\mathrm dW_{\text{mech}}}_{\text{mechanical output}} + \underbrace{\mathrm dW_{\text{fld}}}_{\text{increase in stored energy}} + \underbrace{\mathrm dW_{\text{loss}}}_{\text{heat}}.
$$

The losses are of three kinds: resistive loss in the winding, core loss in the iron, and friction and windage in the mechanical system. We remove all three from the conversion problem by placing the winding resistance in the external electrical circuit and the friction in the external mechanical system, and by neglecting core loss (or representing it by a resistor, as in [[electric-machines/transformers]]). What remains is a **lossless coupling field** with an electrical port, where the voltage is $e = \mathrm d\lambda/\mathrm dt$ and the current $i$, and a mechanical port, where the field exerts a force $f_{\text{fld}}$ on the moving part in the direction of increasing $x$.

Over an interval $\mathrm dt$, the field receives $ei\,\mathrm dt = i\,\mathrm d\lambda$ from the electrical port and does work $f_{\text{fld}}\,\mathrm dx$ on the mechanical port, so

$$
\mathrm dW_{\text{fld}} = i\,\mathrm d\lambda - f_{\text{fld}}\,\mathrm dx.
$$ {#eq-energy-balance}

This is the central equation of the chapter. Because the coupling field is lossless, its energy is a **state function**: it depends only on the present values of $\lambda$ and $x$, not on how they were reached.

::: definition Stored field energy {#def-field-energy}
The **energy stored in the coupling field** of a singly excited system in state $(\lambda, x)$ is

$$
W_{\text{fld}}(\lambda, x) = \int_0^{\lambda} i(\lambda', x)\,\mathrm d\lambda'.
$$ {#eq-wfld}

It is the energy delivered by the electrical port if the flux linkage is raised from zero to $\lambda$ with the moving part held fixed at $x$ (so that no mechanical work is done), and it equals the area between the $\lambda$–$i$ curve and the $\lambda$ axis. For a linear system, $\lambda = L(x)i$ and $W_{\text{fld}} = \lambda^2/(2L(x))$.
:::

To compute the energy we may choose any path from the unenergised state to $(\lambda, x)$, because the result does not depend on the path. The convenient one is: first move the part to $x$ with $\lambda = 0$ (no current, so no force and no work), then raise $\lambda$ with $x$ fixed (no motion, so no mechanical work). Along the second leg $\mathrm dW_{\text{fld}} = i\,\mathrm d\lambda$, which gives [[#eq-wfld]].

## Force from energy and co-energy

::: theorem Force from stored energy {#thm-force-energy}
The force exerted by the coupling field on the moving part, in the direction of increasing $x$, is

$$
f_{\text{fld}} = -\left.\frac{\partial W_{\text{fld}}(\lambda, x)}{\partial x}\right|_{\lambda}.
$$ {#eq-force-energy}

For a linear system, $f_{\text{fld}} = \dfrac{\lambda^2}{2L(x)^2}\dfrac{\mathrm dL}{\mathrm dx}$.
:::

::: proof
Since $W_{\text{fld}}$ is a function of the state $(\lambda, x)$, its total differential is

$$
\mathrm dW_{\text{fld}} = \frac{\partial W_{\text{fld}}}{\partial\lambda}\,\mathrm d\lambda + \frac{\partial W_{\text{fld}}}{\partial x}\,\mathrm dx.
$$

Comparing with [[#eq-energy-balance]], which holds for arbitrary independent changes $\mathrm d\lambda$ and $\mathrm dx$, the coefficients must agree: $i = \partial W_{\text{fld}}/\partial\lambda$ and $f_{\text{fld}} = -\partial W_{\text{fld}}/\partial x$. For $W_{\text{fld}} = \lambda^2/(2L(x))$, differentiating at constant $\lambda$ gives $-\partial W/\partial x = \lambda^2L'(x)/(2L^2)$.
:::

The derivative is taken with $\lambda$ held constant as a mathematical device. It is **not** a statement about what happens physically when the part moves; the force at an instant depends only on the state at that instant, and we may compute it by imagining any virtual displacement we like. Holding $\lambda$ fixed is convenient because then no electrical energy enters, and all the mechanical work comes out of the stored energy.

Most devices, however, are described by their current, not their flux linkage. A second state function, with $i$ as the natural variable, gives the force directly in terms of current.

::: definition Co-energy {#def-coenergy}
The **co-energy** of the coupling field is

$$
W'_{\text{fld}}(i, x) = i\lambda - W_{\text{fld}}(\lambda, x) = \int_0^i\lambda(i', x)\,\mathrm di',
$$ {#eq-coenergy}

the area between the $\lambda$–$i$ curve and the $i$ axis. Energy and co-energy together fill the rectangle $i\lambda$. For a linear system they are equal, $W'_{\text{fld}} = \tfrac12L(x)i^2 = W_{\text{fld}}$.
:::

::: theorem Force from co-energy {#thm-force-coenergy}
The force on the moving part is

$$
f_{\text{fld}} = +\left.\frac{\partial W'_{\text{fld}}(i, x)}{\partial x}\right|_{i},
$$ {#eq-force-coenergy}

and for a linear system

$$
f_{\text{fld}} = \frac{i^2}{2}\frac{\mathrm dL}{\mathrm dx}.
$$ {#eq-force-linear}

For a rotating part with angle $\theta$ the same results hold with force replaced by torque and $x$ by $\theta$: $T_{\text{fld}} = -\partial W_{\text{fld}}(\lambda,\theta)/\partial\theta = \partial W'_{\text{fld}}(i,\theta)/\partial\theta$.
:::

::: proof
Differentiate the definition: $\mathrm dW' = \mathrm d(i\lambda) - \mathrm dW = i\,\mathrm d\lambda + \lambda\,\mathrm di - (i\,\mathrm d\lambda - f_{\text{fld}}\,\mathrm dx) = \lambda\,\mathrm di + f_{\text{fld}}\,\mathrm dx$. So $W'$ is naturally a function of $(i, x)$, with $\lambda = \partial W'/\partial i$ and $f_{\text{fld}} = \partial W'/\partial x$. The integral form follows by the same two-leg path as before. For a rotating part, the mechanical work is $T\,\mathrm d\theta$ in place of $f\,\mathrm dx$, and every step is unchanged.
:::

The physical content of [[#eq-force-linear]] is simple: **a magnetic system pulls in the direction that increases its inductance.** An iron plunger is drawn into a solenoid, an armature is drawn towards the pole faces of an electromagnet, and a piece of iron in a rotating machine turns to align itself with the field, all because these motions reduce the reluctance and so raise the inductance.

::: warning Constant λ or constant i, never mixed
The two formulas have opposite signs: $-\partial W/\partial x$ at constant $\lambda$, but $+\partial W'/\partial x$ at constant $i$. A common mistake is to write $W = \tfrac12L(x)i^2$ and then differentiate with $i$ constant, putting a minus sign in front: this gives a force of the right magnitude in the **wrong direction**, pushing the plunger out of the solenoid. Use energy with $\lambda$, co-energy with $i$. In a linear system the two are numerically equal, but they are different functions of different variables, and their partial derivatives differ in sign.
:::

::: widget plot
f: 1.2*tanh(x/2); 1.2*tanh(x/(2*k))
x: 0, 8
y: 0, 1.4
sliders: k=1.5:1:3:0.05
shade: 0, 4
labels: \lambda(i, x_1); \lambda(i, x_2)
caption: Flux linkage (in Wb) against current (in A) for a saturating electromagnet at two armature positions; the second curve, with the larger gap, rises more slowly. The shaded area under the first curve up to $i = 4\,\mathrm A$ is the co-energy $W'$; the area between that curve and the vertical axis, up to $\lambda(4)$, is the energy $W$. Increase the parameter $k$ (open the gap of the second position) and notice that the area between the two curves, which is the mechanical work done by a small movement at constant current, grows. Saturation makes $W$ and $W'$ unequal: the co-energy is the larger of the two.
:::

### Electromagnets

::: example Force of a U-core electromagnet {#ex-electromagnet}
A U-shaped core and a flat armature are separated by two air gaps of length $g$, each of area $A = 10\,\mathrm{cm^2}$, in series in the magnetic circuit. The winding has $N = 500$ turns and carries $i = 2\,\mathrm A$. Treat the iron as ideal and neglect fringing. Find the inductance, the gap flux density and the force on the armature at $g = 1\,\mathrm{mm}$.
::: solution
The two gaps in series have reluctance $\mathcal R = 2g/(\mu_0A)$, so

$$
L(g) = \frac{N^2}{\mathcal R} = \frac{\mu_0N^2A}{2g} = \frac{4\pi\times10^{-7}\times500^2\times10^{-3}}{2\times10^{-3}} = 0.157\,\mathrm H.
$$

By [[#eq-force-linear]], with $x = g$,

$$
f_{\text{fld}} = \frac{i^2}{2}\frac{\mathrm dL}{\mathrm dg} = -\frac{\mu_0N^2Ai^2}{4g^2} = -\frac{4\pi\times10^{-7}\times250\,000\times10^{-3}\times4}{4\times10^{-6}} = -314\,\mathrm N.
$$

The minus sign means the force acts to **reduce** the gap: the armature is attracted. The flux density is $B = \mu_0Ni/(2g) = 0.628\,\mathrm T$. In terms of $B$, the force is $\abs{f} = B^2(2A)/(2\mu_0) = B^2A/\mu_0$, which also gives $314\,\mathrm N$: each pole face pulls with a **magnetic pressure** $B^2/(2\mu_0) = 157\,\mathrm{kPa}$, about $1.6$ atmospheres.

At constant current, halving the gap quadruples the force to $1257\,\mathrm N$ and doubles $B$ to $1.26\,\mathrm T$, close to saturation; the iron then limits the force.
:::
:::

The result $B^2/(2\mu_0)$ per unit area is worth remembering: it is the force per unit area on an iron surface carrying a normal flux density $B$, and since iron saturates near $2\,\mathrm T$, no electromagnet can pull much more than $1.6\,\mathrm{MPa}$, about $16\,\mathrm{kg/cm^2}$. The same pressure, acting tangentially on the rotor surface, limits the torque per unit volume of every rotating machine.

::: example Design of a holding magnet {#ex-holding-design}
A two-pole holding magnet must hold a steel plate with a force of at least $400\,\mathrm N$. The gap flux density is limited to $1.0\,\mathrm T$, the unavoidable gap at each pole (paint and surface roughness) is $0.1\,\mathrm{mm}$, and the iron path is $0.25\,\mathrm m$ long with $\mu_r = 2000$. Choose the pole area and the ampere-turns, and the number of turns for a current of $1\,\mathrm A$. Then find the force if the plate is $1\,\mathrm{mm}$ away from each pole.
::: solution
**Area.** The force from two poles of area $A$ is $f = 2\times B^2A/(2\mu_0) = B^2A/\mu_0$, so

$$
A = \frac{\mu_0f}{B^2} = \frac{4\pi\times10^{-7}\times400}{1.0^2} = 5.03\times10^{-4}\,\mathrm{m^2},
$$

about $5\,\mathrm{cm^2}$ per pole, for instance $2\,\mathrm{cm}\times2.5\,\mathrm{cm}$.

**Ampere-turns.** The two gaps need $B(2g)/\mu_0 = 1.0\times2\times10^{-4}/\mu_0 = 159\,\mathrm A$ and the iron $Bl/(\mu_r\mu_0) = 0.25/(2000\mu_0) = 99.5\,\mathrm A$, so $NI = 259\,\mathrm A$. With $I = 1\,\mathrm A$ we need $N = 260$ turns, giving $B = 1.005\,\mathrm T$ and $f = 404\,\mathrm N$.

**At a distance.** With $1\,\mathrm{mm}$ gaps the same $260\,\mathrm A$ gives $B = \mu_0\times260/(2\times10^{-3} + 1.25\times10^{-4}) = 0.154\,\mathrm T$ and $f = 9.5\,\mathrm N$, forty times less. An electromagnet that holds well in contact barely attracts at a distance; lifting magnets and relays are designed for the closing gap, and the force-displacement curve is part of the specification.
:::
:::

## Singly excited rotating systems: reluctance torque

Now let a rotor of iron, with no winding, turn inside a stator carrying a single coil. If the rotor is not round but has a salient (projecting) shape, the stator inductance depends on the rotor angle $\theta$. It is greatest, $L_d$, when the rotor's long axis lines up with the coil's axis (the **direct axis**, $\theta = 0$) and smallest, $L_q$, when the rotor is crosswise (the **quadrature axis**, $\theta = 90^\circ$). Because the rotor looks the same after half a turn, the inductance has period $\pi$, and to first order

$$
L(\theta) = L_0 + L_2\cos2\theta,\qquad L_0 = \frac{L_d + L_q}{2},\quad L_2 = \frac{L_d - L_q}{2}.
$$ {#eq-ltheta}

By [[#thm-force-coenergy]], with current $i$ in the coil,

$$
T_{\text{fld}} = \frac{i^2}{2}\frac{\mathrm dL}{\mathrm d\theta} = -L_2i^2\sin2\theta.
$$ {#eq-reluctance-torque}

This is **reluctance torque**: it pulls the rotor towards the nearest alignment, $\theta = 0$ or $\pi$, regardless of the direction of the current, because it depends on $i^2$. A rotor displaced by a small positive angle feels a negative torque and returns, so $\theta = 0$ is stable; $\theta = 90^\circ$ is an unstable equilibrium. This is how a stepper motor holds its position ([[electric-machines/special-machines]]).

::: example A reluctance motor {#ex-reluctance-motor}
A salient iron rotor has $L_d = 0.20\,\mathrm H$ and $L_q = 0.05\,\mathrm H$ in a single stator coil. (a) With a direct current of $5\,\mathrm A$, find the maximum torque and the angle at which it occurs. (b) The coil is fed with $5\,\mathrm A$ rms at $50\,\mathrm{Hz}$, $i = I_m\cos\omega t$, and the rotor turns at $\theta = \omega t - \delta$. Show that the average torque is $\tfrac14L_2I_m^2\sin2\delta$, and find the maximum average torque and mechanical power.
::: solution
(a) $L_2 = (0.20 - 0.05)/2 = 0.075\,\mathrm H$. The torque $-0.075\times25\sin2\theta$ has magnitude at most $1.875\,\mathrm{N\,m}$, at $\theta = \mp45^\circ$, half way between the aligned and crosswise positions.

(b) Substituting into [[#eq-reluctance-torque]],

$$
T = -L_2I_m^2\cos^2\omega t\,\sin(2\omega t - 2\delta) = -\frac{L_2I_m^2}{2}\bigl(1 + \cos2\omega t\bigr)\sin(2\omega t - 2\delta).
$$

The term $\sin(2\omega t - 2\delta)$ averages to zero. The product $\cos2\omega t\,\sin(2\omega t - 2\delta) = \tfrac12[\sin(4\omega t - 2\delta) - \sin2\delta]$ averages to $-\tfrac12\sin2\delta$. Hence $T_{\text{avg}} = \tfrac14L_2I_m^2\sin2\delta$. With $I_m = 5\sqrt2\,\mathrm A$, the maximum, at $\delta = 45^\circ$, is $\tfrac14\times0.075\times50 = 0.94\,\mathrm{N\,m}$, and at the synchronous speed $\omega = 314\,\mathrm{rad/s}$ the power is $0.94\times314 = 294\,\mathrm W$.

The motor produces average torque **only** at the speed that keeps step with the supply, here $3000\,\mathrm{r/min}$; at any other speed $\delta$ drifts and the torque averages to zero. It is a synchronous machine. The torque also pulsates at $2\omega$ and $4\omega$, which a single-phase supply cannot avoid.
:::
:::

## Doubly excited systems

Most machines have windings on both members, a stator winding (current $i_1$) and a rotor winding (current $i_2$). For a linear system the flux linkages are

$$
\lambda_1 = L_{11}(\theta)i_1 + L_{12}(\theta)i_2,\qquad \lambda_2 = L_{12}(\theta)i_1 + L_{22}(\theta)i_2.
$$

The co-energy is a function of the two currents and the angle, and generalising [[#thm-force-coenergy]] to two electrical ports (the proof is identical, with $\mathrm dW = i_1\,\mathrm d\lambda_1 + i_2\,\mathrm d\lambda_2 - T\,\mathrm d\theta$) gives the following.

::: theorem Torque of a doubly excited system {#thm-double}
For a linear system with two windings,

$$
W'_{\text{fld}} = \tfrac12L_{11}i_1^2 + \tfrac12L_{22}i_2^2 + L_{12}i_1i_2,
$$

$$
T_{\text{fld}} = \frac{i_1^2}{2}\frac{\mathrm dL_{11}}{\mathrm d\theta} + \frac{i_2^2}{2}\frac{\mathrm dL_{22}}{\mathrm d\theta} + i_1i_2\frac{\mathrm dL_{12}}{\mathrm d\theta}.
$$ {#eq-double-torque}

The first two terms are reluctance torques; the third is the **mutual** (or alignment) torque.
:::

::: proof
Raise $i_1$ from $0$ with $i_2 = 0$ and $\theta$ fixed: $\int\lambda_1\,\mathrm di_1 = \tfrac12L_{11}i_1^2$. Then raise $i_2$ with $i_1$ fixed: $\int\lambda_2\,\mathrm di_2 = \int(L_{12}i_1 + L_{22}i_2)\,\mathrm di_2 = L_{12}i_1i_2 + \tfrac12L_{22}i_2^2$. The sum is $W'$, and since $\mathrm dW' = \lambda_1\,\mathrm di_1 + \lambda_2\,\mathrm di_2 + T\,\mathrm d\theta$, the torque is $\partial W'/\partial\theta$ at constant currents, which is [[#eq-double-torque]].
:::

In a machine with a **cylindrical** (round) rotor and a smooth stator, $L_{11}$ and $L_{22}$ do not depend on $\theta$; the mutual inductance between a stator coil and a rotor coil is greatest when their axes line up and varies, for sinusoidally distributed windings, as $L_{12} = M\cos\theta$. The torque is then purely mutual:

$$
T_{\text{fld}} = -Mi_1i_2\sin\theta.
$$ {#eq-mutual-torque}

It tries to bring the axes of the two windings, which behave like two bar magnets, into alignment. The question for machine design is how to get a torque that does not average to zero as the rotor turns.

::: theorem Condition for average torque {#thm-average-torque}
Let $i_1 = I_1\cos\omega_1t$, $i_2 = I_2\cos(\omega_2t + \alpha)$ and $\theta = \omega_mt + \delta$, with $\omega_1, \omega_2, \omega_m \ge 0$. The torque [[#eq-mutual-torque]] has a nonzero average only if

$$
\omega_m = \omega_1 + \omega_2\qquad\text{or}\qquad\omega_m = \abs{\omega_1 - \omega_2}.
$$

In particular, with direct current $I_2$ in the rotor ($\omega_2 = 0$, $\alpha = 0$), the rotor must turn at $\omega_m = \omega_1$, and then $T_{\text{avg}} = -\tfrac12MI_1I_2\sin\delta$.
:::

::: proof
By the identity $\cos A\cos B = \tfrac12[\cos(A - B) + \cos(A + B)]$, the product $i_1i_2$ contains terms at the frequencies $\omega_1 \pm \omega_2$. Multiplying by $\sin(\omega_mt + \delta)$ and using $\sin C\cos D = \tfrac12[\sin(C + D) + \sin(C - D)]$ gives four sinusoids with frequencies $\omega_m \pm(\omega_1 \pm \omega_2)$. A sinusoid averages to zero unless its frequency is zero, so a nonzero average needs $\omega_m = \pm\omega_1 \pm\omega_2$ for one of the sign choices, which with non-negative frequencies is the stated condition. For $\omega_2 = 0$ and $\alpha = 0$: $i_1i_2\sin\theta = I_1I_2\cos\omega_1t\sin(\omega_1t + \delta)$, whose average is $\tfrac12I_1I_2\sin\delta$, so $T_{\text{avg}} = -\tfrac12MI_1I_2\sin\delta$.
:::

These two conditions are the whole classification of rotating machines. With $\omega_2 = 0$, DC on the rotor and AC on the stator, the rotor must run at exactly the supply frequency: this is the **synchronous machine** of [[electric-machines/synchronous-machines]], and $\delta$ becomes its load angle. With AC on both, the rotor may run at any speed provided the rotor current frequency adjusts to $\omega_2 = \omega_1 - \omega_m$; in an **induction machine** ([[electric-machines/induction-machines]]) that happens automatically, because the rotor currents are induced at exactly the slip frequency. With DC on the stator and a rotor that must run at any speed, the rotor current must alternate at $\omega_2 = \omega_m$: a **commutator** does this mechanically in the [[electric-machines/dc-machines]]. A single-phase winding still gives a pulsating torque at twice the frequency; the rotating field of a polyphase winding, in [[electric-machines/rotating-magnetic-fields]], makes the torque smooth.

::: example Torque of a doubly excited machine {#ex-double}
A cylindrical-rotor machine has a stator–rotor mutual inductance $M\cos\theta$ with $M = 0.1\,\mathrm H$. (a) With $i_1 = 10\,\mathrm A$ and $i_2 = 5\,\mathrm A$ (both DC), find the maximum torque and its angle. (b) Now $i_1 = 10\cos\omega t\,\mathrm A$ at $50\,\mathrm{Hz}$, $i_2 = 5\,\mathrm A$ DC, and the rotor turns at $\theta = \omega t + \delta$. Find the average torque at $\delta = -22.5^\circ$ and the maximum average power the machine can convert.
::: solution
(a) $T = -0.1\times10\times5\sin\theta = -5\sin\theta\,\mathrm{N\,m}$, with a maximum magnitude of $5\,\mathrm{N\,m}$ at $\theta = \mp90^\circ$, when the windings are at right angles.

(b) By [[#thm-average-torque]], $T_{\text{avg}} = -\tfrac12(0.1)(10)(5)\sin(-22.5^\circ) = 2.5\times0.383 = 0.957\,\mathrm{N\,m}$, in the direction of rotation: with the rotor lagging behind the stator current's phase, the machine acts as a motor. The largest average torque, $2.5\,\mathrm{N\,m}$, occurs at $\delta = -90^\circ$, giving $2.5\times314 = 785\,\mathrm W$. At $\delta > 0$ the torque opposes rotation and the machine generates.
:::
:::

::: quiz
A singly excited device has inductance $L(x) = L_0/(1 + x/x_0)$, where $x$ is the gap. At constant current, the force on the moving part is
- [ ] zero, because the current is constant
- [ ] in the direction of increasing $x$, because $W = \tfrac12Li^2$ decreases with $x$ and $f = -\partial W/\partial x$
- [x] in the direction of decreasing $x$, with magnitude $\tfrac12i^2L_0/(x_0(1 + x/x_0)^2)$
- [ ] proportional to $i$, not $i^2$
::: solution
$f = \tfrac12i^2\,\mathrm dL/\mathrm dx = -\tfrac12i^2L_0/(x_0(1 + x/x_0)^2)$: negative, closing the gap, as the system moves towards larger inductance. Option two makes exactly the mistake of the warning above.
:::
:::

## Motional emf and the Lorentz force

The energy method treats the device as a black box. When the conductors themselves move through a field, there is a more direct description, and it shows the electrical and mechanical sides as two faces of one mechanism.

::: theorem Force and emf on a moving conductor {#thm-lorentz}
A straight conductor of length $l$ moving with velocity $u$ perpendicular to itself and to a uniform field $B$ has a **motional emf** $e = Blu$ induced along it. If it carries a current $i$, it experiences a force $f = Bli$ perpendicular to itself and to $\mathbf B$. With the current flowing in the direction of the emf, the force opposes the motion, and the electrical power and the mechanical power are equal:

$$
ei = (Blu)\,i = (Bli)\,u = fu.
$$ {#eq-ei-fu}
:::

::: proof
The magnetic force on a charge $q$ moving with the conductor is $q\mathbf u\times\mathbf B$, which acts along the conductor and has magnitude $quB$; integrated along the length, the work per unit charge is $e = Blu$. The force on a current element is $i\,\mathrm d\mathbf l\times\mathbf B$; for the whole conductor, $\abs{\mathbf f} = Bli$. Take $\mathbf u = u\hat{\mathbf x}$, $\mathbf B = B\hat{\mathbf z}$: then $\mathbf u\times\mathbf B = -uB\hat{\mathbf y}$, so the emf drives current along $-\hat{\mathbf y}$. A current $i$ in that direction feels $i(-l\hat{\mathbf y})\times B\hat{\mathbf z} = -Bli\,\hat{\mathbf x}$, opposite to $\mathbf u$ (Lenz's law). Both powers are $Blui$.
:::

[[#eq-ei-fu]] is the shortest statement of electromechanical conversion: **the same $Bl$ that converts velocity into voltage converts current into force.** If $i$ is forced against the emf by an external source, the force reverses and drives the conductor: the device is a motor. If an external force drives the conductor and the emf drives current into a load, it is a generator. Every machine can do both.

::: example A linear DC machine {#ex-linear-machine}
A conductor bar of length $l = 0.5\,\mathrm m$ slides without friction on two rails in a field $B = 0.8\,\mathrm T$. A $12\,\mathrm V$ battery is connected across the rails through a total resistance of $0.1\,\mathrm\Omega$. (a) Find the starting current and force, and the no-load speed. (b) A load force of $20\,\mathrm N$ opposes the motion. Find the steady speed, the current and the power balance.
::: solution
(a) At rest $e = 0$, so $i = 12/0.1 = 120\,\mathrm A$ and $f = Bli = 0.4\times120 = 48\,\mathrm N$. The bar accelerates; as $u$ rises, $e = Blu$ opposes the battery and the current falls. With no load it settles where $i = 0$, so $Blu = 12$ and $u_0 = 12/0.4 = 30\,\mathrm{m/s}$.

(b) In the steady state the magnetic force balances the load: $Bli = 20$, so $i = 50\,\mathrm A$. Then $e = 12 - 50\times0.1 = 7\,\mathrm V$ and $u = e/(Bl) = 17.5\,\mathrm{m/s}$. Power: the battery supplies $12\times50 = 600\,\mathrm W$; the resistance dissipates $50^2\times0.1 = 250\,\mathrm W$; the conversion is $ei = 7\times50 = 350\,\mathrm W = fu = 20\times17.5$. The efficiency is $e/V = 58\,\%$, and it rises towards $100\,\%$ as the speed approaches no-load speed. This little machine already shows every feature of the DC motor: a back emf proportional to speed, a torque proportional to current, and a speed that falls linearly with load.
:::
:::

## Dynamics: the electromechanical system as a whole

The coupling field links two sets of differential equations. For a plunger of mass $m$ restrained by a spring $k$ and a damper $b$, driven through a winding of resistance $R$ from a source $v$,

$$
v = Ri + \frac{\mathrm d\lambda(i, x)}{\mathrm dt},\qquad m\frac{\mathrm d^2x}{\mathrm dt^2} = f_{\text{fld}}(i, x) - k(x - x_0) - b\frac{\mathrm dx}{\mathrm dt}.
$$ {#eq-dynamics}

These equations are nonlinear because the force depends on $i^2$ and on $1/x^2$, and they show a characteristic phenomenon. In a relay held at constant current, the magnetic pull grows as the gap closes faster than the spring's restoring force grows, so beyond some point the armature snaps shut: **pull-in**. Once closed, it needs a much smaller current to hold, and drops out at a lower current than it picked up, a hysteresis built into the mechanics.

::: widget phaseplane
f: y
g: -a/x^2 + (1 - x) - 0.6*y
x: 0.15, 1.4
y: -1.5, 1.5
sliders: a=0.1:0:0.25:0.005
points: 1.2,0; 0.9,0
caption: Phase portrait of a relay armature at constant current, in normalised units: $x$ is the gap (the spring alone would hold it at $x = 1$) and $y$ its velocity. The magnetic pull is $a/x^2$, with $a\propto i^2$. For small $a$ there are two equilibria: a stable one near $x = 1$ and a saddle closer in; trajectories that start inside the saddle's separatrix are pulled shut. Increase $a$ past $4/27 \approx 0.148$: the two equilibria merge and vanish, and every trajectory runs to $x \to 0$. That is the pick-up current.
:::

The threshold in the figure is found from the static balance $a/x^2 = 1 - x$, which has solutions only while $a \le \max_x x^2(1 - x) = 4/27$, at $x = 2/3$. In physical units the same argument shows that a relay with a linear spring always pulls in once the gap has closed to two thirds of its spring-rest value, if the force varies as $1/x^2$.

::: history
Michael Faraday demonstrated continuous electromagnetic rotation in September 1821, a wire carrying current revolving about a magnet in a cup of mercury. William Sturgeon made the first electromagnet, a varnished iron horseshoe wound with bare wire, in 1825, and Joseph Henry, insulating his wire with silk and winding many layers, built magnets in 1831 that lifted more than a tonne. James Clerk Maxwell's *Treatise on Electricity and Magnetism* (1873) gave the general expression for forces in terms of magnetic stresses. The systematic treatment of electromechanical devices by energy and co-energy methods, as used here, was set out by David White and Herbert Woodson in *Electromechanical Energy Conversion* (1959) and Herbert Woodson and James Melcher in *Electromechanical Dynamics* (1968), both at MIT, building on the co-energy concept introduced in circuit theory in the early 1950s.
:::

## Where this leads

Energy and co-energy are the tools for every force and torque calculation in the rest of the course. In [[electric-machines/dc-machines]] the mutual torque of [[#thm-double]], with the commutator keeping the angle at $90^\circ$, gives a torque proportional to flux times current, and the motional emf of [[#thm-lorentz]] gives the back emf. In [[electric-machines/rotating-magnetic-fields]] we replace single coils by distributed polyphase windings that produce a rotating field, so that the conditions of [[#thm-average-torque]] can be met with steady torque. Reluctance torque reappears in salient-pole synchronous machines and in the stepper and switched-reluctance motors of [[electric-machines/special-machines]]. Actuators, loudspeakers and MEMS devices are analysed with the same equations [[#eq-dynamics]], linearised about an operating point, using the methods of [[control-systems]].

::: summary
- The coupling field of a lossless electromechanical device obeys $\mathrm dW_{\text{fld}} = i\,\mathrm d\lambda - f\,\mathrm dx$; its energy is a state function.
- Force from energy: $f = -\partial W_{\text{fld}}(\lambda, x)/\partial x$ at constant $\lambda$; from co-energy $W' = \int\lambda\,\mathrm di$: $f = +\partial W'(i, x)/\partial x$ at constant $i$. Torque likewise with $\theta$.
- For linear systems $f = \tfrac12i^2\,\mathrm dL/\mathrm dx$: devices move to increase their inductance. The pull on an iron face is $B^2/(2\mu_0)$ per unit area.
- A salient rotor in a single coil gives reluctance torque $-L_2i^2\sin2\theta$; with AC it averages to a nonzero value only at synchronous speed.
- With two windings, $T = \tfrac12i_1^2L_{11}' + \tfrac12i_2^2L_{22}' + i_1i_2L_{12}'$; mutual torque has a nonzero average only if $\omega_m = \omega_1 \pm \omega_2$, the condition behind synchronous, induction and DC machines.
- For conductors in a field, $e = Blu$ and $f = Bli$, so $ei = fu$: the same mechanism makes motors and generators.
:::

## Exercises

::: exercise Magnetic pressure {level=1 check="1.5^2/(2*4*pi*1e-7)"}
Find the magnetic pressure, in pascals, on an iron surface carrying a normal flux density of $1.5\,\mathrm T$.
::: solution
$p = B^2/(2\mu_0) = 2.25/(2\times4\pi\times10^{-7}) = 8.95\times10^5\,\mathrm{Pa}$, about $9$ atmospheres.
:::
:::

::: exercise Force from dL/dx {level=1 check="0.5*3^2*0.2"}
The inductance of a solenoid actuator rises at $0.2\,\mathrm{H/m}$ as the plunger moves in. Find the force on the plunger, in newtons, at $3\,\mathrm A$ (linear iron).
::: solution
$f = \tfrac12i^2\,\mathrm dL/\mathrm dx = \tfrac12\times9\times0.2 = 0.9\,\mathrm N$, inwards.
:::
:::

::: exercise Motional emf {level=1 check="1.2*0.3*15"}
A conductor $0.3\,\mathrm m$ long moves at $15\,\mathrm{m/s}$ perpendicular to a field of $1.2\,\mathrm T$. Find the induced emf in volts.
::: solution
$e = Blu = 1.2\times0.3\times15 = 5.4\,\mathrm V$.
:::
:::

::: exercise Energy and co-energy of a saturating device {level=2 check="1.6*ln(cosh(2))"}
A device at a fixed position has $\lambda(i) = 0.8\tanh(i/2)\,\mathrm{Wb}$. Find its co-energy at $i = 4\,\mathrm A$, in joules.
::: hint
$\int\tanh(i/2)\,\mathrm di = 2\ln\cosh(i/2)$.
:::
::: solution
$W' = \int_0^4 0.8\tanh(i/2)\,\mathrm di = 1.6\ln\cosh2 = 1.6\times1.325 = 2.12\,\mathrm J$. The flux linkage is $0.8\tanh2 = 0.771\,\mathrm{Wb}$, so $i\lambda = 3.08\,\mathrm J$ and the energy is $W = 3.08 - 2.12 = 0.96\,\mathrm J$, less than half the co-energy: saturation makes them very different.
:::
:::

::: exercise Reluctance torque at an angle {level=2 check="0.075*25*sin(pi/3)"}
For the rotor of [[#ex-reluctance-motor]], find the magnitude of the torque, in N·m, at $\theta = 30^\circ$ with $5\,\mathrm A$ DC. In which direction does it act?
::: solution
$T = -L_2i^2\sin2\theta = -0.075\times25\times\sin60^\circ = -1.62\,\mathrm{N\,m}$. The magnitude is $1.62\,\mathrm{N\,m}$; the negative sign means it acts to reduce $\theta$, towards alignment.
:::
:::

::: exercise A linear machine as a generator {level=2 check="(0.4*40-12)/0.1"}
The bar of [[#ex-linear-machine]] is now pushed at a constant $40\,\mathrm{m/s}$ by an external force. Find the current into the battery, in amperes, the external force needed and the efficiency of charging.
::: solution
$e = Blu = 0.4\times40 = 16\,\mathrm V$, so $i = (16 - 12)/0.1 = 40\,\mathrm A$ flows into the battery. The magnetic force opposes motion with $Bli = 16\,\mathrm N$, so the pushing force must be $16\,\mathrm N$, supplying $16\times40 = 640\,\mathrm W$. The battery receives $12\times40 = 480\,\mathrm W$ and the resistance dissipates $160\,\mathrm W$; the efficiency is $75\,\%$. Above the no-load speed of $30\,\mathrm{m/s}$ the motor has become a generator.
:::
:::

::: exercise Force in terms of flux {level=2}
For the electromagnet of [[#ex-electromagnet]], use [[#thm-force-energy]] with $\lambda$ held fixed to show that the force can be written $f = -\lambda^2/(\mu_0N^2A)$, independent of $g$. Explain why the force at constant flux does not depend on the gap, whereas the force at constant current varies as $1/g^2$.
::: solution
$W = \lambda^2/(2L) = \lambda^2\,2g/(2\mu_0N^2A) = \lambda^2g/(\mu_0N^2A)$, so $f = -\partial W/\partial g = -\lambda^2/(\mu_0N^2A)$. With $\lambda = NBA$ this is $-B^2A/\mu_0$: the force depends only on the flux density in the gaps, i.e. on the magnetic pressure. At constant flux, $B$ in the gap does not change as the gap changes, so neither does the force. At constant current, $B = \mu_0Ni/(2g)$ grows as the gap closes, so the force grows as $1/g^2$. Both give the same value at a given state; they differ in how the state evolves with $g$.
:::
:::

::: exercise Saturation does not change the force at given flux {level=3}
An electromagnet with two gaps of total length $2g$ and area $A$ has a saturating iron path, so that $i(\lambda, g) = \dfrac{2g}{\mu_0N^2A}\lambda + c\lambda^3$, the cubic term representing the iron (independent of $g$). (a) Find $W_{\text{fld}}(\lambda, g)$ and the force. (b) For $N = 500$, $A = 10\,\mathrm{cm^2}$, $g = 1\,\mathrm{mm}$ and $c = 20\,\mathrm{A/Wb^3}$, find $\lambda$ and the force at $i = 2\,\mathrm A$ and compare with the linear result $314\,\mathrm N$ of [[#ex-electromagnet]].
::: hint
For (b), solve the cubic for $\lambda$ by bisection or a few Newton steps.
:::
::: solution
(a) $W = \int_0^\lambda i\,\mathrm d\lambda' = \dfrac{g\lambda^2}{\mu_0N^2A} + \dfrac{c\lambda^4}{4}$, so $f = -\partial W/\partial g = -\lambda^2/(\mu_0N^2A)$: the iron term, which does not depend on $g$, contributes nothing. At a given flux the force is that of the gaps alone.

(b) The linear coefficient is $2\times10^{-3}/(4\pi\times10^{-7}\times250\,000\times10^{-3}) = 6.366\,\mathrm{A/Wb}$. Solve $6.366\lambda + 20\lambda^3 = 2$. The linear term alone would give $\lambda = 0.314\,\mathrm{Wb}$; trying $\lambda = 0.26$ gives $1.655 + 0.352 = 2.007$, slightly too large, and bisection converges to $\lambda = 0.2594\,\mathrm{Wb}$ (with $1.651\,\mathrm A$ for the gaps and $0.349\,\mathrm A$ for the iron). The force is $-\lambda^2/(\mu_0N^2A) = -0.0672/0.000314 = -214\,\mathrm N$, compared with $314\,\mathrm N$ for linear iron. Saturation reduces the force by reducing the flux that a given current can produce, not by changing the force at a given flux.
:::
:::

::: exercise Pull-in of a relay {level=3}
A relay armature is held open by a spring of stiffness $k = 200\,\mathrm{N/m}$ whose rest position is a gap $x_0 = 2\,\mathrm{mm}$. The coil inductance is $L(x) = \beta/x$ with $\beta = 4\times10^{-5}\,\mathrm{H\,m}$ (gap reluctance dominant; $x$ is the gap). (a) Show that the magnetic force at constant current is $\beta i^2/(2x^2)$, directed to close the gap. (b) Find the pick-up current, the smallest current at which the armature closes from rest at $x_0$. (c) Find the hold current if the closed armature rests on a $0.1\,\mathrm{mm}$ non-magnetic shim against a hard stop, which the spring must overcome to reopen.
::: hint
For (b), equilibrium requires $\beta i^2/(2x^2) = k(x_0 - x)$. Pull-in occurs when this has no solution; maximise $x^2(x_0 - x)$.
:::
::: solution
(a) $f = \tfrac12i^2\,\mathrm dL/\mathrm dx = -\beta i^2/(2x^2)$, negative: it closes the gap.

(b) Equilibria satisfy $\beta i^2/2 = kx^2(x_0 - x)$. The right side is largest at $x = 2x_0/3$, where it equals $4kx_0^3/27 = 4\times200\times8\times10^{-9}/27 = 2.37\times10^{-7}\,\mathrm{N\,m^2}$. Pull-in occurs when $\beta i^2/2$ exceeds this: $i^2 = 2\times2.37\times10^{-7}/(4\times10^{-5}) = 1.185\times10^{-2}$, $i = 0.109\,\mathrm A$.

(c) Closed at $x = 0.1\,\mathrm{mm}$, the spring force is $k(x_0 - x) = 200\times1.9\times10^{-3} = 0.38\,\mathrm N$. The armature stays closed while $\beta i^2/(2x^2) \ge 0.38$: $i^2 \ge 2\times0.38\times10^{-8}/(4\times10^{-5}) = 1.9\times10^{-4}$, $i \ge 13.8\,\mathrm{mA}$. The drop-out current is about an eighth of the pick-up current, which is why relay coils are often driven with a high pick-up current and a much lower holding current to save power.
:::
:::
