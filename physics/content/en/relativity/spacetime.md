The Lorentz transformation of [[relativity/postulates]] is a change of coordinates, and like any change of coordinates it is best understood geometrically. The Galilean transformation is a *shear* of the $(x, t)$ plane — the time axis stays the time axis, the space axis tilts, and the quantity all frames agree on is the time coordinate alone. The Lorentz transformation is a different kind of map: a **hyperbolic rotation** of the $(ct, x)$ plane, in which the quantity all frames agree on is the quadratic form $c^2 t^2 - x^2$, and the set of points it leaves fixed as a set is the light cone. This chapter draws the picture. The Minkowski diagram is not a decorative extra; it is the statement of the relativity of simultaneity, time dilation, and length contraction in one picture, and it is the reason the causal structure of physics — which events can influence which — is the thing that survives a change of frame.

The two postulates already did the work of finding the transformation [[relativity/postulates#thm-lorentz2]] and its invariant [[relativity/postulates#cor-interval]]. What this chapter adds is the geometry: worldlines, the light cone as the boundary of causal influence, the hyperbolae of constant invariant as the "circles" of this plane, and the classification of pairs of events into timelike, lightlike and spacelike, which is the classification of what *can happen between them*. The four-vector language of [[relativity/four-vectors]] is the algebraic form of the same content; the diagram is the picture.

## Worldlines and the light cone

An **event** is a happening at a point of space and an instant of time: a flash in a lantern, a click on a switch, a collision. It has no duration and no extent — it is the atomic unit of the spacetime picture, and it is what the coordinates $(t, x, y, z)$ of any inertial frame label. A **worldline** is the set of all events in the history of a single object: the particle's, the rocket's, the flash of light's. A particle at rest in $S$ has a vertical worldline in the $(x, ct)$ plane; a particle moving at speed $v$ has a worldline of slope $c/v$ in that plane ($ct$ on the vertical, $x$ on the horizontal, the convention of this chapter).

A signal sent from the origin at $t = 0$ and moving at speed $u$ traces a line of slope $c/u > 1$ (measured in the $(ct, x)$ plane, a smaller slope means a faster signal). Light, at $c$, traces the lines $x = \pm ct$, which are the lines of slope $\pm 1$. The two lines divide the plane into three regions relative to the origin event $O = (0, 0)$:

- The **light cone** (or, in $1+1$ dimensions, the light lines) $x^2 = c^2 t^2$: the set of events a light signal sent from $O$ can reach, or from which a light signal can arrive at $O$.
- The **interior of the light cone** $c^2 t^2 > x^2$: the set of events a signal moving slower than light can reach from $O$, or can be sent to from $O$. These are the events *causally connected* to $O$ by a sub-light or light signal.
- The **exterior of the light cone** $c^2 t^2 < x^2$: the events too far away to be reached from $O$ by any signal at or below light speed, and too far for a signal to have been sent to $O$ from them.

The light cone is the boundary between "can be causally related" and "cannot, by any signal at or below $c$." It is the single most important structure in the diagram, and the single most important fact about it — the fact that is *not* obvious from the drawing, but is forced by the two postulates — is that it is the same set of events in every inertial frame. That is the geometric content of [[relativity/postulates#cor-interval]]: the light cone is the set $c^2 t^2 - x^2 = 0$, and that quadratic form is invariant under the Lorentz transformation of [[relativity/postulates#thm-lorentz2]], so the set it cuts out is the same set of events in every frame.

::: definition Light cone {#def-lightcone}
For an event $O$ at the origin, the **future light cone** of $O$ is the set of events $P$ for which $c^2 (t_P - t_O)^2 - (x_P - x_O)^2 = 0$ and $t_P > t_O$; the **past light cone** is the same with $t_P < t_O$. The **interior of the future light cone** is $c^2 \Delta t^2 - \Delta x^2 > 0$ with $\Delta t > 0$, and the exterior is $c^2 \Delta t^2 - \Delta x^2 < 0$.
:::

In $(1+1)$ dimensions the "cone" is two lines and their interiors; in $3+1$ it is the double cone $c^2 t^2 - x^2 - y^2 - z^2 = 0$ and its interiors. The one-dimensional picture captures all of the causal content, because a boost in one spatial direction does not mix in the other two, and the causal classification of a pair of events is determined by the sign of $c^2 \Delta t^2 - \Delta x^2 - \Delta y^2 - \Delta z^2$, which is the extension of the one-dimensional invariant to three spatial dimensions exactly as argued in [[relativity/postulates]] for the transformation itself.

## The invariant as geometry: hyperbolae, not circles

In the Euclidean plane, the set of points at distance $r$ from the origin is the circle $x^2 + y^2 = r^2$, and a rotation of the plane maps every circle to itself, point for point. The Lorentz transformation is the hyperbolic analogue: the set of points with $c^2 t^2 - x^2 = \alpha$ is a hyperbola, and the Lorentz transformation maps every such hyperbola to itself.

::: theorem Hyperbolae as the invariant curves {#thm-hyperbola}
For $\alpha > 0$, the set $c^2 t^2 - x^2 = \alpha$ is a pair of branches of a hyperbola opening along the $ct$ axis; for $\alpha < 0$, a pair opening along the $x$ axis. The Lorentz transformation of [[relativity/postulates#thm-lorentz2]] maps each hyperbola to itself, and maps the light cone to itself.
:::

::: proof
The classification follows from the sign of $\alpha$: if $\alpha > 0$, then $c^2 t^2 > x^2$, so the points lie inside the light cone, on the branches $ct = \pm\sqrt{x^2 + \alpha/c^2}$, which are hyperbolic curves opening in the $ct$ direction; if $\alpha < 0$, then $x^2 > c^2 t^2$ and the branches are $x = \pm\sqrt{c^2 t^2 - \alpha}$, opening in the $x$ direction. The invariance is exactly [[relativity/postulates#cor-interval]]: $c^2 t'^2 - x'^2 = c^2 t^2 - x^2$, so a point on the hyperbola $\alpha$ has the same value in the primed coordinates and lies on the same hyperbola. The light cone is the case $\alpha = 0$, a degenerate hyperbola, and is mapped to itself by the same argument.

The "circle" radius $r$ in the Euclidean picture is replaced by the "hyperbolic radius" $\sqrt{\alpha}/c$ (for the timelike case), and the rotation angle is replaced by a quantity that measures the hyperbolic rotation: the **rapidity**. Define $\phi$ by

$$
\tanh \phi = \beta = v/c, \qquad \gamma = \cosh \phi, \qquad \gamma \beta = \sinh \phi.
$$ {#eq-rapidity}

These three definitions are consistent: $\sinh \phi = \sqrt{\cosh^2 \phi - 1} = \sqrt{\gamma^2 - 1} = \gamma\beta$, using $\gamma^2 - 1 = \gamma^2 v^2/c^2 = \gamma^2 \beta^2$, and they obey $\cosh^2\phi - \sinh^2\phi = 1$. With the definitions of [[#eq-rapidity]], the Lorentz transformation of [[relativity/postulates#thm-lorentz2]] becomes

$$
ct' = ct \cosh \phi - x \sinh \phi, \qquad x' = -ct \sinh \phi + x \cosh \phi,
$$ {#eq-hyp}

which is exactly the matrix form of a hyperbolic rotation, with the invariant $c^2 t^2 - x^2$ playing the role of the Euclidean $x^2 + y^2$. The rapidity $\phi$ is the additive parameter: a boost at velocity $v_1$ (rapidity $\phi_1$) followed by a boost at $v_2$ (rapidity $\phi_2$) is a single boost at rapidity $\phi_1 + \phi_2$, which is the velocity-addition law of [[relativity/velocity-energy#cor-addition]] re-expressed as an addition.
:::

::: example Rapidity and the composition of two $0.6c$ boosts {#ex-rapidity-comp}
A frame $S_1$ moves at $0.6c$ relative to $S$, and $S_2$ moves at $0.6c$ relative to $S_1$, in the same direction. Find the speed of $S_2$ relative to $S$, both by the velocity-addition law and by rapidities.
::: solution
By [[relativity/velocity-energy#eq-addition]]:

$$
v = \frac{0.6c + 0.6c}{1 + 0.6^2} = \frac{1.2c}{1.36} \approx 0.882c.
$$

By rapidities: $\tanh \phi = 0.6$, so $\phi = \operatorname{artanh}(0.6) = \frac12 \ln \frac{1.6}{0.4} = \frac12 \ln 4 = \ln 2 \approx 0.693$. The composition has rapidity $2\phi = 2 \ln 2 = \ln 4$, so

$$
v/c = \tanh(\ln 4) = \frac{4 - 1/4}{4 + 1/4} = \frac{3.75}{4.25} = \frac{15}{17} \approx 0.882.
$$

Both routes agree, and the rapidity route is a single addition of a number, not a rational function of the velocities. The rapidity is the "angle" of the hyperbolic rotation, and angles add: the composition of two hyperbolic rotations is the hyperbolic rotation whose rapidity is the sum, exactly as the composition of two Euclidean rotations is the rotation whose angle is the sum.
:::
:::

::: example The invariant of a timelike pair: the proper time {#ex-proper-time-geo}
Two events are separated by $\Delta t = 5\,\mathrm{s}$, $\Delta x = 3\,\mathrm{m}$ in $S$, with $c = 3\times 10^{8}\,\mathrm{m/s}$. Classify the separation, find the invariant, and find the proper time between the events.
::: solution
$c \Delta t = 3\times 10^{8} \times 5 = 1.5\times 10^{9}\,\mathrm{m}$, and $\Delta x = 3\,\mathrm{m}$. The invariant is

$$
(c \Delta t)^2 - (\Delta x)^2 = (1.5\times 10^{9})^2 - 9 \approx 2.25\times 10^{18}\,\mathrm{m}^2 > 0,
$$

so the separation is **timelike**: there is an inertial frame in which the two events happen at the same place, and all inertial frames agree on their time order. The proper time — the time read by a clock carried from one event to the other, which is the "length" of the timelike separation in the way $r$ is the length of a Euclidean separation — is

$$
\tau = \frac{\sqrt{(c \Delta t)^2 - (\Delta x)^2}}{c} \approx \frac{1.5\times 10^{9}}{3\times 10^{8}} = 5.0\,\mathrm{s},
$$

to the precision of the numbers (the $3\,\mathrm{m}$ is negligible at $c \Delta t \sim 1.5\times 10^{9}\,\mathrm{m}$). The point of the example is the classification: a timelike pair is one that a single clock can traverse, and the proper time is the invariant "distance" between them, the hyperbolic-radius analogue of the Euclidean $r$ in $x^2 + y^2 = r^2$.
:::
:::

::: quiz A pair of events has $(c \Delta t)^2 - (\Delta x)^2 < 0$. Which statement is true?
- [ ] The separation is timelike, and a single clock can traverse it, with all frames agreeing on the time order
- [ ] The separation is lightlike, so a light signal connects them and all frames agree on the order
- [x] The separation is spacelike, no sub-light signal connects them, and some frames reverse the time order
- [ ] The classification depends on the frame, so the sign cannot be trusted
::: solution
A negative invariant means $|\Delta x| > c|\Delta t|$: the events are too far apart in space for a signal at or below $c$ to connect them. The sign of the invariant is the same in every frame ([[relativity/postulates#cor-interval]]), so the classification is not frame-dependent, but the *time order* is: a spacelike pair has frames in which $\Delta t' = 0$ and frames in which $\Delta t' > 0$ and frames in which $\Delta t' < 0$, because the Lorentz transformation can flip the sign of $\Delta t$ for a spacelike separation while preserving the invariant. A timelike pair has a preserved order in all frames, and a lightlike pair is the boundary case.
:::
:::

The hyperbola $c^2 t^2 - x^2 = 1$ (in units where the constant is $1$) and the light line $ct = |x|$ are the two fixed-feature curves of the diagram: every Lorentz boost maps the hyperbola to itself and the light line to itself. The figure draws both; the "radius" of the hyperbola is the proper time $\tau$ of the timelike pair, the thing every frame agrees on.

::: widget plot
f: sqrt(x^2+1)
f: abs(x)
x: -3, 3
y: 0, 4
labels: hyperbola c^2t^2 - x^2 = 1; light line ct = |x|
caption: The upper branch is the set of events at proper time $\tau = 1$ from the origin, in units where the invariant is $c^2t^2 - x^2 = 1$; the diagonal lines are the light cone. A Lorentz boost moves a point *along* the hyperbola to a new pair of coordinates whose difference of squares is unchanged, and it maps the light line to itself. The hyperbola is the "circle," the light line is the boundary of causal influence.
:::


## Causality: what the diagram says

The classification into timelike, lightlike, and spacelike is not a taxonomy of coordinate artefacts; it is a classification of what can physically happen between the two events.

::: theorem Causality and the invariant {#thm-causality}
Let $P$ and $Q$ be two events with $\Delta x = x_Q - x_P$ and $\Delta t = t_Q - t_P$.
- If $(c\Delta t)^2 - (\Delta x)^2 > 0$ (timelike), a single clock can traverse $P$ to $Q$, every inertial frame agrees that $Q$ is after $P$ if $\Delta t > 0$, and $Q$ is in the future light cone of $P$.
- If $(c\Delta t)^2 - (\Delta x)^2 = 0$ (lightlike), a light signal travels from one to the other, and every inertial frame agrees on the time order.
- If $(c\Delta t)^2 - (\Delta x)^2 < 0$ (spacelike), no signal at or below $c$ connects them, there is an inertial frame in which they are simultaneous, and there are inertial frames in which $Q$ precedes $P$ and frames in which $P$ precedes $Q$.
:::

::: proof
The invariance of the quantity $(c\Delta t)^2 - (\Delta x)^2$ is [[relativity/postulates#cor-interval]] applied to the difference of two events, which the linearity of the transformation guarantees transforms as the coordinates do. The three cases are the three signs.

For the timelike case, the claim "every frame agrees on the order" is: if $\Delta t > 0$, then $\Delta t' > 0$ for every boost. From the time transformation $\Delta t' = \gamma(\Delta t - v \Delta x/c^2)$, with $\Delta x$ bounded by $c\Delta t$ (since $(c\Delta t)^2 > (\Delta x)^2$),

$$
\Delta t' = \gamma \Delta t\left(1 - \frac{v}{c^2}\cdot\frac{\Delta x}{\Delta t}\right),
$$

and since $|\Delta x/\Delta t| < c$ (timelike) and $|v| < c$, the factor $|v \Delta x / (c^2 \Delta t)| < 1$, so $1 - v\Delta x/(c^2 \Delta t) > 0$, and $\Delta t'$ has the same sign as $\Delta t$. The timelike order is invariant.

For the spacelike case, $|\Delta x/\Delta t| > c$, so the factor $v \Delta x/(c^2 \Delta t)$ can exceed $1$ in magnitude for large enough $v$: choose $v = c^2 \Delta x/\Delta x\cdot (1/\Delta x) \cdot \Delta t$… directly, the condition $\Delta t' = 0$ is $v = c^2\Delta t/\Delta x$ (from $\Delta t' = \gamma(\Delta t - v\Delta x/c^2)$), and $|v|/c = c|\Delta t|/|\Delta x| < 1$ precisely when $|\Delta x| > c|\Delta t|$, i.e. precisely when the pair is spacelike. So a spacelike pair has a frame in which it is simultaneous, and frames with $v$ past that value, in the relevant direction, in which the order is reversed. The lightlike case is the boundary: $|\Delta x/\Delta t| = c$, so $v = c^2 \Delta x/\Delta t$ would require $v = \pm c$, which is not an inertial frame, and the order is preserved in all of them.
:::

The physics content is immediate. A **cause** must precede its **effect** in every frame that can both be at the cause and at the effect, or at least not disagree about the order — otherwise the effect would precede the cause in some frame, and a signal carrying the "news" of the effect back to the cause would be a signal travelling faster than light in that frame. The light cone is the boundary of the region in which a sub-light or light signal can carry the causal influence, and the theorem says: everything inside or on the light cone of $P$ has a definite time order relative to $P$ in every frame, and everything outside has no definite order. The causal structure of the physical world is the light-cone structure of spacetime, and it is the part of the spacetime picture that survives a change of inertial frame.

::: warning The axes of a boosted frame are not orthogonal in the diagram
A recurring error in reading Minkowski diagrams is to treat the $(x', ct')$ axes as if they were a rotated copy of the $(x, ct)$ axes in the Euclidean sense, with the same right angle at the origin. They are not. The $ct'$ axis is the worldline of the origin of $S'$, a line of slope $1/\beta$ in the $(ct, x)$ plane (steeper than the light line, since $\beta < 1$), and the $x'$ axis is the line of events simultaneous with the origin event in $S'$, a line of slope $\beta$ in the $(ct, x)$ plane (shallower than the light line). The two axes are not perpendicular in the Euclidean sense of the drawing, and the "grid" of the $(x', ct')$ coordinates is a set of lines, not a set of rectangles. The right angle in the diagram is a property of the drawing, not of the geometry: the invariant is $c^2 t^2 - x^2$, and the "orthogonality" that matters is the hyperbolic one, in which the $ct'$ and $x'$ axes are conjugate directions, not perpendicular ones. Treating the grid as a rotated Euclidean grid is the same mistake as treating a Lorentz boost as a Galilean shear — it is a different transformation, and the diagram shows the difference.
:::

::: intuition The light cone does the causal work, the grid does the bookkeeping
The causal content of relativity — what can influence what — is carried entirely by the light cone, which is the same set of events in every frame. The coordinate grid of a particular frame is a bookkeeping device: a labelling of the same events by different numbers, with no causal content. The two are independent in the sense that a change of frame changes the grid but not the light cone, and a change of the light cone (which would require a change of $c$) would change the causal structure itself. That separation — causal structure invariant, coordinates frame-dependent — is the geometric form of the two postulates, and it is the reason the Minkowski diagram is not a picture of "what things look like from a moving frame" but a picture of the same spacetime, labelled in two ways, with the light cone as the fixed feature that both labellings preserve.
:::

::: application Radar coordinates and the diagram's physical meaning
A single observer at the origin can determine the spacetime position of a distant event without any reference to a lattice of clocks: send a light pulse at local time $t_1$, receive the echo at $t_2$, and the event that is the reflection point has radar time $t = (t_1 + t_2)/2$ and radar distance $x = c(t_2 - t_1)/2$. The "radar coordinates" of the event are defined by the observer's own clock and the speed of light, and agree with the Lorentz coordinates of the observer's inertial frame. The Minkowski diagram, then, is not a convention-free picture: it is the picture of what a physical procedure — the radar procedure — assigns to the events, and the fact that the light cone is preserved under the Lorentz transformation is the fact that the radar procedure gives the same light cone in every inertial frame. The diagram is the geometry, and the geometry is the procedure.
:::

## Worked examples

::: example A pair of events: the full classification, frame by frame {#ex-classification}
Events $P = (x_P, t_P) = (0, 0)$ and $Q = (x_Q, t_Q) = (8\,\mathrm{m}, 30\,\mathrm{ns})$ in $S$, with $c = 3\times 10^{8}\,\mathrm{m/s}$. Classify the separation. Find the speed of a frame $S'$ in which $P$ and $Q$ are simultaneous, and the time order in a frame moving at $0.9c$ in the $+x$ direction.
::: solution
$c\Delta t = c(t_Q - t_P) = 3\times 10^{8} \times 30\times 10^{-9} = 9\,\mathrm{m}$, while $\Delta x = x_Q - x_P = 8\,\mathrm{m}$. The invariant is

$$
(c\Delta t)^2 - (\Delta x)^2 = 9^2 - 8^2 = 17 > 0:
$$

the separation is **timelike**. By [[#thm-causality]] the time order $P$ before $Q$ is the same in every inertial frame, and the pair has a unique **rest frame** — an inertial frame in which the two events happen at the same place, i.e. one with $\Delta x' = 0$. From $\Delta x' = \gamma(\Delta x - v\Delta t) = 0$ that frame moves at

$$
v = \frac{\Delta x}{\Delta t}, \qquad \frac{v}{c} = \frac{\Delta x}{c\Delta t} = \frac{8}{9} \approx 0.889,
$$

a valid sub-light speed, as it must be for a timelike pair. In that frame the time between the events is the **proper time**:

$$
c\,\tau = \sqrt{(c\Delta t)^2 - (\Delta x)^2} = \sqrt{17}\,\mathrm{m} \approx 4.12\,\mathrm{m}, \qquad \tau \approx 13.7\,\mathrm{ns},
$$

the reading of the single clock that is present at both events.

There is, by contrast, no inertial frame in which the pair is simultaneous: $\Delta t' = 0$ would require $v = c^2\Delta t/\Delta x$, with $v/c = c\Delta t/\Delta x = 9/8 > 1$, a super-light "frame," outside the inertial frames. A timelike pair can be made to happen at one *place*, but never at one *time*; a spacelike pair can be made to happen at one time, but never at one place. These are the two halves of the classification, and they are exclusive for a given pair.

Finally, in a frame moving at $0.9c$ in the $+x$ direction, the time difference is

$$
\Delta t' = \gamma\left(\Delta t - \frac{v\Delta x}{c^2}\right) = \gamma\Delta t\left(1 - \frac{v}{c}\cdot\frac{\Delta x}{c\Delta t}\right) = \gamma\Delta t\left(1 - 0.9\times\frac{8}{9}\right) = 0.2\,\gamma\Delta t > 0,
$$

so $Q$ still comes after $P$, as the theorem requires of a timelike pair.
:::
:::

::: example A spacelike pair and its simultaneity frame {#ex-spacelike-frame}
Events $P = (0, 0)$ and $Q = (9\,\mathrm{m}, 20\,\mathrm{ns})$ in $S$. Classify the pair, find the simultaneity frame, and the time order in a frame at $0.9c$.
::: solution
$c\Delta t = 3\times 10^{8} \times 20\times 10^{-9} = 6\,\mathrm{m}$, so the invariant is $6^2 - 9^2 = -45 < 0$: **spacelike**. By [[#thm-causality]] the pair has a unique simultaneity frame, the inertial frame with $\Delta t' = 0$, at

$$
v = \frac{c^2\Delta t}{\Delta x}, \qquad \frac{v}{c} = \frac{c\Delta t}{\Delta x} = \frac{6}{9} = \frac{2}{3},
$$

a valid sub-light speed, and the time order is not invariant. In that frame,

$$
\Delta x' = \gamma\left(\Delta x - v\Delta t\right) = \frac{3}{\sqrt{5}}\left(9 - \frac{2}{3}\cdot 6\right) = \frac{15}{\sqrt{5}} \approx 6.7\,\mathrm{m},
$$

and the invariant checks out: $(c\Delta t')^2 - (\Delta x')^2 = 0 - 225/5 = -45$, the same value as in $S$. In a frame moving at $0.9c$ in the $+x$ direction,

$$
\Delta t' = \gamma\Delta t\left(1 - \beta\,\frac{\Delta x}{c\Delta t}\right) = \gamma\Delta t\left(1 - 0.9\times 1.5\right) = -0.35\,\gamma\,\Delta t < 0,
$$

so $Q$ precedes $P$ in that frame even though $P$ precedes $Q$ in $S$: both orders are realized in valid inertial frames, and the light cone — not the coordinate time — is what fixes the causal status of the pair. There is no inertial frame in which the pair happens at one place, since $\Delta x' = 0$ would require $v/c = \Delta x/(c\Delta t) = 9/6 > 1$.
:::
:::

## Where this leads

The four-vector language — four-velocity, four-momentum, the invariant mass shell, and the collisions that the invariant makes easy — is [[relativity/four-vectors]]. The velocity, energy, and Doppler content is [[relativity/velocity-energy]]. The generalisation from flat Minkowski spacetime to the curved spacetime of general relativity, in which the light cone is still the central structure but the metric is no longer constant, is the subject of the relativistic gravitation course, beginning with [[gravitation/equivalence]]. None of the causal content of this chapter is lost in that generalisation: the light cone is still the boundary of causal influence, the invariant is still the thing all frames agree on, and the classification of pairs of events into timelike, lightlike, and spacelike is still the classification of what can happen between them.

::: history Minkowski's spacetime
The geometric reformulation of special relativity is due to Hermann Minkowski, who in his 1908 address to the German Physical Association in Cologne presented the Lorentz transformation not as a change of coordinate law but as a rotation in a four-dimensional spacetime with invariant $c^2 t^2 - x^2 - y^2 - z^2$, and argued that "henceforth space by itself, and time by itself, are doomed to fade away into mere shadows, and only a kind of union of the two will preserve an independent reality." The quote is from the address, and it is the clearest statement of the geometric content that this chapter has been developing: the invariant is not a computational device, it is the thing that is real, and the coordinates are the shadows. Einstein's own formulation, in the 1905 papers, was the coordinate-law formulation, and the two are the same content in two forms: the algebraic form is what is used in the calculations of [[relativity/velocity-energy]] and [[relativity/four-vectors]], and the geometric form is what is used in the diagrams and the causal arguments of this chapter.
:::

::: summary
- The Minkowski diagram is the $(ct, x)$ plane with the light cone $x = \pm ct$ as its fixed feature; the light cone is the same set of events in every inertial frame, by the invariance of $c^2 t^2 - x^2$ ([[relativity/postulates#cor-interval]]).
- The Lorentz transformation is a hyperbolic rotation of the $(ct, x)$ plane; the "circles" are the hyperbolae $c^2 t^2 - x^2 = \text{const}$, and the rotation parameter is the rapidity $\phi$, $\tanh\phi = v/c$, which adds under composition of boosts ([[#thm-hyperbola]], [[#eq-rapidity]]).
- The classification of a pair of events into timelike, lightlike, and spacelike is invariant, and is the classification of what can physically happen between them: timelike pairs have a definite order in every frame, spacelike pairs do not, and lightlike pairs are the boundary ([[#thm-causality]]).
- The axes of a boosted frame in the diagram are not orthogonal in the Euclidean sense; the grid of the two frames is a different labelling of the same events, with the light cone as the feature both labellings preserve.
- The causal structure — what can influence what — is the part of the spacetime picture that survives a change of inertial frame; the coordinate grid is the part that does not.
- The geometric form of the same content, in four dimensions and with the four-vector algebra, is [[relativity/four-vectors]]; the curved-spacetime generalisation is the starting point of the general-relativity course.
:::

## Exercises

::: exercise level=1
Events $A = (0, 0)$ and $B = (4\,\mathrm{m}, 20\,\mathrm{ns})$ in $S$, with $c = 3\times 10^{8}\,\mathrm{m/s}$. Classify the separation and find the invariant $(c\Delta t)^2 - (\Delta x)^2$.
check="12"
::: solution
$c\Delta t = 3\times 10^{8} \times 20\times 10^{-9} = 6\,\mathrm{m}$. The invariant is $(c\Delta t)^2 - (\Delta x)^2 = 36 - 16 = 20 > 0$: **timelike**. The check value is $20$.
:::
:::

::: exercise level=1
Two boosts, each at $0.5c$, in the same direction. Find the composed speed both by the addition law and by rapidities.
check="0.8"
::: solution
By [[relativity/velocity-energy#eq-addition]]:

$$
v = \frac{0.5c + 0.5c}{1 + 0.5^2} = \frac{c}{1.25} = 0.8c.
$$

By rapidities: $\tanh\phi = 0.5$, so $\phi = \frac12\ln\frac{1.5}{0.5} = \frac12\ln 3 = \frac{\ln 3}{2}$. The composition has rapidity $\ln 3$, and

$$
v/c = \tanh(\ln 3) = \frac{3 - 1/3}{3 + 1/3} = \frac{8/3}{10/3} = 0.8.
$$

Both give $0.8c$, as the check value confirms.
:::
:::

::: exercise level=2 {#exr-frame-sim}
Events $P = (0,0)$ and $Q = (6\,\mathrm{m}, 30\,\mathrm{ns})$ in $S$. Find the speed of the inertial frame in which $P$ and $Q$ are simultaneous, and verify the invariant is positive in both $S$ and that frame.
hint="The simultaneity condition is v = c^2 Delta x / Delta t; the invariant is (c Delta t)^2 - (Delta x)^2 and must match in both frames."
::: solution
$c\Delta t = 9\,\mathrm{m}$, so the invariant is $9^2 - 6^2 = 45 > 0$: the pair is **timelike**. The simultaneity condition $\Delta t' = 0$ gives $v = c^2\Delta t/\Delta x$, with

$$
\frac{v}{c} = \frac{c\Delta t}{\Delta x} = \frac{9}{6} = 1.5,
$$

a super-light speed: no *inertial* frame makes the pair simultaneous, exactly as [[#ex-classification]] states for a timelike pair (which has a place-frame but no time-frame). As a pure coordinate statement the transformation at $v/c = 1.5$ does make $\Delta t' = 0$; as a physical frame it is outside the sub-light range, and the physical inertial frame associated with this pair is its **rest frame**.

The rest frame is the one with $\Delta x' = 0$, at $v = \Delta x/\Delta t$, so $v/c = \Delta x/(c\Delta t) = 6/9 = 2/3$, with $\gamma = 1/\sqrt{1 - 4/9} = 3/\sqrt{5}$. In that frame,

$$
\Delta t' = \frac{\Delta t}{\gamma} = \frac{3\sqrt{5}}{9}\,\Delta t = \tau, \qquad \Delta x' = 0,
$$

and the invariant computed there is

$$
(c\Delta t')^2 - (\Delta x')^2 = (c\Delta t)^2\left(1 - \frac{4}{9}\right) = 81\times\frac{5}{9} = 45,
$$

matching the value $45\,\mathrm{m}^2$ computed in $S$. The invariant is the same number in both frames, as [[relativity/postulates#cor-interval]] requires, and is here the square of the light-time distance $c\tau = \sqrt{45}\,\mathrm{m}$, the proper time between the events times $c$.
:::
:::

::: exercise level=2
A frame $S'$ moves at $0.8c$ relative to $S$. A particle has velocity $(u_x, u_y) = (0.4c, 0.3c)$ in $S$. Find its velocity in $S'$.
hint="Use the full velocity transformation, not just the x-component: u'_y carries a gamma factor."
::: solution
$\gamma = 1/\sqrt{1 - 0.64} = 1/0.6 = 5/3$. The $x$ component, from [[relativity/velocity-energy#thm-velocity2]]:

$$
u'_x = \frac{u_x - v}{1 - vu_x/c^2} = \frac{0.4c - 0.8c}{1 - 0.8 \times 0.4} = \frac{-0.4c}{1 - 0.32} = \frac{-0.4c}{0.68} \approx -0.588c.
$$

The $y$ component:

$$
u'_y = \frac{u_y}{\gamma(1 - vu_x/c^2)} = \frac{0.3c}{(5/3)(0.68)} = \frac{0.3c}{(5)(0.68)/3} = \frac{0.3 \times 3}{5 \times 0.68}\,c = \frac{0.9}{3.4}\,c \approx 0.265c.
$$

So the particle's velocity in $S'$ is approximately $(-0.588c, 0.265c)$. The speed is $\sqrt{0.588^2 + 0.265^2}\,c \approx \sqrt{0.346 + 0.070}\,c \approx \sqrt{0.416}\,c \approx 0.645c$, which is less than $c$, as required. The $y$ component is smaller than the naive $0.3c$ by the factor $\gamma(1 - vu_x/c^2) = (5/3)(0.68) \approx 1.13$, the $\gamma$ factor that the naive vector transformation drops.
:::
:::

::: exercise level=3 {#exr-tachyon}
A hypothetical signal travels faster than light, at speed $u > c$, from event $P$ to event $Q$ in frame $S$. Show that there is an inertial frame $S'$ in which $Q$ precedes $P$, and hence that a second signal sent back from $Q$ at the same super-light speed can arrive at a point before $P$, closing a causal loop.
::: solution
In $S$, the signal goes from $P = (0,0)$ to $Q = (x_Q, t_Q)$ with $x_Q/t_Q = u > c$. In $S'$, moving at $v$ relative to $S$, the time difference is $\Delta t' = \gamma(\Delta t - v\Delta x/c^2) = \gamma \Delta t(1 - v u/c^2)$, since $\Delta x/\Delta t = u$. This is negative when $vu/c^2 > 1$, i.e. when $v > c^2/u$. Since $u > c$, $c^2/u < c$, so there is a sub-light frame speed $v \in (c^2/u, c)$ for which $\Delta t' < 0$: in $S'$, the signal is received at $Q$ before it is sent at $P$.

Now from $Q$, in $S'$, send a second signal at the same super-light speed $u$ back toward the origin region of $S$. The second signal, at speed $u > c$ in $S'$, can be aimed so that its worldline intersects the worldline of $P$ (the origin of $S$, at $x = 0$) at a time $t'' < 0$ in $S'$, i.e. before $P$ happened in $S'$'s coordinates. Concretely, the first signal's worldline in $S'$ goes from $P' = (0,0)$ to $Q'$ with slope $t'/x' = 1/u' < 1/c$ (super-light in $S'$ as well, by the velocity transformation for $u > c$). The second signal, sent from $Q'$ back at speed $u$ in the $-x'$ direction, has a worldline of the same super-light slope in the other direction, and the two worldlines, together with the worldline of $P$ (the origin of $S$, a specific worldline in the diagram), form a triangle: the "send" from $P$, the "receive" at $Q$, and the "receive-back" at a point on $P$'s worldline at an earlier $t'$. The closed causal loop is: $P$ sends, $Q$ receives, $Q$ sends back, $P$ receives before sending. Each leg is a valid super-light signal in the frame in which it is sent; the loop is closed because the super-light speed allows the "send-back" to outrun the light cone and intersect $P$'s worldline in the past. The two postulates, with their shared bound $c$ on signal speed, exclude this: no sub-light signal can close the loop, because the light cone is preserved and the interior of the light cone of $P$ is the same set of events in every frame.
:::
:::

::: exercise level=3
Prove that the set of events reachable from the origin by a signal moving at any speed $0 \le u \le c$, in any inertial frame, is exactly the interior of the future light cone of the origin.
hint="A signal at speed u traces a line of slope c/u in the (ct, x) plane; the union of all such lines for u in [0, c] is the interior of the cone, and the invariance of the cone under the Lorentz transformation means the set is the same in every frame."
::: solution
In a frame in which the signal is sent from the origin at speed $u$ in the $+x$ direction, the signal's worldline is $x = ut$, or in $(ct, x)$ coordinates, $ct = (c/u) x$, a line of slope $c/u \ge 1$ (measured as $ct/x$). The set of all such lines, for $u \in (0, c]$, is the set of all lines through the origin with $ct/x \in [1, \infty)$, i.e. the interior of the future light cone in the $+x$ half-plane (and similarly in the $-x$ half-plane for $u$ in the $-x$ direction). A signal at $u = c$ traces the light line itself, the boundary; a signal at $u \to 0$ traces a line of infinite slope, i.e. the $ct$ axis, the deepest interior. So the set of events reachable by a sub-light or light signal from the origin is exactly the closed interior of the future light cone, including the light cone itself.

The set is frame-independent: the interior of the light cone is $c^2 t^2 > x^2$, $t > 0$, and the invariant $c^2 t^2 - x^2$ is preserved by the Lorentz transformation ([[relativity/postulates#cor-interval]]), so the set is the same set of events in every inertial frame. The physical content is: the region of spacetime that can be causally influenced by the origin, by any signal at or below light speed, is the same region in every frame, and that region is the interior of the future light cone. The light cone is not a coordinate artefact; it is the causal boundary, and it is invariant.
:::
:::

::: exercise level=3
Show that the Lorentz transformation has determinant $1$ (in the $(ct, x)$ basis), and explain why this means the area of a region in the $(ct, x)$ plane is preserved by the transformation, and why that is consistent with the transformation being a "rotation" in the hyperbolic sense.
hint="The matrix is gamma times the matrix with entries 1, -beta; -beta, 1; compute its determinant, then use the hyperbolic parameterization cosh phi, sinh phi."
::: solution
In the $(ct, x)$ basis, the Lorentz transformation is the matrix $\Lambda = \gamma\begin{pmatrix} 1 & -\beta \\ -\beta & 1 \end{pmatrix}$, with $\gamma = 1/\sqrt{1 - \beta^2}$. The determinant is

$$
\det\Lambda = \gamma^2\left(1 \cdot 1 - (-\beta)(-\beta)\right) = \gamma^2(1 - \beta^2) = \frac{1}{1 - \beta^2}(1 - \beta^2) = 1.
$$

A linear map of the plane preserves (signed) area if and only if its determinant has absolute value $1$, so the Lorentz transformation is an area-preserving map of the $(ct, x)$ plane. This is the hyperbolic analogue of the Euclidean fact that a rotation preserves area: a rotation is an orthogonal map (det $= 1$), and a hyperbolic rotation is a map of the Minkowski plane that preserves the quadratic form $c^2 t^2 - x^2$ and has det $= 1$. The area preservation is not the same as the invariant preservation, but they are consistent: the invariant preservation means the hyperbolae $c^2 t^2 - x^2 = \text{const}$ are mapped to themselves, and the area preservation means the transformation does not distort the "size" of regions in the plane. The two properties together are the content of "hyperbolic rotation": a map that preserves the relevant quadratic form and the area, and whose composition is given by the addition of the rapidities, as in [[#ex-rapidity-comp]].
:::
:::

::: exercise level=3
A rod of rest length $L_0$ lies along the $x'$ axis of $S'$. Show that the length of the rod in $S$ is $L_0/\gamma$, by requiring the two end-events to be simultaneous in $S$, and interpret the result geometrically in the Minkowski diagram: the length in $S$ is the distance between the two end-worldlines along a line of constant $t$ in $S$, and that line intersects the two worldlines at events whose $x'$-separation is $L_0$, giving the contraction.
hint="The two end-worldlines are x' = 0 and x' = L_0. In S, a line of constant t intersects them at two events; use the Lorentz transformation to relate the x-separation in S to the L_0 separation in S', with the simultaneity condition in S."
::: solution
The two end-worldlines are $x' = 0$ (left end) and $x' = L_0$ (right end), for all $t'$. A line of constant $S$-time is $t = \text{const}$, and it intersects the two worldlines at two events, $E_L$ and $E_R$, which are the two ends of the rod at the same $S$-time. The length in $S$ is $L = x_R - x_L$, the $x$-separation of those two events.

The left end, $x' = 0$, has worldline $x = vt$ in $S$ (the origin of $S'$, as in [[relativity/postulates#ex-origin-track]]). The right end, $x' = L_0$, has worldline $x = \gamma L_0 + vt$… from the inverse Lorentz law, $x = \gamma(x' + vt')$ at $x' = L_0$: $x_R = \gamma(L_0 + vt'_R)$ and $t_R = \gamma(t'_R + vL_0/c^2)$. The simultaneity condition in $S$ is $t_L = t_R$, with $t_L = \gamma t'_L$ (at $x' = 0$) and $t_R = \gamma(t'_R + vL_0/c^2)$. Setting them equal: $t'_L = t'_R + vL_0/c^2$, so $t'_R - t'_L = -vL_0/c^2$.

The length is $L = x_R - x_L = \gamma(L_0 + vt'_R) - \gamma v t'_L = \gamma L_0 + \gamma v(t'_R - t'_L) = \gamma L_0 - \gamma v(vL_0/c^2) = \gamma L_0(1 - v^2/c^2) = \gamma L_0 \cdot 1/\gamma^2 = L_0/\gamma$.

Geometrically, in the Minkowski diagram, the two end-worldlines are two parallel lines of slope $ct/x = c/v$ (the same slope as the origin-worldline of $S'$), separated by the invariant proper length $L_0$ along the $x'$ direction. A line of constant $S$-time is a line of slope $ct/x = \infty$ (vertical in the $(x, ct)$ plane if $ct$ is vertical) or slope $1$ in the light-cone sense… a line of constant $t$ has $ct = \text{const}$, a horizontal line in the $(x, ct)$ plane, and its intersection with the two parallel worldlines gives the length $L = L_0/\gamma$: the horizontal line cuts the two worldlines closer together (in $x$) than the $x'$-separation $L_0$, by the factor $1/\gamma$, because the worldlines are tilted in the $(x, ct)$ plane and a horizontal line intersects tilted parallel lines closer together than the perpendicular separation. The contraction is a geometric fact about the diagram: the length in a frame is the separation of the worldlines along a line of that frame's time, and the tilt of the worldlines (relative to the frame's time lines) is what produces the factor $1/\gamma$.
:::
:::
