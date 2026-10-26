A tolerance is the **money a drawing spends**, and a fit is the **promise one part makes to another**. The ISO system of limits and fits is a long-standing compromise between the fact that nothing is made twice to the same size and the fact that a bearing must go on without a hammer and stay on without a key — and every number in it is the residue of somebody's costed decision.

The system's elegance is that it separates **size** from **location** and both from **shape**, and its most frequent misuse is the assumption that a tolerance of $\pm 0.1$ on a bore and a pin guarantees a sliding fit. It does not: the bore is also **out of round** by an amount that a two-point size check does not see, and the pin may be **bent**. The subject of this lesson is what a size tolerance means, what it does not, and what it costs. (The tables quoted here follow ISO 286-1 and ISO 286-2, both 2010 editions; the lesson teaches the principles behind the standard and is no substitute for it.)

::: warning Seven fit errors that are found at assembly
**Specifying $\pm 0.1$ on both members of a fit.** Two symmetric tolerances about the same nominal size give a **transition** fit when a clearance was intended: the mean clearance is zero and roughly half the assemblies are interference. **Quoting a hole-basis fit as if it were a shaft-basis fit.** At $\phi 30$, $\mathrm{H}7/\mathrm{g}6$ and $\mathrm{G}7/\mathrm{h}6$ give exactly the same clearance range ($7$ to $41\ \mu\mathrm{m}$), but they are **not** the same drawing: the first uses a standard $\mathrm{H}7$ reamer and a turned or ground shaft, the second a non-standard $\mathrm{G}7$ bore and an $\mathrm{h}6$ shaft — which is the right choice only when one plain shaft carries several parts with different fits. **A tolerance the shop cannot hold and the metrology cannot prove.** A $\pm 0.005$ on a $250\ \mathrm{mm}$ steel bore is a $10\ \mu\mathrm{m}$ band; the bore grows by $250 \times 11.5 \times 10^{-6} \times 4 = 11.5\ \mu\mathrm{m}$ between $20$ and $24\ {}^{\circ}\mathrm{C}$, so in a shop without temperature control the drawing has asked for more than the whole tolerance in thermal growth alone. **A tolerance stack that is never added.** Five features at $\pm 0.1$ in a chain give $\pm 0.5$ at the end, and a designer who also writes $\pm 0.1$ on the assembly has specified a part that cannot be made. **A surface finish specified as "smooth".** A bearing seat at $Ra\ 0.8$ and a seal running surface at $Ra\ 0.4$ are different requirements, and two surfaces at the same $Ra$ can behave very differently because $Ra$ says nothing about the **lay** or the **material ratio**. **A two-point measurement taken as proof of a fit.** A bore gauge measures the diameter across two points; a three-lobed bore can read the same at every two-point position and still have an inscribed circle smaller than its two-point size — it passes the bore gauge and fails the **go** plug. **Forgetting temperature.** Parts are toleranced at the ISO reference temperature of $20\ {}^{\circ}\mathrm{C}$ (ISO 1); a measurement at any other temperature must be corrected or the gauge and part must be of the same material at the same temperature.
:::

## The ISO 286 system

::: definition Tolerance grades and the tolerance unit {#def-it}
For sizes up to $500\ \mathrm{mm}$ and grades IT5 to IT18 the **standard tolerance** is a multiple of the **standard tolerance factor**
$$
i = 0.45\, \sqrt[3]{D} + 0.001\, D \qquad \left[ \mu\mathrm{m},\ D \text{ in mm} \right]
$$
where $D$ is the **geometric mean** of the limits of the nominal size step. The multiples are
$$
\begin{array}{c c c c c c c c c c}
\text{Grade} & \mathrm{IT}5 & \mathrm{IT}6 & \mathrm{IT}7 & \mathrm{IT}8 & \mathrm{IT}9 & \mathrm{IT}10 & \mathrm{IT}11 & \mathrm{IT}12 & \mathrm{IT}13 \\
\times\, i & 7 & 10 & 16 & 25 & 40 & 64 & 100 & 160 & 250
\end{array}
$$
so each grade from IT6 upward is about $1.6$ times the one before (the R5 preferred-number ratio $10^{1/5} = 1.585$), and every fifth grade is ten times larger. The fine grades IT01 to IT4 are given by separate formulas and are not multiples of $i$.
**The evaluation.** A $\phi 30$ shaft lies in the step "over $18$ up to and including $30\ \mathrm{mm}$", so $D = \sqrt{18 \times 30} = 23.24\ \mathrm{mm}$ and
$$
i = 0.45 \times 2.855 + 0.023 = 1.307\ \mu\mathrm{m} ,
$$
$$
\mathrm{IT}5 = 7i = 9.2 \rightarrow 9\ \mu\mathrm{m}, \quad
\mathrm{IT}6 = 10i = 13.1 \rightarrow 13\ \mu\mathrm{m}, \quad
\mathrm{IT}7 = 16i = 20.9 \rightarrow 21\ \mu\mathrm{m}, \quad
\mathrm{IT}8 = 25i = 32.7 \rightarrow 33\ \mu\mathrm{m}.
$$
The tabulated values of ISO 286-1 are these products rounded; for real work the **table** is the authority and the formula explains its **trend**.
**The grades and what they mean commercially** (indicative; the achievable grade depends on size, material and machine):
$$
\begin{array}{l l l}
\text{Grade} & \text{Typical use} & \text{Typical process} \\
\mathrm{IT}01\text{–}3 & \text{gauge blocks, gauges, masters} & \text{lapping, at } 20\ {}^{\circ}\mathrm{C} \\
\mathrm{IT}4\text{–}5 & \text{precision fits, bearing seats} & \text{fine grinding, honing} \\
\mathrm{IT}6\text{–}7 & \text{the working fits} & \text{grinding, reaming, fine boring} \\
\mathrm{IT}8\text{–}9 & \text{general engineering} & \text{turning, milling, boring} \\
\mathrm{IT}10\text{–}11 & \text{loose fits, non-critical sizes} & \text{rough turning, drilling, punching} \\
\mathrm{IT}12\text{–}16 & \text{not a fit} & \text{as-cast, as-rolled, flame-cut, sawn}
\end{array}
$$
**The rule of thumb that is worth more than the table.** **A hole is dearer to hold than a shaft of the same grade**, because a hole is usually finished by a fixed-size tool (drill, reamer, broach) and checked by a fixed-size gauge, while a shaft is turned or ground to any size the machine is set to. The system's answer is the **hole-basis** convention: the hole is $\mathrm{H}$, made with standard tools, and the shaft is made to whatever deviation gives the required fit.
:::

::: definition Fundamental deviation and the fit {#def-fund}
A tolerance zone is named by a **letter** (its position relative to the nominal size, the "zero line") and a **number** (its width, the IT grade). $\phi 30\ \mathrm{H}7$ is a hole whose zone starts at the zero line and is $21\ \mu\mathrm{m}$ wide ($+0.021/0$); $\phi 30\ \mathrm{g}6$ is a shaft whose zone lies **below** the zero line and is $13\ \mu\mathrm{m}$ wide ($-0.007/-0.020$). Upper-case letters are holes, lower-case letters are shafts, and the **fundamental deviation** is the limit nearer the zero line.
$$
\begin{array}{l l l}
\text{Zones} & \text{Position} & \text{Fundamental deviation} \\
\mathrm{H} & EI = 0 & \text{the hole-basis datum hole} \\
\mathrm{h} & es = 0 & \text{the shaft-basis datum shaft} \\
\mathrm{a}\text{–}\mathrm{h} & \text{below the zero line: clearance with H} & \text{the upper deviation } es \\
\mathrm{js},\ \mathrm{j},\ \mathrm{k},\ \mathrm{m},\ \mathrm{n} & \text{straddling or just above: transition with H} & \text{the lower deviation } ei \\
\mathrm{p}\text{–}\mathrm{zc} & \text{well above: interference with H (grade-dependent)} & \text{the lower deviation } ei
\end{array}
$$
**Six hole-basis fits at $\phi 30$** (step $18$–$30\ \mathrm{mm}$, deviations in mm from ISO 286-2; $X$ is clearance, negative for interference):
$$
\begin{array}{l c c c c l}
\text{Fit} & \text{Hole} & \text{Shaft} & X_{\min} & X_{\max} & \text{Typical use} \\
\mathrm{H}11 / \mathrm{c}11 & + 0.130 / 0 & - 0.110 / - 0.240 & 0.110 & 0.370 & \text{loose running, a guard pivot} \\
\mathrm{H}9 / \mathrm{d}9 & + 0.052 / 0 & - 0.065 / - 0.117 & 0.065 & 0.169 & \text{free running, a lever on a shaft} \\
\mathrm{H}7 / \mathrm{g}6 & + 0.021 / 0 & - 0.007 / - 0.020 & 0.007 & 0.041 & \text{sliding, a location that must move} \\
\mathrm{H}7 / \mathrm{k}6 & + 0.021 / 0 & + 0.015 / + 0.002 & - 0.015 & 0.019 & \text{transition, an accurate location} \\
\mathrm{H}7 / \mathrm{p}6 & + 0.021 / 0 & + 0.035 / + 0.022 & - 0.035 & - 0.001 & \text{locational interference} \\
\mathrm{H}7 / \mathrm{s}6 & + 0.021 / 0 & + 0.048 / + 0.035 & - 0.048 & - 0.014 & \text{medium drive, a gear hub}
\end{array}
$$
$X_{\max}$ is the largest hole minus the smallest shaft and $X_{\min}$ the smallest hole minus the largest shaft. Note that $\mathrm{H}7/\mathrm{p}6$ at this size is an interference fit by only $1\ \mu\mathrm{m}$ at its loosest — it **locates** a part rigidly but it is not meant to transmit a large torque. **The two numbers that decide a fit are its limits; the two that describe a production batch are its mean and its spread**, and the two questions are: **what is the worst assembly, and what fraction of assemblies are of the other kind?**
:::

::: definition The statistics of a fit {#def-stats}
The limits guarantee that **no** good assembly is outside the range, but the **behaviour** of the population is set by the mean and the standard deviation. Treating a machined size as **uniform** over its tolerance (roughly true of a process that is not statistically controlled) gives $\sigma = t / \sqrt{12}$; a **normal** distribution whose $\pm 3\sigma$ fills the tolerance gives $\sigma = t / 6$. For the interference $I = d_{\mathrm{shaft}} - d_{\mathrm{hole}}$ with independent parts:
$$
\mu_I = \frac{I_{\min} + I_{\max}}{2}, \qquad
\sigma_I = \sqrt{ \left( \frac{t_{\mathrm{hole}}}{\sqrt{12}} \right)^{2} + \left( \frac{t_{\mathrm{shaft}}}{\sqrt{12}} \right)^{2} } \quad \text{(uniform parts)} .
$$
**The $\mathrm{H}7 / \mathrm{m}6$ result, which surprises most people.** A $\phi 30\ \mathrm{H}7 / \mathrm{m}6$ is often thought of as a light press fit. The $\mathrm{m}6$ shaft is $+0.021/+0.008$, so the interference runs from $-13\ \mu\mathrm{m}$ (a clearance of $13$) to $+21\ \mu\mathrm{m}$, and
$$
\mu_I = \frac{- 13 + 21}{2} = + 4\ \mu\mathrm{m}, \qquad
\sigma_I = \frac{1}{\sqrt{12}} \sqrt{21^{2} + 13^{2}} = \frac{24.70}{3.464} = 7.13\ \mu\mathrm{m} .
$$
With a normal approximation the fraction of assemblies that come out with **clearance** is
$$
P \left( I < 0 \right) = \Phi \left( \frac{0 - 4}{7.13} \right) = \Phi \left( - 0.56 \right) = 0.29 ,
$$
and a Monte Carlo simulation with uniformly distributed parts gives $0.31$. So **roughly three in ten $\mathrm{H}7 / \mathrm{m}6$ assemblies are slightly loose**. This is not a defect: a transition fit **locates**, and a part that must not rotate on it is secured by a key, a clamp or a shoulder.
**The rule.** If a fit must transmit a torque by friction alone, its **minimum** interference — not its mean — must be checked against the torque, with the friction coefficient and the temperature at their worst, and the answer is usually an $\mathrm{s}$, $\mathrm{u}$ or $\mathrm{x}$ shaft or a key.
:::

::: definition Interference-fit strength {#def-lame}
The contact pressure of a plain interference fit follows from **Lamé's** thick-cylinder equations (derived in the exercises). For a **solid** shaft of diameter $d$ in a hub of outside diameter $D$, both of the same material with modulus $E$ and Poisson's ratio $\nu$, a **diametral** interference $\delta$ produces a pressure $p$ given by
$$
\delta = \frac{p\, d}{E} \left[ \left( 1 - \nu \right) + \left( \frac{D^{2} + d^{2}}{D^{2} - d^{2}} + \nu \right) \right]
= \frac{p\, d}{E} \left[ \frac{D^{2} + d^{2}}{D^{2} - d^{2}} + 1 \right] ,
$$
and the torque that friction can transmit over an engagement length $L$ with coefficient $\mu$ is
$$
T = \mu\, p\, \left( \pi d L \right) \frac{d}{2} .
$$
The hub's hoop stress at the bore is $\sigma_{\theta} = p\,(D^{2} + d^{2})/(D^{2} - d^{2})$ with a radial stress $\sigma_r = -p$; the hub must not yield under the **maximum** interference.
**The design check has three limits and the third is the one that is forgotten.** The **hub** must not yield at maximum interference, the joint must carry the torque at **minimum** interference, and a change of **temperature** must not relieve the fit when the hub and shaft are of different materials. The loss of diametral interference is
$$
\delta_{T} = d \left( \alpha_{\mathrm{hub}} - \alpha_{\mathrm{shaft}} \right) \Delta T , \qquad
\delta_{\mathrm{eff}} = \delta - \delta_{T} .
$$
**The numbers.** A $\phi 50\ \mathrm{H}7 / \mathrm{s}6$ steel hub of $80\ \mathrm{mm}$ outside diameter and $60\ \mathrm{mm}$ length: at $\phi 50$ (step $30$–$50$) $\mathrm{H}7 = +0.025/0$ and $\mathrm{s}6 = +0.059/+0.043$, so the interference is $18$ to $59\ \mu\mathrm{m}$ with a mean of $38.5\ \mu\mathrm{m}$. With $E = 206\ \mathrm{GPa}$ and $(D^{2} + d^{2})/(D^{2} - d^{2}) = 8900/3900 = 2.282$,
$$
p_{\min} = \frac{0.018 \times 206\,000}{50 \times 3.282} = 22.6\ \mathrm{MPa}, \qquad
T_{\min} = 0.12 \times 22.6 \times \pi \times 50 \times 60 \times 25 = 6.39 \times 10^{5}\ \mathrm{N \cdot mm} = 639\ \mathrm{N \cdot m}
$$
at $\mu = 0.12$; at the mean interference $p = 48.3\ \mathrm{MPa}$ and $T = 1.37\ \mathrm{kN \cdot m}$.
**The same joint at $150\ {}^{\circ}\mathrm{C}$**, if the hub were aluminium ($\alpha \approx 23 \times 10^{-6}\ \mathrm{K^{-1}}$) on a steel shaft ($\alpha \approx 12 \times 10^{-6}\ \mathrm{K^{-1}}$) assembled at $20\ {}^{\circ}\mathrm{C}$, loses
$$
\delta_T = 50 \times \left( 23 - 12 \right) \times 10^{- 6} \times 130 = 0.072\ \mathrm{mm}
$$
— **more than the largest interference of $0.059\ \mathrm{mm}$** — and the hub comes loose.
:::

::: widget plot
f: 1/(1+exp(-1.702*(x-4)/7.13))
x: -20, 30
y: 0, 1
labels: fraction of assemblies with interference below x
caption: The cumulative fraction of $\phi 30\ \mathrm{H}7 / \mathrm{m}6$ assemblies whose interference is **less than** $x$ micrometres, for a mean interference of $+4\ \mu\mathrm{m}$ and a standard deviation of $7.13\ \mu\mathrm{m}$ (a logistic approximation to the normal curve). Read the curve at $x = 0$: about $0.28$, so roughly three assemblies in ten have clearance although the fit is often treated as a press fit. The arithmetic limits are $-13$ and $+21\ \mu\mathrm{m}$; outside them the true fraction is exactly $0$ or $1$, because the limits are guaranteed and the statistical tails are not.
:::

::: definition Surface texture {#def-texture}
$$
\begin{array}{l l l}
\text{Parameter} & \text{Definition} & \text{What it tells you} \\
Ra & \text{arithmetic mean deviation of the roughness profile} & \text{average height; nothing about shape} \\
Rq & \text{root-mean-square deviation} & \text{as } Ra \text{, weighted towards large deviations} \\
Rz & \text{maximum height (highest peak + deepest valley) in a sampling length} & \text{the extremes; averaged over five lengths} \\
Rsk & \text{skewness of the height distribution} & \text{peaky (positive) or plateau-like (negative)} \\
Rku & \text{kurtosis} & \text{spiky or bumpy} \\
Rmr & \text{material ratio at a given depth} & \text{bearing area; from the Abbott–Firestone curve} \\
\text{Lay} & \text{symbols } =,\ \perp,\ \mathrm{X},\ \mathrm{M},\ \mathrm{C},\ \mathrm{R},\ \mathrm{P} & \text{direction of the machining marks} \\
\lambda_s,\ \lambda_c & \text{filter cut-off wavelengths} & \text{separate roughness from form and waviness}
\end{array}
$$
**The default cut-off.** For a non-periodic profile measured by a stylus instrument, the cut-off wavelength $\lambda_c$ (which is also the sampling length) is chosen from the expected $Ra$, and the evaluation length is five sampling lengths. The ISO 4288:1996 table — now replaced by ISO 21920-3:2021, which drawings made before it still invoke — gives:
$$
\begin{array}{c c c}
Ra\ (\mu\mathrm{m}) & \lambda_c = \text{sampling length}\ (\mathrm{mm}) & \text{Evaluation length}\ (\mathrm{mm}) \\
> 0.006 \text{ to } 0.02 & 0.08 & 0.4 \\
> 0.02 \text{ to } 0.1 & 0.25 & 1.25 \\
> 0.1 \text{ to } 2 & 0.8 & 4 \\
> 2 \text{ to } 10 & 2.5 & 12.5 \\
> 10 \text{ to } 80 & 8 & 40
\end{array}
$$
**The processes and their typical Ra** ($\mu\mathrm{m}$; ranges overlap and depend on parameters and material):
$$
\begin{array}{l c l c}
\text{Flame-cut} & 12.5\text{–}50 & \text{Turn, finish} & 0.8\text{–}3.2 \\
\text{Sand-cast} & 12.5\text{–}50 & \text{Mill, finish} & 0.8\text{–}3.2 \\
\text{Hot-rolled} & 12.5\text{–}25 & \text{Drill} & 3.2\text{–}12.5 \\
\text{Sawn} & 6.3\text{–}25 & \text{Ream} & 0.8\text{–}3.2 \\
\text{Turn, rough} & 6.3\text{–}12.5 & \text{Bore, fine} & 0.4\text{–}1.6 \\
\text{Cold-drawn bar} & 0.8\text{–}3.2 & \text{Grind} & 0.1\text{–}1.6 \\
\text{Extrusion} & 0.8\text{–}3.2 & \text{Hone} & 0.1\text{–}0.8 \\
& & \text{Lap, superfinish} & 0.025\text{–}0.2
\end{array}
$$
**Three things Ra cannot see and a drawing may need to state.** **The lay**: a rotary lip seal can pump oil out along a helical lead left by plunge or traverse grinding, which is why seal makers specify lead-free (plunge-ground) running surfaces. **The material ratio**: two surfaces at the same $Ra$ — one plateau-honed, one with sharp peaks — have very different bearing areas and running-in behaviour, and the material-ratio parameters ($Rmr$, $Rk$, $Rpk$, $Rvk$) describe the difference. **The waviness**: a long, shallow wave on a sealing face is filtered out by $\lambda_c$ and is invisible to $Ra$, but it is a leak path; it needs a waviness or flatness requirement of its own.
:::

::: definition Gauging and the Taylor principle {#def-gauge}
**Taylor's principle.** A **go** gauge should check **all** the features of the part simultaneously — it is a full-form gauge of the maximum-material boundary, the full length of the feature — and a **no-go** gauge should check **one** dimension at a time, at two points. A go plug that enters is a hole that is **big enough, round enough and straight enough** over its length; a no-go plug (or no-go pin) that does not enter is a hole whose **local size** is nowhere too big.
$$
\begin{array}{l c c c}
& \phi 30\ \mathrm{H}7\ \text{hole} & \text{GO plug} & \text{NO-GO plug} \\
\text{Limit checked} & 30.000 \text{ to } 30.021 & 30.000\ (\text{MMC}) & 30.021\ (\text{LMC}) \\
\text{Gauge-maker's tolerance} & - & 0.002,\ \text{inside the part zone} & 0.002,\ \text{inside the part zone} \\
\text{Wear allowance} & - & 0.001 & \text{none} \\
\text{New-gauge size} & - & 30.001 \text{ to } 30.003 & 30.019 \text{ to } 30.021 \\
\text{Withdraw when worn to} & - & 30.000 & \text{below } 30.019
\end{array}
$$
**The three gauge rules.** **The gauge tolerance is a small fraction of the part tolerance** (of the order of $5$ to $10\ \%$; ISO 1938-1 tabulates the values) and is placed **inside** the part's tolerance zone, so that a gauge anywhere within its own tolerance never accepts a bad part — at the cost of rejecting a few good ones near the limits. **A plug gauge only wears smaller**, and the go plug does nearly all the wearing because it enters every good part; a worn go plug would accept undersize holes, so it carries a **wear allowance** and is withdrawn at the part's limit. The no-go plug seldom enters, and wearing smaller only makes it stricter. **A gauge is calibrated against a master** (gauge blocks or a setting ring) and not against a part, because a gauge set to a part reproduces the part's errors.
**The measurement-to-tolerance ratio.** The expanded uncertainty $U$ of a measurement should be small compared with the tolerance $T$: the traditional "rule of ten" asks for $U \le T/10$, and a test-uncertainty ratio of at least $4 : 1$ is a common minimum in calibration practice. ISO 14253-1:2017 makes the consequence explicit: conformity is proved only inside the tolerance zone **reduced by** $U$ at each end, so a large $U$ eats the tolerance.
**The number that settles arguments.** A $\phi 30\ \mathrm{H}7$ hole has a $21\ \mu\mathrm{m}$ tolerance. A two-point bore gauge with an expanded uncertainty of $4$ to $5\ \mu\mathrm{m}$ is at about $T / 4.5$, and after ISO 14253-1 guard-banding only about $12\ \mu\mathrm{m}$ of the $21$ remain as a provable acceptance zone. A drawing that specifies $\mathrm{H}6$ ($13\ \mu\mathrm{m}$) on such a bore with no stated gauging method has specified a part whose conformity the shop cannot prove with that instrument; a limit-plug pair is often the practical answer.
:::

::: example A bearing fit, end to end {#ex-bearing}
A $6208$ deep-groove ball bearing ($\phi 40$ bore, $\phi 80$ outside, $18\ \mathrm{mm}$ wide, normal tolerance class) runs on a shaft that rotates with the inner ring at $2{,}800\ \mathrm{rpm}$, with a stationary radial load of $4\ \mathrm{kN}$ (about $0.12$ of the bearing's dynamic load rating, a normal-to-heavy load). Specify both fits, the shoulder geometry and the gauging.
::: solution
**The rule from the bearing maker.** A ring that **rotates relative to the load** must have an **interference** fit on its seat, because with clearance the ring **creeps** round its seat, wearing it and causing fretting. A ring that is **stationary relative to the load** may have a **clearance** or transition fit, which lets it be fitted and removed easily and, for the floating bearing, slide axially.
**The shaft.** For rotating inner-ring load on a ball bearing of this size, bearing makers' tables typically recommend $\mathrm{k}5$. At $\phi 40$ (step $30$–$50$), $\mathrm{k}5 = +0.013/+0.002$, a tolerance of $11\ \mu\mathrm{m}$. The bearing bore of the normal tolerance class (ISO 492) is $0/-0.012$, so
$$
I_{\min} = 0.002 - 0 = 2\ \mu\mathrm{m}, \qquad
I_{\max} = 0.013 - \left( - 0.012 \right) = 25\ \mu\mathrm{m}, \qquad
\bar{I} = 13.5\ \mu\mathrm{m}
$$
— **all interference, no clearance**, which is what a rotating ring needs. (Note that the bearing's own bore tolerance lies **below** the nominal size, so a "transition" shaft class gives an interference fit with a bearing.)
**The housing.** $\phi 80\ \mathrm{H}7$ (step $50$–$80$) is $+0.030/0$, and the bearing's outside diameter of the normal class is $0/-0.013$:
$$
X_{\min} = 0 - 0 = 0, \qquad X_{\max} = 0.030 - \left( - 0.013 \right) = 43\ \mu\mathrm{m}, \qquad \bar{X} = 21.5\ \mu\mathrm{m}.
$$
**The shoulders.** The bearing's ring chamfer is $r_{s\,\min} = 1.1\ \mathrm{mm}$, so the shaft and housing fillets must be **smaller** than $1.1\ \mathrm{mm}$ or the ring will ride up on the fillet and not seat; the catalogue gives a maximum fillet radius of $1\ \mathrm{mm}$ and a minimum shaft-shoulder diameter (about $47\ \mathrm{mm}$ for a $6208$) so that the shoulder is high enough to support the inner ring face. The drawing says **"R1 MAX"** and gives the shoulder diameter from the catalogue.
**The form tolerances.** A size tolerance does not control roundness. Bearing makers recommend a cylindricity for the seats of a fraction of the diameter tolerance (for this class typically about $\mathrm{IT}5/2$, i.e. $5\ \mu\mathrm{m}$ on the shaft) and a run-out of the abutment shoulder; the drawing carries them as geometric tolerances.
**The gauging.** The $\phi 40\ \mathrm{k}5$ seat is measured for size with a micrometer or comparator at several axial and angular positions, and its **form** is checked separately on a roundness instrument or in V-blocks, because two-point readings cannot detect odd-lobed out-of-roundness. The $\phi 80\ \mathrm{H}7$ housing bore is checked with **go and no-go plugs** ($80.000$ and $80.030$), because a plug finds the inscribed size directly.
**The notes the drawing must carry.** **"BEARING TO BE HEATED (MAX. $120\ {}^{\circ}\mathrm{C}$) FOR MOUNTING ON THE SHAFT; NEVER APPLY MOUNTING FORCE THROUGH THE ROLLING ELEMENTS."** **"SHAFT AND HOUSING TOLERANCES TO ISO 286; BEARING TO ISO 492 NORMAL CLASS."** **"SEAT ROUGHNESS: SHAFT $Ra\ 0.8$, HOUSING $Ra\ 1.6$."**

*Check.* Shaft $40.002$ to $40.013$ against bore $39.988$ to $40.000$: the smallest shaft is still larger than the largest bore, so every assembly has interference ($2$ to $25\ \mu\mathrm{m}$). Housing $80.000$ to $80.030$ against outer ring $79.987$ to $80.000$: the smallest bore is never smaller than the largest ring, so every assembly has clearance or line-to-line contact ($0$ to $43\ \mu\mathrm{m}$). $\checkmark$

*Sanity.* The fit is chosen by **which ring rotates relative to the load**, not by the torque: the bearing's rings carry only the bearing's small friction torque, and the shaft power passes through the shaft itself. An inner ring left with clearance on a rotating shaft slowly walks round its seat and wears it — the classic symptom is a polished, fretted shaft seat found at the first overhaul.
:::
:::

::: example A tolerance stack that must not go negative {#ex-stack}
Two $6208$ bearings sit in a housing bore, separated by an outer spacer and retained by a circlip. The axial end float $F$ of the outer rings must lie between $0.05$ and $0.25\ \mathrm{mm}$. The members are: the housing length from the bore shoulder to the circlip-groove flank $A = 98.35^{+0.30}_{\ \ 0}$; two bearings of width $W = 18^{\ \ 0}_{-0.12}$ (the ISO 492 width tolerance of the normal class); an outer spacer $S = 60 \pm 0.10$; and a circlip of thickness $c = 2.5^{\ \ 0}_{-0.06}$. Analyse the stack.
::: solution
**The loop.** Going round the loop from the shoulder to the groove flank,
$$
F = A - 2W - S - c .
$$
With every member at the **middle** of its tolerance — $A = 98.50$, $W = 17.94$, $S = 60.00$, $c = 2.47$ —
$$
\bar{F} = 98.50 - 35.88 - 60.00 - 2.47 = 0.15\ \mathrm{mm},
$$
exactly the middle of the required band.
**The stack, worst case.** The worst-case range of $F$ is the sum of all the tolerance widths:
$$
\begin{array}{l c}
\text{Housing length } A & 0.30 \\
\text{Two bearings, } 2 \times 0.12 & 0.24 \\
\text{Spacer } S & 0.20 \\
\text{Circlip } c & 0.06 \\
\hline
\text{Worst-case range of } F & 0.80
\end{array}
$$
so $F$ can lie anywhere from $0.15 - 0.40 = -0.25$ to $0.15 + 0.40 = 0.55\ \mathrm{mm}$. Against a required band $0.20\ \mathrm{mm}$ wide, **the stack fails**: at one extreme the bearings are preloaded axially against each other, at the other they have more than twice the permitted float.
**Fix 1 — tighten what can be tightened.** The spacer can be ground to $\pm 0.02$ and the housing length bored to $+0.10/0$ (with $A$ re-centred so that $\bar{F}$ stays $0.15$). The worst-case range becomes $0.10 + 0.24 + 0.04 + 0.06 = 0.44\ \mathrm{mm}$ — **still more than twice the band**, because the bought-in bearings' width tolerance of $0.24$ on its own exceeds the $0.20$ band. No amount of machining of the designer's own parts can rescue this stack.
**The RSS check of the tightened stack.** With uniformly distributed members, $\sigma = t/\sqrt{12}$ each:
$$
\sigma_F = \sqrt{ \frac{0.10^{2} + 2 \times 0.12^{2} + 0.04^{2} + 0.06^{2}}{12} } = \sqrt{ \frac{0.0440}{12} } = 0.0606\ \mathrm{mm},
$$
and the band $0.15 \pm 0.10$ is $\pm 1.65\,\sigma$, so a normal approximation puts about $10\ \%$ of assemblies outside it (a Monte Carlo simulation of the uniform members gives the same $10\ \%$). The statistics confirm that the cheap route is not cheap: one build in ten would have to be stripped.
**Fix 2 — a selected shim.** Make $A$ about $0.5\ \mathrm{mm}$ longer so that a shim is always needed, measure the gap at assembly and fit shims from a set in $0.05\ \mathrm{mm}$ steps. The note reads **"SELECT SHIMS TO GIVE AN AXIAL END FLOAT OF $0.10$ TO $0.20\ \mathrm{mm}$; RECORD THE SHIM THICKNESS."** The stack is then absorbed at assembly and every member can keep its economical tolerance.
**Fix 3 — a spring.** Where some axial preload is acceptable (for example to reduce noise in a small electric motor), a **wave spring** in place of the shim takes up the stack and gives a defined preload set by its rate and deflection.

*Sanity.* The bearings' width tolerance is the single largest contributor and it is not the designer's to change. When a bought-in part's tolerance alone exceeds the functional band, the stack **must** be closed by an adjustment — a shim, a spring, an adjustable nut — and the drawing must say how.
:::
:::

::: example Statistical versus worst-case assembly {#ex-stat}
A cover is located on a base by two $\phi 6\ \mathrm{h}6$ dowel pins at $80\ \mathrm{mm}$ centres, pressed into the base. The cover's two holes are $\phi 6\ \mathrm{H}7$. The cover's hole centres are drilled to $80 \pm 0.05$ and the base's are bored to $80 \pm 0.02$. Will the cover go on?
::: solution
**The play per hole.** The pin is $\phi 6\ \mathrm{h}6$: $0/-0.008$. The hole is $\phi 6\ \mathrm{H}7$: $+0.012/0$. The **diametral** clearance is therefore $0$ to $0.020\ \mathrm{mm}$, so each pin can move **radially** in its hole by $0$ to $0.010\ \mathrm{mm}$.
**The pattern error.** The centre-distance mismatch between cover and base is at most
$$
\text{worst case} = 0.05 + 0.02 = 0.07\ \mathrm{mm}.
$$
**The assembly condition.** The cover goes on if the mismatch can be absorbed by the **sum of the radial plays** at the two holes, which is at most $0.010 + 0.010 = 0.020\ \mathrm{mm}$ and at worst zero:
$$
0.07 > 0.02 \quad \Rightarrow \quad \textbf{the cover is not guaranteed to go on.}
$$
**Statistically.** The mismatch has a mean of zero and (for uniform errors) a standard deviation of $\sqrt{0.10^{2}/12 + 0.04^{2}/12} = 0.031\ \mathrm{mm}$, while the available radial play averages only $0.010\ \mathrm{mm}$. A Monte Carlo simulation of uniformly distributed sizes and positions gives about **$20\ \%$** of covers that go on — four in five do not.
**The three fixes.**
1. **Locate on one dowel and let the second one take only rotation.** Make the cover's second hole a **slot** along the line of centres, or a clearance hole such as $\phi 6.2$ (radial clearance up to $0.1\ \mathrm{mm}$, which absorbs the $0.07$). This is the standard answer.
2. **Drill and ream both parts together at assembly** — "REAM $\phi 6\ \mathrm{H}7$ IN ASSEMBLY" — which is cheap and accurate but destroys interchangeability.
3. **Hold both patterns much tighter** with a jig or a machining centre, which costs money and still leaves no margin unless the total mismatch falls below the guaranteed play.
**The choice.** **One round dowel and one slot (or clearance hole).** Two close-fitting dowels over-constrain the cover: once the first dowel fixes the position, the second needs to fix only the rotation, and any extra closeness just turns the pattern tolerance into an assembly problem.

*Sanity.* A body in a plane has three degrees of freedom; one round dowel removes two and a slot removes the third. Two round dowels remove four, so one of the constraints must be satisfied by luck — and luck is what the $20\ \%$ measures.
:::
:::

::: example Gauging an H7 bore {#ex-gauge}
Specify the go and no-go plug gauges for a $\phi 40\ \mathrm{H}7$ bore, with a gauge-maker's tolerance of $10\ \%$ of the part tolerance and a wear allowance of $1\ \mu\mathrm{m}$, and give the gauge sizes.
::: solution
**The part.** $\phi 40\ \mathrm{H}7$ (step $30$–$50$): $+0.025/0$, a tolerance of $25\ \mu\mathrm{m}$.
**The gauge tolerance.** $10\ \%$ of $25 = 2.5\ \mu\mathrm{m}$, placed **inside** the part's zone.
**The wear allowance.** $1\ \mu\mathrm{m}$ on the **go** gauge only, also inside the part's zone, so that the go gauge starts slightly above the part's minimum and wears down towards it.
$$
\begin{array}{l c c}
& \text{GO plug} & \text{NO-GO plug} \\
\text{Part limit gauged} & 40.000 & 40.025 \\
\text{New-gauge size} & 40.001 \text{ to } 40.0035 & 40.0225 \text{ to } 40.025 \\
\text{Withdraw when worn to} & 40.000 & \text{below } 40.0225 \\
\text{Setting master} & \text{gauge blocks at } 40.000 & \text{gauge blocks at } 40.025
\end{array}
$$
**The rules this illustrates.** **The go gauge is made at the part's maximum-material size plus the wear allowance**, so that it can wear for a long time before reaching the part's limit. **The no-go gauge is made at the part's least-material size minus its gauge tolerance**, so that it can never accept an oversize hole. **A worn go gauge is withdrawn at the part limit**, because below it it would accept undersize holes; a no-go plug wears very little, and if it does wear smaller it only rejects more parts.
**The calibration.** Both gauges are calibrated against gauge blocks or a setting ring at $20\ {}^{\circ}\mathrm{C}$, and the part is accepted if **the go gauge enters over the full length of the bore and the no-go gauge does not enter**.
**What the gauges cannot check.** The bore's **perpendicularity** to its face and its **position** relative to other features. A full-length go plug checks that the bore is straight enough to accept a perfect cylinder of its maximum-material size; orientation and location need a functional gauge or a coordinate measurement against the datums.

*Sanity.* Placing the gauge tolerance inside the part tolerance protects the **customer**: a gauge anywhere within its own tolerance can never accept a bad part. The price is paid by the **producer**, who loses $2.5 + 1 = 3.5\ \mu\mathrm{m}$ of the $25\ \mu\mathrm{m}$ tolerance at the go end and $2.5\ \mu\mathrm{m}$ at the no-go end — about a quarter of the tolerance in all — and will occasionally reject a good part near the limits.
:::
:::

::: history
The idea of controlling size by **limits** rather than by fitting each part to its mate grew up in the armouries and machine shops of the nineteenth century and was formalised in national and company limit systems early in the twentieth. **William Taylor** of Taylor, Taylor & Hobson filed a British patent in **1905** on the gauging of screw threads that set out what is now called **Taylor's principle**: the go gauge must check all the elements of the feature together and the no-go gauges each element separately. An international system of limits and fits was developed by the **International Federation of the National Standardizing Associations (ISA)** before the Second World War; ISO took up the work in **1949** on the basis of the ISA studies and published **ISO/R 286** in **1962**, which was revised as **ISO 286-1** and **ISO 286-2** in **1988** and again in **2010** — the editions in force today. The statistical view of variation comes from **Walter A. Shewhart**, whose *Economic Control of Quality of Manufactured Product* (**1931**) founded statistical process control. The **bearing-area (material-ratio) curve** was introduced by **E. J. Abbott** and **F. A. Firestone** in **1933**, and the surface-texture parameters were standardised internationally in ISO 4287 and ISO 4288, replaced in **2021** by the **ISO 21920** series.
:::

## Where this leads

Tolerances are the numbers that [[engineering-graphics/dimensioning]] places and that [[engineering-graphics/geometric-tolerancing]] extends to shape and position; the gauging of a fit is the metrology of [[manufacturing/metrology-quality]] and the statistics of a stack are the statistics of [[design-process/design-for-manufacture]].

::: summary
- A tolerance zone is a letter and a number: the letter is where it lies relative to the nominal size, the number is how wide it is; from IT5 up, the width is a multiple of $i = 0.45\sqrt[3]{D} + 0.001D$.
- Holes are made by fixed-size tools and checked by fixed-size gauges, which is why the preferred system is hole-basis.
- A transition fit such as $\mathrm{H}7/\mathrm{m}6$ comes out with clearance in roughly three assemblies in ten; a transition fit locates and does not transmit torque by friction.
- An interference fit's torque is $\mu p \pi d L (d / 2)$, checked at the **minimum** interference; its enemies are temperature and dissimilar expansion coefficients.
- $Ra$ describes the average height of the roughness profile and nothing about lay, material ratio or waviness.
- A go gauge checks the full form at maximum material; a no-go checks one size at least material; measurement uncertainty reduces the provable tolerance.
- A tolerance stack that a bought-in part's tolerance alone overfills must be closed by an adjustment — a shim, a spring or a slot — and the drawing must say so.
:::

::: quiz
A $\phi 30\ \mathrm{H}7/\mathrm{m}6$ fit has an interference from $-13$ to $+21\ \mu\mathrm{m}$. With uniformly distributed part sizes, roughly what fraction of assemblies have clearance?
- [ ] None — the fit is a press fit
- [ ] About $2\ \%$
- [x] About $30\ \%$
- [ ] About half
::: solution
About $30\ \%$. The mean interference is $+4\ \mu\mathrm{m}$ and the standard deviation $\sqrt{21^{2} + 13^{2}}/\sqrt{12} = 7.13\ \mu\mathrm{m}$, so a normal approximation gives $\Phi(-4/7.13) = 0.29$ and a simulation with uniform sizes gives $0.31$. The limits guarantee that no assembly lies outside $-13$ to $+21\ \mu\mathrm{m}$; they do not say on which side of zero a given assembly lands. That is why a transition fit locates a part and something else — a key, a clamp — transmits the torque.
:::
:::

## Exercises

::: exercise Grades {level=1 check="13"}
Give the standard tolerance IT6 for a $\phi 30$ diameter. (Enter the value in micrometres.)
::: solution
$13\ \mu\mathrm{m}$ — the formula gives $10 i = 10 \times 1.307 = 13.1\ \mu\mathrm{m}$ for the $18$–$30\ \mathrm{mm}$ step, tabulated as $13$.
:::
:::

::: exercise Hole basis {level=1 check="0"}
Give the lower deviation of an $\mathrm{H}$ hole. (Enter the value in millimetres.)
::: solution
$0$ — the $\mathrm{H}$ zone starts at the zero line.
:::
:::

::: exercise Texture {level=1 check="0.8"}
Give the default cut-off wavelength for a non-periodic surface expected to measure $Ra = 0.8\ \mu\mathrm{m}$. (Enter the value in millimetres.)
::: solution
$\lambda_c = 0.8\ \mathrm{mm}$ — $Ra = 0.8$ lies in the band "over $0.1$ up to $2\ \mu\mathrm{m}$", whose cut-off and sampling length are $0.8\ \mathrm{mm}$, with an evaluation length of $4\ \mathrm{mm}$.
:::
:::

::: exercise Gauging {level=1 check="10"}
In the gauge example of this lesson, the gauge-maker's tolerance was taken as what percentage of the part tolerance? (Enter the percentage.)
::: solution
$10\ \%$ — for the $\phi 40\ \mathrm{H}7$ bore, $2.5\ \mu\mathrm{m}$ of the $25\ \mu\mathrm{m}$ part tolerance.
:::
:::

::: exercise Fit {level=1 check="29"}
Using the normal approximation of this lesson, give the percentage of $\phi 30\ \mathrm{H}7/\mathrm{m}6$ assemblies that have clearance. (Enter the percentage.)
::: solution
$\Phi(-4/7.13) = \Phi(-0.56) = 0.29$, i.e. about $29\ \%$ (a uniform-distribution simulation gives $31\ \%$).
:::
:::

::: exercise Clearance {level=2 check="0.089"}
Compute the maximum and minimum clearance of a $\phi 50\ \mathrm{H}8 / \mathrm{f}7$ fit, given $\mathrm{H}8 = + 0.039 / 0$ and $\mathrm{f}7 = - 0.025 / - 0.050$. (Enter the maximum clearance in millimetres.)
::: solution
$$
X_{\max} = 50.039 - 49.950 = 0.089\ \mathrm{mm}, \qquad
X_{\min} = 50.000 - 49.975 = 0.025\ \mathrm{mm}.
$$
*Sanity.* The mean clearance is $0.057\ \mathrm{mm}$. If a lever is mounted on this fit with a $50\ \mathrm{mm}$-long hub, the clearance lets it tilt by about $0.057/50 = 1.1\ \mathrm{mrad}$, which at the end of a $200\ \mathrm{mm}$ arm is $0.23\ \mathrm{mm}$ of free movement — acceptable for a pivot, not for a precise location.
:::
:::

::: exercise Interference {level=2 check="1040"}
A $\phi 60\ \mathrm{H}7 / \mathrm{s}7$ steel hub, $90\ \mathrm{mm}$ outside diameter and $70\ \mathrm{mm}$ long, on a solid steel shaft must transmit $400\ \mathrm{N \cdot m}$. At $\phi 60$, $\mathrm{H}7 = +0.030/0$ and $\mathrm{s}7 = +0.083/+0.053$. Take $E = 206\ \mathrm{GPa}$ and $\mu = 0.12$. Compute the contact pressure and torque capacity at the **minimum** interference, and check the hub at the maximum interference. (Enter the minimum-interference torque capacity in N·m.)
::: solution
**Interference.** $I_{\min} = 0.053 - 0.030 = 0.023\ \mathrm{mm}$, $I_{\max} = 0.083 - 0 = 0.083\ \mathrm{mm}$.
**Pressure.** With $D = 90$, $d = 60$:
$$
\frac{D^{2} + d^{2}}{D^{2} - d^{2}} = \frac{8100 + 3600}{8100 - 3600} = 2.6, \qquad
p_{\min} = \frac{\delta E}{d \left( 2.6 + 1 \right)} = \frac{0.023 \times 206\,000}{60 \times 3.6} = 21.9\ \mathrm{MPa} .
$$
**Torque.**
$$
T_{\min} = 0.12 \times 21.9 \times \pi \times 60 \times 70 \times 30 = 1.04 \times 10^{6}\ \mathrm{N \cdot mm} = 1{,}040\ \mathrm{N \cdot m},
$$
a factor of $2.6$ on the required $400\ \mathrm{N \cdot m}$.
**Hub stress at maximum interference.** $p_{\max} = 0.083 \times 206\,000 / (60 \times 3.6) = 79.2\ \mathrm{MPa}$, so $\sigma_\theta = 2.6 \times 79.2 = 206\ \mathrm{MPa}$ and $\sigma_r = -79.2\ \mathrm{MPa}$ at the bore; the von Mises stress is $\sqrt{206^{2} + 79.2^{2} + 206 \times 79.2} = 255\ \mathrm{MPa}$, below the yield stress of a normalised medium-carbon steel (roughly $300$ to $350\ \mathrm{MPa}$) but not by a large margin.
*Sanity.* The number that could spoil the design is $\mu$: with a lubricated press-fitted surface $\mu$ may be nearer $0.08$, which cuts the minimum capacity to about $690\ \mathrm{N \cdot m}$ — still adequate, with a factor of $1.7$.
:::
:::

::: exercise Derivation {level=3 check="28.6"}
Derive the interference-fit contact-pressure formula from Lamé's equations for a solid shaft in a hub of the same material, and evaluate it for a $\phi 40$ steel shaft in a $\phi 60$ steel hub at $20\ \mu\mathrm{m}$ diametral interference with $E = 206\ \mathrm{GPa}$. (Enter the pressure in MPa.)
::: solution
**Lamé.** In a thick cylinder under axisymmetric pressure the radial and hoop stresses are
$$
\sigma_r = A - \frac{B}{r^{2}}, \qquad \sigma_\theta = A + \frac{B}{r^{2}} .
$$
**The hub** (inner radius $a = d / 2$, outer radius $b = D / 2$, internal pressure $p$): $\sigma_r (a) = - p$ and $\sigma_r (b) = 0$ give
$$
A_h = p\, \frac{a^{2}}{b^{2} - a^{2}}, \qquad B_h = p\, \frac{a^{2} b^{2}}{b^{2} - a^{2}} , \qquad
\sigma_\theta(a) = p\, \frac{b^{2} + a^{2}}{b^{2} - a^{2}} .
$$
In plane stress the radial displacement at $r = a$ (outward positive) is
$$
u_h = \frac{a}{E} \left( \sigma_\theta (a) - \nu\, \sigma_r (a) \right) = \frac{p\, a}{E} \left( \frac{D^{2} + d^{2}}{D^{2} - d^{2}} + \nu \right) .
$$
**The shaft** (solid, external pressure $p$): $B = 0$ for a finite stress at the centre, so $\sigma_r = \sigma_\theta = - p$ everywhere and
$$
u_s = \frac{a}{E} \left( - p + \nu p \right) = - \frac{p\, a}{E} \left( 1 - \nu \right) \quad \text{(inward)}.
$$
**The interference** is the total diametral change needed to bring the surfaces together:
$$
\boxed{ \delta = 2 \left( u_h - u_s \right) = \frac{p\, d}{E} \left[ \frac{D^{2} + d^{2}}{D^{2} - d^{2}} + \nu + 1 - \nu \right] = \frac{p\, d}{E} \left[ \frac{D^{2} + d^{2}}{D^{2} - d^{2}} + 1 \right] }
$$
**Evaluation.** $d = 40$, $D = 60$, $\delta = 0.020\ \mathrm{mm}$:
$$
\frac{3600 + 1600}{3600 - 1600} = 2.6, \qquad
p = \frac{0.020 \times 206\,000}{40 \times 3.6} = 28.6\ \mathrm{MPa} .
$$
*Sanity.* The $\nu$ terms **cancel** for a solid shaft in a hub of the same material — an exact result of the plane-stress model. The hub's hoop stress at the bore is $2.6 \times 28.6 = 74\ \mathrm{MPa}$; the shaft is in equal biaxial compression $\sigma_r = \sigma_\theta = -28.6\ \mathrm{MPa}$, whose von Mises stress is just $28.6\ \mathrm{MPa}$, so the hub is the limiting member.
:::
:::

::: exercise Design {level=3}
Specify the fits, tolerances, surface finishes and gauging for a gearbox shaft: the shaft runs in two $6208$ deep-groove bearings in a cast housing, and carries a gear that turns freely on it on a drawn-cup needle roller bearing pressed into the gear bore, with the needles running directly on the hardened shaft. A cover with a spigot closes the housing.
::: solution
**The fits** (deviations in mm from ISO 286-2 unless stated):
$$
\begin{array}{l l l l}
\text{Feature} & \text{Fit} & \text{Deviations} & \text{Reason} \\
\text{Shaft seats for the 6208 inner rings} & \phi 40\ \mathrm{k}5 & + 0.013 / + 0.002 & \text{rotating inner ring: interference} \\
\text{Housing bores for the outer rings} & \phi 80\ \mathrm{H}7 & + 0.030 / 0 & \text{stationary outer ring: sliding fit, one ring floats} \\
\text{Gear bore for the drawn cup} & \text{per the bearing maker} & & \text{the thin cup takes its size and shape from the bore} \\
\text{Needle raceway on the shaft} & \text{per the bearing maker} & & \text{sets the running clearance} \\
\text{Gear axial spacer} & 20 \pm 0.05 & & \text{a turned width} \\
\text{Cover spigot in the housing} & \phi 90\ \mathrm{H}8 / \mathrm{f}7 & + 0.054 / 0,\ - 0.036 / - 0.071 & \text{locates the cover, carries no load}
\end{array}
$$
**The drawn-cup decision.** A drawn cup is a thin pressed shell: it has no accuracy of its own until it is pressed into its housing, which rounds and sizes it. The housing (gear) bore tolerance and the shaft raceway tolerance together set the bearing's running clearance, so both are taken from the needle-bearing maker's catalogue, which typically asks for a tighter bore class (often an N-class in a steel housing) and a hardened, ground raceway on the shaft.
**The surface finishes.**
$$
\begin{array}{l l}
\text{Needle raceway on the shaft} & Ra\ 0.2\text{–}0.4,\ \text{hardened (about } 58\text{–}64\ \mathrm{HRC}),\ \text{ground} \\
\text{Bearing seats on the shaft} & Ra\ 0.8,\ \text{ground} \\
\text{Housing bores} & Ra\ 1.6,\ \text{fine-bored} \\
\text{Cover spigot} & Ra\ 3.2 \\
\text{Gasket faces} & Ra\ 3.2,\ \text{as the gasket maker specifies}
\end{array}
$$
**The gauging.**
$$
\begin{array}{l l}
\phi 80\ \mathrm{H}7\ \text{housing bores} & \text{go and no-go plugs; coaxiality of the two bores by CMM or a line bar} \\
\phi 40\ \mathrm{k}5\ \text{seats and the raceway} & \text{comparator or micrometer for size, roundness instrument for form} \\
\text{Gear bores} & \text{go and no-go plugs} \\
\text{Shaft centre distance (if two shafts)} & \text{CMM or a gauge bar against the bore datums}
\end{array}
$$
**The notes.** **"BORE BOTH HOUSING BEARING SEATS IN ONE SETUP."** **"HEAT BEARINGS (MAX. $120\ {}^{\circ}\mathrm{C}$) FOR MOUNTING ON THE SHAFT; OUTER RINGS ARE A SLIDING FIT IN THE HOUSING."** **"SET THE GEAR'S AXIAL PLAY TO $0.10$ TO $0.25\ \mathrm{mm}$ WITH SELECTED SHIMS."** **"NO BURRS ON ANY SEATING SURFACE; DEBURR THE OIL HOLES."**

*Design comment.* A fit is specified between two **surfaces**, not two parts — and a bearing already contains fits and clearances of its own. In a chain of "shaft, bearing, gear" the designer chooses the seats, and the bearing maker's tables say which seats give the bearing its intended internal clearance.
:::
:::
