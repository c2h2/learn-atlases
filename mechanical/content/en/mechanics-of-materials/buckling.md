Every other failure mode in this book is a **strength** problem: a stress is computed, compared with a material property, and the member is sized. Buckling is different. A strut of mild steel with a yield stress of $255\\ \\mathrm{MPa}$ can be made to fail at $50\\ \\mathrm{MPa}$, at a stress at which the material is behaving perfectly elastically and has no intention of yielding, simply by making it long and thin. The failure is sudden, it is complete, it gives no warning by yielding, and it depends on the stiffness of the member and the restraint of its ends rather than on the strength of its material.

Euler's $1744$ result,
$$
P_E = \\frac{\\pi^{2} E I}{\\left( K L \\right)^{2}},
$$
is the oldest formula in structural mechanics and still the most dangerous formula in engineering, because it is exact for an ideal straight prismatic strut and wrong for every strut that has ever been built. The whole of practical column design is the management of that gap: initial crookedness, load eccentricity, residual stress, root rather than stress, and the transition to crushing at low slenderness where Euler predicts a strength above the yield stress and is therefore meaningless.

::: warning Euler's formula is exact and useless
$P_E$ assumes a perfectly straight member, a perfectly centred load, a homogeneous linear-elastic material, constant $E$, pinned ends with no restraint against rotation, and small deflections. Violate any one and the true capacity falls — by $10$ per cent for a load eccentric by $1$ per cent of the depth, by $30$ per cent for an initial bow of $1 / 1000$ of the length, by $50$ per cent at mid-slenderness for the residual stresses from welding. A formula whose answer is an **upper bound** that degrades gracefully with imperfection is safe if you know it; a formula presented as a design strength is not. Never size a column from Euler alone.
:::

## The eigenvalue problem

::: theorem Euler buckling load {#thm-euler}
A pin-ended prismatic strut buckles elastically at
$$
P_E = \frac{\pi^{2} E I}{L^{2}},
$$
the lowest of a series $P_n = n^{2} \pi^{2} E I / L^{2}$, the corresponding mode being a single half sine wave.
:::

::: proof
Consider a pin-ended strut of length $L$ carrying an axial load $P$ and deflected by $v (x)$. The moment at $x$ is $M = - P v$, so
$$
E I \\frac{\\mathrm{d}^{2} v}{\\mathrm{d} x^{2}} = - P v
\\quad\\Longrightarrow\\quad
v^{\\prime \\prime} + k^{2} v = 0, \\qquad k^{2} = \\frac{P}{E I} .
$$
The general solution is $v = A \\sin k x + B \\cos k x$. The boundary condition $v (0) = 0$ gives $B = 0$; $v (L) = 0$ gives $A \\sin k L = 0$, which has a non-trivial solution only when
$$
k L = n \\pi, \\qquad P_n = \\frac{n^{2} \\pi^{2} E I}{L^{2}}, \\qquad n = 1, 2, 3, \\ldots
$$
The lowest, $n = 1$, is the buckling load; the corresponding mode is a half sine wave.
:::

::: theorem Effective length {#thm-effective-length}
For any combination of end restraints the buckling load keeps the Euler form with $L$ replaced by the **effective length** $L_e = K L$:
- $K = 1.0$ — pinned / pinned (reference case)
- $K = 0.5$ — fixed / fixed
- $K = 0.7$ — fixed / pinned (theoretical $0.70$; design value $0.8$)
- $K = 2.0$ — fixed / free (a cantilever column, a flagpole)
- $K = 0.5$ to $1.0$ — fixed / pinned with partial restraint, the ordinary case in a building frame
The critical stress is
$$
\\sigma_E = \\frac{P_E}{A} = \\frac{\\pi^{2} E}{\\lambda^{2}}, \\qquad
\\lambda = \\frac{L_e}{r}, \\qquad r = \\sqrt{\\frac{I}{A}} ,
$$
where $\\lambda$ is the **slenderness ratio** and $r$ the **radius of gyration**. Buckling always occurs about the axis of least $r$, so a column is always checked in both directions using $L_e / r_y$ and $L_e / r_x$.
:::

::: example Slenderness and the tube {#ex-slenderness}
Compare a $60.3 \\times 5.4\\ \\mathrm{mm}$ circular hollow section with a solid $60\\ \\mathrm{mm}$ round bar, both $3\\ \\mathrm{m}$ long, pin-ended, in steel with $E = 200\\ \\mathrm{GPa}$.
::: solution
**Tube.** $A = 931\\ \\mathrm{mm^{2}}$, $I = 354 \\times 10^{3}\\ \\mathrm{mm^{4}}$, $r = 19.5\\ \\mathrm{mm}$,
$$
\\lambda = \\frac{3000}{19.5} = 154, \\qquad
\\sigma_E = \\frac{\\pi^{2} \\times 200\,000}{154^{2}} = 83.4\\ \\mathrm{MPa}, \\qquad
P_E = 77.7\\ \\mathrm{kN}.
$$
**Solid bar.** $A = 2827\\ \\mathrm{mm^{2}}$, $I = 636 \\times 10^{3}\\ \\mathrm{mm^{4}}$, $r = 15.0\\ \\mathrm{mm}$,
$$
\\lambda = 200, \\qquad \\sigma_E = 49.3\\ \\mathrm{MPa}, \\qquad P_E = 139.5\\ \\mathrm{kN}.
$$
**Per unit mass.** The tube weighs $33$ per cent of the bar and carries $56$ per cent of the load, so its **specific** buckling strength is $0.56 / 0.33 = 1.7$ times better.

*Sanity.* The tube is weaker in absolute terms because it is lighter, but it is a better column per kilogram, and that is the whole reason bicycle frames, spaceframes, roll cages, chair legs, scaffolding, transmission towers and aircraft structures are tubular. The general rule follows from $r = \\sqrt{I / A}$: for a given amount of material, the highest $r$ comes from putting every gram as far from the centroid as possible, which is why columns are tubes, why rails and stanchions are I-sections, and why a solid steel bar is the most expensive and least efficient column you can buy. The limit is set by **local** buckling of the tube wall, which is why the wall thickness is never allowed to fall below about $D / 50$.

*Check the ends.* With both ends fixed, $K = 0.5$ and $P_E = 77.7 / 0.25 = 311\\ \\mathrm{kN}$; with one end fixed and one free, $K = 2$ and $P_E = 77.7 / 4 = 19.4\\ \\mathrm{kN}$. A $16$-to-$1$ range from the end conditions alone, on the same member. This is why "the column is $3\\ \\mathrm{m}$ long" is not enough information to size anything, and why the single most common error in a structural check is assuming a fixity that the connection does not provide.
:::
:::

::: widget plot
f: 986960/x^2
x: 30, 200
y: 0, 1100
labels: \text{critical stress (MPa)}
caption: Euler critical stress $\\sigma_E = \\pi^{2} E / \\lambda^{2}$ for steel, against slenderness ratio. The curve falls as $1 / \\lambda^{2}$, so doubling the slenderness quarters the capacity, and at $\\lambda = 200$ the critical stress is $25\\ \\mathrm{MPa}$ — a tenth of the yield stress of the steel. The straight horizontal line that is **not** drawn is the yield stress at $255\\ \\mathrm{MPa}$, and where the curve crosses it, near $\\lambda = 88$, is the boundary beyond which Euler is at least an upper bound; below it the formula predicts a strength the material cannot supply.
:::

::: example Which axis governs {#ex-which-axis}
A $203 \times 203\ \mathrm{UC}\ 46$ column of $4\ \mathrm{m}$ length is pin-ended both ways. Its section properties are $A = 5880\ \mathrm{mm^{2}}$, $i_x = 81.1\ \mathrm{mm}$, $i_y = 40.2\ \mathrm{mm}$. Find the elastic buckling load, and the load if the weak axis is restrained laterally at mid-height.
::: solution
$$
\lambda_x = \frac{4000}{81.1} = 49.3, \qquad
\lambda_y = \frac{4000}{40.2} = 99.5 ,
$$
so buckling occurs about the weak axis, and
$$
\sigma_E = \frac{\pi^{2} \times 200\,000}{99.5^{2}} = 202\ \mathrm{MPa}, \qquad
P_E = 202 \times 5880 = 1188\ \mathrm{kN}.
$$
**With a lateral restraint at mid-height**, $L_{ey} = 2\ \mathrm{m}$, $\lambda_y = 49.8$, and now the two axes are nearly equal:
$$
\sigma_E = 800\ \mathrm{MPa} \ \text{(weak axis, now meaningless as an elastic value)}, \qquad
\sigma_{E,x} = \frac{\pi^{2} \times 200\,000}{49.3^{2}} = 820\ \mathrm{MPa}.
$$
Both exceed the yield stress, so the column is no longer an elastic buckling problem at all: it becomes a **crushing** problem, with a squash load of $255 \times 5880 = 1500\ \mathrm{kN}$ reduced for imperfection to roughly $1250\ \mathrm{kN}$.

*Sanity.* One restraint at mid-height raises the capacity from $1188\ \mathrm{kN}$ to about $1250\ \mathrm{kN}$ — only $5$ per cent, because the strong axis then becomes the limit. The same restraint placed at the third points would do no better. This is the classic trap of column stiffening: buckling always finds the weakest unrestrained direction, and once you have equalised $\lambda_x$ and $\lambda_y$ further restraint is worthless. The design rule is to proportion the section so that $L_{ex} / i_x \approx L_{ey} / i_y$, which for a $4\ \mathrm{m}$ column with both ends and mid-height restrained in the weak direction means $i_x / i_y \approx 2$ — an I-section, not a square one. A $203 \times 203$ UC is close to optimal for this case; a $254 \times 254$ UC would be wasteful and a $305 \times 165$ would be badly wrong.
:::
:::

## Real columns: the inelastic range

::: theorem Johnson parabole and the transition slenderness {#thm-johnson}
Euler's formula is valid only while $\\sigma_E$ stays below about half the yield stress. In the **intermediate** range the empirical Johnson parabola is used,
$$
\\sigma_{cr} = \\sigma_y - \\frac{1}{E} \\left( \\frac{\\sigma_y \\lambda}{2 \\pi} \\right)^{2},
$$
which matches $\\sigma_y$ at $\\lambda = 0$ with zero slope and meets the Euler curve at
$$
\\lambda_1 = \\pi \\sqrt{\\frac{2 E}{\\sigma_y}} .
$$
For structural steel with $\\sigma_y = 255\\ \\mathrm{MPa}$, $\\lambda_1 = 124$: below that slenderness Euler over-predicts, above it Euler is a valid upper bound. The codes do the same job with the **Perry-Robertson** and straight-line formulae, which fit test results on imperfect columns rather than to the ideal eigenvalue.
:::

::: example Intermediate column {#ex-johnson}
A steel column of $1.5\\ \\mathrm{m}$ effective length has $r = 20\\ \\mathrm{mm}$ and $\\sigma_y = 255\\ \\mathrm{MPa}$. Estimate the critical stress.
::: solution
$$
\\lambda = \\frac{1500}{20} = 75 < \\lambda_1 = 124,
$$
so the column is in the intermediate range and Euler must not be used. Euler would give
$$
\\sigma_E = \\frac{\\pi^{2} \\times 200\,000}{75^{2}} = 351\\ \\mathrm{MPa} > \\sigma_y ,
$$
which is nonsense. The Johnson parabola gives
$$
\\sigma_{cr} = 255 - \\frac{1}{200\,000} \\left( \\frac{255 \\times 75}{2 \\pi} \\right)^{2}
= 255 - \\frac{9.28 \\times 10^{6}}{200\,000} = 255 - 46.4 = 208.6\\ \\mathrm{MPa}.
$$
*Sanity.* The two formulae differ by $68$ per cent at this slenderness, and the honest answer is "somewhat below $209\\ \\mathrm{MPa}$, because residual stresses and initial crookedness will take another $10$ to $20$ per cent off a welded section." That is exactly what the Eurocode buckling curves do: they give a reduction factor $\\chi$ of about $0.75$ at $\\bar{\\lambda} = 0.8$ for a rolled section and $0.62$ for a welded one, with the difference between the two arising entirely from residual stress. The lesson is that at moderate slenderness the **manufacture** of the column matters more than its geometry, and a welded box column is weaker than a rolled one of identical section.
:::
:::

## Eccentric loading and the secant formula

::: theorem The secant formula {#thm-secant}
For a pin-ended column loaded with eccentricity $e$ so that the maximum moment is $M_{\\max} = P e \\sec \\left( L \\sqrt{P / E I} \\right) / 2 \\ldots$ more precisely, with $v_0$ the deflection at mid-height,
$$
\\sigma_{\\max} = \\frac{P}{A} \\left[ 1 + \\frac{e c}{r^{2}} \\sec \\left( \\frac{L_e}{2 r} \\sqrt{\\frac{P}{E A}} \\right) \\right],
$$
where $c$ is the distance from the neutral axis to the extreme fibre. The capacity is found by setting $\\sigma_{\\max} = \\sigma_y$ and solving for $P$, which is transcendental and done by iteration or a chart.
:::

::: proof
With the load applied at eccentricity $e$, the moment at a section deflecting $v$ is $M = P (e + v)$, so
$$
E I v^{\\prime \\prime} = - P \\left( e + v \\right)
\\quad\\Longrightarrow\\quad
v^{\\prime \\prime} + k^{2} v = - k^{2} e .
$$
The solution satisfying $v (\\pm L / 2) = 0$ is
$$
v = v_0 \\cos k x - e, \\qquad v_0 = e \\left[ \\sec \\frac{k L}{2} - 1 \\right],
$$
so the maximum moment is at mid-height,
$$
M_{\\max} = P \\left( e + v_0 \\right) = P e \\sec \\frac{k L}{2} .
$$
Adding the direct stress $P / A$ and the bending stress $M_{\\max} c / I = P e c \\sec \\left( k L / 2 \\right) / A r^{2}$ gives the secant formula, since $I = A r^{2}$ and $k L / 2 = \\left( L / 2 r \\right) \\sqrt{P / E A}$.
:::

::: example Eccentric column {#ex-secant}
A pin-ended steel column of $2.5\\ \\mathrm{m}$ length is a solid square bar $80 \\times 80\\ \\mathrm{mm}$ and carries $180\\ \\mathrm{kN}$ applied at $8\\ \\mathrm{mm}$ eccentricity. Find the maximum compressive stress and compare it with the concentric value.
::: solution
$A = 6400\\ \\mathrm{mm^{2}}$, $I = 3.413 \\times 10^{6}\\ \\mathrm{mm^{4}}$, $r = 23.1\\ \\mathrm{mm}$, $c = 40\\ \\mathrm{mm}$.
$$
\\frac{P}{A} = 28.1\\ \\mathrm{MPa}, \\qquad
\\frac{e c}{r^{2}} = \\frac{8 \\times 40}{23.1^{2}} = 0.600,
$$
$$
\\frac{L}{2 r} \\sqrt{\\frac{P}{E A}}
= \\frac{2500}{46.2} \\sqrt{\\frac{180\,000}{6400 \\times 200\,000}}
= 54.1 \\times 0.01186 = 0.642\\ \\mathrm{rad} = 36.8^{\\circ},
$$
$$
\\sec 36.8^{\\circ} = 1.248, \\qquad
\\sigma_{\\max} = 28.1 \\left( 1 + 0.600 \\times 1.248 \\right) = 49.2\\ \\mathrm{MPa}.
$$
*Check.* $P_E = \\pi^{2} E I / L^{2} = 1078\\ \\mathrm{kN}$, so $P / P_E = 0.167$, and the amplification factor $\\sec \\left( \\frac{\\pi}{2} \\sqrt{P / P_E} \\right) = \\sec \\left( 0.642 \\right) = 1.248$. $\\checkmark$

*Sanity.* An eccentricity of $8\\ \\mathrm{mm}$ — a quarter of the bar's wall thickness, less than the play in a bolted connection — raises the maximum stress by $75$ per cent. That is the single most important number in column design, and it explains three things: why column caps and base plates are machined or shimmed, why a bracket welded to the side of a stanchion must be designed as an eccentrically loaded column and not as a beam, and why the code's "notional initial eccentricity" of $L / 500$ is not a tolerance allowance but a **strength** reduction. At $P / P_E = 0.17$ the amplification is already $25$ per cent; at $P / P_E = 0.5$ it is $63$ per cent; at $0.9$ it is $320$ per cent.
:::
:::

::: example Flagpole {#ex-flagpole}
A $6\ \mathrm{m}$ flagpole in CHS $168.3 \times 8$ is fixed at its base and free at the top. It carries a factored vertical load of $25\ \mathrm{kN}$ and a horizontal wind load of $3\ \mathrm{kN}$ at the head. Check it.
::: solution
$A = 4029\ \mathrm{mm^{2}}$, $I = 13.0 \times 10^{6}\ \mathrm{mm^{4}}$, $r = 56.7\ \mathrm{mm}$, $Z = 1.54 \times 10^{5}\ \mathrm{mm^{3}}$.
**Buckling.** With $K = 2$, $L_e = 12\ \mathrm{m}$,
$$
\lambda = \frac{12\,000}{56.7} = 212, \qquad
\sigma_E = \frac{\pi^{2} \times 200\,000}{212^{2}} = 44.1\ \mathrm{MPa}, \qquad
P_E = 178\ \mathrm{kN},
$$
giving a factor of $178 / 25 = 7.1$ on the working load.
**Bending.** $M = 3 \times 6 = 18\ \mathrm{kN\,m}$, so
$$
\sigma_b = \frac{18 \times 10^{6}}{1.54 \times 10^{5}} = 117\ \mathrm{MPa}, \qquad
\sigma_a = \frac{25\,000}{4029} = 6.2\ \mathrm{MPa}.
$$
**Interaction.** The moment is amplified by the $P - \delta$ effect through
$$
\frac{1}{1 - P / P_E} = \frac{1}{1 - 25 / 178} = 1.16,
$$
so the design stress is $6.2 + 117 \times 1.16 = 142\ \mathrm{MPa}$, comfortably below yield.

*Sanity.* Three things worth noticing. The axial load is $3.5$ per cent of the buckling load and $2.5$ per cent of the squash load, so the pole is designed entirely by wind bending — as flagpoles, chimneys, masts and sign gantries are. The $P - \delta$ amplification is $16$ per cent, which is not negligible and is the reason a slender mast carrying a heavy cable or a heavy head must be checked as a beam-column and not as a cantilever. And had the same pole been guyed at the head, $K$ would fall from $2.0$ to about $0.7$, $P_E$ would rise by a factor of $8.2$ and the whole section could be halved — which is why every tall mast in existence is either guyed or lattice, and why a solid tube becomes uneconomic above about $10\ \mathrm{m}$.
:::
:::

## Plates, webs and post-buckling

::: proposition Local and plate buckling {#prop-plate-buckling}
A flat element in compression buckles locally at
$$
\\sigma_{cr} = \\frac{k \\pi^{2} E}{12 \\left( 1 - \\nu^{2} \\right)} \\left( \\frac{t}{b} \\right)^{2},
$$
where $b$ is the panel width, $t$ the thickness and $k$ a coefficient depending on the edge restraint and the stress distribution, with $k = 4.0$ for a long panel simply supported on all edges under uniform compression and $k = 0.43$ for a web in pure shear with four edges simply supported. For steel, $\\sigma_{cr} = 18\,600 \, k \\left( t / b \\right)^{2}\\ \\mathrm{MPa}$.
:::

::: example Web buckling {#ex-web-buckling}
Check whether the unstiffened web of a plate girder, $1200\\ \\mathrm{mm}$ deep and $8\\ \\mathrm{mm}$ thick, will buckle in shear at a shear force of $900\\ \\mathrm{kN}$.
::: solution
$$
\\frac{d}{t} = \\frac{1200}{8} = 150, \\qquad
\\tau_{cr} = \\frac{0.43 \\times \\pi^{2} \\times 200\,000}{12 \\times 0.91} \\times \\frac{1}{150^{2}}
= 77\,300 \\times 4.44 \\times 10^{-5} = 77.3\\ \\mathrm{MPa}.
$$
The applied mean shear stress is $V / d t = 900 \\times 10^{3} / \\left( 1200 \\times 8 \\right) = 93.8\\ \\mathrm{MPa}$, which **exceeds** the critical value. The web buckles.

**Remedy.** Add transverse stiffeners at $1.0 d = 1200\\ \\mathrm{mm}$ centres, which changes the panel aspect ratio and raises $k$ from $0.43$ to about $5.5$:
$$
\\tau_{cr} = 77.3 \\times \\frac{5.5}{0.43} = 989\\ \\mathrm{MPa} > 93.8\\ \\mathrm{MPa}. \\checkmark
$$
*Sanity.* The web is now $10$ times over-safe in shear, which is more than necessary; a panel spacing of $1.5 d$ with $k \\approx 1.3$ gives $\\tau_{cr} = 233\\ \\mathrm{MPa}$ and is the economical choice. The deeper lesson is that **thin webs do not fail when they buckle**. A web panel that has buckled diagonally develops a tension field along its compressed diagonal, exactly like the web of a truss or the skin of a stressed-shear panel, and continues to carry two or three times the buckling load. Design codes exploit this in the "tension field" method, which is why a modern plate girder has a web so thin that it visibly wrinkles under load and is nonetheless the lightest girder that can be built. Ignoring post-buckling strength gives a web $50$ per cent heavier than it needs to be; ignoring buckling altogether gives a girder that folds.
:::
:::

::: warning The three ways a column lies
There are three distinct buckling modes and a designer must check all three. **Flexural (Euler) buckling** about the weak axis, the ordinary case. **Torsional and flexural-torsional buckling**, which governs for open sections with low torsional stiffness — angles, channels, tees, zeds and double-angles used as web members — where the member twists and buckles at a load **below** the flexural Euler load about either axis; a single angle in a truss is almost always torsionally critical and the code handles it with a modified slenderness. **Local buckling** of an element of the cross-section, which caps the usable stress at whatever the plate can take and is why a cold-formed steel section has lips, why a box girder has internal diaphragms and why an aircraft stringer has a hat section. A section can be optimal for one mode and terrible for another, and the failure of a whole generation of aluminium extrusions came from designing to the flexural load and being beaten by the local one.
:::

::: history
Euler derived the buckling load in $1744$ at the St Petersburg Academy and published it in $1757$, and he then did something remarkable: he pointed out that the formula predicted a strength far above what columns actually carried, and he attributed the discrepancy to the initial crookedness of real members — the correct diagnosis, made before anyone had measured it. Thomas Young and Eaton Hodgkinson attacked the problem experimentally in the $1820$s and $1830$s, Hodgkinson testing several hundred wrought-iron and cast-iron struts at Woolwich and producing the empirical straight-line formula that British engineers used for a century. **Tetmajer** proposed the parabolic and straight-line interpolation formulae in $1879$; **von Kármán and Tsien** gave the tangent-modulus and reduced-modulus theory of inelastic buckling in $1910$ and $1932$, resolving a thirty-year argument about which modulus to use by showing that both were right for different loading histories. **Perry** in $1911$ and **Robertson** in $1936$ produced the imperfect-column formula and the empirical constants that underlie every modern buckling curve. The **tension field** action of a post-buckled web was worked out by **G. H. Wagner** in $1931$ for the all-metal Junkers aircraft, and independently by the Aeronautics Division of the National Physical Laboratory at Farnborough, and it is the reason a modern airliner's wing skin is thin enough to buckle in manufacture and stiff enough in service.
:::

## Where this leads

Column design to a code is in [[machine-design/shafts]] for shafts under combined thrust and bending and in [[solid-mechanics/thin-walled-structures]] for the plate and stiffener formulae used here. Post-buckling and the energy methods behind them are in [[solid-mechanics/energy-methods]], the shell-buckling knockdown factors that make shells so much weaker than this theory predicts are in [[solid-mechanics/plates]], and the interaction of buckling with fatigue is in [[machine-design/fatigue]].

::: summary
- $P_E = \\pi^{2} E I / L_e^{2}$, with $K$ from $0.5$ (fixed-fixed) to $2.0$ (flagpole) — a $16$-to-$1$ range on the same member.
- Buckling is governed by $\\sigma_E = \\pi^{2} E / \\lambda^{2}$: stiffness and slenderness, not strength. Below $\\lambda_1 \\approx 124$ for structural steel, Euler over-predicts and must not be used.
- Put the material far from the centroid: tubes and I-sections beat solid bars per unit mass.
- Real columns are imperfect. A load eccentric by $1 / 10$ of the depth raises the peak stress by $75$ per cent; residual stress costs $10$ to $20$ per cent at moderate slenderness.
- Check flexural, torsional and local buckling separately; the lowest governs.
- Thin plates and webs can carry well above their buckling load through tension-field action, and designing against that is a $50$ per cent weight penalty.
:::

::: quiz
Two struts are made from the same $50\ \mathrm{mm}$ diameter steel bar. One is $1.0\ \mathrm{m}$ long and the other $2.0\ \mathrm{m}$ long, both pin-ended. The short one crushes at $400\ \mathrm{MPa}$; what is the ratio of the long one's buckling load to the short one's?
- [ ] $1 / 4$, because $P_E \propto 1 / L^{2}$
- [ ] $1 / 2$, because the slenderness doubles
- [x] Less than $1 / 4$, because the short one is not at its Euler load at all
- [ ] $1$, because both are the same material and section
::: solution
Less than $1 / 4$. The trap is in the question: the short strut is **not** failing elastically. At $\lambda = 1000 / 12.5 = 80$ its Euler stress is $\pi^{2} \times 200\,000 / 80^{2} = 308\ \mathrm{MPa}$, below the $400\ \mathrm{MPa}$ at which it actually crushes — so the short strut is failing by yielding, not by Euler, and the ratio of the two capacities is $\sigma_E \left( 160 \right) / 400 = 77 / 400 = 0.19$, not $0.25$. The general lesson is that you cannot compare two columns by scaling the Euler formula unless **both** are elastic, and a stocky column is $30$ to $50$ per cent stronger than its Euler load suggests.
:::
:::

## Exercises

::: exercise Effective length {level=1 check="4"}
By what factor does the Euler load of a strut increase if both ends are changed from pinned to fixed?
::: solution
$K$ falls from $1.0$ to $0.5$, so $P_E$ rises by $\\left( 1 / 0.5 \\right)^{2} = 4$.
:::
:::

::: exercise Slenderness {level=1 check="100"}
A column of radius of gyration $25\\ \\mathrm{mm}$ has an effective length of $2.5\\ \\mathrm{m}$. Find its slenderness ratio and Euler stress in steel.
::: solution
$\\lambda = 2500 / 25 = 100$, and $\\sigma_E = \\pi^{2} \\times 200\,000 / 100^{2} = 197\\ \\mathrm{MPa}$.
*Sanity.* $197\\ \\mathrm{MPa}$ is below the $255\\ \\mathrm{MPa}$ yield, so Euler is at least an upper bound — but only just, and the true capacity of a real column at $\\lambda = 100$ is nearer $140\\ \\mathrm{MPa}$.
:::
:::

::: exercise Which axis {level=1 check="200"}
A $60 \\times 40 \\times 5\\ \\mathrm{mm}$ rectangular hollow section has $r_x = 20.0\\ \\mathrm{mm}$ and $r_y = 14.0\\ \\mathrm{mm}$. For a $2.8\\ \\mathrm{m}$ pin-ended strut, what is the governing slenderness?
::: solution
Buckling takes the larger slenderness: $\\lambda_y = 2800 / 14.0 = 200$. (About the other axis it would be $140$, which is not the answer.)
:::
:::

::: exercise Euler or not {level=2}
A pin-ended steel strut has $r = 12\\ \\mathrm{mm}$ and $\\sigma_y = 300\\ \\mathrm{MPa}$. Above what length does Euler give a stress below half the yield stress?
::: solution
Euler gives $\\sigma_y / 2$ at
$$
\\lambda = \\pi \\sqrt{\\frac{2 E}{\\sigma_y}} = \\pi \\sqrt{\\frac{400\,000}{300}} = 114.7,
$$
so $L = 114.7 \\times 12 = 1376\\ \\mathrm{mm}$. Below that length the column is in the inelastic range and Euler is invalid.
:::
:::

::: exercise Eccentricity {level=2}
For the column of Example 6, by what factor does $\\sigma_{\\max} / \\left( P / A \\right)$ rise if the eccentricity is doubled to $16\\ \\mathrm{mm}$?
::: solution
$ec / r^{2}$ doubles to $1.200$ and the secant term is unchanged at $1.248$ because it does not depend on $e$, so
$$
\\frac{\\sigma_{\\max}}{P / A} = 1 + 1.200 \\times 1.248 = 2.50,
$$
against $1.75$ before. Doubling the eccentricity raises the peak stress by $43$ per cent.
*Sanity.* The amplification is **linear** in eccentricity, not quadratic, so there is no benefit in getting the load "nearly" centred: half the tolerance costs half the penalty. This is why column splices are proportion-drilled and why a bolted connection that relies on bearing to centre the load is treated by the codes as fully eccentric.
:::
:::

::: exercise Torsional buckling {level=2}
A single equal angle $100 \\times 100 \\times 10\\ \\mathrm{mm}$ is used as a web member in a truss with $2\\ \\mathrm{m}$ between connections. Why is the flexural Euler load about the minor axis not the design strength?
::: solution
An angle has its shear centre at the intersection of the two legs' centre lines, well outside the section, so the flexural and torsional degrees of freedom are coupled. The member buckles by **twisting** about its shear centre while bending, at a load
$$
\\frac{1}{P_{\\phi}} = \\frac{r_0^{2}}{A \\left( G J + E I_w \\right)} \\times \\frac{A}{\\pi^{2}} \\times \\ldots
$$
in the standard form $P_{\\phi} = \\left( G J + E I_w \\pi^{2} / L^{2} \\right) / \\left( A r_0^{2} \\right)$, and the design strength is the root of
$$
\\left( P - P_E \\right) \\left( P^{2} - P_0 P \\right) = P^{2} P_E \\frac{x_0^{2} + y_0^{2}}{r_0^{2}} .
$$
For a $100 \\times 100 \\times 10$ angle at $2\\ \\mathrm{m}$ the torsional mode is typically $15$ to $25$ per cent below the flexural one, and codes handle it by using a modified slenderness $\\lambda \\sqrt{1 + 0.75 \\left( L / b \\right)^{2}} \\times (t / b)^{2}$-type expression.
*Sanity.* The practical rule is that a single angle in compression is never checked on its minor-axis Euler load alone, and that a **double** angle back-to-back with spacers is far stronger than the ratio of their areas suggests, because the spacing puts the shear centre between the two legs and suppresses the torsional mode.
:::
:::

::: exercise Design {level=3}
Select a circular hollow section to carry a pin-ended axial load of $160\\ \\mathrm{kN}$ over $3.5\\ \\mathrm{m}$ with an overall factor of safety of $3.0$ on the Euler load, and check that local buckling does not govern.
::: solution
$$
P_{cr,\\text{req}} = 3.0 \\times 160 = 480\\ \\mathrm{kN}, \\qquad
I_{\\text{req}} = \\frac{P L^{2}}{\\pi^{2} E}
= \\frac{480\,000 \\times 3500^{2}}{\\pi^{2} \\times 200\,000}
= 2.98 \\times 10^{6}\\ \\mathrm{mm^{4}} .
$$
Try **CHS $114.3 \\times 6.3$**: $A = 2140\\ \\mathrm{mm^{2}}$, $I = 3.43 \\times 10^{6}\\ \\mathrm{mm^{4}}$, $r = 40.0\\ \\mathrm{mm}$.
$$
\\lambda = \\frac{3500}{40.0} = 87.5, \\qquad
\\sigma_E = \\frac{\\pi^{2} \\times 200\,000}{87.5^{2}} = 258\\ \\mathrm{MPa}, \\qquad
P_E = 552\\ \\mathrm{kN} > 480\\ \\mathrm{kN}. \\checkmark
$$
**Local check.** $D / t = 114.3 / 6.3 = 18.1$, well below the $D / 50$-based class limits (the tube-wall elastic local buckling stress is $\\sigma_{cl} \\approx 0.6 E t / R \\approx 6600\\ \\mathrm{MPa}$), so overall buckling governs. **Select CHS $114.3 \\times 6.3$.**

*Design comment.* Note that the working stress is $160\,000 / 2140 = 75\\ \\mathrm{MPa}$, under a third of the yield, and that the section is chosen entirely by stiffness. Note also what a lighter section would do: a CHS $101.6 \\times 5.0$ has $I = 2.13 \\times 10^{6}$ and $P_E = 343\\ \\mathrm{kN}$, which is $24$ per cent lighter and $29$ per cent weaker — near the optimum, since the Euler load of a geometrically similar tube scales as $t$, so weight and strength fall together. The way to gain capacity cheaply is never a heavier tube but a shorter effective length: adding a single lateral restraint at mid-span doubles $P_E$ and would allow a CHS $88.9 \\times 5.0$.
:::
:::

::: exercise Derivation {level=3}
Show that the Euler load of a pin-ended strut is the load at which the straight configuration first becomes unstable by considering the total potential energy of a strut with a small sinusoidal imperfection $v_0 = a_0 \\sin \\pi x / L$, and derive the load-deflection curve. What does it tell you about the post-buckling behaviour of an imperfect column?
::: solution
Take $v = a \\sin \\pi x / L$ as the additional deflection. The strain energy of bending is
$$
U = \\frac{1}{2} \\int_0^L E I \\left( v^{\\prime \\prime} \\right)^{2} \\mathrm{d} x
= \\frac{E I a^{2} \\pi^{4}}{4 L^{3}} ,
$$
and the potential of the load is $- P$ times the shortening $\\Delta = \\tfrac{1}{2} \\int_0^L \\left[ \\left( v^{\\prime} \\right)^{2} + 2 v_0^{\\prime} v^{\\prime} \\right] \\mathrm{d} x = \\dfrac{\\pi^{2}}{4 L} a \\left( a + 2 a_0 \\right)$, so
$$
\\Pi = \\frac{E I \\pi^{4} a^{2}}{4 L^{3}} - \\frac{P \\pi^{2} a \\left( a + 2 a_0 \\right)}{4 L} .
$$
Minimising, $\\partial \\Pi / \\partial a = 0$:
$$
a \\left( \\frac{E I \\pi^{4}}{2 L^{3}} - \\frac{P \\pi^{2}}{2 L} \\right) = \\frac{P \\pi^{2} a_0}{2 L}
\\quad\\Longrightarrow\\quad
a = \\frac{a_0}{\\dfrac{P_E}{P} - 1} = \\frac{a_0 P}{P_E - P},
$$
using $P_E = \\pi^{2} E I / L^{2}$. The **total** deflection is
$$
a_0 + a = \\frac{a_0}{1 - P / P_E},
$$
which is the amplification factor quoted in the beam-column warning.

*What it says.* Three things, all of them important. First, for $P < P_E$ the deflection is finite and proportional to the imperfection: an imperfect column has **no** bifurcation point, it simply bends more and more steeply, and there is no load at which "buckling occurs" — the failure load is whatever load makes the stress reach yield or the deflection become unacceptable. Second, $a \\rightarrow \\infty$ as $P \\rightarrow P_E$, so $P_E$ is the **asymptotic** load of the imperfect column and the perfect-column eigenvalue is a strict upper bound. Third, the derivative $\\mathrm{d} a / \\mathrm{d} P$ grows without limit, which is why an imperfect column gives no warning: the deflection accelerates towards the asymptote and the designer who waits for visible movement waits until it is too late to do anything. The energy method used here — one degree of freedom, one sine term — is the Rayleigh-Ritz method, and it is the same approximation that every buckling check in every code ultimately rests on.
:::
:::
