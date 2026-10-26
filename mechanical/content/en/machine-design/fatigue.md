Most machine parts that break in service do not break because a single load exceeded their strength. They break because a modest load, far below the yield strength, was applied millions of times. Axles, crankshafts, connecting rods, bolts, springs, gear teeth, turbine blades and welded brackets all fail this way, with little or no visible deformation and often with no warning. The phenomenon is **fatigue**, and designing against it is the central task of machine design: the static failure theories of [[machine-design/static-failure]] decide whether a part survives its first load, fatigue decides whether it survives its life.

A fatigue failure has three stages. A crack **initiates** at a point of high local stress — the root of a fillet, a keyway, a machining mark, an inclusion, a corrosion pit — by cyclic slip in a few grains. It then **grows** a little with each cycle, perpendicular to the largest tensile stress, leaving on the fracture surface the "beach marks" that record stops and changes in the loading. Finally the remaining section is too small to carry the peak load and **fractures** suddenly. The metallurgy of these stages is described in [[materials-science/failure]], and the mechanics of crack growth in [[solid-mechanics/fracture-mechanics]]. This chapter teaches the engineering method used to size most machine parts: the **stress-life** method, which predicts the number of cycles to failure from the stress amplitude, corrected for the real part and for mean stress.

Notation follows Budynas and Nisbett, *Shigley's Mechanical Engineering Design* (11th edition): $S$ for strengths, $\sigma$ and $\tau$ for stresses, $n$ for the factor of safety, $N$ for cycles to failure.

## Describing a stress cycle

::: definition Fluctuating stress {#def-cycle}
A stress that varies periodically between $\sigma_{\max}$ and $\sigma_{\min}$ is described by its
$$
\text{alternating stress (amplitude)}\ \ \sigma_a = \frac{\sigma_{\max} - \sigma_{\min}}{2}, \qquad \text{mean stress}\ \ \sigma_m = \frac{\sigma_{\max} + \sigma_{\min}}{2},
$$ {#eq-cycle}
its **range** $\Delta\sigma = 2\sigma_a$ and its **stress ratio** $R = \sigma_{\min}/\sigma_{\max}$. A **fully reversed** cycle has $\sigma_m = 0$, $R = -1$; a **repeated** (zero-to-maximum) cycle has $\sigma_{\min} = 0$, $R = 0$, $\sigma_a = \sigma_m$.
:::

To first order, fatigue life depends on the amplitude and the mean of the cycle, not on the shape of the waveform or (for metals at room temperature and ordinary frequencies) on the frequency. The amplitude drives crack growth; a tensile mean stress holds the crack open and shortens the life, a compressive mean stress lengthens it.

A shaft turning under a steady bending moment is the classic fully reversed case: each surface point passes alternately through the tension and compression sides once per revolution. This is exactly the loading of the **rotating-beam test** of R. R. Moore, in which a polished specimen of about $7.6\ \mathrm{mm}$ diameter is turned under a constant bending moment until it breaks or reaches $10^7$ or more cycles. Most published fatigue data come from such tests.

## The stress-life (S–N) curve

Plotting the stress amplitude at which specimens fail against the number of cycles $N$, on logarithmic axes, gives the **S–N curve** (Wöhler curve). For steels three regions are seen. Below about $10^3$ cycles the strength falls slowly from the ultimate strength (low-cycle fatigue, where plastic strain dominates and the strain-life method is better). Between $10^3$ and about $10^6$ cycles the data lie close to a straight line on log–log axes (high-cycle fatigue). Beyond about $10^6$–$10^7$ cycles the curve of most steels and titanium alloys flattens to a **knee**: below a certain amplitude, the **endurance limit**, specimens appear to last indefinitely. Aluminium, copper and magnesium alloys show no such knee, and their strength is quoted at a stated life, often $5\times10^8$ cycles.

::: definition Endurance limit and fatigue strength {#def-endurance}
The **endurance limit** $S_e'$ is the fully reversed stress amplitude below which a polished laboratory specimen does not fail however many cycles are applied. The **fatigue strength** $S_f'$ at $N$ cycles is the fully reversed amplitude that causes failure at $N$ cycles. A prime denotes the properties of the standard specimen; unprimed $S_e$ and $S_f$ are the values for the real part after the corrections below.
:::

For steels, rotating-beam data plotted against tensile strength scatter widely but follow a trend that Budynas and Nisbett (eq. 6-8) summarise as
$$
S_e' = \begin{cases} 0.5\,S_{ut}, & S_{ut} \le 1400\ \mathrm{MPa}, \\ 700\ \mathrm{MPa}, & S_{ut} > 1400\ \mathrm{MPa}. \end{cases}
$$ {#eq-se-prime}
The ratio varies between about $0.4$ and $0.6$ in the data; the estimate is for use when no test data are available. Very strong steels do not gain endurance in proportion, because their failures start at inclusions and they are more sensitive to surface defects.

::: proposition The high-cycle S–N line {#prop-basquin}
If the S–N curve is a straight line on log–log axes between the points $(10^3,\ fS_{ut})$ and $(10^6,\ S_e)$, then for $10^3 \le N \le 10^6$
$$
S_f = a\,N^b, \qquad a = \frac{(fS_{ut})^2}{S_e}, \qquad b = -\frac13\log_{10}\frac{fS_{ut}}{S_e},
$$ {#eq-basquin}
and the life at a fully reversed stress amplitude $\sigma_\text{rev}$ in that range is $N = (\sigma_\text{rev}/a)^{1/b}$.
:::

::: proof
**Assumptions.** The power law $S_f = aN^b$ (Basquin's relation) holds between $10^3$ and $10^6$ cycles; the strength at $10^3$ cycles is a fraction $f$ of $S_{ut}$; the knee is at $10^6$ cycles.

Taking logarithms, $\log S_f = \log a + b\log N$, a straight line. Through the two points: $\log(fS_{ut}) = \log a + 3b$ and $\log S_e = \log a + 6b$. Subtracting, $3b = \log S_e - \log(fS_{ut})$, so $b = -\tfrac13\log(fS_{ut}/S_e)$. Then $\log a = \log(fS_{ut}) - 3b = \log(fS_{ut}) + \log(fS_{ut}/S_e) = \log[(fS_{ut})^2/S_e]$. Inverting $\sigma_\text{rev} = aN^b$ gives the life.
:::

The **fatigue strength fraction** $f$ is the ratio of the strength at $10^3$ cycles to $S_{ut}$. Budynas and Nisbett give it as a chart (their Fig. 6-18): $f = 0.9$ for $S_{ut}$ up to about $490\ \mathrm{MPa}$, falling to about $0.75$ near $1400\ \mathrm{MPa}$. In this chapter $f = 0.9$ is used unless stated. Notice that $S_e$ in [[#eq-basquin]] is the endurance limit **of the part**, so the whole line moves down when the corrections below are applied.

::: widget plot
f: if(x < 3, u*10^(x*log10(fr)/3), if(x < 6, ((fr*u)^2/(0.5*u*k))*10^(-x*log10(fr*u/(0.5*u*k))/3), 0.5*u*k))
x: 0, 8
y: 0, 1500
sliders: u=700:300:1400:10, fr=0.9:0.75:0.95:0.01, k=1:0.3:1:0.01
vlines: 3; 6
labels: S_f\ \text{(MPa) against}\ \log_{10}N
caption: An estimated S–N curve for a steel, stress amplitude in MPa against $\log_{10}N$. The slider $u$ is $S_{ut}$, $fr$ the fatigue strength fraction $f$, and $k$ the product of the Marin factors $k_ak_bk_c\dots$, so that the knee is at $S_e = 0.5\,k\,S_{ut}$. With the defaults ($S_{ut} = 700\ \mathrm{MPa}$, $f = 0.9$, $k = 1$) the curve passes through $630\ \mathrm{MPa}$ at $10^3$ cycles and $350\ \mathrm{MPa}$ at $10^6$. Now set $k = 0.54$, the value for the machined shaft of [[#ex-marin]]: the knee drops to $189\ \mathrm{MPa}$ and the line steepens, so at a given stress the life falls by far more than the 46 % reduction in strength suggests.
:::

::: example Life of a polished specimen {#ex-sn}
A steel has $S_{ut} = 700\ \mathrm{MPa}$. Estimate the S–N line of polished rotating-beam specimens, the fatigue strength at $10^5$ cycles, and the life at a fully reversed amplitude of $450\ \mathrm{MPa}$.
::: solution
**Endurance limit.** $S_e' = 0.5\times700 = 350\ \mathrm{MPa}$. With $f = 0.9$, $fS_{ut} = 630\ \mathrm{MPa}$.

**Constants.** $a = 630^2/350 = 1134\ \mathrm{MPa}$, $b = -\tfrac13\log_{10}(630/350) = -\tfrac13\times0.2553 = -0.0851$.

**Strength at $10^5$ cycles.** $S_f = 1134\times(10^5)^{-0.0851} = 1134\times0.3755 = 426\ \mathrm{MPa}$.

**Life at $450\ \mathrm{MPa}$.** $N = (450/1134)^{1/(-0.0851)} = (0.3968)^{-11.75} = 5.2\times10^4$ cycles.

**Sanity check.** $426\ \mathrm{MPa}$ lies between $630$ and $350$, about two-thirds of the way down the log scale as $10^5$ is two-thirds of the way from $10^3$ to $10^6$. A stress only 6 % above $426\ \mathrm{MPa}$ halves the life: lives are very sensitive to stress, which is why fatigue lives are quoted to one significant figure.
:::
:::

## From specimen to part: the Marin factors

A real part differs from the polished $7.6\ \mathrm{mm}$ specimen in surface, size, type of loading, temperature and the reliability required. Following J. Marin (1962), these differences are applied as multiplying factors on the specimen endurance limit:
$$
S_e = k_a\,k_b\,k_c\,k_d\,k_e\,k_f\,S_e'.
$$ {#eq-marin}
The factors below are the empirical fits given by Budynas and Nisbett (§6-9); each is a statistical average of scattered data and is used only in the absence of tests on the actual part.

**Surface factor** $k_a = a\,S_{ut}^{\,b}$ ($S_{ut}$ in MPa). A rough surface is full of small notches, and the effect grows with strength because strong steels are more notch-sensitive:

| surface finish | $a$ (MPa) | $b$ |
|---|---|---|
| ground | $1.58$ | $-0.085$ |
| machined or cold-drawn | $4.51$ | $-0.265$ |
| hot-rolled | $57.7$ | $-0.718$ |
| as-forged | $272$ | $-0.995$ |

**Size factor** $k_b$. In bending and torsion a larger section has a larger volume of highly stressed material, so a weak spot is more likely. For round bars in rotating bending or torsion,
$$
k_b = 1.24\,d^{-0.107}\ \ (2.79 \le d \le 51\ \mathrm{mm}), \qquad k_b = 1.51\,d^{-0.157}\ \ (51 < d \le 254\ \mathrm{mm}),
$$ {#eq-kb}
with $d$ in mm; non-rotating and non-round sections use an equivalent diameter. For axial loading there is no stress gradient and $k_b = 1$.

**Load factor** $k_c = 1$ for bending, $0.85$ for axial loading and $0.59$ for torsion. When torsion is combined with other stresses through the von Mises stress, as later in this chapter, $k_c = 1$ is used, because the von Mises conversion already accounts for the difference between shear and normal strength.

**Temperature factor** $k_d$: $1$ near room temperature; at elevated temperature the endurance limit follows the tensile strength down, and above about half the absolute melting temperature creep must be considered.

**Reliability factor** $k_e$. Endurance limits scatter with a standard deviation of roughly 8 % of the mean. [[#eq-se-prime]] gives a mean; for higher reliability:

| reliability | 50 % | 90 % | 95 % | 99 % | 99.9 % |
|---|---|---|---|---|---|
| $k_e$ | $1.000$ | $0.897$ | $0.868$ | $0.814$ | $0.753$ |

**Miscellaneous factor** $k_f$: corrosion, plating, fretting, residual stresses — usually $1$ in calculation but a reminder that these effects can dominate. Shot peening and rolling, which leave compressive residual stresses at the surface, can raise fatigue strength substantially; corrosion and chromium plating can lower it drastically.

::: example Endurance limit of a machined shaft {#ex-marin}
A machined steel shaft of $40\ \mathrm{mm}$ diameter ($S_{ut} = 700\ \mathrm{MPa}$) rotates under a steady bending moment at room temperature. Estimate its endurance limit at 99 % reliability, and the life at a fully reversed amplitude of $300\ \mathrm{MPa}$ (away from any notch).
::: solution
**Factors.** $k_a = 4.51\times700^{-0.265} = 0.795$; $k_b = 1.24\times40^{-0.107} = 0.836$; $k_c = 1$ (bending); $k_d = 1$; $k_e = 0.814$; $k_f = 1$.

**Endurance limit.** $S_e = 0.795\times0.836\times0.814\times350 = 189\ \mathrm{MPa}$ — 54 % of the specimen value.

**S–N line.** $a = 630^2/189.2 = 2098\ \mathrm{MPa}$, $b = -\tfrac13\log_{10}(630/189.2) = -0.1741$. At $300\ \mathrm{MPa}$: $N = (300/2098)^{-1/0.1741} = 7.1\times10^4$ cycles.

**Comment.** The polished specimen would last indefinitely at $300\ \mathrm{MPa}$, since that is below $S_e' = 350\ \mathrm{MPa}$. The machined, larger shaft at 99 % reliability lasts some $70\,000$ revolutions — about 40 minutes at $1800\ \mathrm{rpm}$. The surface and size corrections are not refinements; they decide the design.
:::
:::

## Stress concentration and notch sensitivity

Fatigue cracks start at notches. Under static load a ductile material yields locally and the elastic stress concentration factor $K_t$ of [[machine-design/static-failure]] hardly matters; under cyclic load it matters a great deal. But the full $K_t$ is not observed either: small, sharp notches weaken a part less than $K_t$ predicts, because the stress falls off steeply from the notch root and a crack needs a finite volume of highly stressed material to start. The **fatigue stress concentration factor** $K_f$, the ratio of the unnotched to the notched endurance strength, is related to $K_t$ by the **notch sensitivity** $q$:
$$
K_f = 1 + q\,(K_t - 1), \qquad 0 \le q \le 1,
$$ {#eq-kf}
and similarly $K_{fs} = 1 + q_s(K_{ts} - 1)$ in shear. $q = 0$ means the notch has no effect; $q = 1$ means full sensitivity, $K_f = K_t$. Neuber's form of the dependence on the notch radius $r$ is
$$
q = \frac{1}{1 + \sqrt{a_N}/\sqrt{r}},
$$ {#eq-neuber}
where $\sqrt{a_N}$ (the Neuber constant, with units of $\sqrt{\mathrm{mm}}$) is a material property that decreases with tensile strength: stronger steels are more notch-sensitive. Budynas and Nisbett give $q$ as charts against $r$ for steels of different strength and for aluminium alloys; for steels with notch radii of a few millimetres $q$ is typically $0.7$–$0.95$. When in doubt, take $q = 1$.

$K_f$ multiplies the nominal stress, not the strength. Budynas and Nisbett apply it to both the alternating and the mean components, $\sigma_a = K_f\sigma_{a,\text{nom}}$, $\sigma_m = K_f\sigma_{m,\text{nom}}$, which is conservative when the notch root yields on the first cycle.

::: warning Mistakes that make fatigue predictions worthless
- **Using the specimen endurance limit for the part.** Forgetting $k_a$ and $k_b$ alone can overestimate $S_e$ by a factor of 2 and the life by orders of magnitude.
- **Applying $K_f$ twice**, once to the stress and again to the strength, or applying it to a strength already measured on notched parts (such as the endurance strengths quoted for threaded fasteners or springs).
- **Using $k_c = 0.59$ for torsion and then also using the von Mises stress**, which counts the shear-strength reduction twice.
- **Ignoring the mean stress**, or treating a compressive mean stress as beneficial in a design calculation without test evidence.
- **Expecting precision.** Lives estimated by the stress-life method are good to a factor of 2–3 at best; design with an adequate factor of safety on stress and test the real part when failure matters.
:::

## Fluctuating stresses: the effect of mean stress

Tests at different mean stresses give, for each life, a set of combinations $(\sigma_m, \sigma_a)$ that cause failure. On a plot of $\sigma_a$ against $\sigma_m$ — the **fatigue diagram** — the infinite-life points run from $(0, S_e)$ on the alternating axis down towards the tensile strength on the mean axis. Several curves are used to represent them (Budynas and Nisbett, §6-12):
$$
\begin{aligned}
&\text{modified Goodman:} && \frac{\sigma_a}{S_e} + \frac{\sigma_m}{S_{ut}} = \frac1n, \\
&\text{Gerber:} && \frac{n\sigma_a}{S_e} + \left(\frac{n\sigma_m}{S_{ut}}\right)^2 = 1, \\
&\text{ASME-elliptic:} && \left(\frac{n\sigma_a}{S_e}\right)^2 + \left(\frac{n\sigma_m}{S_y}\right)^2 = 1, \\
&\text{Soderberg:} && \frac{\sigma_a}{S_e} + \frac{\sigma_m}{S_y} = \frac1n, \\
&\text{Langer (first-cycle yield):} && \sigma_a + \sigma_m = \frac{S_y}{n}.
\end{aligned}
$$ {#eq-mean}
These are empirical failure loci, not laws. The Gerber parabola passes through the middle of the data for ductile steels; the Goodman line lies below most of the data and is simple and conservative; the ASME-elliptic curve fits well and is used in the ASME shaft standard; the Soderberg line, through $S_y$, is very conservative. Each criterion is written for a **load line through the origin**: $\sigma_a$ and $\sigma_m$ both grow by the factor $n$, as they do when a load of fixed shape is increased. The Langer line checks yielding on the first cycle; it is needed because the Goodman and Gerber curves extend beyond $S_y$ near the mean-stress axis.

::: proposition Goodman factor of safety on a radial load line {#prop-goodman-n}
If the stresses at a point increase proportionally, $(\sigma_m, \sigma_a) \to (n\sigma_m, n\sigma_a)$, the factor of safety against infinite-life fatigue failure by the modified Goodman criterion is
$$
n_f = \left(\frac{\sigma_a}{S_e} + \frac{\sigma_m}{S_{ut}}\right)^{-1},
$$ {#eq-goodman-n}
and the Gerber factor of safety is
$$
n_f = \frac12\left(\frac{S_{ut}}{\sigma_m}\right)^2\frac{\sigma_a}{S_e}\left[-1 + \sqrt{1 + \left(\frac{2\sigma_mS_e}{S_{ut}\sigma_a}\right)^2}\right] \quad (\sigma_m > 0).
$$ {#eq-gerber-n}
:::

::: proof
**Assumptions.** Tensile mean stress ($\sigma_m > 0$); the failure locus is the Goodman line or Gerber parabola through $(0, S_e)$ and $(S_{ut}, 0)$; the load line passes through the origin.

**Goodman.** The point $(n\sigma_m, n\sigma_a)$ lies on the line $S_a/S_e + S_m/S_{ut} = 1$ when $n(\sigma_a/S_e + \sigma_m/S_{ut}) = 1$, which is [[#eq-goodman-n]].

**Gerber.** The point lies on $S_a/S_e + (S_m/S_{ut})^2 = 1$ when $n\sigma_a/S_e + n^2\sigma_m^2/S_{ut}^2 = 1$, a quadratic $An^2 + Bn - 1 = 0$ with $A = \sigma_m^2/S_{ut}^2$, $B = \sigma_a/S_e$. Its positive root is $n = \dfrac{-B + \sqrt{B^2 + 4A}}{2A} = \dfrac{B}{2A}\left[-1 + \sqrt{1 + 4A/B^2}\right]$. Substituting, $B/(2A) = \tfrac12(S_{ut}/\sigma_m)^2\sigma_a/S_e$ and $4A/B^2 = (2\sigma_mS_e/(S_{ut}\sigma_a))^2$, which is [[#eq-gerber-n]].
:::

::: widget plot
f: e*(1 - x/u); e*(1 - (x/u)^2); sy - x; r*x
x: 0, 800
y: 0, 400
sliders: u=700:400:1200:10, sy=550:250:1000:10, e=236:100:400:1, r=0.6:0.1:3:0.01
points: 150,90
labels: \text{Goodman}; \text{Gerber}; \text{Langer (yield)}; \text{load line}
caption: Fatigue diagram: alternating against mean stress in MPa, for $S_{ut} = u$, $S_y = sy$ and $S_e = e$. The defaults are those of [[#ex-mean]], whose working point $(150, 90)$ is marked; the load line through it has slope $r = 0.6$. (The ASME-elliptic and Soderberg curves are left out for clarity: the ellipse runs from $S_e$ to $S_y$ close to the Gerber curve, the Soderberg line from $S_e$ to $S_y$ below Goodman.) Read the factor of safety for each criterion as the distance along the load line to the curve divided by the distance to the working point. Move $r$ up (more alternating stress) and the criteria converge; move it towards zero (nearly static load) and they spread, with Langer's yield line taking over from Goodman and Gerber.
:::

::: example A notched bar under fluctuating tension {#ex-mean}
A machined steel bar ($S_{ut} = 700\ \mathrm{MPa}$, $S_y = 550\ \mathrm{MPa}$) has a net section of $300\ \mathrm{mm^2}$ at a groove with $K_t = 2.0$ and notch sensitivity $q = 0.8$. It carries an axial load cycling between $10\ \mathrm{kN}$ and $40\ \mathrm{kN}$. Find the factors of safety for infinite life by Goodman, Gerber, ASME-elliptic and Soderberg, and against first-cycle yield. Take 50 % reliability.
::: solution
**Endurance limit.** $k_a = 0.795$ (as in [[#ex-marin]]), $k_b = 1$ and $k_c = 0.85$ for axial load: $S_e = 0.795\times0.85\times350 = 236\ \mathrm{MPa}$.

**Stresses.** $K_f = 1 + 0.8(2.0 - 1) = 1.8$. $F_a = 15\ \mathrm{kN}$, $F_m = 25\ \mathrm{kN}$, so $\sigma_a = 1.8\times15\,000/300 = 90\ \mathrm{MPa}$ and $\sigma_m = 1.8\times25\,000/300 = 150\ \mathrm{MPa}$.

**Factors of safety.**
- Goodman: $1/n = 90/236 + 150/700 = 0.381 + 0.214 = 0.595$, $n = 1.68$.
- Gerber, [[#eq-gerber-n]]: $2\sigma_mS_e/(S_{ut}\sigma_a) = 1.126$, $n = 2.10$.
- ASME-elliptic: $n = [(90/236)^2 + (150/550)^2]^{-1/2} = 2.14$.
- Soderberg: $1/n = 90/236 + 150/550 = 0.654$, $n = 1.53$.
- Langer: $n_y = 550/(90 + 150) = 2.29$.

**Interpretation.** Fatigue governs in every case. The spread, $1.5$ to $2.1$, is the uncertainty in the criterion itself; a designer using Goodman with $n \ge 1.5$ is protected against it. The yield check uses the full $K_f$ and is conservative: a ductile notch root yielding locally on the first cycle would actually relieve the mean stress.
:::
:::

## Combined loading

Shafts, cranks and brackets carry bending, axial and torsional stresses together, each with its own alternating and mean part. The usual engineering approach (Budynas and Nisbett, §6-14) combines them through the von Mises stress, separately for the alternating and the mean parts, and then uses a uniaxial fatigue criterion.

::: algorithm Fatigue under combined in-phase loading {#alg-combined}
1. At the critical point, find the nominal alternating and mean components of each stress: $\sigma_{a}$, $\sigma_{m}$ (bending plus axial) and $\tau_a$, $\tau_m$ (torsion).
2. Multiply each by its fatigue stress concentration factor: $K_f$ for bending (and $K_{f,\text{axial}}$ for axial; divide an axial alternating stress by $0.85$ if the endurance limit is taken for bending), $K_{fs}$ for torsion.
3. Combine: $\sigma_a' = \sqrt{\sigma_a^2 + 3\tau_a^2}$ and $\sigma_m' = \sqrt{\sigma_m^2 + 3\tau_m^2}$ (with the concentrated values).
4. Compute $S_e$ with $k_c = 1$ (bending).
5. Apply a mean-stress criterion of [[#eq-mean]] with $\sigma_a'$, $\sigma_m'$; check first-cycle yield with $\sigma'_{\max} = \sqrt{(\sigma_a + \sigma_m)^2 + 3(\tau_a + \tau_m)^2}$.
:::

The method is approximate. It assumes the components are in phase (all reach their peaks together); for out-of-phase multiaxial loading, as in some crankshafts and rotor shafts, critical-plane methods are used instead.

::: example A lever under fluctuating bending and steady torsion {#ex-combined}
At the fillet of a lever arm the nominal bending stress cycles from $0$ to $120\ \mathrm{MPa}$ while a steady torsional stress of $40\ \mathrm{MPa}$ acts. $K_f = 1.6$, $K_{fs} = 1.3$. The fully corrected endurance limit (with $k_c = 1$) is $S_e = 200\ \mathrm{MPa}$; $S_{ut} = 700\ \mathrm{MPa}$, $S_y = 550\ \mathrm{MPa}$. Find the Goodman factor of safety and the yield factor of safety.
::: solution
**Components.** $\sigma_a = \sigma_m = 60\ \mathrm{MPa}$; $\tau_a = 0$, $\tau_m = 40\ \mathrm{MPa}$.

**Von Mises.** $\sigma_a' = 1.6\times60 = 96.0\ \mathrm{MPa}$; $\sigma_m' = \sqrt{(1.6\times60)^2 + 3(1.3\times40)^2} = \sqrt{9216 + 8112} = 131.6\ \mathrm{MPa}$.

**Goodman.** $1/n_f = 96.0/200 + 131.6/700 = 0.480 + 0.188 = 0.668$, $n_f = 1.50$.

**Yield.** $\sigma'_{\max} = \sqrt{(1.6\times120)^2 + 3(1.3\times40)^2} = \sqrt{36\,864 + 8112} = 212.1\ \mathrm{MPa}$, $n_y = 550/212.1 = 2.59$.

**Comment.** The steady torque adds nothing to the alternating stress but raises the mean, lowering the factor of safety from $1/(0.48 + 96/700) = 1.62$ (bending only) to $1.50$.
:::
:::

## Variable-amplitude loading and cumulative damage

Real parts rarely see constant-amplitude cycles. A crane hook, a vehicle suspension arm or a wind-turbine shaft sees a spectrum of amplitudes. Counting the cycles in a measured stress history is done by **rainflow counting** (standardised in ASTM E1049), which pairs the peaks and valleys into closed hysteresis loops, each with an amplitude and mean. The damage from the counted cycles is then added up.

::: proposition Palmgren–Miner linear damage rule {#prop-miner}
Suppose a part is subjected to $n_i$ cycles at amplitude $\sigma_i$ ($i = 1, \dots, k$), where the constant-amplitude life at $\sigma_i$ is $N_i$. If each cycle at $\sigma_i$ consumes the fraction $1/N_i$ of the life regardless of when it is applied, failure occurs when
$$
D = \sum_{i=1}^{k}\frac{n_i}{N_i} = 1.
$$ {#eq-miner}
:::

::: proof
**Assumption (the hypothesis of the rule).** Damage is a single scalar quantity $D$ that accumulates linearly with cycles at each amplitude, from $D = 0$ (new) to $D = 1$ (failure), at a rate that depends only on the current amplitude: $dD/dn = 1/N(\sigma)$. Under constant amplitude this reproduces the S–N curve, since $D = n/N$ reaches 1 at $n = N$. Under a sequence of amplitudes the increments add, $D = \sum n_i/N_i$, and the order of application is irrelevant because the rate does not depend on $D$. Failure at $D = 1$ gives [[#eq-miner]]. The derivation shows exactly what the rule leaves out: the dependence of damage rate on the damage already done, and hence all sequence effects.
:::

The rule was proposed by A. Palmgren (1924) for ball bearings and by M. A. Miner (1945) for aircraft structures. Experiments give $D$ at failure anywhere from about $0.3$ to $3$: high-then-low sequences tend to fail early ($D < 1$), because cracks started by the high loads grow under loads that would not have started them; low-then-high sequences tend to last longer. Cycles below the endurance limit are counted as harmless in the simple rule, which is unconservative once a crack exists; codes for welded structures (EN 1993-1-9, for example) extend the S–N line below the knee at a reduced slope for this reason. Some design codes require $D \le 0.5$ or less.

::: example Life under a load spectrum {#ex-miner}
The machined shaft of [[#ex-marin]] ($S_e = 189\ \mathrm{MPa}$, $a = 2098\ \mathrm{MPa}$, $b = -0.1741$) sees, in each block of operation, $2000$ cycles at $350\ \mathrm{MPa}$, $10\,000$ at $280\ \mathrm{MPa}$, $50\,000$ at $220\ \mathrm{MPa}$ and $10^6$ at $150\ \mathrm{MPa}$, all fully reversed. Estimate the number of blocks to failure.
::: solution
**Lives.** $N = (\sigma/a)^{1/b}$: at $350\ \mathrm{MPa}$, $N_1 = 2.92\times10^4$; at $280$, $N_2 = 1.05\times10^5$; at $220$, $N_3 = 4.21\times10^5$; at $150\ \mathrm{MPa}$, below $S_e$, $N_4 = \infty$.

**Damage per block.** $D = 2000/29\,230 + 10\,000/105\,300 + 50\,000/420\,600 + 0 = 0.068 + 0.095 + 0.119 = 0.282$.

**Blocks.** $1/0.282 = 3.5$ blocks.

**Comment.** Each damaging level contributes a similar share; the million low cycles contribute nothing by this rule. Had the knee been ignored and the S–N line extended, the life at $150\ \mathrm{MPa}$ would be $N_4 = (150/2098)^{1/b} = 3.8\times10^6$ cycles, adding $10^6/3.8\times10^6 = 0.26$ per block and nearly halving the life, to $1.8$ blocks. Which assumption is right depends on whether cracks are already growing — exactly what the linear rule cannot tell.
:::
:::

## Beyond stress-life

The stress-life method suits long lives and parts designed to stay elastic. Two other methods are used in industry. The **strain-life** method (Coffin–Manson and Basquin, with Neuber's rule to find notch-root strains) treats the cyclic plastic strain at a notch explicitly; it is the method for low-cycle fatigue, such as thermal cycling of turbine parts and overload-dominated spectra. **Linear-elastic fracture mechanics** treats the crack itself: with the Paris law, $da/dN = C(\Delta K)^m$, it predicts how long a crack of known size takes to grow to critical, which is the basis of the damage-tolerant design and inspection intervals of aircraft structures. See [[solid-mechanics/fracture-mechanics]].

::: application Railway axles and aircraft structures
Railway axles were the first engineering parts designed against fatigue, and they remain a demanding case: a wheelset axle turns about 500 million times in a million kilometres, each revolution a cycle of rotating bending, with stress raisers at the wheel seats where press-fitting causes fretting. Modern axles are designed to standards (EN 13103 and EN 13104 in Europe) that specify permissible stresses at each section, and they are inspected ultrasonically in service. In aircraft, the loss of two de Havilland Comet airliners in 1954 was traced to fatigue cracks at the corners of cut-outs in the pressurised fuselage; the investigation, which included a full-scale pressure test of a fuselage in a water tank, changed how pressurised structures were designed, tested and inspected.
:::

::: history
The first recorded fatigue tests were made by Wilhelm Albert, a mining official at Clausthal, who in 1837 published tests of iron conveyor chains loaded repeatedly. Railway axles broke frequently in the 1840s, notably in the Versailles (Meudon) accident of 1842, and W. J. M. Rankine wrote in 1843 on the fracture of axles at sharp shoulders. August Wöhler, as a railway engineer in Germany, built machines to test axles under rotating bending and published his results between 1858 and 1870, showing the existence of an endurance limit for iron and steel and the importance of the range of stress; the S–N curve is often called the Wöhler curve. Heinrich Gerber proposed his parabolic mean-stress relation in 1874, and John Goodman's *Mechanics Applied to Engineering* (1899) introduced the straight-line diagram later modified into the "modified Goodman" line. O. H. Basquin described the log–log straight line of the S–N curve in 1910. Arvid Palmgren used linear damage summation for ball bearings in 1924, and M. A. Miner published the rule for aircraft structures in 1945.
:::

::: quiz
Which change to a machined steel part raises its fatigue endurance limit the most?
- [ ] Making it from a steel of 20 % higher tensile strength, still machined.
- [x] Grinding and shot-peening the critical surface.
- [ ] Increasing the diameter by 20 % while keeping the stress the same.
- [ ] Testing at a higher cycling frequency.
::: solution
A stronger machined steel gains less than 20 % because $k_a$ falls with $S_{ut}$; a larger diameter lowers $k_b$; frequency has little effect. Grinding raises $k_a$ (from about $0.79$ to $0.91$ at $S_{ut} = 700\ \mathrm{MPa}$) and shot peening adds compressive residual stress at the surface where cracks start, often increasing fatigue strength by tens of per cent.
:::
:::

::: quiz
A bracket carries a steady tensile mean stress and an alternating stress. The alternating stress doubles while the mean stays the same. By the Goodman criterion, the factor of safety on a proportional load line
- [ ] halves exactly.
- [x] falls, but by less than half.
- [ ] is unchanged, because the mean stress is unchanged.
::: solution
$1/n = \sigma_a/S_e + \sigma_m/S_{ut}$; doubling $\sigma_a$ doubles only the first term, so $1/n$ less than doubles and $n$ falls by less than half (unless $\sigma_m = 0$).
:::
:::

::: summary
- Describe a cycle by $\sigma_a = (\sigma_{\max} - \sigma_{\min})/2$ and $\sigma_m = (\sigma_{\max} + \sigma_{\min})/2$.
- Steels: $S_e' \approx 0.5S_{ut}$ (to $700\ \mathrm{MPa}$); between $10^3$ and $10^6$ cycles, $S_f = aN^b$ through $fS_{ut}$ and $S_e$.
- Real parts: $S_e = k_ak_bk_ck_dk_ek_fS_e'$ — surface, size, load type, temperature, reliability and miscellaneous effects; surface and size are usually the largest.
- Notches: $K_f = 1 + q(K_t - 1)$, applied to the stresses.
- Mean stress: Goodman $\sigma_a/S_e + \sigma_m/S_{ut} = 1/n$ (conservative), Gerber (mean of data), ASME-elliptic, Soderberg; check first-cycle yield with Langer.
- Combined in-phase stresses: von Mises of the alternating and mean parts separately, $k_c = 1$.
- Variable amplitude: rainflow counting and Miner's rule $\sum n_i/N_i = 1$ — a useful but rough rule that ignores sequence effects.
- Stress-life predictions are uncertain by a factor of 2–3 in life; safety-critical parts are designed to codes and verified by test.
:::

## Exercises

::: exercise Endurance limit of a strong steel {level=1 check="700"}
Estimate the rotating-beam endurance limit of a steel with $S_{ut} = 1600\ \mathrm{MPa}$. (Enter $S_e'$ in MPa.)
::: solution
$S_{ut} > 1400\ \mathrm{MPa}$, so by [[#eq-se-prime]] $S_e' = 700\ \mathrm{MPa}$, not $800\ \mathrm{MPa}$. Such a steel is strongly notch- and surface-sensitive: machined, $k_a = 4.51\times1600^{-0.265} = 0.63$.
:::
:::

::: exercise Fatigue stress concentration {level=1 check="2.2"}
A shoulder fillet has $K_t = 2.5$ and the material's notch sensitivity there is $q = 0.8$. Find $K_f$.
::: solution
$K_f = 1 + 0.8\times(2.5 - 1) = 1 + 1.2 = 2.2$.
:::
:::

::: exercise Stress cycle {level=1 check="125"}
A stress varies between $+200\ \mathrm{MPa}$ and $-50\ \mathrm{MPa}$. Find the alternating stress, the mean stress and the stress ratio. (Enter $\sigma_a$ in MPa.)
::: solution
$\sigma_a = (200 - (-50))/2 = 125\ \mathrm{MPa}$, $\sigma_m = (200 - 50)/2 = 75\ \mathrm{MPa}$, $R = -50/200 = -0.25$.
:::
:::

::: exercise Marin factors {level=2 check="202.3"}
A part has a specimen endurance limit $S_e' = 350\ \mathrm{MPa}$, surface factor $k_a = 0.80$ and size factor $k_b = 0.85$, and is loaded axially at room temperature; 50 % reliability. Find its endurance limit. (Enter $S_e$ in MPa.)
::: solution
Axial loading: $k_c = 0.85$; $k_d = k_e = k_f = 1$. $S_e = 0.80\times0.85\times0.85\times350 = 202.3\ \mathrm{MPa}$. (Strictly, axial loading has no stress gradient and $k_b$ should be $1$, giving $238\ \mathrm{MPa}$; a size effect for axially loaded parts is sometimes retained on statistical grounds — the larger volume contains more defects.)
:::
:::

::: exercise Life from the Basquin line {level=2 check="1024"}
A material's S–N line is $S_f = 1000\,N^{-0.1}$ (MPa). Find the life at a fully reversed amplitude of $500\ \mathrm{MPa}$. (Enter the number of cycles.)
::: solution
$N = (500/1000)^{-1/0.1} = 0.5^{-10} = 2^{10} = 1024$ cycles. The answer lies close to the $10^3$-cycle end of the line, where the stress-life method is least reliable.
:::
:::

::: exercise Goodman and Gerber {level=2 check="1.25"}
At a critical point $\sigma_a = 100\ \mathrm{MPa}$ and $\sigma_m = 400\ \mathrm{MPa}$ (both including $K_f$); $S_e = 250\ \mathrm{MPa}$, $S_{ut} = 1000\ \mathrm{MPa}$, $S_y = 850\ \mathrm{MPa}$. Find the Goodman factor of safety, then the Gerber and Langer factors. (Enter the Goodman value.)
::: solution
Goodman: $1/n = 100/250 + 400/1000 = 0.4 + 0.4 = 0.8$, $n = 1.25$. Gerber: $2\sigma_mS_e/(S_{ut}\sigma_a) = 2$, $n = \tfrac12(2.5)^2(0.4)(-1 + \sqrt5) = 1.545$. Langer: $850/500 = 1.70$. Fatigue governs.
:::
:::

::: exercise Remaining life {level=2 check="140000"}
A part has already accumulated $30\,000$ cycles at an amplitude whose life is $100\,000$ cycles. By Miner's rule, how many cycles can it then sustain at a lower amplitude whose life is $2\times10^5$ cycles? (Enter the number of cycles.)
::: solution
Damage so far $D_1 = 0.3$; remaining $0.7$, so $n_2 = 0.7\times200\,000 = 140\,000$ cycles. Because this is a high-then-low sequence, tests would often show fewer cycles than Miner's rule predicts.
:::
:::

::: exercise Constant mean stress {level=3}
A spring clip is assembled with a fixed preload, so that in service its mean stress stays at $\sigma_m$ while the alternating stress $\sigma_a$ may grow with an overload. (a) Show that with the Goodman line the factor of safety on the alternating stress is $n = \dfrac{S_e}{\sigma_a}\left(1 - \dfrac{\sigma_m}{S_{ut}}\right)$. (b) Compare it with [[#eq-goodman-n]] for $\sigma_a = 100$, $\sigma_m = 300$, $S_e = 250$, $S_{ut} = 1000\ \mathrm{MPa}$. (c) Explain why the choice of load line is a statement about the physics of the loading, not a mathematical convenience.
::: solution
(a) With $\sigma_m$ fixed, failure occurs when the alternating stress reaches $S_a$ on the Goodman line at that mean: $S_a = S_e(1 - \sigma_m/S_{ut})$. The factor of safety is $S_a/\sigma_a$.
(b) Constant mean: $n = 2.5\times0.7 = 1.75$. Radial line: $1/n = 0.4 + 0.3 = 0.7$, $n = 1.43$.
(c) The factor of safety answers "how much can the load grow before failure?". If the whole load scales (a shaft with a bigger torque) both components scale and the radial line applies; if the mean is fixed by assembly (preload, dead weight) and only the fluctuating part may grow, the vertical line applies. Using the wrong one misstates the margin — here by 20 %.
:::
:::

::: exercise Size a tie rod {level=3}
A round steel tie rod in a press frame carries an axial load cycling between $20\ \mathrm{kN}$ and $100\ \mathrm{kN}$. It is machined from steel with $S_{ut} = 700\ \mathrm{MPa}$, $S_y = 550\ \mathrm{MPa}$, and has a thread-relief groove with $K_t = 2.2$, $q = 0.85$. Choose a diameter for infinite life with a Goodman factor of safety of $2$ at 99 % reliability, check yield, and say what you would do differently to save weight.
::: solution
**Strength.** $k_a = 0.795$, $k_b = 1$ (axial), $k_c = 0.85$, $k_e = 0.814$: $S_e = 0.795\times0.85\times0.814\times350 = 192.5\ \mathrm{MPa}$. $K_f = 1 + 0.85\times1.2 = 2.02$.

**Stresses on the net area $A$.** $F_a = 40\ \mathrm{kN}$, $F_m = 60\ \mathrm{kN}$; $\sigma_a = 2.02\times40\,000/A$, $\sigma_m = 2.02\times60\,000/A$.

**Goodman with $n = 2$.** $1/2 = (80\,800/A)/192.5 + (121\,200/A)/700$, so $A = 2(419.7 + 173.1) = 1186\ \mathrm{mm^2}$, $d = \sqrt{4A/\pi} = 38.9\ \mathrm{mm}$ at the groove root; take $40\ \mathrm{mm}$ ($A = 1257\ \mathrm{mm^2}$, $n = 2.12$).

**Yield.** $\sigma_{\max} = 2.02\times100\,000/1257 = 161\ \mathrm{MPa}$, $n_y = 3.4$.

**Saving weight.** The groove and the machined surface cost more than half the strength. A larger groove radius (lower $K_t$), a rolled thread and rolled groove (compressive residual stress, better $k_a$), or a waisted shank so that the threads are not the critical section, would allow a substantially smaller rod; so would preloading the rod against the frame, which lowers the alternating stress it sees (the bolted-joint principle of [[machine-design/fasteners-joints]]). Any change should be verified by fatigue tests of the actual detail.
:::
:::
