A muon created high in the atmosphere can reach the ground, and a clock that leaves and comes back is behind the clock that stayed. Neither fact fits the single universal time of [[relativity/galilean]]. The postulates in [[relativity/postulates]] keep the laws of physics in the same form in every inertial frame, and they keep the speed of light in vacuum equal to the same \(c\) for every inertial observer, whatever the motion of the source. This chapter turns those two sentences into statements about clocks, rods and the words "at the same time".

The comparison is always between specified events. A moving clock is slow when its proper time is set beside two synchronised clocks in the other frame. A moving rod is short when its ends are marked at one time in the frame where it is moving. Looking at a clock through a telescope is a different operation, because the light itself takes time to arrive. That distinction is the whole of the subject.

Throughout, the squared interval between two events is \((c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2\). The sign is the mostly-minus convention: a positive value will turn out to mean that a clock can be present at both events. The speed of light is \(c = 2.99792458\times 10^8\,\mathrm{m/s}\).

## Events and proper time

An experiment does not record "the time" as a single substance spread over the universe. It records things that happen: a particle is created, a detector clicks, a clock hand passes a mark, two worldlines meet. Each of those is tied to a place and an instant.

::: definition Event and proper time {#def-proper-time}
An **event** is a point occurrence, specified by a time coordinate and a position in a chosen inertial frame. The **proper time** \(\Delta\tau\) between two events is the time recorded by a clock that is present at both, at rest relative to an inertial frame in which the two events happen at the same spatial coordinates. Equivalently, \(\Delta\tau\) is the time those two events span on one clock that travels inertially from one to the other.
:::

Proper time is a reading on one instrument. It is not the difference of two clocks that sit in different places, and it is not what a distant observer sees after waiting for the light. If the two events happen at different places in every inertial frame, no inertial clock is present at both, and there is no inertial proper time of that kind. Accelerated clocks are taken up after the constant-velocity case is in hand.

In the frame where the clock is at rest, the two events are \((t_1, x_0)\) and \((t_2, x_0)\). The proper time is \(\Delta\tau = t_2 - t_1\). Another frame, moving at constant velocity relative to the first, assigns those same two events different time coordinates. The postulates fix the relation. They do not leave it as a matter of taste.

The Galilean transformation of [[relativity/galilean]] set \(t' = t\) and so forced every frame to share one time. A spherical light pulse centred on the origin at \(t = 0\) is \(x^2 + y^2 + z^2 = c^2 t^2\) in one frame. If time were shared and the spatial origin merely slid by \(vt\), the same pulse would not be a sphere of speed \(c\) in the other frame. The second postulate says that it is. The time coordinates must therefore mix with the position coordinates. The rest of the chapter is that mixing, read first on a clock and then on a rod.

## A light clock

Take a clock that needs no gears. Two mirrors face each other, a distance \(L\) apart, and a light pulse bounces between them in vacuum. Each return of the pulse to the lower mirror is a tick. The apparatus is simple enough that the postulates decide it completely, and it is honest enough that the two events which define one tick — departure and return at the lower mirror — happen at the same place in the clock's rest frame. One clock is present at both events. The interval between them is a proper time, with no synchronisation convention hidden inside it.

::: theorem Time dilation {#thm-dilation}
Let two events happen at the same place in an inertial frame, separated by proper time \(\Delta\tau\). In an inertial frame in which that place moves at constant speed \(v < c\), the coordinate time \(\Delta t\) between the same two events is

$$
\Delta t = \gamma\,\Delta\tau, \qquad \gamma = \frac{1}{\sqrt{1 - v^2/c^2}}.
$$ {#eq-dilation}

The factor \(\gamma\) is the **Lorentz factor**. It depends on the speed and not on the direction. It satisfies \(\gamma \ge 1\), with equality only at \(v = 0\).
:::

::: proof
Work first in the rest frame of the light clock. The mirrors are separated by \(L\) along \(y\), and the clock is at rest. A round trip of the pulse covers \(2L\) at speed \(c\), so the proper time between departure and return at the lower mirror is

$$
\Delta\tau = \frac{2L}{c}.
$$

Now use a frame \(S\) in which the clock moves at constant speed \(v\) along \(x\), the mirrors still separated along \(y\). The pulse leaves the lower mirror and meets it again. Between those events the clock advances a distance \(v\,\Delta t\), where \(\Delta t\) is the coordinate time in \(S\). Each leg of the trip is the hypotenuse of a right triangle of height \(L\) and base \(v\,\Delta t/2\). The second postulate says the pulse still travels at \(c\) in \(S\), so

$$
\left(\frac{c\,\Delta t}{2}\right)^2 = L^2 + \left(\frac{v\,\Delta t}{2}\right)^2.
$$

Rearrange:

$$
\begin{aligned}
c^2(\Delta t)^2 - v^2(\Delta t)^2 &= 4L^2 = c^2(\Delta\tau)^2, \\
(\Delta t)^2\left(1 - \frac{v^2}{c^2}\right) &= (\Delta\tau)^2.
\end{aligned}
$$

Coordinate time is positive when proper time is, so the positive root is \(\Delta t = \gamma\,\Delta\tau\) with \(\gamma\) as in [[#eq-dilation]]. The same algebra with the pulse going only one way would need a second clock at the upper mirror, and those two clocks would have to be synchronised. The round trip avoids that. It uses one clock.

The result is not a peculiarity of mirrors. Suppose a mechanical clock, present at the same two events, disagreed with the light clock. Their disagreement would be an absolute fact, the same in every frame, and it would mark out the rest frame of one of the clocks. That contradicts the first postulate. Every reliable clock present at both events therefore advances by the same \(\Delta\tau\), and [[#eq-dilation]] is a relation between events, not between brands of clock.
:::

Read [[#eq-dilation]] in the direction it is written. The proper time, on the one clock that is present at both events, is the shorter reading. The coordinate time is the difference of two clocks at rest in \(S\), synchronised with each other, which the moving clock passes: one at the departure event, one at the return. People summarise this as "a moving clock runs slow". The sentence is right only for that comparison. It does not say that a photograph of the moving clock, or a light signal from it, displays a slow reading. Light-travel time has not yet been included.

The factor grows slowly and then very fast. At small \(\beta = v/c\),

$$
\gamma = 1 + \tfrac12\beta^2 + \tfrac38\beta^4 + \cdots,
$$

so the fractional excess of coordinate time over proper time is of order \(\beta^2/2\). At \(v = 30.0\,\mathrm{m/s}\), \(\beta = 1.0007\times 10^{-7}\) and \(\tfrac12\beta^2 = 5.01\times 10^{-15}\). Over a minute, the two readings differ by a few times \(10^{-13}\,\mathrm{s}\). Galilean kinematics is the right tool at that speed. The plot below is the same function out to speeds where it is not.

::: widget plot
f: 1/sqrt(1-x^2)
x: 0, 0.95
caption: Lorentz factor γ against v/c, from 0 to 0.95. It stays near 1 at small fractions of c and rises without bound as v approaches c. At 0.800 the value is 5/3.
:::

::: example The factor at four-fifths of c {#ex-gamma}
Find \(\gamma\) for \(v = 0.800c\), and the proper time on a clock that moves at this speed for \(1.00\,\mu\mathrm{s}\) of coordinate time.
::: solution
With \(\beta = 0.800\), \(\beta^2 = 0.640\) and \(1 - \beta^2 = 0.360\). Then

$$
\gamma = \frac{1}{\sqrt{0.360}} = \frac{1}{0.600} = \frac{5}{3} = 1.6667
$$

to five figures. The exact value is the fraction \(5/3\), not a decimal that has been rounded early. [[#eq-dilation]] then gives

$$
\Delta\tau = \frac{\Delta t}{\gamma} = 1.00\times\frac{3}{5} = 0.600\,\mu\mathrm{s}.
$$

The moving clock advances \(0.600\,\mu\mathrm{s}\) between two events that the synchronised lab clocks separate by \(1.00\,\mu\mathrm{s}\). The ratio is exactly \(3/5\), which is \(1/\gamma\).
:::
:::

A large \(\gamma\) does not mean the moving clock is defective. In its own frame it ticks at its proper rate, and the lab clocks are the ones that are moving. The asymmetry in a single number \(\Delta t/\Delta\tau\) comes from the asymmetry in the equipment: one clock on one side of the comparison, two synchronised clocks on the other. The twin journey later in the chapter is the place where that remark stops being optional.

::: quiz
Which comparison is the one in [[#thm-dilation]]?
- [ ] Whatever time a distant observer reads by looking at a single moving clock, including the travel time of the light.
- [x] The proper time on one clock, against the difference of two synchronised clocks at rest that the moving clock passes.
- [ ] The length of a rod, whether or not the two ends are recorded at one instant.
- [ ] A rule that each of two travellers on a round trip must find the other younger when they meet.
::: solution
[[#thm-dilation]] compares one clock, present at both events, with two synchronised clocks in the frame where those events happen in different places. A telescope reading mixes in the Doppler effect of [[relativity/velocity-energy]]. Length is a different pair of events. At a reunion both clocks are in one place, and they do not each show the other as younger.
:::
:::

## Muons and the dilated lifetime

Cosmic-ray muons are a standard application because their proper lifetime is a few microseconds and their speeds are a sizeable fraction of \(c\). The number below is a teaching speed, \(0.800c\), chosen so that \(\gamma = 5/3\) exactly. Real cosmic-ray muons are often faster. The arithmetic is the same.

::: example A muon at four-fifths of c {#ex-muon}
A muon is created at \(v = 0.800c\) and has proper lifetime \(\Delta\tau = 2.20\,\mu\mathrm{s}\), the lifetime in its rest frame. Find the lifetime in the Earth frame and the distance it travels in the Earth frame if it lives exactly one lifetime and does not slow down. Compare with the distance computed from the proper lifetime and the same speed.
::: solution
The creation and the decay happen at the same place in the muon's rest frame, so the \(2.20\,\mu\mathrm{s}\) is a proper time. In the Earth frame

$$
\Delta t = \gamma\,\Delta\tau = \frac{5}{3}\times 2.20\,\mu\mathrm{s} = 3.6667\,\mu\mathrm{s},
$$

which is \(3.67\,\mu\mathrm{s}\) to three significant figures. The distance travelled is velocity times that coordinate time, not \(c\) times it. The muon is not a light pulse. With \(c = 2.99792458\times 10^8\,\mathrm{m/s}\),

$$
\begin{aligned}
d &= (0.800c)\,\Delta t \\
&= 0.800\times 2.99792458\times 10^8\times 3.6667\times 10^{-6}\,\mathrm{s} \\
&= 879\,\mathrm{m},
\end{aligned}
$$

to three significant figures. The unrounded product is \(879.39\,\mathrm{m}\). Using the proper lifetime in the same frame, as a Newtonian calculation would, gives

$$
d_{\mathrm{N}} = (0.800c)\,\Delta\tau = 528\,\mathrm{m}
$$

to three significant figures (unrounded, \(527.63\,\mathrm{m}\)). The ratio of the two distances is exactly \(\gamma = 5/3\), because the speed was held fixed and only the time was dilated.

Multiplying \(c\), rather than \(0.800c\), by \(3.67\,\mu\mathrm{s}\) produces about \(1.10\,\mathrm{km}\). That is how far light travels in the dilated lifetime. It is not the muon's path. The same slip with the proper lifetime produces about \(0.660\,\mathrm{km}\), which is \(c\,\Delta\tau\), again a light-travel distance. Both comparisons in this example use \(v = 0.800c\).

In the muon's frame the muon is at rest and does not travel at all. The atmosphere moves past it at \(0.800c\), and the muon lasts \(2.20\,\mu\mathrm{s}\). The thickness of air that sweeps past in that proper time is

$$
v\,\Delta\tau = 528\,\mathrm{m},
$$

the same \(528\,\mathrm{m}\). That length is the Earth-frame track, \(879\,\mathrm{m}\), divided by \(\gamma\). The next sections give this division a name and a rule about which events are allowed in the measurement.
:::
:::

Bruno Rossi and David B. Hall measured this kind of effect in 1941, not at the single speed \(0.800c\) but as a dependence of the decay rate of cosmic-ray mesotrons on their momentum. The slower group decayed faster, in the sense time dilation requires. It was a confirmation, a generation after the 1905 derivation, not the evidence Einstein used.

## Synchronisation and the train

Proper time used one clock. Almost every other measurement uses two. Two clocks at rest a distance apart can be set to agree only by a convention, and the second postulate makes one convention natural.

::: definition Einstein synchronisation {#def-sync}
Clocks at rest in an inertial frame are **synchronised** by light in vacuum. A flash sent from the spatial midpoint reaches both clocks, and those arrival events are assigned the same reading. Equivalently, a signal leaves clock \(A\) at reading \(t_1\), reflects off clock \(B\), and returns to \(A\) at reading \(t_2\); the reflection is assigned the reading \((t_1 + t_2)/2\) on \(B\). The two-way speed of light is \(c\) by the light-clock measurement. Einstein synchronisation is the convention that splits the round trip so the one-way coordinate speed is \(c\) as well.
:::

The convention is part of the frame, not an extra physical force. Once it is adopted, "at the same time" means "at equal readings of synchronised clocks at rest in this frame". A different frame has a different set of clocks and a different slicing.

Einstein's train makes the clash concrete. A long carriage moves at constant velocity relative to a platform. Observer \(M'\) stands at the midpoint of the carriage. Observer \(M\) stands on the platform. Two lightning strokes hit the front and the back of the carriage. Arrange the strokes so that, in the platform frame, they are simultaneous and \(M\) is equidistant from them at that instant. The flashes reach \(M\) together: the distances are equal and the speed is \(c\).

\(M'\) is moving towards the front stroke and away from the rear stroke. The front flash has a shorter distance to cover before it meets \(M'\), and the rear flash a longer one. They do not arrive together. \(M'\) is at the midpoint of the carriage, the speed of light in the carriage frame is the same \(c\), and the two flashes were emitted at the two ends. Unequal arrival times therefore mean unequal emission times in the carriage frame. The stroke towards which \(M'\) is moving happened earlier.

No one has made a measuring error. \(M\) used platform synchronisation; \(M'\) used carriage synchronisation. The two pairs of clocks do not agree on which events share a time. There is nothing left of the Galilean \(t' = t\) once this is accepted.

The quantitative gap has to wait for the transformation between the frames. The train already shows that the gap is required by the postulates, and that it has the sign "the front event is earlier for the observer who rides with the carriage" when the carriage moves towards that end relative to the platform.

## The Lorentz transformation

Standard configuration means the following. Frame \(S'\) moves at constant velocity \(v\) along the positive \(x\)-axis of frame \(S\). The axes are parallel, and the origins coincide at \(t = t' = 0\). Transverse coordinates will be unchanged. The job is to find \(x'\) and \(t'\) in terms of \(x\) and \(t\).

::: theorem Lorentz transformation {#thm-lorentz}
In standard configuration, with \(\gamma = 1/\sqrt{1 - v^2/c^2}\),

$$
x' = \gamma\,(x - vt), \qquad t' = \gamma\left(t - \frac{vx}{c^2}\right), \qquad y' = y, \qquad z' = z.
$$ {#eq-lorentz}

The inverse, expressing the unprimed coordinates, is the same map with \(v\) replaced by \(-v\):

$$
x = \gamma\,(x' + vt'), \qquad t = \gamma\left(t' + \frac{vx'}{c^2}\right).
$$ {#eq-lorentz-inv}
:::

::: proof
Homogeneity of space and time requires a linear map. If a given displacement \((\Delta t, \Delta x)\) were transformed by a factor that depended on where the interval sat, the same clock and the same rod would behave differently after a mere shift of the origin, and that shift would be detectable. We therefore take

$$
x' = A\,(x - vt)
$$

for a coefficient \(A\) that may depend on \(v\) but not on \(x\) or \(t\). The form already builds in the motion of the origin of \(S'\): that origin is the set of events \(x' = 0\), which must be the line \(x = vt\).

The principle of relativity requires the inverse to be the same rule with the velocity reversed. Frame \(S\) moves at \(-v\) relative to \(S'\), and isotropy means the coefficient depends on \(v\) through \(v^2\), so it is the same \(A\):

$$
x = A\,(x' + vt').
$$

A light pulse sent along the positive axis at the moment the origins coincide is the set of events \(x = ct\), and also the set \(x' = ct'\), because both frames measure speed \(c\). Substitute \(x' = ct'\) and \(x = ct\) into the pair above:

$$
ct' = A\,(c - v)\,t, \qquad ct = A\,(c + v)\,t'.
$$

Multiply these and cancel \(tt'\), which is not zero along the ray:

$$
c^2 = A^2\,(c^2 - v^2), \qquad A^2 = \frac{1}{1 - v^2/c^2}.
$$

The coefficient \(A\) is positive: a positive \(x\) at \(t = 0\) is still a positive \(x'\) when \(v = 0\). Thus \(A = \gamma\).

To recover \(t'\), substitute \(x' = \gamma(x - vt)\) into \(x = \gamma(x' + vt')\) and solve:

$$
\begin{aligned}
x &= \gamma\big(\gamma(x - vt) + vt'\big), \\
vt' &= \frac{x}{\gamma} - \gamma(x - vt), \\
t' &= \gamma t - \frac{\gamma vx}{c^2},
\end{aligned}
$$

where the last line uses \(\gamma - 1/\gamma = \gamma v^2/c^2\), which is \(\gamma^2 - 1 = \gamma^2 v^2/c^2\) rearranged. This is [[#eq-lorentz]]. Replacing \(v\) by \(-v\) and swapping labels gives [[#eq-lorentz-inv]].

It remains to rule out a transverse contraction. Suppose a rod along \(y\), at rest in \(S\), and an identical rod along \(y'\), at rest in \(S'\). As the origins pass, the rods either scrape or they do not. A scrape is frame-independent. If each frame measured the other's rod as shorter, each would predict a miss that the other denied, or each would predict a scrape the other denied. The only consistent possibility is \(y' = y\), and likewise \(z' = z\).
:::

Two checks belong with the formula before any rod is measured.

When \(v/c\) is small, \(\gamma \to 1\) and \(vx/c^2\) is negligible for any laboratory distance and time. Then \(x' \approx x - vt\) and \(t' \approx t\), which is the Galilean transformation. The light-clock estimate \(\gamma - 1 \approx \tfrac12\beta^2\) says how large the fractional error is. At \(0.800c\) it is not a correction. It is \(\gamma - 1 = 2/3\).

A light ray \(x = ct\) maps to another light ray. From [[#eq-lorentz]],

$$
\begin{aligned}
x' &= \gamma(ct - vt) = \gamma(c - v)\,t, \\
t' &= \gamma\left(t - \frac{vct}{c^2}\right) = \gamma\left(1 - \frac{v}{c}\right)t,
\end{aligned}
$$

so \(x'/t' = c\). The negative-going ray \(x = -ct\) maps to \(x' = -ct'\) by the same algebra with the sign of \(c\) reversed. The second postulate is not an extra constraint patched on afterwards. It is built into [[#eq-lorentz]].

::: proposition Invariance of the interval {#prop-interval}
Under [[#eq-lorentz]],

$$
(c\Delta t')^2 - (\Delta x')^2 = (c\Delta t)^2 - (\Delta x)^2.
$$ {#eq-interval}

Including the transverse coordinates, which are unchanged,

$$
(\Delta s)^2 = (c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2
$$

is the same number in every inertial frame in standard configuration. If \((\Delta s)^2 > 0\) the interval is **timelike** and \(\Delta\tau = \sqrt{(\Delta s)^2}/c\) is the proper time between the events. If \((\Delta s)^2 = 0\) the interval is **lightlike**. If \((\Delta s)^2 < 0\) the interval is **spacelike**.
:::

::: proof
It is enough to treat a pair of events with one of them at the origin, and to drop the \(\Delta\) signs, because the transformation is linear and homogeneous. Then

$$
\begin{aligned}
(ct')^2 - (x')^2
&= \gamma^2\left(ct - \frac{vx}{c}\right)^2 - \gamma^2(x - vt)^2 \\
&= \gamma^2\left[c^2 t^2 - 2vxt + \frac{v^2 x^2}{c^2} - x^2 + 2vxt - v^2 t^2\right] \\
&= \gamma^2\left[(c^2 - v^2)t^2 - \left(1 - \frac{v^2}{c^2}\right)x^2\right] \\
&= \gamma^2\left(1 - \frac{v^2}{c^2}\right)\big[(ct)^2 - x^2\big].
\end{aligned}
$$

The prefactor is \(1\). The transverse pieces \((\Delta y)^2\) and \((\Delta z)^2\) are equal on both sides, so they may be subtracted without spoiling the equality.

If the two events happen at one place in some inertial frame, \((\Delta s)^2 = (c\Delta\tau)^2\) there, hence in every frame. That identifies \(\sqrt{(\Delta s)^2}/c\) as the proper time whenever \((\Delta s)^2 > 0\). A lightlike interval is a pair of events a light pulse can connect, since \((c\Delta t)^2 = (\Delta x)^2\) is invariant. A spacelike interval cannot be the experience of one inertial clock: proper time would not be real.
:::

The sign is a convention, fixed for this course. A book that writes \((\Delta x)^2 - (c\Delta t)^2\) has flipped every statement of the form "positive means timelike". The invariant object is the interval. Neither \(\Delta t\) nor \(\Delta x\) is invariant on its own, which is why a shared time and a shared length both failed.

::: corollary Time dilation from the transformation {#cor-dilation-lt}
If two events occur at the same place in \(S'\), so that \(\Delta x' = 0\), then \(\Delta t = \gamma\,\Delta t'\). Identifying \(\Delta t'\) with the proper time recovers [[#eq-dilation]].
:::

::: proof
[[#eq-lorentz-inv]] gives \(\Delta t = \gamma(\Delta t' + v\Delta x'/c^2)\). Set \(\Delta x' = 0\). The light-clock argument and the transformation are the same statement in different clothes. The light clock shows where \(\gamma\) comes from physically; the transformation shows that every pair of events at one place, not only mirror ticks, is dilated by that same factor.
:::

## Simultaneity as a formula

The train can now be given a number. Take two events that are simultaneous in \(S\), so \(\Delta t = 0\), at positions differing by \(\Delta x\).

::: proposition Relativity of simultaneity {#prop-simultaneity}
In standard configuration, events that are simultaneous in \(S\) and separated by \(\Delta x\) have

$$
\Delta t' = -\gamma\frac{v\,\Delta x}{c^2}
$$ {#eq-sim}

in \(S'\). Events simultaneous in \(S'\) and separated by \(\Delta x'\) have \(\Delta t = \gamma v\Delta x'/c^2\) in \(S\). For \(v > 0\), of two events simultaneous in \(S\), the one at larger \(x\) is the earlier one in \(S'\).
:::

::: proof
Subtract [[#eq-lorentz]] between the two events: \(\Delta t' = \gamma(\Delta t - v\Delta x/c^2)\). Set \(\Delta t = 0\). The inverse statement is [[#eq-lorentz-inv]] with \(\Delta t' = 0\). The sign is the train: if the carriage of \(S'\) moves in the positive \(x\) direction, the forward event (larger \(x\)) has the negative \(\Delta t'\) and happens earlier for \(S'\).
:::

The offset is first order in \(v/c\). Time dilation is second order. At ordinary speeds the failure of simultaneity, although absolutely real, is far too small to notice on separated clocks, while the dilation is smaller still. At \(0.800c\) neither is small.

A spacelike pair can be reordered. If \(|\Delta x| > c|\Delta t|\), the choice \(\beta = c\Delta t/\Delta x\) has \(|\beta| < 1\), and in the frame moving at that velocity relative to \(S\) the two events are simultaneous, by [[#eq-sim]] run backwards. A slightly different velocity puts them in the opposite time order. No light signal can connect them, because a signal doing so would outrun light. Cause and effect are not assigned to a spacelike pair. Timelike order does not reverse: the proper-time clock really does depart before it arrives, in every frame.

::: example How far apart is a microsecond of disagreement {#ex-sim}
Two events are simultaneous in the lab and separated by a distance whose light-travel time is \(\Delta x/c = 2.00\,\mu\mathrm{s}\). The other frame moves at \(v = 0.600c\). Find the time interval those events span in the moving frame.
::: solution
First \(\gamma\). With \(\beta = 0.600\), \(1 - \beta^2 = 0.640\) and

$$
\gamma = \frac{1}{\sqrt{0.640}} = \frac{1}{0.800} = 1.25 = \frac{5}{4}.
$$

[[#eq-sim]] needs \(\gamma v\Delta x/c^2 = \gamma\beta\,(\Delta x/c)\):

$$
|\Delta t'| = 1.25\times 0.600\times 2.00\,\mu\mathrm{s} = 1.50\,\mu\mathrm{s}.
$$

The event at larger \(x\) is earlier in \(S'\) by \(1.50\,\mu\mathrm{s}\) if \(S'\) moves in the positive \(x\) direction. Dilation has not been used as a separate correction. It is already inside \(\gamma\). Leaving \(\gamma\) out would give \(1.20\,\mu\mathrm{s}\), which is the lag of a pair of clocks as computed in the next section, a different pair of events.
:::
:::

## Length

A rod has a rest length because its ends are at rest: you may mark them whenever you like and the marks do not move. In a frame where the rod is moving, the end-marks must be made at the same time in that frame. Otherwise you have marked one end, waited, and marked the other end after the rod has slid, and the difference of positions is not a length.

::: definition Proper length {#def-proper-length}
The **proper length** \(L_0\) of a rod is the distance between its ends in an inertial frame where the rod is at rest. Equivalently, it is the distance between the worldlines of the two ends, measured on any simultaneity slice of the rod's rest frame. Those slices agree with each other because the ends are not moving.
:::

::: theorem Length contraction {#thm-contraction}
A rod of proper length \(L_0\), moving lengthwise at constant speed \(v\) relative to a frame \(S\), has length

$$
L = \frac{L_0}{\gamma}
$$ {#eq-length}

in \(S\), where the length in \(S\) means the distance between the worldlines of the two ends on a single simultaneity slice of \(S\). The rod is longest in its rest frame.
:::

::: proof
Put the rod at rest in \(S'\), with ends at \(x' = 0\) and \(x' = L_0\). Proper length is \(\Delta x' = L_0\). Measure both ends at one time in \(S\), so the two marking events have \(\Delta t = 0\). [[#eq-lorentz]] between those events gives

$$
\Delta x' = \gamma(\Delta x - v\Delta t) = \gamma\,\Delta x.
$$

Hence \(L_0 = \gamma L\) and \(L = L_0/\gamma\). The events used here are simultaneous in \(S\) and, by [[#prop-simultaneity]], not simultaneous in \(S'\). Contraction is not a second mysterious shrinking on top of dilation. It is what a tilted simultaneity slice does to a pair of parallel worldlines. Measuring the ends at equal \(t'\) instead recovers \(L_0\), and the lab times of those two events differ.
:::

Nothing happens to the rod in its rest frame when someone in another frame measures it. The proper length stays \(L_0\). The contracted length is a statement about a different pair of events.

The muon trip uses both theorems on one journey. In the Earth frame the track is \(d = v\gamma\Delta\tau = 879\,\mathrm{m}\) and the lifetime is dilated. In the muon frame the lifetime is \(2.20\,\mu\mathrm{s}\) and the column of atmosphere, which is at rest in the Earth frame and hence has proper length \(879\,\mathrm{m}\), is contracted to \(d/\gamma = v\Delta\tau = 528\,\mathrm{m}\). Both accounts give a muon that decays at the end of that column. They do not disagree about the events. They disagree about which pair of "where is the air, right now" events to call the column.

Clocks that a moving observer has synchronised are not synchronised in the lab. Let two clocks be at rest in \(S'\), separated by proper distance \(L_0\), and synchronised in \(S'\). Look at both of them at one lab time \(t\). Their positions in \(S\) differ by the contracted distance \(L = L_0/\gamma\). [[#eq-sim]] at fixed \(t\) gives a difference of the primed readings

$$
\Delta t' = -\gamma\frac{v L}{c^2} = -\frac{v L_0}{c^2}.
$$

The \(\gamma\) cancels. The forward clock, at larger \(x\), reads an earlier time. Leading clocks lag, by \(v L_0/c^2\), with no extra \(\gamma\). This is not [[#eq-sim]] misremembered. [[#eq-sim]] used a proper separation in the lab and produced a factor \(\gamma\). The lag of the moving clocks uses their proper separation and the factor cancels. Mixing the two is a standard way to be wrong by exactly \(\gamma\).

::: example Leading clocks {#ex-clocks}
A rod of proper length chosen so that \(L_0/c = 1.00\,\mu\mathrm{s}\) moves lengthwise at \(v = 0.800c\). Clocks at the two ends are synchronised in the rod frame. At one instant of lab time, by how much do their readings differ, and what is the rod's length in the lab?
::: solution
The lag of the leading clock is

$$
\frac{v L_0}{c^2} = \beta\frac{L_0}{c} = 0.800\times 1.00\,\mu\mathrm{s} = 0.800\,\mu\mathrm{s}.
$$

The forward clock is behind by \(0.800\,\mu\mathrm{s}\) when both are observed at one lab time. The lab length uses [[#eq-length]] and \(\gamma = 5/3\):

$$
L = \frac{L_0}{\gamma} = 0.600\,L_0.
$$

Since \(L_0 = c\times 1.00\,\mu\mathrm{s} = 2.99792458\times 10^2\,\mathrm{m} = 299.79\,\mathrm{m}\),

$$
L = 0.600\times 299.79\,\mathrm{m} = 179.88\,\mathrm{m},
$$

or \(180\,\mathrm{m}\) to three significant figures. The time between the two events "front end passes a lab mark" and "rear end passes the same mark" is \(L/v\), which is \((L_0/c)/(\gamma\beta) = 1.00\,\mu\mathrm{s}/(5/3\times 0.800) = 0.750\,\mu\mathrm{s}\). That passing time is neither the lag nor the proper length over \(c\).
:::
:::

## A journey out and back

[[#thm-dilation]] compares clocks that do not reunite, using a synchronised pair. A sharper test lets both clocks come back to one place, so that synchronisation is no longer needed to read them. One twin stays in an inertial lab. The other travels out and returns. This is the twin effect. It is not a paradox in which each traveller must find the other younger.

Proper time along a general worldline is the sum of the proper times of short inertial pieces. On a piece where the speed is \(v\) for a lab time \(\mathrm{d}t\), the clock advances \(\mathrm{d}t/\gamma(v)\). Therefore

$$
\tau = \int \frac{\mathrm{d}t}{\gamma(v(t))}.
$$ {#eq-worldline}

The integral uses the lab time and the speed relative to that lab. It does not ask the travelling clock to stay inertial. Special relativity evaluates it along any timelike worldline you specify. Acceleration is allowed. What acceleration changes is which inertial frame the traveller occupies from one coast to the next.

::: example Out and back at four-fifths of c {#ex-twin}
A traveller goes out at \(v = 0.800c\) and returns at \(v = 0.800c\). The lab time is \(5.00\,\mathrm{y}\) on the way out and \(5.00\,\mathrm{y}\) on the way back. The turnaround is treated as instantaneous. Find the proper time on the traveller's clock at the reunion, and explain why the stay-at-home twin does not record the same thing by "moving the other way".
::: solution
On each coast \(\gamma = 5/3\) is constant, and \(1/\gamma = 3/5 = 0.600\). [[#eq-worldline]] on the outbound leg gives

$$
\tau_{\mathrm{out}} = \frac{5.00\,\mathrm{y}}{\gamma} = 5.00\times 0.600 = 3.00\,\mathrm{y}.
$$

The return leg contributes another \(3.00\,\mathrm{y}\). An instantaneous turnaround adds no lab time and therefore no proper time. The traveller's clock reads

$$
\tau = 6.00\,\mathrm{y}
$$

at the reunion. The lab clock, at rest, records the full \(10.0\,\mathrm{y}\). Equivalently, \(\tau = 10.0/\gamma = 10.0\times 3/5 = 6.00\,\mathrm{y}\) because \(\gamma\) happened to be the same on both legs.

The distance out, in the lab, is \(v\times 5.00\,\mathrm{y} = 4.00\) light-years. In the outbound coasting frame that Earth-to-turnaround distance is a proper length of the lab, contracted to \(4.00/\gamma = 2.40\) light-years, and the ship covers it at \(0.800c\) in \(2.40/0.800 = 3.00\,\mathrm{y}\). Same proper time, from [[#thm-contraction]] rather than from [[#thm-dilation]]. The return coast has its own rest frame, in which the same arithmetic gives another \(3.00\,\mathrm{y}\).

The asymmetry is the turnaround. The stay-at-home twin remains in one inertial frame for the whole \(10.0\,\mathrm{y}\). The traveller does not: the outbound leg and the return leg are two different inertial frames, joined by the change of velocity. You cannot exchange the labels "moves" and "stays". During each coast the dilation formula applies to a clock that is inertial in one of those frames, compared with synchronised clocks in the other. It does not apply to the reunion interval as if each twin had a single inertial frame covering both events. After the reunion the clocks are together. Both accounts give \(6.00\,\mathrm{y}\) on the travelling clock and \(10.0\,\mathrm{y}\) on the lab clock. There is no second answer in which the lab twin is the younger one.

Watching the other clock through a telescope is still a different question. While the twins recede, each receives a slow train of signals; while they approach, a fast one. That is the Doppler effect, derived in [[relativity/velocity-energy]], and it is symmetric on the coasts. The travelling twin's reception history is not a mirror of the stay-at-home history, because the turnaround changes which signals are still in transit. The proper times above are not those reception logs. They are the integrals of \(\mathrm{d}t/\gamma\) on the two worldlines.
:::
:::

A real turnaround occupies a short lab interval \(\Delta t_{\mathrm{turn}}\). The proper time added is at most \(\Delta t_{\mathrm{turn}}\), because \(\gamma \ge 1\). Making the turnaround brief makes its contribution brief. The \(4.00\,\mathrm{y}\) gap between \(10.0\) and \(6.00\) is accumulated on the coasts, where the travelling clock is moving at \(0.800c\) relative to the lab. It is not a jolt delivered by the acceleration over and above [[#eq-worldline]].

::: warning Moving clocks and moving rods
"A moving clock runs slow" does not mean that every procedure finds the clock slow. Each twin, looking at the other's clock by light signals, also contends with a Doppler shift from the changing travel time of the light. The comparison in [[#thm-dilation]] uses two events and a pair of synchronised clocks. Length contraction applies to the length measured simultaneously in the frame where the rod is moving. It does not change the proper length, and a measurement that records the two ends at different times is not the length [[#eq-length]] is talking about. Leading-clock lag is \(v L_0/c^2\); the simultaneity gap of two lab events separated by a proper lab distance \(L_0\) is \(\gamma v L_0/c^2\). They differ by \(\gamma\).
:::

::: intuition One clock, or two
Proper time is what one clock stores. Coordinate time is a label painted onto events by a network of synchronised clocks. Dilation compares one stored reading with two painted labels. Contraction compares two painted labels at one coordinate time with the stored length of a rod. Whenever a calculation feels reversible but the story is not, draw the events. If one worldline threads both events, you are holding a proper time. If a horizontal line in the lab cuts two worldlines, you are holding a length or a synchronisation.
:::

::: history Dilation in 1905, and later clocks
Einstein derived time dilation and length contraction in *Zur Elektrodynamik bewegter Körper*, Annalen der Physik, received 30 June 1905 and published 26 September 1905. The derivation rests on the two postulates, not on a measured muon lifetime. Rossi and Hall, in Physical Review in 1941, found that cosmic-ray mesotrons of lower momentum decayed faster than a more penetrating group, in agreement with the relativistic change in the rate of a moving clock. That experiment is a confirmation.

Hafele and Keating in 1971 flew caesium clocks around the Earth on commercial aeroplanes and compared them with clocks that stayed behind. The predicted shift includes the kinematic effect of special relativity and a gravitational contribution from general relativity. The flight is not a pure special-relativistic test, and it should not be quoted as if it were one.
:::

## Where this leads

Velocity addition is the next piece. If frame \(S'\) moves at \(v\) relative to the lab and an object moves at \(u\) relative to \(S'\), the lab velocity is not \(v + u\). [[relativity/velocity-energy]] derives the collinear rule, the Doppler effect that the twin telescope actually sees, and the momentum and energy that replace \(mv\) and \(\tfrac12 mv^2\). The interval proved here becomes the geometry of [[relativity/four-vectors]]. The course as a whole is [[relativity]].

The rule of thumb that prevents most errors is short. Write down the two events. Decide whether they happen at one place, or at one time, and in which frame. Only then choose [[#eq-dilation]], [[#eq-length]] or [[#eq-sim]].

::: summary
- Proper time \(\Delta\tau\) is the time between two events on one clock present at both. In a frame where that clock moves at constant speed \(v\), coordinate time is \(\Delta t = \gamma\Delta\tau\) with \(\gamma = 1/\sqrt{1 - v^2/c^2}\).
- At \(v = 0.800c\), \(\gamma = 5/3 = 1.6667\). A muon with proper lifetime \(2.20\,\mu\mathrm{s}\) lives \(3.67\,\mu\mathrm{s}\) in the Earth frame and travels \(879\,\mathrm{m}\), against a Newtonian \(528\,\mathrm{m}\) at the same speed.
- Einstein synchronisation sets separated clocks with light signals. Simultaneity is frame-dependent: \(\Delta t' = -\gamma v\Delta x/c^2\) for events simultaneous in the lab.
- In standard configuration, \(x' = \gamma(x - vt)\) and \(t' = \gamma(t - vx/c^2)\), with \(y' = y\) and \(z' = z\). A light ray \(x = ct\) maps to \(x' = ct'\), and the map becomes Galilean for \(v \ll c\).
- The mostly-minus interval \((c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2\) is invariant. Positive means timelike, and its square root over \(c\) is the proper time.
- Length in a frame is the distance between the ends at one time in that frame. A rod of proper length \(L_0\) has lab length \(L_0/\gamma\). Leading clocks lag by \(v L_0/c^2\).
- Along a worldline, \(\tau = \int \mathrm{d}t/\gamma\). Out and back at \(0.800c\), with \(10.0\,\mathrm{y}\) of lab time, the traveller records \(6.00\,\mathrm{y}\). The traveller changes inertial frames. Both twins do not age less.
- A telescope reading is a Doppler comparison, not [[#eq-dilation]] by itself.
:::

## Exercises

::: exercise Lorentz factor at four-fifths of c {#exr-gamma level=1 check="5/3"}
Find \(\gamma\) for a speed \(v = 0.800c\). Give the exact value.
::: solution
\(\beta^2 = 0.640\) and \(1 - \beta^2 = 0.360\), so

$$
\gamma = \frac{1}{\sqrt{0.360}} = \frac{1}{0.600} = \frac{5}{3}.
$$

The value \(5/3\) is exact. Written as a decimal it is \(1.6667\) to five figures.
:::
:::

::: exercise Proper time on a short coast {#exr-proper level=1 check="9/5"}
A clock moves at constant speed \(0.800c\). Two events on its worldline are \(3.00\,\mu\mathrm{s}\) apart in the lab. Find the proper time between them, in microseconds.
::: solution
The two events are at the same place in the clock's frame, so [[#eq-dilation]] applies with \(\gamma = 5/3\):

$$
\Delta\tau = \frac{\Delta t}{\gamma} = 3.00\times\frac{3}{5} = \frac{9}{5} = 1.80\,\mu\mathrm{s}.
$$

The answer is \(1.80\,\mu\mathrm{s}\). Using \(\gamma\) in the wrong place, \(3.00\times 5/3 = 5.00\,\mu\mathrm{s}\), is the lab time that would correspond to a proper time of \(3.00\,\mu\mathrm{s}\), which is not the question.
:::
:::

::: exercise A rod at four-fifths of c {#exr-rod level=1 check="6/5"}
A rod has proper length \(2.00\,\mathrm{m}\) and moves lengthwise at \(v = 0.800c\). Find its length in the lab, in metres, measured at one lab time.
::: solution
[[#thm-contraction]] gives \(L = L_0/\gamma\) with \(\gamma = 5/3\):

$$
L = 2.00\times\frac{3}{5} = \frac{6}{5} = 1.20\,\mathrm{m}.
$$

The proper length remains \(2.00\,\mathrm{m}\). The \(1.20\,\mathrm{m}\) is the distance between the ends on a lab simultaneity slice.
:::
:::

::: exercise Flight to a star {#exr-star level=2 check="3"}
A star is \(4.00\) light-years from Earth in the Earth frame. A ship travels there at constant speed \(0.800c\). Find the proper time of the flight, in years, on the ship's clock. Ignore the turnaround; the question is the outbound coast only.
::: solution
The Earth-frame time is the distance divided by the speed. In units where \(c = 1\) light-year per year,

$$
\Delta t = \frac{4.00}{0.800} = 5.00\,\mathrm{y}.
$$

The ship's clock is present at departure and arrival, so this lab time and the proper time are related by \(\gamma = 5/3\):

$$
\Delta\tau = \frac{5.00}{5/3} = 5.00\times\frac{3}{5} = 3.00\,\mathrm{y}.
$$

From the ship's side the Earth–star distance is contracted to \(4.00\times 3/5 = 2.40\) light-years, and \(2.40/0.800 = 3.00\,\mathrm{y}\) again. The answer is \(3.00\,\mathrm{y}\).
:::
:::

::: exercise A simultaneity gap {#exr-sim level=2 check="3/2"}
Two events are simultaneous in the lab, and the light-travel time between them is \(\Delta x/c = 2.00\,\mu\mathrm{s}\). A frame \(S'\) moves at \(v = 0.600c\) in standard configuration. Find the absolute value of the time interval between the events in \(S'\), in microseconds.
::: hint
:::
Compute \(\gamma\) at \(0.600c\) before multiplying. The gap is \(\gamma\beta\,(\Delta x/c)\), not \(\beta\,(\Delta x/c)\) and not the dilated time of a clock.
::: solution
\(1 - \beta^2 = 1 - 0.360 = 0.640\), so \(\gamma = 1/0.800 = 5/4\). [[#prop-simultaneity]] gives

$$
|\Delta t'| = \gamma\beta\frac{\Delta x}{c} = \frac{5}{4}\times 0.600\times 2.00 = \frac{3}{2} = 1.50\,\mu\mathrm{s}.
$$

The event at larger \(x\) is the earlier one in \(S'\) when \(v > 0\). The answer asked for is the absolute value, \(1.50\,\mu\mathrm{s}\).
:::
:::

::: exercise Speed for a given factor {#exr-speed level=2 check="sqrt(15)/4"}
A moving clock's coordinate-time interval is four times the proper time between the same events. Find \(v/c\).
::: solution
The hypothesis is \(\Delta t = 4\,\Delta\tau\), so \(\gamma = 4\) by [[#eq-dilation]]. Then

$$
\frac{1}{\gamma^2} = 1 - \beta^2, \qquad \beta^2 = 1 - \frac{1}{16} = \frac{15}{16}, \qquad \beta = \frac{\sqrt{15}}{4}.
$$

The positive root is the speed. Numerically \(\sqrt{15}/4 = 0.9682\). The exact answer is \(\sqrt{15}/4\).
:::
:::

::: exercise Invariance, written out {#exr-interval level=3}
Starting from [[#eq-lorentz]], prove that \((c\Delta t')^2 - (\Delta x')^2 = (c\Delta t)^2 - (\Delta x)^2\). State where linearity is used, and say what a positive value of the interval implies for proper time.
::: hint
:::
Because the map is linear and sends the origin to the origin, it is enough to treat one event measured from the other as origin. Expand \(\gamma^2(ct - vx/c)^2 - \gamma^2(x - vt)^2\) and use \(\gamma^2(1 - v^2/c^2) = 1\).
::: solution
Linearity and \(x' = t' = 0\) when \(x = t = 0\) mean that differences transform as coordinates do. Take one event at the origin and the other at \((t, x)\), and write \(x' = \gamma(x - vt)\), \(t' = \gamma(t - vx/c^2)\). Then

$$
\begin{aligned}
(ct')^2 - (x')^2
&= \gamma^2\left(ct - \frac{vx}{c}\right)^2 - \gamma^2(x - vt)^2 \\
&= \gamma^2\left(c^2 t^2 - 2vxt + \frac{v^2}{c^2}x^2 - x^2 + 2vxt - v^2 t^2\right) \\
&= \gamma^2\left(1 - \frac{v^2}{c^2}\right)\big(c^2 t^2 - x^2\big) \\
&= (ct)^2 - x^2,
\end{aligned}
$$

since \(\gamma^2(1 - v^2/c^2) = 1\). Restoring differences gives the identity. If \((c\Delta t)^2 - (\Delta x)^2 > 0\), there is an inertial frame in which the two events are at one place, and the proper time between them is \(\sqrt{(c\Delta t)^2 - (\Delta x)^2}/c\). That is the content of [[#prop-interval]] for motion along \(x\). The transverse coordinates add \(-\,(\Delta y)^2 - (\Delta z)^2\) to both sides equally, because \(y' = y\) and \(z' = z\).
:::
:::

::: exercise A slower round trip {#exr-twin level=3 check="32/5"}
A traveller goes out and returns at speed \(0.600c\), with \(4.00\,\mathrm{y}\) of lab time on each leg. Treat the turnaround as instantaneous. Find the proper time in years on the traveller's clock at the reunion.
::: hint
:::
\(\gamma(0.600c) = 5/4\). The stay-at-home clock records \(8.00\,\mathrm{y}\). The travelling clock uses \(\int\mathrm{d}t/\gamma\) on two coasts, not a single application of dilation with the roles reversed.
::: solution
The lab reunion interval is \(8.00\,\mathrm{y}\), all of it in one inertial frame, so the stay-at-home clock reads \(8.00\,\mathrm{y}\). On each coast the traveller's speed is constant at \(0.600c\) and

$$
\gamma = \frac{1}{\sqrt{1 - 0.360}} = \frac{5}{4}.
$$

Each leg contributes proper time \(4.00/(5/4) = 4.00\times 4/5 = 3.20\,\mathrm{y}\). The instantaneous turnaround adds none. The travelling clock reads

$$
\tau = 6.40\,\mathrm{y} = \frac{32}{5}\,\mathrm{y}.
$$

The traveller changes inertial frames at the turnaround, so there is no single primed frame in which both the departure and the reunion occur at the same place with the lab twin doing the moving throughout. Applying [[#eq-dilation]] "the other way" to the whole journey double-counts a symmetry the worldlines do not have. Both clocks, compared at the same reunion event, agree that the readings are \(8.00\,\mathrm{y}\) and \(6.40\,\mathrm{y}\).
:::
:::
