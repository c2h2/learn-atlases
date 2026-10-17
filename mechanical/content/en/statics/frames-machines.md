A truss is a luxury: every member a two-force bar, every joint a pin, everything solvable by counting. Real structures refuse to cooperate. A bicycle frame has tubes that bend between joints. A backhoe has eight links, three hydraulic rams and a bucket, and the load it can dig with is determined by leverage, not by the strength of its steel. A pair of scissors applies two newtons of finger force and cuts paper. All of these are **frames** and **machines**, and all are analysed by the same method as the trusses of the last chapter, with one addition that changes everything: when you cut a member, the cut face carries a force *and* a moment.

A **frame** is a pin-connected or rigid-connected assembly containing at least one member that has forces applied at three or more points, so that member bends. A **machine** is a frame designed to transmit and modify forces, with enough constraints to move. Both are analysed by taking apart: draw a free-body diagram of every member, expose the pin forces and the cut moments, and solve. The number of equations grows quickly, and the discipline of the method is entirely in the bookkeeping.

::: warning Newton's third law is the whole method
When a frame is taken apart, the force that member 1 exerts on member 2 at a pin appears on member 2's diagram and the equal and opposite force appears on member 1's. Draw them with the *same* assumed sense on one diagram and reverse it on the other, and label the components so you cannot forget. The commonest failure in frame analysis is not a wrong equation but a pin force drawn in the same direction on both members, which makes the assembled system non-equilibrated and produces answers that are wrong by twice the pin force. If a whole-frame check fails, look here first.
:::

## Frames: members that bend

::: definition Frame, machine and multi-force member {#def-frame}
A **multi-force member** is one with three or more points of load application (including support and pin forces), so that it cannot be a two-force member and must carry shear and bending as well as axial force. A **frame** is a connected assembly of rigid members, at least one of which is a multi-force member, held in a fixed configuration. A **machine** is a frame with at least one degree of freedom, designed to transmit a force or motion from an input to an output. For a plane assembly of $n$ members, each giving three equilibrium equations, and $c$ independent constraint components,
$$
\text{determinate} \iff 3 n = c, \qquad
\text{mechanism} \iff 3 n > c, \qquad
\text{indeterminate} \iff 3 n < c .
$$
:::

::: proposition Counting for frames {#prop-frame-counting}
A pin connecting $k$ members transmits two force components, not $2 k$; an internal hinge in a single member is a moment release and adds one condition; a rigid joint transmits two forces and a moment, four components in a plane. A roller or slider between two members contributes one; a fixed connection between two members contributes three. Sum the constraint components $c$ over all supports and all connections and compare with $3 n$.
:::

::: proof
Each isolated member is a rigid body in a plane and therefore carries three independent scalar equilibrium equations, so $n$ members give $3 n$ equations. Each constraint removes one relative motion and introduces one unknown force component, so the unknowns number $c$. Equality means the equations determine the unknowns uniquely, provided the constraint matrix has full rank; more constraints than equations leaves self-equilibrating (redundant) forces; fewer leaves a mechanism with a free motion. The pin rule follows because a frictionless pin cannot transmit a moment and its internal force is a single vector: whatever the number of members meeting, the pin exchanges one force between the group of members on one side and the group on the other, and the total is two components. A pin connecting three members therefore introduces two unknowns between members 1 and 2 and two between the pair and member 3 — four in all, not six — and this is where the naive count goes wrong.
:::

::: algorithm Analysis of a frame {#alg-frame}
1. **Count.** Compute $3 n$ and $c$. If $3 n > c$ the assembly moves; if $3 n < c$ it is indeterminate and this method will not finish.
2. **Look for two-force members.** Any member loaded only at two pins — no intermediate load, no applied couple, negligible weight — carries force along the line of the pins whatever its shape. Replace it by that one unknown magnitude and the count drops by one unknown per such member.
3. **Take the whole assembly** and solve what you can from the external reactions.
4. **Take apart.** Draw a free-body diagram of each member. At each pin draw $B_x$, $B_y$ on one member and $- B_x$, $- B_y$ on the other, with the sense drawn explicitly on both.
5. **Solve member by member**, starting with the member carrying the fewest unknowns. Take moments where unknown lines cross.
6. **Check** by verifying equilibrium of a member or of the whole assembly using equations not yet used.
:::

::: example L-shaped frame {#ex-lframe}
A rigid L-shaped member $ABC$ is bent at $B$: $A(0, 0)$, $B(4, 0)$, $C(4, 3)$, all dimensions in metres. It is pinned at $A$ and carries a horizontal roller (restraining horizontal motion only) at $C$. A vertical load of $20\ \mathrm{kN}$ acts downwards at the mid-point of $AB$, and a horizontal load of $10\ \mathrm{kN}$ acts at $C$ in the $+ x$ direction. Find the reactions.
::: solution
Three reaction components — $A_x$, $A_y$ at the pin and $C_x$ at the roller — against three equations, so the frame is determinate. The whole member is the free body; there is nothing to take apart.

Moments about $A$, using $M_O = x F_y - y F_x$ for each force:
$$
\textstyle \sum M_A = \big[2 \times (-20) - 0\big] + \big[4 \times 0 - 3 \times C_x\big] + \big[4 \times 0 - 3 \times 10\big] = 0
$$
$$
-40 - 3 C_x - 30 = 0 \quad\Longrightarrow\quad C_x = -23.33\ \mathrm{kN},
$$
so the roller pulls back with $23.33\ \mathrm{kN}$. Then
$$
\textstyle \sum F_x = A_x + C_x + 10 = A_x - 23.33 + 10 = 0 \quad\Longrightarrow\quad A_x = 13.33\ \mathrm{kN},
$$
$$
\textstyle \sum F_y = A_y - 20 = 0 \quad\Longrightarrow\quad A_y = 20.0\ \mathrm{kN}.
$$
The pin reaction has magnitude $\sqrt{13.33^{2} + 20.0^{2}} = 24.1\ \mathrm{kN}$.

*Check*, moments about $C(4, 3)$:
$$
\textstyle \sum M_C = \big[(0 - 4) \times 20 - (0 - 3) \times 13.33\big] + \big[(2 - 4)(-20) - (0 - 3) \times 0\big] + \big[(4 - 4) \times 0 - (3 - 3) \times 10\big]
$$
$$
= (-80 + 40) + 40 + 0 = 0 . \checkmark
$$
*Sanity.* The $10\ \mathrm{kN}$ at $C$ and the $20\ \mathrm{kN}$ at mid-span both turn the member clockwise about $A$, and the roller at $C$ must pull against them; the sign of $C_x$ says it pulls in $- x$, which is what the geometry demands. The pin takes the entire horizontal load not carried by the roller and the entire vertical load, so it is the member to design first.
:::
:::

::: example Two-member frame with a two-force member {#ex-twomember}
Members $AB$ and $BC$ are pin-connected at $B$. $A(0, 0)$ is a pin, $C(7, 4)\ \mathrm{m}$ is a pin, and $B(3, 4)\ \mathrm{m}$. A vertical load of $15\ \mathrm{kN}$ acts at the mid-point of $AB$. Find the reactions and the pin force at $B$.
::: solution
**Count.** Two members, $3 n = 6$ equations. Two pins at the supports give 4 components and the pin at $B$ gives 2, so $c = 6$. Determinate.

**Find the two-force member.** Member $BC$ is loaded only at $B$ and $C$, so its force is directed along $BC$, which is horizontal. That single observation replaces two unknowns at $C$ by one and immediately gives $C_y = 0$.

**Member $BC$.** Force $b$ along $BC$ at each end.

**Member $AB$.** Forces: $\mathbf{A} = (A_x, A_y)$ at $(0, 0)$, the load $(0, -15)$ at $(1.5, 2)$, and the force from $BC$, which is $(-b, 0)$ at $B(3, 4)$ if $b$ is tension in $BC$. Moments about $A$:
The moment of $(-b, 0)$ applied at $(3, 4)$ is $x F_y - y F_x = 3 \times 0 - 4 \times (-b) = 4 b$, and the load's moment is $1.5 \times (-15) = -22.5$. Hence
$$
\textstyle \sum M_A = -22.5 + 4 b = 0 \quad\Longrightarrow\quad b = 5.625\ \mathrm{kN}.
$$
Then
$$
\textstyle \sum F_x = A_x - b = 0 \quad\Longrightarrow\quad A_x = 5.625\ \mathrm{kN}, \qquad
\sum F_y = A_y - 15 = 0 \quad\Longrightarrow\quad A_y = 15.0\ \mathrm{kN}.
$$
The reaction at $A$ is $\sqrt{5.625^{2} + 15.0^{2}} = 16.0\ \mathrm{kN}$, the reaction at $C$ is $5.625\ \mathrm{kN}$ horizontal, and the pin at $B$ transmits $5.625\ \mathrm{kN}$.

*Check.* Member $BC$ carries equal and opposite $5.625\ \mathrm{kN}$ axial forces at its ends and nothing else, so it is in compression of $5.625\ \mathrm{kN}$ and satisfies all three of its equations. Member $AB$ carries $16.0\ \mathrm{kN}$ at $A$, $5.625\ \mathrm{kN}$ at $B$ and $15\ \mathrm{kN}$ at mid-length: it is a **beam**, and it bends. Its maximum bending moment is at the load point, $M = 5.625 \times 2 = 11.25\ \mathrm{kN\,m}$ from the horizontal component, plus the bending of the vertical component — a member that a truss analysis would have missed entirely.
:::
:::

::: example Portal frame with a crown hinge {#ex-portal}
A portal frame has pins at $A(0, 0)$ and $C(6, 0)$, rigid joints at $B(0, 4)$ and $D(6, 4)$, and an internal hinge at the mid-point $E(3, 4)$ of the beam. A horizontal load of $10\ \mathrm{kN}$ acts at $B$ and a vertical load of $40\ \mathrm{kN}$ acts on the beam at $x = 4\ \mathrm{m}$. Find the reactions.
::: solution
**Count.** Three members (two columns, one beam), $3 n = 9$ equations; supports give 4 components, the two rigid joints 4 each and the hinge 2, totalling $c = 4 + 4 + 4 + 2 = 14$. Indeterminate to the fifth degree by that count — but the count is wrong, because the two columns carry no load between their end connections and are therefore two-force members. Treating each column as a single unknown reduces $c$ by 3 each, giving $c = 8$ against $3 n = 9$... The clean way is to treat the frame as two rigid L-shaped halves joined by one hinge, which gives $3 \times 2 = 6$ equations and $c = 2 + 2 + 2 = 6$: determinate.

**Whole frame.**
$$
\textstyle \sum M_A = 6 C_y - 4 \times 40 - 4 \times 10 = 0
\quad\Longrightarrow\quad
C_y = \frac{200}{6} = 33.33\ \mathrm{kN}, \qquad A_y = 6.67\ \mathrm{kN}.
$$
**Right half, moments about the hinge $E(3, 4)$.** The right half carries $C = (C_x, 33.33)$ at $(6, 0)$ and the $40\ \mathrm{kN}$ load at $(4, 4)$:
$$
\textstyle \sum M_E^{\text{right}} = \big[3 \times 33.33 - (-4) C_x\big] + \big[1 \times (-40)\big] = 100 + 4 C_x - 40 = 0
\quad\Longrightarrow\quad
C_x = -15.0\ \mathrm{kN}.
$$
**Horizontal equilibrium.**
$$
\textstyle \sum F_x = A_x + C_x + 10 = A_x - 15 + 10 = 0 \quad\Longrightarrow\quad A_x = 5.0\ \mathrm{kN}.
$$
*Check on the left half*, moments about $E$: the reaction $(5.0, 6.67)$ at $(0, 0)$ gives $(-3)(6.67) - (-4)(5.0) = -20.0 + 20.0 = 0$, and the $10\ \mathrm{kN}$ at $B(0, 4)$ acts along a horizontal line through $E$'s height, so its moment about $E$ is zero. Total $0$. $\checkmark$

*Sanity.* The horizontal thrust is $15\ \mathrm{kN}$ at $C$ and $5\ \mathrm{kN}$ at $A$, unequal because the horizontal load of $10\ \mathrm{kN}$ enters at $A$'s side. Remove that load and the two thrusts become equal and opposite — the pure three-hinged arch thrust of the last chapter.
:::
:::

## Machines: mechanical advantage

::: definition Machine, mechanical advantage and efficiency {#def-machine}
A **machine** transmits an input force (the **effort** $P$) to an output force (the **load** $Q$). Its **mechanical advantage** (force ratio) is
$$
\mathrm{MA} = \frac{Q}{P} .
$$
Its **velocity ratio** (or movement ratio) is the ratio of the distance moved by the point of application of the effort to that moved by the load, $\mathrm{VR} = v_{\text{in}} / v_{\text{out}}$. For an ideal machine with no friction and no stored energy, virtual work gives $P v_{\text{in}} = Q v_{\text{out}}$, so
$$
\mathrm{MA}_{\text{ideal}} = \mathrm{VR}, \qquad
\eta = \frac{\mathrm{MA}}{\mathrm{VR}} \le 1 .
$$
:::

::: proposition Ideal mechanical advantage from geometry {#prop-virtual}
The ideal mechanical advantage of any linkage equals the ratio of the velocity of the effort point to the velocity of the load point, which can be found either by a virtual-work equation or by differentiating the constraint equations. For a lever of arms $a$ and $b$, $\mathrm{MA} = a / b$; for a simple pulley system with $n$ rope parts supporting the load, $\mathrm{MA} = n$; for a toggle of half-angle $\theta$ as in Example 6, $\mathrm{MA} = 1 / (2 \tan \theta)$.
:::

::: proof
Give the machine a virtual displacement compatible with its constraints. Because it is ideal — no friction, no change of kinetic or strain energy — the total virtual work is zero:
$$
P\, \delta_{\text{in}} - Q\, \delta_{\text{out}} = 0
\quad\Longrightarrow\quad
\frac{Q}{P} = \frac{\delta_{\text{in}}}{\delta_{\text{out}}} = \mathrm{VR}.
$$
For a lever pivoted at a point, the two arms sweep angles $\delta \phi$ and their ends move $a\, \delta \phi$ and $b\, \delta \phi$, giving $\mathrm{MA} = a / b$. For a pulley block, if the load rises $\delta$ then $n$ rope parts each shorten by $\delta$, so $n \delta$ of rope is paid out at the effort: $\mathrm{MA} = n$. For the toggle, the load point moves horizontally by $x = 2 a \cos \theta$ while the effort point moves vertically by $y = a \sin \theta$, so $\mathrm{d}y / \mathrm{d}x = - \tan \theta$ and $\mathrm{MA} = \delta_{\text{in}} / \delta_{\text{out}} = 1 / (2 \tan \theta)$ — which grows without bound as $\theta \to 0$. That is the reason a toggle clamps with a force no hand could produce, and also the reason it becomes self-locking: past a certain angle the friction angle exceeds the mechanism angle and no load can drive it back.
:::

::: example Bolt cutters {#ex-cutters}
A pair of bolt cutters has handles $400\ \mathrm{mm}$ long and jaws $50\ \mathrm{mm}$ long measured from the pin. A grip force of $250\ \mathrm{N}$ is applied to each handle. Find the force on the bolt, and the force in the pin.
::: solution
Take one handle as a free body. It is a lever pivoted at the pin, loaded by the $250\ \mathrm{N}$ grip at $400\ \mathrm{mm}$ and by the jaw reaction $J$ at $50\ \mathrm{mm}$:
$$
\textstyle \sum M_{\text{pin}} = 250 \times 400 - J \times 50 = 0
\quad\Longrightarrow\quad
J = \frac{100\,000}{50} = 2000\ \mathrm{N}.
$$
The bolt is gripped between two jaws, each pushing with $2000\ \mathrm{N}$, so the bolt is in compression of $2000\ \mathrm{N}$ and the two arms of the cutter each carry $2000\ \mathrm{N}$ through the pin. The mechanical advantage is $2000 / 250 = 8.0$, equal to the ratio of arms $400 / 50 = 8.0$ as the virtual-work argument requires.

*Pin check.* Each handle applies $2000\ \mathrm{N}$ at the jaw and receives $250\ \mathrm{N}$ at the grip, so the pin must supply the difference as a shear force of about $2000 - 250 = 1750\ \mathrm{N}$; the pin is in **double shear**, each shear plane carrying $1750 / 2 = 875\ \mathrm{N}$. A $6\ \mathrm{mm}$ diameter pin has an area of $28.3\ \mathrm{mm^{2}}$ per plane and a shear stress of $30.9\ \mathrm{MPa}$, comfortable for a hardened steel.

*Sanity.* A $6\ \mathrm{mm}$ hard-steel bolt shears at roughly $\pi \times 6^{2} / 4 \times 400 / 2 = 22.6\ \mathrm{kN}$ in double shear, so $2\ \mathrm{kN}$ at the jaws is far short of cutting it — which is why bolt cutters have handles of $600$ to $1200\ \mathrm{mm}$, and why a $900\ \mathrm{mm}$ tool with the same $50\ \mathrm{mm}$ jaw gives $\mathrm{MA} = 18$ and $4.5\ \mathrm{kN}$.
:::
:::

::: example Toggle press {#ex-toggle}
A toggle press has two equal links of length $a$ pin-jointed at their common end $B$ and pinned at their outer ends $A$ and $C$ to rollers constrained to a horizontal line. A vertical effort $P = 500\ \mathrm{N}$ is applied at $B$, and $C$ pushes on a workpiece. Find the output force when the half-angle $\theta$ between a link and the horizontal is $10^{\circ}$, and again at $2^{\circ}$.
::: solution
Both links are two-force members. At joint $B$, with each link inclined at $\theta$ to the horizontal and both in compression $F$:
$$
\textstyle \sum F_x = F_{BC} \cos \theta - F_{BA} \cos \theta = 0 \quad\Longrightarrow\quad F_{BA} = F_{BC} = F,
$$
$$
\textstyle \sum F_y = - 2 F \sin \theta - P = 0 \quad\Longrightarrow\quad F = - \frac{P}{2 \sin \theta} .
$$
At $C$ the link pushes with force $F$ directed along the link from $B$ to $C$, whose horizontal component is $F \cos \theta$. The horizontal thrust on the workpiece is therefore
$$
Q = - F \cos \theta = \frac{P}{2 \tan \theta} .
$$
At $\theta = 10^{\circ}$,
$$
Q = \frac{500}{2 \times 0.17633} = 1418\ \mathrm{N}, \qquad \mathrm{MA} = 2.84 ;
$$
at $\theta = 2^{\circ}$,
$$
Q = \frac{500}{2 \times 0.034921} = 7159\ \mathrm{N}, \qquad \mathrm{MA} = 14.3 .
$$
*Sanity.* $Q$ grows as $1 / \tan \theta$ and diverges as the links straighten, which is the signature of a toggle. The same formula shows why a toggle becomes **self-locking**: the mechanism jams when the friction angle at the pins exceeds $\theta$, because the load's own thrust then drives the joint rather than releasing it. Real toggle clamps are designed to over-centre slightly, so that the released position has $\theta$ just past $90^{\circ}$ and the clamp cannot open under vibration.
:::
:::

::: widget plot
f: 500/(2*tan(x*pi/180))
x: 1, 45
y: 300, 14500
labels: \text{toggle output force } Q(\theta)
caption: Output force of the toggle press of Example 6 against the half-angle $\theta$, for an effort of $500\ \mathrm{N}$. $Q = P / (2 \tan \theta)$ diverges as $\theta \to 0$: $14.2\ \mathrm{kN}$ at $1^{\circ}$, $7.2\ \mathrm{kN}$ at $2^{\circ}$, $1.42\ \mathrm{kN}$ at $10^{\circ}$ and only $500\ \mathrm{N}$ at $45^{\circ}$. The whole utility of a toggle clamp, a knee joint and a folding brace lies in this curve's left-hand end — and so does its danger, because the same geometry makes the mechanism impossible to release by hand once the workpiece springs back.
:::

::: example Pulley block {#ex-pulley}
A load of $2.4\ \mathrm{kN}$ is lifted by a block-and-tackle with four rope parts supporting the moving block. Find the ideal effort, and the actual effort if the block as a whole is 88 per cent efficient.
::: solution
With $n = 4$ rope parts, $\mathrm{VR} = 4$ and the ideal effort is
$$
P_{\text{ideal}} = \frac{Q}{n} = \frac{2400}{4} = 600\ \mathrm{N}.
$$
With a block efficiency of $\eta = 0.88$,
$$
P_{\text{actual}} = \frac{Q}{n \, \eta} = \frac{2400}{4 \times 0.88} = 682\ \mathrm{N},
$$
$14$ per cent above the ideal. The mechanical advantage delivered is $Q / P = 3.52$ against a velocity ratio of $4$.

*Sanity.* Pulley blocks are efficient machines, and the loss is dominated by the stiffness of the rope bending over the sheaves rather than by pin friction — which is why a wire rope costs more efficiency than a fibre rope of the same strength, and why a tackle used once a year seizes and gives far worse than 88 per cent. In the real machine the four rope parts do **not** carry equal tensions: they step down from the load end towards the effort end, and the part nearest the load carries most.
:::
:::

::: warning Ideal mechanical advantage is not what the machine delivers
$\mathrm{MA} = \mathrm{VR}$ holds only for an ideal machine. A worm gear with 95 to 1 reduction may have an efficiency below 40 per cent, so its actual mechanical advantage is *less* than its velocity ratio and it may even be less than one — a "force multiplier" that takes more effort than it delivers. Conversely a machine with $\eta < 1$ and $\mathrm{VR} > 1 / (1 - \eta)$ is **self-locking**: it cannot be back-driven. That is a virtue in a worm-geared hoist and a disaster in a linkage that is supposed to release. Never assume a mechanism will release under load; check the inequality, or design the geometry to over-centre.
:::

::: history
The statics of machines begins with the five simple machines of the Greek mechanicians — lever, wheel-and-axle, pulley, wedge and screw — catalogued in the *Mechanica* of around 300 BC, long attributed to Aristotle and now known to be a Peripatetic compilation. Hero of Alexandria, Apollonius and above all Archimedes gave the lever its proof; Archimedes' *On the Equilibrium of Planes* (around 260 BC) derives centre-of-gravity results by a balance argument that is a virtual-work argument in all but name. The explicit principle of virtual velocities appears in the *Mechanicorum liber* of Guidobaldo del Monte (1577) and in Galileo's *Le mecaniche* (1600), which states that "the moment gained is exactly what is lost in speed" — the identity $\mathrm{MA} = \mathrm{VR}$ in words. John Theophilus Desaguliers gave the first clear published statement of the relation between force and velocity ratios in his *Course of Experimental Philosophy* (1725), and the efficiency concept, with the phrase "mechanical powers" and their measured efficiencies, was formalised by Thomas Tredgold in *Elementary Principles of Carpentry and the Language of Architecture* (1820) and by Moseley in his *Practical Mechanics* of 1829, both driven by the practical need to size the gears and ropes of mills and mines.
:::

::: quiz
A machine has a velocity ratio of 20 and an efficiency of 30 per cent. What is its mechanical advantage?
- [ ] 60
- [x] 6
- [ ] 20
- [ ] 0.015
::: solution
$\mathrm{MA} = \eta \times \mathrm{VR} = 0.30 \times 20 = 6$. A worm gear with a large reduction can easily fall this low, and the effort needed is $Q / 6$, not $Q / 20$: designing a machine on its velocity ratio alone under-sizes the actuator by more than three times. Note also that with $\eta < 0.5$ a worm drive is self-locking, which is often the reason it was chosen.
:::
:::

## Where this leads

The internal forces found by taking frames apart become the section loadings of [[mechanics-of-materials/axial-loading]] and [[mechanics-of-materials/bending-stress]]. Mechanism kinematics — the velocity ratios used here — are developed in [[mechanisms/velocity-analysis]], and the design of the pins, keys and bolts that join frames is in [[machine-design/fasteners-joints]]. Indeterminate frames, where $3 n < c$, need [[solid-mechanics/energy-methods]] or [[finite-element-method/direct-stiffness]].

::: summary
- A frame contains at least one multi-force member and therefore carries shear and bending; a machine has a degree of freedom and transmits force.
- Count $3 n$ equations against $c$ constraint components; identify two-force members first, because each one removes two unknowns.
- When a frame is taken apart, pin forces appear equal and opposite on the two members — draw both, and label them.
- Ideal mechanical advantage equals velocity ratio, obtainable from virtual work: levers give $a / b$, pulley blocks give $n$, toggles give $1 / (2 \tan \theta)$.
- Efficiency reduces mechanical advantage below velocity ratio; a machine with low efficiency may be self-locking, which is sometimes wanted and sometimes a hazard.
:::

## Exercises

::: exercise Two-force member {level=1 check="1600"}
A bolt cutter has handles of $320\ \mathrm{mm}$ and jaws of $40\ \mathrm{mm}$. With a grip force of $200\ \mathrm{N}$ per handle, what is the jaw force? (Enter the answer in N.)
::: solution
Moments about the pin: $J = 200 \times 320 / 40 = 1600\ \mathrm{N}$. Mechanical advantage $8.0$, equal to the ratio of arms.
:::
:::

::: exercise Toggle {level=1 check="2858"}
For the toggle press of Example 6, what is the output force with $P = 500\ \mathrm{N}$ and $\theta = 5^{\circ}$? (Enter the answer in N.)
::: solution
$Q = P / (2 \tan \theta) = 500 / (2 \times 0.08749) = 2858\ \mathrm{N}$. Halving the angle roughly doubles the force, which is the whole point of a toggle.
:::
:::

::: exercise Frame reactions {level=2}
A T-shaped member is pinned at $A(0, 0)$ and carries a horizontal roller at $B(3, 4)$; the cross-arm runs from $(3, 4)$ to $(5, 4)$. A vertical load of $12\ \mathrm{kN}$ acts down at $(5, 4)$. Find the reactions.
::: solution
Moments about $A$: the roller at $B$ supplies a horizontal force $B_x$ at height $4\ \mathrm{m}$, and the load has arm $5\ \mathrm{m}$:
$$
\textstyle \sum M_A = -4 B_x - 5 \times 12 = 0 \quad\Longrightarrow\quad B_x = -15.0\ \mathrm{kN}.
$$
Then $A_x = 15.0\ \mathrm{kN}$ and $A_y = 12.0\ \mathrm{kN}$, giving a pin reaction of $\sqrt{15.0^{2} + 12.0^{2}} = 19.2\ \mathrm{kN}$. The roller force is larger than the applied load because its moment arm is shorter — the usual trade-off, and the reason a short lever needs a big actuator.
:::
:::

::: exercise Machine: pedal {level=2 check="1000"}
A brake pedal is pivoted at its shaft. The driver's foot applies $350\ \mathrm{N}$ at $200\ \mathrm{mm}$ from the shaft, and the master-cylinder pushrod is attached $70\ \mathrm{mm}$ from the shaft on the other side, perpendicular to the pedal arm. Find the pushrod force. (Enter the answer in N.)
::: solution
Moments about the shaft: $F \times 70 = 350 \times 200$, so $F = 1000\ \mathrm{N}$. The mechanical advantage is $2.86$. Car pedals are deliberately made with a ratio of about 4 to 6 between pedal and pushrod, and then multiplied again by the brake servo's vacuum assistance of 2 to 3, because a driver can sustain only about $500\ \mathrm{N}$ comfortably and a stopping deceleration of $0.7 g$ needs several kilonewtons at the pads.
:::
:::

::: exercise Frame with a pulley {level=2}
A frame carries a frictionless pulley of radius $0.2\ \mathrm{m}$ at its corner $B(0, 3)\ \mathrm{m}$. A rope goes over the pulley, one part hanging vertically with a $5\ \mathrm{kN}$ load and the other running horizontally to a winch at $W(4, 3)$. The frame is $A(0, 0)$ pinned and $C(4, 0)$ on a vertical roller. Find the reactions and the force on the pulley pin.
::: solution
The rope tension is $5\ \mathrm{kN}$ throughout (frictionless pulley). The pulley pin feels the two rope pulls: $(0, -5)$ from the hanging part and $(5, 0)$ from the horizontal part, so the pin load is
$$
\sqrt{5^{2} + 5^{2}} = 7.07\ \mathrm{kN}
$$
at $45^{\circ}$, plus the rope's own offset — the two pulls act along lines $0.2\ \mathrm{m}$ from the pulley centre, and their resultant passes through the centre, which is why a frictionless pulley's pin load can be taken at the centre.

For the frame, replace the rope by its effect on the frame: $5\ \mathrm{kN}$ down and $5\ \mathrm{kN}$ horizontally at $B(0, 3)$.
The two rope pulls act along lines offset from the pulley centre by the sheave radius: the vertical part lies at $x = -0.2\ \mathrm{m}$ and the horizontal part at $y = 3.2\ \mathrm{m}$. Then
$$
\textstyle \sum M_A = 4 C_y + (-0.2)(-5) - 3.2 \times 5 = 4 C_y + 1.0 - 16.0 = 0
\quad\Longrightarrow\quad
C_y = 3.75\ \mathrm{kN},
$$
$$
A_y = 5 - 3.75 = 1.25\ \mathrm{kN}, \qquad A_x = -5.0\ \mathrm{kN}.
$$
*Sanity.* The offset of the rope from the pulley centre changes the moment by $1.0\ \mathrm{kN\,m}$, about $6$ per cent — small here, but it is the difference between a correct answer and a wrong one, and it is the reason a pulley's line of action must be drawn where the rope actually is, not where the sheave centre is.
:::
:::

::: exercise Design: pin at a machine joint {level=3}
In the bolt cutters of Example 5 the pin transmits $1750\ \mathrm{N}$ in double shear. Select a pin diameter for an allowable shear stress of $100\ \mathrm{MPa}$, and check the bearing stress in a $10\ \mathrm{mm}$ thick cutter arm.
::: solution
Each shear plane carries $875\ \mathrm{N}$, so
$$
A_{\text{req}} = \frac{875}{100} = 8.75\ \mathrm{mm^{2}}
\quad\Longrightarrow\quad
d = \sqrt{\frac{4 \times 8.75}{\pi}} = 3.34\ \mathrm{mm}.
$$
Take $d = 6\ \mathrm{mm}$, which is set by handling and by the standard size rather than by stress, and the actual shear stress is $875 / 28.27 = 30.9\ \mathrm{MPa}$.

Bearing on the $10\ \mathrm{mm}$ arm is over the projected area $d t = 6 \times 10 = 60\ \mathrm{mm^{2}}$, with a load of $2000\ \mathrm{N}$ at the jaw side:
$$
\sigma_b = \frac{2000}{60} = 33.3\ \mathrm{MPa}.
$$
*Design comment.* The pin is grossly under-stressed and the joint is governed by **bearing and by the arm's bending**, not by the pin. Cutter arms fail by yielding where the jaw meets the shank, which is why they are forged with a fillet there and heat-treated only at the jaws. Increasing the pin diameter does nothing; thickening the arm at the fillet is what works.
:::
:::

::: exercise Machine: scissors jack {level=3}
A screw jack has a square thread of mean radius $r = 15\ \mathrm{mm}$ and lead $L = 6\ \mathrm{mm}$, and a load of $20\ \mathrm{kN}$. Taking $\mu = 0.12$ for the thread, find the torque to raise the load and the torque to lower it, and state whether the jack is self-locking.
::: solution
A square thread is an inclined plane wrapped on a cylinder: unwinding one turn gives a ramp of horizontal length $2 \pi r$ and rise $L$, so the helix angle is
$$
\tan \alpha = \frac{L}{2 \pi r} = \frac{6}{2 \pi \times 15} = 0.06366, \qquad \alpha = 3.64^\circ,
$$
and the friction angle is $\phi = \arctan 0.12 = 6.84^\circ$. The torque to raise the load is
$$
T_{\text{raise}} = Q r \tan(\alpha + \phi)
= 20\,000 \times 0.015 \times \tan(10.48^\circ)
= 300 \times 0.1849 = 55.5\ \mathrm{N\,m},
$$
and to lower it,
$$
T_{\text{lower}} = Q r \tan(\phi - \alpha)
= 300 \times \tan(3.20^\circ) = 300 \times 0.0559 = 16.8\ \mathrm{N\,m}.
$$
Both are positive, so the load cannot drive the screw down by itself: the jack is **self-locking**, which is the condition $\phi > \alpha$, or equivalently $\mu > L / (2 \pi r)$.

*Sanity.* The efficiency of raising is
$$
\eta = \frac{\tan \alpha}{\tan(\alpha + \phi)} = \frac{0.0637}{0.1849} = 34\ \text{per cent},
$$
which is typical of a power screw and explains why a jack needs a long tommy bar: a $300\ \mathrm{mm}$ bar gives $55.5 / 0.300 = 185\ \mathrm{N}$ of hand force, quite comfortable, while a $100\ \mathrm{mm}$ bar would need $555\ \mathrm{N}$, which no one can sustain. Ball-screw jacks recover most of that 66 per cent loss, at the price of losing self-locking and needing a brake.
:::
:::

::: exercise Derivation {level=3}
For a wedge of half-angle $\alpha$ and coefficient of friction $\mu$ on both faces, derive the force required to drive the wedge under a load $Q$, and show that the wedge is self-holding when $\tan \alpha < \mu$. Apply the result to a $1:8$ taper wedge with $\mu = 0.25$ and $Q = 10\ \mathrm{kN}$.
::: solution
Each face carries a normal reaction $N$ and a friction force $\mu N$ opposing the wedge's motion. Resolving perpendicular to and along the wedge axis for one face, and taking the wedge as a free body with the load $Q$ on its back and a driving force $P$ along its axis,
$$
Q = 2 \left( N \cos \alpha - \mu N \sin \alpha \right), \qquad
P = 2 \left( N \sin \alpha + \mu N \cos \alpha \right),
$$
so
$$
P = Q \, \frac{\sin \alpha + \mu \cos \alpha}{\cos \alpha - \mu \sin \alpha}
= Q \, \frac{\tan \alpha + \mu}{1 - \mu \tan \alpha} = Q \tan(\alpha + \phi), \qquad \tan \phi = \mu .
$$
To *release* the wedge the friction reverses, giving $P_{\text{release}} = Q \tan(\phi - \alpha)$, which is negative — that is, the wedge holds itself and must be pulled out — whenever $\phi > \alpha$, that is $\mu > \tan \alpha$. That is the **self-holding** condition.

For a $1:8$ taper, $\tan \alpha = 1 / 8 = 0.125$, $\alpha = 7.125^{\circ}$, and with $\mu = 0.25$, $\phi = 14.04^{\circ}$:
$$
P = 10 \times \tan(21.16^{\circ}) = 10 \times 0.387 = 3.87\ \mathrm{kN}.
$$
Since $\phi = 14.04^{\circ} > \alpha = 7.13^{\circ}$, the wedge is self-holding, and the mechanical advantage is $Q / P = 2.58$. Halving the taper to $1:16$ gives $\alpha = 3.58^{\circ}$, $P = 10 \tan(17.62^{\circ}) = 3.17\ \mathrm{kN}$ and $\mathrm{MA} = 3.15$ — a better machine, but only just, and the self-holding margin grows, which is why a split pin is not used where the joint must be struck free.
:::
:::
