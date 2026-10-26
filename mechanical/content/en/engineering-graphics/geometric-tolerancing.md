A $\pm 0.1$ on a bore says that its **size** is right. It says nothing about whether the bore is **round**, **straight**, **square to the face** the reader assumed it was square to, or **where** it is. Geometric dimensioning and tolerancing exists because a part's **function** lives in its shape, orientation and location as much as in its size, and because a size tolerance is the **only** tool a $\pm$ drawing has — so a $\pm$ drawing ends up tolerancing sizes tightly in the hope of protecting a perpendicularity it never states.

The system is a **language** and not a set of symbols: it has a grammar (the feature control frame), a syntax (the datum reference frame) and a semantics (the tolerance zone, which is a **region of space** and not a number). A drawing that uses the symbols without the grammar is worse than a $\pm$ drawing, because it looks authoritative and means nothing. Two closely related standards define the language: **ISO 1101:2017** (with ISO 5459 for datums and ISO 2692 for the maximum material requirement) and **ASME Y14.5-2018**. They agree on most things and differ on some; a drawing must say which one it invokes. This lesson teaches the principles and is no substitute for the standards.

::: warning Seven geometric-tolerancing errors that make a drawing unmeasurable
**An orientation or runout tolerance with no datum.** A perpendicularity of $0.02$ **to nothing** has no meaning; orientation and runout tolerances always need a datum, and location tolerances need one whenever the feature is located relative to the rest of the part (a pattern's position **within itself**, or a profile used purely as a form control, may stand without one). **A tolerance zone of the wrong shape.** A position tolerance written $0.1$ instead of $\varnothing 0.1$ is a zone between **two parallel planes** $0.1$ apart in one direction and uncontrolled in the other; written $\varnothing 0.1$ it is a **cylinder**. **A datum that cannot be contacted.** A datum feature buried in the assembly, a datum axis defined by two short features far apart, a datum plane on a wavy surface — each produces a measurement that changes when the part is re-fixtured. **A datum precedence that contradicts the function.** If the part locates on its bore first, the bore is the primary datum; making the biggest face datum $A$ "because it is the biggest" specifies how the part is **measured**, not how it is **used**. **A maximum-material modifier where it has no meaning.** $\boxed{\mathrm{M}}$ applies only to a **feature of size** (a hole, a pin, a slot, a tab); on a plane surface or on a profile of a surface it is meaningless. **A composite frame whose two tiers are in the wrong order.** The lower (feature-relating) tier must be **tighter** than the upper (pattern-locating) one; the reverse says nothing that the upper tier does not. **A free-form profile with no datum, checked by best-fit.** A profile of a surface with no datum reference controls form only; if the drafter meant it to control the surface's location too, the CMM's best-fit alignment will pass parts that are in the wrong place.
:::

## The grammar

::: definition The geometric characteristics {#def-char}
ISO 1101 defines fourteen geometrical characteristics; ASME Y14.5-2018 uses the same symbols but has withdrawn concentricity and symmetry, leaving twelve.

| Class | Symbol | Characteristic | Tolerance zone (typical) | Datum |
|---|---|---|---|---|
| Form | ⏤ | straightness | two parallel lines, or a cylinder for an axis | never |
| Form | ⏥ | flatness | two parallel planes | never |
| Form | ○ | circularity (roundness) | two concentric circles in each cross-section | never |
| Form | ⌭ | cylindricity | two coaxial cylinders | never |
| Form or location | ⌒ | profile of a line | two lines enveloping circles of diameter $t$ centred on the true profile | optional |
| Form or location | ⌓ | profile of a surface | two surfaces enveloping spheres of diameter $t$ centred on the true surface | optional |
| Orientation | ∥ | parallelism | two planes, or a cylinder, parallel to the datum | required |
| Orientation | ⟂ | perpendicularity | two planes, or a cylinder, at $90^{\circ}$ to the datum | required |
| Orientation | ∠ | angularity | as above, at a basic angle | required |
| Location | ⌖ | position | a cylinder (with $\varnothing$) or two planes about the true position | usually |
| Location | ◎ | concentricity / coaxiality (ISO only) | a cylinder about the datum axis | required |
| Location | ⌯ | symmetry (ISO only) | two planes about the datum centre plane | required |
| Run-out | ↗ | circular run-out | in each section, two circles about the datum axis | required |
| Run-out | ⌰ | total run-out | two coaxial cylinders (or planes) over the whole surface | required |

In the formulas and frames below the position symbol is written $\oplus$, perpendicularity $\perp$ and parallelism $\parallel$.
**The classes and what each needs.** **Form** tolerances need **no datum** — flatness, straightness, circularity and cylindricity are statements about a feature alone. **Orientation and run-out** tolerances always need a datum. **Location** tolerances need one whenever the feature's location relative to something else is being controlled.
**The zone shape is the whole point.** A position tolerance of $\varnothing 0.1$ is a **cylinder** of diameter $0.1$ about the true position: the axis may wander $0.05$ in **any** direction. The same tolerance written without the $\varnothing$ is a slab $0.1$ thick in the direction the leader indicates and says nothing about the perpendicular direction, so the two are not interchangeable.
:::

::: definition The feature control frame {#def-frame}
$$
\boxed{\begin{array}{c|c|c|c|c}
\perp & \varnothing 0.05\ \boxed{\mathrm{M}} & A & B & C \\
\text{characteristic} & \text{zone size and modifiers} & \text{primary datum} & \text{secondary} & \text{tertiary}
\end{array}}
$$
The frame reads left to right: the characteristic, the tolerance zone (with $\varnothing$ for a cylindrical zone and any modifiers), then up to three datum references in order of precedence; a datum reference to a feature of size may itself carry a material-condition modifier.
**The common modifiers.**
$$
\begin{array}{l l l}
\boxed{\mathrm{M}} & \text{maximum material condition / requirement} & \text{tolerance stated at MMC; bonus as the feature departs from MMC} \\
\boxed{\mathrm{L}} & \text{least material condition / requirement} & \text{tolerance stated at LMC; protects a minimum wall} \\
\boxed{\mathrm{P}} & \text{projected tolerance zone} & \text{the zone projects beyond the feature by a stated height} \\
\boxed{\mathrm{ST}} & \text{statistical tolerance (ASME)} & \text{the tolerance is met by statistical process control} \\
\mathrm{CF} & \text{continuous feature (ASME)} & \text{interrupted surfaces treated as one feature}
\end{array}
$$
**The projected zone, the most useful and least understood modifier.** A stud or bolt screwed into a **tapped hole** takes its direction from the thread, not from the clearance hole in the part it clamps. Suppose the tapped hole is $12\ \mathrm{mm}$ deep and the clamped bracket is $20\ \mathrm{mm}$ thick. A $\varnothing 0.5$ position zone applied to the thread itself, over its own $12\ \mathrm{mm}$ length, allows the axis to tilt by up to $0.5/12 = 42\ \mathrm{mrad}$ ($2.4^{\circ}$); projected $20\ \mathrm{mm}$ above the surface, such a tilted axis can be up to $0.25 + 20 \times 0.5/12 = 1.08\ \mathrm{mm}$ from true position at the top of the bracket — far outside the $0.25$ the designer thought he had allowed. With $\boxed{\mathrm{P}}\ 20$ the $\varnothing 0.5$ cylinder is moved to the $20\ \mathrm{mm}$ **above** the surface, where the stud actually passes through the mating part, and the drawing means what it says.
:::

::: definition The datum reference frame {#def-drf}
**The 3-2-1 principle.** A rigid body has six degrees of freedom, and a datum reference frame of three mutually perpendicular planes removes them in order of precedence:
$$
\begin{array}{l c l l}
A\ (\text{primary}) & 3 & \text{one translation, two rotations} & \text{usually the main mounting or locating surface} \\
B\ (\text{secondary}) & 2 & \text{one translation, one rotation} & \text{perpendicular to } A \\
C\ (\text{tertiary}) & 1 & \text{one translation} & \text{perpendicular to both} \\
\hline
& 6 & \text{total} &
\end{array}
$$
**The degrees of freedom, in the order they are removed** (with $A$ normal to $z$, $B$ normal to $y$, $C$ normal to $x$):
$$
\begin{array}{l c c c}
& A\ (\text{plane}) & B\ (\text{plane}) & C\ (\text{plane}) \\
\text{translate } x & & & \bullet \\
\text{translate } y & & \bullet & \\
\text{translate } z & \bullet & & \\
\text{rotate about } x & \bullet & & \\
\text{rotate about } y & \bullet & & \\
\text{rotate about } z & & \bullet &
\end{array}
$$
**The rules of datum selection.** **The datums are the surfaces the part locates on in service**, in the order it locates on them. A bearing housing locates on its mounting feet, so the feet are $A$; a shaft runs in two bearings, so its two journals **together** form a **common datum axis**, written $A\text{–}B$ in a single compartment. **A datum feature of size** (a bore, a pin) may be referenced at maximum material (ASME: maximum material boundary) or regardless of size; the choice says whether the inspection fixture's pin is a fixed gauge pin or an expanding mandrel.
**The number that decides a datum.** A plate is located by a $\phi 10$ pin in a hole (datum $B$) and a second pin in a slot $80\ \mathrm{mm}$ away (datum $C$). If the slot is replaced by a round hole with $0.2\ \mathrm{mm}$ of clearance on the pin, the plate can rotate about the first pin by
$$
\Delta\theta = \frac{0.2}{80} = 2.5\ \mathrm{mrad} = 0.14\ {}^{\circ},
$$
which moves a feature at a $400\ \mathrm{mm}$ reach by $400 \times 0.0025 = 1.0\ \mathrm{mm}$. The precedence and the type of each locating feature are part of the specification.
:::

::: definition Bonus tolerance and the virtual condition {#def-bonus}
**The rule.** A position tolerance with $\boxed{\mathrm{M}}$ applies when the feature is at its **maximum-material size**, and as the feature departs from MMC the position tolerance grows by the same amount:
$$
t_{\mathrm{available}} = t_{\mathrm{stated}} + \left| d_{\mathrm{actual}} - d_{\mathrm{MMC}} \right| .
$$
**The evaluation.** A $\phi 10\ \mathrm{H}7$ hole is $+0.015/0$, so its MMC (smallest hole) is $10.000$ and its LMC (largest hole) is $10.015$. With a position tolerance of $\varnothing 0.2\ \boxed{\mathrm{M}}$:
$$
\begin{array}{c c c}
\text{Hole size} & \text{Bonus} & \text{Available position tolerance} \\
10.000\ (\text{MMC}) & 0 & \varnothing 0.200 \\
10.0075 & 0.0075 & \varnothing 0.2075 \\
10.015\ (\text{LMC}) & 0.015 & \varnothing 0.215
\end{array}
$$
**The virtual condition.** What the $\boxed{\mathrm{M}}$ really specifies is a **boundary**: for a hole, the cylinder of diameter $d_{\mathrm{MMC}} - t = 10.000 - 0.2 = 9.8\ \mathrm{mm}$ at the true position must remain clear of material. A bigger hole can be further off position and still clear that boundary — which is exactly why the bonus is legitimate — and a fixed **functional gauge** pin of $\phi 9.8$ at the true position checks the requirement directly.
**Zero tolerance at MMC.** The drafter may move all the tolerance into the size: the hole is toleranced, say, $\phi 9.8$ to $\phi 10.015$ with a position tolerance of $\varnothing 0\ \boxed{\mathrm{M}}$. The virtual condition is still $\phi 9.8$, but now the shop may choose: a $\phi 9.8$ hole must be exactly on position, a $\phi 9.9$ hole may be $\varnothing 0.1$ off, a $\phi 10.0$ hole $\varnothing 0.2$ off. The functional requirement is unchanged and the manufacturing freedom is larger.
**Datum shift.** When a **datum feature of size** is referenced at maximum material, and the actual datum feature is larger (for a hole) than its MMC, the part can shift and rotate relative to the gauge's datum pin. The toleranced pattern may then move **as a group** relative to the datum by the datum feature's departure from MMC. Datum shift is not extra tolerance on each hole; it is freedom of the whole pattern, and a CMM report must state how it was evaluated.
:::

::: widget plot
f: 0.2 + (x - 10); 0.2
x: 10, 10.015
y: 0.19, 0.22
labels: available position tolerance with M; stated tolerance (RFS)
caption: The position tolerance available to a $\phi 10\ \mathrm{H}7$ hole that carries $\varnothing 0.2\ \boxed{\mathrm{M}}$, plotted against the actual hole size $x$ in millimetres. At the maximum-material size of $10.000$ the zone is exactly $\varnothing 0.200$; at the least-material size of $10.015$ it is $\varnothing 0.215$. The **bonus** is the vertical gap between the two lines. It costs nothing functionally: a bigger hole has more clearance round the bolt, and the clearance is what the position tolerance is protecting.
:::

## The arithmetic of position

::: definition The floating and fixed fastener formulas {#def-fastener}
Let $H$ be the **maximum-material (smallest) size of the clearance hole**, $F$ the **maximum size of the fastener**, and $T$ the **diametral position tolerance** at MMC on each hole.
**The floating fastener** — a bolt passing through clearance holes in **both** parts and held by a nut. In the worst case the two holes are displaced in opposite directions by $T/2$ each, so their common opening is $H - T$ wide, and the bolt passes if $H - T \ge F$:
$$
\boxed{ T = H - F } \qquad \text{(each part, equal tolerances)} .
$$
**The fixed fastener** — a screw or stud held in **one** of the parts (a tapped or press-fit hole), passing through a clearance hole in the other. The fastener's axis now moves with the tapped hole, so the two position tolerances $T_1$ (clearance hole) and $T_2$ (tapped hole) share one clearance:
$$
\boxed{ T_1 + T_2 = H - F } \qquad \Rightarrow \qquad T = \frac{H - F}{2} \ \text{if they are equal} .
$$
These are the formulas given in the appendix of ASME Y14.5. They assume perfect perpendicularity; a tapped hole whose axis can tilt needs a **projected tolerance zone** over the thickness of the clamped part, or the clearance must be enlarged.
**The evaluation.** $M 8$ screws ($F = 8.0$) through $\phi 9$ medium-series clearance holes ($H = 9.0$, ISO 273):
$$
\text{floating: } T = 9.0 - 8.0 = 1.0\ \mathrm{mm}\ \text{per part}, \qquad
\text{fixed: } T = \frac{9.0 - 8.0}{2} = 0.5\ \mathrm{mm}\ \text{per part}.
$$
**The comparison that decides the design.**
$$
\begin{array}{l c c}
\text{Arrangement} & \text{Clearance-hole tolerance} & \text{Tapped / second-part tolerance} \\
\text{Through bolts and nuts (floating)} & \varnothing 1.0\ \boxed{\mathrm{M}} & \varnothing 1.0\ \boxed{\mathrm{M}} \\
\text{Screws into tapped holes, equal split (fixed)} & \varnothing 0.5\ \boxed{\mathrm{M}} & \varnothing 0.5\ \boxed{\mathrm{M}}\ \boxed{\mathrm{P}} \\
\text{Fixed, unequal split} & \varnothing 0.6\ \boxed{\mathrm{M}} & \varnothing 0.4\ \boxed{\mathrm{M}}\ \boxed{\mathrm{P}}
\end{array}
$$
The fixed fastener halves the available tolerance; the unequal split gives more to the part whose holes are harder to place.
:::

::: definition Position tolerance versus coordinate tolerance {#def-posvscoord}
**The translation.** A position tolerance of $\varnothing t$ is **not** equivalent to $\pm t / 2$ in $x$ and $\pm t / 2$ in $y$. The square that fits **inside** the $\varnothing t$ circle has half-side
$$
\frac{t}{2 \sqrt{2}} \qquad \left( \varnothing 0.4 \Rightarrow \pm 0.141 \right)
$$
and the square that **contains** the circle has half-side $t/2$ ($\pm 0.200$). So:
$$
\begin{array}{l c c c}
\text{Specification} & \text{Zone} & \text{Area}\ (\mathrm{mm^{2}}) & \text{Worst radial error}\ (\mathrm{mm}) \\
\varnothing 0.4\ \text{position} & \text{circle} & 0.1257 & 0.200 \\
\pm 0.2 / \pm 0.2\ \text{coordinate} & \text{square} & 0.1600 & 0.283 \\
\pm 0.141 / \pm 0.141\ \text{coordinate} & \text{square} & 0.0800 & 0.200
\end{array}
$$
**The two conclusions.** **For the same worst-case radial error, the $\varnothing 0.4$ circle has $57\ \%$ more area than the $\pm 0.141$ square** — the ratio $\pi / 2 = 1.571$ of a circle to its inscribed square — so the position tolerance accepts every part the coordinate tolerance accepts plus many functional parts it would reject. **A $\pm 0.2$ coordinate tolerance permits a radial error of $0.283$**, $41\ \%$ more than the $\varnothing 0.4$ position tolerance the drafter may have thought it was equivalent to; the corners of the square allow assemblies that do not fit.
**The bonus on top.** With $\boxed{\mathrm{M}}$ and a $0.03$ departure from MMC, a $\varnothing 0.4$ zone becomes $\varnothing 0.43$ and its area $0.145\ \mathrm{mm^{2}}$: $15\ \%$ more area for a $7.5\ \%$ larger diameter, without any loss of function.
:::

::: definition Composite tolerancing {#def-composite}
A **composite** position frame (ASME) has two tiers that share a single position symbol (drawn once, spanning both tiers; it is repeated in each row below only for typesetting):
$$
\boxed{\begin{array}{c|c|c|c|c}
\oplus & \varnothing 1.0\ \boxed{\mathrm{M}} & A & B & C \\
\hline
\oplus & \varnothing 0.25\ \boxed{\mathrm{M}} & A & & 
\end{array}}
$$
**The upper tier** is the **pattern-locating** tolerance zone framework: it locates the **pattern as a whole** relative to the full datum reference frame $A\,|\,B\,|\,C$, and it is the looser of the two. **The lower tier** is the **feature-relating** tolerance zone framework: its zones keep the basic spacing between the holes and are oriented to the datums it repeats (here only $A$, so the holes must be perpendicular to $A$), but they may translate and rotate as a group relative to $B$ and $C$. It controls the **hole-to-hole** spacing and is the tighter of the two.
**The arithmetic.** For a pattern of six holes with the frame above:
$$
\begin{array}{l c l}
\text{Pattern relative to } B \text{ and } C & \varnothing 1.0 & \text{the whole pattern may float by up to } 0.5 \text{ radially} \\
\text{Each hole relative to the others} & \varnothing 0.25 & \text{the holes keep their spacing to within the lower tier} \\
\text{Holes perpendicular to } A & \varnothing 0.25 & \text{because the lower tier repeats } A
\end{array}
$$
**Why composite tolerancing exists.** A bolted cover's hole pattern must be **free to move as a group** (so it fits a casting whose own features are loosely located) and **tight to itself** (so the bolts go in), and a single frame cannot say both. ISO 1101 expresses the same idea with separate frames and the combined-zone and orientation-constraint modifiers.
:::

::: definition Profile, run-out and the practical set {#def-profile}
**Profile of a surface** is the workhorse of modern drawings: one symbol that, with datums, controls the **size, form, orientation and location** of any surface, curved or flat; without datums it controls form only.
**Unequal disposition.** A $0.4$ profile zone is by default **centred** on the true surface ($\pm 0.2$). It can be placed unequally: ASME writes $0.4\ \boxed{\mathrm{U}}\ 0$ for a zone lying entirely on the material-removal side (the surface may only be "smaller"), and ISO 1101 uses the $\mathrm{UZ}$ modifier with an offset. On an aerofoil or a seal face, where extra material causes interference and missing material only a small performance loss, the all-inside zone is the correct call.
**Three things profile does that nothing else does.** It tolerances a **free-form** surface with one frame. It can control several surfaces **as one feature** (a coplanar or continuous set) with one frame. It tolerances a **surface that is not a feature of size** — a vane, a blade, a moulding — relative to datums.
**Run-out, and when total run-out is the right one.**
$$
\begin{array}{l l l}
\text{Circular run-out} & \text{indicator at one section at a time, part rotated} & \text{controls each circular element: eccentricity and roundness} \\
\text{Total run-out} & \text{indicator traversed along the whole surface} & \text{also controls taper, straightness of the surface lines and form along the axis}
\end{array}
$$
**The number.** A $\phi 40$ journal $120\ \mathrm{mm}$ long that is perfectly round and coaxial at every section but **tapered** by $0.05$ on diameter from end to end shows zero circular run-out — each section turns true about the datum axis — yet its total run-out is $0.025$ (the radius changes by $0.025$ along the traverse). A seal running surface or a bearing seat whose **along-axis** form matters is given total run-out; circular run-out cannot see the taper.
:::

::: example A bolted cover, toleranced three ways {#ex-cover}
A $200 \times 140 \times 10$ cover is fastened by eight $M 6$ screws through $\phi 6.6$ clearance holes to a housing with $M 6$ tapped holes in the same $180 \times 120$ pattern. Compare a coordinate drawing with geometric drawings.
::: solution
**The function.** The cover must go on without any screw binding in its hole, and its **gasket face** must be flat enough for the gasket to seal.
**The budget.** This is a **fixed-fastener** joint: $H = 6.6$ (ISO 273 medium series), $F = 6.0$, so the two parts share
$$
T_1 + T_2 = H - F = 0.6\ \mathrm{mm}\ (\text{diametral}), \quad \text{i.e. } 0.30\ \mathrm{mm}\ \text{of radial misalignment in total}.
$$
**Way 1 — coordinate.** Every hole in both parts is dimensioned from two edges at $\pm 0.1$ in $x$ and in $y$. The worst radial error of one hole is the corner of its square, $\sqrt{0.1^{2} + 0.1^{2}} = 0.141\ \mathrm{mm}$, so the two parts together can be $0.283\ \mathrm{mm}$ out radially against the $0.30$ available.
$$
0.283 < 0.30 \quad \Rightarrow \quad \text{it goes on — with } 0.017\ \mathrm{mm}\ \text{to spare and no allowance for a tilted tapped hole.}
$$
The square zones spend $94\ \%$ of the clearance on their corners while the holes may be only $0.1$ off along each axis.
**Way 2 — position, equal split.** Both patterns at $\oplus\ \varnothing 0.3\ \boxed{\mathrm{M}}$ to $A\,|\,B\,|\,C$, the tapped holes with $\boxed{\mathrm{P}}\ 10$ (the cover thickness).
$$
T_1 + T_2 = 0.3 + 0.3 = 0.6 = H - F . \checkmark
$$
Each hole now has a circular zone of radius $0.15$ — $\pi \times 0.15^{2} = 0.071\ \mathrm{mm^{2}}$ against the $0.2 \times 0.2 = 0.040\ \mathrm{mm^{2}}$ of a coordinate square — so the shop has $77\ \%$ more area per hole for **exactly** the same guarantee of assembly, plus bonus tolerance as the clearance holes come out larger than $\phi 6.6$. The projected zone makes sure that a tilted tapped hole is accounted for where the screw passes through the cover.
**Way 3 — split unequally.** The tapped holes in a casting are the harder ones to place, so give them $\varnothing 0.4\ \boxed{\mathrm{M}}\ \boxed{\mathrm{P}}\ 10$ and the drilled cover holes $\varnothing 0.2\ \boxed{\mathrm{M}}$: the sum is still $0.6$. If the cover must also be **located** precisely (for instance because it carries a bearing), add one round dowel and one slot, make them datums, and the screws then only clamp.
**The gasket face.** The cover's gasket face gets a **flatness** of, say, $0.05$; the housing face likewise. Parallelism of the cover's two faces matters only if the screw heads must seat squarely; a flatness requirement is what the gasket needs.

*Check.* The fixed-fastener formula with equal tolerances gives $T = (6.6 - 6.0)/2 = 0.3$ per part, exactly Way 2. $\checkmark$

*Sanity.* All three drawings guarantee assembly; they differ in how much of the clearance they let the shop use. The coordinate drawing wastes the area outside the inscribed circle in some directions and over-spends it in the corners; the position drawing spends the clearance exactly, and can spend it where it is cheapest.
:::
:::

::: example A shaft with two journals {#ex-shaft}
A ground steel shaft has two $\phi 40\ \mathrm{k}5$ bearing journals $300\ \mathrm{mm}$ apart, a $\phi 35$ seal running surface and a gear seat with a shoulder and a keyway. Give the geometric tolerancing.
::: solution
**The datum.** The two journals **together** form a **common datum axis** $A\text{–}B$, because the shaft rotates in both bearings and neither journal alone defines the axis about which it turns.
$$
\boxed{\begin{array}{c|c|c}\nearrow & 0.01 & A\text{–}B\end{array}} \ \text{on each journal}, \qquad
\boxed{\begin{array}{c|c|c}\text{total run-out} & 0.03 & A\text{–}B\end{array}} \ \text{on the seal surface}.
$$
**The journals' form.** A run-out of $0.01$ still allows more out-of-roundness than a precision bearing seat should have, so the journals also carry a **cylindricity** taken from the bearing maker's recommendation (typically about half the IT5 size tolerance, here about $0.005$).
**The gear seat.** The gear's face run-out (wobble) comes from a shoulder that is not square to the axis: a shoulder $0.05$ out of square across a $30\ \mathrm{mm}$-wide face tilts the gear by $0.05/30 = 1.7\ \mathrm{mrad}$, which at a $60\ \mathrm{mm}$ pitch radius is $0.1\ \mathrm{mm}$ of axial wobble at the teeth. The shoulder gets $\boxed{\perp \mid 0.01 \mid A\text{–}B}$ (or an axial run-out of $0.01$), and the gear seat diameter a run-out to $A\text{–}B$.
**The keyway.** The keyseat's centre plane is located on the shaft axis by a **position** (no $\varnothing$, a two-plane zone) — for example $\boxed{\oplus \mid 0.05 \mid A\text{–}B}$ — and its width carries the ISO keyway tolerance.
**The decisions.**
1. **Total run-out on the seal surface, circular run-out on the bearings plus cylindricity.** The seal lip runs along the whole land, so taper and bow under it matter; the bearing seats are short, and their form is controlled by cylindricity.
2. **The shoulder's perpendicularity, not the gear seat's position.** The gear is located axially by the shoulder, and its wobble is the shoulder's error.
3. **The seal surface tolerance from the seal maker.** ISO 6194-1 gives the shaft tolerance and finish for rotary lip seals ($\mathrm{h}11$ is the usual diameter tolerance); the run-out the seal can follow depends on its speed, so the value comes from the seal maker's data.
**The measurement.** The shaft is supported on its two journals in V-blocks or rotated in two coaxial collets — a physical simulation of the common datum $A\text{–}B$ — and the indicators read the run-out of each surface. Supporting it between centres is a shop approximation that is valid only if the centres were used to grind the journals.

*Sanity.* The total run-out of $0.03$ on the seal surface is a full-indicator movement, i.e. an eccentricity of up to $0.015$; seal makers' allowable run-outs at moderate speeds are of the order of $0.1\ \mathrm{mm}$, so the value is comfortably conservative.
:::
:::

::: example A welded bracket and a datum that does not exist {#ex-weld}
A welded bracket: a $200 \times 120 \times 12$ base plate, a $100$-high, $10$-thick web, and a machined $\phi 50\ \mathrm{H}7$ bore in a boss on the web. The base is bolted down by four $M 12$ bolts through $\phi 13.5$ holes. Give the datum structure and the tolerances.
::: solution
**The trap.** The obvious datum $A$ is the base plate's as-welded **bottom** face, because it is the biggest surface. But an as-welded surface is distorted and cannot be a reliable datum; the bracket **sits** on its bottom face when bolted down, so that face must be **machined** and only then made datum $A$.
**The datum structure.**
$$
A = \text{the machined mounting face} \ (3\ \text{DOF}), \qquad
B = \text{a machined end face} \ (2\ \text{DOF}), \qquad
C = \text{a machined side face} \ (1\ \text{DOF})
$$
**The tolerances.**
$$
\begin{array}{l l l}
\text{Mounting face } A & \text{flatness } 0.1 & \text{a datum that is not flat is a datum that rocks} \\
\text{Bore} & \varnothing 50\ \mathrm{H}7,\ \oplus\ \varnothing 0.3\ A|B|C,\ \perp\ \varnothing 0.05\ A & \text{the bore's axis is what the bracket is for} \\
\text{Boss face} & \perp\ 0.03\ \text{to the bore axis} & \text{the mating part seats on it} \\
\text{Four } \phi 13.5\ \text{base holes} & \oplus\ \varnothing 1.5\ \boxed{\mathrm{M}}\ A|B|C & \text{see the fastener check} \\
\text{Web} & \text{no geometric tolerance} & \text{it does no locating work}
\end{array}
$$
**The fastener check.** If the bracket is bolted with **through bolts and nuts** to a frame that also has $\phi 13.5$ clearance holes, the joint is a **floating** fastener: $T = H - F = 13.5 - 12.0 = 1.5$ per part, so $\varnothing 1.5\ \boxed{\mathrm{M}}$ is exactly the limit (zero margin, which is acceptable because the bonus grows as the holes come out larger). If instead the frame is **tapped**, the joint is a **fixed** fastener: $T_1 + T_2 = 1.5$, so the bracket gets only $\varnothing 0.75$ (with equal split) — and the $\varnothing 1.5$ on the drawing would be **twice** too loose.
**The notes that make it weldable.** **"MACHINE DATUM $A$ FIRST, CLAMPED WITHOUT DISTORTING THE WELDMENT, THEN MACHINE ALL OTHER FEATURES FROM IT."** A welded bracket clamped hard while machining can spring out of flat when released. **"STRESS-RELIEVE AFTER WELDING AND BEFORE MACHINING"** where the tolerances demand it. **"WELDS TO ISO 5817 QUALITY LEVEL C."**
**The tolerance that must not be there.** A **parallelism** on the as-welded web. Welding distortion moves a thin web far more than any sensible tolerance, and a tolerance on a feature that does no work only creates rejects.

*Design comment.* On a weldment, a datum is a manufacturing instruction as much as an inspection one: the datum feature must be machined first and every critical feature machined from it in as few setups as possible.
:::
:::

::: example A moulded plastic cover {#ex-mould}
An injection-moulded ABS cover, $180 \times 120$, $3\ \mathrm{mm}$ wall, with four snap-fits, a $\phi 30$ spigot and a visible "Class-A" cosmetic surface. Tolerance it.
::: solution
**The datum.** The parting line is not a datum. The datum is the **functional mating feature** — here the spigot's seating shoulder (datum $A$) and the spigot itself (datum $B$). A moulded part's datums must be **moulded** features formed in one half of the tool, never trimmed edges or features that straddle the parting line.
**The tolerance structure.**
$$
\begin{array}{l l l}
\text{General} & \text{ISO 20457:2018 general tolerances} & \text{the tolerance group chosen for ABS and the process} \\
\text{Spigot} & \varnothing 30\ {}^{- 0.15}_{- 0.35},\ \oplus\ \varnothing 0.3\ A & \text{formed in one tool half; shrinkage about } 0.5\ \% \\
\text{Snap fits} & \text{profile } 0.25\ \text{to } A|B\ \text{over the catch} & \text{the catch engagement is what matters} \\
\text{Class-A surface} & \text{profile } 0.3\ \text{to the CAD surface} & \text{plus a cosmetic specification} \\
\text{Wall} & 3\ \text{nominal, as the tool is cut} & \text{the wall is controlled by the tool, verified on first articles}
\end{array}
$$
**The notes that complete the drawing.**
$$
\begin{array}{l l}
\text{Condition} & \text{dimensions apply after conditioning at } 23\ {}^{\circ}\mathrm{C},\ 50\ \%\ \text{RH} \\
\text{Warp} & \text{flatness of the mounting flange } 0.8\ \text{over } 180,\ \text{measured unrestrained} \\
\text{Gate and ejectors} & \text{locations per the tool drawing; no marks on the Class-A surface}
\end{array}
$$
**Three things peculiar to a moulding.** **The tolerance applies at a stated condition**, because many polymers change size with temperature and moisture: had the cover been nylon 66, its moisture uptake of a few per cent would grow it by several tenths of a per cent — around $0.7\ \mathrm{mm}$ on $180\ \mathrm{mm}$ for $0.4\ \%$ — more than most tolerances on the drawing. **Warp is specified separately and measured unrestrained**, because a best-fit alignment of a warped part to its CAD surface hides the warp. **The Class-A surface is controlled for shape and appearance**, not by a flatness requirement: it may be deliberately curved.

*Sanity.* A $0.5\ \%$ shrinkage on $180\ \mathrm{mm}$ is $0.9\ \mathrm{mm}$, and a variation of $\pm 0.15\ \%$ in shrinkage (from melt temperature, packing pressure and wall thickness) is $\pm 0.27\ \mathrm{mm}$ — the same order as a moulding's general tolerance. That is why moulded parts carry tolerances of a few tenths of a millimetre except on features the toolmaker can tune after first articles.
:::
:::

::: history
**Stanley Parker**, working at the **Royal Torpedo Factory** at Alexandria, Scotland, during the Second World War, found that parts rejected under square coordinate tolerance zones would in fact assemble, and introduced the idea of **true position** with a circular tolerance zone; his booklet *Notes on Design and Inspection of Mass Production Engineering Work* (**1940**) is usually cited as the earliest work on what became geometric tolerancing, and his book *Drawings and Dimensions* (**1956**) set it out in full. In the United States the ideas entered military standard **MIL-STD-8** (**1949**) and **MIL-STD-8A** (**1953**), and then the civilian **Y14.5** standard, issued as USASI Y14.5 in **1966**, ANSI Y14.5 in **1973**, ANSI Y14.5M in **1982**, and ASME Y14.5M in **1994**, **2009** and **2018** (the 2018 edition withdrew concentricity and symmetry). Internationally the symbols and rules are in **ISO 1101**, whose current edition is **ISO 1101:2017**, together with ISO 5459 (datums), ISO 2692 (maximum, least and reciprocity requirements) and ISO 8015 (fundamental principles). Because the two systems still differ in detail, an international drawing should state which one applies — "ASME Y14.5-2018" or the ISO GPS standards — rather than "GD&T".
:::

## Where this leads

Geometric tolerancing extends the numbers of [[engineering-graphics/dimensioning]] and the fits of [[engineering-graphics/tolerances-fits]] from size to shape; its datums are the **setups** of [[manufacturing/machining]], its stacks are the statistics of [[design-process/design-for-manufacture]], and its gauging is the subject of [[manufacturing/metrology-quality]].

::: summary
- A size tolerance cannot control form, orientation or location; geometric tolerances state them directly.
- The tolerance zone is a region in space: $\varnothing 0.1$ is a cylinder, $0.1$ alone is a pair of planes — the symbol is the meaning.
- A datum reference frame removes six degrees of freedom in the order 3-2-1, and the order should follow how the part locates in service.
- The maximum-material modifier specifies a virtual-condition boundary; bonus tolerance is the freedom that boundary leaves as the feature departs from MMC.
- Floating fastener: $T = H - F$ per part; fixed fastener: $T_1 + T_2 = H - F$, with a projected zone on the threaded part.
- A $\varnothing t$ position zone has $57\ \%$ more area than the inscribed coordinate square; a $\pm t/2$ coordinate square allows $41\ \%$ more radial error than $\varnothing t$.
- Total run-out sees taper and bow that circular run-out cannot; on weldments and mouldings the datum and the measuring condition are part of the specification.
:::

::: quiz
A hole was dimensioned $\pm 0.141$ in $x$ and $y$. It is redrawn with a $\varnothing 0.4$ position tolerance, which has the same worst-case radial error of $0.2\ \mathrm{mm}$. How does the new zone compare with the old one?
- [ ] They are identical
- [x] The circular zone has about $57\ \%$ more area
- [ ] The circular zone has about $41\ \%$ less area
- [ ] The square zone is always larger
::: solution
The circular zone of diameter $t$ has area $\pi t^{2} / 4$; the square inscribed in it has side $t / \sqrt{2}$ and area $t^{2} / 2$, so the circle is $\pi / 2 = 1.57$ times larger — $57\ \%$ more tolerance area for exactly the same worst-case radial error of $t / 2$. Conversely, a $\pm 0.2$ square (the one that contains the circle) permits a radial error of $0.283$, $41\ \%$ more than the circle allows.
:::
:::

## Exercises

::: exercise Form {level=1 check="0"}
How many datums does a flatness tolerance require? (Enter a number.)
::: solution
None — flatness is a form tolerance and refers to the feature alone.
:::
:::

::: exercise Degrees of freedom {level=1 check="3"}
How many degrees of freedom does a primary datum plane constrain? (Enter a number.)
::: solution
Three — one translation and two rotations.
:::
:::

::: exercise Zone area {level=1 check="1.57"}
Give the ratio of the area of a $\varnothing t$ circular position zone to that of the square inscribed in it.
::: solution
$\pi / 2 = 1.57$.
:::
:::

::: exercise Bonus {level=1 check="0.06"}
A $\phi 12 \pm 0.03$ pin carries $\oplus\ \varnothing 0.2\ \boxed{\mathrm{M}}$. Give the bonus tolerance available at the least-material size. (Enter the value in millimetres.)
::: solution
For a pin the maximum-material size is the largest, $12.03$, and the least-material size the smallest, $11.97$. At LMC the bonus is $12.03 - 11.97 = 0.06\ \mathrm{mm}$, and the total available position tolerance is $\varnothing 0.26$. The virtual condition is $12.03 + 0.2 = 12.23\ \mathrm{mm}$.
:::
:::

::: exercise Run-out {level=1 check="0.015"}
A journal is perfectly round, but over part of its length its axis is offset from the datum axis by a distance $e$. What is the largest $e$ that passes a total run-out tolerance of $0.03$? (Enter the value in millimetres.)
::: solution
An offset $e$ makes the surface swing by $2e$ as the part turns, so the indicator reads $2e \le 0.03$ and $e \le 0.015\ \mathrm{mm}$. Run-out is a full-indicator-movement tolerance: half of it is eccentricity.
:::
:::

::: exercise Floating fastener {level=2 check="1"}
$M 10$ bolts pass through $\phi 11$ clearance holes in two plates and are held by nuts. Give the position tolerance at MMC available per hole, and the value if one plate were tapped instead. (Enter the floating-fastener tolerance in millimetres.)
::: solution
$$
\text{floating: } T = H - F = 11.0 - 10.0 = 1.0\ \mathrm{mm}, \qquad
\text{fixed (equal split): } T = \frac{11.0 - 10.0}{2} = 0.5\ \mathrm{mm}.
$$
*Sanity.* In the floating case each hole may be $0.5$ off radially in opposite directions, leaving a common opening of $11.0 - 1.0 = 10.0\ \mathrm{mm}$ — exactly the bolt. In the fixed case the bolt's axis is wherever the tapped hole is, so the two tolerances share the one clearance.
:::
:::

::: exercise Projected zone {level=2 check="0.44"}
A screw threads into a tapped hole $25\ \mathrm{mm}$ deep and clamps a plate $15\ \mathrm{mm}$ thick. The tapped hole carries $\oplus\ \varnothing 0.4$ applied to the thread itself, without a projected zone. How far from true position can the screw's axis be at the top of the clamped plate? (Enter the radial distance in millimetres.)
::: solution
The worst axis runs from one side of the $\varnothing 0.4$ zone at the bottom of the thread to the other side at the surface, a slope of $0.4/25 = 16\ \mathrm{mrad}$. Extended $15\ \mathrm{mm}$ above the surface it is
$$
e = 0.2 + 15 \times \frac{0.4}{25} = 0.2 + 0.24 = 0.44\ \mathrm{mm}
$$
from true position. With $\boxed{\mathrm{P}}\ 15$ the zone is placed over the $15\ \mathrm{mm}$ above the surface, and the axis is held within $0.2$ radially wherever it passes through the plate.
*Sanity.* Without the projected zone the effective position error in the clamped part is more than twice what the drafter wrote, and the clearance hole must be sized for $0.44$, not $0.2$.
:::
:::

::: exercise Derivation {level=3}
Derive the floating- and fixed-fastener formulas from the geometry of a fastener passing through two holes.
::: solution
**One hole.** A hole of diameter $H$ whose axis is displaced by $e$ from a line accepts a cylinder of diameter $F$ centred on that line if $F/2 + e \le H/2$, i.e. $e \le (H - F)/2$.
**Floating fastener.** Both holes are clearance holes of diameter $H$; each axis lies within a cylindrical zone of diameter $T$ about true position, i.e. at most $T/2$ from it. The worst case puts them $T/2$ off in **opposite** directions, so their axes are $T$ apart. A bolt of diameter $F$ must pass through both; the best bolt position is midway, $T/2$ from each axis, so by the one-hole condition
$$
\frac{T}{2} \le \frac{H - F}{2} \quad \Rightarrow \quad \boxed{T = H - F} .
$$
**Fixed fastener.** The fastener is held in the tapped part, so its axis coincides with the tapped hole's axis, which can be $T_2/2$ from true position. The clearance hole's axis can be $T_1/2$ from true position in the opposite direction. The one-hole condition for the clearance hole, with the fastener's axis $(T_1 + T_2)/2$ from the hole's axis, gives
$$
\frac{T_1 + T_2}{2} \le \frac{H - F}{2} \quad \Rightarrow \quad \boxed{T_1 + T_2 = H - F} .
$$
**At MMC.** $H$ is the hole's smallest size and $F$ the fastener's largest; if the hole is larger, the extra clearance is exactly the bonus that $\boxed{\mathrm{M}}$ grants.
*Sanity.* The formulas assume that the fastener and the holes are perpendicular to the joint face. A tilted tapped hole moves the fastener's axis by an amount that grows with the thickness of the clamped part, which is why a fixed-fastener joint is given a projected tolerance zone.
:::
:::

::: exercise Design {level=3}
Geometrically tolerance a machined aluminium pump housing: a $160 \times 120 \times 90$ body, a $\phi 80\ \mathrm{H}7$ shaft-seal bore, a $\phi 60\ \mathrm{f}7$ pilot spigot that locates the pump in a $\phi 60\ \mathrm{H}7$ bore in the motor flange, four $M 8$ tapped holes for screws through $\phi 9$ holes in a $15\ \mathrm{mm}$-thick motor flange, and a flat gasket face.
::: solution
**The datum structure.** **Datum $A$** — the **gasket face**, on which the pump seats against the motor flange. **Datum $B$** — the **$\phi 60$ pilot spigot**, a datum feature of size referenced at maximum material, because the pilot centres the pump. **Datum $C$** — a machined flat or the axis of one tapped hole, to fix the last rotation.
$$
A\ \text{constrains } z, \theta_x, \theta_y; \quad B\ \text{constrains } x, y; \quad C\ \text{constrains } \theta_z .
$$
**The tolerances.**
$$
\begin{array}{l l l}
\text{Gasket face } A & \text{flatness } 0.05 & \text{the seating datum} \\
\phi 60\ \mathrm{f}7\ \text{pilot } (- 0.030 / - 0.060) & \text{datum } B,\ \perp\ \varnothing 0.02\ A & \text{the pilot is the pump's axis} \\
\phi 80\ \mathrm{H}7\ \text{bore } (+ 0.030 / 0) & \oplus\ \varnothing 0.03\ A|B\boxed{\mathrm{M}},\ \text{cylindricity } 0.01 & \text{coaxial with the pilot, square to } A \\
\text{Four } M 8 & \oplus\ \varnothing 0.4\ \boxed{\mathrm{M}}\ \boxed{\mathrm{P}}\ 15\ \ A|B\boxed{\mathrm{M}}|C & \text{projected through the } 15\ \mathrm{mm}\ \text{flange} \\
\text{Bore depth} & 45 \pm 0.1\ \text{from } A & \text{sets the seal position}
\end{array}
$$
**The fixed-fastener check.** The screws are held in the housing's tapped holes and pass through $\phi 9$ holes in the motor flange: $T_1 + T_2 = H - F = 9.0 - 8.0 = 1.0$. Giving the tapped holes $\varnothing 0.4$ leaves $\varnothing 0.6$ for the flange's clearance holes. $\checkmark$
**The pilot clearance.** The $\phi 60\ \mathrm{H}7/\mathrm{f}7$ pilot has a clearance of $0.030$ to $0.090\ \mathrm{mm}$ ($\mathrm{H}7 = +0.030/0$, $\mathrm{f}7 = -0.030/-0.060$), so the pump can sit up to $0.045$ off centre in the flange. The $\boxed{\mathrm{M}}$ on datum $B$ lets the inspection gauge use a fixed pilot bore of the MMC size, as the motor flange does.
**The notes.** **"MACHINE THE PILOT, THE $\phi 80$ BORE AND THE GASKET FACE IN ONE SETUP."** **"BREAK THE PILOT'S LEADING EDGE $0.5 \times 45^{\circ}$; NO BURRS."** **"PRESSURE-TEST EACH HOUSING TO THE SPECIFIED PROOF PRESSURE"** — a test done only in a guarded test cell by trained staff.
**The decision that is unique to this part.** **The pilot is datum $B$, not the bolt pattern**, because the pump is centred by its pilot and merely clamped by its screws. Making the screw pattern the datum would make the **clamp** the **locator**.

*Design comment.* The datum precedence of a flanged assembly follows its assembly sequence: the pump seats on its face, centres on its pilot and is then clamped — so face, pilot, then a clocking feature.
:::
:::
