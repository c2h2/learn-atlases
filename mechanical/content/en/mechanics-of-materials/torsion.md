A shaft is the one structural member that most engineers design without much thought, and it is the one most often under-sized. A motor delivers a torque, a coupling applies it at one end, gears and pulleys peel it off at intervals along the length, and what is left inside the shaft at any section is the algebraic sum of everything beyond that section. Get the torque diagram wrong and the shaft is over-stressed where you never looked; get the diameter wrong and it twists so much that gears misalign and bearings wear out of truth.

Torsion is also the cleanest theory in the course. For a circular shaft the elastic solution is *exact*, not approximate: plane sections stay plane, radii stay straight, and the shear stress varies linearly from zero at the axis to a maximum at the surface. That exactness is why circular shafts are universal and why a square or a keywayed shaft behaves differently in kind, not merely in degree. The moment you leave a circle — a slot, a flat, a thin wall, a crack — you either warp or you do not, and the whole design changes.

::: warning Circular shafts only
$\tau = T \rho / J$ and $\phi = T L / J G$ are exact for a **circular** shaft, solid or hollow, prismatic and linear elastic. For a non-circular *solid* section the shaft warps out of its plane, the stress is zero at the boundary of a convex section's corners, and the torsion constant $J$ is not the polar second moment: for a rectangle $J = \beta_1 b t^{3}$ with $\beta_1$ between $0.141$ and $0.333$. For a thin-walled **open** section — a slit tube, a channel, an angle — $J = \tfrac{1}{3} \sum s t^{3}$, which for a slit tube is a factor of $2 t^{2} / r^{2}$ smaller than the closed tube of the same gauge. A slit tube of $80\ \mathrm{mm}$ diameter and $3\ \mathrm{mm}$ wall is $530$ times less stiff in torsion than the same tube with the slit welded shut. Never apply the circular formula to a shape that is not round.
:::

## Circular shafts

::: definition Torsion of a circular shaft {#def-torsion}
For a shaft of radius $c$ and polar second moment $J$ carrying a torque $T$,
$$
\tau = \frac{T \rho}{J}, \qquad
\tau_{\max} = \frac{T c}{J} = \frac{T}{J / c}, \qquad
J = \frac{\pi c^{4}}{2} = \frac{\pi D^{4}}{32},
$$
with $J / c = \pi D^{3} / 16$ the **torsional section modulus**. For a hollow shaft,
$$
J = \frac{\pi \left( D_o^{4} - D_i^{4} \right)}{32}, \qquad
\frac{J}{c} = \frac{\pi \left( D_o^{4} - D_i^{4} \right)}{16 D_o} .
$$
The **angle of twist** over a length $L$ is
$$
\phi = \frac{T L}{J G} \quad \text{(radians)}, \qquad \gamma_{\max} = \frac{c \phi}{L} = \frac{\tau_{\max}}{G} .
$$
:::

::: proposition Power, torque and speed {#prop-power}
A shaft transmitting power $\mathcal{P}$ at $n$ revolutions per minute carries a torque
$$
T = \frac{\mathcal{P}}{\omega} = \frac{60 \, \mathcal{P}}{2 \pi n}, \qquad
\mathcal{P} = T \omega = T \frac{2 \pi n}{60} = 2 \pi n T \times 10^{-3} \ \mathrm{kW} \text{ at rev/s}.
$$
For the common case of power in $\mathrm{kW}$ and torque in $\mathrm{N\,m}$,
$$
T = 9549 \, \frac{\mathcal{P} \text{ (kW)}}{n \text{ (rpm)}} .
$$
:::

::: proof
Work per revolution is torque times angle, $T \times 2 \pi$, and there are $n / 60$ revolutions per second, so
$$
\mathcal{P} = \frac{2 \pi n T}{60}
\quad\Longrightarrow\quad
T = \frac{60 \mathcal{P}}{2 \pi n} = 9.549 \frac{\mathcal{P} \text{ (W)}}{n} = 9549 \frac{\mathcal{P} \text{ (kW)}}{n} .
$$
The consequence dominates transmission design: at fixed power, torque is inversely proportional to speed, so a high-speed shaft is small and a low-speed one is enormous. A $75\ \mathrm{kW}$ drive at $1500\ \mathrm{rev / min}$ needs $477\ \mathrm{N\,m}$; the same power through a $20:1$ gearbox at $75\ \mathrm{rev / min}$ needs $9550\ \mathrm{N\,m}$, twenty times as much, which is why a wind turbine's low-speed shaft is a metre across and its high-speed shaft is a wrist.
:::

::: example Shaft with gears {#ex-shaft-gears}
A steel shaft runs in free-rotating bearings at $A$ and $E$ in the order $A$-$B$-$C$-$D$-$E$. A torque of $2500\ \mathrm{N\,m}$ is applied at gear $B$; $1500\ \mathrm{N\,m}$ is taken off at $C$ and $1000\ \mathrm{N\,m}$ at $D$. The lengths are $A B = 0.4\ \mathrm{m}$, $B C = 0.8\ \mathrm{m}$, $C D = 0.6\ \mathrm{m}$, $D E = 0.4\ \mathrm{m}$, and the diameter is $60\ \mathrm{mm}$. With $G = 80\ \mathrm{GPa}$, find the maximum shear stress and the twist of $D$ relative to $A$.
::: solution
**Torque diagram**, working from the free end $A$ and adding each applied torque as it is passed:
$$
T_{AB} = 0, \qquad
T_{BC} = + 2500\ \mathrm{N\,m}, \qquad
T_{CD} = 2500 - 1500 = + 1000\ \mathrm{N\,m}, \qquad
T_{DE} = 1000 - 1000 = 0 .
$$
*Check*: the torque returns to zero at the far bearing, which it must because neither bearing transmits torque. The maximum internal torque is $2500\ \mathrm{N\,m}$ in $B C$.

**Stress.** With $J = \pi \times 0.060^{4} / 32 = 1.2723 \times 10^{-6}\ \mathrm{m^{4}}$,
$$
\tau_{\max} = \frac{2500 \times 0.030}{1.2723 \times 10^{-6}} = 58.9\ \mathrm{MPa}.
$$
**Twist of $D$ relative to $A$.**
$$
\phi_{D / A} = \frac{1}{J G} \sum T_i L_i
= \frac{2500 \times 0.8 + 1000 \times 0.6}{1.2723 \times 10^{-6} \times 80 \times 10^{9}}
= \frac{2600}{101.8} = 0.02554\ \mathrm{rad} = 1.46^{\circ} .
$$
*Sanity.* Machine shafts are commonly limited to about $1^{\circ}$ per metre of twist or about $56\ \mathrm{MPa}$ of shear. This shaft twists at $2500 / (J G) = 0.0246\ \mathrm{rad / m} = 1.41^{\circ} / \mathrm{m}$ in its worst section and reaches $58.9\ \mathrm{MPa}$, so it fails both criteria marginally. It is a **stress** problem more than a stiffness problem, and the fix is a larger diameter or a better fillet at the gear shoulder — where the stress concentration, not the nominal $58.9\ \mathrm{MPa}$, decides the life. Note also that the peak torque sits in the **longest** section, which is the worst arrangement: putting the input gear at the middle of the span rather than at one end would halve both the peak torque and the twist.
:::
:::

::: example Hollow versus solid {#ex-hollow}
A solid steel shaft of $50\ \mathrm{mm}$ diameter carries $1200\ \mathrm{N\,m}$. It is to be replaced by a hollow shaft of $60\ \mathrm{mm}$ outside diameter carrying the same torque at the same maximum stress. Find the inside diameter and the weight saving.
::: solution
The solid shaft's stress is
$$
\tau = \frac{16 \times 1200}{\pi \times 0.050^{3}} = 48.9\ \mathrm{MPa}.
$$
Equating $T c / J$ for the hollow shaft,
$$
J_{\text{req}} = \frac{T \left( D_o / 2 \right)}{\tau}
= \frac{1200 \times 0.030}{48.9 \times 10^{6}} = 7.362 \times 10^{-7}\ \mathrm{m^{4}},
$$
$$
D_i^{4} = D_o^{4} - \frac{32 J_{\text{req}}}{\pi}
= 1.296 \times 10^{-5} - 7.507 \times 10^{-6} = 5.453 \times 10^{-6}
\quad\Longrightarrow\quad
D_i = 48.3\ \mathrm{mm}, \quad \frac{D_i}{D_o} = 0.806 .
$$
The area ratio is
$$
\frac{A_{\text{hollow}}}{A_{\text{solid}}} = \frac{60^{2} - 48.3^{2}}{50^{2}} = \frac{3600 - 2333}{2500} = 0.507 ,
$$
a **49 per cent weight saving** at identical stress and identical torque.

*Sanity.* The hollow shaft is also stiffer: $J$ rises from $6.14 \times 10^{-7}$ to $7.36 \times 10^{-7}\ \mathrm{m^{4}}$, $20$ per cent more for half the weight, because the material removed from the middle was doing almost nothing — the shear stress at radius $\rho$ is proportional to $\rho$, so the inner half of the radius carries less than a quarter of the surface stress and contributes even less to $J$, which weights by $\rho^{3}$. This is why every rotating shaft worth its weight is hollow: propeller shafts, drill rods, bicycle bottom-bracket spindles and turbine rotors all bore out the middle. The limit is set by the need to fit a mandrel, to key a gear, or to pass fluid or a cable down the bore.
:::
:::

::: proposition Strain energy in torsion {#prop-torsion-energy}
A shaft of length $L$ carrying a torque $T$ stores
$$
U = \frac{T^{2} L}{2 G J} = \frac{\tau_{\max}^{2}}{4 G} \times (\text{volume}),
$$
so the **modulus of resilience in shear** is $u = \tau_y^{2} / (4 G)$ per unit volume — half the value for axial loading, for the same limiting stress.
:::

::: proof
By the same argument as for axial load, the work done by a torque growing from zero to $T$ through an angle $\phi = T L / J G$ is
$$
U = \tfrac{1}{2} T \phi = \frac{T^{2} L}{2 G J} .
$$
Substituting $T = \tau_{\max} J / c$ and $L = $ volume over area gives
$$
U = \frac{\tau_{\max}^{2} J L}{2 G c^{2} A} = \frac{\tau_{\max}^{2}}{4 G} (A L)
$$
after using $J / (A c^{2}) = \tfrac{1}{2}$ for a solid or hollow circular section — the factor that makes the shear resilience half the axial one. The result is the design basis of the **torsion bar spring**, which stores shear energy in a straight bar twisted about its axis and is the reason military vehicles, racing cars and tank suspensions use a bar in torsion instead of a coil: the spring is the structure, it needs no guide, and it can be buried in the hull.
:::

::: example Torsion bar spring {#ex-torsion-bar}
A torsion bar of diameter $25\ \mathrm{mm}$ and length $1.2\ \mathrm{m}$ is made from a spring steel with $\tau_y = 500\ \mathrm{MPa}$ and $G = 80\ \mathrm{GPa}$. Find the angle of twist at yield and the energy stored.
::: solution
$$
\phi_y = \frac{\tau_y L}{G c} = \frac{500 \times 10^{6} \times 1.2}{80 \times 10^{9} \times 0.0125}
= 0.600\ \mathrm{rad} = 34.4^{\circ},
$$
$$
u = \frac{\tau_y^{2}}{4 G} = \frac{(500 \times 10^{6})^{2}}{4 \times 80 \times 10^{9}} = 781\ \mathrm{kJ / m^{3}},
\qquad
V = \frac{\pi \times 0.025^{2}}{4} \times 1.2 = 5.89 \times 10^{-4}\ \mathrm{m^{3}},
$$
$$
U = 781 \times 10^{3} \times 5.89 \times 10^{-4} = 460\ \mathrm{J}.
$$
*Sanity.* A $34^{\circ}$ elastic twist is enormous, and it is available only because the bar is long and slender: the strain is $\tau / G = 0.00625$, and at that strain a $1.2\ \mathrm{m}$ bar of $25\ \mathrm{mm}$ diameter can rotate through more than half a radian. The energy density of $781\ \mathrm{kJ / m^{3}}$ is respectable — a coil spring of the same steel reaches about $1.5$ times as much per unit weight, because a helical spring uses torsion **and** shear and works the whole wire at nearly the maximum stress, whereas a torsion bar wastes its core.
:::
:::

## Statically indeterminate shafts

::: algorithm Indeterminate shafts {#alg-shaft-indet}
1. Draw the **torque diagram** as far as equilibrium allows. If the end reactions (the wall torques) exceed the equilibrium equations by $n$, the shaft is indeterminate to the $n$-th degree.
2. **Release** $n$ constraints: cut the shaft, or replace a built-in end by an applied torque $T_0$.
3. Compute the **angle of twist** at each release due to the applied torques and due to a unit redundant.
4. **Impose compatibility**: a built-in end has $\phi = 0$; two ends of a compound shaft joined to a rigid flange have equal twist; a spring support has $\phi = T / k_\theta$.
5. Solve, then recover the torque diagram, stresses and twists.
:::

::: example Shaft fixed at both ends {#ex-shaft-fixed}
A steel shaft of uniform diameter $50\ \mathrm{mm}$ and total length $1.2\ \mathrm{m}$ is built into rigid walls at both ends. A torque of $800\ \mathrm{N\,m}$ is applied at a collar $0.4\ \mathrm{m}$ from the left wall. Find the wall torques and the maximum stress.
::: solution
**Equilibrium.** $T_A + T_B = 800\ \mathrm{N\,m}$ — one equation, two unknowns.

**Compatibility.** Neither wall rotates, so the twist of the left segment equals the (oppositely signed) twist of the right:
$$
\frac{T_A \times 0.4}{J G} = \frac{T_B \times 0.8}{J G}
\quad\Longrightarrow\quad
T_A = 2 T_B .
$$
Hence $3 T_B = 800$,
$$
T_B = 266.7\ \mathrm{N\,m}, \qquad T_A = 533.3\ \mathrm{N\,m}.
$$
The maximum stress is in the left segment,
$$
\tau_{\max} = \frac{16 \times 533.3}{\pi \times 0.050^{3}} = 21.7\ \mathrm{MPa}.
$$
*Check.* $\phi_{\text{collar}} = 533.3 \times 0.4 / (5.896 \times 10^{-7} \times 80 \times 10^{9}) = 4.51 \times 10^{-3}\ \mathrm{rad} = 0.258^{\circ}$, and the right segment twists by $266.7 \times 0.8 / (J G) = 4.51 \times 10^{-3}\ \mathrm{rad}$ in the opposite sense, so the right wall does not move. $\checkmark$

*Sanity.* As with the axial bar of the last chapter, the shorter, stiffer section takes more of the load — here twice as much, in the ratio of the lengths' reciprocals. This is why a shaft with an intermediate bearing or a coupling at a wall must be machined to length: a section $1\ \mathrm{mm}$ short of its intended length carries a proportionally larger share of the torque, and a residual pre-twist appears in the whole assembly even with no external load applied.
:::
:::

::: example Round versus square {#ex-round-square}
Compare a solid circular shaft and a square bar of the **same cross-sectional area** carrying the same torque. Which is stronger, and which is stiffer?
::: solution
For a square of side $a$ the exact elasticity solution gives
$$
J_{\square} = 0.1406\, a^{4}, \qquad \tau_{\square} = \frac{2.40\, T}{a^{3}} .
$$
Matching areas, $a^{2} = \pi d^{2} / 4$ gives $d = 1.128\, a$, so for the circle
$$
J_{\bigcirc} = \frac{\pi d^{4}}{32} = 0.1589\, a^{4}, \qquad
\tau_{\bigcirc} = \frac{16 T}{\pi d^{3}} = \frac{3.55\, T}{a^{3}} .
$$
**Stiffness:** $J_{\bigcirc} / J_{\square} = 0.1589 / 0.1406 = 1.13$, so the round shaft is $13$ per cent stiffer.
**Strength:** $\tau_{\square} / \tau_{\bigcirc} = 2.40 / 3.55 = 0.68$, so the square shaft carries $48$ per cent **more** torque at the same peak stress.

*Sanity.* The result is counter-intuitive and worth dwelling on. A square's corners are unstressed — the shear stress at a re-entrant-free convex corner of a prismatic bar in torsion is exactly zero, a theorem of elasticity — so the corners are wasted material, but the square's material is on average further from the centroid than a circle's of the same area, and that wins. The lesson is narrow but important: the circle is optimal for **stiffness** per unit weight in torsion, not for strength, and a square or hexagonal section is a legitimate choice when a shaft must also transmit torque through a flat or a keyway. It is emphatically **not** optimal in bending, where the circle's material is on average closer to the neutral axis than a square's and the I-section wins outright.
:::
:::

## Thin-walled closed sections

::: theorem Bredt's formulas for a thin-walled closed tube {#thm-bredt}
For a thin-walled tube of arbitrary closed cross-section and wall thickness $t$, the **shear flow** $q = \tau t$ is constant around the section and equals
$$
q = \frac{T}{2 A}, \qquad \tau = \frac{T}{2 t A},
$$
where $A$ is the area **enclosed** by the wall centre-line. The angle of twist per unit length is
$$
\theta = \frac{T}{4 A^{2} G} \oint \frac{\mathrm{d} s}{t} .
$$
For a circular tube of mean radius $r$ and uniform wall $t$ these give $\tau = T / (2 \pi r^{2} t)$ and $J = 4 \pi r^{3} t$, which is the thin-wall limit of $\pi (D_o^{4} - D_i^{4}) / 32$.
:::

::: proof
Because the wall is thin, the shear stress may be taken uniform across it and directed along the centre-line. Consider a slice of tube of length $\mathrm{d} z$ cut between two transverse planes and two longitudinal cuts at $s_1$ and $s_2$. Equilibrium of the slice in the $z$ direction requires the net longitudinal force to vanish; since a closed section carries no warping (a simply-connected closed tube cannot warp without tearing the wall), the longitudinal stress is zero and the shear flows entering and leaving any element must balance:
$$
q(s_1) = q(s_2) \quad\Longrightarrow\quad q = \tau t = \text{constant}.
$$
This is **Bredt's first equation**. The torque is the moment of this constant shear flow about any interior point; a flow $q$ acting along an element $\mathrm{d} s$ contributes $q \cdot r\, \mathrm{d} s$, and $r\, \mathrm{d} s = 2\, \mathrm{d} A$, so
$$
T = \oint q r\, \mathrm{d} s = 2 q \oint \mathrm{d} A = 2 q A
\quad\Longrightarrow\quad
q = \frac{T}{2 A},
$$
which is Bredt's second result. For the twist, equate the complementary energy per unit length, $\oint q^{2} \mathrm{d} s / (2 G t)$, to $T \theta / 2$, or integrate the shear strain $\gamma = q / (G t)$ round the centre-line and require the total rotation to be single-valued:
$$
\theta \oint \frac{\mathrm{d} s}{t} = \oint \frac{q}{G t}\, \mathrm{d} s \times \ldots
$$
giving $\theta = q / (2 A G) \oint \mathrm{d} s / t = T / (4 A^{2} G) \oint \mathrm{d} s / t$.
:::

::: example Closed versus slit {#ex-slit}
An aircraft panel is made from a tube of $80\ \mathrm{mm}$ mean diameter and $3\ \mathrm{mm}$ wall carrying $1500\ \mathrm{N\,m}$. Find the shear stress and the torsional stiffness, and compare them with the same tube split along a generator.
::: solution
**Closed.** The enclosed area is $A = \pi \times 0.040^{2} = 5.027 \times 10^{-3}\ \mathrm{m^{2}}$, so
$$
\tau = \frac{1500}{2 \times 0.003 \times 5.027 \times 10^{-3}} = 49.7\ \mathrm{MPa},
$$
$$
J_{\text{closed}} = \frac{4 A^{2}}{\oint \mathrm{d} s / t}
= \frac{4 A^{2} t}{2 \pi r} = \frac{4 \times 2.527 \times 10^{-5} \times 0.003}{0.2513}
= 1.206 \times 10^{-6}\ \mathrm{m^{4}} .
$$
**Slit.** For a thin open section made of one flat strip of length $s = 2 \pi r$ and thickness $t$,
$$
J_{\text{open}} = \frac{1}{3} s t^{3} = \frac{1}{3} \times 0.2513 \times 27 \times 10^{-9}
= 2.262 \times 10^{-9}\ \mathrm{m^{4}},
$$
$$
\tau_{\text{open}} = \frac{3 T t}{s t^{3}} = \frac{3 T}{s t^{2}}
= \frac{3 \times 1500}{0.2513 \times 9 \times 10^{-6}} = 1989\ \mathrm{MPa}.
$$
The closed tube is **$533$ times stiffer** and carries **$40$ times less stress**.

*Sanity.* The ratio of stiffnesses is $3 (2 r / t)^{2} / \pi^{2} \approx 533$ for this geometry, and it grows as the square of the diameter-to-thickness ratio — which is why aircraft fuselage frames, driveshafts, torsion bars and roll-cage hoops are all **closed** sections, why a drilled or slotted tube is a catastrophe, and why a stringer-to-skin joint that cannot carry shear flow turns a closed fuselage into an open one and multiplies the twist by hundreds. The single most consequential geometric decision in a thin-walled torsion member is whether the section is closed.
:::
:::

::: widget plot
f: 1500/(2*0.003*5.027e-3)/1000000
x: 0, 1
y: 40, 60
labels: \text{shear stress in the closed tube}
caption: Shear stress $\tau = T / (2 t A)$ in the closed tube of Example 6 against wall thickness from $2$ to $6\ \mathrm{mm}$: $74.6\ \mathrm{MPa}$ at $2\ \mathrm{mm}$, $49.7\ \mathrm{MPa}$ at $3\ \mathrm{mm}$, $24.9\ \mathrm{MPa}$ at $6\ \mathrm{mm}$. The stress is inversely proportional to the wall, whereas for a solid shaft it is inversely proportional to the cube of the diameter — so thin-wall design is linear and forgiving in gauge but brutal in the ratio $r / t$, at which point the wall buckles in diagonal compression long before it yields in shear.
:::

::: warning Keyways, shoulders and fatigue
A keyway removes material from the surface where the shear stress is highest and leaves a sharp corner with a stress-concentration factor of $1.6$ to $2.2$ in torsion and up to $3$ in bending. Shaft design practice is therefore: size the shaft for the combined bending and torsion with a fatigue factor, then add $5$ to $10\ \mathrm{mm}$ for the keyway, then check the deflection and the slope at the gear. A transverse hole for a cross-pin is worse still, with $K_t$ near $2.5$, and a retaining-ring groove is worse again. The classic failure is a shaft that is perfectly adequate in the middle and breaks at the fillet after a million cycles, with the fracture surface showing beach marks radiating from the fillet root. Fillet radii should be at least $0.04 d$ and preferably $0.1 d$; where a bearing sits, the shoulder must be high enough to locate it and radiused enough not to crack it, which is why bearing catalogues publish a minimum fillet radius and a maximum shoulder height, and why ignoring either is a design error, not a preference.
:::

::: history
The torsion of a circular shaft is one of the oldest solved problems in mechanics, and its solution came before the theory that justifies it. Charles-Augustin de Coulomb read a memoir on the torsion of wires to the Académie des Sciences in 1784, having already used torsion balances to measure the electrostatic and magnetic forces for which he is famous, and stated the linear variation of stress across the section and the resistance proportional to the fourth power of the diameter — the experimental facts behind $J \propto D^{4}$ — from wire-twisting tests. The first rigorous elastic solution is due to Augustin-Louis Cauchy and, more explicitly, to Siméon Denis Poisson, who in 1812 treated torsion as a boundary-value problem in elasticity, and to Navier, who solved it by the stress-function method they were inventing together. That method yields the exact solution for the circle and shows at once why non-circular sections warp; the torsion constants for ellipses and equilateral triangles are due to St Venant, who in 1855 also stated the principle that explains why the exact solution near a keyway does not matter a diameter away. Bredt's formulas for closed thin-walled sections are due to Rudolf Bredt (1885), and their adoption in aircraft design after the First World War — when the stressed-skin monocoque made closed shear webs the primary structure — is the reason they appear in every aeronautical text and in almost no civil one. The torsion balance that Coulomb used was refined by John Michell and Henry Cavendish to weigh the earth in 1798 and by Charles Vernon Boys a century later to measure $G$ itself, which remains the most delicate torsion problem ever solved.
:::

::: quiz
Two shafts of the same material and the same weight per metre are loaded in torsion: shaft 1 is solid of diameter $d$; shaft 2 is a tube of outside diameter $2 d$. Which carries the larger torque at the same maximum stress?
- [ ] Shaft 1, because it is solid
- [ ] They are equal, because they weigh the same
- [x] Shaft 2, by a large margin
- [ ] Neither, until the length is known
::: solution
Shaft 2. Equal weight per metre means equal area, so $\pi (D_o^{2} - D_i^{2}) / 4 = \pi d^{2} / 4$ with $D_o = 2 d$ gives $D_i = \sqrt{3} d$. The torque capacity is proportional to $J / c = \pi (D_o^{4} - D_i^{4}) / (16 D_o) = \pi (16 - 9) d^{4} / (32 d) = 0.2188 \pi d^{3}$, against $\pi d^{3} / 16 = 0.0625 \pi d^{3}$ for the solid shaft — a factor of $3.5$. The reason is that $J$ weights by $\rho^{3}$ while the stress limit is set at $\rho = c$: moving material outward is worth far more than keeping it in. The limit is buckling of the wall, which is why real hollow shafts use diameter ratios of $0.6$ to $0.85$ and not $0.87$.
:::
:::

## Where this leads

Shaft design under combined bending and torsion is developed in [[machine-design/shafts]], the fatigue consequences of keyways in [[machine-design/fatigue]], the energy methods used for indeterminate shafts in [[solid-mechanics/energy-methods]], and the torsion of general prismatic sections by the stress-function method in [[solid-mechanics/energy-methods]]. Thin-wall shear flow returns throughout aircraft and vehicle body structure, and the analogous shear flow of [[mechanics-of-materials/transverse-shear]] is the same mathematical object.

::: summary
- $\tau = T \rho / J$ and $\phi = T L / J G$ are exact for circular shafts only; $J = \pi D^{4} / 32$ for a solid circle and $\pi (D_o^{4} - D_i^{4}) / 32$ for a tube.
- Torque comes from power and speed, $T = 9549 \, \mathcal{P} / n$; at fixed power the torque, and therefore the shaft size, scales inversely with speed.
- Draw the torque diagram from the free end; the maximum stress is where the torque diagram peaks, and the twist is the sum of $T_i L_i / J G$.
- Hollow shafts are far more efficient than solid ones because stress and $J$-contribution both vanish at the axis; a $0.8$ diameter-ratio tube saves half the weight at equal stress.
- Indeterminate shafts are solved by compatibility of twist; the shorter, stiffer section takes the larger share.
- For thin walls, closed sections are enormously better than open ones: Bredt gives $\tau = T / (2 t A)$ and a stiffness hundreds of times that of the same section slit open.
:::

## Exercises

::: exercise Stress {level=1 check="41.0"}
Find the maximum shear stress in a $40\ \mathrm{mm}$ diameter solid shaft carrying $516\ \mathrm{N\,m}$.
::: solution
$\tau = 16 T / (\pi D^{3}) = 16 \times 516 / (\pi \times 0.040^{3}) = 41.0\ \mathrm{MPa}$.
*Check by the section modulus.* $J / c = \pi \times 0.040^{3} / 16 = 1.257 \times 10^{-5}\ \mathrm{m^{3}}$, so $\tau = 516 / 1.257 \times 10^{-5} = 41.0\ \mathrm{MPa}$. $\checkmark$
:::
:::

::: exercise Torque from power {level=1 check="955"}
What torque does a $15\ \mathrm{kW}$ motor deliver at $150\ \mathrm{rev / min}$?
::: solution
$T = 9549 \times 15 / 150 = 955\ \mathrm{N\,m}$. The same motor through a $10:1$ reduction at $15\ \mathrm{rev / min}$ delivers $9550\ \mathrm{N\,m}$, which is why a winch gearbox output shaft is many times the diameter of the motor armature shaft.
:::
:::

::: exercise Angle of twist {level=1 check="1.30"}
A $30\ \mathrm{mm}$ diameter, $800\ \mathrm{mm}$ long steel shaft ($G = 80\ \mathrm{GPa}$) carries $180\ \mathrm{N\,m}$. Find the angle of twist in degrees.
::: solution
$J = \pi \times 0.030^{4} / 32 = 7.952 \times 10^{-8}\ \mathrm{m^{4}}$,
$$
\phi = \frac{180 \times 0.8}{7.952 \times 10^{-8} \times 80 \times 10^{9}} = 2.263 \times 10^{-2}\ \mathrm{rad} = 1.30^{\circ}.
$$
*Note.* That is $1.63^{\circ}$ per metre, above the usual $1^{\circ} / \mathrm{m}$ service limit, so this shaft is too small for a machine tool even though its stress of $34.0\ \mathrm{MPa}$ is trivially low. Long slender shafts are stiffness problems.
:::
:::

::: exercise Hollow shaft {level=2}
A hollow shaft with $D_i / D_o = 0.6$ transmits the same torque as a solid shaft of the same material at the same maximum stress. What fraction of the weight does it have, and what fraction of the torsional stiffness?
::: solution
Equal stress means equal $J / c$:
$$
\frac{\pi D_o^{4} (1 - k^{4})}{16 D_o} = \frac{\pi d^{3}}{16}
\quad\Longrightarrow\quad
D_o^{3} (1 - k^{4}) = d^{3}, \qquad k = 0.6,
$$
$$
D_o = d \left( 1 - 0.1296 \right)^{-1/3} = d \times 1.0466 .
$$
Weight ratio:
$$
\frac{A_h}{A_s} = \frac{D_o^{2} (1 - k^{2})}{d^{2}} = 1.0466^{2} \times 0.64 = 0.701 .
$$
Stiffness ratio, using $D_o^{4} / d^{4} = 1.0466^{4} = 1.200$:
$$
\frac{J_h}{J_s} = \frac{D_o^{4} (1 - k^{4})}{d^{4}} = 1.200 \times 0.8704 = 1.044 .
$$
So the hollow shaft is **$30$ per cent lighter** and, at the same maximum stress, **$4$ per cent stiffer**.
:::
:::

::: exercise Indeterminate shaft {level=2}
For the shaft of Example 5, the applied torque is moved to $0.8\ \mathrm{m}$ from the left wall. Find the wall torques.
::: solution
Compatibility gives $T_A \times 0.8 = T_B \times 0.4$, so $T_B = 2 T_A$, and with $T_A + T_B = 800$,
$$
T_A = 266.7\ \mathrm{N\,m}, \qquad T_B = 533.3\ \mathrm{N\,m}.
$$
The torques swap, and the maximum stress is unchanged at $21.7\ \mathrm{MPa}$, because the larger torque always belongs to the shorter segment.
:::
:::

::: exercise Closed section {level=2}
A rectangular closed tube $100 \times 60\ \mathrm{mm}$ (centre-line dimensions) with $4\ \mathrm{mm}$ wall carries $2000\ \mathrm{N\,m}$. Find the shear stress and the twist per metre for $G = 70\ \mathrm{GPa}$.
::: solution
$A = 0.100 \times 0.060 = 6.0 \times 10^{-3}\ \mathrm{m^{2}}$, so
$$
\tau = \frac{2000}{2 \times 0.004 \times 6.0 \times 10^{-3}} = 41.7\ \mathrm{MPa},
$$
$$
\oint \frac{\mathrm{d} s}{t} = \frac{2 (0.100 + 0.060)}{0.004} = 80\ \mathrm{m^{-1}}, \qquad
\theta = \frac{2000}{4 \times 3.6 \times 10^{-5} \times 70 \times 10^{9}} \times 80 = 1.587 \times 10^{-4}\ \mathrm{rad / m} = 0.0091^{\circ} / \mathrm{m}.
$$
*Sanity.* The stress is uniform all round the wall because the wall is uniform; where the wall thickens the stress drops in proportion and the shear flow stays the same. That constancy of $q$ is what makes closed sections so efficient, and what makes a thickened corner useless for torsional strength — it is worth thickening only where buckling or a fitting demands it.
:::
:::

::: exercise Design {level=3}
Design the diameter of a solid steel shaft transmitting $30\ \mathrm{kW}$ at $960\ \mathrm{rev / min}$, subject to an allowable shear stress of $55\ \mathrm{MPa}$ and a twist limit of $1^{\circ}$ per metre. Take $G = 80\ \mathrm{GPa}$ and allow $8\ \mathrm{mm}$ for a keyway.
::: solution
$$
T = 9549 \times \frac{30}{960} = 298.4\ \mathrm{N\,m}.
$$
**Stress criterion.**
$$
D = \left( \frac{16 T}{\pi \tau_{\text{allow}}} \right)^{1/3}
= \left( \frac{16 \times 298.4}{\pi \times 55 \times 10^{6}} \right)^{1/3}
= 28.0\ \mathrm{mm}.
$$
**Stiffness criterion.** With $\theta_{\text{allow}} = 0.01745\ \mathrm{rad / m}$,
$$
J_{\text{req}} = \frac{T}{G \theta} = \frac{298.4}{80 \times 10^{9} \times 0.01745} = 2.139 \times 10^{-7}\ \mathrm{m^{4}}
\quad\Longrightarrow\quad
D = \left( \frac{32 J}{\pi} \right)^{1/4} = 34.5\ \mathrm{mm}.
$$
Stiffness governs. Adding $8\ \mathrm{mm}$ for the keyway gives $42.5\ \mathrm{mm}$; select the standard $45\ \mathrm{mm}$ shaft.

*Design comment.* The stiffness limit set the size, and it is worth noting how close the two criteria are: at $34.5\ \mathrm{mm}$ the stress is only $36.5\ \mathrm{MPa}$, a third below the allowable. Machine shafts are almost always stiffness- or deflection-governed rather than strength-governed, because gears and bearings tolerate only a few thousandths of a radian of skew before the load runs off the end of the tooth. A designer who sizes on stress alone produces a shaft that works and a gearbox that howls.
:::
:::

::: exercise Derivation {level=3}
Derive the torsion formula $\tau = T \rho / J$ from the geometry of deformation, Hooke's law and equilibrium, stating each assumption.
::: solution
**Assumptions:** circular cross-section, homogeneous isotropic linear elastic material, prismatic shaft, pure torque, small displacements, and (to be verified) plane sections remaining plane.

**Geometry.** Suppose a shaft of length $L$ twists by $\phi$ and that each cross-section rotates as a rigid disc. A point at radius $\rho$ moves circumferentially by $\rho \phi$, so the element's angle of distortion is
$$
\gamma = \frac{\rho \phi}{L},
$$
which is linear in $\rho$ and zero on the axis.

**Physics.** In pure shear Hooke's law gives $\tau = G \gamma$, so
$$
\tau = \frac{G \phi}{L} \rho,
$$
also linear in $\rho$, with $\tau_{\max} = G \phi c / L$ at the surface.

**Equilibrium.** The internal torque must equal the applied torque:
$$
T = \int_A \tau \rho\, \mathrm{d} A = \frac{G \phi}{L} \int_A \rho^{2}\, \mathrm{d} A = \frac{G \phi}{L} J .
$$
Eliminating $\phi / L$ between the stress and torque expressions gives $\tau = T \rho / J$, and rearranging the torque expression gives $\phi = T L / J G$.

**Verification.** The remaining question is whether the assumed displacement field satisfies the boundary conditions — zero traction on the cylindrical surface. Because the shear stress is everywhere circumferential and the surface is a surface of revolution, $\tau$ is tangent to the surface and there is no traction normal to it: the field is exact. For a non-circular section the analogous displacement would require traction on the boundary, which is why such sections warp and why the circle is the one case that can be solved by this three-line argument. That single verification is the reason shafts are round and the reason a splined or flat-milled shaft must be treated as a non-circular section with a reduced $J$.
:::
:::
