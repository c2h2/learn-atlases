A bridge truss has thirty or forty straight bars joined at pins, and every one of them carries force along its own length and nothing else. That single design decision — put the loads at the joints — turns a structure into a system of simultaneous linear equations that can be solved with nothing but the equilibrium conditions of the last chapter. It is why railway bridges were being designed to exact specification in 1840, a hundred years before anyone could solve an indeterminate frame on paper.

Two methods do all the work. The **method of joints** isolates each pin in turn and solves two equations; it is systematic, tedious, and the only way to find the force in every member. The **method of sections** cuts the truss clean through and treats each side as a rigid body, three equations for three cut members; it is fast and it is how you find the force in one particular member without solving the whole truss. Between them they answer every question a statically determinate truss poses, and knowing which to reach for is most of the skill.

::: warning A truss member carries axial force only if the load is at a joint
The whole method depends on the assumption that loads are applied at the pins and that the member's own weight is either negligible or shared to its end joints. Hang a load at mid-span of a top chord and that chord becomes a beam: it bends, and the "axial force" from the truss analysis is only part of the story. Real truss bridges have **chord bending** between panel points, and floor beams, stringers and cross girders whose sole purpose is to convert deck loads into joint loads before they reach the truss. When you analyse a truss you analyse the idealisation; the designer's job is to make the idealisation true, and to check the members between joints for the bending the idealisation ignores.
:::

## Ideal trusses, determinacy and the counting rule

::: definition Ideal truss and simple truss {#def-truss}
An **ideal truss** is an assemblage of straight, weightless, two-force members joined at frictionless pins, with all loads applied at the pins. Its members carry only uniform axial tension or compression. A **simple truss** is built from a triangle by repeatedly adding two members and a joint; every simple truss is rigid and statically determinate. A **compound truss** joins two or more simple trusses; a **complex truss** is neither. With $m$ members, $j$ joints and $r$ reaction components, a plane truss is statically determinate when
$$
m + r = 2j ,
$$
indeterminate when $m + r > 2j$ and a mechanism when $m + r < 2j$.
:::

::: proposition The counting rule {#prop-counting}
A plane truss has two independent equilibrium equations at each of its $j$ pins, giving $2 j$ equations for the $m$ member forces and $r$ reaction components. It is statically determinate if and only if $m + r = 2 j$ **and** the members and reactions are arranged so that no independent mechanism remains. The condition $m + r = 2 j$ is necessary but not sufficient.
:::

::: proof
Each pin is a particle, so it gives $\sum F_x = 0$ and $\sum F_y = 0$ and no moment equation — a pin cannot transmit a moment by definition. The unknowns are the $m$ axial forces (one per member, because a two-force member's force is fully specified by its magnitude once its line is known) plus the $r$ reaction components. Counting gives the stated condition. Sufficiency fails when the arrangement is defective: a four-bar rectangle with one diagonal has $m = 5$, $r = 3$, $j = 4$, so $m + r = 8 = 2 j$, yet if the diagonal is placed so that two joints are connected by collinear members only, the equilibrium matrix is singular and the truss has a finite mechanism. Conversely a truss with $m + r > 2 j$ may still be solvable if the redundant members are arranged so that their forces are self-equilibrating and zero. The counting rule is a fast screen, and the definitive test is whether the $2 j \times (m + r)$ equilibrium matrix has full rank — which is exactly what a computer checks, and why a hand check of determinacy is worth replacing with a rank test on any truss with more than a dozen members.
:::

::: algorithm Zero-force members by inspection {#alg-zero}
Before solving anything, strike out the members that carry nothing. Three rules find almost all of them:

1. **Two non-collinear members at an unloaded joint.** Both are zero.
2. **Two collinear members and a third at an unloaded joint.** The third is zero; the two collinear ones carry equal forces.
3. **Two members at a joint that carries a load along one of their lines.** The other is zero, and the first carries the load.

Removing zero-force members simplifies the geometry and reveals further zero-force members. They are nevertheless kept in the structure: they prevent buckling of the compression chords, they carry load if the loading changes, and removing them turns a determinate truss into a mechanism under a different load case.
:::

::: example Identifying zero-force members {#ex-zero}
The Pratt truss analysed below has a top chord $7\text{–}8\text{–}9\text{–}10\text{–}11$ and a vertical $3\text{–}9$ at mid-span meeting it at joint 9. Joint 9 carries no load and the top chord is straight there, so rule 2 applies: the vertical $3\text{–}9$ carries zero force, and members $8\text{–}9$ and $9\text{–}10$ carry equal forces. The full solution confirms both: $F_{3\text{–}9} = 0$ and $F_{8\text{–}9} = F_{9\text{–}10} = -168.75\ \mathrm{kN}$.
:::

## The method of joints

::: algorithm Method of joints {#alg-joints}
1. Solve for the external reactions from the whole-truss equilibrium equations.
2. Strike out zero-force members.
3. Choose a joint with **at most two unknown member forces** — always a support joint on a simple truss. Draw its free-body diagram with each unknown member drawn in **tension**, that is pulling *away* from the joint.
4. Write $\sum F_x = 0$ and $\sum F_y = 0$. Solve the two equations. A negative result means the member is in compression.
5. Move to an adjacent joint; each solved member becomes a known force there. Repeat until all are found.
6. Check by taking a joint that has not been used, or by verifying that the member forces at every joint close.
:::

::: example Method of joints, end panel {#ex-joints}
The Pratt truss of Figure 1 spans $18\ \mathrm{m}$ in six $3\ \mathrm{m}$ panels, is $4\ \mathrm{m}$ deep, and carries $50\ \mathrm{kN}$ downward at each of the five interior lower joints. Its supports are a pin at joint 0 and a vertical roller at joint 6. Find the forces in members $0\text{–}7$, $0\text{–}1$, $1\text{–}7$ and $7\text{–}2$.
::: solution
**Reactions.** By symmetry, or by moments about 0,
$$
R_0 = R_6 = \frac{5 \times 50}{2} = 125\ \mathrm{kN}\ \text{up}, \qquad R_{0x} = 0 .
$$
**Joint 0.** Two unknowns, $F_{0\text{–}1}$ (horizontal) and $F_{0\text{–}7}$ (along the end post, whose direction is $(3, 4) / 5 = (0.6, 0.8)$). Both drawn in tension, pulling away from the joint:
$$
\textstyle \sum F_y = 125 + 0.8 F_{0\text{–}7} = 0
\quad\Longrightarrow\quad
F_{0\text{–}7} = -156.25\ \mathrm{kN} \quad (156.25\ \mathrm{kN}\ \text{compression}),
$$
$$
\textstyle \sum F_x = F_{0\text{–}1} + 0.6 F_{0\text{–}7} = F_{0\text{–}1} - 93.75 = 0
\quad\quad\Longrightarrow\quad
F_{0\text{–}1} = +93.75\ \mathrm{kN} \quad (\text{tension}).
$$
**Joint 1.** Members $0\text{–}1$ and $1\text{–}2$ are horizontal, $1\text{–}7$ is vertical, and $50\ \mathrm{kN}$ acts down:
$$
\textstyle \sum F_y = F_{1\text{–}7} - 50 = 0 \quad\Longrightarrow\quad F_{1\text{–}7} = +50.0\ \mathrm{kN} \quad (\text{tension}),
$$
$$
\textstyle \sum F_x = F_{1\text{–}2} - F_{0\text{–}1} = 0 \quad\Longrightarrow\quad F_{1\text{–}2} = +93.75\ \mathrm{kN} \quad (\text{tension}).
$$
**Joint 7.** Members $0\text{–}7$ (direction from 7 to 0 is $(-0.6, -0.8)$), $7\text{–}8$ (horizontal, $+x$), $1\text{–}7$ (vertical, $(0, -1)$) and $7\text{–}2$ (direction $(0.6, -0.8)$):
$$
\textstyle \sum F_y = -0.8 F_{0\text{–}7} - F_{1\text{–}7} - 0.8 F_{7\text{–}2} = 125 - 50 - 0.8 F_{7\text{–}2} = 0
\quad\Longrightarrow\quad
F_{7\text{–}2} = +93.75\ \mathrm{kN} \quad (\text{tension}),
$$
$$
\textstyle \sum F_x = -0.6 F_{0\text{–}7} + F_{7\text{–}8} + 0.6 F_{7\text{–}2} = 93.75 + F_{7\text{–}8} + 56.25 = 0
\quad\quad\Longrightarrow\quad
F_{7\text{–}8} = -150.0\ \mathrm{kN} \quad (\text{compression}).
$$
*Sanity.* The end post is in compression and the diagonal $7\text{–}2$ in tension, which is exactly the Pratt arrangement: diagonals are designed for tension only and are made slender. The top chord is in compression and the bottom chord in tension, as they must be for a gravity-loaded truss that behaves like a deep beam.
:::
:::

## The method of sections

::: algorithm Method of sections {#alg-sections}
1. Solve the external reactions.
2. Cut the truss with a single straight line through **at most three members** whose forces are wanted, so that the three cut forces are non-concurrent and non-parallel.
3. Draw the free-body diagram of the simpler side, with each cut member drawn in tension.
4. Take moments about the point where the other two cut members' lines cross — this gives the third directly, with no simultaneous equations. Repeat for each.
5. If two of the three cut members are parallel, use $\sum F$ perpendicular to them for the third.
6. Check with $\sum F_x = 0$ and $\sum F_y = 0$ on the section.
:::

::: example Method of sections, central panel {#ex-sections}
For the same truss, find the forces in the top chord $8\text{–}9$, the diagonal $8\text{–}3$ and the bottom chord $2\text{–}3$.
::: solution
Cut vertically through the third panel, through members $8\text{–}9$, $8\text{–}3$ and $2\text{–}3$, and keep the left-hand part, which contains joints 0, 1, 2 and 7 and carries $R_0 = 125\ \mathrm{kN}$ up at $x = 0$ and $50\ \mathrm{kN}$ down at $x = 3\ \mathrm{m}$ and $x = 6\ \mathrm{m}$.

**Bottom chord $2\text{–}3$.** The top chord and the diagonal both pass through joint $8(6, 4)$, so take moments about 8. The diagonal's line passes through 8, so it drops out with the top chord:
$$
\textstyle \sum M_8 = 4 F_{2\text{–}3} - 125 \times 6 + 50 \times 3 + 50 \times 6 = 0
$$
$$
4 F_{2\text{–}3} = 750 - 150 - 300 = 300
\quad\Longrightarrow\quad
F_{2\text{–}3} = +75.0\ \mathrm{kN}\ \text{?}
$$
Careful with the sign of the $50\ \mathrm{kN}$ at joint 2: its line of action passes vertically through $x = 6$, the same abscissa as joint 8, so its moment about 8 is **zero**, not $50 \times 6$. Correcting,
$$
\textstyle \sum M_8 = 4 F_{2\text{–}3} - 125 \times 6 + 50 \times 3 = 4 F_{2\text{–}3} - 750 + 150 = 0
\quad\Longrightarrow\quad
F_{2\text{–}3} = +150.0\ \mathrm{kN} \quad (\text{tension}).
$$
**Diagonal $8\text{–}3$.** The top and bottom chords are both horizontal, so resolve vertically. Only the diagonal has a vertical component besides the loads:
$$
\textstyle \sum F_y = 125 - 50 - 50 - \frac{4}{5} F_{8\text{–}3} = 0
\quad\Longrightarrow\quad
F_{8\text{–}3} = \frac{25 \times 5}{4} = +31.25\ \mathrm{kN} \quad (\text{tension}).
$$
**Top chord $8\text{–}9$.** The diagonal and the bottom chord both pass through joint $3(9, 0)$:
$$
\textstyle \sum M_3 = -125 \times 9 + 50 \times 6 + 50 \times 3 - 4 F_{8\text{–}9} = -1125 + 300 + 150 - 4 F_{8\text{–}9} = 0
$$
$$
F_{8\text{–}9} = \frac{-675}{4} = -168.75\ \mathrm{kN} \quad (168.75\ \mathrm{kN}\ \text{compression}).
$$
*Check.* Vertically: $125 - 50 - 50 - 0.8 \times 31.25 = 25 - 25 = 0$. Horizontally: $150.0 - 168.75 + 0.6 \times 31.25 = 150.0 - 168.75 + 18.75 = 0$. Both close, so the section is in equilibrium and the three forces are right.

*Sanity.* The bending-moment analogy: the bending moment of the truss as a beam at $x = 6\ \mathrm{m}$ is $125 \times 6 - 50 \times 3 = 600\ \mathrm{kN\,m}$, and the chord force couple is $150.0 \times 4 = 600\ \mathrm{kN\,m}$. Chord force $=$ beam bending moment $\div$ truss depth, exactly as for a deep beam — which is the fastest estimate in truss design and the reason a deeper truss is a lighter truss.
:::
:::

::: widget plot
f: 125*x - 50*floor(x/3)*((x-1.5) - 3*(floor(x/3)-1)/2)
x: 0, 18
y: 0, 1000
labels: \text{truss bending moment } M(x) \text{ in kN m}
caption: Bending moment of the six-panel Pratt truss treated as a simply supported beam, in $\mathrm{kN\,m}$, together with the chord force $F_c = M(x) / 4$ obtained by the method of sections at each panel point. The moment is a series of straight lines between load points, and its peak of $900\ \mathrm{kN\,m}$ at mid-span gives a central chord force of $225\ \mathrm{kN}$. Drag along the curve: the chord force is largest where the bending moment is largest, and the diagonals are largest where the shear is largest — near the supports.
:::

## Design consequences: Pratt, Howe, Warren and K

::: proposition Truss geometry follows from the force pattern {#prop-truss-forms}
For a parallel-chord truss under gravity load, the bending moment and shear are greatest at mid-span and near the supports respectively, so:
$$
F_{\text{chord}} = \frac{M(x)}{h}, \qquad F_{\text{diagonal, vertical}} = \frac{V(x)}{\sin\theta} ,
$$
where $h$ is the truss depth and $\theta$ the diagonal's angle to the horizontal. Chord forces therefore peak at mid-span and diagonal forces peak at the ends. Choosing the geometry so that the highly stressed diagonals work in **tension** gives the **Pratt** truss (diagonals slope down towards mid-span); putting them in compression gives the **Howe** truss; alternating them gives the **Warren** truss, whose diagonals reverse under a moving load; and cutting the panels with two diagonals gives the **K** truss, which reduces the bending in the verticals at the price of more members.
:::

::: proof
Cut a panel and resolve vertically: the shear $V(x)$ carried by the section must be carried by the vertical components of whatever cut members are inclined, since the chords are horizontal. With one inclined member cut, $V = F \sin\theta$, giving the second relation; with the chords horizontal, $\sum F_x = 0$ on the section makes the two chord forces equal and opposite, and taking moments about a chord's pin gives $M = F_{\text{chord}} h$, the first relation. Both are exact for any parallel-chord truss with pin joints and joint loading, and both explain the observed force pattern: $M$ is a parabola-like curve peaking at mid-span while $V$ steps down from its maximum at the supports, so diagonals near the ends carry the most. A slender bar in compression buckles at a load proportional to $EI / L^{2}$, so making the highly loaded diagonals tension-only members — as the Pratt does — allows them to be thin rods, while the compression members are kept short by providing lateral restraint at the panel points. That single consideration, not aesthetics, chose the truss form for every railway bridge built between 1850 and 1950.
:::

::: example Design check on a Pratt diagonal {#ex-diag-design}
The end diagonal $7\text{–}2$ of the example truss carries $93.75\ \mathrm{kN}$ in tension. Its length is $\sqrt{3^{2} + 4^{2}} = 5.0\ \mathrm{m}$. Select a round bar and check the stress against a working stress of $140\ \mathrm{MPa}$.
::: solution
The required area is
$$
A_{\text{req}} = \frac{93.75 \times 10^{3}}{140} = 669.6\ \mathrm{mm^{2}} .
$$
A $30\ \mathrm{mm}$ diameter bar has $A = \pi \times 30^{2} / 4 = 706.9\ \mathrm{mm^{2}}$, $5.6$ per cent more than required, and is the lightest standard size that works. Its stress is $93\,750 / 706.9 = 132.6\ \mathrm{MPa}$, and its extension under load is
$$
\delta = \frac{F L}{A E} = \frac{93\,750 \times 5000}{706.9 \times 200\,000} = 3.32\ \mathrm{mm} .
$$
*Sanity.* A $3.3\ \mathrm{mm}$ elongation over $5\ \mathrm{m}$ is a strain of $6.6 \times 10^{-4}$, well inside the elastic range and small enough not to redistribute the truss forces significantly. A $25\ \mathrm{mm}$ bar would give $A = 490.9\ \mathrm{mm^{2}}$ and a stress of $191\ \mathrm{MPa}$, $36$ per cent over the limit — so the next size down is clearly wrong, and the selection is not close.
:::
:::

::: warning Three cut members, three equations — but only if they are independent
The method of sections fails silently when the three cut members are concurrent or parallel. If all three lines of action meet at one point, the three moment equations about that point are all trivially satisfied and the system is singular; if all three are parallel, $\sum F$ along them gives one equation for three unknowns. Curved-chord truss panels are the usual trap: cut four members and use two moment equations about two chord intersections, or cut through a panel whose diagonals cross and remember that the two crossing diagonals together carry the panel shear, which is indeterminate unless one is made deliberately slack.
:::

::: history
The counting rule and the analytic theory of pin-jointed frames were settled in the middle nineteenth century, driven entirely by railway bridges. Whipple's patent truss of 1841 — a double-triangle arrangement still used on American railroads — was designed by rule of thumb, and the first correct analytic treatment is generally credited to the German engineer Johann August Röckle in 1827 and, independently and more clearly, to N. A. Bellaviacich in Vienna in 1847. James Clerk Maxwell's *On the calculation of frames* (1864) gave the reciprocal diagram, the reciprocal theorem of structural analysis, and the first explicit statement that a frame with more bars than $2 j - 3$ cannot be solved by statics. A. F. M. Wagner and, above all, Heinrich Manderla in *Methodode om de spanningen te bepalen, welke in de leden van een traliewerk optreden* (1847) anticipated the method of sections; Manderla's name is attached to the graphical method used by every bridge office until the 1930s. The Pratt truss was patented by Thomas and Caleb Pratt of Baltimore in 1844, precisely in order to put diagonals in tension and allow them to be made of iron rod, and the Howe truss of William Howe of 1840 did the opposite with timber compression members — a direct illustration of structural form following material.
:::

::: quiz
A plane truss has $m + r > 2 j$. What does that mean?
- [ ] It is a mechanism
- [x] It is statically indeterminate
- [ ] It is statically determinate
- [ ] It must contain a zero-force member
::: solution
More unknowns than equations: the truss is **statically indeterminate**, and the member forces depend on the relative stiffnesses of the members. The extra members are not wasted — they provide redundancy, so that the loss of one member does not collapse the truss, which is exactly why modern truss bridges are built indeterminate on purpose. A mechanism has $m + r < 2 j$.
:::
:::

## Where this leads

Truss member forces become the axial loads of [[mechanics-of-materials/axial-loading]] and the buckling checks of [[mechanics-of-materials/buckling]]. Indeterminate trusses, in which $m + r > 2 j$, need the energy methods of [[solid-mechanics/energy-methods]] and the matrix direct stiffness method of [[finite-element-method/direct-stiffness]]. The same counting argument applied to rigid-jointed frames appears in [[statics/frames-machines]], and the load paths of a complete bridge deck are worked out in [[statics/centroids-distributed-loads]].

::: summary
- An ideal truss has pin-jointed, weightless, two-force members loaded only at the joints; every member carries uniform axial force.
- Determinacy is counted: $m + r = 2 j$ for a plane truss, necessary but not sufficient — the arrangement must also be non-degenerate.
- Zero-force members are found by inspection and are kept in the structure even though they carry nothing under the load case considered.
- The method of joints solves two equations per pin, starting where there are at most two unknowns.
- The method of sections cuts at most three members and takes moments where the other two cross; chord force $= M / h$ and diagonal force $= V / \sin \theta$.
- Truss form follows from these two relations: put the highly loaded diagonals in tension and keep the compression members short.
:::

## Exercises

::: exercise Determinacy {level=1 check="19"}
A plane truss has 11 joints and is statically determinate with a pin and a roller support. How many members does it have?
::: solution
$m + r = 2 j$ with $r = 3$ and $j = 11$ gives $m = 22 - 3 = 19$ members.
:::
:::

::: exercise Zero-force members {level=1 check="2"}
In the Pratt truss of the worked examples, how many members carry exactly zero force under the given symmetric gravity loading? (Count only the members that are zero by inspection.)
::: solution
One: the mid-span vertical $3\text{–}9$, because joint 9 carries no load and the top chord is straight there. The full solution gives $F_{3\text{–}9} = 0$ and $F_{8\text{–}9} = F_{9\text{–}10}$. Under a moving load that puts a wheel at joint 9 the member is no longer zero, which is why it is built anyway.
:::
:::

::: exercise Method of joints {level=1 check="156.3"}
For the $18\ \mathrm{m}$ Pratt truss of the worked examples, what is the magnitude of the force in the end post $0\text{–}7$? (Enter the answer in kN.)
::: solution
At joint 0, $\sum F_y = 125 + 0.8 F_{0\text{–}7} = 0$ gives $F_{0\text{–}7} = -156.25\ \mathrm{kN}$, so $156.3\ \mathrm{kN}$ in compression. The end post is the most heavily compressed member in the truss and is the one most likely to govern the design.
:::
:::

::: exercise Method of sections {level=2 check="168.8"}
For the same truss, find the force in the top chord member $8\text{–}9$ at the panel immediately left of mid-span. (Enter the magnitude in kN.)
::: solution
Cut vertically through the panel between joints 8 and 9, that is through members $8\text{–}9$, $8\text{–}3$ and $2\text{–}3$, and keep the left-hand part. The diagonal $8\text{–}3$ and the bottom chord $2\text{–}3$ meet at joint $3(9, 0)$, so take moments there. On the left are $R_0 = 125\ \mathrm{kN}$ up at $x = 0$ and $50\ \mathrm{kN}$ down at $x = 3\ \mathrm{m}$ and $x = 6\ \mathrm{m}$:
$$
\textstyle \sum M_3 = -125 \times 9 + 50 \times 6 + 50 \times 3 - 4 F_{8\text{–}9} = -1125 + 300 + 150 - 4 F_{8\text{–}9} = 0
$$
$$
F_{8\text{–}9} = \frac{-675}{4} = -168.75\ \mathrm{kN}, \qquad 168.8\ \mathrm{kN}\ \text{in compression}.
$$
*Check by the beam analogy.* The simply supported beam moment at $x = 9\ \mathrm{m}$ is $M = 125 \times 9 - 50 \times 6 - 50 \times 3 = 675\ \mathrm{kN\,m}$, and $M / h = 675 / 4 = 168.75\ \mathrm{kN}$. The two agree, which is the fastest way to check any chord force. Forgetting either of the two panel loads in the moment sum gives $1125 / 4 = 281\ \mathrm{kN}$ or $975 / 4 = 244\ \mathrm{kN}$, both badly wrong — the loads between the section and the moment centre must all be included.
:::
:::

::: exercise Design a truss depth {level=2}
A road bridge truss must span $30\ \mathrm{m}$ and carry a uniformly distributed factored load of $60\ \mathrm{kN/m}$. If the working stress in the chords is $150\ \mathrm{MPa}$ and the chords are to be $1.5$ per cent of their force in cross-sectional area per $\mathrm{N/mm^{2}}$, find the required truss depth if the maximum chord force is to stay below $2000\ \mathrm{kN}$.
::: solution
The maximum beam bending moment is
$$
M = \frac{w L^{2}}{8} = \frac{60 \times 30^{2}}{8} = 6750\ \mathrm{kN\,m}.
$$
With $F_{\text{chord}} = M / h$ and $F_{\text{chord}} \le 2000\ \mathrm{kN}$,
$$
h \ge \frac{6750}{2000} = 3.375\ \mathrm{m}.
$$
Take $h = 3.5\ \mathrm{m}$, giving a chord force of $1929\ \mathrm{kN}$ and a required chord area of $1929 \times 10^{3} / 150 = 12\,860\ \mathrm{mm^{2}}$, roughly a $130 \times 100\ \mathrm{mm}$ box section. The span-to-depth ratio is $30 / 3.5 = 8.6$, typical of a road truss; railway trusses go deeper, $L / 8$ to $L / 12$, because the loads are heavier and the deflection limits tighter.
:::
:::

::: exercise Warren truss {level=2}
A Warren truss of span $12\ \mathrm{m}$ and depth $3\ \mathrm{m}$ has four equilateral-ish panels and carries $80\ \mathrm{kN}$ at each of its three interior panel points. Find the force in a diagonal near the support and in a central diagonal, and explain why the central one may reverse sign under a moving load.
::: solution
Reactions are $120\ \mathrm{kN}$ each. The first panel's shear is $120\ \mathrm{kN}$ and is carried by one diagonal whose angle to the horizontal is $\theta = \arctan(3 / 3) = 45^{\circ}$, so
$$
F_{\text{diag}} = \frac{V}{\sin\theta} = \frac{120}{0.7071} = 169.7\ \mathrm{kN} \quad (\text{compression or tension depending on the diagonal's sense}).
$$
At mid-span the shear is zero by symmetry, so the central diagonal carries nothing under this symmetric loading — but a single wheel placed just left of mid-span gives a small positive shear there and a load just right of mid-span gives a small negative one. The central diagonal therefore **reverses**, and must be designed as a strut as well as a tie.

That is the difference between the Warren and the Pratt truss under moving loads: the Warren's diagonals alternate and reverse, so all of them must resist buckling, while the Pratt's are arranged so that the gravity-load diagonals are always in tension and only the counter-diagonals, which are often omitted, reverse. Under a moving load the Pratt needs counters in the end panels, and this is exactly what the "counter" member in a nineteenth-century railway truss is for.
:::
:::

::: exercise Compound truss {level=3}
A compound truss consists of two simple trusses joined by one pin and one link. State the conditions under which it is determinate, and explain why a "Fink" or "lattice" web with crossing diagonals is indeterminate to the first degree.
::: solution
Two simple trusses have $3 j_i - 6$ members between them in total (each simple truss with its own three reactions would be $m_i = 2 j_i - 3$); joining them with a pin (two reaction components) and a link (one) supplies three constraints, so the total is $m + r = 2 j$ and the compound truss is determinate provided the link's line and the pin are not arranged so as to leave a relative rotation or a relative translation unrestrained — the link must not pass through the pin, or the two halves can rotate relatively about it.

A web with two crossing diagonals in one panel has one member too many for $m + r = 2 j$: the panel shear is shared between the two diagonals in a ratio that depends on their relative stiffness, and equilibrium alone gives only $F_1 \sin \theta_1 + F_2 \sin \theta_2 = V$, one equation for two unknowns. The standard engineering escape is to declare one diagonal **slack** — a slender rod that buckles under a tiny compression — and let the other carry the whole shear. That is not an approximation to the indeterminate answer, it is a different structure, and it is legitimate only if the slack member really cannot take compression. Where both diagonals are stout, as in a braced frame, both must be solved for, and the tool is [[solid-mechanics/energy-methods]] or [[finite-element-method/direct-stiffness]].
:::
:::

::: exercise Derivation {level=3}
Show that for any parallel-chord truss of depth $h$ loaded at the lower joints, the force in the chord of the loaded side at panel point $k$ is $F_k = M_k / h$ where $M_k$ is the simply supported beam moment at that point, and that the panel shear in the diagonal is $V_k / \sin \theta$. Hence show that the total axial strain energy of the chords of a truss loaded at the lower joints equals that of a beam of the same span carrying the same loads, to leading order in $h / L$.
::: solution
Cutting panel $k$ and taking moments about the intersection of the two cut non-chord members — which for a parallel-chord truss with one diagonal cut is the far chord's pin — gives $F_k h = M_k$ exactly, since the diagonal and the other chord both pass through that point and the two chord forces form a couple of arm $h$. Resolving vertically across the panel gives $F_{\text{diag}} \sin \theta = V_k$, since the chords are horizontal and contribute nothing vertically.

For the energy, the chord force at position $x$ is $F(x) = M(x) / h$ and its extension is $\delta = F \, \mathrm{d}x / (A E)$, so the strain energy in both chords is
$$
U_{\text{truss}} = 2 \int_0^L \frac{F(x)^{2}}{2 A E}\, \mathrm{d}x
= \frac{1}{A E h^{2}} \int_0^L M(x)^{2}\, \mathrm{d}x .
$$
A beam of the same span, with the same total chord area $2 A$ placed at a lever arm $h$, has second moment of area $I \approx 2 A (h / 2)^{2} = A h^{2} / 2$, and its bending energy is
$$
U_{\text{beam}} = \int_0^L \frac{M(x)^{2}}{2 E I}\, \mathrm{d}x
= \int_0^L \frac{M(x)^{2}}{E A h^{2}}\, \mathrm{d}x ,
$$
which is identical. The truss is therefore a beam whose flanges carry all the bending and whose web carries all the shear, and the identity is exact in the limit of a deep, open-web section. The correction is the shear strain energy in the diagonals, of relative order $(h / L)^{2}$... more precisely of order $(\text{panel depth} / \text{span})^{2}$, which is why a deep truss is well approximated by beam theory and a shallow, heavily panelled one is not. This is the **Vierendeel** and **deep-beam** connection, and it is why the deflection of a truss is usually estimated from the beam bending moment divided by an equivalent $EI$.
:::
:::
