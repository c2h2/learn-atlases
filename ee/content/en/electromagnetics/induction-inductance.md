Static charges make electric fields and steady currents make magnetic fields, and so far the two have lived separate lives. In 1831 Michael Faraday found the link: a **changing** magnetic flux through a circuit drives a current round it, even though no battery is connected. That single discovery underlies almost all of electrical power engineering. Every generator in every power station turns mechanical rotation into voltage by moving conductors through a magnetic field; every transformer moves energy between windings that never touch; every induction motor, wireless charger, metal detector and guitar pickup works the same way. Induction also makes trouble: the hum picked up by a ground loop near a mains cable, the eddy currents that heat transformer cores, the voltage spikes when an inductive load is switched off.

This chapter states Faraday's law, separates its two mechanisms (a circuit moving through a field, and a field changing through a circuit), and draws the most important engineering conclusions: that the electric field is no longer conservative, so Kirchhoff's voltage law needs care; that self- and mutual inductance follow from flux linkage; that magnetic energy is stored in the field with density $\tfrac12\mathbf B\cdot\mathbf H$; and that forces on magnetic structures can be found from that energy by the principle of virtual work. It builds on [[electromagnetics/magnetostatics]]; the physics view is in the Physics Atlas chapters on [Faraday's law](/learn/physics/lesson.php?c=magnetism&l=faraday) and [inductance](/learn/physics/lesson.php?c=magnetism&l=inductance), and the circuit view of coupled coils in [[circuits-2/magnetically-coupled-circuits]].

## Faraday's law

Define the **electromotive force** (emf) round a closed path $C$ as the work done per unit charge by the fields on a charge carried once round the path,

$$
\mathcal E = \oint_C\left(\mathbf E + \mathbf v\times\mathbf B\right)\cdot\mathrm d\mathbf l ,
$$

where $\mathbf v$ is the velocity of the path element (zero for a stationary circuit). In electrostatics $\oint\mathbf E\cdot\mathrm d\mathbf l = 0$ and a stationary circuit has no emf; a battery provides an emf by chemical action. Faraday found that the magnetic flux provides one too.

::: theorem Faraday's law of induction {#thm-faraday}
The emf round any closed path equals the negative rate of change of the magnetic flux through any surface bounded by the path:

$$
\mathcal E = -\frac{\mathrm d\Phi}{\mathrm dt}, \qquad \Phi = \int_S\mathbf B\cdot\mathrm d\mathbf S ,
$$ {#eq-faraday}

with the direction of the path and the normal of $S$ related by the right-hand rule. For a coil of $N$ turns each linking the same flux, $\mathcal E = -N\,\mathrm d\Phi/\mathrm dt = -\mathrm d\lambda/\mathrm dt$, where $\lambda = N\Phi$ is the **flux linkage**.
:::

The minus sign is **Lenz's law**: the induced emf drives a current whose own magnetic field opposes the change of flux. Pushing a magnet into a coil induces a current that repels the magnet; pulling it out induces one that attracts it. Either way you do work against the magnetic force, and that work is the electrical energy delivered. A plus sign would let a small disturbance grow without limit, creating energy from nothing.

The flux through a circuit can change in two ways, and it is useful to treat them separately.

### Transformer emf: a changing field

For a stationary path in a time-varying field, $\mathbf v = \mathbf 0$, and Faraday's law says $\oint_C\mathbf E\cdot\mathrm d\mathbf l = -\int_S\partial\mathbf B/\partial t\cdot\mathrm d\mathbf S$. Applying Stokes's theorem to the left-hand side, for every small surface,

$$
\nabla\times\mathbf E = -\frac{\partial\mathbf B}{\partial t} .
$$ {#eq-faraday-point}

This is the second of Maxwell's equations. A changing magnetic field is surrounded by a **circulating electric field**, whether or not a wire is there to carry a current. The induced field is real: it accelerates electrons in a betatron and drives eddy currents in a block of metal.

::: widget vectorfield
P: k*y*if(x^2 + y^2 < 1, 1, 1/(x^2 + y^2))/2
Q: -k*x*if(x^2 + y^2 < 1, 1, 1/(x^2 + y^2))/2
x: -3, 3
y: -3, 3
streamlines: true
shade: curl
sliders: k=1:-1:1:0.1
caption: The induced electric field around a long solenoid of radius $1$ (cross-section) whose interior flux density changes at the rate $k = \partial B_z/\partial t$. Inside, $E_\phi = -\tfrac12\rho\,\partial B/\partial t$; outside, $E_\phi = -\tfrac{a^2}{2\rho}\,\partial B/\partial t$. The curl shading shows that $\nabla\times\mathbf E$ is non-zero only where $\mathbf B$ is changing, inside the solenoid, yet the electric field circulates outside it too. Reverse $k$ and the circulation reverses, as Lenz's law requires.
:::

::: warning KVL fails where flux is changing
With a changing magnetic field, $\oint\mathbf E\cdot\mathrm d\mathbf l\neq0$, so the "voltage" between two points depends on the path, and Kirchhoff's voltage law is not exact. Circuit theory survives by lumping each changing flux into an inductor or transformer and insisting that no other flux links the loop. In practice the stray flux of nearby currents links every loop you build: the leads of an oscilloscope probe and its ground clip form a loop, and the reading depends on how that loop is routed. Keep measurement loops small and twist the go and return wires.
:::

### Motional emf: a moving circuit

A conductor moving with velocity $\mathbf v$ through a static field $\mathbf B$ carries its free charges along, and each feels the force $Q\mathbf v\times\mathbf B$. Round a closed circuit the motional emf is

$$
\mathcal E = \oint_C(\mathbf v\times\mathbf B)\cdot\mathrm d\mathbf l .
$$ {#eq-motional}

One can show that this equals $-\mathrm d\Phi/\mathrm dt$ for the changing flux through the moving circuit, so [[#eq-faraday]] covers both mechanisms. In general, $\mathcal E = -\int_S\partial\mathbf B/\partial t\cdot\mathrm d\mathbf S + \oint(\mathbf v\times\mathbf B)\cdot\mathrm d\mathbf l$, the transformer and motional parts.

::: example A sliding bar {#ex-sliding-bar}
A metal bar of length $\ell = 0.2\,\mathrm m$ slides at $v = 5\,\mathrm{m/s}$ along two parallel rails joined at one end by a resistor $R = 2\,\Omega$. A uniform field $B = 0.5\,\mathrm T$ is perpendicular to the plane of the rails. Neglecting the resistance of the bar and rails, find the emf, the current, the force needed to keep the bar moving and the power balance.
::: solution
The flux through the circuit is $\Phi = B\ell x$, where $x$ is the distance from the resistor to the bar, and $\mathrm dx/\mathrm dt = v$. So

$$
\abs{\mathcal E} = B\ell v = (0.5)(0.2)(5) = 0.5\,\mathrm V,
$$

and the same follows from [[#eq-motional]] because $\mathbf v\times\mathbf B$ has magnitude $vB$ along the bar and is zero on the stationary parts. The current is $I = 0.5/2 = 0.25\,\mathrm A$, in the direction that by Lenz's law opposes the increase of flux. The current in the bar experiences $F = BI\ell = (0.5)(0.25)(0.2) = 0.025\,\mathrm N$, opposing the motion. To keep $v$ constant an external agent must push with $0.025\,\mathrm N$, delivering mechanical power $Fv = 0.125\,\mathrm W$; the resistor dissipates $I^2R = (0.25)^2(2) = 0.125\,\mathrm W$. The magnetic field converts mechanical into electrical power without itself doing work: the emf and the retarding force are two sides of the same Lorentz force.
:::
:::

::: example The AC generator {#ex-generator}
A rectangular coil of $N = 100$ turns and area $A = 100\,\mathrm{cm^2}$ rotates at $50$ revolutions per second about an axis perpendicular to a uniform field $B = 0.5\,\mathrm T$. Find the emf.
::: solution
If the coil's normal makes angle $\omega t$ with $\mathbf B$, the flux through each turn is $\Phi = BA\cos\omega t$, and

$$
\mathcal E = -N\frac{\mathrm d\Phi}{\mathrm dt} = NBA\omega\sin\omega t .
$$

With $\omega = 2\pi\times50 = 314.2\,\mathrm{rad/s}$, the peak emf is $NBA\omega = (100)(0.5)(0.01)(314.2) = 157\,\mathrm V$, or $111\,\mathrm V$ rms. A sinusoidal voltage arises naturally from uniform rotation, which is one reason power systems are AC. Real generators keep the coils stationary on the stator and rotate the field winding, so that the large currents need no sliding contacts; see [[electric-machines/synchronous-machines]].
:::
:::

::: widget plot
f: N*B*A*w*sin(w*x); N*B*A*cos(w*x)
x: 0, 0.04
sliders: N=100:10:200:10; B=0.5:0.1:1:0.05; A=0.01:0.002:0.02:0.001; w=314.16:100:700:1
labels: \mathcal E(t)\ (\mathrm V); \lambda(t)\ (\mathrm{Wb}\text{-turns})
caption: The emf of the generator of [[#ex-generator]] over two cycles (time in seconds), together with the flux linkage $\lambda = N\Phi$ (too small to see on this scale until you raise $N$, $B$ and $A$; its peak is $NBA$). The emf is largest when the flux is zero and changing fastest, and zero when the flux is at a maximum. Raise the angular speed $\omega$: the emf grows in proportion, which is why generators run fast.
:::

### Eddy currents

A changing flux through a solid piece of metal induces circulating **eddy currents** in it. They dissipate power, and by Lenz's law their field opposes the change. In a transformer core they would be a disaster, so cores are built from thin insulated **laminations** (typically $0.23$–$0.35\,\mathrm{mm}$ silicon steel at $50$–$60\,\mathrm{Hz}$), or from ferrite, whose resistivity is a million times higher. For a lamination of thickness $d$ in a sinusoidal field of peak $B_m$ at frequency $f$, the eddy-current loss per unit volume is approximately $\sigma\pi^2f^2B_m^2d^2/6$: it grows with the square of the thickness, which is why thin laminations help so much. Eddy currents are put to use in induction cooktops, induction furnaces, eddy-current brakes on trains and roller coasters, and non-destructive testing of metal parts.

::: quiz
A copper ring is held around a long solenoid, with a large air gap between the ring and the solenoid windings. The current in the solenoid is increasing. Is there an induced current in the ring?
- [ ] No, because the magnetic field at the ring is zero (it is outside the solenoid).
- [x] Yes, because the flux through the ring is changing, even though $\mathbf B$ is negligible where the copper is.
- [ ] Only if the ring touches the solenoid.
- [ ] Only if the ring is moving.
::: solution
The emf depends on the flux through the ring, which is the flux inside the solenoid, and that flux is changing. The induced electric field circulates outside the solenoid (see the figure above), where it drives the current in the ring. This is how a transformer's secondary winding receives energy: through the electric field it induces, not through any magnetic field at the copper itself.
:::
:::

## Inductance

A current in a circuit produces a magnetic flux, and some of that flux links the circuit itself and any circuits nearby. For linear materials the flux is proportional to the current.

::: definition Self- and mutual inductance {#def-inductance}
The **self-inductance** of a circuit is its flux linkage per unit current,

$$
L = \frac{\lambda}{I} = \frac{N\Phi}{I},
$$

in henrys ($1\,\mathrm H = 1\,\mathrm{Wb/A}$). The **mutual inductance** from circuit 1 to circuit 2 is the flux linkage of circuit 2 per unit current in circuit 1, $M_{21} = \lambda_{21}/I_1 = N_2\Phi_{21}/I_1$.
:::

With these definitions Faraday's law gives the circuit laws $v = L\,\mathrm di/\mathrm dt$ and $v_2 = M\,\mathrm di_1/\mathrm dt$ of [[circuits-1/capacitors-inductors]] and [[circuits-2/magnetically-coupled-circuits]]. Inductance, like capacitance, depends only on geometry and materials.

::: theorem Neumann formula and reciprocity {#thm-neumann}
For two filamentary loops $C_1$ and $C_2$ in a linear medium of permeability $\mu$,

$$
M_{21} = M_{12} = \frac{\mu}{4\pi}\oint_{C_1}\oint_{C_2}\frac{\mathrm d\mathbf l_1\cdot\mathrm d\mathbf l_2}{R}, \qquad R = \abs{\mathbf r_2 - \mathbf r_1} .
$$ {#eq-neumann}
:::

::: proof
The flux through $C_2$ due to current $I_1$ in $C_1$ is the circulation of the vector potential round $C_2$: $\Phi_{21} = \oint_{C_2}\mathbf A_1\cdot\mathrm d\mathbf l_2$, by Stokes's theorem and $\mathbf B = \nabla\times\mathbf A$. By [[electromagnetics/magnetostatics#eq-a]], $\mathbf A_1 = (\mu I_1/4\pi)\oint_{C_1}\mathrm d\mathbf l_1/R$. Substituting and dividing by $I_1$ gives the double integral, which is symmetric in the two loops, so $M_{21} = M_{12}$.
:::

Reciprocity is far from obvious physically (a small coil inside a large one, or the reverse, give the same $M$), and it is what lets us write a single $M$ in coupled-circuit equations. The **coupling coefficient** $k = M/\sqrt{L_1L_2}$ satisfies $0\le k\le1$; power transformers have $k$ above $0.99$, loosely coupled wireless chargers $0.1$–$0.7$.

::: algorithm Computing inductance {#alg-inductance}
1. Assume a current $I$ in the circuit.
2. Find $\mathbf B$ (Ampère's law if the symmetry allows, otherwise Biot–Savart or a numerical solver).
3. Find the flux $\Phi$ through the surface bounded by each turn, and the flux linkage $\lambda$, counting how many turns each part of the flux links.
4. $L = \lambda/I$ (or $M = \lambda_{21}/I_1$). When the current is distributed over a cross-section, as inside a thick wire, use the energy method of [[#thm-magnetic-energy]] instead.
:::

**Long solenoid** of $N$ turns, length $\ell$, cross-section $A$: $B = \mu NI/\ell$, every turn links $\Phi = BA$, so $L = \mu N^2A/\ell$. **Toroid** with rectangular core: from [[electromagnetics/magnetostatics#ex-toroid]], $L = (\mu N^2h/2\pi)\ln(b/a)$. **Coaxial cable**: between the conductors $B = \mu I/(2\pi\rho)$, and the flux through a rectangle of length $\ell$ spanning $a < \rho < b$ is $(\mu I\ell/2\pi)\ln(b/a)$, so the **external inductance** per unit length is

$$
L'_{\text{ext}} = \frac{\mu}{2\pi}\ln\frac ba .
$$ {#eq-l-coax}

**Two-wire line** of wire radius $a$ and spacing $D\gg a$: $L'_{\text{ext}}\approx(\mu/\pi)\ln(D/a)$.

::: example Inductance of a coaxial cable {#ex-coax-l}
Find the external inductance per metre of the cable of [[electromagnetics/conductors-dielectrics#ex-rg58]] ($a = 0.45\,\mathrm{mm}$, $b = 1.475\,\mathrm{mm}$, non-magnetic), the internal inductance of its solid inner conductor at low frequency, and the quantities $\sqrt{L'/C'}$ and $1/\sqrt{L'C'}$ using the external inductance and $C' = 105.4\,\mathrm{pF/m}$.
::: solution
By [[#eq-l-coax]], $L'_{\text{ext}} = (2\times10^{-7})\ln(3.278) = 2.374\times10^{-7}\,\mathrm{H/m} = 0.237\,\mathrm{\mu H/m}$. The internal inductance of a round conductor with uniform current is $\mu_0/(8\pi) = 0.05\,\mathrm{\mu H/m}$ (exercise below), so at low frequency the total is about $0.29\,\mathrm{\mu H/m}$. At radio frequencies the current crowds onto the surface of the conductor (the skin effect of [[electromagnetics/plane-waves]]) and the internal part disappears. Then

$$
\sqrt{\frac{L'}{C'}} = \sqrt{\frac{2.374\times10^{-7}}{1.054\times10^{-10}}} = 47.5\,\Omega, \qquad \frac{1}{\sqrt{L'C'}} = 2.00\times10^8\,\mathrm{m/s} .
$$

The first is close to the cable's nominal $50\,\Omega$ characteristic impedance and the second is exactly $c/\sqrt{\epsilon_r} = 3.00\times10^8/1.5$: as we shall prove in [[electromagnetics/transmission-lines]], $L'C' = \mu\epsilon$ for any two-conductor line in a uniform medium.
:::
:::

::: example Hum pickup from a mains cable {#ex-hum}
A long cable carries a $50\,\mathrm{Hz}$ current of $10\,\mathrm A$ rms, and its return conductor is far away. A rectangular loop formed by signal wiring, $10\,\mathrm{cm}$ by $10\,\mathrm{cm}$, lies in the same plane with its near side $1\,\mathrm{cm}$ from the cable and parallel to it. Find the mutual inductance and the induced emf.
::: solution
The field of the cable is $B = \mu_0I/(2\pi\rho)$, perpendicular to the plane. The flux through the loop, whose sides run from $\rho = d = 1\,\mathrm{cm}$ to $\rho = d + w = 11\,\mathrm{cm}$ over a length $h = 10\,\mathrm{cm}$, is

$$
\Phi = \int_d^{d+w}\frac{\mu_0I}{2\pi\rho}h\,\mathrm d\rho = \frac{\mu_0Ih}{2\pi}\ln\frac{d+w}{d}, \qquad M = \frac{\mu_0h}{2\pi}\ln 11 = (2\times10^{-7})(0.1)(2.398) = 4.80\times10^{-8}\,\mathrm H .
$$

The induced emf is $\omega MI = (314.2)(4.80\times10^{-8})(10) = 1.51\times10^{-4}\,\mathrm V$, or $0.15\,\mathrm{mV}$ rms. That is negligible for a loudspeaker but large compared with the $\mathrm{\mu V}$ signals of a microphone or a thermocouple. Twisting the signal pair reverses the loop orientation every half-twist, so successive contributions cancel; keeping the cable's go and return conductors together reduces the field itself.
:::
:::

## Magnetic energy

Establishing a current in an inductor requires work against the induced emf: the source must supply $vi = Li\,\mathrm di/\mathrm dt$, and the energy delivered while the current rises from $0$ to $I$ is $\int_0^ILi\,\mathrm di = \tfrac12LI^2$. As with the capacitor, field theory locates this energy in the field.

::: theorem Magnetic energy {#thm-magnetic-energy}
The energy stored in the magnetic field of a system of steady currents in linear media is

$$
W_m = \frac12\int_{\text{all space}}\mathbf B\cdot\mathbf H\,\mathrm dv = \frac12\int\mathbf J\cdot\mathbf A\,\mathrm dv ,
$$ {#eq-wm}

with energy density $w_m = \tfrac12\mathbf B\cdot\mathbf H = B^2/(2\mu)$. For a single circuit $W_m = \tfrac12LI^2$, and for two coupled circuits $W_m = \tfrac12L_1I_1^2 + MI_1I_2 + \tfrac12L_2I_2^2$.
:::

::: proof
Raise all currents together from zero, as $\lambda\mathbf J$ with $\lambda$ from $0$ to $1$. At stage $\lambda$ the vector potential is $\lambda\mathbf A$, and the induced field $-\partial(\lambda\mathbf A)/\partial t$ acts on the current $\lambda\mathbf J$; the sources must do work against it at the rate $\int\lambda\mathbf J\cdot\mathbf A\,\dot\lambda\,\mathrm dv$. Integrating over $\lambda$ gives $\tfrac12\int\mathbf J\cdot\mathbf A\,\mathrm dv$. Now substitute $\mathbf J = \nabla\times\mathbf H$ and use $\nabla\cdot(\mathbf A\times\mathbf H) = \mathbf H\cdot\nabla\times\mathbf A - \mathbf A\cdot\nabla\times\mathbf H$:

$$
\frac12\int\mathbf A\cdot\nabla\times\mathbf H\,\mathrm dv = \frac12\int\mathbf H\cdot\mathbf B\,\mathrm dv - \frac12\oint_{S_\infty}(\mathbf A\times\mathbf H)\cdot\mathrm d\mathbf S .
$$

For bounded currents $A\sim1/r$ and $H\sim1/r^2$ far away, so the surface term vanishes as $S$ recedes. For a single filament $\int\mathbf J\cdot\mathbf A\,\mathrm dv = I\oint\mathbf A\cdot\mathrm d\mathbf l = I\Phi = LI^2$, giving $\tfrac12LI^2$.
:::

The energy formula is also the best definition of inductance when the current is spread out, because "flux linkage" is then ambiguous: $L = 2W_m/I^2$. In a ferromagnetic material the $B$–$H$ relation is non-linear and hysteretic, and the energy per unit volume supplied while $B$ changes is $\int\mathbf H\cdot\mathrm d\mathbf B$; round a complete cycle this is the area of the hysteresis loop, lost as heat.

## Magnetic forces from energy

Forces on magnetic structures (the pull of a relay armature, the torque of a motor, the attraction of an electromagnet) are usually hard to compute from $I\,\mathrm d\mathbf l\times\mathbf B$, because the field is in iron and air gaps of complicated shape. Energy gives them directly.

::: theorem Virtual work {#thm-virtual-work}
If a part of a magnetic system is displaced by $\mathrm dx$ while the flux linkages are held constant, the force on it in the $x$ direction is

$$
F_x = -\left.\frac{\partial W_m}{\partial x}\right|_{\lambda\ \text{constant}} ;
$$

if instead the currents are held constant, $F_x = +\partial W_m/\partial x\big|_{I}$. Both give the same force. For a single circuit, $F_x = \tfrac12I^2\,\mathrm dL/\mathrm dx$.
:::

::: proof
At constant flux linkage there is no induced emf, so the sources deliver no energy; the mechanical work $F_x\,\mathrm dx$ must come out of the stored energy, $F_x\,\mathrm dx = -\mathrm dW_m$. At constant current, a displacement changes $\lambda$ by $I\,\mathrm dL$ and the source delivers $I\,\mathrm d\lambda = I^2\,\mathrm dL$ against the induced emf; the stored energy $\tfrac12LI^2$ rises by $\tfrac12I^2\,\mathrm dL$, so the other half, $F_x\,\mathrm dx = \tfrac12I^2\,\mathrm dL = \mathrm dW_m$, is mechanical work. The two expressions agree because, at constant $\lambda$, $W_m = \lambda^2/(2L)$ and $-\partial(\lambda^2/2L)/\partial x = (\lambda^2/2L^2)\,\mathrm dL/\mathrm dx = \tfrac12I^2\,\mathrm dL/\mathrm dx$.
:::

Applied to a gap between two flat iron faces of area $A$ carrying flux density $B$ (normal to the faces), opening the gap by $\mathrm dx$ at constant flux adds a volume $A\,\mathrm dx$ of field with energy density $B^2/(2\mu_0)$, the iron storing negligible energy. Thus the faces attract with force

$$
F = \frac{B^2A}{2\mu_0} ,
$$ {#eq-pull}

a **magnetic pressure** of $B^2/(2\mu_0)$, about $400\,\mathrm{kPa}$ (four atmospheres) at $1\,\mathrm T$.

::: example Designing a lifting magnet {#ex-lifting-magnet}
A U-shaped electromagnet must hold a steel plate of mass $100\,\mathrm{kg}$. Each of its two pole faces has area $10\,\mathrm{cm^2}$, and paint and surface roughness leave an effective air gap of $0.5\,\mathrm{mm}$ at each face. Find the flux density needed, and the number of ampere-turns, neglecting the reluctance of the iron. If the winding has $500$ turns, what current is required?
::: solution
The weight is $mg = 100\times9.81 = 981\,\mathrm N$, shared by two faces of total area $A = 2\times10^{-3}\,\mathrm m^2$. By [[#eq-pull]], $B^2A/(2\mu_0) = 981\,\mathrm N$, so

$$
B = \sqrt{\frac{2\mu_0F}{A}} = \sqrt{\frac{2(1.2566\times10^{-6})(981)}{2\times10^{-3}}} = 1.11\,\mathrm T .
$$

The flux crosses two gaps in series, of total length $2g = 1\,\mathrm{mm}$. If the iron has negligible reluctance, Ampère's law round the magnetic circuit gives $NI = H_{\text{gap}}\cdot2g = (B/\mu_0)(2g)$:

$$
NI = \frac{1.11\times10^{-3}}{1.2566\times10^{-6}} = 884\,\mathrm{A\text{-}turns}, \qquad I = \frac{884}{500} = 1.77\,\mathrm A .
$$

The flux density is below the saturation of mild steel (about $1.5$–$1.8\,\mathrm T$), so the design is feasible. A designer would add a safety factor of two or three on the force (the holding force falls rapidly with gap, as $1/g^2$ at fixed current), and check the iron path, which needs perhaps $10$–$20\,\%$ more ampere-turns.
:::
:::

::: quiz
An electromagnet holds a plate across a small air gap with the coil current held constant. The gap is halved. What happens to the holding force, neglecting iron reluctance?
- [ ] It halves.
- [ ] It doubles.
- [x] It increases about fourfold.
- [ ] It is unchanged, because the current is unchanged.
::: solution
With iron reluctance neglected, $B = \mu_0NI/(2g)$, so halving $g$ doubles $B$. The force $B^2A/(2\mu_0)$ goes as $B^2$, so it rises by four. This steep dependence on the gap is why magnetic latches snap shut and why relays need a return spring stronger than the force at the open position but weaker than at the closed one.
:::
:::

::: application Wireless charging
A Qi phone charger is a loosely coupled transformer. A flat spiral coil in the pad, driven at roughly $100$–$200\,\mathrm{kHz}$, links part of its flux with a similar coil in the phone; ferrite sheets behind both coils shape the field and shield the electronics. Because the coupling coefficient is well below one, each coil is resonated with a capacitor so that the large magnetising current circulates in the resonant circuit rather than in the driver, and the power transferred depends on the mutual inductance, which falls rapidly as the phone is moved off-centre. Misalignment detection and foreign-object detection (a coin heated by eddy currents would absorb power) are part of the standard.
:::

::: history
Michael Faraday discovered electromagnetic induction on 29 August 1831, with two coils wound on an iron ring: closing or opening the circuit of one coil caused a momentary current in the other. Within weeks he had induced currents by moving magnets and built the first dynamo, a copper disc turning between the poles of a magnet. Joseph Henry in Albany observed self-induction and mutual induction independently around the same time, and the unit of inductance is named after him. Heinrich Lenz stated his rule for the direction of induced currents in 1834. Franz Neumann gave the mathematical theory of induction, including the formula for mutual inductance, in 1845, and Léon Foucault demonstrated eddy currents in a rotating copper disc in 1855. The integral form $\mathcal E = -\mathrm d\Phi/\mathrm dt$ and the field form $\nabla\times\mathbf E = -\partial\mathbf B/\partial t$ are Maxwell's.
:::

## Where this leads

Faraday's law is the second of Maxwell's equations; in [[electromagnetics/maxwells-equations]] Maxwell adds the displacement current to Ampère's law, and the two curl equations together produce electromagnetic waves. Inductance per unit length and capacitance per unit length combine into the characteristic impedance and wave speed of [[electromagnetics/transmission-lines]]. Transformers and the magnetic-circuit design of inductors are the subject of [[electric-machines/transformers]] and [[electric-machines/magnetic-circuits]], and the conversion of energy between electrical and mechanical forms through the virtual-work principle is the foundation of [[electric-machines/energy-conversion]].

::: summary
- Faraday's law: $\mathcal E = -\mathrm d\lambda/\mathrm dt$; the minus sign (Lenz's law) makes induced currents oppose the change of flux.
- In point form $\nabla\times\mathbf E = -\partial\mathbf B/\partial t$: a changing $\mathbf B$ is circled by an electric field, so $\mathbf E$ is no longer conservative and KVL holds only if stray flux is excluded from the loop.
- Motional emf $\oint(\mathbf v\times\mathbf B)\cdot\mathrm d\mathbf l$ explains generators: a coil rotating at $\omega$ produces $NBA\omega\sin\omega t$.
- Inductance is flux linkage per unit current: $\mu N^2A/\ell$ for a solenoid, $(\mu/2\pi)\ln(b/a)$ per metre for coax; mutual inductance is reciprocal by Neumann's formula.
- Magnetic energy is $\tfrac12LI^2 = \tfrac12\int\mathbf B\cdot\mathbf H\,\mathrm dv$, density $B^2/(2\mu)$; hysteresis loss per cycle is the loop area.
- Forces follow from energy by virtual work: $F = \tfrac12I^2\,\mathrm dL/\mathrm dx$, and iron faces attract with pressure $B^2/(2\mu_0)$.
:::

## Exercises

::: exercise Average emf {level=1 check="10"}
The flux through each turn of a $50$-turn coil changes uniformly by $0.02\,\mathrm{Wb}$ in $0.1\,\mathrm s$. Find the magnitude of the induced emf, in volts.
::: solution
$\abs{\mathcal E} = N\,\Delta\Phi/\Delta t = 50\times0.02/0.1 = 10\,\mathrm V$.
:::
:::

::: exercise A solenoid's inductance {level=1 check="4*pi*1e-7*200^2*pi*0.01^2/0.1"}
An air-cored solenoid has $200$ turns on a length of $10\,\mathrm{cm}$ and a radius of $1\,\mathrm{cm}$. Estimate its inductance in henrys with the long-solenoid formula. Is the estimate high or low?
::: solution
$L = \mu_0N^2A/\ell = (4\pi\times10^{-7})(4\times10^4)(\pi\times10^{-4})/0.1 = 1.58\times10^{-4}\,\mathrm H = 158\,\mathrm{\mu H}$. The formula assumes the full central field over the whole length, but the field falls to half at the ends, so the estimate is high; for a length-to-diameter ratio of $5$, the correction (Nagaoka's coefficient) is about $0.92$, giving roughly $145\,\mathrm{\mu H}$.
:::
:::

::: exercise Stored energy {level=1 check="0.5*10e-3*3^2"}
A $10\,\mathrm{mH}$ inductor carries $3\,\mathrm A$. How much energy does it store, in joules?
::: solution
$W = \tfrac12LI^2 = \tfrac12(0.01)(9) = 0.045\,\mathrm J = 45\,\mathrm{mJ}$. Interrupting this current in $1\,\mathrm{\mu s}$ would require $L\,\mathrm di/\mathrm dt = 30\,\mathrm{kV}$: hence flyback diodes across relay coils.
:::
:::

::: exercise Generator rms voltage {level=2 check="100*0.5*0.01*2*pi*50/sqrt(2)"}
Find the rms emf, in volts, of the generator of [[#ex-generator]]. What speed in revolutions per second would be needed to produce $230\,\mathrm V$ rms with the same coil and field?
::: solution
$E_{\text{rms}} = NBA\omega/\sqrt2 = 157.1/\sqrt2 = 111.1\,\mathrm V$. The emf is proportional to speed, so $230\,\mathrm V$ needs $50\times230/111.1 = 104\,\mathrm{rev/s}$, at which point the frequency is also $104\,\mathrm{Hz}$. In practice the field or the number of turns is increased instead, since the frequency is fixed by the grid.
:::
:::

::: exercise Mutual inductance of nested coils {level=2 check="4*pi*1e-7*(1000/0.5)*100*pi*0.01^2"}
A long solenoid of $1000$ turns and length $50\,\mathrm{cm}$ contains, near its centre, a small coaxial coil of $100$ turns and radius $1\,\mathrm{cm}$. Find the mutual inductance in henrys.
::: solution
Current $I_1$ in the solenoid gives $B = \mu_0(N_1/\ell)I_1$ over the small coil, whose flux linkage is $N_2B\pi a^2$. So $M = \mu_0(N_1/\ell)N_2\pi a^2 = (4\pi\times10^{-7})(2000)(100)(\pi\times10^{-4}) = 7.90\times10^{-5}\,\mathrm H$. By reciprocity, this is also the flux linkage of the solenoid per ampere in the small coil, a quantity that would be very hard to compute directly.
:::
:::

::: exercise Two-wire line inductance {level=2 check="4*pi*1e-7/pi*log(20)"}
Find the external inductance per metre, in $\mathrm{H/m}$, of a two-wire line with wire radius $0.5\,\mathrm{mm}$ and centre spacing $10\,\mathrm{mm}$ in air, and the product $L'C'$ with the capacitance found in [[electromagnetics/conductors-dielectrics]].
::: solution
$L' = (\mu_0/\pi)\ln(D/a) = (4\times10^{-7})\ln20 = 1.20\times10^{-6}\,\mathrm{H/m}$. With $C' = \pi\epsilon_0/\ln(D/a)$, $L'C' = \mu_0\epsilon_0 = 1/c^2$, independent of the dimensions, as for the coaxial cable.
:::
:::

::: exercise The ring around a solenoid {level=2 check="pi*0.02^2*100"}
A long solenoid of radius $2\,\mathrm{cm}$ has an internal flux density increasing at $100\,\mathrm{T/s}$. Find the emf, in volts, induced in a single-turn ring of radius $5\,\mathrm{cm}$ coaxial with it, and the induced electric field at the ring.
::: solution
The flux through the ring is the flux inside the solenoid, $\pi(0.02)^2B$, so $\abs{\mathcal E} = \pi(0.02)^2(100) = 0.126\,\mathrm V$, independent of the ring's radius (as long as it encloses the solenoid). By symmetry $E_\phi$ is uniform round the ring, so $E = \mathcal E/(2\pi\times0.05) = 0.40\,\mathrm{V/m}$.
:::
:::

::: exercise Internal inductance {level=3}
A long straight round wire of radius $a$ carries current $I$ uniformly distributed over its cross-section. Use the energy stored inside the wire to show that its internal inductance per unit length is $\mu_0/(8\pi)$, independent of radius.
::: hint
From [[electromagnetics/magnetostatics#ex-ampere-coax]], $H_\phi = I\rho/(2\pi a^2)$ inside the wire. Integrate $\tfrac12\mu_0H^2$ over a cylindrical shell of length $1\,\mathrm m$.
:::
::: solution
The energy per unit length inside the wire is

$$
W' = \int_0^a\frac12\mu_0\left(\frac{I\rho}{2\pi a^2}\right)^2 2\pi\rho\,\mathrm d\rho = \frac{\mu_0I^2}{4\pi a^4}\int_0^a\rho^3\,\mathrm d\rho = \frac{\mu_0I^2}{16\pi} .
$$

Setting $W' = \tfrac12L'_{\text{int}}I^2$ gives $L'_{\text{int}} = \mu_0/(8\pi) = 0.05\,\mathrm{\mu H/m}$, for any radius. (Using flux linkage instead requires weighting the flux at radius $\rho$ by the fraction $\rho^2/a^2$ of the current it encircles, which gives the same answer but is easy to get wrong; the energy method avoids the ambiguity.)
:::
:::

::: exercise The force on a plunger {level=3}
A solenoid actuator's inductance varies with plunger position $x$ as $L(x) = L_0 + L_1x/x_0$ for $0 < x < x_0$, with $L_0 = 20\,\mathrm{mH}$, $L_1 = 30\,\mathrm{mH}$ and $x_0 = 2\,\mathrm{cm}$. Find the force on the plunger at a constant current of $1\,\mathrm A$, and say in which direction it acts. Check your answer by computing the energy balance for a small displacement.
::: solution
By [[#thm-virtual-work]], $F = \tfrac12I^2\,\mathrm dL/\mathrm dx = \tfrac12(1)^2(0.03/0.02) = 0.75\,\mathrm N$, in the direction of increasing $x$ (increasing inductance): the plunger is pulled into the coil. For a displacement $\mathrm dx = 1\,\mathrm{mm}$, $\mathrm dL = 1.5\,\mathrm{mH}$; the source supplies $I^2\,\mathrm dL = 1.5\,\mathrm{mJ}$; the stored energy rises by $\tfrac12I^2\,\mathrm dL = 0.75\,\mathrm{mJ}$; the remaining $0.75\,\mathrm{mJ}$ is the mechanical work $F\,\mathrm dx = 0.75\,\mathrm N\times1\,\mathrm{mm}$.
:::
:::
