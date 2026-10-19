A tolerance is the **money a drawing spends**, and a fit is the **promise a part makes to another part**. The ISO system is a two-hundred-year-old compromise between the fact that nothing is made twice to the same size and the fact that a bearing must go on without a hammer and stay on without a key — and every number in it is the residue of somebody's costed decision.

The system's elegance is that it separates **size** from **location** and both from **shape**, and its most-frequent misuse is the assumption that a tolerance of $\pm 0.1$ on a bore and a pin guarantees a sliding fit. It does not: the bore is also **out of round** by an amount the $\pm 0.1$ does not see, and the pin is **bent**. The subject of this lesson is what the $\pm 0.1$ means, what it does not, and what it costs.

::: warning Seven fit errors that are found at assembly
**Specifying $\pm 0.1$ on both members of a fit.** Two symmetric tolerances give a **transition** fit when a clearance was intended, because the mean clearance is zero and half the assemblies are interference. **A clearance fit at $\pm$ on both sides** has a mean clearance of half the sum of the tolerances and a **$50\ \%$** chance of being a transition. **A hole-basis fit quoted as a shaft-basis fit.** $\mathrm{H}7 / \mathrm{g}6$ and $\mathrm{h}6 / \mathrm{G}7$ are the same fit and are **not** the same drawing: the first uses a $\mathrm{H}7$ reamer and a turned shaft, the second a $\mathrm{G}7$ reamed hole at a non-standard size and a lapped shaft. **A tolerance the shop cannot hold and the metrology cannot prove.** A $\pm 0.005$ on a $250\ \mathrm{mm}$ bore in a $22\ {}^{\circ}\mathrm{C}$-uncontrolled shop is a $25\ \mu\mathrm{m}$ error from the $8\ \mu\mathrm{m}$ of thermal growth of the steel between $20$ and $24\ {}^{\circ}\mathrm{C}$, and the drawing has asked for the impossible. **A tolerance stack that is never added.** Five features at $\pm 0.1$ in a chain is $\pm 0.5$ at the end, and the designer who specified $\pm 0.1$ on each and $\pm 0.1$ on the assembly has specified a part that cannot be made. **A surface finish specified as "smooth".** A bearing journal at Ra $1.6$ and a sealing surface at Ra $0.4$ are different parts, and Ra $0.4$ **lapped** and Ra $0.4$ **ground** are different parts too, because Ra does not describe the **lay** or the **material ratio curve** and a shaft-seal runs on the peaks. **A gauge that is not a gauge.** A $\phi 30\ \mathrm{H}7$ hole checked with a micrometer is checked at **two points** and is therefore **not** checked for roundness, and a hole that is $30.00$ across the flats and $30.03$ across the corners passes a micrometer and fails a **go** plug.
:::

## The ISO 286 system

::: definition Tolerance grades and the tolerance unit {#def-it}
The **tolerance unit** is a formula and not a number:
$$
i = 0.45\, \sqrt[3]{D} + 0.001\, D \qquad \left[ \mu\mathrm{m} \right]
$$
where $D$ is the **geometric mean** of the diameter step, in millimetres. The **standard tolerance** of grade IT is a multiple of $i$:
$$
\begin{array}{c c c c c c c c c c}
\text{Grade} & \mathrm{IT}01 & \mathrm{IT}0 & \mathrm{IT}1 & \mathrm{IT}2 & \mathrm{IT}3 & \mathrm{IT}4 & \mathrm{IT}5 & \mathrm{IT}6 & \mathrm{IT}7 \\
\times\, i & 1 & 5 & 10 & 16 & 25 & 40 & 60 & 100 & 160 \\
\hline
\text{Grade} & \mathrm{IT}8 & \mathrm{IT}9 & \mathrm{IT}10 & \mathrm{IT}11 & \mathrm{IT}12 & \mathrm{IT}13 & \mathrm{IT}14 & \mathrm{IT}15 & \mathrm{IT}16 \\
\times\, i & 250 & 400 & 640 & 1000 & 1600 & 2500 & 4000 & 6400 & 10000
\end{array}
$$
**The evaluation.** For a $\phi 30$ shaft the step is $24$ to $30\ \mathrm{mm}$, so $D = \sqrt{24 \times 30} = 26.83\ \mathrm{mm}$:
$$
i = 0.45 \times 2.994 + 0.0268 = 1.347 + 0.027 = 1.374\ \mu\mathrm{m}
$$
$$
\mathrm{IT}5 = 82\ \mu\mathrm{m} \rightarrow 8\ \mu\mathrm{m}, \quad
\mathrm{IT}6 = 137 \rightarrow 13\ \mu\mathrm{m}, \quad
\mathrm{IT}7 = 220 \rightarrow 21\ \mu\mathrm{m}, \quad
\mathrm{IT}8 = 343 \rightarrow 33\ \mu\mathrm{m}
$$
(the tabulated values are rounded to a preferred series, which is why $\mathrm{IT}6 = 13$ and not $137$ — the formula gives the **trend** and the table gives the **number**).
**The grades and what they mean commercially.**
$$
\begin{array}{l l l}
\text{Grade} & \text{Status} & \text{Process} \\
\mathrm{IT}01\text{–}0 & \text{gauge and master} & \text{lapped, gauged, } 20 \pm 0.5\ {}^{\circ}\mathrm{C} \\
\mathrm{IT}1\text{–}3 & \text{precision gauge} & \text{lapped, honed} \\
\mathrm{IT}4\text{–}5 & \text{precision fit, gauge} & \text{fine bore, grind, hone} \\
\mathrm{IT}6\text{–}7 & \text{the working fits} & \text{grind, ream, fine bore} \\
\mathrm{IT}8\text{–}9 & \text{general engineering} & \text{mill, turn, drill, ream lightly} \\
\mathrm{IT}10\text{–}11 & \text{loose, welding, fabrication} & \text{flame-cut, sawn, cast} \\
\mathrm{IT}12\text{–}16 & \text{not a fit} & \text{as-cast, as-rolled, as-cut}
\end{array}
$$
**The rule of thumb that is worth more than the table.** **A hole costs more to tighten than a shaft of the same grade**, because a hole is made by a fixed-size tool and a shaft by a travelling one; the system's answer is the **hole-basis** convention, in which the hole is the standard tool and the shaft is turned to the fit.
:::

::: definition Fundamental deviation and the fit {#def-fund}
A tolerance zone is named by a **letter** (its position relative to the zero line) and a **number** (its size, the IT grade): $\phi 30\ \mathrm{H}7$ is a hole whose zone starts at the zero line and is $21\ \mu\mathrm{m}$ tall; $\phi 30\ \mathrm{g}6$ is a shaft whose zone hangs **below** the zero line and is $13\ \mu\mathrm{m}$ tall.
$$
\begin{array}{l l l}
\text{Hole letters} & A \to \mathrm{H} \to Z \mathrm{C} & \text{lower case for shafts, upper case for holes} \\
\text{H} & EI = 0 & \text{the hole-basis datum hole} \\
\text{h} & es = 0 & \text{the shaft-basis datum shaft} \\
\text{a}\text{–}\mathrm{h}\ /\ \mathrm{A}\text{–}\mathrm{H} & \text{clearance} & \text{the fundamental deviation is the maximum} \\
\text{j}\text{–}\mathrm{n}\ /\ \mathrm{J}\text{–}\mathrm{N} & \text{transition} & \\
\text{p}\text{–}\mathrm{z}\mathrm{c}\ /\ \mathrm{P}\text{–}\mathrm{Z}\mathrm{C} & \text{interference} & \text{the fundamental deviation is the minimum}
\end{array}
$$
**The four fits every engineer should know by number.**
$$
\begin{array}{l c c c c l}
\text{Fit} & \text{Hole} & \text{Shaft} & X_{\min} & X_{\max} & \text{Use} \\
\mathrm{H}11 / \mathrm{c}11 & + 0.130 / 0 & - 0.280 / - 0.410 & 0.130 & 0.410 & \text{hot-rolled, a guard} \\
\mathrm{H}9 / \mathrm{d}9 & + 0.052 / 0 & - 0.040 / - 0.092 & 0.040 & 0.144 & \text{a lever on a shaft, a cover} \\
\mathrm{H}7 / \mathrm{g}6 & + 0.021 / 0 & - 0.007 / - 0.020 & 0.007 & 0.041 & \text{a running bearing, a sliding gear} \\
\mathrm{H}7 / \mathrm{k}6 & + 0.021 / 0 & + 0.015 / + 0.002 & - 0.013 & 0.019 & \text{a gear located and light-pressed} \\
\mathrm{H}7 / \mathrm{p}6 & + 0.021 / 0 & + 0.022 / + 0.009 & - 0.012 & 0.022 & \text{a bearing race on a shaft} \\
\mathrm{H}7 / \mathrm{s}6 & + 0.021 / 0 & + 0.035 / + 0.022 & 0.001 & 0.035 & \text{a heavy press fit, a gear hub}
\end{array}
$$
$X$ is positive for clearance and negative for interference. **The two numbers that decide a fit are the mean and the spread**, and the two questions are: **what is the worst assembly, and what fraction of assemblies are of the other kind?**
:::

::: definition The statistics of a fit {#def-stats}
The limits guarantee that **no** assembly is outside the range, but the **behaviour** of the population is set by the mean and the standard deviation. Treating a machined dimension as **uniform** over its tolerance (which is roughly true of a machine setting that is not statistically controlled) gives $\sigma = t / \sqrt{12}$, and a **normal** distribution centred on the tolerance midpoint gives $\sigma = t / 6$.
$$
\mu_X = \frac{X_{\min} + X_{\max}}{2}, \qquad
\sigma_X = \sqrt{ \left( \frac{t_{\mathrm{hole}}}{\sqrt{12}} \right)^{2} + \left( \frac{t_{\mathrm{shaft}}}{\sqrt{12}} \right)^{2} }
$$
**The $\mathrm{H}7 / \mathrm{p}6$ result, which surprises everyone.** A $\phi 30\ \mathrm{H}7 / \mathrm{p}6$ is nominally an **interference** fit. Its limits are $- 0.012$ (a clearance of $12\ \mu\mathrm{m}$) to $+ 0.022$ (an interference of $22\ \mu\mathrm{m}$), its mean interference is
$$
\mu = \frac{12 \left( - 1 \right) + 22}{2} = + 5\ \mu\mathrm{m}, \qquad
\sigma = \frac{1}{\sqrt{12}} \sqrt{21^{2} + 13^{2}} = \frac{24.7}{3.464} = 7.13\ \mu\mathrm{m}
$$
and the fraction of assemblies that come out as **clearances** is
$$
P \left( X > 0 \right) = P \left( z > \frac{- 5}{7.13} \right) \to P \left( Z < 0.70 \right) = 0.76
$$
so **$24\ \%$ of $\mathrm{H}7 / \mathrm{p}6$ assemblies are loose**. This is not a defect and is not a mistake; it is why a $\mathrm{p}6$ location on a shaft carrying a reversing torque is a **bad** choice and an $\mathrm{s}6$ or a $\mathrm{u}6$ is the right one, and why a bearing's inner race on a rotating shaft is specified $\mathrm{m}6$ or $\mathrm{n}6$ **with a note that it will be pressed on cold or heated**.
**The rule.** A transition fit is a **location** and not a **torque transmission**. If a fit must transmit a torque, its **minimum** interference must be computed against the torque and the friction coefficient at the **lowest** temperature, and the answer is a $\mathrm{u}$ or a $\mathrm{x}$ grade or a key.
:::

::: definition Interference-fit strength {#def-lame}
The contact pressure of a plain interference fit comes from **Lamé's** thick-cylinder equations. For a solid shaft of diameter $d$ in a hub of outside diameter $D$, both of the same material:
$$
\delta = p\, d \left[ \frac{1}{E} \left( \frac{d^{2} + 0}{d^{2} - 0} - \nu \right) + \frac{1}{E} \left( \frac{D^{2} + d^{2}}{D^{2} - d^{2}} + \nu \right) \right]
= \frac{p\, d}{E} \left[ \left( 1 - \nu \right) + \left( \frac{D^{2} + d^{2}}{D^{2} - d^{2}} + \nu \right) \right]
$$
and the transmitted torque is
$$
T = \mu\, p\, \left( \pi d L \right) \frac{d}{2}, \qquad
\sigma_{\theta,\mathrm{hub}} = p\, \frac{D^{2} + d^{2}}{D^{2} - d^{2}} \le 0.6\, \sigma_{y}
$$
**The design check has three limits and the third is the one that is forgotten.** The **hub** must not yield, the **shaft** must not yield, and the **assembly temperature** must not be so high that the differential expansion relieves the fit:
$$
\delta_{T} = \delta \left[ \alpha_{\mathrm{hub}} - \alpha_{\mathrm{shaft}} \right] \Delta T \quad \text{(differential)} \qquad ; \qquad
\delta_{\mathrm{eff}} = \delta - \delta_{T}
$$
**The number that ends arguments.** A $\phi 50\ \mathrm{H}7 / \mathrm{s}6$ steel hub of $80\ \mathrm{mm}$ outside diameter and $60\ \mathrm{mm}$ length has a mean interference of $28\ \mu\mathrm{m}$, a contact pressure of $35\ \mathrm{MPa}$, and a torque capacity at $\mu = 0.12$ of
$$
T = 0.12 \times 35 \times \pi \times 50 \times 60 \times 25 = 198\ \mathrm{kN \cdot mm} = 198\ \mathrm{N \cdot m} .
$$
**The same joint at $150\ {}^{\circ}\mathrm{C}$** with a steel shaft in an aluminium hub loses $\delta \left( 23 - 12 \right) \times 10^{- 6} \times 130 = 0.028 \times 1.43 = 0.040\ \mathrm{mm}$ — **more than the whole interference** — and becomes a clearance.
:::

::: widget plot
f: 1/(1+exp(-1.702*x/7.13))
x: -20, 30
y: 0, 1
labels: fraction with clearance or less
caption: The cumulative fraction of $\phi 30\ \mathrm{H}7 / \mathrm{p}6$ assemblies with an interference **less than** $x$ micrometres, computed from a mean interference of $+ 5\ \mu\mathrm{m}$ and a standard deviation of $7.13\ \mu\mathrm{m}$. At $x = 0$ the curve reads $0.24$: **one assembly in four is a clearance** even though the fit is nominally an interference fit. The vertical lines at $- 12$ and $+ 22$ are the arithmetic limits, beyond which the fraction is exactly $0$ and exactly $1$ because the limits are guaranteed and the statistics are not.
:::

::: definition Surface texture {#def-texture}
$$
\begin{array}{l l l}
\text{Parameter} & \text{Definition} & \text{Says} \\
Ra & \text{arithmetical mean deviation of the profile} & \text{nothing about shape} \\
Rz & \text{mean height of the ten highest peaks and deepest valleys} & \text{the extremes; the old } R_{\max} \text{ is the single tallest} \\
Rq & \text{r.m.s. deviation} & \text{what an optical instrument measures} \\
R3y & \text{three-point flat height} & \text{what a seal sees} \\
Rmr & \text{material ratio at a given depth} & \text{bearing area, the only one that predicts wear} \\
Rsk & \text{skewness} & \text{peaks or valleys} \\
Rku & \text{kurtosis} & \text{spikes or plateau} \\
\text{Lay} & m,\ c,\ r,\ o,\ x,\ m,\ c & \text{direction of the machining marks} \\
\text{Spacing} & \lambda_c,\ \lambda_s & \text{the waviness and roughness cut-offs}
\end{array}
$$
**The W-rule.** The evaluation length and the **cut-off wavelength** are chosen from $Ra$: $\lambda_c = 10\, Ra$ for $Ra$ between $0.02$ and $10\ \mu\mathrm{m}$, and the sampling length is $\lambda_c$ with five sampling lengths in the evaluation length.
$$
\begin{array}{c c c c}
Ra\ (\mu\mathrm{m}) & \lambda_c\ (\mathrm{mm}) & \text{Sampling length} & \text{Evaluation length} \\
0.08 & 0.25 & 0.25 & 1.25 \\
0.2 & 0.8 & 0.8 & 4.0 \\
0.8 & 0.8 & 0.8 & 4.0 \\
3.2 & 0.8 & 0.8 & 4.8 \\
12.5 & 2.5 & 2.5 & 12.5
\end{array}
$$
**The processes and their Ra.**
$$
\begin{array}{l c l l c}
\text{Flame-cut} & 25\text{–}100 & \text{Turn, fine} & 1.6\text{–}3.2 \\
\text{Sand-cast} & 12.5\text{–}50 & \text{Turn, fine-fine} & 0.4\text{–}0.8 \\
\text{Hot-rolled} & 25\text{–}50 & \text{Mill, fine} & 1.6\text{–}3.2 \\
\text{Sand-blast} & 6.3\text{–}25 & \text{Drill} & 6.3\text{–}12.5 \\
\text{Sawn} & 12.5\text{–}25 & \text{Ream} & 1.6\text{–}3.2 \\
\text{Shear-cut} & 3.2\text{–}12.5 & \text{Bore, fine-bore} & 3.2\ /\ 0.8 \\
\text{Turn, rough} & 12.5 & \text{Grind} & 0.4\text{–}1.6 \\
\text{Cold-drawn bar} & 1.6\text{–}3.2 & \text{Hone} & 0.2\text{–}0.8 \\
\text{Extrusion} & 1.6\text{–}6.3 & \text{Lap} & 0.025\text{–}0.1 \\
& & \text{Superfinish} & 0.05\text{–}0.2
\end{array}
$$
**The three things Ra cannot see and a drawing must.** **The lay**, because a shaft seal runs on the **cross-hatch** of a hone and leaks on the unidirectional mark of a grind. **The material ratio**, because two surfaces at Ra $0.4$ — one a plateau-ground plateau and one a lapped spike-field — have a bearing area of $70\ \%$ and $20\ \%$ and a wear life of five to one. **The waviness**, because a $40\ \mu\mathrm{m}$-high, $20\ \mathrm{mm}$-long wave on a Ra $0.8$ face is a leak path that Ra reports as perfect.
:::

::: definition Gauging and the Taylor principle {#def-gauge}
**Taylor's principle (1905).** A **go** gauge must check **all** the features of the part simultaneously — size, roundness, straightness, perpendicularity, position — and a **no-go** gauge must check **one** feature at a time. A go plug that enters is a hole that is **big enough, round enough and straight enough**; a no-go plug that does not enter is a hole whose **diameter alone** is too big.
$$
\begin{array}{l c c c}
\text{Feature} & \phi 30\ \mathrm{H}7\ \text{hole} & \text{GO plug} & \text{NOGO plug} \\
\text{Nominal} & 30.000 & 30.000 & 30.021 \\
\text{Gauge tolerance} & - & + 0.002 / 0 & 0 / - 0.002 \\
\text{Wear allowance} & - & + 0.001 & \text{none} \\
\text{Gauge size} & - & 30.001 \to 30.003 & 30.019 \to 30.021 \\
\text{Gauge life} & - & \text{regrind at the wear limit} & \text{scrap at the limit}
\end{array}
$$
**The three gauge rules.** **The gauge tolerance is $5$ to $10\ \%$ of the part tolerance** and is placed **inside** the part's tolerance zone so that a gauge at its own limit still passes a good part. **The wear allowance is placed on the go side**, because a go gauge wears smaller and a no-go wears larger, and both wear **toward** accepting bad parts. **A gauge is calibrated against a master and not against the part**, because a gauge set to a part is a gauge that reproduces the part's errors.
**The measurement-to-tolerance ratio.** The instrument's expanded uncertainty $U$ must satisfy
$$
U \le \frac{T}{10} \quad \text{(commercial)} \qquad U \le \frac{T}{4} \quad \text{(ISO } 14253\text{-1 default)} \qquad U \le \frac{T}{16} \quad \text{(aerospace)}
$$
**The number that ruins arguments.** A $\phi 30\ \mathrm{H}7$ hole has a $21\ \mu\mathrm{m}$ tolerance; a good outside micrometer has an expanded uncertainty of $2$ to $3\ \mu\mathrm{m}$, which is $T / 8$, and a **bore** gauge of the same quality has $4$ to $5\ \mu\mathrm{m}$, which is $T / 4.5$ — **at the ISO 14253 limit**. A drawing that specifies $\mathrm{H}6$ on a bore and offers no gauge method has specified an unmeasurable part, and the shop will sign it off with a plug gauge and be right to.
:::

::: example A bearing fit, end to end {#ex-bearing}
A $6208$ deep-groove bearing $\left( \phi 40 \right.$ bore, $\phi 80$ outside, $18\ \mathrm{mm}$ wide) runs a $2{,}800\ \mathrm{rpm}$ shaft, rotating with the inner race, with a radial load of $4\ \mathrm{kN}$ and a $\mathrm{k}5$ class normal load. Specify both fits, the seating shoulders, and the gauge method.
::: solution
**The rule from the bearing maker.** A **rotating** ring with a **normal-direction** load must have an **interference** fit on its seat, because a clearance lets the ring **creep** on the seat, and creep polishes the seat, destroys the location and produces the "fretting corrosion" that is really abrasion. A **stationary** ring takes a **clearance** fit so it can be pressed on and off.
**The shaft.** $\phi 40\ \mathrm{k}5$: $+ 0.015 / + 0.002$, a tolerance of $13\ \mu\mathrm{m}$.
$$
\text{mean interference} = \frac{15 + 2}{2} = 8.5\ \mu\mathrm{m}, \qquad
X_{\max} = 0 - 2 = - 2\ \mu\mathrm{m}\ (\text{interference}), \qquad
X_{\min} = 12 - 15 = - 3\ \mu\mathrm{m}
$$
(the bearing bore's tolerance for a normal class $\mathrm{ABEC}\text{-}1 / \mathrm{P}0$ at $\phi 40$ is $0 / - 12\ \mu\mathrm{m}$, so the fit range is an interference of $2$ to $15\ \mu\mathrm{m}$ — **all interference, no clearance**, which is what a rotating ring needs).
**The housing.** $\phi 80\ \mathrm{H}7$: $+ 0.022 / 0$, with the bearing's outside tolerance $0 / - 19\ \mu\mathrm{m}$:
$$
\text{clearance range} = 0 \text{ to } 41\ \mu\mathrm{m}, \qquad \text{mean} = 20\ \mu\mathrm{m}.
$$
**The seating shoulders.** The bearing's $r_{\min}$ is $1.1\ \mathrm{mm}$, so the shaft shoulder must be **less** than $1.1\ \mathrm{mm}$ in radius and the drawing says
$$
R 0.6 \text{ max at the shoulder, and the shoulder diameter } 46.0\ \mathrm{mm} \text{ max so the ring's } 1.1\ \text{corner is clear.}
$$
**The gauge method.** The $\phi 40\ \mathrm{k}5$ journal is checked with an **outside micrometer at two axial positions and two angular positions** — four readings — which controls the **roundness and the cylindricity to within the micrometer's own uncertainty** and is the honest maximum. The $\phi 80\ \mathrm{H}7$ housing bore is checked with a **go plug at $80.000$**, because a bore gauge at $T / 4.5$ cannot prove $\mathrm{H}7$ and a plug can.
**The three notes the drawing must carry.** **"PRESS THE INNER RACE ONTO THE SHAFT AT $90\ {}^{\circ}\mathrm{C}$ MAXIMUM; NEVER PRESS ON THE OUTER RACE THROUGH THE BALLS."** **"THE SHAFT AND HOUSING TOLERANCES ARE PER ISO 286 AND THE BEARING TOLERANCES PER ISO 492 CLASS 0."** **"SURFACE ROUGHNESS OF THE SEATING SURFACES: SHAFT Ra $1.0$, HOUSING Ra $1.6$, NO LAY REQUIREMENT, NO UNDERCUT AT THE SHOULDERS."**
**The one thing that is always wrong.** The **roundness** of the seating surfaces. A $\phi 40\ \mathrm{k}5$ shaft that is $40.008$ across the flats and $40.015$ across the corners has an **effective** interference of $8\ \mu\mathrm{m}$ and not $13$, and the bearing's catalogue interference assumes a round shaft. The note is **"$\bigcirc 0.004$ on the journal, $\square 0.004$ on the journal"**, and it costs nothing on a drawing and everything on a lathe.

*Check.* The mean interference of $8.5\ \mu\mathrm{m}$ on a $\phi 40$ seat gives a contact pressure of about $11\ \mathrm{MPa}$ and a torque capacity of $35\ \mathrm{N \cdot m}$, against a transmitted torque of $P / \omega = 15{,}000 / 293 = 51\ \mathrm{N \cdot m}$ — **the fit alone is not enough**, and the bearing must be located axially and its torque taken by an **abutting sleeve and a shaft shoulder**, not by the fit. $\checkmark$

*Sanity.* The reason a rotating-ring fit is an interference and a stationary-ring fit is a clearance is not the torque but the **creep**: a ring that slips a few micrometres per revolution on its seat will have worn a visible ring on the shaft within $500$ hours, and the wear debris goes into the grease.
:::
:::

::: example A tolerance stack that must not go negative {#ex-stack}
A shaft assembly: housing $120^{+0.5}_{0}$, two bearings each $18\ \mathrm{mm}$ wide at $\pm 0.05$, a spacer $60 \pm 0.1$, an inner-race spacer $8 \pm 0.05$ and a circlip groove of depth $2.5 \pm 0.1$. The bearing's axial end-float must be $0.05$ to $0.25\ \mathrm{mm}$. Dimension the stack.
::: solution
**The loop.** The end-float is
$$
F = 120 - 2 \times 18 - 60 - 8 - 2.5 + C
$$
where $C$ is the circlip's own thickness allowance; the **nominal** is $120 - 36 - 60 - 8 - 2.5 = 13.5$ and the loop must be closed by the circlip groove's position, so the drawing's job is to dimension the **groove depth** to land $F$ in the band.
**The stack, worst case.**
$$
\begin{array}{l c r}
\text{Housing bore depth} & + 0.5 / 0 & + 0.5,\ 0 \\
\text{Two bearings} & \pm 0.05 & - 0.10 \\
\text{Spacer} & \pm 0.1 & - 0.20 \\
\text{Race spacer} & \pm 0.05 & - 0.10 \\
\text{Groove depth} & \pm 0.1 & - 0.10 \\
\hline
\text{Worst-case range of } F & & 0 \text{ to } + 0.50\ \mathrm{mm}
\end{array}
$$
**The verdict.** The worst case spans $0.50\ \mathrm{mm}$ against a required band of $0.20\ \mathrm{mm}$, and the **lower** extreme of $0$ is a **preload**, which for a deep-groove ball bearing at $4\ \mathrm{kN}$ radial is a $30\ \%$ life reduction and a $15\ {}^{\circ}\mathrm{C}$ temperature rise. **The stack fails.**
**The three fixes, in the order a designer should try them.**
1. **Loosen the non-critical members.** The $60\ \mathrm{mm}$ spacer at $\pm 0.1$ is a **turned** part and can be $\pm 0.02$ for $1.2$ times the cost; the housing's $+ 0.5$ is a **machined** depth and can be $+ 0.1$ if it is bored in one setup. The stack becomes $0.10$ to $0.30$ — still wrong, but the right shape.
2. **Add a shim.** The professional answer: a shim pack of $0.2$ to $0.6\ \mathrm{mm}$ in $0.05$ increments, selected at assembly from a set of five, with the note **"SELECT SHIM TO GIVE AN AXIAL END-FLOAT OF } 0.10 \text{ TO } 0.15\ \mathrm{mm}"**. The stack tolerance is then **absorbed** and every member can stay at its cheap value.
3. **Preload deliberately with a spring.** For a high-stiffness spindle the answer is a **wave spring** and a **defined** preload of $300\ \mathrm{N}$, with the stack tolerance taken up by the spring's rate.
**The RSS check.** With the tightened values, $\sigma = \sqrt{0.1^{2} + 0.05^{2} \times 2 + 0.033^{2} \times 2 + 0.033^{2}} / \sqrt{12}$... using uniform $\sigma = t / \sqrt{12}$:
$$
\sigma = \sqrt{ \frac{0.1^{2}}{12} + 2 \frac{0.029^{2}}{12} + \frac{0.033^{2}}{12} + \frac{0.029^{2}}{12} + \frac{0.058^{2}}{12} } = \sqrt{0.00083 + 0.00014 + 0.00009 + 0.00007 + 0.00028} = 0.039\ \mathrm{mm}
$$
and the $\pm 3\sigma$ band is $\pm 0.117\ \mathrm{mm}$ about a mean of $0.20$, giving $0.083$ to $0.317$ — **$1.7\ \%$ of assemblies below the $0.05$ minimum**, which is why the shim is the answer and the RSS is a way of **proving that the cheap route is not cheap**.

*Sanity.* The reason a bearing stack is shimmed in almost every machine is that the alternative — holding $\pm 0.01$ on five members — costs more than the shim, the shim-fitter and the five shims put together. The shim is a **tolerance absorber**, and a drawing that has one is a drawing whose author has done the stack.
:::
:::

::: example Statistical versus worst-case assembly {#ex-stat}
A cover is located by two $\phi 6\ \mathrm{H}7 / \mathrm{h}6$ dowel pins at $80\ \mathrm{mm}$ centres, and the cover's holes are $\phi 6\ \mathrm{H}7$. The cover's hole pattern is drilled to $\pm 0.05$ and the base's are bored to $\pm 0.02$. Give the worst-case and the statistical misalignment, and decide whether the pattern can be drilled.
::: solution
**The loop per hole.** The pin is $\phi 6\ \mathrm{h}6$: $0 / - 0.008$. The hole is $\phi 6\ \mathrm{H}7$: $+ 0.012 / 0$. The **radial** play per hole is therefore $0$ to $0.020\ \mathrm{mm}$, with a mean of $10\ \mu\mathrm{m}$.
**The pattern error.** The cover's two holes are at $80 \pm 0.05$ and the base's at $80 \pm 0.02$, so the **centre-distance** mismatch is
$$
\text{worst case} = 0.05 + 0.02 = 0.07\ \mathrm{mm}, \qquad
\text{RSS} = \sqrt{0.05^{2} + 0.02^{2}} = 0.054\ \mathrm{mm}.
$$
**The assembly condition.** The cover will go on if the **centre-distance mismatch** can be absorbed by the **sum of the radial plays** at the two holes. Worst case, the available play is $2 \times 20 = 40\ \mu\mathrm{m}$ at the two holes combined, and the required absorption is $70\ \mu\mathrm{m}$.
$$
70 > 40 \quad \Rightarrow \quad \textbf{the cover does not go on, worst case.}
$$
**The statistical condition.** The mean play per hole is $10\ \mu\mathrm{m}$ and the mean mismatch is $54\ \mu\mathrm{m}$ against a mean available play of $20\ \mu\mathrm{m}$ — **it does not go on even on average**.
**The three fixes.**
1. **Open the cover's holes to $\phi 6.2$** (a $0.1\ \mathrm{mm}$ radial clearance) and locate on **one** dowel only, with the second hole a clearance. This is the standard answer and the reason a two-dowel pattern is always $\phi 6$ and $\phi 6.2$ and not two $\phi 6$.
2. **Ream both patterns in assembly** — "REAM TO FIT, $\phi 6\ \mathrm{H}7$" — which is cheap, correct and destroys interchangeability.
3. **Tighten the cover's drilling to $\pm 0.01$** with a bushed jig, which costs $2.5$ times the drilling and buys nothing if the base is bored to $\pm 0.02$ anyway.
**The choice.** **One locating dowel and one clearance dowel**, because a two-dowel pattern makes the **pattern tolerance** the assembly tolerance, and the pattern tolerance is always the loosest thing in the design.
*Sanity.* The reason a two-dowel pattern is $\phi 6$ and $\phi 6.2$ and not two $\phi 6$ is that the second dowel adds **no** locating accuracy — the first dowel and the two holes already define the position — and adds **only** a constraint that must be satisfied. A second close dowel is a **statical overconstraint**, and the drawing that has one is a drawing whose author has not drawn the free-body diagram of the cover.
:::
:::

::: example Gauging an H7 bore {#ex-gauge}
Specify the go and no-go plug gauges for a $\phi 40\ \mathrm{H}7$ bore, with a gauge tolerance of $10\ \%$ of the part tolerance and a wear allowance of $1\ \mu\mathrm{m}$, and give the gauge sizes and their limits.
::: solution
**The part.** $\phi 40\ \mathrm{H}7$: $+ 0.025 / 0$, a tolerance of $25\ \mu\mathrm{m}$.
**The gauge tolerance.** $10\ \%$ of $25 = 2.5\ \mu\mathrm{m}$, placed **inside** the part's zone.
**The wear allowance.** $1\ \mu\mathrm{m}$ on the **go** side only, placed **inside** the gauge tolerance.
$$
\begin{array}{l c c}
& \text{GO plug} & \text{NOGO plug} \\
\text{Gauge nominal} & 40.000 & 40.025 \\
\text{Wear allowance} & + 0.001 & - \\
\text{New-gauge limit} & + 0.0035 & - 0.0025 \\
\text{GO size, new} & 40.001 \to 40.0035 & 40.0225 \to 40.025 \\
\text{GO size, worn} & 40.000 \to 40.0025 & \text{scrap at } 40.0225 \\
\text{Setting} & \text{against a gauge block at } 40.000 & \text{against a gauge block at } 40.025
\end{array}
$$
**The three rules this illustrates.** **The go gauge is made at the part's maximum-material size plus the wear allowance**, so that it wears **into** tolerance and not out of it. **The no-go gauge is made at the part's least-material size minus its gauge tolerance**, so that it can never pass a part that is oversize. **The go gauge is regrindable and the no-go is not**, because a go gauge that has worn to its lower limit is still a **correct** gauge of a **worn** condition, while a no-go that has worn smaller passes bad parts and cannot be restored.
**The calibration.** Both gauges are calibrated against **grade 0 gauge blocks** at $20 \pm 0.5\ {}^{\circ}\mathrm{C}$, and the drawing carries the note **"GAUGES TO BE CALIBRATED AGAINST GRADE 0 BLOCKS AT $20\ {}^{\circ}\mathrm{C}$; THE PART IS ACCEPTED IF THE GO ENTERS AND THE NOGO DOES NOT"**.
**The one thing the gauge cannot check.** The bore's **perpendicularity** to its datum face and its **position** — which is why a go plug for a **located** bore is made **long** (four times its diameter) so that it checks the axis's angle as well, and why a short plug is legitimate only for a bore whose axis does not matter.

*Sanity.* The $10\ \%$ gauge tolerance and the $1\ \mu\mathrm{m}$ wear allowance are the **BS 919** and **ISO 1938** recommendations, and the reason they are placed **inside** the part's tolerance is the **producer's risk**: a gauge at its own worst condition must still reject a bad part, and the cost of that guarantee is $2.5\ \mu\mathrm{m}$ of the part's $25$, which is the **consumer's** contribution to the cost of certainty.
:::
:::

::: history
The **limit system** was invented in the **Royal Small Arms Factory at Enfield** and the **Springfield Armory** in the 1860s and made general by the **US Army's 1895 Springfield tolerances**, which specified $+ 0.003 / - 0.000$ on a rifle bolt and are the first documented use of a **unilateral** tolerance on a **functional** dimension; the **British** answer came from the **Munitions Supply Board's 1916 "Report on the System of Limits and Tolerances"** — the **Newcastle** scheme — which was the first national standard, and the **American** from the **Federal Standard 38** of 1925 and the **ASA B4a** of 1926. **The tolerance unit formula** $i = 0.45\sqrt[3]{D} + 0.001 D$ is **J. E. Kirkpatrick**'s 1899 fit for the observed scatter of hand-fitted work, and the **IT grade ladder** in a $\sqrt{10}$-per-decade progression is the **ISO R11/R2** preferred-number system applied to tolerance by the **ISA** in 1929. **The hole-basis convention** is a **tooling** decision: a set of reamers is a capital investment and a lathe is free, and the **1929** standardisation of the **H** hole was an explicit decision to make the **standard tool** the **datum**. **The Taylor principle** is **Charles Le Maistre Taylor**'s 1905 address to the **Institution of Mechanical Engineers** on "The Gauging of Limit Work", which is the founding document of dimensional metrology and the origin of the sentence "a plug gauge that enters is a hole that is good and a ring that does not enter is a shaft that is good, and the two are not the same statement". **The statistics of fits** descend from **Shewhart**'s 1931 *Economic Control* and **E. S. Buffum**'s 1943 *Statistical Analysis of Engineering Tolerances*, which first published the **RSS** rule for engineering stacks and showed that the worst-case stack of a six-part assembly was **four times** too conservative. **The surface-texture parameters** are the **1966 ISO 4287** standardisation of **Schmaltz**'s and **Thomas**'s 1930s profilometry, and the **material-ratio curve** is **Abbott**'s 1937 "Note on a new method of describing surface finish" from the **McGee Valve Company**, which is still the only parameter that predicts a bearing's running-in.
:::

## Where this leads

Tolerances are the numbers that [[engineering-graphics/dimensioning]] places and that [[engineering-graphics/geometric-tolerancing]] extends to shape and position; the gauging of a fit is the metrology of [[manufacturing/metrology-quality]] and the statistics of a stack are the statistics of [[design-process/design-for-manufacture]].

::: summary
- A tolerance zone is a letter and a number: the letter is where, the number is how big, and the number is a multiple of $i = 0.45\sqrt[3]{D} + 0.001D$.
- Holes are the standard tools and shafts are the adjustable members, which is why the system is hole-basis.
- A nominal interference fit can be a clearance a quarter of the time; a transition fit locates and never transmits a torque.
- An interference fit's torque is $\mu p \pi d L (d / 2)$, and its enemy is the differential expansion between two materials.
- Ra describes the height of the profile and nothing about its shape, its lay or its waviness; a seal runs on the material ratio and not on Ra.
- A go gauge checks everything and a no-go checks one thing; a micrometer on an H6 bore is a measurement that proves nothing.
- A tolerance stack is either absorbed by a shim, a spring or a clearance dowel, or it is paid for at $3.5\times$ the part cost.
:::

::: quiz
A $\phi 30\ \mathrm{H}7/\mathrm{p}6$ joint is nominally an interference fit. What fraction of assemblies come out as clearances?
- [ ] None — the limits guarantee interference
- [ ] About $2\ \%$
- [x] About $24\ \%$
- [ ] Half
::: solution
About $24\ \%$. The limits run from a $12\ \mu\mathrm{m}$ clearance to a $22\ \mu\mathrm{m}$ interference, the mean interference is $+5\ \mu\mathrm{m}$ and the standard deviation $7.13\ \mu\mathrm{m}$, so the clearance tail is $24\ \%$ of the population. The limits guarantee that **no** assembly is outside the range; they do not guarantee which side of zero it lands on. This is why a transition fit locates a part and never transmits a torque.
:::
:::

## Exercises

::: exercise Grades {level=1 check="13"}
Give the standard tolerance in micrometres for IT6 at a $\phi 30$ diameter.
::: solution
$13\ \mu\mathrm{m}$.
:::
:::

::: exercise Hole basis {level=1 check="0"}
Give the lower deviation in millimetres of an $\mathrm{H}$ hole.
::: solution
$0$ — the $\mathrm{H}$ zone starts at the zero line.
:::
:::

::: exercise Texture {level=1 check="0.8"}
Give the cut-off wavelength in millimetres for a surface measured at $Ra = 0.8\ \mu\mathrm{m}$.
::: solution
$\lambda_c = 0.8\ \mathrm{mm}$ — the $W\ 0.8$ setting, which is the commonest cut-off in the trade and the one a portable profilometer defaults to.
:::
:::

::: exercise Gauging {level=1 check="10"}
Give the gauge tolerance as a percentage of the part tolerance in ordinary commercial gauging.
::: solution
$10\ \%$.
:::
:::

::: exercise Fit {level=1 check="24"}
Give the percentage of $\mathrm{H}7 / \mathrm{p}6$ assemblies that come out as clearances.
::: solution
About $24\ \%$.
:::
:::

::: exercise Clearance {level=2}
Compute the maximum and minimum clearance of a $\phi 50\ \mathrm{H}8 / \mathrm{f}7$ fit, given $\mathrm{H}8 = + 0.039 / 0$ and $\mathrm{f}7 = - 0.025 / - 0.050$.
::: solution
$$
X_{\max} = 50.039 - 49.950 = 0.089\ \mathrm{mm}, \qquad
X_{\min} = 50.000 - 49.975 = 0.025\ \mathrm{mm}.
$$
*Sanity.* The mean clearance of $57\ \mu\mathrm{m}$ on a $\phi 50$ is $1.1\ \mathrm{mrad}$ of diametral play, which for a $200\ \mathrm{mm}$-long arm on the shaft is $0.23\ \mathrm{mm}$ of tip movement — the reason a locating pin is never $\mathrm{H}8 / \mathrm{f}7$ and a pivot often is.
:::
:::

::: exercise Interference {level=2}
A $\phi 60\ \mathrm{H}7 / \mathrm{s}7$ steel hub of $90\ \mathrm{mm}$ outside diameter transmits $400\ \mathrm{N \cdot m}$. Compute the mean contact pressure and the torque capacity at $\mu = 0.12$, and state whether the fit is adequate.
::: solution
The $\mathrm{s}7$ at $\phi 60$ is $+ 0.046 / + 0.025$ and the $\mathrm{H}7$ is $+ 0.030 / 0$, so the mean interference is
$$
\delta = \frac{\left( 46 + 25 \right) - \left( 30 + 0 \right)}{2} = \frac{71 - 30}{2} = 20.5\ \mu\mathrm{m} \ \text{(mean of the two midpoints)} .
$$
The contact pressure with $D = 90$, $d = 60$, $E = 206{,}000\ \mathrm{MPa}$, $\nu = 0.3$:
$$
\frac{D^{2} + d^{2}}{D^{2} - d^{2}} = \frac{8100 + 3600}{8100 - 3600} = 2.6, \qquad
p = \frac{\delta\, E}{d \left[ \left( 1 - \nu \right) + 2.6 + \nu \right]} = \frac{20.5 \times 10^{- 3} \times 206000}{60 \times 3.3} = 21.3\ \mathrm{MPa} .
$$
$$
T = 0.12 \times 21.3 \times \pi \times 60 \times L \times 30 .
$$
At $L = 70\ \mathrm{mm}$: $T = 0.12 \times 21.3 \times 13{,}195 \times 30 = 1.01 \times 10^{6}\ \mathrm{N \cdot mm} = 1{,}010\ \mathrm{N \cdot m}$ against a required $400\ \mathrm{N \cdot m}$ — a **safety factor of $2.5$**.
*Sanity.* The hub's hoop stress is $p \times 2.6 = 55\ \mathrm{MPa}$, well below the $240\ \mathrm{MPa}$ yield of a $0.45\%$ carbon steel, so the hub is safe and the fit is adequate. The number that could spoil it is $\mu$: a **clean, oiled** steel-steel interface is $0.12$ and a **drawn-in with a light oil film** interface is $0.08$, which cuts the capacity to $670\ \mathrm{N \cdot m}$ and the safety factor to $1.7$.
:::
:::

::: exercise Derivation {level=3}
Derive the interference-fit contact-pressure formula from Lamé's equations for a solid shaft in a solid hub, and evaluate it for a $\phi 40$ steel-steel joint at $20\ \mu\mathrm{m}$ interference.
::: solution
**Lamé.** For a cylinder with an internal pressure $p$ at radius $a$ and an external pressure zero at radius $b$, the radial and hoop stresses are
$$
\sigma_r = A - \frac{B}{r^{2}}, \qquad \sigma_\theta = A + \frac{B}{r^{2}} .
$$
**The hub** ($a = d / 2$, $b = D / 2$, internal pressure $p$): $\sigma_r (a) = - p$, $\sigma_r (b) = 0$, giving
$$
A_h = p\, \frac{a^{2}}{b^{2} - a^{2}}, \qquad B_h = p\, \frac{a^{2} b^{2}}{b^{2} - a^{2}} .
$$
The **radial displacement** at $r = a$ (outward positive) is
$$
u_h = \frac{a}{E} \left( \sigma_\theta (a) - \nu\, \sigma_r (a) \right) = \frac{a}{E} \cdot p\, \frac{b^{2} + a^{2}}{b^{2} - a^{2}} + \frac{a}{E} \nu p = \frac{p\, a}{E} \left( \frac{D^{2} + d^{2}}{D^{2} - d^{2}} + \nu \right) .
$$
**The shaft** (solid, external pressure $p$ at $r = a$, no internal pressure): the hydrostatic-equivalent state gives
$$
u_s = - \frac{p\, a}{E} \left( 1 - \nu \right)
$$
(inward).
**The interference** is the sum of the two displacements around the circumference, i.e. the **diametral** change:
$$
\boxed{ \delta = 2 \left( u_h - u_s \right) = \frac{p\, d}{E} \left[ \frac{D^{2} + d^{2}}{D^{2} - d^{2}} + \nu + 1 - \nu \right] = \frac{p\, d}{E} \left[ \frac{D^{2} + d^{2}}{D^{2} - d^{2}} + 1 \right] }
$$
**Evaluation.** $d = 40$, $D = 60$, $\delta = 0.020\ \mathrm{mm}$, $E = 206{,}000\ \mathrm{MPa}$:
$$
\frac{3600 + 1600}{3600 - 1600} = 2.6, \qquad
p = \frac{0.020 \times 206000}{40 \times 3.6} = 28.6\ \mathrm{MPa} .
$$
*Sanity.* The $\nu$ terms **cancel** for a solid shaft in a solid hub of the same material — a result that surprises most readers and is exact. The hub's hoop stress at the bore is $p \times 2.6 = 74\ \mathrm{MPa}$, and the shaft is under a **pure hydrostatic compression** of $28.6\ \mathrm{MPa}$ at its surface, so it cannot yield and the hub is the only limit.
:::
:::

::: exercise Design {level=3}
Specify the fits, tolerances, surface finishes and gauging for a gearbox: a shaft carrying two gears in a cast housing, with the gears rotating on the shaft on needle bearings and the shaft rotating in two deep-groove bearings.
::: solution
**The five fits.**
$$
\begin{array}{l l l l}
\text{Shaft in the housing bore} & \phi 60\ \mathrm{H}7 / \mathrm{m}6 & + 0.030 / 0,\ + 0.030 / + 0.011 & \text{light press; the housing is stationary, so a transition is right} \\
\text{Needle-bearing journal} & \phi 40\ \mathrm{g}6 & - 0.009 / - 0.025 & \text{the needle's inner race rotates with the shaft} \\
\text{Gear bore on the needle outer} & \phi 48\ \mathrm{H}7 / \mathrm{k}6 & + 0.025 / 0,\ + 0.018 / + 0.002 & \text{the gear is located and transmits by a key} \\
\text{Gear's axial spacer} & 20\ \pm 0.05 & & \text{a turned width} \\
\text{Cover spigot} & \phi 90\ \mathrm{H}9 / \mathrm{d}9 & + 0.074 / 0,\ - 0.060 / - 0.134 & \text{locates the cover, does not carry a load}
\end{array}
$$
**The surface finishes.**
$$
\begin{array}{l c l}
\text{Needle journal} & \mathrm{Ra}\ 0.4,\ \text{lay irrelevant, hardened to } 62\ \mathrm{HRC},\ \text{ground} & \text{a needle bearing runs on } 0.4 \\
\text{Deep-groove journals} & \mathrm{Ra}\ 0.8,\ \text{ground} & \\
\text{Housing bores} & \mathrm{Ra}\ 1.6,\ \text{bored} & \\
\text{Cover spigot} & \mathrm{Ra}\ 3.2 & \\
\text{Gasket faces} & \mathrm{Ra}\ 3.2,\ \text{lay } X,\ \text{cross-hatched} & \text{a gasket needs a } 45^{\circ} \text{ lay or it weeps}
\end{array}
$$
**The gauging.**
$$
\begin{array}{l l}
\phi 60\ \mathrm{H}7\ \text{housing bores} & \text{go and no-go plug gauges, long } \left( 4d \right),\ \text{because the two bores' perpendicularity to the datum matters} \\
\phi 40\ \mathrm{g}6\ \text{journal} & \text{outside micrometer at four points, plus } \bigcirc\ 0.003\ \text{checked on a V-block} \\
\phi 48\ \mathrm{H}7\ \text{gear bores} & \text{go plug, short} \\
\text{Centre distance} & \text{checked by a gauge bar and two pins, not by a coordinate measurement, because it is the assembly's own datum}
\end{array}
$$
**The four notes.** **"MACHINE THE TWO HOUSING BORES IN ONE SETUP AND DIMENSION THE CENTRE DISTANCE FROM THE SETUP, NOT FROM A DRAWING DIMENSION"** — the only way to hold a centre distance to $\pm 0.02$. **"PRESS THE BEARINGS ONTO THE SHAFT AT $90\ {}^{\circ}\mathrm{C}$ AND INTO THE HOUSING AT $- 20\ {}^{\circ}\mathrm{C}$."** **"THE AXIAL POSITION OF THE GEARS IS SET BY A SHIM SELECTED AT ASSEMBLY TO GIVE } 0.1 \text{ TO } 0.25\ \mathrm{mm}$ END PLAY."** **"NO BURRS ON ANY SEATING SURFACE; DEBURR THE OIL HOLES."**
**The one fit that is always wrong.** The **gear bore on the needle's outer race**. The needle manufacturer specifies the **outer race** ground to $\mathrm{g}6$ **as a bearing surface** and the gear bore to $\mathrm{H}7$ — and the assembly then has a $\mathrm{H}7 / \mathrm{g}6$ running fit **plus** the needle's own internal clearance, so the gear runs with twice the play of the bearing. The fix is to make the gear bore $\mathrm{J}7$ or to specify the needle's outer race as a **press** fit in the gear and let the needle carry the clearance.

*Design comment.* The general rule is that **a fit is specified between two surfaces and not between two parts**, and that a bearing already contains a fit — so a chain of "bearing, race, gear, spacer" has four fits and only two of them are the designer's to choose.
:::
:::
