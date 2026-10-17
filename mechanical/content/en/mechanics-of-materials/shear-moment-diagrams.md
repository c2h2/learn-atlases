If you learn one skill in this course, learn to draw the shear-force and bending-moment diagrams. Every other stress calculation in the chapter — bending stress, shear stress, deflection, buckling, fatigue, plastic collapse — begins with a value of $V$ or $M$ read off these two pictures, and an error in them propagates undiminished into the final answer. They are also the only place in mechanics where you can check your own arithmetic visually: the diagrams must satisfy four geometric rules, and if they do not, something is wrong no matter how confident you feel.

The rules are the differential relationships
$$
\\frac{\\mathrm{d} V}{\\mathrm{d} x} = - w(x), \\qquad
\\frac{\\mathrm{d} M}{\\mathrm{d} x} = V(x), \\qquad
\\frac{\\mathrm{d}^{2} M}{\\mathrm{d} x^{2}} = - w(x),
$$
and their integral counterparts: a load jumps the shear, a couple jumps the moment, the change in shear equals minus the area under the load, and the change in moment equals the area under the shear. Everything else is bookkeeping.

::: warning Sign convention — settle it before you start
This book uses the **beam convention**: for a beam with $x$ increasing to the right, $V$ and $M$ are positive when, on the **left face of a cut**, $V$ acts downward and $M$ is sagging (compression on top). Positive $V$ therefore rotates the element clockwise and positive $M$ makes it smile. The alternative convention used by some structural texts and by most finite-element codes flips the sign of $V$, and software output is not always labelled. Before reading a stress from a diagram produced by anyone else — a colleague, a package, a handbook — confirm which convention produced it. The magnitudes never change; the sign of $V$ does, and $V$ is what decides where the shear stress and the principal stress act.
:::

## The differential relationships

::: definition Shear force and bending moment {#def-shear-moment}
At a section at distance $x$, the **shear force** $V(x)$ is the algebraic sum of the transverse forces to one side, and the **bending moment** $M(x)$ is the algebraic sum of the moments of the forces to that side about the section. For a beam carrying a distributed load $w(x)$ (positive downward),
$$
\\frac{\\mathrm{d} V}{\\mathrm{d} x} = - w, \\qquad
\\frac{\\mathrm{d} M}{\\mathrm{d} x} = V, \\qquad
\\frac{\\mathrm{d}^{2} M}{\\mathrm{d} x^{2}} = - w ,
$$
with the integral consequences
$$
V_2 - V_1 = - \\int_1^2 w \, \\mathrm{d} x, \\qquad
M_2 - M_1 = \\int_1^2 V \, \\mathrm{d} x .
$$
A concentrated load causes a **step** in $V$ equal to the load; a concentrated couple causes a **step** in $M$ equal to the couple and leaves $V$ unchanged.
:::

::: proof
Isolate an element of length $\\mathrm{d} x$ carrying a distributed load $w$ per unit length. On its left face act $V$ and $M$ in the positive sense; on its right face, $V + \\mathrm{d} V$ and $M + \\mathrm{d} M$ in the opposite positive sense. Vertical equilibrium gives
$$
V - (V + \\mathrm{d} V) - w \, \\mathrm{d} x = 0
\\quad\\Longrightarrow\\quad
\\frac{\\mathrm{d} V}{\\mathrm{d} x} = - w .
$$
Moments about the right-hand face give
$$
M - (M + \\mathrm{d} M) + V \, \\mathrm{d} x - w (\\mathrm{d} x) \\tfrac{1}{2} \\mathrm{d} x = 0 .
$$
The last term is second-order small and drops, leaving $\\mathrm{d} M / \\mathrm{d} x = V$. Differentiating the first and substituting the second gives $\\mathrm{d}^{2} M / \\mathrm{d} x^{2} = - w$.

The same element also proves the jump conditions. Take the limit as the element shrinks onto a concentrated load $P$: the load is finite while $\\mathrm{d} x$ is not, so $\\Delta V = - P$ and $M$ is continuous. Shrink onto a concentrated couple $C$ and the moment equilibrium gives $\\Delta M = C$ while the force equation gives $\\Delta V = 0$.
:::

::: algorithm Drawing the diagrams {#alg-sfd}
1. **Solve for the reactions** using the whole beam. If the beam is statically determinate in the vertical direction, do this first and check by taking moments about a point not on the beam's line of action.
2. **Choose a side.** Working from the left is conventional; working from whichever end has fewer loads is faster and just as correct.
3. **Move left to right, tracking $V$ and $M$ as running totals.** A downward point load subtracts from $V$; a uniform load of intensity $w$ subtracts $w x$; a clockwise applied couple adds to $M$ and nothing to $V$.
4. **Use areas, not equations, wherever possible.** $\\Delta V = -$(area under $w$), $\\Delta M = $ (area under $V$). This is exact for polynomials and far less error-prone than integrating.
5. **Note the shape.** Where $w = 0$, $V$ is horizontal and $M$ is straight; where $w$ is constant, $V$ is straight and $M$ is parabolic (concave down for downward load); where $V = 0$, $M$ has a maximum or minimum.
6. **Close the diagram.** At a free end both $V$ and $M$ must be zero; at a simple end support $M$ must be zero unless a couple is applied or the beam continues over the support. If the diagram does not close, an earlier step is wrong.
:::

::: example Simply supported with a point load {#ex-ss-point}
A beam of span $6\\ \\mathrm{m}$ on simple supports carries a downward load of $24\\ \\mathrm{kN}$ at $4\\ \\mathrm{m}$ from the left support. Draw the shear and moment diagrams and find the maximum moment.
::: solution
**Reactions.** Taking moments about the right support, $R_A \\times 6 = 24 \\times 2$, so
$$
R_A = 8\\ \\mathrm{kN}, \\qquad R_B = 16\\ \\mathrm{kN}.
$$
**Shear.** From the left, $V$ jumps to $+ 8\\ \\mathrm{kN}$ at $A$, stays constant (no load between $A$ and the point load), then drops by $24$ at $x = 4$ to $- 16\\ \\mathrm{kN}$, and closes to zero at $B$.

**Moment.** $M$ starts at zero and rises linearly with slope $+ 8$ to
$$
M(4) = 8 \\times 4 = 32\\ \\mathrm{kN\,m},
$$
then falls with slope $- 16$ to $M(6) = 32 - 16 \\times 2 = 0$. $\checkmark$

**Maximum.** $M_{\\max} = 32\\ \\mathrm{kN\,m}$ directly under the load, where $V$ changes sign.

*Check.* The closed-form result for a load $P$ at distance $a$ from the left of a span $L$ is $M_{\\max} = P a b / L = 24 \\times 4 \\times 2 / 6 = 32\\ \\mathrm{kN\,m}$. $\checkmark$ Memorise $P a b / L$: it is the answer to half the point-load problems you will meet, and it also explains why a load carried at mid-span is worse than the same load carried at a quarter-point ($PL / 4$ against $3 PL / 16$, a $33$ per cent difference).

*Sanity.* The moment diagram is a triangle with its peak under the load, and the shear diagram is a rectangle-plus-rectangle whose two areas, $8 \\times 4 = 32$ and $- 16 \\times 2 = - 32$, are equal and opposite — which is exactly the condition that $M$ returns to zero at the far end. Whenever you draw a shear diagram, check that its total area is zero for a simply supported beam; it is the fastest error detector there is.
:::
:::

::: example Cantilever with a uniform load {#ex-cantilever-udl}
A cantilever of length $3\\ \\mathrm{m}$ carries a uniform load of $15\\ \\mathrm{kN / m}$ over its outer $2\\ \\mathrm{m}$. Draw the diagrams and find the maximum shear and moment.
::: solution
**Reactions.** Total load $15 \\times 2 = 30\\ \\mathrm{kN}$ acting $2\\ \\mathrm{m}$ from the fixed end, so
$$
R_A = 30\\ \\mathrm{kN}, \\qquad M_A = 30 \\times 2.0 = 60\\ \\mathrm{kN\,m}.
$$
**Shear.** Working from the **free (right) end** is easiest: $V = 0$ at the tip, grows linearly over the loaded outer $2\\ \\mathrm{m}$ to $15 \\times 2 = 30\\ \\mathrm{kN}$ at the inner edge of the load, then stays at $30\\ \\mathrm{kN}$ over the unloaded inner $1\\ \\mathrm{m}$ to the wall.

**Moment.** Over the loaded region $M$ is parabolic, going from $0$ at the tip to
$$
M = - 15 \\times 2 \\times 1 = - 30\\ \\mathrm{kN\,m}
$$
at the inner edge of the load, then falls linearly with slope $- 30$ over the remaining $1\\ \\mathrm{m}$ to
$$
M_{\\text{wall}} = - 30 - 30 \\times 1 = - 60\\ \\mathrm{kN\,m}.
$$
*Check.* $M_{\\text{wall}} = - 60\\ \\mathrm{kN\,m}$ balances the reaction moment exactly. $\checkmark$

**Maximum.** $V_{\\max} = 30\\ \\mathrm{kN}$ and $M_{\\max} = 60\\ \\mathrm{kN\,m}$, both at the wall.

*Sanity.* The classic error is to write $w L^{2} / 2$ with $L$ the full cantilever length, giving $15 \\times 9 / 2 = 67.5\\ \\mathrm{kN\,m}$. The load does not extend to the wall, so the correct answer is $60\\ \\mathrm{kN\,m}$, $11$ per cent less. On a cantilever the moment is largest at the support, which is why a cantilever balcony fails at the root, why the top reinforcement of a concrete cantilever is at the **top** (the fibres there are in tension), and why a shelving bracket's worst weld is the one nearest the wall.
:::
:::

::: widget plot
f: 8*x - 24*max(0,x-4)
x: 0, 6
y: -18, 10
labels: \text{shear force (kN)}
caption: Shear diagram for the beam of Example 1: $V = 8\\ \\mathrm{kN}$ from $A$ to the load and $- 16\\ \\mathrm{kN}$ beyond it. The two rectangular areas, $+ 32$ and $- 32\\ \\mathrm{kN\,m}$, cancel exactly, which is the graphical statement that the moment returns to zero at the far support. Reading $\\Delta M$ as the area under this diagram is faster and less error-prone than writing the bending equation and integrating.
:::

::: proposition Standard results worth memorising {#prop-standard-beams}
For a prismatic beam of span $L$, the maxima of the bending moment are:

- **Uniformly distributed load $w$:** $V_{\max} = w L / 2$, $M_{\max} = w L^{2} / 8$ at mid-span.
- **Central point load $P$:** $V_{\max} = P / 2$, $M_{\max} = P L / 4$ under the load.
- **Point load at $a$ from one end, $b$ from the other:** $V_{\max} = P b / L$, $M_{\max} = P a b / L$ under the load.
- **Applied central couple $C$:** $V = C / L$ constant, $M_{\max} = C$ immediately beside the couple.
- **Cantilever with tip load $P$:** $V = P$ constant, $M_{\max} = P L$ at the wall.
- **Cantilever with uniform load $w$:** $V_{\max} = w L$, $M_{\max} = w L^{2} / 2$ at the wall.
- **Cantilever with end couple $C$:** $V = 0$, $M = C$ constant over the whole length.

Every one of these follows in two lines from $\mathrm{d} M / \mathrm{d} x = V$ and the area rule, and being able to write them down cold is the difference between checking a design in thirty seconds and rebuilding it from scratch.
:::

::: proof
Two representative derivations. For the **uniformly loaded simply supported beam**, $V$ is a triangle from $+ w L / 2$ to $- w L / 2$ with a zero crossing at mid-span, so
$$
M_{\\max} = \\int_0^{L / 2} V \\, \\mathrm{d} x = \\tfrac{1}{2} \\times \\frac{w L}{2} \\times \\frac{L}{2} = \\frac{w L^{2}}{8} .
$$
For the **point load at $a$ from the left and $b$ from the right**, the reactions are $P b / L$ and $P a / L$, the moment rises linearly to the load and falls linearly to zero, so
$$
M_{\\max} = \\frac{P b}{L} \\times a = \\frac{P a b}{L} ,
$$
which for $a = b = L / 2$ reduces to $P L / 4$. The remaining rows follow the same way; note in particular that a central couple produces a **constant** shear of $C / L$ and a moment diagram with a step, so the maximum moment is the couple itself and is reached immediately beside the applied couple, not at mid-span.
:::

## Where the maxima are

::: proposition Locating the extreme moment {#prop-max-moment}
Because $\\mathrm{d} M / \\mathrm{d} x = V$, the bending moment has a stationary value where the shear **vanishes or changes sign**. For a beam carrying transverse loads only, the maximum moment is therefore at one of:
- a point where $V = 0$ inside a span (a maximum, since $\\mathrm{d}^{2} M / \\mathrm{d} x^{2} = - w < 0$ for downward load),
- a point load, where $V$ jumps through zero,
- an applied couple, where $M$ itself jumps,
- a support, where the moment may be negative and larger in magnitude than any span moment.
Compare the **absolute values** at all of these; the governing moment is the largest magnitude, not the largest positive value.
:::

::: example Overhanging beam {#ex-overhang}
A beam $A B C$ has a support at $A$, a support at $B$, $5\\ \\mathrm{m}$ away, and an overhang $B C$ of $2\\ \\mathrm{m}$. It carries a uniform load of $10\\ \\mathrm{kN / m}$ over the whole $7\\ \\mathrm{m}$ and a point load of $20\\ \\mathrm{kN}$ at the tip $C$. Find the maximum moment.
::: solution
**Reactions.** Total distributed load $70\\ \\mathrm{kN}$ at $3.5\\ \\mathrm{m}$ from $A$, plus $20\\ \\mathrm{kN}$ at $7\\ \\mathrm{m}$. Moments about $A$:
$$
R_B \\times 5 = 70 \\times 3.5 + 20 \\times 7 = 245 + 140 = 385
\\quad\\Longrightarrow\\quad
R_B = 77\\ \\mathrm{kN}, \\qquad R_A = 90 - 77 = 13\\ \\mathrm{kN}.
$$
**Shear.** $V (0^{+}) = + 13\\ \\mathrm{kN}$; $V$ falls at $10\\ \\mathrm{kN / m}$, so $V = 0$ at $x = 1.3\\ \\mathrm{m}$; at $B$, $V (5^{-}) = 13 - 50 = - 37\\ \\mathrm{kN}$ and $V (5^{+}) = - 37 + 77 = + 40\\ \\mathrm{kN}$; at $C$, $V (7^{-}) = 40 - 20 = + 20\\ \\mathrm{kN}$, and the $20\\ \\mathrm{kN}$ tip load closes it to zero. $\checkmark$

**Moments at the candidates.**
$$
M(1.3) = 13 \\times 1.3 - 10 \\times 1.3 \\times 0.65 = 16.9 - 8.45 = + 8.45\\ \\mathrm{kN\,m},
$$
$$
M(B) = 13 \\times 5 - 10 \\times 5 \\times 2.5 = 65 - 125 = - 60\\ \\mathrm{kN\,m},
$$
$$
M(C) = 0 . \\checkmark
$$
**Governing:** $|M|_{\\max} = 60\\ \\mathrm{kN\,m}$ at support $B$, not the $8.45\\ \\mathrm{kN\,m}$ in the span.

*Sanity.* The support moment is seven times the span moment, which is typical of a long overhang with a heavy tip load. A designer who sizes the beam on the mid-span moment would specify a section $7$ times too small at the support. This is also why a steel canopy beam is often tapered or haunched towards its bearing, and why a continuous concrete beam is reinforced at the top over the supports and at the bottom in the span — the two regions need reinforcement on opposite faces because the moment changes sign.
:::
:::

::: example Simply supported with a couple {#ex-couple-beam}
A beam of span $4\\ \\mathrm{m}$ carries a clockwise applied couple of $30\\ \\mathrm{kN\,m}$ at $1.5\\ \\mathrm{m}$ from the left support and no other load. Draw the diagrams.
::: solution
**Reactions.** A couple is balanced only by a couple, so the reactions form a force couple:
$$
R_A = R_B = \\frac{30}{4} = 7.5\\ \\mathrm{kN},
$$
with $R_A$ downward and $R_B$ upward for a clockwise applied couple.

**Shear.** $V = - 7.5\\ \\mathrm{kN}$ throughout — the couple does not affect the shear at all.

**Moment.** $M$ starts at zero, falls linearly with slope $- 7.5$ to
$$
M(1.5^{-}) = - 11.25\\ \\mathrm{kN\,m},
$$
**jumps up by $30$** to $+ 18.75\\ \\mathrm{kN\,m}$, then rises with slope $- 7.5$... no: with $V = - 7.5$ it continues to fall, and
$$
M(4) = 18.75 - 7.5 \\times 2.5 = 0 . \\checkmark
$$
**Maximum:** $|M|_{\\max} = 18.75\\ \\mathrm{kN\,m}$, just to the right of the couple.

*Sanity.* The jump equals the applied couple exactly, and the diagram closes to zero at the far support — the two checks that confirm the reaction couple was put in the right sense. This is the diagram of a bracket bolted to a column at an offset, of a rigid pallet carried on a fork-lift truck, and of a shaft carrying a bevel gear whose tooth reaction includes a moment. The lesson is that an applied couple produces a discontinuous moment diagram with a **step**, and that the maximum moment sits immediately beside the couple, not at mid-span.
:::
:::

::: example Triangular load {#ex-triangular}
A simply supported beam of $6\\ \\mathrm{m}$ span carries a load that rises linearly from zero at the left support to $12\\ \\mathrm{kN / m}$ at the right. Find the position and value of the maximum moment.
::: solution
The load intensity is $w (x) = 12 x / 6 = 2 x\\ \\mathrm{kN / m}$. The total is $\\tfrac{1}{2} \times 12 \times 6 = 36\\ \\mathrm{kN}$ acting at $2 L / 3 = 4\\ \\mathrm{m}$ from the left, so
$$
R_A = \frac{36 \times 2}{6} = 12\\ \\mathrm{kN}, \\qquad R_B = 24\\ \\mathrm{kN}.
$$
**Shear.**
$$
V (x) = 12 - \\int_0^x 2 t\\, \\mathrm{d} t = 12 - x^{2},
$$
which vanishes at $x = \\sqrt{12} = 3.464\\ \\mathrm{m}$.
**Moment.**
$$
M (x) = 12 x - \\frac{x^{3}}{3}, \\qquad
M_{\\max} = 12 \\times 3.464 - \\frac{41.57}{3} = 41.57 - 13.86 = 27.7\\ \\mathrm{kN\\,m}.
$$
*Check.* $M (6) = 72 - 72 = 0$. $\\checkmark$ And $V (6) = 12 - 36 = - 24 = - R_B$. $\\checkmark$

*Sanity.* The maximum moment occurs at $0.577 L$, not at mid-span, because the load is heavier towards the right; the general result for a triangle peaking at the right support is $x = L / \\sqrt{3}$. Note also that the maximum moment is $0.77 w_{\\max} L^{2} / 12$, well below the $w L^{2} / 8$ of a uniform load of the same peak intensity — a useful fact when a soil pressure or a hydrostatic load varies linearly with depth, as it does behind every retaining wall and every bulkhead.
:::
:::

::: example Gerber beam with an internal hinge {#ex-gerber}
A beam has a pin at $A$, a roller at $B$ $4\\ \\mathrm{m}$ away, a cantilever arm from $B$ to an internal hinge at $C$, $2\\ \\mathrm{m}$ beyond $B$, and a suspended span $C D$ of $4\\ \\mathrm{m}$ resting on a roller at $D$. A load of $15\\ \\mathrm{kN}$ acts at the middle of $C D$. Draw the diagrams.
::: solution
**Break at the hinge.** The suspended span $C D$ simply supports the $15\\ \\mathrm{kN}$ between $C$ and $D$, so it delivers
$$
V_C = V_D = 7.5\\ \\mathrm{kN}
$$
to the cantilever tip and takes $7.5\\ \\mathrm{kN}$ at $D$.

**Main beam** $A B C$ now carries a downward $7.5\\ \\mathrm{kN}$ at $C$. Moments about $B$:
$$
R_A \\times 4 + 7.5 \\times 2 = 0 \\quad\\Longrightarrow\\quad R_A = - 3.75\\ \\mathrm{kN}, \\qquad R_B = 11.25\\ \\mathrm{kN}.
$$
**Moments.** $M$ rises from zero at $A$ with slope $- 3.75$ to
$$
M_B = - 3.75 \\times 4 = - 15\\ \\mathrm{kN\\,m},
$$
then rises with slope $+ 7.5$ to $M_C = - 15 + 7.5 \times 2 = 0$, which it must because the hinge cannot carry moment. $\\checkmark$ In the suspended span $M$ peaks under the load at
$$
M = 7.5 \\times 2 = + 15\\ \\mathrm{kN\\,m}.
$$
**Governing:** $|M|_{\\max} = 15\\ \\mathrm{kN\\,m}$, equally at $B$ and under the load.

*Sanity.* The hinge makes the structure determinate and forces $M = 0$ at $C$ — that is the whole point of a Gerber joint. Real uses are the hinged girder bridge, where the hinge lets the spans rotate independently under differential settlement and thermal movement without generating a secondary moment; the articulated concrete road pavement; and the compound steel frame of a machine bed, where a machined joint is deliberately inserted so that the assembly tolerances do not lock in a residual moment. The rule to carry away: **an internal hinge is a known-zero-moment point**, and it is always one of the candidate sections.
:::
:::

::: warning Reading a diagram you did not draw
Three failure modes recur when engineers read someone else's diagrams. First, **units**: a diagram labelled "moment" in $\\mathrm{kN\,m}$ read as $\\mathrm{kN\,mm}$ understresses a section by a factor of $1000$. Second, **which extreme**: the largest positive and the largest negative moment may both matter, since a section that is strong in one sense is often weak in the other — a timber joist reinforced on its soffit, a thin-walled tube that buckles in the compression flange, or a masonry arch that cannot take tension at all. Third, **the accompanying shear**: the maximum moment and the maximum shear rarely occur at the same section, but the section where the *combination* is worst is where a web, a weld or a bolt group fails. Always tabulate $V$ and $M$ together at every candidate section before sizing anything.
:::

::: history
The graphical method of drawing shear and moment diagrams is a product of railway bridge design in the 1850s and 1860s, when the arrival of moving locomotive loads made the maximum bending moment in a span a moving-load problem rather than a static one. Sir William John Macquorn Rankine set out the method in his *Manual of Civil Engineering* of 1858, where the bending moment is defined as the algebraic sum of the moments of the forces on one side and the "bending moment diagram" is drawn to scale for a variety of load cases; his treatment is essentially what is taught today, and his notation for it survives in British practice. The differential relationship $\\mathrm{d} M / \\mathrm{d} x = V$ had appeared earlier, in the work of Claude-Louis Navier and in the girder theories of William Fairbairn, whose experiments on wrought-iron plates of the 1840s established empirically that the failure of a plate girder was governed by the maximum moment at mid-span. The moving-load envelope — the diagram of maximum moment at every section as a train crosses — is due to Émile Weyrauch and, in the form still used for bridge design, to the German school of the 1870s, and it remains the reason every bridge code publishes a load model rather than a load.
:::

::: quiz
A beam's shear-force diagram is zero over a length of the span. What follows about the bending moment over that length?
- [ ] The bending moment is zero
- [x] The bending moment is constant
- [ ] The bending moment is a parabola
- [ ] Nothing can be said without knowing the reactions
::: solution
The bending moment is constant. Since $\mathrm{d} M / \mathrm{d} x = V = 0$, $M$ does not vary — the region is in **pure bending**. This is exactly the situation in the middle third of a four-point bending test, which is why that test exists: it produces a length of beam with a known, uniform moment and zero shear, so the bending stresses can be measured without a superimposed shear stress and without the ambiguity of where the maximum is. It is also why a beam loaded by two equal rollers symmetrically placed fails first between them.
:::
:::

## Where this leads

The shear and moment diagrams are the input to [[mechanics-of-materials/bending-stress]] and [[mechanics-of-materials/transverse-shear]], to the deflection calculations of [[mechanics-of-materials/beam-deflection]], and to the plastic collapse mechanisms of [[solid-mechanics/plasticity]]. Where a beam has more than two supports the reactions cannot be found from statics at all, the diagrams become indeterminate, and they must be obtained by the energy methods of [[solid-mechanics/energy-methods]] or by the matrix stiffness method of [[finite-element-method/direct-stiffness]].

::: summary
- $\\mathrm{d} V / \\mathrm{d} x = - w$ and $\\mathrm{d} M / \\mathrm{d} x = V$: loads step the shear, couples step the moment, and areas under one diagram give changes in the other.
- Draw the diagrams as running totals from one end; they must close to zero at a free end and to zero moment at a simple support.
- The maximum moment occurs where $V = 0$ or changes sign, at a point load, at an applied couple, or at a support — compare absolute values at all of them.
- On a cantilever both $V$ and $M$ peak at the support; on a simply supported beam under uniform load $M$ peaks at mid-span where $V = 0$.
- A couple produces a step in $M$ equal to the couple and leaves $V$ unchanged; the extreme moment sits immediately beside it.
- Size for the **combination** of $V$ and $M$ at the same section, and confirm the sign convention before reading a diagram produced by software.
:::

## Exercises

::: exercise Shear {level=1 check="10"}
A simply supported beam of $4\\ \\mathrm{m}$ span carries $20\\ \\mathrm{kN}$ at mid-span. What is the shear just to the left of the load?
::: solution
$10\\ \\mathrm{kN}$. The reactions are equal by symmetry, and the shear between the left support and the load equals $R_A$.
:::
:::

::: exercise Moment {level=1 check="20"}
For the same beam, what is the maximum bending moment in $\mathrm{kN\,m}$?
::: solution
$M = P L / 4 = 20 \\times 4 / 4 = 20\\ \\mathrm{kN\,m}$.
*Note.* The shear just left of the load is $10\\ \\mathrm{kN}$ and the moment is the area under the shear diagram over the first $2\\ \\mathrm{m}$, $10 \\times 2 = 20\\ \\mathrm{kN\,m}$. $\checkmark$
:::
:::

::: exercise Uniform load {level=1 check="11.25"}
A simply supported beam of $3\\ \\mathrm{m}$ span carries $10\\ \\mathrm{kN / m}$. Find the maximum moment in $\mathrm{kN\,m}$.
::: solution
$M = w L^{2} / 8 = 10 \\times 9 / 8 = 11.25\\ \\mathrm{kN\,m}$.
*Note.* The shear at the support is $15\\ \\mathrm{kN}$ and the area of the triangular shear diagram is $\\tfrac{1}{2} \\times 15 \\times 1.5 = 11.25$. $\checkmark$
:::
:::

::: exercise Cantilever {level=1 check="40"}
A cantilever of $2\\ \\mathrm{m}$ carries a tip load of $20\\ \\mathrm{kN}$. Find the maximum moment in $\mathrm{kN\,m}$.
::: solution
$M = P L = 20 \\times 2 = 40\\ \\mathrm{kN\,m}$ at the wall. The shear is constant at $20\\ \\mathrm{kN}$ and the moment diagram is a triangle, whose area $\\tfrac{1}{2} \\times 20 \\times 2 \\times 2 = 40$ gives the change in moment over the length.
:::
:::

::: exercise Locate the maximum {level=2}
A simply supported beam of $6\\ \\mathrm{m}$ span carries $8\\ \\mathrm{kN / m}$ over the left half only. Find the position and value of the maximum moment.
::: solution
Total load $24\\ \\mathrm{kN}$ at $1.5\\ \\mathrm{m}$ from $A$. Moments about $B$: $R_A \\times 6 = 24 \\times 4.5$, so $R_A = 18\\ \\mathrm{kN}$, $R_B = 6\\ \\mathrm{kN}$.
Shear $V = 18 - 8 x$ for $x < 3$, which vanishes at $x = 2.25\\ \\mathrm{m}$:
$$
M_{\\max} = 18 \\times 2.25 - 8 \\times 2.25 \\times 1.125 = 40.5 - 20.25 = 20.25\\ \\mathrm{kN\,m}.
$$
*Check.* At $x = 3$, $M = 54 - 36 = 18\\ \\mathrm{kN\,m}$, and from the right $M = 6 \\times 3 = 18\\ \\mathrm{kN\,m}$. $\checkmark$ The maximum is at $2.25\\ \\mathrm{m}$, not at mid-span, because the load is asymmetric.
:::
:::

::: exercise Draw the diagrams {level=2}
A beam $A B C$ is supported at $A$ and at $B$, $4\\ \\mathrm{m}$ away, with a $1\\ \\mathrm{m}$ overhang to $C$. It carries $12\\ \\mathrm{kN / m}$ on the overhang only. Find the reactions and the maximum moment.
::: solution
Overhang load $12\\ \\mathrm{kN}$ at $4.5\\ \\mathrm{m}$ from $A$. Moments about $A$: $R_B \\times 4 = 12 \\times 4.5$, so $R_B = 13.5\\ \\mathrm{kN}$ and $R_A = 12 - 13.5 = - 1.5\\ \\mathrm{kN}$ (downward).
The moment is zero at $A$, negative over the overhang, and at $B$
$$
M_B = - 12 \\times 0.5 = - 6\\ \\mathrm{kN\,m}.
$$
In the span the moment is negative throughout, peaking in magnitude at $B$: $|M|_{\\max} = 6\\ \\mathrm{kN\,m}$.
*Sanity.* The reaction at $A$ is downward, so the beam would lift off without a hold-down — the classic overhang result, and the reason a balcony's inner bearing must be bolted down, not merely seated.
:::
:::

::: exercise Design {level=3}
A simply supported beam of $5\\ \\mathrm{m}$ span carries a uniform load of $18\\ \\mathrm{kN / m}$ including its own weight. Select a universal beam with an allowable bending stress of $165\\ \\mathrm{MPa}$, and check the shear for a web thickness of $6\\ \\mathrm{mm}$.
::: solution
$$
M_{\\max} = \\frac{w L^{2}}{8} = \\frac{18 \\times 25}{8} = 56.25\\ \\mathrm{kN\,m}, \\qquad
Z_{\\text{req}} = \\frac{56.25 \\times 10^{6}}{165} = 341 \\times 10^{3}\\ \\mathrm{mm^{3}} .
$$
A $254 \\times 102\\ \\mathrm{UB}\\ 22$ has $Z_x = 271 \\times 10^{3}\\ \\mathrm{mm^{3}}$ — too small. A $305 \\times 102\\ \\mathrm{UB}\\ 25$ has $Z_x = 373 \\times 10^{3}\\ \\mathrm{mm^{3}}$, which is adequate with $M = 373 \\times 10^{3} \\times 165 = 61.5\\ \\mathrm{kN\,m}$ of capacity.

**Shear check.** $V_{\\max} = 18 \\times 5 / 2 = 45\\ \\mathrm{kN}$, and taking the web depth as $290\\ \\mathrm{mm}$,
$$
\\tau = \\frac{45 \\times 10^{3}}{6 \\times 290} = 25.9\\ \\mathrm{MPa},
$$
comfortably below the typical $0.4 \\sigma_y$ web allowance.

*Design comment.* The beam is bending-governed by a wide margin, which is normal for spans above about fifteen times the depth. The selected section is $25\\ \\mathrm{kg / m}$, so its own weight contributes $0.25\\ \\mathrm{kN / m}$ of the $18$ — the "including its own weight" phrase is doing almost nothing here, but on a long span with a heavy load it can be worth several per cent, and a design that ignores it and then adds a margin has made two errors instead of one.
:::
:::

::: exercise Derivation {level=3}
For a simply supported beam of span $L$ carrying a uniform load $w$, obtain $V(x)$ and $M(x)$ by direct integration of the differential relationships, applying the boundary conditions explicitly. Then show that the maximum moment is $w L^{2} / 8$ and that the moment at the quarter-points is $3 w L^{2} / 32$.
::: solution
Integrate $\\mathrm{d} V / \\mathrm{d} x = - w$:
$$
V = - w x + C_1 .
$$
Integrate $\\mathrm{d} M / \\mathrm{d} x = V$:
$$
M = - \\frac{w x^{2}}{2} + C_1 x + C_2 .
$$
**Boundary conditions.** $M (0) = 0$ gives $C_2 = 0$. $M (L) = 0$ gives $C_1 = w L / 2$, which is the reaction $R_A$. Hence
$$
V = w \\left( \\frac{L}{2} - x \\right), \\qquad
M = \\frac{w x}{2} (L - x) .
$$
$V = 0$ at $x = L / 2$, where
$$
M_{\\max} = \\frac{w \\left( L / 2 \\right)}{2} \\left( L - \\frac{L}{2} \\right) = \\frac{w L^{2}}{8} .
$$
At $x = L / 4$,
$$
M = \\frac{w L}{8} \\cdot \\frac{3 L}{4} = \\frac{3 w L^{2}}{32} ,
$$
which is $75$ per cent of the mid-span value.

*Comment.* The last result is the basis of the standard test for beams whose capacity changes along the span: since the moment is already three-quarters of its peak at the quarter-points, a haunch or a flange plate that runs only over the middle third saves very little, whereas one that runs to the quarter-points captures most of the benefit. It is also why a steel plate girder's flange plates are stopped short of the ends with a tapered runout — the moment there is small, and a plate ending in a sharp termination would be a fatigue crack waiting to start.
:::
:::
